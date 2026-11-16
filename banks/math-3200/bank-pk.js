/* Math 3200 PK tranche (November 16, 2026). Prior knowledge check entries
   for all nine units, per Math-3200-PK-Tranche-Spec-2026-11-16.md. Borrowed
   generators are verbatim copies from the Mathematics 2200 and Mathematics
   1201 banks (only the entry id, unit, host indicator tag and tranche
   metadata differ); the four Unit 9 counting entries are authored bridge
   items under Section 7 of the rollout plan, grounded in Grade 7 and 8
   probability work on systematic listing and tree diagrams, with solutions
   written from pre-teaching resources only. The feeder helper functions
   the borrowed generators call, and that neither the shell nor this bank
   defines, are ported verbatim below. No CRMARKS lines are carried over:
   borrowed entries bring no CR marks into this bank, on the Math 9 tranche
   convention. */
function u3Gcd(a,b){ a=Math.abs(a); b=Math.abs(b); while(b){ var t=a%b; a=b; b=t; } return a||1; }
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
function u3TwoFac(s1,s2){ /* two factor strings concatenated in a fixed (alphabetical) order */
  return s1<=s2 ? s1+s2 : s2+s1;
}
function u3FacS(r){ /* factor (x - r) as a string, for a root r */
  if(r===0) return "x";
  return r>0?"(x - "+r+")":"(x + "+(-r)+")";
}
function u3QuadS(a,b,c){ return u3PolyS([a,b,c]); }
function u3FacLinS(p,q){ /* factor (px + q) as a string, p >= 1 */
  if(q===0) return p===1?"x":"("+p+"x)";
  var lead=(p===1?"x":p+"x");
  return "("+lead+(q>0?" + "+q:" - "+(-q))+")";
}
function u3BinS(r){ /* binomial text for a root r: x - r, x + |r|, or x */
  if(r===0) return "x";
  return r>0?"x - "+r:"x + "+(-r);
}
function u3InnerS(coef,v,k){ /* inner linear expression: coef*v + k, coef >= 1 */
  var s=(coef===1?v:coef+v);
  if(k>0) s+=" + "+k; else if(k<0) s+=" - "+(-k);
  return s;
}
function u3PairNum(a,b){ /* solution-set option for two integer roots, ascending */
  var lo=Math.min(a,b), hi=Math.max(a,b);
  return "\\(x = "+lo+" \\text{ or } x = "+hi+"\\)";
}
function u3SignCands(r1,r2){ /* distractor solution-set options for integer roots r1, r2 */
  return [ u3PairNum(-r1,-r2), u3PairNum(-r1,r2), u3PairNum(r1,-r2),
           u3PairNum(r1+r2, r1*r2), u3PairNum(r1-1, r2), u3PairNum(r1, r2+1),
           u3PairNum(r1+1, r2), u3PairNum(r1, r2-1), u3PairNum(r2-r1, r1+r2),
           u3PairNum(r1-1, r2+1), u3PairNum(r1-2, r2), u3PairNum(r1, r2+2) ];
}
function u2VS(a,p,q){ /* vertex form a(x - p)^2 + q as a string */
  var s=(a===1?"":a===-1?"-":""+a);
  if(p===0) s+="x^2";
  else s+="(x"+(p>0?" - "+p:" + "+(-p))+")^2";
  if(q>0) s+=" + "+q; else if(q<0) s+=" - "+(-q);
  return s;
}
function u2Pair(x,y){ return "\\(("+x+", "+y+")\\)"; }
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
function u2Std(a,b,c){ /* ax^2 + bx + c as a string */
  var s=(a===1?"x^2":a===-1?"-x^2":a+"x^2");
  if(b!==0) s+=(b>0?" + ":" - ")+(Math.abs(b)===1?"x":Math.abs(b)+"x");
  if(c!==0) s+=(c>0?" + ":" - ")+Math.abs(c);
  return s;
}
function u2JoinSigned(nums){ var out=""; nums.forEach(function(v,i){ if(i===0) out=""+v; else out+=(v<0?" - "+(-v):" + "+v); }); return out; }
function u2QuadB(B){ /* x^2 + Bx as a string, B nonzero */
  return "x^2"+(B>0?" + ":" - ")+(Math.abs(B)===1?"x":Math.abs(B)+"x");
}
function u5frac(n,d){return "\\frac{"+n+"}{"+d+"}";}
function u5wrap(s){return "\\("+s+"\\)";}
function u5dis(correct,cands,n){var out=[],seen={};seen[String(correct)]=1;for(var i=0;i<cands.length&&out.length<n;i++){var s=String(cands[i]);if(!seen[s]){seen[s]=1;out.push(s);}}return out;}
function u5lin(a,b){if(a===0)return ""+b;var s=(a===1?"x":(a===-1?"-x":a+"x"));if(b>0)s+=" + "+b;else if(b<0)s+=" - "+(-b);return s;}
function u5twoRoots(){var r1=pick(U5NZ),r2=pick(U5NZ),t=0;while(r2===r1&&t<60){r2=pick(U5NZ);t++;}return [r1,r2];}
function u5npvStr(vals){var v=vals.slice().sort(function(x,y){return x-y;});return v.map(function(z){return "x \\ne "+z;}).join(", ");}
function u5par(a,b){return "("+u5lin(a,b)+")";}
var U5NZ=[-6,-5,-4,-3,-2,-1,1,2,3,4,5,6];
function u5quad(a,b,c){var s=(a===1?"x^2":(a===-1?"-x^2":a+"x^2"));if(b>0)s+=" + "+(b===1?"x":b+"x");else if(b<0)s+=" - "+(b===-1?"x":(-b)+"x");if(c>0)s+=" + "+c;else if(c<0)s+=" - "+(-c);return s;}
function u4sgn(n){return n>0?" + "+n:(n<0?" - "+(-n):"");}
function u4dis(correct,cands,n){
  var out=[],seen={};seen[String(correct)]=1;
  for(var i=0;i<cands.length&&out.length<n;i++){var s=String(cands[i]);if(!seen[s]){seen[s]=1;out.push(s);}}
  return out;
}
function n5lin(a, b) { var s; if (a === 1) s = "x"; else if (a === -1) s = "-x"; else s = fmt(a) + "x"; if (b > 0) s += "+" + fmt(b); else if (b < 0) s += "-" + fmt(-b); return s; }
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
function u1refOf(deg) { var p = ((deg % 360) + 360) % 360; return p <= 90 ? p : p <= 180 ? 180 - p : p <= 270 ? p - 180 : 360 - p; }
function u1armSVG(deg) { /* axes, unit circle, rotation arc and terminal arm for a standard-position angle */
  var th = deg * Math.PI / 180, cx = 88, cy = 88, R = 64;
  var ex = cx + R * Math.cos(th), ey = cy - R * Math.sin(th);
  var large = Math.abs(deg) > 180 ? 1 : 0, sweep = deg >= 0 ? 0 : 1;
  var ax = cx + 38 * Math.cos(th), ay = cy - 38 * Math.sin(th);
  var out = '<svg viewBox="0 0 176 176" width="176" height="176" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Angle in standard position">';
  out += '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="none" stroke="' + FIG_INK + '" stroke-width="1.3"/>';
  out += '<line x1="' + (cx - R - 12) + '" y1="' + cy + '" x2="' + (cx + R + 12) + '" y2="' + cy + '" stroke="' + FIG_INK + '" stroke-width="1"/>';
  out += '<line x1="' + cx + '" y1="' + (cy - R - 12) + '" x2="' + cx + '" y2="' + (cy + R + 12) + '" stroke="' + FIG_INK + '" stroke-width="1"/>';
  out += '<path d="M ' + (cx + 38) + ' ' + cy + ' A 38 38 0 ' + large + ' ' + sweep + ' ' + fmt(ax, 1) + ' ' + fmt(ay, 1) + '" fill="none" stroke="' + FIG_ACC + '" stroke-width="2"/>';
  out += '<line x1="' + cx + '" y1="' + cy + '" x2="' + fmt(ex, 1) + '" y2="' + fmt(ey, 1) + '" stroke="' + FIG_INK + '" stroke-width="2.2"/>';
  out += '<circle cx="' + fmt(ex, 1) + '" cy="' + fmt(ey, 1) + '" r="3.2" fill="' + FIG_ALT + '"/>';
  return out + '</svg>';
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
function u1exact(kind, deg) { /* {s, v}: exact string and value of sin/cos/tan at a special degree, or null */
  var th = deg * Math.PI / 180, sv = Math.sin(th), cv = Math.cos(th), v;
  if (kind === "sin") v = sv;
  else if (kind === "cos") v = cv;
  else { if (Math.abs(cv) < 1e-9) return null; v = sv / cv; }
  var mag = u1mag(kind, Math.abs(v));
  if (mag === null) return null;
  return { s: (v < 0 && mag !== "0" ? "-" : "") + mag, v: v };
}
function u1mag(kind, av) { /* exact magnitude string for a special-angle ratio value */
  var table;
  if (kind === "sin" || kind === "cos") table = [[0, "0"], [0.5, "\\frac{1}{2}"], [0.7071, "\\frac{\\sqrt{2}}{2}"], [0.866, "\\frac{\\sqrt{3}}{2}"], [1, "1"]];
  else table = [[0, "0"], [0.5774, "\\frac{\\sqrt{3}}{3}"], [1, "1"], [1.7321, "\\sqrt{3}"]];
  for (var i = 0; i < table.length; i++) if (Math.abs(av - table[i][0]) < 0.01) return table[i][1];
  return null;
}
function u2EffectPanels(items){ /* parPanelsSVG panels for y = v x^2 items, at a common scale */
  function plain(d){ return d.replace(/\\frac\{(\d+)\}\{(\d+)\}/,"$1/$2"); }
  var maxAbs=1; items.forEach(function(it){ if(Math.abs(it.v)>maxAbs) maxAbs=Math.abs(it.v); });
  var yAbs=4*maxAbs, anyNeg=items.some(function(it){ return it.v<0; });
  var yr=anyNeg?[-yAbs*1.06, yAbs*1.06]:[-yAbs*0.16, yAbs*1.06];
  return parPanelsSVG(items.map(function(it){
    return {a:it.v, b:0, c:0, caption:(it.d===""?"y = x\u00B2":"y = "+plain(it.d)+"x\u00B2"), xrange:[-2,2], yrange:yr};
  }));
}
function parPanelsSVG(panels){
  var n=panels.length,pw=150,gap=10,W=n*pw+(n-1)*gap,ph=148,H=ph+22;
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parabolas compared side by side">';
  panels.forEach(function(p,idx){
    var ox=idx*(pw+gap),x0=p.xrange[0],x1=p.xrange[1],y0=p.yrange[0],y1=p.yrange[1];
    var mL=8,mR=8,mT=8,iw=pw-mL-mR,ih=ph-mT-8;
    function X(x){return ox+mL+(x-x0)/(x1-x0)*iw;}
    function Y(y){return mT+(y1-y)/(y1-y0)*ih;}
    out+='<rect x="'+ox+'" y="0" width="'+pw+'" height="'+ph+'" fill="none" stroke="#c9d4cd"/>';
    if(y0<0&&y1>0)out+='<line x1="'+ox+'" y1="'+fmt(Y(0),1)+'" x2="'+(ox+pw)+'" y2="'+fmt(Y(0),1)+'" stroke="#9db3a6" stroke-width="1.2"/>';
    if(x0<0&&x1>0)out+='<line x1="'+fmt(X(0),1)+'" y1="0" x2="'+fmt(X(0),1)+'" y2="'+ph+'" stroke="#9db3a6" stroke-width="1.2"/>';
    var d="",pen=false,i,x,y;
    for(i=0;i<=60;i++){
      x=x0+(x1-x0)*i/60;y=p.a*x*x+p.b*x+p.c;
      if(y<y0||y>y1){pen=false;continue;}
      d+=(pen?"L":"M")+fmt(X(x),1)+" "+fmt(Y(y),1);pen=true;
    }
    out+='<path d="'+d+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    out+=_txt(ox+pw/2,ph+13,p.caption,11,true);
  });
  return out+'</svg>';
}
function u5gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t;}return a||1;}
function u5cp(c,e){if(e===0)return ""+c;var p=u5pow(e);return c===1?p:c+p;}
function u5pow(e){return e===0?"":(e===1?"x":"x^{"+e+"}");}
function u5fac(r,p){var s=u5par(1,-r);return p===1?s:s+"^"+p;}
function u5fr(n,d){if(d<0){n=-n;d=-d;}if(n===0)return "0";var g=u5gcd(n,d);n/=g;d/=g;var s=n<0?"-":"";n=Math.abs(n);if(d===1)return s+n;return s+"\\frac{"+n+"}{"+d+"}";}
function u5monoVal(cn,cd,e){ /* body for (cn/cd) * x^e, cn,cd positive and reduced, e any sign */
  var top,bot;
  if(e>=0){top=u5cp(cn,e);bot=(cd===1?"":""+cd);}
  else{top=""+cn;bot=(cd===1?"":cd)+u5pow(-e);}
  if(bot==="")return top;
  return "\\frac{"+top+"}{"+bot+"}";
}
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
function u3Nz(a, b) { var n = 0; while (n === 0) n = ri(a, b); return n; }
function u3Conv(A, B) {
  var out = [], i;
  for (i = 0; i < A.length + B.length - 1; i++) out.push(0);
  A.forEach(function (a, j) { B.forEach(function (b, k) { out[j + k] += a * b; }); });
  return out;
}
function u3PC(coeffs, v) { return u3Str(u3TermsOf(coeffs, v)); }
function u3Mul(P, Q) {
  var out = [];
  P.forEach(function (p) { Q.forEach(function (q) { out.push([p[0] * q[0], p[1] + q[1], p[2] + q[2]]); }); });
  return out;
}
function u3TermsOf(coeffs, v) {
  return coeffs.map(function (c, i) { var p = coeffs.length - 1 - i; return v === "y" ? [c, 0, p] : [c, p, 0]; });
}
function u3Par(coeffs, v) { return "(" + u3PC(coeffs, v) + ")"; }
function u3Alg(lines) { return "\\[ \\begin{aligned} " + lines.join(" \\\\ ") + " \\end{aligned} \\]"; }
function u3StrSeq(list) {
  var parts = list.filter(function (t) { return t[0] !== 0; });
  if (!parts.length) return "0";
  return parts.map(function (t, i) {
    var b = u3Body(t[0], t[1], t[2]);
    if (i === 0) return (t[0] < 0 ? "-" : "") + b;
    return (t[0] < 0 ? " - " : " + ") + b;
  }).join("");
}
function u3M(raw) { return "\\(" + raw + "\\)"; }
function u3DistrCoeffs(keyCoeffs, v, count) {
  var key = u3PC(keyCoeffs, v), seen = {}, out = [];
  shuffle(u3PerturbCoeffs(keyCoeffs)).forEach(function (c) {
    var s = u3PC(c, v);
    if (s !== key && !seen[s]) { seen[s] = 1; out.push(u3M(s)); }
  });
  var guard = 0;
  while (out.length < count && guard < 60) {
    guard++;
    var c2 = keyCoeffs.slice(), i = ri(1, keyCoeffs.length - 1);
    c2[i] += pick([-3, -2, -1, 1, 2, 3]);
    var s2 = u3PC(c2, v);
    if (s2 !== key && !seen[s2]) { seen[s2] = 1; out.push(u3M(s2)); }
  }
  return out.slice(0, count);
}
function u3Str(list) {
  var map = {}, keys = [];
  list.forEach(function (t) {
    if (t[0] === 0) return;
    var k = t[1] * 100 + t[2];
    if (map[k] === undefined) { map[k] = [0, t[1], t[2]]; keys.push(k); }
    map[k][0] += t[0];
  });
  var terms = keys.map(function (k) { return map[k]; }).filter(function (t) { return t[0] !== 0; });
  terms.sort(function (p, q) { var dp = p[1] + p[2], dq = q[1] + q[2]; if (dp !== dq) return dq - dp; return q[1] - p[1]; });
  if (!terms.length) return "0";
  return terms.map(function (t, i) {
    var b = u3Body(t[0], t[1], t[2]);
    if (i === 0) return (t[0] < 0 ? "-" : "") + b;
    return (t[0] < 0 ? " - " : " + ") + b;
  }).join("");
}
function u3Body(c, ex, ey) {
  var vp = u3VarPart(ex, ey);
  return (vp && Math.abs(c) === 1) ? vp : Math.abs(c) + vp;
}
function u3PerturbCoeffs(coeffs) {
  var out = [], i, c2;
  for (i = 1; i < coeffs.length; i++) {
    if (coeffs[i] !== 0) { c2 = coeffs.slice(); c2[i] = -c2[i]; out.push(c2); }
    c2 = coeffs.slice(); c2[i] += 1; out.push(c2);
    c2 = coeffs.slice(); c2[i] -= 1; out.push(c2);
    c2 = coeffs.slice(); c2[i] += 2; out.push(c2);
    c2 = coeffs.slice(); c2[i] -= 2; out.push(c2);
  }
  c2 = coeffs.slice(); c2[0] += 1; out.push(c2);
  if (coeffs[0] > 1) { c2 = coeffs.slice(); c2[0] -= 1; out.push(c2); }
  if (coeffs.length > 2) { c2 = coeffs.slice(); var t = c2[1]; c2[1] = c2[2]; c2[2] = t; out.push(c2); }
  return out;
}
function u3VarPart(ex, ey) {
  var s = "";
  if (ex > 0) s += "x" + (ex > 1 ? "^" + ex : "");
  if (ey > 0) s += "y" + (ey > 1 ? "^" + ey : "");
  return s;
}
function u3PerturbTerms(terms) {
  var base = [];
  var map = {}, keys = [];
  terms.forEach(function (t) { var k = t[1] * 100 + t[2]; if (map[k] === undefined) { map[k] = [0, t[1], t[2]]; keys.push(k); } map[k][0] += t[0]; });
  keys.forEach(function (k) { if (map[k][0] !== 0) base.push(map[k]); });
  var out = [];
  base.forEach(function (t, i) {
    [function (c) { return -c; }, function (c) { return c + 1; }, function (c) { return c - 1; }, function (c) { return c + 2; }].forEach(function (f) {
      var nt = base.map(function (g) { return g.slice(); });
      nt[i][0] = f(nt[i][0]);
      out.push(u3Str(nt));
    });
    var dropped = base.filter(function (g, j) { return j !== i; });
    if (dropped.length) out.push(u3Str(dropped));
  });
  return out;
}
function u2pickS3(ans,cands){
  var out=[],seen={};seen[ans]=1;
  for(var i=0;i<cands.length&&out.length<3;i++){var c=cands[i];if(typeof c==="string"&&c!==ans&&!seen[c]){seen[c]=1;out.push(c);}}
  return out;
}
function FR(n,d){return "\\frac{"+n+"}{"+d+"}";}
function u2red(n,d){var g=u2gcd(n,d);n/=g;d/=g;if(d<0){n=-n;d=-d;}return [n,d];}
function u2expStr(base,n,d){
  var r=u2red(n,d);
  if(r[0]===0)return "\\(1\\)";
  if(r[1]===1){if(r[0]===1)return "\\("+base+"\\)";return "\\("+base+"^{"+r[0]+"}\\)";}
  return "\\("+base+"^{"+FR(r[0],r[1])+"}\\)";
}
function u2radS(idx,rad){return idx===2?("\\sqrt{"+rad+"}"):("\\sqrt["+idx+"]{"+rad+"}");}
function u3PowDist(a, correctExp, pairs) {
  var out = [], seen = {};
  seen[String(correctExp)] = 1;
  for (var i = 0; i < pairs.length && out.length < 3; i++) {
    var e = pairs[i].v;
    if (!seen[String(e)]) { seen[String(e)] = 1; out.push({ t: "\\(" + a + "^{" + e + "}\\)", fb: pairs[i].fb }); }
  }
  return out;
}
E("u1-pk-factor-common",1,["3.1"],1,"gen",function(){
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
E("u1-pk-factor-trinomial",1,["3.1"],1,"gen",function(){
  var fam=pick(["monic","diffsq"]);
  if(fam==="monic"){
    var r1=ri(-9,9), r2=ri(-9,9), att=0;
    while(att<200 && (r1===0 || r2===0)){ att++; r1=ri(-9,9); r2=ri(-9,9); }
    var b=-(r1+r2), c=r1*r2;
    var key=u3TwoFac(u3FacS(r1), u3FacS(r2));
    function expM(x,y){ return [1, -(x+y), x*y]; }
    var candRoots=[[-r1,r2],[r1,-r2],[-r1,-r2],[r1+1,r2-1],[r1-1,r2+1],[r1+2,r2],[r1,r2+2]];
    var cands=[];
    candRoots.forEach(function(pr){ var e=expM(pr[0],pr[1]);
      if(e[1]!==b || e[2]!==c) cands.push(u3TwoFac(u3FacS(pr[0]), u3FacS(pr[1]))); });
    return mcq("Factor: \\("+u3QuadS(1,b,c)+"\\)",
      "\\("+key+"\\)", u3Opts("\\("+key+"\\)", cands.map(function(s){ return "\\("+s+"\\)"; })),
      "Look for two numbers with product \\("+c+"\\) and sum \\("+b+"\\): the numbers are \\("+(-r1)+"\\) and \\("+(-r2)+"\\), since \\(("+(-r1)+") \\times ("+(-r2)+") = "+c+"\\) and \\(("+(-r1)+") + ("+(-r2)+") = "+b+"\\)."+
      "\\[ "+u3QuadS(1,b,c)+" = "+key+" \\]"+
      "So the factorization is <b>\\("+key+"\\)</b>.",
      {fam:fam});
  }
  /* difference of squares */
  var A=ri(2,9), B=ri(2,9), twoVar=Math.random()<0.5;
  var stemExpr, key3, cands3;
  if(twoVar){
    stemExpr=(A*A)+"x^2 - "+(B*B)+"y^2";
    key3="("+A+"x - "+B+"y)("+A+"x + "+B+"y)";
    cands3=[ "("+A+"x - "+B+"y)("+A+"x - "+B+"y)",
             "("+A+"x + "+B+"y)("+A+"x + "+B+"y)",
             "("+(A*A)+"x - "+(B*B)+"y)("+(A*A)+"x + "+(B*B)+"y)",
             "("+A+"x - "+(B*B)+"y)("+A+"x + "+(B*B)+"y)" ];
  } else {
    stemExpr=(A*A)+"x^2 - "+(B*B);
    key3="("+A+"x - "+B+")("+A+"x + "+B+")";
    cands3=[ "("+A+"x - "+B+")("+A+"x - "+B+")",
             "("+A+"x + "+B+")("+A+"x + "+B+")",
             "("+(A*A)+"x - "+(B*B)+")("+(A*A)+"x + "+(B*B)+")",
             "("+A+"x - "+(B*B)+")("+A+"x + "+(B*B)+")" ];
  }
  return mcq("Factor: \\("+stemExpr+"\\)",
    "\\("+key3+"\\)", u3Opts("\\("+key3+"\\)", cands3.map(function(s3){ return "\\("+s3+"\\)"; })),
    "Each term is a perfect square: \\("+(A*A)+(twoVar?"x^2":"x^2")+" = ("+A+(twoVar?"x":"x")+")^2\\) and \\("+(B*B)+(twoVar?"y^2":"")+" = ("+B+(twoVar?"y":"")+")^2\\). A difference of squares factors as \\(u^2 - v^2 = (u - v)(u + v)\\):"+
    "\\[ "+stemExpr+" = "+key3+" \\]"+
    "So the factorization is <b>\\("+key3+"\\)</b>.",
    {fam:fam});
});
E("u1-pk-factor-nonmonic",1,["3.1"],2,"gen",function(){
  var fam="nonmonic";
    var att2=0, p,q,r,s,a2,b2,c2,key2;
    while(att2<300){
      att2++;
      p=pick([1,2,3]); r=pick([1,2,3]); q=ri(-6,6); s=ri(-6,6);
      if(q===0 || s===0) continue;
      a2=p*r; b2=p*s+q*r; c2=q*s;
      if(a2<2) continue;
      key2=u3TwoFac(u3FacLinS(p,q), u3FacLinS(r,s));
      break;
    }
    function expN(p1,q1,p2,q2){ return [p1*p2, p1*q2+q1*p2, q1*q2]; }
    var specs=[[p,-q,r,s],[p,q,r,-s],[p,-q,r,-s],[p,s,r,q],[r,q,p,s],[p,q+1,r,s],[p,q,r,s+1]];
    var cands2=[];
    specs.forEach(function(sp){ var e=expN(sp[0],sp[1],sp[2],sp[3]);
      if(e[0]!==a2 || e[1]!==b2 || e[2]!==c2)
        cands2.push(u3TwoFac(u3FacLinS(sp[0],sp[1]), u3FacLinS(sp[2],sp[3]))); });
    function xTerm(co){ if(co===0) return ""; var t=(Math.abs(co)===1?"x":Math.abs(co)+"x"); return (co<0?" - ":" + ")+t; }
    function cTerm(co){ if(co===0) return ""; return (co<0?" - "+(-co):" + "+co); }
    var expLine=a2+"x^2"+xTerm(p*s)+xTerm(q*r)+cTerm(q*s);
    return mcq("Factor: \\("+u3QuadS(a2,b2,c2)+"\\)",
      "\\("+key2+"\\)", u3Opts("\\("+key2+"\\)", cands2.map(function(s2){ return "\\("+s2+"\\)"; })),
      "The factor pair "+key2+" can be checked by expanding:"+
      "\\[ \\begin{aligned} "+key2+" &= "+expLine+" \\\\ &= "+u3QuadS(a2,b2,c2)+" \\end{aligned} \\]"+
      "which matches the given trinomial, so the factorization is <b>\\("+key2+"\\)</b>.",
      {fam:fam});
});
E("u1-pk-factor-test",1,["3.1"],1,"gen",function(){
  var isFac=Math.random()<0.5;
  var k=ri(-6,6); if(k===0) k=3;
  var al=pick([1,2,3]), be=ri(-6,6);
  /* base = (x - k)(al x + be); P(k) = r0 */
  var a=al, b=be-al*k, c=-be*k;
  var r0=0;
  if(!isFac){ r0=pick([-5,-4,-3,-2,-1,1,2,3,4,5]); c+=r0; }
  var P=u3QuadS(a,b,c), val=a*k*k+b*k+c;
  var wk1=pick([1,2,3,4,6]), wk2=pick([-6,-4,-3,-2,-1,1,2,3,4,6]);
  if(wk2===val || wk2===0) wk2=val+3;
  var key, cands;
  if(isFac){
    key="Yes, because \\(P("+k+") = 0\\)";
    cands=["No, because \\(P("+k+") = 0\\)",
           "Yes, because \\(P("+k+") = "+wk1+"\\)",
           "No, because \\(P("+k+") = "+wk2+"\\)"];
  } else {
    key="No, because \\(P("+k+") = "+val+"\\)";
    cands=["Yes, because \\(P("+k+") = 0\\)",
           "Yes, because \\(P("+k+") = "+val+"\\)",
           "No, because \\(P("+k+") = "+wk2+"\\)"];
  }
  return mcq("Let \\(P(x) = "+P+"\\). Is \\("+u3BinS(k)+"\\) a factor of \\(P(x)\\)?",
    key, cands,
    "By the factor theorem, \\("+u3BinS(k)+"\\) is a factor of \\(P(x)\\) exactly when \\(P("+k+") = 0\\). Evaluate:"+
    "\\[ \\begin{aligned} P("+k+") &= "+a+"("+k+")^2 "+(b<0?"- "+(-b):"+ "+b)+"("+k+") "+(c<0?"- "+(-c):"+ "+c)+" \\\\ &= "+val+" \\end{aligned} \\]"+
    (isFac ? "Since \\(P("+k+") = 0\\), the remainder on division by \\("+u3BinS(k)+"\\) is zero, so <b>yes</b>, \\("+u3BinS(k)+"\\) is a factor."
           : "Since \\(P("+k+") = "+val+" \\ne 0\\), division by \\("+u3BinS(k)+"\\) leaves a remainder of \\("+val+"\\), so <b>no</b>, \\("+u3BinS(k)+"\\) is not a factor."),
    {k:k, val:val});
});
E("u1-pk-solve-strategies",1,["3.1"],2,"gen",function(){
  var fam=pick(["sqroot","sqroot","factor","formula","cts"]);
  if(fam==="sqroot"){
    var h=ri(-6,6); if(h===0) h=4;
    var radical=Math.random()<0.45, K, s, rp;
    if(radical){ var mm=pick([2,3,5,6,7]); s=pick([1,2]); K=s*s*mm; rp=[s,mm]; }
    else { s=ri(2,7); K=s*s; rp=[s,1]; }
    var inner=u3InnerS(1,"x",-h);
    var eqStr="("+inner+")^2 = "+K;
    function radRoot(sign){ /* h + sign * s*sqrt(mm) as a string */
      var coef=rp[0], mm2=rp[1];
      if(mm2===1) return ""+(h+sign*coef);
      var term=(coef===1?"\\sqrt{"+mm2+"}":coef+"\\sqrt{"+mm2+"}");
      if(h===0) return (sign<0?"-":"")+term;
      return h+(sign<0?" - ":" + ")+term;
    }
    var loS=radRoot(-1), hiS=radRoot(1);
    var key="\\(x = "+loS+" \\text{ or } x = "+hiS+"\\)";
    function radRootH(hh, sign){
      var coef=rp[0], mm2=rp[1];
      if(mm2===1) return ""+(hh+sign*coef);
      var term=(coef===1?"\\sqrt{"+mm2+"}":coef+"\\sqrt{"+mm2+"}");
      if(hh===0) return (sign<0?"-":"")+term;
      return hh+(sign<0?" - ":" + ")+term;
    }
    var cands=[ "\\(x = "+radRootH(-h,-1)+" \\text{ or } x = "+radRootH(-h,1)+"\\)",
                "\\(x = "+radRootH(0,-1)+" \\text{ or } x = "+radRootH(0,1)+"\\)" ];
    if(rp[1]===1) cands.push("\\(x = "+(h-s*s)+" \\text{ or } x = "+(h+s*s)+"\\)");
    else if(rp[0]===1) cands.push("\\(x = "+h+" - 2\\sqrt{"+rp[1]+"} \\text{ or } x = "+h+" + 2\\sqrt{"+rp[1]+"}\\)");
    else cands.push("\\(x = "+h+" - "+(rp[0]*rp[1])+"\\sqrt{"+rp[0]+"} \\text{ or } x = "+h+" + "+(rp[0]*rp[1])+"\\sqrt{"+rp[0]+"}\\)");
    var sqrtK=(rp[1]===1? ""+rp[0] : (rp[0]===1?"\\sqrt{"+rp[1]+"}":rp[0]+"\\sqrt{"+rp[1]+"}"));
    return mcq("Solve: \\("+eqStr+"\\)",
      key, u3Opts(key,cands),
      "Take the square root of both sides, keeping both the positive and negative roots:"+
      "\\[ \\begin{aligned} ("+inner+")^2 &= "+K+" \\\\ "+inner+" &= \\pm "+sqrtK+" \\\\ x &= "+h+" \\pm "+sqrtK+" \\end{aligned} \\]"+
      "So the solutions are <b>\\(x = "+loS+"\\)</b> and <b>\\(x = "+hiS+"\\)</b>.",
      {fam:fam});
  }
  if(fam==="factor" || fam==="formula"){
    var a2=(fam==="factor") ? pick([1,2]) : pick([2,3,4]);
    var r1=ri(-8,8), r2=ri(-8,8), att=0;
    while(att<200 && r1===r2){ att++; r2=ri(-8,8); }
    var b2=-a2*(r1+r2), c2=a2*r1*r2, Q=u3QuadS(a2,b2,c2);
    var key2=u3PairNum(r1,r2);
    var sol;
    if(fam==="factor"){
      sol="Factor the left side and set each factor equal to zero:"+
        "\\[ \\begin{aligned} "+Q+" &= 0 \\\\ "+(a2===1?"":a2)+u3FacS(r1)+u3FacS(r2)+" &= 0 \\end{aligned} \\]"+
        "So \\("+u3BinS(r1)+" = 0\\) or \\("+u3BinS(r2)+" = 0\\), giving <b>\\(x = "+r1+"\\)</b> or <b>\\(x = "+r2+"\\)</b>.";
    } else {
      var D=b2*b2-4*a2*c2, sD=Math.round(Math.sqrt(D));
      sol="Apply the quadratic formula with \\(a = "+a2+"\\), \\(b = "+b2+"\\) and \\(c = "+c2+"\\):"+
        "\\[ \\begin{aligned} x &= \\frac{-("+b2+") \\pm \\sqrt{("+b2+")^2 - 4("+a2+")("+c2+")}}{2("+a2+")} \\\\ &= \\frac{"+(-b2)+" \\pm "+sD+"}{"+(2*a2)+"} \\end{aligned} \\]"+
        "So the solutions are <b>\\(x = "+r1+"\\)</b> and <b>\\(x = "+r2+"\\)</b>.";
    }
    return mcq("Solve: \\("+Q+" = 0\\)",
      key2, u3Opts(key2, u3SignCands(r1,r2)), sol, {fam:fam});
  }
  /* completing the square, presented in the solution */
  var t1=ri(-8,8), t2=ri(-8,8), att3=0;
  while(att3<300){ att3++; t1=ri(-8,8); t2=ri(-8,8);
    if(t1!==t2 && ((t1+t2)%2===0)) break; }
  var B=-(t1+t2), C=t1*t2, m=B/2, s2=Math.abs(t2-t1)/2;
  var key3=u3PairNum(t1,t2);
  return mcq("Solve: \\("+u3QuadS(1,B,C)+" = 0\\)",
    key3, u3Opts(key3, u3SignCands(t1,t2)),
    "Complete the square. Move the constant, then add \\(\\left(\\frac{"+B+"}{2}\\right)^2 = "+(m*m)+"\\) to both sides:"+
    "\\[ \\begin{aligned} x^2 "+(B<0?"- "+(-B):"+ "+B)+"x &= "+(-C)+" \\\\ x^2 "+(B<0?"- "+(-B):"+ "+B)+"x + "+(m*m)+" &= "+(-C)+" + "+(m*m)+" \\\\ (x "+(m<0?"- "+(-m):"+ "+m)+")^2 &= "+(s2*s2)+" \\\\ x "+(m<0?"- "+(-m):"+ "+m)+" &= \\pm "+s2+" \\end{aligned} \\]"+
    "So the solutions are <b>\\(x = "+t1+"\\)</b> and <b>\\(x = "+t2+"\\)</b>.",
    {fam:fam});
});
E("u1-pk-discriminant-k",1,["3.1"],2,"gen",function(){
  var mode=pick(["constK","constK","linK","leadK","givenD"]);
  if(mode==="constK"){
    var pr=pick([[1,4],[1,6],[1,8],[1,10],[1,12],[1,-6],[1,-8],[1,-10],
                 [4,4],[4,8],[4,12],[4,16],[4,-8],[2,4],[2,8],[2,12],[2,-8]]);
    var A=pr[0], B=pr[1], kv=(B*B)/(4*A);
    return numq("The equation \\("+A+"x^2 "+(B<0?"- "+(-B):"+ "+B)+"x + k = 0\\) has exactly one repeated real root. What is the value of \\(k\\)?",
      kv, 0.001,
      "A repeated root occurs exactly when the discriminant is zero:"+
      "\\[ \\begin{aligned} b^2 - 4ac &= 0 \\\\ ("+B+")^2 - 4("+A+")k &= 0 \\\\ "+(B*B)+" &= "+(4*A)+"k \\\\ k &= "+kv+" \\end{aligned} \\]"+
      "So <b>\\(k = "+kv+"\\)</b>.",
      {mode:mode});
  }
  if(mode==="linK"){
    var m=ri(2,9), C=m*m, kv2=2*m;
    return numq("The equation \\(x^2 + kx + "+C+" = 0\\) has two equal real roots. What is the positive value of \\(k\\)?",
      kv2, 0.001,
      "Equal roots require a discriminant of zero:"+
      "\\[ \\begin{aligned} b^2 - 4ac &= 0 \\\\ k^2 - 4(1)("+C+") &= 0 \\\\ k^2 &= "+(4*C)+" \\\\ k &= \\pm "+kv2+" \\end{aligned} \\]"+
      "The positive value is <b>\\(k = "+kv2+"\\)</b>.",
      {mode:mode});
  }
  if(mode==="leadK"){
    var pr2=pick([[2,1],[4,1],[6,1],[4,4],[8,4],[12,4],[6,9],[12,9],[-6,1],[-8,4]]);
    var B2=pr2[0], C2=pr2[1], kv3=(B2*B2)/(4*C2);
    return numq("The equation \\(kx^2 "+(B2<0?"- "+(-B2):"+ "+B2)+"x + "+C2+" = 0\\) has exactly one repeated real root. What is the value of \\(k\\)?",
      kv3, 0.001,
      "Set the discriminant equal to zero:"+
      "\\[ \\begin{aligned} b^2 - 4ac &= 0 \\\\ ("+B2+")^2 - 4(k)("+C2+") &= 0 \\\\ "+(B2*B2)+" &= "+(4*C2)+"k \\\\ k &= "+kv3+" \\end{aligned} \\]"+
      "So <b>\\(k = "+kv3+"\\)</b>.",
      {mode:mode});
  }
  /* givenD: a discriminant value is given, one coefficient is missing */
  if(Math.random()<0.5){
    var B3=ri(-10,10), c0=ri(-12,12), D0=B3*B3-4*c0;
    return numq("The discriminant of \\(x^2 "+(B3<0?"- "+(-B3):"+ "+B3)+"x + c = 0\\) is "+D0+". What is the value of \\(c\\)?",
      c0, 0.001,
      "Substitute into the discriminant formula and solve for \\(c\\):"+
      "\\[ \\begin{aligned} b^2 - 4ac &= "+D0+" \\\\ ("+B3+")^2 - 4(1)c &= "+D0+" \\\\ "+(B3*B3)+" - 4c &= "+D0+" \\\\ c &= "+c0+" \\end{aligned} \\]"+
      "So <b>\\(c = "+c0+"\\)</b>.",
      {mode:mode});
  }
  var b0=ri(2,10), C3=ri(-8,12), D3=b0*b0-4*C3;
  return numq("The discriminant of \\(x^2 + bx "+(C3<0?"- "+(-C3):"+ "+C3)+" = 0\\) is "+D3+", and \\(b > 0\\). What is the value of \\(b\\)?",
    b0, 0.001,
    "Substitute into the discriminant formula and solve for \\(b\\):"+
    "\\[ \\begin{aligned} b^2 - 4ac &= "+D3+" \\\\ b^2 - 4(1)("+C3+") &= "+D3+" \\\\ b^2 &= "+(b0*b0)+" \\\\ b &= "+b0+" \\end{aligned} \\]"+
    "Taking the positive value, <b>\\(b = "+b0+"\\)</b>.",
    {mode:mode});
});
E("u2-pk-vertex-read",2,["4.1"],1,"gen",function(){
  var a=pick([1,2,3,-1,-2,-3]);
  var p=0, q=0;
  while(p===0) p=ri(-6,6);
  while(q===0) q=ri(-6,6);
  var qv=mcq("What are the coordinates of the <b>vertex</b> of the graph of \\(y = "+u2VS(a,p,q)+"\\)?",
    u2Pair(p,q), [u2Pair(-p,q), u2Pair(p,-q), u2Pair(-p,-q)],
    "In the form \\(y = a(x - p)^2 + q\\), the vertex is \\((p, q)\\): the squared part is zero when \\(x = "+p+"\\), and the value of the function there is \\("+q+"\\). A check on a graphing utility shows the turning point at "+u2Pair(p,q)+", confirming the read-off.",
    {a:a, p:p, q:q});
  qv.figure=parSVG(a,-2*a*p,a*p*p+q,{marks:[{x:p,y:q}]});
  return qv;
});
E("u2-pk-vertex-standard",2,["4.1"],2,"var",varset([
  function(){
  var a=pick([1,2,3,-1,-2]);
  var p=0, q=0, att=0, b, c;
  while(att<200){
    att++;
    p=0; while(p===0) p=ri(-5,5);
    q=ri(-6,6);
    b=-2*a*p; c=a*p*p+q;
    var fneg=a*p*p - b*p + c; /* f(-p) */
    if(q!==c && fneg!==q && fneg!==c) break;
  }
  b=-2*a*p; c=a*p*p+q;
  var fneg2=a*p*p - b*p + c;
  var sub=(a===1?"":a===-1?"-":""+a)+"("+p+")^2"+(b>0?" + "+b+"("+p+")":b<0?" - "+(-b)+"("+p+")":"")+(c>0?" + "+c:c<0?" - "+(-c):"");
  return mcq("What is the <b>vertex</b> of the graph of \\(y = "+u2Std(a,b,c)+"\\)?",
    u2Pair(p,q), [u2Pair(-p,q), u2Pair(p,c), u2Pair(p,fneg2)],
    "To sketch the graph, first find its turning point. The vertex sits on the axis of symmetry, \\(x = \\frac{-b}{2a}\\):"+
    "\\[ \\begin{aligned} x &= \\frac{-b}{2a} = \\frac{"+(-b)+"}{"+(2*a)+"} = "+p+" \\\\ y &= "+sub+" \\\\ &= "+u2JoinSigned([a*p*p, b*p, c])+" \\\\ &= "+q+" \\end{aligned} \\]"+
    "So the vertex, the point where the graph turns, is "+u2Pair(p,q)+".",
    {a:a, p:p, q:q, b:b, c:c});
},
  function(){
    var a=pick([1,2,3,-1,-2]);
    var p=0, q=0, att=0, b, c;
    while(att<200){
      att++;
      p=0; while(p===0) p=ri(-5,5);
      q=ri(-6,6);
      b=-2*a*p; c=a*p*p+q;
      var fneg=a*p*p - b*p + c;
      if(q!==c && fneg!==q && fneg!==c) break;
    }
    b=-2*a*p; c=a*p*p+q;
    var fneg2=a*p*p - b*p + c;
    var qfig=mcq("The graph shows a parabola with its vertex marked. What is the <b>vertex</b> of the graph?",
      u2Pair(p,q), [u2Pair(-p,q), u2Pair(p,c), u2Pair(p,fneg2)],
      "The marked point is the turning point of the graph, its vertex: "+u2Pair(p,q)+".",
      {a:a, p:p, q:q, b:b, c:c});
    qfig.figure=parSVG(a,b,c,{labels:"values",marks:[{x:p,y:q}]});
    return qfig;
  }
]));
E("u2-pk-complete-square",2,["4.1"],2,"gen",function(){
  var fam=pick(["convert","verify"]);
  var a=1, p=0, q=0, b=0, c=0, key="", att=0, dis=[];
  while(att<200){
    att++;
    a=pick([1,1,2,-1,-2]);
    p=0; while(p===0) p=ri(-5,5);
    q=0; while(q===0) q=ri(-6,6);
    b=-2*a*p; c=a*p*p+q;
    key="\\(y = "+u2VS(a,p,q)+"\\)";
    var pool=["\\(y = "+u2VS(a,-p,q)+"\\)", "\\(y = "+u2VS(a,p,c)+"\\)", "\\(y = "+u2VS(a,p,-q)+"\\)", "\\(y = "+u2VS(a,-p,-q)+"\\)"];
    if(a!==1) pool.push("\\(y = "+u2VS(1,p,q)+"\\)");
    dis=[]; var seen={};
    pool.forEach(function(s){ if(s!==key && !seen[s]){ seen[s]=1; dis.push(s); } });
    if(dis.length>=3){ dis=dis.slice(0,3); break; }
  }
  var B=b/a, P2=p*p;
  var aPre=(a===1?"":a===-1?"-":""+a);
  var cTail=(c>0?" + "+c:c<0?" - "+(-c):"");
  var sol;
  if(fam==="convert"){
    var lines="\\[ \\begin{aligned} y &= "+u2Std(a,b,c)+" \\\\ ";
    if(a===1){
      lines+="&= \\left("+u2QuadB(B)+" + "+P2+"\\right) + \\left("+u2JoinSigned([c,-P2])+"\\right) \\\\ &= "+u2VS(a,p,q)+" \\end{aligned} \\]";
    } else {
      lines+="&= "+aPre+"\\left("+u2QuadB(B)+"\\right)"+cTail+" \\\\ &= "+aPre+"\\left("+u2QuadB(B)+" + "+P2+"\\right) + \\left("+u2JoinSigned([c,-a*P2])+"\\right) \\\\ &= "+u2VS(a,p,q)+" \\end{aligned} \\]";
    }
    sol="Complete the square on the x-terms. Half of the coefficient of \\(x\\) inside the brackets is \\("+(B/2)+"\\), and \\("+(B/2)+"\\) squared is \\("+P2+"\\); that amount is added inside the brackets and balanced outside them:"+
      lines+
      "The result is the vertex form \\(y = "+u2VS(a,p,q)+"\\) with vertex \\(("+p+", "+q+")\\).";
    return mcq("Rewrite \\(y = "+u2Std(a,b,c)+"\\) in the form \\(y = a(x - p)^2 + q\\).",
      key, dis, sol, {fam:fam, a:a, p:p, q:q});
  }
  sol="Expand the squared bracket in the matching choice and compare term by term:"+
    "\\[ \\begin{aligned} "+u2VS(a,p,q)+" &= "+aPre+"\\left("+u2Std(1,-2*p,P2)+"\\right) "+(q>0?"+ "+q:"- "+(-q))+" \\\\ &= "+u2Std(a,b,a*P2)+(q>0?" + "+q:" - "+(-q))+" \\\\ &= "+u2Std(a,b,c)+" \\end{aligned} \\]"+
    "The expansion gives exactly \\(y = "+u2Std(a,b,c)+"\\), so the two forms represent the same function. The other choices expand to different quadratics.";
  return mcq("Which function represents the <b>same function</b> as \\(y = "+u2Std(a,b,c)+"\\)?",
    key, dis, sol, {fam:fam, a:a, p:p, q:q});
});
E("u2-pk-npv-basic",2,["4.1"],1,"gen",function(){
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
E("u2-pk-npv-quadratic",2,["4.1"],2,"gen",function(){
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
E("u3-pk-defined-values",3,["4.25"],1,"gen",function(){
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
E("u3-pk-solve-radical",3,["4.9"],2,"gen",function(){
  var shape=pick(["basic","linear","isolated","twoRad"]);
  if(shape==="basic"){
    var b=pick([-9,-7,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9,11,13,15]),c=ri(2,9);
    var x=c*c-b;
    return numq("Solve the equation \\(\\sqrt{x"+u4sgn(b)+"} = "+c+"\\).",
      x,0.01,
      "Restriction: the radicand must be non-negative, so \\(x \\geq "+(-b)+"\\). Square both sides and solve: \\[ \\begin{aligned} \\sqrt{x"+u4sgn(b)+"} &= "+c+" \\\\ x"+u4sgn(b)+" &= "+(c*c)+" \\\\ x &= "+x+" \\end{aligned} \\] Check: \\(\\sqrt{"+x+u4sgn(b)+"} = \\sqrt{"+(c*c)+"} = "+c+"\\), so the root is <b>\\(x = "+x+"\\)</b>.",
      {b:b,c:c,shape:shape});
  }
  if(shape==="linear"){
    var a=pick([2,3,4]),x0=ri(3,15),c2=ri(2,8);
    var Bc=c2*c2-a*x0;
    return numq("Solve the equation \\(\\sqrt{"+a+"x"+u4sgn(Bc)+"} = "+c2+"\\).",
      x0,0.01,
      "Restriction: the radicand must be non-negative, so \\("+a+"x"+u4sgn(Bc)+" \\geq 0\\). Square both sides and solve: \\[ \\begin{aligned} \\sqrt{"+a+"x"+u4sgn(Bc)+"} &= "+c2+" \\\\ "+a+"x"+u4sgn(Bc)+" &= "+(c2*c2)+" \\\\ "+a+"x &= "+(a*x0)+" \\\\ x &= "+x0+" \\end{aligned} \\] Check: \\(\\sqrt{"+a+" \\times "+x0+u4sgn(Bc)+"} = \\sqrt{"+(c2*c2)+"} = "+c2+"\\), so the root is <b>\\(x = "+x0+"\\)</b>.",
      {a:a,x0:x0,c:c2,shape:shape});
  }
  if(shape==="isolated"){
    var p=ri(1,6),c3=ri(2,8),d=p+c3;
    var b3=pick([-9,-7,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9,11,13,15]);
    var x3=c3*c3-b3;
    return numq("Solve the equation \\("+p+" + \\sqrt{x"+u4sgn(b3)+"} = "+d+"\\).",
      x3,0.01,
      "First isolate the radical. Restriction: the radicand must be non-negative, so \\(x \\geq "+(-b3)+"\\). \\[ \\begin{aligned} "+p+" + \\sqrt{x"+u4sgn(b3)+"} &= "+d+" \\\\ \\sqrt{x"+u4sgn(b3)+"} &= "+c3+" \\\\ x"+u4sgn(b3)+" &= "+(c3*c3)+" \\\\ x &= "+x3+" \\end{aligned} \\] Check: \\("+p+" + \\sqrt{"+x3+u4sgn(b3)+"} = "+p+" + "+c3+" = "+d+"\\), so the root is <b>\\(x = "+x3+"\\)</b>.",
      {p:p,c:c3,b:b3,shape:shape});
  }
  var av=ri(1,9),bv=ri(1,9),xv=av+bv;
  return numq("Solve the equation \\(\\sqrt{x + "+av+"} = \\sqrt{2x"+u4sgn(-bv)+"}\\).",
    xv,0.01,
    "Restrictions: both radicands must be non-negative, so \\(x \\geq "+(-av)+"\\) and \\(x \\geq "+fmt(bv/2,1)+"\\). Square both sides and solve: \\[ \\begin{aligned} \\sqrt{x + "+av+"} &= \\sqrt{2x"+u4sgn(-bv)+"} \\\\ x + "+av+" &= 2x"+u4sgn(-bv)+" \\\\ x &= "+xv+" \\end{aligned} \\] Check: both radicands equal \\("+(xv+av)+"\\), which is non-negative, so the root is <b>\\(x = "+xv+"\\)</b>.",
    {a:av,b:bv,shape:shape});
});
E("u3-pk-verify-roots",3,["4.9"],1,"gen",function(){
  var shape=pick(["simple","simple","validStmt","extrValue"]);
  if(shape==="simple"){
    var b=pick([-9,-7,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9,11,13,15]),c=ri(2,9);
    var r=c*c-b;
    return numq("A student solves \\(\\sqrt{x"+u4sgn(b)+"} = "+c+"\\) and claims the root is \\(x = "+r+"\\). To verify the claim, the student substitutes \\(x = "+r+"\\) into the <b>left side</b> of the original equation. What value does the left side give?",
      c,0.01,
      "Substitute into the original equation, not a squared version of it: \\[ \\begin{aligned} \\sqrt{"+r+u4sgn(b)+"} &= \\sqrt{"+(c*c)+"} \\\\ &= "+c+" \\end{aligned} \\] The left side gives <b>"+c+"</b>, which matches the right side, so the claim checks.",
      {b:b,c:c,r:r,shape:shape});
  }
  var cc=ri(2,8),kk=ri(1,4),s=cc-kk,r2=2*cc+1-s,bb2=cc*cc-r2*s;
  var eq="\\sqrt{x"+u4sgn(bb2)+"} = x - "+cc, kv=r2-cc;
  if(shape==="validStmt"){
    var corS="Substituting gives \\(\\sqrt{"+(kv*kv)+"} = "+kv+"\\) on the left and \\("+r2+" - "+cc+" = "+kv+"\\) on the right, so the value checks";
    var candsS=["Substituting gives \\(\\sqrt{"+(kv*kv)+"} = "+(-kv)+"\\) on the left and \\("+r2+" - "+cc+" = "+kv+"\\) on the right, so the value checks",
      "Substituting gives \\(\\sqrt{"+(kv*kv)+"} = "+kv+"\\) on the left and \\("+r2+" - "+cc+" = "+(-kv)+"\\) on the right, so the value checks",
      "Substituting gives \\("+(kv*kv)+"\\) on the left and \\("+r2+" - "+cc+" = "+kv+"\\) on the right, so the value checks"];
    return mcq("A student solves \\("+eq+"\\) and obtains \\(x = "+r2+"\\). Which statement shows the <b>correct verification</b> of this value?",
      corS,u4dis(corS,candsS,3),
      "Verification means substituting into the original equation and evaluating each side separately. The left side is \\(\\sqrt{"+r2+u4sgn(bb2)+"} = \\sqrt{"+(kv*kv)+"} = "+kv+"\\) (a square root is never negative), and the right side is \\("+r2+" - "+cc+" = "+kv+"\\). The two sides agree, so <b>\\(x = "+r2+"\\)</b> is verified as a root.",
      {c:cc,s:s,r:r2,shape:shape});
  }
  return numq("A student solves \\("+eq+"\\) by squaring and lists \\(x = "+s+"\\) as a possible root. Substituting \\(x = "+s+"\\) into the <b>left side</b> of the original equation gives what value?",
    kk,0.01,
    "Substitute into the original equation: \\[ \\begin{aligned} \\sqrt{"+s+u4sgn(bb2)+"} &= \\sqrt{"+(kk*kk)+"} \\\\ &= "+kk+" \\end{aligned} \\] The left side gives <b>"+kk+"</b>. The right side at \\(x = "+s+"\\) is \\("+s+" - "+cc+" = "+(-kk)+"\\), which is different, so this substitution shows \\(x = "+s+"\\) is not a root.",
    {c:cc,s:s,r:r2,shape:shape});
});
E("u3-pk-extraneous-why",3,["4.9"],3,"gen",function(){
  var c=ri(2,8),k=ri(1,4),s=c-k,r=2*c+1-s,b=c*c-r*s;
  var eq="\\sqrt{x"+u4sgn(b)+"} = x - "+c;
  var shape=pick(["why","why","step","which"]);
  if(shape==="why"){
    var cor="At \\(x = "+s+"\\), the right side is \\("+s+" - "+c+" = "+(-k)+"\\), which is negative, but a square root is never negative, so the two sides cannot be equal";
    var cands=["At \\(x = "+s+"\\), the radicand \\(x"+u4sgn(b)+"\\) is a negative number, so the square root in the equation is undefined there",
      "Squaring both sides is never a valid step in solving an equation, so both values found this way have to be thrown out entirely",
      "The value \\(x = "+s+"\\) does not satisfy the squared equation either, since it fails \\(x"+u4sgn(b)+" = (x - "+c+")^2\\) when it is substituted back and checked"];
    return mcq("Solving \\("+eq+"\\) by squaring both sides leads to \\(x = "+r+"\\) and \\(x = "+s+"\\). The value \\(x = "+s+"\\) is not a solution of the original equation. Why not?",
      cor,u4dis(cor,cands,3),
      "Check \\(x = "+s+"\\) in the original equation: the left side is \\(\\sqrt{"+s+u4sgn(b)+"} = \\sqrt{"+(k*k)+"} = "+k+"\\) (the radicand there is positive), while the right side is \\("+s+" - "+c+" = "+(-k)+"\\). Squaring can produce values that solve the squared equation but fail the original, because the squared equation cannot tell \\("+k+"\\) from \\("+(-k)+"\\) on the right side. Only \\(x = "+r+"\\) checks.",
      {c:c,k:k,s:s,r:r,shape:shape});
  }
  if(shape==="step"){
    var cor2="When both sides are squared, because the squared equation also admits roots of the equation with the right side negated";
    var cands2=["When the radical is isolated on one side, since moving terms across the equals sign changes the solution set of the equation",
      "When the resulting quadratic is factored, since factoring a quadratic can introduce values that were not there before",
      "When the final answers are checked by substitution, since the check itself can create values that fail the original equation"];
    return mcq("When an equation such as \\("+eq+"\\) is solved, an extraneous root can appear. At which step does it enter?",
      cor2,u4dis(cor2,cands2,3),
      "Squaring is the step that can enlarge the solution set: the squared equation \\(x"+u4sgn(b)+" = (x - "+c+")^2\\) is satisfied not only by roots of the original equation but also by roots of \\(\\sqrt{x"+u4sgn(b)+"} = -(x - "+c+")\\). Isolating and factoring preserve the solution set, and checking only filters values out. That is why every root is checked in the original equation.",
      {c:c,k:k,s:s,r:r,shape:shape});
  }
  return mcq("Solving \\("+eq+"\\) by squaring gives \\(x = "+r+"\\) or \\(x = "+s+"\\). Which value is extraneous?",
    ""+s,[""+r,"Both values","Neither value"],
    "Substitute each value into the original equation. At \\(x = "+r+"\\): the left side is \\(\\sqrt{"+(r+b)+"} = \\sqrt{"+((r-c)*(r-c))+"} = "+(r-c)+"\\) and the right side is \\("+r+" - "+c+" = "+(r-c)+"\\), so it checks. At \\(x = "+s+"\\): the left side is \\(\\sqrt{"+(k*k)+"} = "+k+"\\) but the right side is \\("+s+" - "+c+" = "+(-k)+"\\), so it fails. The extraneous value is <b>\\(x = "+s+"\\)</b>.",
    {c:c,k:k,s:s,r:r,shape:shape});
});
E("u3-pk-which-is-solution",3,["4.9"], 1, "gen", function () {
  var a = ri(2, 7), x0 = ri(-6, 9), b = ri(-9, 9);
  var c = a * x0 + b;
  function fbFor(v) { return "Substituting \\(x = " + fmt(v) + "\\) gives a left side of " + fmt(a * v + b) + ", which is not " + fmt(c) + "."; }
  var cands = [
    { t: fmt(x0 + 1), fb: fbFor(x0 + 1) },
    { t: fmt(x0 - 1), fb: fbFor(x0 - 1) },
    { t: fmt(x0 + 2), fb: fbFor(x0 + 2) }
  ];
  var sol = "Substitute the value and compare the two sides: \\[ \\begin{aligned} " + n5lin(a, b) + " &= " + fmt(a) + "(" + fmt(x0) + ")" + (b >= 0 ? "+" + fmt(b) : "-" + fmt(-b)) + " \\\\ &= " + fmt(c) + " \\end{aligned} \\] Both sides match, so the solution is <b>\\(x = " + fmt(x0) + "\\)</b>.";
  return mcq("Which value is the solution of \\(" + n5lin(a, b) + " = " + fmt(c) + "\\)?", { t: fmt(x0), fb: "Correct: substituting it makes both sides equal." }, cands, sol, { mode: "which-sol", a: a, b: b, c: c });
}, ["A solution is a value that makes both sides equal when it is substituted.", "First substitute one value and work out the left side, then compare it with the right side."]);
E("u4-pk-read-sketch",4,["7.1"], 1, "gen", function () {
  var pool = [];
  for (var d = 20; d <= 340; d += 5) if (d % 90 !== 0) pool.push(d);
  var deg = pick(pool);
  var corr = deg + "°";
  var cands = [360 - deg, (deg + 180) % 360, (540 - deg) % 360, (deg + 90) % 360, (deg + 270) % 360, (180 - deg + 360) % 360].map(function (x) { return x + "°"; });
  var q = mcq("The diagram shows an angle in standard position. What is the measure of the angle?",
    corr, u1dist3(corr, cands),
    "The initial arm lies on the positive x-axis and the rotation is counterclockwise. The terminal arm is in Quadrant " + ["I", "II", "III", "IV"][u1quadOf(deg) - 1] + " with reference angle " + u1refOf(deg) + "°, which gives the measure <b>" + deg + "°</b>.",
    { deg: deg });
  q.figure = u1armSVG(deg);
  return q;
});
E("u4-pk-same-reference",4,["7.1"], 1, "gen", function () {
  if (Math.random() < 0.5) {
    var r = pick([15, 20, 25, 30, 35, 40, 50, 55, 60, 65, 70, 75, 80]);
    function setStr(arr) { return arr.join("°, ") + "°"; }
    var corrArr = [r, 180 - r, 180 + r, 360 - r];
    var corr = setStr(corrArr);
    var cands = [
      setStr([r, 90 + r, 180 + r, 360 - r]),
      setStr([r, 180 - r, 270 + r, 360 - r]),
      setStr([r, 180 - r, 180 + r, 270 - r]),
      setStr([90 - r, 180 - r, 180 + r, 360 - r])
    ];
    return mcq("Which list gives all the angles between 0° and 360° that have a reference angle of " + r + "°?",
      corr, u1dist3(corr, cands),
      "An angle with reference angle " + r + "° can terminate in any quadrant. In Quadrant I the angle is " + r + "°; reflecting the terminal arm into Quadrant II gives \\(180^\\circ - " + r + "^\\circ = " + (180 - r) + "^\\circ\\); into Quadrant III gives \\(180^\\circ + " + r + "^\\circ = " + (180 + r) + "^\\circ\\); into Quadrant IV gives \\(360^\\circ - " + r + "^\\circ = " + (360 - r) + "^\\circ\\). The list is <b>" + corr + "</b>.",
      { mode: "sets", r: r });
  }
  var q = pick([2, 3, 4]);
  var deg = q === 2 ? ri(100, 170) : q === 3 ? ri(190, 260) : ri(280, 350);
  var ref = u1refOf(deg);
  var opts = ["the x-axis only", "the y-axis only", "both axes", "the line y = x"];
  var corr = q === 2 ? opts[1] : q === 3 ? opts[2] : opts[0];
  var dis = opts.filter(function (o) { return o !== corr; });
  var how = q === 2 ? "Quadrant II is reached by reflecting the reference arm in the y-axis." : q === 3 ? "Quadrant III is reached by reflecting the reference arm in both axes." : "Quadrant IV is reached by reflecting the reference arm in the x-axis.";
  return mcq("An angle of " + deg + "° has a reference angle of " + ref + "°. The terminal arm of the " + deg + "° angle is the reflection of the terminal arm of its reference angle in",
    corr, dis,
    "The angle " + deg + "° terminates in Quadrant " + ["I", "II", "III", "IV"][q - 1] + ". " + how + " The reflection is in <b>" + corr + "</b>.",
    { mode: "reflect", deg: deg });
});
E("u4-pk-point-distance",4,["7.1"], 1, "gen", function () {
  var bases = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41]];
  var bs = pick(bases), s = ri(1, 3);
  var lx = bs[0] * s, ly = bs[1] * s, r = bs[2] * s;
  if (Math.random() < 0.5) { var t = lx; lx = ly; ly = t; }
  var x = lx * pick([1, -1]), y = ly * pick([1, -1]);
  return numq("The point P(" + x + ", " + y + ") lies on the terminal arm of an angle in standard position. Determine the distance from the origin to point P.",
    r, 0.1,
    "The distance from the origin to P is the hypotenuse of a right triangle with legs \\(|" + x + "|\\) and \\(|" + y + "|\\). The Pythagorean theorem gives: \\[ \\begin{aligned} r^2 &= (" + x + ")^2 + (" + y + ")^2 \\\\ &= " + (x * x) + " + " + (y * y) + " \\\\ &= " + (r * r) + " \\\\ r &= " + r + " \\end{aligned} \\] The distance is <b>" + r + "</b>.",
    { x: x, y: y });
});
E("u4-pk-point-ratios",4,["7.1"], 2, "gen", function () {
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
E("u4-pk-exact-values",4,["7.1"], 2, "gen", function () {
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
E("u4-pk-solve-equation",4,["7.1"], 2, "gen", function () {
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
E("u5-pk-effect-of-a",5,["7.20"],1,"gen",function(){
  var pool=[{d:"2",v:2},{d:"3",v:3},{d:"4",v:4},{d:"5",v:5},{d:"-2",v:-2},{d:"-3",v:-3},
            {d:"\\frac{1}{2}",v:0.5},{d:"\\frac{1}{3}",v:1/3},{d:"\\frac{1}{4}",v:0.25},
            {d:"\\frac{2}{3}",v:2/3},{d:"\\frac{3}{4}",v:0.75},{d:"\\frac{1}{5}",v:0.2}];
  if(ri(0,2)<2){ /* compare a set of three parabolas */
    var att=0, it1, it2;
    while(att<200){
      att++;
      it1=pick(pool); it2=pick(pool);
      if(Math.abs(it1.v)!==Math.abs(it2.v)) break;
    }
    var askWide=ri(0,1)===0;
    var items=[{d:"",v:1},{d:it1.d,v:it1.v},{d:it2.d,v:it2.v}];
    function eqOf(it){ return "\\(y = "+(it.d===""?"":it.d)+"x^2\\)"; }
    var target=items.slice().sort(function(m,n){ return askWide ? Math.abs(m.v)-Math.abs(n.v) : Math.abs(n.v)-Math.abs(m.v); })[0];
    var keyEq=eqOf(target);
    var dis=items.filter(function(it){ return eqOf(it)!==keyEq; }).map(eqOf);
    dis.push("All three parabolas are equally wide.");
    var absList=items.map(function(it){ var av=Math.abs(it.v); return "\\(\\left|"+(it.d===""?"1":it.d)+"\\right| "+(Number.isInteger(av*4)?"=":"\\approx")+" "+fmt(av,2)+"\\)"; }).join(", ");
    var qe1=mcq("The graphs of \\(y = x^2\\), \\(y = "+it1.d+"x^2\\) and \\(y = "+it2.d+"x^2\\) are drawn on the same axes. Which parabola is the <b>"+(askWide?"widest":"narrowest")+"</b>?",
      keyEq, dis,
      "Comparing parabolas of the form \\(y = ax^2\\), the width is decided by \\(\\left|a\\right|\\): the larger \\(\\left|a\\right|\\) is, the faster the values grow and the narrower the parabola; the smaller \\(\\left|a\\right|\\), the wider it is. Here the absolute values are "+absList+". So the "+(askWide?"widest":"narrowest")+" parabola is "+keyEq+". A negative value of \\(a\\) reflects a parabola in the x-axis but does not change its width.",
      {askWide:askWide, v1:it1.v, v2:it2.v});
    qe1.figure=u2EffectPanels(items);
    return qe1;
  }
  var it=pick(pool);
  var W=Math.abs(it.v)>1?"narrower":"wider", O=it.v>0?"opens upward":"opens downward";
  var W2=Math.abs(it.v)>1?"wider":"narrower", O2=it.v>0?"opens downward":"opens upward";
  function stmt(w,o){ return "It is "+w+" and "+o+"."; }
  var qe2=mcq("Compared with the graph of \\(y = x^2\\), how does the graph of \\(y = "+it.d+"x^2\\) differ?",
    stmt(W,O), [stmt(W2,O), stmt(W,O2), stmt(W2,O2)],
    "For \\(y = ax^2\\), compare \\(\\left|a\\right|\\) with 1 and check the sign of \\(a\\). Here \\(\\left|a\\right| = "+fmt(Math.abs(it.v),2)+"\\), which is "+(Math.abs(it.v)>1?"greater":"less")+" than 1, so the values of \\(y\\) change "+(Math.abs(it.v)>1?"faster":"more slowly")+" than for \\(y = x^2\\) and the parabola is "+W+". The coefficient is "+(it.v>0?"positive, so the parabola still opens upward.":"negative, so the parabola is reflected in the x-axis and opens downward."),
    {v:it.v});
  qe2.figure=u2EffectPanels([{d:"",v:1},it]);
  return qe2;
});
E("u5-pk-translations",5,["7.20"],1,"var",varset([
  function(){
  var fam=pick(["p","q","both"]);
  if(fam==="p"){
    var p=ri(2,8), sgn=pick([1,-1]);
    var form=sgn>0?"(x - "+p+")^2":"(x + "+p+")^2";
    var keyDir=sgn>0?"to the right":"to the left", altDir=sgn>0?"to the left":"to the right";
    return mcq("The graph of \\(y = x^2\\) is transformed to the graph of \\(y = "+form+"\\). How does the graph change?",
      "It shifts "+p+" units "+keyDir+".",
      ["It shifts "+p+" units "+altDir+".", "It shifts "+p+" units up.", "It shifts "+p+" units down."],
      "Replacing \\(x\\) by \\("+(sgn>0?"(x - "+p+")":"(x + "+p+")")+"\\) shifts every point of the graph "+p+" units "+keyDir+": the value in the brackets must reach the same size as before, so each point moves "+keyDir+" by "+p+". The sign inside the brackets points opposite to the direction of the shift.",
      {fam:fam, p:p, sgn:sgn});
  }
  if(fam==="q"){
    var q=ri(2,9), up=ri(0,1)===0;
    var form2=up?"x^2 + "+q:"x^2 - "+q;
    return mcq("The graph of \\(y = x^2\\) is transformed to the graph of \\(y = "+form2+"\\). How does the graph change?",
      "It shifts "+q+" units "+(up?"up":"down")+".",
      ["It shifts "+q+" units "+(up?"down":"up")+".", "It shifts "+q+" units to the right.", "It shifts "+q+" units to the left."],
      "Adding a constant to the whole function moves every point straight up or down by that amount. Here "+(up?"\\(+"+q+"\\) is added, so each y-value grows by "+q+" and the graph shifts "+q+" units up.":"\\("+q+"\\) is subtracted, so each y-value drops by "+q+" and the graph shifts "+q+" units down."),
      {fam:fam, q:q, up:up});
  }
  var p2=ri(2,8), q2=ri(2,8), sp=pick([1,-1]), sq=pick([1,-1]);
  var H=sp>0?"to the right":"to the left", H2=sp>0?"to the left":"to the right";
  var V=sq>0?"up":"down", V2=sq>0?"down":"up";
  function st(h,v){ return "It shifts "+p2+" units "+h+" and "+q2+" units "+v+"."; }
  return mcq("The graph of \\(y = x^2\\) is transformed to the graph of \\(y = "+u2VS(1,sp*p2,sq*q2)+"\\). How does the graph change?",
    st(H,V), [st(H2,V), st(H,V2), st(H2,V2)],
    "The two changes act independently. Inside the brackets, \\((x "+(sp>0?"- ":"+ ")+p2+")\\) shifts the graph "+p2+" units "+H+" (the sign inside points opposite to the shift). The constant "+(sq>0?"+ "+q2:"- "+q2)+" added to the whole function shifts it "+q2+" units "+V+".",
    {fam:fam, p:p2, q:q2, sp:sp, sq:sq});
},
  function(){
    var fam=pick(["p","q","both"]);
    var P=0, Q=0;
    if(fam==="p"){ P=ri(2,8)*pick([1,-1]); }
    else if(fam==="q"){ Q=ri(2,9)*pick([1,-1]); }
    else { P=ri(2,8)*pick([1,-1]); Q=ri(2,8)*pick([1,-1]); }
    var H=P>0?"to the right":"to the left", H2=P>0?"to the left":"to the right";
    var V=Q>0?"up":"down", V2=Q>0?"down":"up";
    function st(h,v){ return "It shifts "+Math.abs(P)+" units "+h+" and "+Math.abs(Q)+" units "+v+"."; }
    var key, dis;
    if(fam==="p"){ key="It shifts "+Math.abs(P)+" units "+H+"."; dis=["It shifts "+Math.abs(P)+" units "+H2+".", "It shifts "+Math.abs(P)+" units up.", "It shifts "+Math.abs(P)+" units down."]; }
    else if(fam==="q"){ key="It shifts "+Math.abs(Q)+" units "+V+"."; dis=["It shifts "+Math.abs(Q)+" units "+V2+".", "It shifts "+Math.abs(Q)+" units to the right.", "It shifts "+Math.abs(Q)+" units to the left."]; }
    else { key=st(H,V); dis=[st(H2,V), st(H,V2), st(H2,V2)]; }
    var move=(P!==0?Math.abs(P)+" units "+H:"")+((P!==0&&Q!==0)?" and ":"")+(Q!==0?Math.abs(Q)+" units "+V:"");
    var qfig=mcq("The graph shows the parabola obtained by transforming the graph of \\(y = x^2\\). How has the graph changed?",
      key, dis,
      "The graph of \\(y = x^2\\) has its vertex at \\((0, 0)\\). The marked vertex of the shown graph is \\(("+P+", "+Q+")\\), so the graph has shifted "+move+".",
      {fam:fam, P:P, Q:Q});
    qfig.figure=parSVG(1,-2*P,P*P+Q,{labels:"values",marks:[{x:P,y:Q}]});
    return qfig;
  }
]));
E("u5-pk-simplify-basic",5,["7.20"],1,"gen",function(){
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
E("u5-pk-lcd-choose",5,["7.20"],1,"gen",function(){
  var mode=pick(["shared","shared","power","coeff","triple"]);
  function threeRoots(){var rs=u5twoRoots(),r=rs[0],s=rs[1],t=pick(U5NZ),g=0;while((t===r||t===s)&&g<60){t=pick(U5NZ);g++;}return [r,s,t];}
  if(mode==="shared"){
    var R=threeRoots(),r=R[0],s=R[1],t=R[2],p=ri(2,9),q=ri(2,9);
    var d1=u5fac(r,1)+u5fac(s,1),d2=u5fac(r,1)+u5fac(t,1);
    var cor=u5fac(r,1)+u5fac(s,1)+u5fac(t,1);
    var cands=[u5fac(r,2)+u5fac(s,1)+u5fac(t,1),
      pick([d1,d2]),
      u5fac(s,1)+u5fac(t,1),
      u5fac(-r,1)+u5fac(s,1)+u5fac(t,1),
      u5quad(2,-(2*r+s+t),r*s+r*t)];
    return mcq("What is the lowest common denominator of \\("+u5frac(p,d1)+"\\) and \\("+u5frac(q,d2)+"\\)?",
      u5wrap(cor),u5dis(cor,cands,3).map(u5wrap),
      "Both denominators are already in factored form: \\("+d1+"\\) and \\("+d2+"\\). Build the LCD factor by factor, taking each different factor the greatest number of times it appears in any one denominator. The factor \\("+u5fac(r,1)+"\\) appears in both denominators, but it is needed only once; \\("+u5fac(s,1)+"\\) and \\("+u5fac(t,1)+"\\) each appear once. So the LCD is \\["+cor+"\\] The lowest common denominator is <b>\\("+cor+"\\)</b>. Multiplying the two denominators together would use the shared factor \\("+u5fac(r,1)+"\\) twice, which gives a common denominator, but not the lowest one.",
      {mode:mode,dens:[{c:1,f:[[r,1],[s,1]]},{c:1,f:[[r,1],[t,1]]}],lcd:{c:1,f:[[r,1],[s,1],[t,1]]}});
  }
  if(mode==="power"){
    var R2=threeRoots(),r2=R2[0],s2=R2[1],t2=R2[2],p2=ri(2,9),q2=ri(2,9);
    var e1=u5fac(r2,2)+u5fac(s2,1),e2=u5fac(r2,1)+u5fac(t2,1);
    var cor2=u5fac(r2,2)+u5fac(s2,1)+u5fac(t2,1);
    var cands2=[u5fac(r2,1)+u5fac(s2,1)+u5fac(t2,1),
      u5fac(r2,3)+u5fac(s2,1)+u5fac(t2,1),
      pick([e1,u5fac(r2,2)+u5fac(t2,1)]),
      u5fac(-r2,2)+u5fac(s2,1)+u5fac(t2,1)];
    return mcq("What is the lowest common denominator of \\("+u5frac(p2,e1)+"\\) and \\("+u5frac(q2,e2)+"\\)?",
      u5wrap(cor2),u5dis(cor2,cands2,3).map(u5wrap),
      "Both denominators are already in factored form: \\("+e1+"\\) and \\("+e2+"\\). The LCD takes each factor at the highest power it has in any one denominator. The factor \\("+u5fac(r2,1)+"\\) appears squared in the first denominator and only once in the second, so the LCD uses \\("+u5fac(r2,2)+"\\) for it, and takes \\("+u5fac(s2,1)+"\\) and \\("+u5fac(t2,1)+"\\) once each: \\["+cor2+"\\] The lowest common denominator is <b>\\("+cor2+"\\)</b>. Using only the first power of \\("+u5fac(r2,1)+"\\) would leave the first denominator unable to divide the result evenly.",
      {mode:mode,dens:[{c:1,f:[[r2,2],[s2,1]]},{c:1,f:[[r2,1],[t2,1]]}],lcd:{c:1,f:[[r2,2],[s2,1],[t2,1]]}});
  }
  if(mode==="coeff"){
    var a=ri(2,9),b=ri(2,9),g0=0;while(b===a&&g0<40){b=ri(2,9);g0++;}
    var L=a*b/u5gcd(a,b),r3=pick(U5NZ),p3=ri(2,9),q3=ri(2,9);
    var f1=u5fac(r3,1),dA=a+f1,dB=b+f1,cor3=L+f1;
    var cands3=[(a*b)+f1,""+a+f1,(a+b)+f1,""+b+f1,L+u5fac(-r3,1)];
    var remark=(u5gcd(a,b)>1)?("The coefficients "+a+" and "+b+" share a common factor, so their least common multiple is "+L+", not their product "+(a*b)+"."):("The coefficients "+a+" and "+b+" have no common factor, so their least common multiple is their product, "+L+".");
    return mcq("What is the lowest common denominator of \\("+u5frac(p3,dA)+"\\) and \\("+u5frac(q3,dB)+"\\)?",
      u5wrap(cor3),u5dis(cor3,cands3,3).map(u5wrap),
      "Both denominators contain the factor \\("+f1+"\\), so that factor is needed only once in the LCD. "+remark+" So the LCD is \\["+cor3+"\\] The lowest common denominator is <b>\\("+cor3+"\\)</b>.",
      {mode:mode,dens:[{c:a,f:[[r3,1]]},{c:b,f:[[r3,1]]}],lcd:{c:L,f:[[r3,1]]}});
  }
  var R4=threeRoots(),r4=R4[0],s4=R4[1],t4=R4[2],p4=ri(2,9),q4=ri(2,9),w4=ri(2,9);
  var g1=u5fac(r4,1)+u5fac(s4,1),g2=u5fac(s4,1)+u5fac(t4,1),g3=u5fac(r4,1)+u5fac(t4,1);
  var cor4=u5fac(r4,1)+u5fac(s4,1)+u5fac(t4,1);
  var cands4=[u5fac(r4,2)+u5fac(s4,2)+u5fac(t4,2),
    pick([g1,g2,g3]),
    u5quad(3,-2*(r4+s4+t4),r4*s4+s4*t4+r4*t4),
    u5fac(-r4,1)+u5fac(s4,1)+u5fac(t4,1)];
  return mcq("What is the lowest common denominator of \\("+u5frac(p4,g1)+"\\), \\("+u5frac(q4,g2)+"\\) and \\("+u5frac(w4,g3)+"\\)?",
    u5wrap(cor4),u5dis(cor4,cands4,3).map(u5wrap),
    "Write out the factors of the three denominators: \\("+g1+"\\), \\("+g2+"\\) and \\("+g3+"\\). Across the three denominators, the different factors are \\("+u5fac(r4,1)+"\\), \\("+u5fac(s4,1)+"\\) and \\("+u5fac(t4,1)+"\\), and each one appears at most once in any single denominator, so the LCD takes each of them once: \\["+cor4+"\\] The lowest common denominator is <b>\\("+cor4+"\\)</b>. Multiplying all three denominators together would use every factor twice.",
    {mode:mode,dens:[{c:1,f:[[r4,1],[s4,1]]},{c:1,f:[[s4,1],[t4,1]]},{c:1,f:[[r4,1],[t4,1]]}],lcd:{c:1,f:[[r4,1],[s4,1],[t4,1]]}});
});
E("u5-pk-complex-fraction",5,["7.20"],1,"gen",function(){
  var mode=pick(["numeric","singleVar","binomial"]);
  if(mode==="numeric"){
    var a=ri(2,9),b=ri(2,9),c=ri(2,9),d=ri(2,9),t=0;
    while((a===b||c===d)&&t<60){a=ri(2,9);b=ri(2,9);c=ri(2,9);d=ri(2,9);t++;}
    var expr=u5frac(u5frac(a,b),u5frac(c,d));
    var cor=u5fr(a*d,b*c);
    var cands=[u5fr(b*c,a*d),u5fr(a*c,b*d),u5fr(a+c,b+d),u5fr(a*d+1,b*c)];
    return mcq("Simplify the complex fraction \\("+expr+"\\).",
      u5wrap(cor),u5dis(cor,cands,3).map(u5wrap),
      "A complex fraction is a division in disguise: divide the numerator by the denominator, which means multiplying by its reciprocal. \\[ \\begin{aligned} "+expr+" &= "+u5frac(a,b)+" \\div "+u5frac(c,d)+" \\\\ &= "+u5frac(a,b)+" \\times "+u5frac(d,c)+" \\\\ &= "+u5frac(a*d,b*c)+" \\\\ &= "+cor+" \\end{aligned} \\] The simplified fraction is <b>\\("+cor+"\\)</b>.",
      {mode:mode,a:a,b:b,c:c,d:d});
  }
  if(mode==="singleVar"){
    var a2=ri(2,7),b2=ri(2,7),t2=0;while(a2===b2&&t2<60){b2=ri(2,7);t2++;}
    var expr2=u5frac(u5frac("x",""+a2),u5frac("x",""+b2));
    var cor2=u5fr(b2,a2);
    var cands2=[u5fr(a2,b2),"1",u5fr(a2+b2,a2)];
    return mcq("Simplify the complex fraction \\("+expr2+"\\).",
      u5wrap(cor2),u5dis(cor2,cands2,3).map(u5wrap),
      "Divide the numerator by the denominator: multiply by the reciprocal of \\("+u5frac("x",""+b2)+"\\). \\[ \\begin{aligned} "+expr2+" &= "+u5frac("x",""+a2)+" \\div "+u5frac("x",""+b2)+" \\\\ &= "+u5frac("x",""+a2)+" \\times "+u5frac(""+b2,"x")+" \\\\ &= "+cor2+" \\end{aligned} \\] The \\(x\\) factors divide out (for \\(x \\ne 0\\)), leaving <b>\\("+cor2+"\\)</b>.",
      {mode:mode,a:a2,b:b2});
  }
  var a3=pick(U5NZ);
  var expr3=u5frac(u5frac("1",u5lin(1,-a3)),u5frac("1",u5lin(1,a3)));
  var cor3=u5frac(u5lin(1,a3),u5lin(1,-a3));
  var cands3=[u5frac(u5lin(1,-a3),u5lin(1,a3)),"1",u5frac(u5quad(1,0,-(a3*a3)),"1")];
  return mcq("Simplify the complex fraction \\("+expr3+"\\).",
    u5wrap(cor3),u5dis(cor3,cands3,3).map(u5wrap),
    "Divide the numerator by the denominator: multiply by the reciprocal of \\("+u5frac("1",u5lin(1,a3))+"\\). \\[ \\begin{aligned} "+expr3+" &= "+u5frac("1",u5lin(1,-a3))+" \\div "+u5frac("1",u5lin(1,a3))+" \\\\ &= "+u5frac("1",u5lin(1,-a3))+" \\times "+u5frac(u5lin(1,a3),"1")+" \\\\ &= "+cor3+" \\end{aligned} \\] The simplified fraction is <b>\\("+cor3+"\\)</b>, for \\("+u5npvStr([-a3,a3])+"\\).",
    {mode:mode,a:a3});
});
E("u6-pk-simplify-trinomial",6,["7.34"],2,"gen",function(){
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
E("u6-pk-multiply",6,["7.34"],2,"gen",function(){
  var mode=pick(["poly","poly","mono"]);
  if(mode==="mono"){
    var a=ri(2,9),b=ri(2,9),c=ri(2,9),d=ri(2,9),m=ri(2,5),n=ri(1,4);
    var g=u5gcd(a*c,b*d),cn=(a*c)/g,cd=(b*d)/g,e=m-n;
    var expr=u5frac(u5cp(a,m),""+b)+" \\times "+u5frac(""+c,u5cp(d,n));
    var cor=u5monoVal(cn,cd,e);
    var gd=u5gcd(a*d,b*c);
    var cands=[u5monoVal(cn,cd,m+n),
      u5monoVal((a*d)/gd,(b*c)/gd,e),
      u5monoVal(cd,cn,e),
      u5monoVal(cn,cd,-e),
      u5monoVal(cn,cd,e+2),
      u5monoVal(cd+1,cn,e)];
    return mcq("Multiply and simplify: \\("+expr+"\\).",
      u5wrap(cor),u5dis(cor,cands,3).map(u5wrap),
      "Multiply the numerators and the denominators, then reduce: the coefficients give \\("+a+" \\times "+c+" = "+(a*c)+"\\) over \\("+b+" \\times "+d+" = "+(b*d)+"\\), which reduces to \\("+u5fr(a*c,b*d)+"\\), and \\(x^{"+m+"} \\div x^{"+n+"} = x^{"+e+"}\\) (with the power moving to the denominator if the exponent is negative). The product is <b>\\("+cor+"\\)</b>, for \\(x \\ne 0\\).",
      {mode:mode,a:a,b:b,c:c,d:d,m:m,n:n});
  }
  var r=pick(U5NZ),u=pick(U5NZ),s=pick(U5NZ),tt=pick(U5NZ),t=0;
  while((u===r||s===r||s===u||tt===r||tt===u||tt===s)&&t<100){u=pick(U5NZ);s=pick(U5NZ);tt=pick(U5NZ);t++;}
  var numQ=u5quad(1,-(r+u),r*u);
  var expr2=u5frac(numQ,u5lin(1,-s))+" \\times "+u5frac(u5lin(1,-s),u5lin(1,-tt));
  var cor2=u5frac(u5par(1,-r)+u5par(1,-u),u5lin(1,-tt));
  var cands2=[u5frac(u5lin(1,-tt),u5par(1,-r)+u5par(1,-u)),
    u5frac(u5par(1,-s)+u5par(1,-u),u5lin(1,-tt)),
    u5frac(u5par(1,-r)+u5par(1,-u),u5par(1,-s)+u5par(1,-tt)),
    u5frac(u5par(1,-r)+u5par(1,-tt),u5lin(1,-u))];
  return mcq("Multiply and simplify: \\("+expr2+"\\).",
    u5wrap(cor2),u5dis(cor2,cands2,3).map(u5wrap),
    "Factor first, then divide out the common factors before multiplying. The trinomial factors as \\("+u5par(1,-r)+u5par(1,-u)+"\\), and the factor \\("+u5par(1,-s)+"\\) appears in a numerator and a denominator: \\[ \\begin{aligned} "+expr2+" &= "+u5frac(u5par(1,-r)+u5par(1,-u),u5lin(1,-tt))+" \\end{aligned} \\] The product is <b>\\("+cor2+"\\)</b>, for \\("+u5npvStr([s,tt])+"\\).",
    {mode:mode,r:r,u:u,s:s,t:tt});
});
E("u6-pk-divide",6,["7.34"],2,"gen",function(){
  var mode=pick(["poly","poly2","mono"]);
  if(mode==="mono"){
    var a=ri(2,9),b=ri(2,9),c=ri(2,9),d=ri(2,9),m=ri(2,5),n=ri(1,4),p=ri(1,4),q=ri(1,4);
    var cn0=a*d,cd0=b*c,e=(m-n)-(p-q),g=u5gcd(cn0,cd0),cn=cn0/g,cd=cd0/g;
    var expr=u5frac(u5cp(a,m),u5cp(b,n))+" \\div "+u5frac(u5cp(c,p),u5cp(d,q));
    var cor=u5monoVal(cn,cd,e);
    var gm=u5gcd(a*c,b*d);
    var cands=[u5monoVal(cn,cd,(m-n)+(p-q)),
      u5monoVal((a*c)/gm,(b*d)/gm,e),
      u5monoVal(cd,cn,e),
      u5monoVal(cn,cd,-e),
      u5monoVal(cn,cd,(m-n)-(p+q)),
      u5monoVal(cn,cd,e+2),
      u5monoVal(cd+1,cn,e)];
    return mcq("Divide and simplify: \\("+expr+"\\).",
      u5wrap(cor),u5dis(cor,cands,3).map(u5wrap),
      "To divide, multiply by the reciprocal of the second expression: \\[ \\begin{aligned} "+expr+" &= \\frac{"+u5cp(a,m)+"}{"+u5cp(b,n)+"} \\times \\frac{"+u5cp(d,q)+"}{"+u5cp(c,p)+"} \\\\ &= "+cor+" \\end{aligned} \\] The coefficients combine to \\("+u5fr(cn0,cd0)+"\\), and the exponent of \\(x\\) is \\(("+m+" - "+n+") - ("+p+" - "+q+") = "+e+"\\); a negative exponent places the power in the denominator. The quotient is <b>\\("+cor+"\\)</b>, for \\(x \\ne 0\\).",
      {mode:mode,a:a,b:b,c:c,d:d,m:m,n:n,p:p,q:q});
  }
  if(mode==="poly"){
    var r=pick(U5NZ),s=pick(U5NZ),tt=pick(U5NZ),t=0;
    while((s===r||tt===r||tt===s)&&t<80){s=pick(U5NZ);tt=pick(U5NZ);t++;}
    var expr2=u5frac(u5lin(1,-r),u5lin(1,-s))+" \\div "+u5frac(u5lin(1,-tt),u5lin(1,-s));
    var cor2=u5frac(u5lin(1,-r),u5lin(1,-tt));
    var cands2=[u5frac(u5lin(1,-tt),u5lin(1,-r)),
      u5frac(u5par(1,-r)+u5par(1,-tt),u5par(1,-s)+u5par(1,-s)),
      u5frac(u5lin(1,-r),u5lin(1,-s)),
      u5frac(u5lin(1,-s),u5lin(1,-tt))];
    return mcq("Divide and simplify: \\("+expr2+"\\).",
      u5wrap(cor2),u5dis(cor2,cands2,3).map(u5wrap),
      "Dividing by a rational expression means multiplying by its reciprocal. The divisor's reciprocal is \\("+u5frac(u5lin(1,-s),u5lin(1,-tt))+"\\), and the factor \\("+u5par(1,-s)+"\\) then divides out: \\[ \\begin{aligned} "+expr2+" &= "+u5frac(u5lin(1,-r),u5lin(1,-s))+" \\times "+u5frac(u5lin(1,-s),u5lin(1,-tt))+" \\\\ &= "+cor2+" \\end{aligned} \\] The quotient is <b>\\("+cor2+"\\)</b>, for \\("+u5npvStr([s,tt])+"\\). Note the extra restriction \\(x \\ne "+tt+"\\): it comes from the numerator of the divisor, which becomes a denominator after the flip.",
      {mode:mode,r:r,s:s,t:tt});
  }
  var r2=pick(U5NZ),u2=pick(U5NZ),s2=pick(U5NZ),t2=0;
  while((u2===r2||s2===r2||s2===u2)&&t2<80){u2=pick(U5NZ);s2=pick(U5NZ);t2++;}
  var numQ=u5quad(1,-(r2+u2),r2*u2);
  var expr3=u5frac(numQ,u5lin(1,-s2))+" \\div "+u5frac(u5lin(1,-u2),u5lin(1,-s2));
  var cor3=u5lin(1,-r2);
  var cands3=[u5frac(u5lin(1,-r2),u5lin(1,-u2)),
    u5frac(u5par(1,-r2)+u5par(1,-u2),u5lin(1,-s2)),
    u5lin(1,-u2),
    u5frac(u5lin(1,-r2),u5lin(1,-s2))];
  return mcq("Divide and simplify: \\("+expr3+"\\).",
    u5wrap(cor3),u5dis(cor3,cands3,3).map(u5wrap),
    "Factor the numerator of the first expression: \\("+numQ+" = "+u5par(1,-r2)+u5par(1,-u2)+"\\). Then multiply by the reciprocal of the divisor: \\[ \\begin{aligned} "+expr3+" &= "+u5frac(numQ,u5lin(1,-s2))+" \\times "+u5frac(u5lin(1,-s2),u5lin(1,-u2))+" \\\\ &= "+cor3+" \\end{aligned} \\] The factors \\("+u5par(1,-s2)+"\\) and \\("+u5par(1,-u2)+"\\) both divide out, leaving just \\("+cor3+"\\). The quotient is <b>\\("+cor3+"\\)</b>, for \\("+u5npvStr([s2,u2])+"\\).",
    {mode:mode,r:r2,u:u2,s:s2});
});
E("u6-pk-add-subtract",6,["7.34"],2,"gen",function(){
  var mode=pick(["mono","binom","binom"]);
  if(mode==="mono"){
    var op=pick(["+","-"]),b=ri(2,6),d=ri(2,6),t=0;
    while(b===d&&t<40){d=ri(2,6);t++;}
    var L=b*d/u5gcd(b,d);
    var a=ri(2,9),c=ri(2,9);
    while((op==="-"&&a/b<=c/d)||(op==="+"&&(a/b===c/d))){a=ri(2,9);c=ri(2,9);}
    var num=a*(L/b)+(op==="+"?c*(L/d):-c*(L/d));
    var g=u5gcd(num,L),numR=num/g,LR=L/g;
    var expr=u5frac(a,""+b+"x")+" "+op+" "+u5frac(c,""+d+"x");
    var cor=(LR===1)?u5frac(numR,"x"):u5frac(numR,""+LR+"x");
    var numErr=a*(L/b)+(op==="+"?-c*(L/d):c*(L/d));
    var cands=[(LR===1)?u5frac(numErr,"x"):u5frac(numErr,""+LR+"x"),
      u5frac(a+c,""+(b+d)+"x"),
      u5frac(num,""+(L+b+d)+"x"),
      (LR===1)?u5frac(numR,"x"):(u5frac(numR,""+(LR+1)+"x"))];
    return mcq("Add or subtract and simplify: \\("+expr+"\\).",
      u5wrap(cor),u5dis(cor,cands,3).map(u5wrap),
      "The denominators are \\("+b+"x\\) and \\("+d+"x\\), so their lowest common denominator is \\("+L+"x\\). Rewrite each fraction with that denominator and combine the numerators: \\[ \\begin{aligned} "+expr+" &= "+u5frac(a*(L/b),""+L+"x")+" "+op+" "+u5frac(c*(L/d),""+L+"x")+" \\\\ &= "+u5frac(num,""+L+"x")+" \\\\ &= "+cor+" \\end{aligned} \\] The sum is <b>\\("+cor+"\\)</b>, for \\(x \\ne 0\\). The numerators are combined only after both fractions share the same denominator.",
      {mode:mode,op:op,a:a,b:b,c:c,d:d});
  }
  var op2=pick(["+","-"]),p=ri(2,7),q=ri(2,7),rs=u5twoRoots(),r=rs[0],s=rs[1];
  var A=p+q,B=-(p*s+q*r);
  if(op2==="-"){A=p-q;B=-p*s+q*r;}
  var numBody=u5lin(A,B);
  var expr2=u5frac(p,u5lin(1,-r))+" "+op2+" "+u5frac(q,u5lin(1,-s));
  var cor2=u5frac(numBody,u5par(1,-r)+u5par(1,-s));
  var numErr2=u5lin(A,-(p*s-q*r));
  if(op2==="-")numErr2=u5lin(A,-(p*s+q*r));
  var cands2=[u5frac(numErr2,u5par(1,-r)+u5par(1,-s)),
    u5frac(numBody,u5lin(2,-(r+s))),
    u5frac(""+(p+q),u5par(1,-r)+u5par(1,-s)),
    u5frac(numBody,u5par(1,-r))];
  return mcq("Add or subtract and simplify: \\("+expr2+"\\).",
    u5wrap(cor2),u5dis(cor2,cands2,3).map(u5wrap),
    "The denominators share no factor, so the lowest common denominator is \\("+u5par(1,-r)+u5par(1,-s)+"\\). Give each fraction that denominator, then combine the numerators: \\[ \\begin{aligned} "+expr2+" &= "+u5frac(p+u5par(1,-s),u5par(1,-r)+u5par(1,-s))+" "+op2+" "+u5frac(q+u5par(1,-r),u5par(1,-r)+u5par(1,-s))+" \\\\ &= "+u5frac(numBody,u5par(1,-r)+u5par(1,-s))+" \\end{aligned} \\] The numerator is \\("+numBody+"\\); it shares no factor with the denominator, so nothing cancels. The result is <b>\\("+cor2+"\\)</b>, for \\("+u5npvStr([r,s])+"\\).",
    {mode:mode,op:op2,p:p,q:q,r:r,s:s});
});
E("u6-pk-sign-statements",6,["7.34"], 1, "gen", function () {
  var q = pick([1, 2, 3, 4]);
  var deg = q === 1 ? ri(8, 82) : q === 2 ? ri(98, 172) : q === 3 ? ri(188, 262) : ri(278, 352);
  var stmts = [
    "\\(\\sin\\theta\\) and \\(\\cos\\theta\\) are both positive",
    "\\(\\sin\\theta\\) is positive and \\(\\cos\\theta\\) is negative",
    "\\(\\sin\\theta\\) and \\(\\cos\\theta\\) are both negative",
    "\\(\\sin\\theta\\) is negative and \\(\\cos\\theta\\) is positive"
  ];
  var corr = stmts[q - 1];
  var dis = stmts.filter(function (s) { return s !== corr; });
  var signs = q === 1 ? "both x and y are positive on the terminal arm, so sine and cosine are both positive"
    : q === 2 ? "x is negative and y is positive on the terminal arm, so sine is positive and cosine is negative"
    : q === 3 ? "both x and y are negative on the terminal arm, so sine and cosine are both negative"
    : "x is positive and y is negative on the terminal arm, so sine is negative and cosine is positive";
  return mcq("For \\(\\theta = " + deg + "^\\circ\\), which statement is true?",
    corr, dis,
    "The angle " + deg + "° terminates in Quadrant " + ["I", "II", "III", "IV"][q - 1] + ", where " + signs + ". The true statement is <b>" + corr + "</b>.",
    { deg: deg });
});
E("u7-pk-laws-integral",7,["4.27"],2,"gen",function(){
  var mode=ri(1,6);
  if(mode===1){
    var a=ri(2,9),b=ri(2,9),t=0;
    while((a*b===a+b||Math.abs(a-b)===a+b||a+b+1===a*b)&&t<100){a=ri(2,9);b=ri(2,9);t++;}
    var key="\\(x^{"+(a+b)+"}\\)";
    var ds=u2pickS3(key,["\\(x^{"+(a*b)+"}\\)","\\(x^{"+Math.abs(a-b)+"}\\)","\\(x^{"+(a+b+1)+"}\\)","\\(x^{"+(a+b-1)+"}\\)"]);
    return mcq("Simplify: \\(x^{"+a+"} \\times x^{"+b+"}\\)",
      key,ds,
      "When multiplying powers with the same base, add the exponents: \\["+
      "\\begin{aligned} x^{"+a+"} \\times x^{"+b+"} &= x^{"+a+" + "+b+"} \\\\ &= x^{"+(a+b)+"} \\end{aligned} \\]"+
      " The simplified form is <b>\\(x^{"+(a+b)+"}\\)</b>.",
      {mode:mode,a:a,b:b,keyStr:key});
  }
  if(mode===2){
    var a2=ri(5,12),b2=ri(2,10),t2=0;
    while((a2-b2<1||a2+b2===a2||a2-b2+1===a2)&&t2<100){a2=ri(5,12);b2=ri(2,a2-2);t2++;}
    var key2="\\(x^{"+(a2-b2)+"}\\)";
    var ds2=u2pickS3(key2,["\\(x^{"+(a2+b2)+"}\\)","\\(x^{"+a2+"}\\)","\\(x^{"+(a2-b2+1)+"}\\)","\\(x^{"+(a2*b2)+"}\\)"]);
    return mcq("Simplify: \\("+FR("x^{"+a2+"}","x^{"+b2+"}")+"\\)",
      key2,ds2,
      "When dividing powers with the same base, subtract the exponents: \\["+
      "\\begin{aligned} "+FR("x^{"+a2+"}","x^{"+b2+"}")+" &= x^{"+a2+" - "+b2+"} \\\\ &= x^{"+(a2-b2)+"} \\end{aligned} \\]"+
      " The simplified form is <b>\\(x^{"+(a2-b2)+"}\\)</b>.",
      {mode:mode,a:a2,b:b2,keyStr:key2});
  }
  if(mode===3){
    var a3=ri(2,4),b3=ri(2,4);
    if(a3===2&&b3===2)a3=3;
    var key3="\\(x^{"+(a3*b3)+"}\\)";
    var ds3=u2pickS3(key3,["\\(x^{"+(a3+b3)+"}\\)","\\(x^{"+Math.pow(a3,b3)+"}\\)","\\(x^{"+Math.pow(b3,a3)+"}\\)","\\(x^{"+(a3*b3+2)+"}\\)"]);
    return mcq("Simplify: \\(\\left(x^{"+a3+"}\\right)^{"+b3+"}\\)",
      key3,ds3,
      "When a power is raised to a power, multiply the exponents: \\["+
      "\\begin{aligned} \\left(x^{"+a3+"}\\right)^{"+b3+"} &= x^{"+a3+" \\times "+b3+"} \\\\ &= x^{"+(a3*b3)+"} \\end{aligned} \\]"+
      " The simplified form is <b>\\(x^{"+(a3*b3)+"}\\)</b>.",
      {mode:mode,a:a3,b:b3,keyStr:key3});
  }
  if(mode===4){
    var a4=ri(2,6);
    var key4="\\(x^{"+a4+"}y^{"+a4+"}\\)";
    var ds4=u2pickS3(key4,["\\(x^{"+a4+"}y\\)","\\(xy^{"+a4+"}\\)","\\((xy)^{"+(a4*a4)+"}\\)"]);
    return mcq("Simplify: \\((xy)^{"+a4+"}\\)",
      key4,ds4,
      "A power of a product applies the exponent to each factor: \\["+
      "\\begin{aligned} (xy)^{"+a4+"} &= x^{"+a4+"}y^{"+a4+"} \\end{aligned} \\]"+
      " The simplified form is <b>\\(x^{"+a4+"}y^{"+a4+"}\\)</b>.",
      {mode:mode,a:a4,keyStr:key4});
  }
  if(mode===5){
    var a5=ri(3,8),b5=ri(3,8),c5=ri(3,8),d5=ri(3,8);
    var key5="\\(x^{"+(a5+c5)+"}y^{"+(b5+d5)+"}\\)";
    var ds5=u2pickS3(key5,["\\(x^{"+(a5*c5)+"}y^{"+(b5*d5)+"}\\)","\\(x^{"+(a5+c5)+"}y^{"+(b5*d5)+"}\\)","\\(x^{"+(a5*c5)+"}y^{"+(b5+d5)+"}\\)","\\(x^{"+Math.abs(a5-c5)+"}y^{"+(b5+d5)+"}\\)"]);
    return mcq("Simplify: \\(x^{"+a5+"}y^{"+b5+"} \\times x^{"+c5+"}y^{"+d5+"}\\)",
      key5,ds5,
      "Group the powers base by base and add exponents for each base: \\["+
      "\\begin{aligned} x^{"+a5+"}y^{"+b5+"} \\times x^{"+c5+"}y^{"+d5+"} &= x^{"+a5+" + "+c5+"}y^{"+b5+" + "+d5+"} \\\\ &= x^{"+(a5+c5)+"}y^{"+(b5+d5)+"} \\end{aligned} \\]"+
      " The simplified form is <b>\\(x^{"+(a5+c5)+"}y^{"+(b5+d5)+"}\\)</b>.",
      {mode:mode,a:a5,b:b5,c:c5,d:d5,keyStr:key5});
  }
  var b6=ri(2,8),c6=pick([3,4,5,6,7]);
  var key6="\\("+c6+"y^{"+b6+"}\\)";
  var ds6=u2pickS3(key6,["\\(0\\)","\\("+c6+"xy^{"+b6+"}\\)","\\(y^{"+b6+"}\\)"]);
  return mcq("Simplify: \\("+c6+"x^0y^{"+b6+"}\\)",
    key6,ds6,
    "Any nonzero base to the exponent \\(0\\) equals \\(1\\), so \\(x^0 = 1\\) and the factor \\(x\\) drops out without changing the coefficient: \\["+
    "\\begin{aligned} "+c6+"x^0y^{"+b6+"} &= "+c6+"(1)y^{"+b6+"} \\\\ &= "+c6+"y^{"+b6+"} \\end{aligned} \\]"+
    " The simplified form is <b>\\("+c6+"y^{"+b6+"}\\)</b>.",
    {mode:mode,b:b6,c:c6,keyStr:key6});
});
E("u7-pk-laws-rational",7,["4.27"],2,"gen",function(){
  var base=pick(["x","y","z","t"]),mode=ri(1,3);
  var p=ri(1,7),q=pick([2,3,4,5,6]),r=ri(1,7),s=pick([2,3,4,5,6]),t=0;
  while(t<200){var rr1=u2red(p,q),rr2=u2red(r,s);if(rr1[1]>=2&&rr2[1]>=2)break;p=ri(1,7);q=pick([2,3,4,5,6]);r=ri(1,7);s=pick([2,3,4,5,6]);t++;}
  p=rr1[0];q=rr1[1];r=rr2[0];s=rr2[1];
  var eN,eD,lawText,exprStr;
  if(mode===1){eN=p*s+r*q;eD=q*s;lawText="When multiplying powers with the same base, add the exponents. Use a common denominator of \\("+(q*s)+"\\)";
    exprStr=base+"^{"+FR(p,q)+"} \\times "+base+"^{"+FR(r,s)+"}";}
  else if(mode===2){eN=p*s-r*q;eD=q*s;var t2=0;while(eN===0&&t2<50){r=ri(1,7);var rr3=u2red(r,s);r=rr3[0];s=rr3[1];eN=p*s-r*q;eD=q*s;t2++;}
    lawText="When dividing powers with the same base, subtract the exponents. Use a common denominator of \\("+(q*s)+"\\)";
    exprStr=FR(base+"^{"+FR(p,q)+"}",base+"^{"+FR(r,s)+"}");}
  else{var kk=pick([2,3]);eN=p*kk;eD=q;lawText="When a power is raised to a power, multiply the exponents";
    exprStr="\\left("+base+"^{"+FR(p,q)+"}\\right)^{"+kk+"}";}
  var er=u2red(eN,eD);eN=er[0];eD=er[1];
  var key=u2expStr(base,eN,eD);
  var candPairs;
  if(mode===1)candPairs=[[p*s-r*q,q*s],[p*r,q*s],[eN+eD,eD],[eN,eD+1]];
  else if(mode===2)candPairs=[[p*s+r*q,q*s],[p*r,q*s],[eN+eD,eD],[eN,eD+1]];
  else candPairs=[[p*2,q],[p*3,q],[p+1,q]];
  var seenV={},ds=[];
  candPairs.forEach(function(pr){
    if(ds.length>=3)return;
    var cr=u2red(pr[0],pr[1]);
    if(cr[0]*eD===eN*cr[1])return;
    var vk=cr[0]+"/"+cr[1];if(seenV[vk])return;seenV[vk]=1;
    ds.push(u2expStr(base,cr[0],cr[1]));
  });
  var pad=2;while(ds.length<3){var cr2=u2red(eN+pad*eD,eD);ds.push(u2expStr(base,cr2[0],cr2[1]));pad++;}
  return mcq("Simplify: \\("+exprStr+"\\)",
    key,ds,
    lawText+": \\[ \\begin{aligned} "+exprStr+" &= "+(key.slice(2,-2))+" \\end{aligned} \\]"+
    " The simplified form is <b>"+key+"</b>.",
    {mode:mode,base:base,p:p,q:q,r:r,s:s,eN:eN,eD:eD,keyStr:key});
});
E("u7-pk-negative-exp",7,["4.27"],1,"gen",function(){
  var mode=ri(1,4);
  var pattern="The pattern behind negative exponents comes from dividing by the base at each step: as the exponent drops by \\(1\\), the value is divided by the base. Continuing the pattern past zero gives reciprocals, so \\(a^{-n} = "+FR(1,"a^n")+"\\) for \\(a \\ne 0\\). ";
  if(mode===1){
    var a=ri(2,30),n=pick([2,2,3,3,4]);if(n===4)a=ri(2,12);
    var ans=Math.pow(a,n);
    return numq("When \\("+a+"^{-"+n+"}\\) is written in the form \\("+FR(1,"k")+"\\), what is the value of \\(k\\)?",
      ans,0.001,
      pattern+"Here \\["+"\\begin{aligned} "+a+"^{-"+n+"} &= "+FR(1,a+"^"+n)+" \\\\ &= "+FR(1,ans)+" \\end{aligned} \\]"+
      " So the value of \\(k\\) is <b>\\("+ans+"\\)</b>.",
      {mode:mode,a:a,n:n,ans:ans});
  }
  if(mode===2){
    var a2=ri(2,15),n2=ri(2,3),ans2=Math.pow(a2,n2);
    return numq("Evaluate \\(\\left("+FR(1,a2)+"\\right)^{-"+n2+"}\\).",
      ans2,0.001,
      pattern+"A negative exponent on a fraction flips the fraction first: \\["+
      "\\begin{aligned} \\left("+FR(1,a2)+"\\right)^{-"+n2+"} &= "+a2+"^{"+n2+"} \\\\ &= "+ans2+" \\end{aligned} \\]"+
      " The value is <b>\\("+ans2+"\\)</b>.",
      {mode:mode,a:a2,n:n2,ans:ans2});
  }
  if(mode===3){
    var a3=pick([2,4,5,8,10,20,25]),n3=ri(1,3);
    var ans3=Math.round((1/Math.pow(a3,n3))*1e10)/1e10;
    return numq("Evaluate \\("+a3+"^{-"+n3+"}\\). Give the exact decimal value.",
      ans3,0.001,
      pattern+"Here \\["+"\\begin{aligned} "+a3+"^{-"+n3+"} &= "+FR(1,Math.pow(a3,n3))+" \\\\ &= "+ans3+" \\end{aligned} \\]"+
      " The value is <b>\\("+ans3+"\\)</b>.",
      {mode:mode,a:a3,n:n3,ans:ans3});
  }
  var a4=ri(2,30),n4=ri(2,12);
  return numq("When \\("+FR(1,a4+"^{"+n4+"}")+"\\) is written as a single power of \\("+a4+"\\), what is the exponent?",
    -n4,0.001,
    pattern+"The reciprocal \\("+FR(1,a4+"^{"+n4+"}")+"\\) is the power with the exponent negated: \\("+a4+"^{-"+n4+"}\\). The exponent is <b>\\(-"+n4+"\\)</b>.",
    {mode:mode,a:a4,n:n4,ans:-n4});
});
E("u7-pk-recip-features",7,["4.27"],2,"gen",function(){
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
E("u7-pk-reciprocal-values",7,["4.27"],1,"gen",function(){
  var fr=function(p,q){return "\\(\\frac{"+p+"}{"+q+"}\\)";};
  var frI=function(p,q){return "\\frac{"+p+"}{"+q+"}";};
  var mode=ri(0,2);
  if(mode===0){
    var n=pick([-10,-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9,10]);
    var keyIn= n>0 ? frI(1,n) : "-"+frI(1,-n);
    var oppIn= n>0 ? "-"+frI(1,n) : frI(1,-n);
    return mcq("A function table gives \\(f(3) = "+n+"\\). What is \\(\\frac{1}{f(3)}\\)?",
      "\\("+keyIn+"\\)",
      ["\\("+n+"\\)","\\("+(-n)+"\\)","\\("+oppIn+"\\)"],
      "The reciprocal of a number flips it over and keeps its sign: \\(\\frac{1}{"+n+"} = "+keyIn+"\\). A small number has a large reciprocal, and a negative number has a negative reciprocal. The answer is <b>\\("+keyIn+"\\)</b>.",
      {mode:"integer",n:n});
  }
  if(mode===1){
    var k=pick([2,3,4,5,6,8,10]);
    return mcq("A function table gives \\(f(5) = "+frI(1,k)+"\\). What is \\(\\frac{1}{f(5)}\\)?",
      "\\("+k+"\\)",
      [fr(1,k),"\\("+(-k)+"\\)",fr(1,k*k)],
      "The reciprocal of \\("+frI(1,k)+"\\) flips it over: \\(\\frac{1}{1/"+k+"} = "+k+"\\). A number smaller than 1 has a reciprocal larger than 1. The answer is <b>\\("+k+"\\)</b>.",
      {mode:"unit-fraction",k:k});
  }
  var pair=pick([[2,3],[2,5],[3,4],[3,5],[4,5],[2,7],[3,7],[5,6],[5,8],[4,7]]);
  var p=pair[0],q=pair[1];
  return mcq("A function table gives \\(f(2) = -"+frI(p,q)+"\\). What is \\(\\frac{1}{f(2)}\\)?",
    "\\(-"+frI(q,p)+"\\)",
    [fr(q,p),"\\(-"+frI(p,q)+"\\)",fr(p,q)],
    "The reciprocal of \\(-"+frI(p,q)+"\\) flips the fraction over and keeps the negative sign: the reciprocal is \\(-"+frI(q,p)+"\\). The answer is <b>\\(-"+frI(q,p)+"\\)</b>.",
    {mode:"fraction",p:p,q:q});
}, ["The reciprocal flips the number over.", "The sign does not change when you take a reciprocal."]);
E("u8-pk-rational-exp",8,["1.1"],1,"gen",function(){
  var n=ri(2,6),m=ri(1,9),t=0;
  while((u2gcd(m,n)!==1||m===n)&&t<200){m=ri(1,9);n=ri(2,6);t++;}
  var b=ri(2,25),mode=ri(1,2);
  function radPow(bb,mm,nn){
    if(mm===1)return u2radS(nn,bb);
    if(nn===2)return "\\sqrt{"+bb+"^"+mm+"}";
    return "\\sqrt["+nn+"]{"+bb+"^"+mm+"}";
  }
  if(mode===1){
    var key="\\("+radPow(b,m,n)+"\\)";
    var cands=[];
    if(m>1)cands.push("\\("+u2radS(n,b)+"\\)");
    cands.push("\\("+radPow(b,m,n+1)+"\\)");
    cands.push("\\("+radPow(b,m+1,n)+"\\)");
    if(m>=2)cands.push("\\("+radPow(b,n,m)+"\\)");
    cands.push("\\("+radPow(b,1,n)+"\\)");
    cands.push("\\("+radPow(b,m,n+2)+"\\)");
    var ds=u2pickS3(key,cands);
    return mcq("Express \\("+b+"^{"+FR(m,n)+"}\\) as a radical.",
      key,ds,
      "In a rational exponent, the denominator is the index of the root and the numerator is the power: \\["+
      "\\begin{aligned} "+b+"^{"+FR(m,n)+"} &= \\left("+u2radS(n,b)+"\\right)^"+m+" \\\\ &= "+radPow(b,m,n)+" \\end{aligned} \\]"+
      " As a radical, the expression is <b>\\("+radPow(b,m,n)+"\\)</b>.",
      {mode:mode,b:b,m:m,n:n,keyStr:key});
  }
  var key2="\\("+b+"^{"+FR(m,n)+"}\\)";
  var cands2=["\\("+b+"^{"+FR(n,m)+"}\\)","\\("+b+"^{"+FR(m+1,n)+"}\\)","\\("+b+"^{"+FR(m,n+1)+"}\\)","\\("+b+"^{"+(m*n)+"}\\)","\\("+b+"^{"+FR(m+2,n)+"}\\)"];
  if(m===1)cands2=cands2.filter(function(s){return s!==key2;});
  var ds2=u2pickS3(key2,cands2);
  return mcq("Express \\("+radPow(b,m,n)+"\\) as a power with a rational exponent.",
    key2,ds2,
    "The index of the root becomes the denominator of the exponent and the power on the radicand becomes the numerator: \\["+
    "\\begin{aligned} "+radPow(b,m,n)+" &= \\left("+b+"^"+m+"\\right)^{"+FR(1,n)+"} \\\\ &= "+b+"^{"+FR(m,n)+"} \\end{aligned} \\]"+
    " As a power, the expression is <b>\\("+b+"^{"+FR(m,n)+"}\\)</b>.",
    {mode:mode,b:b,m:m,n:n,keyStr:key2});
});
E("u8-pk-rational-pattern",8,["1.1"],1,"var",varset([
  function(){var key="The denominator \\(3\\) names the root and the numerator \\(2\\) names the power: \\(\\left(\\sqrt[3]{8}\\right)^2 = 2^2 = 4\\)";
    return mcq("Which explanation correctly shows why \\(8^{"+FR(2,3)+"}\\) equals \\(4\\)?",
    key,
    ["The numerator \\(2\\) names the root and the denominator \\(3\\) names the power: \\(\\left(\\sqrt{8}\\right)^3\\) is about \\(4\\)",
     "The fraction \\("+FR(2,3)+"\\) means divide \\(8\\) by \\(3\\) and then round the result up to the whole number \\(4\\)",
     "The exponent means multiply \\(8\\) by itself \\(2\\) times and then divide the answer \\(64\\) by the number \\(3\\)"],
    "Use the pattern from the exponent laws: \\(8^{"+FR(1,3)+"}\\) must satisfy \\(\\left(8^{"+FR(1,3)+"}\\right)^3 = 8\\), so \\(8^{"+FR(1,3)+"} = \\sqrt[3]{8} = 2\\). Raising to the numerator power gives \\(2^2 = 4\\). Numeric check: \\(\\left(\\sqrt[3]{8}\\right)^2 = 2^2 = 4\\), matching \\(8^{"+FR(2,3)+"}\\). The denominator names the root and the numerator names the power, giving <b>\\(4\\)</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Raising \\(a^{"+FR(1,"n")+"}\\) to the power \\(n\\) must give \\(a\\), so \\(a^{"+FR(1,"n")+"}\\) is the \\(n\\)th root of \\(a\\); raising that root to \\(m\\) gives the value";
    return mcq("A student asks why \\(a^{"+FR("m","n")+"} = \\left(\\sqrt[n]{a}\\right)^m\\). Which explanation uses the exponent laws correctly?",
    key,
    ["The fraction \\("+FR("m","n")+"\\) means the base \\(a\\) is multiplied by \\(m\\) and then divided by \\(n\\), and roots are just a shorter way to write that division",
     "The exponent laws say exponents in a fraction cancel out, so \\(a^{"+FR("m","n")+"}\\) is the same as \\(a\\), and the root form is only a different notation for \\(a\\)",
     "A root is defined as any fractional exponent, so the equality holds by definition and no exponent law is needed"],
    "By the power law, \\(\\left(a^{"+FR(1,"n")+"}\\right)^n = a^{"+FR(1,"n")+" \\times n} = a^1 = a\\). The only positive quantity raised to the power \\(n\\) that gives \\(a\\) is \\(\\sqrt[n]{a}\\), so \\(a^{"+FR(1,"n")+"} = \\sqrt[n]{a}\\). Then \\(a^{"+FR("m","n")+"} = \\left(a^{"+FR(1,"n")+"}\\right)^m = \\left(\\sqrt[n]{a}\\right)^m\\). Numeric check with \\(a = 27\\), \\(m = 2\\), \\(n = 3\\): \\(\\left(\\sqrt[3]{27}\\right)^2 = 3^2 = 9 = 27^{"+FR(2,3)+"}\\). The pattern is: <b>the \\(n\\)th root comes from the denominator, then raise to the numerator power</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Since \\(3^3 = 27\\), the cube root part gives \\(3\\), and the numerator power then gives \\(3^2 = 9\\), so both sides match";
    return mcq("Which statement best explains, using a pattern, why \\(27^{"+FR(2,3)+"}\\) equals \\(\\left(\\sqrt[3]{27}\\right)^2\\)?",
    key,
    ["Since \\(9^2 = 81\\), the square part gives \\(9\\), and the denominator root then adjusts the answer \\(81\\) back down to \\(9\\)",
     "Since \\(27\\) divided by \\(3\\) is \\(9\\), the denominator acts as a plain divisor in the calculation",
     "Since \\(2^3 = 8\\), the powers \\(2\\) and \\(3\\) trade places, and swapping them in any base gives the same value as the root form"],
    "Follow the denominator first: \\(27^{"+FR(1,3)+"} = \\sqrt[3]{27} = 3\\), because \\(3^3 = 27\\). The numerator then says to square: \\(3^2 = 9\\). So \\(27^{"+FR(2,3)+"} = \\left(\\sqrt[3]{27}\\right)^2 = 9\\), and the numeric check confirms the pattern: <b>root first from the denominator, then the numerator power, giving \\(9\\)</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The fourth root of \\(16\\) is \\(2\\), because \\(2^4 = 16\\), and cubing that root gives \\(2^3 = 8\\), which matches the power";
    return mcq("Which explanation correctly shows why \\(16^{"+FR(3,4)+"}\\) equals \\(8\\)?",
    key,
    ["The square root of \\(16\\) is \\(4\\), because \\(4^2 = 16\\), and raising that root to \\(4\\) gives a value near \\(8\\)",
     "The fraction \\("+FR(3,4)+"\\) of \\(16\\) is \\(12\\), and subtracting the denominator \\(4\\) from that part gives the stated answer \\(8\\)",
     "The cube of \\(16\\) is very large, and taking the fourth root of that cube brings the value back down close to the number \\(8\\)"],
    "The denominator \\(4\\) names a fourth root: \\(\\sqrt[4]{16} = 2\\) since \\(2^4 = 16\\). The numerator \\(3\\) then cubes it: \\(2^3 = 8\\). Numeric check: \\(\\left(\\sqrt[4]{16}\\right)^3 = 2^3 = 8 = 16^{"+FR(3,4)+"}\\). The value is <b>\\(8\\)</b>, from the root named by the denominator followed by the power named by the numerator.",
    {stmt:true,keyText:key});}
]));
E("u8-pk-evaluate-exp",8,["1.1"],1,"gen",function(){
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
E("u8-pk-product-law",8,["1.1"], 1, "gen", function () {
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
E("u8-pk-sqrt-eval",8,["1.1"],1,"gen",function(){
  var a=ri(3,15);
  if(ri(0,1)===0){
    return mcq("What is \\(\\sqrt{(-"+a+")^2}\\)?",
      "\\("+a+"\\)",
      ["\\("+(-a)+"\\)","\\("+(a*a)+"\\)","\\("+(-(a*a))+"\\)"],
      "Squaring \\(-"+a+"\\) gives \\((-"+a+")^2 = "+(a*a)+"\\), and the square root then returns the size of the number: \\(\\sqrt{"+(a*a)+"} = "+a+"\\). The answer is <b>\\("+a+"\\)</b>.",
      {mode:"root-of-square",a:a,ans:a});
  }
  return mcq("What is \\((-"+a+")^2\\)?",
    "\\("+(a*a)+"\\)",
    ["\\("+(-(a*a))+"\\)","\\("+a+"\\)","\\("+(2*a)+"\\)"],
    "A negative number squared gives a positive result: \\((-"+a+")^2 = (-"+a+") \\times (-"+a+") = "+(a*a)+"\\). The answer is <b>\\("+(a*a)+"\\)</b>.",
    {mode:"square-of-negative",a:a,ans:a*a});
}, ["Work out the square first, then the root.", "Squaring a negative number gives a positive result."]);
E("u9-pk-binom-expand",9,["3.14"], 2, "gen", function () {
  var A = [ri(1, 3), u3Nz(-5, 5)];
  var B = [ri(1, 3), u3Nz(-5, 5), u3Nz(-6, 6)];
  var prod = u3Conv(A, B), keyRaw = u3PC(prod, "x");
  var partials = u3Mul(u3TermsOf(A, "x"), u3TermsOf(B, "x"));
  var prompt = "Expand and simplify \\(" + u3Par(A, "x") + u3Par(B, "x") + "\\).";
  var sol = "Multiply each term of the binomial by each of the three terms of the trinomial, giving six partial products, then combine like terms." +
    u3Alg([u3Par(A, "x") + u3Par(B, "x") + " &= " + u3StrSeq(partials), "&= " + keyRaw]) +
    "The expanded form is **" + u3M(keyRaw) + "**.";
  return mcq(prompt, u3M(keyRaw), u3DistrCoeffs(prod, "x", 3), sol,
    { t: "expand", P: u3TermsOf(A, "x"), Q: u3TermsOf(B, "x") });
});
E("u9-pk-monomial-expand",9,["3.14"], 1, "gen", function () {
  var mode = ri(0, 2), P, Q, pdesc;
  if (mode === 0) {
    var a = u3Nz(-6, 6); if (Math.abs(a) < 2) a = a < 0 ? -3 : 3;
    var k = ri(1, 2), p = ri(1, 4), q = u3Nz(-7, 7);
    P = [[a, k, 0]]; Q = [[p, 1, 0], [q, 0, 0]];
    pdesc = u3Str(P) + u3Par([p, q], "x");
  } else if (mode === 1) {
    var a2 = u3Nz(-5, 5); if (Math.abs(a2) < 2) a2 = a2 < 0 ? -2 : 2;
    var p2 = ri(1, 3), q2 = u3Nz(-6, 6), r2 = u3Nz(-8, 8);
    P = [[a2, 1, 0]]; Q = [[p2, 2, 0], [q2, 1, 0], [r2, 0, 0]];
    pdesc = u3Str(P) + u3Par([p2, q2, r2], "x");
  } else {
    var a3 = u3Nz(-5, 5); if (Math.abs(a3) < 2) a3 = a3 < 0 ? -4 : 4;
    var p3 = ri(1, 3), q3 = u3Nz(-4, 4);
    P = [[a3, 1, 1]]; Q = [[p3, 1, 0], [q3, 0, 1]];
    pdesc = u3Str(P) + "(" + u3Str(Q) + ")";
  }
  var partials = u3Mul(P, Q), keyRaw = u3Str(partials);
  var seen = {}, distr = [];
  shuffle(u3PerturbTerms(partials)).forEach(function (s) {
    if (s !== keyRaw && !seen[s]) { seen[s] = 1; distr.push(u3M(s)); }
  });
  var prompt = "Expand and simplify \\(" + pdesc + "\\).";
  var sol = "Multiply the monomial by every term inside the brackets." +
    u3Alg([pdesc + " &= " + u3StrSeq(partials), "&= " + keyRaw]) +
    "The expanded form is **" + u3M(keyRaw) + "**.";
  return mcq(prompt, u3M(keyRaw), distr.slice(0, 3), sol, { t: "expand", P: P, Q: Q });
});
E("u9-pk-binomial-expand",9,["3.14"], 2, "gen", function () {
  var v = pick(["x", "x", "y"]);
  var A = [ri(1, 3), u3Nz(-6, 6)], B = [ri(1, 3), u3Nz(-6, 6)];
  var prod = u3Conv(A, B), keyRaw = u3PC(prod, v);
  var partials = u3Mul(u3TermsOf(A, v), u3TermsOf(B, v));
  var prompt = "Expand and simplify \\(" + u3Par(A, v) + u3Par(B, v) + "\\).";
  var sol = "Multiply each term of the first binomial by each term of the second binomial, then combine like terms." +
    u3Alg([u3Par(A, v) + u3Par(B, v) + " &= " + u3StrSeq(partials), "&= " + keyRaw]) +
    "The expanded form is **" + u3M(keyRaw) + "**.";
  return mcq(prompt, u3M(keyRaw), u3DistrCoeffs(prod, v, 3), sol,
    { t: "expand", P: u3TermsOf(A, v), Q: u3TermsOf(B, v) });
});
E("u9-bridge-codes", 9, ["9.1"], 2, "gen", function(){
  var A=ri(3,6), B=ri(4,9), C=ri(3,6), AB=A*B, N=AB*C;
  return numq("A code has three positions. The first position can be any of "+A+" letters, the second position can be any of "+B+" digits, and the third position can be any of "+A+" letters. How many different codes are there?",
    N, 0,
    "Work through the positions in order. For each of the "+A+" choices for the first letter, there are "+B+" choices for the digit, so the first two positions can be filled in "+A+" × "+B+" = "+AB+" ways. For each of those "+AB+" starts, there are "+C+" choices for the last letter, giving "+AB+" × "+C+" = <b>"+N+"</b> codes in all.",
    {A:A,B:B,C:C});
}, ["Take one position at a time: how many choices are there for the first position, then for the second?", "Each choice for one position can be paired with every choice for the next position."]);
E("u9-bridge-lineup", 9, ["9.1"], 2, "gen", function(){
  var n=ri(3,5), facts=[], p=1;
  for(var k=n;k>=1;k--){ facts.push(k); p*=k; }
  return numq(n+" different books are placed in a row on a shelf. How many different orders can the books be in?",
    p, 0,
    "Fill the spots one at a time. There are "+n+" choices for the first spot. Once one book is placed, "+(n-1)+" books remain for the second spot, and the choices keep dropping by one as the row fills. Writing the counts in order gives "+facts.join(" × ")+" = <b>"+p+"</b> different orders.",
    {n:n});
}, ["How many choices are there for the first spot? After one book is placed, how many remain for the second?", "Keep going spot by spot until the row is full, then combine the counts."]);
E("u9-bridge-tree", 9, ["9.1"], 2, "gen", function(){
  var s=ri(3,5), N=s*2;
  var d3=(s*s===s*3)?(2*s+2):(s*s);
  var key={t:String(N), fb:"Yes. The tree has "+s+" branches for the spinner, and each one splits into 2 for the coin, giving "+s+" × 2 = "+N+" combined outcomes."};
  var ds=[{t:String(s+2), fb:"That adds the two counts. In a tree diagram, each spinner outcome is paired with both coin outcomes, so the counts combine by multiplying, not adding."},
          {t:String(s*3), fb:"That uses 3 coin outcomes, but a coin has only 2 outcomes: heads and tails."},
          {t:String(d3), fb:"That uses the spinner's count again for the second stage, but the second stage is the coin, which has only 2 outcomes."}];
  return mcq("A spinner has "+s+" equal sections. A tree diagram is drawn to list every combined outcome of spinning the spinner once and tossing a coin. How many combined outcomes does the tree have?",
    key, ds,
    "The tree begins with "+s+" branches, one for each section of the spinner. From the end of each spinner branch, the coin adds 2 branches, heads and tails, so each spinner outcome leads to 2 combined outcomes. In all there are "+s+" × 2 = <b>"+N+"</b> combined outcomes.",
    {s:s});
}, ["How many branches does the tree start with, one for each spinner section?", "From each spinner branch, how many coin branches grow?"]);
E("u9-bridge-places", 9, ["9.1"], 2, "gen", function(){
  var r=ri(5,8), N=r*(r-1)*(r-2);
  return numq("A race has "+r+" runners. In how many different ways can first place, second place and third place be filled?",
    N, 0,
    "Fill the places in order. There are "+r+" choices for first place. Once the winner is set, "+(r-1)+" runners remain for second place, and then "+(r-2)+" runners remain for third place. Writing the counts in order gives "+r+" × "+(r-1)+" × "+(r-2)+" = <b>"+N+"</b> different ways.",
    {r:r});
}, ["How many choices are there for first place? Once the winner is set, how many runners are left for second?", "A runner who has placed cannot place again, so the count drops by one at each step."]);

var PK3200_FOR_C1=["1.1","1.2","1.3","1.4","1.5","1.6","1.7","1.8"];
var PK3200_FOR_C2=["3.1","3.2","3.3","3.4","3.5","3.6","3.7","3.8","3.9","3.10","3.11","3.12","3.13"];
var PK3200_FOR_C3=["3.14","3.15","3.16","3.17","3.18","3.19"];
var PK3200_FOR_C4=["4.1","4.2","4.3","4.4","4.5","4.6","4.7","4.8","4.9","4.10","4.11","4.12","4.13","4.14","4.15","4.16","4.17","4.18","4.19","4.20","4.21","4.22","4.23","4.24","4.40","4.41","4.42","4.43","4.44","4.45","4.46","4.47"];
var PK3200_FOR_C5=["4.25","4.26","4.27","4.28","4.29","4.30","4.31","4.32","4.33","4.34","4.35","4.36","4.37","4.38","4.39","4.48","4.49"];
var PK3200_FOR_C6=["7.1","7.2","7.3","7.4","7.5","7.6","7.7","7.8","7.9","7.10","7.11","7.12","7.13","7.14","7.15","7.16","7.17","7.18","7.19"];
var PK3200_FOR_C7=["7.20","7.21","7.22","7.23","7.24","7.25","7.26","7.27","7.28","7.29","7.30","7.31","7.32","7.33","7.34","7.35","7.36","7.37","7.38","7.39","7.40","7.41","7.42","7.43","7.44","7.45","7.46"];
var PK3200_FOR_C8=["9.1","9.2","9.3","9.4","9.5","9.6","9.7","9.8","9.9","9.10","9.11","9.12","9.13","9.14","9.15"];
var PKT3200={
  "u1-pk-factor-common":{src:"Math 2200 indicator 3.14",group:"factoring",for:PK3200_FOR_C2},
  "u1-pk-factor-trinomial":{src:"Math 2200 indicator 3.15",group:"factoring",for:PK3200_FOR_C2},
  "u1-pk-factor-nonmonic":{src:"Math 2200 indicator 3.15",group:"factoring",for:PK3200_FOR_C2},
  "u1-pk-factor-test":{src:"Math 2200 indicator 3.16",group:"factoring",for:PK3200_FOR_C2},
  "u1-pk-solve-strategies":{src:"Math 2200 indicator 4.10",group:"solve-quadratic",for:PK3200_FOR_C2},
  "u1-pk-discriminant-k":{src:"Math 2200 indicator 4.14",group:"solve-quadratic",for:PK3200_FOR_C2},
  "u2-pk-vertex-read":{src:"Math 2200 indicator 4.38",group:"transformations",for:PK3200_FOR_C4},
  "u2-pk-vertex-standard":{src:"Math 2200 indicator 4.32",group:"transformations",for:PK3200_FOR_C4},
  "u2-pk-complete-square":{src:"Math 2200 indicators 4.43 and 4.45",group:"transformations",for:PK3200_FOR_C4},
  "u2-pk-npv-basic":{src:"Math 2200 indicators 3.1 and 3.2",group:"undefined-values",for:PK3200_FOR_C4},
  "u2-pk-npv-quadratic":{src:"Math 2200 indicator 3.2",group:"undefined-values",for:PK3200_FOR_C4},
  "u3-pk-defined-values":{src:"Math 2200 indicator 1.12",group:"definedness",for:PK3200_FOR_C5},
  "u3-pk-solve-radical":{src:"Math 2200 indicators 1.16 and 1.17",group:"radical-equations",for:PK3200_FOR_C4},
  "u3-pk-verify-roots":{src:"Math 2200 indicator 1.18",group:"radical-equations",for:PK3200_FOR_C4},
  "u3-pk-extraneous-why":{src:"Math 2200 indicator 1.19",group:"radical-equations",for:PK3200_FOR_C4},
  "u3-pk-which-is-solution":{src:"Math 2200 indicator 1.18",group:"verify-solution",for:PK3200_FOR_C4},
  "u4-pk-read-sketch":{src:"Math 2200 indicator 7.7",group:"trig-ratios",for:PK3200_FOR_C6},
  "u4-pk-same-reference":{src:"Math 2200 indicators 7.10 and 7.11",group:"trig-ratios",for:PK3200_FOR_C6},
  "u4-pk-point-distance":{src:"Math 2200 indicator 7.14",group:"trig-ratios",for:PK3200_FOR_C6},
  "u4-pk-point-ratios":{src:"Math 2200 indicator 7.15",group:"trig-ratios",for:PK3200_FOR_C6},
  "u4-pk-exact-values":{src:"Math 2200 indicator 7.20",group:"trig-ratios",for:PK3200_FOR_C6},
  "u4-pk-solve-equation":{src:"Math 2200 indicator 7.19",group:"trig-ratios",for:PK3200_FOR_C6},
  "u5-pk-effect-of-a":{src:"Math 2200 indicator 4.29",group:"transformations",for:PK3200_FOR_C7},
  "u5-pk-translations":{src:"Math 2200 indicators 4.30 and 4.31",group:"transformations",for:PK3200_FOR_C7},
  "u5-pk-simplify-basic":{src:"Math 2200 indicator 3.5",group:"rational-expressions",for:PK3200_FOR_C7},
  "u5-pk-lcd-choose":{src:"Math 2200 indicator 3.11",group:"rational-expressions",for:PK3200_FOR_C7},
  "u5-pk-complex-fraction":{src:"Math 2200 indicator 3.13",group:"rational-expressions",for:PK3200_FOR_C7},
  "u6-pk-simplify-trinomial":{src:"Math 2200 indicators 3.5 and 3.6",group:"rational-expressions",for:PK3200_FOR_C7},
  "u6-pk-multiply":{src:"Math 2200 indicator 3.8",group:"rational-expressions",for:PK3200_FOR_C7},
  "u6-pk-divide":{src:"Math 2200 indicator 3.9",group:"rational-expressions",for:PK3200_FOR_C7},
  "u6-pk-add-subtract":{src:"Math 2200 indicators 3.11 and 3.12",group:"rational-expressions",for:PK3200_FOR_C7},
  "u6-pk-sign-statements":{src:"Math 2200 indicator 7.16",group:"trig-ratios",for:PK3200_FOR_C7},
  "u7-pk-laws-integral":{src:"Math 1201 indicator 1.6",group:"exponent-laws",for:PK3200_FOR_C5},
  "u7-pk-laws-rational":{src:"Math 1201 indicator 1.6",group:"exponent-laws",for:PK3200_FOR_C5},
  "u7-pk-negative-exp":{src:"Math 1201 indicator 1.5",group:"exponent-laws",for:PK3200_FOR_C5},
  "u7-pk-recip-features":{src:"Math 2200 indicators 4.33 and 4.34",group:"domain-range",for:PK3200_FOR_C5},
  "u7-pk-reciprocal-values":{src:"Math 2200 indicator 4.33",group:"reciprocal-values",for:PK3200_FOR_C5},
  "u8-pk-rational-exp":{src:"Math 1201 indicator 1.3",group:"exponent-laws",for:PK3200_FOR_C1},
  "u8-pk-rational-pattern":{src:"Math 1201 indicator 1.2",group:"exponent-laws",for:PK3200_FOR_C1},
  "u8-pk-evaluate-exp":{src:"Math 1201 indicators 1.6 and 1.3",group:"exponent-laws",for:PK3200_FOR_C1},
  "u8-pk-product-law":{src:"Math 1201 indicator 1.6",group:"exponent-laws",for:PK3200_FOR_C1},
  "u8-pk-sqrt-eval":{src:"Math 2200 indicator 4.10",group:"powers",for:PK3200_FOR_C1},
  "u9-pk-binom-expand":{src:"Math 2200 indicator 4.43",group:"polynomial-multiply",for:PK3200_FOR_C3},
  "u9-pk-monomial-expand":{src:"Math 2200 indicator 3.14",group:"polynomial-multiply",for:PK3200_FOR_C3},
  "u9-pk-binomial-expand":{src:"Math 1201 indicator 3.4",group:"polynomial-multiply",for:PK3200_FOR_C3},
  "u9-bridge-codes":{src:"Grade 7 and 8 probability: systematic listing and tree diagrams (authored bridge item, rollout plan Section 7; no banked source exists)",group:"counting-bridge",for:PK3200_FOR_C8,bridge:true},
  "u9-bridge-lineup":{src:"Grade 7 and 8 probability: systematic listing and tree diagrams (authored bridge item, rollout plan Section 7; no banked source exists)",group:"counting-bridge",for:PK3200_FOR_C8,bridge:true},
  "u9-bridge-tree":{src:"Grade 7 and 8 probability: systematic listing and tree diagrams (authored bridge item, rollout plan Section 7; no banked source exists)",group:"counting-bridge",for:PK3200_FOR_C8,bridge:true},
  "u9-bridge-places":{src:"Grade 7 and 8 probability: systematic listing and tree diagrams (authored bridge item, rollout plan Section 7; no banked source exists)",group:"counting-bridge",for:PK3200_FOR_C8,bridge:true}
};
BANK.forEach(function(e){var t=PKT3200[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=t.for.slice();e.pkGroup=t.group;if(t.bridge)e.pkBridge=true;}});
