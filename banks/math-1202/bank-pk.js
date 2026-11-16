/* Math 1202 PK tranche (November 16, 2026). Prior knowledge check entries
   for all seven units, per Math-1202-PK-Tranche-Spec-2026-11-16.md. Borrowed
   generators are verbatim copies from the Mathematics 7, 8 and 9 banks (only
   the entry id, unit, host indicator tag and tranche metadata differ); two
   entries are authored against elementary outcomes (Mathematics 5 outcomes
   MA5.9.8, MA5.9.9 and MA5.9.10 in Unit 2; Mathematics 6 outcome MA6.9.2 in
   Unit 5), and one entry is borrowed from the Math 8 tranche's authored
   stock (the protractor entry, Mathematics 6 outcome MA6.9.13). The feeder
   helper functions the borrowed generators call, and that neither the shell
   nor this bank defines, are ported verbatim below. No CRMARKS lines are
   carried over: borrowed entries bring no CR marks into this bank, on the
   Math 9 tranche convention. */
function u5pick3(c, cands) { var out = [], seen = [c]; for (var i = 0; i < cands.length && out.length < 3; i++) { if (seen.indexOf(cands[i].t) < 0) { seen.push(cands[i].t); out.push(cands[i]); } } return out; }
function u5gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
function u4d3(val,cands){var out=[];for(var i=0;i<cands.length;i++){var c=cands[i];if(c!==val&&c>0&&out.indexOf(c)<0){out.push(c);}if(out.length===3){break;}}return out;}
function m8NetAreaSVG(top,front,side){
  var s='<svg viewBox="0 0 300 190" width="300" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: the net of a right rectangular prism with the area of each face marked">';
  s+='<rect x="110" y="60" width="70" height="46" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<rect x="40" y="60" width="70" height="46" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<rect x="180" y="60" width="70" height="46" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<rect x="110" y="14" width="70" height="46" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<rect x="110" y="106" width="70" height="46" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<rect x="180" y="106" width="70" height="46" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+=_txt(145,83,top+" cm²",11,true);
  s+=_txt(145,37,front+" cm²",11,false);
  s+=_txt(145,129,front+" cm²",11,false);
  s+=_txt(75,83,side+" cm²",11,false);
  s+=_txt(215,83,side+" cm²",11,false);
  s+=_txt(215,129,top+" cm²",11,false);
  return s+'</svg>';
}
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
function u4r1(x){return Math.round(x*10)/10;}
function u4r2(x){return Math.round(x*100)/100;}
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
function u5r2(x) { return Math.round(x * 100) / 100; }
function u1triFig(hyp,legV,base,labHyp,labV,labB){
  return triSVG(hyp,legV,base,{L:["A","B","C"],side:[labHyp,labV,labB]});
}
function u1round(x, p) { var m = Math.pow(10, p); return Math.round(x * m) / m; }
function solT(x, y, str, size, bold) {
  return '<text x="' + fmt(x, 1) + '" y="' + fmt(y, 1) + '" font-size="' + (size || 12) + '" fill="' + FIG_INK + '" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="middle" dominant-baseline="central"' + (bold ? ' font-weight="bold"' : "") + '>' + str + '</text>';
}
function u3disp(n, d) { var r = u3red(n, d); n = r[0]; d = r[1]; if (d === 1) return "\\(" + n + "\\)"; if (n < d) return "\\(" + FR(n, d) + "\\)"; var w = Math.floor(n / d), rem = n % d; if (rem === 0) return "\\(" + w + "\\)"; return "\\(" + w + FR(rem, d) + "\\)"; }
function u3red(n, d) { var g = u3gcd(n, d); return [n / g, d / g]; }
function u3gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
function fmtPairDs(keyT, ds) {
  function exactDp(v) { for (var d = 0; d <= 6; d++) { if (Math.abs(v * Math.pow(10, d) - Math.round(v * Math.pow(10, d))) < 1e-9) return d; } return 6; }
  var m = String(keyT).match(/\.(\d+)/); var kd = m ? m[1].length : 0;
  var pairIdx = -1;
  for (var i = 0; i < ds.length; i++) { if (exactDp(ds[i].v) <= kd) { pairIdx = i; break; } }
  if (pairIdx < 0) { var am = 0; ds.forEach(function (d) { am = Math.max(am, exactDp(d.v)); }); return ds.map(function (d) { return { t: fmtF(d.v, am), fb: d.fb }; }); }
  var common = 0; ds.forEach(function (d, i) { if (i !== pairIdx) common = Math.max(common, exactDp(d.v)); });
  return ds.map(function (d, i) { return { t: fmtF(d.v, i === pairIdx ? kd : common), fb: d.fb }; });
}
function u1frac(n, d) { var r = u1red(n, d); n = r[0]; d = r[1]; if (d === 1) return "\\(" + n + "\\)"; if (n < 0) return "\\(-" + FR(-n, d) + "\\)"; return "\\(" + FR(n, d) + "\\)"; }
function u1red(n, d) { var g = u1gcd(n, d); return [n / g, d / g]; }
function u1gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
function u2d3(val,cands){var out=[];for(var i=0;i<cands.length;i++){var c=cands[i];if(c!==val&&c>0&&out.indexOf(c)<0){out.push(c);}if(out.length===3){break;}}return out;}
function solSquare(areaLab, sideLab, aria) {
  var s = '<svg viewBox="0 0 200 172" width="200" height="172" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + aria + '">';
  s += '<rect x="45" y="14" width="110" height="110" fill="#eceff1" stroke="#37474f" stroke-width="2"/>';
  s += solT(100, 69, areaLab, 14, true);
  s += solT(100, 146, sideLab, 13, false);
  return s + "</svg>";
}
function u2r1(x){return Math.round(x*10)/10;}
function u2r2(x){return Math.round(x*100)/100;}
function u2gcd(a,b){while(b){var t=a%b;a=b;b=t;}return a;}
function u2nonSquare(lo,hi){var n=ri(lo,hi);var t=0;while(Math.floor(Math.sqrt(n))*Math.floor(Math.sqrt(n))===n&&t<60){n=ri(lo,hi);t++;}return n;}
function u7FitTri(sides, bx, by, bw, bh) {
  var pts = u7TriCoords(sides);
  var xs = pts.map(function (p) { return p[0]; }), ys = pts.map(function (p) { return p[1]; });
  var w = Math.max.apply(null, xs) - Math.min.apply(null, xs), h = Math.max.apply(null, ys) - Math.min.apply(null, ys);
  var sc = Math.min(bw / Math.max(w, 0.01), bh / Math.max(h, 0.01));
  var cx = (Math.max.apply(null, xs) + Math.min.apply(null, xs)) / 2, cy = (Math.max.apply(null, ys) + Math.min.apply(null, ys)) / 2;
  return pts.map(function (p) { return [bx + bw / 2 + (p[0] - cx) * sc, by + bh / 2 - (p[1] - cy) * sc]; });
}
function u7Poly(pts, fill, dash) {
  return '<polygon points="' + u7Pts(pts) + '" fill="' + (fill || "none") + '" stroke="' + FIG_INK + '" stroke-width="2"' + (dash ? ' stroke-dasharray="6 4"' : "") + '/>';
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
function u7Svg(W, H, body, aria) {
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + aria + '">' + body + '</svg>';
}
function u7TriCoords(sides) {
  var a = sides[0], b = sides[1], c = sides[2];
  var cx = (b * b + c * c - a * a) / (2 * c);
  var h = Math.sqrt(Math.max(b * b - cx * cx, 0.01));
  return [[0, 0], [c, 0], [cx, h]];
}
function u7Pts(pts) { return pts.map(function (p) { return fmt(p[0], 1) + "," + fmt(p[1], 1); }).join(" "); }
function u7T(x, y, str, size, bold, anchor) {
  return '<text x="' + fmt(x, 1) + '" y="' + fmt(y, 1) + '" font-size="' + (size || 13) + '" fill="' + FIG_INK + '" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="' + (anchor || "middle") + '" dominant-baseline="central"' + (bold ? ' font-weight="bold"' : "") + '>' + str + '</text>';
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
function solPoly(pts, fill, dash) {
  return '<polygon points="' + solPts(pts) + '" fill="' + (fill || "none") + '" stroke="' + FIG_INK + '" stroke-width="2"' + (dash ? ' stroke-dasharray="5 4"' : "") + '/>';
}
function solSvg(W, H, body, aria) {
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + aria + '">' + body + '</svg>';
}
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
function solPts(pts) { return pts.map(function (p) { return fmt(p[0], 1) + "," + fmt(p[1], 1); }).join(" "); }
function solLine(p, q, dash, w) {
  return '<line x1="' + fmt(p[0], 1) + '" y1="' + fmt(p[1], 1) + '" x2="' + fmt(q[0], 1) + '" y2="' + fmt(q[1], 1) + '" stroke="' + FIG_INK + '" stroke-width="' + (w || 2) + '"' + (dash ? ' stroke-dasharray="5 4"' : "") + '/>';
}
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
function figParaRect(bLabel,hLabel){
  var out='<svg viewBox="0 0 350 180" width="350" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parallelogram cut and rearranged into a rectangle">';
  out+='<polygon points="30,125 130,125 155,50 55,50" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<line x1="55" y1="50" x2="55" y2="125" stroke="'+FIG_ALT+'" stroke-width="1.8" stroke-dasharray="5 4"/>';
  out+='<path d="M 100 32 Q 175 6 232 30" fill="none" stroke="'+FIG_ACC+'" stroke-width="2"/>';
  out+='<polygon points="240,31 225,24 227,39" fill="'+FIG_ACC+'"/>';
  out+='<rect x="195" y="50" width="100" height="75" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<polygon points="270,125 295,125 295,50" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  out+=_txt(80,145,bLabel,12.5,false);
  out+=_txt(245,145,bLabel,12.5,false);
  out+=_txt(74,88,hLabel,12,false);
  return out+'</svg>';
}
function figBisect(kind){
  var out='<svg viewBox="0 0 260 180" width="260" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bisector diagram">';
  if(kind==="angle"){
    out+='<line x1="50" y1="95" x2="215" y2="30" stroke="'+FIG_INK+'" stroke-width="2"/>';
    out+='<line x1="50" y1="95" x2="215" y2="160" stroke="'+FIG_INK+'" stroke-width="2"/>';
    out+='<line x1="50" y1="95" x2="220" y2="95" stroke="'+FIG_ACC+'" stroke-width="2" stroke-dasharray="6 4"/>';
    out+='<path d="M 94.7 77.4 A 48 48 0 0 1 94.7 112.6" fill="none" stroke="'+FIG_INK+'" stroke-width="1.4"/>';
    out+='<path d="M 81.7 82.5 A 34 34 0 0 1 81.7 107.5" fill="none" stroke="'+FIG_INK+'" stroke-width="1.4"/>';
    out+='<circle cx="50" cy="95" r="3" fill="'+FIG_INK+'"/>';
    return out+'</svg>';
  }
  if(kind==="construct"){
    out+='<circle cx="55" cy="115" r="78" fill="none" stroke="'+FIG_ACC+'" stroke-width="1.4" stroke-dasharray="5 4"/>';
    out+='<circle cx="205" cy="115" r="78" fill="none" stroke="'+FIG_ACC+'" stroke-width="1.4" stroke-dasharray="5 4"/>';
  }
  out+='<line x1="35" y1="115" x2="225" y2="115" stroke="'+FIG_INK+'" stroke-width="2.2"/>';
  out+='<circle cx="35" cy="115" r="3" fill="'+FIG_INK+'"/><circle cx="225" cy="115" r="3" fill="'+FIG_INK+'"/>';
  out+='<circle cx="130" cy="115" r="3" fill="'+FIG_INK+'"/>';
  out+='<line x1="130" y1="22" x2="130" y2="162" stroke="'+FIG_ACC+'" stroke-width="2" stroke-dasharray="6 4"/>';
  out+='<path d="M 130 103 h 12 v 12" fill="none" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
  return out+'</svg>';
}
function u8numOpts(correct,cands){var out=[],seen={};seen[String(correct)]=1;for(var i=0;i<cands.length;i++){var v=cands[i];if(v===null||v===undefined)continue;var k=String(v);if(!seen[k]){seen[k]=1;out.push(v);if(out.length===3)break;}}var step=1;while(out.length<3){var v=correct+step;if(!seen[String(v)]){seen[String(v)]=1;out.push(v);}step++;}return out;}
function figAngleBisectTotal(totalLabel){
  var out='<svg viewBox="0 0 260 180" width="260" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Angle split by its bisector">';
  out+='<line x1="50" y1="95" x2="215" y2="30" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<line x1="50" y1="95" x2="215" y2="160" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<line x1="50" y1="95" x2="220" y2="95" stroke="'+FIG_ACC+'" stroke-width="2" stroke-dasharray="6 4"/>';
  out+='<path d="M 94.7 77.4 A 48 48 0 0 1 94.7 112.6" fill="none" stroke="'+FIG_INK+'" stroke-width="1.4"/>';
  out+='<circle cx="50" cy="95" r="3" fill="'+FIG_INK+'"/>';
  out+=_txt(126,95,totalLabel,12.5,false);
  out+=_txt(160,72,"?",12,true)+_txt(160,120,"?",12,true);
  return out+'</svg>';
}
function figEqui(abLabel,paLabel){
  var out='<svg viewBox="0 0 260 180" width="260" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Point on the perpendicular bisector of a segment">';
  out+='<line x1="130" y1="18" x2="130" y2="162" stroke="'+FIG_ACC+'" stroke-width="1.8" stroke-dasharray="6 4"/>';
  out+='<line x1="40" y1="145" x2="220" y2="145" stroke="'+FIG_INK+'" stroke-width="2.2"/>';
  out+='<line x1="130" y1="35" x2="40" y2="145" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<line x1="130" y1="35" x2="220" y2="145" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<circle cx="40" cy="145" r="3" fill="'+FIG_INK+'"/><circle cx="220" cy="145" r="3" fill="'+FIG_INK+'"/>';
  out+='<circle cx="130" cy="145" r="3" fill="'+FIG_INK+'"/>';
  out+='<circle cx="130" cy="35" r="3.6" fill="'+FIG_ALT+'"/>';
  out+=_txt(122,22,"P",13,true)+_txt(32,160,"A",13,true)+_txt(228,160,"B",13,true);
  out+=_txt(72,84,paLabel,12,false);
  if(abLabel)out+=_txt(130,168,abLabel,12,false);
  return out+'</svg>';
}
function figSegMid(totalLabel){
  var out='<svg viewBox="0 0 260 175" width="260" height="175" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Segment crossed at its midpoint by its perpendicular bisector">';
  out+='<line x1="35" y1="100" x2="225" y2="100" stroke="'+FIG_INK+'" stroke-width="2.2"/>';
  out+='<circle cx="35" cy="100" r="3" fill="'+FIG_INK+'"/><circle cx="225" cy="100" r="3" fill="'+FIG_INK+'"/>';
  out+='<circle cx="130" cy="100" r="3.2" fill="'+FIG_ALT+'"/>';
  out+='<line x1="130" y1="28" x2="130" y2="140" stroke="'+FIG_ACC+'" stroke-width="2" stroke-dasharray="6 4"/>';
  out+='<path d="M 130 88 h 12 v 12" fill="none" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
  out+=_txt(82,124,"?",13,true)+_txt(178,124,"?",13,true);
  out+=_txt(130,160,totalLabel,12.5,false);
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
E("u1-pk-express-rate",1,["1.1"], 1, "gen", function () {
  var tmpls = [
    { desc: "A bus travels {A} km in {B} h", u1: "km", u2: "h", w1: "kilometres", w2: "hour" },
    { desc: "A tap fills {A} L in {B} min", u1: "L", u2: "min", w1: "litres", w2: "minute" },
    { desc: "A worker earns ${A} in {B} h", u1: "$", u2: "h", w1: "dollars", w2: "hour" },
    { desc: "A printer prints {A} pages in {B} min", u1: "pages", u2: "min", w1: "pages", w2: "minute" },
    { desc: "A car uses {A} L of fuel for {B} km driven", u1: "L", u2: "km", w1: "litres", w2: "kilometre" },
    { desc: "A ferry carries {A} passengers in {B} trips", u1: "passengers", u2: "trips", w1: "passengers", w2: "trip" },
    { desc: "A heart beats {A} times in {B} min", u1: "beats", u2: "min", w1: "beats", w2: "minute" },
    { desc: "Snow falls {A} cm in {B} h", u1: "cm", u2: "h", w1: "centimetres", w2: "hour" }
  ];
  var t = pick(tmpls), A = ri(4, 95), B = pick([2, 3, 4, 5, 6, 8, 10, 12]);
  var desc = t.desc.replace("{A}", A).replace("{B}", B);
  var corr = A + " " + t.u1 + "/" + B + " " + t.u2;
  var cands = [
    { t: B + " " + t.u2 + "/" + A + " " + t.u1, fb: "That reverses the rate; the amount measured goes first and the unit it is measured against goes second." },
    { t: A + " " + t.u2 + "/" + B + " " + t.u1, fb: "That swaps the two units; each number must keep the unit it was measured in." },
    { t: A + " " + t.u1 + " in total", fb: "That gives only the amount; a rate must also say what the amount is measured against." },
    { t: A + ":" + B, fb: "That is ratio notation for two amounts of the same kind; a rate keeps both units written in." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "A rate joins an amount to the unit it is measured against: \\[ \\begin{aligned} \\text{rate} &= " + A + " \\text{ " + t.w1 + " per } " + B + " \\text{ " + t.w2 + "} \\end{aligned} \\] Written with symbols, the rate is <b>" + corr + "</b>.";
  return mcq(desc + ". Which expression records this rate with symbols?", { t: corr, fb: "Correct: the measured amount and its unit come first, then the unit it is measured against." }, ds, sol, { mode: "express-rate", a: A, b: B });
}, ["A rate compares two different units, and both units stay in the written rate.", "First write the measured amount with its unit, then a slash, then the second amount with its unit."]);
E("u1-pk-identify-rate",1,["1.1"], 1, "gen", function () {
  var tmpls = [
    { s: "Maya rode {A} km in {B} h on a coastal trail and paid a $12 trail fee.", A: [12, 60], B: [2, 6], corr: function (A, B) { return A + " km in " + B + " h"; }, rev: function (A, B) { return B + " h in " + A + " km"; }, wrong: "12 dollars for the trail fee", wfb: "The fee is a single amount with no second amount to compare it with, so it is not the rate in this example." },
    { s: "A pump moved {A} L of water in {B} min while a crew of 6 workers watched.", A: [20, 90], B: [2, 9], corr: function (A, B) { return A + " L in " + B + " min"; }, rev: function (A, B) { return B + " min in " + A + " L"; }, wrong: "6 workers on the crew", wfb: "The crew size is a single count with no comparison built in, so it is not the rate in this example." },
    { s: "Jonah earned ${A} for {B} h of yard work and bought a $9 snack afterward.", A: [30, 120], B: [2, 8], corr: function (A, B) { return "$" + A + " in " + B + " h"; }, rev: function (A, B) { return B + " h for $" + A; }, wrong: "$9 for the snack", wfb: "The snack price is a single amount, not a comparison of two amounts, so it is not the rate here." },
    { s: "A printer produced {A} pages in {B} min using 2 ink cartridges.", A: [30, 150], B: [2, 10], corr: function (A, B) { return A + " pages in " + B + " min"; }, rev: function (A, B) { return B + " min in " + A + " pages"; }, wrong: "2 ink cartridges", wfb: "The cartridge count is a single count, not a comparison of two amounts, so it is not the rate here." }
  ];
  var t = pick(tmpls), A = ri(t.A[0], t.A[1]), B = ri(t.B[0], t.B[1]);
  var corr = t.corr(A, B);
  var cands = [
    { t: t.rev(A, B), fb: "That reverses the comparison; the amount earned, moved or produced is described over the time it took." },
    { t: t.wrong, fb: t.wfb },
    { t: A + " to " + B + " as a ratio of the same kind", fb: "The two amounts here have different units, so together they form a rate, not a same-kind ratio." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "A rate is the pair of amounts with different units that go together in the example: \\[ \\begin{aligned} \\text{rate} &= \\text{two amounts measured in different units} \\end{aligned} \\] So the rate described is <b>" + corr + "</b>.";
  return mcq(t.s.replace("{A}", A).replace("{B}", B) + " Which pair of amounts gives the rate in this example?", { t: corr, fb: "Correct: those two amounts, with different units, are the ones compared in the example." }, ds, sol, { mode: "identify-rate", a: A, b: B });
}, ["A rate in an example is a pair of amounts with different units that belong together.", "First look for two amounts measured in different units that describe the same activity."]);
E("u1-pk-rate-problem",1,["1.2"], 2, "gen", function () {
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
E("u1-pk-better-buy",1,["1.2"], 3, "gen", function () {
  var items = [
    { thing: "granola bars", unit: "bar" }, { thing: "juice boxes", unit: "box" }, { thing: "pencils", unit: "pencil" },
    { thing: "muffins", unit: "muffin" }, { thing: "stickers", unit: "sticker" }, { thing: "tennis balls", unit: "ball" }
  ];
  var it = pick(items);
  var c1 = ri(4, 12), c2 = ri(4, 16); if (c2 === c1) c2 += 4;
  var u1 = ri(40, 120), u2 = u1 + pick([-25, -20, -15, -10, 10, 15, 20, 25]); if (u2 < 25) u2 = u1 + 20;
  var p1 = c1 * u1 / 100, p2 = c2 * u2 / 100;
  var aBetter = u1 < u2;
  var corr = aBetter ? "Pack A, at $" + fmtF(u1 / 100, 2) + " for each " + it.unit : "Pack B, at $" + fmtF(u2 / 100, 2) + " for each " + it.unit;
  var other = aBetter ? "Pack B, at $" + fmtF(u2 / 100, 2) + " for each " + it.unit : "Pack A, at $" + fmtF(u1 / 100, 2) + " for each " + it.unit;
  var cands = [
    { t: other, fb: "That pack costs more for each " + it.unit + "; compare the price for one item, not the pack price alone." },
    { t: "Both packs cost the same for each " + it.unit + ".", fb: "The unit prices are different; divide each pack price by its count to see the gap." },
    { t: "The packs cannot be compared, since counts differ.", fb: "Different counts are exactly why unit rates are used; the price for one item can always be compared." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Compare the price for a single item in each pack: \\[ \\begin{aligned} \\text{Pack A} &= " + fmtF(p1, 2) + " \\div " + c1 + " = " + fmtF(u1 / 100, 2) + " \\text{ per " + it.unit + "} \\\\ \\text{Pack B} &= " + fmtF(p2, 2) + " \\div " + c2 + " = " + fmtF(u2 / 100, 2) + " \\text{ per " + it.unit + "} \\end{aligned} \\] The lower unit price wins, so the better buy is <b>" + corr + "</b>.";
  return mcq("Pack A holds " + c1 + " " + it.thing + " and costs $" + fmtF(p1, 2) + ". Pack B holds " + c2 + " " + it.thing + " and costs $" + fmtF(p2, 2) + ". Which pack is the better buy?", { t: corr, fb: "Correct: that pack has the lower price for each single item." }, ds, sol, { mode: "better-buy", c1: c1, c2: c2 });
}, ["Pack prices cannot be compared directly when the packs hold different counts; compare one item at a time.", "First divide each pack price by the number of items in that pack."]);
E("u1-pk-percent-of",1,["1.4"], 1, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var pairs = [[20, 150], [25, 240], [30, 120], [40, 250], [50, 180], [60, 350], [75, 160], [80, 450], [15, 200], [35, 300], [90, 600], [10, 480], [45, 220], [55, 400], [65, 500], [70, 320], [85, 700], [95, 900], [5, 640], [12, 350], [18, 450], [22, 550]];
    var pr = pick(pairs), p = pr[0], W = pr[1], ans = W * p / 100;
    var ctxs = [
      "In a survey, " + p + "% of " + W + " students said they walk to school. How many students said they walk to school?",
      "A hockey team won " + p + "% of its " + W + " shots on goal as goals this season. How many goals did the team score?",
      "A store sold " + p + "% of " + W + " concert tickets in the first hour. How many tickets were sold in the first hour?"
    ];
    var prompt = pick(ctxs);
    var sol = "Find the percent of the whole amount: \\[ \\begin{aligned} " + p + "\\% \\text{ of } " + W + " &= " + fmt(p / 100, 2) + " \\times " + W + " \\\\ &= " + fmt(ans, 0) + " \\end{aligned} \\] So the answer is <b>" + fmt(ans, 0) + "</b>.";
    return numq(prompt, ans, 0.01, sol, { mode: "pct-of-std", p: p, w: W });
  }
  if (mode === 1) {
    var pairs2 = [[110, 200], [120, 250], [125, 160], [130, 300], [150, 240], [175, 120], [200, 90], [140, 350], [115, 400], [135, 500], [160, 450], [180, 600], [225, 320], [250, 280]];
    var pr2 = pick(pairs2), p2 = pr2[0], W2 = pr2[1], ans2 = W2 * p2 / 100;
    var prompt2 = "Last year a trail crew cleared " + W2 + " m of trail. This year the crew cleared " + p2 + "% as much trail as last year. How many metres of trail did the crew clear this year?";
    var sol2 = "A percent over 100% gives an amount larger than the whole it is compared with: \\[ \\begin{aligned} " + p2 + "\\% \\text{ of } " + W2 + " &= " + fmt(p2 / 100, 2) + " \\times " + W2 + " \\\\ &= " + fmt(ans2, 0) + " \\end{aligned} \\] So the crew cleared <b>" + fmt(ans2, 0) + " m</b>.";
    return numq(prompt2, ans2, 0.01, sol2, { mode: "pct-of-over", p: p2, w: W2 });
  }
  var pairs3 = [[5, 4000], [4, 5000], [8, 2000], [5, 8000], [2, 10000], [8, 6000], [4, 12000], [2, 15000], [5, 20000], [8, 9000], [4, 25000], [2, 30000]];
  var pr3 = pick(pairs3), p10 = pr3[0], W3 = pr3[1], ans3 = W3 * p10 / 1000;
  var pStr3 = fmt(p10 / 10, 1);
  var prompt3 = "A town has " + W3 + " residents. About " + pStr3 + "% of the residents were born on a holiday. About how many residents were born on a holiday?";
  var sol3 = "A percent under 1% is a small fraction of the whole: \\[ \\begin{aligned} " + pStr3 + "\\% \\text{ of } " + W3 + " &= " + fmt(p10 / 1000, 4) + " \\times " + W3 + " \\\\ &= " + fmt(ans3, 0) + " \\end{aligned} \\] So about <b>" + fmt(ans3, 0) + " residents</b> were born on a holiday.";
  return numq(prompt3, ans3, 0.01, sol3, { mode: "pct-of-small", p: pStr3, w: W3 });
}, ["Turn the percent into a decimal first, then multiply by the whole amount.", "First write the percent as a decimal by dividing it by 100."]);
E("u1-pk-percent-convert",1,["1.4"], 1, "gen", function () {
  var pool = [
    { s: "5", pn: 5, pd: 1 }, { s: "10", pn: 10, pd: 1 }, { s: "15", pn: 15, pd: 1 }, { s: "20", pn: 20, pd: 1 },
    { s: "25", pn: 25, pd: 1 }, { s: "30", pn: 30, pd: 1 }, { s: "35", pn: 35, pd: 1 }, { s: "40", pn: 40, pd: 1 },
    { s: "45", pn: 45, pd: 1 }, { s: "55", pn: 55, pd: 1 }, { s: "60", pn: 60, pd: 1 }, { s: "65", pn: 65, pd: 1 },
    { s: "70", pn: 70, pd: 1 }, { s: "75", pn: 75, pd: 1 }, { s: "80", pn: 80, pd: 1 }, { s: "85", pn: 85, pd: 1 },
    { s: "90", pn: 90, pd: 1 }, { s: "95", pn: 95, pd: 1 }, { s: "7", pn: 7, pd: 1 }, { s: "3", pn: 3, pd: 1 },
    { s: "12.5", pn: 25, pd: 2 }, { s: "37.5", pn: 75, pd: 2 }, { s: "62.5", pn: 125, pd: 2 }, { s: "87.5", pn: 175, pd: 2 },
    { s: "2.5", pn: 5, pd: 2 }, { s: "0.5", pn: 1, pd: 2 }, { s: "125", pn: 125, pd: 1 }, { s: "150", pn: 150, pd: 1 },
    { s: "175", pn: 175, pd: 1 }, { s: "200", pn: 200, pd: 1 }, { s: "250", pn: 250, pd: 1 }, { s: "110", pn: 110, pd: 1 },
    { s: "240", pn: 240, pd: 1 }, { s: "1", pn: 1, pd: 1 }, { s: "99", pn: 99, pd: 1 }, { s: "33", pn: 33, pd: 1 }
  ];
  var it = pick(pool), pval = it.pn / it.pd;
  if (Math.random() < 0.5) {
    var dec = pval / 100;
    var dpK = (fmt(dec, 4).split(".")[1] || "").length;
    var cands = [
      { t: fmtF(pval / 10, dpK), fb: "That divides by 10 only; a percent is out of 100, so divide by 100." },
      { t: fmtF(pval / 1000, dpK + 1), fb: "That divides by 1000, one place too far; a percent is out of 100." },
      { t: fmtF(pval, dpK + 1), fb: "That is the percent number itself; it still needs to be divided by 100." },
      { t: fmt(pval * 100, 2), fb: "That multiplies by 100, which is the move for turning a decimal into a percent." }
    ];
    var ds = u5pick3(fmt(dec, 4), cands);
    var sol = "Percent means out of 100, so divide by 100: \\[ \\begin{aligned} " + it.s + "\\% &= " + it.s + " \\div 100 \\\\ &= " + fmt(dec, 4) + " \\end{aligned} \\] So \\(" + it.s + "\\%\\) as a decimal is <b>" + fmt(dec, 4) + "</b>.";
    return mcq("Express \\(" + it.s + "\\%\\) as a decimal.", { t: fmt(dec, 4), fb: "Correct: dividing the percent by 100 gives the decimal." }, ds, sol, { mode: "pct-dec", p: it.s });
  }
  var fn = it.pn, fd = it.pd * 100, g = u5gcd(fn, fd); fn /= g; fd /= g;
  var fracTex = fd === 1 ? fmt(fn, 0) : FR(fn, fd);
  var corr = "\\(" + fracTex + "\\)";
  var cands2 = [
    { t: "\\(" + FR(it.pn, it.pd * 10) + "\\)", fb: "That uses tenths; a percent is out of 100, not out of 10." },
    { t: "\\(" + FR(fd, fn) + "\\)", fb: "That flips the fraction over; the percent amount belongs in the numerator." },
    { t: "\\(" + FR(it.pn * 2, it.pd * 100) + "\\)", fb: "That doubles the numerator, which changes the value of the fraction." },
    { t: "\\(" + FR(it.pn, it.pd) + "\\)", fb: "That drops the division by 100 that the percent sign stands for." }
  ];
  // reduce candidate fractions for display where they are unreduced by design; keep as written except flip candidate
  var ds2 = u5pick3(corr, cands2);
  var sol2 = "Write the percent as a fraction out of 100, then reduce: \\[ \\begin{aligned} " + it.s + "\\% &= " + FR(it.pn, it.pd * 100) + " \\\\ &= " + fracTex + " \\end{aligned} \\] So \\(" + it.s + "\\%\\) as a fraction in lowest terms is <b>" + corr + "</b>.";
  return mcq("Express \\(" + it.s + "\\%\\) as a fraction in lowest terms.", { t: corr, fb: "Correct: the percent becomes a fraction out of 100, reduced to lowest terms." }, ds2, sol2, { mode: "pct-frac", p: it.s });
}, ["Percent means out of 100, so every conversion starts from hundredths.", "First write the percent over 100, then turn it into a decimal or reduce the fraction."]);
E("u1-pk-money-decimals",1,["1.5"], 1, "gen", function () {
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
E("u1-pk-ratio-problem",1,["1.5"], 2, "gen", function () {
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
E("u1-pk-evaluate-power",1,["3.1"], 1, "gen", function () {
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
E("u1-pk-fraction-convert",1,["3.5"], 1, "gen", function () {
  var n = 3, d = 8;
  for (var att = 0; att < 200; att++) {
    d = pick([2, 4, 5, 8, 10, 20, 25, 40, 50]); n = ri(1, d * 3);
    if (n % d === 0) continue;
    if ((n * 1000) % d !== 0) continue;
    break;
  }
  if ((n * 1000) % d !== 0 || n % d === 0) { n = 3; d = 8; }
  var val = n / d, pct = val * 100;
  if (Math.random() < 0.5) {
    var dpV = (fmt(val, 3).split(".")[1] || "").length;
    var dpM = Math.max(3, dpV + 1);
    var cands = [
      { t: fmtF(val * 10, dpV), fb: "That is ten times too large; divide the numerator by the denominator as written." },
      { t: fmtF(val / 10, dpM), fb: "That is ten times too small; divide the numerator by the denominator as written." },
      { t: fmtF(d / n, dpM), fb: "That divides the denominator by the numerator, flipping the fraction over." },
      { t: fmt(Math.floor(val), 0) + "." + fmt(n, 0), fb: "That writes the numerator after the decimal point instead of dividing." }
    ];
    var ds = u5pick3(fmt(val, 3), cands);
    var sol = "A fraction means the numerator divided by the denominator: \\[ \\begin{aligned} " + FR(n, d) + " &= " + n + " \\div " + d + " \\\\ &= " + fmt(val, 3) + " \\end{aligned} \\] So the decimal form is <b>" + fmt(val, 3) + "</b>.";
    return mcq("Express \\(" + FR(n, d) + "\\) as a decimal.", { t: fmt(val, 3), fb: "Correct: dividing the numerator by the denominator gives the decimal." }, ds, sol, { mode: "frac-dec", n: n, d: d });
  }
  var dpV2 = (fmt(val, 3).split(".")[1] || "").length;
  var dpP2 = (fmt(pct, 2).split(".")[1] || "").length;
  var dpM2 = Math.max(dpP2 + 1, dpV2);
  var cands2 = [
    { t: fmtF(pct / 10, dpM2) + "%", fb: "That moves the decimal point one place only after dividing; a percent needs two places." },
    { t: fmtF(pct * 10, dpP2) + "%", fb: "That moves the decimal point one place too many after dividing." },
    { t: fmtF(val, dpM2) + "%", fb: "That is the decimal form with a percent sign added; the value still needs to be multiplied by 100." },
    { t: fmt(d / n * 100, 1) + "%", fb: "That flips the fraction before converting, so the percent is far too large." }
  ];
  var ds2 = u5pick3(fmt(pct, 2) + "%", cands2);
  var sol2 = "Divide first, then multiply by 100 for a percent: \\[ \\begin{aligned} " + FR(n, d) + " &= " + fmt(val, 3) + " \\\\ " + fmt(val, 3) + " \\times 100 &= " + fmt(pct, 2) + " \\end{aligned} \\] So the percent form is <b>" + fmt(pct, 2) + "%</b>.";
  return mcq("Express \\(" + FR(n, d) + "\\) as a percent.", { t: fmt(pct, 2) + "%", fb: "Correct: the fraction is divided out, then multiplied by 100." }, ds2, sol2, { mode: "frac-pct", n: n, d: d });
}, ["A fraction bar means division: numerator divided by denominator.", "First divide the numerator by the denominator, then decide if a percent is also needed."]);
E("u2-pk-divide-fractions",2,["3.15"], 1, "gen", function () {
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
E("u2-pk-circ-approx",2,["3.20"], 1, "gen", function(){
  if(ri(0,1)===0){
    var d=ri(3,45), c=3*d;
    var candA=[2*d,6*d,4*d,d+3], seenA={}; seenA[c]=1; var dsA=[];
    for(var i=0;i<candA.length&&dsA.length<3;i++){
      if(seenA[candA[i]])continue; seenA[candA[i]]=1;
      dsA.push({t:"about "+candA[i]+" cm", fb:"The circumference is about three times the diameter: multiply "+d+" by 3."});
    }
    var q=mcq("A circle has diameter "+d+" cm. The circumference is approximately three times the diameter. About how long is the circumference?",
      {t:"about "+c+" cm", fb:"Yes: 3 x "+d+" = "+c+"."},
      dsA,
      "Circumference is approximately \\(3 \\times d = 3 \\times "+d+" = "+c+"\\) cm. The answer is <b>about "+c+" cm</b>.",
      {mode:"d", d:d}); q.figure=u4circleFig("d = "+d+" cm","d"); return q;
  }
  var r=ri(2,30), c2=6*r;
  var q=mcq("A circle has radius "+r+" cm, so its diameter is "+(2*r)+" cm. The circumference is approximately three times the diameter. About how long is the circumference?",
    {t:"about "+c2+" cm", fb:"Yes: 3 x "+(2*r)+" = "+c2+"."},
    [{t:"about "+(3*r)+" cm", fb:"That is three times the radius: the rule uses the diameter, which is "+(2*r)+" cm."},
     {t:"about "+(2*r)+" cm", fb:"That is the diameter itself: multiply it by about 3."},
     {t:"about "+(12*r)+" cm", fb:"That is twelve times the radius: three times the diameter is six times the radius."}],
    "Diameter = \\(2 \\times "+r+" = "+(2*r)+"\\) cm, and circumference is approximately \\(3 \\times "+(2*r)+" = "+c2+"\\) cm. The answer is <b>about "+c2+" cm</b>.",
    {mode:"r", r:r}); q.figure=u4circleFig("r = "+r+" cm","r"); return q;
}, ["The circumference wraps around the diameter about three times.", "Start by finding the diameter, then multiply by about 3."]);
E("u2-pk-pi-ratio",2,["3.20"], 1, "gen", function(){
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
E("u2-pk-circumference",2,["3.20"], 1, "gen", function(){
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
E("u2-pk-between-two",2,["3.20"], 1, "gen", function () {
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
E("u2-pk-ooo-evaluate",2,["2.1"], 2, "gen", function () {
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
E("u2-pk-ooo-first-error",2,["2.1"], 2, "gen", function () {
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
E("u2-pk-solve-two-step",2,["2.1"], 2, "gen", function () {
  var frac = Math.random() < 0.35;
  var a, b, x;
  if (frac) { a = pick([2, 4, 6, 8]); x = ri(1, 6) + 0.5; b = ri(1, 12); }
  else { a = ri(2, 9); x = ri(2, 13); b = ri(1, 14); }
  var c = a * x + b;
  var sol = "Undo the steps in reverse order: subtract first, then divide: \\[ \\begin{aligned} " + fmt(a) + "x + " + fmt(b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(c) + " - " + fmt(b) + " \\\\ " + fmt(a) + "x &= " + fmt(a * x) + " \\\\ x &= " + fmt(a * x) + " \\div " + fmt(a) + " \\\\ x &= " + fmt(x) + " \\end{aligned} \\] Check: \\(" + fmt(a) + "(" + fmt(x) + ") + " + fmt(b) + " = " + fmt(a * x) + " + " + fmt(b) + " = " + fmt(c) + "\\). So the solution is <b>\\(x = " + fmt(x) + "\\)</b>.";
  return numq("Solve the equation \\(" + fmt(a) + "x + " + fmt(b) + " = " + fmt(c) + "\\). What is the value of x?", x, 0.01, sol,
    { mode: "solve-two-step", a: a, b: b, frac: frac });
}, ["Undo what was done to x in reverse order: the added number comes off first.", "Subtract the constant from both sides, then divide both sides by the coefficient of x."]);
E("u3-pk-para-from-rect",3,["3.24"], 1, "var", varset([
  function(){ var q=mcq("A parallelogram is cut along a dashed height line and the triangle piece is moved to the other end, forming a rectangle with the same base and height. The area of the parallelogram equals the area of that rectangle, which is found by:",
    {t:"base x height", fb:"Yes: the rearranged rectangle has area base x height, and moving a piece does not change area."},
    [{t:"base x slanted side", fb:"The slanted side is not a side of the rearranged rectangle: its sides are the base and the height."},
     {t:"(base x height) / 2", fb:"Halving is for a triangle: the whole parallelogram becomes the whole rectangle."},
     {t:"base + height", fb:"Adding gives a length, not an area: areas of rectangles multiply length by width."}],
    "Cutting and moving a piece keeps the same total area, and the new shape is a rectangle with sides equal to the base and height. Its area is <b>base x height</b>.", {s:1}); q.figure=figParaRect("base","h"); return q; },
  function(){ var q=mcq("A parallelogram with base 8 cm and height 5 cm is rearranged into a rectangle. What is the area of the parallelogram?",
    {t:"40 cm²", fb:"Yes: the rectangle is 8 cm by 5 cm, so the area is 40 cm²."},
    [{t:"26 cm²", fb:"That is the perimeter of the rectangle: area multiplies length by width."},
     {t:"20 cm²", fb:"That halves the product: the full parallelogram keeps the full rectangle area."},
     {t:"13 cm²", fb:"That adds base and height: area multiplies them."}],
    "The rearranged rectangle measures 8 cm by 5 cm: \\(A = 8 \\times 5 = 40\\) cm². The answer is <b>40 cm²</b>.", {s:2}); q.figure=figParaRect("base = 8 cm","h = 5 cm"); return q; },
  function(){ var q=mcq("Why does cutting a parallelogram and rearranging the pieces into a rectangle not change the area?",
    {t:"No area is added or removed; the same pieces make the new shape", fb:"Yes: rearranging pieces keeps the total area the same."},
    [{t:"A rectangle always has the same area as any parallelogram with any base", fb:"Only the rectangle built from the same pieces, with the same base and height, matches."},
     {t:"The cut makes the shape smaller but the move makes it bigger in the end", fb:"Nothing is gained or lost: the pieces are identical in total."},
     {t:"The perimeter stays the same, so the area does too, every time", fb:"The perimeter can change when pieces move: it is the pieces themselves that preserve area."}],
    "The new shape is built from exactly the same pieces, so its area equals the parallelogram's area. The answer is <b>no area is added or removed</b>.", {s:3}); q.figure=figParaRect("base","h"); return q; },
  function(){ var q=mcq("A parallelogram with base 11 cm and height 6 cm is rearranged into a rectangle. What are the side lengths of that rectangle?",
    {t:"11 cm and 6 cm", fb:"Yes: the rectangle takes the parallelogram's base and height as its sides."},
    [{t:"11 cm and 11 cm", fb:"That would be a square: the second side is the height, 6 cm."},
     {t:"6 cm and 6 cm", fb:"Both sides are not the height: one side is the base, 11 cm."},
     {t:"17 cm and 6 cm", fb:"17 cm adds base and height: the rectangle's sides are the base and height themselves."}],
    "The rearranged rectangle has the parallelogram's base as one side and its height as the other: <b>11 cm and 6 cm</b>.", {s:4}); q.figure=figParaRect("base = 11 cm","h = 6 cm"); return q; },
  function(){ var q=mcq("A parallelogram with base 9 cm and height 4 cm is cut and rearranged into a rectangle. What is the area of the parallelogram?",
    {t:"36 cm²", fb:"Yes: the rectangle is 9 cm by 4 cm, so the area is 36 cm²."},
    [{t:"26 cm²", fb:"That is the perimeter of the rectangle: area multiplies length by width."},
     {t:"18 cm²", fb:"That halves the product: the full parallelogram keeps the full rectangle area."},
     {t:"13 cm²", fb:"That adds base and height: area multiplies them."}],
    "The rearranged rectangle measures 9 cm by 4 cm: \\(A = 9 \\times 4 = 36\\) cm². The answer is <b>36 cm²</b>.", {s:5}); q.figure=figParaRect("base = 9 cm","h = 4 cm"); return q; }
]), ["Picture the parallelogram cut and slid into a rectangle shape.", "Start by asking what the sides of the rearranged rectangle are."]);
E("u3-pk-area-triangle",3,["3.31"], 1, "gen", function(){
  var b=ri(6,16), h=ri(4,12), A=b*h/2;
  var fig='<svg viewBox="0 0 300 190" width="300" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Triangle with base and height labelled">'
    +'<polygon points="55,145 245,145 120,50" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<line x1="120" y1="50" x2="120" y2="145" stroke="'+FIG_ALT+'" stroke-width="1.8" stroke-dasharray="5 4"/>'
    +_txt(150,163,"base = "+b+" cm",12.5,false)
    +_txt(104,100,"h = "+h+" cm",12,false)
    +'</svg>';
  var pool=[b*h,b+h,A+b,A*3];
  var seen={}; seen[fmt(A)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    var k=fmt(pool[i]);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:k+" cm²", fb:i===0?"That is the area of the full parallelogram: a triangle is half of it.":"Check the formula: area of a triangle is base times height divided by 2."});
  }
  var q=mcq("What is the area of the triangle in the diagram?",
    {t:fmt(A)+" cm²", fb:"Yes: A = (base x height) / 2 = ("+b+" x "+h+") / 2 = "+fmt(A)+" cm²."},
    ds,
    "\\[ \\begin{aligned} A &= "+FR("b \\times h","2")+" \\\\ &= "+FR(b+" \\times "+h,"2")+" \\\\ &= "+fmt(A)+" \\text{ cm}^2 \\end{aligned} \\] The answer is <b>"+fmt(A)+" cm²</b>.",
    {b:b, h:h});
  q.figure=fig;
  return q;
}, ["Area of a triangle is base times height, divided by 2.", "Start by multiplying base by height, then halve the result."]);
E("u3-pk-area-parallelogram",3,["3.31"], 2, "gen", function(){
  var b=ri(6,15), h=ri(4,10), s=h+ri(1,4);
  var A=b*h;
  var fig='<svg viewBox="0 0 300 190" width="300" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parallelogram with base, height and slanted side labelled">'
    +'<polygon points="55,140 215,140 245,60 85,60" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<line x1="110" y1="60" x2="110" y2="140" stroke="'+FIG_ALT+'" stroke-width="1.8" stroke-dasharray="5 4"/>'
    +_txt(135,158,"base = "+b+" cm",12.5,false)
    +_txt(96,102,"h = "+h+" cm",12,false)
    +_txt(238,88,""+s+" cm",12,false)
    +'</svg>';
  var pool=[b*s,A/2,b+h,b*s/2];
  var seen={}; seen[fmt(A)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    var k=fmt(pool[i]);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:k+" cm²", fb:i===0?"That multiplies by the slanted side: area uses the perpendicular height.":"Check the formula: area of a parallelogram is base times height."});
  }
  var q=mcq("What is the area of the parallelogram in the diagram?",
    {t:fmt(A)+" cm²", fb:"Yes: A = base x height = "+b+" x "+h+" = "+A+" cm²."},
    ds,
    "\\[ \\begin{aligned} A &= b \\times h \\\\ &= "+b+" \\times "+h+" \\\\ &= "+A+" \\text{ cm}^2 \\end{aligned} \\] The slanted side length is not used. The answer is <b>"+A+" cm²</b>.",
    {b:b, h:h, s:s});
  q.figure=fig;
  return q;
}, ["Area of a parallelogram is base times the perpendicular height.", "Start by finding the height: the dashed line at right angles to the base."]);
E("u3-pk-area-circle",3,["3.31"], 2, "gen", function(){
  var modeA=ri(0,2);
  if(modeA===2){
    var rs=ri(2,20), As=3.14*rs*rs/2;
    var poolS=[3.14*rs*rs,2*3.14*rs,3.14*rs,As*4,As/2,As*3];
    var seenS={}; seenS[fmtF(As,2)]=1; var dsS=[];
    for(var s2=0;s2<poolS.length&&dsS.length<3;s2++){
      var kk=fmtF(poolS[s2],2);
      if(seenS[kk])continue; seenS[kk]=1;
      dsS.push({t:kk+" cm²", fb:s2===0?"That is the area of the full circle: a semicircle is half of it.":"Check the steps: find the full circle area with pi x r², then halve it."});
    }
    var qS=mcq("The diagram shows a semicircle (half of a circle) with radius "+rs+" cm. What is its area? Use 3.14 for pi.",
      {t:fmtF(As,2)+" cm²", fb:"Yes: half of 3.14 x "+rs+"² is "+fmtF(As,2)+" cm²."},
      dsS,
      "\\[ \\begin{aligned} A &= "+FR("3.14 \\times "+rs+"^2","2")+" \\\\ &= "+fmtF(As,2)+" \\text{ cm}^2 \\end{aligned} \\] The answer is <b>"+fmtF(As,2)+" cm²</b>.",
      {mode:"semi", r:rs});
    qS.figure=u4circleFig("r = "+rs+" cm","r");
    return qS;
  }
  if(modeA===0){
    var r=ri(3,20), A=3.14*r*r;
    var pool=[2*3.14*r,3.14*r,3.14*2*r*r,A+3.14*r];
    var seen={}; seen[fmtF(A,2)]=1; var ds=[];
    for(var i=0;i<pool.length&&ds.length<3;i++){
      var k=fmtF(pool[i],2);
      if(seen[k])continue; seen[k]=1;
      ds.push({t:k+" cm²", fb:i===0?"That is the circumference: area uses pi times the radius squared.":"Check the formula: A = pi x r² with pi = 3.14."});
    }
    var q=mcq("What is the area of the circle in the diagram? Use 3.14 for pi.",
      {t:fmtF(A,2)+" cm²", fb:"Yes: A = 3.14 x "+r+"² = "+fmtF(A,2)+" cm²."},
      ds,
      "\\[ \\begin{aligned} A &= \\pi r^2 \\\\ &= 3.14 \\times "+r+"^2 \\\\ &= "+fmtF(A,2)+" \\text{ cm}^2 \\end{aligned} \\] The answer is <b>"+fmtF(A,2)+" cm²</b>.",
      {mode:"r", r:r});
    q.figure=u4circleFig("r = "+r+" cm","r");
    return q;
  }
  var d=2*ri(3,20), r2=d/2, A2=3.14*r2*r2;
  var pool2=[2*3.14*r2,3.14*d*d,A2*2,3.14*r2];
  var seen2={}; seen2[fmtF(A2,2)]=1; var ds2=[];
  for(var j=0;j<pool2.length&&ds2.length<3;j++){
    var k2=fmtF(pool2[j],2);
    if(seen2[k2])continue; seen2[k2]=1;
    ds2.push({t:k2+" cm²", fb:j===1?"That squares the diameter: halve the diameter to get the radius first.":"Check the steps: halve the diameter for the radius, then A = pi x r²."});
  }
  var q2=mcq("What is the area of the circle in the diagram? Use 3.14 for pi.",
    {t:fmtF(A2,2)+" cm²", fb:"Yes: radius is "+r2+" cm, and A = 3.14 x "+r2+"² = "+fmtF(A2,2)+" cm²."},
    ds2,
    "\\[ \\begin{aligned} r &= "+d+" \\div 2 = "+r2+" \\\\ A &= \\pi r^2 = 3.14 \\times "+r2+"^2 \\\\ &= "+fmtF(A2,2)+" \\text{ cm}^2 \\end{aligned} \\] The answer is <b>"+fmtF(A2,2)+" cm²</b>.",
    {mode:"d", d:d});
  q2.figure=u4circleFig("d = "+d+" cm","d");
  return q2;
}, ["Area of a circle is pi times the radius squared.", "Start by making sure you have the radius; halve the diameter if that is what is given."]);
E("u3-pk-sa-from-net",3,["3.31"], 1, "gen", function(){
  var l=ri(3,11), w=ri(3,11), h=ri(2,9);
  var top=l*w, front=l*h, side=w*h;
  var sa=2*(top+front+side);
  var once=top+front+side;
  var ds=u4d3(sa,[once,2*top+front+side,top+2*front+2*side,sa+top,4*(top+front+side)]);
  var opts=ds.map(function(d){
    var fb=(d===once)?"That adds each different face only once: every face on a prism has a matching partner opposite it.":"That total double-counts or misses a face: each of the three face areas must appear exactly twice.";
    return {t:String(d), fb:fb};
  });
  var q=mcq("A net of a right rectangular prism has three different face areas: "+top+" cm\\(^{2}\\) for the top, "+front+" cm\\(^{2}\\) for the front and "+side+" cm\\(^{2}\\) for the side. What is the surface area of the prism, in square centimetres?",
    {t:String(sa), fb:"Yes: each face area appears twice, once for each side of the prism."}, opts,
    "Surface area is the total area of the 2-D faces in the net. Each different face has an identical partner opposite it: \\[ \\begin{aligned} SA &= 2("+top+"+"+front+"+"+side+") \\\\ &= 2("+once+") \\\\ &= "+sa+" \\end{aligned} \\] The surface area is <b>"+sa+" cm\\(^{2}\\)</b>.",
    {mode:"net-areas", l:l, w:w, h:h}); q.figure=m8NetAreaSVG(top,front,side); return q;
}, ["Surface area is the sum of the areas of all the flat faces in the net.", "Add the three different face areas, then double the total because each face has a partner."]);
E("u3-pk-sa-rect-prism",3,["3.33"], 2, "gen", function(){
  var l=ri(3,14), w=ri(3,12), h=ri(2,10);
  var sa=2*(l*w+l*h+w*h);
  var q=numq("Find the surface area of the right rectangular prism shown, in square centimetres.", sa, 0.01,
    "Work face by face. The front and back are "+l+" by "+h+", area "+fmt(l*h)+" each; the sides are "+w+" by "+h+", area "+fmt(w*h)+" each; and the top and bottom are "+l+" by "+w+", area "+fmt(l*w)+" each. Double each face area for its matching pair and add: \\[ \\begin{aligned} SA &= 2("+fmt(l*w)+") + 2("+fmt(l*h)+") + 2("+fmt(w*h)+") \\\\ &= "+sa+" \\end{aligned} \\] The surface area is <b>"+sa+" cm\\(^{2}\\)</b>.",
    {mode:"rect-sa", l:l, w:w, h:h});
  q.figure=u4boxSVG(l,w,h);
  return q;
}, ["Picture the net: three different faces, each with a matching partner.", "Find the area of the top, the front and one side, add them, then double."]);
E("u3-pk-sa-cylinder",3,["3.33"], 2, "gen", function(){
  var r=ri(2,9), h=ri(3,14);
  var sa=u4r1(2*3.14*r*(r+h));
  var q=numq("Find the surface area of the right cylinder shown. Use \\(\\pi = 3.14\\) and give your answer in square centimetres, to one decimal place.", sa, 0.6,
    "Two circles plus the curved side, which unrolls into a rectangle. Each circle has area \\(3.14 \\times "+r+" \\times "+r+" = "+fmt(u4r2(3.14*r*r))+"\\). The rectangle has length the circumference, \\(2 \\times 3.14 \\times "+r+" = "+fmt(u4r2(2*3.14*r))+"\\), and width "+h+", so its area is \\("+fmt(u4r2(2*3.14*r))+" \\times "+h+" = "+fmt(u4r2(2*3.14*r*h))+"\\). Add the parts: \\[ \\begin{aligned} SA &= 2("+fmt(u4r2(3.14*r*r))+") + "+fmt(u4r2(2*3.14*r*h))+" \\\\ &= "+fmt(u4r2(2*3.14*r*r+2*3.14*r*h))+" \\\\ &\\approx "+fmt(sa)+" \\end{aligned} \\] The surface area is <b>"+fmt(sa)+" cm\\(^{2}\\)</b>.",
    {mode:"cyl-sa", r:r, h:h});
  q.figure=u4cylSVG(r,h,false);
  return q;
}, ["Unroll the cylinder in your mind: two circles and one rectangle.", "Use the radius for both circle areas and for the width around the curved side."]);
E("u3-pk-ooo-calculator",3,["2.3"], 1, "gen", function () {
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
E("u4-pk-mult-decimals",4,["1.11"], 1, "gen", function(){
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
E("u4-pk-ooo-brackets",4,["1.11"], 2, "gen", function () {
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
E("u4-pk-find-whole",4,["1.13"], 2, "gen", function(){
  var W=0, p=0, part=0, ok=false;
  for(var att=0; att<400 && !ok; att++){
    W=pick([200,300,400,500,600]);
    p=pick([12,15,16,20,24,25,30,32,40,48,50,60,64,75,80]);
    part=W*p/100;
    if(part!==Math.round(part) || part<10) continue;
    if((part*p)%100!==0) continue;
    var vals=[W, part*p, part*p/100, W/100];
    if(new Set(vals.map(function(v){ return fmt(v); })).size<4) continue;
    ok=true;
  }
  if(!ok){ W=400; p=20; part=80; }
  var ctxs=[
    {q:part+" students is "+p+"% of the students in a school. How many students are in the school?", unit:"students"},
    {q:"A team scored "+part+" points, which is "+p+"% of the points it needs for a banner. How many points does the team need in total?", unit:"points"},
    {q:"After a morning sale, "+part+" tickets remained unsold, and that is "+p+"% of the tickets printed. How many tickets were printed?", unit:"tickets"}
  ];
  var cx=pick(ctxs);
  return mcq(cx.q,
    {t:fmt(W), fb:"Yes: the part is divided by the percent written as a decimal to recover the whole."},
    [{t:fmt(part*p), fb:"That multiplies the part by the whole percent number, which grows the part instead of recovering the whole."},
     {t:fmt(part*p/100), fb:"That finds the percent of the part itself, which is smaller than the part."},
     {t:fmt(W/100), fb:"That divides the part by the percent number without writing the percent as a decimal first."}],
    "The part and its percent give the whole when the part is divided by the percent as a decimal: \\[ \\begin{aligned} \\text{whole} &= "+part+" \\div "+fmt(p/100,2)+" \\\\ &= "+W+" \\end{aligned} \\] The answer is <b>"+W+" "+cx.unit+"</b>.",
    {mode:"find-whole-mc", p:p, part:part});
}, ["The given amount is only the named percent of the whole, so the whole is larger than the part.", "Write the percent as a decimal first, then divide the part by that decimal."]);
E("u4-pk-percent-of-percent",4,["1.15"], 1, "gen", function () {
  var A = pick([20, 30, 40, 50, 60, 70, 80, 90]), B = pick([20, 30, 40, 50, 60, 70, 80, 90]);
  var ans = A * B / 100;
  var ctxs = [
    { q: "At a school, " + A + "% of students take the bus. Of the students who take the bus, " + B + "% ride Bus 4. What percent of all students ride Bus 4?", thing: "ride Bus 4" },
    { q: "On a team, " + A + "% of players are in Grade 8. Of those Grade 8 players, " + B + "% play defence. What percent of the whole team are Grade 8 players who play defence?", thing: "are Grade 8 defenders" },
    { q: "In a library, " + A + "% of the books are nonfiction. Of the nonfiction books, " + B + "% are about animals. What percent of all the books are nonfiction books about animals?", thing: "are animal nonfiction" }
  ];
  var cx = pick(ctxs);
  var cands = [
    { t: fmt(A + B, 0) + "%", fb: "That adds the two percents; the second percent acts only on the first group, so the percents are multiplied, not added." },
    { t: fmt(B, 0) + "%", fb: "That is the second percent alone; it describes only the smaller group, not the whole group." },
    { t: fmt(A, 0) + "%", fb: "That is the first percent alone; it does not narrow the group down the second time." },
    { t: fmt(Math.abs(A - B), 0) + "%", fb: "That subtracts the two percents; finding a percent of a percent uses multiplication." }
  ];
  var ds = u5pick3(fmt(ans, 0) + "%", cands);
  var sol = "A percent of a percent multiplies the two decimals: \\[ \\begin{aligned} " + fmt(A / 100, 2) + " \\times " + fmt(B / 100, 2) + " &= " + fmt(ans / 100, 4) + " \\\\ &= " + fmt(ans, 0) + "\\% \\end{aligned} \\] So <b>" + fmt(ans, 0) + "%</b> of the whole group " + cx.thing + ".";
  return mcq(cx.q, { t: fmt(ans, 0) + "%", fb: "Correct: the second percent is taken of the first group, so the decimals multiply." }, ds, sol, { mode: "pct-of-pct", a: A, b: B });
}, ["The second percent acts only on the group the first percent picked out.", "First change both percents to decimals, then multiply them."]);
E("u4-pk-discount-then-tax",4,["1.15"], 2, "gen", function () {
  var items = ["winter jacket", "bicycle helmet", "pair of snowshoes", "school backpack", "set of curling gloves", "rain coat"];
  var item = pick(items), P = pick([60, 80, 100, 120, 160, 200, 240, 300, 400]), d = pick([10, 20, 25, 30, 40, 50]);
  var sale = P * (1 - d / 100), fin = u5r2(sale * 1.15), tax = u5r2(fin - sale);
  var sol = "Apply the discount first, then add HST of 15% to the sale price: \\[ \\begin{aligned} \\text{sale price} &= " + fmtF(P, 2) + " \\times " + fmt(1 - d / 100, 2) + " = " + fmtF(sale, 2) + " \\\\ \\text{final price} &= " + fmtF(sale, 2) + " \\times 1.15 = " + fmtF(fin, 2) + " \\end{aligned} \\] So the final price is <b>$" + fmtF(fin, 2) + "</b>.";
  return numq("A " + item + " is priced at $" + fmtF(P, 2) + ". It is on sale for " + d + "% off. HST of 15% is then added to the sale price. What is the final price, in dollars?", fin, 0.01, sol, { mode: "disc-tax", p: P, d: d });
}, ["Combined percents act one after the other, and the second percent acts on the new amount.", "First take the discount off the full price to get the sale price."]);
E("u4-pk-total-change",4,["1.15"], 2, "gen", function () {
  var a1 = ri(300, 2400) / 100, a2 = ri(200, 1800) / 100, disc = ri(100, 800) / 100;
  var total = Math.round((a1 + a2 - disc) * 100) / 100;
  var bill = total <= 30 ? 50 : 100;
  var ans = Math.round((bill - total) * 100) / 100;
  var prompt = "A shopper buys two items priced at $" + a1.toFixed(2) + " and $" + a2.toFixed(2) + ". A coupon takes $" + disc.toFixed(2) + " off the total. The shopper pays with a $" + bill + " bill. How much change does the shopper get, in dollars?";
  var sol = "Find the amount owed first, then subtract it from the bill: \\[ \\begin{aligned} \\text{total} &= " + a1.toFixed(2) + " + " + a2.toFixed(2) + " - " + disc.toFixed(2) + " = " + total.toFixed(2) + " \\\\ \\text{change} &= " + bill + " - " + total.toFixed(2) + " = " + ans.toFixed(2) + " \\end{aligned} \\] The answer is <b>$" + ans.toFixed(2) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-total-change", total: total, bill: bill });
}, ["The change depends on the final total, so work out what is owed before you subtract.", "Add the two prices and take the coupon off as the first step."]);
E("u5-pk-protractor-read",5,["3.44"], 1, "gen", function(){
  var A=pick([20,40,50,70,80,100,110,130,140,160]);
  var cx=170, cy=165, R=125;
  function pt(r,deg){ var t=deg*Math.PI/180; return [cx+r*Math.cos(t), cy-r*Math.sin(t)]; }
  var fig='<svg viewBox="0 0 340 190" width="340" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Angle shown on a protractor scale">';
  for(var dgr=0; dgr<=180; dgr+=10){ var big=(dgr%30===0); var p1=pt(R-((big)?14:8),dgr), p2=pt(R,dgr);
    fig+='<line x1="'+fmt(p1[0],1)+'" y1="'+fmt(p1[1],1)+'" x2="'+fmt(p2[0],1)+'" y2="'+fmt(p2[1],1)+'" stroke="'+FIG_INK+'" stroke-width="'+(big?1.8:1)+'"/>';
    if(big){ var pl=pt(R-30,dgr); fig+=_txt(pl[0],pl[1]+4,String(dgr),11,false,"middle"); } }
  var arc=[]; for(var a2=0;a2<=180;a2+=5){ var pa=pt(R,a2); arc.push(fmt(pa[0],1)+","+fmt(pa[1],1)); }
  fig+='<polyline points="'+arc.join(" ")+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  var pb=pt(R+8,0), pr=pt(R+8,A);
  fig+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(pb[0],1)+'" y2="'+fmt(pb[1],1)+'" stroke="'+FIG_INK+'" stroke-width="2.4"/>';
  fig+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(pr[0],1)+'" y2="'+fmt(pr[1],1)+'" stroke="'+FIG_INK+'" stroke-width="2.4"/>';
  fig+='<circle cx="'+cx+'" cy="'+cy+'" r="3.5" fill="'+FIG_INK+'"/>';
  fig+='</svg>';
  var wrong=180-A;
  var ds=[{t:String(wrong), fb:"That reads the scale that starts at 0 on the left. The baseline ray points right, so read the scale that starts at 0 on the right."},
          {t:String(A-10), fb:"That is one numbered mark too few: the ray crosses the scale at a numbered tick, not between ticks."},
          {t:String(A+10), fb:"That is one numbered mark too many: check exactly which tick the ray crosses."}];
  var q=mcq("The diagram shows an angle placed on a protractor, with one ray along the baseline to the right. What is the measure of the angle, in degrees?",
    {t:String(A), fb:"Yes: starting from the 0 on the right, the second ray crosses the scale at "+A+"."},
    ds,
    "Place the centre of the protractor on the vertex and line the baseline ray up with 0. Reading from that 0, the second ray crosses the scale at "+A+". The angle measures <b>"+A+" degrees</b>.",
    {A:A});
  q.figure=fig;
  return q;
}, ["Find the 0 that the baseline ray points to, and read the scale that starts there.", "Start by checking whether the angle is acute or obtuse, then read the matching scale."]);
E("u5-pk-bisector-env",5,["3.44"],1,"var",varset([
  function(){var q=mcq("What is a perpendicular bisector of a line segment?",
    {t:"A line that cuts the segment into two equal parts at 90 degrees",fb:"Yes: it passes through the midpoint and meets the segment at a right angle."},
    [{t:"A line that cuts the segment into two equal parts at any angle",fb:"Equal parts alone give a midpoint crossing; a perpendicular bisector must also meet at 90 degrees."},{t:"A line that meets the segment at 90 degrees at one of its endpoints",fb:"Meeting at an endpoint cannot split the segment into two equal parts."},{t:"A line that runs alongside the segment and never touches it",fb:"A bisector must cross the segment it bisects."}],
    "A perpendicular bisector crosses at the midpoint and at 90 degrees. The answer is <b>A line that cuts the segment into two equal parts at 90 degrees</b>.",{mode:"defpb"}); q.figure=figBisect("perp"); return q;},
  function(){var q=mcq("A gardener wants a path that is the perpendicular bisector of the front edge of a garden plot. Which path fits?",
    {t:"A path crossing the edge at its exact middle, forming a right angle with it",fb:"Yes: crossing at the midpoint at 90 degrees is exactly a perpendicular bisector."},
    [{t:"A path crossing the edge near one end at a right angle with the edge of the garden plot",fb:"A right angle alone is not enough; the crossing must be at the midpoint."},{t:"A path crossing the edge at its middle at a slanted angle at the crossing point",fb:"The middle alone is not enough; the crossing must also be at 90 degrees."},{t:"A path running along the edge itself from one end of the plot to the other",fb:"A path on the edge does not cross or bisect it."}],
    "The path must cross at the midpoint and at 90 degrees. The answer is <b>A path crossing the edge at its exact middle, forming a right angle with it</b>.",{mode:"garden"}); q.figure=figBisect("perp"); return q;},
  function(){var q=mcq("What is an angle bisector?",
    {t:"A ray that splits an angle into two equal angles",fb:"Yes: the two resulting angles have the same measure."},
    [{t:"A ray that splits an angle into two angles with any measures",fb:"A bisector must create two equal angles, not just any two angles."},{t:"A line that cuts the angle's sides into equal lengths",fb:"That describes cutting a segment, not splitting an angle's measure."},{t:"A ray drawn from outside the angle to its vertex",fb:"A bisector starts at the vertex and goes inside the angle."}],
    "An angle bisector splits the angle into two equal angles. The answer is <b>A ray that splits an angle into two equal angles</b>.",{mode:"defab"}); q.figure=figBisect("angle"); return q;},
  function(){var q=mcq("Which action creates an angle bisector in an everyday task?",
    {t:"Folding a paper corner so the two edges of the corner line up exactly",fb:"Yes: the fold crease splits the corner angle into two equal angles."},
    [{t:"Cutting a paper corner off with one straight cut across the corner",fb:"Cutting off the corner removes part of the angle instead of splitting it into equal halves."},{t:"Drawing any line from the corner across the paper to the far side",fb:"An arbitrary line need not split the angle equally."},{t:"Measuring the corner angle with a protractor placed on the corner of the paper",fb:"Measuring reads the angle; it does not split it."}],
    "Folding so the edges match makes the crease split the angle equally. The answer is <b>Folding a paper corner so the two edges of the corner line up exactly</b>.",{mode:"foldab"}); q.figure=figBisect("angle"); return q;},
  function(){var q=mcq("Two lamp posts stand at the ends of a straight path. A bench sits on the perpendicular bisector of the path segment. What is true about the bench?",
    {t:"It is the same distance from each lamp post",fb:"Yes: every point on a perpendicular bisector is equidistant from the segment's endpoints."},
    [{t:"It is closer to the nearer lamp post by half the path length",fb:"Points on the perpendicular bisector are not closer to either end; the distances match."},{t:"It sits at the midpoint of the path",fb:"Only one point of the bisector, the crossing point, is the midpoint; the bench can be anywhere on the line."},{t:"It is twice as far from one post as from the other",fb:"The defining property is equal distances, not a double distance."}],
    "Every point on a perpendicular bisector is the same distance from both endpoints. The answer is <b>It is the same distance from each lamp post</b>.",{mode:"bench"}); q.figure=figBisect("perp"); return q;},
  function(){var q=mcq("Folding a paper strip so one end lands exactly on the other end creates a crease. The crease is:",
    {t:"The perpendicular bisector of the strip's length",fb:"Yes: matching the ends makes the crease cross at the midpoint, and a fold crease meets the length at 90 degrees."},
    [{t:"An angle bisector of the strip's corner where the fold starts",fb:"The fold matches the two ends of the length, so it bisects the length, not a corner angle."},{t:"A line parallel to the strip's length along the whole strip",fb:"The crease crosses the length rather than running alongside it."},{t:"The midpoint itself, halfway along the strip",fb:"The crease is a line through the midpoint, not just the point."}],
    "Matching the ends puts the crease through the midpoint at a right angle. The answer is <b>The perpendicular bisector of the strip's length</b>.",{mode:"foldpb"}); q.figure=figBisect("perp"); return q;}
]),["A bisector splits something into two equal parts; perpendicular adds a 90 degree crossing.","Start by checking both conditions: equal parts, and the right angle for a perpendicular bisector."]);
E("u5-pk-bisector-reason",5,["3.44"],1,"gen",function(){
  var mode=pick(["midpoint","anglehalf","equidist","midpoint2"]);
  if(mode==="anglehalf"){var A=ri(10,80)*2;var half=A/2;
    var ds=u8numOpts(half,[A,half+4,Math.max(half-4,2)]).map(function(v){return {t:String(v),fb:"A bisector splits the angle into two equal parts, so divide the angle by 2."};});
    var q=mcq("An angle of "+A+" degrees is bisected. What is the measure of each resulting angle?",
      {t:String(half),fb:"Yes: "+A+" divided by 2 is "+half+"."},ds,
      "The bisector makes two equal angles. \\[ \\begin{aligned} \\text{each angle} &= "+A+" \\div 2 \\\\ &= "+half+"^\\circ \\end{aligned} \\] Each angle is <b>"+half+" degrees</b>.",{mode:mode}); q.figure=figAngleBisectTotal(A+"°"); return q;
  }
  if(mode==="equidist"){var d=ri(3,15);
    var cand=u8numOpts(d,[d+2,2*d,Math.max(d-1,1)]);
    var ds2=cand.map(function(v){return {t:String(v),fb:"Points on a perpendicular bisector are the same distance from both endpoints of the segment."};});
    var q=mcq("Point P lies on the perpendicular bisector of segment AB. The distance from P to A is "+d+" cm. What is the distance from P to B?",
      {t:String(d),fb:"Yes: every point on the perpendicular bisector is equidistant from A and B."},ds2,
      "A point on the perpendicular bisector is the same distance from both endpoints, so the distance from P to B equals the distance from P to A. The distance is <b>"+d+" cm</b>.",{mode:mode}); q.figure=figEqui(null,d+" cm"); return q;
  }
  var L=ri(4,15)*2;var halfL=L/2;var obj=mode==="midpoint"?pick(["ribbon","board","garden hose","shelf board"]):pick(["rope","ribbon","skateboard ramp edge"]);
  var ds3=u8numOpts(halfL,[L,halfL+2,Math.max(halfL-2,1)]).map(function(v){return {t:String(v),fb:"The perpendicular bisector crosses at the midpoint, halfway along the segment."};});
  var q=mcq("A "+obj+" is "+L+" cm long. Its perpendicular bisector crosses it at M. How far is M from each end?",
    {t:String(halfL),fb:"Yes: the midpoint is halfway along, "+L+" divided by 2."},ds3,
    "The bisector crosses at the midpoint. \\[ \\begin{aligned} \\text{distance} &= "+L+" \\div 2 \\\\ &= "+halfL+" \\text{ cm} \\end{aligned} \\] M is <b>"+halfL+" cm</b> from each end.",{mode:mode}); q.figure=figSegMid(L+" cm"); return q;
},["A bisector cuts into two equal parts: a segment at its midpoint, an angle into two equal angles.","Start by dividing the given length or angle by 2."]);
E("u5-pk-parallel-perp",5,["3.35"],1,"gen",function(){
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
E("u5-pk-env-examples",5,["3.35"],1,"var",varset([
  function(){return mcq("Which of these shows a pair of parallel line segments?",
    {t:"The two rails of a railway track",fb:"Yes: the rails run side by side, always the same distance apart."},
    [{t:"The two edges meeting at the corner of a book",fb:"Edges meeting at a corner form an angle; at a square corner they are perpendicular."},{t:"The hands of a clock at 3:00",fb:"At 3:00 the hands form a right angle, so they are perpendicular, not parallel."},{t:"The two strokes of the letter T",fb:"The strokes of a T meet at a right angle, so they are perpendicular."}],
    "Railway rails stay the same distance apart and never meet: they are parallel. The answer is <b>The two rails of a railway track</b>.",{mode:"rail"});},
  function(){return mcq("Which of these shows a pair of perpendicular line segments?",
    {t:"The corner edges of a window frame",fb:"Yes: the edges of a square window corner meet at 90 degrees."},
    [{t:"The two rails of a railway track",fb:"Rails stay the same distance apart: they are parallel."},{t:"The opposite edges of a ruler",fb:"Opposite edges of a ruler never meet: they are parallel."},{t:"The lines ruled across notebook paper",fb:"Ruled lines run side by side without meeting: they are parallel."}],
    "A window frame corner meets at 90 degrees, which is perpendicular. The answer is <b>The corner edges of a window frame</b>.",{mode:"window"});},
  function(){return mcq("A student looks around a classroom for parallel segments. Which find is correct?",
    {t:"The top and bottom edges of the whiteboard",fb:"Yes: opposite edges of the board run in the same direction and never meet."},
    [{t:"The edge of a desk and the floor line it touches",fb:"Those meet at the desk leg area at an angle rather than running side by side."},{t:"The two sides of an open laptop screen corner",fb:"Sides meeting at a corner of the screen form an angle, not a parallel pair."},{t:"The stripes at the corner of a flag",fb:"Stripes that meet at a corner cross or touch, so they are not parallel segments."}],
    "Opposite edges of the whiteboard are parallel. The answer is <b>The top and bottom edges of the whiteboard</b>.",{mode:"board"});},
  function(){return mcq("Which of these is an example of perpendicular segments in the environment?",
    {t:"A flagpole and the ground line at its base",fb:"Yes: a vertical pole meets level ground at a right angle."},
    [{t:"The rungs of a ladder, spaced one above the other",fb:"Ladder rungs run side by side: they are parallel to each other."},{t:"The opposite sides of a hockey rink",fb:"Opposite sides of the rink run in the same direction: parallel."},{t:"The two long edges of a bookshelf board",fb:"Long edges of one board run side by side: parallel."}],
    "The pole is vertical and the ground is level, meeting at 90 degrees. The answer is <b>A flagpole and the ground line at its base</b>.",{mode:"pole"});},
  function(){return mcq("Which pair of segments is parallel?",
    {t:"The top edge and the bottom edge of a door",fb:"Yes: the top and bottom edges of a door run in the same direction and never meet."},
    [{t:"The two edges that meet at the corner of a page",fb:"Edges meeting at a corner form an angle (90 degrees on a page), not a parallel pair."},{t:"The vertical and horizontal strokes of the letter L",fb:"Those strokes meet at a right angle: perpendicular."},{t:"A shelf edge and the wall edge it meets",fb:"Those edges meet at the corner, so they cannot be parallel."}],
    "The top and bottom edges of a door are parallel. The answer is <b>The top edge and the bottom edge of a door</b>.",{mode:"door"});}
]),["Parallel segments stay the same distance apart; perpendicular segments meet at 90 degrees.","Start by asking whether the two segments meet, and at what angle."]);
E("u5-pk-angle-chain",5,["3.35"], 2, "gen", function(){
  var B=0,C=0,D=0,third=0,g=0;
  while(g++<200){ B=ri(35,120); C=180-B; D=ri(15,60); third=180-C-D; if(third>=10) break; }
  var q=numq("Angle P sits on a straight line with an angle of "+B+" degrees, so angle P and the "+B+" degree angle are supplementary. Angle P is one angle of a triangle whose second angle is "+D+" degrees. Find the third angle of the triangle, in degrees. Show your work.", third, 0,
    "Find angle P from the straight line first, then use the triangle angle sum. \\[ \\begin{aligned} P &= 180 - "+B+" = "+C+" \\\\ \\text{third angle} &= 180 - "+C+" - "+D+" = "+third+" \\end{aligned} \\] The answer is <b>"+third+"</b>.",
    {B:B,D:D}); q.figure=triAngSVG(C,D,third,{L:["","",""],ang:["P",D+"°","?"]}); return q;
}, ["Two angle facts are chained here: use the straight-line fact first, then feed its result into the triangle.", "Start by finding the supplementary angle on the straight line."]);
E("u6-pk-pythag-model",6,["3.53"], 1, "gen", function(){
  var base=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29]]);
  var kk=ri(1,4); var tr=[base[0]*kk,base[1]*kk,base[2]*kk];
  if(pick(["ab","ba"])==="ba"){ var tmp=tr[0]; tr[0]=tr[1]; tr[1]=tmp; }
  var a=tr[0], b=tr[1], c=tr[2];
  var punit=pick(["cm","m"]);
  var correct="\\("+a+"^{2} + "+b+"^{2} = "+c+"^{2}\\)";
  var opts=[
    {t:"\\("+a+" + "+b+" = "+c+"\\)", fb:"The theorem uses squares of the sides, not the sides themselves."},
    {t:"\\("+a+"^{2} + "+c+"^{2} = "+b+"^{2}\\)", fb:"The hypotenuse squared stands alone: here "+c+" is the hypotenuse."},
    {t:"\\("+c+"^{2} - "+a+"^{2} = "+a+"^{2}\\)", fb:"Both legs are squared and added: check which sides are the legs."}
  ];
  var q=mcq("A right triangle has legs of "+a+" "+punit+" and "+b+" "+punit+" and a hypotenuse of "+c+" "+punit+", as shown. Which equation models the Pythagorean theorem for this triangle?", {t:correct, fb:"Yes: the squares of the two legs add to the square of the hypotenuse."}, opts,
    "The theorem says the squares of the legs add to the square of the hypotenuse: \\[ \\begin{aligned} "+a+"^{2} + "+b+"^{2} &= "+(a*a)+" + "+(b*b)+" \\\\ &= "+(c*c)+" \\\\ &= "+c+"^{2} \\end{aligned} \\] The modelling equation is <b>\\("+a+"^{2} + "+b+"^{2} = "+c+"^{2}\\)</b>.",
    {a:a, b:b, c:c});
  q.figure=u1triFig(c,b,a,c+" "+punit,b+" "+punit,a+" "+punit);
  return q;
}, ["The hypotenuse is the longest side, opposite the right angle.", "Square each leg, add them, and set the sum equal to the hypotenuse squared."]);
E("u6-pk-hypotenuse",6,["3.53"], 1, "gen", function(){
  var base=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29],[9,40,41],[12,35,37]]);
  var kk=ri(1,4); var tr=[base[0]*kk,base[1]*kk,base[2]*kk];
  var a=tr[0], b=tr[1], c=tr[2];
  var unit=pick(["cm","m"]);
  var q=numq("A right triangle has legs of "+a+" "+unit+" and "+b+" "+unit+", as shown in the diagram. Find the length of the hypotenuse, in "+unit+".", c, 0.01,
    "Use the Pythagorean theorem, with the hypotenuse as the unknown: \\[ \\begin{aligned} c^{2} &= "+a+"^{2} + "+b+"^{2} \\\\ &= "+(a*a)+" + "+(b*b)+" \\\\ &= "+(c*c)+" \\\\ c &= "+c+" \\end{aligned} \\] The hypotenuse is <b>"+c+" "+unit+"</b>.",
    {a:a, b:b, c:c});
  q.figure=u1triFig(c,b,a,"?",b+" "+unit,a+" "+unit);
  return q;
}, ["The hypotenuse is opposite the right angle and is found from the two legs.", "Square both legs and add, then take the square root of the sum."]);
E("u6-pk-missing-leg",6,["3.53"], 1, "gen", function(){
  var base=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29],[9,40,41]]);
  var kk=ri(1,4); var tr=[base[0]*kk,base[1]*kk,base[2]*kk];
  var a=tr[0], b=tr[1], c=tr[2];
  var known=pick(["a","b"]); var knownLeg=(known==="a")?a:b; var unknown=(known==="a")?b:a;
  var unit=pick(["cm","m"]);
  var q=numq("A right triangle has a hypotenuse of "+c+" "+unit+" and one leg of "+knownLeg+" "+unit+", as shown in the diagram. Find the length of the other leg, in "+unit+".", unknown, 0.01,
    "Rearrange the theorem to solve for the missing leg: \\[ \\begin{aligned} b^{2} &= "+c+"^{2} - "+knownLeg+"^{2} \\\\ &= "+(c*c)+" - "+(knownLeg*knownLeg)+" \\\\ &= "+(unknown*unknown)+" \\\\ b &= "+unknown+" \\end{aligned} \\] The other leg is <b>"+unknown+" "+unit+"</b>.",
    {a:a, b:b, c:c, known:known});
  if(known==="a"){ q.figure=u1triFig(c,b,a,c+" "+unit,"?",a+" "+unit); }
  else { q.figure=u1triFig(c,b,a,c+" "+unit,b+" "+unit,"?"); }
  return q;
}, ["A missing leg is found by subtracting, not adding, the squares.", "Square the hypotenuse, subtract the square of the known leg, then take the square root."]);
E("u6-pk-is-right",6,["3.53"], 1, "gen", function(){
  var isRight=pick([true,false]);
  var a,b,c;
  if(isRight){ var tr=pick([[3,4,5],[6,8,10],[5,12,13],[9,12,15],[8,15,17]]); a=tr[0]; b=tr[1]; c=tr[2]; }
  else { a=ri(3,9); b=ri(4,12); c=ri(b+1,17); var t=0; while(a*a+b*b===c*c&&t<40){c++;t++;} }
  var sum=a*a+b*b, csq=c*c;
  var ansTxt=isRight?"Yes, it is a right triangle":"No, it is not a right triangle";
  var opts=isRight?[
    {t:"No, it is not a right triangle", fb:"Check the sums: the squares of the two shorter sides add to the square of the longest side."},
    {t:"It cannot be decided", fb:"Side lengths are enough: the theorem gives a yes or no test."},
    {t:"Yes, if the longest side is at the bottom", fb:"Position does not matter: only the side lengths decide."}
  ]:[
    {t:"Yes, it is a right triangle", fb:"Check the sums: "+(a*a)+" + "+(b*b)+" is "+sum+", which does not equal "+csq+"."},
    {t:"It cannot be decided", fb:"Side lengths are enough: the theorem gives a yes or no test."},
    {t:"Yes, since the sides are close to a triple", fb:"Close is not enough: the squares must match exactly."}
  ];
  var q=mcq("A triangle has sides of "+a+" cm, "+b+" cm and "+c+" cm, as shown. Is it a right triangle?", {t:ansTxt, fb:isRight?"Yes: "+(a*a)+" + "+(b*b)+" equals "+csq+".":"Right: "+(a*a)+" + "+(b*b)+" is "+sum+", not "+csq+"."}, opts,
    "Test the longest side against the other two: \\[ \\begin{aligned} "+a+"^{2} + "+b+"^{2} &= "+(a*a)+" + "+(b*b)+" \\\\ &= "+sum+" \\\\ "+c+"^{2} &= "+csq+" \\end{aligned} \\] "+(isRight?"The two values are equal, so the triangle <b>is a right triangle</b>.":"The two values differ, so the triangle <b>is not a right triangle</b>."),
    {a:a, b:b, c:c, isRight:isRight});
  q.figure=u1triFig(c,b,a,c+" cm",b+" cm",a+" cm");
  return q;
}, ["Square the two shorter sides and compare their sum with the square of the longest side.", "Add the squares of the two shorter sides first."]);
E("u6-pk-triple-find",6,["3.53"], 1, "gen", function(){
  var base=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29],[9,40,41]]);
  var k=ri(2,5); var a=base[0]*k, b=base[1]*k, c=base[2]*k;
  var miss=pick(["a","b","c"]); var ans=(miss==="a")?a:(miss==="b")?b:c;
  var givenTxt=(miss==="a")?("one leg of "+b+" cm and a hypotenuse of "+c+" cm"):((miss==="b")?("one leg of "+a+" cm and a hypotenuse of "+c+" cm"):("legs of "+a+" cm and "+b+" cm"));
  var q=numq("A right triangle is a scaled copy of the "+base[0]+", "+base[1]+", "+base[2]+" triple, scaled by a factor of "+k+". It has "+givenTxt+". Find the missing side length, in centimetres.", ans, 0.01,
    "Scale every side of the triple by "+k+": \\[ \\begin{aligned} "+base[0]+" \\times "+k+" &= "+a+" \\\\ "+base[1]+" \\times "+k+" &= "+b+" \\\\ "+base[2]+" \\times "+k+" &= "+c+" \\end{aligned} \\] The missing side is <b>"+ans+" cm</b>.",
    {base:base, k:k, miss:miss}); q.figure=triSVG(c,b,a,{L:["A","B","C"],side:[(miss==="c"?"?":c+" cm"),(miss==="b"?"?":b+" cm"),(miss==="a"?"?":a+" cm")]}); return q;
}, ["Scaling a triple by the same factor keeps it a triple.", "Multiply each side of the base triple by the scale factor."]);
E("u6-pk-sqrt-perfect",6,["3.53"], 1, "gen", function(){
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
E("u6-pk-estimate-between",6,["3.53"], 1, "gen", function(){
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
E("u7-pk-similar-verdict",7,["3.60"], 1, "gen", function () {
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
E("u7-pk-draw-similar",7,["3.60"], 1, "gen", function () {
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
E("u7-pk-similar-context",7,["3.60"], 2, "gen", function () {
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
E("u7-pk-scale-factor",7,["3.60"], 1, "gen", function () {
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
E("u7-pk-two-term-ratio",7,["5.1"], 1, "gen", function () {
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
E("u7-pk-meaning-of-ratio",7,["5.1"], 1, "var", varset([
  function () {
    var sol = "In ratio form, the two numbers compare two separate amounts: \\[ \\begin{aligned} " + FR(2, 3) + " &\\text{ means } 2 \\text{ to } 3 \\end{aligned} \\] So it means <b>for every 2 cups of syrup, there are 3 cups of water</b>.";
    return mcq("In a juice mix, the ratio of syrup to water is written as \\(" + FR(2, 3) + "\\). What does this ratio mean?", { t: "For every 2 cups of syrup, there are 3 cups of water.", fb: "Correct: the numerator and denominator are the two amounts being compared, in order." }, [
      { t: "Syrup makes up 2 of the 3 cups in the whole mix.", fb: "That reads the fraction as part to whole; here the two numbers compare syrup with water directly." },
      { t: "For every 3 cups of syrup, there are 2 cups of water.", fb: "That reverses the two amounts; syrup is named first, so its amount comes first." },
      { t: "The whole mix has 3 cups in total.", fb: "The 3 is the amount of water in the comparison, not the size of the whole mix." }
    ], sol, { mode: "meaning-23" });
  },
  function () {
    var sol = "The fraction compares the first group with the second group: \\[ \\begin{aligned} " + FR(4, 5) + " &\\text{ means } 4 \\text{ to } 5 \\end{aligned} \\] So it means <b>for every 4 boys at practice, there are 5 girls at practice</b>.";
    return mcq("At a practice, the ratio of boys to girls is written as \\(" + FR(4, 5) + "\\). What does this ratio mean?", { t: "For every 4 boys at practice, there are 5 girls at practice.", fb: "Correct: the two numbers are the sizes of the two groups, in the order named." }, [
      { t: "Boys make up 4 of the 5 students at practice.", fb: "That reads the fraction as part to whole; here the numbers compare the two groups with each other." },
      { t: "For every 5 boys at practice, there are 4 girls at practice.", fb: "That reverses the groups; boys are named first, so their number comes first." },
      { t: "There are 5 students at practice in total.", fb: "The 5 is the number of girls in the comparison group, not the total at practice." }
    ], sol, { mode: "meaning-45" });
  },
  function () {
    var sol = "A ratio fraction keeps both amounts and the order they are named in: \\[ \\begin{aligned} " + FR(5, 2) + " &\\text{ means } 5 \\text{ to } 2 \\end{aligned} \\] So it means <b>for every 5 cups of flour, there are 2 cups of sugar</b>.";
    return mcq("In a recipe, the ratio of flour to sugar is written as \\(" + FR(5, 2) + "\\). What does this ratio mean?", { t: "For every 5 cups of flour, there are 2 cups of sugar.", fb: "Correct: flour is compared with sugar, using the two amounts in order." }, [
      { t: "Flour makes up 5 of the 2 cups in the recipe.", fb: "A part cannot be larger than its whole that way; the numbers here compare two ingredients with each other." },
      { t: "For every 2 cups of flour, there are 5 cups of sugar.", fb: "That reverses the ingredients; flour is named first in the ratio." },
      { t: "The recipe uses 2 cups in total.", fb: "The 2 is the amount of sugar in the comparison, not the total amount in the recipe." }
    ], sol, { mode: "meaning-52" });
  },
  function () {
    var sol = "Each number in the ratio belongs to one of the two colours being compared: \\[ \\begin{aligned} " + FR(3, 4) + " &\\text{ means } 3 \\text{ to } 4 \\end{aligned} \\] So it means <b>for every 3 red counters, there are 4 blue counters</b>.";
    return mcq("In a bin, the ratio of red counters to blue counters is written as \\(" + FR(3, 4) + "\\). What does this ratio mean?", { t: "For every 3 red counters, there are 4 blue counters.", fb: "Correct: the ratio compares the red count with the blue count, in that order." }, [
      { t: "Red counters make up 3 of the 4 counters in the bin.", fb: "That reads the fraction as part to whole; the 4 here is the blue count, not the total." },
      { t: "For every 4 red counters, there are 3 blue counters.", fb: "That reverses the colours; red is named first, so its count comes first." },
      { t: "There are 4 counters in the bin in total.", fb: "The 4 is the blue count in the comparison, not the total number of counters." }
    ], sol, { mode: "meaning-34" });
  },
  function () {
    var sol = "The ratio links the two distances that go with one full turn: \\[ \\begin{aligned} " + FR(7, 5) + " &\\text{ means } 7 \\text{ to } 5 \\end{aligned} \\] So it means <b>for every 7 m the front gear wheel turns in distance, the rear wheel turns 5 m in the same comparison</b>.";
    return mcq("A gear chart writes the ratio of front wheel distance to rear wheel distance as \\(" + FR(7, 5) + "\\). What does this ratio mean?", { t: "For every 7 m of front wheel distance, there are 5 m of rear wheel distance.", fb: "Correct: the two numbers compare the two distances directly, in the order named." }, [
      { t: "The front wheel distance is 7 of the 5 m travelled in total.", fb: "That reads the fraction as part to whole; the 5 is the second distance, not a total." },
      { t: "For every 5 m of front wheel distance, there are 7 m of rear wheel distance.", fb: "That reverses the two wheels; the front wheel is named first." },
      { t: "The two wheels travel 5 m in total.", fb: "The 5 belongs to the rear wheel distance in the comparison, not to a total." }
    ], sol, { mode: "meaning-75" });
  }
]), ["In a ratio, a fraction compares two amounts with each other, not a part with a whole.", "First name which amount the top number belongs to and which amount the bottom number belongs to."]);
E("u7-pk-indirect-measure",7,["5.1"], 3, "gen", function () {
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
E("u2-pk-referent", 2, ["3.15"], 1, "gen", function(){
  var cases=[
    {unit:"1 millimetre", key:"the thickness of a fingernail",
     others:["the width of a fingernail","the height of a doorknob from the floor","the length of a school bus"],
     sol:"A millimetre is a tiny unit of length. The Mathematics 5 outcomes name the thickness of a fingernail as a referent for one millimetre: it is about 1 mm thick."},
    {unit:"1 centimetre", key:"the width of a fingernail",
     others:["the thickness of a fingernail","the height of a doorknob from the floor","the length of a school bus"],
     sol:"A centimetre is ten millimetres. The Mathematics 5 outcomes name the width of a fingernail as a referent for one centimetre: it is about 1 cm across."},
    {unit:"1 metre", key:"the height of a doorknob from the floor",
     others:["the thickness of a fingernail","the width of a fingernail","the length of a school bus"],
     sol:"A metre is one hundred centimetres. The Mathematics 5 outcomes name the height of a doorknob from the floor as a referent for one metre: it is about 1 m up."}
  ];
  var c=pick(cases);
  var ds=c.others.map(function(o){ return {t:o, fb:"That object matches a different unit of length. Compare its size with the unit named in the question before choosing."}; });
  return mcq("Which object is about "+c.unit+" in size?",
    {t:c.key, fb:"Yes. "+c.sol},
    ds,
    c.sol+" Estimating with a known referent like this is how lengths are judged before they are measured. The answer is <b>"+c.key+"</b>.",
    {});
}, ["Think of a familiar object whose size you know well.", "Compare each choice against the unit named in the question."]);
E("u5-pk-angle-classify", 5, ["3.44"], 1, "gen", function(){
  var cases=[
    {lo:15, hi:85, name:"acute", art:"an", why:"less than 90 degrees"},
    {lo:90, hi:90, name:"right", art:"a", why:"exactly 90 degrees"},
    {lo:95, hi:175, name:"obtuse", art:"an", why:"more than 90 degrees but less than 180 degrees"},
    {lo:180, hi:180, name:"straight", art:"a", why:"exactly 180 degrees"},
    {lo:185, hi:350, name:"reflex", art:"a", why:"more than 180 degrees"}
  ];
  var c=pick(cases);
  var a=(c.lo===c.hi)?c.lo:ri(c.lo,c.hi);
  var names=["acute","right","obtuse","straight","reflex"];
  var ds=shuffle(names.filter(function(n){ return n!==c.name; })).slice(0,3).map(function(n){
    return {t:n+" angle", fb:"Compare the measure with the benchmarks first: a right angle is 90 degrees and a straight angle is 180 degrees. "+a+" degrees is "+c.why+"."};
  });
  return mcq("An angle measures "+a+" degrees. How is the angle classified?",
    {t:c.name+" angle", fb:"Yes: "+a+" degrees is "+c.why+", which makes it "+c.art+" "+c.name+" angle."},
    ds,
    "Classify an angle by comparing its measure with the benchmark angles: 45 degrees, 90 degrees (a right angle) and 180 degrees (a straight angle). This angle measures "+a+" degrees, which is "+c.why+", so it is "+c.art+" <b>"+c.name+" angle</b>.",
    {a:a});
}, ["Compare the measure with 90 degrees first, then with 180 degrees.", "The names run acute, right, obtuse, straight, reflex as the measure grows."]);

/* Bridge follow-up (November 16, 2026): two authored bridge entries for
   Cluster 9 sub-skill (c), reading a ruler or tape measure to the nearest
   millimetre and to the nearest fraction of an inch. The tranche settled
   this sub-skill at zero (no outcome on file codes scale reading); Jason's
   ruling of November 16, 2026 stocks it as bridge items instead: attempted
   before teaching, reported as a starting point for the unit, never as
   practice owed (rollout plan Section 7). The grounding and the superseded
   settlement are recorded in the addendum to the tranche spec. Every draw
   renders its own scale as an SVG figure in the bank's figure idiom: the
   measured object is drawn against the scale with its ends aligned to
   ticks and dashed guides dropping from its ends to the scale, and the
   keyed reading is the reading the drawing shows. */
function u2mmRulerSVG(startMm, endMm, cmRange) {
  var pxCm = 34, x0 = 30, top = 64;
  function X(mm) { return x0 + mm * pxCm / 10; }
  var W = Math.ceil(X(cmRange * 10)) + 18;
  var fig = '<svg viewBox="0 0 ' + W + ' 128" width="' + W + '" height="128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A strip of card measured against a ruler marked in centimetres and millimetres">';
  fig += '<rect x="' + fmt(X(startMm), 1) + '" y="26" width="' + fmt(X(endMm) - X(startMm), 1) + '" height="18" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  fig += '<line x1="' + fmt(X(startMm), 1) + '" y1="44" x2="' + fmt(X(startMm), 1) + '" y2="' + top + '" stroke="' + FIG_INK + '" stroke-width="1.1" stroke-dasharray="4 3"/>';
  fig += '<line x1="' + fmt(X(endMm), 1) + '" y1="44" x2="' + fmt(X(endMm), 1) + '" y2="' + top + '" stroke="' + FIG_ALT + '" stroke-width="1.5" stroke-dasharray="4 3"/>';
  fig += '<rect x="' + fmt(X(0) - 6, 1) + '" y="' + top + '" width="' + fmt(X(cmRange * 10) - X(0) + 12, 1) + '" height="28" fill="none" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  for (var i = 0; i <= cmRange * 10; i++) {
    var len = (i % 10 === 0) ? 16 : (i % 5 === 0 ? 11 : 7);
    fig += '<line x1="' + fmt(X(i), 1) + '" y1="' + top + '" x2="' + fmt(X(i), 1) + '" y2="' + (top + len) + '" stroke="' + FIG_INK + '" stroke-width="' + (i % 10 === 0 ? 1.5 : 0.9) + '"/>';
    if (i % 10 === 0) fig += _txt(X(i), top + 42, String(i / 10), 12, false);
  }
  return fig + '</svg>';
}
E("u2-bridge-ruler-mm", 2, ["3.15"], 1, "gen", function(){
  var offset = pick([false, true]);
  var W = ri(3, 7), M = ri(1, 9);
  var R = 10 * W + M;
  var S = offset ? ri(1, 2) : 0;
  var startMm = 10 * S, endMm = startMm + R;
  var cmRange = Math.ceil(endMm / 10) + 1;
  var fig = u2mmRulerSVG(startMm, endMm, cmRange);
  var key, ds, sol;
  if (offset) {
    key = { t: R + " mm", fb: "Yes: the left end lines up at " + startMm + " mm and the right end at " + endMm + " mm, and the distance between them is " + R + " mm." };
    ds = [
      { t: (R - 1) + " mm", fb: "That is one millimetre tick short of the distance between the ends. Count the small ticks between the two end marks again." },
      { t: (R + 1) + " mm", fb: "That is one millimetre tick more than the distance between the ends. The right end lines up with a tick; count up to that tick, not past it." },
      { t: endMm + " mm", fb: "That is the mark the right end of the strip lines up with, not the length of the strip. The strip starts at the " + S + " cm mark, so the start reading has to come off the end reading." }
    ];
    sol = "Both ends have to be read, because the strip does not start at 0. The left end lines up with the " + S + " cm mark, which is " + startMm + " mm. The right end lines up " + M + " small ticks past the " + (S + W) + " cm mark, which is " + endMm + " mm. The length of the strip is the distance between its ends: " + endMm + " - " + startMm + " = <b>" + R + " mm</b>.";
  } else {
    key = { t: R + " mm", fb: "Yes: " + W + " whole centimetres and " + M + " millimetre ticks past the " + W + " cm mark." };
    ds = [
      { t: (R - 1) + " mm", fb: "That stops one millimetre tick short of the end of the strip. Count the small ticks past the " + W + " cm mark as well." },
      { t: (R + 1) + " mm", fb: "That goes one millimetre tick past the end of the strip. The end lines up with a tick; count the ticks up to that one." },
      { t: (R + 10) + " mm", fb: "That adds a whole extra centimetre. Read the whole centimetres first, then count only the small ticks after that centimetre mark." }
    ];
    sol = "Read the scale from the 0 end. The end of the strip lines up with the tick " + M + " small ticks past the " + W + " cm mark. Each centimetre is split into 10 millimetre ticks, so the length is " + W + " × 10 + " + M + " = <b>" + R + " mm</b>.";
  }
  var q = mcq(offset
      ? "A strip of card is placed against a ruler as shown. The ruler is marked in centimetres and millimetres. What is the length of the strip, to the nearest millimetre?"
      : "A strip of card is measured with a ruler marked in centimetres and millimetres, as shown. What is the length of the strip, to the nearest millimetre?",
    key, ds, sol, { W: W, M: M, S: S });
  q.figure = fig;
  return q;
}, ["Find the marks the two ends of the strip line up with, then work out the distance between them.", "Each centimetre is split into 10 millimetre ticks."]);
function u2inTapeSVG(endSix, inRange) {
  var pxIn = 84, x0 = 30, top = 64;
  function X(six) { return x0 + six * pxIn / 16; }
  var W = Math.ceil(X(inRange * 16)) + 18;
  var fig = '<svg viewBox="0 0 ' + W + ' 136" width="' + W + '" height="136" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A ribbon measured against a tape marked in inches and sixteenths of an inch">';
  fig += '<rect x="' + fmt(X(0), 1) + '" y="26" width="' + fmt(X(endSix) - X(0), 1) + '" height="18" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  fig += '<line x1="' + fmt(X(endSix), 1) + '" y1="44" x2="' + fmt(X(endSix), 1) + '" y2="' + top + '" stroke="' + FIG_ALT + '" stroke-width="1.5" stroke-dasharray="4 3"/>';
  fig += '<rect x="' + fmt(X(0) - 6, 1) + '" y="' + top + '" width="' + fmt(X(inRange * 16) - X(0) + 12, 1) + '" height="34" fill="none" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  for (var i = 0; i <= inRange * 16; i++) {
    var len = (i % 16 === 0) ? 20 : (i % 8 === 0 ? 15 : (i % 4 === 0 ? 12 : (i % 2 === 0 ? 9 : 6)));
    fig += '<line x1="' + fmt(X(i), 1) + '" y1="' + top + '" x2="' + fmt(X(i), 1) + '" y2="' + (top + len) + '" stroke="' + FIG_INK + '" stroke-width="' + (i % 16 === 0 ? 1.5 : 0.9) + '"/>';
    if (i % 16 === 0) fig += _txt(X(i), top + 50, String(i / 16), 12, false);
  }
  return fig + '</svg>';
}
function u2inFmt(totalSix) {
  var w = Math.floor(totalSix / 16), k = totalSix % 16;
  if (k === 0) return "\\(" + w + "\\) in.";
  var g = u5gcd(k, 16);
  return "\\(" + (w > 0 ? w : "") + FR(k / g, 16 / g) + "\\) in.";
}
E("u2-bridge-ruler-inch", 2, ["3.15"], 2, "gen", function(){
  var W = ri(1, 3), K = ri(1, 15);
  var T = 16 * W + K;
  var fig = u2inTapeSVG(T, W + 2);
  var eighths = K > 1;
  var T3 = eighths ? (16 * W + 2 * K) : (16 * (W + 1) + K);
  var key = { t: u2inFmt(T), fb: "Yes: the end of the ribbon is " + K + " small ticks past the " + W + " inch mark." };
  var ds = [
    { t: u2inFmt(T - 1), fb: "That stops one tick short of the end of the ribbon. Count every small tick past the " + W + " inch mark." },
    { t: u2inFmt(T + 1), fb: "That goes one tick past the end of the ribbon. The end lines up with a tick; count the ticks up to that one." },
    eighths
      ? { t: u2inFmt(T3), fb: "That counts each small tick as one eighth of an inch. The ticks split each inch into 16 equal parts, so each tick is one sixteenth of an inch." }
      : { t: u2inFmt(T3), fb: "That reads one whole inch too many. The end of the ribbon is past the " + W + " inch mark, not past the " + (W + 1) + " inch mark." }
  ];
  var g = u5gcd(K, 16);
  var sol = "Read the tape from the 0 end. The end of the ribbon lines up " + K + " small ticks past the " + W + " inch mark. The ticks split each inch into 16 equal parts, so each tick is \\(\\frac{1}{16}\\) of an inch, and the part past the inch mark is \\(" + FR(K, 16) + "\\) of an inch"
    + (g > 1 ? ", which simplifies to \\(\\frac{" + (K / g) + "}{" + (16 / g) + "}\\) of an inch" : "")
    + ". The length is <b>" + u2inFmt(T) + "</b>.";
  var q = mcq("A ribbon is measured with a tape marked in inches, as shown. What is the length of the ribbon?",
    key, ds, sol, { W: W, K: K });
  q.figure = fig;
  return q;
}, ["Find the last whole inch mark the end of the ribbon has passed, then count the small ticks after it.", "Each inch is split into 16 equal ticks, so each tick is one sixteenth of an inch."]);

var PK1202_FOR_C1=["1.1","1.2","1.3"];
var PK1202_FOR_C2=["1.4"];
var PK1202_FOR_C3=["1.5","1.6","1.7","1.8"];
var PK1202_FOR_C7=["3.1","3.2","3.3","3.4","3.8","3.9","3.10","3.11"];
var PK1202_FOR_C8=["3.5","3.6","3.7","3.12","3.13","3.14"];
var PK1202_FOR_C9=["3.15","3.16","3.17","3.18","3.19"];
var PK1202_FOR_C10=["3.20","3.21","3.22","3.23"];
var PK1202_FOR_C11=["2.1","2.2","2.3","2.4","2.5","2.6"];
var PK1202_FOR_C12=["3.24","3.25","3.26","3.27","3.28","3.29","3.30"];
var PK1202_FOR_C13=["3.31","3.32","3.33","3.34"];
var PK1202_FOR_C5=["1.11","1.12","1.13","1.14","1.18"];
var PK1202_FOR_C6=["1.15","1.16","1.17"];
var PK1202_FOR_C14=["3.44","3.45","3.46","3.47","3.48","3.49","3.50","3.51","3.52"];
var PK1202_FOR_C15=["3.35","3.36","3.37","3.38","3.39","3.40","3.41","3.42","3.43"];
var PK1202_FOR_C16=["3.53","3.54","3.55","3.56","3.57","3.58","3.59"];
var PK1202_FOR_C17=["3.60","3.61","3.62","3.63","3.64","3.65"];
var PK1202_FOR_C18=["5.1","5.2","5.3","5.4","5.5","5.6"];
var PKT1202={
  "u1-pk-express-rate":{src:"Math 8 indicator 3.16",group:"rate",for:PK1202_FOR_C1},
  "u1-pk-identify-rate":{src:"Math 8 indicator 3.17",group:"rate",for:PK1202_FOR_C1},
  "u1-pk-rate-problem":{src:"Math 8 indicator 6.29",group:"rate",for:PK1202_FOR_C1},
  "u1-pk-better-buy":{src:"Math 8 indicator 6.29",group:"rate",for:PK1202_FOR_C1},
  "u1-pk-percent-of":{src:"Math 8 indicator 6.1",group:"percent-of-amount",for:PK1202_FOR_C2},
  "u1-pk-percent-convert":{src:"Math 8 indicator 3.5",group:"percent-of-amount",for:PK1202_FOR_C2},
  "u1-pk-money-decimals":{src:"Math 9 indicator 6.1",group:"decimal-operations",for:PK1202_FOR_C3},
  "u1-pk-ratio-problem":{src:"Math 8 indicator 6.28",group:"ratio-rates",for:PK1202_FOR_C3},
  "u1-pk-evaluate-power":{src:"Math 9 indicator 3.10",group:"powers",for:PK1202_FOR_C7},
  "u1-pk-fraction-convert":{src:"Math 8 indicator 3.7",group:"conversion",for:PK1202_FOR_C8},
  "u2-pk-divide-fractions":{src:"Math 8 indicator 6.12",group:"fraction-operations",for:PK1202_FOR_C9},
  "u2-pk-referent":{src:"Mathematics 5 outcomes MA5.9.8, MA5.9.9 and MA5.9.10 (authored for this tranche; no banked source exists)",group:"estimation",for:PK1202_FOR_C9},
  "u2-bridge-ruler-mm":{src:"Mathematics 5 indicators MA5.9.1 to MA5.9.3 and the guide's measuring in millimetres lessons evidence the sub-skill without coding scale reading (authored bridge item on Jason's ruling of November 16, 2026; no banked source exists)",group:"scale-reading-bridge",for:PK1202_FOR_C9,bridge:true},
  "u2-bridge-ruler-inch":{src:"No outcome on file names reading a scale in fractions of an inch (authored bridge item on Jason's ruling of November 16, 2026; no banked source exists)",group:"scale-reading-bridge",for:PK1202_FOR_C9,bridge:true},
  "u2-pk-circ-approx":{src:"Math 7 indicator 9.7",group:"circle-measure",for:PK1202_FOR_C10},
  "u2-pk-pi-ratio":{src:"Math 7 indicator 9.8",group:"circle-measure",for:PK1202_FOR_C10},
  "u2-pk-circumference":{src:"Math 7 indicators 9.8 and 9.10",group:"circle-measure",for:PK1202_FOR_C10},
  "u2-pk-between-two":{src:"Math 9 indicator 3.2",group:"ordering-numbers",for:PK1202_FOR_C10},
  "u2-pk-ooo-evaluate":{src:"Math 9 indicator 6.2",group:"formula-use",for:PK1202_FOR_C11},
  "u2-pk-ooo-first-error":{src:"Math 9 indicator 6.4",group:"formula-use",for:PK1202_FOR_C11},
  "u2-pk-solve-two-step":{src:"Math 8 indicator 8.4",group:"linear-equations",for:PK1202_FOR_C11},
  "u3-pk-para-from-rect":{src:"Math 7 indicator 9.1",group:"area",for:PK1202_FOR_C12},
  "u3-pk-area-triangle":{src:"Math 7 indicators 9.3 and 9.5",group:"area",for:PK1202_FOR_C13},
  "u3-pk-area-parallelogram":{src:"Math 7 indicators 9.2 and 9.3",group:"area",for:PK1202_FOR_C13},
  "u3-pk-area-circle":{src:"Math 7 indicators 9.3 and 9.9",group:"area",for:PK1202_FOR_C13},
  "u3-pk-sa-from-net":{src:"Math 8 indicator 9.3",group:"measurement",for:PK1202_FOR_C13},
  "u3-pk-sa-rect-prism":{src:"Math 8 indicator 9.4",group:"measurement",for:PK1202_FOR_C13},
  "u3-pk-sa-cylinder":{src:"Math 8 indicator 9.6",group:"measurement",for:PK1202_FOR_C13},
  "u3-pk-ooo-calculator":{src:"Math 9 indicator 6.3",group:"formula-use",for:PK1202_FOR_C11},
  "u4-pk-mult-decimals":{src:"Math 7 indicator 6.7",group:"decimal-operations",for:PK1202_FOR_C5},
  "u4-pk-ooo-brackets":{src:"Math 9 indicator 6.2",group:"formula-use",for:PK1202_FOR_C5},
  "u4-pk-find-whole":{src:"Math 8 indicator 6.1",group:"percent-of-amount",for:PK1202_FOR_C5},
  "u4-pk-percent-of-percent":{src:"Math 8 indicator 6.3",group:"percent-of-amount",for:PK1202_FOR_C6},
  "u4-pk-discount-then-tax":{src:"Math 8 indicator 6.2",group:"percent-of-amount",for:PK1202_FOR_C6},
  "u4-pk-total-change":{src:"Math 9 indicator 6.1",group:"decimal-operations",for:PK1202_FOR_C6},
  "u5-pk-protractor-read":{src:"Mathematics 6 outcome MA6.9.13 (authored for the Math 8 tranche; borrowed here)",group:"instrument-reading",for:PK1202_FOR_C14},
  "u5-pk-angle-classify":{src:"Mathematics 6 outcome MA6.9.2 (authored for this tranche; no banked source exists)",group:"angle-facts",for:PK1202_FOR_C14},
  "u5-pk-bisector-env":{src:"Math 7 indicators 10.4 and 10.5",group:"angle-facts",for:PK1202_FOR_C14},
  "u5-pk-bisector-reason":{src:"Math 7 indicators 10.15 and 10.16",group:"angle-facts",for:PK1202_FOR_C14},
  "u5-pk-parallel-perp":{src:"Math 7 indicator 10.1",group:"angle-facts",for:PK1202_FOR_C15},
  "u5-pk-env-examples":{src:"Math 7 indicators 10.2 and 10.3",group:"angle-facts",for:PK1202_FOR_C15},
  "u5-pk-angle-chain":{src:"Math 7 indicator 10.1",group:"angle-measure",for:PK1202_FOR_C15},
  "u6-pk-pythag-model":{src:"Math 8 indicator 9.1",group:"pythagoras",for:PK1202_FOR_C16},
  "u6-pk-hypotenuse":{src:"Math 8 indicator 9.12",group:"pythagoras",for:PK1202_FOR_C16},
  "u6-pk-missing-leg":{src:"Math 8 indicator 9.12",group:"pythagoras",for:PK1202_FOR_C16},
  "u6-pk-is-right":{src:"Math 8 indicator 9.13",group:"pythagoras",for:PK1202_FOR_C16},
  "u6-pk-triple-find":{src:"Math 8 indicator 9.14",group:"pythagoras",for:PK1202_FOR_C16},
  "u6-pk-sqrt-perfect":{src:"Math 9 indicator 6.9",group:"square-roots",for:PK1202_FOR_C16},
  "u6-pk-estimate-between":{src:"Math 9 indicator 6.5",group:"square-roots",for:PK1202_FOR_C16},
  "u7-pk-similar-verdict":{src:"Math 9 indicator 10.7",group:"similarity",for:PK1202_FOR_C17},
  "u7-pk-draw-similar":{src:"Math 9 indicator 10.14",group:"similarity",for:PK1202_FOR_C17},
  "u7-pk-similar-context":{src:"Math 9 indicator 10.15",group:"similarity",for:PK1202_FOR_C17},
  "u7-pk-scale-factor":{src:"Math 9 indicator 10.17",group:"scale",for:PK1202_FOR_C17},
  "u7-pk-two-term-ratio":{src:"Math 8 indicator 3.8",group:"ratio-rates",for:PK1202_FOR_C18},
  "u7-pk-meaning-of-ratio":{src:"Math 8 indicator 3.13",group:"ratio-rates",for:PK1202_FOR_C18},
  "u7-pk-indirect-measure":{src:"Math 9 indicator 10.19",group:"similarity",for:PK1202_FOR_C18}
};
BANK.forEach(function(e){var t=PKT1202[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=t.for.slice();e.pkGroup=t.group;if(t.bridge)e.pkBridge=true;}});
