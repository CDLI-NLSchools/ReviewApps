/* Math 3201 PK tranche (November 16, 2026). Prior knowledge check entries
   for all nine units, per Math-3201-PK-Tranche-Spec-2026-11-16.md. Borrowed
   generators are verbatim copies from the Mathematics 1201, Mathematics
   2201, Mathematics 9 and Mathematics 8 banks (only the entry id, unit,
   host indicator tag and tranche metadata differ). Four entries already in
   this bank (u4-express-as-power and the Unit 9 seed entries u9-prob-basics,
   u9-context-prob and u9-decisions) receive their tranche metadata from the
   PKT table below only; their generators, tags and levels are untouched.
   The feeder helper functions the borrowed generators call, and that
   neither the shell nor this bank defines, are ported verbatim below. No
   CRMARKS lines are carried over: borrowed entries bring no CR marks into
   this bank, on the Math 9 tranche convention. */
function u3Nz(a, b) { var n = 0; while (n === 0) n = ri(a, b); return n; }
function u3GCD3(a, b, c) { return u3GCD(u3GCD(a, b), c); }
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
function u3Par(coeffs, v) { return "(" + u3PC(coeffs, v) + ")"; }
function u3M(raw) { return "\\(" + raw + "\\)"; }
function u3PC(coeffs, v) { return u3Str(u3TermsOf(coeffs, v)); }
function u3Alg(lines) { return "\\[ \\begin{aligned} " + lines.join(" \\\\ ") + " \\end{aligned} \\]"; }
function u3GCD(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; }
function u3Body(c, ex, ey) {
  var vp = u3VarPart(ex, ey);
  return (vp && Math.abs(c) === 1) ? vp : Math.abs(c) + vp;
}
function u3TermsOf(coeffs, v) {
  return coeffs.map(function (c, i) { var p = coeffs.length - 1 - i; return v === "y" ? [c, 0, p] : [c, p, 0]; });
}
function u3VarPart(ex, ey) {
  var s = "";
  if (ex > 0) s += "x" + (ex > 1 ? "^" + ex : "");
  if (ey > 0) s += "y" + (ey > 1 ? "^" + ey : "");
  return s;
}
function u3FacRaw(gRaw, facs, v) {
  return (gRaw || "") + facs.map(function (f) { return u3Par(f, v); }).join("");
}
function u3FacDistr(gRaw, facs, v, targetCoeffs, count) {
  var key = u3FacRaw(gRaw, facs, v), seen = {}, out = [];
  var cands = [];
  facs.forEach(function (f, fi) {
    [1, -1, 2, -2].forEach(function (d) {
      var nf = facs.map(function (g) { return g.slice(); });
      nf[fi][nf[fi].length - 1] += d;
      cands.push(nf);
    });
    var sf = facs.map(function (g) { return g.slice(); });
    sf[fi][sf[fi].length - 1] = -sf[fi][sf[fi].length - 1];
    cands.push(sf);
  });
  if (facs.length > 1) {
    var sw = facs.map(function (g) { return g.slice(); });
    var t = sw[0][sw[0].length - 1]; sw[0][sw[0].length - 1] = sw[1][sw[1].length - 1]; sw[1][sw[1].length - 1] = t;
    cands.push(sw);
  }
  shuffle(cands).forEach(function (nf) {
    if (u3SameArr(u3FacExpand(nf), targetCoeffs)) return;
    var s = u3FacRaw(gRaw, nf, v);
    if (s !== key && !seen[s]) { seen[s] = 1; out.push(u3M(s)); }
  });
  return out.slice(0, count);
}
function solT(x, y, str, size, bold) {
  return '<text x="' + fmt(x, 1) + '" y="' + fmt(y, 1) + '" font-size="' + (size || 12) + '" fill="' + FIG_INK + '" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="middle" dominant-baseline="central"' + (bold ? ' font-weight="bold"' : "") + '>' + str + '</text>';
}
function u3SameArr(a, b) { return a.length === b.length && a.every(function (x, i) { return x === b[i]; }); }
function u3FacExpand(facs) {
  var acc = [1];
  facs.forEach(function (f) { acc = u3Conv(acc, f); });
  return acc;
}
function u3Conv(A, B) {
  var out = [], i;
  for (i = 0; i < A.length + B.length - 1; i++) out.push(0);
  A.forEach(function (a, j) { B.forEach(function (b, k) { out[j + k] += a * b; }); });
  return out;
}
function u7sinD(d){return Math.sin(d*Math.PI/180);}
function u7f1(n){return (Math.round(n*10)/10).toFixed(1);}
function u7cosD(d){return Math.cos(d*Math.PI/180);}
function u7tanD(d){return Math.tan(d*Math.PI/180);}
function u7r1(n){return Math.round(n*10)/10;}
var U7_ANGLES=[25,28,30,32,35,38,40,42,45,48,50,52,55,58,60,62,65];
function u7atanD(x){return Math.atan(x)*180/Math.PI;}
function u7asinD(x){return Math.asin(x)*180/Math.PI;}
var U7_TRIPLES=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[6,8,10],[9,12,15],[20,21,29],[9,40,41],[12,35,37],[10,24,26],[12,16,20],[16,30,34]];
function u3MultStr(factor, count) {
  var parts = [];
  for (var i = 0; i < count; i++) parts.push(String(factor));
  return "\\(" + parts.join("\\times ") + "\\)";
}
function u2pickS3(ans,cands){
  var out=[],seen={};seen[ans]=1;
  for(var i=0;i<cands.length&&out.length<3;i++){var c=cands[i];if(typeof c==="string"&&c!==ans&&!seen[c]){seen[c]=1;out.push(c);}}
  return out;
}
function u2red(n,d){var g=u2gcd(n,d);n/=g;d/=g;if(d<0){n=-n;d=-d;}return [n,d];}
function u2expStr(base,n,d){
  var r=u2red(n,d);
  if(r[0]===0)return "\\(1\\)";
  if(r[1]===1){if(r[0]===1)return "\\("+base+"\\)";return "\\("+base+"^{"+r[0]+"}\\)";}
  return "\\("+base+"^{"+FR(r[0],r[1])+"}\\)";
}
function u2gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t;}return a||1;}
function u2radS(idx,rad){return idx===2?("\\sqrt{"+rad+"}"):("\\sqrt["+idx+"]{"+rad+"}");}
function u2isSq(n){var r=Math.round(Math.sqrt(n));return r*r===n;}
function u2isCu(n){var r=Math.round(Math.cbrt(n));return r*r*r===n;}
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
function figArm(f,figFn){return function(){var q=f();q.figure=figFn();return q;};}
function figVPParams1(){return parPanelsSVG([
  {a:1,b:0,c:0,caption:"y = x\u00B2",xrange:[-5,5],yrange:[-3,13]},
  {a:1,b:-6,c:14,caption:"y = (x - 3)\u00B2 + 5",xrange:[-3,9],yrange:[-3,15]}]);}
function figVPParams2(){return parPanelsSVG([
  {a:1,b:0,c:0,caption:"y = x\u00B2",xrange:[-4,4],yrange:[-7,11]},
  {a:2,b:0,c:0,caption:"y = 2x\u00B2",xrange:[-4,4],yrange:[-7,11]},
  {a:-1,b:0,c:0,caption:"y = -x\u00B2",xrange:[-4,4],yrange:[-11,7]}]);}
function figVPParams3(){return parPanelsSVG([
  {a:1,b:0,c:0,caption:"y = x\u00B2",xrange:[-5,5],yrange:[-4,13]},
  {a:1,b:8,c:14,caption:"y = (x + 4)\u00B2 - 2",xrange:[-9,3],yrange:[-4,13]}]);}
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
function factT(a,r1,r2){return "\\(y = "+factB(a,r1,r2)+"\\)";}
function factB(a,r1,r2){function f(r){return r===0?"x":(r>0?"(x - "+r+")":"(x + "+(-r)+")");}return (a===1?"":a===-1?"-":""+a)+f(r1)+f(r2);}
function u7names(){return pick([["A","B","C"],["D","E","F"],["G","H","J"],["K","L","M"],["M","N","P"],["P","Q","R"],["S","T","U"],["V","W","X"],["B","C","D"],["H","J","K"],["R","S","T"],["W","X","Y"],["C","D","E"],["F","G","H"],["J","K","L"],["N","P","Q"],["Q","R","S"],["T","U","V"],["X","Y","Z"],["D","F","G"],["E","G","H"],["L","M","N"],["P","R","S"],["U","V","W"],["A","C","E"],["B","D","F"],["H","K","M"],["K","M","P"],["M","P","R"],["R","T","V"]]);}
function u7side(a,b){return a+b;}
function u7fracS(n,d){var r=u7red(n,d);if(r[1]===1)return ""+r[0];return FR(r[0],r[1]);}
function u7pickS3(ans,cands){
  var out=[],seen={};seen[ans]=1;
  for(var i=0;i<cands.length&&out.length<3;i++){var c=cands[i];if(typeof c==="string"&&c!==ans&&!seen[c]){seen[c]=1;out.push(c);}}
  var k=2;while(out.length<3){var c2="\\("+(ans.length+k)+"\\)";k++;if(!seen[c2]){seen[c2]=1;out.push(c2);}}
  return out;
}
function u7red(n,d){var g=u7gcd(n,d);n/=g;d/=g;if(d<0){n=-n;d=-d;}return [n,d];}
function u7gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t;}return a||1;}
function u1round(x, p) { var m = Math.pow(10, p); return Math.round(x * m) / m; }
function u1gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
function u1frac(n, d) { var r = u1red(n, d); n = r[0]; d = r[1]; if (d === 1) return "\\(" + n + "\\)"; if (n < 0) return "\\(-" + FR(-n, d) + "\\)"; return "\\(" + FR(n, d) + "\\)"; }
function u1red(n, d) { var g = u1gcd(n, d); return [n / g, d / g]; }
function u5lcm(a,b){return a*b/u5gcd(a,b);}
function u5M(n,d){return "\\("+u5disp(n,d)+"\\)";}
function u5red(n,d){var g=u5gcd(n,d);return [n/g,d/g];}
function u5disp(n,d){var r=u5red(n,d);n=r[0];d=r[1];if(d===1)return String(n);if(n>d){var w=Math.floor(n/d),rem=n%d;if(rem===0)return String(w);return w+"\\frac{"+rem+"}{"+d+"}";}return "\\frac{"+n+"}{"+d+"}";}
function u5fopts(corr,errs){
  var cr=u5red(corr[0],corr[1]);var seen={};seen[cr[0]+"/"+cr[1]]=1;var out=[];
  function tryAdd(p,fb){if(out.length>=3)return;if(!p||p[0]<=0||p[1]<=0)return;var r=u5red(p[0],p[1]);var k=r[0]+"/"+r[1];if(seen[k])return;seen[k]=1;out.push({t:u5M(r[0],r[1]),fb:fb});}
  errs.forEach(function(e){tryAdd(e.p,e.fb);});
  [[cr[0]+1,cr[1]],[cr[0],cr[1]+1],[cr[0]+1,cr[1]+1],[cr[0]+2,cr[1]],[cr[0],cr[1]+2],[cr[0]+3,cr[1]+1]].forEach(function(p){tryAdd(p,"That value does not match the result you get from the steps in a correct solution.");});
  return out;
}
function u5gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
function u3disp(n, d) { var r = u3red(n, d); n = r[0]; d = r[1]; if (d === 1) return "\\(" + n + "\\)"; if (n < d) return "\\(" + FR(n, d) + "\\)"; var w = Math.floor(n / d), rem = n % d; if (rem === 0) return "\\(" + w + "\\)"; return "\\(" + w + FR(rem, d) + "\\)"; }
function u3gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
function u3red(n, d) { var g = u3gcd(n, d); return [n / g, d / g]; }
function u7frac(n, d) { var r = u7red(n, d); return "\\(" + FR(r[0], r[1]) + "\\)"; }
function u7fracStr(n,d){if(d<0){n=-n;d=-d;}var g=u7gcd(n,d);n/=g;d/=g;if(d===1)return String(n);return n+"/"+d;}
function u5pick3(c, cands) { var out = [], seen = [c]; for (var i = 0; i < cands.length && out.length < 3; i++) { if (seen.indexOf(cands[i].t) < 0) { seen.push(cands[i].t); out.push(cands[i]); } } return out; }
function u5r2(x) { return Math.round(x * 100) / 100; }
function u7numOpts(correct,cands){var out=[],seen={};seen[String(correct)]=1;for(var i=0;i<cands.length;i++){var v=cands[i];if(v===null||v===undefined)continue;var k=String(v);if(!seen[k]){seen[k]=1;out.push(v);if(out.length===3)break;}}var step=1;while(out.length<3){var v=correct+step;if(!seen[String(v)]){seen[String(v)]=1;out.push(v);}step++;}return out;}
function u7tableSVG(rowHead,colHead,rows){
  var W=330,rowH=26,colW=(W-70)/colHead.length,H=30+rowH*(rows.length+1);
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Outcome table">';
  out+='<rect x="10" y="10" width="'+(W-20)+'" height="'+(H-20)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  out+=_txt(40,23,rowHead,11,true);
  for(var c=0;c<colHead.length;c++){out+=_txt(70+colW*c+colW/2,23,colHead[c],12,true);}
  for(var r=0;r<rows.length;r++){var y=10+rowH*(r+1);
    out+='<line x1="10" y1="'+y+'" x2="'+(W-10)+'" y2="'+y+'" stroke="'+FIG_INK+'" stroke-width="1"/>';
    out+=_txt(40,y+13,rows[r][0],12,true);
    for(var k=1;k<rows[r].length;k++){out+=_txt(70+colW*(k-1)+colW/2,y+13,rows[r][k],11,false);}
  }
  for(var v=0;v<=colHead.length;v++){var x=v===0?70:70+colW*v;out+='<line x1="'+x+'" y1="10" x2="'+x+'" y2="'+(H-10)+'" stroke="'+FIG_INK+'" stroke-width="1"/>';}
  return out+'</svg>';
}
E("u1-pk-frac-context",1,["3.1"], 1, "gen", function () {
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
E("u1-pk-add-unlike",1,["3.1"], 2, "gen", function(){
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
E("u1-pk-multiply-fractions",1,["3.1"], 1, "gen", function () {
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
E("u1-pk-gcf",1,["3.1"], 2, "gen", function () {
  var gp = ri(0, 2), gn, tries = 0;
  if (gp === 0) gn = ri(2, 7); else gn = pick([1, 2, 3, 4, 5, 6]);
  var A = ri(1, 6), B = u3Nz(-6, 6), C = u3Nz(-6, 6);
  while (u3GCD3(A, Math.abs(B), Math.abs(C)) !== 1 && tries < 60) { tries++; A = ri(1, 6); B = u3Nz(-6, 6); C = u3Nz(-6, 6); }
  var quo = [A, B, C];
  var polyTerms = [[gn * A, gp + 2, 0], [gn * B, gp + 1, 0], [gn * C, gp, 0]];
  var polyRaw = u3Str(polyTerms);
  var gRaw = u3Str([[gn, gp, 0]]);
  var keyRaw = gRaw + u3Par(quo, "x");
  var cands = [], seen = {};
  function addCand(s) { if (s !== keyRaw && !seen[s]) { seen[s] = 1; cands.push(u3M(s)); } }
  /* partial factor: only part of the common factor is removed */
  if (gn > 1) {
    var divs = [];
    for (var d = 1; d < gn; d++) if (gn % d === 0) divs.push(d);
    var dv = pick(divs), sc = gn / dv;
    addCand(u3Str([[dv, gp, 0]]) + u3Par([A * sc, B * sc, C * sc], "x"));
  } else {
    addCand(u3Str([[1, gp - 1, 0]]) + "(" + u3Str([[A, 3, 0], [B, 2, 0], [C, 1, 0]]) + ")");
  }
  /* quotient slips: one term not divided correctly */
  addCand(gRaw + u3Par([A, B + (B > 0 ? 1 : -1), C], "x"));
  addCand(gRaw + u3Par([A, B, gn * C], "x"));
  addCand(gRaw + u3Par([A, B, -C], "x"));
  addCand(gRaw + u3Par([A + 1, B, C], "x"));
  var prompt = "Determine the greatest common factor of the terms of \\(" + polyRaw + "\\), and express the polynomial in factored form.";
  var sol = "Every term contains the factor \\(" + gRaw + "\\). Dividing each term by \\(" + gRaw + "\\) leaves \\(" + u3PC(quo, "x") + "\\), whose terms share no further common factor." +
    u3Alg([polyRaw + " &= " + keyRaw]) +
    "In factored form, the polynomial is **" + u3M(keyRaw) + "**.";
  return mcq(prompt, u3M(keyRaw), shuffle(cands).slice(0, 3), sol,
    { t: "fac", g: gRaw, parts: [quo], v: "x" });
});
E("u1-pk-factor-monic",1,["3.1"], 2, "gen", function () {
  var v = pick(["x", "y"]);
  var r = u3Nz(-9, 9), s = u3Nz(-9, 9), guard = 0;
  while (r === s && guard < 40) { guard++; s = u3Nz(-9, 9); }
  var B = r + s, C = r * s;
  var poly = u3PC([1, B, C], v);
  var facs = [[1, Math.min(r, s)], [1, Math.max(r, s)]];
  var ans = Math.max(r, s);
  var prompt = "When the trinomial \\(" + poly + "\\) is factored as a product of two binomials, the two constant terms are two numbers. What is the larger of those two numbers?";
  var sol = "Find two numbers that multiply to \\(" + C + "\\) and add to \\(" + B + "\\): the numbers are \\(" + Math.min(r, s) + "\\) and \\(" + Math.max(r, s) + "\\)." +
    u3Alg([poly + " &= " + u3FacRaw("", facs, v)]) +
    "The larger of the two constant terms is **" + ans + "**.";
  return numq(prompt, ans, 0.01, sol, { t: "pair", r: r, s: s, B: B, C: C });
});
E("u1-pk-diff-squares",1,["3.1"], 1, "gen", function () {
  var mode = pick(["pure", "pure", "twovar"]);
  if (mode === "twovar") {
    var a = ri(1, 4), b = ri(1, 6);
    var polyTerms = [[a * a, 2, 0], [-b * b, 0, 2]];
    var poly = u3Str(polyTerms);
    var f1 = u3Str([[a, 1, 0], [b, 0, 1]]), f2 = u3Str([[a, 1, 0], [-b, 0, 1]]);
    var keyRaw = "(" + f1 + ")(" + f2 + ")";
    var P = [[a, 1, 0], [b, 0, 1]], Q = [[a, 1, 0], [-b, 0, 1]];
    var cands = [], seen = {};
    function addT(s) { if (s !== keyRaw && !seen[s]) { seen[s] = 1; cands.push(u3M(s)); } }
    addT("(" + f2 + ")(" + f2 + ")");
    addT("(" + f1 + ")(" + f1 + ")");
    addT("(" + u3Str([[a, 1, 0], [b * b, 0, 1]]) + ")(" + u3Str([[a, 1, 0], [-b * b, 0, 1]]) + ")");
    addT("(" + u3Str([[1, 1, 0], [b, 0, 1]]) + ")(" + u3Str([[1, 1, 0], [-b, 0, 1]]) + ")");
    addT("(" + u3Str([[a, 1, 0], [b + 1, 0, 1]]) + ")(" + f2 + ")");
    addT("(" + u3Str([[a + 1, 1, 0], [b, 0, 1]]) + ")(" + u3Str([[a + 1, 1, 0], [-b, 0, 1]]) + ")");
    var solT = "Each term is a perfect square: \\(" + poly + " = (" + a + "x)^2 - (" + b + "y)^2\\). A difference of squares factors into a sum and a difference of the two square roots. As a trinomial the middle term is \\(0\\): a pair of numbers multiplying to the negative constant term and adding to \\(0\\) must be opposites, which is why the two factors differ only in sign." +
      u3Alg([poly + " &= " + keyRaw]) +
      "The factored form is **" + u3M(keyRaw) + "**.";
    return mcq("Factor the polynomial \\(" + poly + "\\).",
      u3M(keyRaw), shuffle(cands).slice(0, 3), solT, { t: "facT", P: P, Q: Q, poly: poly });
  }
  var v = pick(["x", "y"]);
  var a2 = ri(1, 5), b2 = ri(1, 9);
  var prod = [a2 * a2, 0, -b2 * b2];
  var poly2 = u3PC(prod, v);
  var facs = [[a2, b2], [a2, -b2]];
  var keyRaw2 = u3FacRaw("", facs, v);
  var sqTerm = a2 === 1 ? v + "^2" : (a2 * a2) + v + "^2";
  var sol = "Each term is a perfect square: \\(" + poly2 + " = (" + a2 + v + ")^2 - " + b2 + "^2\\). Written as a trinomial, this is \\(" + sqTerm + " + 0" + v + " - " + (b2 * b2) + "\\), the case where the middle coefficient is \\(0\\). A factor pair of \\(-" + (b2 * b2) + "\\) that adds to \\(0\\) must consist of opposites, \\(" + b2 + "\\) and \\(-" + b2 + "\\), so the factors differ only in sign." +
    u3Alg([poly2 + " &= " + keyRaw2]) +
    "The factored form is **" + u3M(keyRaw2) + "**.";
  return mcq("Factor the polynomial \\(" + poly2 + "\\).",
    u3M(keyRaw2), u3FacDistr("", facs, v, prod, 3), sol,
    { t: "fac", g: "", parts: facs, v: v });
});
E("u2-pk-domain-range",2,["3.17"],1,"gen",function(){
  var a=pick([1,-1,2]),h=ri(-4,4),k=ri(-6,10);
  var correct=a>0?"Domain: all real numbers; Range: \\(y \\geq "+k+"\\)":"Domain: all real numbers; Range: \\(y \\leq "+k+"\\)";
  var q=mcq("A quadratic function has vertex \\(("+h+", "+k+")\\) and opens "+(a>0?"upward":"downward")+". What are its domain and range?",correct,
    [a>0?"Domain: all real numbers; Range: \\(y \\leq "+k+"\\)":"Domain: all real numbers; Range: \\(y \\geq "+k+"\\)",
     "Domain: \\(x \\geq "+h+"\\); Range: all real numbers","Domain: \\(x \\geq "+h+"\\); Range: \\(y "+(a>0?"\\geq":"\\leq")+" "+k+"\\)"],
    "Every quadratic has domain all real numbers. The vertex is the turning point: opening "+(a>0?"up, the smallest \\(y\\) is the vertex's y-value \\("+k+"\\)":"down, the largest \\(y\\) is \\("+k+"\\)")+", so the range is \\(y "+(a>0?"\\geq":"\\leq")+" "+k+"\\)"+".",{a:a,h:h,k:k});
  q.figure=parSVG(a,-2*a*h,a*h*h+k,{marks:[{x:h,y:k}]});
  return q;
});
E("u2-pk-vertex-form-params",2,["3.17"],1,"var",varset([
  figArm(function(){return mcq("In \\(y = (x - 3)^2 + 5\\), what is the vertex?",
    "\\((3, 5)\\) — the graph of \\(y = x^2\\) shifted right \\(3\\) and up \\(5\\)",
    ["\\((-3, 5)\\) — the graph of \\(y = x^2\\) shifted left \\(3\\) and up \\(5\\)","\\((3, -5)\\) — shifted right \\(3\\) and down \\(5\\) from the origin","\\((5, 3)\\) — the numbers swap places, so the vertical shift comes first"],
    "Vertex form \\(y = a(x - h)^2 + k\\) has vertex \\((h, k)\\). The minus sign in \\((x - 3)\\) means \\(h = +3\\).",{});},figVPParams1),
  figArm(function(){return mcq("What does the value of \\(a\\) do in \\(y = a(x - h)^2 + k\\)?",
    "If \\(|a| > 1\\) the parabola narrows; if \\(a < 0\\) it opens downward",
    ["It moves the vertex left or right, changing where the parabola is centred","It moves the vertex up or down, raising the whole parabola","It changes only the y-intercept, leaving the shape of the parabola untouched"],
    "\\(h\\) shifts sideways, \\(k\\) shifts vertically, and \\(a\\) controls opening direction and width — the 'stretch' of the parabola.",{});},figVPParams2),
  figArm(function(){return mcq("The graph of \\(y = x^2\\) is shifted left \\(4\\) and down \\(2\\). What is its equation?",
    "\\(y = (x + 4)^2 - 2\\)",
    ["\\(y = (x - 4)^2 + 2\\)","\\(y = (x + 4)^2 + 2\\)","\\(y = (x - 4)^2 - 2\\)"],
    "Left \\(4\\) means \\(h = -4\\), written \\((x - (-4)) = (x + 4)\\); down \\(2\\) means \\(k = -2\\).",{});},figVPParams3)
]));
E("u2-pk-axis-from-intercepts",2,["3.17"],1,"gen",function(){
  var p=ri(-10,-1),q=ri(1,10);var mid=(p+q)/2;
  var frame=pick([
    "A parabola has x-intercepts \\("+p+"\\) and \\("+q+"\\). What is the equation of its axis of symmetry? Give your answer as \\(x = \\) (a number).",
    "The graph of a parabola crosses the x-axis at \\("+p+"\\) and \\("+q+"\\). What is the equation of its axis of symmetry? Give your answer as \\(x = \\) (a number)."]);
  var qfig=numq(frame,mid,0.011,"The axis of symmetry passes midway between the intercepts: \\(x = \\frac{"+p+" + "+q+"}{2} = \\)<b>\\("+fmt(mid)+"\\)</b>.",{p:p,q:q});
  qfig.figure=parSVG(1,-(p+q),p*q,{marks:[{x:p,y:0},{x:q,y:0}]});
  return qfig;
});
E("u2-pk-graph-description",2,["3.17"],2,"gen",function(){
  var a=pick([1,-1,2,-2]),r1=pick([-5,-4,-3,-2,-1,1,2,3]),r2=pick([2,3,4,5,6]);
  if(r1===r2)r2=r2+1;
  var lo=Math.min(r1,r2),hi=Math.max(r1,r2);r1=lo;r2=hi;
  if(r1+r2===0)r2+=2;
  var eq=factT(a,r1,r2);
  var dir=a>0?"upward":"downward",dir2=a>0?"downward":"upward",yi=a*r1*r2;
  function desc(d,x,y,z){return "Opens "+d+"; x-intercepts \\("+x+"\\) and \\("+y+"\\); y-intercept \\("+z+"\\)";}
  var good=desc(dir,r1,r2,yi);
  var wrongs=[desc(dir2,r1,r2,yi),desc(dir,-r2,-r1,yi),desc(dir,r1,r2,-yi)];
  var q=mcq("Which description matches the graph of "+eq+"?",good,wrongs,
    "The sign of the leading coefficient (\\("+a+"\\)) says the parabola opens "+dir+". It crosses the x-axis where each factor is zero: \\(x = "+r1+"\\) and \\(x = "+r2+"\\). Setting \\(x = 0\\) gives the y-intercept: \\("+a+" \\times ("+(-r1)+") \\times ("+(-r2)+") = "+yi+"\\).",{a:a,r1:r1,r2:r2,exp:good});
  q.figure=parSVG(a,-a*(r1+r2),a*r1*r2,{marks:[{x:r1,y:0},{x:r2,y:0},{x:0,y:a*r1*r2}]});
  return q;
});
E("u2-pk-which-quadratic",2,["3.17"],1,"var",varset([
  function(){return mcq("Which relation is quadratic?",
    "\\(y = (x + 2)(x - 5)\\)",["\\(y = 3x - 7\\)","\\(y = x^3 - x\\)","\\(y = \\sqrt{x + 1}\\)"],
    "\\((x + 2)(x - 5)\\) expands to \\(x^2 - 3x - 10\\): an \\(x^2\\) term and nothing of higher degree. The others are linear, cubic and a radical relation." );},
  function(){return mcq("Which relation is quadratic?",
    "\\(y = (2x - 1)(x + 3)\\)",["\\(y = \\frac{5}{x}\\)","\\(y = x(x^2 + 1)\\)","\\(y = -4x + 1\\)"],
    "\\((2x - 1)(x + 3)\\) expands to \\(2x^2 + 5x - 3\\), which is quadratic. Note \\(y = x(x^2 + 1)\\) expands to \\(x^3 + x\\), a cubic in disguise." );},
  function(){return mcq("Which relation is quadratic?",
    "\\(y = (x + 4)^2\\)",["\\(y = 3x\\)","\\(y = x^3 + 2x\\)","\\(y = -x + 9\\)"],
    "\\((x + 4)^2\\) expands to \\(x^2 + 8x + 16\\), a quadratic. Squaring a binomial always produces an \\(x^2\\) term." );},
  function(){return mcq("Which relation is quadratic?",
    "\\(y = x^2 - 3x\\)",["\\(y = 7 - x\\)","\\(y = 2x^3\\)","\\(y = \\sqrt{x}\\)"],
    "\\(y = x^2 - 3x\\) has degree \\(2\\). The others are linear (degree \\(1\\)), cubic (degree \\(3\\)) and a square-root relation.");}
]));
E("u3-pk-label-sides",3,["7.1"], 1, "gen",function(){
  var ns=u7names(),X=ns[0],Y=ns[1],R=ns[2];
  var marked=pick([X,Y]),other=(marked===X?Y:X);
  var hyp=u7side(X,Y),oppM=u7side(other,R),adjM=u7side(marked,R);
  var ask=pick(["hyp","opp","adj"]);
  function stmt(side1,role1,side2,role2){return side1+" is "+role1+", and "+side2+" is "+role2;}
  var key,ds,promptCore,solRole;
  if(ask==="hyp"){
    key=stmt(hyp,"the hypotenuse",oppM,"opposite angle "+marked);
    ds=[stmt(adjM,"the hypotenuse",oppM,"opposite angle "+marked),
        stmt(hyp,"the hypotenuse",adjM,"opposite angle "+marked),
        stmt(oppM,"the hypotenuse",hyp,"opposite angle "+marked)];
    promptCore="correctly identifies the <b>hypotenuse</b>";
    solRole="The hypotenuse is the side opposite the right angle at "+R+", so it is <b>\\("+hyp+"\\)</b>.";
  }else if(ask==="opp"){
    key=stmt(oppM,"opposite angle "+marked,adjM,"adjacent to angle "+marked);
    ds=[stmt(adjM,"opposite angle "+marked,oppM,"adjacent to angle "+marked),
        stmt(hyp,"opposite angle "+marked,adjM,"adjacent to angle "+marked),
        stmt(oppM,"opposite angle "+marked,hyp,"adjacent to angle "+marked)];
    promptCore="correctly identifies the side <b>opposite</b> angle "+marked;
    solRole="The side opposite angle "+marked+" does not touch angle "+marked+"; it joins "+other+" and "+R+", so it is <b>\\("+oppM+"\\)</b>. The side adjacent to angle "+marked+" (other than the hypotenuse) is \\("+adjM+"\\).";
  }else{
    key=stmt(adjM,"adjacent to angle "+marked,oppM,"opposite angle "+marked);
    ds=[stmt(oppM,"adjacent to angle "+marked,adjM,"opposite angle "+marked),
        stmt(hyp,"adjacent to angle "+marked,oppM,"opposite angle "+marked),
        stmt(adjM,"adjacent to angle "+marked,hyp,"opposite angle "+marked)];
    promptCore="correctly identifies the side <b>adjacent</b> to angle "+marked;
    solRole="The side adjacent to angle "+marked+" forms that angle together with the hypotenuse; it joins "+marked+" and "+R+", so it is <b>\\("+adjM+"\\)</b>. The side opposite angle "+marked+" is \\("+oppM+"\\).";
  }
  var tri=X+Y+R;
  var prompt=pick([
    "Triangle "+tri+" is a right triangle with the right angle at "+R+". Angle "+marked+" is marked. Which statement "+promptCore+"?",
    "In right triangle "+tri+", the right angle is at "+R+" and angle "+marked+" is marked. Which statement "+promptCore+"?"
  ]);
  var angLab=[null,null,null];angLab[marked===X?0:1]=marked;
  var q=mcq(prompt,key,ds,
    "In triangle "+tri+" the right angle is at "+R+". "+solRole,
    {stmt:true,keyText:key,X:X,Y:Y,R:R,marked:marked,ask:ask});
  q.figure=triSVG(4,3,5,{L:[X,Y,R],ang:angLab,side:[Y+R,X+R,X+Y]});
  return q;
});
E("u3-pk-ratio-def",3,["7.1"], 1, "gen",function(){
  var ns=u7names(),X=ns[0],Y=ns[1],R=ns[2];
  var t=pick(U7_TRIPLES),k=ri(1,5);
  var swap=pick([true,false]);
  var legXR=(swap?t[1]:t[0])*k, legYR=(swap?t[0]:t[1])*k, hyp=t[2]*k;
  var ang=pick([X,Y]);
  var opp=(ang===X?legYR:legXR), adj=(ang===X?legXR:legYR);
  var fn=pick(["sin","cos","tan"]);
  var num,den;
  if(fn==="sin"){num=opp;den=hyp;}else if(fn==="cos"){num=adj;den=hyp;}else{num=opp;den=adj;}
  var key="\\("+u7fracS(num,den)+"\\)";
  var all=[[opp,hyp],[adj,hyp],[opp,adj],[adj,opp],[hyp,opp],[hyp,adj]];
  var cands=[];
  all.forEach(function(pr){var s="\\("+u7fracS(pr[0],pr[1])+"\\)";if(s!==key)cands.push(s);});
  cands=shuffle(cands);
  var ds=u7pickS3(key,cands);
  var fnName=(fn==="sin"?"sine":fn==="cos"?"cosine":"tangent");
  var ratioWord=(fn==="tan"?"opposite over adjacent":fn==="sin"?"opposite over hypotenuse":"adjacent over hypotenuse");
  var unit=pick(["cm","m"]);
  var prompt="Triangle "+X+Y+R+" is a right triangle with the right angle at "+R+". Side "+X+R+" is \\("+legXR+"\\) "+unit+", side "+Y+R+" is \\("+legYR+"\\) "+unit+", and side "+X+Y+" is \\("+hyp+"\\) "+unit+". What is the value of \\(\\"+fn+" "+ang+"\\)?";
  var q=mcq(prompt,key,ds,
    "The "+fnName+" ratio is "+ratioWord+". For angle "+ang+", the opposite side is \\("+opp+"\\) "+unit+", the adjacent side is \\("+adj+"\\) "+unit+", and the hypotenuse is \\("+hyp+"\\) "+unit+": \\[ \\begin{aligned} \\"+fn+" "+ang+" &= "+FR(num,den)+(u7red(num,den)[1]===1?"":" \\\\ &= "+u7fracS(num,den))+" \\end{aligned} \\] The value of \\(\\"+fn+" "+ang+"\\) is <b>"+key+"</b>.",
    {ang:ang,fn:fn,opp:opp,adj:adj,hyp:hyp,keyText:key});
  q.figure=triSVG(legYR,legXR,hyp,{L:[X,Y,R],side:[legYR+" "+unit,legXR+" "+unit,hyp+" "+unit]});
  return q;
});
E("u3-pk-find-side",3,["7.1"],1,"gen",function(){
  var V=pick(["A","B"]);
  var oppName=(V==="A"?"BC":"AC"),adjName=(V==="A"?"AC":"BC");
  var theta=pick(U7_ANGLES),mode=ri(1,4),given,targetName,givenText,raw,steps;
  if(mode===1){
    given=ri(12,48);targetName=oppName;
    givenText="the hypotenuse, AB, is \\("+given+"\\) cm";
    raw=given*u7sinD(theta);
    steps="\\sin "+theta+"^\\circ &= "+FR("x",given)+" \\\\ x &= "+given+" \\times \\sin "+theta+"^\\circ \\\\ &\\approx "+u7f1(raw);
  }else if(mode===2){
    given=ri(12,48);targetName=adjName;
    givenText="the hypotenuse, AB, is \\("+given+"\\) cm";
    raw=given*u7cosD(theta);
    steps="\\cos "+theta+"^\\circ &= "+FR("x",given)+" \\\\ x &= "+given+" \\times \\cos "+theta+"^\\circ \\\\ &\\approx "+u7f1(raw);
  }else if(mode===3){
    given=ri(8,40);targetName=oppName;theta=pick(U7_ANGLES.filter(function(a){return a>=25&&a<=60;}));
    givenText="the side adjacent to angle "+V+", "+adjName+", is \\("+given+"\\) cm";
    raw=given*u7tanD(theta);
    steps="\\tan "+theta+"^\\circ &= "+FR("x",given)+" \\\\ x &= "+given+" \\times \\tan "+theta+"^\\circ \\\\ &\\approx "+u7f1(raw);
  }else{
    given=ri(8,40);targetName=adjName;theta=pick(U7_ANGLES.filter(function(a){return a>=30&&a<=65;}));
    givenText="the side opposite angle "+V+", "+oppName+", is \\("+given+"\\) cm";
    raw=given/u7tanD(theta);
    steps="\\tan "+theta+"^\\circ &= "+FR(given,"x")+" \\\\ x &= "+FR(given,"\\tan "+theta+"^\\circ")+" \\\\ &\\approx "+u7f1(raw);
  }
  var ans=u7r1(raw);
  var q=numq("A right triangle ABC has the right angle at C and angle "+V+" is \\("+theta+"^\\circ\\). In the triangle, "+givenText+". Find the length of side "+targetName+", in centimetres, to the nearest tenth.",
    ans,0.06,
    "Let \\(x\\) be the length of side "+targetName+". The known and unknown sides give this ratio at angle "+V+": \\[ \\begin{aligned} "+steps+" \\end{aligned} \\] The length of side "+targetName+" is <b>\\("+u7f1(ans)+"\\) cm</b>.",
    {mode:mode,V:V,theta:theta,given:given,ans:ans});
  var oppV,adjV,hypV;
  if(mode===1){hypV=given;oppV=given*u7sinD(theta);adjV=given*u7cosD(theta);}
  else if(mode===2){hypV=given;adjV=given*u7cosD(theta);oppV=given*u7sinD(theta);}
  else if(mode===3){adjV=given;oppV=given*u7tanD(theta);hypV=given/u7cosD(theta);}
  else{oppV=given;adjV=given/u7tanD(theta);hypV=given/u7sinD(theta);}
  var oi=(V==="A"?0:1),ai=(V==="A"?1:0);
  var sLab=[null,null,null];
  sLab[(mode<=2)?2:(mode===3?ai:oi)]=given+" cm";
  sLab[(mode===1||mode===3)?oi:ai]="?";
  var aLab=[null,null,null];aLab[V==="A"?0:1]=theta+"°";
  q.figure=triSVG(V==="A"?oppV:adjV,V==="A"?adjV:oppV,hypV,{L:["A","B","C"],side:sLab,ang:aLab});
  return q;
});
E("u3-pk-solve-triangle",3,["7.1"],2,"gen",function(){
  var fam=ri(1,4),facts,tasks=[];
  var P={fam:fam};
  if(fam===1){
    var H=ri(14,50),theta=pick(U7_ANGLES);P.H=H;P.theta=theta;
    facts="the hypotenuse AB is \\("+H+"\\) cm and angle A is \\("+theta+"^\\circ\\)";
    tasks=[
      {f:"comp",ask:"the measure of angle B, in degrees, to the nearest degree",ans:90-theta,tol:0.51,
       sol:"The acute angles of a right triangle add to \\(90^\\circ\\): \\[ \\begin{aligned} B &= 90^\\circ - "+theta+"^\\circ \\\\ &= "+(90-theta)+"^\\circ \\end{aligned} \\] The measure of angle B is <b>\\("+(90-theta)+"^\\circ\\)</b>."},
      {f:"hSin",ask:"the length of side BC, in centimetres, to the nearest tenth",ans:u7r1(H*u7sinD(theta)),tol:0.06,
       sol:"Side BC is opposite angle A, so use sine with the hypotenuse: \\[ \\begin{aligned} \\sin "+theta+"^\\circ &= "+FR("BC",""+H)+" \\\\ BC &= "+H+" \\times \\sin "+theta+"^\\circ \\\\ &\\approx "+u7f1(H*u7sinD(theta))+" \\end{aligned} \\] The length of side BC is <b>\\("+u7f1(H*u7sinD(theta))+"\\) cm</b>."},
      {f:"hCos",ask:"the length of side AC, in centimetres, to the nearest tenth",ans:u7r1(H*u7cosD(theta)),tol:0.06,
       sol:"Side AC is adjacent to angle A, so use cosine with the hypotenuse: \\[ \\begin{aligned} \\cos "+theta+"^\\circ &= "+FR("AC",""+H)+" \\\\ AC &= "+H+" \\times \\cos "+theta+"^\\circ \\\\ &\\approx "+u7f1(H*u7cosD(theta))+" \\end{aligned} \\] The length of side AC is <b>\\("+u7f1(H*u7cosD(theta))+"\\) cm</b>."}
    ];
  }else if(fam===2){
    var G2=ri(10,42),th2=pick(U7_ANGLES.filter(function(a){return a>=28&&a<=62;}));P.G=G2;P.theta=th2;
    facts="side AC, adjacent to angle A, is \\("+G2+"\\) cm and angle A is \\("+th2+"^\\circ\\)";
    tasks=[
      {f:"comp",ask:"the measure of angle B, in degrees, to the nearest degree",ans:90-th2,tol:0.51,
       sol:"The acute angles of a right triangle add to \\(90^\\circ\\): \\[ \\begin{aligned} B &= 90^\\circ - "+th2+"^\\circ \\\\ &= "+(90-th2)+"^\\circ \\end{aligned} \\] The measure of angle B is <b>\\("+(90-th2)+"^\\circ\\)</b>."},
      {f:"aTan",ask:"the length of side BC, in centimetres, to the nearest tenth",ans:u7r1(G2*u7tanD(th2)),tol:0.06,
       sol:"Side BC is opposite angle A and side AC is adjacent, so use tangent: \\[ \\begin{aligned} \\tan "+th2+"^\\circ &= "+FR("BC",""+G2)+" \\\\ BC &= "+G2+" \\times \\tan "+th2+"^\\circ \\\\ &\\approx "+u7f1(G2*u7tanD(th2))+" \\end{aligned} \\] The length of side BC is <b>\\("+u7f1(G2*u7tanD(th2))+"\\) cm</b>."},
      {f:"aHypCos",ask:"the length of the hypotenuse AB, in centimetres, to the nearest tenth",ans:u7r1(G2/u7cosD(th2)),tol:0.06,
       sol:"Side AC is adjacent to angle A, so use cosine and rearrange for the hypotenuse: \\[ \\begin{aligned} \\cos "+th2+"^\\circ &= "+FR(G2,"AB")+" \\\\ AB &= "+FR(G2,"\\cos "+th2+"^\\circ")+" \\\\ &\\approx "+u7f1(G2/u7cosD(th2))+" \\end{aligned} \\] The length of the hypotenuse AB is <b>\\("+u7f1(G2/u7cosD(th2))+"\\) cm</b>."}
    ];
  }else if(fam===3){
    var G3=ri(10,42),th3=pick(U7_ANGLES.filter(function(a){return a>=28&&a<=62;}));P.G=G3;P.theta=th3;
    facts="side BC, opposite angle A, is \\("+G3+"\\) cm and angle A is \\("+th3+"^\\circ\\)";
    tasks=[
      {f:"comp",ask:"the measure of angle B, in degrees, to the nearest degree",ans:90-th3,tol:0.51,
       sol:"The acute angles of a right triangle add to \\(90^\\circ\\): \\[ \\begin{aligned} B &= 90^\\circ - "+th3+"^\\circ \\\\ &= "+(90-th3)+"^\\circ \\end{aligned} \\] The measure of angle B is <b>\\("+(90-th3)+"^\\circ\\)</b>."},
      {f:"oAdjTan",ask:"the length of side AC, in centimetres, to the nearest tenth",ans:u7r1(G3/u7tanD(th3)),tol:0.06,
       sol:"Side BC is opposite angle A and side AC is adjacent, so use tangent and rearrange: \\[ \\begin{aligned} \\tan "+th3+"^\\circ &= "+FR(G3,"AC")+" \\\\ AC &= "+FR(G3,"\\tan "+th3+"^\\circ")+" \\\\ &\\approx "+u7f1(G3/u7tanD(th3))+" \\end{aligned} \\] The length of side AC is <b>\\("+u7f1(G3/u7tanD(th3))+"\\) cm</b>."},
      {f:"oHypSin",ask:"the length of the hypotenuse AB, in centimetres, to the nearest tenth",ans:u7r1(G3/u7sinD(th3)),tol:0.06,
       sol:"Side BC is opposite angle A, so use sine and rearrange for the hypotenuse: \\[ \\begin{aligned} \\sin "+th3+"^\\circ &= "+FR(G3,"AB")+" \\\\ AB &= "+FR(G3,"\\sin "+th3+"^\\circ")+" \\\\ &\\approx "+u7f1(G3/u7sinD(th3))+" \\end{aligned} \\] The length of the hypotenuse AB is <b>\\("+u7f1(G3/u7sinD(th3))+"\\) cm</b>."}
    ];
  }else{
    var t=pick(U7_TRIPLES),k=ri(1,4),aL=t[0]*k,bL=t[1]*k,cL=t[2]*k;
    var sub=pick(["legs","hypLeg"]);P.a=aL;P.b=bL;P.c=cL;P.sub=sub;
    if(sub==="legs"){
      facts="side BC is \\("+aL+"\\) cm and side AC is \\("+bL+"\\) cm";
      var angA=u7atanD(aL/bL);
      tasks=[
        {f:"pythHyp",ask:"the length of the hypotenuse AB, in centimetres",ans:cL,tol:0.001,
         sol:"Use the Pythagorean theorem with the two legs: \\[ \\begin{aligned} AB^2 &= "+aL+"^2 + "+bL+"^2 \\\\ AB^2 &= "+(cL*cL)+" \\\\ AB &= "+cL+" \\end{aligned} \\] The length of the hypotenuse AB is <b>\\("+cL+"\\) cm</b>."},
        {f:"invTanA",ask:"the measure of angle A, in degrees, to the nearest degree",ans:Math.round(angA),tol:0.51,
         sol:"Side BC is opposite angle A and side AC is adjacent, so use inverse tangent: \\[ \\begin{aligned} \\tan A &= "+FR(aL,bL)+" \\\\ A &= \\tan^{-1}\\left("+FR(aL,bL)+"\\right) \\\\ &\\approx "+Math.round(angA)+"^\\circ \\end{aligned} \\] The measure of angle A is <b>\\("+Math.round(angA)+"^\\circ\\)</b>."},
        {f:"invTanB",ask:"the measure of angle B, in degrees, to the nearest degree",ans:Math.round(90-angA),tol:0.51,
         sol:"Side AC is opposite angle B and side BC is adjacent, so use inverse tangent: \\[ \\begin{aligned} \\tan B &= "+FR(bL,aL)+" \\\\ B &= \\tan^{-1}\\left("+FR(bL,aL)+"\\right) \\\\ &\\approx "+Math.round(90-angA)+"^\\circ \\end{aligned} \\] The measure of angle B is <b>\\("+Math.round(90-angA)+"^\\circ\\)</b>."}
      ];
    }else{
      facts="the hypotenuse AB is \\("+cL+"\\) cm and side BC is \\("+aL+"\\) cm";
      var angA2=u7asinD(aL/cL);
      tasks=[
        {f:"pythLeg",ask:"the length of side AC, in centimetres",ans:bL,tol:0.001,
         sol:"Use the Pythagorean theorem and rearrange for the missing leg: \\[ \\begin{aligned} AC^2 &= "+cL+"^2 - "+aL+"^2 \\\\ AC^2 &= "+(bL*bL)+" \\\\ AC &= "+bL+" \\end{aligned} \\] The length of side AC is <b>\\("+bL+"\\) cm</b>."},
        {f:"invSinA",ask:"the measure of angle A, in degrees, to the nearest degree",ans:Math.round(angA2),tol:0.51,
         sol:"Side BC is opposite angle A and AB is the hypotenuse, so use inverse sine: \\[ \\begin{aligned} \\sin A &= "+FR(aL,cL)+" \\\\ A &= \\sin^{-1}\\left("+FR(aL,cL)+"\\right) \\\\ &\\approx "+Math.round(angA2)+"^\\circ \\end{aligned} \\] The measure of angle A is <b>\\("+Math.round(angA2)+"^\\circ\\)</b>."},
        {f:"compFromA",ask:"the measure of angle B, in degrees, to the nearest degree",ans:Math.round(90-angA2),tol:0.51,
         sol:"First find angle A with inverse sine, since BC is opposite A: \\(A \\approx "+u7f1(angA2)+"^\\circ\\). The acute angles add to \\(90^\\circ\\): \\[ \\begin{aligned} B &= 90^\\circ - "+u7f1(angA2)+"^\\circ \\\\ &\\approx "+Math.round(90-angA2)+"^\\circ \\end{aligned} \\] The measure of angle B is <b>\\("+Math.round(90-angA2)+"^\\circ\\)</b>."}
      ];
    }
  }
  var task=pick(tasks);P.f=task.f;
  var fig;
  if(fam===1){
    var sL1=[null,null,H+" cm"],aL1=[theta+"°",null,null];
    if(task.f==="comp")aL1[1]="?";else if(task.f==="hSin")sL1[0]="?";else sL1[1]="?";
    fig=triSVG(H*u7sinD(theta),H*u7cosD(theta),H,{L:["A","B","C"],side:sL1,ang:aL1});
  }else if(fam===2){
    var sL2=[null,G2+" cm",null],aL2=[th2+"°",null,null];
    if(task.f==="comp")aL2[1]="?";else if(task.f==="aTan")sL2[0]="?";else sL2[2]="?";
    fig=triSVG(G2*u7tanD(th2),G2,G2/u7cosD(th2),{L:["A","B","C"],side:sL2,ang:aL2});
  }else if(fam===3){
    var sL3=[G3+" cm",null,null],aL3=[th3+"°",null,null];
    if(task.f==="comp")aL3[1]="?";else if(task.f==="oAdjTan")sL3[1]="?";else sL3[2]="?";
    fig=triSVG(G3,G3/u7tanD(th3),G3/u7sinD(th3),{L:["A","B","C"],side:sL3,ang:aL3});
  }else if(sub==="legs"){
    var sL4=[aL+" cm",bL+" cm",null],aL4=[null,null,null];
    if(task.f==="pythHyp")sL4[2]="?";else if(task.f==="invTanA")aL4[0]="?";else aL4[1]="?";
    fig=triSVG(aL,bL,cL,{L:["A","B","C"],side:sL4,ang:aL4});
  }else{
    var sL5=[aL+" cm",null,cL+" cm"],aL5=[null,null,null];
    if(task.f==="pythLeg")sL5[1]="?";else if(task.f==="invSinA")aL5[0]="?";else aL5[1]="?";
    fig=triSVG(aL,bL,cL,{L:["A","B","C"],side:sL5,ang:aL5});
  }
  var q=numq("A right triangle ABC has the right angle at C. In the triangle, "+facts+". Find "+task.ask+".",
    task.ans,task.tol,task.sol,P);
  q.figure=fig;
  return q;
});
/* Sine law and cosine law PK (November 18, 2026): the Math 3201 guide's
   Focus for Learning for indicator 7.1 names sine law and cosine law
   problems from Math 2201 as prior learning for Unit 3, alongside the
   right triangle strand above. Written fresh for this bank in the u3-pk
   idiom, scoped to calculator-level work: labelled diagrams, one law per
   item, sides and angles only. No ambiguous case (see the guard inside
   u3-pk-sine-law-angle) and no multi-step problems. No CR marks, on the
   sibling entries' convention. */
E("u3-pk-sine-law-side",3,["7.1"],1,"gen",function(){
  var mode=ri(1,2),A=0,B=0,given=0,raw=0,C=0,aLen=0,bLen=0,cLen=0,tries=0;
  function deal(){
    C=180-A-B;
    if(mode===1){raw=given*u7sinD(B)/u7sinD(A);aLen=given;bLen=raw;cLen=given*u7sinD(C)/u7sinD(A);}
    else{raw=given*u7sinD(A)/u7sinD(C);cLen=given;aLen=raw;bLen=given*u7sinD(B)/u7sinD(C);}
  }
  do{
    A=pick([30,35,40,45,50,55,60,65]);
    B=pick(U7_ANGLES.filter(function(x){return x>=25&&x<=70&&A+x<=155;}));
    given=(mode===1?ri(10,45):ri(12,48));
    deal();tries++;
  }while((raw<5||raw>60)&&tries<60);
  if(raw<5||raw>60){mode=1;A=45;B=60;given=20;deal();}
  var ans=u7r1(raw);
  var prompt,sol,fig;
  if(mode===1){
    prompt="In triangle ABC, angle A is \\("+A+"^\\circ\\) and angle B is \\("+B+"^\\circ\\). Side BC, opposite angle A, is \\("+given+"\\) cm. Find the length of side AC, in centimetres, to the nearest tenth.";
    sol="Side AC is opposite angle B and side BC is opposite angle A, so the sine law pairs them: \\[ \\begin{aligned} "+FR("x","\\sin "+B+"^\\circ")+" &= "+FR(given,"\\sin "+A+"^\\circ")+" \\\\ x &= "+FR(given+" \\sin "+B+"^\\circ","\\sin "+A+"^\\circ")+" \\\\ &\\approx "+u7f1(raw)+" \\end{aligned} \\] The length of side AC is <b>\\("+u7f1(ans)+"\\) cm</b>.";
    fig=triSVG(aLen,bLen,cLen,{L:["A","B","C"],ang:[A+"°",B+"°",null],side:[given+" cm","?",null]});
  }else{
    prompt="In triangle ABC, angle A is \\("+A+"^\\circ\\) and angle B is \\("+B+"^\\circ\\). Side AB, opposite angle C, is \\("+given+"\\) cm. Find the length of side BC, in centimetres, to the nearest tenth.";
    sol="Angle C comes from the angle sum first; then the sine law pairs side BC with angle A and side AB with angle C: \\[ \\begin{aligned} C &= 180^\\circ - "+A+"^\\circ - "+B+"^\\circ \\\\ &= "+C+"^\\circ \\\\ "+FR("x","\\sin "+A+"^\\circ")+" &= "+FR(given,"\\sin "+C+"^\\circ")+" \\\\ x &= "+FR(given+" \\sin "+A+"^\\circ","\\sin "+C+"^\\circ")+" \\\\ &\\approx "+u7f1(raw)+" \\end{aligned} \\] The length of side BC is <b>\\("+u7f1(ans)+"\\) cm</b>.";
    fig=triSVG(aLen,bLen,cLen,{L:["A","B","C"],ang:[A+"°",B+"°",null],side:["?",null,given+" cm"]});
  }
  var q=numq(prompt,ans,0.06,sol,{mode:mode,A:A,B:B,given:given,ans:ans});
  q.figure=fig;
  return q;
});
E("u3-pk-sine-law-angle",3,["7.1"],2,"gen",function(){
  /* Ambiguous-case guard: the target angle is dealt at least 8 degrees
     below the given angle A, so side b (opposite the target) stays below
     side a (opposite A). Then sin B = b sin A / a gives B below A, hence
     acute, and the supplement of B can never pair with A to form a
     triangle. The configuration is never ambiguous. */
  var A=pick([40,45,50,55,60,65]);
  var Btar=pick([20,25,28,30,32,35,38,40,45,50,55].filter(function(x){return x<=A-8;}));
  var a=ri(15,50);
  var b=u7r1(a*u7sinD(Btar)/u7sinD(A));
  var sVal=b*u7sinD(A)/a;
  var Bact=u7asinD(sVal);
  var ans=Math.round(Bact);
  var cLen=a*u7sinD(180-A-Bact)/u7sinD(A);
  var q=numq("In triangle ABC, angle A is \\("+A+"^\\circ\\), side BC, opposite angle A, is \\("+a+"\\) cm, and side AC, opposite angle B, is \\("+u7f1(b)+"\\) cm. Find the measure of angle B, in degrees, to the nearest degree.",
    ans,0.51,
    "Side AC is opposite angle B and side BC is opposite angle A, so the sine law pairs them: \\[ \\begin{aligned} \\sin x &= "+FR(u7f1(b)+" \\sin "+A+"^\\circ",a)+" \\\\ &\\approx "+fmt(sVal,4)+" \\\\ x &= \\sin^{-1}("+fmt(sVal,4)+") \\\\ &\\approx "+ans+"^\\circ \\end{aligned} \\] The measure of angle B is <b>\\("+ans+"^\\circ\\)</b>.",
    {A:A,a:a,b:b,ans:ans});
  q.figure=triSVG(a,b,cLen,{L:["A","B","C"],ang:[A+"°","?",null],side:[a+" cm",u7f1(b)+" cm",null]});
  return q;
});
E("u3-pk-cosine-law-side",3,["7.1"],1,"gen",function(){
  var a=0,b=0,C=0,raw=0,tries=0;
  do{
    a=ri(8,45);b=ri(8,45);C=pick([40,50,60,70,80,90,100,110,120]);
    raw=Math.sqrt(a*a+b*b-2*a*b*u7cosD(C));
    tries++;
  }while((raw<5||raw>60)&&tries<60);
  if(raw<5||raw>60){a=20;b=26;C=70;raw=Math.sqrt(a*a+b*b-2*a*b*u7cosD(C));}
  var ans=u7r1(raw);
  var q=numq("In triangle ABC, side BC is \\("+a+"\\) cm and side AC is \\("+b+"\\) cm, and the angle between them, angle C, is \\("+C+"^\\circ\\). Find the length of side AB, in centimetres, to the nearest tenth.",
    ans,0.06,
    "Side AB sits opposite the angle between the two known sides, so the cosine law applies directly: \\[ \\begin{aligned} x^2 &= "+a+"^2 + "+b+"^2 - 2("+a+")("+b+")\\cos "+C+"^\\circ \\\\ &= "+(a*a)+" + "+(b*b)+" - "+(2*a*b)+"\\cos "+C+"^\\circ \\\\ &\\approx "+fmt(raw*raw,1)+" \\\\ x &\\approx "+u7f1(raw)+" \\end{aligned} \\] The length of side AB is <b>\\("+u7f1(ans)+"\\) cm</b>.",
    {a:a,b:b,C:C,ans:ans});
  q.figure=triSVG(a,b,raw,{L:["A","B","C"],ang:[null,null,C+"°"],side:[a+" cm",b+" cm","?"]});
  return q;
});
E("u3-pk-cosine-law-angle",3,["7.1"],2,"gen",function(){
  var Atar=0,b=0,c=0,a=0,tries=0;
  do{
    Atar=pick([25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115]);
    b=ri(10,35);c=ri(10,35);
    a=u7r1(Math.sqrt(b*b+c*c-2*b*c*u7cosD(Atar)));
    tries++;
  }while((a<5||a>60)&&tries<60);
  if(a<5||a>60){b=14;c=19;Atar=50;a=u7r1(Math.sqrt(b*b+c*c-2*b*c*u7cosD(Atar)));}
  var cosA=(b*b+c*c-a*a)/(2*b*c);
  var ans=Math.round(Math.acos(cosA)*180/Math.PI);
  var q=numq("Triangle ABC has side BC of length \\("+u7f1(a)+"\\) cm, side AC of length \\("+b+"\\) cm and side AB of length \\("+c+"\\) cm. Find the measure of angle A, in degrees, to the nearest degree.",
    ans,0.51,
    "Angle A is opposite side BC, so rearrange the cosine law to solve for the angle: \\[ \\begin{aligned} \\cos A &= "+FR(b+"^2 + "+c+"^2 - "+u7f1(a)+"^2","2("+b+")("+c+")")+" \\\\ &= "+FR((b*b)+" + "+(c*c)+" - "+fmt(a*a,1),(2*b*c))+" \\\\ &\\approx "+fmt(cosA,4)+" \\\\ A &\\approx "+ans+"^\\circ \\end{aligned} \\] The measure of angle A is <b>\\("+ans+"^\\circ\\)</b>.",
    {a:a,b:b,c:c,ans:ans});
  q.figure=triSVG(a,b,c,{L:["A","B","C"],ang:["?",null,null],side:[u7f1(a)+" cm",b+" cm",c+" cm"]});
  return q;
});
E("u3-pk-params-characteristics",3,["7.1"],1,"gen",function(){
  var mode=ri(0,2),a=pick([-3,-2,-1,1,2,3]),b=ri(-8,8)||3,c=ri(-9,9)||4;
  var eq="\\(y = "+(a<0?"-"+Math.abs(a):a)+"x^2"+(b>0?" + "+b+"x":" - "+Math.abs(b)+"x")+(c>0?" + "+c:" - "+Math.abs(c))+"\\)";
  if(mode===0){
    var pool=[-c,b,-b,a,c+2,c-2,c+1,c-1,c+3,c-3,2*c],ds=[];
    pool.forEach(function(d){if(d!==c&&ds.indexOf(d)<0)ds.push(d);});
    var off=4;while(ds.length<3){var cand=c+off;if(cand!==c&&ds.indexOf(cand)<0)ds.push(cand);off=off>0?-off-1:-off+1;}
    var q=mcq("For "+eq+", what is the y-intercept of the graph?","\\("+c+"\\)",ds.slice(0,3).map(function(d){return "\\("+d+"\\)";}),
      "The y-intercept is the constant term, \\(c = "+c+"\\): it is where \\(x = 0\\), so \\(y = "+c+"\\)"+".",{mode:mode,a:a,b:b,c:c});
    q.figure=parSVG(a,b,c,{});
    return q;
  }
  if(mode===1){
    var up=a>0;
    var good=up?"Opens upward; the vertex is a minimum":"Opens downward; the vertex is a maximum";
    var all=["Opens upward; the vertex is a minimum","Opens upward; the vertex is a maximum","Opens downward; the vertex is a minimum","Opens downward; the vertex is a maximum"];
    var q=mcq("For "+eq+", which statement describes the graph?",good,all.filter(function(x){return x!==good;}),
      "The sign of \\(a\\) decides the opening: \\(a = "+a+"\\)"+(up?" is positive, so the parabola opens upward and its vertex is the lowest point — a minimum.":" is negative, so the parabola opens downward and its vertex is the highest point — a maximum."),{mode:mode,a:a,b:b,c:c});
    q.figure=parSVG(a,b,c,{});
    return q;
  }
  var k=pick([-4,-3,-2,-1,1,2,3,4]);b=2*a*k;
  eq="\\(y = "+(a<0?"-"+Math.abs(a):a)+"x^2"+(b>0?" + "+b+"x":" - "+Math.abs(b)+"x")+(c>0?" + "+c:" - "+Math.abs(c))+"\\)";
  var ans=-k,pool2=[k,-2*k,b,-b,2*k],ds2=[];
  pool2.forEach(function(d){if(d!==ans&&ds2.indexOf(d)<0)ds2.push(d);});
  var q=mcq("For "+eq+", what is the axis of symmetry?","\\(x = "+ans+"\\)",ds2.slice(0,3).map(function(d){return "\\(x = "+d+"\\)";}),
    "The axis of symmetry is \\(x = \\frac{-b}{2a} = \\frac{-("+b+")}{"+(2*a)+"} = "+ans+"\\)"+".",{mode:mode,a:a,b:b,c:c,k:k});
  q.figure=parSVG(a,b,c,{});
  return q;
});
E("u4-pk-repeated-mult",4,["4.1"], 1, "gen", function () {
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
E("u4-pk-two-laws",4,["4.1"], 1, "gen", function () {
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
E("u4-pk-laws-integral",4,["4.1"],2,"gen",function(){
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
E("u4-pk-rational-pattern",4,["4.1"],1,"var",varset([
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
E("u5-pk-laws-rational",5,["1.1"],2,"gen",function(){
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
E("u5-pk-negative-exp",5,["1.1"],1,"gen",function(){
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
E("u5-pk-evaluate-exp",5,["1.1"],1,"gen",function(){
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
E("u5-pk-rational-exp",5,["1.1"],1,"gen",function(){
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
E("u6-pk-percent-of",6,["1.6"], 1, "gen", function () {
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
E("u6-pk-percent-convert",6,["1.6"], 1, "gen", function () {
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
E("u6-pk-find-whole",6,["1.6"], 2, "gen", function () {
  var pool = [[25, 60], [20, 80], [30, 90], [40, 150], [50, 70], [75, 120], [80, 200], [10, 240], [60, 300], [90, 400], [15, 200], [35, 260], [12, 250], [16, 150], [18, 200], [22, 150], [28, 250], [32, 200], [38, 150], [42, 200], [48, 250], [52, 200], [56, 150], [64, 200], [72, 250], [84, 150], [88, 200], [45, 180], [65, 140], [85, 220], [55, 160], [95, 300]];
  var pr = pick(pool), p = pr[0], W = pr[1], part = W * p / 100;
  var ctxs = [
    { q: part + " students is " + p + "% of the students in a school. How many students are in the school?", unit: "students" },
    { q: "A team scored " + part + " points, which is " + p + "% of the points it needs for a banner. How many points does the team need in total?", unit: "points" },
    { q: "After a morning sale, " + part + " tickets remained unsold, and that is " + p + "% of the tickets printed. How many tickets were printed?", unit: "tickets" }
  ];
  var cx = pick(ctxs);
  var sol = "The part and its percent give the whole when the part is divided by the percent as a decimal: \\[ \\begin{aligned} \\text{whole} &= " + part + " \\div " + fmt(p / 100, 2) + " \\\\ &= " + W + " \\end{aligned} \\] So the whole is <b>" + W + " " + cx.unit + "</b>.";
  return numq(cx.q, W, 0.01, sol, { mode: "find-whole", p: p, part: part });
}, ["The given amount is only the named percent of the whole, so the whole is larger.", "First write the percent as a decimal, then divide the part by that decimal."]);
E("u6-pk-discount-then-tax",6,["1.6"], 2, "gen", function () {
  var items = ["winter jacket", "bicycle helmet", "pair of snowshoes", "school backpack", "set of curling gloves", "rain coat"];
  var item = pick(items), P = pick([60, 80, 100, 120, 160, 200, 240, 300, 400]), d = pick([10, 20, 25, 30, 40, 50]);
  var sale = P * (1 - d / 100), fin = u5r2(sale * 1.15), tax = u5r2(fin - sale);
  var sol = "Apply the discount first, then add HST of 15% to the sale price: \\[ \\begin{aligned} \\text{sale price} &= " + fmtF(P, 2) + " \\times " + fmt(1 - d / 100, 2) + " = " + fmtF(sale, 2) + " \\\\ \\text{final price} &= " + fmtF(sale, 2) + " \\times 1.15 = " + fmtF(fin, 2) + " \\end{aligned} \\] So the final price is <b>$" + fmtF(fin, 2) + "</b>.";
  return numq("A " + item + " is priced at $" + fmtF(P, 2) + ". It is on sale for " + d + "% off. HST of 15% is then added to the sale price. What is the final price, in dollars?", fin, 0.01, sol, { mode: "disc-tax", p: P, d: d });
}, ["Combined percents act one after the other, and the second percent acts on the new amount.", "First take the discount off the full price to get the sale price."]);
E("u6-pk-percent-change",6,["1.6"], 3, "gen", function () {
  var inc = Math.random() < 0.5;
  var c = inc ? pick([5, 10, 15, 20, 25, 30, 40, 50, 60, 80, 100]) : pick([5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 80]);
  var O = pick([40, 60, 80, 100, 120, 160, 200, 240, 300, 400, 500]);
  var N = O * (inc ? 1 + c / 100 : 1 - c / 100);
  var ctxs = inc ? [
    "School enrolment rose from " + O + " students one year to " + fmt(N, 0) + " students the next year. What is the percent increase in enrolment?",
    "A player's scoring total rose from " + O + " points last season to " + fmt(N, 0) + " points this season. What is the percent increase in the scoring total?",
    "A town trail network grew from " + O + " km of trails to " + fmt(N, 0) + " km of trails. What is the percent increase in trail length?"
  ] : [
    "A jacket price dropped from $" + O + " to $" + fmt(N, 0) + ". What is the percent decrease in the price?",
    "A pond water level count fell from " + O + " cm of depth in spring to " + fmt(N, 0) + " cm in late summer. What is the percent decrease in depth?",
    "A team bus fuel use fell from " + O + " L on one trip to " + fmt(N, 0) + " L on the same trip a year later. What is the percent decrease in fuel use?"
  ];
  var prompt = pick(ctxs), diff = Math.abs(N - O);
  var sol = "Percent change compares the change with the starting amount: \\[ \\begin{aligned} \\text{change} &= " + fmt(diff, 0) + " \\\\ \\text{percent change} &= " + FR(fmt(diff, 0), O) + " \\times 100 = " + c + "\\% \\end{aligned} \\] So the percent " + (inc ? "increase" : "decrease") + " is <b>" + c + "%</b>.";
  return numq(prompt + " Give the percent as a number.", c, 0.01, sol, { mode: inc ? "pct-inc" : "pct-dec", c: c, o: O });
}, ["Percent change always uses the starting amount as the whole, not the ending amount.", "First find the size of the change, then divide it by the starting amount."]);
E("u7-pk-sort-numbers",7,["2.1"],1,"gen",function(){
  function ratItem(){
    var kind=ri(1,5);
    if(kind===1){var p=ri(1,15),q=pick([2,3,4,5,6,7,8,9]),tg=0;while(u2gcd(p,q)!==1&&tg<60){p=ri(1,15);q=pick([2,3,4,5,6,7,8,9]);tg++;}return {str:"\\("+FR(p,q)+"\\)",rat:true};}
    if(kind===2){return {str:""+pick([0.5,1.25,2.75,3.4,0.125,5.6,7.05,0.9]),rat:true};}
    if(kind===3){var r=ri(2,12);return {str:"\\(\\sqrt{"+(r*r)+"}\\)",rat:true};}
    if(kind===4){return {str:"\\(0.\\overline{"+ri(2,9)+"}\\)",rat:true};}
    var r5=ri(2,6);return {str:"\\(\\sqrt[3]{"+(r5*r5*r5)+"}\\)",rat:true};
  }
  function irrItem(){
    var kind=ri(1,4);
    if(kind===1){var n=ri(2,60);var t=0;while(u2isSq(n)&&t<100){n=ri(2,60);t++;}return {str:"\\(\\sqrt{"+n+"}\\)",rat:false};}
    if(kind===2){var n2=ri(2,80);var t2=0;while(u2isCu(n2)&&t2<100){n2=ri(2,80);t2++;}return {str:"\\(\\sqrt[3]{"+n2+"}\\)",rat:false};}
    if(kind===3){return {str:"\\(\\pi\\)",rat:false};}
    return {str:pick(["1.01001000100001...","2.12112111211112...","0.123456789101112...","3.23223222322223..."]),rat:false};
  }
  var mode=ri(1,3);
  if(mode===3){
    function rawOf(it){var s=it.str;if(s.slice(0,2)==="\\("&&s.slice(-2)==="\\)")return s.slice(2,-2);return s;}
    function fragSet(wantBad){
      var frags=[],seenF={},g=0;
      while(frags.length<3&&g<300){g++;
        var it=(wantBad&&frags.length===2)?irrItem():ratItem();
        var f=rawOf(it);
        if(seenF[f])continue;seenF[f]=1;frags.push(f);}
      return shuffle(frags);
    }
    function setStr(frags){return "\\(\\{"+frags.join(", ")+"\\}\\)";}
    var good=setStr(fragSet(false));
    var bads=[],guard=0;
    while(bads.length<3&&guard<200){guard++;var bs=setStr(fragSet(true));if(bs!==good&&bads.indexOf(bs)<0)bads.push(bs);}
    return mcq("Which set contains <b>only</b> rational numbers?",
      good,bads,
      "A rational number can be written as a ratio of integers, which includes fractions, terminating decimals, repeating decimals, and roots of perfect powers. Roots of numbers that are not perfect powers, \\(\\pi\\), and decimals that go on without repeating are irrational. Only one set avoids all of those. The set with only rational numbers is <b>"+good+"</b>.",
      {mode:mode,keyStr:good});
  }
  var wantIrr=(mode===1);
  var items=[],seen={};
  function addItem(it){if(!it||seen[it.str])return;seen[it.str]=1;items.push(it);}
  if(wantIrr){
    addItem(irrItem());
    var g1=0;while(items.length<4&&g1<300){g1++;addItem(ratItem());}
  }else{
    addItem(ratItem());
    var g2=0;while(items.length<4&&g2<300){g2++;addItem(irrItem());}
  }
  var target=items.filter(function(x){return x.rat===!wantIrr;})[0];
  var others=items.filter(function(x){return x!==target;}).map(function(x){return x.str;});
  return mcq(wantIrr?"Which number is <b>irrational</b>?":"Which number is <b>rational</b>?",
    target.str,others,
    "Rational numbers are exactly the numbers that can be written as a ratio of two integers: fractions, terminating or repeating decimals, and roots that come out whole. A root of a number that is not a perfect power, the number \\(\\pi\\), and a decimal that continues without repeating are irrational. The "+(wantIrr?"irrational":"rational")+" number in the list is <b>"+target.str+"</b>.",
    {mode:mode,items:items,keyStr:target.str});
});
E("u7-pk-subsets",7,["2.1"],1,"var",varset([
  function(){var key="Integers: the whole numbers, their negatives, and zero";
    return mcq("What is the <b>most specific</b> subset of the real numbers that \\(-12\\) belongs to?",
    key,["Natural numbers: the counting numbers, starting from one","Whole numbers: the counting numbers, together with zero","Rational numbers: ratios of two integers"],
    "The number \\(-12\\) is a negative whole value. It is not a natural number (the counting numbers start at \\(1\\)) and not a whole number (whole numbers are \\(0\\) and up). It is an integer, and although every integer is also rational, the most specific set that fits is the integers. The most specific subset is <b>integers</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Whole numbers: the counting numbers, together with zero";
    return mcq("What is the <b>most specific</b> subset of the real numbers that \\(0\\) belongs to?",
    key,["Natural numbers: the counting numbers, starting from one","Integers: the whole numbers, their negatives, and zero","Rational numbers: ratios of two integers"],
    "The number \\(0\\) is not a natural number, because the natural numbers are the counting numbers \\(1, 2, 3, \\ldots\\). It is a whole number, since the whole numbers are the natural numbers together with \\(0\\). It is also an integer and a rational number, but the most specific set that fits is the whole numbers. The most specific subset is <b>whole numbers</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Rational numbers: ratios of two integers, with a nonzero denominator";
    return mcq("What is the <b>most specific</b> subset of the real numbers that \\("+FR(4,5)+"\\) belongs to?",
    key,["Natural numbers: the counting numbers, starting from one and continuing without end","Whole numbers: the counting numbers, together with zero","Integers: the whole numbers, their negatives, and zero"],
    "The value \\("+FR(4,5)+"\\) is a ratio of two integers, which is exactly the definition of a rational number. It is not a counting number, a whole number, or an integer, because it lies between \\(0\\) and \\(1\\). The most specific subset is <b>rational numbers</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Irrational numbers: real numbers that are not ratios of integers";
    return mcq("What is the <b>most specific</b> subset of the real numbers that \\(\\sqrt{7}\\) belongs to?",
    key,["Natural numbers: the counting numbers, starting from one","Integers: the whole numbers, their negatives, and zero","Rational numbers: ratios of two integers, with a nonzero denominator, in lowest terms"],
    "The value \\(\\sqrt{7}\\) cannot be written as a ratio of two integers, because \\(7\\) is not a perfect square and its root is a non-terminating, non-repeating decimal. Numbers that are real but not rational form the irrational numbers. The most specific subset is <b>irrational numbers</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Natural numbers: the counting numbers, starting from one";
    return mcq("What is the <b>most specific</b> subset of the real numbers that \\(9\\) belongs to?",
    key,["Whole numbers: the counting numbers, together with the number zero","Integers: the whole numbers, their negatives, and zero","Rational numbers: ratios of two integers"],
    "The number \\(9\\) is a counting number, so it is a natural number. Every natural number is also a whole number, an integer, and a rational number, since the sets nest inside each other, but the most specific set that fits is the smallest one containing it. The most specific subset is <b>natural numbers</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Every integer is also a rational number";
    return mcq("Which statement about the subsets of the real numbers is <b>true</b>?",
    key,
    ["Every rational number is an integer","Every whole number is also a natural number","Irrational numbers are rational numbers written in lowest terms"],
    "The subsets nest: natural numbers sit inside whole numbers, inside integers, inside rational numbers. So any integer \\(k\\) can be written as the ratio \\("+FR("k",1)+"\\), which makes it rational. The reverse claims fail: \\("+FR(1,2)+"\\) is rational but not an integer, \\(0\\) is whole but not natural, and irrational numbers cannot be written as ratios at all. The true statement is: <b>every integer is also a rational number</b>.",
    {stmt:true,keyText:key});}
]));
E("u8-pk-sample-space",8,["9.16"],1,"gen",function(){
  var mode=pick(["table","table","count","favcount"]);
  if(mode==="table"){
    var d=pick([3,4,5,6]);var useSpin=Math.random()<0.4;
    var colHead=useSpin?["A","B","C"]:["H","T"];var ncols=colHead.length;
    var rows=[];for(var r=1;r<=d;r++){var row=[String(r)];for(var c=0;c<ncols;c++)row.push(colHead[c]+r);rows.push(row);}
    var total=d*ncols;var ask=pick(["total","dienum","single"]);
    if(ask==="total"){
      var dsT=u7numOpts(total,[total+ncols,total-d,d+ncols]).map(function(v){return {t:String(v),fb:"Multiply the outcomes of one event by the outcomes of the other, or count every cell in the table."};});
      var qT=mcq("The table shows all outcomes when a "+(useSpin?"three-section spinner is spun":"coin is tossed")+" and a "+d+"-sided die is rolled. How many outcomes are in the sample space?",
        {t:String(total),fb:"Yes: "+d+" die results times "+ncols+" results from the other event gives "+total+"."},dsT,
        "Multiply the outcomes of each event: \\("+d+" \\times "+ncols+" = "+total+"\\). The sample space has <b>"+total+"</b> outcomes.",{mode:"table"});
      qT.figure=u7tableSVG("Die",colHead,rows);return qT;
    }
    if(ask==="dienum"){var target=ri(1,d);
      /* Option A fix (Nov 2026): this ask is worded for the coin, so force the coin table here regardless of the spinner draw; the spinner table stays in play for the total ask only. */
      var chead=["H","T"],cnc=2,ctot=d*2,crows=[];for(var cr=1;cr<=d;cr++){var crow=[String(cr)];for(var cc=0;cc<cnc;cc++)crow.push(chead[cc]+cr);crows.push(crow);}
      var dsD=u7numOpts(cnc,[cnc+1,ctot,d]).map(function(v){return {t:String(v),fb:"Find the row for that die number and count its cells, one for each result of the other event."};});
      var qD=mcq("The table shows all outcomes when a coin is tossed and a "+d+"-sided die is rolled. How many outcomes have die number "+target+"?",
        {t:String(cnc),fb:"Yes: die number "+target+" appears once with heads and once with tails."},dsD,
        "The row for die number "+target+" holds one cell for heads and one for tails. The answer is <b>"+cnc+"</b> outcomes.",{mode:"table"});
      qD.figure=u7tableSVG("Die",chead,crows);return qD;
    }
    var k=ri(1,d);var face=pick(["H","T"]);
    /* Option A fix (Nov 2026): as in the dienum branch above, force the coin table for this coin-worded ask. */
    var chead=["H","T"],cnc=2,ctot=d*2,crows=[];for(var cr=1;cr<=d;cr++){var crow=[String(cr)];for(var cc=0;cc<cnc;cc++)crow.push(chead[cc]+cr);crows.push(crow);}
    var dsS=u7numOpts(1,[2,d,ctot]).map(function(v){return {t:String(v),fb:"A single exact combination appears exactly once in a complete outcome table."};});
    var qS=mcq("The table shows all outcomes when a coin is tossed and a "+d+"-sided die is rolled. How many outcomes are exactly "+face+k+" (coin result "+face+", die number "+k+")?",
      {t:"1",fb:"Yes: that exact combination fills exactly one cell of the table."},dsS,
      "Each cell of the table is one exact combination, and "+face+k+" fills one cell. The answer is <b>1</b>.",{mode:"table"});
    qS.figure=u7tableSVG("Die",chead,crows);return qS;
  }
  var devA=[["coin",2],["three-section spinner",3],["four-section spinner",4],["five-section spinner",5],["six-sided die",6],["eight-sided die",8]];
  var devB=[["coin",2],["four-sided die",4],["six-section spinner",6],["eight-sided die",8],["three-section spinner",3],["four-sided die",4]];
  var A=pick(devA),B=pick(devB);var guard=0;while(A[1]*B[1]>36&&guard<20){B=pick(devB);guard++;}
  if(A[1]*B[1]>36){B=["four-sided die",4];}
  var tot=A[1]*B[1];
  if(mode==="favcount"){
    var dsF=u7numOpts(A[1],[B[1],tot,A[1]+B[1]]).map(function(v){return {t:String(v),fb:"Fix the named result for the second event; the first event can still show any of its outcomes."};});
    return mcq("A "+A[0]+" is used together with a "+B[0]+". In the combined sample space, how many outcomes show one specified result on the "+B[0]+" (with any result on the "+A[0]+")?",
      {t:String(A[1]),fb:"Yes: the second event is fixed, and the "+A[0]+" can show any of its "+A[1]+" outcomes."},dsF,
      "With the second event fixed at one result, the first event still has "+A[1]+" possible results. The answer is <b>"+A[1]+"</b> outcomes.",{mode:"favcount"});
  }
  var ds3=u7numOpts(tot,[A[1]+B[1],tot+4,Math.max(tot-2,2),tot*2]).map(function(v){return {t:String(v),fb:"For independent events, multiply the number of outcomes of each event."};});
  return mcq("A "+A[0]+" is used together with a "+B[0]+". How many outcomes are in the combined sample space?",
    {t:String(tot),fb:"Yes: "+A[1]+" outcomes times "+B[1]+" outcomes gives "+tot+"."},ds3,
    "The events are independent, so multiply: \\("+A[1]+" \\times "+B[1]+" = "+tot+"\\). The sample space has <b>"+tot+"</b> outcomes.",{mode:"count"});
},["For two independent events, multiply the outcome counts to size the sample space.","Start by counting the outcomes of each event on its own."]);
E("u8-pk-product-rule",8,["9.16"], 1, "gen", function () {
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
E("u8-pk-two-draws",8,["9.16"], 1, "gen", function () {
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
E("u9-pk-prob-basic-b",9,["9.1"],1,"gen",function(){
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
E("u9-pk-exp-vs-theor-b",9,["9.1"],1,"gen",function(){
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
E("u9-pk-combined-decision",9,["9.1"], 1, "var", varset([
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
var PK3201_FOR_C1=["3.1","3.2","3.3","3.4","3.5","3.6","3.7","3.8","3.9","3.10","3.11","3.12","3.13","3.14","3.15","3.16"];
var PK3201_FOR_C2=["3.17","3.18","3.19","3.20","3.21","3.22"];
var PK3201_FOR_C3=["7.1","7.2","7.3","7.4","7.5","7.6","7.7"];
var PK3201_FOR_C4=["4.1","4.3","4.5","4.7","4.8","4.9","4.11","4.12","4.13"];
var PK3201_FOR_C5=["1.1","1.2","1.3","1.4","1.5","4.2","4.4","4.6","4.10","4.14","4.15"];
var PK3201_FOR_C6=["1.6","1.7","1.8","1.9","1.10","1.11","1.12","1.13","1.14","1.15","1.16","1.17"];
var PK3201_FOR_C7=["2.1","2.2","2.3","2.4","2.5","2.6","2.7"];
var PK3201_FOR_C8=["9.16","9.17","9.18","9.19","9.20","9.21","9.22","9.23","9.24","9.25","9.26","9.27","9.28","9.29","9.30","9.31","9.32"];
var PK3201_FOR_C9=["9.1","9.2","9.3","9.4","9.5","9.6","9.7","9.8","9.9","9.10","9.11","9.12","9.13","9.14","9.15"];
var PKT3201={
  "u1-pk-frac-context":{src:"Math 9 indicator 6.1",group:"fraction-operations",for:PK3201_FOR_C1},
  "u1-pk-add-unlike":{src:"Math 9 indicator 6.1",group:"fraction-operations",for:PK3201_FOR_C1},
  "u1-pk-multiply-fractions":{src:"Math 9 indicator 6.1",group:"fraction-operations",for:PK3201_FOR_C1},
  "u1-pk-gcf":{src:"Math 1201 indicator 3.10",group:"factoring",for:PK3201_FOR_C1},
  "u1-pk-factor-monic":{src:"Math 1201 indicator 3.12",group:"factoring",for:PK3201_FOR_C1},
  "u1-pk-diff-squares":{src:"Math 1201 indicator 3.14",group:"factoring",for:PK3201_FOR_C1},
  "u2-pk-domain-range":{src:"Math 2201 indicator 4.1",group:"domain-range",for:PK3201_FOR_C2},
  "u2-pk-vertex-form-params":{src:"Math 2201 indicator 4.15",group:"transformations",for:PK3201_FOR_C2},
  "u2-pk-axis-from-intercepts":{src:"Math 2201 indicator 4.13",group:"graph-reading",for:PK3201_FOR_C2},
  "u2-pk-graph-description":{src:"Math 2201 indicator 4.14",group:"graph-reading",for:PK3201_FOR_C2},
  "u2-pk-which-quadratic":{src:"Math 2201 indicator 4.10",group:"graph-reading",for:PK3201_FOR_C2},
  "u3-pk-label-sides":{src:"Math 2201 indicator 7.1",group:"trig-sides",for:PK3201_FOR_C3},
  "u3-pk-ratio-def":{src:"Math 2201 indicator 7.2",group:"trig-ratios",for:PK3201_FOR_C3},
  "u3-pk-find-side":{src:"Math 1201 indicator 7.4",group:"find-side",for:PK3201_FOR_C3},
  "u3-pk-solve-triangle":{src:"Math 1201 indicator 7.6",group:"solve-triangle",for:PK3201_FOR_C3},
  "u3-pk-sine-law-side":{src:"Math 2201 Unit 1, sine law",group:"sine-law",for:PK3201_FOR_C3},
  "u3-pk-sine-law-angle":{src:"Math 2201 Unit 1, sine law",group:"sine-law",for:PK3201_FOR_C3},
  "u3-pk-cosine-law-side":{src:"Math 2201 Unit 1, cosine law",group:"cosine-law",for:PK3201_FOR_C3},
  "u3-pk-cosine-law-angle":{src:"Math 2201 Unit 1, cosine law",group:"cosine-law",for:PK3201_FOR_C3},
  "u3-pk-params-characteristics":{src:"Math 2201 indicator 4.10",group:"graph-reading",for:PK3201_FOR_C3},
  "u4-express-as-power":{src:"Math 9 indicators 3.6, 3.7 and 3.10 (seed entry, flagged by the November 13, 2026 audit; metadata completed by this tranche)",group:"powers",for:PK3201_FOR_C4},
  "u4-pk-repeated-mult":{src:"Math 1201 indicator 1.3",group:"repeated-multiplication",for:PK3201_FOR_C4},
  "u4-pk-two-laws":{src:"Math 1201 indicator 1.6",group:"exponent-laws",for:PK3201_FOR_C4},
  "u4-pk-laws-integral":{src:"Math 1201 indicator 1.6",group:"exponent-laws",for:PK3201_FOR_C4},
  "u4-pk-rational-pattern":{src:"Math 1201 indicator 1.2",group:"exponent-laws",for:PK3201_FOR_C4},
  "u5-pk-laws-rational":{src:"Math 1201 indicator 1.6",group:"exponent-laws",for:PK3201_FOR_C5},
  "u5-pk-negative-exp":{src:"Math 1201 indicator 1.5",group:"exponent-laws",for:PK3201_FOR_C5},
  "u5-pk-evaluate-exp":{src:"Math 1201 indicators 1.6 and 1.3",group:"exponent-laws",for:PK3201_FOR_C5},
  "u5-pk-rational-exp":{src:"Math 1201 indicator 1.3",group:"exponent-laws",for:PK3201_FOR_C5},
  "u6-pk-percent-of":{src:"Math 8 indicator 6.1",group:"percent-of-amount",for:PK3201_FOR_C6},
  "u6-pk-percent-convert":{src:"Math 8 indicator 3.5",group:"percent-of-amount",for:PK3201_FOR_C6},
  "u6-pk-find-whole":{src:"Math 8 indicator 6.1",group:"percent-of-amount",for:PK3201_FOR_C6},
  "u6-pk-discount-then-tax":{src:"Math 8 indicator 6.2",group:"percent-change",for:PK3201_FOR_C6},
  "u6-pk-percent-change":{src:"Math 8 indicator 6.1",group:"percent-change",for:PK3201_FOR_C6},
  "u7-pk-sort-numbers":{src:"Math 1201 indicator 1.18",group:"real-numbers",for:PK3201_FOR_C7},
  "u7-pk-subsets":{src:"Math 1201 indicator 1.19",group:"real-numbers",for:PK3201_FOR_C7},
  "u8-pk-sample-space":{src:"Math 8 indicator 12.1",group:"listing-outcomes",for:PK3201_FOR_C8},
  "u8-pk-product-rule":{src:"Math 9 indicator 12.4",group:"listing-outcomes",for:PK3201_FOR_C8},
  "u8-pk-two-draws":{src:"Math 9 indicator 12.4",group:"listing-outcomes",for:PK3201_FOR_C8},
  "u9-prob-basics":{src:"Math 7 indicator 12.1 (seed entry, flagged by this tranche)",group:"probability-forms",for:PK3201_FOR_C9},
  "u9-context-prob":{src:"Math 7 indicator 12.1 and Math 9 indicator 12.4 (seed entry, flagged by this tranche)",group:"probability-forms",for:PK3201_FOR_C9},
  "u9-decisions":{src:"Math 9 indicator 12.4 (seed entry, flagged by this tranche)",group:"probability-decisions",for:PK3201_FOR_C9},
  "u9-pk-prob-basic-b":{src:"Math 9 indicator 12.4",group:"probability-forms",for:PK3201_FOR_C9},
  "u9-pk-exp-vs-theor-b":{src:"Math 9 indicator 12.4",group:"probability-forms",for:PK3201_FOR_C9},
  "u9-pk-combined-decision":{src:"Math 9 indicator 12.4",group:"probability-decisions",for:PK3201_FOR_C9}
};
BANK.forEach(function(e){var t=PKT3201[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=t.for.slice();e.pkGroup=t.group;if(t.bridge)e.pkBridge=true;}});
