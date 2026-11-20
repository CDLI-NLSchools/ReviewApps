/* Math 9 bank module for the unified review app shell.
   Assembled by assemble-bank.py from banks/math-9/; edit the
   per-unit sources there, not this file. Entries register through
   the shell's E(id, unit, indicators, level, kind, gen). */

/* ----- bank-helpers.js ----- */
/* Math 9 bank helpers: FR and fmtPairDs, cut verbatim from the
   head of the standalone bank source (math-9-review/bank-src.js,
   lines 1 to 20), where they precede the Unit 1 banner. */
/* Math 9 Review bank source. Mid-scope tranche (Units 1 to 4) assembled
   November 7, 2026 from tranche1/unit1.js to unit4.js, plus the
   top-up tranche appended the same day from tranche1/unitN-topup.js. FR returns the raw
   \frac fragment for use INSIDE math delimiters, defined here for the
   entries that use it. CR_MARKS stays at the end of this file. */
function FR(n,d){return "\\frac{"+n+"}{"+d+"}";}
/* Precision pairing for numeric distractors (Nov 8 programme): prints each
   distractor value with trailing zeros so its decimal-place count pairs with
   the key's count or with another distractor's count. A value is only ever
   printed at a place count it reaches exactly, so no value ever changes. */
function fmtPairDs(keyT, ds) {
  function exactDp(v) { for (var d = 0; d <= 6; d++) { if (Math.abs(v * Math.pow(10, d) - Math.round(v * Math.pow(10, d))) < 1e-9) return d; } return 6; }
  var m = String(keyT).match(/\.(\d+)/); var kd = m ? m[1].length : 0;
  var pairIdx = -1;
  for (var i = 0; i < ds.length; i++) { if (exactDp(ds[i].v) <= kd) { pairIdx = i; break; } }
  if (pairIdx < 0) { var am = 0; ds.forEach(function (d) { am = Math.max(am, exactDp(d.v)); }); return ds.map(function (d) { return { t: fmtF(d.v, am), fb: d.fb }; }); }
  var common = 0; ds.forEach(function (d, i) { if (i !== pairIdx) common = Math.max(common, exactDp(d.v)); });
  return ds.map(function (d, i) { return { t: fmtF(d.v, i === pairIdx ? kd : common), fb: d.fb }; });
}

/* Solid and scale figure helpers (November 2026): parameterized inline SVG
   drawn from each question's own generated values. Labels arrive as finished
   strings from the caller, so each bank formats its own numbers (fmt in the
   English bank, fmtD in the French bank) and words inside figures follow the
   bank language. Coordinates use the chassis fmt, like the u7 helpers. */
function solT(x, y, str, size, bold) {
  return '<text x="' + fmt(x, 1) + '" y="' + fmt(y, 1) + '" font-size="' + (size || 12) + '" fill="' + FIG_INK + '" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="middle" dominant-baseline="central"' + (bold ? ' font-weight="bold"' : "") + '>' + str + '</text>';
}
function solSvg(W, H, body, aria) {
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + aria + '">' + body + '</svg>';
}
function solPts(pts) { return pts.map(function (p) { return fmt(p[0], 1) + "," + fmt(p[1], 1); }).join(" "); }
function solPoly(pts, fill, dash) {
  return '<polygon points="' + solPts(pts) + '" fill="' + (fill || "none") + '" stroke="' + FIG_INK + '" stroke-width="2"' + (dash ? ' stroke-dasharray="5 4"' : "") + '/>';
}
function solLine(p, q, dash, w) {
  return '<line x1="' + fmt(p[0], 1) + '" y1="' + fmt(p[1], 1) + '" x2="' + fmt(q[0], 1) + '" y2="' + fmt(q[1], 1) + '" stroke="' + FIG_INK + '" stroke-width="' + (w || 2) + '"' + (dash ? ' stroke-dasharray="5 4"' : "") + '/>';
}
/* Right rectangular prism: length along the front bottom, width into the
   page (offset up and right), height vertical. */
function solRectPrism(l, w, h, labL, labW, labH, aria) {
  var s = Math.min(150 / Math.max(l, 0.01), 105 / Math.max(h, 0.01));
  var fw = l * s, fh = h * s, d = Math.min(w * s * 0.5, 40);
  var x0 = (340 - fw - d) / 2, y0 = 192;
  var F = [[x0, y0 - fh], [x0 + fw, y0 - fh], [x0 + fw, y0], [x0, y0]];
  var B = F.map(function (p) { return [p[0] + d, p[1] - d]; });
  var out = solPoly(B, "#ffffff") + solPoly(F, FIG_SHADE);
  out += solLine(F[0], B[0]) + solLine(F[1], B[1]) + solLine(F[2], B[2]);
  out += solT(x0 + fw / 2, y0 + 15, labL, 12, false);
  out += solT(x0 - 13, y0 - fh / 2, labH, 12, false);
  out += solT((F[1][0] + B[1][0]) / 2 + 13, (F[1][1] + B[1][1]) / 2 - 4, labW, 12, false);
  return solSvg(340, 225, out, aria);
}
/* Right triangular prism: right triangle end with legs a (base) and b
   (vertical) and hypotenuse c, extruded along its length L. */
function solTriPrism(a, b, c, L, labA, labB, labC, labL, aria) {
  var s = Math.min(140 / Math.max(a, 0.01), 100 / Math.max(b, 0.01));
  var tw = a * s, th = b * s, d = Math.min(L * s * 0.5, 44);
  var x0 = (340 - tw - d) / 2, y0 = 192;
  var A = [x0, y0], Bp = [x0 + tw, y0], C = [x0, y0 - th];
  var A2 = [A[0] + d, A[1] - d], B2 = [Bp[0] + d, Bp[1] - d], C2 = [C[0] + d, C[1] - d];
  var out = solPoly([A2, B2, C2], "#ffffff") + solPoly([A, Bp, C], FIG_SHADE);
  out += solLine(A, A2) + solLine(Bp, B2) + solLine(C, C2);
  out += solT(x0 + tw / 2, y0 + 15, labA, 12, false);
  out += solT(x0 - 13, y0 - th / 2, labB, 12, false);
  var mx = (Bp[0] + C[0]) / 2, my = (Bp[1] + C[1]) / 2;
  out += solT(mx + 15, my - 6, labC, 12, false);
  out += solT((C[0] + C2[0]) / 2, C[1] - d / 2 - 11, labL, 12, false);
  return solSvg(340, 225, out, aria);
}
/* Right cylinder standing on its circular base. */
function solCylinder(r, h, labR, labH, aria) {
  var s = Math.min(52 / Math.max(r, 0.01), 105 / Math.max(h, 0.01));
  var rx = r * s, hh = h * s, ry = Math.max(rx * 0.32, 4), cx = 165, topY = 62, botY = topY + hh;
  var out = '<path d="M ' + fmt(cx - rx, 1) + ' ' + fmt(botY, 1) + ' A ' + fmt(rx, 1) + ' ' + fmt(ry, 1) + ' 0 0 0 ' + fmt(cx + rx, 1) + ' ' + fmt(botY, 1) + '" fill="none" stroke="' + FIG_INK + '" stroke-width="2"/>';
  out += solLine([cx - rx, topY], [cx - rx, botY]) + solLine([cx + rx, topY], [cx + rx, botY]);
  out += '<ellipse cx="' + fmt(cx, 1) + '" cy="' + fmt(topY, 1) + '" rx="' + fmt(rx, 1) + '" ry="' + fmt(ry, 1) + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  out += solLine([cx, topY], [cx + rx, topY], false, 1.6);
  out += solT(cx + rx / 2, topY - ry - 10, labR, 12, false);
  out += solT(cx + rx + 16, topY + hh / 2, labH, 12, false);
  return solSvg(340, 225, out, aria);
}
/* Square pyramid: base side along the front bottom, vertical height dashed
   from the apex to the base centre, one slant edge labelled by the caller. */
function solPyramid(base, height, labBase, labH, labSlant, aria) {
  var s = Math.min(150 / Math.max(base, 0.01), 100 / Math.max(height, 0.01));
  var bw = base * s, hh = height * s, d = Math.min(bw * 0.3, 38);
  var x0 = (340 - bw - d) / 2, y0 = 192;
  var FL = [x0, y0], FRp = [x0 + bw, y0], BR = [x0 + bw + d, y0 - d], BL = [x0 + d, y0 - d];
  var C = [x0 + bw / 2 + d / 2, y0 - d / 2], A = [C[0], C[1] - hh];
  var out = solPoly([A, FRp, BR], "#ffffff") + solPoly([A, FL, FRp], FIG_SHADE);
  out += solLine(FL, BL, true, 1.4) + solLine(BL, BR, true, 1.4) + solLine(A, BL, true, 1.4);
  out += solLine(A, C, true, 1.6);
  out += solT(x0 + bw / 2, y0 + 15, labBase, 12, false);
  out += solT(C[0] - 14, C[1] - hh / 2, labH, 12, false);
  out += solT((A[0] + FRp[0]) / 2 + 16, (A[1] + FRp[1]) / 2, labSlant, 12, false);
  return solSvg(340, 225, out, aria);
}
/* Step built from two boxes: bottom box X by W by H1, top box X2 by W by H2
   flush with the back and the left side. Profile extruded along W. */
function solStep(X, W, H1, X2, H2, labX, labW, labH1, labX2, labH2, aria) {
  var s = Math.min(175 / Math.max(X, 0.01), 115 / Math.max(H1 + H2, 0.01));
  var fw = X * s, fh1 = H1 * s, fh2 = H2 * s, sw = X2 * s, d = Math.min(W * s * 0.5, 40);
  var x0 = (340 - fw - d) / 2, y0 = 192;
  var P = [[x0, y0], [x0 + fw, y0], [x0 + fw, y0 - fh1], [x0 + sw, y0 - fh1], [x0 + sw, y0 - fh1 - fh2], [x0, y0 - fh1 - fh2]];
  var Q = P.map(function (p) { return [p[0] + d, p[1] - d]; });
  var out = solPoly(Q, "#ffffff") + solPoly(P, FIG_SHADE);
  out += solLine(P[4], Q[4]) + solLine(P[5], Q[5]) + solLine(P[3], Q[3]) + solLine(P[2], Q[2]) + solLine(P[1], Q[1]);
  out += solT(x0 + fw / 2, y0 + 15, labX, 12, false);
  out += solT(x0 + sw / 2, y0 - fh1 - fh2 - 12, labX2, 12, false);
  out += solT(x0 - 13, y0 - fh1 - fh2 / 2, labH2, 12, false);
  out += solT(x0 + fw + 13, y0 - fh1 / 2, labH1, 12, false);
  out += solT((P[4][0] + Q[4][0]) / 2 + 6, (P[4][1] + Q[4][1]) / 2 - 12, labW, 12, false);
  return solSvg(340, 225, out, aria);
}
/* Cylinder standing on the top face of a rectangular prism. */
function solCylOnPrism(r, hc, l, w, h, labR, labHc, labL, labW, labH, aria) {
  var s = Math.min(165 / Math.max(l, 0.01), 62 / Math.max(h, 0.01));
  var fw = l * s, fh = h * s, d = Math.min(w * s * 0.5, 40);
  var x0 = (340 - fw - d) / 2, y0 = 205;
  var F = [[x0, y0 - fh], [x0 + fw, y0 - fh], [x0 + fw, y0], [x0, y0]];
  var B = F.map(function (p) { return [p[0] + d, p[1] - d]; });
  var out = solPoly(B, "#ffffff") + solPoly(F, FIG_SHADE);
  out += solLine(F[0], B[0]) + solLine(F[1], B[1]) + solLine(F[2], B[2]);
  var cx = x0 + (fw + d) / 2, topY = y0 - fh - d / 2;
  var cs = Math.min(s, 92 / Math.max(hc, 0.01));
  var rx = Math.min(r * cs, fw * 0.42), hh = hc * cs, ry = Math.max(rx * 0.3, 3.5), cTop = topY - hh;
  out += '<path d="M ' + fmt(cx - rx, 1) + ' ' + fmt(topY, 1) + ' A ' + fmt(rx, 1) + ' ' + fmt(ry, 1) + ' 0 0 0 ' + fmt(cx + rx, 1) + ' ' + fmt(topY, 1) + '" fill="none" stroke="' + FIG_INK + '" stroke-width="2"/>';
  out += solLine([cx - rx, cTop], [cx - rx, topY]) + solLine([cx + rx, cTop], [cx + rx, topY]);
  out += '<ellipse cx="' + fmt(cx, 1) + '" cy="' + fmt(cTop, 1) + '" rx="' + fmt(rx, 1) + '" ry="' + fmt(ry, 1) + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  out += solLine([cx, cTop], [cx + rx, cTop], false, 1.6);
  out += solT(cx + rx / 2, cTop - ry - 10, labR, 12, false);
  out += solT(cx + rx + 16, cTop + hh / 2, labHc, 12, false);
  out += solT(x0 + fw / 2, y0 + 15, labL, 12, false);
  out += solT(x0 - 13, y0 - fh / 2, labH, 12, false);
  out += solT((F[1][0] + B[1][0]) / 2 + 13, (F[1][1] + B[1][1]) / 2 - 4, labW, 12, false);
  return solSvg(340, 235, out, aria);
}
/* Box with a right triangular prism on top, seen as an extruded profile:
   the box profile is W wide and H high, the triangle has base a on the top
   of the box, vertical leg b and hypotenuse c, and both solids share the
   extrusion length L. Pass labW empty when W and a are the same edge. */
function solBoxTri(a, b, c, L, W, H, labA, labB, labC, labL, labW, labH, aria) {
  var s = Math.min(150 / Math.max(W, a, 0.01), 52 / Math.max(H, 0.01), 58 / Math.max(b, 0.01));
  var bw = W * s, bh = H * s, ta = a * s, tb = b * s, d = Math.min(L * s * 0.55, 44);
  var x0 = (340 - bw - d) / 2, y0 = 192;
  var P = [[x0, y0], [x0 + bw, y0], [x0 + bw, y0 - bh], [x0 + ta, y0 - bh], [x0, y0 - bh - tb]];
  var Q = P.map(function (p) { return [p[0] + d, p[1] - d]; });
  var out = solPoly(Q, "#ffffff") + solPoly(P, FIG_SHADE);
  out += solLine(P[2], Q[2]) + solLine(P[3], Q[3]) + solLine(P[4], Q[4]) + solLine(P[0], Q[0]);
  out += solLine(P[3], P[4]);
  if (labW) out += solT(x0 + bw / 2, y0 + 15, labW, 12, false);
  if (labA) out += solT(x0 + ta / 2, y0 - bh - 10, labA, 12, false);
  out += solT(x0 - 13, y0 - bh - tb / 2, labB, 12, false);
  out += solT((P[3][0] + P[4][0]) / 2 + 14, (P[3][1] + P[4][1]) / 2 - 4, labC, 12, false);
  out += solT(x0 + bw + 13, y0 - bh / 2, labH, 12, false);
  out += solT((P[4][0] + Q[4][0]) / 2 + 4, (P[4][1] + Q[4][1]) / 2 - 12, labL, 12, false);
  return solSvg(340, 225, out, aria);
}
/* Cylinder standing on the top rectangular face (a by L) of a right
   triangular prism whose triangle has legs a (top) and b and hypotenuse c. */
function solCylOnTri(a, b, c, L, r, hc, labA, labB, labC, labL, labR, labHc, aria) {
  var s = Math.min(150 / Math.max(a, 0.01), 62 / Math.max(b, 0.01));
  var ta = a * s, tb = b * s, d = Math.min(L * s * 0.55, 44);
  var x0 = (340 - ta - d) / 2, yTop = 118;
  var P = [[x0, yTop], [x0 + ta, yTop], [x0, yTop + tb]];
  var Q = P.map(function (p) { return [p[0] + d, p[1] - d]; });
  var out = solPoly(Q, "#ffffff") + solPoly(P, FIG_SHADE);
  out += solLine(P[0], Q[0]) + solLine(P[1], Q[1]) + solLine(P[2], Q[2]);
  var cx = x0 + ta / 2 + d / 2, baseY = yTop - d / 2;
  var cs = Math.min(s, 62 / Math.max(hc, 0.01));
  var rx = Math.min(r * cs, ta * 0.4), hh = hc * cs, ry = Math.max(rx * 0.3, 3.5), cTop = baseY - hh;
  out += solLine([cx - rx, cTop], [cx - rx, baseY]) + solLine([cx + rx, cTop], [cx + rx, baseY]);
  out += '<ellipse cx="' + fmt(cx, 1) + '" cy="' + fmt(cTop, 1) + '" rx="' + fmt(rx, 1) + '" ry="' + fmt(ry, 1) + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  out += solLine([cx, cTop], [cx + rx, cTop], false, 1.6);
  out += solT(cx + rx / 2, cTop - ry - 10, labR, 12, false);
  out += solT(cx + rx + 16, cTop + hh / 2, labHc, 12, false);
  out += solT(x0 + ta / 2, yTop + tb + 16, labA, 12, false);
  out += solT(x0 - 13, yTop + tb / 2, labB, 12, false);
  out += solT((P[1][0] + P[2][0]) / 2 + 15, (P[1][1] + P[2][1]) / 2, labC, 12, false);
  out += solT((P[0][0] + Q[0][0]) / 2 + 4, (P[0][1] + Q[0][1]) / 2 - 12, labL, 12, false);
  return solSvg(340, 235, out, aria);
}
/* Plan view of a large box top (bl by bw) with the p by q overlap rectangle
   shaded in one corner. */
function solOverlapPlan(bl, bw, p, q, labP, labQ, labBL, labBW, aria) {
  var s = Math.min(225 / Math.max(bl, 0.01), 135 / Math.max(bw, 0.01));
  var W = bl * s, H = bw * s, x0 = (340 - W) / 2 - 8, y0 = (215 - H) / 2;
  var out = solPoly([[x0, y0], [x0 + W, y0], [x0 + W, y0 + H], [x0, y0 + H]], "#ffffff");
  out += solPoly([[x0, y0], [x0 + p * s, y0], [x0 + p * s, y0 + q * s], [x0, y0 + q * s]], FIG_SHADE);
  out += solT(x0 + W / 2, y0 + H + 15, labBL, 12, false);
  out += solT(x0 + W + 14, y0 + H / 2, labBW, 12, false);
  out += solT(x0 + p * s / 2, y0 + q * s + 13, labP, 11, false);
  out += solT(x0 + p * s + 13, y0 + q * s / 2, labQ, 11, false);
  return solSvg(340, 215, out, aria);
}
/* One or more shadow triangles on a shared ground line. Each item:
   {name, h (height value), s (shadow value), hLab, sLab}. */
function solShadowFig(items, aria) {
  var maxS = 0, maxH = 0, totS = 0;
  items.forEach(function (it) { maxS = Math.max(maxS, it.s); maxH = Math.max(maxH, it.h); totS += it.s; });
  var sc = Math.min(290 / Math.max(totS, 0.01), 118 / Math.max(maxH, 0.01));
  var y0 = 188, x = (340 - totS * sc) / 2, out = "";
  out += solLine([18, y0], [322, y0], false, 2);
  items.forEach(function (it) {
    var w = it.s * sc, hh = it.h * sc;
    out += solPoly([[x, y0], [x + w, y0], [x, y0 - hh]], FIG_SHADE);
    if (it.name) out += solT(x + 4, y0 - hh - 11, it.name, 11, true);
    out += solT(x - 12, y0 - hh / 2, it.hLab, 11, false);
    out += solT(x + w / 2, y0 + 14, it.sLab, 11, false);
    x += w + 8;
  });
  return solSvg(340, 215, out, aria);
}
/* Horizontal length bars, one per row: {name, len, lab}. Bars share one
   scale so their lengths compare honestly. */
function solBarsFig(rows, aria) {
  var maxL = 0;
  rows.forEach(function (r) { maxL = Math.max(maxL, r.len); });
  var sc = 195 / Math.max(maxL, 0.01), out = "", y = 34;
  rows.forEach(function (r) {
    if (r.name) out += '<text x="86" y="' + fmt(y + 8, 1) + '" font-size="12" fill="' + FIG_INK + '" text-anchor="end" dominant-baseline="central" font-weight="bold">' + r.name + '</text>';
    out += '<rect x="92" y="' + fmt(y, 1) + '" width="' + fmt(Math.max(r.len * sc, 2), 1) + '" height="15" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
    out += solT(92 + r.len * sc + 16, y + 8, r.lab, 12, false);
    y += 42;
  });
  return solSvg(340, Math.max(y + 6, 80), out, aria);
}
/* Two rectangles side by side with width and height labels and captions:
   {w1,h1,wLab1,hLab1,cap1, w2,h2,wLab2,hLab2,cap2}. */
function solRectPair(o) {
  var mx = Math.max(o.w1, o.w2), mh = Math.max(o.h1, o.h2);
  var sc = Math.min(125 / Math.max(mx, 0.01), 105 / Math.max(mh, 0.01));
  function rect(x0, yBase, w, h, wLab, hLab, cap) {
    var fw = w * sc, fh = h * sc, out = "";
    out += solPoly([[x0, yBase - fh], [x0 + fw, yBase - fh], [x0 + fw, yBase], [x0, yBase]], FIG_SHADE);
    out += solT(x0 + fw / 2, yBase - fh - 12, wLab, 12, false);
    out += solT(x0 + fw + 14, yBase - fh / 2, hLab, 12, false);
    if (cap) out += solT(x0 + fw / 2, yBase + 16, cap, 12, true);
    return out;
  }
  var out = rect(28, 168, o.w1, o.h1, o.wLab1, o.hLab1, o.cap1);
  out += rect(185, 168, o.w2, o.h2, o.wLab2, o.hLab2, o.cap2);
  return solSvg(340, 205, out, o.aria);
}
/* A quadrilateral built from four side lengths in order, fitted into the
   box (bx, by, bw, bh) in screen coordinates. Returns null when no
   quadrilateral with those sides exists. */
function solQuadPts(sides, bx, by, bw, bh) {
  var s0 = sides[0], s1 = sides[1], s2 = sides[2], s3 = sides[3];
  var lo = Math.max(Math.abs(s0 - s1), Math.abs(s2 - s3)) + 0.25, hi = Math.min(s0 + s1, s2 + s3) - 0.25;
  if (lo >= hi) return null;
  var d = (lo + hi) / 2;
  var cx = (s0 * s0 + d * d - s1 * s1) / (2 * s0);
  var cy = Math.sqrt(Math.max(d * d - cx * cx, 0.0001));
  var A = [0, 0], B = [s0, 0], C = [cx, cy];
  var ux = cx / d, uy = cy / d;
  var px = (s3 * s3 - s2 * s2 + d * d) / (2 * d), py = Math.sqrt(Math.max(s3 * s3 - px * px, 0.0001));
  var D = [px * ux - py * uy, px * uy + py * ux];
  var crossB = cx * B[1] - cy * B[0], crossD = cx * D[1] - cy * D[0];
  if (crossB * crossD > 0) D = [px * ux + py * uy, px * uy - py * ux];
  var pts = [A, B, C, D];
  var xs = pts.map(function (p) { return p[0]; }), ys = pts.map(function (p) { return p[1]; });
  var w = Math.max.apply(null, xs) - Math.min.apply(null, xs), h = Math.max.apply(null, ys) - Math.min.apply(null, ys);
  var sc = Math.min(bw / Math.max(w, 0.01), bh / Math.max(h, 0.01));
  var ccx = (Math.max.apply(null, xs) + Math.min.apply(null, xs)) / 2, ccy = (Math.max.apply(null, ys) + Math.min.apply(null, ys)) / 2;
  return pts.map(function (p) { return [bx + bw / 2 + (p[0] - ccx) * sc, by + bh / 2 - (p[1] - ccy) * sc]; });
}
function solSideLabels(P, labs) {
  var G = [0, 0];
  P.forEach(function (p) { G[0] += p[0] / P.length; G[1] += p[1] / P.length; });
  var out = "";
  for (var i = 0; i < P.length; i++) {
    var M = [(P[i][0] + P[(i + 1) % P.length][0]) / 2, (P[i][1] + P[(i + 1) % P.length][1]) / 2];
    var dx = M[0] - G[0], dy = M[1] - G[1], dl = Math.sqrt(dx * dx + dy * dy) || 1;
    if (labs[i]) out += solT(M[0] + dx / dl * 13, M[1] + dy / dl * 13, labs[i], 11, false);
  }
  return out;
}

/* Tranche 5 (Nov 2026): the square-area model for the Unit 2 root
   entries. A square outline with the area labelled inside and a side
   label under the bottom edge; whichever of the two is unknown is
   passed as "?", so the figure states the given and never the key. */
function solSquare(areaLab, sideLab, aria) {
  var s = '<svg viewBox="0 0 200 172" width="200" height="172" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + aria + '">';
  s += '<rect x="45" y="14" width="110" height="110" fill="#eceff1" stroke="#37474f" stroke-width="2"/>';
  s += solT(100, 69, areaLab, 14, true);
  s += solT(100, 146, sideLab, 13, false);
  return s + "</svg>";
}

/* ----- bank-u1.js ----- */
// Math 9 Unit 1 Rational Numbers question bank
// Cut verbatim from the standalone bank source
// (math-9-review/bank-src.js, lines 21 to 323).
// CRMARKS: u1-frac-context=3
// CRMARKS: u1-money-decimals=3
// CRMARKS: u1-ooo-evaluate-mc=3
// CRMARKS: u1-ooo-calculator=2
// CRMARKS: u1-ordering-reasoning-var=2
// CRMARKS: u1-multistep-rational=3
// BIMODAL: u1-ordering-reasoning-var=a
// BIMODAL: u1-ooo-evaluate-mc=a
/* Unit 1: Rational Numbers */
// Unit 1: Rational Numbers (Math 9, NL). Entries only; helpers prefixed u1.
function u1gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
function u1red(n, d) { var g = u1gcd(n, d); return [n / g, d / g]; }
function u1frac(n, d) { var r = u1red(n, d); n = r[0]; d = r[1]; if (d === 1) return "\\(" + n + "\\)"; if (n < 0) return "\\(-" + FR(-n, d) + "\\)"; return "\\(" + FR(n, d) + "\\)"; }
function u1round(x, p) { var m = Math.pow(10, p); return Math.round(x * m) / m; }

// 1. L1, 3.1: order four rational numbers, least to greatest.
E("u1-order-four", 1, ["3.1"], 1, "gen", function () {
  var negPool = [
    { v: -2.5, f: "-" + FR(5, 2) }, { v: -1.75, f: "-" + FR(7, 4) }, { v: -1.5, f: "-" + FR(3, 2) },
    { v: -1.25, f: "-" + FR(5, 4) }, { v: -1.2, f: "-" + FR(6, 5) }, { v: -0.8, f: "-" + FR(4, 5) },
    { v: -0.75, f: "-" + FR(3, 4) }, { v: -0.5, f: "-" + FR(1, 2) }, { v: -0.4, f: "-" + FR(2, 5) },
    { v: -0.25, f: "-" + FR(1, 4) }
  ];
  var posPool = [
    { v: 0.2, f: FR(1, 5) }, { v: 0.25, f: FR(1, 4) }, { v: 0.4, f: FR(2, 5) }, { v: 0.5, f: FR(1, 2) },
    { v: 0.6, f: FR(3, 5) }, { v: 0.75, f: FR(3, 4) }, { v: 0.8, f: FR(4, 5) }, { v: 1.25, f: FR(5, 4) },
    { v: 1.5, f: FR(3, 2) }, { v: 1.75, f: FR(7, 4) }, { v: 2.25, f: FR(9, 4) }, { v: 2.5, f: FR(5, 2) },
    { v: 3.5, f: FR(7, 2) }
  ];
  var nNeg = ri(1, 2);
  var items = shuffle(negPool).slice(0, nNeg).concat(shuffle(posPool).slice(0, 4 - nNeg));
  items.forEach(function (it) { it.s = "\\(" + (Math.random() < 0.5 ? it.f : fmt(it.v)) + "\\)"; });
  var sorted = items.slice().sort(function (a, b) { return a.v - b.v; });
  function listOf(arr) { return arr.map(function (it) { return it.s; }).join(", "); }
  var correct = listOf(sorted);
  var rev = listOf(sorted.slice().reverse());
  var swapArr = sorted.slice(); var tmp = swapArr[0]; swapArr[0] = swapArr[1]; swapArr[1] = tmp;
  var swapped = listOf(swapArr);
  var shuf = listOf(shuffle(sorted));
  var guard = 0;
  while ((shuf === correct || shuf === rev || shuf === swapped) && guard < 60) { shuf = listOf(shuffle(sorted)); guard++; }
  if (shuf === correct || shuf === rev || shuf === swapped) { var s2 = sorted.slice(); var t2 = s2[2]; s2[2] = s2[3]; s2[3] = t2; shuf = listOf(s2); }
  var prompt = "Which set is ordered from least to greatest?";
  var solution = "Compare the values as decimals: \\[ \\begin{aligned} " + sorted.map(function (it) { return fmt(it.v); }).join(" &< ") + " \\end{aligned} \\] So the order from least to greatest is <b>" + correct + "</b>.";
  return mcq(prompt,
    { t: correct, fb: "Correct. The values increase steadily from left to right." },
    [
      { t: rev, fb: "This lists the numbers from greatest to least instead." },
      { t: swapped, fb: "The first two values are swapped, so it starts out of order." },
      { t: shuf, fb: "At least one pair in this list is out of order." }
    ],
    solution, { mode: "order-four", vals: sorted.map(function (it) { return it.v; }).join(",") });
}, ["Picture the numbers on a number line, with negatives on the left.", "Rewrite each fraction as a decimal, then compare the decimals."]);

// 2. L1, 3.2: a rational number between two given numbers.
E("u1-between-two", 1, ["3.2"], 1, "gen", function () {
  if (Math.random() < 0.5) {
    var a = ri(-20, 24) / 4;
    var gap = ri(3, 10) / 4;
    var b = a + gap;
    var c = a + gap / 2;
    var low = a - ri(1, 4) / 4;
    var high = b + ri(1, 4) / 4;
    var promptD = "Which number is between \\(" + fmt(a) + "\\) and \\(" + fmt(b) + "\\)?";
    var solD = "The number must be greater than \\(" + fmt(a) + "\\) and less than \\(" + fmt(b) + "\\): \\[ \\begin{aligned} " + fmt(a) + " &< " + fmt(c) + " < " + fmt(b) + " \\end{aligned} \\] So the number between them is <b>\\(" + fmt(c) + "\\)</b>.";
    return mcq(promptD,
      { t: fmt(c), fb: "Correct. It is greater than the left endpoint and less than the right one." },
      fmtPairDs(fmt(c), [
        { v: low, fb: "That number is smaller than the left endpoint." },
        { v: high, fb: "That number is larger than the right endpoint." },
        { v: a, fb: "That is the left endpoint itself, not a number between them." }
      ]),
      solD, { mode: "between-dec", a: a, b: b });
  }
  var den = pick([6, 8, 10, 12]);
  var an = ri(-12, 12);
  var diff = ri(4, 10);
  var bn = an + diff;
  var cn = an + ri(1, diff - 1);
  var lowN = an - ri(1, 4);
  var highN = bn + ri(1, 4);
  var promptF = "Which number is between " + u1frac(an, den) + " and " + u1frac(bn, den) + "?";
  var solF = "With a common denominator, compare the numerators: \\[ \\begin{aligned} " + FR(an, den) + " &< " + FR(cn, den) + " < " + FR(bn, den) + " \\end{aligned} \\] So the number between them is <b>" + u1frac(cn, den) + "</b>.";
  return mcq(promptF,
    { t: u1frac(cn, den), fb: "Correct. Its numerator sits between the two given numerators." },
    [
      { t: u1frac(lowN, den), fb: "That number is smaller than the left endpoint." },
      { t: u1frac(highN, den), fb: "That number is larger than the right endpoint." },
      { t: u1frac(an, den), fb: "That is the left endpoint itself, not a number between them." }
    ],
    solF, { mode: "between-frac", a: an, b: bn, d: den });
}, ["A number between two others is bigger than the smaller one and smaller than the bigger one.", "Compare each choice with both endpoints, one at a time."]);

// 3. L2, 6.1, CR 3: add or subtract fractions in context, answer as a decimal.
E("u1-frac-context", 1, ["6.1"], 1, "gen", function () {
  var dens = [2, 4, 5, 8, 10, 20];
  var d1 = pick(dens), d2 = pick(dens);
  var n1 = ri(1, 15), n2 = ri(1, 15);
  var v1 = n1 / d1, v2 = n2 / d2;
  var sub = Math.random() < 0.5;
  if (sub && v2 > v1) { var tn = n1; n1 = n2; n2 = tn; var td = d1; d1 = d2; d2 = td; v1 = n1 / d1; v2 = n2 / d2; }
  if (sub && Math.abs(v1 - v2) < 0.01) { n1 += d1; v1 = n1 / d1; }
  var ctxs = ["cups of flour", "metres of ribbon", "litres of juice"];
  var thing = pick(ctxs);
  var ans = u1round(sub ? v1 - v2 : v1 + v2, 4);
  var lcm = (d1 * d2) / u1gcd(d1, d2);
  var e1 = n1 * (lcm / d1), e2 = n2 * (lcm / d2);
  var resN = sub ? e1 - e2 : e1 + e2;
  var prompt = sub
    ? "A project starts with " + u1frac(n1, d1) + " " + thing + ". Then " + u1frac(n2, d2) + " " + thing + " is used. How much is left? Give your answer as a decimal."
    : "A project uses " + u1frac(n1, d1) + " " + thing + " in the morning and " + u1frac(n2, d2) + " " + thing + " in the afternoon. How much is used in total? Give your answer as a decimal.";
  var solution = "Use the common denominator \\(" + lcm + "\\): \\[ \\begin{aligned} " + FR(n1, d1) + (sub ? " - " : " + ") + FR(n2, d2) + " &= " + FR(e1, lcm) + (sub ? " - " : " + ") + FR(e2, lcm) + " \\\\ &= " + FR(resN, lcm) + " = " + fmt(ans) + " \\end{aligned} \\] So the answer is <b>" + fmt(ans) + "</b>.";
  return numq(prompt, ans, 0.01, solution, { mode: sub ? "sub-frac-ctx" : "add-frac-ctx", a: n1, b: d1, c: n2, d: d2 });
}, ["Fractions with different denominators need a common denominator first.", "Rewrite both fractions with the least common denominator, then combine the numerators."]);

// 4. L2, 6.1, CR 3: money with decimals, total cost or change.
E("u1-money-decimals", 1, ["6.1"], 1, "gen", function () {
  var items = [["notebook", "pen", "snack bar"], ["juice box", "muffin", "apple"], ["poster", "marker set", "sticker pack"], ["bus pass top-up", "coffee", "sandwich"]];
  var set = pick(items);
  if (Math.random() < 0.5) {
    var p1 = ri(125, 2499), p2 = ri(125, 2499), p3 = ri(99, 1999);
    var tot = (p1 + p2 + p3) / 100;
    var promptT = "Sam buys a " + set[0] + " for $" + (p1 / 100).toFixed(2) + ", a " + set[1] + " for $" + (p2 / 100).toFixed(2) + ", and a " + set[2] + " for $" + (p3 / 100).toFixed(2) + ". What is the total cost, in dollars?";
    var solT = "Add the three prices: \\[ \\begin{aligned} " + (p1 / 100).toFixed(2) + " + " + (p2 / 100).toFixed(2) + " + " + (p3 / 100).toFixed(2) + " &= " + tot.toFixed(2) + " \\end{aligned} \\] So the total cost is <b>$" + tot.toFixed(2) + "</b>.";
    return numq(promptT, u1round(tot, 2), 0.005, solT, { mode: "money-total", p1: p1, p2: p2, p3: p3 });
  }
  var bill = pick([20, 50, 100]);
  var cost = ri(350, bill * 100 - 250);
  var change = (bill * 100 - cost) / 100;
  var promptC = "A school hoodie costs $" + (cost / 100).toFixed(2) + ". Priya pays with a $" + bill + " bill. How much change does she get, in dollars?";
  var solC = "Subtract the cost from the amount paid: \\[ \\begin{aligned} " + bill.toFixed(2) + " - " + (cost / 100).toFixed(2) + " &= " + change.toFixed(2) + " \\end{aligned} \\] So the change is <b>$" + change.toFixed(2) + "</b>.";
  return numq(promptC, u1round(change, 2), 0.005, solC, { mode: "money-change", bill: bill, cost: cost });
}, ["Line up the decimal points before you add or subtract money amounts.", "Work in dollars and cents, keeping two decimal places for cents."]);

// 5. L2, 6.2, CR 3: order of operations without technology, MC with complete-instruction prompt.
E("u1-ooo-evaluate-mc", 1, ["6.2"], 2, "gen", function () {
  var mode = ri(0, 2);
  var expr, val, errs, steps;
  if (mode === 0) {
    var x = ri(4, 24) / 2, y = ri(2, 16) / 2, c = ri(2, 6), d = ri(2, 20) / 2;
    val = (x + y) * c - d;
    expr = "\\((" + fmt(x) + " + " + fmt(y) + ") \\times " + c + " - " + fmt(d) + "\\)";
    errs = [
      { v: x + y * c - d, fb: "This ignores the brackets and multiplies before adding inside them." },
      { v: (x + y) * (c - d), fb: "This groups the subtraction with the multiplication, which changes the order." },
      { v: (x + y) * c + d, fb: "This adds the last number instead of subtracting it." }
    ];
    steps = "\\[ \\begin{aligned} (" + fmt(x) + " + " + fmt(y) + ") \\times " + c + " - " + fmt(d) + " &= " + fmt(x + y) + " \\times " + c + " - " + fmt(d) + " \\\\ &= " + fmt((x + y) * c) + " - " + fmt(d) + " \\\\ &= " + fmt(val) + " \\end{aligned} \\]";
  } else if (mode === 1) {
    var a = ri(5, 40) / 2, b = ri(2, 12) / 2, k = ri(3, 9);
    val = a + b * k;
    expr = "\\(" + fmt(a) + " + " + fmt(b) + " \\times " + k + "\\)";
    errs = [
      { v: (a + b) * k, fb: "This adds first, but multiplication is done before addition." },
      { v: a + b + k, fb: "This changes the multiplication into an addition." },
      { v: a * b + k, fb: "This multiplies the first two numbers, which are not grouped together." }
    ];
    steps = "\\[ \\begin{aligned} " + fmt(a) + " + " + fmt(b) + " \\times " + k + " &= " + fmt(a) + " + " + fmt(b * k) + " \\\\ &= " + fmt(val) + " \\end{aligned} \\]";
  } else {
    var fn = pick([1, 3]), fd = pick([2, 4]);
    var fv = fn / fd, bb = ri(5, 14), cc = ri(1, 4), dd = ri(2, 20) / 2;
    val = u1round(fv * (bb - cc) + dd, 4);
    expr = "\\(" + FR(fn, fd) + " \\times (" + bb + " - " + cc + ") + " + fmt(dd) + "\\)";
    errs = [
      { v: u1round(fv * bb - cc + dd, 4), fb: "This ignores the brackets and multiplies before subtracting inside them." },
      { v: u1round(fv * (bb - cc) - dd, 4), fb: "This subtracts the last number instead of adding it." },
      { v: u1round((fv + bb - cc) + dd, 4), fb: "This adds the first numbers instead of multiplying by the fraction." }
    ];
    steps = "\\[ \\begin{aligned} " + FR(fn, fd) + " \\times (" + bb + " - " + cc + ") + " + fmt(dd) + " &= " + FR(fn, fd) + " \\times " + (bb - cc) + " + " + fmt(dd) + " \\\\ &= " + fmt(u1round(fv * (bb - cc), 4)) + " + " + fmt(dd) + " \\\\ &= " + fmt(val) + " \\end{aligned} \\]";
  }
  var ds = [];
  var used = {};
  used[fmt(val)] = 1;
  errs.forEach(function (e) { var key = fmt(u1round(e.v, 4)); if (!used[key] && ds.length < 3) { used[key] = 1; ds.push({ t: key, fb: e.fb }); } });
  var offs = [2, -2, 1, -1, 3, -3, 0.5, -0.5];
  var oi = 0;
  while (ds.length < 3 && oi < offs.length) { var cand = u1round(val + offs[oi], 4); oi++; var k2 = fmt(cand); if (!used[k2]) { used[k2] = 1; ds.push({ t: k2, fb: "This comes from an arithmetic slip in one of the steps." }); } }
  ds = fmtPairDs(fmt(val), ds.map(function (d) { return { v: parseFloat(d.t), fb: d.fb }; }));
  var prompt = "Evaluate: " + expr;
  var solution = "Follow the order of operations, brackets first, then multiplication, then addition and subtraction: " + steps + " So the value is <b>" + fmt(val) + "</b>.";
  return mcq(prompt,
    { t: fmt(val), fb: "Correct. Brackets first, then multiplication, then addition and subtraction." },
    ds, solution, { mode: "ooo-mc-" + mode, val: val });
}, ["Do brackets first, then multiplication and division, then addition and subtraction.", "Rewrite the expression after each single step so the order stays clear."]);

// 6. L2, 6.3, CR 2: order of operations with technology, longer decimal expression.
E("u1-ooo-calculator", 1, ["6.3"], 1, "gen", function () {
  var a = ri(20, 200) / 10, b = ri(10, 90) / 10, c = ri(2, 9), d = ri(5, 50) / 10;
  var e = pick([2, 4, 5]);
  var f = ri(5, 60) / 10;
  var s1 = a + b, s2 = s1 * c, s3 = s2 - d, s4 = s3 / e, val = s4 + f;
  var ans = u1round(val, 2);
  var expr = "\\(((" + fmt(a) + " + " + fmt(b) + ") \\times " + c + " - " + fmt(d) + ") \\div " + e + " + " + fmt(f) + "\\)";
  var prompt = "Use a calculator to evaluate the expression in one full entry: " + expr + " Give your answer to 2 decimal places.";
  var solution = "Work through the brackets first, keeping full precision until the end: \\[ \\begin{aligned} ((" + fmt(a) + " + " + fmt(b) + ") \\times " + c + " - " + fmt(d) + ") \\div " + e + " + " + fmt(f) + " &= (" + fmt(s2) + " - " + fmt(d) + ") \\div " + e + " + " + fmt(f) + " \\\\ &= " + fmt(u1round(s4, 4)) + " + " + fmt(f) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the value is <b>" + fmt(ans) + "</b>.";
  return numq(prompt, ans, 0.01, solution, { mode: "ooo-calc", a: a, b: b, c: c, d: d, e: e, f: f });
}, ["Enter the whole expression at once, using bracket keys around grouped parts.", "Do the innermost brackets first if you check the value in stages."]);

// 7. L2, 6.4, CR 2: find the first error in a worked solution, MC.
E("u1-ooo-first-error", 1, ["6.4"], 2, "gen", function () {
  var scen = ri(0, 3);
  var expr, stepTexts, errIdx, correctVal, errExplain;
  if (scen === 0) {
    var a0 = ri(2, 9), b0 = ri(2, 9), c0 = ri(2, 6), d0 = ri(1, 8);
    var M0 = b0 * c0, S0 = a0 + M0, F0 = S0 - d0;
    expr = "\\((" + a0 + " + " + b0 + ") \\times " + c0 + " - " + d0 + "\\)";
    stepTexts = ["\\(" + b0 + " \\times " + c0 + " = " + M0 + "\\)", "\\(" + a0 + " + " + M0 + " = " + S0 + "\\)", "\\(" + S0 + " - " + d0 + " = " + F0 + "\\)", "the value is \\(" + F0 + "\\)"];
    errIdx = 0; correctVal = (a0 + b0) * c0 - d0;
    errExplain = "Step 1 multiplies before doing the brackets, but brackets come first";
  } else if (scen === 1) {
    var m1 = ri(2, 8), p1 = ri(2, 9), q1 = ri(1, 9), r1 = ri(1, 9);
    var S1 = p1 + q1, W1 = m1 + S1, F1 = W1 - r1;
    expr = "\\(" + m1 + " \\times (" + p1 + " + " + q1 + ") - " + r1 + "\\)";
    stepTexts = ["\\(" + p1 + " + " + q1 + " = " + S1 + "\\)", "\\(" + m1 + " + " + S1 + " = " + W1 + "\\)", "\\(" + W1 + " - " + r1 + " = " + F1 + "\\)", "the value is \\(" + F1 + "\\)"];
    errIdx = 1; correctVal = m1 * S1 - r1;
    errExplain = "Step 2 adds where the expression says to multiply";
  } else if (scen === 2) {
    var a2 = ri(3, 12), b2 = ri(2, 9), c2 = ri(2, 6), d2 = ri(1, 9);
    var M2 = b2 * c2, S2 = a2 + M2, W2 = S2 + d2;
    expr = "\\(" + a2 + " + " + b2 + " \\times " + c2 + " - " + d2 + "\\)";
    stepTexts = ["\\(" + b2 + " \\times " + c2 + " = " + M2 + "\\)", "\\(" + a2 + " + " + M2 + " = " + S2 + "\\)", "\\(" + S2 + " + " + d2 + " = " + W2 + "\\)", "the value is \\(" + W2 + "\\)"];
    errIdx = 2; correctVal = S2 - d2;
    errExplain = "Step 3 adds where the expression says to subtract";
  } else {
    var a3 = ri(2, 9), b3 = ri(2, 8), c3 = ri(1, 10), d3 = ri(1, 10);
    var P3 = a3 * b3, S3 = P3 - c3, F3 = S3 + d3, W3 = F3 + pick([2, 3, 4]);
    expr = "\\(" + a3 + " \\times " + b3 + " - " + c3 + " + " + d3 + "\\)";
    stepTexts = ["\\(" + a3 + " \\times " + b3 + " = " + P3 + "\\)", "\\(" + P3 + " - " + c3 + " = " + S3 + "\\)", "\\(" + S3 + " + " + d3 + " = " + F3 + "\\)", "the value is \\(" + W3 + "\\)"];
    errIdx = 3; correctVal = F3;
    errExplain = "Step 4 states a value that does not match the result of Step 3";
  }
  var prompt = "A student evaluates " + expr + ". Their work is shown. Step 1: " + stepTexts[0] + ". Step 2: " + stepTexts[1] + ". Step 3: " + stepTexts[2] + ". Step 4: " + stepTexts[3] + ". In which step does the first error occur?";
  var opts = [0, 1, 2, 3].map(function (i) {
    var fb;
    if (i === errIdx) fb = "Correct. " + errExplain + ".";
    else if (i < errIdx) fb = "This step is correct, so the first error is later.";
    else fb = "This step follows from the earlier wrong value, so it is not the first error.";
    return { t: "Step " + (i + 1), fb: fb };
  });
  var correctOpt = opts[errIdx];
  var distractors = opts.filter(function (o, i) { return i !== errIdx; });
  var solution = errExplain + ". Done correctly, the expression has value \\(" + fmt(correctVal) + "\\). So the first error is in <b>Step " + (errIdx + 1) + "</b>.";
  return mcq(prompt, correctOpt, distractors, solution, { mode: "first-error-" + scen, err: errIdx + 1 });
}, ["Check each step against the order of operations, starting at Step 1.", "A later step can look wrong only because it uses an earlier wrong value."]);

// 8. L3, 3.1 and 3.2, CR 2: varset of three MC statics.
E("u1-ordering-reasoning-var", 1, ["3.1", "3.2"], 3, "var", varset([
  function () {
    var prompt = "What number is exactly halfway between " + u1frac(-3, 4) + " and " + u1frac(1, 2) + "?";
    var solution = "Add the two numbers, then divide by 2: \\[ \\begin{aligned} -" + FR(3, 4) + " + " + FR(1, 2) + " &= -" + FR(1, 4) + " \\\\ -" + FR(1, 4) + " \\div 2 &= -" + FR(1, 8) + " \\end{aligned} \\] So the halfway number is <b>\\(-" + FR(1, 8) + "\\)</b>.";
    return mcq(prompt,
      { t: "\\(-" + FR(1, 8) + "\\)", fb: "Correct. It is the average of the two endpoints." },
      [
        { t: "\\(-" + FR(1, 4) + "\\)", fb: "That is the sum of the endpoints, before dividing by 2." },
        { t: "\\(" + FR(1, 8) + "\\)", fb: "The sign is wrong, since the halfway point is still negative." },
        { t: "\\(-" + FR(5, 8) + "\\)", fb: "That point sits much closer to the lower endpoint." }
      ],
      solution, { mode: "halfway-neg-frac" });
  },
  function () {
    var prompt = "Numbers are equally spaced on a number line and are shown in order: \\(-0.9, -0.3, ?, 0.9\\). What is the missing number?";
    var solution = "Each step adds \\(0.6\\): \\[ \\begin{aligned} -0.9 + 0.6 &= -0.3 \\\\ -0.3 + 0.6 &= 0.3 \\\\ 0.3 + 0.6 &= 0.9 \\end{aligned} \\] So the missing number is <b>0.3</b>.";
    return mcq(prompt,
      { t: "0.3", fb: "Correct. Each step along the number line adds 0.6." },
      [
        { t: "0.0", fb: "Zero would make the steps uneven, since the gaps would differ." },
        { t: "0.6", fb: "That skips one step, giving a gap of 0.9 before it." },
        { t: "-0.6", fb: "The numbers are increasing, so the missing number is positive." }
      ],
      solution, { mode: "missing-spaced" });
  },
  function () {
    var prompt = "A set of numbers is \\(-" + FR(2, 3) + ", 0.\\overline{3}, -0.5, " + FR(3, 4) + "\\). What is the sum of the greatest and least numbers in the set?";
    var solution = "The greatest number is \\(" + FR(3, 4) + "\\) and the least is \\(-" + FR(2, 3) + "\\), since \\(-" + FR(2, 3) + "\\) is less than \\(-0.5\\): \\[ \\begin{aligned} " + FR(3, 4) + " + \\left(-" + FR(2, 3) + "\\right) &= " + FR(9, 12) + " - " + FR(8, 12) + " \\\\ &= " + FR(1, 12) + " \\end{aligned} \\] So the sum is <b>\\(" + FR(1, 12) + "\\)</b>.";
    return mcq(prompt,
      { t: "\\(" + FR(1, 12) + "\\)", fb: "Correct. The greatest and least are the two end values of the set." },
      [
        { t: "\\(-" + FR(1, 12) + "\\)", fb: "The sign is wrong, since the positive value has the larger size." },
        { t: "\\(" + FR(17, 12) + "\\)", fb: "That is the difference between the greatest and least, not their sum." },
        { t: "\\(" + FR(1, 4) + "\\)", fb: "That adds the greatest number to negative one half instead of the least." }
      ],
      solution, { mode: "sum-greatest-least" });
  }
]), ["For a halfway value, average the two endpoints.", "Compare every value in a set, watching signs and repeating decimals, before choosing."]);

// 9. L3, 6.1, CR 3: multi-step problem, numq.
E("u1-multistep-rational", 1, ["6.1"], 3, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var start = ri(-160, 80) / 4, r1 = ri(2, 20) / 4, f1 = ri(2, 16) / 4, r2 = ri(2, 12) / 4;
    var ans = u1round(start + r1 - f1 + r2, 4);
    var promptT = "At 6 a.m. the temperature in St. John's is " + fmt(start) + " degrees. By noon it rises by " + fmt(r1) + " degrees, by 6 p.m. it falls by " + fmt(f1) + " degrees, and by midnight it rises by " + fmt(r2) + " degrees. Determine the temperature at midnight, in degrees.";
    var solT = "Apply each change in order: \\[ \\begin{aligned} " + fmt(start) + " + " + fmt(r1) + " - " + fmt(f1) + " + " + fmt(r2) + " &= " + fmt(u1round(start + r1, 4)) + " - " + fmt(f1) + " + " + fmt(r2) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the temperature at midnight is <b>" + fmt(ans) + " degrees</b>.";
    return numq(promptT, ans, 0.01, solT, { mode: "temp-change", start: start });
  }
  if (mode === 1) {
    var startC = ri(2000, 20000), depC = ri(500, 8000), w1C = ri(400, 6000), w2C = ri(300, 5000);
    var ansB = u1round((startC + depC - w1C - w2C) / 100, 2);
    var promptB = "A bank account starts with $" + (startC / 100).toFixed(2) + ". A deposit of $" + (depC / 100).toFixed(2) + " is made, then withdrawals of $" + (w1C / 100).toFixed(2) + " and $" + (w2C / 100).toFixed(2) + " are made. Determine the final balance, in dollars.";
    var solB = "Add the deposit and subtract both withdrawals: \\[ \\begin{aligned} " + (startC / 100).toFixed(2) + " + " + (depC / 100).toFixed(2) + " - " + (w1C / 100).toFixed(2) + " - " + (w2C / 100).toFixed(2) + " &= " + ((startC + depC) / 100).toFixed(2) + " - " + (w1C / 100).toFixed(2) + " - " + (w2C / 100).toFixed(2) + " \\\\ &= " + ansB.toFixed(2) + " \\end{aligned} \\] So the final balance is <b>$" + ansB.toFixed(2) + "</b>.";
    return numq(promptB, ansB, 0.01, solB, { mode: "bank-balance", start: startC });
  }
  var dens = [2, 4, 5, 8, 10];
  var dA = pick(dens), dB = pick(dens), dC = pick(dens);
  var nA = ri(3, 30), nB = ri(3, 30), nC = ri(3, 30);
  var ansD = u1round(nA / dA + nB / dB + nC / dC, 4);
  var promptD = "On a three day hike, a group walks " + u1frac(nA, dA) + " km on day 1, " + u1frac(nB, dB) + " km on day 2, and " + u1frac(nC, dC) + " km on day 3. Determine the total distance walked, in kilometres, as a decimal.";
  var solD = "Add the three distances as decimals: \\[ \\begin{aligned} " + FR(nA, dA) + " + " + FR(nB, dB) + " + " + FR(nC, dC) + " &= " + fmt(u1round(nA / dA, 4)) + " + " + fmt(u1round(nB / dB, 4)) + " + " + fmt(u1round(nC / dC, 4)) + " \\\\ &= " + fmt(ansD) + " \\end{aligned} \\] So the total distance is <b>" + fmt(ansD) + " km</b>.";
  return numq(promptD, ansD, 0.01, solD, { mode: "distance-3day", a: nA, b: nB, c: nC });
}, ["Break the problem into one change or part at a time, in order.", "Start from the opening value and apply each step before moving to the next."]);

/* ----- bank-u2.js ----- */
// Math 9 Unit 2 Square Roots and Surface Area question bank
// Cut verbatim from the standalone bank source
// (math-9-review/bank-src.js, lines 324 to 673).
// CRMARKS: u2-sa-single=3
// CRMARKS: u2-sa-tri-context=3
// CRMARKS: u2-overlap=2
// CRMARKS: u2-overlap-hidden=2
// CRMARKS: u2-sa-composite-rect=3
// CRMARKS: u2-sa-problem=2
// CRMARKS: u2-sa-cyl-on-prism=3
// CRMARKS: u2-best-estimate-side=2
// BIMODAL: u2-best-estimate-side=a
/* Unit 2: Square Roots and Surface Area */
function u2gcd(a,b){while(b){var t=a%b;a=b;b=t;}return a;}
function u2r1(x){return Math.round(x*10)/10;}
function u2r2(x){return Math.round(x*100)/100;}
function u2d3(val,cands){var out=[];for(var i=0;i<cands.length;i++){var c=cands[i];if(c!==val&&c>0&&out.indexOf(c)<0){out.push(c);}if(out.length===3){break;}}return out;}
function u2nonSquare(lo,hi){var n=ri(lo,hi);var t=0;while(Math.floor(Math.sqrt(n))*Math.floor(Math.sqrt(n))===n&&t<60){n=ri(lo,hi);t++;}return n;}

E("u2-sqrt-perfect", 2, ["6.9"], 1, "gen", function(){
  var mode=pick(["whole","decimal","fraction"]);
  if(mode==="whole"){
    var r=ri(2,20); var n=r*r;
    var ds=u2d3(r,[r+1,r-1,r+2,r*2,r+3]);
    var opts=ds.map(function(d){return {t:String(d), fb:fmt(d)+" squared is "+fmt(d*d)+", not "+n+": try another value."};});
    var q = mcq("What is \\(\\sqrt{"+n+"}\\)?", {t:String(r), fb:"Yes: "+r+" times "+r+" equals "+n+"."}, opts,
      "\\("+r+" \\times "+r+" = "+n+"\\), so \\(\\sqrt{"+n+"} = "+r+"\\). The square root is <b>"+r+"</b>.",
      {mode:"whole", n:n});
    q.figure = solSquare(String(n), "?", "Square with labelled area and unknown side");
    return q;
  }
  if(mode==="decimal"){
    var k=ri(3,25); var rd=u2r1(k/10); var nd=u2r2(rd*rd);
    var dc=u2d3(rd,[u2r1(rd+0.1),u2r1(rd-0.1),u2r1(rd+1),u2r1(rd*2),u2r1(rd+0.2)]);
    var dopts=dc.map(function(d){return {t:fmt(d), fb:fmt(d)+" squared is "+fmt(u2r2(d*d))+", not "+fmt(nd)+"."};});
    var q = mcq("What is \\(\\sqrt{"+fmt(nd)+"}\\)?", {t:fmt(rd), fb:"Yes: "+fmt(rd)+" times "+fmt(rd)+" equals "+fmt(nd)+"."}, dopts,
      "\\("+fmt(rd)+" \\times "+fmt(rd)+" = "+fmt(nd)+"\\), so \\(\\sqrt{"+fmt(nd)+"} = "+fmt(rd)+"\\). The square root is <b>"+fmt(rd)+"</b>.",
      {mode:"decimal", n:nd});
    q.figure = solSquare(fmt(nd), "?", "Square with labelled area and unknown side");
    return q;
  }
  var p=ri(2,9); var q=ri(3,11); var g=0;
  while(u2gcd(p,q)!==1&&g<40){p=ri(2,9);q=ri(3,11);g++;}
  var fopts=[{t:"\\("+FR(p+1,q)+"\\)", fb:"Squaring it gives the wrong numerator: check both parts."},
             {t:"\\("+FR(p,q+1)+"\\)", fb:"Squaring it gives the wrong denominator: check both parts."},
             {t:"\\("+FR(p-1,q)+"\\)", fb:"Squaring it gives a smaller numerator than the one shown."}];
  var qq = mcq("What is \\(\\sqrt{"+FR(p*p,q*q)+"}\\)?", {t:"\\("+FR(p,q)+"\\)", fb:"Yes: both parts square to the parts shown."}, fopts,
    "The numerator "+(p*p)+" is "+p+" squared, and the denominator "+(q*q)+" is "+q+" squared. \\[ \\sqrt{"+FR(p*p,q*q)+"} = "+FR(p,q)+" \\] The square root is <b>\\("+FR(p,q)+"\\)</b>.",
    {mode:"fraction", p:p, q:q});
  qq.figure = solSquare((p*p)+"/"+(q*q), "?", "Square with labelled area and unknown side");
  return qq;
}, ["Think of the number that multiplies by itself to give the value under the root sign.", "Work through small squares in order until one of them lands exactly on the number shown."]);

E("u2-square-from-root", 2, ["6.11"], 1, "gen", function(){
  var mode=pick(["whole","decimal","fraction"]);
  if(mode==="whole"){
    var r=ri(2,30); var n=r*r;
    var ds=u2d3(n,[2*r,n+1,n-1,n+r,n+10,3*r]);
    var opts=ds.map(function(d){return {t:String(d), fb:"That value does not come from squaring "+r+": try "+r+" times "+r+"."};});
    var q = mcq("A positive number has square root "+r+". What is the number?", {t:String(n), fb:"Yes: squaring the root gives back the number."}, opts,
      "Squaring undoes a square root: \\[ "+r+"^{2} = "+r+" \\times "+r+" = "+n+" \\] The number is <b>"+n+"</b>.",
      {mode:"whole", r:r});
    q.figure = solSquare("?", String(r), "Square with labelled side and unknown area");
    return q;
  }
  if(mode==="decimal"){
    var k=ri(2,30); var rd=u2r1(k/10); var nd=u2r2(rd*rd);
    var dc=u2d3(nd,[u2r2(2*rd),u2r2((rd+1)*(rd+1)),u2r2(nd+1),u2r2(nd+0.1),u2r2(nd+2)]);
    var dopts=fmtPairDs(fmt(nd), dc.map(function(d){return {v:d, fb:"That is not "+fmt(rd)+" times "+fmt(rd)+": square the root itself."};}));
    var q = mcq("A positive number has square root "+fmt(rd)+". What is the number?", {t:fmt(nd), fb:"Yes: "+fmt(rd)+" squared equals "+fmt(nd)+"."}, dopts,
      "Squaring undoes a square root: \\[ "+fmt(rd)+"^{2} = "+fmt(rd)+" \\times "+fmt(rd)+" = "+fmt(nd)+" \\] The number is <b>"+fmt(nd)+"</b>.",
      {mode:"decimal", r:rd});
    q.figure = solSquare("?", fmt(rd), "Square with labelled side and unknown area");
    return q;
  }
  var p=ri(2,9); var q=ri(3,11); var g=0;
  while(u2gcd(p,q)!==1&&g<40){p=ri(2,9);q=ri(3,11);g++;}
  var fopts=[{t:"\\("+FR(p*p,q)+"\\)", fb:"Only the top was squared: the bottom must be squared too."},
             {t:"\\("+FR(p,q*q)+"\\)", fb:"Only the bottom was squared: the top must be squared too."},
             {t:"\\("+FR(p*p,q*q+q)+"\\)", fb:"Square the bottom part itself: do not add it to itself."}];
  var qq = mcq("A positive number has square root \\("+FR(p,q)+"\\) . What is the number?", {t:"\\("+FR(p*p,q*q)+"\\)", fb:"Yes: square the top and the bottom separately."}, fopts,
    "Square the top and the bottom: \\[ \\left("+FR(p,q)+"\\right)^{2} = "+FR(p*p,q*q)+" \\] The number is <b>\\("+FR(p*p,q*q)+"\\)</b>.",
    {mode:"fraction", p:p, q:q});
  qq.figure = solSquare("?", p+"/"+q, "Square with labelled side and unknown area");
  return qq;
}, ["Squaring and square roots undo each other, so square the given root.", "Multiply the root by itself, squaring the top and bottom separately for a fraction."]);

E("u2-identify-square", 2, ["3.3"], 1, "gen", function(){
  var mode=pick(["whole","decimal","fraction"]);
  if(mode==="whole"){
    var r=ri(4,25); var n=r*r;
    var ds=[n+1,n-1,n+2];
    var opts=ds.map(function(d){return {t:String(d), fb:d+" sits between two neighbouring squares, so nothing squares to it."};});
    return mcq("Which number is a perfect square?", {t:String(n), fb:"Yes: "+r+" times "+r+" equals "+n+"."}, opts,
      "Only one value is a number times itself: \\("+r+" \\times "+r+" = "+n+"\\). The perfect square is <b>"+n+"</b>.",
      {mode:"whole", n:n});
  }
  if(mode==="decimal"){
    var k=ri(4,24); var rd=u2r1(k/10); var nd=u2r2(rd*rd);
    var pool=[0.12,0.15,0.18,0.21,0.27,0.32,0.35,0.45,0.48,0.54,0.6,0.72,0.75,0.8,0.9,1.1,1.2,1.5,1.8,2.2,2.5,2.8,3.5];
    var sh=shuffle(pool); var ds=[]; var i=0;
    while(ds.length<3&&i<sh.length){if(sh[i]!==nd){ds.push(sh[i]);} i++;}
    var opts=fmtPairDs(fmt(nd), ds.map(function(d){return {v:d, fb:"No number times itself gives "+fmt(d)+": test the nearby tenths."};}));
    return mcq("Which number is a perfect square?", {t:fmt(nd), fb:"Yes: "+fmt(rd)+" times "+fmt(rd)+" equals "+fmt(nd)+"."}, opts,
      "Only one value is a number times itself: \\("+fmt(rd)+" \\times "+fmt(rd)+" = "+fmt(nd)+"\\). The perfect square is <b>"+fmt(nd)+"</b>.",
      {mode:"decimal", n:nd});
  }
  var p=ri(2,9); var q=ri(3,11); var g=0;
  while(u2gcd(p,q)!==1&&g<40){p=ri(2,9);q=ri(3,11);g++;}
  var fopts=[{t:"\\("+FR(p*p+1,q*q)+"\\)", fb:"The top part is not a square number, so the fraction is not one."},
             {t:"\\("+FR(p*p,q*q+1)+"\\)", fb:"The bottom part is not a square number, so the fraction is not one."},
             {t:"\\("+FR(p*p+2,q*q)+"\\)", fb:"The top part sits between two squares, so it is not a square."}];
  return mcq("Which number is a perfect square?", {t:"\\("+FR(p*p,q*q)+"\\)", fb:"Yes: the top and bottom are both perfect squares."}, fopts,
    "A fraction is a perfect square when its top and bottom are both perfect squares: \\(\\left("+FR(p,q)+"\\right)^{2} = "+FR(p*p,q*q)+"\\). The perfect square is <b>\\("+FR(p*p,q*q)+"\\)</b>.",
    {mode:"fraction", p:p, q:q});
}, ["A perfect square is a number multiplied by itself, in whole, decimal or fraction form.", "For each value, ask whether some number times itself gives exactly that value."]);

E("u2-estimate-between", 2, ["6.5"], 1, "gen", function(){
  var n=u2nonSquare(10,400); var k=Math.floor(Math.sqrt(n));
  if(pick(["between","closest"])==="between"){
    var pairs=[[k,k+1],[k-1,k],[k+1,k+2],[k+2,k+3]];
    var opts=pairs.slice(1).map(function(pr){return {t:pr[0]+" and "+pr[1], fb:"Square both numbers: "+n+" does not lie between their squares."};});
    return mcq("The square root of "+n+" is between which two whole numbers?", {t:k+" and "+(k+1), fb:"Yes: "+n+" lies between "+(k*k)+" and "+((k+1)*(k+1))+"."}, opts,
      "\\("+k+"^{2} = "+(k*k)+"\\) and \\("+(k+1)+"^{2} = "+((k+1)*(k+1))+"\\), and "+n+" lies between them. So \\(\\sqrt{"+n+"}\\) is between <b>"+k+" and "+(k+1)+"</b>.",
      {mode:"between", n:n});
  }
  var c=((n-k*k)<((k+1)*(k+1)-n))?k:k+1;
  var ds=u2d3(c,[c+1,c-1,c+2,c-2]);
  var opts2=ds.map(function(d){return {t:String(d), fb:"Square it: "+(d*d)+" is farther from "+n+" than the best choice."};});
  return mcq("Which whole number is closest to \\(\\sqrt{"+n+"}\\)?", {t:String(c), fb:"Yes: "+(c*c)+" is the square closest to "+n+"."}, opts2,
    "\\("+k+"^{2} = "+(k*k)+"\\) and \\("+(k+1)+"^{2} = "+((k+1)*(k+1))+"\\). The number "+n+" is closer to "+(c*c)+", so the closest whole number is <b>"+c+"</b>.",
    {mode:"closest", n:n});
}, ["Find the perfect squares just below and just above the number.", "Square the whole numbers near the root and see which squares bracket the number."]);

E("u2-calc-root", 2, ["6.6"], 1, "gen", function(){
  var n=u2nonSquare(11,399);
  var ans=u2r1(Math.sqrt(n));
  return numq("Use a calculator. What is \\(\\sqrt{"+n+"}\\), to one decimal place?", ans, 0.05,
    "A calculator gives \\(\\sqrt{"+n+"} \\approx "+fmt(Math.sqrt(n))+"\\). Rounded to one decimal place, the square root is <b>"+fmt(ans)+"</b>.",
    {mode:"calc", n:n});
}, ["Enter the number and press the square root key on a calculator.", "Read the display, then round the value to one decimal place."]);

E("u2-root-between", 2, ["6.8"], 1, "gen", function(){
  var a=ri(2,15); var b=a+1;
  var m=a*a+ri(1,2*a-1);
  var above=b*b+ri(1,12);
  var opts=[{t:String(a*a), fb:"Its square root is exactly "+a+", which is an endpoint, not between."},
            {t:String(b*b), fb:"Its square root is exactly "+b+", which is an endpoint, not between."},
            {t:String(above), fb:"Its square root is more than "+b+": square the endpoints to check."}];
  return mcq("Which number has a square root between "+a+" and "+b+"?", {t:String(m), fb:"Yes: "+m+" lies between "+(a*a)+" and "+(b*b)+"."}, opts,
    "Square the endpoints: \\("+a+"^{2} = "+(a*a)+"\\) and \\("+b+"^{2} = "+(b*b)+"\\). Only "+m+" lies between those squares, so the number is <b>"+m+"</b>.",
    {mode:"between", a:a, b:b});
}, ["Square the two given numbers to turn the question into a range for the number itself.", "Check which candidate falls between the two squares you just found."]);

E("u2-spot-error", 2, ["6.10"], 2, "gen", function(){
  var mode=ri(1,4);
  if(mode===1){
    var c, R;
    if(ri(0,1)===0){ c=ri(3,30); R=2*c; }
    else { var kk=ri(13,39); if(kk===20){kk=21;} c=u2r1(kk/10); R=u2r1(2*c); }
    return mcq("A student writes: \\(\\sqrt{"+fmt(R)+"} = "+fmt(c)+"\\) because "+fmt(c)+" is half of "+fmt(R)+". What error was made?",
      {t:"The student halved the number instead of finding a value that squares to it", fb:"Right: a square root undoes squaring, not halving."},
      [{t:"The student rounded the answer to a whole number too early in the work", fb:"Rounding is not the issue here: the method itself is wrong."},
       {t:"The student squared the starting number instead of taking its square root", fb:"Look again: the step shown halves the starting number."},
       {t:"The student placed the decimal point in the wrong position in the answer", fb:"The decimal places are fine: the operation chosen is wrong."}],
      "Check by squaring: \\("+fmt(c)+" \\times "+fmt(c)+" = "+fmt(u2r2(c*c))+"\\), not "+fmt(R)+". Halving does not undo squaring. The error was <b>halving the number instead of finding a value that squares to it</b>.",
      {mode:"halving", R:R});
  }
  if(mode===2){
    var k=ri(4,19); if(k===10){k=11;}
    var r=u2r1(k/10); var N=u2r2(r*r); var claim=u2r2(r/10);
    return mcq("A student writes: \\(\\sqrt{"+fmt(N)+"} = "+fmt(claim)+"\\). What error was made?",
      {t:"The decimal point was placed one position too far to the left", fb:"Right: "+fmt(r)+" squared gives the number, so the point belongs there."},
      [{t:"The student halved the number instead of finding its square root", fb:"Halving was not the step used: compare the sizes of the digits."},
       {t:"The student squared the number shown instead of taking its root", fb:"Squaring would make the value bigger, not shift its point."},
       {t:"The student rounded a correct answer to the wrong decimal place", fb:"The digits are right but shifted: this is a place value slip."}],
      "Squaring the claim gives \\("+fmt(claim)+" \\times "+fmt(claim)+" = "+fmt(u2r2(claim*claim*100)/100)+"\\), not "+fmt(N)+", while \\("+fmt(r)+" \\times "+fmt(r)+" = "+fmt(N)+"\\). The error was <b>placing the decimal point one position too far to the left</b>.",
      {mode:"decimal-point", N:N});
  }
  if(mode===3){
    var n=ri(3,20); var cl=n*n;
    return mcq("A student writes: \\(\\sqrt{"+n+"} = "+cl+"\\) because "+n+" times "+n+" is "+cl+". What error was made?",
      {t:"The student squared the number instead of taking its square root", fb:"Right: squaring and rooting are opposite operations."},
      [{t:"The student halved the number instead of taking its square root", fb:"Halving was not used: the work multiplied the number by itself."},
       {t:"The student placed the decimal point in the wrong position instead", fb:"No decimals are involved: the operation itself was reversed."},
       {t:"The student rounded the answer to a whole number too early in the work", fb:"Rounding is not the issue: the answer grew instead of shrinking."}],
      "Check the claim by squaring it: \\("+cl+" \\times "+cl+" = "+(cl*cl)+"\\), not "+n+". A square root undoes squaring; it does not square again. The error was <b>squaring the number instead of taking its square root</b>.",
      {mode:"squared-instead", n:n});
  }
  var a=ri(3,11); var b=ri(3,11); var R=a*a+b*b; var claim=a+b;
  return mcq("A student writes: \\(\\sqrt{"+(a*a)+"+"+(b*b)+"} = "+a+"+"+b+" = "+claim+"\\). What error was made?",
    {t:"The student took the root of each part separately before adding", fb:"Right: the root applies to the whole sum, not to each part."},
    [{t:"The student halved the sum instead of finding its square root", fb:"Halving was not used: the roots were taken part by part."},
     {t:"The student squared the sum instead of taking the root of the sum", fb:"Squaring was not used: each part was rooted on its own."},
     {t:"The student placed the decimal point in the wrong position instead", fb:"No decimals are involved: the root was split across the sum."}],
    "Add first: \\("+(a*a)+"+"+(b*b)+" = "+R+"\\), and \\("+claim+" \\times "+claim+" = "+(claim*claim)+"\\), not "+R+". The error was <b>taking the root of each part separately before adding</b>.",
    {mode:"split-root", a:a, b:b});
}, ["Test the claim by squaring the answer the student gave.", "Square the claimed root: if it does not give the starting number, name the step that went wrong."]);

E("u2-sa-single", 2, ["9.2"], 2, "gen", function(){
  var mode=pick(["rect","tri","cyl"]);
  if(mode==="rect"){
    var l=ri(2,12), w=ri(2,12), h=ri(2,12);
    var sa=2*(l*w+l*h+w*h);
    var q = numq("Find the surface area of a right rectangular prism with length "+l+" cm, width "+w+" cm and height "+h+" cm. Give your answer in square centimetres.", sa, 0.01,
      "Unfold the prism into its net: three pairs of matching faces. One pair is "+l+" by "+w+", area "+fmt(l*w)+" each; one pair is "+l+" by "+h+", area "+fmt(l*h)+" each; and one pair is "+w+" by "+h+", area "+fmt(w*h)+" each. Double each face area for its matching pair and add: \\[ \\begin{aligned} SA &= 2("+fmt(l*w)+") + 2("+fmt(l*h)+") + 2("+fmt(w*h)+") \\\\ &= "+fmt(sa)+" \\end{aligned} \\] The surface area is <b>"+fmt(sa)+" cm\\(^{2}\\)</b>.",
      {mode:"rect-prism", l:l, w:w, h:h});
    q.figure = solRectPrism(l, w, h, fmt(l) + " cm", fmt(w) + " cm", fmt(h) + " cm", "Rectangular prism with labelled dimensions");
    return q;
  }
  if(mode==="tri"){
    var tr=pick([[3,4,5],[5,12,13],[6,8,10],[8,15,17],[9,12,15],[12,16,20]]);
    var a=tr[0], b=tr[1], c=tr[2]; var L=ri(4,18);
    var sa2=a*b+(a+b+c)*L;
    var q = numq("Find the surface area of a right triangular prism. The triangular end is a right triangle with legs "+a+" cm and "+b+" cm and hypotenuse "+c+" cm, and the prism is "+L+" cm long. Give your answer in square centimetres.", sa2, 0.01,
      "Two triangular ends plus three rectangles along the length. Each triangular end has area "+fmt(a*b/2)+", and the three rectangles have areas "+fmt(a*L)+", "+fmt(b*L)+" and "+fmt(c*L)+": \\[ \\begin{aligned} SA &= 2("+fmt(a*b/2)+") + "+fmt(a*L)+" + "+fmt(b*L)+" + "+fmt(c*L)+" \\\\ &= "+fmt(sa2)+" \\end{aligned} \\] The surface area is <b>"+fmt(sa2)+" cm\\(^{2}\\)</b>.",
      {mode:"tri-prism", a:a, b:b, c:c, L:L});
    q.figure = solTriPrism(a, b, c, L, fmt(a) + " cm", fmt(b) + " cm", fmt(c) + " cm", fmt(L) + " cm", "Triangular prism with labelled dimensions");
    return q;
  }
  var r=ri(2,10), hh=ri(3,15);
  var sac=u2r1(2*3.14*r*(r+hh));
  var q = numq("Find the surface area of a right cylinder with radius "+r+" cm and height "+hh+" cm. Use \\(\\pi = 3.14\\) and give your answer in square centimetres, to one decimal place.", sac, 0.6,
    "Two circles plus the curved side, using \\(\\pi = 3.14\\). Each circle has area \\(3.14 \\times "+r+" \\times "+r+" = "+fmt(u2r2(3.14*r*r))+"\\). The curved side unrolls into a rectangle whose length is the circumference, \\(2 \\times 3.14 \\times "+r+" = "+fmt(u2r2(2*3.14*r))+"\\), and whose width is "+hh+", so its area is \\("+fmt(u2r2(2*3.14*r))+" \\times "+hh+" = "+fmt(u2r2(2*3.14*r*hh))+"\\). Add the parts: \\[ \\begin{aligned} SA &= 2("+fmt(u2r2(3.14*r*r))+") + "+fmt(u2r2(2*3.14*r*hh))+" \\\\ &= "+fmt(u2r2(2*3.14*r*r+2*3.14*r*hh))+" \\\\ &\\approx "+fmt(sac)+" \\end{aligned} \\] The surface area is <b>"+fmt(sac)+" cm\\(^{2}\\)</b>.",
    {mode:"cylinder", r:r, h:hh});
    q.figure = solCylinder(r, hh, fmt(r) + " cm", fmt(hh) + " cm", "Cylinder with labelled dimensions");
    return q;
}, ["Picture the net of the solid: every outside face must be counted once.", "Work out one face area at a time, then add the matching faces together."]);

E("u2-sa-tri-context", 2, ["9.2"], 2, "gen", function(){
  var tr=pick([[3,4,5],[5,12,13],[6,8,10],[8,15,17],[9,12,15]]);
  var a=tr[0], b=tr[1], c=tr[2]; var L=ri(5,20);
  var mode=pick(["ramp","tent","bar"]);
  if(mode==="tent"){
    var sat=a*b+(a+c)*L;
    var q = numq("A lean-to tent is shaped like a right triangular prism. Each triangular end has a vertical side of "+a+" cm, a base of "+b+" cm and a sloped side of "+c+" cm, and the tent is "+L+" cm long. The rectangular face on the ground, "+b+" cm by "+L+" cm, has no material. Find the area of material needed, in square centimetres.", sat, 0.01,
      "Count two triangular ends and the two covered rectangles, leaving out the ground face. Each triangular end has area "+fmt(a*b/2)+", and the covered rectangles have areas "+fmt(a*L)+" and "+fmt(c*L)+": \\[ \\begin{aligned} SA &= 2("+fmt(a*b/2)+") + "+fmt(a*L)+" + "+fmt(c*L)+" \\\\ &= "+fmt(sat)+" \\end{aligned} \\] The area of material needed is <b>"+fmt(sat)+" cm\\(^{2}\\)</b>.",
      {mode:"tent-no-floor", a:a, b:b, c:c, L:L});
    q.figure = solTriPrism(a, b, c, L, fmt(a) + " cm", fmt(b) + " cm", fmt(c) + " cm", fmt(L) + " cm", "Triangular prism tent with labelled dimensions");
    return q;
  }
  var sa=a*b+(a+b+c)*L;
  if(mode==="ramp"){
    var q = numq("A display ramp is shaped like a right triangular prism and is covered on all faces. Each triangular end has sides of "+a+" cm, "+b+" cm and "+c+" cm, forming a right triangle, and the ramp is "+L+" cm long. Find the total surface area of the ramp, in square centimetres.", sa, 0.01,
      "Two triangular ends plus three rectangles along the length. Each triangular end has area "+fmt(a*b/2)+", and the three rectangles have areas "+fmt(a*L)+", "+fmt(b*L)+" and "+fmt(c*L)+": \\[ \\begin{aligned} SA &= 2("+fmt(a*b/2)+") + "+fmt(a*L)+" + "+fmt(b*L)+" + "+fmt(c*L)+" \\\\ &= "+fmt(sa)+" \\end{aligned} \\] The total surface area is <b>"+fmt(sa)+" cm\\(^{2}\\)</b>.",
      {mode:"ramp", a:a, b:b, c:c, L:L});
    q.figure = solTriPrism(a, b, c, L, fmt(a) + " cm", fmt(b) + " cm", fmt(c) + " cm", fmt(L) + " cm", "Triangular prism ramp with labelled dimensions");
    return q;
  }
  var q = numq("A chocolate bar box is shaped like a right triangular prism, closed on all faces. Each triangular end has sides of "+a+" cm, "+b+" cm and "+c+" cm, forming a right triangle, and the box is "+L+" cm long. Find the total surface area of the box, in square centimetres.", sa, 0.01,
    "Two triangular ends plus three rectangles along the length. Each triangular end has area "+fmt(a*b/2)+", and the three rectangles have areas "+fmt(a*L)+", "+fmt(b*L)+" and "+fmt(c*L)+": \\[ \\begin{aligned} SA &= 2("+fmt(a*b/2)+") + "+fmt(a*L)+" + "+fmt(b*L)+" + "+fmt(c*L)+" \\\\ &= "+fmt(sa)+" \\end{aligned} \\] The total surface area is <b>"+fmt(sa)+" cm\\(^{2}\\)</b>.",
    {mode:"bar-box", a:a, b:b, c:c, L:L});
    q.figure = solTriPrism(a, b, c, L, fmt(a) + " cm", fmt(b) + " cm", fmt(c) + " cm", fmt(L) + " cm", "Triangular prism box with labelled dimensions");
    return q;
}, ["Sketch the prism and label every face before you calculate.", "Find the two triangular ends first, then add the rectangles that run along the length."]);

E("u2-overlap", 2, ["9.1"], 1, "gen", function(){
  var p=ri(2,11), q=ri(2,10);
  var bl=ri(p+2,p+8), bw=ri(q+2,q+8);
  var qq = numq("A small box sits on top of a larger box that is "+bl+" cm long and "+bw+" cm wide. The two boxes touch over a rectangle that measures "+p+" cm by "+q+" cm. What is the area of the overlap, in square centimetres?", p*q, 0.01,
    "The overlap is the rectangle where the boxes touch: \\[ \\begin{aligned} A &= "+p+" \\times "+q+" \\\\ &= "+(p*q)+" \\end{aligned} \\] The area of the overlap is <b>"+(p*q)+" cm\\(^{2}\\)</b>.",
    {mode:"overlap", p:p, q:q});
    qq.figure = solOverlapPlan(bl, bw, p, q, fmt(p) + " cm", fmt(q) + " cm", fmt(bl) + " cm", fmt(bw) + " cm", "Plan view of two boxes with the overlap shaded");
    return qq;
}, ["The overlap is the rectangle where the two solids touch each other.", "Find the area of the touching rectangle first, then think about how many faces it hides."]);

E("u2-overlap-hidden", 2, ["9.1"], 2, "gen", function(){
  var p=ri(2,11), q=ri(2,10);
  var bl=ri(p+2,p+8), bw=ri(q+2,q+8);
  var qq = numq("A small box sits on top of a larger box that is "+bl+" cm long and "+bw+" cm wide. The two boxes touch over a rectangle that measures "+p+" cm by "+q+" cm. How much surface area is hidden in total where the two boxes touch, in square centimetres?", 2*p*q, 0.01,
    "The touching rectangle hides one face on each box, so it is hidden twice: \\[ \\begin{aligned} \\text{hidden} &= 2\\times("+p+" \\times "+q+") \\\\ &= 2\\times "+(p*q)+" \\\\ &= "+(2*p*q)+" \\end{aligned} \\] The total hidden surface area is <b>"+(2*p*q)+" cm\\(^{2}\\)</b>.",
    {mode:"hidden-total", p:p, q:q});
    qq.figure = solOverlapPlan(bl, bw, p, q, fmt(p) + " cm", fmt(q) + " cm", fmt(bl) + " cm", fmt(bw) + " cm", "Plan view of two boxes with the overlap shaded");
    return qq;
}, ["The overlap is the rectangle where the two solids touch each other.", "Find the area of the touching rectangle first, then think about how many faces it hides."]);

E("u2-sa-composite-rect", 2, ["9.2"], 2, "gen", function(){
  var X=ri(8,16), W=ri(4,10), H1=ri(3,7), X2=ri(3,6), H2=ri(2,6);
  if(X2>=X){X2=X-3;}
  var sa1=2*(X*W+X*H1+W*H1), sa2=2*(X2*W+X2*H2+W*H2), contact=X2*W;
  var tot=sa1+sa2-2*contact;
  var q = numq("A step is built from two boxes joined together. The bottom box measures "+X+" cm long, "+W+" cm wide and "+H1+" cm high. The top box measures "+X2+" cm long, "+W+" cm wide and "+H2+" cm high, and it sits on top of the bottom box, flush with the back and the left side. Find the total surface area of the step, in square centimetres.", tot, 0.01,
    "Find each box from its faces, then subtract the touching face twice because it is hidden on both boxes. The bottom box has face areas "+fmt(X*W)+", "+fmt(X*H1)+" and "+fmt(W*H1)+", each twice, giving "+sa1+". The top box has face areas "+fmt(X2*W)+", "+fmt(X2*H2)+" and "+fmt(W*H2)+", each twice, giving "+sa2+". The touching face has area "+contact+": \\[ \\begin{aligned} SA &= "+sa1+" + "+sa2+" - 2("+contact+") \\\\ &= "+tot+" \\end{aligned} \\] The total surface area is <b>"+tot+" cm\\(^{2}\\)</b>.",
    {mode:"step", X:X, W:W, H1:H1, X2:X2, H2:H2});
    q.figure = solStep(X, W, H1, X2, H2, fmt(X) + " cm", fmt(W) + " cm", fmt(H1) + " cm", fmt(X2) + " cm", fmt(H2) + " cm", "Step built from two boxes with labelled dimensions");
    return q;
}, ["Treat the step as two separate boxes first, then adjust for the join.", "Add both surface areas, then subtract the touching face twice since it is hidden on both boxes."]);

E("u2-sa-problem", 2, ["9.3"], 2, "gen", function(){
  if(pick(["cans","cost"])==="cans"){
    var l=ri(4,11)/2, w=ri(3,9)/2, h=ri(3,8)/2;
    var sa=2*(l*w+l*h+w*h);
    var cover=pick([8,10,12,15,20]);
    var cans=Math.ceil(sa/cover-0.0000001);
    var q = numq("A storage tank shaped like a right rectangular prism measures "+fmt(l)+" m long, "+fmt(w)+" m wide and "+fmt(h)+" m high. It will be painted on the outside, on all faces. One can of paint covers "+cover+" square metres. How many cans of paint are needed?", cans, 0.01,
      "Find the surface area first: the tank's three face areas are "+fmt(l*w)+", "+fmt(l*h)+" and "+fmt(w*h)+", and each face has a matching opposite face: \\[ \\begin{aligned} SA &= 2("+fmt(l*w)+") + 2("+fmt(l*h)+") + 2("+fmt(w*h)+") \\\\ &= "+fmt(sa)+" \\end{aligned} \\] Then \\("+fmt(sa)+" \\div "+cover+" \\approx "+fmt(u2r2(sa/cover))+"\\), so a part can is not enough. The number of cans needed is <b>"+cans+"</b>.",
      {mode:"paint-cans", l:l, w:w, h:h, cover:cover});
    q.figure = solRectPrism(l, w, h, fmt(l) + " m", fmt(w) + " m", fmt(h) + " m", "Rectangular prism tank with labelled dimensions");
    return q;
  }
  var l2=ri(8,30)/10, w2=ri(6,24)/10, h2=ri(4,18)/10;
  var sa2=2*(l2*w2+l2*h2+w2*h2);
  var price=pick([4,5,6,8,9]);
  var cost=u2r2(sa2*price);
  var q = numq("A gift box shaped like a right rectangular prism measures "+fmt(l2)+" m long, "+fmt(w2)+" m wide and "+fmt(h2)+" m high. It is covered on all faces with fabric that costs $"+price+" per square metre. What is the total cost of the fabric, in dollars, to the nearest cent?", cost, 0.05,
    "Find the surface area first: the box's three face areas are "+fmt(u2r2(l2*w2))+", "+fmt(u2r2(l2*h2))+" and "+fmt(u2r2(w2*h2))+", and each face has a matching opposite face: \\[ \\begin{aligned} SA &= 2("+fmt(u2r2(l2*w2))+") + 2("+fmt(u2r2(l2*h2))+") + 2("+fmt(u2r2(w2*h2))+") \\\\ &= "+fmt(u2r2(sa2))+" \\end{aligned} \\] Then \\("+fmt(u2r2(sa2))+" \\times "+price+" = "+fmt(cost)+"\\). The total cost is <b>$"+fmt(cost)+"</b>.",
    {mode:"fabric-cost", l:l2, w:w2, h:h2, price:price});
    q.figure = solRectPrism(l2, w2, h2, fmt(l2) + " m", fmt(w2) + " m", fmt(h2) + " m", "Rectangular prism box with labelled dimensions");
    return q;
}, ["Work out the total surface area before you use the coverage or the price.", "Divide the surface area by the coverage per can, or multiply it by the price per square metre."]);

E("u2-why-approx", 2, ["6.7"], 1, "var", varset([
  function(){
    return mcq("A calculator shows \\(\\sqrt{2} \\approx 1.414213562\\). Why is the value on the screen an approximation?",
      {t:"Squaring 1.414213562 does not give exactly 2, only very close to 2", fb:"Right: the display is rounded, so its square misses 2 slightly."},
      [{t:"The calculator made an arithmetic mistake when it found the root", fb:"The calculator works properly: the limit is the size of the display."},
       {t:"The value is exact because it has nine decimal places shown on it", fb:"Many places still means rounded: the digits continue beyond them."},
       {t:"The root of 2 is a fraction, and the screen cannot show fractions", fb:"The issue is endless decimals, not fractions: some roots are fractions."}],
      "Squaring the screen value gives about \\(1.999999999\\), close to 2 but not equal to it, because the true value continues past the display. The screen value is <b>an approximation because it is rounded</b>.",
      {mode:"static-sqrt2"});
  },
  function(){
    return mcq("A student says the exact value of \\(\\sqrt{7}\\) is 2.64575131, the value on the calculator screen. Why is the student wrong?",
      {t:"The true value has decimal digits that continue forever without ending", fb:"Right: the screen shows only the first digits, rounded."},
      [{t:"The calculator rounded the last digit the wrong way on the screen", fb:"Either rounding direction still cuts the value off: that is the point."},
       {t:"The exact value of the root is 2.6, with only one decimal place", fb:"Roots do not stop at one place: this one keeps going."},
       {t:"The student copied the digits from the screen in the wrong order", fb:"The digits were copied fine: the value itself is incomplete."}],
      "The decimal for \\(\\sqrt{7}\\) never ends, so any screen can show only its first digits, rounded. The student is wrong because <b>the true value continues forever past the display</b>.",
      {mode:"static-sqrt7"});
  },
  function(){
    return mcq("For a project, Sam uses 3.16 as the value of \\(\\sqrt{10}\\). Why is 3.16 called an approximation?",
      {t:"It is the true value rounded to two decimal places, not the full value", fb:"Right: 3.16 squared is 9.9856, close to 10 but not equal."},
      [{t:"It is an approximation because Sam found it without a calculator", fb:"The method does not decide it: the rounding is what matters."},
       {t:"It is exact, since two decimal places are enough for any project", fb:"Enough for a project can still be rounded rather than exact."},
       {t:"It is an approximation because the number 10 has no square root at all", fb:"10 does have a root: it just never terminates or repeats."}],
      "\\(3.16 \\times 3.16 = 9.9856\\), which is close to 10 but not equal to it. The value 3.16 is <b>an approximation because it is the true root rounded to two decimal places</b>.",
      {mode:"static-sqrt10"});
  }
]), ["Ask whether squaring the shown value gives back the starting number exactly.", "Check the shown value by squaring it, and think about whether more digits exist."]);

E("u2-sa-cyl-on-prism", 2, ["9.3"], 3, "gen", function(){
  var r=ri(2,5), hc=ri(4,12), l=ri(10,16), w=ri(10,16), h=ri(3,8);
  var prism=2*(l*w+l*h+w*h);
  var side=u2r1(2*3.14*r*hc), top=u2r2(3.14*r*r);
  var tot=u2r1(prism+side);
  var ctx=pick(["A cylindrical water tank stands on top of a rectangular concrete base","A thick round candle stands on top of a rectangular wooden stand"]);
  var q = numq(ctx+". The cylinder has radius "+r+" cm and height "+hc+" cm, and its base sits fully on the top face of the prism. The prism measures "+l+" cm long, "+w+" cm wide and "+h+" cm high. Find the total exposed surface area, in square centimetres. Use \\(\\pi = 3.14\\) and give your answer to one decimal place.", tot, 0.6,
    "The circle where the cylinder meets the prism is hidden, and the cylinder bottom is not exposed, so those two equal circles cancel out of the total. The prism's face areas are "+fmt(l*w)+", "+fmt(l*h)+" and "+fmt(w*h)+", each appearing twice, and the cylinder contributes only its curved side, which unrolls into a rectangle with length the circumference and width "+hc+": \\[ \\begin{aligned} SA &= 2("+fmt(l*w)+") + 2("+fmt(l*h)+") + 2("+fmt(w*h)+") + 2(3.14)("+r+")("+hc+") \\\\ &= "+prism+" + "+fmt(side)+" \\\\ &= "+fmt(tot)+" \\end{aligned} \\] The total exposed surface area is <b>"+fmt(tot)+" cm\\(^{2}\\)</b>.",
    {mode:"cyl-on-prism", r:r, hc:hc, l:l, w:w, h:h});
    q.figure = solCylOnPrism(r, hc, l, w, h, fmt(r) + " cm", fmt(hc) + " cm", fmt(l) + " cm", fmt(w) + " cm", fmt(h) + " cm", "Cylinder on a rectangular prism with labelled dimensions");
    return q;
}, ["Split the solid into the prism and the cylinder, then think about the join.", "Find the prism surface area, then add only the exposed parts of the cylinder."]);

E("u2-best-estimate-side", 2, ["6.5","6.8"], 3, "gen", function(){
  var best=u2r1(ri(24,98)/10);
  var A=u2r1(best*best+pick([-0.6,-0.3,0.3,0.6]));
  var ctx=pick(["A square patio","A square photo print","A square floor mat","A square rug"]);
  var vals=[u2r1(best-0.5), best, u2r1(best+0.5), u2r1(best+1)];
  var opts=vals.slice(0,1).concat(vals.slice(2)).map(function(v){
    return {t:fmt(v), fb:"Square it: "+fmt(v)+" squared is "+fmt(u2r2(v*v))+", not the closest square to "+fmt(A)+"."};
  });
  var q = mcq(ctx+" has an area of "+fmt(A)+" square metres. What is the best estimate for its side length, in metres?",
    {t:fmt(best), fb:"Yes: "+fmt(best)+" squared is "+fmt(u2r2(best*best))+", closest to "+fmt(A)+"."}, opts,
    "The side length is \\(\\sqrt{"+fmt(A)+"}\\). Since \\("+fmt(best)+"^{2} = "+fmt(u2r2(best*best))+"\\), the square closest to "+fmt(A)+", the best estimate is <b>"+fmt(best)+" m</b>.",
    {mode:"best-estimate", A:A});
  q.figure = solSquare(fmt(A)+" m²", "?", "Square with labelled area and unknown side");
  return q;
}, ["The side length is the square root of the area, so estimate that root.", "Square each nearby one-decimal value and find which square lands closest to the area."]);

E("u2-reasoning-var", 2, ["3.3","6.10"], 3, "var", varset([
  function(){
    return mcq("Rina claims that 0.81 is a perfect square because 81 is a perfect square and the digits are the same. Which option judges her claim correctly?",
      {t:"The claim is correct, because 0.9 times 0.9 equals 0.81", fb:"Right: a decimal is a perfect square when a number squares to it."},
      [{t:"The claim is wrong, because decimals can never be squares", fb:"Decimals can be squares: check 0.9 times 0.9 for yourself."},
       {t:"The claim is wrong, because 0.81 divided by 2 is not whole", fb:"Halving is not the test: the test is multiplying a number by itself."},
       {t:"The claim is correct, because 81 over 100 is a whole number", fb:"The result is right but that reason fails: 81 over 100 is not whole."}],
      "\\(0.9 \\times 0.9 = 0.81\\), so a number times itself gives 0.81. The correct judgement is <b>the claim is correct, because 0.9 times 0.9 equals 0.81</b>.",
      {mode:"static-decimal-claim"});
  },
  function(){
    return mcq("Dev claims that \\("+FR(18,49)+"\\) is a perfect square because 49 is a perfect square. Which option judges his claim correctly?",
      {t:"The claim is wrong, because 18 is not a perfect square", fb:"Right: both the top and the bottom must be perfect squares."},
      [{t:"The claim is correct, because 49 is a perfect square", fb:"One part being a square is not enough: check the top part too."},
       {t:"The claim is wrong, because fractions can never be squares", fb:"Fractions can be squares when both parts are square numbers."},
       {t:"The claim is correct, because 18 is close to the square 16", fb:"Close is not equal: 18 itself would have to be a square."}],
      "A fraction is a perfect square only when its top and bottom are both perfect squares. Here 49 is a square but 18 is not. The correct judgement is <b>the claim is wrong, because 18 is not a perfect square</b>.",
      {mode:"static-fraction-claim"});
  },
  function(){
    return mcq("Tess estimates \\(\\sqrt{48}\\) as 24, saying she halved 48 to undo the square. Which option judges her method correctly?",
      {t:"The method is wrong: 48 lies between 36 and 49, so the root lies between 6 and 7", fb:"Right: benchmark squares give the range, and halving is not rooting."},
      [{t:"The method is right: halving a number always gives its square root exactly", fb:"Test it on 16: halving gives 8, but the square root is 4."},
       {t:"The method is wrong: the root of 48 is exactly 7 itself since 48 rounds to 49", fb:"Rounding the starting number does not make the root exact."},
       {t:"The method is right: 24 times 24 is close enough to 48 for an estimate here", fb:"24 squared is 576, which is nowhere near 48 at all."}],
      "Benchmark squares give \\(36 < 48 < 49\\), so \\(6 < \\sqrt{48} < 7\\), and halving never undoes squaring. The correct judgement is <b>the method is wrong: the root lies between 6 and 7</b>.",
      {mode:"static-estimate-flaw"});
  }
]), ["Judge a claim by testing it with the definition, not by how it sounds.", "For a square claim, multiply a candidate by itself; for an estimate, bracket it between perfect squares."]);

/* ----- bank-u3.js ----- */
// Math 9 Unit 3 Powers and Exponent Laws question bank
// Cut verbatim from the standalone bank source
// (math-9-review/bank-src.js, lines 674 to 1127).
// CRMARKS: u3-two-laws-evaluate=3
// CRMARKS: u3-power-of-product-quotient=3
// CRMARKS: u3-sum-of-powers=3
// CRMARKS: u3-difference-of-powers=2
// CRMARKS: u3-three-laws-evaluate=3
// CRMARKS: u3-law-then-sum-difference=2
/* Unit 3: Powers and Exponent Laws */
// Unit 3: Powers and Exponent Laws

function u3Pick3(correct, pairs) {
  var out = [], seen = {};
  seen[String(correct)] = 1;
  for (var i = 0; i < pairs.length && out.length < 3; i++) {
    var v = pairs[i].v;
    if (!seen[String(v)]) { seen[String(v)] = 1; out.push({ t: fmt(v), fb: pairs[i].fb }); }
  }
  return out;
}
function u3PowDist(a, correctExp, pairs) {
  var out = [], seen = {};
  seen[String(correctExp)] = 1;
  for (var i = 0; i < pairs.length && out.length < 3; i++) {
    var e = pairs[i].v;
    if (!seen[String(e)]) { seen[String(e)] = 1; out.push({ t: "\\(" + a + "^{" + e + "}\\)", fb: pairs[i].fb }); }
  }
  return out;
}
function u3MultStr(factor, count) {
  var parts = [];
  for (var i = 0; i < count; i++) parts.push(String(factor));
  return "\\(" + parts.join("\\times ") + "\\)";
}

E("u3-repeated-multiplication", 3, ["3.6"], 1, "gen", function () {
  var b = ri(2, 12), e = ri(2, 6);
  var correct = u3MultStr(b, e);
  var cands = [
    { t: u3MultStr(b, e + 1), fb: "That uses one factor too many. Count the exponent." },
    { t: u3MultStr(b, e - 1), fb: "That uses one factor too few. Count the exponent." },
    { t: u3MultStr(e, e), fb: "That repeats the exponent. The base is the repeated factor." },
    { t: u3MultStr(b, b), fb: "That repeats the base as many times as its own value." },
    { t: u3MultStr(b + 1, e), fb: "That changes the base. Keep the base from the power." }
  ];
  var ds = [], seen = {}; seen[correct] = 1;
  for (var i = 0; i < cands.length && ds.length < 3; i++) { if (!seen[cands[i].t]) { seen[cands[i].t] = 1; ds.push(cands[i]); } }
  return mcq("What is \\(" + b + "^{" + e + "}\\) written as repeated multiplication?",
    { t: correct, fb: "Correct. The base repeats as many times as the exponent says." }, ds,
    "The base is \\(" + b + "\\) and the exponent is \\(" + e + "\\), so write \\(" + b + "\\) as a factor \\(" + e + "\\) times: \\[ " + correct.replace("\\(", "").replace("\\)", "") + " \\] So the repeated multiplication is <b>" + correct + "</b>.",
    { mode: "power-to-repeated", b: b, e: e });
}, ["The exponent tells you how many times the base appears as a factor.", "Write the base down, then keep multiplying by it until you have used the exponent count."]);

E("u3-power-from-repeated", 3, ["3.7"], 1, "gen", function () {
  var mode = pick(["pos", "neg"]);
  if (mode === "pos") {
    var b = ri(2, 9), c = ri(2, 6);
    while (b === c) { b = ri(2, 9); }
    var shown = u3MultStr(b, c);
    var ds = u3PowDist(b, c, [
      { v: b, fb: "That swaps the base and the count of factors." },
      { v: c + 1, fb: "That adds one to the exponent. Count the factors shown." },
      { v: c - 1, fb: "That subtracts one from the exponent. Count the factors shown." },
      { v: b + c, fb: "That adds the base and count. The exponent is just the count." }
    ]);
    // u3PowDist builds options with base b, but the swapped option needs base c; fix by rebuilding manually when needed
    return mcq("What is " + shown + " written as a single power?",
      { t: "\\(" + b + "^{" + c + "}\\)", fb: "Correct. The repeated factor is the base and the count is the exponent." },
      [
        { t: "\\(" + c + "^{" + b + "}\\)", fb: "That swaps the base and the count of factors." },
        { t: "\\(" + b + "^{" + (c + 1) + "}\\)", fb: "That adds one to the exponent. Count the factors shown." },
        { t: "\\(" + b + "^{" + Math.max(1, c - 1) + "}\\)", fb: "That subtracts one from the exponent. Count the factors shown." }
      ],
      "There are \\(" + c + "\\) factors, and each factor is \\(" + b + "\\), so the power is \\(" + b + "^{" + c + "}\\). So the single power is <b>\\(" + b + "^{" + c + "}\\)</b>.",
      { mode: "repeated-to-power-pos", b: b, c: c });
  }
  var nb = ri(2, 6), nc = ri(2, 5);
  while (nb === nc) { nb = ri(2, 6); }
  var nshown = u3MultStr("(-" + nb + ")", nc);
  return mcq("What is " + nshown + " written as a single power?",
    { t: "\\((-" + nb + ")^{" + nc + "}\\)", fb: "Correct. The whole bracketed value is the repeated base." },
    [
      { t: "\\(" + nb + "^{" + nc + "}\\)", fb: "That drops the negative sign from the base." },
      { t: "\\((-" + nb + ")^{" + (nc + 1) + "}\\)", fb: "That adds one to the exponent. Count the factors shown." },
      { t: "\\((-" + nc + ")^{" + nb + "}\\)", fb: "That swaps the base value and the count of factors." }
    ],
    "There are \\(" + nc + "\\) factors, and each factor is \\((-" + nb + ")\\), so the power is \\((-" + nb + ")^{" + nc + "}\\). So the single power is <b>\\((-" + nb + ")^{" + nc + "}\\)</b>.",
    { mode: "repeated-to-power-neg", b: nb, c: nc });
}, ["Count the factors first. That count becomes the exponent.", "Write the repeated factor as the base, then use your count as the exponent."]);

E("u3-evaluate-single-power", 3, ["3.10"], 1, "gen", function () {
  var tuples = [];
  for (var pb = 2; pb <= 12; pb++) for (var pe = 2; pe <= 4; pe++) tuples.push([pb, pe, 1]);
  for (var qb = 2; qb <= 6; qb++) tuples.push([qb, 5, 1]);
  for (var nb2 = 2; nb2 <= 9; nb2++) for (var ne = 2; ne <= 3; ne++) tuples.push([nb2, ne, -1]);
  var tt = pick(tuples), b = tt[0], e = tt[1], mode = tt[2] < 0 ? "neg" : "pos";
  var val, shown;
  if (mode === "neg") { val = Math.pow(-b, e); shown = "(-" + b + ")^{" + e + "}"; }
  else { val = Math.pow(b, e); shown = b + "^{" + e + "}"; }
  var base = (mode === "neg") ? -b : b;
  var sol = "Expand as repeated multiplication and multiply step by step: \\[ \\begin{aligned} " + shown + " &= " + fmt(val) + " \\end{aligned} \\] So the value is <b>" + fmt(val) + "</b>.";
  return numq("Evaluate \\(" + shown + "\\).", val, 0, sol, { mode: "evaluate-single", base: base, e: e });
}, ["Expand the power as repeated multiplication first.", "Multiply the base by itself, using the exponent as the count."]);

E("u3-interchanged-base-exponent", 3, ["3.4", "3.5"], 1, "gen", function () {
  var tuples = [];
  for (var x = 2; x <= 8; x++) for (var y = 2; y <= 5; y++) {
    if (x === y) continue;
    var vx = Math.pow(x, y), vy = Math.pow(y, x);
    if (vx === vy || vx > 20000 || vy > 20000) continue;
    tuples.push([x, y, vx, vy]);
  }
  var t = pick(tuples), a = t[0], b = t[1], va = t[2], vb = t[3];
  var mode = pick(["evalA", "evalB", "greater", "difference"]);
  if (mode === "greater") {
    var greater = va > vb ? "\\(" + a + "^{" + b + "}\\)" : "\\(" + b + "^{" + a + "}\\)";
    var other = va > vb ? "\\(" + b + "^{" + a + "}\\)" : "\\(" + a + "^{" + b + "}\\)";
    return mcq("Which is greater, \\(" + a + "^{" + b + "}\\) or \\(" + b + "^{" + a + "}\\)?",
      { t: greater, fb: "Correct. Its repeated multiplication gives the larger value." },
      [
        { t: other, fb: "That power has the smaller value. Expand both and compare." },
        { t: "\\(" + a + "^{" + a + "}\\)", fb: "That changes the exponent to match the base." },
        { t: "\\(" + b + "^{" + b + "}\\)", fb: "That changes the exponent to match the base." }
      ],
      "Expand each power: \\[ \\begin{aligned} " + a + "^{" + b + "} &= " + fmt(va) + " \\\\ " + b + "^{" + a + "} &= " + fmt(vb) + " \\end{aligned} \\] Comparing the values, the greater power is <b>" + greater + "</b>.",
      { mode: "which-greater", a: a, b: b });
  }
  if (mode === "difference") {
    var diff = Math.abs(va - vb);
    var ds = u3Pick3(diff, [
      { v: diff + a, fb: "That is a little too large. Subtract the two values carefully." },
      { v: Math.abs(diff - b), fb: "That is a little too small. Subtract the two values carefully." },
      { v: va + vb, fb: "That adds the values. The question asks for the difference." },
      { v: diff + 10, fb: "That is too large. Find each value, then subtract." },
      { v: Math.abs(a - b), fb: "That subtracts the small numbers, not the two power values." }
    ]);
    return mcq("What is the difference between \\(" + a + "^{" + b + "}\\) and \\(" + b + "^{" + a + "}\\)?",
      { t: fmt(diff), fb: "Correct. You found both values and subtracted." }, ds,
      "Find each value first: \\[ \\begin{aligned} " + a + "^{" + b + "} &= " + fmt(va) + " \\\\ " + b + "^{" + a + "} &= " + fmt(vb) + " \\end{aligned} \\] The difference is \\(" + fmt(Math.max(va, vb)) + "-" + fmt(Math.min(va, vb)) + "=" + fmt(diff) + "\\). So the difference is <b>" + fmt(diff) + "</b>.",
      { mode: "difference-interchanged", a: a, b: b });
  }
  var isA = (mode === "evalA");
  var base = isA ? a : b, exp = isA ? b : a, val = isA ? va : vb;
  var ds2 = u3Pick3(val, [
    { v: base * exp, fb: "That multiplies the base and exponent. Use repeated multiplication." },
    { v: isA ? vb : va, fb: "That is the value with the base and exponent swapped." },
    { v: val + base, fb: "That is a little too large. Expand the power fully." },
    { v: Math.abs(val - base), fb: "That is a little too small. Expand the power fully." },
    { v: base + exp, fb: "That adds the base and exponent. Use repeated multiplication." }
  ]);
  return mcq("What is the value of \\(" + base + "^{" + exp + "}\\)?",
    { t: fmt(val), fb: "Correct. The base repeats as many times as the exponent says." }, ds2,
    "The base \\(" + base + "\\) repeats \\(" + exp + "\\) times: \\[ \\begin{aligned} " + base + "^{" + exp + "} &= " + fmt(val) + " \\end{aligned} \\] So the value is <b>" + fmt(val) + "</b>.",
    { mode: "evaluate-interchanged", base: base, exp: exp });
}, ["Expand both powers as repeated multiplication before you compare or subtract.", "Write out the first power in full, multiplying the base by itself."]);

E("u3-parentheses-sign", 3, ["3.8"], 1, "gen", function () {
  var b = ri(2, 9), e = ri(2, 4);
  if (b >= 8 && e === 4) e = 3;
  var form = pick(["bracket", "outside", "inside"]);
  var val, shown;
  if (form === "bracket") { val = Math.pow(-b, e); shown = "(-" + b + ")^{" + e + "}"; }
  else if (form === "outside") { val = -Math.pow(b, e); shown = "-" + b + "^{" + e + "}"; }
  else { val = -Math.pow(b, e); shown = "(-" + b + "^{" + e + "})"; }
  var ds = u3Pick3(val, [
    { v: -val, fb: "That has the opposite sign. Check what the brackets cover." },
    { v: Math.pow(b, e), fb: "That ignores the negative sign in the expression." },
    { v: -Math.pow(b, e), fb: "That puts the negative sign outside the power." },
    { v: b * e, fb: "That multiplies the base and exponent. Use repeated multiplication." },
    { v: val + b, fb: "That is close, but the sign or value is off. Expand carefully." },
    { v: val - b, fb: "That is close, but the sign or value is off. Expand carefully." }
  ]);
  var explain = form === "bracket" ? "The brackets make \\((-" + b + ")\\) the base, so the negative value is multiplied each time." : "The power applies to \\(" + b + "\\) first, and the negative sign stays outside.";
  return mcq("Evaluate \\(" + shown + "\\).",
    { t: fmt(val), fb: "Correct. You handled the brackets and the sign correctly." }, ds,
    explain + " \\[ \\begin{aligned} " + shown + " &= " + fmt(val) + " \\end{aligned} \\] So the value is <b>" + fmt(val) + "</b>.",
    { mode: "parentheses-" + form, b: b, e: e });
}, ["Look at what the brackets cover. That tells you what the base is.", "Work out the power part first, then apply the sign the brackets give you."]);

E("u3-zero-exponent", 3, ["3.9"], 1, "gen", function () {
  var mode = pick(["direct", "direct", "pattern"]);
  if (mode === "pattern") {
    var a = ri(2, 9);
    var ds = u3Pick3(1, [
      { v: 0, fb: "That treats the zero exponent as giving zero. Follow the pattern down." },
      { v: a, fb: "That is the value of the first power, not the zero power." },
      { v: a * a, fb: "That is the value of the squared power, not the zero power." }
    ]);
    return mcq("A pattern shows \\(" + a + "^{3}=" + fmt(Math.pow(a, 3)) + "\\), \\(" + a + "^{2}=" + fmt(Math.pow(a, 2)) + "\\) and \\(" + a + "^{1}=" + fmt(a) + "\\). Each step divides by \\(" + a + "\\). What is \\(" + a + "^{0}\\)?",
      { t: "1", fb: "Correct. Dividing once more by the base gives one." }, ds,
      "Each step down divides by \\(" + a + "\\): \\[ \\begin{aligned} " + a + "^{1}\\div " + a + " &= " + fmt(a) + "\\div " + a + " \\\\ &= 1 \\end{aligned} \\] So the value is <b>1</b>.",
      { mode: "zero-pattern", a: a });
  }
  var aList = [];
  for (var ai = -20; ai <= 20; ai++) { if (ai !== 0 && ai !== 1 && ai !== -1) aList.push(ai); }
  aList = aList.concat([2.5, 3.5, 4.5, 5.5, -2.5, -3.5, -4.5, -5.5, 0.5, -0.5, 1.5, -1.5]);
  var a2 = pick(aList);
  var shownA = a2 < 0 ? "(" + a2 + ")^{0}" : a2 + "^{0}";
  var ds2 = u3Pick3(1, [
    { v: 0, fb: "That treats the zero exponent as giving zero." },
    { v: a2, fb: "That keeps the base as the answer. A zero exponent gives one." },
    { v: -1, fb: "That has the wrong sign. A zero exponent gives positive one." }
  ]);
  if (Math.abs(a2 - Math.round(a2)) > 1e-9) { for (var zi = 0; zi < ds2.length; zi++) { if (ds2[zi].t === "0") { ds2[zi].t = "0.0"; break; } } }
  return mcq("Evaluate \\(" + shownA + "\\).",
    { t: "1", fb: "Correct. Any nonzero base to the power zero equals one." }, ds2,
    "A power with exponent \\(0\\) and a nonzero base equals \\(1\\): \\[ \\begin{aligned} " + shownA + " &= 1 \\end{aligned} \\] So the value is <b>1</b>.",
    { mode: "zero-direct", a: a2 });
}, ["Think about the pattern as the exponent drops by one each time.", "Divide the value of the first power by the base to reach the zero power."]);

E("u3-product-law", 3, ["3.11"], 1, "gen", function () {
  var a = ri(2, 9), m = ri(2, 6), n = ri(1, 6);
  if (m === 2 && n === 2) n = 3;
  var ds = u3PowDist(a, m + n, [
    { v: m * n, fb: "That multiplies the exponents. The product law adds them." },
    { v: m + n + 1, fb: "That adds one extra. Add the two exponents only." },
    { v: m + n - 1, fb: "That is one too small. Add the two exponents." },
    { v: Math.abs(m - n), fb: "That subtracts the exponents. The product law adds them." },
    { v: m * n + 1, fb: "That multiplies and adds one. Add the exponents instead." }
  ]);
  return mcq("Write \\(" + a + "^{" + m + "}\\times " + a + "^{" + n + "}\\) as a single power.",
    { t: "\\(" + a + "^{" + (m + n) + "}\\)", fb: "Correct. Same base, so the exponents add." }, ds,
    "The bases match, so add the exponents: \\[ \\begin{aligned} " + a + "^{" + m + "}\\times " + a + "^{" + n + "} &= " + a + "^{" + m + "+" + n + "} \\\\ &= " + a + "^{" + (m + n) + "} \\end{aligned} \\] So the single power is <b>\\(" + a + "^{" + (m + n) + "}\\)</b>.",
    { mode: "product-law", a: a, m: m, n: n });
}, ["Check whether the bases match. Matching bases use the product law.", "Add the two exponents and keep the same base."]);

E("u3-quotient-law", 3, ["3.11"], 1, "gen", function () {
  var a = ri(2, 9), n = ri(1, 4), m = n + ri(2, 5);
  var ds = u3PowDist(a, m - n, [
    { v: m + n, fb: "That adds the exponents. The quotient law subtracts them." },
    { v: m * n, fb: "That multiplies the exponents. The quotient law subtracts them." },
    { v: m - n + 1, fb: "That is one too large. Subtract the exponents only." },
    { v: m - n - 1, fb: "That is one too small, or uses the wrong order." },
    { v: m, fb: "That keeps the top exponent. Subtract the bottom exponent." }
  ]);
  return mcq("Write \\(" + a + "^{" + m + "}\\div " + a + "^{" + n + "}\\) as a single power.",
    { t: "\\(" + a + "^{" + (m - n) + "}\\)", fb: "Correct. Same base, so the exponents subtract." }, ds,
    "The bases match, so subtract the exponents: \\[ \\begin{aligned} " + a + "^{" + m + "}\\div " + a + "^{" + n + "} &= " + a + "^{" + m + "-" + n + "} \\\\ &= " + a + "^{" + (m - n) + "} \\end{aligned} \\] So the single power is <b>\\(" + a + "^{" + (m - n) + "}\\)</b>.",
    { mode: "quotient-law", a: a, m: m, n: n });
}, ["Check whether the bases match. Matching bases use the quotient law.", "Subtract the bottom exponent from the top exponent."]);

E("u3-power-of-power-law", 3, ["3.11"], 1, "gen", function () {
  var a = ri(2, 9), m = ri(2, 5), n = ri(2, 4);
  var ds = u3PowDist(a, m * n, [
    { v: m + n, fb: "That adds the exponents. A power of a power multiplies them." },
    { v: m * n + 1, fb: "That is one too large. Multiply the two exponents only." },
    { v: m * n - 1, fb: "That is one too small. Multiply the two exponents." },
    { v: Math.abs(m - n), fb: "That subtracts the exponents. Multiply them instead." },
    { v: m, fb: "That keeps only the inner exponent. Use both exponents." }
  ]);
  return mcq("Write \\((" + a + "^{" + m + "})^{" + n + "}\\) as a single power.",
    { t: "\\(" + a + "^{" + (m * n) + "}\\)", fb: "Correct. A power of a power multiplies the exponents." }, ds,
    "For a power of a power, multiply the exponents: \\[ \\begin{aligned} (" + a + "^{" + m + "})^{" + n + "} &= " + a + "^{" + m + "\\times " + n + "} \\\\ &= " + a + "^{" + (m * n) + "} \\end{aligned} \\] So the single power is <b>\\(" + a + "^{" + (m * n) + "}\\)</b>.",
    { mode: "power-of-power-law", a: a, m: m, n: n });
}, ["A power raised to another power is the power of a power law.", "Multiply the inner exponent by the outer exponent."]);

E("u3-two-laws-evaluate", 3, ["3.12"], 1, "gen", function () {
  var mode = pick(["prod", "quot", "powpow"]);
  var a, expr, val, steps;
  if (mode === "prod") {
    a = ri(2, 6); var m = ri(2, 3), n = ri(2, 3);
    val = Math.pow(a, m + n);
    expr = a + "^{" + m + "}\\times " + a + "^{" + n + "}";
    steps = a + "^{" + m + "}\\times " + a + "^{" + n + "} &= " + a + "^{" + (m + n) + "} \\\\ &= " + fmt(val);
  } else if (mode === "quot") {
    a = ri(2, 7); var n2 = ri(1, 2), m2 = n2 + ri(3, 4);
    val = Math.pow(a, m2 - n2);
    expr = a + "^{" + m2 + "}\\div " + a + "^{" + n2 + "}";
    steps = a + "^{" + m2 + "}\\div " + a + "^{" + n2 + "} &= " + a + "^{" + (m2 - n2) + "} \\\\ &= " + fmt(val);
  } else {
    a = ri(2, 5); var m3 = ri(2, 3), n3 = 2;
    val = Math.pow(a, m3 * n3);
    expr = "(" + a + "^{" + m3 + "})^{" + n3 + "}";
    steps = "(" + a + "^{" + m3 + "})^{" + n3 + "} &= " + a + "^{" + (m3 * n3) + "} \\\\ &= " + fmt(val);
  }
  return numq("Evaluate \\(" + expr + "\\) by first writing it as a single power.", val, 0,
    "Apply the exponent law first, then evaluate: \\[ \\begin{aligned} " + steps + " \\end{aligned} \\] So the value is <b>" + fmt(val) + "</b>.",
    { mode: "two-laws-" + mode, a: a });
}, ["Use an exponent law to write the expression as one power first.", "Combine the exponents with the matching law, then evaluate that power."]);

E("u3-power-of-product-quotient", 3, ["3.12"], 1, "gen", function () {
  var mode = pick(["prod", "prod", "quotInt", "quotDec"]);
  if (mode === "prod") {
    var a = ri(2, 6), b = ri(2, 6), n = ri(2, 3);
    var val = Math.pow(a * b, n);
    return numq("Evaluate \\((" + a + "\\times " + b + ")^{" + n + "}\\).", val, 0,
      "Work out the value inside the brackets first, then apply the power: \\[ \\begin{aligned} (" + a + "\\times " + b + ")^{" + n + "} &= " + fmt(a * b) + "^{" + n + "} \\\\ &= " + fmt(val) + " \\end{aligned} \\] So the value is <b>" + fmt(val) + "</b>.",
      { mode: "power-of-product", a: a, b: b, n: n });
  }
  if (mode === "quotInt") {
    var pairs = [[6, 2], [6, 3], [8, 2], [8, 4], [9, 3], [10, 2], [10, 5], [12, 3], [12, 4], [15, 3], [15, 5], [20, 4]];
    var pr = pick(pairs), q = pr[0] / pr[1], n2 = ri(2, 3);
    var val2 = Math.pow(q, n2);
    return numq("Evaluate \\((" + pr[0] + "\\div " + pr[1] + ")^{" + n2 + "}\\).", val2, 0,
      "Work out the value inside the brackets first, then apply the power: \\[ \\begin{aligned} (" + pr[0] + "\\div " + pr[1] + ")^{" + n2 + "} &= " + fmt(q) + "^{" + n2 + "} \\\\ &= " + fmt(val2) + " \\end{aligned} \\] So the value is <b>" + fmt(val2) + "</b>.",
      { mode: "power-of-quotient-int", a: pr[0], b: pr[1], n: n2 });
  }
  var dpairs = [[3, 2], [5, 2], [7, 2], [9, 2], [5, 4], [3, 4], [7, 4], [9, 4], [6, 4], [10, 4]];
  var dp = pick(dpairs), dv = dp[0] / dp[1], dval = dv * dv;
  return numq("Evaluate \\((" + dp[0] + "\\div " + dp[1] + ")^{2}\\). Give your answer as a decimal.", dval, 0.01,
    "Work out the value inside the brackets first, then square it: \\[ \\begin{aligned} (" + dp[0] + "\\div " + dp[1] + ")^{2} &= " + fmt(dv) + "^{2} \\\\ &= " + fmt(dval) + " \\end{aligned} \\] So the value is <b>" + fmt(dval) + "</b>.",
    { mode: "power-of-quotient-dec", a: dp[0], b: dp[1], n: 2 });
}, ["Start with the value inside the brackets.", "Calculate inside the brackets, then apply the outside power to that value."]);

E("u3-sum-of-powers", 3, ["3.13"], 1, "gen", function () {
  var mode = pick(["same", "diff"]);
  var expr, val, steps;
  if (mode === "same") {
    var a = ri(2, 7), m = ri(3, 4), n = ri(2, 3);
    var v1 = Math.pow(a, m), v2 = Math.pow(a, n);
    val = v1 + v2; expr = a + "^{" + m + "}+" + a + "^{" + n + "}";
    steps = a + "^{" + m + "}+" + a + "^{" + n + "} &= " + fmt(v1) + "+" + fmt(v2) + " \\\\ &= " + fmt(val);
  } else {
    var a2 = ri(2, 7), b2 = ri(2, 7), m2 = ri(2, 3), n2 = ri(2, 3);
    var w1 = Math.pow(a2, m2), w2 = Math.pow(b2, n2);
    val = w1 + w2; expr = a2 + "^{" + m2 + "}+" + b2 + "^{" + n2 + "}";
    steps = a2 + "^{" + m2 + "}+" + b2 + "^{" + n2 + "} &= " + fmt(w1) + "+" + fmt(w2) + " \\\\ &= " + fmt(val);
  }
  return numq("Determine the sum \\(" + expr + "\\). Show the value of each power in your work.", val, 0,
    "Evaluate each power on its own first, then add: \\[ \\begin{aligned} " + steps + " \\end{aligned} \\] So the sum is <b>" + fmt(val) + "</b>.",
    { mode: "sum-" + mode });
}, ["Evaluate each power separately before you add anything.", "Find the value of the first power, then the second power, then add them."]);

E("u3-difference-of-powers", 3, ["3.14"], 1, "gen", function () {
  var mode = pick(["same", "diff"]);
  var expr, val, steps;
  if (mode === "same") {
    var a = ri(2, 7), m = ri(3, 4), n = ri(2, 3);
    if (m === n) m = n + 1;
    var v1 = Math.pow(a, m), v2 = Math.pow(a, n);
    val = v1 - v2; expr = a + "^{" + m + "}-" + a + "^{" + n + "}";
    steps = a + "^{" + m + "}-" + a + "^{" + n + "} &= " + fmt(v1) + "-" + fmt(v2) + " \\\\ &= " + fmt(val);
  } else {
    var a2 = ri(3, 8), b2 = ri(2, 6), m2 = ri(2, 3), n2 = ri(2, 3);
    var w1 = Math.pow(a2, m2), w2 = Math.pow(b2, n2);
    if (w1 <= w2) { var tmp = w1; w1 = w2; w2 = tmp; expr = b2 + "^{" + n2 + "}-" + a2 + "^{" + m2 + "}"; steps = b2 + "^{" + n2 + "}-" + a2 + "^{" + m2 + "} &= " + fmt(w1) + "-" + fmt(w2) + " \\\\ &= " + fmt(w1 - w2); val = w1 - w2; }
    else { expr = a2 + "^{" + m2 + "}-" + b2 + "^{" + n2 + "}"; steps = a2 + "^{" + m2 + "}-" + b2 + "^{" + n2 + "} &= " + fmt(w1) + "-" + fmt(w2) + " \\\\ &= " + fmt(w1 - w2); val = w1 - w2; }
  }
  return numq("Determine the difference \\(" + expr + "\\). Show the value of each power in your work.", val, 0,
    "Evaluate each power on its own first, then subtract: \\[ \\begin{aligned} " + steps + " \\end{aligned} \\] So the difference is <b>" + fmt(val) + "</b>.",
    { mode: "difference-" + mode });
}, ["Evaluate each power separately before you subtract anything.", "Find the value of the first power, then the second power, then subtract."]);

E("u3-find-the-error", 3, ["3.15"], 2, "gen", function () {
  var tuples = [];
  for (var a = 2; a <= 3; a++) for (var m = 2; m <= 4; m++) for (var n = 2; n <= 4; n++) for (var p = 2; p <= 4; p++) {
    if (m * n === m + n) continue;
    var worst = (a === 2) ? 16 : 10;
    if (m * n + p + 1 > worst) continue;
    tuples.push([a, m, n, p]);
  }
  var t = pick(tuples), a = t[0], m = t[1], n = t[2], p = t[3], q = 1;
  var err = ri(1, 4);
  var e1 = (err === 1) ? (m + n) : (m * n);
  var e2 = (err === 2) ? (e1 - p) : (e1 + p);
  var e3 = (err === 3) ? (e2 + q) : (e2 - q);
  var finalVal = Math.pow(a, e3);
  var shownFinal = (err === 4) ? finalVal * a : finalVal;
  var s1 = "(" + a + "^{" + m + "})^{" + n + "} = " + a + "^{" + e1 + "}";
  var s2 = a + "^{" + e1 + "}\\times " + a + "^{" + p + "} = " + a + "^{" + e2 + "}";
  var s3 = a + "^{" + e2 + "}\\div " + a + "^{" + q + "} = " + a + "^{" + e3 + "}";
  var s4 = a + "^{" + e3 + "} = " + fmt(shownFinal);
  var prompt = "A student simplifies \\(((" + a + "^{" + m + "})^{" + n + "}\\times " + a + "^{" + p + "})\\div " + a + "^{" + q + "}\\) in four steps.<br>Step 1: \\(" + s1 + "\\)<br>Step 2: \\(" + s2 + "\\)<br>Step 3: \\(" + s3 + "\\)<br>Step 4: \\(" + s4 + "\\)<br>In which step does the first error occur?";
  var fb = {
    1: "Step 1 uses the power of a power law, which multiplies the exponents.",
    2: "Step 2 uses the product law, which adds the exponents.",
    3: "Step 3 uses the quotient law, which subtracts the exponents.",
    4: "Step 4 evaluates the final power."
  };
  function mkOpt(k) { return { t: "Step " + k, fb: (k === err) ? "Correct. " + fb[k] : "That step follows correctly from the step before it. " + fb[k] }; }
  var correctExp = (function () {
    var ce1 = m * n, ce2 = ce1 + p, ce3 = ce2 - q;
    return { e1: ce1, e2: ce2, e3: ce3, v: Math.pow(a, ce3) };
  })();
  return mcq(prompt, mkOpt(err), [1, 2, 3, 4].filter(function (k) { return k !== err; }).map(mkOpt),
    "Check each law in order. The correct chain is \\[ \\begin{aligned} ((" + a + "^{" + m + "})^{" + n + "}\\times " + a + "^{" + p + "})\\div " + a + "^{" + q + "} &= " + a + "^{" + correctExp.e1 + "}\\times " + a + "^{" + p + "}\\div " + a + "^{" + q + "} \\\\ &= " + a + "^{" + correctExp.e3 + "} \\\\ &= " + fmt(correctExp.v) + " \\end{aligned} \\] The first error is in <b>Step " + err + "</b>.",
    { mode: "find-error", a: a, m: m, n: n, p: p, err: err });
}, ["Check the steps in order, one law at a time.", "Start with Step 1 and ask whether the power of a power law was used correctly."]);

E("u3-three-laws-evaluate", 3, ["3.12"], 3, "gen", function () {
  var mode = pick(["chain", "negbase"]);
  if (mode === "negbase") {
    var b = ri(2, 6), e = pick([2, 3, 4]), f = ri(1, 2);
    var v1 = Math.pow(-b, e), v2 = Math.pow(b, f), val = v1 * v2;
    if (Math.abs(val) > 90000) { f = 1; v2 = b; val = v1 * v2; }
    return numq("Evaluate \\((-" + b + ")^{" + e + "}\\times " + b + "^{" + f + "}\\).", val, 0,
      "Evaluate each power first, watching the brackets for the sign: \\[ \\begin{aligned} (-" + b + ")^{" + e + "}\\times " + b + "^{" + f + "} &= " + fmt(v1) + "\\times " + fmt(v2) + " \\\\ &= " + fmt(val) + " \\end{aligned} \\] So the value is <b>" + fmt(val) + "</b>.",
      { mode: "three-laws-negbase", b: b, e: e, f: f });
  }
  var tuples = [];
  for (var a = 2; a <= 5; a++) for (var m = 2; m <= 3; m++) for (var n = 2; n <= 3; n++) for (var p = 1; p <= 3; p++) {
    var tot = m * n + p - 1;
    if (Math.pow(a, tot) > 90000) continue;
    tuples.push([a, m, n, p, tot]);
  }
  var t = pick(tuples), a2 = t[0], m2 = t[1], n2 = t[2], p2 = t[3], tot2 = t[4];
  var val2 = Math.pow(a2, tot2);
  return numq("Evaluate \\(((" + a2 + "^{" + m2 + "})^{" + n2 + "}\\times " + a2 + "^{" + p2 + "})\\div " + a2 + "\\).", val2, 0,
    "Apply the laws one at a time: \\[ \\begin{aligned} ((" + a2 + "^{" + m2 + "})^{" + n2 + "}\\times " + a2 + "^{" + p2 + "})\\div " + a2 + " &= " + a2 + "^{" + tot2 + "} \\\\ &= " + fmt(val2) + " \\end{aligned} \\] So the value is <b>" + fmt(val2) + "</b>.",
    { mode: "three-laws-chain", a: a2, m: m2, n: n2, p: p2 });
}, ["Work through the laws in a sensible order, one law at a time.", "Start with the power of a power inside the brackets."]);

E("u3-law-then-sum-difference", 3, ["3.13", "3.14"], 3, "gen", function () {
  var a = ri(2, 6), mn = pick([[2, 2], [2, 3], [3, 2]]), m = mn[0], n = mn[1], p = ri(2, 5);
  var first = Math.pow(a, m * n), second = Math.pow(a, p);
  var isSum = pick([true, false]);
  var word = isSum ? "sum" : "difference";
  var expr, val, stepLine;
  if (isSum) {
    val = first + second;
    expr = "(" + a + "^{" + m + "})^{" + n + "}+" + a + "^{" + p + "}";
    stepLine = expr + " &= " + fmt(first) + "+" + fmt(second) + " \\\\ &= " + fmt(val);
  } else if (first >= second) {
    val = first - second;
    expr = "(" + a + "^{" + m + "})^{" + n + "}-" + a + "^{" + p + "}";
    stepLine = expr + " &= " + fmt(first) + "-" + fmt(second) + " \\\\ &= " + fmt(val);
  } else {
    val = second - first;
    expr = a + "^{" + p + "}-(" + a + "^{" + m + "})^{" + n + "}";
    stepLine = expr + " &= " + fmt(second) + "-" + fmt(first) + " \\\\ &= " + fmt(val);
  }
  return numq("Determine the " + word + " \\(" + expr + "\\). Simplify the power of a power first.", val, 0,
    "Simplify the power of a power, evaluate each part, then combine: \\[ \\begin{aligned} " + stepLine + " \\end{aligned} \\] So the " + word + " is <b>" + fmt(val) + "</b>.",
    { mode: "law-then-" + word, a: a, m: m, n: n, p: p });
}, ["Simplify any power that needs a law before you combine values.", "Start with the power of a power, then evaluate each part."]);

E("u3-explanations-var", 3, ["3.5", "3.8"], 3, "var", varset([
  function () {
    return mcq("Which explanation shows why \\(2^{3}\\) and \\(3^{2}\\) have different values?",
      { t: "\\(2^{3}=2\\times 2\\times 2=8\\) while \\(3^{2}=3\\times 3=9\\)", fb: "Correct. The repeated multiplication is different in each power." },
      [
        { t: "\\(2^{3}=2\\times 3=6\\) while \\(3^{2}=3\\times 2=6\\)", fb: "That multiplies the base by the exponent in each power." },
        { t: "\\(2^{3}=3\\times 3=9\\) while \\(3^{2}=2\\times 2=4\\)", fb: "That repeats the exponent instead of the base." },
        { t: "Both powers equal 8 because the digits are the same", fb: "That keeps one value and ignores the second power." }
      ],
      "Write each power as repeated multiplication: \\[ \\begin{aligned} 2^{3} &= 2\\times 2\\times 2 = 8 \\\\ 3^{2} &= 3\\times 3 = 9 \\end{aligned} \\] So the correct explanation is <b>\\(2^{3}=2\\times 2\\times 2=8\\) while \\(3^{2}=3\\times 3=9\\)</b>.",
      { mode: "explain-interchanged" });
  },
  function () {
    return mcq("Which statement explains the difference between \\((-3)^{2}\\) and \\(-3^{2}\\)?",
      { t: "In \\((-3)^{2}\\) the base is \\(-3\\), giving 9; in \\(-3^{2}\\) only 3 is squared, giving -9", fb: "Correct. The brackets change what the base is." },
      [
        { t: "Both equal 9 because squaring always makes a value positive in every single case", fb: "That overlooks the negative sign sitting outside the second power." },
        { t: "Both equal -9 because the negative sign always stays with the answer in both powers", fb: "That overlooks the brackets making negative three the base in the first." },
        { t: "In \\((-3)^{2}\\) the answer is -9 and in \\(-3^{2}\\) the answer is 9, swapped around", fb: "That reverses the two results. Check each base carefully." }
      ],
      "In the first power the brackets make \\(-3\\) the base: \\[ \\begin{aligned} (-3)^{2} &= (-3)\\times (-3) = 9 \\\\ -3^{2} &= -(3\\times 3) = -9 \\end{aligned} \\] So the correct statement is <b>In \\((-3)^{2}\\) the base is \\(-3\\), giving 9; in \\(-3^{2}\\) only 3 is squared, giving -9</b>.",
      { mode: "explain-parentheses" });
  },
  function () {
    return mcq("The values \\(5^{3}=125\\), \\(5^{2}=25\\) and \\(5^{1}=5\\) follow a pattern. Which argument correctly gives \\(5^{0}\\)?",
      { t: "Each step divides by 5, so the next value is \\(5\\div 5=1\\)", fb: "Correct. Continuing the division pattern gives one." },
      [
        { t: "Each step subtracts 5, so the next value is \\(5-5=0\\)", fb: "That uses subtraction. The pattern divides by the base each time." },
        { t: "A zero exponent means zero factors, so the value must be 0", fb: "That gives zero, but the division pattern leads to one." },
        { t: "The exponent is zero, so the value stays at the base, which is 5", fb: "That keeps the base. Continue the pattern one more step." }
      ],
      "Follow the pattern downward: \\[ \\begin{aligned} 5^{3} &= 125 \\\\ 5^{2} &= 125\\div 5 = 25 \\\\ 5^{1} &= 25\\div 5 = 5 \\\\ 5^{0} &= 5\\div 5 = 1 \\end{aligned} \\] So the correct argument is <b>Each step divides by 5, so the next value is \\(5\\div 5=1\\)</b>.",
      { mode: "explain-zero-pattern" });
  }
]), ["Read each explanation fully and check its repeated multiplication or pattern.", "Test the first explanation against the actual values of the powers."]);

/* ----- bank-u4.js ----- */
// Math 9 Unit 4 Polynomials question bank
// Cut verbatim from the standalone bank source
// (math-9-review/bank-src.js, lines 1128 to 1504).
// CRMARKS: u4-add=3
// CRMARKS: u4-subtract=3
// CRMARKS: u4-multiply-monomial=3
// CRMARKS: u4-divide-monomial=2
// CRMARKS: u4-mult-div-mixed=2
// CRMARKS: u4-missing=3
// CRMARKS: u4-area-monomial=2
// BIMODAL: u4-subtract=b
// BIMODAL: u4-missing=b
// BIMODAL: u4-area-monomial=b
/* Unit 4: Polynomials */
function u4expr(terms){var s="",first=true;for(var i=0;i<terms.length;i++){var cf=terms[i][0],v=terms[i][1];if(cf===0)continue;var mag;if(v===""){mag=fmt(Math.abs(cf));}else if(Math.abs(cf)===1){mag=v;}else{mag=fmt(Math.abs(cf))+v;}if(first){s+=(cf<0?"-":"")+mag;first=false;}else{s+=(cf<0?"-":"+")+mag;}}return s===""?"0":s;}
function u4p(a,b,c){return u4expr([[a,"x^{2}"],[b,"x"],[c,""]]);}
function u4m(a,b,c){return "\\("+u4p(a,b,c)+"\\)";}
function u4pxy(x,y,k){return u4expr([[x,"x"],[y,"y"],[k,""]]);}
function u4mxy(x,y,k){return "\\("+u4pxy(x,y,k)+"\\)";}
function u4nz(a,b){var v=ri(a,b),g=0;while(v===0&&g<60){v=ri(a,b);g++;}return v===0?2:v;}
function u4ok(c,ds){var all=[c];for(var i=0;i<ds.length;i++){if(all.indexOf(ds[i].t)>=0)return false;all.push(ds[i].t);}return true;}
function u4tiles(a,b,c){var parts=[];function tw(n,w){return fmt(Math.abs(n))+" "+(Math.abs(n)===1?w+" tile":w+" tiles");}if(a!==0)parts.push(tw(a,(a>0?"positive":"negative")+" x squared"));if(b!==0)parts.push(tw(b,(b>0?"positive":"negative")+" x"));if(c!==0)parts.push(tw(c,(c>0?"positive":"negative")+" unit"));return parts.length?parts.join(", "):"no tiles";}
function u4pick3(c,cands){var out=[],seen=[c];for(var i=0;i<cands.length&&out.length<3;i++){if(seen.indexOf(cands[i].t)<0){seen.push(cands[i].t);out.push(cands[i]);}}return out;}

E("u4-degree", 4, ["8.14"], 1, "gen", function(){
  var form=ri(0,2),a=0,b=0,c=0,deg=0;
  if(form===0){a=u4nz(-6,6);b=ri(-6,6);c=ri(-6,6);deg=2;}
  else if(form===1){b=u4nz(-8,8);c=ri(-8,8);deg=1;}
  else{c=u4nz(-9,9);deg=0;}
  var terms=(a!==0?1:0)+(b!==0?1:0)+(c!==0?1:0);
  var lead=a!==0?a:(b!==0?b:c);
  var cands=[{t:fmt(deg+1),fb:"That is one more than the highest power of x."},{t:fmt(terms),fb:"That counts the terms, not the highest power."},{t:fmt(Math.abs(lead)),fb:"That is a coefficient, not the highest power."},{t:fmt(deg+2),fb:"That is higher than any power in the expression."},{t:fmt(deg+3),fb:"That is higher than any power in the expression."}];
  var ds=u4pick3(fmt(deg),cands);
  var sol="The degree is the highest power of \\(x\\) in "+u4m(a,b,c)+". The highest power here gives degree <b>"+fmt(deg)+"</b>.";
  return mcq("What is the degree of "+u4m(a,b,c)+"?",{t:fmt(deg),fb:"Correct: the degree is the highest power of x."},ds,sol,{mode:"degree",form:form,a:a,b:b,c:c});
}, ["Look for the highest power of x in the expression.", "Find the term with the largest exponent; that exponent is the degree."]);

E("u4-parts", 4, ["8.14"], 1, "gen", function(){
  var a=u4nz(-8,8),b=u4nz(-9,9),c=u4nz(-9,9);
  var mode=pick(["terms","coeffx","coeffx2","const"]);
  var qtext="",ans=0;
  if(mode==="terms"){qtext="How many terms does "+u4m(a,b,c)+" have?";ans=3;}
  else if(mode==="coeffx"){qtext="What is the coefficient of the \\(x\\) term in "+u4m(a,b,c)+"?";ans=b;}
  else if(mode==="coeffx2"){qtext="What is the coefficient of the \\(x^{2}\\) term in "+u4m(a,b,c)+"?";ans=a;}
  else{qtext="What is the constant term in "+u4m(a,b,c)+"?";ans=c;}
  var cands=[{t:fmt(a),fb:"That is the coefficient of the x squared term."},{t:fmt(b),fb:"That is the coefficient of the x term."},{t:fmt(c),fb:"That is the constant term."},{t:fmt(3),fb:"That is the number of terms."},{t:fmt(ans+1),fb:"That is one more than the value asked for."},{t:fmt(ans-1),fb:"That is one less than the value asked for."},{t:fmt(-ans),fb:"Watch the sign: that value has the wrong sign."},{t:fmt(ans+2),fb:"That is two more than the value asked for."}];
  var ds=u4pick3(fmt(ans),cands);
  var label=mode==="terms"?"number of terms":(mode==="coeffx"?"coefficient of the x term":(mode==="coeffx2"?"coefficient of the x squared term":"constant term"));
  var sol="In "+u4m(a,b,c)+", the "+label+" is <b>"+fmt(ans)+"</b>.";
  return mcq(qtext,{t:fmt(ans),fb:"Correct: you read that value straight from the expression."},ds,sol,{mode:mode,a:a,b:b,c:c});
}, ["Read the value straight from the written expression; no simplifying is needed.", "Point to the part named in the question, then read off its value."]);

E("u4-tiles-to-expr", 4, ["8.16"], 1, "gen", function(){
  for(var att=0;att<200;att++){
    var a=ri(-4,4),b=ri(-5,5),c=ri(-5,5);
    var nz=(a!==0?1:0)+(b!==0?1:0)+(c!==0?1:0);
    if(nz<2)continue;
    var corr=u4m(a,b,c);
    var ds=[{t:u4m(a,-b,c),fb:"The x tiles have the opposite sign in the model."},{t:u4m(a,b,-c),fb:"The unit tiles have the opposite sign in the model."},{t:u4m(b,a,c),fb:"That swaps the x squared count with the x count."},{t:u4m(-a,b,c),fb:"The x squared tiles have the opposite sign in the model."}];
    if(!u4ok(corr,ds))continue;
    ds=ds.slice(0,3);
    var sol="Count each kind of tile with its sign: \\[ \\begin{aligned} x^{2} \\text{ tiles} &= "+fmt(a)+" \\\\ x \\text{ tiles} &= "+fmt(b)+" \\\\ \\text{unit tiles} &= "+fmt(c)+" \\end{aligned} \\] So the model shows <b>"+corr+"</b>.";
    return mcq("In an algebra tile model, a large square tile stands for \\(x^{2}\\), a long thin tile stands for \\(x\\) and a small square tile stands for \\(1\\); positive tiles are shaded and negative tiles are unshaded. A model has "+u4tiles(a,b,c)+". Which expression does the model show?",{t:corr,fb:"Correct: each tile count becomes the matching term."},ds,sol,{mode:"tiles2expr",a:a,b:b,c:c});
  }
  return mcq("A model has 2 positive x squared tiles, 3 positive x tiles, 1 negative unit tile. Which expression does the model show?",{t:u4m(2,3,-1),fb:"Correct: each tile count becomes the matching term."},[{t:u4m(2,3,1),fb:"The unit tile is negative in the model."},{t:u4m(3,2,-1),fb:"That swaps the x squared count with the x count."},{t:u4m(2,-3,-1),fb:"The x tiles are positive in the model."}],"Counting with signs gives <b>"+u4m(2,3,-1)+"</b>.",{mode:"tiles2expr",a:2,b:3,c:-1});
}, ["Turn each tile count into a term, keeping the sign of the tiles.", "Write the x squared count first, then the x count, then the unit count."]);

E("u4-expr-to-tiles", 4, ["8.15"], 1, "gen", function(){
  for(var att=0;att<200;att++){
    var a=u4nz(-4,4),b=u4nz(-5,5),c=u4nz(-5,5);
    var corr=u4tiles(a,b,c);
    var ds=[{t:u4tiles(a,-b,c),fb:"That flips the sign of the x tiles."},{t:u4tiles(a,b,-c),fb:"That flips the sign of the unit tiles."},{t:u4tiles(b,a,c),fb:"That swaps the x squared count with the x count."},{t:u4tiles(-a,b,c),fb:"That flips the sign of the x squared tiles."}];
    if(!u4ok(corr,ds))continue;
    ds=ds.slice(0,3);
    var sol="Each term tells the tile count: the \\(x^{2}\\) term gives "+fmt(a)+", the \\(x\\) term gives "+fmt(b)+" and the constant gives "+fmt(c)+". So the matching model has <b>"+corr+"</b>.";
    return mcq("Which description matches an algebra tile model of "+u4m(a,b,c)+"? In the model, a large square tile stands for \\(x^{2}\\), a long thin tile stands for \\(x\\) and a small square tile stands for \\(1\\).",{t:corr,fb:"Correct: each term becomes tiles of that kind and sign."},ds,sol,{mode:"expr2tiles",a:a,b:b,c:c});
  }
  return mcq("Which description matches an algebra tile model of "+u4m(2,-3,4)+"?",{t:u4tiles(2,-3,4),fb:"Correct: each term becomes tiles of that kind and sign."},[{t:u4tiles(2,3,4),fb:"That flips the sign of the x tiles."},{t:u4tiles(2,-3,-4),fb:"That flips the sign of the unit tiles."},{t:u4tiles(-3,2,4),fb:"That swaps the x squared count with the x count."}],"Reading term by term gives <b>"+u4tiles(2,-3,4)+"</b>.",{mode:"expr2tiles",a:2,b:-3,c:4});
}, ["Match each term of the expression to tiles of the same kind and sign.", "Start with the x squared term: its coefficient tells how many large square tiles, and its sign tells positive or negative."]);

E("u4-equivalent", 4, ["8.4","8.5"], 1, "gen", function(){
  for(var att=0;att<200;att++){
    var a=u4nz(-8,8),b=ri(-8,8),c=u4nz(-8,8),d=ri(-8,8);
    if(b===0&&d===0)continue;
    var sx=a+c,sk=b+d;
    if(sx===0)continue;
    var raw="\\("+u4expr([[a,"x"],[b,""],[c,"x"],[d,""]])+"\\)";
    var corr=u4m(0,sx,sk);
    var ds=[{t:u4m(0,sx,b-d),fb:"The constants were subtracted; both constants keep their signs when combining."},{t:u4m(0,a-c,sk),fb:"The x coefficients were subtracted; like terms are added with their signs."},{t:u4m(0,sx+sk,0),fb:"That combines the x terms and the constants into one term, but they are unlike terms."},{t:u4m(0,sx,-sk),fb:"The combined constant has the wrong sign."}];
    if(!u4ok(corr,ds))continue;
    ds=ds.slice(0,3);
    var sol="Combine the like terms: \\[ \\begin{aligned} "+u4expr([[a,"x"],[b,""],[c,"x"],[d,""]])+" &= ("+fmt(a)+"x+"+fmt(c)+"x)+("+fmt(b)+""+(d<0?"":"+")+""+fmt(d)+") \\\\ &= "+u4p(0,sx,sk)+" \\end{aligned} \\] So the equivalent expression is <b>"+corr+"</b>.";
    return mcq("Which expression is equivalent to "+raw+"?",{t:corr,fb:"Correct: the x terms combine and the constants combine."},ds,sol,{mode:"combine",a:a,b:b,c:c,d:d});
  }
  return mcq("Which expression is equivalent to \\(3x+2+5x-4\\)?",{t:u4m(0,8,-2),fb:"Correct: the x terms combine and the constants combine."},[{t:u4m(0,8,6),fb:"The constants were added without their signs."},{t:u4m(0,-2,-2),fb:"The x coefficients were subtracted instead of added."},{t:u4m(0,6,0),fb:"That combines unlike terms into one term."}],"Combining like terms gives <b>"+u4m(0,8,-2)+"</b>.",{mode:"combine",a:3,b:2,c:5,d:-4});
}, ["Group the x terms together and the constants together, then combine each group.", "First add the two x coefficients, keeping the signs of both numbers."]);

E("u4-add", 4, ["8.6"], 1, "gen", function(){
  for(var att=0;att<200;att++){
    var tri=ri(0,1)===1;
    var a1=tri?u4nz(-5,5):0,b1=u4nz(-8,8),c1=u4nz(-8,8);
    var a2=tri?ri(-5,5):0,b2=u4nz(-8,8),c2=u4nz(-8,8);
    var sa=a1+a2,sb=b1+b2,sc=c1+c2;
    var corr=u4m(sa,sb,sc);
    var ds=[{t:u4m(sa,sb,c1-c2),fb:"The constants were subtracted; addition keeps both signs as they are."},{t:u4m(sa,b1-b2,sc),fb:"The x coefficients were subtracted; addition keeps both signs as they are."},{t:u4m(sa,sb+sc,0),fb:"That folds the constant into the x term, but they are unlike terms."},{t:u4m(sa+a2,sb,sc),fb:"The x squared terms were handled twice; add each pair once."}];
    if(!u4ok(corr,ds))continue;
    ds=ds.slice(0,3);
    var sol="Group the like terms: \\[ \\begin{aligned} ("+u4p(a1,b1,c1)+")+("+u4p(a2,b2,c2)+") &= ("+u4expr([[a1,"x^{2}"],[a2,"x^{2}"],[b1,"x"],[b2,"x"]])+")+("+u4expr([[c1,""],[c2,""]])+") \\\\ &= "+u4p(sa,sb,sc)+" \\end{aligned} \\] So the sum is <b>"+corr+"</b>.";
    return mcq("Add: \\(("+u4p(a1,b1,c1)+")+("+u4p(a2,b2,c2)+")\\)",{t:corr,fb:"Correct: like terms are added pair by pair."},ds,sol,{mode:tri?"add-tri":"add-bi",a1:a1,b1:b1,c1:c1,a2:a2,b2:b2,c2:c2,cr:3});
  }
  return mcq("Add: \\((3x+5)+(2x-4)\\)",{t:u4m(0,5,1),fb:"Correct: like terms are added pair by pair."},[{t:u4m(0,5,9),fb:"The constants were handled with the wrong sign."},{t:u4m(0,1,1),fb:"The x coefficients were subtracted instead of added."},{t:u4m(0,6,0),fb:"That folds the constant into the x term."}],"Grouping like terms gives <b>"+u4m(0,5,1)+"</b>.",{mode:"add-bi",cr:3});
}, ["Add matching parts: x squared with x squared, x with x, constants with constants.", "First add the two x coefficients, keeping both signs."]);

E("u4-subtract", 4, ["8.7"], 2, "gen", function(){
  for(var att=0;att<200;att++){
    var tri=ri(0,1)===1;
    var a1=tri?u4nz(-5,5):0,b1=u4nz(-8,8),c1=u4nz(-8,8);
    var a2=tri?u4nz(-5,5):0,b2=u4nz(-8,8),c2=u4nz(-8,8);
    var sa=a1-a2,sb=b1-b2,sc=c1-c2;
    var corr=u4m(sa,sb,sc);
    var ds=[{t:u4m(a1+a2,b1+b2,c1+c2),fb:"That adds the second polynomial; subtraction must change every sign in it first."},{t:u4m(sa,sb,c1+c2),fb:"The constant sign was left unchanged; subtraction changes every sign in the second polynomial."},{t:u4m(sa,b1+b2,sc),fb:"The x term sign was left unchanged; subtraction changes every sign in the second polynomial."},{t:u4m(sa,sb+sc,0),fb:"That folds the constant into the x term, but they are unlike terms."}];
    if(!u4ok(corr,ds))continue;
    ds=ds.slice(0,3);
    var sol="Change every sign in the second polynomial, then add: \\[ \\begin{aligned} ("+u4p(a1,b1,c1)+")-("+u4p(a2,b2,c2)+") &= ("+u4p(a1,b1,c1)+")+("+u4p(-a2,-b2,-c2)+") \\\\ &= "+u4p(sa,sb,sc)+" \\end{aligned} \\] So the difference is <b>"+corr+"</b>.";
    return mcq("Subtract: \\(("+u4p(a1,b1,c1)+")-("+u4p(a2,b2,c2)+")\\)",{t:corr,fb:"Correct: every sign in the second polynomial changes, then like terms combine."},ds,sol,{mode:tri?"sub-tri":"sub-bi",a1:a1,b1:b1,c1:c1,a2:a2,b2:b2,c2:c2,cr:3});
  }
  return mcq("Subtract: \\((5x+3)-(2x-4)\\)",{t:u4m(0,3,7),fb:"Correct: every sign in the second polynomial changes, then like terms combine."},[{t:u4m(0,3,-1),fb:"The constant sign was left unchanged; subtraction changes every sign in the second polynomial."},{t:u4m(0,7,7),fb:"That adds the second polynomial instead of subtracting it."},{t:u4m(0,3,1),fb:"The constant sign change was applied the wrong way."}],"Changing signs then adding gives <b>"+u4m(0,3,7)+"</b>.",{mode:"sub-bi",cr:3});
}, ["Subtraction changes the sign of every term in the second polynomial before you combine.", "First rewrite the second polynomial with every sign flipped, then add like terms."]);

E("u4-addsub-xy", 4, ["8.11"], 2, "gen", function(){
  for(var att=0;att<200;att++){
    var mode=ri(0,1);
    if(mode===0){
      var x1=u4nz(-7,7),y1=u4nz(-7,7),k1=ri(-7,7);
      var x2=u4nz(-7,7),y2=u4nz(-7,7),k2=ri(-7,7);
      var sub=ri(0,1)===1;
      var sx=sub?x1-x2:x1+x2,sy=sub?y1-y2:y1+y2,sk=sub?k1-k2:k1+k2;
      var corr=u4mxy(sx,sy,sk);
      var ds=[{t:u4mxy(sx,sub?y1+y2:y1-y2,sk),fb:sub?"The y sign was left unchanged; subtraction flips every sign in the second polynomial.":"The y coefficients were subtracted in an addition question."},{t:u4mxy(sx,sy,sub?k1+k2:k1-k2),fb:sub?"The constant sign was left unchanged; subtraction flips every sign in the second polynomial.":"The constants were subtracted in an addition question."},{t:u4mxy(sx+sy,0,sk),fb:"That combines the x and y terms, but they are unlike terms."}];
      if(!u4ok(corr,ds))continue;
      var op=sub?"-":"+",act=sub?"difference":"sum";
      var sol="Combine each kind of term on its own: the result is <b>"+corr+"</b>.";
      if(sub){sol="Change every sign in the second polynomial, then combine each kind of term on its own: \\[ \\begin{aligned} ("+u4pxy(x1,y1,k1)+")-("+u4pxy(x2,y2,k2)+") &= ("+u4pxy(x1,y1,k1)+")+("+u4pxy(-x2,-y2,-k2)+") \\\\ &= "+u4pxy(sx,sy,sk)+" \\end{aligned} \\] So the difference is <b>"+corr+"</b>.";}
      else{sol="Group the like terms: \\[ \\begin{aligned} ("+u4pxy(x1,y1,k1)+")+("+u4pxy(x2,y2,k2)+") &= ("+u4expr([[x1,"x"],[x2,"x"]])+")+("+u4expr([[y1,"y"],[y2,"y"]])+")+("+u4expr([[k1,""],[k2,""]])+") \\\\ &= "+u4pxy(sx,sy,sk)+" \\end{aligned} \\] So the sum is <b>"+corr+"</b>.";}
      return mcq((sub?"Subtract: \\((":"Add: \\((")+u4pxy(x1,y1,k1)+")"+op+"("+u4pxy(x2,y2,k2)+")\\)",{t:corr,fb:"Correct: x terms, y terms and constants are handled separately."},ds,sol,{mode:sub?"xy-sub":"xy-add",x1:x1,y1:y1,k1:k1,x2:x2,y2:y2,k2:k2});
    }else{
      var a=u4nz(-5,5),b=u4nz(-8,8),c=u4nz(-8,8);
      var d=ri(-5,5),e=-u4nz(2,8),f=-u4nz(2,8);
      var sa=a-d,sb=b-e,sc=c-f;
      var corr2=u4m(sa,sb,sc);
      var ds2=[{t:u4m(sa,b+e,sc),fb:"Subtracting a negative x term adds its value; the sign change step was missed."},{t:u4m(sa,sb,c+f),fb:"Subtracting a negative constant adds its value; the sign change step was missed."},{t:u4m(a+d,sb,sc),fb:"The x squared terms were added; this is a subtraction."}];
      if(!u4ok(corr2,ds2))continue;
      var sol2="Change every sign in the second polynomial, then add: \\[ \\begin{aligned} ("+u4p(a,b,c)+")-("+u4p(d,e,f)+") &= ("+u4p(a,b,c)+")+("+u4p(-d,-e,-f)+") \\\\ &= "+u4p(sa,sb,sc)+" \\end{aligned} \\] So the difference is <b>"+corr2+"</b>.";
      return mcq("Subtract: \\(("+u4p(a,b,c)+")-("+u4p(d,e,f)+")\\)",{t:corr2,fb:"Correct: subtracting a negative term adds its value."},ds2,sol2,{mode:"sub-neg",a:a,b:b,c:c,d:d,e:e,f:f});
    }
  }
  return mcq("Add: \\((2x+3y)+(x-2y)\\)",{t:u4mxy(3,1,0),fb:"Correct: x terms, y terms and constants are handled separately."},[{t:u4mxy(3,5,0),fb:"The y coefficients were handled with the wrong sign."},{t:u4mxy(4,1,0),fb:"That combines x and y terms, which are unlike."},{t:u4mxy(2,1,0),fb:"The x coefficients were not added."}],"Combining like terms gives <b>"+u4mxy(3,1,0)+"</b>.",{mode:"xy-add"});
}, ["Keep x terms, y terms and constants in separate groups; unlike terms stay separate.", "First combine the x coefficients, then do the same for the y coefficients."]);

E("u4-multiply-monomial", 4, ["8.8"], 1, "gen", function(){
  for(var att=0;att<200;att++){
    var mode=ri(0,2);
    if(mode===2){
      var b=u4nz(-7,7),c=u4nz(-8,8);
      var corr=u4m(b,c,0);
      var ds=[{t:u4m(0,b+c,0),fb:"Multiplying by x raises each power; the terms do not merge into one x term."},{t:u4m(b,0,0),fb:"That multiplies only the first term; x multiplies every term."},{t:u4m(-b,c,0),fb:"The first product has the wrong sign."},{t:u4m(b,-c,0),fb:"The second product has the wrong sign."}];
      if(!u4ok(corr,ds))continue;
      ds=ds.slice(0,3);
      var sol="Multiply every term by \\(x\\): \\[ \\begin{aligned} x("+u4p(0,b,c)+") &= x \\cdot "+u4expr([[b,"x"]])+" + x \\cdot ("+fmt(c)+") \\\\ &= "+u4p(b,c,0)+" \\end{aligned} \\] So the product is <b>"+corr+"</b>.";
      return mcq("Multiply: \\(x("+u4p(0,b,c)+")\\)",{t:corr,fb:"Correct: x multiplies every term and each power rises by one."},ds,sol,{mode:"x-times-bi",b:b,c:c,cr:3});
    }
    var k=pick([-5,-4,-3,-2,2,3,4,5]);
    var tri=mode===1;
    var a=tri?u4nz(-5,5):0,b2=u4nz(-7,7),c2=u4nz(-8,8);
    var corr2=u4m(k*a,k*b2,k*c2);
    var ds2=[{t:u4m(k*a,b2,c2),fb:"That multiplies only the first term; the monomial multiplies every term."},{t:u4m(k*a,k*b2,c2),fb:"The constant term was left unmultiplied; the monomial multiplies every term."},{t:u4m(k*a,k*b2,-k*c2),fb:"The constant product has the wrong sign."},{t:u4m(a+k,b2+k,c2+k),fb:"That adds the monomial to each coefficient; this question multiplies."}];
    if(!u4ok(corr2,ds2))continue;
    ds2=ds2.slice(0,3);
    var prts=[];if(a!==0)prts.push("("+u4expr([[k*a,"x^{2}"]])+")");prts.push("("+u4expr([[k*b2,"x"]])+")");prts.push("("+fmt(k*c2)+")");
    var sol2="Multiply every term by \\("+fmt(k)+"\\): \\[ \\begin{aligned} "+fmt(k)+"("+u4p(a,b2,c2)+") &= "+prts.join("+")+" \\\\ &= "+u4p(k*a,k*b2,k*c2)+" \\end{aligned} \\] So the product is <b>"+corr2+"</b>.";
    return mcq("Multiply: \\("+fmt(k)+"("+u4p(a,b2,c2)+")\\)",{t:corr2,fb:"Correct: the monomial multiplies every term."},ds2,sol2,{mode:tri?"const-times-tri":"const-times-bi",k:k,a:a,b:b2,c:c2,cr:3});
  }
  return mcq("Multiply: \\(3(2x+5)\\)",{t:u4m(0,6,15),fb:"Correct: the monomial multiplies every term."},[{t:u4m(0,6,5),fb:"The constant was left unmultiplied."},{t:u4m(0,5,15),fb:"The x term was left unmultiplied."},{t:u4m(0,6,-15),fb:"The constant product has the wrong sign."}],"Multiplying every term gives <b>"+u4m(0,6,15)+"</b>.",{mode:"const-times-bi",cr:3});
}, ["The monomial multiplies every term inside the brackets, not just the first one.", "First multiply the monomial by the first term, then by each remaining term."]);

E("u4-divide-monomial", 4, ["8.9"], 1, "gen", function(){
  for(var att=0;att<200;att++){
    if(ri(0,1)===0){
      var a=u4nz(-7,7),b=u4nz(-8,8);
      var corr=u4m(0,a,b);
      var ds=[{t:u4m(a,b,0),fb:"Dividing by x lowers each power by one; the result has an x term and a constant."},{t:u4m(0,a,0),fb:"That divides only the first term; every term is divided by x."},{t:u4m(0,-a,b),fb:"The first quotient term has the wrong sign."},{t:u4m(0,a,-b),fb:"The second quotient term has the wrong sign."}];
      if(!u4ok(corr,ds))continue;
      ds=ds.slice(0,3);
      var sol="Divide every term by \\(x\\): \\[ \\begin{aligned} ("+u4p(a,b,0)+") \\div x &= "+u4expr([[a,"x^{2}"]])+" \\div x + "+u4expr([[b,"x"]])+" \\div x \\\\ &= "+u4p(0,a,b)+" \\end{aligned} \\] So the quotient is <b>"+corr+"</b>.";
      return mcq("Divide: \\(("+u4p(a,b,0)+") \\div x\\)",{t:corr,fb:"Correct: every term is divided and each power drops by one."},ds,sol,{mode:"div-x",a:a,b:b,cr:2});
    }
    var d=pick([-4,-3,-2,2,3,4,5]);
    var q1=ri(0,1)===1?u4nz(-5,5):0,q2=u4nz(-6,6),q3=u4nz(-6,6);
    var corr2=u4m(q1,q2,q3);
    var A=d*q1,B=d*q2,C=d*q3;
    var ds2=[{t:u4m(q1,q2,C),fb:"The constant term was left undivided; every term is divided."},{t:u4m(A-d,B-d,C-d),fb:"That subtracts the divisor from each coefficient; this question divides."},{t:u4m(q1,-q2,q3),fb:"The middle quotient term has the wrong sign."},{t:u4m(q1,q2,-q3),fb:"The constant quotient term has the wrong sign."}];
    if(!u4ok(corr2,ds2))continue;
    ds2=ds2.slice(0,3);
    var dparts=[];if(A!==0)dparts.push("("+u4expr([[A,"x^{2}"]])+") \\div ("+fmt(d)+")");dparts.push("("+u4expr([[B,"x"]])+") \\div ("+fmt(d)+")");dparts.push("("+fmt(C)+") \\div ("+fmt(d)+")");
    var sol2="Divide every term by \\("+fmt(d)+"\\): \\[ \\begin{aligned} ("+u4p(A,B,C)+") \\div ("+fmt(d)+") &= "+dparts.join(" + ")+" \\\\ &= "+u4p(q1,q2,q3)+" \\end{aligned} \\] So the quotient is <b>"+corr2+"</b>.";
    return mcq("Divide: \\(("+u4p(A,B,C)+") \\div ("+fmt(d)+")\\)",{t:corr2,fb:"Correct: every term is divided by the monomial."},ds2,sol2,{mode:"div-const",d:d,q1:q1,q2:q2,q3:q3,cr:2});
  }
  return mcq("Divide: \\((6x+9) \\div 3\\)",{t:u4m(0,2,3),fb:"Correct: every term is divided by the monomial."},[{t:u4m(0,2,9),fb:"The constant was left undivided."},{t:u4m(0,3,6),fb:"That subtracts the divisor from each coefficient."},{t:u4m(0,2,-3),fb:"The constant quotient has the wrong sign."}],"Dividing every term gives <b>"+u4m(0,2,3)+"</b>.",{mode:"div-const",cr:2});
}, ["Every term of the polynomial is divided by the monomial, one term at a time.", "First divide the first term, then divide each remaining term by the same monomial."]);

E("u4-mult-div-mixed", 4, ["8.12"], 1, "gen", function(){
  for(var att=0;att<200;att++){
    if(ri(0,1)===0){
      var k=pick([-4,-3,-2,2,3,4]);
      var b=u4nz(-7,7),c=u4nz(-8,8);
      var corr=u4m(0,k*b,k*c);
      var ds=[{t:u4m(0,k*b,c),fb:"The constant was left unmultiplied; the monomial multiplies every term."},{t:u4m(0,b,k*c),fb:"The x term was left unmultiplied; the monomial multiplies every term."},{t:u4m(0,k*b,-k*c),fb:"The constant product has the wrong sign."}];
      if(!u4ok(corr,ds))continue;
      var sol="Multiply every term by \\("+fmt(k)+"\\): the product is <b>"+corr+"</b>.";
      return mcq("Multiply: \\("+fmt(k)+"("+u4p(0,b,c)+")\\)",{t:corr,fb:"Correct: the monomial multiplies every term."},ds,sol,{mode:"multiply",k:k,b:b,c:c,cr:2});
    }else{
      var d=pick([-4,-3,-2,2,3,4,5]);
      var q2=u4nz(-6,6),q3=u4nz(-6,6);
      var corr2=u4m(0,q2,q3);
      var ds2=[{t:u4m(0,q2,d*q3),fb:"The constant was left undivided; every term is divided."},{t:u4m(0,d*q2-d,q3),fb:"One part subtracts the divisor; every term is divided instead."},{t:u4m(0,-q2,q3),fb:"The first quotient term has the wrong sign."}];
      if(!u4ok(corr2,ds2))continue;
      var sol2="Divide every term by \\("+fmt(d)+"\\): the quotient is <b>"+corr2+"</b>.";
      return mcq("Divide: \\(("+u4p(0,d*q2,d*q3)+") \\div ("+fmt(d)+")\\)",{t:corr2,fb:"Correct: every term is divided by the monomial."},ds2,sol2,{mode:"divide",d:d,q2:q2,q3:q3,cr:2});
    }
  }
  return mcq("Multiply: \\(2(3x+4)\\)",{t:u4m(0,6,8),fb:"Correct: the monomial multiplies every term."},[{t:u4m(0,6,4),fb:"The constant was left unmultiplied."},{t:u4m(0,3,8),fb:"The x term was left unmultiplied."},{t:u4m(0,6,-8),fb:"The constant product has the wrong sign."}],"Multiplying every term gives <b>"+u4m(0,6,8)+"</b>.",{mode:"multiply",cr:2});
}, ["Decide first whether the monomial multiplies or divides, then apply it to every term.", "First apply the operation to the first term, then to each remaining term."]);

E("u4-error-step", 4, ["8.13"], 2, "gen", function(){
  for(var att=0;att<200;att++){
    var a=ri(3,9),b=ri(2,9),c=ri(2,8),d=ri(2,9);
    if(a-c===0||b-d===0)continue;
    var err=ri(1,4);
    var sd=-d, sxPair=a-c, skPair=b+sd;
    var s1,s2,s3,s4,px, pk;
    if(err===1){sd=d;}
    s1="\\(("+u4p(0,a,b)+")-("+u4p(0,c,d)+") = "+u4expr([[a,"x"],[b,""],[-c,"x"],[sd,""]])+"\\)";
    px=a-c; pk=b+sd;
    if(err===2){px=a+sd; pk=b-c; s2="Step 2 groups the terms as \\(("+u4expr([[a,"x"],[sd,"x"]])+")+("+u4expr([[b,""],[-c,""]])+")\\)";}
    else{s2="Step 2 groups the terms as \\(("+u4expr([[a,"x"],[-c,"x"]])+")+("+u4expr([[b,""],[sd,""]])+")\\)";}
    if(err===3){px=a+c;}
    s3="Step 3 combines the groups to get \\("+u4p(0,px,pk)+"\\)";
    if(err===4){pk=-pk;}
    s4="Step 4 writes the final answer as \\("+u4p(0,px,pk)+"\\)";
    var corr="Step "+fmt(err);
    var fbTxt={1:"Step 1 is where the sign change is handled.",2:"Step 2 is where the terms are grouped.",3:"Step 3 is where the groups are combined.",4:"Step 4 is where the final answer is written."};
    var opts=["Step 1","Step 2","Step 3","Step 4"].map(function(sv,idx){
      var n=idx+1;
      return {t:sv,fb:n===err?"Correct: this is the first line that goes wrong. "+fbTxt[n]:"That step follows correctly from the line before it."};
    });
    var corrOpt=opts[err-1];
    var ds=opts.filter(function(o){return o.t!==corr;});
    var prompt="A student simplified \\(("+u4p(0,a,b)+")-("+u4p(0,c,d)+")\\) in four steps.<br>Step 1 removes the brackets to get "+s1+".<br>"+s2+".<br>"+s3+".<br>"+s4+".<br>In which step does the first error occur?";
    var sol="Removing the brackets changes every sign in the second polynomial, grouping keeps like terms together, and combining gives \\("+u4p(0,a-c,b-d)+"\\). Checking each line against that process, the first error is in <b>"+corr+"</b>.";
    return mcq(prompt,corrOpt,ds,sol,{mode:"error-step",err:err,a:a,b:b,c:c,d:d});
  }
  return mcq("A student simplified \\((5x+3)-(2x-4)\\) and the first error is in the bracket removal step. In which step does the first error occur?",{t:"Step 1",fb:"Correct: this is the first line that goes wrong."},[{t:"Step 2",fb:"That step follows correctly from the line before it."},{t:"Step 3",fb:"That step follows correctly from the line before it."},{t:"Step 4",fb:"That step follows correctly from the line before it."}],"The first error is in <b>Step 1</b>.",{mode:"error-step",err:1});
}, ["Check each step against the step before it, in order, and stop at the first line that changes a value.", "First check the bracket removal: every sign in the second polynomial must change."]);

E("u4-equivalent-pair", 4, ["8.10"], 1, "gen", function(){
  for(var att=0;att<200;att++){
    var a=u4nz(-8,8),b=u4nz(-8,8);
    var corrT=u4m(0,a,b)+" and \\("+u4expr([[b,""],[a,"x"]])+"\\)";
    function pairStr(p,q){return u4m(0,p[0],p[1])+" and "+u4m(0,q[0],q[1]);}
    var r1=ri(2,8),r2=u4nz(-8,8),r3=u4nz(-8,8),r4=ri(2,8);
    var ds=[{t:pairStr([r1,r2],[r1,-r2]),fb:"The constant changes sign between the two expressions, so they differ."},{t:pairStr([r3,r4],[r4,r3]),fb:"The x coefficient and the constant trade places, so they differ."},{t:pairStr([r2,r1],[-r2,r1]),fb:"The x coefficient changes sign between the two expressions, so they differ."}];
    var seen=[corrT];var good=true;
    for(var i=0;i<ds.length;i++){if(seen.indexOf(ds[i].t)>=0)good=false;seen.push(ds[i].t);}
    if(!good)continue;
    var sol="Two expressions are equivalent when they simplify to the same polynomial. The pair \\("+u4p(0,a,b)+"\\) and \\("+u4expr([[b,""],[a,"x"]])+"\\) has the same terms in a different order, so the equivalent pair is <b>"+corrT+"</b>.";
    return mcq("Which pair of expressions are equivalent?",{t:corrT,fb:"Correct: the two expressions have exactly the same terms."},ds,sol,{mode:"pair",a:a,b:b});
  }
  return mcq("Which pair of expressions are equivalent?",{t:u4m(0,3,2)+" and \\(2+3x\\)",fb:"Correct: the two expressions have exactly the same terms."},[{t:u4m(0,3,2)+" and "+u4m(0,3,-2),fb:"The constant changes sign, so they differ."},{t:u4m(0,2,3)+" and "+u4m(0,3,2),fb:"The x coefficient and constant trade places, so they differ."},{t:u4m(0,3,2)+" and "+u4m(0,-3,2),fb:"The x coefficient changes sign, so they differ."}],"The equivalent pair is <b>"+u4m(0,3,2)+" and \\(2+3x\\)</b>.",{mode:"pair"});
}, ["Simplify or compare each pair term by term: equivalent expressions have identical terms.", "First check one pair: compare its x coefficient and its constant on both sides."]);

E("u4-tiles-addsub", 4, ["8.6","8.7"], 1, "gen", function(){
  for(var att=0;att<200;att++){
    var sub=ri(0,1)===1;
    var a1=ri(-3,3),b1=ri(-4,4),c1=ri(-4,4);
    var a2,b2,c2;
    if(sub){a2=ri(0,3);b2=ri(0,4);c2=ri(0,4);}
    else{a2=ri(-3,3);b2=ri(-4,4);c2=ri(-4,4);}
    var nz1=(a1!==0?1:0)+(b1!==0?1:0)+(c1!==0?1:0);
    var nz2=(a2!==0?1:0)+(b2!==0?1:0)+(c2!==0?1:0);
    if(nz1<1||nz2<1)continue;
    var ra=sub?a1-a2:a1+a2,rb=sub?b1-b2:b1+b2,rc=sub?c1-c2:c1+c2;
    var corr=u4m(ra,rb,rc);
    var ds=sub?[{t:u4m(a1+a2,b1+b2,c1+c2),fb:"That adds the second group; the question takes it away."},{t:u4m(ra,rb,c1+c2),fb:"The unit tiles were added; taking tiles away subtracts them."},{t:u4m(ra,b1+b2,rc),fb:"The x tiles were added; taking tiles away subtracts them."}]:[{t:u4m(a1-a2,b1-b2,c1-c2),fb:"That subtracts the second group; the question adds it."},{t:u4m(ra,rb,c1-c2),fb:"The unit tiles were subtracted; combining groups adds them."},{t:u4m(ra,b1-b2,rc),fb:"The x tiles were subtracted; combining groups adds them."}];
    if(!u4ok(corr,ds))continue;
    var prompt=sub?("A tile model shows "+u4tiles(a1,b1,c1)+". Then the tiles for "+u4m(a2,b2,c2)+" are taken away. Which expression shows the result?"):("A tile model shows "+u4tiles(a1,b1,c1)+". A second group of tiles, "+u4tiles(a2,b2,c2)+", is added. Which expression shows the result?");
    var sol=(sub?"Taking tiles away subtracts each count: ":"Combining the groups adds each count: ")+"the result is <b>"+corr+"</b>.";
    return mcq(prompt,{t:corr,fb:sub?"Correct: each tile count is subtracted.":"Correct: each tile count is added."},ds,sol,{mode:sub?"tiles-sub":"tiles-add",a1:a1,b1:b1,c1:c1,a2:a2,b2:b2,c2:c2});
  }
  return mcq("A tile model shows 3 positive x tiles, 2 positive unit tiles. A second group, 1 positive x tile and 1 positive unit tile, is added. Which expression shows the result?",{t:u4m(0,4,3),fb:"Correct: each tile count is added."},[{t:u4m(0,2,1),fb:"That subtracts the second group."},{t:u4m(0,4,1),fb:"The unit tiles were subtracted instead of added."},{t:u4m(0,2,3),fb:"The x tiles were subtracted instead of added."}],"Adding the counts gives <b>"+u4m(0,4,3)+"</b>.",{mode:"tiles-add"});
}, ["Work one tile kind at a time: combine or remove those counts first.", "First handle the x squared tiles, adding the counts if groups combine and subtracting if tiles are taken away."]);

E("u4-equiv-var", 4, ["8.5"], 2, "var", varset([
  function(){
    var corr="\\(5-3x+2x^{2}\\)";
    var sol="The model shows \\(2x^{2}-3x+5\\). Writing the same terms in a different order gives <b>"+corr+"</b>.";
    return mcq("A tile model has 2 positive x squared tiles, 3 negative x tiles and 5 positive unit tiles. Which expression is equivalent to the expression shown by the model?",{t:corr,fb:"Correct: it has the same three terms in a new order."},[{t:"\\(2x^{2}+3x+5\\)",fb:"The x term has the wrong sign compared with the model."},{t:"\\(3x^{2}-2x+5\\)",fb:"That swaps the x squared count with the x count."},{t:"\\(2x^{2}-3x-5\\)",fb:"The constant has the wrong sign compared with the model."}],sol,{mode:"var-tiles"});
  },
  function(){
    var corr="\\(2(2x+3)\\)";
    var sol="Multiplying out, \\(2(2x+3)=4x+6\\) for every value of \\(x\\). So the matching expression is <b>"+corr+"</b>.";
    return mcq("Which expression has the same value as \\(4x+6\\) for every value of \\(x\\)?",{t:corr,fb:"Correct: it multiplies out to exactly 4x plus 6."},[{t:"\\(2(2x+6)\\)",fb:"That multiplies out to 4x plus 12, so the constant differs."},{t:"\\(4(x+6)\\)",fb:"That multiplies out to 4x plus 24, so the constant differs."},{t:"\\(2x+3\\)",fb:"That is half of the given expression, so its values differ."}],sol,{mode:"var-same-value"});
  },
  function(){
    var corr="\\(8x+12\\)";
    var sol="Perimeter adds both lengths and both widths: \\[ \\begin{aligned} P &= 2(3x+2)+2(x+4) \\\\ &= 6x+4+2x+8 \\\\ &= 8x+12 \\end{aligned} \\] So the perimeter is <b>"+corr+"</b>.";
    return mcq("A rectangle has length \\(3x+2\\) and width \\(x+4\\). Which expression gives its perimeter in simplified form?",{t:corr,fb:"Correct: both lengths and both widths are counted, then like terms combine."},[{t:"\\(4x+6\\)",fb:"That counts each side only once; a perimeter counts all four sides."},{t:"\\(8x+6\\)",fb:"The widths were doubled but the lengths were counted once."},{t:"\\(7x+12\\)",fb:"One x term is missing when the four sides are added."}],sol,{mode:"var-perimeter"});
  }
]), ["Equivalent expressions have the same terms and the same value for every x.", "First work out what the given expression simplifies to, then compare each option with it."]);

E("u4-missing", 4, ["8.11"], 3, "gen", function(){
  for(var att=0;att<200;att++){
    var three=ri(0,1)===1;
    var a1=u4nz(-6,6),b1=u4nz(-8,8),c1=ri(-8,8);
    var ma=u4nz(-6,6),mb=u4nz(-8,8),mc2=u4nz(-8,8);
    var corr=u4m(ma,mb,mc2);
    var ds=[{t:u4m(ma,mb,-mc2),fb:"The constant has the wrong sign; work the subtraction term by term."},{t:u4m(ma,-mb,mc2),fb:"The x term has the wrong sign; work the subtraction term by term."},{t:u4m(-ma,mb,mc2),fb:"The x squared term has the wrong sign; work the subtraction term by term."}];
    if(!u4ok(corr,ds))continue;
    if(three){
      var a2=u4nz(-5,5),b2=ri(-7,7),c2v=ri(-7,7);
      var R=u4m(a1+a2+ma,b1+b2+mb,c1+c2v+mc2);
      var sol="Subtract both known polynomials from the total: \\[ \\begin{aligned} \\text{missing} &= ("+u4p(a1+a2+ma,b1+b2+mb,c1+c2v+mc2)+")-("+u4p(a1,b1,c1)+")-("+u4p(a2,b2,c2v)+") \\\\ &= "+u4p(ma,mb,mc2)+" \\end{aligned} \\] So the missing polynomial is <b>"+corr+"</b>.";
      return mcq("Find the missing polynomial: "+u4m(a1,b1,c1)+" + "+u4m(a2,b2,c2v)+" + missing = "+R+". What polynomial is missing?",{t:corr,fb:"Correct: the total minus the known parts leaves this polynomial."},ds,sol,{mode:"missing-three",cr:3});
    }
    var R2=u4m(a1+ma,b1+mb,c1+mc2);
    var sol2="Subtract the known polynomial from the total: \\[ \\begin{aligned} \\text{missing} &= ("+u4p(a1+ma,b1+mb,c1+mc2)+")-("+u4p(a1,b1,c1)+") \\\\ &= "+u4p(ma,mb,mc2)+" \\end{aligned} \\] So the missing polynomial is <b>"+corr+"</b>.";
    return mcq("Find the missing polynomial: "+u4m(a1,b1,c1)+" + missing = "+R2+". What polynomial is missing?",{t:corr,fb:"Correct: the total minus the known part leaves this polynomial."},ds,sol2,{mode:"missing-two",cr:3});
  }
  return mcq("Find the missing polynomial: "+u4m(0,3,2)+" + missing = "+u4m(0,7,-5)+". What polynomial is missing?",{t:u4m(0,4,-7),fb:"Correct: the total minus the known part leaves this polynomial."},[{t:u4m(0,4,7),fb:"The constant has the wrong sign."},{t:u4m(0,-4,-7),fb:"The x term has the wrong sign."},{t:u4m(0,10,-3),fb:"That adds the known part to the total instead of subtracting."}],"Subtracting gives <b>"+u4m(0,4,-7)+"</b>.",{mode:"missing-two",cr:3});
}, ["The missing part is the total minus the parts you already know.", "First subtract the known polynomial from the total, term by term."]);

E("u4-area-monomial", 4, ["8.12"], 3, "gen", function(){
  for(var att=0;att<200;att++){
    if(ri(0,1)===0){
      var usex=ri(0,1)===1;
      if(usex){
        var b=u4nz(-6,6),c=u4nz(-7,7);
        var corr=u4m(b,c,0);
        var ds=[{t:u4m(0,b+c,0),fb:"Multiplying by x raises each power; the terms stay separate."},{t:u4m(b,0,0),fb:"That uses only the first term; the length multiplies every term of the width."},{t:u4m(-b,c,0),fb:"The first product has the wrong sign."}];
        if(!u4ok(corr,ds))continue;
        var sol="Area is length times width: \\[ \\begin{aligned} A &= x("+u4p(0,b,c)+") \\\\ &= "+u4p(b,c,0)+" \\end{aligned} \\] So the area is <b>"+corr+"</b>.";
        return mcq("A rectangle has length \\(x\\) and width "+u4m(0,b,c)+". Which expression gives its area?",{t:corr,fb:"Correct: the length multiplies every term of the width."},ds,sol,{mode:"area-mult-x",cr:2});
      }
      var k=pick([-4,-3,-2,2,3,4]);
      var b2=u4nz(-6,6),c2=u4nz(-7,7);
      var corr2=u4m(0,k*b2,k*c2);
      var ds2=[{t:u4m(0,k*b2,c2),fb:"The second width term was left unmultiplied; the length multiplies every term."},{t:u4m(0,b2+k,c2+k),fb:"That adds the length to each term; area multiplies."},{t:u4m(0,k*b2,-k*c2),fb:"The second product has the wrong sign."}];
      if(!u4ok(corr2,ds2))continue;
      var sol2="Area is length times width: \\[ \\begin{aligned} A &= "+fmt(k)+"("+u4p(0,b2,c2)+") \\\\ &= "+u4p(0,k*b2,k*c2)+" \\end{aligned} \\] So the area is <b>"+corr2+"</b>.";
      return mcq("A rectangle has length \\("+fmt(k)+"\\) and width "+u4m(0,b2,c2)+". Which expression gives its area?",{t:corr2,fb:"Correct: the length multiplies every term of the width."},ds2,sol2,{mode:"area-mult-const",k:k,cr:2});
    }else{
      var d=pick([-4,-3,-2,2,3,4,5]);
      var q2=u4nz(-6,6),q3=u4nz(-6,6);
      var corr3=u4m(0,q2,q3);
      var ds3=[{t:u4m(0,q2,d*q3),fb:"The second term was left undivided; every term of the area is divided."},{t:u4m(0,d*q2-d,q3),fb:"One part subtracts the side length; finding a side divides."},{t:u4m(0,-q2,q3),fb:"The first term of the side has the wrong sign."}];
      if(!u4ok(corr3,ds3))continue;
      var sol3="Divide the area by the known side: \\[ \\begin{aligned} \\text{other side} &= ("+u4p(0,d*q2,d*q3)+") \\div ("+fmt(d)+") \\\\ &= "+u4p(0,q2,q3)+" \\end{aligned} \\] So the other side is <b>"+corr3+"</b>.";
      return mcq("A rectangle has area "+u4m(0,d*q2,d*q3)+" and one side of length \\("+fmt(d)+"\\) . Which expression gives the other side?",{t:corr3,fb:"Correct: the area divided by the known side gives the other side."},ds3,sol3,{mode:"area-div",d:d,cr:2});
    }
  }
  return mcq("A rectangle has length \\(3\\) and width "+u4m(0,2,5)+". Which expression gives its area?",{t:u4m(0,6,15),fb:"Correct: the length multiplies every term of the width."},[{t:u4m(0,6,5),fb:"The second width term was left unmultiplied."},{t:u4m(0,5,8),fb:"That adds the length to each term; area multiplies."},{t:u4m(0,6,-15),fb:"The second product has the wrong sign."}],"Length times width gives <b>"+u4m(0,6,15)+"</b>.",{mode:"area-mult-const",cr:2});
}, ["Area of a rectangle is length times width; a missing side is the area divided by the known side.", "First multiply or divide the first term, then do the same to every remaining term."]);

E("u4-error-var", 4, ["8.13","8.10"], 3, "var", varset([
  function(){
    var corr=u4m(0,3,7);
    var sol="Subtracting changes the sign of \\(-4\\) to \\(+4\\): \\[ \\begin{aligned} (5x+3)-(2x-4) &= 5x+3-2x+4 \\\\ &= 3x+7 \\end{aligned} \\] So the correct expression is <b>"+corr+"</b>.";
    return mcq("A student simplified \\((5x+3)-(2x-4)\\) and got \\(3x-1\\). What is the correct simplified expression?",{t:corr,fb:"Correct: the sign of the last term flips when the brackets are removed."},[{t:u4m(0,3,-1),fb:"That is the student answer; the last sign was left unchanged."},{t:u4m(0,7,7),fb:"That adds the x terms instead of subtracting them."},{t:u4m(0,3,1),fb:"The constant was combined with the wrong sign change."}],sol,{mode:"var-sub-sign"});
  },
  function(){
    var corr="\\(4x^{2}+3x\\)";
    var sol="The terms \\(4x^{2}\\) and \\(3x\\) are unlike terms, so they cannot be combined. The expression is already simplified: <b>"+corr+"</b>.";
    return mcq("A student simplified \\(4x^{2}+3x\\) and got \\(7x^{2}\\). What is the correct simplified expression?",{t:corr,fb:"Correct: x squared terms and x terms are unlike and stay separate."},[{t:"\\(7x^{2}\\)",fb:"That is the student answer; it combines unlike terms."},{t:"\\(7x\\)",fb:"That combines unlike terms into a single x term."},{t:"\\(12x^{2}\\)",fb:"That multiplies the coefficients; nothing here is multiplied."}],sol,{mode:"var-unlike"});
  },
  function(){
    var corr="\\(2(3x-2)\\)";
    var sol="Multiplying out, \\(2(3x-2)=6x-4\\), which matches the given expression. So an equivalent expression is <b>"+corr+"</b>.";
    return mcq("Which expression is equivalent to \\(6x-4\\)?",{t:corr,fb:"Correct: it multiplies out to exactly 6x minus 4."},[{t:"\\(3(2x-4)\\)",fb:"That multiplies out to 6x minus 12, so the constant differs."},{t:"\\(2(3x+2)\\)",fb:"That multiplies out to 6x plus 4, so the sign differs."},{t:"\\(6(x-4)\\)",fb:"That multiplies out to 6x minus 24, so the constant differs."}],sol,{mode:"var-equiv"});
  }
]), ["Compare the student result with a careful step by step simplification of your own.", "First redo the first step yourself, watching signs and like terms, then compare."]);

/* ----- bank-u1-topup.js ----- */
// Math 9 Unit 1 top-up tranche (November 7, 2026) question bank
// Cut verbatim from the standalone bank source
// (math-9-review/bank-src.js, lines 1505 to 1696).
/* Top-up tranche (November 7, 2026): Unit 1 additions from tranche1/unit1-topup.js */
// Unit 1 top-up: Rational Numbers (Math 9, NL). Entries only; uses the u1
// helpers (u1gcd, u1red, u1frac, u1round) already defined in unit1.js.

// T1. L2, 6.2: nested brackets mixing a fraction and decimals, no calculator, MC.
E("u1-ooo-brackets-mc", 1, ["6.2"], 2, "gen", function () {
  var fracPool = [
    { n: 1, d: 2, v: 0.5 }, { n: 3, d: 4, v: 0.75 }, { n: 1, d: 4, v: 0.25 },
    { n: 2, d: 5, v: 0.4 }, { n: 3, d: 5, v: 0.6 }, { n: 4, d: 5, v: 0.8 },
    { n: 1, d: 5, v: 0.2 }, { n: 3, d: 10, v: 0.3 }, { n: 7, d: 10, v: 0.7 },
    { n: 9, d: 10, v: 0.9 }, { n: 5, d: 4, v: 1.25 }, { n: 3, d: 2, v: 1.5 }
  ];
  var P = null;
  for (var tries = 0; tries < 300 && !P; tries++) {
    var fr = pick(fracPool);
    var c = ri(2, 40) / 4;
    var S = fr.v + c;
    var D = ri(3, 30) / 2;
    var a = D + S;
    var d = pick([2, 3, 4, 5, 6]);
    var e = pick([2, 3, 4, 5]);
    var f = ri(5, 95) / 10;
    var g = pick([2, 5, 10]);
    var q1 = D / d, q2 = f / g;
    if (Math.abs(q1 - u1round(q1, 2)) > 1e-9) continue;
    if (Math.abs(q2 - u1round(q2, 2)) > 1e-9) continue;
    var V = q1 * e + q2;
    var E1 = D / (d * e) + q2;
    var E2 = (a - fr.v + c) / d * e + q2;
    var E3 = (q1 * e + f) / g;
    var E4 = (a + S) / d * e + q2;
    var keys = [V, E1, E2, E3, E4].map(function (x) { return fmt(u1round(x, 2)); });
    if (new Set(keys).size < 5) continue;
    P = { fn: fr.n, fd: fr.d, fv: fr.v, c: c, S: S, D: D, a: a, d: d, e: e, f: f, g: g, q1: q1, q2: q2, V: V, E1: E1, E2: E2, E3: E3, E4: E4 };
  }
  if (!P) {
    P = { fn: 3, fd: 4, fv: 0.75, c: 2.25, S: 3, D: 6, a: 9, d: 3, e: 2, f: 4.5, g: 5, q1: 2, q2: 0.9, V: 4.9, E1: 1.9, E2: 7.9, E3: 1.7, E4: 8.9 };
  }
  var expr = "\\((" + fmt(P.a) + " - (" + FR(P.fn, P.fd) + " + " + fmt(P.c) + ")) \\div " + P.d + " \\times " + P.e + " + " + fmt(P.f) + " \\div " + P.g + "\\)";
  var prompt = "Evaluate: " + expr;
  var steps = "\\[ \\begin{aligned} (" + fmt(P.a) + " - (" + FR(P.fn, P.fd) + " + " + fmt(P.c) + ")) \\div " + P.d + " \\times " + P.e + " + " + fmt(P.f) + " \\div " + P.g + " &= (" + fmt(P.a) + " - " + fmt(P.S) + ") \\div " + P.d + " \\times " + P.e + " + " + fmt(P.f) + " \\div " + P.g + " \\\\ &= " + fmt(P.D) + " \\div " + P.d + " \\times " + P.e + " + " + fmt(P.q2) + " \\\\ &= " + fmt(P.q1) + " \\times " + P.e + " + " + fmt(P.q2) + " \\\\ &= " + fmt(P.q1 * P.e) + " + " + fmt(P.q2) + " \\\\ &= " + fmt(P.V) + " \\end{aligned} \\]";
  var solution = "Work the inner brackets first, then do divisions and multiplications from left to right, then the addition: " + steps + " So the value is <b>" + fmt(P.V) + "</b>.";
  var errs = [
    { t: fmt(u1round(P.E1, 2)), fb: "This multiplies " + P.d + " by " + P.e + " before dividing, but division and multiplication are done from left to right, and the division comes first here." },
    { t: fmt(u1round(P.E2, 2)), fb: "This begins the outer bracket before finishing the inner brackets, so the subtraction uses the wrong amount." },
    { t: fmt(u1round(P.E3, 2)), fb: "This adds " + fmt(P.f) + " before the final division, but division is done before addition." },
    { t: fmt(u1round(P.E4, 2)), fb: "This adds the bracket amount to " + fmt(P.a) + " instead of subtracting it, a sign slip." }
  ];
  var selDs = fmtPairDs(fmt(P.V), shuffle(errs).slice(0, 3).map(function (e) { return { v: parseFloat(e.t), fb: e.fb }; }));
  return mcq(prompt,
    { t: fmt(P.V), fb: "Correct. The inner brackets are done first, then divisions and multiplications from left to right." },
    selDs,
    solution, { mode: "ooo-brackets", a: P.a, c: P.c, d: P.d, e: P.e, f: P.f, g: P.g });
}, ["Do the innermost brackets first, then work divisions and multiplications from left to right.", "First add the fraction and the decimal inside the inner brackets."]);

// T2. L2, 6.3: one calculator entry, ask for the displayed rounded value, MC.
E("u1-ooo-calc-display", 1, ["6.3"], 1, "gen", function () {
  var names = ["Alex", "Jamie", "Robin", "Casey", "Taylor", "Jordan"];
  var P = null;
  for (var tries = 0; tries < 300 && !P; tries++) {
    var nm = pick(names);
    var a = ri(15, 95) / 10;
    var b = ri(5, 60) / 10;
    var c = ri(5, 95) / 10;
    var d = pick([2, 4, 5, 8]);
    var e = ri(2, 9);
    var f = ri(5, 60) / 10;
    var places = pick([1, 2]);
    var S = b + c;
    var Q = S / d;
    var V = a + Q * e - f;
    if (V <= 0.5) continue;
    var EL = ((a + b + c) / d) * e - f;
    var ED = a + b + (c / d) * e - f;
    var EM = a + u1round(Q, places === 2 ? 1 : 0) * e - f;
    var keys = [V, EL, ED, EM].map(function (x) { return fmtF(u1round(x, places), places); });
    if (new Set(keys).size < 4) continue;
    P = { nm: nm, a: a, b: b, c: c, d: d, e: e, f: f, places: places, S: S, Q: Q, V: V, EL: EL, ED: ED, EM: EM };
  }
  if (!P) {
    P = { nm: "Alex", a: 2.5, b: 1.5, c: 4.7, d: 4, e: 3, f: 1.2, places: 2, S: 6.2, Q: 1.55, V: 5.95, EL: 5.325, ED: 6.325, EM: 6.1 };
  }
  var ans = u1round(P.V, P.places);
  var expr = "\\(" + fmt(P.a) + " + (" + fmt(P.b) + " + " + fmt(P.c) + ") \\div " + P.d + " \\times " + P.e + " - " + fmt(P.f) + "\\)";
  var prompt = P.nm + " keys the whole expression into a calculator in one entry: " + expr + " What value does the calculator show, rounded to " + P.places + " decimal place" + (P.places > 1 ? "s" : "") + "?";
  var steps = "\\[ \\begin{aligned} " + fmt(P.a) + " + (" + fmt(P.b) + " + " + fmt(P.c) + ") \\div " + P.d + " \\times " + P.e + " - " + fmt(P.f) + " &= " + fmt(P.a) + " + " + fmt(P.S) + " \\div " + P.d + " \\times " + P.e + " - " + fmt(P.f) + " \\\\ &= " + fmt(P.a) + " + " + fmt(P.Q, 4) + " \\times " + P.e + " - " + fmt(P.f) + " \\\\ &= " + fmt(P.a) + " + " + fmt(P.Q * P.e, 4) + " - " + fmt(P.f) + " \\\\ &= " + fmt(P.V, 4) + " \\end{aligned} \\]";
  var solution = "The calculator follows the order of operations, brackets first, and keeps full precision until the end: " + steps + " Rounded to " + P.places + " decimal place" + (P.places > 1 ? "s" : "") + ", the calculator shows <b>" + fmtF(ans, P.places) + "</b>.";
  return mcq(prompt,
    { t: fmtF(ans, P.places), fb: "Correct. The calculator follows the order of operations and rounds only at the end." },
    [
      { t: fmtF(u1round(P.EL, P.places), P.places), fb: "This is the result of keying the numbers strictly from left to right and ignoring the brackets." },
      { t: fmtF(u1round(P.ED, P.places), P.places), fb: "This drops the brackets around the sum, so only " + fmt(P.c) + " is divided by " + P.d + " instead of the whole sum." },
      { t: fmtF(u1round(P.EM, P.places), P.places), fb: "This rounds the quotient to " + (P.places === 2 ? "1 decimal place" : "the nearest whole number") + " before multiplying, instead of rounding only the final answer." }
    ],
    solution, { mode: "ooo-calc-display", a: P.a, b: P.b, c: P.c, d: P.d, e: P.e, f: P.f, places: P.places });
}, ["A calculator follows the order of operations when the whole expression is keyed in as one entry.", "Work out the bracketed sum first, and keep full precision until the final rounding."]);

// T3. L2, 6.4: worked solution with one error, ask for the correct final value, MC.
E("u1-ooo-error-value", 1, ["6.4"], 3, "gen", function () {
  var scen = ri(0, 3);
  var R = null;
  for (var tries = 0; tries < 500 && !R; tries++) {
    var exprM, worked, solSteps, correctVal, wrongVal, e1Val, e2Val, e1fb, e2fb, errText, tag;
    if (scen === 0) {
      var a0 = ri(2, 15), b0 = ri(2, 12), c0 = ri(3, 9), d0 = ri(1, 12);
      var S0 = a0 + b0;
      correctVal = a0 + b0 * c0 - d0;
      wrongVal = S0 * c0 - d0;
      e1Val = a0 + b0 * (c0 - d0);
      e2Val = a0 + b0 * c0 + d0;
      exprM = a0 + " + " + b0 + " \\times " + c0 + " - " + d0;
      worked = exprM + " &= " + S0 + " \\times " + c0 + " - " + d0 + " \\\\ &= " + (S0 * c0) + " - " + d0 + " \\\\ &= " + wrongVal;
      solSteps = exprM + " &= " + a0 + " + " + (b0 * c0) + " - " + d0 + " \\\\ &= " + correctVal;
      errText = "The student added before multiplying in the first step, but multiplication is done before addition.";
      e1fb = "This groups the subtraction with the multiplication, which changes the order of operations.";
      e2fb = "This adds the last number instead of subtracting it.";
      tag = "errval-add-first";
    } else if (scen === 1) {
      var a1 = ri(2, 9), b1 = ri(2, 12), c1 = ri(1, 12), d1 = pick([2, 3, 4, 5, 6]);
      var S1 = b1 + c1;
      if ((a1 * S1) % d1 !== 0) continue;
      correctVal = a1 * S1 / d1;
      wrongVal = (a1 * b1 + c1) / d1;
      e1Val = a1 * b1 + c1 / d1;
      e2Val = a1 * S1 * d1;
      exprM = a1 + " \\times (" + b1 + " + " + c1 + ") \\div " + d1;
      worked = exprM + " &= (" + (a1 * b1) + " + " + c1 + ") \\div " + d1 + " \\\\ &= " + fmt(wrongVal);
      solSteps = exprM + " &= " + a1 + " \\times " + S1 + " \\div " + d1 + " \\\\ &= " + correctVal;
      errText = "The student multiplied before evaluating the brackets, but brackets are done first.";
      e1fb = "This drops the brackets entirely, so only " + c1 + " is divided by " + d1 + ".";
      e2fb = "This multiplies by " + d1 + " at the end instead of dividing by it.";
      tag = "errval-mult-first";
    } else if (scen === 2) {
      var dv = pick([2, 3, 4, 5]);
      var b2 = dv * ri(1, 6);
      var a2 = b2 + dv * ri(1, 6);
      var d2 = ri(2, 9), e2 = ri(2, 9);
      correctVal = a2 - b2 / dv + d2 * e2;
      wrongVal = (a2 - b2) / dv + d2 * e2;
      e1Val = a2 - b2 / dv - d2 * e2;
      e2Val = ((a2 - b2) / dv + d2) * e2;
      exprM = a2 + " - " + b2 + " \\div " + dv + " + " + d2 + " \\times " + e2;
      worked = exprM + " &= (" + (a2 - b2) + ") \\div " + dv + " + " + d2 + " \\times " + e2 + " \\\\ &= " + ((a2 - b2) / dv) + " + " + (d2 * e2) + " \\\\ &= " + wrongVal;
      solSteps = exprM + " &= " + a2 + " - " + (b2 / dv) + " + " + (d2 * e2) + " \\\\ &= " + correctVal;
      errText = "The student subtracted before dividing, but division is done before subtraction.";
      e1fb = "This subtracts the product as well, but the expression adds it.";
      e2fb = "This works strictly from left to right, multiplying at the end instead of multiplying before adding.";
      tag = "errval-sub-first";
    } else {
      var a3 = ri(15, 40) / 2, b3 = ri(1, 10), c3 = ri(1, 10), d3 = ri(2, 9);
      var S3 = b3 + c3;
      if (a3 <= S3) continue;
      correctVal = (a3 - S3) * d3;
      wrongVal = (a3 - b3 + c3) * d3;
      e1Val = a3 - S3 * d3;
      e2Val = (a3 - S3) + d3;
      exprM = "(" + fmt(a3) + " - (" + b3 + " + " + c3 + ")) \\times " + d3;
      worked = exprM + " &= (" + fmt(a3 - b3) + " + " + c3 + ") \\times " + d3 + " \\\\ &= " + fmt(a3 - b3 + c3) + " \\times " + d3 + " \\\\ &= " + fmt(wrongVal);
      solSteps = exprM + " &= (" + fmt(a3) + " - " + S3 + ") \\times " + d3 + " \\\\ &= " + fmt(a3 - S3) + " \\times " + d3 + " \\\\ &= " + fmt(correctVal);
      errText = "The student started the outer bracket before finishing the inner brackets, but the innermost brackets are done first.";
      e1fb = "This drops the outer brackets and multiplies the inner sum before subtracting.";
      e2fb = "This adds the last number instead of multiplying by it.";
      tag = "errval-outer-first";
    }
    var keys = [correctVal, wrongVal, e1Val, e2Val].map(function (x) { return fmt(u1round(x, 2)); });
    if (new Set(keys).size < 4) continue;
    R = { exprM: exprM, worked: worked, solSteps: solSteps, correctVal: correctVal, wrongVal: wrongVal, e1Val: e1Val, e2Val: e2Val, e1fb: e1fb, e2fb: e2fb, errText: errText, tag: tag };
  }
  if (!R) {
    R = {
      exprM: "4 + 3 \\times 5 - 2",
      worked: "4 + 3 \\times 5 - 2 &= 7 \\times 5 - 2 \\\\ &= 35 - 2 \\\\ &= 33",
      solSteps: "4 + 3 \\times 5 - 2 &= 4 + 15 - 2 \\\\ &= 17",
      correctVal: 17, wrongVal: 33, e1Val: 13, e2Val: 21,
      e1fb: "This groups the subtraction with the multiplication, which changes the order of operations.",
      e2fb: "This adds the last number instead of subtracting it.",
      errText: "The student added before multiplying in the first step, but multiplication is done before addition.",
      tag: "errval-add-first"
    };
  }
  var prompt = "A student's work for an expression is shown below. \\[ \\begin{aligned} " + R.worked + " \\end{aligned} \\] What is the correct value of the expression?";
  var solution = R.errText + " Done correctly: \\[ \\begin{aligned} " + R.solSteps + " \\end{aligned} \\] So the correct value is <b>" + fmt(R.correctVal) + "</b>.";
  return mcq(prompt,
    { t: fmt(R.correctVal), fb: "Correct. Redone in the proper order, the expression gives this value." },
    [
      { t: fmt(u1round(R.wrongVal, 2)), fb: "That is the value in the student's work, which contains the order of operations error." },
      { t: fmt(u1round(R.e1Val, 2)), fb: R.e1fb },
      { t: fmt(u1round(R.e2Val, 2)), fb: R.e2fb }
    ],
    solution, { mode: R.tag, scen: scen });
}, ["Compare the student's steps with the order of operations to spot where the order went wrong.", "Redo the expression yourself: brackets first, then multiplication and division, then addition and subtraction."]);

/* ----- bank-u2-topup.js ----- */
// Math 9 Unit 2 top-up tranche (November 7, 2026) question bank
// Cut verbatim from the standalone bank source
// (math-9-review/bank-src.js, lines 1697 to 1846).
/* Top-up tranche (November 7, 2026): Unit 2 additions from tranche1/unit2-topup.js */
/* Unit 2 top-up tranche: five companion entries. Helpers u2gcd, u2r1, u2r2,
   u2d3 and u2nonSquare are defined in unit2.js and the assembled bank. */

E("u2-sqrt-fraction", 2, ["6.9"], 1, "gen", function(){
  if(pick(["fraction","decimal"])==="fraction"){
    var a=ri(2,15), b=ri(2,15), g=0;
    while(u2gcd(a,b)!==1&&g<60){a=ri(2,15);b=ri(2,15);g++;}
    var correct="\\("+FR(a,b)+"\\)";
    var cands=[
      {t:"\\("+FR(a,b*b)+"\\)", fb:"That roots the top part only: the bottom part must be rooted too."},
      {t:"\\("+FR(a*a,b)+"\\)", fb:"That roots the bottom part only: the top part must be rooted too."},
      {t:"\\("+FR(a+1,b)+"\\)", fb:"Squaring it gives a top part of "+((a+1)*(a+1))+", not "+(a*a)+": check both parts."},
      {t:"\\("+FR(a,b+1)+"\\)", fb:"Squaring it gives a bottom part of "+((b+1)*(b+1))+", not "+(b*b)+": check both parts."},
      {t:"\\("+FR(a+1,b+1)+"\\)", fb:"Squaring it changes both parts: compare each part with the one shown."}
    ];
    var opts=[], seen={};
    for(var i=0;i<cands.length&&opts.length<3;i++){if(cands[i].t!==correct&&!seen[cands[i].t]){seen[cands[i].t]=1;opts.push(cands[i]);}}
    var q = mcq("What is \\(\\sqrt{"+FR(a*a,b*b)+"}\\)? Give the exact value.", {t:correct, fb:"Yes: "+a+" squared is "+(a*a)+" and "+b+" squared is "+(b*b)+"."}, opts,
      "Root the top and the bottom separately: \\[ \\begin{aligned} \\sqrt{"+FR(a*a,b*b)+"} &= "+FR(a,b)+" \\end{aligned} \\] The square root is <b>\\("+FR(a,b)+"\\)</b>.",
      {mode:"fraction", a:a, b:b});
    q.figure = solSquare((a*a)+"/"+(b*b), "?", "Square with labelled area and unknown side");
    return q;
  }
  var k=ri(3,39); var rd=u2r1(k/10); var nd=u2r2(rd*rd);
  var dc=u2d3(rd,[u2r1(rd+0.1),u2r1(rd-0.1),u2r1(rd*2),u2r1(rd+0.2),u2r1(rd/2),u2r1(rd+1)]);
  var dopts=fmtPairDs(fmt(rd), dc.map(function(d){return {v:d, fb:fmt(d)+" squared is "+fmt(u2r2(d*d))+", not "+fmt(nd)+": try another tenth."};}));
  var q = mcq("What is \\(\\sqrt{"+fmt(nd)+"}\\)? Give the exact value.", {t:fmt(rd), fb:"Yes: "+fmt(rd)+" times "+fmt(rd)+" equals "+fmt(nd)+"."}, dopts,
    "Find the decimal that multiplies by itself to give "+fmt(nd)+": \\[ \\begin{aligned} "+fmt(rd)+" \\times "+fmt(rd)+" &= "+fmt(nd)+" \\\\ \\sqrt{"+fmt(nd)+"} &= "+fmt(rd)+" \\end{aligned} \\] The square root is <b>"+fmt(rd)+"</b>.",
    {mode:"decimal", n:nd});
  q.figure = solSquare(fmt(nd), "?", "Square with labelled area and unknown side");
  return q;
}, ["For a fraction, root the top and the bottom separately; for a decimal, hunt among the tenths.", "Ask which number, multiplied by itself, gives exactly the value under the root sign."]);

E("u2-number-from-root", 2, ["6.11"], 1, "gen", function(){
  if(pick(["fraction","decimal"])==="fraction"){
    var p=ri(2,12), q=ri(2,12), g=0;
    while(u2gcd(p,q)!==1&&g<60){p=ri(2,12);q=ri(2,12);g++;}
    var correct="\\("+FR(p*p,q*q)+"\\)";
    var cands=[
      {t:"\\("+FR(2*p,q)+"\\)", fb:"That is double the root: squaring means multiply the root by itself, not by 2."},
      {t:"\\("+FR(p,2*q)+"\\)", fb:"That is half the root: the number comes from squaring the root, not halving it."},
      {t:"\\("+FR((p+1)*(p+1),q*q)+"\\)", fb:"That squares a neighbouring fraction: use the root shown, with top "+p+" and bottom "+q+"."},
      {t:"\\("+FR(p*p,(q+1)*(q+1))+"\\)", fb:"That squares a neighbouring fraction: use the root shown, with top "+p+" and bottom "+q+"."},
      {t:"\\("+FR(p*p,q)+"\\)", fb:"Only the top was squared: the bottom part must be squared as well."}
    ];
    var opts=[], seen={};
    for(var i=0;i<cands.length&&opts.length<3;i++){if(cands[i].t!==correct&&!seen[cands[i].t]){seen[cands[i].t]=1;opts.push(cands[i]);}}
    var qq = mcq("A positive number has square root \\("+FR(p,q)+"\\) . What is the number?", {t:correct, fb:"Yes: square the top and the bottom separately."}, opts,
      "Squaring undoes a square root, and both parts are squared: \\[ \\begin{aligned} \\left("+FR(p,q)+"\\right)^{2} &= "+FR(p,q)+" \\times "+FR(p,q)+" \\\\ &= "+FR(p*p,q*q)+" \\end{aligned} \\] The number is <b>\\("+FR(p*p,q*q)+"\\)</b>.",
      {mode:"fraction", p:p, q:q});
    qq.figure = solSquare("?", p+"/"+q, "Square with labelled side and unknown area");
    return qq;
  }
  var k=ri(4,29); var g2=0;
  while(k%10===0&&g2<40){k=ri(4,29);g2++;}
  var rd=u2r1(k/10); var nd=u2r2(rd*rd);
  var cands2=[
    {v:u2r2(2*rd), fb:"That is double the root: squaring means multiply the root by itself, not by 2."},
    {v:u2r2((rd+0.1)*(rd+0.1)), fb:"That squares the next tenth up: use the root shown, "+fmt(rd)+"."},
    {v:u2r2((rd-0.1)*(rd-0.1)), fb:"That squares the next tenth down: use the root shown, "+fmt(rd)+"."},
    {v:u2r2(nd+1), fb:"That adds 1 to the squared value: just multiply the root by itself."},
    {v:u2r2(nd+0.1), fb:"That is a little more than the squared root: multiply the root by itself exactly."}
  ];
  var dopts=[], seen2={};
  for(var j=0;j<cands2.length&&dopts.length<3;j++){var v=cands2[j].v; if(v!==nd&&v>0&&!seen2[v]){seen2[v]=1;dopts.push({v:v, fb:cands2[j].fb});}}
  dopts=fmtPairDs(fmt(nd), dopts);
  var q = mcq("A positive number has square root "+fmt(rd)+". What is the number?", {t:fmt(nd), fb:"Yes: "+fmt(rd)+" times "+fmt(rd)+" equals "+fmt(nd)+"."}, dopts,
    "Squaring undoes a square root: \\[ \\begin{aligned} "+fmt(rd)+"^{2} &= "+fmt(rd)+" \\times "+fmt(rd)+" \\\\ &= "+fmt(nd)+" \\end{aligned} \\] The number is <b>"+fmt(nd)+"</b>.",
    {mode:"decimal", r:rd});
  q.figure = solSquare("?", fmt(rd), "Square with labelled side and unknown area");
  return q;
}, ["Squaring and square roots undo each other, so square the given root.", "Multiply the root by itself, squaring the top and bottom separately for a fraction."]);

E("u2-calc-root-round", 2, ["6.6"], 1, "gen", function(){
  var isFrac=pick(["whole","fraction"])==="fraction";
  var val, label, rn, rd2;
  if(isFrac){
    var g=0;
    while(true){
      var n0=ri(2,40), d0=ri(2,12), gg=u2gcd(n0,d0);
      rn=n0/gg; rd2=d0/gg;
      if(rd2>1){var s1=Math.sqrt(rn), s2=Math.sqrt(rd2); if(!(s1===Math.floor(s1)&&s2===Math.floor(s2))){break;}}
      if(++g>200){break;}
    }
    val=rn/rd2; label=FR(rn,rd2);
  } else {
    var nw=u2nonSquare(11,399); val=nw; label=String(nw);
  }
  var root=Math.sqrt(val);
  var ans=u2r2(root);
  var trunc=Math.floor(root*100)/100;
  var onedp=u2r1(root);
  var delta=isFrac?((rn>1)?pick([-1,1]):1):pick([-1,1]);
  var neigh=isFrac?u2r2(Math.sqrt((rn+delta)/rd2)):u2r2(Math.sqrt(val+delta));
  var cands=[
    {v:trunc, fb:"That value is cut off after two decimal places: look at the third decimal and round up when it is 5 or more."},
    {v:onedp, fb:"That value is rounded to one decimal place: the question asks for two decimal places."},
    {v:neigh, fb:"That is the root of a neighbouring number: check the value under the root sign."},
    {v:u2r2(ans+0.01), fb:"That is a rounding slip in the last digit: check the third decimal place on the display."},
    {v:u2r2(ans-0.01), fb:"That is a rounding slip in the last digit: check the third decimal place on the display."},
    {v:u2r2(ans+0.02), fb:"That is a rounding slip in the last digit: check the third decimal place on the display."},
    {v:u2r2(ans-0.02), fb:"That is a rounding slip in the last digit: check the third decimal place on the display."}
  ];
  var opts=[], seen={};
  for(var i=0;i<cands.length&&opts.length<3;i++){var v=cands[i].v; if(v!==ans&&v>0&&!seen[v]){seen[v]=1;opts.push({t:fmtF(v,2), fb:cands[i].fb});}}
  return mcq("Use a calculator. What is \\(\\sqrt{"+label+"}\\), to two decimal places?", {t:fmtF(ans,2), fb:"Yes: the third decimal place decides the rounding, and it rounds to "+fmtF(ans,2)+"."}, opts,
    "A calculator gives the root, and the third decimal decides how it rounds: \\[ \\begin{aligned} \\sqrt{"+label+"} &\\approx "+fmt(root)+" \\\\ &\\approx "+fmtF(ans,2)+" \\end{aligned} \\] To two decimal places, the square root is <b>"+fmtF(ans,2)+"</b>.",
    {mode:isFrac?"fraction":"whole", val:val});
}, ["Use a calculator for the root, then round the display to two decimal places.", "Read the third decimal digit: it tells you whether the second decimal stays or rounds up."]);

E("u2-approx-explain-gen", 2, ["6.7"], 1, "gen", function(){
  var N=u2nonSquare(2,99);
  var places=pick([2,3,4]);
  var shown=Math.round(Math.sqrt(N)*Math.pow(10,places))/Math.pow(10,places);
  var shS=fmtF(shown,places);
  var sq=shown*shown;
  var frame=pick(["screen","student","project"]);
  var prompt;
  if(frame==="screen"){prompt="A calculator shows \\(\\sqrt{"+N+"} \\approx "+shS+"\\). Why is the value on the screen an approximation?";}
  else if(frame==="student"){prompt="A student says the exact value of \\(\\sqrt{"+N+"}\\) is "+shS+", the value on the calculator screen. Why is the student wrong?";}
  else {prompt="For a project, a student uses "+shS+" as the value of \\(\\sqrt{"+N+"}\\). Why is "+shS+" called an approximation?";}
  return mcq(prompt,
    {t:"Squaring "+shS+" does not give exactly "+N+", because the true root continues past the digits shown", fb:"Right: "+shS+" squared is "+fmt(sq)+", close to "+N+" but not equal to it."},
    [{t:"The calculator made an arithmetic error working out the root of "+N+", so its digits cannot be trusted", fb:"The calculator works properly: the limit is how many digits can be shown."},
     {t:"The value is exact, because a root shown to "+places+" decimal places has all of its digits given in full", fb:"More places still means rounded: the digits of this root continue past them."},
     {t:"The number "+N+" has no square root at all, so the screen can only show a rough guess in its place", fb:N+" does have a square root: it just never ends or repeats as a decimal."}],
    "The shown value is rounded, and squaring it shows the gap: \\[ \\begin{aligned} ("+shS+")^{2} &= "+fmt(sq)+" \\\\ &\\ne "+N+" \\end{aligned} \\] Because its square is not exactly "+N+", the shown value is <b>an approximation, not the exact root</b>.",
    {mode:frame, N:N, places:places});
}, ["Ask whether squaring the shown value gives back the starting number exactly.", "Square the shown value and compare it with the number under the root sign."]);

E("u2-overlap-pair", 2, ["9.1"], 3, "gen", function(){
  if(pick(["tri-on-rect","cyl-on-tri"])==="tri-on-rect"){
    var tr=pick([[3,4,5],[6,8,10],[5,12,13],[8,15,17],[9,12,15]]);
    var a=tr[0], b=tr[1], c=tr[2];
    var l=ri(6,14), h=ri(3,9), w=a;
    var boxSA=2*(l*w+l*h+w*h);
    var triSA=a*b+(a+b+c)*l;
    var contact=a*l;
    var tot=boxSA+triSA-2*contact;
    var q = numq("A model is built by joining two solids face to face. The bottom solid is a right rectangular prism "+l+" cm long, "+w+" cm wide and "+h+" cm high. On top of it sits a right triangular prism, a prism with right triangle ends and rectangular sides. Its triangular ends have legs "+a+" cm and "+b+" cm and hypotenuse "+c+" cm, the prism is "+l+" cm long, and its bottom face, "+a+" cm by "+l+" cm, exactly covers the top face of the bottom prism. The face where the two solids join is hidden inside the model. Find the total surface area of the model, in square centimetres.", tot, 0.01,
      "Find each solid from its faces first. The bottom prism has face areas "+fmt(l*w)+", "+fmt(l*h)+" and "+fmt(w*h)+", each twice, giving "+boxSA+". The triangular prism has two triangular ends of area "+fmt(a*b/2)+" each and three rectangles of areas "+fmt(a*l)+", "+fmt(b*l)+" and "+fmt(c*l)+", giving "+triSA+". The overlap is the "+a+" cm by "+l+" cm rectangle where the two prisms join, area "+contact+". It is a face of each solid, so it is hidden twice and comes off both surface areas: \\[ \\begin{aligned} SA &= "+boxSA+" + "+triSA+" - 2("+contact+") \\\\ &= "+tot+" \\end{aligned} \\] The total surface area is <b>"+tot+" cm\\(^{2}\\)</b>.",
      {mode:"tri-on-rect", a:a, b:b, c:c, l:l, h:h});
    q.figure = solBoxTri(a, b, c, l, a, h, fmt(a) + " cm", fmt(b) + " cm", fmt(c) + " cm", fmt(l) + " cm", "", fmt(h) + " cm", "Triangular prism on a box with labelled dimensions");
    return q;
  }
  var tr2=pick([[6,8,10],[9,12,15],[12,16,20],[8,15,17]]);
  var a2=tr2[0], b2=tr2[1], c2=tr2[2];
  var L=ri(10,16);
  var r=(a2>=9)?ri(2,4):ri(2,3);
  var hc=ri(4,10);
  var triSA2=a2*b2+(a2+b2+c2)*L;
  var cylSA=u2r2(2*3.14*r*r+2*3.14*r*hc);
  var circ=u2r2(3.14*r*r);
  var tot2=u2r1(triSA2+cylSA-2*circ);
  var q = numq("A right cylinder stands on a right triangular prism, a prism with right triangle ends and rectangular sides. The triangular ends have legs "+a2+" cm and "+b2+" cm and hypotenuse "+c2+" cm, and the prism is "+L+" cm long. The cylinder has radius "+r+" cm and height "+hc+" cm, and it stands on the rectangular face of the prism that measures "+a2+" cm by "+L+" cm, with its whole base on that face. The part where the two solids touch is hidden inside the finished object. Find the total surface area, in square centimetres. Use \\(\\pi = 3.14\\) and give your answer to one decimal place.", tot2, 0.6,
    "Find each solid from its faces first. The triangular prism has two triangular ends of area "+fmt(a2*b2/2)+" each and three rectangles of areas "+fmt(a2*L)+", "+fmt(b2*L)+" and "+fmt(c2*L)+", giving "+triSA2+". The cylinder has two circles of area "+fmt(circ)+" each and a curved side that unrolls into a rectangle of area "+fmt(u2r2(2*3.14*r*hc))+", giving "+fmt(cylSA)+". The overlap is the circle where the cylinder meets the prism, area "+fmt(circ)+". It is hidden on the prism face and it is the base of the cylinder, so its area comes off twice: \\[ \\begin{aligned} SA &= "+triSA2+" + "+fmt(cylSA)+" - 2("+fmt(circ)+") \\\\ &= "+fmt(tot2)+" \\end{aligned} \\] The total surface area is <b>"+fmt(tot2)+" cm\\(^{2}\\)</b>.",
    {mode:"cyl-on-tri", a:a2, b:b2, c:c2, L:L, r:r, hc:hc});
    q.figure = solCylOnTri(a2, b2, c2, L, r, hc, fmt(a2) + " cm", fmt(b2) + " cm", fmt(c2) + " cm", fmt(L) + " cm", fmt(r) + " cm", fmt(hc) + " cm", "Cylinder on a triangular prism with labelled dimensions");
    return q;
}, ["Add the surface areas of the two separate solids first, then deal with the join.", "Find the area of the face where the solids touch, and subtract it twice because it is hidden on both solids."]);

/* ----- bank-u3-topup.js ----- */
// Math 9 Unit 3 top-up tranche (November 7, 2026) question bank
// Cut verbatim from the standalone bank source
// (math-9-review/bank-src.js, lines 1847 to 2327).
/* Top-up tranche (November 7, 2026): Unit 3 additions from tranche1/unit3-topup.js */
// Unit 3 top-up: Powers and Exponent Laws (new shapes only)

function u3tMult(factor, count) {
  var parts = [];
  for (var i = 0; i < count; i++) parts.push(factor);
  return "\\(" + parts.join("\\times ") + "\\)";
}
function u3tGcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
function u3tRed(n, d) { var g = u3tGcd(n, d); return [n / g, d / g]; }
function u3tFracOpt(n, d) {
  var r = u3tRed(n, d); n = r[0]; d = r[1];
  if (d === 1) return fmt(n);
  if (n < 0) return "\\(-\\frac{" + (-n) + "}{" + d + "}\\)";
  return "\\(\\frac{" + n + "}{" + d + "}\\)";
}
function u3tFracInner(n, d) { return "\\frac{" + n + "}{" + d + "}"; }
var u3tFracs = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 6], [5, 6], [2, 7], [3, 7], [1, 8], [3, 8]];
var u3tFracsSmall = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [1, 5], [3, 5]];

E("u3-repeated-product-form", 3, ["3.6"], 1, "gen", function () {
  var mode = pick(["neg", "neg", "frac", "frac", "negfrac"]);
  var factor, powerInner, altFactor, altFb;
  var e = ri(2, 4);
  if (mode === "neg") {
    var b = ri(2, 9);
    factor = "(-" + b + ")";
    powerInner = "(-" + b + ")^{" + e + "}";
    altFactor = "(" + b + ")";
    altFb = "That drops the negative sign from each factor. The base is negative.";
  } else if (mode === "frac") {
    var f = pick(u3tFracs);
    factor = "(" + u3tFracInner(f[0], f[1]) + ")";
    powerInner = "(" + u3tFracInner(f[0], f[1]) + ")^{" + e + "}";
    altFactor = "(" + u3tFracInner(f[1], f[0]) + ")";
    altFb = "That swaps the top and bottom of the fraction base.";
  } else {
    var f2 = pick(u3tFracsSmall);
    e = ri(2, 3);
    factor = "(-" + u3tFracInner(f2[0], f2[1]) + ")";
    powerInner = "(-" + u3tFracInner(f2[0], f2[1]) + ")^{" + e + "}";
    altFactor = "(" + u3tFracInner(f2[0], f2[1]) + ")";
    altFb = "That drops the negative sign from each factor. The base is negative.";
  }
  var correct = u3tMult(factor, e);
  var pool = [
    { t: u3tMult(factor, e + 1), fb: "That uses one factor too many. Count the exponent." },
    { t: u3tMult(factor, e - 1), fb: "That uses one factor too few. Count the exponent." },
    { t: u3tMult(altFactor, e), fb: altFb },
    { t: "\\(" + factor + "\\times " + e + "\\)", fb: "That multiplies the base by the exponent once. A power repeats the base as a factor." }
  ];
  var ds = [], seen = {}; seen[correct] = 1;
  for (var i = 0; i < pool.length && ds.length < 3; i++) { if (!seen[pool[i].t]) { seen[pool[i].t] = 1; ds.push(pool[i]); } }
  var stem = pick([
    "What is \\(" + powerInner + "\\) written as repeated multiplication?",
    "Which repeated multiplication is equal to \\(" + powerInner + "\\)?",
    "Express \\(" + powerInner + "\\) as a repeated multiplication. Which choice shows it?"
  ]);
  return mcq(stem,
    { t: correct, fb: "Correct. The whole base, sign and all, repeats as many times as the exponent says." }, ds,
    "The base is \\(" + factor + "\\) and the exponent is \\(" + e + "\\), so write the base as a factor \\(" + e + "\\) times: \\[ \\begin{aligned} " + powerInner + " &= " + correct.replace("\\(", "").replace("\\)", "") + " \\end{aligned} \\] So the repeated multiplication is <b>" + correct + "</b>.",
    { mode: "topup-repeated-" + mode, e: e });
}, ["The exponent tells you how many times the whole base appears as a factor.", "Write the base down exactly as it appears, brackets and sign included, then repeat it."]);

E("u3-power-from-product", 3, ["3.7"], 1, "gen", function () {
  var mode = pick(["neg", "neg", "frac", "frac", "negfrac"]);
  var factor, correctInner, ds;
  if (mode === "neg") {
    var b = ri(2, 9), c = ri(2, 5);
    while (b === c) { b = ri(2, 9); }
    factor = "(-" + b + ")";
    correctInner = "(-" + b + ")^{" + c + "}";
    ds = [
      { t: "\\((-" + c + ")^{" + b + "}\\)", fb: "That swaps the base value and the count of factors." },
      { t: "\\(" + b + "^{" + c + "}\\)", fb: "That drops the negative sign from the base." },
      { t: "\\((-" + b + ")^{" + (c + 1) + "}\\)", fb: "That adds one to the exponent. Count the factors shown." }
    ];
  } else if (mode === "frac") {
    var f = pick(u3tFracs), c2 = ri(2, 4);
    factor = "(" + u3tFracInner(f[0], f[1]) + ")";
    correctInner = "(" + u3tFracInner(f[0], f[1]) + ")^{" + c2 + "}";
    ds = [
      { t: "\\((" + u3tFracInner(f[1], f[0]) + ")^{" + c2 + "}\\)", fb: "That swaps the top and bottom of the fraction base." },
      { t: "\\((" + u3tFracInner(f[0], f[1]) + ")^{" + (c2 + 1) + "}\\)", fb: "That adds one to the exponent. Count the factors shown." },
      { t: "\\((" + u3tFracInner(f[0], f[1]) + ")^{" + (c2 - 1) + "}\\)", fb: "That subtracts one from the exponent. Count the factors shown." }
    ];
    var cc = c2;
  } else {
    var f2 = pick(u3tFracsSmall), c3 = ri(2, 3);
    factor = "(-" + u3tFracInner(f2[0], f2[1]) + ")";
    correctInner = "(-" + u3tFracInner(f2[0], f2[1]) + ")^{" + c3 + "}";
    ds = [
      { t: "\\((" + u3tFracInner(f2[0], f2[1]) + ")^{" + c3 + "}\\)", fb: "That drops the negative sign from the base." },
      { t: "\\((-" + u3tFracInner(f2[0], f2[1]) + ")^{" + (c3 + 1) + "}\\)", fb: "That adds one to the exponent. Count the factors shown." },
      { t: "\\((-" + u3tFracInner(f2[1], f2[0]) + ")^{" + c3 + "}\\)", fb: "That swaps the top and bottom of the fraction base." }
    ];
    var cc2 = c3;
  }
  var count = (mode === "neg") ? c : (mode === "frac" ? cc : cc2);
  var shown = u3tMult(factor, count);
  var stem = pick([
    "What is " + shown + " written as a single power?",
    "Which single power is equal to " + shown + "?",
    "Express " + shown + " as a single power. Which choice shows it?"
  ]);
  return mcq(stem,
    { t: "\\(" + correctInner + "\\)", fb: "Correct. The repeated factor is the base and the count of factors is the exponent." }, ds,
    "There are \\(" + count + "\\) factors, and each factor is \\(" + factor + "\\), so the power is \\(" + correctInner + "\\). \\[ \\begin{aligned} " + shown.replace("\\(", "").replace("\\)", "") + " &= " + correctInner + " \\end{aligned} \\] So the single power is <b>\\(" + correctInner + "\\)</b>.",
    { mode: "topup-from-product-" + mode, count: count });
}, ["Count the factors first. That count becomes the exponent.", "Write the repeated factor exactly as the base, sign included, then use your count as the exponent."]);

E("u3-evaluate-power-neg", 3, ["3.10"], 1, "gen", function () {
  var mode = pick(["neg", "neg", "one", "negone", "frac"]);
  var stemVerb = pick(["Evaluate", "What is the value of", "Find the value of"]);
  if (mode === "frac") {
    var f = pick([[1, 2], [1, 3], [2, 3], [3, 4], [1, 4], [2, 5], [3, 5], [1, 5], [5, 6], [3, 8]]);
    var e = ri(2, 3);
    var vn = Math.pow(f[0], e), vd = Math.pow(f[1], e);
    var correct = u3tFracOpt(vn, vd);
    var poolF = [
      { n: -vn, d: vd, fb: "That has the wrong sign. The base is positive, so the value is positive." },
      { n: Math.pow(f[0], e), d: f[1], fb: "That raises only the top of the fraction to the power. The bottom is raised too." },
      { n: f[0], d: Math.pow(f[1], e), fb: "That raises only the bottom of the fraction to the power. The top is raised too." },
      { n: f[0] * e, d: f[1], fb: "That multiplies the base by the exponent. A power repeats the base as a factor." },
      { n: vd, d: vn, fb: "That flips the fraction over. Keep the top and bottom in place." }
    ];
    var dsF = [], seenF = {}; seenF[u3tRed(vn, vd).join("/")] = 1;
    for (var i = 0; i < poolF.length && dsF.length < 3; i++) {
      var key = u3tRed(poolF[i].n, poolF[i].d).join("/");
      if (!seenF[key]) { seenF[key] = 1; dsF.push({ t: u3tFracOpt(poolF[i].n, poolF[i].d), fb: poolF[i].fb }); }
    }
    var shownF = "(" + u3tFracInner(f[0], f[1]) + ")^{" + e + "}";
    return mcq(stemVerb + " \\(" + shownF + "\\).",
      { t: correct, fb: "Correct. Both the top and the bottom of the fraction are raised to the power." }, dsF,
      "Raise the top and the bottom separately: \\[ \\begin{aligned} " + shownF + " &= \\frac{" + f[0] + "^{" + e + "}}{" + f[1] + "^{" + e + "}} \\\\ &= \\frac{" + vn + "}{" + vd + "} \\end{aligned} \\] So the value is <b>" + correct + "</b>.",
      { mode: "topup-eval-frac", n: f[0], d: f[1], e: e });
  }
  var base, e2, val, shown;
  if (mode === "neg") { var b = ri(2, 9); e2 = ri(2, 5); base = -b; val = Math.pow(-b, e2); shown = "(-" + b + ")^{" + e2 + "}"; }
  else if (mode === "one") { base = 1; e2 = ri(2, 9); val = 1; shown = "1^{" + e2 + "}"; }
  else { base = -1; e2 = ri(2, 12); val = (e2 % 2 === 0) ? 1 : -1; shown = "(-1)^{" + e2 + "}"; }
  var pool = [
    { v: -val, fb: "That has the opposite sign. Count how many negative factors are multiplied." },
    { v: base * e2, fb: "That multiplies the base by the exponent. A power repeats the base as a factor." },
    { v: 0, fb: "That gives zero. A power of a nonzero base is never zero here." },
    { v: val + base, fb: "That is close, but off. Expand the power as repeated multiplication." },
    { v: -Math.abs(val), fb: "That forces a negative answer. An even number of negative factors gives a positive product." },
    { v: Math.abs(val), fb: "That drops the sign. An odd number of negative factors gives a negative product." },
    { v: base + e2, fb: "That adds the base and exponent. Use repeated multiplication." }
  ];
  var ds = [], seen = {}; seen[String(val)] = 1;
  for (var j = 0; j < pool.length && ds.length < 3; j++) { if (!seen[String(pool[j].v)]) { seen[String(pool[j].v)] = 1; ds.push({ t: fmt(pool[j].v), fb: pool[j].fb }); } }
  var factors = [];
  for (var k = 0; k < Math.min(e2, 5); k++) factors.push("(" + base + ")");
  var expand = (e2 > 5) ? "(" + base + ")\\times (" + base + ")\\times \\cdots \\times (" + base + ")" : factors.join("\\times ");
  var signNote = (mode === "one") ? "Every factor is 1, so the product stays 1." : ((e2 % 2 === 0) ? "The exponent is even, so the negative factors pair up to a positive product." : "The exponent is odd, so one negative factor is left over and the product is negative.");
  return mcq(stemVerb + " \\(" + shown + "\\).",
    { t: fmt(val), fb: "Correct. You expanded the power and handled the sign correctly." }, ds,
    signNote + " \\[ \\begin{aligned} " + shown + " &= " + expand + " \\\\ &= " + fmt(val) + " \\end{aligned} \\] So the value is <b>" + fmt(val) + "</b>.",
    { mode: "topup-eval-" + mode, base: base, e: e2 });
}, ["Expand the power as repeated multiplication first, and watch the sign of each factor.", "Multiply the base by itself, using the exponent as the count, then settle the sign."]);

function u3tGrid(rows, cols) {
  var sp = 26, pad = 16;
  var w = (cols - 1) * sp + 2 * pad, h = (rows - 1) * sp + 2 * pad;
  var s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h + '" role="img">';
  for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
    s += '<circle cx="' + (pad + c * sp) + '" cy="' + (pad + r * sp) + '" r="7" fill="#17352a"/>';
  }
  return s + '</svg>';
}
function u3tLayers(a) {
  var sp = 26, pad = 16, gap = 24;
  var gw = (a - 1) * sp;
  var w = 2 * pad + a * gw + (a - 1) * gap;
  var h = 2 * pad + gw + 26;
  var s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h + '" role="img">';
  for (var L = 0; L < a; L++) {
    var x0 = pad + L * (gw + gap);
    for (var r = 0; r < a; r++) for (var c = 0; c < a; c++) {
      s += '<circle cx="' + (x0 + c * sp) + '" cy="' + (pad + r * sp) + '" r="7" fill="#17352a"/>';
    }
  }
  s += '<text x="' + (w / 2) + '" y="' + (h - 6) + '" text-anchor="middle" font-size="13" fill="#17352a">' + a + ' layers, each ' + a + ' by ' + a + '</text>';
  return s + '</svg>';
}
function u3tFig(q, fig) { q.figure = fig; return q; }
function u3tPowOpt(a, e) { return "\\(" + a + "^{" + e + "}\\)"; }

E("u3-power-model-var", 3, ["3.4"], 1, "var", varset([
  function () {
    var q = mcq("Dot model convention: a square power is modelled as a grid, with the base as the number of dots along one side and the exponent 2 as the two grid dimensions, rows and columns. Which power does this model show?",
      { t: u3tPowOpt(3, 2), fb: "Correct. The side has 3 dots and the grid has 2 dimensions." },
      [
        { t: u3tPowOpt(2, 3), fb: "That swaps the base and the exponent. The side count is the base." },
        { t: u3tPowOpt(3, 3), fb: "That uses 3 as the exponent too. A flat grid has 2 dimensions." },
        { t: u3tPowOpt(3, 1), fb: "That uses exponent 1. A grid is built from two equal dimensions." }
      ],
      "Count the dots along one side and count the dimensions: \\[ \\begin{aligned} \\text{side} &= 3 \\text{ dots} \\\\ \\text{dimensions} &= 2 \\end{aligned} \\] The base is the side count, 3, and the exponent is the dimension count, 2. So the model shows <b>\\(3^{2}\\)</b>.",
      { mode: "model-grid-3" });
    return u3tFig(q, u3tGrid(3, 3));
  },
  function () {
    var q = mcq("Dot model convention: a square power is modelled as a grid, with the base as the number of dots along one side and the exponent 2 as the two grid dimensions, rows and columns. Which power does this model show?",
      { t: u3tPowOpt(4, 2), fb: "Correct. The side has 4 dots and the grid has 2 dimensions." },
      [
        { t: u3tPowOpt(2, 4), fb: "That swaps the base and the exponent. The side count is the base." },
        { t: u3tPowOpt(4, 3), fb: "That uses exponent 3, which would need layers. This model is one flat grid." },
        { t: u3tPowOpt(4, 1), fb: "That uses exponent 1. A grid is built from two equal dimensions." }
      ],
      "Count the dots along one side and count the dimensions: \\[ \\begin{aligned} \\text{side} &= 4 \\text{ dots} \\\\ \\text{dimensions} &= 2 \\end{aligned} \\] The base is the side count, 4, and the exponent is the dimension count, 2. So the model shows <b>\\(4^{2}\\)</b>.",
      { mode: "model-grid-4" });
    return u3tFig(q, u3tGrid(4, 4));
  },
  function () {
    var q = mcq("Dot model convention: a cube power is modelled as identical square layers drawn side by side, with the base as the side of each layer and the exponent 3 as the number of layers. Which power does this model show?",
      { t: u3tPowOpt(2, 3), fb: "Correct. Each layer is 2 by 2 and there are 2 layers, giving base 2 with 3 dimensions in all." },
      [
        { t: u3tPowOpt(3, 2), fb: "That swaps the base and the exponent. The layer side is the base." },
        { t: u3tPowOpt(2, 2), fb: "That counts only one flat layer. The layers side by side add the third dimension." },
        { t: u3tPowOpt(3, 3), fb: "That uses 3 as the base. Each layer here is 2 by 2, not 3 by 3." }
      ],
      "Read the base from one layer and the exponent from the full build: \\[ \\begin{aligned} \\text{layer side} &= 2 \\text{ dots} \\\\ \\text{layers} &= 2, \\text{ each } 2 \\text{ by } 2 \\end{aligned} \\] The base is the dots along one side of a layer, 2, and the exponent counts the dimensions, 3 in all. So the model shows <b>\\(2^{3}\\)</b>.",
      { mode: "model-cube-2" });
    return u3tFig(q, u3tLayers(2));
  },
  function () {
    var q = mcq("Dot model convention: a cube power is modelled as identical square layers drawn side by side, with the base as the side of each layer and the exponent 3 as the number of layers. Which power does this model show?",
      { t: u3tPowOpt(3, 3), fb: "Correct. Each layer is 3 by 3 and there are 3 layers." },
      [
        { t: u3tPowOpt(3, 2), fb: "That counts only one flat layer. The layers side by side add the third dimension." },
        { t: u3tPowOpt(2, 3), fb: "That uses 2 as the base. Each layer here is 3 by 3, not 2 by 2." },
        { t: u3tPowOpt(3, 1), fb: "That uses exponent 1. The build uses three dimensions in all." }
      ],
      "Read the base from one layer and the exponent from the full build: \\[ \\begin{aligned} \\text{layer side} &= 3 \\text{ dots} \\\\ \\text{layers} &= 3, \\text{ each } 3 \\text{ by } 3 \\end{aligned} \\] The base is the dots along one side of a layer, 3, and the exponent counts the dimensions, 3 in all. So the model shows <b>\\(3^{3}\\)</b>.",
      { mode: "model-cube-3" });
    return u3tFig(q, u3tLayers(3));
  },
  function () {
    var q = mcq("Dot model convention: a square power is modelled as a grid, with the base as the number of dots along one side and the exponent 2 as the two grid dimensions, rows and columns. How many dots are in this model in total?",
      { t: "16", fb: "Correct. The grid is 4 by 4, and 4 times 4 is 16." },
      [
        { t: "8", fb: "That adds the side lengths, 4 plus 4. Multiply them to count the grid." },
        { t: "4", fb: "That counts one side only. Count every row of the grid." },
        { t: "12", fb: "That counts 3 rows of 4. The grid has 4 full rows." }
      ],
      "The grid has 4 rows with 4 dots in each row: \\[ \\begin{aligned} \\text{total} &= 4\\times 4 \\\\ &= 16 \\end{aligned} \\] The base, 4, is the side count, and the exponent, 2, is the number of dimensions multiplied. So the total is <b>16</b> dots.",
      { mode: "model-total-grid-4" });
    return u3tFig(q, u3tGrid(4, 4));
  },
  function () {
    var q = mcq("Dot model convention: a cube power is modelled as identical square layers drawn side by side, with the base as the side of each layer and the exponent 3 as the number of layers. How many dots are in this model in total?",
      { t: "8", fb: "Correct. There are 2 layers with 4 dots each, and 2 times 4 is 8." },
      [
        { t: "6", fb: "That adds 2 and 4. Multiply the dots per layer by the number of layers." },
        { t: "4", fb: "That counts one layer only. There are 2 layers in the model." },
        { t: "12", fb: "That counts 3 layers of 4. The model has 2 layers." }
      ],
      "Each layer holds 2 by 2 dots and there are 2 layers: \\[ \\begin{aligned} \\text{total} &= 2\\times (2\\times 2) \\\\ &= 8 \\end{aligned} \\] The base, 2, is the side count of one layer, and the exponent, 3, counts the dimensions multiplied. So the total is <b>8</b> dots.",
      { mode: "model-total-cube-2" });
    return u3tFig(q, u3tLayers(2));
  },
  function () {
    var q = mcq("A student tries to model \\(3^{2}\\) using the dot model conventions: a square power is a flat grid, and a cube power is identical square layers drawn side by side. The model the student built is shown. Which power does the model actually show?",
      { t: u3tPowOpt(2, 3), fb: "Correct. The layers make it a cube power with base 2, not a square power with base 3." },
      [
        { t: u3tPowOpt(3, 2), fb: "That is the power the student wanted. Read the model itself: it has layers, not one flat grid." },
        { t: u3tPowOpt(2, 2), fb: "That counts one layer only. The layers side by side add the third dimension." },
        { t: u3tPowOpt(3, 3), fb: "That uses 3 as the base. Each layer here is 2 by 2, not 3 by 3." }
      ],
      "Read the model on its own terms: \\[ \\begin{aligned} \\text{layer side} &= 2 \\text{ dots} \\\\ \\text{layers} &= 2, \\text{ each } 2 \\text{ by } 2 \\end{aligned} \\] The base is the side of one layer, 2, and the exponent is 3 because the build has three dimensions. So the model actually shows <b>\\(2^{3}\\)</b>.",
      { mode: "model-interchanged-cube" });
    return u3tFig(q, u3tLayers(2));
  },
  function () {
    var q = mcq("A student tries to model \\(2^{3}\\) using the dot model conventions: a square power is a flat grid, and a cube power is identical square layers drawn side by side. The model the student built is shown. What did the student mix up?",
      { t: "The base and exponent were swapped: the model shows \\(3^{2}\\), a flat 3 by 3 grid", fb: "Correct. A flat grid with side 3 is the square power 3 squared." },
      [
        { t: "The dots were counted wrongly: the model shows \\(2^{3}\\) with 9 dots in each layer", fb: "That keeps the wanted power. The model is one flat grid, and each side has 3 dots." },
        { t: "One layer is missing: adding a layer to this grid would complete the model of \\(2^{3}\\)", fb: "That treats the grid as a layer of the cube. Its side is 3, so it cannot be a layer of a power with base 2." },
        { t: "The model is correct as built: a flat 3 by 3 grid is the standard model of \\(2^{3}\\)", fb: "That accepts the swap. A cube power needs layers, and this grid has side 3, not 2." }
      ],
      "Read the model on its own terms: \\[ \\begin{aligned} \\text{grid side} &= 3 \\text{ dots} \\\\ \\text{layers} &= 1 \\text{ flat grid} \\end{aligned} \\] The base is the side count, 3, and a flat grid has exponent 2, so the model shows \\(3^{2}\\). The student swapped the base and the exponent. So the correct statement is <b>The base and exponent were swapped: the model shows \\(3^{2}\\), a flat 3 by 3 grid</b>.",
      { mode: "model-interchanged-grid" });
    return u3tFig(q, u3tGrid(3, 3));
  }
]), ["Read the base from the dots along one side or one layer first.", "Count the dimensions next: a flat grid has two, a layered build has three."]);

E("u3-zero-pattern", 3, ["3.9"], 1, "gen", function () {
  var mode = pick(["int", "int", "frac", "neg"]);
  var lines = [], baseTxt, lastStep, baseOpt, recipOpt;
  if (mode === "int") {
    var a = ri(2, 9), s = pick([3, 4, 5]);
    for (var k = s; k >= 1; k--) lines.push("\\(" + a + "^{" + k + "}=" + fmt(Math.pow(a, k)) + "\\)");
    baseTxt = a + "";
    lastStep = a + "^{1}\\div " + a + " &= " + a + "\\div " + a + " \\\\ &= 1";
    baseOpt = fmt(a);
    recipOpt = "\\(\\frac{1}{" + a + "}\\)";
  } else if (mode === "neg") {
    var a2 = ri(2, 6), s2 = pick([3, 4, 5]);
    for (var k2 = s2; k2 >= 1; k2--) lines.push("\\((-" + a2 + ")^{" + k2 + "}=" + fmt(Math.pow(-a2, k2)) + "\\)");
    baseTxt = "(-" + a2 + ")";
    lastStep = "(-" + a2 + ")^{1}\\div (-" + a2 + ") &= (-" + a2 + ")\\div (-" + a2 + ") \\\\ &= 1";
    baseOpt = fmt(-a2);
    recipOpt = "\\(-\\frac{1}{" + a2 + "}\\)";
  } else {
    var f = pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [3, 5], [1, 5], [1, 6], [5, 6]]);
    var s3 = pick([3, 4]);
    for (var k3 = s3; k3 >= 1; k3--) lines.push("\\((" + u3tFracInner(f[0], f[1]) + ")^{" + k3 + "}=" + u3tFracInner(Math.pow(f[0], k3), Math.pow(f[1], k3)) + "\\)");
    baseTxt = "(" + u3tFracInner(f[0], f[1]) + ")";
    lastStep = "(" + u3tFracInner(f[0], f[1]) + ")^{1}\\div (" + u3tFracInner(f[0], f[1]) + ") &= " + u3tFracInner(f[0], f[1]) + "\\div " + u3tFracInner(f[0], f[1]) + " \\\\ &= 1";
    baseOpt = u3tFracOpt(f[0], f[1]);
    recipOpt = u3tFracOpt(f[1], f[0]);
  }
  var prompt = pick([
    "A pattern for the base \\(" + baseTxt + "\\) is shown. Each step down divides by the base.<br>" + lines.join("<br>") + "<br>What is the value of \\(" + baseTxt + "^{0}\\) that continues the pattern?",
    "The powers of \\(" + baseTxt + "\\) below follow a pattern, and each value is the one above it divided by the base.<br>" + lines.join("<br>") + "<br>Following the pattern one more step, what is \\(" + baseTxt + "^{0}\\)?",
    "Read the pattern for the base \\(" + baseTxt + "\\) from the top down. Every step divides by the base.<br>" + lines.join("<br>") + "<br>What value does the pattern give for \\(" + baseTxt + "^{0}\\)?"
  ]);
  return mcq(prompt,
    { t: "1", fb: "Correct. Dividing the first power value by the base one more time gives one." },
    [
      { t: "0", fb: "That treats the zero exponent as giving zero. Follow the division pattern down one more step." },
      { t: baseOpt, fb: "That is the base itself, the value of the first power. Divide it by the base once more." },
      { t: recipOpt, fb: "That divides once too often, or divides the wrong way. One division from the first power value gives one." }
    ],
    "Each step down divides by the base, so continue from the first power: \\[ \\begin{aligned} " + lastStep + " \\end{aligned} \\] So the value that continues the pattern is <b>1</b>.",
    { mode: "topup-zero-" + mode });
}, ["Watch what happens to the value each time the exponent drops by one.", "Take the value of the first power and divide it by the base."]);

E("u3-paren-powers-set", 3, ["3.8"], 1, "gen", function () {
  var b = ri(2, 5), e = ri(2, 4);
  var forms = [
    { txt: "(-" + b + ")^{" + e + "}", val: Math.pow(-b, e) },
    { txt: "(-" + b + "^{" + e + "})", val: -Math.pow(b, e) },
    { txt: "-" + b + "^{" + e + "}", val: -Math.pow(b, e) }
  ];
  var order = shuffle([0, 1, 2]);
  var shownForms = order.map(function (i) { return forms[i]; });
  var listTxt = shownForms.map(function (f, i) { return "Form " + (i + 1) + ": \\(" + f.txt + "\\)"; }).join("<br>");
  var mode = (e % 2 === 0 && Math.random() < 0.45) ? "pair" : "triple";
  if (mode === "pair") {
    function pairTxt(i, j) { return "\\(" + shownForms[i].txt + "\\) and \\(" + shownForms[j].txt + "\\)"; }
    var eqPair = null;
    for (var i = 0; i < 3; i++) for (var j = i + 1; j < 3; j++) { if (shownForms[i].val === shownForms[j].val) eqPair = [i, j]; }
    var pairs = [[0, 1], [0, 2], [1, 2]];
    var dsP = pairs.filter(function (p) { return !(p[0] === eqPair[0] && p[1] === eqPair[1]); }).map(function (p) {
      return { t: pairTxt(p[0], p[1]), fb: "Those two forms have different values. Check which forms keep the negative sign outside the power." };
    });
    dsP.push({ t: "All three forms have the same value", fb: "That is not so here. The bracketed form has a different value from the other two." });
    return mcq("Three forms are shown.<br>" + listTxt + "<br>Which two forms have the same value?",
      { t: pairTxt(eqPair[0], eqPair[1]), fb: "Correct. In both forms the power is worked out first and the negative sign stays outside." }, dsP,
      "Work out each form: \\[ \\begin{aligned} " + shownForms.map(function (f) { return f.txt + " &= " + fmt(f.val); }).join(" \\\\ ") + " \\end{aligned} \\] The two forms with the same value are <b>" + pairTxt(eqPair[0], eqPair[1]) + "</b>.",
      { mode: "topup-paren-pair", b: b, e: e });
  }
  var vals = shownForms.map(function (f) { return f.val; });
  function trip(v) { return "\\(" + v.map(function (x) { return fmt(x); }).join(", ") + "\\)"; }
  var poolT = [
    { v: [-vals[0], vals[1], vals[2]], fb: "That changes the sign of the first form. Check what its brackets cover." },
    { v: [vals[0], -vals[1], vals[2]], fb: "That changes the sign of the second form. Check where its negative sign sits." },
    { v: [vals[0], vals[1], -vals[2]], fb: "That changes the sign of the third form. Check where its negative sign sits." },
    { v: [-vals[0], -vals[1], -vals[2]], fb: "That changes every sign. Work out the bracketed form on its own first." },
    { v: [Math.abs(vals[0]), Math.abs(vals[1]), Math.abs(vals[2])], fb: "That drops every negative sign. Some forms keep a negative value." },
    { v: [vals[1], vals[0], vals[2]], fb: "That swaps the first two values. Keep the values in the order the forms are shown." }
  ];
  var dsT = [], seenT = {}; seenT[trip(vals)] = 1;
  for (var t = 0; t < poolT.length && dsT.length < 3; t++) { var tt = trip(poolT[t].v); if (!seenT[tt]) { seenT[tt] = 1; dsT.push({ t: tt, fb: poolT[t].fb }); } }
  return mcq("Three forms are shown.<br>" + listTxt + "<br>What are the values of the three forms, in the order shown?",
    { t: trip(vals), fb: "Correct. You checked what the brackets cover in each form." }, dsT,
    "Work out each form in turn: \\[ \\begin{aligned} " + shownForms.map(function (f) { return f.txt + " &= " + fmt(f.val); }).join(" \\\\ ") + " \\end{aligned} \\] In the bracketed form the negative value is the base. In the other two forms the power is worked out first and the negative sign stays outside. So the values, in order, are <b>" + trip(vals) + "</b>.",
    { mode: "topup-paren-triple", b: b, e: e });
}, ["Look at each form on its own and settle what its base is.", "Work out the first form by expanding it, then do the same for the other two."]);

E("u3-two-laws-context", 3, ["3.12"], 2, "gen", function () {
  var fam = pick(["prodquot", "powprod"]);
  if (fam === "prodquot") {
    var a = ri(2, 5), m = ri(2, 3), n = ri(2, 3), p = ri(1, 2);
    var tot = m + n - p, val = Math.pow(a, tot);
    var ctx = pick([
      "A rectangular garden bed is \\(" + a + "^{" + m + "}\\) metres long and \\(" + a + "^{" + n + "}\\) metres wide. Its area is the product of the two lengths. The bed is shared equally among \\(" + a + "^{" + p + "}\\) gardeners. How many square metres does each gardener get?",
      "A floor section uses \\(" + a + "^{" + m + "}\\) tiles in each row and has \\(" + a + "^{" + n + "}\\) rows in total. All of the tiles are packed equally into \\(" + a + "^{" + p + "}\\) boxes. How many tiles are in each box?",
      "A print shop makes \\(" + a + "^{" + m + "}\\) cards on each sheet and prints \\(" + a + "^{" + n + "}\\) sheets. The cards are bundled equally into \\(" + a + "^{" + p + "}\\) packs. How many cards are in each pack?"
    ]);
    return numq(ctx, val, 0,
      "Multiply first with the product law, then divide with the quotient law: \\[ \\begin{aligned} " + a + "^{" + m + "}\\times " + a + "^{" + n + "} &= " + a + "^{" + (m + n) + "} \\\\ " + a + "^{" + (m + n) + "}\\div " + a + "^{" + p + "} &= " + a + "^{" + tot + "} \\\\ &= " + fmt(val) + " \\end{aligned} \\] So the answer is <b>" + fmt(val) + "</b>.",
      { mode: "topup-context-prodquot", a: a, m: m, n: n, p: p });
  }
  var a2 = ri(2, 4), m2 = ri(2, 3), p2 = ri(1, 3);
  var tot2 = 2 * m2 + p2, val2 = Math.pow(a2, tot2);
  if (val2 > 90000) { p2 = 1; tot2 = 2 * m2 + p2; val2 = Math.pow(a2, tot2); }
  var ctx2 = pick([
    "Each square planter has sides of \\(" + a2 + "^{" + m2 + "}\\) metres, so the area of one planter is the square of its side. A park has \\(" + a2 + "^{" + p2 + "}\\) identical planters. What is the total area of all the planters, in square metres?",
    "Each square sticker has sides of \\(" + a2 + "^{" + m2 + "}\\) centimetres, so the area of one sticker is the square of its side. A sheet holds \\(" + a2 + "^{" + p2 + "}\\) identical stickers. What is the total area of all the stickers, in square centimetres?",
    "Each square garden plot has sides of \\(" + a2 + "^{" + m2 + "}\\) metres, so the area of one plot is the square of its side. A school has \\(" + a2 + "^{" + p2 + "}\\) identical plots. What is the total area of all the plots, in square metres?"
  ]);
  return numq(ctx2, val2, 0,
    "Square the side with the power of a power law, then multiply with the product law: \\[ \\begin{aligned} (" + a2 + "^{" + m2 + "})^{2} &= " + a2 + "^{" + (2 * m2) + "} \\\\ " + a2 + "^{" + (2 * m2) + "}\\times " + a2 + "^{" + p2 + "} &= " + a2 + "^{" + tot2 + "} \\\\ &= " + fmt(val2) + " \\end{aligned} \\] So the answer is <b>" + fmt(val2) + "</b>.",
    { mode: "topup-context-powprod", a: a2, m: m2, p: p2 });
}, ["Turn the context into powers of one base first, then choose the laws.", "Write the total as a product or quotient of powers before you evaluate anything."]);

E("u3-laws-mixed-eval", 3, ["3.12"], 3, "gen", function () {
  var tuples = [];
  var A, B, N, P, Q, val;
  for (A = 2; A <= 4; A++) for (B = 2; B <= 4; B++) for (N = 2; N <= 3; N++) for (P = 1; P <= N; P++) for (Q = 1; Q <= N; Q++) {
    val = Math.pow(A, N - P) * Math.pow(B, N - Q);
    if (val > 1 && val < 100000) tuples.push({ kind: "prodquot", a: A, b: B, n: N, p: P, q: Q, val: val });
  }
  for (B = 2; B <= 4; B++) for (var C = 2; C <= 4; C++) for (N = 2; N <= 3; N++) for (P = 1; P < N; P++) {
    var big = B * C;
    val = Math.pow(big, N - P);
    if (val > 1 && val < 100000) tuples.push({ kind: "quotprod", big: big, b: B, c: C, n: N, p: P, val: val });
  }
  for (A = 2; A <= 4; A++) for (B = 2; B <= 3; B++) for (P = 2; P <= 3; P++) {
    val = Math.pow(A * B, 4 - P);
    if (val > 1 && val < 100000) tuples.push({ kind: "powpow", a: A, b: B, p: P, val: val });
  }
  var t = pick(tuples);
  if (t.kind === "prodquot") {
    var expr = "\\frac{(" + t.a + "\\times " + t.b + ")^{" + t.n + "}}{" + t.a + "^{" + t.p + "}\\times " + t.b + "^{" + t.q + "}}";
    return numq("Evaluate \\(" + expr + "\\).", t.val, 0,
      "Start with the power of a product, then use the quotient law on each base: \\[ \\begin{aligned} " + expr + " &= \\frac{" + t.a + "^{" + t.n + "}\\times " + t.b + "^{" + t.n + "}}{" + t.a + "^{" + t.p + "}\\times " + t.b + "^{" + t.q + "}} \\\\ &= " + t.a + "^{" + (t.n - t.p) + "}\\times " + t.b + "^{" + (t.n - t.q) + "} \\\\ &= " + fmt(t.val) + " \\end{aligned} \\] So the value is <b>" + fmt(t.val) + "</b>.",
      { mode: "topup-mixed-prodquot", a: t.a, b: t.b, n: t.n, p: t.p, q: t.q });
  }
  if (t.kind === "quotprod") {
    var expr2 = "\\frac{(" + t.big + "\\div " + t.b + ")^{" + t.n + "}\\times " + t.b + "^{" + t.n + "}}{" + t.big + "^{" + t.p + "}}";
    return numq("Evaluate \\(" + expr2 + "\\).", t.val, 0,
      "Start with the power of a quotient, then tidy up with the product and quotient laws: \\[ \\begin{aligned} " + expr2 + " &= \\frac{" + t.big + "^{" + t.n + "}}{" + t.big + "^{" + t.p + "}} \\\\ &= " + t.big + "^{" + (t.n - t.p) + "} \\\\ &= " + fmt(t.val) + " \\end{aligned} \\] So the value is <b>" + fmt(t.val) + "</b>.",
      { mode: "topup-mixed-quotprod", big: t.big, b: t.b, n: t.n, p: t.p });
  }
  var expr3 = "\\frac{((" + t.a + "\\times " + t.b + ")^{2})^{2}}{(" + t.a + "\\times " + t.b + ")^{" + t.p + "}}";
  return numq("Evaluate \\(" + expr3 + "\\).", t.val, 0,
    "Start with the power of a power on the product base, then use the quotient law: \\[ \\begin{aligned} " + expr3 + " &= \\frac{(" + t.a + "\\times " + t.b + ")^{4}}{(" + t.a + "\\times " + t.b + ")^{" + t.p + "}} \\\\ &= (" + t.a + "\\times " + t.b + ")^{" + (4 - t.p) + "} \\\\ &= " + fmt(t.val) + " \\end{aligned} \\] So the value is <b>" + fmt(t.val) + "</b>.",
    { mode: "topup-mixed-powpow", a: t.a, b: t.b, p: t.p });
}, ["Sort the expression into steps: one law at a time, starting inside the brackets.", "Apply the power of a product or power of a quotient law first, then combine what is left."]);

E("u3-error-two-laws", 3, ["3.15"], 3, "gen", function () {
  var fam = pick(["prod", "quot"]);
  var a = ri(2, 6), m = ri(2, 4), n = ri(2, 3), p = ri(2, 4);
  if (m === 2 && n === 2) n = 3;
  var err = ri(1, 2);
  var e1ok = m * n;
  var e1 = (err === 1) ? (m + n) : e1ok;
  var ec, e2, opSym, errNote;
  if (fam === "prod") {
    ec = e1ok + p;
    e2 = (err === 1) ? (e1 + p) : (e1ok * p);
    opSym = "\\times ";
    errNote = (err === 1)
      ? "In Step 1 the exponents were added, but a power of a power multiplies the exponents."
      : "In Step 2 the exponents were multiplied, but the product law adds the exponents.";
  } else {
    if (p >= e1ok) p = e1ok - 1;
    if (err === 1 && p >= e1) p = Math.max(1, e1 - 1);
    ec = e1ok - p;
    e2 = (err === 1) ? (e1 - p) : (e1ok + p);
    opSym = "\\div ";
    errNote = (err === 1)
      ? "In Step 1 the exponents were added, but a power of a power multiplies the exponents."
      : "In Step 2 the exponents were added, but the quotient law subtracts the exponents.";
  }
  var expr = "((" + a + "^{" + m + "})^{" + n + "}" + opSym + a + "^{" + p + "})";
  var prompt = "A student simplifies \\(" + expr + "\\) in two steps. The working contains one error.<br>Step 1: \\((" + a + "^{" + m + "})^{" + n + "} = " + a + "^{" + e1 + "}\\)<br>Step 2: \\(" + a + "^{" + e1 + "}" + opSym + a + "^{" + p + "} = " + a + "^{" + e2 + "}\\)<br>What is the correct simplified result, as a single power?";
  var pool = [
    { v: e2, fb: "That is the result in the shown working, which contains the error." },
    { v: (fam === "prod") ? (e1ok - p) : (e1ok + p), fb: "That uses the wrong law in the second step. Check whether the expression multiplies or divides." },
    { v: m + n + p, fb: "That adds every exponent. A power of a power multiplies its exponents." },
    { v: ec + 1, fb: "That is one too large. Redo both law steps carefully." },
    { v: ec - 1, fb: "That is one too small. Redo both law steps carefully." },
    { v: e1ok, fb: "That stops after the first step. The second law still has to be applied." }
  ];
  var ds = [], seen = {}; seen[String(ec)] = 1;
  for (var i = 0; i < pool.length && ds.length < 3; i++) {
    if (pool[i].v > 0 && !seen[String(pool[i].v)]) { seen[String(pool[i].v)] = 1; ds.push({ t: "\\(" + a + "^{" + pool[i].v + "}\\)", fb: pool[i].fb }); }
  }
  var step2ok = a + "^{" + e1ok + "}" + opSym + a + "^{" + p + "} &= " + a + "^{" + ec + "}";
  return mcq(prompt,
    { t: "\\(" + a + "^{" + ec + "}\\)", fb: "Correct. You redid both law steps and fixed the misapplied law." }, ds,
    errNote + " The correct working is \\[ \\begin{aligned} ((" + a + "^{" + m + "})^{" + n + "}) &= " + a + "^{" + e1ok + "} \\\\ " + step2ok + " \\end{aligned} \\] So the correct simplified result is <b>\\(" + a + "^{" + ec + "}\\)</b>.",
    { mode: "topup-error-" + fam + "-" + err, a: a, m: m, n: n, p: p });
}, ["Redo the simplification yourself, one law at a time, before you look at the choices.", "Start with the power of a power, then apply the second law to your own result."]);

/* ----- bank-u4-topup.js ----- */
// Math 9 Unit 4 top-up tranche (November 7, 2026) question bank
// Cut verbatim from the standalone bank source
// (math-9-review/bank-src.js, lines 2328 to 2521).
/* Top-up tranche (November 7, 2026): Unit 4 additions from tranche1/unit4-topup.js */
function u4tTiles(a,b,c){
  var groups=[];
  if(a!==0)groups.push({n:a,kind:0,w:34,h:34,lab:(a<0?"-":"")+"x²",fs:11});
  if(b!==0)groups.push({n:b,kind:1,w:34,h:12,lab:(b<0?"-":"")+"x",fs:9});
  if(c!==0)groups.push({n:c,kind:2,w:12,h:12,lab:(c<0?"-":"")+"1",fs:8});
  if(!groups.length)groups.push({n:1,kind:2,w:12,h:12,lab:"0",fs:8});
  var pad=10,gapX=4,gapY=8,maxRow=0,totH=0,i,j;
  for(i=0;i<groups.length;i++){var rw=Math.abs(groups[i].n)*groups[i].w+(Math.abs(groups[i].n)-1)*gapX;if(rw>maxRow)maxRow=rw;totH+=groups[i].h;if(i>0)totH+=gapY;}
  var W=maxRow+2*pad;if(W<90)W=90;
  var H=totH+2*pad;
  var s='<svg xmlns="http://www.w3.org/2000/svg" width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Algebra tile model">';
  s+='<rect x="1" y="1" width="'+(W-2)+'" height="'+(H-2)+'" fill="#ffffff" stroke="'+FIG_INK+'" stroke-width="1"/>';
  var y=pad;
  for(i=0;i<groups.length;i++){
    var g=groups[i],x=pad,count=Math.abs(g.n);
    for(j=0;j<count;j++){
      var pos=g.n>0;
      var fill=pos?(g.kind===1?FIG_ACC:FIG_SHADE):"#ffffff";
      var tf=(pos&&g.kind===1)?"#ffffff":FIG_INK;
      s+='<rect x="'+x+'" y="'+y+'" width="'+g.w+'" height="'+g.h+'" fill="'+fill+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
      s+='<text x="'+fmt(x+g.w/2,1)+'" y="'+fmt(y+g.h/2,1)+'" font-size="'+g.fs+'" fill="'+tf+'" text-anchor="middle" dominant-baseline="central">'+g.lab+'</text>';
      x+=g.w+gapX;
    }
    y+=g.h+gapY;
  }
  return s+'</svg>';
}
function u4tArea(m,p,c){
  var monoLab=fmt(m)+"x";
  var part1=p===1?"x":fmt(p)+"x";
  var part2=fmt(c);
  var W=300,H=146,rx=56,ry=34,rw=216,rh=76,sw=128,sx=rx+sw;
  var totalLab="("+part1+(c<0?" - "+fmt(Math.abs(c)):" + "+part2)+")";
  var s='<svg xmlns="http://www.w3.org/2000/svg" width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Rectangle split into two regions for an area model">';
  s+='<rect x="'+rx+'" y="'+ry+'" width="'+sw+'" height="'+rh+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<rect x="'+sx+'" y="'+ry+'" width="'+(rw-sw)+'" height="'+rh+'" fill="#ffffff" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="'+sx+'" y1="'+ry+'" x2="'+sx+'" y2="'+(ry+rh)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<text x="30" y="'+fmt(ry+rh/2,1)+'" font-size="13" fill="'+FIG_INK+'" text-anchor="middle" dominant-baseline="central">'+monoLab+'</text>';
  s+='<text x="'+fmt(rx+sw/2,1)+'" y="'+(ry+16)+'" font-size="13" fill="'+FIG_INK+'" text-anchor="middle" dominant-baseline="central">'+part1+'</text>';
  s+='<text x="'+fmt(sx+(rw-sw)/2,1)+'" y="'+(ry+16)+'" font-size="13" fill="'+FIG_INK+'" text-anchor="middle" dominant-baseline="central">'+part2+'</text>';
  s+='<text x="'+fmt(rx+rw/2,1)+'" y="'+(ry+rh+22)+'" font-size="13" fill="'+FIG_INK+'" text-anchor="middle" dominant-baseline="central">'+totalLab+'</text>';
  return s+'</svg>';
}

E("u4-tiles-figure-expr", 4, ["8.16"], 1, "gen", function(){
  for(var att=0;att<300;att++){
    var a=ri(-3,3),b=ri(-5,5),c=ri(-5,5);
    var nz=(a!==0?1:0)+(b!==0?1:0)+(c!==0?1:0);
    if(nz<2)continue;
    var hasPos=(a>0||b>0||c>0),hasNeg=(a<0||b<0||c<0);
    if(!hasPos||!hasNeg)continue;
    var corr=u4m(a,b,c);
    var aOff=a===0?1:(a>0?a+1:a-1),cOff=c===0?-1:(c>0?c+1:c-1);
    var cands=[
      {t:u4m(a,-b,c),fb:"The x tiles have the opposite sign in the model."},
      {t:u4m(a,b,-c),fb:"The unit tiles have the opposite sign in the model."},
      {t:u4m(-a,b,c),fb:"The x squared tiles have the opposite sign in the model."},
      {t:u4m(b,a,c),fb:"That swaps the x squared count with the x count."},
      {t:u4m(aOff,b,c),fb:"That miscounts the x squared tiles in the model."},
      {t:u4m(a,b,cOff),fb:"That miscounts the unit tiles in the model."}
    ];
    var ds=u4pick3(corr,cands);
    if(ds.length<3)continue;
    var sol="Count each kind of tile in the picture, keeping its sign: \\[ \\begin{aligned} x^{2} \\text{ tiles} &= "+fmt(a)+" \\\\ x \\text{ tiles} &= "+fmt(b)+" \\\\ \\text{unit tiles} &= "+fmt(c)+" \\end{aligned} \\] So the model shows <b>"+corr+"</b>.";
    var q=mcq("In the tile model in the diagram, a large square is an \\(x^{2}\\) tile, a long thin rectangle is an \\(x\\) tile and a small square is a unit tile. Positive tiles are filled and negative tiles are outlined only, with a minus sign on each one. Which expression does the model show?",{t:corr,fb:"Correct: each tile count in the picture becomes the matching term."},ds,sol,{mode:"tiles-fig-expr",a:a,b:b,c:c});
    q.figure=u4tTiles(a,b,c);
    return q;
  }
  var qf=mcq("In the tile model in the diagram, a large square is an \\(x^{2}\\) tile, a long thin rectangle is an \\(x\\) tile and a small square is a unit tile. Positive tiles are filled and negative tiles are outlined only, with a minus sign on each one. Which expression does the model show?",{t:u4m(2,-3,1),fb:"Correct: each tile count in the picture becomes the matching term."},[{t:u4m(2,3,1),fb:"The x tiles have the opposite sign in the model."},{t:u4m(2,-3,-1),fb:"The unit tiles have the opposite sign in the model."},{t:u4m(-3,2,1),fb:"That swaps the x squared count with the x count."}],"Counting the tiles with their signs gives <b>"+u4m(2,-3,1)+"</b>.",{mode:"tiles-fig-expr",a:2,b:-3,c:1});
  qf.figure=u4tTiles(2,-3,1);
  return qf;
}, ["Read the picture tile by tile: count each kind and keep the sign shown on the tiles.", "First count the large squares: that count, with its sign, is the x squared coefficient."]);

E("u4-tiles-figure-build", 4, ["8.15"], 1, "gen", function(){
  function kindName(k){return k===0?"x squared":(k===1?"x":"unit");}
  function kindTex(k){return k===0?"x^{2}":(k===1?"x":"\\text{unit}");}
  function tileWord(n){return n===1?"tile":"tiles";}
  function makeAction(verb,count,sign,k){return verb+" "+fmt(count)+" "+sign+" "+kindName(k)+" "+tileWord(count);}
  for(var att=0;att<300;att++){
    var prime=[ri(-3,3),ri(-5,5),ri(-5,5)];
    var nzP=(prime[0]!==0?1:0)+(prime[1]!==0?1:0)+(prime[2]!==0?1:0);
    if(nzP<2)continue;
    var k=ri(0,2),delta=pick([-2,-1,1,2]);
    var from=prime[k],to=from+delta;
    var lim=k===0?3:5;
    if(Math.abs(to)>lim)continue;
    if(!(from===0||to===0||(from>0)===(to>0)))continue;
    var target=prime.slice();target[k]=to;
    var nzT=(target[0]!==0?1:0)+(target[1]!==0?1:0)+(target[2]!==0?1:0);
    if(nzT<2)continue;
    var verb,sign;
    if(delta>0&&from>=0){verb="Add";sign="positive";}
    else if(delta>0){verb="Remove";sign="negative";}
    else if(to>=0){verb="Remove";sign="positive";}
    else{verb="Add";sign="negative";}
    var count=Math.abs(delta);
    var corr=makeAction(verb,count,sign,k);
    var otherKind=k===0?1:(k===1?2:0);
    var cands=[
      {t:makeAction(verb==="Add"?"Remove":"Add",count,sign,k),fb:"That moves the "+kindName(k)+" count the wrong way; compare the two coefficients."},
      {t:makeAction(verb,count,sign==="positive"?"negative":"positive",k),fb:"That uses tiles of the wrong sign; the needed change keeps the sign shown by the coefficients."},
      {t:makeAction(verb,count+1,sign,k),fb:"That changes the right kind of tile by the wrong amount; the coefficients differ by "+fmt(count)+"."},
      {t:makeAction(verb,count,sign,otherKind),fb:"That changes the "+kindName(otherKind)+" tiles; only the "+kindName(k)+" coefficient changes."}
    ];
    var ds=u4pick3(corr,cands);
    if(ds.length<3)continue;
    var sol="Compare the "+kindName(k)+" coefficients: \\[ \\begin{aligned} "+kindTex(k)+" \\text{ in the model} &= "+fmt(from)+" \\\\ "+kindTex(k)+" \\text{ needed} &= "+fmt(to)+" \\end{aligned} \\] The other coefficients already match, so the change is to <b>"+corr+"</b>.";
    var q=mcq("The diagram shows an algebra tile model of "+u4m(prime[0],prime[1],prime[2])+". What must be done to change this model into a model of "+u4m(target[0],target[1],target[2])+"? In the model, a large square is an \\(x^{2}\\) tile, a long thin rectangle is an \\(x\\) tile and a small square is a unit tile; positive tiles are filled and negative tiles are outlined only, with a minus sign on each one.",{t:corr,fb:"Correct: only that one coefficient changes, by exactly that edit."},ds,sol,{mode:"tiles-fig-build",a:prime[0],b:prime[1],c:prime[2],ta:target[0],tb:target[1],tc:target[2],k:k});
    q.figure=u4tTiles(prime[0],prime[1],prime[2]);
    return q;
  }
  var qf=mcq("The diagram shows an algebra tile model of "+u4m(1,1,2)+". What must be done to change this model into a model of "+u4m(1,3,2)+"? In the model, a large square is an \\(x^{2}\\) tile, a long thin rectangle is an \\(x\\) tile and a small square is a unit tile; positive tiles are filled and negative tiles are outlined only, with a minus sign on each one.",{t:"Add 2 positive x tiles",fb:"Correct: only that one coefficient changes, by exactly that edit."},[{t:"Remove 2 positive x tiles",fb:"That moves the x count the wrong way."},{t:"Add 2 negative x tiles",fb:"That uses tiles of the wrong sign."},{t:"Add 2 positive unit tiles",fb:"That changes the unit tiles; only the x coefficient changes."}],"The x coefficient rises from 1 to 3, so the change is to <b>Add 2 positive x tiles</b>.",{mode:"tiles-fig-build",a:1,b:1,c:2,ta:1,tb:3,tc:2,k:1});
  qf.figure=u4tTiles(1,1,2);
  return qf;
}, ["Compare the model expression with the target expression one coefficient at a time and find the one that differs.", "First compare the x squared coefficients, then the x coefficients, then the constants, until you find the single difference."]);

E("u4-match-equivalent", 4, ["8.4"], 2, "gen", function(){
  for(var att=0;att<300;att++){
    var a=u4nz(-4,4),b=u4nz(-5,5),c=u4nz(-6,6);
    var feas=[];
    if(Math.abs(a)>=2)feas.push(0);
    if(Math.abs(b)>=2)feas.push(1);
    if(Math.abs(c)>=2)feas.push(2);
    if(!feas.length)continue;
    var sk=pick(feas);
    var corrPlain,splitNote;
    if(sk===0){var a1=a>0?1:-1,a2=a-a1;corrPlain=u4expr([[a1,"x^{2}"],[b,"x"],[a2,"x^{2}"],[c,""]]);splitNote=u4expr([[a1,""],[a2,""]])+"="+fmt(a);}
    else if(sk===1){var b1=b>0?1:-1,b2=b-b1;corrPlain=u4expr([[a,"x^{2}"],[b1,"x"],[c,""],[b2,"x"]]);splitNote=u4expr([[b1,""],[b2,""]])+"="+fmt(b);}
    else{var c1=c>0?1:-1,c2=c-c1;corrPlain=u4expr([[a,"x^{2}"],[c1,""],[b,"x"],[c2,""]]);splitNote=u4expr([[c1,""],[c2,""]])+"="+fmt(c);}
    var corr="\\("+corrPlain+"\\)";
    var orders=[[[c,""],[a,"x^{2}"],[b,"x"]],[[b,"x"],[c,""],[a,"x^{2}"]],[[c,""],[b,"x"],[a,"x^{2}"]]];
    var targetPlain=u4expr(pick(orders));
    var aOff=a>0?a+1:a-1;
    var cands=[
      {t:u4m(a,-b,c),fb:"The x coefficient has the wrong sign; equivalent forms keep every coefficient."},
      {t:u4m(aOff,b,c),fb:"The x squared coefficient is off by one; equivalent forms keep every coefficient."},
      {t:u4m(a,b,-c),fb:"The constant has the wrong sign; equivalent forms keep every coefficient."},
      {t:u4m(a+b,0,c),fb:"That folds the x coefficient into the x squared term, but those are unlike terms."}
    ];
    var ds=u4pick3(corr,cands);
    if(ds.length<3)continue;
    var sol="Write the target in the usual order, and combine the split part of the matching form (\\("+splitNote+"\\)): \\[ \\begin{aligned} \\text{target} &= "+u4p(a,b,c)+" \\\\ \\text{matching form} &= "+corrPlain+" \\\\ &= "+u4p(a,b,c)+" \\end{aligned} \\] Both give the same polynomial, so the match is <b>"+corr+"</b>.";
    return mcq("Which expression is equivalent to \\("+targetPlain+"\\)? Equivalent expressions have the same value for every value of \\(x\\).",{t:corr,fb:"Correct: its split terms combine back to exactly the target coefficients."},ds,sol,{mode:"match-equiv",a:a,b:b,c:c,sk:sk});
  }
  return mcq("Which expression is equivalent to \\(5+3x^{2}-2x\\)? Equivalent expressions have the same value for every value of \\(x\\).",{t:"\\(x^{2}+2x^{2}-2x+5\\)",fb:"Correct: its split terms combine back to exactly the target coefficients."},[{t:u4m(3,2,5),fb:"The x coefficient has the wrong sign."},{t:u4m(4,-2,5),fb:"The x squared coefficient is off by one."},{t:u4m(3,-2,-5),fb:"The constant has the wrong sign."}],"Combining the split x squared part, 1 plus 2, gives the target, so the match is <b>\\(x^{2}+2x^{2}-2x+5\\)</b>.",{mode:"match-equiv",a:3,b:-2,c:5,sk:0});
}, ["Compare coefficients kind by kind: equivalent forms have the same x squared coefficient, the same x coefficient and the same constant.", "First rewrite the target with the x squared term first, then check which option combines to those same three numbers."]);

E("u4-mult-monomial-area", 4, ["8.8"], 3, "gen", function(){
  for(var att=0;att<300;att++){
    var m=ri(2,4),p=ri(1,5),c=u4nz(-6,6);
    var mp=m*p,mc=m*c;
    var corr=u4m(mp,mc,0);
    var cands=[
      {t:u4m(mp,0,mc),fb:"That writes the second region product as a constant; multiplying by a monomial with x gives an x term."},
      {t:u4m(mp,m+c,0),fb:"The constant part was added to the monomial coefficient instead of multiplied by the whole monomial."},
      {t:u4m(mp,-mc,0),fb:"The second region product has the wrong sign; check the sign of the constant part."},
      {t:u4m(mp,c,0),fb:"That counts only the first region and leaves the second part unmultiplied by the monomial."}
    ];
    var ds=u4pick3(corr,cands);
    if(ds.length<3)continue;
    var mono=u4expr([[m,"x"]]),other=u4p(0,p,c);
    var sol="Multiply the monomial into each part of the other side and add the two region areas: \\[ \\begin{aligned} A &= ("+mono+")("+other+") \\\\ &= ("+mono+")("+u4expr([[p,"x"]])+") + ("+mono+")("+fmt(c)+") \\\\ &= "+u4p(mp,mc,0)+" \\end{aligned} \\] So the total area is <b>"+corr+"</b>.";
    var q=mcq("The diagram shows a rectangle split into two regions. Its height is \\("+mono+"\\), and the two parts of its top side are \\("+u4expr([[p,"x"]])+"\\) and \\("+fmt(c)+"\\). The area of a rectangle is its height times its width. What is the total area of the rectangle as a simplified polynomial?",{t:corr,fb:"Correct: the monomial multiplies both parts, and the region areas add."},ds,sol,{mode:"area-mono",m:m,p:p,c:c});
    q.figure=u4tArea(m,p,c);
    return q;
  }
  var qf=mcq("The diagram shows a rectangle split into two regions. Its height is \\(3x\\), and the two parts of its top side are \\(2x\\) and \\(5\\). The area of a rectangle is its height times its width. What is the total area of the rectangle as a simplified polynomial?",{t:u4m(6,15,0),fb:"Correct: the monomial multiplies both parts, and the region areas add."},[{t:u4m(6,0,15),fb:"That writes the second region product as a constant."},{t:u4m(6,8,0),fb:"The constant part was added instead of multiplied."},{t:u4m(6,-15,0),fb:"The second region product has the wrong sign."}],"Multiplying into both parts gives <b>"+u4m(6,15,0)+"</b>.",{mode:"area-mono",m:3,p:2,c:5});
  qf.figure=u4tArea(3,2,5);
  return qf;
}, ["Multiply the monomial by each part of the split side, then add the two region areas.", "First find the area of the left region: multiply the height by the first part of the top side."]);

E("u4-divide-missing-term", 4, ["8.9"], 3, "gen", function(){
  for(var att=0;att<300;att++){
    var m=pick([-4,-3,-2,2,3,4]),p=u4nz(-5,5),qq=u4nz(-5,5);
    var B=m*qq,mp=m*p;
    var corrPlain=u4expr([[mp,"x^{3}"]]);
    var corr="\\("+corrPlain+"\\)";
    var cands=[
      {t:"\\("+u4expr([[p,"x^{2}"]])+"\\)",fb:"That is the quotient term itself; it still has to be multiplied by the divisor."},
      {t:"\\("+u4expr([[p,"x^{3}"]])+"\\)",fb:"The power is right, but the coefficient of the divisor was not applied."},
      {t:"\\("+u4expr([[mp,"x^{2}"]])+"\\)",fb:"The coefficient is right, but multiplying by the divisor raises the power by one, to 3."},
      {t:"\\("+u4expr([[mp,"x^{4}"]])+"\\)",fb:"That power is one too high; the divisor has power 1, so the missing term has power 3."}
    ];
    var ds=u4pick3(corr,cands);
    if(ds.length<3)continue;
    var divisor=u4expr([[m,"x"]]),quotient=u4p(p,qq,0);
    var bSigned=(B<0?" - ":" + ")+u4expr([[Math.abs(B),"x^{2}"]]);
    var sol="Work backwards from the quotient term that pairs with the blank, and check with the known term: \\[ \\begin{aligned} \\text{missing term} \\div ("+divisor+") &= "+u4expr([[p,"x^{2}"]])+" \\\\ \\text{missing term} &= "+u4expr([[p,"x^{2}"]])+" \\cdot ("+divisor+") \\\\ &= "+corrPlain+" \\end{aligned} \\] Check: \\(("+u4expr([[B,"x^{2}"]])+") \\div ("+divisor+") = "+u4expr([[qq,"x"]])+"\\), which matches the quotient. So the blank is <b>"+corr+"</b>.";
    return mcq("A division has one term of the dividend missing: \\((\\underline{\\hspace{1.2cm}}"+bSigned+") \\div ("+divisor+") = ("+quotient+")\\). Which monomial fills the blank?",{t:corr,fb:"Correct: multiplying that quotient term by the divisor gives this term."},ds,sol,{mode:"div-missing",m:m,p:p,q:qq});
  }
  return mcq("A division has one term of the dividend missing: \\((\\underline{\\hspace{1.2cm}} + 6x^{2}) \\div (3x) = (2x^{2}+2x)\\). Which monomial fills the blank?",{t:"\\(6x^{3}\\)",fb:"Correct: multiplying that quotient term by the divisor gives this term."},[{t:"\\(2x^{2}\\)",fb:"That is the quotient term itself; it still has to be multiplied by the divisor."},{t:"\\(2x^{3}\\)",fb:"The power is right, but the coefficient of the divisor was not applied."},{t:"\\(6x^{2}\\)",fb:"The coefficient is right, but the power should rise by one, to 3."}],"Multiplying the quotient term by the divisor gives <b>\\(6x^{3}\\)</b>.",{mode:"div-missing",m:3,p:2,q:2});
}, ["Division undoes multiplication: multiply the matching quotient term by the divisor to recover the missing term.", "First match the blank with the first quotient term, since the known term pairs with the second one."]);

/* ----- bank-u5.js ----- */
// Math 9 Unit 5 Linear Equations and Inequalities question bank
// Cut verbatim from the standalone bank source
// (math-9-review/bank-src.js, lines 2522 to 3263); the slice
// opens with the source's final-scope tranche header comment.
// CRMARKS: u5-solve-two-step=3
// CRMARKS: u5-solve-brackets-both=3
// CRMARKS: u5-verify-error=2
// CRMARKS: u5-word-two-step=3
// CRMARKS: u5-word-brackets=2
// CRMARKS: u5-list-satisfies=2
// CRMARKS: u5-solve-ineq-addsub=3
// BIMODAL: u5-verify-error=b
/* Final-scope tranche (Units 5 to 9), November 7, 2026: appended from
   tranche2/unit5.js to unit9.js. CR_MARKS extended to 63 entries. */
// Unit 5: Linear Equations and Inequalities (Math 9, NL). Entries only; helpers prefixed u5.
function u5pick3(c, cands) { var out = [], seen = [c]; for (var i = 0; i < cands.length && out.length < 3; i++) { if (seen.indexOf(cands[i].t) < 0) { seen.push(cands[i].t); out.push(cands[i]); } } return out; }
function u5gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
function u5fracTex(p, q) { if (q < 0) { p = -p; q = -q; } var g = u5gcd(p, q); p /= g; q /= g; if (q === 1) return fmt(p); if (p < 0) return "-" + FR(-p, q); return FR(p, q); }
function u5lin(a, b) { var s; if (a === 1) s = "x"; else if (a === -1) s = "-x"; else s = fmt(a) + "x"; if (b > 0) s += "+" + fmt(b); else if (b < 0) s += "-" + fmt(-b); return s; }
function u5sym(r) { return r === "le" ? "\\le" : r === "ge" ? "\\ge" : r === "lt" ? "<" : ">"; }
function u5flip(r) { return r === "lt" ? "gt" : r === "gt" ? "lt" : r === "le" ? "ge" : "le"; }
function u5holds(v, r, k) { return r === "lt" ? v < k : r === "gt" ? v > k : r === "le" ? v <= k : v >= k; }
function u5ineqTex(v, r, rhs) { return "\\(" + v + " " + u5sym(r) + " " + rhs + "\\)"; }
function u5line(k, closed, dir) {
  var lo = k - 4, W = 320, H = 72, cy = 38;
  function X(v) { return 20 + (v - lo) * 35; }
  var s = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Number line graph">';
  s += '<line x1="8" y1="' + cy + '" x2="312" y2="' + cy + '" stroke="' + FIG_INK + '" stroke-width="1.5"/>';
  s += '<polygon points="312,' + cy + ' 302,' + (cy - 4) + ' 302,' + (cy + 4) + '" fill="' + FIG_INK + '"/>';
  s += '<polygon points="8,' + cy + ' 18,' + (cy - 4) + ' 18,' + (cy + 4) + '" fill="' + FIG_INK + '"/>';
  for (var v = lo; v <= k + 4; v++) { s += '<line x1="' + X(v) + '" y1="' + (cy - 5) + '" x2="' + X(v) + '" y2="' + (cy + 5) + '" stroke="' + FIG_INK + '" stroke-width="1.5"/><text x="' + X(v) + '" y="' + (cy + 22) + '" font-size="12" fill="' + FIG_INK + '" text-anchor="middle">' + fmt(v) + '</text>'; }
  var ex = dir === "right" ? 306 : 14;
  s += '<line x1="' + X(k) + '" y1="' + cy + '" x2="' + ex + '" y2="' + cy + '" stroke="' + FIG_ACC + '" stroke-width="4"/>';
  if (dir === "right") s += '<polygon points="' + ex + ',' + cy + ' ' + (ex - 9) + ',' + (cy - 5) + ' ' + (ex - 9) + ',' + (cy + 5) + '" fill="' + FIG_ACC + '"/>';
  else s += '<polygon points="' + ex + ',' + cy + ' ' + (ex + 9) + ',' + (cy - 5) + ' ' + (ex + 9) + ',' + (cy + 5) + '" fill="' + FIG_ACC + '"/>';
  s += '<circle cx="' + X(k) + '" cy="' + cy + '" r="6" fill="' + (closed ? FIG_INK : "#ffffff") + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  return s + '</svg>';
}
function u5balance(a, b, c) {
  var W = 340, H = 178, panY = 118;
  var s = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Balance model">';
  s += '<line x1="18" y1="34" x2="322" y2="34" stroke="' + FIG_INK + '" stroke-width="3"/>';
  s += '<polygon points="170,34 156,66 184,66" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="1.5"/>';
  s += '<rect x="160" y="66" width="20" height="8" fill="' + FIG_INK + '"/>';
  function pan(cx, nx, nu) {
    var w = nx * 27 + nu * 17, x = cx - w / 2, out = "";
    out += '<line x1="' + cx + '" y1="34" x2="' + (cx - 62) + '" y2="' + panY + '" stroke="' + FIG_INK + '" stroke-width="1.5"/>';
    out += '<line x1="' + cx + '" y1="34" x2="' + (cx + 62) + '" y2="' + panY + '" stroke="' + FIG_INK + '" stroke-width="1.5"/>';
    out += '<line x1="' + (cx - 72) + '" y1="' + panY + '" x2="' + (cx + 72) + '" y2="' + panY + '" stroke="' + FIG_INK + '" stroke-width="3"/>';
    var bx = x;
    for (var i = 0; i < nx; i++) { out += '<rect x="' + fmt(bx, 1) + '" y="' + (panY - 26) + '" width="24" height="26" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="1.5"/><text x="' + fmt(bx + 12, 1) + '" y="' + (panY - 13) + '" font-size="13" fill="' + FIG_INK + '" text-anchor="middle" dominant-baseline="central">x</text>'; bx += 27; }
    for (var j = 0; j < nu; j++) { out += '<rect x="' + fmt(bx, 1) + '" y="' + (panY - 16) + '" width="14" height="16" fill="#ffffff" stroke="' + FIG_INK + '" stroke-width="1.5"/><text x="' + fmt(bx + 7, 1) + '" y="' + (panY - 8) + '" font-size="12" fill="' + FIG_INK + '" text-anchor="middle" dominant-baseline="central">1</text>'; bx += 17; }
    return out;
  }
  s += pan(85, a, b);
  s += pan(255, 0, c);
  s += '<text x="85" y="140" font-size="12" fill="' + FIG_INK + '" text-anchor="middle">left pan</text>';
  s += '<text x="255" y="140" font-size="12" fill="' + FIG_INK + '" text-anchor="middle">right pan</text>';
  s += '<text x="170" y="164" font-size="12" fill="' + FIG_INK + '" text-anchor="middle">The pans balance, so the two sides are equal.</text>';
  return s + '</svg>';
}

// 1. L1, 8.17: balance model shows an equation.
E("u5-balance-model", 5, ["8.17"], 1, "gen", function () {
  var a = ri(1, 3), b = ri(1, 4), c = ri(b + 2, 10);
  function eq(x, y, z) { return "\\(" + u5lin(x, y) + "=" + fmt(z) + "\\)"; }
  var corr = eq(a, b, c);
  var cands = [
    { t: eq(a, c, b), fb: "That swaps the unit blocks: the left pan has " + fmt(b) + " unit blocks and the right pan has " + fmt(c) + "." },
    { t: eq(b, a, c), fb: "That swaps the counts: there are " + fmt(a) + " x blocks and " + fmt(b) + " unit blocks on the left pan." },
    { t: eq(a + 1, b, c), fb: "That counts one x block too many; the left pan shows " + fmt(a) + " x blocks." },
    { t: eq(a, b, c + 1), fb: "That counts one unit block too many on the right pan; it shows " + fmt(c) + "." },
    { t: eq(a, b + 1, c), fb: "That counts one unit block too many on the left pan; it shows " + fmt(b) + "." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Count the blocks on each pan: \\[ \\begin{aligned} \\text{left pan} &= " + fmt(a) + " \\text{ x blocks} + " + fmt(b) + " \\text{ unit blocks} \\\\ \\text{right pan} &= " + fmt(c) + " \\text{ unit blocks} \\end{aligned} \\] The pans balance, so the model shows <b>" + corr + "</b>.";
  var q = mcq("The diagram shows a balance model. Each large block is labelled x and each small block is labelled 1. The pans balance. Which equation does the model show?", { t: corr, fb: "Correct: the left pan gives the x terms and units, and the right pan gives the total." }, ds, sol, { mode: "balance", a: a, b: b, c: c });
  q.figure = u5balance(a, b, c);
  return q;
}, ["Count the blocks on the left pan first: x blocks give the x term, small blocks give the constant.", "The left pan is one side of the equation and the right pan is the other side."]);

// 2. L2, 8.18, CR 3: solve two-step equations, three forms.
E("u5-solve-two-step", 5, ["8.18"], 2, "gen", function () {
  var form = ri(0, 2);
  if (form === 0) {
    var a = ri(2, 9), x0 = ri(-9, 9); if (x0 === 0) x0 = 4;
    var b = ri(-12, 12); if (b === 0) b = 5;
    var c = a * x0 + b;
    var sol = "Undo the constant first, then undo the multiplication: \\[ \\begin{aligned} " + u5lin(a, b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(c - b) + " \\\\ x &= " + fmt(x0) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x0) + "\\)</b>.";
    return numq("Solve the equation \\(" + u5lin(a, b) + " = " + fmt(c) + "\\). What is the value of \\(x\\)?", x0, 0.01, sol, { mode: "ax+b", a: a, b: b, c: c });
  }
  if (form === 1) {
    var a2 = ri(2, 6), k = ri(-6, 6); if (k === 0) k = 3;
    var x1 = a2 * k, b2 = ri(-9, 9); if (b2 === 0) b2 = -4;
    var c2 = k + b2;
    var sol2 = "Undo the constant first, then undo the division: \\[ \\begin{aligned} " + FR("x", a2) + (b2 >= 0 ? "+" + fmt(b2) : "-" + fmt(-b2)) + " &= " + fmt(c2) + " \\\\ " + FR("x", a2) + " &= " + fmt(k) + " \\\\ x &= " + fmt(x1) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x1) + "\\)</b>.";
    return numq("Solve the equation \\(" + FR("x", a2) + (b2 >= 0 ? " + " + fmt(b2) : " - " + fmt(-b2)) + " = " + fmt(c2) + "\\). What is the value of \\(x\\)?", x1, 0.01, sol2, { mode: "x/a+b", a: a2, b: b2, c: c2 });
  }
  var x2 = ri(-8, 8); if (x2 === 0) x2 = 5;
  var a3 = ri(3, 9), c3 = ri(2, a3 - 1), b3 = (a3 - c3) * x2;
  var sol3 = "Collect the x terms on one side first: \\[ \\begin{aligned} " + fmt(a3) + "x &= " + u5lin(c3, b3) + " \\\\ " + fmt(a3 - c3) + "x &= " + fmt(b3) + " \\\\ x &= " + fmt(x2) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x2) + "\\)</b>.";
  return numq("Solve the equation \\(" + fmt(a3) + "x = " + u5lin(c3, b3) + "\\). What is the value of \\(x\\)?", x2, 0.01, sol3, { mode: "ax=cx+b", a: a3, b: b3, c: c3 });
}, ["Undo the operations in reverse order: deal with the constant term before the term attached to x.", "First isolate the x term on one side, using the same operation on both sides."]);

// 3. L3, 8.18, CR 3: brackets and variables on both sides.
E("u5-solve-brackets-both", 5, ["8.18"], 3, "gen", function () {
  for (var att = 0; att < 300; att++) {
    if (Math.random() < 0.5) {
      var a = ri(2, 4), b = ri(2, 5), c = ri(-6, 6), d = ri(2, 4), e = ri(1, 4), f = ri(-6, 6);
      var den = a * b - d * e, num = d * f - a * c;
      if (den === 0 || num % den !== 0) continue;
      var x0 = num / den;
      if (x0 === 0 || Math.abs(x0) > 9) continue;
      var sol = "Expand both brackets, then collect terms: \\[ \\begin{aligned} " + a + "(" + u5lin(b, c) + ") &= " + d + "(" + u5lin(e, f) + ") \\\\ " + u5lin(a * b, a * c) + " &= " + u5lin(d * e, d * f) + " \\\\ " + fmt(den) + "x &= " + fmt(num) + " \\\\ x &= " + fmt(x0) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x0) + "\\)</b>.";
      return numq("Solve the equation \\(" + a + "(" + u5lin(b, c) + ") = " + d + "(" + u5lin(e, f) + ")\\). What is the value of \\(x\\)?", x0, 0.01, sol, { mode: "brackets", a: a, b: b, c: c, d: d, e: e, f: f });
    }
    var a1 = ri(2, 9), c1 = ri(2, 9), b1 = ri(-12, 12), d1 = ri(-12, 12);
    if (a1 === c1) continue;
    var den1 = a1 - c1, num1 = d1 - b1;
    if (num1 % den1 !== 0) continue;
    var x1 = num1 / den1;
    if (x1 === 0 || Math.abs(x1) > 9) continue;
    var sol1 = "Collect the x terms on one side and the constants on the other: \\[ \\begin{aligned} " + u5lin(a1, b1) + " &= " + u5lin(c1, d1) + " \\\\ " + fmt(den1) + "x &= " + fmt(num1) + " \\\\ x &= " + fmt(x1) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x1) + "\\)</b>.";
    return numq("Solve the equation \\(" + u5lin(a1, b1) + " = " + u5lin(c1, d1) + "\\). What is the value of \\(x\\)?", x1, 0.01, sol1, { mode: "both-sides", a: a1, b: b1, c: c1, d: d1 });
  }
  return numq("Solve the equation \\(5x + 3 = 2x + 12\\). What is the value of \\(x\\)?", 3, 0.01, "Collect terms: \\[ \\begin{aligned} 5x+3 &= 2x+12 \\\\ 3x &= 9 \\\\ x &= 3 \\end{aligned} \\] So the solution is <b>\\(x = 3\\)</b>.", { mode: "both-sides", a: 5, b: 3, c: 2, d: 12 });
}, ["Expand any brackets first, then gather all the x terms on one side.", "First expand the brackets so every term is visible, then collect x terms and constants separately."]);

// 4. L1, 8.19: solve by inspection.
E("u5-inspection-basic", 5, ["8.19"], 1, "gen", function () {
  if (Math.random() < 0.5) {
    var a = ri(2, 9), x0 = ri(-9, 9); if (x0 === 0) x0 = 6;
    var b = a * x0;
    var cands = [
      { t: fmt(x0 + a), fb: "That is too big: " + fmt(a) + " times that value is more than " + fmt(b) + "." },
      { t: fmt(x0 - a), fb: "That is too small: " + fmt(a) + " times that value is less than " + fmt(b) + "." },
      { t: fmt(x0 + 1), fb: "Close, but " + fmt(a) + " times that value does not equal " + fmt(b) + "." },
      { t: fmt(-x0), fb: "Watch the sign: " + fmt(a) + " times that value gives the opposite sign." },
      { t: fmt(a), fb: "That is the multiplier itself, not the value that works." }
    ];
    var ds = u5pick3(fmt(x0), cands);
    var sol = "Ask what number multiplied by \\(" + fmt(a) + "\\) gives \\(" + fmt(b) + "\\): \\[ \\begin{aligned} " + fmt(a) + " \\times " + fmt(x0) + " &= " + fmt(b) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x0) + "\\)</b>.";
    return mcq("Solve \\(" + fmt(a) + "x = " + fmt(b) + "\\) by inspection. Inspection means spotting the value that works, without written steps.", { t: fmt(x0), fb: "Correct: " + fmt(a) + " times that value equals " + fmt(b) + "." }, ds, sol, { mode: "ax=b", a: a, b: b });
  }
  var a2 = ri(2, 6), b2 = ri(-8, 8); if (b2 === 0) b2 = 5;
  var x1 = a2 * b2;
  var cands2 = [
    { t: fmt(x1 + a2), fb: "That is too big: dividing it by " + fmt(a2) + " gives more than " + fmt(b2) + "." },
    { t: fmt(x1 - a2), fb: "That is too small: dividing it by " + fmt(a2) + " gives less than " + fmt(b2) + "." },
    { t: fmt(b2), fb: "That is the result of the division, not the starting value." },
    { t: fmt(-x1), fb: "Watch the sign: dividing that value by " + fmt(a2) + " gives the opposite sign." }
  ];
  var ds2 = u5pick3(fmt(x1), cands2);
  var sol2 = "Ask what number divided by \\(" + fmt(a2) + "\\) gives \\(" + fmt(b2) + "\\): \\[ \\begin{aligned} " + fmt(x1) + " \\div " + fmt(a2) + " &= " + fmt(b2) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x1) + "\\)</b>.";
  return mcq("Solve \\(" + FR("x", a2) + " = " + fmt(b2) + "\\) by inspection. Inspection means spotting the value that works, without written steps.", { t: fmt(x1), fb: "Correct: that value divided by " + fmt(a2) + " equals " + fmt(b2) + "." }, ds2, sol2, { mode: "x/a=b", a: a2, b: b2 });
}, ["Think of the multiplication or division fact hiding in the equation.", "First ask: what number, times the coefficient (or divided by it), gives the right side?"]);

// 5. L2, 8.19: systematic trial with tried values shown.
E("u5-trial-table", 5, ["8.19"], 1, "gen", function () {
  var a = ri(2, 6), x0 = ri(3, 9), b = ri(1, 9);
  var c = a * x0 + b, v1 = a * (x0 - 2) + b, v2 = a * (x0 - 1) + b, v3 = a * (x0 + 1) + b;
  var prompt = "Sam is solving \\(" + u5lin(a, b) + " = " + fmt(c) + "\\) by systematic trial, trying one value at a time. Trying \\(x = " + fmt(x0 - 2) + "\\) gives a left side of " + fmt(v1) + ". Trying \\(x = " + fmt(x0 - 1) + "\\) gives a left side of " + fmt(v2) + ". Which value solves the equation?";
  var cands = [
    { t: fmt(x0 - 1), fb: "That value was already tried: it gives " + fmt(v2) + ", not " + fmt(c) + "." },
    { t: fmt(x0 - 2), fb: "That value was already tried: it gives " + fmt(v1) + ", not " + fmt(c) + "." },
    { t: fmt(x0 + 1), fb: "That goes one too far: it gives a left side of " + fmt(v3) + ", past the target." }
  ];
  var sol = "The left side grows by \\(" + fmt(a) + "\\) each time x grows by 1, and it still needs to grow from \\(" + fmt(v2) + "\\) to \\(" + fmt(c) + "\\): \\[ \\begin{aligned} " + u5lin(a, b) + " &= " + fmt(c) + " \\text{ when } x = " + fmt(x0) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x0) + "\\)</b>.";
  return mcq(prompt, { t: fmt(x0), fb: "Correct: substituting it makes the left side equal " + fmt(c) + "." }, cands, sol, { mode: "trial", a: a, b: b, c: c });
}, ["Look at how the left side changes from one tried value to the next.", "First find how far the last tried value is from the target, and how much each step of 1 in x adds."]);

// 6. L1, 8.20: choose the value that is the solution.
E("u5-which-is-solution", 5, ["8.20"], 1, "gen", function () {
  var a = ri(2, 7), x0 = ri(-6, 9), b = ri(-9, 9);
  var c = a * x0 + b;
  function fbFor(v) { return "Substituting \\(x = " + fmt(v) + "\\) gives a left side of " + fmt(a * v + b) + ", which is not " + fmt(c) + "."; }
  var cands = [
    { t: fmt(x0 + 1), fb: fbFor(x0 + 1) },
    { t: fmt(x0 - 1), fb: fbFor(x0 - 1) },
    { t: fmt(x0 + 2), fb: fbFor(x0 + 2) }
  ];
  var sol = "Substitute the value and compare the two sides: \\[ \\begin{aligned} " + u5lin(a, b) + " &= " + fmt(a) + "(" + fmt(x0) + ")" + (b >= 0 ? "+" + fmt(b) : "-" + fmt(-b)) + " \\\\ &= " + fmt(c) + " \\end{aligned} \\] Both sides match, so the solution is <b>\\(x = " + fmt(x0) + "\\)</b>.";
  return mcq("Which value is the solution of \\(" + u5lin(a, b) + " = " + fmt(c) + "\\)?", { t: fmt(x0), fb: "Correct: substituting it makes both sides equal." }, cands, sol, { mode: "which-sol", a: a, b: b, c: c });
}, ["A solution is a value that makes both sides equal when it is substituted.", "First substitute one value and work out the left side, then compare it with the right side."]);

// 7. L2, 8.20, CR 2: a shown check with a wrong verdict or a slip.
E("u5-verify-error", 5, ["8.20"], 2, "gen", function () {
  var a = ri(2, 6), x0 = ri(-5, 8), b = ri(-8, 8);
  var c = a * x0 + b, w = x0 + pick([-2, -1, 1, 2]);
  var trueL = a * w + b;
  if (Math.random() < 0.5) {
    var promptA = "A student checks whether \\(x = " + fmt(w) + "\\) solves \\(" + u5lin(a, b) + " = " + fmt(c) + "\\). The student substitutes and correctly gets a left side of " + fmt(trueL) + ", then writes: this matches, so \\(x = " + fmt(w) + "\\) is the solution. Give the correct conclusion about this check.";
    var corrA = "The arithmetic is correct, but " + fmt(trueL) + " does not equal " + fmt(c) + ", so \\(x = " + fmt(w) + "\\) is not the solution.";
    var dsA = [
      { t: "The check is fully correct, and \\(x = " + fmt(w) + "\\) is the solution of the equation, exactly as written.", fb: "Look again at the two values: the left side and the right side are different numbers." },
      { t: "The substitution has an arithmetic slip, and fixing it shows \\(x = " + fmt(w) + "\\) is the solution.", fb: "The substitution itself was worked out correctly; the mistake is in the conclusion drawn from it." },
      { t: "Any value that is substituted into an equation is automatically a solution of it.", fb: "Substitution is only the test; the value is a solution only when both sides come out equal." }
    ];
    var solA = "Compare the two sides after substitution: \\[ \\begin{aligned} \\text{left side} &= " + fmt(trueL) + " \\\\ \\text{right side} &= " + fmt(c) + " \\end{aligned} \\] The sides are not equal, so the correct conclusion is that <b>" + corrA + "</b>";
    return mcq(promptA, { t: corrA, fb: "Correct: a solution must make the two sides equal, and here they are not." }, dsA, solA, { mode: "wrong-verdict", a: a, b: b, c: c, w: w });
  }
  var fakeL = c;
  var promptB = "A student checks whether \\(x = " + fmt(w) + "\\) solves \\(" + u5lin(a, b) + " = " + fmt(c) + "\\). The student writes the left side as " + fmt(fakeL) + " and concludes that \\(x = " + fmt(w) + "\\) is the solution. Give the correct conclusion about this check.";
  var corrB = "There is an arithmetic slip: the left side is really " + fmt(trueL) + ", not " + fmt(c) + ", so \\(x = " + fmt(w) + "\\) is not the solution.";
  var dsB = [
    { t: "The check is fully correct, and \\(x = " + fmt(w) + "\\) is the solution of the equation, with both sides equal.", fb: "Redo the substitution yourself: the left side does not come out to the value the student wrote." },
    { t: "The arithmetic is correct, but the two sides are still not equal, so it is not the solution here.", fb: "The stated left side is wrong; recomputing the substitution gives a different value." },
    { t: "Any value that is substituted into an equation is automatically a solution of it in every case.", fb: "Substitution is only the test; the value is a solution only when both sides come out equal." }
  ];
  var solB = "Redo the substitution carefully: \\[ \\begin{aligned} " + u5lin(a, b) + " &= " + fmt(a) + "(" + fmt(w) + ")" + (b >= 0 ? "+" + fmt(b) : "-" + fmt(-b)) + " \\\\ &= " + fmt(trueL) + " \\end{aligned} \\] The left side is not " + fmt(c) + ", so the correct conclusion is that <b>" + corrB + "</b>";
  return mcq(promptB, { t: corrB, fb: "Correct: recomputing the substitution exposes the slip and the true left side." }, dsB, solB, { mode: "slip", a: a, b: b, c: c, w: w });
}, ["Redo the substitution yourself before judging the student's conclusion.", "First work out the left side with the given value, then compare it with the right side."]);

// 8. L2, 8.21, var: what a solution means in context.
E("u5-meaning-of-solution", 5, ["8.21"], 1, "var", varset([
  function () {
    var sol = "Solve first, then read the answer back into the story: \\[ \\begin{aligned} 8n+5 &= 53 \\\\ 8n &= 48 \\\\ n &= 6 \\end{aligned} \\] Here n counts tickets, so the solution means <b>you can buy 6 tickets for a total of $53</b>.";
    return mcq("Concert tickets cost $8 each, plus a $5 booking fee paid once. The equation \\(8n + 5 = 53\\) models the total cost, and its solution is \\(n = 6\\). What does the solution mean in this situation?", { t: "You can buy 6 tickets for a total of $53.", fb: "Correct: n counts tickets, and 6 makes the total come to $53." }, [
      { t: "Each ticket costs $6 in the end today.", fb: "The 6 counts tickets; the price of one ticket stays $8." },
      { t: "The booking fee works out to $6 in total.", fb: "The booking fee is the fixed $5; the 6 is the value of n, the number of tickets." },
      { t: "Six friends each pay a $53 fee in all.", fb: "The $53 is the single total cost, not a fee paid by each person." }
    ], sol, { mode: "meaning-tickets" });
  },
  function () {
    var sol = "Solve first, then read the answer back into the story: \\[ \\begin{aligned} 3+2h &= 15 \\\\ 2h &= 12 \\\\ h &= 6 \\end{aligned} \\] Here h counts hours, so the solution means <b>after 6 hours, the temperature reaches 15 degrees</b>.";
    return mcq("A cold morning starts at 3 degrees and the temperature rises 2 degrees each hour. The equation \\(3 + 2h = 15\\) models the temperature, and its solution is \\(h = 6\\). What does the solution mean in this situation?", { t: "After 6 hours, the temperature reaches 15 degrees.", fb: "Correct: h counts hours, and 6 makes the temperature come to 15 degrees." }, [
      { t: "The temperature rises 6 degrees each hour all day.", fb: "The rise each hour is the fixed 2 degrees; the 6 is the value of h, the hours." },
      { t: "The temperature starts at 6 degrees early in the morning.", fb: "The starting temperature is the fixed 3 degrees; the 6 counts hours." },
      { t: "It takes 15 hours to reach a temperature of 6 degrees.", fb: "That swaps the two numbers: 15 is the target temperature and 6 is the hours." }
    ], sol, { mode: "meaning-temp" });
  },
  function () {
    var sol = "Solve first, then read the answer back into the story: \\[ \\begin{aligned} 20+7w &= 62 \\\\ 7w &= 42 \\\\ w &= 6 \\end{aligned} \\] Here w counts weeks, so the solution means <b>after 6 weeks of saving, Mia has $62</b>.";
    return mcq("Mia has $20 saved and adds $7 each week. The equation \\(20 + 7w = 62\\) models her savings, and its solution is \\(w = 6\\). What does the solution mean in this situation?", { t: "After 6 weeks of saving, Mia has $62.", fb: "Correct: w counts weeks, and 6 makes her savings come to $62." }, [
      { t: "Mia saves $6 each week at her job.", fb: "She saves the fixed $7 each week; the 6 is the value of w, the weeks." },
      { t: "Mia started with $6 saved in a jar.", fb: "She started with the fixed $20; the 6 counts weeks of saving." },
      { t: "Mia will have $6 saved after 62 weeks.", fb: "That swaps the two numbers: 62 dollars is the goal and 6 is the weeks." }
    ], sol, { mode: "meaning-savings" });
  },
  function () {
    var sol = "Solve first, then read the answer back into the story: \\[ \\begin{aligned} 2w+18 &= 34 \\\\ 2w &= 16 \\\\ w &= 8 \\end{aligned} \\] Here w is the width in centimetres, so the solution means <b>the width of the rectangle is 8 cm</b>.";
    return mcq("A rectangle has length 9 cm and width w cm. Its perimeter is 34 cm, modelled by \\(2w + 18 = 34\\), and the solution is \\(w = 8\\). What does the solution mean in this situation?", { t: "The width of the rectangle is 8 cm.", fb: "Correct: w measures the width, and 8 cm makes the perimeter come to 34 cm." }, [
      { t: "The perimeter of the rectangle is 8 cm.", fb: "The perimeter is the given 34 cm; the 8 is the value of w, the width." },
      { t: "The length of the rectangle is 8 cm.", fb: "The length is the given 9 cm; w stands for the width only." },
      { t: "The area of the rectangle is 8 square cm.", fb: "The equation models perimeter, not area; the 8 is a length, the width." }
    ], sol, { mode: "meaning-perimeter" });
  },
  function () {
    var sol = "Solve first, then read the answer back into the story: \\[ \\begin{aligned} 3s+4 &= 40 \\\\ 3s &= 36 \\\\ s &= 12 \\end{aligned} \\] Here s counts students in one van, so the solution means <b>each van carries 12 students</b>.";
    return mcq("Three vans each carry s students, and 4 more students ride in a car. The equation \\(3s + 4 = 40\\) models the 40 students on a field trip, and its solution is \\(s = 12\\). What does the solution mean in this situation?", { t: "Each van carries 12 students.", fb: "Correct: s counts students per van, and 12 makes the total come to 40." }, [
      { t: "There are 12 vans on the trip.", fb: "There are only 3 vans; the 12 is the value of s, the students in each van." },
      { t: "A total of 12 students went on the trip.", fb: "The total is the given 40 students; the 12 counts students in one van." },
      { t: "The car carries 12 students.", fb: "The car carries the fixed 4 students; the 12 belongs to each van." }
    ], sol, { mode: "meaning-vans" });
  },
  function () {
    var sol = "Solve first, then read the answer back into the story: \\[ \\begin{aligned} 25+0.5g &= 31 \\\\ 0.5g &= 6 \\\\ g &= 12 \\end{aligned} \\] Here g counts gigabytes of data, so the solution means <b>the customer used 12 GB of data that month</b>.";
    return mcq("A phone plan costs $25 a month plus $0.50 for each gigabyte (GB) of data used. The equation \\(25 + 0.5g = 31\\) models one bill, and its solution is \\(g = 12\\). What does the solution mean in this situation?", { t: "The customer used 12 GB of data that month.", fb: "Correct: g counts gigabytes, and 12 makes the bill come to $31." }, [
      { t: "The monthly base cost is $12 on the plan.", fb: "The base cost is the fixed $25; the 12 is the value of g, the gigabytes." },
      { t: "Data costs $12 for each gigabyte of data.", fb: "Data costs the fixed $0.50 per gigabyte; the 12 counts gigabytes used." },
      { t: "The bill covers 12 months of service in a year.", fb: "The equation models a single month; the 12 counts gigabytes, not months." }
    ], sol, { mode: "meaning-phone" });
  }
]), ["Solve or use the given solution, then ask what the variable counts in the story.", "First name what the variable stands for in the story; the solution is that many of those."]);

// 9. L2, 8.22, CR 3: word problem, two-step equation.
E("u5-word-two-step", 5, ["8.22"], 2, "gen", function () {
  var form = ri(0, 2);
  if (form === 0) {
    var a = ri(3, 9), n = ri(3, 14), b = ri(2, 12), c = a * n + b;
    var sol = "Let n be the number of tickets. The cost gives the equation and its solution: \\[ \\begin{aligned} " + fmt(a) + "n+" + fmt(b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "n &= " + fmt(c - b) + " \\\\ n &= " + fmt(n) + " \\end{aligned} \\] So the group bought <b>" + fmt(n) + " tickets</b>.";
    return numq("A group buys tickets that cost $" + fmt(a) + " each, plus a $" + fmt(b) + " booking fee paid once. The total cost is $" + fmt(c) + ". How many tickets did the group buy?", n, 0.01, sol, { mode: "word-tickets", a: a, b: b, c: c });
  }
  if (form === 1) {
    var L = ri(4, 15), w = ri(3, 14), P = 2 * w + 2 * L;
    var sol2 = "Let w be the width. The perimeter gives the equation and its solution: \\[ \\begin{aligned} 2w+" + fmt(2 * L) + " &= " + fmt(P) + " \\\\ 2w &= " + fmt(P - 2 * L) + " \\\\ w &= " + fmt(w) + " \\end{aligned} \\] So the width is <b>" + fmt(w) + " cm</b>.";
    return numq("A rectangle has length " + fmt(L) + " cm and perimeter " + fmt(P) + " cm. What is its width, in centimetres?", w, 0.01, sol2, { mode: "word-perimeter", a: L, b: P });
  }
  var a3 = ri(2, 8), n3 = ri(4, 16), b3 = ri(3, 15), c3 = a3 * n3 + b3;
  var sol3 = "Let n be the number of notebooks. The cost gives the equation and its solution: \\[ \\begin{aligned} " + fmt(a3) + "n+" + fmt(b3) + " &= " + fmt(c3) + " \\\\ " + fmt(a3) + "n &= " + fmt(c3 - b3) + " \\\\ n &= " + fmt(n3) + " \\end{aligned} \\] So Sara bought <b>" + fmt(n3) + " notebooks</b>.";
  return numq("Sara buys notebooks that cost $" + fmt(a3) + " each, plus one pen for $" + fmt(b3) + ". She spends $" + fmt(c3) + " in total. How many notebooks did she buy?", n3, 0.01, sol3, { mode: "word-notebooks", a: a3, b: b3, c: c3 });
}, ["Write an equation for the story first: a rate times the unknown, plus a fixed amount, equals the total.", "First decide what the variable counts, then build the equation from the story."]);

// 10. L3, 8.22, CR 2: word problem, brackets or both sides.
E("u5-word-brackets", 5, ["8.22"], 3, "gen", function () {
  if (Math.random() < 0.5) {
    var x0 = ri(3, 12), a = ri(3, 8), c = ri(1, a - 1), b = ri(5, 30), d = b + (a - c) * x0;
    var sol = "Let g be the gigabytes used. Setting the two plan costs equal gives: \\[ \\begin{aligned} " + fmt(a) + "g+" + fmt(b) + " &= " + fmt(c) + "g+" + fmt(d) + " \\\\ " + fmt(a - c) + "g &= " + fmt(d - b) + " \\\\ g &= " + fmt(x0) + " \\end{aligned} \\] So the plans cost the same at <b>" + fmt(x0) + " GB</b>.";
    return numq("Plan A costs $" + fmt(b) + " a month plus $" + fmt(a) + " for each gigabyte (GB) of data. Plan B costs $" + fmt(d) + " a month plus $" + fmt(c) + " for each GB. For how many GB do the two plans cost the same, in dollars?", x0, 0.01, sol, { mode: "word-plans", a: a, b: b, c: c, d: d });
  }
  var a2 = ri(2, 6), c2 = ri(2, 9), x1 = ri(3, 15), T = a2 * (x1 + c2);
  var sol2 = "Let s be the seats in the short part of each row. The total gives the equation and its solution: \\[ \\begin{aligned} " + fmt(a2) + "(s+" + fmt(c2) + ") &= " + fmt(T) + " \\\\ s+" + fmt(c2) + " &= " + fmt(T / a2) + " \\\\ s &= " + fmt(x1) + " \\end{aligned} \\] So the short part of each row has <b>" + fmt(x1) + " seats</b>.";
  return numq("A theatre has " + fmt(a2) + " identical rows. Each row has a short part with s seats and a long part with " + fmt(c2) + " more seats than the short part, so each row has s + " + fmt(c2) + " seats in all. The theatre has " + fmt(T) + " seats in total. How many seats are in the short part of each row?", x1, 0.01, sol2, { mode: "word-rows", a: a2, b: c2, c: T });
}, ["Set up the equation the story describes, brackets or both sides included, before solving.", "First write the cost or total for each side of the story as an expression in the unknown."]);

// 11. L1, 8.1: translate a word statement into an inequality.
E("u5-translate-inequality", 5, ["8.1"], 1, "gen", function () {
  var cases = [
    { phrase: "at least", r: "ge", why: "At least means that amount or more, so the sign is greater than or equal to." },
    { phrase: "at most", r: "le", why: "At most means that amount or less, so the sign is less than or equal to." },
    { phrase: "more than", r: "gt", why: "More than means strictly bigger, and the amount itself does not count." },
    { phrase: "fewer than", r: "lt", why: "Fewer than means strictly smaller, and the amount itself does not count." },
    { phrase: "no more than", r: "le", why: "No more than means that amount or less, so the sign is less than or equal to." }
  ];
  var ctxs = [
    { v: "n", what: "A number n", tail: "" },
    { v: "a", what: "Your age a, in years", tail: "" },
    { v: "s", what: "The amount spent, s dollars", tail: "" },
    { v: "h", what: "The height h, in centimetres", tail: "" }
  ];
  var cs = pick(cases), cx = pick(ctxs), k = pick([3, 5, 8, 10, 12, 16, 18, 21, 25, 30, 40, 50, 65, 100]);
  var corr = u5ineqTex(cx.v, cs.r, fmt(k));
  var others = ["lt", "gt", "le", "ge"].filter(function (r) { return r !== cs.r; });
  var ds = others.map(function (r) { return { t: u5ineqTex(cx.v, r, fmt(k)), fb: "That sign does not match the phrase " + cs.phrase + "; check whether the amount itself is allowed." }; });
  var sol = cs.why + " So the statement translates to <b>" + corr + "</b>.";
  return mcq(cx.what + " is " + cs.phrase + " " + fmt(k) + ". Which inequality shows this?", { t: corr, fb: "Correct. " + cs.why }, ds, sol, { mode: "translate", r: cs.r, k: k, v: cx.v });
}, ["Decide first whether the boundary amount itself is allowed; that picks a strict or an or-equal-to sign.", "First match the phrase: at least and at most include the amount, more than and fewer than leave it out."]);

// 12. L1, 8.2: which rational number can be a solution.
E("u5-possible-solution", 5, ["8.2"], 1, "gen", function () {
  function disp(v) { if (Math.abs(v * 2 - Math.round(v * 2)) < 1e-9 && Math.abs(v - Math.round(v)) > 1e-9) return "\\(" + FR(Math.round(2 * v), 2) + "\\)"; return fmt(v); }
  for (var att = 0; att < 200; att++) {
    var k = ri(-4, 9), r = pick(["lt", "gt", "le", "ge"]);
    var pool = [k - 2, k - 1.5, k - 1, k - 0.5, k, k + 0.5, k + 1, k + 1.5, k + 2];
    var sat = pool.filter(function (v) { return u5holds(v, r, k); });
    var not = pool.filter(function (v) { return !u5holds(v, r, k); });
    if (sat.length < 1 || not.length < 3) continue;
    var cv = pick(sat), bad = shuffle(not).slice(0, 3);
    var corr = disp(cv);
    var ds = bad.map(function (v) { return { t: disp(v), fb: "That value does not satisfy the inequality; substituting it makes the statement false." }; });
    if (u5pick3(corr, ds).length < 3) continue;
    var sol = "Test the value in the inequality: \\[ \\begin{aligned} " + fmt(cv) + " &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(k) + " \\end{aligned} \\] The statement is true for that value, so a possible solution is <b>" + corr + "</b>.";
    return mcq("Which number is a possible solution of \\(" + "x " + u5sym(r) + " " + fmt(k) + "\\)? A possible solution is a value that makes the inequality true.", { t: corr, fb: "Correct: substituting it makes the inequality a true statement." }, ds, sol, { mode: "possible", r: r, k: k, v: cv });
  }
  return mcq("Which number is a possible solution of \\(x \\le 3\\)? A possible solution is a value that makes the inequality true.", { t: fmt(2), fb: "Correct: substituting it makes the inequality a true statement." }, [{ t: fmt(4), fb: "That value does not satisfy the inequality." }, { t: fmt(5), fb: "That value does not satisfy the inequality." }, { t: fmt(7), fb: "That value does not satisfy the inequality." }], "Testing gives \\(2 \\le 3\\), which is true, so a possible solution is <b>2</b>.", { mode: "possible", r: "le", k: 3, v: 2 });
}, ["Substitute each choice into the inequality and keep the one that makes a true statement.", "First check the boundary value itself, then check values on each side of it."]);

// 13. L2, 8.3, CR 2: which list all satisfy an inequality.
E("u5-list-satisfies", 5, ["8.3"], 1, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var k = ri(-3, 8), r = pick(["lt", "gt", "le", "ge"]);
    var sat = [], not = [];
    for (var v = k - 6; v <= k + 6; v++) { (u5holds(v, r, k) ? sat : not).push(v); }
    if (sat.length < 3 || not.length < 3) continue;
    var good = shuffle(sat).slice(0, 3).sort(function (x, y) { return x - y; });
    var bads = shuffle(not).slice(0, 3);
    var base = shuffle(sat).slice(0, 2);
    function listStr(arr) { return arr.slice().sort(function (x, y) { return x - y; }).map(fmt).join(", "); }
    var corr = listStr(good);
    var mk = function (badV, pos) { var arr = base.slice(); arr.splice(pos, 0, badV); return listStr(arr); };
    var cands = [
      { t: mk(bads[0], 0), fb: "The value " + fmt(bads[0]) + " in that list does not satisfy the inequality." },
      { t: mk(bads[1], 1), fb: "The value " + fmt(bads[1]) + " in that list does not satisfy the inequality." },
      { t: mk(bads[2], 2), fb: "The value " + fmt(bads[2]) + " in that list does not satisfy the inequality." }
    ];
    var ds = u5pick3(corr, cands);
    if (ds.length < 3) continue;
    var sol = "Check every value in the list by substitution. For the correct list: \\[ \\begin{aligned} " + good.map(function (g) { return fmt(g) + " &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(k); }).join(" \\\\ ") + " \\end{aligned} \\] Every statement is true, so the list where all values satisfy the inequality is <b>" + corr + "</b>.";
    return mcq("Which list has values that ALL satisfy \\(" + "x " + u5sym(r) + " " + fmt(k) + "\\)?", { t: corr, fb: "Correct: every value in that list makes the inequality true." }, ds, sol, { mode: "list-all", r: r, k: k });
  }
  return mcq("Which list has values that ALL satisfy \\(x < 2\\)?", { t: "-1, 0, 1", fb: "Correct: every value in that list makes the inequality true." }, [{ t: "0, 1, 2", fb: "The value 2 in that list does not satisfy the inequality." }, { t: "-2, -1, 3", fb: "The value 3 in that list does not satisfy the inequality." }, { t: "1, 2, 3", fb: "The values 2 and 3 in that list do not satisfy the inequality." }], "Each of -1, 0 and 1 is less than 2, so the list is <b>-1, 0, 1</b>.", { mode: "list-all", r: "lt", k: 2 });
}, ["Test every value in a list; one failing value rules the whole list out.", "First test the boundary value in each list, since it is the one most likely to fail."]);

// 14. L2, 8.24: number line graph to inequality.
E("u5-graph-to-ineq", 5, ["8.24"], 1, "gen", function () {
  var k = ri(-8, 8), r = pick(["lt", "gt", "le", "ge"]);
  var closed = (r === "le" || r === "ge"), dir = (r === "gt" || r === "ge") ? "right" : "left";
  var corr = u5ineqTex("x", r, fmt(k));
  var others = ["lt", "gt", "le", "ge"].filter(function (s) { return s !== r; });
  var fbMap = { lt: "That uses a strict sign the wrong way for this graph; check the circle and the shading direction.", gt: "That points the shading the wrong way or uses the wrong circle for this graph.", le: "That does not match both the circle type and the shading direction in the graph.", ge: "That does not match both the circle type and the shading direction in the graph." };
  var ds = others.map(function (s) { return { t: u5ineqTex("x", s, fmt(k)), fb: fbMap[s] }; });
  var sol = "The circle sits at \\(" + fmt(k) + "\\), it is " + (closed ? "closed, so the endpoint is included and the sign has an equals part" : "open, so the endpoint is not included and the sign is strict") + ", and the shading goes to the " + dir + ". So the graph represents <b>" + corr + "</b>.";
  var q = mcq("The number line in the diagram graphs an inequality. Which inequality does the graph represent?", { t: corr, fb: "Correct: the circle type, its position and the shading direction all match." }, ds, sol, { mode: "graph-to-ineq", r: r, k: k });
  q.figure = u5line(k, closed, dir);
  return q;
}, ["Read the graph in three parts: where the circle sits, whether it is open or closed, and which way the shading goes.", "First find the number under the circle; that is the boundary value in every choice."]);

// 15. L2, 8.24: boundary value of a described graph.
E("u5-graph-boundary", 5, ["8.24"], 1, "gen", function () {
  var k = ri(-9, 9), r = pick(["lt", "gt", "le", "ge"]);
  var closed = (r === "le" || r === "ge"), dir = (r === "gt" || r === "ge") ? "right" : "left";
  var sol = "The circle always sits on the boundary value of the inequality, the number the variable is compared with: \\[ \\begin{aligned} x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(k) + " \\end{aligned} \\] So the circle sits on <b>" + fmt(k) + "</b>.";
  return numq("The inequality \\(" + "x " + u5sym(r) + " " + fmt(k) + "\\) is graphed on a number line. The graph has a" + (closed ? " closed" : "n open") + " circle and the shading goes to the " + dir + ". On what number does the circle sit?", k, 0.01, sol, { mode: "boundary", r: r, k: k });
}, ["The circle sits on the number the variable is compared with in the inequality.", "First find the constant on the other side of the inequality sign from x."]);

// 16. L2, 8.25, CR 3: solve an inequality with addition or subtraction.
E("u5-solve-ineq-addsub", 5, ["8.25"], 1, "gen", function () {
  var r = pick(["lt", "gt", "le", "ge"]), sym = u5sym(r);
  if (Math.random() < 0.5) {
    var b = ri(2, 12), k = ri(-8, 10), c = k + b;
    var sol = "Undo the addition by subtracting the same amount from both sides; adding or subtracting never changes the sign direction: \\[ \\begin{aligned} x+" + fmt(b) + " &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(c) + " \\\\ x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(k) + " \\end{aligned} \\] So the boundary value is <b>" + fmt(k) + "</b>.";
    return numq("Solve the inequality \\(x + " + fmt(b) + " " + sym + " " + fmt(c) + "\\). The solution has the form \\(x " + sym + " k\\). What is \\(k\\)?", k, 0.01, sol, { mode: "x+b", b: b, c: c, r: r });
  }
  var b2 = ri(2, 12), k2 = ri(-8, 10), c2 = k2 - b2;
  var sol2 = "Undo the subtraction by adding the same amount to both sides; adding or subtracting never changes the sign direction: \\[ \\begin{aligned} x-" + fmt(b2) + " &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(c2) + " \\\\ x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(k2) + " \\end{aligned} \\] So the boundary value is <b>" + fmt(k2) + "</b>.";
  return numq("Solve the inequality \\(x - " + fmt(b2) + " " + sym + " " + fmt(c2) + "\\). The solution has the form \\(x " + sym + " k\\). What is \\(k\\)?", k2, 0.01, sol2, { mode: "x-b", b: b2, c: c2, r: r });
}, ["Use the inverse operation on both sides, just as you would for an equation.", "First decide what was done to x, then undo it on both sides of the sign."]);

// 17. L2, 8.26: solve an inequality, positive division.
E("u5-solve-ineq-pos-div", 5, ["8.26"], 2, "gen", function () {
  var a = ri(2, 8), k = ri(-6, 9), b = ri(-11, 11); if (b === 0) b = 4;
  var c = a * k + b, r = pick(["lt", "gt", "le", "ge"]), fr = u5flip(r);
  var alt = u5fracTex(c + b, a);
  var corr = u5ineqTex("x", r, fmt(k));
  var ds = [
    { t: u5ineqTex("x", fr, fmt(k)), fb: "The boundary is right, but dividing by a positive number keeps the sign direction; it does not flip." },
    { t: u5ineqTex("x", r, alt), fb: "That boundary comes from moving the constant the wrong way before dividing." },
    { t: u5ineqTex("x", fr, alt), fb: "That has both slips: the constant was moved the wrong way and the sign was flipped needlessly." }
  ];
  var sol = "Isolate x step by step; the divisor is positive, so the sign stays as it is: \\[ \\begin{aligned} " + u5lin(a, b) + " &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(c) + " \\\\ " + fmt(a) + "x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(c - b) + " \\\\ x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(k) + " \\end{aligned} \\] So the solution is <b>" + corr + "</b>.";
  return mcq("Solve the inequality \\(" + u5lin(a, b) + " " + u5sym(r) + " " + fmt(c) + "\\). Which inequality is the solution?", { t: corr, fb: "Correct: the constant was undone, then both sides were divided by the positive coefficient." }, ds, sol, { mode: "pos-div", a: a, b: b, c: c, r: r });
}, ["Solve it like the matching equation, and remember dividing by a positive number never flips the sign.", "First undo the constant term, then divide both sides by the coefficient of x."]);

// 18. L3, 8.26: negative coefficient, sign must flip.
E("u5-solve-ineq-neg-flip", 5, ["8.26"], 3, "gen", function () {
  var a = ri(2, 6), k = ri(-6, 6); if (k === 0) k = 3;
  var b = ri(-9, 9); if (b === 0) b = 5;
  var c = -a * k + b, r = pick(["lt", "gt", "le", "ge"]), fr = u5flip(r);
  var alt = u5fracTex(-c, a);
  var corr = u5ineqTex("x", fr, fmt(k));
  var ds = [
    { t: u5ineqTex("x", r, fmt(k)), fb: "That keeps the original direction, but dividing both sides by a negative number reverses the sign." },
    { t: u5ineqTex("x", fr, alt), fb: "That boundary comes from dividing before the constant term was moved off the left side." },
    { t: u5ineqTex("x", r, alt), fb: "That has both slips: the constant was handled wrongly and the sign was not reversed for the negative divisor." }
  ];
  var sol = "Isolate x, and reverse the sign when dividing by the negative coefficient: \\[ \\begin{aligned} " + u5lin(-a, b) + " &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(c) + " \\\\ " + fmt(-a) + "x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(c - b) + " \\\\ x &" + (fr === "lt" || fr === "le" ? "<" : ">") + " " + fmt(k) + " \\end{aligned} \\] So the solution is <b>" + corr + "</b>.";
  return mcq("Solve the inequality \\(" + u5lin(-a, b) + " " + u5sym(r) + " " + fmt(c) + "\\). Which inequality is the solution?", { t: corr, fb: "Correct: the boundary is right and the sign was reversed for the negative divisor." }, ds, sol, { mode: "neg-flip", a: a, b: b, c: c, r: r });
}, ["Watch the step where you divide by the coefficient: a negative divisor reverses the inequality sign.", "First move the constant term, then note the sign of the coefficient before you divide."]);

// 19. L3, 8.27: multi-step inequality with a negative coefficient, boundary value.
E("u5-solve-ineq-multistep-neg", 5, ["8.27"], 3, "gen", function () {
  var r = pick(["lt", "gt", "le", "ge"]), fr = u5flip(r);
  var fsym = (fr === "lt" || fr === "le") ? "<" : ">";
  if (Math.random() < 0.5) {
    var a = ri(2, 6), k = ri(-6, 7), b = ri(-10, 15), c = b - a * k;
    var sol = "Treat the term as a negative coefficient and reverse the sign at the division step: \\[ \\begin{aligned} " + fmt(b) + "-" + fmt(a) + "x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(c) + " \\\\ " + fmt(-a) + "x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(c - b) + " \\\\ x &" + fsym + " " + fmt(k) + " \\end{aligned} \\] So the boundary value is <b>" + fmt(k) + "</b>.";
    return numq("Solve the inequality \\(" + fmt(b) + " - " + fmt(a) + "x " + u5sym(r) + " " + fmt(c) + "\\). The solution has the form \\(x " + u5sym(fr) + " k\\). What is \\(k\\)?", k, 0.01, sol, { mode: "b-ax", a: a, b: b, c: c, r: r });
  }
  var a2 = ri(2, 5), c0 = ri(2, 8), k2 = ri(-5, 7), d = a2 * (c0 - k2);
  var sol2 = "Expand the bracket first, then reverse the sign when dividing by the negative coefficient: \\[ \\begin{aligned} " + fmt(a2) + "(" + fmt(c0) + "-x) &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(d) + " \\\\ " + fmt(a2 * c0) + "-" + fmt(a2) + "x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(d) + " \\\\ " + fmt(-a2) + "x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(d - a2 * c0) + " \\\\ x &" + fsym + " " + fmt(k2) + " \\end{aligned} \\] So the boundary value is <b>" + fmt(k2) + "</b>.";
  return numq("Solve the inequality \\(" + fmt(a2) + "(" + fmt(c0) + " - x) " + u5sym(r) + " " + fmt(d) + "\\). The solution has the form \\(x " + u5sym(fr) + " k\\). What is \\(k\\)?", k2, 0.01, sol2, { mode: "a(c-x)", a: a2, b: c0, c: d, r: r });
}, ["Expand brackets and collect the x term first; the sign flip happens at the final division by a negative.", "First expand or simplify the left side until the x term stands with a negative coefficient."]);

// 20. L2, 8.27: choose the fully correct two-step solution.
E("u5-solve-ineq-two-step-choose", 5, ["8.27"], 2, "gen", function () {
  var a = ri(2, 8), k = ri(-6, 9), b = ri(2, 11), c = a * k - b, r = pick(["lt", "gt", "le", "ge"]), fr = u5flip(r);
  var alt = u5fracTex(c - b, a);
  var corr = u5ineqTex("x", r, fmt(k));
  var ds = [
    { t: u5ineqTex("x", fr, fmt(k)), fb: "The boundary is right, but nothing here flips the sign: the coefficient of x is positive." },
    { t: u5ineqTex("x", r, alt), fb: "That boundary comes from subtracting the constant again instead of adding it back." },
    { t: u5ineqTex("x", fr, alt), fb: "That has both slips: the constant was handled the wrong way and the sign was flipped needlessly." }
  ];
  var sol = "Undo the subtraction by adding to both sides, then divide by the positive coefficient: \\[ \\begin{aligned} " + fmt(a) + "x-" + fmt(b) + " &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(c) + " \\\\ " + fmt(a) + "x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(c + b) + " \\\\ x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(k) + " \\end{aligned} \\] So the fully correct solution is <b>" + corr + "</b>.";
  return mcq("Which inequality is the fully correct solution of \\(" + fmt(a) + "x - " + fmt(b) + " " + u5sym(r) + " " + fmt(c) + "\\)?", { t: corr, fb: "Correct: both steps are right and the sign direction is unchanged." }, ds, sol, { mode: "two-step-choose", a: a, b: b, c: c, r: r });
}, ["Work the solution yourself, one step at a time, then match it against the choices.", "First undo the constant term by adding it to both sides, then divide."]);

// 21. L3, 8.28, var: equation process vs inequality process.
E("u5-compare-eq-ineq-process", 5, ["8.28"], 3, "var", varset([
  function () {
    var sol = "Both problems divide by \\(-2\\), but only the inequality changes direction: \\[ \\begin{aligned} -2x &= 6 \\\\ x &= -3 \\end{aligned} \\] \\[ \\begin{aligned} -2x &> 6 \\\\ x &< -3 \\end{aligned} \\] So the true statement is that <b>the steps match, but the inequality sign reverses when dividing by a negative</b>.";
    return mcq("Compare solving \\(-2x = 6\\) with solving \\(-2x > 6\\). Which statement about the two processes is true?", { t: "The steps are the same, but the inequality sign reverses when both sides are divided by -2.", fb: "Correct: dividing by a negative reverses an inequality sign, and an equation has no sign to reverse." }, [
      { t: "The processes are identical in every way, including the final direction of the sign as well.", fb: "An equation has no inequality sign; only the inequality can reverse, and it does here." },
      { t: "The equation also reverses something of its own when both sides are divided by -2 here.", fb: "Equals signs never reverse; the reversal rule belongs to inequalities only." },
      { t: "Neither problem needs the division step at all, since -2 can just be dropped from both.", fb: "The coefficient must be undone in both problems; dropping it changes the value of x." }
    ], sol, { mode: "cmp-proc-neg" });
  },
  function () {
    var sol = "The solving steps are identical because the divisor is positive: \\[ \\begin{aligned} 3x &= 12 \\\\ x &= 4 \\end{aligned} \\] \\[ \\begin{aligned} 3x &< 12 \\\\ x &< 4 \\end{aligned} \\] The difference is in the answers, so the true statement is that <b>the processes match, but the equation has one solution and the inequality has a range</b>.";
    return mcq("Compare solving \\(3x = 12\\) with solving \\(3x < 12\\). Which statement about the two processes is true?", { t: "The processes are the same; only the answers differ, one single value versus a range of values.", fb: "Correct: dividing by positive 3 works identically, and the answers differ in kind." }, [
      { t: "The inequality sign reverses, because every division step reverses an inequality in a problem.", fb: "The sign reverses only for a negative divisor; 3 is positive, so no reversal happens." },
      { t: "The inequality needs an extra step of its own that the equation does not need at any point.", fb: "Both take the same single division step; no extra step is added for the inequality." },
      { t: "The equation has a range of solutions stretching on and on, and the inequality has just one.", fb: "That is backwards: the equation pins x to one value, the inequality allows a range." }
    ], sol, { mode: "cmp-proc-pos" });
  },
  function () {
    var sol = "Adding and subtracting behave the same way in both: \\[ \\begin{aligned} x+5 &= 9 \\\\ x &= 4 \\end{aligned} \\] \\[ \\begin{aligned} x+5 &> 9 \\\\ x &> 4 \\end{aligned} \\] No sign reversal happens for addition, so the true statement is that <b>the steps match and the sign direction stays the same</b>.";
    return mcq("Compare solving \\(x + 5 = 9\\) with solving \\(x + 5 > 9\\). Which statement about the two processes is true?", { t: "The steps are the same, and subtracting 5 from both sides leaves the inequality direction unchanged.", fb: "Correct: adding or subtracting the same amount never changes an inequality direction." }, [
      { t: "The inequality sign reverses its direction when 5 is subtracted from both sides of the problem.", fb: "Reversal is tied to multiplying or dividing by a negative, not to subtracting a constant." },
      { t: "The inequality must be solved by trial alone, while the equation is solved by inverse operations.", fb: "Both are solved by the same inverse operation here: subtract 5 from both sides." },
      { t: "The two problems have exactly the same final answer, the one single value 4, with nothing more.", fb: "The inequality answer is a range of values greater than 4, not the single value 4." }
    ], sol, { mode: "cmp-proc-add" });
  },
  function () {
    var sol = "Both problems need the x term isolated, and only the inequality flips: \\[ \\begin{aligned} -x &= 4 \\\\ x &= -4 \\end{aligned} \\] \\[ \\begin{aligned} -x &\\le 4 \\\\ x &\\ge -4 \\end{aligned} \\] So the true statement is that <b>dividing by -1 reverses the inequality but leaves the equation answer as one value</b>.";
    return mcq("Compare solving \\(-x = 4\\) with solving \\(-x \\le 4\\). Which statement about the two processes is true?", { t: "Both divide by -1, but only the inequality reverses, changing its direction to greater than or equal to.", fb: "Correct: the hidden coefficient is -1, and dividing by it flips the inequality only." }, [
      { t: "Neither answer changes direction, because the coefficient of x looks like just a minus sign in front.", fb: "That minus sign is a coefficient of -1, and dividing by a negative reverses an inequality." },
      { t: "The equation answer becomes a range of values and the inequality answer becomes one value only.", fb: "That is backwards: equations give one value here, inequalities give a range." },
      { t: "The inequality keeps its direction all the way through the working because equals parts never flip at all.", fb: "The whole sign, equals part included, reverses when dividing by a negative number." }
    ], sol, { mode: "cmp-proc-negone" });
  },
  function () {
    var sol = "The boundary value is shared, and the solving steps match: \\[ \\begin{aligned} 5x &= 20 \\\\ x &= 4 \\end{aligned} \\] \\[ \\begin{aligned} 5x &\\ge 20 \\\\ x &\\ge 4 \\end{aligned} \\] So the true statement is that <b>the equation solution is the boundary of the inequality solution, and it is included in it</b>.";
    return mcq("Compare solving \\(5x = 20\\) with solving \\(5x \\ge 20\\). Which statement about the two processes is true?", { t: "The processes match, and the equation solution, 4, is the boundary value of the inequality solution.", fb: "Correct: both divide by 5, and 4 is where the inequality range starts." }, [
      { t: "The processes differ because the inequality sign reverses whenever both sides are divided by 5.", fb: "Five is positive, so no reversal happens; the processes are step for step the same." },
      { t: "The equation solution, 4, is not part of the inequality answer at all and never can be.", fb: "The or-equal-to part includes the boundary, so 4 does satisfy the inequality." },
      { t: "The inequality has no boundary value at all, since its answer is a range of values instead of one number.", fb: "Every inequality range here starts at a boundary value; here it is 4." }
    ], sol, { mode: "cmp-proc-boundary" });
  }
]), ["Solve both problems side by side and watch for the one step where they can differ.", "First do the shared steps; then ask whether a negative divisor appears, because that is the only process difference."]);

// 22. L2, 8.29, var: numbers satisfying the inequality but not the equation.
E("u5-compare-eq-ineq-solutions", 5, ["8.29"], 1, "var", varset([
  function () {
    var sol = "The equation is satisfied only by 5, while the inequality allows anything bigger: \\[ \\begin{aligned} 6 &> 5 \\\\ 5 &= 5 \\end{aligned} \\] So the number that satisfies the inequality but not the equation is <b>6</b>.";
    return mcq("The equation \\(x = 5\\) and the inequality \\(x > 5\\) use the same boundary. Which number satisfies the inequality but does NOT satisfy the equation?", { t: "6", fb: "Correct: 6 is greater than 5, so it fits the inequality, and it is not the equation value." }, [
      { t: "5", fb: "That value satisfies the equation, and the strict inequality leaves it out." },
      { t: "4", fb: "That value satisfies neither statement; it is on the wrong side of the boundary." },
      { t: "3", fb: "That value satisfies neither statement; it is on the wrong side of the boundary." }
    ], sol, { mode: "cmp-sol-gt" });
  },
  function () {
    var sol = "The equation is satisfied only by 3, while the inequality also allows smaller values: \\[ \\begin{aligned} 2 &\\le 3 \\\\ 3 &= 3 \\end{aligned} \\] So the number that satisfies the inequality but not the equation is <b>2</b>.";
    return mcq("The equation \\(x = 3\\) and the inequality \\(x \\le 3\\) use the same boundary. Which number satisfies the inequality but does NOT satisfy the equation?", { t: "2", fb: "Correct: 2 is less than 3, so it fits the inequality, and it is not the equation value." }, [
      { t: "3", fb: "That value satisfies both statements, so it is not the one asked for." },
      { t: "4", fb: "That value satisfies neither statement; it is on the wrong side of the boundary." },
      { t: "5", fb: "That value satisfies neither statement; it is on the wrong side of the boundary." }
    ], sol, { mode: "cmp-sol-le" });
  },
  function () {
    var sol = "The equation is satisfied only by -2, while the inequality allows anything smaller: \\[ \\begin{aligned} -3 &< -2 \\\\ -2 &= -2 \\end{aligned} \\] So the number that satisfies the inequality but not the equation is <b>-3</b>.";
    return mcq("The equation \\(x = -2\\) and the inequality \\(x < -2\\) use the same boundary. Which number satisfies the inequality but does NOT satisfy the equation?", { t: "-3", fb: "Correct: -3 is less than -2, so it fits the inequality, and it is not the equation value." }, [
      { t: "-2", fb: "That value satisfies the equation, and the strict inequality leaves it out." },
      { t: "-1", fb: "That value satisfies neither statement; it is on the wrong side of the boundary." },
      { t: "0", fb: "That value satisfies neither statement; it is on the wrong side of the boundary." }
    ], sol, { mode: "cmp-sol-ltneg" });
  },
  function () {
    var sol = "Solving both gives the same boundary, 4, and the inequality also allows bigger values: \\[ \\begin{aligned} 2(5) &= 10 > 8 \\\\ 2(4) &= 8 \\end{aligned} \\] So the number that satisfies the inequality but not the equation is <b>5</b>.";
    return mcq("The equation \\(2x = 8\\) and the inequality \\(2x > 8\\) share a boundary. Which number satisfies the inequality but does NOT satisfy the equation?", { t: "5", fb: "Correct: doubling 5 gives 10, which fits the inequality, and 5 is not the equation solution." }, [
      { t: "4", fb: "That value is the equation solution, and the strict inequality leaves it out." },
      { t: "3", fb: "That value satisfies neither statement; doubling it gives only 6." },
      { t: "2", fb: "That value satisfies neither statement; doubling it gives only 4." }
    ], sol, { mode: "cmp-sol-double" });
  },
  function () {
    var sol = "The equation is satisfied only by 7, while the inequality also allows bigger values, boundary included: \\[ \\begin{aligned} 8 &\\ge 7 \\\\ 7 &= 7 \\end{aligned} \\] So the number that satisfies the inequality but not the equation is <b>8</b>.";
    return mcq("The equation \\(x = 7\\) and the inequality \\(x \\ge 7\\) use the same boundary. Which number satisfies the inequality but does NOT satisfy the equation?", { t: "8", fb: "Correct: 8 is greater than 7, so it fits the inequality, and it is not the equation value." }, [
      { t: "7", fb: "That value satisfies both statements, so it is not the one asked for." },
      { t: "6", fb: "That value satisfies neither statement; it is on the wrong side of the boundary." },
      { t: "5", fb: "That value satisfies neither statement; it is on the wrong side of the boundary." }
    ], sol, { mode: "cmp-sol-ge" });
  }
]), ["Test each choice in both statements; the wanted number passes the inequality and fails the equation.", "First find the equation solution and rule it out, then test the rest in the inequality."]);

// 23. L2, 8.30: context inequality with its graph shown.
E("u5-context-graph", 5, ["8.30"], 1, "gen", function () {
  var ctxs = [
    { v: "s", r: "le", text: function (k) { return "A school club can spend at most $" + fmt(k) + " on supplies. Let s be the amount spent, in dollars."; } },
    { v: "a", r: "ge", text: function (k) { return "Riders must be at least " + fmt(k) + " cm tall for a certain ride. Let a be a rider's height, in centimetres."; } },
    { v: "p", r: "lt", text: function (k) { return "Each piece cut from a board must be shorter than " + fmt(k) + " cm. Let p be the length of a piece, in centimetres."; } },
    { v: "g", r: "gt", text: function (k) { return "A team needs to score more than " + fmt(k) + " points to advance. Let g be the points the team scores."; } }
  ];
  var cx = pick(ctxs), k = ri(6, 40) * pick([1, 1, 2, 5]);
  var closed = (cx.r === "le" || cx.r === "ge"), dir = (cx.r === "gt" || cx.r === "ge") ? "right" : "left";
  var corr = u5ineqTex(cx.v, cx.r, fmt(k));
  var others = ["lt", "gt", "le", "ge"].filter(function (s) { return s !== cx.r; });
  var ds = others.map(function (s) { return { t: u5ineqTex(cx.v, s, fmt(k)), fb: "That inequality does not match the graph: check the circle type and the shading direction against the story." }; });
  var sol = "The story gives the boundary \\(" + fmt(k) + "\\), and the graph shows a " + (closed ? "closed" : "open") + " circle there with shading to the " + dir + ". So the inequality for the situation is <b>" + corr + "</b>.";
  var q = mcq(cx.text(k) + " The number line in the diagram graphs the amounts that fit the situation. Which inequality describes the situation?", { t: corr, fb: "Correct: the variable, boundary, circle type and shading direction all match the story." }, ds, sol, { mode: "context-graph", r: cx.r, k: k, v: cx.v });
  q.figure = u5line(k, closed, dir);
  return q;
}, ["Translate the story into an inequality, then check it against the circle and shading in the graph.", "First find the boundary number in the story; the graph circle sits on that same number."]);

// 24. L2, 8.30: context problem, boundary value.
E("u5-context-boundary", 5, ["8.30"], 2, "gen", function () {
  var form = ri(0, 2);
  if (form === 0) {
    var a = ri(2, 9), b = ri(3, 15), n = ri(3, 15), c = a * n + b;
    var sol = "The boundary value is where the total exactly equals the budget: \\[ \\begin{aligned} " + fmt(a) + "n+" + fmt(b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "n &= " + fmt(c - b) + " \\\\ n &= " + fmt(n) + " \\end{aligned} \\] So the boundary value is <b>" + fmt(n) + "</b>.";
    return numq("Movie tickets cost $" + fmt(a) + " each, plus a $" + fmt(b) + " booking fee paid once. Jay has at most $" + fmt(c) + " to spend, modelled by " + fmt(a) + "n + " + fmt(b) + " \\(\\le\\) " + fmt(c) + ", where n is the number of tickets. The boundary value is the value of n when the total equals the budget exactly. What is the boundary value?", n, 0.01, sol, { mode: "ctx-tickets", a: a, b: b, c: c });
  }
  if (form === 1) {
    var a2 = ri(3, 8), b2 = ri(2, 10), n2 = ri(4, 14), c2 = a2 * n2 + b2;
    var sol2 = "The boundary value is where the total mass exactly equals the limit: \\[ \\begin{aligned} " + fmt(a2) + "m+" + fmt(b2) + " &= " + fmt(c2) + " \\\\ " + fmt(a2) + "m &= " + fmt(c2 - b2) + " \\\\ m &= " + fmt(n2) + " \\end{aligned} \\] So the boundary value is <b>" + fmt(n2) + "</b>.";
    return numq("A lift crate weighs " + fmt(b2) + " kg empty. Each box loaded into it weighs " + fmt(a2) + " kg. The total mass must be at most " + fmt(c2) + " kg, modelled by " + fmt(a2) + "m + " + fmt(b2) + " \\(\\le\\) " + fmt(c2) + ", where m is the number of boxes. The boundary value is the value of m when the total equals the limit exactly. What is the boundary value?", n2, 0.01, sol2, { mode: "ctx-mass", a: a2, b: b2, c: c2 });
  }
  var a3 = ri(2, 7), b3 = ri(4, 12), n3 = ri(3, 12), c3 = a3 * n3 + b3;
  var sol3 = "The boundary value is where the points exactly reach the target: \\[ \\begin{aligned} " + fmt(a3) + "g+" + fmt(b3) + " &= " + fmt(c3) + " \\\\ " + fmt(a3) + "g &= " + fmt(c3 - b3) + " \\\\ g &= " + fmt(n3) + " \\end{aligned} \\] So the boundary value is <b>" + fmt(n3) + "</b>.";
  return numq("A game awards " + fmt(a3) + " points for each goal and a one-time bonus of " + fmt(b3) + " points. A player wants at least " + fmt(c3) + " points, modelled by " + fmt(a3) + "g + " + fmt(b3) + " \\(\\ge\\) " + fmt(c3) + ", where g is the number of goals. The boundary value is the value of g when the points exactly equal the target. What is the boundary value?", n3, 0.01, sol3, { mode: "ctx-points", a: a3, b: b3, c: c3 });
}, ["The boundary value comes from the matching equation: turn the inequality into an equation and solve it.", "First replace the inequality sign with an equals sign; the solution of that equation is the boundary."]);


// Helpers for entries 25 to 28; prefixed u5b to avoid clashing with the u5 helpers above.
function u5bPhrase(r) { return r === "ge" ? "at least" : r === "le" ? "at most" : r === "gt" ? "more than" : "less than"; }
function u5bDirChar(r) { return (r === "lt" || r === "le") ? "<" : ">"; }
function u5bSolWord(isSol) { return isSol ? "is a solution" : "is not a solution"; }

// 25. L1, 8.1: read an inequality in symbols and choose the matching word statement.
E("u5-ineq-to-words", 5, ["8.1"], 1, "gen", function () {
  var ctxs = [
    { v: "h", desc: "h is a rider's height in centimetres", lead: "A rider's height is", unit: "centimetres", ks: [100, 110, 120, 130, 140, 150] },
    { v: "a", desc: "a is a student's age in years", lead: "A student's age is", unit: "years", ks: [5, 6, 10, 12, 14, 16, 18] },
    { v: "s", desc: "s is the amount spent in dollars", lead: "The amount spent is", unit: "dollars", ks: [10, 20, 25, 40, 50, 75, 100] },
    { v: "m", desc: "m is the total mass in a lift in kilograms", lead: "The total mass in the lift is", unit: "kilograms", ks: [200, 300, 400, 500, 600, 800, 1000] },
    { v: "t", desc: "t is the waiting time in minutes", lead: "The waiting time is", unit: "minutes", ks: [5, 10, 15, 20, 30, 45, 60] },
    { v: "w", desc: "w is the water in a tank in litres", lead: "The water in the tank is", unit: "litres", ks: [50, 80, 100, 150, 200, 250, 300] },
    { v: "p", desc: "p is the points a team scores", lead: "The points scored are", unit: "points", ks: [10, 20, 30, 40, 50, 60] },
    { v: "d", desc: "d is the distance walked in kilometres", lead: "The distance walked is", unit: "kilometres", ks: [2, 3, 5, 8, 10, 12, 15] }
  ];
  var cx = pick(ctxs), r = pick(["lt", "gt", "le", "ge"]), k = pick(cx.ks);
  function stmt(rr) { return cx.lead + " " + u5bPhrase(rr) + " " + fmt(k) + " " + cx.unit + "."; }
  var corr = stmt(r);
  var others = ["lt", "gt", "le", "ge"].filter(function (x) { return x !== r; });
  var ds = others.map(function (x) { return { t: stmt(x), fb: "That statement uses the phrase " + u5bPhrase(x) + ", which matches a different sign. Check the direction of the sign and whether the value " + fmt(k) + " itself is included." }; });
  var why = r === "ge" ? "The sign means the value itself or more, which is the phrase at least." : r === "le" ? "The sign means the value itself or less, which is the phrase at most." : r === "gt" ? "The sign means strictly more, and the value itself does not count, which is the phrase more than." : "The sign means strictly less, and the value itself does not count, which is the phrase less than.";
  var sol = why + " The inequality in symbols is: \\[ \\begin{aligned} " + cx.v + " &" + u5sym(r) + " " + fmt(k) + " \\end{aligned} \\] So the matching statement is <b>" + corr + "</b>";
  return mcq("In this situation, " + cx.desc + ". The condition is written as " + u5ineqTex(cx.v, r, fmt(k)) + ". Which statement matches this inequality?", { t: corr, fb: "Correct. " + why }, ds, sol, { mode: "ineq-to-words", r: r, k: k, v: cx.v });
}, ["Look at the sign first: its direction tells you which side of the value counts.", "Decide whether the value itself is included; an equals part in the sign means it is."]);

// 26. L2, 8.2: judge a shown substitution check for an inequality, where the work may slip or the verdict may be wrong.
E("u5-ineq-substitution-check", 5, ["8.2"], 2, "gen", function () {
  var a = ri(2, 5), b = ri(-6, 8); if (b === 0) b = 4;
  var w = ri(-4, 8), r = pick(["lt", "gt", "le", "ge"]);
  var trueL = a * w + b;
  var C = trueL + pick([-4, -3, -2, -1, 0, 1, 2, 3, 4]);
  var isSol = u5holds(trueL, r, C);
  var roll = Math.random();
  var flaw = roll < 0.4 ? "none" : roll < 0.7 ? "arith" : "verdict";
  var shownL = trueL, shownClaim;
  if (flaw === "arith") { shownL = trueL + pick([-3, -2, -1, 1, 2, 3, a, -a]); shownClaim = u5holds(shownL, r, C); }
  else if (flaw === "verdict") { shownClaim = !isSol; }
  else { shownClaim = isSol; }
  var hasErr = flaw !== "none";
  var sub = fmt(a) + "(" + fmt(w) + ")" + (b >= 0 ? "+" + fmt(b) : "-" + fmt(-b));
  var ineq = u5lin(a, b) + " " + u5sym(r) + " " + fmt(C);
  var prompt = "A student checks whether \\(x = " + fmt(w) + "\\) is a solution of \\(" + ineq + "\\). The student substitutes and writes \\(" + sub + " = " + fmt(shownL) + "\\), then writes that \\(" + fmt(shownL) + " " + u5sym(r) + " " + fmt(C) + "\\) is " + (shownClaim ? "true" : "false") + ", so \\(x = " + fmt(w) + "\\) " + u5bSolWord(shownClaim) + ". Which statement about this check is correct?";
  function optText(err, solFlag) { return "The shown work " + (err ? "has an error" : "is correct") + ", and \\(x = " + fmt(w) + "\\) " + u5bSolWord(solFlag) + "."; }
  var corr = optText(hasErr, isSol);
  var combos = [[true, true], [true, false], [false, true], [false, false]].filter(function (pr) { return !(pr[0] === hasErr && pr[1] === isSol); });
  var ds = combos.map(function (pr) {
    var parts = [];
    if (pr[0] !== hasErr) parts.push(hasErr ? "the shown work does contain an error" : "the shown work has no error");
    if (pr[1] !== isSol) parts.push("in fact \\(x = " + fmt(w) + "\\) " + u5bSolWord(isSol));
    return { t: optText(pr[0], pr[1]), fb: "Check again: " + parts.join(", and ") + "." };
  });
  var errNote = flaw === "arith" ? "The student's value " + fmt(shownL) + " is wrong; the correct left side is " + fmt(trueL) + ". " : flaw === "verdict" ? "The student's left side is right, but the verdict is wrong. " : "The student's work matches this. ";
  var sol = "Redo the substitution and compare the two sides: \\[ \\begin{aligned} " + u5lin(a, b) + " &= " + sub + " \\\\ &= " + fmt(trueL) + " \\end{aligned} \\] Since \\(" + fmt(trueL) + " " + u5sym(r) + " " + fmt(C) + "\\) is " + (isSol ? "true" : "false") + ", \\(x = " + fmt(w) + "\\) " + u5bSolWord(isSol) + ". " + errNote + "So the correct statement is <b>" + corr + "</b>";
  return mcq(prompt, { t: corr, fb: "Correct: redoing the substitution gives a left side of " + fmt(trueL) + ", and the comparison with " + fmt(C) + " settles the verdict." }, ds, sol, { mode: "ineq-check", a: a, b: b, w: w, r: r, c: C, flaw: flaw });
}, ["Redo the substitution yourself and compare the left side with the right side before judging the student's words.", "First work out the left side with the given value; then check both the student's number and the student's verdict against yours."]);

// 27. L2, 8.3: count how many listed values satisfy an inequality.
E("u5-count-satisfying", 5, ["8.3"], 1, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var form = ri(0, 1);
    var r = pick(["lt", "gt", "le", "ge"]);
    var k = ri(-4, 9);
    var b = ri(2, 6);
    var n = ri(4, 6);
    var pool = [];
    for (var v = k - 5; v <= k + 5; v++) pool.push(v);
    var vals = shuffle(pool).slice(0, n).sort(function (x, y) { return x - y; });
    var tests = vals.map(function (v) { return form === 0 ? v : v + b; });
    var cnt = 0;
    tests.forEach(function (tv) { if (u5holds(tv, r, k)) cnt++; });
    if (cnt < 1 || cnt > n - 1) continue;
    var lhs = form === 0 ? "x" : "x+" + fmt(b);
    var listStr = vals.map(fmt).join(", ");
    var lines = vals.map(function (v, i) { return fmt(tests[i]) + " &" + u5sym(r) + " " + fmt(k) + " \\quad \\text{" + (u5holds(tests[i], r, k) ? "true" : "false") + "}"; }).join(" \\\\ ");
    var sol = "Substitute each listed value" + (form === 1 ? " into \\(x + " + fmt(b) + "\\), giving " + tests.map(fmt).join(", ") + " in order," : "") + " and check each result against " + fmt(k) + ": \\[ \\begin{aligned} " + lines + " \\end{aligned} \\] Counting the true statements gives <b>" + fmt(cnt) + "</b> of the listed values satisfying the inequality.";
    return numq("How many of the values " + listStr + " satisfy the inequality \\(" + lhs + " " + u5sym(r) + " " + fmt(k) + "\\)?", cnt, 0.01, sol, { mode: form === 0 ? "count-x" : "count-x+b", r: r, k: k, b: b, n: n });
  }
  var solF = "Substitute each listed value and check the statement: \\[ \\begin{aligned} -1 &\\le 3 \\quad \\text{true} \\\\ 2 &\\le 3 \\quad \\text{true} \\\\ 3 &\\le 3 \\quad \\text{true} \\\\ 5 &\\le 3 \\quad \\text{false} \\end{aligned} \\] Counting the true statements gives <b>3</b> of the listed values satisfying the inequality.";
  return numq("How many of the values -1, 2, 3, 5 satisfy the inequality \\(x \\le 3\\)?", 3, 0.01, solF, { mode: "count-x", r: "le", k: 3, b: 0, n: 4 });
}, ["Test each listed value in the inequality one at a time and keep a running count.", "First test the boundary value itself, since the equals part of the sign decides whether it counts."]);

// 28. L2, 8.25: choose the correct solution of an inequality that needs only addition or subtraction.
E("u5-solve-ineq-addsub-choose", 5, ["8.25"], 1, "gen", function () {
  var r = pick(["lt", "gt", "le", "ge"]), fr = u5flip(r);
  var b = ri(2, 12), k = ri(-8, 10);
  var isAdd = Math.random() < 0.5;
  var c = isAdd ? k + b : k - b;
  var kW = isAdd ? c + b : c - b;
  var lhs = isAdd ? "x+" + fmt(b) : "x-" + fmt(b);
  var corr = u5ineqTex("x", r, fmt(k));
  var ds = [
    { t: u5ineqTex("x", r, fmt(kW)), fb: "The direction is right, but that boundary comes from " + (isAdd ? "adding" : "subtracting") + " " + fmt(b) + " again instead of undoing the operation on x." },
    { t: u5ineqTex("x", fr, fmt(k)), fb: "The boundary value is right, but adding or subtracting the same amount on both sides never changes the direction of the sign." },
    { t: u5ineqTex("x", fr, fmt(kW)), fb: "That has both slips: the boundary comes from the wrong operation, and the direction was changed even though only addition or subtraction is involved." }
  ];
  var step = isAdd ? "Subtract " + fmt(b) + " from" : "Add " + fmt(b) + " to";
  var sol = step + " both sides; adding or subtracting never changes the sign direction: \\[ \\begin{aligned} " + lhs + " &" + u5bDirChar(r) + " " + fmt(c) + " \\\\ x &" + u5bDirChar(r) + " " + fmt(k) + " \\end{aligned} \\] So the solution is <b>" + corr + "</b>.";
  return mcq("Solve the inequality \\(" + lhs + " " + u5sym(r) + " " + fmt(c) + "\\). Which inequality is the solution?", { t: corr, fb: "Correct: the operation on x was undone on both sides and the direction stayed the same." }, ds, sol, { mode: isAdd ? "choose-x+b" : "choose-x-b", b: b, c: c, r: r });
}, ["Undo what was done to x, using the same operation on both sides of the sign.", "First decide whether x had an amount added or subtracted, then undo that step and keep the sign direction."]);

// Unit 6: Linear Relations (Math 9, NL). Entries only; helpers prefixed u6.
function u6lin(m, b, v) {
  var head = (m === 1 ? v : fmt(m) + v);
  if (b > 0) return head + " + " + fmt(b);
  if (b < 0) return head + " - " + fmt(-b);
  return head;
}
function u6pick3(corr, cands) {
  var out = [], seen = {}; seen[corr] = 1;
  var sh = shuffle(cands);
  for (var i = 0; i < sh.length && out.length < 3; i++) {
    if (!seen[sh[i].t]) { seen[sh[i].t] = 1; out.push(sh[i]); }
  }
  return out.length === 3 ? out : null;
}
function u6graph(o) {
  var W = 360, H = 302, x0 = 56, y0 = 256, x1 = 338, y1 = 28;
  var sx = (x1 - x0) / o.xmax, sy = (y0 - y1) / o.ymax;
  function X(v) { return fmt(x0 + v * sx, 1); }
  function Y(v) { return fmt(y0 - v * sy, 1); }
  var xs = o.xstep || (o.xmax <= 10 ? 1 : 2);
  var ys = o.ystep || (o.ymax <= 12 ? 1 : (o.ymax <= 26 ? 2 : 5));
  var s = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Graph of a linear relation">';
  var g;
  for (g = xs; g < o.xmax; g += xs) s += '<line x1="' + X(g) + '" y1="' + y1 + '" x2="' + X(g) + '" y2="' + y0 + '" stroke="#dce8df" stroke-width="1"/>';
  for (g = ys; g < o.ymax; g += ys) s += '<line x1="' + x0 + '" y1="' + Y(g) + '" x2="' + x1 + '" y2="' + Y(g) + '" stroke="#dce8df" stroke-width="1"/>';
  (o.lines || []).forEach(function (L) {
    var pts = L.pts.map(function (p) { return X(p[0]) + "," + Y(p[1]); }).join(" ");
    s += '<polyline points="' + pts + '" fill="none" stroke="' + (L.col || FIG_INK) + '" stroke-width="' + (L.w || 2.5) + '"' + (L.dash ? ' stroke-dasharray="7 5"' : "") + '/>';
    if (L.lab) { var lp = L.pts[L.pts.length - 1]; s += '<text x="' + fmt(x0 + lp[0] * sx - 4, 1) + '" y="' + fmt(y0 - lp[1] * sy - 10, 1) + '" font-size="12" font-weight="bold" fill="' + (L.col || FIG_INK) + '" text-anchor="end">' + L.lab + '</text>'; }
  });
  (o.points || []).forEach(function (P) {
    s += '<circle cx="' + X(P.x) + '" cy="' + Y(P.y) + '" r="3.5" fill="' + (P.col || FIG_ACC) + '"/>';
    if (P.lab) s += '<text x="' + fmt(x0 + P.x * sx + 8, 1) + '" y="' + fmt(y0 - P.y * sy - 8, 1) + '" font-size="12" fill="' + FIG_INK + '">' + P.lab + '</text>';
  });
  s += '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + x1 + '" y2="' + y0 + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  s += '<polygon points="' + x1 + ',' + y0 + ' ' + (x1 - 9) + ',' + (y0 - 4) + ' ' + (x1 - 9) + ',' + (y0 + 4) + '" fill="' + FIG_INK + '"/>';
  s += '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + x0 + '" y2="' + y1 + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  s += '<polygon points="' + x0 + ',' + y1 + ' ' + (x0 - 4) + ',' + (y1 + 9) + ' ' + (x0 + 4) + ',' + (y1 + 9) + '" fill="' + FIG_INK + '"/>';
  for (g = 0; g <= o.xmax; g += xs) s += '<line x1="' + X(g) + '" y1="' + y0 + '" x2="' + X(g) + '" y2="' + (y0 + 5) + '" stroke="' + FIG_INK + '" stroke-width="1.5"/><text x="' + X(g) + '" y="' + (y0 + 20) + '" font-size="12" fill="' + FIG_INK + '" text-anchor="middle">' + g + '</text>';
  for (g = ys; g <= o.ymax; g += ys) s += '<line x1="' + (x0 - 5) + '" y1="' + Y(g) + '" x2="' + x0 + '" y2="' + Y(g) + '" stroke="' + FIG_INK + '" stroke-width="1.5"/><text x="' + (x0 - 10) + '" y="' + Y(g) + '" font-size="12" fill="' + FIG_INK + '" text-anchor="end" dominant-baseline="central">' + g + '</text>';
  s += '<text x="' + x1 + '" y="' + (y0 + 38) + '" font-size="13" font-style="italic" fill="' + FIG_INK + '" text-anchor="end">' + (o.xlab || "x") + '</text>';
  s += '<text x="' + fmt(x0 - 4, 1) + '" y="' + (y1 - 10) + '" font-size="13" font-style="italic" fill="' + FIG_INK + '" text-anchor="middle">' + (o.ylab || "y") + '</text>';
  return s + '</svg>';
}
function u6stageFig(counts, item) {
  var sq = 15, gap = 3, per = 8, pad = 12, seg = 26;
  var widths = counts.map(function (c) { var cols = Math.min(per, c); return cols * (sq + gap) - gap; });
  var maxRows = 1;
  counts.forEach(function (c) { var r = Math.ceil(c / per); if (r > maxRows) maxRows = r; });
  var totW = pad * 2 + seg * (counts.length - 1);
  widths.forEach(function (w) { totW += w; });
  var H = 22 + (maxRows * (sq + gap) - gap) + 26;
  var s = '<svg xmlns="http://www.w3.org/2000/svg" width="' + totW + '" height="' + H + '" viewBox="0 0 ' + totW + ' ' + H + '" role="img" aria-label="First three stages of a growing pattern">';
  var cx = pad;
  counts.forEach(function (c, i) {
    var w = widths[i], mid = fmt(cx + w / 2, 1);
    s += '<text x="' + mid + '" y="12" font-size="12" font-weight="bold" fill="' + FIG_INK + '" text-anchor="middle">Stage ' + (i + 1) + '</text>';
    for (var k = 0; k < c; k++) {
      var col = k % per, row = Math.floor(k / per);
      s += '<rect x="' + (cx + col * (sq + gap)) + '" y="' + (22 + row * (sq + gap)) + '" width="' + sq + '" height="' + sq + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="1.2"/>';
    }
    s += '<text x="' + mid + '" y="' + (H - 6) + '" font-size="12" fill="' + FIG_INK + '" text-anchor="middle">' + c + ' ' + item + '</text>';
    cx += w + seg;
  });
  return s + '</svg>';
}

// 1. L1, 7.1: tile pattern in a figure, choose the expression for stage n.

/* ----- bank-u6.js ----- */
// Math 9 Unit 6 Linear Relations question bank
// Cut verbatim from the standalone bank source
// (math-9-review/bank-src.js, lines 3264 to 3749).
// CRMARKS: u6-pattern-word-total=2
// CRMARKS: u6-table-extend=3
// CRMARKS: u6-point-on-graph=2
// CRMARKS: u6-interpolate-graph=3
// CRMARKS: u6-two-plans-graph=3
// CRMARKS: u6-pattern-solve-n=3
// CRMARKS: u6-pattern-large=2
E("u6-pattern-figure-expr", 6, ["7.1"], 2, "gen", function () {
  var item = pick(["tiles", "dots", "blocks", "counters"]);
  var m = ri(2, 6), b = ri(1, 8), att = 0;
  while (m === b && att < 40) { m = ri(2, 6); b = ri(1, 8); att++; }
  if (m === b) { m = 3; b = 2; }
  var counts = [b + m, b + 2 * m, b + 3 * m];
  var corr = "\\(" + u6lin(m, b, "n") + "\\)";
  var ds = [
    { t: "\\(" + u6lin(b, m, "n") + "\\)", fb: "That swaps the start value and the step. The count grows by " + fmt(m) + " each stage, so " + fmt(m) + " multiplies n." },
    { t: "\\(" + u6lin(m, -b, "n") + "\\)", fb: "That subtracts the start value. The start value is added, because Stage 1 is already more than one step." },
    { t: "\\(" + fmt(m + b) + "n\\)", fb: "That folds the start value into the step. The start value is added once, not once per stage." }
  ];
  var sol = "The counts grow by the same amount each stage: \\[ \\begin{aligned} \\text{step} &= " + counts[1] + " - " + counts[0] + " = " + fmt(m) + " \\\\ \\text{start} &= " + counts[0] + " - " + fmt(m) + " = " + fmt(b) + " \\end{aligned} \\] So the number of " + item + " at Stage \\(n\\) is <b>" + corr + "</b>.";
  var q = mcq("The diagram shows the first three stages of a pattern made with " + item + ". Which expression gives the number of " + item + " at Stage \\(n\\)?",
    { t: corr, fb: "Correct. The start value is " + fmt(b) + " and each new stage adds " + fmt(m) + "." }, ds, sol,
    { mode: "pattern-figure-expr", m: m, b: b, item: item });
  q.figure = u6stageFig(counts, item);
  return q;
}, ["Find how much the count grows from one stage to the next; that growth is the step.", "Work backwards from Stage 1 by subtracting one step to get the start value."]);

// 2. L2, 7.1, CR 2: pattern in words, total at a larger stage.
E("u6-pattern-word-total", 6, ["7.1"], 1, "gen", function () {
  var S = ri(4, 48), r = ri(2, 9), N = ri(11, 30);
  var ctx = pick([
    "A savings jar starts with $" + S + ". Each week, $" + r + " is added to the jar. How much money, in dollars, is in the jar after " + N + " weeks?",
    "A tomato plant is " + S + " cm tall. It grows " + r + " cm each week. How tall, in centimetres, is the plant after " + N + " weeks?",
    "A reader has finished " + S + " pages of a novel. She reads " + r + " more pages each day. How many pages has she finished after " + N + " days?",
    "A water tank holds " + S + " litres. A hose adds " + r + " litres each hour. How many litres are in the tank after " + N + " hours?"
  ]);
  var ans = S + r * N;
  var sol = "Start with the opening amount, then add the step once for each stage: \\[ \\begin{aligned} \\text{total} &= " + S + " + " + fmt(r) + " \\times " + N + " \\\\ &= " + S + " + " + fmt(r * N) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the total after " + N + " stages is <b>" + fmt(ans) + "</b>.";
  return numq(ctx, ans, 0.01, sol, { mode: "pattern-word-total", S: S, r: r, N: N });
}, ["The total is the start amount plus the step, added once for each stage.", "First multiply the step by the number of stages."]);

// 3. L1, 7.2: choose the equation for a simple cost context.
E("u6-context-equation", 6, ["7.2"], 1, "gen", function () {
  var B = ri(3, 40), R = ri(2, 15), att = 0;
  while (B === R && att < 40) { B = ri(3, 40); R = ri(2, 15); att++; }
  if (B === R) { B = 12; R = 3; }
  var ctx = pick([
    "A taxi ride costs a base fee of $" + B + " plus $" + R + " for each kilometre driven. Let \\(x\\) be the number of kilometres and \\(y\\) be the total cost in dollars.",
    "A gym charges a sign-up fee of $" + B + " plus $" + R + " for each class attended. Let \\(x\\) be the number of classes and \\(y\\) be the total cost in dollars.",
    "A plumber charges a call-out fee of $" + B + " plus $" + R + " for each hour of work. Let \\(x\\) be the number of hours and \\(y\\) be the total cost in dollars.",
    "A snack cart charges $" + B + " for a tray plus $" + R + " for each drink on it. Let \\(x\\) be the number of drinks and \\(y\\) be the total cost in dollars."
  ]);
  var corr = "\\(y = " + u6lin(R, B, "x") + "\\)";
  var sol = "The fee of $" + B + " is paid once, and the $" + R + " charge is paid \\(x\\) times: \\[ \\begin{aligned} y &= " + B + " + " + fmt(R) + "x \\end{aligned} \\] So the equation is <b>" + corr + "</b>.";
  return mcq(ctx + " Which equation gives \\(y\\)?",
    { t: corr, fb: "Correct. The one-time fee is the start value and the per-unit charge is the step." },
    [
      { t: "\\(y = " + u6lin(B, R, "x") + "\\)", fb: "That swaps the two amounts. The fee is paid once, so it is not multiplied by x." },
      { t: "\\(y = " + B + " + " + R + " + x\\)", fb: "That adds the rate instead of multiplying it by the number of units." },
      { t: "\\(y = " + fmt(B + R) + "x\\)", fb: "That adds the fee and the rate together and multiplies the sum by x, so the fee gets charged every unit." }
    ], sol, { mode: "context-equation", B: B, R: R });
}, ["Decide which amount is paid once and which amount is paid for each unit.", "The amount paid for each unit multiplies x; the one-time amount stands alone."]);

// 4. L2, 7.3: given an equation, choose a context it could describe.
E("u6-equation-context", 6, ["7.3"], 1, "var", varset([
  function () {
    return mcq("Which situation could be described by the equation \\(y = 3x + 2\\)?",
      { t: "A plant is 2 cm tall at the first measuring, then grows 3 cm each week. y is its height in centimetres after x weeks.", fb: "Correct. The start value is 2 and the step is 3 each week." },
      [
        { t: "A plant is 3 cm tall at the first measuring, then grows 2 cm each week. y is its height in centimetres after x weeks.", fb: "That situation gives y = 2x + 3: the start and step are swapped." },
        { t: "A full tank holds 2 L of water and drains 3 L each hour until it is empty. y is the water left after x hours.", fb: "Draining makes y decrease, but the equation has y growing by 3 each step." },
        { t: "A store sells notebooks for $3 each and pens for $2 each. y is the cost of x notebooks and x pens bought together.", fb: "That cost is 3x + 2x, which is 5x, with no start value added once." }
      ],
      "In \\(y = 3x + 2\\), the start value is 2 and the step is +3 for each increase of 1 in \\(x\\): \\[ \\begin{aligned} y &= 2 + 3x \\end{aligned} \\] So the matching situation is <b>the plant that starts at 2 cm and grows 3 cm each week</b>.",
      { mode: "eq-context-plant" });
  },
  function () {
    return mcq("Which situation could be described by the equation \\(y = 5x + 10\\)?",
      { t: "A courier charges a $10 pickup fee plus $5 for each kilometre. y is the total charge in dollars for x kilometres.", fb: "Correct. The start value is 10 and the step is 5 per kilometre." },
      [
        { t: "A courier charges a $5 pickup fee plus $10 for each kilometre. y is the total charge in dollars for x kilometres.", fb: "That situation gives y = 10x + 5: the fee and the rate are swapped." },
        { t: "A savings jar holds $10 and $5 is taken out each week. y is the money left after x weeks.", fb: "Taking money out makes y decrease, but the equation has y growing by 5 each step." },
        { t: "A shop sells shirts for $5 each and hats for $10 each. y is the cost of x shirts and x hats.", fb: "That cost is 5x + 10x, which is 15x, with no fee added once." }
      ],
      "In \\(y = 5x + 10\\), the start value is 10 and the step is +5 for each increase of 1 in \\(x\\): \\[ \\begin{aligned} y &= 10 + 5x \\end{aligned} \\] So the matching situation is <b>the courier with a $10 fee and $5 per kilometre</b>.",
      { mode: "eq-context-courier" });
  },
  function () {
    return mcq("Which situation could be described by the equation \\(y = 2x + 7\\)?",
      { t: "A jar starts with $7 in it, and $2 is added each week. y is the amount in the jar after x weeks.", fb: "Correct. The start value is 7 and the step is 2 each week." },
      [
        { t: "A jar starts with $2 in it, and $7 is added each week. y is the amount in the jar after x weeks.", fb: "That situation gives y = 7x + 2: the start and step are swapped." },
        { t: "A rope 7 m long is cut into pieces of 2 m each. y is the number of pieces cut from x ropes in total.", fb: "That count depends on division, and it has no start value of 7 added once." },
        { t: "A class buys 2 markers for each of x students and 7 for each of x teachers. y is the total markers.", fb: "That total is 2x + 7x, which is 9x, with no start value added once." }
      ],
      "In \\(y = 2x + 7\\), the start value is 7 and the step is +2 for each increase of 1 in \\(x\\): \\[ \\begin{aligned} y &= 7 + 2x \\end{aligned} \\] So the matching situation is <b>the jar that starts with $7 and gains $2 each week</b>.",
      { mode: "eq-context-jar" });
  },
  function () {
    return mcq("Which situation could be described by the equation \\(y = 4x + 1\\)?",
      { t: "A tank holds 1 L of water and is filled at 4 L each minute. y is the amount of water after x minutes.", fb: "Correct. The start value is 1 and the step is 4 each minute." },
      [
        { t: "A tank holds 4 L of water and is filled at 1 L each minute. y is the amount of water after x minutes.", fb: "That situation gives y = x + 4: the start and step are swapped." },
        { t: "A cake is shared equally among 4 friends, and 1 extra slice is saved for later. y is the size of each share.", fb: "Sharing is division, and the shares get smaller as x grows, unlike this equation." },
        { t: "A gym sells 4 passes in the morning and 1 pass each hour after that. y is the passes sold after x hours.", fb: "That wording makes the 4 a one-time amount for the morning, which swaps the roles of 4 and 1." }
      ],
      "In \\(y = 4x + 1\\), the start value is 1 and the step is +4 for each increase of 1 in \\(x\\): \\[ \\begin{aligned} y &= 1 + 4x \\end{aligned} \\] So the matching situation is <b>the tank that starts with 1 L and fills at 4 L each minute</b>.",
      { mode: "eq-context-tank" });
  },
  function () {
    return mcq("Which situation could be described by the equation \\(y = 6x + 3\\)?",
      { t: "A bus has 3 passengers at its first stop, and 6 more passengers board at each stop after that. y is the number of passengers after x stops.", fb: "Correct. The start value is 3 and the step is 6 at each stop." },
      [
        { t: "A bus has 6 passengers at its first stop, and 3 more passengers board at each stop after that. y is the number of passengers after x stops.", fb: "That situation gives y = 3x + 6: the start and step are swapped." },
        { t: "A baker packs 6 rolls in each box and keeps 3 boxes aside. y is the number of rolls in x boxes that are packed for sale each day.", fb: "That count is 6x with 3 boxes, not 3 rolls, held back; the equation adds 3 once to y." },
        { t: "A team scores 6 points for each of x games and 3 points for each of x practices. y is the total points scored by the team.", fb: "That total is 6x + 3x, which is 9x, with no start value added once." }
      ],
      "In \\(y = 6x + 3\\), the start value is 3 and the step is +6 for each increase of 1 in \\(x\\): \\[ \\begin{aligned} y &= 3 + 6x \\end{aligned} \\] So the matching situation is <b>the bus that starts with 3 passengers and gains 6 at each stop</b>.",
      { mode: "eq-context-bus" });
  },
  function () {
    return mcq("Which situation could be described by the equation \\(y = 10x + 5\\)?",
      { t: "A hall rental costs a $5 booking fee plus $10 for each hour. y is the total cost in dollars for x hours.", fb: "Correct. The start value is 5 and the step is 10 per hour." },
      [
        { t: "A hall rental costs a $10 booking fee plus $5 for each hour. y is the total cost in dollars for x hours.", fb: "That situation gives y = 5x + 10: the fee and the rate are swapped." },
        { t: "A trail pass costs $5 for each of x walkers, and the group also pays $10 for parking. y is the total cost in dollars.", fb: "That situation gives y = 5x + 10: the per-person cost and the one-time cost are swapped." },
        { t: "A farm stand sells melons for $10 each and berries for $5 a box. y is the cost of x melons and x boxes of berries.", fb: "That cost is 10x + 5x, which is 15x, with no fee added once." }
      ],
      "In \\(y = 10x + 5\\), the start value is 5 and the step is +10 for each increase of 1 in \\(x\\): \\[ \\begin{aligned} y &= 5 + 10x \\end{aligned} \\] So the matching situation is <b>the hall rental with a $5 fee and $10 per hour</b>.",
      { mode: "eq-context-hall" });
  }
]), ["In the equation, the number added once is the start value and the number multiplying x is the step.", "Match the start value first: look for the situation with that one-time amount."]);

// 5. L1, 7.4: table of values as text lines, choose the equation.
E("u6-table-equation", 6, ["7.4"], 2, "gen", function () {
  var S = ri(1, 12), P = ri(2, 7), att = 0;
  while (S === P && att < 40) { S = ri(1, 12); P = ri(2, 7); att++; }
  if (S === P) { S = 4; P = 3; }
  var x0 = pick([0, 0, 1]);
  var xs = [], ys = [];
  for (var k = 0; k < 5; k++) { xs.push(x0 + k); ys.push(S + P * (x0 + k)); }
  var corr = "\\(y = " + u6lin(P, S, "x") + "\\)";
  var startNote = x0 === 0
    ? "When \\(x = 0\\), \\(y = " + S + "\\), so the start value is " + S + "."
    : "Extending the pattern back one step, when \\(x = 0\\), \\(y = " + ys[0] + " - " + P + " = " + S + "\\), so the start value is " + S + ".";
  var sol = "The \\(y\\) values rise by the same amount each time \\(x\\) grows by 1: \\[ \\begin{aligned} \\text{step} &= " + ys[1] + " - " + ys[0] + " = " + fmt(P) + " \\end{aligned} \\] " + startNote + " So the equation is <b>" + corr + "</b>.";
  var prompt = "A table of values for a linear relation is shown.<br>x: " + xs.join(", ") + "<br>y: " + ys.join(", ") + "<br>Which equation fits the table?";
  return mcq(prompt,
    { t: corr, fb: "Correct. The step is " + fmt(P) + " and the start value is " + fmt(S) + "." },
    [
      { t: "\\(y = " + u6lin(S, P, "x") + "\\)", fb: "That swaps the start value and the step. Check it at the first table value." },
      { t: "\\(y = " + u6lin(P, -S, "x") + "\\)", fb: "That subtracts the start value. The y values are larger than the step alone, so the start is added." },
      { t: "\\(y = " + u6lin(P, S + P, "x") + "\\)", fb: "The step is right, but the start value is too big. Use the y value when x is 0." }
    ], sol, { mode: "table-equation", S: S, P: P, x0: x0 });
}, ["Find the step first: how much does y change when x grows by 1?", "The start value is the y value when x is 0; extend the pattern back if the table starts later."]);

// 6. L2, 7.4, CR 3: table pattern, value beyond the table.
E("u6-table-extend", 6, ["7.4"], 2, "gen", function () {
  var S = ri(2, 15), P = ri(2, 8), X = ri(8, 15);
  var xs = [0, 1, 2, 3], ys = xs.map(function (x) { return S + P * x; });
  var ans = S + P * X;
  var sol = "The step is the change in \\(y\\) for each increase of 1 in \\(x\\), and the start value is the \\(y\\) value at \\(x = 0\\): \\[ \\begin{aligned} \\text{step} &= " + ys[1] + " - " + ys[0] + " = " + fmt(P) + " \\\\ y &= " + S + " + " + fmt(P) + "x \\\\ y(" + X + ") &= " + S + " + " + fmt(P) + "(" + X + ") \\\\ &= " + S + " + " + fmt(P * X) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the value at \\(x = " + X + "\\) is <b>" + fmt(ans) + "</b>.";
  var prompt = "A table of values for a linear relation is shown.<br>x: " + xs.join(", ") + "<br>y: " + ys.join(", ") + "<br>The pattern continues with the same step. What is the value of y when x = " + X + "?";
  return numq(prompt, ans, 0.01, sol, { mode: "table-extend", S: S, P: P, X: X });
}, ["Build the equation from the table first: start value plus step times x.", "The start value is the y value at x = 0, and the step is the change in y for each +1 in x."]);

// 7. L2, 7.5: graphed relation, choose the description of its pattern.
E("u6-graph-describe", 6, ["7.5"], 2, "gen", function () {
  var ctxs = [
    { x: "hours", y: "km", xl: "hours", yl: "km" },
    { x: "minutes", y: "litres", xl: "minutes", yl: "L" },
    { x: "items", y: "dollars", xl: "items", yl: "$" },
    { x: "weeks", y: "centimetres", xl: "weeks", yl: "cm" }
  ];
  for (var att = 0; att < 300; att++) {
    var b = ri(1, 6), m = ri(1, 3), ctx = pick(ctxs);
    var corr = "It starts at " + fmt(b) + " and increases by " + fmt(m) + " each step.";
    var cands = [
      { t: "It starts at " + fmt(m) + " and increases by " + fmt(b) + " each step.", fb: "That swaps the start and the step. The line crosses the y-axis at " + fmt(b) + "." },
      { t: "It starts at " + fmt(b) + " and increases by " + fmt(m + 1) + " each step.", fb: "The start is right, but check the rise between two neighbouring points: it is " + fmt(m) + ", not " + fmt(m + 1) + "." },
      { t: "It starts at " + fmt(b + 1) + " and increases by " + fmt(m) + " each step.", fb: "The step is right, but the line crosses the y-axis at " + fmt(b) + ", not " + fmt(b + 1) + "." },
      { t: "It starts at " + fmt(b) + " and decreases by " + fmt(m) + " each step.", fb: "The line rises as x grows, so the values increase; they do not decrease." },
      { t: "It starts at 0 and increases by " + fmt(m) + " each step.", fb: "The step is right, but the line crosses the y-axis at " + fmt(b) + ", not at 0." }
    ];
    var ds = u6pick3(corr, cands);
    if (!ds) continue;
    var xmax = 5, ymax = b + m * xmax;
    var pts = []; for (var k = 0; k <= xmax; k++) pts.push({ x: k, y: b + m * k });
    var sol = "Read the start where the line crosses the y-axis, then the rise between neighbouring points: \\[ \\begin{aligned} \\text{start} &= " + fmt(b) + " \\\\ \\text{step} &= " + fmt(b + m) + " - " + fmt(b) + " = " + fmt(m) + " \\end{aligned} \\] So the pattern is <b>" + corr + "</b>";
    var q = mcq("The graph shows a linear relation. The x-axis is measured in " + ctx.x + " and the y-axis in " + ctx.y + ". Which sentence describes the pattern in the graph?",
      { t: corr, fb: "Correct. The y-intercept is the start, and the rise per step is the step." }, ds, sol,
      { mode: "graph-describe", b: b, m: m, ctx: ctx.x });
    q.figure = u6graph({ xmax: xmax, ymax: ymax, xlab: ctx.xl, ylab: ctx.yl, lines: [{ pts: pts.map(function (p) { return [p.x, p.y]; }) }], points: pts });
    return q;
  }
  var qf = mcq("The graph shows a linear relation. The x-axis is measured in hours and the y-axis in km. Which sentence describes the pattern in the graph?",
    { t: "It starts at 2 and increases by 1 each step.", fb: "Correct. The y-intercept is the start, and the rise per step is the step." },
    [
      { t: "It starts at 1 and increases by 2 each step.", fb: "That swaps the start and the step." },
      { t: "It starts at 2 and increases by 2 each step.", fb: "The rise between neighbouring points is 1, not 2." },
      { t: "It starts at 2 and decreases by 1 each step.", fb: "The line rises, so the values increase." }
    ],
    "The line crosses the y-axis at 2 and rises by 1 per step, so the pattern is <b>It starts at 2 and increases by 1 each step.</b>",
    { mode: "graph-describe", b: 2, m: 1, ctx: "hours" });
  var ptsf = []; for (var k2 = 0; k2 <= 5; k2++) ptsf.push({ x: k2, y: 2 + k2 });
  qf.figure = u6graph({ xmax: 5, ymax: 7, xlab: "hours", ylab: "km", lines: [{ pts: ptsf.map(function (p) { return [p.x, p.y]; }) }], points: ptsf });
  return qf;
}, ["The start value is where the line crosses the y-axis.", "Pick two neighbouring plotted points and find how much y rises from one to the next."]);

// 8. L2, 7.6: one graph drawn, choose its equation.
E("u6-graph-equation", 6, ["7.6"], 2, "gen", function () {
  var ctxs = [
    { x: "hours", y: "km", xl: "hours", yl: "km" },
    { x: "minutes", y: "litres", xl: "minutes", yl: "L" },
    { x: "items", y: "dollars", xl: "items", yl: "$" },
    { x: "weeks", y: "centimetres", xl: "weeks", yl: "cm" }
  ];
  var ctx = pick(ctxs);
  var b = ri(1, 8), m = ri(1, 4), att = 0;
  while (b === m && att < 40) { b = ri(1, 8); m = ri(1, 4); att++; }
  if (b === m) { b = 5; m = 2; }
  var xmax = pick([4, 5, 6]), ymax = b + m * xmax;
  var pts = []; for (var k = 0; k <= xmax; k++) pts.push({ x: k, y: b + m * k });
  var corr = "\\(y = " + u6lin(m, b, "x") + "\\)";
  var sol = "Read the start from the y-intercept and the step from two points on the line: \\[ \\begin{aligned} \\text{start} &= " + fmt(b) + " \\\\ \\text{step} &= " + fmt(b + 2 * m) + " - " + fmt(b + m) + " = " + fmt(m) + " \\end{aligned} \\] So the equation of the line is <b>" + corr + "</b>.";
  var q = mcq("The graph shows a linear relation. The x-axis is measured in " + ctx.x + " and the y-axis in " + ctx.y + ". Which equation matches the graphed line?",
    { t: corr, fb: "Correct. The line starts at " + fmt(b) + " and rises by " + fmt(m) + " for each step in x." },
    [
      { t: "\\(y = " + u6lin(b, m, "x") + "\\)", fb: "That swaps the start value and the step. The y-intercept is " + fmt(b) + "." },
      { t: "\\(y = " + u6lin(m, -b, "x") + "\\)", fb: "That subtracts the start value. The line crosses the y-axis above zero, at " + fmt(b) + "." },
      { t: "\\(x = " + u6lin(m, b, "y") + "\\)", fb: "That exchanges the roles of x and y. On this graph, y depends on x." }
    ], sol, { mode: "graph-equation", b: b, m: m, ctx: ctx.x, xmax: xmax });
  q.figure = u6graph({ xmax: xmax, ymax: ymax, xlab: ctx.xl, ylab: ctx.yl, lines: [{ pts: pts.map(function (p) { return [p.x, p.y]; }) }], points: pts });
  return q;
}, ["Start with the y-intercept: it is the constant in the equation.", "Then find the step: how much y changes when x grows by 1."]);

// 9. L2, 7.7, CR 2: sloped, horizontal or vertical graph; choose a point on it.
E("u6-point-on-graph", 6, ["7.7"], 1, "gen", function () {
  var kind = pick(["slope", "slope", "horiz", "vert"]);
  function pt(x, y) { return "(" + fmt(x) + ", " + fmt(y) + ")"; }
  if (kind === "slope") {
    for (var att = 0; att < 300; att++) {
      var b = ri(1, 5), m = ri(1, 3);
      var xmax = 6, ymax = b + m * xmax;
      var x0 = ri(2, 5), y0 = b + m * x0;
      var corr = pt(x0, y0);
      var raw = [[x0, y0 + 1], [x0, y0 - 1], [x0 + 1, y0], [x0 - 1, y0], [0, m], [y0, x0]];
      var cands = [];
      raw.forEach(function (c) {
        if (c[0] < 0 || c[1] < 0) return;
        if (b + m * c[0] === c[1]) return;
        cands.push({ t: pt(c[0], c[1]), fb: "That point is not on the line. At x = " + fmt(c[0]) + ", the line has y = " + fmt(b + m * c[0]) + "." });
      });
      var ds = u6pick3(corr, cands);
      if (!ds) continue;
      var sol = "Points on the line follow its pattern, starting at " + fmt(b) + " and rising by " + fmt(m) + " per step: \\[ \\begin{aligned} y(" + x0 + ") &= " + b + " + " + fmt(m) + "(" + x0 + ") \\\\ &= " + fmt(y0) + " \\end{aligned} \\] So a point on the graph is <b>" + corr + "</b>.";
      var q = mcq("Which point lies on the graph shown?", { t: corr, fb: "Correct. That point sits exactly on the line." }, ds, sol, { mode: "point-slope", b: b, m: m, x0: x0 });
      q.figure = u6graph({ xmax: xmax, ymax: ymax, xlab: "x", ylab: "y", lines: [{ pts: [[0, b], [xmax, ymax]] }] });
      return q;
    }
  } else if (kind === "horiz") {
    var c = ri(2, 9), x0 = ri(1, 5);
    var corrH = pt(x0, c);
    var rawH = [[x0, c + 1], [x0, c + 2], [x0 + 1, c - 1], [c, x0], [x0 + 2, c + 3]];
    var candsH = [];
    rawH.forEach(function (cc) {
      if (cc[1] === c || cc[1] < 0) return;
      candsH.push({ t: pt(cc[0], cc[1]), fb: "Every point on this line has y = " + fmt(c) + ", and that point has y = " + fmt(cc[1]) + "." });
    });
    var dsH = u6pick3(corrH, candsH);
    if (dsH) {
      var solH = "The graph is a horizontal line: \\[ \\begin{aligned} y &= " + fmt(c) + " \\end{aligned} \\] Every point on it has \\(y = " + fmt(c) + "\\), whatever its \\(x\\) value is. So a point on the graph is <b>" + corrH + "</b>.";
      var qH = mcq("Which point lies on the graph shown?", { t: corrH, fb: "Correct. Its y value is " + fmt(c) + ", like every point on the line." }, dsH, solH, { mode: "point-horiz", c: c, x0: x0 });
      qH.figure = u6graph({ xmax: 6, ymax: 12, xlab: "x", ylab: "y", lines: [{ pts: [[0, c], [6, c]] }] });
      return qH;
    }
  } else {
    var cv = ri(2, 5), y0v = ri(1, 10);
    var corrV = pt(cv, y0v);
    var rawV = [[cv + 1, y0v], [cv - 1, y0v], [y0v, cv], [cv + 2, y0v + 1]];
    var candsV = [];
    rawV.forEach(function (cc) {
      if (cc[0] === cv) return;
      candsV.push({ t: pt(cc[0], cc[1]), fb: "Every point on this line has x = " + fmt(cv) + ", and that point has x = " + fmt(cc[0]) + "." });
    });
    var dsV = u6pick3(corrV, candsV);
    if (dsV) {
      var solV = "The graph is a vertical line: \\[ \\begin{aligned} x &= " + fmt(cv) + " \\end{aligned} \\] Every point on it has \\(x = " + fmt(cv) + "\\), whatever its \\(y\\) value is. So a point on the graph is <b>" + corrV + "</b>.";
      var qV = mcq("Which point lies on the graph shown?", { t: corrV, fb: "Correct. Its x value is " + fmt(cv) + ", like every point on the line." }, dsV, solV, { mode: "point-vert", c: cv, y0: y0v });
      qV.figure = u6graph({ xmax: 6, ymax: 12, xlab: "x", ylab: "y", lines: [{ pts: [[cv, 0], [cv, 12]] }] });
      return qV;
    }
  }
  var qf = mcq("Which point lies on the graph shown?", { t: "(3, 7)", fb: "Correct. That point sits exactly on the line." },
    [
      { t: "(3, 6)", fb: "At x = 3, the line has y = 7." },
      { t: "(3, 8)", fb: "At x = 3, the line has y = 7." },
      { t: "(4, 7)", fb: "At x = 4, the line has y = 9." }
    ],
    "The line starts at 1 and rises by 2 per step, so at x = 3, y = 7. A point on the graph is <b>(3, 7)</b>.",
    { mode: "point-slope", b: 1, m: 2, x0: 3 });
  qf.figure = u6graph({ xmax: 6, ymax: 13, xlab: "x", ylab: "y", lines: [{ pts: [[0, 1], [6, 13]] }] });
  return qf;
}, ["For a sloped line, use its start and step to find the y value for a given x. For a flat or upright line, check which coordinate stays the same.", "First decide what kind of line it is: sloped, horizontal or vertical."]);

// 10. L2, 7.8, CR 3: interpolate on a context graph.
E("u6-interpolate-graph", 6, ["7.8"], 1, "gen", function () {
  var ctxs = [
    { xl: "hours", yl: "km", prompt: "The graph shows the distance a bus has travelled since leaving the depot. The x-axis is time in hours and the y-axis is distance in kilometres.", ask: "How many kilometres has the bus travelled after XQ hours?" },
    { xl: "minutes", yl: "L", prompt: "The graph shows the water in a tank as it fills. The x-axis is time in minutes and the y-axis is volume in litres.", ask: "How many litres are in the tank after XQ minutes?" },
    { xl: "photos", yl: "$", prompt: "The graph shows the cost of printing photos. The x-axis is the number of photos and the y-axis is the cost in dollars.", ask: "What is the cost of printing XQ photos, in dollars?" },
    { xl: "hours", yl: "cm", prompt: "The graph shows the depth of snow during a storm. The x-axis is time in hours and the y-axis is the depth of snow in centimetres.", ask: "What is the depth of snow after XQ hours, in centimetres?" }
  ];
  var ctx = pick(ctxs);
  var b = ri(2, 10), m = ri(2, 5), xmax = 6, xq = ri(2, 5);
  var ymax = b + m * xmax, ans = b + m * xq;
  var pts = []; for (var k = 0; k <= xmax; k++) pts.push({ x: k, y: b + m * k });
  var sol = "Read across from \\(x = " + xq + "\\) to the line, then down to the y-axis. The pattern starts at " + fmt(b) + " and steps by " + fmt(m) + ": \\[ \\begin{aligned} y &= " + b + " + " + fmt(m) + "(" + xq + ") \\\\ &= " + b + " + " + fmt(m * xq) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the value at \\(x = " + xq + "\\) is <b>" + fmt(ans) + "</b>.";
  var q = numq(ctx.prompt + " " + ctx.ask.replace("XQ", xq), ans, 0.01, sol, { mode: "interpolate", b: b, m: m, xq: xq, ctx: ctx.xl + "/" + ctx.yl });
  q.figure = u6graph({ xmax: xmax, ymax: ymax, xlab: ctx.xl, ylab: ctx.yl, lines: [{ pts: pts.map(function (p) { return [p.x, p.y]; }) }], points: pts });
  return q;
}, ["Go across from the given x value to the line, then straight down to read the y value.", "You can also use the pattern: start value plus step times x."]);

// 11. L3, 7.9: extrapolate beyond the drawn range.
E("u6-extrapolate-graph", 6, ["7.9"], 3, "gen", function () {
  var ctxs = [
    { xl: "hours", yl: "km", prompt: "The graph shows the distance a delivery van has travelled on a highway trip. The x-axis is time in hours and the y-axis is distance in kilometres.", ask: "If the van keeps travelling in the same way, how many kilometres will it have travelled after XQ hours?" },
    { xl: "weeks", yl: "cm", prompt: "The graph shows the height of a sunflower over its first weeks. The x-axis is time in weeks and the y-axis is height in centimetres.", ask: "If the sunflower keeps growing in the same way, how tall will it be at week XQ, in centimetres?" },
    { xl: "days", yl: "$", prompt: "The graph shows the money in a class fundraising account. The x-axis is time in days and the y-axis is the amount in dollars.", ask: "If the account keeps growing in the same way, how many dollars will be in it after XQ days?" }
  ];
  var ctx = pick(ctxs);
  var b = ri(2, 12), m = ri(2, 6), xmax = 5, xq = ri(8, 12);
  var ymax = b + m * xmax, ans = b + m * xq;
  // Distractors sit in strict order on every draw (m >= 2 and xq >= 8):
  // start plus one step (b + m) < last drawn value (b + 5m) < one step
  // too few (ans - m) < extrapolated value (ans), so all four differ.
  var lastVal = b + m * xmax, shortVal = ans - m, oneStepVal = b + m;
  var pts = []; for (var k = 0; k <= xmax; k++) pts.push({ x: k, y: b + m * k });
  var sol = "The asked value is beyond the drawn part of the graph, so extend the pattern. The relation starts at " + fmt(b) + " and steps by " + fmt(m) + ": \\[ \\begin{aligned} y &= " + b + " + " + fmt(m) + "x \\\\ y(" + xq + ") &= " + b + " + " + fmt(m) + "(" + xq + ") \\\\ &= " + b + " + " + fmt(m * xq) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the predicted value at \\(x = " + xq + "\\) is <b>" + fmt(ans) + "</b>.";
  var q = mcq(ctx.prompt + " " + ctx.ask.replace("XQ", xq),
    { t: fmt(ans), fb: "Correct. The pattern starts at " + fmt(b) + " and steps by " + fmt(m) + ", so at x = " + xq + " the value is " + fmt(b) + " + " + fmt(m) + " x " + xq + " = " + fmt(ans) + "." },
    [
      { t: fmt(lastVal), fb: "That is the last value actually drawn on the graph, at x = " + xmax + ". The question asks for x = " + xq + ", which is past the drawn range, so keep extending the pattern instead of stopping there." },
      { t: fmt(shortVal), fb: "That counts one step too few. Reaching x = " + xq + " takes " + xq + " steps of " + fmt(m) + " from the start, not " + (xq - 1) + " steps." },
      { t: fmt(oneStepVal), fb: "That is only the start value plus one step, the value at x = 1. The asked x is " + xq + ", so the step of " + fmt(m) + " must be applied " + xq + " times, not once." }
    ], sol, { mode: "extrapolate", b: b, m: m, xq: xq, ctx: ctx.xl + "/" + ctx.yl });
  q.figure = u6graph({ xmax: xmax, ymax: ymax, xlab: ctx.xl, ylab: ctx.yl, lines: [{ pts: pts.map(function (p) { return [p.x, p.y]; }) }], points: pts });
  return q;
}, ["The asked x value is past the end of the drawn graph, so work out the pattern and extend it.", "First get the start value and the step from the drawn part of the graph."]);

// 12. L3, 7.10, CR 3: solve a problem by graphing two plans.
E("u6-two-plans-graph", 6, ["7.10"], 3, "gen", function () {
  var ctxs = [
    { xl: "GB", yl: "$", thing: "phone plans", xu: "GB of data", prompt: "The graph shows the monthly cost of two phone plans for different amounts of data. The x-axis is data used in GB and the y-axis is cost in dollars. Plan A is the solid line and Plan B is the dashed line." },
    { xl: "days", yl: "$", thing: "car rentals", xu: "days rented", prompt: "The graph shows the cost of two car rental deals for different rental lengths. The x-axis is days rented and the y-axis is cost in dollars. Plan A is the solid line and Plan B is the dashed line." },
    { xl: "hours", yl: "$", thing: "bike rentals", xu: "hours rented", prompt: "The graph shows the cost of two bike rental deals for different rental times. The x-axis is hours rented and the y-axis is cost in dollars. Plan A is the solid line and Plan B is the dashed line." }
  ];
  var ctx = pick(ctxs);
  var d = ri(1, 3), xs = ri(3, 7), bA = ri(0, 12), mB = ri(1, 4);
  var mA = mB + d, bB = bA + d * xs, ystar = bA + mA * xs;
  var xmax = xs + 3, ymax = bA + mA * xmax + d;
  var mode = pick(["breakeven-x", "breakeven-y", "difference"]);
  var prompt, ans, sol;
  if (mode === "breakeven-x") {
    prompt = ctx.prompt + " At how many " + ctx.xu.split(" ")[0] + " do the two plans cost the same?";
    if (ctx.xu === "GB of data") prompt = ctx.prompt + " At how many GB do the two plans cost the same?";
    if (ctx.xu === "days rented") prompt = ctx.prompt + " After how many days do the two plans cost the same?";
    if (ctx.xu === "hours rented") prompt = ctx.prompt + " After how many hours do the two plans cost the same?";
    ans = xs;
    sol = "The plans cost the same where the two lines cross: \\[ \\begin{aligned} " + bA + " + " + fmt(mA) + "x &= " + bB + " + " + fmt(mB) + "x \\\\ " + fmt(mA) + "x - " + fmt(mB) + "x &= " + bB + " - " + bA + " \\\\ " + fmt(d) + "x &= " + fmt(bB - bA) + " \\\\ x &= " + fmt(xs) + " \\end{aligned} \\] So the two plans cost the same at <b>" + fmt(xs) + "</b>.";
  } else if (mode === "breakeven-y") {
    prompt = ctx.prompt + " The two plans cost the same at one point on the graph. What is that cost, in dollars?";
    ans = ystar;
    sol = "Find the cost where the two lines cross, using either plan: \\[ \\begin{aligned} y &= " + bA + " + " + fmt(mA) + "(" + fmt(xs) + ") \\\\ &= " + bA + " + " + fmt(mA * xs) + " \\\\ &= " + fmt(ystar) + " \\end{aligned} \\] So the cost where the plans are equal is <b>$" + fmt(ystar) + "</b>.";
  } else {
    var u = xs + ri(1, 3);
    var cA = bA + mA * u, cB = bB + mB * u;
    prompt = ctx.prompt + " At " + u + " " + ctx.xu + ", how much cheaper is Plan B than Plan A? Give the difference in dollars.";
    ans = cA - cB;
    sol = "Work out each plan's cost at " + u + " " + ctx.xu + ", then subtract: \\[ \\begin{aligned} \\text{Plan A} &= " + bA + " + " + fmt(mA) + "(" + u + ") = " + fmt(cA) + " \\\\ \\text{Plan B} &= " + bB + " + " + fmt(mB) + "(" + u + ") = " + fmt(cB) + " \\\\ \\text{difference} &= " + fmt(cA) + " - " + fmt(cB) + " = " + fmt(ans) + " \\end{aligned} \\] So Plan B is cheaper by <b>$" + fmt(ans) + "</b>.";
  }
  var q = numq(prompt, ans, 0.01, sol, { mode: "two-plans-" + mode, d: d, xs: xs, bA: bA, mA: mA, bB: bB, mB: mB, ctx: ctx.thing });
  q.figure = u6graph({ xmax: xmax, ymax: ymax, xlab: ctx.xl, ylab: ctx.yl, lines: [
    { pts: [[0, bA], [xmax, bA + mA * xmax]], col: FIG_INK, lab: "Plan A" },
    { pts: [[0, bB], [xmax, bB + mB * xmax]], col: FIG_ALT, dash: true, lab: "Plan B" }
  ] });
  return q;
}, ["Each line is one plan: its start is its flat fee and its step is its rate.", "Where the lines cross, the plans cost the same; past that point, the lower line is the cheaper plan."]);

// 13. L2, 8.23, CR 3: pictorial pattern in words, solve for the figure number.
E("u6-pattern-solve-n", 6, ["8.23"], 2, "gen", function () {
  var F = ri(4, 10), m = ri(2, 5), nT = ri(8, 20);
  var c2 = F + m, c3 = F + 2 * m, T = F + m * (nT - 1);
  var ctx = pick([
    { item: "matchsticks", prompt: "A pattern is built with matchsticks. Figure 1 uses " + F + " matchsticks, Figure 2 uses " + c2 + " matchsticks, and Figure 3 uses " + c3 + " matchsticks. The pattern continues in the same way. Which figure number uses exactly " + T + " matchsticks?" },
    { item: "tiles", prompt: "A pattern is built with tiles along a border. Figure 1 uses " + F + " tiles, Figure 2 uses " + c2 + " tiles, and Figure 3 uses " + c3 + " tiles. The pattern continues in the same way. Which figure number uses exactly " + T + " tiles?" },
    { item: "dots", prompt: "A dot pattern is growing. Figure 1 has " + F + " dots, Figure 2 has " + c2 + " dots, and Figure 3 has " + c3 + " dots. The pattern continues in the same way. Which figure number has exactly " + T + " dots?" }
  ]);
  var sol = "Each new figure adds " + fmt(m) + ", and Figure 1 uses " + F + ". Let \\(n\\) be the figure number: \\[ \\begin{aligned} " + F + " + " + fmt(m) + "(n - 1) &= " + T + " \\\\ " + fmt(m) + "(n - 1) &= " + T + " - " + F + " = " + fmt(T - F) + " \\\\ n - 1 &= " + fmt((T - F) / m) + " \\\\ n &= " + fmt(nT) + " \\end{aligned} \\] So the figure that uses exactly " + T + " is <b>Figure " + fmt(nT) + "</b>.";
  return numq(ctx.prompt, nT, 0.01, sol, { mode: "pattern-solve-n", F: F, m: m, nT: nT, item: ctx.item });
}, ["Write an equation first: the first figure's count plus the step times the number of added figures.", "The step is the difference between the counts of two neighbouring figures."]);

// 14. L3, 8.23, CR 2: fractional step size, solve for n or total at a large stage.
E("u6-pattern-large", 6, ["8.23"], 3, "gen", function () {
  var Fh = ri(8, 24), sh = pick([3, 5, 7]);
  var F = Fh / 2, step = sh / 2;
  var c2 = (Fh + sh) / 2, c3 = (Fh + 2 * sh) / 2;
  var ctx = pick([
    "A training plan grows each week. The Week 1 ride is " + fmt(F) + " km long, and each week the ride is " + fmt(step) + " km longer than the week before.",
    "A young plant is measured each week. In Week 1 it is " + fmt(F) + " cm tall, and it grows " + fmt(step) + " cm each week."
  ]);
  var unit = ctx.indexOf("ride") >= 0 ? "km" : "cm";
  if (Math.random() < 0.5) {
    var nT = ri(15, 36), T = (Fh + sh * (nT - 1)) / 2;
    var promptA = ctx + " In which week does the value reach exactly " + fmt(T) + " " + unit + "?";
    var solA = "Let \\(n\\) be the week number. The first value is " + fmt(F) + " and the step is " + fmt(step) + ": \\[ \\begin{aligned} " + fmt(F) + " + " + fmt(step) + "(n - 1) &= " + fmt(T) + " \\\\ " + fmt(step) + "(n - 1) &= " + fmt(T) + " - " + fmt(F) + " = " + fmt(T - F) + " \\\\ n - 1 &= " + fmt((T - F) / step) + " \\\\ n &= " + fmt(nT) + " \\end{aligned} \\] So the value reaches " + fmt(T) + " " + unit + " in <b>Week " + fmt(nT) + "</b>.";
    return numq(promptA, nT, 0.01, solA, { mode: "pattern-large-solve", Fh: Fh, sh: sh, nT: nT, unit: unit });
  }
  var N = ri(24, 60), ans = (Fh + sh * (N - 1)) / 2;
  var promptB = ctx + " What is the value in Week " + N + ", in " + unit + "?";
  var solB = "The first value is " + fmt(F) + " and the step is " + fmt(step) + ", so Week \\(n\\) has value " + fmt(F) + " plus the step taken \\(n - 1\\) times: \\[ \\begin{aligned} \\text{value} &= " + fmt(F) + " + " + fmt(step) + "(" + N + " - 1) \\\\ &= " + fmt(F) + " + " + fmt(step) + "(" + (N - 1) + ") \\\\ &= " + fmt(F) + " + " + fmt(step * (N - 1)) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the value in Week " + N + " is <b>" + fmt(ans) + " " + unit + "</b>.";
  return numq(promptB, ans, 0.01, solB, { mode: "pattern-large-total", Fh: Fh, sh: sh, N: N, unit: unit });
}, ["Write the pattern as a first value plus a step taken once for each move to the next week.", "When solving for the week, undo the steps in reverse: subtract the first value, divide by the step, then add 1."]);

// Unit 7: Similarity and Transformations (Math 9, NL). Entries only; helpers prefixed u7.
function u7T(x, y, str, size, bold, anchor) {
  return '<text x="' + fmt(x, 1) + '" y="' + fmt(y, 1) + '" font-size="' + (size || 13) + '" fill="' + FIG_INK + '" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="' + (anchor || "middle") + '" dominant-baseline="central"' + (bold ? ' font-weight="bold"' : "") + '>' + str + '</text>';
}
function u7Svg(W, H, body, aria) {
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + aria + '">' + body + '</svg>';
}
function u7Pts(pts) { return pts.map(function (p) { return fmt(p[0], 1) + "," + fmt(p[1], 1); }).join(" "); }
function u7Poly(pts, fill, dash) {
  return '<polygon points="' + u7Pts(pts) + '" fill="' + (fill || "none") + '" stroke="' + FIG_INK + '" stroke-width="2"' + (dash ? ' stroke-dasharray="6 4"' : "") + '/>';
}
function u7Line(p, q, dash, w, col) {
  return '<line x1="' + fmt(p[0], 1) + '" y1="' + fmt(p[1], 1) + '" x2="' + fmt(q[0], 1) + '" y2="' + fmt(q[1], 1) + '" stroke="' + (col || FIG_INK) + '" stroke-width="' + (w || 2) + '"' + (dash ? ' stroke-dasharray="6 4"' : "") + '/>';
}
function u7Dot(p, r) { return '<circle cx="' + fmt(p[0], 1) + '" cy="' + fmt(p[1], 1) + '" r="' + (r || 3) + '" fill="' + FIG_INK + '"/>'; }
function u7Grid(o) {
  var cell = o.cell || 24, W = (o.xMax - o.xMin) * cell + 40, H = (o.yMax - o.yMin) * cell + 40;
  var ox = 20 - o.xMin * cell, oy = 20 + o.yMax * cell;
  function X(x) { return ox + x * cell; } function Y(y) { return oy - y * cell; }
  var s = "", x, y;
  for (x = o.xMin; x <= o.xMax; x++) s += '<line x1="' + fmt(X(x), 1) + '" y1="' + fmt(Y(o.yMin), 1) + '" x2="' + fmt(X(x), 1) + '" y2="' + fmt(Y(o.yMax), 1) + '" stroke="#d7e0da" stroke-width="1"/>';
  for (y = o.yMin; y <= o.yMax; y++) s += '<line x1="' + fmt(X(o.xMin), 1) + '" y1="' + fmt(Y(y), 1) + '" x2="' + fmt(X(o.xMax), 1) + '" y2="' + fmt(Y(y), 1) + '" stroke="#d7e0da" stroke-width="1"/>';
  s += u7Line([X(o.xMin), Y(0)], [X(o.xMax), Y(0)], false, 2);
  s += u7Line([X(0), Y(o.yMin)], [X(0), Y(o.yMax)], false, 2);
  s += u7T(X(o.xMax) - 6, Y(0) - 11, "x", 13, true) + u7T(X(0) + 11, Y(o.yMax) + 4, "y", 13, true);
  (o.lines || []).forEach(function (L) { s += u7Line([X(L.a[0]), Y(L.a[1])], [X(L.b[0]), Y(L.b[1])], L.dash, L.w || 2, L.col); });
  (o.shapes || []).forEach(function (sh) { s += u7Poly(sh.pts.map(function (p) { return [X(p[0]), Y(p[1])]; }), sh.fill, sh.dash); });
  (o.marks || []).forEach(function (mk) {
    s += u7Dot([X(mk.p[0]), Y(mk.p[1])], 3.2);
    if (mk.label) s += u7T(X(mk.p[0]) + (mk.dx || 10), Y(mk.p[1]) + (mk.dy || -10), mk.label, 13, true);
  });
  (o.labels || []).forEach(function (lb) { s += u7T(X(lb.p[0]) + (lb.dx || 0), Y(lb.p[1]) + (lb.dy || 0), lb.str, lb.size || 13, lb.bold); });
  return u7Svg(W, H, s, o.aria || "Diagram on a grid");
}
function u7TriCoords(sides) {
  var a = sides[0], b = sides[1], c = sides[2];
  var cx = (b * b + c * c - a * a) / (2 * c);
  var h = Math.sqrt(Math.max(b * b - cx * cx, 0.01));
  return [[0, 0], [c, 0], [cx, h]];
}
function u7FitTri(sides, bx, by, bw, bh) {
  var pts = u7TriCoords(sides);
  var xs = pts.map(function (p) { return p[0]; }), ys = pts.map(function (p) { return p[1]; });
  var w = Math.max.apply(null, xs) - Math.min.apply(null, xs), h = Math.max.apply(null, ys) - Math.min.apply(null, ys);
  var sc = Math.min(bw / Math.max(w, 0.01), bh / Math.max(h, 0.01));
  var cx = (Math.max.apply(null, xs) + Math.min.apply(null, xs)) / 2, cy = (Math.max.apply(null, ys) + Math.min.apply(null, ys)) / 2;
  return pts.map(function (p) { return [bx + bw / 2 + (p[0] - cx) * sc, by + bh / 2 - (p[1] - cy) * sc]; });
}
function u7TriLabels(P, letters, angs, sides) {
  var G = [(P[0][0] + P[1][0] + P[2][0]) / 3, (P[0][1] + P[1][1] + P[2][1]) / 3], s = "", i;
  for (i = 0; i < 3; i++) {
    var V = P[i], dx = V[0] - G[0], dy = V[1] - G[1], dl = Math.sqrt(dx * dx + dy * dy) || 1;
    s += u7T(V[0] + dx / dl * 15, V[1] + dy / dl * 15, letters[i], 14, true);
    var bx2 = G[0] - V[0], by2 = G[1] - V[1], bl = Math.sqrt(bx2 * bx2 + by2 * by2) || 1;
    if (angs) s += u7T(V[0] + bx2 / bl * 21, V[1] + by2 / bl * 21, angs[i] + "°", 12, false);
  }
  if (sides) {
    var seg = [[1, 2], [2, 0], [0, 1]];
    for (i = 0; i < 3; i++) {
      var M = [(P[seg[i][0]][0] + P[seg[i][1]][0]) / 2, (P[seg[i][0]][1] + P[seg[i][1]][1]) / 2];
      var ox2 = M[0] - G[0], oy2 = M[1] - G[1], ol = Math.sqrt(ox2 * ox2 + oy2 * oy2) || 1;
      s += u7T(M[0] + ox2 / ol * 15, M[1] + oy2 / ol * 15, sides[i], 12, false);
    }
  }
  return s;
}
function u7Coord(p) { return "(" + fmt(p[0]) + ", " + fmt(p[1]) + ")"; }

// 1. 10.8 L1 var: what a stated scale means in media and real-life contexts.

/* ----- bank-u7.js ----- */
// Math 9 Unit 7 Similarity and Transformations question bank
// Cut verbatim from the standalone bank source
// (math-9-review/bank-src.js, lines 3750 to 4729).
// CRMARKS: u7-scale-draw-num=3
// CRMARKS: u7-draw-similar-num=3
// CRMARKS: u7-similar-context-num=3
// CRMARKS: u7-similar-two-step-num=3
// CRMARKS: u7-indirect-measure-num=2
// CRMARKS: u7-complete-half=2
// CRMARKS: u7-translation-rule=2
E("u7-scale-media-var", 7, ["10.8"], 1, "var", varset([
  function () {
    return mcq("A trail map in a park guide uses the scale 1 cm represents 5 km. What does this scale mean?",
      { t: "Each 1 cm on the map stands for 5 km on the ground.", fb: "Correct. The first number is the map length and the second is the real length." },
      [
        { t: "Each 5 cm on the map stands for 1 km on the ground.", fb: "That swaps the two numbers in the scale." },
        { t: "Each 1 cm on the ground stands for 5 km on the map.", fb: "That reverses the map and the ground." },
        { t: "The map is 5 times as large as the park it shows.", fb: "A map is a reduction, so it is smaller than the real park." }
      ],
      "In a scale, the map length comes first: 1 cm on the map matches 5 km in real life. So the scale means <b>each 1 cm on the map stands for 5 km on the ground</b>.",
      { mode: "scale-map" });
  },
  function () {
    return mcq("A photo is enlarged with a scale factor of 2. A scale factor compares the image length to the original length. What does scale factor 2 mean for the photo?",
      { t: "Every length in the enlargement is 2 times the matching length in the photo.", fb: "Correct. Scale factor 2 doubles every matching length." },
      [
        { t: "Every length in the enlargement is 2 cm longer than in the photo beside it.", fb: "A scale factor multiplies lengths; it does not add centimetres." },
        { t: "Every length in the enlargement is half the matching length in the photo.", fb: "Half would be a scale factor of 0.5, not 2." },
        { t: "Only the longest side of the photo is doubled in the printed copy shown.", fb: "A scale factor applies to every length, not just one side." }
      ],
      "The scale factor multiplies every length: \\[ \\begin{aligned} \\text{image length} &= 2 \\times \\text{original length} \\end{aligned} \\] So <b>every length in the enlargement is 2 times the matching length in the photo</b>.",
      { mode: "scale-photo" });
  },
  function () {
    return mcq("A blueprint of a classroom shows the scale 2 cm represents 1 m. What does this scale mean?",
      { t: "Each 2 cm on the blueprint stands for 1 m in the real classroom.", fb: "Correct. The drawing length is given first, then the real length." },
      [
        { t: "Each 1 cm on the blueprint stands for 2 m in the real classroom.", fb: "That swaps the two numbers in the scale." },
        { t: "The real classroom is 2 cm long for each metre on the blueprint.", fb: "That mixes up which length belongs to the drawing." },
        { t: "The blueprint is larger than the real classroom it shows.", fb: "A blueprint is a reduction, so it is smaller than the room." }
      ],
      "The first number belongs to the drawing and the second to the real room. So the scale means <b>each 2 cm on the blueprint stands for 1 m in the real classroom</b>.",
      { mode: "scale-blueprint" });
  },
  function () {
    return mcq("A model car is built to a scale of 1 : 24. The first number is the model length and the second is the real car length. What does this scale mean?",
      { t: "The real car is 24 times as long as the model.", fb: "Correct. Every model length is multiplied by 24 to get the real length." },
      [
        { t: "The model is 24 times as long as the real car.", fb: "That reverses the scale; the model is the smaller one." },
        { t: "The real car is 24 cm longer than the model.", fb: "A scale multiplies lengths; it does not add 24 cm." },
        { t: "The model and the real car are the same size.", fb: "A scale of 1 : 24 means the sizes differ by a factor of 24." }
      ],
      "Matching lengths follow \\[ \\begin{aligned} \\text{real length} &= 24 \\times \\text{model length} \\end{aligned} \\] So <b>the real car is 24 times as long as the model</b>.",
      { mode: "scale-model-car" });
  },
  function () {
    return mcq("A poster is printed from a small drawing using a scale factor of 0.5. What does scale factor 0.5 mean for the poster?",
      { t: "Every length on the poster is half the matching length on the drawing.", fb: "Correct. A scale factor below 1 makes a reduction." },
      [
        { t: "Every length on the poster is 0.5 cm longer than on the drawing.", fb: "A scale factor multiplies lengths; it does not add centimetres." },
        { t: "Every length on the poster is twice the matching length on the drawing.", fb: "Twice would be a scale factor of 2, not 0.5." },
        { t: "The poster has half as many sides as the drawing it was printed from.", fb: "A reduction keeps the same shape; only the lengths change." }
      ],
      "The image length is the original length times the scale factor: \\[ \\begin{aligned} \\text{image length} &= 0.5 \\times \\text{original length} \\end{aligned} \\] So <b>every length on the poster is half the matching length on the drawing</b>.",
      { mode: "scale-poster" });
  },
  function () {
    return mcq("A town website shows a map with the scale 1 : 50 000. The first number is the map length and the second is the real length, in the same units. What does this scale mean?",
      { t: "A distance of 1 unit on the map stands for 50 000 units in real life.", fb: "Correct. Both numbers use the same unit, and the real distance is much larger." },
      [
        { t: "A distance of 50 000 units on the map stands for 1 unit in real life.", fb: "That swaps the two numbers in the scale." },
        { t: "The map is 50 000 times as large as the town it shows.", fb: "A map is a reduction, so it is far smaller than the town." },
        { t: "Every real distance is 50 000 cm long, whatever the map shows.", fb: "The scale gives a ratio, not one fixed real distance." }
      ],
      "Read the ratio in order, map first and real life second. So the scale means <b>a distance of 1 unit on the map stands for 50 000 units in real life</b>.",
      { mode: "scale-web-map" });
  }
]), ["In a scale, decide which number belongs to the drawing and which to real life.", "The scale factor is image length divided by original length; below 1 means smaller, above 1 means larger."]);

// 2. 10.16 L2 gen num with figure, CR 3: redraw with a scale factor, find one image side.
E("u7-scale-draw-num", 7, ["10.16"], 1, "gen", function () {
  var ks = [0.5, 1.5, 2, 2.5, 3];
  var k = pick(ks), kind = pick(["rect", "tri"]);
  var word = k < 1 ? "reduction" : "enlargement";
  if (kind === "rect") {
    var w = ri(3, 9), h = ri(2, 7), askW = Math.random() < 0.5;
    var side = askW ? w : h, ans = Math.round(side * k * 100) / 100;
    var u = Math.min(24, 220 / w, 110 / h), x0 = 60, y0 = 40;
    var body = u7Poly([[x0, y0], [x0 + w * u, y0], [x0 + w * u, y0 + h * u], [x0, y0 + h * u]], FIG_SHADE);
    body += u7T(x0 + w * u / 2, y0 - 14, fmt(w) + " cm", 13, false);
    body += u7T(x0 + w * u + 26, y0 + h * u / 2, fmt(h) + " cm", 13, false);
    body += u7T(x0 + w * u / 2, y0 + h * u + 20, "Original", 13, true);
    var q = numq("The diagram shows a rectangle. It is redrawn as a " + word + " with scale factor " + fmt(k) + ". How long is the side of the image that matches the " + fmt(side) + " cm side, in centimetres?",
      ans, 0.01,
      "Multiply the original side by the scale factor: \\[ \\begin{aligned} \\text{image side} &= " + fmt(side) + " \\times " + fmt(k) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the matching side of the image is <b>" + fmt(ans) + " cm</b>.",
      { mode: "draw-rect", w: w, h: h, k: k, side: side });
    q.figure = u7Svg(340, 200, body, "Rectangle with labelled sides");
    return q;
  }
  var a = ri(3, 10), b = ri(3, 10), askA = Math.random() < 0.5;
  var side2 = askA ? a : b, ans2 = Math.round(side2 * k * 100) / 100;
  var u2 = Math.min(24, 220 / a, 120 / b), x1 = 60, y1 = 160;
  var body2 = u7Poly([[x1, y1], [x1 + a * u2, y1], [x1, y1 - b * u2]], FIG_SHADE);
  body2 += u7T(x1 + a * u2 / 2, y1 + 18, fmt(a) + " cm", 13, false);
  body2 += u7T(x1 - 26, y1 - b * u2 / 2, fmt(b) + " cm", 13, false);
  body2 += u7T(x1 + a * u2 / 2, y1 - b * u2 - 16, "Original", 13, true);
  var q2 = numq("The diagram shows a right triangle. It is redrawn as a " + word + " with scale factor " + fmt(k) + ". How long is the side of the image that matches the " + fmt(side2) + " cm side, in centimetres?",
    ans2, 0.01,
    "Multiply the original side by the scale factor: \\[ \\begin{aligned} \\text{image side} &= " + fmt(side2) + " \\times " + fmt(k) + " \\\\ &= " + fmt(ans2) + " \\end{aligned} \\] So the matching side of the image is <b>" + fmt(ans2) + " cm</b>.",
    { mode: "draw-tri", a: a, b: b, k: k, side: side2 });
  q2.figure = u7Svg(340, 200, body2, "Right triangle with labelled sides");
  return q2;
}, ["The image side is the original side multiplied by the scale factor.", "Find the given side in the diagram, then multiply it by the scale factor."]);

// 3. 10.17 L1 gen num: scale factor from a pair of corresponding lengths.
E("u7-scale-factor-num", 7, ["10.17"], 1, "gen", function () {
  var pairs = [[1, 4], [2, 5], [1, 2], [3, 5], [3, 4], [6, 5], [5, 4], [3, 2], [8, 5], [2, 1], [5, 2], [3, 1], [4, 1]];
  var pr = pick(pairs), p = pr[0], d = pr[1], m = ri(2, 10);
  var orig = d * m, img = p * m, ans = Math.round(p / d * 100) / 100;
  var ctxs = [["A drawing of a sunflower is ", " cm tall. The real sunflower is ", " cm tall."],
            ["A model boat is ", " cm long. The real boat is ", " cm long."],
            ["A photo print is ", " cm wide. The screen image it came from is ", " cm wide."]];
  var c = pick(ctxs);
  var prompt, oLen, iLen;
  if (Math.random() < 0.5) { oLen = orig; iLen = img; } else { oLen = orig; iLen = img; }
  prompt = c[0] + fmt(iLen) + c[1] + fmt(oLen) + c[2] + " The first length is the image and the second is the original. What is the scale factor for the diagram? Give the scale factor as a decimal or whole number.";
  var sol = "The scale factor is the image length divided by the original length: \\[ \\begin{aligned} \\text{scale factor} &= " + fmt(iLen) + " \\div " + fmt(oLen) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the scale factor is <b>" + fmt(ans) + "</b>.";
  var q = numq(prompt, ans, 0.01, sol, { mode: "scale-factor", orig: oLen, img: iLen });
    q.figure = solBarsFig([{ name: "Image", len: iLen, lab: fmt(iLen) + " cm" }, { name: "Original", len: oLen, lab: fmt(oLen) + " cm" }], "Image and original lengths as bars");
    return q;
}, ["Scale factor is image length divided by original length.", "Put the image length first, then divide by the original length."]);

// 4. 10.18 L2 gen MC with figure: is the second rectangle proportional, and with what scale factor?
E("u7-proportional-check", 7, ["10.18"], 2, "gen", function () {
  for (var att = 0; att < 200; att++) {
    var w = ri(3, 8), h = ri(2, 6);
    if (w === h) continue;
    var k = pick([0.5, 1.5, 2, 2.5, 3]);
    var prop = Math.random() < 0.5;
    var iw = Math.round(w * k * 10) / 10, ih = Math.round(h * k * 10) / 10;
    if (!prop) { ih = Math.round((ih + pick([-2, -1, 1, 2])) * 10) / 10; if (ih <= 0) continue; if (Math.abs(ih / h - k) < 0.01) continue; }
    var u = Math.min(14, 115 / Math.max(w, iw), 95 / Math.max(h, ih));
    var body = u7Poly([[30, 45], [30 + w * u, 45], [30 + w * u, 45 + h * u], [30, 45 + h * u]], FIG_SHADE);
    body += u7Poly([[195, 45], [195 + iw * u, 45], [195 + iw * u, 45 + ih * u], [195, 45 + ih * u]], "#ffffff");
    body += u7T(30 + w * u / 2, 31, fmt(w) + " cm", 12, false) + u7T(30 + w * u / 2, 45 + h * u + 18, "Original", 12, true);
    body += u7T(30 + w * u + 15, 45 + h * u / 2, fmt(h) + " cm", 12, false);
    body += u7T(195 + iw * u / 2, 31, fmt(iw) + " cm", 12, false) + u7T(195 + iw * u / 2, 45 + ih * u + 18, "Second", 12, true);
    body += u7T(195 + iw * u + 15, 45 + ih * u / 2, fmt(ih) + " cm", 12, false);
    var fig = u7Svg(345, 195, body, "An original rectangle and a second rectangle with labelled sides");
    var prompt = "The diagram shows an original rectangle and a second rectangle. Which statement about the second rectangle is true?";
    var sol, q;
    if (prop) {
      sol = "Check both side ratios: \\[ \\begin{aligned} " + fmt(iw) + " \\div " + fmt(w) + " &= " + fmt(k) + " \\\\ " + fmt(ih) + " \\div " + fmt(h) + " &= " + fmt(k) + " \\end{aligned} \\] Both ratios match, so the second rectangle is <b>proportional to the original, with scale factor " + fmt(k) + "</b>.";
      q = mcq(prompt,
        { t: "It is proportional to the original, with scale factor " + fmt(k) + ".", fb: "Correct. Both side ratios equal " + fmt(k) + "." },
        [
          { t: "It is proportional to the original, with scale factor " + fmt(Math.round(1 / k * 100) / 100) + ".", fb: "That divides the original by the image; the scale factor is image divided by original." },
          { t: "It is proportional to the original, with scale factor " + fmt(k + 1) + ".", fb: "Check a ratio: " + fmt(iw) + " divided by " + fmt(w) + " is not " + fmt(k + 1) + "." },
          { t: "It is not proportional, because the side ratios do not match.", fb: "The ratios do match here; divide each image side by its matching original side." }
        ], sol, { mode: "prop-yes", w: w, h: h, k: k, iw: iw, ih: ih });
    } else {
      var r1 = Math.round(iw / w * 100) / 100, r2 = Math.round(ih / h * 100) / 100;
      sol = "Check both side ratios: \\[ \\begin{aligned} " + fmt(iw) + " \\div " + fmt(w) + " &= " + fmt(r1) + " \\\\ " + fmt(ih) + " \\div " + fmt(h) + " &= " + fmt(r2) + " \\end{aligned} \\] The ratios differ, so the second rectangle is <b>not proportional, because the side ratios do not match</b>.";
      q = mcq(prompt,
        { t: "It is not proportional, because the side ratios do not match.", fb: "Correct. The two ratios are " + fmt(r1) + " and " + fmt(r2) + ", which differ." },
        [
          { t: "It is proportional to the original, with scale factor " + fmt(r1) + ".", fb: "That uses only the first pair of sides; the second pair gives a different ratio." },
          { t: "It is proportional to the original, with scale factor " + fmt(r2) + ".", fb: "That uses only the second pair of sides; the first pair gives a different ratio." },
          { t: "It is not proportional, because the angles are different.", fb: "Both shapes are rectangles, so all angles are 90 degrees; the side ratios are the problem." }
        ], sol, { mode: "prop-no", w: w, h: h, k: k, iw: iw, ih: ih });
    }
    q.figure = fig;
    return q;
  }
  var qf = mcq("The diagram shows an original rectangle and a second rectangle. Which statement about the second rectangle is true?",
    { t: "It is proportional to the original, with scale factor 2.", fb: "Correct. Both side ratios equal 2." },
    [
      { t: "It is proportional to the original, with scale factor 0.5.", fb: "That divides the original by the image." },
      { t: "It is proportional to the original, with scale factor 3.", fb: "Check a ratio: 8 divided by 4 is not 3." },
      { t: "It is not proportional, because the side ratios do not match.", fb: "The ratios do match here." }
    ], "Both ratios equal 2, so the second rectangle is <b>proportional to the original, with scale factor 2</b>.", { mode: "prop-yes", w: 4, h: 3, k: 2, iw: 8, ih: 6 });
  qf.figure = u7Svg(345, 195, u7Poly([[30, 45], [86, 45], [86, 87], [30, 87]], FIG_SHADE) + u7Poly([[195, 45], [307, 45], [307, 129], [195, 129]], "#ffffff") + u7T(58, 31, "4 cm", 12, false) + u7T(251, 31, "8 cm", 12, false) + u7T(101, 66, "3 cm", 12, false) + u7T(322, 87, "6 cm", 12, false) + u7T(58, 105, "Original", 12, true) + u7T(251, 147, "Second", 12, true), "An original rectangle and a second rectangle with labelled sides");
  return qf;
}, ["A diagram is proportional when every image side divided by its matching original side gives the same ratio.", "Divide the first pair of sides, then divide the second pair, and compare the two ratios."]);

// 5. 10.7 L2 gen MC with figure: similar or not, with the correct reason.
E("u7-similar-verdict", 7, ["10.7"], 1, "gen", function () {
  var triples = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [5, 5, 6], [5, 5, 8], [8, 15, 17]];
  function angsOf(s) {
    function ang(opp, x, y) { var v = (x * x + y * y - opp * opp) / (2 * x * y); v = Math.max(-1, Math.min(1, v)); return Math.round(Math.acos(v) * 180 / Math.PI); }
    return [ang(s[0], s[1], s[2]), ang(s[1], s[0], s[2]), ang(s[2], s[0], s[1])];
  }
  for (var att = 0; att < 200; att++) {
    var tr = pick(triples), angs = angsOf(tr);
    if (angs[0] + angs[1] + angs[2] !== 180) continue;
    var k = pick([1.5, 2, 2.5, 3]);
    var img = tr.map(function (s) { return Math.round(s * k * 10) / 10; });
    var mode = pick(["similar", "angles", "sides"]);
    var angs2 = angs.slice(), img2 = img.slice();
    if (mode === "angles") { angs2 = [angs[0] + 10, angs[1] - 10, angs[2]]; if (angs2[1] < 10) continue; }
    if (mode === "sides") { img2 = [img[0], img[1], Math.round((img[2] + 2) * 10) / 10]; }
    var P1 = u7FitTri(tr, 8, 18, 150, 140), P2 = u7FitTri(img2, 182, 18, 150, 140);
    var body = u7Poly(P1, FIG_SHADE) + u7Poly(P2, "#ffffff");
    body += u7TriLabels(P1, ["A", "B", "C"], angs, tr.map(function (s) { return fmt(s); }));
    body += u7TriLabels(P2, ["D", "E", "F"], angs2, img2.map(function (s) { return fmt(s); }));
    var fig = u7Svg(345, 185, body, "Two triangles with side and angle labels");
    var prompt = "Use the labels in the diagram. Which statement about triangles ABC and DEF is correct?";
    var simT = "They are similar, because matching angles are equal and matching sides are in proportion.";
    var angT = "They are not similar, because the matching angles are not all equal.";
    var sideT = "They are not similar, because matching sides are not in proportion.";
    var congT = "They are congruent, because they have the same angles.";
    var sol, q;
    if (mode === "similar") {
      sol = "The angles match, and the side ratios agree: \\[ \\begin{aligned} " + fmt(img[0]) + " \\div " + fmt(tr[0]) + " &= " + fmt(k) + " \\\\ " + fmt(img[1]) + " \\div " + fmt(tr[1]) + " &= " + fmt(k) + " \\\\ " + fmt(img[2]) + " \\div " + fmt(tr[2]) + " &= " + fmt(k) + " \\end{aligned} \\] So <b>they are similar, because matching angles are equal and matching sides are in proportion</b>.";
      q = mcq(prompt, { t: simT, fb: "Correct. Equal angles and one shared side ratio show similarity." },
        [{ t: angT, fb: "The angle labels do match here; compare them vertex by vertex." }, { t: sideT, fb: "The side ratios do match here; each one equals " + fmt(k) + "." }, { t: congT, fb: "Same angles alone do not make triangles congruent; the sides here are scaled, not equal." }],
        sol, { mode: "verdict-similar", tr: tr.join(","), k: k });
    } else if (mode === "angles") {
      sol = "Compare the angles: triangle ABC has an angle of " + angs[0] + " degrees where triangle DEF has " + angs2[0] + " degrees. Similar polygons need all matching angles equal, so <b>they are not similar, because the matching angles are not all equal</b>.";
      q = mcq(prompt, { t: angT, fb: "Correct. One pair of matching angles differs, so the triangles cannot be similar." },
        [{ t: simT, fb: "Check the angle labels again; one pair of matching angles differs." }, { t: sideT, fb: "The sides are in proportion here; the angles are the problem." }, { t: congT, fb: "The angles are not all the same, and the sides are scaled, not equal." }],
        sol, { mode: "verdict-angles", tr: tr.join(","), k: k });
    } else {
      sol = "The angles match, but the side ratios do not: \\[ \\begin{aligned} " + fmt(img2[0]) + " \\div " + fmt(tr[0]) + " &= " + fmt(k) + " \\\\ " + fmt(img2[2]) + " \\div " + fmt(tr[2]) + " &= " + fmt(Math.round(img2[2] / tr[2] * 100) / 100) + " \\end{aligned} \\] The ratios differ, so <b>they are not similar, because matching sides are not in proportion</b>.";
      q = mcq(prompt, { t: sideT, fb: "Correct. The angles match, but one side ratio differs from the others." },
        [{ t: simT, fb: "Check every side ratio; one of them differs from the rest." }, { t: angT, fb: "The angle labels do match here; compare them vertex by vertex." }, { t: congT, fb: "Same angles alone do not make triangles congruent; the sides here are scaled, not equal." }],
        sol, { mode: "verdict-sides", tr: tr.join(","), k: k });
    }
    q.figure = fig;
    return q;
  }
  return mcq("Use the labels in the diagram. Which statement about the two triangles is correct?",
    { t: "They are similar, because matching angles are equal and matching sides are in proportion.", fb: "Correct." },
    [{ t: "They are not similar, because the matching angles are not all equal.", fb: "The angle labels match here." }, { t: "They are not similar, because matching sides are not in proportion.", fb: "The side ratios match here." }, { t: "They are congruent, because they have the same angles.", fb: "Same angles alone do not show congruence." }],
    "The angles match and every side ratio is 2, so <b>they are similar</b>.", { mode: "verdict-similar", tr: "3,4,5", k: 2 });
}, ["Similar polygons need both checks: equal matching angles and proportional matching sides.", "First compare the angle labels, then divide each image side by its matching original side."]);

// 6. 10.7 L3 gen MC: three pairs in text, choose the pair that is similar.
E("u7-similar-pair", 7, ["10.7"], 3, "gen", function () {
  var triBases = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [5, 5, 6], [8, 15, 17]];
  var quadBases = [[2, 3, 4, 5], [3, 4, 5, 6], [2, 4, 5, 7], [4, 5, 6, 8]];
  function sortedStr(arr) { return arr.slice().sort(function (x, y) { return x - y; }).map(function (v) { return fmt(v); }).join(", "); }
  function ratiosOK(a, b) {
    var sa = a.slice().sort(function (x, y) { return x - y; }), sb = b.slice().sort(function (x, y) { return x - y; });
    var r = sb[0] / sa[0];
    for (var i = 1; i < sa.length; i++) { if (Math.abs(sb[i] / sa[i] - r) > 0.001) return false; }
    return true;
  }
  for (var att = 0; att < 300; att++) {
    var useQuad = Math.random() < 0.4;
    var base = useQuad ? pick(quadBases) : pick(triBases);
    var k = pick([1.5, 2, 2.5, 3]);
    var simImg = base.map(function (s) { return Math.round(s * k * 10) / 10; });
    function badPair() {
      var b2 = useQuad ? pick(quadBases) : pick(triBases);
      var k2 = pick([1.5, 2, 2.5, 3]);
      var im = b2.map(function (s) { return Math.round(s * k2 * 10) / 10; });
      var idx = ri(0, im.length - 1);
      im[idx] = Math.round((im[idx] + pick([-2, -1, 1, 2])) * 10) / 10;
      if (im[idx] <= 0) return null;
      if (ratiosOK(b2, im)) return null;
      return { a: b2, b: im };
    }
    var bad1 = badPair(), bad2 = badPair();
    if (!bad1 || !bad2) continue;
    var pairs = [
      { a: base, b: simImg, good: true, tag: "sim" },
      { a: bad1.a, b: bad1.b, good: false, tag: "b1" },
      { a: bad2.a, b: bad2.b, good: false, tag: "b2" }
    ];
    pairs = shuffle(pairs);
    var texts = pairs.map(function (pr, i) { return "Pair " + (i + 1) + ": " + sortedStr(pr.a) + " cm and " + sortedStr(pr.b) + " cm"; });
    if (new Set(texts).size < 3) continue;
    var gi = pairs.findIndex(function (pr) { return pr.good; });
    var opts = texts.map(function (t, i) {
      return { t: t, fb: i === gi ? "Correct. Sorting each list and dividing gives one shared ratio of " + fmt(k) + "." : "Sort both lists and divide matching sides; the ratios in this pair are not all equal." };
    });
    var corr = opts[gi], rest = opts.filter(function (o, i) { return i !== gi; });
    rest.push({ t: "None of the three pairs is similar.", fb: "One pair does share a single ratio for every side; check Pair " + (gi + 1) + " again." });
    var sb = base.slice().sort(function (x, y) { return x - y; }), si = simImg.slice().sort(function (x, y) { return x - y; });
    var chain = sb.map(function (s, i) { return fmt(si[i]) + " \\div " + fmt(s) + " &= " + fmt(k); }).join(" \\\\ ");
    var sol = "For the similar pair, sort the sides in each list, then divide matching sides: \\[ \\begin{aligned} " + chain + " \\end{aligned} \\] Every ratio is the same, so <b>Pair " + (gi + 1) + " is the similar pair</b>. In each other pair, one ratio breaks the pattern.";
    var q = mcq("Three pairs of polygons are listed by their side lengths. Exactly one pair is similar. Which pair is it?",
      corr, rest, sol, { mode: "similar-pair", base: base.join(","), k: k, good: gi });
    var figB = "";
    pairs.forEach(function (pr, i) {
      var by = 10 + i * 60;
      figB += solT(16, by + 25, "Pair " + (i + 1), 11, true);
      var P1 = pr.a.length === 3 ? u7FitTri(pr.a, 34, by, 105, 50) : solQuadPts(pr.a, 34, by, 105, 50);
      var P2 = pr.b.length === 3 ? u7FitTri(pr.b, 196, by, 105, 50) : solQuadPts(pr.b, 196, by, 105, 50);
      if (P1) { figB += u7Poly(P1, FIG_SHADE); figB += pr.a.length === 3 ? solSideLabels(P1, [fmt(pr.a[2]), fmt(pr.a[0]), fmt(pr.a[1])]) : solSideLabels(P1, pr.a.map(function (v) { return fmt(v); })); }
      if (P2) { figB += u7Poly(P2, "#ffffff"); figB += pr.b.length === 3 ? solSideLabels(P2, [fmt(pr.b[2]), fmt(pr.b[0]), fmt(pr.b[1])]) : solSideLabels(P2, pr.b.map(function (v) { return fmt(v); })); }
    });
    q.figure = u7Svg(345, 195, figB, "Three pairs of polygons with side labels");
    return q;
  }
  return mcq("Three pairs of polygons are listed by their side lengths. Exactly one pair is similar. Which pair is it?",
    { t: "Pair 1: 3, 4, 5 cm and 6, 8, 10 cm", fb: "Correct. Every ratio is 2." },
    [{ t: "Pair 2: 3, 4, 5 cm and 6, 8, 11 cm", fb: "The ratios are not all equal in this pair." }, { t: "Pair 3: 5, 5, 6 cm and 10, 10, 13 cm", fb: "The ratios are not all equal in this pair." }, { t: "None of the three pairs is similar.", fb: "Pair 1 shares one ratio for every side." }],
    "Sorting and dividing Pair 1 gives the ratio 2 for every side, so <b>Pair 1 is the similar pair</b>.", { mode: "similar-pair", base: "3,4,5", k: 2, good: 0 });
}, ["Sort the sides in each list from smallest to largest before comparing them.", "Divide each side in the second list by the matching side in the first list; similar pairs give one shared ratio."]);

// 7. 10.14 L2 gen num, CR 3: side of a similar polygon drawn with a given scale factor.
E("u7-draw-similar-num", 7, ["10.14"], 1, "gen", function () {
  var ks = [0.5, 1.5, 2, 2.5, 3];
  var k = pick(ks);
  var isTri = Math.random() < 0.5, sides, pickIdx;
  if (isTri) {
    var tr = pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [5, 5, 8], [9, 12, 15]]);
    var sc = pick([1, 1, 2]);
    sides = tr.map(function (s) { return s * sc; });
  } else {
    sides = [ri(3, 9), ri(3, 9), ri(3, 9), ri(3, 9)];
  }
  pickIdx = ri(0, sides.length - 1);
  var side = sides[pickIdx], ans = Math.round(side * k * 100) / 100;
  var shapeWord = isTri ? "triangle" : "quadrilateral";
  var prompt = "A " + shapeWord + " has sides " + sides.map(function (s) { return fmt(s); }).join(", ") + " cm. A similar " + shapeWord + " is drawn with scale factor " + fmt(k) + ". How long is the side of the new " + shapeWord + " that matches the " + fmt(side) + " cm side, in centimetres?";
  var sol = "Matching sides of similar polygons follow the scale factor: \\[ \\begin{aligned} \\text{new side} &= " + fmt(side) + " \\times " + fmt(k) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the matching side is <b>" + fmt(ans) + " cm</b>.";
  var q = numq(prompt, ans, 0.01, sol, { mode: "draw-similar", sides: sides.join(","), k: k, side: side });
  var figB2 = "";
  if (isTri) {
    var PT = u7FitTri(sides, 95, 22, 160, 125);
    figB2 = u7Poly(PT, FIG_SHADE) + solSideLabels(PT, [fmt(sides[2]) + " cm", fmt(sides[0]) + " cm", fmt(sides[1]) + " cm"]);
  } else {
    var PQ = solQuadPts(sides, 95, 22, 160, 125);
    if (PQ) figB2 = u7Poly(PQ, FIG_SHADE) + solSideLabels(PQ, sides.map(function (v) { return fmt(v) + " cm"; }));
  }
  if (figB2) q.figure = u7Svg(345, 170, figB2, "Polygon with labelled sides");
  return q;
}, ["A similar drawing multiplies every side by the same scale factor.", "Take the named side and multiply it by the scale factor."]);

// 8. 10.15 L2 gen num, CR 3: similar figures in context.
E("u7-similar-context-num", 7, ["10.15"], 2, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var w = pick([8, 10, 12, 15, 20]), k = pick([1.5, 2, 2.5, 3]);
    var h = pick([6, 8, 9, 10, 12, 16]);
    var W = Math.round(w * k * 10) / 10, ans = Math.round(h * k * 100) / 100;
    var prompt = "A photo is " + fmt(w) + " cm wide and " + fmt(h) + " cm tall. It is enlarged so the print is " + fmt(W) + " cm wide, keeping the same shape. How tall is the print, in centimetres?";
    var sol = "The enlargement scale factor comes from the widths: \\[ \\begin{aligned} \\text{scale factor} &= " + fmt(W) + " \\div " + fmt(w) + " = " + fmt(k) + " \\\\ \\text{print height} &= " + fmt(h) + " \\times " + fmt(k) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the print is <b>" + fmt(ans) + " cm</b> tall.";
    var q = numq(prompt, ans, 0.01, sol, { mode: "photo-enlarge", w: w, h: h, k: k });
    q.figure = solRectPair({ w1: w, h1: h, wLab1: fmt(w) + " cm", hLab1: fmt(h) + " cm", cap1: "Photo", w2: W, h2: h * k, wLab2: fmt(W) + " cm", hLab2: "?", cap2: "Print", aria: "A photo and its enlargement with labelled sides" });
    return q;
  }
  if (mode === 1) {
    var real = pick([40, 50, 60, 80, 100]), mod = pick([8, 10, 12, 16, 20]);
    var k2 = mod / real;
    var part = pick([10, 15, 20, 25, 30]);
    var ans2 = Math.round(part * k2 * 100) / 100;
    if (Math.abs(ans2 - Math.round(ans2 * 10) / 10) > 0.001) { part = 20; ans2 = Math.round(part * k2 * 100) / 100; }
    var prompt2 = "A real shed is " + fmt(real) + " m long, and a scale model of it is " + fmt(mod) + " cm long. A door on the real shed is " + fmt(part) + " m wide, measured along the same direction as the lengths. How wide is the door on the model, in centimetres?";
    var sol2 = "The model scale factor is model length divided by real length: \\[ \\begin{aligned} \\text{scale factor} &= " + fmt(mod) + " \\div " + fmt(real) + " = " + fmt(k2) + " \\\\ \\text{model door} &= " + fmt(part) + " \\times " + fmt(k2) + " \\\\ &= " + fmt(ans2) + " \\end{aligned} \\] So the door on the model is <b>" + fmt(ans2) + " cm</b> wide.";
    var q = numq(prompt2, ans2, 0.01, sol2, { mode: "model-door", real: real, mod: mod, part: part });
    var figB = "";
    figB += solPoly([[45, 36], [245, 36], [245, 78], [45, 78]], "#ffffff");
    figB += solPoly([[45, 36], [45 + 200 * part / real, 36], [45 + 200 * part / real, 78], [45, 78]], FIG_SHADE);
    figB += solT(145, 92, fmt(real) + " m", 12, false);
    figB += solT(45 + 100 * part / real, 26, fmt(part) + " m", 11, false);
    figB += solPoly([[85, 116], [205, 116], [205, 146], [85, 146]], "#ffffff");
    figB += solPoly([[85, 116], [85 + 120 * part / real, 116], [85 + 120 * part / real, 146], [85, 146]], FIG_SHADE);
    figB += solT(145, 160, fmt(mod) + " cm", 12, false);
    figB += solT(85 + 60 * part / real, 108, "?", 12, false);
    q.figure = solSvg(340, 172, figB, "A shed and its scale model with the door shaded");
    return q;
  }
  var hp = pick([1.5, 1.6, 1.8]), mult = pick([2, 3, 4, 5]);
  var sp = pick([1, 1.2, 1.5, 2]);
  var sPole = Math.round(sp * mult * 10) / 10, ans3 = Math.round(hp * mult * 100) / 100;
  var prompt3 = "A person " + fmt(hp) + " m tall casts a shadow " + fmt(sp) + " m long. At the same time, a flagpole casts a shadow " + fmt(sPole) + " m long. The pole and its shadow form a triangle similar to the person and shadow triangle. How tall is the flagpole, in metres?";
  var sol3 = "The shadow is " + fmt(mult) + " times as long, so the pole is the same number of times as tall: \\[ \\begin{aligned} " + fmt(sPole) + " \\div " + fmt(sp) + " &= " + fmt(mult) + " \\\\ \\text{pole height} &= " + fmt(hp) + " \\times " + fmt(mult) + " \\\\ &= " + fmt(ans3) + " \\end{aligned} \\] So the flagpole is <b>" + fmt(ans3) + " m</b> tall.";
  var q = numq(prompt3, ans3, 0.01, sol3, { mode: "shadow-pole", hp: hp, sp: sp, mult: mult });
    q.figure = solShadowFig([{ name: "Person", h: hp, s: sp, hLab: fmt(hp) + " m", sLab: fmt(sp) + " m" }, { name: "Flagpole", h: ans3, s: sPole, hLab: "?", sLab: fmt(sPole) + " m" }], "A person and a flagpole with their shadows");
    return q;
}, ["Find the scale factor from the pair of lengths you know, then use it on the matching length.", "Divide the known image length by its matching original length first."]);

// 9. 10.15 L3 gen num, CR 3: two-step similar-figures problems.
E("u7-similar-two-step-num", 7, ["10.15"], 3, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var so = pick([4, 5, 6, 8, 10]), k = pick([1.5, 2, 2.5, 3]);
    var si = Math.round(so * k * 10) / 10;
    var P = pick([24, 30, 36, 40, 44, 48, 52, 60]);
    var ans = Math.round(P * k * 100) / 100;
    var prompt = "Two rectangles are similar. In the smaller rectangle, one side is " + fmt(so) + " cm and the perimeter is " + fmt(P) + " cm. The matching side in the larger rectangle is " + fmt(si) + " cm. What is the perimeter of the larger rectangle, in centimetres?";
    var sol = "First get the scale factor from the matching sides, then apply it to the perimeter: \\[ \\begin{aligned} \\text{scale factor} &= " + fmt(si) + " \\div " + fmt(so) + " = " + fmt(k) + " \\\\ \\text{larger perimeter} &= " + fmt(P) + " \\times " + fmt(k) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the perimeter of the larger rectangle is <b>" + fmt(ans) + " cm</b>.";
    var q = numq(prompt, ans, 0.01, sol, { mode: "perimeter-scale", so: so, si: si, P: P });
    q.figure = solRectPair({ w1: so, h1: P / 2 - so, wLab1: fmt(so) + " cm", hLab1: fmt(P / 2 - so) + " cm", cap1: "Smaller", w2: si, h2: (P / 2 - so) * k, wLab2: fmt(si) + " cm", hLab2: fmt((P / 2 - so) * k) + " cm", cap2: "Larger", aria: "Two similar rectangles with labelled sides" });
    return q;
  }
  if (mode === 1) {
    var w = pick([4, 5, 6, 8]), h = pick([3, 4, 5, 6, 7]);
    var k2 = pick([1.5, 2, 2.5, 3]);
    var W = Math.round(w * k2 * 10) / 10, H = Math.round(h * k2 * 10) / 10;
    var ans2 = Math.round(2 * (W + H) * 100) / 100;
    var prompt2 = "A rectangle is " + fmt(w) + " cm by " + fmt(h) + " cm. A similar rectangle has width " + fmt(W) + " cm. What is the perimeter of the similar rectangle, in centimetres?";
    var sol2 = "Find the scale factor, then the new height, then the perimeter: \\[ \\begin{aligned} \\text{scale factor} &= " + fmt(W) + " \\div " + fmt(w) + " = " + fmt(k2) + " \\\\ \\text{new height} &= " + fmt(h) + " \\times " + fmt(k2) + " = " + fmt(H) + " \\\\ \\text{perimeter} &= 2 \\times (" + fmt(W) + " + " + fmt(H) + ") \\\\ &= " + fmt(ans2) + " \\end{aligned} \\] So the perimeter is <b>" + fmt(ans2) + " cm</b>.";
    var q = numq(prompt2, ans2, 0.01, sol2, { mode: "rect-perimeter", w: w, h: h, k: k2 });
    q.figure = solRectPair({ w1: w, h1: h, wLab1: fmt(w) + " cm", hLab1: fmt(h) + " cm", cap1: "Original", w2: W, h2: H, wLab2: fmt(W) + " cm", hLab2: "?", cap2: "Similar", aria: "A rectangle and a similar rectangle with labelled sides" });
    return q;
  }
  var sA = pick([3, 4, 5, 6]), kA = pick([2, 3]), kB = pick([1.5, 2, 2.5]);
  var sB = sA * kA, ans3 = Math.round(sB * kB * 100) / 100;
  var prompt3 = "Figure A, figure B and figure C are all similar. A side of figure A is " + fmt(sA) + " cm, and the matching side of figure B is " + fmt(sB) + " cm. Figure C is drawn from figure B with scale factor " + fmt(kB) + ". How long is the side of figure C that matches the " + fmt(sA) + " cm side of figure A, in centimetres?";
  var sol3 = "Work through figure B first, then apply the second scale factor: \\[ \\begin{aligned} \\text{side in B} &= " + fmt(sB) + " \\\\ \\text{side in C} &= " + fmt(sB) + " \\times " + fmt(kB) + " \\\\ &= " + fmt(ans3) + " \\end{aligned} \\] So the matching side of figure C is <b>" + fmt(ans3) + " cm</b>.";
  var q = numq(prompt3, ans3, 0.01, sol3, { mode: "chain-scale", sA: sA, sB: sB, kB: kB });
    q.figure = solBarsFig([{ name: "Figure A", len: sA, lab: fmt(sA) + " cm" }, { name: "Figure B", len: sB, lab: fmt(sB) + " cm" }, { name: "Figure C", len: ans3, lab: "?" }], "Matching side lengths of three similar figures as bars");
    return q;
}, ["Split the problem into steps: find a scale factor first, then use it.", "Use the pair of matching lengths you are given to get the scale factor before finding anything else."]);

// 10. 10.19 L3 gen num, CR 2: indirect measurement with similar triangles.
E("u7-indirect-measure-num", 7, ["10.19"], 3, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var hs = pick([1, 1.2, 1.5]), ss = pick([0.8, 1, 1.2, 1.5]);
    var mult = pick([6, 8, 10, 12, 15]);
    var sTree = Math.round(ss * mult * 10) / 10, ans = Math.round(hs * mult * 100) / 100;
    var prompt = "A stick " + fmt(hs) + " m tall casts a shadow " + fmt(ss) + " m long. At the same time, a tree casts a shadow " + fmt(sTree) + " m long. The tree and stick triangles are similar. How tall is the tree, in metres?";
    var sol = "The tree shadow is a multiple of the stick shadow: \\[ \\begin{aligned} " + fmt(sTree) + " \\div " + fmt(ss) + " &= " + fmt(mult) + " \\\\ \\text{tree height} &= " + fmt(hs) + " \\times " + fmt(mult) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the tree is <b>" + fmt(ans) + " m</b> tall.";
    var q = numq(prompt, ans, 0.01, sol, { mode: "tree-shadow", hs: hs, ss: ss, mult: mult });
    q.figure = solShadowFig([{ name: "Stick", h: hs, s: ss, hLab: fmt(hs) + " m", sLab: fmt(ss) + " m" }, { name: "Tree", h: ans, s: sTree, hLab: "?", sLab: fmt(sTree) + " m" }], "A stick and a tree with their shadows");
    return q;
  }
  if (mode === 1) {
    var hp = pick([1.5, 1.6, 1.8]), sp = pick([2, 2.4, 3]);
    var mult2 = pick([8, 10, 12, 15, 20]);
    var sB = Math.round(sp * mult2 * 10) / 10, ans2 = Math.round(hp * mult2 * 100) / 100;
    var prompt2 = "To measure a building, a student " + fmt(hp) + " m tall stands so her shadow is " + fmt(sp) + " m long. The building shadow at the same time is " + fmt(sB) + " m long. Using similar triangles, how tall is the building, in metres?";
    var sol2 = "Compare the shadows first, then scale the height by the same factor: \\[ \\begin{aligned} " + fmt(sB) + " \\div " + fmt(sp) + " &= " + fmt(mult2) + " \\\\ \\text{building height} &= " + fmt(hp) + " \\times " + fmt(mult2) + " \\\\ &= " + fmt(ans2) + " \\end{aligned} \\] So the building is <b>" + fmt(ans2) + " m</b> tall.";
    var q = numq(prompt2, ans2, 0.01, sol2, { mode: "building-shadow", hp: hp, sp: sp, mult: mult2 });
    q.figure = solShadowFig([{ name: "Student", h: hp, s: sp, hLab: fmt(hp) + " m", sLab: fmt(sp) + " m" }, { name: "Building", h: ans2, s: sB, hLab: "?", sLab: fmt(sB) + " m" }], "A student and a building with their shadows");
    return q;
  }
  var d = pick([3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8]), per = pick([6, 8, 10, 12, 15, 20]);
  var ans3 = Math.round(d * per * 100) / 100;
  var prompt3 = "On a scale diagram of a pond, the distance across the pond measures " + fmt(d) + " cm. The diagram scale is 1 cm represents " + fmt(per) + " m. What is the real distance across the pond, in metres?";
  var sol3 = "Multiply the diagram distance by the real length each centimetre stands for: \\[ \\begin{aligned} \\text{real distance} &= " + fmt(d) + " \\times " + fmt(per) + " \\\\ &= " + fmt(ans3) + " \\end{aligned} \\] So the real distance across the pond is <b>" + fmt(ans3) + " m</b>.";
  var q = numq(prompt3, ans3, 0.01, sol3, { mode: "pond-scale", d: d, per: per });
    var figB = '<ellipse cx="170" cy="98" rx="118" ry="52" fill="#ffffff" stroke="' + FIG_INK + '" stroke-width="2"/>';
    figB += solLine([52, 98], [288, 98], true, 1.6);
    figB += solT(170, 72, fmt(d) + " cm", 12, false);
    q.figure = solSvg(340, 175, figB, "Diagram of a pond with the distance across marked");
    return q;
}, ["Set up the matching ratio from the object you can measure, then apply it to the object you cannot.", "Divide the two shadow lengths (or use the diagram scale) to get the factor first."]);

// 11. 10.1 L1 gen MC with figure: lines of symmetry of a drawn shape.
E("u7-lines-symmetry", 7, ["10.1"], 1, "gen", function () {
  function figFor(kind) {
    if (kind === "rect") { var w = ri(90, 140), h = ri(45, 68); return { n: 2, svg: u7Svg(230, 190, u7Poly([[115 - w / 2, 95 - h / 2], [115 + w / 2, 95 - h / 2], [115 + w / 2, 95 + h / 2], [115 - w / 2, 95 + h / 2]], FIG_SHADE), "Shape: rectangle") }; }
    if (kind === "iso") { var b = ri(95, 130), ht = ri(70, 105); return { n: 1, svg: u7Svg(230, 190, u7Poly([[115 - b / 2, 155], [115 + b / 2, 155], [115, 155 - ht]], FIG_SHADE), "Shape: isosceles triangle") }; }
    if (kind === "scal") { var b2 = ri(105, 135), off = ri(12, 30); return { n: 0, svg: u7Svg(230, 190, u7Poly([[115 - b2 / 2, 155], [115 + b2 / 2, 155], [115 - b2 / 2 + off, 50]], FIG_SHADE), "Shape: scalene triangle") }; }
    if (kind === "kite") { var tw = ri(28, 40), bw = ri(46, 60), th = ri(34, 48), bh = ri(62, 82); return { n: 1, svg: u7Svg(230, 200, u7Poly([[115, 15], [115 + tw, 15 + th], [115, 15 + th + bh], [115 - tw, 15 + th]], FIG_SHADE), "Shape: kite") }; }
    if (kind === "arrow") { var t = ri(26, 36); return { n: 1, svg: u7Svg(230, 190, u7Poly([[25, 95 - t / 2], [125, 95 - t / 2], [125, 62], [200, 95], [125, 128], [125, 95 + t / 2], [25, 95 + t / 2]], FIG_SHADE), "Shape: arrow") }; }
    if (kind === "semi") { var r = ri(55, 80); var d = "M " + fmt(115 - r, 1) + " 125 A " + r + " " + r + " 0 0 1 " + fmt(115 + r, 1) + " 125 Z"; return { n: 1, svg: u7Svg(230, 190, '<path d="' + d + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="2"/>', "Shape: semicircle") }; }
    if (kind === "tee") { var w3 = ri(112, 140), bh3 = ri(28, 38), sw = ri(34, 44), tot = ri(112, 132); var x0 = 115 - w3 / 2, sx = 115 - sw / 2; return { n: 1, svg: u7Svg(230, 200, u7Poly([[x0, 30], [x0 + w3, 30], [x0 + w3, 30 + bh3], [sx + sw, 30 + bh3], [sx + sw, 30 + tot], [sx, 30 + tot], [sx, 30 + bh3], [x0, 30 + bh3]], FIG_SHADE), "Shape: letter T block") }; }
    var w4 = ri(80, 100), h4 = ri(112, 132), th4 = ri(30, 40), fh = ri(30, 40);
    return { n: 0, svg: u7Svg(230, 200, u7Poly([[35, 30], [35 + th4, 30], [35 + th4, 30 + h4 - fh], [35 + w4, 30 + h4 - fh], [35 + w4, 30 + h4], [35, 30 + h4]], FIG_SHADE), "Shape: letter L block") };
  }
  var kind = pick(["rect", "iso", "scal", "kite", "arrow", "semi", "tee", "ell"]);
  var f = figFor(kind), n = f.n;
  var candNums = [n + 1, n + 2, n - 1, n + 3, n - 2].filter(function (v) { return v >= 0 && v !== n; });
  var ds = [];
  for (var i = 0; i < candNums.length && ds.length < 3; i++) {
    var v = candNums[i];
    ds.push({ t: fmt(v), fb: v > n ? "That counts fold lines the shape does not have; test each fold in your mind." : "That misses a fold line; check folds through the middle both ways." });
  }
  var q = mcq("How many lines of symmetry does the shape in the diagram have? A line of symmetry is a fold line that makes the two halves match exactly.",
    { t: fmt(n), fb: "Correct. The shape folds exactly onto itself along " + (n === 0 ? "no line" : n === 1 ? "1 line" : fmt(n) + " lines") + "." },
    ds,
    "Fold the shape in your mind each way it might fold. Only folds where the halves match exactly count, and this shape has <b>" + fmt(n) + "</b> such line" + (n === 1 ? "" : "s") + " of symmetry.",
    { mode: "lines-sym", kind: kind, n: n });
  q.figure = f.svg;
  return q;
}, ["Try folding the shape in your mind: vertical, horizontal, and slanted folds.", "A fold counts only when the two halves match exactly, edge for edge."]);

// 12. 10.9 L2 gen MC with figure, CR 2: complete a shape across a line of symmetry on a grid.
E("u7-complete-half", 7, ["10.9"], 1, "gen", function () {
  for (var att = 0; att < 200; att++) {
    var vert = Math.random() < 0.6;
    var m = ri(-1, 2), d = ri(2, 3);
    var py = ri(-3, 4), px, P, Pp, others;
    if (vert) {
      px = m - d; P = [px, py]; Pp = [2 * m - px, py];
      others = [[m, py + ri(2, 3)], [m - ri(1, 2), py + ri(-1, 1)], [m, py - ri(2, 3)]];
    } else {
      px = ri(-3, 4); P = [px, m - d]; Pp = [px, 2 * m - (m - d)];
      others = [[px + ri(2, 3), m], [px + ri(-1, 1), m - ri(1, 2)], [px - ri(2, 3), m]];
    }
    var cand = [Pp, P, vert ? [Pp[0], Pp[1] + 1] : [Pp[0] + 1, Pp[1]], vert ? [Pp[0] + 1, Pp[1]] : [Pp[0], Pp[1] + 1], [P[1], P[0]]];
    var texts = cand.map(u7Coord);
    if (new Set(texts).size < 4) continue;
    var half = vert ? [others[0], others[1], P, others[2]] : [others[0], others[1], P, others[2]];
    var grid = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22,
      lines: vert ? [{ a: [m, -6], b: [m, 6], dash: true, w: 2 }] : [{ a: [-6, m], b: [6, m], dash: true, w: 2 }],
      shapes: [{ pts: half, fill: FIG_SHADE }],
      marks: [{ p: P, label: "P", dx: -12, dy: 0 }],
      aria: "Half of a shape on a grid with a dashed line of symmetry" });
    var prompt = "The diagram shows half of a shape on a grid, with a dashed line of symmetry. Vertex P is at " + u7Coord(P) + ". Which point is the mirror image of P that completes the shape?";
    var sol = vert
      ? "P is " + fmt(d) + " units to the left of the line \\(x = " + fmt(m) + "\\), so its mirror image is " + fmt(d) + " units to the right, at the same height: \\[ \\begin{aligned} x' &= " + fmt(m) + " + " + fmt(d) + " = " + fmt(Pp[0]) + " \\\\ y' &= " + fmt(P[1]) + " \\end{aligned} \\] So the mirror image of P is <b>" + u7Coord(Pp) + "</b>."
      : "P is " + fmt(d) + " units below the line \\(y = " + fmt(m) + "\\), so its mirror image is " + fmt(d) + " units above, in the same column: \\[ \\begin{aligned} y' &= " + fmt(m) + " + " + fmt(d) + " = " + fmt(Pp[1]) + " \\\\ x' &= " + fmt(P[0]) + " \\end{aligned} \\] So the mirror image of P is <b>" + u7Coord(Pp) + "</b>.";
    var q = mcq(prompt,
      { t: u7Coord(Pp), fb: "Correct. It sits the same distance on the other side of the dashed line." },
      [
        { t: u7Coord(cand[1]), fb: "That is P itself; the mirror image must be on the other side of the line." },
        { t: u7Coord(cand[2]), fb: "The distance from the line is right, but the point is shifted one unit along the line." },
        { t: u7Coord(cand[3]), fb: vert ? "That moves P sideways across the line by the wrong amount." : "That moves P across the line by the wrong amount." }
      ], sol, { mode: vert ? "complete-vert" : "complete-horiz", P: P.join(","), Pp: Pp.join(","), m: m });
    q.figure = grid;
    return q;
  }
  var qf = mcq("The diagram shows half of a shape on a grid, with a dashed line of symmetry. Vertex P is at (-2, 1). Which point is the mirror image of P that completes the shape?",
    { t: "(2, 1)", fb: "Correct." },
    [{ t: "(-2, 1)", fb: "That is P itself." }, { t: "(2, 2)", fb: "That is shifted one unit along the line." }, { t: "(1, -2)", fb: "That swaps the coordinates." }],
    "P is 2 units left of the y-axis, so its mirror image is 2 units right at the same height: <b>(2, 1)</b>.", { mode: "complete-vert", P: "-2,1", Pp: "2,1", m: 0 });
  qf.figure = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22, lines: [{ a: [0, -6], b: [0, 6], dash: true, w: 2 }], shapes: [{ pts: [[0, 3], [-1, 2], [-2, 1], [0, -1]], fill: FIG_SHADE }], marks: [{ p: [-2, 1], label: "P", dx: -12, dy: 0 }], aria: "Half of a shape on a grid with a dashed line of symmetry" });
  return qf;
}, ["Count how far P is from the dashed line; the mirror point is the same distance on the other side.", "The mirror point keeps the coordinate along the line and flips the distance across it."]);

// 13. 10.2 L1 var: order and angle of rotation symmetry of familiar shapes.
E("u7-rotation-symmetry-var", 7, ["10.2"], 1, "var", varset([
  function () {
    var q = mcq("A square is turned about its centre. It matches itself 4 times in one full turn. What are its order and angle of rotation symmetry? The order is how many times it matches in a full turn, and the angle is 360 degrees divided by the order.",
      { t: "Order 4, angle 90°", fb: "Correct. 360 divided by 4 is 90." },
      [{ t: "Order 2, angle 180°", fb: "A square matches more often than twice; count the turns that land on a matching position." }, { t: "Order 4, angle 45°", fb: "The angle is 360 divided by the order, and 360 divided by 4 is 90, not 45." }, { t: "It has no rotation symmetry", fb: "A square does match itself when turned by part of a full turn." }],
      "Divide a full turn by the order: \\[ \\begin{aligned} 360° \\div 4 &= 90° \\end{aligned} \\] So the square has <b>order 4, angle 90°</b>.",
      { mode: "rot-square" });
    q.figure = polySVG(4);
    return q;
  },
  function () {
    var q = mcq("What are the order and angle of rotation symmetry of an equilateral triangle, turned about its centre? The order is how many times it matches itself in a full turn, and the angle is 360 degrees divided by the order.",
      { t: "Order 3, angle 120°", fb: "Correct. 360 divided by 3 is 120." },
      [{ t: "Order 3, angle 90°", fb: "The angle is 360 divided by the order, and 360 divided by 3 is 120, not 90." }, { t: "Order 6, angle 60°", fb: "The triangle has 3 matching turns, not 6; count each vertex moving to the next corner." }, { t: "It has no rotation symmetry", fb: "Turning by one third of a full turn makes it match itself." }],
      "Divide a full turn by the order: \\[ \\begin{aligned} 360° \\div 3 &= 120° \\end{aligned} \\] So the equilateral triangle has <b>order 3, angle 120°</b>.",
      { mode: "rot-equi" });
    q.figure = polySVG(3);
    return q;
  },
  function () {
    var q = mcq("What are the order and angle of rotation symmetry of a regular pentagon, turned about its centre? A regular pentagon has 5 equal sides. The order is how many times it matches itself in a full turn, and the angle is 360 degrees divided by the order.",
      { t: "Order 5, angle 72°", fb: "Correct. 360 divided by 5 is 72." },
      [{ t: "Order 5, angle 60°", fb: "The angle is 360 divided by the order, and 360 divided by 5 is 72, not 60." }, { t: "Order 10, angle 36°", fb: "The pentagon matches 5 times in a full turn, once for each vertex." }, { t: "It has no rotation symmetry", fb: "Turning by one fifth of a full turn makes it match itself." }],
      "Divide a full turn by the order: \\[ \\begin{aligned} 360° \\div 5 &= 72° \\end{aligned} \\] So the regular pentagon has <b>order 5, angle 72°</b>.",
      { mode: "rot-pent" });
    q.figure = polySVG(5);
    return q;
  },
  function () {
    var q = mcq("What are the order and angle of rotation symmetry of a regular hexagon, turned about its centre? A regular hexagon has 6 equal sides. The order is how many times it matches itself in a full turn, and the angle is 360 degrees divided by the order.",
      { t: "Order 6, angle 60°", fb: "Correct. 360 divided by 6 is 60." },
      [{ t: "Order 6, angle 120°", fb: "The angle is 360 divided by the order, and 360 divided by 6 is 60, not 120." }, { t: "Order 3, angle 120°", fb: "The hexagon matches 6 times in a full turn, once for each vertex." }, { t: "It has no rotation symmetry", fb: "Turning by one sixth of a full turn makes it match itself." }],
      "Divide a full turn by the order: \\[ \\begin{aligned} 360° \\div 6 &= 60° \\end{aligned} \\] So the regular hexagon has <b>order 6, angle 60°</b>.",
      { mode: "rot-hex" });
    q.figure = polySVG(6);
    return q;
  },
  function () {
    var q = mcq("What are the order and angle of rotation symmetry of a rectangle that is not a square, turned about its centre? The order is how many times it matches itself in a full turn, and the angle is 360 degrees divided by the order.",
      { t: "Order 2, angle 180°", fb: "Correct. Only a half turn makes it match." },
      [{ t: "Order 4, angle 90°", fb: "A quarter turn would put the long sides where the short sides were, so it does not match." }, { t: "Order 2, angle 90°", fb: "The angle is 360 divided by the order, and 360 divided by 2 is 180, not 90." }, { t: "It has no rotation symmetry", fb: "A half turn makes it match itself exactly." }],
      "Divide a full turn by the order: \\[ \\begin{aligned} 360° \\div 2 &= 180° \\end{aligned} \\] So the rectangle has <b>order 2, angle 180°</b>.",
      { mode: "rot-rect" });
    q.figure = u7Svg(230, 190, u7Poly([[45, 60], [185, 60], [185, 130], [45, 130]], FIG_SHADE), "Rectangle");
    return q;
  },
  function () {
    return mcq("The capital letter H is drawn with equal strokes. It is turned about its centre. What are its order and angle of rotation symmetry? The order is how many times it matches itself in a full turn, and the angle is 360 degrees divided by the order.",
      { t: "Order 2, angle 180°", fb: "Correct. A half turn puts the letter back exactly as it started." },
      [{ t: "Order 4, angle 90°", fb: "A quarter turn would stand the letter on its side, so it does not match." }, { t: "Order 2, angle 90°", fb: "The angle is 360 divided by the order, and 360 divided by 2 is 180, not 90." }, { t: "It has no rotation symmetry", fb: "A half turn makes the letter match itself." }],
      "Divide a full turn by the order: \\[ \\begin{aligned} 360° \\div 2 &= 180° \\end{aligned} \\] So the letter H has <b>order 2, angle 180°</b>.",
      { mode: "rot-H" });
  },
  function () {
    return mcq("The capital letter N is turned about its centre. What are its order and angle of rotation symmetry? The order is how many times it matches itself in a full turn, and the angle is 360 degrees divided by the order.",
      { t: "Order 2, angle 180°", fb: "Correct. A half turn flips the diagonal the right way to match." },
      [{ t: "Order 4, angle 90°", fb: "A quarter turn would lay the letter on its side, so it does not match." }, { t: "Order 2, angle 90°", fb: "The angle is 360 divided by the order, and 360 divided by 2 is 180, not 90." }, { t: "It has no rotation symmetry", fb: "A half turn makes the letter match itself exactly." }],
      "Divide a full turn by the order: \\[ \\begin{aligned} 360° \\div 2 &= 180° \\end{aligned} \\] So the letter N has <b>order 2, angle 180°</b>.",
      { mode: "rot-N" });
  }
]), ["For a regular shape, the order equals the number of sides; the angle is 360 degrees divided by the order.", "First find how many turns in a full turn make the shape match, then divide 360 degrees by that number."]);

// 14. 10.10 L2 gen MC with figure: rotate a triangle 90 degrees about one of its vertices.
E("u7-rotate-vertex", 7, ["10.10"], 2, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var V = [ri(-2, 2), ri(-2, 2)];
    var othersL = ["A", "B", "C"];
    var pivotIdx = ri(0, 2);
    var pts = [null, null, null];
    pts[pivotIdx] = V;
    var placed = [V];
    var ok = true;
    for (var i = 0; i < 3; i++) {
      if (i === pivotIdx) continue;
      var p = [ri(-4, 4), ri(-4, 4)];
      var tries = 0;
      while ((p[0] === V[0] && p[1] === V[1]) || placed.some(function (q2) { return q2[0] === p[0] && q2[1] === p[1]; })) { p = [ri(-4, 4), ri(-4, 4)]; if (++tries > 40) { ok = false; break; } }
      if (!ok) break;
      pts[i] = p; placed.push(p);
    }
    if (!ok) continue;
    var area = Math.abs((pts[1][0] - pts[0][0]) * (pts[2][1] - pts[0][1]) - (pts[2][0] - pts[0][0]) * (pts[1][1] - pts[0][1]));
    if (area === 0) continue;
    var askIdx = pick([0, 1, 2].filter(function (i2) { return i2 !== pivotIdx; }));
    var P = pts[askIdx];
    var dx = P[0] - V[0], dy = P[1] - V[1];
    if (dx === 0 && dy === 0) continue;
    var cw = Math.random() < 0.5;
    var img = cw ? [V[0] + dy, V[1] - dx] : [V[0] - dy, V[1] + dx];
    var wrong = cw ? [V[0] - dy, V[1] + dx] : [V[0] + dy, V[1] - dx];
    var aboutOrigin = cw ? [P[1], -P[0]] : [-P[1], P[0]];
    var cand = [img, wrong, aboutOrigin, P];
    if (new Set(cand.map(u7Coord)).size < 4) continue;
    if (img[0] < -6 || img[0] > 6 || img[1] < -6 || img[1] > 6) continue;
    var dirWord = cw ? "clockwise" : "counterclockwise";
    var names = ["A", "B", "C"];
    var prompt = "Triangle ABC has vertices A" + u7Coord(pts[0]) + ", B" + u7Coord(pts[1]) + " and C" + u7Coord(pts[2]) + ". The triangle is rotated 90° " + dirWord + " about vertex " + names[pivotIdx] + ". What are the coordinates of the image of vertex " + names[askIdx] + "?";
    var rotTxt = cw ? "(" + fmt(dx) + ", " + fmt(dy) + ") becomes (" + fmt(dy) + ", " + fmt(-dx) + ")" : "(" + fmt(dx) + ", " + fmt(dy) + ") becomes (" + fmt(-dy) + ", " + fmt(dx) + ")";
    var sol = "Work from the pivot " + names[pivotIdx] + u7Coord(V) + ". The step from the pivot to " + names[askIdx] + " is " + rotTxt + " under a 90° " + dirWord + " turn: \\[ \\begin{aligned} \\text{image} &= " + u7Coord(V) + " + (" + fmt(img[0] - V[0]) + ", " + fmt(img[1] - V[1]) + ") \\\\ &= " + u7Coord(img) + " \\end{aligned} \\] So the image of vertex " + names[askIdx] + " is <b>" + u7Coord(img) + "</b>.";
    var grid = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22,
      shapes: [{ pts: pts, fill: FIG_SHADE }],
      marks: pts.map(function (p2, i2) { return { p: p2, label: names[i2], dx: p2[0] >= V[0] ? 11 : -11, dy: -11 }; }),
      aria: "A triangle on a grid" });
    var q = mcq(prompt,
      { t: u7Coord(img), fb: "Correct. The step from the pivot turns 90° " + dirWord + " and keeps its length." },
      [
        { t: u7Coord(wrong), fb: "That turns the step the other way; check the stated direction." },
        { t: u7Coord(aboutOrigin), fb: "That rotates about the origin; this turn is about vertex " + names[pivotIdx] + "." },
        { t: u7Coord(P), fb: "That is the starting point of vertex " + names[askIdx] + "; only the pivot stays in place." }
      ], sol, { mode: cw ? "rot-cw" : "rot-ccw", V: V.join(","), P: P.join(","), img: img.join(",") });
    q.figure = grid;
    return q;
  }
  var qf = mcq("Triangle ABC has vertices A(0, 0), B(3, 0) and C(0, 2). The triangle is rotated 90° clockwise about vertex A. What are the coordinates of the image of vertex B?",
    { t: "(0, -3)", fb: "Correct." },
    [{ t: "(0, 3)", fb: "That turns the step the other way." }, { t: "(3, 0)", fb: "That is the starting point of B." }, { t: "(-3, 0)", fb: "That is a half turn, not a quarter turn." }],
    "The step from A to B is (3, 0); a 90° clockwise turn makes it (0, -3), so the image of B is <b>(0, -3)</b>.", { mode: "rot-cw", V: "0,0", P: "3,0", img: "0,-3" });
  qf.figure = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22, shapes: [{ pts: [[0, 0], [3, 0], [0, 2]], fill: FIG_SHADE }], marks: [{ p: [0, 0], label: "A", dx: -11, dy: -11 }, { p: [3, 0], label: "B", dx: 11, dy: -11 }, { p: [0, 2], label: "C", dx: -11, dy: -11 }], aria: "A triangle on a grid" });
  return qf;
}, ["The pivot vertex stays fixed; every other vertex swings around it.", "Find the step from the pivot to the named vertex, turn that step 90 degrees, then add it back to the pivot."]);

// 15. 10.3 L2 var: symmetry in tessellations and repeating patterns.
E("u7-tessellation-var", 7, ["10.3"], 1, "var", varset([
  function () {
    return mcq("A honeycomb tessellation is made of regular hexagons that fit together with no gaps. About the centre of one hexagon, the whole pattern matches itself when it is turned. What is the angle of rotation symmetry there?",
      { t: "60°", fb: "Correct. A regular hexagon has order 6, and 360 divided by 6 is 60." },
      [{ t: "30°", fb: "That is half the correct angle; the hexagon first matches after one sixth of a turn." }, { t: "90°", fb: "That would be order 4; a hexagon matches 6 times in a full turn." }, { t: "120°", fb: "That skips a matching position; the first match comes sooner, after one sixth of a turn." }],
      "A regular hexagon has rotation order 6: \\[ \\begin{aligned} 360° \\div 6 &= 60° \\end{aligned} \\] So the angle of rotation symmetry is <b>60°</b>.",
      { mode: "tess-honeycomb" });
  },
  function () {
    return mcq("A floor is tiled in a checkerboard tessellation of black and white squares. Consider one white square. Which line is a line of symmetry of the whole pattern? A line of symmetry makes the two halves match exactly, colours included.",
      { t: "A vertical line through the centre of the white square", fb: "Correct. Each side mirrors onto squares of the same colour." },
      [{ t: "A vertical line along the left edge of the white square", fb: "Folding there swaps the white square with a black neighbour, so the colours do not match." }, { t: "A horizontal line along the top edge of the white square", fb: "Folding there swaps the white square with a black neighbour, so the colours do not match." }, { t: "A slanted line through the centre of the white square", fb: "A slanted fold does not land the squares back on the grid." }],
      "Folding along a line through the centre of the square maps each square onto a square of the same colour, while folding along an edge swaps black and white. So the line of symmetry is <b>a vertical line through the centre of the white square</b>.",
      { mode: "tess-checker" });
  },
  function () {
    return mcq("A tessellation is built from four identical right triangles arranged as a pinwheel about a point, and the pinwheel repeats across the floor. About the centre of the pinwheel, what are the order and angle of rotation symmetry of the pattern?",
      { t: "Order 4, angle 90°", fb: "Correct. Four matching turns fit in a full turn, and 360 divided by 4 is 90." },
      [{ t: "Order 2, angle 180°", fb: "The pinwheel matches sooner than a half turn; count the four blades." }, { t: "Order 4, angle 45°", fb: "The angle is 360 divided by the order, and 360 divided by 4 is 90, not 45." }, { t: "The pattern has no rotation symmetry", fb: "Turning the pinwheel by a quarter turn lands each blade where the next one was." }],
      "Four blades give order 4: \\[ \\begin{aligned} 360° \\div 4 &= 90° \\end{aligned} \\] So the pattern has <b>order 4, angle 90°</b> about the pinwheel centre.",
      { mode: "tess-pinwheel" });
  },
  function () {
    return mcq("A bunting strip for a fair is a repeating pattern: five identical triangles point up, side by side along a base line, like flags on a string. Which line is a line of symmetry of the whole strip?",
      { t: "A vertical line through the middle triangle", fb: "Correct. The two triangles on each side mirror onto each other." },
      [{ t: "A horizontal line along the base line", fb: "Folding there would flip the triangles below the base, where the strip has nothing." }, { t: "A vertical line through the first triangle", fb: "That leaves two triangles on one side and none to match on the other side." }, { t: "A slanted line through the middle triangle", fb: "A slanted fold does not land the row of triangles back on itself." }],
      "The strip has two triangles on each side of the middle one, so folding on <b>a vertical line through the middle triangle</b> makes the halves match. No other listed line does this.",
      { mode: "tess-bunting" });
  },
  function () {
    return mcq("A tessellation is made of equilateral triangles only, with 6 triangles meeting at each point. About a point where 6 triangles meet, the pattern first matches itself after a turn of what angle?",
      { t: "60°", fb: "Correct. Six matching positions fit in a full turn, and 360 divided by 6 is 60." },
      [{ t: "30°", fb: "That is half a triangle step; the triangles would not line up with the pattern yet." }, { t: "90°", fb: "That would be order 4; here 6 triangles meet, giving order 6." }, { t: "180°", fb: "That is a half turn, but the pattern already matches after a smaller turn." }],
      "Six triangles around the point give order 6: \\[ \\begin{aligned} 360° \\div 6 &= 60° \\end{aligned} \\] So the pattern first matches after a turn of <b>60°</b>.",
      { mode: "tess-triangles" });
  }
]), ["Look for the smallest turn or fold that makes the whole repeating pattern land back on itself.", "For rotation, count how many matching positions fit in a full turn, then divide 360 degrees by that count."]);

// 16. 10.4 L2 var: types of symmetry in described artwork.
E("u7-artwork-symmetry-var", 7, ["10.4"], 1, "var", varset([
  function () {
    var opts = [
      { t: "Both line symmetry and rotation symmetry", fb: "Correct. It folds along several lines and matches itself under part turns." },
      { t: "Line symmetry only", fb: "It also matches itself when turned by part of a full turn about its centre." },
      { t: "Rotation symmetry only", fb: "It also folds exactly onto itself along lines through its centre." },
      { t: "Neither line symmetry nor rotation symmetry", fb: "A six-pointed snowflake has both kinds of symmetry." }
    ];
    return mcq("A photograph shows a snowflake with 6 identical points arranged evenly around its centre. Which types of symmetry does the snowflake show?",
      opts[0], [opts[1], opts[2], opts[3]],
      "The 6 even points give fold lines through the centre and matching turns of one sixth of a full turn. So the snowflake shows <b>both line symmetry and rotation symmetry</b>.",
      { mode: "art-snowflake" });
  },
  function () {
    var opts = [
      { t: "Rotation symmetry only", fb: "Correct. The swirling blades match under quarter turns but no fold makes the halves match." },
      { t: "Both line symmetry and rotation symmetry", fb: "The blades curve one way, so every fold line fails to make the halves match." },
      { t: "Line symmetry only", fb: "There is no fold line, but a quarter turn about the centre makes it match." },
      { t: "Neither line symmetry nor rotation symmetry", fb: "A quarter turn about the centre does make it match itself." }
    ];
    return mcq("A quilt block shows a pinwheel: four curved blades swirl around the centre, each blade bent the same way. Which types of symmetry does the block show?",
      opts[0], [opts[1], opts[2], opts[3]],
      "Turning by a quarter turn lands each blade where the next one was, but the one-way curve defeats every fold. So the block shows <b>rotation symmetry only</b>.",
      { mode: "art-pinwheel" });
  },
  function () {
    var opts = [
      { t: "Line symmetry only", fb: "Correct. The wings mirror across one vertical line, and no part turn makes it match." },
      { t: "Both line symmetry and rotation symmetry", fb: "Turning it by any part turn moves the head and wing pattern out of place." },
      { t: "Rotation symmetry only", fb: "It does have a fold line: the vertical line down its middle." },
      { t: "Neither line symmetry nor rotation symmetry", fb: "The two wings are mirror images, so it has line symmetry." }
    ];
    return mcq("A painting shows a butterfly from above, with the left and right wings as mirror images and the head at the top. Which types of symmetry does the painting show?",
      opts[0], [opts[1], opts[2], opts[3]],
      "The wings fold onto each other along the vertical middle line, and no turn smaller than a full turn works. So the painting shows <b>line symmetry only</b>.",
      { mode: "art-butterfly" });
  },
  function () {
    var opts = [
      { t: "Neither line symmetry nor rotation symmetry", fb: "Correct. The single slanted triangle defeats every fold and every part turn." },
      { t: "Both line symmetry and rotation symmetry", fb: "One scalene triangle in a corner breaks both kinds of symmetry." },
      { t: "Line symmetry only", fb: "There is no fold line that makes the badge match; check the corner triangle." },
      { t: "Rotation symmetry only", fb: "There is no part turn that makes the badge match; check the corner triangle." }
    ];
    return mcq("A round badge is plain except for one small scalene triangle printed in the top right area. A scalene triangle has all sides different. Which types of symmetry does the badge show?",
      opts[0], [opts[1], opts[2], opts[3]],
      "Every fold or part turn would move the lone triangle to a spot where the badge is plain. So the badge shows <b>neither line symmetry nor rotation symmetry</b>.",
      { mode: "art-badge" });
  },
  function () {
    var opts = [
      { t: "Both line symmetry and rotation symmetry", fb: "Correct. The letter H folds two ways and matches after a half turn." },
      { t: "Line symmetry only", fb: "It also matches itself after a half turn about its centre." },
      { t: "Rotation symmetry only", fb: "It also folds exactly onto itself, both across and up and down." },
      { t: "Neither line symmetry nor rotation symmetry", fb: "The letter H has both kinds of symmetry." }
    ];
    return mcq("A circular logo has a capital letter H in the exact centre, drawn with equal strokes. Which types of symmetry does the logo show?",
      opts[0], [opts[1], opts[2], opts[3]],
      "The letter H folds across a vertical line and a horizontal line, and a half turn puts it back exactly. So the logo shows <b>both line symmetry and rotation symmetry</b>.",
      { mode: "art-logoH" });
  }
]), ["Test the piece both ways: try folds first, then try part turns about the centre.", "Line symmetry needs a fold that matches exactly; rotation symmetry needs a part turn that matches exactly."]);

// 17. 10.11 L2 var: designs that demonstrate both line and rotation symmetry.
E("u7-both-symmetry-var", 7, ["10.11"], 1, "var", varset([
  function () {
    return mcq("Which design demonstrates BOTH line symmetry and rotation symmetry?",
      { t: "A round badge with a five-pointed star in the exact centre", fb: "Correct. The star folds along 5 lines and matches itself under turns about the centre." },
      [
        { t: "A square tile with a pinwheel of four curved blades", fb: "The pinwheel has rotation symmetry, but its curved blades give it no fold line." },
        { t: "A flag with one arrow pointing right across the middle", fb: "The arrow has a horizontal fold line, but no part turn makes it match." },
        { t: "A poster with a capital letter F in the middle of it", fb: "The letter F has neither a fold line nor a matching part turn." }
      ],
      "Only the centred star passes both tests: it folds onto itself and turns onto itself. So the design with both is <b>a round badge with a five-pointed star in the exact centre</b>.",
      { mode: "both-star" });
  },
  function () {
    return mcq("Four tiles each show one capital letter in the centre. Which tile demonstrates BOTH line symmetry and rotation symmetry?",
      { t: "The tile with the letter H", fb: "Correct. H folds two ways and matches after a half turn." },
      [
        { t: "The tile with the letter S", fb: "S matches after a half turn, but it has no fold line." },
        { t: "The tile with the letter A", fb: "A has a vertical fold line, but no part turn makes it match." },
        { t: "The tile with the letter L", fb: "L has neither a fold line nor a matching part turn." }
      ],
      "H is the only letter listed that folds onto itself and turns onto itself. So the tile with both is <b>the tile with the letter H</b>.",
      { mode: "both-H" });
  },
  function () {
    return mcq("Which piece of artwork demonstrates BOTH line symmetry and rotation symmetry?",
      { t: "A paper snowflake with 6 matching points, cut from folded paper", fb: "Correct. It folds along lines through its centre and matches under sixth turns." },
      [
        { t: "A spiral painted in rings around the centre of a dinner plate", fb: "A spiral winds one way, so it has no fold line and no matching part turn." },
        { t: "A kite with a long tail, drawn from the side over a field", fb: "The kite shape has a fold line along its spine, but no part turn makes it match." },
        { t: "A pinwheel quilt block with four curved blades that swirl", fb: "The pinwheel has rotation symmetry only; its curved blades give it no fold line." }
      ],
      "Only the snowflake passes both tests: folds through the centre and matching part turns. So the piece with both is <b>a paper snowflake with 6 matching points, cut from folded paper</b>.",
      { mode: "both-snowflake" });
  },
  function () {
    return mcq("A tile design folds exactly onto itself along 2 lines, and it matches itself twice in one full turn about its centre. Which statement names both of its symmetry features correctly?",
      { t: "It has line symmetry, and rotation symmetry of order 2 with angle 180°", fb: "Correct. Two matches in a full turn give order 2, and 360 divided by 2 is 180." },
      [
        { t: "It has line symmetry, and rotation symmetry of order 4 with angle 90°", fb: "Four matches would be needed for order 4; this design matches twice." },
        { t: "It has line symmetry only, with no matching turn about its centre", fb: "Matching twice in a full turn is rotation symmetry, so it has that too." },
        { t: "It has rotation symmetry of order 2 with angle 180° only, and no fold line", fb: "Folding onto itself along 2 lines is line symmetry, so it has that too." }
      ],
      "Folding gives line symmetry, and the turn count gives the order: \\[ \\begin{aligned} 360° \\div 2 &= 180° \\end{aligned} \\] So the statement is <b>it has line symmetry, and rotation symmetry of order 2 with angle 180°</b>.",
      { mode: "both-features" });
  }
]), ["A design needs to pass both tests: a fold that matches and a part turn that matches.", "Check each choice for a fold line first, then for a matching turn about the centre."]);

// 18. 10.5 L2 gen MC with figure: how two shapes on a grid are related.
E("u7-related-shapes", 7, ["10.5"], 1, "gen", function () {
  function sqLens(pts) {
    var out = [];
    for (var i = 0; i < pts.length; i++) { var a = pts[i], b = pts[(i + 1) % pts.length]; out.push((a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1])); }
    return out.sort(function (x, y) { return x - y; }).join(",");
  }
  for (var att = 0; att < 200; att++) {
    var A = [[-5 + ri(0, 1), -3 + ri(0, 2)], [-1 - ri(0, 1), -2 + ri(0, 2)], [-4 + ri(0, 1), 2 + ri(0, 2)]];
    var area = Math.abs((A[1][0] - A[0][0]) * (A[2][1] - A[0][1]) - (A[2][0] - A[0][0]) * (A[1][1] - A[0][1]));
    if (area < 4) continue;
    var mode = pick(["reflection", "rotation", "neither"]);
    var B;
    if (mode === "reflection") B = A.map(function (p) { return [-p[0], p[1]]; });
    else if (mode === "rotation") B = A.map(function (p) { return [-p[0], -p[1]]; });
    else { B = A.map(function (p) { return [-p[0], p[1]]; }); B[1] = [B[1][0], B[1][1] + 1]; if (sqLens(A) === sqLens(B)) continue; }
    var cenA = [(A[0][0] + A[1][0] + A[2][0]) / 3, (A[0][1] + A[1][1] + A[2][1]) / 3];
    var cenB = [(B[0][0] + B[1][0] + B[2][0]) / 3, (B[0][1] + B[1][1] + B[2][1]) / 3];
    var grid = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22,
      shapes: [{ pts: A, fill: FIG_SHADE }, { pts: B, fill: "#ffffff" }],
      labels: [{ p: cenA, str: "A", size: 14, bold: true }, { p: cenB, str: "B", size: 14, bold: true }],
      aria: "Two triangles A and B on a grid" });
    var reflT = "They are related by a reflection (one is the mirror image of the other).";
    var rotT = "They are related by a rotation (one is a turned copy of the other).";
    var neiT = "They are not related by a reflection or a rotation.";
    var enlT = "Shape B is an enlargement of shape A.";
    var sol, q;
    var prompt = "Shape A and shape B are shown on the grid. How are the two shapes related?";
    if (mode === "reflection") {
      sol = "Shape B has the same side lengths as shape A but is flipped: each vertex of B is the mirror image of a vertex of A across the y-axis. So <b>they are related by a reflection (one is the mirror image of the other)</b>.";
      q = mcq(prompt, { t: reflT, fb: "Correct. B is the mirror image of A across the y-axis." },
        [{ t: rotT, fb: "A rotation keeps the handedness of a shape; B is flipped compared with A." }, { t: neiT, fb: "They are related: check what a mirror across the y-axis does to A." }, { t: enlT, fb: "The side lengths are the same, so B is not larger than A." }], sol, { mode: "related-refl", A: A.join(";") });
    } else if (mode === "rotation") {
      sol = "Shape B has the same side lengths and the same handedness as shape A, turned a half turn about the origin: each vertex " + "\\((x, y)\\)" + " of A lands at " + "\\((-x, -y)\\)" + " in B. So <b>they are related by a rotation (one is a turned copy of the other)</b>.";
      q = mcq(prompt, { t: rotT, fb: "Correct. B is A turned a half turn about the origin." },
        [{ t: reflT, fb: "A reflection would flip the shape; B keeps the same handedness as A." }, { t: neiT, fb: "They are related: check what a half turn about the origin does to A." }, { t: enlT, fb: "The side lengths are the same, so B is not larger than A." }], sol, { mode: "related-rot", A: A.join(";") });
    } else {
      sol = "Shape B does not have the same side lengths as shape A, so it cannot be a mirror image or a turned copy, since reflections and rotations keep side lengths. So <b>they are not related by a reflection or a rotation</b>.";
      q = mcq(prompt, { t: neiT, fb: "Correct. One side length differs, and reflections and rotations never change side lengths." },
        [{ t: reflT, fb: "A mirror image would keep every side length; compare the sides here." }, { t: rotT, fb: "A turned copy would keep every side length; compare the sides here." }, { t: enlT, fb: "An enlargement scales every side by one factor; here only part of the shape changed." }], sol, { mode: "related-neither", A: A.join(";") });
    }
    q.figure = grid;
    return q;
  }
  var qf = mcq("Shape A and shape B are shown on the grid. How are the two shapes related?",
    { t: "They are related by a reflection (one is the mirror image of the other).", fb: "Correct." },
    [{ t: "They are related by a rotation (one is a turned copy of the other).", fb: "B is flipped compared with A." }, { t: "They are not related by a reflection or a rotation.", fb: "Check a mirror across the y-axis." }, { t: "Shape B is an enlargement of shape A.", fb: "The side lengths are the same." }],
    "Each vertex of B is the mirror image of a vertex of A across the y-axis, so <b>they are related by a reflection</b>.", { mode: "related-refl", A: "-4,-2;-1,-1;-3,2" });
  qf.figure = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22, shapes: [{ pts: [[-4, -2], [-1, -1], [-3, 2]], fill: FIG_SHADE }, { pts: [[4, -2], [1, -1], [3, 2]], fill: "#ffffff" }], labels: [{ p: [-2.7, -0.3], str: "A", size: 14, bold: true }, { p: [2.7, -0.3], str: "B", size: 14, bold: true }], aria: "Two triangles A and B on a grid" });
  return qf;
}, ["Reflections and rotations never change side lengths, so compare the sides first.", "If the sides match, decide whether the second shape is flipped (reflection) or just turned (rotation)."]);

// 19. 10.6 L2 gen MC with figure: symmetry that arises from a transformation.
E("u7-transformation-symmetry", 7, ["10.6"], 1, "gen", function () {
  var mode = pick(["reflY", "reflX", "rot180"]);
  var A = [[ri(1, 2), ri(1, 2)], [ri(4, 5), ri(1, 2)], [ri(1, 3), ri(4, 5)]];
  var area19 = Math.abs((A[1][0] - A[0][0]) * (A[2][1] - A[0][1]) - (A[2][0] - A[0][0]) * (A[1][1] - A[0][1]));
  if (area19 < 4) { A = [[1, 1], [5, 2], [2, 5]]; }
  var B;
  if (mode === "reflY") B = A.map(function (p) { return [-p[0], p[1]]; });
  else if (mode === "reflX") B = A.map(function (p) { return [p[0], -p[1]]; });
  else B = A.map(function (p) { return [-p[0], -p[1]]; });
  var cenA = [(A[0][0] + A[1][0] + A[2][0]) / 3, (A[0][1] + A[1][1] + A[2][1]) / 3];
  var cenB = [(B[0][0] + B[1][0] + B[2][0]) / 3, (B[0][1] + B[1][1] + B[2][1]) / 3];
  var grid = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22,
    shapes: [{ pts: A, fill: FIG_SHADE }, { pts: B, fill: "#ffffff" }],
    labels: [{ p: cenA, str: "Shape", size: 12, bold: true }, { p: cenB, str: "Image", size: 12, bold: true }],
    aria: "A shape and its image on a grid" });
  var yT = "The shape and its image have line symmetry across the y-axis.";
  var xT = "The shape and its image have line symmetry across the x-axis.";
  var rT = "The shape and its image have rotation symmetry of order 2 about the origin.";
  var nT = "The shape and its image have no line or rotation symmetry.";
  var corrT = mode === "reflY" ? yT : (mode === "reflX" ? xT : rT);
  var all = [yT, xT, rT, nT];
  var rest = all.filter(function (t) { return t !== corrT; }).map(function (t) {
    return { t: t, fb: t === nT ? "The combined picture does have a symmetry; picture folding it or turning it as one piece." : "That names the wrong mirror line or centre for this picture; check where the image sits." };
  });
  var expl = mode === "reflY" ? "The image is the mirror image of the shape across the y-axis, so the combined picture folds exactly onto itself along the y-axis."
    : mode === "reflX" ? "The image is the mirror image of the shape across the x-axis, so the combined picture folds exactly onto itself along the x-axis."
    : "The image is the shape turned a half turn about the origin, so the combined picture matches itself after a half turn about the origin, which is rotation symmetry of order 2.";
  var q = mcq("A shape and its image after a transformation are shown on the grid. Which statement describes the symmetry of the combined picture (the shape and its image together)?",
    { t: corrT, fb: "Correct. " + expl }, rest,
    expl + " So the statement is: <b>" + corrT + "</b>",
    { mode: "transf-" + mode, A: A.join(";") });
  q.figure = grid;
  return q;
}, ["Treat the shape and its image as one picture, then test folds and turns on the whole picture.", "Look at where the image sits compared with the shape: mirrored sideways, mirrored up and down, or turned a half turn."]);

// 20. 10.12 L3 gen MC with figure: complete a transformation and name the resulting symmetry.
E("u7-complete-transformation", 7, ["10.12"], 3, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var mode = pick(["reflY", "reflX", "rot180"]);
    var A = [ri(1, 2), ri(1, 2)], B = [ri(3, 5), ri(1, 3)], C = [ri(1, 3), ri(4, 5)];
    var pts = [A, B, C];
    var area = Math.abs((B[0] - A[0]) * (C[1] - A[1]) - (C[0] - A[0]) * (B[1] - A[1]));
    if (area < 4) continue;
    function tr(p) { return mode === "reflY" ? [-p[0], p[1]] : mode === "reflX" ? [p[0], -p[1]] : [-p[0], -p[1]]; }
    function trAlt(p) { return mode === "reflY" ? [p[0], -p[1]] : mode === "reflX" ? [-p[0], p[1]] : [-p[1], -p[0]]; }
    var Ap = tr(A), Bp = tr(B), BpAlt = trAlt(B);
    if (u7Coord(Bp) === u7Coord(BpAlt)) continue;
    var symT = mode === "reflY" ? "line symmetry across the y-axis" : mode === "reflX" ? "line symmetry across the x-axis" : "rotation symmetry of order 2 about the origin";
    var symWrong = mode === "rot180" ? "line symmetry across the y-axis" : "rotation symmetry of order 2 about the origin";
    var corrT = "B' is at " + u7Coord(Bp) + ", and the combined picture has " + symT + ".";
    var d1 = "B' is at " + u7Coord(BpAlt) + ", and the combined picture has " + symT + ".";
    var d2 = "B' is at " + u7Coord(Bp) + ", and the combined picture has " + symWrong + ".";
    var d3 = "B' is at " + u7Coord(BpAlt) + ", and the combined picture has " + symWrong + ".";
    if (new Set([corrT, d1, d2, d3]).size < 4) continue;
    var transWord = mode === "reflY" ? "reflected across the y-axis" : mode === "reflX" ? "reflected across the x-axis" : "rotated 180° about the origin";
    var ruleTxt = mode === "reflY" ? "\\((x, y) \\to (-x, y)\\)" : mode === "reflX" ? "\\((x, y) \\to (x, -y)\\)" : "\\((x, y) \\to (-x, -y)\\)";
    var prompt = "Triangle ABC has vertices A" + u7Coord(A) + ", B" + u7Coord(B) + " and C" + u7Coord(C) + ". It is " + transWord + ". The image of A is A' at " + u7Coord(Ap) + ", as shown. Which statement correctly completes the transformation and describes the symmetry of the combined picture?";
    var sol = "The rule is " + ruleTxt + ". Applying it to B" + u7Coord(B) + ": \\[ \\begin{aligned} B &\\to " + u7Coord(Bp) + " \\end{aligned} \\] The shape and its image together fold or turn onto themselves as stated, so the correct statement is: <b>" + corrT + "</b>";
    var grid = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22,
      shapes: [{ pts: pts, fill: FIG_SHADE }],
      marks: pts.map(function (p, i) { return { p: p, label: ["A", "B", "C"][i], dx: 11, dy: -11 }; }).concat([{ p: Ap, label: "A'", dx: -13, dy: -11 }]),
      aria: "A triangle and one image vertex on a grid" });
    var q = mcq(prompt,
      { t: corrT, fb: "Correct. The vertex follows the rule, and the symmetry matches the transformation." },
      [
        { t: d1, fb: "The symmetry part is right, but that point uses the wrong rule for B." },
        { t: d2, fb: "The point for B is right, but the combined picture does not have that symmetry." },
        { t: d3, fb: "Both parts are wrong: the point uses the wrong rule, and the symmetry does not match." }
      ], sol, { mode: "complete-" + mode, A: A.join(","), B: B.join(","), Bp: Bp.join(",") });
    q.figure = grid;
    return q;
  }
  var qf = mcq("Triangle ABC has vertices A(1, 1), B(4, 2) and C(2, 4). It is reflected across the y-axis. The image of A is A' at (-1, 1), as shown. Which statement correctly completes the transformation and describes the symmetry of the combined picture?",
    { t: "B' is at (-4, 2), and the combined picture has line symmetry across the y-axis.", fb: "Correct." },
    [{ t: "B' is at (4, -2), and the combined picture has line symmetry across the y-axis.", fb: "That point uses the wrong rule for B." }, { t: "B' is at (-4, 2), and the combined picture has rotation symmetry of order 2 about the origin.", fb: "The point is right, but the symmetry is wrong." }, { t: "B' is at (4, -2), and the combined picture has rotation symmetry of order 2 about the origin.", fb: "Both parts are wrong." }],
    "The rule is \\((x, y) \\to (-x, y)\\), so B lands at (-4, 2), and the pair folds along the y-axis.", { mode: "complete-reflY", A: "1,1", B: "4,2", Bp: "-4,2" });
  qf.figure = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22, shapes: [{ pts: [[1, 1], [4, 2], [2, 4]], fill: FIG_SHADE }], marks: [{ p: [1, 1], label: "A", dx: 11, dy: -11 }, { p: [4, 2], label: "B", dx: 11, dy: -11 }, { p: [2, 4], label: "C", dx: 11, dy: -11 }, { p: [-1, 1], label: "A'", dx: -13, dy: -11 }], aria: "A triangle and one image vertex on a grid" });
  return qf;
}, ["Apply the same rule to the named vertex that the given image vertex shows.", "First find where B lands using the rule, then name the symmetry of the shape and image together."]);

// 21. 10.13 L2 gen MC, CR 2: translation rule applied to a shape given by coordinates.
E("u7-translation-rule", 7, ["10.13"], 1, "gen", function () {
  for (var att = 0; att < 200; att++) {
    var a = ri(1, 5), b = ri(1, 5);
    if (a === b) continue;
    var dx = (Math.random() < 0.5 ? 1 : -1) * a, dy = (Math.random() < 0.5 ? 1 : -1) * b;
    var pts = [[ri(-3, 3), ri(-3, 3)], [ri(-3, 4), ri(-3, 4)], [ri(-3, 4), ri(-3, 4)]];
    if (new Set(pts.map(u7Coord)).size < 3) continue;
    var ask = ri(0, 2), P = pts[ask];
    var img = [P[0] + dx, P[1] + dy];
    var cand = [img, [P[0] - dx, P[1] + dy], [P[0] + dx, P[1] - dy], [P[0] + dy, P[1] + dx]];
    if (new Set(cand.map(u7Coord)).size < 4) continue;
    var hWord = dx > 0 ? "R" + fmt(dx) : "L" + fmt(-dx);
    var vWord = dy > 0 ? "U" + fmt(dy) : "D" + fmt(-dy);
    var hTxt = dx > 0 ? "right " + fmt(dx) : "left " + fmt(-dx);
    var vTxt = dy > 0 ? "up " + fmt(dy) : "down " + fmt(-dy);
    var names = ["A", "B", "C"];
    var prompt = "A shape has vertices A" + u7Coord(pts[0]) + ", B" + u7Coord(pts[1]) + " and C" + u7Coord(pts[2]) + ". It is translated by the rule " + hWord + ", " + vWord + ", which means slide " + hTxt + " and " + vTxt + ". What are the coordinates of the image of vertex " + names[ask] + "?";
    var sol = "Apply the slide to vertex " + names[ask] + u7Coord(P) + ": \\[ \\begin{aligned} x' &= " + fmt(P[0]) + (dx >= 0 ? " + " + fmt(dx) : " - " + fmt(-dx)) + " = " + fmt(img[0]) + " \\\\ y' &= " + fmt(P[1]) + (dy >= 0 ? " + " + fmt(dy) : " - " + fmt(-dy)) + " = " + fmt(img[1]) + " \\end{aligned} \\] So the image of vertex " + names[ask] + " is <b>" + u7Coord(img) + "</b>.";
    var q = mcq(prompt,
      { t: u7Coord(img), fb: "Correct. The x slide and the y slide are both applied to the vertex." },
      [
        { t: u7Coord(cand[1]), fb: "The sideways slide went the wrong way; check whether the rule says left or right." },
        { t: u7Coord(cand[2]), fb: "The vertical slide went the wrong way; check whether the rule says up or down." },
        { t: u7Coord(cand[3]), fb: "That swaps the two slides; the first number in the rule is the sideways slide." }
      ], sol, { mode: "translation", dx: dx, dy: dy, P: P.join(","), img: img.join(",") });
    q.figure = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22,
      shapes: [{ pts: pts, fill: FIG_SHADE }],
      marks: pts.map(function (p2, i2) { return { p: p2, label: names[i2], dx: 11, dy: -11 }; }),
      aria: "A triangle on a grid" });
    return q;
  }
  var q = mcq("A shape has vertices A(0, 0), B(3, 1) and C(1, 4). It is translated by the rule R2, U3, which means slide right 2 and up 3. What are the coordinates of the image of vertex B?",
    { t: "(5, 4)", fb: "Correct." },
    [{ t: "(1, 4)", fb: "The sideways slide went the wrong way." }, { t: "(5, -2)", fb: "The vertical slide went the wrong way." }, { t: "(6, 3)", fb: "That swaps the two slides." }],
    "Adding the slides to B(3, 1) gives (5, 4), so the image of B is <b>(5, 4)</b>.", { mode: "translation", dx: 2, dy: 3, P: "3,1", img: "5,4" });
  q.figure = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22,
    shapes: [{ pts: [[0, 0], [3, 1], [1, 4]], fill: FIG_SHADE }],
    marks: [{ p: [0, 0], label: "A", dx: 11, dy: -11 }, { p: [3, 1], label: "B", dx: 11, dy: -11 }, { p: [1, 4], label: "C", dx: 11, dy: -11 }],
    aria: "A triangle on a grid" });
  return q;
}, ["In the rule, the letter tells the direction and the number tells how far, first sideways then up or down.", "Add the sideways slide to the x coordinate and the vertical slide to the y coordinate (subtracting for left or down)."]);

// Unit 8: Circle Geometry (Math 9, NL). Entries only; helpers prefixed u8.
function u8P(deg) { var a = deg * Math.PI / 180; return [Math.cos(a), Math.sin(a)]; }
function u8Rot(p, deg) { var a = deg * Math.PI / 180, c = Math.cos(a), s = Math.sin(a); return [p[0] * c - p[1] * s, p[0] * s + p[1] * c]; }
function u8Dir(from, to) { return Math.atan2(to[1] - from[1], to[0] - from[0]) * 180 / Math.PI; }
function u8Txt(x, y, str, size) {
  return '<text x="' + fmt(x, 1) + '" y="' + fmt(y, 1) + '" font-size="' + (size || 13) + '" fill="' + FIG_INK + '" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="middle" dominant-baseline="central">' + str + '</text>';
}
/* Reusable circle figure. spec.pts maps names to math coords (centre O is [0,0],
   points on the circle have length 1). Options: segs [[a,b],...], tangentAt name
   (line perpendicular to the radius there), tangentSeg {at,to,beyond,back},
   perp [a,b] (draws O to the chord midpoint M, with a right-angle mark at M),
   angles [{v,a1,a2,r,lr,label}], rightMarks [{v,a1,a2}],
   sideLabs [{a,b,text,off}], ptOff {name:[dx,dy]} label nudges in px. */
function u8Fig(spec) {
  var W = spec.W || 330, H = spec.H || 270, pad = 36;
  var pts = {}; Object.keys(spec.pts).forEach(function (k) { pts[k] = spec.pts[k]; });
  pts.O = [0, 0];
  var fit = [[-1, -1], [1, 1]];
  Object.keys(pts).forEach(function (k) { fit.push(pts[k]); });
  var tanEnds = null;
  if (spec.tangentAt) {
    var T = pts[spec.tangentAt], th = Math.atan2(T[1], T[0]);
    var td = [-Math.sin(th), Math.cos(th)], ext = spec.tanExt || 0.62;
    tanEnds = [[T[0] - td[0] * ext, T[1] - td[1] * ext], [T[0] + td[0] * ext, T[1] + td[1] * ext]];
    fit.push(tanEnds[0]); fit.push(tanEnds[1]);
  }
  var tanSegEnds = null;
  if (spec.tangentSeg) {
    var A0 = pts[spec.tangentSeg.at], B0 = pts[spec.tangentSeg.to];
    var vx = B0[0] - A0[0], vy = B0[1] - A0[1];
    tanSegEnds = [[A0[0] - vx * (spec.tangentSeg.back || 0.35), A0[1] - vy * (spec.tangentSeg.back || 0.35)],
                  [A0[0] + vx * (spec.tangentSeg.beyond || 1.12), A0[1] + vy * (spec.tangentSeg.beyond || 1.12)]];
    fit.push(tanSegEnds[0]); fit.push(tanSegEnds[1]);
  }
  var Mpt = null;
  if (spec.perp) {
    var PA = pts[spec.perp[0]], PB = pts[spec.perp[1]];
    Mpt = [(PA[0] + PB[0]) / 2, (PA[1] + PB[1]) / 2]; pts.M = Mpt; fit.push(Mpt);
  }
  var xs = fit.map(function (p) { return p[0]; }), ys = fit.map(function (p) { return p[1]; });
  var mnx = Math.min.apply(null, xs), mxx = Math.max.apply(null, xs), mny = Math.min.apply(null, ys), mxy = Math.max.apply(null, ys);
  var sc = Math.min((W - 2 * pad) / Math.max(mxx - mnx, 0.01), (H - 2 * pad) / Math.max(mxy - mny, 0.01));
  var cxm = (mnx + mxx) / 2, cym = (mny + mxy) / 2;
  function S(p) { return [W / 2 + (p[0] - cxm) * sc, H / 2 - (p[1] - cym) * sc]; }
  function seg(p, q, w, dash) {
    return '<line x1="' + fmt(p[0], 1) + '" y1="' + fmt(p[1], 1) + '" x2="' + fmt(q[0], 1) + '" y2="' + fmt(q[1], 1) + '" stroke="' + FIG_INK + '" stroke-width="' + (w || 2) + '"' + (dash ? ' stroke-dasharray="5 4"' : '') + '/>';
  }
  function scrDir(deg) { var a = deg * Math.PI / 180; return [Math.cos(a), -Math.sin(a)]; }
  function rightMark(vName, a1, a2) {
    var V = S(pts[vName]), u = scrDir(a1), w = scrDir(a2), sz = 11;
    var p1 = [V[0] + sz * u[0], V[1] + sz * u[1]], p2 = [V[0] + sz * (u[0] + w[0]), V[1] + sz * (u[1] + w[1])], p3 = [V[0] + sz * w[0], V[1] + sz * w[1]];
    return '<polyline points="' + fmt(p1[0], 1) + ',' + fmt(p1[1], 1) + ' ' + fmt(p2[0], 1) + ',' + fmt(p2[1], 1) + ' ' + fmt(p3[0], 1) + ',' + fmt(p3[1], 1) + '" fill="none" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  }
  var out = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Circle diagram">';
  var Oc = S([0, 0]);
  out += '<circle cx="' + fmt(Oc[0], 1) + '" cy="' + fmt(Oc[1], 1) + '" r="' + fmt(sc, 1) + '" fill="none" stroke="' + FIG_INK + '" stroke-width="2"/>';
  if (tanEnds) out += seg(S(tanEnds[0]), S(tanEnds[1]), 2);
  if (tanSegEnds) out += seg(S(tanSegEnds[0]), S(tanSegEnds[1]), 2);
  (spec.segs || []).forEach(function (sg) { out += seg(S(pts[sg[0]]), S(pts[sg[1]]), 2, sg[2]); });
  if (spec.perp) {
    out += seg(Oc, S(Mpt), 2);
    out += rightMark('M', u8Dir(Mpt, pts.O), u8Dir(Mpt, pts[spec.perp[0]]));
  }
  (spec.rightMarks || []).forEach(function (rm) { out += rightMark(rm.v, rm.a1, rm.a2); });
  (spec.angles || []).forEach(function (an) {
    var V = S(pts[an.v]), r = an.r * sc, d = ((an.a2 - an.a1) % 360 + 360) % 360; if (d === 0) d = 360;
    var p1 = [V[0] + r * scrDir(an.a1)[0], V[1] + r * scrDir(an.a1)[1]], p2 = [V[0] + r * scrDir(an.a2)[0], V[1] + r * scrDir(an.a2)[1]];
    out += '<path d="M ' + fmt(p1[0], 1) + ' ' + fmt(p1[1], 1) + ' A ' + fmt(r, 1) + ' ' + fmt(r, 1) + ' 0 ' + (d > 180 ? 1 : 0) + ' 0 ' + fmt(p2[0], 1) + ' ' + fmt(p2[1], 1) + '" fill="none" stroke="' + FIG_ACC + '" stroke-width="2"/>';
    if (an.label) {
      var mid = an.a1 + d / 2, lp = [V[0] + an.lr * sc * scrDir(mid)[0], V[1] + an.lr * sc * scrDir(mid)[1]];
      out += u8Txt(lp[0], lp[1], an.label, 13);
    }
  });
  (spec.sideLabs || []).forEach(function (sl) {
    var A = S(pts[sl.a]), B = S(pts[sl.b]), Mx = (A[0] + B[0]) / 2, My = (A[1] + B[1]) / 2;
    var dx = B[0] - A[0], dy = B[1] - A[1], L = Math.sqrt(dx * dx + dy * dy) || 1;
    var nx = -dy / L, ny = dx / L, off = sl.off || 15;
    if (nx * (Mx - Oc[0]) + ny * (My - Oc[1]) < 0) { nx = -nx; ny = -ny; }
    out += u8Txt(Mx + nx * off, My + ny * off, sl.text, 12);
  });
  Object.keys(pts).forEach(function (k) {
    var P = S(pts[k]);
    out += '<circle cx="' + fmt(P[0], 1) + '" cy="' + fmt(P[1], 1) + '" r="2.6" fill="' + FIG_INK + '"/>';
    var off;
    if (spec.ptOff && spec.ptOff[k]) off = spec.ptOff[k];
    else if (k === 'O') off = [13, 13];
    else if (k === 'M') { var d = [pts.M[0] - 0, pts.M[1] - 0], dl = Math.sqrt(d[0] * d[0] + d[1] * d[1]) || 1; off = [-d[1] / dl * 15, d[0] / dl * 15]; if (off[0] > 0) { off[0] = -off[0]; off[1] = -off[1]; } }
    else { var q = pts[k], ql = Math.sqrt(q[0] * q[0] + q[1] * q[1]) || 1; off = [q[0] / ql * 16, -q[1] / ql * 16]; }
    out += u8Txt(P[0] + off[0], P[1] + off[1], k, 13);
  });
  return out + '</svg>';
}
var U8_TRIPLES = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17]];

// 1. 9.4 L1 MC: radius to a tangent is perpendicular to the tangent.

/* ----- bank-u8.js ----- */
// Math 9 Unit 8 Circle Geometry question bank
// Cut verbatim from the standalone bank source
// (math-9-review/bank-src.js, lines 4730 to 4980).
// CRMARKS: u8-tangent-length=3
// CRMARKS: u8-chord-length=3
// CRMARKS: u8-inscribed-reflex=3
// CRMARKS: u8-semicircle-angle=2
// CRMARKS: u8-same-arc-angles=2
// CRMARKS: u8-chord-two-step=3
// CRMARKS: u8-tangent-central-inscribed=2
// BIMODAL: u8-tangent-central-inscribed=a
E("u8-tangent-right-angle", 8, ["9.4"], 1, "gen", function () {
  var tAng = pick([160, 175, 190, 205, 220, 235, 250, 265, 280, 295, 310, 325, 340, 355, 10, 25]);
  var r = pick([4, 5, 6, 7, 8, 9, 10, 12]);
  var T = u8P(tAng);
  var fig = u8Fig({ pts: { T: T }, segs: [["O", "T"]], tangentAt: "T", sideLabs: [{ a: "O", b: "T", text: fmt(r) + " cm", off: 15 }] });
  var prompt = "The diagram shows a circle with centre O. The straight line through T is a tangent: a tangent is a line that touches the circle at exactly one point. OT is a radius of length \\(" + fmt(r) + "\\) cm. Which statement is true?";
  var solution = "The radius to a point of tangency is perpendicular to the tangent line. OT meets the tangent at T, so the angle between them is <b>\\(90^{\\circ}\\)</b>.";
  var q = mcq(prompt,
    { t: "The angle between OT and the tangent at T is \\(90^{\\circ}\\).", fb: "Correct. A radius to a point of tangency is perpendicular to the tangent." },
    [
      { t: "The angle between OT and the tangent at T is \\(45^{\\circ}\\).", fb: "The radius meets a tangent at a right angle, not at \\(45^{\\circ}\\)." },
      { t: "OT is parallel to the tangent line.", fb: "OT meets the tangent at T, so the two lines are not parallel." },
      { t: "The tangent touches the circle at two points.", fb: "A tangent touches a circle at exactly one point, here the point T." }
    ],
    solution, { mode: "tangent-right-angle", tAng: tAng, r: r });
  q.figure = fig;
  return q;
}, ["Use the tangent property: what angle does a radius make with a tangent at the point where it touches?", "The radius OT ends at T, the exact point where the tangent touches the circle."]);

// 2. 9.4 L2 num, CR 3: tangent length from a right triangle with a triple.
E("u8-tangent-length", 8, ["9.4"], 1, "gen", function () {
  var tr = pick(U8_TRIPLES), k = pick([1, 2]);
  var legA = tr[0] * k, legB = tr[1] * k, hyp = tr[2] * k;
  var swap = Math.random() < 0.5;
  var OT = swap ? legB : legA, PT = swap ? legA : legB, OP = hyp;
  var mode = pick(["PT", "OP", "OT"]);
  var tAng = pick([205, 225, 245, 290, 310, 330]);
  var T = u8P(tAng), th = tAng * Math.PI / 180;
  var td = [-Math.sin(th), Math.cos(th)];
  if (Math.random() < 0.5) { td = [-td[0], -td[1]]; }
  var P = [T[0] + td[0] * (PT / OT), T[1] + td[1] * (PT / OT)];
  var vals = { OT: OT, PT: PT, OP: OP };
  var lab = function (n) { return n === mode ? "?" : fmt(vals[n]) + " cm"; };
  var fig = u8Fig({
    pts: { T: T, P: P }, segs: [["O", "T"], ["O", "P"]], tangentSeg: { at: "T", to: "P", beyond: 1.1, back: 0.3 },
    rightMarks: [{ v: "T", a1: u8Dir(T, [0, 0]), a2: u8Dir(T, P) }],
    sideLabs: [{ a: "O", b: "T", text: lab("OT") }, { a: "T", b: "P", text: lab("PT") }, { a: "O", b: "P", text: lab("OP") }]
  });
  var given, ask, sol;
  if (mode === "PT") {
    given = "\\(OT = " + fmt(OT) + "\\) cm and \\(OP = " + fmt(OP) + "\\) cm"; ask = "PT";
    sol = "Triangle OTP is right-angled at T, because the radius to a point of tangency is perpendicular to the tangent. Use Pythagoras: \\[ \\begin{aligned} PT^{2} &= OP^{2} - OT^{2} \\\\ &= " + fmt(OP) + "^{2} - " + fmt(OT) + "^{2} = " + fmt(OP * OP - OT * OT) + " \\\\ PT &= \\sqrt{" + fmt(OP * OP - OT * OT) + "} = " + fmt(PT) + " \\end{aligned} \\] So the tangent length is <b>" + fmt(PT) + " cm</b>.";
  } else if (mode === "OP") {
    given = "\\(OT = " + fmt(OT) + "\\) cm and \\(PT = " + fmt(PT) + "\\) cm"; ask = "OP";
    sol = "Triangle OTP is right-angled at T, because the radius to a point of tangency is perpendicular to the tangent. OP is the hypotenuse: \\[ \\begin{aligned} OP^{2} &= OT^{2} + PT^{2} \\\\ &= " + fmt(OT) + "^{2} + " + fmt(PT) + "^{2} = " + fmt(OT * OT + PT * PT) + " \\\\ OP &= \\sqrt{" + fmt(OT * OT + PT * PT) + "} = " + fmt(OP) + " \\end{aligned} \\] So the distance is <b>" + fmt(OP) + " cm</b>.";
  } else {
    given = "\\(OP = " + fmt(OP) + "\\) cm and \\(PT = " + fmt(PT) + "\\) cm"; ask = "OT, the radius";
    sol = "Triangle OTP is right-angled at T, because the radius to a point of tangency is perpendicular to the tangent. Use Pythagoras: \\[ \\begin{aligned} OT^{2} &= OP^{2} - PT^{2} \\\\ &= " + fmt(OP) + "^{2} - " + fmt(PT) + "^{2} = " + fmt(OP * OP - PT * PT) + " \\\\ OT &= \\sqrt{" + fmt(OP * OP - PT * PT) + "} = " + fmt(OT) + " \\end{aligned} \\] So the radius is <b>" + fmt(OT) + " cm</b>.";
  }
  var prompt = "In the diagram, P is a point outside the circle with centre O. The line through P and T is a tangent (it touches the circle at exactly one point, T), and " + given + ". Find the length of " + ask + ", in centimetres.";
  var q = numq(prompt, vals[mode], 0.01, sol, { mode: "tangent-" + mode, OT: OT, PT: PT, OP: OP, tAng: tAng });
  q.figure = fig;
  return q;
}, ["The radius to a point of tangency is perpendicular to the tangent, so triangle OTP is right-angled at T.", "Mark the right angle at T, then use the Pythagorean relationship on triangle OTP."]);

// 3. 9.6 L2 MC: the perpendicular from the centre bisects the chord.
E("u8-chord-perp-bisects", 8, ["9.6"], 1, "gen", function () {
  var phi = pick([42, 48, 54, 66, 72, 78, 84, 88]);
  var r = pick([5, 6, 7, 8, 9, 10, 11, 12]);
  var tilt = pick([0, 12, -12, 24]);
  var A = u8Rot(u8P(90 + phi), tilt), B = u8Rot(u8P(90 - phi), tilt);
  var fig = u8Fig({ pts: { A: A, B: B }, segs: [["A", "B"], ["O", "A"]], perp: ["A", "B"], sideLabs: [{ a: "O", b: "A", text: fmt(r) + " cm", off: 15 }] });
  var prompt = "In the diagram, AB is a chord: a chord is a segment joining two points on the circle. The segment from the centre O is drawn perpendicular to AB and meets AB at M. The radius is \\(" + fmt(r) + "\\) cm. Which statement is true?";
  var solution = "The perpendicular from the centre of a circle to a chord bisects the chord, so M is the midpoint of AB and <b>\\(AM = MB\\)</b>.";
  var q = mcq(prompt,
    { t: "\\(AM = MB\\)", fb: "Correct. The perpendicular from the centre bisects the chord, so M is its midpoint." },
    [
      { t: "M is the centre of the circle.", fb: "The centre is O. M is a point on the chord AB." },
      { t: "\\(OM = OA\\)", fb: "M is inside the circle, so OM is shorter than the radius OA, not equal to it." },
      { t: "AB passes through the centre O.", fb: "The chord AB sits away from O; only a diameter passes through the centre." }
    ],
    solution, { mode: "chord-perp-bisects", phi: phi, r: r, tilt: tilt });
  q.figure = fig;
  return q;
}, ["Use the chord property: what does the perpendicular from the centre do to a chord?", "The foot of the perpendicular is M, the point where OM meets AB at a right angle."]);

// 4. 9.6 L2 num, CR 3: chord length from the radius and the distance to the chord.
E("u8-chord-length", 8, ["9.6"], 1, "gen", function () {
  var tr = pick(U8_TRIPLES), k = pick([1, 2]);
  var d = tr[0] * k, half = tr[1] * k, r = tr[2] * k;
  if (Math.random() < 0.5) { var tmp = d; d = half; half = tmp; }
  var tilt = pick([0, 15, -15, 30, -30]);
  var A = u8Rot([-half / r, d / r], tilt), B = u8Rot([half / r, d / r], tilt);
  var fig = u8Fig({
    pts: { A: A, B: B }, segs: [["A", "B"], ["O", "A"]], perp: ["A", "B"],
    sideLabs: [{ a: "O", b: "A", text: fmt(r) + " cm", off: 15 }, { a: "O", b: "M", text: fmt(d) + " cm", off: 15 }]
  });
  var prompt = "In the diagram, AB is a chord of a circle with centre O and radius \\(" + fmt(r) + "\\) cm. The perpendicular from O meets AB at M, and \\(OM = " + fmt(d) + "\\) cm. Find the length of the chord AB, in centimetres.";
  var solution = "The perpendicular from the centre bisects the chord, so \\(AM = MB\\). Triangle OMA is right-angled at M: \\[ \\begin{aligned} AM^{2} &= OA^{2} - OM^{2} \\\\ &= " + fmt(r) + "^{2} - " + fmt(d) + "^{2} = " + fmt(r * r - d * d) + " \\\\ AM &= " + fmt(half) + " \\\\ AB &= 2 \\times " + fmt(half) + " = " + fmt(2 * half) + " \\end{aligned} \\] So the chord length is <b>" + fmt(2 * half) + " cm</b>.";
  var q = numq(prompt, 2 * half, 0.01, solution, { mode: "chord-length", r: r, d: d, half: half, tilt: tilt });
  q.figure = fig;
  return q;
}, ["The perpendicular from the centre to a chord bisects the chord, and it makes a right triangle with a radius.", "Find AM with Pythagoras in triangle OMA, then double it to get the whole chord."]);

// 5. 9.7 L1 num: central angle is twice the inscribed angle on the same arc.
E("u8-central-inscribed", 8, ["9.7"], 1, "gen", function () {
  var th = pick([16, 18, 20, 22, 24, 25, 28, 30, 32, 34, 35, 36, 38, 40, 42, 44, 45, 48, 50, 52, 54, 55, 56, 58, 60, 62, 64, 65, 68, 70, 72]);
  var rot = pick([0, 15, 30, 45, 60, 75, 90, 105]);
  var dbl = Math.random() < 0.5;
  var A = u8P(270 - th + rot), B = u8P(270 + th + rot), C = u8P(90 + rot);
  var cen = 2 * th;
  var aO = [{ v: "O", a1: u8Dir([0, 0], A), a2: u8Dir([0, 0], B), r: 0.3, lr: 0.52, label: dbl ? null : fmt(cen) + "°" }];
  var aC = [{ v: "C", a1: u8Dir(C, A), a2: u8Dir(C, B), r: 0.3, lr: 0.52, label: dbl ? fmt(th) + "°" : null }];
  var fig = u8Fig({ pts: { A: A, B: B, C: C }, segs: [["O", "A"], ["O", "B"], ["C", "A"], ["C", "B"]], angles: dbl ? aC : aO });
  var prompt, solution, ans;
  if (!dbl) {
    prompt = "In the diagram, O is the centre of the circle. Angle AOB is a central angle (its vertex is at the centre) and it measures \\(" + fmt(cen) + "^{\\circ}\\). Angle ACB is an inscribed angle (its vertex is on the circle) standing on the same arc AB. Find the measure of angle ACB, in degrees.";
    solution = "The central angle on an arc is twice the inscribed angle on the same arc: \\[ \\begin{aligned} \\angle ACB &= " + fmt(cen) + "^{\\circ} \\div 2 \\\\ &= " + fmt(th) + "^{\\circ} \\end{aligned} \\] So angle ACB is <b>\\(" + fmt(th) + "^{\\circ}\\)</b>.";
    ans = th;
  } else {
    prompt = "In the diagram, O is the centre of the circle. Angle ACB is an inscribed angle (its vertex is on the circle) and it measures \\(" + fmt(th) + "^{\\circ}\\). Angle AOB is a central angle (its vertex is at the centre) standing on the same arc AB. Find the measure of angle AOB, in degrees.";
    solution = "The central angle on an arc is twice the inscribed angle on the same arc: \\[ \\begin{aligned} \\angle AOB &= 2 \\times " + fmt(th) + "^{\\circ} \\\\ &= " + fmt(cen) + "^{\\circ} \\end{aligned} \\] So angle AOB is <b>\\(" + fmt(cen) + "^{\\circ}\\)</b>.";
    ans = cen;
  }
  var q = numq(prompt, ans, 0.01, solution, { mode: dbl ? "inscribed-to-central" : "central-to-inscribed", th: th, rot: rot });
  q.figure = fig;
  return q;
}, ["The central angle subtending an arc is twice the inscribed angle subtending the same arc.", "Decide whether the asked angle is the double or the half, then calculate."]);

// 6. 9.7 L2 num, CR 3: inscribed angle where the reflex central angle is the one to halve.
E("u8-inscribed-reflex", 8, ["9.7"], 2, "gen", function () {
  var th = pick([22, 26, 30, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70]);
  var rot = pick([0, 20, 40, 60, 80, 100]);
  var mode = pick(["minor", "reflex", "minorC"]);
  var aA = 270 - th + rot, aB = 270 + th + rot;
  var A = u8P(aA), B = u8P(aB);
  var minor = 2 * th, reflex = 360 - minor, ans = reflex / 2;
  var C, angs, prompt, solution;
  if (mode === "minor") {
    C = u8P(90 + rot); ans = th;
    angs = [{ v: "O", a1: aA, a2: aB, r: 0.3, lr: 0.52, label: fmt(minor) + "°" }];
    prompt = "In the diagram, O is the centre of the circle and the central angle AOB measures \\(" + fmt(minor) + "^{\\circ}\\). Point C is on the major arc AB (the longer arc between A and B). Find the measure of the inscribed angle ACB, in degrees.";
    solution = "Point C is on the major arc, so angle ACB subtends the minor arc AB and is half its central angle: \\[ \\begin{aligned} \\angle ACB &= " + fmt(minor) + "^{\\circ} \\div 2 \\\\ &= " + fmt(th) + "^{\\circ} \\end{aligned} \\] So angle ACB is <b>\\(" + fmt(th) + "^{\\circ}\\)</b>.";
  } else if (mode === "reflex") {
    C = u8P(270 + rot);
    angs = [{ v: "O", a1: aB, a2: aB + reflex, r: 0.34, lr: 0.6, label: fmt(reflex) + "°" }];
    prompt = "In the diagram, O is the centre of the circle. The marked central angle AOB is the reflex angle (greater than \\(180^{\\circ}\\)) and it measures \\(" + fmt(reflex) + "^{\\circ}\\). Point C is on the minor arc AB. Find the measure of the inscribed angle ACB, in degrees.";
    solution = "Angle ACB stands on the major arc AB, so it is half the reflex central angle on that same arc: \\[ \\begin{aligned} \\angle ACB &= " + fmt(reflex) + "^{\\circ} \\div 2 \\\\ &= " + fmt(ans) + "^{\\circ} \\end{aligned} \\] So angle ACB is <b>\\(" + fmt(ans) + "^{\\circ}\\)</b>.";
  } else {
    C = u8P(270 + rot);
    angs = [{ v: "O", a1: aA, a2: aB, r: 0.3, lr: 0.52, label: fmt(minor) + "°" }];
    prompt = "In the diagram, O is the centre of the circle and the marked central angle AOB measures \\(" + fmt(minor) + "^{\\circ}\\). Point C is on the minor arc AB (the shorter arc between A and B), so angle ACB stands on the major arc AB. Find the measure of angle ACB, in degrees.";
    solution = "Angle ACB stands on the major arc, so first find the reflex central angle on that arc, then halve it: \\[ \\begin{aligned} \\text{reflex } \\angle AOB &= 360^{\\circ} - " + fmt(minor) + "^{\\circ} = " + fmt(reflex) + "^{\\circ} \\\\ \\angle ACB &= " + fmt(reflex) + "^{\\circ} \\div 2 = " + fmt(ans) + "^{\\circ} \\end{aligned} \\] So angle ACB is <b>\\(" + fmt(ans) + "^{\\circ}\\)</b>.";
  }
  var fig = u8Fig({ pts: { A: A, B: B, C: C }, segs: [["O", "A"], ["O", "B"], ["C", "A"], ["C", "B"]], angles: angs });
  var q = numq(prompt, ans, 0.01, solution, { mode: "reflex-" + mode, th: th, rot: rot });
  q.figure = fig;
  return q;
}, ["An inscribed angle is half the central angle on the same arc, and the arc it stands on decides which central angle to use.", "Check which arc C sits on: the inscribed angle uses the central angle on the opposite arc, reflex if needed."]);

// 7. 9.8 L2 num, CR 2: angle in a semicircle is a right angle.
E("u8-semicircle-angle", 8, ["9.8"], 1, "gen", function () {
  var gam = pick([44, 52, 60, 68, 76, 84, 96, 104, 112, 120, 128, 136]);
  var rot = pick([0, 14, -14, 28]);
  var atA = Math.random() < 0.5;
  var A = u8Rot([-1, 0], rot), B = u8Rot([1, 0], rot), C = u8Rot(u8P(gam), rot);
  var angA = gam / 2, angB = 90 - angA;
  var given = atA ? angA : angB, ans = atA ? angB : angA;
  var gv = atA ? "A" : "B", ask = atA ? "B" : "A";
  var angs = [{ v: gv, a1: u8Dir(pts0(gv), C), a2: u8Dir(pts0(gv), pts0(ask)), r: 0.3, lr: 0.55, label: fmt(given) + "°" }];
  function pts0(n) { return n === "A" ? A : (n === "B" ? B : C); }
  var fig = u8Fig({
    pts: { A: A, B: B, C: C }, segs: [["A", "B"], ["A", "C"], ["B", "C"]], angles: angs,
    rightMarks: [{ v: "C", a1: u8Dir(C, A), a2: u8Dir(C, B) }]
  });
  var prompt = "In the diagram, AB is a diameter of the circle with centre O, and C is a point on the circle. Angle " + gv + " measures \\(" + fmt(given) + "^{\\circ}\\). Find the measure of angle " + ask + ", in degrees.";
  var solution = "An angle inscribed in a semicircle is a right angle, so angle C is \\(90^{\\circ}\\). The angles of triangle ABC add to \\(180^{\\circ}\\): \\[ \\begin{aligned} \\angle " + ask + " &= 180^{\\circ} - 90^{\\circ} - " + fmt(given) + "^{\\circ} \\\\ &= " + fmt(ans) + "^{\\circ} \\end{aligned} \\] So angle " + ask + " is <b>\\(" + fmt(ans) + "^{\\circ}\\)</b>.";
  var q = numq(prompt, ans, 0.01, solution, { mode: "semicircle-" + gv, gam: gam, rot: rot });
  q.figure = fig;
  return q;
}, ["An angle inscribed in a semicircle is a right angle, so angle C is 90 degrees.", "Use the angle sum of a triangle: subtract 90 and the given angle from 180."]);

// 8. 9.9 L2 MC, CR 2: inscribed angles on the same arc are equal.
E("u8-same-arc-angles", 8, ["9.9"], 1, "gen", function () {
  var v = pick([18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 62, 64, 66, 68, 70, 72]);
  var rot = pick([0, 18, 36, 54, 72, 90]);
  var A = u8P(200 + rot), B = u8P(340 + rot), C = u8P(80 + rot), D = u8P(135 + rot);
  var fig = u8Fig({
    pts: { A: A, B: B, C: C, D: D }, segs: [["C", "A"], ["C", "B"], ["D", "A"], ["D", "B"]],
    angles: [{ v: "C", a1: u8Dir(C, A), a2: u8Dir(C, B), r: 0.3, lr: 0.55, label: fmt(v) + "°" },
             { v: "D", a1: u8Dir(D, A), a2: u8Dir(D, B), r: 0.3, lr: 0.55, label: "?" }]
  });
  var prompt = "In the diagram, C and D are points on the same side of chord AB, so the inscribed angles ACB and ADB both stand on the same arc AB. Angle ACB measures \\(" + fmt(v) + "^{\\circ}\\). What is the measure of angle ADB?";
  var solution = "Inscribed angles subtending the same arc are equal, so angle ADB has the same measure as angle ACB: <b>\\(" + fmt(v) + "^{\\circ}\\)</b>.";
  var q = mcq(prompt,
    { t: "\\(" + fmt(v) + "^{\\circ}\\)", fb: "Correct. Inscribed angles on the same arc are equal." },
    [
      { t: "\\(" + fmt(v / 2) + "^{\\circ}\\)", fb: "Halving is for a central angle compared with an inscribed angle; these two angles are both inscribed on the same arc." },
      { t: "\\(" + fmt(2 * v) + "^{\\circ}\\)", fb: "Doubling gives the central angle on this arc, not another inscribed angle." },
      { t: "\\(" + fmt(180 - v) + "^{\\circ}\\)", fb: "That is the supplement of the angle; angles on the same arc are equal, not supplementary." }
    ],
    solution, { mode: "same-arc", v: v, rot: rot });
  q.figure = fig;
  return q;
}, ["Use the same-arc property: compare the two inscribed angles that stand on arc AB.", "Both angles have their vertices on the circle and their sides through A and B."]);

// 9. 9.5 L3 num, CR 3: two-step chord problem through the sagitta MD.
E("u8-chord-two-step", 8, ["9.5"], 3, "gen", function () {
  var tr = pick(U8_TRIPLES), k = pick([1, 2]);
  var d = tr[0] * k, half = tr[1] * k, r = tr[2] * k;
  if (Math.random() < 0.5) { var tmp = d; d = half; half = tmp; }
  var md = r - d, tilt = pick([0, 15, -15]);
  var A = u8Rot([-half / r, d / r], tilt), B = u8Rot([half / r, d / r], tilt), D = u8Rot([0, 1], tilt);
  var fig = u8Fig({
    pts: { A: A, B: B, D: D }, segs: [["A", "B"], ["O", "A"], ["M", "D"]], perp: ["A", "B"],
    sideLabs: [{ a: "O", b: "A", text: fmt(r) + " cm", off: 15 }, { a: "M", b: "D", text: fmt(md) + " cm", off: 15 }]
  });
  var prompt = "In the diagram, AB is a chord of a circle with centre O and radius \\(" + fmt(r) + "\\) cm. The line from O perpendicular to AB meets AB at M and meets the circle at D, with \\(MD = " + fmt(md) + "\\) cm. Find the length of the chord AB, in centimetres.";
  var solution = "First find OM: OD is a radius, so \\(OM = OD - MD\\). Then use the right triangle OMA, remembering the perpendicular from the centre bisects the chord: \\[ \\begin{aligned} OM &= " + fmt(r) + " - " + fmt(md) + " = " + fmt(d) + " \\\\ AM^{2} &= " + fmt(r) + "^{2} - " + fmt(d) + "^{2} = " + fmt(r * r - d * d) + " \\\\ AM &= " + fmt(half) + " \\\\ AB &= 2 \\times " + fmt(half) + " = " + fmt(2 * half) + " \\end{aligned} \\] So the chord length is <b>" + fmt(2 * half) + " cm</b>.";
  var q = numq(prompt, 2 * half, 0.01, solution, { mode: "chord-two-step", r: r, d: d, half: half, md: md, tilt: tilt });
  q.figure = fig;
  return q;
}, ["Work in two steps: a length first, then the chord property with the perpendicular from the centre.", "OD is a radius, so subtract MD from it to get OM, then use triangle OMA."]);

// 10. 9.5 L3 MC, CR 2: tangent right angle, then central to inscribed.
E("u8-tangent-central-inscribed", 8, ["9.5"], 3, "gen", function () {
  var delta = pick([40, 50, 55, 65, 70, 75]);
  var tAng = pick([200, 230, 260, 290, 320]);
  var sgn = Math.random() < 0.5 ? 1 : -1;
  var T = u8P(tAng);
  var rayAng = tAng + sgn * delta;
  var U = u8P(rayAng);
  var s = 1 / Math.cos(delta * Math.PI / 180);
  var P = [U[0] * s, U[1] * s];
  var D = U;
  var midMinor = tAng + sgn * delta / 2;
  var C = u8P(midMinor + 180);
  var pAng = 90 - delta, ans = delta / 2;
  var fig = u8Fig({
    pts: { T: T, P: P, D: D, C: C }, segs: [["O", "T"], ["O", "P"], ["C", "T"], ["C", "D"]],
    tangentSeg: { at: "T", to: "P", beyond: 1.05, back: 0.3 },
    rightMarks: [{ v: "T", a1: u8Dir(T, [0, 0]), a2: u8Dir(T, P) }],
    angles: [{ v: "P", a1: u8Dir(P, T), a2: u8Dir(P, [0, 0]), r: 0.3, lr: 0.55, label: fmt(pAng) + "°" },
             { v: "C", a1: u8Dir(C, T), a2: u8Dir(C, D), r: 0.3, lr: 0.55, label: "?" }]
  });
  var prompt = "In the diagram, the line through T and P is a tangent to the circle with centre O (a tangent touches the circle at exactly one point). The line from O through P meets the circle at D. Angle OPT measures \\(" + fmt(pAng) + "^{\\circ}\\), and C is a point on the major arc TD. Find the measure of the inscribed angle TCD, in degrees.";
  var solution = "The radius to a point of tangency is perpendicular to the tangent, so triangle OTP is right-angled at T. First find the central angle TOD, then halve it, since the inscribed angle on the same arc is half the central angle: \\[ \\begin{aligned} \\angle TOD &= 180^{\\circ} - 90^{\\circ} - " + fmt(pAng) + "^{\\circ} = " + fmt(delta) + "^{\\circ} \\\\ \\angle TCD &= " + fmt(delta) + "^{\\circ} \\div 2 = " + fmt(ans) + "^{\\circ} \\end{aligned} \\] So angle TCD is <b>\\(" + fmt(ans) + "^{\\circ}\\)</b>.";
  var q = mcq(prompt,
    { t: "\\(" + fmt(ans) + "^{\\circ}\\)", fb: "Correct. Angle TCD is the inscribed angle on arc TD, so it is half the central angle TOD: \\(" + fmt(delta) + "^{\\circ} \\div 2 = " + fmt(ans) + "^{\\circ}\\)." },
    [
      { t: "\\(" + fmt(delta) + "^{\\circ}\\)", fb: "That is the central angle TOD itself. The inscribed angle on the same arc is half the central angle, so \\(" + fmt(delta) + "^{\\circ}\\) still has to be halved." },
      { t: "\\(" + fmt(pAng) + "^{\\circ}\\)", fb: "That is angle OPT, the angle at P in right triangle OTP. The question asks for the inscribed angle TCD, which is half the central angle TOD." },
      { t: "\\(" + fmt(180 - ans) + "^{\\circ}\\)", fb: "That is the supplement of the answer, \\(180^{\\circ} - " + fmt(ans) + "^{\\circ}\\). Angle TCD is not supplementary to the central angle; it is half of it." }
    ],
    solution, { mode: "tangent-central-inscribed", delta: delta, tAng: tAng, sgn: sgn });
  q.figure = fig;
  return q;
}, ["Combine two properties: the radius to a tangent makes a right angle, and an inscribed angle is half the central angle on the same arc.", "First use the angle sum in right triangle OTP to find the central angle TOD."]);

/* Bimodal build additions (Nov 19, 2026): three selected-response entries on the unit's thinnest circle-geometry indicators, 9.8 (angle in a semicircle), 9.9 (inscribed angles on the same arc) and 9.6 (chord length from the perpendicular from the centre). SME-flagged for the specialist pass. */

// B1. 9.8 L2 MC: the angle in a semicircle, asked at C with no right-angle mark given away.
E("u8-add-semicircle-right-angle", 8, ["9.8"], 2, "gen", function () {
  var gam = 2 * ri(18, 72);
  var rot = pick([0, 14, -14, 28]);
  var atA = Math.random() < 0.5;
  var A = u8Rot([-1, 0], rot), B = u8Rot([1, 0], rot), C = u8Rot(u8P(gam), rot);
  var angA = gam / 2, angB = 90 - angA;
  var given = atA ? angA : angB;
  var gv = atA ? "A" : "B", other = atA ? "B" : "A";
  function pt(n) { return n === "A" ? A : (n === "B" ? B : C); }
  var fig = u8Fig({
    pts: { A: A, B: B, C: C }, segs: [["A", "B"], ["A", "C"], ["B", "C"]],
    angles: [{ v: gv, a1: u8Dir(pt(gv), C), a2: u8Dir(pt(gv), pt(other)), r: 0.3, lr: 0.55, label: fmt(given) + "°" }]
  });
  var prompt = "In the diagram, AB is a diameter of the circle with centre O, and C is a point on the circle. Angle " + (atA ? "CAB" : "CBA") + " measures \\(" + fmt(given) + "^{\\circ}\\). What is the measure of angle ACB?";
  var solution = "AB is a diameter, so angle ACB is an angle inscribed in a semicircle. Every angle inscribed in a semicircle is a right angle, whatever the size of the other angles in the triangle. So angle ACB is <b>\\(90^{\\circ}\\)</b>.";
  var q = mcq(prompt,
    { t: "\\(90^{\\circ}\\)", fb: "Correct. An angle inscribed in a semicircle is a right angle." },
    [
      { t: "\\(" + fmt(given) + "^{\\circ}\\)", fb: "That copies the given angle. Angle ACB is the angle in the semicircle, and it has its own fixed measure." },
      { t: "\\(" + fmt(90 - given) + "^{\\circ}\\)", fb: "That is the measure of the other acute angle of the triangle, at " + other + ". The question asks for the angle at C." },
      { t: "\\(" + fmt(180 - given) + "^{\\circ}\\)", fb: "That is the supplement of the given angle. Angle ACB is not supplementary to the given angle." }
    ],
    solution, { mode: "semicircle-right-angle", gam: gam, rot: rot, gv: gv });
  q.figure = fig;
  return q;
}, ["AB is a diameter, so the angle at C is an angle in a semicircle.", "The angle in a semicircle has the same measure for every position of C on the circle."]);

// B2. 9.9 L2 MC: name the angle that must equal a given inscribed angle on the same arc.
E("u8-add-same-arc-name", 8, ["9.9"], 2, "gen", function () {
  var v = ri(18, 75);
  var rot = pick([0, 18, 36, 54, 72, 90]);
  var A = u8P(200 + rot), B = u8P(340 + rot), C = u8P(80 + rot), D = u8P(135 + rot);
  var fig = u8Fig({
    pts: { A: A, B: B, C: C, D: D }, segs: [["C", "A"], ["C", "B"], ["D", "A"], ["D", "B"]],
    angles: [{ v: "C", a1: u8Dir(C, A), a2: u8Dir(C, B), r: 0.3, lr: 0.55, label: fmt(v) + "°" }]
  });
  var prompt = "In the diagram, A, B, C and D are points on a circle with centre O. Points C and D are on the same side of chord AB, and angle ACB measures \\(" + fmt(v) + "^{\\circ}\\). Which angle must have the same measure as angle ACB?";
  var solution = "Angles ACB and ADB are both inscribed angles standing on the same arc AB, with their vertices on the same side of chord AB. Inscribed angles subtending the same arc are equal. So the angle with the same measure is <b>Angle ADB</b>.";
  var q = mcq(prompt,
    { t: "Angle ADB", fb: "Correct. Angle ADB is an inscribed angle on the same arc AB." },
    [
      { t: "Angle AOB", fb: "Angle AOB is the central angle on arc AB. A central angle is twice the inscribed angle on the same arc, not equal to it." },
      { t: "Angle OAB", fb: "Angle OAB sits inside triangle OAB, at the end of a radius. It is not an inscribed angle standing on arc AB." },
      { t: "Angle ABO", fb: "Angle ABO also sits inside triangle OAB, at the end of a radius. It is not an inscribed angle standing on arc AB." }
    ],
    solution, { mode: "same-arc-name", v: v, rot: rot });
  q.figure = fig;
  return q;
}, ["Look for another angle whose vertex is on the circle and whose sides pass through A and B.", "Angles at the centre and angles inside triangle OAB follow different rules."]);

// B3. 9.6 L2 MC: chord length, or half-chord length, from the radius and the distance from the centre, with the doubling and addition errors offered.
E("u8-add-chord-length-mc", 8, ["9.6"], 2, "gen", function () {
  var tr = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41], [12, 35, 37], [28, 45, 53]]), k = pick([1, 2]);
  var d = tr[0] * k, half = tr[1] * k, r = tr[2] * k;
  if (Math.random() < 0.5) { var tmp = d; d = half; half = tmp; }
  var askAB = Math.random() < 0.5;
  var tilt = pick([0, 15, -15, 30, -30]);
  var A = u8Rot([-half / r, d / r], tilt), B = u8Rot([half / r, d / r], tilt);
  var fig = u8Fig({
    pts: { A: A, B: B }, segs: [["A", "B"], ["O", "A"]], perp: ["A", "B"],
    sideLabs: [{ a: "O", b: "A", text: fmt(r) + " cm", off: 15 }, { a: "O", b: "M", text: fmt(d) + " cm", off: 15 }]
  });
  var steps = "The perpendicular from the centre bisects the chord, so \\(AM = MB\\). Triangle OMA is right-angled at M: \\[ \\begin{aligned} AM^{2} &= OA^{2} - OM^{2} \\\\ &= " + fmt(r) + "^{2} - " + fmt(d) + "^{2} = " + fmt(r * r - d * d) + " \\\\ AM &= " + fmt(half) + " \\end{aligned} \\]";
  var prompt, solution, keyT, keyFb, ds;
  if (askAB) {
    prompt = "In the diagram, AB is a chord of a circle with centre O and radius \\(" + fmt(r) + "\\) cm. The perpendicular from O meets AB at M, and \\(OM = " + fmt(d) + "\\) cm. What is the length of the chord AB, in centimetres?";
    solution = steps + " The chord is twice AM: \\[ \\begin{aligned} AB &= 2 \\times " + fmt(half) + " = " + fmt(2 * half) + " \\end{aligned} \\] So the chord length is <b>" + fmt(2 * half) + " cm</b>.";
    keyT = fmt(2 * half);
    keyFb = "Correct. AM is " + fmt(half) + " cm and the chord is twice AM.";
    ds = [
      { t: fmt(half), fb: "That is only half of the chord, the length AM. The perpendicular from the centre bisects the chord, so AM still has to be doubled." },
      { t: fmt(d + half), fb: "That adds OM and AM together. The chord is twice AM, not OM plus AM." },
      { t: fmt(r + half), fb: "That adds the radius to AM. The radius was already used to find AM; the chord is twice AM." }
    ];
  } else {
    prompt = "In the diagram, AB is a chord of a circle with centre O and radius \\(" + fmt(r) + "\\) cm. The perpendicular from O meets AB at M, and \\(OM = " + fmt(d) + "\\) cm. What is the length of AM, in centimetres?";
    solution = steps + " So the length of AM is <b>" + fmt(half) + " cm</b>.";
    keyT = fmt(half);
    keyFb = "Correct. Pythagoras in triangle OMA gives AM directly.";
    ds = [
      { t: fmt(2 * half), fb: "That is the full chord AB. The question asks for AM, which is half of the chord." },
      { t: fmt(r - d), fb: "That subtracts OM from the radius. AM comes from Pythagoras in triangle OMA, not from subtracting the two given lengths." },
      { t: fmt(d + half), fb: "That adds OM to the value of AM. The two lengths are not added anywhere in this calculation." }
    ];
  }
  var q = mcq(prompt,
    { t: keyT, fb: keyFb },
    ds,
    solution, { mode: askAB ? "chord-length-mc" : "half-chord-mc", r: r, d: d, half: half, tilt: tilt });
  q.figure = fig;
  return q;
}, ["The perpendicular from the centre to a chord bisects the chord, and it makes a right triangle with a radius.", "Find AM with Pythagoras in triangle OMA, and check whether the question asks for AM or for the whole chord."]);

// Unit 9: Probability and Statistics (Math 9, NL). Entries only; helpers prefixed u9.

/* ----- bank-u9.js ----- */
// Math 9 Unit 9 Probability and Statistics question bank
// Cut verbatim from the standalone bank source
// (math-9-review/bank-src.js, lines 4981 to 5766).
// CRMARKS: u9-combined-decision=3
// CRMARKS: u9-collection-problem=3
// CRMARKS: u9-collection-biggest-threat=3
// CRMARKS: u9-match-influence=3
// CRMARKS: u9-rubric-missing-part=2
// CRMARKS: u9-plan-element=2
// BIMODAL: u9-collection-biggest-threat=b
E("u9-prob-in-media", 9, ["12.1"], 1, "var", varset([
  function(){
    return mcq("Four short items appear in a school newsletter. Which item uses probability?",
      {t:"There is a 70% chance of snow for the outdoor skating party on Friday", fb:"Right: a percent chance states how likely the snow is, which is probability in use."},
      [{t:"The skating party will start at noon on Friday in the school gym lobby", fb:"That item gives a time and a place, with no statement about how likely anything is."},
       {t:"Last winter the school held three skating parties for students and staff", fb:"That item reports a count from the past, with no statement about chance."},
       {t:"Students voted skating as their favourite winter activity this school year", fb:"That item reports a vote result, with no statement about how likely an event is."}],
      "Probability is used when a statement gives how likely an event is. The item that uses probability is <b>the 70% chance of snow for the skating party</b>.",
      {mode:"media-weather"});
  },
  function(){
    return mcq("Four short items appear on a sports page. Which item uses probability?",
      {t:"Forecasters give the home team a 3 in 5 chance of winning on Saturday", fb:"Right: a 3 in 5 chance states how likely a win is, which is probability in use."},
      [{t:"The home team scored two late goals to win the game on Saturday", fb:"That item reports what already happened, with no statement about chance."},
       {t:"Tickets for the game on Saturday cost eight dollars at the door", fb:"That item gives a price, with no statement about how likely anything is."},
       {t:"The team will practise on Tuesday and Thursday evenings this week", fb:"That item gives a schedule, with no statement about how likely an event is."}],
      "Probability is used when a statement gives how likely an event is. The item that uses probability is <b>the 3 in 5 chance of winning on Saturday</b>.",
      {mode:"media-sports"});
  },
  function(){
    return mcq("Four short items appear on a clinic poster board. Which item uses probability?",
      {t:"A health poster says about 1 in 4 teens will catch a cold this winter", fb:"Right: 1 in 4 states how likely catching a cold is, which is probability in use."},
      [{t:"The clinic is open on weekdays from nine in the morning until five", fb:"That item gives opening hours, with no statement about how likely anything is."},
       {t:"Washing hands with soap helps remove germs picked up during the day", fb:"That item gives health advice, with no statement about chance."},
       {t:"Two nurses and one doctor work at the clinic on most weekdays in town", fb:"That item reports a staffing count, with no statement about how likely an event is."}],
      "Probability is used when a statement gives how likely an event is. The item that uses probability is <b>about 1 in 4 teens catching a cold this winter</b>.",
      {mode:"media-health"});
  },
  function(){
    return mcq("Four short items appear in a student council report. Which item uses probability?",
      {t:"A poll gives one candidate a 55% chance of winning the council vote", fb:"Right: a 55% chance states how likely a win is, which is probability in use."},
      [{t:"Voting for student council will take place in the gym at lunch time", fb:"That item gives a place and a time, with no statement about chance."},
       {t:"Three candidates are running for president of the student council", fb:"That item gives a count of candidates, with no statement about how likely anything is."},
       {t:"Last year the council raised money with a bake sale in the fall", fb:"That item reports a past event, with no statement about how likely an event is."}],
      "Probability is used when a statement gives how likely an event is. The item that uses probability is <b>the 55% chance of winning the council vote</b>.",
      {mode:"media-election"});
  },
  function(){
    return mcq("Four short items appear on signs at a school fair. Which item uses probability?",
      {t:"A game sign says players have a 1 in 6 chance of winning a prize", fb:"Right: a 1 in 6 chance states how likely a win is, which is probability in use."},
      [{t:"The ring toss game costs two dollars for three tries at the fair", fb:"That sign gives a price, with no statement about how likely anything is."},
       {t:"Prizes for the games are kept on the top shelf of the booth", fb:"That sign gives a location, with no statement about chance."},
       {t:"The school fair opens at six in the evening and closes at nine", fb:"That sign gives opening hours, with no statement about how likely an event is."}],
      "Probability is used when a statement gives how likely an event is. The item that uses probability is <b>the 1 in 6 chance of winning a prize</b>.",
      {mode:"media-fair"});
  },
  function(){
    return mcq("Four short items appear in a community radio report. Which item uses probability?",
      {t:"The report says there is a 40% chance of rain for the festival weekend", fb:"Right: a 40% chance states how likely rain is, which is probability in use."},
      [{t:"The harbour festival will run from Friday evening until Sunday night", fb:"That item gives dates, with no statement about how likely anything is."},
       {t:"Last summer forty boats took part in the harbour festival boat parade", fb:"That item reports a count from the past, with no statement about chance."},
       {t:"Festival tickets can be bought at the town office during the week", fb:"That item tells where to buy tickets, with no statement about how likely an event is."}],
      "Probability is used when a statement gives how likely an event is. The item that uses probability is <b>the 40% chance of rain for the festival weekend</b>.",
      {mode:"media-festival"});
  }
]), ["Probability shows up as a chance, an odds statement or a percent chance that something will happen.", "Scan the four items for words like chance, in 4, or percent, tied to a future event."]);

E("u9-assumption-limit", 9, ["12.2"], 1, "var", varset([
  function(){
    return mcq("A student says the probability of heads on a coin toss is \\(\\frac{1}{2}\\). Which option states the assumption behind this probability and its limitation?",
      {t:"It assumes the coin and the toss are fair; it fails if the coin is bent or tossed unevenly", fb:"Right: equal chances need a fair coin, and damage or an uneven toss breaks that assumption."},
      [{t:"It assumes heads came up half the time last week; it fails if the coin is tossed only a few times", fb:"Last week results describe experimental probability, but the stated value comes from equal outcomes."},
       {t:"It assumes the student wants heads to come up; it fails if the student hopes for tails instead", fb:"Wanting an outcome is a personal feeling, but the stated value comes from the two equal sides."},
       {t:"It assumes the coin has landed heads many times; it fails if the coin is fair and lands evenly", fb:"A fair coin supports the value rather than limiting it, and past landings are not the assumption."}],
      "The value \\(\\frac{1}{2}\\) rests on equally likely outcomes, so it assumes a fair coin and a fair toss. The correct statement is <b>it assumes the coin and the toss are fair; it fails if the coin is bent or tossed unevenly</b>.",
      {mode:"assume-coin"});
  },
  function(){
    return mcq("A game sheet says the probability of rolling a 6 on a die is \\(\\frac{1}{6}\\). Which option states the assumption behind this probability and its limitation?",
      {t:"It assumes all six faces are equally likely; it fails if the die is chipped or weighted", fb:"Right: the value counts six equal faces, and damage or weighting makes the faces unequal."},
      [{t:"It assumes a 6 came up once in the last six rolls; it fails if the next roll is also a 6", fb:"Recent rolls describe experimental results, but the stated value comes from counting equal faces."},
       {t:"It assumes the player feels lucky about rolling a 6; it fails if the player feels unlucky", fb:"A feeling is subjective judgement, but the stated value comes from the six equal faces."},
       {t:"It assumes the die is rolled on a hard table top; it fails if the die is rolled on carpet", fb:"The rolling surface does not set the value; equal faces do, and damage is the real limit."}],
      "The value \\(\\frac{1}{6}\\) rests on six equally likely faces, so it assumes a fair die. The correct statement is <b>it assumes all six faces are equally likely; it fails if the die is chipped or weighted</b>.",
      {mode:"assume-die"});
  },
  function(){
    return mcq("A poll of 400 voters says a mayor has a 52% chance of winning the town election. Which option states the assumption behind this probability and its limitation?",
      {t:"It assumes the voters polled represent all voters; it fails if whole groups were left out", fb:"Right: a poll speaks for everyone only when the sample matches the whole voting population."},
      [{t:"It assumes every voter answered the poll; it fails if the winner gets under half the votes", fb:"Only 400 voters were polled, so the claim rests on that sample standing for the rest."},
       {t:"It assumes the mayor is the strongest candidate; it fails if another candidate campaigns harder", fb:"Candidate strength is a judgement call, but the stated chance comes from the poll sample."},
       {t:"It assumes the election uses a fair coin to break ties; it fails if no tie happens in the vote", fb:"Tie breaking plays no part here; the chance comes from voters sampled in the poll."}],
      "A poll probability rests on the sample standing for the whole population of voters. The correct statement is <b>it assumes the voters polled represent all voters; it fails if whole groups were left out</b>.",
      {mode:"assume-poll"});
  },
  function(){
    return mcq("A forecast says there is an 80% chance of rain for a school field trip tomorrow. Which option states the assumption behind this probability and its limitation?",
      {t:"It assumes the weather model fits local conditions; it fails when coastal weather changes fast", fb:"Right: the percent comes from a model, and fast changing coastal conditions can outrun the model."},
      [{t:"It assumes rain fell on 8 of the last 10 field trips; it fails if the class stays inside all day", fb:"Past trips would be experimental data, but a forecast percent comes from a weather model."},
       {t:"It assumes the teacher expects rain on the field trip; it fails if the teacher expects sunshine", fb:"A teacher expectation is a personal judgement, but the stated percent comes from the forecast model."},
       {t:"It assumes every student brings a rain jacket along; it fails if some students forget their jackets", fb:"Student gear does not set the forecast percent; the weather model and its limits do."}],
      "A forecast probability rests on a weather model matching the local conditions ahead. The correct statement is <b>it assumes the weather model fits local conditions; it fails when coastal weather changes fast</b>.",
      {mode:"assume-forecast"});
  },
  function(){
    return mcq("A card sheet says the probability of drawing an ace from a full deck is \\(\\frac{4}{52}\\). Which option states the assumption behind this probability and its limitation?",
      {t:"It assumes the deck is complete and well shuffled; it fails if cards are missing or poorly mixed", fb:"Right: the count needs all 52 cards present, and missing cards or poor shuffling breaks it."},
      [{t:"It assumes an ace was drawn 4 times in 52 past draws; it fails if the deck is complete and shuffled", fb:"Past draws describe experimental results, and a complete shuffled deck supports the count."},
       {t:"It assumes the player believes an ace is due soon; it fails if the player believes otherwise", fb:"A belief about being due is subjective, but the stated value comes from counting the deck."},
       {t:"It assumes the cards are dealt face up on the table; it fails if the cards are dealt face down", fb:"Face up or face down does not change the count; missing or unmixed cards are the real limit."}],
      "The value \\(\\frac{4}{52}\\) rests on counting a complete deck with every card equally likely to be drawn. The correct statement is <b>it assumes the deck is complete and well shuffled; it fails if cards are missing or poorly mixed</b>.",
      {mode:"assume-cards"});
  },
  function(){
    return mcq("A teacher says the probability of picking a red marble from a bag with 3 red and 3 blue marbles is \\(\\frac{1}{2}\\). Which option states the assumption behind this probability and its limitation?",
      {t:"It assumes the marbles feel alike and are well mixed; it fails if sizes differ or mixing is poor", fb:"Right: a blind draw is equal only when marbles cannot be told apart and are mixed well."},
      [{t:"It assumes a red marble was picked half the time before; it fails if the bag holds equal colours", fb:"Earlier picks describe experimental results, and equal colours support the stated count."},
       {t:"It assumes the student hopes to pick a red marble; it fails if the student hopes for blue instead", fb:"Hoping is a personal feeling, but the stated value comes from the equal colour counts."},
       {t:"It assumes the bag is placed on the teacher desk; it fails if the bag is placed on a shelf", fb:"Where the bag sits does not set the value; equal, well mixed marbles are what matter."}],
      "The value \\(\\frac{1}{2}\\) rests on a blind draw from equal numbers of alike, well mixed marbles. The correct statement is <b>it assumes the marbles feel alike and are well mixed; it fails if sizes differ or mixing is poor</b>.",
      {mode:"assume-marbles"});
  }
]), ["Every stated probability rests on an assumption: ask what must be true for the number to hold.", "Name what the number counts or is based on first, then ask what could make that basis fail."]);

E("u9-same-number-two-sides", 9, ["12.3"], 2, "var", varset([
  function(){
    return mcq("A clinic reports that a treatment helped 7 out of 10 patients. Supporters say most patients improved. How could people who oppose the treatment use the same result to argue their side?",
      {t:"They can say it did not help 3 out of 10 patients, so almost a third saw no benefit", fb:"Right: the same result leaves 3 out of 10 unhelped, and that count supports the other side."},
      [{t:"They can say it helped only 7 out of 20 patients, so under half of patients improved", fb:"That changes the total from 10 to 20, which invents a new result instead of reusing the same one."},
       {t:"They can say it helped 10 out of 7 patients, so the report must have counted wrongly", fb:"A count of 10 out of 7 is impossible, and it does not restate the reported result at all."},
       {t:"They can say patients disliked the clinic waiting room, so the treatment should be stopped", fb:"Waiting room opinions are a different topic; the opposing case must reuse the same 7 out of 10."}],
      "One probability or rate can support opposing positions by stressing the opposite outcome: 7 out of 10 helped also means 3 out of 10 were not helped. The opposing use is <b>it did not help 3 out of 10 patients</b>.",
      {mode:"twosides-treatment"});
  },
  function(){
    return mcq("A report says 8 out of 10 students passed a safety course at school. Leaders say the course works well. How could critics use the same result to argue the course needs changes?",
      {t:"They can say 2 out of 10 students did not pass, so one in five students was left behind", fb:"Right: the same result leaves 2 out of 10 without a pass, and that count supports the critics."},
      [{t:"They can say only 8 out of 100 students passed, so the course failed almost every student", fb:"That changes the total from 10 to 100, which invents a new result instead of reusing the same one."},
       {t:"They can say the course ran for ten weeks in the fall term, so the schedule needs changes", fb:"Course length is a different topic; the critics case must reuse the same 8 out of 10 result."},
       {t:"They can say 10 out of 8 students passed the course, so the marking must have been too easy", fb:"A count of 10 out of 8 is impossible, and it does not restate the reported result at all."}],
      "One result can support opposing positions by stressing the opposite outcome: 8 out of 10 passing also means 2 out of 10 did not pass. The critics use is <b>2 out of 10 students did not pass</b>.",
      {mode:"twosides-course"});
  },
  function(){
    return mcq("A store reports that 75% of customers were happy with a new self checkout. Managers say customers love the change. How could opponents use the same result to argue against the change?",
      {t:"They can say 25% of customers were unhappy, so one in four customers had a poor experience", fb:"Right: 75% happy leaves 25% unhappy, and that share supports the opposing side."},
      [{t:"They can say 75% of customers were unhappy, so three in four customers disliked the change", fb:"That swaps the happy and unhappy shares, which misstates the reported result."},
       {t:"They can say the store is open 75% of the day, so the checkouts sit idle too often", fb:"Opening hours are a different topic; the opposing case must reuse the same satisfaction result."},
       {t:"They can say only 7.5 customers were happy, so the change pleased very few people", fb:"A count of 7.5 customers makes no sense; the result is a percent of all customers."}],
      "One percent can support opposing positions by stressing the opposite share: 75% happy also means 25% unhappy. The opposing use is <b>25% of customers were unhappy</b>.",
      {mode:"twosides-checkout"});
  },
  function(){
    return mcq("A school team won 6 of its 10 games this season. Fans say the team had a strong season. How could critics use the same result to argue the season was weak?",
      {t:"They can say the team failed to win 4 of its 10 games, so it lost ground in most close races", fb:"Right: winning 6 of 10 also means failing to win 4 of 10, and that count supports the critics."},
      [{t:"They can say the team won only 6 of its 20 games, so it won under a third of its games", fb:"That changes the total from 10 to 20, which invents a new result instead of reusing the same one."},
       {t:"They can say the team practised 10 times a month, so the players trained far too little", fb:"Practice counts are a different topic; the critics case must reuse the same 6 of 10 result."},
       {t:"They can say the team won 10 of its 6 games, so the record book must be wrong after all", fb:"A count of 10 out of 6 is impossible, and it does not restate the reported result at all."}],
      "One record can support opposing positions by stressing the opposite outcome: winning 6 of 10 also means failing to win 4 of 10. The critics use is <b>the team failed to win 4 of its 10 games</b>.",
      {mode:"twosides-team"});
  },
  function(){
    return mcq("At a taste test, 4 out of 5 students liked a new cafeteria drink. The cafeteria says the drink is a hit. How could students who want a different drink use the same result to argue their side?",
      {t:"They can say 1 out of 5 students did not like the drink, so a fifth of students want a change", fb:"Right: liking by 4 out of 5 leaves 1 out of 5 who did not like it, supporting the other side."},
      [{t:"They can say only 4 out of 50 students liked the drink, so almost nobody enjoyed it at all", fb:"That changes the total from 5 to 50, which invents a new result instead of reusing the same one."},
       {t:"They can say the drink comes in 5 flavours at the store, so the cafeteria chose the wrong one", fb:"Store flavours are a different topic; the opposing case must reuse the same 4 out of 5 result."},
       {t:"They can say 5 out of 4 students liked the drink, so the taste test was counted poorly", fb:"A count of 5 out of 4 is impossible, and it does not restate the reported result at all."}],
      "One result can support opposing positions by stressing the opposite outcome: 4 out of 5 liking a drink also means 1 out of 5 did not like it. The opposing use is <b>1 out of 5 students did not like the drink</b>.",
      {mode:"twosides-drink"});
  }
]), ["The same number can be framed by its opposite outcome: what did not happen, out of the same total.", "Subtract the stated count from the total to find the count the other side will stress."]);

E("u9-combined-decision", 9, ["12.4"], 1, "var", varset([
  function(){
    return mcq("A coach must choose a shooter for a final free throw. The chance from the chart counts equally likely outcomes, practice trials show the shooter made 18 of 20 shots this week, and the coach feels this player stays calm under pressure. Which option describes how the three kinds of probability combine in this decision?",
      {t:"The chart gives theoretical probability, the practice record gives experimental probability, and the calm feeling is subjective judgement", fb:"Right: equal outcomes are theoretical, trial results are experimental, and a feeling is subjective."},
      [{t:"The chart gives experimental probability, the practice record gives theoretical probability, and the calm feeling is subjective judgement", fb:"The chart counts set outcomes, which is theoretical, while counted practice shots are experimental."},
       {t:"The chart gives theoretical probability, the practice record gives subjective judgement, and the calm feeling is experimental probability", fb:"Counted practice shots are data from trials, and a feeling is a judgement, so those two are swapped."},
       {t:"The chart gives subjective judgement, the practice record gives experimental probability, and the calm feeling is theoretical probability", fb:"A chart of equal outcomes is not a feeling, and a feeling is not a count of equal outcomes."}],
      "Decisions often combine all three kinds: theoretical probability from equally likely outcomes, experimental probability from trials, and subjective judgement from personal feel. Here the correct description is <b>the chart is theoretical, the practice record is experimental, and the calm feeling is subjective judgement</b>.",
      {mode:"combine-coach"});
  },
  function(){
    return mcq("A board game player decides whether to risk a move. The die gives six equally likely faces, the player remembers rolling many low numbers in past games, and the player feels a high roll is due this turn. Which option describes how the three kinds of probability combine in this decision?",
      {t:"The die faces give theoretical probability, past rolls give experimental probability, and the due feeling is subjective judgement", fb:"Right: equal faces are theoretical, remembered results are experimental, and a due feeling is subjective."},
      [{t:"The die faces give subjective judgement, past rolls give theoretical probability, and the due feeling is experimental probability", fb:"Equal faces are counted, not felt, and remembered rolls are trial results rather than theory."},
       {t:"The die faces give theoretical probability, past rolls give subjective judgement, and the due feeling is experimental probability", fb:"Remembered rolls are records of trials, and a feeling of being due is a judgement, so those are swapped."},
       {t:"The die faces give experimental probability, past rolls give subjective judgement, and the due feeling is theoretical probability", fb:"No part is matched correctly here: faces are counted, rolls are trials, and feelings are judgements."}],
      "Decisions often combine all three kinds: theoretical probability from equally likely outcomes, experimental probability from past trials, and subjective judgement from personal feel. Here the correct description is <b>the die faces are theoretical, past rolls are experimental, and the due feeling is subjective judgement</b>.",
      {mode:"combine-boardgame"});
  },
  function(){
    return mcq("A farmer in the valley decides when to plant. A forecast model gives a 60% chance of rain this week, her own fields gave good crops in 4 of the last 5 wet springs, and she judges her soil feels ready when she checks it by hand. Which option describes how the three kinds of probability combine in this decision?",
      {t:"The forecast model gives theoretical probability, her field records give experimental probability, and her soil feel is subjective judgement", fb:"Right: a model estimate is theoretical, her recorded springs are experimental, and hand feel is subjective."},
      [{t:"The forecast model gives experimental probability, her field records give subjective judgement, and her soil feel is theoretical probability", fb:"Her own past springs are trial records, not feelings, and a hand check is a judgement, not a model."},
       {t:"The forecast model gives subjective judgement, her field records give experimental probability, and her soil feel is theoretical probability", fb:"The forecast comes from a model rather than a feeling, and the soil check is the personal judgement."},
       {t:"The forecast model gives theoretical probability, her field records give subjective judgement, and her soil feel is experimental probability", fb:"Field records over five springs are data from trials, while the soil feel is the judgement part."}],
      "Decisions often combine all three kinds: theoretical probability from a model, experimental probability from recorded trials, and subjective judgement from personal feel. Here the correct description is <b>the forecast is theoretical, the field records are experimental, and the soil feel is subjective judgement</b>.",
      {mode:"combine-farmer"});
  },
  function(){
    return mcq("A fishing captain decides whether to head out at dawn. A forecast model gives a 30% chance of high winds, his logbook shows rough seas on 2 of his last 10 dawn trips, and he judges the sky looks settled when he studies it at the wharf. Which option describes how the three kinds of probability combine in this decision?",
      {t:"The forecast model gives theoretical probability, the logbook gives experimental probability, and the sky judgement is subjective judgement", fb:"Right: the model is theoretical, the logged trips are experimental, and reading the sky is subjective."},
      [{t:"The forecast model gives subjective judgement, the logbook gives theoretical probability, and the sky judgement is experimental probability", fb:"A logbook is a record of trials, not theory, and reading the sky is a judgement, not a trial."},
       {t:"The forecast model gives theoretical probability, the logbook gives subjective judgement, and the sky judgement is experimental probability", fb:"Logged past trips are data from trials, and a personal reading of the sky is the judgement part."},
       {t:"The forecast model gives experimental probability, the logbook gives subjective judgement, and the sky judgement is theoretical probability", fb:"The model estimate is not trial data, and neither the logbook nor the sky reading is a theory count."}],
      "Decisions often combine all three kinds: theoretical probability from a model, experimental probability from recorded trials, and subjective judgement from personal feel. Here the correct description is <b>the forecast is theoretical, the logbook is experimental, and the sky judgement is subjective judgement</b>.",
      {mode:"combine-captain"});
  },
  function(){
    return mcq("A student chooses which carnival game to play. One game wins on 2 of 8 equally likely spinner sections, the student watched 30 plays at another game and saw 6 wins, and the student feels the third game is the luckiest of the row. Which option describes how the three kinds of probability combine in this decision?",
      {t:"The spinner count gives theoretical probability, the watched plays give experimental probability, and the lucky feeling is subjective judgement", fb:"Right: equal sections are theoretical, watched plays are experimental, and a lucky feeling is subjective."},
      [{t:"The spinner count gives experimental probability, the watched plays give subjective judgement, and the lucky feeling is theoretical probability", fb:"Counting equal sections is theory, watched plays are trial data, and luck is a feeling, so all three shift."},
       {t:"The spinner count gives subjective judgement, the watched plays give experimental probability, and the lucky feeling is theoretical probability", fb:"A count of equal sections is not a feeling, and a lucky feeling is not a count of outcomes."},
       {t:"The spinner count gives theoretical probability, the watched plays give subjective judgement, and the lucky feeling is experimental probability", fb:"Watched plays supply real trial results, and the lucky feeling is the judgement, so those two are swapped."}],
      "Decisions often combine all three kinds: theoretical probability from equally likely outcomes, experimental probability from observed trials, and subjective judgement from personal feel. Here the correct description is <b>the spinner count is theoretical, the watched plays are experimental, and the lucky feeling is subjective judgement</b>.",
      {mode:"combine-carnival"});
  }
]), ["Sort the decision into three parts: counted equal outcomes, results from trials, and a personal feeling.", "Match each detail in order: equal outcomes first, trial results second, feelings last."]);

E("u9-classify-probability", 9, ["12.4"], 1, "var", varset([
  function(){
    return mcq("Maya flipped a coin 50 times and it landed on heads 28 times. She says her chance of heads is 28 out of 50. Which option classifies this judgement correctly?",
      {t:"Experimental probability, because it is based on results from trials that were carried out", fb:"Right: the value comes from counting what happened in 50 real trials."},
      [{t:"Theoretical probability, because it is based on results from trials that were carried out", fb:"The reason names trials, which is experimental; theoretical counts equally likely outcomes instead."},
       {t:"Subjective judgement, because it is based on results from trials that were carried out", fb:"The reason names counted trial results, which is data, while subjective judgement rests on a feeling."},
       {t:"Theoretical probability, because it is based on counting the equally likely sides of a coin", fb:"Maya used her flip results, not the two equal sides, so this reason describes a different judgement."}],
      "A probability built from the results of trials that were carried out is experimental probability. The correct classification is <b>experimental probability, because it is based on results from trials</b>.",
      {mode:"classify-flips"});
  },
  function(){
    return mcq("Liam counts the cards in a full deck and says his chance of drawing a heart is 13 out of 52, or \\(\\frac{1}{4}\\). Which option classifies this judgement correctly?",
      {t:"Theoretical probability, because it is based on counting the equally likely cards in a deck", fb:"Right: the value comes from counting outcomes in a full deck where each card is equally likely."},
      [{t:"Experimental probability, because it is based on counting the equally likely cards in a deck", fb:"The reason names counting equal outcomes, which is theoretical; experimental needs trial results."},
       {t:"Subjective judgement, because it is based on counting the equally likely cards in a deck", fb:"The reason names a count of outcomes, which is worked out, while subjective judgement rests on a feeling."},
       {t:"Experimental probability, because it is based on results from cards drawn in earlier games", fb:"Liam counted the deck itself and drew no cards, so no earlier game results are involved here."}],
      "A probability built by counting equally likely outcomes is theoretical probability. The correct classification is <b>theoretical probability, because it is based on counting the equally likely cards</b>.",
      {mode:"classify-deck"});
  },
  function(){
    return mcq("A teacher looks at a new class list and says she feels about two thirds of the class will enjoy the outdoor lesson, before meeting any of the students. Which option classifies this judgement correctly?",
      {t:"Subjective judgement, because it is based on a personal feeling with no counts or trials", fb:"Right: with no outcomes counted and no trials run, the estimate rests on personal feeling alone."},
      [{t:"Theoretical probability, because it is based on a personal feeling with no counts or trials", fb:"The reason names a feeling with no counts, which is subjective; theoretical needs counted equal outcomes."},
       {t:"Experimental probability, because it is based on a personal feeling with no counts or trials", fb:"The reason names a feeling with no trials, which is subjective; experimental needs results from trials."},
       {t:"Theoretical probability, because it is based on counting the equally likely names on the list", fb:"The teacher counted nothing on the list; she gave a feeling before meeting the class at all."}],
      "A probability that rests on a personal feeling, with no counts and no trials, is subjective judgement. The correct classification is <b>subjective judgement, because it is based on a personal feeling</b>.",
      {mode:"classify-teacher-feel"});
  },
  function(){
    return mcq("A spinner has 8 equal sections and 2 of them are red. Noah says the chance of landing on red is \\(\\frac{2}{8}\\), or \\(\\frac{1}{4}\\). Which option classifies this judgement correctly?",
      {t:"Theoretical probability, because it is based on counting the equally likely sections of a spinner", fb:"Right: the value comes from counting red sections out of equal sections, with no spins needed."},
      [{t:"Experimental probability, because it is based on counting the equally likely sections of a spinner", fb:"The reason names counting equal sections, which is theoretical; experimental needs results from spins."},
       {t:"Subjective judgement, because it is based on counting the equally likely sections of a spinner", fb:"The reason names a count of sections, which is worked out, while subjective judgement rests on a feeling."},
       {t:"Experimental probability, because it is based on results from spins the student did earlier", fb:"Noah counted the sections and did no spins, so no earlier spin results are involved here."}],
      "A probability built by counting equally likely outcomes is theoretical probability: \\(\\frac{2}{8} = \\frac{1}{4}\\). The correct classification is <b>theoretical probability, because it is based on counting the equally likely sections</b>.",
      {mode:"classify-spinner"});
  },
  function(){
    return mcq("Sofia took 20 practice shots at a basket and scored on 11 of them. She says her chance of scoring on the next shot is 11 out of 20. Which option classifies this judgement correctly?",
      {t:"Experimental probability, because it is based on results from trials that were carried out", fb:"Right: the value comes from counting scores in 20 real practice trials."},
      [{t:"Theoretical probability, because it is based on results from trials that were carried out", fb:"The reason names trials, which is experimental; theoretical counts equally likely outcomes instead."},
       {t:"Subjective judgement, because it is based on results from trials that were carried out", fb:"The reason names counted trial results, which is data, while subjective judgement rests on a feeling."},
       {t:"Subjective judgement, because it is based on how confident the player feels at practice", fb:"Sofia used her counted scores, not her confidence, so this reason describes a different judgement."}],
      "A probability built from the results of trials that were carried out is experimental probability. The correct classification is <b>experimental probability, because it is based on results from trials</b>.",
      {mode:"classify-shots"});
  },
  function(){
    return mcq("An old sailor in the community looks at the evening sky and says he feels there is a good chance of a storm tomorrow, without checking any forecast or records. Which option classifies this judgement correctly?",
      {t:"Subjective judgement, because it is based on a personal feeling with no counts or trials", fb:"Right: with no forecast counted and no records checked, the estimate rests on personal feeling."},
      [{t:"Theoretical probability, because it is based on a personal feeling with no counts or trials", fb:"The reason names a feeling with no counts, which is subjective; theoretical needs counted equal outcomes."},
       {t:"Experimental probability, because it is based on a personal feeling with no counts or trials", fb:"The reason names a feeling with no trials, which is subjective; experimental needs results from trials."},
       {t:"Experimental probability, because it is based on weather records the sailor kept for years", fb:"The sailor checked no records for this call; he gave a feeling from looking at the sky."}],
      "A probability that rests on a personal feeling, with no counts and no trials, is subjective judgement. The correct classification is <b>subjective judgement, because it is based on a personal feeling</b>.",
      {mode:"classify-sailor"});
  }
]), ["Ask where the number came from: counted equal outcomes, results of trials, or a personal feeling.", "Check the story for trials that were actually carried out; their presence points to experimental probability."]);

E("u9-collection-problem", 9, ["11.1"], 1, "var", varset([
  function(){
    return mcq("To learn what a whole town thinks about building a new arena, a reporter asks only fans leaving a hockey game at the old arena. What is the main problem with this data collection?",
      {t:"Bias, because fans at one game do not represent the whole town being studied", fb:"Right: the group asked is one sided, so the results lean toward fans and miss other residents."},
      [{t:"Use of language, because the question at the game was worded to push one answer", fb:"No wording is described here; the flaw is who was asked, not how the question was phrased."},
       {t:"Privacy, because fans were asked to give their names along with their answers", fb:"Names are never mentioned here; the flaw is that only fans were asked about a town question."},
       {t:"Cost, because asking fans at the game costs more than mailing a survey to homes", fb:"Cost is never raised here; the flaw is a one sided group speaking for the whole town."}],
      "Asking only fans about a question for the whole town gives a biased sample, because the group asked does not represent the population. The main problem is <b>bias, because fans at one game do not represent the whole town</b>.",
      {mode:"problem-fans"});
  },
  function(){
    return mcq("A school survey about a new late bus asks students: 'Do you agree that everyone needs our wonderful new late bus?' What is the main problem with this data collection?",
      {t:"Use of language, because the wording pushes students toward agreeing with the bus", fb:"Right: praise words and a push to agree lead students to one answer before they think."},
      [{t:"Bias, because only students who ride the late bus were given the survey at school", fb:"The survey went to students generally; the flaw is the leading wording, not who received it."},
       {t:"Ethics, because students were offered a prize for finishing the survey at school", fb:"No prize is mentioned here; the flaw is wording that pushes students toward one answer."},
       {t:"Time and timing, because the survey was handed out during the busiest exam week", fb:"Timing is never mentioned here; the flaw is the leading wording of the question itself."}],
      "Wording that praises one choice and pushes agreement is a use of language problem, because it leads answers instead of measuring them. The main problem is <b>use of language, because the wording pushes students toward agreeing</b>.",
      {mode:"problem-latebus"});
  },
  function(){
    return mcq("In June, a town mails a survey asking residents how satisfied they were with snow clearing on their streets last winter. What is the main problem with this data collection?",
      {t:"Time and timing, because winter memories have faded by the time June arrives", fb:"Right: asking months later means faded memories and changed opinions spoil the answers."},
      [{t:"Bias, because only residents with driveways were mailed the survey in June", fb:"The survey went to residents generally; the flaw is the late timing, not who received it."},
       {t:"Cultural sensitivity, because the survey ignores how different families mark winter", fb:"Cultural marking of winter is not the issue here; the flaw is asking long after the season."},
       {t:"Privacy, because residents had to sign their names to the mailed survey form", fb:"Names are never mentioned here; the flaw is asking about winter well after it ended."}],
      "Asking about a winter service in June is a time and timing problem, because memories fade and conditions change. The main problem is <b>time and timing, because winter memories have faded by June</b>.",
      {mode:"problem-snow"});
  },
  function(){
    return mcq("A class survey about family income asks each student to write their name at the top, and the teacher reads the finished surveys aloud to check them. What is the main problem with this data collection?",
      {t:"Privacy, because names link sensitive income answers to each student in the class", fb:"Right: income is sensitive, and names plus reading aloud expose private information."},
      [{t:"Cost, because printing a name line on each survey uses extra ink and paper", fb:"Printing cost is trivial here; the flaw is exposing sensitive answers tied to names."},
       {t:"Use of language, because the income question was worded to push one answer", fb:"No leading wording is described here; the flaw is names attached to sensitive answers."},
       {t:"Bias, because only students present that day were able to take the survey form", fb:"Attendance is not the issue raised here; the flaw is private answers linked to student names."}],
      "Collecting sensitive answers with names attached, then reading them aloud, is a privacy problem. The main problem is <b>privacy, because names link sensitive income answers to each student</b>.",
      {mode:"problem-income"});
  },
  function(){
    return mcq("A cafeteria survey about favourite meals lists only foods from one cultural tradition and asks all students why they do not eat the foods their families serve at home. What is the main problem with this data collection?",
      {t:"Cultural sensitivity, because the survey treats one tradition as the standard for everyone", fb:"Right: the choices and the question dismiss the food traditions of many families in the school."},
      [{t:"Time and timing, because the survey was handed out right before the lunch bell rang", fb:"Timing is never mentioned here; the flaw is treating one food tradition as the standard."},
       {t:"Cost, because printing a longer menu list for the survey would cost too much money overall", fb:"Cost is never raised here; the flaw is a survey built around only one cultural tradition."},
       {t:"Ethics, because students were promised a free lunch for finishing the survey form early", fb:"No promise is mentioned here; the flaw is insensitivity to the traditions families follow."}],
      "A survey that treats one cultural tradition as the standard for everyone shows a cultural sensitivity problem. The main problem is <b>cultural sensitivity, because the survey treats one tradition as the standard</b>.",
      {mode:"problem-cafeteria"});
  },
  function(){
    return mcq("For a project on family rules, a class questions Grade 4 students in the hallway without asking their teachers or parents for permission first. What is the main problem with this data collection?",
      {t:"Ethics, because young students were questioned without permission from adults responsible", fb:"Right: questioning young children without consent treats participants unfairly, which is an ethics flaw."},
      [{t:"Bias, because only Grade 4 students who walk that hallway were questioned that day", fb:"The hallway group is a side detail; the central flaw is questioning children without permission."},
       {t:"Privacy, because the students were asked to state their home addresses in the hallway", fb:"Addresses are never mentioned here; the flaw is missing permission to question young students."},
       {t:"Use of language, because the questions used words the younger students found confusing", fb:"Confusing words are not described here; the flaw is questioning children without consent."}],
      "Questioning young students without permission from the adults responsible for them is an ethics problem. The main problem is <b>ethics, because young students were questioned without permission</b>.",
      {mode:"problem-permission"});
  }
]), ["Name the influence at work: who was asked, how it was worded, when it ran, or how people were treated.", "Check who was asked first; a one sided group points to bias before any other factor."]);

E("u9-collection-biggest-threat", 9, ["11.1"], 3, "var", varset([
  function(){
    return mcq("A town website poll about a new pool lets anyone vote as often as they like, and it stays open for one week. Supporters share the link widely on the first day. Which problem most threatens the validity of the results?",
      {t:"Bias, because repeat voting and shared links let one keen group flood the results", fb:"Right: unlimited repeat votes destroy any link between the results and the town as a whole."},
      [{t:"Time and timing, because a one week window may miss residents who are away then", fb:"A short window matters, but repeat flooding can swamp the count far beyond a timing gap."},
       {t:"Cost, because running a website poll for a full week adds hosting charges too", fb:"Hosting cost affects the budget, not whether the counted votes reflect the whole town."},
       {t:"Use of language, because the poll question is written in short, plain words only", fb:"Plain wording is a strength here; the threat is who can vote and how often they can vote."}],
      "Two influences are present, but repeat voting plus link sharing creates bias that can overwhelm every other concern, because the results stop representing the town. The biggest threat is <b>bias, because repeat voting lets one keen group flood the results</b>.",
      {mode:"threat-repeatpoll"});
  },
  function(){
    return mcq("A survey about school start times uses slightly leading wording, and it is given only to the team captain and four of her friends to answer for all 300 students in the school. Which problem most threatens the validity of the results?",
      {t:"Bias, because five friends cannot speak for the views of all 300 students in the school", fb:"Right: even perfect wording cannot fix answers drawn from five friends for a whole school."},
      [{t:"Use of language, because slightly leading wording can nudge students toward one answer", fb:"Leading wording matters, but it touches five answers here, while the tiny group decides everything."},
       {t:"Ethics, because the captain was asked to speak for her friends without their consent", fb:"Consent is a side concern here; the results fail mainly because the group is tiny and one sided."},
       {t:"Privacy, because the five friends could see each other answers while they filled it in", fb:"Shared viewing is minor beside the core flaw: five friends standing in for 300 students."}],
      "Two influences are present, but a sample of five friends for 300 students creates bias that no wording fix can repair, because the group cannot represent the school. The biggest threat is <b>bias, because five friends cannot speak for all 300 students</b>.",
      {mode:"threat-fivefriends"});
  },
  function(){
    return mcq("A health survey is costly to print and deliver, and the finished forms, with student names beside sensitive health answers, are pinned on a classroom board for the class to read. Which problem most threatens the validity of the results?",
      {t:"Privacy, because exposed names and health answers will stop students answering honestly", fb:"Right: once answers are public, students hide the truth, so the data itself becomes unreliable."},
      [{t:"Cost, because printing and delivering the survey uses a large share of the budget", fb:"High cost limits how many surveys run, but exposed answers corrupt the answers already given."},
       {t:"Bias, because only students in that one classroom were given the health survey form", fb:"One classroom limits reach, but public exposure changes what students dare to write at all."},
       {t:"Time and timing, because the survey was pinned up for a full week of classes at school", fb:"Display length is a side detail; the threat is sensitive answers tied to names in public view."}],
      "Two influences are present, but pinning named health answers in public is a privacy failure that changes how honestly students answer, so the results cannot be trusted. The biggest threat is <b>privacy, because exposed names and health answers will stop honest answers</b>.",
      {mode:"threat-board"});
  },
  function(){
    return mcq("A lunch survey runs during a busy exam week, and its questions treat one cultural food tradition as normal while describing other family foods as unusual choices. Many families skip the survey entirely. Which problem most threatens the validity of the results?",
      {t:"Cultural sensitivity, because offended families skip the survey, so whole groups go missing", fb:"Right: when whole groups refuse, the missing answers bend the results more than a busy week does."},
      [{t:"Time and timing, because exam week leaves families with little time to reply to it", fb:"A busy week lowers replies, but offended families are missing for a reason tied to the questions."},
       {t:"Cost, because reprinting the survey with better questions would cost extra money in the end", fb:"Reprinting cost is a budget issue, not the reason whole groups of families are absent."},
       {t:"Ethics, because families were offered a small prize draw for returning the survey form", fb:"A prize draw is a side detail here; the results fail because the questions drive groups away."}],
      "Two influences are present, but questions that dismiss family food traditions create a cultural sensitivity failure that removes whole groups from the results. The biggest threat is <b>cultural sensitivity, because offended families skip the survey and whole groups go missing</b>.",
      {mode:"threat-lunchsurvey"});
  },
  function(){
    return mcq("An interviewer uses plain, clear questions, and offers students a free snack only if they say they like a new juice being tested. Most students praise the juice. Which problem most threatens the validity of the results?",
      {t:"Ethics, because rewarding only praise pressures students to give dishonest answers", fb:"Right: tying a reward to one answer treats students unfairly and fills the data with false praise."},
      [{t:"Use of language, because plain and clear questions can still guide how students answer", fb:"Plain wording is a strength in this case; the pressure comes from the reward, not the words."},
       {t:"Bias, because students who like snacks are more likely to agree to the interview", fb:"Snack liking plays a small part; the reward for praise directly buys the answers recorded."},
       {t:"Cost, because buying snacks for the interviews adds to the cost of the study", fb:"Snack cost affects the budget, not whether the recorded praise can be believed at all."}],
      "Two influences are present, but rewarding only positive answers is an ethics failure that pressures students into dishonest responses, so the praise cannot be trusted. The biggest threat is <b>ethics, because rewarding only praise pressures students to give dishonest answers</b>.",
      {mode:"threat-snack"});
  }
]), ["Two influences can appear together: judge which one does more damage to whether the results can be trusted.", "Ask which flaw changes the answers themselves, not just the cost or the schedule of the study."]);

E("u9-match-influence", 9, ["11.2"], 1, "var", varset([
  function(){
    return mcq("A town wants to survey every household about road repairs. Printing and mailing a long survey to all 4000 households, with staff to read the replies, would use the whole yearly survey budget. Which influence does this situation illustrate?",
      {t:"Cost, because reaching the whole population would spend the entire survey budget", fb:"Right: money is the limiting influence, since full coverage costs more than the town can spend."},
      [{t:"Bias, because households with mailboxes would be more likely to send a reply back", fb:"Mailbox access is not raised here; the stated limit is the price of reaching everyone."},
       {t:"Privacy, because households would have to share repair details about their own roads", fb:"Road repair details are public works information; the stated limit is the budget for the mailing."},
       {t:"Time and timing, because reading thousands of replies would take staff many weeks", fb:"Reading time is plausible, but the situation stresses the budget being fully spent, which is cost."}],
      "When the money needed to reach everyone is the limiting factor, the influence is cost. This situation illustrates <b>cost, because reaching the whole population would spend the entire budget</b>.",
      {mode:"match-cost"});
  },
  function(){
    return mcq("A farm co-op surveys its members about harvest help during the busiest harvest week, when members work long days in the fields. Very few members reply. Which influence does this situation illustrate?",
      {t:"Time and timing, because the survey arrived when members had no time to answer it", fb:"Right: the moment chosen for the survey clashes with the busiest week of the farm year."},
      [{t:"Use of language, because the survey questions were written in technical farm terms", fb:"Question wording is not described here; the stated problem is the week the survey arrived."},
       {t:"Cultural sensitivity, because the survey ignored how member families mark harvest time", fb:"Harvest customs are not raised here; the stated problem is members having no spare time."},
       {t:"Ethics, because members were pressured to reply during their busiest working week", fb:"Pressure is not described here; the influence shown is the poor timing of the survey itself."}],
      "When the moment chosen for a survey clashes with the lives of the people asked, the influence is time and timing. This situation illustrates <b>time and timing, because the survey arrived when members had no time to answer</b>.",
      {mode:"match-timing"});
  },
  function(){
    return mcq("A survey about weekend activities lists only events from one community group as answer choices, so students from other backgrounds find none of their usual activities listed. Which influence does this situation illustrate?",
      {t:"Cultural sensitivity, because the choices leave out the activities of many backgrounds", fb:"Right: answer choices built around one group overlook the traditions of the wider school."},
      [{t:"Bias, because only students from that one community group were handed the survey", fb:"The survey went to students broadly; the flaw is the choice list, not who received the form."},
       {t:"Cost, because adding more answer choices would make the survey longer to print out", fb:"Printing length is not raised here; the stated flaw is choices that exclude many students."},
       {t:"Privacy, because students must reveal their weekend activities to their classmates", fb:"Weekend activities here are ordinary choices; the stated flaw is a list missing whole groups."}],
      "When answer choices are built around one group and overlook others, the influence is cultural sensitivity. This situation illustrates <b>cultural sensitivity, because the choices leave out many backgrounds</b>.",
      {mode:"match-cultural"});
  },
  function(){
    return mcq("A radio station runs a call in poll asking listeners whether its morning show is the best in town. Only keen listeners phone in, many of them daily fans of the show. Which influence does this situation illustrate?",
      {t:"Bias, because keen fans who choose to call in do not represent all town listeners", fb:"Right: volunteers who already love the show lean the results in one direction from the start."},
      [{t:"Use of language, because the poll question praises the morning show in its wording", fb:"The wording here is plain; the flaw is that only self chosen fans take part in the poll."},
       {t:"Time and timing, because the poll runs early in the morning when many people work", fb:"The hour matters less than who calls: the callers are fans, not a cross section of the town."},
       {t:"Cost, because running a phone poll every morning adds to the station phone bill", fb:"Phone cost is not raised here; the stated flaw is a one sided group answering the question."}],
      "When the people who answer are self chosen fans rather than a cross section, the influence is bias. This situation illustrates <b>bias, because keen fans who call in do not represent all listeners</b>.",
      {mode:"match-bias"});
  },
  function(){
    return mcq("A library survey asks visitors: 'How much do you love our amazing, award winning new reading room?' Most visitors pick the top answer. Which influence does this situation illustrate?",
      {t:"Use of language, because praise words in the question push visitors toward the top answer", fb:"Right: loaded praise in the wording leads answers before visitors judge the room themselves."},
      [{t:"Bias, because only visitors who use the reading room were asked the survey question", fb:"Asking room users is reasonable here; the flaw is praise wording steering their answers."},
       {t:"Ethics, because visitors were offered a bookmark for answering the survey question", fb:"No offer is mentioned here; the stated flaw is wording loaded with praise for the room."},
       {t:"Cultural sensitivity, because the question assumes all visitors read in the same way", fb:"Reading habits across cultures are not raised here; the flaw is leading praise in the wording."}],
      "When wording praises one answer and pushes respondents toward it, the influence is use of language. This situation illustrates <b>use of language, because praise words push visitors toward the top answer</b>.",
      {mode:"match-language"});
  },
  function(){
    return mcq("A school health survey asks students to write their name and any medicines they take on the same form, and classmates pass the finished forms to the front of the room. Which influence does this situation illustrate?",
      {t:"Privacy, because names and medicine details can be seen by classmates handling the forms", fb:"Right: sensitive health details tied to names are exposed as forms pass through many hands."},
      [{t:"Cost, because printing a name line and a medicine line makes each form longer to print", fb:"Form length is trivial here; the stated flaw is sensitive details exposed to classmates."},
       {t:"Time and timing, because passing forms to the front takes time at the end of class", fb:"Passing time is a side detail; the influence shown is private information being visible to others."},
       {t:"Bias, because students who take medicine may choose to leave the survey blank entirely", fb:"Blank forms could follow, but the influence illustrated is private details seen by classmates."}],
      "When sensitive personal details can be seen by others during collection, the influence is privacy. This situation illustrates <b>privacy, because names and medicine details can be seen by classmates</b>.",
      {mode:"match-privacy"});
  }
]), ["Match the situation to the one influence it shows most clearly: money, moment, wording, who answers, or private details.", "Underline the detail in the story that does the damage, then name the influence that detail belongs to."]);

E("u9-sample-or-population", 9, ["11.3"], 1, "var", varset([
  function(){
    return mcq("A population is everyone in the group being studied, and a sample is part of that group. A principal asks every student in the school about lunch choices for the cafeteria. Which option classifies this correctly?",
      {t:"A population, because everyone in the group being studied was included in the asking", fb:"Right: every student in the school was asked, so the whole group being studied took part."},
      [{t:"A sample, because everyone in the group being studied was included in the asking", fb:"The reason describes everyone taking part, which is a population, so the label and reason clash."},
       {t:"A population, because only part of the group being studied was included in the asking", fb:"The reason describes only part taking part, which is a sample, so the label and reason clash."},
       {t:"A sample, because the students who were asked were chosen by drawing names at random", fb:"No names were drawn here; the principal asked every student in the school directly."}],
      "When everyone in the group being studied is included, the study uses a population. The correct classification is <b>a population, because everyone in the group was included</b>.",
      {mode:"sampop-school"});
  },
  function(){
    return mcq("A population is everyone in the group being studied, and a sample is part of that group. A factory tests 20 batteries from a shipment of 2000 to check battery life. Which option classifies this correctly?",
      {t:"A sample, because only part of the group being studied was included in the testing", fb:"Right: 20 batteries out of 2000 is part of the shipment, so the factory tested a sample."},
      [{t:"A population, because only part of the group being studied was included in the testing", fb:"The reason describes only part taking part, which is a sample, so the label and reason clash."},
       {t:"A sample, because everyone in the group being studied was included in the testing", fb:"The reason describes everyone taking part, which is a population, so the label and reason clash."},
       {t:"A population, because the batteries that were tested were chosen by drawing at random", fb:"Random choice still tests only part of the shipment, and a part is always a sample."}],
      "When only part of the group being studied is included, the study uses a sample. The correct classification is <b>a sample, because only part of the group was included</b>.",
      {mode:"sampop-batteries"});
  },
  function(){
    return mcq("A population is everyone in the group being studied, and a sample is part of that group. A club president asks all 12 members of a small chess club about a new meeting day. Which option classifies this correctly?",
      {t:"A population, because everyone in the group being studied was included in the asking", fb:"Right: all 12 members were asked, so the whole group being studied took part in full."},
      [{t:"A sample, because everyone in the group being studied was included in the asking", fb:"The reason describes everyone taking part, which is a population, so the label and reason clash."},
       {t:"A population, because only part of the group being studied was included in the asking", fb:"The reason describes only part taking part, which is a sample, so the label and reason clash."},
       {t:"A sample, because the members who were asked were chosen by drawing names at random", fb:"No names were drawn here; the president asked all 12 members of the club directly."}],
      "When everyone in the group being studied is included, the study uses a population. The correct classification is <b>a population, because everyone in the group was included</b>.",
      {mode:"sampop-chess"});
  },
  function(){
    return mcq("A population is everyone in the group being studied, and a sample is part of that group. A grocer checks 25 apples from a shipment of 500 apples for bruises. Which option classifies this correctly?",
      {t:"A sample, because only part of the group being studied was included in the checking", fb:"Right: 25 apples out of 500 is part of the shipment, so the grocer checked a sample."},
      [{t:"A population, because only part of the group being studied was included in the checking", fb:"The reason describes only part taking part, which is a sample, so the label and reason clash."},
       {t:"A sample, because everyone in the group being studied was included in the checking", fb:"The reason describes everyone taking part, which is a population, so the label and reason clash."},
       {t:"A population, because the apples that were checked were chosen by drawing at random", fb:"Random choice still checks only part of the shipment, and a part is always a sample."}],
      "When only part of the group being studied is included, the study uses a sample. The correct classification is <b>a sample, because only part of the group was included</b>.",
      {mode:"sampop-apples"});
  },
  function(){
    return mcq("A population is everyone in the group being studied, and a sample is part of that group. A town studying all its households surveys every household on one street, Bay Street, and no others. Which option classifies this correctly?",
      {t:"A sample, because only part of the group being studied was included in the survey", fb:"Right: the group studied is all town households, and one street is only part of that group."},
      [{t:"A population, because only part of the group being studied was included in the survey", fb:"The reason describes only part taking part, which is a sample, so the label and reason clash."},
       {t:"A sample, because everyone in the group being studied was included in the survey", fb:"The reason describes everyone taking part, but households on other streets were left out."},
       {t:"A population, because every household on the chosen street answered the survey fully", fb:"Full answers on one street still cover only part of all the households in the town."}],
      "The group being studied is all households in the town, and one street is only part of it, so the study uses a sample. The correct classification is <b>a sample, because only part of the group was included</b>.",
      {mode:"sampop-street"});
  },
  function(){
    return mcq("A population is everyone in the group being studied, and a sample is part of that group. A swim coach times every one of the 14 swimmers on the team during a practice. Which option classifies this correctly?",
      {t:"A population, because everyone in the group being studied was included in the timing", fb:"Right: all 14 swimmers on the team were timed, so the whole group being studied took part."},
      [{t:"A sample, because everyone in the group being studied was included in the timing", fb:"The reason describes everyone taking part, which is a population, so the label and reason clash."},
       {t:"A population, because only part of the group being studied was included in the timing", fb:"The reason describes only part taking part, which is a sample, so the label and reason clash."},
       {t:"A sample, because the swimmers who were timed were chosen by drawing names at random", fb:"No names were drawn here; the coach timed every swimmer on the team directly."}],
      "When everyone in the group being studied is included, the study uses a population. The correct classification is <b>a population, because everyone in the group was included</b>.",
      {mode:"sampop-swim"});
  }
]), ["First name the group being studied, then ask whether all of it or only part of it took part.", "Compare the group named in the question with the group that actually took part."]);

E("u9-use-whole-population", 9, ["11.4"], 1, "var", varset([
  function(){
    return mcq("Which situation is best answered by using the whole population?",
      {t:"A class of 24 students choosing a theme for their own class party this term", fb:"Right: the class is small and everyone is easy to reach, so asking all of them makes sense."},
      [{t:"All drivers in the province rating the condition of highways across the region", fb:"Drivers across a province are far too many to ask one by one for a single class question."},
       {t:"Every fish in a harbour being checked to learn the average size of the catch", fb:"Catching and checking every fish is impossible in practice, so a sample is used instead."},
       {t:"Each battery in a warehouse being run until empty to test how long they last", fb:"Running every battery empty destroys the stock being tested, so a sample is used instead."}],
      "Using a whole population makes sense when the group is small, cheap to reach, and everyone can take part. The best situation is <b>a class of 24 students choosing their own class party theme</b>.",
      {mode:"wholepop-class"});
  },
  function(){
    return mcq("Which situation is best answered by using the whole population?",
      {t:"A chess club with 10 members choosing which evening to hold its weekly games", fb:"Right: with only 10 members, all easy to reach, asking everyone is quick and complete."},
      [{t:"All shoppers in a city rating a new downtown parking plan for the council", fb:"Shoppers across a whole city are far too many to ask one by one for this question."},
       {t:"Every light bulb in a factory being burned until it fails to test its lifetime", fb:"Burning every bulb until it fails destroys the stock being tested, so a sample is used."},
       {t:"All residents of a province rating winter road clearing on provincial highways", fb:"Residents across a province are far too many to reach for one survey of this kind."}],
      "Using a whole population makes sense when the group is small, cheap to reach, and everyone can take part. The best situation is <b>a chess club with 10 members choosing its game evening</b>.",
      {mode:"wholepop-chess"});
  },
  function(){
    return mcq("Which situation is best answered by using the whole population?",
      {t:"A teacher asking all 18 students in a class which field trip visit they prefer", fb:"Right: the class is small and present together, so the teacher can ask every student easily."},
      [{t:"All teenagers in the country rating a new national advertising campaign online", fb:"Teenagers across a country are far too many to ask one by one for this question."},
       {t:"Every candle in a shipment being burned to the end to measure burning time", fb:"Burning every candle to the end destroys the shipment being tested, so a sample is used."},
       {t:"All farmers in a region rating a proposed change to provincial farm rules", fb:"Farmers across a whole region are too many and too spread out to ask one by one here."}],
      "Using a whole population makes sense when the group is small, cheap to reach, and everyone can take part. The best situation is <b>a teacher asking all 18 students in a class about a field trip</b>.",
      {mode:"wholepop-fieldtrip"});
  },
  function(){
    return mcq("Which situation is best answered by using the whole population?",
      {t:"A small bakery asking all 6 of its staff which morning opening time suits them", fb:"Right: with only 6 staff, all easy to reach, the bakery can ask everyone directly."},
      [{t:"All customers of a national store chain rating a new store layout design", fb:"Customers of a national chain are far too many to ask one by one for this question."},
       {t:"Every water bottle in a plant being crushed to test how much force it can take", fb:"Crushing every bottle destroys the products being tested, so a sample is used instead."},
       {t:"All homeowners in a town rating a proposed new tax that affects the province", fb:"Homeowners across a town are too many to ask one by one for a provincial question."}],
      "Using a whole population makes sense when the group is small, cheap to reach, and everyone can take part. The best situation is <b>a small bakery asking all 6 of its staff about opening time</b>.",
      {mode:"wholepop-bakery"});
  },
  function(){
    return mcq("Which situation is best answered by using the whole population?",
      {t:"A book club with 15 members choosing which novel the club will read next month", fb:"Right: the club is small and meets together, so every member can be asked with ease."},
      [{t:"All viewers in the country rating a new evening television program schedule", fb:"Viewers across a country are far too many to ask one by one for this question."},
       {t:"Every helmet in a warehouse being crash tested to check how well it protects", fb:"Crash testing every helmet destroys the helmets being tested, so a sample is used instead."},
       {t:"All workers in a province rating a proposed change to workplace safety rules", fb:"Workers across a province are far too many and too spread out to ask one by one here."}],
      "Using a whole population makes sense when the group is small, cheap to reach, and everyone can take part. The best situation is <b>a book club with 15 members choosing its next novel</b>.",
      {mode:"wholepop-bookclub"});
  }
]), ["A whole population works when the group is small, everyone is reachable, and testing harms nothing.", "Rule out any option where the group is huge or where testing would destroy the items."]);

E("u9-population-limitation", 9, ["11.5"], 1, "var", varset([
  function(){
    return mcq("A maker wants to know how many hours its candles burn. Burning a candle to measure it uses the candle up completely. Which limitation best explains why a sample is used instead of the whole population?",
      {t:"Testing the whole population would destroy every candle in the stock being studied", fb:"Right: each test consumes the candle, so testing all of them leaves nothing to sell or use."},
      [{t:"The cost of mailing surveys to candle buyers in other towns would be far too high", fb:"No survey is planned here; the limit is that the test itself uses up each candle tested."},
       {t:"There is not enough time before the shop opens to question every candle buyer", fb:"Buyer questions are not part of this study; the limit is the destructive burn test itself."},
       {t:"The population of candle buyers across the country is too large to reach in person", fb:"Buyers are not the group tested here; the candles are, and testing destroys each one used."}],
      "When testing destroys the item tested, the whole population cannot be used, so a sample is tested instead. The limitation is <b>testing the whole population would destroy every candle</b>.",
      {mode:"limit-candles"});
  },
  function(){
    return mcq("A health region wants the views of every household in the province on clinic hours. Printing, mailing and staffing a survey for every household would take most of the region budget for the year. Which limitation best explains why a sample is used instead of the whole population?",
      {t:"The cost of reaching every household in the province is too high for the budget", fb:"Right: full coverage would consume most of a yearly budget, so cost rules out the population."},
      [{t:"Testing every household survey form would destroy the forms before they are read", fb:"Reading survey forms does not destroy them; the stated limit is the money full coverage takes."},
       {t:"The region has only two computers available to record any of the survey replies", fb:"Equipment is not mentioned here; the stated limit is the budget that full mailing would use."},
       {t:"Households need the results before the weekend, leaving too little time to reply", fb:"A weekend deadline is not mentioned here; the stated limit is the cost of reaching everyone."}],
      "When reaching everyone costs more than the available budget allows, cost is the limitation that rules out the whole population. The limitation is <b>the cost of reaching every household is too high</b>.",
      {mode:"limit-clinic"});
  },
  function(){
    return mcq("A school must decide on Monday whether to hold an outdoor sports day, and wants student views first. Asking all 900 students and counting the answers would take the whole week. Which limitation best explains why a sample is used instead of the whole population?",
      {t:"There is not enough time to ask everyone before the decision has to be made", fb:"Right: the decision deadline arrives before a full count could finish, so time rules it out."},
      [{t:"The cost of printing a one question survey for the school would use the budget", fb:"A one question school survey is cheap; the stated limit is the week a full count would take."},
       {t:"Asking every student the question would destroy the survey forms after one use", fb:"Asking a question destroys nothing; the stated limit is the deadline for the decision itself."},
       {t:"The school owns only two pencils that students could use to mark their answers", fb:"Pencils are not the limit described here; the stated limit is time before the Monday decision."}],
      "When a decision deadline arrives before everyone can be asked, time is the limitation that rules out the whole population. The limitation is <b>there is not enough time to ask everyone before the decision</b>.",
      {mode:"limit-sportsday"});
  },
  function(){
    return mcq("A region wants to test water quality at every well in the area. The lab owns only two test kits, and each kit can test one well per day. Which limitation best explains why a sample is used instead of the whole population?",
      {t:"The tools and staff available for the testing are too limited to cover every well", fb:"Right: two kits testing one well a day cannot cover every well, so resources rule it out."},
      [{t:"The cost of buying the land around every well in the region would be far too high", fb:"Land purchase is not part of this study; the stated limit is the small number of test kits."},
       {t:"Testing a well sample uses up the whole well, leaving the owner with no water", fb:"A water sample does not empty a well; the stated limit is the few kits available for testing."},
       {t:"Well owners need their results within the hour, leaving too little time to test", fb:"A one hour deadline is not mentioned here; the stated limit is the limited testing equipment."}],
      "When the equipment and people available cannot cover the whole group, limited resources rule out the whole population. The limitation is <b>the tools and staff available are too limited</b>.",
      {mode:"limit-wells"});
  },
  function(){
    return mcq("A researcher wants the opinions of all adults in Canada about a new national park pass. There are many millions of adults spread across the whole country. Which limitation best explains why a sample is used instead of the whole population?",
      {t:"The population is too large and spread out for every adult to be reached and asked", fb:"Right: millions of people across a country cannot all be contacted, so size rules it out."},
      [{t:"Testing every adult opinion would destroy the park passes the study is examining", fb:"Opinions destroy nothing, and passes are not tested here; the stated limit is population size."},
       {t:"The researcher owns only two clipboards for recording answers during interviews", fb:"Clipboards are not the limit described here; the stated limit is the huge, spread out population."},
       {t:"Adults need to answer before supper tonight, leaving too little time to respond", fb:"A supper deadline is not mentioned here; the stated limit is how many adults there are."}],
      "When a population is so large and spread out that everyone cannot be reached, its size rules out using the whole population. The limitation is <b>the population is too large and spread out to be reached</b>.",
      {mode:"limit-parkpass"});
  }
]), ["A sample replaces a population when something blocks full coverage: money, time, resources, destruction, or sheer size.", "Find the blocking detail in the story first, then match it to the limitation it names."]);

E("u9-generalization-critique", 9, ["11.6"], 3, "var", varset([
  function(){
    return mcq("Jordan asks 5 close friends at lunch and then claims that all teenagers in town love a new skate shop. Which option gives the soundest critique of this generalization from a sample?",
      {t:"The sample is too small and made only of friends, so it cannot speak for all teenagers in town", fb:"Right: five friends share tastes and miss most teenagers, so the claim reaches far beyond the sample."},
      [{t:"The claim is sound, because friends usually know what other teenagers in town will enjoy", fb:"Friends share the same circle, so their tastes are a poor guide to every teenager in town."},
       {t:"The sample is too large for a lunch break study, so fewer students should have been asked", fb:"Five is a very small sample, not a large one; size in the other direction is the problem."},
       {t:"The claim is sound, because the question was asked directly rather than through a survey form", fb:"Asking directly does not fix a tiny group of friends standing in for a whole town of teenagers."}],
      "A generalization is only as good as the sample behind it: a claim about a whole population needs a sample large enough and representative enough to support it. The sound critique is <b>the sample is too small and made only of friends</b>.",
      {mode:"critique-friends"});
  },
  function(){
    return mcq("A report surveys members at one gym and then claims that most adults in town exercise every day. Which option gives the soundest critique of this generalization from a sample?",
      {t:"Gym members exercise more than most adults, so the sample does not represent the whole town", fb:"Right: people who join a gym differ from the general population in exactly the habit being measured."},
      [{t:"The claim is sound, because gym members are adults and the claim is about adults in town", fb:"Being adults is not enough; gym members are untypical adults for a question about exercise habits."},
       {t:"The sample is too small to use, because a single gym can hold only a handful of members", fb:"Gym size is not given here; the flaw is that members differ from the town, not the head count."},
       {t:"The claim is sound, because a survey at a gym is a direct way to study exercise habits", fb:"Directness does not fix a sample drawn only from people who already choose to exercise often."}],
      "A generalization is only as good as the sample behind it: a sample that differs from the population on the very topic studied cannot support a town wide claim. The sound critique is <b>gym members do not represent the whole town</b>.",
      {mode:"critique-gym"});
  },
  function(){
    return mcq("A school draws 200 student names at random from all grades and surveys them about library use, then claims the results describe library use across the whole school. Which option judges this generalization correctly?",
      {t:"The generalization is reasonable, because a large random sample from all grades can represent the school", fb:"Right: random selection across all grades with 200 students gives the claim a solid sample behind it."},
      [{t:"The generalization fails, because any sample smaller than the whole school is always invalid as a rule", fb:"Samples can support claims when they are large, random and drawn from the whole group studied."},
       {t:"The generalization fails, because library users were more likely to answer the survey at school that day", fb:"Names were drawn at random from all grades, so keen users hold no special place in this sample."},
       {t:"The generalization is reasonable, because the students surveyed all visit the same library room at school", fb:"Sharing a library room is not the reason; random selection across grades is what supports the claim."}],
      "A generalization is only as good as the sample behind it, and a large random sample drawn from the whole group can support a claim about that group. The correct judgement is <b>the generalization is reasonable, because the sample is large and random</b>.",
      {mode:"critique-random"});
  },
  function(){
    return mcq("A student asks people at a skate park whether the town should build a bigger skate park, and then claims most residents support the project. Which option gives the soundest critique of this generalization from a sample?",
      {t:"People at a skate park already favour skate parks, so the sample leans one way from the start", fb:"Right: asking only users about their own facility stacks the answers toward support for the project."},
      [{t:"The claim is sound, because people at the park know more about skate parks than others do", fb:"Knowledge about skate parks does not make park users typical of all residents in the town."},
       {t:"The sample is too large for one student to handle, so fewer people should have been asked", fb:"Sample size is not given as the flaw here; the flaw is asking only people who already use the park."},
       {t:"The claim is sound, because the question was asked in person rather than on a printed form", fb:"Asking in person does not fix a sample drawn only from people who favour the project already."}],
      "A generalization is only as good as the sample behind it: asking only people who already use a facility cannot support a claim about all residents. The sound critique is <b>people at a skate park already favour skate parks</b>.",
      {mode:"critique-skatepark"});
  },
  function(){
    return mcq("A study surveys 300 Grade 9 students and then claims that students in the whole school, Grades 7 to 12, prefer morning classes. Which option gives the soundest critique of this generalization from a sample?",
      {t:"Only one grade was surveyed, so older and younger students may answer very differently", fb:"Right: a large sample from a single grade still misses every other grade the claim covers."},
      [{t:"The claim is sound, because 300 students is a large sample for any school wide question", fb:"Size alone does not help when every student surveyed comes from just one of six grades."},
       {t:"The sample is too small to use, because a school survey needs thousands of students", fb:"Three hundred is a fair size; the flaw is that all of them come from a single grade level."},
       {t:"The claim is sound, because Grade 9 students sit between the youngest and oldest grades", fb:"A middle grade does not automatically share the views of the grades above and below it."}],
      "A generalization is only as good as the sample behind it: a sample drawn from one grade cannot support a claim covering six grades. The sound critique is <b>only one grade was surveyed, so other grades may differ</b>.",
      {mode:"critique-onegrade"});
  }
]), ["Test the claim against its sample: check the size, then check whether the sample matches the whole group claimed.", "Picture who is missing from the sample; missing groups are where a generalization usually breaks."]);

E("u9-rubric-missing-part", 9, ["11.7"], 1, "var", varset([
  function(){
    return mcq("A rubric for a data project assesses the choice of a data collection method with social considerations, the selection of a population or a sample with justification, and the communication of findings. Which required part is missing from this rubric?",
      {t:"A question for investigation that the project sets out to answer with collected data", fb:"Right: the rubric never assesses whether the project has a clear question guiding the study."},
      [{t:"A choice of data collection method that includes social considerations for participants", fb:"That part is listed in the rubric already, in its method criterion, so it is present."},
       {t:"A selection of a population or a sample with a justification for that selection", fb:"That part is listed in the rubric already, in its selection criterion, so it is present."},
       {t:"A communication of findings that shares the project conclusions with an audience", fb:"That part is listed in the rubric already, in its final criterion, so it is present."}],
      "A complete project rubric assesses the question for investigation, the collection method with social considerations, the population or sample choice with justification, and the communication of findings. The missing part is <b>a question for investigation</b>.",
      {mode:"rubric-question"});
  },
  function(){
    return mcq("A rubric for a data project assesses the question for investigation, the selection of a population or a sample with justification, and the communication of findings. Which required part is missing from this rubric?",
      {t:"A choice of data collection method that includes social considerations for participants", fb:"Right: the rubric never assesses how data will be gathered or how people will be treated."},
      [{t:"A question for investigation that the project sets out to answer with collected data", fb:"That part is listed in the rubric already, in its first criterion, so it is present."},
       {t:"A selection of a population or a sample with a justification for that selection", fb:"That part is listed in the rubric already, in its selection criterion, so it is present."},
       {t:"A communication of findings that shares the project conclusions with an audience", fb:"That part is listed in the rubric already, in its final criterion, so it is present."}],
      "A complete project rubric assesses the question for investigation, the collection method with social considerations, the population or sample choice with justification, and the communication of findings. The missing part is <b>the choice of a data collection method with social considerations</b>.",
      {mode:"rubric-method"});
  },
  function(){
    return mcq("A rubric for a data project assesses the question for investigation, the choice of a data collection method with social considerations, and the communication of findings. Which required part is missing from this rubric?",
      {t:"A selection of a population or a sample with a justification for that selection", fb:"Right: the rubric never assesses who will be studied or why that group was chosen."},
      [{t:"A question for investigation that the project sets out to answer with collected data", fb:"That part is listed in the rubric already, in its first criterion, so it is present."},
       {t:"A choice of data collection method that includes social considerations for participants", fb:"That part is listed in the rubric already, in its method criterion, so it is present."},
       {t:"A communication of findings that shares the project conclusions with an audience", fb:"That part is listed in the rubric already, in its final criterion, so it is present."}],
      "A complete project rubric assesses the question for investigation, the collection method with social considerations, the population or sample choice with justification, and the communication of findings. The missing part is <b>the selection of a population or a sample with justification</b>.",
      {mode:"rubric-selection"});
  },
  function(){
    return mcq("A rubric for a data project assesses the question for investigation, the choice of a data collection method with social considerations, and the selection of a population or a sample with justification. Which required part is missing from this rubric?",
      {t:"A communication of findings that shares the project conclusions with an audience", fb:"Right: the rubric never assesses how the project results will be shared at the end."},
      [{t:"A question for investigation that the project sets out to answer with collected data", fb:"That part is listed in the rubric already, in its first criterion, so it is present."},
       {t:"A choice of data collection method that includes social considerations for participants", fb:"That part is listed in the rubric already, in its method criterion, so it is present."},
       {t:"A selection of a population or a sample with a justification for that selection", fb:"That part is listed in the rubric already, in its selection criterion, so it is present."}],
      "A complete project rubric assesses the question for investigation, the collection method with social considerations, the population or sample choice with justification, and the communication of findings. The missing part is <b>the communication of findings</b>.",
      {mode:"rubric-communication"});
  }
]), ["Hold the full rubric list in mind, then tick off each part the described rubric already covers.", "List the four required parts first; the missing one is the part never named in the stem."]);

E("u9-plan-element", 9, ["11.8"], 1, "var", varset([
  function(){
    return mcq("A project plan states that interviewers will ask each person for permission before starting and will keep names off all answer forms. Which element of the project plan does this detail belong to?",
      {t:"The method of data collection, in the social considerations that protect participants", fb:"Right: permission and nameless forms are social considerations built into how data is collected."},
      [{t:"The question for investigation, in the wording that the project sets out to answer", fb:"No research question is stated in this detail; it describes how people are treated during collection."},
       {t:"The method for selecting a population or a sample from the group being studied", fb:"No selection of people is described in this detail; it describes treatment during the interviews."},
       {t:"The method to be used for collection of the data during the project field work", fb:"Collection steps are close, but permission and privacy belong to the social considerations part."}],
      "A project plan describes a question for investigation, a collection method with social considerations, a selection method, and a collection procedure. This detail belongs to <b>the method of data collection, in its social considerations</b>.",
      {mode:"plan-social"});
  },
  function(){
    return mcq("A project plan states that 30 students will be chosen by drawing names from the class lists of every grade in the school. Which element of the project plan does this detail belong to?",
      {t:"The method for selecting a population or a sample from the group being studied", fb:"Right: drawing names from class lists is exactly how the sample is selected for the study."},
      [{t:"The question for investigation, in the wording that the project sets out to answer", fb:"No research question is stated in this detail; it describes how the students are chosen."},
       {t:"The method of data collection, in the social considerations that protect participants", fb:"No treatment of participants is described in this detail; it describes how names are drawn."},
       {t:"The method to be used for collection of the data during the project field work", fb:"Field work steps come later; this detail settles who takes part before any data is gathered."}],
      "A project plan describes a question for investigation, a collection method with social considerations, a selection method, and a collection procedure. This detail belongs to <b>the method for selecting a population or a sample</b>.",
      {mode:"plan-selection"});
  },
  function(){
    return mcq("A project plan states its question for investigation, describes a survey method with permission and privacy protections, and explains how its sample will be drawn from class lists. The plan says nothing about how, when or where the survey answers will actually be gathered and recorded. What does the plan still need?",
      {t:"The method to be used for collection of the data during the project field work", fb:"Right: the plan never says how answers will be gathered and recorded, which is its missing element."},
      [{t:"The question for investigation, in the wording that the project sets out to answer", fb:"The question is stated at the start of the plan, so that element is already covered in full."},
       {t:"The method of data collection, in the social considerations that protect participants", fb:"Permission and privacy protections are described in the plan, so that element is covered already."},
       {t:"The method for selecting a population or a sample from the group being studied", fb:"Drawing the sample from class lists is explained in the plan, so that element is covered already."}],
      "A project plan describes a question for investigation, a collection method with social considerations, a selection method, and a collection procedure. The plan still needs <b>the method to be used for collection of the data</b>.",
      {mode:"plan-collection"});
  },
  function(){
    return mcq("A project plan opens with this sentence: the project will investigate whether students who walk to school arrive more alert in first period than students who ride the bus. Which element of the project plan does this sentence belong to?",
      {t:"The question for investigation, in the wording that the project sets out to answer", fb:"Right: the sentence states what the project will investigate, which is its guiding question."},
      [{t:"The method for selecting a population or a sample from the group being studied", fb:"No people are selected in this sentence; it states what the project will investigate overall."},
       {t:"The method of data collection, in the social considerations that protect participants", fb:"No collection method or treatment of people appears in this sentence; it frames the study question."},
       {t:"The method to be used for collection of the data during the project field work", fb:"No gathering or recording steps appear in this sentence; it states the question the data must answer."}],
      "A project plan describes a question for investigation, a collection method with social considerations, a selection method, and a collection procedure. This sentence belongs to <b>the question for investigation</b>.",
      {mode:"plan-question"});
  }
]), ["A plan has four elements: its question, its collection method with social considerations, its selection method, and its collection procedure.", "Decide what the detail does in the plan: states the question, protects people, picks people, or gathers data."]);

E("u9-supported-conclusion", 9, ["11.9"], 3, "var", varset([
  function(){
    return mcq("For a project, a student surveys 40 students at school about getting to school. Of the 40 students, 30 say they walk, 6 ride a bus and 4 get a ride. Which conclusion does this data actually support?",
      {t:"Most of the 40 students surveyed said they walk to school on a regular school day", fb:"Right: 30 of 40 is most of the group surveyed, so the conclusion stays inside the data."},
      [{t:"Most students in the whole province walk to school on a regular school day each year", fb:"Forty students at one school cannot support a claim about a whole province of students."},
       {t:"Walking to school causes students to arrive at school feeling more alert each day", fb:"The survey counted travel methods only; it measured nothing about alertness or its causes."},
       {t:"Most of the 40 students surveyed said they ride a bus to school on a regular day", fb:"Only 6 of 40 named the bus, so this conclusion contradicts the numbers in the survey."}],
      "A conclusion must stay inside the data collected: 30 of the 40 students surveyed walk, and nothing wider was measured. The supported conclusion is <b>most of the 40 students surveyed said they walk to school</b>.",
      {mode:"conclusion-walk"});
  },
  function(){
    return mcq("For a project, a student grows 10 bean plants with extra light and 10 without it. After three weeks, 7 of the extra light plants are taller than the tallest plant grown without extra light. Which conclusion does this data actually support?",
      {t:"In this trial, most plants with extra light grew taller than the plants without it", fb:"Right: 7 of 10 beating every untreated plant supports a conclusion about this trial only."},
      [{t:"Extra light will make every bean plant grow taller in any garden or classroom trial", fb:"One small trial cannot promise results for every plant in any place it might be grown."},
       {t:"Extra light is the only reason any of the plants in the trial grew taller at all", fb:"Other factors also affect growth, and this trial never tested light as the only cause."},
       {t:"In this trial, most plants without extra light grew taller than the plants with it", fb:"The tallest plants were in the extra light group, so this conclusion contradicts the results."}],
      "A conclusion must stay inside the data collected: in this trial the extra light plants grew taller, and nothing wider was tested. The supported conclusion is <b>in this trial, most plants with extra light grew taller</b>.",
      {mode:"conclusion-plants"});
  },
  function(){
    return mcq("For a project, a student counts library loans over two school weeks. Fiction books were borrowed 120 times and non fiction books were borrowed 45 times during those two weeks. Which conclusion does this data actually support?",
      {t:"During those two weeks, fiction books were borrowed more often than non fiction books", fb:"Right: 120 loans against 45 loans supports a comparison limited to the two weeks counted."},
      [{t:"Fiction books are better written than non fiction books for student readers at school", fb:"Loan counts say nothing about writing quality; the project counted borrowing, not quality."},
       {t:"Every student in the school prefers fiction books over non fiction books this year", fb:"Loan counts over two weeks cannot show what every student prefers across a whole year."},
       {t:"During those two weeks, non fiction books were borrowed more often than fiction books", fb:"Non fiction had 45 loans against 120 for fiction, so this conclusion contradicts the counts."}],
      "A conclusion must stay inside the data collected: fiction loans outnumbered non fiction loans in the two weeks counted. The supported conclusion is <b>during those two weeks, fiction books were borrowed more often</b>.",
      {mode:"conclusion-library"});
  },
  function(){
    return mcq("For a project, a student records the recess temperature on 10 school days in May. On 6 of the 10 days the temperature was above 10 degrees, and on 4 days it was at or below 10 degrees. Which conclusion does this data actually support?",
      {t:"On most of the 10 days recorded, the recess temperature was above 10 degrees in May", fb:"Right: 6 of 10 days is most of the recorded days, so the conclusion matches the records."},
      [{t:"May is always the warmest month of the school year in this part of the province", fb:"Ten days in one month cannot rank all months, and no other month was recorded at all."},
       {t:"Warm recess weather causes students to play outside for longer at recess time", fb:"The project recorded temperatures only; it measured nothing about play time or its causes."},
       {t:"On most of the 10 days recorded, the recess temperature was at or below 10 degrees", fb:"Only 4 of 10 days were at or below 10 degrees, so this conclusion contradicts the records."}],
      "A conclusion must stay inside the data collected: 6 of the 10 recorded days were above 10 degrees, and nothing wider was measured. The supported conclusion is <b>on most of the 10 days recorded, the temperature was above 10 degrees</b>.",
      {mode:"conclusion-temp"});
  }
]), ["A supported conclusion says only what the numbers show, for the group and the time actually studied.", "Check each option against the numbers in the stem, and drop any option that reaches past them."]);

E("u9-self-assessment", 9, ["11.10"], 1, "var", varset([
  function(){
    return mcq("A rubric criterion says a project must select a population or a sample and justify the choice. For the project, a student asked only close friends and gave no reason for choosing them. Which self assessment statement is accurate for this criterion?",
      {t:"My project falls short on this criterion, because I asked only friends and gave no reason for the choice", fb:"Right: the statement honestly matches the criterion to what the project actually did."},
      [{t:"My project was excellent in every way, and the whole study went very well from start to finish overall", fb:"General praise names no criterion and no evidence, so it cannot judge this part of the project."},
       {t:"My project fully meets this criterion, because my friends enjoyed answering all of my questions in the survey", fb:"Enjoyment does not justify a sample choice; the criterion asks for a reasoned selection."},
       {t:"My project had a clear title page and neat charts, so this part of the project is strong and well organized", fb:"Titles and charts belong to other criteria; this criterion is about justifying who was asked."}],
      "Self assessment applies the rubric honestly to the work done: the project asked only friends with no justification, so it falls short on this criterion. The accurate statement is <b>my project falls short, because I asked only friends and gave no reason</b>.",
      {mode:"selfassess-sample"});
  },
  function(){
    return mcq("A rubric criterion says a data collection method must include social considerations, such as permission and privacy. For the project, a student asked permission before each interview and kept names off every form. Which self assessment statement is accurate for this criterion?",
      {t:"My project meets this criterion, because I asked permission first and kept names off every form I used", fb:"Right: the statement ties the criterion to two social considerations the project actually used."},
      [{t:"My project was really good overall, and I feel proud of how the whole study turned out in the end", fb:"General pride names no criterion and no evidence, so it cannot judge this part of the project."},
       {t:"My project falls short on this criterion, because my sample came from only one grade in the school", fb:"Sample grade range belongs to a different criterion; on social considerations this project delivered."},
       {t:"My project fully meets this criterion, because my interview questions were short and easy to read", fb:"Short questions aid clarity, but the criterion asks about permission and privacy protections."}],
      "Self assessment applies the rubric honestly to the work done: permission was asked and names were kept off forms, so the project meets this criterion. The accurate statement is <b>my project meets this criterion, because I asked permission and kept names off forms</b>.",
      {mode:"selfassess-social"});
  },
  function(){
    return mcq("A rubric criterion says findings must be communicated clearly, with labelled charts that an audience can read. For the project, a student presented one chart with no title and no labels on its axes. Which self assessment statement is accurate for this criterion?",
      {t:"My project partly meets this criterion, because my chart shows the data but has no title or axis labels", fb:"Right: the statement honestly credits the chart while naming exactly what the criterion still needs."},
      [{t:"My project was fantastic from beginning to end, and the presentation was the best part of my work", fb:"General praise names no criterion and no evidence, so it cannot judge this part of the project."},
       {t:"My project fully meets this criterion, because my audience clapped at the end of my presentation", fb:"Applause does not show clear communication; the criterion asks for labelled, readable charts."},
       {t:"My project falls short on this criterion, because my sample was drawn from a single classroom only", fb:"Sample source belongs to a different criterion; this criterion is about communicating the findings."}],
      "Self assessment applies the rubric honestly to the work done: the chart shows data but lacks a title and labels, so the project partly meets this criterion. The accurate statement is <b>my project partly meets this criterion, because the chart has no title or axis labels</b>.",
      {mode:"selfassess-charts"});
  },
  function(){
    return mcq("A rubric criterion says a project must state a clear question for investigation that data can answer. For the project, a student investigated one focused question: how many students walk to school each day. Which self assessment statement is accurate for this criterion?",
      {t:"My project meets this criterion, because my question was focused and my data answered it directly", fb:"Right: the statement ties the criterion to the focused question and the data that answered it."},
      [{t:"My project was strong in every area, and I would give the whole study full marks without changes", fb:"Full marks with no evidence names no criterion detail, so it cannot judge this part fairly."},
       {t:"My project falls short on this criterion, because my charts used colours that were hard to read", fb:"Chart colours belong to the communication criterion; the investigation question here was clear."},
       {t:"My project fully meets this criterion, because I finished the whole study before the deadline date", fb:"Finishing on time is not the criterion; it asks whether the question was clear and answerable."}],
      "Self assessment applies the rubric honestly to the work done: the question was focused and the data answered it, so the project meets this criterion. The accurate statement is <b>my project meets this criterion, because my question was focused and my data answered it</b>.",
      {mode:"selfassess-question"});
  }
]), ["Self assessment means applying the rubric criterion to what the project actually did, with evidence.", "Match the criterion to the project detail first; vague praise and unrelated strengths do not count."]);

/* ----- bank-fix.js ----- */
// Math 9 pool-gap fill additions (November 9, 2026) question bank
// Cut verbatim from the standalone bank source
// (math-9-review/bank-src.js, lines 5767 to 6408).
// CRMARKS: u1-gap-order-ops-cr=2
// CRMARKS: u1-gap-two-expr-diff-cr=2
// CRMARKS: u1-gap-mean-target-cr=3
// CRMARKS: u1-gap-div-add-cr=3
// CRMARKS: u1-gap-total-change-cr=3
// CRMARKS: u1-gap-brackets-cr=3
// CRMARKS: u2-gap-estimate-gap-cr=2
// CRMARKS: u2-gap-pyramid-slant-cr=3
// CRMARKS: u3-gap-laws-eval-cr=2
// CRMARKS: u3-gap-simplify-sub-cr=2
// CRMARKS: u3-gap-solve-exponent-cr=3
// CRMARKS: u3-gap-sci-product-cr=3
// CRMARKS: u3-gap-growth-excess-cr=3
// CRMARKS: u3-gap-power-diff-cr=3
// CRMARKS: u4-gap-add-eval-cr=2
// CRMARKS: u4-gap-mono-coeff-cr=2
// CRMARKS: u4-gap-area-eval-cr=3
// CRMARKS: u4-gap-sub-eval-neg-cr=3
// CRMARKS: u4-gap-perimeter-eval-cr=3
// CRMARKS: u4-gap-div-eval-cr=3
// CRMARKS: u5-gap-ineq-boundary-cr=2
// CRMARKS: u5-gap-both-sides-cr=2
// CRMARKS: u5-gap-min-items-cr=3
// CRMARKS: u5-gap-solve-eval-cr=3
// CRMARKS: u6-gap-slope-table-cr=2
// CRMARKS: u6-gap-missing-coord-cr=2
// CRMARKS: u6-gap-break-even-cr=3
// CRMARKS: u6-gap-pattern-far-cr=3
// CRMARKS: u6-gap-inverse-cr=3
// CRMARKS: u7-gap-scale-apply-cr=2
// CRMARKS: u7-gap-map-time-cr=2
// CRMARKS: u7-gap-area-scale-cr=3
// CRMARKS: u7-gap-shadow-diff-cr=3
// CRMARKS: u7-gap-perimeter-scale-cr=3
// CRMARKS: u8-gap-reflex-arc-cr=2
// CRMARKS: u8-gap-cyclic-diag-cr=2
// CRMARKS: u8-gap-tangent-central-cr=3
// CRMARKS: u8-gap-chord-bisect-cr=3
// CRMARKS: u8-gap-semicircle-pyth-cr=3
// CRMARKS: u9-gap-freq-mean-cr=2
// CRMARKS: u9-gap-expected-freq-cr=2
// CRMARKS: u9-gap-complement-pct-cr=3
// CRMARKS: u9-gap-mean-diff-cr=3
// CRMARKS: u9-gap-sample-scale-cr=3
// CRMARKS: u9-gap-win-points-cr=3
// CRMARKS: u9-gap-fix-the-survey-cr=3
// CRMARKS: u9-gap-decision-evidence-cr=3
/* Pool-gap fill, November 9, 2026: new Level 2 entries closing the unit-test
   and exam composition gaps found after the level calibration. CR entries
   always return numq; SR entries always return mcq and stay out of CR_MARKS. */

/* Unit 1: Rational Numbers */

// PG. L2, 6.2, CR 2: signed fraction times a negative decimal, then an addition.
E("u1-gap-order-ops-cr", 1, ["6.2"], 2, "gen", function () {
  var q = pick([2, 4, 5, 8, 10]);
  var p = ri(1, 9);
  var dec = -(ri(2, 12) / 2);
  var add = ri(-30, 30) / 4;
  if (add === 0) add = 1.5;
  var prod = Math.round((p / q) * dec * 10000) / 10000;
  var ans = Math.round((prod + add) * 10000) / 10000;
  var prompt = "Evaluate \\(" + FR(p, q) + " \\times (" + fmt(dec) + ") + " + fmt(add) + "\\). Give your answer as a decimal.";
  var sol = "Multiply first, then add: \\[ \\begin{aligned} " + FR(p, q) + " \\times (" + fmt(dec) + ") &= " + fmt(prod, 4) + " \\\\ " + fmt(prod, 4) + " + " + fmt(add) + " &= " + fmt(ans, 4) + " \\end{aligned} \\] The answer is <b>" + fmt(ans, 4) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-order-ops", p: p, q: q, dec: dec, add: add });
}, ["Follow the order of operations: the multiplication is finished before the addition.", "Change the fraction to a decimal first, then multiply it by the negative decimal."]);

// PG. L2, 6.1, CR 2: evaluate two rational expressions, then give the difference.
E("u1-gap-two-expr-diff-cr", 1, ["6.1"], 2, "gen", function () {
  var d1 = pick([2, 3, 4, 6]), d2 = pick([3, 4, 6, 8]);
  var n1 = ri(1, 7), n2 = ri(1, 7), n3 = ri(1, 7), n4 = ri(1, 7);
  var A = Math.round((n1 / d1 + n2 / d2) * 10000) / 10000;
  var B = Math.round((n3 / d1 - n4 / d2) * 10000) / 10000;
  var ans = Math.round((A - B) * 10000) / 10000;
  var prompt = "Expression A is \\(" + FR(n1, d1) + " + " + FR(n2, d2) + "\\) and expression B is \\(" + FR(n3, d1) + " - " + FR(n4, d2) + "\\). Find the value of A minus B, as a decimal.";
  var sol = "Evaluate each expression first: \\[ \\begin{aligned} A &= " + FR(n1, d1) + " + " + FR(n2, d2) + " = " + fmt(A, 4) + " \\\\ B &= " + FR(n3, d1) + " - " + FR(n4, d2) + " = " + fmt(B, 4) + " \\\\ A - B &= " + fmt(A, 4) + " - " + fmt(B, 4) + " = " + fmt(ans, 4) + " \\end{aligned} \\] The answer is <b>" + fmt(ans, 4) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-two-expr", A: A, B: B });
}, ["Work out the value of each expression on its own before you subtract.", "Start with expression A: add its two fractions using a common denominator."]);

// PG. L2, 6.1, CR 3: mean of signed decimals, then the distance from a target.
E("u1-gap-mean-target-cr", 1, ["6.1"], 2, "gen", function () {
  var t1 = ri(-80, 80), t2 = ri(-80, 80), t3 = ri(-80, 80);
  var rem = (4 - (((t1 + t2 + t3) % 4) + 4) % 4) % 4;
  var t4 = rem + 4 * ri(-18, 18);
  if (t4 < -80 || t4 > 80) t4 = rem;
  var vals = [t1 / 10, t2 / 10, t3 / 10, t4 / 10];
  var mean = (t1 + t2 + t3 + t4) / 40;
  var target = pick([-4, -2, -1, 0, 1, 2, 3, 5]);
  if (Math.abs(mean - target) < 0.5) target = target + 3;
  var ans = Math.round(Math.abs(mean - target) * 100) / 100;
  var prompt = "Four morning temperatures in degrees are " + vals.map(function (v) { return fmt(v); }).join(", ") + ". Find the distance between the mean of the four temperatures and the target temperature of " + fmt(target) + " degrees.";
  var sol = "Add the temperatures and divide by 4 to get the mean, then measure the distance to the target: \\[ \\begin{aligned} \\text{mean} &= \\frac{" + fmt(vals[0]) + " + " + fmt(vals[1]) + " + " + fmt(vals[2]) + " + " + fmt(vals[3]) + "}{4} = " + fmt(mean) + " \\\\ \\text{distance} &= |" + fmt(mean) + " - " + fmt(target) + "| = " + fmt(ans) + " \\end{aligned} \\] The answer is <b>" + fmt(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-mean-target", mean: mean, target: target });
}, ["The mean comes first; the distance is measured from that mean to the target.", "Add the four temperatures together as the first step."]);

// PG. L2, 6.1/6.2, CR 3: fraction division (flip), then an unlike-denominator addition.
E("u1-gap-div-add-cr", 1, ["6.1", "6.2"], 2, "gen", function () {
  var q = pick([3, 4, 5, 6]);
  var r = pick([2, 3]);
  var p = r * ri(2, 5);
  var f = pick([4, 8]);
  var e = ri(1, f - 1);
  var quot = p / r;
  var ans = Math.round((quot + e / f) * 1000) / 1000;
  var prompt = "Evaluate \\(" + FR(p, q) + " \\div " + FR(r, q) + " + " + FR(e, f) + "\\). Give your answer as a decimal.";
  var sol = "Divide first by multiplying by the reciprocal, then add: \\[ \\begin{aligned} " + FR(p, q) + " \\div " + FR(r, q) + " &= " + FR(p, q) + " \\times " + FR(q, r) + " = " + fmt(quot) + " \\\\ " + fmt(quot) + " + " + FR(e, f) + " &= " + fmt(quot) + " + " + fmt(e / f, 3) + " = " + fmt(ans, 3) + " \\end{aligned} \\] The answer is <b>" + fmt(ans, 3) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-div-add", p: p, q: q, r: r, e: e, f: f });
}, ["Division is the first job: flip the divisor and multiply, then do the addition.", "Rewrite the division as a multiplication by the reciprocal of the second fraction."]);

// PG. L2, 6.1, CR 3: total of three signed amounts, then the change from a round bill.
E("u1-gap-total-change-cr", 1, ["6.1"], 2, "gen", function () {
  var a1 = ri(300, 2400) / 100, a2 = ri(200, 1800) / 100, disc = ri(100, 800) / 100;
  var total = Math.round((a1 + a2 - disc) * 100) / 100;
  var bill = total <= 30 ? 50 : 100;
  var ans = Math.round((bill - total) * 100) / 100;
  var prompt = "A shopper buys two items priced at $" + a1.toFixed(2) + " and $" + a2.toFixed(2) + ". A coupon takes $" + disc.toFixed(2) + " off the total. The shopper pays with a $" + bill + " bill. How much change does the shopper get, in dollars?";
  var sol = "Find the amount owed first, then subtract it from the bill: \\[ \\begin{aligned} \\text{total} &= " + a1.toFixed(2) + " + " + a2.toFixed(2) + " - " + disc.toFixed(2) + " = " + total.toFixed(2) + " \\\\ \\text{change} &= " + bill + " - " + total.toFixed(2) + " = " + ans.toFixed(2) + " \\end{aligned} \\] The answer is <b>$" + ans.toFixed(2) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-total-change", total: total, bill: bill });
}, ["The change depends on the final total, so work out what is owed before you subtract.", "Add the two prices and take the coupon off as the first step."]);

// PG. L2, 6.2, CR 3: brackets with signed decimals, then multiply, then add a fraction value.
E("u1-gap-brackets-cr", 1, ["6.2"], 2, "gen", function () {
  var d1 = ri(-40, 60) / 10, d2 = ri(-40, 60) / 10;
  var mult = ri(2, 6);
  var f = pick([2, 4, 8]);
  var e = ri(1, f - 1);
  var inner = Math.round((d1 - d2) * 10) / 10;
  var ans = Math.round((inner * mult + e / f) * 1000) / 1000;
  var prompt = "Evaluate \\(((" + fmt(d1) + ") - (" + fmt(d2) + ")) \\times " + mult + " + " + FR(e, f) + "\\). Give your answer as a decimal.";
  var sol = "Work out the brackets first, then multiply, then add: \\[ \\begin{aligned} (" + fmt(d1) + ") - (" + fmt(d2) + ") &= " + fmt(inner) + " \\\\ " + fmt(inner) + " \\times " + mult + " &= " + fmt(inner * mult) + " \\\\ " + fmt(inner * mult) + " + " + fmt(e / f, 3) + " &= " + fmt(ans, 3) + " \\end{aligned} \\] The answer is <b>" + fmt(ans, 3) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-brackets", inner: inner, mult: mult });
}, ["Brackets are evaluated before any multiplication or addition outside them.", "Subtract the two decimals inside the brackets as the first step."]);

/* Unit 2: Square Roots and Surface Area */

// PG. L2, 6.5, CR 2: estimate a square root to 1 decimal place from the closest perfect squares (revised Nov 12, 2026 at Jason's direction: the earlier version also asked for the gap to the perfect square, two asks in one question; now the estimate only, tolerance 0.1, worked solution gives the best estimate).
E("u2-gap-estimate-gap-cr", 2, ["6.5"], 2, "gen", function () {
  var n = u2nonSquare(30, 95);
  var lo = Math.floor(Math.sqrt(n));
  var gapLo = n - lo * lo, gapHi = (lo + 1) * (lo + 1) - n;
  var best = gapLo <= gapHi ? lo : lo + 1;
  var est = Math.round(Math.sqrt(n) * 10) / 10;
  var t1 = Math.round((est - 0.1) * 10) / 10, t2 = Math.round((est + 0.1) * 10) / 10;
  var sq = function (x) { return Math.round(x * x * 100) / 100; };
  var prompt = "Estimate \\(\\sqrt{" + n + "}\\). Give your answer to 1 decimal place.";
  var sol = "The perfect squares near " + n + " are \\(" + lo + "^{2} = " + (lo * lo) + "\\) and \\(" + (lo + 1) + "^{2} = " + ((lo + 1) * (lo + 1)) + "\\), so \\(\\sqrt{" + n + "}\\) lies between " + lo + " and " + (lo + 1) + ", nearer to " + best + ". Squaring the tenths around the estimate: \\[ \\begin{aligned} " + fmt(t1, 1) + "^{2} &= " + fmt(sq(t1), 2) + " \\\\ " + fmt(est, 1) + "^{2} &= " + fmt(sq(est), 2) + " \\\\ " + fmt(t2, 1) + "^{2} &= " + fmt(sq(t2), 2) + " \\end{aligned} \\] " + fmt(sq(est), 2) + " is the closest of these to " + n + ", so the best estimate is <b>" + fmt(est, 1) + "</b>.";
  return numq(prompt, est, 0.1, sol, { mode: "gap-estimate-gap", n: n, best: best });
}, ["An estimate uses the perfect square nearest to the number under the root.", "List the perfect squares just below and just above the number first."]);

// PG. L2, 9.3, CR 3: surface area of a square pyramid with the slant height derived by Pythagoras.
E("u2-gap-pyramid-slant-cr", 2, ["9.3"], 2, "gen", function () {
  var tr = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [20, 21, 29]]);
  var swap = Math.random() < 0.5;
  var kk = pick([1, 2, 3]);
  var half = (swap ? tr[1] : tr[0]) * kk, height = (swap ? tr[0] : tr[1]) * kk, slant = tr[2] * kk;
  var base = 2 * half;
  var sa = base * base + 2 * base * slant;
  var thing = pick(["pyramid", "tent", "monument"]);
  var prompt = thing === "tent"
    ? "A tent is shaped like a square pyramid. Its base has side length " + base + " cm and its vertical height is " + height + " cm. Find the total surface area of the tent, in square centimetres."
    : "A square " + thing + " has a base with side length " + base + " cm and a vertical height of " + height + " cm. Find the total surface area of the " + thing + ", in square centimetres.";
  var sol = "The slant height is not given, so find it with the Pythagorean theorem using half the base and the height: \\[ \\begin{aligned} \\text{slant}^{2} &= " + half + "^{2} + " + height + "^{2} = " + (half * half + height * height) + " \\\\ \\text{slant} &= " + slant + " \\end{aligned} \\] Now build the surface from its faces: the square base has area " + (base * base) + ", and each of the four triangular faces has area " + (base * slant / 2) + " (half of " + base + " times " + slant + "): \\[ \\begin{aligned} SA &= " + (base * base) + " + 4(" + (base * slant / 2) + ") \\\\ &= " + sa + " \\end{aligned} \\] The answer is <b>" + sa + " cm\\(^{2}\\)</b>.";
  var q = numq(prompt, sa, 0.01, sol, { mode: "gap-pyramid-slant", base: base, height: height, slant: slant });
  q.figure = solPyramid(base, height, fmt(base) + " cm", fmt(height) + " cm", "?", "Square pyramid with base side and height labelled and slant height unknown");
  return q;
}, ["The triangular faces need the slant height, which the pyramid does not state directly.", "Halve the base side, then use the Pythagorean theorem with the height to get the slant height."]);

// PG. L2, 9.2, SR: surface area of a two-solid composite (box joined to a triangular prism).
E("u2-gap-composite-sa-mc", 2, ["9.2"], 2, "gen", function () {
  var tr = pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17]]);
  var a = tr[0], b = tr[1], c = tr[2];
  var L = ri(5, 12), W = ri(4, 9), H = ri(3, 8);
  if (a > W) W = ri(a, 9);
  var saBox = 2 * (L * W + L * H + W * H);
  var saPrism = a * b + (a + b + c) * L;
  var contact = a * L;
  var tot = saBox + saPrism - 2 * contact;
  var prompt = "A display stand is made from a box and a right triangular prism joined together. The box measures " + L + " cm long, " + W + " cm wide and " + H + " cm high. The prism is " + L + " cm long, and each triangular end is a right triangle with legs " + a + " cm and " + b + " cm and hypotenuse " + c + " cm. The prism sits on top of the box, and the two solids touch over a rectangle " + a + " cm by " + L + " cm. What is the total surface area of the stand, in square centimetres?";
  var sol = "Find each solid from its faces, then subtract the touching rectangle twice because it is hidden on both solids. The box has face areas " + (L * W) + ", " + (L * H) + " and " + (W * H) + ", each twice, giving " + saBox + ". The prism has two triangular ends of area " + (a * b / 2) + " each and three rectangles of areas " + (a * L) + ", " + (b * L) + " and " + (c * L) + ", giving " + saPrism + ": \\[ \\begin{aligned} SA &= " + saBox + " + " + saPrism + " - 2(" + contact + ") \\\\ &= " + tot + " \\end{aligned} \\] The answer is <b>" + tot + " cm\\(^{2}\\)</b>.";
  var q = mcq(prompt,
    { t: fmt(tot), fb: "Correct: both solids are counted, and the hidden touching rectangle is removed from each one." },
    [{ t: fmt(saBox + saPrism), fb: "That adds the two solids but leaves the hidden touching faces counted on both solids." },
     { t: fmt(saBox + saPrism - contact), fb: "That removes the touching rectangle only once, but it is hidden on both solids, so it must come off twice." },
     { t: fmt(saBox + saPrism - 3 * contact), fb: "That removes the touching rectangle three times; it is hidden on exactly two faces, one on each solid." }],
    sol, { mode: "gap-composite-sa", tot: tot });
  if (a <= W) q.figure = solBoxTri(a, b, c, L, W, H, fmt(a) + " cm", fmt(b) + " cm", fmt(c) + " cm", fmt(L) + " cm", fmt(W) + " cm", fmt(H) + " cm", "Triangular prism on a box with labelled dimensions");
  return q;
}, ["Treat the stand as two separate solids first, then adjust for the join.", "Add the two surface areas, then subtract the touching rectangle twice since it is hidden on both solids."]);


// Repeat-fix tranche (Nov 19, 2026): eight Level 2 multiple-choice
// entries for Unit 2, authored after set G6N4MM dealt the unit's two
// Level 2 MC generators (u2-spot-error, u2-gap-composite-sa-mc) seven
// times between them to fill the unit test's 7-item Level 2 band.
// Each entry below covers an indicator that had no Level 2 MC entry;
// together with the two existing entries the unit's Level 2 MC pool
// stands at 10 distinct entries against the 7-item band.

// PG. L2, 6.5, SR: best one-decimal estimate of a square root, judged
// by squaring the neighbouring tenths (the MC companion to the
// u2-gap-estimate-gap-cr written entry on the same indicator).
E("u2-gap-estimate-best-mc", 2, ["6.5"], 2, "gen", function () {
  var n = u2nonSquare(12, 399);
  var lo = Math.floor(Math.sqrt(n)), hi = lo + 1;
  var est = u2r1(Math.sqrt(n));
  var sq = function (x) { return Math.round(x * x * 100) / 100; };
  var cands = [u2r1(est - 0.2), u2r1(est + 0.2), lo, hi, u2r1(est - 0.5), u2r1(est + 0.5)];
  var ds = [];
  for (var i = 0; i < cands.length && ds.length < 3; i++) {
    var v = cands[i];
    if (v > 0 && v !== est && !ds.some(function (d) { return d.v === v; })) {
      ds.push({ v: v, fb: "Square it: " + fmt(v) + " squared is " + fmt(sq(v)) + ", which is farther from " + n + " than " + fmt(sq(est)) + " is." });
    }
  }
  var prompt = "What is the best estimate for \\(\\sqrt{" + n + "}\\), to one decimal place?";
  var sol = "The perfect squares near " + n + " are \\(" + lo + "^{2} = " + (lo * lo) + "\\) and \\(" + hi + "^{2} = " + (hi * hi) + "\\), so the root lies between " + lo + " and " + hi + ". Squaring the tenths around the root: \\[ \\begin{aligned} " + fmt(u2r1(est - 0.1), 1) + "^{2} &= " + fmt(sq(u2r1(est - 0.1)), 2) + " \\\\ " + fmt(est, 1) + "^{2} &= " + fmt(sq(est), 2) + " \\\\ " + fmt(u2r1(est + 0.1), 1) + "^{2} &= " + fmt(sq(u2r1(est + 0.1)), 2) + " \\end{aligned} \\] " + fmt(sq(est), 2) + " is the closest of these to " + n + ", so the best estimate is <b>" + fmt(est, 1) + "</b>.";
  return mcq(prompt, { t: fmt(est), fb: "Yes: " + fmt(est) + " squared is " + fmt(sq(est)) + ", the closest square to " + n + "." }, fmtPairDs(fmt(est), ds), sol, { mode: "gap-estimate-best", n: n });
}, ["Find the perfect squares just below and just above the number.", "Square the one-decimal values near the root and see which square lands closest to the number."]);

// PG. L2, 6.7, SR: why a calculator root is an approximation, with the
// value and its display drawn fresh each time (the generator form of
// the Level 1 u2-why-approx varset's fixed displays).
E("u2-gap-why-approx-mc", 2, ["6.7"], 2, "gen", function () {
  var n = u2nonSquare(5, 99);
  var disp = Math.sqrt(n).toFixed(7);
  var prompt = "A calculator shows \\(\\sqrt{" + n + "} \\approx " + disp + "\\). A student writes \\(\\sqrt{" + n + "} = " + disp + "\\) and says the value is exact. Which statement is correct?";
  var sol = "Squaring the screen value gives " + (parseFloat(disp) * parseFloat(disp)).toFixed(7) + ", close to " + n + " but not equal to it, because the true decimal continues past the digits the screen can hold. The screen value is <b>an approximation, not the exact value</b>.";
  return mcq(prompt,
    { t: "It is rounded: the root's decimal digits continue forever, so the screen shows only the first few of them", fb: "Right: the display is cut off and rounded, so its square misses " + n + " slightly." },
    [{ t: "It is exact: a value with seven decimal places has no more digits after the ones the screen is showing", fb: "Many places still means rounded: the digits continue beyond the ones shown." },
     { t: "The calculator made an arithmetic error: a correctly working calculator would show the root in full", fb: "The calculator works properly: the limit is how many digits the screen can hold." },
     { t: "The root of " + n + " is a whole number, so a screen value with decimals in it cannot be the right value", fb: n + " is not a perfect square, so its root is not a whole number." }],
    sol, { mode: "gap-why-approx", n: n });
}, ["Ask whether squaring the shown value gives back the starting number exactly.", "Think about whether the decimal digits of the root ever come to an end."]);

// PG. L2, 6.8, SR: a number whose root lies between two decimal
// endpoints (the Level 1 u2-root-between uses whole-number endpoints;
// decimal endpoints make the squaring, not the rooting, the work).
E("u2-gap-between-decimals-mc", 2, ["6.8"], 2, "gen", function () {
  var a = ri(21, 89) / 10;
  var b = u2r1(a + pick([0.8, 0.9, 1.0, 1.1, 1.2]));
  var a2 = u2r2(a * a), b2 = u2r2(b * b);
  var m = u2r2(a2 + (b2 - a2) * pick([0.3, 0.4, 0.5, 0.6, 0.7]));
  var above = u2r2(b2 + ri(2, 9));
  var prompt = "Which number has a square root between " + fmt(a) + " and " + fmt(b) + "?";
  var sol = "Square the endpoints: \\(" + fmt(a) + "^{2} = " + fmt(a2) + "\\) and \\(" + fmt(b) + "^{2} = " + fmt(b2) + "\\). Only " + fmt(m) + " lies between those squares, so the number is <b>" + fmt(m) + "</b>.";
  return mcq(prompt, { t: fmt(m), fb: "Yes: " + fmt(m) + " lies between " + fmt(a2) + " and " + fmt(b2) + "." },
    fmtPairDs(fmt(m), [
      { v: a2, fb: "Its square root is exactly " + fmt(a) + ", which is an endpoint, not between." },
      { v: b2, fb: "Its square root is exactly " + fmt(b) + ", which is an endpoint, not between." },
      { v: above, fb: "Its square root is more than " + fmt(b) + ": square the endpoints to check." }]),
    sol, { mode: "gap-between-decimals", a: a, b: b });
}, ["Square the two given numbers to turn the question into a range for the number itself.", "Check which candidate falls between the two squares you just found."]);

// PG. L2, 6.11, SR: recover the number from its root, with improper
// fraction roots and decimal roots beyond the Level 1 entry's ranges
// (u2-square-from-root is the Level 1 form of the same indicator).
E("u2-gap-number-from-root-mc", 2, ["6.11"], 2, "gen", function () {
  if (pick(["fraction", "decimal"]) === "fraction") {
    var p = ri(4, 12), q = ri(2, 11), g = 0;
    while ((p <= q || u2gcd(p, q) !== 1) && g < 80) { p = ri(4, 12); q = ri(2, 11); g++; }
    var ans = "\\(" + FR(p * p, q * q) + "\\)";
    var fopts = [{ t: "\\(" + FR(p * p, q) + "\\)", fb: "Only the top was squared: the bottom must be squared too." },
                 { t: "\\(" + FR(p, q * q) + "\\)", fb: "Only the bottom was squared: the top must be squared too." },
                 { t: "\\(" + FR(2 * p, q) + "\\)", fb: "That doubles the root: squaring means multiplying the root by itself." }];
    return mcq("A positive number has square root \\(" + FR(p, q) + "\\). What is the number?", { t: ans, fb: "Yes: square the top and the bottom separately." }, fopts,
      "Squaring undoes a square root, and a fraction is squared top and bottom: \\[ \\left(" + FR(p, q) + "\\right)^{2} = " + FR(p * p, q * q) + " \\] The number is <b>" + ans + "</b>.",
      { mode: "gap-from-root-fraction", p: p, q: q });
  }
  var k = ri(11, 49); if (k % 10 === 0) k++;
  var rd = k / 10, nd = u2r2(rd * rd);
  var dcands = [{ v: u2r2(2 * rd), fb: "That is " + fmt(rd) + " doubled, not squared: squaring means " + fmt(rd) + " times " + fmt(rd) + "." }];
  u2d3(nd, [u2r2(nd + 1), u2r2(nd - 1), u2r2(nd + rd), u2r2(rd * rd + 2)]).forEach(function (d) {
    dcands.push({ v: d, fb: "That value does not come from squaring " + fmt(rd) + ": try " + fmt(rd) + " times " + fmt(rd) + "." });
  });
  return mcq("A positive number has square root " + fmt(rd) + ". What is the number?", { t: fmt(nd), fb: "Yes: " + fmt(rd) + " squared equals " + fmt(nd) + "." }, fmtPairDs(fmt(nd), dcands.slice(0, 3)),
    "Squaring undoes a square root: \\[ " + fmt(rd) + "^{2} = " + fmt(rd) + " \\times " + fmt(rd) + " = " + fmt(nd) + " \\] The number is <b>" + fmt(nd) + "</b>.",
    { mode: "gap-from-root-decimal", r: rd });
}, ["Squaring and square roots undo each other, so square the given root.", "For a fraction, square the top and the bottom separately; for a decimal, multiply it by itself."]);

// PG. L2, 3.3, SR: judge perfect squares in decimal and fraction form
// with near-miss distractors (the Level 1 u2-identify-square uses
// neighbouring values; here each distractor fails the square test in
// a different part, so the test itself has to be carried out).
E("u2-gap-perfect-square-mc", 2, ["3.3"], 2, "gen", function () {
  function isSqInt(x) { var s = Math.round(Math.sqrt(x)); return s * s === x; }
  if (pick(["decimal", "fraction"]) === "decimal") {
    var k = ri(13, 39); if (k % 10 === 0) k++;
    var rd = k / 10, nd = u2r2(rd * rd);
    var offs = [0.11, -0.09, 0.21, -0.19, 0.31, 1.01, -0.29];
    var ds = [];
    for (var i = 0; i < offs.length && ds.length < 3; i++) {
      var v = u2r2(nd + offs[i]);
      if (v > 0 && v !== nd && !isSqInt(Math.round(v * 100) * 100) && !ds.some(function (d) { return d.v === v; })) {
        ds.push({ v: v, fb: "No number times itself gives " + fmt(v) + ": test the nearby tenths." });
      }
    }
    return mcq("Which number is a perfect square?", { t: fmt(nd), fb: "Yes: " + fmt(rd) + " times " + fmt(rd) + " equals " + fmt(nd) + "." }, fmtPairDs(fmt(nd), ds),
      "Only one value is a number times itself: \\(" + fmt(rd) + " \\times " + fmt(rd) + " = " + fmt(nd) + "\\). The perfect square is <b>" + fmt(nd) + "</b>.",
      { mode: "gap-perfect-decimal", n: nd });
  }
  var p = ri(2, 9), q = ri(3, 11), g = 0;
  while (u2gcd(p, q) !== 1 && g < 60) { p = ri(2, 9); q = ri(3, 11); g++; }
  var fopts = [{ t: "\\(" + FR(p * p + 1, q * q) + "\\)", fb: "The top part is not a square number, so the fraction is not one." },
               { t: "\\(" + FR(p * p, q * q + 1) + "\\)", fb: "The bottom part is not a square number, so the fraction is not one." },
               { t: "\\(" + FR(p * p + 2, q * q) + "\\)", fb: "The top part sits between two squares, so it is not a square." }];
  return mcq("Which number is a perfect square?", { t: "\\(" + FR(p * p, q * q) + "\\)", fb: "Yes: the top and bottom are both perfect squares." }, fopts,
    "A fraction is a perfect square when its top and bottom are both perfect squares: \\(\\left(" + FR(p, q) + "\\right)^{2} = " + FR(p * p, q * q) + "\\). The perfect square is <b>\\(" + FR(p * p, q * q) + "\\)</b>.",
    { mode: "gap-perfect-fraction", p: p, q: q });
}, ["A perfect square is a number multiplied by itself, in whole, decimal or fraction form.", "For a fraction, check the top and the bottom separately; for a decimal, test the nearby tenths."]);

// PG. L2, 9.1, SR: the hidden area at a join, as a choice among the
// named miscounts (u2-overlap-hidden asks the same thing as a written
// entry; this is its multiple-choice companion on the indicator).
E("u2-gap-hidden-area-mc", 2, ["9.1"], 2, "gen", function () {
  var p = ri(2, 11), q = ri(2, 10);
  var ctx = pick([
    "A small box sits on top of a larger box. The two boxes touch over a rectangle that measures ",
    "A right triangular prism sits on top of a box. The prism and the box touch over a rectangle that measures ",
    "Two boxes are joined face to face over a rectangle that measures "]);
  var prompt = ctx + p + " cm by " + q + " cm. How much surface area is hidden in total where the two solids touch, in square centimetres?";
  var sol = "The touching rectangle has area \\(" + p + " \\times " + q + " = " + (p * q) + "\\). It hides one face on each solid, so it is hidden twice: \\[ \\begin{aligned} \\text{hidden} &= 2 \\times " + (p * q) + " \\\\ &= " + (2 * p * q) + " \\end{aligned} \\] The total hidden surface area is <b>" + (2 * p * q) + " cm\\(^{2}\\)</b>.";
  return mcq(prompt, { t: String(2 * p * q), fb: "Correct: the touching rectangle hides one face on each solid, so it is hidden twice." },
    [{ t: String(p * q), fb: "That counts the touching rectangle once, but it hides a face on each of the two solids." },
     { t: String(3 * p * q), fb: "That counts the touching rectangle three times; it hides exactly two faces, one on each solid." },
     { t: String(4 * p * q), fb: "That counts the touching rectangle four times; only two faces are hidden at the join." }],
    sol, { mode: "gap-hidden-area", p: p, q: q });
}, ["The touching rectangle is hidden on both solids, not just on one of them.", "Find the area of the touching rectangle first, then double it."]);

// PG. L2, 9.2, SR: cylinder surface area as a choice among the named
// omissions (u2-sa-single's cylinder mode is a written entry; this is
// the multiple-choice form, distractors built by leaving parts out).
E("u2-gap-cylinder-sa-mc", 2, ["9.2"], 2, "gen", function () {
  var r = 0, hh = 0, T = 0, e1 = 0, e2 = 0, e3 = 0, tries = 0;
  do {
    r = ri(2, 9); hh = ri(3, 14);
    T = u2r1(2 * 3.14 * r * (r + hh));
    e1 = u2r1(3.14 * r * r + 2 * 3.14 * r * hh);
    e2 = u2r1(2 * 3.14 * r * hh);
    e3 = u2r1(2 * 3.14 * r * r);
    tries++;
  } while (new Set([T, e1, e2, e3]).size < 4 && tries < 80);
  var prompt = "Find the surface area of a right cylinder with radius " + r + " cm and height " + hh + " cm. Use \\(\\pi = 3.14\\) and give your answer in square centimetres, to one decimal place.";
  var sol = "Two circles plus the curved side, using \\(\\pi = 3.14\\). Each circle has area \\(3.14 \\times " + r + " \\times " + r + " = " + fmt(u2r2(3.14 * r * r)) + "\\). The curved side unrolls into a rectangle whose length is the circumference, \\(2 \\times 3.14 \\times " + r + " = " + fmt(u2r2(2 * 3.14 * r)) + "\\), and whose width is " + hh + ", so its area is \\(" + fmt(u2r2(2 * 3.14 * r)) + " \\times " + hh + " = " + fmt(u2r2(2 * 3.14 * r * hh)) + "\\). Add the parts: \\[ \\begin{aligned} SA &= 2(" + fmt(u2r2(3.14 * r * r)) + ") + " + fmt(u2r2(2 * 3.14 * r * hh)) + " \\\\ &= " + fmt(T) + " \\end{aligned} \\] The surface area is <b>" + fmt(T) + " cm\\(^{2}\\)</b>.";
  var qq = mcq(prompt, { t: fmt(T), fb: "Correct: both circular ends and the curved side are counted." },
    fmtPairDs(fmt(T), [
      { v: e1, fb: "That counts only one circular end: a closed cylinder has two ends." },
      { v: e2, fb: "That is only the curved side: the two circular ends are missing." },
      { v: e3, fb: "That is only the two circular ends: the curved side is missing." }]),
    sol, { mode: "gap-cylinder-sa", r: r, h: hh });
  qq.figure = solCylinder(r, hh, fmt(r) + " cm", fmt(hh) + " cm", "Cylinder with labelled dimensions");
  return qq;
}, ["Picture the net of the cylinder: two circles and one rectangle.", "The rectangle's length is the circumference of the circle, and its width is the height."]);

// PG. L2, 9.3, SR: a surface-area problem carried through to a count
// of cans (u2-sa-problem's cans mode is a written entry; here the
// rounding and face-count errors are the choices offered).
E("u2-gap-sa-cans-mc", 2, ["9.3"], 2, "gen", function () {
  var l = 0, w = 0, h = 0, sa = 0, cover = 0, cans = 0, ds = [], tries = 0;
  do {
    l = ri(4, 11) / 2; w = ri(3, 9) / 2; h = ri(3, 8) / 2;
    sa = 2 * (l * w + l * h + w * h);
    cover = pick([8, 10, 12, 15, 20]);
    cans = Math.ceil(sa / cover - 1e-9);
    ds = [];
    var fl = Math.floor(sa / cover + 1e-9);
    if (fl >= 1 && fl !== cans) ds.push({ t: String(fl), fb: "That rounds the division down: the last part of the tank would be left unpainted." });
    var c5 = Math.ceil((sa - l * w) / cover - 1e-9);
    if (c5 >= 1 && c5 !== cans && !ds.some(function (d) { return d.t === String(c5); })) ds.push({ t: String(c5), fb: "That leaves out one face of the tank before dividing: every face is painted." });
    if (!ds.some(function (d) { return d.t === String(cans + 1); })) ds.push({ t: String(cans + 1), fb: "That is one can more than the division requires: the quotient already rounds up to the answer." });
    tries++;
  } while (ds.length < 3 && tries < 60);
  var prompt = "A storage tank shaped like a right rectangular prism measures " + fmt(l) + " m long, " + fmt(w) + " m wide and " + fmt(h) + " m high. It will be painted on the outside, on all faces. One can of paint covers " + cover + " square metres. How many cans of paint are needed?";
  var sol = "Find the surface area first: the tank's three face areas are " + fmt(l * w) + ", " + fmt(l * h) + " and " + fmt(w * h) + ", and each face has a matching opposite face: \\[ \\begin{aligned} SA &= 2(" + fmt(l * w) + ") + 2(" + fmt(l * h) + ") + 2(" + fmt(w * h) + ") \\\\ &= " + fmt(sa) + " \\end{aligned} \\] Then \\(" + fmt(sa) + " \\div " + cover + " \\approx " + fmt(u2r2(sa / cover)) + "\\), so a part can is not enough and the count rounds up. The number of cans needed is <b>" + cans + "</b>.";
  var qq = mcq(prompt, { t: String(cans), fb: "Correct: the surface area divided by the coverage, rounded up." }, ds.slice(0, 3), sol, { mode: "gap-sa-cans", l: l, w: w, h: h, cover: cover });
  qq.figure = solRectPrism(l, w, h, fmt(l) + " m", fmt(w) + " m", fmt(h) + " m", "Rectangular prism tank with labelled dimensions");
  return qq;
}, ["Work out the total surface area before you think about cans.", "Divide the surface area by the coverage per can, and remember a part can is not enough."]);


// Follow-up tranche (Nov 19, 2026): one Level 3 multiple-choice entry
// for Unit 2, closing the structural repeat of u2-best-estimate-side
// left by the repeat-fix tranche above. The unit's Level 3 MC pool
// rises from 2 entries to 3 against the unit test's 2-item Level 3
// band, so the selected-response draw no longer has to re-deal the
// entry the constructed-response section claims. See the addendum in
// Math-9-Unit-2-Repeat-Fix-Report-2026-11-19.md.

// PG. L3, 9.2, SR: surface area of a box with a square pyramid roof,
// where the roof's slant height must be derived by the Pythagorean
// theorem before any face can be counted (the Level 2 composite entry
// u2-gap-composite-sa-mc is given every dimension it needs; here the
// slant height is found first, then the exposed faces are counted by
// the net method with the join hidden on both solids).
E("u2-gap-pyramid-roof-mc", 2, ["9.2"], 3, "gen", function () {
  var s = 0, hb = 0, hp = 0, slant = 0, key = 0, d1 = 0, d2 = 0, d3 = 0, tries = 0;
  do {
    var tr = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17]]);
    var swap = Math.random() < 0.5;
    var kk = pick([1, 2]);
    var half = (swap ? tr[1] : tr[0]) * kk;
    hp = (swap ? tr[0] : tr[1]) * kk;
    slant = tr[2] * kk;
    s = 2 * half;
    hb = ri(3, 9);
    key = s * s + 4 * s * hb + 2 * s * slant;
    d1 = key + 2 * s * s;
    d2 = key + s * s;
    d3 = s * s + 4 * s * hb + 2 * s * hp;
    tries++;
  } while ((new Set([key, d1, d2, d3]).size < 4 || new Set([String(key).length, String(d1).length, String(d2).length, String(d3).length]).size > 1) && tries < 80);
  var thing = pick(["model building", "garden shed", "lookout tower"]);
  var prompt = "A " + thing + " is built from a square box with a square pyramid roof on top. The box measures " + s + " cm long, " + s + " cm wide and " + hb + " cm high. The base of the pyramid exactly covers the top of the box, and the pyramid's vertical height is " + hp + " cm. What is the total surface area of the " + thing + ", in square centimetres?";
  var sol = "The triangular faces of the roof need the slant height, which is not given. It is the hypotenuse of a right triangle whose legs are half the base side, " + half + ", and the pyramid's height, " + hp + ": \\[ \\begin{aligned} \\text{slant}^{2} &= " + half + "^{2} + " + hp + "^{2} = " + (half * half + hp * hp) + " \\\\ \\text{slant} &= " + slant + " \\end{aligned} \\] Now count the exposed faces. The box shows its bottom, area " + (s * s) + ", and its four sides, each " + s + " by " + hb + "; its top is covered by the roof. The roof shows four triangular faces, each with base " + s + " and height " + slant + ". The square where the roof sits is hidden on both solids, so it is counted on neither: \\[ \\begin{aligned} SA &= " + (s * s) + " + 4(" + (s * hb) + ") + 4(" + (s * slant / 2) + ") \\\\ &= " + key + " \\end{aligned} \\] The total surface area is <b>" + key + " cm\\(^{2}\\)</b>.";
  return mcq(prompt, { t: String(key), fb: "Correct: the slant height comes from the Pythagorean theorem, and only the exposed faces are counted." },
    [{ t: String(d1), fb: "That adds the two solids whole: the square where the roof meets the box is hidden on both solids, so it must come off both." },
     { t: String(d2), fb: "That takes the hidden square off only once: it is a face of each solid, so it comes off twice." },
     { t: String(d3), fb: "That uses the pyramid's vertical height as the slant height: the triangular faces need the slant height, found with the Pythagorean theorem." }],
    sol, { mode: "gap-pyramid-roof", s: s, hb: hb, hp: hp, slant: slant });
}, ["The roof's triangular faces need the slant height, which the problem does not state directly.", "Halve the base side and use the Pythagorean theorem with the pyramid's height to get the slant height, then count only the exposed faces."]);


/* Unit 3: Powers and Exponent Laws */

// PG. L2, 3.12, CR 2: product law and quotient law chained, then evaluate.
E("u3-gap-laws-eval-cr", 3, ["3.12"], 2, "gen", function () {
  var a = pick([2, 3]);
  var m = ri(2, 4), n = ri(2, 4), p = ri(1, 3); if (m + n - p < 2) p = 1;
  var tot = m + n - p;
  var val = Math.pow(a, tot);
  var prompt = "Evaluate \\(\\frac{" + a + "^{" + m + "} \\times " + a + "^{" + n + "}}{" + a + "^{" + p + "}}\\).";
  var sol = "Multiply with the product law first, then divide with the quotient law: \\[ \\begin{aligned} " + a + "^{" + m + "} \\times " + a + "^{" + n + "} &= " + a + "^{" + (m + n) + "} \\\\ " + a + "^{" + (m + n) + "} \\div " + a + "^{" + p + "} &= " + a + "^{" + tot + "} = " + fmt(val) + " \\end{aligned} \\] The answer is <b>" + fmt(val) + "</b>.";
  return numq(prompt, val, 0.01, sol, { mode: "gap-laws-eval", a: a, tot: tot });
}, ["Same-base powers are combined with the exponent laws before anything is evaluated.", "Add the exponents for the multiplication in the numerator as the first step."]);

// PG. L2, 3.12, CR 2: simplify in x with the laws, then substitute a value.
E("u3-gap-simplify-sub-cr", 3, ["3.12"], 2, "gen", function () {
  var a = ri(2, 4), b = ri(2, 4), c = ri(1, 2);
  var e = a + b - c;
  var v = pick([2, 3, -2]);
  var val = Math.pow(v, e);
  var prompt = "Simplify \\(\\frac{x^{" + a + "} \\times x^{" + b + "}}{x^{" + c + "}}\\), then evaluate the simplified expression when \\(x = " + v + "\\).";
  var sol = "Simplify with the product and quotient laws first, then substitute: \\[ \\begin{aligned} \\frac{x^{" + a + "} \\times x^{" + b + "}}{x^{" + c + "}} &= x^{" + e + "} \\\\ (" + v + ")^{" + e + "} &= " + fmt(val) + " \\end{aligned} \\] The answer is <b>" + fmt(val) + "</b>.";
  return numq(prompt, val, 0.01, sol, { mode: "gap-simplify-sub", e: e, v: v });
}, ["The expression must be simplified to a single power before the value goes in.", "Add the exponents in the numerator as the first step."]);

// PG. L2, 3.11/3.12, CR 3: solve for the exponent by writing the target as a power of the base.
E("u3-gap-solve-exponent-cr", 3, ["3.11", "3.12"], 2, "gen", function () {
  var a = pick([2, 3, 5]);
  var m = ri(1, 3), k = ri(4, 7);
  if (k - m < 2) m = 1;
  var x = k - m;
  var T = Math.pow(a, k);
  var flip = Math.random() < 0.5;
  var lhs = flip ? (a + "^{x} \\times " + a + "^{" + m + "}") : (a + "^{" + m + "} \\times " + a + "^{x}");
  var prompt = "Find the value of \\(x\\) in the equation \\(" + lhs + " = " + fmt(T) + "\\).";
  var sol = "Write the right side as a power of " + a + " first, then use the product law and compare exponents: \\[ \\begin{aligned} " + fmt(T) + " &= " + a + "^{" + k + "} \\\\ " + m + " + x &= " + k + " \\\\ x &= " + x + " \\end{aligned} \\] The answer is <b>" + x + "</b>.";
  return numq(prompt, x, 0.01, sol, { mode: "gap-solve-exponent", a: a, m: m, k: k });
}, ["Both sides must be powers of the same base before the exponents can be compared.", "Rewrite the number on the right as a power of the base as the first step."]);

// PG. L2, 3.12, CR 3: product of two scientific-notation numbers, then normalize the coefficient.
E("u3-gap-sci-product-cr", 3, ["3.12"], 2, "gen", function () {
  var i = ri(15, 45), j = ri(15, 45), guard = 0;
  while (i * j < 1000 && guard < 200) { i = ri(15, 45); j = ri(15, 45); guard++; }
  var c1 = i / 10, c2 = j / 10;
  var p = ri(2, 5), q = ri(2, 5);
  var prod = i * j / 100;
  var coeff = Math.round(prod / 10 * 1000) / 1000;
  var prompt = "Multiply \\((" + fmt(c1) + " \\times 10^{" + p + "}) \\times (" + fmt(c2) + " \\times 10^{" + q + "})\\). The product is written in scientific notation as a coefficient times a power of 10, with the coefficient between 1 and 10. Give the coefficient.";
  var sol = "Multiply the coefficients and add the exponents, then normalize because the coefficient is too large: \\[ \\begin{aligned} " + fmt(c1) + " \\times " + fmt(c2) + " &= " + fmt(prod, 3) + " \\\\ " + fmt(prod, 3) + " \\times 10^{" + (p + q) + "} &= " + fmt(coeff, 3) + " \\times 10^{" + (p + q + 1) + "} \\end{aligned} \\] The answer is <b>" + fmt(coeff, 3) + "</b>.";
  return numq(prompt, coeff, 0.01, sol, { mode: "gap-sci-product", coeff: coeff });
}, ["Multiply the front numbers and the powers of 10 separately, then check the size of the front number.", "Multiply the two coefficients as the first step."]);

// PG. L2, 3.12, CR 3: doubling growth over k periods, then the excess over a target.
E("u3-gap-growth-excess-cr", 3, ["3.12"], 2, "gen", function () {
  var n0 = ri(3, 9) * 10;
  var k = ri(3, 6);
  var total = n0 * Math.pow(2, k);
  var frac = pick([0.6, 0.7, 0.75, 0.8]);
  var target = Math.round(total * frac / 10) * 10;
  var ans = total - target;
  var prompt = "A bacteria culture starts with " + n0 + " bacteria and doubles every hour. Find how many more bacteria there are after " + k + " hours than a target count of " + fmt(target) + " bacteria.";
  var sol = "Apply the doubling " + k + " times first, then compare with the target: \\[ \\begin{aligned} \\text{after " + k + " hours} &= " + n0 + " \\times 2^{" + k + "} = " + fmt(total) + " \\\\ \\text{excess} &= " + fmt(total) + " - " + fmt(target) + " = " + fmt(ans) + " \\end{aligned} \\] The answer is <b>" + fmt(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-growth-excess", total: total, target: target });
}, ["Work out the grown count first; the excess is a comparison made afterwards.", "Multiply the starting count by 2 raised to the number of hours as the first step."]);

// PG. L2, 3.12/3.14, CR 3: power of a power, then the difference of two powers.
E("u3-gap-power-diff-cr", 3, ["3.12", "3.14"], 2, "gen", function () {
  var a, m, n, p, big, small, diff, guard = 0;
  do { a = pick([2, 3]); m = ri(2, 4); n = ri(2, 3); p = ri(1, 4); big = Math.pow(a, m * n); small = Math.pow(a, p); diff = big - small; guard++; } while ((diff <= 0 || diff > 5000) && guard < 300);
  var c = pick([2, 3]);
  var ans = c * diff;
  var prompt = "Evaluate \\(" + c + "[(" + a + "^{" + m + "})^{" + n + "} - " + a + "^{" + p + "}]\\).";
  var sol = "Use the power of a power law first, evaluate both powers, subtract, then multiply: \\[ \\begin{aligned} (" + a + "^{" + m + "})^{" + n + "} &= " + a + "^{" + (m * n) + "} = " + fmt(big) + " \\\\ " + a + "^{" + p + "} &= " + fmt(small) + " \\\\ " + c + " \\times (" + fmt(big) + " - " + fmt(small) + ") &= " + c + " \\times " + fmt(diff) + " = " + fmt(ans) + " \\end{aligned} \\] The answer is <b>" + fmt(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-power-diff", a: a, ans: ans });
}, ["The power of a power must be simplified before either power is evaluated.", "Multiply the two exponents in the first power as the first step."]);

// PG. L2, 3.12, SR: multi-law simplification with one-law-at-a-time error distractors.
E("u3-gap-laws-mc", 3, ["3.12"], 2, "gen", function () {
  var m = ri(2, 4), n = ri(1, 3), p = ri(2, 4), q = ri(1, 2);
  var e1 = m + n, e2 = p + q;
  function expr(u, v) { return "\\(x^{" + u + "} \\times y^{" + v + "}\\)"; }
  var prompt = "Simplify \\(\\frac{(x^{" + m + "} \\times y^{" + p + "})(x^{" + n + "} \\times y^{" + q + "})}{x^{" + n + "} \\times y^{" + q + "}}\\) by applying the exponent laws. Which expression is the simplified form?";
  var sol = "Apply the product law to each base, then the quotient law to each base: \\[ \\begin{aligned} x^{" + m + "} \\times x^{" + n + "} \\div x^{" + n + "} &= x^{" + e1 + "} \\\\ y^{" + p + "} \\times y^{" + q + "} \\div y^{" + q + "} &= y^{" + e2 + "} \\end{aligned} \\] The answer is <b>" + expr(e1, e2) + "</b>.";
  return mcq(prompt,
    { t: expr(e1, e2), fb: "Correct: each base is combined with the product law and then reduced with the quotient law." },
    [{ t: expr(e1, p), fb: "That keeps the first y exponent only; the y powers must also be combined with the product law before dividing." },
     { t: expr(m, e2), fb: "That keeps the first x exponent only; the x powers must also be combined with the product law before dividing." },
     { t: expr(m, p), fb: "That is the numerator's first factor on its own; neither base has been combined or divided yet." }],
    sol, { mode: "gap-laws-mc", e1: e1, e2: e2 });
}, ["Work one base at a time, and each base needs both the product law and the quotient law.", "Combine the two x powers in the numerator as the first step."]);

/* Unit 4: Polynomials */

// PG. L2, 8.6/8.11, CR 2: add two polynomials, then evaluate at a given x.
E("u4-gap-add-eval-cr", 4, ["8.6", "8.11"], 2, "gen", function () {
  var a1 = u4nz(-5, 5), b1 = u4nz(-6, 6), c1 = ri(-6, 6);
  var a2 = u4nz(-5, 5), b2 = u4nz(-6, 6), c2 = ri(-6, 6);
  var sa = a1 + a2, sb = b1 + b2, sc = c1 + c2;
  var v = ri(2, 4);
  var ans = sa * v * v + sb * v + sc;
  var prompt = "Add the polynomials \\((" + u4p(a1, b1, c1) + ") + (" + u4p(a2, b2, c2) + ")\\), then evaluate the sum when \\(x = " + v + "\\).";
  var sol = "Combine like terms first, then substitute: \\[ \\begin{aligned} (" + u4p(a1, b1, c1) + ") + (" + u4p(a2, b2, c2) + ") &= " + u4p(sa, sb, sc) + " \\\\ " + u4p(sa, sb, sc) + "\\text{ at } x = " + v + " &= " + fmt(ans) + " \\end{aligned} \\] The answer is <b>" + fmt(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-add-eval", sa: sa, sb: sb, sc: sc, v: v });
}, ["The sum must be simplified before the value of x can go in.", "Add the x squared coefficients together as the first step."]);

// PG. L2, 8.8/8.12, CR 2: multiply a monomial through a polynomial, give a named coefficient.
E("u4-gap-mono-coeff-cr", 4, ["8.8", "8.12"], 2, "gen", function () {
  var m = u4nz(-5, 5);
  if (m === 1 || m === -1) m = 3;
  var a = u4nz(-6, 6), b = u4nz(-6, 6), c = ri(-6, 6);
  var ans = m * b;
  var prodStr = u4expr([[m * a, "x^{3}"], [m * b, "x^{2}"], [m * c, "x"]]);
  var prompt = "Multiply \\(" + fmt(m) + "x(" + u4p(a, b, c) + ")\\). What is the coefficient of the \\(x^{2}\\) term in the product?";
  var sol = "Multiply the monomial through every term first: \\[ \\begin{aligned} " + fmt(m) + "x(" + u4p(a, b, c) + ") &= " + prodStr + " \\end{aligned} \\] The coefficient of the \\(x^{2}\\) term comes from \\(" + fmt(m) + "x \\times " + fmt(b) + "x\\). The answer is <b>" + fmt(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-mono-coeff", m: m, b: b });
}, ["Every term inside the brackets is multiplied, and the named term is read off afterwards.", "Multiply the monomial by the x term inside the brackets as the first step."]);

// PG. L2, 8.12, CR 3: area of a rectangle with binomial sides, evaluated at a given x.
E("u4-gap-area-eval-cr", 4, ["8.12"], 2, "gen", function () {
  var a = ri(2, 9), b = ri(2, 9), v = ri(2, 6);
  var s1 = v + a, s2 = v + b, ans = s1 * s2;
  var prompt = "A rectangular garden plot has length \\((x + " + a + ")\\) metres and width \\((x + " + b + ")\\) metres. Find the area of the plot, in square metres, when \\(x = " + v + "\\).";
  var sol = "Evaluate each side first, then multiply the sides for the area: \\[ \\begin{aligned} \\text{length} &= " + v + " + " + a + " = " + s1 + " \\\\ \\text{width} &= " + v + " + " + b + " = " + s2 + " \\\\ \\text{area} &= " + s1 + " \\times " + s2 + " = " + ans + " \\end{aligned} \\] The answer is <b>" + ans + " m\\(^{2}\\)</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-area-eval", s1: s1, s2: s2 });
}, ["The area is a product of the two side lengths, and each side must be evaluated first.", "Substitute the value of x into the length as the first step."]);

// PG. L2, 8.7/8.11, CR 3: subtract polynomials (distribute the negative), then evaluate at a negative x.
E("u4-gap-sub-eval-neg-cr", 4, ["8.7", "8.11"], 2, "gen", function () {
  var a1 = u4nz(-5, 5), b1 = u4nz(-6, 6), c1 = ri(-6, 6);
  var a2 = u4nz(-5, 5), b2 = u4nz(-6, 6), c2 = ri(-6, 6);
  var sa = a1 - a2, sb = b1 - b2, sc = c1 - c2;
  var v = -ri(1, 3);
  var ans = sa * v * v + sb * v + sc;
  var prompt = "Subtract \\((" + u4p(a1, b1, c1) + ") - (" + u4p(a2, b2, c2) + ")\\), then evaluate the difference when \\(x = " + v + "\\).";
  var sol = "Change every sign in the second polynomial first, then combine and substitute: \\[ \\begin{aligned} (" + u4p(a1, b1, c1) + ") - (" + u4p(a2, b2, c2) + ") &= " + u4p(sa, sb, sc) + " \\\\ " + u4p(sa, sb, sc) + "\\text{ at } x = " + v + " &= " + fmt(ans) + " \\end{aligned} \\] The answer is <b>" + fmt(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-sub-eval-neg", sa: sa, sb: sb, sc: sc, v: v });
}, ["Subtraction flips every sign in the second polynomial before like terms are combined.", "Rewrite the second polynomial with every sign changed as the first step."]);

// PG. L2, 8.5/8.6, CR 3: simplify a polynomial perimeter, then evaluate.
E("u4-gap-perimeter-eval-cr", 4, ["8.5", "8.6"], 2, "gen", function () {
  var a1 = u4nz(-4, 4), b1 = ri(-5, 5), a2 = u4nz(-4, 4), b2 = ri(-5, 5), a3 = u4nz(-4, 4), b3 = ri(-5, 5);
  var sx = a1 + a2 + a3, sk = b1 + b2 + b3;
  var v = ri(2, 5);
  var ans = sx * v + sk;
  function side(a, b) { return u4expr([[a, "x"], [b, ""]]); }
  var prompt = "A triangle has side lengths \\((" + side(a1, b1) + ")\\), \\((" + side(a2, b2) + ")\\) and \\((" + side(a3, b3) + ")\\), in centimetres. Find the perimeter of the triangle, in centimetres, when \\(x = " + v + "\\).";
  var sol = "Add the three sides and simplify first, then substitute: \\[ \\begin{aligned} P &= (" + side(a1, b1) + ") + (" + side(a2, b2) + ") + (" + side(a3, b3) + ") \\\\ &= " + side(sx, sk) + " \\\\ &= " + fmt(ans) + "\\text{ at } x = " + v + " \\end{aligned} \\] The answer is <b>" + fmt(ans) + " cm</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-perimeter-eval", sx: sx, sk: sk, v: v });
}, ["A perimeter is a sum of all the sides, simplified before the value goes in.", "Add the x coefficients from the three sides as the first step."]);

// PG. L2, 8.9/8.12, CR 3: divide a polynomial by a monomial, then evaluate the quotient.
E("u4-gap-div-eval-cr", 4, ["8.9", "8.12"], 2, "gen", function () {
  var m = pick([2, 3, 4]);
  var qa = u4nz(-5, 5), qb = u4nz(-6, 6), qc = ri(-5, 5);
  var A = m * qa, B = m * qb, C = m * qc;
  var v = ri(2, 4);
  var ans = qa * v * v + qb * v + qc;
  var prompt = "Divide \\((" + u4p(A, B, C) + ") \\div " + m + "x\\), then evaluate the quotient when \\(x = " + v + "\\).";
  var sol = "Divide every term by the monomial first, then substitute: \\[ \\begin{aligned} (" + u4p(A, B, C) + ") \\div " + m + "x &= " + u4p(qa, qb, qc) + " \\\\ " + u4p(qa, qb, qc) + "\\text{ at } x = " + v + " &= " + fmt(ans) + " \\end{aligned} \\] The answer is <b>" + fmt(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-div-eval", qa: qa, qb: qb, qc: qc, v: v });
}, ["Each term of the polynomial is divided separately before the value goes in.", "Divide the x squared term by the monomial as the first step."]);


/* Unit 5: Linear Equations and Inequalities */

// PG. L2, 8.27/8.28, CR 2: two-step inequality, answer is its boundary value.
E("u5-gap-ineq-boundary-cr", 5, ["8.27", "8.28"], 2, "gen", function () {
  var a = ri(2, 9), x0 = ri(2, 12), b = ri(-12, 12);
  if (b === 0) b = 5;
  var c = a * x0 + b;
  var sym = pick(["<", ">", "\\le", "\\ge"]);
  var prompt = "The inequality \\(" + u5lin(a, b) + " " + sym + " " + fmt(c) + "\\) has a boundary value where the two sides are exactly equal. What is the boundary value of \\(x\\)?";
  var sol = "Set the two sides equal and solve in two steps: \\[ \\begin{aligned} " + u5lin(a, b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(c - b) + " \\\\ x &= " + fmt(x0) + " \\end{aligned} \\] The answer is <b>" + fmt(x0) + "</b>.";
  return numq(prompt, x0, 0.01, sol, { mode: "gap-ineq-boundary", a: a, b: b, c: c });
}, ["The boundary is found by treating the inequality as an equation with equal sides.", "Move the constant term to the other side as the first step."]);

// PG. L2, 8.17, CR 2: equation with the variable on both sides.
E("u5-gap-both-sides-cr", 5, ["8.17"], 2, "gen", function () {
  var x0 = ri(-9, 9);
  if (x0 === 0) x0 = 4;
  var a = ri(4, 9), c = ri(2, a - 2), b = ri(-10, 10), d = b + (a - c) * x0;
  var prompt = "Solve the equation \\(" + u5lin(a, b) + " = " + u5lin(c, d) + "\\). What is the value of \\(x\\)?";
  var sol = "Collect the x terms on one side first, then collect the constants: \\[ \\begin{aligned} " + u5lin(a, b) + " &= " + u5lin(c, d) + " \\\\ " + fmt(a - c) + "x &= " + fmt(d - b) + " \\\\ x &= " + fmt(x0) + " \\end{aligned} \\] The answer is <b>" + fmt(x0) + "</b>.";
  return numq(prompt, x0, 0.01, sol, { mode: "gap-both-sides", a: a, c: c, b: b, d: d });
}, ["The x terms start on both sides, so they must be gathered before dividing.", "Subtract the smaller x term from both sides as the first step."]);

// PG. L2, 8.30/8.21, CR 3: minimum whole number of items to reach a target (solve, then round up).
E("u5-gap-min-items-cr", 5, ["8.30", "8.21"], 2, "gen", function () {
  var s = ri(10, 60), p = ri(4, 9), q = ri(3, 11);
  var target = s + p * q + ri(1, p - 1);
  var ans = q + 1;
  var prompt = "A fundraising booth starts with $" + s + " and earns $" + p + " for each item sold. The booth wants to reach at least $" + target + ". What is the smallest whole number of items the booth must sell?";
  var sol = "Solve the inequality first: \\[ \\begin{aligned} " + s + " + " + p + "n &\\ge " + target + " \\\\ " + p + "n &\\ge " + (target - s) + " \\\\ n &\\ge " + fmt((target - s) / p, 2) + " \\end{aligned} \\] A part of an item cannot be sold, so the count rounds up to the next whole number. The answer is <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-min-items", s: s, p: p, target: target });
}, ["Solve the inequality first; the whole-number meaning of the count is decided afterwards.", "Subtract the starting amount from the target as the first step."]);

// PG. L2, 8.17/8.29, CR 3: solve (x + a)/b = c, then evaluate a short expression at the solution.
E("u5-gap-solve-eval-cr", 5, ["8.17", "8.29"], 2, "gen", function () {
  var b = ri(2, 6), c = ri(3, 9), a = ri(2, 12);
  var x = b * c - a;
  var e = ri(2, 15);
  var ans = 2 * x + e;
  var prompt = "Solve the equation \\(\\frac{x + " + a + "}{" + b + "} = " + c + "\\), then evaluate \\(2x + " + e + "\\) at the solution. Give the value of the expression.";
  var sol = "Undo the division first, then undo the addition, then substitute into the expression: \\[ \\begin{aligned} x + " + a + " &= " + (b * c) + " \\\\ x &= " + x + " \\\\ 2(" + x + ") + " + e + " &= " + ans + " \\end{aligned} \\] The answer is <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-solve-eval", x: x, e: e });
}, ["The equation must be solved completely before its solution can be used in the expression.", "Multiply both sides by the denominator as the first step."]);

/* Unit 6: Linear Relations */

// PG. L2, 7.4/7.2, CR 2: slope extracted from a table's differences, then the value at a new x.
E("u6-gap-slope-table-cr", 6, ["7.4", "7.2"], 2, "gen", function () {
  var m = ri(2, 6), b = ri(3, 15);
  var X = ri(9, 14);
  var ans = b + m * X;
  var rows = [0, 1, 2, 3].map(function (x) { return x + ": " + (b + m * x); }).join(", ");
  var prompt = "A linear relation has this table of values. x and y pairs: " + rows + ". The pattern continues in the same way. What is the value of y when x = " + X + "?";
  var sol = "The y values grow by " + m + " each step, and the start value at x = 0 is " + b + ": \\[ \\begin{aligned} y &= " + b + " + " + m + "x \\\\ y(" + X + ") &= " + b + " + " + m + "(" + X + ") = " + ans + " \\end{aligned} \\] The answer is <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-slope-table", m: m, b: b, X: X });
}, ["The step size is hidden in the differences between neighbouring y values.", "Subtract two neighbouring y values to find the step as the first step."]);

// PG. L2, 7.7/7.8, CR 2: missing coordinate of a point on the line through two given points.
E("u6-gap-missing-coord-cr", 6, ["7.7", "7.8"], 2, "gen", function () {
  var m = ri(2, 5), b = ri(1, 12);
  var x1 = ri(0, 3), x2 = x1 + ri(2, 4), x3 = x2 + ri(2, 5);
  var y1 = b + m * x1, y2 = b + m * x2, ans = b + m * x3;
  var prompt = "The points (" + x1 + ", " + y1 + ") and (" + x2 + ", " + y2 + ") lie on a straight line. The point (" + x3 + ", y) is also on the same line. What is the value of y?";
  var sol = "Find the slope from the two given points first, then extend the pattern to the new x: \\[ \\begin{aligned} \\text{slope} &= \\frac{" + y2 + " - " + y1 + "}{" + x2 + " - " + x1 + "} = " + m + " \\\\ y &= " + y2 + " + " + m + "(" + x3 + " - " + x2 + ") = " + ans + " \\end{aligned} \\] The answer is <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-missing-coord", m: m, x3: x3 });
}, ["The rate of the line must be worked out from the two complete points before the incomplete point can be used.", "Divide the change in y by the change in x for the two given points as the first step."]);

// PG. L2, 7.2/7.10, CR 3: break-even point of two cost plans (set equal, then solve).
E("u6-gap-break-even-cr", 6, ["7.2", "7.10"], 2, "gen", function () {
  var m1 = ri(2, 6), d = ri(2, 6), t = ri(3, 9);
  var m2 = m1 + d;
  var a2 = ri(5, 30), a1 = a2 + d * t;
  var prompt = "Plan A charges a fee of $" + a1 + " plus $" + m1 + " per hour. Plan B charges a fee of $" + a2 + " plus $" + m2 + " per hour. After how many hours do the two plans cost exactly the same?";
  var sol = "Set the two costs equal and solve: \\[ \\begin{aligned} " + a1 + " + " + m1 + "h &= " + a2 + " + " + m2 + "h \\\\ " + (a1 - a2) + " &= " + d + "h \\\\ h &= " + t + " \\end{aligned} \\] The answer is <b>" + t + "</b>.";
  return numq(prompt, t, 0.01, sol, { mode: "gap-break-even", t: t });
}, ["Break-even means the two total costs are equal, which gives an equation to solve.", "Write both plan costs with h hours and set them equal as the first step."]);

// PG. L2, 7.1/7.4, CR 3: build the relation from a pattern table, then evaluate far outside the table.
E("u6-gap-pattern-far-cr", 6, ["7.1", "7.4"], 2, "gen", function () {
  var m = ri(3, 7), s = ri(4, 12);
  var N = ri(18, 30);
  var ans = s + m * (N - 1);
  var c1 = s, c2 = s + m, c3 = s + 2 * m, c4 = s + 3 * m;
  var prompt = "A tile pattern grows in the same way at every step. Figure 1 uses " + c1 + " tiles, Figure 2 uses " + c2 + " tiles, Figure 3 uses " + c3 + " tiles and Figure 4 uses " + c4 + " tiles. How many tiles does Figure " + N + " use?";
  var sol = "Each figure adds " + m + " tiles, starting from " + s + " at Figure 1: \\[ \\begin{aligned} \\text{tiles} &= " + s + " + " + m + "(n - 1) \\\\ &= " + s + " + " + m + "(" + (N - 1) + ") = " + ans + " \\end{aligned} \\] The answer is <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-pattern-far", m: m, s: s, N: N });
}, ["A general rule for the pattern must be built before a far figure can be evaluated.", "Find the difference between the counts of two neighbouring figures as the first step."]);

// PG. L2, 7.9/7.10, CR 3: use a stated linear relation in reverse (substitute the target, then solve).
E("u6-gap-inverse-cr", 6, ["7.9", "7.10"], 2, "gen", function () {
  var m = ri(2, 6), b = ri(20, 80), t0 = ri(6, 14);
  var T = b + m * t0;
  var prompt = "A water tank is filling at a steady rate. The amount of water in the tank, in litres, after t minutes is given by A = " + b + " + " + m + "t. After how many minutes does the amount reach " + T + " litres?";
  var sol = "Set the relation equal to the target amount and solve for t: \\[ \\begin{aligned} " + b + " + " + m + "t &= " + T + " \\\\ " + m + "t &= " + (T - b) + " \\\\ t &= " + t0 + " \\end{aligned} \\] The answer is <b>" + t0 + "</b>.";
  return numq(prompt, t0, 0.01, sol, { mode: "gap-inverse", m: m, b: b, T: T });
}, ["The relation is used in reverse here: the amount is known and the time is missing.", "Set the expression equal to the target amount as the first step."]);

/* Unit 7: Similarity and Transformations */

// PG. L2, 10.17/10.15, CR 2: find the scale factor from one pair, then apply it to a second length.
E("u7-gap-scale-apply-cr", 7, ["10.17", "10.15"], 2, "gen", function () {
  var k = pick([1.5, 2, 2.5, 3]);
  var o1 = pick([6, 8, 10, 12]);
  var i1 = o1 * k;
  var o2 = pick([5, 7, 9, 11, 14]);
  var ans = Math.round(o2 * k * 100) / 100;
  var ctx = pick([
    "A poster is an enlargement of a drawing. One side of the drawing is " + o1 + " cm and the matching side of the poster is " + fmt(i1) + " cm. Another side of the drawing is " + o2 + " cm. How long is the matching side of the poster, in centimetres?",
    "A banner is an enlargement of a logo. One side of the logo is " + o1 + " cm and the matching side of the banner is " + fmt(i1) + " cm. Another side of the logo is " + o2 + " cm. How long is the matching side of the banner, in centimetres?"
  ]);
  var sol = "Find the scale factor from the known pair first, then apply it to the second side: \\[ \\begin{aligned} \\text{scale factor} &= " + fmt(i1) + " \\div " + o1 + " = " + fmt(k) + " \\\\ \\text{new side} &= " + o2 + " \\times " + fmt(k) + " = " + fmt(ans) + " \\end{aligned} \\] The answer is <b>" + fmt(ans) + " cm</b>.";
  var q = numq(ctx, ans, 0.01, sol, { mode: "gap-scale-apply", k: k });
  q.figure = solBarsFig([{ name: "Original", len: o1, lab: fmt(o1) + " cm" }, { name: "Image", len: i1, lab: fmt(i1) + " cm" }, { name: "Original", len: o2, lab: fmt(o2) + " cm" }, { name: "Image", len: ans, lab: "?" }], "Matching sides of an original and its image as bars");
  return q;
}, ["The scale factor is not stated; it must be recovered from the pair of matching sides first.", "Divide the image side by its matching original side as the first step."]);

// PG. L2, 10.19/10.8, CR 2: map distance to real distance, then travel time at a stated speed.
E("u7-gap-map-time-cr", 7, ["10.19", "10.8"], 2, "gen", function () {
  var R, d, speed, real, hours, guard = 0;
  do { R = pick([4, 5, 6, 8, 9, 10, 12]); d = ri(4, 18); real = R * d; speed = pick([30, 40, 50, 60, 80, 90, 100, 120]); guard++; } while (((2 * real) % speed !== 0 || real / speed < 1 || real / speed > 4) && guard < 300);
  hours = real / speed;
  var prompt = "On a map, 1 cm represents " + R + " km. Two towns are " + d + " cm apart on the map. A bus drives between the towns at " + speed + " km/h. How many hours does the drive take?";
  var sol = "Use the scale to get the real distance first, then divide by the speed: \\[ \\begin{aligned} \\text{real distance} &= " + d + " \\times " + R + " = " + real + "\\text{ km} \\\\ \\text{time} &= " + real + " \\div " + speed + " = " + hours + "\\text{ h} \\end{aligned} \\] The answer is <b>" + hours + "</b>.";
  var q = numq(prompt, hours, 0.01, sol, { mode: "gap-map-time", R: R, real: real, speed: speed });
  var figB = solLine([60, 105], [280, 105], false, 2);
  figB += '<circle cx="60" cy="105" r="4" fill="' + FIG_INK + '"/><circle cx="280" cy="105" r="4" fill="' + FIG_INK + '"/>';
  figB += solT(170, 80, fmt(d) + " cm", 13, false);
  figB += solT(170, 134, "1 cm represents " + fmt(R) + " km", 12, false);
  q.figure = solSvg(340, 160, figB, "Map distance between two towns");
  return q;
}, ["The map measurement must be converted to a real distance before the speed can be used.", "Multiply the map distance by the scale value as the first step."]);

// PG. L2, 10.15/10.17, CR 3: area of the image using the square of the scale factor.
E("u7-gap-area-scale-cr", 7, ["10.15", "10.17"], 2, "gen", function () {
  var k = pick([1.5, 2, 2.5, 3]);
  var w = pick([4, 6, 8, 10]), h = pick([3, 5, 6, 9]);
  var iw = w * k;
  var area = Math.round(w * h * k * k * 100) / 100;
  var prompt = "A rectangle is " + w + " cm wide and " + h + " cm tall. It is enlarged so that the width becomes " + fmt(iw) + " cm. What is the area of the enlarged rectangle, in square centimetres?";
  var sol = "Find the scale factor from the widths first; areas grow by the square of the scale factor: \\[ \\begin{aligned} \\text{scale factor} &= " + fmt(iw) + " \\div " + w + " = " + fmt(k) + " \\\\ \\text{original area} &= " + w + " \\times " + h + " = " + (w * h) + " \\\\ \\text{image area} &= " + (w * h) + " \\times " + fmt(k) + "^{2} = " + fmt(area) + " \\end{aligned} \\] The answer is <b>" + fmt(area) + " cm\\(^{2}\\)</b>.";
  var q = numq(prompt, area, 0.01, sol, { mode: "gap-area-scale", k: k });
  q.figure = solRectPair({ w1: w, h1: h, wLab1: fmt(w) + " cm", hLab1: fmt(h) + " cm", cap1: "Original", w2: iw, h2: h * k, wLab2: fmt(iw) + " cm", hLab2: "?", cap2: "Enlarged", aria: "A rectangle and its enlargement with labelled sides" });
  return q;
}, ["Lengths and areas scale differently: the area factor is the square of the length factor.", "Divide the new width by the original width to get the scale factor as the first step."]);

// PG. L2, 10.19/10.15, CR 3: two shadow heights by proportion, then their difference.
E("u7-gap-shadow-diff-cr", 7, ["10.19", "10.15"], 2, "gen", function () {
  var hp = pick([1.5, 1.6, 1.8]);
  var sp = pick([1, 1.2, 1.5, 2]);
  var m1 = ri(2, 4), m2 = ri(4, 6);
  if (m2 === m1) m2 = m1 + 2;
  var s1 = Math.round(sp * m1 * 10) / 10, s2 = Math.round(sp * m2 * 10) / 10;
  var h1 = Math.round(hp * m1 * 100) / 100, h2 = Math.round(hp * m2 * 100) / 100;
  var ans = Math.round(Math.abs(h2 - h1) * 100) / 100;
  var prompt = "A person " + fmt(hp) + " m tall casts a shadow " + fmt(sp) + " m long. At the same time, a fence casts a shadow " + fmt(s1) + " m long and a tree casts a shadow " + fmt(s2) + " m long. The objects and their shadows form similar triangles. Find the difference between the height of the tree and the height of the fence, in metres.";
  var sol = "Use the person's shadow ratio on each object first, then compare the two heights: \\[ \\begin{aligned} \\text{fence} &= " + fmt(hp) + " \\times \\frac{" + fmt(s1) + "}{" + fmt(sp) + "} = " + fmt(h1) + " \\\\ \\text{tree} &= " + fmt(hp) + " \\times \\frac{" + fmt(s2) + "}{" + fmt(sp) + "} = " + fmt(h2) + " \\\\ \\text{difference} &= " + fmt(ans) + " \\end{aligned} \\] The answer is <b>" + fmt(ans) + " m</b>.";
  var q = numq(prompt, ans, 0.01, sol, { mode: "gap-shadow-diff", h1: h1, h2: h2 });
  q.figure = solShadowFig([{ name: "Person", h: hp, s: sp, hLab: fmt(hp) + " m", sLab: fmt(sp) + " m" }, { name: "Fence", h: h1, s: s1, hLab: "?", sLab: fmt(s1) + " m" }, { name: "Tree", h: h2, s: s2, hLab: "?", sLab: fmt(s2) + " m" }], "A person, a fence and a tree with their shadows");
  return q;
}, ["Each height comes from the same shadow proportion, and the difference is found only after both heights are known.", "Divide the fence shadow by the person's shadow to get the first scale as the first step."]);

// PG. L2, 10.17/10.15, CR 3: perimeter of the image after finding the factor from one pair of sides.
E("u7-gap-perimeter-scale-cr", 7, ["10.17", "10.15"], 2, "gen", function () {
  var a = ri(3, 9), b = ri(3, 9), c = ri(3, 9);
  var k = pick([1.5, 2, 2.5, 3, 4]);
  var ai = Math.round(a * k * 10) / 10;
  var P = a + b + c;
  var ans = Math.round(P * k * 100) / 100;
  var prompt = "A triangle has side lengths " + a + " cm, " + b + " cm and " + c + " cm. A similar triangle has the side matching the " + a + " cm side measuring " + fmt(ai) + " cm. What is the perimeter of the similar triangle, in centimetres?";
  var sol = "Find the scale factor from the matching sides first, then scale the whole perimeter: \\[ \\begin{aligned} \\text{scale factor} &= " + fmt(ai) + " \\div " + a + " = " + fmt(k) + " \\\\ \\text{perimeter} &= (" + a + " + " + b + " + " + c + ") \\times " + fmt(k) + " = " + fmt(ans) + " \\end{aligned} \\] The answer is <b>" + fmt(ans) + " cm</b>.";
  var q = numq(prompt, ans, 0.01, sol, { mode: "gap-perimeter-scale", k: k, P: P });
  if (a + b > c && a + c > b && b + c > a) {
    var P1 = u7FitTri([a, b, c], 16, 28, 128, 112), P2 = u7FitTri([a * k, b * k, c * k], 192, 28, 128, 112);
    q.figure = u7Svg(345, 165, u7Poly(P1, FIG_SHADE) + solSideLabels(P1, [fmt(c) + " cm", fmt(a) + " cm", fmt(b) + " cm"]) + u7Poly(P2, "#ffffff") + solSideLabels(P2, ["?", fmt(ai) + " cm", "?"]), "An original triangle and a similar triangle with side labels");
  }
  return q;
}, ["Perimeters scale by the same factor as the sides, and that factor comes from the one known pair.", "Divide the image side by its matching original side as the first step."]);


/* Unit 8: Circle Geometry */

// PG. L2, 9.7, CR 2: reflex arc measure from an inscribed angle (inscribed to central to reflex).
E("u8-gap-reflex-arc-cr", 8, ["9.7"], 2, "gen", function () {
  var ins = ri(28, 80);
  var central = 2 * ins, ans = 360 - central;
  var prompt = "Points A, B and C lie on a circle with centre O. The inscribed angle ACB measures \\(" + ins + "^{\\circ}\\) and it subtends the minor arc AB. Find the measure of the reflex arc AB, in degrees.";
  var sol = "The central angle on the minor arc is double the inscribed angle first; the reflex arc is what remains of the full circle: \\[ \\begin{aligned} \\text{minor arc AB} &= 2 \\times " + ins + "^{\\circ} = " + central + "^{\\circ} \\\\ \\text{reflex arc AB} &= 360^{\\circ} - " + central + "^{\\circ} = " + ans + "^{\\circ} \\end{aligned} \\] The answer is <b>\\(" + ans + "^{\\circ}\\)</b>.";
  var q = numq(prompt, ans, 0.01, sol, { mode: "gap-reflex-arc", ins: ins });
  var A = u8P(270 - ins), B = u8P(270 + ins), C = u8P(90);
  q.figure = u8Fig({ pts: { A: A, B: B, C: C }, segs: [["O", "A"], ["O", "B"], ["C", "A"], ["C", "B"]], angles: [{ v: "C", a1: u8Dir(C, A), a2: u8Dir(C, B), r: 0.3, lr: 0.55, label: fmt(ins) + "°" }] });
  return q;
}, ["An inscribed angle and its central angle are linked, and a reflex arc completes the full turn.", "Double the inscribed angle to get the minor arc as the first step."]);

// PG. L2, 9.5, CR 2: angle in a cyclic quadrilateral after combining the parts split by a diagonal.
E("u8-gap-cyclic-diag-cr", 8, ["9.5"], 2, "gen", function () {
  var p = ri(20, 55), q = ri(20, 55);
  var ans = 180 - p - q;
  var prompt = "Points A, B, C and D lie on a circle in that order, so ABCD is a cyclic quadrilateral. The diagonal AC splits angle A into two parts: angle BAC measures \\(" + p + "^{\\circ}\\) and angle CAD measures \\(" + q + "^{\\circ}\\). Find the measure of angle BCD, in degrees.";
  var sol = "Combine the two parts of angle A first; opposite angles of a cyclic quadrilateral add to \\(180^{\\circ}\\): \\[ \\begin{aligned} \\angle A &= " + p + "^{\\circ} + " + q + "^{\\circ} = " + (p + q) + "^{\\circ} \\\\ \\angle BCD &= 180^{\\circ} - " + (p + q) + "^{\\circ} = " + ans + "^{\\circ} \\end{aligned} \\] The answer is <b>\\(" + ans + "^{\\circ}\\)</b>.";
  var qq = numq(prompt, ans, 0.01, sol, { mode: "gap-cyclic-diag", p: p, q: q });
  var A = u8P(200), B = u8P(300), C = u8P(300 + 2 * p), D = u8P(300 + 2 * p + 2 * q);
  qq.figure = u8Fig({ pts: { A: A, B: B, C: C, D: D }, segs: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"], ["A", "C"]], angles: [{ v: "A", a1: u8Dir(A, B), a2: u8Dir(A, C), r: 0.26, lr: 0.46, label: fmt(p) + "°" }, { v: "A", a1: u8Dir(A, C), a2: u8Dir(A, D), r: 0.4, lr: 0.6, label: fmt(q) + "°" }] });
  return qq;
}, ["Angle A is given in two pieces, and the cyclic property applies to the whole angle.", "Add the two parts of angle A together as the first step."]);

// PG. L2, 9.7/9.5, CR 3: central angle found from a tangent-radius triangle, then halved for the inscribed angle.
E("u8-gap-tangent-central-cr", 8, ["9.7", "9.5"], 2, "gen", function () {
  var g = 14 + 2 * ri(0, 31);
  var central = 90 - g, ans = central / 2;
  var frame = pick(["line", "external"]);
  var prompt = frame === "line"
    ? "A line through T and P is a tangent to a circle with centre O, touching the circle at T. The line from O through P meets the circle again at D. In triangle OTP, the angle at P measures \\(" + g + "^{\\circ}\\). Point C is on the major arc TD. Find the measure of the inscribed angle TCD, in degrees."
    : "From a point P outside a circle with centre O, a tangent touches the circle at T, and the line from P through O meets the circle again at D. In triangle OTP, the angle at P measures \\(" + g + "^{\\circ}\\). Point C is on the major arc TD. Find the measure of the inscribed angle TCD, in degrees.";
  var sol = "The radius to a point of tangency is perpendicular to the tangent, so triangle OTP is right-angled at T. Find the central angle first, then halve it: \\[ \\begin{aligned} \\angle TOD &= 180^{\\circ} - 90^{\\circ} - " + g + "^{\\circ} = " + central + "^{\\circ} \\\\ \\angle TCD &= " + central + "^{\\circ} \\div 2 = " + fmt(ans) + "^{\\circ} \\end{aligned} \\] The answer is <b>\\(" + fmt(ans) + "^{\\circ}\\)</b>.";
  var q = numq(prompt, ans, 0.01, sol, { mode: "gap-tangent-central", g: g });
  var tAng = pick([200, 230, 260, 290, 320]);
  var sgn = Math.random() < 0.5 ? 1 : -1;
  var T = u8P(tAng), U = u8P(tAng + sgn * central);
  var sc = 1 / Math.cos(central * Math.PI / 180);
  var P = [U[0] * sc, U[1] * sc], D = U, C = u8P(tAng + sgn * central / 2 + 180);
  q.figure = u8Fig({ pts: { T: T, P: P, D: D, C: C }, segs: [["O", "T"], ["O", "P"], ["C", "T"], ["C", "D"]], tangentSeg: { at: "T", to: "P", beyond: 1.05, back: 0.3 }, rightMarks: [{ v: "T", a1: u8Dir(T, [0, 0]), a2: u8Dir(T, P) }], angles: [{ v: "P", a1: u8Dir(P, T), a2: u8Dir(P, [0, 0]), r: 0.3, lr: 0.55, label: fmt(g) + "°" }, { v: "C", a1: u8Dir(C, T), a2: u8Dir(C, D), r: 0.3, lr: 0.55, label: "?" }] });
  return q;
}, ["Two circle facts chain together here: the tangent fact builds the triangle, and the inscribed angle is half the central angle.", "Use the right angle at T to find the central angle TOD as the first step."]);

// PG. L2, 9.6/9.5, CR 3: chord radius where the perpendicular-from-centre bisection comes before Pythagoras.
E("u8-gap-chord-bisect-cr", 8, ["9.6", "9.5"], 2, "gen", function () {
  var tr = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [7, 24, 25], [15, 20, 25]]);
  var swap = Math.random() < 0.5;
  var kk = pick([1, 2]);
  var half = (swap ? tr[1] : tr[0]) * kk, d = (swap ? tr[0] : tr[1]) * kk, r = tr[2] * kk;
  var chord = 2 * half;
  var frame = pick(["circle", "window"]);
  var prompt = frame === "circle"
    ? "AB is a chord of a circle with centre O. The chord AB is " + chord + " cm long, and the perpendicular distance from O to the chord is " + d + " cm. Find the radius of the circle, in centimetres."
    : "A circular window has centre O, and a straight bar AB across the window is a chord of the circle. The bar AB is " + chord + " cm long, and the perpendicular distance from O to the bar is " + d + " cm. Find the radius of the window, in centimetres.";
  var sol = "The perpendicular from the centre bisects the chord first; then the radius is the hypotenuse of the right triangle: \\[ \\begin{aligned} \\text{half the chord} &= " + chord + " \\div 2 = " + half + " \\\\ r^{2} &= " + d + "^{2} + " + half + "^{2} = " + (d * d + half * half) + " \\\\ r &= " + r + " \\end{aligned} \\] The answer is <b>" + r + " cm</b>.";
  var q = numq(prompt, r, 0.01, sol, { mode: "gap-chord-bisect", half: half, d: d, r: r });
  var A = [-half / r, d / r], B = [half / r, d / r];
  q.figure = u8Fig({ pts: { A: A, B: B }, segs: [["A", "B"], ["O", "A"]], perp: ["A", "B"], sideLabs: [{ a: "A", b: "B", text: fmt(chord) + " cm", off: 15 }, { a: "O", b: "M", text: fmt(d) + " cm", off: 15 }, { a: "O", b: "A", text: "?", off: 15 }] });
  return q;
}, ["The radius is the hypotenuse of a right triangle whose one side is only half of the given chord.", "Halve the chord length as the first step."]);

// PG. L2, 9.8/9.5, CR 3: semicircle right angle first, then Pythagoras for the third side.
E("u8-gap-semicircle-pyth-cr", 8, ["9.8", "9.5"], 2, "gen", function () {
  var tr = pick([[6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [7, 24, 25], [20, 21, 29], [9, 40, 41]]);
  var swap = Math.random() < 0.5;
  var kk = pick([1, 2]);
  var given = (swap ? tr[1] : tr[0]) * kk, ans = (swap ? tr[0] : tr[1]) * kk, hyp = tr[2] * kk;
  var frame = pick(["circle", "arch"]);
  var prompt = frame === "circle"
    ? "AB is a diameter of a circle, and C is a point on the circle. The diameter AB is " + hyp + " cm long and the side AC is " + given + " cm long. Find the length of BC, in centimetres."
    : "A semicircular arch has diameter AB of " + hyp + " cm. The point C is on the arch, and the straight distance AC is " + given + " cm. Find the straight distance BC, in centimetres.";
  var sol = "An angle inscribed in a semicircle is a right angle, so triangle ABC is right-angled at C and Pythagoras applies: \\[ \\begin{aligned} BC^{2} &= " + hyp + "^{2} - " + given + "^{2} = " + (hyp * hyp - given * given) + " \\\\ BC &= " + ans + " \\end{aligned} \\] The answer is <b>" + ans + " cm</b>.";
  var q = numq(prompt, ans, 0.01, sol, { mode: "gap-semicircle-pyth", given: given, hyp: hyp });
  var gam = Math.acos(Math.max(-1, Math.min(1, 2 * (given / hyp) * (given / hyp) - 1))) * 180 / Math.PI;
  var A = [-1, 0], B = [1, 0], C = u8P(gam);
  q.figure = u8Fig({ pts: { A: A, B: B, C: C }, segs: [["A", "B"], ["A", "C"], ["B", "C"]], rightMarks: [{ v: "C", a1: u8Dir(C, A), a2: u8Dir(C, B) }], sideLabs: [{ a: "A", b: "C", text: fmt(given) + " cm", off: 15 }, { a: "B", b: "C", text: "?", off: 15 }] });
  return q;
}, ["The diameter tells you the triangle is right-angled before any side can be found.", "Note that angle C is a right angle because it sits in a semicircle, as the first step."]);

// PG. L2, 9.7, SR: an angle requiring two circle theorems in sequence, with single-theorem distractors.
E("u8-gap-two-theorems-mc", 8, ["9.7"], 2, "gen", function () {
  var p = pick([18, 22, 26, 30, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70]);
  var nm = pick([["Q", "R", "S", "T"], ["A", "B", "C", "D"], ["K", "L", "M", "N"], ["W", "X", "Y", "Z"]]);
  var P1 = nm[0], P2 = nm[1], P3 = nm[2], P4 = nm[3];
  var ans = 180 - p;
  function deg(v) { return "\\(" + v + "^{\\circ}\\)"; }
  var prompt = "Points " + P1 + ", " + P2 + ", " + P3 + " and " + P4 + " lie on a circle with centre O. Point " + P3 + " is on the major arc " + P1 + P2 + " and the inscribed angle " + P1 + P3 + P2 + " measures " + deg(p) + ". Point " + P4 + " is on the minor arc " + P1 + P2 + ". What is the measure of the inscribed angle " + P1 + P4 + P2 + "?";
  var sol = "The minor arc is fixed by the central angle first, and the angle on the minor arc uses the reflex central angle: \\[ \\begin{aligned} \\text{minor central angle} &= 2 \\times " + p + "^{\\circ} = " + (2 * p) + "^{\\circ} \\\\ \\text{reflex central angle} &= 360^{\\circ} - " + (2 * p) + "^{\\circ} = " + (360 - 2 * p) + "^{\\circ} \\\\ \\angle " + P1 + P4 + P2 + " &= " + (360 - 2 * p) + "^{\\circ} \\div 2 = " + ans + "^{\\circ} \\end{aligned} \\] The answer is <b>" + deg(ans) + "</b>.";
  var q = mcq(prompt,
    { t: deg(ans), fb: "Correct: the reflex central angle is halved, which takes both the doubling step and the reflex step." },
    [{ t: deg(2 * p), fb: "That is the minor central angle on its own; the inscribed angle still has to be taken from the reflex angle on the other arc." },
     { t: deg(p), fb: "That repeats the given angle, but the asked point sits on the opposite arc, so its angle is not the same." },
     { t: deg(360 - 2 * p), fb: "That is the reflex central angle itself; an inscribed angle is half of its central angle, so one more halving is needed." }],
    sol, { mode: "gap-two-theorems", p: p });
  var pts = {};
  var A = u8P(270 - p), B = u8P(270 + p), C3 = u8P(90), D4 = u8P(270);
  pts[P1] = A; pts[P2] = B; pts[P3] = C3; pts[P4] = D4;
  q.figure = u8Fig({ pts: pts, segs: [[P3, P1], [P3, P2], [P4, P1], [P4, P2]], angles: [{ v: P3, a1: u8Dir(C3, A), a2: u8Dir(C3, B), r: 0.3, lr: 0.55, label: fmt(p) + "°" }, { v: P4, a1: u8Dir(D4, A), a2: u8Dir(D4, B), r: 0.3, lr: 0.55, label: "?" }] });
  return q;
}, ["The point sits on the opposite arc, so the reflex central angle is the one that belongs to it.", "Double the given inscribed angle to get the minor central angle as the first step."]);

/* Unit 9: Probability and Statistics */

// PG. L2, 11.9, CR 2: mean from a frequency table (sum of fx, then divide).
E("u9-gap-freq-mean-cr", 9, ["11.9"], 2, "gen", function () {
  var f1 = ri(2, 9), f2 = ri(2, 9), f3 = ri(2, 9), f4 = ri(2, 9);
  var S = 1 * f1 + 2 * f2 + 3 * f3 + 4 * f4, N = f1 + f2 + f3 + f4;
  var ans = Math.round(S / N * 100) / 100;
  var prompt = "A class records how many books each student read in a month. The results are: 1 book for " + f1 + " students, 2 books for " + f2 + " students, 3 books for " + f3 + " students, and 4 books for " + f4 + " students. Find the mean number of books read, to two decimal places.";
  var sol = "Multiply each value by its frequency and add first, then divide by the total number of students: \\[ \\begin{aligned} \\text{total books} &= 1(" + f1 + ") + 2(" + f2 + ") + 3(" + f3 + ") + 4(" + f4 + ") = " + S + " \\\\ \\text{mean} &= \\frac{" + S + "}{" + N + "} = " + fmt(ans) + " \\end{aligned} \\] The answer is <b>" + fmt(ans) + "</b>.";
  return numq(prompt, ans, 0.02, sol, { mode: "gap-freq-mean", S: S, N: N });
}, ["A frequency table mean weights each value by how often it occurs.", "Multiply each book count by its number of students as the first step."]);

// PG. L2, 12.4, CR 2: expected frequency from a probability over N trials.
E("u9-gap-expected-freq-cr", 9, ["12.4"], 2, "gen", function () {
  var b = pick([4, 5, 6, 8, 10]);
  var a = ri(1, b - 1);
  var mult = ri(12, 30);
  var N = b * mult, ans = a * mult;
  var prompt = "A spinner is divided into " + b + " equal sectors, and " + a + " of the sectors are red. The spinner is spun " + N + " times. How many of the spins are expected to land on red?";
  var sol = "The probability of red gives the expected share of the spins: \\[ \\begin{aligned} P(\\text{red}) &= \\frac{" + a + "}{" + b + "} \\\\ \\text{expected red} &= \\frac{" + a + "}{" + b + "} \\times " + N + " = " + ans + " \\end{aligned} \\] The answer is <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-expected-freq", a: a, b: b, N: N });
}, ["An expected count is the probability applied to the whole set of trials.", "Write the probability of red as a fraction as the first step."]);

// PG. L2, 12.2, CR 3: probability of at least one success via the complement, as a percent.
E("u9-gap-complement-pct-cr", 9, ["12.2"], 2, "gen", function () {
  var p = pick([10, 20, 30, 40, 50, 60, 70, 80, 90]);
  var trials = pick([2, 3]);
  var ctx = pick([
    { subj: "A free-throw shooter", verb: "scores" },
    { subj: "An archer", verb: "hits the target" },
    { subj: "A soccer player", verb: "scores" }
  ]);
  var fail = 100 - p;
  var bothFail = Math.round(Math.pow(fail, trials) / Math.pow(100, trials - 1) * 100) / 100;
  var ans = Math.round((100 - bothFail) * 100) / 100;
  var chain = [];
  for (var i = 0; i < trials; i++) chain.push(fail + "\\%");
  var prompt = ctx.subj + " " + ctx.verb + " on " + p + "% of attempts, and the attempts are independent. The attempts number " + trials + " in a row. Find the probability, as a percent, that the attempts include at least one success.";
  var named = ctx.subj === "An archer" ? "the archer" : (ctx.subj === "A soccer player" ? "the player" : "the shooter");
  prompt = ctx.subj + " " + ctx.verb + " on " + p + "% of attempts, and the attempts are independent. In a set of " + trials + " attempts, find the probability, as a percent, that " + named + " succeeds at least once.";
  var sol = "Work through the complement first: the only way to succeed zero times is to fail every attempt: \\[ \\begin{aligned} P(\\text{fail}) &= 100\\% - " + p + "\\% = " + fail + "\\% \\\\ P(\\text{fail all}) &= " + chain.join(" \\times ") + " = " + fmt(bothFail) + "\\% \\\\ P(\\text{at least once}) &= 100\\% - " + fmt(bothFail) + "\\% = " + fmt(ans) + "\\% \\end{aligned} \\] The answer is <b>" + fmt(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-complement-pct", p: p, trials: trials });
}, ["At least once is everything except the single case where it never happens.", "Find the probability of one failure as the first step."]);

// PG. L2, 11.9, CR 3: difference of the means of two small data sets.
E("u9-gap-mean-diff-cr", 9, ["11.9"], 2, "gen", function () {
  function makeSet() {
    var v = [ri(2, 20), ri(2, 20), ri(2, 20), ri(2, 20)];
    return { v: v, s: v[0] + v[1] + v[2] + v[3] };
  }
  var A = makeSet(), B = makeSet(), guard = 0;
  while (A.s === B.s && guard < 60) { B = makeSet(); guard++; }
  var mA = A.s / 4, mB = B.s / 4;
  var ans = Math.round(Math.abs(mA - mB) * 100) / 100;
  var prompt = "Team A scores " + A.v.join(", ") + " points in four games. Team B scores " + B.v.join(", ") + " points in four games. Find the difference between the mean score of Team A and the mean score of Team B.";
  var sol = "Find each team's mean first, then take the difference: \\[ \\begin{aligned} \\text{mean A} &= \\frac{" + A.s + "}{4} = " + fmt(mA) + " \\\\ \\text{mean B} &= \\frac{" + B.s + "}{4} = " + fmt(mB) + " \\\\ \\text{difference} &= " + fmt(ans) + " \\end{aligned} \\] The answer is <b>" + fmt(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-mean-diff", mA: mA, mB: mB });
}, ["Two means must be worked out separately before they can be compared.", "Add Team A's four scores as the first step."]);

// PG. L2, 11.6, CR 3: sample count scaled to a population, then the excess over a threshold.
E("u9-gap-sample-scale-cr", 9, ["11.6"], 2, "gen", function () {
  var ns = pick([40, 50, 60, 80, 100]);
  var c = ri(6, Math.floor(ns * 0.7));
  var k = ri(6, 15);
  var pop = ns * k, pred = c * k;
  var T = Math.max(10, (Math.floor(pred / 10) - ri(0, 3)) * 10);
  if (T >= pred) T = pred - 10;
  var ans = pred - T;
  var prompt = "A survey of " + ns + " students finds that " + c + " of them walk to school. The whole school has " + fmt(pop) + " students. Predict how many students in the whole school walk to school, and find how many more that prediction is than " + fmt(T) + " students. Give the excess as your answer.";
  var sol = "Scale the sample count up to the population first: \\[ \\begin{aligned} \\text{scale} &= " + fmt(pop) + " \\div " + ns + " = " + k + " \\\\ \\text{prediction} &= " + c + " \\times " + k + " = " + pred + " \\\\ \\text{excess} &= " + pred + " - " + fmt(T) + " = " + ans + " \\end{aligned} \\] The answer is <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-sample-scale", pred: pred, T: T });
}, ["The sample result must be scaled to the full population before any comparison is made.", "Divide the population by the sample size to get the scale as the first step."]);

// PG. L2, 12.4, CR 3: expected wins from a probability over many plays, then the total points.
E("u9-gap-win-points-cr", 9, ["12.4"], 2, "gen", function () {
  var b = pick([4, 5, 6, 8]);
  var a = ri(1, b - 1);
  var N = b * ri(15, 40);
  var w = ri(2, 6);
  var wins = a * (N / b), ans = wins * w;
  var prompt = "A carnival game is won with probability \\(" + FR(a, b) + "\\). A player plays the game " + N + " times, and each win scores " + w + " points. How many points is the player expected to score in total?";
  var sol = "Find the expected number of wins first, then multiply by the points for each win: \\[ \\begin{aligned} \\text{expected wins} &= " + FR(a, b) + " \\times " + N + " = " + wins + " \\\\ \\text{expected points} &= " + wins + " \\times " + w + " = " + ans + " \\end{aligned} \\] The answer is <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-win-points", wins: wins, w: w });
}, ["Points come from wins, so the expected win count must be found before points can be totalled.", "Multiply the probability by the number of plays as the first step."]);

// PG. L2, 11.9, SR: frequency-table mean with forgot-to-divide and wrong-divisor distractors.
E("u9-gap-freq-mean-mc", 9, ["11.9"], 2, "gen", function () {
  var k = ri(1, 12);
  var v1 = k, v2 = k + 2, v3 = k + 4;
  var f1 = ri(2, 5), f2 = ri(2, 6), f3 = ri(2, 5);
  var S = f1 * v1 + f2 * v2 + f3 * v3, N = f1 + f2 + f3;
  var mean = Math.round(S / N * 100) / 100;
  var dWrongDiv = Math.round(S / 3 * 100) / 100;
  var dDouble = Math.round((S + f3 * v3) / N * 100) / 100;
  var prompt = "A survey records the number of pets per household. The table shows: " + v1 + " pet for " + f1 + " households, " + v2 + " pets for " + f2 + " households, and " + v3 + " pets for " + f3 + " households. What is the mean number of pets per household?";
  var sol = "Multiply each value by its frequency, add, and divide by the total frequency: \\[ \\begin{aligned} \\text{mean} &= \\frac{" + f1 + "(" + v1 + ") + " + f2 + "(" + v2 + ") + " + f3 + "(" + v3 + ")}{" + N + "} = \\frac{" + S + "}{" + N + "} = " + fmt(mean) + " \\end{aligned} \\] The answer is <b>" + fmtF(mean, 2) + "</b>.";
  return mcq(prompt,
    { t: fmtF(mean, 2), fb: "Correct: the weighted total is divided by the total number of households." },
    [{ t: fmtF(S, 2), fb: "That is the weighted total on its own; it still has to be divided by the total number of households." },
     { t: fmtF(dWrongDiv, 2), fb: "That divides by the number of rows in the table; the divisor should be the total number of households." },
     { t: fmtF(dDouble, 2), fb: "That counts the last row of the table twice before dividing, which inflates the total." }],
    sol, { mode: "gap-freq-mean-mc", S: S, N: N });
}, ["A frequency table mean weights each value by how often it occurs, then divides by the total count.", "Multiply each pet count by its number of households as the first step."]);

/* Option 1 additions (November 15, 2026): two ordinary constructed
   response entries for Unit 9, authored under Jason's Option 1 ruling
   on the Math 8 prior knowledge tranche. Flagging the two expected
   count entries above (5 marks) took this unit's exam-eligible
   constructed response pool from 16 marks to 11 against the 14-mark
   unit test target; these two entries bring the pool to 17 marks.
   They are ordinary stock: no pk flags and no pk metadata, and they
   change no prior knowledge count. */

// PG. L2, 11.1, CR 3: name two influences in a flawed data collection and a fix for each.
E("u9-gap-fix-the-survey-cr", 9, ["11.1"], 2, "var", varset([
  function(){
    return textq("A student wants to learn whether students across her whole school support a longer lunch break. She asks only her friends at her own lunch table, and her question is: \"You think lunch should be longer so everyone can relax properly, don't you?\" (a) Identify TWO problems with this data collection. (b) For each problem, state one change that would fix it.",
      ["bias, because only her friends at one lunch table were asked, and use of language, because the question pushes students to agree"],
      "<b>Model answer:</b> The first problem is bias: only her friends at one lunch table are asked, and one group of friends cannot represent the whole school. The fix is to ask a random sample of students drawn from every grade. The second problem is use of language: the wording praises one answer and pushes students to agree before they think. The fix is a neutral question, such as: \"Should the lunch break be longer, shorter, or stay the same?\"<br><br><b>Marking points (3 marks):</b> 1 mark for bias, identified with its reason (the group asked does not represent the school). 1 mark for use of language, identified with its reason (the wording pushes one answer). 1 mark for fixes that address both problems (a representative sample, and neutral wording).",
      {mode:"fix-survey-lunch"});
  },
  function(){
    return textq("A town wants to learn whether its residents support building a new skate park. A survey is posted only on the skate park association's own page, and it asks: \"Don't you agree our town needs a modern skate park for its young people?\" (a) Identify TWO problems with this data collection. (b) For each problem, state one change that would fix it.",
      ["bias, because only people who follow the skate park page were asked, and use of language, because the question pushes residents to agree"],
      "<b>Model answer:</b> The first problem is bias: the survey reaches only people who follow the skate park association's page, and they already favour the park, so they cannot represent all residents. The fix is to survey a random sample of residents from across the town. The second problem is use of language: \"Don't you agree\" and the praise in the question push residents toward one answer. The fix is a neutral question, such as: \"Do you support, oppose, or have no opinion on building a new skate park?\"<br><br><b>Marking points (3 marks):</b> 1 mark for bias, identified with its reason (the group reached does not represent the town). 1 mark for use of language, identified with its reason (the wording pushes one answer). 1 mark for fixes that address both problems (a representative sample, and neutral wording).",
      {mode:"fix-survey-skatepark"});
  }
]), ["Two different influences are at work in each plan: look at who gets asked, and at how the question is worded.", "Name each influence and why it bends the results first; then match each fix to its own problem."]);

// PG. L2, 12.4, CR 3: classify theoretical, experimental and subjective evidence, then decide and justify.
E("u9-gap-decision-evidence-cr", 9, ["12.4"], 2, "var", varset([
  function(){
    return textq("An organizer must decide whether to move an outdoor concert indoors. She has three pieces of evidence: a weather model gives a 70% chance of rain by evening; at the last 10 outdoor concerts at this site, rain interrupted 3 of them; and she feels the clouds over the site are starting to clear. (a) Classify each piece of evidence as theoretical probability, experimental probability or subjective judgement. (b) State a decision, and justify it using at least two of the three pieces of evidence.",
      ["the weather model is theoretical probability, the past concerts are experimental probability, and her feeling about the clouds is subjective judgement"],
      "<b>Model answer:</b> The weather model's 70% chance is theoretical probability, because it comes from a model rather than from trials. The last 10 concerts are experimental probability, because they are results from trials that actually happened: rain interrupted 3 of 10, or 30%. Her feeling that the clouds are clearing is subjective judgement, because it rests on personal feel. A justified decision: move the concert indoors, because the model gives rain a 70% chance and the site's own record shows rain interrupting 3 of the last 10 concerts, even though the sky feels as if it is clearing. (Staying outdoors also earns the decision marks when it is justified from the evidence, for example by weighing the 30% interruption record and the clearing sky against the model.)<br><br><b>Marking points (3 marks):</b> 1 mark for all three classifications correct. 1 mark for a clear decision. 1 mark for a justification that uses at least two pieces of the evidence accurately.",
      {mode:"decision-concert"});
  },
  function(){
    return textq("A coach must decide whether her team should hold its practice outdoors. She has three pieces of evidence: a weather model gives a 20% chance of lightning during practice; in the team's last 20 practices, lightning stopped play once; and she judges that the sky to the west looks dark and threatening. (a) Classify each piece of evidence as theoretical probability, experimental probability or subjective judgement. (b) State a decision, and justify it using at least two of the three pieces of evidence.",
      ["the weather model is theoretical probability, the past practices are experimental probability, and her judgement of the sky is subjective judgement"],
      "<b>Model answer:</b> The weather model's 20% chance is theoretical probability, because it comes from a model rather than from trials. The last 20 practices are experimental probability, because they are results from trials that actually happened: lightning stopped play once in 20, or 5%. Her reading of the dark sky is subjective judgement, because it rests on personal feel. A justified decision: move practice indoors, because lightning is dangerous even at a 20% model chance, and the threatening sky backs the model up, even though the team's own record shows only one stoppage in 20 practices. (Staying outdoors also earns the decision marks when it is justified from the evidence, for example by weighing the low model chance and the 1 in 20 record, with a plan to stop if the sky worsens.)<br><br><b>Marking points (3 marks):</b> 1 mark for all three classifications correct. 1 mark for a clear decision. 1 mark for a justification that uses at least two pieces of the evidence accurately.",
      {mode:"decision-practice"});
  }
]), ["Sort the evidence into three kinds: a model estimate, results from trials that happened, and a personal feeling.", "Classify all three pieces first; then let the decision lean on at least two of them by name."]);


/* Prior knowledge flags (Nov 13, 2026): the entries named
   below assess Math 7 outcomes (the mean of a data set, Math 7 indicators 11.6 and 11.9), and nothing on this
   course's indicator list (Jason's assessed-target standard;
   see the prior knowledge audit and its re-test). The pkFlag
   property is set here in the bank module the way the enrich
   flags are set in Math 2201's bank-u7.js; assembly carries
   it into banks/math-9.js verbatim, and the shell's isPK
   reads it alongside PK-coded indicators. Flagged entries
   stay in practice pools by default and leave them only
   when a teacher turns prior knowledge off in Advanced
   tools. */
/* Follow-on (November 15, 2026, Math 8 tranche): the expected
   count pair below is flagged on the same standard. Both entries
   assess a single-event probability and an expected count,
   Mathematics 7 content (indicators 12.6 and 12.7); no indicator
   on this course's list names probability computation (12.1 to
   12.4 here are probability in society). The Math 8 spec
   (Math-8-PK-Tranche-Spec-2026-11-15.md, Section 3) records the
   item-by-item test for both courses' expected-count families. */
BANK.forEach(function(e){if(["u9-gap-freq-mean-cr","u9-gap-mean-diff-cr","u9-gap-freq-mean-mc","u9-gap-expected-freq-cr","u9-gap-win-points-cr"].indexOf(e.id)>=0)e.pkFlag=true;});

/* ----- bank-pk.js ----- */
/* Math 9 PK tranche (November 15, 2026). Prior knowledge check entries
   for all nine units, per Math-9-PK-Tranche-Spec-2026-11-15.md. Borrowed
   generators are verbatim copies from the Mathematics 8 and Mathematics 7
   banks (only the entry id, unit, host indicator tag and tranche metadata
   differ); the five repeated-multiplication entries in Unit 3 are authored
   against Mathematics 5 indicators MA5.5.19, MA5.5.16 and MA5.5.18. The
   feeder helper functions the borrowed generators call, and that neither
   the shell nor this bank defines, are ported verbatim below. */
function u2sg(n) { return n < 0 ? "(" + n + ")" : "" + n; }
function u2dist(ans, cands) {
  var out = [], used = {};
  used[fmt(ans)] = 1;
  cands.forEach(function (c) {
    if (out.length >= 3) return;
    var k = fmt(c.v);
    if (!used[k]) { used[k] = 1; out.push({ t: k, fb: c.fb }); }
  });
  var offs = [1, -1, 2, -2, 10, -10, 5, -5];
  var i = 0;
  while (out.length < 3 && i < offs.length) {
    var v = ans + offs[i]; i++;
    var k2 = fmt(v);
    if (!used[k2]) { used[k2] = 1; out.push({ t: k2, fb: "This comes from an arithmetic slip in the calculation." }); }
  }
  return out;
}
function u3disp(n, d) { var r = u3red(n, d); n = r[0]; d = r[1]; if (d === 1) return "\\(" + n + "\\)"; if (n < d) return "\\(" + FR(n, d) + "\\)"; var w = Math.floor(n / d), rem = n % d; if (rem === 0) return "\\(" + w + "\\)"; return "\\(" + w + FR(rem, d) + "\\)"; }
function u3gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
function u3red(n, d) { var g = u3gcd(n, d); return [n / g, d / g]; }
function u1d3(val,cands){var out=[];for(var i=0;i<cands.length;i++){var c=cands[i];if(c!==val&&c>0&&out.indexOf(c)<0){out.push(c);}if(out.length===3){break;}}return out;}
function u1gridSVG(s){
  var cell=(s>10)?14:22,pad=26,W=s*cell+2*pad,H=s*cell+2*pad+8,out="";
  out+='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Square region '+s+' units by '+s+' units">';
  out+='<rect x="'+pad+'" y="'+pad+'" width="'+(s*cell)+'" height="'+(s*cell)+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  for(var i=1;i<s;i++){out+='<line x1="'+(pad+i*cell)+'" y1="'+pad+'" x2="'+(pad+i*cell)+'" y2="'+(pad+s*cell)+'" stroke="'+FIG_INK+'" stroke-width="0.7"/>';out+='<line x1="'+pad+'" y1="'+(pad+i*cell)+'" x2="'+(pad+s*cell)+'" y2="'+(pad+i*cell)+'" stroke="'+FIG_INK+'" stroke-width="0.7"/>';}
  out+=_txt(pad+s*cell/2,pad-12,s+" units",12,true);
  out+=_txt(10,pad+s*cell/2,s+"",12,true);
  return out+'</svg>';
}
function u1nonSquare(lo,hi){var n=ri(lo,hi);var t=0;while(Math.floor(Math.sqrt(n))*Math.floor(Math.sqrt(n))===n&&t<80){n=ri(lo,hi);t++;}if(Math.floor(Math.sqrt(n))*Math.floor(Math.sqrt(n))===n){n=lo+1;while(Math.floor(Math.sqrt(n))*Math.floor(Math.sqrt(n))===n){n++;}}return n;}
function u1numLineSVG(lo,hi){
  var W=320,H=70,x0=35,x1=285,out="";
  function X(v){return x0+(v-lo)/(hi-lo)*(x1-x0);}
  out+='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from '+lo+' to '+hi+'">';
  out+='<line x1="'+x0+'" y1="38" x2="'+x1+'" y2="38" stroke="'+FIG_INK+'" stroke-width="2"/>';
  for(var v=lo;v<=hi;v++){out+='<line x1="'+X(v)+'" y1="32" x2="'+X(v)+'" y2="44" stroke="'+FIG_INK+'" stroke-width="1.6"/>';out+=_txt(X(v),58,String(v),12,false);}
  return out+'</svg>';
}
function u1r1(x){return Math.round(x*10)/10;}
function u4boxSVG(l,w,h){
  var s='<svg viewBox="0 0 300 190" xmlns="http://www.w3.org/2000/svg">';
  s+='<polygon points="70,75 120,37 230,37 180,75" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<polygon points="180,75 230,37 230,117 180,155" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<rect x="70" y="75" width="110" height="80" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="120" y1="37" x2="120" y2="117" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5 4"/>';
  s+=_txt(125,172,l+" cm",13,false);
  s+=_txt(56,115,h+" cm",13,false);
  s+=_txt(212,26,w+" cm",13,false);
  return s+"</svg>";
}
function u4triSVG(a,b,c,L){
  var s='<svg viewBox="0 0 310 190" xmlns="http://www.w3.org/2000/svg">';
  s+='<polygon points="150,120 240,120 150,40" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<polygon points="60,150 150,120 150,40 60,70" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<polygon points="60,150 150,150 60,70" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="150" y1="150" x2="150" y2="120" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5 4"/>';
  s+='<line x1="240" y1="120" x2="150" y2="150" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5 4"/>';
  s+=_txt(105,166,b+" cm",13,false);
  s+=_txt(44,110,a+" cm",13,false);
  s+=_txt(96,84,c+" cm",13,false);
  s+=_txt(198,32,L+" cm",13,false);
  return s+"</svg>";
}
function u4cylSVG(r,h,useD){
  var s='<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">';
  s+='<ellipse cx="150" cy="52" rx="56" ry="16" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<path d="M 94 52 L 94 148 A 56 16 0 0 0 206 148 L 206 52" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  if(useD){
    s+='<line x1="94" y1="52" x2="206" y2="52" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+=_txt(150,30,(2*r)+" cm",13,false);
  } else {
    s+='<line x1="150" y1="52" x2="206" y2="52" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+=_txt(178,40,r+" cm",13,false);
  }
  s+=_txt(224,104,h+" cm",13,false);
  return s+"</svg>";
}
function u4r1(x){return Math.round(x*10)/10;}
function u4r2(x){return Math.round(x*100)/100;}
function m8BoxLabSVG(labL,labW,labH,open){
  var s='<svg viewBox="0 0 300 190" width="300" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: a right rectangular prism">';
  s+='<polygon points="70,75 120,37 230,37 180,75" fill="'+(open?"none":FIG_SHADE)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<polygon points="180,75 230,37 230,117 180,155" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<rect x="70" y="75" width="110" height="80" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  if(!open){s+='<line x1="120" y1="37" x2="120" y2="117" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5 4"/>';}
  if(labL){s+=_txt(125,172,labL,13,false);}
  if(labH){s+=_txt(56,115,labH,13,false);}
  if(labW){s+=_txt(212,26,labW,13,false);}
  return s+'</svg>';
}
function u6sgn(v) { return v >= 0 ? " + " + fmt(v) : " - " + fmt(-v); }
function u6graphPts(o) {
  var W = 330, H = 290, x0 = 52, y0 = 238, x1 = 312, y1 = 26;
  var sx = (x1 - x0) / o.xmax, sy = (y0 - y1) / o.ymax;
  function X(v) { return fmt(x0 + v * sx, 1); }
  function Y(v) { return fmt(y0 - v * sy, 1); }
  var xs = o.xstep || 1, ys = o.ystep || (o.ymax <= 12 ? 1 : 2);
  var s = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Graph of a linear relation shown as separate points">';
  var g;
  for (g = xs; g < o.xmax; g += xs) s += '<line x1="' + X(g) + '" y1="' + y1 + '" x2="' + X(g) + '" y2="' + y0 + '" stroke="#dce8df" stroke-width="1"/>';
  for (g = ys; g < o.ymax; g += ys) s += '<line x1="' + x0 + '" y1="' + Y(g) + '" x2="' + x1 + '" y2="' + Y(g) + '" stroke="#dce8df" stroke-width="1"/>';
  (o.points || []).forEach(function (P) {
    s += '<circle cx="' + X(P[0]) + '" cy="' + Y(P[1]) + '" r="4" fill="' + FIG_ACC + '" stroke="' + FIG_INK + '" stroke-width="1"/>';
  });
  s += '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + x1 + '" y2="' + y0 + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  s += '<polygon points="' + x1 + ',' + y0 + ' ' + (x1 - 9) + ',' + (y0 - 4) + ' ' + (x1 - 9) + ',' + (y0 + 4) + '" fill="' + FIG_INK + '"/>';
  s += '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + x0 + '" y2="' + y1 + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  s += '<polygon points="' + x0 + ',' + y1 + ' ' + (x0 - 4) + ',' + (y1 + 9) + ' ' + (x0 + 4) + ',' + (y1 + 9) + '" fill="' + FIG_INK + '"/>';
  for (g = 0; g <= o.xmax; g += xs) s += '<line x1="' + X(g) + '" y1="' + y0 + '" x2="' + X(g) + '" y2="' + (y0 + 5) + '" stroke="' + FIG_INK + '" stroke-width="1.5"/><text x="' + X(g) + '" y="' + (y0 + 20) + '" font-size="12" fill="' + FIG_INK + '" text-anchor="middle">' + g + '</text>';
  for (g = ys; g <= o.ymax; g += ys) s += '<line x1="' + (x0 - 5) + '" y1="' + Y(g) + '" x2="' + x0 + '" y2="' + Y(g) + '" stroke="' + FIG_INK + '" stroke-width="1.5"/><text x="' + (x0 - 10) + '" y="' + Y(g) + '" font-size="12" fill="' + FIG_INK + '" text-anchor="end" dominant-baseline="central">' + g + '</text>';
  s += '<text x="' + x1 + '" y="' + (y0 + 38) + '" font-size="13" font-style="italic" fill="' + FIG_INK + '" text-anchor="end">' + (o.xlab || "x") + '</text>';
  s += '<text x="' + fmt(x0 - 4, 1) + '" y="' + (y1 - 10) + '" font-size="13" font-style="italic" fill="' + FIG_INK + '" text-anchor="middle">' + (o.ylab || "y") + '</text>';
  return s + '</svg>';
}
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
function u7red(n, d) { var g = u7gcd(n, d); return [n / g, d / g]; }
function u7frac(n, d) { var r = u7red(n, d); return "\\(" + FR(r[0], r[1]) + "\\)"; }
function u7gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
function u8T(x, y, str, size, bold, anchor) {
  return '<text x="' + fmt(x, 1) + '" y="' + fmt(y, 1) + '" font-size="' + (size || 12) + '" fill="' + FIG_INK + '" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="' + (anchor || "middle") + '" dominant-baseline="central"' + (bold ? ' font-weight="bold"' : "") + '>' + str + '</text>';
}
function u8Svg(W, H, body, aria) {
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + aria + '">' + body + '</svg>';
}
function u2Sg(n){ return n<0?"("+n+")":""+n; }
function u2Distr(ans,cands){
  var seen={},ds=[];
  cands.forEach(function(z){ if(z!==ans&&!seen[z]&&ds.length<3){ seen[z]=1; ds.push(z); } });
  var g=1; while(ds.length<3){ [ans+g,ans-g].forEach(function(z){ if(z!==ans&&!seen[z]&&ds.length<3){ seen[z]=1; ds.push(z); } }); g++; }
  return ds;
}
function u5lcm(a,b){return a*b/u5gcd(a,b);}
function u5red(n,d){var g=u5gcd(n,d);return [n/g,d/g];}
function u5disp(n,d){var r=u5red(n,d);n=r[0];d=r[1];if(d===1)return String(n);if(n>d){var w=Math.floor(n/d),rem=n%d;if(rem===0)return String(w);return w+"\\frac{"+rem+"}{"+d+"}";}return "\\frac{"+n+"}{"+d+"}";}
function u5M(n,d){return "\\("+u5disp(n,d)+"\\)";}
function u5fopts(corr,errs){
  var cr=u5red(corr[0],corr[1]);var seen={};seen[cr[0]+"/"+cr[1]]=1;var out=[];
  function tryAdd(p,fb){if(out.length>=3)return;if(!p||p[0]<=0||p[1]<=0)return;var r=u5red(p[0],p[1]);var k=r[0]+"/"+r[1];if(seen[k])return;seen[k]=1;out.push({t:u5M(r[0],r[1]),fb:fb});}
  errs.forEach(function(e){tryAdd(e.p,e.fb);});
  [[cr[0]+1,cr[1]],[cr[0],cr[1]+1],[cr[0]+1,cr[1]+1],[cr[0]+2,cr[1]],[cr[0],cr[1]+2],[cr[0]+3,cr[1]+1]].forEach(function(p){tryAdd(p,"That value does not match the result you get from the steps in a correct solution.");});
  return out;
}
function u3simp(n,d){var g=u3gcd(n,d);return [n/g,d/g];}
function u3fr(n,d){var s=u3simp(n,d);return "\\("+FR(s[0],s[1])+"\\)";}
function precPair(keyT, ds){
  function parse(s){ var m=String(s).match(/^(\$?)(-?\d+)(?:\.(\d+))?(%?)$/); if(!m) return null; return {pre:m[1], intp:m[2], frac:m[3]||"", suf:m[4], dp:(m[3]||"").length}; }
  var k=parse(keyT); if(!k) return ds;
  var ps=ds.map(function(o){ return parse(o.t); });
  if(ps.some(function(p){ return !p; })) return ds;
  var M=k.dp; ps.forEach(function(p){ if(p.dp>M) M=p.dp; });
  function render(p,target){
    var core;
    if(target===0) core=p.intp;
    else if(p.dp>=target) core=p.intp+"."+p.frac;
    else if(p.dp===0) core=p.intp+"."+("000000".slice(0,target));
    else core=p.intp+"."+p.frac+("000000".slice(0,target-p.dp));
    return p.pre+core+p.suf;
  }
  var targets=new Array(ps.length), found=null;
  function countsOk(arr){ var c={}, i; c[k.dp]=1; for(i=0;i<arr.length;i++) c[arr[i]]=(c[arr[i]]||0)+1; for(var v in c){ if(c[v]===1) return false; } return true; }
  function search(i){ if(found) return; if(i===ps.length){ if(countsOk(targets)) found=targets.slice(); return; } for(var t=ps[i].dp;t<=M;t++){ targets[i]=t; search(i+1); if(found) return; } }
  search(0);
  if(!found) return ds;
  return ds.map(function(o,i){ var nt=render(ps[i],found[i]); if(nt===o.t) return o; var n2={}; for(var kk in o) n2[kk]=o[kk]; n2.t=nt; return n2; });
}
function u1Expr(a,b,v){ v=v||"n"; var s=(a===1?v:a+v); if(b>0)s+=" + "+b; else if(b<0)s+=" - "+(-b); return s; }
function u8pair(x,y){return "("+x+", "+y+")";}
function u8moveText(dx,dy){var parts=[];if(dx!==0)parts.push(Math.abs(dx)+(Math.abs(dx)===1?" unit ":" units ")+(dx>0?"right":"left"));if(dy!==0)parts.push(Math.abs(dy)+(Math.abs(dy)===1?" unit ":" units ")+(dy>0?"up":"down"));return parts.join(" and ");}
function u8gridSVG(points,polys,segs){
  var W=280,H=280,c=140,st=20;
  function X(x){return c+x*st;}function Y(y){return c-y*st;}
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cartesian plane grid">';
  for(var g=-6;g<=6;g++){if(g===0)continue;out+='<line x1="'+X(g)+'" y1="8" x2="'+X(g)+'" y2="272" stroke="'+FIG_SHADE+'" stroke-width="1"/>';out+='<line x1="8" y1="'+Y(g)+'" x2="272" y2="'+Y(g)+'" stroke="'+FIG_SHADE+'" stroke-width="1"/>';}
  out+='<line x1="8" y1="140" x2="272" y2="140" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  out+='<line x1="140" y1="8" x2="140" y2="272" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  out+='<polygon points="272,140 264,135 264,145" fill="'+FIG_INK+'"/><polygon points="140,8 135,16 145,16" fill="'+FIG_INK+'"/>';
  out+=_txt(266,126,"x",13,true)+_txt(152,20,"y",13,true);
  if(segs)segs.forEach(function(s){out+='<line x1="'+X(s[0])+'" y1="'+Y(s[1])+'" x2="'+X(s[2])+'" y2="'+Y(s[3])+'" stroke="'+FIG_INK+'" stroke-width="2"'+(s[4]?' stroke-dasharray="5 4"':"")+'/>';});
  if(polys)polys.forEach(function(p){out+='<polygon points="'+p.map(function(q){return fmt(X(q[0]),1)+","+fmt(Y(q[1]),1);}).join(" ")+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';});
  if(points)points.forEach(function(p){out+='<circle cx="'+X(p.x)+'" cy="'+Y(p.y)+'" r="3.4" fill="'+FIG_INK+'"/>';if(p.label)out+=_txt(X(p.x)+11,Y(p.y)-10,p.label,13,true);});
  return out+'</svg>';
}
function figWideGrid(points,polys,segs){
  var m=6;
  function scan(x,y){var a=Math.max(Math.abs(x),Math.abs(y));if(a>m)m=a;}
  if(points)points.forEach(function(p){scan(p.x,p.y);});
  if(polys)polys.forEach(function(pl){pl.forEach(function(q){scan(q[0],q[1]);});});
  if(segs)segs.forEach(function(s){scan(s[0],s[1]);scan(s[2],s[3]);});
  var E=Math.ceil(m), W=280, c=140, st=126/E;
  function X(x){return c+x*st;} function Y(y){return c-y*st;}
  var out='<svg viewBox="0 0 '+W+' '+W+'" width="'+W+'" height="'+W+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cartesian plane grid">';
  for(var g=-E;g<=E;g++){if(g===0)continue;out+='<line x1="'+fmt(X(g),1)+'" y1="8" x2="'+fmt(X(g),1)+'" y2="272" stroke="'+FIG_SHADE+'" stroke-width="1"/>';out+='<line x1="8" y1="'+fmt(Y(g),1)+'" x2="272" y2="'+fmt(Y(g),1)+'" stroke="'+FIG_SHADE+'" stroke-width="1"/>';}
  out+='<line x1="8" y1="140" x2="272" y2="140" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  out+='<line x1="140" y1="8" x2="140" y2="272" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  out+=_txt(266,126,"x",13,true)+_txt(152,20,"y",13,true);
  if(segs)segs.forEach(function(s){out+='<line x1="'+fmt(X(s[0]),1)+'" y1="'+fmt(Y(s[1]),1)+'" x2="'+fmt(X(s[2]),1)+'" y2="'+fmt(Y(s[3]),1)+'" stroke="'+FIG_INK+'" stroke-width="2"'+(s[4]?' stroke-dasharray="5 4"':"")+'/>';});
  if(polys)polys.forEach(function(p){out+='<polygon points="'+p.map(function(q){return fmt(X(q[0]),1)+","+fmt(Y(q[1]),1);}).join(" ")+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';});
  if(points)points.forEach(function(p){out+='<circle cx="'+fmt(X(p.x),1)+'" cy="'+fmt(Y(p.y),1)+'" r="3.4" fill="'+FIG_INK+'"/>';if(p.label)out+=_txt(X(p.x)+11,Y(p.y)-10,p.label,13,true);});
  return out+'</svg>';
}
function u8segFigure(segs,jx,jy){
  var W=300,H=230;
  function X(x){return 150+(x+jx)*26;}function Y(y){return 115-(y+jy)*26;}
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Line segments diagram">';
  segs.forEach(function(s){out+='<line x1="'+fmt(X(s.x1),1)+'" y1="'+fmt(Y(s.y1),1)+'" x2="'+fmt(X(s.x2),1)+'" y2="'+fmt(Y(s.y2),1)+'" stroke="'+FIG_INK+'" stroke-width="2.2"/>';
    out+=_txt(X(s.x1)-10,Y(s.y1)-8,s.l1,14,true);out+=_txt(X(s.x2)+10,Y(s.y2)-8,s.l2,14,true);});
  return out+'</svg>';
}
function u4pieFig(cats, angleLabels){
  var cx=92, cy=92, R=68;
  var fills=[FIG_SHADE,"#ffffff","#8fb8a0","#e6ddcb"];
  var out='<svg viewBox="0 0 330 190" width="330" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Circle graph">';
  var start=0, letters=["A","B","C","D"];
  cats.forEach(function(c,i){
    var sweep=c.pct*3.6, end=start+sweep;
    var p1=u4pt(cx,cy,R,start), p2=u4pt(cx,cy,R,end);
    var large=sweep>180?1:0;
    out+='<path d="M '+cx+' '+cy+' L '+fmt(p1[0],1)+' '+fmt(p1[1],1)+' A '+R+' '+R+' 0 '+large+' 1 '+fmt(p2[0],1)+' '+fmt(p2[1],1)+' Z" fill="'+fills[i%4]+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    var mid=u4pt(cx,cy,42,(start+end)/2);
    out+=_txt(mid[0],mid[1],angleLabels?String(c.ang)+"°":letters[i],13,true);
    start=end;
  });
  if(!angleLabels){
    cats.forEach(function(c,i){
      var y=42+i*34;
      out+='<rect x="196" y="'+(y-9)+'" width="12" height="12" fill="'+fills[i%4]+'" stroke="'+FIG_INK+'" stroke-width="1.2"/>';
      out+='<text x="214" y="'+(y+1)+'" font-size="12.5" fill="'+FIG_INK+'">'+letters[i]+" = "+c.name+" "+c.pct+"%</text>";
    });
  }
  return out+'</svg>';
}
function u4circleFig(label, mode){
  var out='<svg viewBox="0 0 240 190" width="240" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Circle diagram">';
  out+='<circle cx="120" cy="88" r="66" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<circle cx="120" cy="88" r="2.6" fill="'+FIG_INK+'"/>';
  if(mode==="r"){
    out+='<line x1="120" y1="88" x2="186" y2="88" stroke="'+FIG_ACC+'" stroke-width="2"/>';
    out+=_txt(153,74,label,12.5,false);
  } else {
    out+='<line x1="54" y1="88" x2="186" y2="88" stroke="'+FIG_ACC+'" stroke-width="2"/>';
    out+=_txt(120,74,label,12.5,false);
  }
  return out+'</svg>';
}
function u4pt(cx,cy,r,deg){var t=deg*Math.PI/180;return [cx+r*Math.sin(t), cy-r*Math.cos(t)];}
function u7mean(a){var s=0;for(var i=0;i<a.length;i++)s+=a[i];return s/a.length;}
function u7median(a){var s=a.slice().sort(function(x,y){return x-y;});var m=Math.floor(s.length/2);return s.length%2?s[m]:(s[m-1]+s[m])/2;}
function u7numOpts(correct,cands){var out=[],seen={};seen[String(correct)]=1;for(var i=0;i<cands.length;i++){var v=cands[i];if(v===null||v===undefined)continue;var k=String(v);if(!seen[k]){seen[k]=1;out.push(v);if(out.length===3)break;}}var step=1;while(out.length<3){var v=correct+step;if(!seen[String(v)]){seen[String(v)]=1;out.push(v);}step++;}return out;}
function u7pieSVG(parts){
  var cx=110,cy=100,R=78,out='<svg viewBox="0 0 330 210" width="330" height="210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Circle graph">';
  var ang=-90;
  for(var i=0;i<parts.length;i++){var sweep=parts[i].pct*3.6;var a1=ang*Math.PI/180,a2=(ang+sweep)*Math.PI/180;
    var x1=cx+R*Math.cos(a1),y1=cy+R*Math.sin(a1),x2=cx+R*Math.cos(a2),y2=cy+R*Math.sin(a2);
    var large=sweep>180?1:0;
    var fill=i%2?FIG_SHADE:"#ffffff";
    out+='<path d="M '+cx+' '+cy+' L '+fmt(x1,1)+' '+fmt(y1,1)+' A '+R+' '+R+' 0 '+large+' 1 '+fmt(x2,1)+' '+fmt(y2,1)+' Z" fill="'+fill+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
    var mid=(ang+sweep/2)*Math.PI/180;
    out+=_txt(cx+(R-24)*Math.cos(mid),cy+(R-24)*Math.sin(mid),parts[i].pct+"%",12,true);
    out+=_txt(215,52+i*30,parts[i].label+" "+parts[i].pct+"%",12,false,"start");
    ang+=sweep;
  }
  return out+'</svg>';
}
function u7fracStr(n,d){if(d<0){n=-n;d=-d;}var g=u7gcd(n,d);n/=g;d/=g;if(d===1)return String(n);return n+"/"+d;}
E("u1-pk-ooo-evaluate", 1, ["6.2"], 2, "gen", function () {
  var R = null;
  for (var tries = 0; tries < 300 && !R; tries++) {
    var tmpl = ri(0, 2), expr, val, steps, errs;
    if (tmpl === 0) {
      var a = ri(-9, 9), b = 0, c = 0;
      while (b === 0) b = ri(-8, 8);
      while (c === 0) c = ri(-6, 6);
      if (a === 0) continue;
      val = a + b * c;
      expr = "\\(" + a + " + " + u2sg(b) + " \\times " + u2sg(c) + "\\)";
      steps = "\\[ \\begin{aligned} " + a + " + " + u2sg(b) + " \\times " + u2sg(c) + " &= " + a + " + " + (b * c) + " \\\\ &= " + val + " \\end{aligned} \\]";
      errs = [
        { v: (a + b) * c, fb: "This adds first, but multiplication is done before addition." },
        { v: a - b * c, fb: "This changes the addition into a subtraction." },
        { v: a + b + c, fb: "This changes the multiplication into an addition." }
      ];
    } else if (tmpl === 1) {
      var a1 = ri(-9, 12), b1 = ri(-9, 9), c1 = 0;
      while (c1 === 0 || Math.abs(c1) < 2) c1 = ri(-6, 6);
      val = (a1 - b1) * c1;
      expr = "\\((" + a1 + " - " + u2sg(b1) + ") \\times " + u2sg(c1) + "\\)";
      steps = "\\[ \\begin{aligned} (" + a1 + " - " + u2sg(b1) + ") \\times " + u2sg(c1) + " &= " + (a1 - b1) + " \\times " + u2sg(c1) + " \\\\ &= " + val + " \\end{aligned} \\]";
      errs = [
        { v: a1 - b1 * c1, fb: "This multiplies before doing the brackets, but brackets come first." },
        { v: (a1 + b1) * c1, fb: "This adds inside the brackets where the expression says to subtract." },
        { v: a1 - b1 - c1, fb: "This changes the multiplication into a subtraction." }
      ];
    } else {
      var d2 = pick([2, 3, 4, 5, 6]) * (Math.random() < 0.5 ? -1 : 1);
      var q2 = ri(2, 8) * (Math.random() < 0.5 ? -1 : 1);
      var c2 = d2 * q2;
      var a2 = 0, b2 = 0;
      while (a2 === 0) a2 = ri(-8, 8);
      while (b2 === 0) b2 = ri(-8, 8);
      val = a2 * b2 - q2;
      expr = "\\(" + u2sg(a2) + " \\times " + u2sg(b2) + " - " + c2 + " \\div " + u2sg(d2) + "\\)";
      steps = "\\[ \\begin{aligned} " + u2sg(a2) + " \\times " + u2sg(b2) + " - " + c2 + " \\div " + u2sg(d2) + " &= " + (a2 * b2) + " - " + q2 + " \\\\ &= " + val + " \\end{aligned} \\]";
      errs = [
        { v: a2 * (b2 - q2), fb: "This groups the subtraction with the product, which changes the order." },
        { v: a2 * b2 + q2, fb: "This adds the quotient instead of subtracting it." },
        { v: (a2 * b2 - c2) * d2, fb: "This multiplies by the divisor at the end instead of dividing earlier." }
      ];
    }
    var keys = [val].concat(errs.map(function (e) { return e.v; })).map(fmt);
    if (new Set(keys).size < 4) continue;
    R = { expr: expr, val: val, steps: steps, errs: errs, tmpl: tmpl };
  }
  if (!R) {
    R = { expr: "\\(3 + (-4) \\times 5\\)", val: -17, steps: "\\[ \\begin{aligned} 3 + (-4) \\times 5 &= 3 - 20 \\\\ &= -17 \\end{aligned} \\]", errs: [{ v: -5, fb: "This adds first, but multiplication is done before addition." }, { v: 23, fb: "This changes the addition into a subtraction." }, { v: 4, fb: "This changes the multiplication into an addition." }], tmpl: 0 };
  }
  var prompt = "Evaluate: " + R.expr;
  var solution = "Follow the order of operations, brackets first, then multiplication and division, then addition and subtraction: " + R.steps + " So the value is <b>" + R.val + "</b>.";
  return mcq(prompt,
    { t: fmt(R.val), fb: "Correct. The operations were done in the proper order." },
    R.errs.map(function (e) { return { t: fmt(e.v), fb: e.fb }; }),
    solution, { mode: "ooo-mc-" + R.tmpl, val: R.val });
}, ["Do brackets first, then multiplication and division, then addition and subtraction.", "Rewrite the expression after each single step so the order stays clear."]);
E("u1-pk-identify-operation", 1, ["6.1"], 1, "gen", function () {
  if (Math.random() < 0.5) {
    var r = ri(2, 8), h = ri(3, 9);
    var prompt = "Each hour, the water level in a harbour tank falls " + r + " cm. Which expression gives the total change in the water level after " + h + " hours?";
    var solution = "The same change repeats " + h + " times, so the operation is multiplication by a negative change: \\[ \\begin{aligned} (-" + r + ") \\times " + h + " &= " + (-r * h) + " \\end{aligned} \\] So the expression is <b>\\((-" + r + ") \\times " + h + "\\)</b>.";
    return mcq(prompt,
      { t: "\\((-" + r + ") \\times " + h + "\\)", fb: "Correct. A repeated negative change is a multiplication." },
      [
        { t: "\\((-" + r + ") + " + h + "\\)", fb: "That adds the two numbers once instead of repeating the change." },
        { t: "\\((-" + r + ") \\div " + h + "\\)", fb: "Division splits a total into parts; here a change is being repeated." },
        { t: "\\(" + h + " - " + r + "\\)", fb: "That subtracts one amount from the other instead of repeating the change." }
      ],
      solution, { mode: "identify-mult", r: r, h: h });
  }
  var per = ri(2, 9), n = ri(3, 8), total = per * n;
  var prompt2 = "A group of friends shares a ferry fare debt of $" + total + " equally, recorded as \\(-" + total + "\\) dollars split among " + n + " friends. Which expression gives the amount each friend owes?";
  var solution2 = "A total split equally among " + n + " friends is division: \\[ \\begin{aligned} (-" + total + ") \\div " + n + " &= " + (-per) + " \\end{aligned} \\] So the expression is <b>\\((-" + total + ") \\div " + n + "\\)</b>.";
  return mcq(prompt2,
    { t: "\\((-" + total + ") \\div " + n + "\\)", fb: "Correct. Sharing a total equally is division." },
    [
      { t: "\\((-" + total + ") \\times " + n + "\\)", fb: "That repeats the whole debt " + n + " times instead of splitting it." },
      { t: "\\((-" + total + ") + " + n + "\\)", fb: "That adds to the debt instead of splitting it into equal shares." },
      { t: "\\(" + n + " - " + total + "\\)", fb: "That subtracts the debt from the count of friends, which mixes unlike quantities." }
    ],
    solution2, { mode: "identify-div", per: per, n: n });
}, ["Ask whether the change repeats, or a total is split into equal parts.", "Repeated change means multiply; equal sharing means divide."]);
E("u1-pk-add-context", 1, ["6.1"], 1, "gen", function(){
  var T=pick([
    {pre:"At dawn the temperature is ", mid:" degrees. By noon it ", ch:["rises by ","drops by "], post:" degrees. What is the temperature at noon?", unit:" degrees"},
    {pre:"A diver is ", mid:" m relative to the surface (below is negative). The diver then ", ch:["swims up ","sinks "], post:" m. What is the diver's new position, in metres?", unit:" m"},
    {pre:"A team's score is ", mid:" points. On the next play the team ", ch:["gains ","loses "], post:" points. What is the team's score now?", unit:" points"},
    {pre:"An account balance is $", mid:". A payment of $", ch:null, post:" is made (a payment lowers the balance). What is the new balance, in dollars?", unit:""}]);
  var a=ri(-18,18), mag=ri(3,16);
  if(T.pre.indexOf("diver")>=0&&a>0)a=-a;
  if(T.ch){
    var up=pick([true,false]); var b=up?mag:-mag;
    var ans=a+b;
    var ds=u2Distr(ans,[a-b, -ans, a+ (up?-mag:mag)]);
    return mcq(T.pre+"\\("+a+"\\)"+T.mid+(up?T.ch[0]:T.ch[1])+"\\("+mag+"\\)"+T.post,
      {t:String(ans), fb:"Correct: "+(up?"a rise adds "+mag:"a drop adds -"+mag)+", giving "+a+" + "+u2Sg(b)+" = "+ans+"."},
      ds.map(function(z){return {t:String(z), fb:"That treats the change with the wrong sign. A "+(up?"rise is positive":"drop is negative")+"."};}),
      "Write the change as a signed integer: \\("+a+" + "+u2Sg(b)+" = "+ans+"\\). The answer is <b>"+ans+T.unit+"</b>.",
      {a:a,b:b});
  }
  var ans2=a-mag;
  var ds2=u2Distr(ans2,[a+mag, -ans2, a]);
  return mcq(T.pre+"\\("+a+"\\)"+T.mid+"\\("+mag+"\\)"+T.post,
    {t:String(ans2), fb:"Correct: a payment subtracts "+mag+" from the balance."},
    ds2.map(function(z){return {t:String(z), fb:"A payment lowers the balance, so the "+mag+" is subtracted, not added."};}),
    "\\[ \\begin{aligned} \\text{new balance} &= "+a+" - "+mag+" \\\\ &= "+ans2+" \\end{aligned} \\] The answer is <b>$"+ans2+"</b>.",
    {a:a,b:-mag});
}, ["Turn words like rises, drops, gains and loses into signed numbers first.", "Start by writing the starting value and the signed change as an addition."]);
E("u1-pk-add-unlike", 1, ["6.1"], 2, "gen", function(){
  var d1=2,d2=3,a=1,c=1,cnt=0,L=6;
  while(cnt<60){d1=pick([2,3,4,5,6,8,9,10,12]);d2=pick([2,3,4,5,6,8,9,10,12]);if(d1===d2){cnt++;continue;}L=u5lcm(d1,d2);if(L>36){cnt++;continue;}a=ri(1,d1-1);c=ri(1,d2-1);break;}
  if(cnt>=60){d1=4;d2=3;a=1;c=1;L=12;}
  var m1=L/d1,m2=L/d2;var N=a*m1+c*m2;
  var ctx=pick(["pure","punch","walk"]);
  var prompt;
  if(ctx==="punch")prompt="A jug holds "+u5M(a,d1)+" of a litre of juice. Another "+u5M(c,d2)+" of a litre is poured in. How much juice is in the jug now, in litres?";
  else if(ctx==="walk")prompt="Sam walks "+u5M(a,d1)+" of a kilometre before lunch and "+u5M(c,d2)+" of a kilometre after lunch. How far does Sam walk in all, in kilometres?";
  else prompt="What is "+u5M(a,d1)+" + "+u5M(c,d2)+"?";
  var sol="Use the common denominator "+L+".\\[ \\begin{aligned} "+FR(a,d1)+" + "+FR(c,d2)+" &= "+FR(a*m1,L)+" + "+FR(c*m2,L)+" \\\\ &= "+FR(N,L);
  var rr=u5red(N,L);if(rr[0]!==N||rr[1]!==L)sol+=" \\\\ &= "+u5disp(N,L);
  sol+=" \\end{aligned} \\] The answer is <b>"+u5M(N,L)+"</b>.";
  return mcq(prompt,{t:u5M(N,L),fb:"Yes: rewritten over the common denominator "+L+", the numerators add to "+N+"."},
    u5fopts([N,L],[{p:[a+c,d1+d2],fb:"That adds the tops and the bottoms. Fractions can only be added once they share a denominator."},{p:[a*m1+c,L],fb:"That rewrites only the first fraction over "+L+". The second fraction must be rewritten too."},{p:[a+c*m2,L],fb:"That rewrites only the second fraction over "+L+". The first fraction must be rewritten too."}]),
    sol,{mode:"add-unlike",a:a,d1:d1,c:c,d2:d2});
}, ["The parts are different sizes, so the fractions need a common denominator first.", "Start by finding the least common multiple of the two denominators."]);
E("u1-pk-sub-unlike", 1, ["6.1"], 2, "gen", function(){
  var d1=2,d2=3,a=1,c=1,cnt=0,L=6;
  while(cnt<60){d1=pick([3,4,5,6,8,9,10,12]);d2=pick([2,3,4,5,6,8,10,12]);if(d1===d2){cnt++;continue;}L=u5lcm(d1,d2);if(L>36){cnt++;continue;}a=ri(1,d1-1);c=ri(1,d2-1);if(a*L/d1<=c*L/d2){cnt++;continue;}break;}
  if(cnt>=60){d1=3;d2=4;a=2;c=1;L=12;}
  var m1=L/d1,m2=L/d2;var N=a*m1-c*m2;
  var ctx=pick(["pure","flour","paint"]);
  var prompt;
  if(ctx==="flour")prompt="A bin holds "+u5M(a,d1)+" of a kilogram of flour. A baker takes out "+u5M(c,d2)+" of a kilogram. How much flour is left, in kilograms?";
  else if(ctx==="paint")prompt="A can is "+u5M(a,d1)+" full of paint. Then "+u5M(c,d2)+" of the can is used on a fence. What fraction of the can is left?";
  else prompt="What is "+u5M(a,d1)+" - "+u5M(c,d2)+"?";
  var sol="Use the common denominator "+L+".\\[ \\begin{aligned} "+FR(a,d1)+" - "+FR(c,d2)+" &= "+FR(a*m1,L)+" - "+FR(c*m2,L)+" \\\\ &= "+FR(N,L);
  var rr=u5red(N,L);if(rr[0]!==N||rr[1]!==L)sol+=" \\\\ &= "+u5disp(N,L);
  sol+=" \\end{aligned} \\] The answer is <b>"+u5M(N,L)+"</b>.";
  return mcq(prompt,{t:u5M(N,L),fb:"Yes: rewritten over the common denominator "+L+", the difference of the numerators is "+N+"."},
    u5fopts([N,L],[{p:[Math.abs(a-c),Math.abs(d1-d2)|| (d1+d2)],fb:"That subtracts the tops and the bottoms. Fractions can only be subtracted once they share a denominator."},{p:[a*m1-c,L],fb:"That rewrites only the first fraction over "+L+". The second fraction must be rewritten too."},{p:[a*m1+c*m2,L],fb:"That adds the rewritten numerators. The question asks for a difference, so subtract."}]),
    sol,{mode:"sub-unlike",a:a,d1:d1,c:c,d2:d2});
}, ["The parts are different sizes, so the fractions need a common denominator first.", "Start by rewriting both fractions over the least common multiple of the denominators."]);
E("u1-pk-multiply-fractions", 1, ["6.1"], 1, "gen", function () {
  var P = null;
  for (var t = 0; t < 200 && !P; t++) {
    var d1 = ri(2, 6), n1 = ri(1, d1 - 1), d2 = ri(2, 6), n2 = ri(1, d2 - 1);
    if (d1 === d2 && n1 === n2) continue;
    var vals = [u3disp(n1 * n2, d1 * d2), u3disp(n1 + n2, d1 + d2), u3disp(n1 * n2, d1 + d2), u3disp(n1 + n2, d1 * d2)];
    if (new Set(vals).size < 4) continue;
    P = { n1: n1, d1: d1, n2: n2, d2: d2, vals: vals };
  }
  if (!P) P = { n1: 2, d1: 3, n2: 3, d2: 5, vals: [u3disp(6, 15), u3disp(5, 8), u3disp(6, 8), u3disp(5, 15)] };
  var g1 = u3gcd(P.n1, P.d2), g2 = u3gcd(P.n2, P.d1);
  var prompt = "Multiply: " + u3disp(P.n1, P.d1) + " \\(\\times\\) " + u3disp(P.n2, P.d2) + ". Give the answer in lowest terms.";
  var solution = "Multiply the numerators and multiply the denominators, cancelling first where possible: \\[ \\begin{aligned} " + FR(P.n1, P.d1) + " \\times " + FR(P.n2, P.d2) + " &= " + FR(P.n1 * P.n2, P.d1 * P.d2) + " \\\\ &= " + FR(u3red(P.n1 * P.n2, P.d1 * P.d2)[0], u3red(P.n1 * P.n2, P.d1 * P.d2)[1]) + " \\end{aligned} \\] So the product is <b>" + P.vals[0] + "</b>.";
  return mcq(prompt,
    { t: P.vals[0], fb: "Correct. Numerators multiply, denominators multiply, then reduce." },
    [
      { t: P.vals[1], fb: "This adds across the tops and bottoms, which is not how fractions multiply." },
      { t: P.vals[2], fb: "The numerators are multiplied but the denominators are added instead of multiplied." },
      { t: P.vals[3], fb: "The denominators are multiplied but the numerators are added instead of multiplied." }
    ],
    solution, { mode: "mult-basic", n1: P.n1, d1: P.d1, n2: P.n2, d2: P.d2 });
}, ["For multiplication, no common denominator is needed.", "Cancel any numerator with any denominator before you multiply."]);
E("u1-pk-divide-fractions", 1, ["6.1"], 1, "gen", function () {
  var P = null;
  for (var t = 0; t < 300 && !P; t++) {
    var d1 = ri(2, 9), n1 = ri(1, d1 - 1), d2 = ri(2, 9), n2 = ri(1, d2 - 1);
    var vals = [u3disp(n1 * d2, d1 * n2), u3disp(d1 * n2, n1 * d2), u3disp(n1 * n2, d1 * d2), u3disp(d1 * n2, n1 * d2) === u3disp(n1 * d2, d1 * n2) ? "x" : u3disp(d1 * d2, n1 * n2)];
    var inv = u3disp(d1 * n2, n1 * d2);
    vals = [u3disp(n1 * d2, d1 * n2), u3disp(d1 * d2, n1 * n2), u3disp(n1 * n2, d1 * d2), inv];
    if (new Set(vals).size < 4) continue;
    P = { n1: n1, d1: d1, n2: n2, d2: d2, vals: vals };
  }
  if (!P) P = { n1: 3, d1: 4, n2: 2, d2: 5, vals: [u3disp(15, 8), u3disp(20, 6), u3disp(6, 20), u3disp(8, 15)] };
  var prompt = "Divide: " + u3disp(P.n1, P.d1) + " \\(\\div\\) " + u3disp(P.n2, P.d2) + ". Give the answer in lowest terms.";
  var rr = u3red(P.n1 * P.d2, P.d1 * P.n2);
  var solution = "Multiply by the reciprocal of the divisor: \\[ \\begin{aligned} " + FR(P.n1, P.d1) + " \\div " + FR(P.n2, P.d2) + " &= " + FR(P.n1, P.d1) + " \\times " + FR(P.d2, P.n2) + " \\\\ &= " + FR(P.n1 * P.d2, P.d1 * P.n2) + " \\\\ &= " + FR(rr[0], rr[1]) + " \\end{aligned} \\] So the quotient is <b>" + P.vals[0] + "</b>.";
  return mcq(prompt,
    { t: P.vals[0], fb: "Correct. Only the divisor is flipped, then multiply." },
    [
      { t: P.vals[1], fb: "This flips both fractions, but only the divisor is flipped." },
      { t: P.vals[2], fb: "This multiplies straight across without flipping the divisor." },
      { t: P.vals[3], fb: "This flips the first fraction instead of the divisor." }
    ],
    solution, { mode: "div-frac-frac", n1: P.n1, d1: P.d1, n2: P.n2, d2: P.d2 });
}, ["Division by a fraction means multiply by its reciprocal.", "Flip only the second fraction, the divisor."]);
E("u1-pk-ooo-fractions", 1, ["6.2"], 2, "gen", function () {
  var P = null;
  for (var t = 0; t < 300 && !P; t++) {
    var d1 = pick([2, 4, 5, 8, 10]), n1 = ri(1, d1 - 1);
    var d2 = pick([2, 4, 5, 8, 10]), n2 = ri(1, d2 - 1);
    var w = ri(2, 6);
    var val = n1 / d1 + (n2 / d2) * w;
    if (Math.abs(val * 1000 - Math.round(val * 1000)) > 1e-9) continue;
    P = { n1: n1, d1: d1, n2: n2, d2: d2, w: w, val: Math.round(val * 1000) / 1000 };
  }
  if (!P) P = { n1: 1, d1: 2, n2: 3, d2: 4, w: 2, val: 2 };
  var prompt = "Evaluate: \\(" + FR(P.n1, P.d1) + " + " + FR(P.n2, P.d2) + " \\times " + P.w + "\\). Give your answer as a decimal.";
  var prod = u3red(P.n2 * P.w, P.d2);
  var solution = "Multiplication is done before addition: \\[ \\begin{aligned} " + FR(P.n1, P.d1) + " + " + FR(P.n2, P.d2) + " \\times " + P.w + " &= " + FR(P.n1, P.d1) + " + " + FR(prod[0], prod[1]) + " \\\\ &= " + fmt(P.val) + " \\end{aligned} \\] So the value is <b>" + fmt(P.val) + "</b>.";
  return numq(prompt, P.val, 0.01, solution, { mode: "ooo-frac", n1: P.n1, d1: P.d1, n2: P.n2, d2: P.d2, w: P.w });
}, ["Multiplication comes before addition in the order of operations.", "First work out the fraction times the whole number."]);
E("u1-pk-add-sub-decimals", 1, ["6.1"], 1, "gen", function(){
  var ctxs=[
    {add:true, s:"Maya buys a notebook for $%A and a pen for $%B. How much does she spend in total?"},
    {add:true, s:"A trail has two parts: %A km and %B km. What is the total length of the trail?"},
    {add:true, s:"Three ribbons measure %A m, %B m and %C m. What is their total length?"},
    {add:false, s:"Jonah has $%A and spends $%B on lunch. How much money does he have left?"},
    {add:false, s:"A tank holds %A L of water. A family uses %B L. How much water is left?"},
    {add:false, s:"A board is %A m long. A piece %B m long is cut off. How long is the piece that remains?"}
  ];
  var c=pick(ctxs);
  var A=ri(120,4800)/100, B=ri(110,2900)/100;
  if(!c.add&&B>A){var tmp=A;A=B;B=tmp;}
  var parts=[A,B], ans=A+B;
  if(c.add&&c.s.indexOf("%C")>=0){var C=ri(105,1500)/100; parts.push(C); ans+=C;}
  if(!c.add)ans=A-B;
  var prompt=c.s.replace("%A",fmtF(A,2)).replace("%B",fmtF(B,2));
  if(parts.length===3)prompt=prompt.replace("%C",fmtF(parts[2],2));
  var pool=[ans+0.1,ans-0.1,ans+1,ans-1,ans+0.01,ans+10];
  var seen={}; seen[fmtF(ans,2)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    if(pool[i]<=0)continue;
    var k=fmtF(pool[i],2);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:"$"+k.replace(/^\$/,""), fb:"Check the place values: line up the decimal points and add or subtract column by column."});
  }
  ds=ds.map(function(o){return {t:(c.s.indexOf("$")>=0?"$":"")+o.t.replace(/^\$/,""), fb:o.fb};});
  var corT=(c.s.indexOf("$")>=0?"$":"")+fmtF(ans,2);
  ds.forEach(function(o){if(o.t.indexOf("$")!==0&&corT.indexOf("$")===0)o.t="$"+o.t;});
  var steps=parts.map(function(x){return fmtF(x,2);}).join(c.add?" + ":"");
  var sol=c.add
    ? "\\[ \\begin{aligned} &"+parts.map(function(x){return fmtF(x,2);}).join(" + ")+" \\\\ &= "+fmtF(ans,2)+" \\end{aligned} \\] The answer is <b>"+corT+"</b>."
    : "\\[ \\begin{aligned} "+fmtF(A,2)+" - "+fmtF(B,2)+" &= "+fmtF(ans,2)+" \\end{aligned} \\] The answer is <b>"+corT+"</b>.";
  return mcq(prompt,
    {t:corT, fb:"Yes: lining up the decimal points and working column by column gives this value."},
    ds, sol, {mode:c.add?"add":"sub", A:A, B:B});
}, ["Line up the decimal points before adding or subtracting.", "Start by rewriting the numbers with the decimal points in one column."]);
E("u1-pk-mult-decimals", 1, ["6.1"], 1, "gen", function(){
  var mode=ri(0,1), ans, prompt, work;
  if(mode===0){
    var p=ri(125,1999)/100, q=ri(12,48);
    ans=p*q;
    prompt="Fabric costs $"+fmtF(p,2)+" per metre. How much do "+q+" metres cost?";
    work="\\[ \\begin{aligned} "+fmtF(p,2)+" \\times "+q+" &= "+fmt(ans,2)+" \\end{aligned} \\]";
  } else {
    var a=ri(115,999)/100, b=ri(12,35)/10;
    ans=a*b;
    prompt="A garden bed is "+fmt(a,2)+" m long and "+fmt(b,1)+" m wide. What is its area, in square metres?";
    work="\\[ \\begin{aligned} "+fmt(a,2)+" \\times "+fmt(b,1)+" &= "+fmt(ans,3)+" \\end{aligned} \\]";
  }
  var pool=[ans*10,ans/10,ans+a||ans+1,ans+(mode===0?p:a),ans- (mode===0?p:a)];
  var seen={}; seen[fmt(ans,3)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    if(!(pool[i]>0))continue;
    var k=fmt(pool[i],3);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:(mode===0?"$":"")+k, fb:"Check the decimal placement: count the total decimal places in the factors, or estimate the size first."});
  }
  var corT=(mode===0?"$":"")+fmt(ans,3);
  ds.forEach(function(o){if(mode===0&&o.t.indexOf("$")!==0)o.t="$"+o.t;});
  ds=precPair(corT,ds);
  return mcq(prompt,
    {t:corT, fb:"Yes: the multiplication and decimal placement are both right."},
    ds,
    work+" Multiply as with whole numbers, then place the decimal point using the total number of decimal places in the factors. The answer is <b>"+corT+"</b>.",
    {mode:mode});
}, ["Multiply as if the numbers were whole, then place the decimal point.", "Start by estimating the size of the product so a misplaced decimal stands out."]);
E("u1-pk-order-mixed", 1, ["6.1"], 2, "gen", function(){
  var vals=[],guard=0;
  while(vals.length<4&&guard++<200){var v=ri(12,96);if(vals.indexOf(v)<0)vals.push(v);}
  if(vals.length<4)vals=[24,45,63,88];
  var forms=["dec","fra","pct","raw"];
  var rend=function(v,f){
    if(f==="dec")return fmt(v/100);
    if(f==="fra")return u3simp(v,100)[0]+"/"+u3simp(v,100)[1];
    if(f==="pct")return v+"%";
    return v+"/100";
  };
  var items=vals.map(function(v,i){return {v:v,s:rend(v,forms[i])};});
  var asc=items.slice().sort(function(a,b){return a.v-b.v;});
  var join=function(arr){return arr.map(function(x){return x.s;}).join(", ");};
  var correct=join(asc);
  var desc=asc.slice().reverse();
  var sw1=[asc[1],asc[0],asc[2],asc[3]];
  var sw2=[asc[0],asc[1],asc[3],asc[2]];
  var sol="Write each number as a decimal: "+asc.map(function(x){return x.s+" = "+fmt(x.v/100);}).join(", ")+". In ascending order: <b>"+correct+"</b>.";
  return mcq("Write the numbers in ascending order (smallest to largest): "+join(items)+".",
    {t:correct, fb:"Correct: converting each to a decimal gives the order shown."},
    [{t:join(desc), fb:"That is descending order (largest first); the question asks for ascending."},
     {t:join(sw1), fb:"The first two numbers are swapped: compare their decimal values."},
     {t:join(sw2), fb:"The last two numbers are swapped: compare their decimal values."}],
    sol, {vals:vals});
}, ["Convert every number to the same form, such as decimals, before comparing.", "Start by writing each fraction and percent as a decimal."]);
E("u2-pk-sqrt-perfect", 2, ["6.5"], 1, "gen", function(){
  var r=ri(2,20); var n=r*r;
  var ds=u1d3(r,[r+1,r-1,r+2,Math.max(r-2,1),r+3]);
  var opts=ds.map(function(d){return {t:String(d), fb:fmt(d)+" squared is "+(d*d)+", not "+n+": try another value."};});
  var mode=pick(["plain","area","pairs"]);
  var prompt=(mode==="plain")?("What is \\(\\sqrt{"+n+"}\\)?"):((mode==="area")?("A square has an area of "+n+" square centimetres. What is its side length, in centimetres?"):("A number multiplied by itself gives "+n+". What is the number?"));
  var q=mcq(prompt, {t:String(r), fb:"Yes: "+r+" times "+r+" equals "+n+"."}, opts,
    "Find the number that multiplies by itself to give "+n+": \\[ \\begin{aligned} "+r+" \\times "+r+" &= "+n+" \\\\ \\sqrt{"+n+"} &= "+r+" \\end{aligned} \\] The square root is <b>"+r+"</b>.",
    {r:r, n:n, mode:mode});
  q.figure=u1gridSVG(r);
  return q;
}, ["Think of the number that multiplies by itself to give the value under the root sign.", "Test small squares in order until one equals the number shown."]);
E("u2-pk-square-of-number", 2, ["6.5"], 1, "gen", function(){
  var n=ri(3,25); var sq=n*n;
  var ds=u1d3(sq,[2*n,sq+n,sq-n,(n+1)*(n+1),(n-1)*(n-1),sq+10]);
  var opts=ds.map(function(d){return {t:String(d), fb:"That is not "+n+" times "+n+": multiply the number by itself."};});
  var mode=pick(["plain","tile","product"]);
  var prompt=(mode==="plain")?("What is \\("+n+"^{2}\\)?"):((mode==="tile")?("A square tile has sides of "+n+" cm. What is the area of the tile, in square centimetres?"):("What is the value of \\("+n+" \\times "+n+"\\)?"));
  return mcq(prompt, {t:String(sq), fb:"Yes: "+n+" times "+n+" equals "+sq+"."}, opts,
    "Squaring means multiplying the number by itself: \\[ \\begin{aligned} "+n+"^{2} &= "+n+" \\times "+n+" \\\\ &= "+sq+" \\end{aligned} \\] The square is <b>"+sq+"</b>.",
    {n:n, mode:mode});
}, ["Squaring a number means multiplying it by itself.", "Write the number times itself and multiply."]);
E("u2-pk-estimate-between", 2, ["6.5"], 1, "gen", function(){
  var n=u1nonSquare(10,200); var k=Math.floor(Math.sqrt(n));
  var pairs=[[k,k+1],[k-1,k],[k+1,k+2],[k+2,k+3]];
  var opts=pairs.slice(1).map(function(pr){return {t:pr[0]+" and "+pr[1], fb:"Square both numbers: "+n+" does not lie between their squares."};});
  var q=mcq("The square root of "+n+" is between which two whole numbers?", {t:k+" and "+(k+1), fb:"Yes: "+n+" lies between "+(k*k)+" and "+((k+1)*(k+1))+"."}, opts,
    "Use the perfect squares on each side as benchmarks: \\[ \\begin{aligned} "+k+"^{2} &= "+(k*k)+" \\\\ "+(k+1)+"^{2} &= "+((k+1)*(k+1))+" \\end{aligned} \\] Since "+(k*k)+" is less than "+n+", which is less than "+((k+1)*(k+1))+", the root lies between <b>"+k+" and "+(k+1)+"</b>.",
    {n:n, k:k});
  q.figure=u1numLineSVG(Math.max(k-1,0),k+2);
  return q;
}, ["Find the perfect squares just below and just above the number.", "Square whole numbers in order until their squares bracket the number."]);
E("u2-pk-root-between", 2, ["6.5"], 1, "gen", function(){
  var a=ri(2,14); var b=a+ri(1,2);
  var m=a*a+ri(1,(b*b-a*a)-1);
  var opts=[{t:String(a*a), fb:"Its square root is exactly "+a+", an endpoint rather than a value between."},
            {t:String(b*b), fb:"Its square root is exactly "+b+", an endpoint rather than a value between."},
            {t:String(b*b+ri(2,15)), fb:"Its square root is greater than "+b+": square the endpoints to check."}];
  return mcq("Which number has a square root between "+a+" and "+b+"?", {t:String(m), fb:"Yes: "+m+" lies between "+(a*a)+" and "+(b*b)+"."}, opts,
    "Square the endpoints to turn the question into a range: \\[ \\begin{aligned} "+a+"^{2} &= "+(a*a)+" \\\\ "+b+"^{2} &= "+(b*b)+" \\end{aligned} \\] Only "+m+" lies between those squares. The number is <b>"+m+"</b>.",
    {a:a, b:b, m:m});
}, ["Square the two given numbers to get a range for the number itself.", "Check which candidate falls between the two squares."]);
E("u2-pk-calc-approx", 2, ["6.5"], 1, "gen", function(){
  var n=u1nonSquare(11,300);
  var ans=u1r1(Math.sqrt(n));
  return numq("Use a calculator to find \\(\\sqrt{"+n+"}\\), to one decimal place.", ans, 0.05,
    "A calculator gives a long decimal: \\[ \\begin{aligned} \\sqrt{"+n+"} &\\approx "+fmt(Math.sqrt(n))+" \\\\ &\\approx "+fmt(ans)+" \\end{aligned} \\] To one decimal place, the square root is <b>"+fmt(ans)+"</b>.",
    {n:n});
}, ["Enter the number and use the square root key on a calculator.", "Read the display, then round to one decimal place."]);
E("u2-pk-sa-rect-prism", 2, ["9.2"], 2, "gen", function(){
  var l=ri(3,14), w=ri(3,12), h=ri(2,10);
  var sa=2*(l*w+l*h+w*h);
  var q=numq("Find the surface area of the right rectangular prism shown, in square centimetres.", sa, 0.01,
    "Work face by face. The front and back are "+l+" by "+h+", area "+fmt(l*h)+" each; the sides are "+w+" by "+h+", area "+fmt(w*h)+" each; and the top and bottom are "+l+" by "+w+", area "+fmt(l*w)+" each. Double each face area for its matching pair and add: \\[ \\begin{aligned} SA &= 2("+fmt(l*w)+") + 2("+fmt(l*h)+") + 2("+fmt(w*h)+") \\\\ &= "+sa+" \\end{aligned} \\] The surface area is <b>"+sa+" cm\\(^{2}\\)</b>.",
    {mode:"rect-sa", l:l, w:w, h:h});
  q.figure=u4boxSVG(l,w,h);
  return q;
}, ["Picture the net: three different faces, each with a matching partner.", "Find the area of the top, the front and one side, add them, then double."]);
E("u2-pk-sa-tri-prism", 2, ["9.2"], 2, "gen", function(){
  var tr=pick([[3,4,5],[5,12,13],[6,8,10],[8,15,17],[9,12,15],[12,16,20]]);
  var a=tr[0], b=tr[1], c=tr[2]; var L=ri(4,16);
  var sa=a*b+(a+b+c)*L;
  var q=numq("Find the surface area of the right triangular prism shown, in square centimetres.", sa, 0.01,
    "Two triangular ends plus three rectangles along the length. Each triangular end has area "+fmt(a*b/2)+", and the three rectangles have areas "+fmt(a*L)+", "+fmt(b*L)+" and "+fmt(c*L)+": \\[ \\begin{aligned} SA &= 2("+fmt(a*b/2)+") + "+fmt(a*L)+" + "+fmt(b*L)+" + "+fmt(c*L)+" \\\\ &= "+sa+" \\end{aligned} \\] The surface area is <b>"+sa+" cm\\(^{2}\\)</b>.",
    {mode:"tri-sa", a:a, b:b, c:c, L:L});
  q.figure=u4triSVG(a,b,c,L);
  return q;
}, ["Split the surface into the two triangular ends and the three rectangles.", "Find the ends first, then work out each of the three rectangles along the length and add them."]);
E("u2-pk-sa-cylinder", 2, ["9.2"], 2, "gen", function(){
  var r=ri(2,9), h=ri(3,14);
  var sa=u4r1(2*3.14*r*(r+h));
  var q=numq("Find the surface area of the right cylinder shown. Use \\(\\pi = 3.14\\) and give your answer in square centimetres, to one decimal place.", sa, 0.6,
    "Two circles plus the curved side, which unrolls into a rectangle. Each circle has area \\(3.14 \\times "+r+" \\times "+r+" = "+fmt(u4r2(3.14*r*r))+"\\). The rectangle has length the circumference, \\(2 \\times 3.14 \\times "+r+" = "+fmt(u4r2(2*3.14*r))+"\\), and width "+h+", so its area is \\("+fmt(u4r2(2*3.14*r))+" \\times "+h+" = "+fmt(u4r2(2*3.14*r*h))+"\\). Add the parts: \\[ \\begin{aligned} SA &= 2("+fmt(u4r2(3.14*r*r))+") + "+fmt(u4r2(2*3.14*r*h))+" \\\\ &= "+fmt(u4r2(2*3.14*r*r+2*3.14*r*h))+" \\\\ &\\approx "+fmt(sa)+" \\end{aligned} \\] The surface area is <b>"+fmt(sa)+" cm\\(^{2}\\)</b>.",
    {mode:"cyl-sa", r:r, h:h});
  q.figure=u4cylSVG(r,h,false);
  return q;
}, ["Unroll the cylinder in your mind: two circles and one rectangle.", "Use the radius for both circle areas and for the width around the curved side."]);
E("u2-pk-sa-problem", 2, ["9.2"], 2, "gen", function(){
  if(pick(["cans","paper"])==="cans"){
    var l=ri(4,10), w=ri(3,9), h=ri(3,8);
    var sa=2*(l*w+l*h+w*h);
    var cover=pick([20,25,30,40,50]);
    var cans=Math.ceil(sa/cover-0.0000001);
    var q=numq("A storage box shaped like a right rectangular prism measures "+l+" m long, "+w+" m wide and "+h+" m high. It is painted on all outside faces. One can of paint covers "+cover+" square metres. How many cans of paint are needed?", cans, 0.01,
      "Find the surface area first: the box's three face areas are "+fmt(l*w)+", "+fmt(l*h)+" and "+fmt(w*h)+", and each face has a matching opposite face: \\[ \\begin{aligned} SA &= 2("+fmt(l*w)+") + 2("+fmt(l*h)+") + 2("+fmt(w*h)+") \\\\ &= "+sa+" \\end{aligned} \\] Then \\("+sa+" \\div "+cover+" \\approx "+fmt(u4r2(sa/cover))+"\\), and a part can cannot be bought. The number of cans needed is <b>"+cans+"</b>.",
      {mode:"paint-cans", l:l, w:w, h:h, cover:cover}); q.figure=m8BoxLabSVG(l+" m",w+" m",h+" m",false); return q;
  }
  var l2=ri(20,60)/2, w2=ri(16,44)/2, h2=ri(12,36)/2;
  var sa2=2*(l2*w2+l2*h2+w2*h2);
  var q=numq("A gift box shaped like a right rectangular prism measures "+fmt(l2)+" cm long, "+fmt(w2)+" cm wide and "+fmt(h2)+" cm high. Wrapping paper covers all faces with no overlap. How many square centimetres of paper are needed?", sa2, 0.01,
    "The paper must cover the whole surface of the box: its three face areas are "+fmt(l2*w2)+", "+fmt(l2*h2)+" and "+fmt(w2*h2)+", and each face has a matching opposite face: \\[ \\begin{aligned} SA &= 2("+fmt(l2*w2)+") + 2("+fmt(l2*h2)+") + 2("+fmt(w2*h2)+") \\\\ &= "+fmt(sa2)+" \\end{aligned} \\] The paper needed is <b>"+fmt(sa2)+" cm\\(^{2}\\)</b>.",
    {mode:"wrap-paper", l:l2, w:w2, h:h2}); q.figure=m8BoxLabSVG(fmt(l2)+" cm",fmt(w2)+" cm",fmt(h2)+" cm",false); return q;
}, ["Work out the total surface area before using the coverage or finishing the problem.", "Divide the surface area by the coverage per can and round up, since part cans cannot be bought."]);
E("u3-pk-product-sign", 3, ["3.8"], 1, "gen", function () {
  var a = 0, b = 0;
  while (a === 0) a = ri(-9, 9);
  while (b === 0) b = ri(-9, 9);
  var val = a * b;
  var prompt = "Evaluate: \\(" + u2sg(a) + " \\times " + u2sg(b) + "\\)";
  var signNote = (a < 0 && b < 0) ? "The signs are the same, so the product is positive."
    : (a < 0 || b < 0) ? "The signs are different, so the product is negative."
    : "Both factors are positive, so the product is positive.";
  var solution = signNote + " Multiply the sizes: \\[ \\begin{aligned} " + u2sg(a) + " \\times " + u2sg(b) + " &= " + val + " \\end{aligned} \\] So the product is <b>" + val + "</b>.";
  return mcq(prompt,
    { t: fmt(val), fb: "Correct. " + signNote },
    u2dist(val, [
      { v: -val, fb: "The size is right but the sign is wrong. Check whether the signs are the same or different." },
      { v: a + b, fb: "That adds the two numbers instead of multiplying them." },
      { v: a - b, fb: "That subtracts the two numbers instead of multiplying them." }
    ]),
    solution, { mode: "product-sign", a: a, b: b });
}, ["Decide the sign first: same signs give a positive, different signs give a negative.", "Multiply the sizes of the two numbers, then attach the sign."]);
E("u3-pk-quotient-sign", 3, ["3.8"], 1, "gen", function () {
  var d = 0;
  while (d === 0 || Math.abs(d) < 2) d = ri(-9, 9);
  var q = 0;
  while (q === 0 || Math.abs(q) < 2) q = ri(-9, 9);
  var dvd = d * q;
  var prompt = "Evaluate: \\(" + dvd + " \\div " + u2sg(d) + "\\)";
  var signNote = (dvd < 0 && d < 0) || (dvd > 0 && d > 0) ? "The signs are the same, so the quotient is positive." : "The signs are different, so the quotient is negative.";
  var solution = signNote + " Divide the sizes: \\[ \\begin{aligned} " + dvd + " \\div " + u2sg(d) + " &= " + q + " \\end{aligned} \\] So the quotient is <b>" + q + "</b>.";
  return mcq(prompt,
    { t: fmt(q), fb: "Correct. " + signNote },
    u2dist(q, [
      { v: -q, fb: "The size is right but the sign is wrong. Check whether the signs are the same or different." },
      { v: dvd - d, fb: "That subtracts the divisor instead of dividing." },
      { v: d, fb: "That just repeats the divisor. The quotient tells how many groups of the divisor fit." }
    ]),
    solution, { mode: "quotient-sign", d: d, q: q });
}, ["Decide the sign first: same signs give a positive, different signs give a negative.", "Divide the size of the first number by the size of the second, then attach the sign."]);
E("u3-pk-missing-factor", 3, ["3.8"], 2, "gen", function(){
  var s=pick([-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9]);
  var x=0; while(x===0) x=ri(-12,12);
  var P=s*x;
  var t=pick([-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9]);
  var ans=x*t;
  return numq("A number multiplied by \\("+s+"\\) gives \\("+P+"\\). What is the result when that same number is multiplied by \\("+t+"\\)?", ans, 0.01,
    "First find the number by dividing, using the sign rule for quotients: \\[ \\begin{aligned} \\text{number} &= "+P+" \\div "+u2sg(s)+" \\\\ &= "+x+" \\end{aligned} \\] Then multiply that number by "+t+": \\("+x+" \\times "+u2sg(t)+" = "+ans+"\\). The answer is <b>"+ans+"</b>.",
    {mode:"missing-factor-follow", s:s, x:x, t:t});
}, ["The first sentence hides the number, so recover it before doing the second multiplication.", "Divide the product by the known factor to find the number, then multiply by the new factor."]);
E("u4-pk-identify-parts", 4, ["8.14"], 1, "gen", function(){
  var a=ri(2,9), b=ri(2,15), v=pick(["n","x","t","m","s"]);
  var form=pick(["expr","eq"]);
  var modes=form==="eq"?["coef","var"]:["coef","const","var"];
  var mode=pick(modes);
  var c=ri(20,60);
  var shown="\\("+u1Expr(a,b,v)+(form==="eq"?" = "+c:"")+"\\)";
  var kind=form==="eq"?"equation":"expression";
  if(mode==="coef"){
    var cand=[b,a+b,a+1,2*a,a-1].filter(function(x){return x!==a;});
    var seen={},ds=[]; cand.forEach(function(x){ if(!seen[x]&&ds.length<3){seen[x]=1;ds.push(x);} });
    var fbFor=function(x){ if(x===b)return "That is the constant term, not the coefficient."; if(x===a+b)return "That adds the coefficient and the constant together."; return "That number does not appear as the multiplier of "+v+"."; };
    return mcq("In the "+kind+" "+shown+", what is the numerical coefficient of \\("+v+"\\)?",
      {t:String(a), fb:"Correct: "+v+" is multiplied by "+a+"."}, ds.map(function(x){return {t:String(x), fb:fbFor(x)};}),
      "The numerical coefficient is the number multiplying the variable. In "+shown+", \\("+v+"\\) is multiplied by \\("+a+"\\). The answer is <b>"+a+"</b>.",
      {mode:mode,a:a,b:b});
  }
  if(mode==="const"){
    var cand2=[a,a+b,b+1,2*b,b-1].filter(function(x){return x!==b&&x>0;});
    var seen2={},ds2=[]; cand2.forEach(function(x){ if(!seen2[x]&&ds2.length<3){seen2[x]=1;ds2.push(x);} });
    var fbFor2=function(x){ if(x===a)return "That is the coefficient of "+v+", not the constant term."; if(x===a+b)return "That adds the two parts together; the constant term stands alone."; return "That value is not the standalone number in the expression."; };
    return mcq("In the expression "+shown+", what is the constant term?",
      {t:String(b), fb:"Correct: "+b+" is the term with no variable attached."}, ds2.map(function(x){return {t:String(x), fb:fbFor2(x)};}),
      "The constant term is the term that does not change with the variable. In "+shown+" it is \\("+b+"\\). The answer is <b>"+b+"</b>.",
      {mode:mode,a:a,b:b});
  }
  var others=["n","x","t","m","s","k"].filter(function(L){return L!==v;});
  var ds3=shuffle(others).slice(0,3);
  return mcq("In the "+kind+" "+shown+", which letter is the variable?",
    {t:v, fb:"Correct: "+v+" is the letter whose value can change."}, ds3.map(function(L){return {t:L, fb:"The letter "+L+" does not appear in this "+kind+"."};}),
    "The variable is the letter in the "+kind+", here \\("+v+"\\). The answer is <b>"+v+"</b>.",
    {mode:mode,a:a,b:b});
}, ["Name the three parts: coefficient, constant term and variable.", "Start by finding the letter; the number attached to it and the number standing alone are the other two parts."]);
E("u4-pk-variable-meaning", 4, ["8.14"], 1, "var", varset([
  function(){ return mcq("Tickets cost $9 each. The total cost is written as \\(9t\\), where \\(t\\) is the number of tickets. What is \\(t\\)?",
    {t:"A variable: a value that can change from one purchase to another.", fb:"Correct: the letter stands for a quantity that is not fixed."},
    [{t:"The multiplication sign that joins the 9 and the t in the expression.", fb:"The multiplication is implied by writing 9 next to t; t itself stands for the ticket count."},
     {t:"A fixed value of 9 that stays the same for every purchase of tickets.", fb:"Nine is the price of one ticket; t is the part that changes."},
     {t:"The total cost of all the tickets bought in the whole purchase.", fb:"The total cost is the whole expression 9t; t is the number of tickets."}],
    "In \\(9t\\), the letter \\(t\\) stands for the number of tickets, which changes with each purchase. A letter used this way is a variable. The answer is <b>a variable, a value that can change</b>.", {}); },
  function(){ return mcq("In the formula for the perimeter of a square, \\(P = 4s\\), what does the variable \\(s\\) represent?",
    {t:"The side length of the square, which can be any value.", fb:"Correct: s changes with the size of the square."},
    [{t:"The number 4, which counts the sides of the square in the formula.", fb:"Four is the number of equal sides; s is the side length."},
     {t:"The perimeter itself, the distance all the way around the square.", fb:"The perimeter is P; s is the side length used to find it."},
     {t:"A unit such as centimetres for measuring length.", fb:"Units are written after a measurement; s stands for the length value."}],
    "\\(P = 4s\\) multiplies the side length by 4. The letter \\(s\\) can be any side length, so it is the variable. The answer is <b>the side length, which can be any value</b>.", {}); },
  function(){ return mcq("A class writes the expression \\(20 - 2m\\) for the money left after buying \\(m\\) muffins at $2 each from $20. What does \\(m\\) do in this expression?",
    {t:"It holds the place of the number of muffins, which is not fixed yet.", fb:"Correct: m can be 1, 2, 3 and so on, and the money left changes with it."},
    [{t:"It tells us to subtract 2 exactly m times as an operation sign.", fb:"The 2m part is a multiplication; m itself is the count of muffins."},
     {t:"It is a label for muffins, like a unit written after a measurement.", fb:"Here m is a number that can vary, not a unit label."},
     {t:"It must equal 20, the amount of money the class started with for buying muffins.", fb:"Twenty is the starting amount of money; m is the unknown count."}],
    "The value of \\(20 - 2m\\) changes as the number of muffins changes, so \\(m\\) is a variable holding the place of that count. The answer is <b>it holds the place of a value that can change</b>.", {}); },
  function(){ return mcq("Which statement about a variable is correct?",
    {t:"A variable is a letter or symbol that represents a value that can change or is unknown.", fb:"Correct: that is exactly what a variable does in an expression."},
    [{t:"A variable always stands for the number 1, whatever expression the variable appears in at all.", fb:"A variable can stand for many different values, not just 1."},
     {t:"A variable is another name for an equals sign, the symbol that joins two sides.", fb:"The equals sign joins two sides of an equation; a variable is a letter or symbol."},
     {t:"A variable must be the letter x, and no other letter can ever be used for one.", fb:"Any letter can be used, such as n, t or s, depending on the context."}],
    "A variable is a letter or symbol standing in for a value that can change or that we do not know yet. The answer is <b>a letter or symbol for a value that can change or is unknown</b>.", {}); },
  function(){ return mcq("In \\(7 - 2t\\), the time spent on homework in hours is \\(t\\). If \\(t\\) grows, what happens to the value of the expression?",
    {t:"It goes down, because a larger t makes the subtracted part larger.", fb:"Correct: 2t grows with t, and it is being subtracted from 7."},
    [{t:"It stays at 7, because the starting number in the expression never changes.", fb:"Seven is only the starting value; the subtracted part changes with t."},
     {t:"It goes up, because t is getting bigger and bigger as time passes.", fb:"A bigger t makes 2t bigger, but that part is subtracted, so the value falls."},
     {t:"It cannot change, because t is just a letter in the expression.", fb:"A variable does change value; that is its purpose."}],
    "As \\(t\\) increases, \\(2t\\) increases, and subtracting a larger amount from 7 gives a smaller result. The answer is <b>it goes down</b>.", {}); }
]), ["A variable stands in for a value that is not fixed.", "Start by asking which part of the expression can change from case to case."]);
E("u4-pk-expression-or-equation", 4, ["8.14"], 2, "var", varset([
  function(){ return mcq("A student says \\(4x + 7 = 19\\) is an expression. What is the best correction?",
    {t:"It is an equation, because an equals sign joins two expressions.", fb:"Correct: the equals sign makes it an equation."},
    [{t:"The student is right, because it contains a variable like this one does.", fb:"Variables appear in both expressions and equations."},
     {t:"It is an equation only after it is solved, and not a moment before that.", fb:"It is an equation as written; solving is something we do with it."},
     {t:"It is neither, because it has two operations at all.", fb:"The number of operations does not decide; the equals sign does."}],
    "The equals sign in \\(4x + 7 = 19\\) joins \\(4x + 7\\) and \\(19\\), so the whole statement is an equation. The answer is <b>it is an equation because of the equals sign</b>.", {}); },
  function(){ return mcq("Which task fits an equation rather than an expression?",
    {t:"Find the value of x that makes 2x + 5 = 17 true.", fb:"Correct: finding the value that makes a statement true is solving an equation."},
    [{t:"Work out the value of 2x + 5 when x is 4 for the expression.", fb:"That is evaluating an expression: a value for x is already given."},
     {t:"Write 2x + 5 = 17 in words, as a sentence.", fb:"That describes the statement in words; there is no value to find that makes it true."},
     {t:"Add 3 to 2x + 5 to make a new expression.", fb:"That builds a new expression, not an equation."}],
    "An equation asks for the value that makes both sides equal. Only the first task does that. The answer is <b>find the value of x that makes 2x + 5 = 17 true</b>.", {}); }
]), ["Look for an equals sign: it is the deciding feature.", "Start by checking each choice for an equals sign."]);
E("u4-pk-solve-one-step", 4, ["8.8"], 1, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var form = pick(["ax", "xa"]);
    var a = ri(2, 9), x = ri(2, 12), b = form === "ax" ? a * x : x;
    if (form === "xa") { b = x; x = a * b; } // equation x/a = b, solution x = a*b
    var solX = form === "ax" ? b / a : a * b;
    var eq = form === "ax" ? fmt(a) + "x = " + fmt(b) : "\\frac{x}{" + a + "} = " + fmt(b);
    var wrong = form === "ax" ? [b * a, b - a, b + a] : [b / a, b - a, b + a];
    var corr = fmt(solX);
    var dpA = (fmt(wrong[0]).split(".")[1] || "").length;
    var cands = wrong.map(function (w, wi) {
      return { t: (form === "xa" && wi === 1 && dpA > 0) ? fmtF(w, dpA) : fmt(w), fb: form === "ax" ? "That uses the wrong operation. To undo multiplying by " + a + ", divide both sides by " + a + "." : "That uses the wrong operation. To undo dividing by " + a + ", multiply both sides by " + a + "." };
    });
    var ds = u6pick3(corr, cands);
    if (!ds) continue;
    var steps = form === "ax"
      ? "\\begin{aligned} " + fmt(a) + "x &= " + fmt(b) + " \\\\ x &= " + fmt(b) + " \\div " + fmt(a) + " \\\\ x &= " + fmt(solX) + " \\end{aligned}"
      : "\\begin{aligned} \\frac{x}{" + a + "} &= " + fmt(b) + " \\\\ x &= " + fmt(b) + " \\times " + fmt(a) + " \\\\ x &= " + fmt(solX) + " \\end{aligned}";
    var sol = "Use the inverse operation on both sides: \\[ " + steps + " \\] So the solution is <b>\\(x = " + fmt(solX) + "\\)</b>.";
    return mcq("Solve the equation \\(" + eq + "\\). What is the value of \\(x\\)?",
      { t: corr, fb: "Correct. The inverse operation isolates x." }, ds, sol,
      { mode: "solve-one-step", form: form, a: a, b: b });
  }
  return mcq("Solve the equation \\(3x = 12\\). What is the value of \\(x\\)?",
    { t: "4", fb: "Correct. Divide both sides by 3." },
    [{ t: "36", fb: "That multiplies instead of dividing." }, { t: "9", fb: "That subtracts 3 instead of dividing by 3." }, { t: "15", fb: "That adds 3 instead of dividing by 3." }],
    "Divide both sides by 3: \\[ \\begin{aligned} 3x &= 12 \\\\ x &= 4 \\end{aligned} \\] So the solution is <b>\\(x = 4\\)</b>.", { mode: "solve-one-step-fallback" });
}, ["Think about what is being done to x, then use the opposite operation.", "For ax = b divide both sides by a; for x/a = b multiply both sides by a."]);
E("u4-pk-solve-two-step", 4, ["8.8"], 2, "gen", function () {
  var frac = Math.random() < 0.35;
  var a, b, x;
  if (frac) { a = pick([2, 4, 6, 8]); x = ri(1, 6) + 0.5; b = ri(1, 12); }
  else { a = ri(2, 9); x = ri(2, 13); b = ri(1, 14); }
  var c = a * x + b;
  var sol = "Undo the steps in reverse order: subtract first, then divide: \\[ \\begin{aligned} " + fmt(a) + "x + " + fmt(b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(c) + " - " + fmt(b) + " \\\\ " + fmt(a) + "x &= " + fmt(a * x) + " \\\\ x &= " + fmt(a * x) + " \\div " + fmt(a) + " \\\\ x &= " + fmt(x) + " \\end{aligned} \\] Check: \\(" + fmt(a) + "(" + fmt(x) + ") + " + fmt(b) + " = " + fmt(a * x) + " + " + fmt(b) + " = " + fmt(c) + "\\). So the solution is <b>\\(x = " + fmt(x) + "\\)</b>.";
  return numq("Solve the equation \\(" + fmt(a) + "x + " + fmt(b) + " = " + fmt(c) + "\\). What is the value of x?", x, 0.01, sol,
    { mode: "solve-two-step", a: a, b: b, frac: frac });
}, ["Undo what was done to x in reverse order: the added number comes off first.", "Subtract the constant from both sides, then divide both sides by the coefficient of x."]);
E("u4-pk-solve-distributive", 4, ["8.8"], 2, "gen", function () {
  var a = ri(2, 7), b = ri(1, 10), x = ri(2, 13), c = a * (x + b);
  var sol = "Apply the distributive property first, then solve: \\[ \\begin{aligned} " + fmt(a) + "(x + " + fmt(b) + ") &= " + fmt(c) + " \\\\ " + fmt(a) + "x + " + fmt(a * b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(c) + " - " + fmt(a * b) + " \\\\ " + fmt(a) + "x &= " + fmt(a * x) + " \\\\ x &= " + fmt(x) + " \\end{aligned} \\] Check: \\(" + fmt(a) + "(" + fmt(x) + " + " + fmt(b) + ") = " + fmt(a) + "(" + fmt(x + b) + ") = " + fmt(c) + "\\). So the solution is <b>\\(x = " + fmt(x) + "\\)</b>.";
  return numq("Solve the equation \\(" + fmt(a) + "(x + " + fmt(b) + ") = " + fmt(c) + "\\). What is the value of x?", x, 0.01, sol,
    { mode: "solve-distributive", a: a, b: b });
}, ["The number outside the brackets multiplies every term inside the brackets.", "Expand the brackets first, then subtract and divide as usual."]);
E("u5-pk-model-equation", 5, ["8.17"], 2, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var a = ri(2, 9), b = ri(3, 20), x = ri(3, 12), c = a * x + b;
    if (a === b) continue;
    var ctx = pick([
      "A rink rental costs a $" + b + " booking fee plus $" + a + " for each hour. The total cost was $" + c + ". Let x be the number of hours rented.",
      "A ferry tour costs a $" + b + " harbour fee plus $" + a + " for each passenger. The total cost was $" + c + ". Let x be the number of passengers.",
      "A snow-clearing service charges a $" + b + " call-out fee plus $" + a + " for each driveway cleared. The total charge was $" + c + ". Let x be the number of driveways cleared."
    ]);
    var corr = "\\(" + fmt(a) + "x + " + fmt(b) + " = " + fmt(c) + "\\)";
    var ds = u6pick3(corr, [
      { t: "\\(" + fmt(b) + "x + " + fmt(a) + " = " + fmt(c) + "\\)", fb: "That swaps the fee and the per-unit charge. The fee is paid once, so it is not multiplied by x." },
      { t: "\\(" + fmt(a) + "(x + " + fmt(b) + ") = " + fmt(c) + "\\)", fb: "That multiplies the fee by " + a + " as well. The fee is paid once, not once per unit." },
      { t: "\\(\\frac{x}{" + a + "} + " + fmt(b) + " = " + fmt(c) + "\\)", fb: "That divides x by the per-unit charge. Each unit adds $" + a + ", so x is multiplied by " + a + "." },
      { t: "\\(" + fmt(a) + "x = " + fmt(c) + " + " + fmt(b) + "\\)", fb: "That moves the fee to the wrong side. In the model, the fee and the unit charges together make the total." }
    ]);
    if (!ds) continue;
    var sol = "The $" + b + " fee is paid once, and the $" + a + " charge is paid x times, for a total of $" + c + ": \\[ \\begin{aligned} " + fmt(a) + "x + " + fmt(b) + " &= " + fmt(c) + " \\end{aligned} \\] So the equation that models the problem is <b>" + corr + "</b>.";
    return mcq(ctx + " Which equation models this problem?",
      { t: corr, fb: "Correct. The per-unit charge multiplies x, the one-time fee stands alone, and together they equal the total." }, ds, sol,
      { mode: "model-equation", a: a, b: b, c: c });
  }
  return mcq("A rink rental costs a $10 booking fee plus $4 for each hour. The total cost was $34. Let x be the number of hours rented. Which equation models this problem?",
    { t: "\\(4x + 10 = 34\\)", fb: "Correct. The per-hour charge multiplies x and the fee stands alone." },
    [{ t: "\\(10x + 4 = 34\\)", fb: "That swaps the fee and the per-hour charge." }, { t: "\\(4(x + 10) = 34\\)", fb: "That multiplies the fee by 4 as well." }, { t: "\\(4x = 34 + 10\\)", fb: "That moves the fee to the wrong side." }],
    "The $4 charge is paid x times and the $10 fee once: \\[ \\begin{aligned} 4x + 10 &= 34 \\end{aligned} \\] So the model is <b>\\(4x + 10 = 34\\)</b>.", { mode: "model-equation-fallback" });
}, ["Decide which amount is paid once and which is paid for each unit.", "The amount paid for each unit multiplies x; the one-time amount is added once."]);
E("u5-pk-solve-two-step", 5, ["8.17"], 2, "gen", function () {
  var frac = Math.random() < 0.35;
  var a, b, x;
  if (frac) { a = pick([2, 4, 6, 8]); x = ri(1, 6) + 0.5; b = ri(1, 12); }
  else { a = ri(2, 9); x = ri(2, 13); b = ri(1, 14); }
  var c = a * x + b;
  var sol = "Undo the steps in reverse order: subtract first, then divide: \\[ \\begin{aligned} " + fmt(a) + "x + " + fmt(b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(c) + " - " + fmt(b) + " \\\\ " + fmt(a) + "x &= " + fmt(a * x) + " \\\\ x &= " + fmt(a * x) + " \\div " + fmt(a) + " \\\\ x &= " + fmt(x) + " \\end{aligned} \\] Check: \\(" + fmt(a) + "(" + fmt(x) + ") + " + fmt(b) + " = " + fmt(a * x) + " + " + fmt(b) + " = " + fmt(c) + "\\). So the solution is <b>\\(x = " + fmt(x) + "\\)</b>.";
  return numq("Solve the equation \\(" + fmt(a) + "x + " + fmt(b) + " = " + fmt(c) + "\\). What is the value of x?", x, 0.01, sol,
    { mode: "solve-two-step", a: a, b: b, frac: frac });
}, ["Undo what was done to x in reverse order: the added number comes off first.", "Subtract the constant from both sides, then divide both sides by the coefficient of x."]);
E("u5-pk-verify-solution", 5, ["8.17"], 1, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var a = ri(2, 7), b = ri(1, 9), xt = ri(2, 9);
    var c = a * xt + b;
    var claim = Math.random() < 0.5 ? xt : xt + pick([-2, -1, 1, 2]);
    if (claim <= 0) continue;
    var lhs = a * claim + b;
    var corr = fmt(lhs);
    var cands = [
      { t: fmt(c), fb: "That is the right side of the equation. The question asks for the left side after substituting x = " + claim + "." },
      { t: fmt(a + claim + b), fb: "That adds the numbers. The term " + fmt(a) + "x means " + a + " times x, not " + a + " plus x." },
      { t: fmt(a * claim), fb: "That works out " + fmt(a) + "x but forgets to add the " + fmt(b) + " that follows it." },
      { t: fmt(lhs + a), fb: "Check the multiplication: " + a + " times " + claim + " is " + fmt(a * claim) + ", then add " + fmt(b) + "." }
    ];
    var ds = u6pick3(corr, cands);
    if (!ds) continue;
    var verdict = claim === xt ? " and it equals the right side, " + fmt(c) + ", so x = " + claim + " checks out" : " and it does not equal the right side, " + fmt(c) + ", so x = " + claim + " is not the solution";
    var sol = "Substitute \\(x = " + claim + "\\) into the left side: \\[ \\begin{aligned} " + fmt(a) + "x + " + fmt(b) + " &= " + fmt(a) + "(" + claim + ") + " + fmt(b) + " \\\\ &= " + fmt(a * claim) + " + " + fmt(b) + " \\\\ &= " + fmt(lhs) + " \\end{aligned} \\] The left side is <b>" + fmt(lhs) + "</b>" + verdict + ".";
    return mcq("To check a solution, substitute \\(x = " + claim + "\\) into the equation \\(" + fmt(a) + "x + " + fmt(b) + " = " + fmt(c) + "\\). What is the value of the left side?",
      { t: corr, fb: "Correct. Substitution replaces x, then the arithmetic gives the left side." }, ds, sol,
      { mode: "verify-left-side", a: a, b: b, claim: claim });
  }
  return mcq("To check a solution, substitute \\(x = 3\\) into the equation \\(2x + 4 = 10\\). What is the value of the left side?",
    { t: "10", fb: "Correct. 2(3) + 4 = 10." },
    [{ t: "6", fb: "That forgets to add the 4." }, { t: "9", fb: "That adds 2 + 3 + 4 instead of multiplying 2 by 3 first." }, { t: "12", fb: "Check the multiplication: 2 times 3 is 6, then add 4." }],
    "Substitute: \\[ \\begin{aligned} 2x + 4 &= 2(3) + 4 \\\\ &= 10 \\end{aligned} \\] The left side is <b>10</b>.", { mode: "verify-left-side-fallback" });
}, ["Substitution means replacing x with the given number everywhere x appears.", "Work out the multiplication first, then add."]);
E("u5-pk-identify-error", 5, ["8.17"], 2, "gen", function () {
  var type = pick(["add-instead", "divide-one-term", "distribute-part"]);
  if (type === "add-instead") {
    var a = ri(2, 8), b = a * ri(1, 2), x = ri(2, 11), c = a * x + b;
    var wrong = (c + b) / a;
    var prompt = "A student solves \\(" + fmt(a) + "x + " + fmt(b) + " = " + fmt(c) + "\\) and writes: \"" + fmt(a) + "x = " + fmt(c) + " + " + fmt(b) + ", so x = " + fmt(wrong) + ".\" What error did the student make?";
    var corr = "The student added " + fmt(b) + " to both sides instead of subtracting it.";
    var sol = "To undo adding " + fmt(b) + ", subtract " + fmt(b) + " from both sides: \\[ \\begin{aligned} " + fmt(a) + "x + " + fmt(b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(c) + " - " + fmt(b) + " = " + fmt(c - b) + " \\\\ x &= " + fmt(x) + " \\end{aligned} \\] So the error is <b>" + corr + "</b>";
    return mcq(prompt, { t: corr, fb: "Correct. The inverse of adding " + fmt(b) + " is subtracting " + fmt(b) + "." },
      [
        { t: "The student divided by " + fmt(a) + " too early, before dealing with the " + fmt(b) + ".", fb: "Look at the student's first line: the division step never happened. The change made to the " + fmt(b) + " is where the work goes wrong." },
        { t: "The student multiplied both sides by " + fmt(a) + " instead of dividing.", fb: "No multiplication by " + fmt(a) + " appears in the work. Compare the first line with the original equation." },
        { t: "There is no error; the student's answer is correct after all.", fb: "Check the answer by substitution: " + fmt(a) + "(" + fmt(wrong) + ") + " + fmt(b) + " does not equal " + fmt(c) + "." }
      ], sol, { mode: "identify-error-add", a: a, b: b });
  }
  if (type === "divide-one-term") {
    var a2 = ri(2, 8), b2 = a2 * ri(1, 2), x2 = ri(3, 11), c2 = a2 * x2 + b2;
    var prompt2 = "A student solves \\(" + fmt(a2) + "x + " + fmt(b2) + " = " + fmt(c2) + "\\) and writes: \"x + " + fmt(b2) + " = " + fmt(c2 / a2) + ", so x = " + fmt(c2 / a2 - b2) + ".\" What error did the student make?";
    var corr2 = "The student divided the " + fmt(a2) + "x term and the total by " + fmt(a2) + ", but did not divide the " + fmt(b2) + " term.";
    var sol2 = "Every term must be treated the same way. It is simpler to subtract first: \\[ \\begin{aligned} " + fmt(a2) + "x + " + fmt(b2) + " &= " + fmt(c2) + " \\\\ " + fmt(a2) + "x &= " + fmt(c2 - b2) + " \\\\ x &= " + fmt(x2) + " \\end{aligned} \\] So the error is <b>" + corr2 + "</b>";
    return mcq(prompt2, { t: corr2, fb: "Correct. Dividing only some terms by " + fmt(a2) + " changes the equation." },
      [
        { t: "The student subtracted " + fmt(b2) + " from one side only, not from both sides of the equation.", fb: "The student never subtracted " + fmt(b2) + " at all. Look at which terms were divided in the first line." },
        { t: "The student used the wrong variable in the final answer and in the working.", fb: "The variable is x throughout. The problem is in how the terms were divided." },
        { t: "There is no error in the student's work; dividing the terms in that way is valid and the answer is correct.", fb: "Check by substitution: " + fmt(a2) + "(" + fmt(c2 / a2 - b2) + ") + " + fmt(b2) + " does not equal " + fmt(c2) + "." }
      ], sol2, { mode: "identify-error-divide", a: a2, b: b2 });
  }
  var a3 = ri(2, 6), b3 = ri(2, 9), x3 = ri(2, 10), c3 = a3 * (x3 + b3);
  var prompt3 = "A student solves \\(" + fmt(a3) + "(x + " + fmt(b3) + ") = " + fmt(c3) + "\\) and writes: \"" + fmt(a3) + "x + " + fmt(b3) + " = " + fmt(c3) + ".\" What error did the student make?";
  var corr3 = "The student multiplied only the x term by " + fmt(a3) + " and left the " + fmt(b3) + " term unchanged.";
  var sol3 = "The distributive property multiplies every term inside the brackets: \\[ \\begin{aligned} " + fmt(a3) + "(x + " + fmt(b3) + ") &= " + fmt(c3) + " \\\\ " + fmt(a3) + "x + " + fmt(a3 * b3) + " &= " + fmt(c3) + " \\end{aligned} \\] So the error is <b>" + corr3 + "</b>";
  return mcq(prompt3, { t: corr3, fb: "Correct. The number outside the brackets multiplies both terms inside." },
    [
      { t: "The student added " + fmt(a3) + " and " + fmt(b3) + " instead of multiplying the terms inside the brackets.", fb: "No addition of " + fmt(a3) + " and " + fmt(b3) + " appears. One bracket term was multiplied and the other was not." },
      { t: "The student should have divided both sides by " + fmt(b3) + " first, before expanding the brackets.", fb: "Dividing by " + fmt(a3) + " first would be a valid start; dividing by " + fmt(b3) + " is not the issue in this work." },
      { t: "There is no error; expanding the brackets gives exactly that line.", fb: "Expanding gives " + fmt(a3) + "x + " + fmt(a3 * b3) + ", not " + fmt(a3) + "x + " + fmt(b3) + "." }
    ], sol3, { mode: "identify-error-distribute", a: a3, b: b3 });
}, ["Compare the student's first line with the original equation, term by term.", "Ask what the student did to each term, and whether the same was done to every term."]);
E("u5-pk-between", 5, ["8.24"], 1, "gen", function(){
  if(ri(0,1)===0){
    var t=ri(1,8), a=t/10+ri(0,3)/100, step=ri(3,6)/100, b=a+step;
    var c=a+ri(1,Math.round(step*100)-1)/100;
    var sol="Any number greater than "+fmtF(a,2)+" and less than "+fmtF(b,2)+" works. "+fmtF(c,2)+" sits between them. The answer is <b>"+fmtF(c,2)+"</b>.";
    return mcq("Which number lies between "+fmtF(a,2)+" and "+fmtF(b,2)+"?",
      {t:fmtF(c,2), fb:"Yes: "+fmtF(c,2)+" is greater than "+fmtF(a,2)+" and less than "+fmtF(b,2)+"."},
      [{t:fmtF(a-0.02,2), fb:"That number is smaller than "+fmtF(a,2)+", so it is outside the pair."},
       {t:fmtF(b+0.02,2), fb:"That number is larger than "+fmtF(b,2)+", so it is outside the pair."},
       {t:fmtF(b+0.07,2), fb:"That number is larger than "+fmtF(b,2)+", so it is outside the pair."}],
      sol, {mode:"dec", a:a, b:b});
  }
  var dens=[4,5,6,8,10], d=pick(dens), n=ri(1,d-2);
  var lo=[n,d], hi=[n+1,d], mid=u3simp(2*n+1,2*d);
  var below=u3simp(2*n-1,2*d), above=u3simp(2*n+3,2*d);
  var sol2="Use a common denominator of "+(2*d)+": the numbers are "+u3fr(2*n,2*d)+" and "+u3fr(2*n+2,2*d)+", so "+u3fr(mid[0],mid[1])+" lies between them. The answer is <b>"+u3fr(mid[0],mid[1])+"</b>.";
  return mcq("Which fraction lies between \\("+FR(lo[0],lo[1])+"\\) and \\("+FR(hi[0],hi[1])+"\\)?",
    {t:u3fr(mid[0],mid[1]), fb:"Yes: with denominator "+(2*d)+" it falls between the two given fractions."},
    [{t:u3fr(below[0],below[1]), fb:"That fraction is smaller than the first given fraction."},
     {t:u3fr(above[0],above[1]), fb:"That fraction is larger than the second given fraction."},
     {t:u3fr(lo[0],lo[1]), fb:"That is the endpoint itself, not a number between the pair."}],
    sol2, {mode:"frac", n:n, d:d});
}, ["A number between two numbers is larger than the smaller one and smaller than the larger one.", "Start by comparing each choice with both given numbers."]);
E("u5-pk-numberline-place", 5, ["8.24"], 1, "gen", function(){
  var dens=[3,4,5,6,7,8,9,10,11,12];
  var d=pick(dens), n=ri(1,d-1), p=n/d;
  var cx=30+270*p;
  var fig='<svg viewBox="0 0 330 78" width="330" height="78" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from 0 to 1 with a dot marked">'
    +'<line x1="30" y1="42" x2="300" y2="42" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<line x1="30" y1="36" x2="30" y2="48" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<line x1="165" y1="36" x2="165" y2="48" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<line x1="300" y1="36" x2="300" y2="48" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<circle cx="'+fmt(cx,1)+'" cy="42" r="5" fill="'+FIG_ACC+'"/>'
    +_txt(30,64,"0",12,false)+_txt(165,64,"1/2",12,false)+_txt(300,64,"1",12,false)
    +_txt(cx,18,"?",13,true)+'</svg>';
  var cand=[[n+1,d],[n-1,d],[d-n,d],[n,d+1],[n+1,d+2],[1,d],[n+2,d]];
  var seenV={}; seenV[fmt(p,6)]=1; var ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){
    var cn=cand[i][0],cd=cand[i][1];
    if(cn<=0||cd<=0)continue;
    var cv=cn/cd, key=fmt(cv,6);
    if(seenV[key])continue; seenV[key]=1;
    ds.push({t:"\\("+FR(cn,cd)+"\\)", fb:"That fraction marks a different point: compare its size with the benchmarks 0, 1/2 and 1."});
  }
  var q=mcq("The dot on the number line marks a number. Which fraction is at the dot?",
    {t:"\\("+FR(n,d)+"\\)", fb:"Yes: the dot sits at "+n+" of the "+d+" equal parts between 0 and 1."},
    ds,
    "The line from 0 to 1 is split into "+d+" equal parts and the dot is on part "+n+", so the dot marks "+u3fr(n,d)+". The answer is <b>"+u3fr(n,d)+"</b>.",
    {n:n,d:d});
  q.figure=fig;
  return q;
}, ["Use the benchmarks 0, 1/2 and 1 to narrow down where the dot sits.", "Start by deciding which half of the line the dot is in, then count equal parts."]);
E("u5-pk-misplaced", 5, ["8.24"], 2, "var", varset([
  function(){ return mcq("The numbers 0.3, \\("+FR(2,5)+"\\), 0.35, \\("+FR(3,4)+"\\) were meant to be in ascending order. Which number is incorrectly placed?",
    {t:"0.35", fb:"Yes: 0.35 is less than 2/5 = 0.4, so it should come before 2/5."},
    [{t:"0.30", fb:"0.3 is the smallest value, so it belongs first."},
     {t:"\\("+FR(2,5)+"\\)", fb:"2/5 = 0.4 belongs after 0.35 and before 0.75; it is not the misplaced one."},
     {t:"\\("+FR(3,4)+"\\)", fb:"3/4 = 0.75 is the largest value, so it belongs last."}],
    "As decimals the values are 0.3, 0.4, 0.35, 0.75. The value 0.35 drops below the one before it, so <b>0.35</b> is incorrectly placed.", {s:1}); },
  function(){ return mcq("The numbers \\("+FR(1,4)+"\\), 0.3, \\("+FR(3,5)+"\\), 0.55 were meant to be in ascending order. Which number is incorrectly placed?",
    {t:"0.55", fb:"Yes: 0.55 is less than 3/5 = 0.6, so it should come before 3/5."},
    [{t:"\\("+FR(1,4)+"\\)", fb:"1/4 = 0.25 is the smallest value, so it belongs first."},
     {t:"0.30", fb:"0.3 sits between 0.25 and 0.6, so its place is fine."},
     {t:"\\("+FR(3,5)+"\\)", fb:"3/5 = 0.6 belongs before 0.55 in a correct list; the error is 0.55 after it."}],
    "As decimals the values are 0.25, 0.3, 0.6, 0.55. The value 0.55 drops below the one before it, so <b>0.55</b> is incorrectly placed.", {s:2}); },
  function(){ return mcq("The numbers 0.15, \\("+FR(1,5)+"\\), 0.28, \\("+FR(1,4)+"\\) were meant to be in ascending order. Which number is incorrectly placed?",
    {t:"\\("+FR(1,4)+"\\)", fb:"Yes: 1/4 = 0.25 is less than 0.28, so it should come before 0.28."},
    [{t:"0.15", fb:"0.15 is the smallest value, so it belongs first."},
     {t:"\\("+FR(1,5)+"\\)", fb:"1/5 = 0.2 sits between 0.15 and 0.28, so its place is fine."},
     {t:"0.28", fb:"0.28 belongs before 1/4 in a correct list; the error is 1/4 after it."}],
    "As decimals the values are 0.15, 0.2, 0.28, 0.25. The value 0.25 drops below the one before it, so <b>1/4</b> is incorrectly placed.", {s:3}); },
  function(){ return mcq("The numbers \\("+FR(3,8)+"\\), 0.42, \\("+FR(1,2)+"\\), 0.48 were meant to be in ascending order. Which number is incorrectly placed?",
    {t:"0.48", fb:"Yes: 0.48 is less than 1/2 = 0.5, so it should come before 1/2."},
    [{t:"\\("+FR(3,8)+"\\)", fb:"3/8 = 0.375 is the smallest value, so it belongs first."},
     {t:"0.42", fb:"0.42 sits between 0.375 and 0.5, so its place is fine."},
     {t:"\\("+FR(1,2)+"\\)", fb:"1/2 = 0.5 belongs before 0.48 in a correct list; the error is 0.48 after it."}],
    "As decimals the values are 0.375, 0.42, 0.5, 0.48. The value 0.48 drops below the one before it, so <b>0.48</b> is incorrectly placed.", {s:4}); },
  function(){ return mcq("The numbers 0.62, \\("+FR(7,10)+"\\), 0.68, \\("+FR(4,5)+"\\) were meant to be in ascending order. Which number is incorrectly placed?",
    {t:"0.68", fb:"Yes: 0.68 is less than 7/10 = 0.7, so it should come before 7/10."},
    [{t:"0.62", fb:"0.62 is the smallest value, so it belongs first."},
     {t:"\\("+FR(7,10)+"\\)", fb:"7/10 = 0.7 belongs before 0.68 in a correct list; the error is 0.68 after it."},
     {t:"\\("+FR(4,5)+"\\)", fb:"4/5 = 0.8 is the largest value, so it belongs last."}],
    "As decimals the values are 0.62, 0.7, 0.68, 0.8. The value 0.68 drops below the one before it, so <b>0.68</b> is incorrectly placed.", {s:5}); },
  function(){ return mcq("The numbers 0.9, \\("+FR(4,5)+"\\), 0.85, \\("+FR(1,2)+"\\) were meant to be in descending order. Which number is incorrectly placed?",
    {t:"0.85", fb:"Yes: in descending order 0.85 should come before 4/5 = 0.8, not after it."},
    [{t:"0.90", fb:"0.9 is the largest value, so it belongs first in descending order."},
     {t:"\\("+FR(4,5)+"\\)", fb:"4/5 = 0.8 belongs after 0.85 in a correct list; the error is 0.85 after it."},
     {t:"\\("+FR(1,2)+"\\)", fb:"1/2 = 0.5 is the smallest value, so it belongs last."}],
    "As decimals the values are 0.9, 0.8, 0.85, 0.5. In descending order each value should drop, but 0.85 rises above 0.8, so <b>0.85</b> is incorrectly placed.", {s:6}); }
]), ["Convert each number to a decimal and watch for the place where the order breaks.", "Start by writing the decimal value of each fraction in the list."]);
E("u6-pk-pattern-expression", 6, ["7.1"], 2, "gen", function(){
  var a0=0,d=0,g=0,corr="",cand=[];
  while(g++<400){ a0=ri(2,14); d=ri(2,7); corr=u1Expr(d,a0-d); cand=[u1Expr(d,a0),u1Expr(a0,d),u1Expr(d,-(a0-d))];
    if(a0!==d&&(a0-d)!==0&&new Set([corr].concat(cand)).size===4)break; }
  var terms=[a0,a0+d,a0+2*d,a0+3*d];
  return mcq("A pattern starts \\("+terms.join(", ")+", \\ldots\\) Which expression gives the value of the term in position \\(n\\)?",
    {t:corr, fb:"Correct: each step adds "+d+", and the first term fits "+corr+" at n = 1."},
    cand.map(function(s,i){ return {t:s, fb: i===0?("That uses the first term, "+a0+", as the constant; check it at n = 1, where it gives "+(d+a0)+" instead of "+a0+"."):
      i===1?("That swaps the roles: "+a0+" is the starting value, not the step size."):("That has the wrong sign on the constant; check it at n = 1.")}; }),
    "\\[ \\begin{aligned} \\text{term} &= "+a0+" + (n-1) \\times "+d+" \\\\ &= "+u1Expr(d,a0-d)+" \\end{aligned} \\] The answer is <b>"+corr+"</b>.",
    {a0:a0,d:d});
}, ["Find the step size first; it becomes the number multiplied by n.", "Start by writing first term plus (n minus 1) lots of the step, then simplify."]);
E("u6-pk-two-points-evaluate", 6, ["7.4"], 2, "gen", function(){
  var m=pick([-4,-3,-2,-1,1,2,3,4]);
  var b=ri(-8,10);
  var x1=ri(-2,3), dx=ri(2,4), x2=x1+dx;
  var y1=m*x1+b, y2=m*x2+b;
  var x3=(Math.random()<0.5)?(x2+ri(1,4)):(x1-ri(1,3));
  var ans=m*x3+b;
  return numq("A linear relation passes through the points ("+x1+", "+y1+") and ("+x2+", "+y2+"). What is the y-value of this relation when x = "+x3+"?", ans, 0.01,
    "First extract the rate of change from the two points: \\[ \\begin{aligned} \\text{rate} &= \\frac{"+y2+" - "+u2sg(y1)+"}{"+x2+" - "+u2sg(x1)+"} \\\\ &= \\frac{"+(y2-y1)+"}{"+(x2-x1)+"} \\\\ &= "+m+" \\end{aligned} \\] The relation is \\(y = "+fmt(m)+"x + "+u2sg(b)+"\\), so at \\(x = "+x3+"\\): \\(y = "+fmt(m)+" \\times "+u2sg(x3)+" + "+u2sg(b)+" = "+ans+"\\). The answer is <b>"+ans+"</b>.",
    {mode:"two-points-evaluate", x1:x1, y1:y1, x2:x2, y2:y2, x3:x3});
}, ["The two points hide the rate of change, which must be recovered before the relation can be used.", "Find the rate of change from the two points first, then build the relation and substitute the new x."]);
E("u6-pk-table-missing", 6, ["7.4"], 1, "gen", function () {
  var m = ri(2, 6), b = ri(1, 9), qx = ri(0, 4);
  var xs = [0, 1, 2, 3, 4];
  var ys = xs.map(function (x) { return m * x + b; });
  var shown = ys.map(function (y, i) { return i === qx ? "?" : fmt(y); });
  var ans = ys[qx];
  var sol = "Substitute each \\(x\\) value into \\(y = " + fmt(m) + "x + " + fmt(b) + "\\). For the missing entry, \\(x = " + qx + "\\): \\[ \\begin{aligned} y &= " + fmt(m) + "(" + qx + ") + " + fmt(b) + " \\\\ &= " + fmt(m * qx) + " + " + fmt(b) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the missing table value is <b>" + fmt(ans) + "</b>.";
  var prompt = "A table of values is made from the equation \\(y = " + fmt(m) + "x + " + fmt(b) + "\\).<br>x: " + xs.join(", ") + "<br>y: " + shown.join(", ") + "<br>What is the missing y value?";
  return numq(prompt, ans, 0.01, sol, { mode: "table-missing-value", m: m, b: b, qx: qx });
}, ["Each y value comes from substituting its x value into the equation.", "Multiply the missing row's x value by the coefficient, then add the constant."]);
E("u6-pk-missing-pair", 6, ["7.4"], 1, "gen", function () {
  var m = ri(2, 7), b = ri(-4, 9);
  var x = ri(1, 9), y = m * x + b;
  var sol = "Substitute \\(x = " + x + "\\) into the equation: \\[ \\begin{aligned} y &= " + fmt(m) + "(" + x + ")" + u6sgn(b) + " \\\\ &= " + fmt(m * x) + u6sgn(b) + " \\\\ &= " + fmt(y) + " \\end{aligned} \\] So the missing value in the pair \\((" + x + ", \\ ?)\\) is <b>" + fmt(y) + "</b>.";
  return numq("The ordered pair \\((" + x + ", \\ ?)\\) lies on the relation \\(y = " + fmt(m) + "x" + u6sgn(b) + "\\). What is the missing y value?", y, 0.01, sol,
    { mode: "missing-pair-y", m: m, b: b, x: x });
}, ["An ordered pair on a relation must satisfy its equation when the known value is substituted.", "Substitute the known coordinate, then solve the small equation that remains."]);
E("u6-pk-construct-graph", 6, ["7.7"], 1, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var m = ri(2, 6), b = ri(1, 8);
    if (m === b) continue;
    var win = pick([[0, 1, 2, 3], [1, 2, 3, 4], [0, 1, 2, 3, 4], [2, 3, 4, 5]]);
    function setStr(mm, bb) { var p = []; for (var k = 0; k < win.length; k++) p.push("(" + win[k] + ", " + fmt(mm * win[k] + bb) + ")"); return p.join(", "); }
    var corr = setStr(m, b);
    var ds = u6pick3(corr, [
      { t: setStr(b, m), fb: "That set comes from swapping the step and the start. Check the point where x = 0: its y value should be " + fmt(b) + "." },
      { t: setStr(m, -b), fb: "That set subtracts the start value. At x = 0 the equation gives y = " + fmt(b) + ", a positive value." },
      { t: setStr(m + 1, b), fb: "That set uses a step of " + fmt(m + 1) + ". The equation's step is the number multiplying x, which is " + fmt(m) + "." },
      { t: setStr(m, b + m), fb: "That set starts one step too high. At x = 0 the y value is the start, " + fmt(b) + ", not " + fmt(b + m) + "." }
    ]);
    if (!ds) continue;
    var lines = win.map(function (xv) { return "x=" + xv + "&:\\ y = " + fmt(m * xv + b); }).join(" \\\\ ");
    var sol = "Substitute each \\(x\\) value into \\(y = " + fmt(m) + "x + " + fmt(b) + "\\): \\[ \\begin{aligned} " + lines + " \\end{aligned} \\] Plotting those values gives the point set <b>" + corr + "</b>.";
    return mcq("A graph of the relation \\(y = " + fmt(m) + "x + " + fmt(b) + "\\) is constructed by plotting points for \\(x = " + win.join(", ") + "\\). Which set of points is plotted?",
      { t: corr, fb: "Correct. Each point comes from substituting its x value into the equation." }, ds, sol,
      { mode: "construct-graph-points", m: m, b: b });
  }
  return mcq("A graph of the relation \\(y = 2x + 3\\) is constructed by plotting points for \\(x = 0, 1, 2, 3\\). Which set of points is plotted?",
    { t: "(0, 3), (1, 5), (2, 7), (3, 9)", fb: "Correct. Each point comes from substituting its x value into the equation." },
    [{ t: "(0, 2), (1, 5), (2, 8), (3, 11)", fb: "That set swaps the step and the start." }, { t: "(0, -3), (1, -1), (2, 1), (3, 3)", fb: "That set subtracts the start value." }, { t: "(0, 3), (1, 6), (2, 9), (3, 12)", fb: "That set uses a step of 3 instead of 2." }],
    "Substitute each x value: \\[ \\begin{aligned} x=0&:\\ y = 3 \\\\ x=1&:\\ y = 5 \\\\ x=2&:\\ y = 7 \\\\ x=3&:\\ y = 9 \\end{aligned} \\] The plotted set is <b>(0, 3), (1, 5), (2, 7), (3, 9)</b>.", { mode: "construct-graph-points-fallback" });
}, ["Build the points one at a time by substituting x = 0, 1, 2, 3 into the equation.", "The point at x = 0 always has y equal to the start value in the equation."]);
E("u6-pk-describe-graph", 6, ["7.7"], 2, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var ctx = pick([
      { xl: "guests", yl: "cost ($)", thing: "total cost in dollars", per: "guest" },
      { xl: "hours", yl: "distance (km)", thing: "distance in kilometres", per: "hour" },
      { xl: "weeks", yl: "savings ($)", thing: "savings in dollars", per: "week" }
    ]);
    var b = ri(0, 8), m = ri(2, 6);
    var xmax = 5, ymax = b + m * xmax;
    var pts = []; for (var k = 0; k <= xmax; k++) pts.push([k, b + m * k]);
    var corr = "As the x value grows by 1, the " + ctx.thing + " grows by " + fmt(m) + ", starting from " + fmt(b) + ".";
    var ds = u6pick3(corr, [
      { t: "As the x value grows by 1, the " + ctx.thing + " grows by " + fmt(b) + ", starting from " + fmt(m) + ".", fb: "That swaps the start and the step. The first point sits at " + fmt(b) + ", and neighbouring points rise by " + fmt(m) + "." },
      { t: "As the x value grows by 1, the " + ctx.thing + " grows by " + fmt(m + 1) + ", starting from " + fmt(b) + ".", fb: "The start is right, but compare two neighbouring points: the rise is " + fmt(m) + ", not " + fmt(m + 1) + "." },
      { t: "As the x value grows by 1, the " + ctx.thing + " shrinks by " + fmt(m) + ", starting from " + fmt(b) + ".", fb: "The points rise as x grows, so the values grow; they do not shrink." },
      { t: "As the x value grows by " + fmt(m) + ", the " + ctx.thing + " grows by 1, starting from " + fmt(b) + ".", fb: "That reverses the roles of the step and the x change. Read across one step in x and check the rise in y." }
    ]);
    if (!ds) continue;
    var sol = "Read the first point and the rise between neighbouring points: \\[ \\begin{aligned} \\text{start} &= " + fmt(b) + " \\\\ \\text{step} &= " + fmt(b + m) + " - " + fmt(b) + " = " + fmt(m) + " \\end{aligned} \\] So the relationship is <b>" + corr + "</b>";
    var q = mcq("The graph shows a linear relation as separate points. The x-axis is measured in " + ctx.xl + " and the y-axis in " + ctx.yl + ". Which sentence describes the relationship between the variables?",
      { t: corr, fb: "Correct. The first point gives the start and the steady rise gives the step." }, ds, sol,
      { mode: "describe-graph", b: b, m: m, ctx: ctx.xl });
    q.figure = u6graphPts({ xmax: xmax, ymax: ymax, xlab: ctx.xl, ylab: ctx.yl, points: pts });
    return q;
  }
  var qf = mcq("The graph shows a linear relation as separate points. The x-axis is measured in hours and the y-axis in distance (km). Which sentence describes the relationship between the variables?",
    { t: "As the x value grows by 1, the distance in kilometres grows by 3, starting from 2.", fb: "Correct. The first point gives the start and the steady rise gives the step." },
    [{ t: "As the x value grows by 1, the distance in kilometres grows by 2, starting from 3.", fb: "That swaps the start and the step." }, { t: "As the x value grows by 1, the distance in kilometres grows by 4, starting from 2.", fb: "The rise between neighbouring points is 3, not 4." }, { t: "As the x value grows by 1, the distance in kilometres shrinks by 3, starting from 2.", fb: "The points rise, so the values grow." }],
    "The first point is 2 and neighbouring points rise by 3, so the relationship is <b>as x grows by 1, the distance grows by 3, starting from 2</b>.", { mode: "describe-graph-fallback" });
  var pf = []; for (var k2 = 0; k2 <= 5; k2++) pf.push([k2, 2 + 3 * k2]);
  qf.figure = u6graphPts({ xmax: 5, ymax: 17, xlab: "hours", ylab: "distance (km)", points: pf });
  return qf;
}, ["Start with the point where x is 0: that is the starting value of the relation.", "Compare two neighbouring points to find how much y changes for each step of 1 in x."]);
E("u6-pk-solve-div-plus", 6, ["8.23"], 2, "gen", function () {
  var a = ri(2, 8), b = ri(1, 12), d = ri(2, 11), x = a * d, c = d + b;
  var sol = "Subtract first, then undo the division by multiplying: \\[ \\begin{aligned} \\frac{x}{" + a + "} + " + fmt(b) + " &= " + fmt(c) + " \\\\ \\frac{x}{" + a + "} &= " + fmt(c) + " - " + fmt(b) + " \\\\ \\frac{x}{" + a + "} &= " + fmt(d) + " \\\\ x &= " + fmt(d) + " \\times " + fmt(a) + " \\\\ x &= " + fmt(x) + " \\end{aligned} \\] Check: \\(\\frac{" + fmt(x) + "}{" + a + "} + " + fmt(b) + " = " + fmt(d) + " + " + fmt(b) + " = " + fmt(c) + "\\). So the solution is <b>\\(x = " + fmt(x) + "\\)</b>.";
  return numq("Solve the equation \\(\\frac{x}{" + a + "} + " + fmt(b) + " = " + fmt(c) + "\\). What is the value of x?", x, 0.01, sol,
    { mode: "solve-div-plus", a: a, b: b, d: d });
}, ["Work in reverse order: deal with the added number before the division.", "Subtract the constant from both sides, then multiply both sides by the divisor."]);
E("u6-pk-solve-context", 6, ["8.23"], 2, "gen", function () {
  var a = ri(2, 9), b = ri(4, 25), x = ri(3, 14), c = a * x + b;
  var ctx = pick([
    { q: "A school rents a bus for a field trip. The rental costs a $" + b + " booking fee plus $" + a + " for each kilometre driven. The total bill was $" + c + ". How many kilometres did the bus drive?", unit: "kilometres" },
    { q: "A community hall charges a $" + b + " setup fee plus $" + a + " for each table rented. A group paid $" + c + " in total. How many tables did the group rent?", unit: "tables" },
    { q: "A bike shop charges a $" + b + " service fee plus $" + a + " for each gear adjusted. A customer paid $" + c + " in total. How many gears were adjusted?", unit: "gears" }
  ]);
  var sol = "Let \\(x\\) be the number of " + ctx.unit + ". The fee is paid once and the $" + a + " charge is paid \\(x\\) times: \\[ \\begin{aligned} " + fmt(a) + "x + " + fmt(b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(c - b) + " \\\\ x &= " + fmt(x) + " \\end{aligned} \\] So the answer is <b>" + fmt(x) + " " + ctx.unit + "</b>.";
  return numq(ctx.q, x, 0.01, sol, { mode: "solve-context-problem", a: a, b: b, c: c, unit: ctx.unit });
}, ["Write an equation first: one-time fee plus per-unit charge times the unknown, equal to the total.", "Subtract the fee from the total, then divide what is left by the per-unit charge."]);
E("u7-pk-two-term-ratio", 7, ["10.16"], 1, "gen", function () {
  var ctxs = [
    { a: "red counters", b: "blue counters" }, { a: "girls", b: "boys" }, { a: "wins", b: "losses" },
    { a: "apples", b: "oranges" }, { a: "dogs", b: "cats" }, { a: "cars", b: "trucks" },
    { a: "forwards", b: "defenders" }, { a: "novels", b: "magazines" }
  ];
  var cx = pick(ctxs), a = ri(2, 15), b = ri(2, 15), att = 0;
  while (u5gcd(a, b) !== 1 && att < 60) { a = ri(2, 15); b = ri(2, 15); att++; }
  if (u5gcd(a, b) !== 1) { a = 3; b = 5; }
  var corr = a + ":" + b;
  var cands = [
    { t: b + ":" + a, fb: "That reverses the order; the ratio is asked as " + cx.a + " to " + cx.b + "." },
    { t: a + ":" + (a + b), fb: "That compares the first group with the total; the question asks for the first group to the second group." },
    { t: b + ":" + (a + b), fb: "That compares the second group with the total, not the two groups with each other." },
    { t: (a + b) + ":" + b, fb: "That puts the total first; a two-term ratio here compares the two named groups only." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Match the counts in the order named: \\[ \\begin{aligned} " + cx.a + " : " + cx.b + " &= " + a + " : " + b + " \\end{aligned} \\] So the ratio of " + cx.a + " to " + cx.b + " is <b>" + corr + "</b>.";
  return mcq("A group has " + a + " " + cx.a + " and " + b + " " + cx.b + ". What is the ratio of " + cx.a + " to " + cx.b + "?", { t: corr, fb: "Correct: the counts are written in the order the groups are named." }, ds, sol, { mode: "two-term", a: a, b: b });
}, ["A ratio keeps the order of the groups exactly as they are named in the question.", "First write the count for the group named first, then the count for the group named second."]);
E("u7-pk-ratio-simplest", 7, ["10.16"], 1, "gen", function () {
  var ctxs = [
    { s: "A cafeteria tray count finds {A} juice boxes and {B} milk cartons on the lunch line.", a: "juice boxes", b: "milk cartons" },
    { s: "A pet survey counts {A} dogs and {B} cats in one neighbourhood.", a: "dogs", b: "cats" },
    { s: "A parking lot count finds {A} cars and {B} pickup trucks before a game.", a: "cars", b: "pickup trucks" },
    { s: "A class library audit counts {A} picture books and {B} chapter books on one shelf.", a: "picture books", b: "chapter books" },
    { s: "A rink canteen sells {A} hot chocolates and {B} teas during intermission.", a: "hot chocolates", b: "teas" },
    { s: "A trail group counts {A} adults and {B} youth on a Saturday hike.", a: "adults", b: "youth" }
  ];
  var cx = pick(ctxs);
  var basePairs = [[2, 3], [3, 4], [4, 5], [5, 6], [3, 5], [5, 7], [2, 5], [4, 7], [5, 3], [7, 4], [3, 2], [5, 4]];
  var bp = pick(basePairs), m = ri(2, 6), A = bp[0] * m, B = bp[1] * m;
  var corr = bp[0] + ":" + bp[1];
  var cands = [
    { t: A + ":" + B, fb: "That is the ratio with the raw counts; the question asks for simplest form, so divide both terms by " + m + "." },
    { t: bp[1] + ":" + bp[0], fb: "That reverses the two groups; the order must stay as named in the example." },
    { t: bp[0] + ":" + (bp[0] + bp[1]), fb: "That compares the first group with the total; a ratio here compares the two groups with each other." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Record the counts as a ratio, then divide both terms by their common factor: \\[ \\begin{aligned} " + cx.a + " : " + cx.b + " &= " + A + " : " + B + " \\\\ &= " + corr.replace(/:/g, " : ") + " \\end{aligned} \\] So the ratio in simplest form is <b>" + corr + "</b>.";
  return mcq(cx.s.replace("{A}", A).replace("{B}", B) + " What is the ratio of " + cx.a + " to " + cx.b + ", in simplest form?", { t: corr, fb: "Correct: the counts keep their order and both terms are divided by the same common factor." }, ds, sol, { mode: "identify-ratio", a: A, b: B });
}, ["Real-life counts become a ratio first, and simplest form divides both terms by the same number.", "First write the ratio with the counted amounts, in the order named."]);
E("u7-pk-ratio-problem", 7, ["10.16"], 2, "gen", function () {
  if (Math.random() < 0.5) {
    var pairs = [[2, 3], [3, 5], [2, 5], [3, 4], [4, 7], [5, 3]];
    var pr = pick(pairs), a = pr[0], b = pr[1], s = ri(2, 9), given = a * s, ans = b * s;
    var ctxs = [
      "Paint is mixed in the ratio " + a + ":" + b + " of blue paint to white paint. A batch uses " + given + " L of blue paint. How many litres of white paint does the batch use?",
      "A smoothie recipe uses berries and yogurt in the ratio " + a + ":" + b + ". A large batch uses " + given + " cups of berries. How many cups of yogurt does the large batch use?",
      "Trail mix has peanuts and raisins in the ratio " + a + ":" + b + ". A bag is made with " + given + " g of peanuts. How many grams of raisins are in the bag?"
    ];
    var prompt = pick(ctxs);
    var sol = "Each ratio part stands for the same scale amount: \\[ \\begin{aligned} \\text{scale} &= " + given + " \\div " + a + " = " + s + " \\\\ \\text{second amount} &= " + b + " \\times " + s + " = " + ans + " \\end{aligned} \\] So the second amount is <b>" + ans + "</b>.";
    return numq(prompt, ans, 0.01, sol, { mode: "ratio-scale", a: a, b: b });
  }
  var pairs2 = [[3, 2], [5, 3], [4, 3], [7, 5], [3, 5], [5, 2]];
  var pr2 = pick(pairs2), a2 = pr2[0], b2 = pr2[1], s2 = ri(2, 8), tot = (a2 + b2) * s2, ans2 = a2 * s2;
  var ctxs2 = [
    "Two cousins share " + tot + " stickers in the ratio " + a2 + ":" + b2 + ", with the older cousin getting the first share. How many stickers does the older cousin get?",
    "A " + tot + " cm ribbon is cut into two pieces in the ratio " + a2 + ":" + b2 + ". How long is the first piece, in centimetres?",
    "A class fund of $" + tot + " is split between a field trip and supplies in the ratio " + a2 + ":" + b2 + ", with the field trip getting the first share. How many dollars go to the field trip?"
  ];
  var prompt2 = pick(ctxs2);
  var sol2 = "Add the ratio parts to find the value of one part, then take the first share: \\[ \\begin{aligned} \\text{one part} &= " + tot + " \\div " + (a2 + b2) + " = " + s2 + " \\\\ \\text{first share} &= " + a2 + " \\times " + s2 + " = " + ans2 + " \\end{aligned} \\] So the first share is <b>" + ans2 + "</b>.";
  return numq(prompt2, ans2, 0.01, sol2, { mode: "ratio-share", a: a2, b: b2 });
}, ["Work out the value of one ratio part first; every part in the ratio has that same value.", "First find the scale or the value of one part from the amount you are given."]);
E("u7-pk-rate-problem", 7, ["10.16"], 2, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var u = ri(12, 28), h1 = ri(3, 9), h2 = ri(10, 20); if (h2 === h1) h2 += 3;
    var earned = u * h1, ans = u * h2;
    var sol = "Find the unit rate first, then use it for the new time: \\[ \\begin{aligned} \\text{unit rate} &= " + earned + " \\div " + h1 + " = " + u + " \\text{ dollars per hour} \\\\ \\text{new earnings} &= " + u + " \\times " + h2 + " = " + ans + " \\end{aligned} \\] So the earnings are <b>$" + ans + "</b>.";
    return numq("Sam earned $" + earned + " for " + h1 + " h of work at a steady rate. At the same rate, how much will Sam earn for " + h2 + " h of work, in dollars?", ans, 0.01, sol, { mode: "rate-earn", u: u });
  }
  if (mode === 1) {
    var sp = pick([40, 50, 60, 70, 80, 90, 100]), t1 = ri(2, 5), D = sp * ri(3, 7), ansT = D / sp;
    var dist1 = sp * t1;
    var sol2 = "The speed is the unit rate, and time is distance divided by that rate: \\[ \\begin{aligned} \\text{time} &= " + D + " \\div " + sp + " = " + ansT + " \\text{ h} \\end{aligned} \\] So the trip takes <b>" + ansT + " h</b>.";
    return numq("A bus travels at a steady speed. It covers " + dist1 + " km in " + t1 + " h. At the same speed, how many hours will it take to travel " + D + " km?", ansT, 0.01, sol2, { mode: "rate-speed", sp: sp });
  }
  var u3 = ri(3, 12), m1 = ri(2, 8), m2 = ri(9, 20), vol = u3 * m1, ans3 = u3 * m2;
  var sol3 = "Find the flow per minute first, then multiply by the new time: \\[ \\begin{aligned} \\text{unit rate} &= " + vol + " \\div " + m1 + " = " + u3 + " \\text{ L per min} \\\\ \\text{new volume} &= " + u3 + " \\times " + m2 + " = " + ans3 + " \\end{aligned} \\] So the volume is <b>" + ans3 + " L</b>.";
  return numq("A hose delivers " + vol + " L of water in " + m1 + " min at a steady rate. At the same rate, how many litres will it deliver in " + m2 + " min?", ans3, 0.01, sol3, { mode: "rate-flow", u: u3 });
}, ["Every rate problem starts from the unit rate: the amount for one unit of the second quantity.", "First divide to get the amount per single hour, kilometre or minute in the problem."]);
E("u7-pk-translate", 7, ["10.12"],1,"gen",function(){
  var x=ri(-6,4),y=ri(-6,4);var dx=pick([-4,-3,-2,-1,1,2,3,4]);var dy=pick([-4,-3,-2,-1,1,2,3,4]);
  var nx=x+dx,ny=y+dy;var askX=Math.random()<0.5;
  var ans=askX?nx:ny;
  var q=numq("Point P "+u8pair(x,y)+" is translated "+u8moveText(dx,dy)+". What is the "+(askX?"x":"y")+"-coordinate of the image point?",
    ans,0,
    "Apply the translation to each coordinate. \\[ \\begin{aligned} \\text{image} &= ("+x+" + ("+dx+"), "+y+" + ("+dy+")) \\\\ &= "+u8pair(nx,ny)+" \\end{aligned} \\] The "+(askX?"x":"y")+"-coordinate is <b>"+ans+"</b>.",{mode:askX?"tx":"ty"}); q.figure=figWideGrid([{x:x,y:y,label:"P"}],null,null); return q;
},["A translation adds to the x-coordinate for left or right moves and to the y-coordinate for up or down moves.","Start by working out how the asked coordinate changes."]);
E("u7-pk-reflect-point", 7, ["10.12"],1,"gen",function(){
  var x=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);var y=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);
  var overX=Math.random()<0.5;var axis=overX?"x-axis":"y-axis";
  var img=overX?[x,-y]:[-x,y];var other=overX?[-x,y]:[x,-y];
  var correct=u8pair(img[0],img[1]);
  var raw=[u8pair(x,y),u8pair(other[0],other[1]),u8pair(-x,-y)];
  var ds=raw.map(function(t,i){return {t:t,fb:i===0?"That is the original point; a reflection moves it across the axis.":(i===1?"That is a reflection across the other axis; check which axis the question names.":"That flips both coordinates, which is a half-turn, not a single-axis reflection.")};});
  var q=mcq("Point P "+u8pair(x,y)+" is reflected across the "+axis+". What are the coordinates of the image?",
    {t:correct,fb:"Yes: reflection across the "+axis+" flips the sign of the "+(overX?"y":"x")+"-coordinate only."},ds,
    "Reflecting across the "+axis+" changes the sign of the "+(overX?"y":"x")+"-coordinate and leaves the other alone: "+u8pair(x,y)+" becomes <b>"+correct+"</b>.",{mode:overX?"rx":"ry"});
  q.figure=u8gridSVG([{x:x,y:y,label:"P"}],null,null);
  return q;
},["Reflection across the x-axis flips the y sign; across the y-axis flips the x sign.","Start by deciding which coordinate changes sign for the named axis."]);
E("u7-pk-transform-describe", 7, ["10.12"],1,"gen",function(){
  var type=pick(["translate","reflectX","reflectY"]);
  var px=pick([-4,-3,-2,-1,1,2,3,4]);var py=pick([-4,-3,-2,-1,1,2,3,4]);
  var qx=px+pick([-3,-2,2,3]);var qy=py+pick([-3,-2,2,3]);if(qx>5||qx<-5)qx=px-2;if(qy>5||qy<-5)qy=py-2;
  var P=[px,py],Q=[qx,qy],P2,Q2,correct;
  function transText(dx,dy){return "Translation: "+u8moveText(dx,dy);}
  var opts=[];
  if(type==="translate"){var dx=pick([-3,-2,-1,1,2,3]);var dy=pick([-3,-2,-1,1,2,3]);if(Math.abs(dx)===Math.abs(dy))dy=dy>0?dy+1:dy-1;
    P2=[px+dx,py+dy];Q2=[qx+dx,qy+dy];correct=transText(dx,dy);
    opts=[{t:transText(dy,dx),fb:"That swaps the horizontal and vertical changes; check the change in x first."},{t:"Reflection across the x-axis",fb:"A reflection would flip the sign of the y-coordinates; here both points shift by the same amounts instead."},{t:"Reflection across the y-axis",fb:"A reflection would flip the sign of the x-coordinates; here both points shift by the same amounts instead."}];
  } else if(type==="reflectX"){P2=[px,-py];Q2=[qx,-qy];correct="Reflection across the x-axis";
    opts=[{t:"Reflection across the y-axis",fb:"That would flip the x signs; here the y signs flipped and the x values stayed."},{t:transText(P2[0]-px,P2[1]-py),fb:"That translation fits point P alone, but it does not carry Q to its image; check both vertices."},{t:transText(Q2[0]-qx,Q2[1]-qy),fb:"That translation fits point Q alone, but it does not carry P to its image; check both vertices."}];
    if(opts[1].t===opts[2].t)opts[2]={t:transText(1,P2[1]-py),fb:"Check both vertices: a single translation must move every vertex by the same change."};
  } else {P2=[-px,py];Q2=[-qx,qy];correct="Reflection across the y-axis";
    opts=[{t:"Reflection across the x-axis",fb:"That would flip the y signs; here the x signs flipped and the y values stayed."},{t:transText(P2[0]-px,P2[1]-py),fb:"That translation fits point P alone, but it does not carry Q to its image; check both vertices."},{t:transText(Q2[0]-qx,Q2[1]-qy),fb:"That translation fits point Q alone, but it does not carry P to its image; check both vertices."}];
    if(opts[1].t===opts[2].t)opts[2]={t:transText(P2[0]-px,1),fb:"Check both vertices: a single translation must move every vertex by the same change."};
  }
  var seen={};seen[correct]=1;var ds=[];
  opts.forEach(function(o){if(!seen[o.t]){seen[o.t]=1;ds.push(o);}});
  var filler=type==="translate"?"Reflection across the origin":"Translation: "+u8moveText(1,1);
  while(ds.length<3){if(!seen[filler]){seen[filler]=1;ds.push({t:filler,fb:"Test the description on both vertices; it must carry each one to its image."});}else filler="Translation: "+u8moveText(2,1);}
  var q=mcq("A two-vertex design has vertices P "+u8pair(P[0],P[1])+" and Q "+u8pair(Q[0],Q[1])+". After a transformation, the images are P' "+u8pair(P2[0],P2[1])+" and Q' "+u8pair(Q2[0],Q2[1])+". Which transformation describes the change?",
    {t:correct,fb:"Yes: applying it to both P and Q gives exactly the image vertices."},ds,
    "Test each vertex. P "+u8pair(P[0],P[1])+" goes to "+u8pair(P2[0],P2[1])+" and Q "+u8pair(Q[0],Q[1])+" goes to "+u8pair(Q2[0],Q2[1])+", which matches: <b>"+correct+"</b>.",{mode:type}); q.figure=figWideGrid([{x:P[0],y:P[1],label:"P"},{x:Q[0],y:Q[1],label:"Q"},{x:P2[0],y:P2[1],label:"P'"},{x:Q2[0],y:Q2[1],label:"Q'"}],[[P,Q],[P2,Q2]],null); return q;
},["Test a description on every vertex, not just one: a transformation must fit them all.","Start by comparing the first vertex with its image, then confirm with the second."]);
E("u7-pk-tess-transform", 7, ["10.3"], 1, "gen", function () {
  var mode = pick(["translation", "reflection", "rotation"]);
  var s = ri(26, 34), gap = ri(14, 22);
  // Asymmetric tile: a right triangle with a dot near its right-angle corner.
  function tile(cx, cy, kind) {
    var pts;
    if (kind === "base") pts = [[cx - s / 2, cy + s / 2], [cx + s / 2, cy + s / 2], [cx - s / 2, cy - s / 2]];
    if (kind === "mirror") pts = [[cx - s / 2, cy + s / 2], [cx + s / 2, cy + s / 2], [cx + s / 2, cy - s / 2]];
    if (kind === "rot") pts = [[cx + s / 2, cy - s / 2], [cx - s / 2, cy - s / 2], [cx + s / 2, cy + s / 2]];
    var dot = kind === "base" ? [cx - s / 2 + 7, cy + s / 2 - 7] : (kind === "mirror" ? [cx + s / 2 - 7, cy + s / 2 - 7] : [cx + s / 2 - 7, cy - s / 2 + 7]);
    return '<polygon points="' + pts.map(function (p) { return fmt(p[0], 1) + "," + fmt(p[1], 1); }).join(" ") + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="2"/><circle cx="' + fmt(dot[0], 1) + '" cy="' + fmt(dot[1], 1) + '" r="3.2" fill="' + FIG_INK + '"/>';
  }
  var kind2 = mode === "translation" ? "base" : (mode === "reflection" ? "mirror" : "rot");
  var body = tile(70, 60, "base") + tile(70 + s + gap + 40, 60, kind2);
  body += u8T(70, 60 - s / 2 - 16, "Tile 1", 12, true) + u8T(70 + s + gap + 40, 60 - s / 2 - 16, "Tile 2", 12, true);
  var W = 70 + s + gap + 40 + 60;
  var fig = u8Svg(W, 120, body, "Two tiles in a tessellation pattern, the second an image of the first");
  var desc = {
    translation: "Tile 2 is tile 1 slid sideways: same size, same way up, and the dot stays by the same corner.",
    reflection: "Tile 2 is tile 1 flipped over: the dot moves to the matching corner on the other side, like a mirror image.",
    rotation: "Tile 2 is tile 1 turned around a point: the dot travels with its corner as the tile spins."
  };
  var names = { translation: "A translation (a slide)", reflection: "A reflection (a flip)", rotation: "A rotation (a turn)" };
  var others = ["translation", "reflection", "rotation"].filter(function (m) { return m !== mode; });
  var q = mcq("The diagram shows two neighbouring tiles in a tessellation. Each tile is a right triangle with a dot near one corner. Which transformation maps Tile 1 onto Tile 2?",
    { t: names[mode], fb: "Correct. " + desc[mode] },
    [
      { t: names[others[0]], fb: "Look at the dot: its position rules this out. " + desc[mode] },
      { t: names[others[1]], fb: "Look at the dot: its position rules this out. " + desc[mode] },
      { t: "An enlargement (a resize)", fb: "The two tiles are exactly the same size, so no resize is involved." }
    ],
    "Compare the dot and the corners of the two tiles. " + desc[mode] + " So the transformation is <b>" + names[mode].toLowerCase() + "</b>.",
    { mode: "tess-transform-" + mode, s: s, gap: gap });
  q.figure = fig;
  return q;
}, ["Track one marked feature, like the dot, from the first tile to the second.", "A slide keeps the tile the same way up, a flip mirrors it, and a turn spins it."]);
E("u8-pk-central-angles", 8, ["9.5"], 1, "gen", function(){
  var guard=0, a=0,b=0,c=0,m=0;
  while(guard++<300){
    a=ri(6,14)*10; b=ri(4,10)*10; c=ri(3,8)*10; m=360-a-b-c;
    if(m>=30&&m%10===0)break;
  }
  if(m<30){a=120;b=90;c=60;m=90;}
  var cats=[{pct:a/3.6,ang:a},{pct:b/3.6,ang:b},{pct:c/3.6,ang:c},{pct:m/3.6,ang:m}];
  var figCats=cats.map(function(x,i){return {pct:x.pct, ang:i===3?"?":x.ang};});
  var pool=[a+b+c,m+20,m-20,m+30,m-30,90,180];
  var seen={}; seen[m+"°"]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    if(pool[i]<=0)continue;
    var k=pool[i]+"°";
    if(seen[k])continue; seen[k]=1;
    ds.push({t:k, fb:i===0?"That is the sum of the three marked angles: the missing one is what is left of 360°.":"The four central angles of a circle add to 360°: subtract the three marked angles from 360°."});
  }
  var q=mcq("The circle in the diagram is divided into four sectors. Three central angles are marked, and one sector is marked with ?. What is the missing central angle?",
    {t:m+"°", fb:"Yes: 360° minus the three marked angles leaves "+m+"°."},
    ds,
    "\\[ \\begin{aligned} \\text{missing} &= 360° - ("+a+"° + "+b+"° + "+c+"°) \\\\ &= 360° - "+(a+b+c)+"° \\\\ &= "+m+"° \\end{aligned} \\] The central angles of a circle always add to 360°. The answer is <b>"+m+"°</b>.",
    {a:a, b:b, c:c});
  q.figure=u4pieFig(figCats,true);
  return q;
}, ["The central angles around the centre of a circle add to 360 degrees.", "Start by adding the three marked angles, then subtract from 360."]);
E("u8-pk-radius-diameter", 8, ["9.4"], 1, "gen", function(){
  if(ri(0,1)===0){
    var r=ri(2,30), d=2*r;
    var candR=[r,3*r,d+2,4*r,r+1,d+10], seenR={}; seenR[d]=1; var dsR=[];
    for(var i=0;i<candR.length&&dsR.length<3;i++){
      if(seenR[candR[i]])continue; seenR[candR[i]]=1;
      dsR.push({t:String(candR[i]), fb:"The diameter is exactly twice the radius: multiply "+r+" by 2."});
    }
    var q=mcq("The circle in the diagram has radius "+r+" cm. What is its diameter, in centimetres?",
      {t:String(d), fb:"Yes: the diameter is twice the radius."},
      dsR,
      "The diameter passes through the centre and is made of two radii: \\(d = 2 \\times "+r+" = "+d+"\\) cm. The answer is <b>"+d+" cm</b>.",
      {mode:"r", r:r});
    q.figure=u4circleFig("r = "+r+" cm","r");
    return q;
  }
  var d2=2*ri(3,40), r2=d2/2;
  var candD=[d2,d2-2,2*d2,r2+3,d2+4,r2-1], seenD={}; seenD[r2]=1; var dsD=[];
  for(var j=0;j<candD.length&&dsD.length<3;j++){
    if(candD[j]<=0||seenD[candD[j]])continue; seenD[candD[j]]=1;
    dsD.push({t:String(candD[j]), fb:"The radius is exactly half the diameter: divide "+d2+" by 2."});
  }
  var q2=mcq("The circle in the diagram has diameter "+d2+" cm. What is its radius, in centimetres?",
    {t:String(r2), fb:"Yes: the radius is half the diameter."},
    dsD,
    "The radius is half the diameter: \\(r = "+d2+" \\div 2 = "+r2+"\\) cm. The answer is <b>"+r2+" cm</b>.",
    {mode:"d", d:d2});
  q2.figure=u4circleFig("d = "+d2+" cm","d");
  return q2;
}, ["The diameter is two radii end to end.", "Start by picturing the radius from the centre to the edge, then double or halve."]);
E("u8-pk-pi-ratio", 8, ["9.5"], 1, "gen", function(){
  if(ri(0,1)===0){
    var d=ri(3,60), C=3.14*d;
    var q=mcq("A circle has circumference "+fmt(C,2)+" cm and diameter "+d+" cm. What is the value of circumference divided by diameter for this circle?",
      {t:"3.14", fb:"Yes: for every circle, C/d is the constant pi, about 3.14."},
      [{t:"0.32", fb:"That is roughly d/C, the division the other way around."},
       {t:"31.40", fb:"That is ten times too large: pi is a little more than 3."},
       {t:fmtF(C-d,2), fb:"That subtracts instead of dividing: pi is a ratio, C divided by d."}],
      "\\[ \\begin{aligned} \\pi &= "+FR("C","d")+" = "+fmt(C,2)+" \\div "+d+" \\\\ &= 3.14 \\end{aligned} \\] The answer is <b>3.14</b>.",
      {mode:"ratio", d:d}); q.figure=u4circleFig("d = "+d+" cm","d"); return q;
  }
  var pair=pick([[5,15.6],[5,15.8],[10,31.2],[10,31.6],[20,62.5],[20,63.1],[25,78.2],[25,78.8],[40,125.2],[40,125.9],[50,156.6],[50,157.4]]);
  var dd=pair[0], wrapped=pair[1];
  var est=Math.round(wrapped/dd*100)/100;
  var pool=[est+0.5,est-0.14,est+1,3.9];
  var seen={}; seen[fmt(est,2)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    var k=fmt(pool[i],2);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:k, fb:"Divide the wrapped length (the circumference) by the diameter and compare with 3.14."});
  }
  var q=mcq("String wrapped around a round can measures "+wrapped+" cm. The can's diameter is "+dd+" cm. Which value best estimates pi from this measurement?",
    {t:fmt(est,2), fb:"Yes: "+wrapped+" / "+dd+" is about "+fmt(est,2)+", close to 3.14."},
    ds,
    "\\[ \\begin{aligned} \\pi &\\approx "+wrapped+" \\div "+dd+" \\\\ &\\approx "+fmt(est,2)+" \\end{aligned} \\] Measurement error explains the small gap from 3.14. The answer is <b>"+fmt(est,2)+"</b>.",
    {mode:"measure", dd:dd}); q.figure=u4circleFig("d = "+dd+" cm","d"); return q;
}, ["Pi is the ratio of circumference to diameter, the same for every circle.", "Start by dividing the circumference by the diameter."]);
E("u8-pk-circumference", 8, ["9.5"], 1, "gen", function(){
  if(ri(0,1)===0){
    var d=ri(3,40), C=3.14*d;
    var pool=[3.14*(d/2),3*d,3.14*(d/2)*(d/2),C+3.14];
    var seen={}; seen[fmtF(C,2)]=1; var ds=[];
    for(var i=0;i<pool.length&&ds.length<3;i++){
      var k=fmtF(pool[i],2);
      if(seen[k])continue; seen[k]=1;
      ds.push({t:k, fb:i===2?"That uses the area formula with the radius: circumference is pi times diameter.":"Check the formula: C = pi x d with pi = 3.14."});
    }
    var q=mcq("What is the circumference of the circle in the diagram, in centimetres? Use 3.14 for pi.",
      {t:fmtF(C,2), fb:"Yes: C = 3.14 x "+d+" = "+fmtF(C,2)+" cm."},
      ds,
      "\\[ \\begin{aligned} C &= \\pi d \\\\ &= 3.14 \\times "+d+" \\\\ &= "+fmtF(C,2)+" \\text{ cm} \\end{aligned} \\] The answer is <b>"+fmtF(C,2)+" cm</b>.",
      {mode:"d", d:d});
    q.figure=u4circleFig("d = "+d+" cm","d");
    return q;
  }
  var r=ri(2,25), C2=2*3.14*r;
  var pool2=[3.14*r,3.14*r*r,3*r*2,2*3.14*(r+1)];
  var seen2={}; seen2[fmtF(C2,2)]=1; var ds2=[];
  for(var j=0;j<pool2.length&&ds2.length<3;j++){
    var k2=fmtF(pool2[j],2);
    if(seen2[k2])continue; seen2[k2]=1;
    ds2.push({t:k2, fb:j===1?"That uses the area formula: circumference is 2 x pi x r.":"Check the formula: C = 2 x pi x r with pi = 3.14."});
  }
  var q2=mcq("What is the circumference of the circle in the diagram, in centimetres? Use 3.14 for pi.",
    {t:fmtF(C2,2), fb:"Yes: C = 2 x 3.14 x "+r+" = "+fmtF(C2,2)+" cm."},
    ds2,
    "\\[ \\begin{aligned} C &= 2\\pi r \\\\ &= 2 \\times 3.14 \\times "+r+" \\\\ &= "+fmtF(C2,2)+" \\text{ cm} \\end{aligned} \\] The answer is <b>"+fmtF(C2,2)+" cm</b>.",
    {mode:"r", r:r});
  q2.figure=u4circleFig("r = "+r+" cm","r");
  return q2;
}, ["Circumference is pi times the diameter, or two times pi times the radius.", "Start by deciding whether the diagram gives you the radius or the diameter."]);
E("u8-pk-parallel-perp", 8, ["9.4"],1,"gen",function(){
  var jx=pick([-1,0,0,1]),jy=pick([-1,0,1]);var askPara=Math.random()<0.5;var tmpl=ri(0,2);
  var segs,prompt,correct,ds,sol;
  var opener=pick(["The diagram shows ","A diagram shows "]);
  if(tmpl===0){
    segs=[{x1:-4,y1:2,x2:3,y2:2,l1:"A",l2:"B"},{x1:3,y1:2,x2:3,y2:-2,l1:"",l2:"C"},{x1:3,y1:-2,x2:-4,y2:-2,l1:"",l2:"D"},{x1:-4,y1:-2,x2:-4,y2:2,l1:"",l2:""}];
    prompt=opener+"a rectangle with vertices A, B, C and D, and sides AB, BC, CD and DA. ";
    if(askPara){correct="AB and CD";ds=[{t:"AB and BC",fb:"AB meets BC at a corner, so they are perpendicular, not parallel."},{t:"AB and DA",fb:"AB meets DA at a corner, so they are perpendicular, not parallel."},{t:"BC and CD",fb:"BC meets CD at a corner, so they are perpendicular, not parallel."}];sol="Opposite sides of a rectangle never meet and stay the same distance apart. AB and CD are opposite sides. The parallel pair is <b>AB and CD</b>.";}
    else {correct="AB and BC";ds=[{t:"BC and DA",fb:"BC and DA are opposite sides, so they are parallel, not perpendicular."},{t:"AB and CD",fb:"AB and CD are opposite sides, so they are parallel, not perpendicular."},{t:"AD and BC",fb:"AD and BC are opposite sides (AD is the same segment as DA), so they are parallel, not perpendicular."}];sol="Adjacent sides of a rectangle meet at 90 degrees. AB and BC meet at corner B. The perpendicular pair is <b>AB and BC</b>.";}
  } else if(tmpl===1){
    segs=[{x1:-5,y1:3,x2:2,y2:3,l1:"E",l2:"F"},{x1:-5,y1:-1,x2:2,y2:-1,l1:"G",l2:"H"},{x1:0,y1:4,x2:0,y2:-3,l1:"I",l2:"J"},{x1:-4,y1:-3,x2:3,y2:2,l1:"K",l2:"L"}];
    prompt=opener+"segments EF, GH, IJ and KL. ";
    if(askPara){correct="EF and GH";ds=[{t:"EF and IJ",fb:"IJ crosses EF at a right angle, so they are perpendicular."},{t:"GH and KL",fb:"KL is slanted and would meet GH if extended, so they are not parallel."},{t:"IJ and KL",fb:"KL is slanted and crosses IJ, so they are not parallel."}];sol="EF and GH are both horizontal, stay the same distance apart, and never meet. The parallel pair is <b>EF and GH</b>.";}
    else {correct="EF and IJ";ds=[{t:"EF and GH",fb:"EF and GH are parallel, not perpendicular."},{t:"IJ and KL",fb:"KL crosses IJ at a slanted angle, not 90 degrees."},{t:"GH and KL",fb:"KL crosses GH at a slanted angle, not 90 degrees."}];sol="IJ is vertical and EF is horizontal, so they meet at 90 degrees. The perpendicular pair is <b>EF and IJ</b>.";}
  } else {
    segs=[{x1:-4,y1:3,x2:2,y2:3,l1:"P",l2:"Q"},{x1:-4,y1:-2,x2:2,y2:-2,l1:"R",l2:"S"},{x1:0,y1:4,x2:0,y2:-3,l1:"T",l2:"U"},{x1:-4,y1:-3,x2:3,y2:1,l1:"V",l2:"W"}];
    prompt=opener+"segments PQ, RS, TU and VW. ";
    if(askPara){correct="PQ and RS";ds=[{t:"PQ and TU",fb:"TU crosses PQ at a right angle, so they are perpendicular."},{t:"RS and VW",fb:"VW is slanted and would meet RS if extended, so they are not parallel."},{t:"TU and VW",fb:"VW crosses TU at a slanted angle, so they are not parallel."}];sol="PQ and RS are both horizontal and stay the same distance apart. The parallel pair is <b>PQ and RS</b>.";}
    else {correct="PQ and TU";ds=[{t:"PQ and RS",fb:"PQ and RS are parallel, not perpendicular."},{t:"TU and VW",fb:"VW crosses TU at a slanted angle, not 90 degrees."},{t:"RS and VW",fb:"VW crosses RS at a slanted angle, not 90 degrees."}];sol="TU is vertical and PQ is horizontal, so they meet at 90 degrees. The perpendicular pair is <b>PQ and TU</b>.";}
  }
  var q=mcq(prompt+(askPara?"Which pair of segments is parallel?":"Which pair of segments is perpendicular?"),
    {t:correct,fb:"Yes, that pair matches the diagram."},ds,sol,{mode:askPara?"para":"perp",tmpl:tmpl});
  q.figure=u8segFigure(segs,jx,jy);
  return q;
},["Parallel segments never meet and stay the same distance apart; perpendicular segments meet at 90 degrees.","Start by checking each pair: do they meet, and if so, at what angle?"]);
E("u8-pk-angle-chain", 8, ["9.5"], 2, "gen", function(){
  var B=0,C=0,D=0,third=0,g=0;
  while(g++<200){ B=ri(35,120); C=180-B; D=ri(15,60); third=180-C-D; if(third>=10) break; }
  var q=numq("Angle P sits on a straight line with an angle of "+B+" degrees, so angle P and the "+B+" degree angle are supplementary. Angle P is one angle of a triangle whose second angle is "+D+" degrees. Find the third angle of the triangle, in degrees. Show your work.", third, 0,
    "Find angle P from the straight line first, then use the triangle angle sum. \\[ \\begin{aligned} P &= 180 - "+B+" = "+C+" \\\\ \\text{third angle} &= 180 - "+C+" - "+D+" = "+third+" \\end{aligned} \\] The answer is <b>"+third+"</b>.",
    {B:B,D:D}); q.figure=triAngSVG(C,D,third,{L:["","",""],ang:["P",D+"°","?"]}); return q;
}, ["Two angle facts are chained here: use the straight-line fact first, then feed its result into the triangle.", "Start by finding the supplementary angle on the straight line."]);
E("u9-pk-mean-basic", 9, ["11.9"],1,"gen",function(){
  var ctx=pick(["quiz scores","laps swum each day","pages read each day","points scored each game","seedlings sprouting each day"]);
  var n=pick([5,5,6]);var vals=[];for(var i=0;i<n;i++)vals.push(ri(2,14));
  var m=u7mean(vals);var ms=fmt(m);
  var cand=u7numOpts(m,[fmt(m+1),fmt(m-1),fmt(u7median(vals)),fmt(m+2),fmt(Math.max.apply(null,vals))]).map(function(v){return String(v);});
  var seen={};var ds=[];cand.forEach(function(v){if(v!==ms&&!seen[v]){seen[v]=1;ds.push({t:v,fb:"That value does not equal the total divided by "+n+". Add all the values first, then divide by how many there are."});}});
  while(ds.length<3){var v=fmt(m+ds.length+2);if(v!==ms&&!seen[v]){seen[v]=1;ds.push({t:v,fb:"Add all the values first, then divide by "+n+"."});}}
  ds=precPair(ms,ds);
  var q=mcq("A student's "+ctx+" are: "+vals.join(", ")+". What is the mean?",
    {t:ms,fb:"Yes: the total is "+fmt(u7mean(vals)*n)+" and "+fmt(u7mean(vals)*n)+" divided by "+n+" is "+ms+"."},ds.slice(0,3),
    "Add the values, then divide by how many there are. \\[ \\begin{aligned} \\text{total} &= "+vals.join(" + ")+" = "+fmt(m*n)+" \\\\ \\text{mean} &= "+fmt(m*n)+" \\div "+n+" = "+ms+" \\end{aligned} \\] The mean is <b>"+ms+"</b>.",
    {mode:"mean",n:n});
  return q;
},["The mean is the total of all the values divided by how many values there are.","Start by adding all the values together."]);
E("u9-pk-median-mode", 9, ["11.9"],1,"gen",function(){
  var askMode=Math.random()<0.5;
  var base=ri(3,9);var vals;
  if(askMode){var modeV=ri(2,12);var others=[];while(others.length<4){var v=ri(1,15);if(v!==modeV&&others.indexOf(v)<0)others.push(v);}vals=shuffle([modeV,modeV,modeV].concat(others.slice(0,3)));
    var correct=String(modeV);
    var cand=u7numOpts(modeV,[others[0],others[1],Math.round(u7mean(vals))]).map(String);
    var ds=cand.filter(function(v){return v!==correct;}).slice(0,3).map(function(v){return {t:v,fb:"Count how often each value appears. The mode is the value that appears most often."};});
    while(ds.length<3){var v=String(modeV+ds.length+3);ds.push({t:v,fb:"Count how often each value appears."});}
    return mcq("Data set: "+vals.join(", ")+". What is the mode?",{t:correct,fb:"Yes: "+modeV+" appears three times, more often than any other value."},ds,
      "Count the frequency of each value. The value "+modeV+" appears 3 times, more than any other value. The mode is <b>"+modeV+"</b>.",{mode:"mode"});
  }
  var n=pick([5,7]);vals=[];for(var i=0;i<n;i++)vals.push(ri(1,16));
  var med=u7median(vals);var srt=vals.slice().sort(function(a,b){return a-b;});
  var cand2=u7numOpts(med,[fmt(u7mean(vals)),srt[0],srt[srt.length-1],med+1]).map(function(v){return String(v);});
  var ds2=cand2.filter(function(v){return v!==fmt(med);}).slice(0,3).map(function(v){return {t:v,fb:"Order the values first. The median is the middle value of the ordered list."};});
  while(ds2.length<3){var w=fmt(med+ds2.length+2);ds2.push({t:w,fb:"Order the values first, then take the middle one."});}
  ds2=precPair(fmt(med),ds2);
  return mcq("Data set: "+vals.join(", ")+". What is the median?",{t:fmt(med),fb:"Yes: ordered, the list is "+srt.join(", ")+", and the middle value is "+fmt(med)+"."},ds2,
    "Order the values: "+srt.join(", ")+". With "+n+" values, the middle position holds <b>"+fmt(med)+"</b>.",{mode:"median"});
},["Order the values first for the median; count frequencies for the mode.","Start by rewriting the data set in increasing order."]);
E("u9-pk-two-graphs", 9, ["11.1"], 1, "var", varset([
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
E("u9-pk-misleading-format", 9, ["11.6"], 1, "var", varset([
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
E("u9-pk-false-conclusion", 9, ["11.6"], 2, "var", varset([
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
E("u9-pk-circle-graph", 9, ["11.8"],1,"gen",function(){
  var labelSets=[["Bus","Walk","Bike"],["Reading","Games","Sport","Music"],["Apples","Bananas","Oranges"],["Red","Blue","Green","Yellow"],["Soccer","Hockey","Dance"],["Tea","Juice","Water","Milk"]];
  var pctSets=[[50,30,20],[40,30,20,10],[25,50,25],[30,30,25,15],[60,25,15],[45,35,20],[20,20,30,30],[35,45,20]];
  var labels=pick(labelSets);var pcts=pick(pctSets);var guard=0;while(pcts.length!==labels.length&&guard<20){pcts=pick(pctSets);guard++;}
  if(pcts.length!==labels.length){labels=["Bus","Walk","Bike","Car"];pcts=[40,30,20,10];}
  var total=pick([40,60,80,100,120,160,200]);var idx=ri(0,labels.length-1);var qty=pcts[idx]*total/100;
  var ctx=pick(["travel to school","choose a free-time activity","pick a favourite fruit","pick a favourite colour","join a sports club","choose a drink"]);
  var prompt="A circle graph shows how "+total+" students "+ctx+". What number of students does the "+labels[idx]+" section represent?";
  var ds=u7numOpts(qty,[qty+5,Math.max(qty-5,1),pcts[idx]]).map(function(v){return {t:String(v),fb:"Multiply the percent for that section by the total number of students."};});
  var q=mcq(prompt,{t:String(qty),fb:"Yes: "+pcts[idx]+" percent of "+total+" is "+qty+"."},ds,
    "The "+labels[idx]+" section is "+pcts[idx]+" percent of the total. \\[ \\begin{aligned} \\text{quantity} &= "+fmt(pcts[idx]/100,2)+" \\times "+total+" \\\\ &= "+qty+" \\end{aligned} \\] The answer is <b>"+qty+" students</b>.",{mode:"circle"});
  q.figure=u7pieSVG(labels.map(function(l,i){return {label:l,pct:pcts[i]};}));
  return q;
},["A circle graph section shows a percent of the whole total.","Start by multiplying the section percent, written as a decimal, by the total."]);
E("u9-pk-prob-basic", 9, ["12.4"],1,"gen",function(){
  var mode=pick(["bag","bag","die","spinner","zero"]);
  if(mode==="zero"){
    var cols=["red","blue","green"];var counts=[ri(2,5),ri(2,5),ri(2,5)];var total=counts[0]+counts[1]+counts[2];
    var absent=pick(["purple","orange","yellow"]);
    var ds=[{t:"1/"+total,fb:"There are no "+absent+" marbles in the bag, so this event cannot happen."},{t:"0/"+counts[0],fb:"A probability of 0 is written as 0. No "+absent+" marbles means the event is impossible."},{t:"1",fb:"A probability of 1 means the event is certain. Drawing "+absent+" is impossible here, not certain."}];
    return mcq("A bag holds "+counts[0]+" red, "+counts[1]+" blue and "+counts[2]+" green marbles. One marble is drawn at random. What is the probability of drawing a "+absent+" marble?",
      {t:"0",fb:"Yes: there are no "+absent+" marbles, so the probability is 0."},ds,
      "There are 0 "+absent+" marbles out of "+total+" in total. \\(P = "+FR(0,total)+" = 0\\). The probability is <b>0</b>.",{mode:"zero"});
  }
  if(mode==="die"){
    var target=pick(["an even number","an odd number","a number greater than 4","a number less than 3","a 6","a number greater than 2"]);
    var fav={"an even number":3,"an odd number":3,"a number greater than 4":2,"a number less than 3":2,"a 6":1,"a number greater than 2":4}[target];
    var cs=u7fracStr(fav,6);
    var alts=[u7fracStr(6-fav,6),fav+"/6",u7fracStr(fav+1,6),u7fracStr(fav,6-fav+6)];
    var seen={};seen[cs]=1;var ds=[];
    alts.forEach(function(a){if(!seen[a]){seen[a]=1;ds.push({t:"\\("+a+"\\)",fb:"Count the favourable faces first, then write favourable over 6 and simplify."});}});
    var extra=2;while(ds.length<3){var a=u7fracStr(extra,6);if(!seen[a]){seen[a]=1;ds.push({t:"\\("+a+"\\)",fb:"Count the favourable faces first, then write favourable over 6 and simplify."});}extra++;}
    return mcq("A fair six-sided die is rolled once. What is the probability of rolling "+target+"?",
      {t:"\\("+cs+"\\)",fb:"Yes: "+fav+" of the 6 faces match, and "+fav+"/6 simplifies to "+cs+"."},ds.slice(0,3),
      "There are "+fav+" favourable faces out of 6. \\(P = "+FR(fav,6)+" = "+cs+"\\). The probability is <b>\\("+cs+"\\)</b>.",{mode:"die"});
  }
  if(mode==="spinner"){
    var secs=pick([4,6,8]);var favSecs=ri(1,secs-1);var cs2=u7fracStr(favSecs,secs);
    var seen2={};seen2[cs2]=1;var ds2=[];
    [u7fracStr(secs-favSecs,secs),favSecs+"/"+secs,u7fracStr(favSecs+1,secs),u7fracStr(1,secs)].forEach(function(a){if(!seen2[a]&&ds2.length<3){seen2[a]=1;ds2.push({t:"\\("+a+"\\)",fb:"Use the number of matching sections over the total number of equal sections, then simplify."});}});
    var e2=2;while(ds2.length<3){var a2=u7fracStr(e2,secs);if(!seen2[a2]){seen2[a2]=1;ds2.push({t:"\\("+a2+"\\)",fb:"Use matching sections over total sections, then simplify."});}e2++;}
    return mcq("A spinner has "+secs+" equal sections. Exactly "+favSecs+" of the sections are shaded. What is the probability of landing on a shaded section?",
      {t:"\\("+cs2+"\\)",fb:"Yes: "+favSecs+" of "+secs+" sections are shaded, which simplifies to "+cs2+"."},ds2.slice(0,3),
      "Favourable sections: "+favSecs+". Total sections: "+secs+". \\(P = "+FR(favSecs,secs)+" = "+cs2+"\\). The probability is <b>\\("+cs2+"\\)</b>.",{mode:"spinner"});
  }
  var r=ri(1,6),b=ri(1,6),g=ri(0,5);var total2=r+b+g;var colPick=pick(["red","blue"]);var fav2=colPick==="red"?r:b;
  var cs3=u7fracStr(fav2,total2);var seen3={};seen3[cs3]=1;var ds3=[];
  [u7fracStr(total2-fav2,total2),fav2+"/"+total2,u7fracStr(fav2,total2-fav2),u7fracStr(fav2+1,total2)].forEach(function(a){if(!seen3[a]&&ds3.length<3){seen3[a]=1;ds3.push({t:"\\("+a+"\\)",fb:"The numerator counts only the "+colPick+" marbles, and the denominator is the total number of marbles. Simplify at the end."});}});
  var e3=1;while(ds3.length<3){var a3=u7fracStr(e3,total2+3);if(!seen3[a3]){seen3[a3]=1;ds3.push({t:"\\("+a3+"\\)",fb:"Count the "+colPick+" marbles over the total, then simplify."});}e3++;}
  return mcq("A bag holds "+r+" red, "+b+" blue"+(g?" and "+g+" green":"")+" marbles. One marble is drawn at random. What is the probability of drawing a "+colPick+" marble?",
    {t:"\\("+cs3+"\\)",fb:"Yes: "+fav2+" of the "+total2+" marbles are "+colPick+", which simplifies to "+cs3+"."},ds3.slice(0,3),
    "Favourable outcomes: "+fav2+". Total outcomes: "+total2+". \\(P = "+FR(fav2,total2)+" = "+cs3+"\\). The probability is <b>\\("+cs3+"\\)</b>.",{mode:"bag"});
},["Probability is favourable outcomes divided by total possible outcomes.","Start by counting the favourable outcomes and the total number of outcomes, then simplify the fraction."]);
E("u9-pk-two-draws", 9, ["12.4"], 1, "gen", function () {
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
E("u9-pk-product-rule", 9, ["12.4"], 1, "gen", function () {
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
E("u9-pk-exp-vs-theor", 9, ["12.4"],1,"gen",function(){
  var trials=pick([20,40,50,100]);var theo=pick([["rolling a 6 on a die",1,6],["flipping heads",1,2],["landing on one section of a four-section spinner",1,4],["drawing a red marble from 3 red and 2 blue",3,5]]);
  var expected=theo[1]/theo[2]*trials;var obs=Math.max(1,Math.round(expected+ri(-4,4)));var guard=0;while(obs===expected&&guard<10){obs=Math.max(1,Math.round(expected+ri(-4,4)));guard++;}
  var expP=obs/trials;var mode=pick(["expfrac","compare"]);
  if(mode==="compare"){
    var larger=expP>theo[1]/theo[2]?"Experimental probability is larger":"Theoretical probability is larger";
    var other=larger.indexOf("Experimental")===0?"Theoretical probability is larger":"Experimental probability is larger";
    return mcq("In "+trials+" trials of "+theo[0]+", the outcome occurred "+obs+" times. Which statement compares the probabilities correctly?",
      {t:larger,fb:"Yes: the experimental value is "+u7fracStr(obs,trials)+" and the theoretical value is "+u7fracStr(theo[1],theo[2])+", and comparing them gives this result."},
      [{t:other,fb:"Compare the two values directly: experimental is "+obs+"/"+trials+", theoretical is "+theo[1]+"/"+theo[2]+"."},{t:"The two probabilities are exactly equal",fb:"The counts do not match the theoretical share exactly, so the probabilities differ."},{t:"The two cannot be compared directly",fb:"Both are fractions between 0 and 1, so they can be compared directly."}],
      "Experimental probability: \\("+FR(obs,trials)+"\\). Theoretical probability: \\("+FR(theo[1],theo[2])+"\\). Comparing the two, <b>"+larger.toLowerCase()+"</b>.",{mode:"compare"});
  }
  var cs=u7fracStr(obs,trials);
  var seen={};seen[cs]=1;var ds=[];
  [u7fracStr(theo[1],theo[2]),obs+"/"+trials,u7fracStr(trials-obs,trials)].forEach(function(a){if(!seen[a]&&ds.length<3){seen[a]=1;ds.push({t:"\\("+a+"\\)",fb:"Experimental probability uses the observed count over the number of trials, then simplifies."});}});
  var e=2;while(ds.length<3){var a2=u7fracStr(e,trials);if(!seen[a2]){seen[a2]=1;ds.push({t:"\\("+a2+"\\)",fb:"Experimental probability uses the observed count over the number of trials, then simplifies."});}e++;}
  return mcq("In "+trials+" trials of "+theo[0]+", the outcome occurred "+obs+" times. What is the experimental probability of the outcome?",
    {t:"\\("+cs+"\\)",fb:"Yes: "+obs+" successes out of "+trials+" trials simplifies to "+cs+"."},ds,
    "Experimental probability is successes over trials. \\(P = "+FR(obs,trials)+" = "+cs+"\\). The experimental probability is <b>\\("+cs+"\\)</b>.",{mode:"expfrac"});
},["Experimental probability comes from results: successes divided by trials.","Start by writing the observed count over the total number of trials."]);
/* Authored for this tranche, cluster 9-C4 skill 1 (repeated multiplication
   fluency). Provenance: Mathematics 5 indicators MA5.5.19 (recall of
   multiplication facts to 9 x 9 and related division facts), MA5.5.16
   (mental mathematics strategies) and MA5.5.18 (products with multiples of
   10, 100 and 1 000), from the elementary eNLightenED exports supplied
   November 15, 2026. No banked source exists at any level for this skill.
   No entry shows or requires power notation: Math 9 indicators 3.6 and 3.7
   name the conversion to power form, so the power form would assess host
   content. These entries assess only the computation the notation names. */
E("u3-pk-repeated-product", 3, ["3.10"], 1, "gen", function () {
  for (var t = 0; t < 300; t++) {
    var b = ri(2, 5), n = ri(3, 4), val = 1;
    for (var i = 0; i < n; i++) val *= b;
    var prod = []; for (var j = 0; j < n; j++) prod.push(b);
    var dCount = b * n, dDrop = val / b, dAdd = val + b;
    var ds = [dCount, dDrop, dAdd];
    if (new Set(ds).size < 3 || ds.indexOf(val) >= 0) continue;
    var run = b, eqs = [];
    for (var k = 1; k < n; k++) { eqs.push(run + " × " + b + " = " + (run * b)); run *= b; }
    return mcq("What is " + prod.join(" × ") + "?",
      { t: String(val), fb: "Correct. Multiply the factors one at a time." },
      [ { t: String(dCount), fb: "That is " + b + " × " + n + ", a single multiplication. Here " + b + " is multiplied by itself " + n + " times." },
        { t: String(dDrop), fb: "That stops one factor early. Count the factors in the product: there are " + n + " of them." },
        { t: String(dAdd), fb: "Adding is not repeated multiplication. Multiply the factors one at a time." } ],
      "Multiply the factors one at a time: " + eqs.join(", then ") + ". So " + prod.join(" × ") + " = <b>" + val + "</b>.",
      { mode: "repeated-product", b: b, n: n });
  }
}, ["Multiply the first two factors, then multiply by the next factor.", "Keep going until every factor has been used."]);
E("u3-pk-repeated-write", 3, ["3.7"], 1, "gen", function () {
  for (var t = 0; t < 300; t++) {
    var b = ri(2, 9), n = pick([3, 4, 5]);
    if (b === n) continue;
    var rep = function (x, k) { var a = []; for (var i = 0; i < k; i++) a.push(x); return a; };
    var correct = rep(b, n).join(" × ");
    return mcq("Which multiplication shows " + b + " multiplied by itself " + n + " times?",
      { t: correct, fb: "Correct. The number " + b + " appears as a factor " + n + " times." },
      [ { t: rep(n, b).join(" × "), fb: "That shows " + n + " multiplied by itself " + b + " times. The number being multiplied here is " + b + "." },
        { t: b + " × " + n, fb: "That is one multiplication step. Multiplying a number by itself means writing it as a factor that many times." },
        { t: rep(b, n).join(" + "), fb: "That is repeated addition. The question asks for a multiplication: write " + b + " as a factor " + n + " times, joined by × signs." } ],
      "Multiplying a number by itself means using it as a factor that many times. Using " + b + " as a factor " + n + " times gives <b>" + correct + "</b>.",
      { mode: "repeated-write", b: b, n: n });
  }
}, ["Count how many times the number is used as a factor.", "Join that many copies of the number with multiplication signs."]);
E("u3-pk-related-division", 3, ["3.10"], 1, "gen", function () {
  var a = ri(3, 9), b = ri(3, 9);
  if (a === b) b = (b === 9 ? 8 : b + 1);
  var p = a * b;
  return mcq(a + " × " + b + " = " + p + ". Which division fact is related to this multiplication fact?",
    { t: p + " ÷ " + a + " = " + b, fb: "Correct. It uses the same three numbers: the product divided by one factor gives the other factor." },
    [ { t: p + " ÷ " + a + " = " + (b - 1), fb: "Check it against the multiplication: " + a + " × " + (b - 1) + " = " + (a * (b - 1)) + ", not " + p + ". A related fact uses the same three numbers with nothing changed." },
      { t: p + " ÷ " + b + " = " + (a + 1), fb: "Check it against the multiplication: " + b + " × " + (a + 1) + " = " + (b * (a + 1)) + ", not " + p + ". A related fact uses the same three numbers with nothing changed." },
      { t: a + " ÷ " + p + " = " + b, fb: "The product is the largest number in the family, so it is the number being divided. Start the division with " + p + "." } ],
    "The numbers " + a + ", " + b + " and " + p + " form a fact family: dividing the product by one factor gives the other factor. The related division fact is <b>" + p + " ÷ " + a + " = " + b + "</b>.",
    { mode: "related-division", a: a, b: b });
}, ["The same three numbers appear in every fact of the family.", "Divide the product by one factor to get the other factor."]);
E("u3-pk-doubling-step", 3, ["3.10"], 2, "gen", function () {
  if (pick(["skip", "double"]) === "skip") {
    var a = 0, b = 0, known = 0, ans = 0;
    for (var t = 0; t < 300; t++) {
      a = ri(4, 9); b = ri(3, 9); known = a * b; ans = (a + 1) * b;
      var vals = [ans, known + a, known * 2, ans + b];
      if (new Set(vals).size === 4) break;
    }
    return mcq("You know that " + a + " × " + b + " = " + known + ". Use skip counting up by one group to find " + (a + 1) + " × " + b + ".",
      { t: String(ans), fb: "Correct. One more group of " + b + " past " + known + " is " + ans + "." },
      [ { t: String(known + a), fb: "That adds a group of " + a + ". One more group of " + b + " is what is added, so add " + b + ", not " + a + "." },
        { t: String(known * 2), fb: "That doubles the known fact, which gives " + (2 * a) + " × " + b + ". Only one more group is needed here." },
        { t: String(ans + b), fb: "That adds two extra groups of " + b + ". " + (a + 1) + " × " + b + " is just one group past " + a + " × " + b + "." } ],
      "Skip count up by one group of " + b + ": " + known + " + " + b + " = " + ans + ". So " + (a + 1) + " × " + b + " = <b>" + ans + "</b>.",
      { mode: "skip-up", a: a, b: b });
  }
  var c = ri(3, 9), base = 2 * c, once = 4 * c, ans2 = 8 * c;
  return mcq("You know that 2 × " + c + " = " + base + ". Use repeated doubling to find 8 × " + c + ".",
    { t: String(ans2), fb: "Correct. Doubling twice from 2 × " + c + " reaches 8 × " + c + "." },
    [ { t: String(once), fb: "That is one doubling: 4 × " + c + ". Double once more to reach 8 × " + c + "." },
      { t: String(base + c), fb: "That adds a single group of " + c + ". Doubling multiplies the whole fact by 2 each time." },
      { t: String(ans2 * 2), fb: "That is one doubling too many: it gives 16 × " + c + ". Stop at 8 × " + c + "." } ],
    "Double the known fact: 2 × " + c + " = " + base + ", so 4 × " + c + " = " + once + ". Double once more: 8 × " + c + " = " + ans2 + ". So 8 × " + c + " = <b>" + ans2 + "</b>.",
    { mode: "repeated-doubling", c: c });
}, ["Start from the fact you are given.", "Skip counting adds one group; doubling multiplies the whole fact by 2."]);
E("u3-pk-annex-zeros", 3, ["3.10"], 1, "gen", function () {
  var a = ri(2, 9), b = ri(2, 9), k = pick([1, 2]);
  var mult = b * Math.pow(10, k), ans = a * mult, basic = a * b;
  var zeros = (k === 1 ? "one zero" : "two zeros");
  return mcq("What is " + a + " × " + mult + "?",
    { t: String(ans), fb: "Correct. The basic fact is " + basic + ", with " + zeros + " annexed." },
    [ { t: String(ans / 10), fb: "That is one zero short. " + mult + " has " + zeros + ", and the answer keeps " + zeros + " from the basic fact." },
      { t: String(ans * 10), fb: "That has one zero too many. Count the zeros in " + mult + ": there are " + k + "." },
      { t: String(a * (b + 1) * Math.pow(10, k)), fb: "That uses the wrong basic fact: " + a + " × " + b + " = " + basic + ", not " + (a * (b + 1)) + "." } ],
    "Start with the basic fact: " + a + " × " + b + " = " + basic + ". Since " + mult + " is " + b + " with " + zeros + " annexed, annex the same zeros to the basic fact: " + a + " × " + mult + " = <b>" + ans + "</b>.",
    { mode: "annex-zeros", a: a, b: b, k: k });
}, ["Find the basic fact first, without the zeros.", "Annex the same number of zeros as the multiple of 10 has."]);
/* PK tranche metadata pass. pkFor is the cluster's dependent indicator
   list in Math 9; the three Unit 9 entries flagged on November 13, 2026
   take pkFor ["11.9"], the indicator their skill supports. */
var PK9_FOR_C1=["3.1","3.2","6.1","6.2","6.3","6.4"];
var PK9_FOR_C2=["3.3","6.5","6.6","6.7","6.8","6.9","6.10","6.11"];
var PK9_FOR_C3=["9.1","9.2","9.3"];
var PK9_FOR_C4=["3.4","3.5","3.6","3.7","3.8","3.9","3.10","3.11","3.12","3.13","3.14","3.15"];
var PK9_FOR_C5=["8.4","8.5","8.6","8.7","8.8","8.9","8.10","8.11","8.12","8.13","8.14","8.15","8.16"];
var PK9_FOR_C6=["8.17","8.18","8.19","8.20","8.21","8.22","8.23"];
var PK9_FOR_C7=["8.1","8.2","8.3","8.24","8.25","8.26","8.27","8.28","8.29","8.30"];
var PK9_FOR_C8=["7.1","7.2","7.3","7.4","7.5","7.6","7.7","7.8","7.9","7.10"];
var PK9_FOR_C9=["10.7","10.8","10.14","10.15","10.16","10.17","10.18","10.19"];
var PK9_FOR_C10=["10.1","10.2","10.3","10.4","10.5","10.6","10.9","10.10","10.11","10.12","10.13"];
var PK9_FOR_C11=["9.4","9.5","9.6","9.7","9.8","9.9"];
var PK9_FOR_C12=["12.1","12.2","12.3","12.4"];
var PK9_FOR_C13=["11.1","11.2","11.3","11.4","11.5","11.6","11.7","11.8","11.9","11.10"];
var PKT9={
  "u1-pk-ooo-evaluate":{src:"Math 8 indicator 6.27",group:"integer-operations",for:PK9_FOR_C1},
  "u1-pk-identify-operation":{src:"Math 8 indicator 6.26",group:"integer-operations",for:PK9_FOR_C1},
  "u1-pk-add-context":{src:"Math 7 indicators 6.25 and 6.29",group:"integer-operations",for:PK9_FOR_C1},
  "u1-pk-add-unlike":{src:"Math 7 indicator 6.17",group:"fraction-operations",for:PK9_FOR_C1},
  "u1-pk-sub-unlike":{src:"Math 7 indicator 6.19",group:"fraction-operations",for:PK9_FOR_C1},
  "u1-pk-multiply-fractions":{src:"Math 8 indicator 6.8",group:"fraction-operations",for:PK9_FOR_C1},
  "u1-pk-divide-fractions":{src:"Math 8 indicator 6.12",group:"fraction-operations",for:PK9_FOR_C1},
  "u1-pk-ooo-fractions":{src:"Math 8 indicator 6.16",group:"fraction-operations",for:PK9_FOR_C1},
  "u1-pk-add-sub-decimals":{src:"Math 7 indicators 6.5 and 6.6",group:"decimal-operations",for:PK9_FOR_C1},
  "u1-pk-mult-decimals":{src:"Math 7 indicator 6.7",group:"decimal-operations",for:PK9_FOR_C1},
  "u1-pk-order-mixed":{src:"Math 7 indicators 3.2, 3.3 and 3.4",group:"decimal-operations",for:PK9_FOR_C1},
  "u2-pk-sqrt-perfect":{src:"Math 8 indicator 5.2",group:"square-roots",for:PK9_FOR_C2},
  "u2-pk-square-of-number":{src:"Math 8 indicator 5.3",group:"square-roots",for:PK9_FOR_C2},
  "u2-pk-estimate-between":{src:"Math 8 indicator 6.30",group:"square-roots",for:PK9_FOR_C2},
  "u2-pk-root-between":{src:"Math 8 indicator 6.31",group:"square-roots",for:PK9_FOR_C2},
  "u2-pk-calc-approx":{src:"Math 8 indicator 6.32",group:"square-roots",for:PK9_FOR_C2},
  "u2-pk-sa-rect-prism":{src:"Math 8 indicator 9.4",group:"surface-area",for:PK9_FOR_C3},
  "u2-pk-sa-tri-prism":{src:"Math 8 indicator 9.4",group:"surface-area",for:PK9_FOR_C3},
  "u2-pk-sa-cylinder":{src:"Math 8 indicator 9.6",group:"surface-area",for:PK9_FOR_C3},
  "u2-pk-sa-problem":{src:"Math 8 indicator 9.5",group:"surface-area",for:PK9_FOR_C3},
  "u3-pk-product-sign":{src:"Math 8 indicator 6.18",group:"sign-rules",for:PK9_FOR_C4},
  "u3-pk-quotient-sign":{src:"Math 8 indicator 6.22",group:"sign-rules",for:PK9_FOR_C4},
  "u3-pk-missing-factor":{src:"Math 8 indicators 6.22 and 6.24",group:"sign-rules",for:PK9_FOR_C4},
  "u4-pk-identify-parts":{src:"Math 7 indicator 8.5",group:"polynomial-language",for:PK9_FOR_C5},
  "u4-pk-variable-meaning":{src:"Math 7 indicator 8.4",group:"polynomial-language",for:PK9_FOR_C5},
  "u4-pk-expression-or-equation":{src:"Math 7 indicator 8.6",group:"polynomial-language",for:PK9_FOR_C5},
  "u4-pk-solve-one-step":{src:"Math 8 indicator 8.4",group:"polynomial-operations",for:PK9_FOR_C5},
  "u4-pk-solve-two-step":{src:"Math 8 indicator 8.4",group:"polynomial-operations",for:PK9_FOR_C5},
  "u4-pk-solve-distributive":{src:"Math 8 indicator 8.5",group:"polynomial-operations",for:PK9_FOR_C5},
  "u5-pk-model-equation":{src:"Math 8 indicator 8.1",group:"linear-equations",for:PK9_FOR_C6},
  "u5-pk-solve-two-step":{src:"Math 8 indicator 8.4",group:"linear-equations",for:PK9_FOR_C6},
  "u5-pk-verify-solution":{src:"Math 8 indicator 8.3",group:"linear-equations",for:PK9_FOR_C6},
  "u5-pk-identify-error":{src:"Math 8 indicator 8.6",group:"linear-equations",for:PK9_FOR_C6},
  "u5-pk-between":{src:"Math 7 indicators 3.3 and 3.5",group:"ordering-numbers",for:PK9_FOR_C7},
  "u5-pk-numberline-place":{src:"Math 7 indicators 3.1 and 3.4",group:"ordering-numbers",for:PK9_FOR_C7},
  "u5-pk-misplaced":{src:"Math 7 indicators 3.3 and 3.6",group:"ordering-numbers",for:PK9_FOR_C7},
  "u6-pk-pattern-expression":{src:"Math 7 indicator 7.1",group:"patterns",for:PK9_FOR_C8},
  "u6-pk-two-points-evaluate":{src:"Math 8 indicators 7.2 and 7.3",group:"patterns",for:PK9_FOR_C8},
  "u6-pk-table-missing":{src:"Math 8 indicator 7.2",group:"tables-and-graphs",for:PK9_FOR_C8},
  "u6-pk-missing-pair":{src:"Math 8 indicator 7.3",group:"tables-and-graphs",for:PK9_FOR_C8},
  "u6-pk-construct-graph":{src:"Math 8 indicator 7.4",group:"tables-and-graphs",for:PK9_FOR_C8},
  "u6-pk-describe-graph":{src:"Math 8 indicator 7.1",group:"tables-and-graphs",for:PK9_FOR_C8},
  "u6-pk-solve-div-plus":{src:"Math 8 indicator 8.4",group:"linear-equations",for:PK9_FOR_C6},
  "u6-pk-solve-context":{src:"Math 8 indicator 8.7",group:"linear-equations",for:PK9_FOR_C6},
  "u7-pk-two-term-ratio":{src:"Math 8 indicator 3.8",group:"ratio-rates",for:PK9_FOR_C9},
  "u7-pk-ratio-simplest":{src:"Math 8 indicator 3.12",group:"ratio-rates",for:PK9_FOR_C9},
  "u7-pk-ratio-problem":{src:"Math 8 indicator 6.28",group:"ratio-rates",for:PK9_FOR_C9},
  "u7-pk-rate-problem":{src:"Math 8 indicator 6.29",group:"ratio-rates",for:PK9_FOR_C9},
  "u7-pk-translate":{src:"Math 7 indicator 10.20",group:"transformations",for:PK9_FOR_C10},
  "u7-pk-reflect-point":{src:"Math 7 indicators 10.12 and 10.20",group:"transformations",for:PK9_FOR_C10},
  "u7-pk-transform-describe":{src:"Math 7 indicator 10.11",group:"transformations",for:PK9_FOR_C10},
  "u7-pk-tess-transform":{src:"Math 8 indicator 10.7",group:"transformations",for:PK9_FOR_C10},
  "u8-pk-central-angles":{src:"Math 7 indicator 9.13",group:"circle-measure",for:PK9_FOR_C11},
  "u8-pk-radius-diameter":{src:"Math 7 indicator 9.11",group:"circle-measure",for:PK9_FOR_C11},
  "u8-pk-pi-ratio":{src:"Math 7 indicator 9.8",group:"circle-measure",for:PK9_FOR_C11},
  "u8-pk-circumference":{src:"Math 7 indicators 9.8 and 9.10",group:"circle-measure",for:PK9_FOR_C11},
  "u8-pk-parallel-perp":{src:"Math 7 indicator 10.1",group:"angle-facts",for:PK9_FOR_C11},
  "u8-pk-angle-chain":{src:"Math 7 indicator 10.1",group:"angle-facts",for:PK9_FOR_C11},
  "u9-pk-mean-basic":{src:"Math 7 indicator 11.6",group:"centre-measures",for:PK9_FOR_C13},
  "u9-pk-median-mode":{src:"Math 7 indicator 11.6",group:"centre-measures",for:PK9_FOR_C13},
  "u9-pk-two-graphs":{src:"Math 8 indicator 11.1",group:"graph-judgement",for:PK9_FOR_C13},
  "u9-pk-misleading-format":{src:"Math 8 indicator 11.4",group:"graph-judgement",for:PK9_FOR_C13},
  "u9-pk-false-conclusion":{src:"Math 8 indicator 11.6",group:"graph-judgement",for:PK9_FOR_C13},
  "u9-pk-circle-graph":{src:"Math 7 indicator 11.9",group:"graphing-data",for:PK9_FOR_C13},
  "u9-pk-prob-basic":{src:"Math 7 indicators 12.1 and 12.2",group:"probability-forms",for:PK9_FOR_C12},
  "u9-pk-two-draws":{src:"Math 8 indicator 12.1",group:"probability-forms",for:PK9_FOR_C12},
  "u9-pk-product-rule":{src:"Math 8 indicator 12.3",group:"probability-forms",for:PK9_FOR_C12},
  "u9-pk-exp-vs-theor":{src:"Math 7 indicator 12.6",group:"probability-forms",for:PK9_FOR_C12},
  "u3-pk-repeated-product":{src:"Mathematics 5 indicator MA5.5.19 (authored for this tranche; no banked source exists)",group:"repeated-multiplication",for:PK9_FOR_C4},
  "u3-pk-repeated-write":{src:"Mathematics 5 indicator MA5.5.19 (authored for this tranche; no banked source exists)",group:"repeated-multiplication",for:PK9_FOR_C4},
  "u3-pk-related-division":{src:"Mathematics 5 indicator MA5.5.19 (authored for this tranche; no banked source exists)",group:"repeated-multiplication",for:PK9_FOR_C4},
  "u3-pk-doubling-step":{src:"Mathematics 5 indicator MA5.5.16 (authored for this tranche; no banked source exists)",group:"repeated-multiplication",for:PK9_FOR_C4},
  "u3-pk-annex-zeros":{src:"Mathematics 5 indicator MA5.5.18 (authored for this tranche; no banked source exists)",group:"repeated-multiplication",for:PK9_FOR_C4},
  "u9-gap-freq-mean-cr":{src:"Math 7 indicators 11.6 and 11.9",group:"freq-table",for:["11.9"]},
  "u9-gap-freq-mean-mc":{src:"Math 7 indicators 11.6 and 11.9",group:"freq-table",for:["11.9"]},
  "u9-gap-mean-diff-cr":{src:"Math 7 indicators 11.6 and 11.9",group:"centre-measures",for:["11.9"]},
  "u9-gap-expected-freq-cr":{src:"Math 7 indicators 12.6 and 12.7",group:"expected-count",for:["12.4"]},
  "u9-gap-win-points-cr":{src:"Math 7 indicators 12.6 and 12.7",group:"expected-count",for:["12.4"]}
};
BANK.forEach(function(e){var t=PKT9[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=t.for.slice();e.pkGroup=t.group;}});


/* =====================================================================
   BAND 3 PIECE 1: THE FLUENCY STRAND (November 16, 2026)
   =====================================================================
   Thirty copied entries, appended after the Band 1 and 2 tables above
   and flagged by the PKT9S table at the end of this section. Every
   generator below is a verbatim copy of its source entry, retagged
   with a u{unit}-pkf- id, the housing unit and the host indicator of
   its group; only the entry header and the tranche metadata differ.
   Provenance is recorded three ways, as the specification requires:
   the pkSrc on each entry (what the item assesses, in code style),
   this comment block, and the build report's source-to-host table.

   LADDER COPIES FROM THE MATHEMATICS 7 FLUENCY CORE (housed Unit 1,
   pkFor 3.1, 3.2, 6.1 to 6.4). The core entries are themselves
   grounded in the elementary guides; the copy's pkSrc keeps that
   grounding.
     multiplication-facts (3): u1-pkf-fact-recall and
       u1-pkf-fact-division copy u1-pk-fact-recall and
       u1-pk-fact-division (Mathematics 5, MA5.5.19); u1-pkf-fact-
       halving copies u1-pk-fact-halving (MA5.5.17).
     ordering-numbers (3): u1-pkf-order-place copies u2-pk-order-place
       (Mathematics 4, MA4.1.1); u1-pkf-order-line copies
       u2-pk-order-line (MA4.1.2); u1-pkf-order-below copies
       u2-pk-order-below (Mathematics 6, MA6.1.2).
   ESSENTIALS COPIED FROM THE MATHEMATICS 8 BANK (the assessed-content
   generators the Mathematics 9 course assumes).
     integer-operations (6, Unit 1; pkFor adds 3.4 to 3.15):
       u1-pkf-mult-model-chips (8 bank 6.17), u1-pkf-product-sign-
       apply (6.18), u1-pkf-mult-problem (6.20), u1-pkf-quotient-sign-
       apply (6.22), u1-pkf-div-2by1 (6.24), u1-pkf-ooo-num (6.27).
     fraction-operations (6, Unit 1): u1-pkf-model-frac-times-whole
       (6.4), u1-pkf-area-model-product (6.5), u1-pkf-estimate-
       product-benchmark (6.7), u1-pkf-model-whole-div-frac (6.9),
       u1-pkf-model-division-bar (6.10), u1-pkf-context-divide-
       expression (6.14).
     equation-solving (5, Unit 5; pkFor 8.17 to 8.23):
       u5-pkf-solve-one-step (8.4), u5-pkf-visual-step (8.2),
       u5-pkf-solve-distributive (8.5), u5-pkf-solve-div-plus (8.4),
       u5-pkf-solve-context-problem (8.7).
   ESSENTIALS COPIED FROM THE MATHEMATICS 7 BANK.
     decimal-operations (4 added, Unit 1; the group's Band 1 core
       already holds u1-pk-add-sub-decimals, u1-pk-mult-decimals and
       u1-pk-order-mixed): u1-pkf-div-decimals (7 bank 6.8),
       u1-pkf-frontend-sum (6.1), u1-pkf-frontend-prod-quot (6.2),
       u1-pkf-reasonableness (6.4).
     centre-measures (3 added, Unit 9; pkFor 11.9; the group's core is
       the three flags set on November 13, 2026): u9-pkf-mean-basic
       and u9-pkf-median-mode copy the Mathematics 7 bank's
       u7-mean-basic and u7-median-mode (7 bank 11.6);
       u9-pkf-range-basic copies u7-range-basic (7 bank 11.7, the
       range indicator inside the same centre cluster).
   The strand's designated groups repeated-multiplication and
   sign-rules (Unit 3) gain no entries in this piece: their existing
   flags already carry them, as the specification records.
   Ported helpers below: pk7uniq, pk7fill and pk7line verbatim from
   banks/math-7/bank-pk.js (the ladder copies call them); u3plain,
   u3areaSVG and u3barSVG verbatim from banks/math-8/bank-u3.js (the
   fraction copies call them). The remaining helpers the copies call
   (FR, precPair, u2sg, u2dist, u3disp, u3red, u3gcd, u6pick3,
   u7mean, u7median, u7numOpts) already live in this bank. */

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
function u3plain(n, d) { var r = u3red(n, d); n = r[0]; d = r[1]; if (d === 1) return "" + n; if (n < d) return n + "/" + d; var w = Math.floor(n / d), rem = n % d; if (rem === 0) return "" + w; return w + " " + rem + "/" + d; }
function u3areaSVG(n1, d1, n2, d2) {
  var W = 252, H = 144, cw = W / d2, ch = H / d1, cells = "";
  for (var r = 0; r < d1; r++) for (var c = 0; c < d2; c++) {
    var fill = "none";
    if (c < n2 && r < n1) fill = FIG_ACC; else if (c < n2) fill = FIG_SHADE;
    cells += "<rect x='" + (c * cw) + "' y='" + (r * ch) + "' width='" + cw + "' height='" + ch + "' fill='" + fill + "' fill-opacity='" + (fill === FIG_ACC ? "0.55" : "1") + "' stroke='" + FIG_INK + "' stroke-width='1'/>";
  }
  return "<svg viewBox='0 0 252 144' width='252' height='144' xmlns='http://www.w3.org/2000/svg'>" + cells + "<rect x='0' y='0' width='252' height='144' fill='none' stroke='" + FIG_INK + "' stroke-width='2.5'/></svg>";
}
function u3barSVG(total, shaded, group) {
  var W = 280, H = 46, cw = W / total, cells = "";
  for (var i = 0; i < total; i++) {
    var fill = i < shaded ? FIG_SHADE : "none";
    var sw = (i % group === 0 || i === total - 1) ? 2.5 : 1;
    cells += "<rect x='" + (i * cw) + "' y='4' width='" + cw + "' height='38' fill='" + fill + "' stroke='" + FIG_INK + "' stroke-width='1'/>";
    if (i % group === 0) cells += "<line x1='" + (i * cw) + "' y1='2' x2='" + (i * cw) + "' y2='44' stroke='" + FIG_INK + "' stroke-width='" + sw + "'/>";
  }
  cells += "<line x1='280' y1='2' x2='280' y2='44' stroke='" + FIG_INK + "' stroke-width='2.5'/>";
  return "<svg viewBox='0 0 280 50' width='280' height='50' xmlns='http://www.w3.org/2000/svg'>" + cells + "</svg>";
}

E("u1-pkf-fact-recall", 1, ["3.1"], 1, "gen", function () {
  var a = ri(3, 9), b = ri(3, 9), ans = a * b;
  var ds = pk7fill(ans, pk7uniq(ans, [(a - 1) * b, (a + 1) * b, a * (b - 1), a * (b + 1), ans - a, ans + b])).slice(0, 3);
  return mcq("What is \\(" + a + " \\times " + b + "\\)?",
    { t: String(ans), fb: "Correct: \\(" + a + " \\times " + b + " = " + ans + "\\)." },
    ds.map(function (d) { return { t: String(d), fb: "That is the product of a nearby fact. Say the fact for \\(" + a + " \\times " + b + "\\) itself." }; }),
    "The multiplication facts to \\(9 \\times 9\\) are recalled directly: \\(" + a + " \\times " + b + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, b: b });
}, ["Say the fact out loud before you look at the choices.","If the fact will not come, count up by one factor: groups of the other."]);

E("u1-pkf-fact-division", 1, ["3.1"], 1, "gen", function () {
  var a = ri(3, 9), b = ri(4, 9), p = a * b;
  var ds = pk7uniq(b, [b - 1, b + 1, b + 2, b - 2]).slice(0, 3);
  return mcq("What is \\(" + p + " \\div " + a + "\\)?",
    { t: String(b), fb: "Correct: \\(" + a + " \\times " + b + " = " + p + "\\), so \\(" + p + " \\div " + a + " = " + b + "\\)." },
    ds.map(function (d) { return { t: String(d), fb: "Check with multiplication: \\(" + a + " \\times " + d + "\\) is not " + p + "." }; }),
    "Division facts come from the matching multiplication fact: \\(" + a + " \\times " + b + " = " + p + "\\), so \\(" + p + " \\div " + a + " = " + b + "\\). The answer is <b>" + b + "</b>.",
    { a: a, b: b });
}, ["Think of the multiplication fact with the same numbers.","Ask: the divisor times what gives the number being divided?"]);

E("u1-pkf-fact-halving", 1, ["3.1"], 1, "gen", function () {
  var a = ri(2, 4), b = ri(3, 9), known = 2 * a * b, ans = a * b;
  var ds = pk7fill(ans, pk7uniq(ans, [known - b, ans + b, known - 2 * b, ans - b])).slice(0, 3);
  return mcq("You know that \\(" + (2 * a) + " \\times " + b + " = " + known + "\\). What is \\(" + a + " \\times " + b + "\\)?",
    { t: String(ans), fb: "Correct: " + a + " is half of " + (2 * a) + ", so the product halves too: " + known + " halved is " + ans + "." },
    ds.map(function (d) { return { t: String(d), fb: "Halving one factor halves the product; subtracting a group does something else." }; }),
    "\\(" + a + "\\) is half of \\(" + (2 * a) + "\\), so \\(" + a + " \\times " + b + "\\) is half of \\(" + known + "\\): \\(" + known + " \\div 2 = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, b: b });
}, ["Compare the first factors of the two facts.","When one factor is halved, what happens to the product?"]);

E("u1-pkf-order-place", 1, ["3.1"], 1, "gen", function () {
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
}, ["Compare the numbers from the leftmost digit.","The first place where the digits differ settles it."]);

E("u1-pkf-order-line", 1, ["3.1"], 1, "gen", function () {
  var lo = ri(0, 40), mark = lo + ri(2, 8);
  var ds = pk7uniq(mark, [mark - 1, mark + 1, mark + 2]).slice(0, 3);
  var q = mcq("Which number does the marker show on this number line?",
    { t: String(mark), fb: "Correct: count along the ticks from " + lo + "." },
    ds.map(function (d) { return { t: String(d), fb: "Count the ticks one at a time from the labelled start." }; }),
    "Each tick is one more than the tick before it. Counting from " + lo + ", the marker sits at <b>" + mark + "</b>.",
    { lo: lo, mark: mark });
  q.figure = pk7line(lo, lo + 10, [mark], null);
  return q;
}, ["Start at the labelled number on the left.","Count one tick at a time up to the marker."]);

E("u1-pkf-order-below", 1, ["3.1"], 2, "gen", function () {
  var mark = ri(-5, -1);
  var ds = pk7uniq(mark, [-mark, mark - 1, mark + 1]).slice(0, 3);
  var q = mcq("Which number does the marker show on this number line?",
    { t: String(mark), fb: "Correct: the marker is " + Math.abs(mark) + " tick(s) to the left of 0." },
    ds.map(function (d) { return { t: String(d), fb: d === -mark ? "That is the same distance from zero but on the positive side; the marker is on the negative side." : "Count the ticks from 0, and note which side of 0 the marker is on." }; }),
    "The marker is " + Math.abs(mark) + " tick(s) to the left of 0, so it shows <b>" + mark + "</b>.",
    { mark: mark });
  q.figure = pk7line(-6, 6, [mark], null);
  return q;
}, ["Find 0 first, then count the ticks to the marker.","Numbers to the left of 0 are negative."]);

E("u1-pkf-mult-model-chips", 1, ["3.1"], 1, "gen", function () {
  var g = ri(2, 6), m = ri(2, 7);
  if (Math.random() < 0.5) {
    var val = g * (-m);
    var prompt = "A chip model shows " + g + " equal groups. Each group holds " + m + " red chips, and each red chip stands for \\(-1\\). What product and value does the model show?";
    var solution = "There are " + g + " groups of \\(-" + m + "\\): \\[ \\begin{aligned} " + g + " \\times (-" + m + ") &= " + val + " \\end{aligned} \\] So the model shows the product <b>\\(" + g + " \\times (-" + m + ") = " + val + "\\)</b>.";
    return mcq(prompt,
      { t: fmt(val), fb: "Correct. The model shows " + g + " groups of negative " + m + "." },
      u2dist(val, [
        { v: -val, fb: "The sign is wrong. Groups of red (negative) chips give a negative total." },
        { v: g - m, fb: "That subtracts the group size from the number of groups instead of multiplying." },
        { v: -(g + m), fb: "That adds the two numbers instead of multiplying them." }
      ]),
      solution, { mode: "chips-groups", g: g, m: m });
  }
  var val2 = g * m;
  var prompt2 = "Starting from zero pairs, a student takes away " + g + " groups of " + m + " red chips, where each red chip stands for \\(-1\\). Taking away red chips is recorded as multiplying by \\(-" + g + "\\). What is the value of the model?";
  var solution2 = "Taking away " + g + " groups of \\(-" + m + "\\) is the product \\((-" + g + ") \\times (-" + m + ")\\). Two negatives give a positive: \\[ \\begin{aligned} (-" + g + ") \\times (-" + m + ") &= " + val2 + " \\end{aligned} \\] So the value of the model is <b>" + val2 + "</b>.";
  return mcq(prompt2,
    { t: fmt(val2), fb: "Correct. Removing groups of negative chips raises the value." },
    u2dist(val2, [
      { v: -val2, fb: "The sign is wrong. A negative times a negative gives a positive." },
      { v: m - g, fb: "That subtracts the numbers of groups instead of multiplying." },
      { v: g + m, fb: "That adds the two numbers instead of multiplying them." }
    ]),
    solution2, { mode: "chips-removal", g: g, m: m });
}, ["Count the groups first, then the value in each group.","Red chips stand for negatives, and taking groups away is also a negative action."]);

E("u1-pkf-product-sign-apply", 1, ["3.1"], 1, "gen", function () {
  var a = 0, b = 0;
  while (a === 0) a = ri(-9, 9);
  while (b === 0) b = ri(-9, 9);
  var val = a * b;
  var prompt = "Evaluate: \\(" + u2sg(a) + " \\times " + u2sg(b) + "\\)";
  var signNote = (a < 0 && b < 0) ? "The signs are the same, so the product is positive."
    : (a < 0 || b < 0) ? "The signs are different, so the product is negative."
    : "Both factors are positive, so the product is positive.";
  var solution = signNote + " Multiply the sizes: \\[ \\begin{aligned} " + u2sg(a) + " \\times " + u2sg(b) + " &= " + val + " \\end{aligned} \\] So the product is <b>" + val + "</b>.";
  return mcq(prompt,
    { t: fmt(val), fb: "Correct. " + signNote },
    u2dist(val, [
      { v: -val, fb: "The size is right but the sign is wrong. Check whether the signs are the same or different." },
      { v: a + b, fb: "That adds the two numbers instead of multiplying them." },
      { v: a - b, fb: "That subtracts the two numbers instead of multiplying them." }
    ]),
    solution, { mode: "product-sign", a: a, b: b });
}, ["Decide the sign first: same signs give a positive, different signs give a negative.","Multiply the sizes of the two numbers, then attach the sign."]);

E("u1-pkf-mult-problem", 1, ["3.1"], 1, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var start = ri(-6, 8), r = ri(2, 6), h = ri(3, 7);
    var ans = start - r * h;
    var prompt = "At supper time the temperature in Corner Brook is " + start + " degrees. It then falls " + r + " degrees each hour for " + h + " hours. What is the temperature after " + h + " hours, in degrees?";
    var solution = "The total fall is a product, then subtract it from the start: \\[ \\begin{aligned} " + start + " + (-" + r + ") \\times " + h + " &= " + start + " - " + (r * h) + " \\\\ &= " + ans + " \\end{aligned} \\] So the temperature is <b>" + ans + " degrees</b>.";
    return numq(prompt, ans, 0.01, solution, { mode: "temp-fall", start: start, r: r, h: h });
  }
  if (mode === 1) {
    var bal = ri(60, 240), w = ri(6, 20), k = ri(3, 8);
    var ansB = bal - w * k;
    var promptB = "A bank account holds $" + bal + ". The owner withdraws $" + w + " each week for " + k + " weeks, with no other activity. What is the balance after " + k + " weeks, in dollars?";
    var solutionB = "The total withdrawn is a product, then subtract it from the opening balance: \\[ \\begin{aligned} " + bal + " + (-" + w + ") \\times " + k + " &= " + bal + " - " + (w * k) + " \\\\ &= " + ansB + " \\end{aligned} \\] So the balance is <b>$" + ansB + "</b>.";
    return numq(promptB, ansB, 0.01, solutionB, { mode: "bank-withdraw", bal: bal, w: w, k: k });
  }
  var depth = ri(10, 60), rate = ri(3, 9), mins = ri(3, 8);
  var ansD = -(depth + rate * mins);
  var promptD = "A small submersible is " + depth + " m below the surface. It descends a further " + rate + " m each minute for " + mins + " minutes. Using negative numbers for positions below the surface, what is its position after " + mins + " minutes, in metres?";
  var solutionD = "The extra descent is a product, added to the starting depth: \\[ \\begin{aligned} -" + depth + " + (-" + rate + ") \\times " + mins + " &= -" + depth + " - " + (rate * mins) + " \\\\ &= " + ansD + " \\end{aligned} \\] So its position is <b>" + ansD + " m</b>.";
  return numq(promptD, ansD, 0.01, solutionD, { mode: "sub-descend", depth: depth, rate: rate, mins: mins });
}, ["Find the total repeated change first: that part is a multiplication.","Multiply the change per step by the number of steps, then combine it with the starting value."]);

E("u1-pkf-quotient-sign-apply", 1, ["3.1"], 1, "gen", function () {
  var d = 0;
  while (d === 0 || Math.abs(d) < 2) d = ri(-9, 9);
  var q = 0;
  while (q === 0 || Math.abs(q) < 2) q = ri(-9, 9);
  var dvd = d * q;
  var prompt = "Evaluate: \\(" + dvd + " \\div " + u2sg(d) + "\\)";
  var signNote = (dvd < 0 && d < 0) || (dvd > 0 && d > 0) ? "The signs are the same, so the quotient is positive." : "The signs are different, so the quotient is negative.";
  var solution = signNote + " Divide the sizes: \\[ \\begin{aligned} " + dvd + " \\div " + u2sg(d) + " &= " + q + " \\end{aligned} \\] So the quotient is <b>" + q + "</b>.";
  return mcq(prompt,
    { t: fmt(q), fb: "Correct. " + signNote },
    u2dist(q, [
      { v: -q, fb: "The size is right but the sign is wrong. Check whether the signs are the same or different." },
      { v: dvd - d, fb: "That subtracts the divisor instead of dividing." },
      { v: d, fb: "That just repeats the divisor. The quotient tells how many groups of the divisor fit." }
    ]),
    solution, { mode: "quotient-sign", d: d, q: q });
}, ["Decide the sign first: same signs give a positive, different signs give a negative.","Divide the size of the first number by the size of the second, then attach the sign."]);

E("u1-pkf-div-2by1", 1, ["3.1"], 1, "gen", function () {
  var P = null;
  for (var tries = 0; tries < 300 && !P; tries++) {
    var d = ri(2, 9);
    var q = ri(3, 12) * (Math.random() < 0.5 ? -1 : 1);
    var dvd = d * q;
    if (Math.abs(dvd) < 10 || Math.abs(dvd) > 99) continue;
    P = { d: d, q: q, dvd: dvd };
  }
  if (!P) P = { d: 6, q: -7, dvd: -42 };
  var prompt = "A tide gauge shows the water level changed by a total of " + P.dvd + " cm, made up of " + P.d + " equal hourly changes. What was the change in each hour, in centimetres?";
  var solution = "Split the total change into " + P.d + " equal parts, then use the sign rule: \\[ \\begin{aligned} " + P.dvd + " \\div " + P.d + " &= " + P.q + " \\end{aligned} \\] So the change in each hour was <b>" + P.q + " cm</b>.";
  return numq(prompt, P.q, 0.01, solution, { mode: "div-2by1", d: P.d, q: P.q });
}, ["The dividend has two digits and the divisor has one digit.","Divide the sizes first, then use the sign rule for the quotient."]);

E("u1-pkf-ooo-num", 1, ["3.1"], 2, "gen", function () {
  var s = pick([2, 3, 4, 5, 6]) * (Math.random() < 0.5 ? -1 : 1);
  var qq = ri(2, 9) * (Math.random() < 0.5 ? -1 : 1);
  var r = s * qq;
  var p = 0, q = 0;
  while (p === 0) p = ri(-8, 8);
  while (q === 0) q = ri(-8, 8);
  var val = p * q - qq;
  var prompt = "Evaluate: \\(" + u2sg(p) + " \\times " + u2sg(q) + " - " + r + " \\div " + u2sg(s) + "\\)";
  var solution = "Do the multiplication and the division before the subtraction: \\[ \\begin{aligned} " + u2sg(p) + " \\times " + u2sg(q) + " - " + r + " \\div " + u2sg(s) + " &= " + (p * q) + " - " + qq + " \\\\ &= " + val + " \\end{aligned} \\] So the value is <b>" + val + "</b>.";
  return numq(prompt, val, 0.01, solution, { mode: "ooo-num", p: p, q: q, s: s });
}, ["Multiplication and division are done before addition and subtraction.","Work out the product and the quotient separately, then combine them."]);

E("u1-pkf-model-frac-times-whole", 1, ["3.1"], 1, "gen", function () {
  var P = null;
  for (var t = 0; t < 200 && !P; t++) {
    var d = ri(3, 8), n = ri(1, d - 1), w = ri(2, 6);
    var vals = [u3disp(w * n, d), u3disp(n + w, d), u3disp(n, d), u3disp(w, d)];
    if (new Set(vals).size < 4) continue;
    P = { d: d, n: n, w: w, vals: vals };
  }
  if (!P) P = { d: 4, n: 3, w: 3, vals: [u3disp(9, 4), u3disp(6, 4), u3disp(3, 4), u3disp(3, 4)] };
  var prompt = "A model shows \\(" + P.w + "\\) equal groups. In each group, " + u3disp(P.n, P.d) + " is shaded. What is the total amount shaded?";
  var adds = []; for (var i = 0; i < P.w; i++) adds.push(FR(P.n, P.d));
  var solution = "Add the same fraction once for each group, which is multiplication: \\[ \\begin{aligned} " + adds.join(" + ") + " &= " + P.w + " \\times " + FR(P.n, P.d) + " \\\\ &= " + FR(P.w * P.n, P.d) + " \\\\ &= " + u3plain(P.w * P.n, P.d) + " \\end{aligned} \\] So the total shaded is <b>" + u3disp(P.w * P.n, P.d) + "</b>.";
  return mcq(prompt,
    { t: P.vals[0], fb: "Correct. Each of the " + P.w + " groups contributes the same fraction." },
    [
      { t: P.vals[1], fb: "This adds the whole number to the numerator, but the model repeats the fraction instead." },
      { t: P.vals[2], fb: "That is the amount shaded in just one group." },
      { t: P.vals[3], fb: "This uses the whole number as a numerator over the same denominator, which is not repeated addition." }
    ],
    solution, { mode: "model-times-whole", n: P.n, d: P.d, w: P.w });
}, ["Multiplication by a whole number means adding the fraction the same number of times.","First write the total as a repeated addition of the fraction."]);

E("u1-pkf-area-model-product", 1, ["3.1"], 1, "gen", function () {
  var P = null;
  for (var t = 0; t < 200 && !P; t++) {
    var d1 = ri(3, 5), n1 = ri(1, d1 - 1), d2 = ri(3, 6), n2 = ri(1, d2 - 1);
    var vals = [u3disp(n1 * n2, d1 * d2), u3disp(n1, d1), u3disp(n2, d2), u3disp(n1 + n2, d1 + d2)];
    if (new Set(vals).size < 4) continue;
    P = { n1: n1, d1: d1, n2: n2, d2: d2, vals: vals };
  }
  if (!P) P = { n1: 2, d1: 3, n2: 3, d2: 4, vals: [u3disp(6, 12), u3disp(2, 3), u3disp(3, 4), u3disp(5, 7)] };
  var prompt = "A rectangle is split into \\(" + P.d1 + "\\) equal rows and \\(" + P.d2 + "\\) equal columns. " + P.n1 + " of the rows and " + P.n2 + " of the columns are shaded, modelling " + u3disp(P.n1, P.d1) + " \\(\\times\\) " + u3disp(P.n2, P.d2) + ". What fraction of the whole rectangle is shaded both ways, in the overlap?";
  var solution = "The overlap covers \\(" + (P.n1 * P.n2) + "\\) of the \\(" + (P.d1 * P.d2) + "\\) small cells: \\[ \\begin{aligned} " + FR(P.n1, P.d1) + " \\times " + FR(P.n2, P.d2) + " &= " + FR(P.n1 * P.n2, P.d1 * P.d2) + " \\\\ &= " + FR(u3red(P.n1 * P.n2, P.d1 * P.d2)[0], u3red(P.n1 * P.n2, P.d1 * P.d2)[1]) + " \\end{aligned} \\] So the overlap is <b>" + P.vals[0] + "</b> of the rectangle.";
  var q = mcq(prompt,
    { t: P.vals[0], fb: "Correct. The overlap is the product of the two shaded fractions." },
    [
      { t: P.vals[1], fb: "That is only the fraction of rows shaded, ignoring the columns." },
      { t: P.vals[2], fb: "That is only the fraction of columns shaded, ignoring the rows." },
      { t: P.vals[3], fb: "This adds the shaded parts instead of finding their overlap." }
    ],
    solution, { mode: "area-model", n1: P.n1, d1: P.d1, n2: P.n2, d2: P.d2 });
  q.figure = u3areaSVG(P.n1, P.d1, P.n2, P.d2);
  return q;
}, ["The overlap is where the row shading and the column shading cross.","Count the overlap cells, then count all the cells in the rectangle."]);

E("u1-pkf-estimate-product-benchmark", 1, ["3.1"], 2, "gen", function () {
  var P = null;
  for (var t = 0; t < 300 && !P; t++) {
    var d1 = ri(3, 10), n1 = ri(1, d1 - 1), d2 = ri(3, 10), n2 = ri(1, d2 - 1);
    var p = (n1 / d1) * (n2 / d2);
    var bench = [0, 0.5, 1], bi = 0, best = 9;
    bench.forEach(function (b, i) { var dd = Math.abs(p - b); if (dd < best) { best = dd; bi = i; } });
    if (best > 0.18) continue;
    var second = 9; bench.forEach(function (b, i) { if (i !== bi) second = Math.min(second, Math.abs(p - b)); });
    if (second - best < 0.12) continue;
    P = { n1: n1, d1: d1, n2: n2, d2: d2, p: p, bi: bi };
  }
  if (!P) P = { n1: 3, d1: 4, n2: 2, d2: 3, p: 0.5, bi: 1 };
  var labels = ["0", "\\(" + FR(1, 2) + "\\)", "\\(" + FR(2, 2) + "\\)", "2"];
  var correct = labels[P.bi];
  var distractors = labels.filter(function (l, i) { return i !== P.bi; }).map(function (l) {
    var fb = l === "2" ? "A product of two fractions less than 1 is less than 1, so it cannot be near 2." : "Compare each factor with \\(" + FR(1, 2) + "\\) first: the product lands nearer a different benchmark.";
    return { t: l, fb: fb };
  });
  var prompt = "The product " + u3disp(P.n1, P.d1) + " \\(\\times\\) " + u3disp(P.n2, P.d2) + " is closest to which benchmark?";
  var solution = "Estimate each factor: \\(" + FR(P.n1, P.d1) + "\\) is about \\(" + fmt(Math.round(P.n1 / P.d1 * 2) / 2) + "\\) and \\(" + FR(P.n2, P.d2) + "\\) is about \\(" + fmt(Math.round(P.n2 / P.d2 * 2) / 2) + "\\), and the exact product is \\(" + fmt(Math.round(P.p * 1000) / 1000) + "\\). So the product is closest to <b>" + correct + "</b>.";
  return mcq(prompt, { t: correct, fb: "Correct. Estimating each factor first puts the product nearest this benchmark." }, distractors, solution, { mode: "est-product", bi: P.bi });
}, ["Compare each fraction with one half before you multiply.","Ask whether each factor is small, near one half, or near one."]);

E("u1-pkf-model-whole-div-frac", 1, ["3.1"], 1, "gen", function () {
  var w = ri(2, 6), d = ri(3, 10);
  var ans = w * d;
  var thing = pick(["wholes", "pizzas", "ribbons", "litres of juice"]);
  var prompt = "A diagram shows \\(" + w + "\\) " + (thing === "wholes" ? "wholes" : "whole " + thing) + ". Each whole is split into \\(" + d + "\\) equal parts, modelling \\(" + w + " \\div " + FR(1, d) + "\\). How many parts are there in all?";
  var solution = "Each whole contributes \\(" + d + "\\) parts: \\[ \\begin{aligned} " + w + " \\div " + FR(1, d) + " &= " + w + " \\times " + d + " \\\\ &= " + ans + " \\end{aligned} \\] So there are <b>" + ans + " parts</b> in all.";
  return mcq(prompt,
    { t: "" + ans, fb: "Correct. Multiply the number of wholes by the parts in each whole." },
    [
      { t: "" + (w + d), fb: "This adds the two numbers, but each whole holds several parts." },
      { t: "" + d, fb: "That counts the parts in only one whole." },
      { t: "" + (w * (d + 1)), fb: "This counts one extra part in every whole." }
    ],
    solution, { mode: "model-whole-div", w: w, d: d });
}, ["Count the parts inside one whole first, then scale up to all the wholes.","Division by a unit fraction asks how many of those parts fit."]);

E("u1-pkf-model-division-bar", 1, ["3.1"], 1, "gen", function () {
  var P = null;
  for (var t = 0; t < 400 && !P; t++) {
    var d1 = pick([2, 3, 4, 5, 6, 8]), n1 = ri(1, d1 - 1), d2 = pick([2, 3, 4, 5, 6, 8]);
    var L = (d1 * d2) / u3gcd(d1, d2);
    if (L > 20) continue;
    var shaded = n1 * (L / d1), grp = L / d2;
    if (shaded % grp !== 0) continue;
    var cnt = shaded / grp;
    if (cnt < 2) continue;
    P = { n1: n1, d1: d1, d2: d2, L: L, shaded: shaded, grp: grp, cnt: cnt };
  }
  if (!P) P = { n1: 2, d1: 3, d2: 6, L: 6, shaded: 4, grp: 1, cnt: 4 };
  var item = pick(["strip", "ribbon", "rope", "board"]);
  var prompt = "A bar model shows " + u3disp(P.n1, P.d1) + " of a " + item + " shaded. The " + item + " is split into \\(" + P.L + "\\) equal small parts, and the bold marks group the parts into servings of " + u3disp(1, P.d2) + " of a " + item + " each. How many servings are in the shaded part?";
  var solution = "Use the common split of \\(" + P.L + "\\) parts: \\[ \\begin{aligned} " + FR(P.n1, P.d1) + " &= " + FR(P.shaded, P.L) + " \\\\ " + FR(1, P.d2) + " &= " + FR(P.grp, P.L) + " \\\\ " + P.shaded + " \\div " + P.grp + " &= " + P.cnt + " \\end{aligned} \\] So there are <b>" + P.cnt + " servings</b> in the shaded part.";
  var q = numq(prompt, P.cnt, 0, solution, { mode: "model-div-bar", n1: P.n1, d1: P.d1, d2: P.d2 });
  q.figure = u3barSVG(P.L, P.shaded, P.grp);
  return q;
}, ["Rewrite both fractions using the small parts shown on the bar.","Count the shaded small parts, then divide by the parts in one serving."]);

E("u1-pkf-context-divide-expression", 1, ["3.1"], 1, "gen", function () {
  var tmpls = [
    function (a, b) { return "A ribbon " + a + " m long is cut into pieces that are each " + b + " m long. Which expression gives the number of pieces?"; },
    function (a, b) { return "A jug holds " + a + " L of juice. It is poured equally into bottles that each hold " + b + " L. Which expression gives the number of bottles filled?"; },
    function (a, b) { return "A trail crew has " + a + " kg of gravel to spread in loads of " + b + " kg each. Which expression gives the number of loads?"; },
    function (a, b) { return "A tank holds " + a + " L of water. Each watering can takes " + b + " L. Which expression gives the number of cans that can be filled?"; }
  ];
  var d1 = ri(3, 9), n1 = ri(1, d1 - 1), d2 = ri(3, 9), n2 = ri(1, d2 - 1);
  if (u3plain(n1, d1) === u3plain(n2, d2)) { n2 = n2 % (d2 - 1) + 1; if (u3plain(n1, d1) === u3plain(n2, d2)) n1 = n1 % (d1 - 1) + 1; }
  var A = u3disp(n1, d1), B = u3disp(n2, d2);
  var prompt = pick(tmpls)(A, B);
  var div = "\\(" + FR(n1, d1) + " \\div " + FR(n2, d2) + "\\)";
  var solution = "The context asks how many groups of one size fit into a total, which is division with the total first: \\[ \\begin{aligned} " + FR(n1, d1) + " \\div " + FR(n2, d2) + " \\end{aligned} \\] So the expression is <b>" + div + "</b>.";
  return mcq(prompt,
    { t: div, fb: "Correct. The total is divided by the size of each group." },
    [
      { t: "\\(" + FR(n2, d2) + " \\div " + FR(n1, d1) + "\\)", fb: "This puts the group size first, but division starts from the total amount." },
      { t: "\\(" + FR(n1, d1) + " \\times " + FR(n2, d2) + "\\)", fb: "Multiplication takes a part of a part, but this context counts how many groups fit." },
      { t: "\\(" + FR(n1, d1) + " - " + FR(n2, d2) + "\\)", fb: "Subtraction finds what is left after one removal, not the number of groups." }
    ],
    solution, { mode: "ctx-div-expr", n1: n1, d1: d1, n2: n2, d2: d2 });
}, ["Ask whether the context counts groups that fit into a total.","In a division expression, the total amount comes first."]);

E("u1-pkf-div-decimals", 1, ["3.1"], 1, "gen", function(){
  var ctxs=[
    {s:"A rope %D m long is cut into %V equal pieces. How long is each piece, in metres?"},
    {s:"A group pays $%D for a van rental, split equally among %V friends. How much does each friend pay?"},
    {s:"A jug holds %D L of juice, poured equally into %V bottles. How many litres are in each bottle?"}
  ];
  var useDecDiv=ri(0,1)===0;
  var dv=useDecDiv?ri(3,9)/10:ri(3,9);
  var q=ri(125,2400)/100;
  var dvd=q*dv;
  var c=pick(ctxs);
  var prompt=c.s.replace("%D",fmt(dvd,3)).replace("%V",fmt(dv,1));
  var money=c.s.indexOf("$")>=0;
  var pool=[q*10,q/10,q+dv,q- dv];
  var seen={}; seen[fmt(q,3)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    if(!(pool[i]>0))continue;
    var k=fmt(pool[i],3);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:(money?"$":"")+k, fb:"Check by multiplying your answer by the divisor: it should return the starting amount."});
  }
  var corT=(money?"$":"")+fmt(q,3);
  ds.forEach(function(o){if(money&&o.t.indexOf("$")!==0)o.t="$"+o.t;});
  ds=precPair(corT,ds);
  return mcq(prompt,
    {t:corT, fb:"Yes: "+fmt(q,3)+" times "+fmt(dv,1)+" gives back "+fmt(dvd,3)+"."},
    ds,
    "\\[ \\begin{aligned} "+fmt(dvd,3)+" \\div "+fmt(dv,1)+" &= "+fmt(q,3)+" \\end{aligned} \\] Check: \\("+fmt(q,3)+" \\times "+fmt(dv,1)+" = "+fmt(dvd,3)+"\\). The answer is <b>"+corT+"</b>.",
    {dv:dv, q:q});
}, ["Division undoes multiplication: answer times divisor should give the starting amount.","Start by estimating: how many groups of the divisor fit into the starting amount?"]);

E("u1-pkf-frontend-sum", 1, ["3.1"], 2, "gen", function(){
  var A=ri(2,9)+ri(1,9)/10;
  var B=ri(1,9)/10+ri(1,99)/100;
  var C=ri(120,480)+ri(1,999)/1000;
  var isSum=ri(0,1)===0;
  var val=isSum?A+B+C:C-A;
  var milli=Math.round(val*1000), digits=String(milli);
  var decPos=digits.length-3;
  function place(pos){
    if(pos<=0)return "0."+("000".slice(0,-pos))+digits;
    if(pos>=digits.length)return digits+("000".slice(0,pos-digits.length));
    return digits.slice(0,pos)+"."+digits.slice(pos);
  }
  var posns=[decPos,decPos-1,decPos+1,decPos-2,decPos+2];
  var seen={}; var ds=[];
  var corStr=place(decPos); seen[corStr]=1;
  for(var i=1;i<posns.length&&ds.length<3;i++){
    var s2=place(posns[i]);
    if(seen[s2])continue; seen[s2]=1;
    ds.push({t:s2, fb:"Front-end estimation puts the value near "+fmt(Math.round(val))+", so that decimal placement is the wrong size."});
  }
  ds=precPair(corStr,ds);
  var expr=isSum?(fmt(A,1)+" + "+fmt(B,2)+" + "+fmt(C,3)):(fmt(C,3)+" - "+fmt(A,1));
  var fe=isSum?("the front ends are about "+Math.floor(A)+" + 0 + "+Math.floor(C)):("the front ends are about "+Math.floor(C)+" - "+Math.floor(A));
  return mcq("The digits of the answer to "+expr+" are "+digits+". Using front-end estimation, where does the decimal point belong?",
    {t:corStr, fb:"Yes: "+fe+", which matches this placement."},
    ds,
    "Front-end estimation: "+fe+", so the answer is in the "+(val>=100?"hundreds":val>=10?"tens":"ones")+" range. Placing the decimal point to give "+corStr+" matches. The answer is <b>"+corStr+"</b>.",
    {mode:isSum?"sum":"diff"});
}, ["Front-end estimation uses the leading digits to judge the size of the answer.","Start by adding or subtracting just the whole-number front ends."]);

E("u1-pkf-frontend-prod-quot", 1, ["3.1"], 2, "gen", function(){
  var isProd=ri(0,1)===0;
  var digits, decPos, prompt, feText, val;
  if(isProd){
    var P=ri(205,1999)/100, M=ri(21,49)/10;
    val=P*M;
    var milli=Math.round(val*1000); digits=String(milli); decPos=digits.length-3;
    prompt="The digits of the product $"+fmtF(P,2)+" x "+fmt(M,1)+" are "+digits+". Using front-end estimation, where does the decimal point belong in the product?";
    feText="the front ends give about $"+Math.floor(P)+" x "+Math.floor(M)+" = $"+(Math.floor(P)*Math.floor(M));
  } else {
    var q=ri(15,35)+ri(1,9)/10, dv=ri(21,49)/10, dvd=q*dv;
    val=q;
    digits=String(Math.round(q*10)); decPos=digits.length-1;
    prompt="The digits of the quotient "+fmt(dvd,2)+" / "+fmt(dv,1)+" are "+digits+". Using front-end estimation, where does the decimal point belong in the quotient?";
    feText="the front ends give about "+fmt(Math.round(dvd))+" / "+Math.floor(dv)+", roughly "+fmt(Math.round(dvd)/Math.floor(dv),0);
  }
  function place(pos){
    if(pos<=0)return "0."+("000".slice(0,-pos))+digits;
    if(pos>=digits.length)return digits+("000".slice(0,pos-digits.length));
    return digits.slice(0,pos)+"."+digits.slice(pos);
  }
  var corStr=place(decPos);
  var posns=[decPos-1,decPos+1,decPos-2,decPos+2];
  var seen={}; seen[corStr]=1; var ds=[];
  for(var i=0;i<posns.length&&ds.length<3;i++){
    var s2=place(posns[i]);
    if(seen[s2])continue; seen[s2]=1;
    ds.push({t:s2, fb:"Front-end estimation gives a different size: "+feText+"."});
  }
  ds=precPair(corStr,ds);
  return mcq(prompt,
    {t:corStr, fb:"Yes: "+feText+", which matches this placement."},
    ds,
    "Front-end estimation: "+feText+", so the answer must be that size. Only "+corStr+" fits. The answer is <b>"+corStr+"</b>.",
    {mode:isProd?"prod":"quot"});
}, ["Front-end estimation uses the leading digits to judge the size of the answer.","Start by multiplying or dividing just the front-end whole numbers."]);

E("u1-pkf-reasonableness", 1, ["3.1"], 1, "gen", function(){
  var mode=ri(0,2);
  if(mode===0){
    var a=ri(32,68), b=ri(3,9), cor=a*b, given=cor/10, est=Math.round(a/10)*10*b;
    return mcq("Kofi calculates "+a+" x "+b+" = "+fmt(given,1)+". Which check shows whether his answer is reasonable?",
      {t:"Estimate "+Math.round(a/10)*10+" x "+b+" = "+est+"; the answer should be near "+est+", so "+fmt(given,1)+" is too small", fb:"Yes: the estimate exposes a misplaced decimal point."},
      [{t:"The answer is reasonable because "+a+" x "+b+" has no decimal points in it", fb:"Whole-number factors can still give an answer of the wrong size: estimate to check."},
       {t:"Estimate "+Math.round(a/10)*10+" x "+b+" = "+est+"; since "+fmt(given,1)+" is a whole number it must be right", fb:"The estimate says the product should be near "+est+", far from the given value."},
       {t:"Add "+a+" + "+b+" = "+(a+b)+" to check the multiplication, using the same two numbers", fb:"Adding does not check a product: use a rounded multiplication estimate."}],
      "Estimate with rounded numbers: "+Math.round(a/10)*10+" x "+b+" = "+est+". The true product is "+cor+", so "+fmt(given,1)+" is far too small. The answer is <b>the estimate check</b>.",
      {mode:"mult"});
  }
  if(mode===1){
    var x=ri(210,480)+ri(1,99)/100, y=ri(110,290)+ri(1,99)/100, s=x+y, giv=Math.round(s)+100;
    var est2=Math.round(x)+Math.round(y);
    return mcq("Aisha calculates "+fmt(x,2)+" + "+fmt(y,2)+" = "+fmt(giv,2)+". Which check shows whether her answer is reasonable?",
      {t:"Estimate "+Math.round(x)+" + "+Math.round(y)+" = "+est2+"; the answer should be near "+est2+", so "+fmt(giv,2)+" is too large", fb:"Yes: rounding each addend exposes the error."},
      [{t:"The answer is reasonable because the cents digits add up correctly", fb:"Correct cents do not guarantee the whole-number part: estimate the full size."},
       {t:"Estimate "+Math.round(x)+" + "+Math.round(y)+" = "+est2+"; since the given answer ends in .00 it must be right", fb:"The estimate says the sum should be near "+est2+", far from the given value."},
       {t:"Multiply the two numbers to check the addition, with the same two numbers", fb:"Multiplication does not check an addition: use a rounded addition estimate."}],
      "Estimate with rounded numbers: "+Math.round(x)+" + "+Math.round(y)+" = "+est2+". The true sum is "+fmt(s,2)+", so "+fmt(giv,2)+" is too large. The answer is <b>the estimate check</b>.",
      {mode:"add"});
  }
  var T=ri(120,360), n=ri(4,8), per=T/n, giv2=per*10, est3=Math.round(T/10)*10/n;
  return mcq("Ravi calculates "+T+" / "+n+" = "+fmt(giv2,1)+". Which check shows whether his answer is reasonable?",
    {t:"Estimate "+Math.round(T/10)*10+" / "+n+" = "+fmt(est3,1)+"; the answer should be near "+fmt(est3,1)+", so "+fmt(giv2,1)+" is too large", fb:"Yes: the estimate exposes a misplaced decimal point."},
    [{t:"The answer is reasonable because "+n+" is a small divisor for a division question", fb:"A small divisor does not guarantee the size: estimate to check."},
     {t:"Estimate "+Math.round(T/10)*10+" / "+n+" = "+fmt(est3,1)+"; since "+fmt(giv2,1)+" beats a tenth of "+T+" it must be right", fb:"The estimate says the quotient should be near "+fmt(est3,1)+", far from the given value."},
     {t:"Subtract "+n+" from "+T+" to check the division, rather than estimating the quotient", fb:"Subtraction does not check a quotient: use a rounded division estimate."}],
    "Estimate with rounded numbers: "+Math.round(T/10)*10+" / "+n+" = "+fmt(est3,1)+". The true quotient is "+fmt(per,2)+", so "+fmt(giv2,1)+" is too large. The answer is <b>the estimate check</b>.",
    {mode:"div"});
}, ["A quick estimate with rounded numbers tells you the size the answer should be.","Start by rounding each number to a friendly value and redoing the operation."]);

E("u5-pkf-solve-one-step", 5, ["8.17"], 1, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var form = pick(["ax", "xa"]);
    var a = ri(2, 9), x = ri(2, 12), b = form === "ax" ? a * x : x;
    if (form === "xa") { b = x; x = a * b; } // equation x/a = b, solution x = a*b
    var solX = form === "ax" ? b / a : a * b;
    var eq = form === "ax" ? fmt(a) + "x = " + fmt(b) : "\\frac{x}{" + a + "} = " + fmt(b);
    var wrong = form === "ax" ? [b * a, b - a, b + a] : [b / a, b - a, b + a];
    var corr = fmt(solX);
    var dpA = (fmt(wrong[0]).split(".")[1] || "").length;
    var cands = wrong.map(function (w, wi) {
      return { t: (form === "xa" && wi === 1 && dpA > 0) ? fmtF(w, dpA) : fmt(w), fb: form === "ax" ? "That uses the wrong operation. To undo multiplying by " + a + ", divide both sides by " + a + "." : "That uses the wrong operation. To undo dividing by " + a + ", multiply both sides by " + a + "." };
    });
    var ds = u6pick3(corr, cands);
    if (!ds) continue;
    var steps = form === "ax"
      ? "\\begin{aligned} " + fmt(a) + "x &= " + fmt(b) + " \\\\ x &= " + fmt(b) + " \\div " + fmt(a) + " \\\\ x &= " + fmt(solX) + " \\end{aligned}"
      : "\\begin{aligned} \\frac{x}{" + a + "} &= " + fmt(b) + " \\\\ x &= " + fmt(b) + " \\times " + fmt(a) + " \\\\ x &= " + fmt(solX) + " \\end{aligned}";
    var sol = "Use the inverse operation on both sides: \\[ " + steps + " \\] So the solution is <b>\\(x = " + fmt(solX) + "\\)</b>.";
    return mcq("Solve the equation \\(" + eq + "\\). What is the value of \\(x\\)?",
      { t: corr, fb: "Correct. The inverse operation isolates x." }, ds, sol,
      { mode: "solve-one-step", form: form, a: a, b: b });
  }
  return mcq("Solve the equation \\(3x = 12\\). What is the value of \\(x\\)?",
    { t: "4", fb: "Correct. Divide both sides by 3." },
    [{ t: "36", fb: "That multiplies instead of dividing." }, { t: "9", fb: "That subtracts 3 instead of dividing by 3." }, { t: "15", fb: "That adds 3 instead of dividing by 3." }],
    "Divide both sides by 3: \\[ \\begin{aligned} 3x &= 12 \\\\ x &= 4 \\end{aligned} \\] So the solution is <b>\\(x = 4\\)</b>.", { mode: "solve-one-step-fallback" });
}, ["Think about what is being done to x, then use the opposite operation.","For ax = b divide both sides by a; for x/a = b multiply both sides by a."]);

E("u5-pkf-visual-step", 5, ["8.17"], 1, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var a = ri(2, 6), b = ri(2, 12), x = ri(2, 11), c = a * x + b;
    var step = pick(["remove", "split"]);
    if (step === "remove") {
      var corr = "\\(" + fmt(a) + "x = " + fmt(c - b) + "\\)";
      var ds = u6pick3(corr, [
        { t: "\\(" + fmt(a) + "x + " + fmt(b) + " = " + fmt(c - b) + "\\)", fb: "That removes the unit tiles from one side only. A balance stays level only when the same tiles leave both sides." },
        { t: "\\(" + fmt(a) + "x = " + fmt(c + b) + "\\)", fb: "That adds tiles to the right side. The picture removes " + fmt(b) + " unit tiles from each side." },
        { t: "\\(x = " + fmt(c - b) + "\\)", fb: "That skips a step. The bags are still closed at this stage, so the left side is still " + fmt(a) + "x." }
      ]);
      if (!ds) continue;
      var sol = "Removing " + fmt(b) + " unit tiles from both sides keeps the balance level: \\[ \\begin{aligned} " + fmt(a) + "x + " + fmt(b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(c) + " - " + fmt(b) + " \\\\ " + fmt(a) + "x &= " + fmt(c - b) + " \\end{aligned} \\] So the picture after this step shows <b>" + corr + "</b>.";
      return mcq("A balance model shows " + fmt(a) + " closed bags (each holding x counters) and " + fmt(b) + " loose counters on the left pan, balanced by " + fmt(c) + " counters on the right pan. The next picture removes " + fmt(b) + " loose counters from each pan. Which equation does the next picture show?",
        { t: corr, fb: "Correct. The same removal on both sides gives " + fmt(a) + "x = " + fmt(c - b) + "." }, ds, sol,
        { mode: "visual-remove", a: a, b: b });
    }
    var tot = a * x, per = x;
    var corrS = "\\(x = " + fmt(x) + "\\)";
    var dsS = u6pick3(corrS, [
      { t: "\\(x = " + fmt(per + 1) + "\\)", fb: "Count again: " + fmt(tot) + " counters split into " + fmt(a) + " equal groups gives " + fmt(per) + " in each group." },
      { t: "\\(" + fmt(a) + "x = " + fmt(tot) + "\\)", fb: "That is the picture before splitting. After the split, each single bag stands alone." },
      { t: "\\(x = " + fmt(tot) + "\\)", fb: "That gives one bag all " + fmt(tot) + " counters. The counters are shared equally among " + fmt(a) + " bags." }
    ]);
    if (!dsS) continue;
    var solS = "The model splits " + fmt(tot) + " counters into " + fmt(a) + " equal groups, one group for each bag: \\[ \\begin{aligned} x &= " + fmt(tot) + " \\div " + fmt(a) + " \\\\ x &= " + fmt(x) + " \\end{aligned} \\] So the final picture shows <b>" + corrS + "</b>.";
    return mcq("A balance model shows " + fmt(a) + " closed bags (each holding x counters) balanced by " + fmt(tot) + " counters. The final picture splits the counters into " + fmt(a) + " equal groups and matches one group with one bag. Which equation does the final picture show?",
      { t: corrS, fb: "Correct. Each bag matches one equal group of " + fmt(per) + " counters." }, dsS, solS,
      { mode: "visual-split", a: a, c: tot });
  }
  return mcq("A balance model shows 3 closed bags (each holding x counters) and 4 loose counters on the left pan, balanced by 19 counters on the right pan. The next picture removes 4 loose counters from each pan. Which equation does the next picture show?",
    { t: "\\(3x = 15\\)", fb: "Correct. The same removal on both sides gives 3x = 15." },
    [{ t: "\\(3x + 4 = 15\\)", fb: "That removes counters from one side only." }, { t: "\\(3x = 23\\)", fb: "That adds counters instead of removing them." }, { t: "\\(x = 15\\)", fb: "The bags are still closed, so the left side is still 3x." }],
    "Removing 4 from both sides: \\[ \\begin{aligned} 3x + 4 &= 19 \\\\ 3x &= 15 \\end{aligned} \\] So the picture shows <b>\\(3x = 15\\)</b>.", { mode: "visual-remove-fallback" });
}, ["A balance picture changes the equation only when the same change is made on both sides.","Match each part of the picture to a term: bags are x terms, loose counters are numbers."]);

E("u5-pkf-solve-distributive", 5, ["8.17"], 2, "gen", function () {
  var a = ri(2, 7), b = ri(1, 10), x = ri(2, 13), c = a * (x + b);
  var sol = "Apply the distributive property first, then solve: \\[ \\begin{aligned} " + fmt(a) + "(x + " + fmt(b) + ") &= " + fmt(c) + " \\\\ " + fmt(a) + "x + " + fmt(a * b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(c) + " - " + fmt(a * b) + " \\\\ " + fmt(a) + "x &= " + fmt(a * x) + " \\\\ x &= " + fmt(x) + " \\end{aligned} \\] Check: \\(" + fmt(a) + "(" + fmt(x) + " + " + fmt(b) + ") = " + fmt(a) + "(" + fmt(x + b) + ") = " + fmt(c) + "\\). So the solution is <b>\\(x = " + fmt(x) + "\\)</b>.";
  return numq("Solve the equation \\(" + fmt(a) + "(x + " + fmt(b) + ") = " + fmt(c) + "\\). What is the value of x?", x, 0.01, sol,
    { mode: "solve-distributive", a: a, b: b });
}, ["The number outside the brackets multiplies every term inside the brackets.","Expand the brackets first, then subtract and divide as usual."]);

E("u5-pkf-solve-div-plus", 5, ["8.17"], 2, "gen", function () {
  var a = ri(2, 8), b = ri(1, 12), d = ri(2, 11), x = a * d, c = d + b;
  var sol = "Subtract first, then undo the division by multiplying: \\[ \\begin{aligned} \\frac{x}{" + a + "} + " + fmt(b) + " &= " + fmt(c) + " \\\\ \\frac{x}{" + a + "} &= " + fmt(c) + " - " + fmt(b) + " \\\\ \\frac{x}{" + a + "} &= " + fmt(d) + " \\\\ x &= " + fmt(d) + " \\times " + fmt(a) + " \\\\ x &= " + fmt(x) + " \\end{aligned} \\] Check: \\(\\frac{" + fmt(x) + "}{" + a + "} + " + fmt(b) + " = " + fmt(d) + " + " + fmt(b) + " = " + fmt(c) + "\\). So the solution is <b>\\(x = " + fmt(x) + "\\)</b>.";
  return numq("Solve the equation \\(\\frac{x}{" + a + "} + " + fmt(b) + " = " + fmt(c) + "\\). What is the value of x?", x, 0.01, sol,
    { mode: "solve-div-plus", a: a, b: b, d: d });
}, ["Work in reverse order: deal with the added number before the division.","Subtract the constant from both sides, then multiply both sides by the divisor."]);

E("u5-pkf-solve-context-problem", 5, ["8.17"], 2, "gen", function () {
  var a = ri(2, 9), b = ri(4, 25), x = ri(3, 14), c = a * x + b;
  var ctx = pick([
    { q: "A school rents a bus for a field trip. The rental costs a $" + b + " booking fee plus $" + a + " for each kilometre driven. The total bill was $" + c + ". How many kilometres did the bus drive?", unit: "kilometres" },
    { q: "A community hall charges a $" + b + " setup fee plus $" + a + " for each table rented. A group paid $" + c + " in total. How many tables did the group rent?", unit: "tables" },
    { q: "A bike shop charges a $" + b + " service fee plus $" + a + " for each gear adjusted. A customer paid $" + c + " in total. How many gears were adjusted?", unit: "gears" }
  ]);
  var sol = "Let \\(x\\) be the number of " + ctx.unit + ". The fee is paid once and the $" + a + " charge is paid \\(x\\) times: \\[ \\begin{aligned} " + fmt(a) + "x + " + fmt(b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(c - b) + " \\\\ x &= " + fmt(x) + " \\end{aligned} \\] So the answer is <b>" + fmt(x) + " " + ctx.unit + "</b>.";
  return numq(ctx.q, x, 0.01, sol, { mode: "solve-context-problem", a: a, b: b, c: c, unit: ctx.unit });
}, ["Write an equation first: one-time fee plus per-unit charge times the unknown, equal to the total.","Subtract the fee from the total, then divide what is left by the per-unit charge."]);

E("u9-pkf-mean-basic", 9, ["11.9"], 1, "gen", function(){
  var ctx=pick(["quiz scores","laps swum each day","pages read each day","points scored each game","seedlings sprouting each day"]);
  var n=pick([5,5,6]);var vals=[];for(var i=0;i<n;i++)vals.push(ri(2,14));
  var m=u7mean(vals);var ms=fmt(m);
  var cand=u7numOpts(m,[fmt(m+1),fmt(m-1),fmt(u7median(vals)),fmt(m+2),fmt(Math.max.apply(null,vals))]).map(function(v){return String(v);});
  var seen={};var ds=[];cand.forEach(function(v){if(v!==ms&&!seen[v]){seen[v]=1;ds.push({t:v,fb:"That value does not equal the total divided by "+n+". Add all the values first, then divide by how many there are."});}});
  while(ds.length<3){var v=fmt(m+ds.length+2);if(v!==ms&&!seen[v]){seen[v]=1;ds.push({t:v,fb:"Add all the values first, then divide by "+n+"."});}}
  ds=precPair(ms,ds);
  var q=mcq("A student's "+ctx+" are: "+vals.join(", ")+". What is the mean?",
    {t:ms,fb:"Yes: the total is "+fmt(u7mean(vals)*n)+" and "+fmt(u7mean(vals)*n)+" divided by "+n+" is "+ms+"."},ds.slice(0,3),
    "Add the values, then divide by how many there are. \\[ \\begin{aligned} \\text{total} &= "+vals.join(" + ")+" = "+fmt(m*n)+" \\\\ \\text{mean} &= "+fmt(m*n)+" \\div "+n+" = "+ms+" \\end{aligned} \\] The mean is <b>"+ms+"</b>.",
    {mode:"mean",n:n});
  return q;
}, ["The mean is the total of all the values divided by how many values there are.","Start by adding all the values together."]);

E("u9-pkf-median-mode", 9, ["11.9"], 1, "gen", function(){
  var askMode=Math.random()<0.5;
  var base=ri(3,9);var vals;
  if(askMode){var modeV=ri(2,12);var others=[];while(others.length<4){var v=ri(1,15);if(v!==modeV&&others.indexOf(v)<0)others.push(v);}vals=shuffle([modeV,modeV,modeV].concat(others.slice(0,3)));
    var correct=String(modeV);
    var cand=u7numOpts(modeV,[others[0],others[1],Math.round(u7mean(vals))]).map(String);
    var ds=cand.filter(function(v){return v!==correct;}).slice(0,3).map(function(v){return {t:v,fb:"Count how often each value appears. The mode is the value that appears most often."};});
    while(ds.length<3){var v=String(modeV+ds.length+3);ds.push({t:v,fb:"Count how often each value appears."});}
    return mcq("Data set: "+vals.join(", ")+". What is the mode?",{t:correct,fb:"Yes: "+modeV+" appears three times, more often than any other value."},ds,
      "Count the frequency of each value. The value "+modeV+" appears 3 times, more than any other value. The mode is <b>"+modeV+"</b>.",{mode:"mode"});
  }
  var n=pick([5,7]);vals=[];for(var i=0;i<n;i++)vals.push(ri(1,16));
  var med=u7median(vals);var srt=vals.slice().sort(function(a,b){return a-b;});
  var cand2=u7numOpts(med,[fmt(u7mean(vals)),srt[0],srt[srt.length-1],med+1]).map(function(v){return String(v);});
  var ds2=cand2.filter(function(v){return v!==fmt(med);}).slice(0,3).map(function(v){return {t:v,fb:"Order the values first. The median is the middle value of the ordered list."};});
  while(ds2.length<3){var w=fmt(med+ds2.length+2);ds2.push({t:w,fb:"Order the values first, then take the middle one."});}
  ds2=precPair(fmt(med),ds2);
  return mcq("Data set: "+vals.join(", ")+". What is the median?",{t:fmt(med),fb:"Yes: ordered, the list is "+srt.join(", ")+", and the middle value is "+fmt(med)+"."},ds2,
    "Order the values: "+srt.join(", ")+". With "+n+" values, the middle position holds <b>"+fmt(med)+"</b>.",{mode:"median"});
}, ["Order the values first for the median; count frequencies for the mode.","Start by rewriting the data set in increasing order."]);

E("u9-pkf-range-basic", 9, ["11.9"], 1, "gen", function(){
  var ctx=pick(["daily high temperatures in degrees","heights of plants in centimetres","race times in seconds","numbers of pets per household","goals scored each week"]);
  var lo=ri(2,10),hi=lo+ri(4,14);var vals=[lo,hi];var n=ri(4,6);for(var i=0;i<n;i++)vals.push(ri(lo,hi));vals=shuffle(vals);
  var r=hi-lo;
  var cand=u7numOpts(r,[hi,lo,r+2,Math.max(r-2,0),hi+lo]);
  var ds=cand.map(function(v){return {t:String(v),fb:v===hi?"That is the largest value alone. The range subtracts the smallest value from the largest.":"The range is largest minus smallest: "+hi+" minus "+lo+"."};});
  return mcq("A set of "+ctx+" is: "+vals.join(", ")+". What is the range?",{t:String(r),fb:"Yes: "+hi+" minus "+lo+" equals "+r+"."},ds,
    "The largest value is "+hi+" and the smallest is "+lo+". \\[ \\begin{aligned} \\text{range} &= "+hi+" - "+lo+" \\\\ &= "+r+" \\end{aligned} \\] The range is <b>"+r+"</b>.",{mode:"range"});
}, ["The range measures spread: largest value minus smallest value.","Start by finding the largest and smallest values in the set."]);

var PK9S_FOR_INT=["3.1","3.2","6.1","6.2","6.3","6.4","3.4","3.5","3.6","3.7","3.8","3.9","3.10","3.11","3.12","3.13","3.14","3.15"];
var PKT9S={
  "u1-pkf-fact-recall":{src:"math-5:MA5.5.19",group:"multiplication-facts",for:PK9_FOR_C1},
  "u1-pkf-fact-division":{src:"math-5:MA5.5.19",group:"multiplication-facts",for:PK9_FOR_C1},
  "u1-pkf-fact-halving":{src:"math-5:MA5.5.17",group:"multiplication-facts",for:PK9_FOR_C1},
  "u1-pkf-order-place":{src:"math-4:MA4.1.1",group:"ordering-numbers",for:PK9_FOR_C1},
  "u1-pkf-order-line":{src:"math-4:MA4.1.2",group:"ordering-numbers",for:PK9_FOR_C1},
  "u1-pkf-order-below":{src:"math-6:MA6.1.2",group:"ordering-numbers",for:PK9_FOR_C1},
  "u1-pkf-mult-model-chips":{src:"math-8:6.17",group:"integer-operations",for:PK9S_FOR_INT},
  "u1-pkf-product-sign-apply":{src:"math-8:6.18",group:"integer-operations",for:PK9S_FOR_INT},
  "u1-pkf-mult-problem":{src:"math-8:6.20",group:"integer-operations",for:PK9S_FOR_INT},
  "u1-pkf-quotient-sign-apply":{src:"math-8:6.22",group:"integer-operations",for:PK9S_FOR_INT},
  "u1-pkf-div-2by1":{src:"math-8:6.24",group:"integer-operations",for:PK9S_FOR_INT},
  "u1-pkf-ooo-num":{src:"math-8:6.27",group:"integer-operations",for:PK9S_FOR_INT},
  "u1-pkf-model-frac-times-whole":{src:"math-8:6.4",group:"fraction-operations",for:PK9_FOR_C1},
  "u1-pkf-area-model-product":{src:"math-8:6.5",group:"fraction-operations",for:PK9_FOR_C1},
  "u1-pkf-estimate-product-benchmark":{src:"math-8:6.7",group:"fraction-operations",for:PK9_FOR_C1},
  "u1-pkf-model-whole-div-frac":{src:"math-8:6.9",group:"fraction-operations",for:PK9_FOR_C1},
  "u1-pkf-model-division-bar":{src:"math-8:6.10",group:"fraction-operations",for:PK9_FOR_C1},
  "u1-pkf-context-divide-expression":{src:"math-8:6.14",group:"fraction-operations",for:PK9_FOR_C1},
  "u1-pkf-div-decimals":{src:"math-7:6.8",group:"decimal-operations",for:PK9_FOR_C1},
  "u1-pkf-frontend-sum":{src:"math-7:6.1",group:"decimal-operations",for:PK9_FOR_C1},
  "u1-pkf-frontend-prod-quot":{src:"math-7:6.2",group:"decimal-operations",for:PK9_FOR_C1},
  "u1-pkf-reasonableness":{src:"math-7:6.4",group:"decimal-operations",for:PK9_FOR_C1},
  "u5-pkf-solve-one-step":{src:"math-8:8.4",group:"equation-solving",for:PK9_FOR_C6},
  "u5-pkf-visual-step":{src:"math-8:8.2",group:"equation-solving",for:PK9_FOR_C6},
  "u5-pkf-solve-distributive":{src:"math-8:8.5",group:"equation-solving",for:PK9_FOR_C6},
  "u5-pkf-solve-div-plus":{src:"math-8:8.4",group:"equation-solving",for:PK9_FOR_C6},
  "u5-pkf-solve-context-problem":{src:"math-8:8.7",group:"equation-solving",for:PK9_FOR_C6},
  "u9-pkf-mean-basic":{src:"math-7:11.6",group:"centre-measures",for:["11.9"]},
  "u9-pkf-median-mode":{src:"math-7:11.6",group:"centre-measures",for:["11.9"]},
  "u9-pkf-range-basic":{src:"math-7:11.7",group:"centre-measures",for:["11.9"]}
};
BANK.forEach(function(e){var t=PKT9S[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=t.for.slice();e.pkGroup=t.group;}});

/* ============ Constructed-response marks (generated) ============ */
/* Built by assemble-bank.py from the CRMARKS manifests at the top of
   each unit file. Exam Section B draws only from these entries. */
window.__BANK_CRMARKS={"u1-frac-context":3,"u1-gap-brackets-cr":3,"u1-gap-div-add-cr":3,"u1-gap-mean-target-cr":3,"u1-gap-order-ops-cr":2,"u1-gap-total-change-cr":3,"u1-gap-two-expr-diff-cr":2,"u1-money-decimals":3,"u1-multistep-rational":3,"u1-ooo-calculator":2,"u1-ooo-evaluate-mc":3,"u1-ordering-reasoning-var":2,"u2-best-estimate-side":2,"u2-gap-estimate-gap-cr":2,"u2-gap-pyramid-slant-cr":3,"u2-overlap":2,"u2-overlap-hidden":2,"u2-sa-composite-rect":3,"u2-sa-cyl-on-prism":3,"u2-sa-problem":2,"u2-sa-single":3,"u2-sa-tri-context":3,"u3-difference-of-powers":2,"u3-gap-growth-excess-cr":3,"u3-gap-laws-eval-cr":2,"u3-gap-power-diff-cr":3,"u3-gap-sci-product-cr":3,"u3-gap-simplify-sub-cr":2,"u3-gap-solve-exponent-cr":3,"u3-law-then-sum-difference":2,"u3-power-of-product-quotient":3,"u3-sum-of-powers":3,"u3-three-laws-evaluate":3,"u3-two-laws-evaluate":3,"u4-add":3,"u4-area-monomial":2,"u4-divide-monomial":2,"u4-gap-add-eval-cr":2,"u4-gap-area-eval-cr":3,"u4-gap-div-eval-cr":3,"u4-gap-mono-coeff-cr":2,"u4-gap-perimeter-eval-cr":3,"u4-gap-sub-eval-neg-cr":3,"u4-missing":3,"u4-mult-div-mixed":2,"u4-multiply-monomial":3,"u4-subtract":3,"u5-gap-both-sides-cr":2,"u5-gap-ineq-boundary-cr":2,"u5-gap-min-items-cr":3,"u5-gap-solve-eval-cr":3,"u5-list-satisfies":2,"u5-solve-brackets-both":3,"u5-solve-ineq-addsub":3,"u5-solve-two-step":3,"u5-verify-error":2,"u5-word-brackets":2,"u5-word-two-step":3,"u6-gap-break-even-cr":3,"u6-gap-inverse-cr":3,"u6-gap-missing-coord-cr":2,"u6-gap-pattern-far-cr":3,"u6-gap-slope-table-cr":2,"u6-interpolate-graph":3,"u6-pattern-large":2,"u6-pattern-solve-n":3,"u6-pattern-word-total":2,"u6-point-on-graph":2,"u6-table-extend":3,"u6-two-plans-graph":3,"u7-complete-half":2,"u7-draw-similar-num":3,"u7-gap-area-scale-cr":3,"u7-gap-map-time-cr":2,"u7-gap-perimeter-scale-cr":3,"u7-gap-scale-apply-cr":2,"u7-gap-shadow-diff-cr":3,"u7-indirect-measure-num":2,"u7-scale-draw-num":3,"u7-similar-context-num":3,"u7-similar-two-step-num":3,"u7-translation-rule":2,"u8-chord-length":3,"u8-chord-two-step":3,"u8-gap-chord-bisect-cr":3,"u8-gap-cyclic-diag-cr":2,"u8-gap-reflex-arc-cr":2,"u8-gap-semicircle-pyth-cr":3,"u8-gap-tangent-central-cr":3,"u8-inscribed-reflex":3,"u8-same-arc-angles":2,"u8-semicircle-angle":2,"u8-tangent-central-inscribed":2,"u8-tangent-length":3,"u9-collection-biggest-threat":3,"u9-collection-problem":3,"u9-combined-decision":3,"u9-gap-complement-pct-cr":3,"u9-gap-decision-evidence-cr":3,"u9-gap-expected-freq-cr":2,"u9-gap-fix-the-survey-cr":3,"u9-gap-freq-mean-cr":2,"u9-gap-mean-diff-cr":3,"u9-gap-sample-scale-cr":3,"u9-gap-win-points-cr":3,"u9-match-influence":3,"u9-plan-element":2,"u9-rubric-missing-part":2};
/* ============ Bimodal entries (generated) ============ */
/* Built by assemble-bank.py from the BIMODAL manifests in the unit
   files (Spec-Bimodal-Questions-2026-11-19.md): entries whose
   multiple-choice questions may be stripped to constructed
   response, class a (online-checkable) or b (print/self-check). */
window.__BANK_BIMODAL={"u1-ooo-evaluate-mc":"a","u1-ordering-reasoning-var":"a","u2-best-estimate-side":"a","u4-area-monomial":"b","u4-missing":"b","u4-subtract":"b","u5-verify-error":"b","u8-tangent-central-inscribed":"a","u9-collection-biggest-threat":"b"};
