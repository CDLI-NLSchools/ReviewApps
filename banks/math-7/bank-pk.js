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
