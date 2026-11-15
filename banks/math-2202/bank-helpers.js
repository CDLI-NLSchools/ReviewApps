/* Math 2202 bank helpers: FR and the option-text balancing
   helpers (balDpStrs, balOpts), cut verbatim from the head of
   the standalone bank source (math-2202-review/bank-src.js,
   lines 1 to 69), where they precede the Unit 1 banner. */
/* Math 2202 Review bank source. Assembled November 7, 2026 from work/unit1.js to
   unit8.js. FR returns the raw \frac fragment for use INSIDE math delimiters,
   defined here for the entries that use it. CR_MARKS stays at the end of this file. */
function FR(n,d){return "\\frac{"+n+"}{"+d+"}";}

function balDpStrs(strs){
  /* Guard: if any two option texts are already identical, return the input
     untouched. The bank's dedupe (mcq) and the Unit 7 retry wrapper key on
     identical texts; padding one of a duplicate pair ("7" -> "7.00") would
     defeat that and could put a distractor with the key's value on screen. */
  for(var g=0;g<strs.length;g++) for(var h=g+1;h<strs.length;h++) if(String(strs[g])===String(strs[h])) return strs;
  var parsed=[], suf=null;
  for(var i=0;i<strs.length;i++){
    var m=String(strs[i]).match(/^(-?\d+(?:\.\d+)?)([\s\S]*)$/);
    if(!m) return strs;
    if(m[1].indexOf(",")>=0) return strs;
    if(suf===null) suf=m[2]; else if(m[2]!==suf) return strs;
    parsed.push({v:parseFloat(m[1]), dp:(m[1].split(".")[1]||"").length});
  }
  function countsOk(dps){ var c={}; dps.forEach(function(d){ c[d]=(c[d]||0)+1; }); return Object.keys(c).every(function(k){ return c[k]!==1; }); }
  if(countsOk(parsed.map(function(p){ return p.dp; }))) return strs;
  function render(assign){ return parsed.map(function(p,i){ return p.v.toFixed(assign[i])+suf; }); }
  function distinct(arr){ var s={}; for(var i=0;i<arr.length;i++){ if(s[arr[i]]) return false; s[arr[i]]=1; } return true; }
  function search(allowKeyPad){
    var keyDp=parsed[0].dp;
    var maxUp=4;
    var opts=parsed.map(function(p,i){
      var lo=(i===0&&!allowKeyPad)?p.dp:p.dp, hi=p.dp+maxUp, arr=[];
      for(var d=lo;d<=hi;d++) arr.push(d);
      if(i===0&&!allowKeyPad) return [p.dp];
      return arr;
    });
    var best=null;
    for(var a=0;a<opts[1].length;a++) for(var b=0;b<opts[2].length;b++) for(var c=0;c<opts[3].length;c++){
      var assign=[parsed[0].dp, opts[1][a], opts[2][b], opts[3][c]];
      if(!countsOk(assign)) continue;
      var out=render(assign);
      if(!distinct(out)) continue;
      var cost=assign.reduce(function(s,d,i){ return s+(d-parsed[i].dp); },0);
      if(!best||cost<best.cost) best={out:out, cost:cost};
    }
    if(!best && allowKeyPad){
      for(var k=keyDp;k<=keyDp+maxUp&&!best;k++){
        for(var a2=0;a2<opts[1].length;a2++) for(var b2=0;b2<opts[2].length;b2++) for(var c2=0;c2<opts[3].length;c2++){
          var assign2=[k, opts[1][a2], opts[2][b2], opts[3][c2]];
          if(!countsOk(assign2)) continue;
          var out2=render(assign2);
          if(!distinct(out2)) continue;
          var cost2=assign2.reduce(function(s,d,i){ return s+(d-parsed[i].dp); },0);
          best={out:out2, cost:cost2};
        }
      }
    }
    return best?best.out:null;
  }
  return search(false)||search(true)||strs;
}
/* balOpts(key, ds): balDpStrs over option objects {t, fb} or plain strings.
   Returns [key, ds] with the same shapes, feedback preserved. */
function balOpts(key, ds){
  function tOf(o){ return (o&&typeof o==="object")?o.t:String(o); }
  var strs=[tOf(key)].concat(ds.map(tOf));
  var out=balDpStrs(strs);
  if(out===strs) return [key, ds];
  function withT(o, t){ if(o&&typeof o==="object"){ var n={}; for(var k in o) n[k]=o[k]; n.t=t; return n; } return t; }
  return [withT(key, out[0]), ds.map(function(d,i){ return withT(d, out[i+1]); })];
}

/* ===== Prior knowledge tranche (Nov 15, 2026): feeder helper copies for the
   borrowed entries. u8RandHM from Mathematics 8 (the views height maps);
   u4graphData from Mathematics 7 (the graph reading entries); u7Triple,
   u7Ang, u6Scaled and u6Triples from Mathematics 1202 (the trigonometry
   support set and the find a leg entry). Each name is unused elsewhere in
   this bank, so the copies ride under their feeder names. ===== */
function u8RandHM(rows, cols, maxH, minTot, maxTot) {
  for (var att = 0; att < 300; att++) {
    var hm = [], r, c, tot = 0, nz = 0;
    for (r = 0; r < rows; r++) { var row = []; for (c = 0; c < cols; c++) { var v = ri(0, maxH); row.push(v); tot += v; if (v > 0) nz++; } hm.push(row); }
    if (tot < minTot || tot > maxTot || nz < 3) continue;
    var heights = {}; hm.forEach(function (rw) { rw.forEach(function (v) { heights[v] = 1; }); });
    if (Object.keys(heights).length < 3) continue;
    return hm;
  }
  return [[2, 0, 1], [1, 3, 1]];
}

function u4graphData(){
  var topics=[
    {t:"favourite lunch", cats:["Pizza","Salad","Soup","Sandwich"]},
    {t:"favourite sport", cats:["Soccer","Hockey","Dance","Swimming"]},
    {t:"way of getting to school", cats:["Bus","Walk","Car","Bike"]},
    {t:"weekend activity", cats:["Gaming","Reading","Sports","Music"]}
  ];
  var tp=pick(topics), guard=0, ps=null;
  while(guard++<300){
    var a=ri(30,45), b=ri(20,32), c=ri(12,22), d=100-a-b-c;
    if(d<6||d>25)continue;
    var arr=[a,b,c,d], ok=true;
    for(var i=0;i<4;i++)for(var j=i+1;j<4;j++)if(arr[i]===arr[j])ok=false;
    if(ok){ps=arr;break;}
  }
  if(!ps)ps=[40,28,20,12];
  var cats=tp.cats.map(function(name,i){return {name:name, pct:ps[i]};});
  return {topic:tp.t, cats:cats};
}

function u7Triple(){ var m=ri(2,6); var n=ri(1,m-1); var a=m*m-n*n; var b=2*m*n; var c=m*m+n*n; if(Math.random()<0.5){ var t=a; a=b; b=t; } return [a,b,c]; }

function u7Ang(){ return pick([26,28,30,32,35,38,40,42,48,50,55,58,60,62,65]); }

function u6Scaled(){ var t=pick(u6Triples()), k=ri(1,3); return [t[0]*k, t[1]*k, t[2]*k, k]; }

function u6Triples(){ return [[3,4,5],[5,12,13],[6,8,10],[8,15,17],[9,12,15],[7,24,25],[12,16,20],[9,40,41],[20,21,29],[12,35,37],[15,20,25],[10,24,26],[18,24,30],[16,30,34]]; }

/* PK tranche helper transport, round 1 (Nov 15, 2026). */
/* u8RotHM from math-8 */
function u8RotHM(hm, turns) { // turns of 90 degrees clockwise, seen from above (back stays at top)
  var cur = hm, t, r, c;
  for (t = 0; t < turns; t++) {
    var nr = cur[0].length, nc = cur.length, nxt = [];
    for (r = 0; r < nr; r++) { var row = []; for (c = 0; c < nc; c++) row.push(cur[nc - 1 - c][r]); nxt.push(row); }
    cur = nxt;
  }
  return cur;
}

/* u7Poly from math-9 */
function u7Poly(pts, fill, dash) {
  return '<polygon points="' + u7Pts(pts) + '" fill="' + (fill || "none") + '" stroke="' + FIG_INK + '" stroke-width="2"' + (dash ? ' stroke-dasharray="6 4"' : "") + '/>';
}

/* u3UniqText from math-1202 */
function u3UniqText(arr){ var s={}, i; for(i=0;i<arr.length;i++){ if(s[arr[i]]) return false; s[arr[i]]=1; } return true; }

/* u2Dist from math-1202 */
function u2Dist(correct, wrongs, unit, fbC, fbW){
  /* Rule 9 (Nov 8, 2026): the unit lives in the prompt at every call site, so
     options carry bare values; balDpStrs then pairs their precision (Rule 7).
     The unit parameter is retained for call-site compatibility. */
  var seen={}; seen[correct]=1; var out=[];
  for(var i=0;i<wrongs.length && out.length<3;i++){ var w=wrongs[i]; if(w>0 && !seen[w]){ seen[w]=1; out.push({t:fmt(w), fb:fbW(out.length)}); } }
  var k=2; while(out.length<3){ var cand=correct*k+1; if(!seen[cand]){ seen[cand]=1; out.push({t:fmt(cand), fb:"Check the conversion factor and the direction of the conversion."}); } k++; }
  var strs=balDpStrs([fmt(correct)].concat(out.map(function(o){ return o.t; })));
  return {c:{t:strs[0], fb:fbC}, d:out.map(function(o,i){ var n={}; for(var key in o) n[key]=o[key]; n.t=strs[i+1]; return n; })};
}

/* m8PrismBaseSVG from math-8 */
function m8PrismBaseSVG(kind,labBase,labH){
  if(kind==="cyl"){return m8CylBaseSVG(labBase,labH);}
  if(kind==="rect"){
    var s='<svg viewBox="0 0 300 190" width="300" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: a right prism with the area of its base marked">';
    s+='<polygon points="70,75 120,37 230,37 180,75" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<polygon points="180,75 230,37 230,117 180,155" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<rect x="70" y="75" width="110" height="80" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<line x1="120" y1="37" x2="120" y2="117" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5 4"/>';
    if(labBase){s+=_txt(150,56,labBase,11,true);}
    if(labH){s+=_txt(56,115,labH,13,false);}
    return s+'</svg>';
  }
  if(kind==="tri"){
    var t='<svg viewBox="0 0 310 190" width="310" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: a right triangular prism with the area of its base marked">';
    t+='<polygon points="150,120 240,120 150,40" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
    t+='<polygon points="60,150 150,120 150,40 60,70" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    t+='<polygon points="60,150 150,150 60,70" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    t+='<line x1="150" y1="150" x2="150" y2="120" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5 4"/>';
    t+='<line x1="240" y1="120" x2="150" y2="150" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5 4"/>';
    if(labBase){t+=_txt(182,94,labBase,11,true);}
    if(labH){t+=_txt(198,32,labH,13,false);}
    return t+'</svg>';
  }
  var g='<svg viewBox="0 0 300 190" width="300" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: a right prism with the area of its base marked">';
  g+='<polygon points="115,72 195,57 210,137 130,157" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  g+='<polygon points="70,44 150,29 165,109 85,129" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  g+='<line x1="115" y1="72" x2="70" y2="44" stroke="'+FIG_INK+'" stroke-width="2"/>';
  g+='<line x1="195" y1="57" x2="150" y2="29" stroke="'+FIG_INK+'" stroke-width="2"/>';
  g+='<line x1="210" y1="137" x2="165" y2="109" stroke="'+FIG_INK+'" stroke-width="2"/>';
  if(labBase){g+=_txt(163,108,labBase,11,true);}
  if(labH){g+=_txt(84,44,labH,13,false);}
  return g+'</svg>';
}

/* u4r1 from math-8 */
function u4r1(x){return Math.round(x*10)/10;}

/* u6TriSVG from math-1202 */
function u6TriSVG(aVal,bVal,aLab,bLab,cLab){
  var s=Math.min(185/Math.max(aVal,1),118/Math.max(bVal,1));
  var ox=78, oy=178, x2=ox+aVal*s, y2=oy-bVal*s;
  var mx=(ox+x2)/2, my=(oy+y2)/2;
  var out='<svg viewBox="0 0 320 210" width="320" height="210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Right triangle diagram">';
  out+='<polygon points="'+fmt(ox,1)+','+oy+' '+fmt(x2,1)+','+oy+' '+ox+','+fmt(y2,1)+'" fill="'+FIG_SHADE+'" fill-opacity="0.30" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<path d="M '+(ox+15)+' '+oy+' L '+(ox+15)+' '+(oy-15)+' L '+ox+' '+(oy-15)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  out+=_txt(mx,oy+18,aLab,12.5,false);
  out+=_txt(ox-24,(oy+y2)/2,bLab,12.5,false);
  out+=_txt(mx+22,my-8,cLab,12.5,false);
  return out+'</svg>';
}

/* u7numOpts from math-7 */
function u7numOpts(correct,cands){var out=[],seen={};seen[String(correct)]=1;for(var i=0;i<cands.length;i++){var v=cands[i];if(v===null||v===undefined)continue;var k=String(v);if(!seen[k]){seen[k]=1;out.push(v);if(out.length===3)break;}}var step=1;while(out.length<3){var v=correct+step;if(!seen[String(v)]){seen[String(v)]=1;out.push(v);}step++;}return out;}

/* u4R from math-1202 */
function u4R(n){return Math.round(n*100)/100;}

/* u4M from math-1202 */
function u4M(n){var s=fmtF(u4R(n),2);var p=s.split(".");p[0]=p[0].replace(/\B(?=(\d{3})+(?!\d))/g,",");return "$"+p.join(".");}

/* u3PowDist from math-9 */
function u3PowDist(a, correctExp, pairs) {
  var out = [], seen = {};
  seen[String(correctExp)] = 1;
  for (var i = 0; i < pairs.length && out.length < 3; i++) {
    var e = pairs[i].v;
    if (!seen[String(e)]) { seen[String(e)] = 1; out.push({ t: "\\(" + a + "^{" + e + "}\\)", fb: pairs[i].fb }); }
  }
  return out;
}

/* u1R2 from math-1202 */
function u1R2(x){ return Math.round(x*100)/100; }

/* u5pick3 from math-9 */
function u5pick3(c, cands) { var out = [], seen = [c]; for (var i = 0; i < cands.length && out.length < 3; i++) { if (seen.indexOf(cands[i].t) < 0) { seen.push(cands[i].t); out.push(cands[i]); } } return out; }

/* u5r2 from math-8 */
function u5r2(x) { return Math.round(x * 100) / 100; }

/* u7Rad from math-1202 */
function u7Rad(d){ return d*Math.PI/180; }

/* PK tranche helper transport, round 2 (Nov 15, 2026). */
/* u8FrontProf from math-8 */
function u8FrontProf(hm) {
  var out = [], c, r;
  for (c = 0; c < hm[0].length; c++) { var m = 0; for (r = 0; r < hm.length; r++) m = Math.max(m, hm[r][c]); out.push(m); }
  return out;
}

/* u8SideProf from math-8 */
function u8SideProf(hm) { // right side view, left to right in the drawing = front row to back row
  var out = [], r, c;
  for (r = hm.length - 1; r >= 0; r--) { var m = 0; for (c = 0; c < hm[r].length; c++) m = Math.max(m, hm[r][c]); out.push(m); }
  return out;
}

/* solBarsFig from math-9 */
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

/* u3CylFig from math-1202 */
function u3CylFig(r,h,unit){
  var s='<svg viewBox="0 0 220 190" width="220" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Right cylinder">';
  s+='<ellipse cx="110" cy="42" rx="58" ry="16" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="52" y1="42" x2="52" y2="142" stroke="'+FIG_INK+'" stroke-width="2"/><line x1="168" y1="42" x2="168" y2="142" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<ellipse cx="110" cy="142" rx="58" ry="16" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="110" y1="42" x2="168" y2="42" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+='<text x="140" y="32" font-size="13" fill="'+FIG_INK+'" text-anchor="middle">r = '+r+' '+unit+'</text>';
  s+='<text x="182" y="95" font-size="13" fill="'+FIG_INK+'" text-anchor="start">h = '+h+' '+unit+'</text>';
  return s+'</svg>';
}

/* u4triSVG from math-8 */
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

/* u4cylSVG from math-8 */
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

/* m12CircleSVG from math-1202 */
function m12CircleSVG(rLab){
  var s='<svg viewBox="0 0 310 210" width="310" height="210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Circle with labelled radius">';
  s+='<circle cx="155" cy="105" r="72" fill="'+FIG_SHADE+'" fill-opacity="0.30" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="155" y1="105" x2="227" y2="105" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  s+='<circle cx="155" cy="105" r="3" fill="'+FIG_INK+'"/>';
  s+=_txt(191,90,rLab,12.5,false);
  return s+'</svg>';
}

/* u6pick3 from math-9 */
function u6pick3(corr, cands) {
  var out = [], seen = {}; seen[corr] = 1;
  var sh = shuffle(cands);
  for (var i = 0; i < sh.length && out.length < 3; i++) {
    if (!seen[sh[i].t]) { seen[sh[i].t] = 1; out.push(sh[i]); }
  }
  return out.length === 3 ? out : null;
}

/* u6graph from math-9 */
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

/* u4Dist from math-1202 */
function u4Dist(c,ds,ff,step){var seen={};seen[ff(c)]=1;return ds.map(function(d){var v=d.v,g=0;while(seen[ff(v)]&&g<80){v=u4R(v+step);g++;}seen[ff(v)]=1;return {t:ff(v),fb:d.fb};});}

/* u1Pick3 from math-1202 */
function u1Pick3(ans, cands, step){
  /* cands: array of {v, fb}. Returns up to 3 distractor objects whose fmtF(v,2) differ from ans and each other. */
  var used={}; used[fmtF(ans,2)]=1; var out=[];
  for(var i=0;i<cands.length&&out.length<3;i++){
    var v=u1R2(cands[i].v); var g=0;
    while((used[fmtF(v,2)]||v<=0)&&g++<80){ v=u1R2(v+step); }
    if(v>0&&!used[fmtF(v,2)]){ used[fmtF(v,2)]=1; out.push({v:v, fb:cands[i].fb}); }
  }
  var k=1;
  while(out.length<3){ var w=u1R2(ans+k*(step*7+0.31)); if(w>0&&!used[fmtF(w,2)]){ used[fmtF(w,2)]=1; out.push({v:w, fb:"Check the calculation: that value does not follow from the given numbers."}); } k++; }
  return out;
}

/* u1Dol from math-1202 */
function u1Dol(x){ var s=fmtF(Math.abs(x),2); var p=s.split("."); var ip=p[0]; var out=""; while(ip.length>3){ out=","+ip.slice(-3)+out; ip=ip.slice(0,-3); } return (x<0?"-$":"$")+ip+out+"."+p[1]; }

/* u7FigTri from math-1202 */
function u7FigTri(oL,aL,hL,angL){
  var s='<svg viewBox="0 0 280 200" width="280" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Right triangle diagram">';
  s+='<polygon points="55,50 55,165 245,165" fill="'+FIG_SHADE+'" fill-opacity="0.30" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<path d="M 67 165 L 67 153 L 55 153" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+='<path d="M 219 165 A 26 26 0 0 1 228 154" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+=u7Txt(24,108,oL,13); s+=u7Txt(150,185,aL,13); s+=u7Txt(163,92,hL,13); s+=u7Txt(200,150,angL,13);
  return s+'</svg>';
}

/* PK tranche helper transport, round 3 (Nov 15, 2026). */
/* u8ProfStr from math-8 */
function u8ProfStr(p) { return p.map(function (v) { return fmt(v); }).join(", "); }

/* u8SumArr from math-8 */
function u8SumArr(a) { var s = 0; a.forEach(function (v) { s += v; }); return s; }

/* u4Hrs from math-1202 */
function u4Hrs(v){return fmt(v)+" hours";}

/* PK tranche helper transport, round 4 (Nov 15, 2026). */
/* u8T from math-8 */
function u8T(x, y, str, size, bold, anchor) {
  return '<text x="' + fmt(x, 1) + '" y="' + fmt(y, 1) + '" font-size="' + (size || 12) + '" fill="' + FIG_INK + '" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="' + (anchor || "middle") + '" dominant-baseline="central"' + (bold ? ' font-weight="bold"' : "") + '>' + str + '</text>';
}

/* u2RectFig from math-1202 */
function u2RectFig(L,Wd){
  var s='<svg viewBox="0 0 260 170" width="260" height="170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rectangle with labelled length and width">';
  s+='<rect x="45" y="35" width="170" height="95" fill="'+FIG_SHADE+'" fill-opacity="0.4" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<text x="130" y="22" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">'+fmt(L)+' m</text>';
  s+='<text x="232" y="86" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">'+fmt(Wd)+' m</text></svg>';
  return s;
}

/* u4pieFig from math-7 */
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

/* u7lineSVG from math-7 */
function u7lineSVG(labels,vals,unit){
  var W=330,H=215,base=175,top=30,maxV=Math.max.apply(null,vals)+2,minV=0;
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Line graph">';
  out+='<line x1="45" y1="'+base+'" x2="'+(W-15)+'" y2="'+base+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  out+='<line x1="45" y1="'+top+'" x2="45" y2="'+base+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  var pts=[];
  for(var i=0;i<labels.length;i++){var x=65+i*(W-95)/(labels.length-1);var y=base-(base-top)*(vals[i]-minV)/(maxV-minV);pts.push([x,y]);
    out+='<circle cx="'+fmt(x,1)+'" cy="'+fmt(y,1)+'" r="3.2" fill="'+FIG_INK+'"/>';
    out+=_txt(x,y-13,String(vals[i]),12,true);
    out+=_txt(x,base+16,labels[i],11,false);
  }
  for(var j=0;j<pts.length-1;j++){out+='<line x1="'+fmt(pts[j][0],1)+'" y1="'+fmt(pts[j][1],1)+'" x2="'+fmt(pts[j+1][0],1)+'" y2="'+fmt(pts[j+1][1],1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';}
  out+=_txt(20,(top+base)/2,unit,11,false);
  return out+'</svg>';
}

/* u4TableFig from math-1202 */
function u4TableFig(rows){
  var cols=rows[0].length,W=320,rowH=28,H=rows.length*rowH+16,colW=(W-20)/cols;
  var s='<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg">';
  rows.forEach(function(r,i){var y=8+i*rowH;
    s+='<rect x="10" y="'+y+'" width="'+(W-20)+'" height="'+rowH+'" fill="'+(i===0?FIG_SHADE:"none")+'" stroke="'+FIG_INK+'" stroke-width="1.2"/>';
    r.forEach(function(c,j){var x=10+j*colW;if(j>0)s+='<line x1="'+fmt(x,1)+'" y1="'+y+'" x2="'+fmt(x,1)+'" y2="'+(y+rowH)+'" stroke="'+FIG_INK+'" stroke-width="1"/>';
      s+='<text x="'+fmt(x+colW/2,1)+'" y="'+(y+rowH/2+4)+'" font-size="12" '+(i===0?'font-weight="bold" ':"")+'fill="'+FIG_INK+'" text-anchor="middle">'+c+'</text>';});});
  return s+'</svg>';
}

/* u7FigPair from math-1202 */
function u7FigPair(w1,h1,t1,w2,h2,t2){
  var u1=88/Math.max(w1,h1), u2=88/Math.max(w2,h2);
  var s='<svg viewBox="0 0 300 180" width="300" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two rectangles diagram">';
  s+='<rect x="30" y="'+fmt(135-h1*u1,1)+'" width="'+fmt(w1*u1,1)+'" height="'+fmt(h1*u1,1)+'" fill="'+FIG_SHADE+'" fill-opacity="0.30" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<rect x="175" y="'+fmt(135-h2*u2,1)+'" width="'+fmt(w2*u2,1)+'" height="'+fmt(h2*u2,1)+'" fill="'+FIG_SHADE+'" fill-opacity="0.30" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+=u7Txt(30+w1*u1/2,155,t1,12); s+=u7Txt(175+w2*u2/2,155,t2,12);
  return s+'</svg>';
}

/* u7FigTriPair from math-1202 */
function u7FigTriPair(t1,t2){
  function draw(t,x0){
    var s=Math.min(112/Math.max(t.a,1),118/Math.max(t.o,1));
    var bx=x0, by=172, tx=x0, ty=by-t.o*s, rx=x0+t.a*s;
    var out='<polygon points="'+fmt(tx,1)+','+fmt(ty,1)+' '+fmt(bx,1)+','+by+' '+fmt(rx,1)+','+by+'" fill="'+FIG_SHADE+'" fill-opacity="0.30" stroke="'+FIG_INK+'" stroke-width="2"/>';
    out+='<path d="M '+(bx+13)+' '+by+' L '+(bx+13)+' '+(by-13)+' L '+bx+' '+(by-13)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
    if(t.oL) out+=u7Txt(bx-15,(by+ty)/2,t.oL,12);
    if(t.aL) out+=u7Txt((bx+rx)/2,by+16,t.aL,12);
    if(t.hL) out+=u7Txt((tx+rx)/2+17,(ty+by)/2-4,t.hL,12);
    if(t.angL) out+=u7Txt(rx-24,by-12,t.angL,12);
    if(t.tL) out+=u7Txt(tx+17,ty+11,t.tL,12);
    return out;
  }
  var s='<svg viewBox="0 0 320 205" width="320" height="205" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two right triangles">';
  s+=draw(t1,36); s+=draw(t2,186);
  return s+'</svg>';
}

/* PK tranche helper transport, round 6 (Nov 15, 2026). */
/* u3BoxFig from math-1202 */
function u3BoxFig(l,w,h,unit){
  var s='<svg viewBox="0 0 300 190" width="300" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Closed rectangular box">';
  s+='<polygon points="70,80 210,80 210,160 70,160" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<polygon points="70,80 110,40 250,40 210,80" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<polygon points="210,80 250,40 250,120 210,160" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<text x="140" y="178" font-size="13" fill="'+FIG_INK+'" text-anchor="middle">length '+l+' '+unit+'</text>';
  s+='<text x="262" y="105" font-size="13" fill="'+FIG_INK+'" text-anchor="middle">width '+w+' '+unit+'</text>';
  s+='<text x="52" y="122" font-size="13" fill="'+FIG_INK+'" text-anchor="end">height '+h+' '+unit+'</text>';
  return s+'</svg>';
}

/* u3StepFig from math-1202 */
function u3StepFig(W1,H1,W2,H2,unit){
  // Step shape: bottom rectangle W1 x H1, top-left block W2 x H2 above it.
  var sc=16, W=(W1*sc)+56, H=((H1+H2)*sc)+44, ox=28, base=18+(H1+H2)*sc, s="";
  var yTop=18, yMid=18+H2*sc;
  s+='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Step shaped composite figure">';
  s+='<polygon points="'+ox+','+base+' '+(ox+W1*sc)+','+base+' '+(ox+W1*sc)+','+yMid+' '+(ox+W2*sc)+','+yMid+' '+(ox+W2*sc)+','+yTop+' '+ox+','+yTop+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<text x="'+(ox+W1*sc/2)+'" y="'+(base+18)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">'+W1+' '+unit+'</text>';
  s+='<text x="'+(ox+W1*sc+6)+'" y="'+(yMid+H1*sc/2)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="start">'+H1+' '+unit+'</text>';
  s+='<text x="'+(ox+W2*sc/2)+'" y="'+(yTop-5)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">'+W2+' '+unit+'</text>';
  s+='<text x="'+(ox-6)+'" y="'+(yTop+H2*sc/2)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="end">'+H2+' '+unit+'</text>';
  return s+'</svg>';
}

/* m8TanksSVG from math-8 */
function m8TanksSVG(sets,names){
  var s='<svg viewBox="0 0 330 180" width="330" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: four storage tanks with their dimensions">';
  for(var i=0;i<4;i++){
    var ox=i*82+6;
    s+='<polygon points="'+(ox+8)+',70 '+(ox+20)+',54 '+(ox+72)+',54 '+(ox+60)+',70" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
    s+='<rect x="'+(ox+8)+'" y="70" width="52" height="54" fill="none" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
    s+='<polygon points="'+(ox+60)+',70 '+(ox+72)+',54 '+(ox+72)+',108 '+(ox+60)+',124" fill="none" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
    s+=_txt(ox+40,36,names[i],10.5,true);
    s+=_txt(ox+40,142,sets[i][0]+" × "+sets[i][1]+" × "+sets[i][2],9,false);
    s+=_txt(ox+40,158,"cm",9,false);
  }
  return s+'</svg>';
}

/* PK tranche helper transport, final round (Nov 15, 2026). */
/* u8HM from math-8 */
function u8HM(hm, x0, y0, cell) {
  var s = "", r, c;
  for (r = 0; r < hm.length; r++) for (c = 0; c < hm[r].length; c++) {
    s += u8Rect(x0 + c * cell, y0 + r * cell, cell, cell, hm[r][c] > 0 ? FIG_SHADE : "#ffffff");
    s += u8T(x0 + c * cell + cell / 2, y0 + r * cell + cell / 2 + 1, fmt(hm[r][c]), 13, true);
  }
  var w = hm[0].length * cell, h = hm.length * cell;
  s += u8T(x0 + w / 2, y0 - 11, "BACK", 10, true);
  s += u8T(x0 + w / 2, y0 + h + 12, "FRONT", 10, true);
  s += u8T(x0 - 13, y0 + h / 2, "L", 10, true);
  s += u8T(x0 + w + 13, y0 + h / 2, "R", 10, true);
  return s;
}

/* u7Pts from math-9 */
function u7Pts(pts) { return pts.map(function (p) { return fmt(p[0], 1) + "," + fmt(p[1], 1); }).join(" "); }

/* solT from math-9 */
function solT(x, y, str, size, bold) {
  return '<text x="' + fmt(x, 1) + '" y="' + fmt(y, 1) + '" font-size="' + (size || 12) + '" fill="' + FIG_INK + '" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="middle" dominant-baseline="central"' + (bold ? ' font-weight="bold"' : "") + '>' + str + '</text>';
}

/* u4pt from math-7 */
function u4pt(cx,cy,r,deg){var t=deg*Math.PI/180;return [cx+r*Math.sin(t), cy-r*Math.cos(t)];}

/* u7Txt from math-1202 */
function u7Txt(x,y,str,size,anchor){ return '<text x="'+fmt(x,1)+'" y="'+fmt(y,1)+'" font-size="'+(size||13)+'" fill="'+FIG_INK+'" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="'+(anchor||"middle")+'" dominant-baseline="central">'+str+'</text>'; }

/* PK tranche helper transport, final round (Nov 15, 2026). */
/* u8Rect from math-8 */
function u8Rect(x, y, w, h, fill) {
  return '<rect x="' + fmt(x, 1) + '" y="' + fmt(y, 1) + '" width="' + fmt(w, 1) + '" height="' + fmt(h, 1) + '" fill="' + (fill || "none") + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
}

/* u7T from math-9 */
function u7T(x, y, str, size, bold, anchor) {
  return '<text x="' + fmt(x, 1) + '" y="' + fmt(y, 1) + '" font-size="' + (size || 13) + '" fill="' + FIG_INK + '" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="' + (anchor || "middle") + '" dominant-baseline="central"' + (bold ? ' font-weight="bold"' : "") + '>' + str + '</text>';
}

/* solSvg from math-9 */
function solSvg(W, H, body, aria) {
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + aria + '">' + body + '</svg>';
}

/* PK tranche helper transport, final round (Nov 15, 2026). */
/* u8Svg from math-8 */
function u8Svg(W, H, body, aria) {
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + aria + '">' + body + '</svg>';
}

/* PK tranche helper transport, final round (Nov 15, 2026). */
/* u8Key from math-8 */
function u8Key(a) { return JSON.stringify(a); }

/* u7Svg from math-9 */
function u7Svg(W, H, body, aria) {
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + aria + '">' + body + '</svg>';
}
