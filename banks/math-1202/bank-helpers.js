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
