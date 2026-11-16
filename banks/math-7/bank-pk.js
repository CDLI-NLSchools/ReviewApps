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
   fraction operations, nothing Mathematics 7 itself assesses. */

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
