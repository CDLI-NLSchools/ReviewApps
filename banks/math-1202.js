/* Math 1202 bank module for the unified review app shell.
   Assembled by assemble-bank.py from banks/math-1202/; edit the
   per-unit sources there, not this file. Entries register through
   the shell's E(id, unit, indicators, level, kind, gen). */

/* ----- bank-helpers.js ----- */
/* Math 1202 bank helpers: FR and the option-text balancing
   helpers (balDpStrs, balOpts), cut verbatim from the head of
   the standalone bank source (math-1202-review/bank-src.js,
   lines 1 to 78), where they precede the Unit 1 banner. */
/* Math 1202 Review bank source. Assembled November 7, 2026 from work/unit1.js to
   unit7.js. FR returns the raw \frac fragment for use INSIDE math delimiters,
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

/* Figure helpers for the Math 1202 diagram pass (added Nov 2026).
   Elevation, depression and shadow scenes, plus circle, rectangle,
   triangle, parallelogram and box figures. Every helper takes the
   question's own drawn values for its geometry and the exact label
   strings to print; unknowns are passed in as "?" by the caller.
   Prefix m12 so nothing collides with the per-unit helpers. */
function m12Line(x1,y1,x2,y2,w,dash){
  return '<line x1="'+fmt(x1,1)+'" y1="'+fmt(y1,1)+'" x2="'+fmt(x2,1)+'" y2="'+fmt(y2,1)+'" stroke="'+FIG_INK+'" stroke-width="'+(w||2)+'"'+(dash?' stroke-dasharray="5 4"':"")+'/>';
}
function m12Arc(E,r,u,hx){
  var sweep=(hx*u[1]>0)?1:0;
  return '<path d="M '+fmt(E[0]+r*hx,1)+' '+fmt(E[1],1)+' A '+r+' '+r+' 0 0 '+sweep+' '+fmt(E[0]+r*u[0],1)+' '+fmt(E[1]+r*u[1],1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
}
function m12AngLab(E,r,u,hx,str){
  var bx=hx+u[0], by=u[1], bl=Math.sqrt(bx*bx+by*by)||1;
  return _txt(E[0]+(r+14)*bx/bl, E[1]+(r+14)*by/bl, str, 12, false);
}
/* Elevation scene: vertical object at distance o.dist, top o.rise above
   eye level; observer eye o.eye above the ground (0 for a ground level
   sight line). Labels: o.distLab under the ground segment, o.heightLab
   beside the object, o.angLab at the angle arc, o.eyeLab beside the
   eye segment when there is one. */
function m12ElevSVG(o){
  var total=o.rise+o.eye, W=340, H=250;
  var T=_fit([[-o.dist*0.18,0],[o.dist*1.18,0],[o.dist,total],[0,o.eye]], W, H, 42);
  var G0=T([-o.dist*0.18,0]), G1=T([o.dist*1.18,0]);
  var OB=T([o.dist,0]), OT=T([o.dist,total]), E=T([0,o.eye]), PB=T([0,0]);
  var out=m12Line(G0[0],G0[1],G1[0],G1[1],2);
  out+=m12Line(OB[0],OB[1],OT[0],OT[1],2.4);
  out+='<path d="M '+fmt(OB[0]-13,1)+' '+fmt(OB[1],1)+' L '+fmt(OB[0]-13,1)+' '+fmt(OB[1]-13,1)+' L '+fmt(OB[0],1)+' '+fmt(OB[1]-13,1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.4"/>';
  if(o.heightLab) out+=_txt(OB[0]-10,(OB[1]+OT[1])/2,o.heightLab,12.5,false,"end");
  if(o.eye>0){
    out+=m12Line(PB[0],PB[1],E[0],E[1],1.6);
    if(o.eyeLab) out+=_txt(E[0]-8,(PB[1]+E[1])/2,o.eyeLab,11.5,false,"end");
  }
  out+='<circle cx="'+fmt(E[0],1)+'" cy="'+fmt(E[1],1)+'" r="2.6" fill="'+FIG_INK+'"/>';
  out+=m12Line(E[0],E[1],OT[0],E[1],1.4,true);
  out+=m12Line(E[0],E[1],OT[0],OT[1],2);
  var u=_vnorm(_vsub(OT,E));
  out+=m12Arc(E,21,u,1);
  if(o.angLab) out+=m12AngLab(E,21,u,1,o.angLab);
  var A=T([0,0]), B=T([o.dist,0]);
  out+=m12Line(A[0],A[1]-4,A[0],A[1]+4,1.4)+m12Line(B[0],B[1]-4,B[0],B[1]+4,1.4);
  if(o.distLab) out+=_txt((A[0]+B[0])/2,A[1]+16,o.distLab,12,false);
  return '<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Angle of elevation diagram">'+out+'</svg>';
}
/* Depression scene: observer at the top of a cliff of height o.height,
   boat at horizontal distance o.dist from the base. Labels as in the
   elevation scene; the angle is drawn at the observer between the
   dashed horizontal and the sight line down to the boat. */
function m12DepressSVG(o){
  var W=340, H=250;
  var T=_fit([[-o.dist*0.18,0],[o.dist*1.18,0],[0,o.height],[o.dist,o.height]], W, H, 42);
  var CT=T([0,o.height]), CB=T([0,0]), B=T([o.dist,0]);
  var W0=T([-o.dist*0.18,0]), W1=T([o.dist*1.18,0]);
  var out=m12Line(W0[0],W0[1],W1[0],W1[1],2);
  out+=m12Line(CT[0]-26,CT[1],CT[0],CT[1],2.4);
  out+=m12Line(CT[0],CT[1],CB[0],CB[1],2.4);
  if(o.heightLab) out+=_txt(CT[0]-10,(CT[1]+CB[1])/2,o.heightLab,12.5,false,"end");
  out+='<circle cx="'+fmt(CT[0],1)+'" cy="'+fmt(CT[1],1)+'" r="2.6" fill="'+FIG_INK+'"/>';
  var HE=T([o.dist,o.height]);
  out+=m12Line(CT[0],CT[1],HE[0],HE[1],1.4,true);
  out+=m12Line(CT[0],CT[1],B[0],B[1],2);
  out+=m12Line(B[0]-11,B[1],B[0]+11,B[1],2.4);
  var u=_vnorm(_vsub(B,CT));
  out+=m12Arc(CT,21,u,1);
  if(o.angLab) out+=m12AngLab(CT,21,u,1,o.angLab);
  if(o.distLab) out+=_txt((CB[0]+B[0])/2,CB[1]+16,o.distLab,12,false);
  return '<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Angle of depression diagram">'+out+'</svg>';
}
/* Shadow similarity scene: a person of height ph casting a shadow psh,
   and a pole casting a shadow tsh. The pole height used for the
   geometry is the drawn answer ans; its label is "?" so the figure
   shows the setup without stating the result. */
function m12ShadowSVG(ph,psh,tsh,ans,phLab,pshLab,tshLab){
  var gap=Math.max(psh,tsh)*0.4, x2=psh+gap, W=340, H=230;
  var T=_fit([[-Math.max(ph,ans)*0.3,0],[x2+tsh+Math.max(ph,ans)*0.3,0],[0,ph],[x2,ans]], W, H, 40);
  var P0=T([0,0]), P1=T([0,ph]), P2=T([psh,0]);
  var Q0=T([x2,0]), Q1=T([x2,ans]), Q2=T([x2+tsh,0]);
  var G0=T([-Math.max(ph,ans)*0.3,0]), G1=T([x2+tsh+Math.max(ph,ans)*0.3,0]);
  var out=m12Line(G0[0],G0[1],G1[0],G1[1],2);
  out+='<polygon points="'+fmt(P0[0],1)+','+fmt(P0[1],1)+' '+fmt(P2[0],1)+','+fmt(P2[1],1)+' '+fmt(P1[0],1)+','+fmt(P1[1],1)+'" fill="'+FIG_SHADE+'" fill-opacity="0.30" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<polygon points="'+fmt(Q0[0],1)+','+fmt(Q0[1],1)+' '+fmt(Q2[0],1)+','+fmt(Q2[1],1)+' '+fmt(Q1[0],1)+','+fmt(Q1[1],1)+'" fill="'+FIG_SHADE+'" fill-opacity="0.30" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+=_txt(P0[0]-9,(P0[1]+P1[1])/2,phLab,12,false,"end");
  out+=_txt((P0[0]+P2[0])/2,P0[1]+16,pshLab,12,false);
  out+=_txt(Q0[0]+9,(Q0[1]+Q1[1])/2,"?",12.5,false,"start");
  out+=_txt((Q0[0]+Q2[0])/2,Q0[1]+16,tshLab,12,false);
  return '<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Person and flagpole with their shadows forming similar triangles">'+out+'</svg>';
}
/* Circle with a labelled radius. */
function m12CircleSVG(rLab){
  var s='<svg viewBox="0 0 310 210" width="310" height="210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Circle with labelled radius">';
  s+='<circle cx="155" cy="105" r="72" fill="'+FIG_SHADE+'" fill-opacity="0.30" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="155" y1="105" x2="227" y2="105" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  s+='<circle cx="155" cy="105" r="3" fill="'+FIG_INK+'"/>';
  s+=_txt(191,90,rLab,12.5,false);
  return s+'</svg>';
}
/* Rectangle from side values w and h, with its diagonal drawn and
   labelled diagLab. */
function m12RectDiagSVG(w,h,wLab,hLab,diagLab){
  var W=320,H=225,T=_fit([[0,0],[w,0],[w,h],[0,h]],W,H,46);
  var P00=T([0,0]),P10=T([w,0]),P11=T([w,h]),P01=T([0,h]);
  var out=m12Line(P00[0],P00[1],P10[0],P10[1],2)+m12Line(P10[0],P10[1],P11[0],P11[1],2)+m12Line(P11[0],P11[1],P01[0],P01[1],2)+m12Line(P01[0],P01[1],P00[0],P00[1],2);
  out+=m12Line(P00[0],P00[1],P11[0],P11[1],1.8);
  if(wLab) out+=_txt((P00[0]+P10[0])/2,P00[1]+16,wLab,12,false);
  if(hLab) out+=_txt(P00[0]-10,(P00[1]+P01[1])/2,hLab,12,false,"end");
  if(diagLab){ var M=[(P00[0]+P11[0])/2,(P00[1]+P11[1])/2], off=_sideOff(P00,P11,P10,15); out+=_txt(M[0]+off[0],M[1]+off[1],diagLab,12.5,false); }
  return '<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rectangle with diagonal">'+out+'</svg>';
}
/* Rectangle from side values l and w, with an optional area label
   printed inside. */
function m12RectAreaSVG(l,w,lLab,wLab,areaLab){
  var W=320,H=225,T=_fit([[0,0],[l,0],[l,w],[0,w]],W,H,46);
  var P00=T([0,0]),P10=T([l,0]),P11=T([l,w]),P01=T([0,w]);
  var out='<polygon points="'+fmt(P00[0],1)+','+fmt(P00[1],1)+' '+fmt(P10[0],1)+','+fmt(P10[1],1)+' '+fmt(P11[0],1)+','+fmt(P11[1],1)+' '+fmt(P01[0],1)+','+fmt(P01[1],1)+'" fill="'+FIG_SHADE+'" fill-opacity="0.30" stroke="'+FIG_INK+'" stroke-width="2"/>';
  if(lLab) out+=_txt((P00[0]+P10[0])/2,P00[1]+16,lLab,12,false);
  if(wLab) out+=_txt(P00[0]-10,(P00[1]+P01[1])/2,wLab,12,false,"end");
  if(areaLab) out+=_txt((P00[0]+P11[0])/2,(P00[1]+P11[1])/2,areaLab,12.5,false);
  return '<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rectangle diagram">'+out+'</svg>';
}
/* Triangle from base b and height h, with a dashed altitude. */
function m12TriAreaSVG(b,h,bLab,hLab){
  var W=320,H=225,T=_fit([[0,0],[b,0],[b*0.38,h]],W,H,48);
  var P0=T([0,0]),P1=T([b,0]),P2=T([b*0.38,h]),PF=T([b*0.38,0]);
  var out='<polygon points="'+fmt(P0[0],1)+','+fmt(P0[1],1)+' '+fmt(P1[0],1)+','+fmt(P1[1],1)+' '+fmt(P2[0],1)+','+fmt(P2[1],1)+'" fill="'+FIG_SHADE+'" fill-opacity="0.30" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+=m12Line(P2[0],P2[1],PF[0],PF[1],1.6,true);
  if(bLab) out+=_txt((P0[0]+P1[0])/2,P0[1]+16,bLab,12,false);
  if(hLab) out+=_txt(PF[0]-9,(P2[1]+PF[1])/2,hLab,12,false,"end");
  return '<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Triangle with base and height">'+out+'</svg>';
}
/* Parallelogram from base b and vertical height h, with a dashed
   altitude and an optional area label inside. */
function m12ParaAreaSVG(b,h,bLab,hLab,areaLab){
  var sh=b*0.3, W=320,H=225,T=_fit([[0,0],[b,0],[b+sh,h],[sh,h]],W,H,48);
  var P0=T([0,0]),P1=T([b,0]),P2=T([b+sh,h]),P3=T([sh,h]),PF=T([sh,0]);
  var out='<polygon points="'+fmt(P0[0],1)+','+fmt(P0[1],1)+' '+fmt(P1[0],1)+','+fmt(P1[1],1)+' '+fmt(P2[0],1)+','+fmt(P2[1],1)+' '+fmt(P3[0],1)+','+fmt(P3[1],1)+'" fill="'+FIG_SHADE+'" fill-opacity="0.30" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+=m12Line(P3[0],P3[1],PF[0],PF[1],1.6,true);
  if(bLab) out+=_txt((P0[0]+P1[0])/2,P0[1]+16,bLab,12,false);
  if(hLab) out+=_txt(PF[0]-9,(P3[1]+PF[1])/2,hLab,12,false,"end");
  if(areaLab) out+=_txt((P0[0]+P2[0])/2,(P0[1]+P2[1])/2+14,areaLab,12,false);
  return '<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parallelogram with base and height">'+out+'</svg>';
}
/* Closed box with length, width and height labels. */
function m12BoxSVG(l,w,h,unit){
  var s='<svg viewBox="0 0 300 190" width="300" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Closed rectangular box">';
  s+='<polygon points="70,80 210,80 210,160 70,160" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<polygon points="70,80 110,40 250,40 210,80" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<polygon points="210,80 250,40 250,120 210,160" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+=_txt(140,178,"length "+l+" "+unit,13,false);
  s+=_txt(262,105,"width "+w+" "+unit,13,false);
  s+=_txt(52,122,"height "+h+" "+unit,13,false,"end");
  return s+'</svg>';
}

/* ----- bank-u1.js ----- */
// Math 1202 Unit 1 Consumerism and Travel question bank
// Cut verbatim from the standalone bank source
// (math-1202-review/bank-src.js, lines 79 to 1003).
// CRMARKS: u1-cr-percent-change=2
// CRMARKS: u1-cr-currency-convert=2
// CRMARKS: u1-cr-estimate-total=2
// CRMARKS: u1-cr-prefix-convert=3
// CRMARKS: u1-cr-approx-si=3
// CRMARKS: u1-cr-approx-imperial=3
// CRMARKS: u1-cr-travel-proportion=2
// CRMARKS: u1-cr-best-buy-total=3
/* ===== Unit 1 ===== */
/* Math 1202 Unit 1: Consumerism and Travel. Helpers prefixed u1. Codes from ind-unit1.json. */
function u1R2(x){ return Math.round(x*100)/100; }
function u1Dol(x){ var s=fmtF(Math.abs(x),2); var p=s.split("."); var ip=p[0]; var out=""; while(ip.length>3){ out=","+ip.slice(-3)+out; ip=ip.slice(0,-3); } return (x<0?"-$":"$")+ip+out+"."+p[1]; }
function u1DolM(x){ return u1Dol(x).replace("$","\\$"); }
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
function u1Thermo(tempC, isC){
  var lo=isC?-30:-30, hi=isC?50:120;
  var frac=Math.max(0,Math.min(1,(tempC-lo)/(hi-lo)));
  var top=170, bot=30, h=Math.round((bot-top)*frac+top);
  var label=isC?(fmt(tempC)+" C"):(fmt(tempC)+" F");
  var s='<svg viewBox="0 0 120 210" width="120" height="210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Thermometer showing '+label+'">';
  s+='<rect x="52" y="25" width="16" height="140" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<rect x="55" y="'+h+'" width="10" height="'+(165-h)+'" fill="'+FIG_ACC+'"/>';
  s+='<circle cx="60" cy="178" r="16" fill="'+FIG_ACC+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="40" y1="165" x2="52" y2="165" stroke="'+FIG_INK+'" stroke-width="1.4"/>';
  s+='<line x1="40" y1="95" x2="52" y2="95" stroke="'+FIG_INK+'" stroke-width="1.4"/>';
  s+='<line x1="40" y1="25" x2="52" y2="25" stroke="'+FIG_INK+'" stroke-width="1.4"/>';
  s+='<text x="60" y="12" font-size="13" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">'+label+'</text>';
  s+='</svg>';
  return s;
}
function u1Bar(givenVal, givenUnit, maxVal){
  var w=Math.max(30,Math.min(280,Math.round(280*givenVal/maxVal)));
  var s='<svg viewBox="0 0 330 90" width="330" height="90" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar showing a length of '+fmt(givenVal)+' '+givenUnit+'">';
  s+='<rect x="20" y="30" width="'+w+'" height="22" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="20" y1="24" x2="20" y2="58" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="'+(20+w)+'" y1="24" x2="'+(20+w)+'" y2="58" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<text x="'+(20+w/2)+'" y="76" font-size="13" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">'+fmt(givenVal)+' '+givenUnit+'</text>';
  s+='</svg>';
  return s;
}

E("u1-unit-price-find", 1, ["1.1"], 1, "gen", function(){
  var mode=ri(1,3);
  if(mode===1){
    var foods=["sliced cheese","deli ham","ground coffee","trail mix","shredded coconut","sliced turkey","granola","deli salami"];
    var food=pick(foods); var W=pick([250,300,400,500,600,750,800,1000]);
    var P=ri(420,2790)/100; var ans=u1R2(P*100/W);
    var ds=u1Pick3(ans,[
      {v:P/W, fb:"That is the price for 1 g. A unit price per 100 g must scale up to 100 g."},
      {v:P, fb:"That is the price of the whole package. A unit price divides the cost by the amount."},
      {v:P*100/(W+100), fb:"That divides by the wrong mass. Use the mass printed on the package."},
      {v:P*100/(W-100), fb:"That divides by the wrong mass. Use the mass printed on the package."}
    ],0.07);
    var opts=ds.map(function(d){ return {t:u1Dol(d.v)+" per 100 g", fb:d.fb}; });
    return mcq("A package of "+food+" has a mass of "+W+" g and costs "+u1Dol(P)+". What is the unit price per 100 g?",
      {t:u1Dol(ans)+" per 100 g", fb:"Yes: divide the total cost by the number of 100 g units in the package."}, opts,
      "\\[ \\begin{aligned} \\text{Number of 100 g units} &= "+W+" \\div 100 = "+fmt(W/100)+" \\\\ \\text{Unit price} &= "+u1DolM(P)+" \\div "+fmt(W/100)+" = "+u1DolM(ans)+" \\end{aligned} \\] The answer is <b>"+u1Dol(ans)+" per 100 g</b>.",
      {mode:1,W:W,P:P});
  }
  if(mode===2){
    var packs=[["muffins","bakery"],["bagels","bakery"],["granola bars","grocery store"],["yogurt cups","grocery store"],["juice boxes","grocery store"],["tea bags","grocery store"]];
    var pk=pick(packs); var n=ri(4,12); var P2=ri(320,2390)/100; var ans2=u1R2(P2/n);
    var ds2=u1Pick3(ans2,[
      {v:P2, fb:"That is the price of the whole pack. A unit price divides the cost by the number of items."},
      {v:P2/(n-1), fb:"That divides by one item too few. Count every item in the pack."},
      {v:P2-P2/n, fb:"That is the cost of the pack with one item removed, not the cost of one item."},
      {v:P2/(n+1), fb:"That divides by one item too many. Count every item in the pack."}
    ],0.06);
    var opts2=ds2.map(function(d){ return {t:u1Dol(d.v)+" each", fb:d.fb}; });
    return mcq("A pack of "+n+" "+pk[0]+" at the "+pk[1]+" costs "+u1Dol(P2)+". What is the unit price for one "+pk[0].replace(/s$/,"")+"?",
      {t:u1Dol(ans2)+" each", fb:"Yes: unit price is total cost divided by the number of items."}, opts2,
      "\\[ \\begin{aligned} \\text{Unit price} &= \\frac{\\text{total cost}}{\\text{number of items}} = \\frac{"+fmtF(P2,2)+"}{"+n+"} \\\\ &= "+u1DolM(ans2)+" \\end{aligned} \\] The answer is <b>"+u1Dol(ans2)+" each</b>.",
      {mode:2,n:n,P:P2});
  }
  var drinks=["apple juice","milk","iced tea","orange juice","sparkling water"];
  var drink=pick(drinks); var V=pick([1,1.5,2,3,4]); var P3=ri(280,1890)/100; var ans3=u1R2(P3/V);
  var ds3=u1Pick3(ans3,[
    {v:P3, fb:"That is the price of the whole container. A unit price divides the cost by the volume."},
    {v:P3*V, fb:"That multiplies by the volume. A unit price divides the cost by the volume."},
    {v:P3/(V+1), fb:"That divides by the wrong volume. Use the volume printed on the container."},
    {v:P3/2, fb:"That simply halves the total cost instead of dividing by the actual volume."}
  ],0.06);
  var opts3=ds3.map(function(d){ return {t:u1Dol(d.v)+" per litre", fb:d.fb}; });
  return mcq("A "+fmt(V)+" L bottle of "+drink+" costs "+u1Dol(P3)+". What is the unit price per litre?",
    {t:u1Dol(ans3)+" per litre", fb:"Yes: unit price is total cost divided by the number of litres."}, opts3,
    "\\[ \\begin{aligned} \\text{Unit price} &= \\frac{\\text{total cost}}{\\text{volume}} = \\frac{"+fmtF(P3,2)+"}{"+fmt(V)+"} \\\\ &= "+u1DolM(ans3)+" \\end{aligned} \\] The answer is <b>"+u1Dol(ans3)+" per litre</b>.",
    {mode:3,V:V,P:P3});
}, ["Unit price means the cost for one standard amount of the item.", "Start by dividing the total cost by the quantity in the package."]);

E("u1-prefix-power", 1, ["3.3"], 1, "gen", function(){
  var prefs=[
    {name:"kilo", sym:"k", exp:3},
    {name:"hecto", sym:"h", exp:2},
    {name:"deca", sym:"da", exp:1},
    {name:"deci", sym:"d", exp:-1},
    {name:"centi", sym:"c", exp:-2},
    {name:"milli", sym:"m", exp:-3}
  ];
  var units=["metre","litre","gram"];
  var pr=pick(prefs); var un=pick(units); var mode=ri(1,3);
  function expStr(e){ return "\\(10^{"+e+"}\\)"; }
  if(mode===1){
    var others=prefs.filter(function(q){ return q.exp!==pr.exp; });
    var d1=pick(others); var rest=others.filter(function(q){ return q.exp!==d1.exp; }); var d2=pick(rest);
    var th=rest.filter(function(q){ return q.exp!==d2.exp; }); var d3=pick(th);
    return mcq("In the SI system, the prefix "+pr.name+"- stands for which power of ten? For example, one "+pr.name+un+" is that many "+un+"s.",
      {t:expStr(pr.exp), fb:"Yes: "+pr.name+"- means "+expStr(pr.exp)+" times the base unit."},
      [{t:expStr(d1.exp), fb:"That power belongs to the prefix "+d1.name+"-, not "+pr.name+"-."},
       {t:expStr(d2.exp), fb:"That power belongs to the prefix "+d2.name+"-, not "+pr.name+"-."},
       {t:expStr(d3.exp), fb:"That power belongs to the prefix "+d3.name+"-, not "+pr.name+"-."}],
      "SI prefixes name powers of ten. The prefix "+pr.name+"- means \\(10^{"+pr.exp+"}\\). The answer is <b>"+expStr(pr.exp)+"</b>.",
      {mode:1,p:pr.name});
  }
  if(mode===2){
    var o2=prefs.filter(function(q){ return q.exp!==pr.exp; });
    var e1=pick(o2); var r2=o2.filter(function(q){ return q.exp!==e1.exp; }); var e2=pick(r2);
    var r3=r2.filter(function(q){ return q.exp!==e2.exp; }); var e3=pick(r3);
    return mcq("A measurement is written as \\(10^{"+pr.exp+"}\\) "+un+"s. Which prefix gives this size of unit?",
      {t:pr.name+"-", fb:"Yes: "+pr.name+"- is the prefix for \\(10^{"+pr.exp+"}\\)."},
      [{t:e1.name+"-", fb:e1.name+"- stands for \\(10^{"+e1.exp+"}\\), not \\(10^{"+pr.exp+"}\\)."},
       {t:e2.name+"-", fb:e2.name+"- stands for \\(10^{"+e2.exp+"}\\), not \\(10^{"+pr.exp+"}\\)."},
       {t:e3.name+"-", fb:e3.name+"- stands for \\(10^{"+e3.exp+"}\\), not \\(10^{"+pr.exp+"}\\)."}],
      "Match the exponent to the prefix table: \\(10^{"+pr.exp+"}\\) matches "+pr.name+"-. The answer is <b>"+pr.name+"-</b>.",
      {mode:2,p:pr.name});
  }
  var mult=Math.pow(10,pr.exp);
  var big=pr.exp>0;
  var qtext=big?("How many "+un+"s are in one "+pr.name+un+"?"):("One "+pr.name+un+" is what fraction of a "+un+"? Write the matching value.");
  var correctT=big?(fmt(mult)+" "+un+"s"):("\\("+FR(1,Math.pow(10,-pr.exp))+"\\) of a "+un);
  var cand=big?[mult*10,mult/10,mult*100]:null;
  var opts;
  if(big){
    opts=cand.map(function(v,i){ return {t:fmt(v)+" "+un+"s", fb:["That is one power of ten too large. "+pr.name+"- means "+fmt(mult)+", not "+fmt(v)+".","That is one power of ten too small. "+pr.name+"- means "+fmt(mult)+", not "+fmt(v)+".","That is two powers of ten too large. "+pr.name+"- means "+fmt(mult)+"."][i]}; });
  } else {
    var den=Math.pow(10,-pr.exp);
    opts=[{t:"\\("+FR(1,den*10)+"\\) of a "+un, fb:"That denominator is one power of ten too large."},
          {t:"\\("+FR(den,1)+"\\) of a "+un, fb:"That flips the fraction: a "+pr.name+un+" is smaller than a "+un+", not larger."},
          {t:"\\("+FR(1,Math.max(den/10,1))+"\\) of a "+un, fb:"That denominator is one power of ten too small."}];
    if(den/10<1){ opts[2]={t:"\\(1\\) "+un, fb:"That says the two units are equal in size."}; }
  }
  return mcq(qtext,
    {t:correctT, fb:"Yes: "+pr.name+"- means \\(10^{"+pr.exp+"}\\), which gives this size."}, opts,
    "The prefix "+pr.name+"- means \\(10^{"+pr.exp+"}\\). So one "+pr.name+un+" equals "+(big?fmt(mult)+" "+un+"s":"\\("+FR(1,Math.pow(10,-pr.exp))+"\\) of a "+un)+". The answer is <b>"+correctT+"</b>.",
    {mode:3,p:pr.name});
}, ["Each SI prefix stands for a power of ten.", "Start by recalling the exponent for the prefix, then work out what size it gives."]);

E("u1-context-systems", 1, ["3.2","3.10"], 1, "var", varset([
  function(){ return mcq("A highway sign near St. John's shows that a town is 85 km away, and the speed limit is 100 km/h. Which measurement system is being used?",
    {t:"The SI system, because kilometres and kilometres per hour are SI units.", fb:"Yes: kilometre is an SI unit built from the metre."},
    [{t:"The imperial system, because roads and highways always use imperial units.", fb:"Canadian highway signs use kilometres, which belong to SI."},
     {t:"Both systems equally, because cars are made in many countries worldwide.", fb:"The units shown, km and km/h, are SI units only."},
     {t:"Neither system, because road signs are not really measurements at all.", fb:"Distances and speeds on signs are measurements, given here in SI units."}],
    "Kilometres are built from the metre by a power of ten, so they belong to SI. The answer is <b>the SI system</b>.", {}); },
  function(){ return mcq("A recipe from an American cookbook calls for 2 cups of flour and an oven temperature in degrees Fahrenheit. Which measurement system is being used?",
    {t:"The imperial system, because cups and degrees Fahrenheit are imperial units.", fb:"Yes: cups and Fahrenheit belong to the imperial family of units."},
    [{t:"The SI system, because cooking and baking always use SI units at home.", fb:"SI cooking measures would be grams, millilitres and degrees Celsius."},
     {t:"Both systems equally, because recipes freely mix units from both systems.", fb:"Both units named here, cups and Fahrenheit, are imperial."},
     {t:"Neither system, because recipes are not true measurements in any system.", fb:"Amounts and oven temperatures are measurements, given here in imperial units."}],
    "Cups and degrees Fahrenheit are imperial units. The answer is <b>the imperial system</b>.", {}); },
  function(){ return mcq("A pharmacy label shows a dose of 250 mg, and the pharmacist measures 5 mL of liquid medicine. Which measurement system is being used?",
    {t:"The SI system, because milligrams and millilitres are SI units.", fb:"Yes: both units use SI prefixes on base units."},
    [{t:"The imperial system, because medicine is measured in small amounts.", fb:"Small size does not make a unit imperial: mg and mL are SI."},
     {t:"Both systems equally, because a dose uses two different units together.", fb:"Both units named here are SI units."},
     {t:"Neither system, because health measures use their own system.", fb:"Health measures in Canada use SI units such as mg and mL."}],
    "Milligrams and millilitres are built from SI base units with prefixes. The answer is <b>the SI system</b>.", {}); },
  function(){ return mcq("At a lumber yard, a board is sold as 8 feet long and 2 inches by 4 inches in cross-section. Which measurement system is being used?",
    {t:"The imperial system, because feet and inches are imperial units.", fb:"Yes: feet and inches belong to the imperial system."},
    [{t:"The SI system, because lumber is a building material measured in SI.", fb:"The material does not choose the system: feet and inches are imperial."},
     {t:"Both systems equally, because boards are also sold in other sizes.", fb:"The units named here, feet and inches, are imperial only."},
     {t:"Neither system, because lumber trade sizes are just names, not units.", fb:"Feet and inches are real imperial units of length."}],
    "Feet and inches are imperial length units. The answer is <b>the imperial system</b>.", {}); },
  function(){ return mcq("A weather report for Newfoundland gives an overnight low of -6 degrees Celsius and 12 cm of snow. Which measurement system is being used?",
    {t:"The SI system, because degrees Celsius and centimetres are SI units.", fb:"Yes: Celsius and the centimetre both belong to SI."},
    [{t:"The imperial system, because weather used imperial units in the past.", fb:"Past practice does not change the system of the units shown: both are SI."},
     {t:"Both systems equally, because snow depth can be measured either way.", fb:"The units in the report, Celsius and centimetres, are SI."},
     {t:"Neither system, because weather reports have their own special units.", fb:"Weather in Canada is reported in SI units such as Celsius and centimetres."}],
    "Degrees Celsius and centimetres are SI units. The answer is <b>the SI system</b>.", {}); },
  function(){ return mcq("A driver in the United States fills a car with 12 gallons of gasoline and then drives 65 miles. Which measurement system is being used?",
    {t:"The imperial system, because gallons and miles are imperial units.", fb:"Yes: gallons and miles belong to the imperial family used in the US."},
    [{t:"The SI system, because driving always uses SI units in every country.", fb:"Driving in Canada uses SI, but gallons and miles are imperial."},
     {t:"Both systems equally, because the car also has other gauges.", fb:"The units named here, gallons and miles, are imperial."},
     {t:"Neither system, because travel and driving use their own units.", fb:"Gallons and miles are imperial units of volume and distance."}],
    "Gallons and miles are imperial units. The answer is <b>the imperial system</b>.", {}); }
]), ["Look at the units named in the scenario and ask which family they belong to.", "Start by listing the units in the scenario, then match each one to SI or imperial."]);

E("u1-approx-quick", 1, ["3.5","3.12"], 1, "gen", function(){
  var mode=ri(1,4);
  if(mode===1){
    var items=["ribbon","garden hose","picture frame width","bookshelf board","curtain width","table runner"];
    var it=pick(items); var n=ri(2,14); var ans=n*2.5;
    var _bo0=balOpts({t:fmt(ans), fb:"Yes: multiply the inches by about 2.5 to get centimetres."}, [{t:fmt(n*2), fb:"That uses 2 cm per inch. The given approximation is 2.5 cm per inch."},
       {t:fmt(n*3), fb:"That uses 3 cm per inch. The given approximation is 2.5 cm per inch."},
       {t:fmt(u1R2(n/2.5)), fb:"That divides by 2.5. Going from inches to centimetres makes the number larger, so multiply."}]); return mcq("A "+it+" measures "+n+" inches long. Using the approximation 1 inch is about 2.5 cm, about how long is it in centimetres?", _bo0[0], _bo0[1],
      "\\[ \\begin{aligned} \\text{Length} &\\approx "+n+" \\times 2.5 \\\\ &= "+fmt(ans)+" \\text{ cm} \\end{aligned} \\] The answer is <b>about "+fmt(ans)+" cm</b>.",
      {mode:1,n:n});
  }
  if(mode===2){
    var L=pick([4,8,12,16,20,24,40,60,80]); var gal=L/4;
    var _bo1=balOpts({t:fmt(gal), fb:"Yes: one quarter of the litres gives the approximate gallons."}, [{t:fmt(L/2), fb:"That takes one half of the litres. The given approximation uses one quarter."},
       {t:fmt(L), fb:"That keeps the same number. Litres and gallons are different sizes, so the number must change."},
       {t:fmt(L*4), fb:"That multiplies by 4. A gallon is larger than a litre, so the gallon count is smaller than the litre count."}]); return mcq("A fish tank holds "+L+" litres of water. Using the approximation 1 litre is about one quarter of a US gallon, about how many US gallons does the tank hold?", _bo1[0], _bo1[1],
      "\\[ \\begin{aligned} \\text{Gallons} &\\approx "+L+" \\times \\frac{1}{4} \\\\ &= "+fmt(gal)+" \\end{aligned} \\] The answer is <b>about "+fmt(gal)+" US gallons</b>.",
      {mode:2,L:L});
  }
  if(mode===3){
    var g=pick([2,3,4,5,6,8,10,12]); var L3=g*4;
    var _bo2=balOpts({t:fmt(L3), fb:"Yes: multiply the gallons by about 4 to get litres."}, [{t:fmt(g*2), fb:"That uses 2 litres per gallon. The given approximation is about 4 litres per gallon."},
       {t:fmt(g), fb:"That keeps the same number. A gallon is larger than a litre, so the litre count is larger."},
       {t:fmt(u1R2(g/4)), fb:"That divides by 4. Going from gallons to litres makes the number larger, so multiply."}]); return mcq("A boat fuel tank is labelled  "+g+" US gallons. Using the approximation 1 US gallon is about 4 litres, about how many litres does the tank hold?", _bo2[0], _bo2[1],
      "\\[ \\begin{aligned} \\text{Litres} &\\approx "+g+" \\times 4 \\\\ &= "+fmt(L3)+" \\end{aligned} \\] The answer is <b>about "+fmt(L3)+" litres</b>.",
      {mode:3,g:g});
  }
  var cm=pick([5,10,15,20,25,30,40,50]); var inch=cm/2.5;
  var _bo3=balOpts({t:fmt(inch), fb:"Yes: divide the centimetres by about 2.5 to get inches."}, [{t:fmt(cm*2.5), fb:"That multiplies by 2.5. Going from centimetres to inches makes the number smaller, so divide."},
     {t:fmt(cm), fb:"That keeps the same number. Inches and centimetres are different sizes, so the number must change."},
     {t:fmt(cm/2), fb:"That divides by 2. The given approximation is 2.5 cm per inch."}]); return mcq("A phone screen measures "+cm+" cm across. Using the approximation 1 inch is about 2.5 cm, about how wide is the screen in inches?", _bo3[0], _bo3[1],
    "\\[ \\begin{aligned} \\text{Inches} &\\approx "+cm+" \\div 2.5 \\\\ &= "+fmt(inch)+" \\end{aligned} \\] The answer is <b>about "+fmt(inch)+" inches</b>.",
    {mode:4,cm:cm});
}, ["Use the approximation given in the question, and check whether the number should grow or shrink.", "Start by deciding whether to multiply or divide by the approximation factor."]);

E("u1-rate-difference", 1, ["1.5"], 1, "var", varset([
  function(){ return mcq("At a bank, what does the selling rate for a foreign currency mean?",
    {t:"It is the rate the bank uses when it sells foreign currency to a customer.", fb:"Yes: selling describes what the bank does, selling currency to the customer."},
    [{t:"It is the rate the bank uses when it buys foreign currency back from a customer.", fb:"That describes the purchasing rate, where the bank does the buying."},
     {t:"It is the rate travellers use when they sell items while travelling on a trip.", fb:"The selling rate is set by the bank for currency exchange, not for selling items."},
     {t:"It is a fee that banks add to hotel rooms booked in another country.", fb:"The selling rate is about exchanging currency at a bank or exchange desk."}],
    "Exchange rates are named from the bank's point of view. When the bank sells foreign currency, it uses the selling rate. The answer is <b>the rate used when the bank sells foreign currency to a customer</b>.", {}); },
  function(){ return mcq("At a bank, what does the purchasing rate for a foreign currency mean?",
    {t:"It is the rate the bank uses when it purchases foreign currency from a customer.", fb:"Yes: purchasing describes what the bank does, buying currency from the customer."},
    [{t:"It is the rate the bank uses when it sells foreign currency to a customer in person.", fb:"That describes the selling rate, where the bank does the selling."},
     {t:"It is the price of goods in a foreign store, stated in Canadian dollars.", fb:"Store prices are separate: the purchasing rate is a bank exchange rate."},
     {t:"It is a discount given to customers on purchases made with a credit card abroad.", fb:"The purchasing rate is about exchanging currency, not card discounts."}],
    "Exchange rates are named from the bank's point of view. When the bank purchases foreign currency, it uses the purchasing rate. The answer is <b>the rate used when the bank purchases foreign currency from a customer</b>.", {}); },
  function(){ return mcq("Before a trip to the United States, Sam exchanges Canadian dollars for US dollars at a bank. Which rate does the bank use?",
    {t:"The selling rate, because the bank is selling US dollars to Sam.", fb:"Yes: the bank sells the foreign currency, so the selling rate applies."},
    [{t:"The purchasing rate, because Sam is purchasing US dollars.", fb:"Rates are named from the bank's side: the bank is selling, so it is the selling rate."},
     {t:"Either rate, because both give Sam exactly the same US dollars.", fb:"The two rates differ, so the choice changes how many US dollars Sam gets."},
     {t:"Neither rate, because trips abroad use a special travel rate only.", fb:"A bank exchange for a trip still uses the selling or purchasing rate."}],
    "Sam receives US dollars that the bank sells to him, so the bank's selling rate applies. The answer is <b>the selling rate</b>.", {}); },
  function(){ return mcq("After a trip, Priya brings leftover euros back to her bank and exchanges them for Canadian dollars. Which rate does the bank use?",
    {t:"The purchasing rate, because the bank is purchasing euros from Priya.", fb:"Yes: the bank buys the foreign currency, so the purchasing rate applies."},
    [{t:"The selling rate, because Priya is selling her euros.", fb:"Rates are named from the bank's side: the bank is purchasing, so it is the purchasing rate."},
     {t:"Either rate, because leftover amounts are too small to matter to the bank.", fb:"The rate still applies to any amount exchanged at the bank."},
     {t:"Neither rate, because euros cannot be exchanged at a bank after a trip.", fb:"Leftover foreign currency can be exchanged back at the purchasing rate."}],
    "The bank buys Priya's euros, so the bank's purchasing rate applies. The answer is <b>the purchasing rate</b>.", {}); },
  function(){ return mcq("A bank posts a selling rate of 1 US dollar = 1.38 Canadian dollars and a purchasing rate of 1 US dollar = 1.31 Canadian dollars. Why are the two rates different?",
    {t:"The gap between the rates is how the bank covers its costs and makes money on exchanges.", fb:"Yes: the bank sells high and buys low, and the difference is its margin."},
    [{t:"The selling rate is for new bills and the purchasing rate is for older bills only.", fb:"Bill condition does not set the two rates."},
     {t:"The two rates are for two different countries' dollars, one rate for buying and one for selling.", fb:"Both rates here are for the same US dollar."},
     {t:"The rates differ because of a printing error made at the bank when the rates were posted.", fb:"The gap is deliberate: it is the bank's margin on the exchange."}],
    "The bank sells a US dollar for $1.38 and buys one back for $1.31. The $0.07 gap covers costs and profit. The answer is <b>the gap is the bank's margin on exchanges</b>.", {}); },
  function(){ return mcq("Which statement about the two exchange rates at a bank is correct?",
    {t:"A customer gets fewer Canadian dollars back for foreign currency than the foreign currency cost to buy, because the purchasing rate is lower than the selling rate.", fb:"Yes: buying uses the higher selling rate and selling back uses the lower purchasing rate."},
    [{t:"A customer gets more Canadian dollars back for foreign currency than the foreign currency cost to buy, because the purchasing rate is higher than the selling rate.", fb:"The purchasing rate is the lower rate, so a round trip returns less."},
     {t:"The selling rate and the purchasing rate are always equal at any bank, so exchanging currency back returns the same Canadian dollars that were paid for the currency.", fb:"The rates differ: the gap is the bank's margin."},
     {t:"The purchasing rate is the rate a customer uses first when buying foreign currency for a trip, and the selling rate applies only when the trip is over.", fb:"Buying foreign currency uses the selling rate, from the bank's point of view."}],
    "Buying foreign currency uses the selling rate (higher) and selling it back uses the purchasing rate (lower), so a round trip returns fewer Canadian dollars. The answer is <b>the purchasing rate is lower than the selling rate</b>.", {}); }
]), ["Name the rates from the bank's point of view, not the customer's.", "Start by asking: in this exchange, is the bank selling currency or purchasing it?"]);

E("u1-best-buy-unit", 1, ["1.1","1.3"], 2, "gen", function(){
  var prods=[
    {name:"long grain rice", kind:"mass", unit:"g", sizes:[500,750,900,1000,1500,2000], per:"per 100 g"},
    {name:"dish soap", kind:"vol", unit:"mL", sizes:[500,650,750,900,1000,1250], per:"per 100 mL"},
    {name:"orange juice", kind:"vol", unit:"mL", sizes:[750,1000,1250,1500,1750,2000], per:"per 100 mL"},
    {name:"dog food", kind:"mass", unit:"g", sizes:[1000,1500,2000,3000,4000,6000], per:"per 100 g"},
    {name:"laundry detergent", kind:"vol", unit:"mL", sizes:[1000,1470,2000,2950,4430], per:"per 100 mL"},
    {name:"rolled oats", kind:"mass", unit:"g", sizes:[500,750,1000,1250,1500,2000], per:"per 100 g"}
  ];
  var pr=pick(prods);
  var sA=pick(pr.sizes); var sB=pick(pr.sizes); var g=0;
  while(sB===sA&&g++<40){ sB=pick(pr.sizes); } if(sB===sA){ sB=pr.sizes[(pr.sizes.indexOf(sA)+1)%pr.sizes.length]; }
  var pA=0, pB=0, uA=0, uB=0; g=0;
  do { pA=ri(290,2400)/100; pB=ri(290,2400)/100; uA=pA/(sA/100); uB=pB/(sB/100); g++; } while((Math.abs(uA-uB)<0.06||uA<0.15||uB<0.15)&&g<200);
  if(Math.abs(uA-uB)<0.06){ pB=u1R2(pB+1.00); uB=pB/(sB/100); }
  var aWins=uA<uB; var winLab=aWins?"Option A":"Option B";
  var winU=Math.min(uA,uB), loseU=Math.max(uA,uB);
  return mcq("Two sizes of "+pr.name+" are on the shelf. Option A: "+fmt(sA)+" "+pr.unit+" for "+u1Dol(pA)+". Option B: "+fmt(sB)+" "+pr.unit+" for "+u1Dol(pB)+". Based on unit price "+pr.per+", which is the better buy?",
    {t:winLab+", at "+u1Dol(u1R2(winU))+" "+pr.per, fb:"Yes: its unit price is lower, "+u1Dol(u1R2(winU))+" versus "+u1Dol(u1R2(loseU))+" "+pr.per+"."},
    [{t:(aWins?"Option B":"Option A")+", at "+u1Dol(u1R2(loseU))+" "+pr.per, fb:"Its unit price is higher, "+u1Dol(u1R2(loseU))+" versus "+u1Dol(u1R2(winU))+" "+pr.per+". Compare cost for the same amount."},
     {t:"Both options cost the same "+pr.per, fb:"The unit prices differ: "+u1Dol(u1R2(uA))+" for A and "+u1Dol(u1R2(uB))+" for B."},
     {t:"The unit prices cannot be compared because the package sizes are different", fb:"Different sizes are exactly why unit price is used: it puts both on the same amount."}],
    "\\[ \\begin{aligned} \\text{Unit price A} &= "+u1DolM(pA)+" \\div "+fmt(sA/100)+" = "+u1DolM(u1R2(uA))+" \\text{ "+pr.per+"} \\\\ \\text{Unit price B} &= "+u1DolM(pB)+" \\div "+fmt(sB/100)+" = "+u1DolM(u1R2(uB))+" \\text{ "+pr.per+"} \\end{aligned} \\] The lower unit price is the better buy on cost. The answer is <b>"+winLab+"</b>.",
    {sA:sA,sB:sB,pA:pA,pB:pB});
}, ["Put both options on the same amount before comparing prices.", "Start by finding the unit price of Option A, then do the same for Option B."]);

E("u1-promo-compare", 1, ["1.2"], 2, "gen", function(){
  var mode=ri(1,3);
  if(mode===1){
    var meats=["turkey breast","roast beef","smoked ham","chicken breast","salami","pastrami"];
    var meat=pick(meats);
    var a100=ri(115,340)/100; var perKgA=a100*10;
    var perKgB=ri(1050,3450)/100; var g=0;
    while(Math.abs(perKgA-perKgB)<1.20&&g++<200){ perKgB=ri(1050,3450)/100; }
    if(Math.abs(perKgA-perKgB)<1.20){ perKgB=u1R2(perKgA+2.50); }
    var aCheaper=perKgA<perKgB;
    return mcq("At a deli, sliced "+meat+" is priced two ways on two signs. Sign 1 shows "+u1Dol(a100)+" per 100 g. Sign 2 shows "+u1Dol(perKgB)+" per kilogram. Which sign gives the lower price for the same amount of meat?",
      {t:aCheaper?"Sign 1, the per 100 g price":"Sign 2, the per kilogram price", fb:"Yes: Sign 1 works out to "+u1Dol(u1R2(perKgA))+" per kilogram, compared with "+u1Dol(perKgB)+" per kilogram on Sign 2."},
      [{t:aCheaper?"Sign 2, the per kilogram price":"Sign 1, the per 100 g price", fb:"Put both on one kilogram first: Sign 1 is "+u1Dol(u1R2(perKgA))+" per kilogram and Sign 2 is "+u1Dol(perKgB)+" per kilogram."},
       {t:"Both signs give the same price per kilogram", fb:"Per kilogram, the prices are "+u1Dol(u1R2(perKgA))+" and "+u1Dol(perKgB)+", which differ."},
       {t:"The per 100 g sign always gives the lower price", fb:"A smaller pricing unit only looks smaller: convert it before deciding. Here per kilogram it is "+u1Dol(u1R2(perKgA))+"."}],
      "\\[ \\begin{aligned} \\text{Sign 1 per kilogram} &= "+u1DolM(a100)+" \\times 10 \\\\ &= "+u1DolM(u1R2(perKgA))+" \\end{aligned} \\] Compare "+u1Dol(u1R2(perKgA))+" per kilogram with "+u1Dol(perKgB)+" per kilogram. The answer is <b>"+(aCheaper?"Sign 1":"Sign 2")+"</b>.",
      {mode:1,a100:a100,perKgB:perKgB});
  }
  if(mode===2){
    var items=["bottles of shampoo","cans of soup","pairs of work socks","boxes of tea","jars of jam","tubes of toothpaste"];
    var it=pick(items); var p=pick([3.50,4.00,4.50,5.00,5.50,6.00,7.50,8.00]);
    var dealA=pick(["buy 2 get 1 free","buy 1 get 1 free","buy 3 get 1 free"]);
    var offB=pick([20,25,30,40,50]);
    var need=dealA==="buy 1 get 1 free"?4:(dealA==="buy 2 get 1 free"?3:4);
    var freeN=dealA==="buy 1 get 1 free"?2:(dealA==="buy 2 get 1 free"?1:1);
    var costA=(need-freeN)*p; var costB=u1R2(need*p*(1-offB/100));
    var g2=0; while(Math.abs(costA-costB)<0.50&&g2++<50){ offB=pick([20,25,30,40,50]); costB=u1R2(need*p*(1-offB/100)); }
    if(Math.abs(costA-costB)<0.50){ costB=u1R2(costA+1.25); }
    var aWins2=costA<costB;
    return mcq("A shopper needs "+need+" "+it+", each priced at "+u1Dol(p)+". Store A offers "+dealA+". Store B offers "+offB+"% off every item. Which offer costs less for the "+need+" items?",
      {t:aWins2?"Store A, the "+dealA+" offer":"Store B, the "+offB+"% off offer", fb:"Yes: Store A charges "+u1Dol(costA)+" in total and Store B charges "+u1Dol(costB)+" in total."},
      [{t:aWins2?"Store B, the "+offB+"% off offer":"Store A, the "+dealA+" offer", fb:"Work out both totals: Store A charges "+u1Dol(costA)+" and Store B charges "+u1Dol(costB)+"."},
       {t:"Both offers cost the same in total", fb:"The totals differ: "+u1Dol(costA)+" at Store A and "+u1Dol(costB)+" at Store B."},
       {t:"The offer with a free item always costs less", fb:"A free item deal can still lose to a large percent off: compare the two totals, "+u1Dol(costA)+" and "+u1Dol(costB)+"."}],
      "\\[ \\begin{aligned} \\text{Store A} &= "+(need-freeN)+" \\times "+u1DolM(p)+" = "+u1DolM(costA)+" \\\\ \\text{Store B} &= "+need+" \\times "+u1DolM(p)+" \\times "+fmt(1-offB/100)+" = "+u1DolM(costB)+" \\end{aligned} \\] The answer is <b>"+(aWins2?"Store A":"Store B")+"</b>.",
      {mode:2,dealA:dealA,offB:offB,p:p});
  }
  var item3=pick(["winter jacket","pair of boots","backpack","electric kettle","tool set","hockey bag"]);
  var P=pick([60,80,90,100,120,150,180,200]); var dOff=pick([10,15,20,25,30]); var pOff=pick([10,15,20,25,30,35,40]);
  var finalD=P-dOff; var finalP=u1R2(P*(1-pOff/100)); var g3=0;
  while(Math.abs(finalD-finalP)<1.00&&g3++<60){ pOff=pick([10,15,20,25,30,35,40]); finalP=u1R2(P*(1-pOff/100)); }
  if(Math.abs(finalD-finalP)<1.00){ finalP=u1R2(finalD+2.00); }
  var dWins=finalD<finalP;
  return mcq("A "+item3+" is priced at "+u1Dol(P)+". One store offers "+u1Dol(dOff)+" off. Another store offers "+pOff+"% off. Which offer gives the lower final price?",
    {t:dWins?"The "+u1Dol(dOff)+" off offer, at "+u1Dol(finalD):"The "+pOff+"% off offer, at "+u1Dol(finalP), fb:"Yes: the final prices are "+u1Dol(finalD)+" and "+u1Dol(finalP)+", and this offer gives the lower one."},
    [{t:dWins?"The "+pOff+"% off offer, at "+u1Dol(finalP):"The "+u1Dol(dOff)+" off offer, at "+u1Dol(finalD), fb:"Its final price is higher: compare "+u1Dol(finalD)+" with "+u1Dol(finalP)+"."},
     {t:"Both offers give the same final price", fb:"The final prices differ: "+u1Dol(finalD)+" versus "+u1Dol(finalP)+"."},
     {t:"The percent off offer always gives the lower price", fb:"Percent off depends on the starting price: here the two final prices are "+u1Dol(finalD)+" and "+u1Dol(finalP)+"."}],
    "\\[ \\begin{aligned} \\text{Dollars off} &= "+u1DolM(P)+" - "+u1DolM(dOff)+" = "+u1DolM(finalD)+" \\\\ \\text{Percent off} &= "+u1DolM(P)+" \\times "+fmt(1-pOff/100)+" = "+u1DolM(finalP)+" \\end{aligned} \\] The answer is <b>"+(dWins?"the dollars off offer":"the percent off offer")+"</b>.",
    {mode:3,P:P,dOff:dOff,pOff:pOff});
}, ["Promotions only look simple: turn each offer into an actual cost for the same amount.", "Start by working out the full cost under the first offer."]);

E("u1-percent-change", 1, ["1.4"], 2, "gen", function(){
  var mode=ri(1,2);
  var ctxs=[
    {name:"The monthly rent on an apartment", fmtC:function(v){ return u1Dol(v); }},
    {name:"The price of a winter coat", fmtC:function(v){ return u1Dol(v); }},
    {name:"A ferry fare", fmtC:function(v){ return u1Dol(v); }},
    {name:"A monthly phone plan", fmtC:function(v){ return u1Dol(v); }},
    {name:"The price of a used bicycle", fmtC:function(v){ return u1Dol(v); }},
    {name:"A weekly grocery bill total", fmtC:function(v){ return u1Dol(v); }}
  ];
  var cx=pick(ctxs); var O=pick([40,50,60,75,80,100,120,125,150,160,200,240,250,300,400,500,600,800]);
  var p=pick([10,12.5,15,20,25,30,40,50,60,75]); var inc=Math.random()<0.5;
  var N=u1R2(inc?O*(1+p/100):O*(1-p/100)); var diff=u1R2(Math.abs(N-O));
  if(mode===1){
    var wrongBase=u1R2(diff/N*100);
    var ds=u1Pick3(p,[
      {v:wrongBase, fb:"That divides the change by the new price. Percent change always divides by the original price."},
      {v:p+10, fb:"That adds 10 to the percent. Divide the change by the original price instead."},
      {v:100-p, fb:"That subtracts the percent from 100, which gives a share remaining, not the percent change."},
      {v:p/2, fb:"That halves the percent. Divide the full change by the original price."}
    ],0.9);
    var opts=ds.map(function(d){ return {t:fmt(d.v)+"%", fb:d.fb}; });
    var _bo0=balOpts({t:fmt(p)+"%", fb:"Yes: the change of "+cx.fmtC(diff)+" divided by the original "+cx.fmtC(O)+" gives "+fmt(p)+"%."}, opts); return mcq(cx.name+" changed from "+cx.fmtC(O)+" to "+cx.fmtC(N)+". What is the percent "+(inc?"increase":"decrease")+"?", _bo0[0], _bo0[1],
      "\\[ \\begin{aligned} \\text{Change} &= |"+fmtF(N,2)+" - "+fmtF(O,2)+"| = "+fmtF(diff,2)+" \\\\ \\text{Percent change} &= \\frac{"+fmtF(diff,2)+"}{"+fmtF(O,2)+"} \\times 100 = "+fmt(p)+"\\% \\end{aligned} \\] The answer is <b>"+fmt(p)+"% "+(inc?"increase":"decrease")+"</b>.",
      {mode:1,O:O,N:N});
  }
  var ans=N;
  var ds2=u1Pick3(ans,[
    {v:O+diff*2, fb:"That doubles the change. Apply the percent change once."},
    {v:inc?O-diff:O+diff, fb:"That moves the price in the wrong direction for a percent "+(inc?"increase":"decrease")+"."},
    {v:O+p, fb:"That adds the percent as dollars. A percent must be applied to the original price first."},
    {v:inc?u1R2(O*(1+p/100)+O*0.05):u1R2(O*(1-p/100)-O*0.05), fb:"That applies a different percent than the one given."}
  ],1.37);
  var opts2=ds2.map(function(d){ return {t:u1Dol(d.v), fb:d.fb}; });
  var _bo1=balOpts({t:u1Dol(ans), fb:"Yes: "+fmt(p)+"% of "+cx.fmtC(O)+" is "+cx.fmtC(diff)+", and the new amount follows from it."}, opts2); return mcq(cx.name+" was "+cx.fmtC(O)+". It then had a percent "+(inc?"increase":"decrease")+" of "+fmt(p)+"%. What is the new amount?", _bo1[0], _bo1[1],
    "\\[ \\begin{aligned} \\text{Change} &= "+fmt(p)+"\\% \\text{ of } "+fmtF(O,2)+" = "+fmtF(diff,2)+" \\\\ \\text{New amount} &= "+fmtF(O,2)+" "+(inc?"+":"-")+" "+fmtF(diff,2)+" = "+fmtF(ans,2)+" \\end{aligned} \\] The answer is <b>"+u1Dol(ans)+"</b>.",
    {mode:2,O:O,p:p,inc:inc?1:0});
}, ["Percent change is always measured against the original amount.", "Start by finding the size of the change, then compare it with the original amount."]);

E("u1-convert-rate", 1, ["1.6","1.5"], 2, "gen", function(){
  var curs=[
    {code:"USD", name:"US dollars", base:1.36},
    {code:"EUR", name:"euros", base:1.47},
    {code:"GBP", name:"British pounds", base:1.74}
  ];
  var cu=pick(curs);
  var mode=ri(1,2);
  var sell=u1R2(cu.base+ri(-5,5)/100); if(sell<=0.2) sell=cu.base;
  var purch=u1R2(sell-ri(4,9)/100); if(purch<=0) purch=u1R2(sell-0.05);
  if(mode===1){
    var amtCAD=pick([150,200,250,300,400,500,600,750,800,1000,1200]);
    var ansF=u1R2(amtCAD/sell);
    var ds=u1Pick3(ansF,[
      {v:u1R2(amtCAD/purch), fb:"That uses the purchasing rate. When the bank sells foreign currency to you, it uses the selling rate."},
      {v:u1R2(amtCAD*sell), fb:"That multiplies by the rate. To turn Canadian dollars into the foreign currency, divide by the rate."},
      {v:u1R2(amtCAD/purch*sell), fb:"That mixes the two posted rates together. Use only the selling rate for this exchange."}
    ],1.83);
    var optsA=ds.map(function(d){ return {t:fmtF(d.v,2)+" "+cu.code, fb:d.fb}; });
    return mcq("A bank posts: selling rate 1 "+cu.code+" = "+fmtF(sell,2)+" CAD, purchasing rate 1 "+cu.code+" = "+fmtF(purch,2)+" CAD. Before a trip, a traveller exchanges "+u1Dol(amtCAD)+" for "+cu.name+". How much foreign currency does the traveller receive?",
      {t:fmtF(ansF,2)+" "+cu.code, fb:"Yes: buying foreign currency uses the selling rate, and Canadian dollars are divided by that rate."}, optsA,
      "\\[ \\begin{aligned} \\text{Foreign currency} &= \\frac{\\text{Canadian dollars}}{\\text{selling rate}} = \\frac{"+fmtF(amtCAD,2)+"}{"+fmtF(sell,2)+"} \\\\ &= "+fmtF(ansF,2)+" \\text{ "+cu.code+"} \\end{aligned} \\] The answer is <b>"+fmtF(ansF,2)+" "+cu.code+"</b>.",
      {mode:1,cu:cu.code,sell:sell});
  }
  var amtFor=pick([80,100,120,150,200,250,300,400,500,600]);
  var ansC=u1R2(amtFor*purch);
  var dsB=u1Pick3(ansC,[
    {v:u1R2(amtFor*sell), fb:"That uses the selling rate. When the bank purchases foreign currency back, it uses the purchasing rate."},
    {v:u1R2(amtFor/purch), fb:"That divides by the rate. Foreign currency turns into Canadian dollars by multiplying by the rate."},
    {v:u1R2(amtFor/purch*2), fb:"That applies the rate twice in the wrong way. Multiply the foreign amount by the rate once."}
  ],1.83);
  var optsB=dsB.map(function(d){ return {t:u1Dol(d.v), fb:d.fb}; });
  return mcq("A bank posts: selling rate 1 "+cu.code+" = "+fmtF(sell,2)+" CAD, purchasing rate 1 "+cu.code+" = "+fmtF(purch,2)+" CAD. After a trip, a traveller exchanges "+fmt(amtFor)+" "+cu.code+" back into Canadian dollars. How much does the traveller receive?",
    {t:u1Dol(ansC), fb:"Yes: selling foreign currency back uses the purchasing rate, and the foreign amount is multiplied by that rate."}, optsB,
    "\\[ \\begin{aligned} \\text{Canadian dollars} &= \\text{foreign amount} \\times \\text{purchasing rate} \\\\ &= "+fmt(amtFor)+" \\times "+fmtF(purch,2)+" = "+fmtF(ansC,2)+" \\end{aligned} \\] The answer is <b>"+u1Dol(ansC)+"</b>.",
    {mode:2,cu:cu.code,purch:purch});
}, ["Decide which rate applies first, then decide whether to multiply or divide.", "Start by asking whether the bank is selling foreign currency or purchasing it in this exchange."]);

E("u1-systems-origins", 1, ["3.1","3.8","3.9"], 2, "var", varset([
  function(){ return mcq("Why is the SI system described as a base ten system?",
    {t:"Each larger or smaller unit differs from the next by a power of ten, so converting means moving the decimal place.", fb:"Yes: SI unit sizes step by tens, hundreds and thousands."},
    [{t:"It has exactly ten units in total for all measurements, and those ten units cover every kind of measure.", fb:"SI has many units: the base ten idea is about the size steps, not a count of units."},
     {t:"It was designed in the year 1910 by ten countries working together, and it is named for the ten countries involved.", fb:"The date and the count of countries are not the reason for the name base ten."},
     {t:"Every SI measurement must be written with ten digits, no matter what is being measured or how large it is.", fb:"Measurements can be short: the size steps between units are what follow powers of ten."}],
    "In SI, neighbouring units differ by powers of ten (10, 100, 1000 and their fractions), so conversions move the decimal place. The answer is <b>unit sizes step by powers of ten</b>.", {}); },
  function(){ return mcq("How was the SI system developed?",
    {t:"It was created in France as a standard system built on the metre, designed so units would relate to each other by powers of ten.", fb:"Yes: SI grew out of the metric system created in France in the 1790s."},
    [{t:"It grew slowly from body measures such as thumbs, feet and arm spans over many centuries, changing gradually with everyday use over time.", fb:"That describes the older imperial measures: SI was designed deliberately as a standard."},
     {t:"It was copied from the system used in the United States in 1976 and then adopted, mostly unchanged, by country after country.", fb:"The United States uses imperial-style customary units: SI came from France much earlier."},
     {t:"It was set by one king who declared his own foot as the standard unit for every measure used anywhere in his kingdom.", fb:"A ruler's body set some old measures: SI was built on the metre instead."}],
    "SI was developed in France as a planned standard system based on the metre, with units related by powers of ten. The answer is <b>created in France as a standard system built on the metre</b>.", {}); },
  function(){ return mcq("How was the imperial system developed?",
    {t:"It grew over centuries in Britain from traditional measures, many based on the human body and everyday objects, and was later written into law.", fb:"Yes: measures like the inch, foot and yard began as traditional and body based measures."},
    [{t:"It was designed in France in the 1790s as a brand new system, made deliberately so that all of its units would step by powers of ten.", fb:"That describes the SI (metric) system, not imperial."},
     {t:"It was invented by scientists working together in a laboratory in the 1960s, and it spread quickly from there across the whole world.", fb:"Imperial measures are far older and grew from everyday practice."},
     {t:"It was created so that every unit would be exactly ten times the next one, in both directions, so that converting between units would always be simple.", fb:"Imperial steps are irregular (12 inches in a foot, 3 feet in a yard), not tens."}],
    "Imperial measures developed gradually in Britain from body based and traditional measures before being standardized in law. The answer is <b>it grew from traditional and body based measures in Britain</b>.", {}); },
  function(){ return mcq("Which statement correctly compares the American (US) gallon and the British (imperial) gallon?",
    {t:"The imperial gallon is larger: it is about 4.55 litres, while the US gallon is about 3.79 litres.", fb:"Yes: an imperial gallon holds roughly three quarters of a litre more."},
    [{t:"The US gallon is larger: it is about 4.55 litres, while the imperial gallon is about 3.79 litres.", fb:"That swaps the two sizes: the imperial gallon is the larger one."},
     {t:"Both gallons are exactly the same size, at about 4 litres each, in both countries.", fb:"They differ by about 0.76 litres, which matters when fuel or liquids are measured."},
     {t:"The imperial gallon is exactly twice the size of the US gallon, litre for litre.", fb:"The imperial gallon is larger, but only by about a fifth, not double."}],
    "An imperial gallon is about 4.55 L and a US gallon is about 3.79 L, so the imperial gallon is larger. The answer is <b>the imperial gallon is larger, about 4.55 L versus 3.79 L</b>.", {}); },
  function(){ return mcq("A Canadian shipping clerk reads that a load is 1 ton in the United States and 1 ton in Britain. Which statement is correct?",
    {t:"The British (long) ton is heavier at 2240 pounds, while the American (short) ton is 2000 pounds.", fb:"Yes: the two tons differ by 240 pounds."},
    [{t:"The American (short) ton is heavier at 2240 pounds, while the British (long) ton is 2000 pounds.", fb:"That swaps the two: long ton 2240 lb is British, short ton 2000 lb is American."},
     {t:"Both tons are exactly 2000 pounds each, so the two loads are exactly equal.", fb:"Only the US short ton is 2000 lb: the British long ton is 2240 lb."},
     {t:"A ton in both countries means exactly 1000 kilograms, the same as a metric tonne.", fb:"1000 kg is a metric tonne, a different unit from either ton described here."}],
    "US short ton = 2000 lb. British long ton = 2240 lb. The answer is <b>the British long ton is heavier, 2240 lb versus 2000 lb</b>.", {}); },
  function(){ return mcq("Which statement correctly compares American and British imperial measures for a bushel, a unit once used for grain?",
    {t:"The imperial bushel is slightly larger than the US bushel, so the same count of bushels holds more grain in imperial measure.", fb:"Yes: the imperial bushel is about 36.4 litres and the US bushel is about 35.2 litres."},
    [{t:"The US bushel is much larger, holding about twice the imperial bushel by volume, so the same harvest is counted in far fewer bushels.", fb:"The imperial bushel is slightly larger, and the difference is small, not double."},
     {t:"A bushel is a unit of mass in both systems, equal to exactly 50 pounds of grain, the same weight in either country.", fb:"A bushel measures volume (grain capacity), not a fixed mass."},
     {t:"Both bushels are identical in size because all imperial units match their US versions exactly, the same in every case.", fb:"Several units differ between the two systems, including gallons, bushels and tons."}],
    "Imperial bushel is about 36.4 L and US bushel is about 35.2 L, so the imperial one is slightly larger. The answer is <b>the imperial bushel is slightly larger</b>.", {}); }
]), ["Sort the facts by system first: planned base ten SI versus traditional imperial, then American versus British versions.", "Start by asking which system, or which country's version, each fact belongs to."]);

E("u1-decimals-fractions-why", 1, ["3.4","3.11"], 2, "var", varset([
  function(){ return mcq("Why are measurements in the SI system usually written with decimals, such as 1.75 m?",
    {t:"SI units step by powers of ten, so a part of a larger unit is naturally written as a decimal of that unit.", fb:"Yes: tenths, hundredths and thousandths line up with the SI unit steps."},
    [{t:"Decimals are used because SI rulers have no marks at all between whole units on their edges.", fb:"SI rulers have fine marks: decimals come from the power of ten structure."},
     {t:"Decimals are used because fractions are banned in Canadian schools and in all SI countries.", fb:"Fractions are used often: SI structure is what favours decimals."},
     {t:"Decimals are used because SI numbers must always have two decimal places, in every subject and at every level.", fb:"SI values can have any number of decimal places: the point is the base ten steps."}],
    "Because SI units grow and shrink by powers of ten, parts of a unit fit the decimal system directly. The answer is <b>SI steps by powers of ten, so parts of a unit are decimals</b>.", {}); },
  function(){ return mcq("A length is measured as 2.375 m. A student rewrites it as 237.5 cm. Which statement explains why this rewriting is simple in SI?",
    {t:"Centimetres are hundredths of a metre, so converting only moves the decimal place two steps.", fb:"Yes: 1 m = 100 cm, a power of ten, so the digits stay the same."},
    [{t:"The rewriting is simple because metres and centimetres are exactly the same size of unit.", fb:"They differ by a factor of 100: the digits shift because 100 is a power of ten."},
     {t:"The rewriting works because 2.375 was measured with a special ruler made only for that one length.", fb:"Any SI length converts this way: no special tool is involved."},
     {t:"The rewriting works because centimetres are an imperial unit used in Britain.", fb:"Centimetres are an SI unit: that is why the power of ten step applies."}],
    "\\[ 2.375 \\text{ m} \\times 100 = 237.5 \\text{ cm} \\] Multiplying by 100 only moves the decimal place. The answer is <b>centimetres are hundredths of a metre, so only the decimal place moves</b>.", {}); },
  function(){ return mcq("Why are measurements in the imperial system often written with fractions, such as \\(2\\frac{3}{4}\\) inches?",
    {t:"Imperial units divide into halves, quarters and smaller equal parts, and tools like tape measures are marked in those fractions.", fb:"Yes: an inch is commonly split into halves, quarters, eighths and sixteenths."},
    [{t:"Fractions are used because imperial units step by powers of ten, just like the units of the SI system do everywhere.", fb:"Powers of ten describe SI: imperial steps are 12, 3, 16 and other irregular numbers."},
     {t:"Fractions are used because decimal numbers had not been invented yet anywhere in the world at that time in history.", fb:"Decimals existed while imperial measures were in use: the fraction habit comes from how the units divide."},
     {t:"Fractions are used because inches cannot be measured accurately in any other way, so tapes have always been marked in fractions.", fb:"Inches can be measured finely: they are marked in fractions such as sixteenths."}],
    "Imperial units are traditionally divided into halves and quarters, and measuring tools are marked that way, so fractions are the natural form. The answer is <b>imperial units divide into halves and quarters, and tools are marked in fractions</b>.", {}); },
  function(){ return mcq("A carpenter reads a tape measure mark halfway between \\(\\frac{1}{2}\\) inch and \\(\\frac{3}{4}\\) inch. Which statement fits imperial measuring practice?",
    {t:"The mark is \\(\\frac{5}{8}\\) inch, found by working with the fraction divisions marked on the tape.", fb:"Yes: eighths sit between quarters on an imperial tape, and the middle of 1/2 and 3/4 is 5/8."},
    [{t:"The mark is 0.625 cm, read directly as a decimal of a centimetre on the tape's metric edge.", fb:"The tape is in inches: 5/8 inch is the reading, and the unit stays inches."},
     {t:"The mark cannot be named at all, because tape measures only ever show whole inches.", fb:"Imperial tapes are marked in fractions of an inch, including eighths."},
     {t:"The mark is \\(\\frac{2}{3}\\) inch, found by averaging the denominators of the neighbouring marks.", fb:"Averaging denominators is not how fractions add: the midpoint of 1/2 and 3/4 is 5/8."}],
    "Halfway between \\(\\frac{4}{8}\\) and \\(\\frac{6}{8}\\) is \\(\\frac{5}{8}\\). The answer is <b>\\(\\frac{5}{8}\\) inch</b>.", {}); },
  function(){ return mcq("A recipe written for imperial measures calls for \\(\\frac{3}{4}\\) cup, while a metric recipe calls for 180 mL. Which statement best explains the different forms?",
    {t:"Imperial amounts are traditionally built from repeated halving (halves, quarters), while SI amounts use base ten units that suit decimal numbers.", fb:"Yes: each system writes amounts in the form its unit divisions favour."},
    [{t:"The imperial recipe is simply older, and old recipes could not use numbers above one half because such numbers had not been invented yet anywhere.", fb:"Old recipes used many amounts: the fraction form comes from halving divisions."},
     {t:"The metric recipe uses millilitres only because cups were outlawed in Canada, and cooks were forced to change all their recipes overnight.", fb:"Cups are still used in Canada: millilitres are simply the SI unit."},
     {t:"The two forms are equal because 3/4 always means 180 of any unit, and a fraction of one unit is the same amount in any other unit too.", fb:"A fraction of a cup and a number of millilitres are different kinds of amounts."}],
    "Imperial measures divide by halving, which suits fractions; SI measures divide by tens, which suits decimals and prefixed units like millilitres. The answer is <b>halving divisions suit fractions, base ten divisions suit decimals</b>.", {}); },
  function(){ return mcq("Which example best shows why decimals suit SI measuring?",
    {t:"A mass of 0.5 kg, 1.5 kg and 2.25 kg can be compared and added directly because the decimal parts are tenths and hundredths of a kilogram.", fb:"Yes: decimal parts line up by place value, which matches SI base ten steps."},
    [{t:"A length of \\(1\\frac{7}{16}\\) inches shows decimals at work on a tape measure, because the fraction part is really a decimal in disguise on any tape measure.", fb:"That is a fraction on an imperial tape, not a decimal in SI."},
     {t:"A volume of 3 gallons shows decimals at work because gallons divide evenly by ten, just like litres do in the SI system.", fb:"Gallons do not divide by ten, and 3 gallons shows no decimal at all."},
     {t:"A temperature of 72 degrees Fahrenheit shows decimals in SI, because Fahrenheit is an SI temperature scale used worldwide.", fb:"Fahrenheit is imperial, and the value shown has no decimal part."}],
    "Decimals line up by place value (tenths, hundredths), matching how SI units step by tens. The answer is <b>decimal masses in kilograms that compare and add by place value</b>.", {}); }
]), ["Match the number form to the way the system's units divide.", "Start by asking: does this system split units by tens or by halving?"]);

E("u1-temp-convert", 1, ["3.6","3.13"], 2, "gen", function(){
  var toF=Math.random()<0.5;
  function r1(x){ return Math.round(x*10)/10; }
  function candObjs(ans, arr){ var out=[]; var used={}; used[fmt(ans)]=1; for(var i=0;i<arr.length&&out.length<3;i++){ var v=arr[i].v; var g=0; while(used[fmt(v)]&&g++<80){ v=r1(v+1); } if(!used[fmt(v)]){ used[fmt(v)]=1; out.push({t:fmt(v), fb:arr[i].fb}); } } return out; }
  if(toF){
    var C=ri(-25,42); var F=r1(C*9/5+32);
    var _bo0=balOpts({t:fmt(F), fb:"Yes: multiply by 9/5 and then add 32."}, candObjs(F,[
        {v:C+32, fb:"That adds 32 but leaves out the 9/5 scaling step."},
        {v:r1(C*9/5), fb:"That scales by 9/5 but leaves out adding 32."},
        {v:r1(C*5/9+32), fb:"That uses 5/9, the fraction for the reverse direction."},
        {v:2*C+30, fb:"That is a rough doubling estimate, not the conversion formula result."}
      ])); var q=mcq("The temperature outside is "+C+" degrees Celsius. Convert this temperature to degrees Fahrenheit.", _bo0[0], _bo0[1],
      "\\[ \\begin{aligned} F &= \\frac{9}{5}C + 32 \\\\ &= \\frac{9}{5}("+C+") + 32 \\\\ &= "+fmt(F)+" \\end{aligned} \\] The answer is <b>"+fmt(F)+" degrees Fahrenheit</b>.",
      {dir:"CtoF",C:C});
    q.figure=u1Thermo(C,true);
    return q;
  }
  var F2=ri(-13,108); var C2=r1((F2-32)*5/9);
  var _bo1=balOpts({t:fmt(C2), fb:"Yes: subtract 32 and then multiply by 5/9."}, candObjs(C2,[
      {v:F2-32, fb:"That subtracts 32 but leaves out the 5/9 scaling step."},
      {v:r1(F2*5/9), fb:"That scales first: the formula subtracts 32 before multiplying by 5/9."},
      {v:r1((F2-32)*9/5), fb:"That uses 9/5, the fraction for the reverse direction."},
      {v:r1((F2-30)/2), fb:"That is a rough halving estimate, not the conversion formula result."}
    ])); var q2=mcq("A weather report from the United States gives a temperature of "+F2+" degrees Fahrenheit. Convert this temperature to degrees Celsius, to one decimal place.", _bo1[0], _bo1[1],
    "\\[ \\begin{aligned} C &= \\frac{5}{9}(F - 32) \\\\ &= \\frac{5}{9}("+F2+" - 32) \\\\ &= "+fmt(C2)+" \\end{aligned} \\] The answer is <b>"+fmt(C2)+" degrees Celsius</b>.",
    {dir:"FtoC",F:F2});
  q2.figure=u1Thermo(F2,false);
  return q2;
}, ["Use the temperature formula for the direction asked, in the right order of steps.", "Start by writing the formula, then substitute the given temperature."]);

E("u1-length-convert", 1, ["3.6","3.13"], 2, "gen", function(){
  var mode=ri(1,4);
  function numOpts(ans, cands, dec, suffix){
    var used={}; used[fmtF(ans,dec)]=1; var out=[];
    for(var i=0;i<cands.length&&out.length<3;i++){ var v=cands[i].v; var g=0; while(used[fmtF(v,dec)]&&g++<80){ v=Math.round((v+Math.pow(10,-dec))*Math.pow(10,dec))/Math.pow(10,dec); } if(!used[fmtF(v,dec)]&&v>0){ used[fmtF(v,dec)]=1; out.push({t:fmtF(v,dec)+suffix, fb:cands[i].fb}); } }
    return out;
  }
  if(mode===1||mode===2){
    var inches=pick([2,3,4,5,6,7,8,9,10,11,12,14,15,16,18,20,22,24,26,28,30,36]); var cm=u1R2(inches*2.54);
    if(mode===1){
      var q=mcq("A shelf board is "+inches+" inches long. Convert this length to centimetres, using 1 inch = 2.54 cm.",
        {t:fmtF(cm,2), fb:"Yes: multiply inches by 2.54 to get centimetres."},
        numOpts(cm,[
          {v:inches/2.54, fb:"That divides by 2.54. Centimetres are smaller units, so the count grows: multiply."},
          {v:inches*2.5, fb:"That uses the approximation 2.5. This question gives the exact rate 2.54."},
          {v:inches+2.54, fb:"That adds the rate. A conversion multiplies the length by the rate."}
        ],2,""),
        "\\[ \\begin{aligned} \\text{Length} &= "+inches+" \\times 2.54 \\\\ &= "+fmtF(cm,2)+" \\text{ cm} \\end{aligned} \\] The answer is <b>"+fmtF(cm,2)+" cm</b>.",
        {mode:1,inches:inches});
      q.figure=u1Bar(inches,"inches",32);
      return q;
    }
    var q2=mcq("A ribbon is "+fmtF(cm,2)+" cm long. Convert this length to inches, using 1 inch = 2.54 cm.",
      {t:fmtF(inches,2), fb:"Yes: divide centimetres by 2.54 to get inches."},
      numOpts(inches,[
        {v:cm*2.54, fb:"That multiplies by 2.54. Inches are larger units, so the count shrinks: divide."},
        {v:cm/2.5, fb:"That uses the approximation 2.5. This question gives the exact rate 2.54."},
        {v:cm-2.54, fb:"That subtracts the rate. A conversion divides the length by the rate here."}
      ],2,""),
      "\\[ \\begin{aligned} \\text{Length} &= "+fmtF(cm,2)+" \\div 2.54 \\\\ &= "+fmt(inches)+" \\text{ inches} \\end{aligned} \\] The answer is <b>"+fmt(inches)+" inches</b>.",
      {mode:2,cm:cm});
    q2.figure=u1Bar(cm,"cm",80);
    return q2;
  }
  if(mode===3){
    var miles=pick([5,10,15,20,25,30,35,40,45,50,55,60,70,80,90,100]); var km=u1R2(miles*1.609);
    var q3=mcq("A road trip leg in the United States is "+miles+" miles. Convert this distance to kilometres, using 1 mile = 1.609 km. Give the answer to one decimal place.",
      {t:fmtF(km,1), fb:"Yes: multiply miles by 1.609 to get kilometres."},
      numOpts(km,[
        {v:miles/1.609, fb:"That divides by 1.609. Kilometres are smaller units, so the count grows: multiply."},
        {v:miles*1.6, fb:"That uses a rounded rate. This question gives the rate 1.609, which changes the one decimal answer."},
        {v:miles+1.609, fb:"That adds the rate. A conversion multiplies the distance by the rate."}
      ],1,""),
      "\\[ \\begin{aligned} \\text{Distance} &= "+miles+" \\times 1.609 \\\\ &= "+fmtF(km,1)+" \\text{ km} \\end{aligned} \\] The answer is <b>"+fmtF(km,1)+" km</b>.",
      {mode:3,miles:miles});
    q3.figure=u1Bar(miles,"miles",110);
    return q3;
  }
  var km2=pick([8,16,24,32,40,48,56,64,72,80,88,96,104,120,136,160]); var mi=u1R2(km2/1.609);
  var q4=mcq("A cycling route in Newfoundland is "+km2+" km long. Convert this distance to miles, using 1 mile = 1.609 km. Give the answer to one decimal place.",
    {t:fmtF(mi,1), fb:"Yes: divide kilometres by 1.609 to get miles."},
    numOpts(mi,[
      {v:km2*1.609, fb:"That multiplies by 1.609. Miles are larger units, so the count shrinks: divide."},
      {v:km2/1.6, fb:"That uses a rounded rate. This question gives the rate 1.609, which changes the one decimal answer."},
      {v:km2-1.609, fb:"That subtracts the rate. A conversion divides the distance by the rate here."}
    ],1,""),
    "\\[ \\begin{aligned} \\text{Distance} &= "+km2+" \\div 1.609 \\\\ &= "+fmtF(mi,1)+" \\text{ miles} \\end{aligned} \\] The answer is <b>"+fmtF(mi,1)+" miles</b>.",
    {mode:4,km:km2});
  q4.figure=u1Bar(km2,"km",170);
  return q4;
}, ["Set up a proportion with the given rate, and check whether the count should grow or shrink.", "Start by writing the given rate as a multiplication or division step."]);

E("u1-best-buy-judgement", 1, ["1.3","1.2"], 2, "var", varset([
  function(){ return mcq("A single student needs 500 g of cheddar for the week. A 500 g block costs $6.50. A 2 kg block has a lower unit price but costs $22.00, and cheese often spoils before this student can finish a large block. Which choice is the best buy for this student, and why?",
    {t:"The 500 g block, because paying for cheese that spoils wastes money even at a lower unit price.", fb:"Yes: best buy considers quantity needed and waste, not unit price alone."},
    [{t:"The 2 kg block, because the lower unit price always makes it the best buy, whatever the household.", fb:"Unit price is only one factor: spoiled cheese has no value to the buyer."},
     {t:"The 2 kg block, because a larger package is always fresher than a smaller one on the shelf.", fb:"Package size does not guarantee freshness, and unused cheese may spoil."},
     {t:"Both are equal buys, because cheese is cheese and the block size makes no difference at all.", fb:"The total cost and the amount actually used differ, so the buys are not equal here."}],
    "Best buy weighs cost with quantity needed and waste. Cheese that spoils is money lost, so the smaller block fits this student's need. The answer is <b>the 500 g block, because unused bulk cheese would spoil</b>.", {}); },
  function(){ return mcq("Two pairs of work boots have similar prices per pair. Pair A is a basic brand that usually lasts one season on a work site. Pair B costs a little more and usually lasts three seasons. Which statement gives the best buying advice?",
    {t:"Pair B can be the best buy because lasting three seasons lowers the cost per season, even at a higher price.", fb:"Yes: quality and how long an item lasts are part of best buy."},
    [{t:"Pair A is the best buy because it has the lower shelf price, full stop, and no other fact about the boots matters.", fb:"Shelf price alone ignores how soon the boots must be replaced."},
     {t:"Neither pair can be judged at all, because boots are not sold by weight like groceries are.", fb:"Best buy judgement uses quality and lifespan for items like boots, not only unit price."},
     {t:"Pair B is the best buy only if it also comes in more colours and styles than Pair A does.", fb:"Colour choice does not lower the cost per season: lifespan does."}],
    "Cost per season matters: a longer lasting pair can cost less over time despite a higher price. The answer is <b>Pair B, because its longer life lowers the cost per season</b>.", {}); },
  function(){ return mcq("A family uses about 4 rolls of paper towel a month and has very little storage space. A 12 roll pack has the lowest unit price per roll. A 4 roll pack costs more per roll. Which advice is soundest?",
    {t:"The 4 roll pack may suit this family better: it matches monthly use and the storage they actually have.", fb:"Yes: quantity needed and storage space are real best buy factors."},
    [{t:"The 12 roll pack, because the lowest unit price settles every buying decision a family makes at the store.", fb:"Unit price matters, but unusable storage and tied up cash also count."},
     {t:"The 12 roll pack, because paper towel expires within a month and must be used up quickly.", fb:"Paper towel keeps well: the issue here is use rate and storage, not expiry."},
     {t:"Buy neither pack until prices drop further, even if that means waiting weeks for a sale.", fb:"Waiting is not a comparison of the two buys on offer for a needed item."}],
    "Best buy includes how much is needed and whether it can be stored. The answer is <b>the 4 roll pack can be the better fit for this family's use and storage</b>.", {}); },
  function(){ return mcq("Deli turkey is priced at $2.40 per 100 g at one counter and $24.00 per kilogram at another. A shopper says the first counter is far cheaper because 2.40 is much smaller than 24.00. Which response is correct?",
    {t:"The two prices are equal per kilogram, so the shopper should choose by freshness and quality instead of price.", fb:"Yes: $2.40 per 100 g times 10 is $24.00 per kilogram, exactly the second price."},
    [{t:"The shopper is right: the first counter charges about one tenth as much as the second counter does.", fb:"The pricing units differ: per 100 g must be scaled by 10 before comparing with per kilogram."},
     {t:"The second counter is cheaper, because kilogram prices are always lower than prices charged per gram anywhere.", fb:"Per kilogram, both prices are $24.00 here: neither is cheaper on price."},
     {t:"The prices cannot be compared at all because the units differ completely between the two counters.", fb:"They can be compared by converting one: $2.40 per 100 g equals $24.00 per kilogram."}],
    "\\[ 2.40 \\times 10 = 24.00 \\] The per 100 g price converts to $24.00 per kilogram, matching the other counter. The answer is <b>the prices are equal, so choose by quality factors</b>.", {}); },
  function(){ return mcq("A store advertises buy 2 get 1 free on fresh berries. A shopper who lives alone usually eats one pack before berries go soft. Which judgement is best?",
    {t:"The deal only saves money if the extra packs get eaten: for this shopper, one pack at regular price may be the better buy.", fb:"Yes: a promotion has no value when the free items spoil unused."},
    [{t:"The deal is automatically the best buy because one pack is free, and a free pack is always the best buy for every shopper.", fb:"Free items that spoil save nothing: the shopper still pays for two packs."},
     {t:"The shopper should take the deal and simply store the extra berries for a month in the freezer at home until needed.", fb:"Fresh berries keep only a short time, so long storage is unrealistic."},
     {t:"Promotions never affect what the best buy is, so a shopper should always ignore them completely when choosing.", fb:"Promotions do change cost when the items are actually used: use decides it here."}],
    "A promotion helps only when the extra quantity gets used. Spoiled free items add no value. The answer is <b>the deal may not be the best buy for this shopper</b>.", {}); },
  function(){ return mcq("A hardware store sells a drill in two kits. Kit A has the drill only. Kit B costs $25 more and adds a second battery the buyer will use daily at work, plus a case. Which statement best applies best buy thinking?",
    {t:"Kit B can be the best buy because the added items have real use and value for this buyer, not just a higher price.", fb:"Yes: best buy weighs what the extra money actually buys for the buyer's needs."},
    [{t:"Kit A is always the best buy because it has the lowest price, and the lowest price always wins in the end for any buyer.", fb:"Lowest price ignores the value of the battery and case to a daily user."},
     {t:"Kit B is the best buy only because it costs more, and a higher price always means higher quality.", fb:"Higher price alone proves nothing: the value here is the useful extras."},
     {t:"The kits cannot be compared at all because they contain completely different items inside each box.", fb:"They can be compared by judging the worth of the extras for this buyer."}],
    "Best buy compares total value for the buyer's needs, including useful extras and quality. The answer is <b>Kit B can be the best buy for a buyer who will use the extras daily</b>.", {}); }
]), ["Best buy means best value for the buyer's situation, not just the lowest number.", "Start by listing what else matters besides price in the scenario: need, quality, waste and storage."]);

E("u1-estimate-abroad", 1, ["1.8","1.7"], 2, "gen", function(){
  var curs=[
    {code:"EUR", sym:"euros", rate:1.47, round:1.50},
    {code:"USD", sym:"US dollars", rate:1.36, round:1.40},
    {code:"GBP", sym:"British pounds", rate:1.74, round:1.75},
    {code:"EUR", sym:"euros", rate:1.52, round:1.50},
    {code:"USD", sym:"US dollars", rate:1.31, round:1.30}
  ];
  var cu=pick(curs);
  var shops=["A jacket costs","A train ticket costs","A hotel night costs","A guided tour costs","A pair of shoes costs","A meal for two costs"];
  var shop=pick(shops); var amt=pick([24,30,35,40,45,50,60,65,80,90,120,150]);
  var est=u1R2(amt*cu.round); var exact=u1R2(amt*cu.rate);
  var ds=u1Pick3(est,[
    {v:exact, fb:"That uses the posted rate exactly. The quick travel method rounds the rate first, then multiplies."},
    {v:u1R2(amt/cu.round), fb:"That divides by the rounded rate. Foreign prices turn into Canadian dollars by multiplying."},
    {v:u1R2(amt*(cu.round+0.25)), fb:"That rounds the rate up too far. The method rounds to the friendly rate stated in the question."}
  ],1.19);
  var opts=ds.map(function(d){ return {t:"About "+u1Dol(d.v), fb:d.fb}; });
  return mcq(shop+" "+amt+" "+cu.code+" while travelling. The posted rate is 1 "+cu.code+" = "+fmtF(cu.rate,2)+" CAD. Using the quick estimating method, round the rate to "+fmtF(cu.round,2)+" CAD and then multiply. What is the estimated cost in Canadian dollars? Estimating quickly like this helps a traveller keep track of spending while shopping abroad.",
    {t:"About "+u1Dol(est), fb:"Yes: rounding the rate to "+fmtF(cu.round,2)+" and multiplying gives the quick estimate."}, opts,
    "\\[ \\begin{aligned} \\text{Estimated cost} &\\approx "+amt+" \\times "+fmtF(cu.round,2)+" \\\\ &= "+fmtF(est,2)+" \\end{aligned} \\] The answer is <b>about "+u1Dol(est)+"</b>.",
    {cu:cu.code,amt:amt});
}, ["Round the exchange rate to a friendly number first, then multiply.", "Start by rounding the posted rate as directed, before any multiplying."]);

E("u1-cr-percent-change", 1, ["1.4"], 2, "gen", function(){
  var ctxs=["The price of a cord of firewood","The monthly rent on a two bedroom apartment","The price of a snowmobile jacket","A weekly paycheque amount","The price of a litre of home heating oil, in dollars","The cost of a semester parking pass"];
  var cx=pick(ctxs);
  var O=pick([80,100,120,150,160,200,240,250,300,320,400,500,600,750,800,1000]);
  var p=pick([10,15,20,25,30,40,50,60]); var inc=Math.random()<0.5;
  var N=u1R2(inc?O*(1+p/100):O*(1-p/100)); var diff=u1R2(Math.abs(N-O));
  return numq(cx+" changed from "+u1Dol(O)+" to "+u1Dol(N)+". Find the percent "+(inc?"increase":"decrease")+". Show your work.",
    p, 0.6,
    "\\[ \\begin{aligned} \\text{Change} &= |"+fmtF(N,2)+" - "+fmtF(O,2)+"| = "+fmtF(diff,2)+" \\\\ \\text{Percent change} &= \\frac{"+fmtF(diff,2)+"}{"+fmtF(O,2)+"} \\times 100 = "+fmt(p)+"\\% \\end{aligned} \\] The answer is <b>"+fmt(p)+"%</b>.",
    {O:O,N:N,inc:inc?1:0});
}, ["Percent change compares the change with the original amount.", "Start by finding the change, then divide it by the original amount."]);

E("u1-cr-currency-convert", 1, ["1.6","1.7"], 2, "gen", function(){
  var curs=[
    {code:"USD", name:"US dollars", base:1.36},
    {code:"EUR", name:"euros", base:1.48},
    {code:"GBP", name:"British pounds", base:1.73}
  ];
  var cu=pick(curs); var rate=u1R2(cu.base+ri(-6,6)/100); var mode=ri(1,2);
  if(mode===1){
    var amtCAD=pick([180,220,260,350,420,480,550,640,720,900,1100,1500]);
    var ans=u1R2(amtCAD/rate);
    return numq("The exchange rate is 1 "+cu.code+" = "+fmtF(rate,2)+" CAD. A traveller exchanges "+u1Dol(amtCAD)+" for "+cu.name+". How many "+cu.code+" does the traveller receive? Give the answer to the nearest cent of the foreign currency. Show your work using proportional reasoning.",
      ans, 0.02,
      "\\[ \\begin{aligned} \\frac{\\text{foreign}}{\\text{Canadian}} &= \\frac{1}{"+fmtF(rate,2)+"} \\\\ \\text{Foreign amount} &= \\frac{"+fmtF(amtCAD,2)+"}{"+fmtF(rate,2)+"} = "+fmtF(ans,2)+" \\end{aligned} \\] The answer is <b>"+fmtF(ans,2)+" "+cu.code+"</b>.",
      {mode:1,cu:cu.code,rate:rate});
  }
  var amtFor=pick([90,110,140,175,210,260,320,380,450,520,700]);
  var ans2=u1R2(amtFor*rate);
  return numq("The exchange rate is 1 "+cu.code+" = "+fmtF(rate,2)+" CAD. A traveller has "+fmt(amtFor)+" "+cu.code+" left after a trip and exchanges it back. How many Canadian dollars does the traveller receive? Show your work using proportional reasoning.",
    ans2, 0.02,
    "\\[ \\begin{aligned} \\frac{\\text{Canadian}}{\\text{foreign}} &= \\frac{"+fmtF(rate,2)+"}{1} \\\\ \\text{Canadian amount} &= "+fmt(amtFor)+" \\times "+fmtF(rate,2)+" = "+fmtF(ans2,2)+" \\end{aligned} \\] The answer is <b>"+u1Dol(ans2)+"</b>.",
    {mode:2,cu:cu.code,rate:rate});
}, ["Set up a proportion with the exchange rate, keeping the units matched.", "Start by writing the rate as a fraction with the currency you want on top."]);

E("u1-cr-estimate-total", 1, ["1.8"], 2, "gen", function(){
  var curs=[
    {code:"EUR", rate:1.47, round:1.50},
    {code:"USD", rate:1.36, round:1.40},
    {code:"GBP", rate:1.74, round:1.75},
    {code:"USD", rate:1.29, round:1.30}
  ];
  var cu=pick(curs);
  var scenes=[
    {items:"a museum ticket and a bus pass", parts:[12,8]},
    {items:"a lunch and a souvenir shirt", parts:[15,25]},
    {items:"a boat tour ticket and a snack", parts:[30,10]},
    {items:"a book and a train ticket", parts:[20,35]},
    {items:"a rental bike day pass and a dinner", parts:[25,45]},
    {items:"a gift and a taxi ride", parts:[40,15]},
    {items:"a ferry ticket and a coffee", parts:[18,6]},
    {items:"a hat and a postcard set", parts:[22,9]}
  ];
  var sc=pick(scenes);
  var mult=pick([1,2,3]); var a=sc.parts[0]*mult, b=sc.parts[1]*mult;
  var total=a+b; var ans=u1R2(total*cu.round);
  return numq("While travelling, a student plans to buy "+sc.items+", priced at "+a+" "+cu.code+" and "+b+" "+cu.code+". The posted rate is 1 "+cu.code+" = "+fmtF(cu.rate,2)+" CAD. Estimate the total cost in Canadian dollars by first adding the foreign prices, then rounding the rate to "+fmtF(cu.round,2)+" CAD and multiplying. A quick estimate like this helps the student judge whether the purchases fit a daily spending limit. Show your work.",
    ans, 0.02,
    "\\[ \\begin{aligned} \\text{Foreign total} &= "+a+" + "+b+" = "+total+" \\text{ "+cu.code+"} \\\\ \\text{Estimated cost} &\\approx "+total+" \\times "+fmtF(cu.round,2)+" = "+fmtF(ans,2)+" \\end{aligned} \\] The answer is <b>about "+u1Dol(ans)+"</b>.",
    {cu:cu.code,total:total});
}, ["Add the foreign prices first, then apply the rounded rate once.", "Start by finding the total in the foreign currency."]);

E("u1-cr-prefix-convert", 1, ["3.3","3.1"], 2, "gen", function(){
  var convs=[
    {from:"kilometres", to:"metres", factor:1000, base:"metre", vals:[1.5,2.4,3.75,4.2,5.6,7.25,8.4,12.5]},
    {from:"metres", to:"centimetres", factor:100, base:"metre", vals:[0.85,1.35,2.45,3.6,4.75,5.2,6.85,9.3]},
    {from:"centimetres", to:"metres", factor:0.01, base:"metre", vals:[45,85,130,175,240,365,480,625]},
    {from:"kilograms", to:"grams", factor:1000, base:"gram", vals:[0.75,1.25,2.5,3.4,4.65,5.8,7.2,9.05]},
    {from:"litres", to:"millilitres", factor:1000, base:"litre", vals:[0.5,1.25,1.75,2.4,3.6,4.25,5.5,7.8]},
    {from:"millimetres", to:"centimetres", factor:0.1, base:"centimetre", vals:[35,65,90,140,225,380,540,870]},
    {from:"metres", to:"millimetres", factor:1000, base:"metre", vals:[0.45,0.8,1.15,1.6,2.35,3.05,4.5,6.2]},
    {from:"grams", to:"kilograms", factor:0.001, base:"gram", vals:[450,750,1200,2350,3600,4800,6250,9000]}
  ];
  var cv=pick(convs); var v=pick(cv.vals); var ans=Math.round(v*cv.factor*1000)/1000;
  var power=cv.factor>=1?("10^{"+Math.round(Math.log10(cv.factor))+"}"):("10^{-"+Math.round(-Math.log10(cv.factor))+"}");
  var op=cv.factor>=1?"\\times":"\\div";
  var divisor=cv.factor>=1?cv.factor:Math.round(1/cv.factor);
  return numq("Convert "+fmt(v)+" "+cv.from+" to "+cv.to+". Give the answer as a number only, in "+cv.to+". Show your work using powers of ten.",
    ans, Math.max(0.011, Math.abs(ans)*0.001),
    "\\[ \\begin{aligned} \\text{Converted value} &= "+fmt(v)+" "+op+" "+fmt(divisor)+" \\\\ &= "+fmt(ans)+" \\end{aligned} \\] SI units step by powers of ten (here \\("+power+"\\), so the conversion only shifts the decimal place. The answer is <b>"+fmt(ans)+" "+cv.to+"</b>.",
    {from:cv.from,to:cv.to,v:v});
}, ["SI conversions multiply or divide by a power of ten.", "Start by finding how many powers of ten sit between the two units."]);

E("u1-cr-approx-si", 1, ["3.5"], 2, "gen", function(){
  var mode=ri(1,3);
  if(mode===1){
    var objs=["A television screen is","A door height is","A spool of ribbon is","A garden plot width is","A kayak length is","A countertop depth is"];
    var ob=pick(objs); var n=pick([12,18,24,30,36,42,48,54,60,72]); var ans=n*2.5;
    return numq(ob+" "+n+" inches. Using the approximation 1 inch is about 2.5 cm, find the approximate measure in centimetres. Show your work.",
      ans, Math.max(1, ans*0.03),
      "\\[ \\begin{aligned} \\text{Measure} &\\approx "+n+" \\times 2.5 \\\\ &= "+fmt(ans)+" \\text{ cm} \\end{aligned} \\] The answer is <b>about "+fmt(ans)+" cm</b>.",
      {mode:1,n:n});
  }
  if(mode===2){
    var n2=pick([4,6,8,10,12,16,20,24]); var ans2=n2*4;
    return numq("A vehicle's fuel tank size is listed as "+n2+" US gallons. Using the approximation 1 US gallon is about 4 litres, find the approximate measure in litres. Show your work.",
      ans2, Math.max(1, ans2*0.03),
      "\\[ \\begin{aligned} \\text{Measure} &\\approx "+n2+" \\times 4 \\\\ &= "+fmt(ans2)+" \\text{ L} \\end{aligned} \\] The answer is <b>about "+fmt(ans2)+" litres</b>.",
      {mode:2,n:n2});
  }
  var n3=pick([2,3,4,5,6,7,8,10]); var ans3=n3*30;
  return numq("A ceiling height is "+n3+" feet. Using the approximations 1 foot = 12 inches and 1 inch is about 2.5 cm, find the approximate measure in centimetres. Show your work.",
    ans3, Math.max(1, ans3*0.03),
    "\\[ \\begin{aligned} \\text{Inches} &= "+n3+" \\times 12 = "+(n3*12)+" \\\\ \\text{Measure} &\\approx "+(n3*12)+" \\times 2.5 = "+fmt(ans3)+" \\text{ cm} \\end{aligned} \\] The answer is <b>about "+fmt(ans3)+" cm</b>.",
    {mode:3,n:n3});
}, ["An approximate equivalent is enough here: use the approximation stated in the question.", "Start by multiplying the given measure by the approximation factor."]);

E("u1-cr-approx-imperial", 1, ["3.12"], 2, "gen", function(){
  var mode=ri(1,2);
  if(mode===1){
    var ctxs=["A cooler holds","A watering can holds","A car fuel tank holds","A storage bin holds","A cooking pot holds"];
    var cx=pick(ctxs); var L=pick([6,10,14,18,22,26,30,40,50,60,70,80]); var ans=L/4;
    return numq(cx+" "+L+" litres. Using the approximation 1 litre is about one quarter of a US gallon, find the approximate measure in US gallons. Show your work.",
      ans, Math.max(0.26, ans*0.04),
      "\\[ \\begin{aligned} \\text{Measure} &\\approx "+L+" \\times \\frac{1}{4} \\\\ &= "+fmt(ans)+" \\text{ gallons} \\end{aligned} \\] The answer is <b>about "+fmt(ans)+" US gallons</b>.",
      {mode:1,L:L});
  }
  var ctxs2=["A cutting board is","A photo frame is","A garden bed side is","A ribbon piece is","A shelf depth is"];
  var cx2=pick(ctxs2); var cm=pick([15,20,25,30,35,40,50,60,75,90,100]); var ans2=cm/2.5;
  return numq(cx2+" "+cm+" cm long. Using the approximation 1 inch is about 2.5 cm, find the approximate measure in inches. Show your work.",
    ans2, Math.max(0.26, ans2*0.04),
    "\\[ \\begin{aligned} \\text{Measure} &\\approx "+cm+" \\div 2.5 \\\\ &= "+fmt(ans2)+" \\text{ inches} \\end{aligned} \\] The answer is <b>about "+fmt(ans2)+" inches</b>.",
    {mode:2,cm:cm});
}, ["An approximate equivalent is enough here: use the approximation stated in the question.", "Start by deciding whether the count grows or shrinks, then apply the approximation."]);

E("u1-systems-travel", 1, ["3.2","3.10"], 3, "gen", function(){
  var mode=ri(1,2);
  var people=["A paramedic","A truck driver","A pharmacist","A carpenter","A weather observer","A ferry worker","A baker","A surveyor","A nurse","A mechanic"];
  var places=["in St. John's","in Corner Brook","in Texas","in Florida","in a Toronto hospital","on a US highway","in a London bakery","in Gander","in Maine","in a school science lab"];
  if(mode===1){
    var siUnits=[["kilometres","distance"],["centimetres","length"],["kilograms","mass"],["litres","volume"],["millilitres","volume"],["degrees Celsius","temperature"],["milligrams","mass"],["metres","length"]];
    var impUnits=[["miles","distance"],["inches","length"],["pounds","mass"],["gallons","volume"],["cups","volume"],["degrees Fahrenheit","temperature"],["ounces","mass"],["feet","length"]];
    var useImp=Math.random()<0.5; var pool=useImp?impUnits:siUnits; var un=pick(pool);
    var val=ri(2,480); var who=pick(people); var pl=pick(places);
    var sysName=useImp?"imperial":"SI";
    return mcq(who+" "+pl+" records a "+un[1]+" of "+val+" "+un[0]+". Which judgement about this measurement is correct?",
      {t:"It uses the "+sysName+" system, because "+un[0]+" belong to the "+sysName+" family of units.", fb:"Yes: "+un[0]+" are "+sysName+" units."},
      [{t:"It uses the "+(useImp?"SI":"imperial")+" system, because "+un[0]+" belong to that family of units.", fb:un[0]+" belong to the "+sysName+" family, not the other system."},
       {t:"It uses both systems at once, because "+un[0]+" belong to the two systems equally well.", fb:"A single unit belongs to one system: "+un[0]+" are "+sysName+"."},
       {t:"It uses neither system, because "+un[0]+" are in trade units only.", fb:"Workplace measures still use system units: "+un[0]+" are "+sysName+"."}],
      "The unit "+un[0]+" belongs to the "+sysName+" family. The answer is <b>the "+sysName+" system</b>.",
      {mode:1,unit:un[0]});
  }
  var tasks=[
    {task:"measuring a child's medicine dose", si:"millilitres", imp:["teaspoons of volume only","fluid ounces in large steps","gallons"]},
    {task:"posting a highway distance to the next town in Canada", si:"kilometres", imp:["miles","leagues","furlongs"]},
    {task:"recording a patient's mass at a Canadian clinic", si:"kilograms", imp:["stones only","pounds and ounces only","tons"]},
    {task:"reporting snowfall in a Canadian forecast", si:"centimetres", imp:["inches as the official unit","hands","yards only"]}
  ];
  var tk=pick(tasks);
  return mcq("For "+tk.task+", which unit is the SI choice?",
    {t:tk.si, fb:"Yes: "+tk.si+" is the SI unit suited to this task."},
    tk.imp.map(function(s){ return {t:s, fb:"That choice comes from imperial practice or older measures, not SI."}; }),
    "SI units for this task come from the metre, litre and kilogram families with prefixes. The answer is <b>"+tk.si+"</b>.",
    {mode:2,task:tk.task});
}, ["Judge the unit itself, then check it against the context it is used in.", "Start by naming the family each unit in the question belongs to."]);

E("u1-imperial-us-british", 1, ["3.8","3.9"], 3, "var", varset([
  function(){ return mcq("Two containers each hold 5 gallons of water, one measured in US gallons and one in imperial gallons. Using 1 US gallon is about 3.79 L and 1 imperial gallon is about 4.55 L, which container holds more, and by about how much?",
    {t:"The imperial gallon container, by about 3.8 litres.", fb:"Yes: 5 times 4.55 is 22.75 L and 5 times 3.79 is 18.95 L, a gap of about 3.8 L."},
    [{t:"The US gallon container, by about 3.8 litres.", fb:"That swaps the sizes: the imperial gallon is the larger unit, so its container holds more."},
     {t:"Both containers hold exactly the same amount.", fb:"The gallon sizes differ, so equal counts of gallons give different volumes."},
     {t:"The imperial gallon container, by about 7.6 litres.", fb:"That doubles the gap: the per gallon gap is about 0.76 L, times 5 is about 3.8 L."}],
    "\\[ \\begin{aligned} \\text{Imperial} &= 5 \\times 4.55 = 22.75 \\text{ L} \\\\ \\text{US} &= 5 \\times 3.79 = 18.95 \\text{ L} \\\\ \\text{Difference} &= 22.75 - 18.95 = 3.80 \\text{ L} \\end{aligned} \\] The answer is <b>the imperial gallon container, by about 3.8 litres</b>.", {}); },
  function(){ return mcq("Why do American and British imperial measures differ at all, when both came from Britain?",
    {t:"The United States kept the older British measures in use at independence, while Britain later redefined its units in 1824, creating the imperial versions.", fb:"Yes: the split happened because Britain changed its standards after the US had adopted the older ones."},
    [{t:"American units were designed from the SI system in Europe long ago, and then renamed when they were brought into use across the United States in 1776.", fb:"American customary units came from older British measures, not from SI."},
     {t:"Britain copied its measures directly from the United States in 1900, taking the American gallon, bushel and ton as its own standards for trade everywhere.", fb:"The direction runs the other way: the US kept older British units, then Britain redefined its own."},
     {t:"The two sets of units were always separate inventions, developed in complete isolation from each other, with no shared history between them at all.", fb:"They share British roots: the difference came from later redefinition in Britain."}],
    "US measures froze at the older British standards; Britain's 1824 redefinition created different imperial sizes for units like the gallon. The answer is <b>the US kept older British measures while Britain later redefined its units</b>.", {}); },
  function(){ return mcq("A British recipe uses 1 pint of milk. An American recipe uses 1 pint of milk. Using an imperial pint of 20 fluid ounces and a US pint of 16 fluid ounces, which recipe uses more milk?",
    {t:"The British recipe, because its pint holds 20 fluid ounces against 16 in the US pint.", fb:"Yes: the imperial pint is the larger measure here."},
    [{t:"The American recipe, because US measures are usually the larger ones in cases like this.", fb:"For pints the imperial measure is larger: 20 fluid ounces versus 16."},
     {t:"Both recipes use exactly the same amount, because a pint is a pint in any country.", fb:"Pints differ between the systems: 20 versus 16 fluid ounces."},
     {t:"The British recipe, because it uses twice as much milk as the American one does.", fb:"It uses more, but 20 against 16 is one quarter more, not double."}],
    "Imperial pint = 20 fl oz. US pint = 16 fl oz. The answer is <b>the British recipe, with the larger 20 fluid ounce pint</b>.", {}); },
  function(){ return mcq("One imperial fluid ounce is about 28.4 mL, while one US fluid ounce is about 29.6 mL. Which statement correctly handles this surprising fact?",
    {t:"The imperial fluid ounce is slightly smaller than the US fluid ounce, even though the imperial pint and gallon are larger, because an imperial pint holds 20 fluid ounces instead of 16.", fb:"Yes: more, smaller ounces fill the larger imperial pint."},
    [{t:"The imperial fluid ounce must be larger, because every imperial unit is larger than its US match, so the ounce must follow the same pattern as the pint and the gallon do in every single case.", fb:"The fluid ounce is the exception: the imperial one is slightly smaller, as the given volumes show."},
     {t:"The two fluid ounces are exactly equal in size, and the different millilitre values printed beside them must be a misprint in the chart, since one unit name means one size.", fb:"The values differ by about 1.2 mL: the units genuinely differ."},
     {t:"Fluid ounces are a measure of mass, not volume, so volumes in millilitres cannot compare the two fluid ounces, or either of them with pints and gallons, in any way.", fb:"Fluid ounces measure volume, so millilitre comparisons apply directly."}],
    "Imperial: 20 fl oz in a pint of about 568 mL gives about 28.4 mL each. US: 16 fl oz in a pint of about 473 mL gives about 29.6 mL each. The answer is <b>the imperial fluid ounce is slightly smaller</b>.", {}); },
  function(){ return mcq("A used truck ad in the United States lists a payload of 1 ton. A British manual lists a payload of 1 ton for a similar truck. A buyer assumes the payloads are equal. Which correction is right?",
    {t:"They are not equal: the British long ton is 2240 pounds and the US short ton is 2000 pounds, a difference of 240 pounds.", fb:"Yes: the British ton carries 240 pounds more."},
    [{t:"They are equal, because a ton is exactly 2000 pounds in both countries, so the two loads must weigh exactly the same after all.", fb:"Only the US short ton is 2000 pounds: the British long ton is 2240 pounds."},
     {t:"The US ton is the heavier one by far, by 240 pounds, because American tons are always the heavier tons.", fb:"That reverses the two: 2240 pounds is the British long ton."},
     {t:"Both tons are equal to exactly 1000 kilograms each, so the buyer is right that the two loads match exactly, pound for pound.", fb:"1000 kg is a metric tonne, which is neither ton in this question."}],
    "US short ton = 2000 lb. British long ton = 2240 lb. Difference = 240 lb. The answer is <b>the British ton is heavier by 240 pounds</b>.", {}); },
  function(){ return mcq("In the 1700s, Britain had several different gallons in use for wine, ale and grain. How does this history explain today's US and imperial gallons?",
    {t:"The US kept one of the older British gallons, and Britain's later single imperial gallon was defined larger, so the two countries ended with different sizes.", fb:"Yes: one froze in the US while Britain replaced its set with a new standard gallon."},
    [{t:"The United States invented its gallon entirely from scratch in 1776, with no British connection behind it, and Britain later copied the American gallon exactly.", fb:"The US gallon descends from an older British wine gallon."},
     {t:"Britain adopted the US gallon in 1824 and kept it completely unchanged ever since that year, which is why the two gallons still match exactly today.", fb:"Britain's 1824 gallon was a new, larger definition, not the US one."},
     {t:"Both gallons come from the SI litre, divided differently when each country set its own standards, which is why they differ in size from each other now.", fb:"Gallons predate SI: their sizes come from British measures and later law."}],
    "Older British practice had several gallons. The US kept an older one; Britain's 1824 standard set a larger single gallon. The answer is <b>the US kept an older British gallon while Britain defined a larger standard</b>.", {}); }
]), ["Compare the actual sizes, and use the history of the two systems to explain them.", "Start by writing the size of each unit in the same measure before judging."]);

E("u1-decimal-fraction-judge", 1, ["3.4","3.11"], 3, "gen", function(){
  var mode=ri(1,2);
  if(mode===1){
    var siVals=["1.25 m","0.75 L","2.5 cm","12.75 kg","0.5 m","3.125 L","7.5 mm","1.75 m"];
    var impVals=["\\(1\\frac{1}{4}\\) inches","\\(2\\frac{3}{4}\\) feet","\\(\\frac{5}{8}\\) inch","\\(3\\frac{1}{2}\\) cups","\\(\\frac{7}{16}\\) inch","\\(1\\frac{5}{8}\\) yards"];
    var useImp=Math.random()<0.5; var val=useImp?pick(impVals):pick(siVals);
    var objs=["board length","liquid amount","ribbon cut","ingredient amount","pipe length","fabric cut"];
    var ob=pick(objs);
    var correct=useImp?
      {t:"Imperial: the amount is built from fraction divisions of the unit.", fb:"Yes: halves, quarters and smaller fractions are how imperial units are divided and marked."}:
      {t:"SI: the amount is built from decimal parts of the unit.", fb:"Yes: decimal parts match SI units stepping by powers of ten."};
    var wrong=useImp?
      {t:"SI: the amount is built from decimal parts of the unit.", fb:"This amount is written with fractions of an imperial unit, the imperial pattern."}:
      {t:"Imperial: the amount is built from fraction divisions of the unit.", fb:"This amount is written with decimal parts, the SI pattern."};
    return mcq("A "+ob+" is recorded as "+val+". Which judgement about the form of this measurement is correct?",
      correct,
      [wrong,
       {t:"Both systems equally: the form of a measurement says nothing about its system.", fb:"The form is a strong clue: decimals follow base ten SI steps, fractions follow imperial divisions."},
       {t:"Neither system: amounts written this way are estimates only.", fb:"Exact amounts are written this way in real work: the form points to one system."}],
      "Decimals (tenths, hundredths) follow SI power of ten steps. Fractions (halves, quarters, eighths) follow imperial divisions. The recorded amount "+val+" follows the "+(useImp?"imperial":"SI")+" pattern. The answer is <b>"+(useImp?"imperial":"SI")+"</b>.",
      {mode:1,useImp:useImp?1:0});
  }
  var fracs=["\\(\\frac{3}{16}\\)","\\(\\frac{5}{16}\\)","\\(\\frac{7}{16}\\)","\\(\\frac{9}{16}\\)","\\(\\frac{11}{16}\\)","\\(\\frac{13}{16}\\)","\\(\\frac{3}{8}\\)","\\(\\frac{5}{8}\\)","\\(\\frac{7}{8}\\)"];
  var fr=pick(fracs);
  var tools=["tape measure","steel ruler","drill bit set","socket set","recipe card"];
  var tl=pick(tools);
  return mcq("A "+tl+" used for imperial measuring is marked in sizes such as "+fr+" of an inch. Why do imperial tools use marks like these instead of decimal marks?",
    {t:"Imperial units were traditionally divided by repeated halving, so halves, quarters, eighths and sixteenths are the natural marks.", fb:"Yes: halving an inch gives 1/2, 1/4, 1/8 and 1/16 in turn."},
    [{t:"Decimal marks cannot be printed small enough to fit on a tool.", fb:"Decimal tools exist and print finely: the fraction marks come from how imperial units divide."},
     {t:"Inches step by powers of ten, so sixteenths are tenths in disguise.", fb:"Inches do not step by tens: the marks are halves and quarters, not tenths."},
     {t:"The marks are fractions because imperial numbers must stay below one.", fb:"Imperial measures use whole numbers plus fractions freely: size is not the reason."}],
    "Repeated halving of an inch gives \\(\\frac{1}{2}\\), \\(\\frac{1}{4}\\), \\(\\frac{1}{8}\\) and \\(\\frac{1}{16}\\), so imperial tools are marked in those fractions. The answer is <b>imperial units divide by repeated halving</b>.",
    {mode:2,tool:tl});
}, ["Look at how the unit divides: by tens, or by repeated halving.", "Start by asking what smaller parts the unit is split into."]);

E("u1-cr-travel-proportion", 1, ["1.7"], 3, "gen", function(){
  var mode=ri(1,2);
  if(mode===1){
    var curs=[{code:"EUR", name:"euros"},{code:"USD", name:"US dollars"},{code:"GBP", name:"British pounds"}];
    var cu=pick(curs);
    var baseCAD=pick([50,100,100,200,250]); var rate=pick([1.32,1.36,1.44,1.48,1.56,1.72,1.76]);
    var baseFor=Math.round(baseCAD/rate*100)/100;
    var targetFor=pick([120,150,180,240,300,360,400,450,600]);
    var ans=u1R2(targetFor*rate);
    return numq("At an exchange desk, "+u1Dol(baseCAD)+" buys "+fmtF(baseFor,2)+" "+cu.code+". Using proportional reasoning, how many Canadian dollars are needed to buy "+fmt(targetFor)+" "+cu.code+"? Show your work.",
      ans, 0.3,
      "\\[ \\begin{aligned} \\text{Rate} &= \\frac{"+fmtF(baseCAD,2)+"}{"+fmtF(baseFor,2)+"} = "+fmtF(rate,2)+" \\text{ CAD per "+cu.code+"} \\\\ \\text{Canadian dollars} &= "+fmt(targetFor)+" \\times "+fmtF(rate,2)+" = "+fmtF(ans,2)+" \\end{aligned} \\] The answer is <b>"+u1Dol(ans)+"</b>.",
      {mode:1,cu:cu.code,rate:rate});
  }
  var cu2=pick([{code:"USD", name:"US dollars"},{code:"EUR", name:"euros"}]);
  var rate2=pick([1.34,1.38,1.46,1.50,1.54]); var fee=pick([5,8,10,12,15]);
  var amtCAD2=pick([400,500,600,750,800,1000]); var net=amtCAD2-fee; var ans2=u1R2(net/rate2);
  return numq("The exchange rate is 1 "+cu2.code+" = "+fmtF(rate2,2)+" CAD. A traveller exchanges "+u1Dol(amtCAD2)+", and the exchange desk first takes a flat service fee of "+u1Dol(fee)+" from the Canadian amount, then converts the rest. How many "+cu2.code+" does the traveller receive? Give the answer to two decimal places. Show your work.",
    ans2, 0.05,
    "\\[ \\begin{aligned} \\text{Amount converted} &= "+fmtF(amtCAD2,2)+" - "+fmtF(fee,2)+" = "+fmtF(net,2)+" \\\\ \\text{Foreign amount} &= \\frac{"+fmtF(net,2)+"}{"+fmtF(rate2,2)+"} = "+fmtF(ans2,2)+" \\end{aligned} \\] The answer is <b>"+fmtF(ans2,2)+" "+cu2.code+"</b>.",
    {mode:2,cu:cu2.code,rate:rate2,fee:fee});
}, ["Break the problem into steps: handle any fee or given pair first, then use the proportion.", "Start by finding the rate or the amount that actually gets converted."]);

E("u1-cr-best-buy-total", 1, ["1.3","1.1"], 3, "gen", function(){
  var scenes=[
    {need:2000, needTxt:"2 kg", item:"rice for a community supper", smallSize:500, smallUnit:"g bag", bigSize:2500, bigUnit:"g bag"},
    {need:1500, needTxt:"1500 mL", item:"shampoo for a salon", smallSize:500, smallUnit:"mL bottle", bigSize:2000, bigUnit:"mL bottle"},
    {need:3000, needTxt:"3 kg", item:"flour for a bake sale", smallSize:1000, smallUnit:"kg bag", bigSize:5000, bigUnit:"kg bag", kg:true},
    {need:1200, needTxt:"1200 g", item:"coffee beans for a cafe", smallSize:400, smallUnit:"g bag", bigSize:1600, bigUnit:"g bag"}
  ];
  var sc=pick(scenes);
  var smallPrice=ri(280,890)/100; var bigPrice=ri(990,2990)/100;
  var nSmall=Math.ceil(sc.need/sc.smallSize); var totalSmall=u1R2(nSmall*smallPrice); var totalBig=bigPrice;
  var g=0; while(Math.abs(totalSmall-totalBig)<0.75&&g++<100){ bigPrice=ri(990,2990)/100; totalBig=bigPrice; g++; }
  if(Math.abs(totalSmall-totalBig)<0.75){ totalBig=u1R2(totalSmall+2.25); bigPrice=totalBig; }
  var ans=Math.min(totalSmall,totalBig); var smallWins=totalSmall<totalBig;
  var smallSizeTxt=sc.kg?fmt(sc.smallSize/1000):fmt(sc.smallSize); var bigSizeTxt=sc.kg?fmt(sc.bigSize/1000):fmt(sc.bigSize);
  return numq("A buyer needs at least "+sc.needTxt+" of "+sc.item+". Option A: "+smallSizeTxt+" "+sc.smallUnit+"s at "+u1Dol(smallPrice)+" each. Option B: one "+bigSizeTxt+" "+sc.bigUnit+" at "+u1Dol(bigPrice)+". Find the total cost of the cheaper way to get at least the needed amount. Show your work.",
    ans, 0.02,
    "\\[ \\begin{aligned} \\text{Option A} &= "+nSmall+" \\text{ packs} \\times "+u1DolM(smallPrice)+" = "+u1DolM(totalSmall)+" \\\\ \\text{Option B} &= "+u1DolM(totalBig)+" \\end{aligned} \\] Compare the totals for getting at least the needed amount. The answer is <b>"+u1Dol(ans)+"</b>.",
    {need:sc.need,smallWins:smallWins?1:0});
}, ["Compare the total cost of getting the full needed amount under each option.", "Start by finding how many small packs are needed, and what they cost in total."]);

/* ----- bank-u2.js ----- */
// Math 1202 Unit 2 Measuring Length question bank
// Figures (added Nov 2026): the perimeter, circumference and
// shipping size constructed response entries draw labelled figures
// from each question's own values. Conversions, referents,
// estimates, reasonableness and error spotting entries stay
// figureless: they name no single measured shape.
// Cut verbatim from the standalone bank source
// (math-1202-review/bank-src.js, lines 1004 to 1485).
// CRMARKS: u2-cr-perim=2
// CRMARKS: u2-cr-circ=2
// CRMARKS: u2-cr-mid=2
// CRMARKS: u2-cr-ship=3
// CRMARKS: u2-cr-formula-manip=3
// CRMARKS: u2-cr-convert=3
// CRMARKS: u2-cr-estimate=2
// CRMARKS: u2-cr-error=3
/* ===== Unit 2 ===== */
// Unit 2 Measuring Length, Mathematics 1202 Review. Helpers prefixed u2.
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
function u2RulerFig(inches){
  var scale=22, x0=30, len=inches*scale, W=Math.ceil(x0+len+30), s='<svg viewBox="0 0 '+W+' 110" width="'+W+'" height="110" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ruler with an object ending at a marked length">';
  s+='<rect x="'+x0+'" y="30" width="'+fmt(len,1)+'" height="26" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
  s+='<rect x="'+x0+'" y="62" width="'+fmt(8*scale,1)+'" height="20" fill="none" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
  for(var i=0;i<=64;i++){ var x=x0+i*(scale/8); var h=(i%8===0)?14:(i%4===0?10:6); s+='<line x1="'+fmt(x,1)+'" y1="82" x2="'+fmt(x,1)+'" y2="'+fmt(82-h,1)+'" stroke="'+FIG_INK+'" stroke-width="1"/>'; if(i%8===0){ s+='<text x="'+fmt(x,1)+'" y="98" font-size="10" fill="'+FIG_INK+'" text-anchor="middle">'+(i/8)+'</text>'; } }
  s+='<text x="'+fmt(x0+len/2,1)+'" y="20" font-size="11" fill="'+FIG_INK+'" text-anchor="middle">object</text></svg>';
  return s;
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
function u2RectFig(L,Wd){
  var s='<svg viewBox="0 0 260 170" width="260" height="170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rectangle with labelled length and width">';
  s+='<rect x="45" y="35" width="170" height="95" fill="'+FIG_SHADE+'" fill-opacity="0.4" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<text x="130" y="22" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">'+fmt(L)+' m</text>';
  s+='<text x="232" y="86" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">'+fmt(Wd)+' m</text></svg>';
  return s;
}

E("u2-si-convert", 2, ["3.7"], 1, "gen", function(){
  var modes=[
    {f:"mm",t:"cm",k:0.1},{f:"cm",t:"m",k:0.01},{f:"m",t:"km",k:0.001},{f:"cm",t:"mm",k:10},{f:"m",t:"cm",k:100},{f:"km",t:"m",k:1000}
  ];
  var ctx=pick(["A shelf board","A ribbon for a gift box","A hallway in a school","A garden hose","A walking trail","A piece of trim"]);
  var m=pick(modes); var v=ri(3,480); if(m.k<1 && v<20) v=v+40;
  var ans=Math.round(v*m.k*1000)/1000;
  var dd=u2Dist(ans,[ans*10,ans/10,ans+ (m.k>=1?10:-ans/2)], m.t, "Correct: each step on the SI ladder moves the decimal point by the power of ten for that step.", function(i){ return ["That moves the decimal point the wrong way or by the wrong number of places.","That uses the wrong power of ten for this step on the ladder.","That changes the value instead of only changing the unit."][i]; });
  return mcq(ctx+" measures \\("+fmt(v)+"\\ \\text{"+m.f+"}\\). Write this length in "+m.t+".",
    dd.c, dd.d,
    "SI units are based on powers of ten. \\[ "+fmt(v)+"\\ \\text{"+m.f+"} \\times "+fmt(m.k)+" = "+fmt(ans)+"\\ \\text{"+m.t+"} \\] The length is <b>"+fmt(ans)+" "+m.t+"</b>.",
    {mode:m.f+"-"+m.t, v:v});
}, ["Use the SI ladder: each step is a power of ten.", "Decide whether the new unit is larger or smaller, then move the decimal point the right number of places."]);

E("u2-imp-convert", 2, ["3.14"], 1, "gen", function(){
  var modes=[{f:"in",t:"ft",k:1/12,lab:"12 in = 1 ft"},{f:"ft",t:"in",k:12,lab:"1 ft = 12 in"},{f:"ft",t:"yd",k:1/3,lab:"3 ft = 1 yd"},{f:"yd",t:"ft",k:3,lab:"1 yd = 3 ft"},{f:"yd",t:"mi",k:1/1760,lab:"1760 yd = 1 mi"}];
  var ctx=pick(["A carpenter","A quilter","A landscaper","A delivery driver","A stage builder"]);
  var m=pick(modes); var v;
  if(m.f==="yd"&&m.t==="mi") v=pick([880,1760,2640,3520,5280]); else if(m.k===1/12) v=ri(2,20)*12; else if(m.k===1/3) v=ri(2,30)*3; else v=ri(2,40);
  var ans=Math.round(v*m.k*100)/100;
  var dd=u2Dist(ans,[ans*2,ans/2,ans+ (m.k>=1?12:1)], m.t, "Correct: "+m.lab+", applied in the right direction.", function(i){ return ["That uses the wrong conversion factor for these units.","That divides where the conversion calls for the reverse operation, or the reverse.","That adds a number instead of multiplying or dividing by the conversion factor."][i]; });
  return mcq(ctx+" has a length of \\("+fmt(v)+"\\ \\text{"+m.f+"}\\). Write this length in "+m.t+".",
    dd.c, dd.d,
    "Use the relation "+m.lab+". \\[ "+fmt(v)+"\\ \\text{"+m.f+"} \\times "+fmt(m.k)+" = "+fmt(ans)+"\\ \\text{"+m.t+"} \\] The length is <b>"+fmt(ans)+" "+m.t+"</b>.",
    {mode:m.f+"-"+m.t, v:v});
}, ["Recall the imperial relation between the two units.", "Multiply or divide by that relation so the old unit cancels out."]);

E("u2-referent", 2, ["3.17"], 1, "gen", function(){
  var items=[
    {u:"1 centimetre", good:"the width of a fingernail", bad:["the height of a doorway","the length of a school bus","the width of a football field"], why:"A fingernail is about a centimetre wide."},
    {u:"1 metre", good:"the height of a kitchen counter, roughly", bad:["the thickness of a coin in your pocket","the length of a new pencil on a desk","the height of a two storey house nearby"], why:"A counter top sits about a metre above the floor."},
    {u:"1 inch", good:"the width of a thumb at the nail", bad:["the length of a forearm, roughly","the height of a door knob, roughly","the width of a sheet of paper"], why:"A thumb width is a common inch referent."},
    {u:"1 foot", good:"the length of a standard ruler", bad:["the width of a wide hand span","the height of a tall coffee mug","the length of a parked car"], why:"A standard ruler is 12 inches, which is 1 foot."},
    {u:"1 yard", good:"the height of a door knob from the floor, roughly", bad:["the length of a shoelace tip on a winter boot","the width of a doorway step at the front door","the length of a hockey rink in a small town"], why:"A door knob sits about a yard above the floor."},
    {u:"1 kilometre", good:"about a 10 minute walk", bad:["the length of a city bus","about a 1 minute walk","the distance across a classroom"], why:"Walking a kilometre takes roughly 10 minutes."},
    {u:"1 millimetre", good:"the thickness of a dime", bad:["the width of a fingernail","the length of an ant, roughly","the thickness of a textbook"], why:"A dime is about a millimetre thick."}
  ];
  var it=pick(items);
  var frame=pick(["Which referent best matches ","For a quick estimate, which referent best matches ","A student needs a referent. Which one best matches ","In a workshop, which referent best matches ","For measuring at home, which referent best matches ","Which familiar object is the best referent for ","A camper wants a referent. Which one best matches ","Which referent should a student picture for "]);
  var ds=it.bad.map(function(b){ return {t:b, fb:"That object is far from "+it.u+" in size, so it would mislead an estimate."}; });
  return mcq(frame+it.u+"? A referent is a familiar object used to judge a measure.",
    {t:it.good, fb:"Yes. "+it.why}, ds,
    it.why+" So the best referent for "+it.u+" is <b>"+it.good+"</b>.",
    {unit:it.u});
}, ["Picture each object and compare its size with the unit.", "Rule out objects that are clearly much larger or much smaller first."]);

E("u2-approx-si", 2, ["3.5"], 1, "gen", function(){
  var modes=[
    {f:"inches", per:2.5, t:"cm", lab:"1 inch is about 2.5 cm"},
    {f:"feet", per:30, t:"cm", lab:"1 foot is about 30 cm"},
    {f:"yards", per:0.9, t:"m", lab:"1 yard is about 0.9 m"},
    {f:"miles", per:1.6, t:"km", lab:"1 mile is about 1.6 km"}
  ];
  var ctx=pick(["A board is","A trail section is","A ribbon is","A room is","A fence run is"]);
  var m=pick(modes); var v=ri(2,40); var ans=Math.round(v*m.per*10)/10;
  var dd=u2Dist(ans,[ans*2,Math.round(ans/2*10)/10,v], m.t, "Correct: "+m.lab+", so multiply to get a close SI value.", function(i){ return ["That doubles the estimate instead of using the stated approximate equivalent.","That halves the estimate instead of using the stated approximate equivalent.","That keeps the same number and only changes the unit name, which cannot be right when the units differ in size."][i]; });
  return mcq(ctx+" \\("+v+"\\ \\text{"+m.f+"}\\) long. Using "+m.lab+", which is the best approximate length in "+m.t+"?",
    dd.c, dd.d,
    "This is an estimate, so use the given approximate equivalent. \\[ "+v+" \\times "+fmt(m.per)+" = "+fmt(ans)+" \\] The length is about <b>"+fmt(ans)+" "+m.t+"</b>.",
    {mode:m.f, v:v});
}, ["Use the approximate equivalent given in the question.", "Multiply the imperial measure by the per unit SI value."]);

E("u2-approx-imp", 2, ["3.12"], 1, "gen", function(){
  var modes=[
    {f:"cm", per:0.4, t:"inches", lab:"1 cm is about 0.4 inches", inv:"2.5 cm is about 1 inch"},
    {f:"m", per:1.1, t:"yards", lab:"1 m is about 1.1 yards", inv:"1 m is a little more than 1 yard"},
    {f:"km", per:0.6, t:"miles", lab:"1 km is about 0.6 miles", inv:"1 km is a little over half a mile"},
    {f:"m", per:3.3, t:"feet", lab:"1 m is about 3.3 feet", inv:"1 m is a little over 3 feet"}
  ];
  var ctx=pick(["A counter is","A path is","A shelf is","A banner is","A garden bed is"]);
  var m=pick(modes); var v=ri(2,30); var ans=Math.round(v*m.per*10)/10;
  var dd=u2Dist(ans,[ans*2,Math.round(ans/2*10)/10,v], m.t, "Correct: "+m.lab+" ("+m.inv+").", function(i){ return ["That doubles the estimate instead of using the stated approximate equivalent.","That halves the estimate instead of using the stated approximate equivalent.","That keeps the same number and only changes the unit name."][i]; });
  return mcq(ctx+" \\("+v+"\\ \\text{"+m.f+"}\\) long. Using "+m.lab+", which is the best approximate length in "+m.t+"?",
    dd.c, dd.d,
    "Use the given approximate equivalent for an estimate. \\[ "+v+" \\times "+fmt(m.per)+" = "+fmt(ans)+" \\] The length is about <b>"+fmt(ans)+" "+m.t+"</b>.",
    {mode:m.f, v:v});
}, ["Use the approximate equivalent given in the question.", "Multiply the SI measure by the per unit imperial value."]);

E("u2-frac-divide", 2, ["3.15"], 2, "gen", function(){
  var jobs=[
    {thing:"ribbon", unit:"m", piece:"bow"},
    {thing:"board", unit:"ft", piece:"shelf"},
    {thing:"trim", unit:"m", piece:"doorway section"},
    {thing:"pipe", unit:"m", piece:"section"},
    {thing:"cord", unit:"ft", piece:"hanger loop"},
    {thing:"tape strip", unit:"m", piece:"label"}
  ];
  var job=pick(jobs);
  var fw=ri(1,9), fn=pick([1,1,2,3]), fd=pick([2,3,4]);
  if(fn>=fd){ fn=1; fd=2; }
  var pn=pick([1,1,2]), pd=pick([3,4,2]);
  if(pn>=pd){ pn=1; pd=3; }
  var whole=fw+fn/fd, piece=pn/pd;
  var n=Math.round((whole/piece)*100)/100;
  var totalTxt=fw+" "+FR(fn,fd), pieceTxt=(pn===pd?"1":FR(pn,pd));
  var ds=[
    {t:"Adding the two fractional lengths together to get one single longer length", fb:"Adding finds a total length, not how many pieces fit."},
    {t:"Multiplying the two fractional lengths together to get one single larger amount", fb:"Multiplying lengths gives an area type result, not a count of pieces."},
    {t:"Subtracting the smaller length from the larger length once to find what remains", fb:"One subtraction leaves a remainder length, not the number of pieces."}
  ];
  return mcq("A "+job.thing+" is \\("+totalTxt+"\\ \\text{"+job.unit+"}\\) long. Each "+job.piece+" uses \\("+pieceTxt+"\\ \\text{"+job.unit+"}\\). A worker asks how many pieces can be made. Which situation is this?",
    {t:"A fractional length divided by a fraction: how many small pieces fit in the whole", fb:"Yes: the question asks how many of the smaller fractional measure fit into the larger one, which is division."}, ds,
    "Ask what the question wants: a count of equal pieces inside a total length. That is division of a fractional measurement by a fraction. \\[ "+fmt(whole)+" \\div "+fmt(piece)+" = "+fmt(n)+" \\] The situation is <b>dividing a fractional length by a fraction to count pieces</b>.",
    {whole:whole, piece:piece});
}, ["Ask whether the question wants a total, a leftover, or a count of pieces.", "A count of equal pieces inside a total always points to division."]);
E("u2-measure-read", 2, ["3.16","3.11"], 2, "gen", function(){
  var whole=ri(2,11); var eighths=pick([1,2,3,4,5,6,7]); var objName=pick(["object","board end","ribbon","strip of card"]); var val=whole+eighths/8;
  var names={1:"1/8",2:"1/4",3:"3/8",4:"1/2",5:"5/8",6:"3/4",7:"7/8"};
  var good=whole+" "+names[eighths]+" in";
  function lab(w,e){ if(e===0) return w+" in"; if(e===8) return (w+1)+" in"; return w+" "+names[e]+" in"; }
  var cand=[[whole,eighths+1],[whole,eighths-1],[whole+1,eighths],[whole, eighths+2]];
  var ds=[]; var used={}; used[good]=1;
  for(var i=0;i<cand.length && ds.length<3;i++){ var t=lab(cand[i][0],cand[i][1]); if(!used[t]){ used[t]=1; ds.push({t:t, fb:"That reading is off the end mark: count the whole inches first, then the eighth inch marks. Tape measures use fractions of an inch because small lengths must be marked precisely."}); } }
  while(ds.length<3){ var t2=lab(whole+2, eighths); if(!used[t2]){ used[t2]=1; ds.push({t:t2, fb:"That reading is well past the end of the object."}); } else break; }
  var q=mcq("The "+objName+" starts at 0 on the ruler in the diagram. Imperial rulers divide each inch into fractions such as eighths. What is the length of the object?",
    {t:good, fb:"Correct: count the whole inches, then count eighth inch marks past the last whole inch."}, ds,
    "Read from 0. The object ends at "+whole+" whole inches plus "+eighths+" eighth marks. \\[ "+whole+" + "+FR(eighths,8)+" = "+fmt(val)+" \\] The length is <b>"+good+"</b>.",
    {whole:whole, eighths:eighths});
  q.figure=u2RulerFig(val);
  return q;
}, ["Count whole units first, then the fractional marks.", "Find the last whole inch mark the object passes, then count the small marks after it."]);

E("u2-estimate-ref", 2, ["3.17","3.18","3.19"], 2, "gen", function(){
  var scenes=[
    {obj:"height of a door", ref:"metre stick", per:1, unit:"m", lo:2, hi:3},
    {obj:"length of a classroom", ref:"foot long ruler laid end to end", per:1, unit:"ft", lo:24, hi:36},
    {obj:"width of a hallway", ref:"yard stick", per:1, unit:"yd", lo:2, hi:4},
    {obj:"height of a desk", ref:"foot long ruler", per:1, unit:"ft", lo:2, hi:3},
    {obj:"length of a school bus", ref:"metre stick", per:1, unit:"m", lo:10, hi:14},
    {obj:"length of a gym", ref:"metre stick", per:1, unit:"m", lo:18, hi:30},
    {obj:"height of a counter", ref:"30 cm ruler", per:0.3, unit:"m", lo:3, hi:3},
    {obj:"width of a driveway", ref:"yard stick", per:1, unit:"yd", lo:3, hi:6}
  ];
  var sc=pick(scenes); var n=ri(sc.lo*2,sc.hi*2)/2; var ans=Math.round(n*sc.per*10)/10;
  var dd=u2Dist(ans,[ans*2,ans/2,ans+(ans>=10?5:1)], sc.unit, "Correct: multiply the number of referents by the size of one referent.", function(i){ return ["That doubles the count of referents without a reason.","That uses only half the referents that were counted.","That does not match the count of referents that was given."][i]; });
  return mcq("To estimate the "+sc.obj+", a student uses a "+sc.ref+" as a referent. It takes about "+n+" referents to match it. One referent is about "+fmt(sc.per)+" "+sc.unit+". About how long is it, in "+sc.unit+"?",
    dd.c, dd.d,
    "Multiply the count by the size of one referent. \\[ "+n+" \\times "+fmt(sc.per)+"\\ \\text{"+sc.unit+"} = "+fmt(ans)+"\\ \\text{"+sc.unit+"} \\] The estimate is about <b>"+fmt(ans)+" "+sc.unit+"</b>.",
    {obj:sc.obj, n:n});
}, ["An estimate with a referent is a count times the size of one referent.", "Multiply how many referents fit by the length of one referent."]);
E("u2-perimeter", 2, ["3.20","2.3"], 2, "gen", function(){
  var ctx=pick([
    {o:"garden bed", act:"edging around"},
    {o:"classroom bulletin board", act:"trim around"},
    {o:"picture frame", act:"framing around"},
    {o:"rug outline", act:"binding around the edge of"}
  ]);
  var L=ri(3,14), W=ri(2,10); if(W>=L){ var tmp=L; L=W+ri(1,3); W=tmp; }
  var guardP=0; while(guardP<40){ var valsP=[2*(L+W), L*W, L+W, 2*L+W]; var setP={}; var dupP=false; valsP.forEach(function(x){ if(setP[x]) dupP=true; setP[x]=1; }); if(!dupP) break; L=ri(3,14); W=ri(2,10); if(W>=L){ var t2=L; L=W+ri(1,3); W=t2; } guardP++; }
  var P=2*(L+W);
  var ds=[
    {t:fmt(L*W), fb:"That multiplies length by width, which gives area, not the distance around."},
    {t:fmt(L+W), fb:"That adds only one length and one width, half the trip around."},
    {t:fmt(2*L+W), fb:"That counts one width only once: both widths are part of the boundary."}
  ];
  var q=mcq("A rectangular "+ctx.o+" is \\("+L+"\\ \\text{m}\\) long and \\("+W+"\\ \\text{m}\\) wide. How much material, in metres, is needed for "+ctx.act+" it? Use \\(P = 2L + 2W\\).",
    {t:fmt(P), fb:"Correct: add both lengths and both widths."}, ds,
    "Perimeter is the distance around, and the formula applies directly. \\[ \\begin{aligned} P &= 2L + 2W \\\\ &= 2("+L+") + 2("+W+") \\\\ &= "+P+"\\ \\text{m} \\end{aligned} \\] The answer is <b>"+P+" m</b>.",
    {L:L, W:W});
  q.figure=u2RectFig(L,W);
  return q;
}, ["Perimeter is the distance all the way around a shape.", "Add both lengths and both widths, or use P = 2L + 2W."]);

E("u2-operation", 2, ["3.21"], 2, "var", varset([
  function(){ return mcq("A fence goes around a rectangular yard. The yard is 18 m by 12 m. Which operation finds the length of fence needed?",
    {t:"Add all four sides (perimeter)", fb:"Correct: fencing follows the boundary, so the side lengths are added."},
    [{t:"Multiply length by width", fb:"That gives the area covered, not the length of fence."},{t:"Divide length by width", fb:"Division does not give a boundary length here."},{t:"Subtract width from length", fb:"That gives a difference of two sides, not the full boundary."}],
    "Fence follows the boundary. Add the sides: \\(18+12+18+12 = 60\\ \\text{m}\\). The operation is <b>add all four sides</b>.", {}); },
  function(){ return mcq("A ribbon 90 cm long is cut into pieces 15 cm each. Which operation finds how many pieces there will be?",
    {t:"Divide the total length by the piece length", fb:"Correct: equal pieces inside a total is division."},
    [{t:"Multiply the total length by the piece length", fb:"That would make the length larger, not split it into pieces."},{t:"Add the two lengths", fb:"Adding gives a combined length, not a count of pieces."},{t:"Subtract the piece length once", fb:"One subtraction leaves a leftover length, not the count."}],
    "A count of equal pieces is division: \\(90 \\div 15 = 6\\) pieces. The operation is <b>division</b>.", {}); },
  function(){ return mcq("A board is 2.4 m long. A piece 0.9 m is cut off. Which operation finds the length left?",
    {t:"Subtract the cut piece from the total length", fb:"Correct: a part removed from a whole is subtraction."},
    [{t:"Add the two lengths", fb:"Adding would combine lengths, but a piece was removed."},{t:"Divide the total by the piece", fb:"Division counts pieces, but here the leftover length is wanted."},{t:"Multiply the two lengths", fb:"Multiplying lengths does not give the leftover length."}],
    "Part removed from a whole: \\(2.4 - 0.9 = 1.5\\ \\text{m}\\) left. The operation is <b>subtraction</b>.", {}); },
  function(){ return mcq("Baseboard is sold by the metre. One wall is 4.5 m and 6 walls of that length are needed. Which operation finds the total baseboard?",
    {t:"Multiply the one wall length by the number of walls", fb:"Correct: repeated equal lengths are found by multiplication."},
    [{t:"Add 4.5 and 6 once", fb:"That adds two unlike amounts once, not six equal lengths."},{t:"Divide 4.5 by 6", fb:"That would split one wall length into parts."},{t:"Subtract 6 from 4.5", fb:"Nothing is being removed in this problem."}],
    "Repeated equal lengths: \\(4.5 \\times 6 = 27\\ \\text{m}\\). The operation is <b>multiplication</b>.", {}); },
  function(){ return mcq("A circular garden has a radius of 3 m. Edging goes around the garden. Which operation finds the edging length?",
    {t:"Multiply 2 by pi by the radius (circumference)", fb:"Correct: edging around a circle is its circumference."},
    [{t:"Multiply pi by the radius squared", fb:"That is the area of the circle, not the distance around."},{t:"Add the radius to itself once and stop", fb:"That gives the diameter only, not the full trip around."},{t:"Divide the radius by pi", fb:"That does not produce the circumference."}],
    "Around a circle is circumference: \\(C = 2\\pi r = 2\\pi(3) \\approx 18.8\\ \\text{m}\\). The operation is <b>circumference</b>.", {}); },
  function(){ return mcq("A parcel has length 40 cm, width 30 cm and height 20 cm. A courier adds length, width and height to set the shipping size. Which operation describes this?",
    {t:"Add length, width and height", fb:"Correct: the shipping size rule is L + W + H."},
    [{t:"Multiply length by width by height", fb:"That gives volume, not the shipping size sum."},{t:"Find the perimeter of the top face", fb:"That uses only the length and width of one face."},{t:"Average the three measures", fb:"Averaging divides the sum by 3, which the rule does not do."}],
    "Shipping size: \\(40 + 30 + 20 = 90\\ \\text{cm}\\). The operation is <b>add length, width and height</b>.", {}); }
]), ["Read the problem and name what the answer should describe: a total, a count, a leftover, or a distance around.", "Match that description to the operation before doing any arithmetic."]);

E("u2-trade-formula", 2, ["2.2"], 2, "var", varset([
  function(){ return mcq("How does an electrician use the formula for the circumference of a circle on the job?",
    {t:"To find how much conduit bends around a circular run or the length around a round junction box", fb:"Correct: circumference gives the length around a circular object."},
    [{t:"To find the area of a ceiling for paint coverage", fb:"Paint coverage is an area problem, not a circumference problem."},{t:"To set the price of a job from an hourly rate", fb:"That is a pay calculation, not a length formula."},{t:"To convert a temperature for a thermostat", fb:"That is a temperature conversion, not circumference."}],
    "Circumference is a length around a circle, used whenever material must wrap a round object. The answer is <b>finding the length around a circular run or box</b>.", {}); },
  function(){ return mcq("How does a carpenter use the perimeter formula on the job?",
    {t:"To order baseboard or trim for the walls of a room", fb:"Correct: trim follows the boundary of the room, which is its perimeter."},
    [{t:"To find how much flooring covers the room", fb:"Flooring coverage is area, measured in square units."},{t:"To find the volume of a concrete footing", fb:"Volume needs three dimensions multiplied, not a boundary sum."},{t:"To check that a wall is level", fb:"Levelling is done with a level tool, not a perimeter calculation."}],
    "Trim runs along the walls, the boundary of the floor plan. The answer is <b>ordering baseboard or trim by perimeter</b>.", {}); },
  function(){ return mcq("How does a plumber use a diameter measurement on the job?",
    {t:"To choose a pipe or fitting that matches the opening it must connect to", fb:"Correct: pipes and fittings are sized by diameter."},
    [{t:"To find the perimeter of a bathroom", fb:"A room perimeter does not size a pipe."},{t:"To estimate paint for a wall", fb:"Paint depends on wall area, not pipe diameter."},{t:"To set a work schedule", fb:"Scheduling does not use a diameter measure."}],
    "Pipe sizes are given as diameters, so matching a diameter selects the right part. The answer is <b>choosing pipe or fittings by diameter</b>.", {}); },
  function(){ return mcq("How does a landscaper use the shipping rule L + W + H?",
    {t:"Rarely directly: a courier uses it, and the landscaper checks a boxed plant or tool order against the size limit before shipping", fb:"Correct: L + W + H is the courier size rule for parcels."},
    [{t:"To find the area of a lawn for seed", fb:"Lawn seed depends on area, not a parcel size sum."},{t:"To find the depth to dig a hole", fb:"Digging depth is a single direct measure."},{t:"To price topsoil by the bag", fb:"Topsoil is sold by volume or coverage, not by L + W + H."}],
    "L + W + H is the size sum couriers use for parcels. The answer is <b>checking a parcel against the courier size limit</b>.", {}); },
  function(){ return mcq("How does a drywaller use a midpoint on the job?",
    {t:"To mark the centre of a wall or sheet so a fixture or seam lands in the middle", fb:"Correct: a midpoint marks the centre of a length."},
    [{t:"To find the total area of a sheet", fb:"Sheet area is length times width."},{t:"To convert feet to inches", fb:"Conversion changes units, it does not locate a centre."},{t:"To find the circumference of a vent", fb:"A vent circumference uses the circle formula, not a midpoint."}],
    "A midpoint is the centre point of a length, used for centred placement. The answer is <b>marking the centre for placement</b>.", {}); },
  function(){ return mcq("How does a tile setter use the formula for the circumference of a circle?",
    {t:"To cut and fit tile around a round drain or pipe opening", fb:"Correct: fitting around a round opening uses the distance around the circle."},
    [{t:"To count boxes of tile for a rectangular floor", fb:"Box counts come from floor area, not circumference."},{t:"To mix mortar by ratio", fb:"Mixing ratios are proportions of materials, not a circle formula."},{t:"To find the height of a wall", fb:"Wall height is a direct vertical measure."}],
    "Work around a round opening follows the circle boundary. The answer is <b>fitting tile around a round drain or pipe</b>.", {}); }
]), ["Think about what the formula measures: a distance around, a centre point, or a size sum.", "Match the formula to a job task that needs exactly that kind of measure."]);

E("u2-midpoint", 2, ["3.22","3.14"], 2, "gen", function(){
  var mode=pick(["half","average","imperial"]);
  if(mode==="imperial"){
    var ft=pick([4,6,8,10,12]); var inches=ft*12; var mid=inches/2; var midFt=mid/12;
    var ds=[{t:fmt(mid+6), fb:"That is past the halfway mark: check the total in inches first."},{t:fmt(mid-6), fb:"That falls short of halfway: the board is "+inches+" in long."},{t:fmt(inches), fb:"That is the full length, not the midpoint."}];
    return mcq("A board is "+ft+" ft long. A cut mark is needed at the midpoint. The midpoint is the point halfway along a length. In inches, where is the mark?",
      {t:fmt(mid), fb:"Correct: convert to inches, then take half."}, ds,
      "Convert first, then halve. \\[ \\begin{aligned} "+ft+"\\ \\text{ft} &= "+inches+"\\ \\text{in} \\\\ \\text{midpoint} &= "+inches+" \\div 2 = "+fmt(mid)+"\\ \\text{in} \\end{aligned} \\] The mark is at <b>"+fmt(mid)+" in</b> ("+fmt(midFt)+" ft).",
      {mode:mode, ft:ft});
  }
  if(mode==="average"){
    var a=ri(10,80), gapA=ri(10,90); if(a+gapA/2===gapA || gapA===a) gapA=gapA+7; var b=a+gapA; var mid2=(a+b)/2;
    var ds2=[{t:fmt(b-a), fb:"That is the distance between the readings, not the point halfway between them."},{t:fmt(a+b), fb:"That is the sum of the readings: a midpoint using end readings is their average."},{t:fmt(b), fb:"That is just the far end reading, not a point between the two."}];
    var bo2=balOpts({t:fmt(mid2), fb:"Correct: the midpoint of two end readings is their average."}, ds2);
    return mcq("On a wall, one end of a shelf line is at the \\("+a+"\\ \\text{cm}\\) mark of a tape and the other end is at the \\("+b+"\\ \\text{cm}\\) mark. Where is the midpoint of the shelf line, in centimetres?",
      bo2[0], bo2[1],
      "Average the two end readings. \\[ \\begin{aligned} \\text{midpoint} &= \\frac{"+a+" + "+b+"}{2} \\\\ &= "+fmt(mid2)+"\\ \\text{cm} \\end{aligned} \\] The midpoint is at <b>"+fmt(mid2)+" cm</b>.",
      {mode:mode, a:a, b:b});
  }
  var L=ri(12,96)*2; var half=L/2;
  var ctx=pick(["ribbon","board","rope","strip of trim","length of wire"]);
  var ds3=[{t:fmt(half+ri(2,6)), fb:"That is past halfway: compare it with half the total length."},{t:fmt(L), fb:"That is the full length, not its midpoint."},{t:fmt(half/2), fb:"That is a quarter of the length: a midpoint is half, found with one division by 2."}];
  if(ds3[0].t===fmt(half)) ds3[0].t=fmt(half+4);
  var bo3=balOpts({t:fmt(half), fb:"Correct: half the total length gives the midpoint."}, ds3);
  return mcq("A "+ctx+" is \\("+L+"\\ \\text{cm}\\) long. Where is its midpoint, in centimetres? The midpoint is halfway along the length.",
    bo3[0], bo3[1],
    "Take half the total. \\[ "+L+" \\div 2 = "+half+" \\] The midpoint is at <b>"+half+" cm</b> from either end.",
    {mode:mode, L:L});
}, ["A midpoint is halfway: half the total, or the average of two end readings.", "Find the total length first, then divide by 2."]);

E("u2-si-imp-convert", 2, ["3.6"], 2, "gen", function(){
  var cm=pick([10,15,20,25,30,40,50,60,75,80,90,100,120,150]);
  var ans=Math.round(cm/2.54*100)/100;
  var ctx=pick(["A shelf is","A countertop section is","A piece of trim is","A toolbox is"]);
  var ds=[
    {t:fmt(Math.round(cm*2.54*100)/100), fb:"That multiplies by 2.54, which converts inches to centimetres, the reverse direction."},
    {t:fmt(Math.round(cm/2*100)/100), fb:"That divides by 2 instead of 2.54, so the proportion is off."},
    {t:fmt(cm), fb:"That keeps the same number: centimetres and inches are different sizes, so the number must change."}
  ];
  var bo=balOpts({t:fmtF(ans,2), fb:"Correct: set up the proportion with 2.54 cm per inch and divide."}, ds);
  return mcq(ctx+" \\("+cm+"\\ \\text{cm}\\) long. Convert this length to inches. Use \\(1\\ \\text{in} = 2.54\\ \\text{cm}\\). Give the answer to two decimal places.",
    bo[0], bo[1],
    "Use proportional reasoning with the given rate. \\[ \\begin{aligned} \\text{inches} &= "+cm+" \\div 2.54 \\\\ &= "+fmtF(ans,2)+"\\ \\text{in} \\end{aligned} \\] The length is <b>"+fmtF(ans,2)+" in</b>.",
    {cm:cm});
}, ["Write the rate as a proportion: 2.54 cm stands with 1 inch.", "Divide the centimetre measure by 2.54 to get inches."]);

E("u2-imp-si-convert", 2, ["3.13"], 2, "gen", function(){
  var inches=pick([4,5,6,8,9,10,12,15,18,20,24,30,36]);
  var ans=Math.round(inches*2.54*100)/100;
  var ctx=pick(["A bolt is","A photo frame side is","A pipe section is","A bookcase shelf is"]);
  var ds=[
    {t:fmt(Math.round(inches/2.54*100)/100), fb:"That divides by 2.54, which converts centimetres to inches, the reverse direction."},
    {t:fmt(Math.round(inches*2*100)/100), fb:"That uses 2 cm per inch instead of 2.54, so the proportion is off."},
    {t:fmt(inches), fb:"That keeps the same number: an inch is larger than a centimetre, so the centimetre number must be larger."}
  ];
  var corr=fmt(ans); ds.forEach(function(d){ if(d.t===corr) d.t=fmt(ans+2.54); });
  var bo=balOpts({t:corr, fb:"Correct: multiply by 2.54 cm per inch."}, ds);
  return mcq(ctx+" \\("+inches+"\\ \\text{in}\\) long. Convert this length to centimetres. Use \\(1\\ \\text{in} = 2.54\\ \\text{cm}\\).",
    bo[0], bo[1],
    "Use proportional reasoning with the given rate. \\[ \\begin{aligned} \\text{centimetres} &= "+inches+" \\times 2.54 \\\\ &= "+fmt(ans)+"\\ \\text{cm} \\end{aligned} \\] The length is <b>"+fmt(ans)+" cm</b>.",
    {inches:inches});
}, ["Write the rate as a proportion: 1 inch stands with 2.54 cm.", "Multiply the inch measure by 2.54 to get centimetres."]);

E("u2-reasonable", 2, ["3.23"], 2, "gen", function(){
  var mode=pick(["classroom","frame","doorway","plate","parcel","fence"]);
  if(mode==="classroom"){
    var trueL=ri(7,12); var rep=trueL*100;
    return mcq("A student measures a classroom and reports the length as "+rep+" m. Is this reasonable?",
      {t:"No: a classroom is about "+trueL+" m long, so "+rep+" m is far too large, likely a centimetre value given in metres", fb:"Correct: the judgement matches a referent check."},
      [{t:"Yes: classrooms are hundreds of metres long, so a value like this is reasonable for a school", fb:"Compare the reported value with a referent: a classroom is only several metres long."},{t:"Yes: any measured value is automatically reasonable as long as a tape measure was used to take it carefully", fb:"A reported value still has to fit the size of the object."},{t:"No: a classroom is about "+(trueL*10)+" m long, so "+rep+" m is only a little too large to matter at all", fb:"That referent is itself far too large for a classroom."}],
      "Judge against a referent. A classroom is about "+trueL+" m long, so "+rep+" m is not reasonable. The judgement is <b>no, the value is far too large</b>.", {mode:mode, trueL:trueL});
  }
  if(mode==="frame"){
    var L=ri(25,60), W=ri(20,50); var P=2*(L+W);
    return mcq("A student finds the perimeter of a picture frame ("+L+" cm by "+W+" cm) is "+P+" cm. Is this reasonable?",
      {t:"Yes: the sides add to "+L+" + "+W+" + "+L+" + "+W+" = "+P+" cm, which fits a frame of that size", fb:"Correct: the check calculation confirms the value."},
      [{t:"No: the perimeter should be "+L+" × "+W+" = "+(L*W)+" cm, found by multiplying the two sides together", fb:"Multiplying gives area, not perimeter."},{t:"Yes: perimeters are always in the hundreds, so any value near there works fine for a frame", fb:"Reasonableness comes from a check, not from the size of the number alone."},{t:"No: a picture frame perimeter must be under 100 cm, so this one is too big", fb:"These sides already add past 100 cm, so that claim fails the check."}],
      "Check by adding the sides: "+L+" + "+W+" + "+L+" + "+W+" = "+P+" cm. The judgement is <b>yes, it is reasonable</b>.", {mode:mode, L:L, W:W});
  }
  if(mode==="doorway"){
    var repD=pick([19,20,21,22,23]);
    return mcq("A student reports a doorway height of "+repD+" m. Is this reasonable?",
      {t:"No: a doorway is about 2.1 m high, so a decimal point error is likely", fb:"Correct: the value is about ten times a sensible doorway height."},
      [{t:"Yes: doorways in schools are over 18 m high in many school buildings", fb:"Compare with a referent: a doorway is only a little over 2 m."},{t:"No: a doorway is about 21 cm high, so the value is far too large", fb:"That referent is far too small: a person must fit through a doorway."},{t:"Yes: height values in metres are always in the tens, like this one", fb:"The unit alone does not make a value reasonable."}],
      "Judge against a referent. A doorway is about 2.1 m high, so "+repD+" m is not reasonable. The judgement is <b>no, a decimal point error is likely</b>.", {mode:mode});
  }
  if(mode==="plate"){
    var d=ri(20,32); var C=Math.round(Math.PI*d);
    return mcq("A student finds the circumference of a dinner plate with diameter "+d+" cm is about "+C+" cm. Is this reasonable?",
      {t:"Yes: circumference is a little over 3 times the diameter, and 3 times "+d+" is "+(3*d)+", close to "+C, fb:"Correct: the quick check with 3 times the diameter confirms it."},
      [{t:"No: a circumference should be less than the diameter, since going around is shorter", fb:"Going around a circle is longer than going straight across it."},{t:"No: the circumference should be about "+(d*d)+" cm, the diameter squared, so the reported value is too small", fb:"Squaring belongs to area, not circumference."},{t:"Yes: any value with pi in the calculation is automatically reasonable, so no check is needed", fb:"The value still needs a size check against the diameter."}],
      "Circumference is a little over 3 times the diameter: 3 times "+d+" is "+(3*d)+", close to "+C+". The judgement is <b>yes, it is reasonable</b>.", {mode:mode, d:d});
  }
  if(mode==="parcel"){
    var L=ri(30,60), W=ri(20,50), H=ri(15,40); var S=L+W+H, prod=L*W*H;
    return mcq("A parcel measures "+L+" cm by "+W+" cm by "+H+" cm. A student gives the shipping size L + W + H as "+prod+" cm. Is this reasonable?",
      {t:"No: the sum is "+L+" + "+W+" + "+H+" = "+S+" cm, so "+prod+" cm comes from multiplying, the wrong operation", fb:"Correct: the check sum exposes the wrong operation."},
      [{t:"Yes: shipping sizes are usually in the tens of thousands for a parcel, so this value is reasonable", fb:"Add the three measures and compare: the sum is only in the low hundreds."},{t:"No: the sum should be "+L+" + "+W+" + "+H+" divided by 10, which gives about "+Math.round(S/10)+" cm, not the reported value", fb:"That is a tenth of the actual sum: recheck the addition."},{t:"Yes: multiplying the three measures is the shipping rule, so the value is right", fb:"The shipping rule is a sum, L + W + H."}],
      "Add the measures: "+L+" + "+W+" + "+H+" = "+S+" cm, so "+prod+" cm is not reasonable. The judgement is <b>no, the wrong operation was used</b>.", {mode:mode, L:L, W:W, H:H});
  }
  var run=ri(15,40); var repF=run*10;
  return mcq("A student reports that a garden fence run is "+repF+" m long, for a small backyard garden. Is this reasonable?",
    {t:"No: a small backyard fence run is in the tens of metres at most, so "+repF+" m is far too large", fb:"Correct: the value does not fit the setting."},
    [{t:"Yes: backyard fences are usually hundreds of metres long, so this value fits a small garden perfectly well", fb:"Compare with a referent: a backyard is tens of metres across, not hundreds."},{t:"Yes: a bigger number always means a better, more careful measurement was taken on site", fb:"Size of the number says nothing without a fit check."},{t:"No: a fence run cannot be longer than 5 m in any backyard, so the report must be wrong", fb:"Many backyard runs are longer than 5 m: the reported value is too large, but not by that test."}],
    "A small backyard fence run is roughly "+run+" m scale, in the tens of metres. "+repF+" m is far too large. The judgement is <b>no, it is not reasonable</b>.", {mode:mode, run:run});
}, ["Compare the answer with a familiar referent or a rough check calculation.", "Ask whether the size of the answer fits the object being measured."]);
E("u2-cr-perim", 2, ["3.20"], 2, "gen", function(){
  var L=ri(4,18), W=ri(3,12); var P=2*(L+W);
  var ctx=pick(["rectangular garden","rectangular parking pad","rectangular rug","rectangular bulletin board"]);
  var q=numq("Find the perimeter of a "+ctx+" that is \\("+L+"\\ \\text{m}\\) long and \\("+W+"\\ \\text{m}\\) wide. Give the answer in metres.", P, 0.01,
    "Add both lengths and both widths. \\[ \\begin{aligned} P &= 2L + 2W \\\\ &= 2("+L+") + 2("+W+") \\\\ &= "+P+"\\ \\text{m} \\end{aligned} \\] The answer is <b>"+P+" m</b>.",
    {L:L, W:W}); q.figure=u2RectFig(L,W); return q;
}, ["Perimeter is the distance all the way around.", "Use P = 2L + 2W with the given length and width."]);

E("u2-cr-circ", 2, ["2.3","3.20"], 2, "gen", function(){
  var r=ri(2,30); var C=Math.round(2*Math.PI*r*10)/10;
  var ctx=pick(["round rug","circular garden","round table top","circular fire pit"]);
  var q=numq("A "+ctx+" has a radius of \\("+r+"\\ \\text{m}\\). Find its circumference. Use \\(C = 2\\pi r\\). Round the answer to one decimal place, in metres.", C, 0.15,
    "Apply the circumference formula directly. \\[ \\begin{aligned} C &= 2\\pi r \\\\ &= 2\\pi("+r+") \\\\ &\\approx "+fmt(C,1)+"\\ \\text{m} \\end{aligned} \\] The answer is <b>"+fmt(C,1)+" m</b>.",
    {r:r}); q.figure=m12CircleSVG("r = "+r+" m"); return q;
}, ["Circumference is the distance around a circle.", "Substitute the radius into C = 2 pi r."]);

E("u2-cr-mid", 2, ["3.22"], 2, "gen", function(){
  var a=ri(8,60), gap=pick([20,24,30,36,40,48,54,60]); var b=a+gap; var mid=(a+b)/2;
  return numq("A tape on a wall shows one end of a window opening at \\("+a+"\\ \\text{cm}\\) and the other end at \\("+b+"\\ \\text{cm}\\). A bracket must go at the midpoint of the opening. At what tape reading, in centimetres, should the bracket go?", mid, 0.01,
    "Average the two end readings. \\[ \\begin{aligned} \\text{midpoint} &= \\frac{"+a+" + "+b+"}{2} \\\\ &= "+fmt(mid)+"\\ \\text{cm} \\end{aligned} \\] The answer is <b>"+fmt(mid)+" cm</b>.",
    {a:a, b:b});
}, ["The midpoint of two end readings is their average.", "Add the two readings, then divide by 2."]);

E("u2-cr-ship", 2, ["3.20","2.1"], 2, "gen", function(){
  var L=ri(25,60), W=ri(15,45), H=ri(10,35); var S=L+W+H;
  var ctx=pick(["A courier parcel","A boxed tool kit","A boxed plant order","A suitcase for air travel"]);
  var q=numq(ctx+" measures \\("+L+"\\ \\text{cm}\\) long, \\("+W+"\\ \\text{cm}\\) wide and \\("+H+"\\ \\text{cm}\\) high. Couriers and airlines use the size \\(L + W + H\\). Create the calculation for this parcel and find its size, in centimetres.", S, 0.01,
    "The shipping size formula adds the three measures. \\[ \\begin{aligned} L + W + H &= "+L+" + "+W+" + "+H+" \\\\ &= "+S+"\\ \\text{cm} \\end{aligned} \\] The answer is <b>"+S+" cm</b>.",
    {L:L, W:W, H:H}); q.figure=m12BoxSVG(L,W,H,"cm"); return q;
}, ["The shipping size is a sum, not a product.", "Add length, width and height."]);

E("u2-cr-formula-manip", 2, ["2.4"], 2, "gen", function(){
  var W=ri(3,12), L=W+ri(2,10); var P=2*(L+W);
  return numq("A rectangular pen has a perimeter of \\("+P+"\\ \\text{m}\\) and a width of \\("+W+"\\ \\text{m}\\). Find its length, in metres. Use \\(P = 2L + 2W\\), rearranged to solve for \\(L\\).", L, 0.01,
    "Rearrange the formula, then substitute. \\[ \\begin{aligned} L &= \\frac{P - 2W}{2} \\\\ &= \\frac{"+P+" - 2("+W+")}{2} \\\\ &= "+L+"\\ \\text{m} \\end{aligned} \\] The answer is <b>"+L+" m</b>.",
    {P:P, W:W});
}, ["The unknown is inside the formula, so rearrange before substituting.", "Subtract twice the width from the perimeter, then divide by 2."]);

E("u2-cr-convert", 2, ["3.7"], 2, "gen", function(){
  var pieces=[ri(2,9), ri(2,9), ri(2,9)]; var cms=pieces.map(function(p){ return p*10; });
  var totalCm=cms.reduce(function(s,x){ return s+x; },0); var totalM=totalCm/100;
  return numq("Three boards measure \\("+cms[0]+"\\ \\text{cm}\\), \\("+cms[1]+"\\ \\text{cm}\\) and \\("+cms[2]+"\\ \\text{cm}\\). Placed end to end, what is their total length in metres?", totalM, 0.01,
    "Add in centimetres first, then convert. \\[ \\begin{aligned} \\text{total} &= "+cms[0]+" + "+cms[1]+" + "+cms[2]+" = "+totalCm+"\\ \\text{cm} \\\\ &= "+totalCm+" \\div 100 = "+fmt(totalM)+"\\ \\text{m} \\end{aligned} \\] The answer is <b>"+fmt(totalM)+" m</b>.",
    {cms:cms});
}, ["Add the lengths in the same unit first.", "Divide the centimetre total by 100 to get metres."]);

E("u2-error-formula", 2, ["2.5","3.23"], 3, "gen", function(){
  var mode=pick(["perim","circ","ship"]);
  if(mode==="perim"){
    var L=ri(4,12), W=ri(3,9); var wrong=L*W, right=2*(L+W);
    return mcq("A student finds the perimeter of a rectangle "+L+" m by "+W+" m by multiplying: \\("+L+" \\times "+W+" = "+wrong+"\\ \\text{m}\\). What is the error, and what is the correct perimeter?",
      {t:"The student found area: perimeter adds the sides, giving "+right+" m", fb:"Correct: multiplication of length by width is area, and "+wrong+" sq m would also be far too large for this rectangle boundary."},
      [{t:"No error: multiplying length by width is how perimeter is found", fb:"Multiplying length by width gives area, not the distance around."},{t:"The error is only rounding: the correct perimeter is "+(wrong+2)+" m", fb:"The method itself is wrong, not the rounding: perimeter adds sides."},{t:"The student should have divided: the correct perimeter is "+fmt(Math.round(wrong/W*10)/10)+" m", fb:"Division does not give a boundary length here either."}],
      "Perimeter adds the sides, it does not multiply them, and a quick size check also rules out "+wrong+" m around this small rectangle. \\[ P = 2("+L+") + 2("+W+") = "+right+"\\ \\text{m} \\] The answer is <b>area was found instead of perimeter; correct perimeter "+right+" m</b>.",
      {mode:mode, L:L, W:W});
  }
  if(mode==="circ"){
    var r=pick([4,5,6,8,10]); var wrong=Math.round(Math.PI*r*10)/10, right=Math.round(2*Math.PI*r*10)/10;
    return mcq("A student finds the circumference of a circle with radius "+r+" cm as \\(\\pi \\times "+r+" \\approx "+fmt(wrong,1)+"\\ \\text{cm}\\). What is the error, and what is the correct circumference, to one decimal place?",
      {t:"The student used pi times radius: circumference is 2 pi r, giving about "+fmt(right,1)+" cm", fb:"Correct: the factor 2 is missing, and the result was also about half a sensible circumference."},
      [{t:"No error at all: pi times the radius is exactly how circumference is found", fb:"That formula gives only half the circumference: the full formula is 2 pi r."},{t:"The error is using pi at all: the correct circumference is the diameter, "+(2*r)+" cm", fb:"That is the diameter, not the distance around the circle."},{t:"The student should have squared the radius: the correct value is about "+fmt(Math.round(Math.PI*r*r*10)/10,1)+" cm", fb:"Squaring the radius belongs to the area formula, not circumference."}],
      "The circumference formula needs the factor 2. \\[ C = 2\\pi("+r+") \\approx "+fmt(right,1)+"\\ \\text{cm} \\] The answer is <b>missing factor 2; correct circumference about "+fmt(right,1)+" cm</b>.",
      {mode:mode, r:r});
  }
  var L=ri(20,50), W=ri(15,40), H=ri(10,30); var wrongP=L*W*H, rightS=L+W+H;
  return mcq("A student finds the shipping size of a parcel "+L+" cm by "+W+" cm by "+H+" cm by multiplying all three measures, getting "+wrongP+" cm. What is the error, and what is the correct shipping size?",
    {t:"The student found volume: shipping size adds the measures, giving "+rightS+" cm", fb:"Correct: L + W + H is a sum, and "+wrongP+" cm is wildly unreasonable as a parcel size sum."},
    [{t:"No error: shipping size is found by multiplying the three measures", fb:"Multiplying gives volume in cubic units, not the shipping size sum."},{t:"The error is in the units only: the correct shipping size is "+wrongP+" m", fb:"Changing units does not fix the operation: the rule adds the three measures."},{t:"The student should have averaged the measures: the correct size is "+fmt(Math.round(rightS/3*10)/10)+" cm", fb:"Averaging divides the sum by 3, which the shipping rule does not do."}],
    "Shipping size is the sum L + W + H. \\[ "+L+" + "+W+" + "+H+" = "+rightS+"\\ \\text{cm} \\] The answer is <b>volume was found instead of the size sum; correct size "+rightS+" cm</b>.",
    {mode:mode, L:L, W:W, H:H});
}, ["Compare the student method with the correct formula for that measure.", "Name the wrong operation first, then redo the calculation with the right formula."]);

E("u2-create-formula", 2, ["2.1","2.4"], 3, "gen", function(){
  var gate=pick([0.8,1,1.2,1.5,2]); var W=ri(4,10); var L=W+ri(3,9); var fence=2*(L+W)-gate;
  var gateTxt=fmt(gate);
  var ds=[
    {t:fmt(2*(L+W)), fb:"That is the full perimeter: the gate opening needs no fencing, so it must be subtracted."},
    {t:fmt(L*W), fb:"That is the area of the yard, not a length of fence."},
    {t:fmt(2*(L+W)+gate), fb:"The gate length should be subtracted from the perimeter, not added."}
  ];
  return mcq("A yard is "+L+" m long and "+W+" m wide. Fencing goes all around except for a gate opening "+gateTxt+" m wide. Which amount of fencing, in metres, is needed?",
    {t:fmt(fence), fb:"Correct: build the perimeter formula, then subtract the gate opening."}, ds,
    "Create the problem from the perimeter formula with the gate removed. \\[ \\begin{aligned} \\text{fence} &= 2L + 2W - \\text{gate} \\\\ &= 2("+L+") + 2("+W+") - "+gateTxt+" \\\\ &= "+fmt(fence)+"\\ \\text{m} \\end{aligned} \\] The answer is <b>"+fmt(fence)+" m</b>.",
    {L:L, W:W, gate:gate});
}, ["Start from the full boundary, then adjust for the part that is left open.", "Find the perimeter first, then subtract the gate width."]);

E("u2-diameter-fig", 2, ["3.16","3.20"], 3, "gen", function(){
  var wall=pick([0.5,1,1.5,2,2.5,3]); var od=ri(10,32); var idd=od-2*wall;
  var ds=[
    {t:fmt(od-wall), fb:"That subtracts the wall only once: the wall appears on both sides of the opening."},
    {t:fmt(od), fb:"That is the outside diameter, not the inside opening."},
    {t:fmt(od-4*wall), fb:"That subtracts the wall four times: it appears twice across a diameter."}
  ];
  var bo=balOpts({t:fmt(idd), fb:"Correct: subtract the wall thickness on both sides of the opening."}, ds);
  var q=mcq("The diagram shows the end of a pipe. The outside diameter is "+fmt(od)+" cm and the wall is "+fmt(wall)+" cm thick all around. What is the inside diameter of the pipe, in centimetres? Inside diameter is the width of the opening.",
    bo[0], bo[1],
    "Across a diameter, the wall is crossed twice. \\[ \\begin{aligned} \\text{inside diameter} &= "+fmt(od)+" - 2("+fmt(wall)+") \\\\ &= "+fmt(idd)+"\\ \\text{cm} \\end{aligned} \\] The answer is <b>"+fmt(idd)+" cm</b>.",
    {od:od, wall:wall});
  q.figure=u2CirclesFig(od, idd);
  return q;
}, ["Picture a line straight across the opening: it crosses the wall twice.", "Subtract twice the wall thickness from the outside diameter."]);

E("u2-cr-estimate", 2, ["3.18","3.19"], 3, "gen", function(){
  var scenes=[
    {obj:"length of a school gym", ref:"metre stick", per:1, unit:"m"},
    {obj:"height of a flagpole, counted in storeys of about 3 m each", ref:"storey", per:3, unit:"m"},
    {obj:"width of a river bank path, counted in strides of about 0.8 m each", ref:"stride", per:0.8, unit:"m"}
  ];
  var s=pick(scenes); var n=ri(6,25); var ans=Math.round(n*s.per*10)/10;
  return numq("Estimate the "+s.obj+". It measures about "+n+" "+(s.per===1?"metre sticks":s.ref+"s")+" long. "+(s.per===1?"One metre stick is 1 m.":"One "+s.ref+" is about "+fmt(s.per)+" m.")+" Give the estimate in metres.", ans, Math.max(0.6, ans*0.15),
    "Multiply the count by the size of one referent. \\[ "+n+" \\times "+fmt(s.per)+" = "+fmt(ans)+"\\ \\text{m} \\] The answer is <b>about "+fmt(ans)+" m</b>. Estimates within a reasonable range of this value are accepted.",
    {n:n, per:s.per});
}, ["An estimate is a count of referents times the size of one referent.", "Multiply how many referents fit by the length of one."]);

E("u2-cr-error", 2, ["2.5","2.4"], 3, "gen", function(){
  var d=pick([4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,36,40]); var ctxD=pick(["circular mat","round rug","circular table top","round garden bed"]); var wrong=Math.round(Math.PI*d*d*10)/10; var right=Math.round(Math.PI*d*10)/10;
  return numq("A student was asked for the circumference of a "+ctxD+" with diameter "+d+" m. The student calculated \\(\\pi \\times "+d+"^2\\) and got about "+fmt(wrong,1)+" m. That method is wrong. Give the correct circumference, to one decimal place, in metres.", right, 0.15,
    "Squaring the diameter belongs to an area style calculation. Circumference uses the diameter once. \\[ \\begin{aligned} C &= \\pi d \\\\ &= \\pi("+d+") \\\\ &\\approx "+fmt(right,1)+"\\ \\text{m} \\end{aligned} \\] The answer is <b>"+fmt(right,1)+" m</b>.",
    {d:d});
}, ["Check which formula the student used against the formula the question needs.", "Circumference is pi times the diameter, with no squaring."]);

/* ----- bank-u3.js ----- */
// Math 1202 Unit 3 Measuring Area question bank
// Figures (added Nov 2026): circle, triangle, tiled floor, painted
// wall, missing dimension and dimension change entries draw
// labelled figures from each question's own values. Referent,
// unit choice, conversion, error spotting and problem creation
// entries stay figureless: they name no single measured shape.
// Cut verbatim from the standalone bank source
// (math-1202-review/bank-src.js, lines 1486 to 2051).
// CRMARKS: u3-cr-triangle=2
// CRMARKS: u3-cr-circle=2
// CRMARKS: u3-cr-tiles=2
// CRMARKS: u3-cr-cylinder-sa=3
// CRMARKS: u3-cr-cone-sa=3
// CRMARKS: u3-cr-paint=3
// CRMARKS: u3-cr-design-width=2
// CRMARKS: u3-cr-house-composite=3
/* ===== Unit 3 ===== */
// Unit 3 Measuring Area - Math 1202 Review bank
// Helpers prefixed u3.
function u3UniqText(arr){ var s={}, i; for(i=0;i<arr.length;i++){ if(s[arr[i]]) return false; s[arr[i]]=1; } return true; }
function u3GridFig(cols, rows, triBase, unit){
  var cell=26, W=(cols+triBase)*cell+50, H=rows*cell+46, ox=24, oy=16, s="", i, j;
  s+='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Shaded rectangle with a shaded triangle on a square grid">';
  s+='<rect x="'+ox+'" y="'+oy+'" width="'+(cols*cell)+'" height="'+(rows*cell)+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  var tx=ox+cols*cell;
  s+='<polygon points="'+tx+','+(oy+rows*cell)+' '+(tx+triBase*cell)+','+(oy+rows*cell)+' '+tx+','+oy+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  for(i=0;i<=cols;i++){ s+='<line x1="'+(ox+i*cell)+'" y1="'+oy+'" x2="'+(ox+i*cell)+'" y2="'+(oy+rows*cell)+'" stroke="'+FIG_INK+'" stroke-width="0.7"/>'; }
  for(j=0;j<=rows;j++){ s+='<line x1="'+ox+'" y1="'+(oy+j*cell)+'" x2="'+(ox+cols*cell)+'" y2="'+(oy+j*cell)+'" stroke="'+FIG_INK+'" stroke-width="0.7"/>'; }
  s+='<text x="'+(ox+cols*cell/2)+'" y="'+(oy+rows*cell+18)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">'+cols+' squares</text>';
  s+='<text x="'+(ox-6)+'" y="'+(oy+rows*cell/2)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="end">'+rows+'</text>';
  s+='<text x="'+(tx+triBase*cell/2)+'" y="'+(oy+rows*cell+18)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">tri '+triBase+'</text>';
  s+='<text x="'+(W/2)+'" y="'+(H-2)+'" font-size="11" fill="'+FIG_INK+'" text-anchor="middle">Each grid square is 1 '+unit+' by 1 '+unit+'</text>';
  return s+'</svg>';
}
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
function u3ConeFig(r,sl,unit){
  var s='<svg viewBox="0 0 220 190" width="220" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Right cone">';
  s+='<polygon points="110,28 52,142 168,142" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<ellipse cx="110" cy="142" rx="58" ry="14" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="110" y1="142" x2="168" y2="142" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+='<text x="140" y="162" font-size="13" fill="'+FIG_INK+'" text-anchor="middle">r = '+r+' '+unit+'</text>';
  s+='<text x="176" y="82" font-size="13" fill="'+FIG_INK+'" text-anchor="start">slant = '+sl+' '+unit+'</text>';
  return s+'</svg>';
}
function u3HouseFig(w,h,th,unit){
  var sc=15, W=w*sc+56, H=(h+th)*sc+46, ox=28, base=16+(h+th)*sc, yRoof=16+th*sc, s="", i;
  s+='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="House shaped figure on a faint grid">';
  for(i=1;i<w;i++){ s+='<line x1="'+(ox+i*sc)+'" y1="16" x2="'+(ox+i*sc)+'" y2="'+base+'" stroke="'+FIG_INK+'" stroke-width="0.5" opacity="0.45"/>'; }
  for(i=1;i<h+th;i++){ s+='<line x1="'+ox+'" y1="'+(16+i*sc)+'" x2="'+(ox+w*sc)+'" y2="'+(16+i*sc)+'" stroke="'+FIG_INK+'" stroke-width="0.5" opacity="0.45"/>'; }
  s+='<polygon points="'+ox+','+base+' '+(ox+w*sc)+','+base+' '+(ox+w*sc)+','+yRoof+' '+(ox+w*sc/2)+',16 '+ox+','+yRoof+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<text x="'+(ox+w*sc/2)+'" y="'+(base+18)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">width '+w+' '+unit+'</text>';
  s+='<text x="'+(ox+w*sc+6)+'" y="'+(yRoof+h*sc/2)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="start">wall '+h+' '+unit+'</text>';
  s+='<text x="'+(ox-6)+'" y="'+(16+th*sc/2)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="end">roof '+th+'</text>';
  return s+'</svg>';
}

function u3TileFig(L,W){
  var cell=Math.min(215/L,118/W), ox=42, oy=24, s='<svg viewBox="0 0 320 185" width="320" height="185" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rectangular floor tiled with square tiles">';
  s+='<rect x="'+ox+'" y="'+oy+'" width="'+fmt(L*cell,1)+'" height="'+fmt(W*cell,1)+'" fill="'+FIG_SHADE+'" fill-opacity="0.35" stroke="'+FIG_INK+'" stroke-width="2"/>';
  for(var i=1;i<L/2;i++){ var x=ox+i*2*cell; s+='<line x1="'+fmt(x,1)+'" y1="'+oy+'" x2="'+fmt(x,1)+'" y2="'+fmt(oy+W*cell,1)+'" stroke="'+FIG_INK+'" stroke-width="1.2"/>'; }
  for(var j=1;j<W/2;j++){ var y=oy+j*2*cell; s+='<line x1="'+ox+'" y1="'+fmt(y,1)+'" x2="'+fmt(ox+L*cell,1)+'" y2="'+fmt(y,1)+'" stroke="'+FIG_INK+'" stroke-width="1.2"/>'; }
  s+=_txt(ox+L*cell/2,oy+W*cell+17,L+" ft",12.5,false);
  s+=_txt(ox+L*cell+20,oy+W*cell/2,W+" ft",12.5,false);
  return s+'</svg>';
}
function u3PaintFig(W,H,ww,wh){
  var sc=Math.min(215/W,115/H), ox=42, oy=26, wx=ox+(W-ww)*sc/2, wy=oy+(H-wh)*sc/2;
  var s='<svg viewBox="0 0 320 190" width="320" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Wall with one window that will not be painted">';
  s+='<rect x="'+ox+'" y="'+oy+'" width="'+fmt(W*sc,1)+'" height="'+fmt(H*sc,1)+'" fill="'+FIG_SHADE+'" fill-opacity="0.35" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<rect x="'+fmt(wx,1)+'" y="'+fmt(wy,1)+'" width="'+fmt(ww*sc,1)+'" height="'+fmt(wh*sc,1)+'" fill="#ffffff" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  s+=_txt(wx+ww*sc/2,wy+wh*sc/2,ww+" m by "+wh+" m",11.5,false);
  s+=_txt(ox+W*sc/2,oy+H*sc+17,W+" m",12.5,false);
  s+=_txt(ox+W*sc+18,oy+H*sc/2,H+" m",12.5,false);
  return s+'</svg>';
}
function u3RectPairFig(l,w,nl,nw){
  function rect(x0,l2,w2,lab){
    var sc=Math.min(118/Math.max(l2,1),92/Math.max(w2,1)), rw=l2*sc, rh=w2*sc, y0=148-rh;
    var out='<rect x="'+x0+'" y="'+fmt(y0,1)+'" width="'+fmt(rw,1)+'" height="'+fmt(rh,1)+'" fill="'+FIG_SHADE+'" fill-opacity="0.30" stroke="'+FIG_INK+'" stroke-width="2"/>';
    out+=_txt(x0+rw/2,164,lab,12,false);
    return out;
  }
  var s='<svg viewBox="0 0 320 185" width="320" height="185" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Original rectangle and changed rectangle">';
  s+=rect(28,l,w,l+" m by "+w+" m");
  s+=rect(178,nl,nw,nl+" m by "+nw+" m");
  return s+'</svg>';
}

/* ---------- Level 1 ---------- */
E("u3-referents", 3, ["3.24","3.28"], 1, "var", varset([
  function(){ return mcq("Which object is a good referent for an area of \\(1\\ \\text{m}^2\\)?",
    {t:"A small square tabletop, about 1 m by 1 m", fb:"Yes: 1 m by 1 m gives an area of 1 square metre."},
    [{t:"A postage stamp", fb:"A stamp is closer to a few square centimetres, far smaller than 1 square metre."},
     {t:"A sheet of loose leaf paper", fb:"A sheet of paper is only about 600 square centimetres, well under 1 square metre."},
     {t:"The floor of a whole classroom", fb:"A classroom floor is many square metres, far larger than the referent asked for."}],
    "A referent is a familiar object with about the stated size. A tabletop about \\(1\\ \\text{m} \\times 1\\ \\text{m}\\) has area \\(1\\ \\text{m}^2\\). The answer is <b>a small square tabletop, about 1 m by 1 m</b>.", {}); },
  function(){ return mcq("Which object is a good referent for an area of \\(1\\ \\text{cm}^2\\)?",
    {t:"A thumbnail", fb:"Yes: a thumbnail is about 1 cm by 1 cm."},
    [{t:"A floor tile in a hallway", fb:"A floor tile is hundreds of square centimetres, far larger than 1 square centimetre."},
     {t:"The cover of a textbook", fb:"A textbook cover is hundreds of square centimetres, far larger than the referent asked for."},
     {t:"A bath towel spread out flat", fb:"A towel is close to a square metre, far larger than 1 square centimetre."}],
    "A thumbnail is about \\(1\\ \\text{cm} \\times 1\\ \\text{cm} = 1\\ \\text{cm}^2\\). The answer is <b>a thumbnail</b>.", {}); },
  function(){ return mcq("Which object is a good referent for an area of \\(1\\ \\text{ft}^2\\)?",
    {t:"A floor tile 12 in. by 12 in.", fb:"Yes: 12 in. is 1 ft, so the tile is 1 ft by 1 ft."},
    [{t:"A postage stamp", fb:"A stamp is a few square inches, far smaller than 1 square foot."},
     {t:"A sheet of loose leaf paper", fb:"A sheet of paper is under 1 square foot and is not the standard tile referent here."},
     {t:"A double bed mattress top", fb:"A mattress top is many square feet, far larger than the referent asked for."}],
    "\\(12\\ \\text{in.} = 1\\ \\text{ft}\\), so a tile \\(1\\ \\text{ft} \\times 1\\ \\text{ft}\\) has area \\(1\\ \\text{ft}^2\\). The answer is <b>a floor tile 12 in. by 12 in.</b>", {}); },
  function(){ return mcq("Which object is a good referent for an area of \\(1\\ \\text{in}^2\\)?",
    {t:"A postage stamp", fb:"Yes: a stamp is about 1 in. by 1 in."},
    [{t:"A fingernail clipping tray", fb:"That tray is not a standard small referent; it is much wider than 1 inch across its full top."},
     {t:"The top of a coffee mug", fb:"A mug top is several inches across, so its area is many square inches."},
     {t:"A place mat on a table", fb:"A place mat is hundreds of square inches, far larger than the referent asked for."}],
    "A postage stamp is about \\(1\\ \\text{in.} \\times 1\\ \\text{in.} = 1\\ \\text{in}^2\\). The answer is <b>a postage stamp</b>.", {}); },
  function(){ return mcq("A worker measures the area of a classroom floor. Which unit is the best fit?",
    {t:"Square metres", fb:"Yes: classroom floors are measured in square metres."},
    [{t:"Square centimetres", fb:"Square centimetres suit small faces, like a sticky note; the count for a floor would be huge."},
     {t:"Square millimetres", fb:"Square millimetres suit tiny faces; the count for a floor would be enormous."},
     {t:"Square kilometres", fb:"Square kilometres suit very large land areas, not one room."}],
    "Choose the unit that gives a sensible count for the size of the surface. A classroom floor fits <b>square metres</b>.", {}); },
  function(){ return mcq("A farmer measures the area of a large field. Which unit is the best fit?",
    {t:"Hectares", fb:"Yes: fields are commonly measured in hectares."},
    [{t:"Square inches", fb:"Square inches suit tiny faces; the count for a field would be enormous."},
     {t:"Square centimetres", fb:"Square centimetres suit small faces, like a phone screen; the count for a field would be huge."},
     {t:"Square feet", fb:"Square feet suit rooms and decks; a large field is usually reported in hectares or acres."}],
    "Choose the unit that gives a sensible count for the size of the surface. A large field fits <b>hectares</b>.", {}); }
]), ["Think of a familiar object with about that area.", "Picture the object and compare its length and width with the unit."]);

E("u3-estimate-referent", 3, ["3.25","3.24"], 1, "gen", function(){
  var items=[
    {name:"floor tiles", ref:900, unit:"cm", surf:"a bathroom floor", refName:"each tile is about 30 cm by 30 cm, or 900 square centimetres"},
    {name:"sheets of paper", ref:600, unit:"cm", surf:"a bulletin board", refName:"each sheet is about 600 square centimetres"},
    {name:"floor tiles", ref:1, unit:"ft", surf:"a small porch", refName:"each tile is about 1 square foot"},
    {name:"place mats", ref:1200, unit:"cm", surf:"a long table top", refName:"each mat is about 1200 square centimetres"},
    {name:"square paving stones", ref:1, unit:"ft", surf:"a garden path", refName:"each stone is about 1 square foot"},
    {name:"foam mats", ref:2500, unit:"cm", surf:"a play area floor", refName:"each mat is about 50 cm by 50 cm, or 2500 square centimetres"}
  ];
  var it=pick(items), n=ri(4,24), ans=n*it.ref, u2=it.unit+"^2";
  var d1=Math.max(1,n-3)*it.ref, d2=ans*2, d3=Math.round(ans/2);
  if(d3===ans||d3===d1) d3=ans+it.ref;
  return mcq("A "+it.surf+" is covered by about "+n+" "+it.name+", with no gaps. "+it.refName+". Which is the best estimate of the area of the "+it.surf.split(" ").slice(1).join(" ")+"?",
    {t:fmt(ans)+" \\(\\text{"+it.unit+"}^2\\)", fb:"Yes: multiply the count by the area of one referent."},
    [{t:fmt(d1)+" \\(\\text{"+it.unit+"}^2\\)", fb:"That count is too low: it uses fewer referents than the number covering the surface."},
     {t:fmt(d2)+" \\(\\text{"+it.unit+"}^2\\)", fb:"That doubles the estimate: the referents are counted once, not twice."},
     {t:fmt(d3)+" \\(\\text{"+it.unit+"}^2\\)", fb:"That is about half the estimate: each referent still covers its full area."}],
    "Multiply the number of referents by the area of one referent: \\["+n+" \\times "+fmt(it.ref)+" = "+fmt(ans)+"\\] The best estimate is <b>"+fmt(ans)+" square "+(it.unit==="cm"?"centimetres":"feet")+"</b>.",
    {n:n, ref:it.ref});
}, ["Use the referent: total area is the count times the area of one referent.", "Write the count and the area of one tile, sheet, mat or stone, then multiply."]);

E("u3-choose-unit", 3, ["3.28"], 1, "var", varset([
  function(){ return mcq("Which unit best fits the area of a sticky note?",
    {t:"Square centimetres", fb:"Yes: a sticky note face is a small area, well suited to square centimetres."},
    [{t:"Square metres", fb:"Square metres suit floors and walls; a sticky note would be a tiny fraction of one."},
     {t:"Square kilometres", fb:"Square kilometres suit land areas, not a small note."},
     {t:"Hectares", fb:"Hectares suit fields and large lots, not a small note."}],
    "Match the unit to the size of the surface. A sticky note fits <b>square centimetres</b>.", {}); },
  function(){ return mcq("Which unit best fits the area of a kitchen floor?",
    {t:"Square feet", fb:"Yes: kitchen floors are commonly measured in square feet."},
    [{t:"Square inches", fb:"Square inches suit small faces; the count for a floor would be very large."},
     {t:"Square yards", fb:"Square yards are used for some flooring, but kitchen floors in home projects are most often given in square feet."},
     {t:"Square miles", fb:"Square miles suit very large land areas, not one room."}],
    "Match the unit to the size of the surface. A kitchen floor fits <b>square feet</b>.", {}); },
  function(){ return mcq("Which unit best fits the area of the screen of a phone?",
    {t:"Square inches", fb:"Yes: a phone screen is a small area, well suited to square inches."},
    [{t:"Square feet", fb:"Square feet suit tiles and small floors; a screen would be a small fraction of one."},
     {t:"Square yards", fb:"Square yards suit fabric and carpet areas, far larger than a screen."},
     {t:"Acres", fb:"Acres suit land, not a small screen."}],
    "Match the unit to the size of the surface. A phone screen fits <b>square inches</b>.", {}); },
  function(){ return mcq("Which unit best fits the area of a school gym floor?",
    {t:"Square metres", fb:"Yes: a gym floor is a large indoor surface, well suited to square metres."},
    [{t:"Square millimetres", fb:"Square millimetres suit tiny faces; the count for a gym floor would be enormous."},
     {t:"Square centimetres", fb:"Square centimetres suit small faces; the count for a gym floor would be very large."},
     {t:"Square kilometres", fb:"Square kilometres suit regions and large land areas, not one building floor."}],
    "Match the unit to the size of the surface. A gym floor fits <b>square metres</b>.", {}); },
  function(){ return mcq("Which unit best fits the area of a sheet of plywood?",
    {t:"Square feet", fb:"Yes: a plywood sheet is sold and measured by its face area in square feet."},
    [{t:"Square inches", fb:"Square inches suit small faces; the count for a full sheet would be large and awkward."},
     {t:"Acres", fb:"Acres suit land, not a building sheet."},
     {t:"Square miles", fb:"Square miles suit very large land areas, not a building sheet."}],
    "Match the unit to the size of the surface. A plywood sheet fits <b>square feet</b>.", {}); },
  function(){ return mcq("Which unit best fits the area of a vegetable garden plot?",
    {t:"Square metres", fb:"Yes: a garden plot is a modest outdoor area, well suited to square metres."},
    [{t:"Square millimetres", fb:"Square millimetres suit tiny faces; the count for a garden would be enormous."},
     {t:"Square kilometres", fb:"Square kilometres suit large land areas, far bigger than a garden plot."},
     {t:"Hectares", fb:"Hectares suit farm fields; a home garden plot is much smaller."}],
    "Match the unit to the size of the surface. A garden plot fits <b>square metres</b>.", {}); }
]), ["Match the unit size to the size of the surface.", "Rule out units that would give a huge count or a tiny fraction for this surface."]);

E("u3-si-convert", 3, ["3.29"], 1, "gen", function(){
  var mode=pick(["m2cm","cm2mm","cm2m"]);
  if(mode==="m2cm"){ var v=ri(2,18), ans=v*10000;
    return mcq("Write \\("+v+"\\ \\text{m}^2\\) in square centimetres.",
      {t:fmt(ans)+" \\(\\text{cm}^2\\)", fb:"Yes: 1 square metre is 10 000 square centimetres."},
      [{t:fmt(v*100)+" \\(\\text{cm}^2\\)", fb:"That uses the linear factor 100. Areas use the squared factor, 10 000."},
       {t:fmt(v*1000)+" \\(\\text{cm}^2\\)", fb:"That uses 1000, the cubic factor. Areas use 10 000 here."},
       {t:fmt(v*10)+" \\(\\text{cm}^2\\)", fb:"That is far too small: each square metre holds 10 000 square centimetres."}],
      "\\[ \\begin{aligned} "+v+"\\ \\text{m}^2 &= "+v+" \\times 10000\\ \\text{cm}^2 \\\\ &= "+fmt(ans)+"\\ \\text{cm}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans)+" square centimetres</b>.", {mode:mode,v:v}); }
  if(mode==="cm2mm"){ var v2=ri(3,40), ans2=v2*100;
    return mcq("Write \\("+v2+"\\ \\text{cm}^2\\) in square millimetres.",
      {t:fmt(ans2)+" \\(\\text{mm}^2\\)", fb:"Yes: 1 square centimetre is 100 square millimetres."},
      [{t:fmt(v2*10)+" \\(\\text{mm}^2\\)", fb:"That uses the linear factor 10. Areas use the squared factor, 100."},
       {t:fmt(v2*1000)+" \\(\\text{mm}^2\\)", fb:"That is ten times too large: the squared factor from centimetres to millimetres is 100."},
       {t:fmt(v2)+" \\(\\text{mm}^2\\)", fb:"The value must change: square millimetres are smaller units, so the count grows."}],
      "\\[ \\begin{aligned} "+v2+"\\ \\text{cm}^2 &= "+v2+" \\times 100\\ \\text{mm}^2 \\\\ &= "+fmt(ans2)+"\\ \\text{mm}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans2)+" square millimetres</b>.", {mode:mode,v:v2}); }
  var k=ri(2,15), v3=k*10000, ans3=k;
  return mcq("Write \\("+fmt(v3)+"\\ \\text{cm}^2\\) in square metres.",
    {t:fmt(ans3)+" \\(\\text{m}^2\\)", fb:"Yes: divide by 10 000 to move to the larger unit."},
    [{t:fmt(v3/100)+" \\(\\text{m}^2\\)", fb:"That divides by the linear factor 100. Areas use the squared factor, 10 000."},
     {t:fmt(v3/1000)+" \\(\\text{m}^2\\)", fb:"That divides by 1000. Areas use the squared factor, 10 000."},
     {t:fmt(v3*10000)+" \\(\\text{m}^2\\)", fb:"That multiplies, but moving to a larger unit makes the count smaller, not larger."}],
    "\\[ \\begin{aligned} "+fmt(v3)+"\\ \\text{cm}^2 &= "+fmt(v3)+" \\div 10000\\ \\text{m}^2 \\\\ &= "+fmt(ans3)+"\\ \\text{m}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans3)+" square metres</b>.", {mode:mode,v:v3});
}, ["Area conversions use squared factors, not the linear factors.", "For metres to centimetres, the area factor is 100 squared, which is 10 000."]);

E("u3-imperial-convert", 3, ["3.30"], 1, "gen", function(){
  var mode=pick(["ft2in","yd2ft","ft2yd"]);
  if(mode==="ft2in"){ var v=ri(2,30), ans=v*144;
    return mcq("Write \\("+v+"\\ \\text{ft}^2\\) in square inches.",
      {t:fmt(ans)+" \\(\\text{in}^2\\)", fb:"Yes: 1 square foot is 144 square inches."},
      [{t:fmt(v*12)+" \\(\\text{in}^2\\)", fb:"That uses the linear factor 12. Areas use the squared factor, 144."},
       {t:fmt(v*24)+" \\(\\text{in}^2\\)", fb:"That doubles the linear factor. Areas use the squared factor, 144."},
       {t:fmt(v*100)+" \\(\\text{in}^2\\)", fb:"100 is an SI-style factor. For feet to inches the squared factor is 144."}],
      "\\[ \\begin{aligned} "+v+"\\ \\text{ft}^2 &= "+v+" \\times 144\\ \\text{in}^2 \\\\ &= "+fmt(ans)+"\\ \\text{in}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans)+" square inches</b>.", {mode:mode,v:v}); }
  if(mode==="yd2ft"){ var v2=ri(2,30), ans2=v2*9;
    return mcq("Write \\("+v2+"\\ \\text{yd}^2\\) in square feet.",
      {t:fmt(ans2)+" \\(\\text{ft}^2\\)", fb:"Yes: 1 square yard is 9 square feet."},
      [{t:fmt(v2*3)+" \\(\\text{ft}^2\\)", fb:"That uses the linear factor 3. Areas use the squared factor, 9."},
       {t:fmt(v2*6)+" \\(\\text{ft}^2\\)", fb:"That doubles the linear factor. Areas use the squared factor, 9."},
       {t:fmt(v2*36)+" \\(\\text{ft}^2\\)", fb:"36 is the squared factor for yards to inches. For yards to feet it is 9."}],
      "\\[ \\begin{aligned} "+v2+"\\ \\text{yd}^2 &= "+v2+" \\times 9\\ \\text{ft}^2 \\\\ &= "+fmt(ans2)+"\\ \\text{ft}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans2)+" square feet</b>.", {mode:mode,v:v2}); }
  var k=ri(2,30), v3=k*9, ans3=k;
  return mcq("Write \\("+v3+"\\ \\text{ft}^2\\) in square yards.",
    {t:fmt(ans3)+" \\(\\text{yd}^2\\)", fb:"Yes: divide by 9 to move to the larger unit."},
    [{t:fmt(v3/3)+" \\(\\text{yd}^2\\)", fb:"That divides by the linear factor 3. Areas use the squared factor, 9."},
     {t:fmt(v3*9)+" \\(\\text{yd}^2\\)", fb:"That multiplies, but moving to a larger unit makes the count smaller."},
     {t:fmt(v3)+" \\(\\text{yd}^2\\)", fb:"The value must change: square yards are larger units, so the count drops."}],
    "\\[ \\begin{aligned} "+v3+"\\ \\text{ft}^2 &= "+v3+" \\div 9\\ \\text{yd}^2 \\\\ &= "+fmt(ans3)+"\\ \\text{yd}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans3)+" square yards</b>.", {mode:mode,v:v3});
}, ["Area conversions use squared factors, not the linear factors.", "For feet to inches, the area factor is 12 squared, which is 144."]);

/* ---------- Level 2 MC ---------- */
E("u3-estimate-object", 3, ["3.25","3.27"], 2, "gen", function(){
  var ctxs=[
    {obj:"rug", unit:"ft", cover:"square floor tiles, each 1 ft by 1 ft"},
    {obj:"patio", unit:"ft", cover:"square paving stones, each 1 ft by 1 ft"},
    {obj:"classroom bulletin board", unit:"cm", cover:"sheets of paper laid edge to edge"},
    {obj:"garden bed", unit:"ft", cover:"square stepping stones, each 1 ft by 1 ft"},
    {obj:"table top", unit:"cm", cover:"square coasters laid edge to edge"},
    {obj:"play mat area", unit:"ft", cover:"square foam tiles, each 1 ft by 1 ft"}
  ];
  var c=pick(ctxs), L=0, W=0, ans=0, per=0, sum=0, dbl=0, g1=0;
  do { L=ri(3,11); W=ri(3,10); ans=L*W; per=2*(L+W); sum=L+W; dbl=ans*2; g1++; }
  while(g1<60 && !u3UniqText([String(ans),String(per),String(sum),String(dbl)]));
  return mcq("A "+c.obj+" is covered by about "+L+" rows of "+W+" "+c.cover+". Which estimate of its area is reasonable?",
    {t:"About "+fmt(ans)+" \\(\\text{"+c.unit+"}^2\\)", fb:"Yes: the covering count is the rows times the number in each row."},
    [{t:"About "+fmt(per)+" \\(\\text{"+c.unit+"}^2\\)", fb:"That is the distance around the edge, a perimeter, not the covering area."},
     {t:"About "+fmt(sum)+" \\(\\text{"+c.unit+"}^2\\)", fb:"That only adds the two counts. Area needs the counts multiplied."},
     {t:"About "+fmt(dbl)+" \\(\\text{"+c.unit+"}^2\\)", fb:"That doubles the covering count with no reason: each covering piece is counted once."}],
    "The covering pieces form about "+L+" rows of "+W+". \\[ "+L+" \\times "+W+" = "+fmt(ans)+" \\] The reasonable estimate is <b>about "+fmt(ans)+" square "+(c.unit==="ft"?"feet":"centimetres")+"</b>.",
    {L:L,W:W});
}, ["Count the covering pieces in rows, then multiply rows by pieces per row.", "Write the row count and the count in one row, then multiply them."]);

E("u3-grid-estimate", 3, ["3.26"], 2, "gen", function(){
  var w=0, h=0, b=0, unit=pick(["m","cm","ft"]), rect=0, tri=0, ans=0, fullOnly=0, countFull=0, per=0, g2=0;
  do { w=ri(3,6); h=ri(2,5); b=ri(1,3); rect=w*h; tri=b*h/2; ans=rect+tri; fullOnly=rect; countFull=rect+b*h; per=2*(w+h)+b; g2++; }
  while(g2<80 && !u3UniqText([fmt(ans),fmt(fullOnly),fmt(countFull),fmt(per)]));
  var q=mcq("The shaded shape sits on a square grid. Each grid square is 1 "+unit+" by 1 "+unit+". Estimate the area of the shaded shape.",
    {t:fmt(ans)+" \\(\\text{"+unit+"}^2\\)", fb:"Yes: count the full rectangle squares and add the triangle as half of its box."},
    [{t:fmt(fullOnly)+" \\(\\text{"+unit+"}^2\\)", fb:"That counts only the rectangle and leaves out the shaded triangle."},
     {t:fmt(countFull)+" \\(\\text{"+unit+"}^2\\)", fb:"That counts the triangle as a full rectangle. A triangle covers half of its box."},
     {t:fmt(per)+" \\(\\text{"+unit+"}^2\\)", fb:"That value comes from lengths around the shape, not from counting squares."}],
    "Count full squares in the rectangle, then add the triangle as half of its bounding box. \\[ \\begin{aligned} A &= ("+w+" \\times "+h+") + \\tfrac{1}{2}("+b+" \\times "+h+") \\\\ &= "+fmt(rect)+" + "+fmt(tri)+" \\\\ &= "+fmt(ans)+"\\ \\text{"+unit+"}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans)+" square units</b>.",
    {w:w,h:h,b:b});
  q.figure=u3GridFig(w,h,b,unit);
  return q;
}, ["Count full squares first, then deal with the partial squares.", "Find the rectangle part, then add the triangle as half of its box."]);

E("u3-reasonable-error", 3, ["3.27","2.5"], 2, "gen", function(){
  var l=ri(4,12), w=ri(3,9); if(w===l) w+=1;
  var area=l*w, type=pick(["perim","add","double"]);
  var ctx=pick(["a garden bed","a poster","a rug","a countertop","a deck section"]);
  var claim, errName, wrongFb;
  if(type==="perim"){ claim=2*(l+w); errName="found the perimeter, adding the sides around the edge"; }
  else if(type==="add"){ claim=l+w; errName="added the length and width instead of multiplying"; }
  else { claim=area*2; errName="multiplied correctly, then doubled the result with no reason"; }
  var alt1=l*(w+1), alt2=(l+1)*w;
  return mcq("A student finds the area of "+ctx+", "+l+" m by "+w+" m, and writes "+fmt(claim)+" \\(\\text{m}^2\\). Which judgement is correct?",
    {t:"The answer is wrong: the student "+errName+". The area is "+fmt(area)+" \\(\\text{m}^2\\).", fb:"Yes: that names the error and gives the corrected area."},
    [{t:"The answer is right: the student's working is correct, and "+fmt(claim)+" \\(\\text{m}^2\\) is the area of the surface.", fb:"That accepts the faulty working. Check how the value was produced."},
     {t:"The answer is wrong: the student "+errName+". The area is "+fmt(alt1)+" \\(\\text{m}^2\\).", fb:"The error is named correctly, but that area uses a width that is 1 m too large."},
     {t:"The answer is wrong: the area is the perimeter of the shape, "+fmt(2*(l+w))+" \\(\\text{m}^2\\), the distance around the edge.", fb:"Perimeter is a length, measured in metres, and it is not the area of the surface."}],
    "Area is length times width. \\[ \\begin{aligned} A &= "+l+" \\times "+w+" \\\\ &= "+fmt(area)+"\\ \\text{m}^2 \\end{aligned} \\] The student's value came from an error, so the judgement is <b>the answer is wrong and the area is "+fmt(area)+" square metres</b>.",
    {l:l,w:w,type:type});
}, ["First compute the area yourself, then compare it with the student's value.", "Find length times width, then look for how the student's value could have been produced."]);

E("u3-composite-area", 3, ["3.31"], 2, "gen", function(){
  var W1=0, H1=0, W2=0, H2=0, unit=pick(["m","ft"]), bottom=0, top=0, ans=0, bound=0, per=0, g3=0;
  do { W1=ri(6,10); H1=ri(3,5); W2=ri(2,4); H2=ri(2,4); if(W2>=W1) W2=W1-2; bottom=W1*H1; top=W2*H2; ans=bottom+top; bound=W1*(H1+H2); per=2*(W1+H1+H2); g3++; }
  while(g3<80 && !u3UniqText([String(ans),String(bound),String(bottom),String(per)]));
  var q=mcq("Find the area of the step shaped floor shown in the figure.",
    {t:fmt(ans)+" \\(\\text{"+unit+"}^2\\)", fb:"Yes: split the step into two rectangles and add their areas."},
    [{t:fmt(bound)+" \\(\\text{"+unit+"}^2\\)", fb:"That is the full bounding rectangle. The step is missing its top right corner, so that overcounts."},
     {t:fmt(bottom)+" \\(\\text{"+unit+"}^2\\)", fb:"That is only the bottom rectangle. The raised block on the left is also part of the floor."},
     {t:fmt(per)+" \\(\\text{"+unit+"}^2\\)", fb:"That value comes from adding side lengths, a perimeter style total, not an area."}],
    "Split the shape into a bottom rectangle and a top block, then add. \\[ \\begin{aligned} A &= ("+W1+" \\times "+H1+") + ("+W2+" \\times "+H2+") \\\\ &= "+fmt(bottom)+" + "+fmt(top)+" \\\\ &= "+fmt(ans)+"\\ \\text{"+unit+"}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans)+"</b>.",
    {W1:W1,H1:H1,W2:W2,H2:H2});
  q.figure=u3StepFig(W1,H1,W2,H2,unit);
  return q;
}, ["Split a composite shape into rectangles you can handle.", "Find the bottom rectangle first, then the raised block, then add."]);

E("u3-circle-area", 3, ["3.32","2.3"], 2, "gen", function(){
  var ctxs=["a round rug","a round pizza","a circular garden","a round trampoline mat","a circular clock face"];
  var ctx=pick(ctxs), r=ri(3,14), area=Math.PI*r*r, aTxt=fmtF(area,1);
  var circ=fmtF(2*Math.PI*r,1), diam=fmtF(Math.PI*(2*r)*(2*r),1), nosq=fmtF(Math.PI*r,1);
  var q=mcq("Find the area of "+ctx+" with radius "+r+" cm. Give the answer to the nearest tenth.",
    {t:aTxt+" \\(\\text{cm}^2\\)", fb:"Yes: area of a circle is pi times the radius squared."},
    [{t:circ+" \\(\\text{cm}^2\\)", fb:"That is the circumference, the distance around the circle, not the area it covers."},
     {t:diam+" \\(\\text{cm}^2\\)", fb:"That uses the diameter in place of the radius before squaring."},
     {t:nosq+" \\(\\text{cm}^2\\)", fb:"That multiplies pi by the radius once. The radius must be squared."}],
    "Use \\(A = \\pi r^2\\) with the radius given. \\[ \\begin{aligned} A &= \\pi ("+r+")^2 \\\\ &= "+fmtF(area,4)+"\\ldots \\\\ &\\approx "+aTxt+"\\ \\text{cm}^2 \\end{aligned} \\] The answer is <b>"+aTxt+" square centimetres</b>.",
    {r:r}); q.figure=m12CircleSVG("r = "+r+" cm"); return q;
}, ["For a circle, use pi times radius squared.", "Square the radius first, then multiply by pi."]);

E("u3-error-analysis", 3, ["2.5","3.32"], 2, "var", varset([
  function(){ return mcq("A student finds the area of a triangle with base 8 cm and height 6 cm, and writes \\(8 \\times 6 = 48\\ \\text{cm}^2\\). What is the correct area?",
    {t:"24 \\(\\text{cm}^2\\)", fb:"Yes: the student forgot to divide by 2."},
    [{t:"48 \\(\\text{cm}^2\\)", fb:"That is the student's value. A triangle is half of its bounding rectangle."},
     {t:"14 \\(\\text{cm}^2\\)", fb:"That adds the base and height. Area multiplies them, then halves."},
     {t:"28 \\(\\text{cm}^2\\)", fb:"That is the perimeter of the bounding rectangle, not the triangle area."}],
    "Correct the missing step. \\[ \\begin{aligned} A &= \\tfrac{1}{2}(8)(6) \\\\ &= 24\\ \\text{cm}^2 \\end{aligned} \\] The answer is <b>24 square centimetres</b>.", {}); },
  function(){ return mcq("A student finds the area of a circle with diameter 10 m, and writes \\(\\pi (10)^2 = 314.2\\ \\text{m}^2\\). What is the correct area, to the nearest tenth?",
    {t:"78.5 \\(\\text{m}^2\\)", fb:"Yes: the radius is 5 m, and the student used the diameter as the radius."},
    [{t:"314.2 \\(\\text{m}^2\\)", fb:"That is the student's value, built on the diameter instead of the radius."},
     {t:"31.4 \\(\\text{m}^2\\)", fb:"That is the circumference of the circle, not its area."},
     {t:"157.0 \\(\\text{m}^2\\)", fb:"That halves the student's value, but the fix is to halve the diameter first, then square."}],
    "Halve the diameter to get the radius, then use the formula. \\[ \\begin{aligned} r &= 10 \\div 2 = 5\\ \\text{m} \\\\ A &= \\pi (5)^2 \\approx 78.5\\ \\text{m}^2 \\end{aligned} \\] The answer is <b>78.5 square metres</b>.", {}); },
  function(){ return mcq("A student converts the area of a floor, \\(6\\ \\text{m}^2\\), to square centimetres and writes \\(6 \\times 100 = 600\\ \\text{cm}^2\\). What is the correct value?",
    {t:"60 000 \\(\\text{cm}^2\\)", fb:"Yes: the student used the linear factor 100 instead of the squared factor 10 000."},
    [{t:"600 \\(\\text{cm}^2\\)", fb:"That is the student's value, built on the linear conversion factor."},
     {t:"6 000 \\(\\text{cm}^2\\)", fb:"That uses 1000, still not the squared factor for metres to centimetres."},
     {t:"60 \\(\\text{cm}^2\\)", fb:"That moves the wrong way: square centimetres are smaller units, so the count must grow."}],
    "Area conversions use squared factors. \\[ \\begin{aligned} 6\\ \\text{m}^2 &= 6 \\times 10000\\ \\text{cm}^2 \\\\ &= 60000\\ \\text{cm}^2 \\end{aligned} \\] The answer is <b>60 000 square centimetres</b>.", {}); },
  function(){ return mcq("A student finds the area of a parallelogram with base 9 cm, slant side 7 cm and vertical height 5 cm, and writes \\(9 \\times 7 = 63\\ \\text{cm}^2\\). What is the correct area?",
    {t:"45 \\(\\text{cm}^2\\)", fb:"Yes: the student used the slant side. A parallelogram uses base times vertical height."},
    [{t:"63 \\(\\text{cm}^2\\)", fb:"That is the student's value, built on the slant side instead of the height."},
     {t:"32 \\(\\text{cm}^2\\)", fb:"That is the perimeter of the parallelogram, not its area."},
     {t:"35 \\(\\text{cm}^2\\)", fb:"That multiplies the slant side by the height and leaves out the base."}],
    "Use base times vertical height. \\[ \\begin{aligned} A &= 9 \\times 5 \\\\ &= 45\\ \\text{cm}^2 \\end{aligned} \\] The answer is <b>45 square centimetres</b>.", {}); },
  function(){ return mcq("A student finds the area of an L shaped room, 8 m by 6 m overall with a 3 m by 2 m corner missing, and writes \\(8 \\times 6 = 48\\ \\text{m}^2\\). What is the correct area?",
    {t:"42 \\(\\text{m}^2\\)", fb:"Yes: the student left the missing corner in. Subtract its area."},
    [{t:"48 \\(\\text{m}^2\\)", fb:"That is the student's value, the full bounding rectangle with nothing removed."},
     {t:"54 \\(\\text{m}^2\\)", fb:"That adds the missing corner instead of subtracting it."},
     {t:"28 \\(\\text{m}^2\\)", fb:"That is the distance around the overall rectangle, not an area."}],
    "Complete the rectangle, then subtract the missing corner. \\[ \\begin{aligned} A &= (8 \\times 6) - (3 \\times 2) \\\\ &= 48 - 6 \\\\ &= 42\\ \\text{m}^2 \\end{aligned} \\] The answer is <b>42 square metres</b>.", {}); },
  function(){ return mcq("A student finds the surface area of a closed cylinder with radius 3 cm and height 8 cm, and writes only the side area, \\(2\\pi (3)(8) = 150.8\\ \\text{cm}^2\\). What is the correct surface area, to the nearest tenth?",
    {t:"207.3 \\(\\text{cm}^2\\)", fb:"Yes: a closed cylinder also has two circular ends. The student left them out."},
    [{t:"150.8 \\(\\text{cm}^2\\)", fb:"That is the student's value, the curved side only."},
     {t:"179.1 \\(\\text{cm}^2\\)", fb:"That adds only one circular end. A closed cylinder has two ends."},
     {t:"226.2 \\(\\text{cm}^2\\)", fb:"That uses the diameter in the side area, which inflates the total."}],
    "Add the curved side and both ends. \\[ \\begin{aligned} S &= 2\\pi (3)(8) + 2\\pi (3)^2 \\\\ &= 150.8 + 56.5 \\\\ &\\approx 207.3\\ \\text{cm}^2 \\end{aligned} \\] The answer is <b>207.3 square centimetres</b>.", {}); }
]), ["Read the student's working and find the step that went wrong.", "Name the error first, then redo the calculation with the fix in place."]);

E("u3-dimension-effect", 3, ["3.33"], 2, "gen", function(){
  var ctx=pick(["a garden bed","a poster","a rug","a photo print","a table top"]);
  var mode=pick(["doubleL","tripleW","halfL","doubleW"]);
  var l=0, w=0, nl=0, nw=0, change="", oldA=0, newA=0, oldP=0, dSq=0, dOld=0, dPer=0, g4=0;
  do { l=ri(3,10); w=ri(3,9); nl=l; nw=w;
    if(mode==="doubleL"){ nl=l*2; change="the length is doubled"; }
    if(mode==="tripleW"){ nw=w*3; change="the width is tripled"; }
    if(mode==="halfL"){ if(l%2!==0) l+=1; nl=l/2; change="the length is halved"; }
    if(mode==="doubleW"){ nw=w*2; change="the width is doubled"; }
    oldA=l*w; newA=nl*nw; oldP=2*(l+w); dSq=newA*(newA/oldA); dOld=oldA; dPer=(nl+nw)*2; g4++; }
  while(g4<80 && !u3UniqText([fmt(newA),fmt(dOld),fmt(dSq),fmt(dPer)]));
  var q=mcq("A rectangle for "+ctx+" is "+l+" m by "+w+" m. It is changed so "+change+", and the other dimension stays the same. What is the new area?",
    {t:fmt(newA)+" \\(\\text{m}^2\\)", fb:"Yes: one dimension scaled, so the area scales by the same factor."},
    [{t:fmt(dOld)+" \\(\\text{m}^2\\)", fb:"That is the original area. The change to one dimension does change the area."},
     {t:fmt(dSq)+" \\(\\text{m}^2\\)", fb:"That applies the same scale change twice over. Only one dimension changed here, so the change applies once."},
     {t:fmt(dPer)+" \\(\\text{m}^2\\)", fb:"That value is built from adding side lengths, which gives a perimeter style total, not an area."}],
    "Work out the new dimensions, then multiply. \\[ \\begin{aligned} A_{\\text{new}} &= "+nl+" \\times "+nw+" \\\\ &= "+fmt(newA)+"\\ \\text{m}^2 \\end{aligned} \\] The answer is <b>"+fmt(newA)+" square metres</b>.",
    {l:l,w:w,mode:mode}); q.figure=u3RectPairFig(l,w,nl,nw); return q;
}, ["Changing one dimension of a rectangle scales the area by that same change.", "Write the new length and width first, then multiply them."]);

E("u3-surface-prism", 3, ["3.34","2.3"], 2, "gen", function(){
  var l=0,w=0,h=0,guard=0, SA=0, vol=0, half=0, sumEdges=0;
  do { l=ri(2,9); w=ri(2,9); h=ri(2,8); SA=2*(l*w+l*h+w*h); vol=l*w*h; half=l*w+l*h+w*h; sumEdges=4*(l+w+h); guard++; }
  while(guard<60 && (!u3UniqText([String(SA),String(vol),String(half),String(sumEdges)])));
  var ctx=pick(["a closed storage crate","a closed gift box","a closed tool box","a closed shipping carton"]);
  var q=mcq("Find the surface area of "+ctx+", "+l+" cm by "+w+" cm by "+h+" cm.",
    {t:fmt(SA)+" \\(\\text{cm}^2\\)", fb:"Yes: add all six faces, in three matching pairs."},
    [{t:fmt(vol)+" \\(\\text{cm}^2\\)", fb:"That multiplies all three dimensions, which gives volume, not surface area."},
     {t:fmt(half)+" \\(\\text{cm}^2\\)", fb:"That adds only one face from each pair. Each face has a matching opposite face."},
     {t:fmt(sumEdges)+" \\(\\text{cm}^2\\)", fb:"That adds edge lengths. Surface area adds the areas of the faces."}],
    "Add the three face areas, then double for the matching opposite faces. \\[ \\begin{aligned} S &= 2(lw + lh + wh) \\\\ &= 2("+fmt(l*w)+" + "+fmt(l*h)+" + "+fmt(w*h)+") \\\\ &= "+fmt(SA)+"\\ \\text{cm}^2 \\end{aligned} \\] The answer is <b>"+fmt(SA)+" square centimetres</b>.",
    {l:l,w:w,h:h});
  q.figure=u3BoxFig(l,w,h,"cm");
  return q;
}, ["Surface area is the total area of all the faces.", "Find the three different face areas first, then double their sum."]);

E("u3-convert-advanced", 3, ["3.29","3.30"], 2, "gen", function(){
  var mode=pick(["m2cmD","cm2mD","yd2in","in2ft"]);
  if(mode==="m2cmD"){ var v=pick([0.25,0.5,0.75,1.25,1.5,1.75,2.25,2.5,3.5,4.25,0.35,0.65,1.35,2.75,3.25,5.5,6.75,0.15,1.05,2.05]), ans=v*10000;
    return mcq("Write \\("+fmt(v)+"\\ \\text{m}^2\\) in square centimetres.",
      {t:fmt(ans)+" \\(\\text{cm}^2\\)", fb:"Yes: multiply by the squared factor 10 000."},
      [{t:fmt(v*100)+" \\(\\text{cm}^2\\)", fb:"That uses the linear factor 100. Areas use the squared factor."},
       {t:fmt(v*1000)+" \\(\\text{cm}^2\\)", fb:"That uses 1000. The squared factor from metres to centimetres is 10 000."},
       {t:fmt(ans*10)+" \\(\\text{cm}^2\\)", fb:"That is ten times too large: it adds a factor of 10 to the correct squared conversion."}],
      "\\[ \\begin{aligned} "+fmt(v)+"\\ \\text{m}^2 &= "+fmt(v)+" \\times 10000\\ \\text{cm}^2 \\\\ &= "+fmt(ans)+"\\ \\text{cm}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans)+" square centimetres</b>.", {mode:mode,v:v}); }
  if(mode==="cm2mD"){ var k=pick([12500,17500,22500,25000,32500,47500,52500,60000,13500,26500,37500,42500,57500,72500,82500,92500,10500,15500,20500,30500]), ans=k/10000;
    return mcq("Write \\("+fmt(k)+"\\ \\text{cm}^2\\) in square metres.",
      {t:fmt(ans)+" \\(\\text{m}^2\\)", fb:"Yes: divide by the squared factor 10 000."},
      [{t:fmt(k/100)+" \\(\\text{m}^2\\)", fb:"That divides by the linear factor 100. Areas use the squared factor."},
       {t:fmt(k/1000)+" \\(\\text{m}^2\\)", fb:"That divides by 1000. The squared factor from centimetres to metres is 10 000."},
       {t:fmt(ans/10)+" \\(\\text{m}^2\\)", fb:"That is one tenth of the correct value: one factor too many was removed."}],
      "\\[ \\begin{aligned} "+fmt(k)+"\\ \\text{cm}^2 &= "+fmt(k)+" \\div 10000\\ \\text{m}^2 \\\\ &= "+fmt(ans)+"\\ \\text{m}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans)+" square metres</b>.", {mode:mode,v:k}); }
  if(mode==="yd2in"){ var v2=ri(2,20), ans2=v2*1296;
    return mcq("Write \\("+v2+"\\ \\text{yd}^2\\) in square inches.",
      {t:fmt(ans2)+" \\(\\text{in}^2\\)", fb:"Yes: 1 square yard is 1296 square inches, since 36 squared is 1296."},
      [{t:fmt(v2*36)+" \\(\\text{in}^2\\)", fb:"That uses the linear factor 36. Areas use the squared factor, 1296."},
       {t:fmt(v2*144)+" \\(\\text{in}^2\\)", fb:"144 is the squared factor from feet to inches. This conversion starts from yards."},
       {t:fmt(v2*108)+" \\(\\text{in}^2\\)", fb:"That triples the linear factor. Areas use the squared factor, 1296."}],
      "\\[ \\begin{aligned} "+v2+"\\ \\text{yd}^2 &= "+v2+" \\times 1296\\ \\text{in}^2 \\\\ &= "+fmt(ans2)+"\\ \\text{in}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans2)+" square inches</b>.", {mode:mode,v:v2}); }
  var k2=ri(2,20), v3=k2*144, ans3=k2;
  return mcq("Write \\("+fmt(v3)+"\\ \\text{in}^2\\) in square feet.",
    {t:fmt(ans3)+" \\(\\text{ft}^2\\)", fb:"Yes: divide by the squared factor 144."},
    [{t:fmt(v3/12)+" \\(\\text{ft}^2\\)", fb:"That divides by the linear factor 12. Areas use the squared factor, 144."},
     {t:fmt(v3*144)+" \\(\\text{ft}^2\\)", fb:"That multiplies, but moving to a larger unit makes the count smaller."},
     {t:fmt(v3/100)+" \\(\\text{ft}^2\\)", fb:"100 is an SI-style factor. For inches to feet the squared factor is 144."}],
    "\\[ \\begin{aligned} "+fmt(v3)+"\\ \\text{in}^2 &= "+fmt(v3)+" \\div 144\\ \\text{ft}^2 \\\\ &= "+fmt(ans3)+"\\ \\text{ft}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans3)+" square feet</b>.", {mode:mode,v:v3});
}, ["Chain the squared factors: square each linear factor before you use it.", "Decide the direction first: a smaller unit means a larger count."]);

/* ---------- Level 2 CR ---------- */
E("u3-cr-triangle", 3, ["3.31"], 2, "gen", function(){
  var ctxs=["a triangular garden plot","a triangular sail on a small boat","a triangular road sign face","a triangular flower bed"];
  var ctx=pick(ctxs), b=2*ri(2,9), h=ri(3,12), ans=b*h/2;
  var q=numq("Find the area, in square metres, of "+ctx+" with base "+b+" m and height "+h+" m. Show your work on paper, then enter the area.",
    ans, 0.1,
    "Use the triangle area formula. \\[ \\begin{aligned} A &= \\tfrac{1}{2}bh \\\\ &= \\tfrac{1}{2}("+b+")("+h+") \\\\ &= "+fmt(ans)+"\\ \\text{m}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans)+" square metres</b>.",
    {b:b,h:h}); q.figure=m12TriAreaSVG(b,h,b+" m",h+" m"); return q;
}, ["Use half of base times height for a triangle.", "Multiply the base and height first, then take half."]);

E("u3-cr-circle", 3, ["3.32"], 2, "gen", function(){
  var ctxs=["a circular garden","a round rug","a circular patio","a round pizza stone top","a circular table top","a round dartboard face"];
  var ctx=pick(ctxs), r=ri(2,18), area=Math.PI*r*r, ans=Math.round(area*10)/10;
  var q=numq("Find the area, in square centimetres, of "+ctx+" with radius "+r+" cm. Give your answer to the nearest tenth. Show your work on paper, then enter the area.",
    ans, 0.3,
    "Use \\(A = \\pi r^2\\). \\[ \\begin{aligned} A &= \\pi ("+r+")^2 \\\\ &\\approx "+fmtF(area,1)+"\\ \\text{cm}^2 \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+" square centimetres</b>.",
    {r:r}); q.figure=m12CircleSVG("r = "+r+" cm"); return q;
}, ["Use pi times radius squared for a circle.", "Square the radius first, then multiply by pi."]);

E("u3-cr-tiles", 3, ["3.31"], 2, "gen", function(){
  var L=2*ri(3,7), W=2*ri(3,6), tile=4, ans=(L*W)/tile;
  var ctx=pick(["a kitchen floor","a bathroom floor","a laundry room floor","a porch floor"]);
  var q=numq(ctx.charAt(0).toUpperCase()+ctx.slice(1)+" is "+L+" ft by "+W+" ft. Each floor tile covers 2 ft by 2 ft. How many tiles are needed to cover the floor, with no cutting and no gaps? Show your work on paper, then enter the number of tiles.",
    ans, 0.1,
    "Find the floor area, then divide by the area of one tile. \\[ \\begin{aligned} A_{\\text{floor}} &= "+L+" \\times "+W+" = "+fmt(L*W)+"\\ \\text{ft}^2 \\\\ A_{\\text{tile}} &= 2 \\times 2 = 4\\ \\text{ft}^2 \\\\ \\text{tiles} &= "+fmt(L*W)+" \\div 4 = "+fmt(ans)+" \\end{aligned} \\] The answer is <b>"+fmt(ans)+" tiles</b>.",
    {L:L,W:W}); q.figure=u3TileFig(L,W); return q;
}, ["Divide the total area by the area covered by one tile.", "Find the floor area first, then the area of one tile."]);

E("u3-cr-cylinder-sa", 3, ["3.34"], 2, "gen", function(){
  var ctxs=["a closed water tank","a closed storage can","a closed paint drum"];
  var ctx=pick(ctxs), r=ri(2,6), h=ri(4,12), sa=2*Math.PI*r*h+2*Math.PI*r*r, ans=Math.round(sa*10)/10;
  var q=numq("Find the surface area, in square centimetres, of "+ctx+" shaped like a closed right cylinder with radius "+r+" cm and height "+h+" cm, as shown in the figure. Give your answer to the nearest tenth. Show your work on paper, then enter the surface area.",
    ans, 0.4,
    "Add the curved side and the two circular ends. \\[ \\begin{aligned} S &= 2\\pi r h + 2\\pi r^2 \\\\ &= 2\\pi ("+r+")("+h+") + 2\\pi ("+r+")^2 \\\\ &\\approx "+fmtF(sa,1)+"\\ \\text{cm}^2 \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+" square centimetres</b>.",
    {r:r,h:h});
  q.figure=u3CylFig(r,h,"cm");
  return q;
}, ["A closed cylinder has a curved side plus two circular ends.", "Find the side area first, then add both end areas."]);

E("u3-cr-cone-sa", 3, ["3.34"], 2, "gen", function(){
  var ctxs=["a closed cone shaped party hat cover","a cone shaped funnel cover","a cone shaped roof cap"];
  var ctx=pick(ctxs), r=ri(2,7), sl=r+ri(2,6), sa=Math.PI*r*sl+Math.PI*r*r, ans=Math.round(sa*10)/10;
  var q=numq("Find the surface area, in square centimetres, of "+ctx+" shaped like a right cone with radius "+r+" cm and slant height "+sl+" cm, as shown in the figure. The slant height is the distance from the tip down the sloped side to the rim. Give your answer to the nearest tenth. Show your work on paper, then enter the surface area.",
    ans, 0.4,
    "Add the sloped side and the circular base. \\[ \\begin{aligned} S &= \\pi r s + \\pi r^2 \\\\ &= \\pi ("+r+")("+sl+") + \\pi ("+r+")^2 \\\\ &\\approx "+fmtF(sa,1)+"\\ \\text{cm}^2 \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+" square centimetres</b>.",
    {r:r,sl:sl});
  q.figure=u3ConeFig(r,sl,"cm");
  return q;
}, ["A cone has a sloped side plus one circular base.", "Find the sloped side area first, using the slant height, then add the base."]);

E("u3-cr-paint", 3, ["3.31"], 2, "gen", function(){
  var W=ri(7,12), H=ri(3,4), ww=ri(1,2), wh=ri(1,2), rate=pick([4,5,6]);
  var wall=W*H, win=ww*wh, area=wall-win, ans=area*rate;
  var q=numq("A painter charges $"+rate+" per square metre. A wall is "+W+" m by "+H+" m and has one window "+ww+" m by "+wh+" m that will not be painted. What is the total charge, in dollars, to paint the wall? Show your work on paper, then enter the charge.",
    ans, 1,
    "Subtract the window, then multiply by the rate. \\[ \\begin{aligned} A &= ("+W+" \\times "+H+") - ("+ww+" \\times "+wh+") \\\\ &= "+fmt(wall)+" - "+fmt(win)+" = "+fmt(area)+"\\ \\text{m}^2 \\\\ \\text{charge} &= "+fmt(area)+" \\times "+rate+" = "+fmt(ans)+" \\end{aligned} \\] The answer is <b>$"+fmt(ans)+"</b>.",
    {W:W,H:H,rate:rate}); q.figure=u3PaintFig(W,H,ww,wh); return q;
}, ["Find the area that actually gets painted before you apply the rate.", "Find the whole wall area first, then subtract the window."]);

/* ---------- Level 3 ---------- */
E("u3-dimension-scale", 3, ["3.33"], 3, "gen", function(){
  var l=ri(3,9), w=ri(3,8), pair=pick([[2,2],[3,3],[2,3],[3,2],[4,2],[2,4]]);
  var a=pair[0], b=pair[1], nl=l*a, nw=w*b;
  var newA=nl*nw, newP=2*(nl+nw), oldA=l*w, oldP=2*(l+w);
  var wrongA1=oldA*a, wrongP1=oldP*a, wrongA2=newA, wrongP2=oldP;
  var optC="Area "+fmt(newA)+" m2 and perimeter "+fmt(newP)+" m";
  var opt1="Area "+fmt(wrongA1)+" m2 and perimeter "+fmt(wrongP1)+" m";
  var opt2="Area "+fmt(newA)+" m2 and perimeter "+fmt(oldP)+" m";
  var opt3="Area "+fmt(oldA)+" m2 and perimeter "+fmt(newP)+" m";
  var q=mcq("A rectangle is "+l+" m by "+w+" m. A larger copy is made by multiplying the length by "+a+" and the width by "+b+". Which pair gives the new area and the new perimeter?",
    {t:optC, fb:"Yes: multiply each dimension by its factor, then work out area and perimeter from the new size."},
    [{t:opt1, fb:"That scales both measures by the length factor only. The width has its own factor."},
     {t:opt2, fb:"The area is right, but the perimeter also grows when the sides grow. It cannot stay the same."},
     {t:opt3, fb:"The perimeter is right, but the area grows by both factors multiplied together, so it cannot stay the same."}],
    "Find the new dimensions first. \\[ \\begin{aligned} \\text{new size} &= "+nl+"\\ \\text{m by } "+nw+"\\ \\text{m} \\\\ A &= "+nl+" \\times "+nw+" = "+fmt(newA)+"\\ \\text{m}^2 \\\\ P &= 2("+nl+" + "+nw+") = "+fmt(newP)+"\\ \\text{m} \\end{aligned} \\] The answer is <b>area "+fmt(newA)+" square metres and perimeter "+fmt(newP)+" metres</b>.",
    {l:l,w:w,a:a,b:b}); q.figure=u3RectPairFig(l,w,nl,nw); return q;
}, ["Scale each dimension first, then compute area and perimeter from the new size.", "Write the new length and the new width before you calculate anything else."]);

E("u3-create-solve", 3, ["2.1"], 3, "var", varset([
  function(){ return mcq("A painter creates this problem from a job: a wall 9 m by 3 m has a door 1 m by 2 m that will not be painted. Which setup creates and solves the problem correctly?",
    {t:"\\(A = (9 \\times 3) - (1 \\times 2) = 25\\ \\text{m}^2\\)", fb:"Yes: whole wall minus the door gives the area to paint."},
    [{t:"\\(A = (9 \\times 3) + (1 \\times 2) = 29\\ \\text{m}^2\\)", fb:"That adds the door. An unpainted part is subtracted, not added."},
     {t:"\\(A = 2(9 + 3) - (1 \\times 2) = 22\\ \\text{m}^2\\)", fb:"That starts with the perimeter of the wall, which is a length, not an area."},
     {t:"\\(A = (9 - 1) \\times (3 - 2) = 8\\ \\text{m}^2\\)", fb:"That shrinks both wall dimensions by the door size, which does not model a door in one part of the wall."}],
    "Model the painted part as the whole wall with the door removed. \\[ A = (9 \\times 3) - (1 \\times 2) = 25\\ \\text{m}^2 \\] The answer is <b>the setup that gives 25 square metres</b>.", {}); },
  function(){ return mcq("A gardener creates this problem: a square plot 6 m by 6 m is split into two equal rectangular beds. Which setup creates and solves the area of one bed correctly?",
    {t:"\\(A = (6 \\times 6) \\div 2 = 18\\ \\text{m}^2\\)", fb:"Yes: find the whole plot area, then halve it for one of two equal beds."},
    [{t:"\\(A = 6 \\times 6 = 36\\ \\text{m}^2\\)", fb:"That is the area of the whole plot, not one of the two beds."},
     {t:"\\(A = (6 + 6) \\div 2 = 6\\ \\text{m}^2\\)", fb:"That adds side lengths, which does not give an area."},
     {t:"\\(A = 2(6 + 6) \\div 2 = 12\\ \\text{m}^2\\)", fb:"That starts with the perimeter, a length, not the area to be split."}],
    "Find the whole area, then split it evenly. \\[ A = (6 \\times 6) \\div 2 = 18\\ \\text{m}^2 \\] The answer is <b>the setup that gives 18 square metres</b>.", {}); },
  function(){ return mcq("A sign maker creates this problem: a triangular sign has base 12 cm and height 9 cm. Which setup creates and solves its area correctly?",
    {t:"\\(A = \\tfrac{1}{2}(12)(9) = 54\\ \\text{cm}^2\\)", fb:"Yes: that is the triangle formula applied to the given base and height."},
    [{t:"\\(A = (12)(9) = 108\\ \\text{cm}^2\\)", fb:"That is the full bounding rectangle. A triangle takes half of it."},
     {t:"\\(A = \\tfrac{1}{2}(12 + 9) = 10.5\\ \\text{cm}^2\\)", fb:"That adds the base and height. The formula multiplies them."},
     {t:"\\(A = 2(12 + 9) = 42\\ \\text{cm}^2\\)", fb:"That is a perimeter style total for a rectangle, not the area of a triangle."}],
    "A triangle problem uses half of base times height. \\[ A = \\tfrac{1}{2}(12)(9) = 54\\ \\text{cm}^2 \\] The answer is <b>the setup that gives 54 square centimetres</b>.", {}); },
  function(){ return mcq("A worker creates this problem: a round cover has diameter 8 cm. Which setup creates and solves its area correctly?",
    {t:"\\(A = \\pi (4)^2 \\approx 50.3\\ \\text{cm}^2\\)", fb:"Yes: halve the diameter to get the radius, then use pi times radius squared."},
    [{t:"\\(A = \\pi (8)^2 \\approx 201.1\\ \\text{cm}^2\\)", fb:"That uses the diameter as the radius, which makes the area four times too large."},
     {t:"\\(A = 2\\pi (4) \\approx 25.1\\ \\text{cm}^2\\)", fb:"That is the circumference, the distance around the cover, not its area."},
     {t:"\\(A = \\pi (8) \\approx 25.1\\ \\text{cm}^2\\)", fb:"That multiplies pi by the diameter once, which gives a length, not an area."}],
    "The radius is half of the diameter. \\[ A = \\pi (4)^2 \\approx 50.3\\ \\text{cm}^2 \\] The answer is <b>the setup that gives about 50.3 square centimetres</b>.", {}); },
  function(){ return mcq("A tiler creates this problem: an L shaped floor is a 10 m by 5 m rectangle with a 4 m by 5 m rectangle added on one end at a right angle, sharing only an edge. Which setup creates and solves its area correctly?",
    {t:"\\(A = (10 \\times 5) + (4 \\times 5) = 70\\ \\text{m}^2\\)", fb:"Yes: split the L into its two rectangles and add their areas."},
    [{t:"\\(A = (10 + 4) \\times (5 + 5) = 140\\ \\text{m}^2\\)", fb:"That builds a larger bounding rectangle that includes space the floor does not cover."},
     {t:"\\(A = (10 \\times 5) - (4 \\times 5) = 30\\ \\text{m}^2\\)", fb:"That subtracts the added part. The second rectangle is part of the floor, so it is added."},
     {t:"\\(A = 2(10 + 5) + 2(4 + 5) = 48\\ \\text{m}^2\\)", fb:"That adds perimeters, which are lengths, not the area covered."}],
    "Split the shape and add the parts. \\[ A = (10 \\times 5) + (4 \\times 5) = 70\\ \\text{m}^2 \\] The answer is <b>the setup that gives 70 square metres</b>.", {}); }
]), ["Build the setup from the story first: which areas are added, subtracted or halved?", "Check each setup against the story before you look at its final number."]);

E("u3-missing-dimension", 3, ["2.4","3.32"], 3, "gen", function(){
  var mode=pick(["rect","tri","para"]);
  if(mode==="rect"){ var wv=0, lv=0, A=0, g5=0;
    do { wv=ri(3,12); lv=ri(3,12); A=wv*lv; g5++; } while(g5<80 && !u3UniqText([fmt(wv),fmt(A-lv),fmt(A+lv),fmt(wv*2)]));
    var _bo0=balOpts({t:fmt(wv), fb:"Yes: rearrange the area formula and divide the area by the length."}, [{t:fmt(A-lv), fb:"That subtracts the length from the area. Rearranging area means dividing."},
       {t:fmt(A+lv), fb:"That adds the length to the area. Rearranging area means dividing."},
       {t:fmt(A/lv*2), fb:"That doubles the correct division. Area divided by length gives the width directly."}]); var q=mcq("A rectangular mat has area "+fmt(A)+" \\(\\text{m}^2\\) and length "+lv+" m. What is its width, in metres?", _bo0[0], _bo0[1],
      "Rearrange \\(A = lw\\) to solve for the width. \\[ \\begin{aligned} w &= A \\div l \\\\ &= "+fmt(A)+" \\div "+lv+" \\\\ &= "+fmt(wv)+"\\ \\text{m} \\end{aligned} \\] The answer is <b>"+fmt(wv)+" metres</b>.", {mode:mode}); q.figure=m12RectAreaSVG(lv,wv,lv+" m","?","A = "+fmt(A)+" m\u00B2"); return q; }
  if(mode==="tri"){ var bv=0, hv=0, A2=0, g6=0;
    do { bv=2*ri(2,8); hv=ri(3,11); A2=bv*hv/2; g6++; } while(g6<80 && !u3UniqText([fmt(hv),fmt(A2/bv),fmt(A2-bv),fmt(hv*2)]));
    var _bo1=balOpts({t:fmt(hv), fb:"Yes: double the area, then divide by the base."}, [{t:fmt(A2/bv), fb:"That forgets the half in the triangle formula. The area must be doubled first."},
       {t:fmt(A2-bv), fb:"That subtracts the base from the area. The formula is rearranged with division."},
       {t:fmt(A2*2/bv*2), fb:"That doubles one step too many. Double the area once, then divide by the base."}]); var q=mcq("A triangular banner has area "+fmt(A2)+" \\(\\text{cm}^2\\) and base "+bv+" cm. What is its height, in centimetres?", _bo1[0], _bo1[1],
      "Rearrange \\(A = \\tfrac{1}{2}bh\\) to solve for the height. \\[ \\begin{aligned} h &= 2A \\div b \\\\ &= "+fmt(2*A2)+" \\div "+bv+" \\\\ &= "+fmt(hv)+"\\ \\text{cm} \\end{aligned} \\] The answer is <b>"+fmt(hv)+" centimetres</b>.", {mode:mode}); q.figure=m12TriAreaSVG(bv,hv,bv+" cm","?"); return q; }
  var bp=0, hp=0, A3=0, g7=0;
  do { bp=ri(3,12); hp=ri(3,11); A3=bp*hp; g7++; } while(g7<80 && !u3UniqText([fmt(hp),fmt(A3-bp),fmt(A3/bp/2),fmt(A3+bp)]));
  var _bo2=balOpts({t:fmt(hp), fb:"Yes: rearrange the area formula and divide the area by the base."}, [{t:fmt(A3-bp), fb:"That subtracts the base from the area. Rearranging area means dividing."},
     {t:fmt(A3/bp/2), fb:"That halves the correct division. A parallelogram has no half in its formula; that belongs to triangles."},
     {t:fmt(A3+bp), fb:"That adds the base to the area. Rearranging area means dividing."}]); var q=mcq("A parallelogram shaped tile pattern has area "+fmt(A3)+" \\(\\text{cm}^2\\) and base "+bp+" cm. What is its vertical height, in centimetres?", _bo2[0], _bo2[1],
    "Rearrange \\(A = bh\\) to solve for the height. \\[ \\begin{aligned} h &= A \\div b \\\\ &= "+fmt(A3)+" \\div "+bp+" \\\\ &= "+fmt(hp)+"\\ \\text{cm} \\end{aligned} \\] The answer is <b>"+fmt(hp)+" centimetres</b>.", {mode:mode}); q.figure=m12ParaAreaSVG(bp,hp,bp+" cm","?",null); return q;
}, ["Work the area formula backwards from the area you are given.", "Write the formula, put in the known values, then solve for the missing one."]);

E("u3-cr-design-width", 3, ["2.1","2.4","3.31"], 3, "gen", function(){
  var W=ri(3,11), L=ri(4,12), A=W*L;
  var ctxs=["a rectangular garden plot","a rectangular storage pad","a rectangular patio","a rectangular dog run"];
  var ctx=pick(ctxs);
  var q=numq("Design "+ctx+" with a total area of "+fmt(A)+" square metres. One side, along an existing fence, is fixed at "+L+" m. What must the other side be, in metres? Show your work on paper, then enter the length of the other side.",
    W, 0.1,
    "Set up the area formula with the target area and solve for the unknown side. \\[ \\begin{aligned} A &= l \\times w \\\\ "+fmt(A)+" &= "+L+" \\times w \\\\ w &= "+fmt(A)+" \\div "+L+" = "+fmt(W)+"\\ \\text{m} \\end{aligned} \\] The answer is <b>"+fmt(W)+" metres</b>.",
    {W:W,L:L}); q.figure=m12RectAreaSVG(L,W,L+" m","?","A = "+fmt(A)+" m\u00B2"); return q;
}, ["Set the area formula equal to the target area, then solve for the unknown side.", "Divide the target area by the side that is already fixed."]);

E("u3-cr-house-composite", 3, ["3.26","3.31"], 3, "gen", function(){
  var w=2*ri(3,5), h=ri(3,6), th=ri(2,4), unit=pick(["m","ft"]);
  var rect=w*h, tri=w*th/2, ans=rect+tri;
  var q=numq("The end wall of a shed has the house shape shown in the figure: a rectangle with a triangular top. The width is "+w+" "+unit+", the wall height up to the roof is "+h+" "+unit+", and the triangular top is "+th+" "+unit+" high. Find its area, in square "+(unit==="m"?"metres":"feet")+". Show your work on paper, then enter the area.",
    ans, 0.6,
    "Split the shape into a rectangle and a triangle, then add. \\[ \\begin{aligned} A &= (w \\times h) + \\tfrac{1}{2}(w \\times t) \\\\ &= ("+w+" \\times "+h+") + \\tfrac{1}{2}("+w+" \\times "+th+") \\\\ &= "+fmt(rect)+" + "+fmt(tri)+" = "+fmt(ans)+" \\end{aligned} \\] The answer is <b>"+fmt(ans)+" square "+(unit==="m"?"metres":"feet")+"</b>.",
    {w:w,h:h,th:th});
  q.figure=u3HouseFig(w,h,th,unit);
  return q;
}, ["Split the shape into a rectangle and a triangle, then add the parts.", "Find the rectangle part first, then the triangular top as half of its box."]);

/* ----- bank-u4.js ----- */
// Math 1202 Unit 4 Getting Paid for Your Work question bank
// Cut verbatim from the standalone bank source
// (math-1202-review/bank-src.js, lines 2052 to 2582).
// CRMARKS: u4-hours-schedule-cr=2
// CRMARKS: u4-cpp-ei-tax-cr=2
// CRMARKS: u4-commission-only-cr=2
// CRMARKS: u4-overtime-gross-cr=3
// CRMARKS: u4-net-pay-cr=3
// CRMARKS: u4-what-if-cr=3
// CRMARKS: u4-full-pay-stub-cr=2
// CRMARKS: u4-gross-mixed-cr=3
/* ===== Unit 4 ===== */
/* Unit 4: Getting Paid for Your Work. Helpers prefixed u4. */
function u4R(n){return Math.round(n*100)/100;}
function u4M(n){var s=fmtF(u4R(n),2);var p=s.split(".");p[0]=p[0].replace(/\B(?=(\d{3})+(?!\d))/g,",");return "$"+p.join(".");}
function u4Dist(c,ds,ff,step){var seen={};seen[ff(c)]=1;return ds.map(function(d){var v=d.v,g=0;while(seen[ff(v)]&&g<80){v=u4R(v+step);g++;}seen[ff(v)]=1;return {t:ff(v),fb:d.fb};});}
function u4Hrs(v){return fmt(v)+" hours";}
function u4TableFig(rows){
  var cols=rows[0].length,W=320,rowH=28,H=rows.length*rowH+16,colW=(W-20)/cols;
  var s='<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg">';
  rows.forEach(function(r,i){var y=8+i*rowH;
    s+='<rect x="10" y="'+y+'" width="'+(W-20)+'" height="'+rowH+'" fill="'+(i===0?FIG_SHADE:"none")+'" stroke="'+FIG_INK+'" stroke-width="1.2"/>';
    r.forEach(function(c,j){var x=10+j*colW;if(j>0)s+='<line x1="'+fmt(x,1)+'" y1="'+y+'" x2="'+fmt(x,1)+'" y2="'+(y+rowH)+'" stroke="'+FIG_INK+'" stroke-width="1"/>';
      s+='<text x="'+fmt(x+colW/2,1)+'" y="'+(y+rowH/2+4)+'" font-size="12" '+(i===0?'font-weight="bold" ':"")+'fill="'+FIG_INK+'" text-anchor="middle">'+c+'</text>';});});
  return s+'</svg>';
}
var u4NAMES=["Alex","Priya","Jordan","Sam","Taylor","Casey","Morgan","Riley","Devon","Jamie","Robin","Noor"];

E("u4-earning-methods",4,["1.9"],1,"var",varset([
 function(){return mcq("Priya is paid the same amount every two weeks, no matter how many hours she works in that period. What is this method of earning income called?",
  {t:"Salary",fb:"Yes: a salary is a fixed amount paid for a period of time."},
  [{t:"Commission",fb:"Commission is a percent of sales, so it changes when sales change. Priya's pay stays the same."},
   {t:"Hourly wage",fb:"An hourly wage is paid per hour worked, so it changes with the hours. Priya's pay does not."},
   {t:"Contract pay",fb:"Contract pay is an agreed total for finishing a whole job. Priya is paid a steady amount each period."}],
  "A fixed amount paid each pay period, no matter the hours worked, is a <b>salary</b>.",{});},
 function(){return mcq("Marcus sells cars. He earns no pay for a week with no sales, and his pay is a percent of the price of each car he sells. What is this method of earning income called?",
  {t:"Commission",fb:"Yes: pay that is a percent of sales is commission."},
  [{t:"Salary",fb:"A salary is a fixed amount each period. Marcus earns nothing in a week with no sales."},
   {t:"Piecework",fb:"Piecework pays per item made or finished. Marcus is paid a percent of the selling price."},
   {t:"Hourly wage",fb:"An hourly wage pays for time worked. Marcus is paid only when he sells."}],
  "Pay set as a percent of the value of what is sold is <b>commission</b>.",{});},
 function(){return mcq("A sewing shop pays workers for each pair of mitts they finish: 90 cents per pair. What is this method of earning income called?",
  {t:"Piecework",fb:"Yes: pay per finished item is piecework."},
  [{t:"Bonus",fb:"A bonus is an extra payment on top of regular pay, often for reaching a target. Here the whole pay is per item."},
   {t:"Salary",fb:"A salary is a fixed amount per period. These workers earn more when they finish more pairs."},
   {t:"Tips",fb:"Tips are extra money given by customers. This pay comes from the shop, per item finished."}],
  "Pay based on the number of items finished is called <b>piecework</b>.",{});},
 function(){return mcq("A painter agrees to paint a whole house for a total of $2,400, paid when the job is done. What is this method of earning income called?",
  {t:"Contract pay",fb:"Yes: one agreed total for a complete job is contract pay."},
  [{t:"Hourly wage",fb:"An hourly wage pays for each hour worked. This pay is one total for the whole job."},
   {t:"Shift premium",fb:"A shift premium is extra pay per hour for evenings or nights. This pay is a single total price."},
   {t:"Commission",fb:"Commission is a percent of sales. The painter's price is a fixed total for the job."}],
  "An agreed total price for completing a whole job is <b>contract pay</b>.",{});},
 function(){return mcq("Devon earns $19.00 per hour on day shifts. For overnight shifts the store adds $2.50 per hour on top of the regular wage. What is the extra $2.50 per hour called?",
  {t:"Shift premium",fb:"Yes: extra pay per hour for less popular shifts is a shift premium."},
  [{t:"Bonus",fb:"A bonus is usually a one-time extra payment for reaching a target. This extra is paid per overnight hour."},
   {t:"Tips",fb:"Tips come from customers. This extra comes from the store as part of the wage."},
   {t:"Salary",fb:"A salary is a fixed amount per period. Devon is paid by the hour, with an extra hourly amount."}],
  "Extra hourly pay for working evenings, nights or weekends is a <b>shift premium</b>.",{});},
 function(){return mcq("A sales team earns its regular pay all year. In December each team member gets one extra payment of $500 for passing the yearly sales target. What is the extra payment called?",
  {t:"Bonus",fb:"Yes: a one-time extra payment for reaching a target is a bonus."},
  [{t:"Commission",fb:"Commission is a percent of each sale, paid as sales happen. This is one extra payment for a target."},
   {t:"Piecework",fb:"Piecework pays per item finished. This payment is for reaching a yearly target."},
   {t:"Overtime pay",fb:"Overtime pay is a higher hourly rate for extra hours. This payment is a set extra amount."}],
  "A one-time extra payment for reaching a goal is a <b>bonus</b>.",{});}
]),["Name the method from how the pay is calculated, not from the job title.","Ask: does the pay depend on hours, on sales, on items finished, or is it a fixed amount?"]);

E("u4-jobs-and-methods",4,["1.10"],1,"var",varset([
 function(){return mcq("A real estate agent earns 5% of the selling price of each house she sells and no other pay. Which method of earning income does this job commonly use?",
  {t:"Commission",fb:"Yes: agents are commonly paid a percent of each sale."},
  [{t:"Hourly wage",fb:"An hourly wage pays for time worked. The agent is paid only when a house sells."},
   {t:"Salary",fb:"A salary is a fixed amount per period. The agent's pay depends on her sales."},
   {t:"Wage and tips",fb:"Tips are extras from customers on top of a wage. The agent's pay is a percent of the price."}],
  "A percent of each sale, with no other pay, is <b>commission</b>, the common method for real estate agents.",{});},
 function(){return mcq("A cashier at a grocery store in St. John's is paid $17.25 for each hour worked. Which method of earning income does this job commonly use?",
  {t:"Hourly wage",fb:"Yes: pay per hour worked is an hourly wage."},
  [{t:"Commission",fb:"Commission is a percent of sales. The cashier is paid for time, not for what shoppers buy."},
   {t:"Contract pay",fb:"Contract pay is one total for a finished job. The cashier is paid by the hour."},
   {t:"Salary",fb:"A salary is a fixed amount per period no matter the hours. The cashier's pay grows with hours."}],
  "Pay for each hour worked is an <b>hourly wage</b>, common for cashiers.",{});},
 function(){return mcq("A server at a downtown restaurant is paid an hourly wage, and customers leave extra money for good service. Which method of earning income does this job commonly use?",
  {t:"Wage and tips",fb:"Yes: servers commonly earn an hourly wage plus tips from customers."},
  [{t:"Piecework",fb:"Piecework pays per item finished. The server's extras come from customers, not per item."},
   {t:"Salary",fb:"A salary is fixed per period. The server's total changes with the tips received."},
   {t:"Bonus",fb:"A bonus is a one-time extra from the employer for a target. Tips are ongoing extras from customers."}],
  "An hourly wage plus customer extras is <b>wage and tips</b>, common for servers.",{});},
 function(){return mcq("A school principal is paid $96,000 per year, paid out in equal amounts each pay period. Which method of earning income does this job commonly use?",
  {t:"Salary",fb:"Yes: a yearly amount paid in equal parts is a salary."},
  [{t:"Hourly wage",fb:"An hourly wage is paid per hour worked. The principal's pay is a fixed yearly amount."},
   {t:"Commission",fb:"Commission is a percent of sales. There are no sales in this pay."},
   {t:"Shift premium",fb:"A shift premium is extra hourly pay for certain shifts. This pay is a fixed yearly amount."}],
  "A fixed yearly amount paid in equal parts is a <b>salary</b>.",{});},
 function(){return mcq("A homeowner hires a plumber to replace a bathroom's pipes for one agreed total price, paid when the work passes inspection. Which method of earning income does this job use?",
  {t:"Contract pay",fb:"Yes: one agreed total for a whole job is contract pay."},
  [{t:"Salary",fb:"A salary is ongoing fixed pay per period. This is a single price for one job."},
   {t:"Wage and tips",fb:"There is no hourly wage plus customer extras here. The price covers the whole job."},
   {t:"Commission",fb:"Commission is a percent of a sale price. The plumber charges a total for the work itself."}],
  "One agreed total for a complete job is <b>contract pay</b>.",{});},
 function(){return mcq("A warehouse worker earns extra pay per hour for working the overnight shift, on top of the regular hourly wage. Which method is the extra pay an example of?",
  {t:"Shift premium",fb:"Yes: extra hourly pay for overnight work is a shift premium."},
  [{t:"Bonus",fb:"A bonus is a one-time extra for a target. This extra is paid for every overnight hour."},
   {t:"Piecework",fb:"Piecework pays per item finished. This extra is based on the time of the shift."},
   {t:"Tips",fb:"Tips come from customers. This extra is part of the wage set by the employer."}],
  "Extra hourly pay for less popular shifts is a <b>shift premium</b>.",{});}
]),["Match the job to how its pay is described in the stem.","Ask which part of the pay decides the method: hours, sales, items, shifts, or a fixed total."]);

E("u4-why-net-less",4,["1.15"],1,"var",varset([
 function(){return mcq("Two pay stubs show the same job. One stub lists gross pay of $1,840.00 and the take-home amount is $1,402.55. Why is the take-home amount smaller?",
  {t:"Deductions such as CPP, EI and income tax were taken off the gross pay",fb:"Yes: amounts taken off gross pay leave a smaller net pay."},
  [{t:"The bank kept part of the deposit as a service charge",fb:"Banks do not set the difference between gross and net pay. The difference is deductions listed on the stub."},
   {t:"The worker was paid for fewer hours than the stub shows",fb:"The hours set the gross pay. The drop from gross to take-home comes from deductions."},
   {t:"The employer rounded the pay down to a whole dollar",fb:"Rounding would change pay by less than a dollar. This difference is hundreds of dollars in deductions."}],
  "Gross pay minus deductions gives net pay. The take-home amount is smaller because <b>deductions such as CPP, EI and income tax were taken off</b>.",{});},
 function(){return mcq("What does the word deductions mean on a pay stub?",
  {t:"Amounts taken off gross pay before the worker is paid",fb:"Yes: deductions are subtracted from gross pay."},
  [{t:"Extra amounts added to gross pay for overtime",fb:"Overtime adds to gross pay. Deductions are taken off."},
   {t:"The total hours worked in the pay period",fb:"Hours are used to work out gross pay. Deductions are dollar amounts taken off."},
   {t:"Money the worker spends after payday",fb:"Spending after payday is the worker's choice. Deductions come off before payment."}],
  "On a pay stub, <b>deductions are amounts taken off gross pay</b> before the worker receives the money.",{});},
 function(){return mcq("Lena and Omar earn the same gross pay. Lena's net pay is lower because she also pays union dues and a health plan amount each period. What does this show?",
  {t:"Net pay depends on which deductions a worker has",fb:"Yes: extra deductions lower net pay even when gross pay matches."},
  [{t:"Gross pay is always lower for union workers",fb:"Both workers have the same gross pay here. The difference is in deductions."},
   {t:"Health plan payments are added to gross pay",fb:"Health plan amounts are taken off. They lower the take-home amount."},
   {t:"Net pay is set by the number of hours only",fb:"Hours help set gross pay. Net pay also depends on the deductions taken off."}],
  "Workers with the same gross pay can take home different amounts because <b>net pay depends on which deductions a worker has</b>.",{});},
 function(){return mcq("Which list shows only deductions that can lower take-home pay?",
  {t:"CPP, EI, income tax, union dues",fb:"Yes: all four are taken off gross pay."},
  [{t:"Overtime pay, tips, CPP, EI",fb:"Overtime pay and tips add to gross pay. Only CPP and EI in this list are deductions."},
   {t:"Bonus, commission, EI, income tax",fb:"A bonus and commission add to earnings. Only EI and income tax in this list are deductions."},
   {t:"Vacation pay, salary, union dues, tips",fb:"Vacation pay, salary and tips are earnings. Only union dues in this list is a deduction."}],
  "CPP, EI, income tax and union dues are all taken off gross pay, so the list of only deductions is <b>CPP, EI, income tax, union dues</b>.",{});},
 function(){return mcq("A pay stub lists gross pay of $2,150.00, total deductions of $498.20, and net pay of $1,651.80. Which statement explains the net pay?",
  {t:"Net pay is gross pay minus total deductions",fb:"Yes: 2,150.00 minus 498.20 equals 1,651.80."},
  [{t:"Net pay is gross pay plus total deductions",fb:"Adding would give 2,648.20. Deductions are subtracted, not added."},
   {t:"Net pay is the total deductions amount",fb:"The deductions are 498.20, not 1,651.80. Net pay is what is left after they come off."},
   {t:"Net pay is gross pay divided by two weeks",fb:"Dividing by the weeks does not give this amount. Net pay is gross pay minus deductions."}],
  "\\[ 2150.00 - 498.20 = 1651.80 \\] <b>Net pay is gross pay minus total deductions</b>.",{});},
 function(){return mcq("Why do employers take CPP and EI amounts off pay cheques?",
  {t:"The amounts go to government pension and insurance plans for workers",fb:"Yes: CPP and EI deductions fund the Canada Pension Plan and Employment Insurance."},
  [{t:"The amounts are a fee the employer charges for writing cheques",fb:"CPP and EI are not employer fees. They go to government plans."},
   {t:"The amounts pay for the worker's uniforms and tools",fb:"Uniform costs can be a deduction, but CPP and EI go to government pension and insurance plans."},
   {t:"The amounts are saved by the employer until the worker quits",fb:"The employer sends CPP and EI amounts to the government. They are not held as savings."}],
  "CPP and EI amounts are taken off because <b>they go to government pension and insurance plans for workers</b>. That is one reason gross pay and net pay differ.",{});}
]),["Gross pay is the full amount earned. Net pay is what is left after amounts come off.","Look for the amounts taken off between the gross pay line and the take-home line."]);

E("u4-method-tradeoffs",4,["1.19"],2,"var",varset([
 function(){return mcq("Jae sells phones on commission only. In busy months Jae earns a lot; in slow months Jae earns very little. What is the main disadvantage shown here?",
  {t:"Income changes a lot from month to month",fb:"Yes: commission-only pay rises and falls with sales."},
  [{t:"Jae must work the same hours every week",fb:"The stem is about pay changing with sales, not about set hours."},
   {t:"Jae's pay is capped at a fixed yearly amount",fb:"Commission is not capped in the stem. The problem is how much it varies."},
   {t:"Jae is paid only once a year",fb:"Nothing in the stem says that. The disadvantage is the unsteady income."}],
  "Commission-only pay can swing widely with sales, so the main disadvantage is that <b>income changes a lot from month to month</b>.",{});},
 function(){return mcq("What is an advantage of earning a salary?",
  {t:"Pay stays the same each period, so budgeting is easier",fb:"Yes: steady, predictable pay is the main advantage of a salary."},
  [{t:"Pay grows every time an extra hour is worked",fb:"A salary usually does not grow with extra hours. That describes hourly pay with overtime."},
   {t:"Pay rises with every sale made",fb:"That describes commission. A salary stays fixed."},
   {t:"There are no deductions from the pay",fb:"Salaries still have deductions such as CPP, EI and income tax."}],
  "A salary is the same amount each period, so an advantage is that <b>pay stays the same each period, so budgeting is easier</b>.",{});},
 function(){return mcq("A contract carpenter finishes a kitchen job. Until the carpenter finds the next job, there is no income from that work. What disadvantage of contract work does this show?",
  {t:"Work and income can have gaps between jobs",fb:"Yes: contract workers must line up the next job to keep income steady."},
  [{t:"The carpenter must share pay with the homeowner",fb:"The contract price belongs to the carpenter. The problem is the gap before the next job."},
   {t:"The carpenter's pay has no deductions taken off",fb:"Contract workers still deal with taxes. The disadvantage shown is the income gap."},
   {t:"The carpenter is paid per hour at a low rate",fb:"The stem describes a total price per job, not an hourly rate."}],
  "Contract work can leave gaps with no income between jobs. The disadvantage is that <b>work and income can have gaps between jobs</b>.",{});},
 function(){return mcq("What is an advantage of an hourly wage with overtime pay?",
  {t:"Extra hours worked bring extra pay at a higher rate",fb:"Yes: hourly workers gain pay for extra hours, with overtime at a higher rate."},
  [{t:"Pay is the same even in weeks with no work",fb:"Hourly pay stops when no hours are worked. That is a feature of a salary instead."},
   {t:"Income rises automatically when store sales rise",fb:"That describes commission. Hourly pay depends on hours."},
   {t:"The worker chooses the total price for each job",fb:"Choosing a total price describes contract work, not an hourly wage."}],
  "With an hourly wage and overtime, <b>extra hours worked bring extra pay at a higher rate</b>.",{});},
 function(){return mcq("Piecework pays per item finished. What is a disadvantage of piecework for the worker?",
  {t:"Slow days or machine breakdowns cut the pay directly",fb:"Yes: when fewer items get finished, piecework pay falls right away."},
  [{t:"The worker is paid even when nothing is finished",fb:"Piecework pays only for finished items, so that statement is backwards."},
   {t:"Pay is a fixed amount each week",fb:"Piecework pay is not fixed. It depends on items finished."},
   {t:"The worker earns a percent of each sale price",fb:"A percent of the sale price is commission. Piecework pays per item."}],
  "Piecework pay falls as soon as output falls, so a disadvantage is that <b>slow days or machine breakdowns cut the pay directly</b>.",{});},
 function(){return mcq("What is an advantage of wage and tips for a server in a busy restaurant?",
  {t:"Good service and busy shifts can push total earnings higher",fb:"Yes: tips let strong servers earn more than the wage alone."},
  [{t:"Earnings stay exactly the same every shift",fb:"Tips change from shift to shift, so earnings do not stay the same."},
   {t:"The server never depends on customers for income",fb:"Tips come from customers, so part of the income does depend on them."},
   {t:"The server earns a percent of the restaurant's yearly profit",fb:"Tips are extras from customers, not a percent of yearly profit."}],
  "Tips reward good service, so an advantage is that <b>good service and busy shifts can push total earnings higher</b>.",{});}
]),["Weigh the method itself: steady or changing, tied to hours, sales, items, or finished jobs.","Ask who or what controls how much the worker earns under this method."]);

E("u4-decimal-hours-total",4,["1.11"],1,"gen",function(){
 var days=["Monday","Tuesday","Wednesday"], hs=[], ms=[], tot=0, wrongMin=0, parts=[], chain=[];
 for(var i=0;i<3;i++){var h=ri(4,9), m=pick([0,15,30,45]); hs.push(h); ms.push(m); tot+=h+m/60; wrongMin+=h+m/100; parts.push(days[i]+" "+h+" h "+(m<10?"0":"")+m+" min"); chain.push(fmt(h+m/60));}
 var last=hs[2]+ms[2]/60;
 var ds=u4Dist(tot,[{v:wrongMin,fb:"That treats the minutes as hundredths of an hour. Divide minutes by 60 to change them to hours."},{v:tot-last,fb:"That leaves out one day. Add the time for all three days."},{v:tot+1,fb:"That adds a full extra hour. Convert each day's minutes by dividing by 60, then add."}],function(v){return fmt(v);},0.25);
 var _bo=balOpts({t:fmt(tot),fb:"Yes: change each day's minutes to a decimal part of an hour, then add the three days."},ds);
 var q=mcq("The table shows the time one worker put in on three days. What is the total time worked, in decimal hours?",
  _bo[0],_bo[1],
  "Change minutes to hours by dividing by 60, then add. \\[ \\begin{aligned} \\text{Total} &= "+chain.join(" + ")+" \\\\ &= "+fmt(tot)+" \\end{aligned} \\] The total time worked is <b>"+u4Hrs(tot)+"</b>.",
  {hs:hs,ms:ms});
 q.figure=u4TableFig([["Day","Time worked"]].concat(parts.map(function(p){var b=p.split(" ");return [b[0],b.slice(1).join(" ")];})));
 return q;
},["Decimal hours means the minutes become a decimal part of one hour.","For each day, divide the minutes by 60 and add that to the hours, then total the days."]);

E("u4-gross-overtime",4,["1.12","2.3"],2,"gen",function(){
 var w=ri(1500,2600)/100, R=ri(30,40), O=ri(2,10);
 var reg=u4R(R*w), ot=u4R(O*1.5*w), gross=u4R(reg+ot);
 var ds=u4Dist(gross,[{v:u4R((R+O)*w),fb:"That pays every hour at the regular rate. Overtime hours earn time and a half, not the regular rate."},
  {v:u4R(reg+O*2*w),fb:"That pays overtime at double time, which is 2 times the wage. The stem says time and a half, which is 1.5 times."},
  {v:reg,fb:"That is only the regular hours. Add pay for the overtime hours at 1.5 times the wage."}],u4M,2.50);
 return mcq("A cook earns "+u4M(w)+" per hour. In one week the cook works "+R+" regular hours and "+O+" overtime hours paid at time and a half. What is the gross pay for the week?",
  {t:u4M(gross),fb:"Yes: regular pay plus overtime pay at 1.5 times the wage."},ds,
  "Work out regular pay and overtime pay, then add. \\[ \\begin{aligned} \\text{Regular pay} &= "+R+" \\times "+fmtF(w,2)+" = "+fmtF(reg,2)+" \\\\ \\text{Overtime pay} &= "+O+" \\times 1.5 \\times "+fmtF(w,2)+" = "+fmtF(ot,2)+" \\\\ \\text{Gross pay} &= "+fmtF(reg,2)+" + "+fmtF(ot,2)+" = "+fmtF(gross,2)+" \\end{aligned} \\] The gross pay is <b>"+u4M(gross)+"</b>.",
  {w:w,R:R,O:O});
},["Split the hours into regular hours and overtime hours, and price each group at its own rate.","Start with the regular hours times the wage."]);

E("u4-gross-with-tips",4,["1.12"],2,"gen",function(){
 var w=ri(1400,2000)/100, h=ri(20,38), tips=ri(40,240);
 var wage=u4R(h*w), gross=u4R(wage+tips);
 var ds=u4Dist(gross,[{v:wage,fb:"That is the wage only. The tips are part of gross pay too, so add them."},
  {v:u4R(wage-tips),fb:"That subtracts the tips. Tips add to what the server earned."},
  {v:u4R(h*(w+tips)),fb:"That treats the tips as an hourly rate and multiplies them by the hours. Tips are one total amount, added once."}],u4M,2.50);
 return mcq("A server earns "+u4M(w)+" per hour and works "+h+" hours in a week. The server also receives "+u4M(tips)+" in tips. What is the gross pay for the week?",
  {t:u4M(gross),fb:"Yes: hours times wage, plus the full tips amount, gives gross pay."},ds,
  "Gross pay counts both the wage and the tips. \\[ \\begin{aligned} \\text{Wage} &= "+h+" \\times "+fmtF(w,2)+" = "+fmtF(wage,2)+" \\\\ \\text{Gross pay} &= "+fmtF(wage,2)+" + "+fmtF(tips,2)+" = "+fmtF(gross,2)+" \\end{aligned} \\] The gross pay is <b>"+u4M(gross)+"</b>.",
  {w:w,h:h,tips:tips});
},["Gross pay includes everything earned in the period: the wage and the tips.","Start with hours times the hourly wage."]);

E("u4-what-if-pay-rate",4,["1.13"],2,"gen",function(){
 var w1=ri(1500,2300)/100, raise=ri(50,300)/100, w2=u4R(w1+raise), h=ri(24,40), mode=ri(1,2);
 var oldG=u4R(h*w1), newG=u4R(h*w2), inc=u4R(newG-oldG);
 if(mode===1){
  var ds=u4Dist(newG,[{v:oldG,fb:"That is the old weekly pay. Use the new rate after the raise."},
   {v:inc,fb:"That is only the increase for the week. The question asks for the full new weekly pay."},
   {v:u4R(h*w2+raise),fb:"That adds the hourly raise once more at the end. The raise is already inside the new rate."}],u4M,2.50);
  return mcq("A retail worker earns "+u4M(w1)+" per hour for "+h+" hours a week. The wage rises to "+u4M(w2)+" per hour, with the same hours. What is the new gross pay per week?",
   {t:u4M(newG),fb:"Yes: multiply the hours by the new rate."},ds,
   "Use the new rate with the same hours. \\[ \\begin{aligned} \\text{New weekly pay} &= "+h+" \\times "+fmtF(w2,2)+" \\\\ &= "+fmtF(newG,2)+" \\end{aligned} \\] The new gross pay per week is <b>"+u4M(newG)+"</b>.",
   {mode:mode,w1:w1,w2:w2,h:h});
 }
 var ds2=u4Dist(inc,[{v:newG,fb:"That is the full new weekly pay. The question asks how much more that is than before."},
  {v:oldG,fb:"That is the old weekly pay. Compare the new pay with the old pay and subtract."},
  {v:raise,fb:"That is the raise per hour only. Multiply the hourly raise by the hours worked each week."}],u4M,2.50);
 return mcq("A retail worker earns "+u4M(w1)+" per hour for "+h+" hours a week. The wage rises to "+u4M(w2)+" per hour, with the same hours. How much more gross pay does the worker earn per week after the raise?",
  {t:u4M(inc),fb:"Yes: the weekly increase is the hourly raise times the hours."},ds2,
  "Find both weekly amounts and subtract, or multiply the raise by the hours. \\[ \\begin{aligned} \\text{New pay} &= "+h+" \\times "+fmtF(w2,2)+" = "+fmtF(newG,2)+" \\\\ \\text{Old pay} &= "+h+" \\times "+fmtF(w1,2)+" = "+fmtF(oldG,2)+" \\\\ \\text{Increase} &= "+fmtF(newG,2)+" - "+fmtF(oldG,2)+" = "+fmtF(inc,2)+" \\end{aligned} \\] The worker earns <b>"+u4M(inc)+"</b> more per week.",
  {mode:mode,w1:w1,w2:w2,h:h});
},["A what-if question needs both versions: before the change and after it.","Work out the weekly pay at the old rate and at the new rate, then use the one the question asks for."]);

E("u4-what-if-two-offers",4,["1.13","1.9"],3,"gen",function(){
 var name=pick(u4NAMES), mode=ri(1,2), guard=0, aTot=0, bTot=0, bDesc="", bCalc="";
 var wA=ri(1600,2200)/100, hA=ri(30,40); aTot=u4R(wA*hA);
 do{ if(mode===1){var sal=ri(560,940); bTot=sal; bDesc="a salary of "+u4M(sal)+" per week"; bCalc="\\text{Job B} &= "+fmtF(sal,2);}
   else {var wB=ri(1500,2100)/100, hB=ri(28,38), tp=ri(60,200); bTot=u4R(wB*hB+tp); bDesc=u4M(wB)+" per hour for "+hB+" hours a week plus about "+u4M(tp)+" a week in tips"; bCalc="\\text{Job B} &= "+hB+" \\times "+fmtF(wB,2)+" + "+fmtF(tp,2)+" = "+fmtF(bTot,2);}
   guard++; }while(Math.abs(aTot-bTot)<20&&guard<40);
 if(Math.abs(aTot-bTot)<20){bTot=u4R(aTot+60); bDesc="a salary of "+u4M(bTot)+" per week"; bCalc="\\text{Job B} &= "+fmtF(bTot,2);}
 var diff=u4R(Math.abs(aTot-bTot)), better=aTot>bTot?"Job A":"Job B";
 var ds=u4Dist(diff,[{v:u4R(aTot+bTot),fb:"That adds the two weekly amounts. To compare offers, subtract the smaller total from the larger one."},
  {v:u4R(Math.min(aTot,bTot)),fb:"That is just the lower-paying offer's weekly total. The question asks for the gap between the two offers."},
  {v:u4R(Math.abs(wA-(mode===2?15:18))*10),fb:"That compares hourly rates only. Weekly pay depends on hours, salary and tips as well."}],u4M,2.50);
 return mcq(name+" is choosing between two jobs. Job A pays "+u4M(wA)+" per hour for "+hA+" hours a week. Job B pays "+bDesc+". How much more gross pay per week does the better-paying job give?",
  {t:u4M(diff),fb:"Yes: total each offer for the week, then subtract the smaller from the larger."},ds,
  "Total each offer for one week, then subtract. \\[ \\begin{aligned} \\text{Job A} &= "+hA+" \\times "+fmtF(wA,2)+" = "+fmtF(aTot,2)+" \\\\ "+bCalc+" \\\\ \\text{Difference} &= "+fmtF(Math.max(aTot,bTot),2)+" - "+fmtF(Math.min(aTot,bTot),2)+" = "+fmtF(diff,2)+" \\end{aligned} \\] "+better+" pays <b>"+u4M(diff)+"</b> more per week.",
  {mode:mode,aTot:aTot,bTot:bTot});
},["Turn each offer into the same thing: total gross pay for one week.","Start by totalling Job A for the week, then do the same for Job B."]);

E("u4-find-pay-error",4,["1.14"],2,"gen",function(){
 var mode=ri(1,3);
 if(mode===1){
  var w=ri(1600,2400)/100, h=ri(30,42), good=u4R(h*w), wrong=u4R(good-pick([10,20,30,40]));
  var ds=u4Dist(good,[{v:wrong,fb:"That repeats the student's multiplication slip. Multiply the hours by the wage again and compare."},
   {v:u4R(good+w),fb:"That adds one extra hour of pay. The hours and wage in the stem give the total directly."},
   {v:u4R(good-w),fb:"That drops one hour of pay. Multiply the full hours by the full wage."}],u4M,2.50);
  return mcq("A student works out a gross pay. The worker put in "+h+" hours at "+u4M(w)+" per hour, and the student wrote: "+h+" x "+fmtF(w,2)+" = "+fmtF(wrong,2)+". What is the correct gross pay?",
   {t:u4M(good),fb:"Yes: the student's multiplication was off. Hours times wage gives this total."},ds,
   "The setup is right; the multiplication is wrong. \\[ \\begin{aligned} \\text{Gross pay} &= "+h+" \\times "+fmtF(w,2)+" \\\\ &= "+fmtF(good,2)+" \\end{aligned} \\] The correct gross pay is <b>"+u4M(good)+"</b>.",
   {mode:mode});
 }
 if(mode===2){
  var w2=ri(1500,2300)/100, R=ri(35,40), O=ri(3,8), reg=u4R(R*w2), good2=u4R(reg+O*1.5*w2), student=u4R((R+O)*w2);
  var ds2=u4Dist(good2,[{v:student,fb:"That repeats the student's error: the overtime hours were paid at the regular rate instead of time and a half."},
   {v:u4R(reg+O*2*w2),fb:"That pays overtime at double time. The stem says time and a half, which is 1.5 times the wage."},
   {v:reg,fb:"That leaves the overtime hours out. Add them at 1.5 times the wage."}],u4M,2.50);
  return mcq("A student works out a gross pay. The worker put in "+R+" regular hours and "+O+" overtime hours at "+u4M(w2)+" per hour, with overtime at time and a half. The student paid all "+(R+O)+" hours at the regular rate. What is the correct gross pay?",
   {t:u4M(good2),fb:"Yes: regular hours at the wage, overtime hours at 1.5 times the wage."},ds2,
   "The error is the overtime rate. Correct it and add the parts. \\[ \\begin{aligned} \\text{Regular pay} &= "+R+" \\times "+fmtF(w2,2)+" = "+fmtF(reg,2)+" \\\\ \\text{Overtime pay} &= "+O+" \\times 1.5 \\times "+fmtF(w2,2)+" = "+fmtF(u4R(O*1.5*w2),2)+" \\\\ \\text{Gross pay} &= "+fmtF(reg,2)+" + "+fmtF(u4R(O*1.5*w2),2)+" = "+fmtF(good2,2)+" \\end{aligned} \\] The correct gross pay is <b>"+u4M(good2)+"</b>.",
   {mode:mode});
 }
 var w3=ri(1400,1900)/100, h3=ri(22,36), tp3=ri(50,180), wage3=u4R(h3*w3), good3=u4R(wage3+tp3);
 var ds3=u4Dist(good3,[{v:wage3,fb:"That repeats the student's error: the tips were left out of gross pay."},
  {v:u4R(good3+tp3),fb:"That counts the tips twice. Tips are added to the wage once."},
  {v:u4R(wage3-tp3),fb:"That subtracts the tips. Tips are earnings, so they are added."}],u4M,2.50);
 return mcq("A student works out a server's gross pay. The server worked "+h3+" hours at "+u4M(w3)+" per hour and earned "+u4M(tp3)+" in tips. The student's answer counted only the hourly wage. What is the correct gross pay?",
  {t:u4M(good3),fb:"Yes: gross pay includes both the wage and the tips."},ds3,
  "The error is the missing tips. Add them to the wage. \\[ \\begin{aligned} \\text{Wage} &= "+h3+" \\times "+fmtF(w3,2)+" = "+fmtF(wage3,2)+" \\\\ \\text{Gross pay} &= "+fmtF(wage3,2)+" + "+fmtF(tp3,2)+" = "+fmtF(good3,2)+" \\end{aligned} \\] The correct gross pay is <b>"+u4M(good3)+"</b>.",
  {mode:mode});
},["Compare the student's steps with what the pay should include, and find the step that went wrong.","Rebuild the pay from the stem: hours, rate, overtime or tips, whichever apply."]);

E("u4-find-net-error",4,["1.14"],3,"gen",function(){
 var G=ri(1700,2900), d1=ri(80,160), d2=ri(25,60), d3=ri(15,45);
 var tot=d1+d2+d3, good=G-tot, mode=ri(1,3), student=0, errText="";
 if(mode===1){student=G-tot+d3; errText="added the union dues of "+u4M(d3)+" instead of subtracting them";}
 else if(mode===2){student=G-(d1+d2); errText="left out the union dues of "+u4M(d3)+" completely";}
 else {student=G-2*tot; errText="subtracted the total deductions twice";}
 var ds=u4Dist(good,[{v:student,fb:"That repeats the student's error: the student "+errText+"."},
  {v:G+tot,fb:"That adds the deductions to gross pay. Deductions come off, so net pay is smaller than gross pay."},
  {v:tot,fb:"That is the total of the deductions, not the take-home pay. Subtract the total from gross pay."}],u4M,2.50);
 return mcq("A student works out a net pay. Gross pay is "+u4M(G)+", with deductions of "+u4M(d1)+" for CPP, "+u4M(d2)+" for EI and "+u4M(d3)+" for union dues. The student "+errText+". What is the correct net pay?",
  {t:u4M(good),fb:"Yes: add all the deductions, then subtract the total from gross pay."},ds,
  "Add the deductions first, then subtract once. \\[ \\begin{aligned} \\text{Total deductions} &= "+fmtF(d1,2)+" + "+fmtF(d2,2)+" + "+fmtF(d3,2)+" = "+fmtF(tot,2)+" \\\\ \\text{Net pay} &= "+fmtF(G,2)+" - "+fmtF(tot,2)+" = "+fmtF(good,2)+" \\end{aligned} \\] The correct net pay is <b>"+u4M(good)+"</b>.",
  {mode:mode,G:G,tot:tot});
},["Net pay problems go wrong in the deductions: a missed item, a wrong sign, or a double subtraction.","Start by adding every deduction in the stem into one total."]);

E("u4-deduction-calc",4,["1.16"],2,"gen",function(){
 var G=ri(1500,3400), mode=ri(1,4), name="", rate=0, ded=0, cap=0, stem="";
 if(mode===1){name="CPP"; rate=pick([5,5.5,6,6.5]); ded=u4R(G*rate/100); stem="The CPP rate given for this problem is "+fmt(rate)+"% of gross pay.";}
 else if(mode===2){name="EI"; rate=pick([1.5,2,2.5]); ded=u4R(G*rate/100); stem="The EI rate given for this problem is "+fmt(rate)+"% of gross pay.";}
 else if(mode===3){name="income tax"; rate=pick([10,12,15,20]); ded=u4R(G*rate/100); stem="The income tax rate given for this problem is "+fmt(rate)+"% of gross pay.";}
 else {name="CPP"; rate=pick([6,6.5,7]); cap=ri(150,210); var raw=u4R(G*rate/100); ded=Math.min(raw,cap); stem="The CPP rate given for this problem is "+fmt(rate)+"% of gross pay, up to a maximum deduction of "+u4M(cap)+" per pay period.";}
 var ds=u4Dist(ded,[{v:u4R(G-ded),fb:"That is the pay left after this one deduction. The question asks for the deduction itself."},
  {v:u4R(ded/2),fb:"That takes half of the deduction. Apply the stated percent to the full gross pay for the period."},
  {v:u4R(G*(rate+2)/100),fb:"That uses a rate 2 percent higher than the stated rate. Use the rate given in the stem."}],u4M,2.50);
 var capNote=(mode===4)?" The percent gives "+fmtF(u4R(G*rate/100),2)+", which is over the maximum, so the deduction is capped at "+fmtF(cap,2)+".":"";
 return mcq("A worker's gross pay for one pay period is "+u4M(G)+". "+stem+" What is the "+name+" deduction for this period?",
  {t:u4M(ded),fb:"Yes: apply the stated rate to the gross pay"+(mode===4?", and respect the stated maximum":"")+"."},ds,
  "A percent deduction is the rate times the gross pay. \\[ \\begin{aligned} \\text{"+name+" deduction} &= "+fmt(rate)+"\\% \\times "+fmtF(G,2)+" \\\\ &= "+fmtF(u4R(G*rate/100),2)+" \\end{aligned} \\]"+capNote+" The "+name+" deduction is <b>"+u4M(ded)+"</b>.",
  {mode:mode,G:G,rate:rate});
},["Percent deduction means rate times gross pay. Watch for a stated maximum.","Start by writing the rate as a decimal or as a fraction of 100."]);

E("u4-net-from-deductions",4,["1.17"],2,"gen",function(){
 var G=ri(1500,3000), mode=ri(1,2);
 var items=[["health plan",ri(30,90)],["union dues",ri(20,60)],["uniform cost",ri(10,40)],["charitable donation",ri(5,30)]];
 var use=items.slice(0,ri(3,4)), tot=0, list=use.map(function(x){tot+=x[1]; return x[0]+" "+u4M(x[1]);}).join(", ");
 var vp=0, vpText="", earn=G;
 if(mode===2){var pct=pick([4,6]); vp=u4R(G*pct/100); vpText=" Vacation pay of "+pct+"% of gross pay is added before deductions."; earn=u4R(G+vp);}
 var good=u4R(earn-tot);
 var ds=u4Dist(good,[{v:u4R(G-tot),fb:mode===2?"That leaves out the vacation pay. Add the vacation pay to gross pay first, then subtract deductions.":"That subtracts from gross pay only. Check every amount that should come off."},
  {v:u4R(earn+tot),fb:"That adds the deductions. Deductions come off, so net pay is smaller."},
  {v:u4R(earn-use[0][1]),fb:"That subtracts only the first deduction. Subtract the total of all the deductions listed."}],u4M,2.50);
 return mcq("A worker's gross pay for a period is "+u4M(G)+"."+vpText+" The deductions for the period are: "+list+". What is the net pay?",
  {t:u4M(good),fb:"Yes: total the deductions and subtract them"+(mode===2?" after adding the vacation pay":"")+"."},ds,
  "Add any extra earnings, total the deductions, then subtract. \\[ \\begin{aligned} \\text{Total deductions} &= "+use.map(function(x){return fmtF(x[1],2);}).join(" + ")+" = "+fmtF(tot,2)+" \\\\ \\text{Net pay} &= "+fmtF(earn,2)+" - "+fmtF(tot,2)+" = "+fmtF(good,2)+" \\end{aligned} \\] The net pay is <b>"+u4M(good)+"</b>.",
  {mode:mode,G:G,tot:tot,vp:vp});
},["Net pay is what remains after every listed deduction comes off the earnings.","Start by adding all the deductions into one total."]);

E("u4-commission-plus-base",4,["1.18","2.3"],2,"gen",function(){
 var base=ri(1200,2400), sales=ri(40,300)*100, rate=pick([3,4,5,6,8,10]);
 var comm=u4R(sales*rate/100), gross=u4R(base+comm);
 var ds=u4Dist(gross,[{v:comm,fb:"That is the commission only. Add the base salary to get gross pay."},
  {v:u4R(base+sales*2*rate/100),fb:"That doubles the commission rate. Use the single rate stated in the stem."},
  {v:u4R(base+sales),fb:"That adds the full sales amount. The worker earns only the stated percent of sales."}],u4M,2.50);
 return mcq("A salesperson earns a base salary of "+u4M(base)+" per month plus commission at "+rate+"% of sales. In one month the salesperson sells "+u4M(sales)+" of furniture. What is the gross pay for the month?",
  {t:u4M(gross),fb:"Yes: base salary plus the percent of sales."},ds,
  "Apply the commission formula, then add the base. \\[ \\begin{aligned} \\text{Commission} &= "+fmt(rate)+"\\% \\times "+fmtF(sales,2)+" = "+fmtF(comm,2)+" \\\\ \\text{Gross pay} &= "+fmtF(base,2)+" + "+fmtF(comm,2)+" = "+fmtF(gross,2)+" \\end{aligned} \\] The gross pay is <b>"+u4M(gross)+"</b>.",
  {base:base,sales:sales,rate:rate});
},["Gross pay here has two parts: a fixed base and a percent of sales.","Start with the commission: the rate times the sales."]);

E("u4-method-advantage-match",4,["1.19"],3,"gen",function(){
 var name=pick(u4NAMES);
 var temps=[
  function(){var w=ri(1500,2100)/100; return mcq(name+" wants work where extra hours always mean extra pay, and weeks with no shifts mean no pay is expected. Which method of earning income fits this description best?",
   {t:"Hourly wage",fb:"Yes: hourly pay rises with hours and stops when no hours are worked."},
   [{t:"Salary",fb:"A salary pays the same amount even when hours change, so extra hours would not add pay."},
    {t:"Commission",fb:"Commission follows sales, not hours. The description is built on hours worked."},
    {t:"Contract pay",fb:"Contract pay is a total per job. The description is built on hours worked."}],
   "Pay tied directly to hours worked, rising with extra hours, is an <b>hourly wage</b>.",{});},
  function(){var s=ri(6000,14000); return mcq(name+" earned commission on "+u4M(s)+" of sales last month, then sales fell by half the next month and the pay cheques shrank with them. Which disadvantage of commission does this show?",
   {t:"Income is unpredictable when sales change",fb:"Yes: commission pay follows sales up and down."},
   [{t:"Income tax is never deducted from the pay",fb:"Taxes still apply to commission earnings. The problem shown is pay changing with sales."},
    {t:"The worker must pay the employer in slow months",fb:"Slow sales mean low pay, not payments to the employer."},
    {t:"Hours of work are fixed by the employer",fb:"The stem is about pay amounts changing, not about fixed hours."}],
   "Because commission follows sales, a drop in sales cuts pay. The disadvantage is that <b>income is unpredictable when sales change</b>.",{});},
  function(){var p=ri(8,20); return mcq(name+" is paid per bin of berries picked, about "+p+" bins on a good day and far fewer on rainy days. Which statement gives a disadvantage of this method?",
   {t:"Pay drops on days when the weather slows the work",fb:"Yes: piecework pay depends on output, and weather can cut output."},
   [{t:"Pay stays the same no matter how many bins are picked",fb:"That is the opposite of piecework. Pay follows the bins finished."},
    {t:"The picker earns a percent of the farm's land value",fb:"Piecework pays per item, not a percent of land value."},
    {t:"Bins are paid for before they are picked",fb:"Piecework pays for finished work. The disadvantage is pay falling when output falls."}],
   "Under piecework, pay follows finished items, so <b>pay drops on days when the weather slows the work</b>.",{});},
  function(){var pr=ri(200,400)/100; return mcq(name+" earns an extra "+u4M(pr)+" per hour for overnight shifts. The trade-off is regular night work. Which statement best describes this arrangement?",
   {t:"The shift premium raises pay, but the hours are hard on sleep and family time",fb:"Yes: premium pay is the gain; unsocial hours are the cost."},
   [{t:"The premium means no other pay is earned at night",fb:"A premium is added on top of the regular wage, not instead of it."},
    {t:"Night workers trade all their daytime pay for the premium",fb:"The premium is an extra per hour. Nothing is traded away from the base wage."},
    {t:"The arrangement is a salary with set yearly pay",fb:"The pay here is hourly with an extra amount for night shifts."}],
   "A shift premium of "+u4M(pr)+" per hour <b>raises pay, but the hours are hard on sleep and family time</b>.",{});},
  function(){var j=ri(1500,4500); return mcq(name+" just finished a contract job worth "+u4M(j)+" and has no next job booked yet. Which statement best describes the disadvantage "+name+" faces?",
   {t:"Income stops until another contract is signed",fb:"Yes: between contracts, a contract worker has no pay from that work."},
   [{t:"The finished job's pay must be returned",fb:"Earned contract pay is kept. The problem is the gap ahead."},
    {t:"Contract workers are paid the same during gaps",fb:"Pay during gaps is exactly what contract work does not provide."},
    {t:"The next job's price is set by the last customer",fb:"Each contract price is agreed for that job. The disadvantage is the income gap."}],
   "For contract work, <b>income stops until another contract is signed</b>, which is its main disadvantage here.",{});},
  function(){var y=ri(55,95)*1000; return mcq(name+" earns a salary of "+u4M(y)+" per year. Business is slow this month, yet the pay is unchanged. Which statement best describes the advantage shown?",
   {t:"Income stays steady even when work is slow",fb:"Yes: a salary does not drop when business slows."},
   [{t:"Pay rises with each extra hour worked",fb:"A salary usually stays fixed instead of rising per hour."},
    {t:"Income depends on how much is sold",fb:"That describes commission. This pay stays the same."},
    {t:"Tips from customers top up the pay",fb:"No tips are involved. The advantage is the steady amount."}],
   "A salary keeps coming at the same rate, so <b>income stays steady even when work is slow</b>.",{});}
 ];
 return pick(temps)();
},["Judge the method by its trade-off: what the worker gains and what the worker gives up.","Ask whether the pay in the situation is steady or changing, and what it depends on."]);

E("u4-job-method-match",4,["1.10"],2,"gen",function(){
 var name=pick(u4NAMES);
 var temps=[
  function(){var w=ri(1500,1900)/100,t=ri(60,220); return mcq(name+" drives a taxi, earning "+u4M(w)+" per hour from the company plus cash extras that riders leave after trips. Which method of earning income is this?",
   {t:"Wage and tips",fb:"Yes: an hourly wage plus extras from customers is wage and tips."},
   [{t:"Commission",fb:"Commission is a percent of sales set by the employer. The extras here are tips from riders."},
    {t:"Piecework",fb:"Piecework pays per item finished. This pay is hourly plus customer extras."},
    {t:"Salary",fb:"A salary is a fixed amount per period. This pay is hourly and changes with tips."}],
   "An hourly wage plus customer extras is <b>wage and tips</b>.",{});},
  function(){var r=pick([4,5,6,8]); return mcq(name+" sells appliances and earns "+r+"% of the price of every item sold, with no base pay. Which method of earning income is this?",
   {t:"Commission",fb:"Yes: a percent of each sale is commission."},
   [{t:"Hourly wage",fb:"An hourly wage pays for time. This pay comes only from sales."},
    {t:"Bonus",fb:"A bonus is a one-time extra for a target. This percent is paid on every sale."},
    {t:"Contract pay",fb:"Contract pay is a total price for a job. This pay is a percent of sales."}],
   "A percent of the selling price is <b>commission</b>.",{});},
  function(){var n=ri(30,70); return mcq(name+" works in a fish plant and is paid for each of the "+n+" trays packed on an average day, at a set amount per tray. Which method of earning income is this?",
   {t:"Piecework",fb:"Yes: pay per item or tray finished is piecework."},
   [{t:"Salary",fb:"A salary is fixed per period. This pay changes with trays packed."},
    {t:"Shift premium",fb:"A shift premium is extra hourly pay for certain shifts. This pay is per tray."},
    {t:"Commission",fb:"Commission is a percent of a sale price. This pay is a set amount per tray."}],
   "Pay per item finished is <b>piecework</b>.",{});},
  function(){var p=ri(1800,3600); return mcq("A town hires "+name+" to repaint the community hall for one total price of "+u4M(p)+", paid when the hall is finished. Which method of earning income is this?",
   {t:"Contract pay",fb:"Yes: one total price for a finished job is contract pay."},
   [{t:"Hourly wage",fb:"No hourly rate is given. The price covers the whole job."},
    {t:"Wage and tips",fb:"There is no wage plus customer extras here, just one total price."},
    {t:"Bonus",fb:"A bonus is an extra on top of regular pay. This total is the pay for the job."}],
   "One total price for a whole job is <b>contract pay</b>.",{});},
  function(){var x=ri(150,350)/100; return mcq(name+" works at a call centre and earns an extra "+u4M(x)+" per hour for evening shifts, on top of the regular wage. Which method is the extra pay an example of?",
   {t:"Shift premium",fb:"Yes: extra hourly pay for evening shifts is a shift premium."},
   [{t:"Tips",fb:"Tips come from customers. This extra is part of the wage from the employer."},
    {t:"Commission",fb:"Commission is a percent of sales. This extra is per evening hour."},
    {t:"Piecework",fb:"Piecework pays per item finished. This extra is per hour on certain shifts."}],
   "Extra hourly pay for less popular shifts is a <b>shift premium</b>.",{});},
  function(){var b=ri(300,900); return mcq(name+" earns a steady wage at a hardware store, and in March the store paid every worker an extra "+u4M(b)+" for beating the winter sales target. Which method is the extra payment an example of?",
   {t:"Bonus",fb:"Yes: a one-time extra for beating a target is a bonus."},
   [{t:"Commission",fb:"Commission is a percent of each sale as sales happen. This is one extra payment for a group target."},
    {t:"Overtime pay",fb:"Overtime pay is a higher rate for extra hours. This extra is for beating a sales target."},
    {t:"Vacation pay",fb:"Vacation pay is a percent of earnings paid for time off. This extra rewards a target."}],
   "A one-time extra payment for reaching a target is a <b>bonus</b>.",{});},
  function(){var y=ri(48,78)*1000; return mcq(name+" is an office administrator paid "+u4M(y)+" per year in equal biweekly amounts. Which method of earning income is this?",
   {t:"Salary",fb:"Yes: a yearly amount in equal payments is a salary."},
   [{t:"Hourly wage",fb:"The pay is described as a yearly amount, not a rate per hour."},
    {t:"Contract pay",fb:"Contract pay is a total for one job. This is ongoing yearly pay."},
    {t:"Wage and tips",fb:"No tips are mentioned, and the amount is fixed for the year."}],
   "A fixed yearly amount paid in equal parts is a <b>salary</b>.",{});},
  function(){var w=ri(1600,2100)/100; return mcq(name+" loads trucks at a warehouse for "+u4M(w)+" for every hour on the clock. Which method of earning income is this?",
   {t:"Hourly wage",fb:"Yes: pay per hour on the clock is an hourly wage."},
   [{t:"Piecework",fb:"Piecework pays per item finished. This pay is per hour."},
    {t:"Salary",fb:"A salary is fixed per period. This pay grows with hours worked."},
    {t:"Commission",fb:"Commission is a percent of sales. This pay is based on time."}],
   "Pay for each hour worked is an <b>hourly wage</b>.",{});}
 ];
 return pick(temps)();
},["Read how the pay is built in the description, then name the method.","Ask: is the pay based on hours, sales, items, shifts, a target, or one total price?"]);

E("u4-hours-schedule-cr",4,["1.11"],2,"gen",function(){
 function tstr(m){var h=Math.floor(m/60), mm=m%60, ap=h>=12?"PM":"AM", hh=h%12; if(hh===0)hh=12; return hh+":"+(mm<10?"0":"")+mm+" "+ap;}
 var days=["Monday","Wednesday","Friday"], lines=[], chain=[], tot=0;
 for(var i=0;i<3;i++){
  var start=pick([450,480,510,540]), dur=pick([480,510,540,570]), brk=pick([30,60]);
  var paid=(dur-brk)/60; tot+=paid;
  lines.push(days[i]+": "+tstr(start)+" to "+tstr(start+dur)+", with an unpaid meal break of "+brk+" minutes");
  chain.push(fmt(paid));
 }
 tot=u4R(tot);
 return numq("A part-time worker's schedule for the week is listed below. "+lines.join(". ")+". Find the total paid time worked for the week, in decimal hours. Give your answer in hours.",
  tot,0.02,
  "For each day, subtract the start time from the end time, take off the unpaid break, and write the result in decimal hours. \\[ \\begin{aligned} \\text{Paid time each day} &= "+chain.join(", ")+" \\\\ \\text{Total} &= "+chain.join(" + ")+" = "+fmt(tot)+" \\end{aligned} \\] The total paid time worked is <b>"+fmt(tot)+" hours</b>.",
  {tot:tot});
},["Paid time is shift length minus unpaid break time, and the answer goes in decimal hours.","For the first day, work out end time minus start time, then subtract the break."]);

E("u4-cpp-ei-tax-cr",4,["1.16"],2,"gen",function(){
 var G=ri(140,320)*10, cppR=pick([5,5.5,6]), eiR=pick([1.5,2]), taxR=pick([10,12,15]);
 var cpp=u4R(G*cppR/100), ei=u4R(G*eiR/100), tax=u4R(G*taxR/100), tot=u4R(cpp+ei+tax);
 return numq("A worker's gross pay for a pay period is "+u4M(G)+". For this problem, use these deduction rates: CPP is "+fmt(cppR)+"% of gross pay, EI is "+fmt(eiR)+"% of gross pay, and income tax is "+fmt(taxR)+"% of gross pay. Find the total of these three deductions. Give your answer in dollars.",
  tot,0.05,
  "Apply each stated rate to the gross pay, then add. \\[ \\begin{aligned} \\text{CPP} &= "+fmt(cppR)+"\\% \\times "+fmtF(G,2)+" = "+fmtF(cpp,2)+" \\\\ \\text{EI} &= "+fmt(eiR)+"\\% \\times "+fmtF(G,2)+" = "+fmtF(ei,2)+" \\\\ \\text{Income tax} &= "+fmt(taxR)+"\\% \\times "+fmtF(G,2)+" = "+fmtF(tax,2)+" \\\\ \\text{Total} &= "+fmtF(cpp,2)+" + "+fmtF(ei,2)+" + "+fmtF(tax,2)+" = "+fmtF(tot,2)+" \\end{aligned} \\] The total deductions are <b>"+u4M(tot)+"</b>.",
  {G:G,cppR:cppR,eiR:eiR,taxR:taxR});
},["Each deduction is its stated percent of the same gross pay.","Start with the CPP amount: rate times gross pay, with the percent changed to a decimal."]);

E("u4-commission-only-cr",4,["1.18"],2,"gen",function(){
 var sales=ri(30,240)*100, rate=pick([4,5,6,8,10]), item=pick(["snowmobiles","appliances","boats","office equipment","truck accessories"]);
 var comm=u4R(sales*rate/100);
 return numq("A salesperson is paid by commission only, at a single rate of "+rate+"% of sales. In one month the salesperson sells "+u4M(sales)+" worth of "+item+". Find the gross pay for the month. Give your answer in dollars.",
  comm,0.05,
  "Commission-only gross pay is the rate times the sales. \\[ \\begin{aligned} \\text{Gross pay} &= "+fmt(rate)+"\\% \\times "+fmtF(sales,2)+" \\\\ &= "+fmtF(comm,2)+" \\end{aligned} \\] The gross pay is <b>"+u4M(comm)+"</b>.",
  {sales:sales,rate:rate});
},["With commission only, the whole gross pay is the percent of sales.","Start by changing the percent to a decimal and multiplying by the sales."]);

E("u4-overtime-gross-cr",4,["1.12"],2,"gen",function(){
 var w=ri(1600,2500)/100, R=ri(30,38), O=ri(3,8), D=ri(2,6);
 var reg=u4R(R*w), ot=u4R(O*1.5*w), dt=u4R(D*2*w), gross=u4R(reg+ot+dt);
 return numq("A trades helper earns "+u4M(w)+" per hour. In one week the helper works "+R+" regular hours, "+O+" overtime hours paid at time and a half, and "+D+" hours on a holiday paid at double time. Find the gross pay for the week. Give your answer in dollars.",
  gross,0.05,
  "Price each group of hours at its own rate, then add. \\[ \\begin{aligned} \\text{Regular} &= "+R+" \\times "+fmtF(w,2)+" = "+fmtF(reg,2)+" \\\\ \\text{Time and a half} &= "+O+" \\times 1.5 \\times "+fmtF(w,2)+" = "+fmtF(ot,2)+" \\\\ \\text{Double time} &= "+D+" \\times 2 \\times "+fmtF(w,2)+" = "+fmtF(dt,2)+" \\\\ \\text{Gross pay} &= "+fmtF(reg,2)+" + "+fmtF(ot,2)+" + "+fmtF(dt,2)+" = "+fmtF(gross,2)+" \\end{aligned} \\] The gross pay is <b>"+u4M(gross)+"</b>.",
  {w:w,R:R,O:O,D:D});
},["Split the week into three groups of hours and price each group at its own rate.","Start with the regular hours times the wage."]);

E("u4-net-pay-cr",4,["1.17"],2,"gen",function(){
 var G=ri(190,280)*10, pct=pick([4,6]), vp=u4R(G*pct/100);
 var deds=[["CPP",ri(90,170)],["EI",ri(30,60)],["Income tax",ri(200,420)],["Health plan",ri(35,85)],["Union dues",ri(20,55)]];
 var tot=0; deds.forEach(function(d){tot+=d[1];});
 var earn=u4R(G+vp), net=u4R(earn-tot);
 var q=numq("The pay stub figure shows one worker's pay period. Vacation pay of "+pct+"% of gross pay is added to the earnings, and the stub lists the deductions. Find the net pay for the period. Give your answer in dollars.",
  net,0.05,
  "Add the vacation pay to gross pay, total the deductions, then subtract. \\[ \\begin{aligned} \\text{Vacation pay} &= "+fmt(pct)+"\\% \\times "+fmtF(G,2)+" = "+fmtF(vp,2)+" \\\\ \\text{Total earnings} &= "+fmtF(G,2)+" + "+fmtF(vp,2)+" = "+fmtF(earn,2)+" \\\\ \\text{Total deductions} &= "+deds.map(function(d){return fmtF(d[1],2);}).join(" + ")+" = "+fmtF(tot,2)+" \\\\ \\text{Net pay} &= "+fmtF(earn,2)+" - "+fmtF(tot,2)+" = "+fmtF(net,2)+" \\end{aligned} \\] The net pay is <b>"+u4M(net)+"</b>.",
  {G:G,pct:pct,tot:tot});
 q.figure=u4TableFig([["Pay stub","Amount"],["Gross pay",u4M(G)],["Vacation pay",u4M(vp)]].concat(deds.map(function(d){return [d[0],u4M(d[1])];})));
 return q;
},["Net pay is total earnings minus total deductions. Vacation pay is an earning, not a deduction.","Start by adding the gross pay and the vacation pay, then total the deduction rows."]);

E("u4-what-if-cr",4,["1.13"],2,"gen",function(){
 var mode=ri(1,2);
 if(mode===1){
  var w1=ri(1500,2200)/100, raise=ri(75,300)/100, w2=u4R(w1+raise), h=ri(25,40), inc=u4R(h*raise);
  return numq("A worker earns "+u4M(w1)+" per hour and works "+h+" hours per week. The wage is raised to "+u4M(w2)+" per hour, with the same hours. How much more gross pay does the worker earn per week after the raise? Give your answer in dollars.",
   inc,0.05,
   "Multiply the hourly raise by the weekly hours. \\[ \\begin{aligned} \\text{Hourly raise} &= "+fmtF(w2,2)+" - "+fmtF(w1,2)+" = "+fmtF(raise,2)+" \\\\ \\text{Weekly increase} &= "+h+" \\times "+fmtF(raise,2)+" = "+fmtF(inc,2)+" \\end{aligned} \\] The worker earns <b>"+u4M(inc)+"</b> more per week.",
   {mode:mode});
 }
 var w=ri(1600,2400)/100, h1=ri(20,28), add=ri(4,10), h2=h1+add, inc2=u4R(add*w);
 return numq("A worker earns "+u4M(w)+" per hour. The worker's schedule grows from "+h1+" hours per week to "+h2+" hours per week at the same wage. How much more gross pay does the worker earn per week? Give your answer in dollars.",
  inc2,0.05,
  "Only the added hours change the pay, so multiply them by the wage. \\[ \\begin{aligned} \\text{Added hours} &= "+h2+" - "+h1+" = "+add+" \\\\ \\text{Weekly increase} &= "+add+" \\times "+fmtF(w,2)+" = "+fmtF(inc2,2)+" \\end{aligned} \\] The worker earns <b>"+u4M(inc2)+"</b> more per week.",
  {mode:mode});
},["A what-if question compares two versions of the pay. The change is what matters here.","Find how much one thing changed: the hourly rate, or the weekly hours, then scale it up."]);

E("u4-full-pay-stub-cr",4,["1.16","1.17"],3,"gen",function(){
 var G=ri(280,420)*10, cppR=pick([5.5,6,6.5]), cap=ri(160,240), eiR=pick([1.5,2]), taxR=pick([12,15,18]), dues=ri(25,60);
 var cppRaw=u4R(G*cppR/100), cpp=Math.min(cppRaw,cap), ei=u4R(G*eiR/100), tax=u4R(G*taxR/100);
 var tot=u4R(cpp+ei+tax+dues), net=u4R(G-tot);
 var capLine=(cppRaw>cap)?"\\text{CPP} &= \\text{maximum stated} = "+fmtF(cpp,2)+" \\\\":"\\text{CPP} &= "+fmt(cppR)+"\\% \\times "+fmtF(G,2)+" = "+fmtF(cpp,2)+" \\\\";
 return numq("A worker's gross pay for a pay period is "+u4M(G)+". For this problem, use these stated deduction rules: CPP is "+fmt(cppR)+"% of gross pay, up to a maximum of "+u4M(cap)+" per period; EI is "+fmt(eiR)+"% of gross pay; income tax is "+fmt(taxR)+"% of gross pay; union dues are "+u4M(dues)+". Find the net pay for the period. Give your answer in dollars.",
  net,0.10,
  "Work out each deduction with its stated rule, total them, and subtract from gross pay. The CPP percent gives "+fmtF(cppRaw,2)+", and the maximum is "+fmtF(cap,2)+", so the CPP deduction is "+fmtF(cpp,2)+". \\[ \\begin{aligned} "+capLine+" \\text{EI} &= "+fmt(eiR)+"\\% \\times "+fmtF(G,2)+" = "+fmtF(ei,2)+" \\\\ \\text{Income tax} &= "+fmt(taxR)+"\\% \\times "+fmtF(G,2)+" = "+fmtF(tax,2)+" \\\\ \\text{Total deductions} &= "+fmtF(cpp,2)+" + "+fmtF(ei,2)+" + "+fmtF(tax,2)+" + "+fmtF(dues,2)+" = "+fmtF(tot,2)+" \\\\ \\text{Net pay} &= "+fmtF(G,2)+" - "+fmtF(tot,2)+" = "+fmtF(net,2)+" \\end{aligned} \\] The net pay is <b>"+u4M(net)+"</b>.",
  {G:G,cppR:cppR,cap:cap});
},["Handle one deduction at a time, using the rule stated for it. One of them has a maximum.","Start with CPP: apply the percent, then compare the result with the stated maximum."]);

E("u4-gross-mixed-cr",4,["1.18","1.12"],3,"gen",function(){
 var w=ri(1500,2200)/100, R=ri(30,38), O=ri(2,8), sales=ri(20,120)*100, rate=pick([3,5,6,8]);
 var reg=u4R(R*w), ot=u4R(O*1.5*w), comm=u4R(sales*rate/100), gross=u4R(reg+ot+comm);
 return numq("A worker at an electronics store earns "+u4M(w)+" per hour. In one week the worker puts in "+R+" regular hours and "+O+" overtime hours paid at time and a half. The worker also earns commission at "+rate+"% on "+u4M(sales)+" of sales that week. Find the total gross pay for the week. Give your answer in dollars.",
  gross,0.10,
  "Gross pay combines the hourly parts and the commission. \\[ \\begin{aligned} \\text{Regular pay} &= "+R+" \\times "+fmtF(w,2)+" = "+fmtF(reg,2)+" \\\\ \\text{Overtime pay} &= "+O+" \\times 1.5 \\times "+fmtF(w,2)+" = "+fmtF(ot,2)+" \\\\ \\text{Commission} &= "+fmt(rate)+"\\% \\times "+fmtF(sales,2)+" = "+fmtF(comm,2)+" \\\\ \\text{Gross pay} &= "+fmtF(reg,2)+" + "+fmtF(ot,2)+" + "+fmtF(comm,2)+" = "+fmtF(gross,2)+" \\end{aligned} \\] The total gross pay is <b>"+u4M(gross)+"</b>.",
  {w:w,R:R,O:O,sales:sales,rate:rate});
},["Total gross pay is every part of the earnings added together.","Start with the regular hours, then the overtime hours, then the commission."]);

/* ----- bank-u5.js ----- */
// Math 1202 Unit 5 All About Angles question bank
// Figures (added Nov 2026): complementary and supplementary pairs,
// angles around a point, pizza and clock divisions, vertically
// opposite angles, a perpendicular transversal setup and split
// supplementary angles draw labelled figures from each question's
// own values. Verbal definition, method, referent and strategy
// entries stay figureless, as do the pair naming entry (a diagram
// would name the pair) and the non-parallel reasoning entry.
// Cut verbatim from the standalone bank source
// (math-1202-review/bank-src.js, lines 2583 to 3179).
// CRMARKS: u5-cr-comp-supp=2
// CRMARKS: u5-cr-trans-find=2
// CRMARKS: u5-cr-around-point=2
// CRMARKS: u5-cr-replicate-bisect=3
// CRMARKS: u5-cr-perp-transversal=3
// CRMARKS: u5-cr-protractor=3
// CRMARKS: u5-cr-angle-chase=2
// CRMARKS: u5-cr-trans-algebra=3
/* ===== Unit 5 ===== */
/* Math 1202 Unit 5: All About Angles. Helpers prefixed u5. Codes from ind-unit5.json. */
function u5Pt(cx,cy,r,deg){var t=deg*Math.PI/180;return [cx+r*Math.cos(t),cy-r*Math.sin(t)];}
function u5AngleSVG(deg,label,base){
  base=base||0;var cx=150,cy=98,W=300,H=200;
  var p0=u5Pt(cx,cy,88,base),p1=u5Pt(cx,cy,88,base+deg);
  var a0=u5Pt(cx,cy,40,base),a1=u5Pt(cx,cy,40,base+deg);
  var mid=u5Pt(cx,cy,64,base+deg/2),large=deg>180?1:0;
  var s='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Angle diagram">';
  s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(p0[0],1)+'" y2="'+fmt(p0[1],1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(p1[0],1)+'" y2="'+fmt(p1[1],1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<path d="M '+fmt(a0[0],1)+' '+fmt(a0[1],1)+' A 40 40 0 '+large+' 0 '+fmt(a1[0],1)+' '+fmt(a1[1],1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="3" fill="'+FIG_INK+'"/>';
  if(label)s+=_txt(mid[0],mid[1],label,13,false);
  return s+'</svg>';
}
function u5LinesSVG(mode,slant,off){
  var W=300,H=190,s='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pair of lines diagram">';
  function ln(x1,y1,x2,y2,w){return '<line x1="'+fmt(x1,1)+'" y1="'+fmt(y1,1)+'" x2="'+fmt(x2,1)+'" y2="'+fmt(y2,1)+'" stroke="'+FIG_INK+'" stroke-width="'+(w||2)+'"/>';}
  if(mode==="parallel"){
    s+=ln(20,75,280,75)+ln(20,75+off,280,75+off);
    s+='<path d="M 140 69 l 8 6 l -8 6" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+='<path d="M 140 '+(69+off)+' l 8 6 l -8 6" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  } else if(mode==="perpendicular"){
    s+=ln(20,125,280,125)+ln(150,20,150,172);
    s+='<path d="M 150 107 h 18 v 18" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  } else {
    var c=u5Pt(150,105,92,slant),c2=u5Pt(150,105,-92,slant);
    s+=ln(20,140,280,140)+ln(c2[0],c2[1],c[0],c[1]);
  }
  return s+'</svg>';
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
function u5DegOpts(ans,pool){
  var out=[];pool.forEach(function(v){if(v!==ans&&v>0&&v<360&&out.indexOf(v)<0)out.push(v);});
  var k=20;while(out.length<3){if(ans+k!==ans&&out.indexOf(ans+k)<0)out.push(ans+k);k+=15;}
  return out.slice(0,3).map(function(v){return {t:v+"°", fb:v+"° does not follow from the angle relationship used here: check the sum or equality the diagram gives."};});
}

function u5ArcPath(cx,cy,r,a0,a1){
  var p0=u5Pt(cx,cy,r,a0), p1=u5Pt(cx,cy,r,a1), large=(a1-a0)>180?1:0;
  return '<path d="M '+fmt(p0[0],1)+' '+fmt(p0[1],1)+' A '+r+' '+r+' 0 '+large+' 0 '+fmt(p1[0],1)+' '+fmt(p1[1],1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
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
function u5AroundSVG(sweeps, labels){
  var cx=150, cy=102, s='<svg viewBox="0 0 300 205" width="300" height="205" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Angles around a point">', ang=0, i;
  var bounds=[0];
  for(i=0;i<sweeps.length;i++){ ang+=sweeps[i]; bounds.push(ang); }
  for(i=0;i<bounds.length;i++){ var pp=u5Pt(cx,cy,80,bounds[i]%360); s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(pp[0],1)+'" y2="'+fmt(pp[1],1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>'; }
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="3" fill="'+FIG_INK+'"/>';
  for(i=0;i<sweeps.length;i++){ var mid=bounds[i]+sweeps[i]/2, lp=u5Pt(cx,cy,54,mid); s+=_txt(lp[0],lp[1],labels[i],12,false); }
  return s+'</svg>';
}
function u5PizzaSVG(n){
  var cx=150, cy=102, r=76, step=360/n, s='<svg viewBox="0 0 300 205" width="300" height="205" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Round pizza cut into equal slices">';
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  var a0=u5Pt(cx,cy,r,90), a1=u5Pt(cx,cy,r,90+step);
  s+='<polygon points="'+cx+','+cy+' '+fmt(a0[0],1)+','+fmt(a0[1],1)+' '+fmt(a1[0],1)+','+fmt(a1[1],1)+'" fill="'+FIG_SHADE+'"/>';
  for(var i=0;i<n;i++){ var pp=u5Pt(cx,cy,r,90+i*step); s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(pp[0],1)+'" y2="'+fmt(pp[1],1)+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>'; }
  var mid=u5Pt(cx,cy,42,90+step/2);
  s+=_txt(mid[0],mid[1],"?",13,false);
  return s+'</svg>';
}
function u5ClockSVG(k){
  var cx=150, cy=102, r=76, s='<svg viewBox="0 0 300 205" width="300" height="205" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Clock face showing the angle from 12 to a later hour mark">';
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  for(var i=0;i<12;i++){ var p1=u5Pt(cx,cy,r-9,90-i*30), p2=u5Pt(cx,cy,r,90-i*30); s+='<line x1="'+fmt(p1[0],1)+'" y1="'+fmt(p1[1],1)+'" x2="'+fmt(p2[0],1)+'" y2="'+fmt(p2[1],1)+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>'; }
  var t12=u5Pt(cx,cy,58,90), tk=u5Pt(cx,cy,58,90-30*k);
  s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(t12[0],1)+'" y2="'+fmt(t12[1],1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(tk[0],1)+'" y2="'+fmt(tk[1],1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="3" fill="'+FIG_INK+'"/>';
  var l12=u5Pt(cx,cy,r+13,90), lk=u5Pt(cx,cy,r+13,90-30*k), lm=u5Pt(cx,cy,36,90-15*k);
  s+=_txt(l12[0],l12[1],"12",11,false);
  s+=_txt(lk[0],lk[1],""+k,11,false);
  s+=_txt(lm[0],lm[1],"?",13,false);
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
function u5PerpTransSVG(a){
  var tanA=Math.tan(a*Math.PI/180), base=Math.min(200,120/Math.max(tanA,0.2)), hgt=base*tanA;
  var Ax=70, Ay=185, Bx=Ax+base, Cy=Ay-hgt, s='<svg viewBox="0 0 320 230" width="320" height="230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parallel lines with a perpendicular transversal and a diagonal">';
  s+='<line x1="25" y1="'+Ay+'" x2="308" y2="'+Ay+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="25" y1="'+fmt(Cy,1)+'" x2="308" y2="'+fmt(Cy,1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<path d="M 248 '+(Ay-6)+' l 8 6 l -8 6" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+='<path d="M 248 '+fmt(Cy-6,1)+' l 8 6 l -8 6" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+='<line x1="'+Ax+'" y1="208" x2="'+Ax+'" y2="28" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="'+fmt(Bx,1)+'" y1="'+Ay+'" x2="'+Ax+'" y2="'+fmt(Cy,1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<path d="M '+(Ax+14)+' '+Ay+' L '+(Ax+14)+' '+(Ay-14)+' L '+Ax+' '+(Ay-14)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.4"/>';
  s+=_txt(Bx-27,Ay-11,a+"\u00B0",12.5,false);
  s+=_txt(Ax+19,Cy+21,"?",12.5,false);
  return s+'</svg>';
}
function u5SuppBisectSVG(a){
  var cx=150, cy=135, mid=90+a/2, s='<svg viewBox="0 0 300 200" width="300" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A supplementary angle split into two equal parts">';
  [0,a,mid,180].forEach(function(d){ var pp=u5Pt(cx,cy,86,d); s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(pp[0],1)+'" y2="'+fmt(pp[1],1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>'; });
  s+=u5ArcPath(cx,cy,30,0,a)+u5ArcPath(cx,cy,30,a,mid)+u5ArcPath(cx,cy,30,mid,180);
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="3" fill="'+FIG_INK+'"/>';
  var l1=u5Pt(cx,cy,58,a/2), l2=u5Pt(cx,cy,58,(a+mid)/2), l3=u5Pt(cx,cy,58,(mid+180)/2);
  s+=_txt(l1[0],l1[1],a+"\u00B0",12,false);
  s+=_txt(l2[0],l2[1],"?",12.5,false);
  s+=_txt(l3[0],l3[1],"?",12.5,false);
  return s+'</svg>';
}
function u5SplitAngleSVG(A, parts){
  var cx=80, cy=155, s='<svg viewBox="0 0 300 200" width="300" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="An angle split into equal parts">';
  for(var i=0;i<=parts;i++){ var pp=u5Pt(cx,cy,92,i*A/parts); s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(pp[0],1)+'" y2="'+fmt(pp[1],1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>'; }
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="3" fill="'+FIG_INK+'"/>';
  for(var j=0;j<parts;j++){ var lp=u5Pt(cx,cy,58,(j+0.5)*A/parts); s+=_txt(lp[0],lp[1],"?",12.5,false); }
  var tp=u5Pt(cx,cy,112,A/2);
  s+=_txt(tp[0],tp[1],A+"\u00B0",12.5,false);
  return s+'</svg>';
}

/* ---------- Level 1 MC ---------- */
E("u5-sort-lines", 5, ["3.35","3.42"], 1, "gen", function(){
  var mode=pick(["parallel","perpendicular","neither"]);
  var slant=pick([25,35,40,50,55,65,70]), off=pick([38,44,50,56]);
  var ctx=pick(["two shelf edges","two fence rails","two trim pieces","two road markings","two ladder rails","the sides of a picture frame","two patio boards","two hockey rink lines"]);
  var stmtPar="Parallel: they never meet and stay the same distance apart";
  var stmtPerp="Perpendicular: they meet at a right angle of 90°";
  var stmtNeitherMeet="Neither: they meet, but not at a right angle";
  var stmtNeitherDrift="Neither: they never meet, but the distance between them changes";
  var correct, sol;
  if(mode==="parallel"){correct={t:stmtPar,fb:"Yes: the lines run in the same direction and stay the same distance apart, and both carry the same arrow mark."};sol="The two lines never meet and stay the same distance apart. They are <b>parallel</b>.";}
  else if(mode==="perpendicular"){correct={t:stmtPerp,fb:"Yes: the lines meet at a right angle, shown by the small square at the corner."};sol="The lines meet at \\(90^\\circ\\), shown by the square corner mark. They are <b>perpendicular</b>.";}
  else {correct={t:stmtNeitherMeet,fb:"Yes: the lines would meet, but not at a right angle, so they fit neither special case."};sol="The lines would meet, but the angle where they cross is not \\(90^\\circ\\). They are <b>neither parallel nor perpendicular</b>.";}
  var allStmts=[
    {t:stmtPar,fb:"Parallel lines never meet and stay the same distance apart: check whether these two lines do that."},
    {t:stmtPerp,fb:"Perpendicular lines meet at exactly \\(90^\\circ\\): look for the square corner mark."},
    {t:stmtNeitherMeet,fb:"That sorting fits lines that meet at some angle other than \\(90^\\circ\\): check how these lines behave."},
    {t:stmtNeitherDrift,fb:"In a flat diagram, lines that never meet keep a constant distance: a changing distance means the lines do meet when extended."}];
  var dis=allStmts.filter(function(d){return d.t!==correct.t;});
  var q=mcq("The diagram shows "+ctx+". How should the pair of lines be sorted?", correct, dis, sol, {mode:mode,slant:slant});
  q.figure=u5LinesSVG(mode,slant,off); return q;
}, ["Look at whether the lines meet, and if they do, at what angle.", "Check for a square corner mark first, then check whether the lines stay the same distance apart."]);

E("u5-comp-supp-basic", 5, ["3.36"], 1, "gen", function(){
  var comp=ri(0,1)===0; var a=comp?ri(12,78):ri(25,155);
  var ans=comp?90-a:180-a;
  var ctx=pick(["the corner of a square tile is split by a diagonal strip","a straight shelf edge is split by a bracket","the corner of a folded card is split by a crease","a straight road edge is split by a driveway"]);
  var pool=[comp?180-a:90-a, a, ans+15, ans-12, 90, 180];
  var q=mcq("In "+ctx+", one angle measures \\("+a+"^\\circ\\). It forms a "+(comp?"complementary pair (the two angles fill a right angle)":"supplementary pair (the two angles fill a straight line)")+" with a second angle. What is the measure of the second angle?",
    {t:ans+"°", fb:"Yes: "+(comp?"complementary angles add to 90°, and 90 - "+a+" = "+ans:"supplementary angles add to 180°, and 180 - "+a+" = "+ans)+"."},
    u5DegOpts(ans,pool),
    (comp?"Complementary angles add to \\(90^\\circ\\).":"Supplementary angles add to \\(180^\\circ\\).")+"\\[ \\begin{aligned} \\text{second angle} &= "+(comp?90:180)+"^\\circ - "+a+"^\\circ \\\\ &= "+ans+"^\\circ \\end{aligned} \\] The answer is <b>"+ans+"°</b>.", {a:a,comp:comp});
  q.figure=u5PairSVG(a, comp);
  return q;
}, ["Recall the total that this kind of angle pair must add to.", "Subtract the given angle from that total."]);

E("u5-angle-types", 5, ["3.45"], 1, "gen", function(){
  var kind=pick(["acute","right","straight","obtuse","reflex"]);
  var deg, base=pick([0,0,20,40]);
  if(kind==="acute")deg=pick([25,35,45,55,65,75,85]);
  else if(kind==="right")deg=90;
  else if(kind==="straight")deg=180;
  else if(kind==="obtuse")deg=pick([95,110,125,140,155,170]);
  else deg=pick([200,225,250,280,310,340]);
  var names={acute:"Acute angle",right:"Right angle",straight:"Straight angle",obtuse:"Obtuse angle",reflex:"Reflex angle"};
  var ranges={acute:"an acute angle is greater than 0° and less than 90°",right:"a right angle is exactly 90°",straight:"a straight angle is exactly 180°",obtuse:"an obtuse angle is greater than 90° and less than 180°",reflex:"a reflex angle is greater than 180° and less than 360°"};
  var dis=Object.keys(names).filter(function(k){return k!==kind;}).slice(0,3).map(function(k){return {t:names[k], fb:"That name does not fit this opening: "+ranges[k]+"."};});
  var q=mcq("The diagram shows an angle of \\("+deg+"^\\circ\\). Which name describes this angle?",
    {t:names[kind], fb:"Yes: "+ranges[kind]+", and this angle measures "+deg+"°."}, dis,
    "Compare the measure with the angle type ranges: "+ranges[kind]+". An angle of \\("+deg+"^\\circ\\) is <b>"+names[kind].toLowerCase()+"</b>.", {deg:deg,kind:kind});
  q.figure=u5AngleSVG(deg,deg+"°",base); return q;
}, ["Compare the opening with a square corner and with a straight line.", "Use the ranges: acute under 90, right 90, obtuse between 90 and 180, straight 180, reflex over 180."]);

E("u5-referents-sketches", 5, ["3.46","3.47","3.48"], 1, "var", varset([
  function(){ return mcq("Which object is a good referent for a \\(90^\\circ\\) angle?",
    {t:"The corner of a sheet of paper", fb:"Yes: a paper corner is a square corner, exactly 90°."},
    [{t:"One slice of a pizza cut into 8 equal slices", fb:"That slice is 360 divided by 8, which is 45°, half of a right angle."},
     {t:"The opening of a partly closed door", fb:"A door opening changes size as the door moves, so it is not a fixed referent."},
     {t:"One slice of a pizza cut into 12 equal slices", fb:"That slice is 360 divided by 12, which is 30°."}],
    "A referent is a familiar object with a known angle. A paper corner is a square corner. The answer is <b>the corner of a sheet of paper</b>.", {}); },
  function(){ return mcq("Which object is a good referent for a \\(45^\\circ\\) angle?",
    {t:"Half of a square corner, such as a square tile cut corner to corner", fb:"Yes: cutting a square corner in half gives 45°."},
    [{t:"The corner of a sheet of paper", fb:"That corner is a full square corner, 90°."},
     {t:"A fully open book lying flat", fb:"A book lying flat forms a straight angle, 180°."},
     {t:"One slice of a pizza cut into 12 equal slices", fb:"That slice is 360 divided by 12, which is 30°."}],
    "Half of \\(90^\\circ\\) is \\(45^\\circ\\). The answer is <b>half of a square corner</b>.", {}); },
  function(){ return mcq("A student sketches an angle of about \\(30^\\circ\\). Which description matches the sketch?",
    {t:"A narrow opening, about one third of a square corner", fb:"Yes: 30° is one third of 90°, a narrow opening."},
    [{t:"An opening exactly the same as a square corner", fb:"That describes 90°, not 30°."},
     {t:"An opening wider than a square corner", fb:"Wider than a square corner means more than 90°."},
     {t:"Two rays pointing in opposite directions", fb:"That describes a straight angle, 180°."}],
    "\\(30^\\circ\\) is one third of a right angle, so the opening is narrow. The answer is <b>a narrow opening, about one third of a square corner</b>.", {}); },
  function(){ return mcq("A drawn angle opens a little wider than a square corner. Using the referent angles 22.5°, 30°, 45°, 60°, 90° and 180°, which is the best estimate?",
    {t:"About 90°, a little over", fb:"Yes: the opening sits just past the 90° referent, so about 90° is the best estimate from the list."},
    [{t:"About 60°", fb:"60° is well under a square corner, but this opening is wider than a square corner."},
     {t:"About 180°", fb:"180° is a straight line: this opening is far from flat."},
     {t:"About 45°", fb:"45° is half a square corner: this opening is much wider than that."}],
    "Compare the opening with the nearest referent. It is just past a square corner. The answer is <b>about 90°, a little over</b>.", {}); },
  function(){ return mcq("Which object is a good referent for a \\(180^\\circ\\) angle?",
    {t:"A ruler lying flat and straight", fb:"Yes: a straight edge shows a straight angle, 180°."},
    [{t:"The corner of a sheet of paper", fb:"That corner is 90°, half of a straight angle."},
     {t:"One slice of a pizza cut into 8 equal slices", fb:"That slice is 45°."},
     {t:"The hands of a clock at 1 o'clock", fb:"Adjacent hour marks on a clock are 30° apart."}],
    "A straight angle forms a straight line. The answer is <b>a ruler lying flat and straight</b>.", {}); },
  function(){ return mcq("A student sketches an angle of about \\(135^\\circ\\). Which description matches the sketch?",
    {t:"An opening halfway between a square corner and a straight line", fb:"Yes: 135° is halfway between 90° and 180°."},
    [{t:"A narrow opening, less than half a square corner", fb:"That describes an angle under 45°."},
     {t:"An opening exactly the same as a square corner", fb:"That describes 90°, not 135°."},
     {t:"An opening that goes more than halfway around the point", fb:"More than halfway around means more than 180°, a reflex angle."}],
    "\\(135^\\circ = \\frac{90^\\circ + 180^\\circ}{2}\\), halfway between a right angle and a straight angle. The answer is <b>an opening halfway between a square corner and a straight line</b>.", {}); },
  function(){ return mcq("The angle between two neighbouring hour marks on a clock is a useful referent. What is its measure?",
    {t:"30°", fb:"Yes: a full turn of 360° is split into 12 equal hour gaps, and 360 divided by 12 is 30."},
    [{t:"45°", fb:"45° would split the clock into 8 equal parts, but a clock has 12 hour marks."},
     {t:"60°", fb:"60° is the gap across two hour marks, not one."},
     {t:"90°", fb:"90° is the gap across three hour marks, a quarter of the clock."}],
    "\\[ \\frac{360^\\circ}{12} = 30^\\circ \\] The answer is <b>30°</b>.", {}); }
]), ["Think of a familiar object whose angle you already know.", "Compare the angle with a square corner (90°) and a straight line (180°)."]);

E("u5-pair-names", 5, ["3.38"], 1, "gen", function(){
  var types=[
    {name:"Corresponding angles", desc:"in matching corner positions at each of the two lines, on the same side of the transversal", fb:"Matching corners at the two crossings are corresponding angles."},
    {name:"Vertically opposite angles", desc:"directly across from each other at a single crossing, formed by two crossing lines", fb:"Angles across from each other at one crossing are vertically opposite."},
    {name:"Alternate interior angles", desc:"between the two lines, on opposite sides of the transversal", fb:"Inside the strip between the lines and on opposite sides of the transversal: alternate interior."},
    {name:"Alternate exterior angles", desc:"outside the two lines, on opposite sides of the transversal", fb:"Outside the strip and on opposite sides of the transversal: alternate exterior."},
    {name:"Interior angles on the same side of the transversal", desc:"between the two lines, on the same side of the transversal", fb:"Inside the strip and on the same side of the transversal."},
    {name:"Exterior angles on the same side of the transversal", desc:"outside the two lines, on the same side of the transversal", fb:"Outside the strip and on the same side of the transversal."}];
  var t=pick(types);
  var ctx=pick(["Two parallel shelf edges are crossed by a diagonal brace.","Two parallel road edges are crossed by a cross street.","Two parallel fence rails are crossed by a slanted post.","Two parallel sidelines are crossed by a centre line.","Two parallel counter edges are crossed by a support bar.","Two parallel window blind slats are crossed by a lift cord.","Two parallel deck boards are crossed by a diagonal brace.","Two parallel ski tracks are crossed by a fallen pole.","Two parallel garden rows are crossed by an irrigation line.","Two parallel train rails are crossed by a maintenance walkway.","Two parallel ladder rails are crossed by a diagonal strap.","Two parallel table edges are crossed by a table runner seam."]);
  var others=types.filter(function(o){return o.name!==t.name;});
  var dis=[]; var used={}; var guard=0;
  while(dis.length<3&&guard<20){guard++; var o=pick(others); if(!used[o.name]){used[o.name]=1; dis.push({t:o.name, fb:"That name belongs to a different position: "+o.desc+"."});}}
  return mcq(ctx+" A pair of angles sits "+t.desc+". What is the name of this angle pair?",
    {t:t.name, fb:"Yes: "+t.fb}, dis,
    "Use the position: where the angles sit relative to the two lines and to the transversal decides the name. This pair is <b>"+t.name.toLowerCase()+"</b>.", {pair:t.name});
}, ["First decide whether the angles are between the two lines, outside them, or at one crossing.", "Then decide whether they are on the same side or opposite sides of the transversal."]);

E("u5-protractor-read", 5, ["3.44"], 1, "gen", function(){
  var a=pick([25,35,45,55,65,75,85,95,105,115,125,135,145,155]);
  var base=pick([0,15,30,45]);
  var ctx=pick(["a protractor is centred on the angle","the angle is drawn on a worksheet","the angle appears on a pattern for a quilt block","the angle is marked on a cutting guide"]);
  var pool=[180-a, a+10, a-10, 90, a+25];
  var q=mcq("The diagram shows an angle, and "+ctx+". What is the measure of the angle?",
    {t:a+"°", fb:"Yes: the second ray lines up with the "+a+"° mark when the centre sits on the vertex and one ray sits on zero."},
    u5DegOpts(a,pool),
    "Place the centre of the protractor on the vertex and line one ray up with zero, then read where the second ray crosses the scale. The answer is <b>"+a+"°</b>.", {a:a,base:base});
  q.figure=u5AngleSVG(a,a+"°",base); return q;
}, ["Line the centre of the protractor up with the vertex and one ray up with zero.", "Read the scale where the second ray crosses it, using the scale that starts at zero on the first ray."]);

/* ---------- Level 2 MC ---------- */
E("u5-adjacent-not", 5, ["3.37"], 2, "var", varset([
  function(){ return mcq("Four pairs of adjacent angles (angles that share a vertex and a side) are listed. Which pair is adjacent but is neither a complementary pair nor a supplementary pair?",
    {t:"Angles of 52° and 61°, sharing a side at one vertex", fb:"Yes: they are adjacent, and 52 + 61 = 113, which is neither 90 nor 180."},
    [{t:"Angles of 38° and 52°, sharing a side at one vertex", fb:"38 + 52 = 90, so that pair is complementary."},
     {t:"Angles of 74° and 106°, sharing a side at one vertex", fb:"74 + 106 = 180, so that pair is supplementary."},
     {t:"Angles of 45° and 45°, sharing a side at one vertex", fb:"45 + 45 = 90, so that pair is complementary."}],
    "Add each pair: \\(38+52=90\\), \\(74+106=180\\), \\(45+45=90\\), \\(52+61=113\\). Only the last sum is neither 90 nor 180. The answer is <b>the pair of 52° and 61°</b>.", {}); },
  function(){ return mcq("A fan opens and forms pairs of adjacent angles between its blades. Which pair is adjacent but is neither complementary nor supplementary?",
    {t:"Angles of 33° and 71° between neighbouring blades", fb:"Yes: they share a side, and 33 + 71 = 104, which is neither 90 nor 180."},
    [{t:"Angles of 59° and 121° between neighbouring blades", fb:"59 + 121 = 180, so that pair is supplementary."},
     {t:"Angles of 27° and 63° between neighbouring blades", fb:"27 + 63 = 90, so that pair is complementary."},
     {t:"Angles of 90° and 90° between neighbouring blades", fb:"90 + 90 = 180, so that pair is supplementary."}],
    "Add each pair: only \\(33+71=104\\) is neither 90 nor 180. The answer is <b>the pair of 33° and 71°</b>.", {}); },
  function(){ return mcq("On a clock face, the angles between neighbouring hands positions form adjacent pairs. Which pair is adjacent but is neither complementary nor supplementary?",
    {t:"Angles of 84° and 47° sharing the centre and a side", fb:"Yes: 84 + 47 = 131, which is neither 90 nor 180."},
    [{t:"Angles of 15° and 75° sharing the centre and a side", fb:"15 + 75 = 90, so that pair is complementary."},
     {t:"Angles of 132° and 48° sharing the centre and a side", fb:"132 + 48 = 180, so that pair is supplementary."},
     {t:"Angles of 60° and 30° sharing the centre and a side", fb:"60 + 30 = 90, so that pair is complementary."}],
    "Add each pair: only \\(84+47=131\\) is neither 90 nor 180. The answer is <b>the pair of 84° and 47°</b>.", {}); },
  function(){ return mcq("A pair of scissors forms adjacent angle pairs at its pivot. Which pair is adjacent but is neither complementary nor supplementary?",
    {t:"Angles of 118° and 39° on the same side of the pivot", fb:"Yes: 118 + 39 = 157, which is neither 90 nor 180."},
    [{t:"Angles of 101° and 79° on the same side of the pivot", fb:"101 + 79 = 180, so that pair is supplementary."},
     {t:"Angles of 54° and 36° on the same side of the pivot", fb:"54 + 36 = 90, so that pair is complementary."},
     {t:"Angles of 88° and 92° on the same side of the pivot", fb:"88 + 92 = 180, so that pair is supplementary."}],
    "Add each pair: only \\(118+39=157\\) is neither 90 nor 180. The answer is <b>the pair of 118° and 39°</b>.", {}); },
  function(){ return mcq("A book stand forms adjacent angle pairs where its parts meet. Which pair is adjacent but is neither complementary nor supplementary?",
    {t:"Angles of 66° and 58° sharing a side at the hinge", fb:"Yes: 66 + 58 = 124, which is neither 90 nor 180."},
    [{t:"Angles of 23° and 67° sharing a side at the hinge", fb:"23 + 67 = 90, so that pair is complementary."},
     {t:"Angles of 145° and 35° sharing a side at the hinge", fb:"145 + 35 = 180, so that pair is supplementary."},
     {t:"Angles of 71° and 19° sharing a side at the hinge", fb:"71 + 19 = 90, so that pair is complementary."}],
    "Add each pair: only \\(66+58=124\\) is neither 90 nor 180. The answer is <b>the pair of 66° and 58°</b>.", {}); }
]), ["Add the two measures in each pair.", "Complementary pairs add to 90 and supplementary pairs add to 180: find the pair whose sum is a different total."]);

E("u5-trans-relationships", 5, ["3.39","3.41"], 2, "gen", function(){
  var mode=pick(["alt","corr","vert","same","nonpar"]);
  var a=pick([36,42,49,53,58,64,67,71,74,82,96,103,109,118,122,126,133,139,147,152]);
  var scene=pick(["on a shelf diagram","on a street map","on a fence plan","on a rink diagram"]);
  var sceneTxt=" ("+scene+")";
  var ans, sol, prompt, corrFb;
  if(mode==="alt"){ ans=a+"°"; prompt="Two parallel lines are cut by a transversal. One angle measures \\("+a+"^\\circ\\). What is the measure of the alternate interior angle on the other line?"; corrFb="Yes: alternate interior angles formed by parallel lines are equal."; sol="Alternate interior angles formed by parallel lines are equal, so the angle is also \\("+a+"^\\circ\\). The answer is <b>"+a+"°</b>."; }
  else if(mode==="corr"){ ans=a+"°"; prompt="Two parallel lines are cut by a transversal. One angle measures \\("+a+"^\\circ\\). What is the measure of the corresponding angle on the other line?"; corrFb="Yes: corresponding angles formed by parallel lines are equal."; sol="Corresponding angles formed by parallel lines are equal, so the angle is also \\("+a+"^\\circ\\). The answer is <b>"+a+"°</b>."; }
  else if(mode==="vert"){ ans=a+"°"; prompt="Two lines cross and form an angle of \\("+a+"^\\circ\\). What is the measure of the angle directly across the crossing from it?"; corrFb="Yes: vertically opposite angles are equal."; sol="Vertically opposite angles are equal, so the angle across the crossing is also \\("+a+"^\\circ\\). The answer is <b>"+a+"°</b>."; }
  else if(mode==="same"){ ans=(180-a)+"°"; prompt="Two parallel lines are cut by a transversal. One interior angle measures \\("+a+"^\\circ\\). What is the measure of the interior angle on the same side of the transversal at the other line?"; corrFb="Yes: interior angles on the same side of a transversal add to 180°, and 180 - "+a+" = "+(180-a)+"."; sol="Interior angles on the same side of the transversal are supplementary. \\[ 180^\\circ - "+a+"^\\circ = "+(180-a)+"^\\circ \\] The answer is <b>"+(180-a)+"°</b>."; }
  else { ans="It cannot be found from the given angle alone"; prompt="Two lines that lean toward each other (they are not parallel) are cut by a transversal. One angle measures \\("+a+"^\\circ\\). A student claims the corresponding angle must also measure \\("+a+"^\\circ\\) because the lines look straight. What is correct?"; corrFb="Yes: the equal angle relationships need parallel lines. When the lines lean toward each other, the corresponding angle takes a different measure."; sol="The angle relationships for a transversal hold only when the two lines are parallel. These lines are not parallel, so the corresponding angle is not forced to equal \\("+a+"^\\circ\\). The answer is <b>it cannot be found from the given angle alone</b>."; }
  prompt = prompt.slice(0,-1)+sceneTxt+"?";
  var numAns = (mode==="same") ? 180-a : a;
  var dis;
  if(mode==="nonpar"){
    dis=[{t:a+"°", fb:"That claim assumes the lines are parallel: here they lean toward each other, so the relationship does not apply."},
         {t:(180-a)+"°", fb:"Supplementary pairs come from a straight line or same side interior angles on parallel lines: neither is given here."},
         {t:"90°", fb:"Nothing in this diagram makes a right angle."}];
  } else {
    dis=u5DegOpts(numAns,[180-numAns, a===numAns? a+18:a, 90, numAns+22]);
    if(mode==="same") dis=u5DegOpts(numAns,[a, 90, numAns+20]);
  }
  var q=mcq(prompt, {t:ans, fb:corrFb}, dis, sol, {mode:mode,a:a});
  if(mode==="alt") q.figure=transversalSVG("TR", a+"\u00B0", "BL", "?");
  else if(mode==="vert") q.figure=u5VertSVG(a);
  else if(mode==="same") q.figure=transversalSVG("TR", a+"\u00B0", "BR", "?");
  return q;
}, ["Name the angle pair first: its position decides whether the measures are equal or add to 180.", "Check that the two lines are parallel before using any equal angle relationship."]);

E("u5-trans-find", 5, ["3.40"], 2, "gen", function(){
  var pairs=[
    {g:"TR",k:"BL",rel:"eq",name:"alternate interior angles"},
    {g:"TL",k:"BR",rel:"eq",name:"alternate interior angles"},
    {g:"TR",k:"BR",rel:"supp",name:"interior angles on the same side of the transversal"},
    {g:"TL",k:"BL",rel:"supp",name:"interior angles on the same side of the transversal"}];
  var p=pick(pairs); var a=pick([38,47,55,63,72,84,96,108,117,129,138,146]);
  var ans=p.rel==="eq"?a:180-a;
  var ctx=pick(["two parallel window blinds slats cut by a cord","two parallel deck boards cut by a diagonal brace","two parallel ski tracks cut by a fallen pole","two parallel shelf edges cut by a support"]);
  var q=mcq("The diagram shows "+ctx+". The marked angle measures \\("+a+"^\\circ\\). What is the measure of the angle marked with a question mark?",
    {t:ans+"°", fb:"Yes: the two marked angles are "+p.name+", so they are "+(p.rel==="eq"?"equal":"supplementary, and 180 - "+a+" = "+ans)+"."},
    u5DegOpts(ans,[180-ans, a===ans?a+16:a, 90]),
    "The marked pair are "+p.name+". "+(p.rel==="eq"?"Those angles are equal when the lines are parallel.":"Those angles add to \\(180^\\circ\\) when the lines are parallel: \\(180^\\circ - "+a+"^\\circ = "+ans+"^\\circ\\).")+" The answer is <b>"+ans+"°</b>.", {a:a,rel:p.rel});
  q.figure=transversalSVG(p.g,a+"°",p.k,"?"); return q;
}, ["Name the relationship between the two marked angles.", "Equal pairs keep the measure; same side interior pairs add to 180."]);

E("u5-nonparallel-why", 5, ["3.41"], 2, "var", varset([
  function(){ return mcq("A transversal crosses two lines that gradually get closer together. The corresponding angles measure 118° and 104°. Why are they not equal?",
    {t:"The equal corresponding angle relationship only holds when the two lines are parallel, and these lines are not parallel", fb:"Yes: parallelism is the condition that makes corresponding angles equal."},
    [{t:"The transversal is far too slanted for any of the angle relationships to work on a pair of lines like these two in the diagram", fb:"A transversal can cross parallel lines at any slant and the relationships still hold."},
     {t:"Corresponding angles are always supplementary instead of equal, whatever the two lines are doing", fb:"On parallel lines corresponding angles are equal: the issue here is that the lines are not parallel."},
     {t:"One of the angles was simply measured from the wrong side of the transversal when it was checked", fb:"Both measures are given as read: the real reason is the missing parallel condition."}],
    "Angle relationships formed by a transversal depend on the two lines being parallel. These lines get closer together, so they are not parallel. The answer is <b>the relationship only holds for parallel lines</b>.", {}); },
  function(){ return mcq("Two fence lines lean toward each other and a path crosses both. The alternate interior angles measure 96° and 81°. What does this show?",
    {t:"The lines are not parallel, because alternate interior angles are equal only when the lines are parallel", fb:"Yes: unequal alternate interior angles are a sign the lines are not parallel."},
    [{t:"The path must run perpendicular to both fence lines for the two angles to come out equal", fb:"A perpendicular path would form 90° angles, and nothing here shows that."},
     {t:"Alternate interior angles are supposed to add to 180° in every diagram, whatever the lines do, parallel or not", fb:"That is the same side interior relationship, and it also needs parallel lines."},
     {t:"The angles were both measured with a faulty protractor, so neither reading can be trusted", fb:"The measures are the evidence: their difference shows the lines are not parallel."}],
    "For parallel lines, alternate interior angles are equal. Here \\(96^\\circ \\ne 81^\\circ\\), so the lines cannot be parallel. The answer is <b>the lines are not parallel</b>.", {}); },
  function(){ return mcq("A student measures interior angles on the same side of a transversal as 112° and 79° for two road edges, and says the edges must be parallel because the angles are both interior. Why is the student wrong?",
    {t:"For parallel lines those angles must add to 180°, and 112 + 79 = 191, so the edges are not parallel", fb:"Yes: the sum misses 180°, which is the test for parallel lines here."},
    [{t:"Interior angles are only formed by perpendicular lines, never by ordinary slanted lines like these two", fb:"Interior angles form whenever a transversal crosses two lines."},
     {t:"The two angles should be exactly equal, to the degree, for the edges to be parallel", fb:"Equality is the test for alternate interior angles, not same side interior angles."},
     {t:"Road edges can never be parallel, because roads always curve eventually as they go", fb:"Road edges often are parallel: the angle sum is what decides it here."}],
    "\\[ 112^\\circ + 79^\\circ = 191^\\circ \\ne 180^\\circ \\] Same side interior angles add to \\(180^\\circ\\) only for parallel lines. The answer is <b>the edges are not parallel</b>.", {}); },
  function(){ return mcq("A transversal crosses two lines and a corresponding angle pair measures 87° and 87°. A second pair measures 87° and 79°. What is the best conclusion?",
    {t:"The lines are not parallel, because for parallel lines every corresponding pair must be equal", fb:"Yes: one matching pair is not enough: parallel lines make all corresponding pairs equal."},
    [{t:"The lines are parallel, because one pair of angles came out exactly equal in the diagram given", fb:"A single equal pair can happen by chance: the second pair breaks the pattern parallel lines require."},
     {t:"The lines are perpendicular, because two of the angles are 87° in the diagram given", fb:"Perpendicular lines form 90° angles, not 87° angles."},
     {t:"The transversal needs to be far longer for the angle relationships to apply to these lines", fb:"Length changes nothing: equal corresponding angles throughout is the condition."}],
    "Parallel lines force every corresponding pair to be equal. The \\(87^\\circ\\) and \\(79^\\circ\\) pair is not equal, so the lines are not parallel. The answer is <b>the lines are not parallel</b>.", {}); },
  function(){ return mcq("Why do carpenters check that both ends of two boards are the same distance apart before trusting angle relationships between them?",
    {t:"Equal spacing is evidence the boards are parallel, and the angle relationships only apply to parallel lines", fb:"Yes: the spacing check establishes the condition the relationships need."},
    [{t:"The boards need to be exactly the same length as each other for angles to form between them", fb:"Boards of different lengths can still be parallel and form the usual angle pairs."},
     {t:"Angle relationships apply only to wooden boards of equal thickness, and never to boards of any other kind at all", fb:"The material does not matter: parallelism is the condition."},
     {t:"A transversal cannot cross two boards at an angle, so no angle pairs can form here at all", fb:"A transversal is exactly a line that crosses two other lines, at any angle."}],
    "The transversal angle relationships rest on one condition: the two lines are parallel. Checking equal spacing at both ends checks that condition. The answer is <b>equal spacing shows the boards are parallel</b>.", {}); }
]), ["Ask what condition the angle relationships need before applying them.", "Test the given measures against the equal or 180 total the relationship requires."]);

E("u5-real-settings", 5, ["3.42","3.35"], 2, "var", varset([
  function(){ return mcq("A builder wants to confirm a wall is perpendicular to the floor. Which strategy gives the best evidence?",
    {t:"Place a carpenter's square in the corner where the wall meets the floor and check that both edges sit flat against it", fb:"Yes: the square is a true 90° referent, so a flat fit confirms a right angle."},
    [{t:"Measure the height of the wall in two places and compare the numbers", fb:"Equal heights speak to level or parallel, not to the angle between wall and floor."},
     {t:"Check that the wall looks straight when viewed from across the room", fb:"Looks can mislead: a measured check against a known right angle is stronger evidence."},
     {t:"Measure the distance from the top of the wall to the far wall", fb:"That distance does not test the angle at the floor line."}],
    "Perpendicular means meeting at \\(90^\\circ\\). Testing the corner against a carpenter's square tests exactly that angle. The answer is <b>check the corner with a carpenter's square</b>.", {}); },
  function(){ return mcq("Railway tracks are supposed to be parallel. Which strategy best checks this along a straight section?",
    {t:"Measure the distance between the rails at several spots and check that the distance stays the same", fb:"Yes: parallel lines stay the same distance apart everywhere."},
    [{t:"Check that the rails meet at a vanishing point far away", fb:"Parallel rails only appear to meet in perspective: they never actually meet."},
     {t:"Measure the length of each rail and check that the lengths match", fb:"Equal lengths do not show the rails run in the same direction."},
     {t:"Put a square in the corner where a rail meets a tie", fb:"That tests whether the tie is perpendicular to the rail, a different question."}],
    "Parallel lines stay the same distance apart. Measuring the gap at several spots tests that directly. The answer is <b>measure the distance between the rails at several spots</b>.", {}); },
  function(){ return mcq("A shelf unit has three shelves. The top and bottom shelves are claimed to be parallel. Which check supports the claim?",
    {t:"The vertical distance between them is the same at the left end and at the right end", fb:"Yes: equal spacing at both ends is the parallel test."},
    [{t:"Both shelves hold the same number of books", fb:"The load on a shelf says nothing about its direction."},
     {t:"Both shelves were cut from the same board", fb:"A shared source does not guarantee the shelves were mounted parallel."},
     {t:"The angle at one corner of the unit is 90°", fb:"That shows a side is perpendicular to a shelf, not that the two shelves are parallel to each other."}],
    "Parallel lines and planes stay a constant distance apart. Equal end distances support the claim. The answer is <b>the distance between them is the same at both ends</b>.", {}); },
  function(){ return mcq("A door frame is checked with a carpenter's square at its top corners, and the square sits flat in both corners. What has been shown?",
    {t:"The top of the frame is perpendicular to both sides of the frame", fb:"Yes: a flat fit of the square shows a 90° angle at each corner."},
    [{t:"The two sides of the frame are perpendicular to each other", fb:"The sides do not meet each other: each side meets the top."},
     {t:"The frame is a perfect square shape", fb:"Corner angles alone do not show the side lengths are equal."},
     {t:"The door will never stick in winter", fb:"The check covers angles only, not seasonal movement."}],
    "The square tests each corner angle and finds \\(90^\\circ\\). The answer is <b>the top is perpendicular to both sides</b>.", {}); },
  function(){ return mcq("Two patio boards run side by side. At the left end they are 14 cm apart, and at the right end they are 19 cm apart. How should the boards be sorted?",
    {t:"Neither parallel nor perpendicular: they lean toward each other, so they are not parallel, and boards side by side do not meet at 90°", fb:"Yes: changing spacing rules out parallel, and the boards never cross at a right angle."},
    [{t:"Parallel, because they run roughly in the same direction", fb:"Roughly is not enough: parallel lines keep exactly the same spacing."},
     {t:"Perpendicular, because the gap changes along their length", fb:"Perpendicular describes lines that meet at 90°, not a changing gap."},
     {t:"Parallel, because both boards are the same width", fb:"Equal board width does not show the boards run parallel to each other."}],
    "Spacing changes from 14 cm to 19 cm, so the boards are not parallel, and they do not meet at a right angle. The answer is <b>neither parallel nor perpendicular</b>.", {}); },
  function(){ return mcq("A ladder has two side rails joined by rungs. A worker measures the angle between a rung and a rail as 90° at both rails. What relationship has the worker confirmed?",
    {t:"Each rung is perpendicular to both side rails", fb:"Yes: a 90° angle between the rung and each rail is perpendicularity."},
    [{t:"The two side rails are perpendicular to each other", fb:"The side rails run alongside each other: the rungs meet them at right angles."},
     {t:"The rungs are longer than the rails are wide apart", fb:"The angle measures say nothing about lengths."},
     {t:"The ladder is safe to climb at any angle", fb:"The check covers the rung angles only, not the ladder placement angle."}],
    "An angle of \\(90^\\circ\\) between two lines means they are perpendicular. The answer is <b>each rung is perpendicular to both side rails</b>.", {}); }
]), ["Name the relationship first: meeting at 90°, or staying the same distance apart.", "Match the check to the relationship: a square tests 90°, repeated distance measures test parallel."]);

E("u5-context-transversal", 5, ["3.43"], 2, "gen", function(){
  var scenes=[
    {s:"Two parallel streets are crossed by one straight side street", rel:"eq", name:"corresponding angles"},
    {s:"Two parallel garden paths are crossed by a straight drainage channel", rel:"supp", name:"interior angles on the same side of the transversal"},
    {s:"Two parallel rink boards are crossed by a straight centre line painted diagonally", rel:"eq", name:"alternate interior angles"},
    {s:"Two parallel clotheslines are crossed by a straight support rope", rel:"supp", name:"interior angles on the same side of the transversal"}];
  var sc=pick(scenes); var a=pick([37,43,48,52,59,64,71,76,83,89,97,104,112,119,124,131,138,143,148,154]);
  var ans=sc.rel==="eq"?a:180-a;
  var q=mcq(sc.s+". One of the angles formed measures \\("+a+"^\\circ\\). A second marked angle is related to it as "+sc.name.toLowerCase()+". What is the measure of the second marked angle?",
    {t:ans+"°", fb:"Yes: "+sc.name+" formed by parallel lines are "+(sc.rel==="eq"?"equal":"supplementary, and 180 - "+a+" = "+ans)+"."},
    u5DegOpts(ans,[180-ans, a===ans?a+14:a, 90]),
    "The two lines are parallel, so "+sc.name.toLowerCase()+" apply. "+(sc.rel==="eq"?"Those angles are equal.":"Those angles add to \\(180^\\circ\\): \\(180^\\circ - "+a+"^\\circ = "+ans+"^\\circ\\).")+" The answer is <b>"+ans+"°</b>.", {a:a,rel:sc.rel});
  q.figure=transversalSVG("TR",a+"°", sc.rel==="eq"?"BL":"BR", "?"); return q;
}, ["Confirm the two lines in the story are parallel, then name the angle pair.", "Equal pairs keep the measure; same side interior pairs add to 180."]);

E("u5-estimate-angle", 5, ["3.48","3.46"], 2, "gen", function(){
  var refs=[22.5,30,45,60,90,180];
  var target=pick([22.5,30,45,60,90]); var base=pick([0,10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170]);
  var others=refs.filter(function(r){return Math.abs(r-target)>=15;});
  var dis=[]; var used={}; var guard=0;
  while(dis.length<3&&guard<30){guard++; var r=pick(others); if(!used[r]){used[r]=1; dis.push({t:r+"°", fb:r+"° is a referent angle, but the drawn opening matches a different referent more closely: compare it with a square corner and a straight line."});}}
  var _bo0=balOpts({t:target+"°", fb:"Yes: the opening matches the "+target+"° referent."}, dis); var q=mcq("Estimate the measure of the angle in the diagram. Choose the referent angle from the list 22.5°, 30°, 45°, 60°, 90° and 180° that fits best.", _bo0[0], _bo0[1],
    "Compare the opening with the referents: a square corner is \\(90^\\circ\\) and a straight line is \\(180^\\circ\\). This opening matches the \\("+target+"^\\circ\\) referent. The answer is <b>"+target+"°</b>.", {target:target,base:base});
  q.figure=u5AngleSVG(target,target+"°",base); return q;
}, ["Hold the referents in mind: a clock hour gap is 30°, half a square corner is 45°, a square corner is 90°.", "Decide which referent the opening sits closest to."]);

E("u5-sketch-match", 5, ["3.47","3.45"], 2, "gen", function(){
  var cats=[
    {key:"acute", test:function(m){return m<90;}, desc:"a narrow opening, smaller than a square corner", draw:function(){return pick([28,37,44,53,62,71,80,86]);}},
    {key:"obtuse", test:function(m){return m>90&&m<180;}, desc:"an opening wider than a square corner but smaller than a straight line", draw:function(){return pick([98,109,121,134,146,158,169,176]);}},
    {key:"reflex", test:function(m){return m>180;}, desc:"an opening that goes the long way around the point, more than a straight line", draw:function(){return pick([196,214,233,252,271,295,318,342]);}}];
  var c=pick(cats); var m=c.draw(); var orient=pick(["opening upward to the left","opening upward to the right","opening downward to the left","opening downward to the right"]);
  var dis=cats.filter(function(o){return o.key!==c.key;}).map(function(o){return {t:"A sketch with "+o.desc, fb:"That description belongs to a different angle type: compare this measure with 90° and 180°."};});
  dis.push({t:"A sketch with two rays pointing in exactly opposite directions", fb:"Opposite rays form a straight angle of exactly 180°, which does not match this measure."});
  return mcq("A student must sketch an angle of \\("+m+"^\\circ\\), "+orient+". Which description matches a correct sketch?",
    {t:"A sketch with "+c.desc, fb:"Yes: "+m+"° sits in the range that matches this description."}, dis,
    "Place \\("+m+"^\\circ\\) against the landmarks: it is "+(c.key==="acute"?"less than \\(90^\\circ\\)":c.key==="obtuse"?"between \\(90^\\circ\\) and \\(180^\\circ\\)":"greater than \\(180^\\circ\\)")+". The matching sketch has <b>"+c.desc+"</b>.", {m:m,cat:c.key});
}, ["Place the given measure against 90° and 180° first.", "Then pick the description whose opening size matches that range."]);

E("u5-replicate-methods", 5, ["3.50"], 2, "var", varset([
  function(){ return mcq("A student replicates (copies) an angle with a Mira, a clear reflector. Which step belongs to the Mira method?",
    {t:"Stand the Mira on one ray of the original angle, see the reflection of the other ray, and draw along the reflected image", fb:"Yes: the Mira reflects one ray onto a new position so the copy matches the original opening."},
    [{t:"Swing an arc from the vertex and measure the arc with a ruler", fb:"Arcs and measurements belong to compass or protractor methods, not the Mira."},
     {t:"Read the degree scale where the second ray crosses it", fb:"Reading a degree scale is the protractor method."},
     {t:"Fold the paper so the two rays line up", fb:"Folding is a paper folding method, often used for bisection, not the Mira copy."}],
    "A Mira copies an angle by reflection. The answer is <b>use the reflection of one ray to place the new ray</b>.", {}); },
  function(){ return mcq("A student replicates an angle with a protractor. Which sequence is correct?",
    {t:"Measure the original angle, draw one ray for the copy, mark the measured angle from that ray, then draw the second ray through the mark", fb:"Yes: measure, then rebuild the same measure at the new vertex."},
    [{t:"Draw both rays for the copy first, then measure the original angle to check later", fb:"Without the measure first, there is nothing guiding where the second ray goes."},
     {t:"Measure the length of one ray of the original angle and copy that length", fb:"An angle is set by its opening, not by the length of its rays."},
     {t:"Mark the halfway angle from the new ray and draw through that mark", fb:"Half the measure would build the bisector, not a copy of the full angle."}],
    "Replication with a protractor transfers the measure: measure the original, then mark off the same measure at the new vertex. The answer is <b>measure first, then rebuild the same measure</b>.", {}); },
  function(){ return mcq("A student replicates an angle with a compass and straightedge. Why must the compass opening stay unchanged when the arc is drawn at both vertices?",
    {t:"The same compass opening makes the two arcs the same size, so the copied opening matches the original angle", fb:"Yes: matching arcs carry the size of the opening from one vertex to the other."},
    [{t:"A changed compass opening makes the paper harder to mark", fb:"The issue is accuracy of the copy, not marking the paper."},
     {t:"The straightedge cannot be used after the compass opening changes", fb:"The straightedge is used after the arcs: the opening matters because the arcs must match."},
     {t:"Compass openings lock permanently once they are set", fb:"A compass opening can be changed freely: keeping it fixed is a choice the method requires."}],
    "The construction copies the angle by copying its arc. If the compass opening changed, the arcs would differ and the copy would not match. The answer is <b>the arcs must be the same size</b>.", {}); },
  function(){ return mcq("A carpenter replicates the angle of a stair stringer (the slanted board that holds the steps) onto a new board using a carpenter's square and a sliding bevel. What does the sliding bevel do?",
    {t:"It is set against the original angle, locked, and then used to mark the same angle on the new board", fb:"Yes: the bevel holds the angle while it is carried from one board to the other."},
    [{t:"It measures the angle in degrees and displays the number", fb:"A sliding bevel holds an angle physically: it does not give a degree reading."},
     {t:"It cuts the new board at the matching angle by itself", fb:"The bevel marks the angle: cutting is a separate step with a saw."},
     {t:"It halves the angle so the new board is easier to fit", fb:"Halving would bisect the angle, producing a different, smaller angle."}],
    "Replication means producing the same angle somewhere else. A locked sliding bevel carries the opening across unchanged. The answer is <b>it holds the angle and transfers it to the new board</b>.", {}); },
  function(){ return mcq("A student replicates an angle in dynamic geometry software. Which action produces a true copy?",
    {t:"Use the angle copy or rotation tool on the original angle and place the image at the new vertex", fb:"Yes: the software copy tool preserves the measure exactly."},
    [{t:"Drag a ray of the original angle until the copy looks about right", fb:"Eyeballing a drag gives an approximation, not a true copy."},
     {t:"Measure one ray of the original angle and draw a ray of that length", fb:"Ray length does not set an angle: the opening does."},
     {t:"Trace the original angle with the freehand drawing tool", fb:"Freehand tracing is approximate: the copy tool is the exact method."}],
    "Software replication uses a copy or rotation construction so the measure is preserved exactly. The answer is <b>use the angle copy or rotation tool</b>.", {}); },
  function(){ return mcq("Two students each replicate a 64° angle, one with a Mira and one with a protractor. Both copies are checked and measure 64°. What does this show?",
    {t:"Different replication methods can all produce an angle equal to the original when each method is followed correctly", fb:"Yes: the method varies, but a correct replication always matches the original measure."},
    [{t:"The Mira copy must be more accurate because it uses no numbers", fb:"Accuracy depends on following the method, not on avoiding numbers."},
     {t:"Only the protractor method counts as replication", fb:"Replication means copying an angle by any valid method, Mira included."},
     {t:"The copies should each measure 32°, half of the original", fb:"Half of the original would be bisection, not replication."}],
    "A replicated angle has the same measure as the original, whatever tool is used. The answer is <b>all correct methods produce a copy equal to the original</b>.", {}); }
]), ["Ask what the tool actually does to carry the angle from one place to another.", "A copy must end with exactly the same measure as the original."]);

E("u5-bisect-steps", 5, ["3.52"], 2, "var", varset([
  function(){ return mcq("A student bisects an angle with a compass and straightedge. Which sequence gives the correct order of steps?",
    {t:"Draw an arc from the vertex cutting both rays, draw arcs from those two cutting points so they cross inside the angle, then draw a ray from the vertex through the crossing point", fb:"Yes: vertex arc first, equal arcs from its cutting points second, bisector ray last."},
    [{t:"Draw a ray from the vertex through an estimated middle point, then draw an arc from the vertex cutting both rays at once, and take that arc as the bisector line, before anything else", fb:"The bisector ray is drawn last, from the crossing point the arcs create: estimating the middle first gives no exact split."},
     {t:"Draw arcs from the two rays first, then guess where they happen to cross, mark the vertex at that spot, and draw the bisector ray from the guessed point instead of the vertex", fb:"The vertex is given from the start, and the first arc is centred on it."},
     {t:"Measure the angle first, halve the number, and mark that measure from one ray with the compass, then draw the bisector ray through the compass mark at the very end", fb:"Halving a measured number is the protractor method, not the compass construction."}],
    "The compass bisector is built in three moves: an arc from the vertex, equal arcs from where that arc cuts the rays, and a ray through their crossing. The answer is <b>vertex arc, crossing arcs, then the bisector ray</b>.", {}); },
  function(){ return mcq("A student bisects an angle with a protractor. Which sequence is correct?",
    {t:"Measure the full angle, divide the measure by 2, mark that many degrees from one ray, then draw a ray from the vertex through the mark", fb:"Yes: the bisector sits at half the full measure."},
    [{t:"Measure the full angle, mark that many degrees from one ray, then draw a ray from the vertex through the mark anyway, without halving anything", fb:"Marking the full measure rebuilds the original angle: the mark must be at half the measure."},
     {t:"Divide the full measure by 2, measure the angle afterwards, then erase one ray and keep the other one as the bisector at the end", fb:"Erasing a ray destroys the angle instead of splitting it."},
     {t:"Mark 90° from one ray and draw a ray through that mark, wherever the second ray of the angle happens to be sitting there", fb:"90° is only the halfway point when the full angle is 180°."}],
    "Bisection splits the measure in half, so the protractor mark goes at half the measured angle. The answer is <b>measure, halve, mark, then draw the ray</b>.", {}); },
  function(){ return mcq("A student bisects a paper angle by folding. Which sequence is correct?",
    {t:"Fold so that one ray of the angle lies exactly on top of the other ray, crease the paper, then unfold: the crease is the bisector", fb:"Yes: lining up the rays makes the crease split the opening into two equal parts."},
    [{t:"Fold the paper anywhere across the angle, crease it firmly, and use that crease directly as the bisector of the angle", fb:"A random crease splits the angle unevenly: the rays must line up first."},
     {t:"Fold one ray onto the vertex and crease along the ray itself, then unfold the paper and take that crease as the bisector of the angle", fb:"That crease follows the existing ray and does not split the opening."},
     {t:"Fold the angle in half by matching the far ends of the two rays, crease the paper, and take the crease as the bisector", fb:"Ray ends can be different lengths: it is the rays themselves, from the vertex, that must coincide."}],
    "When one ray folds exactly onto the other, the crease between them splits the angle into two equal angles. The answer is <b>fold ray onto ray, and the crease is the bisector</b>.", {}); },
  function(){ return mcq("A student bisects an angle with a Mira. Which step completes the bisection?",
    {t:"Stand the Mira on the vertex so the reflection of one ray falls exactly on the other ray, then draw along the Mira's edge", fb:"Yes: when the rays coincide in reflection, the Mira's edge lies on the bisector."},
    [{t:"Stand the Mira anywhere inside the angle, at any tilt, and draw along its longest side to get the bisector of the whole angle", fb:"Position matters: the Mira must sit on the vertex with the rays matched in reflection."},
     {t:"Reflect the vertex onto a ray, mark where it lands, and connect the two points to form the bisector ray of the angle", fb:"The bisector is a ray from the vertex, found by matching the two rays in reflection."},
     {t:"Measure the angle with the degree scale printed on the Mira, halve it, and mark the halfway point on the angle", fb:"A Mira has no degree scale: it works by reflection."}],
    "The Mira bisects by reflection: matching one ray onto the other puts the mirror line exactly halfway between them. The answer is <b>match the rays in reflection and draw along the Mira</b>.", {}); },
  function(){ return mcq("A student bisects an angle in dynamic geometry software. Which sequence produces the bisector?",
    {t:"Select the angle bisector tool, click the three points that define the angle (side point, vertex, side point), and the software draws the bisector ray", fb:"Yes: the bisector tool needs the angle defined in vertex order."},
    [{t:"Select the midpoint tool, click the two rays of the angle one after the other, and join the midpoints with a ray from the vertex itself to finish it all", fb:"The midpoint tool works on segments and points, not on splitting an angle."},
     {t:"Draw a circle centred at the vertex and connect two points on the circle, then extend that line through the vertex as the bisector ray itself", fb:"A circle alone does not locate the halfway direction."},
     {t:"Use the parallel line tool through the vertex, parallel to one of the rays, and take that line itself as the bisector of the angle in the end", fb:"A parallel line copies direction: it does not split the angle."}],
    "The bisector tool builds the ray that splits the angle into two equal angles from the three defining points. The answer is <b>use the angle bisector tool on the three points of the angle</b>.", {}); }
]), ["Bisect means split into two equal angles: look for the step that guarantees the two parts match.", "Put the steps in build order: set up the split first, draw the splitting ray last."]);

E("u5-context-angles", 5, ["3.49"], 2, "gen", function(){
  var mode=pick(["pizza","clock","around"]);
  var ctx=pick(["at a community supper","in a school cafeteria","at a family gathering","during a cooking class"]);
  if(mode==="pizza"){
    var n=pick([4,5,6,8,9,10,12]); var ans=360/n;
    var _bo0=balOpts({t:ans+"°", fb:"Yes: the full turn of 360° is shared equally, and 360 divided by "+n+" is "+ans+"."}, u5DegOpts(ans,[180/n, 360/(n+1), 90])); var q=mcq("A round pizza "+ctx+" is cut into "+n+" equal slices from the centre. What is the angle at the centre of each slice?", _bo0[0], _bo0[1],
      "\\[ \\begin{aligned} \\text{slice angle} &= \\frac{360^\\circ}{"+n+"} \\\\ &= "+ans+"^\\circ \\end{aligned} \\] The answer is <b>"+ans+"°</b>.", {mode:mode,n:n}); q.figure=u5PizzaSVG(n); return q;
  }
  if(mode==="clock"){
    var k=pick([2,3,4,5]); var ans=30*k;
    var _bo1=balOpts({t:ans+"°", fb:"Yes: each hour gap is 30°, and "+k+" gaps give "+k+" times 30, which is "+ans+"."}, u5DegOpts(ans,[30*(k+1), 30*(k-1), 360/k])); var q=mcq("On a clock, neighbouring hour marks are equally spaced around the centre. What is the angle at the centre between the mark for 12 and the mark for "+k+"?", _bo1[0], _bo1[1],
      "One hour gap is \\(360^\\circ \\div 12 = 30^\\circ\\). \\[ "+k+" \\times 30^\\circ = "+ans+"^\\circ \\] The answer is <b>"+ans+"°</b>.", {mode:mode,k:k}); q.figure=u5ClockSVG(k); return q;
  }
  var a=pick([70,85,95,110,125]), b=pick([60,75,90,105]);
  var ans=360-a-b;
  var _bo2=balOpts({t:ans+"°", fb:"Yes: angles around a point add to 360°, and 360 - "+a+" - "+b+" = "+ans+"."}, u5DegOpts(ans,[180-a, 360-a, a+b])); var q=mcq("A rotating garden sprinkler "+ctx+" sweeps a full turn. Two marked stops split the turn into angles of \\("+a+"^\\circ\\) and \\("+b+"^\\circ\\) plus one unmarked sweep. What is the angle of the unmarked sweep?", _bo2[0], _bo2[1],
    "Angles around a point add to \\(360^\\circ\\). \\[ \\begin{aligned} \\text{unmarked} &= 360^\\circ - "+a+"^\\circ - "+b+"^\\circ \\\\ &= "+ans+"^\\circ \\end{aligned} \\] The answer is <b>"+ans+"°</b>.", {mode:mode,a:a,b:b}); q.figure=u5AroundSVG([a,b,ans],[a+"\u00B0",b+"\u00B0","?"]); return q;
}, ["Decide which total the angles share: a full turn, or a count of equal gaps.", "Use the total and share or subtract as the situation describes."]);

E("u5-adjacent-describe", 5, ["3.37","3.36"], 2, "gen", function(){
  var x=pick([34,41,47,53,58,64,72,79]), y=pick([37,44,52,63,68,77,83,91]);
  if(x+y===90||x+y===180) y=y+7;
  var s=x+y;
  var q=mcq("The diagram shows two adjacent angles, A and B, that share a side at one vertex. Angle A measures \\("+x+"^\\circ\\) and angle B measures \\("+y+"^\\circ\\). Which statement describes this pair?",
    {t:"They are adjacent, and their sum of "+s+"° makes them neither a complementary pair nor a supplementary pair", fb:"Yes: "+x+" + "+y+" = "+s+", which is neither 90 nor 180."},
    [{t:"They are a complementary pair, because adjacent angles that share a side always add to exactly 90°", fb:"Adjacent angles can add to any total: complementary pairs are the ones that add to exactly 90, and this sum is "+s+"."},
     {t:"They are a supplementary pair, because adjacent angles that share a side always add to exactly 180° in total", fb:"Supplementary pairs add to exactly 180: this sum is "+s+", not 180."},
     {t:"They are vertically opposite angles, because they share a vertex and sit across from each other", fb:"Vertically opposite angles sit across a crossing from each other and do not share a side: this pair shares a side."}],
    "Add the measures: \\("+x+"^\\circ + "+y+"^\\circ = "+s+"^\\circ\\). The sum is neither \\(90^\\circ\\) nor \\(180^\\circ\\), and the angles share a side. The answer is <b>adjacent, and neither complementary nor supplementary</b>.", {x:x,y:y});
  q.figure=u5AdjSVG(x,y); return q;
}, ["Add the two measures and compare the sum with 90 and 180.", "Sharing a side at one vertex is what makes the pair adjacent."]);

/* ---------- Level 3 MC ---------- */
E("u5-trans-algebra", 5, ["3.40","3.38"], 3, "gen", function(){
  var supp=ri(0,1)===0;
  var x0=pick([9,11,12,14,15,16,18,20]), aC=pick([3,4,5]);
  var A=aC*x0; if(A<30||A>150){A=60;x0=15;aC=4;}
  var gPos=pick(["TR","TL"]), kPos, pairName;
  if(supp){ kPos=(gPos==="TR")?"BR":"BL"; pairName="interior angles on the same side of the transversal"; }
  else { kPos=(gPos==="TR")?"BL":"BR"; pairName="alternate interior angles"; }
  var B=supp?180-A:A;
  var bC=1, c=B-x0; if(c<=0){c=B-2*x0;bC=2;}
  var givenExpr="("+aC+"x)°", askedExpr="("+bC+"x + "+c+")°";
  var pool=[A, x0, B+20, B-18, 90];
  var q=mcq("Two parallel lines are cut by a transversal. The marked angles are "+pairName+". One angle measures \\("+givenExpr+"\\) and the other measures \\("+askedExpr+"\\). What is the measure of the angle marked \\("+askedExpr+"\\)?",
    {t:B+"°", fb:"Yes: solving gives x = "+x0+", and substituting back gives "+B+"°."},
    u5DegOpts(B,pool),
    (supp?("Same side interior angles add to \\(180^\\circ\\): \\[ \\begin{aligned} "+aC+"x + "+bC+"x + "+c+" &= 180 \\\\ "+(aC+bC)+"x &= "+(180-c)+" \\\\ x &= "+x0+" \\end{aligned} \\]"):("Alternate interior angles are equal: \\[ \\begin{aligned} "+aC+"x &= "+bC+"x + "+c+" \\\\ "+(aC-bC)+"x &= "+c+" \\\\ x &= "+x0+" \\end{aligned} \\]"))+" Substituting back, the asked angle is \\("+bC+"("+x0+") + "+c+" = "+B+"^\\circ\\). The answer is <b>"+B+"°</b>.", {x0:x0,B:B,supp:supp});
  q.figure=transversalSVG(gPos,givenExpr,kPos,askedExpr); return q;
}, ["Name the pair from the diagram: the name tells you whether to set the expressions equal or add them to 180.", "Solve for x first, then substitute back into the asked expression."]);

E("u5-replicate-bisect-apply", 5, ["3.50","3.51","3.52"], 3, "gen", function(){
  var A=pick([48,56,64,72,84,96,108,120,132,144]);
  var method=pick(["a compass and straightedge","a Mira","a protractor","dynamic geometry software"]);
  var mode=pick(["bisect-copy","double-bisect","copy-only"]);
  var ans, sol;
  if(mode==="copy-only"){ ans=A; sol="A replicated angle has the same measure as the original. The copy measures <b>"+A+"°</b>."; }
  else if(mode==="bisect-copy"){ ans=A/2; sol="The copy measures \\("+A+"^\\circ\\), the same as the original. Bisecting splits it into two equal parts: \\[ \\frac{"+A+"^\\circ}{2} = "+ans+"^\\circ \\] The answer is <b>"+ans+"°</b>."; }
  else { ans=A/4; sol="The copy measures \\("+A+"^\\circ\\). The first bisection gives \\("+A+" \\div 2 = "+(A/2)+"^\\circ\\), and bisecting one of those parts gives \\[ \\frac{"+(A/2)+"^\\circ}{2} = "+ans+"^\\circ \\] The answer is <b>"+ans+"°</b>."; }
  var prompt;
  if(mode==="copy-only") prompt="A woodworker replicates a \\("+A+"^\\circ\\) angle from a template onto a board using "+method+". What is the measure of the angle marked on the board?";
  else if(mode==="bisect-copy") prompt="A woodworker replicates a \\("+A+"^\\circ\\) angle from a template onto a board using "+method+", then bisects the copy to mark a centre line. What is the measure of each part of the bisected copy?";
  else prompt="A woodworker replicates a \\("+A+"^\\circ\\) angle from a template onto a board using "+method+", bisects the copy, and then bisects one of the parts again. What is the measure of the smallest angle formed?";
  var pool=[A, A/2, A/4, 180-A];
  var q=mcq(prompt, {t:ans+"°", fb:"Yes: replication keeps the measure at "+A+"°, and each bisection halves the angle."},
    u5DegOpts(ans,pool), sol, {A:A,mode:mode,method:method});
  if(mode==="copy-only") q.figure=u5AngleSVG(A, A+"°", 0);
  else if(mode==="bisect-copy") q.figure=u5SplitAngleSVG(A, 2);
  else q.figure=u5SplitAngleSVG(A, 4);
  return q;
}, ["Track the measure in stages: a copy keeps the measure, a bisection halves it.", "Apply one stage at a time and write the measure after each stage."]);

E("u5-multi-step-context", 5, ["3.49","3.43"], 3, "gen", function(){
  var a=pick([34,42,46,52,58,64,70,76,82,88,94,100,106,112,118,124,128,132,136,142]);
  var ans=(180-a)/2;
  var ctx=pick(["A cross street crosses two parallel roads. A triangular traffic island is painted in one corner: its base angle is the supplement of the \\("+a+"^\\circ\\) street angle, and a centre stripe splits that base angle into two equal parts.","Two parallel hiking trails are crossed by one straight path. A wedge shaped sign sits in the angle supplementary to the \\("+a+"^\\circ\\) path angle, and a post splits that wedge angle into two equal parts.","Two parallel dock edges are crossed by a straight ramp. A triangular brace fills the angle supplementary to the \\("+a+"^\\circ\\) ramp angle, and a bolt line splits that brace angle into two equal parts."]);
  var q=mcq(ctx+" What is the measure of each part after the split?",
    {t:ans+"°", fb:"Yes: the supplementary angle is 180 - "+a+" = "+(180-a)+", and halving it gives "+ans+"."},
    u5DegOpts(ans,[180-a, a/2, 180-a/2]),
    "\\[ \\begin{aligned} \\text{supplementary angle} &= 180^\\circ - "+a+"^\\circ = "+(180-a)+"^\\circ \\\\ \\text{each part} &= \\frac{"+(180-a)+"^\\circ}{2} = "+ans+"^\\circ \\end{aligned} \\] The answer is <b>"+ans+"°</b>.", {a:a}); q.figure=u5SuppBisectSVG(a); return q;
}, ["Work in stages: first find the supplementary angle, then split it.", "A split into two equal parts means dividing by 2 after the supplement is found."]);

/* ---------- Constructed response (numq) ---------- */
E("u5-cr-comp-supp", 5, ["3.36"], 2, "gen", function(){
  var comp=ri(0,1)===0; var a=comp?ri(18,72):ri(35,145);
  var ans=comp?90-a:180-a;
  var ctx=pick(["A triangular garden marker sits in the corner of a square plot, filling one part of the corner angle","A brace crosses a straight fence rail, forming two angles along the rail","A paper flag is folded so two angles fill a square corner","A ramp meets a straight walkway, forming two angles along the walkway"]);
  var q=numq(ctx+". One angle measures "+a+"°. The two angles form a "+(comp?"complementary pair (they fill a right angle)":"supplementary pair (they fill a straight line)")+". Find the measure of the other angle, in degrees.",
    ans, 0.5,
    (comp?"Complementary angles add to \\(90^\\circ\\).":"Supplementary angles add to \\(180^\\circ\\).")+" \\[ \\begin{aligned} \\text{other angle} &= "+(comp?90:180)+"^\\circ - "+a+"^\\circ \\\\ &= "+ans+"^\\circ \\end{aligned} \\] The answer is <b>"+ans+"°</b>.", {a:a,comp:comp}); q.figure=u5PairSVG(a, comp); return q;
}, ["Recall the total for this kind of angle pair.", "Subtract the given angle from that total."]);

E("u5-cr-trans-find", 5, ["3.40"], 2, "gen", function(){
  var pairs=[
    {g:"TR",k:"BL",rel:"eq",name:"alternate interior angles"},
    {g:"TL",k:"BR",rel:"eq",name:"alternate interior angles"},
    {g:"TR",k:"BR",rel:"supp",name:"interior angles on the same side of the transversal"},
    {g:"TL",k:"BL",rel:"supp",name:"interior angles on the same side of the transversal"}];
  var p=pick(pairs); var a=ri(32,148);
  var ans=p.rel==="eq"?a:180-a;
  var q=numq("Two parallel lines are cut by a transversal, as shown in the diagram. One marked angle measures "+a+"°. Find the measure of the angle marked with a question mark, in degrees.",
    ans, 0.5,
    "The marked angles are "+p.name+". "+(p.rel==="eq"?"Those angles are equal when the lines are parallel, so the marked angle is also \\("+a+"^\\circ\\).":"Those angles add to \\(180^\\circ\\) when the lines are parallel: \\[ 180^\\circ - "+a+"^\\circ = "+ans+"^\\circ \\]")+" The answer is <b>"+ans+"°</b>.", {a:a,rel:p.rel});
  q.figure=transversalSVG(p.g,a+"°",p.k,"?"); return q;
}, ["Name the relationship between the two marked angles.", "Equal pairs keep the measure; same side interior pairs add to 180."]);

E("u5-cr-around-point", 5, ["3.49"], 2, "gen", function(){
  var a=ri(55,120), b=ri(45,110), c=ri(40,95);
  var ans=360-a-b-c;
  var ctx=pick(["A ceiling fan hub has three marked angles between its blades and one unmarked gap","A roundabout sign post carries three marked direction angles and one unmarked gap","A sprinkler head turns through three marked sweeps and one unmarked sweep"]);
  var q=numq(ctx+". The marked angles around the point are "+a+"°, "+b+"° and "+c+"°. Find the measure of the unmarked angle, in degrees.",
    ans, 0.5,
    "Angles around a point add to \\(360^\\circ\\). \\[ \\begin{aligned} \\text{unmarked angle} &= 360^\\circ - "+a+"^\\circ - "+b+"^\\circ - "+c+"^\\circ \\\\ &= "+ans+"^\\circ \\end{aligned} \\] The answer is <b>"+ans+"°</b>.", {a:a,b:b,c:c}); q.figure=u5AroundSVG([a,b,c,ans],[a+"°",b+"°",c+"°","?"]); return q;
}, ["Angles around a point share one total: recall what it is.", "Subtract all the marked angles from that total."]);

E("u5-cr-replicate-bisect", 5, ["3.51","3.52"], 2, "gen", function(){
  var A=pick([44,52,58,64,70,78,84,86,92,94,102,108,114,122,128,136,142,148,154,156]);
  var ans=A/2;
  var ctx=pick(["A cabinet maker copies the angle of a corner template onto a trim piece, then bisects the copied angle to find its centre line","A quilter replicates the angle of a pattern piece onto fabric, then bisects the copy to mark a fold line","A metal worker copies the angle of a bracket onto a new piece, then bisects the copy before drilling","A sign maker copies the angle of a sample board onto a new board, then bisects the copy to centre a painted stripe","A boat builder copies the angle of a hull template onto a plank, then bisects the copy to mark the centre of a joint"]);
  var q=numq(ctx+". The template angle measures "+A+"°. Find the measure of each angle formed when the copy is bisected, in degrees.",
    ans, 0.5,
    "Replication keeps the measure, so the copy also measures \\("+A+"^\\circ\\). Bisection splits an angle into two equal parts. \\[ \\begin{aligned} \\text{each part} &= \\frac{"+A+"^\\circ}{2} \\\\ &= "+ans+"^\\circ \\end{aligned} \\] The answer is <b>"+ans+"°</b>.", {A:A}); q.figure=u5SplitAngleSVG(A, 2); return q;
}, ["A copy has the same measure as the original angle.", "Bisecting divides that measure into two equal parts."]);

E("u5-cr-perp-transversal", 5, ["3.43"], 2, "gen", function(){
  var a=ri(24,66); var ans=90-a;
  var ctx=pick(["Two parallel garden edging lines are crossed by a straight path that is perpendicular to both of them. A diagonal stepping stone edge crosses the path and makes an angle with one edging line","Two parallel dock boards are crossed by a straight beam that is perpendicular to both of them. A diagonal brace crosses the beam and makes an angle with one board","Two parallel yard lines on a field are crossed by a straight line that is perpendicular to both of them. A diagonal rope crosses that line and makes an angle with one yard line"]);
  var q=numq(ctx+" of "+a+"°, measured inside the strip between the parallel lines. The diagonal and the perpendicular line form a right angle together with that angle. Find the angle between the diagonal and the perpendicular line, in degrees.",
    ans, 0.5,
    "The perpendicular line meets the parallel line at \\(90^\\circ\\), and the diagonal splits that right angle into two parts. \\[ \\begin{aligned} \\text{angle with the perpendicular} &= 90^\\circ - "+a+"^\\circ \\\\ &= "+ans+"^\\circ \\end{aligned} \\] The answer is <b>"+ans+"°</b>.", {a:a}); q.figure=u5PerpTransSVG(a); return q;
}, ["Perpendicular lines form a right angle: that total is the key.", "The diagonal splits the right angle, so subtract the given part."]);

E("u5-cr-protractor", 5, ["3.44"], 2, "gen", function(){
  var a=ri(18,162); var base=pick([0,15,30,45,60]);
  var q=numq("The diagram shows an angle drawn to scale. Measure the angle with a protractor and give its measure in degrees.",
    a, 4,
    "Line the centre of the protractor up with the vertex and one ray up with zero, then read the scale where the second ray crosses. The second ray crosses at \\("+a+"^\\circ\\). The answer is <b>"+a+"°</b>.", {a:a,base:base});
  q.figure=u5AngleSVG(a,"",base); return q;
}, ["Put the centre of the protractor on the vertex and one ray on the zero line.", "Read the scale that starts at zero on that ray, where the second ray crosses."]);

E("u5-cr-angle-chase", 5, ["3.43","3.49"], 3, "gen", function(){
  var a=pick([33,39,44,52,57,63,68,74,79,83,88,92,97,103,108,111,117,124,129,135,141,147]);
  var ans=180-a;
  var scene=pick(["Two parallel harbour ropes are cut by a straight walkway line","Two parallel hiking trails are cut by a straight connecting path","Two parallel dock edges are cut by a straight ramp line","Two parallel garden paths are cut by a straight hose line"]);
  var q=numq(scene+". One angle formed measures "+a+"°. Angle B is an alternate interior angle to that angle. Angle C sits on a straight line with angle B, on the same side of the transversal. Find the measure of angle C, in degrees.",
    ans, 0.5,
    "Alternate interior angles formed by parallel lines are equal, so angle B measures \\("+a+"^\\circ\\). Angles on a straight line add to \\(180^\\circ\\). \\[ \\begin{aligned} \\text{angle C} &= 180^\\circ - "+a+"^\\circ \\\\ &= "+ans+"^\\circ \\end{aligned} \\] The answer is <b>"+ans+"°</b>.", {a:a});
  q.figure=transversalSVG("TR",a+"°","BL","B"); return q;
}, ["Find angle B first using the parallel line relationship.", "Then use the straight line total for angles B and C."]);

E("u5-cr-trans-algebra", 5, ["3.40","3.39"], 3, "gen", function(){
  var x0=pick([8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,24]);
  var aC=pick([3,4,5]), bC=pick([1,2]);
  var A=aC*x0, B=180-A, c=B-bC*x0, guard=0;
  while((A<30||A>150||B<30||c<5)&&guard<40){guard++; x0=pick([10,12,14,15,16,18,20]); aC=pick([3,4]); bC=1; A=aC*x0; B=180-A; c=B-bC*x0;}
  if(A<30||A>150||B<30||c<5){x0=15;aC=4;bC=1;A=60;B=120;c=105;}
  var askedExpr="("+bC+"x + "+c+")°", givenExpr="("+aC+"x)°";
  var q=numq("Two parallel lines are cut by a transversal. Two interior angles on the same side of the transversal measure "+givenExpr+" and "+askedExpr+". Find the measure of the angle marked "+askedExpr+", in degrees.",
    B, 0.5,
    "Interior angles on the same side of a transversal add to \\(180^\\circ\\) when the lines are parallel. \\[ \\begin{aligned} "+aC+"x + "+bC+"x + "+c+" &= 180 \\\\ "+(aC+bC)+"x &= "+(180-c)+" \\\\ x &= "+x0+" \\end{aligned} \\] Substituting back: \\("+bC+"x + "+c+" = "+bC+"("+x0+") + "+c+" = "+B+"\\). The answer is <b>"+B+"°</b>.", {x0:x0,B:B,c:c,aC:aC,bC:bC});
  q.figure=transversalSVG("TR",givenExpr,"BR",askedExpr); return q;
}, ["Same side interior angles add to 180: build the equation from that total.", "Solve for x, then substitute back into the asked expression."]);

/* ----- bank-u6.js ----- */
// Math 1202 Unit 6 Pythagorean Relation question bank
// Figures (added Nov 2026): right triangle, rectangle diagonal and
// corner check setups draw labelled figures from each question's
// own values. The history, trades formula and why entries, the
// 3:4:5 recognition entry (its answer sets are the options), and
// the create a problem and equivalent forms entries stay
// figureless: they are verbal or algebraic, with no single
// drawable setup in the stem.
// Cut verbatim from the standalone bank source
// (math-1202-review/bank-src.js, lines 3180 to 3766).
// CRMARKS: u6-cr-hypotenuse=2
// CRMARKS: u6-cr-leg=2
// CRMARKS: u6-cr-diagonal-rect=2
// CRMARKS: u6-cr-corner-diag=3
// CRMARKS: u6-cr-ladder=3
// CRMARKS: u6-cr-guywire-form=3
// CRMARKS: u6-cr-shortcut-saving=2
// CRMARKS: u6-cr-frame-diff=3
/* ===== Unit 6 ===== */
/* Math 1202 Unit 6: Pythagorean Relation (home 3.53-3.59, 2.6; cross 2.1-2.4).
   Helpers prefixed u6. Built deliberately fuller than the shell practice layer. */
function u6R1(x){ return Math.round(x*10)/10; }
function u6Triples(){ return [[3,4,5],[5,12,13],[6,8,10],[8,15,17],[9,12,15],[7,24,25],[12,16,20],[9,40,41],[20,21,29],[12,35,37],[15,20,25],[10,24,26],[18,24,30],[16,30,34]]; }
function u6Scaled(){ var t=pick(u6Triples()), k=ri(1,3); return [t[0]*k, t[1]*k, t[2]*k, k]; }
/* Right triangle figure: right angle at lower left, horizontal leg a, vertical leg b, hypotenuse c. Labels are text strings. */
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
/* General triangle figure from side lengths a, b, c (c is the base and the longest side). */
function u6GenTriSVG(a,b,c,aLab,bLab,cLab){
  var cx=(b*b-a*a+c*c)/(2*c), cy=Math.sqrt(Math.max(b*b-cx*cx,0.04));
  var s=Math.min(225/Math.max(c,1),125/Math.max(cy,1));
  var ox=48, oy=178, bx=ox+c*s, px=ox+cx*s, py=oy-cy*s;
  var out='<svg viewBox="0 0 320 210" width="320" height="210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Triangle diagram">';
  out+='<polygon points="'+ox+','+oy+' '+fmt(bx,1)+','+oy+' '+fmt(px,1)+','+fmt(py,1)+'" fill="'+FIG_SHADE+'" fill-opacity="0.30" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+=_txt((ox+bx)/2,oy+18,cLab,12.5,false);
  out+=_txt((ox+px)/2-20,(oy+py)/2,bLab,12.5,false);
  out+=_txt((bx+px)/2+20,(oy+py)/2,aLab,12.5,false);
  return out+'</svg>';
}
/* Corner figure: two walls meeting at a corner, marks at m1 along the floor and m2 up the wall, dashed diagonal dLab. */
function u6CornerSVG(m1,m2,dLab,m1Lab,m2Lab){
  var s=Math.min(200/Math.max(m1,1),128/Math.max(m2,1));
  var ox=72, oy=180, bx=ox+m1*s, cy=oy-m2*s;
  var out='<svg viewBox="0 0 320 215" width="320" height="215" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Corner check diagram with marks on two walls and a diagonal between the marks">';
  out+='<line x1="30" y1="'+oy+'" x2="300" y2="'+oy+'" stroke="'+FIG_INK+'" stroke-width="3"/>';
  out+='<line x1="'+ox+'" y1="195" x2="'+ox+'" y2="25" stroke="'+FIG_INK+'" stroke-width="3"/>';
  out+='<line x1="'+fmt(bx,1)+'" y1="'+oy+'" x2="'+ox+'" y2="'+fmt(cy,1)+'" stroke="'+FIG_ALT+'" stroke-width="2" stroke-dasharray="6 4"/>';
  out+='<circle cx="'+fmt(bx,1)+'" cy="'+oy+'" r="4" fill="'+FIG_INK+'"/><circle cx="'+ox+'" cy="'+fmt(cy,1)+'" r="4" fill="'+FIG_INK+'"/>';
  out+=_txt((ox+bx)/2,oy+18,m1Lab,12.5,false);
  out+=_txt(ox-26,(oy+cy)/2,m2Lab,12.5,false);
  out+=_txt((ox+bx)/2+16,(oy+cy)/2-6,dLab,12.5,false);
  return out+'</svg>';
}
/* Numeric MC options: correct value cv (formatted), errs is [[value, feedback], ...]. Returns [correctObj, distractorArray]. */
function u6NOpts(cv,cfb,errs,unit,dec){
  /* Options carry bare values by design: the unit is named in each caller's stem. */
  var f=dec?function(v){return fmtF(v,1);}:function(v){return fmt(v);};
  var seen={}, ds=[]; seen[f(cv)]=1;
  for(var i=0;i<errs.length && ds.length<3;i++){
    var v=errs[i][0]; if(!isFinite(v)||v<=0) continue; var key=f(v); if(seen[key]) continue; seen[key]=1;
    ds.push({t:key, fb:errs[i][1]});
  }
  var step=dec?2.3:3, g=0;
  while(ds.length<3 && g<24){ g++; var v2=cv+step*g; var k2=f(v2); if(seen[k2]) continue; seen[k2]=1;
    ds.push({t:k2, fb:"That value comes from changing the correct result, not from the side lengths given. Recheck the calculation."}); }
  return [{t:f(cv), fb:cfb}, ds];
}

E("u6-apps-history", 6, ["3.53"], 1, "var", varset([
  function(){ return mcq("Rope stretchers in ancient Egypt used a knotted rope to lay out field boundaries after floods. How did the rope help them make square corners for fields?",
    {t:"The rope was marked in a 3:4:5 ratio, and the corner where the 3 and 4 parts met formed a right angle.", fb:"Yes: a 3:4:5 triangle is a right triangle, so the rope set out true square corners."},
    [{t:"The rope was soaked in water overnight so it would stretch into a perfectly straight line for measuring fields.", fb:"Stretching makes a line, not a right angle: the 3:4:5 marks are what set the corner."},
     {t:"The rope was tied in a full circle so that square corners could be copied from the circle's round shape.", fb:"A circle copies curves, not square corners: the knotted 3:4:5 triangle is the tool."},
     {t:"The rope held 12 equal knots, spaced evenly, and any corner made from it was square by itself.", fb:"Equal spacing alone does not make a right angle: the sides must follow the 3:4:5 ratio."}],
    "A triangle with sides in the ratio 3:4:5 satisfies the Pythagorean relation, so it contains a right angle. The answer is <b>the knotted rope in a 3:4:5 ratio</b>.", {}); },
  function(){ return mcq("Which statement gives a historical application of the Pythagorean theorem?",
    {t:"Builders in ancient times used the relation to lay out right angles for temples, fields and pyramids.", fb:"Yes: setting out true right angles on the ground is one of the oldest uses of the relation."},
    [{t:"Sailors used the relation to predict tides and storm seasons along the coast each year.", fb:"Tides follow the Moon and weather patterns, not the side lengths of a right triangle."},
     {t:"Metal workers used the relation to choose the exact melting point of bronze for casting tools.", fb:"Melting points are a property of the metal, not a triangle calculation."},
     {t:"Map makers used the relation to colour regions on early maps, so that neighbouring regions stood out clearly.", fb:"Colouring regions is a design choice: the relation measures lengths in right triangles."}],
    "Early builders used the relation between the sides of a right triangle to set out right angles. The answer is <b>laying out right angles for buildings and fields</b>.", {}); },
  function(){ return mcq("A carpenter today checks that a deck frame is square before fastening the boards. Which use of the Pythagorean theorem is this?",
    {t:"A contemporary application: the frame is square when its diagonal matches the length the theorem predicts.", fb:"Yes: checking a diagonal against the theorem is a present day trade use."},
    [{t:"A historical application, because the theorem itself is already hundreds of years old.", fb:"The theorem is old, but this deck check is a current job, so it is a contemporary application."},
     {t:"Not an application at all, because the carpenter is measuring an existing frame instead of drawing one on paper.", fb:"Measuring a real frame and comparing it with the theorem is exactly an application."},
     {t:"An application of angle bisection, because the diagonal splits the corner into two angles.", fb:"The diagonal here is being checked for length and squareness, not used to bisect an angle."}],
    "Using the theorem on a job being done today is a contemporary application. The answer is <b>the deck frame diagonal check</b>.", {}); },
  function(){ return mcq("Which situation is a contemporary application of the Pythagorean theorem?",
    {t:"A delivery drone flies a straight route found from the eastward and northward distances to a drop site.", fb:"Yes: the straight flight distance is the hypotenuse of a right triangle with the two ground distances as legs."},
    [{t:"A baker doubles a recipe so that one cake mix feeds twice as many people at a community supper.", fb:"Doubling a recipe is proportional scaling of ingredients, not a right triangle length."},
     {t:"A clerk converts a price from dollars to cents for a receipt, multiplying the dollar amount by one hundred.", fb:"Converting money units is a place value change, not a triangle calculation."},
     {t:"A coach sorts players into teams of equal size for a drill before the game starts.", fb:"Sorting into equal groups is division, not the Pythagorean relation."}],
    "The straight route is the hypotenuse when the two ground distances are the legs of a right triangle. The answer is <b>the drone route</b>.", {}); },
  function(){ return mcq("Television and monitor screens are sold by a size such as 55 inches. What does that size measure, and which theorem connects it to the width and height of the screen?",
    {t:"It measures the diagonal of the screen, and the Pythagorean theorem connects the diagonal to the width and height.", fb:"Yes: width and height are the legs and the quoted size is the diagonal, the hypotenuse."},
    [{t:"It measures the width of the screen only, and the area of the screen connects it to the height.", fb:"The quoted size is the diagonal, not the width."},
     {t:"It measures the distance all the way around the screen, and the perimeter connects it to the two side lengths directly.", fb:"The quoted size is a single diagonal length, not the distance around."},
     {t:"It measures the height of the screen, and the Pythagorean theorem connects that height to the price.", fb:"The size is the diagonal, and the theorem connects lengths, not price."}],
    "Screen size is the diagonal length. With the width and height as legs, the theorem gives the diagonal. The answer is <b>the diagonal, found with the Pythagorean theorem</b>.", {}); },
  function(){ return mcq("Surveyors once found the distance across a pond without crossing it. They measured two distances on land that met at a right angle, one along each side of the pond corner. How did they get the distance across?",
    {t:"They treated the two land distances as the legs of a right triangle and calculated the distance across as the hypotenuse.", fb:"Yes: the line across the pond completes a right triangle, so its length comes from the two legs."},
    [{t:"They added the two land distances and reported that sum as the distance across, treating the path as two straight sides only.", fb:"Adding the legs gives the path around the corner, which is longer than the straight distance across."},
     {t:"They measured the water temperature carefully at both ends of the crossing and compared the readings with each other.", fb:"Temperature says nothing about a distance across the pond."},
     {t:"They waited for calm weather, then estimated the distance across by eye, judging it against the far shoreline.", fb:"Estimating by eye does not use the two measured legs: the theorem does."}],
    "The two measured distances are the legs and the distance across is the hypotenuse. The answer is <b>calculate it as the hypotenuse</b>.", {}); }
]), ["Sort each example by when and where it happens: long ago or on a job today.", "Start by asking whether the example finds a length or a right angle in a right triangle."]);

E("u6-trades-formula", 6, ["2.2"], 1, "var", varset([
  function(){ return mcq("How does a carpenter use the Pythagorean theorem formula \\(a^2 + b^2 = c^2\\) on a framing job?",
    {t:"To find the diagonal of a rectangular frame and check that the frame is square.", fb:"Yes: the two sides are the legs and the diagonal is the hypotenuse, so the formula tests squareness."},
    [{t:"To find the total board feet of lumber needed to build a wall frame for a house.", fb:"Board feet come from volume of lumber, not from the diagonal of the frame."},
     {t:"To choose the exact spacing of nails along the top plate of a stud wall.", fb:"Nail spacing follows building practice and code, not the triangle formula."},
     {t:"To work out the drying time of pressure treated lumber stacked outdoors.", fb:"Drying time depends on moisture and weather, not on side lengths of a triangle."}],
    "A carpenter uses \\(a^2 + b^2 = c^2\\) with the frame sides as legs and the diagonal as hypotenuse. The answer is <b>finding and checking the frame diagonal</b>.", {}); },
  function(){ return mcq("A roofer needs the length of a rafter. The roof rises straight up from the wall plate and runs straight out to the wall. How does the roofer use the Pythagorean theorem?",
    {t:"The rise and the run are the legs, so the theorem gives the rafter length as the hypotenuse.", fb:"Yes: a rafter is the sloped side of a right triangle formed by the rise and the run."},
    [{t:"The theorem gives the number of shingle bundles needed to cover the whole roof of a house in one layer.", fb:"Shingle bundles come from roof area, not from the rafter triangle alone."},
     {t:"The theorem sets the exact overlap between rows of shingles laid on the roof surface.", fb:"Shingle overlap is a set exposure measurement, not a hypotenuse."},
     {t:"The theorem gives the total weight that the roof frame can safely carry when loaded.", fb:"Load capacity is an engineering rating, not the rafter length calculation."}],
    "Rise and run form the legs of a right triangle and the rafter is the hypotenuse. The answer is <b>the theorem gives the rafter length</b>.", {}); },
  function(){ return mcq("A utility worker anchors a guy wire from the top of a pole to a point on the ground. Which job does the Pythagorean theorem do for the worker?",
    {t:"It gives the wire length from the pole height and the distance of the anchor from the base of the pole.", fb:"Yes: pole height and ground distance are the legs and the wire is the hypotenuse."},
    [{t:"It gives the voltage the wire can safely carry, based on the pole height and the anchor distance from the pole.", fb:"Voltage rating is a property of the equipment, not a triangle length."},
     {t:"It sets how deep the anchor must be buried in the ground next to the base of the pole.", fb:"Anchor depth depends on soil and load rules, not on the wire triangle."},
     {t:"It works out the exact crew size needed to raise the pole safely into place on site.", fb:"Crew size is a safety and lifting decision, not a side length."}],
    "The pole and the ground form a right angle, so the wire is the hypotenuse. The answer is <b>the theorem gives the wire length</b>.", {}); },
  function(){ return mcq("A tile setter is laying a rectangular bathroom floor and wants the corners to be truly square. How is the Pythagorean theorem used on this job?",
    {t:"Equal marks are measured along the two walls from a corner, and the distance between the marks is checked against the 3:4:5 pattern.", fb:"Yes: the 3:4:5 check is the theorem in trade form, used to test whether a corner is 90 degrees."},
    [{t:"The theorem chooses the colour pattern for the border tiles, deciding which colours alternate around the edge of the whole tiled floor.", fb:"Colour patterns are a design choice, not a right angle check."},
     {t:"The theorem gives the grout drying time for the floor, based on the lengths of the two walls that meet at the corner.", fb:"Drying time comes from the product directions, not a triangle."},
     {t:"The theorem counts how many tiles fit along one wall, using the full wall length and the width of a single tile.", fb:"Counting tiles along a wall is division of lengths, not the corner check."}],
    "Tile setters use the 3:4:5 form of the theorem to test corners. The answer is <b>the 3:4:5 corner check</b>.", {}); },
  function(){ return mcq("A stair builder cuts a stringer, the sloped board that carries the steps. The total rise and total run of the stairs are known. How does the builder use the Pythagorean theorem?",
    {t:"The stringer length is the hypotenuse of the right triangle with the total rise and total run as legs.", fb:"Yes: the sloped stringer closes a right triangle with the rise and the run."},
    [{t:"The theorem gives the exact height of each individual step in the whole staircase, from the bottom step to the top one.", fb:"Step height comes from dividing the total rise by the number of steps, not from the hypotenuse."},
     {t:"The theorem decides the width of the handrail board mounted on the wall beside the stairs.", fb:"Handrail width is a stock size choice, not the stringer length."},
     {t:"The theorem gives the number of screws needed in each step of the stairs to hold it firm.", fb:"Fastener counts follow building practice, not a triangle calculation."}],
    "Total rise and total run are the legs and the stringer is the hypotenuse. The answer is <b>the theorem gives the stringer length</b>.", {}); }
]), ["Think of the sloped or diagonal length on the job: it is usually the hypotenuse.", "Start by naming the two sides that meet at a right angle in the trade example."]);

E("u6-why-right-only", 6, ["3.54"], 1, "var", varset([
  function(){ return mcq("Why does the Pythagorean theorem apply only to right triangles?",
    {t:"The squares on the two shorter sides add to the square on the longest side only when the angle between the shorter sides is 90 degrees.", fb:"Yes: the equality of the squares holds exactly at a right angle and fails at other angles."},
    [{t:"Because the theorem was first written down for right triangles long ago, and no one has ever updated it at all in the centuries since then.", fb:"The limit is mathematical, not historical: the squares do not balance at other angles."},
     {t:"Because only right triangles have a longest side, and the sides of other triangles cannot be compared as squares at all.", fb:"Every triangle has a longest side: the square equality is what fails for other triangles."},
     {t:"Because the sides of other triangles cannot be squared at all, so the comparison of squares cannot even be started.", fb:"Any length can be squared: the squared lengths just do not add up the same way."}],
    "The relation \\(a^2 + b^2 = c^2\\) holds only when the angle between sides \\(a\\) and \\(b\\) is 90 degrees. The answer is <b>the squares balance only at a right angle</b>.", {}); },
  function(){ return mcq("A triangle has sides 4 cm, 5 cm and 6 cm. A student claims the theorem proves it is special. What does the square check actually show?",
    {t:"\\(4^2 + 5^2 = 41\\) and \\(6^2 = 36\\), so the squares do not balance and the triangle is not a right triangle.", fb:"Yes: 16 + 25 = 41, which is not 36, so the theorem does not hold for this triangle."},
    [{t:"\\(4^2 + 5^2 = 36\\), so the squares balance, and the triangle is a right triangle after all.", fb:"16 + 25 is 41, not 36: the arithmetic and the conclusion are both off."},
     {t:"\\(4 + 5 = 6 + 3\\), so the side lengths balance and the triangle is right, just as the squares would.", fb:"The theorem compares squares of the sides, not the sides themselves."},
     {t:"The squares on the sides always balance exactly for any three whole number sides, so every such triangle is right.", fb:"They balance only for right triangles: 41 and 36 show a case where they do not."}],
    "\\(4^2 + 5^2 = 41 \\ne 36 = 6^2\\). The answer is <b>the squares do not balance, so it is not a right triangle</b>.", {}); },
  function(){ return mcq("Squares are drawn on the three sides of a triangle that has an angle greater than 90 degrees. How do the square areas compare?",
    {t:"The square on the longest side is larger than the two smaller squares combined, so the theorem does not hold.", fb:"Yes: with an obtuse angle the longest side stretches, and its square passes the sum of the other two."},
    [{t:"The square on the longest side equals the two smaller squares combined.", fb:"Equality happens only at exactly 90 degrees, and this angle is greater than 90 degrees."},
     {t:"The square on the longest side is smaller than the two smaller squares combined.", fb:"A smaller total happens with an acute triangle: an obtuse angle makes the longest square larger."},
     {t:"The areas cannot be compared because the triangle has no right angle.", fb:"Areas can always be compared: the comparison is what shows the theorem failing."}],
    "For an obtuse triangle, \\(c^2 > a^2 + b^2\\). The answer is <b>the largest square is bigger than the other two combined</b>.", {}); },
  function(){ return mcq("A student uses \\(a^2 + b^2 = c^2\\) on a triangle with no right angle and gets a length for the longest side. Why is that length unreliable?",
    {t:"The formula assumes a right angle, so on another triangle shape it returns a value that does not match the real side.", fb:"Yes: the equality the formula is built on only holds for right triangles."},
    [{t:"The length is fine, because the formula works for every closed shape drawn, whatever angles it has inside, large or small.", fb:"The formula is a statement about right triangles only, not every shape."},
     {t:"The length is unreliable only because the student rounded the numbers given in the question too early.", fb:"Rounding is a small effect: the real problem is using the formula where it does not apply."},
     {t:"The length is unreliable because the longest side of a triangle cannot be calculated in this way at all.", fb:"Longest sides can be calculated with suitable methods: this formula is just the wrong one here."}],
    "The theorem is a right triangle fact. Using it elsewhere gives a value the real side does not match. The answer is <b>the formula assumes a right angle</b>.", {}); },
  function(){ return mcq("Two triangles have legs of 3 m and 4 m meeting each other. In one the angle between them is 90 degrees; in the other it is wider. What happens to the side opposite that angle?",
    {t:"It is 5 m in the right triangle, and longer than 5 m when the angle opens wider than 90 degrees.", fb:"Yes: opening the angle stretches the opposite side past the hypotenuse length of 5 m."},
    [{t:"It stays exactly 5 m, no matter how wide the angle between the two sides opens at all.", fb:"The opposite side changes as the angle changes: 5 m belongs to the 90 degree case."},
     {t:"It is 5 m in the right triangle, and shorter when the angle opens wider than 90 degrees.", fb:"Opening an angle lengthens the side across from it, not shortens it."},
     {t:"It is 7 m in both triangles because 3 + 4 = 7, and adding the sides always gives the third side.", fb:"Adding the legs gives the path along both sides, never the straight side across."}],
    "At 90 degrees the opposite side is the hypotenuse, 5 m. Opening the angle makes it longer. The answer is <b>5 m at the right angle, longer when the angle widens</b>.", {}); },
  function(){ return mcq("Which drawing best shows why the theorem needs a right angle?",
    {t:"Squares on the sides of a right triangle, where the two smaller square areas fill the largest square exactly.", fb:"Yes: the areas matching exactly is the picture of the theorem, and it works at 90 degrees."},
    [{t:"Squares on the sides of a long thin triangle, where the areas of the squares are never compared with each other.", fb:"A drawing that never compares the areas shows nothing about the theorem."},
     {t:"A circle drawn through the three corners of any triangle, whatever its angles happen to be.", fb:"A circle through the corners does not compare the square areas at all."},
     {t:"Two triangles joined along a common side to make a four sided shape with four straight edges in all.", fb:"Joining triangles makes a quadrilateral: the square areas are the picture that matters."}],
    "The theorem is a statement about square areas on the sides, matching exactly for a right triangle. The answer is <b>the squares on a right triangle with matching areas</b>.", {}); }
]), ["Picture squares built on the three sides and compare their areas.", "Start by checking whether the squares on the shorter sides add to the square on the longest side."]);

E("u6-345-recognize", 6, ["3.57"], 1, "gen", function(){
  var k=ri(2,12), unit=pick(["m","cm","ft"]);
  var ctx=pick([
    "A rope is marked into equal sections and pulled into a triangle to set out a garden bed.",
    "A framing crew stretches a tape into a triangle to set out a shed floor.",
    "A landscaping crew lays three border boards as a triangle for a flower bed.",
    "A survey helper pegs a cord into a triangle beside a driveway job.",
    "A tile setter tapes a triangle on a floor before laying the first tiles.",
    "A concrete crew forms a triangle with string lines at a patio corner."]);
  var a=3*k, b=4*k, c=5*k;
  function setStr(p,q,r){ return p+", "+q+", "+r+" "+unit; }
  function chk(p,q,r){ return p*p+" + "+q*q+" = "+(p*p+q*q)+", while the longest side squared is "+(r*r); }
  var opts=[
    {t:setStr(a,b,c), fb:"Yes: "+a+" squared plus "+b+" squared equals "+c+" squared, so this set is a multiple of 3:4:5."},
    {t:setStr(a,b,c+k), fb:"Check the squares: "+chk(a,b,c+k)+". The two totals differ, so this set misses the pattern."},
    {t:setStr(a-k,b,c), fb:"Check the squares: "+chk(a-k,b,c)+". The two totals differ, so this set misses the pattern."},
    {t:setStr(a,c,c), fb:"The two longer sides are equal here, and "+a+" squared plus "+c+" squared is far past "+c+" squared, so this set misses the pattern."}];
  var correct=opts[0], distractors=shuffle(opts.slice(1));
  return mcq(ctx+" Which set of side lengths follows the 3:4:5 pattern and so forms a right triangle?",
    correct, distractors,
    "The 3:4:5 pattern scaled by "+k+" gives sides "+a+", "+b+" and "+c+". \\[ \\begin{aligned} "+a+"^2 + "+b+"^2 &= "+(a*a)+" + "+(b*b)+" \\\\ &= "+(c*c)+" = "+c+"^2 \\end{aligned} \\] The answer is <b>"+setStr(a,b,c)+"</b>.",
    {k:k, unit:unit});
}, ["Look for sides that are all multiples of 3, 4 and 5 by the same amount.", "Start by dividing each side by the smallest side pattern: the ratios should read 3 to 4 to 5."]);

E("u6-identify-hypotenuse", 6, ["3.59","3.55"], 1, "gen", function(){
  var sc=u6Scaled(), a=sc[0], b=sc[1], c=sc[2];
  var unit=pick(["m","cm","ft","in"]);
  var ctx=pick(["A brace runs across a right triangular frame.","A ramp board forms a right triangle with the ground and a platform.","A support cable, a pole and the ground form a right triangle.","A stair stringer forms a right triangle with the floor and a wall.","A kite string, the ground and a vertical line form a right triangle."]);
  var q=mcq(ctx+" The two sides that meet at the right angle measure "+a+" "+unit+" and "+b+" "+unit+". Which statement names the hypotenuse and its length?",
    {t:"The hypotenuse is "+c+" "+unit+", the side opposite the right angle.", fb:"Yes: the hypotenuse is opposite the right angle and is the longest side, "+c+" "+unit+" here."},
    [{t:"The hypotenuse is "+a+" "+unit+", one of the sides at the right angle.", fb:"The side of "+a+" "+unit+" meets the right angle, so it is a leg, not the hypotenuse."},
     {t:"The hypotenuse is "+b+" "+unit+", one of the sides at the right angle.", fb:"The side of "+b+" "+unit+" meets the right angle, so it is a leg, not the hypotenuse."},
     {t:"The hypotenuse is "+(a+b)+" "+unit+", the two shorter sides added.", fb:"Adding the legs gives "+(a+b)+" "+unit+", which is longer than any straight side of the triangle."}],
    "\\(a^2 + b^2 = "+a+"^2 + "+b+"^2 = "+(a*a+b*b)+" = "+c+"^2\\), so the side opposite the right angle is "+c+" "+unit+". The answer is <b>"+c+" "+unit+", opposite the right angle</b>.",
    {a:a,b:b,c:c});
  q.figure=u6TriSVG(a,b,fmt(a)+" "+unit,fmt(b)+" "+unit,fmt(c)+" "+unit);
  return q;
}, ["The hypotenuse is always the side across from the right angle marker.", "Start by finding the small square corner in the diagram: the side that does not touch it is the hypotenuse."]);

E("u6-verify-squares", 6, ["3.55","3.56"], 2, "gen", function(){
  var sc=u6Scaled(), a=sc[0], b=sc[1];
  var mode=ri(0,2), c=sc[2];
  if(mode===1) c=c+ri(1,3); if(mode===2){ c=c-ri(1,2); if(c<=b) c=sc[2]+ri(1,3); }
  var unit=pick(["cm","m","ft","in"]);
  var ctx=pick(["A student builds squares on the three sides of a triangular tile pattern","A class tests a triangular garden frame with squares drawn on each side","A worker checks a triangular brace by squaring each side length","A student models a triangular sign with squares on all three sides"]);
  var sum=a*a+b*b, cs=c*c;
  var concl, cfb;
  if(sum===cs){ concl="equal to \\("+cs+"\\), so the triangle is a right triangle"; cfb="Yes: "+a+" squared plus "+b+" squared is "+sum+", matching "+c+" squared exactly."; }
  else if(sum>cs){ concl="greater than \\("+cs+"\\), so the triangle is not a right triangle"; cfb="Yes: "+a+" squared plus "+b+" squared is "+sum+", which passes "+c+" squared at "+cs+"."; }
  else { concl="less than \\("+cs+"\\), so the triangle is not a right triangle"; cfb="Yes: "+a+" squared plus "+b+" squared is "+sum+", which falls short of "+c+" squared at "+cs+"."; }
  var correct={t:"\\("+a+"^2 + "+b+"^2 = "+sum+"\\), which is "+concl, fb:cfb};
  var others=[
    {t:"\\("+a+"^2 + "+b+"^2 = "+((a+b)*(a+b))+"\\), which is equal to \\("+cs+"\\), so the triangle is a right triangle", fb:"That total squares the sum "+(a+b)+" instead of adding the squares. Square each side first, then add."},
    {t:"\\("+a+"^2 + "+b+"^2 = "+sum+"\\), which is "+(sum===cs?"greater than":"equal to")+" \\("+cs+"\\), so the triangle is "+(sum===cs?"not a right triangle":"a right triangle"), fb:"The total "+sum+" is right, but the comparison with "+cs+" is stated backwards. Compare the two totals again."},
    {t:"\\("+a+" \\times "+b+" = "+(a*b)+"\\), which comes out equal to \\("+cs+"\\), so the triangle is a right triangle", fb:"Multiplying the two legs is an area step, not the theorem. The theorem adds the squares of the sides."}];
  var q=mcq(ctx+". The sides are "+a+" "+unit+", "+b+" "+unit+" and "+c+" "+unit+", with "+c+" "+unit+" the longest side. What does the square check show?",
    correct, others,
    "\\[ \\begin{aligned} "+a+"^2 + "+b+"^2 &= "+(a*a)+" + "+(b*b)+" = "+sum+" \\\\ "+c+"^2 &= "+cs+" \\end{aligned} \\] Comparing the totals: the check shows the sum is "+concl+". The answer is <b>\\("+sum+"\\) compared with \\("+cs+"\\)</b>.",
    {a:a,b:b,c:c,mode:mode});
  q.figure=u6GenTriSVG(a,b,c,fmt(a)+" "+unit,fmt(b)+" "+unit,fmt(c)+" "+unit);
  return q;
}, ["Square each side on its own first, then compare the two shorter squares with the longest square.", "Start by computing the square of the longest side, since that is the total the other two must match."]);

E("u6-is-right", 6, ["3.56"], 2, "gen", function(){
  var sc=u6Scaled(), a=sc[0], b=sc[1], c=sc[2];
  var mode=pick(["right","right","long","short"]);
  if(mode==="long") c=c+ri(1,4); if(mode==="short"){ c=c-ri(1,3); if(c<=sc[1]) c=sc[2]+ri(1,3); }
  if(a>b){ var t=a; a=b; b=t; }
  var unit=pick(["cm","m","ft","in","mm"]);
  var ctx=pick(["A triangular flower bed has sides","A triangular kite frame has sides","A triangular shelf bracket has sides","A triangular pennant has sides","A triangular plot of gravel has sides","A triangular sail has sides","A triangular warning sign has sides"]);
  var sum=a*a+b*b, cs=c*c;
  var relation = sum===cs ? "equals" : (sum>cs ? "is greater than" : "is less than");
  var verdict = sum===cs ? "Yes, it is a right triangle" : "No, it is not a right triangle";
  var correct={t:verdict+", because \\("+a+"^2 + "+b+"^2 = "+sum+"\\) and \\("+c+"^2 = "+cs+"\\)", fb:"Yes: the two totals "+(sum===cs?"match exactly":"differ")+", and that decides the question."};
  var distractors=[
    {t:(sum===cs?"No, it is not a right triangle":"Yes, it is a right triangle")+", because \\("+a+"^2 + "+b+"^2 = "+sum+"\\) and \\("+c+"^2 = "+cs+"\\)", fb:"The totals are computed correctly but the conclusion is backwards: the triangle is a right triangle only when the totals match exactly."},
    {t:verdict+", because \\("+a+" + "+b+" = "+c+"\\) with the sides added directly", fb:"The theorem compares squares, not the sides added directly: "+a+" + "+b+" is "+(a+b)+", not "+c+"."},
    {t:verdict+", because \\("+a+"^2 + "+c+"^2 = "+(a*a+c*c)+"\\) and \\("+b+"^2 = "+(b*b)+"\\)", fb:"That check squares the longest side as a leg. The longest side must stand alone on one side of the equation."}];
  var q=mcq(ctx+" of "+a+" "+unit+", "+b+" "+unit+" and "+c+" "+unit+". Is the triangle a right triangle?",
    correct, distractors,
    "Square the two shorter sides and compare with the square of the longest side. \\[ \\begin{aligned} "+a+"^2 + "+b+"^2 &= "+(a*a)+" + "+(b*b)+" = "+sum+" \\\\ "+c+"^2 &= "+cs+" \\end{aligned} \\] The first total "+relation+" the second. The answer is <b>"+verdict.toLowerCase()+"</b>.",
    {a:a,b:b,c:c,mode:mode});
  var cGeo=Math.min(c, a+b-0.6); if(cGeo<=Math.abs(a-b)+0.6) cGeo=Math.abs(a-b)+1.2;
  q.figure=u6GenTriSVG(a,b,cGeo,fmt(a)+" "+unit,fmt(b)+" "+unit,fmt(c)+" "+unit);
  return q;
}, ["Use the converse: a triangle is right exactly when the squares of the shorter sides add to the square of the longest side.", "Start by identifying the longest side, since its square is the one the other two must match."]);

E("u6-hypotenuse-direct", 6, ["3.59","2.3"], 2, "gen", function(){
  var a=ri(3,25), b=ri(3,25); if(ri(0,1)) a+=0.5; if(ri(0,1)) b+=0.5;
  var hyp=Math.sqrt(a*a+b*b), ans=u6R1(hyp);
  var unit=pick(["m","ft","cm"]);
  var ctxs=[
    ["A playground slide is "+b+" "+unit+" high and its base reaches "+a+" "+unit+" out from the platform. What is the length of the sliding surface","the sliding surface"],
    ["A ramp rises "+b+" "+unit+" over a horizontal run of "+a+" "+unit+". What is the length of the sloped ramp surface","the ramp surface"],
    ["A banner cable runs from a point "+a+" "+unit+" along the ground to the top of a wall "+b+" "+unit+" high. What is the length of the cable","the cable"],
    ["A conveyor rises "+b+" "+unit+" while covering "+a+" "+unit+" of floor distance. What is the length of the conveyor belt run","the belt run"],
    ["A stair stringer covers a run of "+a+" "+unit+" and a rise of "+b+" "+unit+". What is the length of the stringer","the stringer"],
    ["A tent rope runs from a stake "+a+" "+unit+" from the pole base to a point "+b+" "+unit+" up the pole. What is the length of the rope","the rope"]];
  var ctx=pick(ctxs);
  var pair=u6NOpts(ans,"Yes: square both legs, add, and take the square root to get "+fmtF(ans,1)+" "+unit+".",
    [[u6R1(a+b),"That adds the legs, giving the path along both sides, not the straight sloped length."],
     [u6R1(Math.sqrt(Math.abs(a*a-b*b))),"That subtracts the squares. For a hypotenuse, the squares of the legs are added."],
     [u6R1(a*a+b*b),"That is the squared length before the square root step. Take the square root to finish."],
     [u6R1(hyp+2),"That overshoots the square root result. Recheck the root of "+fmt(a*a+b*b)+"."],
     [u6R1(Math.max(hyp-2,0.5)),"That falls short of the square root result. Recheck the root of "+fmt(a*a+b*b)+"."]],
    unit,1);
  var q=mcq(ctx[0]+", in "+({m:"metres",ft:"feet",cm:"centimetres"})[unit]+"? Give the length to the nearest tenth.",
    pair[0], pair[1],
    "The sloped length is the hypotenuse. \\[ \\begin{aligned} c^2 &= "+fmt(a)+"^2 + "+fmt(b)+"^2 \\\\ &= "+fmt(a*a)+" + "+fmt(b*b)+" = "+fmt(a*a+b*b)+" \\\\ c &= \\sqrt{"+fmt(a*a+b*b)+"} \\approx "+fmtF(ans,1)+" \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+" "+unit+"</b>.",
    {a:a,b:b});
  q.figure=u6TriSVG(a,b,fmt(a)+" "+unit,fmt(b)+" "+unit,"?");
  return q;
}, ["The sloped length is the hypotenuse, so use the theorem in its direct form.", "Start by squaring the two given lengths and adding the squares."]);

E("u6-corner-square", 6, ["3.58","3.57"], 2, "gen", function(){
  var unit=pick(["cm","cm","in"]);
  var u=unit==="cm"?ri(12,32):ri(2,5);
  var m1=3*u, m2=4*u, diag=5*u;
  var ctx=pick(["A deck builder checks a frame corner","A tile setter checks a bathroom floor corner","A foundation crew checks a form corner","A shed builder checks a floor frame corner","A gardener checks the corner of a raised bed","A framer checks the corner of a wall section"]);
  if(ri(0,1)===0){
    var pair=u6NOpts(diag,"Yes: in a 3:4:5 check, the diagonal is 5 parts when the marks are 3 parts and 4 parts.",
      [[m1+m2,"That adds the two marks, giving the path along both walls, not the straight diagonal."],
       [diag-u,"That uses 4 parts for the diagonal, matching the longer mark instead of the 5 part diagonal."],
       [diag+u,"That uses 6 parts for the diagonal, one part too many: the pattern is 3, 4, 5."],
       [Math.round(Math.sqrt(m1*m1+m2*m2))+ri(2,4),"Close to the mark distance, but the 3:4:5 pattern fixes the diagonal at exactly 5 parts of "+u+" "+unit+"."]],
      unit,0);
    var q=mcq(ctx+" by marking "+m1+" "+unit+" along one side and "+m2+" "+unit+" along the other side from the corner. For the corner to be square, what should the distance between the two marks be, in "+(unit==="cm"?"centimetres":"inches")+"?",
      pair[0], pair[1],
      "The marks follow 3:4:5 with each part equal to "+u+" "+unit+". \\[ \\begin{aligned} \\text{diagonal} &= 5 \\times "+u+" = "+diag+" \\end{aligned} \\] Checking with the theorem: \\("+m1+"^2 + "+m2+"^2 = "+(m1*m1+m2*m2)+" = "+diag+"^2\\). The answer is <b>"+diag+" "+unit+"</b>.",
      {m1:m1,m2:m2,mode:"expect"});
    q.figure=u6CornerSVG(m1,m2,"?",fmt(m1)+" "+unit,fmt(m2)+" "+unit);
    return q;
  }
  var off=pick([-6,-4,-3,3,4,6,8,-8].filter(function(d){ return unit==="cm" ? true : Math.abs(d)<=3; }));
  var measured=diag+off;
  var square = off===0;
  var correct={t:"The corner is not square, because the distance should be "+diag+" "+unit+" and the marks measure "+measured+" "+unit,
    fb:"Yes: a square corner needs the 5 part distance of "+diag+" "+unit+"; "+measured+" "+unit+" misses it."};
  var distractors=[
    {t:"The corner is square, because any two marks with a tape between them confirm a right angle", fb:"Marks alone confirm nothing: the distance between them must match the 3:4:5 pattern."},
    {t:"The corner is square, because "+m1+" "+unit+" and "+m2+" "+unit+" follow the 3 and 4 parts of the pattern", fb:"The 3 and 4 marks are only two thirds of the check: the diagonal must also match the 5 part, "+diag+" "+unit+"."},
    {t:"The corner is not square, because the distance should be "+(m1+m2)+" "+unit+" and the marks measure "+measured+" "+unit, fb:"The expected distance is not the marks added: it is the 5 part diagonal, "+diag+" "+unit+"."}];
  var q2=mcq(ctx+". Marks are made "+m1+" "+unit+" along one side and "+m2+" "+unit+" along the other side from the corner, and the distance between the marks measures "+measured+" "+unit+". What does the 3:4:5 check conclude?",
    correct, distractors,
    "Each part is "+u+" "+unit+", so a square corner needs \\(5 \\times "+u+" = "+diag+"\\) "+unit+" between the marks. The measured distance is "+measured+" "+unit+", which differs. The answer is <b>the corner is not square</b>.",
    {m1:m1,m2:m2,measured:measured,mode:"judge"});
  q2.figure=u6CornerSVG(m1,m2,fmt(measured)+" "+unit,fmt(m1)+" "+unit,fmt(m2)+" "+unit);
  return q2;
}, ["The corner check is the 3:4:5 pattern scaled to the job: marks of 3 parts and 4 parts need 5 parts between them.", "Start by finding the size of one part from either mark, then multiply by 5 for the diagonal."]);

E("u6-why-345-works", 6, ["3.57"], 2, "gen", function(){
  var k=ri(2,15), unit=pick(["m","cm","ft","units"]);
  var a=3*k, b=4*k, c=5*k;
  var ctx=pick(["A triangle has side lengths","A rope triangle has side lengths","A frame triangle has side lengths","A garden triangle has side lengths","A layout triangle has side lengths","A test triangle has side lengths"]);
  var correct={t:"\\("+a+"^2 + "+b+"^2 = "+c+"^2\\), because \\("+(a*a)+" + "+(b*b)+" = "+(c*c)+"\\)",
    fb:"Yes: the squares of the two shorter sides add exactly to the square of the longest side."};
  var distractors=[
    {t:"\\("+a+" + "+b+" = "+c+"\\), because \\("+a+" + "+b+" = "+(a+b)+"\\) and that settles the question",
     fb:"Adding the sides gives "+(a+b)+", not "+c+": the theorem compares squares, not the sides themselves."},
    {t:"\\("+a+"^2 + "+c+"^2 = "+b+"^2\\), because \\("+(a*a)+" + "+(c*c)+" = "+(a*a+c*c)+"\\)",
     fb:"That puts the longest side in as a leg. The longest side, "+c+", must stand alone as the hypotenuse."},
    {t:"\\("+c+"^2 - "+a+"^2 = "+b+"^2\\), because \\("+(c*c)+" - "+(a*a)+" = "+(c*c-a*a)+"\\) and squares are involved",
     fb:"That rearrangement gives "+(c*c-a*a)+", not "+(b*b)+": it mixes up which leg is being isolated."}];
  return mcq(ctx+" of "+a+" "+unit+", "+b+" "+unit+" and "+c+" "+unit+". Which calculation proves the triangle is a right triangle?",
    correct, distractors,
    "The sides are the 3:4:5 pattern scaled by "+k+". \\[ \\begin{aligned} "+a+"^2 + "+b+"^2 &= "+(a*a)+" + "+(b*b)+" \\\\ &= "+(c*c)+" = "+c+"^2 \\end{aligned} \\] Because the relation holds, the triangle is a right triangle. The answer is <b>\\("+a+"^2 + "+b+"^2 = "+c+"^2\\)</b>.",
    {a:a,b:b,c:c,k:k});
}, ["A 3:4:5 triangle is right because it passes the square check of the theorem.", "Start by squaring all three sides and looking for the two that add to the third."]);

E("u6-counterexample", 6, ["3.54","3.56"], 2, "gen", function(){
  var sc=u6Scaled(), a=sc[0], b=sc[1], pred=sc[2];
  var delta=pick([1,2,3,-1,-2]); var actual=pred+delta; if(actual<=b) actual=pred+ri(1,3);
  var unit=pick(["cm","m","ft","in"]);
  var ctx=pick(["A student sketches a triangle with sides","A kit builds a triangular frame with sides","A flag is cut as a triangle with sides","A metal offcut forms a triangle with sides"]);
  var correct={t:"The theorem would predict "+pred+" "+unit+", but the side measures "+actual+" "+unit+", so the triangle is not a right triangle",
    fb:"Yes: \\("+a+"^2 + "+b+"^2 = "+pred+"^2\\), and the actual longest side differs, so there is no right angle."};
  var distractors=[
    {t:"The theorem would predict "+actual+" "+unit+", so the side measures exactly what the theorem requires",
     fb:"The calculation gives "+pred+" "+unit+", not "+actual+" "+unit+": that mismatch is the whole point of the example."},
    {t:"The theorem would predict "+(a+b)+" "+unit+", but the side measures "+actual+" "+unit+", so the triangle is not a right triangle",
     fb:"The prediction is not the legs added: square the legs, add, and take the root, which gives "+pred+" "+unit+"."},
    {t:"The theorem would predict "+pred+" "+unit+", so the triangle is a right triangle even though the side measures "+actual+" "+unit,
     fb:"A prediction and a measurement that differ cannot both describe a right triangle: the mismatch shows there is no right angle."}];
  var q=mcq(ctx+" "+a+" "+unit+", "+b+" "+unit+" and "+actual+" "+unit+". The student applies the Pythagorean theorem to the two shorter sides. What does the result show?",
    correct, distractors,
    "\\[ \\begin{aligned} c^2 &= "+a+"^2 + "+b+"^2 = "+(a*a)+" + "+(b*b)+" = "+(pred*pred)+" \\\\ c &= "+pred+" \\end{aligned} \\] A right triangle with legs "+a+" and "+b+" would have longest side "+pred+" "+unit+". The actual side is "+actual+" "+unit+", so this triangle has no right angle. The answer is <b>predicted "+pred+" "+unit+", actual "+actual+" "+unit+", not a right triangle</b>.",
    {a:a,b:b,pred:pred,actual:actual});
  q.figure=u6GenTriSVG(a,b,actual,fmt(a)+" "+unit,fmt(b)+" "+unit,fmt(actual)+" "+unit);
  return q;
}, ["Run the theorem on the two shorter sides and compare its prediction with the side that is actually there.", "Start by squaring the two shorter sides: their total tells you what the longest side would have to be."]);

E("u6-apps-contemporary", 6, ["3.53","2.2"], 2, "gen", function(){
  var a=ri(2,30), b=ri(2,30);
  var dist=Math.sqrt(a*a+b*b), ans=u6R1(dist);
  var unit=pick(["km","m"]);
  var ctxs=[
    ["A search drone must fly in a straight line to a site that is "+a+" "+unit+" east and "+b+" "+unit+" north of its base. What is the straight line flight distance, to the nearest tenth","the flight distance"],
    ["A navigation app places a trailhead "+a+" "+unit+" east and "+b+" "+unit+" north of a parking lot. What is the straight line distance between them, to the nearest tenth","the straight line distance"],
    ["A rescue boat heads to a buoy that is "+a+" "+unit+" along the shore and "+b+" "+unit+" out from shore, at a right angle. What is the direct distance to the buoy, to the nearest tenth","the direct distance"],
    ["A survey drone maps a point that is "+a+" "+unit+" across a field and "+b+" "+unit+" along the field from its launch corner. What is the direct distance to the point, to the nearest tenth","the direct distance"],
    ["A delivery robot can cut across an empty lot from one corner. The lot edges it would otherwise follow run "+a+" "+unit+" and "+b+" "+unit+" at a right angle. What is the distance across, to the nearest tenth","the distance across"],
    ["A hiker with a GPS unit is "+a+" "+unit+" east and "+b+" "+unit+" north of a cabin. What is the straight line distance back to the cabin, to the nearest tenth","the straight line distance"]];
  var ctx=pick(ctxs);
  var pair=u6NOpts(ans,"Yes: the two ground distances are the legs, and the direct distance is the hypotenuse.",
    [[u6R1(a+b),"That adds the legs, which is the distance around the corner, not the direct distance."],
     [u6R1(Math.abs(a-b)),"That subtracts the ground distances. The direct distance comes from adding their squares."],
     [u6R1(a*a+b*b),"That is the squared distance. Take the square root to get the distance itself."],
     [u6R1(dist+ri(2,5)),"That overshoots the hypotenuse. Recheck the square root of "+(a*a+b*b)+"."]],
    unit,1);
  var q=mcq(ctx[0]+", in "+({km:"kilometres",m:"metres"})[unit]+"?",
    pair[0], pair[1],
    "The direct distance is the hypotenuse of a right triangle. \\[ \\begin{aligned} d^2 &= "+a+"^2 + "+b+"^2 = "+(a*a)+" + "+(b*b)+" = "+(a*a+b*b)+" \\\\ d &= \\sqrt{"+(a*a+b*b)+"} \\approx "+fmtF(ans,1)+" \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+" "+unit+"</b>.",
    {a:a,b:b});
  q.figure=u6TriSVG(a,b,fmt(a)+" "+unit,fmt(b)+" "+unit,"?");
  return q;
}, ["Direct or straight line distance across a right angle is a hypotenuse problem.", "Start by squaring the two ground distances and adding the squares."]);

E("u6-cr-hypotenuse", 6, ["3.59","2.3"], 2, "gen", function(){
  var a=ri(4,28), b=ri(4,28); if(ri(0,1)) a+=0.5; if(ri(0,1)) b+=0.5;
  var ans=u6R1(Math.sqrt(a*a+b*b));
  var unit=pick(["m","ft","cm"]);
  var ctx=pick([
    "A slide at a playground is "+fmt(b)+" "+unit+" high, and its base sits "+fmt(a)+" "+unit+" out from the platform.",
    "A loading ramp rises "+fmt(b)+" "+unit+" over a horizontal run of "+fmt(a)+" "+unit+".",
    "A support cable reaches from a ground anchor "+fmt(a)+" "+unit+" from a wall to a point "+fmt(b)+" "+unit+" up the wall.",
    "A garden trellis leans so its foot is "+fmt(a)+" "+unit+" from a fence and its top touches "+fmt(b)+" "+unit+" up the fence."]);
  var q=numq(ctx+" What is the length, in "+unit+", of the sloped side? Give your answer to the nearest tenth.",
    ans, 0.15,
    "The sloped side is the hypotenuse. \\[ \\begin{aligned} c^2 &= "+fmt(a)+"^2 + "+fmt(b)+"^2 \\\\ &= "+fmt(a*a)+" + "+fmt(b*b)+" = "+fmt(a*a+b*b)+" \\\\ c &= \\sqrt{"+fmt(a*a+b*b)+"} \\approx "+fmtF(ans,1)+" \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+" "+unit+"</b>.",
    {a:a,b:b});
  q.figure=u6TriSVG(a,b,fmt(a)+" "+unit,fmt(b)+" "+unit,"?");
  return q;
}, ["The sloped side is the hypotenuse: square both legs, add, then take the square root.", "Start by squaring the horizontal distance and the height separately."]);

E("u6-cr-leg", 6, ["3.59","2.4"], 2, "gen", function(){
  var sc=u6Scaled(), legA=sc[0], legB=sc[1], hyp=sc[2];
  var giveFirst=ri(0,1)===0;
  var given=giveFirst?legA:legB, wanted=giveFirst?legB:legA;
  var unit=pick(["m","ft","cm"]);
  var ctx=pick([
    "A kite string is "+hyp+" "+unit+" long and the kite is "+given+" "+unit+" directly above the ground point used for measuring.",
    "A roof rafter is "+hyp+" "+unit+" long and the roof rises "+given+" "+unit+" from the wall plate to the ridge.",
    "A brace board is "+hyp+" "+unit+" long and it reaches "+given+" "+unit+" up a post.",
    "A zipline cable is "+hyp+" "+unit+" long and the finish platform is "+given+" "+unit+" lower than the start platform."]);
  var wantedName=giveFirst?"the other leg of the right triangle":"the other leg of the right triangle";
  var q=numq(ctx+" The string, board or cable forms the hypotenuse of a right triangle. How long, in "+unit+", is "+wantedName+"?",
    wanted, 0.1,
    "The formula must be rearranged to isolate the unknown leg. \\[ \\begin{aligned} b^2 &= c^2 - a^2 \\\\ &= "+hyp+"^2 - "+given+"^2 = "+(hyp*hyp)+" - "+(given*given)+" = "+(wanted*wanted)+" \\\\ b &= "+wanted+" \\end{aligned} \\] The answer is <b>"+wanted+" "+unit+"</b>.",
    {hyp:hyp,given:given});
  q.figure=giveFirst?u6TriSVG(given,wanted,fmt(given)+" "+unit,"?",fmt(hyp)+" "+unit):u6TriSVG(wanted,given,"?",fmt(given)+" "+unit,fmt(hyp)+" "+unit);
  return q;
}, ["For a missing leg, rearrange the theorem: the leg squared equals the hypotenuse squared minus the known leg squared.", "Start by squaring the hypotenuse and the known leg separately."]);

E("u6-cr-diagonal-rect", 6, ["3.59","2.3"], 2, "gen", function(){
  var w=ri(4,30), l=ri(4,30); if(ri(0,1)) w+=0.5; if(ri(0,1)) l+=0.5;
  var ans=u6R1(Math.sqrt(w*w+l*l));
  var unit=pick(["cm","in","ft","m"]);
  var ctx=pick([
    "A rectangular plywood sheet measures "+fmt(l)+" "+unit+" by "+fmt(w)+" "+unit+". A brace is cut to run corner to corner.",
    "A rectangular screen measures "+fmt(l)+" "+unit+" across and "+fmt(w)+" "+unit+" high.",
    "A rectangular gate frame measures "+fmt(l)+" "+unit+" by "+fmt(w)+" "+unit+". A diagonal brace is fitted from corner to corner.",
    "A rectangular garden bed measures "+fmt(l)+" "+unit+" by "+fmt(w)+" "+unit+". A hose is stretched from one corner to the opposite corner."]);
  var q=numq(ctx+" What is the diagonal length, in "+unit+"? Give your answer to the nearest tenth.",
    ans, 0.15,
    "The diagonal is the hypotenuse of a right triangle with the side lengths as legs. \\[ \\begin{aligned} d^2 &= "+fmt(l)+"^2 + "+fmt(w)+"^2 \\\\ &= "+fmt(l*l)+" + "+fmt(w*w)+" = "+fmt(l*l+w*w)+" \\\\ d &= \\sqrt{"+fmt(l*l+w*w)+"} \\approx "+fmtF(ans,1)+" \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+" "+unit+"</b>.",
    {w:w,l:l});
  q.figure=m12RectDiagSVG(l,w,fmt(l)+" "+unit,fmt(w)+" "+unit,"?");
  return q;
}, ["A rectangle diagonal splits the rectangle into two right triangles.", "Start by squaring the length and the width and adding the squares."]);

E("u6-cr-corner-diag", 6, ["3.58"], 2, "gen", function(){
  var u=ri(12,32);
  var m1=3*u, m2=4*u, diag=5*u;
  var ctx=pick([
    "A builder setting out a shed foundation marks "+m1+" cm along one string line and "+m2+" cm along the other from the corner peg.",
    "A tile setter marks "+m1+" cm along one wall and "+m2+" cm along the adjoining wall from the corner.",
    "A gardener building a raised bed marks "+m1+" cm along one board and "+m2+" cm along the next board from the corner.",
    "A framer marks "+m1+" cm along the bottom plate and "+m2+" cm along the end plate from the corner of a wall section."]);
  var q=numq(ctx+" The builder uses the 3:4:5 check. What distance, in cm, between the two marks will confirm the corner is square?",
    diag, 0.1,
    "Each part of the 3:4:5 pattern is "+u+" cm, since \\(3 \\times "+u+" = "+m1+"\\) and \\(4 \\times "+u+" = "+m2+"\\). \\[ \\begin{aligned} \\text{mark distance} &= 5 \\times "+u+" = "+diag+" \\end{aligned} \\] The answer is <b>"+diag+" cm</b>.",
    {m1:m1,m2:m2,u:u});
  q.figure=u6CornerSVG(m1,m2,"?",fmt(m1)+" cm",fmt(m2)+" cm");
  return q;
}, ["The 3:4:5 check scales: the distance between the marks is the 5 part of the pattern.", "Start by finding one part: divide either mark by its pattern number, 3 or 4."]);

E("u6-cr-ladder", 6, ["3.59","2.4"], 2, "gen", function(){
  var sc=u6Scaled(), legA=sc[0], legB=sc[1], hyp=sc[2];
  var unit=pick(["ft","m"]);
  var ctxs=[
    ["A ladder "+hyp+" "+unit+" long leans against a house. Its foot is "+legA+" "+unit+" from the wall. How high, in "+unit+", does the ladder reach on the wall", legB, legA],
    ["A guy wire "+hyp+" "+unit+" long runs from the top of a pole to an anchor "+legB+" "+unit+" from the base of the pole. How tall, in "+unit+", is the pole", legA, legB],
    ["A ramp board "+hyp+" "+unit+" long rests with its foot "+legA+" "+unit+" out from a step. How high, in "+unit+", is the step it reaches", legB, legA],
    ["A support strut "+hyp+" "+unit+" long runs from a wall point to a shelf bracket "+legB+" "+unit+" out from the wall. How far, in "+unit+", up the wall is the strut attached", legA, legB]];
  var ctx=pick(ctxs);
  var q=numq(ctx[0]+"?",
    ctx[1], 0.1,
    "The long object is the hypotenuse, so the theorem is rearranged for a leg. \\[ \\begin{aligned} b^2 &= "+hyp+"^2 - "+ctx[2]+"^2 \\\\ &= "+(hyp*hyp)+" - "+(ctx[2]*ctx[2])+" = "+(ctx[1]*ctx[1])+" \\\\ b &= "+ctx[1]+" \\end{aligned} \\] The answer is <b>"+ctx[1]+" "+unit+"</b>.",
    {hyp:hyp,known:ctx[2]});
  q.figure=u6TriSVG(ctx[2],ctx[1],fmt(ctx[2])+" "+unit,"?",fmt(hyp)+" "+unit);
  return q;
}, ["The ladder or wire is the hypotenuse, so subtract the square of the known leg from the square of the hypotenuse.", "Start by squaring the full length and the known distance."]);

E("u6-cr-guywire-form", 6, ["3.59","2.6"], 2, "gen", function(){
  var sc=u6Scaled(), h=sc[0], ground=sc[1], wire=sc[2];
  if(ri(0,1)){ var t=h; h=ground; ground=t; }
  var unit=pick(["m","ft"]);
  var ctx=pick([
    "An antenna mast is held by a wire "+wire+" "+unit+" long, anchored "+ground+" "+unit+" from the base of the mast.",
    "A flagpole is steadied by a cable "+wire+" "+unit+" long, anchored "+ground+" "+unit+" from the base of the pole.",
    "A young tree is supported by a rope "+wire+" "+unit+" long, staked "+ground+" "+unit+" from the trunk."]);
  var q=numq(ctx+" A technician uses the form \\(h = \\sqrt{c^2 - g^2}\\), where \\(c\\) is the wire length and \\(g\\) is the ground distance. What is the height, in "+unit+", where the wire meets the mast, pole or tree?",
    h, 0.1,
    "This form is the theorem rearranged, and it gives the same result as the standard form. \\[ \\begin{aligned} h &= \\sqrt{"+wire+"^2 - "+ground+"^2} \\\\ &= \\sqrt{"+(wire*wire)+" - "+(ground*ground)+"} = \\sqrt{"+(h*h)+"} = "+h+" \\end{aligned} \\] The answer is <b>"+h+" "+unit+"</b>.",
    {wire:wire,ground:ground});
  q.figure=u6TriSVG(ground,h,fmt(ground)+" "+unit,"?",fmt(wire)+" "+unit);
  return q;
}, ["The given form already isolates the height: substitute the wire length and ground distance into it.", "Start by squaring the wire length, then subtract the square of the ground distance."]);

E("u6-leg-solve-mc", 6, ["3.59","2.4"], 3, "gen", function(){
  var hyp=ri(12,42), leg=ri(4,hyp-4);
  var ans=u6R1(Math.sqrt(hyp*hyp-leg*leg));
  var unit=pick(["m","ft","cm"]);
  var ctxs=[
    ["A flagpole cable is "+hyp+" "+unit+" long and reaches a point "+leg+" "+unit+" up the pole. How far from the base of the pole is the cable anchored","the anchor distance"],
    ["A roof rafter measures "+hyp+" "+unit+" and the roof rise is "+leg+" "+unit+". What is the horizontal run of the rafter","the run"],
    ["A diagonal brace in a gate is "+hyp+" "+unit+" long and the gate is "+leg+" "+unit+" high. What is the width of the gate","the width"],
    ["A life line rope "+hyp+" "+unit+" long runs from a dock edge down to an anchor point "+leg+" "+unit+" below the surface line used for measuring. What is the horizontal offset of the anchor","the offset"]];
  var ctx=pick(ctxs);
  var pair=u6NOpts(ans,"Yes: rearrange the theorem, subtract the squares, and take the square root.",
    [[u6R1(Math.sqrt(hyp*hyp+leg*leg)),"That adds the squares, which finds a hypotenuse. The unknown here is a leg, so the squares are subtracted."],
     [hyp-leg,"That subtracts the lengths directly. The theorem subtracts the squares of the lengths."],
     [u6R1(hyp*hyp-leg*leg),"That is the squared value of the leg before the square root step. Take the square root to finish."],
     [u6R1(ans+2.4),"That overshoots the leg length. Recheck the square root of "+(hyp*hyp-leg*leg)+"."]],
    unit,1);
  var q=mcq(ctx[0]+", to the nearest tenth of a "+unit+"?",
    pair[0], pair[1],
    "The given sloped length is the hypotenuse, so the formula needs manipulation. \\[ \\begin{aligned} b^2 &= "+hyp+"^2 - "+leg+"^2 \\\\ &= "+(hyp*hyp)+" - "+(leg*leg)+" = "+(hyp*hyp-leg*leg)+" \\\\ b &= \\sqrt{"+(hyp*hyp-leg*leg)+"} \\approx "+fmtF(ans,1)+" \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+" "+unit+"</b>.",
    {hyp:hyp,leg:leg});
  q.figure=u6TriSVG(ans,leg,"?",fmt(leg)+" "+unit,fmt(hyp)+" "+unit);
  return q;
}, ["When the hypotenuse and one leg are known, the formula must be rearranged before substituting.", "Start by squaring the hypotenuse, since the known leg squared comes off that total."]);

E("u6-create-problem", 6, ["2.1","3.59"], 3, "gen", function(){
  var sc=u6Scaled(), a=sc[0], b=sc[1], c=sc[2];
  var unit=pick(["m","ft","cm"]);
  var frames=[
    ["A ramp has legs of "+a+" "+unit+" and "+b+" "+unit+"; find the length of the sloped surface.",
     "A board has legs of "+a+" "+unit+" and "+b+" "+unit+" meeting at a right angle; find the perimeter path along both legs.",
     "A square tile has side "+a+" "+unit+"; find the area of a triangle covering half the tile with height "+b+" "+unit+".",
     "A rope of "+c+" "+unit+" is one leg of a right triangle with another leg of "+a+" "+unit+"; find the hypotenuse."],
    ["A cable crosses a right triangular sail with legs "+a+" "+unit+" and "+b+" "+unit+"; find the length of the cable across the corner.",
     "A path follows two sides of a right triangular plot, "+a+" "+unit+" then "+b+" "+unit+"; find the total walking distance.",
     "A right triangular sign has base "+a+" "+unit+" and height "+b+" "+unit+"; find the area of the sign.",
     "A ladder of "+c+" "+unit+" is the hypotenuse with a leg of "+b+" "+unit+" known; find the length of the ladder."],
    ["A stringer has a rise of "+b+" "+unit+" and a run of "+a+" "+unit+"; find the length of the sloped stringer.",
     "A frame has two sides of "+a+" "+unit+" and "+b+" "+unit+" joined end to end; find their combined length.",
     "A right triangular garden has legs "+a+" "+unit+" and "+b+" "+unit+"; find the length of edging around all three sides.",
     "A wire of "+c+" "+unit+" forms one leg beside a leg of "+a+" "+unit+"; find the longest side of the triangle."]];
  var fr=pick(frames);
  var correct={t:fr[0], fb:"Yes: its two legs are "+a+" and "+b+", and the sloped length asked for is the hypotenuse, "+c+" "+unit+"."};
  var distractors=[
    {t:fr[1], fb:"That problem uses the legs directly, with addition or perimeter, so its solution is not the given equation."},
    {t:fr[2], fb:"That problem asks for an area, which uses multiplication and halving, not the sum of squares."},
    {t:fr[3], fb:"That problem places "+c+" "+unit+" as a leg or as a given length, so solving it would need a rearranged form, not the given equation."}];
  return mcq("A student is creating a problem whose solution is \\(c^2 = "+a+"^2 + "+b+"^2\\), giving \\(c = "+c+"\\). Which created problem matches that solution?",
    correct, distractors,
    "The equation squares two legs, adds, and the root gives the hypotenuse. \\[ \\begin{aligned} c^2 &= "+a+"^2 + "+b+"^2 = "+(a*a)+" + "+(b*b)+" = "+(c*c)+" \\\\ c &= "+c+" \\end{aligned} \\] Only the problem asking for a sloped length from the two legs matches. The answer is <b>the sloped length problem</b>.",
    {a:a,b:b,c:c});
}, ["Match each created problem to the operation its question really needs.", "Start by reading the given equation: it builds a hypotenuse from two legs."]);

E("u6-equivalent-forms", 6, ["2.6","2.4"], 3, "gen", function(){
  var sc=u6Scaled(), a=sc[0], b=sc[1], c=sc[2];
  var unit=pick(["m","cm","ft"]);
  if(ri(0,1)===0){
    var correct={t:"\\(b^2 = c^2 - a^2\\) and \\(a^2 = c^2 - b^2\\) are both rearrangements of \\(a^2 + b^2 = c^2\\)",
      fb:"Yes: each form moves one leg squared to the other side, which keeps the equation balanced."};
    var distractors=[
      {t:"\\(b^2 = c^2 + a^2\\) and \\(a^2 = c^2 + b^2\\) are both rearrangements of \\(a^2 + b^2 = c^2\\)",
       fb:"Those forms add the hypotenuse square instead of subtracting: moving a term across the equals sign changes its sign."},
      {t:"\\(b = c - a\\) and \\(a = c - b\\) are both rearrangements of \\(a^2 + b^2 = c^2\\)",
       fb:"Those forms drop the squares entirely. Lengths cannot be rearranged that way: squares are part of the relation."},
      {t:"\\(b^2 = a^2 - c^2\\) and \\(a^2 = b^2 - c^2\\) are both rearrangements of \\(a^2 + b^2 = c^2\\)",
       fb:"Those forms subtract the largest square from a smaller one, giving negative values: the hypotenuse square must be the starting total."}];
    return mcq("A right triangle has legs \\(a\\) and \\(b\\) and hypotenuse \\(c\\). Which statement correctly gives forms that are equivalent to \\(a^2 + b^2 = c^2\\)?",
      correct, distractors,
      "Moving \\(a^2\\) across the equals sign gives \\(b^2 = c^2 - a^2\\), and moving \\(b^2\\) gives \\(a^2 = c^2 - b^2\\). Each move keeps the equation balanced, so the forms say the same thing. The answer is <b>the two subtraction forms</b>.",
      {mode:"symbolic"});
  }
  var target=b*b;
  var correct2={t:"\\("+target+"\\), from \\(c^2 - a^2 = "+c+"^2 - "+a+"^2\\)",
    fb:"Yes: "+c+" squared minus "+a+" squared is "+(c*c)+" minus "+(a*a)+", which is "+target+", the square of the other leg."};
  var distractors2=[
    {t:"\\("+(c*c+a*a)+"\\), from \\(c^2 + a^2 = "+c+"^2 + "+a+"^2\\)", fb:"That adds the squares, which is the form for finding a hypotenuse, not for isolating a leg."},
    {t:"\\("+(c-a)*(c-a)+"\\), from \\((c - a)^2 = ("+c+" - "+a+")^2\\)", fb:"Subtracting the lengths and then squaring is a different operation from subtracting the squares."},
    {t:"\\("+(a*a-b*b>0?a*a-b*b:b*b)+"\\), from \\(a^2 - b^2 = "+a+"^2 - "+b+"^2\\)", fb:"That subtracts the two leg squares from each other. The leg form subtracts a leg square from the hypotenuse square."}];
  return mcq("A right triangle has legs of "+a+" "+unit+" and "+b+" "+unit+" and a hypotenuse of "+c+" "+unit+". A student verifies the form \\(b^2 = c^2 - a^2\\). What value should the student get for \\(b^2\\)?",
    correct2, distractors2,
    "\\[ \\begin{aligned} b^2 &= c^2 - a^2 \\\\ &= "+c+"^2 - "+a+"^2 = "+(c*c)+" - "+(a*a)+" = "+target+" \\end{aligned} \\] This matches \\("+b+"^2 = "+target+"\\) from the standard form, which verifies the two forms agree. The answer is <b>"+target+"</b>.",
    {a:a,b:b,c:c,mode:"numeric"});
}, ["Equivalent forms come from moving a squared term across the equals sign and changing its sign.", "Start from the standard form and move one leg squared to the hypotenuse side."]);

E("u6-cr-shortcut-saving", 6, ["2.1","3.59"], 3, "gen", function(){
  var w=ri(9,32), l=ri(9,32);
  var diag=Math.sqrt(w*w+l*l), ans=u6R1(w+l-diag);
  var unit=pick(["m","ft"]);
  var ctx=pick([
    "A rectangular park measures "+l+" "+unit+" by "+w+" "+unit+". A path follows two edges from one corner to the opposite corner, but a straight trail crosses the park diagonally.",
    "A rectangular field measures "+l+" "+unit+" by "+w+" "+unit+". A worker walks two edges from one corner to the opposite corner, or can cut straight across.",
    "A rectangular lot measures "+l+" "+unit+" by "+w+" "+unit+". A cable can run along two edges from one corner to the opposite corner, or straight across the lot."]);
  var q=numq(ctx+" How much distance, in "+unit+", does the straight diagonal route save compared with following the two edges? Give your answer to the nearest tenth.",
    ans, 0.2,
    "First find the diagonal, then compare the two routes. \\[ \\begin{aligned} d &= \\sqrt{"+l+"^2 + "+w+"^2} = \\sqrt{"+(l*l+w*w)+"} \\approx "+fmtF(u6R1(diag),1)+" \\\\ \\text{saving} &= ("+l+" + "+w+") - "+fmtF(u6R1(diag),1)+" \\approx "+fmtF(ans,1)+" \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+" "+unit+"</b>.",
    {w:w,l:l});
  q.figure=m12RectDiagSVG(l,w,fmt(l)+" "+unit,fmt(w)+" "+unit,"diagonal");
  return q;
}, ["This is a two step problem: find the diagonal first, then compare it with the route along the edges.", "Start by treating the diagonal as the hypotenuse of the rectangle triangle."]);

E("u6-cr-frame-diff", 6, ["3.58","3.56"], 3, "gen", function(){
  var p=ri(35,85), q=ri(35,85);
  var exact=Math.sqrt(p*p+q*q), rounded=u6R1(exact);
  var delta=pick([-6,-5,-4,4,5,6]);
  var measured=Math.round(exact)+delta;
  var ans=u6R1(Math.abs(measured-rounded));
  var ctx=pick([
    "A rectangular door frame has sides of "+p+" cm and "+q+" cm. A carpenter measures one diagonal as "+measured+" cm while checking whether the frame is a true rectangle.",
    "A rectangular window frame has sides of "+p+" cm and "+q+" cm. A glazier measures one diagonal as "+measured+" cm while checking whether the frame is a true rectangle.",
    "A rectangular picture frame has sides of "+p+" cm and "+q+" cm. A framer measures one diagonal as "+measured+" cm while checking whether the frame is a true rectangle."]);
  var qq=numq(ctx+" By how many centimetres does the measured diagonal differ from the diagonal a true rectangle with these sides would have? Give your answer to the nearest tenth.",
    ans, 0.25,
    "A true rectangle would have the diagonal given by the theorem. \\[ \\begin{aligned} d &= \\sqrt{"+p+"^2 + "+q+"^2} = \\sqrt{"+(p*p+q*q)+"} \\approx "+fmtF(rounded,1)+" \\\\ \\text{difference} &= |"+measured+" - "+fmtF(rounded,1)+"| \\approx "+fmtF(ans,1)+" \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+" cm</b>.",
    {p:p,q:q,measured:measured});
  qq.figure=m12RectDiagSVG(p,q,fmt(p)+" cm",fmt(q)+" cm",fmt(measured)+" cm");
  return qq;
}, ["Work out the diagonal the frame should have, then compare the measurement with it.", "Start by squaring the two frame sides and adding the squares."]);

/* ----- bank-u7.js ----- */
// Math 1202 Unit 7 Trigonometry question bank
// Figures (added Nov 2026): similar triangle pairs, shadow and
// elevation or depression scenes and plain right triangles draw
// labelled figures from each question's own values. The situation
// identification entry (u7-indirect-measurement) and the
// reasonableness entry (u7-reasonable-or-not) stay figureless:
// one asks which situation fits and the other judges reported
// values, and several of its modes give no drawable setup.
// Cut verbatim from the standalone bank source
// (math-1202-review/bank-src.js, lines 3767 to 4284).
// CRMARKS: u7-cr-similar-side=2
// CRMARKS: u7-cr-tangent-height=2
// CRMARKS: u7-cr-find-angle=2
// CRMARKS: u7-cr-similar-perimeter-draw=3
// CRMARKS: u7-cr-hypotenuse-rearrange=3
// CRMARKS: u7-cr-shadow-problem=3
// CRMARKS: u7-cr-building-eye-level=2
// CRMARKS: u7-cr-depression-distance=3
/* ===== Unit 7 ===== */
// Unit 7: Trigonometry (Mathematics 1202)
// Similarity first, then tangent, sine and cosine, then unknown angles.
function u7Ang(){ return pick([26,28,30,32,35,38,40,42,48,50,55,58,60,62,65]); }
function u7Rad(d){ return d*Math.PI/180; }
function u7Triple(){ var m=ri(2,6); var n=ri(1,m-1); var a=m*m-n*n; var b=2*m*n; var c=m*m+n*n; if(Math.random()<0.5){ var t=a; a=b; b=t; } return [a,b,c]; }
function u7Txt(x,y,str,size,anchor){ return '<text x="'+fmt(x,1)+'" y="'+fmt(y,1)+'" font-size="'+(size||13)+'" fill="'+FIG_INK+'" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="'+(anchor||"middle")+'" dominant-baseline="central">'+str+'</text>'; }
function u7FigTri(oL,aL,hL,angL){
  var s='<svg viewBox="0 0 280 200" width="280" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Right triangle diagram">';
  s+='<polygon points="55,50 55,165 245,165" fill="'+FIG_SHADE+'" fill-opacity="0.30" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<path d="M 67 165 L 67 153 L 55 153" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+='<path d="M 219 165 A 26 26 0 0 1 228 154" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+=u7Txt(24,108,oL,13); s+=u7Txt(150,185,aL,13); s+=u7Txt(163,92,hL,13); s+=u7Txt(200,150,angL,13);
  return s+'</svg>';
}
function u7FigPair(w1,h1,t1,w2,h2,t2){
  var u1=88/Math.max(w1,h1), u2=88/Math.max(w2,h2);
  var s='<svg viewBox="0 0 300 180" width="300" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two rectangles diagram">';
  s+='<rect x="30" y="'+fmt(135-h1*u1,1)+'" width="'+fmt(w1*u1,1)+'" height="'+fmt(h1*u1,1)+'" fill="'+FIG_SHADE+'" fill-opacity="0.30" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<rect x="175" y="'+fmt(135-h2*u2,1)+'" width="'+fmt(w2*u2,1)+'" height="'+fmt(h2*u2,1)+'" fill="'+FIG_SHADE+'" fill-opacity="0.30" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+=u7Txt(30+w1*u1/2,155,t1,12); s+=u7Txt(175+w2*u2/2,155,t2,12);
  return s+'</svg>';
}

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

/* ---------------- Level 1 ---------------- */

E("u7-similar-check", 7, ["3.60","3.63"], 1, "gen", function(){
  var w=ri(2,9), h=ri(2,8), k=pick([2,3]), similar=Math.random()<0.5, w2, h2, tries=0;
  if(similar){ w2=w*k; h2=h*k; } else { w2=w*k; h2=h*k+ri(1,3); }
  var prompt="Rectangle A is "+w+" cm wide and "+h+" cm high. Rectangle B is "+w2+" cm wide and "+h2+" cm high. Are the two rectangles similar?";
  var sol="Compare the ratios of corresponding sides. Widths: \\("+w2+" \\div "+w+" = "+fmt(w2/w)+"\\). Heights: \\("+h2+" \\div "+h+" = "+fmt(h2/h)+"\\) . ";
  var q;
  if(similar){
    sol+="The ratios are equal and all angles are right angles, so the rectangles are <b>similar</b>.";
    q=mcq(prompt, {t:"Yes. The corresponding sides are in the same ratio and the angles are equal.", fb:"Correct: both side ratios equal "+fmt(k)+", and rectangles have equal corresponding angles."},
      [ {t:"No. The corresponding sides are not in the same ratio.", fb:"Check again: "+w2+" / "+w+" and "+h2+" / "+h+" both equal "+fmt(k)+"."},
        {t:"No. Rectangle B is larger, so the two cannot be similar.", fb:"Size does not rule out similarity: an enlargement of a shape is similar to it."},
        {t:"Yes. Any two rectangles are similar because all their angles are right angles.", fb:"Equal angles alone are not enough reasoning here: the side ratios must also match, and in this case they do."} ], sol, {mode:"similar"});
  } else {
    sol+="The ratios differ, so the rectangles are <b>not similar</b>.";
    q=mcq(prompt, {t:"No. The corresponding sides are not in the same ratio.", fb:"Correct: the width ratio is "+fmt(w2/w)+" but the height ratio is "+fmt(h2/h)+"."},
      [ {t:"Yes. The corresponding sides are in the same ratio and the angles are equal.", fb:"The angles are equal, but the side ratios are not: "+fmt(w2/w)+" versus "+fmt(h2/h)+"."},
        {t:"Yes. Any two rectangles are similar because all their angles are right angles.", fb:"Equal angles are not enough: corresponding sides must also be in the same ratio, and here they are not."},
        {t:"No. Rectangle B is larger, so size alone rules out similarity.", fb:"The verdict is right but the reason is wrong: larger shapes can be similar. The side ratios are what fail here."} ], sol, {mode:"notsimilar"});
  }
  q.figure=u7FigPair(w,h,"A: "+w+" by "+h, w2,h2,"B: "+w2+" by "+h2);
  return q;
}, ["Similar shapes need equal corresponding angles and corresponding sides in the same ratio.", "Divide the width of B by the width of A, then do the same for the heights, and compare."]);

E("u7-shared-angle-similar", 7, ["3.61"], 1, "var", varset([
  function(){ var q=mcq("Two right triangles both have an acute angle of \\(35^\\circ\\). Why must the two triangles be similar?",
    {t:"Each has angles of 90, 35 and 55 degrees, so their angles match and the angle-angle rule applies.", fb:"Correct: the third angle is 180 - 90 - 35 = 55 degrees in both."},
    [ {t:"Their hypotenuses must be exactly the same length in both triangles, or they cannot match.", fb:"Similar triangles can be different sizes: the hypotenuse does not need to match."},
      {t:"All right triangles are automatically similar to each other, no matter what their acute angles measure.", fb:"Two right triangles with different acute angles, such as 20 degrees and 50 degrees, are not similar."},
      {t:"Their corresponding sides must all be equal in length, side for side, top to bottom.", fb:"Equal sides would make them congruent, not just similar. Similarity needs equal angles and proportional sides."} ],
    "Each triangle has a \\(90^\\circ\\) angle and the shared \\(35^\\circ\\) angle, so the third angle is \\(180 - 90 - 35 = 55^\\circ\\) in both. Matching angles mean the triangles are <b>similar</b>.", {v:1}); q.figure=u7FigTriPair({o:35,a:50,oL:"",aL:"",hL:"",angL:"35\u00B0",tL:"?"},{o:52,a:75,oL:"",aL:"",hL:"",angL:"35\u00B0",tL:"?"}); return q; },
  function(){ var q=mcq("Triangle P has angles \\(90^\\circ\\) and \\(40^\\circ\\). Triangle Q is a right triangle with an acute angle of \\(40^\\circ\\). Why are P and Q similar?",
    {t:"They share a right angle and a 40 degree angle, so all their angles match.", fb:"Correct: two matching angles are enough to show similarity."},
    [ {t:"They are similar because both are right triangles, and that is the only condition.", fb:"Being right triangles is not enough on its own: the shared 40 degree angle is also needed."},
      {t:"They are similar because their areas must be equal in both triangles.", fb:"Similar triangles can have very different areas when one is an enlargement of the other."},
      {t:"They are similar because each of them has exactly three sides and three angles.", fb:"Every triangle has three sides: similarity is about matching angles and proportional sides."} ],
    "Both triangles have a \\(90^\\circ\\) angle and a \\(40^\\circ\\) angle, so the third angles also match. The triangles are <b>similar</b> by the angle-angle rule.", {v:2}); q.figure=u7FigTriPair({o:42,a:50,oL:"",aL:"",hL:"",angL:"40\u00B0",tL:"?"},{o:63,a:75,oL:"",aL:"",hL:"",angL:"40\u00B0",tL:"?"}); return q; },
  function(){ var q=mcq("A small triangular ramp and a large triangular ramp are both right triangles, and each rises at an angle of \\(28^\\circ\\) to the ground. Which statement is true?",
    {t:"The ramps are similar because they share a right angle and the 28 degree angle.", fb:"Correct: shared right angle plus shared acute angle means all angles match."},
    [ {t:"The ramps cannot be similar because one ramp is much bigger than the other one.", fb:"An enlargement is similar to the original: size alone never rules out similarity."},
      {t:"The ramps are similar only if their hypotenuses are exactly equal.", fb:"Equal hypotenuses would be congruence. Similarity allows different sizes."},
      {t:"Nothing at all can be concluded, because only one angle is shared between them.", fb:"Two angles are shared: the right angle and the 28 degree angle. That is enough."} ],
    "Both ramps have angles of \\(90^\\circ\\) and \\(28^\\circ\\), so their third angles are both \\(62^\\circ\\). The ramps are <b>similar</b>.", {v:3}); q.figure=u7FigTriPair({o:27,a:50,oL:"",aL:"",hL:"",angL:"28\u00B0",tL:"?"},{o:40,a:75,oL:"",aL:"",hL:"",angL:"28\u00B0",tL:"?"}); return q; },
  function(){ return mcq("Which pair of triangles must be similar?",
    {t:"Two right triangles that share an acute angle of 52 degrees.", fb:"Correct: right angle plus shared acute angle gives matching angles in both."},
    [ {t:"Two right triangles, one at 30 degrees and one at 45 degrees.", fb:"Their acute angles differ, so their angle sets do not match."},
      {t:"A right triangle and an isosceles triangle with no right angle.", fb:"One has a right angle and the other does not, so the angles cannot all match."},
      {t:"Two triangles that happen to have exactly the same perimeter.", fb:"Equal perimeters say nothing about angles: the shapes can be very different."} ],
    "The first pair shares a \\(90^\\circ\\) angle and a \\(52^\\circ\\) angle, so all angles match and the pair <b>must be similar</b>. The other pairs have mismatched angles or no angle information.", {v:4}); },
  function(){ var q=mcq("In a right triangle, one acute angle is \\(63^\\circ\\). A second right triangle has an acute angle of \\(63^\\circ\\) as well. What is the third angle in each triangle, and what does that show?",
    {t:"27 degrees in each, so the triangles have the same three angles and are similar.", fb:"Correct: 180 - 90 - 63 = 27 degrees, and matching angles mean similar."},
    [ {t:"63 degrees in each, so the two triangles are congruent to each other in every way.", fb:"The third angle is 180 - 90 - 63 = 27 degrees, not 63, and similarity does not need equal size."},
      {t:"117 degrees in each, so the two triangles are similar to each other.", fb:"Angles in a triangle sum to 180 degrees: 90 + 63 + 117 would be far too much."},
      {t:"It cannot be found from the angles without knowing the side lengths as well.", fb:"Side lengths are not needed: the angle sum of a triangle gives the third angle directly."} ],
    "\\[ 180 - 90 - 63 = 27 \\] The third angle is \\(27^\\circ\\) in each triangle, so the angle sets match and the triangles are <b>similar</b>.", {v:5}); q.figure=u7FigTriPair({o:98,a:50,oL:"",aL:"",hL:"",angL:"63\u00B0",tL:"?"},{o:118,a:60,oL:"",aL:"",hL:"",angL:"63\u00B0",tL:"?"}); return q; }
]), ["Matching angles are the key to similarity.", "List the angles of each triangle: both have a right angle and the shared acute angle."]);

E("u7-tangent-ratio-constant", 7, ["5.1","3.61"], 1, "gen", function(){
  var o=ri(2,14), a=ri(2,14), tries=0;
  while(o===a && tries<20){ a=ri(2,14); tries++; } if(o===a) a=o+1;
  var k=pick([2,3,4]), o2=o*k, a2=a*k, hyp=Math.sqrt(o*o+a*a);
  var r=o/a;
  var prompt="Two right triangles share the acute angle A. The smaller triangle has opposite side "+o+" cm and adjacent side "+a+" cm. The larger triangle has opposite side "+o2+" cm and adjacent side "+a2+" cm. What is the ratio opposite / adjacent for angle A?";
  var sol="Smaller triangle: \\("+o+" \\div "+a+" = "+fmtF(r,2)+ "\\). Larger triangle: \\("+o2+" \\div "+a2+" = "+fmtF(r,2)+ "\\). The ratio is the same in both triangles, and this ratio is the tangent ratio: \\(\\tan A = "+FR("opposite","adjacent")+"\\). The answer is <b>"+fmtF(r,2)+"</b>.";
  var q=mcq(prompt, {t:fmtF(r,2), fb:"Correct: "+o+" / "+a+" and "+o2+" / "+a2+" both simplify to this value."},
    [ {t:fmtF(a/o,2), fb:"That is adjacent / opposite, the ratio turned upside down."},
      {t:fmtF(o/hyp,2), fb:"That is opposite / hypotenuse, which is the sine ratio, not the ratio asked for."},
      {t:fmtF(a/hyp,2), fb:"That is adjacent / hypotenuse, which is the cosine ratio, not opposite / adjacent."} ], sol, {o:o,a:a,k:k});
  q.figure=u7FigTri(o+" cm", a+" cm", "hypotenuse", "A");
  return q;
}, ["The tangent ratio compares the opposite side to the adjacent side for the marked angle.", "Work out opposite divided by adjacent for the smaller triangle first."]);

E("u7-sine-ratio-constant", 7, ["5.2"], 1, "gen", function(){
  var tr=u7Triple(), o=tr[0], a=tr[1], h=tr[2], k=pick([2,3]), o2=o*k, h2=h*k, r=o/h;
  var prompt="Two right triangles share the acute angle A. The smaller triangle has opposite side "+o+" cm and hypotenuse "+h+" cm. The larger triangle has opposite side "+o2+" cm and hypotenuse "+h2+" cm. What is the ratio opposite / hypotenuse for angle A?";
  var sol="Smaller triangle: \\("+o+" \\div "+h+" = "+fmtF(r,2)+ "\\). Larger triangle: \\("+o2+" \\div "+h2+" = "+fmtF(r,2)+ "\\). The ratio is the same in both triangles, and this ratio is the sine ratio: \\(\\sin A = "+FR("opposite","hypotenuse")+"\\). The answer is <b>"+fmtF(r,2)+"</b>.";
  var q=mcq(prompt, {t:fmtF(r,2), fb:"Correct: "+o+" / "+h+" and "+o2+" / "+h2+" both give this value."},
    [ {t:fmtF(h/o,2), fb:"That is hypotenuse / opposite, the ratio turned upside down. A sine value cannot be greater than 1."},
      {t:fmtF(a/h,2), fb:"That is adjacent / hypotenuse, which is the cosine ratio, not opposite / hypotenuse."},
      {t:fmtF(o/a,2), fb:"That is opposite / adjacent, which is the tangent ratio, not opposite / hypotenuse."} ], sol, {o:o,h:h,k:k});
  q.figure=u7FigTriPair({o:o,a:a,oL:o+" cm",aL:"",hL:h+" cm",angL:"A"},{o:o2,a:a*k,oL:o2+" cm",aL:"",hL:h2+" cm",angL:"A"});
  return q;
}, ["The sine ratio compares the opposite side to the hypotenuse for the marked angle.", "Work out opposite divided by hypotenuse for the smaller triangle first."]);

E("u7-cosine-ratio-constant", 7, ["5.3"], 1, "gen", function(){
  var tr=u7Triple(), o=tr[0], a=tr[1], h=tr[2], k=pick([2,3]), a2=a*k, h2=h*k, r=a/h;
  var prompt="Two right triangles share the acute angle A. The smaller triangle has adjacent side "+a+" cm and hypotenuse "+h+" cm. The larger triangle has adjacent side "+a2+" cm and hypotenuse "+h2+" cm. What is the ratio adjacent / hypotenuse for angle A?";
  var sol="Smaller triangle: \\("+a+" \\div "+h+" = "+fmtF(r,2)+ "\\). Larger triangle: \\("+a2+" \\div "+h2+" = "+fmtF(r,2)+ "\\). The ratio is the same in both triangles, and this ratio is the cosine ratio: \\(\\cos A = "+FR("adjacent","hypotenuse")+"\\). The answer is <b>"+fmtF(r,2)+"</b>.";
  var q=mcq(prompt, {t:fmtF(r,2), fb:"Correct: "+a+" / "+h+" and "+a2+" / "+h2+" both give this value."},
    [ {t:fmtF(h/a,2), fb:"That is hypotenuse / adjacent, the ratio turned upside down. A cosine value cannot be greater than 1."},
      {t:fmtF(o/h,2), fb:"That is opposite / hypotenuse, which is the sine ratio, not adjacent / hypotenuse."},
      {t:fmtF(a/o,2), fb:"That is adjacent / opposite, which is not one of the three primary ratios for this pairing."} ], sol, {a:a,h:h,k:k});
  q.figure=u7FigTriPair({o:o,a:a,oL:"",aL:a+" cm",hL:h+" cm",angL:"A"},{o:o*k,a:a2,oL:"",aL:a2+" cm",hL:h2+" cm",angL:"A"});
  return q;
}, ["The cosine ratio compares the adjacent side to the hypotenuse for the marked angle.", "Work out adjacent divided by hypotenuse for the smaller triangle first."]);

E("u7-choose-ratio", 7, ["5.5","2.3"], 1, "gen", function(){
  var combos=[
    {known:"opposite", wanted:"adjacent", ratio:"tangent", def:"tangent: opposite / adjacent"},
    {known:"adjacent", wanted:"opposite", ratio:"tangent", def:"tangent: opposite / adjacent"},
    {known:"opposite", wanted:"hypotenuse", ratio:"sine", def:"sine: opposite / hypotenuse"},
    {known:"hypotenuse", wanted:"opposite", ratio:"sine", def:"sine: opposite / hypotenuse"},
    {known:"adjacent", wanted:"hypotenuse", ratio:"cosine", def:"cosine: adjacent / hypotenuse"},
    {known:"hypotenuse", wanted:"adjacent", ratio:"cosine", def:"cosine: adjacent / hypotenuse"} ];
  var c=pick(combos), ang=u7Ang(), val=ri(4,30);
  var ctx=pick(["a ladder against a wall","a roof section","a loading ramp","a guy wire on a pole","a wheelchair ramp","a stair stringer"]);
  var prompt="A right triangle models "+ctx+". The marked angle is \\("+ang+"^\\circ\\). The "+c.known+" side is known (it measures "+val+" units) and the "+c.wanted+" side is wanted. Which ratio should be used?";
  var defs={ tangent:"tangent: opposite / adjacent", sine:"sine: opposite / hypotenuse", cosine:"cosine: adjacent / hypotenuse" };
  var names=["tangent","sine","cosine"];
  var distract=names.filter(function(n){ return n!==c.ratio; }).map(function(n){ return {t:defs[n], fb:"The "+n+" ratio uses the "+(n==="tangent"?"opposite and adjacent":(n==="sine"?"opposite and hypotenuse":"adjacent and hypotenuse"))+" sides, which is not the known and wanted pair here."}; });
  var recip={ tangent:"adjacent / opposite", sine:"hypotenuse / opposite", cosine:"hypotenuse / adjacent" };
  distract.push({t:c.ratio+" flipped: "+recip[c.ratio], fb:"That is the "+c.ratio+" ratio with its two sides swapped. The ratio must pair the sides as "+defs[c.ratio].split(": ")[1]+"."});
  var sol="The known side is the "+c.known+" and the wanted side is the "+c.wanted+". The ratio that uses exactly those two sides is the <b>"+c.ratio+" ratio</b>: "+defs[c.ratio]+".";
  var q=mcq(prompt, {t:defs[c.ratio], fb:"Correct: the "+c.ratio+" ratio is the one built from the "+c.known+" and "+c.wanted+" sides."}, distract, sol, {ratio:c.ratio, ang:ang});
  var lab={ opposite:"opp", adjacent:"adj", hypotenuse:"hyp" };
  var oL=c.known==="opposite"?val:(c.wanted==="opposite"?"?":"opp"), aL=c.known==="adjacent"?val:(c.wanted==="adjacent"?"?":"adj"), hL=c.known==="hypotenuse"?val:(c.wanted==="hypotenuse"?"?":"hyp");
  q.figure=u7FigTri(oL, aL, hL, ang+" deg");
  return q;
}, ["Name the known and wanted sides relative to the marked angle first.", "Pick the ratio whose definition uses exactly those two sides."]);

/* ---------------- Level 2: multiple choice ---------------- */

E("u7-why-not-similar", 7, ["3.63","3.60"], 2, "gen", function(){
  var w=ri(3,10), h=ri(2,Math.max(2,w-1)), k=pick([2,3]), extra=ri(1,3), w2=w*k, h2=h*k+extra;
  var prompt="Rectangle A is "+w+" cm by "+h+" cm. Rectangle B is "+w2+" cm by "+h2+" cm. Why are the two rectangles not similar?";
  var sol="Widths: \\("+w2+" \\div "+w+" = "+fmt(w2/w)+"\\). Heights: \\("+h2+" \\div "+h+" = "+fmtF(h2/h,2)+ "\\). Corresponding sides of similar polygons must be in the <b>same ratio</b>, and these ratios differ, so the rectangles are not similar.";
  var q=mcq(prompt, {t:"The width ratio is "+fmt(w2/w)+" but the height ratio is "+fmtF(h2/h,2)+", so corresponding sides are not in the same ratio.", fb:"Correct: similarity needs one common ratio for every pair of corresponding sides."},
    [ {t:"They are similar, because all the angles in both rectangles are right angles, and the two shapes match in form.", fb:"Equal angles alone do not settle it: the corresponding side ratios also have to match, and they do not."},
      {t:"They are not similar simply because rectangle B is bigger than rectangle A in both directions.", fb:"Bigger shapes can still be similar: an enlargement keeps the same ratios. The problem here is the mismatched ratios."},
      {t:"They are similar, because both shapes are rectangles with four sides and four right angles.", fb:"Having the same type of shape is not enough: corresponding sides must be proportional."} ], sol, {w:w,h:h,k:k});
  q.figure=u7FigPair(w,h,"A: "+w+" by "+h, w2,h2,"B: "+w2+" by "+h2);
  return q;
}, ["Check each pair of corresponding sides separately.", "Divide B's width by A's width, then B's height by A's height, and compare the two ratios."]);

E("u7-corresponding-sides", 7, ["3.62"], 2, "gen", function(){
  var k=pick([2,3,4]), a1=ri(3,12), a2=ri(3,12), b1=a1*k, b2=a2*k, fromB=Math.random()<0.5;
  var prompt="Polygons A and B are similar. In polygon A, two sides measure "+a1+" cm and "+a2+" cm. The corresponding sides in polygon B measure "+b1+" cm and "+b2+" cm. What is the scale factor "+(fromB?"from B to A":"from A to B")+"?";
  var ans=fromB?1/k:k;
  var sol="Each B side divided by the matching A side gives the same value: \\("+b1+" \\div "+a1+" = "+k+"\\) and \\("+b2+" \\div "+a2+" = "+k+"\\). "+(fromB?"Going from B back to A uses the reciprocal, \\(1 \\div "+k+" = "+fmtF(1/k,2)+ "\\).":"")+" The scale factor is <b>"+fmtF(ans,2)+"</b>.";
  var opts=[ {t:fmtF(fromB?k:1/k,2), fb:"That is the scale factor in the opposite direction."},
             {t:String(b1-a1), fb:"That is the difference between the sides. A scale factor is a ratio, found by dividing, not subtracting."},
             {t:fmtF(k+0.5,2), fb:"Check the division: "+b1+" divided by "+a1+" is "+k+", not "+fmtF(k+0.5,2)+"."} ];
  var _bo0=balOpts({t:fmtF(ans,2), fb:"Correct: corresponding sides of similar polygons are all in the one ratio."}, opts); var q=mcq(prompt, _bo0[0], _bo0[1], sol, {k:k, fromB:fromB}); q.figure=u7FigPair(a1,a2,"A: "+a1+" and "+a2, b1,b2,"B: "+b1+" and "+b2); return q;
}, ["Corresponding sides of similar polygons are all in the same ratio.", "Divide a B side by its matching A side, then check the direction the question asks for."]);

E("u7-similar-missing-side-mc", 7, ["3.64"], 2, "gen", function(){
  var ctxs=[ {n:"a photo enlargement", u:"cm"}, {n:"a model of a fishing stage", u:"cm"}, {n:"a blueprint of a shed", u:"cm"}, {n:"a trail map drawing", u:"cm"}, {n:"a scaled drawing of a wharf", u:"cm"} ];
  var c=pick(ctxs), k=pick([2,3]), a=ri(2,10), b=a*k, s=ri(3,15), x=s*k;
  var prompt="In "+c.n+", the small figure and the large figure are similar. A side of "+a+" "+c.u+" on the small figure matches a side of "+b+" "+c.u+" on the large figure. Another side of the small figure measures "+s+" "+c.u+". What is the matching side length on the large figure, in "+c.u+"?";
  var sol="The scale factor is \\("+b+" \\div "+a+" = "+k+"\\), so multiply the small side by the same factor: \\[ "+s+" \\times "+k+" = "+x+" \\] The matching side is <b>"+x+" "+c.u+"</b>.";
  var _bo0=balOpts({t:String(x), fb:"Correct: scale factor "+k+" applied to "+s+" gives "+x+"."}, [ {t:String(s+(b-a)), fb:"That adds the difference of the known pair. Similarity scales by multiplying, not by adding."},
      {t:fmtF(s/k,2), fb:"That divides by the scale factor, which is the direction for going from large back to small."},
      {t:String(s+k), fb:"That adds the scale factor to the side. The scale factor multiplies the side instead."} ]); var q=mcq(prompt, _bo0[0], _bo0[1], sol, {k:k,s:s});
  q.figure=u7FigPair(a,s,"small: "+a+" and "+s, b,x,"large: "+b+" and ?");
  return q;
}, ["Find the scale factor from the pair of sides you know first.", "Divide the large known side by the small known side, then multiply the other small side by that factor."]);

E("u7-draw-similar-image", 7, ["3.65","3.62"], 2, "gen", function(){
  var reduce=Math.random()<0.4, w, h, k, kw, kh;
  if(reduce){ w=2*ri(3,7); h=2*ri(2,6); k=0.5; } else { w=ri(4,12); h=ri(3,9); k=pick([2,3]); }
  kw=w*k; kh=h*k;
  var prompt="A rectangle is "+w+" cm wide and "+h+" cm high. A student draws a rectangle similar to it using a scale factor of "+fmt(k)+". What are the side lengths of the drawing?";
  var sol="Multiply each side by the scale factor: \\[ "+w+" \\times "+fmt(k)+" = "+fmt(kw)+" \\qquad "+h+" \\times "+fmt(k)+" = "+fmt(kh)+" \\] The drawing is <b>"+fmt(kw)+" cm by "+fmt(kh)+" cm</b>. Every side is scaled by the same factor, so the drawing is similar to the original.";
  var q=mcq(prompt, {t:fmt(kw)+" cm by "+fmt(kh)+" cm", fb:"Correct: both sides were multiplied by "+fmt(k)+"."},
    [ {t:fmt(w+k)+" cm by "+fmt(h+k)+" cm", fb:"That adds the scale factor to each side. Scaling means multiplying each side."},
      {t:fmt(kw)+" cm by "+fmt(h)+" cm", fb:"Only the width was scaled there. Every side must be multiplied by the scale factor."},
      {t:fmt(w/k)+" cm by "+fmt(h/k)+" cm", fb:"That scales in the wrong direction: it uses division by "+fmt(k)+" instead of multiplication."} ], sol, {k:k,w:w,h:h});
  q.figure=u7FigPair(w,h,"original: "+w+" by "+h, kw,kh,"drawing: ? by ?");
  return q;
}, ["A similar drawing scales every side by the same factor.", "Multiply the width by the scale factor, then multiply the height by the same factor."]);

E("u7-indirect-measurement", 7, ["5.4"], 2, "var", varset([
  function(){ return mcq("Which situation uses trigonometric ratios for indirect measurement?",
    {t:"Finding the height of a flagpole from its distance away and the angle of elevation to the top.", fb:"Correct: the height cannot be taped directly, so a ratio and an angle give it indirectly."},
    [ {t:"Measuring the length of a classroom directly with a tape measure stretched along the classroom floor.", fb:"That is direct measurement: the tape touches the length being measured."},
      {t:"Weighing a bag of flour on a kitchen scale sitting on the counter in the kitchen.", fb:"That measures mass directly and uses no angle or ratio of sides."},
      {t:"Reading the temperature of a pot of soup with a thermometer dipped into it.", fb:"That is a direct reading and involves no triangle or ratio."} ],
    "The flagpole height is found from a measured distance and an angle, without measuring the height itself. That is <b>indirect measurement</b> using a trigonometric ratio.", {v:1}); },
  function(){ return mcq("Which situation uses trigonometric ratios for indirect measurement?",
    {t:"Finding the width of a river by measuring an angle and a distance along the near bank.", fb:"Correct: nobody crosses the river with a tape; the width comes from a right triangle model."},
    [ {t:"Measuring the width of a doorway with a folding ruler held across the opening.", fb:"That is direct measurement of an reachable length."},
      {t:"Timing how long a kettle takes to boil from cold on the stove with a kitchen timer.", fb:"That measures time directly and uses no triangle."},
      {t:"Counting the tiles one by one along the whole edge of a tiled floor in the hallway at school.", fb:"Counting tiles is a direct count, not a ratio calculation."} ],
    "The river width is calculated from an angle and a bank side distance in a right triangle model. That is <b>indirect measurement</b>.", {v:2}); },
  function(){ return mcq("Which situation uses trigonometric ratios for indirect measurement?",
    {t:"Finding the height of a lighthouse from a boat using the angle of elevation to its top.", fb:"Correct: the height is worked out from the angle and the distance, not measured directly."},
    [ {t:"Measuring the height of a door frame with a tape measure held straight beside the frame.", fb:"The tape reaches the height, so that is direct measurement."},
      {t:"Checking the full length of a hockey stick against a marked line on the bench.", fb:"Comparing against a mark is direct measurement."},
      {t:"Measuring a jug of water by pouring it into a measuring cup on the counter.", fb:"That measures volume directly and uses no angle."} ],
    "From the boat, the lighthouse height comes from an angle and a distance in a right triangle. That is <b>indirect measurement</b> using a trigonometric ratio.", {v:3}); },
  function(){ return mcq("Which situation uses trigonometric ratios for indirect measurement?",
    {t:"Finding how far a boat is from the base of a cliff using the angle of depression from the top.", fb:"Correct: the distance across the water is calculated, not measured with a tape."},
    [ {t:"Measuring the full deck of a stage by rolling a measuring wheel slowly across its boards, end to end.", fb:"The wheel rolls along the deck, so that is direct measurement."},
      {t:"Weighing a suitcase of luggage on a bathroom scale sitting on the floor at home.", fb:"That is a direct mass reading with no triangle involved."},
      {t:"Reading the speed of a moving car on its speedometer dial as it drives along.", fb:"That is a direct instrument reading, not a ratio of triangle sides."} ],
    "The angle of depression and the cliff height form a right triangle that gives the distance indirectly. That is <b>indirect measurement</b>.", {v:4}); },
  function(){ return mcq("Which situation uses trigonometric ratios for indirect measurement?",
    {t:"Finding the height of a church steeple by standing back a measured distance and measuring the angle up to its tip.", fb:"Correct: the steeple height is calculated from the angle and the ground distance."},
    [ {t:"Measuring the height of a wooden fence panel with a tape measure before installing it in the back yard fence at home.", fb:"The panel can be taped directly before it goes up."},
      {t:"Measuring the rain water collected in a rain gauge set out in the garden after a full night of heavy rain.", fb:"That is a direct reading of depth in a marked tube."},
      {t:"Timing a full bus trip across town with the stopwatch app on a phone, from the first stop to the last.", fb:"That measures time directly and uses no ratio."} ],
    "The steeple is too tall to tape, so its height is found from a ground distance and an angle. That is <b>indirect measurement</b>.", {v:5}); },
  function(){ return mcq("Which situation uses trigonometric ratios for indirect measurement?",
    {t:"Finding the length of a roof slope from the horizontal span and the roof angle.", fb:"Correct: the slope length comes from the cosine ratio rather than climbing up with a tape."},
    [ {t:"Measuring a length of ribbon by laying it flat along the edge of a long ruler.", fb:"That is direct measurement of a reachable length."},
      {t:"Checking the mass of a wrapped parcel on the counter scale at the post office.", fb:"That is a direct reading and uses no triangle."},
      {t:"Counting the steps in a staircase one at a time, from the bottom step to the top.", fb:"A count is not a trigonometric calculation."} ],
    "The roof slope length is calculated from the span and the angle using a trigonometric ratio. That is <b>indirect measurement</b>.", {v:6}); }
]), ["Indirect measurement finds a length or angle that cannot be measured directly.", "Look for the situation where an angle and one measured length stand in for the length that cannot be reached."]);

E("u7-reasonable-or-not", 7, ["5.6"], 2, "gen", function(){
  var mode=ri(0,3), prompt, correct, distract, sol;
  if(mode===0){
    var H=ri(12,30), claim=H+ri(2,10);
    prompt="A student solves a right triangle problem and reports that one leg is "+claim+" m while the hypotenuse is "+H+" m. Is the solution reasonable?";
    correct={t:"No. A leg of a right triangle can never be longer than the hypotenuse.", fb:"Correct: the hypotenuse is the longest side of a right triangle."};
    distract=[ {t:"Yes. A leg can be any length as long as the angle is acute.", fb:"No side can pass the hypotenuse: it is opposite the right angle and is always the longest side."},
      {t:"Yes. The leg and the hypotenuse are usually about the same size.", fb:"They can be close, but a leg of "+claim+" m against a hypotenuse of "+H+" m is impossible, not just unusual."},
      {t:"No. A leg should always be exactly half the hypotenuse in any right triangle.", fb:"The verdict is right but the reason is wrong: a leg can be more than half the hypotenuse, just never longer than it."} ];
    sol="The hypotenuse is the side opposite the \\(90^\\circ\\) angle and is the longest side of a right triangle. A leg of "+claim+" m cannot exceed a hypotenuse of "+H+" m, so the solution is <b>not reasonable</b>.";
  } else if(mode===1){
    var ang=ri(95,130);
    prompt="In a right triangle, a student reports that one of the acute angles measures \\("+ang+"^\\circ\\). Is the solution reasonable?";
    correct={t:"No. An acute angle must be less than 90 degrees.", fb:"Correct: with one angle already 90 degrees, each of the others must be under 90 degrees."};
    distract=[ {t:"Yes. Angles in a triangle can be up to 180 degrees each.", fb:"The three angles sum to 180 degrees in total: one angle of "+ang+" degrees plus the right angle already passes that."},
      {t:"Yes. It is reasonable if the triangle is very large.", fb:"Size does not change angle rules: the angles of any triangle sum to 180 degrees."},
      {t:"No. Acute angles must be less than 45 degrees.", fb:"The verdict is right but the limit is wrong: acute means less than 90 degrees, not less than 45."} ];
    sol="The angles of a triangle sum to \\(180^\\circ\\). The right angle takes \\(90^\\circ\\), leaving less than \\(90^\\circ\\) for each acute angle. A value of \\("+ang+"^\\circ\\) is <b>not reasonable</b> for an acute angle.";
  } else if(mode===2){
    var sv=fmtF(ri(11,19)/10,1);
    prompt="A student calculates \\(\\sin A = "+sv+"\\) for an acute angle A in a right triangle. Is the solution reasonable?";
    correct={t:"No. Sine is opposite / hypotenuse, and the opposite side cannot exceed the hypotenuse, so sine is at most 1.", fb:"Correct: a part divided by the whole hypotenuse can never pass 1."};
    distract=[ {t:"Yes. Sine values can be any positive number, as large as the angle in the triangle needs them to be, and beyond.", fb:"Sine is a ratio of a leg to the hypotenuse, so it is capped at 1."},
      {t:"Yes. It is reasonable because the angle might be large enough to give a sine value over 1 easily.", fb:"Even at angles close to 90 degrees, sine stays at or below 1."},
      {t:"No. A sine value must always come out less than 0.5, whatever the size of the angle is here.", fb:"The verdict is right but the cap is wrong: sine can be up to 1, for example about 0.87 at 60 degrees."} ];
    sol="\\(\\sin A = "+FR("opposite","hypotenuse")+"\\). The opposite side is a leg, and a leg cannot be longer than the hypotenuse, so the ratio is at most \\(1\\). A sine of "+sv+" is <b>not reasonable</b>.";
  } else {
    var H2=ri(15,40), leg=ri(4,H2-3);
    prompt="A student solves a right triangle problem and reports a leg of "+leg+" m with a hypotenuse of "+H2+" m, found using the sine ratio. Is the solution reasonable?";
    correct={t:"Yes. The leg is shorter than the hypotenuse, as it must be.", fb:"Correct: "+leg+" m is less than "+H2+" m, so the size check passes."};
    distract=[ {t:"No. A leg must be less than half the hypotenuse.", fb:"There is no such rule: a leg can be close to the hypotenuse when the opposite angle is near 90 degrees."},
      {t:"No. Legs found with sine are always longer than the hypotenuse.", fb:"That reverses the rule: sine results are legs, and legs are always shorter than the hypotenuse."},
      {t:"Yes. Any answer from a calculator is automatically reasonable.", fb:"Calculator output still needs a check: a wrong ratio can give an impossible answer."} ];
    sol="The check is the size comparison: a leg must be shorter than the hypotenuse. Here \\("+leg+" < "+H2+"\\), so the solution passes the check and is <b>reasonable</b>.";
  }
  return mcq(prompt, correct, distract, sol, {mode:mode});
}, ["Run a size check: compare legs with the hypotenuse and angles with 90 degrees.", "Ask whether each reported value could exist in a real right triangle."]);

E("u7-trig-error-spot", 7, ["2.5","5.5"], 2, "gen", function(){
  var ang=pick([28,32,35,38,42,48,55,58,62]), adj=ri(5,25);
  var correct=adj*Math.tan(u7Rad(ang)), wrong=adj*Math.sin(u7Rad(ang));
  var prompt="A guy wire meets the ground at \\("+ang+"^\\circ\\). The anchor is "+adj+" m from the base of the pole, and a student wants the height where the wire meets the pole. The student writes: height = "+adj+" x sin("+ang+") = "+fmtF(wrong,2)+" m. What is the correct height, in metres, to two decimal places?";
  var sol="The known side is adjacent to the angle and the wanted side is opposite, so the tangent ratio applies, not sine: \\[ \\text{height} = "+adj+" \\times \\tan("+ang+"^\\circ) = "+fmtF(correct,2)+" \\] The correct height is <b>"+fmtF(correct,2)+" m</b>. The student's error was choosing the sine ratio.";
  var q=mcq(prompt, {t:fmtF(correct,2), fb:"Correct: opposite over adjacent is tangent, so height = adjacent x tan(angle)."},
    [ {t:fmtF(wrong,2), fb:"That is the student's value: it uses sine, which pairs the opposite side with the hypotenuse, not with the adjacent side."},
      {t:fmtF(adj/Math.tan(u7Rad(ang)),2), fb:"That divides by the tangent. The height is adjacent multiplied by tan(angle)."},
      {t:fmtF(adj*Math.cos(u7Rad(ang)),2), fb:"That uses cosine, which pairs the adjacent side with the hypotenuse. The wanted side is the opposite side."} ], sol, {ang:ang, adj:adj});
  q.figure=u7FigTri("?", adj+" m", "wire", ang+"\u00B0");
  return q;
}, ["Name the known and wanted sides relative to the angle before choosing a ratio.", "Adjacent and opposite are the tangent pair: height = adjacent x tan(angle)."]);

E("u7-equivalent-forms", 7, ["2.6","5.1"], 2, "gen", function(){
  var mode=ri(0,3);
  if(mode===0){
    var tr=u7Triple(), s=tr[0]/tr[2], c=tr[1]/tr[2], tv=s/c;
    var prompt="For an acute angle A, \\(\\sin A = "+fmtF(s,2)+"\\) and \\(\\cos A = "+fmtF(c,2)+ "\\). Which calculation gives \\(\\tan A\\)?";
    var sol="The tangent ratio can be rewritten using sine and cosine: \\[ \\tan A = "+FR("opposite","adjacent")+" = "+FR("\\sin A","\\cos A")+" = "+FR(fmtF(s,2),fmtF(c,2))+" = "+fmtF(tv,2)+" \\] The answer is <b>"+fmtF(tv,2)+"</b>. The forms are equivalent because the hypotenuse cancels when the two ratios are divided.";
    return mcq(prompt, {t:fmtF(tv,2), fb:"Correct: tan A = sin A / cos A, since opposite/hypotenuse divided by adjacent/hypotenuse leaves opposite/adjacent."},
      [ {t:fmtF(c/s,2), fb:"That is cos A / sin A, the tangent ratio turned upside down."},
        {t:fmtF(s*c,2), fb:"That multiplies the two ratios. Dividing them is what cancels the hypotenuse."},
        {t:fmtF(s+c,2), fb:"That adds the ratios. Equivalent forms come from dividing sine by cosine, not adding."} ], sol, {mode:mode});
  } else if(mode===1){
    var ang=u7Ang(), H=ri(10,40), sv=Math.sin(u7Rad(ang)), opp=H*sv;
    var prompt1="The formula for the side opposite an angle is \\(\\text{opp} = \\text{hyp} \\times \\sin A\\). A ladder (the hypotenuse) is "+H+" m long and reaches up at \\("+ang+"^\\circ\\) to the ground. What height does it reach, in metres, to two decimal places?";
    var sol1="Apply the formula directly: \\[ \\text{height} = "+H+" \\times \\sin("+ang+"^\\circ) = "+fmtF(opp,2)+" \\] The ladder reaches <b>"+fmtF(opp,2)+" m</b>.";
    var q=mcq(prompt1, {t:fmtF(opp,2), fb:"Correct: height = hypotenuse x sin(angle)."},
      [ {t:fmtF(H/sv,2), fb:"That divides by sine, which would give a height longer than the ladder itself."},
        {t:fmtF(H*Math.cos(u7Rad(ang)),2), fb:"That is the distance along the ground (adjacent side), found with cosine, not the height."},
        {t:fmtF(H*Math.tan(u7Rad(ang)),2), fb:"That uses tangent with the hypotenuse. Tangent pairs the two legs, not the hypotenuse."} ], sol1, {mode:mode}); q.figure=u7FigTri("?", "", H+" m", ang+"\u00B0"); return q;
  } else if(mode===2){
    var ang2=u7Ang(), O=ri(5,30), sv2=Math.sin(u7Rad(ang2)), H2=O/sv2;
    var prompt2="Rearranging \\(\\sin A = "+FR("opposite","hypotenuse")+"\\) gives \\(\\text{hyp} = \\text{opp} \\div \\sin A\\). A roof slope rises "+O+" m vertically and the slope angle is \\("+ang2+"^\\circ\\). What is the slope length, in metres, to two decimal places?";
    var sol2="Use the rearranged form: \\[ \\text{slope} = "+O+" \\div \\sin("+ang2+"^\\circ) = "+fmtF(H2,2)+" \\] The slope length is <b>"+fmtF(H2,2)+" m</b>, which is longer than the vertical rise, as a hypotenuse must be.";
    var q=mcq(prompt2, {t:fmtF(H2,2), fb:"Correct: hypotenuse = opposite / sin(angle)."},
      [ {t:fmtF(O*sv2,2), fb:"That multiplies instead of dividing, and gives a slope shorter than its own vertical rise, which is impossible."},
        {t:fmtF(O/Math.cos(u7Rad(ang2)),2), fb:"That divides by cosine. The rearranged sine form divides by sin(angle)."},
        {t:fmtF(O*Math.tan(u7Rad(ang2)),2), fb:"That is the horizontal run found with tangent, not the slope length."} ], sol2, {mode:mode}); q.figure=u7FigTri(O+" m", "", "?", ang2+"\u00B0"); return q;
  }
  var ang3=u7Ang(), H3=ri(10,40), cv=Math.cos(u7Rad(ang3)), adj3=H3*cv;
  var prompt3="The formula \\(\\text{adj} = \\text{hyp} \\times \\cos A\\) is another form of \\(\\cos A = "+FR("adjacent","hypotenuse")+"\\). A ramp is "+H3+" m long at \\("+ang3+"^\\circ\\) to the ground. How far, in metres, does it reach horizontally, to two decimal places?";
  var sol3="Apply the formula: \\[ \\text{reach} = "+H3+" \\times \\cos("+ang3+"^\\circ) = "+fmtF(adj3,2)+" \\] The ramp reaches <b>"+fmtF(adj3,2)+" m</b> horizontally.";
  var q=mcq(prompt3, {t:fmtF(adj3,2), fb:"Correct: adjacent = hypotenuse x cos(angle)."},
    [ {t:fmtF(H3/cv,2), fb:"That divides by cosine, giving a reach longer than the ramp itself."},
      {t:fmtF(H3*Math.sin(u7Rad(ang3)),2), fb:"That is the height of the ramp (opposite side), found with sine, not the horizontal reach."},
      {t:fmtF(H3*Math.tan(u7Rad(ang3)),2), fb:"That uses tangent with the hypotenuse. Tangent pairs the two legs."} ], sol3, {mode:mode}); q.figure=u7FigTri("", "?", H3+" m", ang3+"\u00B0"); return q;
}, ["Equivalent forms come from rearranging the same ratio: check which side is being isolated.", "Start from the ratio definition and follow the algebra: multiply or divide both sides to isolate the wanted side."]);

E("u7-trig-in-trades", 7, ["2.2","5.4"], 2, "var", varset([
  function(){ var q=mcq("A roofer checks the pitch of a roof. The roof rises 1.8 m over a horizontal run of 6 m. Which ratio describes the pitch angle, and how is it used?",
    {t:"Tangent: the roofer divides rise by run to get the pitch angle of the slope.", fb:"Correct: rise is opposite and run is adjacent, so tangent links them to the angle."},
    [ {t:"Sine: the roofer divides the rise by the run to get the pitch angle of the slope.", fb:"Sine pairs the rise with the slope length (hypotenuse), not with the run."},
      {t:"Cosine: the roofer adds the rise and the run to get the pitch angle of the slope.", fb:"Cosine is a ratio, not a sum, and it pairs the run with the slope length."},
      {t:"Pythagoras: the roofer squares the rise to get the pitch angle of the roof slope.", fb:"Squaring the rise gives a side length calculation, not an angle from rise and run."} ],
    "Pitch is rise over run, the opposite over the adjacent side, so the roofer uses the <b>tangent ratio</b> to find or check the slope angle.", {v:1}); q.figure=u7FigTri("1.8 m", "6 m", "", "?"); return q; },
  function(){ var q=mcq("A ramp builder needs a ramp at \\(8^\\circ\\) that rises 0.9 m. Which calculation gives the length of the ramp surface?",
    {t:"Ramp length = 0.9 / sin(8 degrees), using the sine ratio with the rise as the opposite side.", fb:"Correct: the ramp surface is the hypotenuse, and hypotenuse = opposite / sin(angle)."},
    [ {t:"Ramp length = 0.9 x sin(8 degrees), using the sine ratio with the rise as the opposite side, as drawn.", fb:"That would make the ramp shorter than its own rise, which is impossible for a hypotenuse."},
      {t:"Ramp length = 0.9 / tan(8 degrees), using the tangent ratio with the rise as the opposite side.", fb:"That gives the horizontal run of the ramp, not the surface length."},
      {t:"Ramp length = 0.9 + 8, adding the rise in metres and the angle in degrees together.", fb:"Adding a length and an angle mixes units and uses no ratio at all."} ],
    "The rise is opposite the \\(8^\\circ\\) angle and the ramp surface is the hypotenuse, so \\(\\text{length} = 0.9 \\div \\sin(8^\\circ)\\), from the <b>sine ratio</b>.", {v:2}); q.figure=u7FigTri("0.9 m", "", "?", "8\u00B0"); return q; },
  function(){ var q=mcq("A surveyor stands 40 m from a marker on the far side of a river and measures an angle along the bank. Which ratio lets the surveyor calculate the river's width without crossing it?",
    {t:"Tangent, because the width and the bank distance are the two legs of a right triangle.", fb:"Correct: opposite and adjacent are the tangent pair, so the width comes from the angle and the bank distance."},
    [ {t:"Sine, because the width is opposite the hypotenuse of the right triangle formed by the banks.", fb:"The width is a leg here, not opposite a hypotenuse pairing: sine needs the hypotenuse as one side."},
      {t:"Cosine, because the width is adjacent to the hypotenuse of the triangle.", fb:"Cosine needs the hypotenuse, which is the slanted sight line, not one of the two legs in this setup."},
      {t:"No ratio works here: the surveyor has to go out and measure the width directly.", fb:"This is exactly indirect measurement: the tangent ratio gives the width from the near bank."} ],
    "The river width and the distance along the bank are the two legs, so the <b>tangent ratio</b> gives the width indirectly.", {v:3}); q.figure=u7FigTri("?", "40 m", "sight line", ""); return q; },
  function(){ var q=mcq("A carpenter cuts a stair stringer (the slanted board) for stairs that run 3.6 m horizontally with a stringer angle of \\(33^\\circ\\). Which calculation gives the stringer length?",
    {t:"Stringer = 3.6 / cos(33 degrees), using the cosine ratio with the run as the adjacent side.", fb:"Correct: hypotenuse = adjacent / cos(angle)."},
    [ {t:"Stringer = 3.6 x cos(33 degrees), using the cosine ratio with the run as the adjacent side itself.", fb:"That would give a stringer shorter than the horizontal run, impossible for the slanted side."},
      {t:"Stringer = 3.6 / sin(33 degrees), using the sine ratio with the run as the adjacent side.", fb:"Sine would need the vertical rise as the known side, not the horizontal run."},
      {t:"Stringer = 3.6 x tan(33 degrees), using the tangent ratio with the run as one side.", fb:"That gives the total rise of the stairs, not the stringer length."} ],
    "The run is adjacent to the angle and the stringer is the hypotenuse, so \\(\\text{stringer} = 3.6 \\div \\cos(33^\\circ)\\) from the <b>cosine ratio</b>.", {v:4}); q.figure=u7FigTri("", "3.6 m", "?", "33\u00B0"); return q; },
  function(){ var q=mcq("An electrician leans a ladder against a building. Safety rules set the angle between the ladder and the ground. Which ratio connects the ladder length, the distance of the foot from the wall, and that angle?",
    {t:"Cosine: foot distance = ladder length x cos(angle).", fb:"Correct: the foot distance is the adjacent side and the ladder is the hypotenuse."},
    [ {t:"Sine: foot distance = ladder length x sin(angle).", fb:"That gives the height up the wall (opposite side), not the foot distance."},
      {t:"Tangent: foot distance = ladder length x tan(angle).", fb:"Tangent pairs the two legs; the ladder is the hypotenuse, so tangent does not apply directly here."},
      {t:"Cosine: foot distance = ladder length / cos(angle).", fb:"Dividing would put the foot farther from the wall than the ladder is long, which cannot happen."} ],
    "Foot distance is the adjacent side and ladder length is the hypotenuse, so the <b>cosine ratio</b> connects them: adj = hyp x cos(angle).", {v:5}); q.figure=u7FigTri("", "?", "ladder", "angle"); return q; }
]), ["Match the trade's known and wanted sides to a ratio.", "Decide which side of the triangle each measurement is: opposite, adjacent or hypotenuse."]);

E("u7-tangent-context", 7, ["5.5"], 2, "gen", function(){
  var ctxs=[ {n:"the top of a tree", from:"a point on the ground"}, {n:"the top of a building", from:"a point on the street"}, {n:"the top of a sign pole", from:"a mark on the pavement"}, {n:"the top of a flagpole", from:"a point on the field"} ];
  var c=pick(ctxs), d=ri(6,40), ang=u7Ang(), ans=d*Math.tan(u7Rad(ang));
  var prompt="From "+c.from+" "+d+" m away, the angle of elevation to "+c.n+" is \\("+ang+"^\\circ\\). What is the height, to the nearest tenth of a metre?";
  var sol="The ground distance is adjacent to the angle and the height is opposite, so use tangent: \\[ \\text{height} = "+d+" \\times \\tan("+ang+"^\\circ) = "+fmtF(ans,1)+" \\] The height is <b>"+fmtF(ans,1)+" m</b>.";
  var q=mcq(prompt, {t:fmtF(ans,1), fb:"Correct: height = adjacent x tan(angle of elevation)."},
    [ {t:fmtF(d*Math.sin(u7Rad(ang)),1), fb:"That uses sine, which needs the hypotenuse. The known side here is the adjacent ground distance."},
      {t:fmtF(d/Math.tan(u7Rad(ang)),1), fb:"That divides by the tangent. The height is the distance multiplied by tan(angle)."},
      {t:fmtF(d*Math.cos(u7Rad(ang)),1), fb:"That uses cosine, which pairs the adjacent side with the hypotenuse, not with the opposite height."} ], sol, {d:d, ang:ang});
  q.figure=u7FigTri("?", d+" m", "sight line", ang+" deg");
  return q;
}, ["The angle of elevation is measured from the horizontal up to the line of sight.", "Ground distance is the adjacent side and height is the opposite side, so use the tangent ratio."]);

E("u7-sine-cosine-derive", 7, ["5.2","5.3"], 2, "gen", function(){
  var tr=u7Triple(), o=tr[0], a=tr[1], h=tr[2], k=pick([2,3]), o2=o*k, a2=a*k, h2=h*k;
  var sv=o/h, cv=a/h;
  var prompt="Two right triangles share the acute angle A. The smaller has sides opposite "+o+", adjacent "+a+" and hypotenuse "+h+". The larger has opposite "+o2+", adjacent "+a2+" and hypotenuse "+h2+". Which pair gives \\(\\sin A\\) and \\(\\cos A\\)?";
  var sol="For the smaller triangle, \\(\\sin A = "+o+"/"+h+" = "+fmtF(sv,2)+"\\) and \\(\\cos A = "+a+"/"+h+" = "+fmtF(cv,2)+"\\). For the larger triangle, \\("+o2+"/"+h2+" = "+fmtF(sv,2)+"\\) and \\("+a2+"/"+h2+" = "+fmtF(cv,2)+"\\). Both ratios stay the same when the triangle is scaled, so \\(\\sin A = "+fmtF(sv,2)+"\\) and \\(\\cos A = "+fmtF(cv,2)+"\\). The pair is <b>sin A = "+fmtF(sv,2)+", cos A = "+fmtF(cv,2)+"</b>.";
  var q=mcq(prompt, {t:"sin A = "+fmtF(sv,2)+", cos A = "+fmtF(cv,2), fb:"Correct: sine uses opposite/hypotenuse and cosine uses adjacent/hypotenuse, and both hold in either triangle."},
    [ {t:"sin A = "+fmtF(cv,2)+", cos A = "+fmtF(sv,2), fb:"The two values are swapped: sine is opposite over hypotenuse, cosine is adjacent over hypotenuse."},
      {t:"sin A = "+fmtF(h/o,2)+", cos A = "+fmtF(h/a,2), fb:"Both ratios are upside down there, and a sine or cosine value cannot be greater than 1."},
      {t:"sin A = "+fmtF(o/a,2)+", cos A = "+fmtF(cv,2), fb:"The sine value there is opposite over adjacent, which is the tangent ratio, not sine."} ], sol, {o:o,a:a,h:h,k:k});
  q.figure=u7FigTriPair({o:o,a:a,oL:""+o,aL:""+a,hL:""+h,angL:"A"},{o:o2,a:a2,oL:""+o2,aL:""+a2,hL:""+h2,angL:"A"});
  return q;
}, ["Sine uses the opposite side and cosine uses the adjacent side, each over the hypotenuse.", "Compute opposite / hypotenuse and adjacent / hypotenuse on the smaller triangle, then check the larger one matches."]);

E("u7-unknown-angle-mc", 7, ["5.5"], 2, "gen", function(){
  var mode=ri(0,2), angDeg, knownTxt, ratioName, oL, aL, hL, tries=0;
  var o=ri(3,20), a=ri(3,20);
  while((o===a || Math.abs(Math.atan2(o,a)*180/Math.PI-45)<3) && tries<30){ o=ri(3,20); a=ri(3,20); tries++; }
  if(mode===0){ angDeg=Math.atan2(o,a)*180/Math.PI; ratioName="tangent"; knownTxt="the side opposite the angle is "+o+" m and the side adjacent is "+a+" m"; oL=o+" m"; aL=a+" m"; hL="hyp"; }
  else if(mode===1){ var h=o+ri(2,15); angDeg=Math.asin(o/h)*180/Math.PI; ratioName="sine"; knownTxt="the side opposite the angle is "+o+" m and the hypotenuse is "+h+" m"; oL=o+" m"; aL="adj"; hL=h+" m"; }
  else { var h2=a+ri(2,15); angDeg=Math.acos(a/h2)*180/Math.PI; ratioName="cosine"; knownTxt="the side adjacent to the angle is "+a+" m and the hypotenuse is "+h2+" m"; oL="opp"; aL=a+" m"; hL=h2+" m"; }
  var correct=Math.round(angDeg);
  var d1=correct+10; if(d1>89) d1=correct-20;
  var d2=correct-10; if(d2<1) d2=correct+20; if(d2===d1) d2=correct+15;
  var comp=90-correct; if(comp===d1||comp===d2||comp===correct) comp=correct+5;
  var prompt="In a right triangle, "+knownTxt+". What is the measure of the angle, to the nearest degree?";
  var sol="Use the inverse of the "+ratioName+" ratio on a calculator: the ratio value gives an angle of about \\("+fmtF(angDeg,1)+"^\\circ\\), which rounds to <b>"+correct+" degrees</b>.";
  var q=mcq(prompt, {t:correct+"°", fb:"Correct: the inverse "+ratioName+" of the side ratio gives about "+fmtF(angDeg,1)+" degrees."},
    [ {t:d1+"°", fb:"That is 10 degrees too large: recheck the ratio before using the inverse key."},
      {t:d2+"°", fb:"That is off the computed value of about "+fmtF(angDeg,1)+" degrees: recheck which sides form the ratio."},
      {t:comp+"°", fb:"That is the other acute angle of the triangle (90 minus the answer), not the angle at the marked vertex."} ], sol, {mode:mode, correct:correct});
  q.figure=u7FigTri(oL, aL, hL, "?");
  return q;
}, ["An unknown angle calls for the inverse of the ratio formed by the two known sides.", "Form the ratio from the known sides first, then apply the matching inverse ratio."]);

/* ---------------- Level 3: multiple choice ---------------- */

E("u7-elevation-observer", 7, ["5.5","2.4"], 3, "gen", function(){
  var d=ri(15,60), ang=u7Ang(), eye=pick([1.5,1.6,1.7,1.8]), rise=d*Math.tan(u7Rad(ang)), ans=rise+eye;
  var prompt="An observer with eye level "+fmt(eye)+" m above the ground stands "+d+" m from a building. The angle of elevation from eye level to the top of the building is \\("+ang+"^\\circ\\). What is the height of the building, to the nearest tenth of a metre?";
  var sol="First find the rise above eye level with tangent, which requires rearranging the ratio so the opposite side is the subject: \\[ \\text{rise} = "+d+" \\times \\tan("+ang+"^\\circ) = "+fmtF(rise,1)+" \\] Then add the eye level height: \\[ "+fmtF(rise,1)+" + "+fmt(eye)+" = "+fmtF(ans,1)+" \\] The building is <b>"+fmtF(ans,1)+" m</b> high.";
  var q=mcq(prompt, {t:fmtF(ans,1), fb:"Correct: tangent gives the rise above eye level, then the eye level height is added."},
    [ {t:fmtF(rise,1), fb:"That is only the rise above eye level. The observer's eye level of "+fmt(eye)+" m still has to be added."},
      {t:fmtF(rise-eye,1), fb:"That subtracts the eye level. The top of the building is above eye level, so the eye level is added."},
      {t:fmtF(d/Math.tan(u7Rad(ang))+eye,1), fb:"That divides by the tangent in the first step. The rise is distance multiplied by tan(angle)."} ], sol, {d:d, ang:ang, eye:eye});
  q.figure=m12ElevSVG({dist:d, rise:rise, eye:eye, distLab:d+" m", heightLab:"?", angLab:ang+"\u00B0", eyeLab:fmt(eye)+" m"});
  return q;
}, ["Split the height into two parts: the rise above eye level and the eye level itself.", "Use tangent to find the rise, then add the eye level height."]);

E("u7-similar-perimeter", 7, ["3.64"], 3, "gen", function(){
  var k=pick([2,3]), a=ri(3,12), b=a*k, P=ri(20,60), ans=P*k;
  var prompt="Polygons A and B are similar. A side of polygon A measures "+a+" cm, and the corresponding side of polygon B measures "+b+" cm. The perimeter of polygon A is "+P+" cm. What is the perimeter of polygon B, in centimetres?";
  var sol="The scale factor is \\("+b+" \\div "+a+" = "+k+"\\). Every length in B, including the whole perimeter, is scaled by the same factor: \\[ "+P+" \\times "+k+" = "+ans+" \\] The perimeter of B is <b>"+ans+" cm</b>.";
  var _bo0=balOpts({t:fmt(ans), fb:"Correct: perimeters scale by the same factor as the sides."}, [ {t:fmtF(P/k,1), fb:"That scales the perimeter down. B is the larger polygon, so its perimeter is larger than A's."},
      {t:fmt(P*k*k), fb:"That multiplies by the scale factor twice. Squaring the factor is for areas, not perimeters."},
      {t:fmt(P+(b-a)), fb:"That adds the difference of one pair of sides. Every side scales by multiplication, so the perimeter does too."} ]); var q=mcq(prompt, _bo0[0], _bo0[1], sol, {k:k, P:P}); q.figure=u7FigPair(a,a*0.7,"A: side "+a+" cm", b,b*0.7,"B: side "+b+" cm"); return q;
}, ["A perimeter is a length, so it scales the same way the sides do.", "Find the scale factor from the known pair of sides, then multiply the whole perimeter by it."]);

E("u7-reasonable-advanced", 7, ["5.6","2.5"], 3, "gen", function(){
  var mode=Math.random()<0.5;
  if(mode){
    var H=ri(10,30), ang=pick([28,32,35,38,42,48,55,58,62]), sv=Math.sin(u7Rad(ang));
    var correct=H*sv, wrong=H/sv;
    var prompt="A student needs the side opposite a \\("+ang+"^\\circ\\) angle in a right triangle with hypotenuse "+H+" m. The student writes: opposite = "+H+" / sin("+ang+") = "+fmtF(wrong,2)+" m. Which response is correct?";
    var sol="The student's answer, "+fmtF(wrong,2)+" m, is longer than the hypotenuse of "+H+" m, so it cannot be a leg. The error is the operation: rearranging \\(\\sin A = "+FR("opposite","hypotenuse")+"\\) gives opposite = hypotenuse x sin A: \\[ "+H+" \\times \\sin("+ang+"^\\circ) = "+fmtF(correct,2)+" \\] The correct length is <b>"+fmtF(correct,2)+" m</b>.";
    var q=mcq(prompt, {t:"The answer is impossible: it is longer than the hypotenuse. The correct value is "+fmtF(correct,2)+" m.", fb:"Correct: a leg cannot exceed the hypotenuse, and the fix is to multiply by sine instead of dividing."},
      [ {t:"The answer is fine: dividing by a sine value less than 1 is the right rearrangement here.", fb:"Dividing by a number less than 1 grows the value past the hypotenuse, which a leg can never do."},
        {t:"The answer is impossible, and the correct value, worked properly, is "+fmtF(H*Math.cos(u7Rad(ang)),2)+" m.", fb:"The verdict is right, but that value uses cosine: it is the adjacent side, not the opposite side."},
        {t:"The answer is fine, because sine answers are often larger than the hypotenuse.", fb:"Never: sine is a leg over the hypotenuse, so working it back must give a value smaller than the hypotenuse."} ], sol, {mode:1}); q.figure=u7FigTri("?", "", H+" m", ang+"\u00B0"); return q;
  }
  var o=ri(4,18), a=ri(4,18), tries=0;
  while(o===a && tries<20){ a=ri(4,18); tries++; } if(o===a) a=o+2;
  var trueAng=Math.atan2(o,a)*180/Math.PI, correct=Math.round(trueAng), comp=90-correct;
  var prompt2="A student finds an angle in a right triangle where the opposite side is "+o+" m and the adjacent side is "+a+" m. The student uses the sine ratio with these two sides and reports the angle as \\("+comp+"^\\circ\\). Which response is correct?";
  var sol2="Sine pairs the opposite side with the hypotenuse, and no hypotenuse is given here. The two given sides are the legs, so the tangent ratio applies: the angle is \\(\\tan^{-1}("+o+"/"+a+") \\approx "+fmtF(trueAng,1)+"^\\circ\\), about <b>"+correct+" degrees</b>. The reported \\("+comp+"^\\circ\\) is the size of the other acute angle, a sign the wrong sides were used.";
  var q=mcq(prompt2, {t:"The student used the wrong ratio: with the two legs, tangent gives about "+correct+" degrees.", fb:"Correct: opposite and adjacent are the tangent pair; sine needs the hypotenuse."},
    [ {t:"The student is right: sine works with any two sides of a right triangle.", fb:"Each ratio is tied to specific sides: sine only pairs the opposite side with the hypotenuse."},
      {t:"The student used the wrong ratio: cosine gives about "+correct+" degrees.", fb:"Cosine also needs the hypotenuse. With the two legs given, the ratio is tangent."},
      {t:"The angle cannot be found from two sides of a triangle alone, without more given at all.", fb:"Two sides are enough: they fix the ratio, and the inverse ratio gives the angle."} ], sol2, {mode:0}); q.figure=u7FigTri(o+" m", a+" m", "", "?"); return q;
}, ["Judge the answer first, then name the exact error that produced it.", "Check the size against the hypotenuse for sides, and check which sides the chosen ratio actually pairs."]);

/* ---------------- Constructed response ---------------- */

E("u7-cr-similar-side", 7, ["3.64"], 2, "gen", function(){
  var ctxs=[ {n:"a photo enlargement", u:"cm"}, {n:"a scale model of a boat", u:"cm"}, {n:"a blueprint of a garage", u:"cm"}, {n:"a map of a hiking trail", u:"cm"} ];
  var c=pick(ctxs), k=pick([2,3,4]), a=ri(2,9), b=a*k, s=ri(3,14), x=s*k;
  var prompt="In "+c.n+", the small figure and the large figure are similar. A side of "+a+" "+c.u+" on the small figure corresponds to a side of "+b+" "+c.u+" on the large figure. Another side of the small figure is "+s+" "+c.u+". Find the length of the corresponding side on the large figure, in "+c.u+". Show your work.";
  var sol="Find the scale factor from the known pair, then apply it to the other side: \\[ \\begin{aligned} \\text{scale factor} &= "+b+" \\div "+a+" = "+k+" \\\\ \\text{side} &= "+s+" \\times "+k+" = "+x+" \\end{aligned} \\] The corresponding side is <b>"+x+" "+c.u+"</b>.";
  var q=numq(prompt, x, 0.1, sol, {k:k, s:s});
  q.figure=u7FigPair(a,s,"small: "+a+" and "+s, b,x,"large: "+b+" and ?");
  return q;
}, ["Set up a proportion between corresponding sides.", "Divide the large known side by the small known side to get the scale factor."]);

E("u7-cr-tangent-height", 7, ["5.5","2.3"], 2, "gen", function(){
  var ctxs=[ {n:"a tree", p:"a point on the ground"}, {n:"a building", p:"a point on the sidewalk"}, {n:"a water tower", p:"a point on the road"} ];
  var c=pick(ctxs), d=ri(8,35), ang=u7Ang(), ans=d*Math.tan(u7Rad(ang));
  var prompt="From "+c.p+" "+d+" m from the base of "+c.n+", the angle of elevation to the top is \\("+ang+"^\\circ\\). Use the tangent formula to find the height of "+c.n+", to the nearest tenth of a metre. Show your work.";
  var sol="The height is opposite the angle and the ground distance is adjacent, so the tangent formula applies directly: \\[ \\begin{aligned} \\tan("+ang+"^\\circ) &= "+FR("height", d) +" \\\\ \\text{height} &= "+d+" \\times \\tan("+ang+"^\\circ) \\\\ &= "+fmtF(ans,1)+" \\end{aligned} \\] The height is <b>"+fmtF(ans,1)+" m</b>.";
  var q=numq(prompt, Math.round(ans*10)/10, 0.15, sol, {d:d, ang:ang});
  q.figure=u7FigTri("?", d+" m", "sight line", ang+" deg");
  return q;
}, ["The tangent formula links the opposite height to the adjacent ground distance.", "Write tan(angle) = height / distance, then multiply both sides by the distance."]);

E("u7-cr-find-angle", 7, ["5.5"], 2, "gen", function(){
  var ctxs=[ {n:"a wheelchair ramp", s:"rise"}, {n:"a loading ramp", s:"rise"}, {n:"a roof section", s:"rise"} ];
  var c=pick(ctxs), rise=ri(1,6), run=ri(4,12), ang=Math.atan2(rise,run)*180/Math.PI, ans=Math.round(ang);
  var prompt="A "+c.n.split(" ").slice(1).join(" ")+" has a "+c.s+" of "+rise+" m over a horizontal run of "+run+" m. Find the angle the surface makes with the ground, to the nearest degree. Show your work.";
  var sol="The rise is opposite the angle and the run is adjacent, so use the inverse tangent: \\[ \\begin{aligned} \\tan A &= "+FR(rise, run) +" \\\\ A &= \\tan^{-1}\\left("+fmtF(rise/run,3)+"\\right) \\\\ &= "+ans+"^\\circ \\end{aligned} \\] The angle is <b>"+ans+" degrees</b>.";
  var q=numq(prompt, ans, 0.6, sol, {rise:rise, run:run}); q.figure=u7FigTri(rise+" m", run+" m", "ramp", "?"); return q;
}, ["Rise and run are the two legs, so the tangent ratio connects them to the angle.", "Divide the rise by the run, then use the inverse tangent."]);

E("u7-cr-similar-perimeter-draw", 7, ["3.65"], 2, "gen", function(){
  var w=ri(3,10), h=ri(2,9), k=pick([2,3]), iw=w*k, ih=h*k, ans=2*(iw+ih);
  var prompt="A rectangle is "+w+" cm wide and "+h+" cm high. A student draws a similar rectangle. In the drawing, the side that was "+w+" cm is now "+iw+" cm. Find the perimeter of the drawing, in cm. Show your work.";
  var sol="First find the scale factor from the given pair of sides, then scale the other side, then find the perimeter: \\[ \\begin{aligned} \\text{scale factor} &= "+iw+" \\div "+w+" = "+k+" \\\\ \\text{new height} &= "+h+" \\times "+k+" = "+ih+" \\\\ \\text{perimeter} &= 2 \\times ("+iw+" + "+ih+") = "+ans+" \\end{aligned} \\] The perimeter of the drawing is <b>"+ans+" cm</b>.";
  var q=numq(prompt, ans, 0.1, sol, {w:w, h:h, k:k}); q.figure=u7FigPair(w,h,"original: "+w+" by "+h, iw,ih,"drawing: "+iw+" by ?"); return q;
}, ["The drawing scales every side by one factor: find that factor before doing anything else.", "Divide the new width by the old width to get the scale factor, then scale the height."]);

E("u7-cr-hypotenuse-rearrange", 7, ["5.5","2.4"], 2, "gen", function(){
  var ang=u7Ang(), opp=ri(4,20), hyp=opp/Math.sin(u7Rad(ang));
  var prompt="A ladder leans against a wall. The ladder makes an angle of \\("+ang+"^\\circ\\) with the ground and reaches "+opp+" m up the wall. Find the length of the ladder, to the nearest tenth of a metre. Show your work.";
  var sol="The height up the wall is opposite the angle and the ladder is the hypotenuse, so start with sine and rearrange to make the hypotenuse the subject: \\[ \\begin{aligned} \\sin("+ang+"^\\circ) &= "+FR(opp, "ladder") +" \\\\ \\text{ladder} &= "+opp+" \\div \\sin("+ang+"^\\circ) \\\\ &= "+fmtF(hyp,1)+" \\end{aligned} \\] The ladder is <b>"+fmtF(hyp,1)+" m</b> long, which is longer than the height it reaches, as it should be.";
  var q=numq(prompt, Math.round(hyp*10)/10, 0.15, sol, {ang:ang, opp:opp}); q.figure=u7FigTri(opp+" m", "", "?", ang+"\u00B0"); return q;
}, ["Sine links the opposite side to the hypotenuse.", "Write sin(angle) = opposite / hypotenuse, then rearrange so the ladder length is on its own."]);

E("u7-cr-shadow-problem", 7, ["2.1","3.64"], 2, "gen", function(){
  var ph=pick([1.5,1.6,1.7,1.8]), psh=pick([1.2,1.5,2.0,2.5,3.0]), tsh=ri(6,18), ans=ph*tsh/psh;
  var prompt="At the same time of day, a person "+fmt(ph)+" m tall casts a shadow "+fmt(psh)+" m long, and a flagpole casts a shadow "+tsh+" m long. Set up a similarity proportion for this situation and solve it to find the height of the flagpole, to the nearest tenth of a metre. Show your work.";
  var sol="The person and the flagpole form similar right triangles with their shadows, so the ratios of height to shadow match: \\[ \\begin{aligned} "+FR("height of pole", tsh) + " &= " + FR(fmt(ph), fmt(psh)) + " \\\\ \\text{height of pole} &= " + fmt(ph) + " \\times " + tsh + " \\div " + fmt(psh) + " \\\\ &= " + fmtF(ans,1) + " \\end{aligned} \\] The flagpole is <b>"+fmtF(ans,1)+" m</b> high.";
  var q=numq(prompt, Math.round(ans*10)/10, 0.15, sol, {ph:ph, psh:psh, tsh:tsh}); q.figure=m12ShadowSVG(ph,psh,tsh,ans, fmt(ph)+" m", fmt(psh)+" m", tsh+" m"); return q;
}, ["Objects and their shadows at the same time of day form similar triangles.", "Match height to shadow for the person, then set the same ratio for the flagpole."]);

E("u7-cr-building-eye-level", 7, ["5.5"], 3, "gen", function(){
  var d=ri(12,50), ang=u7Ang(), eye=pick([1.5,1.6,1.7]), rise=d*Math.tan(u7Rad(ang)), ans=rise+eye;
  var prompt="An observer whose eyes are "+fmt(eye)+" m above the ground stands "+d+" m from a building and measures an angle of elevation of \\("+ang+"^\\circ\\) to the top of the building. Find the height of the building, to the nearest tenth of a metre. Show your work.";
  var sol="Use tangent for the part of the height above eye level, then add the eye level: \\[ \\begin{aligned} \\text{rise above eye level} &= "+d+" \\times \\tan("+ang+"^\\circ) = "+fmtF(rise,1)+" \\\\ \\text{building height} &= "+fmtF(rise,1)+" + "+fmt(eye)+" = "+fmtF(ans,1)+" \\end{aligned} \\] The building is <b>"+fmtF(ans,1)+" m</b> high.";
  var q=numq(prompt, Math.round(ans*10)/10, 0.15, sol, {d:d, ang:ang, eye:eye});
  q.figure=u7FigTri("?", d+" m", "sight line", ang+" deg");
  return q;
}, ["The measured angle starts at eye level, not at the ground.", "Find the rise above eye level with tangent, then add the eye level height."]);

E("u7-cr-depression-distance", 7, ["2.1","5.5"], 3, "gen", function(){
  var H=ri(20,70), ang=pick([20,24,28,32,36,40,44]), dist=H/Math.tan(u7Rad(ang));
  var prompt="From the top of a cliff "+H+" m above the water, the angle of depression to a boat is \\("+ang+"^\\circ\\). Create a right triangle model for this situation and solve it to find how far the boat is from the base of the cliff, to the nearest tenth of a metre. Show your work.";
  var sol="The angle of depression from the top equals the angle of elevation from the boat, and the cliff height is opposite that angle while the distance is adjacent. Rearranging the tangent ratio: \\[ \\begin{aligned} \\tan("+ang+"^\\circ) &= "+FR(H, "distance") +" \\\\ \\text{distance} &= "+H+" \\div \\tan("+ang+"^\\circ) \\\\ &= "+fmtF(dist,1)+" \\end{aligned} \\] The boat is <b>"+fmtF(dist,1)+" m</b> from the base of the cliff.";
  var q=numq(prompt, Math.round(dist*10)/10, 0.2, sol, {H:H, ang:ang}); q.figure=m12DepressSVG({height:H, dist:dist, heightLab:H+" m", distLab:"?", angLab:ang+"\u00B0"}); return q;
}, ["Angle of depression is measured down from the horizontal, and it equals the angle of elevation from the boat.", "Put the cliff height as the opposite side and the unknown distance as the adjacent side in the tangent ratio, then rearrange."]);

// Distinctness guard: a few numeric generators can, on rare draws, round two
// different error values to the same displayed option. Redraw those draws so
// every question keeps four distinct options.
(function(){
  var ids=["u7-tangent-ratio-constant","u7-sine-ratio-constant","u7-cosine-ratio-constant","u7-similar-missing-side-mc","u7-equivalent-forms","u7-tangent-context","u7-sine-cosine-derive","u7-elevation-observer","u7-unknown-angle-mc"];
  BANK.forEach(function(e){
    if(ids.indexOf(e.id)<0) return;
    var orig=e.gen;
    e.gen=function(){ var q, t=0; do { q=orig(); t++; } while(q && q.type==="mc" && new Set(q.options).size<4 && t<40); return q; };
  });
})();

/* ============ Constructed-response marks (generated) ============ */
/* Built by assemble-bank.py from the CRMARKS manifests at the top of
   each unit file. Exam Section B draws only from these entries. */
window.__BANK_CRMARKS={"u1-cr-approx-imperial":3,"u1-cr-approx-si":3,"u1-cr-best-buy-total":3,"u1-cr-currency-convert":2,"u1-cr-estimate-total":2,"u1-cr-percent-change":2,"u1-cr-prefix-convert":3,"u1-cr-travel-proportion":2,"u2-cr-circ":2,"u2-cr-convert":3,"u2-cr-error":3,"u2-cr-estimate":2,"u2-cr-formula-manip":3,"u2-cr-mid":2,"u2-cr-perim":2,"u2-cr-ship":3,"u3-cr-circle":2,"u3-cr-cone-sa":3,"u3-cr-cylinder-sa":3,"u3-cr-design-width":2,"u3-cr-house-composite":3,"u3-cr-paint":3,"u3-cr-tiles":2,"u3-cr-triangle":2,"u4-commission-only-cr":2,"u4-cpp-ei-tax-cr":2,"u4-full-pay-stub-cr":2,"u4-gross-mixed-cr":3,"u4-hours-schedule-cr":2,"u4-net-pay-cr":3,"u4-overtime-gross-cr":3,"u4-what-if-cr":3,"u5-cr-angle-chase":2,"u5-cr-around-point":2,"u5-cr-comp-supp":2,"u5-cr-perp-transversal":3,"u5-cr-protractor":3,"u5-cr-replicate-bisect":3,"u5-cr-trans-algebra":3,"u5-cr-trans-find":2,"u6-cr-corner-diag":3,"u6-cr-diagonal-rect":2,"u6-cr-frame-diff":3,"u6-cr-guywire-form":3,"u6-cr-hypotenuse":2,"u6-cr-ladder":3,"u6-cr-leg":2,"u6-cr-shortcut-saving":2,"u7-cr-building-eye-level":2,"u7-cr-depression-distance":3,"u7-cr-find-angle":2,"u7-cr-hypotenuse-rearrange":3,"u7-cr-shadow-problem":3,"u7-cr-similar-perimeter-draw":3,"u7-cr-similar-side":2,"u7-cr-tangent-height":2};
