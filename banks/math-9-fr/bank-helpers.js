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
