/* ============================================================
   PRIOR KNOWLEDGE TRANCHE (Band 2, November 16, 2026)
   Mathematics 3208 prerequisite checks. Every entry here is
   flagged pkFlag by the PKT table at the end of this file and
   carries pkSrc (its feeder source), pkFor (the host indicators
   it supports) and pkGroup (its skill group). 35 entries are
   borrowed verbatim from the Mathematics 2200, Mathematics 1201,
   Mathematics 9 and Mathematics 8 banks (only the id, the unit
   and the host indicator tag differ); the thirty-sixth flagged
   entry, u2-repeating-decimal, already lives in bank-u2.js and
   only its tranche metadata is recorded here. Settlements follow
   the Prior Knowledge Map for Mathematics 3208 (2026-11-14):
   readiness for natural exponentials, natural logarithms, log
   laws and inverse functions settles at zero entries because no
   in-stream feeder outcome names them; it is recorded as a
   flagged settlement in the tranche build report.
   ============================================================ */

function u5gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t;}return a||1;}
function u5frac(n,d){return "\\frac{"+n+"}{"+d+"}";}
function u5cp(c,e){if(e===0)return ""+c;var p=u5pow(e);return c===1?p:c+p;}
function u5wrap(s){return "\\("+s+"\\)";}
function u5dis(correct,cands,n){var out=[],seen={};seen[String(correct)]=1;for(var i=0;i<cands.length&&out.length<n;i++){var s=String(cands[i]);if(!seen[s]){seen[s]=1;out.push(s);}}return out;}
function u5twoRoots(){var r1=pick(U5NZ),r2=pick(U5NZ),t=0;while(r2===r1&&t<60){r2=pick(U5NZ);t++;}return [r1,r2];}
function u5par(a,b){return "("+u5lin(a,b)+")";}
function u5lin(a,b){if(a===0)return ""+b;var s=(a===1?"x":(a===-1?"-x":a+"x"));if(b>0)s+=" + "+b;else if(b<0)s+=" - "+(-b);return s;}
function u5npvStr(vals){var v=vals.slice().sort(function(x,y){return x-y;});return v.map(function(z){return "x \\ne "+z;}).join(", ");}
function u5pow(e){return e===0?"":(e===1?"x":"x^{"+e+"}");}
var U5NZ=[-6,-5,-4,-3,-2,-1,1,2,3,4,5,6];
function u4sgn(n){return n>0?" + "+n:(n<0?" - "+(-n):"");}
function u5quad(a,b,c){var s=(a===1?"x^2":(a===-1?"-x^2":a+"x^2"));if(b>0)s+=" + "+(b===1?"x":b+"x");else if(b<0)s+=" - "+(b===-1?"x":(-b)+"x");if(c>0)s+=" + "+c;else if(c<0)s+=" - "+(-c);return s;}
function u5fr(n,d){if(d<0){n=-n;d=-d;}if(n===0)return "0";var g=u5gcd(n,d);n/=g;d/=g;var s=n<0?"-":"";n=Math.abs(n);if(d===1)return s+n;return s+"\\frac{"+n+"}{"+d+"}";}
function u9geoTerms(t1, rn, rd, count) { /* formatted first `count` terms of a geometric sequence with integer first term */
  var out = [], num = t1, den = 1;
  for (var k = 0; k < count; k++) {
    out.push(u9fr(num, den));
    num *= rn; den *= rd;
    var g = u9gcd(num, den); num /= g; den /= g;
  }
  return out;
}
function u9fr(n, d) { /* signed reduced fraction as a KaTeX body (no delimiters) */
  if (d < 0) { n = -n; d = -d; }
  if (n === 0) return "0";
  var g = u9gcd(n, d); n /= g; d /= g;
  var s = n < 0 ? "-" : ""; n = Math.abs(n);
  if (d === 1) return s + n;
  return s + "\\frac{" + n + "}{" + d + "}";
}
function u9dist3(correct, cands) { /* first three candidate strings that differ from the key and each other */
  var out = [];
  for (var i = 0; i < cands.length; i++) {
    var c = cands[i];
    if (c !== null && c !== undefined && c !== correct && out.indexOf(c) < 0) out.push(c);
    if (out.length === 3) break;
  }
  return out;
}
function u9gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
function u6Lin(a,b){ /* ax + b as a string */
  var s=(a===1?"x":a===-1?"-x":a+"x");
  if(b>0) s+=" + "+b; else if(b<0) s+=" - "+(-b);
  return s;
}
function u6Quad(a,b,c){ /* ax^2 + bx + c as a string */
  var s=(a===1?"x^2":a===-1?"-x^2":a+"x^2");
  if(b!==0) s+=(b>0?" + ":" - ")+(Math.abs(b)===1?"x":Math.abs(b)+"x");
  if(c!==0) s+=(c>0?" + ":" - ")+Math.abs(c);
  return s;
}
function u6Pt(x,y){ return "("+fmt(x)+", "+fmt(y)+")"; }
function u3PolyS(cf){ /* coefficients, highest degree first, to a polynomial string in x */
  var out="", first=true, n=cf.length-1, i, c, p, term;
  for(i=0;i<cf.length;i++){ c=cf[i]; p=n-i; if(c===0) continue;
    if(p===0) term=""+Math.abs(c);
    else { var base=(p===1?"x":"x^"+p); term=(Math.abs(c)===1?base:Math.abs(c)+base); }
    if(first){ out=(c<0?"-":"")+term; first=false; }
    else out+=(c<0?" - ":" + ")+term;
  }
  return out===""?"0":out;
}
function u3Opts(key,cands){ /* first 3 candidate strings distinct from the key and each other */
  var out=[], seen={}; seen[key]=1;
  for(var i=0;i<cands.length;i++){ var s=String(cands[i]);
    if(!seen[s]){ seen[s]=1; out.push(s); if(out.length===3) break; } }
  return out;
}
function u2Std(a,b,c){ /* ax^2 + bx + c as a string */
  var s=(a===1?"x^2":a===-1?"-x^2":a+"x^2");
  if(b!==0) s+=(b>0?" + ":" - ")+(Math.abs(b)===1?"x":Math.abs(b)+"x");
  if(c!==0) s+=(c>0?" + ":" - ")+Math.abs(c);
  return s;
}
function parSVG(a,b,c,o){
  o=o||{};
  var W=340,H=252;
  var showVals=o.labels==="values";
  var mL=showVals?38:16,mR=14,mT=14,mB=o.xLab?36:26;
  var iw=W-mL-mR,ih=H-mT-mB;
  var f=function(x){return a*x*x+b*x+c;};
  var hv=-b/(2*a),kv=f(hv);
  var D=b*b-4*a*c,roots=[];
  if(D>0.000001){var sq=Math.sqrt(D);roots=[(-b-sq)/(2*a),(-b+sq)/(2*a)];}
  else if(D>=-0.000001){roots=[hv];}
  var x0,x1,y0,y1;
  if(o.traj){
    x0=0;
    var pr=roots.filter(function(r){return r>0;});
    x1=pr.length?pr[0]*1.06:hv*2.2;
    if(!(x1>0))x1=10;
    y1=Math.max(kv,c,1)*1.14+0.5;
    if(o.hline!==undefined)y1=Math.max(y1,o.hline*1.06);
    y0=-0.07*y1;
  }else if(o.xrange){
    x0=o.xrange[0];x1=o.xrange[1];
    var lo2=Math.min(kv,0,c),hi2=Math.max(kv,0,c),pd2=(hi2-lo2)*0.16+0.7;
    y0=lo2-pd2;y1=hi2+pd2;
  }else{
    var xs=[hv,0].concat(roots);
    var lo=Math.min.apply(null,xs),hi=Math.max.apply(null,xs),sp=Math.max(hi-lo,4);
    x0=lo-sp*0.30-0.5;x1=hi+sp*0.30+0.5;
    var lo3=Math.min(kv,0),hi3=Math.max(kv,0),sp3=Math.max(hi3-lo3,3);
    if(c>=lo3-sp3*0.9-3&&c<=hi3+sp3*0.9+3){lo3=Math.min(lo3,c);hi3=Math.max(hi3,c);}
    var pd3=(hi3-lo3)*0.16+0.7;
    y0=lo3-pd3;y1=hi3+pd3;
  }
  function X(x){return mL+(x-x0)/(x1-x0)*iw;}
  function Y(y){return mT+(y1-y)/(y1-y0)*ih;}
  function stepFor(s){return s<=13?1:(s<=32?2:(s<=75?5:10));}
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+(o.aria||"Graph of a parabola")+'">';
  var sx=stepFor(x1-x0),sy=stepFor(y1-y0),g;
  for(g=Math.ceil(x0/sx)*sx;g<=x1+1e-9;g+=sx){
    if(Math.abs(g)<1e-9)continue;
    out+='<line x1="'+fmt(X(g),1)+'" y1="'+mT+'" x2="'+fmt(X(g),1)+'" y2="'+(mT+ih)+'" stroke="#d8e2dc" stroke-width="1"/>';
    if(showVals)out+=_txt(X(g),mT+ih+13,_parNum(g),10.5,false);
  }
  for(g=Math.ceil(y0/sy)*sy;g<=y1+1e-9;g+=sy){
    if(Math.abs(g)<1e-9)continue;
    out+='<line x1="'+mL+'" y1="'+fmt(Y(g),1)+'" x2="'+(mL+iw)+'" y2="'+fmt(Y(g),1)+'" stroke="#d8e2dc" stroke-width="1"/>';
    if(showVals)out+=_txt(mL-5,Y(g),_parNum(g),10.5,false,"end");
  }
  var yAx=(y0<0&&y1>0)?Y(0):(mT+ih),xAx=(x0<0&&x1>0)?X(0):mL;
  out+='<line x1="'+mL+'" y1="'+fmt(yAx,1)+'" x2="'+(mL+iw)+'" y2="'+fmt(yAx,1)+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  out+='<polygon points="'+(mL+iw)+','+fmt(yAx,1)+' '+(mL+iw-8)+','+fmt(yAx-3.4,1)+' '+(mL+iw-8)+','+fmt(yAx+3.4,1)+'" fill="'+FIG_INK+'"/>';
  out+='<line x1="'+fmt(xAx,1)+'" y1="'+mT+'" x2="'+fmt(xAx,1)+'" y2="'+(mT+ih)+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  out+='<polygon points="'+fmt(xAx,1)+','+mT+' '+fmt(xAx-3.4,1)+','+(mT+8)+' '+fmt(xAx+3.4,1)+','+(mT+8)+'" fill="'+FIG_INK+'"/>';
  if(showVals&&(x0<0&&x1>0)&&(y0<0&&y1>0))out+=_txt(X(0)-7,Y(0)+12,"0",10.5,false);
  if(o.vline!==undefined&&o.vline>x0&&o.vline<x1)
    out+='<line x1="'+fmt(X(o.vline),1)+'" y1="'+mT+'" x2="'+fmt(X(o.vline),1)+'" y2="'+(mT+ih)+'" stroke="'+FIG_ALT+'" stroke-width="1.5" stroke-dasharray="6 4"/>';
  if(o.hline!==undefined&&o.hline>y0&&o.hline<y1)
    out+='<line x1="'+mL+'" y1="'+fmt(Y(o.hline),1)+'" x2="'+(mL+iw)+'" y2="'+fmt(Y(o.hline),1)+'" stroke="'+FIG_ALT+'" stroke-width="1.5" stroke-dasharray="6 4"/>';
  var d="",pen=false,i,x,y;
  for(i=0;i<=90;i++){
    x=x0+(x1-x0)*i/90;y=f(x);
    if(y<y0||y>y1){pen=false;continue;}
    d+=(pen?"L":"M")+fmt(X(x),1)+" "+fmt(Y(y),1);pen=true;
  }
  out+='<path d="'+d+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2.2"/>';
  var marks=(o.marks||[]).slice();
  if(o.traj&&c>0)marks.push({x:0,y:c});
  marks.forEach(function(mk){
    if(mk.x<x0||mk.x>x1||mk.y<y0||mk.y>y1)return;
    out+='<circle cx="'+fmt(X(mk.x),1)+'" cy="'+fmt(Y(mk.y),1)+'" r="3.6" fill="'+FIG_ACC+'" stroke="#ffffff" stroke-width="1.2"/>';
    if(mk.label)out+=_txt(X(mk.x),Y(mk.y)-13,mk.label,11.5,true);
  });
  if(o.xLab)out+=_txt(mL+iw,H-4,o.xLab,12,false,"end");
  if(o.yLab)out+='<text x="13" y="'+fmt(mT+ih/2,1)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="middle" dominant-baseline="central" transform="rotate(-90 13 '+fmt(mT+ih/2,1)+')">'+o.yLab+'</text>';
  return out+'</svg>';
}
function _parNum(v){var r=Math.round(v*10)/10;return (r===Math.round(r))?(""+Math.round(r)):(""+r);}
function u1exact(kind, deg) { /* {s, v}: exact string and value of sin/cos/tan at a special degree, or null */
  var th = deg * Math.PI / 180, sv = Math.sin(th), cv = Math.cos(th), v;
  if (kind === "sin") v = sv;
  else if (kind === "cos") v = cv;
  else { if (Math.abs(cv) < 1e-9) return null; v = sv / cv; }
  var mag = u1mag(kind, Math.abs(v));
  if (mag === null) return null;
  return { s: (v < 0 && mag !== "0" ? "-" : "") + mag, v: v };
}
function u1refOf(deg) { var p = ((deg % 360) + 360) % 360; return p <= 90 ? p : p <= 180 ? 180 - p : p <= 270 ? p - 180 : 360 - p; }
function u1dist3(correct, cands) { /* first three candidate strings that differ from the key and each other */
  var out = [];
  for (var i = 0; i < cands.length; i++) {
    var c = cands[i];
    if (c !== null && c !== undefined && c !== correct && out.indexOf(c) < 0) out.push(c);
    if (out.length === 3) break;
  }
  return out;
}
function u1quadOf(deg) { var p = ((deg % 360) + 360) % 360; return p < 90 ? 1 : p < 180 ? 2 : p < 270 ? 3 : 4; }
function u1mag(kind, av) { /* exact magnitude string for a special-angle ratio value */
  var table;
  if (kind === "sin" || kind === "cos") table = [[0, "0"], [0.5, "\\frac{1}{2}"], [0.7071, "\\frac{\\sqrt{2}}{2}"], [0.866, "\\frac{\\sqrt{3}}{2}"], [1, "1"]];
  else table = [[0, "0"], [0.5774, "\\frac{\\sqrt{3}}{3}"], [1, "1"], [1.7321, "\\sqrt{3}"]];
  for (var i = 0; i < table.length; i++) if (Math.abs(av - table[i][0]) < 0.01) return table[i][1];
  return null;
}
function u1fr(n, d) { /* signed reduced fraction as a KaTeX body (no delimiters) */
  if (d < 0) { n = -n; d = -d; }
  if (n === 0) return "0";
  var g = u1gcd(n, d); n /= g; d /= g;
  var s = n < 0 ? "-" : ""; n = Math.abs(n);
  if (d === 1) return s + n;
  return s + "\\frac{" + n + "}{" + d + "}";
}
function u1gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
function u4lin(m,b){
  var s=u4term(m);
  if(b>0)s+=" + "+b; else if(b<0)s+=" - "+Math.abs(b);
  return s;
}
function u4num(n){var v=Math.round(n*100)/100;return ""+v;}
function u4term(m){
  if(m===1)return "x"; if(m===-1)return "-x";
  return u4num(m)+"x";
}
function u5pt(x,y){return "("+x+", "+y+")";}
function u5red(n,d){var g=u5gcd(n,d);n/=g;d/=g;if(d<0){n=-n;d=-d;}return [n,d];}
function u5fs(n,d){var r=u5red(n,d);if(r[1]===1)return ""+r[0];if(r[0]<0)return "-"+FR(-r[0],r[1]);return FR(r[0],r[1]);}
function u5pickS3(ans,cands){
  var out=[],seen={};seen[ans]=1;
  for(var i=0;i<cands.length&&out.length<3;i++){var c=cands[i];if(typeof c==="string"&&c!==ans&&!seen[c]){seen[c]=1;out.push(c);}}
  var k=0;while(out.length<3){k++;var c2=ans+" (form "+k+")";if(!seen[c2]){seen[c2]=1;out.push(c2);}}
  return out;
}
function u4pairS(x,y){return "("+u4num(x)+", "+u4num(y)+")";}
function u5pickSlope(){return pick(u5slopes());}
function u5ybOpt(mN,mD,b){return "\\("+u5ybRaw(mN,mD,b)+"\\)";}
function u5eqCands(keyT,candTs){
  var seen={},out=[];seen[keyT.join("/")]=1;
  for(var i=0;i<candTs.length&&out.length<3;i++){var r=u5red(candTs[i][0],candTs[i][1]);var t=[r[0],r[1],candTs[i][2]];var k=t.join("/");if(!seen[k]){seen[k]=1;out.push(u5ybOpt(t[0],t[1],t[2]));}}
  var d=2;while(out.length<3){out.push(u5ybOpt(keyT[0],keyT[1],keyT[2]+d));d++;}
  return out;
}
function u5slopes(){return [[1,2],[2,3],[3,2],[2,1],[3,1],[1,3],[4,3],[3,4],[5,2],[1,4],[5,4],[4,5],[-1,2],[-2,3],[-3,2],[-2,1],[-3,1],[-1,3],[-4,3],[-3,4],[-5,2],[-1,4],[-5,4],[-4,5]];}
function u5ybRaw(mN,mD,b){var r=u5red(mN,mD);if(r[0]===0)return "y = "+b;var s="y = "+u5coef(r[0],r[1],"x");if(b>0)s+=" + "+b;else if(b<0)s+=" - "+(-b);return s;}
function u5coef(n,d,v){var r=u5red(n,d);if(r[0]===0)return "0";if(r[1]===1){if(r[0]===1)return v;if(r[0]===-1)return "-"+v;return r[0]+v;}return u5fs(r[0],r[1])+v;}
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
function u3PowDist(a, correctExp, pairs) {
  var out = [], seen = {};
  seen[String(correctExp)] = 1;
  for (var i = 0; i < pairs.length && out.length < 3; i++) {
    var e = pairs[i].v;
    if (!seen[String(e)]) { seen[String(e)] = 1; out.push({ t: "\\(" + a + "^{" + e + "}\\)", fb: pairs[i].fb }); }
  }
  return out;
}
function u2gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t;}return a||1;}
function u2radS(idx,rad){return idx===2?("\\sqrt{"+rad+"}"):("\\sqrt["+idx+"]{"+rad+"}");}
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
function solT(x, y, str, size, bold) {
  return '<text x="' + fmt(x, 1) + '" y="' + fmt(y, 1) + '" font-size="' + (size || 12) + '" fill="' + FIG_INK + '" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="middle" dominant-baseline="central"' + (bold ? ' font-weight="bold"' : "") + '>' + str + '</text>';
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
function u4nz(a,b){var v=ri(a,b),g=0;while(v===0&&g<60){v=ri(a,b);g++;}return v===0?2:v;}
function u4m(a,b,c){return "\\("+u4p(a,b,c)+"\\)";}
function u4ok(c,ds){var all=[c];for(var i=0;i<ds.length;i++){if(all.indexOf(ds[i].t)>=0)return false;all.push(ds[i].t);}return true;}
function u4p(a,b,c){return u4expr([[a,"x^{2}"],[b,"x"],[c,""]]);}
function u4expr(terms){var s="",first=true;for(var i=0;i<terms.length;i++){var cf=terms[i][0],v=terms[i][1];if(cf===0)continue;var mag;if(v===""){mag=fmt(Math.abs(cf));}else if(Math.abs(cf)===1){mag=v;}else{mag=fmt(Math.abs(cf))+v;}if(first){s+=(cf<0?"-":"")+mag;first=false;}else{s+=(cf<0?"-":"+")+mag;}}return s===""?"0":s;}
E("u1-pk-simplify-basic",1,["1.1"],1,"gen",function(){
  var mode=pick(["mono","binom"]);
  if(mode==="mono"){
    var g0=pick([2,3]),a1=ri(2,7),b1=ri(2,7),t=0;
    while((a1===b1||u5gcd(a1,b1)!==1)&&t<80){a1=ri(2,7);b1=ri(2,7);t++;}
    var a=g0*a1,b=g0*b1,m=ri(3,6),n=ri(1,m-1),e=m-n;
    var expr=u5frac(u5cp(a,m),u5cp(b,n));
    var cor=(b1===1)?u5cp(a1,e):u5frac(u5cp(a1,e),""+b1);
    var cands=[u5frac(u5cp(a1,e),""+b),
      (b1===1)?u5cp(a1,m+n):u5frac(u5cp(a1,m+n),""+b1),
      u5frac(u5cp(b1,e),""+a1),
      u5frac(u5cp(a,e),""+b1)];
    return mcq("Simplify \\("+expr+"\\) to lowest terms.",
      u5wrap(cor),u5dis(cor,cands,3).map(u5wrap),
      "Divide the numerator and denominator by their common factors: the coefficients share a factor of \\("+g0+"\\), and the powers combine by subtracting exponents, \\(x^{"+m+"} \\div x^{"+n+"} = x^{"+e+"}\\): \\[ \\begin{aligned} "+expr+" &= \\frac{"+a1+"x^{"+m+"}}{"+b1+"x^{"+n+"}} \\\\ &= "+cor+" \\end{aligned} \\] The simplified form is <b>\\("+cor+"\\)</b>, for \\(x \\ne 0\\).",
      {mode:mode,a:a,b:b,m:m,n:n});
  }
  var k=ri(2,6),rs=u5twoRoots(),r=rs[0],s=rs[1];
  var expr2=u5frac(""+k+u5par(1,-r),u5par(1,-r)+u5par(1,-s));
  var cor2=u5frac(""+k,u5lin(1,-s));
  var cands2=[u5frac(""+k,u5lin(1,-r)),
    u5frac("1",u5lin(1,-s)),
    u5frac(u5par(1,-r),u5lin(1,-s)),
    u5frac(""+k,u5lin(1,-r)+u5par(1,-s))];
  return mcq("Simplify \\("+expr2+"\\) to lowest terms.",
    u5wrap(cor2),u5dis(cor2,cands2,3).map(u5wrap),
    "The factor \\("+u5par(1,-r)+"\\) appears in both the numerator and the denominator, so it divides out: \\[ \\begin{aligned} "+expr2+" &= "+cor2+" \\end{aligned} \\] The simplified form is <b>\\("+cor2+"\\)</b>, for \\("+u5npvStr([r,s])+"\\).",
    {mode:mode,k:k,r:r,s:s});
});
E("u1-pk-npv-basic",1,["1.1"],1,"gen",function(){
  var shape=pick(["mono","binom","factored","factored3"]);
  if(shape==="mono"){
    var a=ri(2,6),c=ri(2,9),tc=0;
    while(c===a&&tc<40){c=ri(2,9);tc++;}
    var cor="x \\ne 0";
    return mcq("State the non-permissible value of the rational expression \\("+u5frac(c,a+"x")+"\\).",
      u5wrap(cor),u5dis(cor,["x \\ne "+a,"x \\ne "+(-a),"x \\ne "+c,"x \\ne "+(a+2)],3).map(u5wrap),
      "A value is non-permissible when it makes the denominator zero. Here \\("+a+"x = 0\\) when \\(x = 0\\), so the non-permissible value is <b>\\(x \\ne 0\\)</b>.",
      {shape:shape,roots:[0]});
  }
  if(shape==="binom"){
    var r=pick(U5NZ),c2=ri(2,9);
    var cor2="x \\ne "+r;
    return mcq("State the non-permissible value of the rational expression \\("+u5frac(c2,u5lin(1,-r))+"\\).",
      u5wrap(cor2),u5dis(cor2,["x \\ne "+(-r),"x \\ne 0","x \\ne "+(r+(r>0?2:-2))],3).map(u5wrap),
      "Set the denominator equal to zero and solve: \\[ \\begin{aligned} "+u5lin(1,-r)+" &= 0 \\\\ x &= "+r+" \\end{aligned} \\] So the non-permissible value is <b>\\(x \\ne "+r+"\\)</b>.",
      {shape:shape,roots:[r]});
  }
  var rs=u5twoRoots(),r1=rs[0],r2=rs[1],c3=ri(2,9);
  if(shape==="factored"){
    var cor3=u5npvStr([r1,r2]);
    return mcq("State the non-permissible values of the rational expression \\("+u5frac(c3,u5par(1,-r1)+u5par(1,-r2))+"\\).",
      u5wrap(cor3),u5dis(cor3,[u5npvStr([r1]),u5npvStr([r2]),u5npvStr([-r1,-r2]),u5npvStr([r1,-r2])],3).map(u5wrap),
      "The denominator is zero when either factor is zero: \\("+u5lin(1,-r1)+" = 0\\) gives \\(x = "+r1+"\\), and \\("+u5lin(1,-r2)+" = 0\\) gives \\(x = "+r2+"\\). So the non-permissible values are <b>\\("+cor3+"\\)</b>.",
      {shape:shape,roots:[r1,r2]});
  }
  var r3=pick(U5NZ),t3=0;while((r3===r1||r3===r2)&&t3<60){r3=pick(U5NZ);t3++;}
  var cor4=u5npvStr([r1,r2,r3]);
  return mcq("State the non-permissible values of the rational expression \\("+u5frac(c3,u5par(1,-r1)+u5par(1,-r2)+u5par(1,-r3))+"\\).",
    u5wrap(cor4),u5dis(cor4,[u5npvStr([r1,r2]),u5npvStr([-r1,-r2,-r3]),u5npvStr([r1,r3]),u5npvStr([r2,r3])],3).map(u5wrap),
    "The denominator is zero when any one of its factors is zero: \\(x = "+r1+"\\), \\(x = "+r2+"\\), or \\(x = "+r3+"\\). So the non-permissible values are <b>\\("+cor4+"\\)</b>.",
    {shape:shape,roots:[r1,r2,r3]});
});
E("u1-pk-defined-values",1,["1.1"],1,"gen",function(){
  var shape=pick(["pos","pos","neg","denom"]);
  var c0=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]);
  if(shape==="pos"){
    var a=pick([1,2,3,4]);
    var rad="\\sqrt{"+(a===1?"x":a+"x")+u4sgn(-a*c0)+"}";
    var steps=(a===1)?("x"+u4sgn(-a*c0)+" &\\geq 0 \\\\ x &\\geq "+c0)
      :((a+"x")+u4sgn(-a*c0)+" &\\geq 0 \\\\ "+a+"x &\\geq "+(a*c0)+" \\\\ x &\\geq "+c0);
    return mcq("For which values of \\(x\\) is the expression \\("+rad+"\\) defined?",
      "\\(x \\geq "+c0+"\\)",
      ["\\(x \\leq "+c0+"\\)","\\(x \\geq "+(-c0)+"\\)","\\(x > "+c0+"\\)"],
      "A square root is defined when its radicand is non-negative: \\[ \\begin{aligned} "+steps+" \\end{aligned} \\] So the expression is defined for <b>\\(x \\geq "+c0+"\\)</b>. The endpoint is included because a square root of zero is zero.",
      {a:a,c0:c0,shape:shape});
  }
  if(shape==="neg"){
    var a2=pick([1,2,3,4]);
    var rad2="\\sqrt{"+(a2*c0)+(a2===1?" - x":" - "+a2+"x")+"}";
    var steps2=(a2===1)?((a2*c0)+" - x &\\geq 0 \\\\ -x &\\geq "+(-a2*c0)+" \\\\ x &\\leq "+c0)
      :((a2*c0)+" - "+a2+"x &\\geq 0 \\\\ -"+a2+"x &\\geq "+(-a2*c0)+" \\\\ x &\\leq "+c0);
    return mcq("For which values of \\(x\\) is the expression \\("+rad2+"\\) defined?",
      "\\(x \\leq "+c0+"\\)",
      ["\\(x \\geq "+c0+"\\)","\\(x \\leq "+(-c0)+"\\)","\\(x < "+c0+"\\)"],
      "The radicand must be non-negative. Dividing by a negative number reverses the inequality: \\[ \\begin{aligned} "+steps2+" \\end{aligned} \\] So the expression is defined for <b>\\(x \\leq "+c0+"\\)</b>.",
      {a:a2,c0:c0,shape:shape});
  }
  var n=ri(2,9);
  var expr="\\frac{"+n+"}{\\sqrt{x"+u4sgn(-c0)+"}}";
  return mcq("For which values of \\(x\\) is the expression \\("+expr+"\\) defined?",
    "\\(x > "+c0+"\\)",
    ["\\(x \\geq "+c0+"\\)","\\(x < "+c0+"\\)","\\(x > "+(-c0)+"\\)"],
    "The radicand sits in a denominator, so it must be strictly positive: zero would make the denominator zero, and a negative radicand has no real square root. \\[ \\begin{aligned} x"+u4sgn(-c0)+" &> 0 \\\\ x &> "+c0+" \\end{aligned} \\] So the expression is defined for <b>\\(x > "+c0+"\\)</b>.",
    {n:n,c0:c0,shape:shape});
});
E("u1-pk-eval-function",1,["1.1"],1,"gen",function(){
  var fn=pick(["f","g","h"]);
  var m=pick([-4,-3,-2,-1,1,2,3,4,5]),b=ri(-9,10),x0=ri(-5,8);
  var ans=m*x0+b;
  return numq("A linear function is given by \\("+fn+"(x) = "+u4lin(m,b)+"\\). What is the value of \\("+fn+"("+x0+")\\)?",
    ans,0.011,
    "Substitute the given domain value into the function and simplify: \\[ \\begin{aligned} "+fn+"("+x0+") &= "+u4num(m)+"("+x0+") + ("+b+") \\\\ &= "+u4num(m*x0)+" + ("+b+") \\\\ &= "+ans+" \\end{aligned} \\] The value is <b>\\("+ans+"\\)</b>.",
    {fn:fn,m:m,b:b,x0:x0,ans:ans});
});
E("u1-pk-solve-input",1,["1.1"],2,"gen",function(){
  var fn=pick(["f","g","h"]);
  var m=pick([-4,-3,-2,-1,1,2,3,4,5]),b=ri(-9,10),xAns=ri(-6,9);
  var target=m*xAns+b;
  return numq("A linear function is given by \\("+fn+"(x) = "+u4lin(m,b)+"\\). For what domain value is \\("+fn+"(x) = "+target+"\\)?",
    xAns,0.011,
    "Set the function equal to the given range value and solve for the input: \\[ \\begin{aligned} "+u4lin(m,b)+" &= "+target+" \\\\ "+u4num(m)+"x &= "+(target-b)+" \\\\ x &= "+xAns+" \\end{aligned} \\] The domain value is <b>\\("+xAns+"\\)</b>.",
    {fn:fn,m:m,b:b,target:target,ans:xAns});
});
E("u2-pk-simplify-trinomial",2,["2.1"],2,"gen",function(){
  var mode=pick(["both","binomialDen"]);
  var r=pick(U5NZ),s=pick(U5NZ),tt=pick(U5NZ),t=0;
  while((s===r||tt===r||tt===s)&&t<80){s=pick(U5NZ);tt=pick(U5NZ);t++;}
  var numQ=u5quad(1,-(r+s),r*s);
  if(mode==="both"){
    var denQ=u5quad(1,-(r+tt),r*tt);
    var cor=u5frac(u5lin(1,-s),u5lin(1,-tt));
    var cands=[u5frac(u5lin(1,-tt),u5lin(1,-s)),
      u5frac(u5lin(1,-r),u5lin(1,-tt)),
      u5fr(s,tt),
      u5frac(u5lin(1,-s),u5lin(1,-r))];
    return mcq("Simplify \\("+u5frac(numQ,denQ)+"\\) to lowest terms.",
      u5wrap(cor),u5dis(cor,cands,3).map(u5wrap),
      "Factor both polynomials. The numerator is \\("+u5par(1,-r)+u5par(1,-s)+"\\) and the denominator is \\("+u5par(1,-r)+u5par(1,-tt)+"\\), so the common factor \\("+u5par(1,-r)+"\\) divides out: \\[ \\begin{aligned} "+u5frac(numQ,denQ)+" &= "+u5frac(u5par(1,-r)+u5par(1,-s),u5par(1,-r)+u5par(1,-tt))+" \\\\ &= "+cor+" \\end{aligned} \\] The simplified form is <b>\\("+cor+"\\)</b>, for \\("+u5npvStr([r,tt])+"\\). Only factors divide out; the terms of the trinomials cannot be cancelled.",
      {mode:mode,r:r,s:s,t:tt});
  }
  var k=pick([2,3,4]);
  var cor2=u5frac(u5lin(1,-s),""+k);
  var cands2=[u5frac(u5lin(1,-tt),""+k),
    u5frac(u5lin(1,-s),u5lin(1,-r)),
    u5fr(s,k),
    u5frac(u5lin(1,-r),""+k)];
  return mcq("Simplify \\("+u5frac(numQ,""+k+u5par(1,-r))+"\\) to lowest terms.",
    u5wrap(cor2),u5dis(cor2,cands2,3).map(u5wrap),
    "Factor the numerator: \\("+numQ+" = "+u5par(1,-r)+u5par(1,-s)+"\\). The factor \\("+u5par(1,-r)+"\\) also appears in the denominator, so it divides out: \\[ \\begin{aligned} "+u5frac(numQ,""+k+u5par(1,-r))+" &= "+u5frac(u5par(1,-r)+u5par(1,-s),""+k+u5par(1,-r))+" \\\\ &= "+cor2+" \\end{aligned} \\] The simplified form is <b>\\("+cor2+"\\)</b>, for \\(x \\ne "+r+"\\).",
    {mode:mode,r:r,s:s,t:tt,k:k});
});
E("u2-pk-geo-ratio",2,["2.1"], 1, "gen", function () {
  var RT = [
    { rn: 2, rd: 1, t1: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }, { rn: 3, rd: 1, t1: [1, 2, 3, 4, 5, 6, 7, 8] },
    { rn: 4, rd: 1, t1: [1, 2, 3, 4, 5] }, { rn: 5, rd: 1, t1: [2, 3, 4] },
    { rn: -2, rd: 1, t1: [2, 3, 4, 5, 6, 7, 8, 9] }, { rn: -3, rd: 1, t1: [1, 2, 3, 4, 5] },
    { rn: 1, rd: 2, t1: [16, 24, 32, 48, 64, 96, 128] }, { rn: 1, rd: 3, t1: [27, 54, 81, 108] },
    { rn: 2, rd: 3, t1: [54, 81, 162, 243] }, { rn: -1, rd: 2, t1: [16, 32, 48, 64, 96] }
  ];
  var c = pick(RT), t1 = pick(c.t1);
  var terms = u9geoTerms(t1, c.rn, c.rd, 5);
  var key = "\\(" + u9fr(c.rn, c.rd) + "\\)";
  var cands = [[c.rd, c.rn], [-c.rn, c.rd], [c.rn + c.rd, c.rd], [2 * c.rn, c.rd], [c.rn, c.rd + c.rn]]
    .map(function (p) { return "\\(" + u9fr(p[0], p[1]) + "\\)"; });
  var dis = u9dist3(key, cands);
  var prompt = "A geometric sequence begins \\(" + terms.join(", ") + ", \\ldots\\) What is the common ratio?";
  var sol = "The common ratio is the quotient of two consecutive terms:"
    + "\\[ \\begin{aligned} r &= \\frac{t_2}{t_1} \\\\ &= \\frac{" + terms[1] + "}{" + terms[0] + "} \\\\ &= " + u9fr(c.rn, c.rd) + " \\end{aligned} \\]"
    + "Dividing any term by the term before it gives the same quotient, so the common ratio is \\(" + u9fr(c.rn, c.rd) + "\\).";
  return mcq(prompt, key, dis, sol, { t1: t1, rn: c.rn, rd: c.rd });
});
E("u2-pk-converge-check",2,["2.1"], 1, "gen", function () {
  var CASES = [
    { rn: 1, rd: 2, t1: [8, 12, 16, 24, 40], cat: "conv" }, { rn: 3, rd: 4, t1: [64, 128], cat: "conv" },
    { rn: 2, rd: 3, t1: [81], cat: "conv" }, { rn: 1, rd: 3, t1: [54], cat: "conv" },
    { rn: -1, rd: 2, t1: [24, 32], cat: "convNeg" }, { rn: -3, rd: 4, t1: [64], cat: "convNeg" },
    { rn: -2, rd: 3, t1: [81], cat: "convNeg" }, { rn: -1, rd: 5, t1: [125], cat: "convNeg" },
    { rn: 3, rd: 2, t1: [8, 16], cat: "divPos" }, { rn: 5, rd: 4, t1: [64], cat: "divPos" },
    { rn: 4, rd: 3, t1: [81], cat: "divPos" }, { rn: 2, rd: 1, t1: [3, 4, 5, 6, 7, 8, 9], cat: "divPos" },
    { rn: -2, rd: 1, t1: [2, 3, 4, 5, 6, 7, 8], cat: "divNeg" }, { rn: -4, rd: 3, t1: [81], cat: "divNeg" },
    { rn: 1, rd: 1, t1: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12], cat: "one" },
    { rn: -1, rd: 1, t1: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12], cat: "negOne" }
  ];
  var OPTS = {
    conv: { key: "It converges, because \\(|r| < 1\\): the partial sums approach one fixed value.",
      dis: ["It diverges, because a series with infinitely many terms cannot settle on a finite sum.",
            "It diverges, because the ratio must be a whole number for a sum to exist.",
            "It converges, because every ratio below 1 produces a sum for the series."] },
    convNeg: { key: "It converges, because \\(|r| < 1\\), even though the terms alternate in sign.",
      dis: ["It diverges, because the terms alternate in sign as the series goes on.",
            "It diverges, because the common ratio is negative, so no sum can exist.",
            "It converges, because every negative ratio produces a sum for the series."] },
    divPos: { key: "It diverges, because \\(|r| > 1\\): the terms grow in size, so the partial sums never approach a value.",
      dis: ["It converges, because the common ratio is positive, so the terms keep the same sign throughout.",
            "It converges, because each term is built from the one before it by the same rule, from the first term onward.",
            "It diverges, because the first term is positive and the terms grow steadily from there."] },
    divNeg: { key: "It diverges, because \\(|r| > 1\\): the terms grow in size as they alternate in sign.",
      dis: ["It converges, because the positive and negative terms cancel each other out.",
            "It converges, because the common ratio is less than 1, so the terms shrink.",
            "It diverges, because every negative ratio produces a diverging series, whatever its size."] },
    one: { key: "It diverges, because \\(r = 1\\): the partial sums grow by the same amount every step.",
      dis: ["It converges, because the terms are constant, so the sum settles quickly.",
            "It converges to the value of the first term, since the terms never change from term to term.",
            "It diverges, because the ratio must be a fraction for a sum to exist at all."] },
    negOne: { key: "It diverges, because \\(r = -1\\): the partial sums alternate between two values and never settle.",
      dis: ["It converges to 0, because the terms cancel in pairs as they are added up, one after another.",
            "It converges, because the size of the ratio is not greater than 1 in this case.",
            "It diverges, because every negative ratio produces a diverging series in the end, whatever the terms are."] }
  };
  var c = pick(CASES), t1 = pick(c.t1);
  var terms = u9geoTerms(t1, c.rn, c.rd, 4);
  var o = OPTS[c.cat];
  var prompt = "A geometric series begins \\(" + terms.join(", ") + ", \\ldots\\) and continues with the same pattern forever. Which statement about the series is correct?";
  var sol = "The common ratio is \\(r = \\dfrac{t_2}{t_1} = " + u9fr(c.rn, c.rd) + "\\), so \\(|r| = " + u9fr(Math.abs(c.rn), c.rd) + "\\). "
    + (c.cat === "conv" || c.cat === "convNeg"
      ? "Since \\(|r| < 1\\), the terms shrink toward 0 and the partial sums approach one fixed value: the series converges."
      : c.cat === "one"
        ? "With \\(r = 1\\) every term equals the first, so each partial sum is larger than the last: the series diverges."
        : c.cat === "negOne"
          ? "With \\(r = -1\\) the partial sums alternate between \\(" + terms[0] + "\\) and 0, never settling on one value: the series diverges."
          : "Since \\(|r| > 1\\), the terms grow in size instead of shrinking toward 0, so the partial sums never approach a value: the series diverges.")
    + " The correct statement is: <b>" + o.key + "</b>";
  return mcq(prompt, o.key, o.dis, sol, { t1: t1, rn: c.rn, rd: c.rd, cat: c.cat });
});
E("u2-pk-infinite-sum",2,["2.1"], 2, "gen", function () {
  var RT = [
    { rn: 1, rd: 2, t1: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }, { rn: 1, rd: 3, t1: [4, 6, 8, 10, 12, 14, 16] },
    { rn: 2, rd: 3, t1: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }, { rn: 1, rd: 4, t1: [6, 9, 12, 15] },
    { rn: 3, rd: 4, t1: [2, 3, 4, 5, 6, 7, 8, 9, 10] }, { rn: -1, rd: 2, t1: [6, 9, 12, 15] },
    { rn: -1, rd: 3, t1: [8, 12, 16] }, { rn: 2, rd: 5, t1: [6, 9, 12] },
    { rn: -2, rd: 3, t1: [10, 15] }, { rn: 1, rd: 5, t1: [8, 12, 16] }
  ];
  var c = pick(RT), t1 = pick(c.t1);
  var rBody = u9fr(c.rn, c.rd);
  var Sn = t1 * c.rd, Sd = c.rd - c.rn;
  if (Math.random() < 0.55) {
    var key = "\\(" + u9fr(Sn, Sd) + "\\)";
    var cands = [
      "\\(" + u9fr(t1 * c.rd, c.rd + c.rn) + "\\)",
      "\\(" + u9fr(-Sn, Sd) + "\\)",
      "\\(" + u9fr(t1 * c.rn, Sd) + "\\)",
      "\\(" + u9fr(2 * Sn, Sd) + "\\)"
    ];
    var dis = u9dist3(key, cands);
    var first3 = u9geoTerms(t1, c.rn, c.rd, 3);
    var promptA = "Find the sum of the infinite geometric series \\(" + first3.join(" + ") + " + \\ldots\\)";
    var solA = "The first term is \\(" + t1 + "\\) and the common ratio is \\(r = " + rBody + "\\). Since \\(|r| < 1\\), the series converges, and"
      + "\\[ S_\\infty = \\frac{t_1}{1 - r} = \\frac{" + t1 + "}{1 - \\left(" + rBody + "\\right)} = " + u9fr(Sn, Sd) + " \\]";
    return mcq(promptA, key, dis, solA, { mode: "findS", t1: t1, rn: c.rn, rd: c.rd, Sn: Sn, Sd: Sd });
  }
  var S = ri(6, 40);
  var t1n = S * (c.rd - c.rn), t1d = c.rd;
  var keyB = "\\(" + u9fr(t1n, t1d) + "\\)";
  var candsB = [
    "\\(" + u9fr(S * (c.rd + c.rn), c.rd) + "\\)",
    "\\(" + S + "\\)",
    "\\(" + u9fr(S * c.rd, c.rd - c.rn) + "\\)",
    "\\(" + u9fr(-t1n, t1d) + "\\)"
  ];
  var disB = u9dist3(keyB, candsB);
  var promptB = "An infinite geometric series with common ratio \\(" + rBody + "\\) has a sum of \\(" + S + "\\). Find its first term.";
  var solB = "Use \\(S_\\infty = \\dfrac{t_1}{1 - r}\\) and solve for \\(t_1\\):"
    + "\\[ \\begin{aligned} " + S + " &= \\frac{t_1}{1 - \\left(" + rBody + "\\right)} \\\\ t_1 &= " + S + " \\cdot \\left(1 - \\left(" + rBody + "\\right)\\right) \\\\ &= " + u9fr(t1n, t1d) + " \\end{aligned} \\]";
  return mcq(promptB, keyB, disB, solB, { mode: "findT1", t1n: t1n, t1d: t1d, rn: c.rn, rd: c.rd, S: S });
});
E("u3-pk-npv-quadratic",3,["1.8"],2,"gen",function(){
  var shape=pick(["trinom","trinom","dos"]);
  if(shape==="dos"){
    var a=ri(2,7),n=ri(2,9);
    var cor=u5npvStr([-a,a]);
    return mcq("State the non-permissible values of the rational expression \\("+u5frac(n,"x^2 - "+(a*a))+"\\).",
      u5wrap(cor),u5dis(cor,[u5npvStr([a]),u5npvStr([-a]),u5npvStr([a*a]),u5npvStr([0,a])],3).map(u5wrap),
      "Factor the denominator and set each factor equal to zero: \\[ \\begin{aligned} x^2 - "+(a*a)+" &= 0 \\\\ "+u5par(1,-a)+u5par(1,a)+" &= 0 \\\\ x &= "+a+" \\text{ or } x = "+(-a)+" \\end{aligned} \\] So the non-permissible values are <b>\\("+cor+"\\)</b>.",
      {shape:shape,roots:[-a,a]});
  }
  var rs=u5twoRoots(),r1=rs[0],r2=rs[1];
  var b=-(r1+r2),cc=r1*r2;
  var num=pick(["const","lin"]),nv=(num==="const")?(""+ri(2,9)):u5lin(1,pick(U5NZ));
  var cor2=u5npvStr([r1,r2]);
  return mcq("State the non-permissible values of the rational expression \\("+u5frac(nv,u5quad(1,b,cc))+"\\).",
    u5wrap(cor2),u5dis(cor2,[u5npvStr([-r1,-r2]),u5npvStr([r1]),u5npvStr([r2]),u5npvStr([-r1,r2]),u5npvStr([r1,-r2])],3).map(u5wrap),
    "Factor the denominator, then set each factor equal to zero: \\[ \\begin{aligned} "+u5quad(1,b,cc)+" &= 0 \\\\ "+u5par(1,-r1)+u5par(1,-r2)+" &= 0 \\\\ x &= "+r1+" \\text{ or } x = "+r2+" \\end{aligned} \\] So the non-permissible values are <b>\\("+cor2+"\\)</b>.",
    {shape:shape,roots:[r1,r2]});
});
E("u3-pk-lcd",3,["1.8"],1,"gen",function(){
  var mode=pick(["mono","distinct","shared"]);
  if(mode==="mono"){
    var a=pick([1,2,3,4,6]),b=pick([1,2,3,4,6]),m=ri(1,3),n=ri(1,3),p=ri(2,9),q=ri(2,9);
    var L=a*b/u5gcd(a,b),E=Math.max(m,n);
    var d1=(a===1?u5pow(m):a+u5pow(m)),d2=(b===1?u5pow(n):b+u5pow(n));
    var cor=(L===1?u5pow(E):L+u5pow(E));
    var cands=[(a*b===1?u5pow(m+n):(a*b)+u5pow(m+n)),
      (L===1?u5pow(Math.min(m,n)):L+u5pow(Math.min(m,n))),
      (a*b===1?u5pow(E):(a*b)+u5pow(E)),
      u5pow(Math.max(m,n)),
      (L+2)+u5pow(E),
      (L+1)+u5pow(E),
      (L+3)+u5pow(E),
      u5pow(E+1)];
    return mcq("What is the lowest common denominator of \\("+u5frac(p,d1)+"\\) and \\("+u5frac(q,d2)+"\\)?",
      u5wrap(cor),u5dis(cor,cands,3).map(u5wrap),
      "The LCD must be a multiple of both denominators. The coefficient is the least common multiple of \\("+a+"\\) and \\("+b+"\\), which is \\("+L+"\\), and the power of \\(x\\) must be the larger of the two powers, \\(x^{"+E+"}\\). So the lowest common denominator is <b>\\("+cor+"\\)</b>. Taking the product of the coefficients or adding the powers would give a common denominator, but not the lowest one.",
      {mode:mode,a:a,b:b,m:m,n:n});
  }
  if(mode==="distinct"){
    var rs=u5twoRoots(),r=rs[0],s=rs[1],p2=ri(2,9),q2=ri(2,9);
    var cor2=u5par(1,-r)+u5par(1,-s);
    var cands2=[u5lin(2,-(r+s)),u5par(1,-r),u5par(1,-s),u5par(1,-r)+u5par(1,-r)];
    return mcq("What is the lowest common denominator of \\("+u5frac(p2,u5lin(1,-r))+"\\) and \\("+u5frac(q2,u5lin(1,-s))+"\\)?",
      u5wrap(cor2),u5dis(cor2,cands2,3).map(u5wrap),
      "The two denominators share no factor, so neither divides the other. The lowest common denominator is their product: <b>\\("+cor2+"\\)</b>. Adding the denominators would not give a multiple of either one.",
      {mode:mode,r:r,s:s});
  }
  var rs3=u5twoRoots(),r3=rs3[0],s3=rs3[1],p3=ri(2,9),q3=ri(2,9);
  var cor3=u5par(1,-r3)+u5par(1,-s3);
  var cands3=[u5par(1,-r3)+u5par(1,-s3)+u5par(1,-s3),
    u5lin(1,-s3),
    u5par(1,-r3),
    u5par(1,-s3)+u5par(1,-s3)];
  return mcq("What is the lowest common denominator of \\("+u5frac(p3,u5par(1,-r3)+u5par(1,-s3))+"\\) and \\("+u5frac(q3,u5lin(1,-s3))+"\\)?",
    u5wrap(cor3),u5dis(cor3,cands3,3).map(u5wrap),
    "The second denominator \\("+u5lin(1,-s3)+"\\) already divides the first, so it adds nothing new. The lowest common denominator is the first denominator itself: <b>\\("+cor3+"\\)</b>. Multiplying the two denominators together would repeat the factor \\("+u5par(1,-s3)+"\\).",
    {mode:mode,r:r3,s:s3});
});
E("u3-pk-recip-features",3,["1.8"],2,"gen",function(){
  var fam=pick(["va-linear","va-linear","va-quad","domain-range","point"]);
  if(fam==="va-linear"){
    var a=pick([1,2,3,-2,-3]), k=0;
    while(k===0) k=ri(-6,6);
    var b=-a*k;
    var key="\\(x = "+k+"\\)";
    var dis=["\\(x = "+(-k)+"\\)", "\\(x = "+b+"\\)", "\\(y = 0\\)"];
    if(b===k || b===-k) dis[1]="\\(x = "+(k+1)+"\\)";
    return mcq("What is the <b>vertical asymptote</b> of the graph of \\(y = \\frac{1}{"+u6Lin(a,b)+"}\\)?",
      key, dis,
      "A reciprocal function is undefined exactly where its denominator is zero, and that x-value is the vertical asymptote:"+
      "\\[ \\begin{aligned} "+u6Lin(a,b)+" &= 0 \\\\ "+(a===1?"x":a+"x")+" &= "+(-b)+" \\\\ x &= "+k+" \\end{aligned} \\]"+
      "So the graph approaches the line \\(x = "+k+"\\) without ever reaching it. The horizontal asymptote is \\(y = 0\\), which describes the end behaviour, not a vertical line.",
      {fam:fam, a:a, b:b, va:k});
  }
  if(fam==="va-quad"){
    var r1=ri(-5,2), r2=r1+pick([2,3,4]);
    var S=r1+r2, P=r1*r2;
    return mcq("What are the <b>vertical asymptotes</b> of the graph of \\(y = \\frac{1}{"+u6Quad(1,-S,P)+"}\\)?",
      "\\(x = "+r1+"\\) and \\(x = "+r2+"\\)",
      ["\\(x = "+(-r1)+"\\) and \\(x = "+(-r2)+"\\)", "\\(x = "+r1+"\\) only", "There are no vertical asymptotes"],
      "Factor the denominator first: \\("+u6Quad(1,-S,P)+" = (x - ("+r1+"))(x - ("+r2+"))\\). The function is undefined where either factor is zero, at \\(x = "+r1+"\\) and \\(x = "+r2+"\\). Each zero of the denominator gives a vertical asymptote, so there are two of them.",
      {fam:fam, r1:r1, r2:r2});
  }
  if(fam==="domain-range"){
    var a2=pick([1,2,3,-2]), k2=0;
    while(k2===0) k2=ri(-6,6);
    var b2=-a2*k2;
    function dr(d, rg){ return "Domain: all real numbers except \\(x = "+d+"\\); range: all real numbers except \\(y = "+rg+"\\)"; }
    return mcq("What are the <b>domain and range</b> of \\(y = \\frac{1}{"+u6Lin(a2,b2)+"}\\)?",
      dr(k2, 0), [dr(-k2, 0), dr(k2, 1), "Domain: all real numbers; range: all real numbers"],
      "The denominator is zero when \\("+u6Lin(a2,b2)+" = 0\\), at \\(x = "+k2+"\\), and the function is undefined there, so \\("+k2+"\\) is excluded from the domain. Every other x-value is allowed. The reciprocal of a real number is never 0, so \\(y = 0\\) is excluded from the range, and every other y-value does occur.",
      {fam:fam, a:a2, b:b2, va:k2});
  }
  var x0=ri(-5,5), y0=pick([2,4,5,10,-2,-4,-5,-10]), rev=ri(0,1)===0;
  function ptStr(x,y){ return "\\("+u6Pt(x,y)+"\\)"; }
  var frac1=(y0===2?"\\frac{1}{2}":y0===4?"\\frac{1}{4}":y0===5?"\\frac{1}{5}":y0===10?"\\frac{1}{10}":y0===-2?"-\\frac{1}{2}":y0===-4?"-\\frac{1}{4}":y0===-5?"-\\frac{1}{5}":"-\\frac{1}{10}");
  var recipDisp=frac1;
  function ptRaw(x,y){ return "("+x+", "+y+")"; }
  if(rev){
    return mcq("The point \\("+ptRaw(x0,recipDisp)+"\\) lies on the graph of the reciprocal function \\(y = \\frac{1}{f(x)}\\). Which point lies on the graph of \\(y = f(x)\\)?",
      ptStr(x0,y0),
      ["\\("+ptRaw(x0,recipDisp)+"\\)", "\\("+ptRaw(recipDisp,x0)+"\\)", ptStr(x0,-y0)],
      "A point \\((a, b)\\) on \\(y = \\frac{1}{f(x)}\\) has \\(b = \\frac{1}{f(a)}\\), so \\(f(a) = \\frac{1}{b}\\). Here \\(b = "+recipDisp+"\\), so \\(f("+x0+") = "+y0+"\\), and the corresponding point on the original function is "+ptStr(x0,y0)+". The x-coordinate does not change between the two graphs.",
      {fam:fam, x:x0, y:y0, rev:rev});
  }
  return mcq("The point "+ptStr(x0,y0)+" lies on the graph of \\(y = f(x)\\). Which point lies on the graph of the reciprocal function \\(y = \\frac{1}{f(x)}\\)?",
    "\\("+ptRaw(x0,recipDisp)+"\\)",
    [ptStr(x0,y0), "\\("+ptRaw(recipDisp,x0)+"\\)", ptStr(x0,-y0)],
    "A point \\((a, b)\\) on \\(y = f(x)\\) gives the value \\(f(a) = "+y0+"\\). On the reciprocal function the same x-value appears with the reciprocal of the y-value: \\(\\frac{1}{"+y0+"} = "+recipDisp+"\\). So the corresponding point is \\("+ptRaw(x0,recipDisp)+"\\)",
    {fam:fam, x:x0, y:y0, rev:rev});
});
E("u3-pk-solve-linear",3,["1.8"],2,"gen",function(){
  var mode=pick(["constOverLin","proportion","selfRatio"]);
  if(mode==="constOverLin"){
    var a=pick(U5NZ),m=ri(2,5),j=ri(2,6),k=m*j,x=a+j;
    var expr=u5frac(k,u5lin(1,-a))+" = "+m;
    return numq("Solve the equation \\("+expr+"\\).",
      x,0.01,
      "Restriction: \\("+u5npvStr([a])+"\\). Multiply both sides by \\("+u5lin(1,-a)+"\\): \\[ \\begin{aligned} "+k+" &= "+m+u5par(1,-a)+" \\\\ "+u5lin(1,-a)+" &= "+j+" \\\\ x &= "+x+" \\end{aligned} \\] The value \\(x = "+x+"\\) is not the restricted value, so it is kept. The solution is <b>\\(x = "+x+"\\)</b>.",
      {mode:mode,a:a,m:m,j:j});
  }
  if(mode==="proportion"){
    var av=ri(2,5),dm=ri(2,4),bv=av+dm,tv=ri(2,4),cv=dm*tv,x=av*tv;
    var expr=u5frac(av,"x")+" = "+u5frac(bv,"x + "+cv);
    return numq("Solve the equation \\("+expr+"\\).",
      x,0.01,
      "Restrictions: \\(x \\ne 0\\) and \\(x \\ne "+(-cv)+"\\). Cross-multiply, which is multiplying both sides by the LCD \\(x(x + "+cv+")\\) and then cancelling: \\[ \\begin{aligned} "+av+"(x + "+cv+") &= "+bv+"x \\\\ "+av+"x + "+(av*cv)+" &= "+bv+"x \\\\ "+(av*cv)+" &= "+dm+"x \\\\ x &= "+x+" \\end{aligned} \\] The value \\(x = "+x+"\\) is permissible, so it is kept. The solution is <b>\\(x = "+x+"\\)</b>.",
      {mode:mode,a:av,b:bv,c:cv});
  }
  var c0=ri(2,5),tv2=ri(2,5),av2=(c0-1)*tv2,x2=c0*tv2;
  var expr3=u5frac("x",u5lin(1,-av2))+" = "+c0;
  return numq("Solve the equation \\("+expr3+"\\).",
    x2,0.01,
    "Restriction: \\("+u5npvStr([av2])+"\\). Multiply both sides by \\("+u5lin(1,-av2)+"\\): \\[ \\begin{aligned} x &= "+c0+u5par(1,-av2)+" \\\\ x &= "+c0+"x "+(-c0*av2)+" \\\\ "+(c0*av2)+" &= "+(c0-1)+"x \\\\ x &= "+x2+" \\end{aligned} \\] The value \\(x = "+x2+"\\) is not the restricted value, so it is kept. The solution is <b>\\(x = "+x2+"\\)</b>.",
    {mode:mode,a:av2,c0:c0});
});
E("u3-pk-solve-extraneous",3,["1.8"],2,"gen",function(){
  var mode=pick(["oneValid","oneValid","noSolution"]);
  if(mode==="noSolution"){
    var a=ri(2,8),sg=pick([1,1,-1]),xv=sg*a;
    var expr=u5frac("1",u5lin(1,-a))+" + "+u5frac("1",u5lin(1,a))+" = "+u5frac(""+(2*a*sg),"x^2 - "+(a*a));
    var cor="No solution";
    var cands=[""+a,""+(-a),"0"];
    return mcq("Solve the equation \\("+expr+"\\).",
      cor,u5dis(cor,cands,3),
      "Restrictions: \\("+u5npvStr([-a,a])+"\\). The LCD is \\(x^2 - "+(a*a)+" = "+u5par(1,-a)+u5par(1,a)+"\\). Multiply every term by it: \\[ \\begin{aligned} "+u5par(1,a)+" + "+u5par(1,-a)+" &= "+(2*a*sg)+" \\\\ 2x &= "+(2*a*sg)+" \\\\ x &= "+xv+" \\end{aligned} \\] But \\(x = "+xv+"\\) is one of the restricted values: it makes the original denominators zero. It is an extraneous root produced by clearing the denominators, so it must be rejected, and the equation has <b>no solution</b>.",
      {mode:mode,a:a});
  }
  var av=ri(2,8),cv=av+ri(1,7),t=0;
  while(cv===2*av&&t<40){cv=av+ri(1,7);t++;}
  var r=cv-av,dv=av*av-cv*av,pres=pick(["normal","flipped"]);
  var expr2=(pres==="normal")?(u5frac("x^2",u5lin(1,-av))+" = "+u5frac(u5lin(cv,dv),u5lin(1,-av))):(u5frac(u5lin(cv,dv),u5lin(1,-av))+" = "+u5frac("x^2",u5lin(1,-av)));
  return numq("Solve the equation \\("+expr2+"\\).",
    r,0.01,
    "Restriction: \\("+u5npvStr([av])+"\\). The denominators are the same, so set the numerators equal and solve the resulting quadratic: \\[ \\begin{aligned} x^2 &= "+u5lin(cv,dv)+" \\\\ "+u5quad(1,-cv,-dv)+" &= 0 \\\\ "+u5par(1,-av)+u5par(1,-r)+" &= 0 \\\\ x &= "+av+" \\text{ or } x = "+r+" \\end{aligned} \\] The value \\(x = "+av+"\\) makes the original denominator zero, so it is extraneous and is rejected. The only solution is <b>\\(x = "+r+"\\)</b>.",
    {mode:mode,a:av,c:cv,r:r});
});
E("u4-pk-slope-rise-run",4,["3.1"],1,"gen",function(){
  var mode=ri(1,3),rise,run,desc;
  if(mode===3){
    var x1=ri(0,5),y1=ri(0,10),dx=ri(2,8),dy=0;while(dy===0)dy=ri(-9,9);
    rise=dy;run=dx;
    desc="A line segment joins the points \\("+u5pt(x1,y1)+"\\) and \\("+u5pt(x1+dx,y1+dy)+"\\)";
    var prm={mode:mode,x1:x1,y1:y1,x2:x1+dx,y2:y1+dy,ansN:u5red(rise,run)[0],ansD:u5red(rise,run)[1]};
  }else{
    var R=ri(2,24),U=ri(2,24);
    if(mode===1){rise=R;desc="A line segment rises "+R+" units over a horizontal run of "+U+" units";}
    else{rise=-R;desc="A line segment falls "+R+" units over a horizontal run of "+U+" units";}
    run=U;
    var prm={mode:mode,rise:rise,run:run,ansN:u5red(rise,run)[0],ansD:u5red(rise,run)[1]};
  }
  var ar=u5red(rise,run),ansN=ar[0],ansD=ar[1];
  var key="\\("+u5fs(ansN,ansD)+"\\)";
  var cands=["\\("+u5fs(run,rise)+"\\)","\\("+u5fs(-rise,run)+"\\)","\\("+u5fs(rise+run,run)+"\\)","\\("+u5fs(rise,run+rise)+"\\)","\\("+u5fs(rise*2,run)+"\\)"];
  var ds=u5pickS3(key,cands);
  return mcq(desc+". What is the slope of the segment?",
    key,ds,
    "Slope is rise divided by run: \\[ \\begin{aligned} m &= "+u5fs(rise,run)+" \\\\ &= "+u5fs(ansN,ansD)+" \\end{aligned} \\] The slope is <b>\\("+u5fs(ansN,ansD)+"\\)</b>.",
    prm);
});
E("u4-pk-rate-of-change",4,["3.1"],1,"gen",function(){
  var mode=ri(1,2);
  var m=pick([-3,-2,-1,-0.5,0.5,1,2,3,4]);
  var dx=pick([2,3,4,5]),x1=ri(0,6),x2=x1+dx;
  var y1=ri(1,15),y2=y1+m*dx;
  var prompt,solHead;
  if(mode===1){
    prompt="A table for a linear relation has two rows: when the input is \\("+x1+"\\), the output is \\("+y1+"\\), and when the input is \\("+x2+"\\), the output is \\("+y2+"\\). What is the rate of change of this relation?";
    solHead="The rate of change is the change in output divided by the change in input, using the two rows of the table:";
  }else{
    prompt="The graph of a linear relation passes through the points \\("+u4pairS(x1,y1)+"\\) and \\("+u4pairS(x2,y2)+"\\). What is the rate of change of this relation?";
    solHead="The rate of change is the change in the second coordinates divided by the change in the first coordinates:";
  }
  return numq(prompt,m,0.011,
    solHead+" \\[ \\begin{aligned} \\text{rate of change} &= "+FR(y2+" - "+y1,x2+" - "+x1)+" \\\\ &= "+FR(u4num(y2-y1),u4num(x2-x1))+" \\\\ &= "+u4num(m)+" \\end{aligned} \\] The rate of change is <b>\\("+u4num(m)+"\\)</b>.",
    {mode:mode,x1:x1,y1:y1,x2:x2,y2:y2,ans:m});
});
E("u4-pk-eq-slope-point",4,["3.1"],1,"gen",function(){
  var s=u5pickSlope(),mN=s[0],mD=s[1];
  var x=mD*ri(-3,3),y=ri(-9,11),b=y-(mN*x)/mD;
  var key=u5ybOpt(mN,mD,b);
  var bNegSlope=y-((-mN)*x)/mD;
  var ds=u5eqCands([mN,mD,b],[[-mN,mD,bNegSlope],[mN,mD,-b],[mD,mN,b],[mN,mD,b+3]]);
  return mcq("What is the equation, in the form \\(y = mx + b\\), of the line with slope \\("+u5fs(mN,mD)+"\\) that passes through the point \\("+u5pt(x,y)+"\\) (coordinates given as \\((x, y)\\))?",
    key,ds,
    "Substitute the slope and the point into \\(y = mx + b\\) and solve for \\(b\\), reasoning that the point must satisfy the equation: \\[ \\begin{aligned} "+y+" &= ("+u5fs(mN,mD)+")("+x+") + b \\\\ "+y+" &= "+((mN*x)/mD)+" + b \\\\ b &= "+b+" \\end{aligned} \\] The equation is <b>"+key+"</b>.",
    {mN:mN,mD:mD,x:x,y:y,b:b,keyStr:key});
});
E("u4-pk-eq-two-points",4,["3.1"],2,"gen",function(){
  var s=u5pickSlope(),mN=s[0],mD=s[1],b=ri(-9,9);
  var x1=mD*ri(-3,2),st=pick([1,2]),x2=x1+mD*st;
  var y1=mN*(x1/mD)+b,y2=mN*(x2/mD)+b;
  var key=u5ybOpt(mN,mD,b);
  var ds=u5eqCands([mN,mD,b],[[-mN,mD,y1-((-mN)*x1)/mD],[mN,mD,-b],[mD,mN,b],[mN,mD,b-3]]);
  return mcq("What is the equation, in the form \\(y = mx + b\\), of the line through the points \\("+u5pt(x1,y1)+"\\) and \\("+u5pt(x2,y2)+"\\) (coordinates given as \\((x, y)\\))?",
    key,ds,
    "First find the slope from the two points, then use one point to find the intercept, reasoning that both points must satisfy the equation: \\[ \\begin{aligned} m &= \\frac{"+y2+" - "+y1+"}{"+x2+" - "+x1+"} = "+u5fs(mN,mD)+" \\\\ b &= "+y1+" - ("+u5fs(mN,mD)+")("+x1+") = "+b+" \\\\ y &= "+u5coef(mN,mD,"x")+(b>0?" + "+b:b<0?" - "+(-b):"")+" \\end{aligned} \\] The equation is <b>"+key+"</b>.",
    {mN:mN,mD:mD,b:b,x1:x1,y1:y1,x2:x2,y2:y2,keyStr:key});
});
E("u4-pk-factor-common",4,["3.1"],1,"gen",function(){
  var att=0, d, k, A2, A1, A0, inside, origP;
  while(att<300){
    att++;
    d=ri(2,9); k=ri(1,2);
    A2=pick([0,1,2,3,-2,-3]); A1=ri(-9,9);
    A0=pick([-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9]);
    var nz=(A2!==0?1:0)+(A1!==0?1:0)+1;
    if(nz<2) continue;
    if(u3Gcd(u3Gcd(A2,A1),A0)!==1) continue;
    if(A2!==0){ var disc=A1*A1-4*A2*A0, dsq=Math.sqrt(disc); if(disc>=0&&dsq===Math.floor(dsq)) continue; }
    break;
  }
  inside={0:A0,1:A1,2:A2};
  origP={}; Object.keys(inside).forEach(function(p){ origP[Number(p)+k]=d*inside[p]; });
  function polyPS(P){ var ps=Object.keys(P).map(Number).sort(function(x,y){return y-x;});
    var cf=ps.map(function(p){ return P[p]; });
    /* rebuild with explicit degree so zero gaps are kept */
    var top=ps[0], arr=[], i;
    for(i=top;i>=0;i--) arr.push(P[i]||0);
    return u3PolyS(arr);
  }
  var gcfS=d+"x"+(k>1?"^"+k:"");
  var insideS=polyPS(inside);
  var key=gcfS+"("+insideS+")";
  var shifted={}; Object.keys(inside).forEach(function(p){ shifted[Number(p)+k]=inside[p]; });
  var scaled={}; Object.keys(inside).forEach(function(p){ scaled[p]=d*inside[p]; });
  var midFlip={0:A0,1:-A1,2:A2}, constFlip={0:-A0,1:A1,2:A2}, noConst={1:A1,2:A2};
  var cands=[ d+"("+polyPS(shifted)+")",
              gcfS+"("+polyPS(midFlip)+")",
              gcfS+"("+polyPS(constFlip)+")",
              "x^"+k+"("+polyPS(scaled)+")".replace("x^1","x"),
              (d+1)+"x"+(k>1?"^"+k:"")+"("+insideS+")" ];
  if(A1===0) cands.splice(1,1);
  return mcq("Factor completely: \\("+polyPS(origP)+"\\)",
    "\\("+key+"\\)",
    u3Opts("\\("+key+"\\)", cands.map(function(s){ return "\\("+s+"\\)"; })),
    "Every term of \\("+polyPS(origP)+"\\) is divisible by \\("+gcfS+"\\), and the remaining factor \\("+insideS+"\\) has no factor common to all of its terms:"+
    "\\[ "+polyPS(origP)+" = "+key+" \\]"+
    "So the complete factorization is <b>\\("+key+"\\)</b>.",
    {d:d, k:k});
});
E("u5-pk-characteristics",5,["3.21"],2,"gen",function(){
  var a=pick([1,2,-1,-2]);
  var p=0; while(p===0) p=ri(-5,5);
  var q=ri(-6,6); if(q===0) q=3;
  var b=-2*a*p, c=a*p*p+q;
  function stYint(v){ return "The y-intercept is \\("+v+"\\)."; }
  function stAxis(v){ return "The axis of symmetry is \\(x = "+v+"\\)."; }
  function stOpen(upw){ return upw?"The parabola opens upward.":"The parabola opens downward."; }
  function stExtr(isMax, v, x){ return "The "+(isMax?"maximum":"minimum")+" value is \\("+v+"\\), reached at \\(x = "+x+"\\)."; }
  var falseYint=[b, q, -c, c+1].filter(function(v){ return v!==c; })[0];
  var chars={
    yint:{ t:stYint(c), f:stYint(falseYint) },
    axis:{ t:stAxis(p), f:stAxis(-p) },
    open:{ t:stOpen(a>0), f:stOpen(a<0) },
    extr:{ t:stExtr(a<0, q, p), f:stExtr(a>0, q, p) }
  };
  var keyChar=pick(["yint","axis","open","extr"]);
  var opts={};
  ["yint","axis","open","extr"].forEach(function(k){ opts[k]=(k===keyChar?chars[k].t:chars[k].f); });
  var qc=mcq("Which statement about the graph of \\(y = "+u2Std(a,b,c)+"\\) is <b>correct</b>?",
    opts[keyChar], ["yint","axis","open","extr"].filter(function(k){ return k!==keyChar; }).map(function(k){ return opts[k]; }),
    "Work through the characteristics one at a time. The y-intercept comes from setting \\(x = 0\\), which leaves \\(y = "+c+"\\). The axis of symmetry is \\(x = \\frac{-b}{2a} = \\frac{"+(-b)+"}{"+(2*a)+"} = "+p+"\\). Since \\(a = "+a+"\\) is "+(a>0?"positive":"negative")+", the parabola opens "+(a>0?"upward":"downward")+", so the vertex \\(("+p+", "+q+")\\) gives a "+(a>0?"minimum":"maximum")+" value of \\("+q+"\\). Only one of the four statements matches all of this.",
    {a:a, p:p, q:q, keyChar:keyChar});
  qc.figure=parSVG(a,-2*a*p,a*p*p+q,{marks:[{x:p,y:q}]});
  return qc;
});
E("u5-pk-sa-rect-prism",5,["3.21"], 2, "gen", function(){
  var l=ri(3,14), w=ri(3,12), h=ri(2,10);
  var sa=2*(l*w+l*h+w*h);
  var q=numq("Find the surface area of the right rectangular prism shown, in square centimetres.", sa, 0.01,
    "Work face by face. The front and back are "+l+" by "+h+", the sides are "+w+" by "+h+", and the top and bottom are "+l+" by "+w+": \\[ \\begin{aligned} SA &= 2(lw+lh+wh) \\\\ &= 2("+fmt(l*w)+"+"+fmt(l*h)+"+"+fmt(w*h)+") \\\\ &= 2("+fmt(l*w+l*h+w*h)+") \\\\ &= "+sa+" \\end{aligned} \\] The surface area is <b>"+sa+" cm\\(^{2}\\)</b>.",
    {mode:"rect-sa", l:l, w:w, h:h});
  q.figure=u4boxSVG(l,w,h);
  return q;
}, ["Picture the net: three different faces, each with a matching partner.", "Find the area of the top, the front and one side, add them, then double."]);
E("u5-pk-vol-cylinder",5,["3.21"], 1, "gen", function(){
  var r=ri(2,10), h=ri(3,15);
  var V=u4r1(3.14*r*r*h);
  var q=numq("Find the volume of the right cylinder shown. Use \\(\\pi = 3.14\\) and give your answer in cubic centimetres, to one decimal place.", V, 0.6,
    "A cylinder is a prism with a circular base, so its volume is base area times height: \\[ \\begin{aligned} V &= \\pi r^{2} h \\\\ &= 3.14 \\times "+r+"^{2} \\times "+h+" \\\\ &= "+fmt(V)+" \\end{aligned} \\] The volume is <b>"+fmt(V)+" cm\\(^{3}\\)</b>.",
    {mode:"cyl-vol", r:r, h:h});
  q.figure=u4cylSVG(r,h,false);
  return q;
}, ["Treat the cylinder like a prism whose base is a circle.", "Find the circle area with pi times radius squared, then multiply by the height."]);
E("u5-pk-similar-context",5,["3.21"], 2, "gen", function () {
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
E("u5-pk-indirect-measure",5,["3.21"], 3, "gen", function () {
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
E("u6-pk-exact-values",6,["1.12"], 2, "gen", function () {
  var degs = [120, 135, 150, 210, 225, 240, 300, 315, 330, 30, 45, 60];
  var deg = pick(degs), kind = pick(["sin", "cos", "tan"]);
  var kd = "\\" + kind;
  var pres = pick([deg, deg, deg + 360, deg - 360]);
  var ex = u1exact(kind, deg);
  var ref = u1refOf(deg);
  var corr = "\\(" + ex.s + "\\)";
  var others = ["sin", "cos", "tan"].filter(function (k) { return k !== kind; });
  var candBodies = [];
  var e1 = u1exact(kind, ref); if (e1) candBodies.push(e1.s);
  var e2 = u1exact(others[0], deg); if (e2) candBodies.push(e2.s);
  var e3 = u1exact(others[1], deg); if (e3) candBodies.push(e3.s);
  var e4 = u1exact(kind, (deg + 180) % 360); if (e4) candBodies.push(e4.s);
  var e5 = u1exact(kind, (360 - deg) % 360); if (e5) candBodies.push(e5.s);
  candBodies.push(ex.s.charAt(0) === "-" ? ex.s.slice(1) : "-" + ex.s);
  candBodies = candBodies.concat(["\\frac{1}{2}", "-\\frac{1}{2}", "\\frac{\\sqrt{2}}{2}", "-\\frac{\\sqrt{2}}{2}", "\\frac{\\sqrt{3}}{2}", "-\\frac{\\sqrt{3}}{2}", "\\frac{\\sqrt{3}}{3}", "-\\frac{\\sqrt{3}}{3}", "\\sqrt{3}", "-\\sqrt{3}", "1", "-1", "0"]);
  var dis = u1dist3(ex.s, candBodies).map(function (s) { return "\\(" + s + "\\)"; });
  var q = u1quadOf(deg);
  var cotNote = pres === deg ? "" : "The angle " + pres + "° is coterminal with " + deg + "°, so it has the same ratio values. ";
  return mcq("Determine the exact value of \\(" + kd + " " + pres + "^\\circ\\).",
    corr, dis,
    cotNote + "The reference angle for " + deg + "° is " + ref + "°, and the angle terminates in Quadrant " + ["I", "II", "III", "IV"][q - 1] + ", where \\(" + kd + "\\) is " + (ex.v < 0 ? "negative" : "positive") + ". Since \\(" + kd + " " + ref + "^\\circ = " + (u1exact(kind, ref) || {}).s + "\\), the value is \\[ \\begin{aligned} " + kd + " " + deg + "^\\circ &= " + ex.s + " \\end{aligned} \\] The exact value is <b>" + corr + "</b>.",
    { deg: deg, pres: pres, kind: kind });
});
E("u6-pk-solve-equation",6,["1.12"], 2, "gen", function () {
  function pairFmt(p) { return "\\(\\theta = " + p[0] + "^\\circ\\) or \\(\\theta = " + p[1] + "^\\circ\\)"; }
  function pairFor(ratio, ref, sign) {
    if (ratio === "sin") { if (ref === 0) return [0, 180]; return sign > 0 ? [ref, 180 - ref] : [180 + ref, 360 - ref]; }
    if (ratio === "cos") { if (ref === 0) return [90, 270]; return sign > 0 ? [ref, 360 - ref] : [180 - ref, 180 + ref]; }
    if (ref === 0) return [0, 180];
    return sign > 0 ? [ref, 180 + ref] : [180 - ref, 360 - ref];
  }
  function validPair(p) { return p[0] !== p[1] && p[0] >= 0 && p[0] < 360 && p[1] >= 0 && p[1] < 360; }
  function samePair(p, q) { return (p[0] === q[0] && p[1] === q[1]) || (p[0] === q[1] && p[1] === q[0]); }
  function distPairs(corrP, candPs) {
    var out = [];
    for (var i = 0; i < candPs.length; i++) {
      var p = candPs[i];
      if (!validPair(p) || samePair(p, corrP)) continue;
      var s = pairFmt(p);
      if (out.indexOf(s) < 0) out.push(s);
      if (out.length === 3) break;
    }
    return out;
  }
  if (Math.random() < 0.55) {
    var table = [
      { ratio: "sin", a: "\\frac{1}{2}", ref: 30, sign: 1 }, { ratio: "sin", a: "\\frac{\\sqrt{2}}{2}", ref: 45, sign: 1 },
      { ratio: "sin", a: "\\frac{\\sqrt{3}}{2}", ref: 60, sign: 1 }, { ratio: "sin", a: "-\\frac{1}{2}", ref: 30, sign: -1 },
      { ratio: "sin", a: "-\\frac{\\sqrt{2}}{2}", ref: 45, sign: -1 }, { ratio: "sin", a: "-\\frac{\\sqrt{3}}{2}", ref: 60, sign: -1 },
      { ratio: "sin", a: "0", ref: 0, sign: 1 },
      { ratio: "cos", a: "\\frac{1}{2}", ref: 60, sign: 1 }, { ratio: "cos", a: "\\frac{\\sqrt{2}}{2}", ref: 45, sign: 1 },
      { ratio: "cos", a: "\\frac{\\sqrt{3}}{2}", ref: 30, sign: 1 }, { ratio: "cos", a: "-\\frac{1}{2}", ref: 60, sign: -1 },
      { ratio: "cos", a: "-\\frac{\\sqrt{2}}{2}", ref: 45, sign: -1 }, { ratio: "cos", a: "-\\frac{\\sqrt{3}}{2}", ref: 30, sign: -1 },
      { ratio: "cos", a: "0", ref: 0, sign: 1 },
      { ratio: "tan", a: "1", ref: 45, sign: 1 }, { ratio: "tan", a: "\\sqrt{3}", ref: 60, sign: 1 },
      { ratio: "tan", a: "\\frac{\\sqrt{3}}{3}", ref: 30, sign: 1 }, { ratio: "tan", a: "-1", ref: 45, sign: -1 },
      { ratio: "tan", a: "-\\sqrt{3}", ref: 60, sign: -1 }, { ratio: "tan", a: "-\\frac{\\sqrt{3}}{3}", ref: 30, sign: -1 },
      { ratio: "tan", a: "0", ref: 0, sign: 1 }
    ];
    var e = pick(table);
    var rd = "\\" + e.ratio;
    var corrP = pairFor(e.ratio, e.ref, e.sign);
    var others = e.ratio === "sin" ? ["cos", "tan"] : e.ratio === "cos" ? ["sin", "tan"] : ["sin", "cos"];
    var candPs = [
      pairFor(e.ratio, e.ref, -e.sign),
      pairFor(e.ratio, 90 - e.ref, e.sign),
      pairFor(others[0], e.ref, e.sign),
      pairFor(others[1], e.ref, e.sign),
      pairFor(e.ratio, e.ref === 30 ? 60 : 30, e.sign),
      pairFor(e.ratio, e.ref === 45 ? 30 : 45, e.sign)
    ];
    var corr = pairFmt(corrP);
    return mcq("Solve \\(" + rd + " \\theta = " + e.a + "\\) for \\(0^\\circ \\le \\theta < 360^\\circ\\).",
      corr, distPairs(corrP, candPs),
      "The reference angle is " + e.ref + "°, since \\(" + rd + " " + e.ref + "^\\circ = " + (e.a === "0" ? "0" : e.a.replace("-", "")) + "\\). The ratio \\(" + rd + "\\) is " + (e.sign > 0 ? "positive" : "negative") + " in the quadrants that give the solutions \\(\\theta = " + corrP[0] + "^\\circ\\) and \\(\\theta = " + corrP[1] + "^\\circ\\). The solutions are <b>" + corr + "</b>.",
      { mode: "exact", ratio: e.ratio, ref: e.ref, sign: e.sign });
  }
  var ratio = pick(["sin", "cos"]);
  var rd2 = "\\" + ratio;
  var av = ri(15, 95) / 100, sign = pick([1, -1]);
  var ref = Math.round((ratio === "sin" ? Math.asin(av) : Math.acos(av)) * 180 / Math.PI);
  var corrP2 = pairFor(ratio, ref, sign);
  var candPs2 = [
    pairFor(ratio, ref, -sign),
    pairFor(ratio, 90 - ref, sign),
    pairFor(ratio === "sin" ? "cos" : "sin", ref, sign),
    pairFor(ratio, Math.max(5, ref - 15), sign),
    pairFor(ratio, Math.min(85, ref + 15), sign)
  ];
  var corr2 = pairFmt(corrP2);
  var aStr = (sign < 0 ? "-" : "") + fmt(av);
  return mcq("Solve \\(" + rd2 + " \\theta = " + aStr + "\\) for \\(0^\\circ \\le \\theta < 360^\\circ\\), to the nearest degree.",
    corr2, distPairs(corrP2, candPs2),
    "The reference angle is \\(" + rd2 + "^{-1}(" + fmt(av) + ") \\approx " + ref + "^\\circ\\). The ratio \\(" + rd2 + "\\) is " + (sign > 0 ? "positive" : "negative") + " in the quadrants that give the solutions \\(\\theta = " + corrP2[0] + "^\\circ\\) and \\(\\theta = " + corrP2[1] + "^\\circ\\). The solutions are <b>" + corr2 + "</b>.",
    { mode: "dec", ratio: ratio, a: aStr });
});
E("u6-pk-point-ratios",6,["1.12"], 2, "gen", function () {
  var bases = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]];
  var bs = pick(bases);
  var lx = bs[0], ly = bs[1], r = bs[2];
  if (Math.random() < 0.5) { var t = lx; lx = ly; ly = t; }
  var x = lx * pick([1, -1]), y = ly * pick([1, -1]);
  var kind = pick(["sin", "cos", "tan"]);
  var kd = "\\" + kind;
  var num = kind === "sin" ? y : kind === "cos" ? x : y;
  var den = kind === "sin" ? r : kind === "cos" ? r : x;
  var corr = "\\(" + u1fr(num, den) + "\\)";
  var candBodies = [u1fr(x, r), u1fr(y, r), u1fr(y, x), u1fr(x, y), u1fr(-y, r), u1fr(-x, r), u1fr(-y, x), u1fr(r, y), u1fr(r, x)];
  var dis = u1dist3(u1fr(num, den), candBodies).map(function (s) { return "\\(" + s + "\\)"; });
  var defn = kind === "sin" ? "\\sin\\theta = \\frac{y}{r}" : kind === "cos" ? "\\cos\\theta = \\frac{x}{r}" : "\\tan\\theta = \\frac{y}{x}";
  return mcq("The point P(" + x + ", " + y + ") lies on the terminal arm of an angle \\(\\theta\\) in standard position. What is the exact value of \\(" + kd + " \\theta\\)?",
    corr, dis,
    "First find the distance from the origin: \\(r = \\sqrt{(" + x + ")^2 + (" + y + ")^2} = " + r + "\\). Using \\(" + defn + "\\): \\[ \\begin{aligned} \\" + kd + " \\theta &= " + corr.slice(2, -2) + " \\end{aligned} \\] The exact value is <b>" + corr + "</b>.",
    { x: x, y: y, kind: kind });
});
E("u6-pk-reflection-points",6,["1.12"], 3, "gen", function () {
  if (Math.random() < 0.5) {
    var x = ri(2, 9), y = ri(2, 9);
    var target = pick([2, 3, 4]);
    var pts = { 2: "(" + (-x) + ", " + y + ")", 3: "(" + (-x) + ", " + (-y) + ")", 4: "(" + x + ", " + (-y) + ")" };
    var corr = pts[target];
    var others = ["(" + (-x) + ", " + y + ")", "(" + (-x) + ", " + (-y) + ")", "(" + x + ", " + (-y) + ")", "(" + y + ", " + x + ")"];
    var dis = others.filter(function (s) { return s !== corr; });
    var how = target === 2 ? "Quadrant II has the opposite x-sign from Quadrant I, with y unchanged" : target === 3 ? "Quadrant III has both signs opposite to Quadrant I" : "Quadrant IV has the opposite y-sign from Quadrant I, with x unchanged";
    return mcq("The point P(" + x + ", " + y + ") lies on the terminal arm of an angle in standard position. Which point lies on the terminal arm of the angle in Quadrant " + ["I", "II", "III", "IV"][target - 1] + " that has the same reference angle?",
      corr, dis,
      "Angles with the same reference angle have terminal arms that are reflections of one another, so their points have the same coordinate magnitudes with signs set by the quadrant. " + how + ". The point is <b>" + corr + "</b>.",
      { mode: "points", x: x, y: y, target: target });
  }
  var pats = [
    { prompt: "Which statement about the sine ratio on the interval from 0° to 360° is true?",
      correct: "As \\(\\theta\\) increases from \\(0^\\circ\\) to \\(90^\\circ\\), \\(\\sin\\theta\\) increases from 0 to 1",
      dis: ["As \\(\\theta\\) increases from \\(0^\\circ\\) to \\(90^\\circ\\), \\(\\sin\\theta\\) decreases from 1 to 0",
            "As \\(\\theta\\) increases from \\(90^\\circ\\) to \\(180^\\circ\\), \\(\\sin\\theta\\) increases from 1 to 2",
            "As \\(\\theta\\) increases from \\(180^\\circ\\) to \\(270^\\circ\\), \\(\\sin\\theta\\) increases from 0 to 1"],
      sol: "In Quadrant I, the y-coordinate on the terminal arm grows from 0 to its maximum, so \\(\\sin\\theta\\) increases from 0 to 1. It then falls back through Quadrant II, and it is negative through Quadrants III and IV." },
    { prompt: "Which statement about ratio signs is true?",
      correct: "\\(\\sin\\theta\\) is negative for every angle in Quadrant III",
      dis: ["\\(\\sin\\theta\\) is positive for every angle in Quadrant III",
            "\\(\\tan\\theta\\) is negative for every angle in Quadrant III",
            "\\(\\cos\\theta\\) is positive for every angle in Quadrant III"],
      sol: "In Quadrant III both coordinates on the terminal arm are negative, so sine and cosine are negative while tangent, a ratio of the two, is positive." },
    { prompt: "Which statement about ratio values at axis angles is true?",
      correct: "\\(\\cos\\theta = 0\\) when \\(\\theta = 90^\\circ\\) or \\(\\theta = 270^\\circ\\)",
      dis: ["\\(\\sin\\theta = 0\\) when \\(\\theta = 90^\\circ\\) or \\(\\theta = 270^\\circ\\)",
            "\\(\\cos\\theta = 0\\) when \\(\\theta = 0^\\circ\\) or \\(\\theta = 180^\\circ\\)",
            "\\(\\tan\\theta = 0\\) when \\(\\theta = 90^\\circ\\) or \\(\\theta = 270^\\circ\\)"],
      sol: "At 90° and 270° the terminal arm is vertical, so the x-coordinate is 0 and \\(\\cos\\theta = \\frac{x}{r} = 0\\). At those angles sine is 1 or -1 and tangent is undefined." },
    { prompt: "Which statement about the tangent ratio is true?",
      correct: "The values of \\(\\tan\\theta\\) are positive in Quadrants I and III",
      dis: ["The values of \\(\\tan\\theta\\) are positive in Quadrants I and II",
            "The values of \\(\\tan\\theta\\) are negative in Quadrants I and III",
            "The values of \\(\\tan\\theta\\) are positive in Quadrants II and IV"],
      sol: "Tangent is \\(\\frac{y}{x}\\), which is positive exactly when x and y have the same sign. That happens in Quadrant I (both positive) and Quadrant III (both negative)." },
    { prompt: "Which statement about the cosine ratio on the interval from 0° to 360° is true?",
      correct: "As \\(\\theta\\) increases from \\(180^\\circ\\) to \\(270^\\circ\\), \\(\\cos\\theta\\) increases from \\(-1\\) to 0",
      dis: ["As \\(\\theta\\) increases from \\(180^\\circ\\) to \\(270^\\circ\\), \\(\\cos\\theta\\) decreases from \\(-1\\) to 0",
            "As \\(\\theta\\) increases from \\(180^\\circ\\) to \\(270^\\circ\\), \\(\\sin\\theta\\) increases from 0 to \\(-1\\)",
            "As \\(\\theta\\) increases from \\(180^\\circ\\) to \\(270^\\circ\\), \\(\\cos\\theta\\) decreases from 0 to \\(-1\\)"],
      sol: "At 180° the terminal arm points along the negative x-axis, so \\(\\cos\\theta = -1\\). Turning toward 270° brings the x-coordinate back up to 0, so cosine increases from -1 to 0." }
  ];
  var p = pick(pats);
  return mcq(p.prompt, p.correct, p.dis, p.sol + " The true statement is <b>" + p.correct + "</b>.", { mode: "pattern" });
});
E("u7-pk-product-law",7,["3.41"], 1, "gen", function () {
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
E("u7-pk-two-laws",7,["3.41"], 1, "gen", function () {
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
E("u7-pk-evaluate-exp",7,["3.41"],1,"gen",function(){
  var mode=ri(1,4);
  if(mode===1){
    var n=pick([2,3,4]),r,m,t=0;
    if(n===2)r=ri(2,14);else if(n===3)r=ri(2,7);else r=ri(2,4);
    m=ri(1,4);while(u2gcd(m,n)!==1&&t<60){m=ri(1,4);t++;}
    var b=Math.pow(r,n),ans=Math.pow(r,m);
    return numq("Evaluate \\("+b+"^{"+FR(m,n)+"}\\).",
      ans,0.001,
      "The denominator names the root and the numerator names the power: \\["+
      "\\begin{aligned} "+b+"^{"+FR(m,n)+"} &= \\left("+u2radS(n,b)+"\\right)^"+m+" \\\\ &= "+r+"^"+m+" \\\\ &= "+ans+" \\end{aligned} \\]"+
      " The value is <b>\\("+ans+"\\)</b>.",
      {mode:mode,b:b,m:m,n:n,r:r,ans:ans});
  }
  if(mode===2){
    var fam=pick([2,5]),n2,m2,r2;
    if(fam===2){n2=pick([3,4,5]);r2=2;}else{n2=pick([2,3]);r2=5;}
    m2=ri(1,3);var tg2=0;while(u2gcd(m2,n2)!==1&&tg2<60){m2=ri(1,3);tg2++;}
    var b2=Math.pow(r2,n2),den=Math.pow(r2,m2),ans2=Math.round((1/den)*1e10)/1e10;
    return numq("Evaluate \\("+b2+"^{-"+FR(m2,n2)+"}\\). Give the exact decimal value.",
      ans2,0.001,
      "Take the root first, then the power, then the reciprocal for the negative exponent: \\["+
      "\\begin{aligned} "+b2+"^{-"+FR(m2,n2)+"} &= "+FR(1,b2+"^{"+FR(m2,n2)+" }")+" \\\\ &= "+FR(1,den+"")+" \\\\ &= "+ans2+" \\end{aligned} \\]"+
      " The value is <b>\\("+ans2+"\\)</b>.",
      {mode:mode,b:b2,m:m2,n:n2,r:r2,ans:ans2});
  }
  if(mode===3){
    var nA=pick([2,3]),rA=nA===2?ri(2,10):ri(2,5),mA=ri(1,3),tgA=0;
    while(u2gcd(mA,nA)!==1&&tgA<60){mA=ri(1,3);tgA++;}
    var bA=Math.pow(rA,nA),vA=Math.pow(rA,mA);
    var nB=pick([2,3]),rB=nB===2?ri(2,10):ri(2,5),mB=ri(1,3),tgB=0;
    while(u2gcd(mB,nB)!==1&&tgB<60){mB=ri(1,3);tgB++;}
    var bB=Math.pow(rB,nB),vB=Math.pow(rB,mB),t3=0;
    while(bB===bA&&t3<50){rB=nB===2?ri(2,10):ri(2,5);bB=Math.pow(rB,nB);vB=Math.pow(rB,mB);t3++;}
    var ans3=vA+vB;
    return numq("Evaluate \\("+bA+"^{"+FR(mA,nA)+"} + "+bB+"^{"+FR(mB,nB)+"}\\).",
      ans3,0.001,
      "Evaluate each power separately, root first and then the power: \\["+
      "\\begin{aligned} "+bA+"^{"+FR(mA,nA)+"} &= "+vA+" \\\\ "+bB+"^{"+FR(mB,nB)+"} &= "+vB+" \\\\ "+vA+" + "+vB+" &= "+ans3+" \\end{aligned} \\]"+
      " The value is <b>\\("+ans3+"\\)</b>.",
      {mode:mode,bA:bA,mA:mA,nA:nA,bB:bB,mB:mB,nB:nB,ans:ans3});
  }
  var a4=ri(2,6),p4=ri(1,3),q4=p4+ri(1,4),ans4=Math.pow(a4,q4-p4);
  return numq("Evaluate \\("+a4+"^{-"+p4+"} \\times "+a4+"^{"+q4+"}\\).",
    ans4,0.001,
    "The bases are the same, so add the exponents (the negative exponent subtracts): \\["+
    "\\begin{aligned} "+a4+"^{-"+p4+"} \\times "+a4+"^{"+q4+"} &= "+a4+"^{"+(q4-p4)+"} \\\\ &= "+ans4+" \\end{aligned} \\]"+
    " The value is <b>\\("+ans4+"\\)</b>.",
    {mode:mode,a:a4,p:p4,q:q4,ans:ans4});
});
E("u8-pk-area-triangle",8,["4.1"], 1, "gen", function(){
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
E("u8-pk-area-parallelogram",8,["4.1"], 2, "gen", function(){
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
E("u8-pk-sa-rect-prism",8,["4.1"], 2, "gen", function(){
  var l=ri(3,14), w=ri(3,12), h=ri(2,10);
  var sa=2*(l*w+l*h+w*h);
  var q=numq("Find the surface area of the right rectangular prism shown, in square centimetres.", sa, 0.01,
    "Work face by face. The front and back are "+l+" by "+h+", area "+fmt(l*h)+" each; the sides are "+w+" by "+h+", area "+fmt(w*h)+" each; and the top and bottom are "+l+" by "+w+", area "+fmt(l*w)+" each. Double each face area for its matching pair and add: \\[ \\begin{aligned} SA &= 2("+fmt(l*w)+") + 2("+fmt(l*h)+") + 2("+fmt(w*h)+") \\\\ &= "+sa+" \\end{aligned} \\] The surface area is <b>"+sa+" cm\\(^{2}\\)</b>.",
    {mode:"rect-sa", l:l, w:w, h:h});
  q.figure=u4boxSVG(l,w,h);
  return q;
}, ["Picture the net: three different faces, each with a matching partner.", "Find the area of the top, the front and one side, add them, then double."]);
E("u8-pk-multiply-monomial",8,["4.1"], 1, "gen", function(){
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
var PKFOR3208__C1=["1.1","1.2","1.3","1.4","1.5","1.6","1.7"];
var PKFOR3208__C2=["1.8","1.9","1.10"];
var PKFOR3208__C3=["1.11","1.12","1.13","1.14","1.15"];
var PKFOR3208__C4=["2.1","2.2","2.3","2.4","2.5","2.6","2.7","2.8","2.9","2.10","2.11","2.12","2.13","2.14","2.15","2.16","2.17","2.18","2.19","2.20","2.21"];
var PKFOR3208__C5=["3.1","3.2","3.3","3.4","3.5","3.6","3.7","3.8","3.9","3.10","3.11","3.12","3.13","3.14","3.15","3.16","3.17","3.18","3.19","3.20"];
var PKFOR3208__C6=["3.21","3.22","3.23","3.24","3.25","3.26","3.27","3.28","3.29","3.30","3.31","3.32","3.33","3.34"];
var PKFOR3208__C7=["3.35","3.36","3.37","3.38","3.39","3.40","3.41","3.42","3.43","3.44","3.45","3.46","3.47","3.48"];
var PKFOR3208__C8=["4.1","4.2","4.3","4.4","4.5","4.6","4.7","4.8","4.9","4.10","4.11","4.12"];
var PKT3208={
  "u1-pk-simplify-basic":{src:"Mathematics 2200 indicator 3.5",group:"rational-expressions",for:PKFOR3208__C1},
  "u1-pk-npv-basic":{src:"Mathematics 2200 indicator 3.1",group:"undefined-values",for:PKFOR3208__C1},
  "u1-pk-defined-values":{src:"Mathematics 2200 indicator 1.12",group:"definedness",for:PKFOR3208__C1},
  "u1-pk-eval-function":{src:"Mathematics 1201 indicator 4.47",group:"function-notation",for:PKFOR3208__C1},
  "u1-pk-solve-input":{src:"Mathematics 1201 indicator 4.48",group:"function-notation",for:PKFOR3208__C1},
  "u2-repeating-decimal":{src:"Mathematics 2200 indicator 4.71 (seed entry, flagged in this bank on the November 13, 2026 audit; metadata completed by this tranche)",group:"sequences",for:PKFOR3208__C4},
  "u2-pk-simplify-trinomial":{src:"Mathematics 2200 indicator 3.5",group:"rational-expressions",for:PKFOR3208__C4},
  "u2-pk-geo-ratio":{src:"Mathematics 2200 indicator 4.63",group:"sequences",for:PKFOR3208__C4},
  "u2-pk-converge-check":{src:"Mathematics 2200 indicator 4.70",group:"sequences",for:PKFOR3208__C4},
  "u2-pk-infinite-sum":{src:"Mathematics 2200 indicator 4.70",group:"sequences",for:PKFOR3208__C4},
  "u3-pk-npv-quadratic":{src:"Mathematics 2200 indicator 3.2",group:"undefined-values",for:PKFOR3208__C2},
  "u3-pk-lcd":{src:"Mathematics 2200 indicator 3.10",group:"rational-expressions",for:PKFOR3208__C2},
  "u3-pk-recip-features":{src:"Mathematics 2200 indicator 4.33",group:"domain-range",for:PKFOR3208__C2},
  "u3-pk-solve-linear":{src:"Mathematics 2200 indicator 3.18",group:"equation-solving",for:PKFOR3208__C2},
  "u3-pk-solve-extraneous":{src:"Mathematics 2200 indicator 3.19",group:"equation-solving",for:PKFOR3208__C2},
  "u4-pk-slope-rise-run":{src:"Mathematics 1201 indicator 4.18",group:"slope",for:PKFOR3208__C5},
  "u4-pk-rate-of-change":{src:"Mathematics 1201 indicator 4.19",group:"rate-of-change",for:PKFOR3208__C5},
  "u4-pk-eq-slope-point":{src:"Mathematics 1201 indicator 4.42",group:"graph-forms",for:PKFOR3208__C5},
  "u4-pk-eq-two-points":{src:"Mathematics 1201 indicator 4.43",group:"graph-forms",for:PKFOR3208__C5},
  "u4-pk-factor-common":{src:"Mathematics 2200 indicator 3.14",group:"factoring",for:PKFOR3208__C5},
  "u5-pk-characteristics":{src:"Mathematics 2200 indicator 4.41",group:"graph-reading",for:PKFOR3208__C6},
  "u5-pk-sa-rect-prism":{src:"Mathematics 1201 indicator 5.2",group:"measurement",for:PKFOR3208__C6},
  "u5-pk-vol-cylinder":{src:"Mathematics 1201 indicator 5.8",group:"measurement",for:PKFOR3208__C6},
  "u5-pk-similar-context":{src:"Mathematics 9 indicator 10.15",group:"similarity",for:PKFOR3208__C6},
  "u5-pk-indirect-measure":{src:"Mathematics 9 indicator 10.19",group:"similarity",for:PKFOR3208__C6},
  "u6-pk-exact-values":{src:"Mathematics 2200 indicator 7.20",group:"trig-ratios",for:PKFOR3208__C3},
  "u6-pk-solve-equation":{src:"Mathematics 2200 indicator 7.19",group:"trig-ratios",for:PKFOR3208__C3},
  "u6-pk-point-ratios":{src:"Mathematics 2200 indicator 7.15",group:"trig-ratios",for:PKFOR3208__C3},
  "u6-pk-reflection-points":{src:"Mathematics 2200 indicator 7.21",group:"trig-ratios",for:PKFOR3208__C7},
  "u7-pk-product-law":{src:"Mathematics 1201 indicator 1.6",group:"exponent-laws",for:PKFOR3208__C7},
  "u7-pk-two-laws":{src:"Mathematics 1201 indicator 1.6",group:"exponent-laws",for:PKFOR3208__C7},
  "u7-pk-evaluate-exp":{src:"Mathematics 1201 indicator 1.6",group:"exponent-laws",for:PKFOR3208__C7},
  "u8-pk-area-triangle":{src:"Mathematics 8, area of triangles (Mathematics 6 outcome MA6.9.10)",group:"area",for:PKFOR3208__C8},
  "u8-pk-area-parallelogram":{src:"Mathematics 8, area of parallelograms (Mathematics 6 outcome MA6.9.10)",group:"area",for:PKFOR3208__C8},
  "u8-pk-sa-rect-prism":{src:"Mathematics 9 indicator surface area from a net",group:"measurement",for:PKFOR3208__C8},
  "u8-pk-multiply-monomial":{src:"Mathematics 9 indicator 8.8",group:"polynomial-operations",for:PKFOR3208__C8}
};
BANK.forEach(function(e){var t=PKT3208[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=t.for.slice();e.pkGroup=t.group;if(t.bridge)e.pkBridge=true;}});
