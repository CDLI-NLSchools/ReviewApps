/* Mathematics 7 prior knowledge, Band 3 Piece 1: the fluency strand
   core (November 16, 2026), per Math-7-PK-Band-3-Specification-2026-11-16.md
   Sections 3 and 10. All 43 entries in this file are authored new;
   the 2 further flagged entries are shared copies of strand
   generators housed in Unit 7 (ordering-numbers), each a separate
   entry with its own host ID, unit and pkSrc line, on the
   shared-source pattern. Provenance is recorded three ways, in
   agreement: the comment block at the head of each group section
   below, the pkSrc property each entry gains from the PKT7 table
   at the end of this file, and the build report's source-to-host
   table. pkSrc names what an item assesses, in the specification's
   form: "math-5:MA5.5.19" for an evidenced elementary placement,
   "authored:{construct}, placement unevidenced" where no elementary
   outcome on file names the skill. Each entry's indicators array
   carries its primary supported host indicator (the first code in
   its group's Supports column); pkFor carries the full list. No
   strand entry is Level 3: fluency is recall and routine procedure.
   Ranges stop at the elementary ceiling: no integer operations, no
   fraction operations, nothing Mathematics 7 itself assesses.
   Piece 2 (the Unit 4 area and measurement piece, Section 7 of the
   specification) follows the strand in this file. Piece 3 (Section
   8) closes the file and Band 3: 95 entries added (82 authored and
   13 shared copies) across the remaining clusters, and 18 entries
   already in the bank flagged as the state A support sets, for a
   bank of 374 with 183 flagged. */

/* Distinct distractor values: drops the key itself and repeats,
   keeping the order given. */
function pk7uniq(ans, list) {
  var out = [], seen = {};
  seen[String(ans)] = 1;
  list.forEach(function (v) { var k = String(v); if (!seen[k]) { seen[k] = 1; out.push(v); } });
  return out;
}

/* Pad a numeric distractor list to at least three distinct values
   with plain offsets, for the draws where an entry's error-based
   candidates collapse onto each other (small facts especially). */
function pk7fill(ans, ds) {
  var out = ds.slice(), offs = [7, -7, 13, -13, 3, -3, 21, -21];
  for (var i = 0; i < offs.length && out.length < 3; i++) {
    var v = ans + offs[i];
    if (v !== ans && out.indexOf(v) < 0) out.push(v);
  }
  return out;
}

/* Number line figure drawn from the item's own values: integer
   ticks from lo to hi, a marker at each value in marks, and the
   tick at missing labelled "?" instead of its value (missing null
   for none). */
function pk7line(lo, hi, marks, missing) {
  var W = 340, H = 76, x0 = 28, x1 = 312, y = 34;
  function X(v) { return x0 + (v - lo) / (hi - lo) * (x1 - x0); }
  var out = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from ' + lo + ' to ' + hi + '">';
  out += '<line x1="' + (x0 - 8) + '" y1="' + y + '" x2="' + (x1 + 8) + '" y2="' + y + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  for (var v = lo; v <= hi; v++) {
    out += '<line x1="' + X(v) + '" y1="' + (y - 6) + '" x2="' + X(v) + '" y2="' + (y + 6) + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
    out += _txt(X(v), y + 24, (v === missing ? "?" : String(v)), 12, false);
  }
  (marks || []).forEach(function (m) {
    out += '<circle cx="' + X(m) + '" cy="' + y + '" r="5" fill="' + FIG_ACC + '" stroke="' + FIG_INK + '" stroke-width="1.4"/>';
    out += '<polygon points="' + (X(m) - 4.5) + ',' + (y - 16) + ' ' + (X(m) + 4.5) + ',' + (y - 16) + ' ' + X(m) + ',' + (y - 8) + '" fill="' + FIG_ACC + '"/>';
  });
  return out + '</svg>';
}

/* Stepped number line: ticks at the given values, equally spaced;
   the tick at index missingIdx is labelled "?" (or -1 for none);
   a marker sits over the tick at index markIdx (or -1 for none). */
function pk7lineSteps(values, markIdx, missingIdx) {
  var W = 340, H = 76, x0 = 34, x1 = 306, y = 34, n = values.length;
  function X(i) { return x0 + i / (n - 1) * (x1 - x0); }
  var out = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line">';
  out += '<line x1="' + (x0 - 8) + '" y1="' + y + '" x2="' + (x1 + 8) + '" y2="' + y + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  for (var i = 0; i < n; i++) {
    out += '<line x1="' + X(i) + '" y1="' + (y - 6) + '" x2="' + X(i) + '" y2="' + (y + 6) + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
    out += _txt(X(i), y + 24, (i === missingIdx ? "?" : String(values[i])), 12, false);
    if (i === markIdx) {
      out += '<circle cx="' + X(i) + '" cy="' + y + '" r="5" fill="' + FIG_ACC + '" stroke="' + FIG_INK + '" stroke-width="1.4"/>';
      out += '<polygon points="' + (X(i) - 4.5) + ',' + (y - 16) + ' ' + (X(i) + 4.5) + ',' + (y - 16) + ' ' + X(i) + ',' + (y - 8) + '" fill="' + FIG_ACC + '"/>';
    }
  }
  return out + '</svg>';
}

/* ================= Multiplication facts (multiplication-facts) =================
   Grounding: MA5.5.19 (recall of multiplication facts to 9 x 9 and
   related division facts), MA5.5.16 (mental strategies for the same
   facts), MA5.5.17 (the doubling and halving strategy), MA4.5.19
   beneath (recall to 7 x 7). Supports host indicators 5.1 to 5.4. */

E("u1-pk-fact-recall", 1, ["5.1"], 1, "gen", function () {
  var a = ri(3, 9), b = ri(3, 9), ans = a * b;
  var ds = pk7fill(ans, pk7uniq(ans, [(a - 1) * b, (a + 1) * b, a * (b - 1), a * (b + 1), ans - a, ans + b])).slice(0, 3);
  return mcq("What is \\(" + a + " \\times " + b + "\\)?",
    { t: String(ans), fb: "Correct: \\(" + a + " \\times " + b + " = " + ans + "\\)." },
    ds.map(function (d) { return { t: String(d), fb: "That is the product of a nearby fact. Say the fact for \\(" + a + " \\times " + b + "\\) itself." }; }),
    "The multiplication facts to \\(9 \\times 9\\) are recalled directly: \\(" + a + " \\times " + b + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, b: b });
}, ["Say the fact out loud before you look at the choices.", "If the fact will not come, count up by one factor: groups of the other."]);

E("u1-pk-fact-division", 1, ["5.1"], 1, "gen", function () {
  var a = ri(3, 9), b = ri(4, 9), p = a * b;
  var ds = pk7uniq(b, [b - 1, b + 1, b + 2, b - 2]).slice(0, 3);
  return mcq("What is \\(" + p + " \\div " + a + "\\)?",
    { t: String(b), fb: "Correct: \\(" + a + " \\times " + b + " = " + p + "\\), so \\(" + p + " \\div " + a + " = " + b + "\\)." },
    ds.map(function (d) { return { t: String(d), fb: "Check with multiplication: \\(" + a + " \\times " + d + "\\) is not " + p + "." }; }),
    "Division facts come from the matching multiplication fact: \\(" + a + " \\times " + b + " = " + p + "\\), so \\(" + p + " \\div " + a + " = " + b + "\\). The answer is <b>" + b + "</b>.",
    { a: a, b: b });
}, ["Think of the multiplication fact with the same numbers.", "Ask: the divisor times what gives the number being divided?"]);

E("u1-pk-fact-onemore", 1, ["5.1"], 1, "gen", function () {
  var a = ri(3, 8), b = ri(4, 9), known = a * b, ans = (a + 1) * b;
  var ds = pk7fill(ans, pk7uniq(ans, [known + a, known + 1, (a + 2) * b, known - b])).slice(0, 3);
  return mcq("You know that \\(" + a + " \\times " + b + " = " + known + "\\). What is \\(" + (a + 1) + " \\times " + b + "\\)?",
    { t: String(ans), fb: "Correct: one more group of " + b + " than " + known + " gives " + known + " + " + b + " = " + ans + "." },
    ds.map(function (d) { return { t: String(d), fb: d === known + a ? "That adds one group of " + a + "; the extra group is a group of " + b + "." : "Start from " + known + " and add one more group of " + b + "." }; }),
    "\\(" + (a + 1) + " \\times " + b + "\\) is one more group of " + b + " than \\(" + a + " \\times " + b + "\\): \\(" + known + " + " + b + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, b: b });
}, ["Compare the two facts: what changes from the known one?", "One more group means adding the group size once more."]);

E("u1-pk-fact-skip", 1, ["5.1"], 1, "gen", function () {
  var n = ri(3, 9), ans = 5 * n;
  var ds = pk7uniq(ans, [4 * n + (n - 1), 4 * n + (n + 1), 6 * n, 4 * n + 1]).slice(0, 3);
  return mcq("Counting by " + n + "s: \\(" + n + ", " + (2 * n) + ", " + (3 * n) + ", " + (4 * n) + ", \\ldots\\) What number comes next?",
    { t: String(ans), fb: "Correct: add one more " + n + " to " + (4 * n) + "." },
    ds.map(function (d) { return { t: String(d), fb: "Each step adds exactly " + n + "." }; }),
    "Skip counting by " + n + "s adds " + n + " each time: \\(" + (4 * n) + " + " + n + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { n: n });
}, ["What is added at each step of the count?", "Say the count out loud and keep going one more step."]);

E("u1-pk-fact-halving", 1, ["5.1"], 1, "gen", function () {
  var a = ri(2, 4), b = ri(3, 9), known = 2 * a * b, ans = a * b;
  var ds = pk7fill(ans, pk7uniq(ans, [known - b, ans + b, known - 2 * b, ans - b])).slice(0, 3);
  return mcq("You know that \\(" + (2 * a) + " \\times " + b + " = " + known + "\\). What is \\(" + a + " \\times " + b + "\\)?",
    { t: String(ans), fb: "Correct: " + a + " is half of " + (2 * a) + ", so the product halves too: " + known + " halved is " + ans + "." },
    ds.map(function (d) { return { t: String(d), fb: "Halving one factor halves the product; subtracting a group does something else." }; }),
    "\\(" + a + "\\) is half of \\(" + (2 * a) + "\\), so \\(" + a + " \\times " + b + "\\) is half of \\(" + known + "\\): \\(" + known + " \\div 2 = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, b: b });
}, ["Compare the first factors of the two facts.", "When one factor is halved, what happens to the product?"]);

/* ================= Multiplying multi-digit numbers (multiplication-fluency) =================
   Grounding: MA4.5.12 (2- and 3-digit by 1-digit), MA5.5.4 and
   MA5.5.5 (2-digit by 2-digit), MA5.5.18 (products with multiples
   of 10, 100 and 1 000). Supports host indicators 5.1 to 5.4 and
   7.5, 7.6, 7.9 to 7.12. */

E("u1-pk-mult-2by1", 1, ["5.1"], 1, "gen", function () {
  var a = ri(23, 98), b = ri(3, 9), ans = a * b;
  var tens = Math.floor(a / 10) * 10, ones = a % 10;
  var ds = pk7uniq(ans, [tens * b + ones, ones * b + tens, ans + b, ans - b]).slice(0, 3);
  return mcq("What is \\(" + a + " \\times " + b + "\\)?",
    { t: String(ans), fb: "Correct: \\(" + tens + " \\times " + b + " = " + (tens * b) + "\\) and \\(" + ones + " \\times " + b + " = " + (ones * b) + "\\), and " + (tens * b) + " + " + (ones * b) + " = " + ans + "." },
    ds.map(function (d) { return { t: String(d), fb: d === tens * b + ones ? "That multiplies the tens by " + b + " but leaves the ones unmultiplied." : (d === ones * b + tens ? "That multiplies the ones by " + b + " but leaves the tens unmultiplied." : "Multiply both parts of " + a + " by " + b + " and add the parts.") }; }),
    "Split \\(" + a + "\\) into \\(" + tens + " + " + ones + "\\): \\(" + tens + " \\times " + b + " = " + (tens * b) + "\\) and \\(" + ones + " \\times " + b + " = " + (ones * b) + "\\). Adding, \\(" + (tens * b) + " + " + (ones * b) + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, b: b });
}, ["Split the bigger number into tens and ones.", "Multiply each part by the single digit, then add."]);

E("u1-pk-mult-3by1", 1, ["5.1"], 1, "gen", function () {
  var a = ri(123, 989), b = ri(3, 9), ans = a * b;
  var hund = Math.floor(a / 100) * 100, rest = a % 100;
  var ds = pk7uniq(ans, [rest * b + Math.floor(a / 100), ans + b, ans - b, rest * b + hund]).slice(0, 3);
  return mcq("What is \\(" + a + " \\times " + b + "\\)?",
    { t: String(ans), fb: "Correct: \\(" + hund + " \\times " + b + " = " + (hund * b) + "\\) and \\(" + rest + " \\times " + b + " = " + (rest * b) + "\\), and " + (hund * b) + " + " + (rest * b) + " = " + ans + "." },
    ds.map(function (d) { return { t: String(d), fb: d === rest * b + Math.floor(a / 100) ? "That keeps the hundreds digit at its face value instead of multiplying " + hund + " by " + b + "." : "Multiply every part of " + a + " by " + b + ", keeping each part's place value." }; }),
    "Split \\(" + a + "\\) into \\(" + hund + " + " + rest + "\\): \\(" + hund + " \\times " + b + " = " + (hund * b) + "\\) and \\(" + rest + " \\times " + b + " = " + (rest * b) + "\\). Adding, \\(" + (hund * b) + " + " + (rest * b) + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, b: b });
}, ["Split the bigger number by place value.", "The hundreds part keeps its full value when it is multiplied."]);

E("u1-pk-mult-2by2", 1, ["5.1"], 2, "gen", function () {
  var a = ri(13, 49), b = ri(12, 39); if (b % 10 === 0) b += 1; if (a % 10 === 0) a += 1;
  var ans = a * b;
  var at = Math.floor(a / 10) * 10, ao = a % 10, bt = Math.floor(b / 10) * 10, bo = b % 10;
  var ds = pk7fill(ans, pk7uniq(ans, [a * bt + ao * bo, at * bt + ao * bo, ans + a, a * bt])).slice(0, 3);
  return mcq("What is \\(" + a + " \\times " + b + "\\)?",
    { t: String(ans), fb: "Correct: \\(" + a + " \\times " + bt + " = " + (a * bt) + "\\) and \\(" + a + " \\times " + bo + " = " + (a * bo) + "\\), and " + (a * bt) + " + " + (a * bo) + " = " + ans + "." },
    ds.map(function (d) { return { t: String(d), fb: d === a * bt ? "That is only the first part, \\(" + a + " \\times " + bt + "\\); the \\(" + a + " \\times " + bo + "\\) part is still missing." : "Both parts of " + b + " must multiply all of " + a + "." }; }),
    "Split \\(" + b + "\\) into \\(" + bt + " + " + bo + "\\): \\(" + a + " \\times " + bt + " = " + (a * bt) + "\\) and \\(" + a + " \\times " + bo + " = " + (a * bo) + "\\). Adding, \\(" + (a * bt) + " + " + (a * bo) + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, b: b });
}, ["Split one of the numbers into tens and ones.", "There are two partial products to add."]);

E("u1-pk-mult-zeros", 1, ["5.1"], 1, "gen", function () {
  var form = ri(0, 1), a = ri(2, 9), b = ri(2, 9), x, y, ans, base;
  if (form === 0) { x = a * 100; y = b; base = a * b; }
  else { x = a * 10; y = b * 10; base = a * b; }
  ans = x * y;
  var ds = pk7uniq(ans, [ans / 10, ans * 10, (a + 1) * b * (ans / base), (a - 1) * b * (ans / base)]).slice(0, 3);
  return mcq("What is \\(" + x + " \\times " + y + "\\)?",
    { t: String(ans), fb: "Correct: \\(" + a + " \\times " + b + " = " + base + "\\), and the zeros in the factors give " + ans + "." },
    ds.map(function (d) { return { t: String(d), fb: d === (a + 1) * b * (ans / base) || d === (a - 1) * b * (ans / base) ? "The fact \\(" + a + " \\times " + b + " = " + base + "\\) comes first; then count the zeros." : "Count the zeros: the factors together carry " + (String(x).match(/0*$/) [0].length + String(y).match(/0*$/)[0].length) + " trailing zero(s) onto the fact \\(" + a + " \\times " + b + "\\)." }; }),
    "Start with the fact \\(" + a + " \\times " + b + " = " + base + "\\), then apply the zeros from both factors: \\(" + x + " \\times " + y + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, b: b, form: form });
}, ["Do the basic fact first, ignoring the zeros.", "Then put back one zero for each zero in the factors."]);

E("u1-pk-mult-3by2", 1, ["5.1"], 2, "gen", function () {
  var a = ri(112, 499), b = ri(13, 39); if (b % 10 === 0) b += 1;
  var ans = a * b;
  var bt = Math.floor(b / 10) * 10, bo = b % 10;
  var ds = pk7uniq(ans, [a * bt, a * bt + (a % 10) * bo, ans + a, ans - b]).slice(0, 3);
  return mcq("What is \\(" + a + " \\times " + b + "\\)?",
    { t: String(ans), fb: "Correct: \\(" + a + " \\times " + bt + " = " + (a * bt) + "\\) and \\(" + a + " \\times " + bo + " = " + (a * bo) + "\\), and " + (a * bt) + " + " + (a * bo) + " = " + ans + "." },
    ds.map(function (d) { return { t: String(d), fb: d === a * bt ? "That is only the \\(" + a + " \\times " + bt + "\\) part; the \\(" + a + " \\times " + bo + "\\) part is still missing." : "Split " + b + " into " + bt + " + " + bo + " and multiply all of " + a + " by each part." }; }),
    "Split \\(" + b + "\\) into \\(" + bt + " + " + bo + "\\): \\(" + a + " \\times " + bt + " = " + (a * bt) + "\\) and \\(" + a + " \\times " + bo + " = " + (a * bo) + "\\). Adding, \\(" + (a * bt) + " + " + (a * bo) + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, b: b });
}, ["Split the two-digit number into tens and ones.", "Multiply the whole three-digit number by each part."]);

/* ================= Dividing multi-digit numbers (division-fluency) =================
   Grounding: MA5.5.8 and MA5.5.9 (division with a 1-digit divisor
   and a 3-digit dividend, with and without remainders), MA5.5.19
   (related division facts), and the Mathematics 5 division unit
   (MA5.5.x) for division by 2-digit divisors and by multiples of
   10 at the Grade 5 to 6 pitch; MA4.5.8, MA4.5.9, MA4.5.16 and
   MA4.5.17 beneath. Supports host indicators 5.1 to 5.4 and 7.5,
   7.6, 7.9 to 7.12. */

E("u1-pk-div-exact", 1, ["5.1"], 1, "gen", function () {
  var d = ri(3, 9), q = ri(31, 99), n = d * q;
  var ds = pk7uniq(q, [q - 1, q + 1, q + 10, q - 10]).slice(0, 3);
  return mcq("What is \\(" + n + " \\div " + d + "\\)?",
    { t: String(q), fb: "Correct: \\(" + d + " \\times " + q + " = " + n + "\\)." },
    ds.map(function (x) { return { t: String(x), fb: "Check by multiplying: \\(" + d + " \\times " + x + "\\) is not " + n + "." }; }),
    "Use the matching multiplication: \\(" + d + " \\times " + q + " = " + n + "\\), so \\(" + n + " \\div " + d + " = " + q + "\\). The answer is <b>" + q + "</b>.",
    { d: d, q: q });
}, ["Check a possible answer by multiplying it by the divisor.", "The multiplication fact with the same numbers settles it."]);

E("u1-pk-div-remainder", 1, ["5.1"], 1, "gen", function () {
  var d = ri(4, 9), q = ri(21, 89), r = ri(1, d - 2), n = d * q + r;
  function lab(qq, rr) { return qq + " remainder " + rr; }
  var ds = pk7uniq(lab(q, r), [lab(q + 1, r), lab(q, r + 1), lab(q - 1, r)]);
  return mcq("What is \\(" + n + " \\div " + d + "\\)?",
    { t: lab(q, r), fb: "Correct: \\(" + d + " \\times " + q + " = " + (d * q) + "\\), which leaves " + r + " over." },
    ds.map(function (x) { return { t: x, fb: "Multiply the quotient by " + d + " and add the remainder: it must give back " + n + ", and a remainder must be smaller than " + d + "." }; }),
    "\\(" + d + " \\times " + q + " = " + (d * q) + "\\), and \\(" + n + " - " + (d * q) + " = " + r + "\\), so \\(" + n + " \\div " + d + " = " + q + "\\) remainder \\(" + r + "\\). The answer is <b>" + lab(q, r) + "</b>.",
    { d: d, q: q, r: r });
}, ["Find the largest multiple of the divisor that fits.", "What is left over must be smaller than the divisor."]);

E("u1-pk-div-2digit", 1, ["5.1"], 2, "gen", function () {
  var d = ri(12, 29); if (d % 10 === 0) d += 1;
  var qmax = Math.floor(999 / d), q = ri(11, qmax), n = d * q;
  var ds = pk7uniq(q, [q - 1, q + 1, q + 2, q - 2]).slice(0, 3);
  return mcq("What is \\(" + n + " \\div " + d + "\\)?",
    { t: String(q), fb: "Correct: \\(" + d + " \\times " + q + " = " + n + "\\)." },
    ds.map(function (x) { return { t: String(x), fb: "Check by multiplying: \\(" + d + " \\times " + x + "\\) is not " + n + "." }; }),
    "Estimate first: \\(" + d + " \\times " + q + " = " + n + "\\) exactly, so \\(" + n + " \\div " + d + " = " + q + "\\). The answer is <b>" + q + "</b>.",
    { d: d, q: q });
}, ["Estimate with a round multiple of the divisor first.", "Check the answer by multiplying it by the divisor."]);

E("u1-pk-div-related", 1, ["5.1"], 1, "gen", function () {
  var a = ri(12, 19), b = ri(3, 9), p = a * b;
  var ds = pk7uniq(a, [a - 1, a + 1, a + 2]).slice(0, 3);
  return mcq("You know that \\(" + a + " \\times " + b + " = " + p + "\\). What is \\(" + p + " \\div " + b + "\\)?",
    { t: String(a), fb: "Correct: the division undoes the multiplication fact." },
    ds.map(function (x) { return { t: String(x), fb: "The answer is one of the numbers in the known fact." }; }),
    "The three numbers in \\(" + a + " \\times " + b + " = " + p + "\\) form a fact family, so \\(" + p + " \\div " + b + " = " + a + "\\). The answer is <b>" + a + "</b>.",
    { a: a, b: b });
}, ["The known fact already contains the answer.", "Division undoes multiplication with the same three numbers."]);

E("u1-pk-div-zeros", 1, ["5.1"], 2, "gen", function () {
  var form = ri(0, 1), a = ri(3, 9), d = ri(3, 9), n, dv, ans;
  if (form === 0) { ans = a * 100; dv = d; n = a * d * 100; }
  else { ans = a * 10; dv = d * 10; n = a * d * 100; }
  var ds = pk7uniq(ans, [ans / 10, ans * 10, (a + 1) * (ans / a), (a - 1) * (ans / a)]).slice(0, 3);
  return mcq("What is \\(" + n + " \\div " + dv + "\\)?",
    { t: String(ans), fb: "Correct: the matching fact is \\(" + a + " \\times " + d + " = " + (a * d) + "\\), and the zeros give " + ans + "." },
    ds.map(function (x) { return { t: String(x), fb: "Check by multiplying the answer by " + dv + ": it must give back " + n + "." }; }),
    "Work from the fact \\(" + a + " \\times " + d + " = " + (a * d) + "\\) and track the zeros: \\(" + dv + " \\times " + ans + " = " + n + "\\), so \\(" + n + " \\div " + dv + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, d: d, form: form });
}, ["Start from the basic fact with the same digits.", "Check by multiplying your answer by the divisor."]);

/* ================= Addition and subtraction fluency (addition-subtraction) =================
   Grounding: MA4.4.4, MA4.4.5 and MA4.4.6 (addition and
   subtraction with answers to 10 000, including regrouping and
   problems with more than two numbers). Supports host indicators
   6.24 to 6.29. */

E("u2-pk-add-regroup", 2, ["6.24"], 1, "gen", function () {
  var a = 0, b = 0, g = 0;
  while (g++ < 300) {
    a = ri(1250, 9899); b = ri(1250, 9899);
    if ((a % 10) + (b % 10) >= 10 || (Math.floor(a / 10) % 10) + (Math.floor(b / 10) % 10) >= 10) break;
  }
  var ans = a + b;
  function noCarry(x, y) { var s = "", p = 1; for (var i = 0; i < 4; i++) { var dx = Math.floor(x / p) % 10, dy = Math.floor(y / p) % 10; s = String((dx + dy) % 10) + s; p *= 10; } return parseInt(s, 10); }
  var ds = pk7fill(ans, pk7uniq(ans, [noCarry(a, b), ans - 100, ans + 10, ans - 10])).slice(0, 3);
  return mcq("What is \\(" + a + " + " + b + "\\)?",
    { t: String(ans), fb: "Correct: add place by place, regrouping whenever a place reaches 10." },
    ds.map(function (d) { return { t: String(d), fb: d === noCarry(a, b) ? "That adds each place but never regroups: when a place reaches 10, carry into the next place." : "Work place by place from the right, regrouping as you go." }; }),
    "Adding place by place with regrouping, \\(" + a + " + " + b + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, b: b });
}, ["Start from the ones place and work left.", "Whenever a place totals 10 or more, regroup into the next place."]);

E("u2-pk-sub-regroup", 2, ["6.24"], 1, "gen", function () {
  var a = ri(3, 9) * 1000 + ri(0, 9), b = ri(1123, a - 1000), ans = a - b;
  function smallFromLarge(x, y) { var s = "", p = 1; for (var i = 0; i < 4; i++) { var dx = Math.floor(x / p) % 10, dy = Math.floor(y / p) % 10; s = String(Math.abs(dx - dy)) + s; p *= 10; } return parseInt(s, 10); }
  var ds = pk7fill(ans, pk7uniq(ans, [smallFromLarge(a, b), ans - 10, ans + 10, ans + 100])).slice(0, 3);
  return mcq("What is \\(" + a + " - " + b + "\\)?",
    { t: String(ans), fb: "Correct: regroup across the zeros before subtracting each place." },
    ds.map(function (d) { return { t: String(d), fb: d === smallFromLarge(a, b) ? "That subtracts the smaller digit from the larger in each place; instead, regroup so each top digit is big enough." : "Regroup from the thousands through the hundreds and tens so the zeros do not block you." }; }),
    "The zeros in \\(" + a + "\\) mean regrouping more than once: borrow from the thousands, then the hundreds, then the tens, and subtract place by place: \\(" + a + " - " + b + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, b: b });
}, ["Look at the zeros: they mean regrouping more than once.", "Regroup step by step from the left until each place can be subtracted."]);

E("u2-pk-add-three", 2, ["6.24"], 2, "gen", function () {
  var a = ri(148, 989), b = ri(148, 989), c = ri(148, 989), ans = a + b + c;
  var ds = pk7fill(ans, pk7uniq(ans, [a + b, ans - 10, ans + 100, a + c])).slice(0, 3);
  return mcq("What is \\(" + a + " + " + b + " + " + c + "\\)?",
    { t: String(ans), fb: "Correct: all three numbers are added." },
    ds.map(function (d) { return { t: String(d), fb: (d === a + b || d === a + c) ? "That adds only two of the three numbers." : "Add the first two, then add the third to that total." }; }),
    "Add in stages: \\(" + a + " + " + b + " = " + (a + b) + "\\), then \\(" + (a + b) + " + " + c + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, b: b, c: c });
}, ["Add two of the numbers first.", "Then add the third number to that total."]);

E("u2-pk-sub-line", 2, ["6.24"], 2, "gen", function () {
  var p = ri(4, 7), m = ri(1, 3), neg = -m, ans = p - neg;
  var ds = pk7uniq(ans, [p - m, ans + 1, ans - 1, p + m + 2]).slice(0, 3);
  var q = mcq("Two points are marked on the number line. How far apart are the two marked points?",
    { t: String(ans), fb: "Correct: from " + neg + " up to 0 is " + m + ", and from 0 up to " + p + " is " + p + ", so the distance is " + m + " + " + p + " = " + ans + "." },
    ds.map(function (d) { return { t: String(d), fb: d === p - m ? "That subtracts the distances from zero; the points are on opposite sides of zero, so their distances add." : "Count the distance in two parts: from the left point up to 0, then from 0 to the right point." }; }),
    "The marked points are " + neg + " and " + p + ". From " + neg + " to 0 is " + m + " units, and from 0 to " + p + " is " + p + " units, so the points are \\(" + m + " + " + p + " = " + ans + "\\) units apart. The answer is <b>" + ans + "</b>.",
    { p: p, m: m });
  q.figure = pk7line(-6, 8, [neg, p], null);
  return q;
}, ["Find the two marked values on the line first.", "Split the distance at zero and add the two parts."]);

E("u2-pk-addsub-large", 2, ["6.24"], 2, "gen", function () {
  var sub = ri(0, 1) === 1, a = ri(12345, 98999), b = ri(12345, 98999);
  if (sub && b > a) { var t = a; a = b; b = t; }
  var ans = sub ? a - b : a + b;
  var ds = pk7uniq(ans, [ans - 100, ans + 10, ans + 1000, ans - 10]).slice(0, 3);
  return mcq("What is \\(" + a + (sub ? " - " : " + ") + b + "\\)?",
    { t: String(ans), fb: "Correct: work place by place across all five places, regrouping as needed." },
    ds.map(function (d) { return { t: String(d), fb: "Line the numbers up by place value and work from the ones place, regrouping whenever a place needs it." }; }),
    "Working place by place from the ones, \\(" + a + (sub ? " - " : " + ") + b + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, b: b, sub: sub });
}, ["Line the numbers up by place value.", "Work from the ones place to the ten thousands place."]);

/* ================= Number line ordering (ordering-numbers) =================
   Grounding: MA4.1.1 and MA4.1.2 (placing and ordering whole
   numbers, number lines), MA5.3.18 and MA5.3.19 (comparing
   decimals), MA6.1.2 (extending the line below zero). Supports
   host indicators 6.24 to 6.29 in Unit 2; the two shared copies
   housed in Unit 7 support 11.6 to 11.13. */

E("u2-pk-order-place", 2, ["6.24"], 1, "gen", function () {
  var base = ri(200000, 900000);
  var vals = pk7uniq(-1, [base, base + ri(100, 900), base - ri(100, 900), base + ri(1000, 9000)]).slice(0, 4);
  while (vals.length < 4) { var v = base + ri(10000, 90000); if (vals.indexOf(v) < 0) vals.push(v); }
  var greatest = ri(0, 1) === 1, key = greatest ? Math.max.apply(null, vals) : Math.min.apply(null, vals);
  var ds = vals.filter(function (v) { return v !== key; });
  return mcq("Which of these numbers is the " + (greatest ? "greatest" : "smallest") + "?",
    { t: String(key), fb: "Correct: compare the digits place by place from the left." },
    ds.map(function (d) { return { t: String(d), fb: "Compare from the leftmost digit: the first place where two numbers differ decides which is bigger." }; }),
    "All four numbers have six digits, so compare place by place from the left. The " + (greatest ? "greatest" : "smallest") + " is <b>" + key + "</b>.",
    { vals: vals });
}, ["Compare the numbers from the leftmost digit.", "The first place where the digits differ settles it."]);

E("u2-pk-order-line", 2, ["6.24"], 1, "gen", function () {
  var lo = ri(0, 40), mark = lo + ri(2, 8);
  var ds = pk7uniq(mark, [mark - 1, mark + 1, mark + 2]).slice(0, 3);
  var q = mcq("Which number does the marker show on this number line?",
    { t: String(mark), fb: "Correct: count along the ticks from " + lo + "." },
    ds.map(function (d) { return { t: String(d), fb: "Count the ticks one at a time from the labelled start." }; }),
    "Each tick is one more than the tick before it. Counting from " + lo + ", the marker sits at <b>" + mark + "</b>.",
    { lo: lo, mark: mark });
  q.figure = pk7line(lo, lo + 10, [mark], null);
  return q;
}, ["Start at the labelled number on the left.", "Count one tick at a time up to the marker."]);

E("u2-pk-order-missing", 2, ["6.24"], 2, "gen", function () {
  var step = pick([25, 50, 100, 250]), start = ri(100, 900), mi = ri(1, 4);
  var vals = []; for (var i = 0; i < 6; i++) vals.push(start + i * step);
  var key = vals[mi];
  var ds = pk7uniq(key, [key - step, key + step, key + 2 * step]).slice(0, 3);
  var q = mcq("What number belongs at the ? on this number line?",
    { t: String(key), fb: "Correct: the ticks go up by " + step + " each time." },
    ds.map(function (d) { return { t: String(d), fb: "Work out the step between neighbouring ticks first, then count on." }; }),
    "Neighbouring ticks differ by " + step + ", so counting on from " + vals[mi - 1] + " gives \\(" + vals[mi - 1] + " + " + step + " = " + key + "\\). The answer is <b>" + key + "</b>.",
    { step: step, start: start, mi: mi });
  q.figure = pk7lineSteps(vals, -1, mi);
  return q;
}, ["Find the gap between two neighbouring labelled ticks.", "Count on by that gap to the question mark."]);

E("u2-pk-order-decimals", 2, ["6.24"], 2, "gen", function () {
  var t = ri(2, 8);
  var vals = [(10 * t - 5) / 100, t / 10, (10 * t + 3) / 100, (10 * t + 8) / 100];
  var key = Math.max.apply(null, vals);
  var ds = vals.filter(function (v) { return v !== key; });
  function s(v) { return fmtF(v, 2); }
  return mcq("Which of these decimals is the greatest?",
    { t: s(key), fb: "Correct: written in hundredths, the four are " + vals.map(s).join(", ") + ", and " + s(key) + " is the largest." },
    ds.map(function (d) { return { t: s(d), fb: "Write every decimal in hundredths before comparing: a tenths digit is worth ten hundredths." }; }),
    "In hundredths the numbers are " + vals.map(s).join(", ") + ". The greatest is <b>" + s(key) + "</b>.",
    { t: t });
}, ["Write each decimal with the same number of decimal places.", "Then compare the hundredths values."]);

E("u2-pk-order-below", 2, ["6.24"], 2, "gen", function () {
  var mark = ri(-5, -1);
  var ds = pk7uniq(mark, [-mark, mark - 1, mark + 1]).slice(0, 3);
  var q = mcq("Which number does the marker show on this number line?",
    { t: String(mark), fb: "Correct: the marker is " + Math.abs(mark) + " tick(s) to the left of 0." },
    ds.map(function (d) { return { t: String(d), fb: d === -mark ? "That is the same distance from zero but on the positive side; the marker is on the negative side." : "Count the ticks from 0, and note which side of 0 the marker is on." }; }),
    "The marker is " + Math.abs(mark) + " tick(s) to the left of 0, so it shows <b>" + mark + "</b>.",
    { mark: mark });
  q.figure = pk7line(-6, 6, [mark], null);
  return q;
}, ["Find 0 first, then count the ticks to the marker.", "Numbers to the left of 0 are negative."]);

/* Shared copies of strand generators, housed in Unit 7 for cluster
   7-C12 (the computation base beneath the data work). Each copy is
   a separate entry with its own host ID, unit and pkSrc line, on
   the shared-source pattern; the generator code is identical to
   its Unit 2 original. Supports host indicators 11.6 to 11.13. */

E("u7-pk-order-line", 7, ["11.6"], 1, "gen", function () {
  var lo = ri(0, 40), mark = lo + ri(2, 8);
  var ds = pk7uniq(mark, [mark - 1, mark + 1, mark + 2]).slice(0, 3);
  var q = mcq("Which number does the marker show on this number line?",
    { t: String(mark), fb: "Correct: count along the ticks from " + lo + "." },
    ds.map(function (d) { return { t: String(d), fb: "Count the ticks one at a time from the labelled start." }; }),
    "Each tick is one more than the tick before it. Counting from " + lo + ", the marker sits at <b>" + mark + "</b>.",
    { lo: lo, mark: mark });
  q.figure = pk7line(lo, lo + 10, [mark], null);
  return q;
}, ["Start at the labelled number on the left.", "Count one tick at a time up to the marker."]);

E("u7-pk-order-below", 7, ["11.6"], 2, "gen", function () {
  var mark = ri(-5, -1);
  var ds = pk7uniq(mark, [-mark, mark - 1, mark + 1]).slice(0, 3);
  var q = mcq("Which number does the marker show on this number line?",
    { t: String(mark), fb: "Correct: the marker is " + Math.abs(mark) + " tick(s) to the left of 0." },
    ds.map(function (d) { return { t: String(d), fb: d === -mark ? "That is the same distance from zero but on the positive side; the marker is on the negative side." : "Count the ticks from 0, and note which side of 0 the marker is on." }; }),
    "The marker is " + Math.abs(mark) + " tick(s) to the left of 0, so it shows <b>" + mark + "</b>.",
    { mark: mark });
  q.figure = pk7line(-6, 6, [mark], null);
  return q;
}, ["Find 0 first, then count the ticks to the marker.", "Numbers to the left of 0 are negative."]);

/* ================= Multiples (multiples) =================
   Grounding: MA6.5.7 (a multiple is the product of two whole
   number factors; identify and produce multiples) and MA6.5.8
   (problem solving with multiples). Supports host indicators
   5.1 to 5.4. */

E("u1-pk-multiples-identify", 1, ["5.1"], 1, "gen", function () {
  var n = ri(3, 12), key = n * ri(3, 9);
  var ds = pk7uniq(key, [key - 1, key + 1, key + 2, key - 2]).slice(0, 3);
  return mcq("Which of these numbers is a multiple of " + n + "?",
    { t: String(key), fb: "Correct: \\(" + key + " = " + n + " \\times " + (key / n) + "\\)." },
    ds.map(function (d) { return { t: String(d), fb: "Divide by " + n + ": a multiple of " + n + " divides exactly, with nothing left over." }; }),
    "A multiple of " + n + " is " + n + " times a whole number: \\(" + key + " = " + n + " \\times " + (key / n) + "\\). The answer is <b>" + key + "</b>.",
    { n: n });
}, ["Run through the " + "times table for the number given.", "A multiple divides exactly by the number, with no remainder."]);

E("u1-pk-multiples-first", 1, ["5.1"], 1, "gen", function () {
  var n = ri(3, 9);
  function list(arr) { return arr.join(", "); }
  var key = list([n, 2 * n, 3 * n, 4 * n]);
  var ds = pk7uniq(key, [list([n, 2 * n, 3 * n, 5 * n]), list([1, n, 2 * n, 3 * n]), list([n, 2 * n + 1, 3 * n + 2, 4 * n + 3])]);
  return mcq("What are the first four multiples of " + n + "?",
    { t: key, fb: "Correct: multiply " + n + " by 1, 2, 3 and 4." },
    ds.map(function (d) { return { t: d, fb: "The first four multiples come from multiplying by 1, 2, 3 and 4, in order, with none skipped." }; }),
    "The first four multiples of " + n + " are \\(" + n + " \\times 1\\), \\(" + n + " \\times 2\\), \\(" + n + " \\times 3\\) and \\(" + n + " \\times 4\\): <b>" + key + "</b>.",
    { n: n });
}, ["Multiply the number by 1, then 2, then 3, then 4.", "The multiples themselves are the answers to those multiplications."]);

E("u1-pk-multiples-common", 1, ["5.1"], 2, "gen", function () {
  var pair = pick([[4, 6], [6, 8], [4, 10], [6, 9], [8, 12], [6, 10]]);
  var a = pair[0], b = pair[1], g = 0, lcm = a * b;
  while (lcm % a !== 0 || lcm % b !== 0 || g++ > 60) { lcm--; }
  var key = lcm * ri(1, 2);
  var m1 = 0, m2 = 0; g = 0;
  while (g++ < 200) { var c1 = a * ri(2, 9); if (c1 % b !== 0 && c1 !== key && c1 !== key + a) { m1 = c1; break; } }
  g = 0;
  while (g++ < 200) { var c2 = b * ri(2, 9); if (c2 % a !== 0 && c2 !== key && c2 !== m1) { m2 = c2; break; } }
  if (!m1) m1 = key + a;
  if (!m2) m2 = key + b;
  var ds = pk7uniq(key, [m1, m2, key + a]).slice(0, 3);
  return mcq("Which of these numbers is a multiple of both " + a + " and " + b + "?",
    { t: String(key), fb: "Correct: \\(" + key + " = " + a + " \\times " + (key / a) + " = " + b + " \\times " + (key / b) + "\\)." },
    ds.map(function (d) { return { t: String(d), fb: "Test the number against both: it must divide exactly by " + a + " and by " + b + "." }; }),
    "A common multiple divides exactly by both numbers: \\(" + key + " \\div " + a + " = " + (key / a) + "\\) and \\(" + key + " \\div " + b + " = " + (key / b) + "\\). The answer is <b>" + key + "</b>.",
    { a: a, b: b });
}, ["List a few multiples of each number.", "Look for a number that appears in both lists."]);

E("u1-pk-multiples-problem", 1, ["5.1"], 2, "gen", function () {
  var n = ri(6, 12), T = ri(40, 90), key = (Math.floor(T / n) + 1) * n;
  var ds = pk7uniq(key, [key - n, key + n, key + 1]).slice(0, 3);
  return mcq("What is the first multiple of " + n + " that is greater than " + T + "?",
    { t: String(key), fb: "Correct: \\(" + (key - n) + "\\) is the multiple just below " + T + ", so the next one is " + key + "." },
    ds.map(function (d) { return { t: String(d), fb: d === key - n ? "That multiple is not greater than " + T + "." : "Count by " + n + "s past " + T + " and take the first one you reach." }; }),
    "Counting by " + n + "s, the multiples near " + T + " are " + (key - n) + " and " + key + ". The first one greater than " + T + " is <b>" + key + "</b>.",
    { n: n, T: T });
}, ["Count by the given number, past the target.", "Take the first multiple that passes the target."]);

/* ================= Order of operations (order-of-operations) =================
   Grounding: MA6.5.9 (apply the order of operations) and MA6.5.10
   (evaluate expressions and say why a standard order is needed,
   in computation form). Supports host indicators 8.4, 8.5, 8.6,
   7.1 to 7.4, 7.7, 7.8. */

E("u1-pk-ooo-basic", 1, ["8.4"], 1, "gen", function () {
  var a = ri(2, 20), b = ri(2, 9), c = ri(2, 9), ans = a + b * c;
  var ds = pk7fill(ans, pk7uniq(ans, [(a + b) * c, a * b + c, ans + b])).slice(0, 3);
  return mcq("What is \\(" + a + " + " + b + " \\times " + c + "\\)?",
    { t: String(ans), fb: "Correct: multiply first, \\(" + b + " \\times " + c + " = " + (b * c) + "\\), then add." },
    ds.map(function (d) { return { t: String(d), fb: d === (a + b) * c ? "That works left to right; multiplication is done before addition." : "Multiplication comes before addition in the standard order." }; }),
    "Multiplication first: \\(" + b + " \\times " + c + " = " + (b * c) + "\\). Then \\(" + a + " + " + (b * c) + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, b: b, c: c });
}, ["Look for multiplication or division first.", "Addition is done after the multiplication here."]);

E("u1-pk-ooo-brackets", 1, ["8.4"], 1, "gen", function () {
  var a = ri(2, 15), b = ri(2, 15), c = ri(2, 9), ans = (a + b) * c;
  var cand = pk7uniq(ans, [a + b * c, (a + b) + c, a * b + c, (a + b) * (c + 1)]);
  if (ans >= 100) cand = cand.filter(function (v) { return v !== a * b + c; });
  var ds = pk7fill(ans, cand).slice(0, 3);
  return mcq("What is \\((" + a + " + " + b + ") \\times " + c + "\\)?",
    { t: String(ans), fb: "Correct: the brackets are done first, \\(" + a + " + " + b + " = " + (a + b) + "\\), then multiply by " + c + "." },
    ds.map(function (d) { return { t: String(d), fb: d === a + b * c ? "That ignores the brackets; brackets are always done first." : "Brackets come before everything else in the standard order." }; }),
    "Brackets first: \\(" + a + " + " + b + " = " + (a + b) + "\\). Then \\(" + (a + b) + " \\times " + c + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, b: b, c: c });
}, ["Look for brackets: they are done first.", "Then finish the operations outside the brackets."]);

E("u1-pk-ooo-chain", 1, ["8.4"], 2, "gen", function () {
  var a = ri(2, 9), b = ri(2, 9), c = ri(2, 6), d = ri(2, 6), g = 0;
  while (g++ < 200 && a * b - c * d < 10) { a = ri(3, 9); b = ri(3, 9); c = ri(2, 6); d = ri(2, 6); }
  var ans = a * b - c * d;
  var ds = pk7fill(ans, pk7uniq(ans, [(a * b - c) * d, a * (b - c) * d, a * b - c + d])).slice(0, 3);
  return mcq("What is \\(" + a + " \\times " + b + " - " + c + " \\times " + d + "\\)?",
    { t: String(ans), fb: "Correct: both multiplications first, \\(" + (a * b) + " - " + (c * d) + "\\), then subtract." },
    ds.map(function (x) { return { t: String(x), fb: "Do both multiplications before any subtraction." }; }),
    "Multiplications first: \\(" + a + " \\times " + b + " = " + (a * b) + "\\) and \\(" + c + " \\times " + d + " = " + (c * d) + "\\). Then \\(" + (a * b) + " - " + (c * d) + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, b: b, c: c, d: d });
}, ["There are two multiplications; do both of them first.", "Only then subtract."]);

E("u1-pk-ooo-division", 1, ["8.4"], 2, "gen", function () {
  var qc = ri(2, 9), c = ri(2, 9), p = qc * c, r = ri(2, 12), s = ri(2, 9), ans = qc + r * s;
  var ds = pk7fill(ans, pk7uniq(ans, [(qc + r) * s, qc + r + s, p + r * s])).slice(0, 3);
  return mcq("What is \\(" + p + " \\div " + c + " + " + r + " \\times " + s + "\\)?",
    { t: String(ans), fb: "Correct: \\(" + p + " \\div " + c + " = " + qc + "\\) and \\(" + r + " \\times " + s + " = " + (r * s) + "\\) first, then add." },
    ds.map(function (x) { return { t: String(x), fb: x === p + r * s ? "That keeps " + p + " undivided; the division is done before the addition." : "Division and multiplication are both done before addition." }; }),
    "Division and multiplication first: \\(" + p + " \\div " + c + " = " + qc + "\\) and \\(" + r + " \\times " + s + " = " + (r * s) + "\\). Then \\(" + qc + " + " + (r * s) + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { p: p, c: c, r: r, s: s });
}, ["Do the division and the multiplication before the addition.", "There are two operations to finish before the final add."]);

E("u1-pk-ooo-why", 1, ["8.4"], 2, "gen", function () {
  var a = ri(2, 12), b = ri(2, 9), c = ri(2, 9), ans = a + b * c;
  var ds = pk7fill(ans, pk7uniq(ans, [(a + b) * c, a * b + c, a + b + c])).slice(0, 3);
  return mcq("Two students evaluate \\(" + a + " + " + b + " \\times " + c + "\\). One works left to right and gets " + ((a + b) * c) + ". The other uses the standard order of operations. What does the second student get?",
    { t: String(ans), fb: "Correct: the standard order does the multiplication first, so everyone who follows it gets " + ans + "." },
    ds.map(function (x) { return { t: String(x), fb: x === (a + b) * c ? "That is the left-to-right value; the standard order exists so an expression has just one value." : "With the standard order, multiplication is done before addition." }; }),
    "The standard order does multiplication before addition: \\(" + b + " \\times " + c + " = " + (b * c) + "\\), then \\(" + a + " + " + (b * c) + " = " + ans + "\\). Agreeing on one order means the expression has one value. The answer is <b>" + ans + "</b>.",
    { a: a, b: b, c: c });
}, ["Which operation does the standard order do first here?", "The standard order is what gives the expression a single value."]);

/* ================= Integers in context (below-zero) =================
   Grounding: MA6.1.2 (integers on the number line), MA6.1.4
   (representing and comparing quantities less than zero) and
   MA6.3.20 (placing integers on a number line), at the Grade 6
   introductory pitch: representation and comparison only, no
   integer operations. Supports host indicators 6.24 to 6.29. */

E("u2-pk-below-temp", 2, ["6.24"], 1, "gen", function () {
  var T = ri(2, 15);
  var ds = pk7uniq("-" + T + " °C", [T + " °C", "0 °C", "-" + (T + 1) + " °C"]);
  return mcq("The temperature is " + T + " degrees below zero. Which temperature is this?",
    { t: "-" + T + " °C", fb: "Correct: below zero is written with a negative sign." },
    ds.map(function (d) { return { t: d, fb: d === T + " °C" ? "That is " + T + " degrees above zero; below zero takes a negative sign." : "Below zero means a negative number of degrees." }; }),
    "Temperatures below zero are negative: " + T + " degrees below zero is <b>-" + T + " °C</b>.",
    { T: T });
}, ["Below zero is the negative side of the scale.", "The number of degrees stays the same; the sign changes."]);

E("u2-pk-below-debt", 2, ["6.24"], 1, "gen", function () {
  var D = ri(5, 40);
  var ds = pk7uniq("-" + D, [String(D), "0", "-" + (D + 5)]);
  return mcq("Sam owes his sister $" + D + ". Which integer represents the amount of money Sam has, compared with having nothing?",
    { t: "-" + D, fb: "Correct: owing money is a quantity less than zero." },
    ds.map(function (d) { return { t: d, fb: d === String(D) ? "That is having $" + D + "; owing is the opposite direction, below zero." : "Owing is less than zero, so the integer is negative." }; }),
    "Having nothing is 0, and owing $" + D + " is $" + D + " less than that, so the integer is <b>-" + D + "</b>.",
    { D: D });
}, ["Having nothing is zero on this scale.", "Owing is below zero, so it is negative."]);

E("u2-pk-below-line", 2, ["6.24"], 1, "gen", function () {
  var mark = ri(-4, -1);
  var ds = pk7uniq(mark, [-mark, mark - 1, mark + 1]).slice(0, 3);
  var q = mcq("Which integer does the marker show on this number line?",
    { t: String(mark), fb: "Correct: the marker is " + Math.abs(mark) + " tick(s) to the left of 0." },
    ds.map(function (d) { return { t: String(d), fb: d === -mark ? "That is the same distance from zero but on the positive side." : "Count the ticks from 0 and note the side." }; }),
    "The marker is " + Math.abs(mark) + " tick(s) to the left of 0, so it shows <b>" + mark + "</b>.",
    { mark: mark });
  q.figure = pk7line(-5, 5, [mark], null);
  return q;
}, ["Find 0 first, then count the ticks to the marker.", "Numbers to the left of 0 are negative."]);

E("u2-pk-below-compare", 2, ["6.24"], 1, "gen", function () {
  var cold = ri(11, 15), mild = ri(10, cold - 1), warm = ri(1, 5);
  var key = "-" + cold + " °C";
  var ds = pk7uniq(key, ["-" + mild + " °C", warm + " °C", "0 °C"]);
  return mcq("Which of these temperatures is the coldest?",
    { t: key, fb: "Correct: -" + cold + " °C is furthest below zero." },
    ds.map(function (d) { return { t: d, fb: "The further a temperature is below zero, the colder it is; a bigger number after the negative sign means colder, not warmer." }; }),
    "Below zero, the larger the number after the negative sign, the colder the temperature. The coldest is <b>-" + cold + " °C</b>.",
    { cold: cold, mild: mild, warm: warm });
}, ["Picture the temperatures on a number line.", "The coldest temperature is the furthest to the left."]);

/* ================= Averaging a set of numbers (averaging) =================
   Grounding: no elementary outcome on file names the mean or the
   average (verified against the Mathematics 4 to 6 lists), so
   this group is authored with the provenance "placement
   unevidenced" under the specification's ruling 3: the items
   assess the computation only (add the set, divide by the count),
   never the measures Mathematics 7 names in 11.6 and 11.9. The
   arithmetic rests on the addition and division outcomes above.
   Supports host indicators 11.6 to 11.13. */

/* A set of n values with exact mean m: offsets in pairs (+d, -d),
   plus a 0 offset when n is odd, so the values always average
   exactly m and stay inside [m - spread, m + spread]. */
function pk7avgValues(n, m, spread) {
  var offs = [];
  while (offs.length + 2 <= n) { var d = ri(1, spread); offs.push(d); offs.push(-d); }
  if (offs.length < n) offs.push(0);
  return offs.map(function (o) { return m + o; });
}

E("u7-pk-average-whole", 7, ["11.6"], 1, "gen", function () {
  var n = ri(3, 5), m = ri(8, 30), vals = pk7avgValues(n, m, 6);
  var sum = vals.reduce(function (s, v) { return s + v; }, 0);
  var ds = pk7uniq(m, [sum, m + 1, m - 1]).slice(0, 3);
  return mcq("What is the average of " + vals.join(", ") + "?",
    { t: String(m), fb: "Correct: the total is " + sum + ", and " + sum + " divided by " + n + " values is " + m + "." },
    ds.map(function (d) { return { t: String(d), fb: d === sum ? "That is the total of the values; an average also divides by how many values there are." : "Add all the values, then divide by how many there are." }; }),
    "Add the values: the total is " + sum + ". Divide by the number of values: \\(" + sum + " \\div " + n + " = " + m + "\\). The answer is <b>" + m + "</b>.",
    { vals: vals });
}, ["First find the total of all the values.", "Then divide the total by how many values there are."]);

E("u7-pk-average-set", 7, ["11.6"], 2, "gen", function () {
  var n = ri(6, 8), m = ri(15, 60), vals = pk7avgValues(n, m, 9);
  var sum = vals.reduce(function (s, v) { return s + v; }, 0);
  var ds = pk7uniq(m, [sum, m + 2, m - 2]).slice(0, 3);
  return mcq("What is the average of " + vals.join(", ") + "?",
    { t: String(m), fb: "Correct: the total is " + sum + ", and " + sum + " divided by " + n + " values is " + m + "." },
    ds.map(function (d) { return { t: String(d), fb: d === sum ? "That is the total of the values; an average also divides by how many values there are." : "Add all " + n + " values, then divide by " + n + "." }; }),
    "Add the values: the total is " + sum + ". Divide by the number of values: \\(" + sum + " \\div " + n + " = " + m + "\\). The answer is <b>" + m + "</b>.",
    { vals: vals });
}, ["First find the total of all the values.", "Then divide the total by how many values there are."]);

E("u7-pk-average-money", 7, ["11.6"], 2, "gen", function () {
  var n = ri(3, 5), M = ri(4, 20), offs = [];
  while (offs.length + 2 <= n) { var d = pick([0.5, 1, 1.5, 2]); offs.push(d); offs.push(-d); }
  if (offs.length < n) offs.push(0);
  var vals = offs.map(function (o) { return M + o; });
  var sum = vals.reduce(function (s, v) { return s + v; }, 0);
  function s(v) { return "$" + fmtF(v, 2); }
  var ds = pk7uniq(s(M), [s(sum), s(M + 0.5), s(M - 0.5)]);
  return mcq("A book costs " + vals.map(s).join(", ") + " at " + n + " different shops. What is the average price?",
    { t: s(M), fb: "Correct: the total is " + s(sum) + ", and " + s(sum) + " divided by " + n + " shops is " + s(M) + "." },
    ds.map(function (d) { return { t: d, fb: d === s(sum) ? "That is the total of the prices; an average also divides by how many prices there are." : "Add all the prices, then divide by how many there are." }; }),
    "Add the prices: the total is " + s(sum) + ". Divide by the number of shops: \\(" + fmtF(sum, 2) + " \\div " + n + " = " + fmtF(M, 2) + "\\). The answer is <b>" + s(M) + "</b>.",
    { vals: vals });
}, ["First find the total of all the prices.", "Then divide the total by how many prices there are."]);

E("u7-pk-average-decimals", 7, ["11.6"], 2, "gen", function () {
  var n = ri(4, 6), M10 = ri(25, 95), offs = [];
  while (offs.length + 2 <= n) { var d = ri(1, 9); offs.push(d); offs.push(-d); }
  if (offs.length < n) offs.push(0);
  var vals = offs.map(function (o) { return (M10 + o) / 10; });
  var sum10 = vals.reduce(function (s, v) { return s + Math.round(v * 10); }, 0);
  function s(v) { return fmtF(v, 1); }
  var ds = pk7uniq(s(M10 / 10), [s(sum10 / 10), s((M10 + 2) / 10), s((M10 - 2) / 10)]);
  return mcq("What is the average of " + vals.map(s).join(", ") + "?",
    { t: s(M10 / 10), fb: "Correct: the total is " + s(sum10 / 10) + ", and dividing by " + n + " values gives " + s(M10 / 10) + "." },
    ds.map(function (d) { return { t: d, fb: d === s(sum10 / 10) ? "That is the total of the values; an average also divides by how many values there are." : "Add all the values, then divide by how many there are." }; }),
    "Add the values: the total is " + s(sum10 / 10) + ". Divide by the number of values: \\(" + s(sum10 / 10) + " \\div " + n + " = " + s(M10 / 10) + "\\). The answer is <b>" + s(M10 / 10) + "</b>.",
    { vals: vals });
}, ["First find the total of all the values.", "Then divide the total by how many values there are."]);

E("u7-pk-average-small", 7, ["11.6"], 1, "gen", function () {
  var m = ri(5, 20), d = ri(1, 4), vals = [m - d, m, m + d], sum = 3 * m;
  var ds = pk7uniq(m, [sum, m + d, m - d]).slice(0, 3);
  return mcq("What is the average of " + vals.join(", ") + "?",
    { t: String(m), fb: "Correct: the total is " + sum + ", and " + sum + " divided by 3 values is " + m + "." },
    ds.map(function (x) { return { t: String(x), fb: x === sum ? "That is the total of the values; an average also divides by how many values there are." : "That is one of the values itself; an average comes from the total, divided by the count." }; }),
    "Add the values: \\(" + vals.join(" + ") + " = " + sum + "\\). Divide by the number of values: \\(" + sum + " \\div 3 = " + m + "\\). The answer is <b>" + m + "</b>.",
    { vals: vals });
}, ["First find the total of all the values.", "Then divide the total by how many values there are."]);

/* ================= Tranche metadata =================
   pkSrc names what the item assesses; pkFor lists the host
   indicators the entry supports; pkGroup is the strand group.
   The indicators array on each entry above carries the first
   code of its pkFor list, per the specification's Section 10. */
var PK7_FOR_FACTS = ["5.1", "5.2", "5.3", "5.4"];
var PK7_FOR_MULT = ["5.1", "5.2", "5.3", "5.4", "7.5", "7.6", "7.9", "7.10", "7.11", "7.12"];
var PK7_FOR_ADDSUB = ["6.24", "6.25", "6.26", "6.27", "6.28", "6.29"];
var PK7_FOR_OOO = ["8.4", "8.5", "8.6", "7.1", "7.2", "7.3", "7.4", "7.7", "7.8"];
var PK7_FOR_AVG = ["11.6", "11.7", "11.8", "11.9", "11.10", "11.11", "11.12", "11.13"];
var PKT7 = {
  "u1-pk-fact-recall": { src: "math-5:MA5.5.19", group: "multiplication-facts", for: PK7_FOR_FACTS },
  "u1-pk-fact-division": { src: "math-5:MA5.5.19", group: "multiplication-facts", for: PK7_FOR_FACTS },
  "u1-pk-fact-onemore": { src: "math-5:MA5.5.16", group: "multiplication-facts", for: PK7_FOR_FACTS },
  "u1-pk-fact-skip": { src: "math-5:MA5.5.16", group: "multiplication-facts", for: PK7_FOR_FACTS },
  "u1-pk-fact-halving": { src: "math-5:MA5.5.17", group: "multiplication-facts", for: PK7_FOR_FACTS },
  "u1-pk-mult-2by1": { src: "math-4:MA4.5.12", group: "multiplication-fluency", for: PK7_FOR_MULT },
  "u1-pk-mult-3by1": { src: "math-4:MA4.5.12", group: "multiplication-fluency", for: PK7_FOR_MULT },
  "u1-pk-mult-2by2": { src: "math-5:MA5.5.4", group: "multiplication-fluency", for: PK7_FOR_MULT },
  "u1-pk-mult-zeros": { src: "math-5:MA5.5.18", group: "multiplication-fluency", for: PK7_FOR_MULT },
  "u1-pk-mult-3by2": { src: "math-5:MA5.5.5", group: "multiplication-fluency", for: PK7_FOR_MULT },
  "u1-pk-div-exact": { src: "math-5:MA5.5.8", group: "division-fluency", for: PK7_FOR_MULT },
  "u1-pk-div-remainder": { src: "math-5:MA5.5.9", group: "division-fluency", for: PK7_FOR_MULT },
  "u1-pk-div-2digit": { src: "math-5:MA5.5.x", group: "division-fluency", for: PK7_FOR_MULT },
  "u1-pk-div-related": { src: "math-5:MA5.5.19", group: "division-fluency", for: PK7_FOR_MULT },
  "u1-pk-div-zeros": { src: "math-5:MA5.5.x", group: "division-fluency", for: PK7_FOR_MULT },
  "u2-pk-add-regroup": { src: "math-4:MA4.4.4", group: "addition-subtraction", for: PK7_FOR_ADDSUB },
  "u2-pk-sub-regroup": { src: "math-4:MA4.4.5", group: "addition-subtraction", for: PK7_FOR_ADDSUB },
  "u2-pk-add-three": { src: "math-4:MA4.4.6", group: "addition-subtraction", for: PK7_FOR_ADDSUB },
  "u2-pk-sub-line": { src: "math-4:MA4.4.6", group: "addition-subtraction", for: PK7_FOR_ADDSUB },
  "u2-pk-addsub-large": { src: "math-4:MA4.4.4", group: "addition-subtraction", for: PK7_FOR_ADDSUB },
  "u2-pk-order-place": { src: "math-4:MA4.1.1", group: "ordering-numbers", for: PK7_FOR_ADDSUB },
  "u2-pk-order-line": { src: "math-4:MA4.1.2", group: "ordering-numbers", for: PK7_FOR_ADDSUB },
  "u2-pk-order-missing": { src: "math-4:MA4.1.2", group: "ordering-numbers", for: PK7_FOR_ADDSUB },
  "u2-pk-order-decimals": { src: "math-5:MA5.3.18", group: "ordering-numbers", for: PK7_FOR_ADDSUB },
  "u2-pk-order-below": { src: "math-6:MA6.1.2", group: "ordering-numbers", for: PK7_FOR_ADDSUB },
  "u7-pk-order-line": { src: "math-4:MA4.1.2", group: "ordering-numbers", for: PK7_FOR_AVG },
  "u7-pk-order-below": { src: "math-6:MA6.1.2", group: "ordering-numbers", for: PK7_FOR_AVG },
  "u1-pk-multiples-identify": { src: "math-6:MA6.5.7", group: "multiples", for: PK7_FOR_FACTS },
  "u1-pk-multiples-first": { src: "math-6:MA6.5.7", group: "multiples", for: PK7_FOR_FACTS },
  "u1-pk-multiples-common": { src: "math-6:MA6.5.8", group: "multiples", for: PK7_FOR_FACTS },
  "u1-pk-multiples-problem": { src: "math-6:MA6.5.8", group: "multiples", for: PK7_FOR_FACTS },
  "u1-pk-ooo-basic": { src: "math-6:MA6.5.9", group: "order-of-operations", for: PK7_FOR_OOO },
  "u1-pk-ooo-brackets": { src: "math-6:MA6.5.9", group: "order-of-operations", for: PK7_FOR_OOO },
  "u1-pk-ooo-chain": { src: "math-6:MA6.5.9", group: "order-of-operations", for: PK7_FOR_OOO },
  "u1-pk-ooo-division": { src: "math-6:MA6.5.9", group: "order-of-operations", for: PK7_FOR_OOO },
  "u1-pk-ooo-why": { src: "math-6:MA6.5.10", group: "order-of-operations", for: PK7_FOR_OOO },
  "u2-pk-below-temp": { src: "math-6:MA6.1.4", group: "below-zero", for: PK7_FOR_ADDSUB },
  "u2-pk-below-debt": { src: "math-6:MA6.1.4", group: "below-zero", for: PK7_FOR_ADDSUB },
  "u2-pk-below-line": { src: "math-6:MA6.1.2", group: "below-zero", for: PK7_FOR_ADDSUB },
  "u2-pk-below-compare": { src: "math-6:MA6.1.4", group: "below-zero", for: PK7_FOR_ADDSUB },
  "u7-pk-average-whole": { src: "authored:averaging a set of numbers, placement unevidenced", group: "averaging", for: PK7_FOR_AVG },
  "u7-pk-average-set": { src: "authored:averaging a set of numbers, placement unevidenced", group: "averaging", for: PK7_FOR_AVG },
  "u7-pk-average-money": { src: "authored:averaging a set of numbers, placement unevidenced", group: "averaging", for: PK7_FOR_AVG },
  "u7-pk-average-decimals": { src: "authored:averaging a set of numbers, placement unevidenced", group: "averaging", for: PK7_FOR_AVG },
  "u7-pk-average-small": { src: "authored:averaging a set of numbers, placement unevidenced", group: "averaging", for: PK7_FOR_AVG }
};
BANK.forEach(function (e) { var t = PKT7[e.id]; if (t) { e.pkFlag = true; e.pkSrc = t.src; e.pkFor = t.for.slice(); e.pkGroup = t.group; } });

/* ================================================================
   Band 3 Piece 2 (November 16, 2026): area of a rectangle and the
   measurement base, all housed in Unit 4, per
   Math-7-PK-Band-3-Specification-2026-11-16.md Section 7. 25
   entries, all authored new, in five groups: rectangle-area and
   perimeter (cluster 7-C9), ruler-measurement, circle-measure and
   decimal-multiplication (cluster 7-C8). Percent of a quantity is
   excluded from this unit's check (specification Section 13,
   Decision 1): no percent group is built here. Provenance is
   recorded three ways, in agreement: the comment block at the head
   of each group section below, the pkSrc property each entry gains
   from the PKT7_P2 table at the end of this file, and the build
   report's source-to-host table. Each entry's indicators array
   carries the first code of its group's Supports column; pkFor
   carries the full list. Figure-bearing items draw the figure from
   the item's own values on every draw (a rectangle scaled to its
   labelled sides, a ruler whose object ends exactly on the tick
   for its stated length, a circle part drawn to the part named),
   and no figure hands over the key: side labels state lengths,
   never the area or perimeter asked for. */

/* Rectangle drawn to scale from its own side lengths, labelled
   underneath (length) and at the left (width). shade is true for
   the area group (the surface is the quantity) and false for the
   perimeter group (the boundary is the quantity). */
function pk7rect(l, w, lText, wText, shade) {
  var sc = Math.min(225 / l, 115 / w), rw = l * sc, rh = w * sc;
  var x0 = (320 - rw) / 2, y0 = (185 - rh) / 2 - 8;
  var out = '<svg viewBox="0 0 320 185" width="320" height="185" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rectangle">';
  out += '<rect x="' + fmt(x0, 1) + '" y="' + fmt(y0, 1) + '" width="' + fmt(rw, 1) + '" height="' + fmt(rh, 1) + '" fill="' + (shade ? FIG_SHADE : "none") + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  out += _txt(x0 + rw / 2, y0 + rh + 18, lText, 12.5, false);
  out += _txt(x0 - 8, y0 + rh / 2 + 4, wText, 12, false, "end");
  return out + '</svg>';
}

/* House-shaped pentagon drawn to scale: base 2a, walls h, roof
   slopes s with the rise r = sqrt(s^2 - a^2) an integer for every
   (a, s) pair the entry draws, so the drawn slope length is the
   labelled s exactly. Labels: base underneath, walls at the right,
   slopes outside the roof lines. */
function pk7house(a, h, s) {
  var r = Math.round(Math.sqrt(s * s - a * a)), W = 2 * a, H = h + r;
  var sc = Math.min(230 / W, 118 / H), x0 = (320 - W * sc) / 2, yB = (185 + H * sc) / 2 - 8;
  function X(x) { return x0 + x * sc; }
  function Y(y) { return yB - y * sc; }
  var out = '<svg viewBox="0 0 320 185" width="320" height="185" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pentagon shaped like a house">';
  out += '<polygon points="' + fmt(X(0), 1) + ',' + fmt(Y(0), 1) + ' ' + fmt(X(W), 1) + ',' + fmt(Y(0), 1) + ' ' + fmt(X(W), 1) + ',' + fmt(Y(h), 1) + ' ' + fmt(X(a), 1) + ',' + fmt(Y(H), 1) + ' ' + fmt(X(0), 1) + ',' + fmt(Y(h), 1) + '" fill="none" stroke="' + FIG_INK + '" stroke-width="2"/>';
  out += _txt(X(a), Y(0) + 18, W + " cm", 12.5, false);
  out += _txt(X(W) + 8, Y(h / 2) + 4, h + " cm", 12, false, "start");
  out += _txt(X(a) - a * sc / 2 - 5, Y(h + r / 2) - 2, s + " cm", 12, false, "end");
  out += _txt(X(a) + a * sc / 2 + 5, Y(h + r / 2) - 2, s + " cm", 12, false, "start");
  return out + '</svg>';
}

/* L-shaped rectilinear hexagon drawn to scale: outer W by H with
   the top-right notch cut to (w2, h1). Side labels sit outside the
   boundary, or inside the notch void for the two inner sides.
   labels is [bottom, right, notch, inner, top, left]. */
function pk7Lshape(W, H, w2, h1, labels) {
  var sc = Math.min(230 / W, 118 / H), x0 = (320 - W * sc) / 2, yB = (185 + H * sc) / 2 - 8;
  function X(x) { return x0 + x * sc; }
  function Y(y) { return yB - y * sc; }
  var pts = [[0, 0], [W, 0], [W, h1], [w2, h1], [w2, H], [0, H]];
  var out = '<svg viewBox="0 0 320 185" width="320" height="185" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="L-shaped polygon">';
  out += '<polygon points="' + pts.map(function (p) { return fmt(X(p[0]), 1) + ',' + fmt(Y(p[1]), 1); }).join(" ") + '" fill="none" stroke="' + FIG_INK + '" stroke-width="2"/>';
  out += _txt(X(W / 2), Y(0) + 18, labels[0], 12, false);
  out += _txt(X(W) + 7, Y(h1 / 2) + 4, labels[1], 12, false, "start");
  out += _txt(X((w2 + W) / 2), Y(h1) - 7, labels[2], 12.5, labels[2] === "?");
  out += _txt(X(w2) + 7, Y((h1 + H) / 2) + 4, labels[3], 12, false, "start");
  out += _txt(X(w2 / 2), Y(H) - 7, labels[4], 12, false);
  out += _txt(X(0) - 7, Y(H / 2) + 4, labels[5], 12, false, "end");
  return out + '</svg>';
}

/* Ruler drawn to the measurement itself: 2 px per millimetre,
   ticks at every millimetre (longer at 5 mm and at each
   centimetre, centimetres numbered below), and the measured
   object as a bar starting at the 0 mark and ending exactly on
   the tick for lenMM. maxCm is the last numbered centimetre. */
function pk7ruler(lenMM, maxCm) {
  var pxmm = 2, x0 = 24, W = x0 + maxCm * 10 * pxmm + 16, H = 104;
  function X(mm) { return x0 + mm * pxmm; }
  var out = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ruler with an object measured from the zero mark">';
  out += '<rect x="' + fmt(X(0), 1) + '" y="14" width="' + fmt(lenMM * pxmm, 1) + '" height="17" fill="' + FIG_ACC + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  out += '<rect x="' + x0 + '" y="42" width="' + (maxCm * 10 * pxmm) + '" height="34" fill="' + FIG_SHADE + '" fill-opacity="0.35" stroke="' + FIG_INK + '" stroke-width="1.8"/>';
  for (var mm = 0; mm <= maxCm * 10; mm++) {
    var tl = mm % 10 === 0 ? 13 : (mm % 5 === 0 ? 9 : 5.5);
    out += '<line x1="' + fmt(X(mm), 1) + '" y1="42" x2="' + fmt(X(mm), 1) + '" y2="' + (42 + tl) + '" stroke="' + FIG_INK + '" stroke-width="' + (mm % 10 === 0 ? 1.5 : 1) + '"/>';
    if (mm % 10 === 0) out += _txt(X(mm), 93, String(mm / 10), 11.5, false);
  }
  return out + '</svg>';
}

/* Two objects on one ruler, for the difference entry: both bars
   start at the 0 mark, names sit in the left margin. */
function pk7ruler2(aMM, bMM, maxCm, nameA, nameB) {
  var pxmm = 2, x0 = 74, W = x0 + maxCm * 10 * pxmm + 16, H = 118;
  function X(mm) { return x0 + mm * pxmm; }
  var out = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ruler with two objects measured from the zero mark">';
  out += _txt(x0 - 6, 24, nameA, 11, false, "end");
  out += '<rect x="' + x0 + '" y="14" width="' + fmt(aMM * pxmm, 1) + '" height="15" fill="' + FIG_ACC + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  out += _txt(x0 - 6, 47, nameB, 11, false, "end");
  out += '<rect x="' + x0 + '" y="37" width="' + fmt(bMM * pxmm, 1) + '" height="15" fill="' + FIG_ALT + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  out += '<rect x="' + x0 + '" y="60" width="' + (maxCm * 10 * pxmm) + '" height="32" fill="' + FIG_SHADE + '" fill-opacity="0.35" stroke="' + FIG_INK + '" stroke-width="1.8"/>';
  for (var mm = 0; mm <= maxCm * 10; mm++) {
    var tl = mm % 10 === 0 ? 12 : (mm % 5 === 0 ? 8.5 : 5);
    out += '<line x1="' + fmt(X(mm), 1) + '" y1="60" x2="' + fmt(X(mm), 1) + '" y2="' + (60 + tl) + '" stroke="' + FIG_INK + '" stroke-width="' + (mm % 10 === 0 ? 1.5 : 1) + '"/>';
    if (mm % 10 === 0) out += _txt(X(mm), 107, String(mm / 10), 11.5, false);
  }
  return out + '</svg>';
}

/* One circle with a single part shown in green: the radius (a
   segment from the centre to the circle), the diameter (a segment
   through the centre touching the circle at both ends), the
   centre (the point in the middle) or the circumference (the
   circle itself, drawn heavier). Vocabulary only: no lengths are
   labelled and no relationship is asked about. */
function pk7circlePart(cx, cy, r, mode) {
  var out = '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="' + (mode === "circumference" ? FIG_ACC : FIG_INK) + '" stroke-width="' + (mode === "circumference" ? 4 : 2) + '"/>';
  if (mode === "radius") out += '<line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + r) + '" y2="' + cy + '" stroke="' + FIG_ACC + '" stroke-width="2.6"/>';
  if (mode === "diameter") {
    out += '<line x1="' + (cx - r) + '" y1="' + cy + '" x2="' + (cx + r) + '" y2="' + cy + '" stroke="' + FIG_ACC + '" stroke-width="2.6"/>';
    out += '<circle cx="' + (cx - r) + '" cy="' + cy + '" r="2.6" fill="' + FIG_INK + '"/><circle cx="' + (cx + r) + '" cy="' + cy + '" r="2.6" fill="' + FIG_INK + '"/>';
  }
  out += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (mode === "centre" ? 5.5 : 3) + '" fill="' + (mode === "centre" ? FIG_ACC : FIG_INK) + '"/>';
  return out;
}
function pk7circleFig(mode) {
  return '<svg viewBox="0 0 220 190" width="220" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Circle with one part shown in green">'
    + pk7circlePart(110, 95, 72, mode) + '</svg>';
}
function pk7circlePickFig(modes) {
  var out = '<svg viewBox="0 0 250 240" width="250" height="240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Four circles, each with a different part shown in green">';
  var letters = ["A", "B", "C", "D"];
  for (var i = 0; i < 4; i++) {
    var cx = 62 + (i % 2) * 126, cy = 56 + Math.floor(i / 2) * 118;
    out += pk7circlePart(cx, cy, 36, modes[i]);
    out += _txt(cx, cy + 56, letters[i], 13, true);
  }
  return out + '</svg>';
}

/* ================= Area of a rectangle (rectangle-area) =================
   Grounding: MA6.9.6 (generalize a rule for the area of
   rectangles), MA6.9.7 (solve a problem involving the area of
   rectangles), MA6.9.5 beneath (how the area of a rectangle is
   determined); MA4.9.9, MA4.9.10 beneath those. Squaring appears
   inside the square entries as a product of two equal factors
   (placement table row 25). Supports host indicators 9.1 to 9.6
   and 9.9. */

E("u4-pk-rect-area", 4, ["9.1"], 1, "gen", function () {
  var l = ri(4, 12), w = ri(3, 9);
  if (l === w) w = w + 1;
  var ans = l * w, per = 2 * (l + w);
  var ds = pk7fill(ans, pk7uniq(ans, [per, l + w, l * (w + 1)])).slice(0, 3);
  var q = mcq("What is the area of the rectangle?",
    { t: ans + " cm²", fb: "Yes: area is length times width, \\(" + l + " \\times " + w + " = " + ans + "\\)." },
    ds.map(function (d) {
      return { t: d + " cm²", fb: d === per ? "That is the perimeter: the distance around the rectangle. Area counts the square units inside it." : (d === l + w ? "That adds the length and the width. Area multiplies them." : "Multiply the length by the width: \\(" + l + " \\times " + w + "\\).") };
    }),
    "\\[ \\begin{aligned} A &= l \\times w \\\\ &= " + l + " \\times " + w + " \\\\ &= " + ans + " \\text{ cm}^2 \\end{aligned} \\] The answer is <b>" + ans + " cm²</b>.",
    { l: l, w: w });
  q.figure = pk7rect(l, w, l + " cm", w + " cm", true);
  return q;
}, ["Area is the number of square units that cover the rectangle.", "Multiply the length by the width."]);

E("u4-pk-rect-area-context", 4, ["9.1"], 1, "gen", function () {
  var ctxs = [
    { thing: "rectangular garden bed", unit: "m", prep: "is" },
    { thing: "rectangular rug", unit: "m", prep: "is" },
    { thing: "rectangular poster", unit: "cm", prep: "is" },
    { thing: "rectangular page of a book", unit: "cm", prep: "is" }
  ];
  var c = pick(ctxs), l = ri(5, 15), w = ri(2, 9);
  if (l === w) l = l + 2;
  var ans = l * w, per = 2 * (l + w), u2 = c.unit + "²";
  var ds = pk7fill(ans, pk7uniq(ans, [per, l + w, ans + w])).slice(0, 3);
  var q = mcq("A " + c.thing + " " + c.prep + " " + l + " " + c.unit + " long and " + w + " " + c.unit + " wide. What is its area?",
    { t: ans + " " + u2, fb: "Yes: area is length times width, \\(" + l + " \\times " + w + " = " + ans + "\\)." },
    ds.map(function (d) {
      return { t: d + " " + u2, fb: d === per ? "That is the perimeter: the distance around the shape. Area counts the square units inside it." : (d === l + w ? "That adds the length and the width. Area multiplies them." : "Multiply the length by the width: \\(" + l + " \\times " + w + "\\).") };
    }),
    "\\[ \\begin{aligned} A &= l \\times w \\\\ &= " + l + " \\times " + w + " \\\\ &= " + ans + " \\text{ " + c.unit + "}^2 \\end{aligned} \\] The answer is <b>" + ans + " " + u2 + "</b>.",
    { l: l, w: w });
  q.figure = pk7rect(l, w, l + " " + c.unit, w + " " + c.unit, true);
  return q;
}, ["The area of a rectangle comes from its length and width.", "Multiply the length by the width."]);

E("u4-pk-rect-square", 4, ["9.1"], 1, "gen", function () {
  var s = pick([3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
  var ans = s * s;
  var ds = pk7fill(ans, pk7uniq(ans, [s * (s + 1), 4 * s, 2 * s, s * (s - 1)])).slice(0, 3);
  var q = mcq("A square has sides of " + s + " cm. What is its area?",
    { t: ans + " cm²", fb: "Yes: a square is a rectangle with equal sides, so its area is \\(" + s + " \\times " + s + " = " + ans + "\\)." },
    ds.map(function (d) {
      return { t: d + " cm²", fb: d === 4 * s ? "That is the perimeter of the square: the distance around it. Area multiplies the side by itself." : "Area is side times side: \\(" + s + " \\times " + s + "\\). A square is a rectangle whose length and width are equal." };
    }),
    "\\[ \\begin{aligned} A &= s \\times s \\\\ &= " + s + " \\times " + s + " \\\\ &= " + ans + " \\text{ cm}^2 \\end{aligned} \\] The answer is <b>" + ans + " cm²</b>.",
    { s: s });
  q.figure = pk7rect(s, s, s + " cm", s + " cm", true);
  return q;
}, ["A square is a rectangle with all sides equal.", "Multiply the side length by itself."]);

E("u4-pk-rect-missing-side", 4, ["9.1"], 2, "gen", function () {
  var w = ri(3, 9), l = ri(4, 12), area = l * w;
  var ds = pk7fill(l, pk7uniq(l, [area - w, l - 1, l + 2])).slice(0, 3);
  var q = mcq("A rectangle has an area of " + area + " cm². One side is " + w + " cm long. What is the length of the other side?",
    { t: l + " cm", fb: "Yes: the other side is the area divided by the known side, \\(" + area + " \\div " + w + " = " + l + "\\)." },
    ds.map(function (d) {
      return { t: d + " cm", fb: d === area - w ? "That subtracts the side from the area. Area is a product, so undo it with division." : "The area is the known side times the missing side, so divide the area by the known side." };
    }),
    "\\[ \\begin{aligned} \\text{other side} &= A \\div w \\\\ &= " + area + " \\div " + w + " \\\\ &= " + l + " \\text{ cm} \\end{aligned} \\] Check: \\(" + l + " \\times " + w + " = " + area + "\\). The answer is <b>" + l + " cm</b>.",
    { l: l, w: w, area: area });
  q.figure = pk7rect(l, w, "?", w + " cm", true);
  return q;
}, ["Area is length times width, so one side comes from the area and the other side.", "Divide the area by the side you know."]);

E("u4-pk-rect-decimals", 4, ["9.1"], 2, "gen", function () {
  var l10 = pick([25, 35, 45, 55, 65, 75, 85, 95, 28, 48, 68, 88]), w = ri(2, 6);
  var l = l10 / 10, ans = l * w;
  var cand = [(l10 - 5) * w / 10, (l10 + 5) * w / 10, l + w];
  var ds = cand.map(function (v) {
    return { t: fmt(v), fb: v === l + w ? "That adds the length and the width. Area multiplies them." : "Keep the length as drawn: area is \\(" + fmt(l) + " \\times " + w + "\\)." };
  });
  ds = precPair(fmt(ans), ds);
  var q = mcq("What is the area, in square centimetres, of the rectangle?",
    { t: fmt(ans), fb: "Yes: \\(" + fmt(l) + " \\times " + w + " = " + fmt(ans) + "\\)." },
    ds,
    "\\[ \\begin{aligned} A &= l \\times w \\\\ &= " + fmt(l) + " \\times " + w + " \\\\ &= " + fmt(ans) + " \\text{ cm}^2 \\end{aligned} \\] The answer is <b>" + fmt(ans) + " cm²</b>.",
    { l10: l10, w: w });
  q.figure = pk7rect(l, w, fmt(l) + " cm", w + " cm", true);
  return q;
}, ["Area is length times width, with decimals just as with whole numbers.", "Multiply the two side lengths."]);

E("u4-pk-rect-square-decimal", 4, ["9.1"], 2, "gen", function () {
  var s10 = pick([5, 12, 15, 24, 25, 35, 45, 55]), s = s10 / 10, ans = s * s;
  var cand = [4 * s, 2 * s, ans * 10];
  var ds = cand.map(function (v) {
    return { t: fmt(v), fb: v === 4 * s ? "That is the perimeter of the square. Area multiplies the side by itself." : (v === 2 * s ? "That doubles the side. Area is side times side." : "That answer is ten times too large: check the decimal point when you multiply.") };
  });
  ds = precPair(fmt(ans), ds);
  var q = mcq("A square tile has sides of " + fmt(s) + " m. What is the area of the tile, in square metres?",
    { t: fmt(ans), fb: "Yes: \\(" + fmt(s) + " \\times " + fmt(s) + " = " + fmt(ans) + "\\)." },
    ds,
    "\\[ \\begin{aligned} A &= s \\times s \\\\ &= " + fmt(s) + " \\times " + fmt(s) + " \\\\ &= " + fmt(ans) + " \\text{ m}^2 \\end{aligned} \\] The answer is <b>" + fmt(ans) + " m²</b>.",
    { s10: s10 });
  q.figure = pk7rect(s, s, fmt(s) + " m", fmt(s) + " m", true);
  return q;
}, ["A square is a rectangle with all sides equal.", "Multiply the side length by itself, and place the decimal point by estimating."]);

/* ================= Perimeter (perimeter) =================
   Grounding: MA6.9.3 (how the perimeter of any polygon can be
   determined: add the side lengths), MA6.9.4 (generalize a rule
   for the perimeter of polygons, including rectangles and
   squares), MA6.9.7 (solve a problem involving the perimeter of
   polygons). Supports host indicators 9.1 to 9.6 and 9.9. */

E("u4-pk-perim-rect", 4, ["9.1"], 1, "gen", function () {
  var l = ri(5, 14), w = ri(3, 9);
  if (l === w) l = l + 1;
  var ans = 2 * (l + w);
  var ds = pk7fill(ans, pk7uniq(ans, [l * w, l + w, 2 * l + w])).slice(0, 3);
  var q = mcq("What is the perimeter of the rectangle?",
    { t: ans + " cm", fb: "Yes: add the sides all the way around: \\(" + l + " + " + w + " + " + l + " + " + w + " = " + ans + "\\)." },
    ds.map(function (d) {
      return { t: d + " cm", fb: d === l * w ? "That multiplies the sides, which gives the area. Perimeter adds the sides." : (d === l + w ? "That adds one length and one width, which is only halfway around." : "Go all the way around: two lengths and two widths.") };
    }),
    "\\[ \\begin{aligned} P &= l + w + l + w \\\\ &= " + l + " + " + w + " + " + l + " + " + w + " \\\\ &= " + ans + " \\text{ cm} \\end{aligned} \\] The answer is <b>" + ans + " cm</b>.",
    { l: l, w: w });
  q.figure = pk7rect(l, w, l + " cm", w + " cm", false);
  return q;
}, ["Perimeter is the distance all the way around a shape.", "Add every side length, counting each side once."]);

E("u4-pk-perim-square", 4, ["9.1"], 1, "gen", function () {
  var s = pick([3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
  var ans = 4 * s;
  var ds = pk7uniq(ans, [s * s, 2 * s, 4 * (s + 1)]).slice(0, 3);
  var q = mcq("What is the perimeter of the square?",
    { t: ans + " cm", fb: "Yes: a square has four equal sides, so the perimeter is \\(4 \\times " + s + " = " + ans + "\\)." },
    ds.map(function (d) {
      return { t: d + " cm", fb: d === s * s ? "That multiplies the side by itself, which gives the area. Perimeter adds the four sides." : "Add the side length four times, once for each side of the square." };
    }),
    "\\[ \\begin{aligned} P &= 4 \\times s \\\\ &= 4 \\times " + s + " \\\\ &= " + ans + " \\text{ cm} \\end{aligned} \\] The answer is <b>" + ans + " cm</b>.",
    { s: s });
  q.figure = pk7rect(s, s, s + " cm", s + " cm", false);
  return q;
}, ["All four sides of a square are the same length.", "Add the side length four times."]);

E("u4-pk-perim-pentagon", 4, ["9.1"], 2, "gen", function () {
  var pair = pick([[3, 5], [4, 5], [5, 13], [6, 10], [8, 10], [12, 13]]);
  var a = pair[0], s = pair[1], h = ri(3, 8), W = 2 * a;
  var ans = W + 2 * h + 2 * s;
  var ds = pk7fill(ans, pk7uniq(ans, [ans - s, ans - 2 * h, W * h])).slice(0, 3);
  var q = mcq("What is the perimeter of the shape?",
    { t: ans + " cm", fb: "Yes: add all five sides: \\(" + W + " + " + h + " + " + s + " + " + s + " + " + h + " = " + ans + "\\)." },
    ds.map(function (d) {
      return { t: d + " cm", fb: d === W * h ? "That multiplies the base by the wall height. Perimeter adds the side lengths." : "Count every side once: the base, the two walls and the two roof sides." };
    }),
    "\\[ \\begin{aligned} P &= " + W + " + " + h + " + " + s + " + " + s + " + " + h + " \\\\ &= " + ans + " \\text{ cm} \\end{aligned} \\] The answer is <b>" + ans + " cm</b>.",
    { a: a, s: s, h: h });
  q.figure = pk7house(a, h, s);
  return q;
}, ["Perimeter is the distance all the way around a shape.", "Add every side length, counting each side once."]);

E("u4-pk-perim-missing-side", 4, ["9.1"], 2, "gen", function () {
  var l = ri(5, 12), w = ri(3, 9);
  if (l === w) l = l + 1;
  var per = 2 * (l + w);
  var ds = pk7uniq(l, [per / 2, 2 * l, l + 2]).slice(0, 3);
  var q = mcq("A rectangle has a perimeter of " + per + " cm. One side is " + w + " cm long. What is the length of the side next to it?",
    { t: l + " cm", fb: "Yes: half the perimeter is \\(" + per + " \\div 2 = " + (per / 2) + "\\), and \\(" + (per / 2) + " - " + w + " = " + l + "\\)." },
    ds.map(function (d) {
      return { t: d + " cm", fb: d === per / 2 ? "That is half the perimeter, which is one length plus one width together. Subtract the known side as well." : (d === 2 * l ? "That takes the two known sides off the perimeter but does not split what is left between the two equal sides." : "Work backwards: halve the perimeter, then subtract the known side.") };
    }),
    "\\[ \\begin{aligned} \\text{side} &= P \\div 2 - w \\\\ &= " + per + " \\div 2 - " + w + " \\\\ &= " + l + " \\text{ cm} \\end{aligned} \\] The answer is <b>" + l + " cm</b>.",
    { l: l, w: w, per: per });
  q.figure = pk7rect(l, w, "?", w + " cm", false);
  return q;
}, ["A rectangle's perimeter is two lengths and two widths.", "Halve the perimeter to get one length plus one width, then subtract."]);

E("u4-pk-perim-missing-polygon", 4, ["9.1"], 2, "gen", function () {
  var W = ri(9, 14), H = ri(6, 9), w2 = ri(3, W - 5), h1 = ri(2, H - 3);
  var notch = W - w2, inner = H - h1, per = 2 * (W + H);
  var known = W + h1 + inner + w2 + H;
  var ds = pk7fill(notch, pk7uniq(notch, [w2, inner, notch + 2])).slice(0, 3);
  var q = mcq("The perimeter of the shape is " + per + " cm. What is the length of the side marked ?",
    { t: notch + " cm", fb: "Yes: the labelled sides add to " + known + ", and \\(" + per + " - " + known + " = " + notch + "\\)." },
    ds.map(function (d) {
      return { t: d + " cm", fb: d === w2 ? "That is the length of the top side. The missing side is what the perimeter leaves after the labelled sides are added." : "Add the labelled sides, then subtract their total from the perimeter." };
    }),
    "\\[ \\begin{aligned} \\text{labelled sides} &= " + W + " + " + h1 + " + " + inner + " + " + w2 + " + " + H + " = " + known + " \\\\ \\text{missing side} &= " + per + " - " + known + " \\\\ &= " + notch + " \\text{ cm} \\end{aligned} \\] The answer is <b>" + notch + " cm</b>.",
    { W: W, H: H, w2: w2, h1: h1 });
  q.figure = pk7Lshape(W, H, w2, h1, [W + " cm", h1 + " cm", "?", inner + " cm", w2 + " cm", H + " cm"]);
  return q;
}, ["The perimeter is the total of all the side lengths.", "Add the sides you know, then subtract from the perimeter."]);

/* ================= Reading a ruler (ruler-measurement) =================
   Grounding: MA5.9.1 (how an object is measured using a ruler: it
   is placed at the 0 mark, and a centimetre is 10 millimetres),
   MA5.9.3 (real-world uses of millimetre and centimetre measures),
   with MA5.9.7 to MA5.9.9 beneath (measuring attributes with
   appropriate tools and units). Every figure is drawn from the
   drawn length itself: the object starts at the 0 mark and ends
   exactly on the tick for its stated length. Supports host
   indicators 9.7, 9.8, 9.10, 9.11, 9.12. */

E("u4-pk-ruler-cm", 4, ["9.7"], 1, "gen", function () {
  var cm = ri(3, 12), maxCm = cm + ri(1, 2);
  var ds = pk7uniq(cm, [cm - 1, cm + 1, cm + 2]).slice(0, 3);
  var q = mcq("The green bar starts at the 0 mark of the ruler. How long is the bar?",
    { t: cm + " cm", fb: "Yes: the bar ends at the " + cm + " mark, so it is " + cm + " cm long." },
    ds.map(function (d) {
      return { t: d + " cm", fb: "Follow the bar to the mark where it ends, then read that number." };
    }),
    "The bar starts at the 0 mark and ends at the " + cm + " mark on the ruler. The answer is <b>" + cm + " cm</b>.",
    { cm: cm });
  q.figure = pk7ruler(cm * 10, maxCm);
  return q;
}, ["Line the object up with the 0 mark before you read anything.", "Read the number where the object ends."]);

E("u4-pk-ruler-mm", 4, ["9.7"], 1, "gen", function () {
  var lo = ri(2, 9), extra = pick([3, 4, 6, 7, 8]);
  var mm = lo * 10 + extra, maxCm = lo + 2;
  var ds = pk7uniq(mm, [lo * 10, (lo + 1) * 10, mm + 10]).slice(0, 3);
  var q = mcq("The green bar starts at the 0 mark of the ruler. How long is the bar, in millimetres?",
    { t: mm + " mm", fb: "Yes: the bar ends " + extra + " small ticks past the " + lo + " mark, and each small tick is 1 mm, so the length is " + mm + " mm." },
    ds.map(function (d) {
      return { t: d + " mm", fb: d === lo * 10 ? "That stops at the " + lo + " mark, but the bar runs past it. Count the small ticks beyond the mark as well." : "Count every small tick from 0: each one is 1 millimetre." };
    }),
    "The bar ends " + extra + " small ticks past the " + lo + " mark. Each centimetre is 10 millimetres, so the length is \\(" + lo + " \\times 10 + " + extra + " = " + mm + "\\) mm. The answer is <b>" + mm + " mm</b>.",
    { mm: mm });
  q.figure = pk7ruler(mm, maxCm);
  return q;
}, ["Each small tick on the ruler is 1 millimetre.", "10 millimetres make 1 centimetre."]);

E("u4-pk-ruler-cm-decimal", 4, ["9.7"], 2, "gen", function () {
  var lo = ri(2, 9), extra = pick([2, 3, 4, 6, 7, 8, 9]);
  var mm = lo * 10 + extra, maxCm = lo + 2, ans = mm / 10;
  var cand = [lo, lo + 1, ans + 1];
  var ds = cand.map(function (v) {
    return { t: fmt(v), fb: v === lo ? "That stops at the " + lo + " mark, but the bar runs past it. The small ticks past the mark are tenths of a centimetre." : "Read the centimetre mark first, then count the small ticks as tenths." };
  });
  ds = precPair(fmt(ans), ds);
  var q = mcq("The green bar starts at the 0 mark of the ruler. How long is the bar, in centimetres?",
    { t: fmt(ans), fb: "Yes: the bar ends at " + mm + " mm, and " + mm + " mm is " + fmt(ans) + " cm." },
    ds,
    "The bar ends " + extra + " small ticks past the " + lo + " mark, at " + mm + " mm. Since 10 mm = 1 cm, the length is \\(" + mm + " \\div 10 = " + fmt(ans) + "\\) cm. The answer is <b>" + fmt(ans) + " cm</b>.",
    { mm: mm });
  q.figure = pk7ruler(mm, maxCm);
  return q;
}, ["10 millimetres make 1 centimetre.", "Each small tick past a centimetre mark is one tenth of a centimetre."]);

E("u4-pk-ruler-half", 4, ["9.7"], 1, "gen", function () {
  var lo = ri(3, 10), mm = lo * 10 + 5, maxCm = lo + 2, ans = lo + 0.5;
  var cand = [lo, lo + 1, lo + 1.5];
  var ds = cand.map(function (v) {
    return { t: fmt(v) + " cm", fb: v === lo + 1.5 ? "That reads past the end of the bar. The bar stops halfway between two centimetre marks." : "The bar ends halfway between the " + lo + " mark and the " + (lo + 1) + " mark." };
  });
  var q = mcq("The green bar starts at the 0 mark of the ruler. How long is the bar?",
    { t: fmt(ans) + " cm", fb: "Yes: the bar ends at the long middle tick between " + lo + " and " + (lo + 1) + ", which is " + fmt(ans) + " cm." },
    ds,
    "The bar ends at the long tick halfway between the " + lo + " mark and the " + (lo + 1) + " mark. Halfway between " + lo + " cm and " + (lo + 1) + " cm is " + fmt(ans) + " cm. The answer is <b>" + fmt(ans) + " cm</b>.",
    { mm: mm });
  q.figure = pk7ruler(mm, maxCm);
  return q;
}, ["The longer tick between two centimetre marks is the halfway mark.", "Halfway between two whole numbers is a half."]);

E("u4-pk-ruler-unit-choice", 4, ["9.7"], 1, "gen", function () {
  var objs = [
    { thing: "the thickness of a credit card", len: "about 1 mm", wrong: ["about 1 cm", "about 10 cm", "about 1 m"] },
    { thing: "the width of a fingernail", len: "about 1 cm", wrong: ["about 1 mm", "about 10 mm", "about 1 m"] },
    { thing: "the length of a paper clip", len: "about 3 cm", wrong: ["about 3 mm", "about 30 cm", "about 3 m"] },
    { thing: "the length of an ant", len: "about 5 mm", wrong: ["about 5 cm", "about 50 cm", "about 5 m"] },
    { thing: "the thickness of a coin", len: "about 2 mm", wrong: ["about 2 cm", "about 20 cm", "about 2 m"] }
  ];
  var o = pick(objs);
  return mcq("Which measure best fits " + o.thing + "?",
    { t: o.len, fb: "Yes: " + o.thing + " is best measured in " + (o.len.indexOf("mm") >= 0 ? "millimetres" : "centimetres") + ", and " + o.len + " is the right size." },
    o.wrong.map(function (t) {
      return { t: t, fb: "Picture the object: " + o.thing + " is far smaller than that, or far larger. Millimetres suit very small lengths, centimetres suit small ones." };
    }),
    "The thickness of a credit card and the width of a fingernail are the classic small measures: a credit card is about 1 mm thick and a fingernail about 1 cm wide. For this object, the best fit is <b>" + o.len + "</b>.",
    { thing: o.thing });
}, ["Millimetres are for very small lengths, like the thickness of a card.", "Centimetres are for small lengths, like the width of a fingernail."]);

E("u4-pk-ruler-difference", 4, ["9.7"], 2, "gen", function () {
  var a = ri(6, 11), b = ri(2, a - 2), maxCm = a + 2;
  var diff = a - b;
  var cand = [diff + 1, diff - 1, a];
  var ds = cand.map(function (v) {
    return { t: fmt(v), fb: v === a ? "That is the length of the longer object by itself. The question asks how much longer it is than the shorter one." : "Read both lengths from the ruler, then subtract the shorter from the longer." };
  });
  ds = precPair(fmt(diff), ds);
  var q = mcq("Two objects are measured on the ruler. How many centimetres longer is the green object than the orange object?",
    { t: fmt(diff), fb: "Yes: the green object is " + a + " cm and the orange object is " + b + " cm, and \\(" + a + " - " + b + " = " + diff + "\\)." },
    ds,
    "The green object ends at the " + a + " mark, so it is " + a + " cm long. The orange object ends at the " + b + " mark, so it is " + b + " cm long. \\(" + a + " - " + b + " = " + diff + "\\), so the green object is <b>" + fmt(diff) + " cm</b> longer.",
    { a: a, b: b });
  q.figure = pk7ruler2(a * 10, b * 10, maxCm, "Green", "Orange");
  return q;
}, ["Read each object's length from the ruler first.", "How much longer means subtract the shorter length from the longer one."]);

/* ================= Circle parts and measures (circle-measure) =================
   Placement table row 22: vocabulary only. The parts are named
   and recognized; the relationships among them (radius and
   diameter) are new content taught inside Mathematics 7 itself,
   so no relationship is assessed here. Placement unevidenced: no
   elementary guide outcome names the parts of a circle, so these
   four are authored to the naming itself. Supports host
   indicators 9.7, 9.8, 9.11, 9.12. Note for the build report:
   "circumference" is inherently the longest of the four option
   words; that is a property of the vocabulary construct itself,
   not option padding, and the key rotates across all four words
   so no single word is favoured. */

E("u4-pk-circle-radius", 4, ["9.7"], 1, "gen", function () {
  var q = mcq("What is the name of the part of the circle shown in green?",
    { t: "radius", fb: "Yes: the segment runs from the centre to the circle itself, which is a radius." },
    [{ t: "centre", fb: "The centre is the point in the middle of the circle. The green part is a segment, not a point." },
     { t: "circumference", fb: "The circumference is the distance around the outside of the circle. The green part is a straight segment." },
     { t: "diameter", fb: "A diameter runs all the way across the circle through the centre. The green segment stops at the centre." }],
    "The green segment starts at the centre and ends on the circle. A segment from the centre to the circle is a <b>radius</b>.",
    { mode: "radius" });
  q.figure = pk7circleFig("radius");
  return q;
}, ["Look at where the green part starts and ends.", "A radius joins the centre to the circle."]);

E("u4-pk-circle-diameter", 4, ["9.7"], 1, "gen", function () {
  var q = mcq("What is the name of the part of the circle shown in green?",
    { t: "diameter", fb: "Yes: the segment runs straight across the circle through the centre, which is a diameter." },
    [{ t: "centre", fb: "The centre is the point in the middle of the circle. The green part is a segment, not a point." },
     { t: "circumference", fb: "The circumference is the distance around the outside of the circle. The green part is a straight segment." },
     { t: "radius", fb: "A radius runs from the centre to the circle and stops there. The green segment keeps going across the whole circle." }],
    "The green segment touches the circle at both ends and passes through the centre. A segment across the whole circle through the centre is a <b>diameter</b>.",
    { mode: "diameter" });
  q.figure = pk7circleFig("diameter");
  return q;
}, ["Look at where the green part starts and ends.", "A diameter crosses the whole circle through the centre."]);

E("u4-pk-circle-centre", 4, ["9.7"], 1, "gen", function () {
  var mode = pick(["centre", "circumference"]);
  var key, sol;
  var ds;
  if (mode === "centre") {
    key = { t: "centre", fb: "Yes: the green part is the point in the middle of the circle, which is its centre." };
    ds = [{ t: "circumference", fb: "The circumference is the distance around the outside of the circle. The green part is a point in the middle." },
          { t: "diameter", fb: "A diameter is a segment across the whole circle. The green part is a point, not a segment." },
          { t: "radius", fb: "A radius is a segment from the centre to the circle. The green part is the point itself." }];
    sol = "The green part is the point in the very middle of the circle. That point is the <b>centre</b>.";
  } else {
    key = { t: "circumference", fb: "Yes: the green part is the circle itself, the distance all the way around it, which is its circumference." };
    ds = [{ t: "centre", fb: "The centre is the point in the middle of the circle. The green part goes around the outside." },
          { t: "diameter", fb: "A diameter is a straight segment across the circle. The green part follows the circle itself." },
          { t: "radius", fb: "A radius is a straight segment from the centre to the circle. The green part follows the circle itself." }];
    sol = "The green part is the circle itself: the distance all the way around the outside. That distance is the <b>circumference</b>.";
  }
  var q = mcq("What is the name of the part of the circle shown in green?", key, ds, sol, { mode: mode });
  q.figure = pk7circleFig(mode);
  return q;
}, ["Look at what the green part is: a point, a segment, or the circle itself.", "The centre is the point in the middle; the circumference is the distance around the outside."]);

E("u4-pk-circle-pick", 4, ["9.7"], 1, "gen", function () {
  var parts = ["radius", "diameter", "circumference"];
  var target = pick(parts);
  var others = parts.filter(function (p) { return p !== target; });
  var modes = [target, others[0], others[1], pick(others)];
  for (var i = modes.length - 1; i > 0; i--) { var j = ri(0, i), tmp = modes[i]; modes[i] = modes[j]; modes[j] = tmp; }
  var idx = modes.indexOf(target), letter = "ABCD"[idx];
  var desc = target === "radius" ? "a segment from the centre to the circle" : (target === "diameter" ? "a segment across the whole circle through the centre" : "the circle itself, the distance around the outside");
  var q = mcq("Which diagram shows the " + target + " of a circle in green?",
    { t: "Diagram " + letter, fb: "Yes: diagram " + letter + " shows " + desc + "." },
    ["A", "B", "C", "D"].filter(function (L) { return L !== letter; }).map(function (L) {
      var m = modes["ABCD".indexOf(L)];
      return { t: "Diagram " + L, fb: "Diagram " + L + " shows " + (m === "radius" ? "a radius: a segment from the centre to the circle" : (m === "diameter" ? "a diameter: a segment across the whole circle" : "the circumference: the circle itself")) + ". The question asks for the " + target + "." };
    }),
    "A " + target + " is " + desc + ". Only diagram " + letter + " shows that part in green. The answer is <b>Diagram " + letter + "</b>.",
    { target: target, idx: idx });
  q.figure = pk7circlePickFig(modes);
  return q;
}, ["Name the green part in each diagram before you choose.", "A radius stops at the centre; a diameter crosses the whole circle."]);

/* ================= Multiplying decimals (decimal-multiplication) =================
   Grounding: MA6.6.2 (place the decimal point in a product by
   using estimation), MA6.6.5 (solve a problem involving the
   multiplication of decimals). Squaring is authored inside this
   group as a product of two equal factors (placement table row
   25): whole-number squares grounded in MA5.5.4 (products and
   facts), decimal squares in MA6.6.2. Options are bare numbers
   with the unit named in the stem, and precPair keeps no option
   alone at a decimal precision. Supports host indicators 9.10,
   9.6, 9.9. */

E("u4-pk-dec-mult-whole", 4, ["9.10"], 1, "gen", function () {
  var ctxs = [
    { thing: "bottle of water", holds: "holds", unit: "litres", of: "of water" },
    { thing: "piece of ribbon", holds: "is", unit: "metres", of: "long" }
  ];
  var c = pick(ctxs), d10 = pick([12, 15, 18, 25, 35, 45, 75]), n = ri(3, 6);
  var d = d10 / 10, ans = d * n;
  var cand = [ans / 10, d * (n + 1), Math.floor(d) * n];
  var ds = cand.map(function (v) {
    return { t: fmt(v), fb: v === Math.floor(d) * n ? "That multiplies only the whole-number part of " + fmt(d) + " and drops the decimal part. The question asks for " + n + " lots of the full " + fmt(d) + "." : (v === d * (n + 1) ? "That counts one group too many: there are " + n + " of them, not " + (n + 1) + "." : "Estimate first: " + fmt(d) + " is between whole numbers, so " + n + " lots of it lands near " + fmt(Math.round(d) * n) + ", not at " + fmt(v) + ".") };
  });
  ds = precPair(fmt(ans), ds);
  return mcq("One " + c.thing + " " + c.holds + " " + fmt(d) + " " + c.unit + " " + c.of + ". How many " + c.unit + " is that in " + n + " of them, in total?",
    { t: fmt(ans), fb: "Yes: \\(" + fmt(d) + " \\times " + n + " = " + fmt(ans) + "\\), and the estimate agrees." },
    ds,
    "Estimate first: " + fmt(d) + " is close to " + Math.round(d) + ", and \\(" + Math.round(d) + " \\times " + n + " = " + (Math.round(d) * n) + "\\), so the answer is near " + (Math.round(d) * n) + ". \\[ " + fmt(d) + " \\times " + n + " = " + fmt(ans) + " \\] The answer is <b>" + fmt(ans) + " " + c.unit + "</b>.",
    { d10: d10, n: n });
}, ["Multiplying by a whole number means equal groups of the decimal.", "Estimate with the nearest whole number to place the decimal point."]);

E("u4-pk-dec-mult-near3", 4, ["9.10"], 2, "gen", function () {
  var d10 = pick([24, 35, 42, 55, 65]), m10 = pick([28, 29, 31, 32]);
  var d = d10 / 10, m = m10 / 10, ans = d * m;
  var cand = [ans / 10, ans * 10, d + m];
  var ds = cand.map(function (v) {
    return { t: fmt(v), fb: v === d + m ? "That adds the two numbers. One length is " + fmt(m) + " times the other, which is a multiplication." : "Estimate first: " + fmt(d) + " times about 3 is about " + fmt(3 * d) + ", which places the decimal point." };
  });
  ds = precPair(fmt(ans), ds);
  return mcq("A rope is " + fmt(d) + " m long. A second rope is " + fmt(m) + " times as long. How long is the second rope, in metres?",
    { t: fmt(ans), fb: "Yes: \\(" + fmt(d) + " \\times " + fmt(m) + " = " + fmt(ans) + "\\), matching the estimate of about " + fmt(3 * d) + "." },
    ds,
    "Estimate first: " + fmt(m) + " is close to 3, and \\(" + fmt(d) + " \\times 3 = " + fmt(3 * d) + "\\), so the answer is near " + fmt(3 * d) + ". \\[ " + fmt(d) + " \\times " + fmt(m) + " = " + fmt(ans) + " \\] The answer is <b>" + fmt(ans) + " m</b>.",
    { d10: d10, m10: m10 });
}, ["Times as long means multiply.", "Estimate with a whole number first to place the decimal point."]);

E("u4-pk-dec-square-whole", 4, ["9.10"], 1, "gen", function () {
  var n = pick([6, 7, 8, 9, 11, 12, 13, 14, 15, 20]);
  var ans = n * n;
  var ds = pk7uniq(ans, [2 * n, n * (n + 1), ans + 10]).slice(0, 3);
  return mcq("What is " + n + " × " + n + "?",
    { t: String(ans), fb: "Yes: \\(" + n + " \\times " + n + " = " + ans + "\\)." },
    ds.map(function (d) {
      return { t: String(d), fb: d === 2 * n ? "That doubles " + n + ". Here " + n + " is multiplied by itself, not by 2." : "Multiply " + n + " by itself: \\(" + n + " \\times " + n + "\\)." };
    }),
    "\\[ " + n + " \\times " + n + " = " + ans + " \\] The answer is <b>" + ans + "</b>.",
    { n: n });
}, ["The two factors are the same number.", "Multiply the number by itself."]);

E("u4-pk-dec-square-decimal", 4, ["9.10"], 2, "gen", function () {
  var s10 = pick([5, 6, 12, 15, 24, 25, 35, 45, 55]), s = s10 / 10, ans = s * s;
  var cand = [2 * s, ans * 10, ans / 10];
  var ds = cand.map(function (v) {
    return { t: fmt(v), fb: v === 2 * s ? "That doubles " + fmt(s) + ". Here " + fmt(s) + " is multiplied by itself." : "Estimate first: " + fmt(s) + " is near " + Math.round(s) + ", so the product is near " + (Math.round(s) * Math.round(s)) + ", which places the decimal point." };
  });
  ds = precPair(fmt(ans), ds);
  return mcq("What is " + fmt(s) + " × " + fmt(s) + "?",
    { t: fmt(ans), fb: "Yes: \\(" + fmt(s) + " \\times " + fmt(s) + " = " + fmt(ans) + "\\)." },
    ds,
    "Estimate first: " + fmt(s) + " is close to " + Math.round(s) + ", and \\(" + Math.round(s) + " \\times " + Math.round(s) + " = " + (Math.round(s) * Math.round(s)) + "\\), so the answer is near " + (Math.round(s) * Math.round(s)) + ". \\[ " + fmt(s) + " \\times " + fmt(s) + " = " + fmt(ans) + " \\] The answer is <b>" + fmt(ans) + "</b>.",
    { s10: s10 });
}, ["The two factors are the same number.", "Estimate with the nearest whole number to place the decimal point."]);

/* Piece 2 metadata: grounding source, full Supports list and
   group for each of the 25 entries above. Applied separately from
   the Piece 1 table so the two pieces stay independently
   auditable. */
var PK7_FOR_AREA = ["9.1", "9.2", "9.3", "9.4", "9.5", "9.6", "9.9"];
var PK7_FOR_MEASURE = ["9.7", "9.8", "9.10", "9.11", "9.12"];
var PK7_FOR_DECMULT = ["9.10", "9.6", "9.9"];
var PKT7_P2 = {
  "u4-pk-rect-area": { src: "math-6:MA6.9.6", group: "rectangle-area", for: PK7_FOR_AREA },
  "u4-pk-rect-area-context": { src: "math-6:MA6.9.7", group: "rectangle-area", for: PK7_FOR_AREA },
  "u4-pk-rect-square": { src: "math-6:MA6.9.6", group: "rectangle-area", for: PK7_FOR_AREA },
  "u4-pk-rect-missing-side": { src: "math-6:MA6.9.7", group: "rectangle-area", for: PK7_FOR_AREA },
  "u4-pk-rect-decimals": { src: "math-6:MA6.9.7", group: "rectangle-area", for: PK7_FOR_AREA },
  "u4-pk-rect-square-decimal": { src: "math-6:MA6.9.7", group: "rectangle-area", for: PK7_FOR_AREA },
  "u4-pk-perim-rect": { src: "math-6:MA6.9.4", group: "perimeter", for: PK7_FOR_AREA },
  "u4-pk-perim-square": { src: "math-6:MA6.9.4", group: "perimeter", for: PK7_FOR_AREA },
  "u4-pk-perim-pentagon": { src: "math-6:MA6.9.3", group: "perimeter", for: PK7_FOR_AREA },
  "u4-pk-perim-missing-side": { src: "math-6:MA6.9.7", group: "perimeter", for: PK7_FOR_AREA },
  "u4-pk-perim-missing-polygon": { src: "math-6:MA6.9.7", group: "perimeter", for: PK7_FOR_AREA },
  "u4-pk-ruler-cm": { src: "math-5:MA5.9.1", group: "ruler-measurement", for: PK7_FOR_MEASURE },
  "u4-pk-ruler-mm": { src: "math-5:MA5.9.1", group: "ruler-measurement", for: PK7_FOR_MEASURE },
  "u4-pk-ruler-cm-decimal": { src: "math-5:MA5.9.1", group: "ruler-measurement", for: PK7_FOR_MEASURE },
  "u4-pk-ruler-half": { src: "math-5:MA5.9.1", group: "ruler-measurement", for: PK7_FOR_MEASURE },
  "u4-pk-ruler-unit-choice": { src: "math-5:MA5.9.3", group: "ruler-measurement", for: PK7_FOR_MEASURE },
  "u4-pk-ruler-difference": { src: "math-5:MA5.9.1", group: "ruler-measurement", for: PK7_FOR_MEASURE },
  "u4-pk-circle-radius": { src: "authored:naming the parts of a circle, placement unevidenced", group: "circle-measure", for: PK7_FOR_MEASURE },
  "u4-pk-circle-diameter": { src: "authored:naming the parts of a circle, placement unevidenced", group: "circle-measure", for: PK7_FOR_MEASURE },
  "u4-pk-circle-centre": { src: "authored:naming the parts of a circle, placement unevidenced", group: "circle-measure", for: PK7_FOR_MEASURE },
  "u4-pk-circle-pick": { src: "authored:naming the parts of a circle, placement unevidenced", group: "circle-measure", for: PK7_FOR_MEASURE },
  "u4-pk-dec-mult-whole": { src: "math-6:MA6.6.5", group: "decimal-multiplication", for: PK7_FOR_DECMULT },
  "u4-pk-dec-mult-near3": { src: "math-6:MA6.6.2", group: "decimal-multiplication", for: PK7_FOR_DECMULT },
  "u4-pk-dec-square-whole": { src: "math-5:MA5.5.4", group: "decimal-multiplication", for: PK7_FOR_DECMULT },
  "u4-pk-dec-square-decimal": { src: "math-6:MA6.6.2", group: "decimal-multiplication", for: PK7_FOR_DECMULT }
};
BANK.forEach(function (e) { var t = PKT7_P2[e.id]; if (t) { e.pkFlag = true; e.pkSrc = t.src; e.pkFor = t.for.slice(); e.pkGroup = t.group; } });

/* ============================================================
   Band 3 Piece 3 (November 16, 2026): the remaining Mathematics 7
   clusters, per Math-7-PK-Band-3-Specification-2026-11-16.md
   Section 8. 95 entries are added to this file: 82 authored and
   13 shared copies, and 18 entries already in the bank are flagged
   as state A support sets (metadata only, from the PKT7_P3 table
   at the end of this section; their generators, tags and levels
   are untouched). Final position on completion: bank 374, flagged
   183, per-unit flagged pools U1 43, U2 14, U3 33, U4 32, U5 13,
   U6 10, U7 19, U8 19. Cluster by cluster in map order below,
   after the support-set record. Provenance is recorded three
   ways, in agreement: the comment block at the head of each group,
   the pkSrc property each entry gains from PKT7_P3, and the build
   report's source-to-host table. Each new entry's indicators
   array carries the first code of its group's Supports column;
   pkFor carries the full list. Shared copies are separate entries
   whose generator IS the source generator (the same named
   function), with their own host ID, unit and pkFor. Figure-
   bearing items draw the figure from the item's own values on
   every draw, and no figure hands over the key.
   ============================================================ */

/* Unreduced fraction display (the equivalent-fractions items show
   the scaled form, not the reduced one). */
function pk7eqf(n, d) { return "\\(\\frac{" + n + "}{" + d + "}\\)"; }

/* Venn diagram: two labelled overlapping circles inside a
   rectangle, with a count in each region. counts is
   [aOnly, both, bOnly, neither]; pass null counts for an empty
   diagram (the placement items). */
function pk7venn(labA, labB, counts) {
  var out = '<svg viewBox="0 0 300 190" width="300" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Venn diagram">';
  out += '<rect x="6" y="6" width="288" height="178" fill="none" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  out += '<circle cx="118" cy="92" r="57" fill="' + FIG_SHADE + '" fill-opacity="0.45" stroke="' + FIG_INK + '" stroke-width="1.8"/>';
  out += '<circle cx="182" cy="92" r="57" fill="' + FIG_SHADE + '" fill-opacity="0.45" stroke="' + FIG_INK + '" stroke-width="1.8"/>';
  out += _txt(84, 24, labA, 12, true);
  out += _txt(216, 24, labB, 12, true);
  if (counts) {
    out += _txt(93, 92, String(counts[0]), 15, true);
    out += _txt(150, 92, String(counts[1]), 15, true);
    out += _txt(207, 92, String(counts[2]), 15, true);
    out += _txt(276, 168, String(counts[3]), 13, true);
  }
  return out + '</svg>';
}

/* Carroll diagram: a 2 by 2 cross-classification table with row
   and column headers and a count in each cell. cells is
   [[tl, tr], [bl, br]] matching [rows][cols]. */
function pk7carroll(colA, colB, rowA, rowB, cells) {
  var x0 = 86, y0 = 40, cw = 100, ch = 52, W = 300, H = 168;
  var out = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Carroll diagram">';
  out += _txt(x0 + cw / 2, 22, colA, 11.5, true);
  out += _txt(x0 + 3 * cw / 2, 22, colB, 11.5, true);
  out += _txt(x0 - 6, y0 + ch / 2, rowA, 11.5, true, "end");
  out += _txt(x0 - 6, y0 + 3 * ch / 2, rowB, 11.5, true, "end");
  for (var r = 0; r < 2; r++) for (var c = 0; c < 2; c++) {
    out += '<rect x="' + (x0 + c * cw) + '" y="' + (y0 + r * ch) + '" width="' + cw + '" height="' + ch + '" fill="' + (r + c === 1 ? FIG_SHADE : "#ffffff") + '" fill-opacity="' + (r + c === 1 ? "0.5" : "1") + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
    out += _txt(x0 + c * cw + cw / 2, y0 + r * ch + ch / 2, String(cells[r][c]), 15, true);
  }
  return out + '</svg>';
}

/* First-quadrant grid: numbered axes from the origin, lettered
   points drawn at their own coordinates. pts is a list of
   {x, y, label}. */
function pk7quad(pts, xMax, yMax) {
  var W = 252, H = 214, ox = 36, oy = 178, sx = (W - ox - 14) / xMax, sy = (oy - 24) / yMax;
  var s = '<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="First quadrant grid">';
  for (var gy = 0; gy <= yMax; gy++) { var Y = oy - gy * sy; s += '<line x1="' + ox + '" y1="' + fmt(Y, 1) + '" x2="' + (W - 10) + '" y2="' + fmt(Y, 1) + '" stroke="#cfe4d6" stroke-width="1"/>'; s += '<text x="' + (ox - 5) + '" y="' + fmt(Y + 3, 1) + '" font-size="9" fill="' + FIG_INK + '" text-anchor="end">' + gy + '</text>'; }
  for (var gx = 0; gx <= xMax; gx++) { var X = ox + gx * sx; s += '<line x1="' + fmt(X, 1) + '" y1="18" x2="' + fmt(X, 1) + '" y2="' + oy + '" stroke="#cfe4d6" stroke-width="1"/>'; s += '<text x="' + fmt(X, 1) + '" y="' + (oy + 13) + '" font-size="9" fill="' + FIG_INK + '" text-anchor="middle">' + gx + '</text>'; }
  s += '<line x1="' + ox + '" y1="18" x2="' + ox + '" y2="' + oy + '" stroke="' + FIG_INK + '" stroke-width="1.8"/>';
  s += '<line x1="' + ox + '" y1="' + oy + '" x2="' + (W - 10) + '" y2="' + oy + '" stroke="' + FIG_INK + '" stroke-width="1.8"/>';
  pts.forEach(function (p) { s += '<circle cx="' + fmt(ox + p.x * sx, 1) + '" cy="' + fmt(oy - p.y * sy, 1) + '" r="4" fill="' + FIG_ACC + '"/>'; s += _txt(ox + p.x * sx + 11, oy - p.y * sy - 9, p.label, 13, true); });
  return s + '</svg>';
}

/* Bar graph for reading: the axis carries the scale (ticks every
   step, labelled); the bars carry NO value labels, so the value
   is read from the height against the scale. */
/* Vertical axis title, rotated so a long title ("Height (cm)")
   stays inside the viewBox and clear of the scale numbers; the
   shell's _txt places it horizontally, which clips at the edge. */
function pk7axisTitle(unit, cy) {
  return '<text x="13" y="' + fmt(cy, 1) + '" font-size="11" fill="' + FIG_INK + '" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="middle" dominant-baseline="central" transform="rotate(-90 13 ' + fmt(cy, 1) + ')">' + unit + '</text>';
}

function pk7barRead(labels, vals, step, unit) {
  var maxV = Math.max.apply(null, vals), topTick = Math.ceil(maxV / step) * step;
  var W = 330, H = 215, base = 175, top = 25, bw = 36, gap = (W - 60 - labels.length * bw) / (labels.length + 1);
  var out = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar graph">';
  for (var v = 0; v <= topTick; v += step) { var y = base - (base - top) * v / topTick; out += '<line x1="45" y1="' + fmt(y, 1) + '" x2="' + (W - 10) + '" y2="' + fmt(y, 1) + '" stroke="#cfe4d6" stroke-width="1"/>'; out += '<text x="40" y="' + fmt(y + 3, 1) + '" font-size="10" fill="' + FIG_INK + '" text-anchor="end">' + v + '</text>'; }
  out += '<line x1="45" y1="' + base + '" x2="' + (W - 10) + '" y2="' + base + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  out += '<line x1="45" y1="' + top + '" x2="45" y2="' + base + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  for (var i = 0; i < labels.length; i++) { var x = 45 + gap + (gap + bw) * i, h = (base - top) * vals[i] / topTick; out += '<rect x="' + fmt(x, 1) + '" y="' + fmt(base - h, 1) + '" width="' + bw + '" height="' + fmt(h, 1) + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>'; out += _txt(x + bw / 2, base + 16, labels[i], 11, false); }
  out += pk7axisTitle(unit, (top + base) / 2);
  return out + '</svg>';
}

/* Line graph for reading: points joined in order, the axis
   carries the scale; points carry NO value labels. */
function pk7lineRead(labels, vals, step, unit) {
  var maxV = Math.max.apply(null, vals), topTick = Math.ceil(maxV / step) * step;
  var W = 330, H = 215, base = 175, top = 25;
  var out = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Line graph">';
  for (var v = 0; v <= topTick; v += step) { var y = base - (base - top) * v / topTick; out += '<line x1="45" y1="' + fmt(y, 1) + '" x2="' + (W - 15) + '" y2="' + fmt(y, 1) + '" stroke="#cfe4d6" stroke-width="1"/>'; out += '<text x="40" y="' + fmt(y + 3, 1) + '" font-size="10" fill="' + FIG_INK + '" text-anchor="end">' + v + '</text>'; }
  out += '<line x1="45" y1="' + base + '" x2="' + (W - 15) + '" y2="' + base + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  out += '<line x1="45" y1="' + top + '" x2="45" y2="' + base + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  var pts = [];
  for (var i = 0; i < labels.length; i++) { var x = 65 + i * (W - 95) / (labels.length - 1), yy = base - (base - top) * vals[i] / topTick; pts.push([x, yy]); out += '<circle cx="' + fmt(x, 1) + '" cy="' + fmt(yy, 1) + '" r="3.4" fill="' + FIG_INK + '"/>'; out += _txt(x, base + 16, labels[i], 11, false); }
  for (var j = 0; j < pts.length - 1; j++) out += '<line x1="' + fmt(pts[j][0], 1) + '" y1="' + fmt(pts[j][1], 1) + '" x2="' + fmt(pts[j + 1][0], 1) + '" y2="' + fmt(pts[j + 1][1], 1) + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  out += pk7axisTitle(unit, (top + base) / 2);
  return out + '</svg>';
}

/* Pictograph: one row per category, the label at the left and
   count symbols in a row. The key (what one symbol stands for)
   is stated in the question text. */
function pk7picto(rows) {
  var H = rows.length * 30 + 14;
  var out = '<svg viewBox="0 0 330 ' + H + '" width="330" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pictograph">';
  rows.forEach(function (r, i) {
    var y = 22 + i * 30;
    out += _txt(78, y, r.label, 12, false, "end");
    for (var k = 0; k < r.count; k++) out += '<circle cx="' + (96 + k * 17) + '" cy="' + (y - 4) + '" r="6.5" fill="' + FIG_ACC + '" stroke="' + FIG_INK + '" stroke-width="1.2"/>';
  });
  return out + '</svg>';
}

/* Protractor with the angle drawn to its own measure: vertex at
   (160, 178), the base ray along the diameter to the right (or
   to the left when mirror is true), a semicircular scale with
   ticks every 5 degrees and labels every 10 degrees, and the
   second ray drawn in the accent colour at exactly deg from the
   base ray. The labels increase from the base ray's zero. */
function pk7protractor(deg, mirror) {
  var cx = 160, cy = 178, R = 128;
  function P(r, aDeg) { var a = aDeg * Math.PI / 180, dx = Math.cos(a) * (mirror ? -1 : 1); return [cx + dx * r, cy - Math.sin(a) * r]; }
  var out = '<svg viewBox="0 0 320 196" width="320" height="196" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Protractor measuring an angle">';
  var p0 = P(R, 0), p180 = P(R, 180);
  out += '<path d="M ' + fmt(p0[0], 1) + ' ' + fmt(p0[1], 1) + ' A ' + R + ' ' + R + ' 0 0 ' + (mirror ? 1 : 0) + ' ' + fmt(p180[0], 1) + ' ' + fmt(p180[1], 1) + ' Z" fill="' + FIG_SHADE + '" fill-opacity="0.35" stroke="' + FIG_INK + '" stroke-width="1.8"/>';
  for (var t = 0; t <= 180; t += 5) { var len = t % 10 === 0 ? 13 : 8, pa = P(R, t), pb = P(R - len, t); out += '<line x1="' + fmt(pa[0], 1) + '" y1="' + fmt(pa[1], 1) + '" x2="' + fmt(pb[0], 1) + '" y2="' + fmt(pb[1], 1) + '" stroke="' + FIG_INK + '" stroke-width="' + (t % 10 === 0 ? 1.3 : 0.8) + '"/>'; if (t % 10 === 0) { var pl = P(R - 24, t); out += '<text x="' + fmt(pl[0], 1) + '" y="' + fmt(pl[1] + 3, 1) + '" font-size="9" fill="' + FIG_INK + '" text-anchor="middle">' + t + '</text>'; } }
  var pe = P(R, deg);
  out += '<line x1="' + cx + '" y1="' + cy + '" x2="' + fmt(P(R + 14, 0)[0], 1) + '" y2="' + cy + '" stroke="' + FIG_INK + '" stroke-width="2.4"/>';
  out += '<line x1="' + cx + '" y1="' + cy + '" x2="' + fmt(pe[0], 1) + '" y2="' + fmt(pe[1], 1) + '" stroke="' + FIG_ACC + '" stroke-width="2.6"/>';
  out += '<circle cx="' + cx + '" cy="' + cy + '" r="3.4" fill="' + FIG_INK + '"/>';
  return out + '</svg>';
}

/* A single angle drawn to its measure, with no numbers on the
   figure (the classification items). Vertex at (70, 150), base
   ray to the right, second ray at deg, and a small arc between
   the rays. deg 180 draws the straight angle. */
function pk7angleFig(deg) {
  /* Right and obtuse angles sit further right with a shorter
     second ray, so the ray stays inside the frame at 180 degrees. */
  var vx = deg >= 90 ? 105 : 70, vy = 150, L = 150, L2 = deg >= 90 ? 100 : 150;
  var a = deg * Math.PI / 180, ex = vx + L2 * Math.cos(a), ey = vy - L2 * Math.sin(a);
  var out = '<svg viewBox="0 0 300 185" width="300" height="185" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Angle">';
  out += '<line x1="' + vx + '" y1="' + vy + '" x2="' + (vx + L + 30) + '" y2="' + vy + '" stroke="' + FIG_INK + '" stroke-width="2.2"/>';
  out += '<line x1="' + vx + '" y1="' + vy + '" x2="' + fmt(ex, 1) + '" y2="' + fmt(ey, 1) + '" stroke="' + FIG_INK + '" stroke-width="2.2"/>';
  var r = 34, ax = vx + r * Math.cos(a), ay = vy - r * Math.sin(a);
  out += '<path d="M ' + (vx + r) + ' ' + vy + ' A ' + r + ' ' + r + ' 0 ' + (deg > 180 ? 1 : 0) + ' 0 ' + fmt(ax, 1) + ' ' + fmt(ay, 1) + '" fill="none" stroke="' + FIG_ACC + '" stroke-width="2"/>';
  out += '<circle cx="' + vx + '" cy="' + vy + '" r="3.2" fill="' + FIG_INK + '"/>';
  return out + '</svg>';
}

/* Two adjacent angles on a straight line: the left angle is
   labelled deg; the right angle is the unknown. */
function pk7anglePair(deg) {
  var vx = 150, vy = 140, L = 120;
  var a = deg * Math.PI / 180, ex = vx + L * Math.cos(a), ey = vy - L * Math.sin(a);
  var out = '<svg viewBox="0 0 300 175" width="300" height="175" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two angles on a straight line">';
  out += '<line x1="20" y1="' + vy + '" x2="280" y2="' + vy + '" stroke="' + FIG_INK + '" stroke-width="2.2"/>';
  out += '<line x1="' + vx + '" y1="' + vy + '" x2="' + fmt(ex, 1) + '" y2="' + fmt(ey, 1) + '" stroke="' + FIG_INK + '" stroke-width="2.2"/>';
  out += '<circle cx="' + vx + '" cy="' + vy + '" r="3.2" fill="' + FIG_INK + '"/>';
  var midA = (deg / 2) * Math.PI / 180, midB = ((deg + 180) / 2) * Math.PI / 180;
  out += _txt(vx + 54 * Math.cos(midA), vy - 54 * Math.sin(midA), deg + "°", 13, true);
  out += _txt(vx + 50 * Math.cos(midB), vy - 50 * Math.sin(midB), "?", 15, true);
  return out + '</svg>';
}

/* Two adjacent angles forming a right angle: the lower-left
   angle is labelled deg; the other is the unknown. A small
   square marks the right angle. */
function pk7anglePairR(deg) {
  var vx = 90, vy = 150, L = 110;
  var a = deg * Math.PI / 180, ex = vx + L * Math.cos(a), ey = vy - L * Math.sin(a);
  var out = '<svg viewBox="0 0 260 185" width="260" height="185" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two angles forming a right angle">';
  out += '<line x1="' + vx + '" y1="' + vy + '" x2="' + (vx + L + 30) + '" y2="' + vy + '" stroke="' + FIG_INK + '" stroke-width="2.2"/>';
  out += '<line x1="' + vx + '" y1="' + vy + '" x2="' + vx + '" y2="' + (vy - L - 10) + '" stroke="' + FIG_INK + '" stroke-width="2.2"/>';
  out += '<line x1="' + vx + '" y1="' + vy + '" x2="' + fmt(ex, 1) + '" y2="' + fmt(ey, 1) + '" stroke="' + FIG_INK + '" stroke-width="2.2"/>';
  out += '<path d="M ' + (vx + 16) + ' ' + vy + ' L ' + (vx + 16) + ' ' + (vy - 16) + ' L ' + vx + ' ' + (vy - 16) + '" fill="none" stroke="' + FIG_INK + '" stroke-width="1.4"/>';
  out += '<circle cx="' + vx + '" cy="' + vy + '" r="3.2" fill="' + FIG_INK + '"/>';
  out += _txt(vx + 58, vy - 14, deg + "°", 13, true);
  out += _txt(vx + 16, vy - 62, "?", 15, true);
  return out + '</svg>';
}

/* Four mini angle figures in a 2 by 2 grid, labelled A to D, for
   the which-angle items. degs is the four measures in reading
   order. */
function pk7anglePickFig(degs) {
  var out = '<svg viewBox="0 0 320 238" width="320" height="238" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Four angles">';
  var org = [[36, 92], [186, 92], [36, 202], [186, 202]];
  var labs = ["A", "B", "C", "D"];
  degs.forEach(function (deg, i) {
    var vx = org[i][0], vy = org[i][1], L = 62, L2 = deg > 90 ? 34 : 62;
    var a = deg * Math.PI / 180, ex = vx + L2 * Math.cos(a), ey = vy - L2 * Math.sin(a);
    out += '<line x1="' + vx + '" y1="' + vy + '" x2="' + (vx + L + 14) + '" y2="' + vy + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
    out += '<line x1="' + vx + '" y1="' + vy + '" x2="' + fmt(ex, 1) + '" y2="' + fmt(ey, 1) + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
    out += '<circle cx="' + vx + '" cy="' + vy + '" r="2.8" fill="' + FIG_INK + '"/>';
    out += _txt(vx + 8, vy + 20, labs[i], 13, true);
  });
  return out + '</svg>';
}

/* Hundred grid with the first n of its 100 cells shaded, in
   reading order. */
function pk7hundred(n) {
  var x0 = 95, y0 = 12, cs = 13;
  var out = '<svg viewBox="0 0 320 156" width="320" height="156" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hundred grid">';
  for (var i = 0; i < 100; i++) { var x = x0 + (i % 10) * cs, y = y0 + Math.floor(i / 10) * cs; out += '<rect x="' + x + '" y="' + y + '" width="' + cs + '" height="' + cs + '" fill="' + (i < n ? FIG_SHADE : "#ffffff") + '" stroke="' + FIG_INK + '" stroke-width="0.7"/>'; }
  return out + '</svg>';
}

/* Four mini hundred grids labelled A to D, each with its own
   shaded count, for the which-grid items. counts is the four
   counts in reading order. */
function pk7hundredPick(counts) {
  var out = '<svg viewBox="0 0 320 300" width="320" height="300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Four hundred grids">';
  var org = [[28, 14], [176, 14], [28, 158], [176, 158]], labs = ["A", "B", "C", "D"], cs = 11.6;
  counts.forEach(function (n, g) {
    var x0 = org[g][0], y0 = org[g][1];
    for (var i = 0; i < 100; i++) { var x = x0 + (i % 10) * cs, y = y0 + Math.floor(i / 10) * cs; out += '<rect x="' + fmt(x, 1) + '" y="' + fmt(y, 1) + '" width="' + cs + '" height="' + cs + '" fill="' + (i < n ? FIG_SHADE : "#ffffff") + '" stroke="' + FIG_INK + '" stroke-width="0.6"/>'; }
    out += _txt(x0 + 58, y0 + 128, labs[g], 13, true);
  });
  return out + '</svg>';
}

/* Circle split into d equal sectors with the first n shaded
   (the fraction area model). */
function pk7fracCirc(n, d) {
  var cx = 110, cy = 96, R = 74;
  var out = '<svg viewBox="0 0 220 192" width="220" height="192" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Circle fraction model">';
  for (var i = 0; i < d; i++) {
    var a1 = (-90 + i * 360 / d) * Math.PI / 180, a2 = (-90 + (i + 1) * 360 / d) * Math.PI / 180;
    var x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1), x2 = cx + R * Math.cos(a2), y2 = cy + R * Math.sin(a2);
    out += '<path d="M ' + cx + ' ' + cy + ' L ' + fmt(x1, 1) + ' ' + fmt(y1, 1) + ' A ' + R + ' ' + R + ' 0 0 1 ' + fmt(x2, 1) + ' ' + fmt(y2, 1) + ' Z" fill="' + (i < n ? FIG_SHADE : "#ffffff") + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  }
  return out + '</svg>';
}

/* A set of counters: total circles in rows of six, the first
   shaded of them filled. */
function pk7setFig(total, shaded) {
  var rows = Math.ceil(total / 6), H = rows * 30 + 16;
  var out = '<svg viewBox="0 0 240 ' + H + '" width="240" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Set of counters">';
  for (var i = 0; i < total; i++) { var x = 30 + (i % 6) * 32, y = 24 + Math.floor(i / 6) * 30; out += '<circle cx="' + x + '" cy="' + y + '" r="11" fill="' + (i < shaded ? FIG_ACC : "#ffffff") + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>'; }
  return out + '</svg>';
}

/* Four mini fraction bars labelled A to D for the which-diagram
   items. pairs is the four [n, d] in reading order; each bar is
   split into d equal parts with n shaded. */
function pk7fracPickFig(pairs) {
  var out = '<svg viewBox="0 0 320 168" width="320" height="168" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Four fraction bars">';
  var org = [[16, 18], [168, 18], [16, 94], [168, 94]], labs = ["A", "B", "C", "D"], bw = 128, bh = 26;
  pairs.forEach(function (pr, g) {
    var x0 = org[g][0], y0 = org[g][1], seg = bw / pr[1];
    for (var i = 0; i < pr[1]; i++) out += '<rect x="' + fmt(x0 + i * seg, 1) + '" y="' + y0 + '" width="' + fmt(seg, 1) + '" height="' + bh + '" fill="' + (i < pr[0] ? FIG_SHADE : "#ffffff") + '" stroke="' + FIG_INK + '" stroke-width="1.3"/>';
    out += _txt(x0 + bw / 2, y0 + bh + 16, labs[g], 13, true);
  });
  return out + '</svg>';
}

/* A fraction on a number line from 0 to 1: d equal intervals,
   only the endpoints labelled, a marker at n/d. */
function pk7fracLine(d, n) {
  var x0 = 30, x1 = 290, y = 62;
  var out = '<svg viewBox="0 0 320 96" width="320" height="96" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from 0 to 1">';
  out += '<line x1="' + x0 + '" y1="' + y + '" x2="' + x1 + '" y2="' + y + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  for (var i = 0; i <= d; i++) { var x = x0 + (x1 - x0) * i / d; out += '<line x1="' + fmt(x, 1) + '" y1="' + (y - 6) + '" x2="' + fmt(x, 1) + '" y2="' + (y + 6) + '" stroke="' + FIG_INK + '" stroke-width="1.4"/>'; }
  out += _txt(x0, y + 22, "0", 12, true);
  out += _txt(x1, y + 22, "1", 12, true);
  var mx = x0 + (x1 - x0) * n / d;
  out += '<polygon points="' + fmt(mx, 1) + ',' + (y - 12) + ' ' + fmt(mx - 6, 1) + ',' + (y - 24) + ' ' + fmt(mx + 6, 1) + ',' + (y - 24) + '" fill="' + FIG_ALT + '"/>';
  return out + '</svg>';
}

/* A decimal on a number line from 0 to 1: minor ticks every
   0.05, labelled ticks every 0.1 at the ends and the middle, a
   marker at v (a multiple of 0.05). */
function pk7decLine(v) {
  var x0 = 30, x1 = 290, y = 62;
  function X(t) { return x0 + (x1 - x0) * t; }
  var out = '<svg viewBox="0 0 320 96" width="320" height="96" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from 0 to 1">';
  out += '<line x1="' + x0 + '" y1="' + y + '" x2="' + x1 + '" y2="' + y + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  for (var i = 0; i <= 20; i++) { var x = X(i / 20), major = i % 2 === 0; out += '<line x1="' + fmt(x, 1) + '" y1="' + (y - (major ? 7 : 4)) + '" x2="' + fmt(x, 1) + '" y2="' + (y + (major ? 7 : 4)) + '" stroke="' + FIG_INK + '" stroke-width="1.3"/>'; }
  out += _txt(X(0), y + 22, "0", 12, true);
  out += _txt(X(0.5), y + 22, "0.5", 12, true);
  out += _txt(X(1), y + 22, "1", 12, true);
  var mx = X(v);
  out += '<polygon points="' + fmt(mx, 1) + ',' + (y - 12) + ' ' + fmt(mx - 6, 1) + ',' + (y - 24) + ' ' + fmt(mx + 6, 1) + ',' + (y - 24) + '" fill="' + FIG_ALT + '"/>';
  return out + '</svg>';
}

/* A plain square grid with NO axes and NO numbers (the
   transformations items stay off the coordinate plane, per the
   specification). polys are cell-corner polygons in grid units,
   drawn from the top-left origin; the first is the original
   (outline), the second its image (shaded). mirrorCol, when not
   null, draws a dashed vertical mirror line at that grid x. */
function pk7plainGrid(polys, mirrorCol) {
  var cols = 11, rows = 9, cs = 24, x0 = 28, y0 = 10, W = x0 * 2 + cols * cs, H = y0 * 2 + rows * cs;
  function X(gx) { return x0 + gx * cs; }
  function Y(gy) { return y0 + gy * cs; }
  var out = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Shape on a plain grid">';
  for (var i = 0; i <= cols; i++) out += '<line x1="' + X(i) + '" y1="' + y0 + '" x2="' + X(i) + '" y2="' + Y(rows) + '" stroke="#cfe4d6" stroke-width="1"/>';
  for (var j = 0; j <= rows; j++) out += '<line x1="' + x0 + '" y1="' + Y(j) + '" x2="' + X(cols) + '" y2="' + Y(j) + '" stroke="#cfe4d6" stroke-width="1"/>';
  if (mirrorCol !== null && mirrorCol !== undefined) out += '<line x1="' + X(mirrorCol) + '" y1="' + (y0 - 4) + '" x2="' + X(mirrorCol) + '" y2="' + (Y(rows) + 4) + '" stroke="' + FIG_ALT + '" stroke-width="2" stroke-dasharray="6 4"/>';
  polys.forEach(function (p, idx) {
    out += '<polygon points="' + p.map(function (q) { return fmt(X(q[0]), 1) + "," + fmt(Y(q[1]), 1); }).join(" ") + '" fill="' + (idx === 0 ? "#ffffff" : FIG_SHADE) + '" fill-opacity="' + (idx === 0 ? "1" : "0.65") + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  });
  return out + '</svg>';
}

/* A Cartesian plane with one feature highlighted for the
   axes-origin items: mode "x" thickens the x-axis, mode "y"
   thickens the y-axis. Axis names are NOT printed: naming them
   is the question. */
function pk7axesHL(mode) {
  var W = 240, c = 120, st = 17;
  function X(x) { return c + x * st; }
  function Y(y) { return c - y * st; }
  var out = '<svg viewBox="0 0 ' + W + ' ' + W + '" width="' + W + '" height="' + W + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cartesian plane with one axis highlighted">';
  for (var g = -6; g <= 6; g++) { if (g === 0) continue; out += '<line x1="' + fmt(X(g), 1) + '" y1="10" x2="' + fmt(X(g), 1) + '" y2="230" stroke="#cfe4d6" stroke-width="1"/>'; out += '<line x1="10" y1="' + fmt(Y(g), 1) + '" x2="230" y2="' + fmt(Y(g), 1) + '" stroke="#cfe4d6" stroke-width="1"/>'; }
  out += '<line x1="10" y1="120" x2="230" y2="120" stroke="' + (mode === "x" ? FIG_ACC : FIG_INK) + '" stroke-width="' + (mode === "x" ? 4 : 1.8) + '"/>';
  out += '<line x1="120" y1="10" x2="120" y2="230" stroke="' + (mode === "y" ? FIG_ACC : FIG_INK) + '" stroke-width="' + (mode === "y" ? 4 : 1.8) + '"/>';
  out += '<polygon points="230,120 222,115 222,125" fill="' + FIG_INK + '"/><polygon points="120,10 115,18 125,18" fill="' + FIG_INK + '"/>';
  out += '<circle cx="120" cy="120" r="2.8" fill="' + FIG_INK + '"/>';
  return out + '</svg>';
}

/* Spinner with equal sectors: labels alternate between the win
   label (winCount sectors) and the lose label, spread evenly. */
function pk7spinner(winCount, total, winLabel, loseLabel) {
  var cx = 110, cy = 96, R = 76;
  var out = '<svg viewBox="0 0 220 192" width="220" height="192" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Spinner">';
  var wins = {};
  for (var w = 0; w < winCount; w++) wins[Math.round(w * total / winCount) % total] = 1;
  for (var i = 0; i < total; i++) {
    var a1 = (-90 + i * 360 / total) * Math.PI / 180, a2 = (-90 + (i + 1) * 360 / total) * Math.PI / 180;
    var x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1), x2 = cx + R * Math.cos(a2), y2 = cy + R * Math.sin(a2);
    var isWin = !!wins[i];
    out += '<path d="M ' + cx + ' ' + cy + ' L ' + fmt(x1, 1) + ' ' + fmt(y1, 1) + ' A ' + R + ' ' + R + ' 0 0 1 ' + fmt(x2, 1) + ' ' + fmt(y2, 1) + ' Z" fill="' + (isWin ? FIG_SHADE : "#ffffff") + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
    var mid = (-90 + (i + 0.5) * 360 / total) * Math.PI / 180;
    out += _txt(cx + (R - 26) * Math.cos(mid), cy + (R - 26) * Math.sin(mid), isWin ? winLabel : loseLabel, 10.5, isWin);
  }
  return out + '</svg>';
}

/* ================= Support sets (state A) =================
   The five state A clusters of this piece (7-C4, 7-C7, 7-C11,
   7-C13, 7-C15) are served first, on the established lowest-
   risk-first pattern. Their entries already stand in the bank in
   their unit files; nothing about them changes except that the
   PKT7_P3 table at the end of this section flags them and adds
   pkSrc, pkGroup and pkFor. The support sets are:
   - 7-C4 (Unit 6, equation-solving): u6-one-step-balance,
     u6-one-step-problem, u6-one-step-problem-cr and
     u6-inspection-trial. Grounding: MA4.8.7 (solving one-step
     equations), MA4.8.8 (guess and check, the inspection entry).
     pkFor: the cluster's fourteen indicators.
   - 7-C7 (Unit 3, decimal-operations): u3-add-sub-decimals,
     u3-mult-decimals, u3-div-decimals, u3-cr-add-sub, u3-cr-mult
     and u3-cr-div. Grounding: MA5.6.11 (add and subtract decimals
     to thousandths), MA6.6.5 (decimal multiplication and division
     problems). pkFor: the cluster's thirteen indicators.
   - 7-C11 (Unit 5, fraction-operations): u5-add-like, u5-sub-like
     and u5-model-add-figure; (equivalent-fractions):
     u5-simplify-fraction, u5-simplify-solution and
     u5-common-denominator. Provenance, recorded honestly: the
     elementary outcome lists and guides on file do not name
     like-denominator fraction addition or lowest terms; these two
     sets rest on the November 13, 2026 cluster audit's coverage
     rating, and their pkSrc says so. pkFor: the cluster's eleven
     indicators.
   - 7-C13 (Unit 7, single-event-probability): u7-prob-basic.
     Grounding: MA6.12.2. pkFor: 12.1 to 12.7.
   - 7-C15 (Unit 8, axes-origin): u8-axes-origin.
     Grounding: MA6.10.9. pkFor: 10.6. */

/* ================= Cluster 7-C1 remainder =================
   SORTING DIAGRAMS (sorting-diagrams, Unit 1, 4 entries, all
   authored, all figure-bearing): read counts from a Venn diagram
   and a Carroll diagram, and place a number into a Venn diagram.
   Grounding: MA4.11.7 to MA4.11.12 (grouping and cross-
   classification; Carroll diagrams at MA4.11.10). Supports
   (pkFor): 5.1 to 5.4. Cluster 7-C1's other groups (factors and
   multiples, divisibility) shipped in Piece 1. */

E("u1-pk-sort-venn-read", 1, ["5.1"], 1, "gen", function () {
  var aO, both, bO, nei, guard = 0;
  do {
    aO = ri(3, 9); both = ri(2, 6); bO = ri(3, 9); nei = ri(1, 5);
    var vals = [aO, both, bO, nei, aO + both + bO, aO + both, bO + both];
    var distinct = vals.every(function (v, i) { return vals.indexOf(v) === i; });
  } while (!distinct && guard++ < 300);
  if (!distinct) { aO = 5; both = 3; bO = 7; nei = 2; }
  var tot = aO + both + bO, dogT = aO + both, catT = bO + both;
  var modes = [
    { q: "How many students have a dog but do not have a cat?", key: aO, ds: [[both, "both a dog and a cat"], [bO, "a cat but not a dog"], [nei, "neither a dog nor a cat"]] },
    { q: "How many students have both a dog and a cat?", key: both, ds: [[aO, "a dog but not a cat"], [bO, "a cat but not a dog"], [nei, "neither a dog nor a cat"]] },
    { q: "How many students have a dog or a cat (or both)?", key: tot, ds: [[dogT, "a dog (counting those with both)"], [catT, "a cat (counting those with both)"], [nei, "neither a dog nor a cat"]] },
    { q: "How many students have a dog (including those who also have a cat)?", key: dogT, ds: [[aO, "a dog but not a cat"], [tot, "a dog or a cat (or both)"], [catT, "a cat (counting those with both)"]] }
  ];
  var m = pick(modes);
  var q = mcq(m.q,
    { t: String(m.key), fb: "Correct: read the region (or regions) the question names in the diagram." },
    m.ds.map(function (d) { return { t: String(d[0]), fb: "That is the count for students with " + d[1] + ". The question asks for a different group." }; }),
    "Read the region (or regions) the question names in the Venn diagram: the count there is <b>" + m.key + "</b>.",
    { aO: aO, both: both, bO: bO, nei: nei, key: m.key });
  q.figure = pk7venn("Dog", "Cat", [aO, both, bO, nei]);
  return q;
}, ["Look at the regions of the Venn diagram, not just the circle totals.", "Decide which region (or regions) the question is asking about, then read its count."]);

E("u1-pk-sort-venn-place", 1, ["5.1"], 2, "gen", function () {
  var fams = [
    { nums: [12, 18, 24, 30, 36, 42], region: "both", why: "it is a multiple of 3 and it is even" },
    { nums: [3, 9, 15, 21, 27, 33, 39], region: "aOnly", why: "it is a multiple of 3, but it is not even" },
    { nums: [4, 8, 10, 14, 16, 20, 22, 26, 28], region: "bOnly", why: "it is even, but it is not a multiple of 3" },
    { nums: [5, 7, 11, 13, 17, 19, 23, 25, 29], region: "neither", why: "it is not a multiple of 3 and it is not even" }
  ];
  var f = pick(fams), n = pick(f.nums);
  var opts = {
    both: "In both circles together",
    aOnly: "Only in the Multiple of 3 circle",
    bOnly: "Only in the Even circle",
    neither: "Outside both of the circles"
  };
  var ds = Object.keys(opts).filter(function (k) { return k !== f.region; }).map(function (k) {
    return { t: opts[k], fb: "Check the number against both tests: " + n + " is " + (n % 3 === 0 ? "a multiple of 3" : "not a multiple of 3") + " and " + (n % 2 === 0 ? "even" : "odd") + "." };
  });
  var q = mcq("The Venn diagram sorts numbers into Multiple of 3 and Even. Where does " + n + " belong?",
    { t: opts[f.region], fb: "Correct: " + f.why + "." }, ds,
    "Test " + n + " against both circles: " + f.why + ", so it goes <b>" + opts[f.region].toLowerCase() + "</b>.",
    { n: n, region: f.region });
  q.figure = pk7venn("Multiple of 3", "Even", null);
  return q;
}, ["Test the number against each circle's rule separately.", "A number in the overlap must pass both tests."]);

E("u1-pk-sort-carroll-read", 1, ["5.1"], 1, "gen", function () {
  var cells, guard = 0, distinct = false;
  do {
    cells = [[ri(2, 9), ri(2, 9)], [ri(2, 9), ri(2, 9)]];
    var flat = [cells[0][0], cells[0][1], cells[1][0], cells[1][1]];
    distinct = flat.every(function (v, i) { return flat.indexOf(v) === i; });
  } while (!distinct && guard++ < 300);
  if (!distinct) cells = [[3, 5], [7, 4]];
  var names = [["wear glasses and have a pet", 0, 0], ["wear glasses and have no pet", 0, 1], ["do not wear glasses and have a pet", 1, 0], ["do not wear glasses and have no pet", 1, 1]];
  var t = pick(names), key = cells[t[1]][t[2]];
  var ds = names.filter(function (x) { return x !== t; }).map(function (x) { return { t: String(cells[x[1]][x[2]]), fb: "That is the count for students who " + x[0] + ". Find the row and column the question names." }; });
  var q = mcq("The Carroll diagram sorts students by glasses and pets. How many students " + t[0] + "?",
    { t: String(key), fb: "Correct: that is the cell where the row and the column meet." }, ds,
    "Find the row for the glasses condition and the column for the pet condition; their cell holds <b>" + key + "</b>.",
    { cells: cells, key: key });
  q.figure = pk7carroll("Pet", "No pet", "Glasses", "No glasses", cells);
  return q;
}, ["A Carroll diagram cell sits where its row and its column cross.", "Read the row label and the column label before reading the number."]);

E("u1-pk-sort-carroll-total", 1, ["5.1"], 2, "gen", function () {
  var cells, guard = 0, okSet = false;
  do {
    cells = [[ri(2, 9), ri(2, 9)], [ri(2, 9), ri(2, 9)]];
    var rowA = cells[0][0] + cells[0][1], rowB = cells[1][0] + cells[1][1], colA = cells[0][0] + cells[1][0], colB = cells[0][1] + cells[1][1], grand = rowA + rowB;
    var flat = [cells[0][0], cells[0][1], cells[1][0], cells[1][1]];
    var flatDistinct = flat.every(function (v, i) { return flat.indexOf(v) === i; });
    var optsSet = [rowA, rowB, colA, colB];
    okSet = flatDistinct && optsSet.every(function (v, i) { return optsSet.indexOf(v) === i; });
  } while (!okSet && guard++ < 400);
  if (!okSet) { cells = [[3, 5], [7, 4]]; rowA = 8; rowB = 11; colA = 10; colB = 9; grand = 19; }
  var modes = [
    { q: "How many students wear glasses in total?", key: rowA, parts: cells[0], ds: [[rowB, "do not wear glasses"], [colA, "have a pet"], [grand, "there are in the whole diagram"]] },
    { q: "How many students have a pet in total?", key: colA, parts: [cells[0][0], cells[1][0]], ds: [[colB, "have no pet"], [rowA, "wear glasses"], [grand, "there are in the whole diagram"]] },
    { q: "How many students do not wear glasses in total?", key: rowB, parts: cells[1], ds: [[rowA, "wear glasses"], [colB, "have no pet"], [grand, "there are in the whole diagram"]] },
    { q: "How many students have no pet in total?", key: colB, parts: [cells[0][1], cells[1][1]], ds: [[colA, "have a pet"], [rowB, "do not wear glasses"], [grand, "there are in the whole diagram"]] }
  ];
  var m = pick(modes);
  var q = mcq(m.q,
    { t: String(m.key), fb: "Correct: add the two cells in that row (or column): " + m.parts[0] + " + " + m.parts[1] + " = " + m.key + "." },
    m.ds.map(function (d) { return { t: String(d[0]), fb: "That is the total for students who " + d[1] + ". The question asks for a different row or column." }; }),
    "A row (or column) total adds its two cells: \\(" + m.parts[0] + " + " + m.parts[1] + " = " + m.key + "\\). The answer is <b>" + m.key + "</b>.",
    { cells: cells, key: m.key });
  q.figure = pk7carroll("Pet", "No pet", "Glasses", "No glasses", cells);
  return q;
}, ["A total for a row adds the two cells across that row.", "Check whether the question names a row (glasses) or a column (pets)."]);

/* ================= Cluster 7-C2 =================
   PATTERNS (patterns, Unit 1, 5 entries, all authored): extend a
   pattern, state its rule, work an input-output machine, fill a
   missing middle term, and extend a pattern whose rule is more
   than adding a constant. Grounding: MA4.8.1 to MA4.8.3;
   MA5.8.1 to MA5.8.4. Supports (pkFor): the cluster's nine
   indicators (8.4 to 8.6, 7.1 to 7.4, 7.7, 7.8). */

E("u1-pk-pattern-next", 1, ["8.4"], 1, "gen", function () {
  var dec = Math.random() < 0.4;
  var diff = pick([2, 3, 4, 5, 6, 7, 8, 9, 11, 12]);
  var start = dec ? ri(40, 90) : ri(3, 30);
  var terms = [0, 1, 2, 3].map(function (i) { return dec ? start - i * diff : start + i * diff; });
  var ans = dec ? start - 4 * diff : start + 4 * diff;
  return numq("What is the next term in the pattern " + terms.join(", ") + ", ...? Give the number.",
    ans, 0,
    "Each term " + (dec ? "decreases" : "increases") + " by " + diff + ": \\(" + terms[3] + " " + (dec ? "-" : "+") + " " + diff + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { start: start, diff: diff, dec: dec });
}, ["Find how much the pattern changes by from one term to the next.", "Apply that same change to the last term shown."]);

E("u1-pk-pattern-rule", 1, ["8.4"], 1, "gen", function () {
  var dec = Math.random() < 0.5;
  var diff = pick([3, 4, 5, 6, 7, 8, 9]);
  var start = dec ? ri(50, 95) : ri(3, 25);
  var terms = [0, 1, 2, 3, 4].map(function (i) { return dec ? start - i * diff : start + i * diff; });
  var verb = dec ? "Subtract " : "Add ";
  return mcq("What is the rule for the pattern " + terms.join(", ") + ", ...?",
    { t: verb + diff + " each time", fb: "Correct: each term is " + diff + " " + (dec ? "less" : "more") + " than the one before." },
    [{ t: verb + (diff + 1) + " each time", fb: "Check the jump between the first two terms: it is " + diff + ", not " + (diff + 1) + "." },
     { t: verb + (diff - 1) + " each time", fb: "Check the jump between the first two terms: it is " + diff + ", not " + (diff - 1) + "." },
     { t: "Multiply by " + diff + " each time", fb: "Multiplying would make the terms grow much faster; here the change is the same amount each time." }],
    "Compare neighbouring terms: the change from " + terms[0] + " to " + terms[1] + " is " + (dec ? "down " : "up ") + diff + ", and the same change repeats at every step. The rule is <b>" + (verb + diff + " each time").toLowerCase() + "</b>.",
    { start: start, diff: diff, dec: dec });
}, ["Look at the change from the first term to the second.", "Check that the same change holds for every step."]);

E("u1-pk-pattern-machine", 1, ["8.4"], 2, "gen", function () {
  var k = pick([2, 3, 4]), c = ri(1, 9), minus = Math.random() < 0.35;
  function out(x) { return minus ? k * x - c : k * x + c; }
  var ask = pick([8, 9, 10, 11, 12]);
  var shown = [2, 5, 7].map(function (x) { return "turns " + x + " into " + out(x); });
  return numq("A number machine " + shown[0] + ", " + shown[1] + " and " + shown[2] + ". What does it turn " + ask + " into? Give the number.",
    out(ask), 0,
    "Each output is " + k + " times the input " + (minus ? "minus " : "plus ") + c + ": \\(" + k + " \\times " + ask + " " + (minus ? "-" : "+") + " " + c + " = " + out(ask) + "\\). The answer is <b>" + out(ask) + "</b>.",
    { k: k, c: c, minus: minus, ask: ask });
}, ["Find what the machine does to each input: compare an input with its output.", "The machine multiplies first, then adds or subtracts."]);

E("u1-pk-pattern-missing", 1, ["8.4"], 2, "gen", function () {
  var diff = pick([3, 4, 5, 6, 7, 8, 9, 12]);
  var start = ri(2, 30);
  var t = [0, 1, 2, 3, 4].map(function (i) { return start + i * diff; });
  var pos = pick([1, 2, 3]), key = t[pos];
  var shown = t.map(function (v, i) { return i === pos ? "__" : String(v); });
  var ds = pk7uniq(key, [key + diff, key - diff, key + 1]).slice(0, 3);
  return mcq("What number is missing from the pattern " + shown.join(", ") + "?",
    { t: String(key), fb: "Correct: the pattern adds " + diff + " each time, and " + t[pos - 1] + " + " + diff + " = " + key + "." },
    ds.map(function (d) { return { t: String(d), fb: "The pattern adds the same amount, " + diff + ", at every step. Check the step before and after the blank." }; }),
    "The pattern adds " + diff + " each time: \\(" + t[pos - 1] + " + " + diff + " = " + key + "\\), and \\(" + key + " + " + diff + " = " + t[pos + 1] + "\\) checks. The answer is <b>" + key + "</b>.",
    { start: start, diff: diff, pos: pos });
}, ["Find the pattern's step from the terms you can see.", "The missing term must fit the step on both sides."]);

E("u1-pk-pattern-grow", 1, ["8.4"], 2, "gen", function () {
  if (Math.random() < 0.5) {
    var s = ri(2, 6), terms = [s], i;
    for (i = 0; i < 3; i++) terms.push(terms[terms.length - 1] * 2 + 1);
    var ans = terms[3] * 2 + 1;
    return numq("What is the next term in the pattern " + terms.join(", ") + ", ...? Give the number.",
      ans, 0,
      "Each term is double the term before, plus 1: \\(2 \\times " + terms[3] + " + 1 = " + ans + "\\). The answer is <b>" + ans + "</b>.",
      { terms: terms });
  }
  var start = ri(3, 12), d0 = ri(2, 4), terms2 = [start], j;
  for (j = 0; j < 3; j++) terms2.push(terms2[terms2.length - 1] + d0 + j);
  var ans2 = terms2[3] + d0 + 3;
  return numq("What is the next term in the pattern " + terms2.join(", ") + ", ...? Give the number.",
    ans2, 0,
    "The jumps grow by 1 each time: +" + d0 + ", +" + (d0 + 1) + ", +" + (d0 + 2) + ", so the next jump is +" + (d0 + 3) + ": \\(" + terms2[3] + " + " + (d0 + 3) + " = " + ans2 + "\\). The answer is <b>" + ans2 + "</b>.",
    { terms: terms2 });
}, ["If the jumps are not all equal, look at how the jumps themselves change.", "Work out the next jump before adding it on."]);

/* ================= Cluster 7-C3 =================
   FIRST QUADRANT (first-quadrant, Unit 1, 5 entries, all
   authored, all figure-bearing): read and use points in the
   first quadrant. Grounding: MA6.10.9 (first exposure to the
   Cartesian plane, plotting ordered pairs), with MA5.10.10 and
   MA5.10.11 behind it. Supports (pkFor): 7.5, 7.6, 7.9 to 7.12.
   Four of the five generators are shared with Unit 8 for cluster
   7-C15 (see the copies there); the generator functions are named
   so the copies call the same function. */

function pk7fqReadGen() {
  var x = ri(1, 8), y = ri(1, 8), guard = 0;
  while (x === y && guard++ < 60) { y = ri(1, 8); }
  if (x === y) y = y === 8 ? 7 : y + 1;
  var dy = y < 8 ? y + 1 : y - 1, dx = x < 8 ? x + 1 : x - 1;
  var q = mcq("What are the coordinates of point P?",
    { t: "(" + x + ", " + y + ")", fb: "Correct: go across " + x + " first, then up " + y + "." },
    [{ t: "(" + y + ", " + x + ")", fb: "That reads the coordinates in the wrong order: the first number is the distance across, the second is the distance up." },
     { t: "(" + x + ", " + dy + ")", fb: "The across distance, " + x + ", is right, but the point is " + y + " units up, not " + dy + "." },
     { t: "(" + dx + ", " + y + ")", fb: "The up distance, " + y + ", is right, but the point is " + x + " units across, not " + dx + "." }],
    "Coordinates are written (across, up). Point P is " + x + " units across and " + y + " units up, so its coordinates are <b>(" + x + ", " + y + ")</b>.",
    { x: x, y: y });
  q.figure = pk7quad([{ x: x, y: y, label: "P" }], 9, 9);
  return q;
}

function pk7fqWhichGen() {
  var pts = [], guard = 0;
  while (pts.length < 4 && guard++ < 400) {
    var p = { x: ri(1, 7), y: ri(1, 7) };
    if (!pts.some(function (q) { return q.x === p.x && q.y === p.y; })) pts.push(p);
  }
  while (pts.length < 4) pts.push({ x: pts.length + 1, y: 8 });
  var labs = ["A", "B", "C", "D"];
  pts.forEach(function (p, i) { p.label = labs[i]; });
  var t = pick(pts);
  var q = mcq("Which point is at (" + t.x + ", " + t.y + ")?",
    { t: "Point " + t.label, fb: "Correct: point " + t.label + " is " + t.x + " across and " + t.y + " up." },
    pts.filter(function (p) { return p !== t; }).map(function (p) { return { t: "Point " + p.label, fb: "Point " + p.label + " is at (" + p.x + ", " + p.y + "). Count across first, then up." }; }),
    "Count " + t.x + " units across and " + t.y + " units up from the origin: that is <b>point " + t.label + "</b>.",
    { pts: pts.map(function (p) { return [p.x, p.y]; }), tx: t.x, ty: t.y });
  q.figure = pk7quad(pts, 8, 8);
  return q;
}

function pk7fqCoordGen() {
  var x = ri(2, 8), y = ri(2, 8), guard = 0;
  while (x === y && guard++ < 60) { y = ri(2, 8); }
  if (x === y) y = y === 8 ? 7 : y + 1;
  var askX = Math.random() < 0.5, coord = askX ? x : y, other = askX ? y : x;
  var cand = [
    { t: String(other), fb: "That is the " + (askX ? "y" : "x") + "-coordinate. The " + (askX ? "x" : "y") + "-coordinate comes " + (askX ? "first" : "second") + " in the pair." },
    { t: String(coord + 1), fb: "Count again from the origin: point P is " + coord + " units " + (askX ? "across" : "up") + "." },
    { t: String(coord - 1), fb: "Count again from the origin: point P is " + coord + " units " + (askX ? "across" : "up") + "." },
    { t: String(coord + 2), fb: "Count again from the origin: point P is " + coord + " units " + (askX ? "across" : "up") + "." }
  ];
  var seenC = {}; seenC[String(coord)] = 1;
  var dsC = [];
  cand.forEach(function (cd) { if (!seenC[cd.t] && dsC.length < 3) { seenC[cd.t] = 1; dsC.push(cd); } });
  var q = mcq("What is the " + (askX ? "x" : "y") + "-coordinate of point P?",
    { t: String(coord), fb: "Correct: the " + (askX ? "x" : "y") + "-coordinate is the " + (askX ? "first" : "second") + " number in (" + x + ", " + y + ")." },
    dsC,
    "Point P is at (" + x + ", " + y + "). The " + (askX ? "x" : "y") + "-coordinate is the " + (askX ? "first" : "second") + " number: <b>" + coord + "</b>.",
    { x: x, y: y, askX: askX });
  q.figure = pk7quad([{ x: x, y: y, label: "P" }], 9, 9);
  return q;
}

function pk7fqMoveGen() {
  var x = ri(1, 5), y = ri(1, 5), dx = pick([2, 3, 4]), dy = pick([2, 3]), guard = 0;
  while (dx === dy && guard++ < 60) { dy = pick([2, 3, 4]); }
  if (dx === dy) dy = dx === 2 ? 3 : 2;
  var nx = x + dx, ny = y + dy;
  var q = mcq("Point P is at (" + x + ", " + y + "). It is moved " + dx + " units right and " + dy + " units up. What are its new coordinates?",
    { t: "(" + nx + ", " + ny + ")", fb: "Correct: add " + dx + " to the x-coordinate and " + dy + " to the y-coordinate." },
    [{ t: "(" + nx + ", " + y + ")", fb: "That moves the point right but forgets the move up: the y-coordinate must grow by " + dy + " as well." },
     { t: "(" + x + ", " + ny + ")", fb: "That moves the point up but forgets the move right: the x-coordinate must grow by " + dx + " as well." },
     { t: "(" + (x + dy) + ", " + (y + dx) + ")", fb: "That swaps the two moves: right adds to the x-coordinate, up adds to the y-coordinate." }],
    "Moving right adds to the first coordinate and moving up adds to the second: \\((" + x + " + " + dx + ", " + y + " + " + dy + ") = (" + nx + ", " + ny + ")\\). The answer is <b>(" + nx + ", " + ny + ")</b>.",
    { x: x, y: y, dx: dx, dy: dy });
  q.figure = pk7quad([{ x: x, y: y, label: "P" }], 9, 9);
  return q;
}

E("u1-pk-fq-read", 1, ["7.5"], 1, "gen", pk7fqReadGen,
  ["Coordinates are read across first, then up.", "Start at the origin: count across to below the point, then count up to it."]);

E("u1-pk-fq-which", 1, ["7.5"], 1, "gen", pk7fqWhichGen,
  ["Use the first number to move across and the second to move up.", "Find where the across count and the up count meet."]);

E("u1-pk-fq-coord", 1, ["7.5"], 1, "gen", pk7fqCoordGen,
  ["The x-coordinate is the first number in the pair; the y-coordinate is the second.", "Read the point's pair off the grid, then pick the number asked for."]);

E("u1-pk-fq-move", 1, ["7.5"], 2, "gen", pk7fqMoveGen,
  ["Moving right changes the first coordinate; moving up changes the second.", "Add each move to its own coordinate."]);

E("u1-pk-fq-between", 1, ["7.5"], 2, "gen", function () {
  var x1 = ri(1, 3), y1 = ri(1, 3), dx = pick([3, 4, 5]), dy = pick([2, 3, 4]), guard = 0;
  while (dx === dy && guard++ < 60) { dy = pick([2, 3, 4, 5]); }
  if (dx === dy) dy = dx === 3 ? 4 : 3;
  var x2 = x1 + dx, y2 = y1 + dy;
  var q = mcq("To get from point A to point B on the grid, you move...",
    { t: dx + " units right and " + dy + " units up", fb: "Correct: B is " + dx + " further across and " + dy + " further up than A." },
    [{ t: dy + " units right and " + dx + " units up", fb: "That swaps the two counts: compare the x-coordinates for the move right and the y-coordinates for the move up." },
     { t: dx + " units right and " + dy + " units down", fb: "B is higher than A, so the second move is up, not down." },
     { t: dx + " units left and " + dy + " units up", fb: "B is to the right of A, so the first move is right, not left." }],
    "Compare the coordinates: A is (" + x1 + ", " + y1 + ") and B is (" + x2 + ", " + y2 + "). The x-coordinate grows by " + dx + " (right) and the y-coordinate grows by " + dy + " (up). The answer is <b>" + dx + " units right and " + dy + " units up</b>.",
    { x1: x1, y1: y1, dx: dx, dy: dy });
  q.figure = pk7quad([{ x: x1, y: y1, label: "A" }, { x: x2, y: y2, label: "B" }], 9, 9);
  return q;
}, ["Compare the two points' x-coordinates, then their y-coordinates.", "The change in x tells the sideways move; the change in y tells the up-down move."]);

/* TABLES AND GRAPHS (tables-and-graphs, Unit 1, 5 entries, all
   authored, all figure-bearing): read values from a table, a
   pictograph, a bar graph and a line graph. Grounding: MA4.7.1
   to MA4.7.4 (tables and charts); MA4.11.6 (pictographs, many-to-
   one); MA5.11.4 and MA5.11.5 (bar graphs); MA6.11.7 (line
   graphs). Supports (pkFor): the cluster's six indicators. Three
   of the five generators (table, bar, line) are shared with Unit
   7 for cluster 7-C12, whose reading runs to bar graphs, line
   graphs and tables; the named functions below are the shared
   generators. */

function pk7tgTableGen() {
  var names = ["Ana", "Ben", "Cleo", "Dev", "Ella", "Finn", "Gia", "Hugo"];
  var pool = names.slice(), students = [], vals = [], guard = 0;
  while (students.length < 4 && guard++ < 400) {
    var v = ri(2, 12);
    if (vals.indexOf(v) < 0) { students.push(pool.splice(ri(0, pool.length - 1), 1)[0]); vals.push(v); }
  }
  while (students.length < 4) { students.push(pool.length ? pool.splice(0, 1)[0] : "Sam"); vals.push(13 + students.length); }
  var rows = students.map(function (s, i) { return [s, String(vals[i])]; });
  var pairMode = Math.random() < 0.45;
  var q;
  if (!pairMode) {
    var t = ri(0, 3);
    q = mcq("The table shows how many books each student read in October. How many books did " + students[t] + " read?",
      { t: String(vals[t]), fb: "Correct: find " + students[t] + "'s row and read its number." },
      vals.map(function (v, i) { return i; }).filter(function (i) { return i !== t; }).map(function (i) { return { t: String(vals[i]), fb: "That is " + students[i] + "'s number. Read the row for " + students[t] + "." }; }),
      "In the table, the row for " + students[t] + " gives <b>" + vals[t] + "</b> books.",
      { students: students, vals: vals, key: vals[t] });
  } else {
    var a = 0, b = 1, c = 2, d = 3, key = vals[a] + vals[b], guard2 = 0;
    while ((key === vals[c] + vals[d] || key === vals[a] + vals[c] || key === vals[b] + vals[d] || vals[a] + vals[c] === vals[b] + vals[d]) && guard2++ < 200) {
      var nv = ri(2, 12);
      if (vals.indexOf(nv) < 0) vals[guard2 % 4] = nv;
      key = vals[a] + vals[b];
      rows = students.map(function (s, i) { return [s, String(vals[i])]; });
    }
    if (key === vals[c] + vals[d] || key === vals[a] + vals[c] || key === vals[b] + vals[d] || vals[a] + vals[c] === vals[b] + vals[d]) { vals = [3, 5, 8, 11]; key = vals[a] + vals[b]; rows = students.map(function (s, i) { return [s, String(vals[i])]; }); }
    q = mcq("The table shows how many books each student read in October. How many books did " + students[a] + " and " + students[b] + " read in total?",
      { t: String(key), fb: "Correct: " + vals[a] + " + " + vals[b] + " = " + key + "." },
      [{ t: String(vals[c] + vals[d]), fb: "That adds " + students[c] + " and " + students[d] + ". The question names " + students[a] + " and " + students[b] + "." },
       { t: String(vals[a] + vals[c]), fb: "That adds " + students[a] + " and " + students[c] + ". The second student named is " + students[b] + "." },
       { t: String(vals[b] + vals[d]), fb: "That adds " + students[b] + " and " + students[d] + ". The first student named is " + students[a] + "." }],
      "Read the two rows and add: \\(" + vals[a] + " + " + vals[b] + " = " + key + "\\). The answer is <b>" + key + "</b>.",
      { students: students, vals: vals, key: key });
  }
  q.figure = u7tableSVG("Student", ["Books"], rows);
  return q;
}

function pk7tgBarGen() {
  var cats = ["Soccer", "Hockey", "Dance", "Swimming"];
  var vals = [], guard = 0;
  while (vals.length < 4 && guard++ < 400) { var v = ri(2, 8) * 5; if (vals.indexOf(v) < 0) vals.push(v); }
  while (vals.length < 4) vals.push(45 + vals.length * 5);
  var t = ri(0, 3), key = vals[t];
  var candB = [
    { t: String(key + 5), fb: "That is one scale step too high: the bar's top lines up with the mark below that." },
    { t: String(key - 5), fb: "That is one scale step too low: the bar's top lines up with the mark above that." }
  ];
  vals.forEach(function (v, i) { if (i !== t) candB.push({ t: String(v), fb: "That is the value of the " + cats[i] + " bar. Read the " + cats[t] + " bar against the scale." }); });
  candB.push({ t: String(key + 10), fb: "That is two scale steps too high: the bar's top lines up with " + key + "." });
  var seenB = {}; seenB[String(key)] = 1;
  var dsB = [];
  candB.forEach(function (cd) { if (!seenB[cd.t] && dsB.length < 3) { seenB[cd.t] = 1; dsB.push(cd); } });
  var q = mcq("The bar graph shows how many students chose each activity. How many students chose " + cats[t] + "?",
    { t: String(key), fb: "Correct: the top of the " + cats[t] + " bar lines up with " + key + " on the scale." },
    dsB,
    "Read the height of the " + cats[t] + " bar against the scale on the left: it reaches <b>" + key + "</b>.",
    { cats: cats, vals: vals, key: key });
  q.figure = pk7barRead(cats, vals, 5, "Students");
  return q;
}

function pk7tgLineGen() {
  var weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
  var vals = [], i;
  for (i = 0; i < 5; i++) vals.push(ri(2, 9) * 2);
  var incMode = Math.random() < 0.45, q;
  if (!incMode) {
    var t = ri(0, 4), key = vals[t], guard = 0;
    var other = vals[(t + 2) % 5];
    while (other === key && guard++ < 60) { vals[(t + 2) % 5] = key + 2; other = vals[(t + 2) % 5]; }
    var candL = [
      { t: (key + 2) + " cm", fb: "That is one scale step too high: follow the point across to the scale." },
      { t: (key - 2) + " cm", fb: "That is one scale step too low: follow the point across to the scale." },
      { t: other + " cm", fb: "That is the height at " + weeks[(t + 2) % 5] + ". Read the point above " + weeks[t] + "." },
      { t: vals[(t + 1) % 5] + " cm", fb: "That is the height at " + weeks[(t + 1) % 5] + ". Read the point above " + weeks[t] + "." },
      { t: (key + 4) + " cm", fb: "That is two scale steps too high: follow the point across to the scale." }
    ];
    var seenL = {}; seenL[key + " cm"] = 1;
    var dsL = [];
    candL.forEach(function (cd) { if (!seenL[cd.t] && dsL.length < 3) { seenL[cd.t] = 1; dsL.push(cd); } });
    q = mcq("The line graph shows the height of a bean plant at the end of each week. How tall was the plant at the end of " + weeks[t] + "?",
      { t: key + " cm", fb: "Correct: the point above " + weeks[t] + " sits at " + key + " on the height scale." },
      dsL,
      "Find the point above " + weeks[t] + " and read across to the scale: <b>" + key + " cm</b>.",
      { weeks: weeks, vals: vals, key: key });
  } else {
    var a = ri(0, 2), b = a + ri(1, 2), guard2 = 0;
    while (vals[b] <= vals[a] && guard2++ < 60) { vals[b] = vals[a] + ri(1, 3) * 2; }
    var key2 = vals[b] - vals[a];
    var candG = [
      { t: vals[b] + " cm", fb: "That is the height at " + weeks[b] + ", not the growth. Subtract the starting height." },
      { t: vals[a] + " cm", fb: "That is the height at " + weeks[a] + ", not the growth. Subtract it from the later height." },
      { t: (key2 + 2) + " cm", fb: "Check the two heights on the scale: " + vals[a] + " cm and " + vals[b] + " cm; their difference is " + key2 + " cm." },
      { t: (vals[a] + vals[b]) + " cm", fb: "That adds the two heights. Growth is a difference: subtract the starting height." }
    ];
    if (key2 - 2 > 0) candG.push({ t: (key2 - 2) + " cm", fb: "Check the two heights on the scale: " + vals[a] + " cm and " + vals[b] + " cm; their difference is " + key2 + " cm." });
    var seenG = {}; seenG[key2 + " cm"] = 1;
    var dsG = [];
    candG.forEach(function (cd) { if (!seenG[cd.t] && dsG.length < 3) { seenG[cd.t] = 1; dsG.push(cd); } });
    q = mcq("The line graph shows the height of a bean plant at the end of each week. By how much did the plant grow from " + weeks[a] + " to " + weeks[b] + "?",
      { t: key2 + " cm", fb: "Correct: " + vals[b] + " - " + vals[a] + " = " + key2 + "." },
      dsG,
      "Read both heights and subtract: \\(" + vals[b] + " - " + vals[a] + " = " + key2 + "\\). The plant grew <b>" + key2 + " cm</b>.",
      { weeks: weeks, vals: vals, key: key2 });
  }
  q.figure = pk7lineRead(weeks, vals, 2, "Height (cm)");
  return q;
}

E("u1-pk-tg-table", 1, ["7.5"], 2, "gen", pk7tgTableGen,
  ["Find the row (or rows) the question names before reading any numbers.", "A total question needs two rows added."]);

E("u1-pk-tg-picto", 1, ["7.5"], 1, "gen", function () {
  var cats = ["Apples", "Bananas", "Oranges", "Pears"];
  var counts = [], guard = 0;
  while (counts.length < 4 && guard++ < 400) { var c = ri(3, 7); if (counts.indexOf(c) < 0) counts.push(c); }
  while (counts.length < 4) counts.push(8 + counts.length);
  var t = ri(0, 3), key = counts[t] * 2;
  var candP = [
    { t: String(counts[t]), fb: "That counts the symbols but forgets the key: each symbol stands for 2 votes, not 1." },
    { t: String(key + 2), fb: "Count the symbols again: there are " + counts[t] + ", and " + counts[t] + " x 2 = " + key + "." },
    { t: String(counts[(t + 1) % 4] * 2), fb: "That is the total for " + cats[(t + 1) % 4] + ". Count the symbols in the " + cats[t] + " row." },
    { t: String(counts[(t + 2) % 4] * 2), fb: "That is the total for " + cats[(t + 2) % 4] + ". Count the symbols in the " + cats[t] + " row." },
    { t: String(key - 2), fb: "Count the symbols again: there are " + counts[t] + ", and " + counts[t] + " x 2 = " + key + "." }
  ];
  var seenP = {}; seenP[String(key)] = 1;
  var dsP = [];
  candP.forEach(function (cd) { if (!seenP[cd.t] && dsP.length < 3) { seenP[cd.t] = 1; dsP.push(cd); } });
  var q = mcq("In the pictograph, each symbol stands for 2 votes. How many votes did " + cats[t] + " get?",
    { t: String(key), fb: "Correct: " + counts[t] + " symbols at 2 votes each is " + counts[t] + " x 2 = " + key + " votes." },
    dsP,
    "Count the symbols for " + cats[t] + ": " + counts[t] + ". Each stands for 2 votes: \\(" + counts[t] + " \\times 2 = " + key + "\\). The answer is <b>" + key + "</b>.",
    { cats: cats, counts: counts, key: key });
  q.figure = pk7picto(cats.map(function (c, i) { return { label: c, count: counts[i] }; }));
  return q;
}, ["Read the key first: it tells what one symbol stands for.", "Count the symbols, then multiply by the key's value."]);

E("u1-pk-tg-bar", 1, ["7.5"], 1, "gen", pk7tgBarGen,
  ["Run your eye from the top of the bar across to the scale.", "The scale counts in steps: check the step size first."]);

E("u1-pk-tg-line", 1, ["7.5"], 2, "gen", pk7tgLineGen,
  ["Find the point above the label named, then read across to the scale.", "Growth is a difference: read both heights and subtract."]);

E("u1-pk-tg-compare", 1, ["7.5"], 2, "gen", function () {
  var cats = ["Grade 5", "Grade 6", "Grade 7", "Grade 8"];
  var vals = [], guard = 0;
  while (vals.length < 4 && guard++ < 400) { var v = ri(3, 9) * 5; if (vals.indexOf(v) < 0) vals.push(v); }
  while (vals.length < 4) vals.push(50 + vals.length * 5);
  var a = ri(0, 3), b = ri(0, 3);
  while (b === a) b = ri(0, 3);
  var hi = Math.max(vals[a], vals[b]), lo = Math.min(vals[a], vals[b]), key = hi - lo;
  var hiCat = vals[a] > vals[b] ? cats[a] : cats[b], loCat = vals[a] > vals[b] ? cats[b] : cats[a];
  var candC = [
    { t: String(hi + lo), fb: "That adds the two bars. 'How many more' asks for the difference." },
    { t: String(hi), fb: "That is the " + hiCat + " bar alone. Subtract the " + loCat + " bar as well." },
    { t: String(lo), fb: "That is the " + loCat + " bar alone. Subtract it from the " + hiCat + " bar." },
    { t: String(key + 5), fb: "That is one scale step more than the difference. Subtract again: " + hi + " - " + lo + "." }
  ];
  var seenC = {}; seenC[String(key)] = 1;
  var dsC = [];
  candC.forEach(function (cd) { if (!seenC[cd.t] && dsC.length < 3) { seenC[cd.t] = 1; dsC.push(cd); } });
  var q = mcq("The bar graph shows how many books each grade borrowed from the library. How many more books did " + hiCat + " borrow than " + loCat + "?",
    { t: String(key), fb: "Correct: " + hi + " - " + lo + " = " + key + "." },
    dsC,
    "Read both bars and subtract: \\(" + hi + " - " + lo + " = " + key + "\\). The answer is <b>" + key + "</b>.",
    { cats: cats, vals: vals, key: key });
  q.figure = pk7barRead(cats, vals, 5, "Books");
  return q;
}, ["Read both bars against the scale first.", "'How many more' means subtract the smaller from the larger."]);

/* ================= Cluster 7-C4 top-ups =================
   Cluster 7-C4's support set (the four Unit 6 one-step entries)
   is flagged in PKT7_P3. The two authored top-ups below complete
   the cluster, housed in Unit 6's pool only (specification
   Section 13, Decision 5).

   EQUALITY AS BALANCE (equality-balance, Unit 6, 3 entries, all
   authored): what keeps both sides of an equation equal.
   Grounding: MA6.8.2 to MA6.8.5 (preservation of equality).
   Supports (pkFor): 8.1, 8.2, 8.3. */

E("u6-pk-balance-value", 6, ["8.1"], 1, "gen", function () {
  var mode = pick(["xa", "ax", "xminus"]);
  var a, x;
  if (mode === "xminus") { a = ri(3, 9); x = ri(a + 2, 15); }
  else { a = ri(3, 12); x = ri(4, 15); var guard = 0; while (a === x && guard++ < 60) { x = ri(4, 15); } }
  var expr, val;
  if (mode === "xa") { expr = "n + " + a; val = x + a; }
  else if (mode === "ax") { expr = a + " + n"; val = x + a; }
  else { expr = "n - " + a; val = x - a; }
  var ds = pk7uniq(x, [val, x + 1, x - 1]).slice(0, 3);
  return mcq("What is the value of \\(n\\) in the equation \\(" + expr + " = " + val + "\\)?",
    { t: String(x), fb: "Correct: substituting " + x + " makes both sides equal to " + val + "." },
    ds.map(function (d) { return { t: String(d), fb: d === val ? "That is the value of the whole side, not of n. Work backwards from " + val + "." : "Substitute it and check: the two sides do not balance. Work backwards from " + val + "." }; }),
    "Work backwards: " + (mode === "xminus" ? "n is " + a + " more than " + val + ", so n = " + val + " + " + a + " = " + x : "n is " + a + " less than " + val + ", so n = " + val + " - " + a + " = " + x) + ". The answer is <b>" + x + "</b>.",
    { a: a, x: x, mode: mode });
}, ["Think of the equation as a balance: the two sides must stay equal.", "Work backwards from the side you know completely."]);

E("u6-pk-balance-change", 6, ["8.1"], 2, "gen", function () {
  var a = ri(3, 9), b = ri(3, 9), c = pick([3, 4, 6, 10]);
  var sum = a + b;
  return mcq("A student adds " + c + " to the left side of the equation \\(" + a + " + " + b + " = " + sum + "\\). To keep the equation balanced, what must be done to the right side?",
    { t: "Add " + c + " to the right side too", fb: "Correct: whatever is done to one side of an equation must be done to the other, or the sides stop balancing." },
    [{ t: "Take " + c + " from the right side", fb: "That changes the right side the opposite way; the sides would differ by twice as much." },
     { t: "Add " + c + " to the left side again", fb: "That changes the left side twice and the right side not at all; the balance is lost." },
     { t: "Leave the right side as it is", fb: "Then the left side is " + c + " more than the right, and the equation no longer balances." }],
    "An equation balances only when both sides stay equal. Adding " + c + " to one side means <b>adding " + c + " to the right side too</b>.",
    { a: a, b: b, c: c });
}, ["Picture a balance scale: change one pan and the other must match.", "Equal changes to both sides keep an equation true."]);

E("u6-pk-balance-equivalent", 6, ["8.1"], 2, "gen", function () {
  var a = ri(3, 9), sol = ri(4, 12), b = a + sol, c = ri(2, 6);
  return mcq("Which equation has the same solution as \\(n + " + a + " = " + b + "\\)?",
    { t: "\\(n + " + (a + c) + " = " + (b + c) + "\\)", fb: "Correct: " + c + " is added to both sides, so the equation still balances with the same solution." },
    [{ t: "\\(n + " + (a + c) + " = " + b + "\\)", fb: "That adds " + c + " to the left side only; the sides no longer balance for the same n." },
     { t: "\\(n + " + a + " = " + (b + c) + "\\)", fb: "That adds " + c + " to the right side only; the sides no longer balance for the same n." },
     { t: "\\(n + " + (a + c) + " = " + (b - c) + "\\)", fb: "That adds " + c + " to one side and subtracts it from the other; the changes must match." }],
    "Adding the same number to both sides keeps an equation's solution: \\(n + " + a + " = " + b + "\\) becomes <b>\\(n + " + (a + c) + " = " + (b + c) + "\\)</b>.",
    { a: a, b: b, c: c });
}, ["The same change must happen to both sides.", "Check each choice: was exactly the same thing done on the left and on the right?"]);

/* SUBSTITUTION (substitution, Unit 6, 3 entries, all authored):
   evaluate an expression or complete a table for a given value.
   Grounding: MA6.8.6 (substitution into expressions), with the
   table item on MA4.8.10 (connecting representations). Supports
   (pkFor): 8.1, 8.14, 8.17. The strand's substitution group from
   Piece 1 is housed in Unit 2; this top-up is the cluster 7-C4
   set, housed in Unit 6. */

E("u6-pk-subst-simple", 6, ["8.1"], 1, "gen", function () {
  var minus = Math.random() < 0.45;
  var a = minus ? ri(3, 9) : ri(2, 9), n = ri(3, 9), b = ri(2, 12);
  var key = minus ? a * n - b : a * n + b;
  var ds = minus
    ? [a * n, a * n + b, (a - 1) * n - b]
    : [a * n, a + n + b, (a + 1) * n + b];
  ds = pk7fill(key, pk7uniq(key, ds)).slice(0, 3);
  return mcq("If \\(n = " + n + "\\), what is the value of \\(" + a + "n " + (minus ? "-" : "+") + " " + b + "\\)?",
    { t: String(key), fb: "Correct: " + a + "n means " + a + " x " + n + " = " + (a * n) + ", then " + (minus ? "subtract" : "add") + " " + b + "." },
    ds.map(function (d) { return { t: String(d), fb: "Substitute first: " + a + "n is " + a + " x " + n + " = " + (a * n) + ". Then " + (minus ? "subtract" : "add") + " " + b + "." }; }),
    "Substitute \\(n = " + n + "\\): \\(" + a + " \\times " + n + " " + (minus ? "-" : "+") + " " + b + " = " + key + "\\). The answer is <b>" + key + "</b>.",
    { a: a, n: n, b: b, minus: minus });
}, ["Replace the letter with its value everywhere it appears.", "Remember that 3n means 3 times n, not 3 plus n."]);

E("u6-pk-subst-brackets", 6, ["8.1"], 2, "gen", function () {
  var a = pick([2, 3, 4]), n = ri(3, 8), b = ri(2, 6);
  var key = a * (n + b);
  var ds = pk7uniq(key, [a * n + b, n + b, a + n + b]).slice(0, 3);
  return mcq("If \\(x = " + n + "\\), what is the value of \\(" + a + "(x + " + b + ")\\)?",
    { t: String(key), fb: "Correct: brackets first: " + n + " + " + b + " = " + (n + b) + ", then " + a + " x " + (n + b) + " = " + key + "." },
    ds.map(function (d) { return { t: String(d), fb: d === a * n + b ? "That multiplies before doing the brackets. Brackets come first: " + n + " + " + b + " = " + (n + b) + "." : "Work the brackets first: substitute " + n + " for x, add " + b + ", then multiply by " + a + "." }; }),
    "Substitute and do the brackets first: \\(" + a + "(" + n + " + " + b + ") = " + a + " \\times " + (n + b) + " = " + key + "\\). The answer is <b>" + key + "</b>.",
    { a: a, n: n, b: b });
}, ["Substitute the value, then follow the order of operations.", "Brackets are worked before multiplication."]);

E("u6-pk-subst-table", 6, ["8.1"], 2, "gen", function () {
  var k = pick([2, 3]), c = ri(1, 5), guard = 0;
  while (k === c && guard++ < 60) { c = ri(1, 5); }
  if (k === c) c = k === 2 ? 3 : 2;
  var ys = [1, 2, 3, 4].map(function (x) { return k * x + c; });
  var key = ys[2];
  var ds = pk7uniq(key, [ys[3], ys[1], key - c]).slice(0, 3);
  var q = mcq("The table follows the rule \\(y = " + k + "x + " + c + "\\). What is the missing value?",
    { t: String(key), fb: "Correct: for x = 3, y = " + k + " x 3 + " + c + " = " + key + "." },
    ds.map(function (d) { return { t: String(d), fb: d === key - c ? "That multiplies only, and forgets the + " + c + " in the rule." : "That is another row's value. Substitute x = 3 into the rule." }; }),
    "Substitute \\(x = 3\\) into the rule: \\(y = " + k + " \\times 3 + " + c + " = " + key + "\\). The answer is <b>" + key + "</b>.",
    { k: k, c: c, key: key });
  q.figure = u7tableSVG("x", ["1", "2", "3", "4"], [["y", String(ys[0]), String(ys[1]), "?", String(ys[3])]]);
  return q;
}, ["Use the x value above the question mark.", "Substitute that x into the rule, multiplying first, then adding."]);

/* ================= Cluster 7-C6 =================
   FRACTION REPRESENTATION (fraction-representation, Unit 3, 5
   entries, all authored, all figure-bearing): name the fraction
   a bar, a circle, a set or a number line shows, and pick the
   diagram that shows a given fraction. Grounding: MA6.3.2 to
   MA6.3.4 (representing fractions and mixed numbers); MA4.3.13
   and MA4.3.14 (fractions on a number line, fraction strips).
   Supports (pkFor): the cluster's thirteen indicators (3.1 to
   3.6, 3.8 to 3.14). */

function pk7fracNameOpts(n, d) {
  /* Option set for "what fraction is shown" items: the key n/d,
     the unshaded part (d-n)/d, the swapped fraction d/n, and the
     part-to-part error n/(n+d). All four values are distinct
     whenever 0 < n < d and n != d - n. */
  return {
    key: u5M(n, d),
    ds: [
      { t: u5M(d - n, d), fb: "That is the fraction that is NOT shaded. Count the shaded parts over the total parts." },
      { t: u5M(d, n), fb: "That swaps the parts: the denominator (bottom) is the total number of equal parts, " + d + "." },
      { t: u5M(n, n + d), fb: "That compares the shaded parts to the unshaded parts. A fraction compares the shaded parts to ALL the parts, " + d + "." }
    ]
  };
}

E("u3-pk-fracrep-bar", 3, ["3.1"], 1, "gen", function () {
  var d = pick([4, 5, 6, 7, 8, 9]), n = ri(1, d - 1), guard = 0;
  while ((u5gcd(n, d) !== 1 || n === d - n) && guard++ < 120) { n = ri(1, d - 1); }
  if (u5gcd(n, d) !== 1 || n === d - n) { n = 1; }
  var o = pk7fracNameOpts(n, d);
  var q = mcq("What fraction of the bar is shaded?",
    { t: o.key, fb: "Correct: " + n + " of the " + d + " equal parts are shaded." },
    o.ds,
    "The bar is split into " + d + " equal parts and " + n + " are shaded, so the shaded fraction is <b>" + o.key + "</b>.",
    { n: n, d: d });
  q.figure = u5barsSVG([{ n: n, d: d, label: "" }]);
  return q;
}, ["Count all the equal parts first: that is the denominator.", "Then count only the shaded parts: that is the numerator."]);

E("u3-pk-fracrep-circle", 3, ["3.1"], 1, "gen", function () {
  var d = pick([3, 4, 5, 6, 8]), n = ri(1, d - 1), guard = 0;
  while ((u5gcd(n, d) !== 1 || n === d - n) && guard++ < 120) { n = ri(1, d - 1); }
  if (u5gcd(n, d) !== 1 || n === d - n) { n = 1; }
  var o = pk7fracNameOpts(n, d);
  var q = mcq("What fraction of the circle is shaded?",
    { t: o.key, fb: "Correct: " + n + " of the " + d + " equal sectors are shaded." },
    o.ds,
    "The circle is split into " + d + " equal sectors and " + n + " are shaded, so the shaded fraction is <b>" + o.key + "</b>.",
    { n: n, d: d });
  q.figure = pk7fracCirc(n, d);
  return q;
}, ["Count all the equal sectors first: that is the denominator.", "Then count only the shaded sectors: that is the numerator."]);

E("u3-pk-fracrep-set", 3, ["3.1"], 2, "gen", function () {
  var total = pick([10, 12]), shaded = ri(3, total - 3), guard = 0;
  while (shaded === total - shaded && guard++ < 60) { shaded = ri(3, total - 3); }
  if (shaded === total - shaded) shaded = 3;
  var o = pk7fracNameOpts(shaded, total);
  var q = mcq("What fraction of the counters is shaded?",
    { t: o.key, fb: "Correct: " + shaded + " of the " + total + " counters are shaded." },
    o.ds,
    "There are " + total + " counters in all and " + shaded + " are shaded, so the shaded fraction is <b>" + o.key + "</b>.",
    { n: shaded, d: total });
  q.figure = pk7setFig(total, shaded);
  return q;
}, ["The denominator is the whole set: count every counter.", "The numerator counts only the shaded counters."]);

E("u3-pk-fracrep-pick", 3, ["3.1"], 2, "gen", function () {
  var d = pick([4, 5, 6]), n = ri(1, d - 1), guard = 0;
  while (u5gcd(n, d) !== 1 && guard++ < 120) { n = ri(1, d - 1); }
  if (u5gcd(n, d) !== 1) n = 1;
  var alts = [[n + 1 <= d - 1 ? n + 1 : n - 1, d], [n, d + 1], [d - n, d]];
  var pairs = [[n, d]].concat(alts), seen = {}, okPairs = pairs.every(function (p) { var k = p[0] + "/" + p[1]; if (seen[k]) return false; seen[k] = 1; return p[0] >= 1 && p[0] < p[1]; });
  if (!okPairs) { pairs = [[2, 5], [3, 5], [2, 6], [3, 6]]; n = 2; d = 5; }
  var order = [0, 1, 2, 3], i;
  for (i = 3; i > 0; i--) { var j = ri(0, i), tmp = order[i]; order[i] = order[j]; order[j] = tmp; }
  var shuffled = order.map(function (k) { return pairs[k]; });
  var idx = shuffled.findIndex(function (p) { return p[0] === pairs[0][0] && p[1] === pairs[0][1]; });
  var labs = ["A", "B", "C", "D"];
  var q = mcq("Which diagram shows " + u5M(n, d) + " shaded?",
    { t: "Diagram " + labs[idx], fb: "Correct: that bar has " + pairs[0][0] + " of its " + pairs[0][1] + " equal parts shaded." },
    shuffled.map(function (p, k) { return k; }).filter(function (k) { return k !== idx; }).map(function (k) { return { t: "Diagram " + labs[k], fb: "That bar shows " + u5M(shuffled[k][0], shuffled[k][1]) + " shaded (" + shuffled[k][0] + " of " + shuffled[k][1] + " parts)." }; }),
    "The fraction " + u5M(n, d) + " needs a bar split into " + d + " equal parts with " + n + " shaded: that is <b>diagram " + labs[idx] + "</b>.",
    { pairs: shuffled, idx: idx, n: n, d: d });
  q.figure = pk7fracPickFig(shuffled);
  return q;
}, ["The denominator tells how many equal parts each bar must have.", "Then count the shaded parts in each bar with that many parts."]);

E("u3-pk-fracrep-line", 3, ["3.1"], 2, "gen", function () {
  var d = pick([4, 5, 6, 8]), n = ri(1, d - 1), guard = 0;
  while ((u5gcd(n, d) !== 1 || n === d - n) && guard++ < 120) { n = ri(1, d - 1); }
  if (u5gcd(n, d) !== 1 || n === d - n) { n = 1; }
  var o = pk7fracNameOpts(n, d);
  var q = mcq("What fraction does the marker show on the number line?",
    { t: o.key, fb: "Correct: the line is split into " + d + " equal intervals, and the marker is at the " + n + (n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th") + " tick." },
    o.ds,
    "From 0 to 1 there are " + d + " equal intervals, so each interval is " + u5M(1, d) + ". The marker is " + n + " intervals along: <b>" + o.key + "</b>.",
    { n: n, d: d });
  q.figure = pk7fracLine(d, n);
  return q;
}, ["Count the equal intervals between 0 and 1: that is the denominator.", "Count the intervals from 0 to the marker: that is the numerator."]);

/* EQUIVALENT FRACTIONS (equivalent-fractions, Unit 3, 5 entries,
   all authored): recognize, produce and reduce equivalent
   fractions by multiplying or dividing both parts by the same
   whole number. Grounding: MA5.3.1, MA5.3.2, MA5.3.9, MA5.3.10.
   Supports (pkFor): the cluster's thirteen indicators.
   Three of the five generators (recognize, target, divide) are
   the design first authored inside the Mathematics 8 bank under
   Decision 6 of the specification, where they stand as the
   authored source of record for this group; the Mathematics 7
   entries below reproduce those generators verbatim (only the
   unreduced-fraction helper's name differs, pk7eqf for pk8eqf),
   and the remaining two are authored new to the same design. The
   three are shared onward into Unit 5 (pkFor 6.16) for cluster
   7-C11. */

function pk7eqRecognizeGen() {
  var q = ri(4, 9), p = ri(1, q - 1), g0 = 0;
  while (u5gcd(p, q) !== 1 && g0++ < 60) { p = ri(1, q - 1); }
  if (u5gcd(p, q) !== 1) { p = 1; }
  var k = ri(2, 4), N = p * k, D = q * k;
  return mcq("Which fraction is equivalent to " + u5M(p, q) + "?",
    { t: pk7eqf(N, D), fb: "Correct: multiplying the numerator and the denominator of " + u5M(p, q) + " by " + k + " gives " + pk7eqf(N, D) + "." },
    [{ t: pk7eqf(N, q), fb: "That multiplies only the numerator by " + k + ". The denominator must be multiplied by " + k + " as well." },
     { t: pk7eqf(p, D), fb: "That multiplies only the denominator by " + k + ". The numerator must be multiplied by " + k + " as well." },
     { t: pk7eqf(p + 1, q + 1), fb: "That adds 1 to the numerator and the denominator. Adding the same number to both parts changes the value; multiply both by the same number instead." }],
    "Equivalent fractions come from multiplying the numerator and the denominator by the same whole number: \\[ " + FR(p, q) + " = " + FR(N, D) + " \\] The answer is <b>" + pk7eqf(N, D) + "</b>.",
    { p: p, q: q, k: k });
}

function pk7eqTargetGen() {
  var q = ri(5, 9), p = ri(2, q - 2), g0 = 0;
  while (u5gcd(p, q) !== 1 && g0++ < 60) { p = ri(2, q - 2); }
  if (u5gcd(p, q) !== 1) { p = 2; }
  var k = ri(2, 4), D = q * k, N = p * k;
  var dB = (k > 2) ? p * (k - 1) : N + 1;
  return mcq(u5M(p, q) + " is equivalent to a fraction with denominator \\(" + D + "\\). What is that fraction?",
    { t: pk7eqf(N, D), fb: "Correct: the denominator is multiplied by " + k + ", so the numerator is multiplied by " + k + " too: " + p + " becomes " + N + "." },
    [{ t: pk7eqf(p, D), fb: "That keeps the numerator at " + p + ". When the denominator is multiplied by " + k + ", the numerator must be multiplied by " + k + " as well." },
     { t: pk7eqf(dB, D), fb: (k > 2) ? "That multiplies the numerator by " + (k - 1) + " while the denominator is multiplied by " + k + ". Both parts must be multiplied by the same number." : "That is one more than the numerator you get by scaling. Multiply " + p + " by " + k + " exactly." },
     { t: pk7eqf((p + 1) * k, D), fb: "That scales " + (p + 1) + " instead of " + p + ". Work from the given fraction: multiply its numerator by " + k + "." }],
    "The denominator " + q + " is multiplied by " + k + " to give " + D + ", so the numerator is multiplied by " + k + " as well: \\[ " + FR(p, q) + " = " + FR(N, D) + " \\] The answer is <b>" + pk7eqf(N, D) + "</b>.",
    { p: p, q: q, k: k });
}

function pk7eqDivideGen() {
  var q = ri(4, 9), p = ri(2, q - 1), g0 = 0;
  while (u5gcd(p, q) !== 1 && g0++ < 60) { p = ri(2, q - 1); }
  if (u5gcd(p, q) !== 1) { p = 2; }
  var k = ri(2, 4), N = p * k, D = q * k;
  return mcq("Divide the numerator and the denominator of " + pk7eqf(N, D) + " by \\(" + k + "\\). What fraction do you get?",
    { t: pk7eqf(p, q), fb: "Correct: " + N + " divided by " + k + " is " + p + ", and " + D + " divided by " + k + " is " + q + "." },
    [{ t: pk7eqf(p, D), fb: "That divides only the numerator by " + k + ". The denominator must be divided by " + k + " as well." },
     { t: pk7eqf(N, q), fb: "That divides only the denominator by " + k + ". The numerator must be divided by " + k + " as well." },
     { t: pk7eqf(N - k, D - k), fb: "That subtracts " + k + " from the numerator and the denominator. Subtracting changes the value; dividing both by " + k + " keeps it." }],
    "Dividing the numerator and the denominator by the same whole number keeps the value of the fraction: \\[ " + FR(N, D) + " = " + FR(p, q) + " \\] The answer is <b>" + pk7eqf(p, q) + "</b>.",
    { p: p, q: q, k: k });
}

E("u3-pk-equiv-recognize", 3, ["3.1"], 1, "gen", pk7eqRecognizeGen,
  ["Look for the choice made by multiplying the top and the bottom by the same number.", "Adding the same number to the top and the bottom does not make an equivalent fraction."]);

E("u3-pk-equiv-target", 3, ["3.1"], 2, "gen", pk7eqTargetGen,
  ["Find what the denominator was multiplied by to reach the target denominator.", "Multiply the numerator by that same number."]);

E("u3-pk-equiv-divide", 3, ["3.1"], 2, "gen", pk7eqDivideGen,
  ["Do the same division to the top and the bottom.", "Dividing both parts by the same number keeps the fraction's value."]);

E("u3-pk-equiv-not", 3, ["3.1"], 2, "gen", function () {
  var q = pick([3, 4, 5, 6]), p = ri(1, q - 1), guard = 0;
  while (u5gcd(p, q) !== 1 && guard++ < 60) { p = ri(1, q - 1); }
  if (u5gcd(p, q) !== 1) p = 1;
  var eqs = [2, 3, 4].map(function (k) { return { t: pk7eqf(p * k, q * k), fb: "That one IS equivalent: both parts of " + u5M(p, q) + " were multiplied by " + k + "." }; });
  var notEq = { t: pk7eqf(2 * p, 2 * q + 1), fb: "Correct: this fraction's value is different. No whole number multiplies both parts of " + u5M(p, q) + " to give it." };
  var opts = eqs.concat([notEq]);
  return mcq("Which fraction is NOT equivalent to " + u5M(p, q) + "?",
    notEq, eqs,
    "Three of the choices come from multiplying both parts of " + u5M(p, q) + " by the same whole number. The remaining one, <b>" + notEq.t + "</b>, has a different value.",
    { p: p, q: q });
}, ["Check each choice: can it be made by multiplying both parts by the same whole number?", "Reduce each choice: the one that does not reduce to the given fraction is the answer."]);

E("u3-pk-equiv-missing", 3, ["3.1"], 1, "gen", function () {
  var q = pick([4, 5, 6, 8]), p = ri(1, q - 1), guard = 0;
  while (u5gcd(p, q) !== 1 && guard++ < 60) { p = ri(1, q - 1); }
  if (u5gcd(p, q) !== 1) p = 1;
  var k = ri(2, 4), D = q * k, N = p * k;
  var ds = pk7fill(N, pk7uniq(N, [p + k, N + p, N - p])).slice(0, 3);
  return mcq(u5M(p, q) + " = " + pk7eqf("?", D) + ". What is the missing numerator?",
    { t: String(N), fb: "Correct: the denominator is multiplied by " + k + ", so the numerator is too: " + p + " x " + k + " = " + N + "." },
    ds.map(function (d) { return { t: String(d), fb: "The denominator " + q + " is multiplied by " + k + " to give " + D + ". Do the same to the numerator." }; }),
    "The denominator is multiplied by " + k + ", so multiply the numerator by " + k + " as well: \\(" + p + " \\times " + k + " = " + N + "\\). The answer is <b>" + N + "</b>.",
    { p: p, q: q, k: k });
}, ["Find the multiplier from the denominators first.", "Apply the same multiplier to the numerator."]);

/* DECIMAL PLACE VALUE (decimal-place-value, Unit 3, 5 entries,
   all authored): the value of a digit, expanded form, rounding
   to tenths and hundredths, and naming the digit in a place.
   Grounding: MA5.3.15 to MA5.3.19 (decimal place value and
   comparing decimals). Supports (pkFor): the cluster's thirteen
   indicators. */

E("u3-pk-dpv-digit-value", 3, ["3.1"], 1, "gen", function () {
  var places = [
    { name: "tenths", fmtv: function (dg) { return "0." + dg; } },
    { name: "hundredths", fmtv: function (dg) { return "0.0" + dg; } },
    { name: "thousandths", fmtv: function (dg) { return "0.00" + dg; } }
  ];
  var digs, whole, guard = 0;
  do {
    whole = ri(12, 68);
    digs = [ri(1, 9), ri(1, 9), ri(1, 9)];
    var wdigs = String(whole).split("").map(Number);
    var all = digs.concat(wdigs);
    var distinct = all.every(function (v, i) { return all.indexOf(v) === i; });
  } while (!distinct && guard++ < 300);
  if (!distinct) { whole = 26; digs = [4, 7, 3]; }
  var numStr = whole + "." + digs.join("");
  var t = ri(0, 2), digit = digs[t];
  var key = places[t].fmtv(digit);
  var ds = places.map(function (pl, i) { return i; }).filter(function (i) { return i !== t; }).map(function (i) { return { t: places[i].fmtv(digit), fb: "That is the value of the digit in the " + places[i].name + " place. Find the " + digit + " in " + numStr + " and name its place." }; });
  ds.push({ t: String(digit), fb: "That is the digit's face value. Its place makes it worth much less than " + digit + "." });
  return mcq("In the number " + numStr + ", what is the value of the digit " + digit + "?",
    { t: key, fb: "Correct: the " + digit + " sits in the " + places[t].name + " place, so its value is " + key + "." },
    ds,
    "The digit " + digit + " is in the " + places[t].name + " place of " + numStr + ", so its value is <b>" + key + "</b>.",
    { numStr: numStr, digit: digit, place: places[t].name });
}, ["Find the digit in the number and name its place.", "A digit's value is the digit times the value of its place."]);

E("u3-pk-dpv-expanded", 3, ["3.1"], 2, "gen", function () {
  var a = ri(2, 9), b = ri(1, 9), c = ri(1, 9);
  var numStr = a + "." + b + c;
  return mcq("Which is the expanded form of " + numStr + "?",
    { t: a + " + 0." + b + " + 0.0" + c, fb: "Correct: " + a + " ones, " + b + " tenths and " + c + " hundredths." },
    [{ t: a + " + 0." + b + " + 0." + c, fb: "The last digit, " + c + ", is in the hundredths place, so it is worth 0.0" + c + ", not 0." + c + "." },
     { t: a + " + 0.0" + b + " + 0.0" + c, fb: "The digit " + b + " is in the tenths place, so it is worth 0." + b + ", not 0.0" + b + "." },
     { t: (a * 10) + " + 0." + b + " + 0.0" + c, fb: "The whole-number part is " + a + ", not " + (a * 10) + ": read the number as written." }],
    "Break the number into its places: " + a + " + " + b + " tenths + " + c + " hundredths is <b>" + a + " + 0." + b + " + 0.0" + c + "</b>.",
    { a: a, b: b, c: c });
}, ["Write the value of each digit, place by place.", "Tenths are written 0.d and hundredths 0.0d."]);

E("u3-pk-dpv-round-tenth", 3, ["3.1"], 1, "gen", function () {
  var w = ri(2, 9), t = ri(1, 9), h = ri(1, 9);
  var V = w * 100 + t * 10 + h; /* the value in integer hundredths: rounding is decided on the displayed digits, never on float arithmetic */
  var keyT = Math.floor((V + 5) / 10), floorT = Math.floor(V / 10), ceilT = floorT + 1;
  var cand = [
    { val: ceilT, fb: "That rounds up, but the hundredths digit is " + h + ", which is less than 5, so the tenths digit stays." },
    { val: floorT, fb: "That keeps the tenths digit, but the hundredths digit is " + h + ", which is 5 or more, so the tenths digit goes up." },
    { val: keyT + 1, fb: "That is one tenth too far. Look at the hundredths digit only to decide." },
    { val: keyT - 1, fb: "That is one tenth too low. Look at the hundredths digit only to decide." }
  ];
  var seen = {}; seen[keyT] = 1;
  var ds = [];
  cand.forEach(function (cd) { if (!seen[cd.val] && ds.length < 3) { seen[cd.val] = 1; ds.push({ t: fmt(cd.val / 10, 1), fb: cd.fb }); } });
  /* The unrounded value itself is the fourth classic error. */
  if (ds.length < 3) ds.push({ t: fmt(V / 100, 2), fb: "That is the number itself, not rounded to the nearest tenth." });
  return mcq("Round " + fmt(V / 100, 2) + " to the nearest tenth.",
    { t: fmt(keyT / 10, 1), fb: "Correct: the hundredths digit is " + h + ", so " + fmt(V / 100, 2) + " rounds to " + fmt(keyT / 10, 1) + "." },
    ds,
    "Look at the hundredths digit, " + h + ": " + (h >= 5 ? "it is 5 or more, so the tenths digit rounds up" : "it is less than 5, so the tenths digit stays") + ". " + fmt(V / 100, 2) + " rounds to <b>" + fmt(keyT / 10, 1) + "</b>.",
    { v: fmt(V / 100, 2), key: fmt(keyT / 10, 1) });
}, ["Rounding to the nearest tenth is decided by the hundredths digit.", "5 or more rounds up; less than 5 stays."]);

E("u3-pk-dpv-round-hundredth", 3, ["3.1"], 2, "gen", function () {
  var w = ri(2, 9), t = ri(0, 9), h = ri(1, 9), th = ri(1, 9);
  var V = w * 1000 + t * 100 + h * 10 + th; /* the value in integer thousandths: rounding is decided on the displayed digits, never on float arithmetic */
  var keyH = Math.floor((V + 5) / 10), floorH = Math.floor(V / 10), ceilH = floorH + 1;
  var round10H = Math.floor((V + 50) / 100) * 10;
  var cand = [
    { val: floorH, dec: 2, fb: "That keeps the hundredths digit, but the thousandths digit is " + th + ", which is 5 or more, so it rounds up." },
    { val: ceilH, dec: 2, fb: "That rounds up, but the thousandths digit is " + th + ", which is less than 5, so the hundredths digit stays." },
    { val: round10H, dec: 1, fb: "That rounds to the nearest tenth. The question asks for the nearest hundredth." },
    { val: keyH + 1, dec: 2, fb: "That is one hundredth too far. Only the thousandths digit decides." },
    { val: keyH - 1, dec: 2, fb: "That is one hundredth too low. Only the thousandths digit decides." },
    { val: keyH + 2, dec: 2, fb: "That is two hundredths too far. Only the thousandths digit decides." },
    { val: keyH - 2, dec: 2, fb: "That is two hundredths too low. Only the thousandths digit decides." }
  ];
  var seen = {}; seen[keyH] = 1;
  var ds = [];
  cand.forEach(function (cd) { if (!seen[cd.val] && ds.length < 3) { seen[cd.val] = 1; ds.push({ t: fmt(cd.val / 100, cd.dec), fb: cd.fb }); } });
  return mcq("Round " + fmt(V / 1000, 3) + " to the nearest hundredth.",
    { t: fmt(keyH / 100, 2), fb: "Correct: the thousandths digit is " + th + ", so " + fmt(V / 1000, 3) + " rounds to " + fmt(keyH / 100, 2) + "." },
    ds,
    "Look at the thousandths digit, " + th + ": " + (th >= 5 ? "it is 5 or more, so the hundredths digit rounds up" : "it is less than 5, so the hundredths digit stays") + ". " + fmt(V / 1000, 3) + " rounds to <b>" + fmt(keyH / 100, 2) + "</b>.",
    { v: fmt(V / 1000, 3), key: fmt(keyH / 100, 2) });
}, ["Rounding to the nearest hundredth is decided by the thousandths digit.", "Keep two decimal places in the answer."]);

E("u3-pk-dpv-place-name", 3, ["3.1"], 1, "gen", function () {
  var digs, guard = 0, distinct = false;
  do {
    digs = [ri(1, 9), ri(1, 9), ri(1, 9), ri(1, 9)];
    distinct = digs.every(function (v, i) { return digs.indexOf(v) === i; });
  } while (!distinct && guard++ < 300);
  if (!distinct) digs = [5, 2, 8, 6];
  var numStr = digs[0] + "" + digs[1] + "." + digs[2] + "" + digs[3];
  var key = String(digs[3]);
  var names = ["tens", "ones", "tenths", "hundredths"];
  var ds = [0, 1, 2].map(function (i) { return { t: String(digs[i]), fb: "That digit is in the " + names[i] + " place. The hundredths place is the second digit after the decimal point." }; });
  return mcq("In the number " + numStr + ", which digit is in the hundredths place?",
    { t: key, fb: "Correct: the hundredths place is the second digit after the decimal point." },
    ds,
    "Count the places after the decimal point: " + digs[2] + " is tenths and " + digs[3] + " is hundredths. The answer is <b>" + key + "</b>.",
    { numStr: numStr, key: key });
}, ["The places after the decimal point are tenths, then hundredths.", "Count two places past the decimal point."]);

/* FRACTION AS DECIMAL (fraction-as-decimal, Unit 3, 4 entries,
   all authored): convert between fractions and decimals in the
   tenths, hundredths and simple-denominator cases. Grounding:
   MA5.5.10 and MA6.6.3 (dividing to convert); MA4.3.22, MA5.3.20
   and MA5.3.21 (relating fractions and decimals). Supports
   (pkFor): 3.8 to 3.14. */

E("u3-pk-fad-to-decimal", 3, ["3.8"], 1, "gen", function () {
  var pairs = [[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 10], [3, 10], [7, 10], [9, 10]];
  var pr = pick(pairs), n = pr[0], d = pr[1], v = n / d;
  var key = fmt(v, 3);
  /* The third distractor is the next fraction up; when that is 1,
     a tenth-step value at the key's own precision takes its place,
     so the key is never the only option at its decimal precision. */
  var third = (n + 1) / d < 1
    ? { t: fmt((n + 1) / d, 3), fb: "That is the next fraction up. Divide " + n + " by " + d + " exactly." }
    : { t: fmt(v + 0.1 < 1 ? v + 0.1 : v - 0.1, 3), fb: "That is a tenth away from the fraction's value. Divide " + n + " by " + d + " exactly." };
  var ds = [
    { t: fmt(v / 10, 3), fb: "That is ten times too small: the decimal point has moved one place too far." },
    { t: "0." + n + d, fb: "That just writes the numerator and the denominator after the point. Divide the numerator by the denominator instead." },
    third
  ];
  return mcq("Write " + u5M(n, d) + " as a decimal.",
    { t: key, fb: "Correct: " + n + " divided by " + d + " is " + key + "." },
    ds,
    "A fraction is a division: \\(" + n + " \\div " + d + " = " + key + "\\). The answer is <b>" + key + "</b>.",
    { n: n, d: d, key: key });
}, ["A fraction bar means divide: numerator divided by denominator.", "Think of the denominator as splitting 1 into equal parts."]);

E("u3-pk-fad-to-fraction", 3, ["3.8"], 1, "gen", function () {
  var ab = pick([15, 25, 35, 45, 55, 65, 75, 85, 95, 20, 40, 60, 80, 30, 70, 90, 12, 18, 24, 36, 48]);
  var key = u5M(ab, 100);
  return mcq("Write 0." + ab + " as a fraction in lowest terms.",
    { t: key, fb: "Correct: 0." + ab + " is " + ab + " hundredths, and " + pk7eqf(ab, 100) + " reduces to " + key + "." },
    [{ t: pk7eqf(ab, 10), fb: "That reads the decimal as tenths. Two decimal places means hundredths: write it over 100." },
     { t: pk7eqf(ab, 1000), fb: "That reads the decimal as thousandths. Two decimal places means hundredths: write it over 100." },
     { t: pk7eqf(u5red(ab, 100)[1], u5red(ab, 100)[0]), fb: "That turns the fraction upside down. The decimal is less than 1, so the fraction must be less than 1 too." }],
    "Two decimal places are hundredths: \\(0." + ab + " = " + FR(ab, 100) + "\\), which reduces to <b>" + key + "</b>.",
    { ab: ab, key: key });
}, ["Count the decimal places: two places means hundredths.", "Write the digits over 100, then reduce."]);

E("u3-pk-fad-match", 3, ["3.8"], 2, "gen", function () {
  /* Each triple carries a wrong decimal at one decimal place and
     one at two, and distractors are shown at the KEY's precision,
     so the key is never the only option at its decimal precision. */
  var triples = [
    { n: 3, d: 4, dec: "0.75", wrong1: "0.7", wf1: "7/10", wrong2: "0.34", wf2: "17/50" },
    { n: 1, d: 2, dec: "0.5", wrong1: "0.2", wf1: "1/5", wrong2: "0.25", wf2: "1/4" },
    { n: 2, d: 5, dec: "0.4", wrong1: "0.2", wf1: "1/5", wrong2: "0.25", wf2: "1/4" },
    { n: 3, d: 10, dec: "0.3", wrong1: "0.7", wf1: "7/10", wrong2: "0.03", wf2: "3/100" },
    { n: 4, d: 5, dec: "0.8", wrong1: "0.4", wf1: "2/5", wrong2: "0.45", wf2: "9/20" },
    { n: 1, d: 4, dec: "0.25", wrong1: "0.2", wf1: "1/5", wrong2: "0.14", wf2: "7/50" },
    { n: 7, d: 10, dec: "0.7", wrong1: "0.3", wf1: "3/10", wrong2: "0.17", wf2: "17/100" }
  ];
  var pool = triples.slice(), chosen = [], guard = 0;
  while (chosen.length < 4 && guard++ < 200) { var t = pool.splice(ri(0, pool.length - 1), 1)[0]; chosen.push(t); }
  var keyT = chosen[0];
  var keyDp = keyT.dec.split(".")[1].length;
  var opts = chosen.map(function (t, i) {
    if (i === 0) return { t: pk7eqf(t.n, t.d) + " and " + t.dec, fb: "Correct: " + t.n + " divided by " + t.d + " is " + t.dec + "." };
    var w = keyDp === 1 ? t.wrong1 : t.wrong2, wf = keyDp === 1 ? t.wf1 : t.wf2;
    return { t: pk7eqf(t.n, t.d) + " and " + w, fb: w + " is " + wf + ", not " + u5M(t.n, t.d) + ". Divide the numerator by the denominator to check." };
  });
  return mcq("Which pair is equal?",
    opts[0], opts.slice(1),
    "Divide each numerator by its denominator: only " + pk7eqf(keyT.n, keyT.d) + " = " + keyT.dec + ". The answer is <b>" + pk7eqf(keyT.n, keyT.d) + " and " + keyT.dec + "</b>.",
    { key: keyT.n + "/" + keyT.d });
}, ["Check each pair by dividing the numerator by the denominator.", "Three of the pairs mix a fraction with the wrong decimal."]);

E("u3-pk-fad-line", 3, ["3.8"], 2, "gen", function () {
  function s2(x) { return x.toFixed(2); }
  var v = pick([0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85]);
  var q = mcq("What decimal does the marker show on the number line?",
    { t: s2(v), fb: "Correct: each small tick is 0.05, and the marker sits at " + s2(v) + "." },
    [{ t: s2(v - 0.1), fb: "That is one big tick (0.1) too low. Count the small ticks from 0: each is worth 0.05." },
     { t: s2(v + 0.1), fb: "That is one big tick (0.1) too high. Count the small ticks from 0: each is worth 0.05." },
     { t: s2(v + 0.05), fb: "That is one small tick too far. The marker is on the tick just before that." }],
    "The line runs from 0 to 1 with small ticks every 0.05. Counting ticks to the marker gives <b>" + s2(v) + "</b>.",
    { v: s2(v) });
  q.figure = pk7decLine(v);
  return q;
}, ["Work out what one small tick is worth first.", "Count ticks from 0 to the marker and multiply."]);

/* ================= Cluster 7-C7 top-ups =================
   Cluster 7-C7's support set (the six Unit 3 decimal entries)
   is flagged in PKT7_P3. The authored top-ups below complete
   the cluster.

   ESTIMATION (estimation, Unit 3, 4 entries, all authored):
   round first, then compute, for sums, differences, products
   and money. Grounding: MA5.5.26 (front-end and rounding
   strategies); MA4.4.2. Supports (pkFor): 6.1, 6.2, 6.3. */

E("u3-pk-est-add", 3, ["6.1"], 1, "gen", function () {
  function r10(x) { return Math.round(x / 10) * 10; }
  function f10(x) { return Math.floor(x / 10) * 10; }
  var a, b, key, exact, fl, guard = 0, okSet = false;
  do {
    a = ri(35, 88); b = ri(24, 76);
    key = r10(a) + r10(b); exact = a + b; fl = f10(a) + f10(b);
    var vals = [key, exact, fl, key + 10];
    okSet = (a % 10 !== 0 && b % 10 !== 0) && vals.every(function (v, i) { return vals.indexOf(v) === i; });
  } while (!okSet && guard++ < 300);
  if (!okSet) { a = 47; b = 38; key = 90; exact = 85; fl = 80; }
  return mcq("Estimate " + a + " + " + b + " by rounding each number to the nearest ten.",
    { t: String(key), fb: "Correct: " + a + " rounds to " + r10(a) + " and " + b + " rounds to " + r10(b) + ", and " + r10(a) + " + " + r10(b) + " = " + key + "." },
    [{ t: String(exact), fb: "That is the exact answer. An estimate rounds first, then adds." },
     { t: String(fl), fb: "That rounds both numbers down. Round each to the NEAREST ten instead." },
     { t: String(key + 10), fb: "That is 10 too high. Check the two rounded numbers before adding." }],
    "Round first: \\(" + a + " \\approx " + r10(a) + "\\) and \\(" + b + " \\approx " + r10(b) + "\\). Then \\(" + r10(a) + " + " + r10(b) + " = " + key + "\\). The answer is <b>" + key + "</b>.",
    { a: a, b: b, key: key });
}, ["Round each number before you add.", "Nearest ten: ones digit 5 or more rounds up."]);

E("u3-pk-est-product", 3, ["6.1"], 2, "gen", function () {
  function r10(x) { return Math.round(x / 10) * 10; }
  function f10(x) { return Math.floor(x / 10) * 10; }
  var n = ri(12, 29), m = ri(3, 9), guard = 0;
  while ((n % 10 === 0 || n % 10 === 5) && guard++ < 60) { n = ri(12, 29); }
  var key = r10(n) * m;
  var cand = [
    { val: n * m, fb: "That is the exact product. An estimate rounds " + n + " first, then multiplies." },
    { val: f10(n) * m, fb: "That rounds " + n + " down to " + f10(n) + ". Round to the NEAREST ten, which is " + r10(n) + "." },
    { val: (f10(n) + 10) * m, fb: "That rounds " + n + " up to " + (f10(n) + 10) + ". Its nearest ten is " + r10(n) + "." },
    { val: key + r10(n), fb: "That multiplies correctly and then adds an extra group of " + r10(n) + "." },
    { val: key - r10(n), fb: "That multiplies correctly and then leaves out a group of " + r10(n) + "." }
  ];
  var seen = {}; seen[String(key)] = 1;
  var ds = [];
  cand.forEach(function (cd) { var s = String(cd.val); if (!seen[s] && ds.length < 3) { seen[s] = 1; ds.push({ t: s, fb: cd.fb }); } });
  return mcq("Estimate " + n + " x " + m + " by rounding " + n + " to the nearest ten.",
    { t: String(key), fb: "Correct: " + n + " rounds to " + r10(n) + ", and " + r10(n) + " x " + m + " = " + key + "." },
    ds,
    "Round first: \\(" + n + " \\approx " + r10(n) + "\\). Then \\(" + r10(n) + " \\times " + m + " = " + key + "\\). The answer is <b>" + key + "</b>.",
    { n: n, m: m, key: key });
}, ["Round the two-digit number to the nearest ten first.", "Then multiply the rounded number."]);

E("u3-pk-est-difference", 3, ["6.1"], 1, "gen", function () {
  function r10(x) { return Math.round(x / 10) * 10; }
  function f10(x) { return Math.floor(x / 10) * 10; }
  var a, b, key, exact, fl, guard = 0, okSet = false;
  do {
    a = ri(52, 98); b = ri(23, 67);
    key = r10(a) - r10(b); exact = a - b; fl = f10(a) - f10(b);
    var vals = [key, exact, fl, key + 10];
    okSet = a - b > 20 && vals.every(function (v, i) { return vals.indexOf(v) === i; });
  } while (!okSet && guard++ < 300);
  if (!okSet) { a = 87; b = 34; key = 60; exact = 53; fl = 50; }
  return mcq("Estimate " + a + " - " + b + " by rounding each number to the nearest ten.",
    { t: String(key), fb: "Correct: " + a + " rounds to " + r10(a) + " and " + b + " rounds to " + r10(b) + ", and " + r10(a) + " - " + r10(b) + " = " + key + "." },
    [{ t: String(exact), fb: "That is the exact answer. An estimate rounds first, then subtracts." },
     { t: String(fl), fb: "That rounds both numbers down. Round each to the NEAREST ten instead." },
     { t: String(key + 10), fb: "That is 10 too high. Check the two rounded numbers before subtracting." }],
    "Round first: \\(" + a + " \\approx " + r10(a) + "\\) and \\(" + b + " \\approx " + r10(b) + "\\). Then \\(" + r10(a) + " - " + r10(b) + " = " + key + "\\). The answer is <b>" + key + "</b>.",
    { a: a, b: b, key: key });
}, ["Round each number before you subtract.", "Nearest ten: ones digit 5 or more rounds up."]);

E("u3-pk-est-money", 3, ["6.1"], 2, "gen", function () {
  var cents = [0.15, 0.35, 0.49, 0.55, 0.75, 0.90, 0.95];
  function money(x) { return "$" + x.toFixed(2).replace(/\.00$/, ""); }
  var prices, key, fl, exact, guard = 0, okSet = false;
  do {
    prices = [0, 1, 2].map(function () { return ri(2, 8) + pick(cents); });
    if (!prices.some(function (p) { return p % 1 >= 0.5; })) prices[0] = Math.floor(prices[0]) + 0.75;
    key = prices.reduce(function (s, p) { return s + Math.round(p); }, 0);
    fl = prices.reduce(function (s, p) { return s + Math.floor(p); }, 0);
    exact = prices.reduce(function (s, p) { return s + p; }, 0);
    var disp = ["$" + key, "$" + fl, money(exact), "$" + (key + 1)];
    okSet = disp.every(function (v, i) { return disp.indexOf(v) === i; });
  } while (!okSet && guard++ < 300);
  if (!okSet) { prices = [2.75, 3.49, 4.90]; key = 11; fl = 9; exact = 11.14; }
  var ds = [
    { t: money(exact), fb: "That is the exact total. An estimate rounds each price to the nearest dollar first." },
    { t: "$" + fl, fb: "That rounds every price down. Round each to the NEAREST dollar instead." },
    { t: "$" + (key + 1), fb: "That is a dollar too high. Check each price's nearest dollar before adding." }
  ];
  return mcq("Three items cost " + prices.map(money).join(", ") + ". About how much do they cost in total?",
    { t: "$" + key, fb: "Correct: the prices round to " + prices.map(function (p) { return "$" + Math.round(p); }).join(", ") + ", which add to $" + key + "." },
    ds,
    "Round each price to the nearest dollar: " + prices.map(function (p) { return money(p) + " is about $" + Math.round(p); }).join(", ") + ". The total is about <b>$" + key + "</b>.",
    { prices: prices.map(money), key: key });
}, ["Round each price to the nearest dollar first.", "Then add the rounded prices."]);

/* PERCENT AS PART OF 100 (percent-base, Unit 3, 4 entries, all
   authored, two of them figure-bearing on hundred grids):
   percent means out of 100, read from a hundredths grid and
   converted from simple fractions and decimals. Grounding:
   MA6.3.8 to MA6.3.13 (first exposure to percent; the hundredths
   grid at MA6.3.11 and MA6.3.12). Supports (pkFor): 3.7, 6.11,
   6.12. Percent of a quantity is not built anywhere in this
   piece (specification Section 13, Decision 1). */

E("u3-pk-pct-grid", 3, ["3.7"], 1, "gen", function () {
  var n = pick([15, 20, 25, 30, 35, 40, 45, 55, 60, 65, 70, 75, 80, 85]);
  var cand = [n - 10, n + 10, 100 - n, n - 20, n + 20];
  var seen = {}; seen[n] = 1;
  var ds = [];
  cand.forEach(function (v) { if (v > 0 && v < 100 && !seen[v] && ds.length < 3) { seen[v] = 1; ds.push({ t: v + "%", fb: "Count the shaded squares again: the grid has 100 squares in all." }); } });
  var q = mcq("The hundred grid has some squares shaded. What percent of the grid is shaded?",
    { t: n + "%", fb: "Correct: " + n + " of the 100 squares are shaded, and percent means out of 100." },
    ds,
    "The grid holds 100 squares and " + n + " are shaded. Percent means out of 100, so the shaded part is <b>" + n + "%</b>.",
    { n: n });
  q.figure = pk7hundred(n);
  return q;
}, ["The whole grid is 100 squares: that is the whole.", "Count the shaded squares; that count is the percent."]);

E("u3-pk-pct-pick", 3, ["3.7"], 2, "gen", function () {
  var P = pick([25, 35, 45, 60, 70, 80]);
  var counts = [P, P - 10, P + 10, 100 - P], i;
  for (i = 3; i > 0; i--) { var j = ri(0, i), tmp = counts[i]; counts[i] = counts[j]; counts[j] = tmp; }
  var idx = counts.indexOf(P);
  var labs = ["A", "B", "C", "D"];
  var q = mcq("Which grid shows " + P + "% shaded?",
    { t: "Grid " + labs[idx], fb: "Correct: that grid has " + P + " of its 100 squares shaded." },
    counts.map(function (c, k) { return k; }).filter(function (k) { return k !== idx; }).map(function (k) { return { t: "Grid " + labs[k], fb: "That grid has " + counts[k] + " squares shaded, which is " + counts[k] + "%." }; }),
    "Percent means out of 100, so " + P + "% needs " + P + " of the 100 squares shaded: that is <b>grid " + labs[idx] + "</b>.",
    { counts: counts, idx: idx, P: P });
  q.figure = pk7hundredPick(counts);
  return q;
}, ["The percent is the count of shaded squares out of 100.", "Count the shaded squares in each grid."]);

E("u3-pk-pct-fraction", 3, ["3.7"], 1, "gen", function () {
  var pairs = [[1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [3, 10], [7, 10], [9, 10], [7, 20], [9, 20], [3, 20]];
  var pr = pick(pairs), n = pr[0], d = pr[1], pct = n * 100 / d;
  var cand = [
    { t: n + "%", fb: "That is just the numerator. Percent compares the part to 100, not to " + d + "." },
    { t: d + "%", fb: "That is just the denominator. Work out how many hundredths the fraction is worth." },
    { t: (100 - pct) + "%", fb: "That is the percent NOT shaded by the fraction: it is the complement of the answer." },
    { t: (pct + 10) + "%", fb: "That is 10 too high. Scale the fraction up to a denominator of 100." }
  ];
  var seen = {}; seen[pct + "%"] = 1;
  var ds = [];
  cand.forEach(function (cd) { if (!seen[cd.t] && ds.length < 3) { seen[cd.t] = 1; ds.push(cd); } });
  return mcq("Write " + u5M(n, d) + " as a percent.",
    { t: pct + "%", fb: "Correct: " + u5M(n, d) + " is " + pct + " out of 100." },
    ds,
    "Scale the fraction to a denominator of 100: \\(" + FR(n, d) + " = " + FR(pct, 100) + "\\), and " + pct + " out of 100 is <b>" + pct + "%</b>.",
    { n: n, d: d, pct: pct });
}, ["Percent means out of 100: give the fraction a denominator of 100.", "Multiply the top and the bottom by the same number to reach 100."]);

E("u3-pk-pct-decimal", 3, ["3.7"], 2, "gen", function () {
  var v = pick([0.07, 0.15, 0.3, 0.45, 0.62, 0.8, 0.95, 0.04, 0.55, 0.71]);
  var pct = Math.round(v * 100);
  return mcq("Write " + fmt(v, 2) + " as a percent.",
    { t: pct + "%", fb: "Correct: multiply by 100 (move the decimal point two places right): " + fmt(v, 2) + " is " + pct + "%." },
    [{ t: fmt(v * 10, 1) + "%", fb: "That moves the point only one place. Percent needs two places: multiply by 100." },
     { t: fmt(v, 2) + "%", fb: "That just adds the % sign. The number itself must be multiplied by 100." },
     { t: (pct * 10) + "%", fb: "That moves the point three places. Percent needs exactly two: multiply by 100." }],
    "To change a decimal to a percent, multiply by 100: \\(" + fmt(v, 2) + " \\times 100 = " + pct + "\\). The answer is <b>" + pct + "%</b>.",
    { v: fmt(v, 2), pct: pct });
}, ["Percent means out of 100, so multiply the decimal by 100.", "Multiplying by 100 moves the decimal point two places right."]);

/* ================= Cluster 7-C10 =================
   PROTRACTOR (protractor, Unit 4, 5 entries, all authored, all
   figure-bearing): read an angle's measure from a drawn
   protractor, on either scale. Grounding: MA6.9.13 and MA6.9.14
   (protractor use). Supports (pkFor): 11.1 to 11.5, 9.13. Three
   of the five generators are shared with Unit 8 for cluster
   7-C14. The figures use a semicircular protractor scale; the
   Grade 6 guide's recommendation of a circular protractor for
   first teaching is a teaching-sequence note, and the reading
   skill is the same on the semicircular tool students meet from
   Grade 7 on. */

function pk7ptOpts(deg, step) {
  return [
    { t: (deg - step) + "°", fb: "That is one scale step too low. Read where the slanted ray crosses the scale." },
    { t: (deg + step) + "°", fb: "That is one scale step too high. Read where the slanted ray crosses the scale." },
    { t: (180 - deg) + "°", fb: "That is the reading from the wrong zero: it is the supplement of the angle. Start from the zero on the side of the flat ray." }
  ];
}

function pk7ptAcuteGen() {
  var deg = pick([20, 30, 40, 50, 60, 70, 80]);
  var q = mcq("What is the measure of the angle shown?",
    { t: deg + "°", fb: "Correct: starting from the zero on the right, the slanted ray crosses the scale at " + deg + "°." },
    pk7ptOpts(deg, 10),
    "Place the zero of the scale on the flat ray and read where the slanted ray crosses: <b>" + deg + "°</b>.",
    { deg: deg });
  q.figure = pk7protractor(deg, false);
  return q;
}

function pk7ptObtuseGen() {
  var deg = pick([100, 110, 120, 130, 140, 150, 160]);
  var q = mcq("What is the measure of the angle shown?",
    { t: deg + "°", fb: "Correct: starting from the zero on the right, the slanted ray crosses the scale at " + deg + "°." },
    pk7ptOpts(deg, 10),
    "Place the zero of the scale on the flat ray and read where the slanted ray crosses: <b>" + deg + "°</b>.",
    { deg: deg });
  q.figure = pk7protractor(deg, false);
  return q;
}

function pk7ptFiveGen() {
  var deg = pick([25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145, 155]);
  var q = mcq("What is the measure of the angle shown?",
    { t: deg + "°", fb: "Correct: the slanted ray crosses the scale at " + deg + "°, halfway between two numbered marks." },
    pk7ptOpts(deg, 5),
    "The numbered marks are 10° apart and the small marks are 5°. The slanted ray crosses at <b>" + deg + "°</b>.",
    { deg: deg });
  q.figure = pk7protractor(deg, false);
  return q;
}

E("u4-pk-protractor-acute", 4, ["11.1"], 1, "gen", pk7ptAcuteGen,
  ["Start from the zero on the same side as the flat ray.", "Follow the slanted ray out to the scale and read the number there."]);

E("u4-pk-protractor-obtuse", 4, ["11.1"], 1, "gen", pk7ptObtuseGen,
  ["An obtuse angle measures more than 90°: use the scale that starts at the flat ray's zero.", "Follow the slanted ray out to the scale and read the number there."]);

E("u4-pk-protractor-five", 4, ["11.1"], 2, "gen", pk7ptFiveGen,
  ["The small marks between the numbers are worth 5° each.", "Read the numbered mark before the ray, then add the small steps."]);

E("u4-pk-protractor-left", 4, ["11.1"], 2, "gen", function () {
  var deg = pick([30, 40, 50, 60, 70, 80, 100, 110, 120, 130, 140, 150]);
  var q = mcq("What is the measure of the angle shown?",
    { t: deg + "°", fb: "Correct: this protractor's zero is on the left, where the flat ray points, and the slanted ray crosses at " + deg + "°." },
    pk7ptOpts(deg, 10),
    "The flat ray points left, so read the scale that starts at the left zero: the slanted ray crosses at <b>" + deg + "°</b>.",
    { deg: deg, mirror: true });
  q.figure = pk7protractor(deg, true);
  return q;
}, ["Find the zero on the side the flat ray points to.", "A protractor carries two scales: use the one starting at that zero."]);

E("u4-pk-protractor-supplement", 4, ["11.1"], 2, "gen", function () {
  var deg = pick([110, 120, 130, 140, 150, 160]);
  var key = 180 - deg;
  var q = mcq("The angle shown is on a straight line with its supplement. What is the measure of the supplement?",
    { t: key + "°", fb: "Correct: the angle shown measures " + deg + "°, and angles on a straight line add to 180°: 180 - " + deg + " = " + key + "." },
    [{ t: deg + "°", fb: "That is the measure of the angle shown itself. The supplement is what must be added to reach 180°." },
     { t: (key + 10) + "°", fb: "That is 10 too high. Read the shown angle again, then subtract it from 180." },
     { t: (key - 10) + "°", fb: "That is 10 too low. Read the shown angle again, then subtract it from 180." }],
    "Read the shown angle from the protractor: " + deg + "°. Angles on a straight line add to 180°, so the supplement is \\(180 - " + deg + " = " + key + "\\)°. The answer is <b>" + key + "°</b>.",
    { deg: deg, key: key });
  q.figure = pk7protractor(deg, false);
  return q;
}, ["First read the angle that is shown.", "Supplementary angles add to 180°: subtract."]);

/* ANGLE FACTS, Unit 4 part (angle-facts, Unit 4, 2 entries, both
   authored, Level 1 only, per the specification): the full turn
   is 360 degrees. Grounding: MA6.9.1, MA6.9.2, MA6.9.11,
   MA6.9.12. Supports (pkFor): 9.13, 11.2. */

E("u4-pk-angle-full-turn", 4, ["9.13"], 1, "gen", function () {
  var ctx = pick([
    "A clock's minute hand makes one full turn in an hour.",
    "A figure skater spins through one full turn.",
    "A windmill blade turns through one full turn."
  ]);
  return mcq(ctx + " How many degrees are in one full turn?",
    { t: "360°", fb: "Correct: a full turn brings a ray back to its start, and a full turn measures 360°." },
    [{ t: "180°", fb: "That is a half turn: a straight angle. A full turn is twice that." },
     { t: "90°", fb: "That is a quarter turn: a right angle. A full turn is four of those." },
     { t: "270°", fb: "That is a three-quarter turn. One more quarter turn completes the full turn." }],
    "A full turn is made of 4 right angles: \\(4 \\times 90° = 360°\\). The answer is <b>360°</b>.",
    { ctx: ctx });
}, ["Build the full turn from right angles.", "A right angle is a quarter of a full turn."]);

E("u4-pk-angle-right-count", 4, ["9.13"], 1, "gen", function () {
  var full = Math.random() < 0.5;
  var key = full ? 4 : 2;
  var ds = pk7uniq(key, [1, 2, 3, 4]).slice(0, 3);
  return mcq("How many right angles make " + (full ? "one full turn" : "one straight angle") + "?",
    { t: String(key), fb: "Correct: " + (full ? "a full turn is 360°, and 360 divided by 90 is 4." : "a straight angle is 180°, and 180 divided by 90 is 2.") },
    ds.map(function (d) { return { t: String(d), fb: "A right angle is 90°. Divide the " + (full ? "full turn's 360°" : "straight angle's 180°") + " by 90°." }; }),
    (full ? "A full turn is 360° and each right angle is 90°: \\(360 \\div 90 = 4\\)." : "A straight angle is 180° and each right angle is 90°: \\(180 \\div 90 = 2\\).") + " The answer is <b>" + key + "</b>.",
    { full: full, key: key });
}, ["Turn the question into a division: the big angle divided by 90°.", "A straight angle is 180°; a full turn is 360°."]);

/* ================= Cluster 7-C11 top-up and copies =========
   MIXED NUMBERS AND IMPROPER FRACTIONS (mixed-improper, Unit 5,
   4 entries, all authored): convert between the two forms.
   Grounding: MA6.3.6 and MA6.3.7 (mixed numbers introduced from
   improper fractions, and the conversion between them). Supports
   (pkFor): 6.20, 6.21, 6.13 to 6.23. The cluster's two support
   sets are flagged in PKT7_P3, and the three equivalent-fraction
   copies below are shared from the 7-C6 group in Unit 3 (pkFor
   6.16). */

E("u5-pk-mixed-from-improper", 5, ["6.20"], 1, "gen", function () {
  var d, w, r, guard = 0;
  do {
    d = ri(3, 9); w = ri(1, 4); r = ri(1, d - 1);
  } while ((2 * r === d || 2 * r + 1 === d) && guard++ < 120);
  if (2 * r === d || 2 * r + 1 === d) { d = 5; w = 2; r = 1; }
  var N = w * d + r;
  return mcq("Write " + pk7eqf(N, d) + " as a mixed number.",
    { t: u5M(N, d), fb: "Correct: " + N + " divided by " + d + " is " + w + " with remainder " + r + ", giving " + w + " wholes and " + u5M(r, d) + " left over." },
    [{ t: u5M(N + 1, d), fb: "That counts one part too many: the remainder of " + N + " divided by " + d + " is " + r + ", not " + (r + 1) + "." },
     { t: u5M(w * d + (d - r), d), fb: "That uses the parts NOT taken as the remainder. The remainder of " + N + " divided by " + d + " is " + r + "." },
     { t: u5M(r, d), fb: "That drops the whole-number part. " + N + " parts of size " + d + " make " + w + " full wholes as well." }],
    "Divide: \\(" + N + " \\div " + d + " = " + w + "\\) remainder " + r + ". So " + pk7eqf(N, d) + " is <b>" + u5M(N, d) + "</b>.",
    { N: N, d: d, w: w, r: r });
}, ["Divide the numerator by the denominator: the quotient is the whole-number part.", "The remainder goes over the same denominator."]);

E("u5-pk-mixed-to-improper", 5, ["6.20"], 1, "gen", function () {
  var d = ri(3, 9), w = ri(2, 4), r = ri(1, d - 1);
  var N = w * d + r;
  var ds = pk7uniq(N, [w + r, w * d, Number(String(w) + String(r))]).slice(0, 3);
  return mcq("Write " + u5M(N, d) + " as an improper fraction. What is its numerator?",
    { t: String(N), fb: "Correct: " + w + " wholes are " + (w * d) + " parts of size " + d + ", plus " + r + " more makes " + N + "." },
    ds.map(function (x) { return { t: String(x), fb: x === w * d ? "That counts only the whole-number part. Add the " + r + " extra parts as well." : "Multiply the whole number by the denominator, then add the numerator: " + w + " x " + d + " + " + r + "." }; }),
    "Multiply and add: \\(" + w + " \\times " + d + " + " + r + " = " + N + "\\), over the same denominator " + d + ". The numerator is <b>" + N + "</b>.",
    { N: N, d: d, w: w, r: r });
}, ["Each whole is worth a full denominator of parts.", "Multiply the whole by the denominator, then add the leftover parts."]);

E("u5-pk-mixed-slices", 5, ["6.20"], 2, "gen", function () {
  var d = pick([4, 6, 8]), w = ri(2, 3), r = ri(1, d - 1), guard = 0;
  while ((2 * r === d || 2 * r + 1 === d) && guard++ < 120) { r = ri(1, d - 1); }
  if (2 * r === d || 2 * r + 1 === d) r = 1;
  var N = w * d + r;
  return mcq("Pizzas are cut into " + d + " equal slices. A class eats " + N + " slices. How many pizzas did the class eat, as a mixed number?",
    { t: u5M(N, d), fb: "Correct: " + N + " slices make " + w + " whole pizzas (" + (w * d) + " slices) with " + r + " slices left over." },
    [{ t: u5M(N + 1, d), fb: "That counts one slice too many: " + N + " slices group into " + w + " full pizzas with " + r + " slices left." },
     { t: u5M(w * d + (d - r), d), fb: "That uses the slices NOT eaten from the last pizza as the leftover. The leftover is the " + r + " slices past " + (w * d) + "." },
     { t: u5M(r, d), fb: "That drops the whole pizzas. " + N + " slices include " + w + " whole pizzas as well." }],
    "Group the slices: \\(" + N + " \\div " + d + " = " + w + "\\) remainder " + r + ", so the class ate <b>" + u5M(N, d) + "</b> pizzas.",
    { N: N, d: d, w: w, r: r });
}, ["Group the slices into whole pizzas first.", "The slices left over form the fraction part."]);

E("u5-pk-mixed-which", 5, ["6.20"], 2, "gen", function () {
  var d = ri(3, 9), w = ri(2, 4), r = ri(1, d - 1);
  var N = w * d + r;
  return mcq("Which improper fraction equals " + u5M(N, d) + "?",
    { t: pk7eqf(N, d), fb: "Correct: " + w + " x " + d + " + " + r + " = " + N + " parts of size " + d + "." },
    [{ t: pk7eqf(w * d, d), fb: "That counts only the " + w + " wholes. The extra " + r + " parts must be added too." },
     { t: pk7eqf(w + r, d), fb: "That adds the whole number and the numerator. Multiply the whole number by " + d + " first." },
     { t: pk7eqf(Number(String(w) + String(r)), d), fb: "That writes the whole number and the numerator side by side. Multiply " + w + " by " + d + ", then add " + r + "." }],
    "Multiply and add: \\(" + w + " \\times " + d + " + " + r + " = " + N + "\\), so the equal fraction is <b>" + pk7eqf(N, d) + "</b>.",
    { N: N, d: d, w: w, r: r });
}, ["Convert the whole-number part into parts of the same size.", "Then add the fraction part's parts."]);

/* Shared copies for cluster 7-C11: the three equivalent-fraction
   generators of cluster 7-C6, housed in Unit 5 with pkFor 6.16
   (common denominators run on equivalent fractions). The copies
   call the same generator functions as the Unit 3 originals. */

E("u5-pk-equiv-recognize", 5, ["6.16"], 1, "gen", pk7eqRecognizeGen,
  ["Look for the choice made by multiplying the top and the bottom by the same number.", "Adding the same number to the top and the bottom does not make an equivalent fraction."]);

E("u5-pk-equiv-target", 5, ["6.16"], 2, "gen", pk7eqTargetGen,
  ["Find what the denominator was multiplied by to reach the target denominator.", "Multiply the numerator by that same number."]);

E("u5-pk-equiv-divide", 5, ["6.16"], 2, "gen", pk7eqDivideGen,
  ["Do the same division to the top and the bottom.", "Dividing both parts by the same number keeps the fraction's value."]);

/* ================= Cluster 7-C13 top-ups =================
   Cluster 7-C13's support entry (u7-prob-basic) is flagged in
   PKT7_P3. The authored entries below complete the cluster.

   PROBABILITY OF A SINGLE EVENT (single-event-probability,
   Unit 7, 5 entries, all authored): favourable outcomes over
   possible outcomes, as a fraction and as a percent, on bags,
   spinners and a die. Grounding: MA6.12.2 and MA6.12.3, with the
   percent forms on MA6.3.8. Supports (pkFor): 12.1 to 12.7. */

E("u7-pk-prob-bag", 7, ["12.1"], 1, "gen", function () {
  var counts = { red: ri(2, 6), blue: ri(2, 6), green: ri(1, 5) };
  var total = counts.red + counts.blue + counts.green;
  var colour = pick(["red", "blue", "green"]), f = counts[colour], guard = 0;
  while (f === total - f && guard++ < 60) { counts.green++; total++; f = counts[colour]; }
  var key = u7fracStr(f, total);
  var ds = [
    { t: u7fracStr(f, total - f), fb: "That compares " + colour + " counters to the counters that are NOT " + colour + ". Probability compares to ALL the counters." },
    { t: u7fracStr(total - f, total), fb: "That is the probability of NOT drawing a " + colour + " counter. Count the " + colour + " ones for the top." },
    { t: u7fracStr(total, f), fb: "That is upside down: the favourable count goes on top, the total count on the bottom." }
  ];
  return mcq("A bag holds " + counts.red + " red, " + counts.blue + " blue and " + counts.green + " green counters. One counter is drawn without looking. What is the probability that it is " + colour + "?",
    { t: key, fb: "Correct: " + f + " of the " + total + " counters are " + colour + "." },
    ds,
    "Probability is favourable outcomes over possible outcomes: \\(" + f + "\\) " + colour + " counters out of " + total + " in all gives <b>" + key + "</b>.",
    { counts: counts, colour: colour, key: key });
}, ["The bottom of the fraction is the total number of counters.", "The top is the number of counters of the colour named."]);

E("u7-pk-prob-percent-bag", 7, ["12.1"], 2, "gen", function () {
  var r = pick([3, 5, 7, 9, 11, 13]);
  var rest = 20 - r, b = ri(2, rest - 2), g = rest - b;
  var key = r * 5;
  return mcq("A bag holds 20 counters: " + r + " are red, " + b + " are blue and " + g + " are green. One counter is drawn without looking. What is the probability that it is red, as a percent?",
    { t: key + "%", fb: "Correct: " + r + " out of 20 is " + r + "/20, which scales to " + key + " out of 100." },
    [{ t: r + "%", fb: "That is just the count of red counters. Out of 20, scale up to out of 100: multiply by 5." },
     { t: (100 - key) + "%", fb: "That is the probability of NOT drawing red. The question asks for red." },
     { t: (key + 10 === 100 - key ? key - 10 : key + 10) + "%", fb: "That does not match the count: there are " + r + " red counters out of 20, and " + r + "/20 scales to " + key + " out of 100." }],
    "As a fraction the probability is \\(" + FR(r, 20) + "\\). Scaling to a denominator of 100 gives " + key + " out of 100, which is <b>" + key + "%</b>.",
    { r: r, key: key });
}, ["First write the probability as a fraction out of 20.", "Then scale the fraction to out of 100."]);

E("u7-pk-prob-words", 7, ["12.1"], 1, "gen", function () {
  var certain = Math.random() < 0.5;
  var words = ["certain", "impossible", "likely", "unlikely"];
  var key = certain ? "certain" : "impossible";
  return mcq("An event has a probability of " + (certain ? "1" : "0") + ". Which word describes the event?",
    { t: key, fb: certain ? "Correct: a probability of 1 means the event is sure to happen." : "Correct: a probability of 0 means the event cannot happen." },
    words.filter(function (w) { return w !== key; }).map(function (w) { return { t: w, fb: certain ? "A probability of 1 is the top of the scale: the event is sure to happen, not just " + w + "." : "A probability of 0 is the bottom of the scale: the event cannot happen at all." }; }),
    "Probability runs from 0 (impossible) to 1 (certain). A probability of " + (certain ? "1" : "0") + " makes the event <b>" + key + "</b>.",
    { certain: certain });
}, ["The probability scale runs from 0 to 1.", "The ends of the scale have their own words: 0 is impossible, 1 is certain."]);

E("u7-pk-prob-spinner", 7, ["12.1"], 2, "gen", function () {
  var w = pick([2, 3, 4, 6, 7, 8]);
  var key = w * 10;
  var q = mcq("The spinner is spun once. What is the probability that it lands on Win, as a percent?",
    { t: key + "%", fb: "Correct: " + w + " of the 10 equal sections say Win, and " + w + "/10 is " + key + "%." },
    [{ t: w + "%", fb: "That is just the count of Win sections. Out of 10 sections, scale to out of 100." },
     { t: (100 - key) + "%", fb: "That is the probability of landing on Lose. The question asks for Win." },
     { t: (key + 10) + "%", fb: "That counts one Win section too many. Count the Win sections on the spinner." }],
    "Count the Win sections: " + w + " of 10 equal sections, so the probability is \\(" + FR(w, 10) + " = " + FR(key, 100) + "\\), which is <b>" + key + "%</b>.",
    { w: w, key: key });
  q.figure = pk7spinner(w, 10, "Win", "Lose");
  return q;
}, ["Count the sections that say Win, out of all the sections.", "A fraction out of 10 scales to a percent by multiplying by 10."]);

E("u7-pk-prob-die", 7, ["12.1"], 2, "gen", function () {
  var events = [
    { name: "an even number", fav: 3 },
    { name: "an odd number", fav: 3 },
    { name: "a number greater than 4", fav: 2 },
    { name: "a number less than 5", fav: 4 },
    { name: "a prime number", fav: 3 },
    { name: "a number greater than 2", fav: 4 },
    { name: "a multiple of 3", fav: 2 }
  ];
  var ev = pick(events), f = ev.fav;
  var key = u7fracStr(f, 6);
  var cand = [
    { t: u7fracStr(6 - f, 6), fb: "That counts the outcomes that do NOT fit the event. Count the ones that do." },
    { t: u7fracStr(1, 6), fb: "That is the probability of one single face. The event fits " + f + " faces." },
    { t: u7fracStr(f + 1, 6), fb: "That counts one face too many. List the faces that fit the event: there are " + f + "." },
    { t: u7fracStr(5, 6), fb: "That counts five faces. List the faces that fit the event: there are " + f + "." }
  ];
  var seen = {}; seen[key] = 1;
  var ds = [];
  cand.forEach(function (cd) { if (!seen[cd.t] && ds.length < 3) { seen[cd.t] = 1; ds.push(cd); } });
  return mcq("A fair six-sided die is rolled once. What is the probability of rolling " + ev.name + "?",
    { t: key, fb: "Correct: " + f + " of the 6 faces fit the event." },
    ds,
    "List the faces 1 to 6 and mark the ones that fit: " + f + " faces fit, out of 6 possible. The probability is <b>" + key + "</b>.",
    { event: ev.name, fav: f, key: key });
}, ["List all six faces and mark which ones fit the event.", "The probability is the fitting faces over 6."]);

/* LISTING OUTCOMES (listing-outcomes, Unit 7, 3 entries, all
   authored): count and complete the outcome lists for two-stage
   experiments. Grounding: MA6.12.1 (listing outcomes for simple
   experiments). Supports (pkFor): 12.4 to 12.7. This is not the
   fundamental counting principle and no host-course machinery is
   named: outcomes are listed and counted directly. */

E("u7-pk-list-count", 7, ["12.4"], 1, "gen", function () {
  var setups = [
    { text: "A coin is flipped and a six-sided die is rolled.", a: 2, b: 6, an: "2 coin sides", bn: "6 die faces" },
    { text: "A spinner with 4 equal sections is spun and a six-sided die is rolled.", a: 4, b: 6, an: "4 spinner sections", bn: "6 die faces" },
    { text: "A coin is flipped and a spinner with 4 equal sections is spun.", a: 2, b: 4, an: "2 coin sides", bn: "4 spinner sections" },
    { text: "A spinner with 3 equal sections is spun and a six-sided die is rolled.", a: 3, b: 6, an: "3 spinner sections", bn: "6 die faces" }
  ];
  var s = pick(setups), key = s.a * s.b;
  var ds = pk7uniq(key, [s.a + s.b, key + s.b, Math.max(s.a, s.b)]).slice(0, 3);
  return mcq(s.text + " How many possible outcomes are there in all?",
    { t: String(key), fb: "Correct: each of the " + s.an + " can pair with each of the " + s.bn + ": " + s.a + " x " + s.b + " = " + key + "." },
    ds.map(function (d) { return { t: String(d), fb: d === s.a + s.b ? "That adds the two counts. Every first result can pair with every second result, so multiply instead." : "List the pairs systematically: each first result pairs with all " + s.b + " second results." }; }),
    "Pair every first result with every second result: \\(" + s.a + " \\times " + s.b + " = " + key + "\\). The answer is <b>" + key + "</b>.",
    { a: s.a, b: s.b, key: key });
}, ["Fix one first result and list all its partners.", "Then multiply: first results times second results."]);

E("u7-pk-list-missing", 7, ["12.4"], 2, "gen", function () {
  if (Math.random() < 0.5) {
    var all = ["HH", "HT", "TH", "TT"], mi = pick([0, 3]);
    var missing = all[mi], listed = all.filter(function (x) { return x !== missing; });
    return mcq("Flipping a coin twice can give " + listed.join(", ") + " and one more outcome. What is the missing outcome?",
      { t: missing, fb: "Correct: the four outcomes are HH, HT, TH and TT, one for each pair of sides." },
      [{ t: listed[0], fb: "That outcome is already in the list. The missing one is a different pair." },
       { t: "H", fb: "That is only one flip. Each outcome of two flips has two letters." },
       { t: "TTT", fb: "That is three flips. Each outcome here has exactly two letters." }],
      "Two flips give the pairs HH, HT, TH, TT. The one not listed is <b>" + missing + "</b>.",
      { missing: missing });
  }
  var all2 = ["1H", "1T", "2H", "2T", "3H", "3T"], mi2 = ri(0, 5);
  var missing2 = all2[mi2], listed2 = all2.filter(function (x) { return x !== missing2; });
  return mcq("Spinning a 3-section spinner (1, 2, 3) and flipping a coin can give " + listed2.join(", ") + " and one more outcome. What is the missing outcome?",
    { t: missing2, fb: "Correct: every spinner number pairs with H and with T; " + missing2 + " is the pair not listed." },
    [{ t: listed2[0], fb: "That outcome is already in the list. Check each spinner number against both coin sides." },
     { t: "4H", fb: "The spinner has only 3 sections, so 4 cannot appear." },
     { t: "H" + missing2[0], fb: "That writes the pair backwards. In this list the spinner number comes first." }],
    "Pair each spinner number with H and with T: 1H, 1T, 2H, 2T, 3H, 3T. The one not listed is <b>" + missing2 + "</b>.",
    { missing: missing2 });
}, ["List the outcomes in a system: fix the first result and run through the second.", "Compare your list with the given list to spot the gap."]);

E("u7-pk-list-outfits", 7, ["12.4"], 2, "gen", function () {
  var setups = [
    { a: 3, b: 4, text: "Sam has 3 shirts and 4 pairs of pants. An outfit is one shirt and one pair of pants." },
    { a: 4, b: 5, text: "A cafe offers 4 soups and 5 sandwiches. A lunch is one soup and one sandwich." },
    { a: 5, b: 6, text: "A bakery sells 5 kinds of muffin and 6 kinds of cookie. A snack is one muffin and one cookie." },
    { a: 3, b: 5, text: "Mia has 3 scarves and 5 hats. An outfit is one scarf and one hat." },
    { a: 2, b: 6, text: "A game has 2 characters and 6 boards. A play is one character on one board." }
  ];
  var s = pick(setups), key = s.a * s.b;
  var ds = [s.a + s.b, Number(String(s.a) + String(s.b)), key + s.a + s.b];
  return mcq(s.text + " How many different combinations are there?",
    { t: String(key), fb: "Correct: each of the " + s.a + " first choices pairs with each of the " + s.b + " second choices: " + s.a + " x " + s.b + " = " + key + "." },
    [{ t: String(ds[0]), fb: "That adds the two counts. Every first choice can pair with every second choice, so multiply instead." },
     { t: String(ds[1]), fb: "That writes the two counts side by side. Count the pairs by multiplying." },
     { t: String(ds[2]), fb: "That adds after multiplying. The pairs alone number " + s.a + " x " + s.b + " = " + key + "." }],
    "Pair every first choice with every second choice: \\(" + s.a + " \\times " + s.b + " = " + key + "\\). The answer is <b>" + key + "</b>.",
    { a: s.a, b: s.b, key: key });
}, ["Fix one first choice and count its partners.", "Multiply the two counts: every pairing is a different combination."]);

/* Shared copies for cluster 7-C12: the table, bar graph and line
   graph generators of cluster 7-C3, housed in Unit 7. Cluster
   7-C12's reading runs to bar graphs, line graphs and tables
   (its centre-measures content shipped in Piece 1). The copies
   call the same generator functions as the Unit 1 originals. */

E("u7-pk-tg-table", 7, ["11.6"], 2, "gen", pk7tgTableGen,
  ["Find the row (or rows) the question names before reading any numbers.", "A total question needs two rows added."]);

E("u7-pk-tg-bar", 7, ["11.6"], 1, "gen", pk7tgBarGen,
  ["Run your eye from the top of the bar across to the scale.", "The scale counts in steps: check the step size first."]);

E("u7-pk-tg-line", 7, ["11.6"], 2, "gen", pk7tgLineGen,
  ["Find the point above the label named, then read across to the scale.", "Growth is a difference: read both heights and subtract."]);

/* ================= Cluster 7-C14 =================
   ANGLE FACTS, Unit 8 part (angle-facts, Unit 8, 4 entries, all
   authored, all figure-bearing): classify angles, judge them
   against benchmarks, and find the second angle of a
   supplementary or complementary pair. Grounding: MA6.9.11 and
   MA6.9.12 (the degree as the standard unit), with MA6.9.1 and
   MA6.9.2 behind them. Supports (pkFor): the cluster's nine
   indicators (10.1 to 10.5, 10.13 to 10.16). The protractor
   copies below are shared from cluster 7-C10. */

E("u8-pk-angle-classify", 8, ["10.1"], 1, "gen", function () {
  var modes = [
    { degs: [30, 40, 55, 65, 80], name: "an acute angle", why: "less than 90°" },
    { degs: [90], name: "a right angle", why: "exactly 90°" },
    { degs: [100, 120, 140, 160], name: "an obtuse angle", why: "more than 90° but less than 180°" },
    { degs: [180], name: "a straight angle", why: "exactly 180°, a straight line" }
  ];
  var m = pick(modes), deg = pick(m.degs);
  var names = ["an acute angle", "a right angle", "an obtuse angle", "a straight angle"];
  var q = mcq("What type of angle is shown?",
    { t: m.name, fb: "Correct: the angle is " + m.why + "." },
    names.filter(function (x) { return x !== m.name; }).map(function (x) { return { t: x, fb: "Compare the angle with a right angle (90°): this one is " + m.why + "." }; }),
    "Compare the angle with a right angle: it is " + m.why + ", so it is <b>" + m.name + "</b>.",
    { deg: deg, type: m.name });
  q.figure = pk7angleFig(deg);
  return q;
}, ["Compare the angle with a right angle first.", "Less than 90° is acute; more than 90° (but under 180°) is obtuse."]);

E("u8-pk-angle-benchmark", 8, ["10.1"], 1, "gen", function () {
  var target = pick([45, 90]);
  var near = target === 45 ? pick([40, 50]) : pick([85, 95]);
  var rest = target === 45 ? [100, 160, 15] : [30, 150, 170];
  var degs = [near].concat(rest), i;
  for (i = 3; i > 0; i--) { var j = ri(0, i), tmp = degs[i]; degs[i] = degs[j]; degs[j] = tmp; }
  var idx = degs.indexOf(near);
  var labs = ["A", "B", "C", "D"];
  var q = mcq("Which angle is closest to " + target + "°?",
    { t: "Angle " + labs[idx], fb: "Correct: that angle is " + near + "°, only " + Math.abs(near - target) + "° from " + target + "°." },
    degs.map(function (dg, k) { return k; }).filter(function (k) { return k !== idx; }).map(function (k) { return { t: "Angle " + labs[k], fb: "That angle is about " + degs[k] + "°, much further from " + target + "°." }; }),
    "Judge each angle against the " + target + "° benchmark" + (target === 45 ? " (half of a right angle)" : " (a right angle)") + ": the closest is <b>angle " + labs[idx] + "</b> at about " + near + "°.",
    { degs: degs, idx: idx, target: target });
  q.figure = pk7anglePickFig(degs);
  return q;
}, ["Use the benchmark: 45° is half a right angle, 90° is a right angle.", "Rule out the angles that are clearly much bigger or smaller first."]);

E("u8-pk-angle-supplementary", 8, ["10.1"], 2, "gen", function () {
  var deg = pick([110, 120, 130, 140, 150, 160]);
  var key = 180 - deg;
  var ds = pk7uniq(key, [deg, key + 10, key - 10]).slice(0, 3);
  var q = mcq("Two angles form a straight line. One angle is " + deg + "°. What is the measure of the other angle?",
    { t: key + "°", fb: "Correct: angles on a straight line add to 180°, and 180 - " + deg + " = " + key + "." },
    ds.map(function (d) { return { t: d + "°", fb: d === deg ? "That is the given angle itself. The two angles must add to 180°." : "Angles on a straight line add to 180°. Subtract " + deg + " from 180." }; }),
    "Angles on a straight line are supplementary and add to 180°: \\(180 - " + deg + " = " + key + "\\). The answer is <b>" + key + "°</b>.",
    { deg: deg, key: key });
  q.figure = pk7anglePair(deg);
  return q;
}, ["Angles on a straight line add to 180°.", "Subtract the known angle from 180."]);

E("u8-pk-angle-complementary", 8, ["10.1"], 2, "gen", function () {
  var deg = pick([25, 35, 40, 55, 60, 65]);
  var key = 90 - deg;
  var ds = pk7uniq(key, [deg, key + 10, 180 - deg]).slice(0, 3);
  var q = mcq("Two angles form a right angle. One angle is " + deg + "°. What is the measure of the other angle?",
    { t: key + "°", fb: "Correct: angles forming a right angle add to 90°, and 90 - " + deg + " = " + key + "." },
    ds.map(function (d) { return { t: d + "°", fb: d === 180 - deg ? "That subtracts from 180, but these angles form a right angle (90°), not a straight line." : "Angles forming a right angle add to 90°. Subtract " + deg + " from 90." }; }),
    "Angles forming a right angle are complementary and add to 90°: \\(90 - " + deg + " = " + key + "\\). The answer is <b>" + key + "°</b>.",
    { deg: deg, key: key });
  q.figure = pk7anglePairR(deg);
  return q;
}, ["Angles forming a right angle add to 90°.", "Subtract the known angle from 90."]);

/* Shared copies for cluster 7-C14: the three protractor reading
   generators of cluster 7-C10, housed in Unit 8. The copies call
   the same generator functions as the Unit 4 originals. */

E("u8-pk-protractor-acute", 8, ["10.1"], 1, "gen", pk7ptAcuteGen,
  ["Start from the zero on the same side as the flat ray.", "Follow the slanted ray out to the scale and read the number there."]);

E("u8-pk-protractor-obtuse", 8, ["10.1"], 1, "gen", pk7ptObtuseGen,
  ["An obtuse angle measures more than 90°: use the scale that starts at the flat ray's zero.", "Follow the slanted ray out to the scale and read the number there."]);

E("u8-pk-protractor-five", 8, ["10.1"], 2, "gen", pk7ptFiveGen,
  ["The small marks between the numbers are worth 5° each.", "Read the numbered mark before the ray, then add the small steps."]);

/* ================= Cluster 7-C15 top-ups and copies =========
   AXES AND THE ORIGIN (axes-origin, Unit 8, 3 entries, all
   authored, all figure-bearing): the support entry
   u8-axes-origin is flagged in PKT7_P3; these labelling items
   complete the group. Grounding: MA6.10.9. Supports (pkFor):
   10.6. */

E("u8-pk-axes-origin-point", 8, ["10.6"], 1, "gen", function () {
  var others = [{ x: 2, y: 3 }, { x: 4, y: 1 }, { x: 1, y: 4 }, { x: 3, y: 5 }, { x: 5, y: 2 }];
  var pool = others.slice(), chosen = [], guard = 0;
  while (chosen.length < 3 && guard++ < 200) { chosen.push(pool.splice(ri(0, pool.length - 1), 1)[0]); }
  var pts = [{ x: 0, y: 0 }].concat(chosen), labs = ["A", "B", "C", "D"], order = [0, 1, 2, 3], i;
  for (i = 3; i > 0; i--) { var j = ri(0, i), tmp = order[i]; order[i] = order[j]; order[j] = tmp; }
  var placed = order.map(function (k) { return pts[k]; });
  placed.forEach(function (p, k) { p.label = labs[k]; });
  var originPt = placed[0] && placed.find(function (p) { return p.x === 0 && p.y === 0; });
  var q = mcq("Which point is at the origin?",
    { t: "Point " + originPt.label, fb: "Correct: the origin is where the two axes cross, at (0, 0)." },
    placed.filter(function (p) { return p !== originPt; }).map(function (p) { return { t: "Point " + p.label, fb: "Point " + p.label + " is at (" + p.x + ", " + p.y + "), not at the crossing of the axes." }; }),
    "The origin is the point where the axes cross, (0, 0): that is <b>point " + originPt.label + "</b>.",
    { pts: placed.map(function (p) { return [p.x, p.y]; }), origin: originPt.label });
  q.figure = pk7quad(placed, 6, 6);
  return q;
}, ["The origin is where the axes cross.", "Its coordinates are (0, 0): no move across and no move up."]);

E("u8-pk-axes-name", 8, ["10.6"], 1, "gen", function () {
  var mode = pick(["x", "y"]);
  var key = mode + "-axis";
  var q = mcq("The highlighted line on the coordinate grid is called the...",
    { t: key, fb: "Correct: the " + (mode === "x" ? "horizontal" : "vertical") + " axis is the " + key + "." },
    [{ t: (mode === "x" ? "y" : "x") + "-axis", fb: "That is the " + (mode === "x" ? "vertical" : "horizontal") + " line. The highlighted line runs " + (mode === "x" ? "horizontally" : "vertically") + "." },
     { t: "origin", fb: "The origin is a point, the crossing of the axes at (0, 0), not a line." },
     { t: "coordinate grid", fb: "That names the whole grid. The highlighted line itself is one of the axes." }],
    "The " + (mode === "x" ? "horizontal" : "vertical") + " axis through the origin is the <b>" + key + "</b>.",
    { mode: mode });
  q.figure = pk7axesHL(mode);
  return q;
}, ["The x-axis runs horizontally and the y-axis runs vertically.", "The origin is the point where they cross, not a line."]);

E("u8-pk-axes-on-axis", 8, ["10.6"], 2, "gen", function () {
  var k = ri(2, 6);
  var q = mcq("Point P is on the y-axis. What are its coordinates?",
    { t: "(0, " + k + ")", fb: "Correct: a point on the y-axis has not moved across at all, so its x-coordinate is 0." },
    [{ t: "(" + k + ", 0)", fb: "That point is on the x-axis: its y-coordinate is 0. Point P is on the y-axis." },
     { t: "(0, " + (k + 1) + ")", fb: "The across value, 0, is right, but P is " + k + " units up, not " + (k + 1) + "." },
     { t: "(" + k + ", " + k + ")", fb: "That point is out in the grid, not on an axis: a point on the y-axis has x-coordinate 0." }],
    "Points on the y-axis have x-coordinate 0. Point P is " + k + " units up the y-axis, so its coordinates are <b>(0, " + k + ")</b>.",
    { k: k });
  q.figure = pk7quad([{ x: 0, y: k, label: "P" }], 7, 7);
  return q;
}, ["On the y-axis, the across distance is 0.", "The first coordinate of an on-axis point tells which axis: 0 across means the y-axis."]);

/* TRANSFORMATIONS IN WORDS (transformations, Unit 8, 4 entries,
   all authored, all figure-bearing): identify and describe
   translations, reflections and rotations on a plain grid with
   NO coordinates, in plain words, per the placement. Grounding:
   MA5.10.12 to MA5.10.24 (translations, reflections and rotations
   introduced in Grade 5; identifying the transformation at
   MA5.10.16). Supports (pkFor): 10.11, 10.12, 10.20. */

function pk7shift(poly, dx, dy) { return poly.map(function (p) { return [p[0] + dx, p[1] + dy]; }); }
var PK7_SHAPE_L = [[0, 0], [2, 0], [2, 1], [1, 1], [1, 3], [0, 3]];
var PK7_SHAPE_STEP = [[0, 0], [3, 0], [3, 1], [2, 1], [2, 2], [1, 2], [1, 3], [0, 3]];

E("u8-pk-trans-identify-slide", 8, ["10.11"], 1, "gen", function () {
  var orig = pk7shift(PK7_SHAPE_L, 1, 2), img = pk7shift(orig, 4, 1);
  var q = mcq("The white shape is moved to the shaded position. What is this transformation called?",
    { t: "a translation", fb: "Correct: the shape slides without turning or flipping; every point moves the same way." },
    [{ t: "a reflection", fb: "A reflection flips the shape over a line, like a mirror image. This shape keeps its orientation." },
     { t: "a rotation", fb: "A rotation turns the shape around a point. This shape has not turned at all." },
     { t: "an enlargement", fb: "An enlargement changes the shape's size. This shape is the same size, only moved." }],
    "The shape slides to a new position with no turn and no flip: that is <b>a translation</b> (a slide).",
    { move: [4, 1] });
  q.figure = pk7plainGrid([orig, img], null);
  return q;
}, ["Ask: did the shape flip, turn, grow, or just slide?", "A slide keeps the shape pointing the same way."]);

E("u8-pk-trans-identify-flip", 8, ["10.11"], 1, "gen", function () {
  var orig = pk7shift(PK7_SHAPE_L, 1, 2);
  var img = orig.map(function (p) { return [10 - p[0], p[1]]; }).reverse();
  var q = mcq("The white shape is changed into the shaded shape across the dashed line. What is this transformation called?",
    { t: "a reflection", fb: "Correct: the dashed line is a mirror line, and the shaded shape is the mirror image of the white one." },
    [{ t: "a translation", fb: "A translation slides a shape without flipping it. This shape has been flipped: it faces the other way." },
     { t: "a rotation", fb: "A rotation turns the shape around a point. Here every point has crossed the dashed line to its mirror position." },
     { t: "an enlargement", fb: "An enlargement changes the shape's size. This shape is the same size, only flipped." }],
    "The shaded shape is the mirror image of the white shape in the dashed line: that is <b>a reflection</b> (a flip).",
    { mirror: 5 });
  q.figure = pk7plainGrid([orig, img], 5);
  return q;
}, ["Ask: did the shape flip, turn, grow, or just slide?", "A dashed line between a shape and its mirror image signals a reflection."]);

E("u8-pk-trans-describe", 8, ["10.11"], 2, "gen", function () {
  var orig = pk7shift(PK7_SHAPE_STEP, 1, 4), img = pk7shift(orig, 3, -2);
  var q = mcq("Describe the translation that moves the white shape to the shaded position.",
    { t: "3 units right and 2 units up", fb: "Correct: pick any corner and count: it moves 3 squares right and 2 squares up." },
    [{ t: "3 units right and 2 units down", fb: "The shaded shape is higher on the grid, so the move is up, not down." },
     { t: "2 units right and 3 units up", fb: "That swaps the two counts. Count the sideways move first: it is 3 squares." },
     { t: "3 units left and 2 units up", fb: "The shaded shape is to the right of the white one, so the sideways move is right, not left." }],
    "Track one corner: it moves 3 squares right and 2 squares up. The translation is <b>3 units right and 2 units up</b>.",
    { move: [3, -2] });
  q.figure = pk7plainGrid([orig, img], null);
  return q;
}, ["Pick one corner of the shape and follow it to the matching corner of the image.", "Count sideways first, then up or down."]);

E("u8-pk-trans-identify-turn", 8, ["10.11"], 2, "gen", function () {
  var orig = pk7shift(PK7_SHAPE_L, 5, 2);
  var pivot = [5, 2];
  var img = orig.map(function (p) { var dx = p[0] - pivot[0], dy = p[1] - pivot[1]; return [pivot[0] - dy, pivot[1] + dx]; });
  var q = mcq("The white shape is changed into the shaded shape. What is this transformation called?",
    { t: "a rotation", fb: "Correct: the shape has turned a quarter turn around its top-left corner; it has not flipped or slid." },
    [{ t: "a reflection", fb: "A reflection would flip the shape into its mirror image. This shape has turned instead: its long part now runs a different way." },
     { t: "a translation", fb: "A translation keeps the shape pointing the same way. This shape points a different way after the move." },
     { t: "an enlargement", fb: "An enlargement changes the shape's size. This shape is the same size, only turned." }],
    "The shape has turned around one of its corners without flipping: that is <b>a rotation</b> (a turn).",
    { pivot: pivot });
  q.figure = pk7plainGrid([orig, img], null);
  return q;
}, ["Ask: did the shape flip, turn, grow, or just slide?", "If the shape points a different way but is not flipped, it has turned."]);

/* Shared copies for cluster 7-C15: the four first-quadrant
   generators of cluster 7-C3, housed in Unit 8. The copies call
   the same generator functions as the Unit 1 originals. */

E("u8-pk-fq-read", 8, ["10.6"], 1, "gen", pk7fqReadGen,
  ["Coordinates are read across first, then up.", "Start at the origin: count across to below the point, then count up to it."]);

E("u8-pk-fq-which", 8, ["10.6"], 1, "gen", pk7fqWhichGen,
  ["Use the first number to move across and the second to move up.", "Find where the across count and the up count meet."]);

E("u8-pk-fq-coord", 8, ["10.6"], 1, "gen", pk7fqCoordGen,
  ["The x-coordinate is the first number in the pair; the y-coordinate is the second.", "Read the point's pair off the grid, then pick the number asked for."]);

E("u8-pk-fq-move", 8, ["10.6"], 2, "gen", pk7fqMoveGen,
  ["Moving right changes the first coordinate; moving up changes the second.", "Add each move to its own coordinate."]);

/* ================= Piece 3 tranche metadata =================
   pkSrc names what the item assesses; pkFor lists the host
   indicators the entry supports; pkGroup is the strand group.
   The indicators array on each new entry above carries the first
   code of its pkFor list, per the specification's Section 10.
   The eighteen support-set entries keep their own indicators
   arrays, IDs and generators; this table only flags them. */
var PK7_FOR_SORT = ["5.1", "5.2", "5.3", "5.4"];
var PK7_FOR_PATTERNS = ["8.4", "8.5", "8.6", "7.1", "7.2", "7.3", "7.4", "7.7", "7.8"];
var PK7_FOR_QUAD = ["7.5", "7.6", "7.9", "7.10", "7.11", "7.12"];
var PK7_FOR_C15 = ["10.6", "10.7", "10.8", "10.9", "10.10", "10.11", "10.12", "10.17", "10.18", "10.19", "10.20"];
var PK7_FOR_C4 = ["8.1", "8.2", "8.3", "8.7", "8.8", "8.9", "8.10", "8.11", "8.12", "8.13", "8.14", "8.15", "8.16", "8.17"];
var PK7_FOR_EQBAL = ["8.1", "8.2", "8.3"];
var PK7_FOR_SUBST = ["8.1", "8.14", "8.17"];
var PK7_FOR_C6 = ["3.1", "3.2", "3.3", "3.4", "3.5", "3.6", "3.8", "3.9", "3.10", "3.11", "3.12", "3.13", "3.14"];
var PK7_FOR_FAD = ["3.8", "3.9", "3.10", "3.11", "3.12", "3.13", "3.14"];
var PK7_FOR_C7 = ["6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7", "6.8", "6.9", "6.10", "6.11", "6.12", "3.7"];
var PK7_FOR_EST = ["6.1", "6.2", "6.3"];
var PK7_FOR_PCTBASE = ["3.7", "6.11", "6.12"];
var PK7_FOR_PROT = ["11.1", "11.2", "11.3", "11.4", "11.5", "9.13"];
var PK7_FOR_AF4 = ["9.13", "11.2"];
var PK7_FOR_C14 = ["10.1", "10.2", "10.3", "10.4", "10.5", "10.13", "10.14", "10.15", "10.16"];
var PK7_FOR_C11 = ["6.13", "6.14", "6.15", "6.16", "6.17", "6.18", "6.19", "6.20", "6.21", "6.22", "6.23"];
var PK7_FOR_MIXED = ["6.20", "6.21", "6.13", "6.14", "6.15", "6.16", "6.17", "6.18", "6.19", "6.22", "6.23"];
var PK7_FOR_C13 = ["12.1", "12.2", "12.3", "12.4", "12.5", "12.6", "12.7"];
var PK7_FOR_LIST = ["12.4", "12.5", "12.6", "12.7"];
var PK7_FOR_AXES = ["10.6"];
var PK7_FOR_TRANSF = ["10.11", "10.12", "10.20"];
var PKT7_P3 = {
  /* Support sets (state A): metadata only. */
  "u6-one-step-balance": { src: "math-4:MA4.8.7", group: "equation-solving", for: PK7_FOR_C4 },
  "u6-one-step-problem": { src: "math-4:MA4.8.7", group: "equation-solving", for: PK7_FOR_C4 },
  "u6-one-step-problem-cr": { src: "math-4:MA4.8.7", group: "equation-solving", for: PK7_FOR_C4 },
  "u6-inspection-trial": { src: "math-4:MA4.8.8", group: "equation-solving", for: PK7_FOR_C4 },
  "u3-add-sub-decimals": { src: "math-5:MA5.6.11", group: "decimal-operations", for: PK7_FOR_C7 },
  "u3-cr-add-sub": { src: "math-5:MA5.6.11", group: "decimal-operations", for: PK7_FOR_C7 },
  "u3-mult-decimals": { src: "math-6:MA6.6.5", group: "decimal-operations", for: PK7_FOR_C7 },
  "u3-cr-mult": { src: "math-6:MA6.6.5", group: "decimal-operations", for: PK7_FOR_C7 },
  "u3-div-decimals": { src: "math-6:MA6.6.5", group: "decimal-operations", for: PK7_FOR_C7 },
  "u3-cr-div": { src: "math-6:MA6.6.5", group: "decimal-operations", for: PK7_FOR_C7 },
  "u5-add-like": { src: "audit:like-denominator fraction addition rated covered in Grades 5/6 (Nov 13, 2026 audit); not named in the elementary outcome lists on file", group: "fraction-operations", for: PK7_FOR_C11 },
  "u5-sub-like": { src: "audit:like-denominator fraction subtraction rated covered in Grades 5/6 (Nov 13, 2026 audit); not named in the elementary outcome lists on file", group: "fraction-operations", for: PK7_FOR_C11 },
  "u5-model-add-figure": { src: "audit:like-denominator fraction addition rated covered in Grades 5/6 (Nov 13, 2026 audit); not named in the elementary outcome lists on file", group: "fraction-operations", for: PK7_FOR_C11 },
  "u5-simplify-fraction": { src: "audit:lowest terms rated covered in Grades 5/6 (Nov 13, 2026 audit); not named in the elementary outcome lists on file", group: "equivalent-fractions", for: PK7_FOR_C11 },
  "u5-simplify-solution": { src: "audit:lowest terms rated covered in Grades 5/6 (Nov 13, 2026 audit); not named in the elementary outcome lists on file", group: "equivalent-fractions", for: PK7_FOR_C11 },
  "u5-common-denominator": { src: "audit:common denominators rated covered in Grades 5/6 (Nov 13, 2026 audit); not named in the elementary outcome lists on file", group: "equivalent-fractions", for: PK7_FOR_C11 },
  "u7-prob-basic": { src: "math-6:MA6.12.2", group: "single-event-probability", for: PK7_FOR_C13 },
  "u8-axes-origin": { src: "math-6:MA6.10.9", group: "axes-origin", for: PK7_FOR_AXES },
  /* Cluster 7-C1 remainder: sorting diagrams. */
  "u1-pk-sort-venn-read": { src: "math-4:MA4.11.7", group: "sorting-diagrams", for: PK7_FOR_SORT },
  "u1-pk-sort-venn-place": { src: "math-4:MA4.11.7", group: "sorting-diagrams", for: PK7_FOR_SORT },
  "u1-pk-sort-carroll-read": { src: "math-4:MA4.11.10", group: "sorting-diagrams", for: PK7_FOR_SORT },
  "u1-pk-sort-carroll-total": { src: "math-4:MA4.11.10", group: "sorting-diagrams", for: PK7_FOR_SORT },
  /* Cluster 7-C2: patterns. */
  "u1-pk-pattern-next": { src: "math-5:MA5.8.1", group: "patterns", for: PK7_FOR_PATTERNS },
  "u1-pk-pattern-rule": { src: "math-5:MA5.8.1", group: "patterns", for: PK7_FOR_PATTERNS },
  "u1-pk-pattern-machine": { src: "math-4:MA4.8.1", group: "patterns", for: PK7_FOR_PATTERNS },
  "u1-pk-pattern-missing": { src: "math-5:MA5.8.1", group: "patterns", for: PK7_FOR_PATTERNS },
  "u1-pk-pattern-grow": { src: "math-5:MA5.8.1", group: "patterns", for: PK7_FOR_PATTERNS },
  /* Cluster 7-C3: first quadrant and tables and graphs. */
  "u1-pk-fq-read": { src: "math-6:MA6.10.9", group: "first-quadrant", for: PK7_FOR_QUAD },
  "u1-pk-fq-which": { src: "math-6:MA6.10.9", group: "first-quadrant", for: PK7_FOR_QUAD },
  "u1-pk-fq-coord": { src: "math-6:MA6.10.9", group: "first-quadrant", for: PK7_FOR_QUAD },
  "u1-pk-fq-move": { src: "math-6:MA6.10.9", group: "first-quadrant", for: PK7_FOR_QUAD },
  "u1-pk-fq-between": { src: "math-6:MA6.10.9", group: "first-quadrant", for: PK7_FOR_QUAD },
  "u1-pk-tg-table": { src: "math-4:MA4.7.3", group: "tables-and-graphs", for: PK7_FOR_QUAD },
  "u1-pk-tg-picto": { src: "math-4:MA4.11.6", group: "tables-and-graphs", for: PK7_FOR_QUAD },
  "u1-pk-tg-bar": { src: "math-5:MA5.11.4", group: "tables-and-graphs", for: PK7_FOR_QUAD },
  "u1-pk-tg-line": { src: "math-6:MA6.11.7", group: "tables-and-graphs", for: PK7_FOR_QUAD },
  "u1-pk-tg-compare": { src: "math-5:MA5.11.4", group: "tables-and-graphs", for: PK7_FOR_QUAD },
  /* Cluster 7-C4 top-ups. */
  "u6-pk-balance-value": { src: "math-6:MA6.8.2", group: "equality-balance", for: PK7_FOR_EQBAL },
  "u6-pk-balance-change": { src: "math-6:MA6.8.2", group: "equality-balance", for: PK7_FOR_EQBAL },
  "u6-pk-balance-equivalent": { src: "math-6:MA6.8.2", group: "equality-balance", for: PK7_FOR_EQBAL },
  "u6-pk-subst-simple": { src: "math-6:MA6.8.6", group: "substitution", for: PK7_FOR_SUBST },
  "u6-pk-subst-brackets": { src: "math-6:MA6.8.6", group: "substitution", for: PK7_FOR_SUBST },
  "u6-pk-subst-table": { src: "math-4:MA4.8.10", group: "substitution", for: PK7_FOR_SUBST },
  /* Cluster 7-C6: fraction representation, equivalent fractions,
     decimal place value, fractions as decimals. */
  "u3-pk-fracrep-bar": { src: "math-6:MA6.3.2", group: "fraction-representation", for: PK7_FOR_C6 },
  "u3-pk-fracrep-circle": { src: "math-6:MA6.3.2", group: "fraction-representation", for: PK7_FOR_C6 },
  "u3-pk-fracrep-set": { src: "math-6:MA6.3.2", group: "fraction-representation", for: PK7_FOR_C6 },
  "u3-pk-fracrep-pick": { src: "math-6:MA6.3.2", group: "fraction-representation", for: PK7_FOR_C6 },
  "u3-pk-fracrep-line": { src: "math-4:MA4.3.13", group: "fraction-representation", for: PK7_FOR_C6 },
  "u3-pk-equiv-recognize": { src: "math-5:MA5.3.1", group: "equivalent-fractions", for: PK7_FOR_C6 },
  "u3-pk-equiv-target": { src: "math-5:MA5.3.1", group: "equivalent-fractions", for: PK7_FOR_C6 },
  "u3-pk-equiv-divide": { src: "math-5:MA5.3.9", group: "equivalent-fractions", for: PK7_FOR_C6 },
  "u3-pk-equiv-not": { src: "math-5:MA5.3.2", group: "equivalent-fractions", for: PK7_FOR_C6 },
  "u3-pk-equiv-missing": { src: "math-5:MA5.3.1", group: "equivalent-fractions", for: PK7_FOR_C6 },
  "u3-pk-dpv-digit-value": { src: "math-5:MA5.3.15", group: "decimal-place-value", for: PK7_FOR_C6 },
  "u3-pk-dpv-expanded": { src: "math-5:MA5.3.15", group: "decimal-place-value", for: PK7_FOR_C6 },
  "u3-pk-dpv-round-tenth": { src: "math-5:MA5.3.15", group: "decimal-place-value", for: PK7_FOR_C6 },
  "u3-pk-dpv-round-hundredth": { src: "math-5:MA5.3.15", group: "decimal-place-value", for: PK7_FOR_C6 },
  "u3-pk-dpv-place-name": { src: "math-5:MA5.3.15", group: "decimal-place-value", for: PK7_FOR_C6 },
  "u3-pk-fad-to-decimal": { src: "math-5:MA5.3.20", group: "fraction-as-decimal", for: PK7_FOR_FAD },
  "u3-pk-fad-to-fraction": { src: "math-5:MA5.3.20", group: "fraction-as-decimal", for: PK7_FOR_FAD },
  "u3-pk-fad-match": { src: "math-5:MA5.3.21", group: "fraction-as-decimal", for: PK7_FOR_FAD },
  "u3-pk-fad-line": { src: "math-5:MA5.3.20", group: "fraction-as-decimal", for: PK7_FOR_FAD },
  /* Cluster 7-C7 top-ups. */
  "u3-pk-est-add": { src: "math-5:MA5.5.26", group: "estimation", for: PK7_FOR_EST },
  "u3-pk-est-product": { src: "math-5:MA5.5.26", group: "estimation", for: PK7_FOR_EST },
  "u3-pk-est-difference": { src: "math-5:MA5.5.26", group: "estimation", for: PK7_FOR_EST },
  "u3-pk-est-money": { src: "math-5:MA5.5.26", group: "estimation", for: PK7_FOR_EST },
  "u3-pk-pct-grid": { src: "math-6:MA6.3.11", group: "percent-base", for: PK7_FOR_PCTBASE },
  "u3-pk-pct-pick": { src: "math-6:MA6.3.12", group: "percent-base", for: PK7_FOR_PCTBASE },
  "u3-pk-pct-fraction": { src: "math-6:MA6.3.9", group: "percent-base", for: PK7_FOR_PCTBASE },
  "u3-pk-pct-decimal": { src: "math-6:MA6.3.9", group: "percent-base", for: PK7_FOR_PCTBASE },
  /* Cluster 7-C10: protractor and angle facts. */
  "u4-pk-protractor-acute": { src: "math-6:MA6.9.13", group: "protractor", for: PK7_FOR_PROT },
  "u4-pk-protractor-obtuse": { src: "math-6:MA6.9.13", group: "protractor", for: PK7_FOR_PROT },
  "u4-pk-protractor-five": { src: "math-6:MA6.9.13", group: "protractor", for: PK7_FOR_PROT },
  "u4-pk-protractor-left": { src: "math-6:MA6.9.13", group: "protractor", for: PK7_FOR_PROT },
  "u4-pk-protractor-supplement": { src: "math-6:MA6.9.13", group: "protractor", for: PK7_FOR_PROT },
  "u4-pk-angle-full-turn": { src: "math-6:MA6.9.11", group: "angle-facts", for: PK7_FOR_AF4 },
  "u4-pk-angle-right-count": { src: "math-6:MA6.9.11", group: "angle-facts", for: PK7_FOR_AF4 },
  /* Cluster 7-C11 top-up and shared copies. */
  "u5-pk-mixed-from-improper": { src: "math-6:MA6.3.6", group: "mixed-improper", for: PK7_FOR_MIXED },
  "u5-pk-mixed-to-improper": { src: "math-6:MA6.3.7", group: "mixed-improper", for: PK7_FOR_MIXED },
  "u5-pk-mixed-slices": { src: "math-6:MA6.3.6", group: "mixed-improper", for: PK7_FOR_MIXED },
  "u5-pk-mixed-which": { src: "math-6:MA6.3.7", group: "mixed-improper", for: PK7_FOR_MIXED },
  "u5-pk-equiv-recognize": { src: "math-5:MA5.3.1", group: "equivalent-fractions", for: ["6.16"] },
  "u5-pk-equiv-target": { src: "math-5:MA5.3.1", group: "equivalent-fractions", for: ["6.16"] },
  "u5-pk-equiv-divide": { src: "math-5:MA5.3.9", group: "equivalent-fractions", for: ["6.16"] },
  /* Cluster 7-C13 top-ups and 7-C12 shared copies. */
  "u7-pk-prob-bag": { src: "math-6:MA6.12.2", group: "single-event-probability", for: PK7_FOR_C13 },
  "u7-pk-prob-percent-bag": { src: "math-6:MA6.12.3", group: "single-event-probability", for: PK7_FOR_C13 },
  "u7-pk-prob-words": { src: "math-6:MA6.12.2", group: "single-event-probability", for: PK7_FOR_C13 },
  "u7-pk-prob-spinner": { src: "math-6:MA6.12.3", group: "single-event-probability", for: PK7_FOR_C13 },
  "u7-pk-prob-die": { src: "math-6:MA6.12.2", group: "single-event-probability", for: PK7_FOR_C13 },
  "u7-pk-list-count": { src: "math-6:MA6.12.1", group: "listing-outcomes", for: PK7_FOR_LIST },
  "u7-pk-list-missing": { src: "math-6:MA6.12.1", group: "listing-outcomes", for: PK7_FOR_LIST },
  "u7-pk-list-outfits": { src: "math-6:MA6.12.1", group: "listing-outcomes", for: PK7_FOR_LIST },
  "u7-pk-tg-table": { src: "math-4:MA4.7.3", group: "tables-and-graphs", for: PK7_FOR_AVG },
  "u7-pk-tg-bar": { src: "math-5:MA5.11.4", group: "tables-and-graphs", for: PK7_FOR_AVG },
  "u7-pk-tg-line": { src: "math-6:MA6.11.7", group: "tables-and-graphs", for: PK7_FOR_AVG },
  /* Cluster 7-C14: angle facts and protractor copies. */
  "u8-pk-angle-classify": { src: "math-6:MA6.9.11", group: "angle-facts", for: PK7_FOR_C14 },
  "u8-pk-angle-benchmark": { src: "math-6:MA6.9.12", group: "angle-facts", for: PK7_FOR_C14 },
  "u8-pk-angle-supplementary": { src: "math-6:MA6.9.12", group: "angle-facts", for: PK7_FOR_C14 },
  "u8-pk-angle-complementary": { src: "math-6:MA6.9.12", group: "angle-facts", for: PK7_FOR_C14 },
  "u8-pk-protractor-acute": { src: "math-6:MA6.9.13", group: "protractor", for: PK7_FOR_C14 },
  "u8-pk-protractor-obtuse": { src: "math-6:MA6.9.13", group: "protractor", for: PK7_FOR_C14 },
  "u8-pk-protractor-five": { src: "math-6:MA6.9.13", group: "protractor", for: PK7_FOR_C14 },
  /* Cluster 7-C15 top-ups and first-quadrant copies. */
  "u8-pk-axes-origin-point": { src: "math-6:MA6.10.9", group: "axes-origin", for: PK7_FOR_AXES },
  "u8-pk-axes-name": { src: "math-6:MA6.10.9", group: "axes-origin", for: PK7_FOR_AXES },
  "u8-pk-axes-on-axis": { src: "math-6:MA6.10.9", group: "axes-origin", for: PK7_FOR_AXES },
  "u8-pk-trans-identify-slide": { src: "math-5:MA5.10.12", group: "transformations", for: PK7_FOR_TRANSF },
  "u8-pk-trans-identify-flip": { src: "math-5:MA5.10.13", group: "transformations", for: PK7_FOR_TRANSF },
  "u8-pk-trans-describe": { src: "math-5:MA5.10.16", group: "transformations", for: PK7_FOR_TRANSF },
  "u8-pk-trans-identify-turn": { src: "math-5:MA5.10.14", group: "transformations", for: PK7_FOR_TRANSF },
  "u8-pk-fq-read": { src: "math-6:MA6.10.9", group: "first-quadrant", for: PK7_FOR_C15 },
  "u8-pk-fq-which": { src: "math-6:MA6.10.9", group: "first-quadrant", for: PK7_FOR_C15 },
  "u8-pk-fq-coord": { src: "math-6:MA6.10.9", group: "first-quadrant", for: PK7_FOR_C15 },
  "u8-pk-fq-move": { src: "math-6:MA6.10.9", group: "first-quadrant", for: PK7_FOR_C15 }
};
BANK.forEach(function (e) {
  var m = PKT7_P3[e.id];
  if (m) { e.pkFlag = true; e.pkSrc = m.src; e.pkGroup = m.group; e.pkFor = m.for; }
});
