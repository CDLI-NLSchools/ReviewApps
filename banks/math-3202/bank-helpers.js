// Math 3202 shared bank helpers, carried verbatim from the standalone
// app's bank source (bank-src.js): the header helpers the unit files
// rely on (FR, and the Rule 7 precision pairing balDpStrs / balOpts).
/* Math 3202 Review bank source. Assembled November 7, 2026 from work/unit1.js to
   unit10.js. FR returns the raw \frac fragment for use INSIDE math delimiters,
   defined here for the entries that use it. CR_MARKS stays at the end of this file. */
function FR(n,d){return "\\frac{"+n+"}{"+d+"}";}

/* balDpStrs(strs): Rule 7 precision pairing (Jason's pairs criterion, Nov 8,
   2026), following the normOpts method proven in the Math 3201 batch. strs is
   [key, d1, d2, d3] as printed option texts. When all four are a number plus a
   common suffix, the numbers are reprinted (values never change; digits are
   only ever padded with trailing zeros) at decimal-place counts that form a
   single group of four or two pairs, so no option stands alone at a unique
   precision. The key is padded only when no distractor-only assignment works.
   Returns the input unchanged when the set is not uniformly numeric, when a
   number contains a comma, or when no valid assignment exists. */
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
function balOpts(key, ds){
  function tOf(o){ return (o&&typeof o==="object")?o.t:String(o); }
  var strs=[tOf(key)].concat(ds.map(tOf));
  var out=balDpStrs(strs);
  if(out===strs) return [key, ds];
  function withT(o, t){ if(o&&typeof o==="object"){ var n={}; for(var k in o) n[k]=o[k]; n.t=t; return n; } return t; }
  return [withT(key, out[0]), ds.map(function(d,i){ return withT(d, out[i+1]); })];
}

/* ===== Prior knowledge tranche (Nov 15, 2026): feeder helper copies for the
   tranche entries in the unit files (dependency closure over the feeder banks;
   identical bodies already in this bank were skipped; the one name taken in
   this bank by a different body, Mathematics 2202's u5M money formatter,
   rides renamed as f22_u5M). ===== */
function u2RulerFig(inches){
  var scale=22, x0=30, len=inches*scale, W=Math.ceil(x0+len+30), s='<svg viewBox="0 0 '+W+' 110" width="'+W+'" height="110" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ruler with an object ending at a marked length">';
  s+='<rect x="'+x0+'" y="30" width="'+fmt(len,1)+'" height="26" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
  s+='<rect x="'+x0+'" y="62" width="'+fmt(8*scale,1)+'" height="20" fill="none" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
  for(var i=0;i<=64;i++){ var x=x0+i*(scale/8); var h=(i%8===0)?14:(i%4===0?10:6); s+='<line x1="'+fmt(x,1)+'" y1="82" x2="'+fmt(x,1)+'" y2="'+fmt(82-h,1)+'" stroke="'+FIG_INK+'" stroke-width="1"/>'; if(i%8===0){ s+='<text x="'+fmt(x,1)+'" y="98" font-size="10" fill="'+FIG_INK+'" text-anchor="middle">'+(i/8)+'</text>'; } }
  s+='<text x="'+fmt(x0+len/2,1)+'" y="20" font-size="11" fill="'+FIG_INK+'" text-anchor="middle">object</text></svg>';
  return s;
}

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

function u2CirclesFig(od, idd){
  var s='<svg viewBox="0 0 240 170" width="240" height="170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pipe end showing outside and inside diameters">';
  s+='<circle cx="120" cy="80" r="62" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<circle cx="120" cy="80" r="'+fmt(62*idd/od,1)+'" fill="#ffffff" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="58" y1="80" x2="182" y2="80" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5 4"/>';
  s+='<text x="120" y="18" font-size="11" fill="'+FIG_INK+'" text-anchor="middle">outside diameter '+fmt(od)+' cm</text>';
  s+='<text x="120" y="160" font-size="11" fill="'+FIG_INK+'" text-anchor="middle">wall thickness shown by the shaded ring</text></svg>';
  return s;
}

function u7Frac(n,d){ var g=1; for(var i=2;i<=Math.min(n,d);i++){ if(n%i===0&&d%i===0) g=i; } return (n/g)+"/"+(d/g); }

function u7RampFig(rise, run, title){
  var sc = Math.min(170/Math.max(run,1), 100/Math.max(rise,1));
  var dx = Math.max(40, run*sc), dy = Math.max(18, rise*sc);
  var x0=35, y0=135;
  var s='<svg viewBox="0 0 280 165" width="280" height="165" xmlns="http://www.w3.org/2000/svg" role="img">';
  s+='<text x="140" y="14" font-size="12" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">'+title+'</text>';
  s+='<polygon points="'+x0+','+y0+' '+(x0+dx)+','+y0+' '+(x0+dx)+','+fmt(y0-dy,1)+'" fill="'+FIG_SHADE+'" fill-opacity="0.5" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="'+(x0+dx)+'" y1="'+y0+'" x2="'+(x0+dx)+'" y2="'+fmt(y0-dy,1)+'" stroke="'+FIG_ALT+'" stroke-width="2" stroke-dasharray="4 3"/>';
  s+='<text x="'+fmt(x0+dx/2,1)+'" y="'+(y0+16)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">run = '+fmt(run)+' </text>';
  s+='<text x="'+(x0+dx+6)+'" y="'+fmt(y0-dy/2,1)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="start">rise = '+fmt(rise)+'</text>';
  s+='</svg>'; return s;
}

function u7GraphFig(x1,y1,x2,y2,xlab,ylab){
  var mx=Math.max(x1,x2,4), my=Math.max(y1,y2,4);
  var sx=200/mx, sy=110/my, ox=35, oy=140;
  function X(v){return fmt(ox+v*sx,1);} function Y(v){return fmt(oy-v*sy,1);}
  var s='<svg viewBox="0 0 280 170" width="280" height="170" xmlns="http://www.w3.org/2000/svg" role="img">';
  s+='<line x1="'+ox+'" y1="'+oy+'" x2="255" y2="'+oy+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+='<line x1="'+ox+'" y1="'+oy+'" x2="'+ox+'" y2="15" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+='<line x1="'+X(x1)+'" y1="'+Y(y1)+'" x2="'+X(x2)+'" y2="'+Y(y2)+'" stroke="'+FIG_ACC+'" stroke-width="2.4"/>';
  s+='<circle cx="'+X(x1)+'" cy="'+Y(y1)+'" r="4" fill="'+FIG_INK+'"/><circle cx="'+X(x2)+'" cy="'+Y(y2)+'" r="4" fill="'+FIG_ALT+'"/>';
  s+='<text x="'+X(x1)+'" y="'+fmt(oy-y1*sy-10,1)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">('+fmt(x1)+', '+fmt(y1)+')</text>';
  s+='<text x="'+X(x2)+'" y="'+fmt(oy-y2*sy-10,1)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">('+fmt(x2)+', '+fmt(y2)+')</text>';
  s+='<text x="250" y="'+(oy+16)+'" font-size="11" fill="'+FIG_INK+'" text-anchor="end">'+xlab+'</text>';
  s+='<text x="10" y="22" font-size="11" fill="'+FIG_INK+'" text-anchor="middle">'+ylab+'</text>';
  s+='</svg>'; return s;
}

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

function u5lin(a, b) { var s; if (a === 1) s = "x"; else if (a === -1) s = "-x"; else s = fmt(a) + "x"; if (b > 0) s += "+" + fmt(b); else if (b < 0) s += "-" + fmt(-b); return s; }

function u5pick3(c, cands) { var out = [], seen = [c]; for (var i = 0; i < cands.length && out.length < 3; i++) { if (seen.indexOf(cands[i].t) < 0) { seen.push(cands[i].t); out.push(cands[i]); } } return out; }

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

function u4Distractors(ans, pool) {
  var out = [], seen = { }, c = 0;
  seen[String(ans)] = 1;
  while (out.length < 3 && c < 60) {
    c++;
    var d = pick(pool);
    if (d > 0 && !seen[String(d)]) { seen[String(d)] = 1; out.push(d); }
  }
  var f = ans + 3;
  while (out.length < 3) { if (!seen[String(f)]) { seen[String(f)] = 1; out.push(f); } f++; }
  return out;
}

function u4BarFig(labels, vals, yMax, yTitle, xTitle, base) {
  base = base || 0;
  var s = '<svg viewBox="0 0 340 232" width="340" height="232" xmlns="http://www.w3.org/2000/svg" role="img">';
  var ticks = [base, base + (yMax - base) / 2, yMax], i, y;
  for (i = 0; i < ticks.length; i++) {
    y = 186 - ((ticks[i] - base) / (yMax - base)) * 148;
    s += '<line x1="52" y1="' + fmt(y, 1) + '" x2="322" y2="' + fmt(y, 1) + '" stroke="' + FIG_SHADE + '" stroke-width="1"/>';
    s += _txt(46, y, fmt(ticks[i]), 11, false, "end");
  }
  s += '<line x1="52" y1="30" x2="52" y2="186" stroke="' + FIG_INK + '" stroke-width="2"/>';
  s += '<line x1="52" y1="186" x2="322" y2="186" stroke="' + FIG_INK + '" stroke-width="2"/>';
  s += _txt(20, 108, yTitle, 11, true);
  if (xTitle) s += _txt(187, 224, xTitle, 11, true);
  var bw = 258 / vals.length;
  for (i = 0; i < vals.length; i++) {
    var bx = 58 + i * bw + bw * 0.18, bwid = bw * 0.64;
    var by = 186 - ((vals[i] - base) / (yMax - base)) * 148;
    s += '<rect x="' + fmt(bx, 1) + '" y="' + fmt(by, 1) + '" width="' + fmt(bwid, 1) + '" height="' + fmt(186 - by, 1) + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
    s += _txt(bx + bwid / 2, 202, labels[i], 11, false);
  }
  return s + "</svg>";
}

function u4NiceMax(v) { var m = Math.ceil(v * 1.25); return Math.max(10, Math.ceil(m / 10) * 10); }

function u4HistFig(labels, freqs, yMax, yTitle, xTitle) {
  var s = u4Frame(yMax, yTitle, xTitle), bw = 264 / freqs.length;
  for (var i = 0; i < freqs.length; i++) {
    var bx = 52 + i * bw, by = u4Y(freqs[i], yMax);
    s += '<rect x="' + fmt(bx, 1) + '" y="' + fmt(by, 1) + '" width="' + fmt(bw, 1) + '" height="' + fmt(186 - by, 1) + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
    s += _txt(bx + bw / 2, 202, labels[i], 10, false);
  }
  return s + "</svg>";
}

function u4Frame(yMax, yTitle, xTitle) {
  var s = '<svg viewBox="0 0 340 232" width="340" height="232" xmlns="http://www.w3.org/2000/svg" role="img">';
  var ticks = [0, yMax / 2, yMax];
  for (var i = 0; i < ticks.length; i++) {
    var y = u4Y(ticks[i], yMax);
    s += '<line x1="52" y1="' + fmt(y, 1) + '" x2="322" y2="' + fmt(y, 1) + '" stroke="' + FIG_SHADE + '" stroke-width="1"/>';
    s += _txt(46, y, fmt(ticks[i]), 11, false, "end");
  }
  s += '<line x1="52" y1="30" x2="52" y2="186" stroke="' + FIG_INK + '" stroke-width="2"/>';
  s += '<line x1="52" y1="186" x2="322" y2="186" stroke="' + FIG_INK + '" stroke-width="2"/>';
  s += _txt(20, 108, yTitle, 11, true);
  if (xTitle) s += _txt(187, 224, xTitle, 11, true);
  return s;
}

function u4Y(v, yMax) { return 186 - (v / yMax) * 148; }

function u4LineFig(labels, vals, yMax, yTitle, xTitle) {
  var s = u4Frame(yMax, yTitle, xTitle), pts = "";
  for (var i = 0; i < vals.length; i++) {
    var x = u4X(i, vals.length), y = u4Y(vals[i], yMax);
    pts += fmt(x, 1) + "," + fmt(y, 1) + " ";
    s += "";
  }
  s += '<polyline points="' + pts + '" fill="none" stroke="' + FIG_ACC + '" stroke-width="2.5"/>';
  for (var j = 0; j < vals.length; j++) {
    var x2 = u4X(j, vals.length), y2 = u4Y(vals[j], yMax);
    s += '<circle cx="' + fmt(x2, 1) + '" cy="' + fmt(y2, 1) + '" r="4" fill="' + FIG_INK + '"/>';
    s += _txt(x2, 202, labels[j], 11, false);
  }
  return s + "</svg>";
}

function u4X(i, n) { return 58 + i * (258 / Math.max(n - 1, 1)); }

function u4ScatterFig(pts, xMax, yMax, yTitle, xTitle) {
  var s = u4Frame(yMax, yTitle, xTitle);
  var xt = [0, xMax / 2, xMax];
  for (var i = 0; i < xt.length; i++) {
    var x = 52 + (xt[i] / xMax) * 270;
    s += _txt(x, 202, fmt(xt[i]), 11, false);
    s += '<line x1="' + fmt(x, 1) + '" y1="186" x2="' + fmt(x, 1) + '" y2="182" stroke="' + FIG_INK + '" stroke-width="1.5"/>';
  }
  for (var j = 0; j < pts.length; j++) {
    var px = 52 + (pts[j][0] / xMax) * 270, py = u4Y(pts[j][1], yMax);
    s += '<circle cx="' + fmt(px, 1) + '" cy="' + fmt(py, 1) + '" r="4" fill="' + FIG_ALT + '"/>';
  }
  return s + "</svg>";
}

function u7mean(a){var s=0;for(var i=0;i<a.length;i++)s+=a[i];return s/a.length;}

function u7numOpts(correct,cands){var out=[],seen={};seen[String(correct)]=1;for(var i=0;i<cands.length;i++){var v=cands[i];if(v===null||v===undefined)continue;var k=String(v);if(!seen[k]){seen[k]=1;out.push(v);if(out.length===3)break;}}var step=1;while(out.length<3){var v=correct+step;if(!seen[String(v)]){seen[String(v)]=1;out.push(v);}step++;}return out;}

function u7median(a){var s=a.slice().sort(function(x,y){return x-y;});var m=Math.floor(s.length/2);return s.length%2?s[m]:(s[m-1]+s[m])/2;}

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

var u5Names=["Alex","Maya","Jordan","Priya","Sam","Taylor","Noah","Emma","Liam","Zoe"];

function u5Budget(){
  var inc=ri(2000,3800)*100;
  var exps=[
    {label:"Housing", c:ri(800,1400)*100},
    {label:"Food", c:ri(300,650)*100},
    {label:"Transport", c:ri(120,350)*100},
    {label:"Phone and internet", c:ri(70,150)*100},
    {label:"Other spending", c:ri(100,400)*100}
  ];
  var tot=0; exps.forEach(function(e){ tot+=e.c; });
  return {inc:inc, exps:exps, tot:tot, bal:inc-tot};
}

function f22_u5M(c){ var neg=c<0; var a=Math.abs(Math.round(c)); var d=Math.floor(a/100); var r=a%100; var ds=String(d).replace(/\B(?=(\d{3})+(?!\d))/g,","); return (neg?"-":"")+"$"+ds+"."+(r<10?"0":"")+r; }

function u5ExpList(exps){ return exps.map(function(e){ return e.label.toLowerCase()+" "+f22_u5M(e.c); }).join(", "); }

function u5MoneyOpts(correctC,errs){
  /* errs: [{v: cents, fb: string}]; guarantees 3 distinct distractor texts */
  var seen={}; seen[correctC]=1; var out=[];
  errs.forEach(function(e){
    var v=Math.round(e.v), guard=0;
    while((seen[v]||v===correctC)&&guard<60){ v+=1000; guard++; }
    seen[v]=1; out.push({t:f22_u5M(v), fb:e.fb});
  });
  return out;
}

function u5BarFig(title,labels,valsC){
  var max=1; valsC.forEach(function(v){ if(v>max)max=v; });
  var H=labels.length*30+34, s='<svg viewBox="0 0 340 '+H+'" xmlns="http://www.w3.org/2000/svg" role="img">';
  s+='<text x="170" y="16" font-size="13" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">'+title+'</text>';
  for(var i=0;i<labels.length;i++){
    var y=26+i*30, w=Math.max(4,Math.round(valsC[i]/max*160));
    s+='<text x="88" y="'+(y+13)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="end">'+labels[i]+'</text>';
    s+='<rect x="94" y="'+y+'" width="'+w+'" height="18" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
    s+='<text x="'+(100+w)+'" y="'+(y+13)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="start">'+f22_u5M(valsC[i])+'</text>';
  }
  return s+'</svg>';
}

function u5PctTxt(p){ return fmtF(Math.round(p*10)/10,1)+"%"; }

function u6names(){return pick(["Maya","Liam","Sofia","Noah","Emma","Lucas","Ava","Ethan","Mia","Chloe","Ben","Ruby"]);}

function u6d(x){var s=(Math.round(x*100)/100).toFixed(2);var p=s.split(".");p[0]=p[0].replace(/\B(?=(\d{3})+(?!\d))/g,",");return "$"+p.join(".");}

function u6goal(){return pick(["a used car","a furnace repair","tuition fees","a snowmobile","a laptop for work","a wedding","a fishing boat motor","a home renovation"]);}

function u1Dol(x){ var s=fmtF(Math.abs(x),2); var p=s.split("."); var ip=p[0]; var out=""; while(ip.length>3){ out=","+ip.slice(-3)+out; ip=ip.slice(0,-3); } return (x<0?"-$":"$")+ip+out+"."+p[1]; }

function u1R2(x){ return Math.round(x*100)/100; }

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

function u4R(n){return Math.round(n*100)/100;}

function u4M(n){var s=fmtF(u4R(n),2);var p=s.split(".");p[0]=p[0].replace(/\B(?=(\d{3})+(?!\d))/g,",");return "$"+p.join(".");}

function u4Dist(c,ds,ff,step){var seen={};seen[ff(c)]=1;return ds.map(function(d){var v=d.v,g=0;while(seen[ff(v)]&&g<80){v=u4R(v+step);g++;}seen[ff(v)]=1;return {t:ff(v),fb:d.fb};});}

function u5DegOpts(ans,pool){
  var out=[];pool.forEach(function(v){if(v!==ans&&v>0&&v<360&&out.indexOf(v)<0)out.push(v);});
  var k=20;while(out.length<3){if(ans+k!==ans&&out.indexOf(ans+k)<0)out.push(ans+k);k+=15;}
  return out.slice(0,3).map(function(v){return {t:v+"°", fb:v+"° does not follow from the angle relationship used here: check the sum or equality the diagram gives."};});
}

function u5PairSVG(a, comp){
  var cx=110, cy=150, end=comp?90:180, s='<svg viewBox="0 0 300 200" width="300" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two adjacent angles forming a pair">';
  var p0=u5Pt(cx,cy,92,0), pm=u5Pt(cx,cy,92,a), pe=u5Pt(cx,cy,92,end);
  s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(p0[0],1)+'" y2="'+fmt(p0[1],1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(pm[0],1)+'" y2="'+fmt(pm[1],1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(pe[0],1)+'" y2="'+fmt(pe[1],1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  if(comp) s+='<path d="M '+(cx+20)+' '+cy+' L '+(cx+20)+' '+(cy-20)+' L '+cx+' '+(cy-20)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.4"/>';
  s+=u5ArcPath(cx,cy,32,0,a)+u5ArcPath(cx,cy,32,a,end);
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="3" fill="'+FIG_INK+'"/>';
  var m1=u5Pt(cx,cy,60,a/2), m2=u5Pt(cx,cy,60,(a+end)/2);
  s+=_txt(m1[0],m1[1],a+"\u00B0",12.5,false);
  s+=_txt(m2[0],m2[1],"?",12.5,false);
  return s+'</svg>';
}

function u5Pt(cx,cy,r,deg){var t=deg*Math.PI/180;return [cx+r*Math.cos(t),cy-r*Math.sin(t)];}

function u5ArcPath(cx,cy,r,a0,a1){
  var p0=u5Pt(cx,cy,r,a0), p1=u5Pt(cx,cy,r,a1), large=(a1-a0)>180?1:0;
  return '<path d="M '+fmt(p0[0],1)+' '+fmt(p0[1],1)+' A '+r+' '+r+' 0 '+large+' 0 '+fmt(p1[0],1)+' '+fmt(p1[1],1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
}

function u5AdjSVG(x,y){
  var cx=150,cy=115,W=300,H=200;
  var p0=u5Pt(cx,cy,88,0),p1=u5Pt(cx,cy,88,x),p2=u5Pt(cx,cy,88,x+y);
  var m1=u5Pt(cx,cy,60,x/2),m2=u5Pt(cx,cy,60,x+y/2);
  var s='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two adjacent angles sharing a side">';
  s+='<polygon points="'+cx+','+cy+' '+fmt(p0[0],1)+','+fmt(p0[1],1)+' '+fmt(p1[0],1)+','+fmt(p1[1],1)+'" fill="'+FIG_SHADE+'"/>';
  s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(p0[0],1)+'" y2="'+fmt(p0[1],1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(p1[0],1)+'" y2="'+fmt(p1[1],1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(p2[0],1)+'" y2="'+fmt(p2[1],1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="3" fill="'+FIG_INK+'"/>';
  s+=_txt(m1[0],m1[1],"A: "+x+"°",12,false);
  s+=_txt(m2[0],m2[1],"B: "+y+"°",12,false);
  return s+'</svg>';
}

function u5VertSVG(a){
  var cx=150, cy=102, s='<svg viewBox="0 0 300 205" width="300" height="205" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two crossing lines with vertically opposite angles">';
  var d1=10, d2=10+a;
  [d1,d2].forEach(function(d){ var p1=u5Pt(cx,cy,88,d), p2=u5Pt(cx,cy,88,d+180); s+='<line x1="'+fmt(p1[0],1)+'" y1="'+fmt(p1[1],1)+'" x2="'+fmt(p2[0],1)+'" y2="'+fmt(p2[1],1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>'; });
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="3" fill="'+FIG_INK+'"/>';
  var m1=u5Pt(cx,cy,50,(d1+d2)/2), m2=u5Pt(cx,cy,50,(d1+d2)/2+180);
  s+=_txt(m1[0],m1[1],a+"\u00B0",12.5,false);
  s+=_txt(m2[0],m2[1],"?",12.5,false);
  return s+'</svg>';
}

function u7ScaleFig(drawnW, drawnH, label){
  var w=Math.max(60,Math.min(190,drawnW*14)), h=Math.max(30,Math.min(90,drawnH*14));
  var x0=fmt(140-w/2,1), y0=fmt(85-h/2,1);
  var s='<svg viewBox="0 0 280 165" width="280" height="165" xmlns="http://www.w3.org/2000/svg" role="img">';
  s+='<rect x="'+x0+'" y="'+y0+'" width="'+fmt(w,1)+'" height="'+fmt(h,1)+'" fill="'+FIG_SHADE+'" fill-opacity="0.5" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<text x="140" y="'+fmt(85+h/2+20,1)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">drawing width = '+fmt(drawnW)+' cm</text>';
  s+='<text x="140" y="18" font-size="12" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">'+label+'</text>';
  s+='</svg>'; return s;
}

function u7FigPair(w1,h1,t1,w2,h2,t2){
  var u1=88/Math.max(w1,h1), u2=88/Math.max(w2,h2);
  var s='<svg viewBox="0 0 300 180" width="300" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two rectangles diagram">';
  s+='<rect x="30" y="'+fmt(135-h1*u1,1)+'" width="'+fmt(w1*u1,1)+'" height="'+fmt(h1*u1,1)+'" fill="'+FIG_SHADE+'" fill-opacity="0.30" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<rect x="175" y="'+fmt(135-h2*u2,1)+'" width="'+fmt(w2*u2,1)+'" height="'+fmt(h2*u2,1)+'" fill="'+FIG_SHADE+'" fill-opacity="0.30" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+=u7Txt(30+w1*u1/2,155,t1,12); s+=u7Txt(175+w2*u2/2,155,t2,12);
  return s+'</svg>';
}

function u7Txt(x,y,str,size,anchor){ return '<text x="'+fmt(x,1)+'" y="'+fmt(y,1)+'" font-size="'+(size||13)+'" fill="'+FIG_INK+'" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="'+(anchor||"middle")+'" dominant-baseline="central">'+str+'</text>'; }

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

function u7Line(p, q, dash, w, col) {
  return '<line x1="' + fmt(p[0], 1) + '" y1="' + fmt(p[1], 1) + '" x2="' + fmt(q[0], 1) + '" y2="' + fmt(q[1], 1) + '" stroke="' + (col || FIG_INK) + '" stroke-width="' + (w || 2) + '"' + (dash ? ' stroke-dasharray="6 4"' : "") + '/>';
}

function u7T(x, y, str, size, bold, anchor) {
  return '<text x="' + fmt(x, 1) + '" y="' + fmt(y, 1) + '" font-size="' + (size || 13) + '" fill="' + FIG_INK + '" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="' + (anchor || "middle") + '" dominant-baseline="central"' + (bold ? ' font-weight="bold"' : "") + '>' + str + '</text>';
}

function u7Poly(pts, fill, dash) {
  return '<polygon points="' + u7Pts(pts) + '" fill="' + (fill || "none") + '" stroke="' + FIG_INK + '" stroke-width="2"' + (dash ? ' stroke-dasharray="6 4"' : "") + '/>';
}

function u7Dot(p, r) { return '<circle cx="' + fmt(p[0], 1) + '" cy="' + fmt(p[1], 1) + '" r="' + (r || 3) + '" fill="' + FIG_INK + '"/>'; }

function u7Svg(W, H, body, aria) {
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + aria + '">' + body + '</svg>';
}

function u7Pts(pts) { return pts.map(function (p) { return fmt(p[0], 1) + "," + fmt(p[1], 1); }).join(" "); }

function u7Coord(p) { return "(" + fmt(p[0]) + ", " + fmt(p[1]) + ")"; }

function u8pair(x,y){return "("+x+", "+y+")";}

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

function u7Ang(){ return pick([26,28,30,32,35,38,40,42,48,50,55,58,60,62,65]); }

function u7FigTri(oL,aL,hL,angL){
  var s='<svg viewBox="0 0 280 200" width="280" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Right triangle diagram">';
  s+='<polygon points="55,50 55,165 245,165" fill="'+FIG_SHADE+'" fill-opacity="0.30" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<path d="M 67 165 L 67 153 L 55 153" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+='<path d="M 219 165 A 26 26 0 0 1 228 154" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+=u7Txt(24,108,oL,13); s+=u7Txt(150,185,aL,13); s+=u7Txt(163,92,hL,13); s+=u7Txt(200,150,angL,13);
  return s+'</svg>';
}

function u7fracStr(n,d){if(d<0){n=-n;d=-d;}var g=u7gcd(n,d);n/=g;d/=g;if(d===1)return String(n);return n+"/"+d;}

function u7gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t;}return a||1;}

