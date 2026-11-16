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
