/* Math 9 (French) bank module for the unified review app shell.
   Assembled by assemble-bank.py from banks/math-9-fr/; edit the
   per-unit sources there, not this file. Entries register through
   the shell's E(id, unit, indicators, level, kind, gen). */

/* ----- bank-helpers.js ----- */
/* Math 9 (French) bank helpers: the French number-format helpers
   (frNum, fmtD, fmtDF) the bank calls, cut verbatim from the
   standalone app's chassis (math-9-review-fr/index.html), followed
   by the head of the standalone bank source (math-9-review-fr/
   bank-src.js, lines 1 to 73: the FR fraction helper and
   fmtPairDsD), where it precedes the Unit 1 banner. In the
   standalone the chassis helpers live in the page and the bank
   reads them as globals, so the unified bank module carries them
   here, first in the build order. */
function frNum(s){s=String(s);var neg=false;if(s.charAt(0)==="-"){neg=true;s=s.slice(1);}var p=s.split("."),ip=p[0],dp=(p.length>1?p[1]:null);if(ip.length>3){var out="";while(ip.length>3){out="\u00A0"+ip.slice(ip.length-3)+out;ip=ip.slice(0,ip.length-3);}ip=ip+out;}return (neg?"-":"")+ip+(dp===null?"":","+dp);}
function fmtD(n,d){return frNum(fmt(n,d));}
function fmtDF(n,d){return frNum(fmtF(n,d));}
/* TRANSLATOR NOTES
   Chunk: Math 9, Unit 1 (Rational Numbers) and Unit 2 (Square Roots and
   Surface Area), entries u1-* and u2-*. Translated per RULES.md and
   GLOSSARY.md (provisional; guides win on reconciliation).

   Judgement calls (glossary silent or wording rebuilt):
   - Formula label SA kept unchanged in worked solutions (notation, not
     prose); the prose around it uses "aire de la surface" per the glossary.
   - "legs" of a right triangle rendered "cathètes".
   - Lists that contain comma-decimal numbers use " ; " as the separator
     so list commas are not confused with decimal commas (u1-ordering-
     reasoning-var: the spaced number line and the greatest/least set).
   - In u1-money-decimals the shopping items carry their own articles
     (un cahier, une pomme, une boîte de jus, etc.) so gender agreement
     survives the random item sets; the prompt wording was rebuilt
     around them.
   - KaTeX \\text{hidden} rendered \\text{cachée} in u2-overlap.
   - "Step" rendered "Étape" in u1-ooo-first-error, including the option
     labels the generator builds.
   - Place and personal names kept unchanged (Sam, Priya, Rina, Dev,
     Tess, St. John's).

   FMT-GEOM lines left as fmt(: none. This chunk has no SVG or figure
   helpers, so every display fmt( became fmtD( and every money
   .toFixed(2) became fmtDF(..., 2) with the amount before " $".

   Literal formatted numbers written into static prose (for the
   coordinator's reconciliation against the immersion guides):
   - Decimal commas, Unit 1: -0,9 ; -0,3 ; 0,9 and the 0,6 step chain
     (-0,9 + 0,6 = -0,3 etc.) in u1-ordering-reasoning-var; its answer
     options 0,3 / 0,6 / -0,6 and feedback values 0,6 and 0,9; the set
     values 0,\overline{3} and -0,5 in the same entry.
   - Decimal commas, Unit 2: \pi = 3,14 and the factor 2(3,14) in
     u2-sa-single (cylinder) and u2-sa-cyl-on-prism; 1,414213562 and
     1,999999999 in u2-why-approx (sqrt 2); 2,64575131 and the distractor
     2,6 in u2-why-approx (sqrt 7); 3,16 and 9,9856 in u2-why-approx
     (sqrt 10); 0,81 and 0,9 in u2-reasoning-var (Rina).
   - Percent literals: none in this chunk.
   - Dollar literals in static prose: none. All money amounts are
     generated and routed through fmtDF(..., 2) followed by " $"
     (u1-money-decimals, u1-multistep-rational bank mode, u2-sa-problem
     fabric cost, where the unit price is a generated value followed
     by " $ par mètre carré").
   - Thousands literals in static prose: none. No static four-plus-digit
     integers occur; generated values go through fmtD/fmtDF.

   Unsure about: nothing blocking. "Développement" for net follows the
   provisional glossary entry and is flagged there for guide
   confirmation.
*/
/* Math 9 Review bank source. Mid-scope tranche (Units 1 to 4) assembled
   November 7, 2026 from tranche1/unit1.js to unit4.js, plus the
   top-up tranche appended the same day from tranche1/unitN-topup.js. FR returns the raw
   \frac fragment for use INSIDE math delimiters, defined here for the
   entries that use it. CR_MARKS stays at the end of this file. */
function FR(n,d){return "\\frac{"+n+"}{"+d+"}";}

/* Precision pairing (pattern-fix programme, Nov 8, 2026; mirrors the English
   fmtPairDs): given the key's printed text and distractors as {v, fb}, print
   each distractor with trailing zeros after the decimal comma so its
   decimal-place count pairs with the key's count or with another
   distractor's count. A value is only ever printed at a place count it
   reaches exactly, so no value ever changes. The key is never reformatted. */
function fmtPairDsD(keyT, ds) {
  function exactDp(v) { for (var d = 0; d <= 6; d++) { if (Math.abs(v * Math.pow(10, d) - Math.round(v * Math.pow(10, d))) < 1e-9) return d; } return 6; }
  var m = String(keyT).match(/,(\d+)/); var kd = m ? m[1].length : 0;
  var pairIdx = -1;
  for (var i = 0; i < ds.length; i++) { if (exactDp(ds[i].v) <= kd) { pairIdx = i; break; } }
  if (pairIdx < 0) { var am = 0; ds.forEach(function (d) { am = Math.max(am, exactDp(d.v)); }); return ds.map(function (d) { return { t: fmtDF(d.v, am), fb: d.fb }; }); }
  var common = 0; ds.forEach(function (d, i) { if (i !== pairIdx) common = Math.max(common, exactDp(d.v)); });
  return ds.map(function (d, i) { return { t: fmtDF(d.v, i === pairIdx ? kd : common), fb: d.fb }; });
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

/* Tranche 5 (nov. 2026) : le modèle du carré pour les entrées de
   racines de l'unité 2. Un carré dont l'aire est étiquetée à
   l'intérieur et un côté étiqueté sous le bord inférieur; la valeur
   inconnue est passée comme « ? », donc la figure donne la donnée
   et jamais la réponse. */
function solSquare(areaLab, sideLab, aria) {
  var s = '<svg viewBox="0 0 200 172" width="200" height="172" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + aria + '">';
  s += '<rect x="45" y="14" width="110" height="110" fill="#eceff1" stroke="#37474f" stroke-width="2"/>';
  s += solT(100, 69, areaLab, 14, true);
  s += solT(100, 146, sideLab, 13, false);
  return s + "</svg>";
}

/* ----- bank-u1.js ----- */
// Math 9 (French) Unit 1 Rational Numbers question bank
// Cut verbatim from the standalone bank source
// (math-9-review-fr/bank-src.js, lines 74 to 376).
// CRMARKS: u1-frac-context=3
// CRMARKS: u1-money-decimals=3
// CRMARKS: u1-ooo-evaluate-mc=3
// CRMARKS: u1-ooo-calculator=2
// CRMARKS: u1-ooo-first-error=2
// CRMARKS: u1-ordering-reasoning-var=2
// CRMARKS: u1-multistep-rational=3
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
  items.forEach(function (it) { it.s = "\\(" + (Math.random() < 0.5 ? it.f : fmtD(it.v)) + "\\)"; });
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
  var prompt = "Quel ensemble est ordonné du plus petit au plus grand ?";
  var solution = "Compare les valeurs sous forme décimale : \\[ \\begin{aligned} " + sorted.map(function (it) { return fmtD(it.v); }).join(" &< ") + " \\end{aligned} \\] Donc l'ordre du plus petit au plus grand est <b>" + correct + "</b>.";
  return mcq(prompt,
    { t: correct, fb: "Exact. Les valeurs augmentent de gauche à droite." },
    [
      { t: rev, fb: "Ici, les nombres vont du plus grand au plus petit." },
      { t: swapped, fb: "Les deux premières valeurs sont inversées, donc l'ordre est faux dès le début." },
      { t: shuf, fb: "Au moins deux nombres de cette liste ne sont pas dans le bon ordre." }
    ],
    solution, { mode: "order-four", vals: sorted.map(function (it) { return it.v; }).join(",") });
}, ["Imagine les nombres sur une droite numérique, avec les négatifs à gauche.", "Écris chaque fraction sous forme décimale, puis compare les nombres décimaux."]);

// 2. L1, 3.2: a rational number between two given numbers.
E("u1-between-two", 1, ["3.2"], 1, "gen", function () {
  if (Math.random() < 0.5) {
    var a = ri(-20, 24) / 4;
    var gap = ri(3, 10) / 4;
    var b = a + gap;
    var c = a + gap / 2;
    var low = a - ri(1, 4) / 4;
    var high = b + ri(1, 4) / 4;
    var promptD = "Quel nombre se trouve entre \\(" + fmtD(a) + "\\) et \\(" + fmtD(b) + "\\) ?";
    var solD = "Le nombre doit être plus grand que \\(" + fmtD(a) + "\\) et plus petit que \\(" + fmtD(b) + "\\) : \\[ \\begin{aligned} " + fmtD(a) + " &< " + fmtD(c) + " < " + fmtD(b) + " \\end{aligned} \\] Donc le nombre entre les deux est <b>\\(" + fmtD(c) + "\\)</b>.";
    return mcq(promptD,
      { t: fmtD(c), fb: "Exact. Il est plus grand que la borne de gauche et plus petit que celle de droite." },
      fmtPairDsD(fmtD(c), [
        { v: low, fb: "Ce nombre est plus petit que la borne de gauche." },
        { v: high, fb: "Ce nombre est plus grand que la borne de droite." },
        { v: a, fb: "C'est la borne de gauche elle-même, pas un nombre entre les deux." }
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
  var promptF = "Quel nombre se trouve entre " + u1frac(an, den) + " et " + u1frac(bn, den) + " ?";
  var solF = "Avec un dénominateur commun, compare les numérateurs : \\[ \\begin{aligned} " + FR(an, den) + " &< " + FR(cn, den) + " < " + FR(bn, den) + " \\end{aligned} \\] Donc le nombre entre les deux est <b>" + u1frac(cn, den) + "</b>.";
  return mcq(promptF,
    { t: u1frac(cn, den), fb: "Exact. Son numérateur se trouve entre les deux numérateurs donnés." },
    [
      { t: u1frac(lowN, den), fb: "Ce nombre est plus petit que la borne de gauche." },
      { t: u1frac(highN, den), fb: "Ce nombre est plus grand que la borne de droite." },
      { t: u1frac(an, den), fb: "C'est la borne de gauche elle-même, pas un nombre entre les deux." }
    ],
    solF, { mode: "between-frac", a: an, b: bn, d: den });
}, ["Un nombre entre deux autres est plus grand que le plus petit et plus petit que le plus grand.", "Compare chaque choix avec les deux bornes, une à la fois."]);

// 3. L2, 6.1, CR 3: add or subtract fractions in context, answer as a decimal.
E("u1-frac-context", 1, ["6.1"], 1, "gen", function () {
  var dens = [2, 4, 5, 8, 10, 20];
  var d1 = pick(dens), d2 = pick(dens);
  var n1 = ri(1, 15), n2 = ri(1, 15);
  var v1 = n1 / d1, v2 = n2 / d2;
  var sub = Math.random() < 0.5;
  if (sub && v2 > v1) { var tn = n1; n1 = n2; n2 = tn; var td = d1; d1 = d2; d2 = td; v1 = n1 / d1; v2 = n2 / d2; }
  if (sub && Math.abs(v1 - v2) < 0.01) { n1 += d1; v1 = n1 / d1; }
  var ctxs = ["tasses de farine", "mètres de ruban", "litres de jus"];
  var thing = pick(ctxs);
  var ans = u1round(sub ? v1 - v2 : v1 + v2, 4);
  var lcm = (d1 * d2) / u1gcd(d1, d2);
  var e1 = n1 * (lcm / d1), e2 = n2 * (lcm / d2);
  var resN = sub ? e1 - e2 : e1 + e2;
  var prompt = sub
    ? "Un projet commence avec " + u1frac(n1, d1) + " " + thing + ". Ensuite, on utilise " + u1frac(n2, d2) + " " + thing + ". Combien en reste-t-il ? Donne ta réponse sous forme décimale."
    : "Un projet utilise " + u1frac(n1, d1) + " " + thing + " le matin et " + u1frac(n2, d2) + " " + thing + " l'après-midi. Combien utilise-t-on en tout ? Donne ta réponse sous forme décimale.";
  var solution = "Utilise le dénominateur commun \\(" + lcm + "\\) : \\[ \\begin{aligned} " + FR(n1, d1) + (sub ? " - " : " + ") + FR(n2, d2) + " &= " + FR(e1, lcm) + (sub ? " - " : " + ") + FR(e2, lcm) + " \\\\ &= " + FR(resN, lcm) + " = " + fmtD(ans) + " \\end{aligned} \\] Donc la réponse est <b>" + fmtD(ans) + "</b>.";
  return numq(prompt, ans, 0.01, solution, { mode: sub ? "sub-frac-ctx" : "add-frac-ctx", a: n1, b: d1, c: n2, d: d2 });
}, ["Des fractions avec des dénominateurs différents ont d'abord besoin d'un dénominateur commun.", "Écris les deux fractions avec le plus petit dénominateur commun, puis combine les numérateurs."]);

// 4. L2, 6.1, CR 3: money with decimals, total cost or change.
E("u1-money-decimals", 1, ["6.1"], 1, "gen", function () {
  var items = [["un cahier", "un stylo", "une barre-collation"], ["une boîte de jus", "un muffin", "une pomme"], ["une affiche", "un ensemble de marqueurs", "un paquet d'autocollants"], ["une recharge de carte d'autobus", "un café", "un sandwich"]];
  var set = pick(items);
  if (Math.random() < 0.5) {
    var p1 = ri(125, 2499), p2 = ri(125, 2499), p3 = ri(99, 1999);
    var tot = (p1 + p2 + p3) / 100;
    var promptT = "Sam achète " + set[0] + " pour " + fmtDF(p1 / 100, 2) + " $, " + set[1] + " pour " + fmtDF(p2 / 100, 2) + " $ et " + set[2] + " pour " + fmtDF(p3 / 100, 2) + " $. Quel est le coût total, en dollars ?";
    var solT = "Additionne les trois prix : \\[ \\begin{aligned} " + fmtDF(p1 / 100, 2) + " + " + fmtDF(p2 / 100, 2) + " + " + fmtDF(p3 / 100, 2) + " &= " + fmtDF(tot, 2) + " \\end{aligned} \\] Donc le coût total est <b>" + fmtDF(tot, 2) + " $</b>.";
    return numq(promptT, u1round(tot, 2), 0.005, solT, { mode: "money-total", p1: p1, p2: p2, p3: p3 });
  }
  var bill = pick([20, 50, 100]);
  var cost = ri(350, bill * 100 - 250);
  var change = (bill * 100 - cost) / 100;
  var promptC = "Un chandail à capuchon scolaire coûte " + fmtDF(cost / 100, 2) + " $. Priya paie avec un billet de " + bill + " $. Combien de monnaie reçoit-elle, en dollars ?";
  var solC = "Soustrais le coût du montant payé : \\[ \\begin{aligned} " + fmtDF(bill, 2) + " - " + fmtDF(cost / 100, 2) + " &= " + fmtDF(change, 2) + " \\end{aligned} \\] Donc la monnaie est <b>" + fmtDF(change, 2) + " $</b>.";
  return numq(promptC, u1round(change, 2), 0.005, solC, { mode: "money-change", bill: bill, cost: cost });
}, ["Aligne les virgules décimales avant d'additionner ou de soustraire des montants d'argent.", "Travaille en dollars et en cents, avec deux décimales pour les cents."]);

// 5. L2, 6.2, CR 3: order of operations without technology, MC with complete-instruction prompt.
E("u1-ooo-evaluate-mc", 1, ["6.2"], 2, "gen", function () {
  var mode = ri(0, 2);
  var expr, val, errs, steps;
  if (mode === 0) {
    var x = ri(4, 24) / 2, y = ri(2, 16) / 2, c = ri(2, 6), d = ri(2, 20) / 2;
    val = (x + y) * c - d;
    expr = "\\((" + fmtD(x) + " + " + fmtD(y) + ") \\times " + c + " - " + fmtD(d) + "\\)";
    errs = [
      { v: x + y * c - d, fb: "Ceci ignore les parenthèses et multiplie avant d'additionner à l'intérieur." },
      { v: (x + y) * (c - d), fb: "Ceci regroupe la soustraction avec la multiplication, ce qui change l'ordre." },
      { v: (x + y) * c + d, fb: "Ceci additionne le dernier nombre au lieu de le soustraire." }
    ];
    steps = "\\[ \\begin{aligned} (" + fmtD(x) + " + " + fmtD(y) + ") \\times " + c + " - " + fmtD(d) + " &= " + fmtD(x + y) + " \\times " + c + " - " + fmtD(d) + " \\\\ &= " + fmtD((x + y) * c) + " - " + fmtD(d) + " \\\\ &= " + fmtD(val) + " \\end{aligned} \\]";
  } else if (mode === 1) {
    var a = ri(5, 40) / 2, b = ri(2, 12) / 2, k = ri(3, 9);
    val = a + b * k;
    expr = "\\(" + fmtD(a) + " + " + fmtD(b) + " \\times " + k + "\\)";
    errs = [
      { v: (a + b) * k, fb: "Ceci additionne d'abord, mais la multiplication se fait avant l'addition." },
      { v: a + b + k, fb: "Ceci transforme la multiplication en addition." },
      { v: a * b + k, fb: "Ceci multiplie les deux premiers nombres, qui ne sont pas regroupés ensemble." }
    ];
    steps = "\\[ \\begin{aligned} " + fmtD(a) + " + " + fmtD(b) + " \\times " + k + " &= " + fmtD(a) + " + " + fmtD(b * k) + " \\\\ &= " + fmtD(val) + " \\end{aligned} \\]";
  } else {
    var fn = pick([1, 3]), fd = pick([2, 4]);
    var fv = fn / fd, bb = ri(5, 14), cc = ri(1, 4), dd = ri(2, 20) / 2;
    val = u1round(fv * (bb - cc) + dd, 4);
    expr = "\\(" + FR(fn, fd) + " \\times (" + bb + " - " + cc + ") + " + fmtD(dd) + "\\)";
    errs = [
      { v: u1round(fv * bb - cc + dd, 4), fb: "Ceci ignore les parenthèses et multiplie avant de soustraire à l'intérieur." },
      { v: u1round(fv * (bb - cc) - dd, 4), fb: "Ceci soustrait le dernier nombre au lieu de l'additionner." },
      { v: u1round((fv + bb - cc) + dd, 4), fb: "Ceci additionne les premiers nombres au lieu de multiplier par la fraction." }
    ];
    steps = "\\[ \\begin{aligned} " + FR(fn, fd) + " \\times (" + bb + " - " + cc + ") + " + fmtD(dd) + " &= " + FR(fn, fd) + " \\times " + (bb - cc) + " + " + fmtD(dd) + " \\\\ &= " + fmtD(u1round(fv * (bb - cc), 4)) + " + " + fmtD(dd) + " \\\\ &= " + fmtD(val) + " \\end{aligned} \\]";
  }
  var ds = [];
  var used = {};
  used[fmtD(val)] = 1;
  errs.forEach(function (e) { var key = fmtD(u1round(e.v, 4)); if (!used[key] && ds.length < 3) { used[key] = 1; ds.push({ t: key, v: u1round(e.v, 4), fb: e.fb }); } });
  var offs = [2, -2, 1, -1, 3, -3, 0.5, -0.5];
  var oi = 0;
  while (ds.length < 3 && oi < offs.length) { var cand = u1round(val + offs[oi], 4); oi++; var k2 = fmtD(cand); if (!used[k2]) { used[k2] = 1; ds.push({ t: k2, v: cand, fb: "Ceci vient d'une erreur de calcul à une des étapes." }); } }
  ds = fmtPairDsD(fmtD(val), ds.map(function (d) { return { v: d.v, fb: d.fb }; }));
  var prompt = "Calcule : " + expr;
  var solution = "Suis la priorité des opérations, les parenthèses d'abord, puis la multiplication, puis l'addition et la soustraction : " + steps + " Donc la valeur est <b>" + fmtD(val) + "</b>.";
  return mcq(prompt,
    { t: fmtD(val), fb: "Exact. Les parenthèses d'abord, puis la multiplication, puis l'addition et la soustraction." },
    ds, solution, { mode: "ooo-mc-" + mode, val: val });
}, ["Fais d'abord les parenthèses, puis la multiplication et la division, puis l'addition et la soustraction.", "Réécris l'expression après chaque étape pour garder l'ordre clair."]);

// 6. L2, 6.3, CR 2: order of operations with technology, longer decimal expression.
E("u1-ooo-calculator", 1, ["6.3"], 1, "gen", function () {
  var a = ri(20, 200) / 10, b = ri(10, 90) / 10, c = ri(2, 9), d = ri(5, 50) / 10;
  var e = pick([2, 4, 5]);
  var f = ri(5, 60) / 10;
  var s1 = a + b, s2 = s1 * c, s3 = s2 - d, s4 = s3 / e, val = s4 + f;
  var ans = u1round(val, 2);
  var expr = "\\(((" + fmtD(a) + " + " + fmtD(b) + ") \\times " + c + " - " + fmtD(d) + ") \\div " + e + " + " + fmtD(f) + "\\)";
  var prompt = "Utilise une calculatrice pour calculer l'expression en une seule saisie : " + expr + " Donne ta réponse avec 2 décimales.";
  var solution = "Commence par les parenthèses et garde toute la précision jusqu'à la fin : \\[ \\begin{aligned} ((" + fmtD(a) + " + " + fmtD(b) + ") \\times " + c + " - " + fmtD(d) + ") \\div " + e + " + " + fmtD(f) + " &= (" + fmtD(s2) + " - " + fmtD(d) + ") \\div " + e + " + " + fmtD(f) + " \\\\ &= " + fmtD(u1round(s4, 4)) + " + " + fmtD(f) + " \\\\ &= " + fmtD(ans) + " \\end{aligned} \\] Donc la valeur est <b>" + fmtD(ans) + "</b>.";
  return numq(prompt, ans, 0.01, solution, { mode: "ooo-calc", a: a, b: b, c: c, d: d, e: e, f: f });
}, ["Entre l'expression complète d'un coup, avec les touches de parenthèses autour des parties regroupées.", "Commence par les parenthèses les plus intérieures si tu vérifies la valeur par étapes."]);

// 7. L2, 6.4, CR 2: find the first error in a worked solution, MC.
E("u1-ooo-first-error", 1, ["6.4"], 2, "gen", function () {
  var scen = ri(0, 3);
  var expr, stepTexts, errIdx, correctVal, errExplain;
  if (scen === 0) {
    var a0 = ri(2, 9), b0 = ri(2, 9), c0 = ri(2, 6), d0 = ri(1, 8);
    var M0 = b0 * c0, S0 = a0 + M0, F0 = S0 - d0;
    expr = "\\((" + a0 + " + " + b0 + ") \\times " + c0 + " - " + d0 + "\\)";
    stepTexts = ["\\(" + b0 + " \\times " + c0 + " = " + M0 + "\\)", "\\(" + a0 + " + " + M0 + " = " + S0 + "\\)", "\\(" + S0 + " - " + d0 + " = " + F0 + "\\)", "la valeur est \\(" + F0 + "\\)"];
    errIdx = 0; correctVal = (a0 + b0) * c0 - d0;
    errExplain = "L'étape 1 multiplie avant de faire les parenthèses, mais les parenthèses passent d'abord";
  } else if (scen === 1) {
    var m1 = ri(2, 8), p1 = ri(2, 9), q1 = ri(1, 9), r1 = ri(1, 9);
    var S1 = p1 + q1, W1 = m1 + S1, F1 = W1 - r1;
    expr = "\\(" + m1 + " \\times (" + p1 + " + " + q1 + ") - " + r1 + "\\)";
    stepTexts = ["\\(" + p1 + " + " + q1 + " = " + S1 + "\\)", "\\(" + m1 + " + " + S1 + " = " + W1 + "\\)", "\\(" + W1 + " - " + r1 + " = " + F1 + "\\)", "la valeur est \\(" + F1 + "\\)"];
    errIdx = 1; correctVal = m1 * S1 - r1;
    errExplain = "L'étape 2 additionne alors que l'expression demande de multiplier";
  } else if (scen === 2) {
    var a2 = ri(3, 12), b2 = ri(2, 9), c2 = ri(2, 6), d2 = ri(1, 9);
    var M2 = b2 * c2, S2 = a2 + M2, W2 = S2 + d2;
    expr = "\\(" + a2 + " + " + b2 + " \\times " + c2 + " - " + d2 + "\\)";
    stepTexts = ["\\(" + b2 + " \\times " + c2 + " = " + M2 + "\\)", "\\(" + a2 + " + " + M2 + " = " + S2 + "\\)", "\\(" + S2 + " + " + d2 + " = " + W2 + "\\)", "la valeur est \\(" + W2 + "\\)"];
    errIdx = 2; correctVal = S2 - d2;
    errExplain = "L'étape 3 additionne alors que l'expression demande de soustraire";
  } else {
    var a3 = ri(2, 9), b3 = ri(2, 8), c3 = ri(1, 10), d3 = ri(1, 10);
    var P3 = a3 * b3, S3 = P3 - c3, F3 = S3 + d3, W3 = F3 + pick([2, 3, 4]);
    expr = "\\(" + a3 + " \\times " + b3 + " - " + c3 + " + " + d3 + "\\)";
    stepTexts = ["\\(" + a3 + " \\times " + b3 + " = " + P3 + "\\)", "\\(" + P3 + " - " + c3 + " = " + S3 + "\\)", "\\(" + S3 + " + " + d3 + " = " + F3 + "\\)", "la valeur est \\(" + W3 + "\\)"];
    errIdx = 3; correctVal = F3;
    errExplain = "L'étape 4 donne une valeur qui ne correspond pas au résultat de l'étape 3";
  }
  var prompt = "Un élève calcule " + expr + ". Son travail est montré. Étape 1 : " + stepTexts[0] + ". Étape 2 : " + stepTexts[1] + ". Étape 3 : " + stepTexts[2] + ". Étape 4 : " + stepTexts[3] + ". À quelle étape la première erreur se produit-elle ?";
  var opts = [0, 1, 2, 3].map(function (i) {
    var fb;
    if (i === errIdx) fb = "Exact. " + errExplain + ".";
    else if (i < errIdx) fb = "Cette étape est exacte, donc la première erreur vient plus tard.";
    else fb = "Cette étape découle de la valeur fausse précédente, donc ce n'est pas la première erreur.";
    return { t: "Étape " + (i + 1), fb: fb };
  });
  var correctOpt = opts[errIdx];
  var distractors = opts.filter(function (o, i) { return i !== errIdx; });
  var solution = errExplain + ". Fait correctement, l'expression a pour valeur \\(" + fmtD(correctVal) + "\\). Donc la première erreur est à <b>l'étape " + (errIdx + 1) + "</b>.";
  return mcq(prompt, correctOpt, distractors, solution, { mode: "first-error-" + scen, err: errIdx + 1 });
}, ["Vérifie chaque étape avec la priorité des opérations, en commençant par l'étape 1.", "Une étape plus tard peut sembler fausse seulement parce qu'elle utilise une valeur fausse précédente."]);

// 8. L3, 3.1 and 3.2, CR 2: varset of three MC statics.
E("u1-ordering-reasoning-var", 1, ["3.1", "3.2"], 3, "var", varset([
  function () {
    var prompt = "Quel nombre se trouve exactement à mi-chemin entre " + u1frac(-3, 4) + " et " + u1frac(1, 2) + " ?";
    var solution = "Additionne les deux nombres, puis divise par 2 : \\[ \\begin{aligned} -" + FR(3, 4) + " + " + FR(1, 2) + " &= -" + FR(1, 4) + " \\\\ -" + FR(1, 4) + " \\div 2 &= -" + FR(1, 8) + " \\end{aligned} \\] Donc le nombre à mi-chemin est <b>\\(-" + FR(1, 8) + "\\)</b>.";
    return mcq(prompt,
      { t: "\\(-" + FR(1, 8) + "\\)", fb: "Exact. C'est la moyenne des deux bornes." },
      [
        { t: "\\(-" + FR(1, 4) + "\\)", fb: "C'est la somme des bornes, avant de diviser par 2." },
        { t: "\\(" + FR(1, 8) + "\\)", fb: "Le signe est faux, car le point à mi-chemin est encore négatif." },
        { t: "\\(-" + FR(5, 8) + "\\)", fb: "Ce point est beaucoup plus proche de la borne inférieure." }
      ],
      solution, { mode: "halfway-neg-frac" });
  },
  function () {
    var prompt = "Des nombres sont également espacés sur une droite numérique et sont montrés dans l'ordre : \\(-0,9 ; -0,3 ; ? ; 0,9\\). Quel est le nombre manquant ?";
    var solution = "Chaque pas ajoute \\(0,6\\) : \\[ \\begin{aligned} -0,9 + 0,6 &= -0,3 \\\\ -0,3 + 0,6 &= 0,3 \\\\ 0,3 + 0,6 &= 0,9 \\end{aligned} \\] Donc le nombre manquant est <b>0,3</b>.";
    return mcq(prompt,
      { t: "0,3", fb: "Exact. Chaque pas sur la droite numérique ajoute 0,6." },
      [
        { t: "0,0", fb: "Zéro rendrait les pas inégaux, car les écarts seraient différents." },
        { t: "0,6", fb: "Cela saute un pas et donne un écart de 0,9 avant lui." },
        { t: "-0,6", fb: "Les nombres augmentent, donc le nombre manquant est positif." }
      ],
      solution, { mode: "missing-spaced" });
  },
  function () {
    var prompt = "Un ensemble de nombres est \\(-" + FR(2, 3) + " ; 0,\\overline{3} ; -0,5 ; " + FR(3, 4) + "\\). Quelle est la somme du plus grand et du plus petit nombre de l'ensemble ?";
    var solution = "Le plus grand nombre est \\(" + FR(3, 4) + "\\) et le plus petit est \\(-" + FR(2, 3) + "\\), car \\(-" + FR(2, 3) + "\\) est plus petit que \\(-0,5\\) : \\[ \\begin{aligned} " + FR(3, 4) + " + \\left(-" + FR(2, 3) + "\\right) &= " + FR(9, 12) + " - " + FR(8, 12) + " \\\\ &= " + FR(1, 12) + " \\end{aligned} \\] Donc la somme est <b>\\(" + FR(1, 12) + "\\)</b>.";
    return mcq(prompt,
      { t: "\\(" + FR(1, 12) + "\\)", fb: "Exact. Le plus grand et le plus petit sont les deux valeurs extrêmes de l'ensemble." },
      [
        { t: "\\(-" + FR(1, 12) + "\\)", fb: "Le signe est faux, car la valeur positive a la plus grande taille." },
        { t: "\\(" + FR(17, 12) + "\\)", fb: "C'est la différence entre le plus grand et le plus petit, pas leur somme." },
        { t: "\\(" + FR(1, 4) + "\\)", fb: "Cela additionne le plus grand nombre à moins un demi au lieu du plus petit." }
      ],
      solution, { mode: "sum-greatest-least" });
  }
]), ["Pour une valeur à mi-chemin, fais la moyenne des deux bornes.", "Compare chaque valeur d'un ensemble, en surveillant les signes et les décimales périodiques, avant de choisir."]);

// 9. L3, 6.1, CR 3: multi-step problem, numq.
E("u1-multistep-rational", 1, ["6.1"], 3, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var start = ri(-160, 80) / 4, r1 = ri(2, 20) / 4, f1 = ri(2, 16) / 4, r2 = ri(2, 12) / 4;
    var ans = u1round(start + r1 - f1 + r2, 4);
    var promptT = "À 6 h, la température à St. John's est de " + fmtD(start) + " degrés. À midi, elle monte de " + fmtD(r1) + " degrés, à 18 h elle baisse de " + fmtD(f1) + " degrés et à minuit elle monte de " + fmtD(r2) + " degrés. Détermine la température à minuit, en degrés.";
    var solT = "Applique chaque changement dans l'ordre : \\[ \\begin{aligned} " + fmtD(start) + " + " + fmtD(r1) + " - " + fmtD(f1) + " + " + fmtD(r2) + " &= " + fmtD(u1round(start + r1, 4)) + " - " + fmtD(f1) + " + " + fmtD(r2) + " \\\\ &= " + fmtD(ans) + " \\end{aligned} \\] Donc la température à minuit est <b>" + fmtD(ans) + " degrés</b>.";
    return numq(promptT, ans, 0.01, solT, { mode: "temp-change", start: start });
  }
  if (mode === 1) {
    var startC = ri(2000, 20000), depC = ri(500, 8000), w1C = ri(400, 6000), w2C = ri(300, 5000);
    var ansB = u1round((startC + depC - w1C - w2C) / 100, 2);
    var promptB = "Un compte bancaire commence avec " + fmtDF(startC / 100, 2) + " $. On fait un dépôt de " + fmtDF(depC / 100, 2) + " $, puis des retraits de " + fmtDF(w1C / 100, 2) + " $ et de " + fmtDF(w2C / 100, 2) + " $. Détermine le solde final, en dollars.";
    var solB = "Additionne le dépôt et soustrais les deux retraits : \\[ \\begin{aligned} " + fmtDF(startC / 100, 2) + " + " + fmtDF(depC / 100, 2) + " - " + fmtDF(w1C / 100, 2) + " - " + fmtDF(w2C / 100, 2) + " &= " + fmtDF((startC + depC) / 100, 2) + " - " + fmtDF(w1C / 100, 2) + " - " + fmtDF(w2C / 100, 2) + " \\\\ &= " + fmtDF(ansB, 2) + " \\end{aligned} \\] Donc le solde final est <b>" + fmtDF(ansB, 2) + " $</b>.";
    return numq(promptB, ansB, 0.01, solB, { mode: "bank-balance", start: startC });
  }
  var dens = [2, 4, 5, 8, 10];
  var dA = pick(dens), dB = pick(dens), dC = pick(dens);
  var nA = ri(3, 30), nB = ri(3, 30), nC = ri(3, 30);
  var ansD = u1round(nA / dA + nB / dB + nC / dC, 4);
  var promptD = "Lors d'une randonnée de trois jours, un groupe marche " + u1frac(nA, dA) + " km le jour 1, " + u1frac(nB, dB) + " km le jour 2 et " + u1frac(nC, dC) + " km le jour 3. Détermine la distance totale marchée, en kilomètres, sous forme décimale.";
  var solD = "Additionne les trois distances sous forme décimale : \\[ \\begin{aligned} " + FR(nA, dA) + " + " + FR(nB, dB) + " + " + FR(nC, dC) + " &= " + fmtD(u1round(nA / dA, 4)) + " + " + fmtD(u1round(nB / dB, 4)) + " + " + fmtD(u1round(nC / dC, 4)) + " \\\\ &= " + fmtD(ansD) + " \\end{aligned} \\] Donc la distance totale est <b>" + fmtD(ansD) + " km</b>.";
  return numq(promptD, ansD, 0.01, solD, { mode: "distance-3day", a: nA, b: nB, c: nC });
}, ["Divise le problème en un changement ou une partie à la fois, dans l'ordre.", "Pars de la valeur de départ et applique chaque étape avant de passer à la suivante."]);

/* ----- bank-u2.js ----- */
// Math 9 (French) Unit 2 Square Roots and Surface Area question bank
// Cut verbatim from the standalone bank source
// (math-9-review-fr/bank-src.js, lines 377 to 752).
// CRMARKS: u2-sa-single=3
// CRMARKS: u2-sa-tri-context=3
// CRMARKS: u2-overlap=2
// CRMARKS: u2-overlap-hidden=2
// CRMARKS: u2-sa-composite-rect=3
// CRMARKS: u2-sa-problem=2
// CRMARKS: u2-sa-cyl-on-prism=3
// CRMARKS: u2-best-estimate-side=2
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
    var opts=ds.map(function(d){return {t:String(d), fb:fmtD(d)+" au carré donne "+fmtD(d*d)+", pas "+n+" : essaie une autre valeur."};});
    var q = mcq("Que vaut \\(\\sqrt{"+n+"}\\) ?", {t:String(r), fb:"Oui : "+r+" fois "+r+" égale "+n+"."}, opts,
      "\\("+r+" \\times "+r+" = "+n+"\\), donc \\(\\sqrt{"+n+"} = "+r+"\\). La racine carrée est <b>"+r+"</b>.",
      {mode:"whole", n:n});
    q.figure = solSquare(String(n), "?", "Carré avec l'aire étiquetée et le côté inconnu");
    return q;
  }
  if(mode==="decimal"){
    var k=ri(3,25); var rd=u2r1(k/10); var nd=u2r2(rd*rd);
    var dc=u2d3(rd,[u2r1(rd+0.1),u2r1(rd-0.1),u2r1(rd+1),u2r1(rd*2),u2r1(rd+0.2)]);
    var dopts=dc.map(function(d){return {t:fmtD(d), fb:fmtD(d)+" au carré donne "+fmtD(u2r2(d*d))+", pas "+fmtD(nd)+"."};});
    var q = mcq("Que vaut \\(\\sqrt{"+fmtD(nd)+"}\\) ?", {t:fmtD(rd), fb:"Oui : "+fmtD(rd)+" fois "+fmtD(rd)+" égale "+fmtD(nd)+"."}, dopts,
      "\\("+fmtD(rd)+" \\times "+fmtD(rd)+" = "+fmtD(nd)+"\\), donc \\(\\sqrt{"+fmtD(nd)+"} = "+fmtD(rd)+"\\). La racine carrée est <b>"+fmtD(rd)+"</b>.",
      {mode:"decimal", n:nd});
    q.figure = solSquare(fmtD(nd), "?", "Carré avec l'aire étiquetée et le côté inconnu");
    return q;
  }
  var p=ri(2,9); var q=ri(3,11); var g=0;
  while(u2gcd(p,q)!==1&&g<40){p=ri(2,9);q=ri(3,11);g++;}
  var fopts=[{t:"\\("+FR(p+1,q)+"\\)", fb:"En le mettant au carré, on obtient un mauvais numérateur : vérifie les deux parties."},
             {t:"\\("+FR(p,q+1)+"\\)", fb:"En le mettant au carré, on obtient un mauvais dénominateur : vérifie les deux parties."},
             {t:"\\("+FR(p-1,q)+"\\)", fb:"En le mettant au carré, on obtient un numérateur plus petit que celui montré."}];
  var qq = mcq("Que vaut \\(\\sqrt{"+FR(p*p,q*q)+"}\\) ?", {t:"\\("+FR(p,q)+"\\)", fb:"Oui : les deux parties au carré donnent les parties montrées."}, fopts,
    "Le numérateur "+(p*p)+" est "+p+" au carré, et le dénominateur "+(q*q)+" est "+q+" au carré. \\[ \\sqrt{"+FR(p*p,q*q)+"} = "+FR(p,q)+" \\] La racine carrée est <b>\\("+FR(p,q)+"\\)</b>.",
    {mode:"fraction", p:p, q:q});
  qq.figure = solSquare((p*p)+"/"+(q*q), "?", "Carré avec l'aire étiquetée et le côté inconnu");
  return qq;
}, ["Pense au nombre qui, multiplié par lui-même, donne la valeur sous le signe de racine.", "Essaie les petits carrés dans l'ordre jusqu'à ce qu'un d'eux donne exactement le nombre montré."]);

E("u2-square-from-root", 2, ["6.11"], 1, "gen", function(){
  var mode=pick(["whole","decimal","fraction"]);
  if(mode==="whole"){
    var r=ri(2,30); var n=r*r;
    var ds=u2d3(n,[2*r,n+1,n-1,n+r,n+10,3*r]);
    var opts=ds.map(function(d){return {t:String(d), fb:"Cette valeur ne vient pas de "+r+" au carré : essaie "+r+" fois "+r+"."};});
    var q = mcq("Un nombre positif a pour racine carrée "+r+". Quel est ce nombre ?", {t:String(n), fb:"Oui : mettre la racine au carré redonne le nombre."}, opts,
      "Mettre au carré défait une racine carrée : \\[ "+r+"^{2} = "+r+" \\times "+r+" = "+n+" \\] Le nombre est <b>"+n+"</b>.",
      {mode:"whole", r:r});
    q.figure = solSquare("?", String(r), "Carré avec le côté étiqueté et l'aire inconnue");
    return q;
  }
  if(mode==="decimal"){
    var k=ri(2,30); var rd=u2r1(k/10); var nd=u2r2(rd*rd);
    var dc=u2d3(nd,[u2r2(2*rd),u2r2((rd+1)*(rd+1)),u2r2(nd+1),u2r2(nd+0.1),u2r2(nd+2)]);
    var dopts=fmtPairDsD(fmtD(nd), dc.map(function(d){return {v:d, fb:"Ce n'est pas "+fmtD(rd)+" fois "+fmtD(rd)+" : mets la racine elle-même au carré."};}));
    var q = mcq("Un nombre positif a pour racine carrée "+fmtD(rd)+". Quel est ce nombre ?", {t:fmtD(nd), fb:"Oui : "+fmtD(rd)+" au carré égale "+fmtD(nd)+"."}, dopts,
      "Mettre au carré défait une racine carrée : \\[ "+fmtD(rd)+"^{2} = "+fmtD(rd)+" \\times "+fmtD(rd)+" = "+fmtD(nd)+" \\] Le nombre est <b>"+fmtD(nd)+"</b>.",
      {mode:"decimal", r:rd});
    q.figure = solSquare("?", fmtD(rd), "Carré avec le côté étiqueté et l'aire inconnue");
    return q;
  }
  var p=ri(2,9); var q=ri(3,11); var g=0;
  while(u2gcd(p,q)!==1&&g<40){p=ri(2,9);q=ri(3,11);g++;}
  var fopts=[{t:"\\("+FR(p*p,q)+"\\)", fb:"Seul le haut a été mis au carré : le bas doit aussi être mis au carré."},
             {t:"\\("+FR(p,q*q)+"\\)", fb:"Seul le bas a été mis au carré : le haut doit aussi être mis au carré."},
             {t:"\\("+FR(p*p,q*q+q)+"\\)", fb:"Mets la partie du bas au carré : ne l'additionne pas à elle-même."}];
  var qq = mcq("Un nombre positif a pour racine carrée \\("+FR(p,q)+"\\) . Quel est ce nombre ?", {t:"\\("+FR(p*p,q*q)+"\\)", fb:"Oui : mets le haut et le bas au carré séparément."}, fopts,
    "Mets le haut et le bas au carré : \\[ \\left("+FR(p,q)+"\\right)^{2} = "+FR(p*p,q*q)+" \\] Le nombre est <b>\\("+FR(p*p,q*q)+"\\)</b>.",
    {mode:"fraction", p:p, q:q});
  qq.figure = solSquare("?", p+"/"+q, "Carré avec le côté étiqueté et l'aire inconnue");
  return qq;
}, ["Mettre au carré et prendre la racine carrée se défont l'un l'autre, donc mets la racine donnée au carré.", "Multiplie la racine par elle-même, en mettant le haut et le bas au carré séparément pour une fraction."]);

E("u2-identify-square", 2, ["3.3"], 1, "gen", function(){
  var mode=pick(["whole","decimal","fraction"]);
  if(mode==="whole"){
    var r=ri(4,25); var n=r*r;
    var ds=[n+1,n-1,n+2];
    var opts=ds.map(function(d){return {t:String(d), fb:d+" se trouve entre deux carrés voisins, donc aucun nombre au carré ne le donne."};});
    return mcq("Quel nombre est un carré parfait ?", {t:String(n), fb:"Oui : "+r+" fois "+r+" égale "+n+"."}, opts,
      "Une seule valeur est un nombre fois lui-même : \\("+r+" \\times "+r+" = "+n+"\\). Le carré parfait est <b>"+n+"</b>.",
      {mode:"whole", n:n});
  }
  if(mode==="decimal"){
    var k=ri(4,24); var rd=u2r1(k/10); var nd=u2r2(rd*rd);
    var pool=[0.12,0.15,0.18,0.21,0.27,0.32,0.35,0.45,0.48,0.54,0.6,0.72,0.75,0.8,0.9,1.1,1.2,1.5,1.8,2.2,2.5,2.8,3.5];
    var sh=shuffle(pool); var ds=[]; var i=0;
    while(ds.length<3&&i<sh.length){if(sh[i]!==nd){ds.push(sh[i]);} i++;}
    var opts=fmtPairDsD(fmtD(nd), ds.map(function(d){return {v:d, fb:"Aucun nombre fois lui-même ne donne "+fmtD(d)+" : essaie les dixièmes voisins."};}));
    return mcq("Quel nombre est un carré parfait ?", {t:fmtD(nd), fb:"Oui : "+fmtD(rd)+" fois "+fmtD(rd)+" égale "+fmtD(nd)+"."}, opts,
      "Une seule valeur est un nombre fois lui-même : \\("+fmtD(rd)+" \\times "+fmtD(rd)+" = "+fmtD(nd)+"\\). Le carré parfait est <b>"+fmtD(nd)+"</b>.",
      {mode:"decimal", n:nd});
  }
  var p=ri(2,9); var q=ri(3,11); var g=0;
  while(u2gcd(p,q)!==1&&g<40){p=ri(2,9);q=ri(3,11);g++;}
  var fopts=[{t:"\\("+FR(p*p+1,q*q)+"\\)", fb:"La partie du haut n'est pas un nombre carré, donc la fraction n'en est pas un."},
             {t:"\\("+FR(p*p,q*q+1)+"\\)", fb:"La partie du bas n'est pas un nombre carré, donc la fraction n'en est pas un."},
             {t:"\\("+FR(p*p+2,q*q)+"\\)", fb:"La partie du haut se trouve entre deux carrés, donc ce n'est pas un carré."}];
  return mcq("Quel nombre est un carré parfait ?", {t:"\\("+FR(p*p,q*q)+"\\)", fb:"Oui : le haut et le bas sont tous deux des carrés parfaits."}, fopts,
    "Une fraction est un carré parfait quand son haut et son bas sont tous deux des carrés parfaits : \\(\\left("+FR(p,q)+"\\right)^{2} = "+FR(p*p,q*q)+"\\). Le carré parfait est <b>\\("+FR(p*p,q*q)+"\\)</b>.",
    {mode:"fraction", p:p, q:q});
}, ["Un carré parfait est un nombre multiplié par lui-même, sous forme entière, décimale ou de fraction.", "Pour chaque valeur, demande-toi si un nombre fois lui-même donne exactement cette valeur."]);

E("u2-estimate-between", 2, ["6.5"], 1, "gen", function(){
  var n=u2nonSquare(10,400); var k=Math.floor(Math.sqrt(n));
  if(pick(["between","closest"])==="between"){
    var pairs=[[k,k+1],[k-1,k],[k+1,k+2],[k+2,k+3]];
    var opts=pairs.slice(1).map(function(pr){return {t:pr[0]+" et "+pr[1], fb:"Mets les deux nombres au carré : "+n+" ne se trouve pas entre leurs carrés."};});
    return mcq("Entre quels deux nombres entiers se trouve la racine carrée de "+n+" ?", {t:k+" et "+(k+1), fb:"Oui : "+n+" se trouve entre "+(k*k)+" et "+((k+1)*(k+1))+"."}, opts,
      "\\("+k+"^{2} = "+(k*k)+"\\) et \\("+(k+1)+"^{2} = "+((k+1)*(k+1))+"\\), et "+n+" se trouve entre eux. Donc \\(\\sqrt{"+n+"}\\) se trouve entre <b>"+k+" et "+(k+1)+"</b>.",
      {mode:"between", n:n});
  }
  var c=((n-k*k)<((k+1)*(k+1)-n))?k:k+1;
  var ds=u2d3(c,[c+1,c-1,c+2,c-2]);
  var opts2=ds.map(function(d){return {t:String(d), fb:"Mets-le au carré : "+(d*d)+" est plus loin de "+n+" que le meilleur choix."};});
  return mcq("Quel nombre entier est le plus proche de \\(\\sqrt{"+n+"}\\) ?", {t:String(c), fb:"Oui : "+(c*c)+" est le carré le plus proche de "+n+"."}, opts2,
    "\\("+k+"^{2} = "+(k*k)+"\\) et \\("+(k+1)+"^{2} = "+((k+1)*(k+1))+"\\). Le nombre "+n+" est plus proche de "+(c*c)+", donc le nombre entier le plus proche est <b>"+c+"</b>.",
    {mode:"closest", n:n});
}, ["Trouve les carrés parfaits juste en dessous et juste au-dessus du nombre.", "Mets au carré les nombres entiers près de la racine et vois quels carrés encadrent le nombre."]);

E("u2-calc-root", 2, ["6.6"], 1, "gen", function(){
  var n=u2nonSquare(11,399);
  var ans=u2r1(Math.sqrt(n));
  return numq("Utilise une calculatrice. Que vaut \\(\\sqrt{"+n+"}\\), avec une décimale ?", ans, 0.05,
    "Une calculatrice donne \\(\\sqrt{"+n+"} \\approx "+fmtD(Math.sqrt(n))+"\\). Arrondie à une décimale, la racine carrée est <b>"+fmtD(ans)+"</b>.",
    {mode:"calc", n:n});
}, ["Entre le nombre et appuie sur la touche racine carrée d'une calculatrice.", "Lis l'écran, puis arrondis la valeur à une décimale."]);

E("u2-root-between", 2, ["6.8"], 1, "gen", function(){
  var a=ri(2,15); var b=a+1;
  var m=a*a+ri(1,2*a-1);
  var above=b*b+ri(1,12);
  var opts=[{t:String(a*a), fb:"Sa racine carrée est exactement "+a+", qui est une borne, pas entre les deux."},
            {t:String(b*b), fb:"Sa racine carrée est exactement "+b+", qui est une borne, pas entre les deux."},
            {t:String(above), fb:"Sa racine carrée est plus grande que "+b+" : mets les bornes au carré pour vérifier."}];
  return mcq("Quel nombre a une racine carrée entre "+a+" et "+b+" ?", {t:String(m), fb:"Oui : "+m+" se trouve entre "+(a*a)+" et "+(b*b)+"."}, opts,
    "Mets les bornes au carré : \\("+a+"^{2} = "+(a*a)+"\\) et \\("+b+"^{2} = "+(b*b)+"\\). Seul "+m+" se trouve entre ces carrés, donc le nombre est <b>"+m+"</b>.",
    {mode:"between", a:a, b:b});
}, ["Mets les deux nombres donnés au carré pour transformer la question en intervalle pour le nombre lui-même.", "Vérifie quel candidat se trouve entre les deux carrés que tu viens de trouver."]);

E("u2-spot-error", 2, ["6.10"], 2, "gen", function(){
  var mode=ri(1,4);
  if(mode===1){
    var c, R;
    if(ri(0,1)===0){ c=ri(3,30); R=2*c; }
    else { var kk=ri(13,39); if(kk===20){kk=21;} c=u2r1(kk/10); R=u2r1(2*c); }
    return mcq("Un élève écrit : \\(\\sqrt{"+fmtD(R)+"} = "+fmtD(c)+"\\) parce que "+fmtD(c)+" est la moitié de "+fmtD(R)+". Quelle erreur a été faite ?",
      {t:"L'élève a divisé le nombre par deux au lieu de trouver une valeur qui, au carré, le donne", fb:"Exact : une racine carrée défait un carré, pas une division par deux."},
      [{t:"L'élève a arrondi la réponse à un nombre entier trop tôt dans le travail, avant la fin", fb:"L'arrondi n'est pas le problème ici : c'est la méthode qui est fausse."},
       {t:"L'élève a mis le nombre de départ au carré au lieu de prendre sa racine carrée exacte", fb:"Regarde encore : l'étape montrée divise le nombre de départ par deux."},
       {t:"L'élève a placé la virgule décimale à la mauvaise position dans la réponse finale donnée", fb:"Les décimales sont correctes : c'est l'opération choisie qui est fausse."}],
      "Vérifie en mettant au carré : \\("+fmtD(c)+" \\times "+fmtD(c)+" = "+fmtD(u2r2(c*c))+"\\), pas "+fmtD(R)+". Diviser par deux ne défait pas un carré. L'erreur était <b>de diviser le nombre par deux au lieu de trouver une valeur qui, au carré, le donne</b>.",
      {mode:"halving", R:R});
  }
  if(mode===2){
    var k=ri(4,19); if(k===10){k=11;}
    var r=u2r1(k/10); var N=u2r2(r*r); var claim=u2r2(r/10);
    return mcq("Un élève écrit : \\(\\sqrt{"+fmtD(N)+"} = "+fmtD(claim)+"\\). Quelle erreur a été faite ?",
      {t:"La virgule décimale a été placée une position trop à gauche", fb:"Exact : "+fmtD(r)+" au carré donne le nombre, donc la virgule va là."},
      [{t:"L'élève a divisé le nombre par deux au lieu de trouver sa racine carrée", fb:"La division par deux n'est pas l'étape utilisée : compare la taille des chiffres."},
       {t:"L'élève a mis le nombre montré au carré au lieu de prendre sa racine", fb:"Mettre au carré rendrait la valeur plus grande, sans déplacer sa virgule."},
       {t:"L'élève a arrondi une réponse exacte à la mauvaise décimale", fb:"Les chiffres sont bons mais déplacés : c'est une erreur de valeur de position."}],
      "Mettre la valeur affirmée au carré donne \\("+fmtD(claim)+" \\times "+fmtD(claim)+" = "+fmtD(u2r2(claim*claim*100)/100)+"\\), pas "+fmtD(N)+", alors que \\("+fmtD(r)+" \\times "+fmtD(r)+" = "+fmtD(N)+"\\). L'erreur était <b>de placer la virgule décimale une position trop à gauche</b>.",
      {mode:"decimal-point", N:N});
  }
  if(mode===3){
    var n=ri(3,20); var cl=n*n;
    return mcq("Un élève écrit : \\(\\sqrt{"+n+"} = "+cl+"\\) parce que "+n+" fois "+n+" donne "+cl+". Quelle erreur a été faite ?",
      {t:"L'élève a mis le nombre au carré au lieu de prendre sa racine carrée", fb:"Exact : mettre au carré et prendre la racine sont des opérations opposées."},
      [{t:"L'élève a divisé le nombre par deux au lieu de prendre sa racine carrée", fb:"La division par deux n'a pas été utilisée : le travail a multiplié le nombre par lui-même."},
       {t:"L'élève a placé la virgule décimale à la mauvaise position dans la réponse", fb:"Aucune décimale n'est en jeu : l'opération elle-même a été inversée."},
       {t:"L'élève a arrondi la réponse à un nombre entier trop tôt dans le travail", fb:"L'arrondi n'est pas le problème : la réponse a grandi au lieu de diminuer."}],
      "Vérifie l'affirmation en la mettant au carré : \\("+cl+" \\times "+cl+" = "+(cl*cl)+"\\), pas "+n+". Une racine carrée défait un carré ; elle ne met pas au carré encore. L'erreur était <b>de mettre le nombre au carré au lieu de prendre sa racine carrée</b>.",
      {mode:"squared-instead", n:n});
  }
  var a=ri(3,11); var b=ri(3,11); var R=a*a+b*b; var claim=a+b;
  return mcq("Un élève écrit : \\(\\sqrt{"+(a*a)+"+"+(b*b)+"} = "+a+"+"+b+" = "+claim+"\\). Quelle erreur a été faite ?",
    {t:"L'élève a pris la racine de chaque partie séparément avant d'additionner", fb:"Exact : la racine s'applique à la somme entière, pas à chaque partie."},
    [{t:"L'élève a divisé la somme par deux au lieu de prendre sa racine carrée", fb:"La division par deux n'a pas été utilisée : les racines ont été prises partie par partie."},
     {t:"L'élève a mis la somme au carré au lieu de prendre sa racine", fb:"Le carré n'a pas été utilisé : chaque partie a été traitée par sa racine séparément."},
     {t:"L'élève a placé la virgule décimale à la mauvaise position dans la réponse", fb:"Aucune décimale n'est en jeu : la racine a été séparée sur la somme."}],
    "Additionne d'abord : \\("+(a*a)+"+"+(b*b)+" = "+R+"\\), et \\("+claim+" \\times "+claim+" = "+(claim*claim)+"\\), pas "+R+". L'erreur était <b>de prendre la racine de chaque partie séparément avant d'additionner</b>.",
    {mode:"split-root", a:a, b:b});
}, ["Teste l'affirmation en mettant au carré la réponse donnée par l'élève.", "Mets la racine affirmée au carré : si elle ne donne pas le nombre de départ, nomme l'étape qui a mal tourné."]);

E("u2-sa-single", 2, ["9.2"], 2, "gen", function(){
  var mode=pick(["rect","tri","cyl"]);
  if(mode==="rect"){
    var l=ri(2,12), w=ri(2,12), h=ri(2,12);
    var sa=2*(l*w+l*h+w*h);
    var q = numq("Trouve l'aire de la surface d'un prisme droit à base rectangulaire de longueur "+l+" cm, de largeur "+w+" cm et de hauteur "+h+" cm. Donne ta réponse en centimètres carrés.", sa, 0.01,
      "Additionne les aires des trois faces différentes, puis double : \\[ \\begin{aligned} SA &= 2(lw+lh+wh) \\\\ &= 2("+fmtD(l*w)+"+"+fmtD(l*h)+"+"+fmtD(w*h)+") \\\\ &= 2("+fmtD(l*w+l*h+w*h)+") \\\\ &= "+fmtD(sa)+" \\end{aligned} \\] L'aire de la surface est <b>"+fmtD(sa)+" cm\\(^{2}\\)</b>.",
      {mode:"rect-prism", l:l, w:w, h:h});
    q.figure = solRectPrism(l, w, h, fmtD(l) + " cm", fmtD(w) + " cm", fmtD(h) + " cm", "Prisme rectangulaire avec des dimensions étiquetées");
    return q;
  }
  if(mode==="tri"){
    var tr=pick([[3,4,5],[5,12,13],[6,8,10],[8,15,17],[9,12,15],[12,16,20]]);
    var a=tr[0], b=tr[1], c=tr[2]; var L=ri(4,18);
    var sa2=a*b+(a+b+c)*L;
    var q = numq("Trouve l'aire de la surface d'un prisme droit à base triangulaire. L'extrémité triangulaire est un triangle rectangle avec des cathètes de "+a+" cm et "+b+" cm et une hypoténuse de "+c+" cm, et le prisme mesure "+L+" cm de long. Donne ta réponse en centimètres carrés.", sa2, 0.01,
      "Deux extrémités triangulaires plus trois rectangles le long de la longueur : \\[ \\begin{aligned} SA &= 2\\left("+FR(1,2)+"\\times "+a+"\\times "+b+"\\right)+("+a+"+"+b+"+"+c+")\\times "+L+" \\\\ &= "+fmtD(a*b)+"+"+fmtD((a+b+c)*L)+" \\\\ &= "+fmtD(sa2)+" \\end{aligned} \\] L'aire de la surface est <b>"+fmtD(sa2)+" cm\\(^{2}\\)</b>.",
      {mode:"tri-prism", a:a, b:b, c:c, L:L});
    q.figure = solTriPrism(a, b, c, L, fmtD(a) + " cm", fmtD(b) + " cm", fmtD(c) + " cm", fmtD(L) + " cm", "Prisme triangulaire avec des dimensions étiquetées");
    return q;
  }
  var r=ri(2,10), hh=ri(3,15);
  var sac=u2r1(2*3.14*r*(r+hh));
  var q = numq("Trouve l'aire de la surface d'un cylindre droit de rayon "+r+" cm et de hauteur "+hh+" cm. Utilise \\(\\pi = 3,14\\) et donne ta réponse en centimètres carrés, avec une décimale.", sac, 0.6,
    "Deux cercles plus la face courbe, avec \\(\\pi = 3,14\\) : \\[ \\begin{aligned} SA &= 2\\pi r^{2}+2\\pi r h \\\\ &= 2(3,14)("+r+")("+r+"+"+hh+") \\\\ &= "+fmtD(sac)+" \\end{aligned} \\] L'aire de la surface est <b>"+fmtD(sac)+" cm\\(^{2}\\)</b>.",
    {mode:"cylinder", r:r, h:hh});
    q.figure = solCylinder(r, hh, fmtD(r) + " cm", fmtD(hh) + " cm", "Cylindre avec des dimensions étiquetées");
    return q;
}, ["Imagine le développement du solide : chaque face extérieure doit être comptée une fois.", "Calcule l'aire d'une face à la fois, puis additionne les faces qui correspondent."]);

E("u2-sa-tri-context", 2, ["9.2"], 2, "gen", function(){
  var tr=pick([[3,4,5],[5,12,13],[6,8,10],[8,15,17],[9,12,15]]);
  var a=tr[0], b=tr[1], c=tr[2]; var L=ri(5,20);
  var mode=pick(["ramp","tent","bar"]);
  if(mode==="tent"){
    var sat=a*b+(a+c)*L;
    var q = numq("Une tente adossée a la forme d'un prisme droit à base triangulaire. Chaque extrémité triangulaire a un côté vertical de "+a+" cm, une base de "+b+" cm et un côté incliné de "+c+" cm, et la tente mesure "+L+" cm de long. La face rectangulaire au sol, "+b+" cm sur "+L+" cm, n'a pas de matériau. Trouve l'aire de matériau nécessaire, en centimètres carrés.", sat, 0.01,
      "Compte deux extrémités triangulaires et les deux rectangles couverts, sans la face au sol : \\[ \\begin{aligned} SA &= 2\\left("+FR(1,2)+"\\times "+a+"\\times "+b+"\\right)+("+a+"+"+c+")\\times "+L+" \\\\ &= "+fmtD(a*b)+"+"+fmtD((a+c)*L)+" \\\\ &= "+fmtD(sat)+" \\end{aligned} \\] L'aire de matériau nécessaire est <b>"+fmtD(sat)+" cm\\(^{2}\\)</b>.",
      {mode:"tent-no-floor", a:a, b:b, c:c, L:L});
    q.figure = solTriPrism(a, b, c, L, fmtD(a) + " cm", fmtD(b) + " cm", fmtD(c) + " cm", fmtD(L) + " cm", "Tente en prisme triangulaire avec des dimensions étiquetées");
    return q;
  }
  var sa=a*b+(a+b+c)*L;
  if(mode==="ramp"){
    var q = numq("Une rampe d'exposition a la forme d'un prisme droit à base triangulaire et est couverte sur toutes ses faces. Chaque extrémité triangulaire a des côtés de "+a+" cm, "+b+" cm et "+c+" cm, qui forment un triangle rectangle, et la rampe mesure "+L+" cm de long. Trouve l'aire de la surface de la rampe, en centimètres carrés.", sa, 0.01,
      "Deux extrémités triangulaires plus trois rectangles le long de la longueur : \\[ \\begin{aligned} SA &= 2\\left("+FR(1,2)+"\\times "+a+"\\times "+b+"\\right)+("+a+"+"+b+"+"+c+")\\times "+L+" \\\\ &= "+fmtD(a*b)+"+"+fmtD((a+b+c)*L)+" \\\\ &= "+fmtD(sa)+" \\end{aligned} \\] L'aire de la surface est <b>"+fmtD(sa)+" cm\\(^{2}\\)</b>.",
      {mode:"ramp", a:a, b:b, c:c, L:L});
    q.figure = solTriPrism(a, b, c, L, fmtD(a) + " cm", fmtD(b) + " cm", fmtD(c) + " cm", fmtD(L) + " cm", "Rampe en prisme triangulaire avec des dimensions étiquetées");
    return q;
  }
  var q = numq("Une boîte de barre de chocolat a la forme d'un prisme droit à base triangulaire, fermée sur toutes ses faces. Chaque extrémité triangulaire a des côtés de "+a+" cm, "+b+" cm et "+c+" cm, qui forment un triangle rectangle, et la boîte mesure "+L+" cm de long. Trouve l'aire de la surface de la boîte, en centimètres carrés.", sa, 0.01,
    "Deux extrémités triangulaires plus trois rectangles le long de la longueur : \\[ \\begin{aligned} SA &= 2\\left("+FR(1,2)+"\\times "+a+"\\times "+b+"\\right)+("+a+"+"+b+"+"+c+")\\times "+L+" \\\\ &= "+fmtD(a*b)+"+"+fmtD((a+b+c)*L)+" \\\\ &= "+fmtD(sa)+" \\end{aligned} \\] L'aire de la surface est <b>"+fmtD(sa)+" cm\\(^{2}\\)</b>.",
    {mode:"bar-box", a:a, b:b, c:c, L:L});
    q.figure = solTriPrism(a, b, c, L, fmtD(a) + " cm", fmtD(b) + " cm", fmtD(c) + " cm", fmtD(L) + " cm", "Boîte en prisme triangulaire avec des dimensions étiquetées");
    return q;
}, ["Dessine le prisme et étiquette chaque face avant de calculer.", "Trouve d'abord les deux extrémités triangulaires, puis additionne les rectangles le long de la longueur."]);

E("u2-overlap", 2, ["9.1"], 1, "gen", function(){
  var p=ri(2,11), q=ri(2,10);
  var bl=ri(p+2,p+8), bw=ri(q+2,q+8);
  var qq = numq("Une petite boîte est posée sur une plus grande boîte qui mesure "+bl+" cm de long et "+bw+" cm de large. Les deux boîtes se touchent sur un rectangle de "+p+" cm sur "+q+" cm. Quelle est l'aire du chevauchement, en centimètres carrés ?", p*q, 0.01,
    "Le chevauchement est le rectangle où les boîtes se touchent : \\[ \\begin{aligned} A &= "+p+" \\times "+q+" \\\\ &= "+(p*q)+" \\end{aligned} \\] L'aire du chevauchement est <b>"+(p*q)+" cm\\(^{2}\\)</b>.",
    {mode:"overlap", p:p, q:q});
    qq.figure = solOverlapPlan(bl, bw, p, q, fmtD(p) + " cm", fmtD(q) + " cm", fmtD(bl) + " cm", fmtD(bw) + " cm", "Vue en plan de deux boîtes avec le recouvrement ombré");
    return qq;
}, ["Le chevauchement est le rectangle où les deux solides se touchent.", "Trouve d'abord l'aire du rectangle de contact, puis pense au nombre de faces qu'il cache."]);

E("u2-overlap-hidden", 2, ["9.1"], 2, "gen", function(){
  var p=ri(2,11), q=ri(2,10);
  var bl=ri(p+2,p+8), bw=ri(q+2,q+8);
  var qq = numq("Une petite boîte est posée sur une plus grande boîte qui mesure "+bl+" cm de long et "+bw+" cm de large. Les deux boîtes se touchent sur un rectangle de "+p+" cm sur "+q+" cm. Quelle aire de la surface est cachée là où les deux boîtes se touchent, en centimètres carrés ?", 2*p*q, 0.01,
    "Le rectangle de contact cache une face sur chaque boîte, donc il est caché deux fois : \\[ \\begin{aligned} \\text{cachée} &= 2\\times("+p+" \\times "+q+") \\\\ &= 2\\times "+(p*q)+" \\\\ &= "+(2*p*q)+" \\end{aligned} \\] L'aire de la surface cachée est <b>"+(2*p*q)+" cm\\(^{2}\\)</b>.",
    {mode:"hidden-total", p:p, q:q});
    qq.figure = solOverlapPlan(bl, bw, p, q, fmtD(p) + " cm", fmtD(q) + " cm", fmtD(bl) + " cm", fmtD(bw) + " cm", "Vue en plan de deux boîtes avec le recouvrement ombré");
    return qq;
}, ["Le chevauchement est le rectangle où les deux solides se touchent.", "Trouve d'abord l'aire du rectangle de contact, puis pense au nombre de faces qu'il cache."]);

E("u2-sa-composite-rect", 2, ["9.2"], 2, "gen", function(){
  var X=ri(8,16), W=ri(4,10), H1=ri(3,7), X2=ri(3,6), H2=ri(2,6);
  if(X2>=X){X2=X-3;}
  var sa1=2*(X*W+X*H1+W*H1), sa2=2*(X2*W+X2*H2+W*H2), contact=X2*W;
  var tot=sa1+sa2-2*contact;
  var q = numq("Une marche est faite de deux boîtes jointes. La boîte du bas mesure "+X+" cm de long, "+W+" cm de large et "+H1+" cm de haut. La boîte du haut mesure "+X2+" cm de long, "+W+" cm de large et "+H2+" cm de haut, et elle est posée sur la boîte du bas, alignée avec le dos et le côté gauche. Trouve l'aire de la surface de la marche, en centimètres carrés.", tot, 0.01,
    "Trouve chaque boîte séparément, puis soustrais la face de contact deux fois car elle est cachée sur les deux boîtes : \\[ \\begin{aligned} SA &= 2("+fmtD(X*W)+"+"+fmtD(X*H1)+"+"+fmtD(W*H1)+") + 2("+fmtD(X2*W)+"+"+fmtD(X2*H2)+"+"+fmtD(W*H2)+") - 2("+contact+") \\\\ &= "+sa1+" + "+sa2+" - "+(2*contact)+" \\\\ &= "+tot+" \\end{aligned} \\] L'aire de la surface est <b>"+tot+" cm\\(^{2}\\)</b>.",
    {mode:"step", X:X, W:W, H1:H1, X2:X2, H2:H2});
    q.figure = solStep(X, W, H1, X2, H2, fmtD(X) + " cm", fmtD(W) + " cm", fmtD(H1) + " cm", fmtD(X2) + " cm", fmtD(H2) + " cm", "Marche formée de deux boîtes avec des dimensions étiquetées");
    return q;
}, ["Traite la marche comme deux boîtes séparées d'abord, puis ajuste pour le joint.", "Additionne les deux aires totales, puis soustrais la face de contact deux fois car elle est cachée sur les deux boîtes."]);

E("u2-sa-problem", 2, ["9.3"], 2, "gen", function(){
  if(pick(["cans","cost"])==="cans"){
    var l=ri(4,11)/2, w=ri(3,9)/2, h=ri(3,8)/2;
    var sa=2*(l*w+l*h+w*h);
    var cover=pick([8,10,12,15,20]);
    var cans=Math.ceil(sa/cover-0.0000001);
    var q = numq("Un réservoir en forme de prisme droit à base rectangulaire mesure "+fmtD(l)+" m de long, "+fmtD(w)+" m de large et "+fmtD(h)+" m de haut. On le peint à l'extérieur, sur toutes ses faces. Un pot de peinture couvre "+cover+" mètres carrés. Combien de pots de peinture faut-il ?", cans, 0.01,
      "Trouve d'abord l'aire de la surface, puis divise par la couverture et arrondis vers le haut : \\[ \\begin{aligned} SA &= 2("+fmtD(l*w)+"+"+fmtD(l*h)+"+"+fmtD(w*h)+") \\\\ &= "+fmtD(sa)+" \\end{aligned} \\] Alors \\("+fmtD(sa)+" \\div "+cover+" \\approx "+fmtD(u2r2(sa/cover))+"\\), donc un pot partiel ne suffit pas. Le nombre de pots nécessaire est <b>"+cans+"</b>.",
      {mode:"paint-cans", l:l, w:w, h:h, cover:cover});
    q.figure = solRectPrism(l, w, h, fmtD(l) + " m", fmtD(w) + " m", fmtD(h) + " m", "Réservoir en prisme rectangulaire avec des dimensions étiquetées");
    return q;
  }
  var l2=ri(8,30)/10, w2=ri(6,24)/10, h2=ri(4,18)/10;
  var sa2=2*(l2*w2+l2*h2+w2*h2);
  var price=pick([4,5,6,8,9]);
  var cost=u2r2(sa2*price);
  var q = numq("Une boîte-cadeau en forme de prisme droit à base rectangulaire mesure "+fmtD(l2)+" m de long, "+fmtD(w2)+" m de large et "+fmtD(h2)+" m de haut. Elle est couverte sur toutes ses faces d'un tissu qui coûte "+price+" $ par mètre carré. Quel est le coût total du tissu, en dollars, au cent près ?", cost, 0.05,
    "Trouve d'abord l'aire de la surface, puis multiplie par le prix par mètre carré : \\[ \\begin{aligned} SA &= 2("+fmtD(u2r2(l2*w2))+"+"+fmtD(u2r2(l2*h2))+"+"+fmtD(u2r2(w2*h2))+") \\\\ &= "+fmtD(u2r2(sa2))+" \\end{aligned} \\] Alors \\("+fmtD(u2r2(sa2))+" \\times "+price+" = "+fmtDF(cost, 2)+"\\). Le coût total est <b>"+fmtDF(cost, 2)+" $</b>.",
    {mode:"fabric-cost", l:l2, w:w2, h:h2, price:price});
    q.figure = solRectPrism(l2, w2, h2, fmtD(l2) + " m", fmtD(w2) + " m", fmtD(h2) + " m", "Boîte en prisme rectangulaire avec des dimensions étiquetées");
    return q;
}, ["Calcule l'aire de la surface avant d'utiliser la couverture ou le prix.", "Divise l'aire de la surface par la couverture par pot, ou multiplie-la par le prix par mètre carré."]);

E("u2-why-approx", 2, ["6.7"], 1, "var", varset([
  function(){
    return mcq("Une calculatrice montre \\(\\sqrt{2} \\approx 1,414213562\\). Pourquoi la valeur à l'écran est-elle une approximation ?",
      {t:"Mettre 1,414213562 au carré ne donne pas exactement 2, seulement très proche de 2", fb:"Exact : l'écran est arrondi, donc son carré manque 2 de peu."},
      [{t:"La calculatrice a fait une erreur de calcul quand elle a trouvé la racine cherchée", fb:"La calculatrice fonctionne bien : la limite est la taille de l'écran."},
       {t:"La valeur est exacte car elle montre neuf décimales à l'écran", fb:"Beaucoup de décimales veut encore dire arrondi : les chiffres continuent après."},
       {t:"La racine de 2 est une fraction, et l'écran ne peut pas montrer les fractions de la calculatrice", fb:"Le problème est les décimales sans fin, pas les fractions : certaines racines sont des fractions."}],
      "Mettre la valeur de l'écran au carré donne environ \\(1,999999999\\), proche de 2 mais pas égal, car la vraie valeur continue après l'écran. La valeur de l'écran est <b>une approximation car elle est arrondie</b>.",
      {mode:"static-sqrt2"});
  },
  function(){
    return mcq("Un élève dit que la valeur exacte de \\(\\sqrt{7}\\) est 2,64575131, la valeur à l'écran de la calculatrice. Pourquoi l'élève a-t-il tort ?",
      {t:"La vraie valeur a des chiffres décimaux qui continuent sans fin", fb:"Exact : l'écran montre seulement les premiers chiffres, arrondis."},
      [{t:"La calculatrice a arrondi le dernier chiffre dans le mauvais sens à l'écran", fb:"Les deux sens d'arrondi coupent quand même la valeur : c'est le point."},
       {t:"La valeur exacte de la racine est 2,6, avec une seule décimale", fb:"Les racines ne s'arrêtent pas à une décimale : celle-ci continue."},
       {t:"L'élève a copié les chiffres de l'écran dans le mauvais ordre", fb:"Les chiffres ont été bien copiés : c'est la valeur elle-même qui est incomplète."}],
      "La décimale de \\(\\sqrt{7}\\) ne se termine jamais, donc un écran ne peut montrer que ses premiers chiffres, arrondis. L'élève a tort car <b>la vraie valeur continue sans fin après l'écran</b>.",
      {mode:"static-sqrt7"});
  },
  function(){
    return mcq("Pour un projet, Sam utilise 3,16 comme valeur de \\(\\sqrt{10}\\). Pourquoi 3,16 est-il appelé une approximation ?",
      {t:"C'est la vraie valeur arrondie à deux décimales, pas la valeur complète", fb:"Exact : 3,16 au carré donne 9,9856, proche de 10 mais pas égal."},
      [{t:"C'est une approximation car Sam l'a trouvée sans calculatrice", fb:"La méthode ne décide pas : c'est l'arrondi qui compte."},
       {t:"C'est exact, car deux décimales suffisent pour tout projet", fb:"Suffisant pour un projet peut quand même être arrondi plutôt qu'exact."},
       {t:"C'est une approximation car le nombre 10 n'a pas du tout de racine carrée", fb:"10 a bien une racine : elle ne se termine jamais et ne se répète jamais."}],
      "\\(3,16 \\times 3,16 = 9,9856\\), ce qui est proche de 10 mais pas égal. La valeur 3,16 est <b>une approximation car c'est la vraie racine arrondie à deux décimales</b>.",
      {mode:"static-sqrt10"});
  }
]), ["Demande-toi si mettre la valeur montrée au carré redonne exactement le nombre de départ.", "Vérifie la valeur montrée en la mettant au carré, et pense à savoir si d'autres chiffres existent."]);

E("u2-sa-cyl-on-prism", 2, ["9.3"], 3, "gen", function(){
  var r=ri(2,5), hc=ri(4,12), l=ri(10,16), w=ri(10,16), h=ri(3,8);
  var prism=2*(l*w+l*h+w*h);
  var side=u2r1(2*3.14*r*hc), top=u2r2(3.14*r*r);
  var tot=u2r1(prism+side);
  var ctx=pick(["Un réservoir d'eau cylindrique est posé sur une base rectangulaire en béton","Une grosse bougie ronde est posée sur un support rectangulaire en bois"]);
  var q = numq(ctx+". Le cylindre a un rayon de "+r+" cm et une hauteur de "+hc+" cm, et sa base repose entièrement sur la face du haut du prisme. Le prisme mesure "+l+" cm de long, "+w+" cm de large et "+h+" cm de haut. Trouve l'aire de la surface exposée, en centimètres carrés. Utilise \\(\\pi = 3,14\\) et donne ta réponse avec une décimale.", tot, 0.6,
    "Le cercle où le cylindre rencontre le prisme est caché, et le bas du cylindre n'est pas exposé, donc ces deux cercles égaux s'annulent dans le total : \\[ \\begin{aligned} SA &= 2("+fmtD(l*w)+"+"+fmtD(l*h)+"+"+fmtD(w*h)+") + 2(3,14)("+r+")("+hc+") \\\\ &= "+prism+" + "+fmtD(side)+" \\\\ &= "+fmtD(tot)+" \\end{aligned} \\] L'aire de la surface exposée est <b>"+fmtD(tot)+" cm\\(^{2}\\)</b>.",
    {mode:"cyl-on-prism", r:r, hc:hc, l:l, w:w, h:h});
    q.figure = solCylOnPrism(r, hc, l, w, h, fmtD(r) + " cm", fmtD(hc) + " cm", fmtD(l) + " cm", fmtD(w) + " cm", fmtD(h) + " cm", "Cylindre sur un prisme rectangulaire avec des dimensions étiquetées");
    return q;
}, ["Divise le solide en prisme et en cylindre, puis pense au joint.", "Trouve l'aire de la surface du prisme, puis additionne seulement les parties exposées du cylindre."]);

E("u2-best-estimate-side", 2, ["6.5","6.8"], 3, "gen", function(){
  var best=u2r1(ri(24,98)/10);
  var A=u2r1(best*best+pick([-0.6,-0.3,0.3,0.6]));
  var ctx=pick(["Un patio carré","Une photo imprimée carrée","Un tapis de sol carré","Un tapis carré"]);
  var vals=[u2r1(best-0.5), best, u2r1(best+0.5), u2r1(best+1)];
  var opts=vals.slice(0,1).concat(vals.slice(2)).map(function(v){
    return {t:fmtD(v), fb:"Mets-le au carré : "+fmtD(v)+" au carré donne "+fmtD(u2r2(v*v))+", pas le carré le plus proche de "+fmtD(A)+"."};
  });
  var q = mcq(ctx+" a une aire de "+fmtD(A)+" mètres carrés. Quelle est la meilleure estimation de la longueur de son côté, en mètres ?",
    {t:fmtD(best), fb:"Oui : "+fmtD(best)+" au carré donne "+fmtD(u2r2(best*best))+", le plus proche de "+fmtD(A)+"."}, opts,
    "La longueur du côté est \\(\\sqrt{"+fmtD(A)+"}\\). Puisque \\("+fmtD(best)+"^{2} = "+fmtD(u2r2(best*best))+"\\), le carré le plus proche de "+fmtD(A)+", la meilleure estimation est <b>"+fmtD(best)+" m</b>.",
    {mode:"best-estimate", A:A});
  q.figure = solSquare(fmtD(A)+" m²", "?", "Carré avec l'aire étiquetée et le côté inconnu");
  return q;
}, ["La longueur du côté est la racine carrée de l'aire, donc estime cette racine.", "Mets au carré chaque valeur à une décimale voisine et trouve quel carré tombe le plus proche de l'aire."]);

E("u2-reasoning-var", 2, ["3.3","6.10"], 3, "var", varset([
  function(){
    return mcq("Rina affirme que 0,81 est un carré parfait parce que 81 est un carré parfait et que les chiffres sont les mêmes. Quelle option juge son affirmation correctement ?",
      {t:"L'affirmation est exacte, car 0,9 fois 0,9 égale 0,81", fb:"Exact : un nombre décimal est un carré parfait quand un nombre au carré le donne."},
      [{t:"L'affirmation est fausse, car les décimaux ne sont jamais des carrés", fb:"Les décimaux peuvent être des carrés : vérifie 0,9 fois 0,9 toi-même."},
       {t:"L'affirmation est fausse, car 0,81 sur 2 n'est pas entier", fb:"Diviser par deux n'est pas le test : le test est de multiplier un nombre par lui-même."},
       {t:"L'affirmation est exacte, car 81 sur 100 est entier", fb:"Le résultat est bon mais cette raison échoue : 81 sur 100 n'est pas entier."}],
      "\\(0,9 \\times 0,9 = 0,81\\), donc un nombre fois lui-même donne 0,81. Le jugement correct est <b>l'affirmation est exacte, car 0,9 fois 0,9 égale 0,81</b>.",
      {mode:"static-decimal-claim"});
  },
  function(){
    return mcq("Dev affirme que \\("+FR(18,49)+"\\) est un carré parfait parce que 49 est un carré parfait. Quelle option juge son affirmation correctement ?",
      {t:"L'affirmation est fausse, car 18 n'est pas un carré parfait", fb:"Exact : le haut et le bas doivent tous deux être des carrés parfaits."},
      [{t:"L'affirmation est exacte, car 49 est un carré à lui seul", fb:"Une partie qui est un carré ne suffit pas : vérifie aussi la partie du haut."},
       {t:"L'affirmation est fausse, car les fractions ne sont jamais des carrés", fb:"Les fractions peuvent être des carrés quand les deux parties sont des nombres carrés."},
       {t:"L'affirmation est exacte, car 18 est proche du carré 16", fb:"Proche n'est pas égal : 18 lui-même devrait être un carré."}],
      "Une fraction est un carré parfait seulement quand son haut et son bas sont tous deux des carrés parfaits. Ici, 49 est un carré mais 18 ne l'est pas. Le jugement correct est <b>l'affirmation est fausse, car 18 n'est pas un carré parfait</b>.",
      {mode:"static-fraction-claim"});
  },
  function(){
    return mcq("Tess estime \\(\\sqrt{48}\\) à 24, en disant qu'elle a divisé 48 par deux pour défaire le carré. Quelle option juge sa méthode correctement ?",
      {t:"La méthode est fausse : 48 se trouve entre 36 et 49, donc la racine se trouve entre 6 et 7", fb:"Exact : les carrés repères donnent l'intervalle, et diviser par deux n'est pas prendre la racine."},
      [{t:"La méthode est bonne : diviser un nombre par deux donne toujours sa racine carrée", fb:"Teste-la sur 16 : diviser par deux donne 8, mais la racine carrée est 4."},
       {t:"La méthode est fausse : la racine de 48 est exactement 7 car 48 s'arrondit à 49, le carré parfait voisin", fb:"Arrondir le nombre de départ ne rend pas la racine exacte."},
       {t:"La méthode est bonne : 24 fois 24 est assez proche de 48 pour une estimation qui suffit ici", fb:"24 au carré donne 576, ce qui n'est pas du tout proche de 48."}],
      "Les carrés repères donnent \\(36 < 48 < 49\\), donc \\(6 < \\sqrt{48} < 7\\), et diviser par deux ne défait jamais un carré. Le jugement correct est <b>la méthode est fausse : la racine se trouve entre 6 et 7</b>.",
      {mode:"static-estimate-flaw"});
  }
]), ["Juge une affirmation en la testant avec la définition, pas par son apparence.", "Pour une affirmation sur un carré, multiplie un candidat par lui-même ; pour une estimation, encadre-la entre des carrés parfaits."]);

/* TRANSLATOR NOTES
 * Judgement calls (glossary silent): "product law" = "loi du produit";
 * "quotient law" = "loi du quotient"; "power of a power law" = "loi de la
 * puissance d'une puissance"; "repeated multiplication" = "multiplication
 * répétée"; "pattern" (exponent pattern) = "régularité"; "brackets" =
 * "parenthèses"; "single power" = "une seule puissance" in prompts and
 * "puissance unique" in solutions; "first power" in zero-exponent feedback
 * rendered as "puissance d'exposant 1" to avoid ambiguity.
 * In u3-law-then-sum-difference the source reuses the variable word
 * ("sum"/"difference") for both display text and the internal mode string.
 * Display uses a new variable wordFr ("somme"/"différence") so the mode
 * string stays "law-then-sum"/"law-then-difference", unchanged.
 * FMT-GEOM lines left: none. This chunk has no SVG or geometry fmt uses;
 * every display fmt( was converted to fmtD(.
 * Money and percent: none occur in this chunk. Literal decimals in display
 * strings: none occur; the decimal values in u3-zero-exponent are code
 * numeric literals (the aList array), left unchanged per the invariants.
 * Literal formatted numbers written into static prose (decimals,
 * thousands, %, $): NONE. Every generated number routes through fmtD.
 * For reconciliation: the only literal numerals in static text are small
 * integers that are mathematics or labels, reproduced unchanged from the
 * source: step labels "Étape 1" to "Étape 4" in u3-find-the-error,
 * exponent values 0, 1 and 2 in u3-zero-exponent feedback prose, and the
 * KaTeX example values in u3-explanations-var (8, 9, 6, 4, 125, 25, 5, 1,
 * 0, -9). No thousands grouping, "%" or "$" appears anywhere in the chunk.
 */

/* ----- bank-u3.js ----- */
// Math 9 (French) Unit 3 Powers and Exponent Laws question bank
// Cut verbatim from the standalone bank source
// (math-9-review-fr/bank-src.js, lines 753 to 1214).
// CRMARKS: u3-two-laws-evaluate=3
// CRMARKS: u3-power-of-product-quotient=3
// CRMARKS: u3-sum-of-powers=3
// CRMARKS: u3-difference-of-powers=2
// CRMARKS: u3-find-the-error=2
// CRMARKS: u3-three-laws-evaluate=3
// CRMARKS: u3-law-then-sum-difference=2
/* Unit 3: Powers and Exponent Laws */
// Unit 3: Powers and Exponent Laws

function u3Pick3(correct, pairs) {
  var out = [], seen = {};
  seen[String(correct)] = 1;
  for (var i = 0; i < pairs.length && out.length < 3; i++) {
    var v = pairs[i].v;
    if (!seen[String(v)]) { seen[String(v)] = 1; out.push({ t: fmtD(v), fb: pairs[i].fb }); }
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
    { t: u3MultStr(b, e + 1), fb: "Cela utilise un facteur de trop. Compte l'exposant." },
    { t: u3MultStr(b, e - 1), fb: "Cela utilise un facteur de moins. Compte l'exposant." },
    { t: u3MultStr(e, e), fb: "Cela répète l'exposant. La base est le facteur qui se répète." },
    { t: u3MultStr(b, b), fb: "Cela répète la base autant de fois que sa propre valeur." },
    { t: u3MultStr(b + 1, e), fb: "Cela change la base. Garde la base de la puissance." }
  ];
  var ds = [], seen = {}; seen[correct] = 1;
  for (var i = 0; i < cands.length && ds.length < 3; i++) { if (!seen[cands[i].t]) { seen[cands[i].t] = 1; ds.push(cands[i]); } }
  return mcq("Comment écrit-on \\(" + b + "^{" + e + "}\\) comme multiplication répétée ?",
    { t: correct, fb: "Exact. La base se répète autant de fois que l'exposant l'indique." }, ds,
    "La base est \\(" + b + "\\) et l'exposant est \\(" + e + "\\), donc écris \\(" + b + "\\) comme facteur \\(" + e + "\\) fois : \\[ " + correct.replace("\\(", "").replace("\\)", "") + " \\] Donc la multiplication répétée est <b>" + correct + "</b>.",
    { mode: "power-to-repeated", b: b, e: e });
}, ["L'exposant te dit combien de fois la base apparaît comme facteur.", "Écris la base, puis continue à multiplier par elle jusqu'à utiliser le nombre indiqué par l'exposant."]);

E("u3-power-from-repeated", 3, ["3.7"], 1, "gen", function () {
  var mode = pick(["pos", "neg"]);
  if (mode === "pos") {
    var b = ri(2, 9), c = ri(2, 6);
    while (b === c) { b = ri(2, 9); }
    var shown = u3MultStr(b, c);
    var ds = u3PowDist(b, c, [
      { v: b, fb: "Cela échange la base et le nombre de facteurs." },
      { v: c + 1, fb: "Cela ajoute un à l'exposant. Compte les facteurs montrés." },
      { v: c - 1, fb: "Cela soustrait un de l'exposant. Compte les facteurs montrés." },
      { v: b + c, fb: "Cela additionne la base et le nombre de facteurs. L'exposant est seulement ce nombre." }
    ]);
    // u3PowDist builds options with base b, but the swapped option needs base c; fix by rebuilding manually when needed
    return mcq("Comment écrit-on " + shown + " comme une seule puissance ?",
      { t: "\\(" + b + "^{" + c + "}\\)", fb: "Exact. Le facteur répété est la base et le nombre de facteurs est l'exposant." },
      [
        { t: "\\(" + c + "^{" + b + "}\\)", fb: "Cela échange la base et le nombre de facteurs." },
        { t: "\\(" + b + "^{" + (c + 1) + "}\\)", fb: "Cela ajoute un à l'exposant. Compte les facteurs montrés." },
        { t: "\\(" + b + "^{" + Math.max(1, c - 1) + "}\\)", fb: "Cela soustrait un de l'exposant. Compte les facteurs montrés." }
      ],
      "Il y a \\(" + c + "\\) facteurs, et chaque facteur est \\(" + b + "\\), donc la puissance est \\(" + b + "^{" + c + "}\\). Donc la puissance unique est <b>\\(" + b + "^{" + c + "}\\)</b>.",
      { mode: "repeated-to-power-pos", b: b, c: c });
  }
  var nb = ri(2, 6), nc = ri(2, 5);
  while (nb === nc) { nb = ri(2, 6); }
  var nshown = u3MultStr("(-" + nb + ")", nc);
  return mcq("Comment écrit-on " + nshown + " comme une seule puissance ?",
    { t: "\\((-" + nb + ")^{" + nc + "}\\)", fb: "Exact. Toute la valeur entre parenthèses est la base répétée." },
    [
      { t: "\\(" + nb + "^{" + nc + "}\\)", fb: "Cela retire le signe négatif de la base." },
      { t: "\\((-" + nb + ")^{" + (nc + 1) + "}\\)", fb: "Cela ajoute un à l'exposant. Compte les facteurs montrés." },
      { t: "\\((-" + nc + ")^{" + nb + "}\\)", fb: "Cela échange la valeur de la base et le nombre de facteurs." }
    ],
    "Il y a \\(" + nc + "\\) facteurs, et chaque facteur est \\((-" + nb + ")\\), donc la puissance est \\((-" + nb + ")^{" + nc + "}\\). Donc la puissance unique est <b>\\((-" + nb + ")^{" + nc + "}\\)</b>.",
    { mode: "repeated-to-power-neg", b: nb, c: nc });
}, ["Compte d'abord les facteurs. Ce nombre devient l'exposant.", "Écris le facteur répété comme base, puis utilise ton compte comme exposant."]);

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
  var sol = "Développe en multiplication répétée et multiplie étape par étape : \\[ \\begin{aligned} " + shown + " &= " + fmtD(val) + " \\end{aligned} \\] Donc la valeur est <b>" + fmtD(val) + "</b>.";
  return numq("Calcule \\(" + shown + "\\).", val, 0, sol, { mode: "evaluate-single", base: base, e: e });
}, ["Développe d'abord la puissance en multiplication répétée.", "Multiplie la base par elle-même, en utilisant l'exposant comme nombre de fois."]);

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
    return mcq("Laquelle est la plus grande, \\(" + a + "^{" + b + "}\\) ou \\(" + b + "^{" + a + "}\\) ?",
      { t: greater, fb: "Exact. Sa multiplication répétée donne la plus grande valeur." },
      [
        { t: other, fb: "Cette puissance a la plus petite valeur. Développe les deux et compare." },
        { t: "\\(" + a + "^{" + a + "}\\)", fb: "Cela change l'exposant pour qu'il égale la base." },
        { t: "\\(" + b + "^{" + b + "}\\)", fb: "Cela change l'exposant pour qu'il égale la base." }
      ],
      "Développe chaque puissance : \\[ \\begin{aligned} " + a + "^{" + b + "} &= " + fmtD(va) + " \\\\ " + b + "^{" + a + "} &= " + fmtD(vb) + " \\end{aligned} \\] En comparant les valeurs, la plus grande puissance est <b>" + greater + "</b>.",
      { mode: "which-greater", a: a, b: b });
  }
  if (mode === "difference") {
    var diff = Math.abs(va - vb);
    var ds = u3Pick3(diff, [
      { v: diff + a, fb: "C'est un peu trop grand. Soustrais les deux valeurs avec soin." },
      { v: Math.abs(diff - b), fb: "C'est un peu trop petit. Soustrais les deux valeurs avec soin." },
      { v: va + vb, fb: "Cela additionne les valeurs. La question demande la différence." },
      { v: diff + 10, fb: "C'est trop grand. Trouve chaque valeur, puis soustrais." },
      { v: Math.abs(a - b), fb: "Cela soustrait les petits nombres, pas les deux valeurs des puissances." }
    ]);
    return mcq("Quelle est la différence entre \\(" + a + "^{" + b + "}\\) et \\(" + b + "^{" + a + "}\\) ?",
      { t: fmtD(diff), fb: "Exact. Tu as trouvé les deux valeurs et tu les as soustraites." }, ds,
      "Trouve d'abord chaque valeur : \\[ \\begin{aligned} " + a + "^{" + b + "} &= " + fmtD(va) + " \\\\ " + b + "^{" + a + "} &= " + fmtD(vb) + " \\end{aligned} \\] La différence est \\(" + fmtD(Math.max(va, vb)) + "-" + fmtD(Math.min(va, vb)) + "=" + fmtD(diff) + "\\). Donc la différence est <b>" + fmtD(diff) + "</b>.",
      { mode: "difference-interchanged", a: a, b: b });
  }
  var isA = (mode === "evalA");
  var base = isA ? a : b, exp = isA ? b : a, val = isA ? va : vb;
  var ds2 = u3Pick3(val, [
    { v: base * exp, fb: "Cela multiplie la base et l'exposant. Utilise la multiplication répétée." },
    { v: isA ? vb : va, fb: "C'est la valeur avec la base et l'exposant échangés." },
    { v: val + base, fb: "C'est un peu trop grand. Développe la puissance au complet." },
    { v: Math.abs(val - base), fb: "C'est un peu trop petit. Développe la puissance au complet." },
    { v: base + exp, fb: "Cela additionne la base et l'exposant. Utilise la multiplication répétée." }
  ]);
  return mcq("Quelle est la valeur de \\(" + base + "^{" + exp + "}\\) ?",
    { t: fmtD(val), fb: "Exact. La base se répète autant de fois que l'exposant l'indique." }, ds2,
    "La base \\(" + base + "\\) se répète \\(" + exp + "\\) fois : \\[ \\begin{aligned} " + base + "^{" + exp + "} &= " + fmtD(val) + " \\end{aligned} \\] Donc la valeur est <b>" + fmtD(val) + "</b>.",
    { mode: "evaluate-interchanged", base: base, exp: exp });
}, ["Développe les deux puissances en multiplication répétée avant de comparer ou de soustraire.", "Écris la première puissance au complet, en multipliant la base par elle-même."]);

E("u3-parentheses-sign", 3, ["3.8"], 1, "gen", function () {
  var b = ri(2, 9), e = ri(2, 4);
  if (b >= 8 && e === 4) e = 3;
  var form = pick(["bracket", "outside", "inside"]);
  var val, shown;
  if (form === "bracket") { val = Math.pow(-b, e); shown = "(-" + b + ")^{" + e + "}"; }
  else if (form === "outside") { val = -Math.pow(b, e); shown = "-" + b + "^{" + e + "}"; }
  else { val = -Math.pow(b, e); shown = "(-" + b + "^{" + e + "})"; }
  var ds = u3Pick3(val, [
    { v: -val, fb: "Cela a le signe opposé. Vérifie ce que les parenthèses couvrent." },
    { v: Math.pow(b, e), fb: "Cela ignore le signe négatif dans l'expression." },
    { v: -Math.pow(b, e), fb: "Cela met le signe négatif à l'extérieur de la puissance." },
    { v: b * e, fb: "Cela multiplie la base et l'exposant. Utilise la multiplication répétée." },
    { v: val + b, fb: "C'est proche, mais le signe ou la valeur est faux. Développe avec soin." },
    { v: val - b, fb: "C'est proche, mais le signe ou la valeur est faux. Développe avec soin." }
  ]);
  var explain = form === "bracket" ? "Les parenthèses font de \\((-" + b + ")\\) la base, donc la valeur négative est multipliée chaque fois." : "La puissance s'applique d'abord à \\(" + b + "\\), et le signe négatif reste à l'extérieur.";
  return mcq("Calcule \\(" + shown + "\\).",
    { t: fmtD(val), fb: "Exact. Tu as bien tenu compte des parenthèses et du signe." }, ds,
    explain + " \\[ \\begin{aligned} " + shown + " &= " + fmtD(val) + " \\end{aligned} \\] Donc la valeur est <b>" + fmtD(val) + "</b>.",
    { mode: "parentheses-" + form, b: b, e: e });
}, ["Regarde ce que les parenthèses couvrent. Cela te dit quelle est la base.", "Calcule d'abord la partie avec la puissance, puis applique le signe donné par les parenthèses."]);

E("u3-zero-exponent", 3, ["3.9"], 1, "gen", function () {
  var mode = pick(["direct", "direct", "pattern"]);
  if (mode === "pattern") {
    var a = ri(2, 9);
    var ds = u3Pick3(1, [
      { v: 0, fb: "Cela traite l'exposant zéro comme s'il donnait zéro. Suis la régularité vers le bas." },
      { v: a, fb: "C'est la valeur de la puissance d'exposant 1, pas celle d'exposant 0." },
      { v: a * a, fb: "C'est la valeur de la puissance d'exposant 2, pas celle d'exposant 0." }
    ]);
    return mcq("Une régularité montre \\(" + a + "^{3}=" + fmtD(Math.pow(a, 3)) + "\\), \\(" + a + "^{2}=" + fmtD(Math.pow(a, 2)) + "\\) et \\(" + a + "^{1}=" + fmtD(a) + "\\). Chaque étape divise par \\(" + a + "\\). Que vaut \\(" + a + "^{0}\\) ?",
      { t: "1", fb: "Exact. Diviser une fois de plus par la base donne un." }, ds,
      "Chaque étape vers le bas divise par \\(" + a + "\\) : \\[ \\begin{aligned} " + a + "^{1}\\div " + a + " &= " + fmtD(a) + "\\div " + a + " \\\\ &= 1 \\end{aligned} \\] Donc la valeur est <b>1</b>.",
      { mode: "zero-pattern", a: a });
  }
  var aList = [];
  for (var ai = -20; ai <= 20; ai++) { if (ai !== 0 && ai !== 1 && ai !== -1) aList.push(ai); }
  aList = aList.concat([2.5, 3.5, 4.5, 5.5, -2.5, -3.5, -4.5, -5.5, 0.5, -0.5, 1.5, -1.5]);
  var a2 = pick(aList);
  var shownA = a2 < 0 ? "(" + fmtD(a2) + ")^{0}" : fmtD(a2) + "^{0}";
  var ds2 = u3Pick3(1, [
    { v: 0, fb: "Cela traite l'exposant zéro comme s'il donnait zéro." },
    { v: a2, fb: "Cela garde la base comme réponse. Un exposant zéro donne un." },
    { v: -1, fb: "Cela a le mauvais signe. Un exposant zéro donne un positif." }
  ]);
  if (Math.abs(a2 - Math.round(a2)) > 1e-9) { for (var zi = 0; zi < ds2.length; zi++) { if (ds2[zi].t === "0") { ds2[zi].t = "0,0"; break; } } }
  return mcq("Calcule \\(" + shownA + "\\).",
    { t: "1", fb: "Exact. Toute base non nulle à la puissance zéro égale un." }, ds2,
    "Une puissance d'exposant \\(0\\) avec une base non nulle égale \\(1\\) : \\[ \\begin{aligned} " + shownA + " &= 1 \\end{aligned} \\] Donc la valeur est <b>1</b>.",
    { mode: "zero-direct", a: a2 });
}, ["Pense à la régularité quand l'exposant diminue de un chaque fois.", "Divise la valeur de la puissance d'exposant 1 par la base pour arriver à la puissance d'exposant 0."]);

E("u3-product-law", 3, ["3.11"], 1, "gen", function () {
  var a = ri(2, 9), m = ri(2, 6), n = ri(1, 6);
  if (m === 2 && n === 2) n = 3;
  var ds = u3PowDist(a, m + n, [
    { v: m * n, fb: "Cela multiplie les exposants. La loi du produit les additionne." },
    { v: m + n + 1, fb: "Cela ajoute un de trop. Additionne seulement les deux exposants." },
    { v: m + n - 1, fb: "C'est un de trop petit. Additionne les deux exposants." },
    { v: Math.abs(m - n), fb: "Cela soustrait les exposants. La loi du produit les additionne." },
    { v: m * n + 1, fb: "Cela multiplie et ajoute un. Additionne les exposants à la place." }
  ]);
  return mcq("Écris \\(" + a + "^{" + m + "}\\times " + a + "^{" + n + "}\\) comme une seule puissance.",
    { t: "\\(" + a + "^{" + (m + n) + "}\\)", fb: "Exact. Même base, donc on additionne les exposants." }, ds,
    "Les bases sont les mêmes, donc additionne les exposants : \\[ \\begin{aligned} " + a + "^{" + m + "}\\times " + a + "^{" + n + "} &= " + a + "^{" + m + "+" + n + "} \\\\ &= " + a + "^{" + (m + n) + "} \\end{aligned} \\] Donc la puissance unique est <b>\\(" + a + "^{" + (m + n) + "}\\)</b>.",
    { mode: "product-law", a: a, m: m, n: n });
}, ["Vérifie si les bases sont les mêmes. Des bases identiques utilisent la loi du produit.", "Additionne les deux exposants et garde la même base."]);

E("u3-quotient-law", 3, ["3.11"], 1, "gen", function () {
  var a = ri(2, 9), n = ri(1, 4), m = n + ri(2, 5);
  var ds = u3PowDist(a, m - n, [
    { v: m + n, fb: "Cela additionne les exposants. La loi du quotient les soustrait." },
    { v: m * n, fb: "Cela multiplie les exposants. La loi du quotient les soustrait." },
    { v: m - n + 1, fb: "C'est un de trop grand. Soustrais seulement les exposants." },
    { v: m - n - 1, fb: "C'est un de trop petit, ou cela utilise le mauvais ordre." },
    { v: m, fb: "Cela garde l'exposant du haut. Soustrais l'exposant du bas." }
  ]);
  return mcq("Écris \\(" + a + "^{" + m + "}\\div " + a + "^{" + n + "}\\) comme une seule puissance.",
    { t: "\\(" + a + "^{" + (m - n) + "}\\)", fb: "Exact. Même base, donc on soustrait les exposants." }, ds,
    "Les bases sont les mêmes, donc soustrais les exposants : \\[ \\begin{aligned} " + a + "^{" + m + "}\\div " + a + "^{" + n + "} &= " + a + "^{" + m + "-" + n + "} \\\\ &= " + a + "^{" + (m - n) + "} \\end{aligned} \\] Donc la puissance unique est <b>\\(" + a + "^{" + (m - n) + "}\\)</b>.",
    { mode: "quotient-law", a: a, m: m, n: n });
}, ["Vérifie si les bases sont les mêmes. Des bases identiques utilisent la loi du quotient.", "Soustrais l'exposant du bas de l'exposant du haut."]);

E("u3-power-of-power-law", 3, ["3.11"], 1, "gen", function () {
  var a = ri(2, 9), m = ri(2, 5), n = ri(2, 4);
  var ds = u3PowDist(a, m * n, [
    { v: m + n, fb: "Cela additionne les exposants. Une puissance d'une puissance les multiplie." },
    { v: m * n + 1, fb: "C'est un de trop grand. Multiplie seulement les deux exposants." },
    { v: m * n - 1, fb: "C'est un de trop petit. Multiplie les deux exposants." },
    { v: Math.abs(m - n), fb: "Cela soustrait les exposants. Multiplie-les à la place." },
    { v: m, fb: "Cela garde seulement l'exposant intérieur. Utilise les deux exposants." }
  ]);
  return mcq("Écris \\((" + a + "^{" + m + "})^{" + n + "}\\) comme une seule puissance.",
    { t: "\\(" + a + "^{" + (m * n) + "}\\)", fb: "Exact. Une puissance d'une puissance multiplie les exposants." }, ds,
    "Pour une puissance d'une puissance, multiplie les exposants : \\[ \\begin{aligned} (" + a + "^{" + m + "})^{" + n + "} &= " + a + "^{" + m + "\\times " + n + "} \\\\ &= " + a + "^{" + (m * n) + "} \\end{aligned} \\] Donc la puissance unique est <b>\\(" + a + "^{" + (m * n) + "}\\)</b>.",
    { mode: "power-of-power-law", a: a, m: m, n: n });
}, ["Une puissance élevée à une autre puissance utilise la loi de la puissance d'une puissance.", "Multiplie l'exposant intérieur par l'exposant extérieur."]);

E("u3-two-laws-evaluate", 3, ["3.12"], 1, "gen", function () {
  var mode = pick(["prod", "quot", "powpow"]);
  var a, expr, val, steps;
  if (mode === "prod") {
    a = ri(2, 6); var m = ri(2, 3), n = ri(2, 3);
    val = Math.pow(a, m + n);
    expr = a + "^{" + m + "}\\times " + a + "^{" + n + "}";
    steps = a + "^{" + m + "}\\times " + a + "^{" + n + "} &= " + a + "^{" + (m + n) + "} \\\\ &= " + fmtD(val);
  } else if (mode === "quot") {
    a = ri(2, 7); var n2 = ri(1, 2), m2 = n2 + ri(3, 4);
    val = Math.pow(a, m2 - n2);
    expr = a + "^{" + m2 + "}\\div " + a + "^{" + n2 + "}";
    steps = a + "^{" + m2 + "}\\div " + a + "^{" + n2 + "} &= " + a + "^{" + (m2 - n2) + "} \\\\ &= " + fmtD(val);
  } else {
    a = ri(2, 5); var m3 = ri(2, 3), n3 = 2;
    val = Math.pow(a, m3 * n3);
    expr = "(" + a + "^{" + m3 + "})^{" + n3 + "}";
    steps = "(" + a + "^{" + m3 + "})^{" + n3 + "} &= " + a + "^{" + (m3 * n3) + "} \\\\ &= " + fmtD(val);
  }
  return numq("Calcule \\(" + expr + "\\) en l'écrivant d'abord comme une seule puissance.", val, 0,
    "Applique d'abord la loi des exposants, puis calcule : \\[ \\begin{aligned} " + steps + " \\end{aligned} \\] Donc la valeur est <b>" + fmtD(val) + "</b>.",
    { mode: "two-laws-" + mode, a: a });
}, ["Utilise une loi des exposants pour écrire d'abord l'expression comme une seule puissance.", "Combine les exposants avec la loi qui correspond, puis calcule cette puissance."]);

E("u3-power-of-product-quotient", 3, ["3.12"], 1, "gen", function () {
  var mode = pick(["prod", "prod", "quotInt", "quotDec"]);
  if (mode === "prod") {
    var a = ri(2, 6), b = ri(2, 6), n = ri(2, 3);
    var val = Math.pow(a * b, n);
    return numq("Calcule \\((" + a + "\\times " + b + ")^{" + n + "}\\).", val, 0,
      "Calcule d'abord la valeur entre parenthèses, puis applique la puissance : \\[ \\begin{aligned} (" + a + "\\times " + b + ")^{" + n + "} &= " + fmtD(a * b) + "^{" + n + "} \\\\ &= " + fmtD(val) + " \\end{aligned} \\] Donc la valeur est <b>" + fmtD(val) + "</b>.",
      { mode: "power-of-product", a: a, b: b, n: n });
  }
  if (mode === "quotInt") {
    var pairs = [[6, 2], [6, 3], [8, 2], [8, 4], [9, 3], [10, 2], [10, 5], [12, 3], [12, 4], [15, 3], [15, 5], [20, 4]];
    var pr = pick(pairs), q = pr[0] / pr[1], n2 = ri(2, 3);
    var val2 = Math.pow(q, n2);
    return numq("Calcule \\((" + pr[0] + "\\div " + pr[1] + ")^{" + n2 + "}\\).", val2, 0,
      "Calcule d'abord la valeur entre parenthèses, puis applique la puissance : \\[ \\begin{aligned} (" + pr[0] + "\\div " + pr[1] + ")^{" + n2 + "} &= " + fmtD(q) + "^{" + n2 + "} \\\\ &= " + fmtD(val2) + " \\end{aligned} \\] Donc la valeur est <b>" + fmtD(val2) + "</b>.",
      { mode: "power-of-quotient-int", a: pr[0], b: pr[1], n: n2 });
  }
  var dpairs = [[3, 2], [5, 2], [7, 2], [9, 2], [5, 4], [3, 4], [7, 4], [9, 4], [6, 4], [10, 4]];
  var dp = pick(dpairs), dv = dp[0] / dp[1], dval = dv * dv;
  return numq("Calcule \\((" + dp[0] + "\\div " + dp[1] + ")^{2}\\). Donne ta réponse comme nombre décimal.", dval, 0.01,
    "Calcule d'abord la valeur entre parenthèses, puis mets-la au carré : \\[ \\begin{aligned} (" + dp[0] + "\\div " + dp[1] + ")^{2} &= " + fmtD(dv) + "^{2} \\\\ &= " + fmtD(dval) + " \\end{aligned} \\] Donc la valeur est <b>" + fmtD(dval) + "</b>.",
    { mode: "power-of-quotient-dec", a: dp[0], b: dp[1], n: 2 });
}, ["Commence par la valeur entre parenthèses.", "Calcule entre les parenthèses, puis applique la puissance extérieure à cette valeur."]);

E("u3-sum-of-powers", 3, ["3.13"], 1, "gen", function () {
  var mode = pick(["same", "diff"]);
  var expr, val, steps;
  if (mode === "same") {
    var a = ri(2, 7), m = ri(3, 4), n = ri(2, 3);
    var v1 = Math.pow(a, m), v2 = Math.pow(a, n);
    val = v1 + v2; expr = a + "^{" + m + "}+" + a + "^{" + n + "}";
    steps = a + "^{" + m + "}+" + a + "^{" + n + "} &= " + fmtD(v1) + "+" + fmtD(v2) + " \\\\ &= " + fmtD(val);
  } else {
    var a2 = ri(2, 7), b2 = ri(2, 7), m2 = ri(2, 3), n2 = ri(2, 3);
    var w1 = Math.pow(a2, m2), w2 = Math.pow(b2, n2);
    val = w1 + w2; expr = a2 + "^{" + m2 + "}+" + b2 + "^{" + n2 + "}";
    steps = a2 + "^{" + m2 + "}+" + b2 + "^{" + n2 + "} &= " + fmtD(w1) + "+" + fmtD(w2) + " \\\\ &= " + fmtD(val);
  }
  return numq("Détermine la somme \\(" + expr + "\\). Montre la valeur de chaque puissance dans ton travail.", val, 0,
    "Calcule d'abord chaque puissance séparément, puis additionne : \\[ \\begin{aligned} " + steps + " \\end{aligned} \\] Donc la somme est <b>" + fmtD(val) + "</b>.",
    { mode: "sum-" + mode });
}, ["Calcule chaque puissance séparément avant d'additionner.", "Trouve la valeur de la première puissance, puis celle de la deuxième, puis additionne-les."]);

E("u3-difference-of-powers", 3, ["3.14"], 1, "gen", function () {
  var mode = pick(["same", "diff"]);
  var expr, val, steps;
  if (mode === "same") {
    var a = ri(2, 7), m = ri(3, 4), n = ri(2, 3);
    if (m === n) m = n + 1;
    var v1 = Math.pow(a, m), v2 = Math.pow(a, n);
    val = v1 - v2; expr = a + "^{" + m + "}-" + a + "^{" + n + "}";
    steps = a + "^{" + m + "}-" + a + "^{" + n + "} &= " + fmtD(v1) + "-" + fmtD(v2) + " \\\\ &= " + fmtD(val);
  } else {
    var a2 = ri(3, 8), b2 = ri(2, 6), m2 = ri(2, 3), n2 = ri(2, 3);
    var w1 = Math.pow(a2, m2), w2 = Math.pow(b2, n2);
    if (w1 <= w2) { var tmp = w1; w1 = w2; w2 = tmp; expr = b2 + "^{" + n2 + "}-" + a2 + "^{" + m2 + "}"; steps = b2 + "^{" + n2 + "}-" + a2 + "^{" + m2 + "} &= " + fmtD(w1) + "-" + fmtD(w2) + " \\\\ &= " + fmtD(w1 - w2); val = w1 - w2; }
    else { expr = a2 + "^{" + m2 + "}-" + b2 + "^{" + n2 + "}"; steps = a2 + "^{" + m2 + "}-" + b2 + "^{" + n2 + "} &= " + fmtD(w1) + "-" + fmtD(w2) + " \\\\ &= " + fmtD(w1 - w2); val = w1 - w2; }
  }
  return numq("Détermine la différence \\(" + expr + "\\). Montre la valeur de chaque puissance dans ton travail.", val, 0,
    "Calcule d'abord chaque puissance séparément, puis soustrais : \\[ \\begin{aligned} " + steps + " \\end{aligned} \\] Donc la différence est <b>" + fmtD(val) + "</b>.",
    { mode: "difference-" + mode });
}, ["Calcule chaque puissance séparément avant de soustraire.", "Trouve la valeur de la première puissance, puis celle de la deuxième, puis soustrais."]);

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
  var s4 = a + "^{" + e3 + "} = " + fmtD(shownFinal);
  var prompt = "Un élève simplifie \\(((" + a + "^{" + m + "})^{" + n + "}\\times " + a + "^{" + p + "})\\div " + a + "^{" + q + "}\\) en quatre étapes.<br>Étape 1 : \\(" + s1 + "\\)<br>Étape 2 : \\(" + s2 + "\\)<br>Étape 3 : \\(" + s3 + "\\)<br>Étape 4 : \\(" + s4 + "\\)<br>À quelle étape la première erreur se produit-elle ?";
  var fb = {
    1: "L'étape 1 utilise la loi de la puissance d'une puissance, qui multiplie les exposants.",
    2: "L'étape 2 utilise la loi du produit, qui additionne les exposants.",
    3: "L'étape 3 utilise la loi du quotient, qui soustrait les exposants.",
    4: "L'étape 4 calcule la puissance finale."
  };
  function mkOpt(k) { return { t: "Étape " + k, fb: (k === err) ? "Exact. " + fb[k] : "Cette étape suit correctement l'étape précédente. " + fb[k] }; }
  var correctExp = (function () {
    var ce1 = m * n, ce2 = ce1 + p, ce3 = ce2 - q;
    return { e1: ce1, e2: ce2, e3: ce3, v: Math.pow(a, ce3) };
  })();
  return mcq(prompt, mkOpt(err), [1, 2, 3, 4].filter(function (k) { return k !== err; }).map(mkOpt),
    "Vérifie chaque loi dans l'ordre. La chaîne correcte est \\[ \\begin{aligned} ((" + a + "^{" + m + "})^{" + n + "}\\times " + a + "^{" + p + "})\\div " + a + "^{" + q + "} &= " + a + "^{" + correctExp.e1 + "}\\times " + a + "^{" + p + "}\\div " + a + "^{" + q + "} \\\\ &= " + a + "^{" + correctExp.e3 + "} \\\\ &= " + fmtD(correctExp.v) + " \\end{aligned} \\] La première erreur est à l'<b>étape " + err + "</b>.",
    { mode: "find-error", a: a, m: m, n: n, p: p, err: err });
}, ["Vérifie les étapes dans l'ordre, une loi à la fois.", "Commence par l'étape 1 et demande-toi si la loi de la puissance d'une puissance a été utilisée correctement."]);

E("u3-three-laws-evaluate", 3, ["3.12"], 3, "gen", function () {
  var mode = pick(["chain", "negbase"]);
  if (mode === "negbase") {
    var b = ri(2, 6), e = pick([2, 3, 4]), f = ri(1, 2);
    var v1 = Math.pow(-b, e), v2 = Math.pow(b, f), val = v1 * v2;
    if (Math.abs(val) > 90000) { f = 1; v2 = b; val = v1 * v2; }
    return numq("Calcule \\((-" + b + ")^{" + e + "}\\times " + b + "^{" + f + "}\\).", val, 0,
      "Calcule d'abord chaque puissance, en surveillant les parenthèses pour le signe : \\[ \\begin{aligned} (-" + b + ")^{" + e + "}\\times " + b + "^{" + f + "} &= " + fmtD(v1) + "\\times " + fmtD(v2) + " \\\\ &= " + fmtD(val) + " \\end{aligned} \\] Donc la valeur est <b>" + fmtD(val) + "</b>.",
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
  return numq("Calcule \\(((" + a2 + "^{" + m2 + "})^{" + n2 + "}\\times " + a2 + "^{" + p2 + "})\\div " + a2 + "\\).", val2, 0,
    "Applique les lois une à la fois : \\[ \\begin{aligned} ((" + a2 + "^{" + m2 + "})^{" + n2 + "}\\times " + a2 + "^{" + p2 + "})\\div " + a2 + " &= " + a2 + "^{" + tot2 + "} \\\\ &= " + fmtD(val2) + " \\end{aligned} \\] Donc la valeur est <b>" + fmtD(val2) + "</b>.",
    { mode: "three-laws-chain", a: a2, m: m2, n: n2, p: p2 });
}, ["Travaille avec les lois dans un ordre logique, une loi à la fois.", "Commence par la puissance d'une puissance entre parenthèses."]);

E("u3-law-then-sum-difference", 3, ["3.13", "3.14"], 3, "gen", function () {
  var a = ri(2, 6), mn = pick([[2, 2], [2, 3], [3, 2]]), m = mn[0], n = mn[1], p = ri(2, 5);
  var first = Math.pow(a, m * n), second = Math.pow(a, p);
  var isSum = pick([true, false]);
  var word = isSum ? "sum" : "difference";
  var wordFr = isSum ? "somme" : "différence";
  var expr, val, stepLine;
  if (isSum) {
    val = first + second;
    expr = "(" + a + "^{" + m + "})^{" + n + "}+" + a + "^{" + p + "}";
    stepLine = expr + " &= " + fmtD(first) + "+" + fmtD(second) + " \\\\ &= " + fmtD(val);
  } else if (first >= second) {
    val = first - second;
    expr = "(" + a + "^{" + m + "})^{" + n + "}-" + a + "^{" + p + "}";
    stepLine = expr + " &= " + fmtD(first) + "-" + fmtD(second) + " \\\\ &= " + fmtD(val);
  } else {
    val = second - first;
    expr = a + "^{" + p + "}-(" + a + "^{" + m + "})^{" + n + "}";
    stepLine = expr + " &= " + fmtD(second) + "-" + fmtD(first) + " \\\\ &= " + fmtD(val);
  }
  return numq("Détermine la " + wordFr + " \\(" + expr + "\\). Simplifie d'abord la puissance d'une puissance.", val, 0,
    "Simplifie la puissance d'une puissance, calcule chaque partie, puis combine : \\[ \\begin{aligned} " + stepLine + " \\end{aligned} \\] Donc la " + wordFr + " est <b>" + fmtD(val) + "</b>.",
    { mode: "law-then-" + word, a: a, m: m, n: n, p: p });
}, ["Simplifie toute puissance qui demande une loi avant de combiner les valeurs.", "Commence par la puissance d'une puissance, puis calcule chaque partie."]);

E("u3-explanations-var", 3, ["3.5", "3.8"], 3, "var", varset([
  function () {
    return mcq("Quelle explication montre pourquoi \\(2^{3}\\) et \\(3^{2}\\) ont des valeurs différentes ?",
      { t: "\\(2^{3}=2\\times 2\\times 2=8\\) alors que \\(3^{2}=3\\times 3=9\\)", fb: "Exact. La multiplication répétée est différente dans chaque puissance." },
      [
        { t: "\\(2^{3}=2\\times 3=6\\) alors que \\(3^{2}=3\\times 2=6\\)", fb: "Cela multiplie la base par l'exposant dans chaque puissance." },
        { t: "\\(2^{3}=3\\times 3=9\\) alors que \\(3^{2}=2\\times 2=4\\)", fb: "Cela répète l'exposant au lieu de la base." },
        { t: "\\(2^{3}\\) et \\(3^{2}\\) valent toutes les deux 8", fb: "Cela garde une valeur et ignore la deuxième puissance." }
      ],
      "Écris chaque puissance comme multiplication répétée : \\[ \\begin{aligned} 2^{3} &= 2\\times 2\\times 2 = 8 \\\\ 3^{2} &= 3\\times 3 = 9 \\end{aligned} \\] Donc la bonne explication est <b>\\(2^{3}=2\\times 2\\times 2=8\\) alors que \\(3^{2}=3\\times 3=9\\)</b>.",
      { mode: "explain-interchanged" });
  },
  function () {
    return mcq("Quel énoncé explique la différence entre \\((-3)^{2}\\) et \\(-3^{2}\\) ?",
      { t: "Dans \\((-3)^{2}\\), la base est \\(-3\\), ce qui donne 9 ; dans \\(-3^{2}\\), seul 3 est mis au carré, ce qui donne -9", fb: "Exact. Les parenthèses changent la base." },
      [
        { t: "Les deux valent 9 parce que mettre au carré rend toujours une valeur positive dans tous les cas et pour toutes les bases", fb: "Cela oublie le signe négatif placé à l'extérieur de la deuxième puissance." },
        { t: "Les deux valent -9 parce que le signe négatif reste toujours avec la réponse dans les deux puissances", fb: "Cela oublie les parenthèses qui font de -3 la base dans la première puissance." },
        { t: "Dans \\((-3)^{2}\\), la réponse est -9 et dans \\(-3^{2}\\), la réponse est 9", fb: "Cela inverse les deux résultats. Vérifie chaque base avec soin." }
      ],
      "Dans la première puissance, les parenthèses font de \\(-3\\) la base : \\[ \\begin{aligned} (-3)^{2} &= (-3)\\times (-3) = 9 \\\\ -3^{2} &= -(3\\times 3) = -9 \\end{aligned} \\] Donc le bon énoncé est <b>Dans \\((-3)^{2}\\), la base est \\(-3\\), ce qui donne 9 ; dans \\(-3^{2}\\), seul 3 est mis au carré, ce qui donne -9</b>.",
      { mode: "explain-parentheses" });
  },
  function () {
    return mcq("Les valeurs \\(5^{3}=125\\), \\(5^{2}=25\\) et \\(5^{1}=5\\) suivent une régularité. Quel argument donne correctement \\(5^{0}\\) ?",
      { t: "Chaque étape divise par 5, donc la valeur suivante est \\(5\\div 5=1\\)", fb: "Exact. Continuer la régularité de division donne un." },
      [
        { t: "Chaque étape soustrait 5, donc la valeur suivante est \\(5-5=0\\)", fb: "Cela utilise la soustraction. La régularité divise par la base chaque fois." },
        { t: "Un exposant zéro veut dire zéro facteur, donc la valeur doit être 0", fb: "Cela donne zéro, mais la régularité de division mène à un." },
        { t: "L'exposant est zéro, donc la valeur reste à la base, qui est 5", fb: "Cela garde la base. Continue la régularité d'une étape de plus." }
      ],
      "Suis la régularité vers le bas : \\[ \\begin{aligned} 5^{3} &= 125 \\\\ 5^{2} &= 125\\div 5 = 25 \\\\ 5^{1} &= 25\\div 5 = 5 \\\\ 5^{0} &= 5\\div 5 = 1 \\end{aligned} \\] Donc le bon argument est <b>Chaque étape divise par 5, donc la valeur suivante est \\(5\\div 5=1\\)</b>.",
      { mode: "explain-zero-pattern" });
  }
]), ["Lis chaque explication au complet et vérifie sa multiplication répétée ou sa régularité.", "Teste la première explication avec les vraies valeurs des puissances."]);
/* TRANSLATOR NOTES
 * Judgement calls (glossary silent): algebra tile = tuile algébrique; large square tile = grande tuile carrée; long thin tile = tuile longue et mince; small square tile = petite tuile carrée; unit tile = tuile d'unité; x squared in prose = x carré; Step = Étape.
 * The u4tiles helper was restructured to French word order (count, then tuile or tuiles, then kind, then the agreeing adjective); counts, signs and logic are unchanged.
 * FMT-GEOM lines: none. This chunk has no SVG attribute or coordinate formatting calls; every display formatting call was converted to fmtD.
 * Literal formatted numbers in static prose: no literal decimals, no thousands, no percent, no money in this chunk. Only tile counts written as digits in the two fallback prompts: u4-tiles-to-expr (2, 3, 1) and u4-tiles-addsub (3, 2, 1, 1). The u4-equiv-var tile prompt also writes tile counts as digits (2, 3, 5). All other literal numbers sit inside KaTeX expressions and are unchanged.
 * KaTeX text labels inside solutions were translated (tiles, missing, other side).
 * Unsure: tuile d'unité and tuile algébrique are provisional, pending the curriculum guides.
 */

/* ----- bank-u4.js ----- */
// Math 9 (French) Unit 4 Polynomials question bank
// Cut verbatim from the standalone bank source
// (math-9-review-fr/bank-src.js, lines 1215 to 1616).
// CRMARKS: u4-add=3
// CRMARKS: u4-subtract=3
// CRMARKS: u4-multiply-monomial=3
// CRMARKS: u4-divide-monomial=2
// CRMARKS: u4-mult-div-mixed=2
// CRMARKS: u4-missing=3
// CRMARKS: u4-area-monomial=2
/* Unit 4: Polynomials */
function u4expr(terms){var s="",first=true;for(var i=0;i<terms.length;i++){var cf=terms[i][0],v=terms[i][1];if(cf===0)continue;var mag;if(v===""){mag=fmtD(Math.abs(cf));}else if(Math.abs(cf)===1){mag=v;}else{mag=fmtD(Math.abs(cf))+v;}if(first){s+=(cf<0?"-":"")+mag;first=false;}else{s+=(cf<0?"-":"+")+mag;}}return s===""?"0":s;}
function u4p(a,b,c){return u4expr([[a,"x^{2}"],[b,"x"],[c,""]]);}
function u4m(a,b,c){return "\\("+u4p(a,b,c)+"\\)";}
function u4pxy(x,y,k){return u4expr([[x,"x"],[y,"y"],[k,""]]);}
function u4mxy(x,y,k){return "\\("+u4pxy(x,y,k)+"\\)";}
function u4nz(a,b){var v=ri(a,b),g=0;while(v===0&&g<60){v=ri(a,b);g++;}return v===0?2:v;}
function u4ok(c,ds){var all=[c];for(var i=0;i<ds.length;i++){if(all.indexOf(ds[i].t)>=0)return false;all.push(ds[i].t);}return true;}
function u4tiles(a,b,c){var parts=[];function tw(n,w){return fmtD(Math.abs(n))+" "+w;}if(a!==0)parts.push(tw(a,Math.abs(a)===1?(a>0?"tuile positive de x carré":"tuile négative de x carré"):(a>0?"tuiles positives de x carré":"tuiles négatives de x carré")));if(b!==0)parts.push(tw(b,Math.abs(b)===1?(b>0?"tuile positive de x":"tuile négative de x"):(b>0?"tuiles positives de x":"tuiles négatives de x")));if(c!==0)parts.push(tw(c,Math.abs(c)===1?(c>0?"tuile positive d'unité":"tuile négative d'unité"):(c>0?"tuiles positives d'unité":"tuiles négatives d'unité")));return parts.length?parts.join(", "):"aucune tuile";}
function u4pick3(c,cands){var out=[],seen=[c];for(var i=0;i<cands.length&&out.length<3;i++){if(seen.indexOf(cands[i].t)<0){seen.push(cands[i].t);out.push(cands[i]);}}return out;}

E("u4-degree", 4, ["8.14"], 1, "gen", function(){
  var form=ri(0,2),a=0,b=0,c=0,deg=0;
  if(form===0){a=u4nz(-6,6);b=ri(-6,6);c=ri(-6,6);deg=2;}
  else if(form===1){b=u4nz(-8,8);c=ri(-8,8);deg=1;}
  else{c=u4nz(-9,9);deg=0;}
  var terms=(a!==0?1:0)+(b!==0?1:0)+(c!==0?1:0);
  var lead=a!==0?a:(b!==0?b:c);
  var cands=[{t:fmtD(deg+1),fb:"C'est un de plus que la plus grande puissance de x."},{t:fmtD(terms),fb:"Cela compte les termes, pas la plus grande puissance."},{t:fmtD(Math.abs(lead)),fb:"C'est un coefficient, pas la plus grande puissance."},{t:fmtD(deg+2),fb:"C'est plus grand que toutes les puissances de l'expression."},{t:fmtD(deg+3),fb:"C'est plus grand que toutes les puissances de l'expression."}];
  var ds=u4pick3(fmtD(deg),cands);
  var sol="Le degré est la plus grande puissance de \\(x\\) in "+u4m(a,b,c)+". La plus grande puissance ici donne le degré <b>"+fmtD(deg)+"</b>.";
  return mcq("Quel est le degré de "+u4m(a,b,c)+"?",{t:fmtD(deg),fb:"Exact : le degré est la plus grande puissance de x."},ds,sol,{mode:"degree",form:form,a:a,b:b,c:c});
}, ["Cherche la plus grande puissance de x dans l'expression.", "Trouve le terme avec le plus grand exposant ; cet exposant est le degré."]);

E("u4-parts", 4, ["8.14"], 1, "gen", function(){
  var a=u4nz(-8,8),b=u4nz(-9,9),c=u4nz(-9,9);
  var mode=pick(["terms","coeffx","coeffx2","const"]);
  var qtext="",ans=0;
  if(mode==="terms"){qtext="Combien de termes compte "+u4m(a,b,c)+" ?";ans=3;}
  else if(mode==="coeffx"){qtext="Quel est le coefficient du terme en \\(x\\) dans "+u4m(a,b,c)+"?";ans=b;}
  else if(mode==="coeffx2"){qtext="Quel est le coefficient du terme en \\(x^{2}\\) dans "+u4m(a,b,c)+"?";ans=a;}
  else{qtext="Quel est le terme constant dans "+u4m(a,b,c)+"?";ans=c;}
  var cands=[{t:fmtD(a),fb:"C'est le coefficient du terme en x carré."},{t:fmtD(b),fb:"C'est le coefficient du terme en x."},{t:fmtD(c),fb:"C'est le terme constant."},{t:fmtD(3),fb:"C'est le nombre de termes."},{t:fmtD(ans+1),fb:"C'est un de plus que la valeur demandée."},{t:fmtD(ans-1),fb:"C'est un de moins que la valeur demandée."},{t:fmtD(-ans),fb:"Attention au signe : cette valeur a le mauvais signe."},{t:fmtD(ans+2),fb:"C'est deux de plus que la valeur demandée."}];
  var ds=u4pick3(fmtD(ans),cands);
  var label=mode==="terms"?"nombre de termes":(mode==="coeffx"?"coefficient du terme en x":(mode==="coeffx2"?"coefficient du terme en x carré":"terme constant"));
  var sol="Dans "+u4m(a,b,c)+", le "+label+" est <b>"+fmtD(ans)+"</b>.";
  return mcq(qtext,{t:fmtD(ans),fb:"Exact : tu lis cette valeur directement dans l'expression."},ds,sol,{mode:mode,a:a,b:b,c:c});
}, ["Lis la valeur directement dans l'expression écrite ; aucun calcul de simplification n'est nécessaire.", "Repère la partie nommée dans la question, puis lis sa valeur."]);

E("u4-tiles-to-expr", 4, ["8.16"], 1, "gen", function(){
  for(var att=0;att<200;att++){
    var a=ri(-4,4),b=ri(-5,5),c=ri(-5,5);
    var nz=(a!==0?1:0)+(b!==0?1:0)+(c!==0?1:0);
    if(nz<2)continue;
    var corr=u4m(a,b,c);
    var ds=[{t:u4m(a,-b,c),fb:"Les tuiles de x ont le signe opposé dans le modèle."},{t:u4m(a,b,-c),fb:"Les tuiles d'unité ont le signe opposé dans le modèle."},{t:u4m(b,a,c),fb:"Cela échange le nombre de tuiles de x carré avec le nombre de tuiles de x."},{t:u4m(-a,b,c),fb:"Les tuiles de x carré ont le signe opposé dans le modèle."}];
    if(!u4ok(corr,ds))continue;
    ds=ds.slice(0,3);
    var sol="Compte chaque sorte de tuile avec son signe : \\[ \\begin{aligned} x^{2} \\text{ tuiles} &= "+fmtD(a)+" \\\\ x \\text{ tuiles} &= "+fmtD(b)+" \\\\ \\text{tuiles d'unité} &= "+fmtD(c)+" \\end{aligned} \\] Le modèle montre donc <b>"+corr+"</b>.";
    return mcq("Dans un modèle de tuiles algébriques, une grande tuile carrée représente \\(x^{2}\\), une tuile longue et mince représente \\(x\\) et une petite tuile carrée représente \\(1\\) ; les tuiles positives sont ombrées et les tuiles négatives ne le sont pas. Un modèle contient "+u4tiles(a,b,c)+". Quelle expression le modèle montre-t-il ?",{t:corr,fb:"Exact : chaque nombre de tuiles devient le terme correspondant."},ds,sol,{mode:"tiles2expr",a:a,b:b,c:c});
  }
  return mcq("Un modèle contient 2 tuiles positives de x carré, 3 tuiles positives de x, 1 tuile négative d'unité. Quelle expression le modèle montre-t-il ?",{t:u4m(2,3,-1),fb:"Exact : chaque nombre de tuiles devient le terme correspondant."},[{t:u4m(2,3,1),fb:"La tuile d'unité est négative dans le modèle."},{t:u4m(3,2,-1),fb:"Cela échange le nombre de tuiles de x carré avec le nombre de tuiles de x."},{t:u4m(2,-3,-1),fb:"Les tuiles de x sont positives dans le modèle."}],"Le comptage avec les signes donne <b>"+u4m(2,3,-1)+"</b>.",{mode:"tiles2expr",a:2,b:3,c:-1});
}, ["Transforme chaque nombre de tuiles en un terme, en gardant le signe des tuiles.", "Écris d'abord le nombre de tuiles de x carré, puis celui de x, puis celui d'unité."]);

E("u4-expr-to-tiles", 4, ["8.15"], 1, "gen", function(){
  for(var att=0;att<200;att++){
    var a=u4nz(-4,4),b=u4nz(-5,5),c=u4nz(-5,5);
    var corr=u4tiles(a,b,c);
    var ds=[{t:u4tiles(a,-b,c),fb:"Cela inverse le signe des tuiles de x."},{t:u4tiles(a,b,-c),fb:"Cela inverse le signe des tuiles d'unité."},{t:u4tiles(b,a,c),fb:"Cela échange le nombre de tuiles de x carré avec le nombre de tuiles de x."},{t:u4tiles(-a,b,c),fb:"Cela inverse le signe des tuiles de x carré."}];
    if(!u4ok(corr,ds))continue;
    ds=ds.slice(0,3);
    var sol="Chaque terme donne le nombre de tuiles : le \\(x^{2}\\) donne "+fmtD(a)+", the \\(x\\) donne "+fmtD(b)+" et la constante donne "+fmtD(c)+". Le modèle correspondant contient donc <b>"+corr+"</b>.";
    return mcq("Quelle description correspond à un modèle de tuiles algébriques de "+u4m(a,b,c)+" ? Dans le modèle, une grande tuile carrée représente \\(x^{2}\\), une tuile longue et mince représente \\(x\\) et une petite tuile carrée représente \\(1\\).",{t:corr,fb:"Exact : chaque terme devient des tuiles de la même sorte et du même signe."},ds,sol,{mode:"expr2tiles",a:a,b:b,c:c});
  }
  return mcq("Quelle description correspond à un modèle de tuiles algébriques de "+u4m(2,-3,4)+"?",{t:u4tiles(2,-3,4),fb:"Exact : chaque terme devient des tuiles de la même sorte et du même signe."},[{t:u4tiles(2,3,4),fb:"Cela inverse le signe des tuiles de x."},{t:u4tiles(2,-3,-4),fb:"Cela inverse le signe des tuiles d'unité."},{t:u4tiles(-3,2,4),fb:"Cela échange le nombre de tuiles de x carré avec le nombre de tuiles de x."}],"La lecture terme à terme donne <b>"+u4tiles(2,-3,4)+"</b>.",{mode:"expr2tiles",a:2,b:-3,c:4});
}, ["Associe chaque terme de l'expression à des tuiles de la même sorte et du même signe.", "Commence par le terme en x carré : son coefficient dit combien il y a de grandes tuiles carrées, et son signe dit positives ou négatives."]);

E("u4-equivalent", 4, ["8.4","8.5"], 1, "gen", function(){
  for(var att=0;att<200;att++){
    var a=u4nz(-8,8),b=ri(-8,8),c=u4nz(-8,8),d=ri(-8,8);
    if(b===0&&d===0)continue;
    var sx=a+c,sk=b+d;
    if(sx===0)continue;
    var raw="\\("+u4expr([[a,"x"],[b,""],[c,"x"],[d,""]])+"\\)";
    var corr=u4m(0,sx,sk);
    var ds=[{t:u4m(0,sx,b-d),fb:"Les constantes ont été soustraites ; les deux constantes gardent leur signe quand on les combine."},{t:u4m(0,a-c,sk),fb:"Les coefficients de x ont été soustraits ; les termes semblables s'additionnent avec leur signe."},{t:u4m(0,sx+sk,0),fb:"Cela combine les termes en x et les constantes en un seul terme, mais ce sont des termes non semblables."},{t:u4m(0,sx,-sk),fb:"La constante combinée a le mauvais signe."}];
    if(!u4ok(corr,ds))continue;
    ds=ds.slice(0,3);
    var sol="Combine les termes semblables : \\[ \\begin{aligned} "+u4expr([[a,"x"],[b,""],[c,"x"],[d,""]])+" &= ("+fmtD(a)+"x+"+fmtD(c)+"x)+("+fmtD(b)+""+(d<0?"":"+")+""+fmtD(d)+") \\\\ &= "+u4p(0,sx,sk)+" \\end{aligned} \\] L'expression équivalente est donc <b>"+corr+"</b>.";
    return mcq("Quelle expression est équivalente à "+raw+"?",{t:corr,fb:"Exact : les termes en x se combinent et les constantes se combinent."},ds,sol,{mode:"combine",a:a,b:b,c:c,d:d});
  }
  return mcq("Quelle expression est équivalente à \\(3x+2+5x-4\\)?",{t:u4m(0,8,-2),fb:"Exact : les termes en x se combinent et les constantes se combinent."},[{t:u4m(0,8,6),fb:"Les constantes ont été additionnées sans leur signe."},{t:u4m(0,-2,-2),fb:"Les coefficients de x ont été soustraits au lieu d'être additionnés."},{t:u4m(0,6,0),fb:"Cela combine des termes non semblables en un seul terme."}],"La combinaison des termes semblables donne <b>"+u4m(0,8,-2)+"</b>.",{mode:"combine",a:3,b:2,c:5,d:-4});
}, ["Regroupe les termes en x ensemble et les constantes ensemble, puis combine chaque groupe.", "Additionne d'abord les deux coefficients de x, en gardant le signe des deux nombres."]);

E("u4-add", 4, ["8.6"], 1, "gen", function(){
  for(var att=0;att<200;att++){
    var tri=ri(0,1)===1;
    var a1=tri?u4nz(-5,5):0,b1=u4nz(-8,8),c1=u4nz(-8,8);
    var a2=tri?ri(-5,5):0,b2=u4nz(-8,8),c2=u4nz(-8,8);
    var sa=a1+a2,sb=b1+b2,sc=c1+c2;
    var corr=u4m(sa,sb,sc);
    var ds=[{t:u4m(sa,sb,c1-c2),fb:"Les constantes ont été soustraites ; l'addition garde les deux signes tels quels."},{t:u4m(sa,b1-b2,sc),fb:"Les coefficients de x ont été soustraits ; l'addition garde les deux signes tels quels."},{t:u4m(sa,sb+sc,0),fb:"Cela met la constante dans le terme en x, mais ce sont des termes non semblables."},{t:u4m(sa+a2,sb,sc),fb:"Les termes en x carré ont été traités deux fois ; additionne chaque paire une seule fois."}];
    if(!u4ok(corr,ds))continue;
    ds=ds.slice(0,3);
    var sol="Regroupe les termes semblables : \\[ \\begin{aligned} ("+u4p(a1,b1,c1)+")+("+u4p(a2,b2,c2)+") &= ("+u4expr([[a1,"x^{2}"],[a2,"x^{2}"],[b1,"x"],[b2,"x"]])+")+("+u4expr([[c1,""],[c2,""]])+") \\\\ &= "+u4p(sa,sb,sc)+" \\end{aligned} \\] La somme est donc <b>"+corr+"</b>.";
    return mcq("Additionne : \\(("+u4p(a1,b1,c1)+")+("+u4p(a2,b2,c2)+")\\)",{t:corr,fb:"Exact : les termes semblables s'additionnent paire par paire."},ds,sol,{mode:tri?"add-tri":"add-bi",a1:a1,b1:b1,c1:c1,a2:a2,b2:b2,c2:c2,cr:3});
  }
  return mcq("Additionne : \\((3x+5)+(2x-4)\\)",{t:u4m(0,5,1),fb:"Exact : les termes semblables s'additionnent paire par paire."},[{t:u4m(0,5,9),fb:"Les constantes ont été traitées avec le mauvais signe."},{t:u4m(0,1,1),fb:"Les coefficients de x ont été soustraits au lieu d'être additionnés."},{t:u4m(0,6,0),fb:"Cela met la constante dans le terme en x."}],"Le regroupement des termes semblables donne <b>"+u4m(0,5,1)+"</b>.",{mode:"add-bi",cr:3});
}, ["Additionne les parties qui correspondent : x carré avec x carré, x avec x, constantes avec constantes.", "Additionne d'abord les deux coefficients de x, en gardant les deux signes."]);

E("u4-subtract", 4, ["8.7"], 2, "gen", function(){
  for(var att=0;att<200;att++){
    var tri=ri(0,1)===1;
    var a1=tri?u4nz(-5,5):0,b1=u4nz(-8,8),c1=u4nz(-8,8);
    var a2=tri?u4nz(-5,5):0,b2=u4nz(-8,8),c2=u4nz(-8,8);
    var sa=a1-a2,sb=b1-b2,sc=c1-c2;
    var corr=u4m(sa,sb,sc);
    var ds=[{t:u4m(a1+a2,b1+b2,c1+c2),fb:"Cela additionne le deuxième polynôme ; pour soustraire, il faut d'abord changer chaque signe dans ce polynôme."},{t:u4m(sa,sb,c1+c2),fb:"Le signe de la constante n'a pas changé ; la soustraction change chaque signe dans le deuxième polynôme."},{t:u4m(sa,b1+b2,sc),fb:"Le signe du terme en x n'a pas changé ; la soustraction change chaque signe dans le deuxième polynôme."},{t:u4m(sa,sb+sc,0),fb:"Cela met la constante dans le terme en x, mais ce sont des termes non semblables."}];
    if(!u4ok(corr,ds))continue;
    ds=ds.slice(0,3);
    var sol="Change chaque signe dans le deuxième polynôme, puis additionne : \\[ \\begin{aligned} ("+u4p(a1,b1,c1)+")-("+u4p(a2,b2,c2)+") &= ("+u4p(a1,b1,c1)+")+("+u4p(-a2,-b2,-c2)+") \\\\ &= "+u4p(sa,sb,sc)+" \\end{aligned} \\] La différence est donc <b>"+corr+"</b>.";
    return mcq("Soustrais : \\(("+u4p(a1,b1,c1)+")-("+u4p(a2,b2,c2)+")\\)",{t:corr,fb:"Exact : chaque signe dans le deuxième polynôme change, puis les termes semblables se combinent."},ds,sol,{mode:tri?"sub-tri":"sub-bi",a1:a1,b1:b1,c1:c1,a2:a2,b2:b2,c2:c2,cr:3});
  }
  return mcq("Soustrais : \\((5x+3)-(2x-4)\\)",{t:u4m(0,3,7),fb:"Exact : chaque signe dans le deuxième polynôme change, puis les termes semblables se combinent."},[{t:u4m(0,3,-1),fb:"Le signe de la constante n'a pas changé ; la soustraction change chaque signe dans le deuxième polynôme."},{t:u4m(0,7,7),fb:"Cela additionne le deuxième polynôme au lieu de le soustraire."},{t:u4m(0,3,1),fb:"Le changement de signe de la constante a été fait dans le mauvais sens."}],"Changer les signes puis additionner donne <b>"+u4m(0,3,7)+"</b>.",{mode:"sub-bi",cr:3});
}, ["La soustraction change le signe de chaque terme du deuxième polynôme avant de combiner.", "Réécris d'abord le deuxième polynôme avec chaque signe inversé, puis additionne les termes semblables."]);

E("u4-addsub-xy", 4, ["8.11"], 2, "gen", function(){
  for(var att=0;att<200;att++){
    var mode=ri(0,1);
    if(mode===0){
      var x1=u4nz(-7,7),y1=u4nz(-7,7),k1=ri(-7,7);
      var x2=u4nz(-7,7),y2=u4nz(-7,7),k2=ri(-7,7);
      var sub=ri(0,1)===1;
      var sx=sub?x1-x2:x1+x2,sy=sub?y1-y2:y1+y2,sk=sub?k1-k2:k1+k2;
      var corr=u4mxy(sx,sy,sk);
      var ds=[{t:u4mxy(sx,sub?y1+y2:y1-y2,sk),fb:sub?"Le signe de y n'a pas changé ; la soustraction inverse chaque signe dans le deuxième polynôme.":"Les coefficients de y ont été soustraits dans une question d'addition."},{t:u4mxy(sx,sy,sub?k1+k2:k1-k2),fb:sub?"Le signe de la constante n'a pas changé ; la soustraction inverse chaque signe dans le deuxième polynôme.":"Les constantes ont été soustraites dans une question d'addition."},{t:u4mxy(sx+sy,0,sk),fb:"Cela combine les termes en x et en y, mais ce sont des termes non semblables."}];
      if(!u4ok(corr,ds))continue;
      var op=sub?"-":"+",act=sub?"difference":"sum";
      var sol="Combine chaque sorte de terme séparément : le résultat est <b>"+corr+"</b>.";
      if(sub){sol="Change chaque signe dans le deuxième polynôme, puis combine chaque sorte de terme séparément : \\[ \\begin{aligned} ("+u4pxy(x1,y1,k1)+")-("+u4pxy(x2,y2,k2)+") &= ("+u4pxy(x1,y1,k1)+")+("+u4pxy(-x2,-y2,-k2)+") \\\\ &= "+u4pxy(sx,sy,sk)+" \\end{aligned} \\] La différence est donc <b>"+corr+"</b>.";}
      else{sol="Regroupe les termes semblables : \\[ \\begin{aligned} ("+u4pxy(x1,y1,k1)+")+("+u4pxy(x2,y2,k2)+") &= ("+u4expr([[x1,"x"],[x2,"x"]])+")+("+u4expr([[y1,"y"],[y2,"y"]])+")+("+u4expr([[k1,""],[k2,""]])+") \\\\ &= "+u4pxy(sx,sy,sk)+" \\end{aligned} \\] La somme est donc <b>"+corr+"</b>.";}
      return mcq((sub?"Soustrais : \\((":"Additionne : \\((")+u4pxy(x1,y1,k1)+")"+op+"("+u4pxy(x2,y2,k2)+")\\)",{t:corr,fb:"Exact : les termes en x, les termes en y et les constantes sont traités séparément."},ds,sol,{mode:sub?"xy-sub":"xy-add",x1:x1,y1:y1,k1:k1,x2:x2,y2:y2,k2:k2});
    }else{
      var a=u4nz(-5,5),b=u4nz(-8,8),c=u4nz(-8,8);
      var d=ri(-5,5),e=-u4nz(2,8),f=-u4nz(2,8);
      var sa=a-d,sb=b-e,sc=c-f;
      var corr2=u4m(sa,sb,sc);
      var ds2=[{t:u4m(sa,b+e,sc),fb:"Soustraire un terme en x négatif ajoute sa valeur ; l'étape du changement de signe a été manquée."},{t:u4m(sa,sb,c+f),fb:"Soustraire une constante négative ajoute sa valeur ; l'étape du changement de signe a été manquée."},{t:u4m(a+d,sb,sc),fb:"Les termes en x carré ont été additionnés ; c'est une soustraction."}];
      if(!u4ok(corr2,ds2))continue;
      var sol2="Change chaque signe dans le deuxième polynôme, puis additionne : \\[ \\begin{aligned} ("+u4p(a,b,c)+")-("+u4p(d,e,f)+") &= ("+u4p(a,b,c)+")+("+u4p(-d,-e,-f)+") \\\\ &= "+u4p(sa,sb,sc)+" \\end{aligned} \\] La différence est donc <b>"+corr2+"</b>.";
      return mcq("Soustrais : \\(("+u4p(a,b,c)+")-("+u4p(d,e,f)+")\\)",{t:corr2,fb:"Exact : soustraire un terme négatif ajoute sa valeur."},ds2,sol2,{mode:"sub-neg",a:a,b:b,c:c,d:d,e:e,f:f});
    }
  }
  return mcq("Additionne : \\((2x+3y)+(x-2y)\\)",{t:u4mxy(3,1,0),fb:"Exact : les termes en x, les termes en y et les constantes sont traités séparément."},[{t:u4mxy(3,5,0),fb:"Les coefficients de y ont été traités avec le mauvais signe."},{t:u4mxy(4,1,0),fb:"Cela combine les termes en x et en y, qui sont non semblables."},{t:u4mxy(2,1,0),fb:"Les coefficients de x n'ont pas été additionnés."}],"La combinaison des termes semblables donne <b>"+u4mxy(3,1,0)+"</b>.",{mode:"xy-add"});
}, ["Garde les termes en x, les termes en y et les constantes dans des groupes séparés ; les termes non semblables restent séparés.", "Combine d'abord les coefficients de x, puis fais la même chose pour les coefficients de y."]);

E("u4-multiply-monomial", 4, ["8.8"], 1, "gen", function(){
  for(var att=0;att<200;att++){
    var mode=ri(0,2);
    if(mode===2){
      var b=u4nz(-7,7),c=u4nz(-8,8);
      var corr=u4m(b,c,0);
      var ds=[{t:u4m(0,b+c,0),fb:"Multiplier par x augmente chaque puissance ; les termes ne se fusionnent pas en un seul terme en x."},{t:u4m(b,0,0),fb:"Cela multiplie seulement le premier terme ; x multiplie chaque terme."},{t:u4m(-b,c,0),fb:"Le premier produit a le mauvais signe."},{t:u4m(b,-c,0),fb:"Le deuxième produit a le mauvais signe."}];
      if(!u4ok(corr,ds))continue;
      ds=ds.slice(0,3);
      var sol="Multiplie chaque terme par \\(x\\): \\[ \\begin{aligned} x("+u4p(0,b,c)+") &= x \\cdot "+u4expr([[b,"x"]])+" + x \\cdot ("+fmtD(c)+") \\\\ &= "+u4p(b,c,0)+" \\end{aligned} \\] Le produit est donc <b>"+corr+"</b>.";
      return mcq("Multiplie : \\(x("+u4p(0,b,c)+")\\)",{t:corr,fb:"Exact : x multiplie chaque terme et chaque puissance augmente de un."},ds,sol,{mode:"x-times-bi",b:b,c:c,cr:3});
    }
    var k=pick([-5,-4,-3,-2,2,3,4,5]);
    var tri=mode===1;
    var a=tri?u4nz(-5,5):0,b2=u4nz(-7,7),c2=u4nz(-8,8);
    var corr2=u4m(k*a,k*b2,k*c2);
    var ds2=[{t:u4m(k*a,b2,c2),fb:"Cela multiplie seulement le premier terme ; le monôme multiplie chaque terme."},{t:u4m(k*a,k*b2,c2),fb:"Le terme constant n'a pas été multiplié ; le monôme multiplie chaque terme."},{t:u4m(k*a,k*b2,-k*c2),fb:"Le produit de la constante a le mauvais signe."},{t:u4m(a+k,b2+k,c2+k),fb:"Cela additionne le monôme à chaque coefficient ; cette question multiplie."}];
    if(!u4ok(corr2,ds2))continue;
    ds2=ds2.slice(0,3);
    var prts=[];if(a!==0)prts.push("("+u4expr([[k*a,"x^{2}"]])+")");prts.push("("+u4expr([[k*b2,"x"]])+")");prts.push("("+fmtD(k*c2)+")");
    var sol2="Multiplie chaque terme par \\("+fmtD(k)+"\\): \\[ \\begin{aligned} "+fmtD(k)+"("+u4p(a,b2,c2)+") &= "+prts.join("+")+" \\\\ &= "+u4p(k*a,k*b2,k*c2)+" \\end{aligned} \\] Le produit est donc <b>"+corr2+"</b>.";
    return mcq("Multiplie : \\("+fmtD(k)+"("+u4p(a,b2,c2)+")\\)",{t:corr2,fb:"Exact : le monôme multiplie chaque terme."},ds2,sol2,{mode:tri?"const-times-tri":"const-times-bi",k:k,a:a,b:b2,c:c2,cr:3});
  }
  return mcq("Multiplie : \\(3(2x+5)\\)",{t:u4m(0,6,15),fb:"Exact : le monôme multiplie chaque terme."},[{t:u4m(0,6,5),fb:"La constante n'a pas été multipliée."},{t:u4m(0,5,15),fb:"Le terme en x n'a pas été multiplié."},{t:u4m(0,6,-15),fb:"Le produit de la constante a le mauvais signe."}],"La multiplication de chaque terme donne <b>"+u4m(0,6,15)+"</b>.",{mode:"const-times-bi",cr:3});
}, ["Le monôme multiplie chaque terme dans les parenthèses, pas seulement le premier.", "Multiplie d'abord le monôme par le premier terme, puis par chaque terme restant."]);

E("u4-divide-monomial", 4, ["8.9"], 1, "gen", function(){
  for(var att=0;att<200;att++){
    if(ri(0,1)===0){
      var a=u4nz(-7,7),b=u4nz(-8,8);
      var corr=u4m(0,a,b);
      var ds=[{t:u4m(a,b,0),fb:"Diviser par x abaisse chaque puissance de un ; le résultat comporte un terme en x et une constante."},{t:u4m(0,a,0),fb:"Cela divise seulement le premier terme ; chaque terme est divisé par x."},{t:u4m(0,-a,b),fb:"Le premier terme du quotient a le mauvais signe."},{t:u4m(0,a,-b),fb:"Le deuxième terme du quotient a le mauvais signe."}];
      if(!u4ok(corr,ds))continue;
      ds=ds.slice(0,3);
      var sol="Divise chaque terme par \\(x\\): \\[ \\begin{aligned} ("+u4p(a,b,0)+") \\div x &= "+u4expr([[a,"x^{2}"]])+" \\div x + "+u4expr([[b,"x"]])+" \\div x \\\\ &= "+u4p(0,a,b)+" \\end{aligned} \\] Le quotient est donc <b>"+corr+"</b>.";
      return mcq("Divise : \\(("+u4p(a,b,0)+") \\div x\\)",{t:corr,fb:"Exact : chaque terme est divisé et chaque puissance baisse de un."},ds,sol,{mode:"div-x",a:a,b:b,cr:2});
    }
    var d=pick([-4,-3,-2,2,3,4,5]);
    var q1=ri(0,1)===1?u4nz(-5,5):0,q2=u4nz(-6,6),q3=u4nz(-6,6);
    var corr2=u4m(q1,q2,q3);
    var A=d*q1,B=d*q2,C=d*q3;
    var ds2=[{t:u4m(q1,q2,C),fb:"Le terme constant n'a pas été divisé ; chaque terme est divisé."},{t:u4m(A-d,B-d,C-d),fb:"Cela soustrait le diviseur de chaque coefficient ; cette question divise."},{t:u4m(q1,-q2,q3),fb:"Le terme du milieu du quotient a le mauvais signe."},{t:u4m(q1,q2,-q3),fb:"Le terme constant du quotient a le mauvais signe."}];
    if(!u4ok(corr2,ds2))continue;
    ds2=ds2.slice(0,3);
    var dparts=[];if(A!==0)dparts.push("("+u4expr([[A,"x^{2}"]])+") \\div ("+fmtD(d)+")");dparts.push("("+u4expr([[B,"x"]])+") \\div ("+fmtD(d)+")");dparts.push("("+fmtD(C)+") \\div ("+fmtD(d)+")");
    var sol2="Divise chaque terme par \\("+fmtD(d)+"\\): \\[ \\begin{aligned} ("+u4p(A,B,C)+") \\div ("+fmtD(d)+") &= "+dparts.join(" + ")+" \\\\ &= "+u4p(q1,q2,q3)+" \\end{aligned} \\] Le quotient est donc <b>"+corr2+"</b>.";
    return mcq("Divise : \\(("+u4p(A,B,C)+") \\div ("+fmtD(d)+")\\)",{t:corr2,fb:"Exact : chaque terme est divisé par le monôme."},ds2,sol2,{mode:"div-const",d:d,q1:q1,q2:q2,q3:q3,cr:2});
  }
  return mcq("Divise : \\((6x+9) \\div 3\\)",{t:u4m(0,2,3),fb:"Exact : chaque terme est divisé par le monôme."},[{t:u4m(0,2,9),fb:"La constante n'a pas été divisée."},{t:u4m(0,3,6),fb:"Cela soustrait le diviseur de chaque coefficient."},{t:u4m(0,2,-3),fb:"Le quotient de la constante a le mauvais signe."}],"La division de chaque terme donne <b>"+u4m(0,2,3)+"</b>.",{mode:"div-const",cr:2});
}, ["Chaque terme du polynôme est divisé par le monôme, un terme à la fois.", "Divise d'abord le premier terme, puis divise chaque terme restant par le même monôme."]);

E("u4-mult-div-mixed", 4, ["8.12"], 1, "gen", function(){
  for(var att=0;att<200;att++){
    if(ri(0,1)===0){
      var k=pick([-4,-3,-2,2,3,4]);
      var b=u4nz(-7,7),c=u4nz(-8,8);
      var corr=u4m(0,k*b,k*c);
      var ds=[{t:u4m(0,k*b,c),fb:"La constante n'a pas été multipliée ; le monôme multiplie chaque terme."},{t:u4m(0,b,k*c),fb:"Le terme en x n'a pas été multiplié ; le monôme multiplie chaque terme."},{t:u4m(0,k*b,-k*c),fb:"Le produit de la constante a le mauvais signe."}];
      if(!u4ok(corr,ds))continue;
      var sol="Multiplie chaque terme par \\("+fmtD(k)+"\\): le produit est <b>"+corr+"</b>.";
      return mcq("Multiplie : \\("+fmtD(k)+"("+u4p(0,b,c)+")\\)",{t:corr,fb:"Exact : le monôme multiplie chaque terme."},ds,sol,{mode:"multiply",k:k,b:b,c:c,cr:2});
    }else{
      var d=pick([-4,-3,-2,2,3,4,5]);
      var q2=u4nz(-6,6),q3=u4nz(-6,6);
      var corr2=u4m(0,q2,q3);
      var ds2=[{t:u4m(0,q2,d*q3),fb:"La constante n'a pas été divisée ; chaque terme est divisé."},{t:u4m(0,d*q2-d,q3),fb:"Une partie soustrait le diviseur ; chaque terme est divisé à la place."},{t:u4m(0,-q2,q3),fb:"Le premier terme du quotient a le mauvais signe."}];
      if(!u4ok(corr2,ds2))continue;
      var sol2="Divise chaque terme par \\("+fmtD(d)+"\\): le quotient est <b>"+corr2+"</b>.";
      return mcq("Divise : \\(("+u4p(0,d*q2,d*q3)+") \\div ("+fmtD(d)+")\\)",{t:corr2,fb:"Exact : chaque terme est divisé par le monôme."},ds2,sol2,{mode:"divide",d:d,q2:q2,q3:q3,cr:2});
    }
  }
  return mcq("Multiplie : \\(2(3x+4)\\)",{t:u4m(0,6,8),fb:"Exact : le monôme multiplie chaque terme."},[{t:u4m(0,6,4),fb:"La constante n'a pas été multipliée."},{t:u4m(0,3,8),fb:"Le terme en x n'a pas été multiplié."},{t:u4m(0,6,-8),fb:"Le produit de la constante a le mauvais signe."}],"La multiplication de chaque terme donne <b>"+u4m(0,6,8)+"</b>.",{mode:"multiply",cr:2});
}, ["Décide d'abord si le monôme multiplie ou divise, puis applique-le à chaque terme.", "Applique d'abord l'opération au premier terme, puis à chaque terme restant."]);

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
    if(err===2){px=a+sd; pk=b-c; s2="L'étape 2 regroupe les termes ainsi : \\(("+u4expr([[a,"x"],[sd,"x"]])+")+("+u4expr([[b,""],[-c,""]])+")\\)";}
    else{s2="L'étape 2 regroupe les termes ainsi : \\(("+u4expr([[a,"x"],[-c,"x"]])+")+("+u4expr([[b,""],[sd,""]])+")\\)";}
    if(err===3){px=a+c;}
    s3="L'étape 3 combine les groupes pour obtenir \\("+u4p(0,px,pk)+"\\)";
    if(err===4){pk=-pk;}
    s4="L'étape 4 écrit la réponse finale ainsi : \\("+u4p(0,px,pk)+"\\)";
    var corr="Étape "+fmtD(err);
    var fbTxt={1:"L'étape 1 est celle où le changement de signe se fait.",2:"L'étape 2 est celle où les termes sont regroupés.",3:"L'étape 3 est celle où les groupes sont combinés.",4:"L'étape 4 est celle où la réponse finale est écrite."};
    var opts=["Étape 1","Étape 2","Étape 3","Étape 4"].map(function(sv,idx){
      var n=idx+1;
      return {t:sv,fb:n===err?"Exact : c'est la première ligne qui contient une erreur. "+fbTxt[n]:"Cette étape découle correctement de la ligne précédente."};
    });
    var corrOpt=opts[err-1];
    var ds=opts.filter(function(o){return o.t!==corr;});
    var prompt="Un élève a simplifié \\(("+u4p(0,a,b)+")-("+u4p(0,c,d)+")\\) en quatre étapes.<br>L'étape 1 enlève les parenthèses et donne "+s1+".<br>"+s2+".<br>"+s3+".<br>"+s4+".<br>À quelle étape la première erreur se produit-elle ?";
    var sol="Enlever les parenthèses change chaque signe dans le deuxième polynôme, le regroupement garde les termes semblables ensemble, et la combinaison donne \\("+u4p(0,a-c,b-d)+"\\). En vérifiant chaque ligne par rapport à ce processus, la première erreur se produit à l'<b>"+corr+"</b>.";
    return mcq(prompt,corrOpt,ds,sol,{mode:"error-step",err:err,a:a,b:b,c:c,d:d});
  }
  return mcq("Un élève a simplifié \\((5x+3)-(2x-4)\\) et la première erreur est à l'étape de l'enlèvement des parenthèses. À quelle étape la première erreur se produit-elle ?",{t:"Étape 1",fb:"Exact : c'est la première ligne qui contient une erreur."},[{t:"Étape 2",fb:"Cette étape découle correctement de la ligne précédente."},{t:"Étape 3",fb:"Cette étape découle correctement de la ligne précédente."},{t:"Étape 4",fb:"Cette étape découle correctement de la ligne précédente."}],"La première erreur est à l'<b>Étape 1</b>.",{mode:"error-step",err:1});
}, ["Vérifie chaque étape par rapport à l'étape précédente, dans l'ordre, et arrête-toi à la première ligne qui change une valeur.", "Vérifie d'abord l'enlèvement des parenthèses : chaque signe dans le deuxième polynôme doit changer."]);

E("u4-equivalent-pair", 4, ["8.10"], 1, "gen", function(){
  for(var att=0;att<200;att++){
    var a=u4nz(-8,8),b=u4nz(-8,8);
    var corrT=u4m(0,a,b)+" et \\("+u4expr([[b,""],[a,"x"]])+"\\)";
    function pairStr(p,q){return u4m(0,p[0],p[1])+" et "+u4m(0,q[0],q[1]);}
    var r1=ri(2,8),r2=u4nz(-8,8),r3=u4nz(-8,8),r4=ri(2,8);
    var ds=[{t:pairStr([r1,r2],[r1,-r2]),fb:"La constante change de signe entre les deux expressions, donc elles sont différentes."},{t:pairStr([r3,r4],[r4,r3]),fb:"Le coefficient de x et la constante échangent leur place, donc elles sont différentes."},{t:pairStr([r2,r1],[-r2,r1]),fb:"Le coefficient de x change de signe entre les deux expressions, donc elles sont différentes."}];
    var seen=[corrT];var good=true;
    for(var i=0;i<ds.length;i++){if(seen.indexOf(ds[i].t)>=0)good=false;seen.push(ds[i].t);}
    if(!good)continue;
    var sol="Deux expressions sont équivalentes quand elles se simplifient au même polynôme. La paire \\("+u4p(0,a,b)+"\\) et \\("+u4expr([[b,""],[a,"x"]])+"\\) a les mêmes termes dans un ordre différent, donc la paire équivalente est <b>"+corrT+"</b>.";
    return mcq("Quelles sont les deux expressions équivalentes ?",{t:corrT,fb:"Exact : les deux expressions ont exactement les mêmes termes."},ds,sol,{mode:"pair",a:a,b:b});
  }
  return mcq("Quelles sont les deux expressions équivalentes ?",{t:u4m(0,3,2)+" et \\(2+3x\\)",fb:"Exact : les deux expressions ont exactement les mêmes termes."},[{t:u4m(0,3,2)+" et "+u4m(0,3,-2),fb:"La constante change de signe, donc elles sont différentes."},{t:u4m(0,2,3)+" et "+u4m(0,3,2),fb:"Le coefficient de x et la constante échangent leur place, donc elles sont différentes."},{t:u4m(0,3,2)+" et "+u4m(0,-3,2),fb:"Le coefficient de x change de signe, donc elles sont différentes."}],"La paire équivalente est <b>"+u4m(0,3,2)+" et \\(2+3x\\)</b>.",{mode:"pair"});
}, ["Simplifie chaque paire ou compare-la terme à terme : des expressions équivalentes ont des termes identiques.", "Vérifie d'abord une paire : compare son coefficient de x et sa constante des deux côtés."]);

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
    var ds=sub?[{t:u4m(a1+a2,b1+b2,c1+c2),fb:"Cela additionne le deuxième groupe ; la question l'enlève."},{t:u4m(ra,rb,c1+c2),fb:"Les tuiles d'unité ont été additionnées ; enlever des tuiles les soustrait."},{t:u4m(ra,b1+b2,rc),fb:"Les tuiles de x ont été additionnées ; enlever des tuiles les soustrait."}]:[{t:u4m(a1-a2,b1-b2,c1-c2),fb:"Cela soustrait le deuxième groupe ; la question l'ajoute."},{t:u4m(ra,rb,c1-c2),fb:"Les tuiles d'unité ont été soustraites ; combiner les groupes les additionne."},{t:u4m(ra,b1-b2,rc),fb:"Les tuiles de x ont été soustraites ; combiner les groupes les additionne."}];
    if(!u4ok(corr,ds))continue;
    var prompt=sub?("Un modèle de tuiles montre "+u4tiles(a1,b1,c1)+". On enlève ensuite les tuiles de "+u4m(a2,b2,c2)+". Quelle expression montre le résultat ?"):("Un modèle de tuiles montre "+u4tiles(a1,b1,c1)+". On ajoute un deuxième groupe de tuiles, "+u4tiles(a2,b2,c2)+". Quelle expression montre le résultat ?");
    var sol=(sub?"Enlever des tuiles soustrait chaque nombre : ":"Combiner les groupes additionne chaque nombre : ")+"le résultat est <b>"+corr+"</b>.";
    return mcq(prompt,{t:corr,fb:sub?"Exact : chaque nombre de tuiles est soustrait.":"Exact : chaque nombre de tuiles est additionné."},ds,sol,{mode:sub?"tiles-sub":"tiles-add",a1:a1,b1:b1,c1:c1,a2:a2,b2:b2,c2:c2});
  }
  return mcq("Un modèle de tuiles montre 3 tuiles positives de x, 2 tuiles positives d'unité. On ajoute un deuxième groupe, 1 tuile positive de x et 1 tuile positive d'unité. Quelle expression montre le résultat ?",{t:u4m(0,4,3),fb:"Exact : chaque nombre de tuiles est additionné."},[{t:u4m(0,2,1),fb:"Cela soustrait le deuxième groupe."},{t:u4m(0,4,1),fb:"Les tuiles d'unité ont été soustraites au lieu d'être additionnées."},{t:u4m(0,2,3),fb:"Les tuiles de x ont été soustraites au lieu d'être additionnées."}],"L'addition des nombres donne <b>"+u4m(0,4,3)+"</b>.",{mode:"tiles-add"});
}, ["Travaille une sorte de tuile à la fois : combine ou enlève d'abord ces nombres.", "Traite d'abord les tuiles de x carré, en additionnant les nombres si les groupes se combinent et en soustrayant si on enlève des tuiles."]);

E("u4-equiv-var", 4, ["8.5"], 2, "var", varset([
  function(){
    var corr="\\(5-3x+2x^{2}\\)";
    var sol="Le modèle montre \\(2x^{2}-3x+5\\). Écrire les mêmes termes dans un ordre différent donne <b>"+corr+"</b>.";
    return mcq("Un modèle de tuiles contient 2 tuiles positives de x carré, 3 tuiles négatives de x et 5 tuiles positives d'unité. Quelle expression est équivalente à l'expression montrée par le modèle ?",{t:corr,fb:"Exact : elle a les mêmes trois termes dans un nouvel ordre."},[{t:"\\(2x^{2}+3x+5\\)",fb:"Le terme en x a le mauvais signe par rapport au modèle."},{t:"\\(3x^{2}-2x+5\\)",fb:"Cela échange le nombre de tuiles de x carré avec le nombre de tuiles de x."},{t:"\\(2x^{2}-3x-5\\)",fb:"La constante a le mauvais signe par rapport au modèle."}],sol,{mode:"var-tiles"});
  },
  function(){
    var corr="\\(2(2x+3)\\)";
    var sol="En développant, \\(2(2x+3)=4x+6\\) pour chaque valeur de \\(x\\). L'expression correspondante est donc <b>"+corr+"</b>.";
    return mcq("Quelle expression a la même valeur que \\(4x+6\\) pour chaque valeur de \\(x\\)?",{t:corr,fb:"Exact : elle se développe en exactement 4x plus 6."},[{t:"\\(2(2x+6)\\)",fb:"Elle se développe en 4x plus 12, donc la constante est différente."},{t:"\\(4(x+6)\\)",fb:"Elle se développe en 4x plus 24, donc la constante est différente."},{t:"\\(2x+3\\)",fb:"C'est la moitié de l'expression donnée, donc ses valeurs sont différentes."}],sol,{mode:"var-same-value"});
  },
  function(){
    var corr="\\(8x+12\\)";
    var sol="Le périmètre additionne les deux longueurs et les deux largeurs : \\[ \\begin{aligned} P &= 2(3x+2)+2(x+4) \\\\ &= 6x+4+2x+8 \\\\ &= 8x+12 \\end{aligned} \\] Le périmètre est donc <b>"+corr+"</b>.";
    return mcq("Un rectangle a une longueur de \\(3x+2\\) et une largeur de \\(x+4\\). Quelle expression donne son périmètre sous forme simplifiée ?",{t:corr,fb:"Exact : les deux longueurs et les deux largeurs sont comptées, puis les termes semblables se combinent."},[{t:"\\(4x+6\\)",fb:"Cela compte chaque côté une seule fois ; un périmètre compte les quatre côtés."},{t:"\\(8x+6\\)",fb:"Les largeurs ont été doublées, mais les longueurs ont été comptées une seule fois."},{t:"\\(7x+12\\)",fb:"Il manque un terme en x quand les quatre côtés sont additionnés."}],sol,{mode:"var-perimeter"});
  }
]), ["Des expressions équivalentes ont les mêmes termes et la même valeur pour chaque x.", "Calcule d'abord ce à quoi l'expression donnée se simplifie, puis compare chaque option avec ce résultat."]);

E("u4-missing", 4, ["8.11"], 3, "gen", function(){
  for(var att=0;att<200;att++){
    var three=ri(0,1)===1;
    var a1=u4nz(-6,6),b1=u4nz(-8,8),c1=ri(-8,8);
    var ma=u4nz(-6,6),mb=u4nz(-8,8),mc2=u4nz(-8,8);
    var corr=u4m(ma,mb,mc2);
    var ds=[{t:u4m(ma,mb,-mc2),fb:"La constante a le mauvais signe ; fais la soustraction terme à terme."},{t:u4m(ma,-mb,mc2),fb:"Le terme en x a le mauvais signe ; fais la soustraction terme à terme."},{t:u4m(-ma,mb,mc2),fb:"Le terme en x carré a le mauvais signe ; fais la soustraction terme à terme."}];
    if(!u4ok(corr,ds))continue;
    if(three){
      var a2=u4nz(-5,5),b2=ri(-7,7),c2v=ri(-7,7);
      var R=u4m(a1+a2+ma,b1+b2+mb,c1+c2v+mc2);
      var sol="Soustrais les deux polynômes connus du total : \\[ \\begin{aligned} \\text{manquant} &= ("+u4p(a1+a2+ma,b1+b2+mb,c1+c2v+mc2)+")-("+u4p(a1,b1,c1)+")-("+u4p(a2,b2,c2v)+") \\\\ &= "+u4p(ma,mb,mc2)+" \\end{aligned} \\] Le polynôme manquant est donc <b>"+corr+"</b>.";
      return mcq("Trouve le polynôme manquant : "+u4m(a1,b1,c1)+" + "+u4m(a2,b2,c2v)+" + manquant = "+R+". Quel polynôme manque-t-il ?",{t:corr,fb:"Exact : le total moins les parties connues laisse ce polynôme."},ds,sol,{mode:"missing-three",cr:3});
    }
    var R2=u4m(a1+ma,b1+mb,c1+mc2);
    var sol2="Soustrais le polynôme connu du total : \\[ \\begin{aligned} \\text{manquant} &= ("+u4p(a1+ma,b1+mb,c1+mc2)+")-("+u4p(a1,b1,c1)+") \\\\ &= "+u4p(ma,mb,mc2)+" \\end{aligned} \\] Le polynôme manquant est donc <b>"+corr+"</b>.";
    return mcq("Trouve le polynôme manquant : "+u4m(a1,b1,c1)+" + manquant = "+R2+". Quel polynôme manque-t-il ?",{t:corr,fb:"Exact : le total moins la partie connue laisse ce polynôme."},ds,sol2,{mode:"missing-two",cr:3});
  }
  return mcq("Trouve le polynôme manquant : "+u4m(0,3,2)+" + manquant = "+u4m(0,7,-5)+". Quel polynôme manque-t-il ?",{t:u4m(0,4,-7),fb:"Exact : le total moins la partie connue laisse ce polynôme."},[{t:u4m(0,4,7),fb:"La constante a le mauvais signe."},{t:u4m(0,-4,-7),fb:"Le terme en x a le mauvais signe."},{t:u4m(0,10,-3),fb:"Cela additionne la partie connue au total au lieu de la soustraire."}],"La soustraction donne <b>"+u4m(0,4,-7)+"</b>.",{mode:"missing-two",cr:3});
}, ["La partie manquante est le total moins les parties que tu connais déjà.", "Soustrais d'abord le polynôme connu du total, terme à terme."]);

E("u4-area-monomial", 4, ["8.12"], 3, "gen", function(){
  for(var att=0;att<200;att++){
    if(ri(0,1)===0){
      var usex=ri(0,1)===1;
      if(usex){
        var b=u4nz(-6,6),c=u4nz(-7,7);
        var corr=u4m(b,c,0);
        var ds=[{t:u4m(0,b+c,0),fb:"Multiplier par x augmente chaque puissance ; les termes restent séparés."},{t:u4m(b,0,0),fb:"Cela utilise seulement le premier terme ; la longueur multiplie chaque terme de la largeur."},{t:u4m(-b,c,0),fb:"Le premier produit a le mauvais signe."}];
        if(!u4ok(corr,ds))continue;
        var sol="L'aire est la longueur fois la largeur : \\[ \\begin{aligned} A &= x("+u4p(0,b,c)+") \\\\ &= "+u4p(b,c,0)+" \\end{aligned} \\] L'aire est donc <b>"+corr+"</b>.";
        return mcq("Un rectangle a une longueur de \\(x\\) et une largeur de "+u4m(0,b,c)+". Quelle expression donne son aire ?",{t:corr,fb:"Exact : la longueur multiplie chaque terme de la largeur."},ds,sol,{mode:"area-mult-x",cr:2});
      }
      var k=pick([-4,-3,-2,2,3,4]);
      var b2=u4nz(-6,6),c2=u4nz(-7,7);
      var corr2=u4m(0,k*b2,k*c2);
      var ds2=[{t:u4m(0,k*b2,c2),fb:"Le deuxième terme de la largeur n'a pas été multiplié ; la longueur multiplie chaque terme."},{t:u4m(0,b2+k,c2+k),fb:"Cela additionne la longueur à chaque terme ; l'aire multiplie."},{t:u4m(0,k*b2,-k*c2),fb:"Le deuxième produit a le mauvais signe."}];
      if(!u4ok(corr2,ds2))continue;
      var sol2="L'aire est la longueur fois la largeur : \\[ \\begin{aligned} A &= "+fmtD(k)+"("+u4p(0,b2,c2)+") \\\\ &= "+u4p(0,k*b2,k*c2)+" \\end{aligned} \\] L'aire est donc <b>"+corr2+"</b>.";
      return mcq("Un rectangle a une longueur de \\("+fmtD(k)+"\\) et une largeur de "+u4m(0,b2,c2)+". Quelle expression donne son aire ?",{t:corr2,fb:"Exact : la longueur multiplie chaque terme de la largeur."},ds2,sol2,{mode:"area-mult-const",k:k,cr:2});
    }else{
      var d=pick([-4,-3,-2,2,3,4,5]);
      var q2=u4nz(-6,6),q3=u4nz(-6,6);
      var corr3=u4m(0,q2,q3);
      var ds3=[{t:u4m(0,q2,d*q3),fb:"Le deuxième terme n'a pas été divisé ; chaque terme de l'aire est divisé."},{t:u4m(0,d*q2-d,q3),fb:"Une partie soustrait la longueur du côté ; pour trouver un côté, on divise."},{t:u4m(0,-q2,q3),fb:"Le premier terme du côté a le mauvais signe."}];
      if(!u4ok(corr3,ds3))continue;
      var sol3="Divise l'aire par le côté connu : \\[ \\begin{aligned} \\text{autre côté} &= ("+u4p(0,d*q2,d*q3)+") \\div ("+fmtD(d)+") \\\\ &= "+u4p(0,q2,q3)+" \\end{aligned} \\] L'autre côté est donc <b>"+corr3+"</b>.";
      return mcq("Un rectangle a une aire de "+u4m(0,d*q2,d*q3)+" et un côté de longueur \\("+fmtD(d)+"\\) . Quelle expression donne l'autre côté ?",{t:corr3,fb:"Exact : l'aire divisée par le côté connu donne l'autre côté."},ds3,sol3,{mode:"area-div",d:d,cr:2});
    }
  }
  return mcq("Un rectangle a une longueur de \\(3\\) et une largeur de "+u4m(0,2,5)+". Quelle expression donne son aire ?",{t:u4m(0,6,15),fb:"Exact : la longueur multiplie chaque terme de la largeur."},[{t:u4m(0,6,5),fb:"Le deuxième terme de la largeur n'a pas été multiplié."},{t:u4m(0,5,8),fb:"Cela additionne la longueur à chaque terme ; l'aire multiplie."},{t:u4m(0,6,-15),fb:"Le deuxième produit a le mauvais signe."}],"La longueur fois la largeur donne <b>"+u4m(0,6,15)+"</b>.",{mode:"area-mult-const",cr:2});
}, ["L'aire d'un rectangle est la longueur fois la largeur ; un côté manquant est l'aire divisée par le côté connu.", "Multiplie ou divise d'abord le premier terme, puis fais la même chose à chaque terme restant."]);

E("u4-error-var", 4, ["8.13","8.10"], 3, "var", varset([
  function(){
    var corr=u4m(0,3,7);
    var sol="Soustraire change le signe de \\(-4\\) en \\(+4\\): \\[ \\begin{aligned} (5x+3)-(2x-4) &= 5x+3-2x+4 \\\\ &= 3x+7 \\end{aligned} \\] L'expression correcte est donc <b>"+corr+"</b>.";
    return mcq("Un élève a simplifié \\((5x+3)-(2x-4)\\) et a obtenu \\(3x-1\\). Quelle est l'expression simplifiée correcte ?",{t:corr,fb:"Exact : le signe du dernier terme s'inverse quand on enlève les parenthèses."},[{t:u4m(0,3,-1),fb:"C'est la réponse de l'élève ; le dernier signe n'a pas été changé."},{t:u4m(0,7,7),fb:"Cela additionne les termes en x au lieu de les soustraire."},{t:u4m(0,3,1),fb:"La constante a été combinée avec le mauvais changement de signe."}],sol,{mode:"var-sub-sign"});
  },
  function(){
    var corr="\\(4x^{2}+3x\\)";
    var sol="Les termes \\(4x^{2}\\) et \\(3x\\) sont des termes non semblables, donc ils ne peuvent pas se combiner. L'expression est déjà simplifiée : <b>"+corr+"</b>.";
    return mcq("Un élève a simplifié \\(4x^{2}+3x\\) et a obtenu \\(7x^{2}\\). Quelle est l'expression simplifiée correcte ?",{t:corr,fb:"Exact : les termes en x carré et les termes en x sont non semblables et restent séparés."},[{t:"\\(7x^{2}\\)",fb:"C'est la réponse de l'élève ; elle combine des termes non semblables."},{t:"\\(7x\\)",fb:"Cela combine des termes non semblables en un seul terme en x."},{t:"\\(12x^{2}\\)",fb:"Cela multiplie les coefficients ; rien ici n'est multiplié."}],sol,{mode:"var-unlike"});
  },
  function(){
    var corr="\\(2(3x-2)\\)";
    var sol="En développant, \\(2(3x-2)=6x-4\\), ce qui correspond à l'expression donnée. Une expression équivalente est donc <b>"+corr+"</b>.";
    return mcq("Quelle expression est équivalente à \\(6x-4\\)?",{t:corr,fb:"Exact : elle se développe en exactement 6x moins 4."},[{t:"\\(3(2x-4)\\)",fb:"Elle se développe en 6x moins 12, donc la constante est différente."},{t:"\\(2(3x+2)\\)",fb:"Elle se développe en 6x plus 4, donc le signe est différent."},{t:"\\(6(x-4)\\)",fb:"Elle se développe en 6x moins 24, donc la constante est différente."}],sol,{mode:"var-equiv"});
  }
]), ["Compare le résultat de l'élève avec ta propre simplification soigneuse, étape par étape.", "Refais d'abord la première étape toi-même, en surveillant les signes et les termes semblables, puis compare."]);

/* TRANSLATOR NOTES
 * Entries translated: 8 (u1-ooo-brackets-mc, u1-ooo-calc-display, u1-ooo-error-value,
 * u2-sqrt-fraction, u2-number-from-root, u2-calc-root-round, u2-approx-explain-gen,
 * u2-overlap-pair). Prompts, options, per-answer feedback, worked solutions, hint1 and
 * hint2 all translated.
 * Judgement calls (glossary silent): the legs of a right triangle are rendered
 * "cathetes" (with accents in the text); the KaTeX text label "overlap" is rendered
 * "chevauchement" and the label SA is rendered AT, for aire de la surface; the top and
 * bottom parts of a fraction are rendered "le haut" and "le bas" to keep the
 * reading load low; "decimal place" is rendered "decimale".
 * FMT-GEOM: none. No fmt call in this chunk feeds an SVG attribute or coordinate,
 * so every display fmt and fmtF was converted to fmtD and fmtDF, including the
 * internal uniqueness keys and the shS display string in u2-approx-explain-gen.
 * No .toFixed uses occur in this chunk.
 * Literal formatted numbers written into static prose, for later reconciliation
 * against the NL French immersion curriculum guides: "3,14" twice, as the pi
 * value in the u2-overlap-pair cylinder prompt and in its worked solution (the
 * 3.14 values in code are numeric literals and were not changed); "1 decimale"
 * in the u1-ooo-calc-display rounding feedback; single static digits in prose:
 * "2" in the double-the-root feedback and "1" in the adds-1 feedback, both in
 * u2-number-from-root, and "5" in the round-up feedback in u2-calc-root-round.
 * No literal percent amounts, dollar amounts or grouped thousands occur in the
 * prose of this chunk.
 * Unsure: "cathetes" is provisional pending the curriculum guide extracts.
 */

/* ----- bank-u1-topup.js ----- */
// Math 9 (French) Unit 1 top-up question bank
// Cut verbatim from the standalone bank source
// (math-9-review-fr/bank-src.js, lines 1617 to 1808).
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
    var keys = [V, E1, E2, E3, E4].map(function (x) { return fmtD(u1round(x, 2)); });
    if (new Set(keys).size < 5) continue;
    P = { fn: fr.n, fd: fr.d, fv: fr.v, c: c, S: S, D: D, a: a, d: d, e: e, f: f, g: g, q1: q1, q2: q2, V: V, E1: E1, E2: E2, E3: E3, E4: E4 };
  }
  if (!P) {
    P = { fn: 3, fd: 4, fv: 0.75, c: 2.25, S: 3, D: 6, a: 9, d: 3, e: 2, f: 4.5, g: 5, q1: 2, q2: 0.9, V: 4.9, E1: 1.9, E2: 7.9, E3: 1.7, E4: 8.9 };
  }
  var expr = "\\((" + fmtD(P.a) + " - (" + FR(P.fn, P.fd) + " + " + fmtD(P.c) + ")) \\div " + P.d + " \\times " + P.e + " + " + fmtD(P.f) + " \\div " + P.g + "\\)";
  var prompt = "Calcule : " + expr;
  var steps = "\\[ \\begin{aligned} (" + fmtD(P.a) + " - (" + FR(P.fn, P.fd) + " + " + fmtD(P.c) + ")) \\div " + P.d + " \\times " + P.e + " + " + fmtD(P.f) + " \\div " + P.g + " &= (" + fmtD(P.a) + " - " + fmtD(P.S) + ") \\div " + P.d + " \\times " + P.e + " + " + fmtD(P.f) + " \\div " + P.g + " \\\\ &= " + fmtD(P.D) + " \\div " + P.d + " \\times " + P.e + " + " + fmtD(P.q2) + " \\\\ &= " + fmtD(P.q1) + " \\times " + P.e + " + " + fmtD(P.q2) + " \\\\ &= " + fmtD(P.q1 * P.e) + " + " + fmtD(P.q2) + " \\\\ &= " + fmtD(P.V) + " \\end{aligned} \\]";
  var solution = "Fais d'abord les parenthèses intérieures, puis les divisions et les multiplications de gauche à droite, puis l'addition : " + steps + " La valeur est donc <b>" + fmtD(P.V) + "</b>.";
  var errs = [
    { t: fmtD(u1round(P.E1, 2)), fb: "Cela multiplie " + P.d + " by " + P.e + " avant de diviser, mais les divisions et les multiplications se font de gauche à droite, et ici la division vient en premier." },
    { t: fmtD(u1round(P.E2, 2)), fb: "Cela commence la parenthèse extérieure avant de finir les parenthèses intérieures, donc la soustraction utilise un mauvais montant." },
    { t: fmtD(u1round(P.E3, 2)), fb: "Cela additionne " + fmtD(P.f) + " avant la division finale, mais la division se fait avant l'addition." },
    { t: fmtD(u1round(P.E4, 2)), fb: "Cela additionne le montant des parenthèses à " + fmtD(P.a) + " au lieu de le soustraire : c'est une erreur de signe." }
  ];
  var selDs = fmtPairDsD(fmtD(P.V), shuffle(errs).slice(0, 3).map(function (e) { return { v: parseFloat(String(e.t).replace(/[\s\u00A0]/g, "").replace(",", ".")), fb: e.fb }; }));
  return mcq(prompt,
    { t: fmtD(P.V), fb: "Exact. On fait d'abord les parenthèses intérieures, puis les divisions et les multiplications de gauche à droite." },
    selDs,
    solution, { mode: "ooo-brackets", a: P.a, c: P.c, d: P.d, e: P.e, f: P.f, g: P.g });
}, ["Fais d'abord les parenthèses les plus intérieures, puis fais les divisions et les multiplications de gauche à droite.", "Additionne d'abord la fraction et le nombre décimal dans les parenthèses intérieures."]);

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
    var keys = [V, EL, ED, EM].map(function (x) { return fmtDF(u1round(x, places), places); });
    if (new Set(keys).size < 4) continue;
    P = { nm: nm, a: a, b: b, c: c, d: d, e: e, f: f, places: places, S: S, Q: Q, V: V, EL: EL, ED: ED, EM: EM };
  }
  if (!P) {
    P = { nm: "Alex", a: 2.5, b: 1.5, c: 4.7, d: 4, e: 3, f: 1.2, places: 2, S: 6.2, Q: 1.55, V: 5.95, EL: 5.325, ED: 6.325, EM: 6.1 };
  }
  var ans = u1round(P.V, P.places);
  var expr = "\\(" + fmtD(P.a) + " + (" + fmtD(P.b) + " + " + fmtD(P.c) + ") \\div " + P.d + " \\times " + P.e + " - " + fmtD(P.f) + "\\)";
  var prompt = P.nm + " entre toute l'expression dans une calculatrice en une seule saisie : " + expr + " Quelle valeur la calculatrice affiche-t-elle, arrondie à " + P.places + " décimale" + (P.places > 1 ? "s" : "") + "?";
  var steps = "\\[ \\begin{aligned} " + fmtD(P.a) + " + (" + fmtD(P.b) + " + " + fmtD(P.c) + ") \\div " + P.d + " \\times " + P.e + " - " + fmtD(P.f) + " &= " + fmtD(P.a) + " + " + fmtD(P.S) + " \\div " + P.d + " \\times " + P.e + " - " + fmtD(P.f) + " \\\\ &= " + fmtD(P.a) + " + " + fmtD(P.Q, 4) + " \\times " + P.e + " - " + fmtD(P.f) + " \\\\ &= " + fmtD(P.a) + " + " + fmtD(P.Q * P.e, 4) + " - " + fmtD(P.f) + " \\\\ &= " + fmtD(P.V, 4) + " \\end{aligned} \\]";
  var solution = "La calculatrice suit la priorité des opérations, les parenthèses d'abord, et garde la pleine précision jusqu'à la fin : " + steps + " Arrondie à " + P.places + " décimale" + (P.places > 1 ? "s" : "") + ", la calculatrice affiche <b>" + fmtDF(ans, P.places) + "</b>.";
  return mcq(prompt,
    { t: fmtDF(ans, P.places), fb: "Exact. La calculatrice suit la priorité des opérations et arrondit seulement à la fin." },
    [
      { t: fmtDF(u1round(P.EL, P.places), P.places), fb: "C'est le résultat si on entre les nombres strictement de gauche à droite en ignorant les parenthèses." },
      { t: fmtDF(u1round(P.ED, P.places), P.places), fb: "Cela enlève les parenthèses autour de la somme, donc seul " + fmtD(P.c) + " est divisé par " + P.d + " au lieu de toute la somme." },
      { t: fmtDF(u1round(P.EM, P.places), P.places), fb: "Cela arrondit le quotient à " + (P.places === 2 ? "1 décimale" : "l'entier le plus proche") + " avant de multiplier, au lieu d'arrondir seulement la réponse finale." }
    ],
    solution, { mode: "ooo-calc-display", a: P.a, b: P.b, c: P.c, d: P.d, e: P.e, f: P.f, places: P.places });
}, ["Une calculatrice suit la priorité des opérations quand on entre toute l'expression en une seule saisie.", "Calcule d'abord la somme entre parenthèses, et garde la pleine précision jusqu'à l'arrondi final."]);

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
      errText = "L'élève a additionné avant de multiplier à la première étape, mais la multiplication se fait avant l'addition.";
      e1fb = "Cela regroupe la soustraction avec la multiplication, ce qui change la priorité des opérations.";
      e2fb = "Cela additionne le dernier nombre au lieu de le soustraire.";
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
      worked = exprM + " &= (" + (a1 * b1) + " + " + c1 + ") \\div " + d1 + " \\\\ &= " + fmtD(wrongVal);
      solSteps = exprM + " &= " + a1 + " \\times " + S1 + " \\div " + d1 + " \\\\ &= " + correctVal;
      errText = "L'élève a multiplié avant de calculer les parenthèses, mais les parenthèses se font en premier.";
      e1fb = "Cela enlève complètement les parenthèses, donc seul " + c1 + " est divisé par " + d1 + ".";
      e2fb = "Cela multiplie par " + d1 + " à la fin au lieu de diviser par ce nombre.";
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
      errText = "L'élève a soustrait avant de diviser, mais la division se fait avant la soustraction.";
      e1fb = "Cela soustrait aussi le produit, mais l'expression l'additionne.";
      e2fb = "Cela calcule strictement de gauche à droite et multiplie à la fin, au lieu de multiplier avant d'additionner.";
      tag = "errval-sub-first";
    } else {
      var a3 = ri(15, 40) / 2, b3 = ri(1, 10), c3 = ri(1, 10), d3 = ri(2, 9);
      var S3 = b3 + c3;
      if (a3 <= S3) continue;
      correctVal = (a3 - S3) * d3;
      wrongVal = (a3 - b3 + c3) * d3;
      e1Val = a3 - S3 * d3;
      e2Val = (a3 - S3) + d3;
      exprM = "(" + fmtD(a3) + " - (" + b3 + " + " + c3 + ")) \\times " + d3;
      worked = exprM + " &= (" + fmtD(a3 - b3) + " + " + c3 + ") \\times " + d3 + " \\\\ &= " + fmtD(a3 - b3 + c3) + " \\times " + d3 + " \\\\ &= " + fmtD(wrongVal);
      solSteps = exprM + " &= (" + fmtD(a3) + " - " + S3 + ") \\times " + d3 + " \\\\ &= " + fmtD(a3 - S3) + " \\times " + d3 + " \\\\ &= " + fmtD(correctVal);
      errText = "L'élève a commencé la parenthèse extérieure avant de finir les parenthèses intérieures, mais les parenthèses les plus intérieures se font en premier.";
      e1fb = "Cela enlève les parenthèses extérieures et multiplie la somme intérieure avant de soustraire.";
      e2fb = "Cela additionne le dernier nombre au lieu de multiplier par ce nombre.";
      tag = "errval-outer-first";
    }
    var keys = [correctVal, wrongVal, e1Val, e2Val].map(function (x) { return fmtD(u1round(x, 2)); });
    if (new Set(keys).size < 4) continue;
    R = { exprM: exprM, worked: worked, solSteps: solSteps, correctVal: correctVal, wrongVal: wrongVal, e1Val: e1Val, e2Val: e2Val, e1fb: e1fb, e2fb: e2fb, errText: errText, tag: tag };
  }
  if (!R) {
    R = {
      exprM: "4 + 3 \\times 5 - 2",
      worked: "4 + 3 \\times 5 - 2 &= 7 \\times 5 - 2 \\\\ &= 35 - 2 \\\\ &= 33",
      solSteps: "4 + 3 \\times 5 - 2 &= 4 + 15 - 2 \\\\ &= 17",
      correctVal: 17, wrongVal: 33, e1Val: 13, e2Val: 21,
      e1fb: "Cela regroupe la soustraction avec la multiplication, ce qui change la priorité des opérations.",
      e2fb: "Cela additionne le dernier nombre au lieu de le soustraire.",
      errText: "L'élève a additionné avant de multiplier à la première étape, mais la multiplication se fait avant l'addition.",
      tag: "errval-add-first"
    };
  }
  var prompt = "Le travail d'un élève pour une expression est montré ci-dessous. \\[ \\begin{aligned} " + R.worked + " \\end{aligned} \\] Quelle est la bonne valeur de l'expression ?";
  var solution = R.errText + " Fait correctement : \\[ \\begin{aligned} " + R.solSteps + " \\end{aligned} \\] La bonne valeur est donc <b>" + fmtD(R.correctVal) + "</b>.";
  return mcq(prompt,
    { t: fmtD(R.correctVal), fb: "Exact. Refait dans le bon ordre, l'expression donne cette valeur." },
    [
      { t: fmtD(u1round(R.wrongVal, 2)), fb: "C'est la valeur dans le travail de l'élève, qui contient l'erreur de priorité des opérations." },
      { t: fmtD(u1round(R.e1Val, 2)), fb: R.e1fb },
      { t: fmtD(u1round(R.e2Val, 2)), fb: R.e2fb }
    ],
    solution, { mode: R.tag, scen: scen });
}, ["Compare les étapes de l'élève avec la priorité des opérations pour repérer où l'ordre est faux.", "Refais l'expression toi-même : les parenthèses d'abord, puis les multiplications et les divisions, puis les additions et les soustractions."]);

/* ----- bank-u2-topup.js ----- */
// Math 9 (French) Unit 2 top-up question bank
// Cut verbatim from the standalone bank source
// (math-9-review-fr/bank-src.js, lines 1809 to 1990).
/* Top-up tranche (November 7, 2026): Unit 2 additions from tranche1/unit2-topup.js */
/* Unit 2 top-up tranche: five companion entries. Helpers u2gcd, u2r1, u2r2,
   u2d3 and u2nonSquare are defined in unit2.js and the assembled bank. */

E("u2-sqrt-fraction", 2, ["6.9"], 1, "gen", function(){
  if(pick(["fraction","decimal"])==="fraction"){
    var a=ri(2,15), b=ri(2,15), g=0;
    while(u2gcd(a,b)!==1&&g<60){a=ri(2,15);b=ri(2,15);g++;}
    var correct="\\("+FR(a,b)+"\\)";
    var cands=[
      {t:"\\("+FR(a,b*b)+"\\)", fb:"Cela prend la racine du haut seulement : il faut aussi prendre la racine du bas."},
      {t:"\\("+FR(a*a,b)+"\\)", fb:"Cela prend la racine du bas seulement : il faut aussi prendre la racine du haut."},
      {t:"\\("+FR(a+1,b)+"\\)", fb:"En le mettant au carré, on obtient un haut de "+((a+1)*(a+1))+", et non "+(a*a)+" : vérifie les deux parties."},
      {t:"\\("+FR(a,b+1)+"\\)", fb:"En le mettant au carré, on obtient un bas de "+((b+1)*(b+1))+", et non "+(b*b)+" : vérifie les deux parties."},
      {t:"\\("+FR(a+1,b+1)+"\\)", fb:"En le mettant au carré, on change les deux parties : compare chaque partie avec celle montrée."}
    ];
    var opts=[], seen={};
    for(var i=0;i<cands.length&&opts.length<3;i++){if(cands[i].t!==correct&&!seen[cands[i].t]){seen[cands[i].t]=1;opts.push(cands[i]);}}
    var q = mcq("Que vaut \\(\\sqrt{"+FR(a*a,b*b)+"}\\) ? Donne la valeur exacte.", {t:correct, fb:"Oui : "+a+" au carré donne "+(a*a)+" et "+b+" au carré donne "+(b*b)+"."}, opts,
      "Prends la racine du haut et du bas séparément : \\[ \\begin{aligned} \\sqrt{"+FR(a*a,b*b)+"} &= "+FR(a,b)+" \\end{aligned} \\] La racine carrée est <b>\\("+FR(a,b)+"\\)</b>.",
      {mode:"fraction", a:a, b:b});
    q.figure = solSquare((a*a)+"/"+(b*b), "?", "Carré avec l'aire étiquetée et le côté inconnu");
    return q;
  }
  var k=ri(3,39); var rd=u2r1(k/10); var nd=u2r2(rd*rd);
  var dc=u2d3(rd,[u2r1(rd+0.1),u2r1(rd-0.1),u2r1(rd*2),u2r1(rd+0.2),u2r1(rd/2),u2r1(rd+1)]);
  var dopts=fmtPairDsD(fmtD(rd), dc.map(function(d){return {v:d, fb:fmtD(d)+" au carré donne "+fmtD(u2r2(d*d))+", et non "+fmtD(nd)+" : essaie un autre dixième."};}));
  var q = mcq("Que vaut \\(\\sqrt{"+fmtD(nd)+"}\\) ? Donne la valeur exacte.", {t:fmtD(rd), fb:"Oui : "+fmtD(rd)+" fois "+fmtD(rd)+" donne "+fmtD(nd)+"."}, dopts,
    "Trouve le nombre décimal qui, multiplié par lui-même, donne "+fmtD(nd)+": \\[ \\begin{aligned} "+fmtD(rd)+" \\times "+fmtD(rd)+" &= "+fmtD(nd)+" \\\\ \\sqrt{"+fmtD(nd)+"} &= "+fmtD(rd)+" \\end{aligned} \\] La racine carrée est <b>"+fmtD(rd)+"</b>.",
    {mode:"decimal", n:nd});
  q.figure = solSquare(fmtD(nd), "?", "Carré avec l'aire étiquetée et le côté inconnu");
  return q;
}, ["Pour une fraction, prends la racine du haut et du bas séparément ; pour un nombre décimal, cherche parmi les dixièmes.", "Demande-toi quel nombre, multiplié par lui-même, donne exactement la valeur sous le signe de racine."]);

E("u2-number-from-root", 2, ["6.11"], 1, "gen", function(){
  if(pick(["fraction","decimal"])==="fraction"){
    var p=ri(2,12), q=ri(2,12), g=0;
    while(u2gcd(p,q)!==1&&g<60){p=ri(2,12);q=ri(2,12);g++;}
    var correct="\\("+FR(p*p,q*q)+"\\)";
    var cands=[
      {t:"\\("+FR(2*p,q)+"\\)", fb:"C'est le double de la racine : mettre au carré veut dire multiplier la racine par elle-même, et non par 2."},
      {t:"\\("+FR(p,2*q)+"\\)", fb:"C'est la moitié de la racine : le nombre vient de la racine mise au carré, et non de la racine divisée par 2."},
      {t:"\\("+FR((p+1)*(p+1),q*q)+"\\)", fb:"Cela met au carré une fraction voisine : utilise la racine montrée, avec le haut "+p+" et le bas "+q+"."},
      {t:"\\("+FR(p*p,(q+1)*(q+1))+"\\)", fb:"Cela met au carré une fraction voisine : utilise la racine montrée, avec le haut "+p+" et le bas "+q+"."},
      {t:"\\("+FR(p*p,q)+"\\)", fb:"Seul le haut a été mis au carré : le bas doit aussi être mis au carré."}
    ];
    var opts=[], seen={};
    for(var i=0;i<cands.length&&opts.length<3;i++){if(cands[i].t!==correct&&!seen[cands[i].t]){seen[cands[i].t]=1;opts.push(cands[i]);}}
    var qq = mcq("Un nombre positif a pour racine carrée \\("+FR(p,q)+"\\) . Quel est ce nombre ?", {t:correct, fb:"Oui : mets le haut et le bas au carré séparément."}, opts,
      "Mettre au carré annule une racine carrée, et les deux parties sont mises au carré : \\[ \\begin{aligned} \\left("+FR(p,q)+"\\right)^{2} &= "+FR(p,q)+" \\times "+FR(p,q)+" \\\\ &= "+FR(p*p,q*q)+" \\end{aligned} \\] Le nombre est <b>\\("+FR(p*p,q*q)+"\\)</b>.",
      {mode:"fraction", p:p, q:q});
    qq.figure = solSquare("?", p+"/"+q, "Carré avec le côté étiqueté et l'aire inconnue");
    return qq;
  }
  var k=ri(4,29); var g2=0;
  while(k%10===0&&g2<40){k=ri(4,29);g2++;}
  var rd=u2r1(k/10); var nd=u2r2(rd*rd);
  var cands2=[
    {v:u2r2(2*rd), fb:"C'est le double de la racine : mettre au carré veut dire multiplier la racine par elle-même, et non par 2."},
    {v:u2r2((rd+0.1)*(rd+0.1)), fb:"Cela met au carré le dixième suivant vers le haut : utilise la racine montrée, "+fmtD(rd)+"."},
    {v:u2r2((rd-0.1)*(rd-0.1)), fb:"Cela met au carré le dixième suivant vers le bas : utilise la racine montrée, "+fmtD(rd)+"."},
    {v:u2r2(nd+1), fb:"Cela additionne 1 à la valeur au carré : multiplie simplement la racine par elle-même."},
    {v:u2r2(nd+0.1), fb:"C'est un peu plus que la racine mise au carré : multiplie la racine par elle-même exactement."}
  ];
  var dopts=[], seen2={};
  for(var j=0;j<cands2.length&&dopts.length<3;j++){var v=cands2[j].v; if(v!==nd&&v>0&&!seen2[v]){seen2[v]=1;dopts.push({v:v, fb:cands2[j].fb});}}
  dopts=fmtPairDsD(fmtD(nd), dopts);
  var q = mcq("Un nombre positif a pour racine carrée "+fmtD(rd)+". Quel est ce nombre ?", {t:fmtD(nd), fb:"Oui : "+fmtD(rd)+" fois "+fmtD(rd)+" donne "+fmtD(nd)+"."}, dopts,
    "Mettre au carré annule une racine carrée : \\[ \\begin{aligned} "+fmtD(rd)+"^{2} &= "+fmtD(rd)+" \\times "+fmtD(rd)+" \\\\ &= "+fmtD(nd)+" \\end{aligned} \\] Le nombre est <b>"+fmtD(nd)+"</b>.",
    {mode:"decimal", r:rd});
  q.figure = solSquare("?", fmtD(rd), "Carré avec le côté étiqueté et l'aire inconnue");
  return q;
}, ["Mettre au carré et prendre la racine carrée s'annulent, donc mets la racine donnée au carré.", "Multiplie la racine par elle-même ; pour une fraction, mets le haut et le bas au carré séparément."]);

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
    {v:trunc, fb:"Cette valeur est coupée après deux décimales : regarde la troisième décimale et arrondis vers le haut quand elle vaut 5 ou plus."},
    {v:onedp, fb:"Cette valeur est arrondie à une décimale : la question demande deux décimales."},
    {v:neigh, fb:"C'est la racine d'un nombre voisin : vérifie la valeur sous le signe de racine."},
    {v:u2r2(ans+0.01), fb:"C'est une petite erreur d'arrondi au dernier chiffre : vérifie la troisième décimale sur l'écran."},
    {v:u2r2(ans-0.01), fb:"C'est une petite erreur d'arrondi au dernier chiffre : vérifie la troisième décimale sur l'écran."},
    {v:u2r2(ans+0.02), fb:"C'est une petite erreur d'arrondi au dernier chiffre : vérifie la troisième décimale sur l'écran."},
    {v:u2r2(ans-0.02), fb:"C'est une petite erreur d'arrondi au dernier chiffre : vérifie la troisième décimale sur l'écran."}
  ];
  var opts=[], seen={};
  for(var i=0;i<cands.length&&opts.length<3;i++){var v=cands[i].v; if(v!==ans&&v>0&&!seen[v]){seen[v]=1;opts.push({t:fmtDF(v,2), fb:cands[i].fb});}}
  return mcq("Utilise une calculatrice. Que vaut \\(\\sqrt{"+label+"}\\), à deux décimales ?", {t:fmtDF(ans,2), fb:"Oui : la troisième décimale décide de l'arrondi, et elle arrondit à "+fmtDF(ans,2)+"."}, opts,
    "Une calculatrice donne la racine, et la troisième décimale décide de l'arrondi : \\[ \\begin{aligned} \\sqrt{"+label+"} &\\approx "+fmtD(root)+" \\\\ &\\approx "+fmtDF(ans,2)+" \\end{aligned} \\] À deux décimales, la racine carrée est <b>"+fmtDF(ans,2)+"</b>.",
    {mode:isFrac?"fraction":"whole", val:val});
}, ["Utilise une calculatrice pour la racine, puis arrondis l'affichage à deux décimales.", "Lis le troisième chiffre décimal : il te dit si la deuxième décimale reste ou augmente."]);

E("u2-approx-explain-gen", 2, ["6.7"], 1, "gen", function(){
  var N=u2nonSquare(2,99);
  var places=pick([2,3,4]);
  var shown=Math.round(Math.sqrt(N)*Math.pow(10,places))/Math.pow(10,places);
  var shS=fmtDF(shown,places);
  var sq=shown*shown;
  var frame=pick(["screen","student","project"]);
  var prompt;
  if(frame==="screen"){prompt="Une calculatrice montre \\(\\sqrt{"+N+"} \\approx "+shS+"\\). Pourquoi la valeur sur l'écran est-elle une approximation ?";}
  else if(frame==="student"){prompt="Un élève dit que la valeur exacte de \\(\\sqrt{"+N+"}\\) est "+shS+", la valeur sur l'écran de la calculatrice. Pourquoi l'élève a-t-il tort ?";}
  else {prompt="Pour un projet, un élève utilise "+shS+" comme valeur de \\(\\sqrt{"+N+"}\\). Pourquoi "+shS+" est-elle appelée une approximation ?";}
  return mcq(prompt,
    {t:"Mettre "+shS+" au carré ne donne pas exactement "+N+", parce que la vraie racine continue après les chiffres montrés", fb:"C'est juste : "+shS+" au carré donne "+fmtD(sq)+", près de "+N+" mais pas égal à lui."},
    [{t:"La calculatrice a fait une erreur de calcul en trouvant la racine de "+N+", donc on ne peut pas se fier à ses chiffres", fb:"La calculatrice fonctionne bien : la limite est le nombre de chiffres qu'elle peut montrer."},
     {t:"La valeur est exacte, parce qu'une racine montrée à "+places+" décimales donne tous ses chiffres au complet", fb:"Plus de décimales veut quand même dire arrondi : les chiffres de cette racine continuent après elles."},
     {t:"Le nombre "+N+" n'a pas de racine carrée du tout, donc l'écran ne peut montrer qu'une estimation à sa place", fb:N+" a bien une racine carrée : elle ne se termine jamais et ne se répète jamais comme nombre décimal."}],
    "La valeur montrée est arrondie, et la mettre au carré montre l'écart : \\[ \\begin{aligned} ("+shS+")^{2} &= "+fmtD(sq)+" \\\\ &\\ne "+N+" \\end{aligned} \\] Parce que son carré n'est pas exactement "+N+", la valeur montrée est <b>une approximation, et non la racine exacte</b>.",
    {mode:frame, N:N, places:places});
}, ["Demande-toi si mettre la valeur montrée au carré redonne exactement le nombre de départ.", "Mets la valeur montrée au carré et compare-la avec le nombre sous le signe de racine."]);

E("u2-overlap-pair", 2, ["9.1"], 3, "gen", function(){
  if(pick(["tri-on-rect","cyl-on-tri"])==="tri-on-rect"){
    var tr=pick([[3,4,5],[6,8,10],[5,12,13],[8,15,17],[9,12,15]]);
    var a=tr[0], b=tr[1], c=tr[2];
    var l=ri(6,14), h=ri(3,9), w=a;
    var boxSA=2*(l*w+l*h+w*h);
    var triSA=a*b+(a+b+c)*l;
    var contact=a*l;
    var tot=boxSA+triSA-2*contact;
    var q = numq("Un modèle est bâti en joignant deux solides face à face. Le solide du bas est un prisme rectangulaire droit de "+l+" cm de long, "+w+" cm de large et "+h+" cm de haut. Au-dessus se trouve un prisme triangulaire droit, un prisme avec des bouts en triangle rectangle et des côtés rectangulaires. Ses bouts triangulaires ont des cathètes de "+a+" cm et "+b+" cm et une hypoténuse de "+c+" cm ; le prisme mesure "+l+" cm de long, et sa face du bas, "+a+" cm sur "+l+" cm, couvre exactement la face du haut du prisme du bas. La face où les deux solides se joignent est cachée dans le modèle. Trouve l'aire de la surface du modèle, en centimètres carrés.", tot, 0.01,
      "Le chevauchement est le rectangle de "+a+" cm sur "+l+" cm où les deux prismes se joignent. C'est une face de chaque solide, donc elle est cachée deux fois et elle s'enlève des deux aires totales : \\[ \\begin{aligned} \\text{chevauchement} &= "+a+" \\times "+l+" = "+contact+" \\\\ AS &= "+boxSA+" + "+triSA+" - 2("+contact+") \\\\ &= "+tot+" \\end{aligned} \\] L'aire de la surface est <b>"+tot+" cm\\(^{2}\\)</b>.",
      {mode:"tri-on-rect", a:a, b:b, c:c, l:l, h:h});
    q.figure = solBoxTri(a, b, c, l, a, h, fmtD(a) + " cm", fmtD(b) + " cm", fmtD(c) + " cm", fmtD(l) + " cm", "", fmtD(h) + " cm", "Prisme triangulaire sur une boîte avec des dimensions étiquetées");
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
  var q = numq("Un cylindre droit se trouve sur un prisme triangulaire droit, un prisme avec des bouts en triangle rectangle et des côtés rectangulaires. Les bouts triangulaires ont des cathètes de "+a2+" cm et "+b2+" cm et une hypoténuse de "+c2+" cm, et le prisme mesure "+L+" cm de long. Le cylindre a un rayon de "+r+" cm et une hauteur de "+hc+" cm, et il se trouve sur la face rectangulaire du prisme qui mesure "+a2+" cm sur "+L+" cm, avec toute sa base sur cette face. La partie où les deux solides se touchent est cachée dans l'objet fini. Trouve l'aire de la surface, en centimètres carrés. Utilise \\(\\pi = 3,14\\) et donne ta réponse à une décimale.", tot2, 0.6,
    "Le chevauchement est le cercle où le cylindre rencontre le prisme. Il est caché sur la face du prisme et c'est la base du cylindre, donc son aire s'enlève deux fois : \\[ \\begin{aligned} \\text{chevauchement} &= 3,14 \\times "+r+"^{2} = "+fmtD(circ)+" \\\\ AS &= "+triSA2+" + "+fmtD(cylSA)+" - 2("+fmtD(circ)+") \\\\ &= "+fmtD(tot2)+" \\end{aligned} \\] L'aire de la surface est <b>"+fmtD(tot2)+" cm\\(^{2}\\)</b>.",
    {mode:"cyl-on-tri", a:a2, b:b2, c:c2, L:L, r:r, hc:hc});
    q.figure = solCylOnTri(a2, b2, c2, L, r, hc, fmtD(a2) + " cm", fmtD(b2) + " cm", fmtD(c2) + " cm", fmtD(L) + " cm", fmtD(r) + " cm", fmtD(hc) + " cm", "Cylindre sur un prisme triangulaire avec des dimensions étiquetées");
    return q;
}, ["Additionne d'abord les aires totales des deux solides séparés, puis occupe-toi du joint.", "Trouve l'aire de la face où les solides se touchent, et soustrais-la deux fois parce qu'elle est cachée sur les deux solides."]);

/* TRANSLATOR NOTES
 * Judgement calls (glossary silent): "product law" = "loi du produit",
 * "quotient law" = "loi du quotient", "power of a power law" = "loi de
 * la puissance d'une puissance" (same choices as chunkB-fr); "pattern"
 * (exponent pattern) = "régularité"; "brackets" = "parenthèses"; "first
 * power" rendered "puissance d'exposant 1"; "dot model" = "modèle de
 * points"; "layer" = "couche"; "algebra tile" = "tuile algébrique",
 * unit tile = "tuile unité", x squared tile = "tuile x au carré";
 * "dividend / divisor / quotient" = "dividende / diviseur / quotient";
 * "blank" (missing term) = "espace vide".
 * In u4-tiles-figure-build, makeAction keeps the internal verb and sign
 * tokens ("Add"/"Remove", "positive"/"negative") unchanged because other
 * code compares them; makeAction alone maps them to French display text
 * ("Ajoute"/"Retire", "positive(s)"/"négative(s)") and puts the tile
 * noun before the kind and sign words, as French word order requires.
 * No other logic, comparisons or mode strings were changed.
 * FMT-GEOM lines left (fmt( kept, each marked with an FMT-GEOM comment
 * on its line): the <text> x/y coordinate calls in u4tTiles (1 line) and
 * u4tArea (4 lines). The visible text labels built in u4tArea (monoLab,
 * part1, part2, totalLab) DO use fmtD, per the rule for visible labels.
 * Literal formatted numbers written into static prose (for later guide
 * reconciliation): no decimal, thousands, percent or dollar literals
 * occur in this chunk. The TeX spacing \hspace{1.2cm} in
 * u4-divide-missing-term is a length, not a displayed number, and was
 * left byte-identical. Plain integer literals in option text and worked
 * solutions (p. ex. 16, 8, "3 par 3") are unchanged digits; generated
 * numbers are routed through fmtD wherever they are generated.
 * Unsure: "tuile unité" for unit tile and the "compte des tuiles"
 * phrasing in u4-tiles-figure-build feedback follow classroom usage;
 * guides to confirm. The SVG aria-label in u4tArea uses a typographic
 * apostrophe in "d’aire" because that JS string is single-quoted.
 */

/* ----- bank-u3-topup.js ----- */
// Math 9 (French) Unit 3 top-up question bank
// Cut verbatim from the standalone bank source
// (math-9-review-fr/bank-src.js, lines 1991 to 2471).
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
  if (d === 1) return fmtD(n);
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
    altFb = "Cela enlève le signe négatif de chaque facteur. La base est négative.";
  } else if (mode === "frac") {
    var f = pick(u3tFracs);
    factor = "(" + u3tFracInner(f[0], f[1]) + ")";
    powerInner = "(" + u3tFracInner(f[0], f[1]) + ")^{" + e + "}";
    altFactor = "(" + u3tFracInner(f[1], f[0]) + ")";
    altFb = "Cela échange le numérateur et le dénominateur de la base.";
  } else {
    var f2 = pick(u3tFracsSmall);
    e = ri(2, 3);
    factor = "(-" + u3tFracInner(f2[0], f2[1]) + ")";
    powerInner = "(-" + u3tFracInner(f2[0], f2[1]) + ")^{" + e + "}";
    altFactor = "(" + u3tFracInner(f2[0], f2[1]) + ")";
    altFb = "Cela enlève le signe négatif de chaque facteur. La base est négative.";
  }
  var correct = u3tMult(factor, e);
  var pool = [
    { t: u3tMult(factor, e + 1), fb: "Cela utilise un facteur de trop. Compte l'exposant." },
    { t: u3tMult(factor, e - 1), fb: "Cela utilise un facteur de moins. Compte l'exposant." },
    { t: u3tMult(altFactor, e), fb: altFb },
    { t: "\\(" + factor + "\\times " + e + "\\)", fb: "Cela multiplie la base par l'exposant une seule fois. Une puissance répète la base comme facteur." }
  ];
  var ds = [], seen = {}; seen[correct] = 1;
  for (var i = 0; i < pool.length && ds.length < 3; i++) { if (!seen[pool[i].t]) { seen[pool[i].t] = 1; ds.push(pool[i]); } }
  var stem = pick([
    "Comment écrit-on \\(" + powerInner + "\\) comme multiplication répétée ?",
    "Quelle multiplication répétée est égale à \\(" + powerInner + "\\)?",
    "Exprime \\(" + powerInner + "\\) comme multiplication répétée. Quel choix le montre ?"
  ]);
  return mcq(stem,
    { t: correct, fb: "Exact. Toute la base, signe compris, se répète autant de fois que l'exposant l'indique." }, ds,
    "La base est \\(" + factor + "\\) et l'exposant est \\(" + e + "\\), donc écris la base comme facteur \\(" + e + "\\) fois : \\[ \\begin{aligned} " + powerInner + " &= " + correct.replace("\\(", "").replace("\\)", "") + " \\end{aligned} \\] Donc la multiplication répétée est <b>" + correct + "</b>.",
    { mode: "topup-repeated-" + mode, e: e });
}, ["L'exposant te dit combien de fois toute la base apparaît comme facteur.", "Écris la base exactement comme elle apparaît, parenthèses et signe compris, puis répète-la."]);

E("u3-power-from-product", 3, ["3.7"], 1, "gen", function () {
  var mode = pick(["neg", "neg", "frac", "frac", "negfrac"]);
  var factor, correctInner, ds;
  if (mode === "neg") {
    var b = ri(2, 9), c = ri(2, 5);
    while (b === c) { b = ri(2, 9); }
    factor = "(-" + b + ")";
    correctInner = "(-" + b + ")^{" + c + "}";
    ds = [
      { t: "\\((-" + c + ")^{" + b + "}\\)", fb: "Cela échange la valeur de la base et le nombre de facteurs." },
      { t: "\\(" + b + "^{" + c + "}\\)", fb: "Cela enlève le signe négatif de la base." },
      { t: "\\((-" + b + ")^{" + (c + 1) + "}\\)", fb: "Cela ajoute un à l'exposant. Compte les facteurs montrés." }
    ];
  } else if (mode === "frac") {
    var f = pick(u3tFracs), c2 = ri(2, 4);
    factor = "(" + u3tFracInner(f[0], f[1]) + ")";
    correctInner = "(" + u3tFracInner(f[0], f[1]) + ")^{" + c2 + "}";
    ds = [
      { t: "\\((" + u3tFracInner(f[1], f[0]) + ")^{" + c2 + "}\\)", fb: "Cela échange le numérateur et le dénominateur de la base." },
      { t: "\\((" + u3tFracInner(f[0], f[1]) + ")^{" + (c2 + 1) + "}\\)", fb: "Cela ajoute un à l'exposant. Compte les facteurs montrés." },
      { t: "\\((" + u3tFracInner(f[0], f[1]) + ")^{" + (c2 - 1) + "}\\)", fb: "Cela soustrait un de l'exposant. Compte les facteurs montrés." }
    ];
    var cc = c2;
  } else {
    var f2 = pick(u3tFracsSmall), c3 = ri(2, 3);
    factor = "(-" + u3tFracInner(f2[0], f2[1]) + ")";
    correctInner = "(-" + u3tFracInner(f2[0], f2[1]) + ")^{" + c3 + "}";
    ds = [
      { t: "\\((" + u3tFracInner(f2[0], f2[1]) + ")^{" + c3 + "}\\)", fb: "Cela enlève le signe négatif de la base." },
      { t: "\\((-" + u3tFracInner(f2[0], f2[1]) + ")^{" + (c3 + 1) + "}\\)", fb: "Cela ajoute un à l'exposant. Compte les facteurs montrés." },
      { t: "\\((-" + u3tFracInner(f2[1], f2[0]) + ")^{" + c3 + "}\\)", fb: "Cela échange le numérateur et le dénominateur de la base." }
    ];
    var cc2 = c3;
  }
  var count = (mode === "neg") ? c : (mode === "frac" ? cc : cc2);
  var shown = u3tMult(factor, count);
  var stem = pick([
    "Comment écrit-on " + shown + " comme une seule puissance ?",
    "Quelle puissance unique est égale à " + shown + " ?",
    "Exprime " + shown + " comme une seule puissance. Quel choix le montre ?"
  ]);
  return mcq(stem,
    { t: "\\(" + correctInner + "\\)", fb: "Exact. Le facteur répété est la base et le nombre de facteurs est l'exposant." }, ds,
    "Il y a \\(" + count + "\\) facteurs, et chaque facteur est \\(" + factor + "\\), donc la puissance est \\(" + correctInner + "\\). \\[ \\begin{aligned} " + shown.replace("\\(", "").replace("\\)", "") + " &= " + correctInner + " \\end{aligned} \\] Donc la puissance unique est <b>\\(" + correctInner + "\\)</b>.",
    { mode: "topup-from-product-" + mode, count: count });
}, ["Compte d'abord les facteurs. Ce nombre devient l'exposant.", "Écris le facteur répété exactement comme base, signe compris, puis utilise ton nombre comme exposant."]);

E("u3-evaluate-power-neg", 3, ["3.10"], 1, "gen", function () {
  var mode = pick(["neg", "neg", "one", "negone", "frac"]);
  var stemVerb = pick(["Calcule", "Que vaut", "Trouve la valeur de"]);
  if (mode === "frac") {
    var f = pick([[1, 2], [1, 3], [2, 3], [3, 4], [1, 4], [2, 5], [3, 5], [1, 5], [5, 6], [3, 8]]);
    var e = ri(2, 3);
    var vn = Math.pow(f[0], e), vd = Math.pow(f[1], e);
    var correct = u3tFracOpt(vn, vd);
    var poolF = [
      { n: -vn, d: vd, fb: "Cela a le mauvais signe. La base est positive, donc la valeur est positive." },
      { n: Math.pow(f[0], e), d: f[1], fb: "Cela élève seulement le numérateur de la fraction à la puissance. Le dénominateur est élevé aussi." },
      { n: f[0], d: Math.pow(f[1], e), fb: "Cela élève seulement le dénominateur de la fraction à la puissance. Le numérateur est élevé aussi." },
      { n: f[0] * e, d: f[1], fb: "Cela multiplie la base par l'exposant. Une puissance répète la base comme facteur." },
      { n: vd, d: vn, fb: "Cela retourne la fraction. Garde le numérateur et le dénominateur en place." }
    ];
    var dsF = [], seenF = {}; seenF[u3tRed(vn, vd).join("/")] = 1;
    for (var i = 0; i < poolF.length && dsF.length < 3; i++) {
      var key = u3tRed(poolF[i].n, poolF[i].d).join("/");
      if (!seenF[key]) { seenF[key] = 1; dsF.push({ t: u3tFracOpt(poolF[i].n, poolF[i].d), fb: poolF[i].fb }); }
    }
    var shownF = "(" + u3tFracInner(f[0], f[1]) + ")^{" + e + "}";
    return mcq(stemVerb + " \\(" + shownF + "\\).",
      { t: correct, fb: "Exact. Le numérateur et le dénominateur de la fraction sont tous les deux élevés à la puissance." }, dsF,
      "Élève le numérateur et le dénominateur séparément : \\[ \\begin{aligned} " + shownF + " &= \\frac{" + f[0] + "^{" + e + "}}{" + f[1] + "^{" + e + "}} \\\\ &= \\frac{" + vn + "}{" + vd + "} \\end{aligned} \\] Donc la valeur est <b>" + correct + "</b>.",
      { mode: "topup-eval-frac", n: f[0], d: f[1], e: e });
  }
  var base, e2, val, shown;
  if (mode === "neg") { var b = ri(2, 9); e2 = ri(2, 5); base = -b; val = Math.pow(-b, e2); shown = "(-" + b + ")^{" + e2 + "}"; }
  else if (mode === "one") { base = 1; e2 = ri(2, 9); val = 1; shown = "1^{" + e2 + "}"; }
  else { base = -1; e2 = ri(2, 12); val = (e2 % 2 === 0) ? 1 : -1; shown = "(-1)^{" + e2 + "}"; }
  var pool = [
    { v: -val, fb: "Cela a le signe opposé. Compte combien de facteurs négatifs sont multipliés." },
    { v: base * e2, fb: "Cela multiplie la base par l'exposant. Une puissance répète la base comme facteur." },
    { v: 0, fb: "Cela donne zéro. Une puissance d'une base non nulle n'est jamais zéro ici." },
    { v: val + base, fb: "C'est proche, mais faux. Développe la puissance en multiplication répétée." },
    { v: -Math.abs(val), fb: "Cela force une réponse négative. Un nombre pair de facteurs négatifs donne un produit positif." },
    { v: Math.abs(val), fb: "Cela enlève le signe. Un nombre impair de facteurs négatifs donne un produit négatif." },
    { v: base + e2, fb: "Cela additionne la base et l'exposant. Utilise la multiplication répétée." }
  ];
  var ds = [], seen = {}; seen[String(val)] = 1;
  for (var j = 0; j < pool.length && ds.length < 3; j++) { if (!seen[String(pool[j].v)]) { seen[String(pool[j].v)] = 1; ds.push({ t: fmtD(pool[j].v), fb: pool[j].fb }); } }
  var factors = [];
  for (var k = 0; k < Math.min(e2, 5); k++) factors.push("(" + base + ")");
  var expand = (e2 > 5) ? "(" + base + ")\\times (" + base + ")\\times \\cdots \\times (" + base + ")" : factors.join("\\times ");
  var signNote = (mode === "one") ? "Chaque facteur est 1, donc le produit reste 1." : ((e2 % 2 === 0) ? "L'exposant est pair, donc les facteurs négatifs se regroupent en un produit positif." : "L'exposant est impair, donc il reste un facteur négatif et le produit est négatif.");
  return mcq(stemVerb + " \\(" + shown + "\\).",
    { t: fmtD(val), fb: "Exact. Tu as développé la puissance et bien géré le signe." }, ds,
    signNote + " \\[ \\begin{aligned} " + shown + " &= " + expand + " \\\\ &= " + fmtD(val) + " \\end{aligned} \\] Donc la valeur est <b>" + fmtD(val) + "</b>.",
    { mode: "topup-eval-" + mode, base: base, e: e2 });
}, ["Développe d'abord la puissance en multiplication répétée, et surveille le signe de chaque facteur.", "Multiplie la base par elle-même, en utilisant l'exposant comme nombre de fois, puis règle le signe."]);

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
  s += '<text x="' + (w / 2) + '" y="' + (h - 6) + '" text-anchor="middle" font-size="13" fill="#17352a">' + a + ' couches, chacune de ' + a + ' par ' + a + '</text>';
  return s + '</svg>';
}
function u3tFig(q, fig) { q.figure = fig; return q; }
function u3tPowOpt(a, e) { return "\\(" + a + "^{" + e + "}\\)"; }

E("u3-power-model-var", 3, ["3.4"], 1, "var", varset([
  function () {
    var q = mcq("Convention du modèle de points : une puissance carrée est représentée par une grille, avec la base comme nombre de points le long d'un côté et l'exposant 2 comme les deux dimensions de la grille, les rangées et les colonnes. Quelle puissance ce modèle montre-t-il ?",
      { t: u3tPowOpt(3, 2), fb: "Exact. Le côté a 3 points et la grille a 2 dimensions." },
      [
        { t: u3tPowOpt(2, 3), fb: "Cela échange la base et l'exposant. Le nombre de points sur un côté est la base." },
        { t: u3tPowOpt(3, 3), fb: "Cela utilise aussi 3 comme exposant. Une grille plate a 2 dimensions." },
        { t: u3tPowOpt(3, 1), fb: "Cela utilise l'exposant 1. Une grille est faite de deux dimensions égales." }
      ],
      "Compte les points le long d'un côté et compte les dimensions : \\[ \\begin{aligned} \\text{côté} &= 3 \\text{ points} \\\\ \\text{dimensions} &= 2 \\end{aligned} \\] La base est le nombre de points sur un côté, 3, et l'exposant est le nombre de dimensions, 2. Donc le modèle montre <b>\\(3^{2}\\)</b>.",
      { mode: "model-grid-3" });
    return u3tFig(q, u3tGrid(3, 3));
  },
  function () {
    var q = mcq("Convention du modèle de points : une puissance carrée est représentée par une grille, avec la base comme nombre de points le long d'un côté et l'exposant 2 comme les deux dimensions de la grille, les rangées et les colonnes. Quelle puissance ce modèle montre-t-il ?",
      { t: u3tPowOpt(4, 2), fb: "Exact. Le côté a 4 points et la grille a 2 dimensions." },
      [
        { t: u3tPowOpt(2, 4), fb: "Cela échange la base et l'exposant. Le nombre de points sur un côté est la base." },
        { t: u3tPowOpt(4, 3), fb: "Cela utilise l'exposant 3, ce qui demanderait des couches. Ce modèle est une seule grille plate." },
        { t: u3tPowOpt(4, 1), fb: "Cela utilise l'exposant 1. Une grille est faite de deux dimensions égales." }
      ],
      "Compte les points le long d'un côté et compte les dimensions : \\[ \\begin{aligned} \\text{côté} &= 4 \\text{ points} \\\\ \\text{dimensions} &= 2 \\end{aligned} \\] La base est le nombre de points sur un côté, 4, et l'exposant est le nombre de dimensions, 2. Donc le modèle montre <b>\\(4^{2}\\)</b>.",
      { mode: "model-grid-4" });
    return u3tFig(q, u3tGrid(4, 4));
  },
  function () {
    var q = mcq("Convention du modèle de points : une puissance cubique est représentée par des couches carrées identiques dessinées côte à côte, avec la base comme côté de chaque couche et l'exposant 3 comme le nombre de couches. Quelle puissance ce modèle montre-t-il ?",
      { t: u3tPowOpt(2, 3), fb: "Exact. Chaque couche est de 2 par 2 et il y a 2 couches, ce qui donne la base 2 avec 3 dimensions en tout." },
      [
        { t: u3tPowOpt(3, 2), fb: "Cela échange la base et l'exposant. Le côté d'une couche est la base." },
        { t: u3tPowOpt(2, 2), fb: "Cela compte une seule couche plate. Les couches côte à côte ajoutent la troisième dimension." },
        { t: u3tPowOpt(3, 3), fb: "Cela utilise 3 comme base. Chaque couche ici est de 2 par 2, pas de 3 par 3." }
      ],
      "Lis la base à partir d'une couche et l'exposant à partir de la construction complète : \\[ \\begin{aligned} \\text{côté de la couche} &= 2 \\text{ points} \\\\ \\text{couches} &= 2, \\text{ chacune de } 2 \\text{ par } 2 \\end{aligned} \\] La base est le nombre de points le long d'un côté d'une couche, 2, et l'exposant compte les dimensions, 3 en tout. Donc le modèle montre <b>\\(2^{3}\\)</b>.",
      { mode: "model-cube-2" });
    return u3tFig(q, u3tLayers(2));
  },
  function () {
    var q = mcq("Convention du modèle de points : une puissance cubique est représentée par des couches carrées identiques dessinées côte à côte, avec la base comme côté de chaque couche et l'exposant 3 comme le nombre de couches. Quelle puissance ce modèle montre-t-il ?",
      { t: u3tPowOpt(3, 3), fb: "Exact. Chaque couche est de 3 par 3 et il y a 3 couches." },
      [
        { t: u3tPowOpt(3, 2), fb: "Cela compte une seule couche plate. Les couches côte à côte ajoutent la troisième dimension." },
        { t: u3tPowOpt(2, 3), fb: "Cela utilise 2 comme base. Chaque couche ici est de 3 par 3, pas de 2 par 2." },
        { t: u3tPowOpt(3, 1), fb: "Cela utilise l'exposant 1. La construction utilise trois dimensions en tout." }
      ],
      "Lis la base à partir d'une couche et l'exposant à partir de la construction complète : \\[ \\begin{aligned} \\text{côté de la couche} &= 3 \\text{ points} \\\\ \\text{couches} &= 3, \\text{ chacune de } 3 \\text{ par } 3 \\end{aligned} \\] La base est le nombre de points le long d'un côté d'une couche, 3, et l'exposant compte les dimensions, 3 en tout. Donc le modèle montre <b>\\(3^{3}\\)</b>.",
      { mode: "model-cube-3" });
    return u3tFig(q, u3tLayers(3));
  },
  function () {
    var q = mcq("Convention du modèle de points : une puissance carrée est représentée par une grille, avec la base comme nombre de points le long d'un côté et l'exposant 2 comme les deux dimensions de la grille, les rangées et les colonnes. Combien de points y a-t-il dans ce modèle en tout ?",
      { t: "16", fb: "Exact. La grille est de 4 par 4, et 4 fois 4 donne 16." },
      [
        { t: "8", fb: "Cela additionne les longueurs des côtés, 4 plus 4. Multiplie-les pour compter la grille." },
        { t: "4", fb: "Cela compte un seul côté. Compte chaque rangée de la grille." },
        { t: "12", fb: "Cela compte 3 rangées de 4. La grille a 4 rangées complètes." }
      ],
      "La grille a 4 rangées avec 4 points dans chaque rangée : \\[ \\begin{aligned} \\text{total} &= 4\\times 4 \\\\ &= 16 \\end{aligned} \\] La base, 4, est le nombre de points sur un côté, et l'exposant, 2, est le nombre de dimensions multipliées. Donc le total est <b>16</b> points.",
      { mode: "model-total-grid-4" });
    return u3tFig(q, u3tGrid(4, 4));
  },
  function () {
    var q = mcq("Convention du modèle de points : une puissance cubique est représentée par des couches carrées identiques dessinées côte à côte, avec la base comme côté de chaque couche et l'exposant 3 comme le nombre de couches. Combien de points y a-t-il dans ce modèle en tout ?",
      { t: "8", fb: "Exact. Il y a 2 couches avec 4 points chacune, et 2 fois 4 donne 8." },
      [
        { t: "6", fb: "Cela additionne 2 et 4. Multiplie les points par couche par le nombre de couches." },
        { t: "4", fb: "Cela compte une seule couche. Il y a 2 couches dans le modèle." },
        { t: "12", fb: "Cela compte 3 couches de 4. Le modèle a 2 couches." }
      ],
      "Chaque couche contient 2 par 2 points et il y a 2 couches : \\[ \\begin{aligned} \\text{total} &= 2\\times (2\\times 2) \\\\ &= 8 \\end{aligned} \\] La base, 2, est le nombre de points sur un côté d'une couche, et l'exposant, 3, compte les dimensions multipliées. Donc le total est <b>8</b> points.",
      { mode: "model-total-cube-2" });
    return u3tFig(q, u3tLayers(2));
  },
  function () {
    var q = mcq("Un élève essaie de représenter \\(3^{2}\\) avec les conventions du modèle de points : une puissance carrée est une grille plate, et une puissance cubique est des couches carrées identiques dessinées côte à côte. Le modèle construit par l'élève est montré. Quelle puissance le modèle montre-t-il en réalité ?",
      { t: u3tPowOpt(2, 3), fb: "Exact. Les couches en font une puissance cubique de base 2, pas une puissance carrée de base 3." },
      [
        { t: u3tPowOpt(3, 2), fb: "C'est la puissance que l'élève voulait. Lis le modèle lui-même : il a des couches, pas une seule grille plate." },
        { t: u3tPowOpt(2, 2), fb: "Cela compte une seule couche. Les couches côte à côte ajoutent la troisième dimension." },
        { t: u3tPowOpt(3, 3), fb: "Cela utilise 3 comme base. Chaque couche ici est de 2 par 2, pas de 3 par 3." }
      ],
      "Lis le modèle selon ses propres termes : \\[ \\begin{aligned} \\text{côté de la couche} &= 2 \\text{ points} \\\\ \\text{couches} &= 2, \\text{ chacune de } 2 \\text{ par } 2 \\end{aligned} \\] La base est le côté d'une couche, 2, et l'exposant est 3 parce que la construction a trois dimensions. Donc le modèle montre en réalité <b>\\(2^{3}\\)</b>.",
      { mode: "model-interchanged-cube" });
    return u3tFig(q, u3tLayers(2));
  },
  function () {
    var q = mcq("Un élève essaie de représenter \\(2^{3}\\) avec les conventions du modèle de points : une puissance carrée est une grille plate, et une puissance cubique est des couches carrées identiques dessinées côte à côte. Le modèle construit par l'élève est montré. Qu'est-ce que l'élève a confondu ?",
      { t: "La base et l'exposant ont été échangés : le modèle montre \\(3^{2}\\), une grille plate de 3 par 3", fb: "Exact. Une grille plate de côté 3 est la puissance carrée 3 au carré." },
      [
        { t: "Les points ont été mal comptés : le modèle montre \\(2^{3}\\) avec 9 points dans chaque couche", fb: "Cela garde la puissance voulue. Le modèle est une seule grille plate, et chaque côté a 3 points." },
        { t: "Il manque une couche : ajouter une couche à cette grille compléterait le modèle de \\(2^{3}\\)", fb: "Cela traite la grille comme une couche du cube. Son côté est 3, donc elle ne peut pas être une couche d'une puissance de base 2." },
        { t: "Le modèle est correct tel quel : une grille plate de 3 par 3 est le modèle standard de \\(2^{3}\\)", fb: "Cela accepte l'échange. Une puissance cubique demande des couches, et cette grille a un côté de 3, pas de 2." }
      ],
      "Lis le modèle selon ses propres termes : \\[ \\begin{aligned} \\text{côté de la grille} &= 3 \\text{ points} \\\\ \\text{couches} &= 1 \\text{ grille plate} \\end{aligned} \\] La base est le nombre de points sur un côté, 3, et une grille plate a l'exposant 2, donc le modèle montre \\(3^{2}\\). L'élève a échangé la base et l'exposant. Donc l'énoncé correct est <b>La base et l'exposant ont été échangés : le modèle montre \\(3^{2}\\), une grille plate de 3 par 3</b>.",
      { mode: "model-interchanged-grid" });
    return u3tFig(q, u3tGrid(3, 3));
  }
]), ["Lis d'abord la base à partir des points le long d'un côté ou d'une couche.", "Compte ensuite les dimensions : une grille plate en a deux, une construction en couches en a trois."]);

E("u3-zero-pattern", 3, ["3.9"], 1, "gen", function () {
  var mode = pick(["int", "int", "frac", "neg"]);
  var lines = [], baseTxt, lastStep, baseOpt, recipOpt;
  if (mode === "int") {
    var a = ri(2, 9), s = pick([3, 4, 5]);
    for (var k = s; k >= 1; k--) lines.push("\\(" + a + "^{" + k + "}=" + fmtD(Math.pow(a, k)) + "\\)");
    baseTxt = a + "";
    lastStep = a + "^{1}\\div " + a + " &= " + a + "\\div " + a + " \\\\ &= 1";
    baseOpt = fmtD(a);
    recipOpt = "\\(\\frac{1}{" + a + "}\\)";
  } else if (mode === "neg") {
    var a2 = ri(2, 6), s2 = pick([3, 4, 5]);
    for (var k2 = s2; k2 >= 1; k2--) lines.push("\\((-" + a2 + ")^{" + k2 + "}=" + fmtD(Math.pow(-a2, k2)) + "\\)");
    baseTxt = "(-" + a2 + ")";
    lastStep = "(-" + a2 + ")^{1}\\div (-" + a2 + ") &= (-" + a2 + ")\\div (-" + a2 + ") \\\\ &= 1";
    baseOpt = fmtD(-a2);
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
    "Une régularité pour la base \\(" + baseTxt + "\\) est montrée. Chaque étape vers le bas divise par la base.<br>" + lines.join("<br>") + "<br>Quelle est la valeur de \\(" + baseTxt + "^{0}\\) qui continue la régularité ?",
    "Les puissances de \\(" + baseTxt + "\\) ci-dessous suivent une régularité, et chaque valeur est celle du dessus divisée par la base.<br>" + lines.join("<br>") + "<br>En suivant la régularité une étape de plus, que vaut \\(" + baseTxt + "^{0}\\)?",
    "Lis la régularité pour la base \\(" + baseTxt + "\\) de haut en bas. Chaque étape divise par la base.<br>" + lines.join("<br>") + "<br>Quelle valeur la régularité donne-t-elle pour \\(" + baseTxt + "^{0}\\)?"
  ]);
  return mcq(prompt,
    { t: "1", fb: "Exact. Diviser la valeur de la puissance d'exposant 1 par la base une fois de plus donne un." },
    [
      { t: "0", fb: "Cela traite l'exposant zéro comme s'il donnait zéro. Suis la régularité de division une étape plus bas." },
      { t: baseOpt, fb: "C'est la base elle-même, la valeur de la puissance d'exposant 1. Divise-la par la base une fois de plus." },
      { t: recipOpt, fb: "Cela divise une fois de trop, ou divise dans le mauvais sens. Une division à partir de la valeur de la puissance d'exposant 1 donne un." }
    ],
    "Chaque étape vers le bas divise par la base, donc continue à partir de la puissance d'exposant 1 : \\[ \\begin{aligned} " + lastStep + " \\end{aligned} \\] Donc la valeur qui continue la régularité est <b>1</b>.",
    { mode: "topup-zero-" + mode });
}, ["Observe ce qui arrive à la valeur chaque fois que l'exposant diminue de un.", "Prends la valeur de la puissance d'exposant 1 et divise-la par la base."]);

E("u3-paren-powers-set", 3, ["3.8"], 1, "gen", function () {
  var b = ri(2, 5), e = ri(2, 4);
  var forms = [
    { txt: "(-" + b + ")^{" + e + "}", val: Math.pow(-b, e) },
    { txt: "(-" + b + "^{" + e + "})", val: -Math.pow(b, e) },
    { txt: "-" + b + "^{" + e + "}", val: -Math.pow(b, e) }
  ];
  var order = shuffle([0, 1, 2]);
  var shownForms = order.map(function (i) { return forms[i]; });
  var listTxt = shownForms.map(function (f, i) { return "Forme " + (i + 1) + " : \\(" + f.txt + "\\)"; }).join("<br>");
  var mode = (e % 2 === 0 && Math.random() < 0.45) ? "pair" : "triple";
  if (mode === "pair") {
    function pairTxt(i, j) { return "\\(" + shownForms[i].txt + "\\) et \\(" + shownForms[j].txt + "\\)"; }
    var eqPair = null;
    for (var i = 0; i < 3; i++) for (var j = i + 1; j < 3; j++) { if (shownForms[i].val === shownForms[j].val) eqPair = [i, j]; }
    var pairs = [[0, 1], [0, 2], [1, 2]];
    var dsP = pairs.filter(function (p) { return !(p[0] === eqPair[0] && p[1] === eqPair[1]); }).map(function (p) {
      return { t: pairTxt(p[0], p[1]), fb: "Ces deux formes ont des valeurs différentes. Vérifie quelles formes gardent le signe négatif à l'extérieur de la puissance." };
    });
    dsP.push({ t: "Les trois formes ont la même valeur", fb: "Ce n'est pas le cas ici. La forme entre parenthèses a une valeur différente des deux autres." });
    return mcq("Trois formes sont montrées.<br>" + listTxt + "<br>Quelles deux formes ont la même valeur ?",
      { t: pairTxt(eqPair[0], eqPair[1]), fb: "Exact. Dans les deux formes, la puissance est calculée d'abord et le signe négatif reste à l'extérieur." }, dsP,
      "Calcule chaque forme : \\[ \\begin{aligned} " + shownForms.map(function (f) { return f.txt + " &= " + fmtD(f.val); }).join(" \\\\ ") + " \\end{aligned} \\] Les deux formes qui ont la même valeur sont <b>" + pairTxt(eqPair[0], eqPair[1]) + "</b>.",
      { mode: "topup-paren-pair", b: b, e: e });
  }
  var vals = shownForms.map(function (f) { return f.val; });
  function trip(v) { return "\\(" + v.map(function (x) { return fmtD(x); }).join(", ") + "\\)"; }
  var poolT = [
    { v: [-vals[0], vals[1], vals[2]], fb: "Cela change le signe de la première forme. Vérifie ce que ses parenthèses couvrent." },
    { v: [vals[0], -vals[1], vals[2]], fb: "Cela change le signe de la deuxième forme. Vérifie où se trouve son signe négatif." },
    { v: [vals[0], vals[1], -vals[2]], fb: "Cela change le signe de la troisième forme. Vérifie où se trouve son signe négatif." },
    { v: [-vals[0], -vals[1], -vals[2]], fb: "Cela change tous les signes. Calcule d'abord la forme entre parenthèses toute seule." },
    { v: [Math.abs(vals[0]), Math.abs(vals[1]), Math.abs(vals[2])], fb: "Cela enlève tous les signes négatifs. Certaines formes gardent une valeur négative." },
    { v: [vals[1], vals[0], vals[2]], fb: "Cela échange les deux premières valeurs. Garde les valeurs dans l'ordre où les formes sont montrées." }
  ];
  var dsT = [], seenT = {}; seenT[trip(vals)] = 1;
  for (var t = 0; t < poolT.length && dsT.length < 3; t++) { var tt = trip(poolT[t].v); if (!seenT[tt]) { seenT[tt] = 1; dsT.push({ t: tt, fb: poolT[t].fb }); } }
  return mcq("Trois formes sont montrées.<br>" + listTxt + "<br>Quelles sont les valeurs des trois formes, dans l'ordre montré ?",
    { t: trip(vals), fb: "Exact. Tu as vérifié ce que les parenthèses couvrent dans chaque forme." }, dsT,
    "Calcule chaque forme à tour de rôle : \\[ \\begin{aligned} " + shownForms.map(function (f) { return f.txt + " &= " + fmtD(f.val); }).join(" \\\\ ") + " \\end{aligned} \\] Dans la forme entre parenthèses, la valeur négative est la base. Dans les deux autres formes, la puissance est calculée d'abord et le signe négatif reste à l'extérieur. Donc les valeurs, dans l'ordre, sont <b>" + trip(vals) + "</b>.",
    { mode: "topup-paren-triple", b: b, e: e });
}, ["Regarde chaque forme séparément et détermine quelle est sa base.", "Calcule la première forme en la développant, puis fais la même chose pour les deux autres."]);

E("u3-two-laws-context", 3, ["3.12"], 2, "gen", function () {
  var fam = pick(["prodquot", "powprod"]);
  if (fam === "prodquot") {
    var a = ri(2, 5), m = ri(2, 3), n = ri(2, 3), p = ri(1, 2);
    var tot = m + n - p, val = Math.pow(a, tot);
    var ctx = pick([
      "Un parterre de jardin rectangulaire mesure \\(" + a + "^{" + m + "}\\) mètres de long et \\(" + a + "^{" + n + "}\\) mètres de large. Son aire est le produit des deux longueurs. Le parterre est partagé également entre \\(" + a + "^{" + p + "}\\) jardiniers. Combien de mètres carrés chaque jardinier reçoit-il ?",
      "Une section de plancher utilise \\(" + a + "^{" + m + "}\\) carreaux dans chaque rangée et a \\(" + a + "^{" + n + "}\\) rangées en tout. Tous les carreaux sont rangés également dans \\(" + a + "^{" + p + "}\\) boîtes. Combien de carreaux y a-t-il dans chaque boîte ?",
      "Une imprimerie fait \\(" + a + "^{" + m + "}\\) cartes sur chaque feuille et imprime \\(" + a + "^{" + n + "}\\) feuilles. Les cartes sont groupées également en \\(" + a + "^{" + p + "}\\) paquets. Combien de cartes y a-t-il dans chaque paquet ?"
    ]);
    return numq(ctx, val, 0,
      "Multiplie d'abord avec la loi du produit, puis divise avec la loi du quotient : \\[ \\begin{aligned} " + a + "^{" + m + "}\\times " + a + "^{" + n + "} &= " + a + "^{" + (m + n) + "} \\\\ " + a + "^{" + (m + n) + "}\\div " + a + "^{" + p + "} &= " + a + "^{" + tot + "} \\\\ &= " + fmtD(val) + " \\end{aligned} \\] Donc la réponse est <b>" + fmtD(val) + "</b>.",
      { mode: "topup-context-prodquot", a: a, m: m, n: n, p: p });
  }
  var a2 = ri(2, 4), m2 = ri(2, 3), p2 = ri(1, 3);
  var tot2 = 2 * m2 + p2, val2 = Math.pow(a2, tot2);
  if (val2 > 90000) { p2 = 1; tot2 = 2 * m2 + p2; val2 = Math.pow(a2, tot2); }
  var ctx2 = pick([
    "Chaque jardinière carrée a des côtés de \\(" + a2 + "^{" + m2 + "}\\) mètres, donc l'aire d'une jardinière est le carré de son côté. Un parc a \\(" + a2 + "^{" + p2 + "}\\) jardinières identiques. Quelle est l'aire de la surface de toutes les jardinières, en mètres carrés ?",
    "Chaque autocollant carré a des côtés de \\(" + a2 + "^{" + m2 + "}\\) centimètres, donc l'aire d'un autocollant est le carré de son côté. Une feuille contient \\(" + a2 + "^{" + p2 + "}\\) autocollants identiques. Quelle est l'aire de la surface de tous les autocollants, en centimètres carrés ?",
    "Chaque parcelle de jardin carrée a des côtés de \\(" + a2 + "^{" + m2 + "}\\) mètres, donc l'aire d'une parcelle est le carré de son côté. Une école a \\(" + a2 + "^{" + p2 + "}\\) parcelles identiques. Quelle est l'aire de la surface de toutes les parcelles, en mètres carrés ?"
  ]);
  return numq(ctx2, val2, 0,
    "Mets le côté au carré avec la loi de la puissance d'une puissance, puis multiplie avec la loi du produit : \\[ \\begin{aligned} (" + a2 + "^{" + m2 + "})^{2} &= " + a2 + "^{" + (2 * m2) + "} \\\\ " + a2 + "^{" + (2 * m2) + "}\\times " + a2 + "^{" + p2 + "} &= " + a2 + "^{" + tot2 + "} \\\\ &= " + fmtD(val2) + " \\end{aligned} \\] Donc la réponse est <b>" + fmtD(val2) + "</b>.",
    { mode: "topup-context-powprod", a: a2, m: m2, p: p2 });
}, ["Transforme d'abord le contexte en puissances d'une même base, puis choisis les lois.", "Écris le total comme un produit ou un quotient de puissances avant de calculer quoi que ce soit."]);

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
    return numq("Calcule \\(" + expr + "\\).", t.val, 0,
      "Commence par la puissance d'un produit, puis utilise la loi du quotient sur chaque base : \\[ \\begin{aligned} " + expr + " &= \\frac{" + t.a + "^{" + t.n + "}\\times " + t.b + "^{" + t.n + "}}{" + t.a + "^{" + t.p + "}\\times " + t.b + "^{" + t.q + "}} \\\\ &= " + t.a + "^{" + (t.n - t.p) + "}\\times " + t.b + "^{" + (t.n - t.q) + "} \\\\ &= " + fmtD(t.val) + " \\end{aligned} \\] Donc la valeur est <b>" + fmtD(t.val) + "</b>.",
      { mode: "topup-mixed-prodquot", a: t.a, b: t.b, n: t.n, p: t.p, q: t.q });
  }
  if (t.kind === "quotprod") {
    var expr2 = "\\frac{(" + t.big + "\\div " + t.b + ")^{" + t.n + "}\\times " + t.b + "^{" + t.n + "}}{" + t.big + "^{" + t.p + "}}";
    return numq("Calcule \\(" + expr2 + "\\).", t.val, 0,
      "Commence par la puissance d'un quotient, puis termine avec les lois du produit et du quotient : \\[ \\begin{aligned} " + expr2 + " &= \\frac{" + t.big + "^{" + t.n + "}}{" + t.big + "^{" + t.p + "}} \\\\ &= " + t.big + "^{" + (t.n - t.p) + "} \\\\ &= " + fmtD(t.val) + " \\end{aligned} \\] Donc la valeur est <b>" + fmtD(t.val) + "</b>.",
      { mode: "topup-mixed-quotprod", big: t.big, b: t.b, n: t.n, p: t.p });
  }
  var expr3 = "\\frac{((" + t.a + "\\times " + t.b + ")^{2})^{2}}{(" + t.a + "\\times " + t.b + ")^{" + t.p + "}}";
  return numq("Calcule \\(" + expr3 + "\\).", t.val, 0,
    "Commence par la puissance d'une puissance sur la base produit, puis utilise la loi du quotient : \\[ \\begin{aligned} " + expr3 + " &= \\frac{(" + t.a + "\\times " + t.b + ")^{4}}{(" + t.a + "\\times " + t.b + ")^{" + t.p + "}} \\\\ &= (" + t.a + "\\times " + t.b + ")^{" + (4 - t.p) + "} \\\\ &= " + fmtD(t.val) + " \\end{aligned} \\] Donc la valeur est <b>" + fmtD(t.val) + "</b>.",
    { mode: "topup-mixed-powpow", a: t.a, b: t.b, p: t.p });
}, ["Divise l'expression en étapes : une loi à la fois, en commençant à l'intérieur des parenthèses.", "Applique d'abord la loi de la puissance d'un produit ou de la puissance d'un quotient, puis combine ce qui reste."]);

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
      ? "À l'étape 1, les exposants ont été additionnés, mais une puissance d'une puissance multiplie les exposants."
      : "À l'étape 2, les exposants ont été multipliés, mais la loi du produit additionne les exposants.";
  } else {
    if (p >= e1ok) p = e1ok - 1;
    if (err === 1 && p >= e1) p = Math.max(1, e1 - 1);
    ec = e1ok - p;
    e2 = (err === 1) ? (e1 - p) : (e1ok + p);
    opSym = "\\div ";
    errNote = (err === 1)
      ? "À l'étape 1, les exposants ont été additionnés, mais une puissance d'une puissance multiplie les exposants."
      : "À l'étape 2, les exposants ont été additionnés, mais la loi du quotient soustrait les exposants.";
  }
  var expr = "((" + a + "^{" + m + "})^{" + n + "}" + opSym + a + "^{" + p + "})";
  var prompt = "Un élève simplifie \\(" + expr + "\\) en deux étapes. Le calcul contient une erreur.<br>Étape 1 : \\((" + a + "^{" + m + "})^{" + n + "} = " + a + "^{" + e1 + "}\\)<br>Étape 2 : \\(" + a + "^{" + e1 + "}" + opSym + a + "^{" + p + "} = " + a + "^{" + e2 + "}\\)<br>Quel est le résultat simplifié correct, comme une seule puissance ?";
  var pool = [
    { v: e2, fb: "C'est le résultat du calcul montré, qui contient l'erreur." },
    { v: (fam === "prod") ? (e1ok - p) : (e1ok + p), fb: "Cela utilise la mauvaise loi à la deuxième étape. Vérifie si l'expression multiplie ou divise." },
    { v: m + n + p, fb: "Cela additionne tous les exposants. Une puissance d'une puissance multiplie ses exposants." },
    { v: ec + 1, fb: "C'est un de trop. Refais les deux étapes de lois avec soin." },
    { v: ec - 1, fb: "C'est un de moins. Refais les deux étapes de lois avec soin." },
    { v: e1ok, fb: "Cela arrête après la première étape. La deuxième loi doit encore être appliquée." }
  ];
  var ds = [], seen = {}; seen[String(ec)] = 1;
  for (var i = 0; i < pool.length && ds.length < 3; i++) {
    if (pool[i].v > 0 && !seen[String(pool[i].v)]) { seen[String(pool[i].v)] = 1; ds.push({ t: "\\(" + a + "^{" + pool[i].v + "}\\)", fb: pool[i].fb }); }
  }
  var step2ok = a + "^{" + e1ok + "}" + opSym + a + "^{" + p + "} &= " + a + "^{" + ec + "}";
  return mcq(prompt,
    { t: "\\(" + a + "^{" + ec + "}\\)", fb: "Exact. Tu as refait les deux étapes de lois et corrigé la loi mal appliquée." }, ds,
    errNote + " Le calcul correct est \\[ \\begin{aligned} ((" + a + "^{" + m + "})^{" + n + "}) &= " + a + "^{" + e1ok + "} \\\\ " + step2ok + " \\end{aligned} \\] Donc le résultat simplifié correct est <b>\\(" + a + "^{" + ec + "}\\)</b>.",
    { mode: "topup-error-" + fam + "-" + err, a: a, m: m, n: n, p: p });
}, ["Refais la simplification toi-même, une loi à la fois, avant de regarder les choix.", "Commence par la puissance d'une puissance, puis applique la deuxième loi à ton propre résultat."]);

/* ----- bank-u4-topup.js ----- */
// Math 9 (French) Unit 4 top-up question bank
// Cut verbatim from the standalone bank source
// (math-9-review-fr/bank-src.js, lines 2472 to 2700).
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
  var s='<svg xmlns="http://www.w3.org/2000/svg" width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Modèle de tuiles algébriques">';
  s+='<rect x="1" y="1" width="'+(W-2)+'" height="'+(H-2)+'" fill="#ffffff" stroke="'+FIG_INK+'" stroke-width="1"/>';
  var y=pad;
  for(i=0;i<groups.length;i++){
    var g=groups[i],x=pad,count=Math.abs(g.n);
    for(j=0;j<count;j++){
      var pos=g.n>0;
      var fill=pos?(g.kind===1?FIG_ACC:FIG_SHADE):"#ffffff";
      var tf=(pos&&g.kind===1)?"#ffffff":FIG_INK;
      s+='<rect x="'+x+'" y="'+y+'" width="'+g.w+'" height="'+g.h+'" fill="'+fill+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
      s+='<text x="'+fmt(x+g.w/2,1)+'" y="'+fmt(y+g.h/2,1)+'" font-size="'+g.fs+'" fill="'+tf+'" text-anchor="middle" dominant-baseline="central">'+g.lab+'</text>'; /* FMT-GEOM */
      x+=g.w+gapX;
    }
    y+=g.h+gapY;
  }
  return s+'</svg>';
}
function u4tArea(m,p,c){
  var monoLab=fmtD(m)+"x";
  var part1=p===1?"x":fmtD(p)+"x";
  var part2=fmtD(c);
  var W=300,H=146,rx=56,ry=34,rw=216,rh=76,sw=128,sx=rx+sw;
  var totalLab="("+part1+(c<0?" - "+fmtD(Math.abs(c)):" + "+part2)+")";
  var s='<svg xmlns="http://www.w3.org/2000/svg" width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Rectangle divisé en deux régions, modèle d’aire">';
  s+='<rect x="'+rx+'" y="'+ry+'" width="'+sw+'" height="'+rh+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<rect x="'+sx+'" y="'+ry+'" width="'+(rw-sw)+'" height="'+rh+'" fill="#ffffff" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="'+sx+'" y1="'+ry+'" x2="'+sx+'" y2="'+(ry+rh)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<text x="30" y="'+fmt(ry+rh/2,1)+'" font-size="13" fill="'+FIG_INK+'" text-anchor="middle" dominant-baseline="central">'+monoLab+'</text>'; /* FMT-GEOM */
  s+='<text x="'+fmt(rx+sw/2,1)+'" y="'+(ry+16)+'" font-size="13" fill="'+FIG_INK+'" text-anchor="middle" dominant-baseline="central">'+part1+'</text>'; /* FMT-GEOM */
  s+='<text x="'+fmt(sx+(rw-sw)/2,1)+'" y="'+(ry+16)+'" font-size="13" fill="'+FIG_INK+'" text-anchor="middle" dominant-baseline="central">'+part2+'</text>'; /* FMT-GEOM */
  s+='<text x="'+fmt(rx+rw/2,1)+'" y="'+(ry+rh+22)+'" font-size="13" fill="'+FIG_INK+'" text-anchor="middle" dominant-baseline="central">'+totalLab+'</text>'; /* FMT-GEOM */
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
      {t:u4m(a,-b,c),fb:"Les tuiles x ont le signe opposé dans le modèle."},
      {t:u4m(a,b,-c),fb:"Les tuiles unité ont le signe opposé dans le modèle."},
      {t:u4m(-a,b,c),fb:"Les tuiles x au carré ont le signe opposé dans le modèle."},
      {t:u4m(b,a,c),fb:"Cela échange le nombre de tuiles x au carré avec le nombre de tuiles x."},
      {t:u4m(aOff,b,c),fb:"Cela compte mal les tuiles x au carré dans le modèle."},
      {t:u4m(a,b,cOff),fb:"Cela compte mal les tuiles unité dans le modèle."}
    ];
    var ds=u4pick3(corr,cands);
    if(ds.length<3)continue;
    var sol="Compte chaque sorte de tuile dans l'image, en gardant son signe : \\[ \\begin{aligned} x^{2} \\text{ tuiles} &= "+fmtD(a)+" \\\\ x \\text{ tuiles} &= "+fmtD(b)+" \\\\ \\text{tuiles unité} &= "+fmtD(c)+" \\end{aligned} \\] Donc le modèle montre <b>"+corr+"</b>.";
    var q=mcq("Dans le modèle de tuiles du diagramme, un grand carré est une tuile \\(x^{2}\\), un rectangle long et mince est une tuile \\(x\\) et un petit carré est une tuile unité. Les tuiles positives sont remplies et les tuiles négatives sont seulement contourées, avec un signe moins sur chacune. Quelle expression le modèle montre-t-il ?",{t:corr,fb:"Exact : chaque nombre de tuiles dans l'image devient le terme correspondant."},ds,sol,{mode:"tiles-fig-expr",a:a,b:b,c:c});
    q.figure=u4tTiles(a,b,c);
    return q;
  }
  var qf=mcq("Dans le modèle de tuiles du diagramme, un grand carré est une tuile \\(x^{2}\\), un rectangle long et mince est une tuile \\(x\\) et un petit carré est une tuile unité. Les tuiles positives sont remplies et les tuiles négatives sont seulement contourées, avec un signe moins sur chacune. Quelle expression le modèle montre-t-il ?",{t:u4m(2,-3,1),fb:"Exact : chaque nombre de tuiles dans l'image devient le terme correspondant."},[{t:u4m(2,3,1),fb:"Les tuiles x ont le signe opposé dans le modèle."},{t:u4m(2,-3,-1),fb:"Les tuiles unité ont le signe opposé dans le modèle."},{t:u4m(-3,2,1),fb:"Cela échange le nombre de tuiles x au carré avec le nombre de tuiles x."}],"Compter les tuiles avec leurs signes donne <b>"+u4m(2,-3,1)+"</b>.",{mode:"tiles-fig-expr",a:2,b:-3,c:1});
  qf.figure=u4tTiles(2,-3,1);
  return qf;
}, ["Lis l'image tuile par tuile : compte chaque sorte et garde le signe montré sur les tuiles.", "Compte d'abord les grands carrés : ce nombre, avec son signe, est le coefficient de x au carré."]);

E("u4-tiles-figure-build", 4, ["8.15"], 1, "gen", function(){
  function kindName(k){return k===0?"x au carré":(k===1?"x":"unité");}
  function kindTex(k){return k===0?"x^{2}":(k===1?"x":"\\text{unité}");}
  function tileWord(n){return n===1?"tuile":"tuiles";}
  function makeAction(verb,count,sign,k){var vFr=verb==="Add"?"Ajoute":"Retire";var sFr=sign==="positive"?(count===1?"positive":"positives"):(count===1?"négative":"négatives");return vFr+" "+fmtD(count)+" "+tileWord(count)+" "+kindName(k)+" "+sFr;}
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
      {t:makeAction(verb==="Add"?"Remove":"Add",count,sign,k),fb:"Cela déplace le compte des tuiles "+kindName(k)+" dans le mauvais sens ; compare les deux coefficients."},
      {t:makeAction(verb,count,sign==="positive"?"negative":"positive",k),fb:"Cela utilise des tuiles du mauvais signe ; le changement requis garde le signe montré par les coefficients."},
      {t:makeAction(verb,count+1,sign,k),fb:"Cela change la bonne sorte de tuile, mais pas du bon montant ; les coefficients diffèrent de "+fmtD(count)+"."},
      {t:makeAction(verb,count,sign,otherKind),fb:"Cela change les tuiles "+kindName(otherKind)+" ; seul le coefficient des tuiles "+kindName(k)+" change."}
    ];
    var ds=u4pick3(corr,cands);
    if(ds.length<3)continue;
    var sol="Compare les coefficients des tuiles "+kindName(k)+" : \\[ \\begin{aligned} "+kindTex(k)+" \\text{ dans le modèle} &= "+fmtD(from)+" \\\\ "+kindTex(k)+" \\text{ requis} &= "+fmtD(to)+" \\end{aligned} \\] Les autres coefficients correspondent déjà, donc le changement est : <b>"+corr+"</b>.";
    var q=mcq("Le diagramme montre un modèle de tuiles algébriques de "+u4m(prime[0],prime[1],prime[2])+". Que faut-il faire pour changer ce modèle en un modèle de "+u4m(target[0],target[1],target[2])+" ? Dans le modèle, un grand carré est une tuile \\(x^{2}\\), un rectangle long et mince est une tuile \\(x\\) et un petit carré est une tuile unité ; les tuiles positives sont remplies et les tuiles négatives sont seulement contourées, avec un signe moins sur chacune.",{t:corr,fb:"Exact : un seul coefficient change, par exactement cette modification."},ds,sol,{mode:"tiles-fig-build",a:prime[0],b:prime[1],c:prime[2],ta:target[0],tb:target[1],tc:target[2],k:k});
    q.figure=u4tTiles(prime[0],prime[1],prime[2]);
    return q;
  }
  var qf=mcq("Le diagramme montre un modèle de tuiles algébriques de "+u4m(1,1,2)+". Que faut-il faire pour changer ce modèle en un modèle de "+u4m(1,3,2)+" ? Dans le modèle, un grand carré est une tuile \\(x^{2}\\), un rectangle long et mince est une tuile \\(x\\) et un petit carré est une tuile unité ; les tuiles positives sont remplies et les tuiles négatives sont seulement contourées, avec un signe moins sur chacune.",{t:"Ajoute 2 tuiles x positives",fb:"Exact : un seul coefficient change, par exactement cette modification."},[{t:"Retire 2 tuiles x positives",fb:"Cela déplace le nombre de tuiles x dans le mauvais sens."},{t:"Ajoute 2 tuiles x négatives",fb:"Cela utilise des tuiles du mauvais signe."},{t:"Ajoute 2 tuiles unité positives",fb:"Cela change les tuiles unité ; seul le coefficient de x change."}],"Le coefficient de x passe de 1 à 3, donc le changement est : <b>Ajoute 2 tuiles x positives</b>.",{mode:"tiles-fig-build",a:1,b:1,c:2,ta:1,tb:3,tc:2,k:1});
  qf.figure=u4tTiles(1,1,2);
  return qf;
}, ["Compare l'expression du modèle avec l'expression cible, un coefficient à la fois, et trouve celui qui diffère.", "Compare d'abord les coefficients de x au carré, puis les coefficients de x, puis les constantes, jusqu'à trouver la seule différence."]);

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
    if(sk===0){var a1=a>0?1:-1,a2=a-a1;corrPlain=u4expr([[a1,"x^{2}"],[b,"x"],[a2,"x^{2}"],[c,""]]);splitNote=u4expr([[a1,""],[a2,""]])+"="+fmtD(a);}
    else if(sk===1){var b1=b>0?1:-1,b2=b-b1;corrPlain=u4expr([[a,"x^{2}"],[b1,"x"],[c,""],[b2,"x"]]);splitNote=u4expr([[b1,""],[b2,""]])+"="+fmtD(b);}
    else{var c1=c>0?1:-1,c2=c-c1;corrPlain=u4expr([[a,"x^{2}"],[c1,""],[b,"x"],[c2,""]]);splitNote=u4expr([[c1,""],[c2,""]])+"="+fmtD(c);}
    var corr="\\("+corrPlain+"\\)";
    var orders=[[[c,""],[a,"x^{2}"],[b,"x"]],[[b,"x"],[c,""],[a,"x^{2}"]],[[c,""],[b,"x"],[a,"x^{2}"]]];
    var targetPlain=u4expr(pick(orders));
    var aOff=a>0?a+1:a-1;
    var cands=[
      {t:u4m(a,-b,c),fb:"Le coefficient de x a le mauvais signe ; les formes équivalentes gardent chaque coefficient."},
      {t:u4m(aOff,b,c),fb:"Le coefficient de x au carré est décalé de un ; les formes équivalentes gardent chaque coefficient."},
      {t:u4m(a,b,-c),fb:"La constante a le mauvais signe ; les formes équivalentes gardent chaque coefficient."},
      {t:u4m(a+b,0,c),fb:"Cela met le coefficient de x dans le terme en x au carré, mais ce sont des termes non semblables."}
    ];
    var ds=u4pick3(corr,cands);
    if(ds.length<3)continue;
    var sol="Écris la cible dans l'ordre habituel, et combine la partie divisée de la forme correspondante (\\("+splitNote+"\\)) : \\[ \\begin{aligned} \\text{cible} &= "+u4p(a,b,c)+" \\\\ \\text{forme correspondante} &= "+corrPlain+" \\\\ &= "+u4p(a,b,c)+" \\end{aligned} \\] Les deux donnent le même polynôme, donc la correspondance est <b>"+corr+"</b>.";
    return mcq("Quelle expression est équivalente à \\("+targetPlain+"\\) ? Les expressions équivalentes ont la même valeur pour chaque valeur de \\(x\\).",{t:corr,fb:"Exact : ses termes divisés se combinent pour redonner exactement les coefficients cibles."},ds,sol,{mode:"match-equiv",a:a,b:b,c:c,sk:sk});
  }
  return mcq("Quelle expression est équivalente à \\(5+3x^{2}-2x\\) ? Les expressions équivalentes ont la même valeur pour chaque valeur de \\(x\\).",{t:"\\(x^{2}+2x^{2}-2x+5\\)",fb:"Exact : ses termes divisés se combinent pour redonner exactement les coefficients cibles."},[{t:u4m(3,2,5),fb:"Le coefficient de x a le mauvais signe."},{t:u4m(4,-2,5),fb:"Le coefficient de x au carré est décalé de un."},{t:u4m(3,-2,-5),fb:"La constante a le mauvais signe."}],"Combiner la partie divisée en x au carré, 1 plus 2, donne la cible, donc la correspondance est <b>\\(x^{2}+2x^{2}-2x+5\\)</b>.",{mode:"match-equiv",a:3,b:-2,c:5,sk:0});
}, ["Compare les coefficients sorte par sorte : les formes équivalentes ont le même coefficient de x au carré, le même coefficient de x et la même constante.", "Réécris d'abord la cible avec le terme en x au carré en premier, puis vérifie quel choix se combine pour donner ces trois mêmes nombres."]);

E("u4-mult-monomial-area", 4, ["8.8"], 3, "gen", function(){
  for(var att=0;att<300;att++){
    var m=ri(2,4),p=ri(1,5),c=u4nz(-6,6);
    var mp=m*p,mc=m*c;
    var corr=u4m(mp,mc,0);
    var cands=[
      {t:u4m(mp,0,mc),fb:"Cela écrit le produit de la deuxième région comme une constante ; multiplier par un monôme avec x donne un terme en x."},
      {t:u4m(mp,m+c,0),fb:"La partie constante a été additionnée au coefficient du monôme au lieu d'être multipliée par le monôme au complet."},
      {t:u4m(mp,-mc,0),fb:"Le produit de la deuxième région a le mauvais signe ; vérifie le signe de la partie constante."},
      {t:u4m(mp,c,0),fb:"Cela compte seulement la première région et laisse la deuxième partie non multipliée par le monôme."}
    ];
    var ds=u4pick3(corr,cands);
    if(ds.length<3)continue;
    var mono=u4expr([[m,"x"]]),other=u4p(0,p,c);
    var sol="Multiplie le monôme par chaque partie de l'autre côté et additionne les aires des deux régions : \\[ \\begin{aligned} A &= ("+mono+")("+other+") \\\\ &= ("+mono+")("+u4expr([[p,"x"]])+") + ("+mono+")("+fmtD(c)+") \\\\ &= "+u4p(mp,mc,0)+" \\end{aligned} \\] Donc l'aire de la surface est <b>"+corr+"</b>.";
    var q=mcq("Le diagramme montre un rectangle divisé en deux régions. Sa hauteur est \\("+mono+"\\), et les deux parties de son côté du haut sont \\("+u4expr([[p,"x"]])+"\\) et \\("+fmtD(c)+"\\). L'aire d'un rectangle est sa hauteur fois sa largeur. Quelle est l'aire de la surface du rectangle comme polynôme simplifié ?",{t:corr,fb:"Exact : le monôme multiplie les deux parties, et les aires des régions s'additionnent."},ds,sol,{mode:"area-mono",m:m,p:p,c:c});
    q.figure=u4tArea(m,p,c);
    return q;
  }
  var qf=mcq("Le diagramme montre un rectangle divisé en deux régions. Sa hauteur est \\(3x\\), et les deux parties de son côté du haut sont \\(2x\\) et \\(5\\). L'aire d'un rectangle est sa hauteur fois sa largeur. Quelle est l'aire de la surface du rectangle comme polynôme simplifié ?",{t:u4m(6,15,0),fb:"Exact : le monôme multiplie les deux parties, et les aires des régions s'additionnent."},[{t:u4m(6,0,15),fb:"Cela écrit le produit de la deuxième région comme une constante."},{t:u4m(6,8,0),fb:"La partie constante a été additionnée au lieu d'être multipliée."},{t:u4m(6,-15,0),fb:"Le produit de la deuxième région a le mauvais signe."}],"Multiplier par les deux parties donne <b>"+u4m(6,15,0)+"</b>.",{mode:"area-mono",m:3,p:2,c:5});
  qf.figure=u4tArea(3,2,5);
  return qf;
}, ["Multiplie le monôme par chaque partie du côté divisé, puis additionne les aires des deux régions.", "Trouve d'abord l'aire de la région de gauche : multiplie la hauteur par la première partie du côté du haut."]);

E("u4-divide-missing-term", 4, ["8.9"], 3, "gen", function(){
  for(var att=0;att<300;att++){
    var m=pick([-4,-3,-2,2,3,4]),p=u4nz(-5,5),qq=u4nz(-5,5);
    var B=m*qq,mp=m*p;
    var corrPlain=u4expr([[mp,"x^{3}"]]);
    var corr="\\("+corrPlain+"\\)";
    var cands=[
      {t:"\\("+u4expr([[p,"x^{2}"]])+"\\)",fb:"C'est le terme du quotient lui-même ; il doit encore être multiplié par le diviseur."},
      {t:"\\("+u4expr([[p,"x^{3}"]])+"\\)",fb:"La puissance est bonne, mais le coefficient du diviseur n'a pas été appliqué."},
      {t:"\\("+u4expr([[mp,"x^{2}"]])+"\\)",fb:"Le coefficient est bon, mais multiplier par le diviseur augmente la puissance de un, jusqu'à 3."},
      {t:"\\("+u4expr([[mp,"x^{4}"]])+"\\)",fb:"Cette puissance est un trop haut ; le diviseur a la puissance 1, donc le terme manquant a la puissance 3."}
    ];
    var ds=u4pick3(corr,cands);
    if(ds.length<3)continue;
    var divisor=u4expr([[m,"x"]]),quotient=u4p(p,qq,0);
    var bSigned=(B<0?" - ":" + ")+u4expr([[Math.abs(B),"x^{2}"]]);
    var sol="Pars du terme du quotient qui va avec l'espace vide, et vérifie avec le terme connu : \\[ \\begin{aligned} \\text{terme manquant} \\div ("+divisor+") &= "+u4expr([[p,"x^{2}"]])+" \\\\ \\text{terme manquant} &= "+u4expr([[p,"x^{2}"]])+" \\cdot ("+divisor+") \\\\ &= "+corrPlain+" \\end{aligned} \\] Vérification : \\(("+u4expr([[B,"x^{2}"]])+") \\div ("+divisor+") = "+u4expr([[qq,"x"]])+"\\), ce qui correspond au quotient. Donc l'espace vide est <b>"+corr+"</b>.";
    return mcq("Il manque un terme du dividende dans une division : \\((\\underline{\\hspace{1.2cm}}"+bSigned+") \\div ("+divisor+") = ("+quotient+")\\). Quel monôme remplit l'espace vide ?",{t:corr,fb:"Exact : multiplier ce terme du quotient par le diviseur donne ce terme."},ds,sol,{mode:"div-missing",m:m,p:p,q:qq});
  }
  return mcq("Il manque un terme du dividende dans une division : \\((\\underline{\\hspace{1.2cm}} + 6x^{2}) \\div (3x) = (2x^{2}+2x)\\). Quel monôme remplit l'espace vide ?",{t:"\\(6x^{3}\\)",fb:"Exact : multiplier ce terme du quotient par le diviseur donne ce terme."},[{t:"\\(2x^{2}\\)",fb:"C'est le terme du quotient lui-même ; il doit encore être multiplié par le diviseur."},{t:"\\(2x^{3}\\)",fb:"La puissance est bonne, mais le coefficient du diviseur n'a pas été appliqué."},{t:"\\(6x^{2}\\)",fb:"Le coefficient est bon, mais la puissance devrait augmenter de un, jusqu'à 3."}],"Multiplier le terme du quotient par le diviseur donne <b>\\(6x^{3}\\)</b>.",{mode:"div-missing",m:3,p:2,q:2});
}, ["La division défait la multiplication : multiplie le terme du quotient correspondant par le diviseur pour retrouver le terme manquant.", "Associe d'abord l'espace vide au premier terme du quotient, puisque le terme connu va avec le deuxième."]);

/* TRANSLATOR NOTES
- FMT-GEOM lines left as fmt( (2): in u5balance, the line building the x-block
  rect/text in the nx loop and the line building the unit-block rect/text in
  the nu loop; every fmt( there feeds an SVG x attribute. Each carries the
  comment at the end of its line. All other fmt( display calls became fmtD(,
  including the number-line tick labels in u5line (visible text) and the
  three .map(fmt) callbacks in entries 13 and 27, which became .map(fmtD).
  Money expressions built with "$" + fmt( became fmtDF(...,2) + " $".
  No fmtF( and no .toFixed( occur in this chunk; no percents occur either.
- Literal formatted numbers written into static prose (for later guide
  reconciliation): entry 8, tickets variant: 8 $, 5 $, 53 $, 6 $; savings
  variant: 20 $, 7 $, 62 $, 6 $; phone variant: 25 $, 0,50 $, 31 $, 12 $,
  plus the decimal comma 0,5 inside the phone variant equation in the
  prompt and the worked solution. No literal thousands and no literal
  percents occur in static prose; larger values (entry 25 contexts, up to
  1000) are generated and pass through fmtD.
- Judgement calls where the glossary was silent: boundary value = valeur
  limite; pan (of a balance) = plateau; systematic trial = essai
  systématique; by inspection = par inspection; booking fee = frais de
  réservation; field trip = sortie scolaire; gigabyte, whose unit symbol
  GB is rendered Go (gigaoctet). Inequality phrases: at least = au moins,
  at most = au maximum, more than = plus de, fewer than = moins de, no more
  than = pas plus de; in entries 11 and 25 the statement is shown as a
  colon fragment (p. ex. "Un nombre n : au moins 5.") so one form works for
  every context without adjective agreement problems.
- English words inside \text{...} in worked solutions were kept unchanged,
  following the panels-fr precedent for this project (KaTeX fragments kept
  intact). The two SVG aria-labels were translated as reader-facing text.
- In entries 14, 15 and 23 the English direction word reaches the text
  through the dir variable ("right" / "left", values unchanged, since
  u5line compares them); it is mapped to droite / gauche at the display
  site only.
- Unsure: valeur limite and Go are the two choices most likely to be
  revised when the immersion guide extracts land.
*/

/* ----- bank-u5.js ----- */
// Math 9 (French) Unit 5 Linear Equations and Inequalities question bank
// Cut verbatim from the standalone bank source
// (math-9-review-fr/bank-src.js, lines 2701 to 3410).
// CRMARKS: u5-solve-two-step=3
// CRMARKS: u5-solve-brackets-both=3
// CRMARKS: u5-verify-error=2
// CRMARKS: u5-word-two-step=3
// CRMARKS: u5-word-brackets=2
// CRMARKS: u5-list-satisfies=2
// CRMARKS: u5-solve-ineq-addsub=3
/* Final-scope tranche (Units 5 to 9), November 7, 2026: appended from
   tranche2/unit5.js to unit9.js. CR_MARKS extended to 63 entries. */
// Unit 5: Linear Equations and Inequalities (Math 9, NL). Entries only; helpers prefixed u5.
function u5pick3(c, cands) { var out = [], seen = [c]; for (var i = 0; i < cands.length && out.length < 3; i++) { if (seen.indexOf(cands[i].t) < 0) { seen.push(cands[i].t); out.push(cands[i]); } } return out; }
function u5gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
function u5fracTex(p, q) { if (q < 0) { p = -p; q = -q; } var g = u5gcd(p, q); p /= g; q /= g; if (q === 1) return fmtD(p); if (p < 0) return "-" + FR(-p, q); return FR(p, q); }
function u5lin(a, b) { var s; if (a === 1) s = "x"; else if (a === -1) s = "-x"; else s = fmtD(a) + "x"; if (b > 0) s += "+" + fmtD(b); else if (b < 0) s += "-" + fmtD(-b); return s; }
function u5sym(r) { return r === "le" ? "\\le" : r === "ge" ? "\\ge" : r === "lt" ? "<" : ">"; }
function u5flip(r) { return r === "lt" ? "gt" : r === "gt" ? "lt" : r === "le" ? "ge" : "le"; }
function u5holds(v, r, k) { return r === "lt" ? v < k : r === "gt" ? v > k : r === "le" ? v <= k : v >= k; }
function u5ineqTex(v, r, rhs) { return "\\(" + v + " " + u5sym(r) + " " + rhs + "\\)"; }
function u5line(k, closed, dir) {
  var lo = k - 4, W = 320, H = 72, cy = 38;
  function X(v) { return 20 + (v - lo) * 35; }
  var s = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Graphique sur une droite numérique">';
  s += '<line x1="8" y1="' + cy + '" x2="312" y2="' + cy + '" stroke="' + FIG_INK + '" stroke-width="1.5"/>';
  s += '<polygon points="312,' + cy + ' 302,' + (cy - 4) + ' 302,' + (cy + 4) + '" fill="' + FIG_INK + '"/>';
  s += '<polygon points="8,' + cy + ' 18,' + (cy - 4) + ' 18,' + (cy + 4) + '" fill="' + FIG_INK + '"/>';
  for (var v = lo; v <= k + 4; v++) { s += '<line x1="' + X(v) + '" y1="' + (cy - 5) + '" x2="' + X(v) + '" y2="' + (cy + 5) + '" stroke="' + FIG_INK + '" stroke-width="1.5"/><text x="' + X(v) + '" y="' + (cy + 22) + '" font-size="12" fill="' + FIG_INK + '" text-anchor="middle">' + fmtD(v) + '</text>'; }
  var ex = dir === "right" ? 306 : 14;
  s += '<line x1="' + X(k) + '" y1="' + cy + '" x2="' + ex + '" y2="' + cy + '" stroke="' + FIG_ACC + '" stroke-width="4"/>';
  if (dir === "right") s += '<polygon points="' + ex + ',' + cy + ' ' + (ex - 9) + ',' + (cy - 5) + ' ' + (ex - 9) + ',' + (cy + 5) + '" fill="' + FIG_ACC + '"/>';
  else s += '<polygon points="' + ex + ',' + cy + ' ' + (ex + 9) + ',' + (cy - 5) + ' ' + (ex + 9) + ',' + (cy + 5) + '" fill="' + FIG_ACC + '"/>';
  s += '<circle cx="' + X(k) + '" cy="' + cy + '" r="6" fill="' + (closed ? FIG_INK : "#ffffff") + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  return s + '</svg>';
}
function u5balance(a, b, c) {
  var W = 340, H = 178, panY = 118;
  var s = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Modèle de balance">';
  s += '<line x1="18" y1="34" x2="322" y2="34" stroke="' + FIG_INK + '" stroke-width="3"/>';
  s += '<polygon points="170,34 156,66 184,66" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="1.5"/>';
  s += '<rect x="160" y="66" width="20" height="8" fill="' + FIG_INK + '"/>';
  function pan(cx, nx, nu) {
    var w = nx * 27 + nu * 17, x = cx - w / 2, out = "";
    out += '<line x1="' + cx + '" y1="34" x2="' + (cx - 62) + '" y2="' + panY + '" stroke="' + FIG_INK + '" stroke-width="1.5"/>';
    out += '<line x1="' + cx + '" y1="34" x2="' + (cx + 62) + '" y2="' + panY + '" stroke="' + FIG_INK + '" stroke-width="1.5"/>';
    out += '<line x1="' + (cx - 72) + '" y1="' + panY + '" x2="' + (cx + 72) + '" y2="' + panY + '" stroke="' + FIG_INK + '" stroke-width="3"/>';
    var bx = x;
    for (var i = 0; i < nx; i++) { out += '<rect x="' + fmt(bx, 1) + '" y="' + (panY - 26) + '" width="24" height="26" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="1.5"/><text x="' + fmt(bx + 12, 1) + '" y="' + (panY - 13) + '" font-size="13" fill="' + FIG_INK + '" text-anchor="middle" dominant-baseline="central">x</text>'; bx += 27; } /* FMT-GEOM */
    for (var j = 0; j < nu; j++) { out += '<rect x="' + fmt(bx, 1) + '" y="' + (panY - 16) + '" width="14" height="16" fill="#ffffff" stroke="' + FIG_INK + '" stroke-width="1.5"/><text x="' + fmt(bx + 7, 1) + '" y="' + (panY - 8) + '" font-size="12" fill="' + FIG_INK + '" text-anchor="middle" dominant-baseline="central">1</text>'; bx += 17; } /* FMT-GEOM */
    return out;
  }
  s += pan(85, a, b);
  s += pan(255, 0, c);
  s += '<text x="85" y="140" font-size="12" fill="' + FIG_INK + '" text-anchor="middle">plateau de gauche</text>';
  s += '<text x="255" y="140" font-size="12" fill="' + FIG_INK + '" text-anchor="middle">plateau de droite</text>';
  s += '<text x="170" y="164" font-size="12" fill="' + FIG_INK + '" text-anchor="middle">Les plateaux sont en équilibre, donc les deux côtés sont égaux.</text>';
  return s + '</svg>';
}

// 1. L1, 8.17: balance model shows an equation.
E("u5-balance-model", 5, ["8.17"], 1, "gen", function () {
  var a = ri(1, 3), b = ri(1, 4), c = ri(b + 2, 10);
  function eq(x, y, z) { return "\\(" + u5lin(x, y) + "=" + fmtD(z) + "\\)"; }
  var corr = eq(a, b, c);
  var cands = [
    { t: eq(a, c, b), fb: "Cela échange les blocs unités : le plateau de gauche a " + fmtD(b) + " blocs unités et le plateau de droite a " + fmtD(c) + " blocs unités." },
    { t: eq(b, a, c), fb: "Cela échange les nombres : il y a " + fmtD(a) + " blocs x et " + fmtD(b) + " blocs unités sur le plateau de gauche." },
    { t: eq(a + 1, b, c), fb: "Cela compte un bloc x de trop ; le plateau de gauche montre " + fmtD(a) + " blocs x." },
    { t: eq(a, b, c + 1), fb: "Cela compte un bloc unité de trop sur le plateau de droite ; il en montre " + fmtD(c) + "." },
    { t: eq(a, b + 1, c), fb: "Cela compte un bloc unité de trop sur le plateau de gauche ; il en montre " + fmtD(b) + "." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Compte les blocs sur chaque plateau : \\[ \\begin{aligned} \\text{plateau de gauche} &= " + fmtD(a) + " \\text{ blocs de x} + " + fmtD(b) + " \\text{ blocs d'unité} \\\\ \\text{plateau de droite} &= " + fmtD(c) + " \\text{ blocs d'unité} \\end{aligned} \\] Les plateaux sont en équilibre, donc le modèle montre <b>" + corr + "</b>.";
  var q = mcq("Le diagramme montre un modèle de balance. Chaque grand bloc porte la lettre x et chaque petit bloc porte le nombre 1. Les plateaux sont en équilibre. Quelle équation le modèle montre-t-il ?", { t: corr, fb: "Exact : le plateau de gauche donne les termes en x et les unités, et le plateau de droite donne le total." }, ds, sol, { mode: "balance", a: a, b: b, c: c });
  q.figure = u5balance(a, b, c);
  return q;
}, ["Compte d'abord les blocs sur le plateau de gauche : les blocs x donnent le terme en x, les petits blocs donnent la constante.", "Le plateau de gauche est un côté de l'équation et le plateau de droite est l'autre côté."]);

// 2. L2, 8.18, CR 3: solve two-step equations, three forms.
E("u5-solve-two-step", 5, ["8.18"], 2, "gen", function () {
  var form = ri(0, 2);
  if (form === 0) {
    var a = ri(2, 9), x0 = ri(-9, 9); if (x0 === 0) x0 = 4;
    var b = ri(-12, 12); if (b === 0) b = 5;
    var c = a * x0 + b;
    var sol = "Défais d'abord la constante, puis défais la multiplication : \\[ \\begin{aligned} " + u5lin(a, b) + " &= " + fmtD(c) + " \\\\ " + fmtD(a) + "x &= " + fmtD(c - b) + " \\\\ x &= " + fmtD(x0) + " \\end{aligned} \\] Donc la solution est <b>\\(x = " + fmtD(x0) + "\\)</b>.";
    return numq("Résous l'équation \\(" + u5lin(a, b) + " = " + fmtD(c) + "\\). Quelle est la valeur de \\(x\\) ?", x0, 0.01, sol, { mode: "ax+b", a: a, b: b, c: c });
  }
  if (form === 1) {
    var a2 = ri(2, 6), k = ri(-6, 6); if (k === 0) k = 3;
    var x1 = a2 * k, b2 = ri(-9, 9); if (b2 === 0) b2 = -4;
    var c2 = k + b2;
    var sol2 = "Défais d'abord la constante, puis défais la division : \\[ \\begin{aligned} " + FR("x", a2) + (b2 >= 0 ? "+" + fmtD(b2) : "-" + fmtD(-b2)) + " &= " + fmtD(c2) + " \\\\ " + FR("x", a2) + " &= " + fmtD(k) + " \\\\ x &= " + fmtD(x1) + " \\end{aligned} \\] Donc la solution est <b>\\(x = " + fmtD(x1) + "\\)</b>.";
    return numq("Résous l'équation \\(" + FR("x", a2) + (b2 >= 0 ? " + " + fmtD(b2) : " - " + fmtD(-b2)) + " = " + fmtD(c2) + "\\). Quelle est la valeur de \\(x\\) ?", x1, 0.01, sol2, { mode: "x/a+b", a: a2, b: b2, c: c2 });
  }
  var x2 = ri(-8, 8); if (x2 === 0) x2 = 5;
  var a3 = ri(3, 9), c3 = ri(2, a3 - 1), b3 = (a3 - c3) * x2;
  var sol3 = "Regroupe d'abord les termes en x d'un même côté : \\[ \\begin{aligned} " + fmtD(a3) + "x &= " + u5lin(c3, b3) + " \\\\ " + fmtD(a3 - c3) + "x &= " + fmtD(b3) + " \\\\ x &= " + fmtD(x2) + " \\end{aligned} \\] Donc la solution est <b>\\(x = " + fmtD(x2) + "\\)</b>.";
  return numq("Résous l'équation \\(" + fmtD(a3) + "x = " + u5lin(c3, b3) + "\\). Quelle est la valeur de \\(x\\) ?", x2, 0.01, sol3, { mode: "ax=cx+b", a: a3, b: b3, c: c3 });
}, ["Défais les opérations dans l'ordre inverse : occupe-toi du terme constant avant le terme lié à x.", "Isole d'abord le terme en x d'un côté, avec la même opération des deux côtés."]);

// 3. L3, 8.18, CR 3: brackets and variables on both sides.
E("u5-solve-brackets-both", 5, ["8.18"], 3, "gen", function () {
  for (var att = 0; att < 300; att++) {
    if (Math.random() < 0.5) {
      var a = ri(2, 4), b = ri(2, 5), c = ri(-6, 6), d = ri(2, 4), e = ri(1, 4), f = ri(-6, 6);
      var den = a * b - d * e, num = d * f - a * c;
      if (den === 0 || num % den !== 0) continue;
      var x0 = num / den;
      if (x0 === 0 || Math.abs(x0) > 9) continue;
      var sol = "Développe les deux parenthèses, puis regroupe les termes : \\[ \\begin{aligned} " + a + "(" + u5lin(b, c) + ") &= " + d + "(" + u5lin(e, f) + ") \\\\ " + u5lin(a * b, a * c) + " &= " + u5lin(d * e, d * f) + " \\\\ " + fmtD(den) + "x &= " + fmtD(num) + " \\\\ x &= " + fmtD(x0) + " \\end{aligned} \\] Donc la solution est <b>\\(x = " + fmtD(x0) + "\\)</b>.";
      return numq("Résous l'équation \\(" + a + "(" + u5lin(b, c) + ") = " + d + "(" + u5lin(e, f) + ")\\). Quelle est la valeur de \\(x\\) ?", x0, 0.01, sol, { mode: "brackets", a: a, b: b, c: c, d: d, e: e, f: f });
    }
    var a1 = ri(2, 9), c1 = ri(2, 9), b1 = ri(-12, 12), d1 = ri(-12, 12);
    if (a1 === c1) continue;
    var den1 = a1 - c1, num1 = d1 - b1;
    if (num1 % den1 !== 0) continue;
    var x1 = num1 / den1;
    if (x1 === 0 || Math.abs(x1) > 9) continue;
    var sol1 = "Regroupe les termes en x d'un côté et les constantes de l'autre : \\[ \\begin{aligned} " + u5lin(a1, b1) + " &= " + u5lin(c1, d1) + " \\\\ " + fmtD(den1) + "x &= " + fmtD(num1) + " \\\\ x &= " + fmtD(x1) + " \\end{aligned} \\] Donc la solution est <b>\\(x = " + fmtD(x1) + "\\)</b>.";
    return numq("Résous l'équation \\(" + u5lin(a1, b1) + " = " + u5lin(c1, d1) + "\\). Quelle est la valeur de \\(x\\) ?", x1, 0.01, sol1, { mode: "both-sides", a: a1, b: b1, c: c1, d: d1 });
  }
  return numq("Résous l'équation \\(5x + 3 = 2x + 12\\). Quelle est la valeur de \\(x\\) ?", 3, 0.01, "Regroupe les termes : \\[ \\begin{aligned} 5x+3 &= 2x+12 \\\\ 3x &= 9 \\\\ x &= 3 \\end{aligned} \\] Donc la solution est <b>\\(x = 3\\)</b>.", { mode: "both-sides", a: 5, b: 3, c: 2, d: 12 });
}, ["Développe d'abord les parenthèses, puis rassemble tous les termes en x d'un même côté.", "Développe d'abord les parenthèses pour que chaque terme soit visible, puis regroupe séparément les termes en x et les constantes."]);

// 4. L1, 8.19: solve by inspection.
E("u5-inspection-basic", 5, ["8.19"], 1, "gen", function () {
  if (Math.random() < 0.5) {
    var a = ri(2, 9), x0 = ri(-9, 9); if (x0 === 0) x0 = 6;
    var b = a * x0;
    var cands = [
      { t: fmtD(x0 + a), fb: "C'est trop grand : " + fmtD(a) + " fois cette valeur donne plus que " + fmtD(b) + "." },
      { t: fmtD(x0 - a), fb: "C'est trop petit : " + fmtD(a) + " fois cette valeur donne moins que " + fmtD(b) + "." },
      { t: fmtD(x0 + 1), fb: "C'est proche, mais " + fmtD(a) + " fois cette valeur ne donne pas " + fmtD(b) + "." },
      { t: fmtD(-x0), fb: "Attention au signe : " + fmtD(a) + " fois cette valeur donne le signe opposé." },
      { t: fmtD(a), fb: "C'est le multiplicateur lui-même, pas la valeur qui fonctionne." }
    ];
    var ds = u5pick3(fmtD(x0), cands);
    var sol = "Demande-toi quel nombre multiplié par \\(" + fmtD(a) + "\\) donne \\(" + fmtD(b) + "\\) : \\[ \\begin{aligned} " + fmtD(a) + " \\times " + fmtD(x0) + " &= " + fmtD(b) + " \\end{aligned} \\] Donc la solution est <b>\\(x = " + fmtD(x0) + "\\)</b>.";
    return mcq("Résous \\(" + fmtD(a) + "x = " + fmtD(b) + "\\) par inspection. Par inspection veut dire repérer la valeur qui fonctionne, sans étapes écrites.", { t: fmtD(x0), fb: "Exact : " + fmtD(a) + " fois cette valeur donne " + fmtD(b) + "." }, ds, sol, { mode: "ax=b", a: a, b: b });
  }
  var a2 = ri(2, 6), b2 = ri(-8, 8); if (b2 === 0) b2 = 5;
  var x1 = a2 * b2;
  var cands2 = [
    { t: fmtD(x1 + a2), fb: "C'est trop grand : en le divisant par " + fmtD(a2) + ", on obtient plus que " + fmtD(b2) + "." },
    { t: fmtD(x1 - a2), fb: "C'est trop petit : en le divisant par " + fmtD(a2) + ", on obtient moins que " + fmtD(b2) + "." },
    { t: fmtD(b2), fb: "C'est le résultat de la division, pas la valeur de départ." },
    { t: fmtD(-x1), fb: "Attention au signe : en divisant cette valeur par " + fmtD(a2) + ", on obtient le signe opposé." }
  ];
  var ds2 = u5pick3(fmtD(x1), cands2);
  var sol2 = "Demande-toi quel nombre divisé par \\(" + fmtD(a2) + "\\) donne \\(" + fmtD(b2) + "\\) : \\[ \\begin{aligned} " + fmtD(x1) + " \\div " + fmtD(a2) + " &= " + fmtD(b2) + " \\end{aligned} \\] Donc la solution est <b>\\(x = " + fmtD(x1) + "\\)</b>.";
  return mcq("Résous \\(" + FR("x", a2) + " = " + fmtD(b2) + "\\) par inspection. Par inspection veut dire repérer la valeur qui fonctionne, sans étapes écrites.", { t: fmtD(x1), fb: "Exact : cette valeur divisée par " + fmtD(a2) + " donne " + fmtD(b2) + "." }, ds2, sol2, { mode: "x/a=b", a: a2, b: b2 });
}, ["Pense au fait de multiplication ou de division caché dans l'équation.", "Demande-toi d'abord : quel nombre, multiplié par le coefficient (ou divisé par lui), donne le côté droit ?"]);

// 5. L2, 8.19: systematic trial with tried values shown.
E("u5-trial-table", 5, ["8.19"], 1, "gen", function () {
  var a = ri(2, 6), x0 = ri(3, 9), b = ri(1, 9);
  var c = a * x0 + b, v1 = a * (x0 - 2) + b, v2 = a * (x0 - 1) + b, v3 = a * (x0 + 1) + b;
  var prompt = "Sam résout \\(" + u5lin(a, b) + " = " + fmtD(c) + "\\) par essai systématique, en essayant une valeur à la fois. Essayer \\(x = " + fmtD(x0 - 2) + "\\) donne un côté gauche de " + fmtD(v1) + ". Essayer \\(x = " + fmtD(x0 - 1) + "\\) donne un côté gauche de " + fmtD(v2) + ". Quelle valeur résout l'équation ?";
  var cands = [
    { t: fmtD(x0 - 1), fb: "Cette valeur a déjà été essayée : elle donne " + fmtD(v2) + ", pas " + fmtD(c) + "." },
    { t: fmtD(x0 - 2), fb: "Cette valeur a déjà été essayée : elle donne " + fmtD(v1) + ", pas " + fmtD(c) + "." },
    { t: fmtD(x0 + 1), fb: "Cela va un pas trop loin : cela donne un côté gauche de " + fmtD(v3) + ", au-delà de la cible." }
  ];
  var sol = "Le côté gauche augmente de \\(" + fmtD(a) + "\\) chaque fois que x augmente de 1, et il doit encore passer de \\(" + fmtD(v2) + "\\) à \\(" + fmtD(c) + "\\) : \\[ \\begin{aligned} " + u5lin(a, b) + " &= " + fmtD(c) + " \\text{ when } x = " + fmtD(x0) + " \\end{aligned} \\] Donc la solution est <b>\\(x = " + fmtD(x0) + "\\)</b>.";
  return mcq(prompt, { t: fmtD(x0), fb: "Exact : en la substituant, le côté gauche devient égal à " + fmtD(c) + "." }, cands, sol, { mode: "trial", a: a, b: b, c: c });
}, ["Regarde comment le côté gauche change d'une valeur essayée à la suivante.", "Trouve d'abord à quelle distance du but se trouve la dernière valeur essayée, et combien chaque pas de 1 en x ajoute."]);

// 6. L1, 8.20: choose the value that is the solution.
E("u5-which-is-solution", 5, ["8.20"], 1, "gen", function () {
  var a = ri(2, 7), x0 = ri(-6, 9), b = ri(-9, 9);
  var c = a * x0 + b;
  function fbFor(v) { return "En substituant \\(x = " + fmtD(v) + "\\), le côté gauche donne " + fmtD(a * v + b) + ", ce qui n'est pas " + fmtD(c) + "."; }
  var cands = [
    { t: fmtD(x0 + 1), fb: fbFor(x0 + 1) },
    { t: fmtD(x0 - 1), fb: fbFor(x0 - 1) },
    { t: fmtD(x0 + 2), fb: fbFor(x0 + 2) }
  ];
  var sol = "Substitue la valeur et compare les deux côtés : \\[ \\begin{aligned} " + u5lin(a, b) + " &= " + fmtD(a) + "(" + fmtD(x0) + ")" + (b >= 0 ? "+" + fmtD(b) : "-" + fmtD(-b)) + " \\\\ &= " + fmtD(c) + " \\end{aligned} \\] Les deux côtés correspondent, donc la solution est <b>\\(x = " + fmtD(x0) + "\\)</b>.";
  return mcq("Quelle valeur est la solution de \\(" + u5lin(a, b) + " = " + fmtD(c) + "\\) ?", { t: fmtD(x0), fb: "Exact : en la substituant, les deux côtés deviennent égaux." }, cands, sol, { mode: "which-sol", a: a, b: b, c: c });
}, ["Une solution est une valeur qui rend les deux côtés égaux quand on la substitue.", "Substitue d'abord une valeur et calcule le côté gauche, puis compare-le au côté droit."]);

// 7. L2, 8.20, CR 2: a shown check with a wrong verdict or a slip.
E("u5-verify-error", 5, ["8.20"], 2, "gen", function () {
  var a = ri(2, 6), x0 = ri(-5, 8), b = ri(-8, 8);
  var c = a * x0 + b, w = x0 + pick([-2, -1, 1, 2]);
  var trueL = a * w + b;
  if (Math.random() < 0.5) {
    var promptA = "Un élève vérifie si \\(x = " + fmtD(w) + "\\) résout \\(" + u5lin(a, b) + " = " + fmtD(c) + "\\). L'élève substitue et obtient correctement un côté gauche de " + fmtD(trueL) + ", puis écrit : cela correspond, donc \\(x = " + fmtD(w) + "\\) est la solution. Donne la conclusion correcte au sujet de cette vérification.";
    var corrA = "Le calcul est correct, mais " + fmtD(trueL) + " n'est pas égal à " + fmtD(c) + ", donc \\(x = " + fmtD(w) + "\\) n'est pas la solution.";
    var dsA = [
      { t: "La vérification est entièrement correcte, et \\(x = " + fmtD(w) + "\\) est la solution de l'équation.", fb: "Regarde encore les deux valeurs : le côté gauche et le côté droit sont des nombres différents." },
      { t: "La substitution contient une erreur de calcul, et la corriger montre que \\(x = " + fmtD(w) + "\\) est la solution.", fb: "La substitution elle-même a été calculée correctement ; l'erreur est dans la conclusion qu'on en tire." },
      { t: "Toute valeur substituée dans une équation est automatiquement une solution de cette équation.", fb: "La substitution n'est que le test ; la valeur est une solution seulement quand les deux côtés donnent le même résultat." }
    ];
    var solA = "Compare les deux côtés après la substitution : \\[ \\begin{aligned} \\text{côté gauche} &= " + fmtD(trueL) + " \\\\ \\text{côté droit} &= " + fmtD(c) + " \\end{aligned} \\] Les côtés ne sont pas égaux, donc la conclusion correcte est que <b>" + corrA + "</b>";
    return mcq(promptA, { t: corrA, fb: "Exact : une solution doit rendre les deux côtés égaux, et ici ils ne le sont pas." }, dsA, solA, { mode: "wrong-verdict", a: a, b: b, c: c, w: w });
  }
  var fakeL = c;
  var promptB = "Un élève vérifie si \\(x = " + fmtD(w) + "\\) résout \\(" + u5lin(a, b) + " = " + fmtD(c) + "\\). L'élève écrit que le côté gauche vaut " + fmtD(fakeL) + " et conclut que \\(x = " + fmtD(w) + "\\) est la solution. Donne la conclusion correcte au sujet de cette vérification.";
  var corrB = "Il y a une erreur de calcul : le côté gauche vaut en réalité " + fmtD(trueL) + ", pas " + fmtD(c) + ", donc \\(x = " + fmtD(w) + "\\) n'est pas la solution.";
  var dsB = [
    { t: "La vérification est entièrement correcte, et \\(x = " + fmtD(w) + "\\) est la solution de l'équation, avec les deux côtés égaux.", fb: "Refais la substitution toi-même : le côté gauche ne donne pas la valeur écrite par l'élève." },
    { t: "Le calcul est correct, mais les deux côtés ne sont toujours pas égaux, donc ce n'est pas la solution ici.", fb: "Le côté gauche indiqué est faux ; refaire la substitution donne une autre valeur." },
    { t: "Toute valeur substituée dans une équation est automatiquement une solution de cette équation dans tous les cas.", fb: "La substitution n'est que le test ; la valeur est une solution seulement quand les deux côtés donnent le même résultat." }
  ];
  var solB = "Refais la substitution avec soin : \\[ \\begin{aligned} " + u5lin(a, b) + " &= " + fmtD(a) + "(" + fmtD(w) + ")" + (b >= 0 ? "+" + fmtD(b) : "-" + fmtD(-b)) + " \\\\ &= " + fmtD(trueL) + " \\end{aligned} \\] Le côté gauche ne vaut pas " + fmtD(c) + ", donc la conclusion correcte est que <b>" + corrB + "</b>";
  return mcq(promptB, { t: corrB, fb: "Exact : refaire la substitution révèle l'erreur et le vrai côté gauche." }, dsB, solB, { mode: "slip", a: a, b: b, c: c, w: w });
}, ["Refais la substitution toi-même avant de juger la conclusion de l'élève.", "Calcule d'abord le côté gauche avec la valeur donnée, puis compare-le au côté droit."]);

// 8. L2, 8.21, var: what a solution means in context.
E("u5-meaning-of-solution", 5, ["8.21"], 1, "var", varset([
  function () {
    var sol = "Résous d'abord, puis relis la réponse dans le contexte de l'histoire : \\[ \\begin{aligned} 8n+5 &= 53 \\\\ 8n &= 48 \\\\ n &= 6 \\end{aligned} \\] Ici, n compte les billets, donc la solution veut dire que <b>tu peux acheter 6 billets pour un total de 53 $</b>.";
    return mcq("Les billets de concert coûtent 8 $ chacun, plus des frais de réservation de 5 $ payés une fois. L'équation \\(8n + 5 = 53\\) modélise le coût total, et sa solution est \\(n = 6\\). Que veut dire la solution dans cette situation ?", { t: "Tu peux acheter 6 billets pour un total de 53 $.", fb: "Exact : n compte les billets, et 6 donne un total de 53 $." }, [
      { t: "Chaque billet coûte 6 $ en fin de compte pour chaque personne.", fb: "Le 6 compte les billets ; le prix d'un billet reste 8 $." },
      { t: "Les frais de réservation reviennent à 6 $.", fb: "Les frais de réservation sont les 5 $ fixes ; le 6 est la valeur de n, le nombre de billets." },
      { t: "Six amis paient chacun des frais de 53 $.", fb: "Les 53 $ sont le coût total unique, pas des frais payés par chaque personne." }
    ], sol, { mode: "meaning-tickets" });
  },
  function () {
    var sol = "Résous d'abord, puis relis la réponse dans le contexte de l'histoire : \\[ \\begin{aligned} 3+2h &= 15 \\\\ 2h &= 12 \\\\ h &= 6 \\end{aligned} \\] Ici, h compte les heures, donc la solution veut dire que <b>après 6 heures, la température atteint 15 degrés</b>.";
    return mcq("Un matin froid commence à 3 degrés et la température monte de 2 degrés chaque heure. L'équation \\(3 + 2h = 15\\) modélise la température, et sa solution est \\(h = 6\\). Que veut dire la solution dans cette situation ?", { t: "Après 6 heures, la température atteint 15 degrés.", fb: "Exact : h compte les heures, et 6 donne une température de 15 degrés." }, [
      { t: "La température monte de 6 degrés chaque heure.", fb: "La montée chaque heure est les 2 degrés fixes ; le 6 est la valeur de h, les heures." },
      { t: "La température commence à 6 degrés au début du matin.", fb: "La température de départ est les 3 degrés fixes ; le 6 compte les heures." },
      { t: "Il faut 15 heures pour atteindre 6 degrés.", fb: "Cela échange les deux nombres : 15 est la température cible et 6 est les heures." }
    ], sol, { mode: "meaning-temp" });
  },
  function () {
    var sol = "Résous d'abord, puis relis la réponse dans le contexte de l'histoire : \\[ \\begin{aligned} 20+7w &= 62 \\\\ 7w &= 42 \\\\ w &= 6 \\end{aligned} \\] Ici, w compte les semaines, donc la solution veut dire que <b>après 6 semaines d'épargne, Mia a 62 $</b>.";
    return mcq("Mia a 20 $ d'économisés et ajoute 7 $ chaque semaine. L'équation \\(20 + 7w = 62\\) modélise ses économies, et sa solution est \\(w = 6\\). Que veut dire la solution dans cette situation ?", { t: "Après 6 semaines d'épargne, Mia a 62 $.", fb: "Exact : w compte les semaines, et 6 donne des économies de 62 $." }, [
      { t: "Mia économise 6 $ chaque semaine.", fb: "Elle économise les 7 $ fixes chaque semaine ; le 6 est la valeur de w, les semaines." },
      { t: "Mia a commencé avec seulement 6 $ d'économisés au départ.", fb: "Elle a commencé avec les 20 $ fixes ; le 6 compte les semaines d'épargne." },
      { t: "Mia aura 6 $ après 62 semaines.", fb: "Cela échange les deux nombres : 62 dollars est le but et 6 est les semaines." }
    ], sol, { mode: "meaning-savings" });
  },
  function () {
    var sol = "Résous d'abord, puis relis la réponse dans le contexte de l'histoire : \\[ \\begin{aligned} 2w+18 &= 34 \\\\ 2w &= 16 \\\\ w &= 8 \\end{aligned} \\] Ici, w est la largeur en centimètres, donc la solution veut dire que <b>la largeur du rectangle est de 8 cm</b>.";
    return mcq("Un rectangle a une longueur de 9 cm et une largeur de w cm. Son périmètre est de 34 cm, modélisé par \\(2w + 18 = 34\\), et la solution est \\(w = 8\\). Que veut dire la solution dans cette situation ?", { t: "La largeur du rectangle est de 8 cm.", fb: "Exact : w mesure la largeur, et 8 cm donne un périmètre de 34 cm." }, [
      { t: "Le périmètre du rectangle est de 8 cm.", fb: "Le périmètre est les 34 cm donnés ; le 8 est la valeur de w, la largeur." },
      { t: "La longueur du rectangle est de 8 cm.", fb: "La longueur est les 9 cm donnés ; w représente seulement la largeur." },
      { t: "L'aire du rectangle est de 8 cm carrés.", fb: "L'équation modélise le périmètre, pas l'aire ; le 8 est une longueur, la largeur." }
    ], sol, { mode: "meaning-perimeter" });
  },
  function () {
    var sol = "Résous d'abord, puis relis la réponse dans le contexte de l'histoire : \\[ \\begin{aligned} 3s+4 &= 40 \\\\ 3s &= 36 \\\\ s &= 12 \\end{aligned} \\] Ici, s compte les élèves dans une fourgonnette, donc la solution veut dire que <b>chaque fourgonnette transporte 12 élèves</b>.";
    return mcq("Trois fourgonnettes transportent chacune s élèves, et 4 autres élèves voyagent en voiture. L'équation \\(3s + 4 = 40\\) modélise les 40 élèves d'une sortie scolaire, et sa solution est \\(s = 12\\). Que veut dire la solution dans cette situation ?", { t: "Chaque fourgonnette transporte 12 élèves.", fb: "Exact : s compte les élèves par fourgonnette, et 12 donne un total de 40." }, [
      { t: "Il y a 12 fourgonnettes dans la sortie.", fb: "Il n'y a que 3 fourgonnettes ; le 12 est la valeur de s, les élèves dans chaque fourgonnette." },
      { t: "Un total de 12 élèves a participé à la sortie.", fb: "Le total est les 40 élèves donnés ; le 12 compte les élèves dans une fourgonnette." },
      { t: "La voiture transporte 12 élèves.", fb: "La voiture transporte les 4 élèves fixes ; le 12 appartient à chaque fourgonnette." }
    ], sol, { mode: "meaning-vans" });
  },
  function () {
    var sol = "Résous d'abord, puis relis la réponse dans le contexte de l'histoire : \\[ \\begin{aligned} 25+0,5g &= 31 \\\\ 0,5g &= 6 \\\\ g &= 12 \\end{aligned} \\] Ici, g compte les gigaoctets de données, donc la solution veut dire que <b>le client a utilisé 12 Go de données ce mois-là</b>.";
    return mcq("Un forfait de téléphone coûte 25 $ par mois plus 0,50 $ pour chaque gigaoctet (Go) de données utilisé. L'équation \\(25 + 0,5g = 31\\) modélise une facture, et sa solution est \\(g = 12\\). Que veut dire la solution dans cette situation ?", { t: "Le client a utilisé 12 Go de données ce mois-là.", fb: "Exact : g compte les gigaoctets, et 12 donne une facture de 31 $." }, [
      { t: "Le coût de base mensuel du forfait est de 12 $ chaque mois.", fb: "Le coût de base est les 25 $ fixes ; le 12 est la valeur de g, les gigaoctets." },
      { t: "Les données coûtent 12 $ pour chaque gigaoctet.", fb: "Les données coûtent les 0,50 $ fixes par gigaoctet ; le 12 compte les gigaoctets utilisés." },
      { t: "La facture couvre 12 mois de service.", fb: "L'équation modélise un seul mois ; le 12 compte les gigaoctets, pas les mois." }
    ], sol, { mode: "meaning-phone" });
  }
]), ["Résous le problème ou utilise la solution donnée, puis demande-toi ce que la variable compte dans l'histoire.", "Nomme d'abord ce que la variable représente dans l'histoire ; la solution est ce nombre de ces choses."]);

// 9. L2, 8.22, CR 3: word problem, two-step equation.
E("u5-word-two-step", 5, ["8.22"], 2, "gen", function () {
  var form = ri(0, 2);
  if (form === 0) {
    var a = ri(3, 9), n = ri(3, 14), b = ri(2, 12), c = a * n + b;
    var sol = "Soit n le nombre de billets. Le coût donne l'équation et sa solution : \\[ \\begin{aligned} " + fmtD(a) + "n+" + fmtD(b) + " &= " + fmtD(c) + " \\\\ " + fmtD(a) + "n &= " + fmtD(c - b) + " \\\\ n &= " + fmtD(n) + " \\end{aligned} \\] Donc le groupe a acheté <b>" + fmtD(n) + " billets</b>.";
    return numq("Un groupe achète des billets qui coûtent " + fmtDF(a, 2) + " $ chacun, plus des frais de réservation de " + fmtDF(b, 2) + " $ payés une fois. Le coût total est de " + fmtDF(c, 2) + " $. Combien de billets le groupe a-t-il achetés ?", n, 0.01, sol, { mode: "word-tickets", a: a, b: b, c: c });
  }
  if (form === 1) {
    var L = ri(4, 15), w = ri(3, 14), P = 2 * w + 2 * L;
    var sol2 = "Soit w la largeur. Le périmètre donne l'équation et sa solution : \\[ \\begin{aligned} 2w+" + fmtD(2 * L) + " &= " + fmtD(P) + " \\\\ 2w &= " + fmtD(P - 2 * L) + " \\\\ w &= " + fmtD(w) + " \\end{aligned} \\] Donc la largeur est de <b>" + fmtD(w) + " cm</b>.";
    return numq("Un rectangle a une longueur de " + fmtD(L) + " cm et un périmètre de " + fmtD(P) + " cm. Quelle est sa largeur, en centimètres ?", w, 0.01, sol2, { mode: "word-perimeter", a: L, b: P });
  }
  var a3 = ri(2, 8), n3 = ri(4, 16), b3 = ri(3, 15), c3 = a3 * n3 + b3;
  var sol3 = "Soit n le nombre de cahiers. Le coût donne l'équation et sa solution : \\[ \\begin{aligned} " + fmtD(a3) + "n+" + fmtD(b3) + " &= " + fmtD(c3) + " \\\\ " + fmtD(a3) + "n &= " + fmtD(c3 - b3) + " \\\\ n &= " + fmtD(n3) + " \\end{aligned} \\] Donc Sara a acheté <b>" + fmtD(n3) + " cahiers</b>.";
  return numq("Sara achète des cahiers qui coûtent " + fmtDF(a3, 2) + " $ chacun, plus un stylo pour " + fmtDF(b3, 2) + " $. Elle dépense " + fmtDF(c3, 2) + " $ en tout. Combien de cahiers a-t-elle achetés ?", n3, 0.01, sol3, { mode: "word-notebooks", a: a3, b: b3, c: c3 });
}, ["Écris d'abord une équation pour l'histoire : un taux fois l'inconnue, plus un montant fixe, égale le total.", "Décide d'abord ce que la variable compte, puis construis l'équation à partir de l'histoire."]);

// 10. L3, 8.22, CR 2: word problem, brackets or both sides.
E("u5-word-brackets", 5, ["8.22"], 3, "gen", function () {
  if (Math.random() < 0.5) {
    var x0 = ri(3, 12), a = ri(3, 8), c = ri(1, a - 1), b = ri(5, 30), d = b + (a - c) * x0;
    var sol = "Soit g les gigaoctets utilisés. Égaler les coûts des deux forfaits donne : \\[ \\begin{aligned} " + fmtD(a) + "g+" + fmtD(b) + " &= " + fmtD(c) + "g+" + fmtD(d) + " \\\\ " + fmtD(a - c) + "g &= " + fmtD(d - b) + " \\\\ g &= " + fmtD(x0) + " \\end{aligned} \\] Donc les forfaits coûtent le même prix à <b>" + fmtD(x0) + " Go</b>.";
    return numq("Le forfait A coûte " + fmtDF(b, 2) + " $ par mois plus " + fmtDF(a, 2) + " $ pour chaque gigaoctet (Go) de données. Le forfait B coûte " + fmtDF(d, 2) + " $ par mois plus " + fmtDF(c, 2) + " $ pour chaque Go. Pour combien de Go les deux forfaits coûtent-ils le même prix, en dollars ?", x0, 0.01, sol, { mode: "word-plans", a: a, b: b, c: c, d: d });
  }
  var a2 = ri(2, 6), c2 = ri(2, 9), x1 = ri(3, 15), T = a2 * (x1 + c2);
  var sol2 = "Soit s les sièges dans la partie courte de chaque rangée. Le total donne l'équation et sa solution : \\[ \\begin{aligned} " + fmtD(a2) + "(s+" + fmtD(c2) + ") &= " + fmtD(T) + " \\\\ s+" + fmtD(c2) + " &= " + fmtD(T / a2) + " \\\\ s &= " + fmtD(x1) + " \\end{aligned} \\] Donc la partie courte de chaque rangée a <b>" + fmtD(x1) + " sièges</b>.";
  return numq("Un théâtre a " + fmtD(a2) + " rangées identiques. Chaque rangée a une partie courte avec s sièges et une partie longue avec " + fmtD(c2) + " sièges de plus que la partie courte, donc chaque rangée a s + " + fmtD(c2) + " sièges en tout. Le théâtre a " + fmtD(T) + " sièges en tout. Combien de sièges y a-t-il dans la partie courte de chaque rangée ?", x1, 0.01, sol2, { mode: "word-rows", a: a2, b: c2, c: T });
}, ["Mets en place l'équation décrite par l'histoire, parenthèses ou deux côtés inclus, avant de résoudre.", "Écris d'abord le coût ou le total de chaque côté de l'histoire comme une expression en l'inconnue."]);

// 11. L1, 8.1: translate a word statement into an inequality.
E("u5-translate-inequality", 5, ["8.1"], 1, "gen", function () {
  var cases = [
    { phrase: "au moins", r: "ge", why: "« Au moins » veut dire ce montant ou plus, donc le signe est « supérieur ou égal »." },
    { phrase: "au maximum", r: "le", why: "« Au maximum » veut dire ce montant ou moins, donc le signe est « inférieur ou égal »." },
    { phrase: "plus de", r: "gt", why: "« Plus de » veut dire strictement plus grand, et le montant lui-même ne compte pas." },
    { phrase: "moins de", r: "lt", why: "« Moins de » veut dire strictement plus petit, et le montant lui-même ne compte pas." },
    { phrase: "pas plus de", r: "le", why: "« Pas plus de » veut dire ce montant ou moins, donc le signe est « inférieur ou égal »." }
  ];
  var ctxs = [
    { v: "n", what: "Un nombre n", tail: "" },
    { v: "a", what: "Ton âge a, en ans", tail: "" },
    { v: "s", what: "Le montant dépensé, s, en dollars", tail: "" },
    { v: "h", what: "La taille h, en centimètres", tail: "" }
  ];
  var cs = pick(cases), cx = pick(ctxs), k = pick([3, 5, 8, 10, 12, 16, 18, 21, 25, 30, 40, 50, 65, 100]);
  var corr = u5ineqTex(cx.v, cs.r, fmtD(k));
  var others = ["lt", "gt", "le", "ge"].filter(function (r) { return r !== cs.r; });
  var ds = others.map(function (r) { return { t: u5ineqTex(cx.v, r, fmtD(k)), fb: "Ce signe ne correspond pas à l'expression « " + cs.phrase + " » ; vérifie si le montant lui-même est permis." }; });
  var sol = cs.why + " Donc l'énoncé se traduit par <b>" + corr + "</b>.";
  return mcq(cx.what + " : " + cs.phrase + " " + fmtD(k) + ". Quelle inéquation montre cela ?", { t: corr, fb: "Exact. " + cs.why }, ds, sol, { mode: "translate", r: cs.r, k: k, v: cx.v });
}, ["Décide d'abord si le montant limite lui-même est permis ; cela choisit un signe strict ou un signe avec égalité.", "Associe d'abord l'expression : « au moins » et « au maximum » incluent le montant, « plus de » et « moins de » l'excluent."]);

// 12. L1, 8.2: which rational number can be a solution.
E("u5-possible-solution", 5, ["8.2"], 1, "gen", function () {
  function disp(v) { if (Math.abs(v * 2 - Math.round(v * 2)) < 1e-9 && Math.abs(v - Math.round(v)) > 1e-9) return "\\(" + FR(Math.round(2 * v), 2) + "\\)"; return fmtD(v); }
  for (var att = 0; att < 200; att++) {
    var k = ri(-4, 9), r = pick(["lt", "gt", "le", "ge"]);
    var pool = [k - 2, k - 1.5, k - 1, k - 0.5, k, k + 0.5, k + 1, k + 1.5, k + 2];
    var sat = pool.filter(function (v) { return u5holds(v, r, k); });
    var not = pool.filter(function (v) { return !u5holds(v, r, k); });
    if (sat.length < 1 || not.length < 3) continue;
    var cv = pick(sat), bad = shuffle(not).slice(0, 3);
    var corr = disp(cv);
    var ds = bad.map(function (v) { return { t: disp(v), fb: "Cette valeur ne satisfait pas l'inéquation ; la substituer rend l'énoncé faux." }; });
    if (u5pick3(corr, ds).length < 3) continue;
    var sol = "Teste la valeur dans l'inéquation : \\[ \\begin{aligned} " + fmtD(cv) + " &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmtD(k) + " \\end{aligned} \\] L'énoncé est vrai pour cette valeur, donc une solution possible est <b>" + corr + "</b>.";
    return mcq("Quel nombre est une solution possible de \\(" + "x " + u5sym(r) + " " + fmtD(k) + "\\) ? Une solution possible est une valeur qui rend l'inéquation vraie.", { t: corr, fb: "Exact : la substituer rend l'inéquation vraie." }, ds, sol, { mode: "possible", r: r, k: k, v: cv });
  }
  return mcq("Quel nombre est une solution possible de \\(x \\le 3\\) ? Une solution possible est une valeur qui rend l'inéquation vraie.", { t: fmtD(2), fb: "Exact : la substituer rend l'inéquation vraie." }, [{ t: fmtD(4), fb: "Cette valeur ne satisfait pas l'inéquation." }, { t: fmtD(5), fb: "Cette valeur ne satisfait pas l'inéquation." }, { t: fmtD(7), fb: "Cette valeur ne satisfait pas l'inéquation." }], "Le test donne \\(2 \\le 3\\), ce qui est vrai, donc une solution possible est <b>2</b>.", { mode: "possible", r: "le", k: 3, v: 2 });
}, ["Substitue chaque choix dans l'inéquation et garde celui qui donne un énoncé vrai.", "Vérifie d'abord la valeur limite elle-même, puis vérifie les valeurs de chaque côté."]);

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
    function listStr(arr) { return arr.slice().sort(function (x, y) { return x - y; }).map(fmtD).join(", "); }
    var corr = listStr(good);
    var mk = function (badV, pos) { var arr = base.slice(); arr.splice(pos, 0, badV); return listStr(arr); };
    var cands = [
      { t: mk(bads[0], 0), fb: "La valeur " + fmtD(bads[0]) + " dans cette liste ne satisfait pas l'inéquation." },
      { t: mk(bads[1], 1), fb: "La valeur " + fmtD(bads[1]) + " dans cette liste ne satisfait pas l'inéquation." },
      { t: mk(bads[2], 2), fb: "La valeur " + fmtD(bads[2]) + " dans cette liste ne satisfait pas l'inéquation." }
    ];
    var ds = u5pick3(corr, cands);
    if (ds.length < 3) continue;
    var sol = "Vérifie chaque valeur de la liste par substitution. Pour la bonne liste : \\[ \\begin{aligned} " + good.map(function (g) { return fmtD(g) + " &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmtD(k); }).join(" \\\\ ") + " \\end{aligned} \\] Chaque énoncé est vrai, donc la liste où toutes les valeurs satisfont l'inéquation est <b>" + corr + "</b>.";
    return mcq("Quelle liste contient des valeurs qui satisfont TOUTES \\(" + "x " + u5sym(r) + " " + fmtD(k) + "\\) ?", { t: corr, fb: "Exact : chaque valeur de cette liste rend l'inéquation vraie." }, ds, sol, { mode: "list-all", r: r, k: k });
  }
  return mcq("Quelle liste contient des valeurs qui satisfont TOUTES \\(x < 2\\) ?", { t: "-1, 0, 1", fb: "Exact : chaque valeur de cette liste rend l'inéquation vraie." }, [{ t: "0, 1, 2", fb: "La valeur 2 dans cette liste ne satisfait pas l'inéquation." }, { t: "-2, -1, 3", fb: "La valeur 3 dans cette liste ne satisfait pas l'inéquation." }, { t: "1, 2, 3", fb: "Les valeurs 2 et 3 dans cette liste ne satisfont pas l'inéquation." }], "Chacun de -1, 0 et 1 est plus petit que 2, donc la liste est <b>-1, 0, 1</b>.", { mode: "list-all", r: "lt", k: 2 });
}, ["Teste chaque valeur d'une liste ; une seule valeur qui échoue élimine toute la liste.", "Teste d'abord la valeur limite dans chaque liste, car c'est celle qui risque le plus d'échouer."]);

// 14. L2, 8.24: number line graph to inequality.
E("u5-graph-to-ineq", 5, ["8.24"], 1, "gen", function () {
  var k = ri(-8, 8), r = pick(["lt", "gt", "le", "ge"]);
  var closed = (r === "le" || r === "ge"), dir = (r === "gt" || r === "ge") ? "right" : "left";
  var corr = u5ineqTex("x", r, fmtD(k));
  var others = ["lt", "gt", "le", "ge"].filter(function (s) { return s !== r; });
  var fbMap = { lt: "Cela utilise un signe strict dans le mauvais sens pour ce graphique ; vérifie le cercle et le sens de l'ombrage.", gt: "Cela pointe l'ombrage dans le mauvais sens ou utilise le mauvais cercle pour ce graphique.", le: "Cela ne correspond pas à la fois au type de cercle et au sens de l'ombrage dans le graphique.", ge: "Cela ne correspond pas à la fois au type de cercle et au sens de l'ombrage dans le graphique." };
  var ds = others.map(function (s) { return { t: u5ineqTex("x", s, fmtD(k)), fb: fbMap[s] }; });
  var sol = "Le cercle se trouve à \\(" + fmtD(k) + "\\), il est " + (closed ? "fermé, donc le point limite est inclus et le signe a une partie « égal »" : "ouvert, donc le point limite n'est pas inclus et le signe est strict") + ", et l'ombrage va vers la " + (dir === "right" ? "droite" : "gauche") + ". Donc le graphique représente <b>" + corr + "</b>.";
  var q = mcq("La droite numérique du diagramme représente graphiquement une inéquation. Quelle inéquation le graphique représente-t-il ?", { t: corr, fb: "Exact : le type de cercle, sa position et le sens de l'ombrage correspondent tous." }, ds, sol, { mode: "graph-to-ineq", r: r, k: k });
  q.figure = u5line(k, closed, dir);
  return q;
}, ["Lis le graphique en trois parties : où se trouve le cercle, s'il est ouvert ou fermé, et dans quel sens va l'ombrage.", "Trouve d'abord le nombre sous le cercle ; c'est la valeur limite dans chaque choix."]);

// 15. L2, 8.24: boundary value of a described graph.
E("u5-graph-boundary", 5, ["8.24"], 1, "gen", function () {
  var k = ri(-9, 9), r = pick(["lt", "gt", "le", "ge"]);
  var closed = (r === "le" || r === "ge"), dir = (r === "gt" || r === "ge") ? "right" : "left";
  var sol = "Le cercle se trouve toujours sur la valeur limite de l'inéquation, le nombre auquel la variable est comparée : \\[ \\begin{aligned} x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmtD(k) + " \\end{aligned} \\] Donc le cercle se trouve sur <b>" + fmtD(k) + "</b>.";
  return numq("L'inéquation \\(" + "x " + u5sym(r) + " " + fmtD(k) + "\\) est représentée sur une droite numérique. Le graphique a un cercle " + (closed ? "fermé" : "ouvert") + " et l'ombrage va vers la " + (dir === "right" ? "droite" : "gauche") + ". Sur quel nombre le cercle se trouve-t-il ?", k, 0.01, sol, { mode: "boundary", r: r, k: k });
}, ["Le cercle se trouve sur le nombre auquel la variable est comparée dans l'inéquation.", "Trouve d'abord la constante de l'autre côté du signe d'inéquation par rapport à x."]);

// 16. L2, 8.25, CR 3: solve an inequality with addition or subtraction.
E("u5-solve-ineq-addsub", 5, ["8.25"], 1, "gen", function () {
  var r = pick(["lt", "gt", "le", "ge"]), sym = u5sym(r);
  if (Math.random() < 0.5) {
    var b = ri(2, 12), k = ri(-8, 10), c = k + b;
    var sol = "Défais l'addition en soustrayant le même montant des deux côtés ; additionner ou soustraire ne change jamais le sens du signe : \\[ \\begin{aligned} x+" + fmtD(b) + " &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmtD(c) + " \\\\ x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmtD(k) + " \\end{aligned} \\] Donc la valeur limite est <b>" + fmtD(k) + "</b>.";
    return numq("Résous l'inéquation \\(x + " + fmtD(b) + " " + sym + " " + fmtD(c) + "\\). La solution a la forme \\(x " + sym + " k\\). Que vaut \\(k\\) ?", k, 0.01, sol, { mode: "x+b", b: b, c: c, r: r });
  }
  var b2 = ri(2, 12), k2 = ri(-8, 10), c2 = k2 - b2;
  var sol2 = "Défais la soustraction en ajoutant le même montant aux deux côtés ; additionner ou soustraire ne change jamais le sens du signe : \\[ \\begin{aligned} x-" + fmtD(b2) + " &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmtD(c2) + " \\\\ x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmtD(k2) + " \\end{aligned} \\] Donc la valeur limite est <b>" + fmtD(k2) + "</b>.";
  return numq("Résous l'inéquation \\(x - " + fmtD(b2) + " " + sym + " " + fmtD(c2) + "\\). La solution a la forme \\(x " + sym + " k\\). Que vaut \\(k\\) ?", k2, 0.01, sol2, { mode: "x-b", b: b2, c: c2, r: r });
}, ["Utilise l'opération inverse des deux côtés, comme tu le ferais pour une équation.", "Décide d'abord ce qui a été fait à x, puis défais-le des deux côtés du signe."]);

// 17. L2, 8.26: solve an inequality, positive division.
E("u5-solve-ineq-pos-div", 5, ["8.26"], 2, "gen", function () {
  var a = ri(2, 8), k = ri(-6, 9), b = ri(-11, 11); if (b === 0) b = 4;
  var c = a * k + b, r = pick(["lt", "gt", "le", "ge"]), fr = u5flip(r);
  var alt = u5fracTex(c + b, a);
  var corr = u5ineqTex("x", r, fmtD(k));
  var ds = [
    { t: u5ineqTex("x", fr, fmtD(k)), fb: "La valeur limite est bonne, mais diviser par un nombre positif garde le sens du signe ; il ne s'inverse pas." },
    { t: u5ineqTex("x", r, alt), fb: "Cette valeur limite vient d'un déplacement de la constante dans le mauvais sens avant la division." },
    { t: u5ineqTex("x", fr, alt), fb: "Cela contient les deux erreurs : la constante a été déplacée dans le mauvais sens et le signe a été inversé sans raison." }
  ];
  var sol = "Isole x étape par étape ; le diviseur est positif, donc le signe reste tel quel : \\[ \\begin{aligned} " + u5lin(a, b) + " &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmtD(c) + " \\\\ " + fmtD(a) + "x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmtD(c - b) + " \\\\ x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmtD(k) + " \\end{aligned} \\] Donc la solution est <b>" + corr + "</b>.";
  return mcq("Résous l'inéquation \\(" + u5lin(a, b) + " " + u5sym(r) + " " + fmtD(c) + "\\). Quelle inéquation est la solution ?", { t: corr, fb: "Exact : la constante a été défaite, puis les deux côtés ont été divisés par le coefficient positif." }, ds, sol, { mode: "pos-div", a: a, b: b, c: c, r: r });
}, ["Résous-la comme l'équation correspondante, et rappelle-toi que diviser par un nombre positif n'inverse jamais le signe.", "Défais d'abord le terme constant, puis divise les deux côtés par le coefficient de x."]);

// 18. L3, 8.26: negative coefficient, sign must flip.
E("u5-solve-ineq-neg-flip", 5, ["8.26"], 3, "gen", function () {
  var a = ri(2, 6), k = ri(-6, 6); if (k === 0) k = 3;
  var b = ri(-9, 9); if (b === 0) b = 5;
  var c = -a * k + b, r = pick(["lt", "gt", "le", "ge"]), fr = u5flip(r);
  var alt = u5fracTex(-c, a);
  var corr = u5ineqTex("x", fr, fmtD(k));
  var ds = [
    { t: u5ineqTex("x", r, fmtD(k)), fb: "Cela garde le sens d'origine, mais diviser les deux côtés par un nombre négatif inverse le signe." },
    { t: u5ineqTex("x", fr, alt), fb: "Cette valeur limite vient d'une division faite avant que le terme constant soit retiré du côté gauche." },
    { t: u5ineqTex("x", r, alt), fb: "Cela contient les deux erreurs : la constante a été mal traitée et le signe n'a pas été inversé pour le diviseur négatif." }
  ];
  var sol = "Isole x, et inverse le signe quand tu divises par le coefficient négatif : \\[ \\begin{aligned} " + u5lin(-a, b) + " &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmtD(c) + " \\\\ " + fmtD(-a) + "x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmtD(c - b) + " \\\\ x &" + (fr === "lt" || fr === "le" ? "<" : ">") + " " + fmtD(k) + " \\end{aligned} \\] Donc la solution est <b>" + corr + "</b>.";
  return mcq("Résous l'inéquation \\(" + u5lin(-a, b) + " " + u5sym(r) + " " + fmtD(c) + "\\). Quelle inéquation est la solution ?", { t: corr, fb: "Exact : la valeur limite est bonne et le signe a été inversé pour le diviseur négatif." }, ds, sol, { mode: "neg-flip", a: a, b: b, c: c, r: r });
}, ["Surveille l'étape où tu divises par le coefficient : un diviseur négatif inverse le signe d'inéquation.", "Déplace d'abord le terme constant, puis note le signe du coefficient avant de diviser."]);

// 19. L3, 8.27: multi-step inequality with a negative coefficient, boundary value.
E("u5-solve-ineq-multistep-neg", 5, ["8.27"], 3, "gen", function () {
  var r = pick(["lt", "gt", "le", "ge"]), fr = u5flip(r);
  var fsym = (fr === "lt" || fr === "le") ? "<" : ">";
  if (Math.random() < 0.5) {
    var a = ri(2, 6), k = ri(-6, 7), b = ri(-10, 15), c = b - a * k;
    var sol = "Traite le terme comme un coefficient négatif et inverse le signe à l'étape de la division : \\[ \\begin{aligned} " + fmtD(b) + "-" + fmtD(a) + "x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmtD(c) + " \\\\ " + fmtD(-a) + "x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmtD(c - b) + " \\\\ x &" + fsym + " " + fmtD(k) + " \\end{aligned} \\] Donc la valeur limite est <b>" + fmtD(k) + "</b>.";
    return numq("Résous l'inéquation \\(" + fmtD(b) + " - " + fmtD(a) + "x " + u5sym(r) + " " + fmtD(c) + "\\). La solution a la forme \\(x " + u5sym(fr) + " k\\). Que vaut \\(k\\) ?", k, 0.01, sol, { mode: "b-ax", a: a, b: b, c: c, r: r });
  }
  var a2 = ri(2, 5), c0 = ri(2, 8), k2 = ri(-5, 7), d = a2 * (c0 - k2);
  var sol2 = "Développe d'abord la parenthèse, puis inverse le signe quand tu divises par le coefficient négatif : \\[ \\begin{aligned} " + fmtD(a2) + "(" + fmtD(c0) + "-x) &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmtD(d) + " \\\\ " + fmtD(a2 * c0) + "-" + fmtD(a2) + "x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmtD(d) + " \\\\ " + fmtD(-a2) + "x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmtD(d - a2 * c0) + " \\\\ x &" + fsym + " " + fmtD(k2) + " \\end{aligned} \\] Donc la valeur limite est <b>" + fmtD(k2) + "</b>.";
  return numq("Résous l'inéquation \\(" + fmtD(a2) + "(" + fmtD(c0) + " - x) " + u5sym(r) + " " + fmtD(d) + "\\). La solution a la forme \\(x " + u5sym(fr) + " k\\). Que vaut \\(k\\) ?", k2, 0.01, sol2, { mode: "a(c-x)", a: a2, b: c0, c: d, r: r });
}, ["Développe les parenthèses et regroupe d'abord le terme en x ; l'inversion du signe se fait à la division finale par un nombre négatif.", "Développe ou simplifie d'abord le côté gauche jusqu'à ce que le terme en x ait un coefficient négatif."]);

// 20. L2, 8.27: choose the fully correct two-step solution.
E("u5-solve-ineq-two-step-choose", 5, ["8.27"], 2, "gen", function () {
  var a = ri(2, 8), k = ri(-6, 9), b = ri(2, 11), c = a * k - b, r = pick(["lt", "gt", "le", "ge"]), fr = u5flip(r);
  var alt = u5fracTex(c - b, a);
  var corr = u5ineqTex("x", r, fmtD(k));
  var ds = [
    { t: u5ineqTex("x", fr, fmtD(k)), fb: "La valeur limite est bonne, mais rien ici n'inverse le signe : le coefficient de x est positif." },
    { t: u5ineqTex("x", r, alt), fb: "Cette valeur limite vient d'une deuxième soustraction de la constante au lieu de la rajouter." },
    { t: u5ineqTex("x", fr, alt), fb: "Cela contient les deux erreurs : la constante a été traitée dans le mauvais sens et le signe a été inversé sans raison." }
  ];
  var sol = "Défais la soustraction en ajoutant aux deux côtés, puis divise par le coefficient positif : \\[ \\begin{aligned} " + fmtD(a) + "x-" + fmtD(b) + " &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmtD(c) + " \\\\ " + fmtD(a) + "x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmtD(c + b) + " \\\\ x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmtD(k) + " \\end{aligned} \\] Donc la solution entièrement correcte est <b>" + corr + "</b>.";
  return mcq("Quelle inéquation est la solution entièrement correcte de \\(" + fmtD(a) + "x - " + fmtD(b) + " " + u5sym(r) + " " + fmtD(c) + "\\) ?", { t: corr, fb: "Exact : les deux étapes sont bonnes et le sens du signe est inchangé." }, ds, sol, { mode: "two-step-choose", a: a, b: b, c: c, r: r });
}, ["Résous le problème toi-même, une étape à la fois, puis compare ton résultat aux choix.", "Défais d'abord le terme constant en l'ajoutant aux deux côtés, puis divise."]);

// 21. L3, 8.28, var: equation process vs inequality process.
E("u5-compare-eq-ineq-process", 5, ["8.28"], 3, "var", varset([
  function () {
    var sol = "Les deux problèmes divisent par \\(-2\\), mais seule l'inéquation change de sens : \\[ \\begin{aligned} -2x &= 6 \\\\ x &= -3 \\end{aligned} \\] \\[ \\begin{aligned} -2x &> 6 \\\\ x &< -3 \\end{aligned} \\] Donc l'énoncé vrai est que <b>les étapes sont les mêmes, mais le signe d'inéquation s'inverse quand on divise par un nombre négatif</b>.";
    return mcq("Compare la résolution de \\(-2x = 6\\) avec celle de \\(-2x > 6\\). Quel énoncé au sujet des deux démarches est vrai ?", { t: "Les étapes sont les mêmes, mais le signe d'inéquation s'inverse quand les deux côtés sont divisés par -2.", fb: "Exact : diviser par un nombre négatif inverse un signe d'inéquation, et une équation n'a pas de signe à inverser." }, [
      { t: "Les démarches sont identiques en tout, y compris le sens final du signe à la toute fin du travail.", fb: "Une équation n'a pas de signe d'inéquation ; seule l'inéquation peut s'inverser, et elle le fait ici." },
      { t: "L'équation inverse aussi quelque chose quand les deux côtés sont divisés par -2 pendant la résolution du problème.", fb: "Les signes d'égalité ne s'inversent jamais ; la règle d'inversion appartient aux inéquations seulement." },
      { t: "Aucun des deux problèmes n'a besoin de l'étape de division, car on peut simplement laisser tomber le -2 ici.", fb: "Le coefficient doit être défait dans les deux problèmes ; le laisser tomber change la valeur de x." }
    ], sol, { mode: "cmp-proc-neg" });
  },
  function () {
    var sol = "Les étapes de résolution sont identiques parce que le diviseur est positif : \\[ \\begin{aligned} 3x &= 12 \\\\ x &= 4 \\end{aligned} \\] \\[ \\begin{aligned} 3x &< 12 \\\\ x &< 4 \\end{aligned} \\] La différence est dans les réponses, donc l'énoncé vrai est que <b>les démarches sont les mêmes, mais l'équation a une seule solution et l'inéquation a un ensemble de valeurs</b>.";
    return mcq("Compare la résolution de \\(3x = 12\\) avec celle de \\(3x < 12\\). Quel énoncé au sujet des deux démarches est vrai ?", { t: "Les démarches sont les mêmes ; seules les réponses diffèrent, une seule valeur contre un ensemble de valeurs.", fb: "Exact : diviser par 3, un nombre positif, fonctionne de la même façon, et les réponses diffèrent en nature." }, [
      { t: "Le signe d'inéquation s'inverse, parce que chaque étape de division inverse une inéquation dans tous ces problèmes.", fb: "Le signe s'inverse seulement pour un diviseur négatif ; 3 est positif, donc aucune inversion ne se produit." },
      { t: "L'inéquation demande une étape de résolution de plus que l'équation n'a pas du tout dans ce cas.", fb: "Les deux prennent la même seule étape de division ; aucune étape n'est ajoutée pour l'inéquation." },
      { t: "L'équation a un ensemble de solutions et l'inéquation en a une seule dans le problème montré ici.", fb: "C'est l'inverse : l'équation fixe x à une seule valeur, l'inéquation permet un ensemble de valeurs." }
    ], sol, { mode: "cmp-proc-pos" });
  },
  function () {
    var sol = "Additionner et soustraire se comportent de la même façon dans les deux : \\[ \\begin{aligned} x+5 &= 9 \\\\ x &= 4 \\end{aligned} \\] \\[ \\begin{aligned} x+5 &> 9 \\\\ x &> 4 \\end{aligned} \\] Aucune inversion de signe ne se produit pour une addition, donc l'énoncé vrai est que <b>les étapes sont les mêmes et le sens du signe reste le même</b>.";
    return mcq("Compare la résolution de \\(x + 5 = 9\\) avec celle de \\(x + 5 > 9\\). Quel énoncé au sujet des deux démarches est vrai ?", { t: "Les étapes sont les mêmes, et soustraire 5 des deux côtés laisse le sens de l'inéquation inchangé.", fb: "Exact : additionner ou soustraire le même montant ne change jamais le sens d'une inéquation." }, [
      { t: "Le signe d'inéquation s'inverse quand on soustrait 5 des deux côtés dans ce problème.", fb: "L'inversion est liée à la multiplication ou à la division par un nombre négatif, pas à la soustraction d'une constante." },
      { t: "L'inéquation doit être résolue par essais, tandis que l'équation se résout par opérations inverses.", fb: "Les deux se résolvent ici par la même opération inverse : soustraire 5 des deux côtés." },
      { t: "Les deux problèmes ont exactement la même réponse, la seule et unique valeur 4.", fb: "La réponse de l'inéquation est un ensemble de valeurs plus grandes que 4, pas la seule valeur 4." }
    ], sol, { mode: "cmp-proc-add" });
  },
  function () {
    var sol = "Les deux problèmes demandent d'isoler le terme en x, et seule l'inéquation s'inverse : \\[ \\begin{aligned} -x &= 4 \\\\ x &= -4 \\end{aligned} \\] \\[ \\begin{aligned} -x &\\le 4 \\\\ x &\\ge -4 \\end{aligned} \\] Donc l'énoncé vrai est que <b>diviser par -1 inverse l'inéquation mais laisse la réponse de l'équation à une seule valeur</b>.";
    return mcq("Compare la résolution de \\(-x = 4\\) avec celle de \\(-x \\le 4\\). Quel énoncé au sujet des deux démarches est vrai ?", { t: "Les deux divisent par -1, mais seule l'inéquation s'inverse, ce qui change son sens pour « supérieur ou égal ».", fb: "Exact : le coefficient caché est -1, et diviser par lui inverse l'inéquation seulement." }, [
      { t: "Aucune réponse ne change de sens, parce que le coefficient de x ressemble à un simple signe moins placé devant le x.", fb: "Ce signe moins est un coefficient de -1, et diviser par un nombre négatif inverse une inéquation." },
      { t: "La réponse de l'équation devient un ensemble et celle de l'inéquation devient une seule valeur ici.", fb: "C'est l'inverse : les équations donnent une seule valeur ici, les inéquations donnent un ensemble." },
      { t: "L'inéquation garde son sens parce que les parties « égal » ne s'inversent jamais du tout dans ce cas.", fb: "Le signe entier, partie « égal » incluse, s'inverse quand on divise par un nombre négatif." }
    ], sol, { mode: "cmp-proc-negone" });
  },
  function () {
    var sol = "La valeur limite est partagée, et les étapes de résolution sont les mêmes : \\[ \\begin{aligned} 5x &= 20 \\\\ x &= 4 \\end{aligned} \\] \\[ \\begin{aligned} 5x &\\ge 20 \\\\ x &\\ge 4 \\end{aligned} \\] Donc l'énoncé vrai est que <b>la solution de l'équation est la valeur limite de la solution de l'inéquation, et elle y est incluse</b>.";
    return mcq("Compare la résolution de \\(5x = 20\\) avec celle de \\(5x \\ge 20\\). Quel énoncé au sujet des deux démarches est vrai ?", { t: "Les démarches sont les mêmes, et la solution de l'équation, 4, est la valeur limite de la solution de l'inéquation.", fb: "Exact : les deux divisent par 5, et 4 est là où commence l'ensemble de valeurs de l'inéquation." }, [
      { t: "Les démarches diffèrent parce que le signe d'inéquation s'inverse quand on divise par le nombre positif 5 dans ce problème.", fb: "Cinq est positif, donc aucune inversion ne se produit ; les démarches sont les mêmes, étape par étape." },
      { t: "La solution de l'équation, 4, ne fait pas partie de la réponse de l'inéquation du tout dans ce problème.", fb: "La partie « ou égal » inclut la valeur limite, donc 4 satisfait bien l'inéquation." },
      { t: "L'inéquation n'a pas de valeur limite, car sa réponse est un ensemble de valeurs qui continue sans fin.", fb: "Chaque ensemble de valeurs ici commence à une valeur limite ; ici, c'est 4." }
    ], sol, { mode: "cmp-proc-boundary" });
  }
]), ["Résous les deux problèmes côte à côte et surveille la seule étape où ils peuvent différer.", "Fais d'abord les étapes partagées ; demande-toi ensuite si un diviseur négatif apparaît, car c'est la seule différence de démarche."]);

// 22. L2, 8.29, var: numbers satisfying the inequality but not the equation.
E("u5-compare-eq-ineq-solutions", 5, ["8.29"], 1, "var", varset([
  function () {
    var sol = "L'équation est satisfaite seulement par 5, tandis que l'inéquation permet tout ce qui est plus grand : \\[ \\begin{aligned} 6 &> 5 \\\\ 5 &= 5 \\end{aligned} \\] Donc le nombre qui satisfait l'inéquation mais pas l'équation est <b>6</b>.";
    return mcq("L'équation \\(x = 5\\) et l'inéquation \\(x > 5\\) utilisent la même valeur limite. Quel nombre satisfait l'inéquation mais ne satisfait PAS l'équation ?", { t: "6", fb: "Exact : 6 est plus grand que 5, donc il convient à l'inéquation, et ce n'est pas la valeur de l'équation." }, [
      { t: "5", fb: "Cette valeur satisfait l'équation, et l'inéquation stricte l'exclut." },
      { t: "4", fb: "Cette valeur ne satisfait aucun des deux énoncés ; elle est du mauvais côté de la valeur limite." },
      { t: "3", fb: "Cette valeur ne satisfait aucun des deux énoncés ; elle est du mauvais côté de la valeur limite." }
    ], sol, { mode: "cmp-sol-gt" });
  },
  function () {
    var sol = "L'équation est satisfaite seulement par 3, tandis que l'inéquation permet aussi les valeurs plus petites : \\[ \\begin{aligned} 2 &\\le 3 \\\\ 3 &= 3 \\end{aligned} \\] Donc le nombre qui satisfait l'inéquation mais pas l'équation est <b>2</b>.";
    return mcq("L'équation \\(x = 3\\) et l'inéquation \\(x \\le 3\\) utilisent la même valeur limite. Quel nombre satisfait l'inéquation mais ne satisfait PAS l'équation ?", { t: "2", fb: "Exact : 2 est plus petit que 3, donc il convient à l'inéquation, et ce n'est pas la valeur de l'équation." }, [
      { t: "3", fb: "Cette valeur satisfait les deux énoncés, donc ce n'est pas celle demandée." },
      { t: "4", fb: "Cette valeur ne satisfait aucun des deux énoncés ; elle est du mauvais côté de la valeur limite." },
      { t: "5", fb: "Cette valeur ne satisfait aucun des deux énoncés ; elle est du mauvais côté de la valeur limite." }
    ], sol, { mode: "cmp-sol-le" });
  },
  function () {
    var sol = "L'équation est satisfaite seulement par -2, tandis que l'inéquation permet tout ce qui est plus petit : \\[ \\begin{aligned} -3 &< -2 \\\\ -2 &= -2 \\end{aligned} \\] Donc le nombre qui satisfait l'inéquation mais pas l'équation est <b>-3</b>.";
    return mcq("L'équation \\(x = -2\\) et l'inéquation \\(x < -2\\) utilisent la même valeur limite. Quel nombre satisfait l'inéquation mais ne satisfait PAS l'équation ?", { t: "-3", fb: "Exact : -3 est plus petit que -2, donc il convient à l'inéquation, et ce n'est pas la valeur de l'équation." }, [
      { t: "-2", fb: "Cette valeur satisfait l'équation, et l'inéquation stricte l'exclut." },
      { t: "-1", fb: "Cette valeur ne satisfait aucun des deux énoncés ; elle est du mauvais côté de la valeur limite." },
      { t: "0", fb: "Cette valeur ne satisfait aucun des deux énoncés ; elle est du mauvais côté de la valeur limite." }
    ], sol, { mode: "cmp-sol-ltneg" });
  },
  function () {
    var sol = "Résoudre les deux donne la même valeur limite, 4, et l'inéquation permet aussi les valeurs plus grandes : \\[ \\begin{aligned} 2(5) &= 10 > 8 \\\\ 2(4) &= 8 \\end{aligned} \\] Donc le nombre qui satisfait l'inéquation mais pas l'équation est <b>5</b>.";
    return mcq("L'équation \\(2x = 8\\) et l'inéquation \\(2x > 8\\) partagent une valeur limite. Quel nombre satisfait l'inéquation mais ne satisfait PAS l'équation ?", { t: "5", fb: "Exact : doubler 5 donne 10, ce qui convient à l'inéquation, et 5 n'est pas la solution de l'équation." }, [
      { t: "4", fb: "Cette valeur est la solution de l'équation, et l'inéquation stricte l'exclut." },
      { t: "3", fb: "Cette valeur ne satisfait aucun des deux énoncés ; la doubler ne donne que 6." },
      { t: "2", fb: "Cette valeur ne satisfait aucun des deux énoncés ; la doubler ne donne que 4." }
    ], sol, { mode: "cmp-sol-double" });
  },
  function () {
    var sol = "L'équation est satisfaite seulement par 7, tandis que l'inéquation permet aussi les valeurs plus grandes, valeur limite incluse : \\[ \\begin{aligned} 8 &\\ge 7 \\\\ 7 &= 7 \\end{aligned} \\] Donc le nombre qui satisfait l'inéquation mais pas l'équation est <b>8</b>.";
    return mcq("L'équation \\(x = 7\\) et l'inéquation \\(x \\ge 7\\) utilisent la même valeur limite. Quel nombre satisfait l'inéquation mais ne satisfait PAS l'équation ?", { t: "8", fb: "Exact : 8 est plus grand que 7, donc il convient à l'inéquation, et ce n'est pas la valeur de l'équation." }, [
      { t: "7", fb: "Cette valeur satisfait les deux énoncés, donc ce n'est pas celle demandée." },
      { t: "6", fb: "Cette valeur ne satisfait aucun des deux énoncés ; elle est du mauvais côté de la valeur limite." },
      { t: "5", fb: "Cette valeur ne satisfait aucun des deux énoncés ; elle est du mauvais côté de la valeur limite." }
    ], sol, { mode: "cmp-sol-ge" });
  }
]), ["Teste chaque choix dans les deux énoncés ; le nombre cherché passe l'inéquation et échoue l'équation.", "Trouve d'abord la solution de l'équation et élimine-la, puis teste le reste dans l'inéquation."]);

// 23. L2, 8.30: context inequality with its graph shown.
E("u5-context-graph", 5, ["8.30"], 1, "gen", function () {
  var ctxs = [
    { v: "s", r: "le", text: function (k) { return "Un club scolaire peut dépenser au maximum " + fmtDF(k, 2) + " $ en fournitures. Soit s le montant dépensé, en dollars."; } },
    { v: "a", r: "ge", text: function (k) { return "Les passagers doivent mesurer au moins " + fmtD(k) + " cm pour un certain manège. Soit a la taille d'un passager, en centimètres."; } },
    { v: "p", r: "lt", text: function (k) { return "Chaque morceau coupé d'une planche doit être plus court que " + fmtD(k) + " cm. Soit p la longueur d'un morceau, en centimètres."; } },
    { v: "g", r: "gt", text: function (k) { return "Une équipe doit marquer plus de " + fmtD(k) + " points pour avancer. Soit g les points marqués par l'équipe."; } }
  ];
  var cx = pick(ctxs), k = ri(6, 40) * pick([1, 1, 2, 5]);
  var closed = (cx.r === "le" || cx.r === "ge"), dir = (cx.r === "gt" || cx.r === "ge") ? "right" : "left";
  var corr = u5ineqTex(cx.v, cx.r, fmtD(k));
  var others = ["lt", "gt", "le", "ge"].filter(function (s) { return s !== cx.r; });
  var ds = others.map(function (s) { return { t: u5ineqTex(cx.v, s, fmtD(k)), fb: "Cette inéquation ne correspond pas au graphique : vérifie le type de cercle et le sens de l'ombrage par rapport à l'histoire." }; });
  var sol = "L'histoire donne la valeur limite \\(" + fmtD(k) + "\\), et le graphique montre un cercle " + (closed ? "fermé" : "ouvert") + " à cet endroit, avec l'ombrage vers la " + (dir === "right" ? "droite" : "gauche") + ". Donc l'inéquation pour la situation est <b>" + corr + "</b>.";
  var q = mcq(cx.text(k) + " La droite numérique du diagramme représente les montants qui conviennent à la situation. Quelle inéquation décrit la situation ?", { t: corr, fb: "Exact : la variable, la valeur limite, le type de cercle et le sens de l'ombrage correspondent tous à l'histoire." }, ds, sol, { mode: "context-graph", r: cx.r, k: k, v: cx.v });
  q.figure = u5line(k, closed, dir);
  return q;
}, ["Traduis l'histoire en inéquation, puis vérifie-la contre le cercle et l'ombrage du graphique.", "Trouve d'abord le nombre limite dans l'histoire ; le cercle du graphique se trouve sur ce même nombre."]);

// 24. L2, 8.30: context problem, boundary value.
E("u5-context-boundary", 5, ["8.30"], 2, "gen", function () {
  var form = ri(0, 2);
  if (form === 0) {
    var a = ri(2, 9), b = ri(3, 15), n = ri(3, 15), c = a * n + b;
    var sol = "La valeur limite est là où le total égale exactement le budget : \\[ \\begin{aligned} " + fmtD(a) + "n+" + fmtD(b) + " &= " + fmtD(c) + " \\\\ " + fmtD(a) + "n &= " + fmtD(c - b) + " \\\\ n &= " + fmtD(n) + " \\end{aligned} \\] Donc la valeur limite est <b>" + fmtD(n) + "</b>.";
    return numq("Les billets de cinéma coûtent " + fmtDF(a, 2) + " $ chacun, plus des frais de réservation de " + fmtDF(b, 2) + " $ payés une fois. Jay a au maximum " + fmtDF(c, 2) + " $ à dépenser, modélisé par " + fmtD(a) + "n + " + fmtD(b) + " \\(\\le\\) " + fmtD(c) + ", où n est le nombre de billets. La valeur limite est la valeur de n quand le total égale exactement le budget. Quelle est la valeur limite ?", n, 0.01, sol, { mode: "ctx-tickets", a: a, b: b, c: c });
  }
  if (form === 1) {
    var a2 = ri(3, 8), b2 = ri(2, 10), n2 = ri(4, 14), c2 = a2 * n2 + b2;
    var sol2 = "La valeur limite est là où la masse totale égale exactement la limite : \\[ \\begin{aligned} " + fmtD(a2) + "m+" + fmtD(b2) + " &= " + fmtD(c2) + " \\\\ " + fmtD(a2) + "m &= " + fmtD(c2 - b2) + " \\\\ m &= " + fmtD(n2) + " \\end{aligned} \\] Donc la valeur limite est <b>" + fmtD(n2) + "</b>.";
    return numq("Une caisse de levage pèse " + fmtD(b2) + " kg vide. Chaque boîte chargée dedans pèse " + fmtD(a2) + " kg. La masse totale doit être d'au maximum " + fmtD(c2) + " kg, modélisé par " + fmtD(a2) + "m + " + fmtD(b2) + " \\(\\le\\) " + fmtD(c2) + ", où m est le nombre de boîtes. La valeur limite est la valeur de m quand le total égale exactement la limite. Quelle est la valeur limite ?", n2, 0.01, sol2, { mode: "ctx-mass", a: a2, b: b2, c: c2 });
  }
  var a3 = ri(2, 7), b3 = ri(4, 12), n3 = ri(3, 12), c3 = a3 * n3 + b3;
  var sol3 = "La valeur limite est là où les points atteignent exactement la cible : \\[ \\begin{aligned} " + fmtD(a3) + "g+" + fmtD(b3) + " &= " + fmtD(c3) + " \\\\ " + fmtD(a3) + "g &= " + fmtD(c3 - b3) + " \\\\ g &= " + fmtD(n3) + " \\end{aligned} \\] Donc la valeur limite est <b>" + fmtD(n3) + "</b>.";
  return numq("Un jeu donne " + fmtD(a3) + " points pour chaque but et un bonus unique de " + fmtD(b3) + " points. Un joueur veut au moins " + fmtD(c3) + " points, modélisé par " + fmtD(a3) + "g + " + fmtD(b3) + " \\(\\ge\\) " + fmtD(c3) + ", où g est le nombre de buts. La valeur limite est la valeur de g quand les points égalent exactement la cible. Quelle est la valeur limite ?", n3, 0.01, sol3, { mode: "ctx-points", a: a3, b: b3, c: c3 });
}, ["La valeur limite vient de l'équation correspondante : transforme l'inéquation en équation et résous-la.", "Remplace d'abord le signe d'inéquation par un signe d'égalité ; la solution de cette équation est la valeur limite."]);


// Helpers for entries 25 to 28; prefixed u5b to avoid clashing with the u5 helpers above.
function u5bPhrase(r) { return r === "ge" ? "au moins" : r === "le" ? "au plus" : r === "gt" ? "plus de" : "moins de"; }
function u5bDirChar(r) { return (r === "lt" || r === "le") ? "<" : ">"; }
function u5bSolWord(isSol) { return isSol ? "est une solution" : "n'est pas une solution"; }

// 25. L1, 8.1: read an inequality in symbols and choose the matching word statement.
E("u5-ineq-to-words", 5, ["8.1"], 1, "gen", function () {
  var ctxs = [
    { v: "h", desc: "h est la taille d'un passager en centimètres", lead: "La taille d'un passager", unit: "centimètres", ks: [100, 110, 120, 130, 140, 150] },
    { v: "a", desc: "a est l'âge d'un élève en ans", lead: "L'âge d'un élève", unit: "ans", ks: [5, 6, 10, 12, 14, 16, 18] },
    { v: "s", desc: "s est le montant dépensé en dollars", lead: "Le montant dépensé", unit: "dollars", ks: [10, 20, 25, 40, 50, 75, 100] },
    { v: "m", desc: "m est la masse totale dans un monte-charge en kilogrammes", lead: "La masse totale dans le monte-charge", unit: "kilogrammes", ks: [200, 300, 400, 500, 600, 800, 1000] },
    { v: "t", desc: "t est le temps d'attente en minutes", lead: "Le temps d'attente", unit: "minutes", ks: [5, 10, 15, 20, 30, 45, 60] },
    { v: "w", desc: "w est l'eau dans un réservoir en litres", lead: "L'eau dans le réservoir", unit: "litres", ks: [50, 80, 100, 150, 200, 250, 300] },
    { v: "p", desc: "p représente les points marqués par une équipe", lead: "Les points marqués", unit: "points", ks: [10, 20, 30, 40, 50, 60] },
    { v: "d", desc: "d est la distance marchée en kilomètres", lead: "La distance marchée", unit: "kilomètres", ks: [2, 3, 5, 8, 10, 12, 15] }
  ];
  var cx = pick(ctxs), r = pick(["lt", "gt", "le", "ge"]), k = pick(cx.ks);
  function stmt(rr) { return cx.lead + " : " + u5bPhrase(rr) + " " + fmtD(k) + " " + cx.unit + "."; }
  var corr = stmt(r);
  var others = ["lt", "gt", "le", "ge"].filter(function (x) { return x !== r; });
  var ds = others.map(function (x) { return { t: stmt(x), fb: "Cet énoncé utilise l'expression « " + u5bPhrase(x) + " », qui correspond à un autre signe. Vérifie le sens du signe et si la valeur " + fmtD(k) + " elle-même est incluse." }; });
  var why = r === "ge" ? "Le signe veut dire la valeur elle-même ou plus, ce qui est l'expression « au moins »." : r === "le" ? "Le signe veut dire la valeur elle-même ou moins, ce qui est l'expression « au plus »." : r === "gt" ? "Le signe veut dire strictement plus, et la valeur elle-même ne compte pas, ce qui est l'expression « plus de »." : "Le signe veut dire strictement moins, et la valeur elle-même ne compte pas, ce qui est l'expression « moins de ».";
  var sol = why + " L'inéquation en symboles est : \\[ \\begin{aligned} " + cx.v + " &" + u5sym(r) + " " + fmtD(k) + " \\end{aligned} \\] Donc l'énoncé correspondant est <b>" + corr + "</b>";
  return mcq("Dans cette situation, " + cx.desc + ". La condition est écrite " + u5ineqTex(cx.v, r, fmtD(k)) + ". Quel énoncé correspond à cette inéquation ?", { t: corr, fb: "Exact. " + why }, ds, sol, { mode: "ineq-to-words", r: r, k: k, v: cx.v });
}, ["Regarde d'abord le signe : son sens te dit quel côté de la valeur compte.", "Décide si la valeur elle-même est incluse ; une partie « égal » dans le signe veut dire qu'elle l'est."]);

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
  var sub = fmtD(a) + "(" + fmtD(w) + ")" + (b >= 0 ? "+" + fmtD(b) : "-" + fmtD(-b));
  var ineq = u5lin(a, b) + " " + u5sym(r) + " " + fmtD(C);
  var prompt = "Un élève vérifie si \\(x = " + fmtD(w) + "\\) est une solution de \\(" + ineq + "\\). L'élève substitue et écrit \\(" + sub + " = " + fmtD(shownL) + "\\), puis écrit que \\(" + fmtD(shownL) + " " + u5sym(r) + " " + fmtD(C) + "\\) est " + (shownClaim ? "vrai" : "faux") + ", donc \\(x = " + fmtD(w) + "\\) " + u5bSolWord(shownClaim) + ". Quel énoncé au sujet de cette vérification est correct ?";
  function optText(err, solFlag) { return "Le travail montré " + (err ? "contient une erreur" : "est correct") + ", et \\(x = " + fmtD(w) + "\\) " + u5bSolWord(solFlag) + "."; }
  function optTextD(err, solFlag) { return "Le travail montré " + (err ? (hasErr ? "contient une erreur" : "a une erreur") : (hasErr ? "est tout à fait exact" : "est correct")) + ", et \\(x = " + fmtD(w) + "\\) " + (solFlag ? (isSol ? "est une solution" : "est une vraie solution") : (isSol ? "n'en est pas une" : "n'est pas une solution")) + "."; }
  var corr = optText(hasErr, isSol);
  var combos = [[true, true], [true, false], [false, true], [false, false]].filter(function (pr) { return !(pr[0] === hasErr && pr[1] === isSol); });
  var ds = combos.map(function (pr) {
    var parts = [];
    if (pr[0] !== hasErr) parts.push(hasErr ? "le travail montré contient bien une erreur" : "le travail montré ne contient pas d'erreur");
    if (pr[1] !== isSol) parts.push("en fait \\(x = " + fmtD(w) + "\\) " + u5bSolWord(isSol));
    return { t: optTextD(pr[0], pr[1]), fb: "Vérifie encore : " + parts.join(", et ") + "." };
  });
  var errNote = flaw === "arith" ? "La valeur " + fmtD(shownL) + " de l'élève est fausse ; le bon côté gauche est " + fmtD(trueL) + ". " : flaw === "verdict" ? "Le côté gauche de l'élève est bon, mais le verdict est faux. " : "Le travail de l'élève correspond à ceci. ";
  var sol = "Refais la substitution et compare les deux côtés : \\[ \\begin{aligned} " + u5lin(a, b) + " &= " + sub + " \\\\ &= " + fmtD(trueL) + " \\end{aligned} \\] Puisque \\(" + fmtD(trueL) + " " + u5sym(r) + " " + fmtD(C) + "\\) est " + (isSol ? "vrai" : "faux") + ", \\(x = " + fmtD(w) + "\\) " + u5bSolWord(isSol) + ". " + errNote + "Donc l'énoncé correct est <b>" + corr + "</b>";
  return mcq(prompt, { t: corr, fb: "Exact : refaire la substitution donne un côté gauche de " + fmtD(trueL) + ", et la comparaison avec " + fmtD(C) + " règle le verdict." }, ds, sol, { mode: "ineq-check", a: a, b: b, w: w, r: r, c: C, flaw: flaw });
}, ["Refais la substitution toi-même et compare le côté gauche au côté droit avant de juger les mots de l'élève.", "Calcule d'abord le côté gauche avec la valeur donnée ; vérifie ensuite le nombre de l'élève et son verdict contre les tiens."]);

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
    var lhs = form === 0 ? "x" : "x+" + fmtD(b);
    var listStr = vals.map(fmtD).join(", ");
    var lines = vals.map(function (v, i) { return fmtD(tests[i]) + " &" + u5sym(r) + " " + fmtD(k) + " \\quad \\text{" + (u5holds(tests[i], r, k) ? "vrai" : "faux") + "}"; }).join(" \\\\ ");
    var sol = "Substitue chaque valeur listée" + (form === 1 ? " dans \\(x + " + fmtD(b) + "\\), ce qui donne " + tests.map(fmtD).join(", ") + " dans l'ordre," : "") + " et vérifie chaque résultat contre " + fmtD(k) + " : \\[ \\begin{aligned} " + lines + " \\end{aligned} \\] Compter les énoncés vrais donne <b>" + fmtD(cnt) + "</b> des valeurs listées qui satisfont l'inéquation.";
    return numq("Combien des valeurs " + listStr + " satisfont l'inéquation \\(" + lhs + " " + u5sym(r) + " " + fmtD(k) + "\\) ?", cnt, 0.01, sol, { mode: form === 0 ? "count-x" : "count-x+b", r: r, k: k, b: b, n: n });
  }
  var solF = "Substitue chaque valeur listée et vérifie l'énoncé : \\[ \\begin{aligned} -1 &\\le 3 \\quad \\text{vrai} \\\\ 2 &\\le 3 \\quad \\text{vrai} \\\\ 3 &\\le 3 \\quad \\text{vrai} \\\\ 5 &\\le 3 \\quad \\text{faux} \\end{aligned} \\] Compter les énoncés vrais donne <b>3</b> des valeurs listées qui satisfont l'inéquation.";
  return numq("Combien des valeurs -1, 2, 3, 5 satisfont l'inéquation \\(x \\le 3\\) ?", 3, 0.01, solF, { mode: "count-x", r: "le", k: 3, b: 0, n: 4 });
}, ["Teste chaque valeur listée dans l'inéquation, une à la fois, et garde un compte courant.", "Teste d'abord la valeur limite elle-même, car la partie « égal » du signe décide si elle compte."]);

// 28. L2, 8.25: choose the correct solution of an inequality that needs only addition or subtraction.
E("u5-solve-ineq-addsub-choose", 5, ["8.25"], 1, "gen", function () {
  var r = pick(["lt", "gt", "le", "ge"]), fr = u5flip(r);
  var b = ri(2, 12), k = ri(-8, 10);
  var isAdd = Math.random() < 0.5;
  var c = isAdd ? k + b : k - b;
  var kW = isAdd ? c + b : c - b;
  var lhs = isAdd ? "x+" + fmtD(b) : "x-" + fmtD(b);
  var corr = u5ineqTex("x", r, fmtD(k));
  var ds = [
    { t: u5ineqTex("x", r, fmtD(kW)), fb: "Le sens est bon, mais cette valeur limite vient de " + (isAdd ? "l'addition" : "la soustraction") + " de " + fmtD(b) + " une deuxième fois au lieu de défaire l'opération sur x." },
    { t: u5ineqTex("x", fr, fmtD(k)), fb: "La valeur limite est bonne, mais additionner ou soustraire le même montant des deux côtés ne change jamais le sens du signe." },
    { t: u5ineqTex("x", fr, fmtD(kW)), fb: "Cela contient les deux erreurs : la valeur limite vient de la mauvaise opération, et le sens a été changé même si seule une addition ou une soustraction est en jeu." }
  ];
  var step = isAdd ? "Soustrais " + fmtD(b) + " des" : "Ajoute " + fmtD(b) + " aux";
  var sol = step + " deux côtés ; additionner ou soustraire ne change jamais le sens du signe : \\[ \\begin{aligned} " + lhs + " &" + u5bDirChar(r) + " " + fmtD(c) + " \\\\ x &" + u5bDirChar(r) + " " + fmtD(k) + " \\end{aligned} \\] Donc la solution est <b>" + corr + "</b>.";
  return mcq("Résous l'inéquation \\(" + lhs + " " + u5sym(r) + " " + fmtD(c) + "\\). Quelle inéquation est la solution ?", { t: corr, fb: "Exact : l'opération sur x a été défaite des deux côtés et le sens est resté le même." }, ds, sol, { mode: isAdd ? "choose-x+b" : "choose-x-b", b: b, c: c, r: r });
}, ["Défais ce qui a été fait à x, avec la même opération des deux côtés du signe.", "Décide d'abord si un montant a été ajouté à x ou soustrait de x, puis défais cette étape et garde le sens du signe."]);
/* TRANSLATOR NOTES
   - Terms where the glossary was silent: pattern = régularité (motif for a
     physical arrangement built from objects); stage = étape; step (the
     constant increase) = pas, and start value = valeur de départ, both
     following the French reference panel for this unit; figure = figure.
   - Item words in the entry 1 pick list translated: tiles = tuiles, dots =
     points, blocks = blocs, counters = jetons. Entry 13: matchsticks =
     allumettes (its item field is metadata only and was left as in the
     source, like the mode strings).
   - KaTeX \text{...} labels (step, start, total, value, Plan A, Plan B,
     difference) kept byte-identical to the source, following the precedent
     in panels-fr.htmlpart; only the prose around them was translated.
   - FMT-GEOM lines left as fmt( (SVG attribute or coordinate strings), each
     marked /* FMT-GEOM * / on its line: the u6graph X helper, the u6graph Y
     helper, the u6graph line-label positioning line, the u6graph
     point-label positioning line, the u6graph y-axis label line, and the
     u6stageFig mid line. Every other fmt( became fmtD(.
   - Money: the only generated "$" + fmt(...) expressions are the two entry
     12 solution totals; both were rewritten as fmtDF(...,2) + " $" per the
     money rule. Money in entries 2 and 3 is built from raw integer
     variables, so only the $ sign moved after the amount, as in the source.
   - Literal formatted numbers written into static prose: dollar amounts
     only, all in entry 4 variants: 1 $, 2 $, 3 $, 4 $, 5 $, 6 $, 7 $, 10 $
     (in combinations such as "frais de 10 $" and "3 $ chacun"). No literal
     decimals, percents or thousands occur in the source chunk, so no
     decimal-comma, percent or thousands literals were written.
   - Entry 14: the unit check ctx.indexOf("ride") was translated to
     ctx.indexOf("sortie") to match the translated context string; the
     logic is unchanged. Entry 12: the ctx.xu comparison literals were
     translated together with the ctx.xu values (Go de données, jours
     loués, heures louées) so the same branches are taken.
   - Axis unit labels in ctx objects are display text and were translated
     (heures, minutes, articles, semaines, photos, jours, Go); the yl "$"
     label is a currency symbol only and was kept.
   - Unsure: the pattern/step terminology above (régularité, pas, étape)
     should be confirmed by the guide reconciliation pass.
*/

/* ----- bank-u6.js ----- */
// Math 9 (French) Unit 6 Linear Relations question bank
// Cut verbatim from the standalone bank source
// (math-9-review-fr/bank-src.js, lines 3411 to 3904).
// CRMARKS: u6-pattern-word-total=2
// CRMARKS: u6-table-extend=3
// CRMARKS: u6-point-on-graph=2
// CRMARKS: u6-interpolate-graph=3
// CRMARKS: u6-two-plans-graph=3
// CRMARKS: u6-pattern-solve-n=3
// CRMARKS: u6-pattern-large=2
// Unit 6: Linear Relations (Math 9, NL). Entries only; helpers prefixed u6.
function u6lin(m, b, v) {
  var head = (m === 1 ? v : fmtD(m) + v);
  if (b > 0) return head + " + " + fmtD(b);
  if (b < 0) return head + " - " + fmtD(-b);
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
  function X(v) { return fmt(x0 + v * sx, 1); } /* FMT-GEOM */
  function Y(v) { return fmt(y0 - v * sy, 1); } /* FMT-GEOM */
  var xs = o.xstep || (o.xmax <= 10 ? 1 : 2);
  var ys = o.ystep || (o.ymax <= 12 ? 1 : (o.ymax <= 26 ? 2 : 5));
  var s = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Graphique d\'une relation linéaire">';
  var g;
  for (g = xs; g < o.xmax; g += xs) s += '<line x1="' + X(g) + '" y1="' + y1 + '" x2="' + X(g) + '" y2="' + y0 + '" stroke="#dce8df" stroke-width="1"/>';
  for (g = ys; g < o.ymax; g += ys) s += '<line x1="' + x0 + '" y1="' + Y(g) + '" x2="' + x1 + '" y2="' + Y(g) + '" stroke="#dce8df" stroke-width="1"/>';
  (o.lines || []).forEach(function (L) {
    var pts = L.pts.map(function (p) { return X(p[0]) + "," + Y(p[1]); }).join(" ");
    s += '<polyline points="' + pts + '" fill="none" stroke="' + (L.col || FIG_INK) + '" stroke-width="' + (L.w || 2.5) + '"' + (L.dash ? ' stroke-dasharray="7 5"' : "") + '/>';
    if (L.lab) { var lp = L.pts[L.pts.length - 1]; s += '<text x="' + fmt(x0 + lp[0] * sx - 4, 1) + '" y="' + fmt(y0 - lp[1] * sy - 10, 1) + '" font-size="12" font-weight="bold" fill="' + (L.col || FIG_INK) + '" text-anchor="end">' + L.lab + '</text>'; } /* FMT-GEOM */
  });
  (o.points || []).forEach(function (P) {
    s += '<circle cx="' + X(P.x) + '" cy="' + Y(P.y) + '" r="3.5" fill="' + (P.col || FIG_ACC) + '"/>';
    if (P.lab) s += '<text x="' + fmt(x0 + P.x * sx + 8, 1) + '" y="' + fmt(y0 - P.y * sy - 8, 1) + '" font-size="12" fill="' + FIG_INK + '">' + P.lab + '</text>'; /* FMT-GEOM */
  });
  s += '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + x1 + '" y2="' + y0 + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  s += '<polygon points="' + x1 + ',' + y0 + ' ' + (x1 - 9) + ',' + (y0 - 4) + ' ' + (x1 - 9) + ',' + (y0 + 4) + '" fill="' + FIG_INK + '"/>';
  s += '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + x0 + '" y2="' + y1 + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  s += '<polygon points="' + x0 + ',' + y1 + ' ' + (x0 - 4) + ',' + (y1 + 9) + ' ' + (x0 + 4) + ',' + (y1 + 9) + '" fill="' + FIG_INK + '"/>';
  for (g = 0; g <= o.xmax; g += xs) s += '<line x1="' + X(g) + '" y1="' + y0 + '" x2="' + X(g) + '" y2="' + (y0 + 5) + '" stroke="' + FIG_INK + '" stroke-width="1.5"/><text x="' + X(g) + '" y="' + (y0 + 20) + '" font-size="12" fill="' + FIG_INK + '" text-anchor="middle">' + g + '</text>';
  for (g = ys; g <= o.ymax; g += ys) s += '<line x1="' + (x0 - 5) + '" y1="' + Y(g) + '" x2="' + x0 + '" y2="' + Y(g) + '" stroke="' + FIG_INK + '" stroke-width="1.5"/><text x="' + (x0 - 10) + '" y="' + Y(g) + '" font-size="12" fill="' + FIG_INK + '" text-anchor="end" dominant-baseline="central">' + g + '</text>';
  s += '<text x="' + x1 + '" y="' + (y0 + 38) + '" font-size="13" font-style="italic" fill="' + FIG_INK + '" text-anchor="end">' + (o.xlab || "x") + '</text>';
  s += '<text x="' + fmt(x0 - 4, 1) + '" y="' + (y1 - 10) + '" font-size="13" font-style="italic" fill="' + FIG_INK + '" text-anchor="middle">' + (o.ylab || "y") + '</text>'; /* FMT-GEOM */
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
  var s = '<svg xmlns="http://www.w3.org/2000/svg" width="' + totW + '" height="' + H + '" viewBox="0 0 ' + totW + ' ' + H + '" role="img" aria-label="Trois premières étapes d\'une régularité croissante">';
  var cx = pad;
  counts.forEach(function (c, i) {
    var w = widths[i], mid = fmt(cx + w / 2, 1); /* FMT-GEOM */
    s += '<text x="' + mid + '" y="12" font-size="12" font-weight="bold" fill="' + FIG_INK + '" text-anchor="middle">Étape ' + (i + 1) + '</text>';
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
E("u6-pattern-figure-expr", 6, ["7.1"], 2, "gen", function () {
  var item = pick(["tuiles", "points", "blocs", "jetons"]);
  var m = ri(2, 6), b = ri(1, 8), att = 0;
  while (m === b && att < 40) { m = ri(2, 6); b = ri(1, 8); att++; }
  if (m === b) { m = 3; b = 2; }
  var counts = [b + m, b + 2 * m, b + 3 * m];
  var corr = "\\(" + u6lin(m, b, "n") + "\\)";
  var ds = [
    { t: "\\(" + u6lin(b, m, "n") + "\\)", fb: "Cela échange la valeur de départ et le pas. Le nombre augmente de " + fmtD(m) + " à chaque étape, donc " + fmtD(m) + " multiplie n." },
    { t: "\\(" + u6lin(m, -b, "n") + "\\)", fb: "Cela soustrait la valeur de départ. La valeur de départ est ajoutée, car l'étape 1 est déjà plus qu'un seul pas." },
    { t: "\\(" + fmtD(m + b) + "n\\)", fb: "Cela met la valeur de départ dans le pas. La valeur de départ est ajoutée une fois, pas une fois par étape." }
  ];
  var sol = "Les nombres augmentent du même montant à chaque étape : \\[ \\begin{aligned} \\text{pas} &= " + counts[1] + " - " + counts[0] + " = " + fmtD(m) + " \\\\ \\text{départ} &= " + counts[0] + " - " + fmtD(m) + " = " + fmtD(b) + " \\end{aligned} \\] Donc le nombre de " + item + " à l'étape \\(n\\) est <b>" + corr + "</b>.";
  var q = mcq("Le diagramme montre les trois premières étapes d'une régularité faite avec des " + item + ". Quelle expression donne le nombre de " + item + " à l'étape \\(n\\) ?",
    { t: corr, fb: "Exact. La valeur de départ est " + fmtD(b) + " et chaque nouvelle étape ajoute " + fmtD(m) + "." }, ds, sol,
    { mode: "pattern-figure-expr", m: m, b: b, item: item });
  q.figure = u6stageFig(counts, item);
  return q;
}, ["Trouve de combien le nombre augmente d'une étape à l'autre ; cette augmentation est le pas.", "Pars de l'étape 1 et soustrais un pas pour obtenir la valeur de départ."]);

// 2. L2, 7.1, CR 2: pattern in words, total at a larger stage.
E("u6-pattern-word-total", 6, ["7.1"], 1, "gen", function () {
  var S = ri(4, 48), r = ri(2, 9), N = ri(11, 30);
  var ctx = pick([
    "Un pot d'épargne commence avec " + S + " $. Chaque semaine, on ajoute " + r + " $ au pot. Combien d'argent, en dollars, y a-t-il dans le pot après " + N + " semaines ?",
    "Un plant de tomate mesure " + S + " cm. Il grandit de " + r + " cm chaque semaine. Quelle est sa hauteur, en centimètres, après " + N + " semaines ?",
    "Une lectrice a terminé " + S + " pages d'un roman. Elle lit " + r + " pages de plus chaque jour. Combien de pages a-t-elle terminées après " + N + " jours ?",
    "Un réservoir d'eau contient " + S + " litres. Un tuyau ajoute " + r + " litres chaque heure. Combien de litres y a-t-il dans le réservoir après " + N + " heures ?"
  ]);
  var ans = S + r * N;
  var sol = "Commence avec le montant de départ, puis ajoute le pas une fois pour chaque étape : \\[ \\begin{aligned} \\text{total} &= " + S + " + " + fmtD(r) + " \\times " + N + " \\\\ &= " + S + " + " + fmtD(r * N) + " \\\\ &= " + fmtD(ans) + " \\end{aligned} \\] Donc le total après " + N + " étapes est <b>" + fmtD(ans) + "</b>.";
  return numq(ctx, ans, 0.01, sol, { mode: "pattern-word-total", S: S, r: r, N: N });
}, ["Le total est le montant de départ plus le pas, ajouté une fois pour chaque étape.", "Multiplie d'abord le pas par le nombre d'étapes."]);

// 3. L1, 7.2: choose the equation for a simple cost context.
E("u6-context-equation", 6, ["7.2"], 1, "gen", function () {
  var B = ri(3, 40), R = ri(2, 15), att = 0;
  while (B === R && att < 40) { B = ri(3, 40); R = ri(2, 15); att++; }
  if (B === R) { B = 12; R = 3; }
  var ctx = pick([
    "Un trajet en taxi coûte des frais de base de " + B + " $, plus " + R + " $ pour chaque kilomètre parcouru. Soit \\(x\\) le nombre de kilomètres et \\(y\\) le coût total en dollars.",
    "Un gymnase demande des frais d'inscription de " + B + " $, plus " + R + " $ pour chaque cours suivi. Soit \\(x\\) le nombre de cours et \\(y\\) le coût total en dollars.",
    "Un plombier demande des frais de déplacement de " + B + " $, plus " + R + " $ pour chaque heure de travail. Soit \\(x\\) le nombre d'heures et \\(y\\) le coût total en dollars.",
    "Un chariot de collations demande " + B + " $ pour un plateau, plus " + R + " $ pour chaque boisson sur le plateau. Soit \\(x\\) le nombre de boissons et \\(y\\) le coût total en dollars."
  ]);
  var corr = "\\(y = " + u6lin(R, B, "x") + "\\)";
  var sol = "Les frais de " + B + " $ sont payés une fois, et le montant de " + R + " $ est payé \\(x\\) fois : \\[ \\begin{aligned} y &= " + B + " + " + fmtD(R) + "x \\end{aligned} \\] Donc l'équation est <b>" + corr + "</b>.";
  return mcq(ctx + " Quelle équation donne \\(y\\) ?",
    { t: corr, fb: "Exact. Les frais uniques sont la valeur de départ et le montant par unité est le pas." },
    [
      { t: "\\(y = " + u6lin(B, R, "x") + "\\)", fb: "Cela échange les deux montants. Les frais sont payés une fois, donc ils ne sont pas multipliés par x." },
      { t: "\\(y = " + B + " + " + R + " + x\\)", fb: "Cela additionne le taux au lieu de le multiplier par le nombre d'unités." },
      { t: "\\(y = " + fmtD(B + R) + "x\\)", fb: "Cela additionne les frais et le taux, puis multiplie la somme par x, donc les frais sont demandés à chaque unité." }
    ], sol, { mode: "context-equation", B: B, R: R });
}, ["Décide quel montant est payé une fois et quel montant est payé pour chaque unité.", "Le montant payé pour chaque unité multiplie x ; le montant unique reste seul."]);

// 4. L2, 7.3: given an equation, choose a context it could describe.
E("u6-equation-context", 6, ["7.3"], 1, "var", varset([
  function () {
    return mcq("Quelle situation peut être décrite par l'équation \\(y = 3x + 2\\) ?",
      { t: "Une plante mesure 2 cm à la première mesure, puis grandit de 3 cm chaque semaine. y est sa hauteur en centimètres après x semaines.", fb: "Exact. La valeur de départ est 2 et le pas est 3 chaque semaine." },
      [
        { t: "Une plante mesure 3 cm à la première mesure, puis grandit de 2 cm chaque semaine. y est sa hauteur en centimètres après x semaines.", fb: "Cette situation donne y = 2x + 3 : le départ et le pas sont échangés." },
        { t: "Un réservoir plein contient 2 L d'eau et se vide de 3 L chaque heure. y est l'eau qui reste dans le réservoir après x heures.", fb: "Se vider fait diminuer y, mais dans l'équation, y augmente de 3 à chaque pas." },
        { t: "Un magasin vend des cahiers à 3 $ chacun et des stylos à 2 $ chacun. y est le coût de x cahiers et de x stylos.", fb: "Ce coût est 3x + 2x, c'est-à-dire 5x, sans valeur de départ ajoutée une fois." }
      ],
      "Dans \\(y = 3x + 2\\), la valeur de départ est 2 et le pas est +3 pour chaque augmentation de 1 de \\(x\\) : \\[ \\begin{aligned} y &= 2 + 3x \\end{aligned} \\] Donc la situation qui correspond est <b>la plante qui commence à 2 cm et grandit de 3 cm chaque semaine</b>.",
      { mode: "eq-context-plant" });
  },
  function () {
    return mcq("Quelle situation peut être décrite par l'équation \\(y = 5x + 10\\) ?",
      { t: "Un messager demande des frais de ramassage de 10 $, plus 5 $ pour chaque kilomètre. y est le montant total en dollars pour x kilomètres.", fb: "Exact. La valeur de départ est 10 et le pas est 5 par kilomètre." },
      [
        { t: "Un messager demande des frais de ramassage de 5 $, plus 10 $ pour chaque kilomètre. y est le montant total en dollars pour x kilomètres.", fb: "Cette situation donne y = 10x + 5 : les frais et le taux sont échangés." },
        { t: "Un pot d'épargne contient 10 $ et on retire 5 $ chaque semaine. y est l'argent qui reste dans le pot après x semaines.", fb: "Retirer de l'argent fait diminuer y, mais dans l'équation, y augmente de 5 à chaque pas." },
        { t: "Un magasin vend des chandails à 5 $ chacun et des chapeaux à 10 $ chacun. y est le coût de x chandails et de x chapeaux.", fb: "Ce coût est 5x + 10x, c'est-à-dire 15x, sans frais ajoutés une fois." }
      ],
      "Dans \\(y = 5x + 10\\), la valeur de départ est 10 et le pas est +5 pour chaque augmentation de 1 de \\(x\\) : \\[ \\begin{aligned} y &= 10 + 5x \\end{aligned} \\] Donc la situation qui correspond est <b>le messager avec des frais de 10 $ et 5 $ par kilomètre</b>.",
      { mode: "eq-context-courier" });
  },
  function () {
    return mcq("Quelle situation peut être décrite par l'équation \\(y = 2x + 7\\) ?",
      { t: "Un pot commence avec 7 $ dedans, et on ajoute 2 $ chaque semaine. y est le montant dans le pot après x semaines.", fb: "Exact. La valeur de départ est 7 et le pas est 2 chaque semaine." },
      [
        { t: "Un pot commence avec 2 $ dedans, et on ajoute 7 $ chaque semaine. y est le montant dans le pot après x semaines.", fb: "Cette situation donne y = 7x + 2 : le départ et le pas sont échangés." },
        { t: "Une corde de 7 m est coupée en morceaux de 2 m chacun. y est le nombre de morceaux coupés dans x cordes.", fb: "Ce nombre dépend d'une division, et il n'a pas de valeur de départ de 7 ajoutée une fois." },
        { t: "Une classe achète 2 marqueurs pour chacun de x élèves et 7 pour chacun de x enseignants. y est le total de marqueurs.", fb: "Ce total est 2x + 7x, c'est-à-dire 9x, sans valeur de départ ajoutée une fois." }
      ],
      "Dans \\(y = 2x + 7\\), la valeur de départ est 7 et le pas est +2 pour chaque augmentation de 1 de \\(x\\) : \\[ \\begin{aligned} y &= 7 + 2x \\end{aligned} \\] Donc la situation qui correspond est <b>le pot qui commence avec 7 $ et gagne 2 $ chaque semaine</b>.",
      { mode: "eq-context-jar" });
  },
  function () {
    return mcq("Quelle situation peut être décrite par l'équation \\(y = 4x + 1\\) ?",
      { t: "Un réservoir contient 1 L d'eau et se remplit à 4 L par minute. y est la quantité d'eau après x minutes.", fb: "Exact. La valeur de départ est 1 et le pas est 4 chaque minute." },
      [
        { t: "Un réservoir contient 4 L d'eau et se remplit à 1 L par minute. y est la quantité d'eau après x minutes.", fb: "Cette situation donne y = x + 4 : le départ et le pas sont échangés." },
        { t: "Un gâteau est partagé également entre 4 amis, et 1 part est gardée. y est la taille de chaque part.", fb: "Partager, c'est diviser, et les parts deviennent plus petites quand x augmente, contrairement à cette équation." },
        { t: "Un gymnase vend 4 laissez-passer le matin et 1 par heure après cela. y est le nombre vendu après x heures.", fb: "Cette formulation fait du 4 un montant unique pour le matin, ce qui échange les rôles de 4 et de 1." }
      ],
      "Dans \\(y = 4x + 1\\), la valeur de départ est 1 et le pas est +4 pour chaque augmentation de 1 de \\(x\\) : \\[ \\begin{aligned} y &= 1 + 4x \\end{aligned} \\] Donc la situation qui correspond est <b>le réservoir qui commence avec 1 L et se remplit à 4 L par minute</b>.",
      { mode: "eq-context-tank" });
  },
  function () {
    return mcq("Quelle situation peut être décrite par l'équation \\(y = 6x + 3\\) ?",
      { t: "Un autobus a 3 passagers à son premier arrêt, et 6 passagers de plus montent à chaque arrêt après cela. y est le nombre de passagers après x arrêts.", fb: "Exact. La valeur de départ est 3 et le pas est 6 à chaque arrêt." },
      [
        { t: "Un autobus a 6 passagers à son premier arrêt, et 3 passagers de plus montent à chaque arrêt après cela. y est le nombre de passagers après x arrêts.", fb: "Cette situation donne y = 3x + 6 : le départ et le pas sont échangés." },
        { t: "Un boulanger met 6 petits pains dans chaque boîte et garde 3 boîtes de côté. y est le nombre de petits pains dans x boîtes au total.", fb: "Ce nombre est 6x avec 3 boîtes, et non 3 petits pains, gardés de côté ; l'équation ajoute 3 une fois à y." },
        { t: "Une équipe marque 6 points pour chacun de x matchs et 3 points pour chacune de x pratiques. y est le total de points marqués.", fb: "Ce total est 6x + 3x, c'est-à-dire 9x, sans valeur de départ ajoutée une fois." }
      ],
      "Dans \\(y = 6x + 3\\), la valeur de départ est 3 et le pas est +6 pour chaque augmentation de 1 de \\(x\\) : \\[ \\begin{aligned} y &= 3 + 6x \\end{aligned} \\] Donc la situation qui correspond est <b>l'autobus qui commence avec 3 passagers et en gagne 6 à chaque arrêt</b>.",
      { mode: "eq-context-bus" });
  },
  function () {
    return mcq("Quelle situation peut être décrite par l'équation \\(y = 10x + 5\\) ?",
      { t: "La location d'une salle coûte des frais de réservation de 5 $, plus 10 $ pour chaque heure. y est le coût total en dollars pour x heures.", fb: "Exact. La valeur de départ est 5 et le pas est 10 par heure." },
      [
        { t: "La location d'une salle coûte des frais de réservation de 10 $, plus 5 $ pour chaque heure. y est le coût total en dollars pour x heures.", fb: "Cette situation donne y = 5x + 10 : les frais et le taux sont échangés." },
        { t: "Un laissez-passer de sentier coûte 5 $ pour chacun de x marcheurs, et le groupe paie aussi 10 $ pour le stationnement. y est le coût total en dollars.", fb: "Cette situation donne y = 5x + 10 : le coût par personne et le coût unique sont échangés." },
        { t: "Un kiosque de ferme vend des melons à 10 $ chacun et des petits fruits à 5 $ la boîte. y est le coût de x melons et de x boîtes de petits fruits.", fb: "Ce coût est 10x + 5x, c'est-à-dire 15x, sans frais ajoutés une fois." }
      ],
      "Dans \\(y = 10x + 5\\), la valeur de départ est 5 et le pas est +10 pour chaque augmentation de 1 de \\(x\\) : \\[ \\begin{aligned} y &= 5 + 10x \\end{aligned} \\] Donc la situation qui correspond est <b>la location de salle avec des frais de 5 $ et 10 $ par heure</b>.",
      { mode: "eq-context-hall" });
  }
]), ["Dans l'équation, le nombre ajouté une fois est la valeur de départ et le nombre qui multiplie x est le pas.", "Fais d'abord correspondre la valeur de départ : cherche la situation avec ce montant unique."]);

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
    ? "Quand \\(x = 0\\), \\(y = " + S + "\\), donc la valeur de départ est " + S + "."
    : "En prolongeant la régularité d'un pas vers l'arrière, quand \\(x = 0\\), \\(y = " + ys[0] + " - " + P + " = " + S + "\\), donc la valeur de départ est " + S + ".";
  var sol = "Les valeurs de \\(y\\) augmentent du même montant chaque fois que \\(x\\) augmente de 1 : \\[ \\begin{aligned} \\text{pas} &= " + ys[1] + " - " + ys[0] + " = " + fmtD(P) + " \\end{aligned} \\] " + startNote + " Donc l'équation est <b>" + corr + "</b>.";
  var prompt = "Une table de valeurs d'une relation linéaire est montrée.<br>x: " + xs.join(", ") + "<br>y: " + ys.join(", ") + "<br>Quelle équation correspond à la table ?";
  return mcq(prompt,
    { t: corr, fb: "Exact. Le pas est " + fmtD(P) + " et la valeur de départ est " + fmtD(S) + "." },
    [
      { t: "\\(y = " + u6lin(S, P, "x") + "\\)", fb: "Cela échange la valeur de départ et le pas. Vérifie avec la première valeur de la table." },
      { t: "\\(y = " + u6lin(P, -S, "x") + "\\)", fb: "Cela soustrait la valeur de départ. Les valeurs de y sont plus grandes que le pas seul, donc le départ est ajouté." },
      { t: "\\(y = " + u6lin(P, S + P, "x") + "\\)", fb: "Le pas est correct, mais la valeur de départ est trop grande. Utilise la valeur de y quand x vaut 0." }
    ], sol, { mode: "table-equation", S: S, P: P, x0: x0 });
}, ["Trouve d'abord le pas : de combien y change-t-il quand x augmente de 1 ?", "La valeur de départ est la valeur de y quand x vaut 0 ; prolonge la régularité vers l'arrière si la table commence plus tard."]);

// 6. L2, 7.4, CR 3: table pattern, value beyond the table.
E("u6-table-extend", 6, ["7.4"], 2, "gen", function () {
  var S = ri(2, 15), P = ri(2, 8), X = ri(8, 15);
  var xs = [0, 1, 2, 3], ys = xs.map(function (x) { return S + P * x; });
  var ans = S + P * X;
  var sol = "Le pas est le changement de \\(y\\) pour chaque augmentation de 1 de \\(x\\), et la valeur de départ est la valeur de \\(y\\) à \\(x = 0\\) : \\[ \\begin{aligned} \\text{pas} &= " + ys[1] + " - " + ys[0] + " = " + fmtD(P) + " \\\\ y &= " + S + " + " + fmtD(P) + "x \\\\ y(" + X + ") &= " + S + " + " + fmtD(P) + "(" + X + ") \\\\ &= " + S + " + " + fmtD(P * X) + " \\\\ &= " + fmtD(ans) + " \\end{aligned} \\] Donc la valeur à \\(x = " + X + "\\) est <b>" + fmtD(ans) + "</b>.";
  var prompt = "Une table de valeurs d'une relation linéaire est montrée.<br>x: " + xs.join(", ") + "<br>y: " + ys.join(", ") + "<br>La régularité se poursuit avec le même pas. Quelle est la valeur de y quand x = " + X + " ?";
  return numq(prompt, ans, 0.01, sol, { mode: "table-extend", S: S, P: P, X: X });
}, ["Construis d'abord l'équation à partir de la table : la valeur de départ plus le pas fois x.", "La valeur de départ est la valeur de y à x = 0, et le pas est le changement de y pour chaque +1 de x."]);

// 7. L2, 7.5: graphed relation, choose the description of its pattern.
E("u6-graph-describe", 6, ["7.5"], 2, "gen", function () {
  var ctxs = [
    { x: "heures", y: "km", xl: "heures", yl: "km" },
    { x: "minutes", y: "litres", xl: "minutes", yl: "L" },
    { x: "articles", y: "dollars", xl: "articles", yl: "$" },
    { x: "semaines", y: "centimètres", xl: "semaines", yl: "cm" }
  ];
  for (var att = 0; att < 300; att++) {
    var b = ri(1, 6), m = ri(1, 3), ctx = pick(ctxs);
    var corr = "Elle commence à " + fmtD(b) + " et augmente de " + fmtD(m) + " à chaque étape.";
    var cands = [
      { t: "Elle commence à " + fmtD(m) + " et augmente de " + fmtD(b) + " à chaque étape.", fb: "Cela échange le départ et le pas. La droite coupe l'axe des ordonnées à " + fmtD(b) + "." },
      { t: "Elle commence à " + fmtD(b) + " et augmente de " + fmtD(m + 1) + " à chaque étape.", fb: "Le départ est correct, mais vérifie la montée entre deux points voisins : elle est de " + fmtD(m) + ", et non de " + fmtD(m + 1) + "." },
      { t: "Elle commence à " + fmtD(b + 1) + " et augmente de " + fmtD(m) + " à chaque étape.", fb: "Le pas est correct, mais la droite coupe l'axe des ordonnées à " + fmtD(b) + ", et non à " + fmtD(b + 1) + "." },
      { t: "Elle commence à " + fmtD(b) + " et diminue de " + fmtD(m) + " à chaque étape.", fb: "La droite monte quand x augmente, donc les valeurs augmentent ; elles ne diminuent pas." },
      { t: "Elle commence à 0 et augmente de " + fmtD(m) + " à chaque étape.", fb: "Le pas est correct, mais la droite coupe l'axe des ordonnées à " + fmtD(b) + ", et non à 0." }
    ];
    var ds = u6pick3(corr, cands);
    if (!ds) continue;
    var xmax = 5, ymax = b + m * xmax;
    var pts = []; for (var k = 0; k <= xmax; k++) pts.push({ x: k, y: b + m * k });
    var sol = "Lis le départ là où la droite coupe l'axe des ordonnées, puis la montée entre deux points voisins : \\[ \\begin{aligned} \\text{départ} &= " + fmtD(b) + " \\\\ \\text{pas} &= " + fmtD(b + m) + " - " + fmtD(b) + " = " + fmtD(m) + " \\end{aligned} \\] Donc la régularité est <b>" + corr + "</b>";
    var q = mcq("Le graphique montre une relation linéaire. L'axe des abscisses est mesuré en " + ctx.x + " et l'axe des ordonnées en " + ctx.y + ". Quelle phrase décrit la régularité dans le graphique ?",
      { t: corr, fb: "Exact. L'ordonnée à l'origine est le départ, et la montée par étape est le pas." }, ds, sol,
      { mode: "graph-describe", b: b, m: m, ctx: ctx.x });
    q.figure = u6graph({ xmax: xmax, ymax: ymax, xlab: ctx.xl, ylab: ctx.yl, lines: [{ pts: pts.map(function (p) { return [p.x, p.y]; }) }], points: pts });
    return q;
  }
  var qf = mcq("Le graphique montre une relation linéaire. L'axe des abscisses est mesuré en heures et l'axe des ordonnées en km. Quelle phrase décrit la régularité dans le graphique ?",
    { t: "Elle commence à 2 et augmente de 1 à chaque étape.", fb: "Exact. L'ordonnée à l'origine est le départ, et la montée par étape est le pas." },
    [
      { t: "Elle commence à 1 et augmente de 2 à chaque étape.", fb: "Cela échange le départ et le pas." },
      { t: "Elle commence à 2 et augmente de 2 à chaque étape.", fb: "La montée entre deux points voisins est de 1, et non de 2." },
      { t: "Elle commence à 2 et diminue de 1 à chaque étape.", fb: "La droite monte, donc les valeurs augmentent." }
    ],
    "La droite coupe l'axe des ordonnées à 2 et monte de 1 par étape, donc la régularité est <b>Elle commence à 2 et augmente de 1 à chaque étape.</b>",
    { mode: "graph-describe", b: 2, m: 1, ctx: "heures" });
  var ptsf = []; for (var k2 = 0; k2 <= 5; k2++) ptsf.push({ x: k2, y: 2 + k2 });
  qf.figure = u6graph({ xmax: 5, ymax: 7, xlab: "heures", ylab: "km", lines: [{ pts: ptsf.map(function (p) { return [p.x, p.y]; }) }], points: ptsf });
  return qf;
}, ["La valeur de départ est là où la droite coupe l'axe des ordonnées.", "Choisis deux points voisins tracés et trouve de combien y monte de l'un à l'autre."]);

// 8. L2, 7.6: one graph drawn, choose its equation.
E("u6-graph-equation", 6, ["7.6"], 2, "gen", function () {
  var ctxs = [
    { x: "heures", y: "km", xl: "heures", yl: "km" },
    { x: "minutes", y: "litres", xl: "minutes", yl: "L" },
    { x: "articles", y: "dollars", xl: "articles", yl: "$" },
    { x: "semaines", y: "centimètres", xl: "semaines", yl: "cm" }
  ];
  var ctx = pick(ctxs);
  var b = ri(1, 8), m = ri(1, 4), att = 0;
  while (b === m && att < 40) { b = ri(1, 8); m = ri(1, 4); att++; }
  if (b === m) { b = 5; m = 2; }
  var xmax = pick([4, 5, 6]), ymax = b + m * xmax;
  var pts = []; for (var k = 0; k <= xmax; k++) pts.push({ x: k, y: b + m * k });
  var corr = "\\(y = " + u6lin(m, b, "x") + "\\)";
  var sol = "Lis le départ à l'ordonnée à l'origine et le pas à partir de deux points de la droite : \\[ \\begin{aligned} \\text{départ} &= " + fmtD(b) + " \\\\ \\text{pas} &= " + fmtD(b + 2 * m) + " - " + fmtD(b + m) + " = " + fmtD(m) + " \\end{aligned} \\] Donc l'équation de la droite est <b>" + corr + "</b>.";
  var q = mcq("Le graphique montre une relation linéaire. L'axe des abscisses est mesuré en " + ctx.x + " et l'axe des ordonnées en " + ctx.y + ". Quelle équation correspond à la droite tracée ?",
    { t: corr, fb: "Exact. La droite commence à " + fmtD(b) + " et monte de " + fmtD(m) + " à chaque pas de x." },
    [
      { t: "\\(y = " + u6lin(b, m, "x") + "\\)", fb: "Cela échange la valeur de départ et le pas. L'ordonnée à l'origine est " + fmtD(b) + "." },
      { t: "\\(y = " + u6lin(m, -b, "x") + "\\)", fb: "Cela soustrait la valeur de départ. La droite coupe l'axe des ordonnées au-dessus de zéro, à " + fmtD(b) + "." },
      { t: "\\(x = " + u6lin(m, b, "y") + "\\)", fb: "Cela échange les rôles de x et de y. Sur ce graphique, y dépend de x." }
    ], sol, { mode: "graph-equation", b: b, m: m, ctx: ctx.x, xmax: xmax });
  q.figure = u6graph({ xmax: xmax, ymax: ymax, xlab: ctx.xl, ylab: ctx.yl, lines: [{ pts: pts.map(function (p) { return [p.x, p.y]; }) }], points: pts });
  return q;
}, ["Commence avec l'ordonnée à l'origine : c'est la constante dans l'équation.", "Trouve ensuite le pas : de combien y change quand x augmente de 1."]);

// 9. L2, 7.7, CR 2: sloped, horizontal or vertical graph; choose a point on it.
E("u6-point-on-graph", 6, ["7.7"], 1, "gen", function () {
  var kind = pick(["slope", "slope", "horiz", "vert"]);
  function pt(x, y) { return "(" + fmtD(x) + ", " + fmtD(y) + ")"; }
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
        cands.push({ t: pt(c[0], c[1]), fb: "Ce point n'est pas sur la droite. À x = " + fmtD(c[0]) + ", la droite a y = " + fmtD(b + m * c[0]) + "." });
      });
      var ds = u6pick3(corr, cands);
      if (!ds) continue;
      var sol = "Les points de la droite suivent sa régularité, en commençant à " + fmtD(b) + " et en montant de " + fmtD(m) + " par pas : \\[ \\begin{aligned} y(" + x0 + ") &= " + b + " + " + fmtD(m) + "(" + x0 + ") \\\\ &= " + fmtD(y0) + " \\end{aligned} \\] Donc un point du graphique est <b>" + corr + "</b>.";
      var q = mcq("Quel point se trouve sur le graphique montré ?", { t: corr, fb: "Exact. Ce point est exactement sur la droite." }, ds, sol, { mode: "point-slope", b: b, m: m, x0: x0 });
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
      candsH.push({ t: pt(cc[0], cc[1]), fb: "Chaque point de cette droite a y = " + fmtD(c) + ", et ce point a y = " + fmtD(cc[1]) + "." });
    });
    var dsH = u6pick3(corrH, candsH);
    if (dsH) {
      var solH = "Le graphique est une droite horizontale : \\[ \\begin{aligned} y &= " + fmtD(c) + " \\end{aligned} \\] Chaque point de cette droite a \\(y = " + fmtD(c) + "\\), peu importe sa valeur de \\(x\\). Donc un point du graphique est <b>" + corrH + "</b>.";
      var qH = mcq("Quel point se trouve sur le graphique montré ?", { t: corrH, fb: "Exact. Sa valeur de y est " + fmtD(c) + ", comme chaque point de la droite." }, dsH, solH, { mode: "point-horiz", c: c, x0: x0 });
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
      candsV.push({ t: pt(cc[0], cc[1]), fb: "Chaque point de cette droite a x = " + fmtD(cv) + ", et ce point a x = " + fmtD(cc[0]) + "." });
    });
    var dsV = u6pick3(corrV, candsV);
    if (dsV) {
      var solV = "Le graphique est une droite verticale : \\[ \\begin{aligned} x &= " + fmtD(cv) + " \\end{aligned} \\] Chaque point de cette droite a \\(x = " + fmtD(cv) + "\\), peu importe sa valeur de \\(y\\). Donc un point du graphique est <b>" + corrV + "</b>.";
      var qV = mcq("Quel point se trouve sur le graphique montré ?", { t: corrV, fb: "Exact. Sa valeur de x est " + fmtD(cv) + ", comme chaque point de la droite." }, dsV, solV, { mode: "point-vert", c: cv, y0: y0v });
      qV.figure = u6graph({ xmax: 6, ymax: 12, xlab: "x", ylab: "y", lines: [{ pts: [[cv, 0], [cv, 12]] }] });
      return qV;
    }
  }
  var qf = mcq("Quel point se trouve sur le graphique montré ?", { t: "(3, 7)", fb: "Exact. Ce point est exactement sur la droite." },
    [
      { t: "(3, 6)", fb: "À x = 3, la droite a y = 7." },
      { t: "(3, 8)", fb: "À x = 3, la droite a y = 7." },
      { t: "(4, 7)", fb: "À x = 4, la droite a y = 9." }
    ],
    "La droite commence à 1 et monte de 2 par pas, donc à x = 3, y = 7. Un point du graphique est <b>(3, 7)</b>.",
    { mode: "point-slope", b: 1, m: 2, x0: 3 });
  qf.figure = u6graph({ xmax: 6, ymax: 13, xlab: "x", ylab: "y", lines: [{ pts: [[0, 1], [6, 13]] }] });
  return qf;
}, ["Pour une droite inclinée, utilise son départ et son pas pour trouver la valeur de y pour un x donné. Pour une droite horizontale ou verticale, vérifie quelle coordonnée reste la même.", "Décide d'abord quel type de droite c'est : inclinée, horizontale ou verticale."]);

// 10. L2, 7.8, CR 3: interpolate on a context graph.
E("u6-interpolate-graph", 6, ["7.8"], 1, "gen", function () {
  var ctxs = [
    { xl: "heures", yl: "km", prompt: "Le graphique montre la distance parcourue par un autobus depuis son départ du dépôt. L'axe des abscisses est le temps en heures et l'axe des ordonnées est la distance en kilomètres.", ask: "Combien de kilomètres l'autobus a-t-il parcourus après XQ heures ?" },
    { xl: "minutes", yl: "L", prompt: "Le graphique montre l'eau dans un réservoir pendant qu'il se remplit. L'axe des abscisses est le temps en minutes et l'axe des ordonnées est le volume en litres.", ask: "Combien de litres y a-t-il dans le réservoir après XQ minutes ?" },
    { xl: "photos", yl: "$", prompt: "Le graphique montre le coût de l'impression de photos. L'axe des abscisses est le nombre de photos et l'axe des ordonnées est le coût en dollars.", ask: "Quel est le coût de l'impression de XQ photos, en dollars ?" },
    { xl: "heures", yl: "cm", prompt: "Le graphique montre l'épaisseur de la neige pendant une tempête. L'axe des abscisses est le temps en heures et l'axe des ordonnées est l'épaisseur de la neige en centimètres.", ask: "Quelle est l'épaisseur de la neige après XQ heures, en centimètres ?" }
  ];
  var ctx = pick(ctxs);
  var b = ri(2, 10), m = ri(2, 5), xmax = 6, xq = ri(2, 5);
  var ymax = b + m * xmax, ans = b + m * xq;
  var pts = []; for (var k = 0; k <= xmax; k++) pts.push({ x: k, y: b + m * k });
  var sol = "Va horizontalement de \\(x = " + xq + "\\) jusqu'à la droite, puis descends jusqu'à l'axe des ordonnées. La régularité commence à " + fmtD(b) + " et avance par pas de " + fmtD(m) + " : \\[ \\begin{aligned} y &= " + b + " + " + fmtD(m) + "(" + xq + ") \\\\ &= " + b + " + " + fmtD(m * xq) + " \\\\ &= " + fmtD(ans) + " \\end{aligned} \\] Donc la valeur à \\(x = " + xq + "\\) est <b>" + fmtD(ans) + "</b>.";
  var q = numq(ctx.prompt + " " + ctx.ask.replace("XQ", xq), ans, 0.01, sol, { mode: "interpolate", b: b, m: m, xq: xq, ctx: ctx.xl + "/" + ctx.yl });
  q.figure = u6graph({ xmax: xmax, ymax: ymax, xlab: ctx.xl, ylab: ctx.yl, lines: [{ pts: pts.map(function (p) { return [p.x, p.y]; }) }], points: pts });
  return q;
}, ["Va horizontalement de la valeur de x donnée jusqu'à la droite, puis descends tout droit pour lire la valeur de y.", "Tu peux aussi utiliser la régularité : la valeur de départ plus le pas fois x."]);

// 11. L3, 7.9: extrapolate beyond the drawn range.
E("u6-extrapolate-graph", 6, ["7.9"], 3, "gen", function () {
  var ctxs = [
    { xl: "heures", yl: "km", prompt: "Le graphique montre la distance parcourue par une camionnette de livraison lors d'un trajet sur l'autoroute. L'axe des abscisses est le temps en heures et l'axe des ordonnées est la distance en kilomètres.", ask: "Si la camionnette continue de la même façon, combien de kilomètres aura-t-elle parcourus après XQ heures ?" },
    { xl: "semaines", yl: "cm", prompt: "Le graphique montre la hauteur d'un tournesol pendant ses premières semaines. L'axe des abscisses est le temps en semaines et l'axe des ordonnées est la hauteur en centimètres.", ask: "Si le tournesol continue de grandir de la même façon, quelle sera sa hauteur à la semaine XQ, en centimètres ?" },
    { xl: "jours", yl: "$", prompt: "Le graphique montre l'argent dans un compte de collecte de fonds d'une classe. L'axe des abscisses est le temps en jours et l'axe des ordonnées est le montant en dollars.", ask: "Si le compte continue de grandir de la même façon, combien de dollars y aura-t-il après XQ jours ?" }
  ];
  var ctx = pick(ctxs);
  var b = ri(2, 12), m = ri(2, 6), xmax = 5, xq = ri(8, 12);
  var ymax = b + m * xmax, ans = b + m * xq;
  // Distractors sit in strict order on every draw (m >= 2 and xq >= 8):
  // start plus one step (b + m) < last drawn value (b + 5m) < one step
  // too few (ans - m) < extrapolated value (ans), so all four differ.
  var lastVal = b + m * xmax, shortVal = ans - m, oneStepVal = b + m;
  var pts = []; for (var k = 0; k <= xmax; k++) pts.push({ x: k, y: b + m * k });
  var sol = "La valeur demandée est au-delà de la partie tracée du graphique, donc prolonge la régularité. La relation commence à " + fmtD(b) + " et avance par pas de " + fmtD(m) + " : \\[ \\begin{aligned} y &= " + b + " + " + fmtD(m) + "x \\\\ y(" + xq + ") &= " + b + " + " + fmtD(m) + "(" + xq + ") \\\\ &= " + b + " + " + fmtD(m * xq) + " \\\\ &= " + fmtD(ans) + " \\end{aligned} \\] Donc la valeur prédite à \\(x = " + xq + "\\) est <b>" + fmtD(ans) + "</b>.";
  var q = mcq(ctx.prompt + " " + ctx.ask.replace("XQ", xq),
    { t: fmtD(ans), fb: "Exact. La régularité commence à " + fmtD(b) + " et avance par pas de " + fmtD(m) + ", donc à x = " + xq + " la valeur est " + fmtD(b) + " + " + fmtD(m) + " x " + xq + " = " + fmtD(ans) + "." },
    [
      { t: fmtD(lastVal), fb: "C'est la dernière valeur vraiment tracée sur le graphique, à x = " + xmax + ". La question demande x = " + xq + ", qui est au-delà de l'intervalle tracé, donc continue de prolonger la régularité au lieu de t'arrêter là." },
      { t: fmtD(shortVal), fb: "Cela compte un pas de moins. Pour atteindre x = " + xq + ", il faut " + xq + " pas de " + fmtD(m) + " à partir du départ, et non " + (xq - 1) + " pas." },
      { t: fmtD(oneStepVal), fb: "C'est seulement la valeur de départ plus un pas, la valeur à x = 1. Le x demandé est " + xq + ", donc le pas de " + fmtD(m) + " doit être appliqué " + xq + " fois, et non une fois." }
    ], sol, { mode: "extrapolate", b: b, m: m, xq: xq, ctx: ctx.xl + "/" + ctx.yl });
  q.figure = u6graph({ xmax: xmax, ymax: ymax, xlab: ctx.xl, ylab: ctx.yl, lines: [{ pts: pts.map(function (p) { return [p.x, p.y]; }) }], points: pts });
  return q;
}, ["La valeur de x demandée est après la fin du graphique tracé, donc trouve la régularité et prolonge-la.", "Trouve d'abord la valeur de départ et le pas dans la partie tracée du graphique."]);

// 12. L3, 7.10, CR 3: solve a problem by graphing two plans.
E("u6-two-plans-graph", 6, ["7.10"], 3, "gen", function () {
  var ctxs = [
    { xl: "Go", yl: "$", thing: "phone plans", xu: "Go de données", prompt: "Le graphique montre le coût mensuel de deux forfaits de téléphone pour différentes quantités de données. L'axe des abscisses est les données utilisées en Go et l'axe des ordonnées est le coût en dollars. Le forfait A est la droite pleine et le forfait B est la droite pointillée." },
    { xl: "jours", yl: "$", thing: "car rentals", xu: "jours loués", prompt: "Le graphique montre le coût de deux offres de location de voiture pour différentes durées de location. L'axe des abscisses est les jours loués et l'axe des ordonnées est le coût en dollars. Le forfait A est la droite pleine et le forfait B est la droite pointillée." },
    { xl: "heures", yl: "$", thing: "bike rentals", xu: "heures louées", prompt: "Le graphique montre le coût de deux offres de location de vélo pour différents temps de location. L'axe des abscisses est les heures louées et l'axe des ordonnées est le coût en dollars. Le forfait A est la droite pleine et le forfait B est la droite pointillée." }
  ];
  var ctx = pick(ctxs);
  var d = ri(1, 3), xs = ri(3, 7), bA = ri(0, 12), mB = ri(1, 4);
  var mA = mB + d, bB = bA + d * xs, ystar = bA + mA * xs;
  var xmax = xs + 3, ymax = bA + mA * xmax + d;
  var mode = pick(["breakeven-x", "breakeven-y", "difference"]);
  var prompt, ans, sol;
  if (mode === "breakeven-x") {
    prompt = ctx.prompt + " À combien de " + ctx.xu.split(" ")[0] + " les deux forfaits coûtent-ils le même prix ?";
    if (ctx.xu === "Go de données") prompt = ctx.prompt + " À combien de Go les deux forfaits coûtent-ils le même prix ?";
    if (ctx.xu === "jours loués") prompt = ctx.prompt + " Après combien de jours les deux forfaits coûtent-ils le même prix ?";
    if (ctx.xu === "heures louées") prompt = ctx.prompt + " Après combien d'heures les deux forfaits coûtent-ils le même prix ?";
    ans = xs;
    sol = "Les forfaits coûtent le même prix là où les deux droites se croisent : \\[ \\begin{aligned} " + bA + " + " + fmtD(mA) + "x &= " + bB + " + " + fmtD(mB) + "x \\\\ " + fmtD(mA) + "x - " + fmtD(mB) + "x &= " + bB + " - " + bA + " \\\\ " + fmtD(d) + "x &= " + fmtD(bB - bA) + " \\\\ x &= " + fmtD(xs) + " \\end{aligned} \\] Donc les deux forfaits coûtent le même prix à <b>" + fmtD(xs) + "</b>.";
  } else if (mode === "breakeven-y") {
    prompt = ctx.prompt + " Les deux forfaits coûtent le même prix à un point du graphique. Quel est ce coût, en dollars ?";
    ans = ystar;
    sol = "Trouve le coût là où les deux droites se croisent, avec l'un ou l'autre forfait : \\[ \\begin{aligned} y &= " + bA + " + " + fmtD(mA) + "(" + fmtD(xs) + ") \\\\ &= " + bA + " + " + fmtD(mA * xs) + " \\\\ &= " + fmtD(ystar) + " \\end{aligned} \\] Donc le coût où les forfaits sont égaux est <b>" + fmtDF(ystar, 2) + " $</b>.";
  } else {
    var u = xs + ri(1, 3);
    var cA = bA + mA * u, cB = bB + mB * u;
    prompt = ctx.prompt + " À " + u + " " + ctx.xu + ", de combien le forfait B est-il moins cher que le forfait A ? Donne la différence en dollars.";
    ans = cA - cB;
    sol = "Calcule le coût de chaque forfait à " + u + " " + ctx.xu + ", puis soustrais : \\[ \\begin{aligned} \\text{Plan A} &= " + bA + " + " + fmtD(mA) + "(" + u + ") = " + fmtD(cA) + " \\\\ \\text{Plan B} &= " + bB + " + " + fmtD(mB) + "(" + u + ") = " + fmtD(cB) + " \\\\ \\text{difference} &= " + fmtD(cA) + " - " + fmtD(cB) + " = " + fmtD(ans) + " \\end{aligned} \\] Donc le forfait B est moins cher de <b>" + fmtDF(ans, 2) + " $</b>.";
  }
  var q = numq(prompt, ans, 0.01, sol, { mode: "two-plans-" + mode, d: d, xs: xs, bA: bA, mA: mA, bB: bB, mB: mB, ctx: ctx.thing });
  q.figure = u6graph({ xmax: xmax, ymax: ymax, xlab: ctx.xl, ylab: ctx.yl, lines: [
    { pts: [[0, bA], [xmax, bA + mA * xmax]], col: FIG_INK, lab: "Forfait A" },
    { pts: [[0, bB], [xmax, bB + mB * xmax]], col: FIG_ALT, dash: true, lab: "Forfait B" }
  ] });
  return q;
}, ["Chaque droite est un forfait : son départ est ses frais fixes et son pas est son taux.", "Là où les droites se croisent, les forfaits coûtent le même prix ; après ce point, la droite la plus basse est le forfait le moins cher."]);

// 13. L2, 8.23, CR 3: pictorial pattern in words, solve for the figure number.
E("u6-pattern-solve-n", 6, ["8.23"], 2, "gen", function () {
  var F = ri(4, 10), m = ri(2, 5), nT = ri(8, 20);
  var c2 = F + m, c3 = F + 2 * m, T = F + m * (nT - 1);
  var ctx = pick([
    { item: "matchsticks", prompt: "Un motif est construit avec des allumettes. La figure 1 utilise " + F + " allumettes, la figure 2 utilise " + c2 + " allumettes et la figure 3 utilise " + c3 + " allumettes. La régularité se poursuit de la même façon. Quel numéro de figure utilise exactement " + T + " allumettes ?" },
    { item: "tiles", prompt: "Un motif est construit avec des tuiles le long d'une bordure. La figure 1 utilise " + F + " tuiles, la figure 2 utilise " + c2 + " tuiles et la figure 3 utilise " + c3 + " tuiles. La régularité se poursuit de la même façon. Quel numéro de figure utilise exactement " + T + " tuiles ?" },
    { item: "dots", prompt: "Un motif de points grandit. La figure 1 a " + F + " points, la figure 2 a " + c2 + " points et la figure 3 a " + c3 + " points. La régularité se poursuit de la même façon. Quel numéro de figure a exactement " + T + " points ?" }
  ]);
  var sol = "Chaque nouvelle figure ajoute " + fmtD(m) + ", et la figure 1 utilise " + F + ". Soit \\(n\\) le numéro de figure : \\[ \\begin{aligned} " + F + " + " + fmtD(m) + "(n - 1) &= " + T + " \\\\ " + fmtD(m) + "(n - 1) &= " + T + " - " + F + " = " + fmtD(T - F) + " \\\\ n - 1 &= " + fmtD((T - F) / m) + " \\\\ n &= " + fmtD(nT) + " \\end{aligned} \\] Donc la figure qui utilise exactement " + T + " est <b>la figure " + fmtD(nT) + "</b>.";
  return numq(ctx.prompt, nT, 0.01, sol, { mode: "pattern-solve-n", F: F, m: m, nT: nT, item: ctx.item });
}, ["Écris d'abord une équation : le nombre de la première figure plus le pas fois le nombre de figures ajoutées.", "Le pas est la différence entre les nombres de deux figures voisines."]);

// 14. L3, 8.23, CR 2: fractional step size, solve for n or total at a large stage.
E("u6-pattern-large", 6, ["8.23"], 3, "gen", function () {
  var Fh = ri(8, 24), sh = pick([3, 5, 7]);
  var F = Fh / 2, step = sh / 2;
  var c2 = (Fh + sh) / 2, c3 = (Fh + 2 * sh) / 2;
  var ctx = pick([
    "Un plan d'entraînement augmente chaque semaine. La sortie de la semaine 1 mesure " + fmtD(F) + " km, et chaque semaine, la sortie mesure " + fmtD(step) + " km de plus que la semaine précédente.",
    "Une jeune plante est mesurée chaque semaine. À la semaine 1, elle mesure " + fmtD(F) + " cm, et elle grandit de " + fmtD(step) + " cm chaque semaine."
  ]);
  var unit = ctx.indexOf("sortie") >= 0 ? "km" : "cm";
  if (Math.random() < 0.5) {
    var nT = ri(15, 36), T = (Fh + sh * (nT - 1)) / 2;
    var promptA = ctx + " Dans quelle semaine la valeur atteint-elle exactement " + fmtD(T) + " " + unit + " ?";
    var solA = "Soit \\(n\\) le numéro de semaine. La première valeur est " + fmtD(F) + " et le pas est " + fmtD(step) + " : \\[ \\begin{aligned} " + fmtD(F) + " + " + fmtD(step) + "(n - 1) &= " + fmtD(T) + " \\\\ " + fmtD(step) + "(n - 1) &= " + fmtD(T) + " - " + fmtD(F) + " = " + fmtD(T - F) + " \\\\ n - 1 &= " + fmtD((T - F) / step) + " \\\\ n &= " + fmtD(nT) + " \\end{aligned} \\] Donc la valeur atteint " + fmtD(T) + " " + unit + " à <b>la semaine " + fmtD(nT) + "</b>.";
    return numq(promptA, nT, 0.01, solA, { mode: "pattern-large-solve", Fh: Fh, sh: sh, nT: nT, unit: unit });
  }
  var N = ri(24, 60), ans = (Fh + sh * (N - 1)) / 2;
  var promptB = ctx + " Quelle est la valeur à la semaine " + N + ", en " + unit + " ?";
  var solB = "La première valeur est " + fmtD(F) + " et le pas est " + fmtD(step) + ", donc la semaine \\(n\\) a la valeur " + fmtD(F) + " plus le pas pris \\(n - 1\\) fois : \\[ \\begin{aligned} \\text{valeur} &= " + fmtD(F) + " + " + fmtD(step) + "(" + N + " - 1) \\\\ &= " + fmtD(F) + " + " + fmtD(step) + "(" + (N - 1) + ") \\\\ &= " + fmtD(F) + " + " + fmtD(step * (N - 1)) + " \\\\ &= " + fmtD(ans) + " \\end{aligned} \\] Donc la valeur à la semaine " + N + " est <b>" + fmtD(ans) + " " + unit + "</b>.";
  return numq(promptB, ans, 0.01, solB, { mode: "pattern-large-total", Fh: Fh, sh: sh, N: N, unit: unit });
}, ["Écris la régularité comme une première valeur plus un pas pris une fois pour chaque passage à la semaine suivante.", "Pour trouver la semaine, défais les étapes en sens inverse : soustrais la première valeur, divise par le pas, puis ajoute 1."]);
/* TRANSLATOR NOTES
- Entries translated: 4 entries in full (entry 1 is a varset of 6 variants; entries 2, 3 and 4 are generators), including every prompt, option, per-answer feedback, worked solution, hint1 and hint2. The source file ends with the comment line for entry 5 and no entry body, so there was nothing further to translate.
- FMT-GEOM lines left as fmt( (each one carries the comment at the end of its line): the return line of u7T (x and y attributes), the u7Pts line (polygon points), the return line of u7Line (x1, y1, x2, y2), the u7Dot line (cx, cy), and the two grid-line loops in u7Grid.
- Every other fmt( became fmtD(, including fmt( calls producing visible figure text labels passed to u7T (the side lengths in entries 2 and 4) and the fmt( calls in u7Coord, which builds visible coordinate text used in prompts and options, not SVG attributes. No fmtF(, no .toFixed(, no money and no percent occur in this chunk, so no fmtDF, dollar or percent conversions arose.
- Literal formatted numbers written into static prose, listed for later reconciliation against the curriculum guides: the decimal comma 0,5 occurs 7 times (entry 1 photo variant, one feedback; entry 1 poster variant, prompt twice, one option, one feedback and the worked solution equation; entry 4 fallback, one option). The thousands grouping 50 000, spaced as in the source, occurs 6 times, all in the entry 1 town map variant (prompt, correct option, three distractor options, worked solution). All other numbers in prose are small integers or are produced at run time by fmtD(.
- KaTeX fragments kept intact, including the English words inside \text{...} (image length, original length, real length, model length, scale factor, image side), following the panels-fr precedent; only the prose around them was translated. The one change inside a KaTeX fragment is the decimal 0.5, written 0,5 per the number rules.
- Judgement calls where the glossary was silent: blueprint = plan; trail map = carte des sentiers; model car and model boat = voiture miniature and bateau miniature; "stands for" in scale statements = représente. The enlargement/reduction word variable now holds "d'une réduction" / "d'un agrandissement" so the article agrees in the rebuilt prompt sentence. Figure labels: "Original" = "Figure d'origine" and "Second" = "Deuxième". Aria labels were translated as screen-reader text.
- Code comments left in English, per the rules. No em dashes used.
*/

/* ----- bank-u7.js ----- */
// Math 9 (French) Unit 7 Similarity and Transformations question bank
// Cut verbatim from the standalone bank source
// (math-9-review-fr/bank-src.js, lines 3905 to 4898).
// CRMARKS: u7-scale-draw-num=3
// CRMARKS: u7-draw-similar-num=3
// CRMARKS: u7-similar-context-num=3
// CRMARKS: u7-similar-two-step-num=3
// CRMARKS: u7-indirect-measure-num=2
// CRMARKS: u7-complete-half=2
// CRMARKS: u7-translation-rule=2
// Unit 7: Similarity and Transformations (Math 9, NL). Entries only; helpers prefixed u7.
function u7T(x, y, str, size, bold, anchor) {
  return '<text x="' + fmt(x, 1) + '" y="' + fmt(y, 1) + '" font-size="' + (size || 13) + '" fill="' + FIG_INK + '" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="' + (anchor || "middle") + '" dominant-baseline="central"' + (bold ? ' font-weight="bold"' : "") + '>' + str + '</text>'; /* FMT-GEOM */
}
function u7Svg(W, H, body, aria) {
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + aria + '">' + body + '</svg>';
}
function u7Pts(pts) { return pts.map(function (p) { return fmt(p[0], 1) + "," + fmt(p[1], 1); }).join(" "); } /* FMT-GEOM */
function u7Poly(pts, fill, dash) {
  return '<polygon points="' + u7Pts(pts) + '" fill="' + (fill || "none") + '" stroke="' + FIG_INK + '" stroke-width="2"' + (dash ? ' stroke-dasharray="6 4"' : "") + '/>';
}
function u7Line(p, q, dash, w, col) {
  return '<line x1="' + fmt(p[0], 1) + '" y1="' + fmt(p[1], 1) + '" x2="' + fmt(q[0], 1) + '" y2="' + fmt(q[1], 1) + '" stroke="' + (col || FIG_INK) + '" stroke-width="' + (w || 2) + '"' + (dash ? ' stroke-dasharray="6 4"' : "") + '/>'; /* FMT-GEOM */
}
function u7Dot(p, r) { return '<circle cx="' + fmt(p[0], 1) + '" cy="' + fmt(p[1], 1) + '" r="' + (r || 3) + '" fill="' + FIG_INK + '"/>'; } /* FMT-GEOM */
function u7Grid(o) {
  var cell = o.cell || 24, W = (o.xMax - o.xMin) * cell + 40, H = (o.yMax - o.yMin) * cell + 40;
  var ox = 20 - o.xMin * cell, oy = 20 + o.yMax * cell;
  function X(x) { return ox + x * cell; } function Y(y) { return oy - y * cell; }
  var s = "", x, y;
  for (x = o.xMin; x <= o.xMax; x++) s += '<line x1="' + fmt(X(x), 1) + '" y1="' + fmt(Y(o.yMin), 1) + '" x2="' + fmt(X(x), 1) + '" y2="' + fmt(Y(o.yMax), 1) + '" stroke="#d7e0da" stroke-width="1"/>'; /* FMT-GEOM */
  for (y = o.yMin; y <= o.yMax; y++) s += '<line x1="' + fmt(X(o.xMin), 1) + '" y1="' + fmt(Y(y), 1) + '" x2="' + fmt(X(o.xMax), 1) + '" y2="' + fmt(Y(y), 1) + '" stroke="#d7e0da" stroke-width="1"/>'; /* FMT-GEOM */
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
  return u7Svg(W, H, s, o.aria || "Diagramme sur une grille");
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
function u7Coord(p) { return "(" + fmtD(p[0]) + ", " + fmtD(p[1]) + ")"; }

// 1. 10.8 L1 var: what a stated scale means in media and real-life contexts.
E("u7-scale-media-var", 7, ["10.8"], 1, "var", varset([
  function () {
    return mcq("Une carte des sentiers dans un guide de parc utilise l'échelle suivante : 1 cm représente 5 km. Que signifie cette échelle ?",
      { t: "Chaque 1 cm sur la carte représente 5 km sur le terrain.", fb: "Exact. Le premier nombre est la longueur sur la carte et le deuxième est la longueur réelle." },
      [
        { t: "Chaque 5 cm sur la carte représente 1 km sur le terrain.", fb: "Cela échange les deux nombres de l'échelle." },
        { t: "Chaque 1 cm sur le terrain représente 5 km sur la carte.", fb: "Cela inverse la carte et le terrain." },
        { t: "La carte elle-même est 5 fois plus grande que le parc entier.", fb: "Une carte est une réduction, donc elle est plus petite que le parc réel." }
      ],
      "Dans une échelle, la longueur sur la carte vient en premier : 1 cm sur la carte correspond à 5 km dans la vie réelle. Donc l'échelle signifie <b>chaque 1 cm sur la carte représente 5 km sur le terrain</b>.",
      { mode: "scale-map" });
  },
  function () {
    return mcq("Une photo est agrandie avec un facteur d'échelle de 2. Un facteur d'échelle compare la longueur de l'image à la longueur d'origine. Que signifie un facteur d'échelle de 2 pour la photo ?",
      { t: "Chaque longueur dans l'agrandissement vaut 2 fois la longueur correspondante dans la photo.", fb: "Exact. Un facteur d'échelle de 2 double chaque longueur correspondante." },
      [
        { t: "Chaque longueur dans l'agrandissement mesure 2 cm de plus que dans la photo d'origine.", fb: "Un facteur d'échelle multiplie les longueurs ; il n'ajoute pas de centimètres." },
        { t: "Chaque longueur dans l'agrandissement vaut la moitié de la longueur correspondante dans la photo.", fb: "La moitié serait un facteur d'échelle de 0,5, pas 2." },
        { t: "Seul le côté le plus long de la photo est doublé, et les autres côtés restent pareils.", fb: "Un facteur d'échelle s'applique à chaque longueur, pas seulement à un côté." }
      ],
      "Le facteur d'échelle multiplie chaque longueur : \\[ \\begin{aligned} \\text{longueur de l'image} &= 2 \\times \\text{longueur d'origine} \\end{aligned} \\] Donc <b>chaque longueur dans l'agrandissement vaut 2 fois la longueur correspondante dans la photo</b>.",
      { mode: "scale-photo" });
  },
  function () {
    return mcq("Un plan d'une salle de classe montre l'échelle suivante : 2 cm représente 1 m. Que signifie cette échelle ?",
      { t: "Chaque 2 cm sur le plan représente 1 m dans la salle de classe réelle.", fb: "Exact. La longueur du dessin est donnée en premier, puis la longueur réelle." },
      [
        { t: "Chaque 1 cm sur le plan représente 2 m dans la salle de classe réelle.", fb: "Cela échange les deux nombres de l'échelle." },
        { t: "La salle de classe réelle mesure 2 cm pour chaque mètre sur le plan.", fb: "Cela confond la longueur qui appartient au dessin." },
        { t: "Le plan dessiné est plus grand que la salle de classe réelle elle-même.", fb: "Un plan est une réduction, donc il est plus petit que la salle." }
      ],
      "Le premier nombre appartient au dessin et le deuxième à la salle réelle. Donc l'échelle signifie <b>chaque 2 cm sur le plan représente 1 m dans la salle de classe réelle</b>.",
      { mode: "scale-blueprint" });
  },
  function () {
    return mcq("Une voiture miniature est construite à l'échelle 1 : 24. Le premier nombre est la longueur de la miniature et le deuxième est la longueur de la voiture réelle. Que signifie cette échelle ?",
      { t: "La voiture réelle est 24 fois plus longue que la miniature.", fb: "Exact. Chaque longueur de la miniature est multipliée par 24 pour donner la longueur réelle." },
      [
        { t: "La miniature est 24 fois plus longue que la voiture réelle.", fb: "Cela inverse l'échelle ; la miniature est la plus petite." },
        { t: "La voiture réelle mesure 24 cm de plus que la miniature.", fb: "Une échelle multiplie les longueurs ; elle n'ajoute pas 24 cm." },
        { t: "La miniature et la voiture réelle ont la même taille.", fb: "Une échelle de 1 : 24 signifie que les tailles diffèrent d'un facteur de 24." }
      ],
      "Les longueurs correspondantes suivent \\[ \\begin{aligned} \\text{longueur réelle} &= 24 \\times \\text{longueur du modèle} \\end{aligned} \\] Donc <b>la voiture réelle est 24 fois plus longue que la miniature</b>.",
      { mode: "scale-model-car" });
  },
  function () {
    return mcq("Une affiche est imprimée à partir d'un petit dessin avec un facteur d'échelle de 0,5. Que signifie un facteur d'échelle de 0,5 pour l'affiche ?",
      { t: "Chaque longueur sur l'affiche vaut la moitié de la longueur correspondante sur le dessin.", fb: "Exact. Un facteur d'échelle inférieur à 1 donne une réduction." },
      [
        { t: "Chaque longueur sur l'affiche mesure 0,5 cm de plus que sur le dessin original montré.", fb: "Un facteur d'échelle multiplie les longueurs ; il n'ajoute pas de centimètres." },
        { t: "Chaque longueur sur l'affiche vaut deux fois la longueur correspondante sur le dessin complet.", fb: "Deux fois serait un facteur d'échelle de 2, pas 0,5." },
        { t: "L'affiche a la moitié des côtés du dessin, avec les mêmes angles partout que l'original.", fb: "Une réduction garde la même forme ; seules les longueurs changent." }
      ],
      "La longueur de l'image est la longueur d'origine multipliée par le facteur d'échelle : \\[ \\begin{aligned} \\text{longueur de l'image} &= 0,5 \\times \\text{longueur d'origine} \\end{aligned} \\] Donc <b>chaque longueur sur l'affiche vaut la moitié de la longueur correspondante sur le dessin</b>.",
      { mode: "scale-poster" });
  },
  function () {
    return mcq("Le site Web d'une ville montre une carte avec l'échelle 1 : 50 000. Le premier nombre est la longueur sur la carte et le deuxième est la longueur réelle, dans les mêmes unités. Que signifie cette échelle ?",
      { t: "Une distance de 1 unité sur la carte représente 50 000 unités dans la vie réelle.", fb: "Exact. Les deux nombres utilisent la même unité, et la distance réelle est beaucoup plus grande." },
      [
        { t: "Une distance de 50 000 unités sur la carte représente 1 unité dans la vie réelle.", fb: "Cela échange les deux nombres de l'échelle." },
        { t: "La carte elle-même est 50 000 fois plus grande que toute la ville.", fb: "Une carte est une réduction, donc elle est beaucoup plus petite que la ville." },
        { t: "Chaque distance réelle dans la ville mesure exactement 50 000 cm.", fb: "L'échelle donne un rapport, pas une seule distance réelle fixe." }
      ],
      "Lis le rapport dans l'ordre, la carte en premier et la vie réelle en deuxième. Donc l'échelle signifie <b>une distance de 1 unité sur la carte représente 50 000 unités dans la vie réelle</b>.",
      { mode: "scale-web-map" });
  }
]), ["Dans une échelle, décide quel nombre appartient au dessin et lequel appartient à la vie réelle.", "Le facteur d'échelle est la longueur de l'image divisée par la longueur d'origine ; inférieur à 1 signifie plus petit, supérieur à 1 signifie plus grand."]);

// 2. 10.16 L2 gen num with figure, CR 3: redraw with a scale factor, find one image side.
E("u7-scale-draw-num", 7, ["10.16"], 1, "gen", function () {
  var ks = [0.5, 1.5, 2, 2.5, 3];
  var k = pick(ks), kind = pick(["rect", "tri"]);
  var word = k < 1 ? "d'une réduction" : "d'un agrandissement";
  if (kind === "rect") {
    var w = ri(3, 9), h = ri(2, 7), askW = Math.random() < 0.5;
    var side = askW ? w : h, ans = Math.round(side * k * 100) / 100;
    var u = Math.min(24, 220 / w, 110 / h), x0 = 60, y0 = 40;
    var body = u7Poly([[x0, y0], [x0 + w * u, y0], [x0 + w * u, y0 + h * u], [x0, y0 + h * u]], FIG_SHADE);
    body += u7T(x0 + w * u / 2, y0 - 14, fmtD(w) + " cm", 13, false);
    body += u7T(x0 + w * u + 26, y0 + h * u / 2, fmtD(h) + " cm", 13, false);
    body += u7T(x0 + w * u / 2, y0 + h * u + 20, "Figure d'origine", 13, true);
    var q = numq("Le diagramme montre un rectangle. Il est redessiné sous forme " + word + " avec un facteur d'échelle de " + fmtD(k) + ". Quelle est la longueur, en centimètres, du côté de l'image qui correspond au côté de " + fmtD(side) + " cm ?",
      ans, 0.01,
      "Multiplie le côté d'origine par le facteur d'échelle : \\[ \\begin{aligned} \\text{côté de l'image} &= " + fmtD(side) + " \\times " + fmtD(k) + " \\\\ &= " + fmtD(ans) + " \\end{aligned} \\] Donc le côté correspondant de l'image mesure <b>" + fmtD(ans) + " cm</b>.",
      { mode: "draw-rect", w: w, h: h, k: k, side: side });
    q.figure = u7Svg(340, 200, body, "Rectangle avec des côtés étiquetés");
    return q;
  }
  var a = ri(3, 10), b = ri(3, 10), askA = Math.random() < 0.5;
  var side2 = askA ? a : b, ans2 = Math.round(side2 * k * 100) / 100;
  var u2 = Math.min(24, 220 / a, 120 / b), x1 = 60, y1 = 160;
  var body2 = u7Poly([[x1, y1], [x1 + a * u2, y1], [x1, y1 - b * u2]], FIG_SHADE);
  body2 += u7T(x1 + a * u2 / 2, y1 + 18, fmtD(a) + " cm", 13, false);
  body2 += u7T(x1 - 26, y1 - b * u2 / 2, fmtD(b) + " cm", 13, false);
  body2 += u7T(x1 + a * u2 / 2, y1 - b * u2 - 16, "Figure d'origine", 13, true);
  var q2 = numq("Le diagramme montre un triangle rectangle. Il est redessiné sous forme " + word + " avec un facteur d'échelle de " + fmtD(k) + ". Quelle est la longueur, en centimètres, du côté de l'image qui correspond au côté de " + fmtD(side2) + " cm ?",
    ans2, 0.01,
    "Multiplie le côté d'origine par le facteur d'échelle : \\[ \\begin{aligned} \\text{côté de l'image} &= " + fmtD(side2) + " \\times " + fmtD(k) + " \\\\ &= " + fmtD(ans2) + " \\end{aligned} \\] Donc le côté correspondant de l'image mesure <b>" + fmtD(ans2) + " cm</b>.",
    { mode: "draw-tri", a: a, b: b, k: k, side: side2 });
  q2.figure = u7Svg(340, 200, body2, "Triangle rectangle avec des côtés étiquetés");
  return q2;
}, ["Le côté de l'image est le côté d'origine multiplié par le facteur d'échelle.", "Trouve le côté donné dans le diagramme, puis multiplie-le par le facteur d'échelle."]);

// 3. 10.17 L1 gen num: scale factor from a pair of corresponding lengths.
E("u7-scale-factor-num", 7, ["10.17"], 1, "gen", function () {
  var pairs = [[1, 4], [2, 5], [1, 2], [3, 5], [3, 4], [6, 5], [5, 4], [3, 2], [8, 5], [2, 1], [5, 2], [3, 1], [4, 1]];
  var pr = pick(pairs), p = pr[0], d = pr[1], m = ri(2, 10);
  var orig = d * m, img = p * m, ans = Math.round(p / d * 100) / 100;
  var ctxs = [["Un dessin d'un tournesol mesure ", " cm de haut. Le tournesol réel mesure ", " cm de haut."],
            ["Un bateau miniature mesure ", " cm de long. Le bateau réel mesure ", " cm de long."],
            ["Une photo imprimée mesure ", " cm de large. L'image à l'écran dont elle vient mesure ", " cm de large."]];
  var c = pick(ctxs);
  var prompt, oLen, iLen;
  if (Math.random() < 0.5) { oLen = orig; iLen = img; } else { oLen = orig; iLen = img; }
  prompt = c[0] + fmtD(iLen) + c[1] + fmtD(oLen) + c[2] + " La première longueur est celle de l'image et la deuxième est celle d'origine. Quel est le facteur d'échelle du diagramme ? Donne le facteur d'échelle sous forme de nombre décimal ou de nombre entier.";
  var sol = "Le facteur d'échelle est la longueur de l'image divisée par la longueur d'origine : \\[ \\begin{aligned} \\text{facteur d'échelle} &= " + fmtD(iLen) + " \\div " + fmtD(oLen) + " \\\\ &= " + fmtD(ans) + " \\end{aligned} \\] Donc le facteur d'échelle est <b>" + fmtD(ans) + "</b>.";
  var q = numq(prompt, ans, 0.01, sol, { mode: "scale-factor", orig: oLen, img: iLen });
    q.figure = solBarsFig([{ name: "Image", len: iLen, lab: fmtD(iLen) + " cm" }, { name: "Figure d'origine", len: oLen, lab: fmtD(oLen) + " cm" }], "Longueurs de l'image et de la figure d'origine en barres");
    return q;
}, ["Le facteur d'échelle est la longueur de l'image divisée par la longueur d'origine.", "Mets la longueur de l'image en premier, puis divise par la longueur d'origine."]);

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
    body += u7T(30 + w * u / 2, 31, fmtD(w) + " cm", 12, false) + u7T(30 + w * u / 2, 45 + h * u + 18, "Figure d'origine", 12, true);
    body += u7T(30 + w * u + 15, 45 + h * u / 2, fmtD(h) + " cm", 12, false);
    body += u7T(195 + iw * u / 2, 31, fmtD(iw) + " cm", 12, false) + u7T(195 + iw * u / 2, 45 + ih * u + 18, "Deuxième", 12, true);
    body += u7T(195 + iw * u + 15, 45 + ih * u / 2, fmtD(ih) + " cm", 12, false);
    var fig = u7Svg(345, 195, body, "Un rectangle d'origine et un deuxième rectangle avec des côtés étiquetés");
    var prompt = "Le diagramme montre un rectangle d'origine et un deuxième rectangle. Quel énoncé au sujet du deuxième rectangle est vrai ?";
    var sol, q;
    if (prop) {
      sol = "Vérifie les deux rapports de côtés : \\[ \\begin{aligned} " + fmtD(iw) + " \\div " + fmtD(w) + " &= " + fmtD(k) + " \\\\ " + fmtD(ih) + " \\div " + fmtD(h) + " &= " + fmtD(k) + " \\end{aligned} \\] Les deux rapports sont égaux, donc le deuxième rectangle est <b>proportionnel à l'original, avec un facteur d'échelle de " + fmtD(k) + "</b>.";
      q = mcq(prompt,
        { t: "Il est proportionnel à l'original, avec un facteur d'échelle de " + fmtD(k) + ".", fb: "Exact. Les deux rapports de côtés valent " + fmtD(k) + "." },
        [
          { t: "Il est proportionnel à l'original, avec un facteur d'échelle de " + fmtD(Math.round(1 / k * 100) / 100) + ".", fb: "Cela divise l'original par l'image ; le facteur d'échelle est l'image divisée par l'original." },
          { t: "Il est proportionnel à l'original, avec un facteur d'échelle de " + fmtD(k + 1) + ".", fb: "Vérifie un rapport : " + fmtD(iw) + " divisé par " + fmtD(w) + " ne donne pas " + fmtD(k + 1) + "." },
          { t: "Il n'est pas proportionnel, car les rapports de côtés ne correspondent pas.", fb: "Les rapports correspondent bien ici ; divise chaque côté de l'image par son côté d'origine correspondant." }
        ], sol, { mode: "prop-yes", w: w, h: h, k: k, iw: iw, ih: ih });
    } else {
      var r1 = Math.round(iw / w * 100) / 100, r2 = Math.round(ih / h * 100) / 100;
      sol = "Vérifie les deux rapports de côtés : \\[ \\begin{aligned} " + fmtD(iw) + " \\div " + fmtD(w) + " &= " + fmtD(r1) + " \\\\ " + fmtD(ih) + " \\div " + fmtD(h) + " &= " + fmtD(r2) + " \\end{aligned} \\] Les rapports diffèrent, donc le deuxième rectangle n'est <b>pas proportionnel, car les rapports de côtés ne correspondent pas</b>.";
      q = mcq(prompt,
        { t: "Il n'est pas proportionnel, car les rapports de côtés ne correspondent pas.", fb: "Exact. Les deux rapports sont " + fmtD(r1) + " et " + fmtD(r2) + ", qui diffèrent." },
        [
          { t: "Il est proportionnel à l'original, avec un facteur d'échelle de " + fmtD(r1) + ", calculé à partir d'un seul côté.", fb: "Cela utilise seulement la première paire de côtés ; la deuxième paire donne un rapport différent." },
          { t: "Il est proportionnel à l'original, avec un facteur d'échelle de " + fmtD(r2) + ", calculé à partir d'un seul côté.", fb: "Cela utilise seulement la deuxième paire de côtés ; la première paire donne un rapport différent." },
          { t: "Il n'est pas proportionnel, car les angles correspondants sont différents.", fb: "Les deux figures sont des rectangles, donc tous les angles mesurent 90 degrés ; le problème vient des rapports de côtés." }
        ], sol, { mode: "prop-no", w: w, h: h, k: k, iw: iw, ih: ih });
    }
    q.figure = fig;
    return q;
  }
  var qf = mcq("Le diagramme montre un rectangle d'origine et un deuxième rectangle. Quel énoncé au sujet du deuxième rectangle est vrai ?",
    { t: "Il est proportionnel à l'original, avec un facteur d'échelle de 2.", fb: "Exact. Les deux rapports de côtés valent 2." },
    [
      { t: "Il est proportionnel à l'original, avec un facteur d'échelle de 0,5.", fb: "Cela divise l'original par l'image." },
      { t: "Il est proportionnel à l'original, avec un facteur d'échelle de 3.", fb: "Vérifie un rapport : 8 divisé par 4 ne donne pas 3." },
      { t: "Il n'est pas proportionnel, car les rapports de côtés ne correspondent pas.", fb: "Les rapports correspondent bien ici." }
    ], "Les deux rapports valent 2, donc le deuxième rectangle est <b>proportionnel à l'original, avec un facteur d'échelle de 2</b>.", { mode: "prop-yes", w: 4, h: 3, k: 2, iw: 8, ih: 6 });
  qf.figure = u7Svg(345, 195, u7Poly([[30, 45], [86, 45], [86, 87], [30, 87]], FIG_SHADE) + u7Poly([[195, 45], [307, 45], [307, 129], [195, 129]], "#ffffff") + u7T(58, 31, "4 cm", 12, false) + u7T(251, 31, "8 cm", 12, false) + u7T(101, 66, "3 cm", 12, false) + u7T(322, 87, "6 cm", 12, false) + u7T(58, 105, "Figure d'origine", 12, true) + u7T(251, 147, "Deuxième", 12, true), "Un rectangle d'origine et un deuxième rectangle avec des côtés étiquetés");
  return qf;
}, ["Un diagramme est proportionnel quand chaque côté de l'image, divisé par son côté d'origine correspondant, donne le même rapport.", "Divise la première paire de côtés, puis divise la deuxième paire, et compare les deux rapports."]);

// 5. 10.7 L2 gen MC with figure: similar or not, with the correct reason.
/*
 * TRANSLATOR NOTES
 * Chunk: Unit 7 (Similarity and Transformations), second part, chunkG2-u7b.
 * Entries translated: 17 (all prompts, options, per-answer feedback, worked
 * solutions, hint1 and hint2).
 * Judgement calls (glossary silent): "congruent" = congruents; "line symmetry"
 * (the property) = symétrie linéaire; "mirror image" = image miroir; "kite"
 * (shape) = cerf-volant; "honeycomb" = nid d'abeilles; "checkerboard" = damier;
 * "pinwheel" = moulinet; "bunting strip" = banderole de fanions; "quilt" =
 * courtepointe; "shed" = remise; "flagpole" = mât; "handedness" is rendered
 * as orientation (B garde la même orientation que A). The letter labels in
 * the u7-translation-rule rule codes use French initials D/G/H/B (droite,
 * gauche, haut, bas), including the fallback "D2, H3". The \text{...} labels
 * inside KaTeX are translated (facteur d'échelle, nouveau côté, etc.); the
 * KaTeX commands are unchanged. Aria labels and the visible figure labels
 * "Shape"/"Image" (Forme/Image) are translated.
 * FMT-GEOM lines left as fmt( : exactly one line, in u7-lines-symmetry, the
 * semicircle path data: var d = "M " + fmt(115 - r, 1) + " 125 A " ... +
 * fmt(115 + r, 1) + " 125 Z"; it carries an FMT-GEOM marker on that line.
 * Every other fmt( became fmtD(, including the visible figure side labels
 * fed to u7TriLabels in u7-similar-verdict. No fmtF( and no .toFixed occur
 * in this chunk, so there are no fmtDF( conversions.
 * Literal formatted numbers in static prose (for later reconciliation
 * against the curriculum guides): there are NO literal decimals, NO
 * thousands groupings, NO percent amounts and NO dollar amounts in static
 * prose in this chunk. The static numeric literals are plain integers and
 * degree measures copied unchanged from the English (360°, 90°, 180°,
 * order numbers, integer side lists and integer coordinates in the
 * fallback entries). All generated numbers route through fmtD(.
 * Unsure: "Pair" is rendered "Paire"; coordinate couples keep the comma
 * separator produced by u7Coord (code, unchanged), and side-length lists
 * keep comma separators, as in the English.
 */

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
    body += u7TriLabels(P1, ["A", "B", "C"], angs, tr.map(function (s) { return fmtD(s); }));
    body += u7TriLabels(P2, ["D", "E", "F"], angs2, img2.map(function (s) { return fmtD(s); }));
    var fig = u7Svg(345, 185, body, "Deux triangles avec des étiquettes de côtés et d'angles");
    var prompt = "Utilise les étiquettes du diagramme. Lequel des énoncés sur les triangles ABC et DEF est exact ?";
    var simT = "Ils sont semblables, car les angles correspondants sont égaux et les côtés correspondants sont proportionnels.";
    var angT = "Ils ne sont pas semblables, car les angles correspondants ne sont pas tous égaux.";
    var sideT = "Ils ne sont pas semblables, car les côtés correspondants ne sont pas proportionnels.";
    var congT = "Ils sont congruents, car ils ont les mêmes angles.";
    var sol, q;
    if (mode === "similar") {
      sol = "Les angles correspondent et les rapports de côtés sont égaux : \\[ \\begin{aligned} " + fmtD(img[0]) + " \\div " + fmtD(tr[0]) + " &= " + fmtD(k) + " \\\\ " + fmtD(img[1]) + " \\div " + fmtD(tr[1]) + " &= " + fmtD(k) + " \\\\ " + fmtD(img[2]) + " \\div " + fmtD(tr[2]) + " &= " + fmtD(k) + " \\end{aligned} \\] Donc <b>ils sont semblables, car les angles correspondants sont égaux et les côtés correspondants sont proportionnels</b>.";
      q = mcq(prompt, { t: simT, fb: "Exact. Des angles égaux et un même rapport de côtés montrent la similarité." },
        [{ t: angT, fb: "Les étiquettes des angles correspondent ici; compare-les sommet par sommet." }, { t: sideT, fb: "Les rapports de côtés correspondent ici; chacun égale " + fmtD(k) + "." }, { t: congT, fb: "Les mêmes angles seuls ne rendent pas des triangles congruents; les côtés sont ici à l'échelle, pas égaux." }],
        sol, { mode: "verdict-similar", tr: tr.join(","), k: k });
    } else if (mode === "angles") {
      sol = "Compare les angles : le triangle ABC a un angle de " + angs[0] + " degrés là où le triangle DEF a " + angs2[0] + " degrés. Des polygones semblables exigent que tous les angles correspondants soient égaux, donc <b>ils ne sont pas semblables, car les angles correspondants ne sont pas tous égaux</b>.";
      q = mcq(prompt, { t: angT, fb: "Exact. Une paire d'angles correspondants diffère, donc les triangles ne peuvent pas être semblables." },
        [{ t: simT, fb: "Vérifie encore les étiquettes des angles; une paire d'angles correspondants diffère." }, { t: sideT, fb: "Les côtés sont proportionnels ici; le problème vient des angles." }, { t: congT, fb: "Les angles ne sont pas tous les mêmes, et les côtés sont à l'échelle, pas égaux." }],
        sol, { mode: "verdict-angles", tr: tr.join(","), k: k });
    } else {
      sol = "Les angles correspondent, mais pas les rapports de côtés : \\[ \\begin{aligned} " + fmtD(img2[0]) + " \\div " + fmtD(tr[0]) + " &= " + fmtD(k) + " \\\\ " + fmtD(img2[2]) + " \\div " + fmtD(tr[2]) + " &= " + fmtD(Math.round(img2[2] / tr[2] * 100) / 100) + " \\end{aligned} \\] Les rapports diffèrent, donc <b>ils ne sont pas semblables, car les côtés correspondants ne sont pas proportionnels</b>.";
      q = mcq(prompt, { t: sideT, fb: "Exact. Les angles correspondent, mais un rapport de côtés diffère des autres." },
        [{ t: simT, fb: "Vérifie chaque rapport de côtés; l'un d'eux diffère des autres." }, { t: angT, fb: "Les étiquettes des angles correspondent ici; compare-les sommet par sommet." }, { t: congT, fb: "Les mêmes angles seuls ne rendent pas des triangles congruents; les côtés sont ici à l'échelle, pas égaux." }],
        sol, { mode: "verdict-sides", tr: tr.join(","), k: k });
    }
    q.figure = fig;
    return q;
  }
  return mcq("Utilise les étiquettes du diagramme. Lequel des énoncés sur les deux triangles est exact ?",
    { t: "Ils sont semblables, car les angles correspondants sont égaux et les côtés correspondants sont proportionnels.", fb: "Exact." },
    [{ t: "Ils ne sont pas semblables, car les angles correspondants ne sont pas tous égaux.", fb: "Les étiquettes des angles correspondent ici." }, { t: "Ils ne sont pas semblables, car les côtés correspondants ne sont pas proportionnels.", fb: "Les rapports de côtés correspondent ici." }, { t: "Ils sont congruents, car ils ont les mêmes angles.", fb: "Les mêmes angles seuls ne montrent pas la congruence." }],
    "Les angles correspondent et chaque rapport de côtés est 2, donc <b>ils sont semblables</b>.", { mode: "verdict-similar", tr: "3,4,5", k: 2 });
}, ["Des polygones semblables exigent deux vérifications : des angles correspondants égaux et des côtés correspondants proportionnels.", "Compare d'abord les étiquettes des angles, puis divise chaque côté de la figure image par son côté correspondant dans la figure d'origine."]);

// 6. 10.7 L3 gen MC: three pairs in text, choose the pair that is similar.
E("u7-similar-pair", 7, ["10.7"], 3, "gen", function () {
  var triBases = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [5, 5, 6], [8, 15, 17]];
  var quadBases = [[2, 3, 4, 5], [3, 4, 5, 6], [2, 4, 5, 7], [4, 5, 6, 8]];
  function sortedStr(arr) { return arr.slice().sort(function (x, y) { return x - y; }).map(function (v) { return fmtD(v); }).join(", "); }
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
    var texts = pairs.map(function (pr, i) { return "Paire " + (i + 1) + " : " + sortedStr(pr.a) + " cm et " + sortedStr(pr.b) + " cm"; });
    if (new Set(texts).size < 3) continue;
    var gi = pairs.findIndex(function (pr) { return pr.good; });
    var opts = texts.map(function (t, i) {
      return { t: t, fb: i === gi ? "Exact. En triant chaque liste et en divisant, on obtient un même rapport de " + fmtD(k) + "." : "Trie les deux listes et divise les côtés correspondants; les rapports de cette paire ne sont pas tous égaux." };
    });
    var corr = opts[gi], rest = opts.filter(function (o, i) { return i !== gi; });
    rest.push({ t: "Aucune des trois paires n'est semblable.", fb: "Une paire a bien un même rapport pour chaque côté; vérifie encore la paire " + (gi + 1) + "." });
    var sb = base.slice().sort(function (x, y) { return x - y; }), si = simImg.slice().sort(function (x, y) { return x - y; });
    var chain = sb.map(function (s, i) { return fmtD(si[i]) + " \\div " + fmtD(s) + " &= " + fmtD(k); }).join(" \\\\ ");
    var sol = "Pour la paire semblable, trie les côtés de chaque liste, puis divise les côtés correspondants : \\[ \\begin{aligned} " + chain + " \\end{aligned} \\] Tous les rapports sont égaux, donc <b>la paire " + (gi + 1) + " est la paire semblable</b>. Dans chaque autre paire, un rapport ne suit pas les autres.";
    var q = mcq("Trois paires de polygones sont données par les longueurs de leurs côtés. Une seule paire est semblable. Quelle paire est-ce ?",
      corr, rest, sol, { mode: "similar-pair", base: base.join(","), k: k, good: gi });
    var figB = "";
    pairs.forEach(function (pr, i) {
      var by = 10 + i * 60;
      figB += solT(16, by + 25, "Paire " + (i + 1), 11, true);
      var P1 = pr.a.length === 3 ? u7FitTri(pr.a, 34, by, 105, 50) : solQuadPts(pr.a, 34, by, 105, 50);
      var P2 = pr.b.length === 3 ? u7FitTri(pr.b, 196, by, 105, 50) : solQuadPts(pr.b, 196, by, 105, 50);
      if (P1) { figB += u7Poly(P1, FIG_SHADE); figB += pr.a.length === 3 ? solSideLabels(P1, [fmtD(pr.a[2]), fmtD(pr.a[0]), fmtD(pr.a[1])]) : solSideLabels(P1, pr.a.map(function (v) { return fmtD(v); })); }
      if (P2) { figB += u7Poly(P2, "#ffffff"); figB += pr.b.length === 3 ? solSideLabels(P2, [fmtD(pr.b[2]), fmtD(pr.b[0]), fmtD(pr.b[1])]) : solSideLabels(P2, pr.b.map(function (v) { return fmtD(v); })); }
    });
    q.figure = u7Svg(345, 195, figB, "Trois paires de polygones avec des étiquettes de côtés");
    return q;
  }
  return mcq("Trois paires de polygones sont données par les longueurs de leurs côtés. Une seule paire est semblable. Quelle paire est-ce ?",
    { t: "Paire 1 : 3, 4, 5 cm et 6, 8, 10 cm", fb: "Exact. Tous les rapports valent 2." },
    [{ t: "Paire 2 : 3, 4, 5 cm et 6, 8, 11 cm", fb: "Les rapports ne sont pas tous égaux dans cette paire." }, { t: "Paire 3 : 5, 5, 6 cm et 10, 10, 13 cm", fb: "Les rapports ne sont pas tous égaux dans cette paire." }, { t: "Aucune des trois paires n'est semblable.", fb: "La paire 1 a un même rapport pour chaque côté." }],
    "En triant et en divisant la paire 1, on obtient le rapport 2 pour chaque côté, donc <b>la paire 1 est la paire semblable</b>.", { mode: "similar-pair", base: "3,4,5", k: 2, good: 0 });
}, ["Trie les côtés de chaque liste du plus petit au plus grand avant de les comparer.", "Divise chaque côté de la deuxième liste par le côté correspondant de la première liste; les paires semblables donnent un même rapport."]);

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
  var shapeWord = isTri ? "triangle" : "quadrilatère";
  var prompt = "Un " + shapeWord + " a des côtés de " + sides.map(function (s) { return fmtD(s); }).join(", ") + " cm. On trace un " + shapeWord + " semblable avec un facteur d'échelle de " + fmtD(k) + ". Quelle est la longueur, en centimètres, du côté du nouveau " + shapeWord + " qui correspond au côté de " + fmtD(side) + " cm ?";
  var sol = "Les côtés correspondants de polygones semblables suivent le facteur d'échelle : \\[ \\begin{aligned} \\text{nouveau côté} &= " + fmtD(side) + " \\times " + fmtD(k) + " \\\\ &= " + fmtD(ans) + " \\end{aligned} \\] Donc le côté correspondant mesure <b>" + fmtD(ans) + " cm</b>.";
  var q = numq(prompt, ans, 0.01, sol, { mode: "draw-similar", sides: sides.join(","), k: k, side: side });
  var figB2 = "";
  if (isTri) {
    var PT = u7FitTri(sides, 95, 22, 160, 125);
    figB2 = u7Poly(PT, FIG_SHADE) + solSideLabels(PT, [fmtD(sides[2]) + " cm", fmtD(sides[0]) + " cm", fmtD(sides[1]) + " cm"]);
  } else {
    var PQ = solQuadPts(sides, 95, 22, 160, 125);
    if (PQ) figB2 = u7Poly(PQ, FIG_SHADE) + solSideLabels(PQ, sides.map(function (v) { return fmtD(v) + " cm"; }));
  }
  if (figB2) q.figure = u7Svg(345, 170, figB2, "Polygone avec des côtés étiquetés");
  return q;
}, ["Un dessin semblable multiplie chaque côté par le même facteur d'échelle.", "Prends le côté nommé et multiplie-le par le facteur d'échelle."]);

// 8. 10.15 L2 gen num, CR 3: similar figures in context.
E("u7-similar-context-num", 7, ["10.15"], 2, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var w = pick([8, 10, 12, 15, 20]), k = pick([1.5, 2, 2.5, 3]);
    var h = pick([6, 8, 9, 10, 12, 16]);
    var W = Math.round(w * k * 10) / 10, ans = Math.round(h * k * 100) / 100;
    var prompt = "Une photo mesure " + fmtD(w) + " cm de largeur et " + fmtD(h) + " cm de hauteur. On l'agrandit pour que l'épreuve mesure " + fmtD(W) + " cm de largeur, en gardant la même forme. Quelle est la hauteur de l'épreuve, en centimètres ?";
    var sol = "Le facteur d'échelle de l'agrandissement vient des largeurs : \\[ \\begin{aligned} \\text{facteur d'échelle} &= " + fmtD(W) + " \\div " + fmtD(w) + " = " + fmtD(k) + " \\\\ \\text{hauteur de l'épreuve} &= " + fmtD(h) + " \\times " + fmtD(k) + " \\\\ &= " + fmtD(ans) + " \\end{aligned} \\] Donc l'épreuve mesure <b>" + fmtD(ans) + " cm</b> de hauteur.";
    var q = numq(prompt, ans, 0.01, sol, { mode: "photo-enlarge", w: w, h: h, k: k });
    q.figure = solRectPair({ w1: w, h1: h, wLab1: fmtD(w) + " cm", hLab1: fmtD(h) + " cm", cap1: "Photo", w2: W, h2: h * k, wLab2: fmtD(W) + " cm", hLab2: "?", cap2: "Épreuve", aria: "Une photo et son agrandissement avec des côtés étiquetés" });
    return q;
  }
  if (mode === 1) {
    var real = pick([40, 50, 60, 80, 100]), mod = pick([8, 10, 12, 16, 20]);
    var k2 = mod / real;
    var part = pick([10, 15, 20, 25, 30]);
    var ans2 = Math.round(part * k2 * 100) / 100;
    if (Math.abs(ans2 - Math.round(ans2 * 10) / 10) > 0.001) { part = 20; ans2 = Math.round(part * k2 * 100) / 100; }
    var prompt2 = "Une remise réelle mesure " + fmtD(real) + " m de longueur, et un modèle réduit de cette remise mesure " + fmtD(mod) + " cm de longueur. Une porte de la remise réelle mesure " + fmtD(part) + " m de largeur, mesurée dans le même sens que les longueurs. Quelle est la largeur de la porte sur le modèle, en centimètres ?";
    var sol2 = "Le facteur d'échelle du modèle est la longueur du modèle divisée par la longueur réelle : \\[ \\begin{aligned} \\text{facteur d'échelle} &= " + fmtD(mod) + " \\div " + fmtD(real) + " = " + fmtD(k2) + " \\\\ \\text{porte du modèle} &= " + fmtD(part) + " \\times " + fmtD(k2) + " \\\\ &= " + fmtD(ans2) + " \\end{aligned} \\] Donc la porte du modèle mesure <b>" + fmtD(ans2) + " cm</b> de largeur.";
    var q = numq(prompt2, ans2, 0.01, sol2, { mode: "model-door", real: real, mod: mod, part: part });
    var figB = "";
    figB += solPoly([[45, 36], [245, 36], [245, 78], [45, 78]], "#ffffff");
    figB += solPoly([[45, 36], [45 + 200 * part / real, 36], [45 + 200 * part / real, 78], [45, 78]], FIG_SHADE);
    figB += solT(145, 92, fmtD(real) + " m", 12, false);
    figB += solT(45 + 100 * part / real, 26, fmtD(part) + " m", 11, false);
    figB += solPoly([[85, 116], [205, 116], [205, 146], [85, 146]], "#ffffff");
    figB += solPoly([[85, 116], [85 + 120 * part / real, 116], [85 + 120 * part / real, 146], [85, 146]], FIG_SHADE);
    figB += solT(145, 160, fmtD(mod) + " cm", 12, false);
    figB += solT(85 + 60 * part / real, 108, "?", 12, false);
    q.figure = solSvg(340, 172, figB, "Un abri et son modèle réduit avec la porte ombrée");
    return q;
  }
  var hp = pick([1.5, 1.6, 1.8]), mult = pick([2, 3, 4, 5]);
  var sp = pick([1, 1.2, 1.5, 2]);
  var sPole = Math.round(sp * mult * 10) / 10, ans3 = Math.round(hp * mult * 100) / 100;
  var prompt3 = "Une personne de " + fmtD(hp) + " m projette une ombre de " + fmtD(sp) + " m. Au même moment, un mât projette une ombre de " + fmtD(sPole) + " m. Le mât et son ombre forment un triangle semblable au triangle de la personne et de son ombre. Quelle est la hauteur du mât, en mètres ?";
  var sol3 = "L'ombre est " + fmtD(mult) + " fois plus longue, donc le mât est le même nombre de fois plus haut : \\[ \\begin{aligned} " + fmtD(sPole) + " \\div " + fmtD(sp) + " &= " + fmtD(mult) + " \\\\ \\text{hauteur du mât} &= " + fmtD(hp) + " \\times " + fmtD(mult) + " \\\\ &= " + fmtD(ans3) + " \\end{aligned} \\] Donc le mât mesure <b>" + fmtD(ans3) + " m</b> de hauteur.";
  var q = numq(prompt3, ans3, 0.01, sol3, { mode: "shadow-pole", hp: hp, sp: sp, mult: mult });
    q.figure = solShadowFig([{ name: "Personne", h: hp, s: sp, hLab: fmtD(hp) + " m", sLab: fmtD(sp) + " m" }, { name: "Mât de drapeau", h: ans3, s: sPole, hLab: "?", sLab: fmtD(sPole) + " m" }], "Une personne et un mât de drapeau avec leurs ombres");
    return q;
}, ["Trouve le facteur d'échelle à partir de la paire de longueurs que tu connais, puis utilise-le sur la longueur correspondante.", "Divise d'abord la longueur image connue par sa longueur d'origine correspondante."]);

// 9. 10.15 L3 gen num, CR 3: two-step similar-figures problems.
E("u7-similar-two-step-num", 7, ["10.15"], 3, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var so = pick([4, 5, 6, 8, 10]), k = pick([1.5, 2, 2.5, 3]);
    var si = Math.round(so * k * 10) / 10;
    var P = pick([24, 30, 36, 40, 44, 48, 52, 60]);
    var ans = Math.round(P * k * 100) / 100;
    var prompt = "Deux rectangles sont semblables. Dans le plus petit rectangle, un côté mesure " + fmtD(so) + " cm et le périmètre est de " + fmtD(P) + " cm. Le côté correspondant dans le plus grand rectangle mesure " + fmtD(si) + " cm. Quel est le périmètre du plus grand rectangle, en centimètres ?";
    var sol = "Trouve d'abord le facteur d'échelle à partir des côtés correspondants, puis applique-le au périmètre : \\[ \\begin{aligned} \\text{facteur d'échelle} &= " + fmtD(si) + " \\div " + fmtD(so) + " = " + fmtD(k) + " \\\\ \\text{grand périmètre} &= " + fmtD(P) + " \\times " + fmtD(k) + " \\\\ &= " + fmtD(ans) + " \\end{aligned} \\] Donc le périmètre du plus grand rectangle est <b>" + fmtD(ans) + " cm</b>.";
    var q = numq(prompt, ans, 0.01, sol, { mode: "perimeter-scale", so: so, si: si, P: P });
    q.figure = solRectPair({ w1: so, h1: P / 2 - so, wLab1: fmtD(so) + " cm", hLab1: fmtD(P / 2 - so) + " cm", cap1: "Plus petit", w2: si, h2: (P / 2 - so) * k, wLab2: fmtD(si) + " cm", hLab2: fmtD((P / 2 - so) * k) + " cm", cap2: "Plus grand", aria: "Deux rectangles semblables avec des côtés étiquetés" });
    return q;
  }
  if (mode === 1) {
    var w = pick([4, 5, 6, 8]), h = pick([3, 4, 5, 6, 7]);
    var k2 = pick([1.5, 2, 2.5, 3]);
    var W = Math.round(w * k2 * 10) / 10, H = Math.round(h * k2 * 10) / 10;
    var ans2 = Math.round(2 * (W + H) * 100) / 100;
    var prompt2 = "Un rectangle mesure " + fmtD(w) + " cm sur " + fmtD(h) + " cm. Un rectangle semblable a une largeur de " + fmtD(W) + " cm. Quel est le périmètre du rectangle semblable, en centimètres ?";
    var sol2 = "Trouve le facteur d'échelle, puis la nouvelle hauteur, puis le périmètre : \\[ \\begin{aligned} \\text{facteur d'échelle} &= " + fmtD(W) + " \\div " + fmtD(w) + " = " + fmtD(k2) + " \\\\ \\text{nouvelle hauteur} &= " + fmtD(h) + " \\times " + fmtD(k2) + " = " + fmtD(H) + " \\\\ \\text{périmètre} &= 2 \\times (" + fmtD(W) + " + " + fmtD(H) + ") \\\\ &= " + fmtD(ans2) + " \\end{aligned} \\] Donc le périmètre est <b>" + fmtD(ans2) + " cm</b>.";
    var q = numq(prompt2, ans2, 0.01, sol2, { mode: "rect-perimeter", w: w, h: h, k: k2 });
    q.figure = solRectPair({ w1: w, h1: h, wLab1: fmtD(w) + " cm", hLab1: fmtD(h) + " cm", cap1: "Figure d'origine", w2: W, h2: H, wLab2: fmtD(W) + " cm", hLab2: "?", cap2: "Semblable", aria: "Un rectangle et un rectangle semblable avec des côtés étiquetés" });
    return q;
  }
  var sA = pick([3, 4, 5, 6]), kA = pick([2, 3]), kB = pick([1.5, 2, 2.5]);
  var sB = sA * kA, ans3 = Math.round(sB * kB * 100) / 100;
  var prompt3 = "Les figures A, B et C sont toutes semblables. Un côté de la figure A mesure " + fmtD(sA) + " cm, et le côté correspondant de la figure B mesure " + fmtD(sB) + " cm. La figure C est tracée à partir de la figure B avec un facteur d'échelle de " + fmtD(kB) + ". Quelle est la longueur, en centimètres, du côté de la figure C qui correspond au côté de " + fmtD(sA) + " cm de la figure A ?";
  var sol3 = "Passe d'abord par la figure B, puis applique le deuxième facteur d'échelle : \\[ \\begin{aligned} \\text{côté dans B} &= " + fmtD(sB) + " \\\\ \\text{côté dans C} &= " + fmtD(sB) + " \\times " + fmtD(kB) + " \\\\ &= " + fmtD(ans3) + " \\end{aligned} \\] Donc le côté correspondant de la figure C mesure <b>" + fmtD(ans3) + " cm</b>.";
  var q = numq(prompt3, ans3, 0.01, sol3, { mode: "chain-scale", sA: sA, sB: sB, kB: kB });
    q.figure = solBarsFig([{ name: "Figure A", len: sA, lab: fmtD(sA) + " cm" }, { name: "Figure B", len: sB, lab: fmtD(sB) + " cm" }, { name: "Figure C", len: ans3, lab: "?" }], "Côtés correspondants de trois figures semblables en barres");
    return q;
}, ["Divise le problème en étapes : trouve d'abord un facteur d'échelle, puis utilise-le.", "Utilise la paire de longueurs correspondantes qu'on te donne pour obtenir le facteur d'échelle avant de chercher autre chose."]);

// 10. 10.19 L3 gen num, CR 2: indirect measurement with similar triangles.
E("u7-indirect-measure-num", 7, ["10.19"], 3, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var hs = pick([1, 1.2, 1.5]), ss = pick([0.8, 1, 1.2, 1.5]);
    var mult = pick([6, 8, 10, 12, 15]);
    var sTree = Math.round(ss * mult * 10) / 10, ans = Math.round(hs * mult * 100) / 100;
    var prompt = "Un bâton de " + fmtD(hs) + " m projette une ombre de " + fmtD(ss) + " m. Au même moment, un arbre projette une ombre de " + fmtD(sTree) + " m. Les triangles de l'arbre et du bâton sont semblables. Quelle est la hauteur de l'arbre, en mètres ?";
    var sol = "L'ombre de l'arbre est un multiple de l'ombre du bâton : \\[ \\begin{aligned} " + fmtD(sTree) + " \\div " + fmtD(ss) + " &= " + fmtD(mult) + " \\\\ \\text{hauteur de l'arbre} &= " + fmtD(hs) + " \\times " + fmtD(mult) + " \\\\ &= " + fmtD(ans) + " \\end{aligned} \\] Donc l'arbre mesure <b>" + fmtD(ans) + " m</b> de hauteur.";
    var q = numq(prompt, ans, 0.01, sol, { mode: "tree-shadow", hs: hs, ss: ss, mult: mult });
    q.figure = solShadowFig([{ name: "Bâton", h: hs, s: ss, hLab: fmtD(hs) + " m", sLab: fmtD(ss) + " m" }, { name: "Arbre", h: ans, s: sTree, hLab: "?", sLab: fmtD(sTree) + " m" }], "Un bâton et un arbre avec leurs ombres");
    return q;
  }
  if (mode === 1) {
    var hp = pick([1.5, 1.6, 1.8]), sp = pick([2, 2.4, 3]);
    var mult2 = pick([8, 10, 12, 15, 20]);
    var sB = Math.round(sp * mult2 * 10) / 10, ans2 = Math.round(hp * mult2 * 100) / 100;
    var prompt2 = "Pour mesurer un bâtiment, une élève de " + fmtD(hp) + " m se place de façon que son ombre mesure " + fmtD(sp) + " m. L'ombre du bâtiment au même moment mesure " + fmtD(sB) + " m. À l'aide de triangles semblables, quelle est la hauteur du bâtiment, en mètres ?";
    var sol2 = "Compare d'abord les ombres, puis multiplie la hauteur par le même facteur : \\[ \\begin{aligned} " + fmtD(sB) + " \\div " + fmtD(sp) + " &= " + fmtD(mult2) + " \\\\ \\text{hauteur du bâtiment} &= " + fmtD(hp) + " \\times " + fmtD(mult2) + " \\\\ &= " + fmtD(ans2) + " \\end{aligned} \\] Donc le bâtiment mesure <b>" + fmtD(ans2) + " m</b> de hauteur.";
    var q = numq(prompt2, ans2, 0.01, sol2, { mode: "building-shadow", hp: hp, sp: sp, mult: mult2 });
    q.figure = solShadowFig([{ name: "Élève", h: hp, s: sp, hLab: fmtD(hp) + " m", sLab: fmtD(sp) + " m" }, { name: "Bâtiment", h: ans2, s: sB, hLab: "?", sLab: fmtD(sB) + " m" }], "Un élève et un bâtiment avec leurs ombres");
    return q;
  }
  var d = pick([3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8]), per = pick([6, 8, 10, 12, 15, 20]);
  var ans3 = Math.round(d * per * 100) / 100;
  var prompt3 = "Sur un diagramme à l'échelle d'un étang, la distance à travers l'étang mesure " + fmtD(d) + " cm. L'échelle du diagramme est : 1 cm représente " + fmtD(per) + " m. Quelle est la distance réelle à travers l'étang, en mètres ?";
  var sol3 = "Multiplie la distance du diagramme par la longueur réelle que représente chaque centimètre : \\[ \\begin{aligned} \\text{distance réelle} &= " + fmtD(d) + " \\times " + fmtD(per) + " \\\\ &= " + fmtD(ans3) + " \\end{aligned} \\] Donc la distance réelle à travers l'étang est <b>" + fmtD(ans3) + " m</b>.";
  var q = numq(prompt3, ans3, 0.01, sol3, { mode: "pond-scale", d: d, per: per });
    var figB = '<ellipse cx="170" cy="98" rx="118" ry="52" fill="#ffffff" stroke="' + FIG_INK + '" stroke-width="2"/>';
    figB += solLine([52, 98], [288, 98], true, 1.6);
    figB += solT(170, 72, fmtD(d) + " cm", 12, false);
    q.figure = solSvg(340, 175, figB, "Schéma d'un étang avec la distance à travers marquée");
    return q;
}, ["Établis le rapport correspondant à partir de l'objet que tu peux mesurer, puis applique-le à l'objet que tu ne peux pas mesurer.", "Divise les deux longueurs d'ombre (ou utilise l'échelle du diagramme) pour obtenir d'abord le facteur."]);

// 11. 10.1 L1 gen MC with figure: lines of symmetry of a drawn shape.
E("u7-lines-symmetry", 7, ["10.1"], 1, "gen", function () {
  function figFor(kind) {
    if (kind === "rect") { var w = ri(90, 140), h = ri(45, 68); return { n: 2, svg: u7Svg(230, 190, u7Poly([[115 - w / 2, 95 - h / 2], [115 + w / 2, 95 - h / 2], [115 + w / 2, 95 + h / 2], [115 - w / 2, 95 + h / 2]], FIG_SHADE), "Forme : rectangle") }; }
    if (kind === "iso") { var b = ri(95, 130), ht = ri(70, 105); return { n: 1, svg: u7Svg(230, 190, u7Poly([[115 - b / 2, 155], [115 + b / 2, 155], [115, 155 - ht]], FIG_SHADE), "Forme : triangle isocèle") }; }
    if (kind === "scal") { var b2 = ri(105, 135), off = ri(12, 30); return { n: 0, svg: u7Svg(230, 190, u7Poly([[115 - b2 / 2, 155], [115 + b2 / 2, 155], [115 - b2 / 2 + off, 50]], FIG_SHADE), "Forme : triangle scalène") }; }
    if (kind === "kite") { var tw = ri(28, 40), bw = ri(46, 60), th = ri(34, 48), bh = ri(62, 82); return { n: 1, svg: u7Svg(230, 200, u7Poly([[115, 15], [115 + tw, 15 + th], [115, 15 + th + bh], [115 - tw, 15 + th]], FIG_SHADE), "Forme : cerf-volant") }; }
    if (kind === "arrow") { var t = ri(26, 36); return { n: 1, svg: u7Svg(230, 190, u7Poly([[25, 95 - t / 2], [125, 95 - t / 2], [125, 62], [200, 95], [125, 128], [125, 95 + t / 2], [25, 95 + t / 2]], FIG_SHADE), "Forme : flèche") }; }
    if (kind === "semi") { var r = ri(55, 80); var d = "M " + fmt(115 - r, 1) + " 125 A " + r + " " + r + " 0 0 1 " + fmt(115 + r, 1) + " 125 Z"; /* FMT-GEOM */ return { n: 1, svg: u7Svg(230, 190, '<path d="' + d + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="2"/>', "Forme : demi-cercle") }; }
    if (kind === "tee") { var w3 = ri(112, 140), bh3 = ri(28, 38), sw = ri(34, 44), tot = ri(112, 132); var x0 = 115 - w3 / 2, sx = 115 - sw / 2; return { n: 1, svg: u7Svg(230, 200, u7Poly([[x0, 30], [x0 + w3, 30], [x0 + w3, 30 + bh3], [sx + sw, 30 + bh3], [sx + sw, 30 + tot], [sx, 30 + tot], [sx, 30 + bh3], [x0, 30 + bh3]], FIG_SHADE), "Forme : bloc en forme de lettre T") }; }
    var w4 = ri(80, 100), h4 = ri(112, 132), th4 = ri(30, 40), fh = ri(30, 40);
    return { n: 0, svg: u7Svg(230, 200, u7Poly([[35, 30], [35 + th4, 30], [35 + th4, 30 + h4 - fh], [35 + w4, 30 + h4 - fh], [35 + w4, 30 + h4], [35, 30 + h4]], FIG_SHADE), "Forme : bloc en forme de lettre L") };
  }
  var kind = pick(["rect", "iso", "scal", "kite", "arrow", "semi", "tee", "ell"]);
  var f = figFor(kind), n = f.n;
  var candNums = [n + 1, n + 2, n - 1, n + 3, n - 2].filter(function (v) { return v >= 0 && v !== n; });
  var ds = [];
  for (var i = 0; i < candNums.length && ds.length < 3; i++) {
    var v = candNums[i];
    ds.push({ t: fmtD(v), fb: v > n ? "Cela compte des axes de pliage que la forme n'a pas; essaie chaque pliage dans ta tête." : "Cela oublie un axe de pliage; vérifie les pliages par le milieu dans les deux sens." });
  }
  var q = mcq("Combien d'axes de symétrie la forme du diagramme a-t-elle ? Un axe de symétrie est un axe de pliage qui fait correspondre exactement les deux moitiés.",
    { t: fmtD(n), fb: "Exact. La forme se plie exactement sur elle-même le long de " + (n === 0 ? "aucun axe" : n === 1 ? "1 axe" : fmtD(n) + " axes") + "." },
    ds,
    "Plie la forme dans ta tête dans chaque sens où elle pourrait se plier. Seuls les pliages où les moitiés correspondent exactement comptent, et cette forme a <b>" + fmtD(n) + "</b> axe" + (n === 1 ? "" : "s") + " de symétrie.",
    { mode: "lines-sym", kind: kind, n: n });
  q.figure = f.svg;
  return q;
}, ["Essaie de plier la forme dans ta tête : pliages vertical, horizontal et oblique.", "Un pliage compte seulement quand les deux moitiés correspondent exactement, bord à bord."]);

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
      aria: "La moitié d'une forme sur une grille avec un axe de symétrie en tirets" });
    var prompt = "Le diagramme montre la moitié d'une forme sur une grille, avec un axe de symétrie en tirets. Le sommet P est à " + u7Coord(P) + ". Quel point est l'image miroir de P qui complète la forme ?";
    var sol = vert
      ? "P est à " + fmtD(d) + " unités à gauche de la droite \\(x = " + fmtD(m) + "\\), donc son image miroir est à " + fmtD(d) + " unités à droite, à la même hauteur : \\[ \\begin{aligned} x' &= " + fmtD(m) + " + " + fmtD(d) + " = " + fmtD(Pp[0]) + " \\\\ y' &= " + fmtD(P[1]) + " \\end{aligned} \\] Donc l'image miroir de P est <b>" + u7Coord(Pp) + "</b>."
      : "P est à " + fmtD(d) + " unités sous la droite \\(y = " + fmtD(m) + "\\), donc son image miroir est à " + fmtD(d) + " unités au-dessus, dans la même colonne : \\[ \\begin{aligned} y' &= " + fmtD(m) + " + " + fmtD(d) + " = " + fmtD(Pp[1]) + " \\\\ x' &= " + fmtD(P[0]) + " \\end{aligned} \\] Donc l'image miroir de P est <b>" + u7Coord(Pp) + "</b>.";
    var q = mcq(prompt,
      { t: u7Coord(Pp), fb: "Exact. Le point est à la même distance de l'autre côté de la droite en tirets." },
      [
        { t: u7Coord(cand[1]), fb: "C'est P lui-même; l'image miroir doit être de l'autre côté de la droite." },
        { t: u7Coord(cand[2]), fb: "La distance à la droite est bonne, mais le point est déplacé d'une unité le long de la droite." },
        { t: u7Coord(cand[3]), fb: vert ? "Cela déplace P latéralement à travers la droite, mais pas de la bonne distance." : "Cela déplace P à travers la droite, mais pas de la bonne distance." }
      ], sol, { mode: vert ? "complete-vert" : "complete-horiz", P: P.join(","), Pp: Pp.join(","), m: m });
    q.figure = grid;
    return q;
  }
  var qf = mcq("Le diagramme montre la moitié d'une forme sur une grille, avec un axe de symétrie en tirets. Le sommet P est à (-2, 1). Quel point est l'image miroir de P qui complète la forme ?",
    { t: "(2, 1)", fb: "Exact." },
    [{ t: "(-2, 1)", fb: "C'est P lui-même." }, { t: "(2, 2)", fb: "Le point est déplacé d'une unité le long de la droite." }, { t: "(1, -2)", fb: "Cela échange les coordonnées." }],
    "P est à 2 unités à gauche de l'axe des ordonnées, donc son image miroir est à 2 unités à droite, à la même hauteur : <b>(2, 1)</b>.", { mode: "complete-vert", P: "-2,1", Pp: "2,1", m: 0 });
  qf.figure = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22, lines: [{ a: [0, -6], b: [0, 6], dash: true, w: 2 }], shapes: [{ pts: [[0, 3], [-1, 2], [-2, 1], [0, -1]], fill: FIG_SHADE }], marks: [{ p: [-2, 1], label: "P", dx: -12, dy: 0 }], aria: "La moitié d'une forme sur une grille avec un axe de symétrie en tirets" });
  return qf;
}, ["Compte la distance entre P et la droite en tirets; le point miroir est à la même distance de l'autre côté.", "Le point miroir garde la coordonnée le long de la droite et inverse la distance à travers elle."]);

// 13. 10.2 L1 var: order and angle of rotation symmetry of familiar shapes.
E("u7-rotation-symmetry-var", 7, ["10.2"], 1, "var", varset([
  function () {
    var q = mcq("On tourne un carré autour de son centre. Il correspond à lui-même 4 fois en un tour complet. Quels sont son ordre et son angle de symétrie de rotation ? L'ordre est le nombre de fois qu'il correspond en un tour complet, et l'angle est 360 degrés divisés par l'ordre.",
      { t: "Ordre 4, angle 90°", fb: "Exact. 360 divisé par 4 donne 90." },
      [{ t: "Ordre 2, angle 180°", fb: "Un carré correspond plus souvent que deux fois; compte les tours qui mènent à une position correspondante." }, { t: "Ordre 4, angle 45°", fb: "L'angle est 360 divisé par l'ordre, et 360 divisé par 4 donne 90, pas 45." }, { t: "Il n'a aucune symétrie de rotation", fb: "Un carré correspond à lui-même quand on le tourne d'une partie d'un tour complet." }],
      "Divise un tour complet par l'ordre : \\[ \\begin{aligned} 360° \\div 4 &= 90° \\end{aligned} \\] Donc le carré a <b>un ordre de 4 et un angle de 90°</b>.",
      { mode: "rot-square" });
    q.figure = polySVG(4);
    return q;
  },
  function () {
    var q = mcq("Quels sont l'ordre et l'angle de symétrie de rotation d'un triangle équilatéral, tourné autour de son centre ? L'ordre est le nombre de fois qu'il correspond à lui-même en un tour complet, et l'angle est 360 degrés divisés par l'ordre.",
      { t: "Ordre 3, angle 120°", fb: "Exact. 360 divisé par 3 donne 120." },
      [{ t: "Ordre 3, angle 90°", fb: "L'angle est 360 divisé par l'ordre, et 360 divisé par 3 donne 120, pas 90." }, { t: "Ordre 6, angle 60°", fb: "Le triangle a 3 tours correspondants, pas 6; compte chaque sommet qui passe au coin suivant." }, { t: "Il n'a aucune symétrie de rotation", fb: "En tournant d'un tiers de tour complet, il correspond à lui-même." }],
      "Divise un tour complet par l'ordre : \\[ \\begin{aligned} 360° \\div 3 &= 120° \\end{aligned} \\] Donc le triangle équilatéral a <b>un ordre de 3 et un angle de 120°</b>.",
      { mode: "rot-equi" });
    q.figure = polySVG(3);
    return q;
  },
  function () {
    var q = mcq("Quels sont l'ordre et l'angle de symétrie de rotation d'un pentagone régulier, tourné autour de son centre ? Un pentagone régulier a 5 côtés égaux. L'ordre est le nombre de fois qu'il correspond à lui-même en un tour complet, et l'angle est 360 degrés divisés par l'ordre.",
      { t: "Ordre 5, angle 72°", fb: "Exact. 360 divisé par 5 donne 72." },
      [{ t: "Ordre 5, angle 60°", fb: "L'angle est 360 divisé par l'ordre, et 360 divisé par 5 donne 72, pas 60." }, { t: "Ordre 10, angle 36°", fb: "Le pentagone correspond 5 fois en un tour complet, une fois pour chaque sommet." }, { t: "Il n'a aucune symétrie de rotation", fb: "En tournant d'un cinquième de tour complet, il correspond à lui-même." }],
      "Divise un tour complet par l'ordre : \\[ \\begin{aligned} 360° \\div 5 &= 72° \\end{aligned} \\] Donc le pentagone régulier a <b>un ordre de 5 et un angle de 72°</b>.",
      { mode: "rot-pent" });
    q.figure = polySVG(5);
    return q;
  },
  function () {
    var q = mcq("Quels sont l'ordre et l'angle de symétrie de rotation d'un hexagone régulier, tourné autour de son centre ? Un hexagone régulier a 6 côtés égaux. L'ordre est le nombre de fois qu'il correspond à lui-même en un tour complet, et l'angle est 360 degrés divisés par l'ordre.",
      { t: "Ordre 6, angle 60°", fb: "Exact. 360 divisé par 6 donne 60." },
      [{ t: "Ordre 6, angle 120°", fb: "L'angle est 360 divisé par l'ordre, et 360 divisé par 6 donne 60, pas 120." }, { t: "Ordre 3, angle 120°", fb: "L'hexagone correspond 6 fois en un tour complet, une fois pour chaque sommet." }, { t: "Il n'a aucune symétrie de rotation", fb: "En tournant d'un sixième de tour complet, il correspond à lui-même." }],
      "Divise un tour complet par l'ordre : \\[ \\begin{aligned} 360° \\div 6 &= 60° \\end{aligned} \\] Donc l'hexagone régulier a <b>un ordre de 6 et un angle de 60°</b>.",
      { mode: "rot-hex" });
    q.figure = polySVG(6);
    return q;
  },
  function () {
    var q = mcq("Quels sont l'ordre et l'angle de symétrie de rotation d'un rectangle qui n'est pas un carré, tourné autour de son centre ? L'ordre est le nombre de fois qu'il correspond à lui-même en un tour complet, et l'angle est 360 degrés divisés par l'ordre.",
      { t: "Ordre 2, angle 180°", fb: "Exact. Seul un demi-tour le fait correspondre." },
      [{ t: "Ordre 4, angle 90°", fb: "Un quart de tour mettrait les grands côtés là où étaient les petits côtés, donc il ne correspond pas." }, { t: "Ordre 2, angle 90°", fb: "L'angle est 360 divisé par l'ordre, et 360 divisé par 2 donne 180, pas 90." }, { t: "Il n'a aucune symétrie de rotation", fb: "Un demi-tour le fait correspondre exactement à lui-même." }],
      "Divise un tour complet par l'ordre : \\[ \\begin{aligned} 360° \\div 2 &= 180° \\end{aligned} \\] Donc le rectangle a <b>un ordre de 2 et un angle de 180°</b>.",
      { mode: "rot-rect" });
    q.figure = u7Svg(230, 190, u7Poly([[45, 60], [185, 60], [185, 130], [45, 130]], FIG_SHADE), "Rectangle");
    return q;
  },
  function () {
    return mcq("La lettre majuscule H est dessinée avec des traits égaux. On la tourne autour de son centre. Quels sont son ordre et son angle de symétrie de rotation ? L'ordre est le nombre de fois qu'elle correspond à elle-même en un tour complet, et l'angle est 360 degrés divisés par l'ordre.",
      { t: "Ordre 2, angle 180°", fb: "Exact. Un demi-tour remet la lettre exactement comme au départ." },
      [{ t: "Ordre 4, angle 90°", fb: "Un quart de tour mettrait la lettre sur le côté, donc elle ne correspond pas." }, { t: "Ordre 2, angle 90°", fb: "L'angle est 360 divisé par l'ordre, et 360 divisé par 2 donne 180, pas 90." }, { t: "Elle n'a aucune symétrie de rotation", fb: "Un demi-tour fait correspondre la lettre exactement à elle-même." }],
      "Divise un tour complet par l'ordre : \\[ \\begin{aligned} 360° \\div 2 &= 180° \\end{aligned} \\] Donc la lettre H a <b>un ordre de 2 et un angle de 180°</b>.",
      { mode: "rot-H" });
  },
  function () {
    return mcq("On tourne la lettre majuscule N autour de son centre. Quels sont son ordre et son angle de symétrie de rotation ? L'ordre est le nombre de fois qu'elle correspond à elle-même en un tour complet, et l'angle est 360 degrés divisés par l'ordre.",
      { t: "Ordre 2, angle 180°", fb: "Exact. Un demi-tour retourne la diagonale dans le bon sens pour correspondre." },
      [{ t: "Ordre 4, angle 90°", fb: "Un quart de tour mettrait la lettre sur le côté, donc elle ne correspond pas." }, { t: "Ordre 2, angle 90°", fb: "L'angle est 360 divisé par l'ordre, et 360 divisé par 2 donne 180, pas 90." }, { t: "Elle n'a aucune symétrie de rotation", fb: "Un demi-tour fait correspondre la lettre exactement à elle-même." }],
      "Divise un tour complet par l'ordre : \\[ \\begin{aligned} 360° \\div 2 &= 180° \\end{aligned} \\] Donc la lettre N a <b>un ordre de 2 et un angle de 180°</b>.",
      { mode: "rot-N" });
  }
]), ["Pour une forme régulière, l'ordre égale le nombre de côtés; l'angle est 360 degrés divisés par l'ordre.", "Trouve d'abord combien de tours en un tour complet font correspondre la forme, puis divise 360 degrés par ce nombre."]);

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
    var dirWord = cw ? "dans le sens horaire" : "dans le sens antihoraire";
    var names = ["A", "B", "C"];
    var prompt = "Le triangle ABC a pour sommets A" + u7Coord(pts[0]) + ", B" + u7Coord(pts[1]) + " et C" + u7Coord(pts[2]) + ". Le triangle subit une rotation de 90° " + dirWord + " autour du sommet " + names[pivotIdx] + ". Quelles sont les coordonnées de l'image du sommet " + names[askIdx] + " ?";
    var rotTxt = cw ? "(" + fmtD(dx) + ", " + fmtD(dy) + ") devient (" + fmtD(dy) + ", " + fmtD(-dx) + ")" : "(" + fmtD(dx) + ", " + fmtD(dy) + ") devient (" + fmtD(-dy) + ", " + fmtD(dx) + ")";
    var sol = "Pars du pivot " + names[pivotIdx] + u7Coord(V) + ". Le déplacement du pivot au sommet " + names[askIdx] + " est " + rotTxt + " lors d'une rotation de 90° " + dirWord + " : \\[ \\begin{aligned} \\text{image} &= " + u7Coord(V) + " + (" + fmtD(img[0] - V[0]) + ", " + fmtD(img[1] - V[1]) + ") \\\\ &= " + u7Coord(img) + " \\end{aligned} \\] Donc l'image du sommet " + names[askIdx] + " est <b>" + u7Coord(img) + "</b>.";
    var grid = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22,
      shapes: [{ pts: pts, fill: FIG_SHADE }],
      marks: pts.map(function (p2, i2) { return { p: p2, label: names[i2], dx: p2[0] >= V[0] ? 11 : -11, dy: -11 }; }),
      aria: "Un triangle sur une grille" });
    var q = mcq(prompt,
      { t: u7Coord(img), fb: "Exact. Le déplacement à partir du pivot tourne de 90° " + dirWord + " et garde sa longueur." },
      [
        { t: u7Coord(wrong), fb: "Cela tourne le déplacement dans l'autre sens; vérifie la direction donnée." },
        { t: u7Coord(aboutOrigin), fb: "Cela fait une rotation autour de l'origine; cette rotation se fait autour du sommet " + names[pivotIdx] + "." },
        { t: u7Coord(P), fb: "C'est le point de départ du sommet " + names[askIdx] + "; seul le pivot reste en place." }
      ], sol, { mode: cw ? "rot-cw" : "rot-ccw", V: V.join(","), P: P.join(","), img: img.join(",") });
    q.figure = grid;
    return q;
  }
  var qf = mcq("Le triangle ABC a pour sommets A(0, 0), B(3, 0) et C(0, 2). Le triangle subit une rotation de 90° dans le sens horaire autour du sommet A. Quelles sont les coordonnées de l'image du sommet B ?",
    { t: "(0, -3)", fb: "Exact." },
    [{ t: "(0, 3)", fb: "Cela tourne le déplacement dans l'autre sens." }, { t: "(3, 0)", fb: "C'est le point de départ de B." }, { t: "(-3, 0)", fb: "C'est un demi-tour, pas un quart de tour." }],
    "Le déplacement de A à B est (3, 0); une rotation de 90° dans le sens horaire le transforme en (0, -3), donc l'image de B est <b>(0, -3)</b>.", { mode: "rot-cw", V: "0,0", P: "3,0", img: "0,-3" });
  qf.figure = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22, shapes: [{ pts: [[0, 0], [3, 0], [0, 2]], fill: FIG_SHADE }], marks: [{ p: [0, 0], label: "A", dx: -11, dy: -11 }, { p: [3, 0], label: "B", dx: 11, dy: -11 }, { p: [0, 2], label: "C", dx: -11, dy: -11 }], aria: "Un triangle sur une grille" });
  return qf;
}, ["Le sommet pivot reste fixe; chaque autre sommet tourne autour de lui.", "Trouve le déplacement du pivot au sommet nommé, tourne ce déplacement de 90 degrés, puis ajoute-le au pivot."]);

// 15. 10.3 L2 var: symmetry in tessellations and repeating patterns.
E("u7-tessellation-var", 7, ["10.3"], 1, "var", varset([
  function () {
    return mcq("Un dallage en nid d'abeilles est fait d'hexagones réguliers qui s'emboîtent sans aucun espace. Autour du centre d'un hexagone, tout le motif correspond à lui-même quand on le tourne. Quel est l'angle de symétrie de rotation à cet endroit ?",
      { t: "60°", fb: "Exact. Un hexagone régulier a un ordre de 6, et 360 divisé par 6 donne 60." },
      [{ t: "30°", fb: "C'est la moitié du bon angle; l'hexagone correspond d'abord après un sixième de tour." }, { t: "90°", fb: "Ce serait un ordre de 4; un hexagone correspond 6 fois en un tour complet." }, { t: "120°", fb: "Cela saute une position correspondante; la première correspondance vient plus tôt, après un sixième de tour." }],
      "Un hexagone régulier a un ordre de rotation de 6 : \\[ \\begin{aligned} 360° \\div 6 &= 60° \\end{aligned} \\] Donc l'angle de symétrie de rotation est <b>60°</b>.",
      { mode: "tess-honeycomb" });
  },
  function () {
    return mcq("Un plancher est carrelé avec un dallage en damier de carrés noirs et blancs. Considère un carré blanc. Quelle droite est un axe de symétrie de tout le motif ? Un axe de symétrie fait correspondre exactement les deux moitiés, couleurs comprises.",
      { t: "Une droite verticale qui passe par le centre du carré blanc", fb: "Exact. Chaque côté se reflète sur des carrés de la même couleur." },
      [{ t: "Une droite verticale le long du bord gauche du carré blanc", fb: "Plier là échange le carré blanc avec un voisin noir, donc les couleurs ne correspondent pas." }, { t: "Une droite horizontale le long du bord supérieur du carré blanc", fb: "Plier là échange le carré blanc avec un voisin noir, donc les couleurs ne correspondent pas." }, { t: "Une droite oblique qui passe par le centre du carré blanc, inclinée de 30° par rapport à l'horizontale", fb: "Un pliage oblique à cet angle ne ramène pas les carrés sur la grille." }],
      "Plier le long d'une droite qui passe par le centre du carré envoie chaque carré sur un carré de la même couleur, tandis que plier le long d'un bord échange le noir et le blanc. Donc l'axe de symétrie est <b>une droite verticale qui passe par le centre du carré blanc</b>.",
      { mode: "tess-checker" });
  },
  function () {
    return mcq("Un dallage est fait de quatre triangles rectangles identiques disposés en moulinet autour d'un point, et le moulinet se répète sur tout le plancher. Autour du centre du moulinet, quels sont l'ordre et l'angle de symétrie de rotation du motif ?",
      { t: "Ordre 4, angle 90°", fb: "Exact. Quatre tours correspondants tiennent en un tour complet, et 360 divisé par 4 donne 90." },
      [{ t: "Ordre 2, angle 180°", fb: "Le moulinet correspond avant un demi-tour; compte les quatre pales." }, { t: "Ordre 4, angle 45°", fb: "L'angle est 360 divisé par l'ordre, et 360 divisé par 4 donne 90, pas 45." }, { t: "Le motif n'a aucune symétrie de rotation", fb: "Tourner le moulinet d'un quart de tour place chaque pale là où était la suivante." }],
      "Quatre pales donnent un ordre de 4 : \\[ \\begin{aligned} 360° \\div 4 &= 90° \\end{aligned} \\] Donc le motif a <b>un ordre de 4 et un angle de 90°</b> autour du centre du moulinet.",
      { mode: "tess-pinwheel" });
  },
  function () {
    return mcq("Une banderole pour une foire est un motif qui se répète : cinq triangles identiques pointent vers le haut, côte à côte le long d'une ligne de base, comme des fanions sur une corde. Quelle droite est un axe de symétrie de toute la banderole ?",
      { t: "Une droite verticale qui passe par le triangle du milieu", fb: "Exact. Les deux triangles de chaque côté se reflètent l'un sur l'autre." },
      [{ t: "Une droite horizontale le long de la ligne de base", fb: "Plier là retournerait les triangles sous la base, là où la banderole n'a rien." }, { t: "Une droite verticale qui passe par le premier triangle", fb: "Cela laisse deux triangles d'un côté et rien à faire correspondre de l'autre côté." }, { t: "Une droite oblique qui passe par le triangle du milieu", fb: "Un pliage oblique ne ramène pas la rangée de triangles sur elle-même." }],
      "La banderole a deux triangles de chaque côté de celui du milieu, donc plier sur <b>une droite verticale qui passe par le triangle du milieu</b> fait correspondre les moitiés. Aucune autre droite donnée ne fait cela.",
      { mode: "tess-bunting" });
  },
  function () {
    return mcq("Un dallage est fait de triangles équilatéraux seulement, avec 6 triangles qui se rencontrent à chaque point. Autour d'un point où 6 triangles se rencontrent, le motif correspond d'abord à lui-même après un tour de quel angle ?",
      { t: "60°", fb: "Exact. Six positions correspondantes tiennent en un tour complet, et 360 divisé par 6 donne 60." },
      [{ t: "30°", fb: "C'est la moitié d'un pas de triangle; les triangles ne s'aligneraient pas encore avec le motif." }, { t: "90°", fb: "Ce serait un ordre de 4; ici 6 triangles se rencontrent, ce qui donne un ordre de 6." }, { t: "180°", fb: "C'est un demi-tour, mais le motif correspond déjà après un tour plus petit." }],
      "Six triangles autour du point donnent un ordre de 6 : \\[ \\begin{aligned} 360° \\div 6 &= 60° \\end{aligned} \\] Donc le motif correspond d'abord après un tour de <b>60°</b>.",
      { mode: "tess-triangles" });
  }
]), ["Cherche le plus petit tour ou pliage qui fait retomber tout le motif répété sur lui-même.", "Pour la rotation, compte combien de positions correspondantes tiennent en un tour complet, puis divise 360 degrés par ce nombre."]);

// 16. 10.4 L2 var: types of symmetry in described artwork.
E("u7-artwork-symmetry-var", 7, ["10.4"], 1, "var", varset([
  function () {
    var opts = [
      { t: "Les deux : la symétrie linéaire et la symétrie de rotation", fb: "Exact. Il se plie le long de plusieurs axes et correspond à lui-même lors de tours partiels." },
      { t: "La symétrie linéaire seulement", fb: "Il correspond aussi à lui-même quand on le tourne d'une partie d'un tour complet autour de son centre." },
      { t: "La symétrie de rotation seulement", fb: "Il se plie aussi exactement sur lui-même le long d'axes qui passent par son centre." },
      { t: "Ni la symétrie linéaire ni la symétrie de rotation", fb: "Un flocon à six pointes a les deux types de symétrie." }
    ];
    return mcq("Une photographie montre un flocon de neige avec 6 pointes identiques disposées régulièrement autour de son centre. Quels types de symétrie le flocon montre-t-il ?",
      opts[0], [opts[1], opts[2], opts[3]],
      "Les 6 pointes régulières donnent des axes de pliage qui passent par le centre et des tours correspondants d'un sixième de tour complet. Donc le flocon montre <b>la symétrie linéaire et la symétrie de rotation</b>.",
      { mode: "art-snowflake" });
  },
  function () {
    var opts = [
      { t: "La symétrie de rotation seulement", fb: "Exact. Les pales tournoyantes correspondent lors de quarts de tour, mais aucun pliage ne fait correspondre les moitiés." },
      { t: "Les deux : la symétrie linéaire et la symétrie de rotation", fb: "Les pales courbent dans un seul sens, donc chaque axe de pliage échoue à faire correspondre les moitiés." },
      { t: "La symétrie linéaire seulement", fb: "Il n'y a aucun axe de pliage, mais un quart de tour autour du centre le fait correspondre." },
      { t: "Ni la symétrie linéaire ni la symétrie de rotation", fb: "Un quart de tour autour du centre le fait bien correspondre à lui-même." }
    ];
    return mcq("Un bloc de courtepointe montre un moulinet : quatre pales courbées tournent autour du centre, chaque pale courbée dans le même sens. Quels types de symétrie le bloc montre-t-il ?",
      opts[0], [opts[1], opts[2], opts[3]],
      "Tourner d'un quart de tour place chaque pale là où était la suivante, mais la courbe dans un seul sens empêche tout pliage. Donc le bloc montre <b>la symétrie de rotation seulement</b>.",
      { mode: "art-pinwheel" });
  },
  function () {
    var opts = [
      { t: "La symétrie linéaire seulement", fb: "Exact. Les ailes se reflètent de part et d'autre d'un axe vertical, et aucun tour partiel ne le fait correspondre." },
      { t: "Les deux : la symétrie linéaire et la symétrie de rotation", fb: "Le tourner d'un tour partiel quelconque déplace la tête et le motif des ailes." },
      { t: "La symétrie de rotation seulement", fb: "Il a bien un axe de pliage : l'axe vertical en son milieu." },
      { t: "Ni la symétrie linéaire ni la symétrie de rotation", fb: "Les deux ailes sont des images miroirs, donc il a une symétrie linéaire." }
    ];
    return mcq("Un tableau montre un papillon vu de dessus, avec les ailes gauche et droite comme images miroirs et la tête en haut. Quels types de symétrie le tableau montre-t-il ?",
      opts[0], [opts[1], opts[2], opts[3]],
      "Les ailes se plient l'une sur l'autre le long de l'axe vertical du milieu, et aucun tour plus petit qu'un tour complet ne fonctionne. Donc le tableau montre <b>la symétrie linéaire seulement</b>.",
      { mode: "art-butterfly" });
  },
  function () {
    var opts = [
      { t: "Ni la symétrie linéaire ni la symétrie de rotation", fb: "Exact. Le triangle seul empêche tout pliage et tout tour partiel." },
      { t: "Les deux : la symétrie linéaire et la symétrie de rotation", fb: "Un triangle scalène dans un coin brise les deux types de symétrie." },
      { t: "La symétrie linéaire seulement", fb: "Il n'y a aucun axe de pliage qui fasse correspondre le badge; vérifie le triangle dans le coin." },
      { t: "La symétrie de rotation seulement", fb: "Il n'y a aucun tour partiel qui fasse correspondre le badge; vérifie le triangle dans le coin." }
    ];
    return mcq("Un badge rond est uni, sauf un petit triangle scalène imprimé dans la zone en haut à droite. Un triangle scalène a tous ses côtés différents. Quels types de symétrie le badge montre-t-il ?",
      opts[0], [opts[1], opts[2], opts[3]],
      "Chaque pliage ou tour partiel déplacerait le triangle seul à un endroit où le badge est uni. Donc le badge ne montre <b>ni symétrie linéaire ni symétrie de rotation</b>.",
      { mode: "art-badge" });
  },
  function () {
    var opts = [
      { t: "Les deux : la symétrie linéaire et la symétrie de rotation", fb: "Exact. La lettre H se plie de deux façons et correspond après un demi-tour." },
      { t: "La symétrie linéaire seulement", fb: "Elle correspond aussi à elle-même après un demi-tour autour de son centre." },
      { t: "La symétrie de rotation seulement", fb: "Elle se plie aussi exactement sur elle-même, en travers et de haut en bas." },
      { t: "Ni la symétrie linéaire ni la symétrie de rotation", fb: "La lettre H a les deux types de symétrie." }
    ];
    return mcq("Un logo circulaire a la lettre majuscule H exactement au centre, dessinée avec des traits égaux. Quels types de symétrie le logo montre-t-il ?",
      opts[0], [opts[1], opts[2], opts[3]],
      "La lettre H se plie le long d'un axe vertical et d'un axe horizontal, et un demi-tour la remet exactement en place. Donc le logo montre <b>la symétrie linéaire et la symétrie de rotation</b>.",
      { mode: "art-logoH" });
  }
]), ["Teste l'oeuvre des deux façons : essaie d'abord les pliages, puis les tours partiels autour du centre.", "La symétrie linéaire exige un pliage qui correspond exactement; la symétrie de rotation exige un tour partiel qui correspond exactement."]);

// 17. 10.11 L2 var: designs that demonstrate both line and rotation symmetry.
E("u7-both-symmetry-var", 7, ["10.11"], 1, "var", varset([
  function () {
    return mcq("Quel motif présente à la fois la symétrie linéaire et la symétrie de rotation ?",
      { t: "Un badge rond avec une étoile à cinq pointes exactement au centre", fb: "Exact. L'étoile se plie le long de 5 axes et correspond à elle-même lors de tours autour du centre." },
      [
        { t: "Une tuile carrée avec un moulinet de quatre pales courbées", fb: "Le moulinet a une symétrie de rotation, mais ses pales courbées ne lui donnent aucun axe de pliage." },
        { t: "Un drapeau avec une seule flèche qui pointe vers la droite au milieu", fb: "La flèche a un axe de pliage horizontal, mais aucun tour partiel ne la fait correspondre." },
        { t: "Une affiche avec la lettre majuscule F au milieu", fb: "La lettre F n'a ni axe de pliage ni tour partiel correspondant." }
      ],
      "Seule l'étoile centrée réussit les deux tests : elle se plie sur elle-même et tourne sur elle-même. Donc le motif qui a les deux est <b>un badge rond avec une étoile à cinq pointes exactement au centre</b>.",
      { mode: "both-star" });
  },
  function () {
    return mcq("Quatre tuiles montrent chacune une lettre majuscule au centre. Quelle tuile présente à la fois la symétrie linéaire et la symétrie de rotation ?",
      { t: "La tuile avec la lettre H", fb: "Exact. H se plie de deux façons et correspond après un demi-tour." },
      [
        { t: "La tuile avec la lettre S", fb: "S correspond après un demi-tour, mais elle n'a aucun axe de pliage." },
        { t: "La tuile avec la lettre A", fb: "A a un axe de pliage vertical, mais aucun tour partiel ne la fait correspondre." },
        { t: "La tuile avec la lettre L", fb: "L n'a ni axe de pliage ni tour partiel correspondant." }
      ],
      "H est la seule lettre donnée qui se plie sur elle-même et tourne sur elle-même. Donc la tuile qui a les deux est <b>la tuile avec la lettre H</b>.",
      { mode: "both-H" });
  },
  function () {
    return mcq("Quelle oeuvre présente à la fois la symétrie linéaire et la symétrie de rotation ?",
      { t: "Un flocon de neige en papier avec 6 pointes correspondantes, découpé dans du papier plié", fb: "Exact. Il se plie le long d'axes qui passent par son centre et correspond lors de sixièmes de tour." },
      [
        { t: "Une spirale peinte en rouge sur une grande assiette ronde en céramique", fb: "Une spirale s'enroule dans un seul sens, donc elle n'a ni axe de pliage ni tour partiel correspondant." },
        { t: "Un cerf-volant avec une longue queue et des rubans, dessiné de côté dans le ciel", fb: "La forme du cerf-volant a un axe de pliage le long de sa ligne centrale, mais aucun tour partiel ne la fait correspondre." },
        { t: "Un bloc de courtepointe en moulinet avec quatre pales courbées, cousu dans un tissu à motifs", fb: "Le moulinet a une symétrie de rotation seulement; ses pales courbées ne lui donnent aucun axe de pliage." }
      ],
      "Seul le flocon réussit les deux tests : des pliages qui passent par le centre et des tours partiels correspondants. Donc l'oeuvre qui a les deux est <b>un flocon de neige en papier avec 6 pointes correspondantes, découpé dans du papier plié</b>.",
      { mode: "both-snowflake" });
  },
  function () {
    return mcq("Un motif de tuile se plie exactement sur lui-même le long de 2 axes, et il correspond à lui-même deux fois en un tour complet autour de son centre. Quel énoncé nomme correctement ses deux caractéristiques de symétrie ?",
      { t: "Il a une symétrie linéaire, et une symétrie de rotation d'ordre 2 avec un angle de 180°", fb: "Exact. Deux correspondances en un tour complet donnent un ordre de 2, et 360 divisé par 2 donne 180." },
      [
        { t: "Il a une symétrie linéaire, et une symétrie de rotation d'ordre 4 avec un angle de 90°", fb: "Il faudrait quatre correspondances pour un ordre de 4; ce motif correspond deux fois." },
        { t: "Il a une symétrie linéaire seulement, sans aucune symétrie de rotation", fb: "Correspondre deux fois en un tour complet est une symétrie de rotation, donc il a aussi celle-là." },
        { t: "Il a une symétrie de rotation d'ordre 2 avec un angle de 180° seulement, et rien de plus", fb: "Se plier sur lui-même le long de 2 axes est une symétrie linéaire, donc il a aussi celle-là." }
      ],
      "Le pliage donne la symétrie linéaire, et le nombre de tours donne l'ordre : \\[ \\begin{aligned} 360° \\div 2 &= 180° \\end{aligned} \\] Donc l'énoncé est <b>il a une symétrie linéaire, et une symétrie de rotation d'ordre 2 avec un angle de 180°</b>.",
      { mode: "both-features" });
  }
]), ["Un motif doit réussir les deux tests : un pliage qui correspond et un tour partiel qui correspond.", "Vérifie chaque choix d'abord pour un axe de pliage, puis pour un tour correspondant autour du centre."]);

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
      aria: "Deux triangles A et B sur une grille" });
    var reflT = "Ils sont liés par une réflexion (l'un est l'image miroir de l'autre).";
    var rotT = "Ils sont liés par une rotation (l'un est une copie tournée de l'autre).";
    var neiT = "Ils ne sont liés ni par une réflexion ni par une rotation.";
    var enlT = "La forme B est un agrandissement de la forme A.";
    var sol, q;
    var prompt = "La forme A et la forme B sont montrées sur la grille. Quel est le lien entre les deux formes ?";
    if (mode === "reflection") {
      sol = "La forme B a les mêmes longueurs de côtés que la forme A, mais elle est retournée : chaque sommet de B est l'image miroir d'un sommet de A par rapport à l'axe des ordonnées. Donc <b>ils sont liés par une réflexion (l'un est l'image miroir de l'autre)</b>.";
      q = mcq(prompt, { t: reflT, fb: "Exact. B est l'image miroir de A par rapport à l'axe des ordonnées." },
        [{ t: rotT, fb: "Une rotation garde l'orientation d'une forme; B est retournée par rapport à A." }, { t: neiT, fb: "Ils sont liés : vérifie ce qu'un miroir par rapport à l'axe des ordonnées fait à A." }, { t: enlT, fb: "Les longueurs de côtés sont les mêmes, donc B n'est pas plus grande que A." }], sol, { mode: "related-refl", A: A.join(";") });
    } else if (mode === "rotation") {
      sol = "La forme B a les mêmes longueurs de côtés et la même orientation que la forme A, tournée d'un demi-tour autour de l'origine : chaque sommet " + "\\((x, y)\\)" + " de A aboutit à " + "\\((-x, -y)\\)" + " dans B. Donc <b>ils sont liés par une rotation (l'un est une copie tournée de l'autre)</b>.";
      q = mcq(prompt, { t: rotT, fb: "Exact. B est A tournée d'un demi-tour autour de l'origine." },
        [{ t: reflT, fb: "Une réflexion retournerait la forme; B garde la même orientation que A." }, { t: neiT, fb: "Ils sont liés : vérifie ce qu'un demi-tour autour de l'origine fait à A." }, { t: enlT, fb: "Les longueurs de côtés sont les mêmes, donc B n'est pas plus grande que A." }], sol, { mode: "related-rot", A: A.join(";") });
    } else {
      sol = "La forme B n'a pas les mêmes longueurs de côtés que la forme A, donc elle ne peut pas être une image miroir ni une copie tournée, puisque les réflexions et les rotations gardent les longueurs de côtés. Donc <b>ils ne sont liés ni par une réflexion ni par une rotation</b>.";
      q = mcq(prompt, { t: neiT, fb: "Exact. Une longueur de côté diffère, et les réflexions et les rotations ne changent jamais les longueurs de côtés." },
        [{ t: reflT, fb: "Une image miroir garderait chaque longueur de côté; compare les côtés ici." }, { t: rotT, fb: "Une copie tournée garderait chaque longueur de côté; compare les côtés ici." }, { t: enlT, fb: "Un agrandissement multiplie chaque côté par un même facteur; ici, seule une partie de la forme a changé." }], sol, { mode: "related-neither", A: A.join(";") });
    }
    q.figure = grid;
    return q;
  }
  var qf = mcq("La forme A et la forme B sont montrées sur la grille. Quel est le lien entre les deux formes ?",
    { t: "Ils sont liés par une réflexion (l'un est l'image miroir de l'autre).", fb: "Exact." },
    [{ t: "Ils sont liés par une rotation (l'un est une copie tournée de l'autre).", fb: "B est retournée par rapport à A." }, { t: "Ils ne sont liés ni par une réflexion ni par une rotation.", fb: "Vérifie un miroir par rapport à l'axe des ordonnées." }, { t: "La forme B est un agrandissement de la forme A.", fb: "Les longueurs de côtés sont les mêmes." }],
    "Chaque sommet de B est l'image miroir d'un sommet de A par rapport à l'axe des ordonnées, donc <b>ils sont liés par une réflexion</b>.", { mode: "related-refl", A: "-4,-2;-1,-1;-3,2" });
  qf.figure = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22, shapes: [{ pts: [[-4, -2], [-1, -1], [-3, 2]], fill: FIG_SHADE }, { pts: [[4, -2], [1, -1], [3, 2]], fill: "#ffffff" }], labels: [{ p: [-2.7, -0.3], str: "A", size: 14, bold: true }, { p: [2.7, -0.3], str: "B", size: 14, bold: true }], aria: "Deux triangles A et B sur une grille" });
  return qf;
}, ["Les réflexions et les rotations ne changent jamais les longueurs de côtés, donc compare d'abord les côtés.", "Si les côtés correspondent, décide si la deuxième forme est retournée (réflexion) ou seulement tournée (rotation)."]);

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
    labels: [{ p: cenA, str: "Forme", size: 12, bold: true }, { p: cenB, str: "Image", size: 12, bold: true }],
    aria: "Une forme et son image sur une grille" });
  var yT = "La forme et son image ont une symétrie linéaire par rapport à l'axe des ordonnées.";
  var xT = "La forme et son image ont une symétrie linéaire par rapport à l'axe des abscisses.";
  var rT = "La forme et son image ont une symétrie de rotation d'ordre 2 autour de l'origine.";
  var nT = "La forme et son image n'ont ni symétrie linéaire ni symétrie de rotation.";
  var corrT = mode === "reflY" ? yT : (mode === "reflX" ? xT : rT);
  var all = [yT, xT, rT, nT];
  var rest = all.filter(function (t) { return t !== corrT; }).map(function (t) {
    return { t: t, fb: t === nT ? "L'ensemble a bien une symétrie; imagine le plier ou le tourner comme un tout." : "Cela nomme le mauvais axe miroir ou le mauvais centre pour cet ensemble; vérifie où se trouve l'image." };
  });
  var expl = mode === "reflY" ? "L'image est l'image miroir de la forme par rapport à l'axe des ordonnées, donc l'ensemble se plie exactement sur lui-même le long de l'axe des ordonnées."
    : mode === "reflX" ? "L'image est l'image miroir de la forme par rapport à l'axe des abscisses, donc l'ensemble se plie exactement sur lui-même le long de l'axe des abscisses."
    : "L'image est la forme tournée d'un demi-tour autour de l'origine, donc l'ensemble correspond à lui-même après un demi-tour autour de l'origine, ce qui est une symétrie de rotation d'ordre 2.";
  var q = mcq("Une forme et son image après une transformation sont montrées sur la grille. Quel énoncé décrit la symétrie de l'ensemble (la forme et son image ensemble) ?",
    { t: corrT, fb: "Exact. " + expl }, rest,
    expl + " Donc l'énoncé est : <b>" + corrT + "</b>",
    { mode: "transf-" + mode, A: A.join(";") });
  q.figure = grid;
  return q;
}, ["Traite la forme et son image comme un seul ensemble, puis teste les pliages et les tours sur tout l'ensemble.", "Regarde où se trouve l'image par rapport à la forme : reflétée de côté, reflétée de haut en bas, ou tournée d'un demi-tour."]);

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
    var symT = mode === "reflY" ? "une symétrie linéaire par rapport à l'axe des ordonnées" : mode === "reflX" ? "une symétrie linéaire par rapport à l'axe des abscisses" : "une symétrie de rotation d'ordre 2 autour de l'origine";
    var symWrong = mode === "rot180" ? "une symétrie linéaire par rapport à l'axe des ordonnées" : "une symétrie de rotation d'ordre 2 autour de l'origine";
    var corrT = "B' est à " + u7Coord(Bp) + ", et l'ensemble a " + symT + ".";
    var d1 = "B' est à " + u7Coord(BpAlt) + ", et l'ensemble a " + symT + ".";
    var d2 = "B' est à " + u7Coord(Bp) + ", et l'ensemble a " + symWrong + ".";
    var d3 = "B' est à " + u7Coord(BpAlt) + ", et l'ensemble a " + symWrong + ".";
    if (new Set([corrT, d1, d2, d3]).size < 4) continue;
    var transWord = mode === "reflY" ? "reflété par rapport à l'axe des ordonnées" : mode === "reflX" ? "reflété par rapport à l'axe des abscisses" : "tourné de 180° autour de l'origine";
    var ruleTxt = mode === "reflY" ? "\\((x, y) \\to (-x, y)\\)" : mode === "reflX" ? "\\((x, y) \\to (x, -y)\\)" : "\\((x, y) \\to (-x, -y)\\)";
    var prompt = "Le triangle ABC a pour sommets A" + u7Coord(A) + ", B" + u7Coord(B) + " et C" + u7Coord(C) + ". Il est " + transWord + ". L'image de A est A' à " + u7Coord(Ap) + ", comme montré. Quel énoncé complète correctement la transformation et décrit la symétrie de l'ensemble ?";
    var sol = "La règle est " + ruleTxt + ". En l'appliquant à B" + u7Coord(B) + " : \\[ \\begin{aligned} B &\\to " + u7Coord(Bp) + " \\end{aligned} \\] La forme et son image ensemble se plient ou tournent sur elles-mêmes comme indiqué, donc le bon énoncé est : <b>" + corrT + "</b>";
    var grid = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22,
      shapes: [{ pts: pts, fill: FIG_SHADE }],
      marks: pts.map(function (p, i) { return { p: p, label: ["A", "B", "C"][i], dx: 11, dy: -11 }; }).concat([{ p: Ap, label: "A'", dx: -13, dy: -11 }]),
      aria: "Un triangle et un sommet image sur une grille" });
    var q = mcq(prompt,
      { t: corrT, fb: "Exact. Le sommet suit la règle, et la symétrie correspond à la transformation." },
      [
        { t: d1, fb: "La partie symétrie est bonne, mais ce point utilise la mauvaise règle pour B." },
        { t: d2, fb: "Le point pour B est bon, mais l'ensemble n'a pas cette symétrie." },
        { t: d3, fb: "Les deux parties sont fausses : le point utilise la mauvaise règle, et la symétrie ne correspond pas." }
      ], sol, { mode: "complete-" + mode, A: A.join(","), B: B.join(","), Bp: Bp.join(",") });
    q.figure = grid;
    return q;
  }
  var qf = mcq("Le triangle ABC a pour sommets A(1, 1), B(4, 2) et C(2, 4). Il est reflété par rapport à l'axe des ordonnées. L'image de A est A' à (-1, 1), comme montré. Quel énoncé complète correctement la transformation et décrit la symétrie de l'ensemble ?",
    { t: "B' est à (-4, 2), et l'ensemble a une symétrie linéaire par rapport à l'axe des ordonnées.", fb: "Exact." },
    [{ t: "B' est à (4, -2), et l'ensemble a une symétrie linéaire par rapport à l'axe des ordonnées.", fb: "Ce point utilise la mauvaise règle pour B." }, { t: "B' est à (-4, 2), et l'ensemble a une symétrie de rotation d'ordre 2 autour de l'origine.", fb: "Le point est bon, mais la symétrie est fausse." }, { t: "B' est à (4, -2), et l'ensemble a une symétrie de rotation d'ordre 2 autour de l'origine.", fb: "Les deux parties sont fausses." }],
    "La règle est \\((x, y) \\to (-x, y)\\), donc B aboutit à (-4, 2), et la paire se plie le long de l'axe des ordonnées.", { mode: "complete-reflY", A: "1,1", B: "4,2", Bp: "-4,2" });
  qf.figure = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22, shapes: [{ pts: [[1, 1], [4, 2], [2, 4]], fill: FIG_SHADE }], marks: [{ p: [1, 1], label: "A", dx: 11, dy: -11 }, { p: [4, 2], label: "B", dx: 11, dy: -11 }, { p: [2, 4], label: "C", dx: 11, dy: -11 }, { p: [-1, 1], label: "A'", dx: -13, dy: -11 }], aria: "Un triangle et un sommet image sur une grille" });
  return qf;
}, ["Applique au sommet nommé la même règle que montre le sommet image donné.", "Trouve d'abord où B aboutit avec la règle, puis nomme la symétrie de la forme et de l'image ensemble."]);

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
    var hWord = dx > 0 ? "D" + fmtD(dx) : "G" + fmtD(-dx);
    var vWord = dy > 0 ? "H" + fmtD(dy) : "B" + fmtD(-dy);
    var hTxt = dx > 0 ? "vers la droite " + fmtD(dx) : "vers la gauche " + fmtD(-dx);
    var vTxt = dy > 0 ? "vers le haut " + fmtD(dy) : "vers le bas " + fmtD(-dy);
    var names = ["A", "B", "C"];
    var prompt = "Une forme a pour sommets A" + u7Coord(pts[0]) + ", B" + u7Coord(pts[1]) + " et C" + u7Coord(pts[2]) + ". Elle est translatée selon la règle " + hWord + ", " + vWord + ", ce qui veut dire glisser " + hTxt + " et " + vTxt + ". Quelles sont les coordonnées de l'image du sommet " + names[ask] + " ?";
    var sol = "Applique le glissement au sommet " + names[ask] + u7Coord(P) + " : \\[ \\begin{aligned} x' &= " + fmtD(P[0]) + (dx >= 0 ? " + " + fmtD(dx) : " - " + fmtD(-dx)) + " = " + fmtD(img[0]) + " \\\\ y' &= " + fmtD(P[1]) + (dy >= 0 ? " + " + fmtD(dy) : " - " + fmtD(-dy)) + " = " + fmtD(img[1]) + " \\end{aligned} \\] Donc l'image du sommet " + names[ask] + " est <b>" + u7Coord(img) + "</b>.";
    var q = mcq(prompt,
      { t: u7Coord(img), fb: "Exact. Le glissement en x et le glissement en y sont tous les deux appliqués au sommet." },
      [
        { t: u7Coord(cand[1]), fb: "Le glissement latéral est allé dans le mauvais sens; vérifie si la règle dit gauche ou droite." },
        { t: u7Coord(cand[2]), fb: "Le glissement vertical est allé dans le mauvais sens; vérifie si la règle dit haut ou bas." },
        { t: u7Coord(cand[3]), fb: "Cela échange les deux glissements; le premier nombre de la règle est le glissement latéral." }
      ], sol, { mode: "translation", dx: dx, dy: dy, P: P.join(","), img: img.join(",") });
    q.figure = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22,
      shapes: [{ pts: pts, fill: FIG_SHADE }],
      marks: pts.map(function (p2, i2) { return { p: p2, label: names[i2], dx: 11, dy: -11 }; }),
      aria: "Un triangle sur une grille" });
    return q;
  }
  var q = mcq("Une forme a pour sommets A(0, 0), B(3, 1) et C(1, 4). Elle est translatée selon la règle D2, H3, ce qui veut dire glisser de 2 vers la droite et de 3 vers le haut. Quelles sont les coordonnées de l'image du sommet B ?",
    { t: "(5, 4)", fb: "Exact." },
    [{ t: "(1, 4)", fb: "Le glissement latéral est allé dans le mauvais sens." }, { t: "(5, -2)", fb: "Le glissement vertical est allé dans le mauvais sens." }, { t: "(6, 3)", fb: "Cela échange les deux glissements." }],
    "En ajoutant les glissements à B(3, 1), on obtient (5, 4), donc l'image de B est <b>(5, 4)</b>.", { mode: "translation", dx: 2, dy: 3, P: "3,1", img: "5,4" });
  q.figure = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22,
    shapes: [{ pts: [[0, 0], [3, 1], [1, 4]], fill: FIG_SHADE }],
    marks: [{ p: [0, 0], label: "A", dx: 11, dy: -11 }, { p: [3, 1], label: "B", dx: 11, dy: -11 }, { p: [1, 4], label: "C", dx: 11, dy: -11 }],
    aria: "Un triangle sur une grille" });
  return q;
}, ["Dans la règle, la lettre indique la direction et le nombre indique la distance, d'abord latéralement, puis vers le haut ou le bas.", "Ajoute le glissement latéral à la coordonnée x et le glissement vertical à la coordonnée y (soustrais pour la gauche ou le bas)."]);
/*
TRANSLATOR NOTES
- Judgement calls (glossary silent): major arc = arc majeur, minor arc = arc mineur; reflex angle = angle réflexe, and \text{reflex } rendered as \text{réflexe }; subtend / stand on an arc rendered as intercepter un arc; bisect a chord rendered as couper la corde en deux parties égales, midpoint = milieu; supplement / supplementary rendered as angle supplémentaire / supplémentaires; diagram = diagramme; right-angled triangle = triangle rectangle en [point]; aria-label "Circle diagram" translated to "Diagramme du cercle" (accessible label, not a code comment).
- FMT-GEOM lines left as fmt( (each carries an FMT-GEOM marker comment on the line): u8Txt x and y attributes; u8Fig seg helper x1, y1, x2, y2; u8Fig rightMark polyline points; u8Fig main circle cx, cy, r; u8Fig angle arc path d; u8Fig point dots cx, cy. All other display fmt( became fmtD(. No fmtF( or .toFixed occurs in this chunk.
- Literal formatted numbers in static prose, for later guide reconciliation: NONE with a decimal comma, thousands grouping, %, or $ occur in this chunk. The only literal numbers in student prose are whole degree values inside KaTeX (90, 45, 180, 360) and the hint integers 90 and 180 in entry u8-semicircle-angle, all unchanged. Decimal literals 3.5, 1.6 and 2.6 occur only inside SVG attribute strings in the figure helpers (geometry, not display prose) and were left unchanged.
- Unsure: angle réflexe versus angle rentrant, and intercepter for subtend, both to confirm when the immersion guide extracts land.
*/

/* ----- bank-u8.js ----- */
// Math 9 (French) Unit 8 Circle Geometry question bank
// Cut verbatim from the standalone bank source
// (math-9-review-fr/bank-src.js, lines 4899 to 5250).
// CRMARKS: u8-tangent-length=3
// CRMARKS: u8-chord-length=3
// CRMARKS: u8-inscribed-reflex=3
// CRMARKS: u8-semicircle-angle=2
// CRMARKS: u8-same-arc-angles=2
// CRMARKS: u8-chord-two-step=3
// CRMARKS: u8-tangent-central-inscribed=2
// Unit 8: Circle Geometry (Math 9, NL). Entries only; helpers prefixed u8.
function u8P(deg) { var a = deg * Math.PI / 180; return [Math.cos(a), Math.sin(a)]; }
function u8Rot(p, deg) { var a = deg * Math.PI / 180, c = Math.cos(a), s = Math.sin(a); return [p[0] * c - p[1] * s, p[0] * s + p[1] * c]; }
function u8Dir(from, to) { return Math.atan2(to[1] - from[1], to[0] - from[0]) * 180 / Math.PI; }
function u8Txt(x, y, str, size) {
  return '<text x="' + fmt(x, 1) + '" y="' + fmt(y, 1) + '" font-size="' + (size || 13) + '" fill="' + FIG_INK + '" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="middle" dominant-baseline="central">' + str + '</text>'; /* FMT-GEOM */
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
    return '<line x1="' + fmt(p[0], 1) + '" y1="' + fmt(p[1], 1) + '" x2="' + fmt(q[0], 1) + '" y2="' + fmt(q[1], 1) + '" stroke="' + FIG_INK + '" stroke-width="' + (w || 2) + '"' + (dash ? ' stroke-dasharray="5 4"' : '') + '/>'; /* FMT-GEOM */
  }
  function scrDir(deg) { var a = deg * Math.PI / 180; return [Math.cos(a), -Math.sin(a)]; }
  function rightMark(vName, a1, a2) {
    var V = S(pts[vName]), u = scrDir(a1), w = scrDir(a2), sz = 11;
    var p1 = [V[0] + sz * u[0], V[1] + sz * u[1]], p2 = [V[0] + sz * (u[0] + w[0]), V[1] + sz * (u[1] + w[1])], p3 = [V[0] + sz * w[0], V[1] + sz * w[1]];
    return '<polyline points="' + fmt(p1[0], 1) + ',' + fmt(p1[1], 1) + ' ' + fmt(p2[0], 1) + ',' + fmt(p2[1], 1) + ' ' + fmt(p3[0], 1) + ',' + fmt(p3[1], 1) + '" fill="none" stroke="' + FIG_INK + '" stroke-width="1.6"/>'; /* FMT-GEOM */
  }
  var out = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Diagramme du cercle">';
  var Oc = S([0, 0]);
  out += '<circle cx="' + fmt(Oc[0], 1) + '" cy="' + fmt(Oc[1], 1) + '" r="' + fmt(sc, 1) + '" fill="none" stroke="' + FIG_INK + '" stroke-width="2"/>'; /* FMT-GEOM */
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
    out += '<path d="M ' + fmt(p1[0], 1) + ' ' + fmt(p1[1], 1) + ' A ' + fmt(r, 1) + ' ' + fmt(r, 1) + ' 0 ' + (d > 180 ? 1 : 0) + ' 0 ' + fmt(p2[0], 1) + ' ' + fmt(p2[1], 1) + '" fill="none" stroke="' + FIG_ACC + '" stroke-width="2"/>'; /* FMT-GEOM */
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
    out += '<circle cx="' + fmt(P[0], 1) + '" cy="' + fmt(P[1], 1) + '" r="2.6" fill="' + FIG_INK + '"/>'; /* FMT-GEOM */
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
E("u8-tangent-right-angle", 8, ["9.4"], 1, "gen", function () {
  var tAng = pick([160, 175, 190, 205, 220, 235, 250, 265, 280, 295, 310, 325, 340, 355, 10, 25]);
  var r = pick([4, 5, 6, 7, 8, 9, 10, 12]);
  var T = u8P(tAng);
  var fig = u8Fig({ pts: { T: T }, segs: [["O", "T"]], tangentAt: "T", sideLabs: [{ a: "O", b: "T", text: fmtD(r) + " cm", off: 15 }] });
  var prompt = "Le diagramme montre un cercle de centre O. La droite qui passe par T est une tangente : une tangente est une droite qui touche le cercle en un seul point. OT est un rayon de longueur \\(" + fmtD(r) + "\\) cm. Quel énoncé est vrai ?";
  var solution = "Le rayon qui va au point de tangence est perpendiculaire à la tangente. OT rencontre la tangente en T, donc l'angle entre les deux est <b>\\(90^{\\circ}\\)</b>.";
  var q = mcq(prompt,
    { t: "L'angle entre OT et la tangente en T est \\(90^{\\circ}\\).", fb: "Exact. Un rayon qui va au point de tangence est perpendiculaire à la tangente." },
    [
      { t: "L'angle entre OT et la tangente en T est \\(45^{\\circ}\\).", fb: "Le rayon rencontre une tangente à angle droit, pas à \\(45^{\\circ}\\)." },
      { t: "OT est parallèle à la tangente.", fb: "OT rencontre la tangente en T, donc les deux droites ne sont pas parallèles." },
      { t: "La tangente touche le cercle en deux points.", fb: "Une tangente touche un cercle en un seul point, ici le point T." }
    ],
    solution, { mode: "tangent-right-angle", tAng: tAng, r: r });
  q.figure = fig;
  return q;
}, ["Utilise la propriété de la tangente : quel angle un rayon forme-t-il avec une tangente au point où elle touche le cercle ?", "Le rayon OT se termine en T, le point exact où la tangente touche le cercle."]);

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
  var lab = function (n) { return n === mode ? "?" : fmtD(vals[n]) + " cm"; };
  var fig = u8Fig({
    pts: { T: T, P: P }, segs: [["O", "T"], ["O", "P"]], tangentSeg: { at: "T", to: "P", beyond: 1.1, back: 0.3 },
    rightMarks: [{ v: "T", a1: u8Dir(T, [0, 0]), a2: u8Dir(T, P) }],
    sideLabs: [{ a: "O", b: "T", text: lab("OT") }, { a: "T", b: "P", text: lab("PT") }, { a: "O", b: "P", text: lab("OP") }]
  });
  var given, ask, sol;
  if (mode === "PT") {
    given = "\\(OT = " + fmtD(OT) + "\\) cm et \\(OP = " + fmtD(OP) + "\\) cm"; ask = "PT";
    sol = "Le triangle OTP est rectangle en T, car le rayon qui va au point de tangence est perpendiculaire à la tangente. Utilise le théorème de Pythagore : \\[ \\begin{aligned} PT^{2} &= OP^{2} - OT^{2} \\\\ &= " + fmtD(OP) + "^{2} - " + fmtD(OT) + "^{2} = " + fmtD(OP * OP - OT * OT) + " \\\\ PT &= \\sqrt{" + fmtD(OP * OP - OT * OT) + "} = " + fmtD(PT) + " \\end{aligned} \\] Donc la longueur de la tangente est <b>" + fmtD(PT) + " cm</b>.";
  } else if (mode === "OP") {
    given = "\\(OT = " + fmtD(OT) + "\\) cm et \\(PT = " + fmtD(PT) + "\\) cm"; ask = "OP";
    sol = "Le triangle OTP est rectangle en T, car le rayon qui va au point de tangence est perpendiculaire à la tangente. OP est l'hypoténuse : \\[ \\begin{aligned} OP^{2} &= OT^{2} + PT^{2} \\\\ &= " + fmtD(OT) + "^{2} + " + fmtD(PT) + "^{2} = " + fmtD(OT * OT + PT * PT) + " \\\\ OP &= \\sqrt{" + fmtD(OT * OT + PT * PT) + "} = " + fmtD(OP) + " \\end{aligned} \\] Donc la distance est <b>" + fmtD(OP) + " cm</b>.";
  } else {
    given = "\\(OP = " + fmtD(OP) + "\\) cm et \\(PT = " + fmtD(PT) + "\\) cm"; ask = "OT, le rayon";
    sol = "Le triangle OTP est rectangle en T, car le rayon qui va au point de tangence est perpendiculaire à la tangente. Utilise le théorème de Pythagore : \\[ \\begin{aligned} OT^{2} &= OP^{2} - PT^{2} \\\\ &= " + fmtD(OP) + "^{2} - " + fmtD(PT) + "^{2} = " + fmtD(OP * OP - PT * PT) + " \\\\ OT &= \\sqrt{" + fmtD(OP * OP - PT * PT) + "} = " + fmtD(OT) + " \\end{aligned} \\] Donc le rayon est <b>" + fmtD(OT) + " cm</b>.";
  }
  var prompt = "Dans le diagramme, P est un point à l'extérieur du cercle de centre O. La droite qui passe par P et T est une tangente (elle touche le cercle en un seul point, T), et " + given + ". Trouve la longueur de " + ask + ", en centimètres.";
  var q = numq(prompt, vals[mode], 0.01, sol, { mode: "tangent-" + mode, OT: OT, PT: PT, OP: OP, tAng: tAng });
  q.figure = fig;
  return q;
}, ["Le rayon qui va au point de tangence est perpendiculaire à la tangente, donc le triangle OTP est rectangle en T.", "Marque l'angle droit en T, puis utilise la relation de Pythagore dans le triangle OTP."]);

// 3. 9.6 L2 MC: the perpendicular from the centre bisects the chord.
E("u8-chord-perp-bisects", 8, ["9.6"], 1, "gen", function () {
  var phi = pick([42, 48, 54, 66, 72, 78, 84, 88]);
  var r = pick([5, 6, 7, 8, 9, 10, 11, 12]);
  var tilt = pick([0, 12, -12, 24]);
  var A = u8Rot(u8P(90 + phi), tilt), B = u8Rot(u8P(90 - phi), tilt);
  var fig = u8Fig({ pts: { A: A, B: B }, segs: [["A", "B"], ["O", "A"]], perp: ["A", "B"], sideLabs: [{ a: "O", b: "A", text: fmtD(r) + " cm", off: 15 }] });
  var prompt = "Dans le diagramme, AB est une corde : une corde est un segment qui relie deux points du cercle. Le segment qui part du centre O est tracé perpendiculaire à AB et il rencontre AB en M. Le rayon mesure \\(" + fmtD(r) + "\\) cm. Quel énoncé est vrai ?";
  var solution = "La perpendiculaire qui va du centre d'un cercle à une corde coupe la corde en deux parties égales, donc M est le milieu de AB et <b>\\(AM = MB\\)</b>.";
  var q = mcq(prompt,
    { t: "\\(AM = MB\\)", fb: "Exact. La perpendiculaire qui va du centre coupe la corde en deux parties égales, donc M est son milieu." },
    [
      { t: "M est le centre du cercle.", fb: "Le centre est O. M est un point sur la corde AB." },
      { t: "\\(OM = OA\\)", fb: "M est à l'intérieur du cercle, donc OM est plus court que le rayon OA, et non égal à lui." },
      { t: "AB passe par le centre O.", fb: "La corde AB est loin de O ; seul un diamètre passe par le centre." }
    ],
    solution, { mode: "chord-perp-bisects", phi: phi, r: r, tilt: tilt });
  q.figure = fig;
  return q;
}, ["Utilise la propriété de la corde : que fait la perpendiculaire qui va du centre à une corde ?", "Le pied de la perpendiculaire est M, le point où OM rencontre AB à angle droit."]);

// 4. 9.6 L2 num, CR 3: chord length from the radius and the distance to the chord.
E("u8-chord-length", 8, ["9.6"], 1, "gen", function () {
  var tr = pick(U8_TRIPLES), k = pick([1, 2]);
  var d = tr[0] * k, half = tr[1] * k, r = tr[2] * k;
  if (Math.random() < 0.5) { var tmp = d; d = half; half = tmp; }
  var tilt = pick([0, 15, -15, 30, -30]);
  var A = u8Rot([-half / r, d / r], tilt), B = u8Rot([half / r, d / r], tilt);
  var fig = u8Fig({
    pts: { A: A, B: B }, segs: [["A", "B"], ["O", "A"]], perp: ["A", "B"],
    sideLabs: [{ a: "O", b: "A", text: fmtD(r) + " cm", off: 15 }, { a: "O", b: "M", text: fmtD(d) + " cm", off: 15 }]
  });
  var prompt = "Dans le diagramme, AB est une corde d'un cercle de centre O et de rayon \\(" + fmtD(r) + "\\) cm. La perpendiculaire qui part de O rencontre AB en M, et \\(OM = " + fmtD(d) + "\\) cm. Trouve la longueur de la corde AB, en centimètres.";
  var solution = "La perpendiculaire qui va du centre coupe la corde en deux parties égales, donc \\(AM = MB\\). Le triangle OMA est rectangle en M : \\[ \\begin{aligned} AM^{2} &= OA^{2} - OM^{2} \\\\ &= " + fmtD(r) + "^{2} - " + fmtD(d) + "^{2} = " + fmtD(r * r - d * d) + " \\\\ AM &= " + fmtD(half) + " \\\\ AB &= 2 \\times " + fmtD(half) + " = " + fmtD(2 * half) + " \\end{aligned} \\] Donc la longueur de la corde est <b>" + fmtD(2 * half) + " cm</b>.";
  var q = numq(prompt, 2 * half, 0.01, solution, { mode: "chord-length", r: r, d: d, half: half, tilt: tilt });
  q.figure = fig;
  return q;
}, ["La perpendiculaire qui va du centre à une corde coupe la corde en deux parties égales, et elle forme un triangle rectangle avec un rayon.", "Trouve AM avec le théorème de Pythagore dans le triangle OMA, puis double-le pour obtenir toute la corde."]);

// 5. 9.7 L1 num: central angle is twice the inscribed angle on the same arc.
E("u8-central-inscribed", 8, ["9.7"], 1, "gen", function () {
  var th = pick([16, 18, 20, 22, 24, 25, 28, 30, 32, 34, 35, 36, 38, 40, 42, 44, 45, 48, 50, 52, 54, 55, 56, 58, 60, 62, 64, 65, 68, 70, 72]);
  var rot = pick([0, 15, 30, 45, 60, 75, 90, 105]);
  var dbl = Math.random() < 0.5;
  var A = u8P(270 - th + rot), B = u8P(270 + th + rot), C = u8P(90 + rot);
  var cen = 2 * th;
  var aO = [{ v: "O", a1: u8Dir([0, 0], A), a2: u8Dir([0, 0], B), r: 0.3, lr: 0.52, label: dbl ? null : fmtD(cen) + "°" }];
  var aC = [{ v: "C", a1: u8Dir(C, A), a2: u8Dir(C, B), r: 0.3, lr: 0.52, label: dbl ? fmtD(th) + "°" : null }];
  var fig = u8Fig({ pts: { A: A, B: B, C: C }, segs: [["O", "A"], ["O", "B"], ["C", "A"], ["C", "B"]], angles: dbl ? aC : aO });
  var prompt, solution, ans;
  if (!dbl) {
    prompt = "Dans le diagramme, O est le centre du cercle. L'angle AOB est un angle au centre (son sommet est au centre) et il mesure \\(" + fmtD(cen) + "^{\\circ}\\). L'angle ACB est un angle inscrit (son sommet est sur le cercle) qui intercepte le même arc AB. Trouve la mesure de l'angle ACB, en degrés.";
    solution = "L'angle au centre sur un arc vaut le double de l'angle inscrit sur le même arc : \\[ \\begin{aligned} \\angle ACB &= " + fmtD(cen) + "^{\\circ} \\div 2 \\\\ &= " + fmtD(th) + "^{\\circ} \\end{aligned} \\] Donc l'angle ACB mesure <b>\\(" + fmtD(th) + "^{\\circ}\\)</b>.";
    ans = th;
  } else {
    prompt = "Dans le diagramme, O est le centre du cercle. L'angle ACB est un angle inscrit (son sommet est sur le cercle) et il mesure \\(" + fmtD(th) + "^{\\circ}\\). L'angle AOB est un angle au centre (son sommet est au centre) qui intercepte le même arc AB. Trouve la mesure de l'angle AOB, en degrés.";
    solution = "L'angle au centre sur un arc vaut le double de l'angle inscrit sur le même arc : \\[ \\begin{aligned} \\angle AOB &= 2 \\times " + fmtD(th) + "^{\\circ} \\\\ &= " + fmtD(cen) + "^{\\circ} \\end{aligned} \\] Donc l'angle AOB mesure <b>\\(" + fmtD(cen) + "^{\\circ}\\)</b>.";
    ans = cen;
  }
  var q = numq(prompt, ans, 0.01, solution, { mode: dbl ? "inscribed-to-central" : "central-to-inscribed", th: th, rot: rot });
  q.figure = fig;
  return q;
}, ["L'angle au centre qui intercepte un arc vaut le double de l'angle inscrit qui intercepte le même arc.", "Décide si l'angle demandé est le double ou la moitié, puis calcule."]);

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
    angs = [{ v: "O", a1: aA, a2: aB, r: 0.3, lr: 0.52, label: fmtD(minor) + "°" }];
    prompt = "Dans le diagramme, O est le centre du cercle et l'angle au centre AOB mesure \\(" + fmtD(minor) + "^{\\circ}\\). Le point C est sur l'arc majeur AB (l'arc le plus long entre A et B). Trouve la mesure de l'angle inscrit ACB, en degrés.";
    solution = "Le point C est sur l'arc majeur, donc l'angle ACB intercepte l'arc mineur AB et vaut la moitié de son angle au centre : \\[ \\begin{aligned} \\angle ACB &= " + fmtD(minor) + "^{\\circ} \\div 2 \\\\ &= " + fmtD(th) + "^{\\circ} \\end{aligned} \\] Donc l'angle ACB mesure <b>\\(" + fmtD(th) + "^{\\circ}\\)</b>.";
  } else if (mode === "reflex") {
    C = u8P(270 + rot);
    angs = [{ v: "O", a1: aB, a2: aB + reflex, r: 0.34, lr: 0.6, label: fmtD(reflex) + "°" }];
    prompt = "Dans le diagramme, O est le centre du cercle. L'angle au centre marqué AOB est l'angle réflexe (plus grand que \\(180^{\\circ}\\)) et il mesure \\(" + fmtD(reflex) + "^{\\circ}\\). Le point C est sur l'arc mineur AB. Trouve la mesure de l'angle inscrit ACB, en degrés.";
    solution = "L'angle ACB intercepte l'arc majeur AB, donc il vaut la moitié de l'angle au centre réflexe sur ce même arc : \\[ \\begin{aligned} \\angle ACB &= " + fmtD(reflex) + "^{\\circ} \\div 2 \\\\ &= " + fmtD(ans) + "^{\\circ} \\end{aligned} \\] Donc l'angle ACB mesure <b>\\(" + fmtD(ans) + "^{\\circ}\\)</b>.";
  } else {
    C = u8P(270 + rot);
    angs = [{ v: "O", a1: aA, a2: aB, r: 0.3, lr: 0.52, label: fmtD(minor) + "°" }];
    prompt = "Dans le diagramme, O est le centre du cercle et l'angle au centre marqué AOB mesure \\(" + fmtD(minor) + "^{\\circ}\\). Le point C est sur l'arc mineur AB (l'arc le plus court entre A et B), donc l'angle ACB intercepte l'arc majeur AB. Trouve la mesure de l'angle ACB, en degrés.";
    solution = "L'angle ACB intercepte l'arc majeur, donc trouve d'abord l'angle au centre réflexe sur cet arc, puis prends sa moitié : \\[ \\begin{aligned} \\text{réflexe } \\angle AOB &= 360^{\\circ} - " + fmtD(minor) + "^{\\circ} = " + fmtD(reflex) + "^{\\circ} \\\\ \\angle ACB &= " + fmtD(reflex) + "^{\\circ} \\div 2 = " + fmtD(ans) + "^{\\circ} \\end{aligned} \\] Donc l'angle ACB mesure <b>\\(" + fmtD(ans) + "^{\\circ}\\)</b>.";
  }
  var fig = u8Fig({ pts: { A: A, B: B, C: C }, segs: [["O", "A"], ["O", "B"], ["C", "A"], ["C", "B"]], angles: angs });
  var q = numq(prompt, ans, 0.01, solution, { mode: "reflex-" + mode, th: th, rot: rot });
  q.figure = fig;
  return q;
}, ["Un angle inscrit vaut la moitié de l'angle au centre sur le même arc, et l'arc qu'il intercepte décide quel angle au centre utiliser.", "Vérifie sur quel arc C se trouve : l'angle inscrit utilise l'angle au centre sur l'arc opposé, l'angle réflexe au besoin."]);

// 7. 9.8 L2 num, CR 2: angle in a semicircle is a right angle.
E("u8-semicircle-angle", 8, ["9.8"], 1, "gen", function () {
  var gam = pick([44, 52, 60, 68, 76, 84, 96, 104, 112, 120, 128, 136]);
  var rot = pick([0, 14, -14, 28]);
  var atA = Math.random() < 0.5;
  var A = u8Rot([-1, 0], rot), B = u8Rot([1, 0], rot), C = u8Rot(u8P(gam), rot);
  var angA = gam / 2, angB = 90 - angA;
  var given = atA ? angA : angB, ans = atA ? angB : angA;
  var gv = atA ? "A" : "B", ask = atA ? "B" : "A";
  var angs = [{ v: gv, a1: u8Dir(pts0(gv), C), a2: u8Dir(pts0(gv), pts0(ask)), r: 0.3, lr: 0.55, label: fmtD(given) + "°" }];
  function pts0(n) { return n === "A" ? A : (n === "B" ? B : C); }
  var fig = u8Fig({
    pts: { A: A, B: B, C: C }, segs: [["A", "B"], ["A", "C"], ["B", "C"]], angles: angs,
    rightMarks: [{ v: "C", a1: u8Dir(C, A), a2: u8Dir(C, B) }]
  });
  var prompt = "Dans le diagramme, AB est un diamètre du cercle de centre O, et C est un point sur le cercle. L'angle " + gv + " mesure \\(" + fmtD(given) + "^{\\circ}\\). Trouve la mesure de l'angle " + ask + ", en degrés.";
  var solution = "Un angle inscrit dans un demi-cercle est un angle droit, donc l'angle C mesure \\(90^{\\circ}\\). La somme des angles du triangle ABC est \\(180^{\\circ}\\) : \\[ \\begin{aligned} \\angle " + ask + " &= 180^{\\circ} - 90^{\\circ} - " + fmtD(given) + "^{\\circ} \\\\ &= " + fmtD(ans) + "^{\\circ} \\end{aligned} \\] Donc l'angle " + ask + " mesure <b>\\(" + fmtD(ans) + "^{\\circ}\\)</b>.";
  var q = numq(prompt, ans, 0.01, solution, { mode: "semicircle-" + gv, gam: gam, rot: rot });
  q.figure = fig;
  return q;
}, ["Un angle inscrit dans un demi-cercle est un angle droit, donc l'angle C mesure 90 degrés.", "Utilise la somme des angles d'un triangle : soustrais 90 et l'angle donné de 180."]);

// 8. 9.9 L2 MC, CR 2: inscribed angles on the same arc are equal.
E("u8-same-arc-angles", 8, ["9.9"], 1, "gen", function () {
  var v = pick([18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 62, 64, 66, 68, 70, 72]);
  var rot = pick([0, 18, 36, 54, 72, 90]);
  var A = u8P(200 + rot), B = u8P(340 + rot), C = u8P(80 + rot), D = u8P(135 + rot);
  var fig = u8Fig({
    pts: { A: A, B: B, C: C, D: D }, segs: [["C", "A"], ["C", "B"], ["D", "A"], ["D", "B"]],
    angles: [{ v: "C", a1: u8Dir(C, A), a2: u8Dir(C, B), r: 0.3, lr: 0.55, label: fmtD(v) + "°" },
             { v: "D", a1: u8Dir(D, A), a2: u8Dir(D, B), r: 0.3, lr: 0.55, label: "?" }]
  });
  var prompt = "Dans le diagramme, C et D sont des points du même côté de la corde AB, donc les angles inscrits ACB et ADB interceptent tous les deux le même arc AB. L'angle ACB mesure \\(" + fmtD(v) + "^{\\circ}\\). Quelle est la mesure de l'angle ADB ?";
  var solution = "Les angles inscrits qui interceptent le même arc sont égaux, donc l'angle ADB a la même mesure que l'angle ACB : <b>\\(" + fmtD(v) + "^{\\circ}\\)</b>.";
  var q = mcq(prompt,
    { t: "\\(" + fmtD(v) + "^{\\circ}\\)", fb: "Exact. Les angles inscrits sur le même arc sont égaux." },
    [
      { t: "\\(" + fmtD(v / 2) + "^{\\circ}\\)", fb: "On prend la moitié pour comparer un angle au centre à un angle inscrit ; ces deux angles sont tous les deux inscrits sur le même arc." },
      { t: "\\(" + fmtD(2 * v) + "^{\\circ}\\)", fb: "Doubler donne l'angle au centre sur cet arc, pas un autre angle inscrit." },
      { t: "\\(" + fmtD(180 - v) + "^{\\circ}\\)", fb: "C'est l'angle supplémentaire de cet angle ; les angles sur le même arc sont égaux, pas supplémentaires." }
    ],
    solution, { mode: "same-arc", v: v, rot: rot });
  q.figure = fig;
  return q;
}, ["Utilise la propriété du même arc : compare les deux angles inscrits qui interceptent l'arc AB.", "Les deux angles ont leur sommet sur le cercle et leurs côtés passent par A et par B."]);

// 9. 9.5 L3 num, CR 3: two-step chord problem through the sagitta MD.
E("u8-chord-two-step", 8, ["9.5"], 3, "gen", function () {
  var tr = pick(U8_TRIPLES), k = pick([1, 2]);
  var d = tr[0] * k, half = tr[1] * k, r = tr[2] * k;
  if (Math.random() < 0.5) { var tmp = d; d = half; half = tmp; }
  var md = r - d, tilt = pick([0, 15, -15]);
  var A = u8Rot([-half / r, d / r], tilt), B = u8Rot([half / r, d / r], tilt), D = u8Rot([0, 1], tilt);
  var fig = u8Fig({
    pts: { A: A, B: B, D: D }, segs: [["A", "B"], ["O", "A"], ["M", "D"]], perp: ["A", "B"],
    sideLabs: [{ a: "O", b: "A", text: fmtD(r) + " cm", off: 15 }, { a: "M", b: "D", text: fmtD(md) + " cm", off: 15 }]
  });
  var prompt = "Dans le diagramme, AB est une corde d'un cercle de centre O et de rayon \\(" + fmtD(r) + "\\) cm. La droite qui part de O, perpendiculaire à AB, rencontre AB en M et rencontre le cercle en D, avec \\(MD = " + fmtD(md) + "\\) cm. Trouve la longueur de la corde AB, en centimètres.";
  var solution = "Trouve d'abord OM : OD est un rayon, donc \\(OM = OD - MD\\). Utilise ensuite le triangle rectangle OMA, et rappelle-toi que la perpendiculaire qui va du centre coupe la corde en deux parties égales : \\[ \\begin{aligned} OM &= " + fmtD(r) + " - " + fmtD(md) + " = " + fmtD(d) + " \\\\ AM^{2} &= " + fmtD(r) + "^{2} - " + fmtD(d) + "^{2} = " + fmtD(r * r - d * d) + " \\\\ AM &= " + fmtD(half) + " \\\\ AB &= 2 \\times " + fmtD(half) + " = " + fmtD(2 * half) + " \\end{aligned} \\] Donc la longueur de la corde est <b>" + fmtD(2 * half) + " cm</b>.";
  var q = numq(prompt, 2 * half, 0.01, solution, { mode: "chord-two-step", r: r, d: d, half: half, md: md, tilt: tilt });
  q.figure = fig;
  return q;
}, ["Travaille en deux étapes : une longueur d'abord, puis la propriété de la corde avec la perpendiculaire qui va du centre.", "OD est un rayon, donc soustrais MD de OD pour obtenir OM, puis utilise le triangle OMA."]);

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
    angles: [{ v: "P", a1: u8Dir(P, T), a2: u8Dir(P, [0, 0]), r: 0.3, lr: 0.55, label: fmtD(pAng) + "°" },
             { v: "C", a1: u8Dir(C, T), a2: u8Dir(C, D), r: 0.3, lr: 0.55, label: "?" }]
  });
  var prompt = "Dans le diagramme, la droite qui passe par T et P est une tangente au cercle de centre O (une tangente touche le cercle en un seul point). La droite qui part de O et passe par P rencontre le cercle en D. L'angle OPT mesure \\(" + fmtD(pAng) + "^{\\circ}\\), et C est un point sur l'arc majeur TD. Trouve la mesure de l'angle inscrit TCD, en degrés.";
  var solution = "Le rayon qui va au point de tangence est perpendiculaire à la tangente, donc le triangle OTP est rectangle en T. Trouve d'abord l'angle au centre TOD, puis prends sa moitié, car l'angle inscrit sur le même arc vaut la moitié de l'angle au centre : \\[ \\begin{aligned} \\angle TOD &= 180^{\\circ} - 90^{\\circ} - " + fmtD(pAng) + "^{\\circ} = " + fmtD(delta) + "^{\\circ} \\\\ \\angle TCD &= " + fmtD(delta) + "^{\\circ} \\div 2 = " + fmtD(ans) + "^{\\circ} \\end{aligned} \\] Donc l'angle TCD mesure <b>\\(" + fmtD(ans) + "^{\\circ}\\)</b>.";
  var q = mcq(prompt,
    { t: "\\(" + fmtD(ans) + "^{\\circ}\\)", fb: "Exact. L'angle TCD est l'angle inscrit sur l'arc TD, donc il vaut la moitié de l'angle au centre TOD : \\(" + fmtD(delta) + "^{\\circ} \\div 2 = " + fmtD(ans) + "^{\\circ}\\)." },
    [
      { t: "\\(" + fmtD(delta) + "^{\\circ}\\)", fb: "C'est l'angle au centre TOD lui-même. L'angle inscrit sur le même arc vaut la moitié de l'angle au centre, donc il faut encore prendre la moitié de \\(" + fmtD(delta) + "^{\\circ}\\)." },
      { t: "\\(" + fmtD(pAng) + "^{\\circ}\\)", fb: "C'est l'angle OPT, l'angle en P dans le triangle rectangle OTP. La question demande l'angle inscrit TCD, qui vaut la moitié de l'angle au centre TOD." },
      { t: "\\(" + fmtD(180 - ans) + "^{\\circ}\\)", fb: "C'est l'angle supplémentaire de la réponse, \\(180^{\\circ} - " + fmtD(ans) + "^{\\circ}\\). L'angle TCD n'est pas supplémentaire à l'angle au centre ; il vaut la moitié de cet angle." }
    ],
    solution, { mode: "tangent-central-inscribed", delta: delta, tAng: tAng, sgn: sgn });
  q.figure = fig;
  return q;
}, ["Combine deux propriétés : le rayon qui va au point de tangence forme un angle droit avec la tangente, et un angle inscrit vaut la moitié de l'angle au centre sur le même arc.", "Utilise d'abord la somme des angles dans le triangle rectangle OTP pour trouver l'angle au centre TOD."]);

/*
TRANSLATOR NOTES
- Judgement calls (glossary silent): "subjective judgement" = jugement subjectif; "spinner" = roulette; "draw / pick (cards, marbles)" = piger; "self checkout" = caisse libre-service; "odds statement" in hints rendered as cote.
- Number formatting: no fmt(, fmtF( or .toFixed( calls occur in this chunk, so no fmtD/fmtDF rewrites were needed, and no generated numbers exist to route through fmtD/fmtDF.
- Literal formatted numbers in static prose, for later reconciliation against the guides: percents 70 %, 55 %, 40 %, 52 %, 80 %, 75 %, 25 %, 60 %, 30 % (with repeats in options, feedback and solutions); decimal 7,5 (from 7.5, twice in the checkout variant); thousands: none; dollar amounts with $ sign: none (amounts are written in words, huit dollars and deux dollars).
- FMT-GEOM lines left: none.
- Unsure: original team variant phrase "lost ground in most close races" rendered as losing ground in close matches (matchs serres), keeping the same count logic; "3 in 5 chance" style rendered uniformly as "3 chances sur 5".
*/

/* ----- bank-u9.js ----- */
// Math 9 (French) Unit 9 Probability and Statistics question bank
// Cut verbatim from the standalone bank source
// (math-9-review-fr/bank-src.js, lines 5251 to 6042).
// CRMARKS: u9-combined-decision=3
// CRMARKS: u9-collection-problem=3
// CRMARKS: u9-collection-biggest-threat=3
// CRMARKS: u9-match-influence=3
// CRMARKS: u9-generalization-critique=2
// CRMARKS: u9-rubric-missing-part=2
// CRMARKS: u9-plan-element=2
// Unit 9: Probability and Statistics (Math 9, NL). Entries only; helpers prefixed u9.

E("u9-prob-in-media", 9, ["12.1"], 1, "var", varset([
  function(){
    return mcq("Quatre courts textes paraissent dans un bulletin scolaire. Lequel utilise la probabilité ?",
      {t:"Il y a 70 % de chances de neige pour la fête de patinage extérieur vendredi", fb:"Exact : un pourcentage de chances dit à quel point la neige est probable. C'est la probabilité en usage."},
      [{t:"La fête de patinage commencera à midi vendredi au gymnase", fb:"Ce texte donne une heure et un lieu, sans rien dire sur la probabilité d'un événement."},
       {t:"L'hiver dernier, l'école a tenu trois fêtes de patinage pour les élèves et le personnel", fb:"Ce texte rapporte un nombre passé, sans énoncé sur le hasard."},
       {t:"Les élèves ont voté le patinage comme leur activité d'hiver préférée cette année scolaire", fb:"Ce texte rapporte un résultat de vote, sans rien dire sur la probabilité d'un événement."}],
      "On utilise la probabilité quand un énoncé dit à quel point un événement est probable. Le texte qui utilise la probabilité est <b>les 70 % de chances de neige pour la fête de patinage</b>.",
      {mode:"media-weather"});
  },
  function(){
    return mcq("Quatre courts textes paraissent sur une page sportive. Lequel utilise la probabilité ?",
      {t:"Les prévisionnistes donnent à l'équipe locale 3 chances sur 5 de gagner samedi", fb:"Exact : 3 chances sur 5 disent à quel point une victoire est probable. C'est la probabilité en usage."},
      [{t:"L'équipe locale a marqué deux buts tardifs pour gagner le match samedi", fb:"Ce texte rapporte ce qui s'est déjà passé, sans énoncé sur le hasard."},
       {t:"Les billets pour le match de samedi coûtent huit dollars à la porte", fb:"Ce texte donne un prix, sans rien dire sur la probabilité d'un événement."},
       {t:"L'équipe s'entraînera mardi et jeudi soir cette semaine sur le terrain de l'école", fb:"Ce texte donne un horaire, sans rien dire sur la probabilité d'un événement."}],
      "On utilise la probabilité quand un énoncé dit à quel point un événement est probable. Le texte qui utilise la probabilité est <b>les 3 chances sur 5 de gagner samedi</b>.",
      {mode:"media-sports"});
  },
  function(){
    return mcq("Quatre courts textes paraissent sur un babillard de clinique. Lequel utilise la probabilité ?",
      {t:"Une affiche de santé dit qu'environ 1 adolescent sur 4 attrapera un rhume cet hiver", fb:"Exact : 1 sur 4 dit à quel point attraper un rhume est probable. C'est la probabilité en usage."},
      [{t:"La clinique est ouverte en semaine de neuf heures le matin à cinq heures", fb:"Ce texte donne les heures d'ouverture, sans rien dire sur la probabilité d'un événement."},
       {t:"Se laver les mains avec du savon aide à enlever les germes ramassés pendant la journée", fb:"Ce texte donne un conseil de santé, sans énoncé sur le hasard."},
       {t:"Deux infirmières et un médecin travaillent à la clinique la plupart des jours de semaine", fb:"Ce texte rapporte un nombre d'employés, sans rien dire sur la probabilité d'un événement."}],
      "On utilise la probabilité quand un énoncé dit à quel point un événement est probable. Le texte qui utilise la probabilité est <b>environ 1 adolescent sur 4 qui attrape un rhume cet hiver</b>.",
      {mode:"media-health"});
  },
  function(){
    return mcq("Quatre courts textes paraissent dans un rapport du conseil étudiant. Lequel utilise la probabilité ?",
      {t:"Un sondage donne à un candidat 55 % de chances de gagner le vote du conseil", fb:"Exact : 55 % de chances dit à quel point une victoire est probable. C'est la probabilité en usage."},
      [{t:"Le vote pour le conseil étudiant aura lieu dans le gymnase à l'heure du dîner", fb:"Ce texte donne un lieu et une heure, sans énoncé sur le hasard."},
       {t:"Trois candidats se présentent à la présidence du conseil étudiant", fb:"Ce texte donne un nombre de candidats, sans rien dire sur la probabilité d'un événement."},
       {t:"L'an dernier, le conseil a amassé de l'argent avec une vente de pâtisseries à l'automne", fb:"Ce texte rapporte un événement passé, sans rien dire sur la probabilité d'un événement."}],
      "On utilise la probabilité quand un énoncé dit à quel point un événement est probable. Le texte qui utilise la probabilité est <b>les 55 % de chances de gagner le vote du conseil</b>.",
      {mode:"media-election"});
  },
  function(){
    return mcq("Quatre courts textes paraissent sur des affiches à une foire scolaire. Lequel utilise la probabilité ?",
      {t:"Une affiche de jeu dit que les joueurs ont 1 chance sur 6 de gagner un prix", fb:"Exact : 1 chance sur 6 dit à quel point gagner est probable. C'est la probabilité en usage."},
      [{t:"Le jeu de lancer d'anneaux coûte deux dollars pour trois essais à la foire", fb:"Cette affiche donne un prix, sans rien dire sur la probabilité d'un événement."},
       {t:"Les prix des jeux sont gardés sur l'étagère du haut du kiosque de jeux de la foire", fb:"Cette affiche donne un lieu, sans énoncé sur le hasard."},
       {t:"La foire scolaire ouvre à six heures le soir et ferme à neuf heures", fb:"Cette affiche donne les heures d'ouverture, sans rien dire sur la probabilité d'un événement."}],
      "On utilise la probabilité quand un énoncé dit à quel point un événement est probable. Le texte qui utilise la probabilité est <b>1 chance sur 6 de gagner un prix</b>.",
      {mode:"media-fair"});
  },
  function(){
    return mcq("Quatre courts textes paraissent dans un reportage de radio communautaire. Lequel utilise la probabilité ?",
      {t:"Le reportage dit qu'il y a 40 % de chances de pluie pour la fin de semaine du festival", fb:"Exact : 40 % de chances dit à quel point la pluie est probable. C'est la probabilité en usage."},
      [{t:"Le festival du port se tiendra du vendredi soir au dimanche soir", fb:"Ce texte donne des dates, sans rien dire sur la probabilité d'un événement."},
       {t:"L'été dernier, quarante bateaux ont participé à la parade de bateaux du festival du port", fb:"Ce texte rapporte un nombre passé, sans énoncé sur le hasard."},
       {t:"On peut acheter les billets du festival au bureau municipal pendant la semaine", fb:"Ce texte dit où acheter les billets, sans rien dire sur la probabilité d'un événement."}],
      "On utilise la probabilité quand un énoncé dit à quel point un événement est probable. Le texte qui utilise la probabilité est <b>les 40 % de chances de pluie pour la fin de semaine du festival</b>.",
      {mode:"media-festival"});
  }
]), ["La probabilité se présente comme une chance, une cote ou un pourcentage de chance qu'un événement arrive.", "Cherche dans les quatre textes des mots comme chance, 1 sur 4 ou pour cent, liés à un événement futur."]);

E("u9-assumption-limit", 9, ["12.2"], 1, "var", varset([
  function(){
    return mcq("Un élève dit que la probabilité d'obtenir face au lancer d'une pièce est \\(\\frac{1}{2}\\). Quelle option énonce l'hypothèse derrière cette probabilité et sa limite ?",
      {t:"Elle suppose que la pièce et le lancer sont équitables ; elle échoue si la pièce est pliée ou lancée de façon inégale", fb:"Exact : des chances égales demandent une pièce équitable, et un dommage ou un lancer inégal brise cette hypothèse."},
      [{t:"Elle suppose que face est sorti la moitié du temps avant ; elle échoue si la pièce est lancée seulement peu de fois de suite", fb:"Les résultats de la semaine dernière décrivent la probabilité expérimentale, mais la valeur énoncée vient de résultats égaux."},
       {t:"Elle suppose que l'élève veut obtenir face ; elle échoue si l'élève espère pile plutôt que face", fb:"Vouloir un résultat est un sentiment personnel, mais la valeur énoncée vient des deux côtés égaux."},
       {t:"Elle suppose que la pièce est tombée sur face souvent ; elle échoue si elle tombe de façon égale", fb:"Une pièce équitable appuie la valeur plutôt qu'elle ne la limite, et les lancers passés ne sont pas l'hypothèse."}],
      "La valeur \\(\\frac{1}{2}\\) repose sur des résultats également probables, donc elle suppose une pièce équitable et un lancer équitable. L'énoncé exact est <b>elle suppose que la pièce et le lancer sont équitables ; elle échoue si la pièce est pliée ou lancée de façon inégale</b>.",
      {mode:"assume-coin"});
  },
  function(){
    return mcq("Une feuille de jeu dit que la probabilité d'obtenir un 6 avec un dé est \\(\\frac{1}{6}\\). Quelle option énonce l'hypothèse derrière cette probabilité et sa limite ?",
      {t:"Elle suppose que les six faces sont également probables ; elle échoue si le dé est ébréché ou lesté", fb:"Exact : la valeur compte six faces égales, et un dommage ou un lestage rend les faces inégales."},
      [{t:"Elle suppose qu'un 6 est sorti une fois dans les six derniers lancers ; elle échoue si le prochain lancer est aussi un 6", fb:"Les lancers récents décrivent des résultats expérimentaux, mais la valeur énoncée vient du comptage de faces égales."},
       {t:"Elle suppose que le joueur se sent chanceux d'obtenir un 6 ; elle échoue si le joueur se sent malchanceux", fb:"Un sentiment est un jugement subjectif, mais la valeur énoncée vient des six faces égales."},
       {t:"Elle suppose que le dé est lancé sur une table dure ; elle échoue si le dé est lancé sur un tapis", fb:"La surface de lancer ne fixe pas la valeur ; les faces égales la fixent, et le dommage est la vraie limite."}],
      "La valeur \\(\\frac{1}{6}\\) repose sur six faces également probables, donc elle suppose un dé équitable. L'énoncé exact est <b>elle suppose que les six faces sont également probables ; elle échoue si le dé est ébréché ou lesté</b>.",
      {mode:"assume-die"});
  },
  function(){
    return mcq("Un sondage de 400 électeurs dit qu'un maire a 52 % de chances de gagner l'élection municipale. Quelle option énonce l'hypothèse derrière cette probabilité et sa limite ?",
      {t:"Elle suppose que les électeurs sondés représentent tous les électeurs ; elle échoue si des groupes entiers ont été laissés de côté", fb:"Exact : un sondage parle pour tout le monde seulement quand l'échantillon correspond à toute la population électorale."},
      [{t:"Elle suppose que chaque électeur de la ville a répondu au sondage ; elle échoue si le gagnant obtient moins de la moitié des votes", fb:"Seulement 400 électeurs ont été sondés, donc l'affirmation repose sur cet échantillon qui représente les autres."},
       {t:"Elle suppose que le maire est le candidat le plus fort ; elle échoue si un autre candidat fait campagne plus fort", fb:"La force d'un candidat est un jugement, mais la chance énoncée vient de l'échantillon du sondage."},
       {t:"Elle suppose que l'élection utilise une pièce équitable pour briser les égalités ; elle échoue si aucun vote ne donne une égalité", fb:"Le bris d'égalité ne joue aucun rôle ici ; la chance vient des électeurs échantillonnés dans le sondage."}],
      "La probabilité d'un sondage repose sur l'échantillon qui représente toute la population des électeurs. L'énoncé exact est <b>elle suppose que les électeurs sondés représentent tous les électeurs ; elle échoue si des groupes entiers ont été laissés de côté</b>.",
      {mode:"assume-poll"});
  },
  function(){
    return mcq("Une prévision dit qu'il y a 80 % de chances de pluie pour une sortie scolaire demain. Quelle option énonce l'hypothèse derrière cette probabilité et sa limite ?",
      {t:"Elle suppose que le modèle météo correspond aux conditions locales ; elle échoue quand le temps côtier change vite", fb:"Exact : le pourcentage vient d'un modèle, et des conditions côtières qui changent vite peuvent dépasser le modèle."},
      [{t:"Elle suppose que la pluie est tombée lors de 8 des 10 dernières sorties ; elle échoue si la classe reste à l'intérieur toute la journée", fb:"Les sorties passées seraient des données expérimentales, mais un pourcentage de prévision vient d'un modèle météo."},
       {t:"Elle suppose que l'enseignant s'attend à de la pluie lors de la sortie ; elle échoue si l'enseignant s'attend à du soleil", fb:"L'attente d'un enseignant est un jugement personnel, mais le pourcentage énoncé vient du modèle de prévision."},
       {t:"Elle suppose que chaque élève apporte un imperméable ; elle échoue si certains élèves oublient leur imperméable", fb:"L'équipement des élèves ne fixe pas le pourcentage de prévision ; le modèle météo et ses limites le fixent."}],
      "La probabilité d'une prévision repose sur un modèle météo qui correspond aux conditions locales à venir. L'énoncé exact est <b>elle suppose que le modèle météo correspond aux conditions locales ; elle échoue quand le temps côtier change vite</b>.",
      {mode:"assume-forecast"});
  },
  function(){
    return mcq("Une feuille de cartes dit que la probabilité de piger un as dans un jeu complet est \\(\\frac{4}{52}\\). Quelle option énonce l'hypothèse derrière cette probabilité et sa limite ?",
      {t:"Elle suppose que le jeu est complet et bien mélangé ; elle échoue si des cartes manquent ou sont mal mélangées", fb:"Exact : le comptage demande les 52 cartes présentes, et des cartes manquantes ou un mauvais mélange le brisent."},
      [{t:"Elle suppose qu'un as a été pigé 4 fois en 52 piges passées ; elle échoue si le jeu est complet et mélangé", fb:"Les piges passées décrivent des résultats expérimentaux, et un jeu complet et mélangé appuie le comptage."},
       {t:"Elle suppose que le joueur croit qu'un as est dû bientôt ; elle échoue si le joueur croit le contraire", fb:"Une croyance qu'un as est dû est subjective, mais la valeur énoncée vient du comptage du jeu."},
       {t:"Elle suppose que les cartes sont distribuées face visible sur la table ; elle échoue si les cartes sont distribuées face cachée", fb:"Face visible ou face cachée ne change pas le comptage ; les cartes manquantes ou non mélangées sont la vraie limite."}],
      "La valeur \\(\\frac{4}{52}\\) repose sur le comptage d'un jeu complet où chaque carte est également probable d'être pigée. L'énoncé exact est <b>elle suppose que le jeu est complet et bien mélangé ; elle échoue si des cartes manquent ou sont mal mélangées</b>.",
      {mode:"assume-cards"});
  },
  function(){
    return mcq("Un enseignant dit que la probabilité de piger une bille rouge dans un sac avec 3 billes rouges et 3 billes bleues est \\(\\frac{1}{2}\\). Quelle option énonce l'hypothèse derrière cette probabilité et sa limite ?",
      {t:"Elle suppose que les billes se ressemblent au toucher et sont bien mélangées ; elle échoue si les tailles diffèrent ou si le mélange est mauvais", fb:"Exact : une pige à l'aveugle est égale seulement quand on ne peut pas distinguer les billes et qu'elles sont bien mélangées."},
      [{t:"Elle suppose qu'une bille rouge a été pigée la moitié du temps avant ; elle échoue si le sac contient des couleurs en nombres tout à fait égaux partout dans le sac", fb:"Les piges précédentes décrivent des résultats expérimentaux, et des couleurs égales appuient le comptage énoncé."},
       {t:"Elle suppose que l'élève espère piger une bille rouge ; elle échoue si l'élève espère une bleue plutôt", fb:"Espérer est un sentiment personnel, mais la valeur énoncée vient des nombres égaux de couleurs."},
       {t:"Elle suppose que le sac est placé sur le bureau de l'enseignant ; elle échoue si le sac est placé sur une étagère", fb:"L'endroit où le sac se trouve ne fixe pas la valeur ; des billes égales et bien mélangées sont ce qui compte."}],
      "La valeur \\(\\frac{1}{2}\\) repose sur une pige à l'aveugle dans des nombres égaux de billes semblables et bien mélangées. L'énoncé exact est <b>elle suppose que les billes se ressemblent au toucher et sont bien mélangées ; elle échoue si les tailles diffèrent ou si le mélange est mauvais</b>.",
      {mode:"assume-marbles"});
  }
]), ["Chaque probabilité énoncée repose sur une hypothèse : demande-toi ce qui doit être vrai pour que le nombre tienne.", "Nomme d'abord ce que le nombre compte ou sur quoi il repose, puis demande-toi ce qui pourrait invalider cette base."]);

E("u9-same-number-two-sides", 9, ["12.3"], 2, "var", varset([
  function(){
    return mcq("Une clinique rapporte qu'un traitement a aidé 7 patients sur 10. Les partisans disent que la plupart des patients se sont améliorés. Comment les personnes qui s'opposent au traitement pourraient-elles utiliser le même résultat pour défendre leur côté ?",
      {t:"Elles peuvent dire qu'il n'a pas aidé 3 patients sur 10, donc presque un tiers n'a vu aucun bienfait", fb:"Exact : le même résultat laisse 3 patients sur 10 sans aide, et ce nombre appuie l'autre côté."},
      [{t:"Elles peuvent dire qu'il a aidé seulement 7 patients sur 20, donc moins de la moitié des patients se sont améliorés", fb:"Cela change le total de 10 à 20, ce qui invente un nouveau résultat au lieu de réutiliser le même."},
       {t:"Elles peuvent dire qu'il a aidé 10 patients sur 7, donc le rapport a dû mal compter les patients", fb:"Un compte de 10 sur 7 est impossible, et il ne reformule pas du tout le résultat rapporté."},
       {t:"Elles peuvent dire que les patients n'aimaient pas la salle d'attente, donc le traitement devrait être arrêté", fb:"Les opinions sur la salle d'attente sont un autre sujet ; le cas opposé doit réutiliser le même 7 sur 10."}],
      "Une probabilité ou un taux peut appuyer des positions opposées en insistant sur le résultat opposé : 7 sur 10 aidés veut aussi dire 3 sur 10 non aidés. L'usage opposé est <b>il n'a pas aidé 3 patients sur 10</b>.",
      {mode:"twosides-treatment"});
  },
  function(){
    return mcq("Un rapport dit que 8 élèves sur 10 ont réussi un cours de sécurité à l'école. Les dirigeants disent que le cours fonctionne bien. Comment les critiques pourraient-ils utiliser le même résultat pour dire que le cours a besoin de changements ?",
      {t:"Ils peuvent dire que 2 élèves sur 10 n'ont pas réussi, donc un élève sur cinq a été laissé de côté", fb:"Exact : le même résultat laisse 2 élèves sur 10 sans réussite, et ce nombre appuie les critiques."},
      [{t:"Ils peuvent dire que seulement 8 élèves sur 100 ont réussi, donc le cours a échoué pour presque chaque élève", fb:"Cela change le total de 10 à 100, ce qui invente un nouveau résultat au lieu de réutiliser le même."},
       {t:"Ils peuvent dire que le cours a duré dix semaines au trimestre d'automne, donc l'horaire a besoin de changements", fb:"La durée du cours est un autre sujet ; le cas des critiques doit réutiliser le même résultat de 8 sur 10."},
       {t:"Ils peuvent dire que 10 élèves sur 8 ont réussi le cours, donc la correction a dû être trop facile", fb:"Un compte de 10 sur 8 est impossible, et il ne reformule pas du tout le résultat rapporté."}],
      "Un résultat peut appuyer des positions opposées en insistant sur le résultat opposé : 8 sur 10 qui réussissent veut aussi dire 2 sur 10 qui ne réussissent pas. L'usage des critiques est <b>2 élèves sur 10 n'ont pas réussi</b>.",
      {mode:"twosides-course"});
  },
  function(){
    return mcq("Un magasin rapporte que 75 % des clients étaient contents d'une nouvelle caisse libre-service. Les gestionnaires disent que les clients adorent le changement. Comment les opposants pourraient-ils utiliser le même résultat pour s'opposer au changement ?",
      {t:"Ils peuvent dire que 25 % des clients étaient mécontents, donc un client sur quatre a eu une mauvaise expérience", fb:"Exact : 75 % contents laisse 25 % mécontents, et cette part appuie le côté opposé."},
      [{t:"Ils peuvent dire que 75 % des clients étaient mécontents, donc trois clients sur quatre n'aimaient pas le changement", fb:"Cela échange les parts contentes et mécontentes, ce qui déforme le résultat rapporté."},
       {t:"Ils peuvent dire que le magasin est ouvert 75 % de la journée, donc les caisses restent inactives trop souvent", fb:"Les heures d'ouverture sont un autre sujet ; le cas opposé doit réutiliser le même résultat de satisfaction."},
       {t:"Ils peuvent dire que seulement 7,5 clients étaient contents, donc le changement a plu à très peu de gens", fb:"Un compte de 7,5 clients n'a aucun sens ; le résultat est un pourcentage de tous les clients."}],
      "Un pourcentage peut appuyer des positions opposées en insistant sur la part opposée : 75 % contents veut aussi dire 25 % mécontents. L'usage opposé est <b>25 % des clients étaient mécontents</b>.",
      {mode:"twosides-checkout"});
  },
  function(){
    return mcq("Une équipe scolaire a gagné 6 de ses 10 matchs cette saison. Les partisans disent que l'équipe a eu une forte saison. Comment les critiques pourraient-ils utiliser le même résultat pour dire que la saison était faible ?",
      {t:"Ils peuvent dire que l'équipe n'a pas gagné 4 de ses 10 matchs, donc elle a perdu du terrain dans la plupart des matchs serrés", fb:"Exact : gagner 6 sur 10 veut aussi dire ne pas gagner 4 sur 10, et ce nombre appuie les critiques."},
      [{t:"Ils peuvent dire que l'équipe a gagné seulement 6 de ses 20 matchs, donc elle a gagné moins d'un tiers de ses matchs", fb:"Cela change le total de 10 à 20, ce qui invente un nouveau résultat au lieu de réutiliser le même."},
       {t:"Ils peuvent dire que l'équipe s'est entraînée 10 fois par mois, donc les joueurs se sont entraînés trop peu pendant la saison de jeu", fb:"Les nombres d'entraînements sont un autre sujet ; le cas des critiques doit réutiliser le même résultat de 6 sur 10."},
       {t:"Ils peuvent dire que l'équipe a gagné 10 de ses 6 matchs, donc le livre des records doit être faux", fb:"Un compte de 10 sur 6 est impossible, et il ne reformule pas du tout le résultat rapporté."}],
      "Un bilan peut appuyer des positions opposées en insistant sur le résultat opposé : gagner 6 sur 10 veut aussi dire ne pas gagner 4 sur 10. L'usage des critiques est <b>l'équipe n'a pas gagné 4 de ses 10 matchs</b>.",
      {mode:"twosides-team"});
  },
  function(){
    return mcq("À un test de goût, 4 élèves sur 5 ont aimé une nouvelle boisson de cafétéria. La cafétéria dit que la boisson est un succès. Comment les élèves qui veulent une autre boisson pourraient-ils utiliser le même résultat pour défendre leur côté ?",
      {t:"Ils peuvent dire que 1 élève sur 5 n'a pas aimé la boisson, donc un cinquième des élèves veulent un changement", fb:"Exact : 4 sur 5 qui aiment laisse 1 sur 5 qui n'a pas aimé, ce qui appuie l'autre côté."},
      [{t:"Ils peuvent dire que seulement 4 élèves sur 50 ont aimé la boisson, donc presque personne ne l'a aimée du tout", fb:"Cela change le total de 5 à 50, ce qui invente un nouveau résultat au lieu de réutiliser le même."},
       {t:"Ils peuvent dire que la boisson vient en 5 saveurs au magasin, donc la cafétéria a choisi la mauvaise", fb:"Les saveurs au magasin sont un autre sujet ; le cas opposé doit réutiliser le même résultat de 4 sur 5."},
       {t:"Ils peuvent dire que 5 élèves sur 4 ont aimé la boisson, donc le test de goût a été mal compté", fb:"Un compte de 5 sur 4 est impossible, et il ne reformule pas du tout le résultat rapporté."}],
      "Un résultat peut appuyer des positions opposées en insistant sur le résultat opposé : 4 sur 5 qui aiment une boisson veut aussi dire 1 sur 5 qui ne l'a pas aimée. L'usage opposé est <b>1 élève sur 5 n'a pas aimé la boisson</b>.",
      {mode:"twosides-drink"});
  }
]), ["Le même nombre peut être présenté par son résultat opposé : ce qui ne s'est pas produit, sur le même total.", "Soustrais le nombre énoncé du total pour trouver le nombre que l'autre côté mettra en avant."]);

E("u9-combined-decision", 9, ["12.4"], 1, "var", varset([
  function(){
    return mcq("Un entraîneur doit choisir un tireur pour un lancer franc final. La chance du tableau compte des résultats également probables, les essais d'entraînement montrent que le tireur a réussi 18 de ses 20 lancers cette semaine, et l'entraîneur sent que ce joueur reste calme sous pression. Quelle option décrit comment les trois sortes de probabilité se combinent dans cette décision ?",
      {t:"Le tableau donne la probabilité théorique, le bilan d'entraînement donne la probabilité expérimentale, et le sentiment de calme est un jugement subjectif", fb:"Exact : les résultats égaux sont théoriques, les résultats d'essais sont expérimentaux, et un sentiment est subjectif."},
      [{t:"Le tableau donne la probabilité expérimentale, le bilan d'entraînement donne la probabilité théorique, et le sentiment de calme est un jugement subjectif", fb:"Le tableau compte des résultats fixés, ce qui est théorique, tandis que les lancers d'entraînement comptés sont expérimentaux."},
       {t:"Le tableau donne la probabilité théorique, le bilan d'entraînement donne un jugement subjectif, et le sentiment de calme est une probabilité expérimentale", fb:"Les lancers d'entraînement comptés sont des données d'essais, et un sentiment est un jugement, donc ces deux sont échangés."},
       {t:"Le tableau donne un jugement subjectif, le bilan d'entraînement donne la probabilité expérimentale, et le sentiment de calme est une probabilité théorique", fb:"Un tableau de résultats égaux n'est pas un sentiment, et un sentiment n'est pas un comptage de résultats égaux."}],
      "Les décisions combinent souvent les trois sortes : la probabilité théorique des résultats également probables, la probabilité expérimentale des essais, et le jugement subjectif d'un sentiment personnel. Ici, la description exacte est <b>le tableau est théorique, le bilan d'entraînement est expérimental, et le sentiment de calme est un jugement subjectif</b>.",
      {mode:"combine-coach"});
  },
  function(){
    return mcq("Un joueur de jeu de société décide s'il risque un coup. Le dé donne six faces également probables, le joueur se souvient d'avoir obtenu de nombreux petits nombres dans les parties passées, et le joueur sent qu'un grand lancer est dû ce tour. Quelle option décrit comment les trois sortes de probabilité se combinent dans cette décision ?",
      {t:"Les faces du dé donnent la probabilité théorique, les lancers passés donnent la probabilité expérimentale, et le sentiment d'être dû est un jugement subjectif", fb:"Exact : les faces égales sont théoriques, les résultats dont on se souvient sont expérimentaux, et un sentiment d'être dû est subjectif."},
      [{t:"Les faces du dé donnent un jugement subjectif, les lancers passés donnent la probabilité théorique, et le sentiment d'être dû est une probabilité expérimentale", fb:"Les faces égales sont comptées, pas senties, et les lancers dont on se souvient sont des résultats d'essais plutôt que de la théorie."},
       {t:"Les faces du dé donnent la probabilité théorique, les lancers passés donnent un jugement subjectif, et le sentiment d'être dû est une probabilité expérimentale", fb:"Les lancers dont on se souvient sont des bilans d'essais, et un sentiment d'être dû est un jugement, donc ceux-ci sont échangés."},
       {t:"Les faces du dé donnent la probabilité expérimentale, les lancers passés donnent un jugement subjectif, et le sentiment d'être dû est une probabilité théorique", fb:"Aucune partie n'est bien associée ici : les faces sont comptées, les lancers sont des essais, et les sentiments sont des jugements."}],
      "Les décisions combinent souvent les trois sortes : la probabilité théorique des résultats également probables, la probabilité expérimentale des essais passés, et le jugement subjectif d'un sentiment personnel. Ici, la description exacte est <b>les faces du dé sont théoriques, les lancers passés sont expérimentaux, et le sentiment d'être dû est un jugement subjectif</b>.",
      {mode:"combine-boardgame"});
  },
  function(){
    return mcq("Une agricultrice de la vallée décide quand planter. Un modèle de prévision donne 60 % de chances de pluie cette semaine, ses propres champs ont donné de bonnes récoltes lors de 4 des 5 derniers printemps humides, et elle juge que son sol semble prêt quand elle le vérifie à la main. Quelle option décrit comment les trois sortes de probabilité se combinent dans cette décision ?",
      {t:"Le modèle de prévision donne la probabilité théorique, ses bilans de champs donnent la probabilité expérimentale, et son impression du sol est un jugement subjectif", fb:"Exact : une estimation de modèle est théorique, ses printemps notés sont expérimentaux, et la vérification à la main est subjective."},
      [{t:"Le modèle de prévision donne la probabilité expérimentale, ses bilans de champs donnent un jugement subjectif, et son impression du sol est une probabilité théorique", fb:"Ses propres printemps passés sont des bilans d'essais, pas des sentiments, et une vérification à la main est un jugement, pas un modèle."},
       {t:"Le modèle de prévision donne un jugement subjectif, ses bilans de champs donnent la probabilité expérimentale, et son impression du sol est une probabilité théorique", fb:"La prévision vient d'un modèle plutôt que d'un sentiment, et la vérification du sol est le jugement personnel."},
       {t:"Le modèle de prévision donne la probabilité théorique, ses bilans de champs donnent un jugement subjectif, et son impression du sol est une probabilité expérimentale", fb:"Les bilans de champs sur cinq printemps sont des données d'essais, tandis que l'impression du sol est la partie jugement."}],
      "Les décisions combinent souvent les trois sortes : la probabilité théorique d'un modèle, la probabilité expérimentale d'essais notés, et le jugement subjectif d'un sentiment personnel. Ici, la description exacte est <b>la prévision est théorique, les bilans de champs sont expérimentaux, et l'impression du sol est un jugement subjectif</b>.",
      {mode:"combine-farmer"});
  },
  function(){
    return mcq("Un capitaine de pêche décide s'il part à l'aube. Un modèle de prévision donne 30 % de chances de vents forts, son journal montre une mer agitée lors de 2 de ses 10 dernières sorties à l'aube, et il juge que le ciel semble calme quand il l'étudie au quai. Quelle option décrit comment les trois sortes de probabilité se combinent dans cette décision ?",
      {t:"Le modèle de prévision donne la probabilité théorique, le journal donne la probabilité expérimentale, et le jugement sur le ciel est un jugement subjectif", fb:"Exact : le modèle est théorique, les sorties notées sont expérimentales, et lire le ciel est subjectif."},
      [{t:"Le modèle de prévision donne un jugement subjectif, le journal donne la probabilité théorique, et le jugement sur le ciel est une probabilité expérimentale", fb:"Un journal est un bilan d'essais, pas de la théorie, et lire le ciel est un jugement, pas un essai."},
       {t:"Le modèle de prévision donne la probabilité théorique, le journal donne un jugement subjectif, et le jugement sur le ciel est une probabilité expérimentale", fb:"Les sorties passées notées sont des données d'essais, et une lecture personnelle du ciel est la partie jugement."},
       {t:"Le modèle de prévision donne la probabilité expérimentale, le journal donne un jugement subjectif, et le jugement sur le ciel est une probabilité théorique", fb:"L'estimation du modèle n'est pas des données d'essais, et ni le journal ni la lecture du ciel ne sont un comptage théorique."}],
      "Les décisions combinent souvent les trois sortes : la probabilité théorique d'un modèle, la probabilité expérimentale d'essais notés, et le jugement subjectif d'un sentiment personnel. Ici, la description exacte est <b>la prévision est théorique, le journal est expérimental, et le jugement sur le ciel est un jugement subjectif</b>.",
      {mode:"combine-captain"});
  },
  function(){
    return mcq("Un élève choisit à quel jeu de carnaval jouer. Un jeu gagne sur 2 des 8 sections également probables d'une roulette, l'élève a regardé 30 parties à un autre jeu et a vu 6 victoires, et l'élève sent que le troisième jeu est le plus chanceux de la rangée. Quelle option décrit comment les trois sortes de probabilité se combinent dans cette décision ?",
      {t:"Le comptage de la roulette donne la probabilité théorique, les parties regardées donnent la probabilité expérimentale, et le sentiment de chance est un jugement subjectif", fb:"Exact : les sections égales sont théoriques, les parties regardées sont expérimentales, et un sentiment de chance est subjectif."},
      [{t:"Le comptage de la roulette donne la probabilité expérimentale, les parties regardées donnent un jugement subjectif, et le sentiment de chance est une probabilité théorique", fb:"Compter des sections égales est de la théorie, les parties regardées sont des données d'essais, et la chance est un sentiment, donc les trois changent."},
       {t:"Le comptage de la roulette donne un jugement subjectif, les parties regardées donnent la probabilité expérimentale, et le sentiment de chance est une probabilité théorique", fb:"Un comptage de sections égales n'est pas un sentiment, et un sentiment de chance n'est pas un comptage de résultats."},
       {t:"Le comptage de la roulette donne la probabilité théorique, les parties regardées donnent un jugement subjectif, et le sentiment de chance est une probabilité expérimentale", fb:"Les parties regardées fournissent de vrais résultats d'essais, et le sentiment de chance est le jugement, donc ces deux sont échangés."}],
      "Les décisions combinent souvent les trois sortes : la probabilité théorique des résultats également probables, la probabilité expérimentale d'essais observés, et le jugement subjectif d'un sentiment personnel. Ici, la description exacte est <b>le comptage de la roulette est théorique, les parties regardées sont expérimentales, et le sentiment de chance est un jugement subjectif</b>.",
      {mode:"combine-carnival"});
  }
]), ["Trie la décision en trois parties : les résultats égaux comptés, les résultats d'essais et un sentiment personnel.", "Associe chaque détail dans l'ordre : les résultats égaux d'abord, les résultats d'essais ensuite, les sentiments à la fin."]);

E("u9-classify-probability", 9, ["12.4"], 1, "var", varset([
  function(){
    return mcq("Maya a lancé une pièce 50 fois et elle est tombée sur face 28 fois. Elle dit que sa chance d'obtenir face est de 28 sur 50. Quelle option classe ce jugement correctement ?",
      {t:"Probabilité expérimentale, parce qu'elle repose sur les résultats d'essais qui ont été faits", fb:"Exact : la valeur vient du comptage de ce qui s'est passé dans 50 essais réels."},
      [{t:"Probabilité théorique, parce qu'elle repose sur les résultats d'essais qui ont été faits", fb:"La raison nomme des essais, ce qui est expérimental ; la théorique compte plutôt des résultats également probables."},
       {t:"Jugement subjectif, parce qu'elle repose sur les résultats d'essais qui ont été faits", fb:"La raison nomme des résultats d'essais comptés, ce sont des données, tandis que le jugement subjectif repose sur un sentiment."},
       {t:"Probabilité théorique, parce qu'elle repose sur le comptage des côtés également probables d'une pièce", fb:"Maya a utilisé ses résultats de lancers, pas les deux côtés égaux, donc cette raison décrit un autre jugement."}],
      "Une probabilité construite à partir des résultats d'essais qui ont été faits est une probabilité expérimentale. Le classement exact est <b>probabilité expérimentale, parce qu'elle repose sur les résultats d'essais</b>.",
      {mode:"classify-flips"});
  },
  function(){
    return mcq("Liam compte les cartes d'un jeu complet et dit que sa chance de piger un cœur est de 13 sur 52, ou \\(\\frac{1}{4}\\). Quelle option classe ce jugement correctement ?",
      {t:"Probabilité théorique, parce qu'elle repose sur le comptage des cartes également probables d'un jeu", fb:"Exact : la valeur vient du comptage des résultats dans un jeu complet où chaque carte est également probable."},
      [{t:"Probabilité expérimentale, parce qu'elle repose sur le comptage des cartes également probables d'un jeu", fb:"La raison nomme le comptage de résultats égaux, ce qui est théorique ; l'expérimentale demande des résultats d'essais."},
       {t:"Jugement subjectif, parce qu'elle repose sur le comptage des cartes également probables d'un jeu", fb:"La raison nomme un comptage de résultats, ce qui est calculé, tandis que le jugement subjectif repose sur un sentiment."},
       {t:"Probabilité expérimentale, parce qu'elle repose sur les résultats de cartes pigées dans des parties précédentes", fb:"Liam a compté le jeu lui-même et n'a pigé aucune carte, donc aucun résultat de partie précédente n'est en jeu ici."}],
      "Une probabilité construite en comptant des résultats également probables est une probabilité théorique. Le classement exact est <b>probabilité théorique, parce qu'elle repose sur le comptage des cartes également probables</b>.",
      {mode:"classify-deck"});
  },
  function(){
    return mcq("Une enseignante regarde une nouvelle liste de classe et dit qu'elle sent qu'environ deux tiers de la classe aimeront la leçon extérieure, avant de rencontrer aucun des élèves. Quelle option classe ce jugement correctement ?",
      {t:"Jugement subjectif, parce qu'il repose sur un sentiment personnel sans comptages ni essais", fb:"Exact : sans résultats comptés et sans essais faits, l'estimation repose sur le sentiment personnel seul."},
      [{t:"Probabilité théorique, parce qu'il repose sur un sentiment personnel sans comptages ni essais", fb:"La raison nomme un sentiment sans comptages, ce qui est subjectif ; la théorique demande des résultats égaux comptés."},
       {t:"Probabilité expérimentale, parce qu'il repose sur un sentiment personnel sans comptages ni essais", fb:"La raison nomme un sentiment sans essais, ce qui est subjectif ; l'expérimentale demande des résultats d'essais."},
       {t:"Probabilité théorique, parce qu'il repose sur le comptage des noms de la liste", fb:"L'enseignante n'a rien compté sur la liste ; elle a donné un sentiment avant même de rencontrer la classe."}],
      "Une probabilité qui repose sur un sentiment personnel, sans comptages et sans essais, est un jugement subjectif. Le classement exact est <b>jugement subjectif, parce qu'il repose sur un sentiment personnel</b>.",
      {mode:"classify-teacher-feel"});
  },
  function(){
    return mcq("Une roulette a 8 sections égales et 2 d'entre elles sont rouges. Noah dit que la chance de tomber sur rouge est \\(\\frac{2}{8}\\), ou \\(\\frac{1}{4}\\). Quelle option classe ce jugement correctement ?",
      {t:"Probabilité théorique, parce qu'elle repose sur le comptage des sections également probables d'une roulette", fb:"Exact : la valeur vient du comptage des sections rouges parmi des sections égales, sans tours nécessaires."},
      [{t:"Probabilité expérimentale, parce qu'elle repose sur le comptage des sections également probables d'une roulette", fb:"La raison nomme le comptage de sections égales, ce qui est théorique ; l'expérimentale demande des résultats de tours."},
       {t:"Jugement subjectif, parce qu'elle repose sur le comptage des sections également probables d'une roulette", fb:"La raison nomme un comptage de sections, ce qui est calculé, tandis que le jugement subjectif repose sur un sentiment."},
       {t:"Probabilité expérimentale, parce qu'elle repose sur les résultats de tours que l'élève a faits plus tôt", fb:"Noah a compté les sections et n'a fait aucun tour, donc aucun résultat de tour précédent n'est en jeu ici."}],
      "Une probabilité construite en comptant des résultats également probables est une probabilité théorique : \\(\\frac{2}{8} = \\frac{1}{4}\\). Le classement exact est <b>probabilité théorique, parce qu'elle repose sur le comptage des sections également probables</b>.",
      {mode:"classify-spinner"});
  },
  function(){
    return mcq("Sofia a fait 20 lancers d'entraînement à un panier et a marqué lors de 11 d'entre eux. Elle dit que sa chance de marquer au prochain lancer est de 11 sur 20. Quelle option classe ce jugement correctement ?",
      {t:"Probabilité expérimentale, parce qu'elle repose sur les résultats d'essais qui ont été faits", fb:"Exact : la valeur vient du comptage des points dans 20 essais d'entraînement réels."},
      [{t:"Probabilité théorique, parce qu'elle repose sur les résultats d'essais qui ont été faits", fb:"La raison nomme des essais, ce qui est expérimental ; la théorique compte plutôt des résultats également probables."},
       {t:"Jugement subjectif, parce qu'elle repose sur les résultats d'essais qui ont été faits", fb:"La raison nomme des résultats d'essais comptés, ce sont des données, tandis que le jugement subjectif repose sur un sentiment."},
       {t:"Jugement subjectif, parce qu'elle repose sur la confiance que la joueuse sent à l'entraînement", fb:"Sofia a utilisé ses points comptés, pas sa confiance, donc cette raison décrit un autre jugement."}],
      "Une probabilité construite à partir des résultats d'essais qui ont été faits est une probabilité expérimentale. Le classement exact est <b>probabilité expérimentale, parce qu'elle repose sur les résultats d'essais</b>.",
      {mode:"classify-shots"});
  },
  function(){
    return mcq("Un vieux marin de la communauté regarde le ciel du soir et dit qu'il sent qu'il y a une bonne chance de tempête demain, sans vérifier aucune prévision ni aucun registre. Quelle option classe ce jugement correctement ?",
      {t:"Jugement subjectif, parce qu'il repose sur un sentiment personnel sans comptages ni essais", fb:"Exact : sans prévision comptée et sans registres vérifiés, l'estimation repose sur le sentiment personnel."},
      [{t:"Probabilité théorique, parce qu'il repose sur un sentiment personnel sans comptages ni essais", fb:"La raison nomme un sentiment sans comptages, ce qui est subjectif ; la théorique demande des résultats égaux comptés."},
       {t:"Probabilité expérimentale, parce qu'il repose sur un sentiment personnel sans comptages ni essais", fb:"La raison nomme un sentiment sans essais, ce qui est subjectif ; l'expérimentale demande des résultats d'essais."},
       {t:"Probabilité expérimentale, parce qu'il repose sur les registres météo du marin", fb:"Le marin n'a vérifié aucun registre pour cet appel ; il a donné un sentiment en regardant le ciel."}],
      "Une probabilité qui repose sur un sentiment personnel, sans comptages et sans essais, est un jugement subjectif. Le classement exact est <b>jugement subjectif, parce qu'il repose sur un sentiment personnel</b>.",
      {mode:"classify-sailor"});
  }
]), ["Demande-toi d'où vient le nombre : des résultats égaux comptés, des résultats d'essais ou un sentiment personnel.", "Cherche dans l'histoire des essais qui ont vraiment été faits ; leur présence pointe vers la probabilité expérimentale."]);
// TRANSLATOR NOTES
// - Termes absents du glossaire, choix retenus partout dans le morceau : use of language = le langage; privacy = la vie privée; time and timing = le temps et le moment; cultural sensitivity = la sensibilité culturelle; ethics = l'éthique; cost = le coût; rubric = grille d'évaluation; question for investigation = question de recherche; generalization = généralisation; self assessment = autoévaluation; findings = résultats.
// - Aucun appel fmt(, fmtF( ou .toFixed dans ce morceau : aucun remplacement fmtD/fmtDF et aucune ligne /* FMT-GEOM */.
// - Nombres formatés littéraux écrits dans le texte statique, pour la réconciliation avec les guides : "4 000" (1 fois, les 4 000 ménages) et "2 000" (2 fois, l'envoi de 2 000 piles), tous deux avec une espace insécable. Aucun autre nombre formaté littéral dans le texte : pas de décimale, pas de %, pas de $. Les codes d'indicateurs ("11.1" à "11.10") restent inchangés, comme exigé.
// - Bay Street gardé comme nom de rue; le prénom Jordan reste inchangé. "Grade 4 / Grade 9" rendus par "4e année / 9e année" selon l'usage scolaire.

E("u9-collection-problem", 9, ["11.1"], 1, "var", varset([
  function(){
    return mcq("Pour savoir ce que toute une ville pense de la construction d'un nouvel aréna, un journaliste interroge seulement des partisans qui sortent d'un match de hockey dans l'ancien aréna. Quel est le principal problème de cette collecte de données ?",
      {t:"Biais, parce que les partisans à un seul match ne représentent pas toute la ville étudiée", fb:"Exact : le groupe interrogé est d'un seul côté, donc les résultats favorisent les partisans et oublient les autres résidents."},
      [{t:"Le langage, parce que la question posée au match était formulée pour pousser vers une réponse", fb:"Aucune formulation n'est décrite ici; le problème est qui a été interrogé, pas comment la question était posée."},
       {t:"La vie privée, parce que les partisans devaient donner leur nom avec leurs réponses", fb:"Les noms ne sont jamais mentionnés ici; le problème est que seuls des partisans ont été interrogés sur une question pour toute la ville."},
       {t:"Le coût, parce qu'interroger des partisans au match coûte plus cher qu'envoyer un sondage par la poste aux maisons", fb:"Le coût n'est jamais soulevé ici; le problème est qu'un groupe d'un seul côté parle pour toute la ville."}],
      "Interroger seulement des partisans sur une question pour toute la ville donne un échantillon biaisé, parce que le groupe interrogé ne représente pas la population. Le principal problème est le <b>biais, parce que les partisans à un seul match ne représentent pas toute la ville</b>.",
      {mode:"problem-fans"});
  },
  function(){
    return mcq("Un sondage scolaire sur un nouvel autobus tardif demande aux élèves : « Êtes-vous d'accord que tout le monde a besoin de notre merveilleux nouvel autobus tardif ? » Quel est le principal problème de cette collecte de données ?",
      {t:"Le langage, parce que la formulation pousse les élèves à être d'accord avec l'autobus", fb:"Exact : les mots de louange et la pression pour être d'accord mènent les élèves vers une réponse avant qu'ils réfléchissent."},
      [{t:"Biais, parce que seuls les élèves qui prennent l'autobus tardif ont reçu le sondage à l'école", fb:"Le sondage est allé aux élèves en général; le problème est la formulation qui oriente, pas qui l'a reçu."},
       {t:"Éthique, parce que les élèves recevaient un prix pour remplir le sondage à l'école", fb:"Aucun prix n'est mentionné ici; le problème est une formulation qui pousse les élèves vers une réponse."},
       {t:"Le temps et le moment, parce que le sondage a été distribué pendant la semaine d'examens la plus chargée", fb:"Le moment n'est jamais mentionné ici; le problème est la formulation orientée de la question elle-même."}],
      "Une formulation qui loue un choix et pousse à être d'accord est un problème de langage, parce qu'elle oriente les réponses au lieu de les mesurer. Le principal problème est le <b>langage, parce que la formulation pousse les élèves à être d'accord</b>.",
      {mode:"problem-latebus"});
  },
  function(){
    return mcq("En juin, une ville envoie par la poste un sondage qui demande aux résidents à quel point ils étaient satisfaits du déneigement de leurs rues l'hiver passé. Quel est le principal problème de cette collecte de données ?",
      {t:"Le temps et le moment, parce que les souvenirs d'hiver se sont effacés quand juin arrive", fb:"Exact : demander des mois plus tard donne des souvenirs effacés et des opinions changées, ce qui gâche les réponses."},
      [{t:"Biais, parce que seuls les résidents avec une entrée de cour ont reçu le sondage en juin", fb:"Le sondage est allé aux résidents en général; le problème est le moment tardif, pas qui l'a reçu."},
       {t:"Sensibilité culturelle, parce que le sondage ignore comment les différentes familles soulignent l'hiver", fb:"La façon de souligner l'hiver n'est pas le problème ici; le problème est de demander longtemps après la saison."},
       {t:"Vie privée, parce que les résidents devaient signer leur nom sur le formulaire envoyé par la poste", fb:"Les noms ne sont jamais mentionnés ici; le problème est de demander au sujet de l'hiver bien après sa fin."}],
      "Demander au sujet d'un service d'hiver en juin est un problème de temps et de moment, parce que les souvenirs s'effacent et les conditions changent. Le principal problème est le <b>temps et le moment, parce que les souvenirs d'hiver se sont effacés en juin</b>.",
      {mode:"problem-snow"});
  },
  function(){
    return mcq("Un sondage de classe sur le revenu familial demande à chaque élève d'écrire son nom en haut, et l'enseignant lit les sondages remplis à voix haute pour les vérifier. Quel est le principal problème de cette collecte de données ?",
      {t:"Vie privée, parce que les noms lient des réponses sensibles sur le revenu à chaque élève de la classe", fb:"Exact : le revenu est sensible, et les noms plus la lecture à voix haute exposent des renseignements privés."},
      [{t:"Coût, parce qu'imprimer une ligne pour le nom sur chaque sondage utilise plus d'encre et de papier qu'avant", fb:"Le coût d'impression est minime ici; le problème est d'exposer des réponses sensibles liées à des noms."},
       {t:"Le langage, parce que la question sur le revenu était formulée pour pousser vers une réponse", fb:"Aucune formulation orientée n'est décrite ici; le problème est les noms liés à des réponses sensibles."},
       {t:"Biais, parce que seuls les élèves présents ce jour-là pouvaient faire le sondage de la classe", fb:"La présence n'est pas le problème soulevé ici; le problème est des réponses privées liées aux noms des élèves."}],
      "Recueillir des réponses sensibles avec les noms, puis les lire à voix haute, est un problème de vie privée. Le principal problème est la <b>vie privée, parce que les noms lient des réponses sensibles sur le revenu à chaque élève</b>.",
      {mode:"problem-income"});
  },
  function(){
    return mcq("Un sondage de cafétéria sur les repas préférés liste seulement des aliments d'une seule tradition culturelle et demande à tous les élèves pourquoi ils ne mangent pas les aliments que leurs familles servent à la maison. Quel est le principal problème de cette collecte de données ?",
      {t:"Sensibilité culturelle, parce que le sondage traite une tradition comme la norme pour tout le monde", fb:"Exact : les choix et la question rejettent les traditions alimentaires de beaucoup de familles de l'école."},
      [{t:"Le temps et le moment, parce que le sondage a été distribué juste avant la cloche du dîner de l'école", fb:"Le moment n'est jamais mentionné ici; le problème est de traiter une tradition alimentaire comme la norme."},
       {t:"Coût, parce qu'imprimer une liste de menu plus longue pour le sondage coûterait trop cher à l'école", fb:"Le coût n'est jamais soulevé ici; le problème est un sondage bâti autour d'une seule tradition culturelle."},
       {t:"Éthique, parce que les élèves recevaient un dîner gratuit pour remplir le formulaire du sondage", fb:"Aucune promesse n'est mentionnée ici; le problème est le manque de respect envers les traditions des familles."}],
      "Un sondage qui traite une tradition culturelle comme la norme pour tout le monde montre un problème de sensibilité culturelle. Le principal problème est la <b>sensibilité culturelle, parce que le sondage traite une tradition comme la norme</b>.",
      {mode:"problem-cafeteria"});
  },
  function(){
    return mcq("Pour un projet sur les règles familiales, une classe interroge des élèves de 4e année dans le corridor sans d'abord demander la permission de leurs enseignants ou de leurs parents. Quel est le principal problème de cette collecte de données ?",
      {t:"Éthique, parce que de jeunes élèves ont été interrogés sans la permission des adultes responsables", fb:"Exact : interroger de jeunes enfants sans consentement traite les participants injustement, ce qui est un problème d'éthique."},
      [{t:"Biais, parce que seuls les élèves de 4e année qui passent dans ce corridor ont été interrogés ce jour-là", fb:"Le groupe du corridor est un détail secondaire; le problème central est d'interroger des enfants sans permission."},
       {t:"Vie privée, parce que les élèves devaient dire leur adresse à la maison dans le corridor", fb:"Les adresses ne sont jamais mentionnées ici; le problème est la permission manquante pour interroger de jeunes élèves."},
       {t:"Le langage, parce que les questions utilisaient des mots que les plus jeunes élèves trouvaient confus", fb:"Des mots confus ne sont pas décrits ici; le problème est d'interroger des enfants sans consentement."}],
      "Interroger de jeunes élèves sans la permission des adultes responsables d'eux est un problème d'éthique. Le principal problème est l'<b>éthique, parce que de jeunes élèves ont été interrogés sans permission</b>.",
      {mode:"problem-permission"});
  }
]), ["Nomme l'influence à l'œuvre : qui a été interrogé, comment c'était formulé, quand ça s'est passé, ou comment les gens ont été traités.", "Vérifie d'abord qui a été interrogé; un groupe d'un seul côté pointe vers le biais avant tout autre facteur."]);

E("u9-collection-biggest-threat", 9, ["11.1"], 3, "var", varset([
  function(){
    return mcq("Un sondage sur le site Web d'une ville au sujet d'une nouvelle piscine permet à n'importe qui de voter aussi souvent qu'il le veut, et il reste ouvert pendant une semaine. Des partisans partagent le lien partout dès le premier jour. Quel problème menace le plus la validité des résultats ?",
      {t:"Biais, parce que les votes répétés et les liens partagés laissent un groupe motivé inonder les résultats", fb:"Exact : des votes répétés sans limite brisent tout lien entre les résultats et la ville au complet."},
      [{t:"Le temps et le moment, parce qu'une période d'une semaine peut manquer des résidents absents cette semaine-là", fb:"Une courte période compte, mais le flot de votes répétés peut noyer le compte bien au-delà d'un écart de moment."},
       {t:"Coût, parce que faire fonctionner un sondage Web pendant une semaine complète ajoute des frais de plus", fb:"Le coût d'hébergement touche le budget, pas si les votes comptés reflètent toute la ville."},
       {t:"Le langage, parce que la question du sondage est écrite en mots courts et simples que tous comprennent", fb:"Une formulation simple est une force ici; la menace est qui peut voter et combien de fois."}],
      "Deux influences sont présentes, mais les votes répétés plus le partage du lien créent un biais qui peut dépasser tout autre souci, parce que les résultats cessent de représenter la ville. La plus grande menace est le <b>biais, parce que les votes répétés laissent un groupe motivé inonder les résultats</b>.",
      {mode:"threat-repeatpoll"});
  },
  function(){
    return mcq("Un sondage sur les heures de début d'école utilise une formulation un peu orientée, et il est donné seulement à la capitaine de l'équipe et à quatre de ses amies pour répondre pour les 300 élèves de l'école. Quel problème menace le plus la validité des résultats ?",
      {t:"Biais, parce que cinq amies ne peuvent pas parler pour l'opinion des 300 élèves de l'école", fb:"Exact : même une formulation parfaite ne peut pas corriger des réponses venues de cinq amies pour toute une école."},
      [{t:"Le langage, parce qu'une formulation un peu orientée peut pousser les élèves vers une réponse", fb:"La formulation orientée compte, mais elle touche cinq réponses ici, pendant que le petit groupe décide de tout."},
       {t:"Éthique, parce que la capitaine devait parler pour ses amies sans leur consentement", fb:"Le consentement est un souci secondaire ici; les résultats échouent surtout parce que le groupe est petit et d'un seul côté."},
       {t:"Vie privée, parce que les cinq amies pouvaient voir les réponses des autres en remplissant le sondage", fb:"Voir les réponses des autres est mineur à côté du problème central : cinq amies qui remplacent 300 élèves."}],
      "Deux influences sont présentes, mais un échantillon de cinq amies pour 300 élèves crée un biais qu'aucune correction de formulation ne peut réparer, parce que le groupe ne peut pas représenter l'école. La plus grande menace est le <b>biais, parce que cinq amies ne peuvent pas parler pour les 300 élèves</b>.",
      {mode:"threat-fivefriends"});
  },
  function(){
    return mcq("Un sondage sur la santé coûte cher à imprimer et à livrer, et les formulaires remplis, avec les noms des élèves à côté de réponses sensibles sur la santé, sont affichés sur un tableau de classe pour que la classe les lise. Quel problème menace le plus la validité des résultats ?",
      {t:"Vie privée, parce que les noms et les réponses sur la santé exposés empêcheront les élèves de répondre honnêtement", fb:"Exact : quand les réponses sont publiques, les élèves cachent la vérité, donc les données elles-mêmes deviennent peu fiables."},
      [{t:"Coût, parce qu'imprimer et livrer le sondage utilise une grande part du budget prévu pour le projet de la classe au complet", fb:"Un coût élevé limite le nombre de sondages, mais des réponses exposées corrompent les réponses déjà données."},
       {t:"Biais, parce que seuls les élèves de cette classe ont reçu le sondage sur la santé à l'école", fb:"Une seule classe limite la portée, mais l'exposition publique change ce que les élèves osent écrire."},
       {t:"Le temps et le moment, parce que le sondage est resté affiché pendant une semaine complète de classes", fb:"La durée d'affichage est un détail secondaire; la menace est des réponses sensibles liées à des noms, à la vue de tous."}],
      "Deux influences sont présentes, mais afficher des réponses nominatives sur la santé en public est un échec de vie privée qui change l'honnêteté des réponses, donc on ne peut pas se fier aux résultats. La plus grande menace est la <b>vie privée, parce que les noms et les réponses sur la santé exposés empêcheront des réponses honnêtes</b>.",
      {mode:"threat-board"});
  },
  function(){
    return mcq("Un sondage sur le dîner se déroule pendant une semaine d'examens chargée, et ses questions traitent une tradition alimentaire culturelle comme normale tout en décrivant les aliments d'autres familles comme des choix inhabituels. Beaucoup de familles sautent le sondage au complet. Quel problème menace le plus la validité des résultats ?",
      {t:"Sensibilité culturelle, parce que les familles offensées sautent le sondage, donc des groupes entiers manquent", fb:"Exact : quand des groupes entiers refusent, les réponses manquantes déforment les résultats plus qu'une semaine chargée."},
      [{t:"Le temps et le moment, parce que la semaine d'examens laisse peu de temps aux familles pour répondre à la maison", fb:"Une semaine chargée réduit les réponses, mais les familles offensées manquent pour une raison liée aux questions."},
       {t:"Coût, parce que réimprimer le sondage avec de meilleures questions coûterait plus cher pour le budget de l'école", fb:"Le coût de réimpression est une question de budget, pas la raison de l'absence de groupes entiers de familles."},
       {t:"Éthique, parce que les familles recevaient une petite chance à un tirage pour retourner le sondage rempli", fb:"Un tirage est un détail secondaire ici; les résultats échouent parce que les questions éloignent des groupes."}],
      "Deux influences sont présentes, mais des questions qui rejettent les traditions alimentaires des familles créent un échec de sensibilité culturelle qui retire des groupes entiers des résultats. La plus grande menace est la <b>sensibilité culturelle, parce que les familles offensées sautent le sondage et des groupes entiers manquent</b>.",
      {mode:"threat-lunchsurvey"});
  },
  function(){
    return mcq("Un intervieweur utilise des questions simples et claires, et offre aux élèves une collation gratuite seulement s'ils disent qu'ils aiment un nouveau jus à l'essai. La plupart des élèves louent le jus. Quel problème menace le plus la validité des résultats ?",
      {t:"Éthique, parce que récompenser seulement les louanges pousse les élèves à donner des réponses malhonnêtes", fb:"Exact : lier une récompense à une seule réponse traite les élèves injustement et remplit les données de fausses louanges."},
      [{t:"Le langage, parce que des questions simples et claires peuvent quand même guider les réponses des élèves", fb:"Une formulation simple est une force dans ce cas; la pression vient de la récompense, pas des mots."},
       {t:"Biais, parce que les élèves qui aiment les collations sont plus portés à accepter l'entrevue proposée", fb:"Aimer les collations joue un petit rôle; la récompense pour les louanges achète directement les réponses notées."},
       {t:"Coût, parce qu'acheter des collations pour les entrevues ajoute beaucoup au coût de l'étude menée par les élèves", fb:"Le coût des collations touche le budget, pas si on peut croire les louanges notées."}],
      "Deux influences sont présentes, mais récompenser seulement les réponses positives est un échec d'éthique qui pousse les élèves vers des réponses malhonnêtes, donc on ne peut pas se fier aux louanges. La plus grande menace est l'<b>éthique, parce que récompenser seulement les louanges pousse les élèves à donner des réponses malhonnêtes</b>.",
      {mode:"threat-snack"});
  }
]), ["Deux influences peuvent apparaître ensemble : juge laquelle fait le plus de dommage à la confiance qu'on peut avoir dans les résultats.", "Demande-toi quel problème change les réponses elles-mêmes, pas seulement le coût ou l'horaire de l'étude."]);

E("u9-match-influence", 9, ["11.2"], 1, "var", varset([
  function(){
    return mcq("Une ville veut sonder chaque ménage au sujet des réparations de routes. Imprimer et poster un long sondage aux 4 000 ménages, avec du personnel pour lire les réponses, utiliserait tout le budget annuel des sondages. Quelle influence cette situation illustre-t-elle ?",
      {t:"Coût, parce que joindre toute la population dépenserait tout le budget des sondages", fb:"Exact : l'argent est l'influence qui limite, car une couverture complète coûte plus que ce que la ville peut dépenser."},
      [{t:"Biais, parce que les ménages avec une boîte aux lettres répondraient plus souvent que les autres", fb:"L'accès aux boîtes aux lettres n'est pas soulevé ici; la limite énoncée est le prix pour joindre tout le monde."},
       {t:"Vie privée, parce que les ménages devraient partager des détails sur leurs routes", fb:"Les détails de réparation de routes sont des renseignements de travaux publics; la limite énoncée est le budget de l'envoi."},
       {t:"Le temps et le moment, parce que lire des milliers de réponses prendrait des semaines au personnel", fb:"Le temps de lecture est plausible, mais la situation insiste sur le budget dépensé au complet, ce qui est le coût."}],
      "Quand l'argent nécessaire pour joindre tout le monde est le facteur qui limite, l'influence est le coût. Cette situation illustre le <b>coût, parce que joindre toute la population dépenserait tout le budget</b>.",
      {mode:"match-cost"});
  },
  function(){
    return mcq("Une coopérative agricole sonde ses membres au sujet de l'aide aux récoltes pendant la semaine de récolte la plus chargée, quand les membres travaillent de longues journées dans les champs. Très peu de membres répondent. Quelle influence cette situation illustre-t-elle ?",
      {t:"Le temps et le moment, parce que le sondage est arrivé quand les membres n'avaient pas le temps d'y répondre", fb:"Exact : le moment choisi pour le sondage entre en conflit avec la semaine la plus chargée de l'année agricole."},
      [{t:"Le langage, parce que les questions du sondage étaient écrites en termes agricoles techniques du domaine", fb:"La formulation des questions n'est pas décrite ici; le problème énoncé est la semaine d'arrivée du sondage."},
       {t:"Sensibilité culturelle, parce que le sondage ignorait comment les familles membres soulignent le temps des récoltes", fb:"Les coutumes de récolte ne sont pas soulevées ici; le problème énoncé est que les membres n'ont pas de temps libre."},
       {t:"Éthique, parce que les membres subissaient de la pression pour répondre pendant leur semaine de travail la plus chargée", fb:"La pression n'est pas décrite ici; l'influence montrée est le mauvais moment du sondage lui-même."}],
      "Quand le moment choisi pour un sondage entre en conflit avec la vie des gens interrogés, l'influence est le temps et le moment. Cette situation illustre le <b>temps et le moment, parce que le sondage est arrivé quand les membres n'avaient pas le temps de répondre</b>.",
      {mode:"match-timing"});
  },
  function(){
    return mcq("Un sondage sur les activités de fin de semaine liste seulement les événements d'un groupe communautaire comme choix de réponses, donc les élèves d'autres milieux ne trouvent aucune de leurs activités habituelles dans la liste. Quelle influence cette situation illustre-t-elle ?",
      {t:"Sensibilité culturelle, parce que les choix laissent de côté les activités de beaucoup de milieux", fb:"Exact : des choix de réponses bâtis autour d'un groupe oublient les traditions de l'école au complet."},
      [{t:"Biais, parce que seuls les élèves de ce groupe communautaire ont reçu le sondage en classe", fb:"Le sondage est allé aux élèves en général; le problème est la liste de choix, pas qui a reçu le formulaire."},
       {t:"Coût, parce qu'ajouter plus de choix de réponses rendrait le sondage plus long à imprimer pour tous", fb:"La longueur d'impression n'est pas soulevée ici; le problème énoncé est des choix qui excluent beaucoup d'élèves."},
       {t:"Vie privée, parce que les élèves doivent révéler leurs activités de fin de semaine à leurs camarades", fb:"Les activités de fin de semaine ici sont des choix ordinaires; le problème énoncé est une liste qui oublie des groupes entiers."}],
      "Quand les choix de réponses sont bâtis autour d'un groupe et en oublient d'autres, l'influence est la sensibilité culturelle. Cette situation illustre la <b>sensibilité culturelle, parce que les choix laissent de côté beaucoup de milieux</b>.",
      {mode:"match-cultural"});
  },
  function(){
    return mcq("Une station de radio tient un sondage par appels qui demande aux auditeurs si son émission du matin est la meilleure en ville. Seuls les auditeurs motivés appellent, beaucoup d'entre eux des partisans quotidiens de l'émission. Quelle influence cette situation illustre-t-elle ?",
      {t:"Biais, parce que les partisans motivés qui choisissent d'appeler ne représentent pas tous les auditeurs de la ville", fb:"Exact : des volontaires qui aiment déjà l'émission penchent les résultats dans une direction dès le départ."},
      [{t:"Le langage, parce que la question du sondage loue l'émission du matin dans sa formulation même", fb:"La formulation ici est simple; le problème est que seuls des partisans qui se choisissent eux-mêmes participent."},
       {t:"Le temps et le moment, parce que le sondage se déroule tôt le matin, quand beaucoup de gens travaillent à cette heure", fb:"L'heure compte moins que qui appelle : les appelants sont des partisans, pas un reflet de la ville."},
       {t:"Coût, parce que tenir un sondage par téléphone chaque matin ajoute à la facture de téléphone de la station", fb:"Le coût du téléphone n'est pas soulevé ici; le problème énoncé est un groupe d'un seul côté qui répond à la question."}],
      "Quand les gens qui répondent sont des partisans qui se choisissent eux-mêmes plutôt qu'un reflet de tous, l'influence est le biais. Cette situation illustre le <b>biais, parce que les partisans motivés qui appellent ne représentent pas tous les auditeurs</b>.",
      {mode:"match-bias"});
  },
  function(){
    return mcq("Un sondage de bibliothèque demande aux visiteurs : « À quel point aimez-vous notre nouvelle salle de lecture incroyable et primée ? » La plupart des visiteurs choisissent la réponse du haut. Quelle influence cette situation illustre-t-elle ?",
      {t:"Le langage, parce que les mots de louange dans la question poussent les visiteurs vers la réponse du haut", fb:"Exact : des louanges chargées dans la formulation orientent les réponses avant que les visiteurs jugent la salle eux-mêmes."},
      [{t:"Biais, parce que seuls les visiteurs qui utilisent la salle de lecture ont reçu la question du sondage", fb:"Interroger les usagers de la salle est raisonnable ici; le problème est une formulation de louange qui dirige leurs réponses."},
       {t:"Éthique, parce que les visiteurs recevaient un signet de la bibliothèque pour répondre à la question du sondage", fb:"Aucune offre n'est mentionnée ici; le problème énoncé est une formulation pleine de louanges pour la salle."},
       {t:"Sensibilité culturelle, parce que la question suppose que tous les visiteurs lisent de la même façon", fb:"Les habitudes de lecture selon les cultures ne sont pas soulevées ici; le problème est des louanges orientées dans la formulation."}],
      "Quand la formulation loue une réponse et pousse les répondants vers elle, l'influence est le langage. Cette situation illustre le <b>langage, parce que les mots de louange poussent les visiteurs vers la réponse du haut</b>.",
      {mode:"match-language"});
  },
  function(){
    return mcq("Un sondage scolaire sur la santé demande aux élèves d'écrire leur nom et les médicaments qu'ils prennent sur le même formulaire, et les camarades de classe passent les formulaires remplis vers l'avant de la classe. Quelle influence cette situation illustre-t-elle ?",
      {t:"Vie privée, parce que les noms et les détails sur les médicaments peuvent être vus par les camarades qui manipulent les formulaires", fb:"Exact : des détails sensibles sur la santé liés à des noms sont exposés quand les formulaires passent entre beaucoup de mains."},
      [{t:"Coût, parce qu'imprimer une ligne pour le nom et une ligne pour les médicaments rend chaque formulaire plus long à remplir pour chaque élève de la classe", fb:"La longueur du formulaire est minime ici; le problème énoncé est des détails sensibles exposés aux camarades."},
       {t:"Le temps et le moment, parce que passer les formulaires vers l'avant prend beaucoup de temps à la fin du cours", fb:"Le temps pour passer les formulaires est un détail secondaire; l'influence montrée est des renseignements privés visibles par d'autres."},
       {t:"Biais, parce que les élèves qui prennent des médicaments peuvent choisir de laisser le sondage complètement vide", fb:"Des formulaires vides pourraient suivre, mais l'influence illustrée est des détails privés vus par les camarades."}],
      "Quand des détails personnels sensibles peuvent être vus par d'autres pendant la collecte, l'influence est la vie privée. Cette situation illustre la <b>vie privée, parce que les noms et les détails sur les médicaments peuvent être vus par les camarades de classe</b>.",
      {mode:"match-privacy"});
  }
]), ["Associe la situation à l'influence qu'elle montre le plus clairement : l'argent, le moment, la formulation, qui répond, ou les détails privés.", "Souligne le détail de l'histoire qui fait le dommage, puis nomme l'influence à laquelle ce détail appartient."]);

E("u9-sample-or-population", 9, ["11.3"], 1, "var", varset([
  function(){
    return mcq("Une population, c'est tout le monde dans le groupe étudié, et un échantillon, c'est une partie de ce groupe. Un directeur interroge chaque élève de l'école au sujet des choix de dîner pour la cafétéria. Quelle option classe cela correctement ?",
      {t:"Une population, parce que tout le monde dans le groupe étudié a été inclus dans les questions", fb:"Exact : chaque élève de l'école a été interrogé, donc tout le groupe étudié a participé."},
      [{t:"Un échantillon, parce que tout le monde dans le groupe étudié a été inclus dans les questions", fb:"La raison décrit tout le monde qui participe, ce qui est une population, donc l'étiquette et la raison se contredisent."},
       {t:"Une population, parce que seulement une partie du groupe étudié a été incluse dans les questions", fb:"La raison décrit seulement une partie qui participe, ce qui est un échantillon, donc l'étiquette et la raison se contredisent."},
       {t:"Un échantillon, parce que les élèves interrogés ont été choisis en tirant des noms au hasard", fb:"Aucun nom n'a été tiré ici; le directeur a interrogé chaque élève de l'école directement."}],
      "Quand tout le monde dans le groupe étudié est inclus, l'étude utilise une population. La bonne classification est <b>une population, parce que tout le monde dans le groupe a été inclus</b>.",
      {mode:"sampop-school"});
  },
  function(){
    return mcq("Une population, c'est tout le monde dans le groupe étudié, et un échantillon, c'est une partie de ce groupe. Une usine teste 20 piles d'un envoi de 2 000 pour vérifier la durée de vie des piles. Quelle option classe cela correctement ?",
      {t:"Un échantillon, parce que seulement une partie du groupe étudié a été incluse dans les tests", fb:"Exact : 20 piles sur 2 000, c'est une partie de l'envoi, donc l'usine a testé un échantillon."},
      [{t:"Une population, parce que seulement une partie du groupe étudié a été incluse dans les tests", fb:"La raison décrit seulement une partie qui participe, ce qui est un échantillon, donc l'étiquette et la raison se contredisent."},
       {t:"Un échantillon, parce que tout le monde dans le groupe étudié a été inclus dans les tests", fb:"La raison décrit tout le monde qui participe, ce qui est une population, donc l'étiquette et la raison se contredisent."},
       {t:"Une population, parce que les piles testées ont été choisies en les tirant au hasard", fb:"Un choix au hasard teste quand même seulement une partie de l'envoi, et une partie est toujours un échantillon."}],
      "Quand seulement une partie du groupe étudié est incluse, l'étude utilise un échantillon. La bonne classification est <b>un échantillon, parce que seulement une partie du groupe a été incluse</b>.",
      {mode:"sampop-batteries"});
  },
  function(){
    return mcq("Une population, c'est tout le monde dans le groupe étudié, et un échantillon, c'est une partie de ce groupe. Le président d'un club interroge les 12 membres d'un petit club d'échecs au sujet d'un nouveau jour de rencontre. Quelle option classe cela correctement ?",
      {t:"Une population, parce que tout le monde dans le groupe étudié a été inclus dans les questions", fb:"Exact : les 12 membres ont été interrogés, donc tout le groupe étudié a participé au complet."},
      [{t:"Un échantillon, parce que tout le monde dans le groupe étudié a été inclus dans les questions", fb:"La raison décrit tout le monde qui participe, ce qui est une population, donc l'étiquette et la raison se contredisent."},
       {t:"Une population, parce que seulement une partie du groupe étudié a été incluse dans les questions", fb:"La raison décrit seulement une partie qui participe, ce qui est un échantillon, donc l'étiquette et la raison se contredisent."},
       {t:"Un échantillon, parce que les membres interrogés ont été choisis en tirant des noms au hasard", fb:"Aucun nom n'a été tiré ici; le président a interrogé les 12 membres du club directement."}],
      "Quand tout le monde dans le groupe étudié est inclus, l'étude utilise une population. La bonne classification est <b>une population, parce que tout le monde dans le groupe a été inclus</b>.",
      {mode:"sampop-chess"});
  },
  function(){
    return mcq("Une population, c'est tout le monde dans le groupe étudié, et un échantillon, c'est une partie de ce groupe. Un épicier vérifie 25 pommes d'un envoi de 500 pommes pour des meurtrissures. Quelle option classe cela correctement ?",
      {t:"Un échantillon, parce que seulement une partie du groupe étudié a été incluse dans la vérification", fb:"Exact : 25 pommes sur 500, c'est une partie de l'envoi, donc l'épicier a vérifié un échantillon."},
      [{t:"Une population, parce que seulement une partie du groupe étudié a été incluse dans la vérification", fb:"La raison décrit seulement une partie qui participe, ce qui est un échantillon, donc l'étiquette et la raison se contredisent."},
       {t:"Un échantillon, parce que tout le monde dans le groupe étudié a été inclus dans la vérification", fb:"La raison décrit tout le monde qui participe, ce qui est une population, donc l'étiquette et la raison se contredisent."},
       {t:"Une population, parce que les pommes vérifiées ont été choisies en les tirant au hasard", fb:"Un choix au hasard vérifie quand même seulement une partie de l'envoi, et une partie est toujours un échantillon."}],
      "Quand seulement une partie du groupe étudié est incluse, l'étude utilise un échantillon. La bonne classification est <b>un échantillon, parce que seulement une partie du groupe a été incluse</b>.",
      {mode:"sampop-apples"});
  },
  function(){
    return mcq("Une population, c'est tout le monde dans le groupe étudié, et un échantillon, c'est une partie de ce groupe. Une ville qui étudie tous ses ménages sonde chaque ménage d'une seule rue, Bay Street, et aucun autre. Quelle option classe cela correctement ?",
      {t:"Un échantillon, parce que seulement une partie du groupe étudié a été incluse dans le sondage", fb:"Exact : le groupe étudié est tous les ménages de la ville, et une rue n'est qu'une partie de ce groupe."},
      [{t:"Une population, parce que seulement une partie du groupe étudié a été incluse dans le sondage", fb:"La raison décrit seulement une partie qui participe, ce qui est un échantillon, donc l'étiquette et la raison se contredisent."},
       {t:"Un échantillon, parce que tout le monde dans le groupe étudié a été inclus dans le sondage", fb:"La raison décrit tout le monde qui participe, mais les ménages des autres rues ont été laissés de côté."},
       {t:"Une population, parce que chaque ménage de la rue choisie a répondu au sondage au complet", fb:"Des réponses complètes sur une rue couvrent quand même seulement une partie de tous les ménages de la ville."}],
      "Le groupe étudié est tous les ménages de la ville, et une rue n'en est qu'une partie, donc l'étude utilise un échantillon. La bonne classification est <b>un échantillon, parce que seulement une partie du groupe a été incluse</b>.",
      {mode:"sampop-street"});
  },
  function(){
    return mcq("Une population, c'est tout le monde dans le groupe étudié, et un échantillon, c'est une partie de ce groupe. Un entraîneur de natation chronomètre chacun des 14 nageurs de l'équipe pendant un entraînement. Quelle option classe cela correctement ?",
      {t:"Une population, parce que tout le monde dans le groupe étudié a été inclus dans le chronométrage", fb:"Exact : les 14 nageurs de l'équipe ont été chronométrés, donc tout le groupe étudié a participé."},
      [{t:"Un échantillon, parce que tout le monde dans le groupe étudié a été inclus dans le chronométrage", fb:"La raison décrit tout le monde qui participe, ce qui est une population, donc l'étiquette et la raison se contredisent."},
       {t:"Une population, parce que seulement une partie du groupe étudié a été incluse dans le chronométrage", fb:"La raison décrit seulement une partie qui participe, ce qui est un échantillon, donc l'étiquette et la raison se contredisent."},
       {t:"Un échantillon, parce que les nageurs chronométrés ont été choisis en tirant des noms au hasard", fb:"Aucun nom n'a été tiré ici; l'entraîneur a chronométré chaque nageur de l'équipe directement."}],
      "Quand tout le monde dans le groupe étudié est inclus, l'étude utilise une population. La bonne classification est <b>une population, parce que tout le monde dans le groupe a été inclus</b>.",
      {mode:"sampop-swim"});
  }
]), ["Nomme d'abord le groupe étudié, puis demande-toi si tout le groupe ou seulement une partie a participé.", "Compare le groupe nommé dans la question avec le groupe qui a vraiment participé."]);

E("u9-use-whole-population", 9, ["11.4"], 1, "var", varset([
  function(){
    return mcq("Quelle situation est le mieux répondue en utilisant toute la population ?",
      {t:"Une classe de 24 élèves qui choisit un thème pour sa propre fête de classe ce trimestre", fb:"Exact : la classe est petite et tout le monde est facile à joindre, donc interroger tout le monde a du sens."},
      [{t:"Tous les conducteurs de la province qui évaluent l'état des routes dans la région en hiver", fb:"Les conducteurs d'une province sont bien trop nombreux à interroger un par un pour une seule question de classe."},
       {t:"Chaque poisson d'un port vérifié pour connaître la taille moyenne de la prise du jour", fb:"Attraper et vérifier chaque poisson est impossible en pratique, donc on utilise un échantillon à la place."},
       {t:"Chaque pile d'un entrepôt vidée jusqu'au bout pour tester sa durée de vie utile", fb:"Vider chaque pile détruit le stock testé, donc on utilise un échantillon à la place."}],
      "Utiliser toute une population a du sens quand le groupe est petit, peu coûteux à joindre, et que tout le monde peut participer. La meilleure situation est <b>une classe de 24 élèves qui choisit le thème de sa propre fête de classe</b>.",
      {mode:"wholepop-class"});
  },
  function(){
    return mcq("Quelle situation est le mieux répondue en utilisant toute la population ?",
      {t:"Un club d'échecs de 10 membres qui choisit quel soir tenir ses parties hebdomadaires", fb:"Exact : avec seulement 10 membres, tous faciles à joindre, interroger tout le monde est rapide et complet."},
      [{t:"Tous les acheteurs d'une ville qui évaluent un nouveau plan de stationnement au centre-ville pour le conseil", fb:"Les acheteurs d'une ville entière sont bien trop nombreux à interroger un par un pour cette question."},
       {t:"Chaque ampoule d'une usine brûlée jusqu'à ce qu'elle cesse de fonctionner pour tester sa durée de vie", fb:"Brûler chaque ampoule jusqu'à sa fin détruit le stock testé, donc on utilise un échantillon."},
       {t:"Tous les résidents d'une province qui évaluent le déneigement hivernal", fb:"Les résidents d'une province sont bien trop nombreux à joindre pour un seul sondage de ce genre."}],
      "Utiliser toute une population a du sens quand le groupe est petit, peu coûteux à joindre, et que tout le monde peut participer. La meilleure situation est <b>un club d'échecs de 10 membres qui choisit son soir de parties</b>.",
      {mode:"wholepop-chess"});
  },
  function(){
    return mcq("Quelle situation est le mieux répondue en utilisant toute la population ?",
      {t:"Un enseignant qui demande aux 18 élèves d'une classe quelle sortie scolaire ils préfèrent", fb:"Exact : la classe est petite et ensemble, donc l'enseignant peut interroger chaque élève facilement."},
      [{t:"Tous les adolescents du pays qui évaluent une nouvelle campagne publicitaire nationale en ligne", fb:"Les adolescents d'un pays sont bien trop nombreux à interroger un par un pour cette question."},
       {t:"Chaque chandelle d'un envoi brûlée jusqu'au bout pour mesurer le temps de combustion", fb:"Brûler chaque chandelle jusqu'au bout détruit l'envoi testé, donc on utilise un échantillon."},
       {t:"Tous les agriculteurs d'une région qui évaluent un changement proposé aux règles agricoles provinciales", fb:"Les agriculteurs d'une région entière sont trop nombreux et trop dispersés pour être interrogés un par un ici."}],
      "Utiliser toute une population a du sens quand le groupe est petit, peu coûteux à joindre, et que tout le monde peut participer. La meilleure situation est <b>un enseignant qui interroge les 18 élèves d'une classe au sujet d'une sortie</b>.",
      {mode:"wholepop-fieldtrip"});
  },
  function(){
    return mcq("Quelle situation est le mieux répondue en utilisant toute la population ?",
      {t:"Une petite boulangerie qui demande à ses 6 employés quelle heure d'ouverture du matin leur convient", fb:"Exact : avec seulement 6 employés, tous faciles à joindre, la boulangerie peut interroger tout le monde directement."},
      [{t:"Tous les clients d'une chaîne nationale de magasins qui évaluent un nouveau plan de magasin", fb:"Les clients d'une chaîne nationale sont bien trop nombreux à interroger un par un pour cette question."},
       {t:"Chaque bouteille d'eau d'une usine écrasée pour tester la force qu'elle peut supporter sans se briser", fb:"Écraser chaque bouteille détruit les produits testés, donc on utilise un échantillon à la place."},
       {t:"Tous les propriétaires d'une ville qui évaluent une nouvelle taxe proposée qui touche la province", fb:"Les propriétaires d'une ville sont trop nombreux à interroger un par un pour une question provinciale."}],
      "Utiliser toute une population a du sens quand le groupe est petit, peu coûteux à joindre, et que tout le monde peut participer. La meilleure situation est <b>une petite boulangerie qui interroge ses 6 employés au sujet de l'heure d'ouverture</b>.",
      {mode:"wholepop-bakery"});
  },
  function(){
    return mcq("Quelle situation est le mieux répondue en utilisant toute la population ?",
      {t:"Un club de lecture de 15 membres qui choisit quel roman le club lira le mois prochain", fb:"Exact : le club est petit et se rencontre ensemble, donc chaque membre peut être interrogé facilement."},
      [{t:"Tous les téléspectateurs du pays qui évaluent un nouvel horaire d'émissions de télévision du soir", fb:"Les téléspectateurs d'un pays sont bien trop nombreux à interroger un par un pour cette question."},
       {t:"Chaque casque d'un entrepôt soumis à un test de collision pour vérifier sa protection", fb:"Tester chaque casque par collision détruit les casques testés, donc on utilise un échantillon."},
       {t:"Tous les travailleurs d'une province qui évaluent un changement proposé aux règles de sécurité au travail", fb:"Les travailleurs d'une province sont bien trop nombreux et trop dispersés pour être interrogés un par un ici."}],
      "Utiliser toute une population a du sens quand le groupe est petit, peu coûteux à joindre, et que tout le monde peut participer. La meilleure situation est <b>un club de lecture de 15 membres qui choisit son prochain roman</b>.",
      {mode:"wholepop-bookclub"});
  }
]), ["Toute une population fonctionne quand le groupe est petit, tout le monde est facile à joindre, et les tests ne détruisent rien.", "Élimine toute option où le groupe est énorme ou où les tests détruiraient les objets."]);

E("u9-population-limitation", 9, ["11.5"], 1, "var", varset([
  function(){
    return mcq("Un fabricant veut savoir combien d'heures ses chandelles brûlent. Brûler une chandelle pour la mesurer l'utilise au complet. Quelle limite explique le mieux pourquoi on utilise un échantillon au lieu de toute la population ?",
      {t:"Tester toute la population détruirait chaque chandelle du stock étudié", fb:"Exact : chaque test consume la chandelle, donc tester toutes les chandelles ne laisse rien à vendre ou à utiliser."},
      [{t:"Le coût d'envoyer des sondages par la poste aux acheteurs de chandelles d'autres villes serait bien trop élevé", fb:"Aucun sondage n'est prévu ici; la limite est que le test lui-même utilise chaque chandelle testée."},
       {t:"Il n'y a pas assez de temps avant l'ouverture du magasin pour interroger chaque acheteur de chandelles", fb:"Les questions aux acheteurs ne font pas partie de cette étude; la limite est le test de combustion destructif lui-même."},
       {t:"Les acheteurs de chandelles du pays sont trop nombreux à joindre", fb:"Les acheteurs ne sont pas le groupe testé ici; les chandelles le sont, et les tests détruisent chacune d'elles."}],
      "Quand les tests détruisent l'objet testé, toute la population ne peut pas être utilisée, donc on teste un échantillon à la place. La limite est que <b>tester toute la population détruirait chaque chandelle</b>.",
      {mode:"limit-candles"});
  },
  function(){
    return mcq("Une région de santé veut l'opinion de chaque ménage de la province sur les heures des cliniques. Imprimer, poster et doter en personnel un sondage pour chaque ménage prendrait la plus grande part du budget de la région pour l'année. Quelle limite explique le mieux pourquoi on utilise un échantillon au lieu de toute la population ?",
      {t:"Le coût de joindre chaque ménage de la province est trop élevé pour le budget", fb:"Exact : une couverture complète consumerait la plus grande part d'un budget annuel, donc le coût écarte la population."},
      [{t:"Tester chaque formulaire de sondage de ménage détruirait les formulaires avant leur lecture", fb:"Lire des formulaires ne les détruit pas; la limite énoncée est l'argent qu'un envoi complet prend."},
       {t:"La région a seulement deux ordinateurs pour noter les réponses", fb:"L'équipement n'est pas mentionné ici; la limite énoncée est le budget qu'un envoi complet utiliserait."},
       {t:"Les ménages ont besoin des résultats avant la fin de semaine, ce qui laisse trop peu de temps pour répondre", fb:"Une échéance de fin de semaine n'est pas mentionnée ici; la limite énoncée est le coût pour joindre tout le monde."}],
      "Quand joindre tout le monde coûte plus que le budget disponible, le coût est la limite qui écarte toute la population. La limite est que <b>le coût de joindre chaque ménage est trop élevé</b>.",
      {mode:"limit-clinic"});
  },
  function(){
    return mcq("Une école doit décider lundi si elle tient une journée de sports extérieurs, et veut d'abord l'opinion des élèves. Interroger les 900 élèves et compter les réponses prendrait toute la semaine. Quelle limite explique le mieux pourquoi on utilise un échantillon au lieu de toute la population ?",
      {t:"Il n'y a pas assez de temps pour interroger tout le monde avant que la décision doive être prise", fb:"Exact : l'échéance de la décision arrive avant qu'un compte complet puisse finir, donc le temps l'écarte."},
      [{t:"Le coût d'imprimer un sondage d'une question pour l'école utiliserait tout le budget", fb:"Un sondage d'une question à l'école coûte peu; la limite énoncée est la semaine qu'un compte complet prendrait."},
       {t:"Poser la question à chaque élève détruirait les formulaires du sondage après un usage", fb:"Poser une question ne détruit rien; la limite énoncée est l'échéance de la décision elle-même."},
       {t:"L'école possède seulement deux crayons que les élèves pourraient utiliser pour marquer leurs réponses", fb:"Les crayons ne sont pas la limite décrite ici; la limite énoncée est le temps avant la décision de lundi."}],
      "Quand l'échéance d'une décision arrive avant qu'on puisse interroger tout le monde, le temps est la limite qui écarte toute la population. La limite est qu'<b>il n'y a pas assez de temps pour interroger tout le monde avant la décision</b>.",
      {mode:"limit-sportsday"});
  },
  function(){
    return mcq("Une région veut tester la qualité de l'eau à chaque puits du secteur. Le laboratoire possède seulement deux trousses de test, et chaque trousse peut tester un puits par jour. Quelle limite explique le mieux pourquoi on utilise un échantillon au lieu de toute la population ?",
      {t:"Les outils et le personnel disponibles pour les tests sont trop limités pour couvrir chaque puits", fb:"Exact : deux trousses qui testent un puits par jour ne peuvent pas couvrir chaque puits, donc les ressources l'écartent."},
      [{t:"Le coût d'acheter le terrain autour de chaque puits de la région serait bien trop élevé", fb:"L'achat de terrain ne fait pas partie de cette étude; la limite énoncée est le petit nombre de trousses de test."},
       {t:"Tester un échantillon d'un puits utilise tout le puits, ce qui laisse le propriétaire sans eau", fb:"Un échantillon d'eau ne vide pas un puits; la limite énoncée est le peu de trousses disponibles pour les tests."},
       {t:"Les propriétaires de puits ont besoin de leurs résultats vite, ce qui laisse trop peu de temps pour tester", fb:"Une échéance d'une heure n'est pas mentionnée ici; la limite énoncée est l'équipement de test limité."}],
      "Quand l'équipement et les gens disponibles ne peuvent pas couvrir tout le groupe, des ressources limitées écartent toute la population. La limite est que <b>les outils et le personnel disponibles sont trop limités</b>.",
      {mode:"limit-wells"});
  },
  function(){
    return mcq("Un chercheur veut l'opinion de tous les adultes du Canada au sujet d'un nouveau laissez-passer pour les parcs nationaux. Il y a des millions d'adultes dispersés dans tout le pays. Quelle limite explique le mieux pourquoi on utilise un échantillon au lieu de toute la population ?",
      {t:"La population est trop grande et trop dispersée pour que chaque adulte soit joint et interrogé", fb:"Exact : des millions de gens dans un pays ne peuvent pas tous être contactés, donc la taille l'écarte."},
      [{t:"Tester l'opinion de chaque adulte détruirait les laissez-passer de parcs que l'étude examine", fb:"Les opinions ne détruisent rien, et les laissez-passer ne sont pas testés ici; la limite énoncée est la taille de la population."},
       {t:"Le chercheur possède seulement deux planchettes pour noter les réponses pendant les entrevues", fb:"Les planchettes ne sont pas la limite décrite ici; la limite énoncée est la population énorme et dispersée."},
       {t:"Les adultes doivent répondre avant le souper ce soir, ce qui laisse trop peu de temps pour répondre", fb:"Une échéance de souper n'est pas mentionnée ici; la limite énoncée est le nombre d'adultes."}],
      "Quand une population est si grande et dispersée que tout le monde ne peut pas être joint, sa taille écarte l'usage de toute la population. La limite est que <b>la population est trop grande et trop dispersée pour être jointe</b>.",
      {mode:"limit-parkpass"});
  }
]), ["Un échantillon remplace une population quand quelque chose bloque une couverture complète : l'argent, le temps, les ressources, la destruction, ou la taille pure.", "Trouve d'abord le détail qui bloque dans l'histoire, puis associe-le à la limite qu'il nomme."]);

E("u9-generalization-critique", 9, ["11.6"], 3, "var", varset([
  function(){
    return mcq("Jordan interroge 5 amis proches au dîner, puis affirme que tous les adolescents de la ville aiment un nouveau magasin de planches. Quelle option donne la critique la plus solide de cette généralisation à partir d'un échantillon ?",
      {t:"L'échantillon est trop petit et fait seulement d'amis, donc il ne peut pas parler pour tous les adolescents de la ville", fb:"Exact : cinq amis partagent des goûts et manquent la plupart des adolescents, donc l'affirmation va bien au-delà de l'échantillon."},
      [{t:"L'affirmation est solide, parce que les amis savent habituellement ce que les autres adolescents de la ville vont aimer", fb:"Les amis partagent le même cercle, donc leurs goûts sont un mauvais guide pour chaque adolescent de la ville."},
       {t:"L'échantillon est trop grand pour une étude à l'heure du dîner, donc moins d'élèves auraient dû être interrogés", fb:"Cinq est un très petit échantillon, pas un grand; la taille dans l'autre direction est le problème."},
       {t:"L'affirmation est solide, parce que la question a été posée directement plutôt que par un formulaire de sondage", fb:"Poser la question directement ne corrige pas un petit groupe d'amis qui remplace toute une ville d'adolescents."}],
      "Une généralisation vaut seulement ce que vaut l'échantillon derrière elle : une affirmation sur toute une population a besoin d'un échantillon assez grand et assez représentatif pour la soutenir. La critique solide est que <b>l'échantillon est trop petit et fait seulement d'amis</b>.",
      {mode:"critique-friends"});
  },
  function(){
    return mcq("Un rapport sonde les membres d'un seul gymnase, puis affirme que la plupart des adultes de la ville font de l'exercice chaque jour. Quelle option donne la critique la plus solide de cette généralisation à partir d'un échantillon ?",
      {t:"Les membres d'un gymnase font plus d'exercice que la plupart des adultes, donc l'échantillon ne représente pas toute la ville", fb:"Exact : les gens qui se joignent à un gymnase diffèrent de la population générale exactement dans l'habitude mesurée."},
      [{t:"L'affirmation est solide, parce que les membres d'un gymnase sont des adultes et l'affirmation parle des adultes de la ville", fb:"Être des adultes ne suffit pas; les membres d'un gymnase sont des adultes atypiques pour une question sur les habitudes d'exercice."},
       {t:"L'échantillon est trop petit à utiliser, parce qu'un seul gymnase peut contenir seulement une poignée de membres", fb:"La taille du gymnase n'est pas donnée ici; le problème est que les membres diffèrent de la ville, pas le nombre de personnes."},
       {t:"L'affirmation est solide, parce qu'un sondage dans un gymnase est une façon directe d'étudier les habitudes d'exercice des gens", fb:"Le contact direct ne corrige pas un échantillon tiré seulement de gens qui choisissent déjà de faire souvent de l'exercice."}],
      "Une généralisation vaut seulement ce que vaut l'échantillon derrière elle : un échantillon qui diffère de la population sur le sujet même étudié ne peut pas soutenir une affirmation pour toute la ville. La critique solide est que <b>les membres d'un gymnase ne représentent pas toute la ville</b>.",
      {mode:"critique-gym"});
  },
  function(){
    return mcq("Une école tire 200 noms d'élèves au hasard dans toutes les années et les sonde sur l'utilisation de la bibliothèque, puis affirme que les résultats décrivent l'utilisation de la bibliothèque dans toute l'école. Quelle option juge cette généralisation correctement ?",
      {t:"La généralisation est raisonnable, parce qu'un grand échantillon au hasard de toutes les années peut représenter l'école", fb:"Exact : un choix au hasard dans toutes les années avec 200 élèves donne à l'affirmation un échantillon solide derrière elle."},
      [{t:"La généralisation échoue, parce que tout échantillon plus petit que toute l'école est toujours invalide", fb:"Les échantillons peuvent soutenir des affirmations quand ils sont grands, au hasard et tirés de tout le groupe étudié."},
       {t:"La généralisation échoue, parce que les usagers de la bibliothèque étaient plus portés à répondre au sondage à l'école ce jour-là", fb:"Les noms ont été tirés au hasard dans toutes les années, donc les usagers motivés n'ont pas de place spéciale dans cet échantillon."},
       {t:"La généralisation est raisonnable, parce que les élèves sondés visitent tous la même salle de bibliothèque", fb:"Partager une salle de bibliothèque n'est pas la raison; le choix au hasard dans toutes les années est ce qui soutient l'affirmation."}],
      "Une généralisation vaut seulement ce que vaut l'échantillon derrière elle, et un grand échantillon au hasard tiré de tout le groupe peut soutenir une affirmation sur ce groupe. Le bon jugement est que <b>la généralisation est raisonnable, parce que l'échantillon est grand et au hasard</b>.",
      {mode:"critique-random"});
  },
  function(){
    return mcq("Un élève demande aux gens dans un parc de planches si la ville devrait construire un plus grand parc de planches, puis affirme que la plupart des résidents appuient le projet. Quelle option donne la critique la plus solide de cette généralisation à partir d'un échantillon ?",
      {t:"Les gens dans un parc de planches favorisent déjà les parcs de planches, donc l'échantillon penche d'un côté dès le départ", fb:"Exact : interroger seulement les usagers au sujet de leur propre installation place les réponses vers l'appui au projet."},
      [{t:"L'affirmation est solide, parce que les gens au parc en savent plus sur les parcs de planches que les autres gens de la ville", fb:"Connaître les parcs de planches ne rend pas les usagers du parc typiques de tous les résidents de la ville."},
       {t:"L'échantillon est trop grand pour un seul élève, donc moins de gens auraient dû être interrogés", fb:"La taille de l'échantillon n'est pas donnée comme le problème ici; le problème est d'interroger seulement des gens qui utilisent déjà le parc."},
       {t:"L'affirmation est solide, parce que la question a été posée en personne plutôt que sur un formulaire imprimé", fb:"Poser la question en personne ne corrige pas un échantillon tiré seulement de gens qui favorisent déjà le projet."}],
      "Une généralisation vaut seulement ce que vaut l'échantillon derrière elle : interroger seulement des gens qui utilisent déjà une installation ne peut pas soutenir une affirmation sur tous les résidents. La critique solide est que <b>les gens dans un parc de planches favorisent déjà les parcs de planches</b>.",
      {mode:"critique-skatepark"});
  },
  function(){
    return mcq("Une étude sonde 300 élèves de 9e année, puis affirme que les élèves de toute l'école, de la 7e à la 12e année, préfèrent les cours du matin. Quelle option donne la critique la plus solide de cette généralisation à partir d'un échantillon ?",
      {t:"Une seule année a été sondée, donc les élèves plus vieux et plus jeunes peuvent répondre très différemment", fb:"Exact : un grand échantillon d'une seule année manque quand même chaque autre année que l'affirmation couvre."},
      [{t:"L'affirmation est solide, parce que 300 élèves est un grand échantillon pour toute question à l'échelle de l'école", fb:"La taille seule n'aide pas quand chaque élève sondé vient d'une seule des six années."},
       {t:"L'échantillon est trop petit à utiliser, parce qu'un sondage d'école a besoin de milliers d'élèves", fb:"Trois cents est une bonne taille; le problème est que tous viennent d'un seul niveau."},
       {t:"L'affirmation est solide, parce que les élèves de 9e année sont entre les années les plus jeunes et les plus vieilles", fb:"Une année du milieu ne partage pas automatiquement l'opinion des années au-dessus et au-dessous d'elle."}],
      "Une généralisation vaut seulement ce que vaut l'échantillon derrière elle : un échantillon tiré d'une seule année ne peut pas soutenir une affirmation qui couvre six années. La critique solide est qu'<b>une seule année a été sondée, donc les autres années peuvent différer</b>.",
      {mode:"critique-onegrade"});
  }
]), ["Teste l'affirmation contre son échantillon : vérifie la taille, puis vérifie si l'échantillon correspond à tout le groupe affirmé.", "Imagine qui manque dans l'échantillon; les groupes manquants sont où une généralisation brise habituellement."]);

E("u9-rubric-missing-part", 9, ["11.7"], 1, "var", varset([
  function(){
    return mcq("Une grille d'évaluation pour un projet de données évalue le choix d'une méthode de collecte de données avec des considérations sociales, le choix d'une population ou d'un échantillon avec une justification, et la communication des résultats. Quelle partie requise manque dans cette grille ?",
      {t:"Une question de recherche que le projet cherche à répondre avec des données recueillies", fb:"Exact : la grille n'évalue jamais si le projet a une question claire qui guide l'étude."},
      [{t:"Un choix de méthode de collecte de données qui inclut des considérations sociales pour les participants", fb:"Cette partie est déjà listée dans la grille, dans son critère de méthode, donc elle est présente."},
       {t:"Un choix d'une population ou d'un échantillon avec une justification pour ce choix", fb:"Cette partie est déjà listée dans la grille, dans son critère de choix, donc elle est présente."},
       {t:"Une communication des résultats qui partage les conclusions du projet avec un public", fb:"Cette partie est déjà listée dans la grille, dans son critère final, donc elle est présente."}],
      "Une grille de projet complète évalue la question de recherche, la méthode de collecte avec des considérations sociales, le choix de la population ou de l'échantillon avec une justification, et la communication des résultats. La partie manquante est <b>une question de recherche</b>.",
      {mode:"rubric-question"});
  },
  function(){
    return mcq("Une grille d'évaluation pour un projet de données évalue la question de recherche, le choix d'une population ou d'un échantillon avec une justification, et la communication des résultats. Quelle partie requise manque dans cette grille ?",
      {t:"Un choix de méthode de collecte de données qui inclut des considérations sociales pour les participants", fb:"Exact : la grille n'évalue jamais comment les données seront recueillies ni comment les gens seront traités."},
      [{t:"Une question de recherche que le projet cherche à répondre avec des données recueillies", fb:"Cette partie est déjà listée dans la grille, dans son premier critère, donc elle est présente."},
       {t:"Un choix d'une population ou d'un échantillon avec une justification pour ce choix", fb:"Cette partie est déjà listée dans la grille, dans son critère de choix, donc elle est présente."},
       {t:"Une communication des résultats qui partage les conclusions du projet avec un public", fb:"Cette partie est déjà listée dans la grille, dans son critère final, donc elle est présente."}],
      "Une grille de projet complète évalue la question de recherche, la méthode de collecte avec des considérations sociales, le choix de la population ou de l'échantillon avec une justification, et la communication des résultats. La partie manquante est <b>le choix d'une méthode de collecte de données avec des considérations sociales</b>.",
      {mode:"rubric-method"});
  },
  function(){
    return mcq("Une grille d'évaluation pour un projet de données évalue la question de recherche, le choix d'une méthode de collecte de données avec des considérations sociales, et la communication des résultats. Quelle partie requise manque dans cette grille ?",
      {t:"Un choix d'une population ou d'un échantillon avec une justification pour ce choix", fb:"Exact : la grille n'évalue jamais qui sera étudié ni pourquoi ce groupe a été choisi."},
      [{t:"Une question de recherche que le projet cherche à répondre avec des données recueillies", fb:"Cette partie est déjà listée dans la grille, dans son premier critère, donc elle est présente."},
       {t:"Un choix de méthode de collecte de données qui inclut des considérations sociales pour les participants", fb:"Cette partie est déjà listée dans la grille, dans son critère de méthode, donc elle est présente."},
       {t:"Une communication des résultats qui partage les conclusions du projet avec un public", fb:"Cette partie est déjà listée dans la grille, dans son critère final, donc elle est présente."}],
      "Une grille de projet complète évalue la question de recherche, la méthode de collecte avec des considérations sociales, le choix de la population ou de l'échantillon avec une justification, et la communication des résultats. La partie manquante est <b>le choix d'une population ou d'un échantillon avec une justification</b>.",
      {mode:"rubric-selection"});
  },
  function(){
    return mcq("Une grille d'évaluation pour un projet de données évalue la question de recherche, le choix d'une méthode de collecte de données avec des considérations sociales, et le choix d'une population ou d'un échantillon avec une justification. Quelle partie requise manque dans cette grille ?",
      {t:"Une communication des résultats qui partage les conclusions du projet avec un public", fb:"Exact : la grille n'évalue jamais comment les résultats du projet seront partagés à la fin."},
      [{t:"Une question de recherche que le projet cherche à répondre avec des données recueillies", fb:"Cette partie est déjà listée dans la grille, dans son premier critère, donc elle est présente."},
       {t:"Un choix de méthode de collecte de données qui inclut des considérations sociales pour les participants", fb:"Cette partie est déjà listée dans la grille, dans son critère de méthode, donc elle est présente."},
       {t:"Un choix d'une population ou d'un échantillon avec une justification pour ce choix", fb:"Cette partie est déjà listée dans la grille, dans son critère de choix, donc elle est présente."}],
      "Une grille de projet complète évalue la question de recherche, la méthode de collecte avec des considérations sociales, le choix de la population ou de l'échantillon avec une justification, et la communication des résultats. La partie manquante est <b>la communication des résultats</b>.",
      {mode:"rubric-communication"});
  }
]), ["Garde la liste complète de la grille en tête, puis coche chaque partie que la grille décrite couvre déjà.", "Liste d'abord les quatre parties requises; la manquante est celle qui n'est jamais nommée dans l'énoncé."]);

E("u9-plan-element", 9, ["11.8"], 1, "var", varset([
  function(){
    return mcq("Un plan de projet dit que les intervieweurs demanderont la permission de chaque personne avant de commencer et garderont les noms hors de tous les formulaires de réponses. À quel élément du plan de projet ce détail appartient-il ?",
      {t:"La méthode de collecte de données, dans les considérations sociales qui protègent les participants", fb:"Exact : la permission et des formulaires sans noms sont des considérations sociales bâties dans la façon de recueillir les données."},
      [{t:"La question de recherche, dans la formulation que le projet cherche à répondre", fb:"Aucune question de recherche n'est énoncée dans ce détail; il décrit comment les gens sont traités pendant la collecte."},
       {t:"La méthode pour choisir une population ou un échantillon dans le groupe étudié", fb:"Aucun choix de personnes n'est décrit dans ce détail; il décrit le traitement pendant les entrevues."},
       {t:"La méthode à utiliser pour la collecte des données pendant le travail de terrain du projet", fb:"Les étapes de collecte sont proches, mais la permission et la vie privée appartiennent à la partie des considérations sociales."}],
      "Un plan de projet décrit une question de recherche, une méthode de collecte avec des considérations sociales, une méthode de choix, et une procédure de collecte. Ce détail appartient à <b>la méthode de collecte de données, dans ses considérations sociales</b>.",
      {mode:"plan-social"});
  },
  function(){
    return mcq("Un plan de projet dit que 30 élèves seront choisis en tirant des noms des listes de classes de chaque année de l'école. À quel élément du plan de projet ce détail appartient-il ?",
      {t:"La méthode pour choisir une population ou un échantillon dans le groupe étudié", fb:"Exact : tirer des noms des listes de classes est exactement comment l'échantillon est choisi pour l'étude."},
      [{t:"La question de recherche, dans la formulation que le projet cherche à répondre", fb:"Aucune question de recherche n'est énoncée dans ce détail; il décrit comment les élèves sont choisis."},
       {t:"La méthode de collecte de données, dans les considérations sociales qui protègent les participants", fb:"Aucun traitement des participants n'est décrit dans ce détail; il décrit comment les noms sont tirés."},
       {t:"La méthode à utiliser pour la collecte des données pendant le travail de terrain du projet", fb:"Les étapes de travail de terrain viennent plus tard; ce détail règle qui participe avant que des données soient recueillies."}],
      "Un plan de projet décrit une question de recherche, une méthode de collecte avec des considérations sociales, une méthode de choix, et une procédure de collecte. Ce détail appartient à <b>la méthode pour choisir une population ou un échantillon</b>.",
      {mode:"plan-selection"});
  },
  function(){
    return mcq("Un plan de projet énonce sa question de recherche, décrit une méthode de sondage avec des protections de permission et de vie privée, et explique comment son échantillon sera tiré des listes de classes. Le plan ne dit rien sur comment, quand ou où les réponses au sondage seront vraiment recueillies et notées. Qu'est-ce qui manque encore au plan ?",
      {t:"La méthode à utiliser pour la collecte des données pendant le travail de terrain du projet", fb:"Exact : le plan ne dit jamais comment les réponses seront recueillies et notées, ce qui est son élément manquant."},
      [{t:"La question de recherche, dans la formulation que le projet cherche à répondre", fb:"La question est énoncée au début du plan, donc cet élément est déjà couvert au complet."},
       {t:"La méthode de collecte de données, dans les considérations sociales qui protègent les participants", fb:"Les protections de permission et de vie privée sont décrites dans le plan, donc cet élément est déjà couvert."},
       {t:"La méthode pour choisir une population ou un échantillon dans le groupe étudié", fb:"Le tirage de l'échantillon des listes de classes est expliqué dans le plan, donc cet élément est déjà couvert."}],
      "Un plan de projet décrit une question de recherche, une méthode de collecte avec des considérations sociales, une méthode de choix, et une procédure de collecte. Il manque encore au plan <b>la méthode à utiliser pour la collecte des données</b>.",
      {mode:"plan-collection"});
  },
  function(){
    return mcq("Un plan de projet commence par cette phrase : le projet étudiera si les élèves qui marchent à l'école arrivent plus alertes en première période que les élèves qui prennent l'autobus. À quel élément du plan de projet cette phrase appartient-elle ?",
      {t:"La question de recherche, dans la formulation que le projet cherche à répondre", fb:"Exact : la phrase énonce ce que le projet étudiera, ce qui est sa question guide."},
      [{t:"La méthode pour choisir une population ou un échantillon dans le groupe étudié", fb:"Aucune personne n'est choisie dans cette phrase; elle énonce ce que le projet étudiera en général."},
       {t:"La méthode de collecte de données, dans les considérations sociales qui protègent les participants", fb:"Aucune méthode de collecte ni traitement des gens n'apparaît dans cette phrase; elle encadre la question de l'étude."},
       {t:"La méthode à utiliser pour la collecte des données pendant le travail de terrain du projet", fb:"Aucune étape de collecte ou de notation n'apparaît dans cette phrase; elle énonce la question à laquelle les données doivent répondre."}],
      "Un plan de projet décrit une question de recherche, une méthode de collecte avec des considérations sociales, une méthode de choix, et une procédure de collecte. Cette phrase appartient à <b>la question de recherche</b>.",
      {mode:"plan-question"});
  }
]), ["Un plan a quatre éléments : sa question, sa méthode de collecte avec des considérations sociales, sa méthode de choix, et sa procédure de collecte.", "Décide ce que le détail fait dans le plan : énoncer la question, protéger les gens, choisir les gens, ou recueillir les données."]);

E("u9-supported-conclusion", 9, ["11.9"], 3, "var", varset([
  function(){
    return mcq("Pour un projet, un élève sonde 40 élèves à l'école au sujet de se rendre à l'école. Des 40 élèves, 30 disent qu'ils marchent, 6 prennent un autobus et 4 se font conduire. Quelle conclusion ces données soutiennent-elles vraiment ?",
      {t:"La plupart des 40 élèves sondés ont dit qu'ils marchent à l'école un jour d'école régulier", fb:"Exact : 30 sur 40, c'est la plupart du groupe sondé, donc la conclusion reste dans les données."},
      [{t:"La plupart des élèves de toute la province marchent à l'école un jour d'école régulier chaque année", fb:"Quarante élèves d'une école ne peuvent pas soutenir une affirmation sur toute une province d'élèves."},
       {t:"Marcher à l'école fait que les élèves arrivent à l'école plus alertes chaque jour", fb:"Le sondage a compté les moyens de transport seulement; il n'a rien mesuré sur l'alerte ni ses causes."},
       {t:"La plupart des 40 élèves sondés ont dit qu'ils prennent un autobus à l'école un jour régulier", fb:"Seulement 6 sur 40 ont nommé l'autobus, donc cette conclusion contredit les nombres du sondage."}],
      "Une conclusion doit rester dans les données recueillies : 30 des 40 élèves sondés marchent, et rien de plus large n'a été mesuré. La conclusion soutenue est que <b>la plupart des 40 élèves sondés ont dit qu'ils marchent à l'école</b>.",
      {mode:"conclusion-walk"});
  },
  function(){
    return mcq("Pour un projet, un élève fait pousser 10 plants de haricots avec plus de lumière et 10 sans. Après trois semaines, 7 des plants avec plus de lumière sont plus grands que le plus grand plant poussé sans lumière supplémentaire. Quelle conclusion ces données soutiennent-elles vraiment ?",
      {t:"Dans cet essai, la plupart des plants avec plus de lumière ont poussé plus grands que les plants sans", fb:"Exact : 7 sur 10 qui battent chaque plant non traité soutient une conclusion sur cet essai seulement."},
      [{t:"Plus de lumière fera pousser chaque plant de haricots plus grand dans tout jardin ou essai de classe", fb:"Un petit essai ne peut pas promettre des résultats pour chaque plant, partout où il pourrait pousser."},
       {t:"Plus de lumière est la seule raison pour laquelle les plants de l'essai ont poussé plus grands", fb:"D'autres facteurs touchent aussi la croissance, et cet essai n'a jamais testé la lumière comme seule cause."},
       {t:"Dans cet essai, la plupart des plants sans lumière supplémentaire ont poussé plus grands que les plants avec", fb:"Les plants les plus grands étaient dans le groupe avec plus de lumière, donc cette conclusion contredit les résultats."}],
      "Une conclusion doit rester dans les données recueillies : dans cet essai, les plants avec plus de lumière ont poussé plus grands, et rien de plus large n'a été testé. La conclusion soutenue est que <b>dans cet essai, la plupart des plants avec plus de lumière ont poussé plus grands</b>.",
      {mode:"conclusion-plants"});
  },
  function(){
    return mcq("Pour un projet, un élève compte les prêts de la bibliothèque pendant deux semaines d'école. Les livres de fiction ont été empruntés 120 fois et les livres documentaires 45 fois pendant ces deux semaines. Quelle conclusion ces données soutiennent-elles vraiment ?",
      {t:"Pendant ces deux semaines, les livres de fiction ont été empruntés plus souvent que les livres documentaires", fb:"Exact : 120 prêts contre 45 prêts soutient une comparaison limitée aux deux semaines comptées."},
      [{t:"Les livres de fiction sont mieux écrits que les livres documentaires pour les élèves lecteurs à l'école", fb:"Les comptes de prêts ne disent rien sur la qualité d'écriture; le projet a compté les emprunts, pas la qualité."},
       {t:"Chaque élève de l'école préfère les livres de fiction aux livres documentaires cette année", fb:"Des comptes de prêts sur deux semaines ne peuvent pas montrer ce que chaque élève préfère sur toute une année."},
       {t:"Pendant ces deux semaines, les livres documentaires ont été empruntés plus souvent que les livres de fiction", fb:"Les documentaires avaient 45 prêts contre 120 pour la fiction, donc cette conclusion contredit les comptes."}],
      "Une conclusion doit rester dans les données recueillies : les prêts de fiction dépassaient les prêts de documentaires dans les deux semaines comptées. La conclusion soutenue est que <b>pendant ces deux semaines, les livres de fiction ont été empruntés plus souvent</b>.",
      {mode:"conclusion-library"});
  },
  function(){
    return mcq("Pour un projet, un élève note la température à la récréation pendant 10 jours d'école en mai. Pendant 6 des 10 jours, la température était au-dessus de 10 degrés, et pendant 4 jours elle était à 10 degrés ou moins. Quelle conclusion ces données soutiennent-elles vraiment ?",
      {t:"Pendant la plupart des 10 jours notés, la température à la récréation était au-dessus de 10 degrés en mai", fb:"Exact : 6 jours sur 10, c'est la plupart des jours notés, donc la conclusion correspond aux notes."},
      [{t:"Mai est toujours le mois le plus chaud de l'année scolaire dans cette partie de la province au complet", fb:"Dix jours dans un mois ne peuvent pas classer tous les mois, et aucun autre mois n'a été noté du tout."},
       {t:"Un temps chaud à la récréation fait que les élèves jouent dehors plus longtemps à la récréation chaque jour", fb:"Le projet a noté les températures seulement; il n'a rien mesuré sur le temps de jeu ni ses causes."},
       {t:"Pendant la plupart des 10 jours notés, la température à la récréation était à 10 degrés ou moins", fb:"Seulement 4 jours sur 10 étaient à 10 degrés ou moins, donc cette conclusion contredit les notes."}],
      "Une conclusion doit rester dans les données recueillies : 6 des 10 jours notés étaient au-dessus de 10 degrés, et rien de plus large n'a été mesuré. La conclusion soutenue est que <b>pendant la plupart des 10 jours notés, la température était au-dessus de 10 degrés</b>.",
      {mode:"conclusion-temp"});
  }
]), ["Une conclusion soutenue dit seulement ce que les nombres montrent, pour le groupe et le temps vraiment étudiés.", "Vérifie chaque option contre les nombres de l'énoncé, et laisse tomber toute option qui va au-delà."]);

E("u9-self-assessment", 9, ["11.10"], 1, "var", varset([
  function(){
    return mcq("Un critère de grille dit qu'un projet doit choisir une population ou un échantillon et justifier le choix. Pour le projet, un élève a interrogé seulement des amis proches et n'a donné aucune raison pour les choisir. Quel énoncé d'autoévaluation est exact pour ce critère ?",
      {t:"Mon projet est faible sur ce critère, parce que j'ai interrogé seulement des amis et donné aucune raison pour le choix", fb:"Exact : l'énoncé associe honnêtement le critère à ce que le projet a vraiment fait."},
      [{t:"Mon projet était excellent en tout, et toute l'étude s'est très bien passée du début à la fin du travail", fb:"Des louanges générales ne nomment aucun critère ni aucune preuve, donc elles ne peuvent pas juger cette partie du projet."},
       {t:"Mon projet répond pleinement à ce critère, parce que mes amis ont aimé répondre à toutes mes questions d'entrevue", fb:"Le plaisir ne justifie pas le choix d'un échantillon; le critère demande un choix raisonné."},
       {t:"Mon projet avait une belle page de titre et des graphiques soignés, donc cette partie du projet est forte en tout point", fb:"Les titres et les graphiques appartiennent à d'autres critères; ce critère porte sur justifier qui a été interrogé."}],
      "L'autoévaluation applique honnêtement la grille au travail fait : le projet a interrogé seulement des amis sans justification, donc il est faible sur ce critère. L'énoncé exact est que <b>mon projet est faible, parce que j'ai interrogé seulement des amis et donné aucune raison</b>.",
      {mode:"selfassess-sample"});
  },
  function(){
    return mcq("Un critère de grille dit qu'une méthode de collecte de données doit inclure des considérations sociales, comme la permission et la vie privée. Pour le projet, un élève a demandé la permission avant chaque entrevue et gardé les noms hors de chaque formulaire. Quel énoncé d'autoévaluation est exact pour ce critère ?",
      {t:"Mon projet répond à ce critère, parce que j'ai demandé la permission d'abord et gardé les noms hors de chaque formulaire utilisé", fb:"Exact : l'énoncé lie le critère à deux considérations sociales que le projet a vraiment utilisées."},
      [{t:"Mon projet était vraiment bon en général, et je suis fier de comment toute l'étude s'est passée à la fin du projet", fb:"Une fierté générale ne nomme aucun critère ni aucune preuve, donc elle ne peut pas juger cette partie du projet."},
       {t:"Mon projet est faible sur ce critère, parce que mon échantillon venait d'une seule année de toute l'école", fb:"La gamme d'années de l'échantillon appartient à un autre critère; sur les considérations sociales, ce projet a livré."},
       {t:"Mon projet répond pleinement à ce critère, parce que mes questions d'entrevue étaient courtes et faciles à lire pour tous les élèves", fb:"Des questions courtes aident la clarté, mais le critère porte sur les protections de permission et de vie privée."}],
      "L'autoévaluation applique honnêtement la grille au travail fait : la permission a été demandée et les noms ont été gardés hors des formulaires, donc le projet répond à ce critère. L'énoncé exact est que <b>mon projet répond à ce critère, parce que j'ai demandé la permission et gardé les noms hors des formulaires</b>.",
      {mode:"selfassess-social"});
  },
  function(){
    return mcq("Un critère de grille dit que les résultats doivent être communiqués clairement, avec des graphiques étiquetés qu'un public peut lire. Pour le projet, un élève a présenté un graphique sans titre et sans étiquettes sur ses axes. Quel énoncé d'autoévaluation est exact pour ce critère ?",
      {t:"Mon projet répond en partie à ce critère, parce que mon graphique montre les données mais n'a pas de titre ni d'étiquettes d'axes", fb:"Exact : l'énoncé reconnaît honnêtement le graphique tout en nommant exactement ce que le critère demande encore."},
      [{t:"Mon projet était fantastique du début à la fin, et la présentation était la meilleure partie de mon travail de recherche", fb:"Des louanges générales ne nomment aucun critère ni aucune preuve, donc elles ne peuvent pas juger cette partie du projet."},
       {t:"Mon projet répond pleinement à ce critère, parce que mon public a applaudi à la fin de ma présentation devant toute la classe réunie", fb:"Les applaudissements ne montrent pas une communication claire; le critère demande des graphiques étiquetés et lisibles."},
       {t:"Mon projet est faible sur ce critère, parce que mon échantillon a été tiré d'une seule classe de l'école seulement", fb:"La source de l'échantillon appartient à un autre critère; ce critère porte sur communiquer les résultats."}],
      "L'autoévaluation applique honnêtement la grille au travail fait : le graphique montre les données mais manque un titre et des étiquettes, donc le projet répond en partie à ce critère. L'énoncé exact est que <b>mon projet répond en partie à ce critère, parce que le graphique n'a pas de titre ni d'étiquettes d'axes</b>.",
      {mode:"selfassess-charts"});
  },
  function(){
    return mcq("Un critère de grille dit qu'un projet doit énoncer une question de recherche claire à laquelle des données peuvent répondre. Pour le projet, un élève a étudié une question ciblée : combien d'élèves marchent à l'école chaque jour. Quel énoncé d'autoévaluation est exact pour ce critère ?",
      {t:"Mon projet répond à ce critère, parce que ma question était ciblée et mes données y ont répondu directement", fb:"Exact : l'énoncé lie le critère à la question ciblée et aux données qui y ont répondu."},
      [{t:"Mon projet était fort dans tous les domaines, et je donnerais à toute l'étude la note complète sans changements", fb:"Une note complète sans preuve ne nomme aucun détail du critère, donc elle ne peut pas juger cette partie justement."},
       {t:"Mon projet est faible sur ce critère, parce que mes graphiques utilisaient des couleurs difficiles à lire", fb:"Les couleurs des graphiques appartiennent au critère de communication; la question de recherche ici était claire."},
       {t:"Mon projet répond pleinement à ce critère, parce que j'ai fini toute l'étude avant la date limite", fb:"Finir à temps n'est pas le critère; il demande si la question était claire et pouvait recevoir une réponse."}],
      "L'autoévaluation applique honnêtement la grille au travail fait : la question était ciblée et les données y ont répondu, donc le projet répond à ce critère. L'énoncé exact est que <b>mon projet répond à ce critère, parce que ma question était ciblée et mes données y ont répondu</b>.",
      {mode:"selfassess-question"});
  }
]), ["L'autoévaluation veut dire appliquer le critère de la grille à ce que le projet a vraiment fait, avec des preuves.", "Associe d'abord le critère au détail du projet; des louanges vagues et des forces sans rapport ne comptent pas."]);

/* ----- bank-fix.js ----- */
// Math 9 (French) pool-gap fill additions question bank
// Cut verbatim from the standalone bank source
// (math-9-review-fr/bank-src.js, lines 6043 to 6684).
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
  var prompt = "Évalue \\(" + FR(p, q) + " \\times (" + fmtD(dec) + ") + " + fmtD(add) + "\\). Donne ta réponse sous forme décimale.";
  var sol = "Multiplie d'abord, puis additionne : \\[ \\begin{aligned} " + FR(p, q) + " \\times (" + fmtD(dec) + ") &= " + fmtD(prod, 4) + " \\\\ " + fmtD(prod, 4) + " + " + fmtD(add) + " &= " + fmtD(ans, 4) + " \\end{aligned} \\] La réponse est <b>" + fmtD(ans, 4) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-order-ops", p: p, q: q, dec: dec, add: add });
}, ["Suis l'ordre des opérations : la multiplication se termine avant l'addition.", "Change d'abord la fraction en nombre décimal, puis multiplie-la par le nombre décimal négatif."]);

// PG. L2, 6.1, CR 2: evaluate two rational expressions, then give the difference.
E("u1-gap-two-expr-diff-cr", 1, ["6.1"], 2, "gen", function () {
  var d1 = pick([2, 3, 4, 6]), d2 = pick([3, 4, 6, 8]);
  var n1 = ri(1, 7), n2 = ri(1, 7), n3 = ri(1, 7), n4 = ri(1, 7);
  var A = Math.round((n1 / d1 + n2 / d2) * 10000) / 10000;
  var B = Math.round((n3 / d1 - n4 / d2) * 10000) / 10000;
  var ans = Math.round((A - B) * 10000) / 10000;
  var prompt = "L'expression A est \\(" + FR(n1, d1) + " + " + FR(n2, d2) + "\\) et l'expression B est \\(" + FR(n3, d1) + " - " + FR(n4, d2) + "\\). Trouve la valeur de A moins B, sous forme décimale.";
  var sol = "Évalue d'abord chaque expression : \\[ \\begin{aligned} A &= " + FR(n1, d1) + " + " + FR(n2, d2) + " = " + fmtD(A, 4) + " \\\\ B &= " + FR(n3, d1) + " - " + FR(n4, d2) + " = " + fmtD(B, 4) + " \\\\ A - B &= " + fmtD(A, 4) + " - " + fmtD(B, 4) + " = " + fmtD(ans, 4) + " \\end{aligned} \\] La réponse est <b>" + fmtD(ans, 4) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-two-expr", A: A, B: B });
}, ["Calcule la valeur de chaque expression séparément avant de soustraire.", "Commence par l'expression A : additionne ses deux fractions avec un dénominateur commun."]);

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
  var prompt = "Quatre températures du matin en degrés sont " + vals.map(function (v) { return fmtD(v); }).join(" ; ") + ". Trouve la distance entre la moyenne des quatre températures et la température cible de " + fmtD(target) + " degrés.";
  var sol = "Additionne les températures et divise par 4 pour obtenir la moyenne, puis mesure la distance jusqu'à la cible : \\[ \\begin{aligned} \\text{moyenne} &= \\frac{" + fmtD(vals[0]) + " + " + fmtD(vals[1]) + " + " + fmtD(vals[2]) + " + " + fmtD(vals[3]) + "}{4} = " + fmtD(mean) + " \\\\ \\text{distance} &= |" + fmtD(mean) + " - " + fmtD(target) + "| = " + fmtD(ans) + " \\end{aligned} \\] La réponse est <b>" + fmtD(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-mean-target", mean: mean, target: target });
}, ["La moyenne vient d'abord ; la distance se mesure ensuite de cette moyenne jusqu'à la cible.", "Additionne les quatre températures ensemble comme première étape."]);

// PG. L2, 6.1/6.2, CR 3: fraction division (flip), then an unlike-denominator addition.
E("u1-gap-div-add-cr", 1, ["6.1", "6.2"], 2, "gen", function () {
  var q = pick([3, 4, 5, 6]);
  var r = pick([2, 3]);
  var p = r * ri(2, 5);
  var f = pick([4, 8]);
  var e = ri(1, f - 1);
  var quot = p / r;
  var ans = Math.round((quot + e / f) * 1000) / 1000;
  var prompt = "Évalue \\(" + FR(p, q) + " \\div " + FR(r, q) + " + " + FR(e, f) + "\\). Donne ta réponse sous forme décimale.";
  var sol = "Divise d'abord en multipliant par l'inverse, puis additionne : \\[ \\begin{aligned} " + FR(p, q) + " \\div " + FR(r, q) + " &= " + FR(p, q) + " \\times " + FR(q, r) + " = " + fmtD(quot) + " \\\\ " + fmtD(quot) + " + " + FR(e, f) + " &= " + fmtD(quot) + " + " + fmtD(e / f, 3) + " = " + fmtD(ans, 3) + " \\end{aligned} \\] La réponse est <b>" + fmtD(ans, 3) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-div-add", p: p, q: q, r: r, e: e, f: f });
}, ["La division est le premier travail : inverse le diviseur et multiplie, puis fais l'addition.", "Réécris la division comme une multiplication par l'inverse de la deuxième fraction."]);

// PG. L2, 6.1, CR 3: total of three signed amounts, then the change from a round bill.
E("u1-gap-total-change-cr", 1, ["6.1"], 2, "gen", function () {
  var a1 = ri(300, 2400) / 100, a2 = ri(200, 1800) / 100, disc = ri(100, 800) / 100;
  var total = Math.round((a1 + a2 - disc) * 100) / 100;
  var bill = total <= 30 ? 50 : 100;
  var ans = Math.round((bill - total) * 100) / 100;
  var prompt = "Une cliente achète deux articles au prix de " + fmtDF(a1, 2) + " $ et de " + fmtDF(a2, 2) + " $. Un coupon enlève " + fmtDF(disc, 2) + " $ du total. La cliente paie avec un billet de " + bill + " $. Combien de monnaie la cliente reçoit-elle, en dollars ?";
  var sol = "Trouve d'abord le montant dû, puis soustrais-le du billet : \\[ \\begin{aligned} \\text{total} &= " + fmtDF(a1, 2) + " + " + fmtDF(a2, 2) + " - " + fmtDF(disc, 2) + " = " + fmtDF(total, 2) + " \\\\ \\text{monnaie} &= " + bill + " - " + fmtDF(total, 2) + " = " + fmtDF(ans, 2) + " \\end{aligned} \\] La réponse est <b>" + fmtDF(ans, 2) + " $</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-total-change", total: total, bill: bill });
}, ["La monnaie dépend du total final, alors calcule ce qui est dû avant de soustraire.", "Additionne les deux prix et enlève le coupon comme première étape."]);

// PG. L2, 6.2, CR 3: brackets with signed decimals, then multiply, then add a fraction value.
E("u1-gap-brackets-cr", 1, ["6.2"], 2, "gen", function () {
  var d1 = ri(-40, 60) / 10, d2 = ri(-40, 60) / 10;
  var mult = ri(2, 6);
  var f = pick([2, 4, 8]);
  var e = ri(1, f - 1);
  var inner = Math.round((d1 - d2) * 10) / 10;
  var ans = Math.round((inner * mult + e / f) * 1000) / 1000;
  var prompt = "Évalue \\(((" + fmtD(d1) + ") - (" + fmtD(d2) + ")) \\times " + mult + " + " + FR(e, f) + "\\). Donne ta réponse sous forme décimale.";
  var sol = "Calcule d'abord les parenthèses, puis multiplie, puis additionne : \\[ \\begin{aligned} (" + fmtD(d1) + ") - (" + fmtD(d2) + ") &= " + fmtD(inner) + " \\\\ " + fmtD(inner) + " \\times " + mult + " &= " + fmtD(inner * mult) + " \\\\ " + fmtD(inner * mult) + " + " + fmtD(e / f, 3) + " &= " + fmtD(ans, 3) + " \\end{aligned} \\] La réponse est <b>" + fmtD(ans, 3) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-brackets", inner: inner, mult: mult });
}, ["Les parenthèses se calculent avant toute multiplication ou addition à l'extérieur.", "Soustrais les deux nombres décimaux dans les parenthèses comme première étape."]);

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
  var prompt = "Estime \\(\\sqrt{" + n + "}\\). Donne ta réponse au dixième près.";
  var sol = "Les carrés parfaits près de " + n + " sont \\(" + lo + "^{2} = " + (lo * lo) + "\\) et \\(" + (lo + 1) + "^{2} = " + ((lo + 1) * (lo + 1)) + "\\), donc \\(\\sqrt{" + n + "}\\) se situe entre " + lo + " et " + (lo + 1) + ", plus près de " + best + ". En élevant au carré les dixièmes autour de l'estimation : \\[ \\begin{aligned} " + fmtD(t1, 1) + "^{2} &= " + fmtD(sq(t1), 2) + " \\\\ " + fmtD(est, 1) + "^{2} &= " + fmtD(sq(est), 2) + " \\\\ " + fmtD(t2, 1) + "^{2} &= " + fmtD(sq(t2), 2) + " \\end{aligned} \\] " + fmtD(sq(est), 2) + " est le plus proche de " + n + ", donc la meilleure estimation est <b>" + fmtD(est, 1) + "</b>.";
  return numq(prompt, est, 0.1, sol, { mode: "gap-estimate-gap", n: n, best: best });
}, ["Une estimation utilise le carré parfait le plus proche du nombre sous la racine.", "Écris d'abord les carrés parfaits juste au-dessous et juste au-dessus du nombre."]);

// PG. L2, 9.3, CR 3: surface area of a square pyramid with the slant height derived by Pythagoras.
E("u2-gap-pyramid-slant-cr", 2, ["9.3"], 2, "gen", function () {
  var tr = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [20, 21, 29]]);
  var swap = Math.random() < 0.5;
  var kk = pick([1, 2, 3]);
  var half = (swap ? tr[1] : tr[0]) * kk, height = (swap ? tr[0] : tr[1]) * kk, slant = tr[2] * kk;
  var base = 2 * half;
  var sa = base * base + 2 * base * slant;
  var thing = pick(["pyramide", "tente", "monument"]);
  var prompt = thing === "tente"
    ? "Une tente a la forme d'une pyramide à base carrée. Sa base a un côté de " + base + " cm et sa hauteur verticale est de " + height + " cm. Trouve l'aire de la surface totale de la tente, en centimètres carrés."
    : "Une " + (thing === "pyramide" ? "pyramide à base carrée" : "pyramide à base carrée en forme de monument") + " a une base dont le côté mesure " + base + " cm et une hauteur verticale de " + height + " cm. Trouve l'aire de la surface totale, en centimètres carrés.";
  var sol = "L'apothème n'est pas donné, alors trouve-le avec le théorème de Pythagore en utilisant la moitié de la base et la hauteur : \\[ \\begin{aligned} \\text{apothème}^{2} &= " + half + "^{2} + " + height + "^{2} = " + (half * half + height * height) + " \\\\ \\text{apothème} &= " + slant + " \\\\ SA &= " + base + "^{2} + 4\\left(" + FR(1, 2) + " \\times " + base + " \\times " + slant + "\\right) = " + (base * base) + " + " + (2 * base * slant) + " = " + sa + " \\end{aligned} \\] La réponse est <b>" + sa + " cm\\(^{2}\\)</b>.";
  var q = numq(prompt, sa, 0.01, sol, { mode: "gap-pyramid-slant", base: base, height: height, slant: slant });
  q.figure = solPyramid(base, height, fmtD(base) + " cm", fmtD(height) + " cm", "?", "Pyramide à base carrée avec le côté de la base et la hauteur étiquetés et la hauteur oblique inconnue");
  return q;
}, ["Les faces triangulaires ont besoin de l'apothème, que la pyramide ne donne pas directement.", "Prends la moitié du côté de la base, puis utilise le théorème de Pythagore avec la hauteur pour obtenir l'apothème."]);

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
  var prompt = "Un présentoir est fait d'une boîte et d'un prisme droit à base triangulaire joints ensemble. La boîte mesure " + L + " cm de long, " + W + " cm de large et " + H + " cm de haut. Le prisme mesure " + L + " cm de long, et chaque extrémité triangulaire est un triangle rectangle avec des cathètes de " + a + " cm et " + b + " cm et une hypoténuse de " + c + " cm. Le prisme repose sur la boîte, et les deux solides se touchent sur un rectangle de " + a + " cm sur " + L + " cm. Quelle est l'aire de la surface totale du présentoir, en centimètres carrés ?";
  var sol = "Trouve d'abord chaque solide séparément, puis soustrais le rectangle de contact deux fois parce qu'il est caché sur les deux solides : \\[ \\begin{aligned} SA &= " + saBox + " + " + saPrism + " - 2(" + contact + ") \\\\ &= " + tot + " \\end{aligned} \\] La réponse est <b>" + tot + " cm\\(^{2}\\)</b>.";
  var q = mcq(prompt,
    { t: fmtD(tot), fb: "Exact : les deux solides sont comptés, et le rectangle de contact caché est enlevé de chacun des deux." },
    [{ t: fmtD(saBox + saPrism), fb: "Cela additionne les deux solides mais laisse les faces de contact cachées comptées sur les deux solides." },
     { t: fmtD(saBox + saPrism - contact), fb: "Cela enlève le rectangle de contact une seule fois, mais il est caché sur les deux solides, alors il doit partir deux fois." },
     { t: fmtD(saBox + saPrism - 3 * contact), fb: "Cela enlève le rectangle de contact trois fois ; il est caché sur exactement deux faces, une sur chaque solide." }],
    sol, { mode: "gap-composite-sa", tot: tot });
  if (a <= W) q.figure = solBoxTri(a, b, c, L, W, H, fmtD(a) + " cm", fmtD(b) + " cm", fmtD(c) + " cm", fmtD(L) + " cm", fmtD(W) + " cm", fmtD(H) + " cm", "Prisme triangulaire sur une boîte avec des dimensions étiquetées");
  return q;
}, ["Traite le présentoir comme deux solides séparés d'abord, puis ajuste pour le joint.", "Additionne les deux aires de surface, puis soustrais le rectangle de contact deux fois puisqu'il est caché sur les deux solides."]);


/* Unit 3: Powers and Exponent Laws */

// PG. L2, 3.12, CR 2: product law and quotient law chained, then evaluate.
E("u3-gap-laws-eval-cr", 3, ["3.12"], 2, "gen", function () {
  var a = pick([2, 3]);
  var m = ri(2, 4), n = ri(2, 4), p = ri(1, 3); if (m + n - p < 2) p = 1;
  var tot = m + n - p;
  var val = Math.pow(a, tot);
  var prompt = "Évalue \\(\\frac{" + a + "^{" + m + "} \\times " + a + "^{" + n + "}}{" + a + "^{" + p + "}}\\).";
  var sol = "Multiplie d'abord avec la loi du produit, puis divise avec la loi du quotient : \\[ \\begin{aligned} " + a + "^{" + m + "} \\times " + a + "^{" + n + "} &= " + a + "^{" + (m + n) + "} \\\\ " + a + "^{" + (m + n) + "} \\div " + a + "^{" + p + "} &= " + a + "^{" + tot + "} = " + fmtD(val) + " \\end{aligned} \\] La réponse est <b>" + fmtD(val) + "</b>.";
  return numq(prompt, val, 0.01, sol, { mode: "gap-laws-eval", a: a, tot: tot });
}, ["Les puissances de même base se combinent avec les lois des exposants avant tout calcul.", "Additionne les exposants pour la multiplication au numérateur comme première étape."]);

// PG. L2, 3.12, CR 2: simplify in x with the laws, then substitute a value.
E("u3-gap-simplify-sub-cr", 3, ["3.12"], 2, "gen", function () {
  var a = ri(2, 4), b = ri(2, 4), c = ri(1, 2);
  var e = a + b - c;
  var v = pick([2, 3, -2]);
  var val = Math.pow(v, e);
  var prompt = "Simplifie \\(\\frac{x^{" + a + "} \\times x^{" + b + "}}{x^{" + c + "}}\\), puis évalue l'expression simplifiée quand \\(x = " + v + "\\).";
  var sol = "Simplifie d'abord avec les lois du produit et du quotient, puis remplace : \\[ \\begin{aligned} \\frac{x^{" + a + "} \\times x^{" + b + "}}{x^{" + c + "}} &= x^{" + e + "} \\\\ (" + v + ")^{" + e + "} &= " + fmtD(val) + " \\end{aligned} \\] La réponse est <b>" + fmtD(val) + "</b>.";
  return numq(prompt, val, 0.01, sol, { mode: "gap-simplify-sub", e: e, v: v });
}, ["L'expression doit être simplifiée en une seule puissance avant d'y mettre la valeur.", "Additionne les exposants au numérateur comme première étape."]);

// PG. L2, 3.11/3.12, CR 3: solve for the exponent by writing the target as a power of the base.
E("u3-gap-solve-exponent-cr", 3, ["3.11", "3.12"], 2, "gen", function () {
  var a = pick([2, 3, 5]);
  var m = ri(1, 3), k = ri(4, 7);
  if (k - m < 2) m = 1;
  var x = k - m;
  var T = Math.pow(a, k);
  var flip = Math.random() < 0.5;
  var lhs = flip ? (a + "^{x} \\times " + a + "^{" + m + "}") : (a + "^{" + m + "} \\times " + a + "^{x}");
  var prompt = "Trouve la valeur de \\(x\\) dans l'équation \\(" + lhs + " = " + fmtD(T) + "\\).";
  var sol = "Écris d'abord le côté droit comme une puissance de " + a + ", puis utilise la loi du produit et compare les exposants : \\[ \\begin{aligned} " + fmtD(T) + " &= " + a + "^{" + k + "} \\\\ " + m + " + x &= " + k + " \\\\ x &= " + x + " \\end{aligned} \\] La réponse est <b>" + x + "</b>.";
  return numq(prompt, x, 0.01, sol, { mode: "gap-solve-exponent", a: a, m: m, k: k });
}, ["Les deux côtés doivent être des puissances de la même base avant de comparer les exposants.", "Réécris le nombre de droite comme une puissance de la base comme première étape."]);

// PG. L2, 3.12, CR 3: product of two scientific-notation numbers, then normalize the coefficient.
E("u3-gap-sci-product-cr", 3, ["3.12"], 2, "gen", function () {
  var i = ri(15, 45), j = ri(15, 45), guard = 0;
  while (i * j < 1000 && guard < 200) { i = ri(15, 45); j = ri(15, 45); guard++; }
  var c1 = i / 10, c2 = j / 10;
  var p = ri(2, 5), q = ri(2, 5);
  var prod = i * j / 100;
  var coeff = Math.round(prod / 10 * 1000) / 1000;
  var prompt = "Multiplie \\((" + fmtD(c1) + " \\times 10^{" + p + "}) \\times (" + fmtD(c2) + " \\times 10^{" + q + "})\\). Le produit s'écrit en notation scientifique comme un coefficient fois une puissance de 10, avec le coefficient entre 1 et 10. Donne le coefficient.";
  var sol = "Multiplie les coefficients et additionne les exposants, puis normalise parce que le coefficient est trop grand : \\[ \\begin{aligned} " + fmtD(c1) + " \\times " + fmtD(c2) + " &= " + fmtD(prod, 3) + " \\\\ " + fmtD(prod, 3) + " \\times 10^{" + (p + q) + "} &= " + fmtD(coeff, 3) + " \\times 10^{" + (p + q + 1) + "} \\end{aligned} \\] La réponse est <b>" + fmtD(coeff, 3) + "</b>.";
  return numq(prompt, coeff, 0.01, sol, { mode: "gap-sci-product", coeff: coeff });
}, ["Multiplie les nombres de devant et les puissances de 10 séparément, puis vérifie la taille du nombre de devant.", "Multiplie les deux coefficients comme première étape."]);

// PG. L2, 3.12, CR 3: doubling growth over k periods, then the excess over a target.
E("u3-gap-growth-excess-cr", 3, ["3.12"], 2, "gen", function () {
  var n0 = ri(3, 9) * 10;
  var k = ri(3, 6);
  var total = n0 * Math.pow(2, k);
  var frac = pick([0.6, 0.7, 0.75, 0.8]);
  var target = Math.round(total * frac / 10) * 10;
  var ans = total - target;
  var prompt = "Une culture de bactéries commence avec " + n0 + " bactéries et double chaque heure. Trouve combien de bactéries de plus il y a après " + k + " heures qu'un compte cible de " + fmtD(target) + " bactéries.";
  var sol = "Applique le doublement " + k + " fois d'abord, puis compare avec la cible : \\[ \\begin{aligned} \\text{après " + k + " heures} &= " + n0 + " \\times 2^{" + k + "} = " + fmtD(total) + " \\\\ \\text{excès} &= " + fmtD(total) + " - " + fmtD(target) + " = " + fmtD(ans) + " \\end{aligned} \\] La réponse est <b>" + fmtD(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-growth-excess", total: total, target: target });
}, ["Calcule d'abord le compte après croissance ; l'excès est une comparaison faite ensuite.", "Multiplie le compte de départ par 2 à la puissance du nombre d'heures comme première étape."]);

// PG. L2, 3.12/3.14, CR 3: power of a power, then the difference of two powers.
E("u3-gap-power-diff-cr", 3, ["3.12", "3.14"], 2, "gen", function () {
  var a, m, n, p, big, small, diff, guard = 0;
  do { a = pick([2, 3]); m = ri(2, 4); n = ri(2, 3); p = ri(1, 4); big = Math.pow(a, m * n); small = Math.pow(a, p); diff = big - small; guard++; } while ((diff <= 0 || diff > 5000) && guard < 300);
  var c = pick([2, 3]);
  var ans = c * diff;
  var prompt = "Évalue \\(" + c + "[(" + a + "^{" + m + "})^{" + n + "} - " + a + "^{" + p + "}]\\).";
  var sol = "Utilise d'abord la loi de la puissance d'une puissance, évalue les deux puissances, soustrais, puis multiplie : \\[ \\begin{aligned} (" + a + "^{" + m + "})^{" + n + "} &= " + a + "^{" + (m * n) + "} = " + fmtD(big) + " \\\\ " + a + "^{" + p + "} &= " + fmtD(small) + " \\\\ " + c + " \\times (" + fmtD(big) + " - " + fmtD(small) + ") &= " + c + " \\times " + fmtD(diff) + " = " + fmtD(ans) + " \\end{aligned} \\] La réponse est <b>" + fmtD(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-power-diff", a: a, ans: ans });
}, ["La puissance d'une puissance doit être simplifiée avant d'évaluer l'une ou l'autre puissance.", "Multiplie les deux exposants de la première puissance comme première étape."]);

// PG. L2, 3.12, SR: multi-law simplification with one-law-at-a-time error distractors.
E("u3-gap-laws-mc", 3, ["3.12"], 2, "gen", function () {
  var m = ri(2, 4), n = ri(1, 3), p = ri(2, 4), q = ri(1, 2);
  var e1 = m + n, e2 = p + q;
  function expr(u, v) { return "\\(x^{" + u + "} \\times y^{" + v + "}\\)"; }
  var prompt = "Simplifie \\(\\frac{(x^{" + m + "} \\times y^{" + p + "})(x^{" + n + "} \\times y^{" + q + "})}{x^{" + n + "} \\times y^{" + q + "}}\\) en appliquant les lois des exposants. Quelle expression est la forme simplifiée ?";
  var sol = "Applique la loi du produit à chaque base, puis la loi du quotient à chaque base : \\[ \\begin{aligned} x^{" + m + "} \\times x^{" + n + "} \\div x^{" + n + "} &= x^{" + e1 + "} \\\\ y^{" + p + "} \\times y^{" + q + "} \\div y^{" + q + "} &= y^{" + e2 + "} \\end{aligned} \\] La réponse est <b>" + expr(e1, e2) + "</b>.";
  return mcq(prompt,
    { t: expr(e1, e2), fb: "Exact : chaque base est combinée avec la loi du produit, puis réduite avec la loi du quotient." },
    [{ t: expr(e1, p), fb: "Cela garde seulement le premier exposant de y ; les puissances de y doivent aussi être combinées avec la loi du produit avant la division." },
     { t: expr(m, e2), fb: "Cela garde seulement le premier exposant de x ; les puissances de x doivent aussi être combinées avec la loi du produit avant la division." },
     { t: expr(m, p), fb: "C'est le premier facteur du numérateur tout seul ; aucune base n'a encore été combinée ni divisée." }],
    sol, { mode: "gap-laws-mc", e1: e1, e2: e2 });
}, ["Travaille une base à la fois, et chaque base a besoin de la loi du produit et de la loi du quotient.", "Combine les deux puissances de x au numérateur comme première étape."]);

/* Unit 4: Polynomials */

// PG. L2, 8.6/8.11, CR 2: add two polynomials, then evaluate at a given x.
E("u4-gap-add-eval-cr", 4, ["8.6", "8.11"], 2, "gen", function () {
  var a1 = u4nz(-5, 5), b1 = u4nz(-6, 6), c1 = ri(-6, 6);
  var a2 = u4nz(-5, 5), b2 = u4nz(-6, 6), c2 = ri(-6, 6);
  var sa = a1 + a2, sb = b1 + b2, sc = c1 + c2;
  var v = ri(2, 4);
  var ans = sa * v * v + sb * v + sc;
  var prompt = "Additionne les polynômes \\((" + u4p(a1, b1, c1) + ") + (" + u4p(a2, b2, c2) + ")\\), puis évalue la somme quand \\(x = " + v + "\\).";
  var sol = "Combine d'abord les termes semblables, puis remplace : \\[ \\begin{aligned} (" + u4p(a1, b1, c1) + ") + (" + u4p(a2, b2, c2) + ") &= " + u4p(sa, sb, sc) + " \\\\ " + u4p(sa, sb, sc) + "\\text{ à } x = " + v + " &= " + fmtD(ans) + " \\end{aligned} \\] La réponse est <b>" + fmtD(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-add-eval", sa: sa, sb: sb, sc: sc, v: v });
}, ["La somme doit être simplifiée avant de pouvoir y mettre la valeur de x.", "Additionne les coefficients de x carré ensemble comme première étape."]);

// PG. L2, 8.8/8.12, CR 2: multiply a monomial through a polynomial, give a named coefficient.
E("u4-gap-mono-coeff-cr", 4, ["8.8", "8.12"], 2, "gen", function () {
  var m = u4nz(-5, 5);
  if (m === 1 || m === -1) m = 3;
  var a = u4nz(-6, 6), b = u4nz(-6, 6), c = ri(-6, 6);
  var ans = m * b;
  var prodStr = u4expr([[m * a, "x^{3}"], [m * b, "x^{2}"], [m * c, "x"]]);
  var prompt = "Multiplie \\(" + fmtD(m) + "x(" + u4p(a, b, c) + ")\\). Quel est le coefficient du terme en \\(x^{2}\\) dans le produit ?";
  var sol = "Multiplie d'abord le monôme par chaque terme : \\[ \\begin{aligned} " + fmtD(m) + "x(" + u4p(a, b, c) + ") &= " + prodStr + " \\end{aligned} \\] Le coefficient du terme en \\(x^{2}\\) vient de \\(" + fmtD(m) + "x \\times " + fmtD(b) + "x\\). La réponse est <b>" + fmtD(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-mono-coeff", m: m, b: b });
}, ["Chaque terme dans les parenthèses est multiplié, et le terme nommé se lit ensuite.", "Multiplie le monôme par le terme en x dans les parenthèses comme première étape."]);

// PG. L2, 8.12, CR 3: area of a rectangle with binomial sides, evaluated at a given x.
E("u4-gap-area-eval-cr", 4, ["8.12"], 2, "gen", function () {
  var a = ri(2, 9), b = ri(2, 9), v = ri(2, 6);
  var s1 = v + a, s2 = v + b, ans = s1 * s2;
  var prompt = "Un jardin rectangulaire a une longueur de \\((x + " + a + ")\\) mètres et une largeur de \\((x + " + b + ")\\) mètres. Trouve l'aire du jardin, en mètres carrés, quand \\(x = " + v + "\\).";
  var sol = "Évalue d'abord chaque côté, puis multiplie les côtés pour l'aire : \\[ \\begin{aligned} \\text{longueur} &= " + v + " + " + a + " = " + s1 + " \\\\ \\text{largeur} &= " + v + " + " + b + " = " + s2 + " \\\\ \\text{aire} &= " + s1 + " \\times " + s2 + " = " + ans + " \\end{aligned} \\] La réponse est <b>" + ans + " m\\(^{2}\\)</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-area-eval", s1: s1, s2: s2 });
}, ["L'aire est un produit des deux longueurs de côté, et chaque côté doit être évalué d'abord.", "Remplace la valeur de x dans la longueur comme première étape."]);

// PG. L2, 8.7/8.11, CR 3: subtract polynomials (distribute the negative), then evaluate at a negative x.
E("u4-gap-sub-eval-neg-cr", 4, ["8.7", "8.11"], 2, "gen", function () {
  var a1 = u4nz(-5, 5), b1 = u4nz(-6, 6), c1 = ri(-6, 6);
  var a2 = u4nz(-5, 5), b2 = u4nz(-6, 6), c2 = ri(-6, 6);
  var sa = a1 - a2, sb = b1 - b2, sc = c1 - c2;
  var v = -ri(1, 3);
  var ans = sa * v * v + sb * v + sc;
  var prompt = "Soustrais \\((" + u4p(a1, b1, c1) + ") - (" + u4p(a2, b2, c2) + ")\\), puis évalue la différence quand \\(x = " + v + "\\).";
  var sol = "Change d'abord chaque signe dans le deuxième polynôme, puis combine et remplace : \\[ \\begin{aligned} (" + u4p(a1, b1, c1) + ") - (" + u4p(a2, b2, c2) + ") &= " + u4p(sa, sb, sc) + " \\\\ " + u4p(sa, sb, sc) + "\\text{ à } x = " + v + " &= " + fmtD(ans) + " \\end{aligned} \\] La réponse est <b>" + fmtD(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-sub-eval-neg", sa: sa, sb: sb, sc: sc, v: v });
}, ["La soustraction inverse chaque signe dans le deuxième polynôme avant de combiner les termes semblables.", "Réécris le deuxième polynôme avec chaque signe changé comme première étape."]);

// PG. L2, 8.5/8.6, CR 3: simplify a polynomial perimeter, then evaluate.
E("u4-gap-perimeter-eval-cr", 4, ["8.5", "8.6"], 2, "gen", function () {
  var a1 = u4nz(-4, 4), b1 = ri(-5, 5), a2 = u4nz(-4, 4), b2 = ri(-5, 5), a3 = u4nz(-4, 4), b3 = ri(-5, 5);
  var sx = a1 + a2 + a3, sk = b1 + b2 + b3;
  var v = ri(2, 5);
  var ans = sx * v + sk;
  function side(a, b) { return u4expr([[a, "x"], [b, ""]]); }
  var prompt = "Un triangle a des côtés de longueurs \\((" + side(a1, b1) + ")\\), \\((" + side(a2, b2) + ")\\) et \\((" + side(a3, b3) + ")\\), en centimètres. Trouve le périmètre du triangle, en centimètres, quand \\(x = " + v + "\\).";
  var sol = "Additionne les trois côtés et simplifie d'abord, puis remplace : \\[ \\begin{aligned} P &= (" + side(a1, b1) + ") + (" + side(a2, b2) + ") + (" + side(a3, b3) + ") \\\\ &= " + side(sx, sk) + " \\\\ &= " + fmtD(ans) + "\\text{ à } x = " + v + " \\end{aligned} \\] La réponse est <b>" + fmtD(ans) + " cm</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-perimeter-eval", sx: sx, sk: sk, v: v });
}, ["Un périmètre est une somme de tous les côtés, simplifiée avant d'y mettre la valeur.", "Additionne les coefficients de x des trois côtés comme première étape."]);

// PG. L2, 8.9/8.12, CR 3: divide a polynomial by a monomial, then evaluate the quotient.
E("u4-gap-div-eval-cr", 4, ["8.9", "8.12"], 2, "gen", function () {
  var m = pick([2, 3, 4]);
  var qa = u4nz(-5, 5), qb = u4nz(-6, 6), qc = ri(-5, 5);
  var A = m * qa, B = m * qb, C = m * qc;
  var v = ri(2, 4);
  var ans = qa * v * v + qb * v + qc;
  var prompt = "Divise \\((" + u4p(A, B, C) + ") \\div " + m + "x\\), puis évalue le quotient quand \\(x = " + v + "\\).";
  var sol = "Divise chaque terme par le monôme d'abord, puis remplace : \\[ \\begin{aligned} (" + u4p(A, B, C) + ") \\div " + m + "x &= " + u4p(qa, qb, qc) + " \\\\ " + u4p(qa, qb, qc) + "\\text{ à } x = " + v + " &= " + fmtD(ans) + " \\end{aligned} \\] La réponse est <b>" + fmtD(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-div-eval", qa: qa, qb: qb, qc: qc, v: v });
}, ["Chaque terme du polynôme est divisé séparément avant d'y mettre la valeur.", "Divise le terme en x carré par le monôme comme première étape."]);


/* Unit 5: Linear Equations and Inequalities */

// PG. L2, 8.27/8.28, CR 2: two-step inequality, answer is its boundary value.
E("u5-gap-ineq-boundary-cr", 5, ["8.27", "8.28"], 2, "gen", function () {
  var a = ri(2, 9), x0 = ri(2, 12), b = ri(-12, 12);
  if (b === 0) b = 5;
  var c = a * x0 + b;
  var sym = pick(["<", ">", "\\le", "\\ge"]);
  var prompt = "L'inéquation \\(" + u5lin(a, b) + " " + sym + " " + fmtD(c) + "\\) a une valeur limite où les deux côtés sont exactement égaux. Quelle est la valeur limite de \\(x\\) ?";
  var sol = "Pose les deux côtés égaux et résous en deux étapes : \\[ \\begin{aligned} " + u5lin(a, b) + " &= " + fmtD(c) + " \\\\ " + fmtD(a) + "x &= " + fmtD(c - b) + " \\\\ x &= " + fmtD(x0) + " \\end{aligned} \\] La réponse est <b>" + fmtD(x0) + "</b>.";
  return numq(prompt, x0, 0.01, sol, { mode: "gap-ineq-boundary", a: a, b: b, c: c });
}, ["La valeur limite se trouve en traitant l'inéquation comme une équation avec des côtés égaux.", "Déplace le terme constant de l'autre côté comme première étape."]);

// PG. L2, 8.17, CR 2: equation with the variable on both sides.
E("u5-gap-both-sides-cr", 5, ["8.17"], 2, "gen", function () {
  var x0 = ri(-9, 9);
  if (x0 === 0) x0 = 4;
  var a = ri(4, 9), c = ri(2, a - 2), b = ri(-10, 10), d = b + (a - c) * x0;
  var prompt = "Résous l'équation \\(" + u5lin(a, b) + " = " + u5lin(c, d) + "\\). Quelle est la valeur de \\(x\\) ?";
  var sol = "Rassemble d'abord les termes en x d'un côté, puis rassemble les constantes : \\[ \\begin{aligned} " + u5lin(a, b) + " &= " + u5lin(c, d) + " \\\\ " + fmtD(a - c) + "x &= " + fmtD(d - b) + " \\\\ x &= " + fmtD(x0) + " \\end{aligned} \\] La réponse est <b>" + fmtD(x0) + "</b>.";
  return numq(prompt, x0, 0.01, sol, { mode: "gap-both-sides", a: a, c: c, b: b, d: d });
}, ["Les termes en x commencent des deux côtés, alors il faut les rassembler avant de diviser.", "Soustrais le plus petit terme en x des deux côtés comme première étape."]);

// PG. L2, 8.30/8.21, CR 3: minimum whole number of items to reach a target (solve, then round up).
E("u5-gap-min-items-cr", 5, ["8.30", "8.21"], 2, "gen", function () {
  var s = ri(10, 60), p = ri(4, 9), q = ri(3, 11);
  var target = s + p * q + ri(1, p - 1);
  var ans = q + 1;
  var prompt = "Un kiosque de collecte de fonds commence avec " + s + " $ et gagne " + p + " $ pour chaque article vendu. Le kiosque veut atteindre au moins " + target + " $. Quel est le plus petit nombre entier d'articles que le kiosque doit vendre ?";
  var sol = "Résous d'abord l'inéquation : \\[ \\begin{aligned} " + s + " + " + p + "n &\\ge " + target + " \\\\ " + p + "n &\\ge " + (target - s) + " \\\\ n &\\ge " + fmtD((target - s) / p) + " \\end{aligned} \\] Une partie d'article ne peut pas être vendue, alors le compte s'arrondit au nombre entier suivant. La réponse est <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-min-items", s: s, p: p, target: target });
}, ["Résous d'abord l'inéquation ; le sens entier du compte se décide ensuite.", "Soustrais le montant de départ de la cible comme première étape."]);

// PG. L2, 8.17/8.29, CR 3: solve (x + a)/b = c, then evaluate a short expression at the solution.
E("u5-gap-solve-eval-cr", 5, ["8.17", "8.29"], 2, "gen", function () {
  var b = ri(2, 6), c = ri(3, 9), a = ri(2, 12);
  var x = b * c - a;
  var e = ri(2, 15);
  var ans = 2 * x + e;
  var prompt = "Résous l'équation \\(\\frac{x + " + a + "}{" + b + "} = " + c + "\\), puis évalue \\(2x + " + e + "\\) à la solution. Donne la valeur de l'expression.";
  var sol = "Défais d'abord la division, puis l'addition, puis remplace dans l'expression : \\[ \\begin{aligned} x + " + a + " &= " + (b * c) + " \\\\ x &= " + x + " \\\\ 2(" + x + ") + " + e + " &= " + ans + " \\end{aligned} \\] La réponse est <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-solve-eval", x: x, e: e });
}, ["L'équation doit être complètement résolue avant que sa solution puisse servir dans l'expression.", "Multiplie les deux côtés par le dénominateur comme première étape."]);

/* Unit 6: Linear Relations */

// PG. L2, 7.4/7.2, CR 2: slope extracted from a table's differences, then the value at a new x.
E("u6-gap-slope-table-cr", 6, ["7.4", "7.2"], 2, "gen", function () {
  var m = ri(2, 6), b = ri(3, 15);
  var X = ri(9, 14);
  var ans = b + m * X;
  var rows = [0, 1, 2, 3].map(function (x) { return x + " : " + (b + m * x); }).join(" ; ");
  var prompt = "Une relation linéaire a cette table de valeurs. Les paires x et y sont : " + rows + ". La régularité continue de la même façon. Quelle est la valeur de y quand x = " + X + " ?";
  var sol = "Les valeurs de y augmentent de " + m + " à chaque étape, et la valeur de départ à x = 0 est " + b + " : \\[ \\begin{aligned} y &= " + b + " + " + m + "x \\\\ y(" + X + ") &= " + b + " + " + m + "(" + X + ") = " + ans + " \\end{aligned} \\] La réponse est <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-slope-table", m: m, b: b, X: X });
}, ["La taille du pas se cache dans les différences entre les valeurs voisines de y.", "Soustrais deux valeurs voisines de y pour trouver le pas comme première étape."]);

// PG. L2, 7.7/7.8, CR 2: missing coordinate of a point on the line through two given points.
E("u6-gap-missing-coord-cr", 6, ["7.7", "7.8"], 2, "gen", function () {
  var m = ri(2, 5), b = ri(1, 12);
  var x1 = ri(0, 3), x2 = x1 + ri(2, 4), x3 = x2 + ri(2, 5);
  var y1 = b + m * x1, y2 = b + m * x2, ans = b + m * x3;
  var prompt = "Les points (" + x1 + ", " + y1 + ") et (" + x2 + ", " + y2 + ") sont sur une droite. Le point (" + x3 + ", y) est aussi sur la même droite. Quelle est la valeur de y ?";
  var sol = "Trouve d'abord la pente à partir des deux points donnés, puis prolonge la régularité jusqu'au nouveau x : \\[ \\begin{aligned} \\text{pente} &= \\frac{" + y2 + " - " + y1 + "}{" + x2 + " - " + x1 + "} = " + m + " \\\\ y &= " + y2 + " + " + m + "(" + x3 + " - " + x2 + ") = " + ans + " \\end{aligned} \\] La réponse est <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-missing-coord", m: m, x3: x3 });
}, ["Le taux de la droite doit être calculé à partir des deux points complets avant de pouvoir utiliser le point incomplet.", "Divise le changement de y par le changement de x pour les deux points donnés comme première étape."]);

// PG. L2, 7.2/7.10, CR 3: break-even point of two cost plans (set equal, then solve).
E("u6-gap-break-even-cr", 6, ["7.2", "7.10"], 2, "gen", function () {
  var m1 = ri(2, 6), d = ri(2, 6), t = ri(3, 9);
  var m2 = m1 + d;
  var a2 = ri(5, 30), a1 = a2 + d * t;
  var prompt = "Le forfait A demande des frais de " + a1 + " $ plus " + m1 + " $ par heure. Le forfait B demande des frais de " + a2 + " $ plus " + m2 + " $ par heure. Après combien d'heures les deux forfaits coûtent-ils exactement la même chose ?";
  var sol = "Pose les deux coûts égaux et résous : \\[ \\begin{aligned} " + a1 + " + " + m1 + "h &= " + a2 + " + " + m2 + "h \\\\ " + (a1 - a2) + " &= " + d + "h \\\\ h &= " + t + " \\end{aligned} \\] La réponse est <b>" + t + "</b>.";
  return numq(prompt, t, 0.01, sol, { mode: "gap-break-even", t: t });
}, ["Le seuil de rentabilité veut dire que les deux coûts totaux sont égaux, ce qui donne une équation à résoudre.", "Écris les deux coûts avec h heures et pose-les égaux comme première étape."]);

// PG. L2, 7.1/7.4, CR 3: build the relation from a pattern table, then evaluate far outside the table.
E("u6-gap-pattern-far-cr", 6, ["7.1", "7.4"], 2, "gen", function () {
  var m = ri(3, 7), s = ri(4, 12);
  var N = ri(18, 30);
  var ans = s + m * (N - 1);
  var c1 = s, c2 = s + m, c3 = s + 2 * m, c4 = s + 3 * m;
  var prompt = "Une régularité de tuiles grandit de la même façon à chaque étape. La figure 1 utilise " + c1 + " tuiles, la figure 2 utilise " + c2 + " tuiles, la figure 3 utilise " + c3 + " tuiles et la figure 4 utilise " + c4 + " tuiles. Combien de tuiles la figure " + N + " utilise-t-elle ?";
  var sol = "Chaque figure ajoute " + m + " tuiles, en partant de " + s + " à la figure 1 : \\[ \\begin{aligned} \\text{tuiles} &= " + s + " + " + m + "(n - 1) \\\\ &= " + s + " + " + m + "(" + (N - 1) + ") = " + ans + " \\end{aligned} \\] La réponse est <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-pattern-far", m: m, s: s, N: N });
}, ["Une règle générale pour la régularité doit être construite avant de pouvoir évaluer une figure éloignée.", "Trouve la différence entre les comptes de deux figures voisines comme première étape."]);

// PG. L2, 7.9/7.10, CR 3: use a stated linear relation in reverse (substitute the target, then solve).
E("u6-gap-inverse-cr", 6, ["7.9", "7.10"], 2, "gen", function () {
  var m = ri(2, 6), b = ri(20, 80), t0 = ri(6, 14);
  var T = b + m * t0;
  var prompt = "Un réservoir d'eau se remplit à un rythme constant. La quantité d'eau dans le réservoir, en litres, après t minutes est donnée par A = " + b + " + " + m + "t. Après combien de minutes la quantité atteint-elle " + T + " litres ?";
  var sol = "Pose la relation égale à la quantité cible et résous pour t : \\[ \\begin{aligned} " + b + " + " + m + "t &= " + T + " \\\\ " + m + "t &= " + (T - b) + " \\\\ t &= " + t0 + " \\end{aligned} \\] La réponse est <b>" + t0 + "</b>.";
  return numq(prompt, t0, 0.01, sol, { mode: "gap-inverse", m: m, b: b, T: T });
}, ["La relation s'utilise à l'envers ici : la quantité est connue et le temps est manquant.", "Pose l'expression égale à la quantité cible comme première étape."]);

/* Unit 7: Similarity and Transformations */

// PG. L2, 10.17/10.15, CR 2: find the scale factor from one pair, then apply it to a second length.
E("u7-gap-scale-apply-cr", 7, ["10.17", "10.15"], 2, "gen", function () {
  var k = pick([1.5, 2, 2.5, 3]);
  var o1 = pick([6, 8, 10, 12]);
  var i1 = o1 * k;
  var o2 = pick([5, 7, 9, 11, 14]);
  var ans = Math.round(o2 * k * 100) / 100;
  var ctx = pick([
    "Une affiche est un agrandissement d'un dessin. Un côté du dessin mesure " + o1 + " cm et le côté correspondant de l'affiche mesure " + fmtD(i1) + " cm. Un autre côté du dessin mesure " + o2 + " cm. Quelle est la longueur du côté correspondant de l'affiche, en centimètres ?",
    "Une bannière est un agrandissement d'un logo. Un côté du logo mesure " + o1 + " cm et le côté correspondant de la bannière mesure " + fmtD(i1) + " cm. Un autre côté du logo mesure " + o2 + " cm. Quelle est la longueur du côté correspondant de la bannière, en centimètres ?"
  ]);
  var sol = "Trouve d'abord le facteur d'échelle à partir de la paire connue, puis applique-le au deuxième côté : \\[ \\begin{aligned} \\text{facteur d'échelle} &= " + fmtD(i1) + " \\div " + o1 + " = " + fmtD(k) + " \\\\ \\text{nouveau côté} &= " + o2 + " \\times " + fmtD(k) + " = " + fmtD(ans) + " \\end{aligned} \\] La réponse est <b>" + fmtD(ans) + " cm</b>.";
  var q = numq(ctx, ans, 0.01, sol, { mode: "gap-scale-apply", k: k });
  q.figure = solBarsFig([{ name: "Figure d'origine", len: o1, lab: fmtD(o1) + " cm" }, { name: "Image", len: i1, lab: fmtD(i1) + " cm" }, { name: "Figure d'origine", len: o2, lab: fmtD(o2) + " cm" }, { name: "Image", len: ans, lab: "?" }], "Côtés correspondants d'une figure d'origine et de son image en barres");
  return q;
}, ["Le facteur d'échelle n'est pas donné ; il doit d'abord être retrouvé à partir de la paire de côtés correspondants.", "Divise le côté de l'image par son côté original correspondant comme première étape."]);

// PG. L2, 10.19/10.8, CR 2: map distance to real distance, then travel time at a stated speed.
E("u7-gap-map-time-cr", 7, ["10.19", "10.8"], 2, "gen", function () {
  var R, d, speed, real, hours, guard = 0;
  do { R = pick([4, 5, 6, 8, 9, 10, 12]); d = ri(4, 18); real = R * d; speed = pick([30, 40, 50, 60, 80, 90, 100, 120]); guard++; } while (((2 * real) % speed !== 0 || real / speed < 1 || real / speed > 4) && guard < 300);
  hours = real / speed;
  var prompt = "Sur une carte, 1 cm représente " + R + " km. Deux villes sont à " + d + " cm l'une de l'autre sur la carte. Un autobus roule entre les villes à " + speed + " km/h. Combien d'heures le trajet prend-il ?";
  var sol = "Utilise d'abord l'échelle pour obtenir la distance réelle, puis divise par la vitesse : \\[ \\begin{aligned} \\text{distance réelle} &= " + d + " \\times " + R + " = " + real + "\\text{ km} \\\\ \\text{temps} &= " + real + " \\div " + speed + " = " + fmtD(hours) + "\\text{ h} \\end{aligned} \\] La réponse est <b>" + fmtD(hours) + "</b>.";
  var q = numq(prompt, hours, 0.01, sol, { mode: "gap-map-time", R: R, real: real, speed: speed });
  var figB = solLine([60, 105], [280, 105], false, 2);
  figB += '<circle cx="60" cy="105" r="4" fill="' + FIG_INK + '"/><circle cx="280" cy="105" r="4" fill="' + FIG_INK + '"/>';
  figB += solT(170, 80, fmtD(d) + " cm", 13, false);
  figB += solT(170, 134, "1 cm représente " + fmtD(R) + " km", 12, false);
  q.figure = solSvg(340, 160, figB, "Distance sur la carte entre deux villes");
  return q;
}, ["La mesure sur la carte doit être convertie en distance réelle avant de pouvoir utiliser la vitesse.", "Multiplie la distance sur la carte par la valeur de l'échelle comme première étape."]);

// PG. L2, 10.15/10.17, CR 3: area of the image using the square of the scale factor.
E("u7-gap-area-scale-cr", 7, ["10.15", "10.17"], 2, "gen", function () {
  var k = pick([1.5, 2, 2.5, 3]);
  var w = pick([4, 6, 8, 10]), h = pick([3, 5, 6, 9]);
  var iw = w * k;
  var area = Math.round(w * h * k * k * 100) / 100;
  var prompt = "Un rectangle mesure " + w + " cm de large et " + h + " cm de haut. On l'agrandit pour que la largeur devienne " + fmtD(iw) + " cm. Quelle est l'aire du rectangle agrandi, en centimètres carrés ?";
  var sol = "Trouve d'abord le facteur d'échelle à partir des largeurs ; les aires grandissent par le carré du facteur d'échelle : \\[ \\begin{aligned} \\text{facteur d'échelle} &= " + fmtD(iw) + " \\div " + w + " = " + fmtD(k) + " \\\\ \\text{aire originale} &= " + w + " \\times " + h + " = " + (w * h) + " \\\\ \\text{aire de l'image} &= " + (w * h) + " \\times " + fmtD(k) + "^{2} = " + fmtD(area) + " \\end{aligned} \\] La réponse est <b>" + fmtD(area) + " cm\\(^{2}\\)</b>.";
  var q = numq(prompt, area, 0.01, sol, { mode: "gap-area-scale", k: k });
  q.figure = solRectPair({ w1: w, h1: h, wLab1: fmtD(w) + " cm", hLab1: fmtD(h) + " cm", cap1: "Figure d'origine", w2: iw, h2: h * k, wLab2: fmtD(iw) + " cm", hLab2: "?", cap2: "Agrandissement", aria: "Un rectangle et son agrandissement avec des côtés étiquetés" });
  return q;
}, ["Les longueurs et les aires ne changent pas de la même façon : le facteur d'aire est le carré du facteur de longueur.", "Divise la nouvelle largeur par la largeur originale pour obtenir le facteur d'échelle comme première étape."]);

// PG. L2, 10.19/10.15, CR 3: two shadow heights by proportion, then their difference.
E("u7-gap-shadow-diff-cr", 7, ["10.19", "10.15"], 2, "gen", function () {
  var hp = pick([1.5, 1.6, 1.8]);
  var sp = pick([1, 1.2, 1.5, 2]);
  var m1 = ri(2, 4), m2 = ri(4, 6);
  if (m2 === m1) m2 = m1 + 2;
  var s1 = Math.round(sp * m1 * 10) / 10, s2 = Math.round(sp * m2 * 10) / 10;
  var h1 = Math.round(hp * m1 * 100) / 100, h2 = Math.round(hp * m2 * 100) / 100;
  var ans = Math.round(Math.abs(h2 - h1) * 100) / 100;
  var prompt = "Une personne de " + fmtD(hp) + " m projette une ombre de " + fmtD(sp) + " m de long. Au même moment, une clôture projette une ombre de " + fmtD(s1) + " m de long et un arbre projette une ombre de " + fmtD(s2) + " m de long. Les objets et leurs ombres forment des triangles semblables. Trouve la différence entre la hauteur de l'arbre et la hauteur de la clôture, en mètres.";
  var sol = "Utilise d'abord le rapport d'ombre de la personne sur chaque objet, puis compare les deux hauteurs : \\[ \\begin{aligned} \\text{clôture} &= " + fmtD(hp) + " \\times \\frac{" + fmtD(s1) + "}{" + fmtD(sp) + "} = " + fmtD(h1) + " \\\\ \\text{arbre} &= " + fmtD(hp) + " \\times \\frac{" + fmtD(s2) + "}{" + fmtD(sp) + "} = " + fmtD(h2) + " \\\\ \\text{différence} &= " + fmtD(ans) + " \\end{aligned} \\] La réponse est <b>" + fmtD(ans) + " m</b>.";
  var q = numq(prompt, ans, 0.01, sol, { mode: "gap-shadow-diff", h1: h1, h2: h2 });
  q.figure = solShadowFig([{ name: "Personne", h: hp, s: sp, hLab: fmtD(hp) + " m", sLab: fmtD(sp) + " m" }, { name: "Clôture", h: h1, s: s1, hLab: "?", sLab: fmtD(s1) + " m" }, { name: "Arbre", h: h2, s: s2, hLab: "?", sLab: fmtD(s2) + " m" }], "Une personne, une clôture et un arbre avec leurs ombres");
  return q;
}, ["Chaque hauteur vient de la même proportion d'ombre, et la différence se trouve seulement après que les deux hauteurs sont connues.", "Divise l'ombre de la clôture par l'ombre de la personne pour obtenir la première échelle comme première étape."]);

// PG. L2, 10.17/10.15, CR 3: perimeter of the image after finding the factor from one pair of sides.
E("u7-gap-perimeter-scale-cr", 7, ["10.17", "10.15"], 2, "gen", function () {
  var a = ri(3, 9), b = ri(3, 9), c = ri(3, 9);
  var k = pick([1.5, 2, 2.5, 3, 4]);
  var ai = Math.round(a * k * 10) / 10;
  var P = a + b + c;
  var ans = Math.round(P * k * 100) / 100;
  var prompt = "Un triangle a des côtés de longueurs " + a + " cm, " + b + " cm et " + c + " cm. Un triangle semblable a le côté correspondant au côté de " + a + " cm qui mesure " + fmtD(ai) + " cm. Quel est le périmètre du triangle semblable, en centimètres ?";
  var sol = "Trouve d'abord le facteur d'échelle à partir des côtés correspondants, puis mets tout le périmètre à l'échelle : \\[ \\begin{aligned} \\text{facteur d'échelle} &= " + fmtD(ai) + " \\div " + a + " = " + fmtD(k) + " \\\\ \\text{périmètre} &= (" + a + " + " + b + " + " + c + ") \\times " + fmtD(k) + " = " + fmtD(ans) + " \\end{aligned} \\] La réponse est <b>" + fmtD(ans) + " cm</b>.";
  var q = numq(prompt, ans, 0.01, sol, { mode: "gap-perimeter-scale", k: k, P: P });
  if (a + b > c && a + c > b && b + c > a) {
    var P1 = u7FitTri([a, b, c], 16, 28, 128, 112), P2 = u7FitTri([a * k, b * k, c * k], 192, 28, 128, 112);
    q.figure = u7Svg(345, 165, u7Poly(P1, FIG_SHADE) + solSideLabels(P1, [fmtD(c) + " cm", fmtD(a) + " cm", fmtD(b) + " cm"]) + u7Poly(P2, "#ffffff") + solSideLabels(P2, ["?", fmtD(ai) + " cm", "?"]), "Un triangle d'origine et un triangle semblable avec des étiquettes de côtés");
  }
  return q;
}, ["Les périmètres changent par le même facteur que les côtés, et ce facteur vient de la seule paire connue.", "Divise le côté de l'image par son côté original correspondant comme première étape."]);


/* Unit 8: Circle Geometry */

// PG. L2, 9.7, CR 2: reflex arc measure from an inscribed angle (inscribed to central to reflex).
E("u8-gap-reflex-arc-cr", 8, ["9.7"], 2, "gen", function () {
  var ins = ri(28, 80);
  var central = 2 * ins, ans = 360 - central;
  var prompt = "Les points A, B et C sont sur un cercle de centre O. L'angle inscrit ACB mesure \\(" + ins + "^{\\circ}\\) et il intercepte l'arc mineur AB. Trouve la mesure de l'arc réflexe AB, en degrés.";
  var sol = "L'angle au centre sur l'arc mineur vaut d'abord le double de l'angle inscrit ; l'arc réflexe est ce qui reste du cercle complet : \\[ \\begin{aligned} \\text{arc mineur AB} &= 2 \\times " + ins + "^{\\circ} = " + central + "^{\\circ} \\\\ \\text{arc réflexe AB} &= 360^{\\circ} - " + central + "^{\\circ} = " + ans + "^{\\circ} \\end{aligned} \\] La réponse est <b>\\(" + ans + "^{\\circ}\\)</b>.";
  var q = numq(prompt, ans, 0.01, sol, { mode: "gap-reflex-arc", ins: ins });
  var A = u8P(270 - ins), B = u8P(270 + ins), C = u8P(90);
  q.figure = u8Fig({ pts: { A: A, B: B, C: C }, segs: [["O", "A"], ["O", "B"], ["C", "A"], ["C", "B"]], angles: [{ v: "C", a1: u8Dir(C, A), a2: u8Dir(C, B), r: 0.3, lr: 0.55, label: fmtD(ins) + "°" }] });
  return q;
}, ["Un angle inscrit et son angle au centre sont liés, et un arc réflexe complète le tour complet.", "Double l'angle inscrit pour obtenir l'arc mineur comme première étape."]);

// PG. L2, 9.5, CR 2: angle in a cyclic quadrilateral after combining the parts split by a diagonal.
E("u8-gap-cyclic-diag-cr", 8, ["9.5"], 2, "gen", function () {
  var p = ri(20, 55), q = ri(20, 55);
  var ans = 180 - p - q;
  var prompt = "Les points A, B, C et D sont sur un cercle dans cet ordre, alors ABCD est un quadrilatère cyclique. La diagonale AC partage l'angle A en deux parties : l'angle BAC mesure \\(" + p + "^{\\circ}\\) et l'angle CAD mesure \\(" + q + "^{\\circ}\\). Trouve la mesure de l'angle BCD, en degrés.";
  var sol = "Combine d'abord les deux parties de l'angle A ; les angles opposés d'un quadrilatère cyclique totalisent \\(180^{\\circ}\\) : \\[ \\begin{aligned} \\angle A &= " + p + "^{\\circ} + " + q + "^{\\circ} = " + (p + q) + "^{\\circ} \\\\ \\angle BCD &= 180^{\\circ} - " + (p + q) + "^{\\circ} = " + ans + "^{\\circ} \\end{aligned} \\] La réponse est <b>\\(" + ans + "^{\\circ}\\)</b>.";
  var qq = numq(prompt, ans, 0.01, sol, { mode: "gap-cyclic-diag", p: p, q: q });
  var A = u8P(200), B = u8P(300), C = u8P(300 + 2 * p), D = u8P(300 + 2 * p + 2 * q);
  qq.figure = u8Fig({ pts: { A: A, B: B, C: C, D: D }, segs: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"], ["A", "C"]], angles: [{ v: "A", a1: u8Dir(A, B), a2: u8Dir(A, C), r: 0.26, lr: 0.46, label: fmtD(p) + "°" }, { v: "A", a1: u8Dir(A, C), a2: u8Dir(A, D), r: 0.4, lr: 0.6, label: fmtD(q) + "°" }] });
  return qq;
}, ["L'angle A est donné en deux morceaux, et la propriété des quadrilatères cycliques s'applique à l'angle entier.", "Additionne les deux parties de l'angle A ensemble comme première étape."]);

// PG. L2, 9.7/9.5, CR 3: central angle found from a tangent-radius triangle, then halved for the inscribed angle.
E("u8-gap-tangent-central-cr", 8, ["9.7", "9.5"], 2, "gen", function () {
  var g = 14 + 2 * ri(0, 31);
  var central = 90 - g, ans = central / 2;
  var frame = pick(["droite", "exterieur"]);
  var prompt = frame === "droite"
    ? "Une droite passant par T et P est une tangente à un cercle de centre O, et elle touche le cercle en T. La droite de O passant par P recoupe le cercle en D. Dans le triangle OTP, l'angle en P mesure \\(" + g + "^{\\circ}\\). Le point C est sur l'arc majeur TD. Trouve la mesure de l'angle inscrit TCD, en degrés."
    : "D'un point P à l'extérieur d'un cercle de centre O, une tangente touche le cercle en T, et la droite de P passant par O recoupe le cercle en D. Dans le triangle OTP, l'angle en P mesure \\(" + g + "^{\\circ}\\). Le point C est sur l'arc majeur TD. Trouve la mesure de l'angle inscrit TCD, en degrés.";
  var sol = "Le rayon vers un point de tangence est perpendiculaire à la tangente, alors le triangle OTP est rectangle en T. Trouve d'abord l'angle au centre, puis prends sa moitié : \\[ \\begin{aligned} \\angle TOD &= 180^{\\circ} - 90^{\\circ} - " + g + "^{\\circ} = " + central + "^{\\circ} \\\\ \\angle TCD &= " + central + "^{\\circ} \\div 2 = " + fmtD(ans) + "^{\\circ} \\end{aligned} \\] La réponse est <b>\\(" + fmtD(ans) + "^{\\circ}\\)</b>.";
  var q = numq(prompt, ans, 0.01, sol, { mode: "gap-tangent-central", g: g });
  var tAng = pick([200, 230, 260, 290, 320]);
  var sgn = Math.random() < 0.5 ? 1 : -1;
  var T = u8P(tAng), U = u8P(tAng + sgn * central);
  var sc = 1 / Math.cos(central * Math.PI / 180);
  var P = [U[0] * sc, U[1] * sc], D = U, C = u8P(tAng + sgn * central / 2 + 180);
  q.figure = u8Fig({ pts: { T: T, P: P, D: D, C: C }, segs: [["O", "T"], ["O", "P"], ["C", "T"], ["C", "D"]], tangentSeg: { at: "T", to: "P", beyond: 1.05, back: 0.3 }, rightMarks: [{ v: "T", a1: u8Dir(T, [0, 0]), a2: u8Dir(T, P) }], angles: [{ v: "P", a1: u8Dir(P, T), a2: u8Dir(P, [0, 0]), r: 0.3, lr: 0.55, label: fmtD(g) + "°" }, { v: "C", a1: u8Dir(C, T), a2: u8Dir(C, D), r: 0.3, lr: 0.55, label: "?" }] });
  return q;
}, ["Deux faits sur les cercles s'enchaînent ici : le fait de la tangente construit le triangle, et l'angle inscrit vaut la moitié de l'angle au centre.", "Utilise l'angle droit en T pour trouver l'angle au centre TOD comme première étape."]);

// PG. L2, 9.6/9.5, CR 3: chord radius where the perpendicular-from-centre bisection comes before Pythagoras.
E("u8-gap-chord-bisect-cr", 8, ["9.6", "9.5"], 2, "gen", function () {
  var tr = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [7, 24, 25], [15, 20, 25]]);
  var swap = Math.random() < 0.5;
  var kk = pick([1, 2]);
  var half = (swap ? tr[1] : tr[0]) * kk, d = (swap ? tr[0] : tr[1]) * kk, r = tr[2] * kk;
  var chord = 2 * half;
  var frame = pick(["cercle", "fenetre"]);
  var prompt = frame === "cercle"
    ? "AB est une corde d'un cercle de centre O. La corde AB mesure " + chord + " cm de long, et la distance perpendiculaire de O à la corde est de " + d + " cm. Trouve le rayon du cercle, en centimètres."
    : "Une fenêtre circulaire a pour centre O, et une barre droite AB qui traverse la fenêtre est une corde du cercle. La barre AB mesure " + chord + " cm de long, et la distance perpendiculaire de O à la barre est de " + d + " cm. Trouve le rayon de la fenêtre, en centimètres.";
  var sol = "La perpendiculaire depuis le centre coupe d'abord la corde en deux ; ensuite le rayon est l'hypoténuse du triangle rectangle : \\[ \\begin{aligned} \\text{moitié de la corde} &= " + chord + " \\div 2 = " + half + " \\\\ r^{2} &= " + d + "^{2} + " + half + "^{2} = " + (d * d + half * half) + " \\\\ r &= " + r + " \\end{aligned} \\] La réponse est <b>" + r + " cm</b>.";
  var q = numq(prompt, r, 0.01, sol, { mode: "gap-chord-bisect", half: half, d: d, r: r });
  var A = [-half / r, d / r], B = [half / r, d / r];
  q.figure = u8Fig({ pts: { A: A, B: B }, segs: [["A", "B"], ["O", "A"]], perp: ["A", "B"], sideLabs: [{ a: "A", b: "B", text: fmtD(chord) + " cm", off: 15 }, { a: "O", b: "M", text: fmtD(d) + " cm", off: 15 }, { a: "O", b: "A", text: "?", off: 15 }] });
  return q;
}, ["Le rayon est l'hypoténuse d'un triangle rectangle dont un côté vaut seulement la moitié de la corde donnée.", "Prends la moitié de la longueur de la corde comme première étape."]);

// PG. L2, 9.8/9.5, CR 3: semicircle right angle first, then Pythagoras for the third side.
E("u8-gap-semicircle-pyth-cr", 8, ["9.8", "9.5"], 2, "gen", function () {
  var tr = pick([[6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [7, 24, 25], [20, 21, 29], [9, 40, 41]]);
  var swap = Math.random() < 0.5;
  var kk = pick([1, 2]);
  var given = (swap ? tr[1] : tr[0]) * kk, ans = (swap ? tr[0] : tr[1]) * kk, hyp = tr[2] * kk;
  var frame = pick(["cercle", "arche"]);
  var prompt = frame === "cercle"
    ? "AB est un diamètre d'un cercle, et C est un point sur le cercle. Le diamètre AB mesure " + hyp + " cm de long et le côté AC mesure " + given + " cm de long. Trouve la longueur de BC, en centimètres."
    : "Une arche en demi-cercle a un diamètre AB de " + hyp + " cm. Le point C est sur l'arche, et la distance en ligne droite AC est de " + given + " cm. Trouve la distance en ligne droite BC, en centimètres.";
  var sol = "Un angle inscrit dans un demi-cercle est un angle droit, alors le triangle ABC est rectangle en C et Pythagore s'applique : \\[ \\begin{aligned} BC^{2} &= " + hyp + "^{2} - " + given + "^{2} = " + (hyp * hyp - given * given) + " \\\\ BC &= " + ans + " \\end{aligned} \\] La réponse est <b>" + ans + " cm</b>.";
  var q = numq(prompt, ans, 0.01, sol, { mode: "gap-semicircle-pyth", given: given, hyp: hyp });
  var gam = Math.acos(Math.max(-1, Math.min(1, 2 * (given / hyp) * (given / hyp) - 1))) * 180 / Math.PI;
  var A = [-1, 0], B = [1, 0], C = u8P(gam);
  q.figure = u8Fig({ pts: { A: A, B: B, C: C }, segs: [["A", "B"], ["A", "C"], ["B", "C"]], rightMarks: [{ v: "C", a1: u8Dir(C, A), a2: u8Dir(C, B) }], sideLabs: [{ a: "A", b: "C", text: fmtD(given) + " cm", off: 15 }, { a: "B", b: "C", text: "?", off: 15 }] });
  return q;
}, ["Le diamètre te dit que le triangle est rectangle avant de pouvoir trouver un côté.", "Remarque que l'angle C est un angle droit parce qu'il est dans un demi-cercle, comme première étape."]);

// PG. L2, 9.7, SR: an angle requiring two circle theorems in sequence, with single-theorem distractors.
E("u8-gap-two-theorems-mc", 8, ["9.7"], 2, "gen", function () {
  var p = pick([18, 22, 26, 30, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70]);
  var nm = pick([["Q", "R", "S", "T"], ["A", "B", "C", "D"], ["K", "L", "M", "N"], ["W", "X", "Y", "Z"]]);
  var P1 = nm[0], P2 = nm[1], P3 = nm[2], P4 = nm[3];
  var ans = 180 - p;
  function deg(v) { return "\\(" + v + "^{\\circ}\\)"; }
  var prompt = "Les points " + P1 + ", " + P2 + ", " + P3 + " et " + P4 + " sont sur un cercle de centre O. Le point " + P3 + " est sur l'arc majeur " + P1 + P2 + " et l'angle inscrit " + P1 + P3 + P2 + " mesure " + deg(p) + ". Le point " + P4 + " est sur l'arc mineur " + P1 + P2 + ". Quelle est la mesure de l'angle inscrit " + P1 + P4 + P2 + " ?";
  var sol = "L'arc mineur est d'abord fixé par l'angle au centre, et l'angle sur l'arc mineur utilise l'angle au centre réflexe : \\[ \\begin{aligned} \\text{angle au centre mineur} &= 2 \\times " + p + "^{\\circ} = " + (2 * p) + "^{\\circ} \\\\ \\text{angle au centre réflexe} &= 360^{\\circ} - " + (2 * p) + "^{\\circ} = " + (360 - 2 * p) + "^{\\circ} \\\\ \\angle " + P1 + P4 + P2 + " &= " + (360 - 2 * p) + "^{\\circ} \\div 2 = " + ans + "^{\\circ} \\end{aligned} \\] La réponse est <b>" + deg(ans) + "</b>.";
  var q = mcq(prompt,
    { t: deg(ans), fb: "Exact : l'angle au centre réflexe est divisé en deux, ce qui demande l'étape du doublement et l'étape de l'angle réflexe." },
    [{ t: deg(2 * p), fb: "C'est l'angle au centre mineur tout seul ; l'angle inscrit doit encore venir de l'angle réflexe sur l'autre arc." },
     { t: deg(p), fb: "Cela répète l'angle donné, mais le point demandé est sur l'arc opposé, alors son angle n'est pas le même." },
     { t: deg(360 - 2 * p), fb: "C'est l'angle au centre réflexe lui-même ; un angle inscrit vaut la moitié de son angle au centre, alors il faut encore diviser en deux." }],
    sol, { mode: "gap-two-theorems", p: p });
  var pts = {};
  var A = u8P(270 - p), B = u8P(270 + p), C3 = u8P(90), D4 = u8P(270);
  pts[P1] = A; pts[P2] = B; pts[P3] = C3; pts[P4] = D4;
  q.figure = u8Fig({ pts: pts, segs: [[P3, P1], [P3, P2], [P4, P1], [P4, P2]], angles: [{ v: P3, a1: u8Dir(C3, A), a2: u8Dir(C3, B), r: 0.3, lr: 0.55, label: fmtD(p) + "°" }, { v: P4, a1: u8Dir(D4, A), a2: u8Dir(D4, B), r: 0.3, lr: 0.55, label: "?" }] });
  return q;
}, ["Le point est sur l'arc opposé, alors l'angle au centre réflexe est celui qui lui appartient.", "Double l'angle inscrit donné pour obtenir l'angle au centre mineur comme première étape."]);

/* Unit 9: Probability and Statistics */

// PG. L2, 11.9, CR 2: mean from a frequency table (sum of fx, then divide).
E("u9-gap-freq-mean-cr", 9, ["11.9"], 2, "gen", function () {
  var f1 = ri(2, 9), f2 = ri(2, 9), f3 = ri(2, 9), f4 = ri(2, 9);
  var S = 1 * f1 + 2 * f2 + 3 * f3 + 4 * f4, N = f1 + f2 + f3 + f4;
  var ans = Math.round(S / N * 100) / 100;
  var prompt = "Une classe note combien de livres chaque élève a lus en un mois. Les résultats sont : 1 livre pour " + f1 + " élèves, 2 livres pour " + f2 + " élèves, 3 livres pour " + f3 + " élèves et 4 livres pour " + f4 + " élèves. Trouve la moyenne du nombre de livres lus, avec deux décimales.";
  var sol = "Multiplie d'abord chaque valeur par sa fréquence et additionne, puis divise par le nombre total d'élèves : \\[ \\begin{aligned} \\text{total de livres} &= 1(" + f1 + ") + 2(" + f2 + ") + 3(" + f3 + ") + 4(" + f4 + ") = " + S + " \\\\ \\text{moyenne} &= \\frac{" + S + "}{" + N + "} = " + fmtD(ans) + " \\end{aligned} \\] La réponse est <b>" + fmtD(ans) + "</b>.";
  return numq(prompt, ans, 0.02, sol, { mode: "gap-freq-mean", S: S, N: N });
}, ["La moyenne d'une table de fréquences pondère chaque valeur par le nombre de fois qu'elle se produit.", "Multiplie chaque nombre de livres par son nombre d'élèves comme première étape."]);

// PG. L2, 12.4, CR 2: expected frequency from a probability over N trials.
E("u9-gap-expected-freq-cr", 9, ["12.4"], 2, "gen", function () {
  var b = pick([4, 5, 6, 8, 10]);
  var a = ri(1, b - 1);
  var mult = ri(12, 30);
  var N = b * mult, ans = a * mult;
  var prompt = "Une roulette est divisée en " + b + " secteurs égaux, et " + a + " des secteurs sont rouges. On fait tourner la roulette " + N + " fois. Combien de tours devraient aboutir au rouge ?";
  var sol = "La probabilité du rouge donne la part prévue des tours : \\[ \\begin{aligned} P(\\text{rouge}) &= \\frac{" + a + "}{" + b + "} \\\\ \\text{rouges prévus} &= \\frac{" + a + "}{" + b + "} \\times " + N + " = " + ans + " \\end{aligned} \\] La réponse est <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-expected-freq", a: a, b: b, N: N });
}, ["Un compte prévu est la probabilité appliquée à l'ensemble complet des essais.", "Écris la probabilité du rouge comme une fraction comme première étape."]);

// PG. L2, 12.2, CR 3: probability of at least one success via the complement, as a percent.
E("u9-gap-complement-pct-cr", 9, ["12.2"], 2, "gen", function () {
  var p = pick([10, 20, 30, 40, 50, 60, 70, 80, 90]);
  var trials = pick([2, 3]);
  var ctx = pick([
    { subj: "Un joueur de lancers francs", verb: "marque", named: "le joueur" },
    { subj: "Une archère", verb: "atteint la cible", named: "l'archère" },
    { subj: "Un joueur de soccer", verb: "marque", named: "le joueur" }
  ]);
  var fail = 100 - p;
  var bothFail = Math.round(Math.pow(fail, trials) / Math.pow(100, trials - 1) * 100) / 100;
  var ans = Math.round((100 - bothFail) * 100) / 100;
  var chain = [];
  for (var i = 0; i < trials; i++) chain.push(fail + "\\%");
  var prompt = ctx.subj + " " + ctx.verb + " sur " + p + " % de ses tentatives, et les tentatives sont indépendantes. Dans une série de " + trials + " tentatives, trouve la probabilité, en pourcentage, que " + ctx.named + " réussisse au moins une fois.";
  var sol = "Passe d'abord par le complémentaire : la seule façon de réussir zéro fois est d'échouer à chaque tentative : \\[ \\begin{aligned} P(\\text{échec}) &= 100\\% - " + p + "\\% = " + fail + "\\% \\\\ P(\\text{échec partout}) &= " + chain.join(" \\times ") + " = " + fmtD(bothFail) + "\\% \\\\ P(\\text{au moins une fois}) &= 100\\% - " + fmtD(bothFail) + "\\% = " + fmtD(ans) + "\\% \\end{aligned} \\] La réponse est <b>" + fmtD(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-complement-pct", p: p, trials: trials });
}, ["Au moins une fois, c'est tout sauf le seul cas où cela n'arrive jamais.", "Trouve la probabilité d'un échec comme première étape."]);

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
  var prompt = "L'équipe A marque " + A.v.join(" ; ") + " points en quatre matchs. L'équipe B marque " + B.v.join(" ; ") + " points en quatre matchs. Trouve la différence entre le score moyen de l'équipe A et le score moyen de l'équipe B.";
  var sol = "Trouve d'abord la moyenne de chaque équipe, puis prends la différence : \\[ \\begin{aligned} \\text{moyenne A} &= \\frac{" + A.s + "}{4} = " + fmtD(mA) + " \\\\ \\text{moyenne B} &= \\frac{" + B.s + "}{4} = " + fmtD(mB) + " \\\\ \\text{différence} &= " + fmtD(ans) + " \\end{aligned} \\] La réponse est <b>" + fmtD(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-mean-diff", mA: mA, mB: mB });
}, ["Deux moyennes doivent être calculées séparément avant de pouvoir les comparer.", "Additionne les quatre scores de l'équipe A comme première étape."]);

// PG. L2, 11.6, CR 3: sample count scaled to a population, then the excess over a threshold.
E("u9-gap-sample-scale-cr", 9, ["11.6"], 2, "gen", function () {
  var ns = pick([40, 50, 60, 80, 100]);
  var c = ri(6, Math.floor(ns * 0.7));
  var k = ri(6, 15);
  var pop = ns * k, pred = c * k;
  var T = Math.max(10, (Math.floor(pred / 10) - ri(0, 3)) * 10);
  if (T >= pred) T = pred - 10;
  var ans = pred - T;
  var prompt = "Un sondage auprès de " + ns + " élèves montre que " + c + " d'entre eux marchent pour aller à l'école. L'école entière compte " + fmtD(pop) + " élèves. Prédis combien d'élèves dans toute l'école marchent pour aller à l'école, et trouve de combien cette prédiction dépasse " + fmtD(T) + " élèves. Donne l'excès comme ta réponse.";
  var sol = "Mets d'abord le compte de l'échantillon à l'échelle de la population : \\[ \\begin{aligned} \\text{échelle} &= " + fmtD(pop) + " \\div " + ns + " = " + k + " \\\\ \\text{prédiction} &= " + c + " \\times " + k + " = " + pred + " \\\\ \\text{excès} &= " + pred + " - " + fmtD(T) + " = " + ans + " \\end{aligned} \\] La réponse est <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-sample-scale", pred: pred, T: T });
}, ["Le résultat de l'échantillon doit être mis à l'échelle de la population entière avant toute comparaison.", "Divise la population par la taille de l'échantillon pour obtenir l'échelle comme première étape."]);

// PG. L2, 12.4, CR 3: expected wins from a probability over many plays, then the total points.
E("u9-gap-win-points-cr", 9, ["12.4"], 2, "gen", function () {
  var b = pick([4, 5, 6, 8]);
  var a = ri(1, b - 1);
  var N = b * ri(15, 40);
  var w = ri(2, 6);
  var wins = a * (N / b), ans = wins * w;
  var prompt = "Un jeu de fête foraine se gagne avec une probabilité de \\(" + FR(a, b) + "\\). Une joueuse joue au jeu " + N + " fois, et chaque victoire vaut " + w + " points. Combien de points la joueuse devrait-elle marquer au total ?";
  var sol = "Trouve d'abord le nombre prévu de victoires, puis multiplie par les points de chaque victoire : \\[ \\begin{aligned} \\text{victoires prévues} &= " + FR(a, b) + " \\times " + N + " = " + wins + " \\\\ \\text{points prévus} &= " + wins + " \\times " + w + " = " + ans + " \\end{aligned} \\] La réponse est <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-win-points", wins: wins, w: w });
}, ["Les points viennent des victoires, alors le nombre prévu de victoires doit être trouvé avant de totaliser les points.", "Multiplie la probabilité par le nombre de parties comme première étape."]);

// PG. L2, 11.9, SR: frequency-table mean with forgot-to-divide and wrong-divisor distractors.
E("u9-gap-freq-mean-mc", 9, ["11.9"], 2, "gen", function () {
  var k = ri(1, 12);
  var v1 = k, v2 = k + 2, v3 = k + 4;
  var f1 = ri(2, 5), f2 = ri(2, 6), f3 = ri(2, 5);
  var S = f1 * v1 + f2 * v2 + f3 * v3, N = f1 + f2 + f3;
  var mean = Math.round(S / N * 100) / 100;
  var dWrongDiv = Math.round(S / 3 * 100) / 100;
  var dDouble = Math.round((S + f3 * v3) / N * 100) / 100;
  var prompt = "Un sondage note le nombre d'animaux par ménage. La table montre : " + v1 + " animal pour " + f1 + " ménages, " + v2 + " animaux pour " + f2 + " ménages et " + v3 + " animaux pour " + f3 + " ménages. Quelle est la moyenne du nombre d'animaux par ménage ?";
  var sol = "Multiplie chaque valeur par sa fréquence, additionne, et divise par la fréquence totale : \\[ \\begin{aligned} \\text{moyenne} &= \\frac{" + f1 + "(" + v1 + ") + " + f2 + "(" + v2 + ") + " + f3 + "(" + v3 + ")}{" + N + "} = \\frac{" + S + "}{" + N + "} = " + fmtD(mean) + " \\end{aligned} \\] La réponse est <b>" + fmtDF(mean, 2) + "</b>.";
  return mcq(prompt,
    { t: fmtDF(mean, 2), fb: "Exact : le total pondéré est divisé par le nombre total de ménages." },
    [{ t: fmtDF(S, 2), fb: "C'est le total pondéré tout seul ; il doit encore être divisé par le nombre total de ménages." },
     { t: fmtDF(dWrongDiv, 2), fb: "Cela divise par le nombre de lignes de la table ; le diviseur devrait être le nombre total de ménages." },
     { t: fmtDF(dDouble, 2), fb: "Cela compte la dernière ligne de la table deux fois avant de diviser, ce qui gonfle le total." }],
    sol, { mode: "gap-freq-mean-mc", S: S, N: N });
}, ["La moyenne d'une table de fréquences pondère chaque valeur par le nombre de fois qu'elle se produit, puis divise par le compte total.", "Multiplie chaque nombre d'animaux par son nombre de ménages comme première étape."]);

/* ============ Constructed-response marks (generated) ============ */
/* Built by assemble-bank.py from the CRMARKS manifests at the top of
   each unit file. Exam Section B draws only from these entries. */
window.__BANK_CRMARKS={"u1-frac-context":3,"u1-gap-brackets-cr":3,"u1-gap-div-add-cr":3,"u1-gap-mean-target-cr":3,"u1-gap-order-ops-cr":2,"u1-gap-total-change-cr":3,"u1-gap-two-expr-diff-cr":2,"u1-money-decimals":3,"u1-multistep-rational":3,"u1-ooo-calculator":2,"u1-ooo-evaluate-mc":3,"u1-ooo-first-error":2,"u1-ordering-reasoning-var":2,"u2-best-estimate-side":2,"u2-gap-estimate-gap-cr":2,"u2-gap-pyramid-slant-cr":3,"u2-overlap":2,"u2-overlap-hidden":2,"u2-sa-composite-rect":3,"u2-sa-cyl-on-prism":3,"u2-sa-problem":2,"u2-sa-single":3,"u2-sa-tri-context":3,"u3-difference-of-powers":2,"u3-find-the-error":2,"u3-gap-growth-excess-cr":3,"u3-gap-laws-eval-cr":2,"u3-gap-power-diff-cr":3,"u3-gap-sci-product-cr":3,"u3-gap-simplify-sub-cr":2,"u3-gap-solve-exponent-cr":3,"u3-law-then-sum-difference":2,"u3-power-of-product-quotient":3,"u3-sum-of-powers":3,"u3-three-laws-evaluate":3,"u3-two-laws-evaluate":3,"u4-add":3,"u4-area-monomial":2,"u4-divide-monomial":2,"u4-gap-add-eval-cr":2,"u4-gap-area-eval-cr":3,"u4-gap-div-eval-cr":3,"u4-gap-mono-coeff-cr":2,"u4-gap-perimeter-eval-cr":3,"u4-gap-sub-eval-neg-cr":3,"u4-missing":3,"u4-mult-div-mixed":2,"u4-multiply-monomial":3,"u4-subtract":3,"u5-gap-both-sides-cr":2,"u5-gap-ineq-boundary-cr":2,"u5-gap-min-items-cr":3,"u5-gap-solve-eval-cr":3,"u5-list-satisfies":2,"u5-solve-brackets-both":3,"u5-solve-ineq-addsub":3,"u5-solve-two-step":3,"u5-verify-error":2,"u5-word-brackets":2,"u5-word-two-step":3,"u6-gap-break-even-cr":3,"u6-gap-inverse-cr":3,"u6-gap-missing-coord-cr":2,"u6-gap-pattern-far-cr":3,"u6-gap-slope-table-cr":2,"u6-interpolate-graph":3,"u6-pattern-large":2,"u6-pattern-solve-n":3,"u6-pattern-word-total":2,"u6-point-on-graph":2,"u6-table-extend":3,"u6-two-plans-graph":3,"u7-complete-half":2,"u7-draw-similar-num":3,"u7-gap-area-scale-cr":3,"u7-gap-map-time-cr":2,"u7-gap-perimeter-scale-cr":3,"u7-gap-scale-apply-cr":2,"u7-gap-shadow-diff-cr":3,"u7-indirect-measure-num":2,"u7-scale-draw-num":3,"u7-similar-context-num":3,"u7-similar-two-step-num":3,"u7-translation-rule":2,"u8-chord-length":3,"u8-chord-two-step":3,"u8-gap-chord-bisect-cr":3,"u8-gap-cyclic-diag-cr":2,"u8-gap-reflex-arc-cr":2,"u8-gap-semicircle-pyth-cr":3,"u8-gap-tangent-central-cr":3,"u8-inscribed-reflex":3,"u8-same-arc-angles":2,"u8-semicircle-angle":2,"u8-tangent-central-inscribed":2,"u8-tangent-length":3,"u9-collection-biggest-threat":3,"u9-collection-problem":3,"u9-combined-decision":3,"u9-gap-complement-pct-cr":3,"u9-gap-expected-freq-cr":2,"u9-gap-freq-mean-cr":2,"u9-gap-mean-diff-cr":3,"u9-gap-sample-scale-cr":3,"u9-gap-win-points-cr":3,"u9-generalization-critique":2,"u9-match-influence":3,"u9-plan-element":2,"u9-rubric-missing-part":2};
