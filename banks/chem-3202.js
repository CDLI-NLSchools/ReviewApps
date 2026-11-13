/* Chemistry 3202 bank module for the unified review app shell.
   Assembled by assemble-bank.py from banks/chem-3202/; edit the
   per-unit sources there, not this file. Entries register through
   the shell's E(id, unit, indicators, level, kind, gen). */

/* ----- bank-u1.js ----- */
// Chemistry 3202 Unit 1 From Kinetics to Equilibrium question bank
// Phase C diagram figures (Nov 2026): original SVG figures generated from
// each question's own values were added to the 5.3 potential energy diagram
// entries. Shared figure helpers live below the sig-fig helpers in this
// slice because the assembler order for chem-3202 is u1, u2, u3, u4, br
// and this course has no bank-helpers.js slice; Units 2 to 4 reuse them.
// Tranche 7 (Nov 2026): Maxwell-Boltzmann and equilibrium graphs in this
// unit, computed and schematic titration curves in Unit 2, an enthalpy
// level diagram in Unit 3, and cell, beaker, and plating diagrams in
// Unit 4, all attach-only with no stem, answer, or solution changes.
// CRMARKS: u1-51-rate-explain=3
// CRMARKS: u1-52-rate-scenario=2
// CRMARKS: u1-53-ea-reverse=3
// CRMARKS: u1-54-mechanism-analysis=4
// CRMARKS: u1-56-k-calc=3
// CRMARKS: u1-56-ice-k=4
// CRMARKS: u1-57-shift-predict=2

/* ============ Units and significant figures discipline (Nov 2026) ============
   Givens print at 3 significant figures minimum (data sheet constants such
   as molar masses keep their full printed precision). Intermediates print
   at 4 significant figures: one guard digit, following the Chemistry 3202
   clarifications rule to carry at least one extra digit through a
   calculation and round only the final answer. Final answers are stored
   and printed at 3 significant figures, always with their unit in the
   solution. Exact numbers (coefficients, counts, ratios) are exempt. pH
   values follow the log rule instead: the decimal places in the pH equal
   the significant figures in the concentration. */
function sfR(x,sf){if(!isFinite(x)||x===0)return 0;var d=Math.pow(10,sf-Math.ceil(Math.log10(Math.abs(x))));return Math.round(x*d)/d;}
function sfSup(e){var m={"-":"\u207B","0":"\u2070","1":"\u00B9","2":"\u00B2","3":"\u00B3","4":"\u2074","5":"\u2075","6":"\u2076","7":"\u2077","8":"\u2078","9":"\u2079"};return String(e).split("").map(function(c){return m[c];}).join("");}
function sfF(x,sf){var r=sfR(x,sf);if(r===0)return "0."+"000".slice(0,Math.max(0,sf-1));var exp=Math.floor(Math.log10(Math.abs(r))),dec=sf-1-exp;if(dec<0){return (r/Math.pow(10,exp)).toFixed(sf-1)+" \u00D7 10"+sfSup(exp);}return r.toFixed(dec);}
function F3(x){return sfF(x,3);}
function iF(x){return sfF(x,4);}
function gF(x){for(var sf=3;sf<=5;sf++){if(Math.abs(sfR(x,sf)-x)<=Math.abs(x)*1e-9+1e-12)return sfF(x,sf);}return fmt(x);}
function phF(x,dec){return (Math.round(x*Math.pow(10,dec))/Math.pow(10,dec)).toFixed(dec);}

/* ============ Diagram figures (Phase C, Nov 2026) ============
   Original code-generated SVG drawings, built from each question's own
   drawn values at generation time. c32peSVG(R, peak, Pr, o) draws a
   potential energy curve through reactant level R, barrier peak and
   product level Pr (all in kJ, or relative kJ when the stem gives only
   differences). o.r, o.k and o.p are the level labels; omit one to leave
   that level unlabelled. o.ea and o.dh add annotation arrows for values
   the stem itself gives; the value an entry asks for is never annotated.
   c32catSVG draws the catalyst comparison (solid peak and lowered
   dashed peak sharing the same reactant and product levels). */
function c32txt(x,y,str,size,bold,anchor,color){
  return '<text x="'+fmt(x,1)+'" y="'+fmt(y,1)+'" font-size="'+(size||12)+'" fill="'+(color||"#17352a")+'" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="'+(anchor||"middle")+'" dominant-baseline="central"'+(bold?' font-weight="bold"':"")+'>'+str+'</text>';
}
function c32peSVG(R,Pk,Pr,o){
  o=o||{};
  var W=340,H=238,yb=192,yt=34;
  var lo=Math.min(0,R,Pr),hi=Math.max(Pk,R,Pr),pad=(hi-lo)*0.22+8; lo-=pad; hi+=pad;
  function Y(v){return yb-(v-lo)/(hi-lo)*(yb-yt);}
  var yR=Y(R),yK=Y(Pk),yP=Y(Pr);
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Potential energy diagram">';
  out+='<line x1="46" y1="20" x2="46" y2="200" stroke="#17352a" stroke-width="1.4"/>';
  out+='<line x1="46" y1="200" x2="318" y2="200" stroke="#17352a" stroke-width="1.4"/>';
  out+=c32txt(170,12,"Potential energy (kJ)",11.5,false);
  out+=c32txt(182,220,"Reaction progress",11.5,false);
  out+='<path d="M66 '+fmt(yR,1)+' L118 '+fmt(yR,1)+' C150 '+fmt(yR,1)+' 164 '+fmt(yK,1)+' 188 '+fmt(yK,1)+' C212 '+fmt(yK,1)+' 226 '+fmt(yP,1)+' 248 '+fmt(yP,1)+' L302 '+fmt(yP,1)+'" fill="none" stroke="#17352a" stroke-width="2.2"/>';
  if(o.r)out+=c32txt(92,yR-13,o.r,12,true);
  if(o.k)out+=c32txt(188,yK-13,o.k,11.5,false);
  if(o.p)out+=c32txt(275,yP-13,o.p,12,true);
  if(o.ea){
    out+='<line x1="150" y1="'+fmt(yR,1)+'" x2="150" y2="'+fmt(yK,1)+'" stroke="#b3541e" stroke-width="1.8"/>';
    out+='<path d="M150 '+fmt(yK,1)+' l-4 7 l8 0 Z" fill="#b3541e"/>';
    out+='<path d="M150 '+fmt(yR,1)+' l-4 -7 l8 0 Z" fill="#b3541e"/>';
    out+=c32txt(158,(yR+yK)/2,o.ea,11,false,"start","#b3541e");
  }
  if(o.dh){
    out+='<line x1="252" y1="'+fmt(yR,1)+'" x2="310" y2="'+fmt(yR,1)+'" stroke="#2e7d4f" stroke-width="1.2" stroke-dasharray="4 3"/>';
    out+='<line x1="306" y1="'+fmt(yR,1)+'" x2="306" y2="'+fmt(yP,1)+'" stroke="#2e7d4f" stroke-width="1.8"/>';
    out+='<path d="M306 '+fmt(yP,1)+' l-4 '+(yP>yR?"-7":"7")+' l8 0 Z" fill="#2e7d4f"/>';
    out+=c32txt(300,(yR+yP)/2,o.dh,11,false,"end","#2e7d4f");
  }
  return out+'</svg>';
}
function c32catSVG(peak,drop){
  var cat=peak-drop;
  var W=340,H=238,yR=158,yP=182,yK=46;
  var yC=yR-(yR-yK)*(cat/peak); if(yC<yK+18)yC=yK+18;
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Potential energy diagram with and without a catalyst">';
  out+='<line x1="46" y1="20" x2="46" y2="200" stroke="#17352a" stroke-width="1.4"/>';
  out+='<line x1="46" y1="200" x2="318" y2="200" stroke="#17352a" stroke-width="1.4"/>';
  out+=c32txt(170,12,"Potential energy (kJ)",11.5,false);
  out+=c32txt(182,220,"Reaction progress",11.5,false);
  out+='<path d="M66 '+yR+' L118 '+yR+' C150 '+yR+' 164 '+yK+' 188 '+yK+' C212 '+yK+' 226 '+yP+' 248 '+yP+' L302 '+yP+'" fill="none" stroke="#17352a" stroke-width="2.2"/>';
  out+='<path d="M66 '+yR+' L118 '+yR+' C150 '+yR+' 164 '+fmt(yC,1)+' 188 '+fmt(yC,1)+' C212 '+fmt(yC,1)+' 226 '+yP+' 248 '+yP+' L302 '+yP+'" fill="none" stroke="#b3541e" stroke-width="2" stroke-dasharray="6 4"/>';
  out+=c32txt(92,yR-13,"Reactants",12,true);
  out+=c32txt(275,yP-13,"Products",12,true);
  out+=c32txt(188,yK-13,"Peak without catalyst: "+peak+" kJ",11.5,false);
  out+=c32txt(238,yC-12,"Peak with catalyst: "+cat+" kJ",11.5,false,"middle","#b3541e");
  return out+'</svg>';
}
function c32smooth(pts){
  var d="M"+fmt(pts[0][0],1)+" "+fmt(pts[0][1],1);
  for(var i=0;i<pts.length-1;i++){
    var p0=pts[Math.max(0,i-1)],p1=pts[i],p2=pts[i+1],p3=pts[Math.min(pts.length-1,i+2)];
    var c1=[p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6];
    var c2=[p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6];
    d+="C"+fmt(c1[0],1)+" "+fmt(c1[1],1)+" "+fmt(c2[0],1)+" "+fmt(c2[1],1)+" "+fmt(p2[0],1)+" "+fmt(p2[1],1);
  }
  return d;
}
function c32titrSVG(dir,xlab){
  var W=340,H=248;
  function X(v){return 52+v/100*262;}
  function Y(ph){return 212-(ph/14)*178;}
  var keys=(dir==="rising")?
    [[0,3.0],[18,4.0],[38,4.8],[50,5.8],[54,6.8],[58,9.0],[63,10.8],[82,11.9],[100,12.4]]:
    [[0,11.6],[18,10.6],[38,9.6],[50,8.4],[56,6.2],[59,5.0],[64,3.8],[82,2.8],[100,2.3]];
  var pts=keys.map(function(k){return [X(k[0]),Y(k[1])];});
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Titration curve">';
  [0,7,14].forEach(function(ph){
    out+='<line x1="52" y1="'+fmt(Y(ph),1)+'" x2="314" y2="'+fmt(Y(ph),1)+'" stroke="#cfe4d6" stroke-width="1"/>';
    out+=c32txt(42,Y(ph),String(ph),10.5,false,"end");
  });
  out+='<line x1="52" y1="24" x2="52" y2="212" stroke="#17352a" stroke-width="1.4"/>';
  out+='<line x1="52" y1="212" x2="314" y2="212" stroke="#17352a" stroke-width="1.4"/>';
  out+='<path d="'+c32smooth(pts)+'" fill="none" stroke="#17352a" stroke-width="2.2"/>';
  out+=c32txt(30,26,"pH",12,true);
  out+=c32txt(183,234,xlab,11.5,false);
  return out+'</svg>';
}
function c32heatSVG(){
  var W=340,H=238;
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Heating curve">';
  out+='<line x1="46" y1="20" x2="46" y2="200" stroke="#17352a" stroke-width="1.4"/>';
  out+='<line x1="46" y1="200" x2="318" y2="200" stroke="#17352a" stroke-width="1.4"/>';
  out+=c32txt(170,12,"Temperature",11.5,false);
  out+=c32txt(182,220,"Heat added",11.5,false);
  out+='<polyline points="58,188 100,152 158,152 208,96 266,96 310,58" fill="none" stroke="#17352a" stroke-width="2.2"/>';
  return out+'</svg>';
}
function c32cellSVG(lLab,lIon,rLab,rIon,saltLab){
  var W=360,H=254;
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Galvanic cell diagram">';
  out+='<rect x="37" y="140" width="116" height="73" fill="#dceef7"/>';
  out+='<rect x="207" y="140" width="116" height="73" fill="#dceef7"/>';
  out+='<path d="M128 152 L128 96 L232 96 L232 152" fill="none" stroke="#c98a2d" stroke-width="9" stroke-linecap="round" opacity="0.65"/>';
  out+='<path d="M35 108 L35 215 L155 215 L155 108" fill="none" stroke="#17352a" stroke-width="2"/>';
  out+='<path d="M205 108 L205 215 L325 215 L325 108" fill="none" stroke="#17352a" stroke-width="2"/>';
  out+='<rect x="86" y="52" width="13" height="104" fill="#b9c4cc" stroke="#17352a" stroke-width="1.6"/>';
  out+='<rect x="261" y="52" width="13" height="104" fill="#b9c4cc" stroke="#17352a" stroke-width="1.6"/>';
  out+='<path d="M92 52 L92 38 L267 38 L267 52" fill="none" stroke="#17352a" stroke-width="2"/>';
  out+='<circle cx="180" cy="38" r="13" fill="#ffffff" stroke="#17352a" stroke-width="1.8"/>';
  out+=c32txt(180,38,"V",12,true);
  out+=c32txt(180,82,saltLab,11.5,true);
  out+=c32txt(95,178,lIon,11,false);
  out+=c32txt(265,178,rIon,11,false);
  out+=c32txt(95,234,lLab,12,true);
  out+=c32txt(265,234,rLab,12,true);
  return out+'</svg>';
}
function c32electroSVG(name){
  var short=name.split(" (")[0];
  var W=340,H=254;
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Electrolytic cell diagram">';
  out+='<rect x="72" y="146" width="196" height="67" fill="#f3d9b0"/>';
  out+='<path d="M70 118 L70 215 L270 215 L270 118" fill="none" stroke="#17352a" stroke-width="2"/>';
  out+='<rect x="118" y="58" width="12" height="104" fill="#b9c4cc" stroke="#17352a" stroke-width="1.6"/>';
  out+='<rect x="208" y="58" width="12" height="104" fill="#b9c4cc" stroke="#17352a" stroke-width="1.6"/>';
  out+='<path d="M124 58 L124 40 L172 40" fill="none" stroke="#17352a" stroke-width="2"/>';
  out+='<path d="M188 40 L214 40 L214 58" fill="none" stroke="#17352a" stroke-width="2"/>';
  out+='<line x1="172" y1="25" x2="172" y2="55" stroke="#17352a" stroke-width="3"/>';
  out+='<line x1="188" y1="33" x2="188" y2="47" stroke="#17352a" stroke-width="6"/>';
  out+=c32txt(170,184,"Molten "+short,12,true);
  out+=c32txt(124,234,"Electrode",12,true);
  out+=c32txt(214,234,"Electrode",12,true);
  return out+'</svg>';
}

/* ============ Tranche 7 figures (Nov 2026) ============
   c32mbSVG draws the Maxwell-Boltzmann energy distribution at two
   temperatures from the stem, computed from the distribution itself
   with equal total areas; the activation energy line carries no value,
   and the fraction of successful collisions is deliberately not shaded,
   because judging that fraction is the question. c32eqConcSVG is a
   schematic concentration-time graph for a system reaching equilibrium:
   generic labels, no values, and the two plateaus deliberately unequal,
   because equal concentrations is one of the distractors. c32titrCalcSVG
   computes the strong acid and strong base curve point by point from
   the draw's own volumes and concentrations and marks the equivalence
   point where the calculation puts it; the volume axis carries no
   numbers, because that volume is the asked answer. c32titrDiproticSVG
   is the schematic two-jump diprotic shape (the bank supplies no Ka
   values, so no computed curve is possible), with both equivalence
   points at the volume fractions the stoichiometry fixes. c32beakerSVG
   shows only the setup a stem describes (strip and ion solution), never
   the outcome. c32plateSVG draws an electrolytic bath with labels taken
   from the stem; terminal marks appear only when the stem states them. */
function c32mbSVG(tLow,tHigh){
  var W=340,H=248,x0=52,x1=314,yb=212,yt=30,Emax=120,Ea=78;
  function X(e){return x0+e/Emax*(x1-x0);}
  function dist(e,tau){return Math.sqrt(Math.max(e,0.0001))*Math.exp(-e/tau);}
  function curve(tC){
    var tau=0.115*(tC+273),pts=[],area=0,prev=null,i,e,y;
    for(i=0;i<=120;i++){
      e=Emax*i/120; y=dist(e,tau);
      if(prev!==null)area+=(y+prev)/2*(Emax/120);
      prev=y; pts.push([e,y]);
    }
    var peak=0; pts.forEach(function(p){if(p[1]>peak)peak=p[1];});
    return {raw:pts,area:area,peak:peak,tau:tau};
  }
  var lo=curve(tLow),hi=curve(tHigh);
  var scale=(yb-yt-26)/Math.max(lo.peak/lo.area,hi.peak/hi.area);
  function ptsStr(c){
    return c.raw.map(function(p){
      return fmt(X(p[0]),1)+","+fmt(yb-(p[1]/c.area)*scale,2);
    }).join(" ");
  }
  function peakXY(c){
    var bp=c.raw[0]; c.raw.forEach(function(p){if(p[1]>bp[1])bp=p;});
    return [X(bp[0]),yb-(bp[1]/c.area)*scale];
  }
  var pkL=peakXY(lo),pkH=peakXY(hi);
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Maxwell-Boltzmann distribution curves at '+tLow+' and '+tHigh+' degrees Celsius" data-t1="'+tLow+'" data-t2="'+tHigh+'">';
  out+='<line x1="'+x0+'" y1="24" x2="'+x0+'" y2="'+yb+'" stroke="#17352a" stroke-width="1.4"/>';
  out+='<line x1="'+x0+'" y1="'+yb+'" x2="'+x1+'" y2="'+yb+'" stroke="#17352a" stroke-width="1.4"/>';
  out+='<line x1="'+fmt(X(Ea),1)+'" y1="34" x2="'+fmt(X(Ea),1)+'" y2="'+yb+'" stroke="#b3541e" stroke-width="1.6" stroke-dasharray="5 4"/>';
  out+=c32txt(X(Ea)+2,26,"Ea",11.5,true,"start","#b3541e");
  out+='<polyline class="mb-low" points="'+ptsStr(lo)+'" fill="none" stroke="#17352a" stroke-width="2.2"/>';
  out+='<polyline class="mb-high" points="'+ptsStr(hi)+'" fill="none" stroke="#2e7d4f" stroke-width="2.2"/>';
  out+=c32txt(pkL[0],pkL[1]-14,tLow+" \u00B0C",11.5,true);
  out+=c32txt(pkH[0]+16,pkH[1]-14,tHigh+" \u00B0C",11.5,true,"middle","#2e7d4f");
  out+=c32txt(30,26,"Number of particles",11,true);
  out+=c32txt(183,234,"Particle energy",11.5,false);
  return out+'</svg>';
}
function c32eqConcSVG(){
  var W=340,H=248,x0=52,x1=314,yb=212;
  function rp(x){return 150-92*Math.exp(-(x-x0)/52);}
  function pp(x){return 112+94*Math.exp(-(x-x0)/52);}
  var rPts=[],pPts=[],x;
  for(x=x0;x<=x1;x+=7){rPts.push(fmt(x,1)+","+fmt(rp(x),1)); pPts.push(fmt(x,1)+","+fmt(pp(x),1));}
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Concentration against time graph: reactant and product concentrations level off at equilibrium">';
  out+='<line x1="'+x0+'" y1="24" x2="'+x0+'" y2="'+yb+'" stroke="#17352a" stroke-width="1.4"/>';
  out+='<line x1="'+x0+'" y1="'+yb+'" x2="'+x1+'" y2="'+yb+'" stroke="#17352a" stroke-width="1.4"/>';
  out+='<polyline class="eq-react" points="'+rPts.join(" ")+'" fill="none" stroke="#17352a" stroke-width="2.2"/>';
  out+='<polyline class="eq-prod" points="'+pPts.join(" ")+'" fill="none" stroke="#2e7d4f" stroke-width="2.2"/>';
  out+=c32txt(268,164,"Reactants",11.5,true);
  out+=c32txt(268,100,"Products",11.5,true,"middle","#2e7d4f");
  out+=c32txt(30,26,"Concentration",11,true);
  out+=c32txt(183,234,"Time",11.5,false);
  return out+'</svg>';
}
function c32titrCalcSVG(va,ca,cb,vb){
  var W=340,H=248,x0=52,x1=314,yb=212;
  var vmax=Math.ceil(vb*1.6/5)*5;
  function X(v){return x0+v/vmax*(x1-x0);}
  function Y(ph){return yb-(ph/14)*178;}
  function pHat(v){
    var ex=ca*va-cb*v,tot=va+v,ph;
    if(ex>1e-9){ph=-Math.log10(ex/tot);}
    else if(ex<-1e-9){ph=14+Math.log10(-ex/tot);}
    else{ph=7;}
    return Math.max(0,Math.min(14,ph));
  }
  var pts=[],i,v;
  for(i=0;i<=80;i++){v=vmax*i/80; pts.push([X(v),Y(pHat(v))]);}
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Titration curve computed from the stated volumes and concentrations" data-eq-vb="'+fmt(vb,4)+'" data-vmax="'+vmax+'">';
  [0,7,14].forEach(function(ph){
    out+='<line x1="'+x0+'" y1="'+fmt(Y(ph),1)+'" x2="'+x1+'" y2="'+fmt(Y(ph),1)+'" stroke="#cfe4d6" stroke-width="1"/>';
    out+=c32txt(42,Y(ph),String(ph),10.5,false,"end");
  });
  out+='<line x1="'+x0+'" y1="24" x2="'+x0+'" y2="'+yb+'" stroke="#17352a" stroke-width="1.4"/>';
  out+='<line x1="'+x0+'" y1="'+yb+'" x2="'+x1+'" y2="'+yb+'" stroke="#17352a" stroke-width="1.4"/>';
  out+='<path d="'+c32smooth(pts)+'" fill="none" stroke="#17352a" stroke-width="2.2"/>';
  out+='<line x1="'+fmt(X(vb),1)+'" y1="'+fmt(Y(7),1)+'" x2="'+fmt(X(vb),1)+'" y2="'+yb+'" stroke="#b3541e" stroke-width="1.2" stroke-dasharray="4 3"/>';
  out+='<circle class="eq-dot" cx="'+fmt(X(vb),1)+'" cy="'+fmt(Y(7),1)+'" r="4.5" fill="#b3541e"/>';
  var anchorEnd=X(vb)>x0+(x1-x0)*0.52;
  out+=c32txt(anchorEnd?X(vb)-9:X(vb)+9,Y(7)-16,"equivalence point",11,true,anchorEnd?"end":"start","#b3541e");
  out+=c32txt(30,26,"pH",12,true);
  out+=c32txt(183,234,"Volume of base added",11.5,false);
  return out+'</svg>';
}
function c32titrDiproticSVG(vb2){
  var W=340,H=248,x0=52,x1=314,yb=212;
  var vmax=vb2*1.5;
  function X(v){return x0+v/vmax*(x1-x0);}
  function Y(ph){return yb-(ph/14)*178;}
  var keys=[[0,2.2],[0.2,3.4],[0.4,4.4],[0.48,5.0],[0.52,6.2],[0.7,7.0],[0.9,7.9],[0.97,8.6],[1.0,9.8],[1.05,11.0],[1.25,11.9],[1.5,12.3]];
  var pts=keys.map(function(k){return [X(k[0]*vb2),Y(k[1])];});
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schematic titration curve for a diprotic acid, with two equivalence points" data-vb2="'+fmt(vb2,4)+'">';
  [0,7,14].forEach(function(ph){
    out+='<line x1="'+x0+'" y1="'+fmt(Y(ph),1)+'" x2="'+x1+'" y2="'+fmt(Y(ph),1)+'" stroke="#cfe4d6" stroke-width="1"/>';
    out+=c32txt(42,Y(ph),String(ph),10.5,false,"end");
  });
  out+='<line x1="'+x0+'" y1="24" x2="'+x0+'" y2="'+yb+'" stroke="#17352a" stroke-width="1.4"/>';
  out+='<line x1="'+x0+'" y1="'+yb+'" x2="'+x1+'" y2="'+yb+'" stroke="#17352a" stroke-width="1.4"/>';
  out+='<path d="'+c32smooth(pts)+'" fill="none" stroke="#17352a" stroke-width="2.2"/>';
  out+='<circle class="eq-dot1" cx="'+fmt(X(vb2/2),1)+'" cy="'+fmt(Y(5.6),1)+'" r="4" fill="#b3541e"/>';
  out+='<circle class="eq-dot2" cx="'+fmt(X(vb2),1)+'" cy="'+fmt(Y(9.8),1)+'" r="4.5" fill="#b3541e"/>';
  out+=c32txt(X(vb2/2)-8,Y(5.6)-14,"first equivalence point",10.5,true,"end","#b3541e");
  out+=c32txt(X(vb2)+8,Y(9.8)-14,"second equivalence point",10.5,true,"start","#b3541e");
  out+=c32txt(30,26,"pH",12,true);
  out+=c32txt(183,234,"Volume of base added",11.5,false);
  return out+'</svg>';
}
function c32beakerSVG(stripMetal,ionLabel){
  var W=340,H=240;
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Beaker containing a solution of '+ionLabel+' ions, with a '+stripMetal+' strip dipping into it">';
  out+='<rect x="72" y="112" width="196" height="91" fill="#dceef7"/>';
  out+='<path d="M70 70 L70 205 L270 205 L270 70" fill="none" stroke="#17352a" stroke-width="2"/>';
  out+='<rect x="152" y="30" width="26" height="122" fill="#b9c4cc" stroke="#17352a" stroke-width="1.6"/>';
  out+=c32txt(165,18,stripMetal+" strip",12,true);
  out+=c32txt(170,182,ionLabel+" ions (aq)",11.5,false);
  out+=c32txt(170,226,"Metal strip in an ion solution",11,false);
  return out+'</svg>';
}
function c32plateSVG(lLab,rLab,solLab,lTag,rTag){
  var W=340,H=254;
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Electrolytic cell diagram">';
  out+='<rect x="72" y="146" width="196" height="67" fill="#dceef7"/>';
  out+='<path d="M70 118 L70 215 L270 215 L270 118" fill="none" stroke="#17352a" stroke-width="2"/>';
  out+='<rect x="118" y="58" width="12" height="104" fill="#b9c4cc" stroke="#17352a" stroke-width="1.6"/>';
  out+='<rect x="208" y="58" width="12" height="104" fill="#b9c4cc" stroke="#17352a" stroke-width="1.6"/>';
  out+='<path d="M124 58 L124 40 L172 40" fill="none" stroke="#17352a" stroke-width="2"/>';
  out+='<path d="M188 40 L214 40 L214 58" fill="none" stroke="#17352a" stroke-width="2"/>';
  out+='<line x1="172" y1="25" x2="172" y2="55" stroke="#17352a" stroke-width="3"/>';
  out+='<line x1="188" y1="33" x2="188" y2="47" stroke="#17352a" stroke-width="6"/>';
  out+=c32txt(170,12,"DC power supply",11,false);
  if(lTag)out+=c32txt(104,66,lTag,14,true,"end","#b3541e");
  if(rTag)out+=c32txt(236,66,rTag,14,true,"start","#b3541e");
  out+=c32txt(170,184,solLab,11.5,true);
  out+=c32txt(124,234,lLab,12,true);
  out+=c32txt(214,234,rLab,12,true);
  return out+'</svg>';
}

/* ---------- 5.1 Collision theory ---------- */

E("u1-51-collision-conditions",1,["5.1"],1,"gen",function(){
  var f=pick(["heat","concentrate","grind","catalyst"]);
  if(f==="heat"){
    var t1=ri(15,35),t2=t1+ri(15,40);
    return mcq("A reaction mixture is heated from "+t1+" \u00B0C to "+t2+" \u00B0C. What happens to the collisions between the reactant particles?",
      "They collide more often, and a larger fraction of the collisions have enough energy to react",
      ["They collide more often, but the fraction with enough energy to react stays the same",
       "They collide at the same rate, but each collision is weaker",
       "They collide less often, because the particles spread farther apart"],
      "Heating raises the average kinetic energy of the particles. They move faster, so collisions happen more often, and more importantly a larger fraction of those collisions reach the activation energy, so more of them are successful. They collide more often, and a larger fraction of the collisions have enough energy to react.",{f:f});
  }
  if(f==="concentrate"){
    var c1=pick([0.100,0.200,0.250,0.500]),c2=c1*2;
    return mcq("The concentration of a reactant in solution is raised from "+gF(c1)+" mol/L to "+gF(c2)+" mol/L. What happens to the collisions between the reactant particles?",
      "There are more particles in each litre, so collisions happen more often and successful collisions happen more often",
      ["Each particle has more energy, so the same number of collisions produces more reactions",
       "Collisions happen less often, because the particles get in each other's way",
       "Nothing changes, because concentration does not affect collisions"],
      "Doubling the concentration puts twice as many particles in the same volume. Particles meet more often, so both the total number of collisions and the number of successful collisions per second increase. There are more particles in each litre, so collisions happen more often and successful collisions happen more often.",{f:f});
  }
  if(f==="grind"){
    var m=ri(2,20);
    return mcq("A "+m+" g lump of a solid reactant is ground into a fine powder before it is added to a solution. What happens to the collisions between the reactant particles?",
      "Far more solid particles are exposed at the surface, so collisions with the solution happen far more often",
      ["The particles inside the lump gain energy and collide harder",
       "The powder particles are smaller, so each collision has less energy and fewer succeed",
       "Nothing changes, because the mass of solid is the same"],
      "Only particles at the surface of a solid can collide with particles in the solution. Grinding exposes far more particles at the surface, so collisions happen far more often and the reaction speeds up. Far more solid particles are exposed at the surface, so collisions with the solution happen far more often.",{f:f});
  }
  var cat=pick(["manganese(IV) oxide","iron filings","a platinum surface","copper(II) ions"]);
  return mcq(cat.charAt(0).toUpperCase()+cat.slice(1)+" is added as a catalyst. What happens to the collisions between the reactant particles?",
    "The collision rate is about the same, but a larger fraction of collisions succeed because the activation energy is lower",
    ["The particles collide far more often, because the catalyst pushes them together",
     "Each collision has more energy, because the catalyst heats the mixture",
     "Fewer collisions are needed because the catalyst is used up as the reaction proceeds"],
    "A catalyst does not change how often particles collide or how much energy they carry. It provides a different pathway with a lower activation energy, so a larger fraction of the collisions that do happen are successful. The collision rate is about the same, but a larger fraction of collisions succeed because the activation energy is lower.",{f:f});
});

E("u1-51-successful-collision",1,["5.1"],1,"var",varset([
  function(){
    return mcq("According to collision theory, a collision between two reactant particles produces a reaction only if the particles",
      "Collide with the correct orientation and with energy at least equal to the activation energy",
      ["Collide at exactly the same speed",
       "Collide any number of times in a row",
       "Are both in the gas state"],
      "Collision theory requires two things of a successful collision: the particles must meet in the correct orientation, and the energy of the collision must be at least the activation energy. Meeting either condition alone is not enough. A successful collision needs the correct orientation and energy at least equal to the activation energy.",{});
  },
  function(){
    return mcq("Two particles collide head-on with more than enough energy to react, but the wrong atoms touch first and nothing happens. Collision theory explains this because",
      "The collision had the wrong orientation, so it was not a successful collision",
      ["The particles needed to collide a second time",
       "The activation energy increased during the collision",
       "Energy alone always decides whether a collision succeeds"],
      "Energy is only half of the requirement. The particles must also meet with the correct orientation so that the right bonds can break and form. A high-energy collision with the wrong orientation is still an unsuccessful collision.",{});
  },
  function(){
    return mcq("The activation energy of a reaction is best described as",
      "The minimum collision energy needed for a collision to be successful",
      ["The total energy released by the reaction",
       "The energy of the products minus the energy of the reactants",
       "The average kinetic energy of the particles at room temperature"],
      "The activation energy is the energy barrier a collision must clear: only collisions with at least this much energy can succeed. It is not the overall energy change of the reaction, which is the difference between products and reactants.",{});
  },
  function(){
    return mcq("Most collisions between reactant particles in a typical reaction mixture do NOT lead to a reaction because",
      "Most collisions lack either the energy or the orientation needed to succeed",
      ["The particles are too far apart to collide at all",
       "Collisions destroy the reactant particles",
       "The particles bounce off each other without ever touching"],
      "Particles in a mixture collide constantly. Only a small fraction of those collisions combine enough energy, at least the activation energy, with the correct orientation. The rest simply bounce apart unchanged.",{});
  }
]));

E("u1-51-rate-explain",1,["5.1"],2,"var",varset([
  function(){
    var m=pick([2,3,5,8,10]);
    return mcq("A student reacts "+m+" g of zinc granules with dilute sulfuric acid, then repeats the experiment with "+m+" g of powdered zinc in the same acid at the same temperature. The powder reacts much faster. Which statement correctly explains this using collision theory?",
      "The powdered zinc exposes far more particles at its surface, so collisions between zinc and acid particles happen far more often, and successful collisions happen far more often",
      ["The surface area increased, and that is all that needs to be said",
       "The equilibrium shifts toward the products, so more product forms per second",
       "The powder lowers the activation energy of the reaction"],
      "A collision theory explanation has to talk about collisions: how often particles meet, and what fraction of the meetings succeed. Only surface particles of the zinc can collide with the acid, and the powder exposes far more of them, so successful collisions happen far more often. The powdered zinc exposes far more particles at its surface, so collisions happen far more often.",{});
  },
  function(){
    var t1=pick([20,22,25,28]),t2=pick([2,4,5]);
    return mcq("A cut potato left on a counter at "+t1+" \u00B0C browns within hours, while the same potato kept in a refrigerator at "+t2+" \u00B0C browns far more slowly. Which statement correctly explains this using collision theory?",
      "At the lower temperature the particles have less kinetic energy, so collisions happen less often and a smaller fraction of them reach the activation energy",
      ["The cold destroys the activation energy, so no collisions can succeed",
       "The equilibrium shifts toward the reactants in the cold, so browning stops",
       "The temperature changed, and that is all that needs to be said"],
      "A collision theory explanation has to talk about collisions. At the lower temperature the particles move more slowly and carry less energy: collisions are less frequent, and a smaller fraction of them reach the activation energy, so successful collisions and the rate both fall. At the lower temperature, successful collisions happen less often.",{});
  },
  function(){
    var v=pick([10,15,20,30]);
    return mcq("Hydrogen peroxide solution decomposes very slowly in a "+v+" mL bottle, but it bubbles vigorously when a drop of blood, which contains a natural catalyst, touches it on a cut. Which statement correctly explains this using collision theory?",
      "The catalyst gives the reaction a pathway with a lower activation energy, so a much larger fraction of the collisions are successful, even though collisions happen at about the same rate",
      ["The catalyst makes the particles collide far more often by stirring the mixture",
       "The catalyst is consumed, and being used up pulls the reaction forward",
       "The temperature rises, and that is all that needs to be said"],
      "A collision theory explanation has to talk about collisions and about what fraction of them succeed. The catalyst does not change the collision rate or the particle energies: it lowers the activation energy, so a much larger fraction of the collisions that occur are successful. The catalyst gives a pathway with a lower activation energy.",{});
  },
  function(){
    var f1=pick([2,3,4]),f2=f1*2;
    return mcq("A furnace burns natural gas steadily with the valve set so "+f1+" L of gas flows in per minute. The valve is opened so "+f2+" L per minute flows into the same burner volume, and the flame burns more vigorously. Which statement correctly explains this using collision theory?",
      "With more gas particles in the same volume, collisions between gas and oxygen particles happen more often, so successful collisions happen more often",
      ["Each gas particle now has more energy, so the same collisions succeed more often",
       "The equilibrium shifts toward the products, so more product forms per second",
       "The concentration changed, and that is all that needs to be said"],
      "A collision theory explanation has to talk about collisions. Doubling the number of particles in the same volume doubles how often they meet, so successful collisions happen more often and the rate rises. With more particles in the same volume, collisions happen more often.",{});
  },
  function(){
    var m=pick([1,2,3,5]);
    return mcq("An effervescent tablet of mass "+m+" g fizzes in water. A second, identical tablet is crushed to a powder first, and it fizzes away much faster. Which statement correctly explains this using collision theory?",
      "Crushing exposes far more particles at the surface of the tablet, so collisions between the tablet particles and water happen far more often",
      ["The powder has a lower activation energy than the tablet",
       "Crushing increases the temperature of the tablet particles",
       "The surface area increased, and that is all that needs to be said"],
      "A collision theory explanation has to talk about collisions. Only the surface particles of the tablet can meet the water, and crushing exposes far more of them, so collisions and successful collisions happen far more often. Crushing exposes far more particles at the surface, so collisions happen far more often.",{});
  }
]));

E("u1-51-temperature-effect",1,["5.1"],2,"gen",function(){
  var rise=pick([10,10,20]),factor=rise===20?"about four times":"about double";
  var base=ri(10,40);
  var q=mcq("For many reactions, raising the temperature from "+base+" \u00B0C by "+rise+" \u00B0C makes the reaction run "+factor+" as fast. Which statement best explains why the effect of temperature is so large?",
    "Particles collide slightly more often, but the main effect is that a much larger fraction of collisions reach the activation energy",
    ["Particles collide "+factor+" as often, and the fraction reaching the activation energy is unchanged",
     "The activation energy falls as temperature rises, so the same collisions succeed more easily",
     "The reaction becomes more exothermic at higher temperatures, so it releases energy faster"],
    "Collision frequency rises only modestly with temperature. The large effect comes from the energy distribution: at the higher temperature a much larger fraction of collisions carry at least the activation energy, so far more collisions succeed. Particles collide slightly more often, but the main effect is that a much larger fraction of collisions reach the activation energy.",{rise:rise,base:base});
  q.figure=c32mbSVG(base,base+rise);
  return q;
});

E("u1-51-catalyst-collision",1,["5.1"],2,"var",varset([
  function(){
    return mcq("Manganese(IV) oxide is added as a catalyst to the decomposition of hydrogen peroxide at a constant temperature. Which statement is correct?",
      "The catalyst provides a pathway with a lower activation energy, so a larger fraction of collisions are successful",
      ["The catalyst increases the kinetic energy of the particles, so collisions are harder",
       "The catalyst is slowly used up, which pulls the reaction forward",
       "The catalyst raises the temperature of the mixture, which speeds up the collisions"],
      "A catalyst works by giving the reaction a different mechanism whose activation energy is lower. The particles have the same energies as before, but now a larger fraction of their collisions clear the smaller barrier. The catalyst itself is regenerated, not used up. The catalyst provides a pathway with a lower activation energy, so a larger fraction of collisions are successful.",{});
  },
  function(){
    return mcq("Ethene reacts with hydrogen over a heated nickel catalyst. Which statement about the catalyst is correct?",
      "It lowers the activation energy, so more of the collisions between ethene and hydrogen succeed",
      ["It raises the kinetic energy of the gas particles",
       "It is converted into product as the reaction proceeds",
       "It works by increasing the pressure inside the reactor"],
      "The nickel surface gives the reaction a lower-energy pathway. Particle energies and collision frequency are set by temperature and concentration, not by the catalyst. The catalyst is not consumed. It lowers the activation energy, so more collisions succeed.",{});
  },
  function(){
    return mcq("A catalytic converter uses platinum to speed up the breakdown of nitrogen oxides in exhaust gases. The platinum speeds the reaction because",
      "It provides an alternative pathway with a lower activation energy",
      ["It heats the exhaust gases to a higher temperature",
       "It forces the gas particles to collide more violently",
       "It is gradually consumed, releasing energy as it goes"],
      "Catalysts act on the energy barrier, not on the particles. The platinum offers a route with a lower activation energy, so a larger fraction of collisions succeed at the same temperature. It provides an alternative pathway with a lower activation energy.",{});
  },
  function(){
    return mcq("Sulfur dioxide is converted to sulfur trioxide over a vanadium(V) oxide catalyst. Which statement is correct?",
      "With the catalyst present, a larger fraction of collisions have enough energy to react, because the barrier is lower",
      ["With the catalyst present, the particles collide more times per second",
       "With the catalyst present, each particle carries more kinetic energy",
       "With the catalyst present, the reaction needs no collisions at all"],
      "Temperature and concentration set how often particles collide and how much energy they carry. The catalyst changes the barrier: with a lower activation energy, more of the collisions that happen are successful. A larger fraction of collisions succeed, because the barrier is lower.",{});
  }
]));

/* ---------- 5.2 Factors that affect reaction rate ---------- */

E("u1-52-factor-effect",1,["5.2"],1,"var",varset([
  function(){
    return mcq("Which change will increase the rate of the reaction between marble chips and hydrochloric acid?",
      "Using smaller marble chips",
      ["Using larger marble chips","Diluting the acid with water","Cooling the acid in a fridge"],
      "Reaction rate is raised by anything that produces more successful collisions per second: higher temperature, higher concentration, more exposed surface area, or a catalyst. Only one of the listed changes does that here: <b>using smaller marble chips</b>, which increases the exposed surface area.",{});
  },
  function(){
    return mcq("Which change will increase the rate at which hydrogen peroxide solution decomposes?",
      "Warming the solution",
      ["Cooling the solution","Diluting the solution with water","Storing it in a larger bottle"],
      "Reaction rate is raised by anything that produces more successful collisions per second. Warming the solution gives the particles more energy, so a larger fraction of collisions succeed. The other changes slow the reaction down or do nothing.",{});
  },
  function(){
    return mcq("Which change will increase the rate of a reaction between two solutions?",
      "Using more concentrated solutions",
      ["Diluting both solutions","Cooling both solutions","Carrying out the reaction in a wider beaker"],
      "More concentrated solutions hold more particles per litre, so collisions happen more often. Diluting or cooling slows the reaction, and the width of the beaker changes nothing. <b>Using more concentrated solutions</b>.",{});
  },
  function(){
    return mcq("Which change will increase the rate at which a strip of magnesium reacts with an acid?",
      "Using a more concentrated acid",
      ["Using a shorter strip of magnesium","Cooling the acid","Adding water to the acid"],
      "A more concentrated acid puts more acid particles in each litre, so collisions with the magnesium surface happen more often. Cooling the acid or diluting it slows the reaction. <b>Using a more concentrated acid</b>.",{});
  },
  function(){
    return mcq("Which change will increase the rate of a slow reaction between two gases in a sealed vessel?",
      "Adding a suitable catalyst",
      ["Expanding the vessel to a larger volume","Cooling the vessel in ice water","Letting some of the gas escape"],
      "A catalyst lowers the activation energy, so a larger fraction of collisions succeed. Expanding the vessel lowers the concentration, cooling lowers the energy of the particles, and losing gas lowers the amount reacting. <b>Adding a suitable catalyst</b>.",{});
  }
]));

E("u1-52-rate-scenario",1,["5.2"],2,"gen",function(){
  var acid=pick(["hydrochloric acid","sulfuric acid","nitric acid"]);
  var metal=pick(["zinc","magnesium","iron"]);
  var hi=pick([1.00,2.00]),lo=hi/2,t1=ri(35,50),t2=ri(15,25);
  var sets=[
    {d:"powdered "+metal+", "+gF(hi)+" mol/L "+acid+", "+t1+" \u00B0C",rank:3},
    {d:"powdered "+metal+", "+gF(lo)+" mol/L "+acid+", "+t1+" \u00B0C",rank:2},
    {d:metal+" granules, "+gF(hi)+" mol/L "+acid+", "+t2+" \u00B0C",rank:1},
    {d:metal+" granules, "+gF(lo)+" mol/L "+acid+", "+t2+" \u00B0C",rank:0}
  ];
  var correct=sets[0].d;
  var ds=shuffle(sets.slice(1).map(function(x){return x.d;}));
  return mcq("Four experiments react "+metal+" with "+acid+" under different conditions. Which experiment has the fastest initial rate?",correct,ds,
    "Rate increases with surface area, concentration and temperature, and the first experiment is highest in all three: powdered metal (most surface), "+gF(hi)+" mol/L acid (most concentrated) and "+t1+" \u00B0C (warmest). It has the most successful collisions per second, so it is fastest.",{});
});

E("u1-52-not-a-factor",1,["5.2"],1,"var",varset([
  function(){
    return mcq("Which change will NOT affect the rate of a chemical reaction?",
      "Carrying out the reaction in a blue glass flask instead of a clear one",
      ["Raising the temperature of the reactants","Increasing the concentration of one reactant","Adding a catalyst"],
      "Rate depends on successful collisions: temperature, concentration, surface area and catalysts all change them. The colour of the glass touches none of these, so the rate is unaffected.",{});
  },
  function(){
    return mcq("Which change will NOT affect the rate of a chemical reaction?",
      "Stirring the finished product mixture after the reaction is complete",
      ["Grinding a solid reactant to a powder","Warming the reaction mixture","Using a more concentrated solution"],
      "Once the reaction is complete there are no reactant collisions left to change. Grinding, warming and concentrating all act on reactant collisions during the reaction.",{});
  },
  function(){
    return mcq("Which change will NOT affect the rate of a chemical reaction?",
      "Changing the colour of the indicator used to watch the reaction",
      ["Increasing the surface area of a solid reactant","Raising the temperature","Adding a catalyst"],
      "An indicator only reports on the reaction; it does not change the particles, their energies or their collisions. Surface area, temperature and catalysts all change the rate.",{});
  },
  function(){
    return mcq("Which change will NOT affect the rate of a chemical reaction?",
      "Doing the reaction on a taller bench",
      ["Crushing a solid reactant before adding it","Using a catalyst","Heating the reaction mixture"],
      "The height of the bench changes nothing about the reacting particles. Crushing, catalysts and heating all change the number of successful collisions per second.",{});
  }
]));

E("u1-52-initial-rate-compare",1,["5.2"],2,"gen",function(){
  var f=pick(["conc","temp","area"]);
  if(f==="conc"){
    var cA=pick([0.500,1.00,2.00]),cB=cA/2;
    return mcq("Experiment A uses "+gF(cA)+" mol/L acid and Experiment B uses "+gF(cB)+" mol/L of the same acid, with the same metal, mass and temperature. Which statement is correct?",
      "A has the faster initial rate, because more acid particles per litre means more frequent collisions",
      ["B has the faster initial rate, because its particles have more room to move",
       "Both rates are equal, because the same total amount of metal is present",
       "B has the faster initial rate, because dilute solutions react more completely"],
      "With everything else equal, the more concentrated acid has more particles in each litre, so collisions with the metal surface happen more often and the initial rate is higher. A has the faster initial rate, because more acid particles per litre means more frequent collisions.",{f:f});
  }
  if(f==="temp"){
    var tA=ri(40,60),tB=tA-ri(15,25);
    return mcq("Experiment A runs at "+tA+" \u00B0C and Experiment B at "+tB+" \u00B0C, with all other conditions identical. Which statement is correct?",
      "A has the faster initial rate, because a larger fraction of its collisions reach the activation energy",
      ["B has the faster initial rate, because cooler particles collide more gently and stick together",
       "Both rates are equal, because temperature changes only the amount of product",
       "B has the faster initial rate, because the activation energy is higher at lower temperatures"],
      "At the higher temperature the particles carry more energy, so a larger fraction of collisions reach the activation energy and succeed. A has the faster initial rate, because a larger fraction of its collisions reach the activation energy.",{f:f});
  }
  var mA=ri(2,6);
  return mcq("Experiment A uses "+mA+" g of a solid as one lump and Experiment B uses "+mA+" g of the same solid as a powder, in the same solution at the same temperature. Which statement is correct?",
    "B has the faster initial rate, because far more of its particles are exposed at the surface",
    ["A has the faster initial rate, because a lump holds its energy better",
     "Both rates are equal, because the masses of solid are the same",
     "A has the faster initial rate, because powder particles are too small to collide properly"],
    "Only surface particles of a solid can collide with the solution. The powder exposes far more particles, so collisions happen far more often even though the mass is identical. B has the faster initial rate, because far more of its particles are exposed at the surface.",{f:f});
});

E("u1-52-nature-of-reactants",1,["5.2"],2,"var",varset([
  function(){
    return mcq("Silver nitrate solution and sodium chloride solution react almost instantly when mixed, while a lump of coal takes hours to burn away. Which statement best explains the difference?",
      "The solutions already contain separated ions, so no bonds have to be broken before new ones form; the coal reaction must break strong bonds first",
      ["The solutions are liquids and liquids always react faster than solids",
       "The coal reaction is slower because coal is a darker colour",
       "The solutions contain a hidden catalyst that the coal lacks"],
      "The nature of the reactants matters because it decides what a collision has to accomplish. <b>The solutions already contain separated ions, so no bonds have to be broken before new ones form; the coal reaction must break strong bonds first</b>.",{});
  },
  function(){
    return mcq("A precipitation reaction between two solutions is over in seconds, but rusting of an iron gate takes years. Which statement best explains the difference?",
      "In the solutions the ions are already separated and free to collide, while rusting requires breaking bonds in the iron and in oxygen molecules",
      ["Rusting is slower because iron is a metal and metals do not react",
       "The precipitation involves more particles, and more particles always means a slower start",
       "The gate is outdoors, and outdoor reactions are always slower"],
      "The nature of the reactants matters because it decides what a collision has to accomplish. <b>In the solutions the ions are already separated and free to collide, while rusting requires breaking bonds in the iron and in oxygen molecules</b>.",{});
  },
  function(){
    return mcq("A mixture of hydrogen and oxygen gas can sit unchanged for years, yet a single spark makes it explode. Which statement best explains the very slow rate before the spark?",
      "The strong bonds in the hydrogen and oxygen molecules give the reaction a high activation energy, so almost no ordinary collisions succeed",
      ["The gases do not collide with each other at room temperature",
       "Hydrogen and oxygen are both nonpolar, so they cannot react",
       "The reaction is slow because the mixture is not concentrated enough"],
      "The particles collide constantly, but the activation energy is high because strong covalent bonds must break, so hardly any collisions succeed without the extra energy of a spark. <b>The strong bonds give the reaction a high activation energy</b>.",{});
  },
  function(){
    return mcq("Magnesium ribbon bursts into flame in oxygen, while a copper strip only tarnishes slowly in air over months. Which statement best explains the difference?",
      "The two metals differ in how readily their atoms give up electrons and form new bonds, so their collisions with oxygen succeed at very different rates",
      ["Copper is heavier, so its particles move too slowly to collide",
       "Magnesium reacts faster because it is a lighter colour",
       "Copper does not react with oxygen at all, so no comparison is possible"],
      "The nature of the reactants is itself a rate factor: different substances present different bonds and electron arrangements to a collision, so the fraction of successful collisions differs greatly. <b>The two metals differ in reactivity, so their collisions with oxygen succeed at very different rates</b>.",{});
  }
]));

/* ---------- 5.3 Potential energy diagrams ---------- */

E("u1-53-diagram-read",1,["5.3"],1,"gen",function(){
  var exo=Math.random()<0.6;
  var R=pick([40,50,60,80,100]),rise=pick([60,75,90,120,150]),P=R+rise;
  var Pr=exo?R-pick([20,30,45,70]):R+pick([15,25,40,55]);
  var ask=pick(["ea","earev","dh","type"]);
  var ea=P-R,earev=P-Pr,dh=Pr-R;
  var q;
  var desc="On a potential energy diagram, the reactants sit at "+R+" kJ, the top of the energy barrier is at "+P+" kJ, and the products sit at "+Pr+" kJ. ";
  if(ask==="ea")q=mcq(desc+"What is the activation energy of the forward reaction?",ea+" kJ",[earev+" kJ",Math.abs(dh)+" kJ",(P)+" kJ"],"The activation energy is the rise from the reactants to the top of the barrier: "+P+" kJ - "+R+" kJ = <b>"+ea+" kJ</b>.",{ask:ask});
  if(ask==="earev")q=mcq(desc+"What is the activation energy of the reverse reaction?",earev+" kJ",[ea+" kJ",Math.abs(dh)+" kJ",(P)+" kJ"],"The reverse activation energy is the rise from the products back to the top of the barrier: "+P+" kJ - "+Pr+" kJ = <b>"+earev+" kJ</b>.",{ask:ask});
  if(ask==="dh")q=mcq(desc+"What is the value of \u0394H for the forward reaction?",(dh>0?"+":"")+dh+" kJ",[(dh>0?"-":"+")+Math.abs(dh)+" kJ",ea+" kJ",earev+" kJ"],"\u0394H is the energy of the products minus the energy of the reactants: "+Pr+" kJ - "+R+" kJ = <b>"+(dh>0?"+":"")+dh+" kJ</b>. The sign is part of the answer.",{ask:ask});
  var correct=exo?"Exothermic, because the products are lower in energy than the reactants":"Endothermic, because the products are higher in energy than the reactants";
  var wrong=exo?"Endothermic, because the products are higher in energy than the reactants":"Exothermic, because the products are lower in energy than the reactants";
  if(ask==="type")q=mcq(desc+"How should the forward reaction be classified?",correct,[wrong,"Exothermic, because the barrier is high","Endothermic, because the barrier is low"],"Classification follows the relative energies of reactants and products, not the height of the barrier. <b>"+correct+"</b>.",{ask:ask});
  q.figure=c32peSVG(R,P,Pr,{r:"Reactants: "+R+" kJ",k:"Barrier top: "+P+" kJ",p:"Products: "+Pr+" kJ"});
  return q;
});

E("u1-53-ea-reverse",1,["5.3"],2,"gen",function(){
  var ea=pick([50,64,80,95,120,145,180,210]);
  var dh=pick([-160,-120,-85,-60,-40,-25,30,45,70,110]);
  if(dh>0&&dh>=ea)dh=ea-25;
  var earev=sfR(ea-dh,4);
  var ans=sfR(earev,3);
  var q=numq("A reaction has an activation energy of "+ea+" kJ for the forward reaction and \u0394H = "+(dh>0?"+":"")+dh+" kJ. Calculate the activation energy of the reverse reaction. Give your answer in kJ.",
    ans,Math.max(1,Math.abs(ans)*0.02),
    "The reverse barrier is measured from the products. On the diagram, Ea(reverse) = Ea(forward) - \u0394H = "+ea+" kJ - ("+(dh>0?"+":"")+dh+" kJ) = "+iF(earev)+" kJ. The activation energy of the reverse reaction is <b>"+F3(ans)+" kJ</b>.",{ea:ea,dh:dh});
  q.figure=c32peSVG(0,ea,dh,{r:"Reactants",p:"Products",ea:"Ea (forward) = "+ea+" kJ",dh:"\u0394H = "+(dh>0?"+":"")+dh+" kJ"});
  return q;
});

E("u1-53-delta-h",1,["5.3"],2,"gen",function(){
  var R=pick([120,150,200,240,300,360]);
  var d=pick([-95,-70,-55,-40,-28,35,50,65,90]);
  var Pr=R+d;
  var ans=sfR(d,3);
  var q=numq("On a potential energy diagram the reactants of a reaction sit at "+R+" kJ and the products sit at "+Pr+" kJ. Calculate \u0394H for the reaction. Give your answer in kJ.",
    ans,1,
    "\u0394H = energy of products - energy of reactants = "+Pr+" kJ - "+R+" kJ = "+(d>0?"+":"")+iF(d)+" kJ. So \u0394H = <b>"+(d>0?"+":"")+F3(d)+" kJ</b>"+(d<0?", and the reaction is exothermic.":", and the reaction is endothermic."),{R:R,Pr:Pr});
  q.figure=c32peSVG(R,Math.max(R,Pr)+60,Pr,{r:"Reactants: "+R+" kJ",p:"Products: "+Pr+" kJ"});
  return q;
});

E("u1-53-exo-endo",1,["5.3"],1,"var",varset([
  function(){
    var dh=pick([-184,-112,-57,-286,-890]);
    var q=mcq("A reaction has \u0394H = "+dh+" kJ. Which statement is correct?",
      "The reaction is exothermic and the surroundings warm up",
      ["The reaction is endothermic and the surroundings warm up","The reaction is exothermic and the surroundings cool down","The reaction is endothermic and the surroundings cool down"],
      "A negative \u0394H means the products hold less energy than the reactants; the difference is released to the surroundings, which warm up. The reaction is exothermic.",{dh:dh}); q.figure=c32peSVG(0,Math.max(0,dh)+60,dh,{r:"Reactants",p:"Products",dh:"\u0394H = "+dh+" kJ"}); return q;
  },
  function(){
    var dh=pick([44,57,92,131,178]);
    var q=mcq("A reaction has \u0394H = +"+dh+" kJ. Which statement is correct?",
      "The reaction is endothermic and the surroundings cool down",
      ["The reaction is exothermic and the surroundings cool down","The reaction is endothermic and the surroundings warm up","The reaction is exothermic and the surroundings warm up"],
      "A positive \u0394H means the products hold more energy than the reactants; the extra energy is taken in from the surroundings, which cool down. The reaction is endothermic.",{dh:dh}); q.figure=c32peSVG(0,Math.max(0,dh)+60,dh,{r:"Reactants",p:"Products",dh:"\u0394H = +"+dh+" kJ"}); return q;
  },
  function(){
    return mcq("In an experiment, a reacting mixture makes the beaker feel cold. Which statement is correct?",
      "The reaction is endothermic: it takes in energy from the surroundings",
      ["The reaction is exothermic: it gives out energy to the surroundings","The reaction is endothermic: it gives out energy to the surroundings","The reaction is exothermic: it takes in energy from the surroundings"],
      "The beaker feels cold because the reaction is drawing energy out of its surroundings, including the glass and your hand. Taking in energy is endothermic.",{});
  },
  function(){
    var rise=pick([3,5,8,12]);
    return mcq("When two solutions are mixed in a foam cup, the temperature of the mixture rises by "+rise+" \u00B0C. Which statement is correct?",
      "The reaction is exothermic: it gives out energy to the surroundings",
      ["The reaction is endothermic: it gives out energy to the surroundings","The reaction is exothermic: it takes in energy from the surroundings","No energy change occurred, because the cup is insulated"],
      "The surroundings, here the solution itself, gained energy, so the reaction must have released it. Releasing energy is exothermic.",{rise:rise});
  }
]));

E("u1-53-catalyst-diagram",1,["5.3"],2,"gen",function(){
  var drop=pick([20,30,40,55,70]);
  var peak=pick([90,120,150,180,210,240,280,320]);
  var t=ri(15,35);
  var q=mcq("At "+t+" \u00B0C, a catalyst is added to a reaction whose potential energy diagram has its barrier peak at "+peak+" kJ. With the catalyst, the top of the barrier drops by "+drop+" kJ. What happens to \u0394H and to the activation energy of the reverse reaction?",
    "\u0394H is unchanged, and the reverse activation energy also drops by "+drop+" kJ",
    ["\u0394H drops by "+drop+" kJ, and the reverse activation energy is unchanged",
     "\u0394H is unchanged, and the reverse activation energy rises by "+drop+" kJ",
     "Both \u0394H and the reverse activation energy rise by "+drop+" kJ"],
    "A catalyst lowers the peak of the diagram but moves neither the reactant level nor the product level, so \u0394H, the gap between those levels, is unchanged. Both the forward and reverse barriers are measured to the same peak, so both drop by "+drop+" kJ. \u0394H is unchanged, and the reverse activation energy also drops by "+drop+" kJ.",{drop:drop});
  q.figure=c32catSVG(peak,drop);
  return q;
});

E("u1-53-activated-complex",1,["5.3"],1,"var",varset([
  function(){
    var q=mcq("The activated complex in a reaction is best described as",
      "The unstable, high-energy arrangement of atoms at the top of the energy barrier",
      ["The final product of the reaction before it cools down",
       "The catalyst while it is attached to a reactant",
       "The mixture of reactants before any collisions happen"],
      "As a successful collision proceeds, the particles pass through a short-lived, high-energy arrangement called the activated complex, at the peak of the potential energy diagram. From there the arrangement falls apart into products, or back into reactants.",{}); q.figure=c32peSVG(0,80,-35,{r:"Reactants",p:"Products"}); return q;
  },
  function(){
    var q=mcq("On a potential energy diagram, the activated complex is located",
      "At the highest point of the curve, between reactants and products",
      ["At the starting level of the reactants",
       "At the final level of the products",
       "Below the axis, where the energy is negative"],
      "The curve climbs from the reactants as bonds stretch, reaches its maximum at the activated complex, then falls toward the products. The activated complex sits at the highest point of the curve.",{}); q.figure=c32peSVG(0,80,-35,{r:"Reactants",p:"Products"}); return q;
  },
  function(){
    var q=mcq("Which statement about the activated complex is correct?",
      "It can fall apart into either the products or back into the reactants",
      ["It always goes on to form products",
       "It is a stable substance that can be bottled and stored",
       "It only forms when a catalyst is present"],
      "The activated complex is a transition state, not a stable substance. It exists for an instant at the top of the barrier and then breaks apart, forward into products or backward into reactants.",{}); q.figure=c32peSVG(0,80,-35,{r:"Reactants",p:"Products"}); return q;
  }
]));

/* ---------- 5.4 Reaction mechanisms and catalysts ---------- */

var MECHS=[
  {steps:["NO\u2082(g) + NO\u2082(g) \u2192 NO\u2083(g) + NO(g)","NO\u2083(g) + CO(g) \u2192 NO\u2082(g) + CO\u2082(g)"],inter:"NO\u2083",cat:null,overall:"NO\u2082(g) + CO(g) \u2192 NO(g) + CO\u2082(g)",wrong:["NO\u2083(g) + CO(g) \u2192 NO(g) + CO\u2082(g)","2 NO\u2082(g) + CO(g) \u2192 NO\u2083(g) + NO(g) + CO\u2082(g)","NO\u2082(g) + CO(g) \u2192 NO\u2083(g)"]},
  {steps:["O\u2083(g) \u2192 O\u2082(g) + O(g)","O(g) + O\u2083(g) \u2192 2 O\u2082(g)"],inter:"O",cat:null,overall:"2 O\u2083(g) \u2192 3 O\u2082(g)",wrong:["O\u2083(g) \u2192 O\u2082(g) + O(g)","O\u2083(g) + O(g) \u2192 2 O\u2082(g)","3 O\u2083(g) \u2192 4 O\u2082(g)"]},
  {steps:["H\u2082(g) + ICl(g) \u2192 HI(g) + HCl(g)","HI(g) + ICl(g) \u2192 HCl(g) + I\u2082(g)"],inter:"HI",cat:null,overall:"H\u2082(g) + 2 ICl(g) \u2192 2 HCl(g) + I\u2082(g)",wrong:["H\u2082(g) + ICl(g) \u2192 HI(g) + HCl(g)","H\u2082(g) + 2 ICl(g) \u2192 HI(g) + HCl(g) + I\u2082(g)","2 H\u2082(g) + 2 ICl(g) \u2192 2 HCl(g) + I\u2082(g)"]}
];
var CATMECHS=[
  {steps:["Ce\u2074\u207A(aq) + Mn\u00B2\u207A(aq) \u2192 Ce\u00B3\u207A(aq) + Mn\u00B3\u207A(aq)","Mn\u00B3\u207A(aq) + Tl\u207A(aq) \u2192 Mn\u00B2\u207A(aq) + Tl\u00B3\u207A(aq)"],cat:"Mn\u00B2\u207A",inter:"Mn\u00B3\u207A",note:"Mn\u00B2\u207A is consumed in the first step and regenerated in the second, which is the behaviour of a catalyst"},
  {steps:["I\u207B(aq) + H\u2082O\u2082(aq) \u2192 IO\u207B(aq) + H\u2082O(l)","IO\u207B(aq) + H\u2082O\u2082(aq) \u2192 I\u207B(aq) + H\u2082O(l) + O\u2082(g)"],cat:"I\u207B",inter:"IO\u207B",note:"I\u207B is consumed in the first step and regenerated in the second, which is the behaviour of a catalyst"},
  {steps:["Fe\u00B3\u207A(aq) + S\u2082O\u2083\u00B2\u207B(aq) \u2192 Fe\u00B2\u207A(aq) + S\u2082O\u2083\u207B(aq)","Fe\u00B2\u207A(aq) + S\u2082O\u2088\u00B2\u207B(aq) \u2192 Fe\u00B3\u207A(aq) + SO\u2084\u00B2\u207B(aq) + S\u2082O\u2083\u00B2\u207B(aq)"],cat:"Fe\u00B3\u207A",inter:"Fe\u00B2\u207A",note:"Fe\u00B3\u207A is consumed in the first step and regenerated in the second, which is the behaviour of a catalyst"}
];

E("u1-54-intermediate",1,["5.4"],2,"gen",function(){
  var m=pick(MECHS);
  var t=ri(15,95);
  var pool=["NO\u2082","CO\u2082","O\u2082","HCl","I\u2082","NO","CO"];
  var ds=shuffle(pool.filter(function(x){return x!==m.inter;})).slice(0,3);
  return mcq("At "+t+" \u00B0C, a reaction proceeds by the mechanism:\nStep 1: "+m.steps[0]+"\nStep 2: "+m.steps[1]+"\nWhich species is a reaction intermediate?",
    m.inter,ds,
    "An intermediate is produced in one step and consumed in a later step, so it does not appear in the overall reaction. Here "+m.inter+" is formed in step 1 and used up in step 2. The reaction intermediate is <b>"+m.inter+"</b>.",{});
});

E("u1-54-catalyst-identify",1,["5.4"],2,"gen",function(){
  var m=pick(CATMECHS);
  var t=ri(15,95);
  var ds=[m.inter,"H\u2082O","the product of the final step"];
  return mcq("At "+t+" \u00B0C, a reaction proceeds by the mechanism:\nStep 1: "+m.steps[0]+"\nStep 2: "+m.steps[1]+"\nWhich species acts as the catalyst?",
    m.cat,ds,
    "A catalyst takes part in the mechanism but is regenerated by the end, so it appears as a reactant early and as a product later. "+m.note+". The catalyst is <b>"+m.cat+"</b>.",{});
});

E("u1-54-rds",1,["5.4"],2,"gen",function(){
  var slowFirst=Math.random()<0.5;
  var m=pick(MECHS);
  var t=ri(15,95);
  var steps=slowFirst?["Step 1 (slow): "+m.steps[0],"Step 2 (fast): "+m.steps[1]]:["Step 1 (fast): "+m.steps[0],"Step 2 (slow): "+m.steps[1]];
  var ask=pick(["which","change"]);
  if(ask==="which"){
    return mcq("At "+t+" \u00B0C, a mechanism is proposed:\n"+steps[0]+"\n"+steps[1]+"\nWhich step is the rate-determining step?",
      slowFirst?"Step 1, the slow step":"Step 2, the slow step",
      [slowFirst?"Step 2, the slow step":"Step 1, the slow step","Both steps equally, because both are needed","Whichever step produces the intermediate"],
      "The slowest step in a mechanism limits the speed of the whole process, in the same way that the slowest vehicle sets the pace of a convoy. The rate-determining step is the slow step.",{});
  }
  var species=slowFirst?"a reactant in step 1":"a reactant in step 2";
  return mcq("At "+t+" \u00B0C, a mechanism is proposed:\n"+steps[0]+"\n"+steps[1]+"\nThe concentration of "+species+" is doubled. What happens to the overall rate?",
    "The overall rate increases, because that species takes part in the rate-determining step",
    ["The overall rate is unchanged, because only the fastest step responds to concentration",
     "The overall rate decreases, because the steps become unbalanced",
     "The overall rate doubles exactly, no matter which step is slow"],
    "Only the rate-determining (slow) step controls the overall rate. A species in that step appears in the rate law, so raising its concentration speeds the whole reaction. The overall rate increases, because that species takes part in the rate-determining step.",{});
});

E("u1-54-overall-reaction",1,["5.4"],2,"gen",function(){
  var m=pick(MECHS);
  var t=ri(15,95);
  return mcq("At "+t+" \u00B0C, a reaction proceeds by the mechanism:\nStep 1: "+m.steps[0]+"\nStep 2: "+m.steps[1]+"\nWhat is the overall reaction?",
    m.overall,m.wrong,
    "Add the steps together, then cancel any species that appears on both sides. The intermediate cancels completely, leaving the overall reaction: <b>"+m.overall+"</b>.",{});
});

E("u1-54-mechanism-analysis",1,["5.4"],3,"var",varset([
  function(){
    return mcq("A reaction proceeds by the mechanism:\nStep 1: A + B \u2192 C + D (fast)\nStep 2: C + E \u2192 F + G (slow)\nStep 3: D + H \u2192 F + A (fast)\nA student claims that doubling the concentration of B will noticeably speed up the overall reaction, because B is a reactant in the first step. Is the claim correct?",
      "No. The first step is fast, and the overall rate is set by the slow second step, in which B does not appear",
      ["Yes. Every reactant in the mechanism appears in the rate law",
       "Yes. Doubling any reactant concentration always doubles the overall rate",
       "No. Changing any concentration has no effect once a mechanism has more than one step"],
      "The overall rate is governed by the rate-determining step, here the slow second step. Species that appear only in fast steps do not appear in the rate law, so changing [B] has a negligible effect on the overall rate. The claim is not correct.",{});
  },
  function(){
    return mcq("A reaction proceeds by the mechanism:\nStep 1: A + B \u2192 C + D (fast)\nStep 2: C + E \u2192 F + G (slow)\nStep 3: D + H \u2192 F + A (fast)\nWhich species is an intermediate, and which step is rate-determining?",
      "C is the intermediate, and step 2 is rate-determining",
      ["C is the intermediate, and step 1 is rate-determining",
       "E is the intermediate, and step 2 is rate-determining",
       "B is the catalyst, and step 3 is rate-determining"],
      "An intermediate is made in one step and consumed in another: C is produced in step 1 and consumed in step 2. (A appears as a reactant in step 1 and a product in step 3, which makes A the catalyst, not B.) The rate-determining step is the slow step, step 2. <b>C is the intermediate, and step 2 is rate-determining</b>.",{});
  },
  function(){
    return mcq("A reaction proceeds by the mechanism:\nStep 1: P + Q \u2192 R + S (fast)\nStep 2: R + T \u2192 U + V (slow)\nStep 3: S + W \u2192 U + P (fast)\nA student claims that doubling the concentration of Q will noticeably speed up the overall reaction, because Q is a reactant in the first step. Is the claim correct?",
      "No. The first step is fast, and the overall rate is set by the slow second step, in which Q does not appear",
      ["Yes. Every reactant in the mechanism appears in the rate law",
       "Yes. Doubling any reactant concentration always doubles the overall rate",
       "No. A three-step mechanism has no rate-determining step"],
      "The overall rate is governed by the rate-determining step, here the slow second step. Species that appear only in fast steps do not appear in the rate law, so changing [Q] has a negligible effect on the overall rate. The claim is not correct.",{});
  },
  function(){
    return mcq("A reaction proceeds by the mechanism:\nStep 1: P + Q \u2192 R + S (fast)\nStep 2: R + T \u2192 U + V (slow)\nStep 3: S + W \u2192 U + P (fast)\nWhich species is an intermediate, and which step is rate-determining?",
      "R is the intermediate, and step 2 is rate-determining",
      ["R is the intermediate, and step 1 is rate-determining",
       "T is the intermediate, and step 2 is rate-determining",
       "Q is the catalyst, and step 3 is rate-determining"],
      "An intermediate is made in one step and consumed in another: R is produced in step 1 and consumed in step 2. (P appears as a reactant in step 1 and a product in step 3, which makes P the catalyst, not Q.) The rate-determining step is the slow step, step 2. <b>R is the intermediate, and step 2 is rate-determining</b>.",{});
  }
]));

/* ---------- 5.5 Dynamic equilibrium ---------- */

E("u1-55-equilibrium-state",1,["5.5"],1,"gen",function(){
  var rxn=pick(["N\u2082O\u2084(g) \u21CC 2 NO\u2082(g)","H\u2082(g) + I\u2082(g) \u21CC 2 HI(g)","2 SO\u2082(g) + O\u2082(g) \u21CC 2 SO\u2083(g)","PCl\u2085(g) \u21CC PCl\u2083(g) + Cl\u2082(g)"]);
  var t=pick([25,80,150,200,250,300,350,400,450,500,550,600,700,800,1000]);
  var q=mcq("The reaction "+rxn+" has reached equilibrium in a sealed container at "+t+" \u00B0C. Which statement correctly describes the system?",
    "The forward and reverse reactions continue at equal rates, so the concentrations stay constant",
    ["Both reactions have stopped, so the concentrations stay constant",
     "The concentrations of reactants and products are equal",
     "The forward reaction continues but the reverse reaction has stopped"],
    "Equilibrium is dynamic: both reactions keep running, but at equal rates, so there is no net change. Concentrations stay constant, but they are not necessarily equal to each other. The forward and reverse reactions continue at equal rates, so the concentrations stay constant.",{rxn:rxn});
  q.figure=c32eqConcSVG();
  return q;
});

E("u1-55-not-equilibrium",1,["5.5"],2,"var",varset([
  function(){
    return mcq("Which statement about a system at equilibrium is FALSE?",
      "At equilibrium, the concentration of the reactants equals the concentration of the products",
      ["At equilibrium, the rates of the forward and reverse reactions are equal","At equilibrium, the concentrations of reactants and products stop changing","At equilibrium, both reactions continue to occur"],
      "The false statement is the common misconception: at equilibrium the concentrations are constant, but they are equal only by coincidence. Equilibrium means equal rates, not equal concentrations.",{});
  },
  function(){
    return mcq("Which statement about a system at equilibrium is FALSE?",
      "At equilibrium, the forward reaction stops once the reverse reaction begins",
      ["At equilibrium, the forward and reverse reactions occur at the same rate","At equilibrium, no net change is observed in the concentrations","At equilibrium, the system must be in a closed container"],
      "The false statement claims a reaction stops. At equilibrium both reactions continue indefinitely at equal rates; that is what dynamic equilibrium means.",{});
  },
  function(){
    return mcq("Which statement about a system at equilibrium is FALSE?",
      "A system at equilibrium shows constant concentrations because all particle movement has stopped",
      ["A system at equilibrium shows constant concentrations because the two reaction rates are equal","A system at equilibrium continues to react in both directions","A system at equilibrium must be closed so nothing escapes"],
      "Particle movement never stops. The concentrations are constant because the forward and reverse reactions proceed at equal rates, not because anything has frozen.",{});
  },
  function(){
    return mcq("Which statement about a system at equilibrium is FALSE?",
      "Adding a catalyst shifts the equilibrium toward the products",
      ["A catalyst does not change the value of K","A catalyst speeds up the forward and reverse reactions equally","A catalyst helps the system reach equilibrium sooner"],
      "A catalyst speeds both directions equally, so it cannot shift the position of equilibrium or change K. The false statement is the claim that it shifts the equilibrium toward the products.",{});
  }
]));

E("u1-55-attain-direction",1,["5.5"],2,"gen",function(){
  var rxn=pick(["2 NO\u2082(g) \u21CC N\u2082O\u2084(g)","CO(g) + H\u2082O(g) \u21CC CO\u2082(g) + H\u2082(g)","N\u2082(g) + 3 H\u2082(g) \u21CC 2 NH\u2083(g)"]);
  var c0=pick([0.100,0.250,0.400,0.500,0.800,1.00]),vol=pick([0.500,1.00,2.00,5.00,10.0]);
  return mcq("Only reactants, at an initial concentration of "+gF(c0)+" mol/L, are placed in a sealed "+gF(vol)+" L container for the reaction "+rxn+". Which statement describes the rates as the system moves toward equilibrium?",
    "The forward rate starts at its maximum and decreases, while the reverse rate starts at zero and increases, until the two are equal",
    ["The forward rate starts at zero and increases, while the reverse rate decreases from its maximum",
     "Both rates increase steadily until they suddenly become equal",
     "The forward rate stays constant and the reverse rate stays at zero until equilibrium"],
    "At the start there are no products, so the reverse rate is zero and the forward rate is at its highest. As products build up the reverse rate grows and the forward rate falls, until the two meet at equilibrium. The forward rate starts at its maximum and decreases, while the reverse rate starts at zero and increases, until the two are equal.",{rxn:rxn});
});

E("u1-55-closed-system",1,["5.5"],1,"var",varset([
  function(){
    return mcq("A fizzy drink in an open glass eventually goes flat and stays flat, while the same drink in a sealed bottle stays fizzy. The sealed bottle can reach equilibrium because",
      "It is a closed system, so the carbon dioxide cannot escape and the reverse process can balance the forward one",
      ["The bottle is stronger than the glass",
       "The drink in the bottle is colder",
       "Pressure cannot build up in a sealed bottle"],
      "Equilibrium needs a closed system: matter must not leave, so the reverse process can catch up with the forward one. In the open glass the gas escapes and no balance is reached. It is a closed system, so the carbon dioxide cannot escape and the reverse process can balance the forward one.",{});
  },
  function(){
    return mcq("Which system could reach a state of equilibrium?",
      "Water and its vapour sealed inside a closed bottle at a constant temperature",
      ["Water boiling in an open pot",
       "A candle burning in an open room",
       "Exhaust fumes leaving the tailpipe of a car"],
      "Equilibrium requires a closed system at constant conditions, with both the forward and reverse processes able to occur. Only the sealed bottle qualifies: evaporation and condensation can balance there.",{});
  },
  function(){
    return mcq("For a reversible reaction to reach equilibrium, the container must be closed. The reason is that",
      "In an open container, products or reactants escape, so the reverse reaction can never balance the forward reaction",
      ["Equilibrium can only happen in glass containers",
       "A closed container keeps the temperature exactly at 25 \u00B0C",
       "Closing the container stops all molecular motion, which freezes the balance"],
      "If a substance can leave the system, its concentration keeps falling and the two rates can never become equal. A closed container keeps everything in, so balance is possible. Molecular motion never stops.",{});
  }
]));

E("u1-55-dynamic-meaning",1,["5.5"],2,"gen",function(){
  var t=ri(5,60),dur=pick(["a week","two weeks","a month","three months"]);
  return mcq("A sealed flask containing an equilibrium mixture is left undisturbed at "+t+" \u00B0C for "+dur+". A student says nothing is happening inside the flask. Which response is correct?",
    "The student is wrong: both reactions continue at equal rates, but because the rates are equal there is no net change to observe",
    ["The student is right: at equilibrium all reaction stops",
     "The student is wrong: the forward reaction continues alone, very slowly",
     "The student is right: the concentrations are equal, so the reactions cancel out and stop"],
    "Equilibrium is dynamic, not static. Forward and reverse reactions continue at the molecular level at equal rates; the concentrations stay constant because the two processes balance, not because they have stopped. The student is wrong.",{t:t});
});

/* ---------- 5.6 The equilibrium constant ---------- */

var KEQ=[
  {eq:"N\u2082(g) + 3 H\u2082(g) \u21CC 2 NH\u2083(g)",k:"K = [NH\u2083]\u00B2 / ([N\u2082][H\u2082]\u00B3)",w:["K = [N\u2082][H\u2082]\u00B3 / [NH\u2083]\u00B2","K = 2[NH\u2083] / (3[H\u2082] + [N\u2082])","K = [NH\u2083] / ([N\u2082][H\u2082])"]},
  {eq:"2 SO\u2082(g) + O\u2082(g) \u21CC 2 SO\u2083(g)",k:"K = [SO\u2083]\u00B2 / ([SO\u2082]\u00B2[O\u2082])",w:["K = [SO\u2082]\u00B2[O\u2082] / [SO\u2083]\u00B2","K = 2[SO\u2083] / (2[SO\u2082] + [O\u2082])","K = [SO\u2083] / ([SO\u2082][O\u2082])"]},
  {eq:"H\u2082(g) + I\u2082(g) \u21CC 2 HI(g)",k:"K = [HI]\u00B2 / ([H\u2082][I\u2082])",w:["K = [H\u2082][I\u2082] / [HI]\u00B2","K = 2[HI] / ([H\u2082] + [I\u2082])","K = [HI] / ([H\u2082][I\u2082])"]},
  {eq:"PCl\u2085(g) \u21CC PCl\u2083(g) + Cl\u2082(g)",k:"K = [PCl\u2083][Cl\u2082] / [PCl\u2085]",w:["K = [PCl\u2085] / ([PCl\u2083][Cl\u2082])","K = [PCl\u2083] + [Cl\u2082] - [PCl\u2085]","K = [PCl\u2083][Cl\u2082] / [PCl\u2085]\u00B2"]},
  {eq:"N\u2082O\u2084(g) \u21CC 2 NO\u2082(g)",k:"K = [NO\u2082]\u00B2 / [N\u2082O\u2084]",w:["K = [N\u2082O\u2084] / [NO\u2082]\u00B2","K = 2[NO\u2082] / [N\u2082O\u2084]","K = [NO\u2082] / [N\u2082O\u2084]"]}
];

E("u1-56-write-k",1,["5.6"],2,"gen",function(){
  var e=pick(KEQ);
  var t=pick([25,100,200,300,400,450,500,600,700,800,900,1000]);
  return mcq("At "+t+" \u00B0C, the reaction "+e.eq+" is at equilibrium. Which expression gives the equilibrium constant?",
    e.k,e.w,
    "The K expression is the product of the product concentrations divided by the product of the reactant concentrations, with each concentration raised to the power of its coefficient in the balanced equation. <b>"+e.k+"</b>.",{eq:e.eq});
});

E("u1-56-k-value-meaning",1,["5.6"],1,"gen",function(){
  var big=Math.random()<0.5;
  var exp=big?ri(3,12):-ri(3,12);
  var kv=pick(["1.2","2.5","3.8","4.0","6.7","8.9"])+" \u00D7 10"+sfSup(exp);
  if(big){
    return mcq("At a certain temperature, a reaction has K = "+kv+". Which statement is correct?",
      "At equilibrium the products are strongly favoured: product concentrations are much larger than reactant concentrations",
      ["At equilibrium the reactants are strongly favoured",
       "At equilibrium the reactant and product concentrations must be equal",
       "The reaction does not occur at all"],
      "A K value far greater than 1 means the numerator of the K expression is much larger than the denominator at equilibrium: the products are strongly favoured. <b>Products are favoured</b>.",{exp:exp});
  }
  return mcq("At a certain temperature, a reaction has K = "+kv+". Which statement is correct?",
    "At equilibrium the reactants are strongly favoured: very little product is present",
    ["At equilibrium the products are strongly favoured",
     "At equilibrium the reactant and product concentrations must be equal",
     "The reaction reaches equilibrium instantly"],
    "A K value far less than 1 means the denominator of the K expression is much larger than the numerator at equilibrium: the reactants are strongly favoured and very little product forms. <b>Reactants are favoured</b>.",{exp:exp});
});

E("u1-56-k-calc",1,["5.6"],2,"gen",function(){
  var fam=pick(["ab","a2b","ab2"]);
  var a,b,c,K,expr,eq;
  if(fam==="ab"){
    a=pick([0.200,0.250,0.400,0.500,0.800]);b=pick([0.100,0.200,0.300,0.600]);
    K=sfR(b/a,4);expr="K = [B] / [A] = "+gF(b)+" / "+gF(a);eq="A(g) \u21CC B(g)";
  }else if(fam==="a2b"){
    a=pick([0.100,0.200,0.250,0.500]);b=pick([0.200,0.400,0.500,0.800]);
    K=sfR(b/(a*a),4);expr="K = [B] / [A]\u00B2 = "+gF(b)+" / ("+gF(a)+")\u00B2";eq="2 A(g) \u21CC B(g)";
  }else{
    a=pick([0.200,0.400,0.500,1.00]);b=pick([0.400,0.600,0.800]);c=pick([0.100,0.300,0.500]);
    K=sfR((b*c)/a,4);expr="K = [B][C] / [A] = ("+gF(b)+" \u00D7 "+gF(c)+") / "+gF(a);eq="A(g) \u21CC B(g) + C(g)";
  }
  var ans=sfR(K,3);
  var concLine=fam==="ab2"?("At equilibrium, [A] = "+gF(a)+" mol/L, [B] = "+gF(b)+" mol/L and [C] = "+gF(c)+" mol/L."):("At equilibrium, [A] = "+gF(a)+" mol/L and [B] = "+gF(b)+" mol/L.");
  return numq("For the equilibrium "+eq+", "+concLine+" Calculate the value of K.",
    ans,Math.max(0.02*Math.abs(ans),0.002),
    "Substitute the equilibrium concentrations into the K expression, with each concentration raised to the power of its coefficient: "+expr+" = "+iF(K)+". So K = <b>"+F3(ans)+"</b>. (Units for K vary from reaction to reaction and are usually omitted.)",{fam:fam});
});

E("u1-56-omit-solids",1,["5.6"],2,"gen",function(){
  var e=pick([
    {eq:"C(s) + H\u2082O(g) \u21CC CO(g) + H\u2082(g)",k:"K = [CO][H\u2082] / [H\u2082O]",w:["K = [CO][H\u2082] / ([C][H\u2082O])","K = [C][H\u2082O] / ([CO][H\u2082])","K = [CO][H\u2082][C] / [H\u2082O]"]},
    {eq:"CaCO\u2083(s) \u21CC CaO(s) + CO\u2082(g)",k:"K = [CO\u2082]",w:["K = [CO\u2082] / [CaCO\u2083]","K = [CaO][CO\u2082] / [CaCO\u2083]","K = [CaCO\u2083] / ([CaO][CO\u2082])"]},
    {eq:"NH\u2084HS(s) \u21CC NH\u2083(g) + H\u2082S(g)",k:"K = [NH\u2083][H\u2082S]",w:["K = [NH\u2083][H\u2082S] / [NH\u2084HS]","K = [NH\u2084HS] / ([NH\u2083][H\u2082S])","K = [NH\u2083] + [H\u2082S] - [NH\u2084HS]"]}
  ]);
  var t=pick([25,75,100,150,200,250,300,350,400,450,500,550,600,650,700,750,800,850,900,1000]);
  return mcq("At "+t+" \u00B0C, the reaction "+e.eq+" is at equilibrium. Which expression gives the equilibrium constant?",
    e.k,e.w,
    "Pure solids (and pure liquids) have constant concentrations, so they are left out of the K expression. Only the gases and dissolved species appear. <b>"+e.k+"</b>.",{eq:e.eq});
});

E("u1-56-ice-k",1,["5.6"],3,"gen",function(){
  var fam=pick(["hi","n2o4","pcl5"]);
  var scale=pick([0.8,1,1.25,1.5,1.75,2,2.5,3]);
  var tk=pick([25,200,350,450,500,575]);
  var K,ans,sol,prompt;
  if(fam==="hi"){
    var i0=sfR(0.400*scale,4),hi=sfR(0.640*scale,4),x=sfR(hi/2,4),rem=sfR(i0-x,4);
    K=sfR((hi*hi)/(rem*rem),4);ans=sfR(K,3);
    prompt="Hydrogen gas and iodine vapour are placed in a flask, each at an initial concentration of "+gF(i0)+" mol/L, and the equilibrium H\u2082(g) + I\u2082(g) \u21CC 2 HI(g) is established. At equilibrium the concentration of HI is "+gF(hi)+" mol/L. Calculate the value of K.";
    sol="Use an ICE table. The change for HI is +"+gF(hi)+" mol/L, so x = "+gF(hi)+" / 2 = "+iF(x)+" mol/L. Then [H\u2082] = [I\u2082] = "+gF(i0)+" - "+iF(x)+" = "+iF(rem)+" mol/L. K = [HI]\u00B2 / ([H\u2082][I\u2082]) = ("+gF(hi)+")\u00B2 / ("+iF(rem)+" \u00D7 "+iF(rem)+") = "+iF(K)+". So K = <b>"+F3(ans)+"</b>.";
  }else if(fam==="n2o4"){
    var i0=sfR(0.200*scale,4),eqm=sfR(0.160*scale,4),chg=sfR(i0-eqm,4),no2=sfR(2*chg,4);
    K=sfR((no2*no2)/eqm,4);ans=sfR(K,3);
    prompt="Dinitrogen tetroxide is placed in a flask at an initial concentration of "+gF(i0)+" mol/L and decomposes: N\u2082O\u2084(g) \u21CC 2 NO\u2082(g). At equilibrium the concentration of N\u2082O\u2084 is "+gF(eqm)+" mol/L. Calculate the value of K.";
    sol="Use an ICE table. The change in [N\u2082O\u2084] is "+gF(i0)+" - "+gF(eqm)+" = "+iF(chg)+" mol/L, so [NO\u2082] at equilibrium is 2 \u00D7 "+iF(chg)+" = "+iF(no2)+" mol/L. K = [NO\u2082]\u00B2 / [N\u2082O\u2084] = ("+iF(no2)+")\u00B2 / "+gF(eqm)+" = "+iF(K)+". So K = <b>"+F3(ans)+"</b>.";
  }else{
    var i0=sfR(0.500*scale,4),x=sfR(0.200*scale,4),rem=sfR(i0-x,4);
    K=sfR((x*x)/rem,4);ans=sfR(K,3);
    prompt="Phosphorus pentachloride is placed in a flask at an initial concentration of "+gF(i0)+" mol/L and decomposes: PCl\u2085(g) \u21CC PCl\u2083(g) + Cl\u2082(g). At equilibrium the concentration of PCl\u2083 is "+gF(x)+" mol/L. Calculate the value of K.";
    sol="Use an ICE table. PCl\u2083 and Cl\u2082 form in a 1:1 ratio, so [Cl\u2082] = "+gF(x)+" mol/L as well, and [PCl\u2085] falls by the same amount: "+gF(i0)+" - "+gF(x)+" = "+iF(rem)+" mol/L. K = [PCl\u2083][Cl\u2082] / [PCl\u2085] = ("+gF(x)+" \u00D7 "+gF(x)+") / "+iF(rem)+" = "+iF(K)+". So K = <b>"+F3(ans)+"</b>.";
  }
  prompt=prompt+" The temperature is held constant at "+tk+" \u00B0C.";
  return numq(prompt,ans,Math.max(0.02*Math.abs(ans),0.002),sol,{fam:fam,scale:scale,tk:tk});
});

/* ---------- 5.7 Factors that affect equilibrium ---------- */

var SHIFTSYS=[
  {eq:"N\u2082(g) + 3 H\u2082(g) \u21CC 2 NH\u2083(g), \u0394H = -92 kJ",temps:[400,425,450,475,500],changes:[
    {c:"more N\u2082(g) is added",dir:"right, toward the products",why:"the system counteracts the addition by using up N\u2082, forming more NH\u2083"},
    {c:"NH\u2083(g) is removed as it forms",dir:"right, toward the products",why:"the system replaces the removed NH\u2083 by converting more reactants"},
    {c:"the mixture is compressed into a smaller volume",dir:"right, toward the products",why:"compression favours the side with fewer gas molecules, 2 mol of gas rather than 4 mol"},
    {c:"the temperature is raised",dir:"left, toward the reactants",why:"the forward reaction is exothermic, so added heat is counteracted by the reverse reaction absorbing it"}]},
  {eq:"2 SO\u2082(g) + O\u2082(g) \u21CC 2 SO\u2083(g), \u0394H = -198 kJ",temps:[400,450,500,550,600],changes:[
    {c:"O\u2082(g) is removed",dir:"left, toward the reactants",why:"the system replaces the removed O\u2082 by decomposing SO\u2083"},
    {c:"the temperature is lowered",dir:"right, toward the products",why:"the forward reaction is exothermic, so removing heat is counteracted by the reaction releasing more"},
    {c:"the pressure is increased by compression",dir:"right, toward the products",why:"compression favours the side with fewer gas molecules, 2 mol rather than 3 mol"}]},
  {eq:"H\u2082(g) + I\u2082(g) \u21CC 2 HI(g), \u0394H = -10 kJ",temps:[300,350,400,425,450],changes:[
    {c:"HI(g) is added",dir:"left, toward the reactants",why:"the system uses up the added HI by converting it back to H\u2082 and I\u2082"},
    {c:"the mixture is compressed into half the volume",dir:"neither way: there is no shift",why:"both sides have 2 mol of gas, so compression raises all concentrations equally and neither side is favoured"}]},
  {eq:"CaCO\u2083(s) \u21CC CaO(s) + CO\u2082(g), \u0394H = +178 kJ",temps:[800,850,900,950,1000],changes:[
    {c:"the temperature is raised",dir:"right, toward the products",why:"the forward reaction is endothermic, so added heat is absorbed by decomposing more CaCO\u2083"},
    {c:"CO\u2082(g) is pumped into the container",dir:"left, toward the reactants",why:"the system uses up the added CO\u2082 by forming more CaCO\u2083"}]}
];

E("u1-57-shift-predict",1,["5.7"],2,"gen",function(){
  var s=pick(SHIFTSYS),ch=pick(s.changes);
  var dirs=["right, toward the products","left, toward the reactants","neither way: there is no shift"];
  var ds=dirs.filter(function(d){return d!==ch.dir;});
  ds.push("the equilibrium is destroyed and the reaction stops");
  var st=pick(s.temps);
  return mcq("The equilibrium "+s.eq+" is established in a sealed container at "+st+" \u00B0C. Now "+ch.c+". Which way does the equilibrium shift?",
    ch.dir,ds.slice(0,3),
    "By Le Ch\u00E2telier's principle the system counteracts the change: "+ch.why+". The equilibrium shifts <b>"+ch.dir+"</b>.",{});
});

E("u1-57-explain-rates",1,["5.7"],3,"var",varset([
  function(){
    var amt=pick(["0.100","0.200","0.250","0.400","0.500"]);
    return mcq("An equilibrium mixture for 2 NO\u2082(g) \u21CC N\u2082O\u2084(g) in a 1.00 L container is disturbed when more NO\u2082 is injected, raising [NO\u2082] by "+amt+" mol/L at once. Which statement correctly EXPLAINS, in terms of reaction rates, how the new equilibrium is reached?",
      "Adding a reactant raises the forward rate at once, while the reverse rate is unchanged at first, so product forms faster than it is consumed until the rates become equal again at a new position",
      ["Le Ch\u00E2telier's principle states that the system must oppose the change, so it shifts until the change is undone",
       "Both rates instantly jump to new, higher values that are already equal",
       "The rate of the reaction in the direction of the added substance increases because its activation energy falls"],
      "An explanation, as opposed to a prediction, has to follow the rates. Adding a reactant raises the forward rate at once, while the reverse rate is unchanged at first, so product forms faster than it is consumed until the rates become equal again at a new position. Simply quoting Le Ch\u00E2telier's principle predicts the shift but does not explain it.",{});
  },
  function(){
    var amt=pick(["0.100","0.200","0.250","0.400","0.500"]);
    return mcq("An equilibrium mixture for H\u2082(g) + I\u2082(g) \u21CC 2 HI(g) in a 1.00 L container is disturbed when "+amt+" mol of HI is removed at once. Which statement correctly EXPLAINS, in terms of reaction rates, how the new equilibrium is reached?",
      "Removing product lowers the reverse rate at once, while the forward rate is unchanged, so the forward reaction runs ahead until the rates become equal again at a new position",
      ["Le Ch\u00E2telier's principle states that the system must oppose the change, so it shifts until the change is undone",
       "Both rates instantly drop to zero and restart together",
       "The forward rate increases at once because removing product lowers its activation energy"],
      "An explanation, as opposed to a prediction, has to follow the rates. Removing product lowers the reverse rate at once, while the forward rate is unchanged, so the forward reaction runs ahead until the rates become equal again at a new position. Simply quoting Le Ch\u00E2telier's principle predicts the shift but does not explain it.",{});
  },
  function(){
    var amt=pick(["0.100","0.200","0.250","0.400","0.500"]);
    return mcq("An equilibrium mixture for 2 SO\u2082(g) + O\u2082(g) \u21CC 2 SO\u2083(g) in a 2.00 L container is disturbed when "+amt+" mol of O\u2082 is added at once. Which statement correctly EXPLAINS, in terms of reaction rates, how the new equilibrium is reached?",
      "Adding a reactant raises the forward rate at once, while the reverse rate is unchanged at first, so product forms faster than it is consumed until the rates become equal again at a new position",
      ["Le Ch\u00E2telier's principle states that the system must oppose the change, so it shifts until the change is undone",
       "Both rates instantly jump to new, higher values that are already equal",
       "The rate of the reaction in the direction of the added substance increases because its activation energy falls"],
      "An explanation, as opposed to a prediction, has to follow the rates. Adding a reactant raises the forward rate at once, while the reverse rate is unchanged at first, so product forms faster than it is consumed until the rates become equal again at a new position. Simply quoting Le Ch\u00E2telier's principle predicts the shift but does not explain it.",{});
  }
]));

E("u1-57-temperature-k",1,["5.7"],2,"gen",function(){
  var exo=Math.random()<0.5;
  var heat=Math.random()<0.5;
  var rxn=exo?"N\u2082(g) + 3 H\u2082(g) \u21CC 2 NH\u2083(g), \u0394H = -92 kJ":"N\u2082O\u2084(g) \u21CC 2 NO\u2082(g), \u0394H = +57 kJ";
  var kUp=(exo!==heat);
  var correct=kUp?"K increases, because the equilibrium shifts toward the products":"K decreases, because the equilibrium shifts toward the reactants";
  var wrong=kUp?"K decreases, because the equilibrium shifts toward the reactants":"K increases, because the equilibrium shifts toward the products";
  var t1=pick([200,250,300,350,400,450]),t2=heat?t1+pick([50,100,150]):t1-pick([50,100]);
  var k0=pick(["1.5 \u00D7 10\u00B2","4.0 \u00D7 10\u00B3","6.2 \u00D7 10\u2074","2.8 \u00D7 10\u2075","9.1 \u00D7 10\u00B9"]);
  return mcq("For the equilibrium "+rxn+", K = "+k0+" at "+t1+" \u00B0C. The temperature is then "+(heat?"raised to "+t2+" \u00B0C":"lowered to "+t2+" \u00B0C")+". What happens to the value of K?",
    correct,[wrong,"K is unchanged, because temperature never affects K","K becomes 1, because the rates become equal"],
    "Temperature is the one change that alters K, because it alters the equilibrium position itself. Here the shift is "+(kUp?"toward the products, so the numerator of the K expression grows and K increases":"toward the reactants, so the numerator of the K expression shrinks and K decreases")+". <b>"+correct+"</b>.",{});
});

E("u1-57-catalyst-equilibrium",1,["5.7"],1,"var",varset([
  function(){
    return mcq("An iron catalyst is added to an equilibrium mixture for the synthesis of ammonia from nitrogen and hydrogen. Which statement is correct?",
      "The system reaches equilibrium faster, but the position of equilibrium and the value of K are unchanged",
      ["The position of equilibrium shifts toward the products",
       "The value of K increases because the forward reaction is sped up more than the reverse",
       "The position of equilibrium shifts toward the reactants"],
      "A catalyst speeds the forward and reverse reactions equally, so the balance point is reached sooner but is not moved. Neither the position of equilibrium nor K changes.",{});
  },
  function(){
    return mcq("A vanadium(V) oxide catalyst is added to an equilibrium mixture for the conversion of sulfur dioxide to sulfur trioxide. Which statement is correct?",
      "Equilibrium is reached sooner, but the equilibrium mixture contains the same proportions as before",
      ["The equilibrium mixture contains more sulfur trioxide than before",
       "The value of K increases because the catalyst lowers the forward activation energy only",
       "The equilibrium mixture contains less sulfur trioxide than before"],
      "A catalyst lowers the forward and reverse barriers by the same amount, so both rates grow together. The system arrives at the same equilibrium position, just sooner. Equilibrium is reached sooner, but the mixture contains the same proportions as before.",{});
  },
  function(){
    return mcq("A platinum catalyst is placed in an equilibrium mixture of nitrogen oxides. Which statement is correct?",
      "The catalyst changes how fast equilibrium is reached, not where the equilibrium lies",
      ["The catalyst shifts the equilibrium toward whichever side has fewer molecules",
       "The catalyst increases K by lowering the activation energy",
       "The catalyst is used up, and the equilibrium shifts until it is gone"],
      "Catalysts affect rates only. Both directions speed up equally, the position of equilibrium and K stay the same, and the catalyst is regenerated rather than consumed. The catalyst changes how fast equilibrium is reached, not where it lies.",{});
  },
  function(){
    return mcq("A reaction at equilibrium is given a catalyst, and the mixture is sampled an hour later. Compared with the same mixture without the catalyst, the sample shows",
      "The same equilibrium concentrations, reached in less time",
      ["A higher product concentration, because the forward reaction was favoured",
       "A lower reactant concentration, because K increased",
       "No reaction at all, because the catalyst froze the system"],
      "Given time, both mixtures sit at the same equilibrium position with the same concentrations and the same K. The catalyzed one simply got there faster. The same equilibrium concentrations, reached in less time.",{});
  }
]));

E("u1-57-pressure-nuance",1,["5.7"],3,"gen",function(){
  var fam=pick(["equal","inert"]);
  var t=pick([350,400,450,500]);
  if(fam==="equal"){
    var p0=pick([100,150,200,250,300,400,500,600]),frac=pick(["half","a third","a quarter"]);
    return mcq("The equilibrium H\u2082(g) + I\u2082(g) \u21CC 2 HI(g) is established in a container at "+t+" \u00B0C and "+p0+" kPa. The mixture is compressed to "+frac+" of its volume. A student predicts a shift toward the products because the pressure rose. Which judgement is correct?",
      "The student is wrong: both sides of the equation have 2 mol of gas, so compression raises every concentration in the same proportion and there is no shift",
      ["The student is right: higher pressure always favours the products",
       "The student is wrong: the equilibrium shifts toward the reactants instead",
       "The student is right: compression always favours the side with more molecules"],
      "Pressure changes shift an equilibrium only when the two sides have different numbers of gas molecules. Here both sides have 2 mol of gas, so no side is favoured and there is no shift, even though the pressure rose sharply. The student is wrong.",{fam:fam,p0:p0});
  }
  var vol=pick([1.00,2.00,5.00,10.0]),add=pick([50,80,100,150,200,250,300,400]);
  return mcq("The equilibrium N\u2082(g) + 3 H\u2082(g) \u21CC 2 NH\u2083(g) is established in a "+gF(vol)+" L container at "+t+" \u00B0C. Argon gas is pumped in, raising the total pressure by "+add+" kPa, while the volume is kept constant. Which statement is correct?",
    "There is no shift: the concentrations of N\u2082, H\u2082 and NH\u2083 are unchanged, because the volume did not change",
    ["The equilibrium shifts right, because the total pressure increased",
     "The equilibrium shifts left, because argon dilutes the reacting gases",
     "The equilibrium shifts right, because argon acts as a catalyst"],
    "What matters for the equilibrium is the concentrations (partial pressures) of the reacting gases, not the total pressure. At constant volume the argon changes none of them, so there is no shift. A pressure shift requires a volume change. There is no shift.",{fam:fam,vol:vol});
});

/* ----- bank-u2.js ----- */
// Chemistry 3202 Unit 2 Acids and Bases question bank
// Phase C diagram figures (Nov 2026): u2-68-curve-equivalence now draws the
// titration curve for the titration type its stem names, with the
// equivalence region unmarked. Figure helpers are in bank-u1.js.
// CRMARKS: u2-63-net-equation=3
// CRMARKS: u2-63-write-net=4
// CRMARKS: u2-64-dilution-ph=3
// CRMARKS: u2-64-mix-stoich-ph=4
// CRMARKS: u2-64-ph-from-h=2
// CRMARKS: u2-65-ka-from-ph=3
// CRMARKS: u2-65-weak-acid-ph=4
// CRMARKS: u2-65-weak-base-ph=4
// CRMARKS: u2-66-kb-calc=2
// CRMARKS: u2-68-titration-calc=3
// CRMARKS: u2-68-titration-diprotic=4

/* Scientific-notation formatter at a chosen significant-figure count,
   used wherever a concentration or constant is very small or very large.
   Declared here; the Unit 4 bank (loaded later) uses it too. */
function sciF(x,sf){var r=sfR(x,sf);if(r===0)return "0";var e=Math.floor(Math.log10(Math.abs(r)));var m=r/Math.pow(10,e);if(Math.abs(m)>=9.9995){m=1;e++;}return sfF(m,sf)+" \u00D7 10"+sfSup(e);}

/* Acid and base constants, matching the Reference Information panels. */
var KA3202={"HF":3.5e-4,"benzoic acid":6.3e-5,"acetic acid":1.8e-5,"carbonic acid":4.3e-7,"HCN":6.2e-10,"the ammonium ion":5.6e-10};
var KB3202={"ammonia":1.8e-5,"the cyanide ion":1.6e-5,"the acetate ion":5.6e-10,"the fluoride ion":2.9e-11};

/* ---------- 6.1 Acid and base theories ---------- */

E("u2-61-theory-name",2,["6.1"],1,"var",varset([
  function(){
    return mcq("An acid is defined as a proton (H\u207A) donor and a base as a proton acceptor. These definitions come from",
      "The Br\u00F8nsted-Lowry theory",
      ["The Arrhenius theory","The collision theory","The kinetic molecular theory"],
      "Donating and accepting protons is the heart of the Br\u00F8nsted-Lowry theory. The Arrhenius theory is narrower: an acid produces H\u207A in water and a base produces OH\u207B in water. <b>The Br\u00F8nsted-Lowry theory</b>.",{});
  },
  function(){
    return mcq("A base is defined as a substance that produces OH\u207B ions when dissolved in water. This definition comes from",
      "The Arrhenius theory",
      ["The Br\u00F8nsted-Lowry theory","The equilibrium theory","The atomic theory"],
      "Producing OH\u207B in water is the Arrhenius definition of a base. The Br\u00F8nsted-Lowry theory defines a base more generally, as a proton acceptor, whether or not water is involved. <b>The Arrhenius theory</b>.",{});
  },
  function(){
    return mcq("Ammonia, NH\u2083, has no OH\u207B in its formula, yet it behaves as a base in water. Which theory explains this most directly?",
      "The Br\u00F8nsted-Lowry theory: NH\u2083 accepts a proton from water, leaving OH\u207B behind",
      ["The Arrhenius theory: NH\u2083 must contain hidden OH\u207B",
       "The collision theory: NH\u2083 particles collide harder than water particles",
       "No theory explains it: ammonia is not really a base"],
      "Under Br\u00F8nsted-Lowry, a base is a proton acceptor. NH\u2083 takes a proton from H\u2082O, forming NH\u2084\u207A and OH\u207B, which is exactly why the solution is basic even though ammonia contains no hydroxide. <b>The Br\u00F8nsted-Lowry theory</b>.",{});
  },
  function(){
    return mcq("Which statement correctly compares the two acid-base theories?",
      "Every Arrhenius acid is also a Br\u00F8nsted-Lowry acid, but some Br\u00F8nsted-Lowry bases are not Arrhenius bases",
      ["Every Br\u00F8nsted-Lowry base is also an Arrhenius base, but not the reverse",
       "The two theories contradict each other, so only one can be right",
       "The Arrhenius theory is newer and replaces the Br\u00F8nsted-Lowry theory"],
      "Br\u00F8nsted-Lowry is the broader theory. Anything that produces H\u207A in water also donates protons, but a base such as NH\u2083 accepts protons without containing OH\u207B, so it is a Br\u00F8nsted-Lowry base only. <b>Every Arrhenius acid is a Br\u00F8nsted-Lowry acid, but some bases are Br\u00F8nsted-Lowry only</b>.",{});
  }
]));

E("u2-61-arrhenius-ions",2,["6.1"],1,"gen",function(){
  var a=pick([
    {f:"hydrochloric acid, HCl",ions:"H\u207A(aq) and Cl\u207B(aq)",w:["H\u207A(aq) and OH\u207B(aq)","HCl molecules only, since acids do not ionize","H\u2082(g) and Cl\u2082(g)"]},
    {f:"nitric acid, HNO\u2083",ions:"H\u207A(aq) and NO\u2083\u207B(aq)",w:["H\u207A(aq) and O\u00B2\u207B(aq)","H\u2083\u207A(aq) and N\u207B(aq)","H\u207A(aq) and OH\u207B(aq)"]},
    {f:"sodium hydroxide, NaOH",ions:"Na\u207A(aq) and OH\u207B(aq)",w:["Na\u207B(aq) and OH\u207A(aq)","Na\u207A(aq) and H\u207A(aq)","NaOH molecules only, since bases do not dissolve"]},
    {f:"potassium hydroxide, KOH",ions:"K\u207A(aq) and OH\u207B(aq)",w:["K\u207B(aq) and OH\u207A(aq)","K\u207A(aq) and O\u00B2\u207B(aq)","K\u207A(aq) and H\u2082O(l)"]},
    {f:"sulfuric acid, H\u2082SO\u2084",ions:"H\u207A(aq) and SO\u2084\u00B2\u207B(aq) ions (two H\u207A for each SO\u2084\u00B2\u207B)",w:["H\u2082\u207A(aq) and SO\u2084\u207B(aq)","H\u207A(aq) and S\u207B(aq)","H\u2082SO\u2084 molecules only"]}
  ]);
  var ml=pick([100,200,250,500]),tp=ri(15,35);
  return mcq("A "+ml+" mL solution of "+a.f+" is prepared at "+tp+" \u00B0C. Under the Arrhenius theory, the particles it contributes to the solution are",
    a.ions,a.w,
    "An Arrhenius acid contributes H\u207A ions and an Arrhenius base contributes OH\u207B ions, along with the partner ion from the formula. For "+a.f+" the particles are <b>"+a.ions+"</b>.",{ml:ml});
});

E("u2-61-bronsted-role",2,["6.1"],2,"var",varset([
  function(){
    return mcq("In the reaction HF(aq) + H\u2082O(l) \u21CC F\u207B(aq) + H\u2083O\u207A(aq), identify the Br\u00F8nsted-Lowry acid:",
      "HF, because it donates a proton to the water",
      ["H\u2082O, because it donates a proton to the HF","F\u207B, because it can accept a proton","H\u2083O\u207A, because it is the strongest acid present"],
      "Follow the proton: the acid donates it and the base accepts it. Here <b>HF, because it donates a proton to the water</b>.",{});
  },
  function(){
    return mcq("In the reaction NH\u2083(aq) + H\u2082O(l) \u21CC NH\u2084\u207A(aq) + OH\u207B(aq), identify the Br\u00F8nsted-Lowry base:",
      "NH\u2083, because it accepts a proton from the water",
      ["H\u2082O, because it accepts a proton from the NH\u2083","OH\u207B, because it contains oxygen and hydrogen","NH\u2084\u207A, because it can donate a proton"],
      "Follow the proton: the acid donates it and the base accepts it. Here <b>NH\u2083, because it accepts a proton from the water</b>.",{});
  },
  function(){
    return mcq("In the reaction HCO\u2083\u207B(aq) + H\u2082O(l) \u21CC H\u2082CO\u2083(aq) + OH\u207B(aq), identify the Br\u00F8nsted-Lowry acid:",
      "H\u2082O, because it donates a proton to the HCO\u2083\u207B",
      ["HCO\u2083\u207B, because it is listed first in the equation","OH\u207B, because it is a base in every reaction","H\u2082CO\u2083, because it has two hydrogen atoms"],
      "Follow the proton: the acid donates it and the base accepts it. Here the donor is the water: <b>H\u2082O, because it donates a proton to the HCO\u2083\u207B</b>. Water is amphiprotic and plays the acid role in this reaction.",{});
  },
  function(){
    return mcq("In the reaction CH\u2083COOH(aq) + NH\u2083(aq) \u21CC CH\u2083COO\u207B(aq) + NH\u2084\u207A(aq), identify the Br\u00F8nsted-Lowry base:",
      "NH\u2083, because it accepts the proton from the acetic acid",
      ["CH\u2083COOH, because it accepts a proton","CH\u2083COO\u207B, because it is formed from an acid","NH\u2084\u207A, because it carries a positive charge"],
      "Follow the proton: the acid donates it and the base accepts it. Here <b>NH\u2083, because it accepts the proton from the acetic acid</b>.",{});
  }
]));

E("u2-61-properties",2,["6.1"],1,"var",varset([
  function(){
    return mcq("Which set of properties belongs to aqueous solutions of acids?",
      "Sour taste, turn blue litmus red, react with active metals to produce hydrogen gas",
      ["Slippery feel, turn red litmus blue, taste bitter",
       "Sour taste, turn red litmus blue, feel slippery",
       "No reaction with metals, turn blue litmus red, feel slippery"],
      "Acids taste sour, turn blue litmus red, and react with active metals to release hydrogen gas. The slippery feel and bitter taste belong to bases. <b>Sour taste, blue litmus turns red, hydrogen gas with active metals</b>.",{});
  },
  function(){
    return mcq("Which set of properties belongs to aqueous solutions of bases?",
      "Bitter taste, slippery feel, turn red litmus blue",
      ["Sour taste, slippery feel, turn blue litmus red",
       "Bitter taste, turn red litmus blue, react with metals to produce hydrogen",
       "Slippery feel, sour taste, no effect on litmus"],
      "Bases taste bitter, feel slippery, and turn red litmus blue. The sour taste and the hydrogen gas reaction belong to acids. <b>Bitter taste, slippery feel, red litmus turns blue</b>.",{});
  },
  function(){
    return mcq("A drop of an unknown solution turns blue litmus red but does not feel slippery. The solution is most likely",
      "An acid",
      ["A base","A neutral salt solution","Pure water"],
      "Blue litmus turning red is the acid test, and acids do not feel slippery (that is a base property). The solution is an acid.",{});
  }
]));

E("u2-61-amphiprotic",2,["6.1"],2,"gen",function(){
  var s=pick([
    {sp:"HCO\u2083\u207B",asAcid:"HCO\u2083\u207B + H\u2082O \u21CC CO\u2083\u00B2\u207B + H\u2083O\u207A",asBase:"HCO\u2083\u207B + H\u2082O \u21CC H\u2082CO\u2083 + OH\u207B"},
    {sp:"HSO\u2084\u207B",asAcid:"HSO\u2084\u207B + H\u2082O \u21CC SO\u2084\u00B2\u207B + H\u2083O\u207A",asBase:"HSO\u2084\u207B + H\u2082O \u21CC H\u2082SO\u2084 + OH\u207B"},
    {sp:"H\u2082PO\u2084\u207B",asAcid:"H\u2082PO\u2084\u207B + H\u2082O \u21CC HPO\u2084\u00B2\u207B + H\u2083O\u207A",asBase:"H\u2082PO\u2084\u207B + H\u2082O \u21CC H\u2083PO\u2084 + OH\u207B"},
    {sp:"H\u2082O",asAcid:"H\u2082O + NH\u2083 \u21CC OH\u207B + NH\u2084\u207A",asBase:"H\u2082O + HCl \u2192 H\u2083O\u207A + Cl\u207B"}
  ]);
  var role=Math.random()<0.5;
  var cc=pick([0.0500,0.100,0.200,0.250,0.500]),vv=pick([100,250,500]);
  if(role){
    return mcq("A "+vv+" mL sample of a "+gF(cc)+" mol/L solution contains the amphiprotic species "+s.sp+". Which equation shows it acting as a Br\u00F8nsted-Lowry ACID?",
      s.asAcid,[s.asBase,s.sp+" + H\u207A \u2192 "+s.sp.replace("\u207B","")+" with no other change","2 "+s.sp+" \u2192 a salt and water"],
      "Acting as an acid means donating a proton. In "+s.asAcid+", "+s.sp+" gives a proton to water and becomes its conjugate base. <b>"+s.asAcid+"</b>.",{sp:s.sp,role:"acid"});
  }
  return mcq("A "+vv+" mL sample of a "+gF(cc)+" mol/L solution contains the amphiprotic species "+s.sp+". Which equation shows it acting as a Br\u00F8nsted-Lowry BASE?",
    s.asBase,[s.asAcid,s.sp+" + OH\u207B \u2192 "+s.sp.replace("\u207B","")+" with no other change","2 "+s.sp+" \u2192 a salt and water"],
    "Acting as a base means accepting a proton. In "+s.asBase+", "+s.sp+" takes a proton from water, leaving OH\u207B behind. <b>"+s.asBase+"</b>.",{sp:s.sp,role:"base"});
});

/* ---------- 6.2 Strength versus concentration ---------- */

E("u2-62-strong-list",2,["6.2"],1,"gen",function(){
  var strong=pick(["hydrochloric acid","nitric acid","sulfuric acid (first proton)","hydrobromic acid"]);
  var weak=shuffle(["acetic acid","carbonic acid","hydrofluoric acid","ammonia","benzoic acid","hydrocyanic acid"]).slice(0,3);
  var c0=pick([0.0100,0.100,0.500,1.00]);
  var list=shuffle([strong].concat(weak)).join(", ");
  return mcq("Four "+gF(c0)+" mol/L solutions are on a bench: "+list+". Which one contains a strong electrolyte that ionizes (or dissociates) essentially completely?",
    strong,weak,
    "Strong acids and bases ionize or dissociate essentially 100% in water. Of the four, only <b>"+strong+"</b> does this; the others are weak and exist mostly as un-ionized molecules or ions in equilibrium.",{c0:c0});
});

E("u2-62-dissociation-eq",2,["6.2"],2,"gen",function(){
  var w=Math.random()<0.5;
  var cc2=pick([0.0100,0.0500,0.100,0.200,0.500,1.00]),vv2=pick([100,250,500]);
  if(w){
    var acid=pick(["acetic acid, CH\u2083COOH","hydrofluoric acid, HF","benzoic acid, C\u2086H\u2085COOH"]);
    var f=acid.split(", ")[1];
    var prod=f==="HF"?"H\u2083O\u207A(aq) + F\u207B(aq)":(f==="CH\u2083COOH"?"H\u2083O\u207A(aq) + CH\u2083COO\u207B(aq)":"H\u2083O\u207A(aq) + C\u2086H\u2085COO\u207B(aq)");
    return mcq("Which equation correctly represents the ionization of the weak acid "+acid+" in a "+gF(cc2)+" mol/L aqueous solution (a "+vv2+" mL sample)?",
      f+"(aq) + H\u2082O(l) \u21CC "+prod,
      [f+"(aq) + H\u2082O(l) \u2192 "+prod,
       f+"(aq) \u2192 H\u207A(aq) + OH\u207B(aq)",
       f+"(aq) + H\u2082O(l) \u21CC "+prod.replace("H\u2083O\u207A","H\u207B")],
      "A weak acid ionizes only slightly, so the equation takes an equilibrium arrow, and in water the proton is carried as H\u2083O\u207A. <b>"+f+"(aq) + H\u2082O(l) \u21CC "+prod+"</b>.",{acid:acid});
  }
  var acid2=pick(["hydrochloric acid, HCl","nitric acid, HNO\u2083","hydrobromic acid, HBr"]);
  var f2=acid2.split(", ")[1];
  var prod2=f2==="HCl"?"H\u2083O\u207A(aq) + Cl\u207B(aq)":(f2==="HNO\u2083"?"H\u2083O\u207A(aq) + NO\u2083\u207B(aq)":"H\u2083O\u207A(aq) + Br\u207B(aq)");
  return mcq("Which equation correctly represents the ionization of the strong acid "+acid2+" in a "+gF(cc2)+" mol/L aqueous solution (a "+vv2+" mL sample)?",
    f2+"(aq) + H\u2082O(l) \u2192 "+prod2,
    [f2+"(aq) + H\u2082O(l) \u21CC "+prod2,
     f2+"(aq) \u2192 H\u207A(aq) + OH\u207B(aq)",
     f2+"(aq) + H\u2082O(l) \u2192 "+prod2.replace("H\u2083O\u207A","H\u2083O\u00B2\u207A")],
    "A strong acid ionizes essentially completely, so the equation takes a single forward arrow, and in water the proton is carried as H\u2083O\u207A. <b>"+f2+"(aq) + H\u2082O(l) \u2192 "+prod2+"</b>.",{acid:acid2});
});

E("u2-62-strength-vs-conc",2,["6.2"],2,"var",varset([
  function(){
    return mcq("Solution A is 6.0 mol/L acetic acid (a weak acid). Solution B is 0.0010 mol/L hydrochloric acid (a strong acid). Which statement is correct?",
      "A is the more concentrated solution, but B may still have the higher [H\u2083O\u207A], because strength and concentration are different ideas",
      ["A must have the higher [H\u2083O\u207A], because it is more concentrated",
       "B must have the higher [H\u2083O\u207A], because it is stronger, in every case",
       "The two ideas, strength and concentration, mean the same thing"],
      "Concentration is how much solute is dissolved; strength is what fraction of it ionizes. A concentrated weak acid can hold far more acid in total yet release fewer H\u2083O\u207A ions than a very dilute strong acid. The two ideas must be kept separate.",{});
  },
  function(){
    return mcq("A student says a 12 mol/L bottle of acetic acid must be a strong acid because it is so concentrated. Which response is correct?",
      "Acetic acid is weak at any concentration: only a small fraction of its molecules ionize, however much is dissolved",
      ["The student is right: concentrated acids are strong by definition",
       "Acetic acid becomes strong once its concentration passes 1 mol/L",
       "Strength depends only on how the bottle is labelled"],
      "Strength describes the fraction ionized, not the amount dissolved. Acetic acid ionizes only slightly at any concentration, so it stays a weak acid even at 12 mol/L.",{});
  },
  function(){
    return mcq("Two acids are both 0.100 mol/L. Acid X has a pH of 1.00 and acid Y has a pH of 2.87. Which statement is correct?",
      "X is a strong acid and Y is a weak acid: at equal concentration the strong acid produces far more H\u2083O\u207A",
      ["X is a weak acid and Y is a strong acid",
       "Both are strong acids, because their concentrations are equal",
       "Concentration alone decides the pH, so the readings must be wrong"],
      "At the same concentration, the acid that ionizes completely gives [H\u2083O\u207A] = 0.100 mol/L and pH 1.00. The weak acid ionizes only slightly, giving a much lower [H\u2083O\u207A] and a higher pH. <b>X is strong and Y is weak</b>.",{});
  },
  function(){
    return mcq("Which pairing of terms is correct?",
      "Concentrated and dilute describe amounts dissolved; strong and weak describe fractions ionized",
      ["Concentrated means strong, and dilute means weak",
       "Strong and weak describe amounts dissolved; concentrated and dilute describe fractions ionized",
       "All four terms describe the fraction of molecules ionized"],
      "The pairs answer different questions. Concentrated/dilute: how much solute per litre. Strong/weak: what fraction of that solute ionizes. <b>Concentrated and dilute describe amounts; strong and weak describe fractions ionized</b>.",{});
  }
]));

E("u2-62-conductivity",2,["6.2"],2,"gen",function(){
  var c0=pick([0.0100,0.0200,0.0500,0.100,0.200,0.500,1.00]);
  var vol=pick([50,100,250,500]);
  var pair=pick([
    {good:"hydrochloric acid",bad:"acetic acid",why:"the strong acid is fully ionized while the weak acid is mostly un-ionized molecules, so the strong acid solution holds far more ions to carry the current"},
    {good:"sodium hydroxide",bad:"ammonia",why:"the strong base dissociates completely while ammonia ionizes only slightly, so the strong base solution holds far more ions to carry the current"},
    {good:"nitric acid",bad:"carbonic acid",why:"the strong acid is fully ionized while the weak acid is mostly un-ionized molecules, so the strong acid solution holds far more ions to carry the current"}
  ]);
  return mcq("A conductivity tester is placed in "+vol+" mL of "+gF(c0)+" mol/L "+pair.good+" and then in "+vol+" mL of "+gF(c0)+" mol/L "+pair.bad+". In which solution does the bulb glow more brightly, and why?",
    "In the "+pair.good+": "+pair.why,
    ["In the "+pair.bad+": "+pair.why,
     "Equally in both: equal concentrations always conduct equally",
     "In neither: solutions of acids and bases do not conduct electricity"],
    "Conductivity depends on the number of ions present. At equal concentration, "+pair.why+". The bulb glows more brightly in the <b>"+pair.good+"</b>.",{c0:c0});
});

E("u2-62-weak-meaning",2,["6.2"],1,"gen",function(){
  var acid=pick(["acetic acid","hydrofluoric acid","benzoic acid","carbonic acid"]);
  var pct=pick([1.3,2.8,4.2,7.5,13]);
  var c0=pick([0.0100,0.100,0.250]);
  return mcq("A "+gF(c0)+" mol/L solution of "+acid+" is found to be only "+pct+"% ionized. This behaviour classifies the acid as",
    "Weak, because only a small fraction of its molecules ionize and an equilibrium is established",
    ["Strong, because strong acids ionize slowly",
     "Concentrated, because percent ionization measures concentration",
     "Neutral, because most of it is still molecules"],
    "Weak acids and bases are defined by partial ionization: most of the solute stays as molecules, a small fraction ionizes, and the two forms sit in equilibrium. <b>Weak</b>.",{acid:acid,pct:pct});
});

/* ---------- 6.3 Br\u00F8nsted-Lowry reactions ---------- */

E("u2-63-conjugate-pair",2,["6.3"],1,"gen",function(){
  var s=pick([
    {sp:"HCO\u2083\u207B",ca:"H\u2082CO\u2083",cb:"CO\u2083\u00B2\u207B",ask:"acid"},
    {sp:"H\u2082O",ca:"H\u2083O\u207A",cb:"OH\u207B",ask:"base"},
    {sp:"NH\u2083",ca:"NH\u2084\u207A",cb:"NH\u2082\u207B",ask:"acid"},
    {sp:"HSO\u2084\u207B",ca:"H\u2082SO\u2084",cb:"SO\u2084\u00B2\u207B",ask:"base"},
    {sp:"CH\u2083COOH",ca:"CH\u2083COOH\u2082\u207A",cb:"CH\u2083COO\u207B",ask:"base"},
    {sp:"HF",ca:"H\u2082F\u207A",cb:"F\u207B",ask:"base"}
  ]);
  var cc3=pick([0.0100,0.0500,0.100,0.200,0.500]),vv3=pick([100,250,500]);
  if(s.ask==="acid"){
    return mcq("The species "+s.sp+" is present in a "+gF(cc3)+" mol/L solution (a "+vv3+" mL sample). What is the conjugate acid of "+s.sp+"?",
      s.ca,[s.cb,s.sp+" itself","H\u2083O\u207A"],
      "A conjugate acid is formed when the species accepts a proton, so it has one more H and one more unit of positive charge than the original: "+s.sp+" + H\u207A \u2192 "+s.ca+". The conjugate acid is <b>"+s.ca+"</b>.",{sp:s.sp});
  }
  return mcq("The species "+s.sp+" is present in a "+gF(cc3)+" mol/L solution (a "+vv3+" mL sample). What is the conjugate base of "+s.sp+"?",
    s.cb,[s.ca,s.sp+" itself","H\u207A"],
    "A conjugate base is what remains when the species donates a proton, so it has one fewer H and one more unit of negative charge: "+s.sp+" \u2192 "+s.cb+" + H\u207A. The conjugate base is <b>"+s.cb+"</b>.",{sp:s.sp});
});

E("u2-63-identify-roles",2,["6.3"],2,"var",varset([
  function(){
    return mcq("HNO\u2083(aq) + H\u2082O(l) \u2192 NO\u2083\u207B(aq) + H\u2083O\u207A(aq)\nIn this reaction, water acts as:",
      "A Br\u00F8nsted-Lowry base, because it accepts the proton",
      ["A Br\u00F8nsted-Lowry acid, because it donates the proton","A catalyst, because it is not changed","An Arrhenius acid, because it contains hydrogen"],
      "Track the proton transfer: HNO\u2083 donates the proton and H\u2082O accepts it, forming H\u2083O\u207A. Accepting a proton is the base role. <b>A Br\u00F8nsted-Lowry base</b>.",{});
  },
  function(){
    return mcq("HCl(aq) + NH\u2083(aq) \u2192 NH\u2084\u207A(aq) + Cl\u207B(aq)\nIn this reaction, the conjugate acid of NH\u2083 is:",
      "NH\u2084\u207A",
      ["HCl","Cl\u207B","NH\u2083 itself"],
      "A conjugate acid is the species formed when the base accepts a proton: NH\u2083 + H\u207A \u2192 NH\u2084\u207A. <b>NH\u2084\u207A</b>.",{});
  },
  function(){
    return mcq("CH\u2083COOH(aq) + OH\u207B(aq) \u21CC CH\u2083COO\u207B(aq) + H\u2082O(l)\nIn this reaction, the conjugate base of acetic acid is:",
      "CH\u2083COO\u207B",
      ["OH\u207B","H\u2082O","CH\u2083COOH itself"],
      "A conjugate base is what remains when the acid donates a proton: CH\u2083COOH loses H\u207A to become CH\u2083COO\u207B. <b>CH\u2083COO\u207B</b>.",{});
  },
  function(){
    return mcq("H\u2082CO\u2083(aq) + H\u2082O(l) \u21CC HCO\u2083\u207B(aq) + H\u2083O\u207A(aq)\nIn this reaction, the conjugate base of carbonic acid is:",
      "HCO\u2083\u207B",
      ["H\u2083O\u207A","H\u2082O","CO\u2083\u00B2\u207B"],
      "A conjugate base is what remains when the acid donates one proton: H\u2082CO\u2083 loses H\u207A to become HCO\u2083\u207B (losing two protons would be one step too far). <b>HCO\u2083\u207B</b>.",{});
  }
]));

E("u2-63-spectators",2,["6.3"],2,"var",varset([
  function(){
    return mcq("For the reaction KOH(aq) + HCl(aq) \u2192 KCl(aq) + H\u2082O(l), which ions are the spectator ions?",
      "K\u207A and Cl\u207B",
      ["H\u207A and OH\u207B","K\u207A and OH\u207B","H\u207A and Cl\u207B"],
      "Spectator ions appear unchanged on both sides of the total ionic equation. The ions that actually react are H\u207A (or H\u2083O\u207A) and OH\u207B, which form water. The spectators are <b>K\u207A and Cl\u207B</b>.",{});
  },
  function(){
    return mcq("For the reaction NaOH(aq) + HNO\u2083(aq) \u2192 NaNO\u2083(aq) + H\u2082O(l), which ions are the spectator ions?",
      "Na\u207A and NO\u2083\u207B",
      ["H\u207A and OH\u207B","Na\u207A and OH\u207B","H\u207A and NO\u2083\u207B"],
      "Spectator ions appear unchanged on both sides of the total ionic equation. The ions that actually react are H\u207A (or H\u2083O\u207A) and OH\u207B, which form water. The spectators are <b>Na\u207A and NO\u2083\u207B</b>.",{});
  },
  function(){
    return mcq("For the reaction Ca(OH)\u2082(aq) + 2 HBr(aq) \u2192 CaBr\u2082(aq) + 2 H\u2082O(l), which ions are the spectator ions?",
      "Ca\u00B2\u207A and Br\u207B",
      ["H\u207A and OH\u207B","Ca\u00B2\u207A and OH\u207B","H\u207A and Br\u207B"],
      "Spectator ions appear unchanged on both sides of the total ionic equation. The ions that actually react are H\u207A (or H\u2083O\u207A) and OH\u207B, which form water. The spectators are <b>Ca\u00B2\u207A and Br\u207B</b>.",{});
  },
  function(){
    return mcq("For the reaction LiOH(aq) + HBr(aq) \u2192 LiBr(aq) + H\u2082O(l), which ions are the spectator ions?",
      "Li\u207A and Br\u207B",
      ["H\u207A and OH\u207B","Li\u207A and OH\u207B","H\u207A and Br\u207B"],
      "Spectator ions appear unchanged on both sides of the total ionic equation. The ions that actually react are H\u207A (or H\u2083O\u207A) and OH\u207B, which form water. The spectators are <b>Li\u207A and Br\u207B</b>.",{});
  }
]));

E("u2-63-net-equation",2,["6.3"],2,"var",varset([
  function(){
    return mcq("When sodium hydroxide solution is mixed with hydrochloric acid, the net ionic equation for the reaction that takes place is",
      "H\u207A(aq) + OH\u207B(aq) \u2192 H\u2082O(l)",
      ["Na\u207A(aq) + Cl\u207B(aq) \u2192 NaCl(s)","NaOH(aq) + HCl(aq) \u2192 NaCl(aq) + H\u2082O(l)","H\u207A(aq) + Cl\u207B(aq) \u2192 HCl(aq)"],
      "Write the total ionic equation, cancel the ions that appear unchanged on both sides (Na\u207A and Cl\u207B), and what remains is the net ionic equation: <b>H\u207A(aq) + OH\u207B(aq) \u2192 H\u2082O(l)</b>.",{});
  },
  function(){
    return mcq("When potassium hydroxide solution is mixed with nitric acid, the net ionic equation for the reaction that takes place is",
      "H\u207A(aq) + OH\u207B(aq) \u2192 H\u2082O(l)",
      ["K\u207A(aq) + NO\u2083\u207B(aq) \u2192 KNO\u2083(s)","KOH(aq) + HNO\u2083(aq) \u2192 KNO\u2083(aq) + H\u2082O(l)","OH\u207B(aq) + NO\u2083\u207B(aq) \u2192 HNO\u2083(aq)"],
      "Write the total ionic equation, cancel the ions that appear unchanged on both sides (K\u207A and NO\u2083\u207B), and what remains is the net ionic equation: <b>H\u207A(aq) + OH\u207B(aq) \u2192 H\u2082O(l)</b>. Strong acid with strong base always reduces to this.",{});
  },
  function(){
    return mcq("When acetic acid solution is mixed with sodium hydroxide solution, the net ionic equation for the reaction that takes place is",
      "CH\u2083COOH(aq) + OH\u207B(aq) \u2192 CH\u2083COO\u207B(aq) + H\u2082O(l)",
      ["H\u207A(aq) + OH\u207B(aq) \u2192 H\u2082O(l)","Na\u207A(aq) + CH\u2083COO\u207B(aq) \u2192 CH\u2083COONa(s)","CH\u2083COOH(aq) + Na\u207A(aq) \u2192 CH\u2083COONa(aq) + H\u207A(aq)"],
      "Acetic acid is a weak electrolyte, so it is written in molecular form, not as separated ions. Cancelling only the spectator Na\u207A gives: <b>CH\u2083COOH(aq) + OH\u207B(aq) \u2192 CH\u2083COO\u207B(aq) + H\u2082O(l)</b>.",{});
  },
  function(){
    return mcq("When ammonia solution is mixed with hydrochloric acid, the net ionic equation for the reaction that takes place is",
      "NH\u2083(aq) + H\u207A(aq) \u2192 NH\u2084\u207A(aq)",
      ["NH\u2083(aq) + OH\u207B(aq) \u2192 NH\u2082\u207B(aq) + H\u2082O(l)","Cl\u207B(aq) + NH\u2084\u207A(aq) \u2192 NH\u2084Cl(s)","H\u207A(aq) + OH\u207B(aq) \u2192 H\u2082O(l)"],
      "Ammonia is a weak base and is written as NH\u2083 molecules. The proton from the strong acid transfers to NH\u2083, and Cl\u207B is the only spectator: <b>NH\u2083(aq) + H\u207A(aq) \u2192 NH\u2084\u207A(aq)</b>.",{});
  }
]));

var NETCASES=[
    {desc:"hydrofluoric acid reacting with sodium hydroxide solution",
     ans:["HF + OH\u207B \u2192 F\u207B + H\u2082O","HF + OH- -> F- + H2O","HF(aq) + OH\u207B(aq) \u2192 F\u207B(aq) + H\u2082O(l)","HF(aq)+OH-(aq)->F-(aq)+H2O(l)","OH\u207B + HF \u2192 F\u207B + H\u2082O","OH- + HF -> F- + H2O"],
     show:"HF(aq) + OH\u207B(aq) \u2192 F\u207B(aq) + H\u2082O(l)"},
    {desc:"ammonium chloride solution reacting with potassium hydroxide solution",
     ans:["NH\u2084\u207A + OH\u207B \u2192 NH\u2083 + H\u2082O","NH4+ + OH- -> NH3 + H2O","NH\u2084\u207A(aq) + OH\u207B(aq) \u2192 NH\u2083(aq) + H\u2082O(l)","NH4+(aq)+OH-(aq)->NH3(aq)+H2O(l)","OH\u207B + NH\u2084\u207A \u2192 NH\u2083 + H\u2082O","OH- + NH4+ -> NH3 + H2O"],
     show:"NH\u2084\u207A(aq) + OH\u207B(aq) \u2192 NH\u2083(aq) + H\u2082O(l)"},
    {desc:"hydrochloric acid reacting with ammonia solution",
     ans:["H\u207A + NH\u2083 \u2192 NH\u2084\u207A","H+ + NH3 -> NH4+","H\u207A(aq) + NH\u2083(aq) \u2192 NH\u2084\u207A(aq)","H+(aq)+NH3(aq)->NH4+(aq)","NH\u2083 + H\u207A \u2192 NH\u2084\u207A","NH3 + H+ -> NH4+","H\u2083O\u207A + NH\u2083 \u2192 NH\u2084\u207A + H\u2082O","H3O+ + NH3 -> NH4+ + H2O"],
     show:"H\u207A(aq) + NH\u2083(aq) \u2192 NH\u2084\u207A(aq)"},
    {desc:"acetic acid reacting with potassium hydroxide solution",
     ans:["CH\u2083COOH + OH\u207B \u2192 CH\u2083COO\u207B + H\u2082O","CH3COOH + OH- -> CH3COO- + H2O","CH\u2083COOH(aq) + OH\u207B(aq) \u2192 CH\u2083COO\u207B(aq) + H\u2082O(l)","CH3COOH(aq)+OH-(aq)->CH3COO-(aq)+H2O(l)","OH\u207B + CH\u2083COOH \u2192 CH\u2083COO\u207B + H\u2082O","OH- + CH3COOH -> CH3COO- + H2O","C\u2082H\u2083O\u2082H + OH\u207B \u2192 C\u2082H\u2083O\u2082\u207B + H\u2082O"],
     show:"CH\u2083COOH(aq) + OH\u207B(aq) \u2192 CH\u2083COO\u207B(aq) + H\u2082O(l)"}
];
E("u2-63-write-net",2,["6.3"],3,"var",varset(NETCASES.map(function(r){return function(){
  return textq("Write the net ionic equation for "+r.desc+". Type the equation using \u2192 or -> between the reactants and products.",
    r.ans,
    "Identify the actual reacting species and cancel the spectators. Weak electrolytes (HF, NH\u2083, CH\u2083COOH) and the ion NH\u2084\u207A are written as they exist in solution. The net ionic equation is <b>"+r.show+"</b>.",{});
};})));

var EQJCASES=[
    {eq:"HF(aq) + CH\u2083COO\u207B(aq) \u21CC F\u207B(aq) + CH\u2083COOH(aq)",ans:"Products are favoured: HF (Ka = 3.5 \u00D7 10\u207B\u2074) is a stronger acid than acetic acid (Ka = 1.8 \u00D7 10\u207B\u2075), so the equilibrium favours the side with the weaker acid",w:["Reactants are favoured: the stronger acid always stays unreacted","Neither side is favoured, because all acid-base equilibria have K = 1","Products are favoured, because fluoride is a stronger base than acetate"]},
    {eq:"HCN(aq) + F\u207B(aq) \u21CC CN\u207B(aq) + HF(aq)",ans:"Reactants are favoured: HF (Ka = 3.5 \u00D7 10\u207B\u2074) is a much stronger acid than HCN (Ka = 6.2 \u00D7 10\u207B\u00B9\u2070), so the equilibrium favours the side with the weaker acid, HCN",w:["Products are favoured: HF is a stronger acid than HCN","Neither side is favoured, because both acids are weak","Products are favoured, because the cyanide ion is a weaker base than fluoride"]},
    {eq:"NH\u2084\u207A(aq) + CH\u2083COO\u207B(aq) \u21CC NH\u2083(aq) + CH\u2083COOH(aq)",ans:"Reactants are slightly favoured: acetic acid (Ka = 1.8 \u00D7 10\u207B\u2075) is a much stronger acid than the ammonium ion (Ka = 5.6 \u00D7 10\u207B\u00B9\u2070), so the equilibrium favours the side holding the weaker acid, NH\u2084\u207A",w:["Products are strongly favoured: both products are neutral molecules","Neither side is favoured, because the two Ka values are nearly equal","Products are favoured, because NH\u2083 is a gas and escapes"]}
];
E("u2-63-equilibrium-judgement",2,["6.3"],3,"var",varset(EQJCASES.map(function(r){return function(){
  return mcq("Use the Ka values in the Reference Information to predict the position of this acid-base equilibrium: "+r.eq+".",
    r.ans,r.w,
    "In an acid-base equilibrium, the position favours the side with the weaker acid (and weaker base): the proton ends up on the stronger base. Comparing the Ka values gives the answer. <b>"+r.ans.split(":")[0]+"</b>.",{});
};})));

/* ---------- 6.4 The pH scale ---------- */

E("u2-64-ph-from-h",2,["6.4"],2,"gen",function(){
  var M=[[1.0,2],[1.5,2],[2.0,2],[2.5,2],[3.0,2],[4.0,2],[5.0,2],[6.0,2],[8.0,2],[1.25,3],[2.50,3],[3.20,3],[5.60,3],[7.90,3]];
  var mm=pick(M),e=ri(1,6);
  var H=mm[0]*Math.pow(10,-e),dec=mm[1];
  var pH=-Math.log10(H);
  var ctx=pick(["A solution","A sample of hydrochloric acid (a strong acid, completely ionized)","A sample of gastric juice","A laboratory solution"]);
  var ans=pH;
  return numq(ctx+" has [H\u2083O\u207A] = "+sciF(H,dec)+" mol/L. Calculate the pH of the solution.",
    ans,0.03,
    "pH = -log[H\u2083O\u207A] = -log("+sciF(H,dec)+") = "+phF(pH,dec)+". The concentration has "+dec+" significant figures, so the pH is reported to "+dec+" decimal places. The pH is <b>"+phF(ans,dec)+"</b>.",{e:e,dec:dec});
});

E("u2-64-h-from-ph",2,["6.4"],2,"gen",function(){
  var M=[[1.3,2],[2.0,2],[2.5,2],[3.2,2],[4.0,2],[5.6,2],[7.9,2],[1.25,3],[3.98,3],[6.31,3]];
  var mm=pick(M),e=ri(2,9);
  var H=mm[0]*Math.pow(10,-e);
  var pH=-Math.log10(H);
  var dec=mm[1];
  var sample=pick(["lemon juice","a soft drink","tomato juice","rainwater","a shampoo solution","black coffee"]);
  var ans=sfR(H,3);
  return numq("A sample of "+sample+" has a pH of "+phF(pH,dec)+". Calculate [H\u2083O\u207A] in the sample. Give your answer in mol/L, as a decimal or in scientific notation (for example 5.56e-10).",
    ans,Math.max(0.06*ans,1e-12),
    "[H\u2083O\u207A] = 10^-pH = 10^("+("-"+phF(pH,dec))+") = "+sciF(H,4)+" mol/L. So [H\u2083O\u207A] = <b>"+sciF(ans,3)+" mol/L</b>.",{e:e});
});

E("u2-64-oh-to-ph",2,["6.4"],2,"gen",function(){
  var M=[[1.0,2],[1.6,2],[2.0,2],[2.5,2],[4.0,2],[4.5,2],[5.0,2],[1.25,3],[3.20,3],[6.30,3],[8.90,3]];
  var mm=pick(M),e=ri(1,6);
  var OH=mm[0]*Math.pow(10,-e),dec=mm[1];
  var pOH=-Math.log10(OH);
  var pH=14-pOH;
  var ctx=pick(["A solution of sodium hydroxide (a strong base)","A cleaning solution","A solution of potassium hydroxide (a strong base)"]);
  return numq(ctx+" has [OH\u207B] = "+sciF(OH,dec)+" mol/L at 25 \u00B0C. Calculate the pH of the solution.",
    pH,0.03,
    "pOH = -log[OH\u207B] = -log("+sciF(OH,dec)+") = "+phF(pOH,dec)+". Then pH = 14.00 - pOH = 14.00 - "+phF(pOH,dec)+" = "+phF(pH,dec)+". The pH is <b>"+phF(pH,dec)+"</b>.",{e:e,dec:dec});
});

E("u2-64-scale-compare",2,["6.4"],1,"gen",function(){
  var p1=ri(1,4),d=pick([2,3]),p2=p1+d;
  var factor=Math.pow(10,d);
  var s1=pick(["a lemon juice","a vinegar solution","an acid rain sample"]),s2=pick(["a soap solution","a baking soda solution","a seawater sample"]);
  return mcq("Solution A ("+s1+") has a pH of "+p1+" and Solution B ("+s2+") has a pH of "+p2+". How do their [H\u2083O\u207A] values compare?",
    "Solution A has "+factor+" times the [H\u2083O\u207A] of Solution B",
    ["Solution A has "+d+" times the [H\u2083O\u207A] of Solution B",
     "Solution B has "+factor+" times the [H\u2083O\u207A] of Solution A",
     "The two solutions have equal [H\u2083O\u207A], because both are liquids"],
    "The pH scale is logarithmic: each pH unit is a factor of 10 in [H\u2083O\u207A]. A difference of "+d+" units means a factor of 10^"+d+" = "+factor+", and the lower pH has the higher concentration. Solution A has "+factor+" times the [H\u2083O\u207A] of Solution B.",{p1:p1,p2:p2});
});

E("u2-64-neutral-water",2,["6.4"],1,"var",varset([
  function(){
    return mcq("At 25 \u00B0C, pure water has a pH of 7.00. This is because",
      "In pure water [H\u2083O\u207A] = [OH\u207B] = 1.0 \u00D7 10\u207B\u2077 mol/L, so the water is neutral",
      ["Pure water contains no ions at all",
       "The pH scale runs from 0 to 14, so 7 must be the middle for every substance",
       "Water molecules stop ionizing at 25 \u00B0C"],
      "Water autoionizes slightly, producing equal amounts of H\u2083O\u207A and OH\u207B. Equal concentrations make it neutral, and at 25 \u00B0C each is 1.0 \u00D7 10\u207B\u2077 mol/L, giving pH 7.00.",{});
  },
  function(){
    return mcq("At 25 \u00B0C, Kw for water is 1.0 \u00D7 10\u207B\u00B9\u2074. Which relationship holds in every aqueous solution at this temperature?",
      "[H\u2083O\u207A] \u00D7 [OH\u207B] = 1.0 \u00D7 10\u207B\u00B9\u2074",
      ["[H\u2083O\u207A] + [OH\u207B] = 1.0 \u00D7 10\u207B\u00B9\u2074",
       "[H\u2083O\u207A] = [OH\u207B] in every solution",
       "[H\u2083O\u207A] \u00D7 [OH\u207B] = 14.00"],
      "Kw is the equilibrium constant for the autoionization of water, so the product of the two ion concentrations is fixed at 1.0 \u00D7 10\u207B\u00B9\u2074 at 25 \u00B0C, even though the individual concentrations vary from solution to solution.",{});
  },
  function(){
    return mcq("A solution at 25 \u00B0C has a pH of 7.00 but contains a dissolved salt. Which statement must be true?",
      "The solution is neutral, because [H\u2083O\u207A] = [OH\u207B] at pH 7.00 and 25 \u00B0C",
      ["The solution must be pure water, since only pure water has pH 7",
       "The solution is an acid, because salts are acidic",
       "The solution cannot contain any OH\u207B ions"],
      "Neutral is defined by equal ion concentrations, not by the absence of other substances. At 25 \u00B0C that equality occurs at pH 7.00, whether or not a salt is dissolved.",{});
  }
]));

E("u2-64-dilution-ph",2,["6.4"],3,"gen",function(){
  var combos=[
    {c1:1.00,v1:10.0,v2:1000},{c1:1.00,v1:25.0,v2:500},{c1:0.500,v1:10.0,v2:250},
    {c1:2.00,v1:10.0,v2:1000},{c1:0.100,v1:50.0,v2:500},{c1:1.00,v1:20.0,v2:200},
    {c1:0.500,v1:25.0,v2:250},{c1:2.00,v1:25.0,v2:500},
    {c1:1.00,v1:5.00,v2:500},{c1:1.00,v1:10.0,v2:500},{c1:0.500,v1:20.0,v2:1000},
    {c1:2.00,v1:20.0,v2:250},{c1:0.200,v1:25.0,v2:250},{c1:1.00,v1:15.0,v2:300},
    {c1:0.250,v1:40.0,v2:200},{c1:2.00,v1:15.0,v2:600},{c1:0.100,v1:25.0,v2:100},
    {c1:0.500,v1:5.00,v2:100},{c1:1.50,v1:10.0,v2:300},{c1:0.750,v1:20.0,v2:400},
    {c1:1.00,v1:30.0,v2:600},{c1:0.400,v1:50.0,v2:1000},{c1:2.00,v1:5.00,v2:250},
    {c1:0.0500,v1:100,v2:500},{c1:1.00,v1:12.5,v2:250},{c1:0.600,v1:30.0,v2:300}
  ];
  var c=pick(combos);
  var acid=Math.random()<0.5;
  var c2=sfR(c.c1*c.v1/c.v2,4);
  var c2s=sfR(c2,3);
  if(acid){
    var pH=-Math.log10(c2s);
    return numq("A student takes "+gF(c.v1)+" mL of "+gF(c.c1)+" mol/L hydrochloric acid and dilutes it with water to a final volume of "+gF(c.v2)+" mL. Calculate the pH of the diluted solution.",
      pH,0.03,
      "Dilution: C\u2082 = C\u2081V\u2081 / V\u2082 = ("+gF(c.c1)+" \u00D7 "+gF(c.v1)+") / "+gF(c.v2)+" = "+sciF(c2,4)+" mol/L, which is "+sciF(c2s,3)+" mol/L to three significant figures. Hydrochloric acid is strong, so [H\u2083O\u207A] = "+sciF(c2s,3)+" mol/L. pH = -log("+sciF(c2s,3)+") = "+phF(pH,3)+". The pH is <b>"+phF(pH,3)+"</b>.",{});
  }
  var pOH=-Math.log10(c2s),pH=14-pOH;
  return numq("A student takes "+gF(c.v1)+" mL of "+gF(c.c1)+" mol/L sodium hydroxide solution and dilutes it with water to a final volume of "+gF(c.v2)+" mL. Calculate the pH of the diluted solution at 25 \u00B0C.",
    pH,0.03,
    "Dilution: C\u2082 = C\u2081V\u2081 / V\u2082 = ("+gF(c.c1)+" \u00D7 "+gF(c.v1)+") / "+gF(c.v2)+" = "+sciF(c2,4)+" mol/L, which is "+sciF(c2s,3)+" mol/L to three significant figures. Sodium hydroxide is a strong base, so [OH\u207B] = "+sciF(c2s,3)+" mol/L. pOH = -log("+sciF(c2s,3)+") = "+phF(pOH,3)+", and pH = 14.00 - "+phF(pOH,3)+" = "+phF(pH,3)+". The pH is <b>"+phF(pH,3)+"</b>.",{});
});

E("u2-64-mix-stoich-ph",2,["6.4"],3,"gen",function(){
  var combos=[
    {va:50.0,ca:0.200,vb:30.0,cb:0.200},{va:40.0,ca:0.250,vb:25.0,cb:0.200},
    {va:25.0,ca:0.400,vb:40.0,cb:0.100},{va:60.0,ca:0.150,vb:20.0,cb:0.300},
    {va:30.0,ca:0.200,vb:50.0,cb:0.200},{va:25.0,ca:0.200,vb:45.0,cb:0.250},
    {va:20.0,ca:0.300,vb:55.0,cb:0.200},{va:35.0,ca:0.100,vb:60.0,cb:0.150},
    {va:50.0,ca:0.100,vb:20.0,cb:0.100},{va:45.0,ca:0.200,vb:30.0,cb:0.100},
    {va:30.0,ca:0.300,vb:25.0,cb:0.200},{va:55.0,ca:0.150,vb:35.0,cb:0.100},
    {va:15.0,ca:0.400,vb:35.0,cb:0.100},{va:65.0,ca:0.120,vb:25.0,cb:0.240},
    {va:20.0,ca:0.500,vb:60.0,cb:0.100},{va:75.0,ca:0.0800,vb:30.0,cb:0.100},
    {va:40.0,ca:0.100,vb:70.0,cb:0.150},{va:28.0,ca:0.250,vb:52.0,cb:0.100},
    {va:33.0,ca:0.180,vb:66.0,cb:0.120},{va:48.0,ca:0.220,vb:24.0,cb:0.220},
    {va:18.0,ca:0.350,vb:42.0,cb:0.200},{va:52.0,ca:0.140,vb:28.0,cb:0.200},
    {va:26.0,ca:0.280,vb:54.0,cb:0.160},{va:38.0,ca:0.160,vb:62.0,cb:0.140},
    {va:70.0,ca:0.0900,vb:35.0,cb:0.210},{va:22.0,ca:0.420,vb:44.0,cb:0.260}
  ];
  var c=pick(combos);
  var nm=pick([["hydrochloric acid","sodium hydroxide solution"],["nitric acid","potassium hydroxide solution"],["hydrochloric acid","potassium hydroxide solution"],["nitric acid","sodium hydroxide solution"]]);
  var na=sfR(c.ca*c.va/1000,5),nb=sfR(c.cb*c.vb/1000,5);
  var vt=(c.va+c.vb)/1000;
  var acidExcess=na>nb;
  var excess=sfR(Math.abs(na-nb),5);
  var conc=sfR(excess/vt,4),conc3=sfR(conc,3);
  var solHead="Moles of H\u207A from the acid: "+gF(c.ca)+" mol/L \u00D7 "+gF(c.va)+" mL / 1000 = "+iF(na)+" mol. Moles of OH\u207B from the base: "+gF(c.cb)+" mol/L \u00D7 "+gF(c.vb)+" mL / 1000 = "+iF(nb)+" mol. ";
  if(acidExcess){
    var pH=-Math.log10(conc3);
    return numq(gF(c.va)+" mL of "+gF(c.ca)+" mol/L "+nm[0]+" is mixed with "+gF(c.vb)+" mL of "+gF(c.cb)+" mol/L "+nm[1]+". Calculate the pH of the resulting mixture.",
      pH,0.03,
      solHead+"The acid is in excess by "+iF(na)+" - "+iF(nb)+" = "+iF(excess)+" mol of H\u207A. The total volume is "+gF(c.va+c.vb)+" mL = "+fmt(vt,3)+" L, so [H\u2083O\u207A] = "+iF(excess)+" / "+fmt(vt,3)+" = "+sciF(conc,4)+" mol/L = "+sciF(conc3,3)+" mol/L. pH = -log("+sciF(conc3,3)+") = "+phF(pH,3)+". The pH is <b>"+phF(pH,3)+"</b>.",{});
  }
  var pOH=-Math.log10(conc3),pH2=14-pOH;
  return numq(gF(c.va)+" mL of "+gF(c.ca)+" mol/L "+nm[0]+" is mixed with "+gF(c.vb)+" mL of "+gF(c.cb)+" mol/L "+nm[1]+". Calculate the pH of the resulting mixture at 25 \u00B0C.",
    pH2,0.03,
    solHead+"The base is in excess by "+iF(nb)+" - "+iF(na)+" = "+iF(excess)+" mol of OH\u207B. The total volume is "+gF(c.va+c.vb)+" mL = "+fmt(vt,3)+" L, so [OH\u207B] = "+iF(excess)+" / "+fmt(vt,3)+" = "+sciF(conc,4)+" mol/L = "+sciF(conc3,3)+" mol/L. pOH = -log("+sciF(conc3,3)+") = "+phF(pOH,3)+", and pH = 14.00 - "+phF(pOH,3)+" = "+phF(pH2,3)+". The pH is <b>"+phF(pH2,3)+"</b>.",{});
});

/* ---------- 6.5 Weak acid and base equilibrium ---------- */

E("u2-65-weak-acid-ph",2,["6.5"],3,"gen",function(){
  var pools=[
    {name:"acetic acid",ka:1.8e-5,cs:[0.0100,0.0150,0.0200,0.0250,0.0300,0.0400,0.0500,0.0600,0.0800,0.100,0.150,0.200,0.250,0.300,0.400,0.500]},
    {name:"hydrofluoric acid",ka:3.5e-4,cs:[0.200,0.250,0.300,0.400,0.500,0.600,0.750,0.800,1.00]},
    {name:"carbonic acid",ka:4.3e-7,cs:[0.0100,0.0200,0.0500,0.100,0.200,0.250,0.300,0.500]},
    {name:"hydrocyanic acid",ka:6.2e-10,cs:[0.0100,0.0200,0.0500,0.100,0.200,0.250,0.300,0.500,0.750,1.00]},
    {name:"an ammonium chloride solution (NH\u2084\u207A)",ka:5.6e-10,cs:[0.0100,0.0200,0.0500,0.100,0.200,0.250,0.500,0.750,1.00]}
  ];
  var p,x,pct,tries=0;
  do{ p=pick(pools); var C=pick(p.cs); x=Math.sqrt(p.ka*C); pct=100*x/C; tries++; }while(pct>=5&&tries<40);
  if(pct>=5){ p=pools[0]; C=0.100; x=Math.sqrt(p.ka*C); pct=100*x/C; }
  var x4=sfR(x,4),x3=sfR(x,3);
  var pH=-Math.log10(x3);
  return numq("Calculate the pH of a "+gF(C)+" mol/L solution of "+p.name+". The Ka value is in the Reference Information.",
    pH,0.03,
    "For the equilibrium, [H\u2083O\u207A] \u2248 \u221A(Ka \u00D7 C) = \u221A("+sciF(p.ka,2)+" \u00D7 "+gF(C)+") = "+sciF(x4,4)+" mol/L, which is "+sciF(x3,3)+" mol/L to three significant figures. Check: "+sciF(x3,3)+" / "+gF(C)+" \u00D7 100% = "+F3(pct)+"%, so [H\u2083O\u207A] is well under 5% of "+gF(C)+" mol/L and the approximation holds. pH = -log("+sciF(x3,3)+") = "+phF(pH,3)+". The pH is <b>"+phF(pH,3)+"</b>.",{});
});

E("u2-65-weak-base-ph",2,["6.5"],3,"gen",function(){
  var pools=[
    {name:"ammonia",kb:1.8e-5,cs:[0.0100,0.0150,0.0200,0.0250,0.0300,0.0400,0.0500,0.0600,0.0800,0.100,0.150,0.200,0.250,0.300,0.400,0.500,0.750,1.00],label:"NH\u2083"},
    {name:"a sodium cyanide solution (CN\u207B)",kb:1.6e-5,cs:[0.0200,0.0300,0.0400,0.0500,0.0600,0.0800,0.100,0.150,0.200,0.250,0.300,0.400,0.500,0.750,1.00],label:"CN\u207B"},
    {name:"a sodium acetate solution (CH\u2083COO\u207B)",kb:5.6e-10,cs:[0.0100,0.0200,0.0500,0.100,0.200,0.250,0.500,0.750,1.00],label:"CH\u2083COO\u207B"},
    {name:"a sodium fluoride solution (F\u207B)",kb:2.9e-11,cs:[0.0100,0.0200,0.0500,0.100,0.200,0.250,0.500,0.750,1.00],label:"F\u207B"}
  ];
  var p,x,pct,tries=0;
  do{ p=pick(pools); var C=pick(p.cs); x=Math.sqrt(p.kb*C); pct=100*x/C; tries++; }while(pct>=5&&tries<40);
  if(pct>=5){ p=pools[0]; C=0.100; x=Math.sqrt(p.kb*C); pct=100*x/C; }
  var x4=sfR(x,4),x3=sfR(x,3);
  var pOH=-Math.log10(x3),pH=14-pOH;
  return numq("Calculate the pH of a "+gF(C)+" mol/L solution of "+p.name+" at 25 \u00B0C. The Kb value is in the Reference Information.",
    pH,0.03,
    "The base ionizes (or hydrolyzes) to produce OH\u207B: [OH\u207B] \u2248 \u221A(Kb \u00D7 C) = \u221A("+sciF(p.kb,2)+" \u00D7 "+gF(C)+") = "+sciF(x4,4)+" mol/L, which is "+sciF(x3,3)+" mol/L to three significant figures. Check: "+sciF(x3,3)+" / "+gF(C)+" \u00D7 100% = "+F3(pct)+"%, so the approximation holds. pOH = -log("+sciF(x3,3)+") = "+phF(pOH,3)+", and pH = 14.00 - "+phF(pOH,3)+" = "+phF(pH,3)+". The pH is <b>"+phF(pH,3)+"</b>.",{});
});

E("u2-65-ka-from-ph",2,["6.5"],3,"gen",function(){
  var pools=[
    {name:"acetic acid",cs:[0.0100,0.100,0.500,1.00]},
    {name:"benzoic acid",cs:[0.0200,0.0250]},
    {name:"hydrofluoric acid",cs:[0.200,0.500,1.00]},
    {name:"hydrocyanic acid",cs:[0.0100,0.100,1.00]},
    {name:"carbonic acid",cs:[0.0100,0.100]}
  ];
  var p=pick(pools),C=pick(p.cs);
  var es=C<=0.0100?[4,5,6]:(C<=0.0250?[4,5]:[3,4,5]);
  var e=pick(es),m=pick([1.25,2.50,3.16,4.00,5.01,6.31,7.94,9.55]);
  var h=m*Math.pow(10,-e);
  if(h>C/100){ h=C/200; }
  var pH=-Math.log10(h);
  var Ka=(h*h)/(C-h);
  var ans=sfR(Ka,3);
  return numq("A "+gF(C)+" mol/L solution of the weak acid "+p.name+" has a pH of "+phF(pH,3)+". Calculate the Ka of the acid. Give your answer as a decimal or in scientific notation (for example 5.56e-10).",
    ans,Math.max(0.07*ans,1e-13),
    "[H\u2083O\u207A] = 10^-pH = 10^("+"-"+phF(pH,3)+") = "+sciF(h,3)+" mol/L. At equilibrium [A\u207B] = [H\u2083O\u207A] and [HA] = "+gF(C)+" - "+sciF(h,3)+" mol/L. Ka = [H\u2083O\u207A][A\u207B] / [HA] = ("+sciF(h,3)+")\u00B2 / ("+gF(C)+" - "+sciF(h,3)+") = "+sciF(Ka,4)+". So Ka = <b>"+sciF(ans,3)+"</b>.",{});
});

E("u2-65-percent-ionization",2,["6.5"],2,"gen",function(){
  var pools=[
    {name:"acetic acid",ka:1.8e-5,cs:[0.00100,0.00200,0.00500,0.0100,0.0200,0.0500,0.100,0.200,0.500]},
    {name:"hydrofluoric acid",ka:3.5e-4,cs:[0.0100,0.0200,0.0500,0.100,0.200,0.250,0.500]},
    {name:"benzoic acid",ka:6.3e-5,cs:[0.00500,0.0100,0.0150,0.0200,0.0250]},
    {name:"carbonic acid",ka:4.3e-7,cs:[0.0100,0.0500,0.100,0.500]},
    {name:"hydrocyanic acid",ka:6.2e-10,cs:[0.0100,0.0500,0.100,0.500,1.00]}
  ];
  var p=pick(pools),C=pick(p.cs);
  var x=Math.sqrt(p.ka*C);
  var pct=100*x/C;
  var ans=sfR(pct,3);
  var vol=pick([100,250,500]);
  return numq("A "+vol+" mL sample of a "+gF(C)+" mol/L solution of "+p.name+" is prepared. Calculate the percent ionization of the acid. The Ka value is in the Reference Information. Give your answer as a percent.",
    ans,Math.max(0.03*ans,0.02),
    "[H\u2083O\u207A] \u2248 \u221A(Ka \u00D7 C) = \u221A("+sciF(p.ka,2)+" \u00D7 "+gF(C)+") = "+sciF(x,4)+" mol/L. Percent ionization = [H\u2083O\u207A] / C \u00D7 100% = "+sciF(x,4)+" / "+gF(C)+" \u00D7 100% = "+F3(pct)+"%. The percent ionization is <b>"+F3(ans)+"%</b>.",{});
});

E("u2-65-compare-ph",2,["6.5"],3,"gen",function(){
  var acids=[
    {name:"hydrofluoric acid",ka:3.5e-4,cs:[0.100,0.200,0.500]},
    {name:"acetic acid",ka:1.8e-5,cs:[0.0100,0.100,0.500]},
    {name:"benzoic acid",ka:6.3e-5,cs:[0.0200,0.0250]},
    {name:"carbonic acid",ka:4.3e-7,cs:[0.0100,0.100,0.500]},
    {name:"hydrocyanic acid",ka:6.2e-10,cs:[0.100,0.500,1.00]}
  ];
  var A,B,pHA,pHB,tries=0;
  do{
    A=pick(acids); B=pick(acids);
    var ca=pick(A.cs),cb=pick(B.cs);
    pHA=-Math.log10(Math.sqrt(A.ka*ca)); pHB=-Math.log10(Math.sqrt(B.ka*cb)); tries++;
  }while((A===B||Math.abs(pHA-pHB)<0.4)&&tries<60);
  if(A===B){ A=acids[0]; B=acids[1]; ca=0.100; cb=0.100; pHA=-Math.log10(Math.sqrt(A.ka*ca)); pHB=-Math.log10(Math.sqrt(B.ka*cb)); }
  var lowerFirst=pHA<pHB;
  var lowName=lowerFirst?"the "+A.name:"the "+B.name, highName=lowerFirst?"the "+B.name:"the "+A.name;
  var lowPh=lowerFirst?pHA:pHB, highPh=lowerFirst?pHB:pHA;
  var solA="the "+A.name+" ("+gF(ca)+" mol/L)", solB="the "+B.name+" ("+gF(cb)+" mol/L)";
  var correct="The solution of "+lowName+" has the lower pH: its [H\u2083O\u207A] is larger, giving pH \u2248 "+phF(lowPh,2)+" compared with pH \u2248 "+phF(highPh,2);
  return mcq("Solution 1 is "+solA+" and Solution 2 is "+solB+". Both Ka values are in the Reference Information. Which solution has the lower pH, and why?",
    correct,
    ["The solution of "+highName+" has the lower pH: its [H\u2083O\u207A] is larger, giving pH \u2248 "+phF(lowPh,2)+" compared with pH \u2248 "+phF(highPh,2),
     "Both solutions have the same pH, because pH depends only on concentration",
     "The solution with the smaller Ka always has the lower pH, regardless of concentration"],
    "Estimate [H\u2083O\u207A] \u2248 \u221A(Ka \u00D7 C) for each: for "+solA+", [H\u2083O\u207A] \u2248 "+sciF(Math.sqrt(A.ka*ca),3)+" mol/L (pH \u2248 "+phF(pHA,2)+"); for "+solB+", [H\u2083O\u207A] \u2248 "+sciF(Math.sqrt(B.ka*cb),3)+" mol/L (pH \u2248 "+phF(pHB,2)+"). The larger [H\u2083O\u207A] gives the lower pH. <b>"+correct.split(":")[0]+"</b>.",{});
});

E("u2-65-approx-validity",2,["6.5"],2,"gen",function(){
  var cases=[
    {name:"acetic acid",ka:1.8e-5,C:0.00100},
    {name:"acetic acid",ka:1.8e-5,C:0.000500},
    {name:"acetic acid",ka:1.8e-5,C:0.0500},
    {name:"acetic acid",ka:1.8e-5,C:0.100},
    {name:"hydrofluoric acid",ka:3.5e-4,C:0.0100},
    {name:"hydrofluoric acid",ka:3.5e-4,C:0.0500},
    {name:"hydrofluoric acid",ka:3.5e-4,C:0.100},
    {name:"hydrofluoric acid",ka:3.5e-4,C:0.500},
    {name:"benzoic acid",ka:6.3e-5,C:0.0100},
    {name:"benzoic acid",ka:6.3e-5,C:0.0250},
    {name:"carbonic acid",ka:4.3e-7,C:0.0100},
    {name:"carbonic acid",ka:4.3e-7,C:0.100},
    {name:"hydrocyanic acid",ka:6.2e-10,C:0.100}
  ];
  var c=pick(cases);
  var tp=pick([18,20,22,25,28,30]);
  var x=Math.sqrt(c.ka*c.C),pct=100*x/c.C;
  var ok=pct<5;
  var yes="Yes: [H\u2083O\u207A] \u2248 "+sciF(x,3)+" mol/L is only "+F3(pct)+"% of the initial concentration, under the 5% limit";
  var no="No: [H\u2083O\u207A] \u2248 "+sciF(x,3)+" mol/L is "+F3(pct)+"% of the initial concentration, over the 5% limit, so the full equilibrium calculation is needed";
  var correct=ok?yes:no, wrong=ok?no:yes;
  return mcq("At "+tp+" \u00B0C, a student wants to calculate the pH of a "+gF(c.C)+" mol/L solution of "+c.name+" (Ka = "+sciF(c.ka,2)+") using the approximation [H\u2083O\u207A] \u2248 \u221A(Ka \u00D7 C), which neglects the change in the acid concentration. Is the approximation justified?",
    correct,[wrong,
     "Yes, always: the approximation works for every weak acid at every concentration",
     "No, never: approximations are not allowed in equilibrium calculations"],
    "Test the approximation: [H\u2083O\u207A] \u2248 \u221A("+sciF(c.ka,2)+" \u00D7 "+gF(c.C)+") = "+sciF(x,4)+" mol/L, and "+sciF(x,4)+" / "+gF(c.C)+" \u00D7 100% = "+F3(pct)+"%. The rule is that the ionized amount must be under about 5% of the initial concentration. <b>"+(ok?"Yes":"No")+"</b>: the value is "+F3(pct)+"% of C.",{});
});

/* ---------- 6.6 Conjugate pairs and hydrolysis ---------- */

E("u2-66-kb-calc",2,["6.6"],2,"gen",function(){
  var mant=pick([1.5,2.0,2.5,3.0,3.5,4.0,4.5,5.0,5.5,6.0,6.5,7.0,7.5,8.0,8.5,9.0,9.5]);
  var expo=pick([-4,-5,-6,-7,-8,-9,-10]);
  var ka=mant*Math.pow(10,expo);
  var kb=1.0e-14/ka;
  var ans=sfR(kb,3);
  return numq("A weak acid HA has Ka = "+sciF(ka,2)+" at 25 \u00B0C. Calculate Kb for its conjugate base, A\u207B. Give your answer as a decimal or in scientific notation (for example 5.56e-10).",
    ans,0.03*ans,
    "For a conjugate acid-base pair, Ka \u00D7 Kb = Kw = 1.0 \u00D7 10\u207B\u00B9\u2074 at 25 \u00B0C. Kb = Kw / Ka = 1.0 \u00D7 10\u207B\u00B9\u2074 / "+sciF(ka,2)+" = "+sciF(kb,3)+". The Kb of A\u207B is <b>"+sciF(ans,3)+"</b>.",{});
});

E("u2-66-kb-from-ka",2,["6.6"],2,"gen",function(){
  var pairs=[
    {acid:"HF",ka:3.5e-4,base:"F\u207B"},
    {acid:"acetic acid",ka:1.8e-5,base:"CH\u2083COO\u207B"},
    {acid:"HCN",ka:6.2e-10,base:"CN\u207B"},
    {acid:"benzoic acid",ka:6.3e-5,base:"C\u2086H\u2085COO\u207B"},
    {acid:"the ammonium ion, NH\u2084\u207A",ka:5.6e-10,base:"NH\u2083"},
    {acid:"carbonic acid",ka:4.3e-7,base:"HCO\u2083\u207B"}
  ];
  var named=Math.random()<0.45;
  if(named){
    var p=pick(pairs);
    var Kb=1.0e-14/p.ka;
    var ans=sfR(Kb,3);
    return numq("At 25 \u00B0C, the Ka of "+p.acid+" is "+sciF(p.ka,2)+". Calculate the Kb of its conjugate base, "+p.base+". Give your answer as a decimal or in scientific notation (for example 5.56e-10).",
      ans,Math.max(0.03*ans,1e-13),
      "For a conjugate acid-base pair, Ka \u00D7 Kb = Kw = 1.0 \u00D7 10\u207B\u00B9\u2074 at 25 \u00B0C. Kb = 1.0 \u00D7 10\u207B\u00B9\u2074 / "+sciF(p.ka,2)+" = "+sciF(Kb,4)+". So Kb = <b>"+sciF(ans,3)+"</b>.",{named:1});
  }
  var mant=pick([1.0,1.8,2.5,3.5,4.3,5.6,6.2,6.3,7.9,9.0]),ex=pick([-3,-4,-5,-6,-7,-8,-9,-10]);
  var Ka=mant*Math.pow(10,ex);
  var Kb2=1.0e-14/Ka;
  var ans2=sfR(Kb2,3);
  return numq("A weak acid HA has Ka = "+sciF(Ka,2)+" at 25 \u00B0C. Calculate the Kb of its conjugate base, A\u207B. Give your answer as a decimal or in scientific notation (for example 5.56e-10).",
    ans2,Math.max(0.03*ans2,1e-13),
    "For a conjugate acid-base pair, Ka \u00D7 Kb = Kw = 1.0 \u00D7 10\u207B\u00B9\u2074 at 25 \u00B0C. Kb = 1.0 \u00D7 10\u207B\u00B9\u2074 / "+sciF(Ka,2)+" = "+sciF(Kb2,4)+". So Kb = <b>"+sciF(ans2,3)+"</b>.",{named:0});
});

E("u2-66-salt-predict",2,["6.6"],2,"gen",function(){
  var salts=[
    {s:"sodium chloride",v:"neutral (pH = 7)",why:"Na\u207A and Cl\u207B come from a strong base and a strong acid, so neither ion hydrolyzes"},
    {s:"potassium nitrate",v:"neutral (pH = 7)",why:"K\u207A and NO\u2083\u207B come from a strong base and a strong acid, so neither ion hydrolyzes"},
    {s:"ammonium chloride",v:"acidic (pH < 7)",why:"NH\u2084\u207A is the conjugate acid of a weak base and donates a proton to water, producing H\u2083O\u207A"},
    {s:"ammonium sulfate",v:"acidic (pH < 7)",why:"NH\u2084\u207A is the conjugate acid of a weak base and donates a proton to water, producing H\u2083O\u207A"},
    {s:"iron(III) chloride",v:"acidic (pH < 7)",why:"the small, highly charged Fe\u00B3\u207A ion pulls electron density from water and releases H\u2083O\u207A"},
    {s:"sodium acetate",v:"basic (pH > 7)",why:"CH\u2083COO\u207B is the conjugate base of a weak acid and accepts a proton from water, producing OH\u207B"},
    {s:"sodium cyanide",v:"basic (pH > 7)",why:"CN\u207B is the conjugate base of a weak acid and accepts a proton from water, producing OH\u207B"},
    {s:"sodium fluoride",v:"basic (pH > 7)",why:"F\u207B is the conjugate base of a weak acid and accepts a proton from water, producing OH\u207B"},
    {s:"potassium carbonate",v:"basic (pH > 7)",why:"CO\u2083\u00B2\u207B is the conjugate base of a weak acid and accepts a proton from water, producing OH\u207B"},
    {s:"ammonium acetate",v:"neutral (pH \u2248 7)",why:"NH\u2084\u207A (Ka = 5.6 \u00D7 10\u207B\u00B9\u2070) and CH\u2083COO\u207B (Kb = 5.6 \u00D7 10\u207B\u00B9\u2070) hydrolyze to nearly the same extent, so the effects cancel"},
    {s:"ammonium fluoride",v:"acidic (pH < 7)",why:"NH\u2084\u207A (Ka = 5.6 \u00D7 10\u207B\u00B9\u2070) hydrolyzes more than F\u207B (Kb = 2.9 \u00D7 10\u207B\u00B9\u00B9), so H\u2083O\u207A production wins"}
  ];
  var p=pick(salts);
  var C=pick([0.0500,0.100,0.200]);
  var vol=pick([100,250,500]);
  var verdicts=["acidic (pH < 7)","basic (pH > 7)","neutral (pH = 7)","neutral (pH \u2248 7)"];
  var correctV=p.v;
  var ds=verdicts.filter(function(v){return v!==correctV&&!(correctV.indexOf("neutral")===0&&v.indexOf("neutral")===0);}).slice(0,2);
  ds.push("impossible to predict from the formula");
  return mcq("A "+gF(C)+" mol/L solution of "+p.s+" is prepared in a "+vol+" mL flask at 25 \u00B0C. Predict the nature of the solution.",
    correctV+": "+p.why,ds.map(function(d){return d+": the ions of any salt react completely with water";}),
    "Decide which ions come from a weak acid or a weak base, because only those hydrolyze. Here, "+p.why+". The solution is <b>"+correctV+"</b>.",{salt:p.s});
});

E("u2-66-hydrolysis-ion",2,["6.6"],2,"gen",function(){
  var salts=[
    {s:"sodium acetate",eq:"CH\u2083COO\u207B(aq) + H\u2082O(l) \u21CC CH\u2083COOH(aq) + OH\u207B(aq)",ion:"the acetate ion, CH\u2083COO\u207B",w:["Na\u207A(aq) + H\u2082O(l) \u21CC NaOH(aq) + H\u207A(aq)","CH\u2083COO\u207B(aq) + H\u2082O(l) \u21CC CH\u2083\u207B(aq) + CO\u2082(g) + H\u2082O(l)","no ion hydrolyzes in this salt"]},
    {s:"ammonium chloride",eq:"NH\u2084\u207A(aq) + H\u2082O(l) \u21CC NH\u2083(aq) + H\u2083O\u207A(aq)",ion:"the ammonium ion, NH\u2084\u207A",w:["Cl\u207B(aq) + H\u2082O(l) \u21CC HCl(aq) + OH\u207B(aq)","NH\u2084\u207A(aq) + H\u2082O(l) \u21CC NH\u2085\u00B2\u207A(aq) + OH\u207B(aq)","no ion hydrolyzes in this salt"]},
    {s:"sodium cyanide",eq:"CN\u207B(aq) + H\u2082O(l) \u21CC HCN(aq) + OH\u207B(aq)",ion:"the cyanide ion, CN\u207B",w:["Na\u207A(aq) + H\u2082O(l) \u21CC NaOH(aq) + H\u207A(aq)","CN\u207B(aq) + H\u2082O(l) \u21CC C\u207A(aq) + N\u207B(aq) + H\u2082O(l)","no ion hydrolyzes in this salt"]},
    {s:"sodium fluoride",eq:"F\u207B(aq) + H\u2082O(l) \u21CC HF(aq) + OH\u207B(aq)",ion:"the fluoride ion, F\u207B",w:["Na\u207A(aq) + H\u2082O(l) \u21CC NaOH(aq) + H\u207A(aq)","F\u207B(aq) + H\u2082O(l) \u21CC F\u2082\u207A(aq) + 2 H\u207A(aq)","no ion hydrolyzes in this salt"]},
    {s:"ammonium nitrate",eq:"NH\u2084\u207A(aq) + H\u2082O(l) \u21CC NH\u2083(aq) + H\u2083O\u207A(aq)",ion:"the ammonium ion, NH\u2084\u207A",w:["NO\u2083\u207B(aq) + H\u2082O(l) \u21CC HNO\u2083(aq) + OH\u207B(aq)","NH\u2084\u207A(aq) + H\u2082O(l) \u21CC NH\u2083(aq) + H\u2082(g) + OH\u207B(aq)","no ion hydrolyzes in this salt"]},
    {s:"potassium carbonate",eq:"CO\u2083\u00B2\u207B(aq) + H\u2082O(l) \u21CC HCO\u2083\u207B(aq) + OH\u207B(aq)",ion:"the carbonate ion, CO\u2083\u00B2\u207B",w:["K\u207A(aq) + H\u2082O(l) \u21CC KOH(aq) + H\u207A(aq)","CO\u2083\u00B2\u207B(aq) + H\u2082O(l) \u21CC CO\u2082(g) + 2 OH\u207B(aq)","no ion hydrolyzes in this salt"]},
    {s:"sodium benzoate",eq:"C\u2086H\u2085COO\u207B(aq) + H\u2082O(l) \u21CC C\u2086H\u2085COOH(aq) + OH\u207B(aq)",ion:"the benzoate ion, C\u2086H\u2085COO\u207B",w:["Na\u207A(aq) + H\u2082O(l) \u21CC NaOH(aq) + H\u207A(aq)","C\u2086H\u2085COO\u207B(aq) \u2192 C\u2086H\u2086(g) + CO\u2082(g)","no ion hydrolyzes in this salt"]},
    {s:"ammonium sulfate",eq:"NH\u2084\u207A(aq) + H\u2082O(l) \u21CC NH\u2083(aq) + H\u2083O\u207A(aq)",ion:"the ammonium ion, NH\u2084\u207A",w:["SO\u2084\u00B2\u207B(aq) + H\u2082O(l) \u21CC H\u2082SO\u2084(aq) + OH\u207B(aq)","NH\u2084\u207A(aq) \u2192 N\u2082(g) + 4 H\u2082(g)","no ion hydrolyzes in this salt"]}
  ];
  var p=pick(salts);
  var vol=pick([100,250,500]),C=pick([0.0500,0.100,0.200]);
  return mcq("A "+gF(C)+" mol/L solution of "+p.s+" is prepared in a "+vol+" mL flask. Which equation correctly shows the hydrolysis that occurs?",
    p.eq,p.w,
    "Only the ion from a weak acid or a weak base hydrolyzes. In "+p.s+" that is "+p.ion+", which reacts with water: <b>"+p.eq+"</b>.",{salt:p.s});
});

E("u2-66-kw-relation",2,["6.6"],1,"var",varset([
  function(){
    return mcq("For any conjugate acid-base pair at 25 \u00B0C, the constants obey",
      "Ka \u00D7 Kb = 1.0 \u00D7 10\u207B\u00B9\u2074",
      ["Ka + Kb = 1.0 \u00D7 10\u207B\u00B9\u2074","Ka \u00D7 Kb = 14.00","Ka = Kb for every pair"],
      "The ionization of the acid and the hydrolysis of its conjugate base add up to the autoionization of water, so their constants multiply to Kw: Ka \u00D7 Kb = 1.0 \u00D7 10\u207B\u00B9\u2074 at 25 \u00B0C.",{});
  },
  function(){
    return mcq("Acid A has Ka = 1.0 \u00D7 10\u207B\u00B3 and acid B has Ka = 1.0 \u00D7 10\u207B\u2078. Which statement about their conjugate bases is correct?",
      "The conjugate base of B is much stronger than the conjugate base of A",
      ["The conjugate base of A is much stronger than the conjugate base of B",
       "Both conjugate bases have the same strength",
       "Neither acid has a conjugate base"],
      "Conjugate strengths run in opposite directions: the weaker the acid, the stronger its conjugate base. Acid B is far weaker, so its conjugate base is far stronger. <b>The conjugate base of B is much stronger</b>.",{});
  },
  function(){
    return mcq("Chloride ion, Cl\u207B, is the conjugate base of the strong acid HCl. Which statement describes Cl\u207B in water?",
      "It is an extremely weak base: it does not hydrolyze measurably, so a chloride salt of a strong base is neutral",
      ["It is a strong base that raises the pH sharply",
       "It hydrolyzes to produce H\u2083O\u207A",
       "It reacts with water to reform HCl completely"],
      "The conjugate base of a strong acid is a negligibly weak base. Chloride does not accept protons from water to any measurable extent, which is why NaCl solutions are neutral.",{});
  }
]));

/* ---------- 6.7 Indicators ---------- */

E("u2-67-indicator-choice",2,["6.7"],2,"gen",function(){
  var cases=[
    {desc:"hydrochloric acid titrated with sodium hydroxide",eq:"about 7",best:"bromothymol blue (range 6.0 to 7.6)",w:["phenolphthalein (range 8.2 to 10.0)","methyl orange (range 3.1 to 4.4)","no indicator can work for a strong acid"]},
    {desc:"acetic acid titrated with sodium hydroxide",eq:"above 7 (about 9)",best:"phenolphthalein (range 8.2 to 10.0)",w:["methyl orange (range 3.1 to 4.4)","bromothymol blue (range 6.0 to 7.6)","methyl red (range 4.4 to 6.2)"]},
    {desc:"aqueous ammonia titrated with hydrochloric acid",eq:"below 7 (about 5)",best:"methyl orange (range 3.1 to 4.4)",w:["phenolphthalein (range 8.2 to 10.0)","bromothymol blue (range 6.0 to 7.6)","thymol blue (range 8.0 to 9.6)"]},
    {desc:"nitric acid titrated with potassium hydroxide",eq:"about 7",best:"bromothymol blue (range 6.0 to 7.6)",w:["phenolphthalein (range 8.2 to 10.0)","methyl orange (range 3.1 to 4.4)","no indicator can work for a strong acid"]},
    {desc:"sodium hydroxide solution titrated with hydrochloric acid",eq:"about 7",best:"bromothymol blue (range 6.0 to 7.6)",w:["phenolphthalein (range 8.2 to 10.0)","methyl orange (range 3.1 to 4.4)","no indicator can work for a strong acid"]}
  ];
  var c=pick(cases);
  var vol=pick([10.0,20.0,25.0,50.0]),conc=pick([0.0500,0.100,0.200]),tp=ri(18,30);
  return mcq("In a titration at "+tp+" \u00B0C, "+gF(vol)+" mL of a "+gF(conc)+" mol/L solution is used in the reaction where "+c.desc+". The pH at the equivalence point is "+c.eq+". Using the indicator table in the Reference Information, the best indicator is",
    c.best,c.w,
    "An indicator works when its colour change range brackets the pH at the equivalence point. Here that pH is "+c.eq+", so the best choice is <b>"+c.best+"</b>.",{});
});

E("u2-67-indicator-colour",2,["6.7"],2,"gen",function(){
  var cases=[
    {ind:"bromothymol blue",ph:4.0,col:"yellow",w:["blue","green","pink"]},
    {ind:"bromothymol blue",ph:9.0,col:"blue",w:["yellow","green","red"]},
    {ind:"methyl orange",ph:2.0,col:"red",w:["yellow","orange","blue"]},
    {ind:"methyl orange",ph:8.0,col:"yellow",w:["red","orange","green"]},
    {ind:"phenolphthalein",ph:5.0,col:"colourless",w:["pink","magenta","purple"]},
    {ind:"phenolphthalein",ph:11.0,col:"pink",w:["colourless","yellow","blue"]},
    {ind:"litmus",ph:3.0,col:"red",w:["blue","purple","pink"]},
    {ind:"litmus",ph:10.0,col:"blue",w:["red","purple","yellow"]}
  ];
  var c=pick(cases);
  var vol=pick([50,100,250]),drops=ri(2,5);
  return mcq(drops+" drops of "+c.ind+" are added to "+vol+" mL of a solution with a pH of "+fmt(c.ph,1)+". Using the indicator table in the Reference Information, the colour observed is",
    c.col,c.w,
    "Compare the pH with the indicator's change range in the Reference Information. At pH "+fmt(c.ph,1)+", "+c.ind+" is well outside its transition range on one side, and shows its colour for that side: <b>"+c.col+"</b>.",{ind:c.ind,ph:c.ph});
});

E("u2-67-endpoint-equivalence",2,["6.7"],1,"var",varset([
  function(){
    return mcq("In a titration, the equivalence point and the endpoint are best described as",
      "The equivalence point is when moles of acid and base are stoichiometrically equal; the endpoint is when the indicator changes colour",
      ["Both terms mean the moment the indicator changes colour",
       "The endpoint is a theoretical idea and the equivalence point is read from the burette",
       "The equivalence point is when the pH reaches exactly 7.00 in every titration"],
      "The equivalence point is defined by the stoichiometry of the reaction. The endpoint is the experimental signal, the indicator's colour change, which the analyst tries to match to the equivalence point. The two are not the same idea.",{});
  },
  function(){
    return mcq("A titration is repeated three times and the volumes agree closely, but all three are slightly past the true equivalence point because the indicator changed late. The results show",
      "Good precision but a systematic error, because the endpoint did not match the equivalence point",
      ["Good accuracy, because the volumes agree with each other",
       "Poor precision, because the volumes are all wrong",
       "No error at all, because the indicator always changes exactly at equivalence"],
      "Agreement among trials is precision; agreement with the true value is accuracy. A late-changing indicator shifts every trial the same way, giving precise but systematically high volumes.",{});
  },
  function(){
    return mcq("Why is an indicator chosen so that its colour change range includes the equivalence point pH?",
      "So that the endpoint (the observed colour change) occurs as close as possible to the equivalence point",
      ["So that the indicator reacts with the acid and becomes part of the calculation",
       "So that the solution changes colour before any base is added",
       "So that the pH at the endpoint is always 7.00"],
      "The analyst can only see the endpoint. Matching the indicator's range to the equivalence pH keeps the visible endpoint within a drop of the true equivalence point, which keeps the titration accurate.",{});
  }
]));

E("u2-67-equivalence-ph",2,["6.7"],2,"gen",function(){
  var cases=[
    {desc:"acetic acid is titrated with sodium hydroxide",ans:"Above 7, because the acetate ion produced hydrolyzes to form OH\u207B",w:["Exactly 7, because all equivalence points are neutral","Below 7, because the sodium ion hydrolyzes to form H\u2083O\u207A","Above 7, because sodium hydroxide is still being added past the endpoint"]},
    {desc:"aqueous ammonia is titrated with hydrochloric acid",ans:"Below 7, because the ammonium ion produced hydrolyzes to form H\u2083O\u207A",w:["Exactly 7, because the acid and base have neutralized each other","Above 7, because ammonia is a base and bases dominate","Below 7, because the chloride ion hydrolyzes to form H\u2083O\u207A"]},
    {desc:"hydrochloric acid is titrated with sodium hydroxide",ans:"Equal to 7, because neither ion of the salt formed hydrolyzes",w:["Above 7, because the base was added from the burette","Below 7, because the acid was in the flask","Equal to 7, because the indicator forces the pH to 7"]}
  ];
  var c=pick(cases);
  var vol=pick([10.0,20.0,25.0,50.0]),conc=pick([0.0500,0.100,0.200,0.500]),tp=ri(18,30);
  return mcq("At "+tp+" \u00B0C, "+gF(vol)+" mL of a "+gF(conc)+" mol/L solution is titrated in a case where "+c.desc+". At the equivalence point, the pH is",
    c.ans,c.w,
    "At the equivalence point the original acid and base are gone; what remains is the salt, and the question is whether its ions hydrolyze. <b>"+c.ans+"</b>.",{});
});

E("u2-67-half-equivalence",2,["6.7"],3,"gen",function(){
  var acids=[
    {name:"acetic acid",ka:1.8e-5,pka:"4.74"},
    {name:"benzoic acid",ka:6.3e-5,pka:"4.20"},
    {name:"hydrofluoric acid",ka:3.5e-4,pka:"3.46"},
    {name:"carbonic acid",ka:4.3e-7,pka:"6.37"},
    {name:"hydrocyanic acid",ka:6.2e-10,pka:"9.21"}
  ];
  var a=pick(acids);
  var vol=pick([25.0,50.0]),conc=pick([0.0500,0.100,0.200]),base=pick(["sodium hydroxide","potassium hydroxide"]);
  return mcq("A "+gF(vol)+" mL sample of "+gF(conc)+" mol/L "+a.name+" is titrated with "+base+". Halfway to the equivalence point, the pH meter reads "+a.pka+". What is the Ka of the acid?",
    sciF(a.ka,2),
    [sciF(1.0e-14/a.ka,2),sciF(a.ka*10,2),sciF(a.ka/10,2)],
    "At the half-equivalence point, exactly half the acid has been converted, so [HA] = [A\u207B] and the equilibrium expression collapses to [H\u2083O\u207A] = Ka: the pH equals the pKa. Ka = 10^-pKa = 10^("+"-"+a.pka+") = <b>"+sciF(a.ka,2)+"</b>.",{});
});

/* ---------- 6.8 Titrations ---------- */

E("u2-68-titration-calc",2,["6.8"],2,"gen",function(){
  var pairs=[["hydrochloric acid","sodium hydroxide"],["nitric acid","potassium hydroxide"],["hydrochloric acid","potassium hydroxide"],["nitric acid","sodium hydroxide"]];
  var pr=pick(pairs);
  var ca=pick([0.100,0.125,0.200,0.250,0.500]),va=pick([10.0,15.0,20.0,25.0,30.0,40.0,50.0]),cb=pick([0.100,0.125,0.200,0.250,0.500]);
  var n=sfR(ca*va/1000,5);
  var vb=n/cb*1000;
  var ans=sfR(vb,3);
  var q=numq(gF(va)+" mL of "+gF(ca)+" mol/L "+pr[0]+" is titrated with "+gF(cb)+" mol/L "+pr[1]+" solution. Calculate the volume of base needed to reach the equivalence point. Give your answer in mL.",
    ans,Math.max(0.02*ans,0.05),
    "Moles of acid: n = C \u00D7 V = "+gF(ca)+" mol/L \u00D7 "+gF(va)+" mL / 1000 = "+iF(n)+" mol. The reaction is 1:1, so the moles of base needed equal "+iF(n)+" mol. Volume of base: V = n / C = "+iF(n)+" / "+gF(cb)+" = "+iF(vb/1000)+" L = <b>"+F3(ans)+" mL</b>.",{});
  q.figure=c32titrCalcSVG(va,ca,cb,vb);
  return q;
});

E("u2-68-titration-diprotic",2,["6.8"],3,"gen",function(){
  var mode=Math.random()<0.5;
  var acids=[["sulfuric acid","H\u2082SO\u2084"],["oxalic acid","H\u2082C\u2082O\u2084"]];
  var a=pick(acids);
  if(mode){
    var ca=pick([0.0500,0.100,0.125,0.200]),va=pick([10.0,20.0,25.0]),cb=pick([0.100,0.200,0.250]);
    var na=sfR(ca*va/1000,5),nb=sfR(2*na,5),vb=nb/cb*1000;
    var ans=sfR(vb,3);
    var qv=numq(gF(va)+" mL of "+gF(ca)+" mol/L "+a[0]+" ("+a[1]+", a diprotic acid) is titrated with "+gF(cb)+" mol/L sodium hydroxide. Calculate the volume of base needed to reach the second equivalence point, where both protons have reacted. Give your answer in mL.",
      ans,Math.max(0.02*ans,0.05),
      "Moles of acid: n = "+gF(ca)+" mol/L \u00D7 "+gF(va)+" mL / 1000 = "+iF(na)+" mol. Each acid molecule reacts with two OH\u207B ions, so moles of base = 2 \u00D7 "+iF(na)+" = "+iF(nb)+" mol. Volume of base: V = "+iF(nb)+" / "+gF(cb)+" = "+iF(vb/1000)+" L = <b>"+F3(ans)+" mL</b>. Forgetting the 2:1 ratio is the classic error here.",{mode:"vol"});
    qv.figure=c32titrDiproticSVG(vb);
    return qv;
  }
  var vb2=pick([18.0,22.5,24.0,30.0,36.0,40.0]),cb2=pick([0.100,0.125,0.200]),va2=pick([20.0,25.0]);
  var nb2=sfR(cb2*vb2/1000,5),na2=sfR(nb2/2,5),ca2=na2/(va2/1000);
  var ans2=sfR(ca2,3);
  var qc=numq("A "+gF(va2)+" mL sample of "+a[0]+" ("+a[1]+", a diprotic acid) requires "+gF(vb2)+" mL of "+gF(cb2)+" mol/L sodium hydroxide to reach the second equivalence point. Calculate the concentration of the acid. Give your answer in mol/L.",
    ans2,Math.max(0.02*ans2,0.001),
    "Moles of base: n = "+gF(cb2)+" mol/L \u00D7 "+gF(vb2)+" mL / 1000 = "+iF(nb2)+" mol. The ratio is 2 mol OH\u207B to 1 mol acid, so moles of acid = "+iF(nb2)+" / 2 = "+iF(na2)+" mol. Concentration: C = "+iF(na2)+" / ("+gF(va2)+" / 1000) L = "+iF(ca2)+" mol/L. The concentration is <b>"+F3(ans2)+" mol/L</b>.",{mode:"conc"});
  qc.figure=c32titrDiproticSVG(vb2);
  return qc;
});

E("u2-68-technique",2,["6.8"],1,"var",varset([
  function(){
    return mcq("Before a titration, the burette is rinsed with the solution it will contain, but the conical flask is only rinsed with distilled water. Why is this correct technique?",
      "Solution left in the burette would dilute the titrant and change its concentration; water left in the flask does not change the moles of analyte already measured into it",
      ["The flask must be kept dry because water reacts with acids",
       "Rinsing the burette is only done to clean off dust",
       "The flask is rinsed with water so the indicator will work"],
      "What matters in the burette is the concentration delivered, so it must not be diluted. What matters in the flask is the moles of the sample, which were measured by pipette; extra rinse water changes the volume but not the moles, so the titration result is unaffected.",{});
  },
  function(){
    return mcq("Titration volumes are usually reported to the nearest 0.05 mL or 0.1 mL because",
      "A burette is graduated in 0.1 mL divisions and can be read to about half a division",
      ["Burettes are not very accurate instruments",
       "Volumes in titrations do not need to be measured carefully",
       "The pH meter limits the precision of the volume"],
      "Precision follows the instrument. A standard burette has 0.1 mL graduations, and a careful reader estimates between them, giving readings to about 0.05 mL.",{});
  },
  function(){
    return mcq("Near the endpoint of a titration, the titrant should be added drop by drop, and the flask swirled, mainly because",
      "A single extra drop can carry the solution past the equivalence point, which would make the measured volume too large",
      ["Drops added quickly do not react with the solution",
       "Swirling changes the concentration of the titrant",
       "The indicator only works when the solution is moving"],
      "Close to equivalence the pH changes extremely steeply with volume. Adding titrant a drop at a time, with swirling to mix, lets the analyst stop the endpoint within one drop of the equivalence point.",{});
  },
  function(){
    return mcq("A pipette is used to transfer the acid sample into the flask rather than a graduated cylinder because",
      "A pipette delivers its stated volume much more precisely and accurately than a graduated cylinder",
      ["A graduated cylinder cannot hold acids",
       "A pipette is faster to fill",
       "The cylinder would change the concentration of the acid"],
      "Volumetric glassware is built for accuracy: a pipette delivers 25.00 mL with an uncertainty in the second decimal place, while a graduated cylinder is a rough measuring tool with an uncertainty about ten times larger.",{});
  }
]));

E("u2-68-curve-equivalence",2,["6.8"],2,"gen",function(){
  var weak=Math.random()<0.5;
  var vol=pick([15.0,20.0,25.0,40.0,50.0]),conc=pick([0.0500,0.100,0.200,0.250]);
  if(weak){
    var acid=pick(["acetic acid","benzoic acid","hydrofluoric acid"]);
    var q=mcq("A titration curve for "+gF(vol)+" mL of "+gF(conc)+" mol/L "+acid+" titrated with sodium hydroxide shows a pH of about 9 at the equivalence point, not 7. The reason is",
      "At the equivalence point the solution contains the conjugate base of the weak acid, which hydrolyzes to produce OH\u207B",
      ["Sodium hydroxide is stronger than the acid is weak, so some remains unreacted",
       "The pH meter always reads high at the equivalence point",
       "The indicator shifted the pH of the solution"],
      "At equivalence, all the weak acid has become its conjugate base. That ion hydrolyzes in water, accepting protons and leaving OH\u207B behind, so the solution is basic. <b>The conjugate base hydrolyzes to produce OH\u207B</b>.",{});
    q.figure=c32titrSVG("rising","Volume of sodium hydroxide added (mL)");
    return q;
  }
  var base=pick(["ammonia","methylamine"]);
  var q=mcq("A titration curve for "+gF(vol)+" mL of "+gF(conc)+" mol/L "+base+" solution titrated with hydrochloric acid shows a pH of about 5 at the equivalence point, not 7. The reason is",
    "At the equivalence point the solution contains the conjugate acid of the weak base, which hydrolyzes to produce H\u2083O\u207A",
    ["Hydrochloric acid is stronger than the base is weak, so some remains unreacted",
     "The chloride ion hydrolyzes to produce H\u2083O\u207A",
     "The pH meter always reads low at the equivalence point"],
    "At equivalence, all the weak base has become its conjugate acid. That ion donates a proton to water, producing H\u2083O\u207A, so the solution is acidic. <b>The conjugate acid hydrolyzes to produce H\u2083O\u207A</b>.",{});
  q.figure=c32titrSVG("falling","Volume of hydrochloric acid added (mL)");
  return q;
});

E("u2-68-standard-solution",2,["6.8"],1,"var",varset([
  function(){
    return mcq("In titration work, a standard solution is",
      "A solution whose concentration is known accurately",
      ["A solution that is always exactly 1.00 mol/L",
       "A solution made from distilled water only",
       "A solution that never reacts with indicators"],
      "Standard means known: a standard solution has an accurately known concentration, which is what makes the titration calculation possible.",{});
  },
  function(){
    return mcq("A sodium hydroxide solution is standardized by titrating it against a known mass of a primary standard acid. Standardizing is necessary because",
      "The concentration of the sodium hydroxide solution is not accurately known until it is measured against a known quantity",
      ["Sodium hydroxide solutions are always exactly 0.100 mol/L",
       "Standardizing removes the water from the solution",
       "Indicators do not work in unstandardized solutions"],
      "Sodium hydroxide absorbs water and carbon dioxide from the air, so a weighed mass does not give an accurate concentration. Titrating against a primary standard measures the true concentration.",{});
  },
  function(){
    return mcq("Which property makes a substance suitable as a primary standard?",
      "It is available pure, is stable in air, and dissolves completely and predictably",
      ["It has a bright colour so the endpoint is easy to see",
       "It is the cheapest chemical in the stockroom",
       "It reacts with every other substance"],
      "A primary standard anchors the whole measurement: it must be pure, stable while it is weighed, and react in a known ratio, so that its amount is known exactly.",{});
  }
]));

/* ----- bank-u3.js ----- */
// Chemistry 3202 Unit 3 Thermochemistry question bank
// Phase C diagram figures (Nov 2026): u3-72-diagram-language now draws the
// enthalpy diagram from its own values, and u3-77-curve-read draws the
// standard heating curve (no plateau temperatures are given by that entry,
// so none are labelled). Figure helpers are in bank-u1.js.
// CRMARKS: u3-74-calorimetry-error=4
// CRMARKS: u3-74-calorimetry-molar=4
// CRMARKS: u3-74-find-delta-t=2
// CRMARKS: u3-74-mixture-temp=4
// CRMARKS: u3-74-q-temp=3
// CRMARKS: u3-77-q-combined=4
// CRMARKS: u3-77-q-phase=3
// CRMARKS: u3-78-deltah-from-q=3
// CRMARKS: u3-710-molar-combustion=4
// CRMARKS: u3-711-write-thermochem=3
// CRMARKS: u3-712-bond-energy=3
// CRMARKS: u3-712-formation=3
// CRMARKS: u3-712-hess=5

/* ---------- 7.1 Systems and energy ---------- */

E("u3-71-system-types",3,["7.1"],1,"var",varset([
  function(){
    return mcq("Hot coffee is poured into an open mug on a desk. For the coffee as the system, this is best classified as",
      "An open system, because both matter (steam) and energy (heat) can leave",
      ["A closed system, because the mug holds the liquid in",
       "An isolated system, because the coffee does not react with the air",
       "An open system, because energy can leave but matter cannot"],
      "An open system exchanges both matter and energy with the surroundings. The coffee loses water vapour (matter) and heat (energy), so it is open.",{});
  },
  function(){
    return mcq("A chemical reaction is carried out in a sealed steel vessel with thick insulation, so that neither matter nor heat crosses the walls. The vessel is best classified as",
      "An isolated system",
      ["An open system","A closed system","A surroundings system"],
      "No matter crosses the walls of any sealed vessel, and the insulation stops energy transfer as well. A system exchanging neither matter nor energy is isolated.",{});
  },
  function(){
    return mcq("Hot water is stored in a stoppered flask whose stopper lets no liquid or vapour escape, although heat slowly passes through the glass. The flask is best classified as",
      "A closed system, because energy can cross the boundary but matter cannot",
      ["An open system, because energy can cross the boundary",
       "An isolated system, because nothing can get in or out",
       "An open system, because the water is a liquid"],
      "The stopper blocks matter but heat still crosses the glass, so the system exchanges energy only. That is a closed system.",{});
  }
]));

E("u3-71-isolated-judgement",3,["7.1"],2,"gen",function(){
  var v=pick([
    {d:"a gas reacting inside a vacuum-jacketed, sealed steel bomb",a:"Isolated: the seal blocks matter and the vacuum jacket blocks heat transfer",w:["Open: gases always exchange with the surroundings","Closed: a sealed container is always a closed system","Open: the reaction releases energy inside"]},
    {d:"soup cooling in a pot with the lid ajar",a:"Open: steam (matter) and heat (energy) both escape past the lid",w:["Isolated: the pot is mostly covered","Closed: the lid keeps the matter in","Isolated: no reaction is taking place"]},
    {d:"a stoppered bottle of warm water on a bench",a:"Closed: the stopper blocks matter but heat crosses the glass",w:["Isolated: the stopper seals everything in","Open: heat crossing makes it an open system","Open: the water can evaporate inside the bottle"]},
    {d:"ice melting in an uncovered glass",a:"Open: meltwater can be lost by evaporation and heat flows in from the room",w:["Closed: glass is a solid boundary","Isolated: while melting, the temperature does not change","Closed: only energy crosses the boundary"]}
  ]);
  var ml=pick([150,200,250,300]),tp=ri(10,35);
  return mcq("In an experiment at "+tp+" \u00B0C, "+ml+" mL of liquid is involved in the setup: "+v.d+". Which classification and reasoning are correct?",
    v.a,v.w,
    "Classify by what crosses the boundary: matter and energy (open), energy only (closed), or neither (isolated). <b>"+v.a+"</b>.",{ml:ml});
});

E("u3-71-surroundings",3,["7.1"],2,"var",varset([
  function(){
    return mcq("A student warms 200 mL of water in a beaker over a burner and studies the water as the system. The surroundings are",
      "Everything else: the beaker, the burner, the air, and the rest of the universe outside the water",
      ["Only the beaker, because it touches the water",
       "Only the burner, because it supplies the heat",
       "The water vapour above the surface"],
      "The surroundings are everything outside the system under study. The burner and beaker matter most in practice, but the definition covers everything that is not the water itself.",{});
  },
  function(){
    return mcq("In a calorimetry experiment, the temperature of the water in the cup rises. Interpreting this with systems language:",
      "The reaction (system) released energy, and the water (part of the surroundings) gained it, warming up",
      ["The water (system) created energy and warmed itself",
       "The reaction (surroundings) absorbed energy from the water",
       "Energy appeared because exothermic reactions create it"],
      "Energy is transferred, never created. The reacting chemicals are the system; the water around them is the surroundings that receive the released energy and warm.",{});
  },
  function(){
    return mcq("A student studies the combustion of a fuel as 'the system' while it heats water in a can. Which list correctly names the system and the main surroundings?",
      "System: the fuel and the oxygen it reacts with. Surroundings: the water, the can, the air, and everything else",
      ["System: the water being heated. Surroundings: the fuel only",
       "System: the flame. Surroundings: the thermometer only",
       "System: the whole apparatus. Surroundings: nothing, because the apparatus is complete"],
      "The system is the part under study: here the reacting fuel and oxygen. Everything else that can exchange energy with it, starting with the water and can, is the surroundings.",{});
  }
]));

/* ---------- 7.2 Enthalpy and energy changes ---------- */

E("u3-72-exo-endo",3,["7.2"],1,"gen",function(){
  var r=pick([
    {d:"magnesium reacts with hydrochloric acid and the test tube warms up",a:"Exothermic: the system releases energy, so \u0394H is negative",w:["Endothermic: the system releases energy, so \u0394H is positive","Exothermic: the system absorbs energy, so \u0394H is positive","Endothermic: \u0394H is zero because it is a reaction"]},
    {d:"an instant cold pack is activated and the pack becomes cold",a:"Endothermic: the system absorbs energy from the surroundings, so \u0394H is positive",w:["Exothermic: the system absorbs energy, so \u0394H is negative","Endothermic: the system releases energy, so \u0394H is negative","Exothermic: \u0394H is positive because the pack gets cold"]},
    {d:"propane burns in a barbecue, heating the grill",a:"Exothermic: the system releases energy, so \u0394H is negative",w:["Endothermic: burning always absorbs energy","Exothermic: the system absorbs energy, so \u0394H is negative","Endothermic: \u0394H is positive because the grill gets hot"]},
    {d:"ice melts in a drink, cooling the drink",a:"Endothermic: the melting system absorbs energy from the drink, so \u0394H is positive",w:["Exothermic: melting releases cold into the drink","Endothermic: the system releases energy, so \u0394H is positive","Exothermic: \u0394H is negative because the drink cools"]}
  ]);
  var t=ri(15,30);
  return mcq("At a starting temperature of "+t+" \u00B0C, "+r.d+". Which statement is correct?",
    r.a,r.w,
    "Follow the energy: released by the system means exothermic and \u0394H negative; absorbed by the system means endothermic and \u0394H positive. <b>"+r.a+"</b>.",{t:t});
});

E("u3-72-delta-h-numeric",3,["7.2"],2,"gen",function(){
  var Hreact=pick([120,180,240,300,360,420]);
  var d=pick([-140,-95,-70,-45,-30,35,60,85,120]);
  var Hprod=Hreact+d;
  var ans=sfR(d,3);
  var q=numq("The total enthalpy of the reactants of a chemical system is "+Hreact+" kJ and the total enthalpy of the products is "+Hprod+" kJ. Calculate \u0394H for the reaction. Give your answer in kJ.",
    ans,1,
    "\u0394H = H(products) - H(reactants) = "+Hprod+" kJ - "+Hreact+" kJ = "+(d>0?"+":"")+iF(d)+" kJ. So \u0394H = <b>"+(d>0?"+":"")+F3(d)+" kJ</b>"+(d<0?", and the reaction is exothermic.":", and the reaction is endothermic."),{});
  q.figure=c32peSVG(Hreact,Math.max(Hreact,Hprod)+55,Hprod,{r:"Reactants: "+Hreact+" kJ",p:"Products: "+Hprod+" kJ"});
  return q;
});

E("u3-72-temp-direction",3,["7.2"],1,"var",varset([
  function(){
    return mcq("A reaction mixture in an insulated container shows a temperature increase as the reaction proceeds. This tells you that",
      "The reaction is exothermic: energy released by the system raised the temperature of the mixture",
      ["The reaction is endothermic: absorbing energy raised the temperature",
       "The reaction has \u0394H = 0, because the container is insulated",
       "The products have more enthalpy than the reactants"],
      "In an insulated container the energy released by an exothermic reaction has nowhere to go except into the mixture itself, so the temperature rises and \u0394H is negative.",{});
  },
  function(){
    return mcq("A dissolving process in an insulated container shows a temperature decrease as it proceeds. This tells you that",
      "The process is endothermic: the system took energy from the mixture, lowering its temperature",
      ["The process is exothermic: releasing energy lowered the temperature",
       "The process has \u0394H = 0, because no heat crossed the walls",
       "The products have less enthalpy than the reactants"],
      "The temperature fell because the system absorbed energy from its immediate surroundings, the mixture. Absorbing energy is endothermic, with \u0394H positive.",{});
  },
  function(){
    return mcq("An exothermic reaction is run in an ordinary open beaker, and the mixture's temperature stays almost unchanged. The best explanation is",
      "The energy released escapes to the room about as fast as the reaction produces it, because the beaker is not insulated",
      ["The reaction must actually be thermoneutral, with \u0394H = 0",
       "Exothermic reactions never change the temperature of their mixture",
       "The thermometer must be faulty, since temperature must rise"],
      "Temperature change reflects the balance between energy produced and energy lost. In an uninsulated beaker the released energy leaks away steadily, so the mixture need not warm noticeably even though \u0394H is negative.",{});
  }
]));

E("u3-72-diagram-language",3,["7.2"],2,"gen",function(){
  var exo=Math.random()<0.6;
  var R=pick([80,100,150,200,250]),shift=exo?-pick([30,45,60,90]):pick([25,40,55,80]);
  var P=R+shift;
  var aspect=pick(["stored","barrier","classify"]);
  if(aspect==="stored"){
    var q=mcq("On an enthalpy diagram, the products of a reaction sit "+Math.abs(shift)+" kJ "+(exo?"below":"above")+" the reactants. Which statement about chemical potential energy is correct?",
      exo?"The products store less chemical potential energy than the reactants; the difference was released as heat and other forms":"The products store more chemical potential energy than the reactants; the difference was absorbed from the surroundings",
      [exo?"The products store more chemical potential energy than the reactants":"The products store less chemical potential energy than the reactants; the difference was absorbed from the surroundings",
       "Both store the same energy, because energy cannot be stored in bonds",
       "The diagram shows kinetic energy, not potential energy"],
      "The vertical gap between reactants and products is the energy stored difference. "+(exo?"Products lower means less energy stored in the products, and the difference left the system.":"Products higher means more energy stored in the products, taken in from the surroundings."),{aspect:aspect});
    q.figure=c32peSVG(0,Math.max(0,shift)+55,shift,{r:"Reactants",p:"Products"});
    return q;
  }
  if(aspect==="barrier"){
    var peak=P+pick([50,75,100,140]);
    var q=mcq("On an enthalpy diagram, the reactants sit at "+R+" kJ, the products at "+P+" kJ, and the top of the barrier at "+peak+" kJ. The height of the barrier above the reactants represents",
      "The activation energy: the minimum extra energy reactant particles need to react",
      ["The enthalpy change of the reaction",
       "The heat released to the surroundings",
       "The energy stored in the products"],
      "The barrier is measured from the reactant level to the peak: "+peak+" kJ - "+R+" kJ. It represents the activation energy. The enthalpy change is the separate gap between reactants and products.",{aspect:aspect});
    q.figure=c32peSVG(R,peak,P,{r:"Reactants: "+R+" kJ",k:"Barrier top: "+peak+" kJ",p:"Products: "+P+" kJ"});
    return q;
  }
  var q=mcq("On an enthalpy diagram, the reactants sit at "+R+" kJ and the products at "+P+" kJ. The reaction is",
    exo?"Exothermic, with \u0394H = -"+Math.abs(shift)+" kJ":"Endothermic, with \u0394H = +"+Math.abs(shift)+" kJ",
    [exo?"Endothermic, with \u0394H = +"+Math.abs(shift)+" kJ":"Exothermic, with \u0394H = -"+Math.abs(shift)+" kJ",
     exo?"Exothermic, with \u0394H = +"+Math.abs(shift)+" kJ":"Endothermic, with \u0394H = -"+Math.abs(shift)+" kJ",
     "Thermoneutral, with \u0394H = 0"],
    "\u0394H = H(products) - H(reactants) = "+P+" kJ - "+R+" kJ = "+(shift>0?"+":"")+shift+" kJ. The sign decides the classification: <b>"+(exo?"Exothermic":"Endothermic")+"</b>.",{aspect:aspect});
  q.figure=c32peSVG(R,Math.max(R,P)+55,P,{r:"Reactants: "+R+" kJ",p:"Products: "+P+" kJ"});
  return q;
});

/* ---------- 7.3 Forms of energy ---------- */

E("u3-73-forms",3,["7.3"],1,"var",varset([
  function(){
    return mcq("The energy stored in the bonds of a glucose molecule is an example of",
      "Chemical potential energy",
      ["Kinetic energy of motion","Thermal energy","Electrical potential energy"],
      "Energy held in the arrangement of atoms and their bonds is chemical potential energy, a stored (potential) form. It becomes available when the bonds are rearranged in a reaction.",{});
  },
  function(){
    return mcq("Which of the following is a kinetic form of energy?",
      "The thermal energy of a warm water sample, from the motion of its particles",
      ["The chemical energy in a battery","The energy stored in a stretched elastic band","The energy of water held behind a dam"],
      "Kinetic energy is energy of motion. Thermal energy is the total kinetic energy of the particles in the sample; the others are stored, potential forms.",{});
  },
  function(){
    return mcq("In thermochemistry, the internal energy changes that matter in a reaction are tracked mainly through",
      "Changes in chemical potential energy (bond energies) and the thermal energy of the system",
      ["The colour and brightness of the substances",
       "The mass of the container",
       "The speed at which the reaction finishes"],
      "A chemical reaction rearranges bonds, changing stored chemical potential energy, and the difference shows up as thermal energy changes (temperature changes) or is transferred as heat or work.",{});
  }
]));

E("u3-73-conversion",3,["7.3"],2,"gen",function(){
  var v=pick([
    {d:"a burning candle lighting a room",a:"Chemical potential energy \u2192 thermal energy and light (radiant energy)",w:["Kinetic energy \u2192 chemical potential energy","Electrical energy \u2192 chemical potential energy","Radiant energy \u2192 gravitational potential energy"]},
    {d:"a plant carrying out photosynthesis",a:"Radiant energy (sunlight) \u2192 chemical potential energy stored in glucose",w:["Chemical potential energy \u2192 radiant energy leaving the plant","Thermal energy \u2192 kinetic energy of the leaves","Electrical energy \u2192 chemical potential energy"]},
    {d:"a battery-powered flashlight switched on",a:"Chemical potential energy \u2192 electrical energy \u2192 radiant energy and thermal energy",w:["Radiant energy \u2192 electrical energy \u2192 chemical energy","Kinetic energy \u2192 electrical energy \u2192 chemical energy","Electrical energy \u2192 chemical energy \u2192 radiant energy"]},
    {d:"a hydroelectric dam generating power",a:"Gravitational potential energy \u2192 kinetic energy of water \u2192 electrical energy",w:["Electrical energy \u2192 kinetic energy \u2192 gravitational potential energy","Chemical potential energy \u2192 electrical energy directly","Kinetic energy \u2192 chemical potential energy \u2192 electrical energy"]},
    {d:"a car engine driving the wheels",a:"Chemical potential energy of the fuel \u2192 thermal energy \u2192 kinetic energy of the car",w:["Kinetic energy of the fuel \u2192 chemical potential energy \u2192 thermal energy","Electrical energy \u2192 chemical potential energy \u2192 kinetic energy","Thermal energy \u2192 chemical potential energy \u2192 kinetic energy"]}
  ]);
  var t=ri(10,30);
  return mcq("At an ambient temperature of "+t+" \u00B0C, consider "+v.d+". Which chain correctly describes the energy conversions?",
    v.a,v.w,
    "Energy changes form but the total is conserved. Tracing the stored energy through its conversions gives: <b>"+v.a+"</b>.",{t:t});
});

E("u3-73-conservation",3,["7.3"],1,"var",varset([
  function(){
    return mcq("The law of conservation of energy states that",
      "Energy can be converted from one form to another, but the total amount of energy in the universe stays constant",
      ["Energy can be created by exothermic reactions and destroyed by endothermic ones",
       "The energy of a system can never change",
       "Heat and work are the only two forms of energy"],
      "Energy is never created or destroyed, only converted or transferred. That is why the energy lost by a system always equals the energy gained by its surroundings.",{});
  },
  function(){
    var q=pick([120,250,480,750]);
    return mcq("In an experiment, a chemical system releases "+q+" J of energy to its surroundings. By the law of conservation of energy, the surroundings",
      "Gain exactly "+q+" J of energy",
      ["Gain more than "+q+" J, because transfers multiply energy",
       "Gain less than "+q+" J, because some energy is destroyed in transfer",
       "Gain no energy, because released energy disappears"],
      "Conservation of energy requires the books to balance: what the system loses, the surroundings gain, joule for joule. The surroundings gain exactly "+q+" J.",{q:q});
  }
]));

/* ---------- 7.4 Calorimetry: q = mc\u0394T ---------- */

E("u3-74-q-temp",3,["7.4"],2,"gen",function(){
  var subs=[
    {n:"water",c:4.18,unit:"J/(g\u00B7\u00B0C)"},
    {n:"aluminium",c:0.897,unit:"J/(g\u00B7\u00B0C)"},
    {n:"copper",c:0.385,unit:"J/(g\u00B7\u00B0C)"},
    {n:"iron",c:0.450,unit:"J/(g\u00B7\u00B0C)"}
  ];
  var s=pick(subs);
  var m=pick([25.0,40.0,50.0,75.0,100,125,150,200,250,300]);
  var dt=pick([3.0,4.5,5.0,6.5,8.0,10.0,12.5,15.0,18.0,20.0,25.0]);
  var q=sfR(m*s.c*dt,4);
  var ans=sfR(m*s.c*dt,3);
  return numq("A "+gF(m)+" g sample of "+s.n+" (c = "+gF(s.c)+" "+s.unit+") absorbs heat and its temperature rises by "+gF(dt)+" \u00B0C. Calculate the heat absorbed. Give your answer in J.",
    ans,Math.max(0.02*ans,1),
    "q = mc\u0394T = "+gF(m)+" g \u00D7 "+gF(s.c)+" J/(g\u00B7\u00B0C) \u00D7 "+gF(dt)+" \u00B0C = "+iF(q)+" J. The heat absorbed is <b>"+F3(ans)+" J</b>.",{});
});

E("u3-74-find-delta-t",3,["7.4"],2,"gen",function(){
  var subs=[{n:"water",c:4.18},{n:"aluminium",c:0.897},{n:"iron",c:0.450},{n:"copper",c:0.385}];
  var s=pick(subs);
  var m=pick([50.0,80.0,100,150,200,250]);
  var dtT=pick([4.0,5.0,6.0,7.5,9.0,10.0,12.0,15.0]);
  var q0=sfR(m*s.c*dtT,3);
  var dt=sfR(q0/(m*s.c),4);
  var ans=sfR(dt,3);
  var t1=pick([15.0,18.0,20.0,22.0]);
  return numq("A "+gF(m)+" g sample of "+s.n+" (c = "+gF(s.c)+" J/(g\u00B7\u00B0C)) starts at "+gF(t1)+" \u00B0C and absorbs "+F3(q0)+" J of heat. Calculate the temperature change of the sample. Give your answer in \u00B0C.",
    ans,Math.max(0.02*ans,0.05),
    "\u0394T = q / (mc) = "+F3(q0)+" J / ("+gF(m)+" g \u00D7 "+gF(s.c)+" J/(g\u00B7\u00B0C)) = "+iF(dt)+" \u00B0C. The temperature change is <b>"+F3(ans)+" \u00B0C</b>, so the final temperature is "+gF(t1)+" + "+F3(ans)+" = "+F3(sfR(t1+ans,3))+" \u00B0C.",{});
});

E("u3-74-find-c",3,["7.4"],2,"gen",function(){
  var metals=[{n:"aluminium",c:0.897},{n:"copper",c:0.385},{n:"iron",c:0.450},{n:"lead",c:0.128},{n:"silver",c:0.235},{n:"zinc",c:0.388}];
  var s=pick(metals);
  var m=pick([20.0,30.0,50.0,75.0,100]);
  var dt=pick([10.0,15.0,20.0,25.0,30.0,40.0]);
  var q0=sfR(m*s.c*dt,3);
  var c=sfR(q0/(m*dt),4);
  var ans=sfR(c,3);
  return numq("A "+gF(m)+" g sample of an unknown metal absorbs "+F3(q0)+" J of heat and its temperature rises by "+gF(dt)+" \u00B0C. Calculate the specific heat capacity of the metal. Give your answer in J/(g\u00B7\u00B0C).",
    ans,Math.max(0.02*ans,0.004),
    "c = q / (m\u0394T) = "+F3(q0)+" J / ("+gF(m)+" g \u00D7 "+gF(dt)+" \u00B0C) = "+iF(c)+" J/(g\u00B7\u00B0C). The specific heat capacity is <b>"+F3(ans)+" J/(g\u00B7\u00B0C)</b>, which matches "+s.n+" in the Reference Information.",{});
});

E("u3-74-mixture-temp",3,["7.4"],3,"gen",function(){
  var metals=[{n:"aluminium",c:0.897},{n:"copper",c:0.385},{n:"iron",c:0.450}];
  var s=pick(metals);
  var m1=pick([25.0,40.0,50.0,60.0,80.0,100]);
  var T1=pick([60.0,75.0,80.0,90.0,100]);
  var m2=pick([100,150,200,250,300]);
  var T2=pick([15.0,18.0,20.0,22.0,25.0]);
  var A1=sfR(m1*s.c,4),A2=sfR(m2*4.18,4);
  var Tf=(A1*T1+A2*T2)/(A1+A2);
  var ans=sfR(Tf,3);
  return numq("A "+gF(m1)+" g piece of "+s.n+" (c = "+gF(s.c)+" J/(g\u00B7\u00B0C)) at "+gF(T1)+" \u00B0C is dropped into "+gF(m2)+" g of water at "+gF(T2)+" \u00B0C in an insulated container. Calculate the final temperature of the mixture. Give your answer in \u00B0C.",
    ans,Math.max(0.02*ans,0.2),
    "Heat lost by the metal = heat gained by the water. m\u2081c\u2081 = "+gF(m1)+" \u00D7 "+gF(s.c)+" = "+iF(A1)+" J/\u00B0C and m\u2082c\u2082 = "+gF(m2)+" \u00D7 4.18 = "+iF(A2)+" J/\u00B0C. Tf = (m\u2081c\u2081T\u2081 + m\u2082c\u2082T\u2082) / (m\u2081c\u2081 + m\u2082c\u2082) = ("+iF(A1)+" \u00D7 "+gF(T1)+" + "+iF(A2)+" \u00D7 "+gF(T2)+") / ("+iF(A1)+" + "+iF(A2)+") = "+iF(Tf)+" \u00B0C. The final temperature is <b>"+F3(ans)+" \u00B0C</b>.",{});
});

E("u3-74-calorimetry-molar",3,["7.4"],3,"gen",function(){
  var fuels=[{n:"methanol",M:32.05},{n:"ethanol",M:46.07},{n:"propane",M:44.10},{n:"glucose",M:180.16}];
  var f=pick(fuels);
  var mass=pick([0.500,0.800,1.00,1.25,1.50,2.00]);
  var mw=pick([150,200,250,300,400,500]);
  var dt=pick([8.0,10.0,12.5,15.0,18.0,20.0,24.0]);
  var q=sfR(mw*4.18*dt,4);
  var qkJ=sfR(q/1000,4);
  var n=sfR(mass/f.M,4);
  var dH=sfR(-qkJ/n,4);
  var ans=sfR(dH,3);
  return numq("A "+gF(mass)+" g sample of "+f.n+" is burned completely in a calorimeter, heating "+gF(mw)+" g of water by "+gF(dt)+" \u00B0C. Calculate the molar enthalpy of combustion of "+f.n+". Give your answer in kJ/mol.",
    ans,Math.max(0.02*Math.abs(ans),0.5),
    "Heat absorbed by the water: q = mc\u0394T = "+gF(mw)+" g \u00D7 4.18 J/(g\u00B7\u00B0C) \u00D7 "+gF(dt)+" \u00B0C = "+iF(q)+" J = "+iF(qkJ)+" kJ. Amount of fuel: n = "+gF(mass)+" g / "+gF(f.M)+" g/mol = "+iF(n)+" mol. \u0394H = -q / n = -"+iF(qkJ)+" kJ / "+iF(n)+" mol = "+iF(dH)+" kJ/mol. The molar enthalpy of combustion is <b>"+F3(ans)+" kJ/mol</b>. The negative sign shows the combustion is exothermic.",{});
});

E("u3-74-calorimetry-error",3,["7.4"],3,"gen",function(){
  var v=pick([
    {setup:"A student burns a fuel under an open beaker on a bench, with no lid and no insulation, in a room with a noticeable draft",flaw:"heat escapes to the air and the beaker instead of all going into the water",effect:"the calculated enthalpy change is too small in magnitude (less exothermic than the true value)"},
    {setup:"A student reads the starting temperature of the water, lights the fuel, and records the temperature only after the flame has been out for a minute",flaw:"the water cools toward room temperature during the delay, so the recorded maximum temperature is too low",effect:"the calculated enthalpy change is too small in magnitude (less exothermic than the true value)"},
    {setup:"A student measures the water with a graduated cylinder marked in 10 mL steps and uses a thermometer marked in 2 \u00B0C steps",flaw:"both measurements carry large uncertainties, so the calculated value has a wide error range",effect:"the calculated enthalpy change is imprecise: repeated trials scatter widely around the true value"}
  ]);
  var mw=pick([100,200,250]),fuel=pick(["methanol","ethanol","propane","a candle fuel"]),tp=ri(15,25);
  return mcq("In a calorimetry experiment at "+tp+" \u00B0C using "+mw+" g of water and burning "+fuel+", "+v.setup.toLowerCase()+". Which evaluation of this design is correct?",
    "The flaw is that "+v.flaw+", so "+v.effect,
    ["There is no flaw: school calorimetry always gives the exact enthalpy change",
     "The flaw makes the calculated enthalpy change exactly twice the true value",
     "The design is fine because "+v.flaw+", which has no effect on the result"],
    "Evaluating a design means tracing how each weakness moves the numbers. Here, "+v.flaw+", so "+v.effect+". <b>The calculated value is shifted in the direction the flaw pushes it</b>.",{});
});

/* ---------- 7.5 Heat, work and enthalpy ---------- */

E("u3-75-q-vs-dh",3,["7.5"],2,"var",varset([
  function(){
    return mcq("A gas is produced by a reaction in a cylinder fitted with a movable piston. The gas expands and pushes the piston out. Compared with the enthalpy change of the reaction, the heat released to the surroundings is",
      "Less, because some of the released energy was spent doing expansion work on the piston instead of appearing as heat",
      ["More, because expansion creates extra energy",
       "Exactly equal in every reaction, whether or not a piston moves",
       "Zero, because all the energy went into the piston"],
      "Energy is conserved: energy released = heat given out + work done. When the system spends energy pushing a piston, less remains to appear as heat, so the measured heat is less than the total enthalpy change.",{});
  },
  function(){
    return mcq("The enthalpy change of a reaction, \u0394H, equals the heat transferred only under the condition of",
      "Constant pressure, with the system doing no work other than expansion work",
      ["Constant volume in every case",
       "A completely isolated system",
       "A reaction that produces no gases"],
      "\u0394H is defined so that at constant pressure it matches the heat flow, provided the only work is expansion work against the pressure. At constant volume or with other work involved, heat and \u0394H differ.",{});
  },
  function(){
    return mcq("A reaction takes place in a sealed, rigid container (constant volume) and warms the container. In this case, the heat released is a measure of",
      "The total energy change of the system, because no expansion work can be done at constant volume",
      ["Only part of the energy change, because most energy went into expansion",
       "Nothing at all about the energy change",
       "The activation energy of the reaction"],
      "With a rigid container the system cannot push anything back, so no expansion work is done and all of the energy change appears as heat. That is the principle behind bomb calorimetry.",{});
  }
]));

E("u3-75-calorimeter-types",3,["7.5"],2,"gen",function(){
  var bomb=Math.random()<0.5;
  var v=pick([100,150,200,250]);
  var tp=ri(15,30);
  if(bomb){
    return mcq("At "+tp+" \u00B0C, a "+v+" mL coffee-cup calorimeter is open to the air and used for a reaction in solution. A bomb calorimeter is sealed and rigid. Which statement is correct?",
      "The coffee-cup calorimeter works at constant pressure, so it measures \u0394H directly; the bomb works at constant volume",
      ["The coffee-cup calorimeter works at constant volume, so it measures \u0394H directly",
       "Both instruments work at constant pressure",
       "The bomb calorimeter is used mainly for reactions in solution"],
      "The open cup is exposed to the atmosphere, so the pressure stays constant and the heat measured is \u0394H. The sealed, rigid bomb holds volume constant instead. <b>Constant pressure for the cup, constant volume for the bomb</b>.",{});
  }
  return mcq("At "+tp+" \u00B0C, a fuel sample is burned in a bomb calorimeter (containing a measured mass of water) to find its energy content. The bomb is the right choice mainly because",
    "Its sealed, rigid design prevents matter loss and expansion work, so the heat measured captures the full energy change of the combustion",
    ["It is open to the air, so the pressure stays constant",
     "It lets the hot gases escape so they do not disturb the thermometer",
     "It uses a larger mass of water than any other calorimeter"],
    "Combustion produces hot, expanding gases. The rigid sealed bomb keeps everything in and forbids expansion work, so the temperature rise of the water accounts for the energy change. <b>The sealed, rigid design is the point</b>.",{});
});

E("u3-75-qp-statement",3,["7.5"],1,"var",varset([
  function(){
    return mcq("In the expression \u0394H = q\u209A, the subscript p indicates that",
      "The heat is measured at constant pressure",
      ["The heat is measured at constant volume",
       "The heat is measured per mole of product only",
       "The reaction involves a precipitate"],
      "The subscript gives the condition attached to the quantity: p for constant pressure. \u0394H equals the heat flow when the reaction runs at constant pressure.",{});
  },
  function(){
    return mcq("Most ordinary bench reactions (in open beakers or flasks) take place at",
      "Constant pressure, because the container is open to the atmosphere",
      ["Constant volume, because beakers are rigid",
       "Zero pressure, because the containers are open",
       "Constant temperature, because the room does not change"],
      "An open container is exposed to the air, so the atmosphere holds the pressure essentially constant while the reaction runs. That is why bench calorimetry measures \u0394H.",{});
  },
  function(){
    return mcq("A student seals a reacting mixture in a rigid bomb calorimeter and writes '\u0394H = q measured here'. A classmate objects. The objection is that",
      "In the rigid bomb the volume is constant, not the pressure, so the heat measured there is not q\u209A and does not equal \u0394H directly",
      ["The bomb has no thermometer, so no heat can be measured",
       "The equality \u0394H = q\u209A holds in every container",
       "\u0394H can never be measured, only calculated"],
      "The subscript condition matters: q\u209A is heat at constant pressure. The bomb enforces constant volume, a different condition, so its heat is a different (though related) quantity.",{});
  }
]));

E("u3-75-work-sign",3,["7.5"],2,"gen",function(){
  var dir=Math.random()<0.5;
  var L=pick([0.5,1.0,1.5,2.0]);
  var tp=ri(15,35);
  if(dir){
    return mcq("During a reaction in a piston at "+tp+" \u00B0C, the gas volume increases by "+gF(L)+" L as the products form. Which statement about work is correct?",
      "The system does work on the surroundings, so part of the reaction's energy leaves as work rather than heat",
      ["The surroundings do work on the system, adding energy to it",
       "No work is done, because gases cannot push pistons",
       "The work done increases the enthalpy of the products"],
      "The expanding gas pushes the piston outward: the system spends energy on the surroundings. That energy is work, and it is separate from the heat transferred. <b>The system does work on the surroundings</b>.",{L:L});
  }
  return mcq("A gas in a piston at "+tp+" \u00B0C is compressed by "+gF(L)+" L when the surroundings push the piston in. Which statement about work is correct?",
    "The surroundings do work on the system, adding energy to the system",
    ["The system does work on the surroundings, losing energy",
     "No work is done, because the volume change is small",
     "Compression destroys energy, lowering the total"],
    "Pushing the piston in means the surroundings spend energy on the gas: work is done on the system and its energy increases. <b>The surroundings do work on the system</b>.",{L:L});
});

/* ---------- 7.6 Calorimetry in practice ---------- */

E("u3-76-assumptions",3,["7.6"],2,"var",varset([
  function(){
    return mcq("In school calorimetry calculations using q = mc\u0394T for the water, which assumption is NOT part of the standard treatment?",
      "The calorimeter cup and thermometer absorb a large, calculated share of the heat",
      ["No heat is lost to the air or the bench",
       "The density of a dilute solution is taken as 1.00 g/mL",
       "The specific heat capacity of a dilute solution is taken as that of water"],
      "The standard school treatment assumes the container and thermometer absorb negligible heat. It also assumes no losses to the surroundings and treats dilute solutions as water for density and specific heat capacity.",{});
  },
  function(){
    return mcq("A calculation treats 150 mL of a dilute acid solution as 150 g with c = 4.18 J/(g\u00B7\u00B0C). The justification is that",
      "Dilute aqueous solutions are mostly water, so their density and specific heat capacity are taken to be those of water",
      ["All solutions have exactly the same properties as water",
       "Acids always have a density of 1.00 g/mL by definition",
       "The volume of a solution in mL always equals its mass in grams for every liquid"],
      "The approximation works because a dilute solution is overwhelmingly water. It is an assumption of the method, and it fails for concentrated solutions or non-aqueous solvents.",{});
  },
  function(){
    return mcq("Why is a foam cup with a lid a better calorimeter than an open glass beaker?",
      "The foam insulates and the lid blocks evaporation, so less heat escapes and the temperature change is closer to the true value",
      ["Foam reacts with the solution to add extra heat",
       "Glass absorbs the thermometer's scale markings",
       "A lid makes the reaction go to completion faster"],
      "The dominant error in calorimetry is heat escaping. Insulation slows conduction through the walls and the lid stops vapour carrying energy away, so more of the energy stays in the water where the thermometer can register it.",{});
  }
]));

E("u3-76-device-choice",3,["7.6"],2,"gen",function(){
  var v=pick([
    {task:"measuring the enthalpy change when an acid neutralizes a base in solution",dev:"a foam-cup (coffee-cup) calorimeter",w:["a bomb calorimeter","a melting-point apparatus","a distillation apparatus"]},
    {task:"finding the energy released per gram when a fuel pellet burns",dev:"a bomb calorimeter",w:["a foam-cup (coffee-cup) calorimeter","a melting-point apparatus","a burette and flask"]},
    {task:"measuring the temperature change when a salt dissolves in water",dev:"a foam-cup (coffee-cup) calorimeter",w:["a bomb calorimeter","a distillation apparatus","a gas syringe"]}
  ]);
  var vol=pick([50,100,150,200]),tp=ri(15,30);
  return mcq("In a laboratory at "+tp+" \u00B0C, a student needs a device for "+v.task+", using about "+vol+" mL of material where a liquid is involved. The best choice is",
    v.dev,v.w,
    "Match the device to the job: solution reactions at constant pressure belong in an insulated cup; combustions of fuels belong in the sealed bomb. The best choice is <b>"+v.dev+"</b>.",{vol:vol});
});

E("u3-76-insulation-effect",3,["7.6"],2,"gen",function(){
  var layers=pick([1,2,3]);
  var mw=pick([100,150,200,250]),fuel=pick(["methanol","ethanol","propane","a solid fuel pellet"]),t0=pick([15.0,20.0,25.0]);
  return mcq("A calorimetry trial burning "+fuel+" under "+gF(mw)+" g of water (starting at "+gF(t0)+" \u00B0C) is repeated with "+layers+" extra layer"+(layers>1?"s":"")+" of insulation wrapped around the cup. Compared with the first trial, the measured temperature change is expected to be",
    "Larger and closer to the true value, because less heat escapes to the surroundings",
    ["Smaller, because the insulation absorbs the reaction's energy permanently",
     "The same, because insulation cannot affect a temperature measurement",
     "Larger, because the insulation adds chemical energy to the reaction"],
    "Insulation does not add energy; it keeps the reaction's energy in the water. With less escaping, the thermometer registers a temperature change nearer the full amount. <b>Larger and closer to the true value</b>.",{layers:layers});
});

E("u3-76-procedure",3,["7.6"],2,"gen",function(){
  var v=pick([
    {q:"Why is the highest temperature reached (rather than the temperature at the moment of mixing) used in calorimetry calculations?",a:"Mixing and reaction take time, and the peak temperature is the point where the energy released has fully registered before cooling takes over",w:["The first temperature is always wrong because thermometers lag by exactly one minute","The highest temperature is used because the reaction only starts at that point","Any temperature after mixing gives the same result, so the highest is a convention"]},
    {q:"Why is the solution stirred gently throughout a calorimetry trial?",a:"Stirring evens out the temperature so the thermometer reads the true average temperature of the whole solution",w:["Stirring speeds up the reaction so it finishes before heat can escape","Stirring adds a measured amount of kinetic energy to the calculation","Stirring prevents the thermometer from touching the cup"]},
    {q:"Why are temperature readings taken every 30 seconds for a few minutes after mixing, rather than a single final reading?",a:"The series of readings lets the student identify the true maximum and see the cooling trend around it",w:["A single reading would use up the thermometer","The readings are averaged to cancel the reaction's energy","Frequent readings keep the solution mixed by themselves"]}
  ]);
  var vol=pick([50,75,100,125,150,200]);
  var sys=pick(["an acid-base mixture","a dissolving salt","a reacting metal and acid"]);
  return mcq("In a calorimetry experiment with "+vol+" mL of "+sys+" in the cup, a procedural question arises. "+v.q,
    v.a,v.w,
    "<b>"+v.a+"</b>.",{vol:vol});
});

/* ---------- 7.7 Energy changes during phase changes ---------- */

E("u3-77-q-phase",3,["7.7"],2,"gen",function(){
  var mode=pick(["fus","vap","molfus","molvap"]);
  if(mode==="fus"||mode==="vap"){
    var fus=mode==="fus";
    var per=fus?334:2260;
    var m=pick([10.0,12.0,15.0,18.0,20.0,25.0,30.0,40.0,50.0,60.0,75.0,80.0,90.0,100]);
    var ctx=pick(["in a calorimetry experiment","in a classroom demonstration","in an insulated container"]);
    var q=sfR(m*per,4),ans=sfR(m*per,3);
    return numq((fus?"A sample of ice at 0 \u00B0C melts completely with no temperature change "+ctx+". The mass of the ice is ":"A sample of liquid water at 100 \u00B0C vaporizes completely with no temperature change "+ctx+". The mass of the water is ")+gF(m)+" g. Using "+(fus?"\u0394Hfus = 334 J/g":"\u0394Hvap = 2.26 \u00D7 10\u00B3 J/g")+" from the Reference Information, calculate the heat required. Give your answer in J, as a decimal or in scientific notation (for example 2.26e5).",
      ans,Math.max(0.02*ans,5),
      "No temperature change occurs during a phase change, so q = m \u00D7 "+(fus?"\u0394Hfus":"\u0394Hvap")+" = "+gF(m)+" g \u00D7 "+(fus?"334":"2.26 \u00D7 10\u00B3")+" J/g = "+iF(q)+" J. The heat required is <b>"+F3(ans)+" J</b>.",{mode:mode});
  }
  var n=pick([0.250,0.500,0.750,1.00,1.25,1.50,2.00,2.50,3.00,4.00]);
  var fus2=mode==="molfus";
  var perM=fus2?6.01:40.7;
  var ctx2=pick(["in a calorimetry experiment","in a classroom demonstration","in an insulated container"]);
  var qk=sfR(n*perM,4),ansk=sfR(n*perM,3);
  return numq((fus2?"A sample of ice at 0 \u00B0C melts completely with no temperature change "+ctx2+". The sample contains ":"A sample of liquid water at 100 \u00B0C vaporizes completely with no temperature change "+ctx2+". The sample contains ")+gF(n)+" mol of water. Using "+(fus2?"\u0394Hfus = 6.01 kJ/mol":"\u0394Hvap = 40.7 kJ/mol")+" from the Reference Information, calculate the heat required. Give your answer in kJ.",
    ansk,Math.max(0.02*ansk,0.1),
    "q = n \u00D7 "+(fus2?"\u0394Hfus":"\u0394Hvap")+" = "+gF(n)+" mol \u00D7 "+(fus2?"6.01":"40.7")+" kJ/mol = "+iF(qk)+" kJ. The heat required is <b>"+F3(ansk)+" kJ</b>.",{mode:mode});
});

E("u3-77-q-combined",3,["7.7"],3,"gen",function(){
  var heat=Math.random()<0.5;
  var m=pick([10.0,20.0,25.0,40.0,50.0]);
  if(heat){
    var tStart=pick([10.0,15.0,18.0]),tEnd=pick([30.0,40.0,50.0,60.0]);
    var s1=sfR(m*2.10*tStart,4),s2=sfR(m*334,4),s3=sfR(m*4.18*tEnd,4);
    var tot=sfR(s1+s2+s3,4),totk=sfR(tot/1000,4),ans=sfR(tot/1000,3);
    return numq("A "+gF(m)+" g sample of ice at -"+gF(tStart)+" \u00B0C is heated until it becomes liquid water at "+gF(tEnd)+" \u00B0C. For ice, c = 2.10 J/(g\u00B7\u00B0C); for liquid water, c = 4.18 J/(g\u00B7\u00B0C); \u0394Hfus = 334 J/g. Calculate the total heat absorbed. Give your answer in kJ.",
      ans,Math.max(0.02*ans,0.05),
      "Work in three stages. Warm the ice: q\u2081 = "+gF(m)+" \u00D7 2.10 \u00D7 "+gF(tStart)+" = "+iF(s1)+" J. Melt the ice: q\u2082 = "+gF(m)+" \u00D7 334 = "+iF(s2)+" J. Warm the water: q\u2083 = "+gF(m)+" \u00D7 4.18 \u00D7 "+gF(tEnd)+" = "+iF(s3)+" J. Total: q = "+iF(s1)+" + "+iF(s2)+" + "+iF(s3)+" = "+iF(tot)+" J = "+iF(totk)+" kJ. The total heat absorbed is <b>"+F3(ans)+" kJ</b>.",{dir:"heat"});
  }
  var tW=pick([40.0,50.0,60.0,70.0]);
  var s1b=sfR(m*4.18*tW,4),s2b=sfR(m*334,4);
  var totb=sfR(s1b+s2b,4),totkb=sfR(totb/1000,4),ansb=sfR(totb/1000,3);
  return numq("A "+gF(m)+" g sample of liquid water at "+gF(tW)+" \u00B0C is cooled until it is entirely ice at 0 \u00B0C. For liquid water, c = 4.18 J/(g\u00B7\u00B0C); \u0394Hfus = 334 J/g. Calculate the total heat released. Give your answer in kJ.",
    ansb,Math.max(0.02*ansb,0.05),
    "Work in two stages. Cool the water to 0 \u00B0C: q\u2081 = "+gF(m)+" \u00D7 4.18 \u00D7 "+gF(tW)+" = "+iF(s1b)+" J released. Freeze the water: q\u2082 = "+gF(m)+" \u00D7 334 = "+iF(s2b)+" J released. Total: q = "+iF(s1b)+" + "+iF(s2b)+" = "+iF(totb)+" J = "+iF(totkb)+" kJ. The total heat released is <b>"+F3(ansb)+" kJ</b>.",{dir:"cool"});
});

E("u3-77-curve-read",3,["7.7"],2,"gen",function(){
  var v=pick([
    {d:"the temperature stays perfectly flat while the solid turns to liquid, even though heating continues",a:"The substance is melting: the energy goes into separating the particles, not into raising their kinetic energy",w:["The thermometer is broken, because temperature must always rise when heating","The substance is boiling at that temperature","The energy is being destroyed by the phase change"]},
    {d:"the temperature rises steadily while the substance is a single liquid",a:"The liquid is warming: the energy raises the average kinetic energy of the particles",w:["The liquid is boiling the whole time","The energy goes into separating particles at a fixed temperature","The substance is changing phase continuously"]},
    {d:"the temperature stays perfectly flat at the highest plateau while the liquid turns to gas",a:"The substance is boiling: the energy goes into separating the particles completely, not into raising the temperature",w:["The substance has reached the temperature of the hot plate and can get no hotter for that reason alone","The gas is condensing as fast as it forms","The thermometer is at its maximum reading"]}
  ]);
  var m=pick([10.0,20.0,25.0,40.0,50.0,75.0,100,200]);
  var rate=pick(["a 50 W heater","a 100 W heater","a 200 W heater"]);
  var q=mcq("A "+gF(m)+" g sample of a pure substance is heated with "+rate+" and its temperature is recorded. On the heating curve, "+v.d+". Which explanation is correct?",
    v.a,v.w,
    "On a heating curve, sloping parts are single-phase warming and flat parts are phase changes at constant temperature. Here, <b>"+v.a+"</b>.",{});
  q.figure=c32heatSVG();
  return q;
});

E("u3-77-phase-concept",3,["7.7"],1,"var",varset([
  function(){
    return mcq("While ice melts at 0 \u00B0C, heat flows in but the temperature does not rise. The energy is spent",
      "Separating the water molecules from their fixed positions in the solid, increasing their potential energy",
      ["Raising the kinetic energy of the molecules, which the thermometer cannot detect yet",
       "Breaking the covalent bonds inside the water molecules",
       "Warming the container instead of the ice"],
      "Temperature measures average kinetic energy. During melting the incoming energy does the work of pulling molecules out of the solid lattice, raising potential energy instead, so the temperature waits until the change is complete.",{});
  },
  function(){
    return mcq("Which statement about enthalpy changes of phase is correct?",
      "Melting and vaporizing are endothermic (positive \u0394H), while freezing and condensing are exothermic (negative \u0394H) with the same magnitudes",
      ["All phase changes are endothermic",
       "Freezing has a larger enthalpy change than melting for the same substance",
       "Vaporizing takes less energy than melting for the same substance"],
      "A phase change and its reverse exchange the same energy in opposite directions: \u0394Hfus and freezing are a matched pair, as are vaporization and condensation.",{});
  },
  function(){
    return mcq("On a cold morning, dew forms on a car windshield and the glass under the dew is very slightly warmer than the dry glass nearby. The warming is because",
      "Condensation is exothermic: water vapour releases energy as it becomes liquid",
      ["Condensation is endothermic and always warms surfaces",
       "The dew insulates the glass from the cold air in a way that creates heat",
       "Frost must have formed first and then melted"],
      "Condensing is the reverse of vaporizing, so it releases the enthalpy of vaporization. That released energy slightly warms the surface the dew forms on.",{});
  }
]));

/* ---------- 7.8 Measuring enthalpy changes ---------- */

E("u3-78-deltah-from-q",3,["7.8"],2,"gen",function(){
  var vol=pick([25.0,50.0,50.0,100]);
  var conc=pick([0.500,1.00,1.00,2.00]);
  var dt=pick([3.40,5.20,6.70,6.70,8.10,10.5,13.4]);
  var mtot=2*vol;
  var q=sfR(mtot*4.18*dt,4),qk=sfR(q/1000,4);
  var n=sfR(conc*vol/1000,4);
  var dH=sfR(-qk/n,4),ans=sfR(dH,3);
  return numq(gF(vol)+" mL of "+gF(conc)+" mol/L hydrochloric acid is mixed with "+gF(vol)+" mL of "+gF(conc)+" mol/L sodium hydroxide in a foam-cup calorimeter. The temperature of the mixture rises by "+gF(dt)+" \u00B0C. Taking the total mass of solution as "+gF(mtot)+" g and c = 4.18 J/(g\u00B7\u00B0C), calculate the enthalpy change of neutralization per mole of acid. Give your answer in kJ/mol.",
    ans,Math.max(0.02*Math.abs(ans),0.5),
    "Heat released: q = mc\u0394T = "+gF(mtot)+" g \u00D7 4.18 J/(g\u00B7\u00B0C) \u00D7 "+gF(dt)+" \u00B0C = "+iF(q)+" J = "+iF(qk)+" kJ. Amount of acid: n = "+gF(conc)+" mol/L \u00D7 "+gF(vol)+" mL / 1000 = "+iF(n)+" mol. \u0394H = -q / n = -"+iF(qk)+" kJ / "+iF(n)+" mol = "+iF(dH)+" kJ/mol. The enthalpy change of neutralization is <b>"+F3(ans)+" kJ/mol</b>.",{});
});

E("u3-78-dissolving",3,["7.8"],2,"gen",function(){
  var salts=[{n:"ammonium nitrate",M:80.05,endo:true},{n:"potassium nitrate",M:101.10,endo:true},{n:"sodium hydroxide",M:40.00,endo:false},{n:"calcium chloride",M:110.98,endo:false}];
  var s=pick(salts);
  var mass=pick([2.00,4.00,5.00,8.00,10.0]);
  var mw=pick([100,150,200,250]);
  var dt=pick([2.5,3.8,4.6,5.5,7.2,9.0]);
  var mtot=mw+mass;
  var q=sfR(mtot*4.18*dt,4),qk=sfR(q/1000,4);
  var n=sfR(mass/s.M,4);
  var dH=sfR((s.endo?1:-1)*qk/n,4),ans=sfR(dH,3);
  return numq(gF(mass)+" g of "+s.n+" is dissolved in "+gF(mw)+" g of water in a calorimeter. The temperature of the solution "+(s.endo?"falls":"rises")+" by "+gF(dt)+" \u00B0C. Taking the total mass of solution as "+gF(mtot)+" g and c = 4.18 J/(g\u00B7\u00B0C), calculate the molar enthalpy of solution of "+s.n+". Give your answer in kJ/mol.",
    ans,Math.max(0.02*Math.abs(ans),0.5),
    "Heat "+(s.endo?"absorbed from":"released into")+" the solution: q = mc\u0394T = "+gF(mtot)+" g \u00D7 4.18 J/(g\u00B7\u00B0C) \u00D7 "+gF(dt)+" \u00B0C = "+iF(q)+" J = "+iF(qk)+" kJ. Amount dissolved: n = "+gF(mass)+" g / "+gF(s.M)+" g/mol = "+iF(n)+" mol. The temperature "+(s.endo?"fell, so the dissolving took energy in: \u0394H is positive":"rose, so the dissolving released energy: \u0394H is negative")+". \u0394H = "+(s.endo?"+":"-")+"q / n = "+iF(dH)+" kJ/mol. The molar enthalpy of solution is <b>"+F3(ans)+" kJ/mol</b>.",{});
});

E("u3-78-sign-judgement",3,["7.8"],2,"gen",function(){
  var v=pick([
    {d:"a salt dissolves and the temperature of the solution drops by",a:"\u0394H is positive: the process is endothermic",w:["\u0394H is negative: the process is exothermic","\u0394H is zero: dissolving is not a chemical change","\u0394H is positive: the process is exothermic"]},
    {d:"an acid and a base are mixed and the temperature of the solution climbs by",a:"\u0394H is negative: the reaction is exothermic",w:["\u0394H is positive: the reaction is endothermic","\u0394H is zero: the temperature change is only from mixing","\u0394H is negative: the reaction is endothermic"]},
    {d:"a fuel burns under a calorimeter and the water temperature rises by",a:"\u0394H is negative: the combustion is exothermic",w:["\u0394H is positive: combustion is endothermic","\u0394H is zero: the water absorbed all of the change","\u0394H is positive: the combustion is exothermic"]}
  ]);
  var dt=pick([2.5,4.0,5.5,7.0,9.5,12.0]);
  var mw=pick([100,150,200,250]);
  return mcq("In a calorimetry measurement with "+gF(mw)+" g of solution in the cup, "+v.d+" "+gF(dt)+" \u00B0C. Which conclusion about \u0394H is correct?",
    v.a,v.w,
    "The measured temperature change of the surroundings reveals the direction of the energy flow: <b>"+v.a+"</b>.",{dt:dt,mw:mw});
});

E("u3-78-per-mole",3,["7.8"],1,"var",varset([
  function(){
    return mcq("Enthalpy changes are reported per mole (kJ/mol) mainly because",
      "Enthalpy change is extensive: it scales with the amount reacting, so dividing by the amount gives a value that can be compared between reactions",
      ["One mole is the only amount that can be measured in a calorimeter",
       "Per-mole values are always whole numbers",
       "The mole is the SI unit of temperature"],
      "Double the reactants and you double the heat. Reporting \u0394H per mole removes the size of the particular experiment and leaves the property of the reaction itself.",{});
  },
  function(){
    var q=pick([56,112,224]);
    return mcq("A neutralization releases "+q+" kJ when 2.00 mol of acid react. The molar enthalpy change is reported as half of "+q+" kJ because",
      "The reported value is per mole of acid, and 2.00 mol reacted, so the total is divided by 2.00",
      ["Half of the energy is always lost to the surroundings",
       "The calorimeter only measures half of the heat",
       "Molar values are defined with a factor of two"],
      "The measured heat belongs to the amount that actually reacted. Per mole means dividing by the moles: "+q+" kJ / 2.00 mol = "+(q/2)+" kJ/mol.",{q:q});
  }
]));

/* ---------- 7.9 Calorimetry: experimental design and analysis ---------- */

E("u3-79-controls",3,["7.9"],2,"gen",function(){
  var fuels=pick([["methanol","ethanol"],["propane","butane"],["ethanol","propane"],["methanol","butane"]]);
  var mw=pick([100,150,200,250]);
  var t0=pick([15.0,18.0,20.0,22.0]),loc=pick(["on a lab bench","in a fume hood","on a still day outdoors"]);
  return mcq("A student compares the energy released by burning "+fuels[0]+" and "+fuels[1]+" by heating water in a calorimeter "+loc+". Each fuel is burned in a separate trial under identical apparatus, with the water starting at "+gF(t0)+" \u00B0C. Which set of controls makes the comparison valid?",
    "Same mass of water ("+gF(mw)+" g), same starting temperature of the water, same distance from flame to container, and the same mass of fuel burned in each trial",
    ["Same mass of water, but a larger flame for the fuel expected to be weaker, to keep the trials fair",
     "Different masses of water, as long as each trial uses whichever amount is convenient",
     "Same starting temperature, but the second fuel is burned in a draft to speed it up"],
    "A fair comparison changes only the fuel. Water mass, starting temperature, geometry and fuel mass all affect the temperature rise, so all of them must be held the same; otherwise a difference in \u0394T could come from the setup instead of the fuel.",{});
});

E("u3-79-error-direction",3,["7.9"],2,"gen",function(){
  var v=pick([
    {d:"some of the fuel vapour escapes unburned before it can be ignited",a:"The measured heat is too small, so the calculated \u0394H is too small in magnitude (not exothermic enough)",w:["The measured heat is too large, so the calculated \u0394H is too large in magnitude","The result is unaffected, because the escaped vapour had no energy","The calculated \u0394H changes sign"]},
    {d:"the thermometer bulb rests against the hot metal container instead of sitting in the water",a:"The recorded temperature is too high, so the calculated \u0394H is too large in magnitude",w:["The recorded temperature is too low, so the calculated \u0394H is too small in magnitude","The result is unaffected, because metal and water are always the same temperature","The calculated \u0394H changes sign"]},
    {d:"a draft blows across the apparatus during the burn, carrying heat away",a:"The measured temperature rise is too small, so the calculated \u0394H is too small in magnitude (not exothermic enough)",w:["The measured temperature rise is too large, so the calculated \u0394H is too large in magnitude","The draft adds energy, making the result too exothermic","The result is unaffected once the fuel is fully burned"]}
  ]);
  var t=ri(10,35);
  return mcq("In a fuel calorimetry experiment at a room temperature of "+t+" \u00B0C, "+v.d+" throughout the trial. What is the effect on the calculated enthalpy change?",
    v.a,v.w,
    "Trace the error through the calculation: the flaw changes the measured heat or temperature, and the calculated \u0394H follows. <b>"+v.a+"</b>.",{t:t});
});

E("u3-79-design-eval",3,["7.9"],3,"var",varset([
  function(){
    return mcq("Two students measure the enthalpy of combustion of ethanol. Student A burns the fuel under an uninsulated open beaker 15 cm above the flame's base in a drafty room. Student B uses a lidded metal can, insulation around it, a fixed burner position, and repeats the trial three times, discarding a trial where the flame blew out. Whose value should be closer to the accepted value, and why?",
      "Student B: the design reduces heat loss (the main systematic error) and the repeats expose unreliable trials, while Student A's setup loses heat in several uncontrolled ways",
      ["Student A: fewer pieces of apparatus means fewer sources of error",
       "Both are equal: enthalpy values do not depend on the apparatus",
       "Student B: only because three trials were done; the insulation and lid make no difference"],
      "The dominant error in combustion calorimetry is heat escaping before it registers in the water. Student B's design attacks exactly that error and adds repeatability checks. Student A's open, drafty setup loses heat in ways that cannot be corrected. <b>Student B's value should be closer</b>.",{});
  },
  function(){
    return mcq("A student wants to find which of two hand warmers (different chemical mixtures) releases more heat per gram. The plan: put mixture 1 in a foam cup with 100 g of water and mixture 2 in a foam cup with 200 g of water, activate both, and compare the temperature rises directly. Which evaluation is correct?",
      "The comparison is invalid as planned: with different water masses, the same heat release gives different temperature rises, so the rises cannot be compared directly unless the heat for each is calculated from q = mc\u0394T first",
      ["The plan is valid: temperature rise alone always ranks heat release",
       "The plan is invalid because foam cups cannot be used for exothermic solids",
       "The comparison is valid if both cups are the same colour"],
      "Temperature rise depends on the mass being heated: q = mc\u0394T. Doubling the water halves the rise for the same heat. The student must either use equal masses or calculate q for each trial before comparing. <b>The comparison is invalid as planned</b>.",{});
  },
  function(){
    return mcq("A class measures the enthalpy of solution of a salt. One group's three trials give -41.2, -40.8 and -55.6 kJ/mol, while the class average of the other groups is close to -41 kJ/mol. The -55.6 trial was noted as 'solution splashed out when the salt was added'. What is the best handling of that trial?",
      "Exclude it, with the reason recorded: the splash lost some of the reacting material, so that trial did not measure the same process as the others",
      ["Keep it: all data must always be averaged, whatever happened",
       "Exclude the other two trials, because the largest value is the most complete",
       "Change -55.6 to -41.0 so it matches the class"],
      "Data may be excluded for a documented experimental fault that changed what was measured, never merely for disagreeing. Losing reactant to a splash means that trial's heat corresponds to a smaller, unknown amount. <b>Exclude it, with the reason recorded</b>.",{});
  }
]));

E("u3-79-precision",3,["7.9"],1,"gen",function(){
  var v=pick([
    {q:"A thermometer is graduated in 1 \u00B0C steps. Readings from it should be recorded to the nearest",a:"0.1 \u00B0C, estimating one decimal place between the graduations",w:["1 \u00B0C exactly, with no decimal places","0.01 \u00B0C, because digital-style precision is expected","10 \u00B0C, because temperature changes are large"]},
    {q:"A student repeats a calorimetry trial four times and averages the results. Averaging repeated trials mainly improves",a:"Precision: random errors partly cancel, giving a value closer to the group's own consistent result",w:["Accuracy against heat loss, because averaging returns escaped heat","The resolution of the thermometer","The sign of the enthalpy change"]}
  ]);
  var vol=pick([50,100,150,200,250]),tp=ri(15,30);
  return mcq("During a calorimetry practical at "+tp+" \u00B0C using "+vol+" mL of water, the following point comes up. "+v.q+":",
    v.a,v.w,
    "<b>"+v.a+"</b>.",{vol:vol});
});

/* ---------- 7.10 Combustion reactions ---------- */

E("u3-710-per-gram",3,["7.10"],2,"gen",function(){
  var fuels=[{n:"methane",M:16.04,dH:-890},{n:"propane",M:44.10,dH:-2219},{n:"ethanol",M:46.07,dH:-1367},{n:"butane",M:58.12,dH:-2878},{n:"octane",M:114.23,dH:-5470}];
  var f=pick(fuels);
  var per=sfR(f.dH/f.M,4);
  var tp=pick([15,20,25,30]);
  if(Math.random()<0.5){
    var ans=sfR(per,3);
    return numq("At "+tp+" \u00B0C, the molar enthalpy of combustion of "+f.n+" is "+f.dH+" kJ/mol, and its molar mass is "+gF(f.M)+" g/mol. Calculate the energy released per gram of "+f.n+" burned. Give your answer in kJ/g.",
      ans,Math.max(0.02*Math.abs(ans),0.2),
      "Energy per gram = \u0394H per mole / molar mass = "+f.dH+" kJ/mol / "+gF(f.M)+" g/mol = "+iF(per)+" kJ/g. The energy released per gram is <b>"+F3(ans)+" kJ/g</b> (the negative sign shows the energy is released). Fuels are compared per gram because fuel is bought and carried by mass.",{mode:"pergram"});
  }
  var mass=pick([2.00,5.00,10.0,25.0,50.0,100]);
  var tot=sfR(per*mass,4),ans2=sfR(tot,3);
  return numq("At "+tp+" \u00B0C, the molar enthalpy of combustion of "+f.n+" is "+f.dH+" kJ/mol, and its molar mass is "+gF(f.M)+" g/mol. Calculate the total energy released when "+gF(mass)+" g of "+f.n+" burns completely. Give your answer in kJ.",
    ans2,Math.max(0.02*Math.abs(ans2),0.5),
    "First convert to a per-gram basis: "+f.dH+" kJ/mol / "+gF(f.M)+" g/mol = "+iF(per)+" kJ/g. Then scale by the mass: "+iF(per)+" kJ/g \u00D7 "+gF(mass)+" g = "+iF(tot)+" kJ. The total energy released is <b>"+F3(ans2)+" kJ</b>.",{mode:"total"});
});

E("u3-710-combustion-products",3,["7.10"],1,"var",varset([
  function(){
    return mcq("Complete combustion of a hydrocarbon fuel in plentiful oxygen produces",
      "Carbon dioxide and water only",
      ["Carbon monoxide and water only","Carbon (soot), carbon monoxide, and no water","Carbon dioxide and hydrogen gas"],
      "Complete combustion fully oxidizes the fuel: every carbon becomes CO\u2082 and every hydrogen ends up in H\u2082O. Anything less (CO, soot) is incomplete combustion.",{});
  },
  function(){
    return mcq("A fuel burns with a sooty, orange flame in limited air and releases less heat per gram than its tabulated enthalpy of combustion. The best explanation is",
      "Incomplete combustion: some fuel forms carbon monoxide or soot instead of carbon dioxide, so less energy is released",
      ["The tabulated value is for a different fuel",
       "Heat is being destroyed by the soot",
       "The fuel absorbed energy from the flame"],
      "Full oxidation to CO\u2082 releases the maximum energy. When oxygen is short, carbon stops at CO or C, which still hold chemical energy, so the measured release is smaller. <b>Incomplete combustion</b>.",{});
  },
  function(){
    return mcq("The standard enthalpy of combustion of a substance is defined as the enthalpy change when",
      "One mole of the substance burns completely in oxygen under standard conditions",
      ["One gram of the substance burns in any conditions",
       "Any amount of the substance burns until the flame goes out",
       "One mole of the substance is formed from its elements"],
      "Molar enthalpy of combustion is per mole, for complete combustion, under standard conditions. (Formation from the elements is a different quantity, the enthalpy of formation.)",{});
  }
]));

E("u3-710-molar-combustion",3,["7.10"],3,"gen",function(){
  var fuels=[{n:"propane",M:44.10},{n:"butane",M:58.12},{n:"octane",M:114.23},{n:"ethanol",M:46.07}];
  var f=pick(fuels);
  var mass=pick([0.400,0.600,0.800,1.00,1.20]);
  var mw=pick([200,250,300,500]);
  var dt=pick([9.0,11.0,13.5,16.0,19.0,22.0]);
  var eff=pick([55,60,65,70,75,80]);
  var qw=sfR(mw*4.18*dt,4);
  var qcomb=sfR(qw/(eff/100),4),qck=sfR(qcomb/1000,4);
  var n=sfR(mass/f.M,4);
  var dH=sfR(-qck/n,4),ans=sfR(dH,3);
  return numq("A "+gF(mass)+" g sample of "+f.n+" is burned in a calorimeter containing "+gF(mw)+" g of water, and the water temperature rises by "+gF(dt)+" \u00B0C. Only "+eff+"% of the heat released by the combustion is captured by the water; the rest is lost to the apparatus and air. Calculate the molar enthalpy of combustion of "+f.n+". Give your answer in kJ/mol.",
    ans,Math.max(0.025*Math.abs(ans),1),
    "Heat captured by the water: q = mc\u0394T = "+gF(mw)+" g \u00D7 4.18 J/(g\u00B7\u00B0C) \u00D7 "+gF(dt)+" \u00B0C = "+iF(qw)+" J. That is only "+eff+"% of the combustion heat, so the total heat released is "+iF(qw)+" / 0."+eff+" = "+iF(qcomb)+" J = "+iF(qck)+" kJ. Amount burned: n = "+gF(mass)+" g / "+gF(f.M)+" g/mol = "+iF(n)+" mol. \u0394H = -"+iF(qck)+" kJ / "+iF(n)+" mol = "+iF(dH)+" kJ/mol. The molar enthalpy of combustion is <b>"+F3(ans)+" kJ/mol</b>.",{});
});

/* ---------- 7.11 Thermochemical equations ---------- */

var THERMO_CASES=[
  {desc:"the complete combustion of methane, CH\u2084(g) + 2 O\u2082(g) \u2192 CO\u2082(g) + 2 H\u2082O(l), with \u0394H = -890 kJ per mole of methane",
   ans:["CH\u2084(g) + 2 O\u2082(g) \u2192 CO\u2082(g) + 2 H\u2082O(l) + 890 kJ","CH4(g) + 2 O2(g) -> CO2(g) + 2 H2O(l) + 890 kJ","CH\u2084 + 2 O\u2082 \u2192 CO\u2082 + 2 H\u2082O + 890 kJ","CH4 + 2 O2 -> CO2 + 2 H2O + 890 kJ","CH\u2084(g) + 2 O\u2082(g) \u2192 CO\u2082(g) + 2 H\u2082O(l), \u0394H = -890 kJ","CH4(g) + 2 O2(g) -> CO2(g) + 2 H2O(l), dH = -890 kJ","CH\u2084(g) + 2 O\u2082(g) \u2192 CO\u2082(g) + 2 H\u2082O(l) \u0394H = -890 kJ","CH4 + 2 O2 -> CO2 + 2 H2O dH = -890 kJ"],
   show:"CH\u2084(g) + 2 O\u2082(g) \u2192 CO\u2082(g) + 2 H\u2082O(l) + 890 kJ (equivalently, \u0394H = -890 kJ)"},
  {desc:"the synthesis of ammonia, N\u2082(g) + 3 H\u2082(g) \u2192 2 NH\u2083(g), with \u0394H = -92 kJ for the equation as written",
   ans:["N\u2082(g) + 3 H\u2082(g) \u2192 2 NH\u2083(g) + 92 kJ","N2(g) + 3 H2(g) -> 2 NH3(g) + 92 kJ","N\u2082 + 3 H\u2082 \u2192 2 NH\u2083 + 92 kJ","N2 + 3 H2 -> 2 NH3 + 92 kJ","N\u2082(g) + 3 H\u2082(g) \u2192 2 NH\u2083(g), \u0394H = -92 kJ","N2(g) + 3 H2(g) -> 2 NH3(g), dH = -92 kJ","N\u2082(g) + 3 H\u2082(g) \u2192 2 NH\u2083(g) \u0394H = -92 kJ","N2 + 3 H2 -> 2 NH3 dH = -92 kJ"],
   show:"N\u2082(g) + 3 H\u2082(g) \u2192 2 NH\u2083(g) + 92 kJ (equivalently, \u0394H = -92 kJ)"},
  {desc:"the decomposition of calcium carbonate, CaCO\u2083(s) \u2192 CaO(s) + CO\u2082(g), with \u0394H = +178 kJ for the equation as written",
   ans:["CaCO\u2083(s) + 178 kJ \u2192 CaO(s) + CO\u2082(g)","CaCO3(s) + 178 kJ -> CaO(s) + CO2(g)","CaCO\u2083 + 178 kJ \u2192 CaO + CO\u2082","CaCO3 + 178 kJ -> CaO + CO2","CaCO\u2083(s) \u2192 CaO(s) + CO\u2082(g), \u0394H = +178 kJ","CaCO3(s) -> CaO(s) + CO2(g), dH = +178 kJ","CaCO\u2083(s) \u2192 CaO(s) + CO\u2082(g) \u0394H = +178 kJ","CaCO3 -> CaO + CO2 dH = +178 kJ"],
   show:"CaCO\u2083(s) + 178 kJ \u2192 CaO(s) + CO\u2082(g) (equivalently, \u0394H = +178 kJ)"}
];
E("u3-711-write-thermochem",3,["7.11"],2,"var",varset(THERMO_CASES.map(function(c){return function(){
  return textq("Write the thermochemical equation for "+c.desc+". Include the energy term in the equation or give \u0394H with the equation.",
    c.ans,
    "A thermochemical equation is a balanced equation with the energy change attached: released energy is written as a product (or \u0394H is negative), and absorbed energy is written as a reactant (or \u0394H is positive). <b>"+c.show+"</b>.",{});
};})));

E("u3-711-molar-from-data",3,["7.11"],2,"gen",function(){
  var subs=[{n:"magnesium",M:24.31,dH:-602,verb:"burns in oxygen"},{n:"calcium",M:40.08,dH:-635,verb:"burns in oxygen"},{n:"sulfur",M:32.07,dH:-297,verb:"burns in oxygen"},{n:"zinc",M:65.39,dH:-350,verb:"reacts completely with excess acid"}];
  var s=pick(subs);
  var mass=pick([1.00,1.50,2.00,2.50,3.00,5.00]);
  var n=sfR(mass/s.M,4);
  var q=sfR(Math.abs(s.dH)*n*(0.97+Math.random()*0.06),3);
  var dH=sfR(-q/n,4),ans=sfR(dH,3);
  return numq("When "+gF(mass)+" g of "+s.n+" "+s.verb+", "+F3(q)+" kJ of energy is released. Calculate the molar enthalpy change for the reaction. Give your answer in kJ/mol.",
    ans,Math.max(0.02*Math.abs(ans),1),
    "Amount reacted: n = "+gF(mass)+" g / "+gF(s.M)+" g/mol = "+iF(n)+" mol. \u0394H = -q / n = -"+F3(q)+" kJ / "+iF(n)+" mol = "+iF(dH)+" kJ/mol. The molar enthalpy change is <b>"+F3(ans)+" kJ/mol</b>.",{});
});

E("u3-711-reading-equation",3,["7.11"],1,"gen",function(){
  var v=pick([
    {eq:"2 H\u2082(g) + O\u2082(g) \u2192 2 H\u2082O(l) + 572 kJ",a:"572 kJ is released for every 2 mol of hydrogen burned (that is, per mole of reaction as written)",w:["572 kJ is released for every 1 mol of hydrogen burned","572 kJ is absorbed for every 2 mol of hydrogen burned","572 kJ is the activation energy of the reaction"]},
    {eq:"CaCO\u2083(s) + 178 kJ \u2192 CaO(s) + CO\u2082(g)",a:"178 kJ is absorbed for every 1 mol of calcium carbonate decomposed",w:["178 kJ is released for every 1 mol of calcium carbonate decomposed","178 kJ is absorbed for every 1 g of calcium carbonate decomposed","178 kJ is the energy stored in the products alone"]},
    {eq:"CH\u2084(g) + 2 O\u2082(g) \u2192 CO\u2082(g) + 2 H\u2082O(l) + 890 kJ",a:"890 kJ is released when 1 mol of methane burns completely",w:["890 kJ is released when 1 mol of oxygen burns","890 kJ is absorbed when 1 mol of methane burns","890 kJ is released when 2 mol of methane burn"]}
  ]);
  var t=ri(0,60);
  return mcq("A thermochemical equation is written at "+t+" \u00B0C as: "+v.eq+". Which interpretation is correct?",
    v.a,v.w,
    "Energy terms in a thermochemical equation belong to the equation as written: scale them with the coefficients. <b>"+v.a+"</b>.",{t:t});
});

/* ---------- 7.12 Calculating enthalpy changes ---------- */

E("u3-712-bond-energy",3,["7.12"],2,"gen",function(){
  var rxns=[
    {eq:"H\u2082(g) + Cl\u2082(g) \u2192 2 HCl(g)",broken:"one H-H bond and one Cl-Cl bond",formed:"two H-Cl bonds",bSum:"436 + 242",bVal:678,fSum:"2 \u00D7 431",fVal:862},
    {eq:"CH\u2084(g) + 2 O\u2082(g) \u2192 CO\u2082(g) + 2 H\u2082O(g)",broken:"four C-H bonds and two O=O bonds",formed:"two C=O bonds and four O-H bonds",bSum:"4 \u00D7 413 + 2 \u00D7 498",bVal:2648,fSum:"2 \u00D7 799 + 4 \u00D7 463",fVal:3450},
    {eq:"N\u2082(g) + 3 H\u2082(g) \u2192 2 NH\u2083(g)",broken:"one N\u2261N bond and three H-H bonds",formed:"six N-H bonds",bSum:"946 + 3 \u00D7 436",bVal:2254,fSum:"6 \u00D7 391",fVal:2346},
    {eq:"H\u2082(g) + Br\u2082(g) \u2192 2 HBr(g)",broken:"one H-H bond and one Br-Br bond",formed:"two H-Br bonds",bSum:"436 + 193",bVal:629,fSum:"2 \u00D7 366",fVal:732},
    {eq:"C\u2082H\u2084(g) + H\u2082(g) \u2192 C\u2082H\u2086(g)",broken:"one C=C bond and one H-H bond",formed:"one C-C bond and two C-H bonds",bSum:"614 + 436",bVal:1050,fSum:"348 + 2 \u00D7 413",fVal:1174}
  ];
  var r=pick(rxns);
  var dH=r.bVal-r.fVal;
  var ans=sfR(dH,3);
  var tp=pick([20,25,30]),pr=pick([95,100,101,105]);
  return numq("At "+tp+" \u00B0C and "+pr+" kPa, use the average bond energies in the Reference Information to estimate \u0394H for the reaction "+r.eq+". Bonds broken: "+r.broken+". Bonds formed: "+r.formed+". Give your answer in kJ (for the equation as written).",
    ans,Math.max(0.02*Math.abs(ans),1),
    "\u0394H \u2248 (energy to break bonds) - (energy released forming bonds) = ("+r.bSum+") - ("+r.fSum+") = "+r.bVal+" - "+r.fVal+" = "+iF(dH)+" kJ. The estimated \u0394H is <b>"+F3(ans)+" kJ</b>. Breaking bonds takes energy in; forming them releases it, and the difference is the enthalpy change.",{});
});

E("u3-712-formation",3,["7.12"],2,"gen",function(){
  var rxns=[
    {eq:"CH\u2084(g) + 2 O\u2082(g) \u2192 CO\u2082(g) + 2 H\u2082O(l)",data:"\u0394Hf values (kJ/mol): CH\u2084(g) -74.8; O\u2082(g) 0; CO\u2082(g) -393.5; H\u2082O(l) -285.8",pSum:"-393.5 + 2 \u00D7 (-285.8)",pVal:-965.1,rSum:"-74.8 + 2 \u00D7 0",rVal:-74.8},
    {eq:"2 CO(g) + O\u2082(g) \u2192 2 CO\u2082(g)",data:"\u0394Hf values (kJ/mol): CO(g) -110.5; O\u2082(g) 0; CO\u2082(g) -393.5",pSum:"2 \u00D7 (-393.5)",pVal:-787,rSum:"2 \u00D7 (-110.5) + 0",rVal:-221},
    {eq:"N\u2082(g) + 3 H\u2082(g) \u2192 2 NH\u2083(g)",data:"\u0394Hf values (kJ/mol): N\u2082(g) 0; H\u2082(g) 0; NH\u2083(g) -45.9",pSum:"2 \u00D7 (-45.9)",pVal:-91.8,rSum:"0 + 3 \u00D7 0",rVal:0},
    {eq:"C\u2082H\u2085OH(l) + 3 O\u2082(g) \u2192 2 CO\u2082(g) + 3 H\u2082O(l)",data:"\u0394Hf values (kJ/mol): C\u2082H\u2085OH(l) -277.6; O\u2082(g) 0; CO\u2082(g) -393.5; H\u2082O(l) -285.8",pSum:"2 \u00D7 (-393.5) + 3 \u00D7 (-285.8)",pVal:-1644.4,rSum:"-277.6 + 3 \u00D7 0",rVal:-277.6},
    {eq:"CaCO\u2083(s) \u2192 CaO(s) + CO\u2082(g)",data:"\u0394Hf values (kJ/mol): CaCO\u2083(s) -1206.9; CaO(s) -635.1; CO\u2082(g) -393.5",pSum:"-635.1 + (-393.5)",pVal:-1028.6,rSum:"-1206.9",rVal:-1206.9}
  ];
  var r=pick(rxns);
  var dH=sfR(r.pVal-r.rVal,4),ans=sfR(dH,3);
  var tp=pick([20,25,30]),pr=pick([95,100,101,105]);
  return numq("At "+tp+" \u00B0C and "+pr+" kPa, calculate \u0394H for the reaction "+r.eq+" using standard enthalpies of formation. "+r.data+". Give your answer in kJ (for the equation as written).",
    ans,Math.max(0.015*Math.abs(ans),1),
    "\u0394H = \u03A3 n \u0394Hf(products) - \u03A3 n \u0394Hf(reactants) = ("+r.pSum+") - ("+r.rSum+") = "+iF(r.pVal)+" - ("+iF(r.rVal)+") = "+iF(dH)+" kJ. So \u0394H = <b>"+F3(ans)+" kJ</b>. Elements in their standard states contribute 0.",{});
});

E("u3-712-hess",3,["7.12"],3,"gen",function(){
  var fams=[
    {target:"2 C(s) + H\u2082(g) \u2192 C\u2082H\u2082(g)",rev:"C\u2082H\u2082(g) \u2192 2 C(s) + H\u2082(g)",
     given:"(1) C\u2082H\u2082(g) + 5/2 O\u2082(g) \u2192 2 CO\u2082(g) + H\u2082O(l), \u0394H = -1299.5 kJ\n(2) C(s) + O\u2082(g) \u2192 CO\u2082(g), \u0394H = -393.5 kJ\n(3) H\u2082(g) + \u00BD O\u2082(g) \u2192 H\u2082O(l), \u0394H = -285.8 kJ",
     steps:"Use 2 \u00D7 (2): 2 C(s) + 2 O\u2082(g) \u2192 2 CO\u2082(g), \u0394H = 2 \u00D7 (-393.5) = -787.0 kJ. Use (3) as written: \u0394H = -285.8 kJ. Reverse (1): 2 CO\u2082(g) + H\u2082O(l) \u2192 C\u2082H\u2082(g) + 5/2 O\u2082(g), \u0394H = +1299.5 kJ. Adding the three cancels the CO\u2082, H\u2082O and O\u2082 terms and leaves the target equation.",
     sum:"-787.0 + (-285.8) + 1299.5",val:226.7},
    {target:"CH\u2084(g) + 2 O\u2082(g) \u2192 CO\u2082(g) + 2 H\u2082O(l)",rev:"CO\u2082(g) + 2 H\u2082O(l) \u2192 CH\u2084(g) + 2 O\u2082(g)",
     given:"(1) C(s) + O\u2082(g) \u2192 CO\u2082(g), \u0394H = -393.5 kJ\n(2) H\u2082(g) + \u00BD O\u2082(g) \u2192 H\u2082O(l), \u0394H = -285.8 kJ\n(3) C(s) + 2 H\u2082(g) \u2192 CH\u2084(g), \u0394H = -74.8 kJ",
     steps:"Use (1) as written: \u0394H = -393.5 kJ. Use 2 \u00D7 (2): 2 H\u2082(g) + O\u2082(g) \u2192 2 H\u2082O(l), \u0394H = 2 \u00D7 (-285.8) = -571.6 kJ. Reverse (3): CH\u2084(g) \u2192 C(s) + 2 H\u2082(g), \u0394H = +74.8 kJ. Adding the three cancels the C(s) and H\u2082 terms and leaves the target equation.",
     sum:"-393.5 + (-571.6) + 74.8",val:-890.3},
    {target:"2 NO(g) + O\u2082(g) \u2192 2 NO\u2082(g)",rev:"2 NO\u2082(g) \u2192 2 NO(g) + O\u2082(g)",
     given:"(1) N\u2082(g) + O\u2082(g) \u2192 2 NO(g), \u0394H = +180.5 kJ\n(2) N\u2082(g) + 2 O\u2082(g) \u2192 2 NO\u2082(g), \u0394H = +66.4 kJ",
     steps:"Use (2) as written: \u0394H = +66.4 kJ. Reverse (1): 2 NO(g) \u2192 N\u2082(g) + O\u2082(g), \u0394H = -180.5 kJ. Adding the two cancels the N\u2082 and one O\u2082, leaving the target equation. Only two equations are needed here; Hess's law does not require using a fixed number of steps.",
     sum:"66.4 + (-180.5)",val:-114.1}
  ];
  var f=pick(fams);
  var rev=Math.random()<0.5;
  var tp=pick([20,25,30]),pr=pick([95,100,101,105]);
  if(!rev){
    var ans=sfR(f.val,3);
    return numq("At "+tp+" \u00B0C and "+pr+" kPa, use Hess's law to calculate \u0394H for the target reaction:\n"+f.target+"\nGiven:\n"+f.given+"\nGive your answer in kJ.",
      ans,Math.max(0.015*Math.abs(ans),1),
      f.steps+" \u0394H(target) = "+f.sum+" = "+iF(f.val)+" kJ. So \u0394H = <b>"+F3(ans)+" kJ</b>.",{rev:0});
  }
  var ansR=sfR(-f.val,3);
  return numq("At "+tp+" \u00B0C and "+pr+" kPa, use Hess's law to calculate \u0394H for the target reaction:\n"+f.rev+"\nGiven:\n"+f.given+"\nGive your answer in kJ.",
    ansR,Math.max(0.015*Math.abs(ansR),1),
    "First build the forward direction. "+f.steps+" That sum gives \u0394H = "+f.sum+" = "+iF(f.val)+" kJ for the forward reaction. The target reaction is exactly the reverse of that, and reversing a reaction changes the sign of \u0394H, so \u0394H(target) = -("+iF(f.val)+") = "+iF(-f.val)+" kJ. So \u0394H = <b>"+F3(ansR)+" kJ</b>.",{rev:1});
});

E("u3-712-bond-average",3,["7.12"],1,"var",varset([
  function(){
    return mcq("Enthalpy changes calculated from bond energies are estimates rather than exact values mainly because",
      "Tabulated bond energies are averages over many different compounds, while the actual bond energy depends on the specific molecule",
      ["Bond energies are measured at the wrong temperature",
       "The method forgets to count the bonds in the products",
       "Bonds do not really store energy"],
      "A C-H bond in methane is not in exactly the same environment as a C-H bond in another molecule, but the table offers one average value. The arithmetic is exact; the input data are averages, so the result is an estimate.",{});
  },
  function(){
    return mcq("The bond energy of a bond (for example, H-H = 436 kJ/mol) is defined as the energy",
      "Required to break one mole of that bond in the gas phase",
      ["Released when one gram of the bond forms",
       "Stored in one molecule of the substance",
       "Needed to melt one mole of the substance"],
      "Bond energy is quoted per mole of bonds broken, for gas-phase species. Breaking takes energy in; forming the same bond releases the same amount.",{});
  },
  function(){
    return mcq("In the bond-energy method for estimating \u0394H, which sign convention is used?",
      "Breaking bonds is entered as a positive (energy in) term and forming bonds as a negative (energy out) term, and \u0394H is the sum",
      ["Breaking bonds releases energy, so it is entered as negative",
       "Both breaking and forming are entered as positive, and the smaller is subtracted",
       "Only the bonds in the reactants are counted"],
      "Energy must be supplied to break bonds (positive contribution) and is released when bonds form (negative contribution). \u0394H \u2248 \u03A3(bonds broken) - \u03A3(bonds formed) in magnitude terms, with the signs handled by the convention.",{});
  }
]));

/* ----- bank-u4.js ----- */
// Chemistry 3202 Unit 4 Electrochemistry question bank
// Phase C diagram figures (Nov 2026): the 8.4 cell entries and the molten
// electrolysis entry now draw standard cell diagrams. Where an entry asks
// which part is which, electrodes are labelled only with the metals and
// ions the stem itself names (or generic labels), never with anode or
// cathode, and no electron flow arrows are shown. Helpers in bank-u1.js.
// CRMARKS: u4-83-balance-acidic=5
// CRMARKS: u4-83-half-reaction-write=3
// CRMARKS: u4-83-net-reaction=4
// CRMARKS: u4-84-build-cell=4
// CRMARKS: u4-84-label-scenario=2
// CRMARKS: u4-86-predict-spontaneous=3
// CRMARKS: u4-87-cell-voltage=4
// CRMARKS: u4-87-find-e-half=3
// CRMARKS: u4-88-faraday-mass=4
// CRMARKS: u4-88-faraday-time=4

/* Standard reduction couples (metal systems), matching the Reference
   Information panel. e is E\u00B0 in volts for ion + electrons \u2192 metal. */
var ECOUPLES=[
  {ion:"Ag\u207A",metal:"Ag",z:1,e:0.80},
  {ion:"Cu\u00B2\u207A",metal:"Cu",z:2,e:0.34},
  {ion:"Pb\u00B2\u207A",metal:"Pb",z:2,e:-0.13},
  {ion:"Ni\u00B2\u207A",metal:"Ni",z:2,e:-0.25},
  {ion:"Fe\u00B2\u207A",metal:"Fe",z:2,e:-0.44},
  {ion:"Zn\u00B2\u207A",metal:"Zn",z:2,e:-0.76},
  {ion:"Al\u00B3\u207A",metal:"Al",z:3,e:-1.66},
  {ion:"Mg\u00B2\u207A",metal:"Mg",z:2,e:-2.37}
];
function eF(x){return (x>0?"+":"")+fmtF(x,2);}

/* ---------- 8.1 Oxidation and reduction ---------- */

var ONCASES=[
    {q:"the oxidation number of Mn in KMnO\u2084",setup:"K is +1 and each O is -2. +1 + Mn + 4(-2) = 0, so Mn = +7",a:"+7",w:["+2","+5","+6"]},
    {q:"the oxidation number of Cr in K\u2082Cr\u2082O\u2087",setup:"Each K is +1 and each O is -2. 2(+1) + 2Cr + 7(-2) = 0, so 2Cr = +12 and Cr = +6",a:"+6",w:["+3","+7","+12"]},
    {q:"the oxidation number of S in H\u2082SO\u2084",setup:"Each H is +1 and each O is -2. 2(+1) + S + 4(-2) = 0, so S = +6",a:"+6",w:["+4","+2","-2"]},
    {q:"the oxidation number of N in NH\u2084\u207A",setup:"Each H is +1 and the ion's charge is +1. N + 4(+1) = +1, so N = -3",a:"-3",w:["+3","-1","+5"]},
    {q:"the oxidation number of N in NO\u2083\u207B",setup:"Each O is -2 and the ion's charge is -1. N + 3(-2) = -1, so N = +5",a:"+5",w:["+3","-3","+1"]},
    {q:"the oxidation number of Cl in HClO",setup:"H is +1 and O is -2. +1 + Cl - 2 = 0, so Cl = +1",a:"+1",w:["-1","+3","+5"]},
    {q:"the oxidation number of Fe in Fe\u2082O\u2083",setup:"Each O is -2. 2Fe + 3(-2) = 0, so Fe = +3",a:"+3",w:["+2","-3","+6"]},
    {q:"the oxidation number of C in CO\u2082",setup:"Each O is -2. C + 2(-2) = 0, so C = +4",a:"+4",w:["+2","-4","0"]},
    {q:"the oxidation number of P in H\u2083PO\u2084",setup:"Each H is +1 and each O is -2. 3(+1) + P + 4(-2) = 0, so P = +5",a:"+5",w:["+3","-3","+1"]},
    {q:"the oxidation number of S in SO\u2083\u00B2\u207B",setup:"Each O is -2 and the ion's charge is -2. S + 3(-2) = -2, so S = +4",a:"+4",w:["+6","+2","-2"]},
    {q:"the oxidation number of Mn in MnO\u2082",setup:"Each O is -2. Mn + 2(-2) = 0, so Mn = +4",a:"+4",w:["+2","+7","-4"]},
    {q:"the oxidation number of Br in HBrO\u2083",setup:"H is +1 and each O is -2. +1 + Br + 3(-2) = 0, so Br = +5",a:"+5",w:["+3","+1","-1"]},
    {q:"the oxidation number of N in N\u2082O",setup:"O is -2. 2N - 2 = 0, so each N = +1",a:"+1",w:["+2","-1","+3"]},
    {q:"the oxidation number of Cr in Cr\u2082O\u2083",setup:"Each O is -2. 2Cr + 3(-2) = 0, so Cr = +3",a:"+3",w:["+6","+2","-3"]},
    {q:"the oxidation number of Cu in CuSO\u2084",setup:"The sulfate ion is -2 overall, so Cu balances it at +2",a:"+2",w:["+1","0","+4"]},
    {q:"the oxidation number of O in H\u2082O\u2082 (hydrogen peroxide)",setup:"Peroxides are the exception: O is -1 here (each H is +1 and 2(+1) + 2O = 0)",a:"-1",w:["-2","0","+1"]}
];
E("u4-81-oxidation-number",4,["8.1"],1,"var",varset(ONCASES.map(function(c){
  return function(){
    return mcq("Determine "+c.q+":",
      c.a,c.w,
      c.setup+". The oxidation number is <b>"+c.a+"</b>.",{});
  };
})));

E("u4-81-rules",4,["8.1"],1,"var",varset([
  function(){
    return mcq("The oxidation number of a free, uncombined element (such as Zn(s) or Cl\u2082(g)) is",
      "0",
      ["+1","-1","Equal to its group number in every case"],
      "By definition, atoms in an uncombined element have oxidation number 0: no electron transfer has occurred.",{});
  },
  function(){
    return mcq("In most of its compounds, oxygen has an oxidation number of -2. A common exception is",
      "Peroxides, such as H\u2082O\u2082, where oxygen is -1",
      ["Carbon dioxide, where oxygen is 0",
       "Water, where oxygen is +2",
       "Metal oxides, where oxygen is +1"],
      "In peroxides the O-O bond changes the assignment: each oxygen is -1. In ordinary oxides, water and carbon dioxide, oxygen stays at -2.",{});
  },
  function(){
    return mcq("The sum of the oxidation numbers in a neutral compound is",
      "Zero, always",
      ["Equal to the number of atoms in the formula",
       "Equal to the charge on the most electronegative atom",
       "Positive, because compounds are stable"],
      "Oxidation numbers are bookkeeping for electrons: in a neutral species the gains and losses balance exactly, so the sum is zero. In an ion, the sum equals the ion's charge.",{});
  },
  function(){
    return mcq("Hydrogen has an oxidation number of +1 in most compounds. In a metal hydride such as NaH, hydrogen is",
      "-1, because it takes an electron from the metal",
      ["+1, with no exceptions anywhere",
       "0, because hydrides are elements",
       "+2, because it bonds to a metal"],
      "With a less electronegative partner (a metal), hydrogen gains the electron and is assigned -1. The +1 rule applies when hydrogen is bonded to nonmetals.",{});
  }
]));

E("u4-81-identify-redox",4,["8.1"],2,"gen",function(){
  var rxns=[
    {eq:"Zn(s) + Cu\u00B2\u207A(aq) \u2192 Zn\u00B2\u207A(aq) + Cu(s)",ox:"Zn",red:"Cu\u00B2\u207A",pool:["Zn","Cu\u00B2\u207A","Zn\u00B2\u207A","Cu"]},
    {eq:"Mg(s) + 2 H\u207A(aq) \u2192 Mg\u00B2\u207A(aq) + H\u2082(g)",ox:"Mg",red:"H\u207A",pool:["Mg","H\u207A","Mg\u00B2\u207A","H\u2082"]},
    {eq:"2 Fe\u00B2\u207A(aq) + Cl\u2082(g) \u2192 2 Fe\u00B3\u207A(aq) + 2 Cl\u207B(aq)",ox:"Fe\u00B2\u207A",red:"Cl\u2082",pool:["Fe\u00B2\u207A","Cl\u2082","Fe\u00B3\u207A","Cl\u207B"]},
    {eq:"Cu(s) + 2 Ag\u207A(aq) \u2192 Cu\u00B2\u207A(aq) + 2 Ag(s)",ox:"Cu",red:"Ag\u207A",pool:["Cu","Ag\u207A","Cu\u00B2\u207A","Ag"]},
    {eq:"Fe\u2082O\u2083(s) + 3 CO(g) \u2192 2 Fe(s) + 3 CO\u2082(g)",ox:"CO",red:"Fe\u2082O\u2083",pool:["CO","Fe\u2082O\u2083","Fe","CO\u2082"]},
    {eq:"CH\u2084(g) + 2 O\u2082(g) \u2192 CO\u2082(g) + 2 H\u2082O(l)",ox:"CH\u2084",red:"O\u2082",pool:["CH\u2084","O\u2082","CO\u2082","H\u2082O"]}
  ];
  var r=pick(rxns);
  var ask=pick(["oxidized","reduced","oxidizing","reducing"]);
  var t=ri(15,35),vol=pick([100,250,500]);
  var ans,explain;
  if(ask==="oxidized"){ ans=r.ox; explain="Oxidation is loss of electrons (an increase in oxidation number)."; }
  if(ask==="reduced"){ ans=r.red; explain="Reduction is gain of electrons (a decrease in oxidation number)."; }
  if(ask==="oxidizing"){ ans=r.red; explain="The oxidizing agent is the species that gets reduced: it takes electrons from the other reactant."; }
  if(ask==="reducing"){ ans=r.ox; explain="The reducing agent is the species that gets oxidized: it gives electrons to the other reactant."; }
  var ds=r.pool.filter(function(x){return x!==ans;});
  var askText={"oxidized":"which species is oxidized","reduced":"which species is reduced","oxidizing":"which species is the oxidizing agent","reducing":"which species is the reducing agent"}[ask];
  return mcq("In the reaction "+r.eq+" (carried out at "+t+" \u00B0C, in "+vol+" mL of solution where a solution is involved), "+askText+"?",
    ans,ds,
    explain+" Tracking the electrons and oxidation numbers in this reaction gives <b>"+ans+"</b>.",{ask:ask});
});

E("u4-81-not-redox",4,["8.1"],2,"gen",function(){
  var sets=[
    {nr:"AgNO\u2083(aq) + NaCl(aq) \u2192 AgCl(s) + NaNO\u2083(aq)",r:["Zn(s) + CuSO\u2084(aq) \u2192 ZnSO\u2084(aq) + Cu(s)","Mg(s) + 2 HCl(aq) \u2192 MgCl\u2082(aq) + H\u2082(g)","C(s) + O\u2082(g) \u2192 CO\u2082(g)"]},
    {nr:"HCl(aq) + NaOH(aq) \u2192 NaCl(aq) + H\u2082O(l)",r:["2 Mg(s) + O\u2082(g) \u2192 2 MgO(s)","Fe(s) + Cu\u00B2\u207A(aq) \u2192 Fe\u00B2\u207A(aq) + Cu(s)","2 H\u2082O\u2082(aq) \u2192 2 H\u2082O(l) + O\u2082(g)"]},
    {nr:"CaCO\u2083(s) \u2192 CaO(s) + CO\u2082(g)",r:["CuO(s) + H\u2082(g) \u2192 Cu(s) + H\u2082O(g)","Cl\u2082(g) + 2 Br\u207B(aq) \u2192 2 Cl\u207B(aq) + Br\u2082(aq)","CH\u2084(g) + 2 O\u2082(g) \u2192 CO\u2082(g) + 2 H\u2082O(l)"]},
    {nr:"BaCl\u2082(aq) + Na\u2082SO\u2084(aq) \u2192 BaSO\u2084(s) + 2 NaCl(aq)",r:["Zn(s) + 2 H\u207A(aq) \u2192 Zn\u00B2\u207A(aq) + H\u2082(g)","2 Na(s) + Cl\u2082(g) \u2192 2 NaCl(s)","Sn(s) + 2 Ag\u207A(aq) \u2192 Sn\u00B2\u207A(aq) + 2 Ag(s)"]}
  ];
  var s=pick(sets);
  var t=ri(15,95);
  return mcq("At "+t+" \u00B0C, which of the following reactions is NOT a redox reaction?",
    s.nr,s.r,
    "A redox reaction has changes in oxidation numbers. In the correct answer, every element keeps the same oxidation number from reactants to products: it is an exchange (or simple decomposition) with no electron transfer. <b>The reaction that is NOT redox here</b>: "+s.nr+".",{});
});

E("u4-81-definition",4,["8.1"],1,"var",varset([
  function(){
    return mcq("Oxidation is best defined as",
      "The loss of electrons by a species, shown by an increase in its oxidation number",
      ["The gain of electrons by a species",
       "Any reaction with oxygen gas",
       "The loss of oxygen by a species in every case"],
      "The modern definition is electron transfer: oxidation is loss of electrons, and the oxidation number rises. Reduction is the matching gain of electrons.",{});
  },
  function(){
    return mcq("A species that is reduced in a reaction",
      "Gains electrons, and its oxidation number decreases",
      ["Loses electrons, and its oxidation number increases",
       "Gains oxygen atoms in every case",
       "Is always a metal"],
      "Reduction is gain of electrons. With more electrons counted on the species, its oxidation number goes down, which is why it is called a reduction.",{});
  },
  function(){
    return mcq("The phrases OIL RIG and LEO the lion summarize redox by stating that",
      "Oxidation Is Loss (of electrons) and Reduction Is Gain; Loss of Electrons is Oxidation",
      ["Oxidation Involves Light and Reduction Involves Gas",
       "Oxygen Is Lost in every Reduction In General",
       "Oxidation Is Limited to Reactions Involving Gases"],
      "OIL RIG: Oxidation Is Loss, Reduction Is Gain (of electrons). LEO: Loss of Electrons = Oxidation. Both mnemonics track the electrons, which is the reliable definition.",{});
  }
]));

/* ---------- 8.2 Half-reactions ---------- */

E("u4-82-concept",4,["8.2"],1,"var",varset([
  function(){
    return mcq("A half-reaction is",
      "An equation that shows only the oxidation or only the reduction part of a redox reaction, with the electrons written explicitly",
      ["An equation for a reaction that only goes halfway to completion",
       "The first half of any chemical equation",
       "An equation written with half-size coefficients"],
      "Splitting a redox reaction into its oxidation and reduction half-reactions shows exactly where the electrons leave and arrive. Each half-reaction must balance in both atoms and charge.",{});
  },
  function(){
    return mcq("In an oxidation half-reaction, the electrons appear",
      "As products, on the right side of the equation",
      ["As reactants, on the left side of the equation",
       "On both sides, cancelling out",
       "Nowhere: electrons are only in reduction half-reactions"],
      "Oxidation is loss of electrons, so the species gives electrons away: they are written as products. Reduction half-reactions show them as reactants.",{});
  },
  function(){
    return mcq("When the oxidation and reduction half-reactions are combined into the overall redox equation, the electrons",
      "Cancel completely, because the electrons lost in oxidation equal the electrons gained in reduction",
      ["Appear as a product, since some are always left over",
       "Are doubled, because both half-reactions contain them",
       "Determine the states of the products"],
      "Electrons are transferred, not created: the number given up must equal the number taken. Half-reactions are scaled so the electron counts match, and then the electrons cancel from the overall equation.",{});
  }
]));

E("u4-82-split-equation",4,["8.2"],2,"gen",function(){
  var rxns=[
    {full:"Zn(s) + Cu\u00B2\u207A(aq) \u2192 Zn\u00B2\u207A(aq) + Cu(s)",ox:"Zn(s) \u2192 Zn\u00B2\u207A(aq) + 2 e\u207B",red:"Cu\u00B2\u207A(aq) + 2 e\u207B \u2192 Cu(s)",wox:"Zn(s) + 2 e\u207B \u2192 Zn\u00B2\u207A(aq)",wred:"Cu\u00B2\u207A(aq) \u2192 Cu(s) + 2 e\u207B"},
    {full:"Mg(s) + 2 H\u207A(aq) \u2192 Mg\u00B2\u207A(aq) + H\u2082(g)",ox:"Mg(s) \u2192 Mg\u00B2\u207A(aq) + 2 e\u207B",red:"2 H\u207A(aq) + 2 e\u207B \u2192 H\u2082(g)",wox:"Mg(s) + 2 e\u207B \u2192 Mg\u00B2\u207A(aq)",wred:"2 H\u207A(aq) \u2192 H\u2082(g) + 2 e\u207B"},
    {full:"Cu(s) + 2 Ag\u207A(aq) \u2192 Cu\u00B2\u207A(aq) + 2 Ag(s)",ox:"Cu(s) \u2192 Cu\u00B2\u207A(aq) + 2 e\u207B",red:"Ag\u207A(aq) + e\u207B \u2192 Ag(s)",wox:"Cu(s) + 2 e\u207B \u2192 Cu\u00B2\u207A(aq)",wred:"Ag\u207A(aq) \u2192 Ag(s) + e\u207B"},
    {full:"Fe(s) + Cu\u00B2\u207A(aq) \u2192 Fe\u00B2\u207A(aq) + Cu(s)",ox:"Fe(s) \u2192 Fe\u00B2\u207A(aq) + 2 e\u207B",red:"Cu\u00B2\u207A(aq) + 2 e\u207B \u2192 Cu(s)",wox:"Fe(s) + 2 e\u207B \u2192 Fe\u00B2\u207A(aq)",wred:"Cu\u00B2\u207A(aq) \u2192 Cu(s) + 2 e\u207B"},
    {full:"2 Al(s) + 3 Cu\u00B2\u207A(aq) \u2192 2 Al\u00B3\u207A(aq) + 3 Cu(s)",ox:"Al(s) \u2192 Al\u00B3\u207A(aq) + 3 e\u207B",red:"Cu\u00B2\u207A(aq) + 2 e\u207B \u2192 Cu(s)",wox:"Al(s) + 3 e\u207B \u2192 Al\u00B3\u207A(aq)",wred:"Cu\u00B2\u207A(aq) \u2192 Cu(s) + 2 e\u207B"}
  ];
  var r=pick(rxns);
  var oxAsk=Math.random()<0.5;
  var vol=pick([50,100,200,250,500]),t=ri(15,35);
  var correct=oxAsk?r.ox:r.red;
  var wrong=oxAsk?r.wox:r.wred;
  var other=oxAsk?r.red:r.ox;
  return mcq("For the redox reaction "+r.full+" (in a "+vol+" mL vessel at "+t+" \u00B0C), which equation is the "+(oxAsk?"oxidation":"reduction")+" half-reaction?",
    correct,[wrong,other,"The complete reaction with electrons added to both sides"],
    "Oxidation half-reactions have electrons as products; reduction half-reactions have them as reactants. Here the "+(oxAsk?"oxidation":"reduction")+" half-reaction is <b>"+correct+"</b>.",{});
});

var ECCASES=[
    {half:"Fe\u00B2\u207A + 2 e\u207B \u2192 Fe",e:2,sub:"Fe\u00B2\u207A"},
    {half:"Al \u2192 Al\u00B3\u207A + 3 e\u207B",e:3,sub:"Al"},
    {half:"2 Cl\u207B \u2192 Cl\u2082 + 2 e\u207B",e:2,sub:"Cl\u207B (per Cl\u2082 formed)"},
    {half:"MnO\u2084\u207B + 8 H\u207A + 5 e\u207B \u2192 Mn\u00B2\u207A + 4 H\u2082O",e:5,sub:"MnO\u2084\u207B"},
    {half:"Cu\u00B2\u207A + 2 e\u207B \u2192 Cu",e:2,sub:"Cu\u00B2\u207A"},
    {half:"Mg \u2192 Mg\u00B2\u207A + 2 e\u207B",e:2,sub:"Mg"},
    {half:"Cr\u2082O\u2087\u00B2\u207B + 14 H\u207A + 6 e\u207B \u2192 2 Cr\u00B3\u207A + 7 H\u2082O",e:6,sub:"Cr\u2082O\u2087\u00B2\u207B"},
    {half:"O\u2082 + 4 H\u207A + 4 e\u207B \u2192 2 H\u2082O",e:4,sub:"O\u2082"}
];
E("u4-82-electron-count",4,["8.2"],2,"var",varset(ECCASES.map(function(c){
  return function(){
    var cands=[Math.max(1,c.e-1),c.e+1,c.e+2,c.e*2,Math.round(c.e*1.5),c.e+3].filter(function(x,i,arr){return x!==c.e&&x>0&&arr.indexOf(x)===i;});
    var ds=cands.slice(0,3);
    return mcq("In the half-reaction "+c.half+", the number of electrons transferred per "+c.sub+" is",
      c.e+(c.e===1?" electron":" electrons"),
      ds.map(function(x){return x+(x===1?" electron":" electrons");}),
      "The electrons appear explicitly in the balanced half-reaction: <b>"+c.e+" electrons</b> for "+c.sub+".",{});
  };
})));

/* ---------- 8.3 Balancing redox equations ---------- */

var HALFWRITE=[
  {ask:"the oxidation half-reaction when zinc metal reacts to form zinc ions",ctx:"Zn(s) \u2192 Zn\u00B2\u207A(aq)",
   ans:["Zn \u2192 Zn\u00B2\u207A + 2 e\u207B","Zn -> Zn2+ + 2 e-","Zn(s) \u2192 Zn\u00B2\u207A(aq) + 2 e\u207B","Zn(s) -> Zn2+(aq) + 2 e-","Zn \u2192 Zn\u00B2\u207A + 2e\u207B","Zn -> Zn2+ + 2e-"],
   show:"Zn(s) \u2192 Zn\u00B2\u207A(aq) + 2 e\u207B"},
  {ask:"the reduction half-reaction when copper(II) ions plate out as copper metal",ctx:"Cu\u00B2\u207A(aq) \u2192 Cu(s)",
   ans:["Cu\u00B2\u207A + 2 e\u207B \u2192 Cu","Cu2+ + 2 e- -> Cu","Cu\u00B2\u207A(aq) + 2 e\u207B \u2192 Cu(s)","Cu2+(aq) + 2 e- -> Cu(s)","Cu\u00B2\u207A + 2e\u207B \u2192 Cu","Cu2+ + 2e- -> Cu"],
   show:"Cu\u00B2\u207A(aq) + 2 e\u207B \u2192 Cu(s)"},
  {ask:"the oxidation half-reaction when chloride ions form chlorine gas",ctx:"Cl\u207B(aq) \u2192 Cl\u2082(g)",
   ans:["2 Cl\u207B \u2192 Cl\u2082 + 2 e\u207B","2 Cl- -> Cl2 + 2 e-","2 Cl\u207B(aq) \u2192 Cl\u2082(g) + 2 e\u207B","2 Cl-(aq) -> Cl2(g) + 2 e-","2 Cl\u207B \u2192 Cl\u2082 + 2e\u207B","2 Cl- -> Cl2 + 2e-"],
   show:"2 Cl\u207B(aq) \u2192 Cl\u2082(g) + 2 e\u207B"},
  {ask:"the oxidation half-reaction when iron(II) ions are converted to iron(III) ions",ctx:"Fe\u00B2\u207A(aq) \u2192 Fe\u00B3\u207A(aq)",
   ans:["Fe\u00B2\u207A \u2192 Fe\u00B3\u207A + e\u207B","Fe2+ -> Fe3+ + e-","Fe\u00B2\u207A(aq) \u2192 Fe\u00B3\u207A(aq) + e\u207B","Fe2+(aq) -> Fe3+(aq) + e-","Fe\u00B2\u207A \u2192 Fe\u00B3\u207A + 1 e\u207B","Fe2+ -> Fe3+ + 1 e-"],
   show:"Fe\u00B2\u207A(aq) \u2192 Fe\u00B3\u207A(aq) + e\u207B"},
  {ask:"the reduction half-reaction when silver ions plate out as silver metal",ctx:"Ag\u207A(aq) \u2192 Ag(s)",
   ans:["Ag\u207A + e\u207B \u2192 Ag","Ag+ + e- -> Ag","Ag\u207A(aq) + e\u207B \u2192 Ag(s)","Ag+(aq) + e- -> Ag(s)","Ag\u207A + 1 e\u207B \u2192 Ag","Ag+ + 1 e- -> Ag"],
   show:"Ag\u207A(aq) + e\u207B \u2192 Ag(s)"},
  {ask:"the oxidation half-reaction when magnesium metal reacts to form magnesium ions",ctx:"Mg(s) \u2192 Mg\u00B2\u207A(aq)",
   ans:["Mg \u2192 Mg\u00B2\u207A + 2 e\u207B","Mg -> Mg2+ + 2 e-","Mg(s) \u2192 Mg\u00B2\u207A(aq) + 2 e\u207B","Mg(s) -> Mg2+(aq) + 2 e-","Mg \u2192 Mg\u00B2\u207A + 2e\u207B","Mg -> Mg2+ + 2e-"],
   show:"Mg(s) \u2192 Mg\u00B2\u207A(aq) + 2 e\u207B"}
];
E("u4-83-half-reaction-write",4,["8.3"],2,"var",varset(HALFWRITE.map(function(c){return function(){
  return textq("Write "+c.ask+": "+c.ctx+". Type the half-reaction using \u2192 or -> and e\u207B or e- for electrons.",
    c.ans,
    "Balance the atoms first, then add electrons to the correct side to balance the charge: electrons are products in oxidation and reactants in reduction. The half-reaction is <b>"+c.show+"</b>.",{});
};})));

var BALACID=[
  {skel:"MnO\u2084\u207B(aq) \u2192 Mn\u00B2\u207A(aq)",
   ans:["MnO\u2084\u207B + 8 H\u207A + 5 e\u207B \u2192 Mn\u00B2\u207A + 4 H\u2082O","MnO4- + 8 H+ + 5 e- -> Mn2+ + 4 H2O","MnO\u2084\u207B(aq) + 8 H\u207A(aq) + 5 e\u207B \u2192 Mn\u00B2\u207A(aq) + 4 H\u2082O(l)","MnO4-(aq) + 8 H+(aq) + 5 e- -> Mn2+(aq) + 4 H2O(l)","MnO\u2084\u207B + 8 H\u207A + 5e\u207B \u2192 Mn\u00B2\u207A + 4 H\u2082O","MnO4- + 8 H+ + 5e- -> Mn2+ + 4 H2O"],
   show:"MnO\u2084\u207B(aq) + 8 H\u207A(aq) + 5 e\u207B \u2192 Mn\u00B2\u207A(aq) + 4 H\u2082O(l)",steps:"Balance O with 4 H\u2082O on the right, then H with 8 H\u207A on the left, then charge: the left totals +7 before electrons and the right is +2, so 5 e\u207B are added to the left."},
  {skel:"Cr\u2082O\u2087\u00B2\u207B(aq) \u2192 Cr\u00B3\u207A(aq)",
   ans:["Cr\u2082O\u2087\u00B2\u207B + 14 H\u207A + 6 e\u207B \u2192 2 Cr\u00B3\u207A + 7 H\u2082O","Cr2O7^2- + 14 H+ + 6 e- -> 2 Cr3+ + 7 H2O","Cr\u2082O\u2087\u00B2\u207B(aq) + 14 H\u207A(aq) + 6 e\u207B \u2192 2 Cr\u00B3\u207A(aq) + 7 H\u2082O(l)","Cr2O72- + 14 H+ + 6 e- -> 2 Cr3+ + 7 H2O","Cr\u2082O\u2087\u00B2\u207B + 14 H\u207A + 6e\u207B \u2192 2 Cr\u00B3\u207A + 7 H\u2082O","Cr2O7^2- + 14 H+ + 6e- -> 2 Cr3+ + 7 H2O"],
   show:"Cr\u2082O\u2087\u00B2\u207B(aq) + 14 H\u207A(aq) + 6 e\u207B \u2192 2 Cr\u00B3\u207A(aq) + 7 H\u2082O(l)",steps:"Balance Cr (2 on the right), then O with 7 H\u2082O, then H with 14 H\u207A, then charge: left is +12 before electrons and right is +6, so 6 e\u207B go on the left."},
  {skel:"NO\u2083\u207B(aq) \u2192 NO(g)",
   ans:["NO\u2083\u207B + 4 H\u207A + 3 e\u207B \u2192 NO + 2 H\u2082O","NO3- + 4 H+ + 3 e- -> NO + 2 H2O","NO\u2083\u207B(aq) + 4 H\u207A(aq) + 3 e\u207B \u2192 NO(g) + 2 H\u2082O(l)","NO3-(aq) + 4 H+(aq) + 3 e- -> NO(g) + 2 H2O(l)","NO\u2083\u207B + 4 H\u207A + 3e\u207B \u2192 NO + 2 H\u2082O","NO3- + 4 H+ + 3e- -> NO + 2 H2O"],
   show:"NO\u2083\u207B(aq) + 4 H\u207A(aq) + 3 e\u207B \u2192 NO(g) + 2 H\u2082O(l)",steps:"Balance O with 2 H\u2082O on the right, then H with 4 H\u207A on the left, then charge: left is +3 before electrons and right is 0, so 3 e\u207B go on the left."},
  {skel:"ClO\u207B(aq) \u2192 Cl\u207B(aq)",
   ans:["ClO\u207B + 2 H\u207A + 2 e\u207B \u2192 Cl\u207B + H\u2082O","ClO- + 2 H+ + 2 e- -> Cl- + H2O","ClO\u207B(aq) + 2 H\u207A(aq) + 2 e\u207B \u2192 Cl\u207B(aq) + H\u2082O(l)","ClO-(aq) + 2 H+(aq) + 2 e- -> Cl-(aq) + H2O(l)","ClO\u207B + 2 H\u207A + 2e\u207B \u2192 Cl\u207B + H\u2082O","ClO- + 2 H+ + 2e- -> Cl- + H2O"],
   show:"ClO\u207B(aq) + 2 H\u207A(aq) + 2 e\u207B \u2192 Cl\u207B(aq) + H\u2082O(l)",steps:"Balance O with 1 H\u2082O on the right, then H with 2 H\u207A on the left, then charge: left is +1 before electrons and right is -1, so 2 e\u207B go on the left."},
  {skel:"H\u2082O\u2082(aq) \u2192 H\u2082O(l)",
   ans:["H\u2082O\u2082 + 2 H\u207A + 2 e\u207B \u2192 2 H\u2082O","H2O2 + 2 H+ + 2 e- -> 2 H2O","H\u2082O\u2082(aq) + 2 H\u207A(aq) + 2 e\u207B \u2192 2 H\u2082O(l)","H2O2(aq) + 2 H+(aq) + 2 e- -> 2 H2O(l)","H\u2082O\u2082 + 2 H\u207A + 2e\u207B \u2192 2 H\u2082O","H2O2 + 2 H+ + 2e- -> 2 H2O"],
   show:"H\u2082O\u2082(aq) + 2 H\u207A(aq) + 2 e\u207B \u2192 2 H\u2082O(l)",steps:"Balance O by writing 2 H\u2082O on the right, then H with 2 H\u207A on the left, then charge: left is +2 before electrons and right is 0, so 2 e\u207B go on the left."}
];
E("u4-83-balance-acidic",4,["8.3"],3,"var",varset(BALACID.map(function(c){return function(){
  return textq("Balance this half-reaction in acidic solution: "+c.skel+". Type the balanced half-reaction using \u2192 or -> and e\u207B or e- for electrons.",
    c.ans,
    "Work in order: balance atoms other than O and H, balance O with H\u2082O, balance H with H\u207A, then balance charge with electrons. "+c.steps+" The balanced half-reaction is <b>"+c.show+"</b>.",{});
};})));

E("u4-83-net-reaction",4,["8.3"],3,"gen",function(){
  var cells=[
    {desc:"zinc metal with copper(II) ions",eq:"Zn(s) + Cu\u00B2\u207A(aq) \u2192 Zn\u00B2\u207A(aq) + Cu(s)",E:"1.10",w:["Zn(s) + Cu\u00B2\u207A(aq) \u2192 Zn\u00B2\u207A(aq) + Cu(s) + 2 e\u207B","Cu(s) + Zn\u00B2\u207A(aq) \u2192 Cu\u00B2\u207A(aq) + Zn(s)","2 Zn(s) + Cu\u00B2\u207A(aq) \u2192 2 Zn\u00B2\u207A(aq) + Cu(s)"]},
    {desc:"magnesium metal with silver ions",eq:"Mg(s) + 2 Ag\u207A(aq) \u2192 Mg\u00B2\u207A(aq) + 2 Ag(s)",E:"3.17",w:["Mg(s) + Ag\u207A(aq) \u2192 Mg\u00B2\u207A(aq) + Ag(s)","Mg(s) + 2 Ag\u207A(aq) \u2192 Mg\u207A(aq) + 2 Ag(s)","2 Ag(s) + Mg\u00B2\u207A(aq) \u2192 2 Ag\u207A(aq) + Mg(s)"]},
    {desc:"iron metal with copper(II) ions",eq:"Fe(s) + Cu\u00B2\u207A(aq) \u2192 Fe\u00B2\u207A(aq) + Cu(s)",E:"0.78",w:["Fe(s) + Cu\u00B2\u207A(aq) \u2192 Fe\u00B3\u207A(aq) + Cu(s)","Cu(s) + Fe\u00B2\u207A(aq) \u2192 Cu\u00B2\u207A(aq) + Fe(s)","2 Fe(s) + Cu\u00B2\u207A(aq) \u2192 2 Fe\u00B2\u207A(aq) + Cu(s)"]},
    {desc:"zinc metal with hydrogen ions (an acid)",eq:"Zn(s) + 2 H\u207A(aq) \u2192 Zn\u00B2\u207A(aq) + H\u2082(g)",E:"0.76",w:["Zn(s) + H\u207A(aq) \u2192 Zn\u00B2\u207A(aq) + H\u2082(g)","Zn\u00B2\u207A(aq) + H\u2082(g) \u2192 Zn(s) + 2 H\u207A(aq)","2 Zn(s) + 2 H\u207A(aq) \u2192 2 Zn\u00B2\u207A(aq) + H\u2082(g)"]},
    {desc:"copper metal with silver ions",eq:"Cu(s) + 2 Ag\u207A(aq) \u2192 Cu\u00B2\u207A(aq) + 2 Ag(s)",E:"0.46",w:["Cu(s) + Ag\u207A(aq) \u2192 Cu\u00B2\u207A(aq) + Ag(s)","Cu(s) + 2 Ag\u207A(aq) \u2192 Cu\u207A(aq) + 2 Ag(s)","2 Ag(s) + Cu\u00B2\u207A(aq) \u2192 2 Ag\u207A(aq) + Cu(s)"]},
    {desc:"aluminium metal with copper(II) ions",eq:"2 Al(s) + 3 Cu\u00B2\u207A(aq) \u2192 2 Al\u00B3\u207A(aq) + 3 Cu(s)",E:"2.00",w:["Al(s) + Cu\u00B2\u207A(aq) \u2192 Al\u00B3\u207A(aq) + Cu(s)","2 Al(s) + 3 Cu\u00B2\u207A(aq) \u2192 2 Al\u00B2\u207A(aq) + 3 Cu(s)","3 Cu(s) + 2 Al\u00B3\u207A(aq) \u2192 3 Cu\u00B2\u207A(aq) + 2 Al(s)"]}
  ];
  var c=pick(cells);
  var ctx=pick(["in a galvanic cell at 25 \u00B0C","in a beaker, as a displacement reaction","in an electrochemical cell with 1.00 mol/L solutions","in a galvanic cell demonstrated to a class","as a single-replacement reaction in a test tube","in a two-beaker cell joined by a salt bridge","in a galvanic cell powering a small motor","as a displacement reaction observed in the lab","in a cell built for a science fair demonstration"]);
  var withE=Math.random()<0.5;
  if(withE){
    return mcq("A cell is built from "+c.desc+" "+ctx+". Which overall equation and standard cell potential are correct?",
      c.eq+", E\u00B0cell = +"+c.E+" V",
      c.w.map(function(x){return x+", E\u00B0cell = +"+c.E+" V";}).concat([]).slice(0,2).concat([c.eq+", E\u00B0cell = -"+c.E+" V"]),
      "Balance the half-reactions so the electrons cancel (scaling a half-reaction does not change its E\u00B0), and take E\u00B0cell = E\u00B0(cathode) - E\u00B0(anode), which is positive for a spontaneous cell. <b>"+c.eq+", E\u00B0cell = +"+c.E+" V</b>.",{});
  }
  return mcq("A cell is built from "+c.desc+" "+ctx+". Which overall equation is correct?",
    c.eq,c.w,
    "Write the two half-reactions, scale them so the electrons lost equal the electrons gained, and add. The electrons cancel and the result is <b>"+c.eq+"</b>. Watch for distractors that keep electrons in the overall equation or leave the electron counts unbalanced.",{});
});

var IDHCASES=[
    {half:"Zn(s) \u2192 Zn\u00B2\u207A(aq) + 2 e\u207B",a:"The oxidation half-reaction",w:["The reduction half-reaction","Neither: it is a precipitation","Neither: no electrons are involved"]},
    {half:"Ag\u207A(aq) + e\u207B \u2192 Ag(s)",a:"The reduction half-reaction",w:["The oxidation half-reaction","Neither: it is a neutralization","Neither: no electrons are involved"]},
    {half:"2 H\u2082O(l) \u2192 O\u2082(g) + 4 H\u207A(aq) + 4 e\u207B",a:"The oxidation half-reaction",w:["The reduction half-reaction","Neither: it is a combustion only","Neither: it is an acid-base reaction"]},
    {half:"Fe\u00B3\u207A(aq) + e\u207B \u2192 Fe\u00B2\u207A(aq)",a:"The reduction half-reaction",w:["The oxidation half-reaction","Neither: charges are not balanced","Neither: it is a decomposition only"]}
];
E("u4-83-identify-half",4,["8.3"],2,"var",varset(IDHCASES.map(function(c){
  return function(){
    return mcq("The half-reaction "+c.half+" is",
      c.a,c.w,
      "Electrons as products mean oxidation (loss); electrons as reactants mean reduction (gain). <b>"+c.a+"</b>.",{});
  };
})));

var BSCASES=[
    {q:"In the standard method for balancing a redox half-reaction in acidic solution, after balancing the atoms other than O and H, the next step is to",
     a:"Balance the oxygen atoms by adding H\u2082O to the side that needs oxygen",
     w:["Balance the charge by adding electrons","Balance the hydrogen atoms by adding H\u207A","Convert the solution to basic conditions"]},
    {q:"In acidic solution, hydrogen atoms in a half-reaction are balanced by",
     a:"Adding H\u207A ions to the side short of hydrogen",
     w:["Adding H\u2082 gas to the side short of hydrogen","Adding OH\u207B ions to the side short of hydrogen","Removing O atoms"]},
    {q:"The final step in balancing any half-reaction is to",
     a:"Balance the charge by adding electrons to the more positive side",
     w:["Balance the charge by adding H\u207A to the more positive side","Cancel any water molecules on both sides","Check that the electrons appear as products"]},
    {q:"Combining two balanced half-reactions into the overall equation requires first",
     a:"Multiplying one or both half-reactions so the electrons lost equal the electrons gained, then cancelling the electrons",
     w:["Adding the two E\u00B0 values together","Removing all the electrons and H\u207A ions","Converting both to basic conditions"]}
];
E("u4-83-balance-steps",4,["8.3"],2,"var",varset(BSCASES.map(function(c){
  return function(){
    return mcq(c.q,
      c.a,c.w,
      "The order is: balance atoms except O and H, balance O with H\u2082O, balance H with H\u207A, then balance charge with electrons. <b>"+c.a+"</b>.",{});
  };
})));

var BASICCASES=[
    {h:"MnO\u2084\u207B(aq) \u2192 MnO\u2082(s)",acid:"MnO\u2084\u207B + 4 H\u207A + 3 e\u207B \u2192 MnO\u2082 + 2 H\u2082O",base:"MnO\u2084\u207B + 2 H\u2082O + 3 e\u207B \u2192 MnO\u2082 + 4 OH\u207B"},
    {h:"ClO\u207B(aq) \u2192 Cl\u207B(aq)",acid:"ClO\u207B + 2 H\u207A + 2 e\u207B \u2192 Cl\u207B + H\u2082O",base:"ClO\u207B + H\u2082O + 2 e\u207B \u2192 Cl\u207B + 2 OH\u207B"},
    {h:"NO\u2082\u207B(aq) \u2192 NH\u2083(g)",acid:"NO\u2082\u207B + 8 H\u207A + 6 e\u207B \u2192 NH\u2084\u207A + 2 H\u2082O",base:"NO\u2082\u207B + 5 H\u2082O + 6 e\u207B \u2192 NH\u2083 + 7 OH\u207B"}
];
E("u4-83-basic-solution",4,["8.3"],3,"var",varset(BASICCASES.map(function(c){
  return function(){
    return mcq("The half-reaction "+c.h+" is balanced in acidic solution as "+c.acid+". Converted to BASIC solution, the correctly balanced half-reaction is",
      c.base,
      [c.acid,"Add H\u207A to both sides until the OH\u207B is removed","Subtract OH\u207B from both sides of the acid-balanced equation"],
      "Add the same number of OH\u207B to both sides as there are H\u207A: each H\u207A + OH\u207B becomes H\u2082O, then cancel any water appearing on both sides. For this half-reaction the result is <b>"+c.base+"</b>.",{});
  };
})));

/* ---------- 8.4 Galvanic cells ---------- */

E("u4-84-label-parts",4,["8.4"],1,"var",varset([
  function(){
    var q=mcq("In a galvanic (voltaic) cell, oxidation takes place at the",
      "Anode, which is the negative electrode",
      ["Cathode, which is the positive electrode",
       "Salt bridge, which connects the solutions",
       "Anode, which is the positive electrode"],
      "An Ox and Red Cat: oxidation happens at the anode, reduction at the cathode. In a galvanic cell the anode is the negative terminal because it supplies the electrons.",{}); q.figure=c32cellSVG("Electrode","Ion solution","Electrode","Ion solution","Salt bridge"); return q;
  },
  function(){
    var q=mcq("In a galvanic cell, the cathode is where",
      "Reduction takes place: ions from the solution gain electrons and are deposited or converted",
      ["Oxidation takes place: the metal dissolves as ions",
       "The salt bridge releases its ions",
       "Electrons are produced and stored"],
      "Red Cat: reduction at the cathode. In a galvanic cell the cathode is the positive electrode, and positive ions move toward it through the solution.",{}); q.figure=c32cellSVG("Electrode","Ion solution","Electrode","Ion solution","Salt bridge"); return q;
  },
  function(){
    var q=mcq("In a galvanic cell, electrons travel through the external wire",
      "From the anode to the cathode",
      ["From the cathode to the anode",
       "In both directions equally, so there is no net current",
       "From the salt bridge into both electrodes"],
      "Oxidation at the anode releases electrons, which flow through the wire to the cathode, where reduction consumes them. Anode to cathode, always, in the external circuit.",{}); q.figure=c32cellSVG("Electrode","Ion solution","Electrode","Ion solution","Salt bridge"); return q;
  },
  function(){
    var q=mcq("The half-cells of a galvanic cell are connected by a salt bridge in order to",
      "Complete the electrical circuit by letting ions move, keeping both solutions electrically neutral",
      ["Let electrons flow between the two solutions",
       "Mix the two solutions slowly so they can react",
       "Hold the electrodes at a fixed distance apart"],
      "Electrons travel through the wire; ions travel through the salt bridge. Without it, charge would build up in each half-cell and the cell would stop almost immediately.",{}); q.figure=c32cellSVG("Electrode","Ion solution","Electrode","Ion solution","Salt bridge"); return q;
  }
]));

E("u4-84-label-scenario",4,["8.4"],2,"gen",function(){
  var pairs=[["Zn","Cu"],["Mg","Cu"],["Fe","Cu"],["Zn","Ag"],["Mg","Zn"],["Fe","Zn"],["Ni","Cu"],["Pb","Cu"]];
  var pr=pick(pairs);
  var map={}; ECOUPLES.forEach(function(c){map[c.metal]=c;});
  var A=map[pr[0]],B=map[pr[1]];
  var anode=A.e<B.e?A:B, cathode=A.e<B.e?B:A;
  var salt=pick(["potassium nitrate","sodium chloride","potassium chloride"]);
  var conc=pick([0.100,0.500,1.00]);
  var q=mcq("A galvanic cell is built with a "+A.metal+" electrode in a "+gF(conc)+" mol/L solution of its ions and a "+B.metal+" electrode in a "+gF(conc)+" mol/L solution of its ions, joined by a salt bridge containing "+salt+". Using the reduction potentials in the Reference Information, which statement is correct?",
    "The "+anode.metal+" electrode is the anode: it is oxidized, loses mass, and electrons flow from it to the "+cathode.metal+" electrode",
    ["The "+cathode.metal+" electrode is the anode: it is oxidized, loses mass, and electrons flow from it to the "+anode.metal+" electrode",
     "The "+anode.metal+" electrode is the cathode: it gains mass as its ions are deposited on it",
     "Electrons flow through the salt bridge from the "+anode.metal+" electrode to the "+cathode.metal+" electrode"],
    "The metal with the lower (more negative) E\u00B0 is oxidized: that is "+anode.metal+" ("+eF(anode.e)+" V) versus "+cathode.metal+" ("+eF(cathode.e)+" V). Oxidation happens at the anode, which loses mass as it dissolves, and electrons flow from anode to cathode through the wire, never through the salt bridge. <b>The "+anode.metal+" electrode is the anode</b>.",{});
    q.figure=c32cellSVG(A.metal+" electrode",A.ion+"(aq) solution",B.metal+" electrode",B.ion+"(aq) solution","Salt bridge ("+salt+")");
    return q;
});

E("u4-84-electron-flow",4,["8.4"],1,"gen",function(){
  var v=pick([
    {q:"Through the salt bridge of a working galvanic cell, positive ions (cations) move toward",a:"The cathode compartment, where reduction is consuming positive ions",w:["The anode compartment, where oxidation is producing electrons","The negative terminal of the voltmeter","Neither compartment: ions do not move in a salt bridge"]},
    {q:"As a galvanic cell runs, the anode electrode gradually",a:"Loses mass, because its atoms are oxidized to ions that enter the solution",w:["Gains mass, because ions plate onto it","Keeps exactly the same mass, because only electrons move","Gains mass, because electrons accumulate on it"]},
    {q:"As a galvanic cell runs, the cathode electrode gradually",a:"Gains mass, because ions from the solution are reduced and deposited on it",w:["Loses mass, because it is being oxidized","Keeps exactly the same mass, because reduction adds nothing","Loses mass, because it supplies the electrons"]},
    {q:"If the salt bridge is removed from a working galvanic cell, the cell",a:"Stops working almost at once, because charge builds up in the half-cells and breaks the circuit",w:["Works better, because the solutions stay purer","Keeps working, because the wire alone completes the circuit","Reverses direction and becomes a battery charger"]}
  ]);
  var t=ri(15,35);
  var q=mcq("A galvanic cell operates at "+t+" \u00B0C. "+v.q+":",
    v.a,v.w,
    "<b>"+v.a+"</b>.",{t:t});
  q.figure=c32cellSVG("Electrode","Ion solution","Electrode","Ion solution","Salt bridge"); return q;
});

var SBCASES=[
    {q:"The electrolyte in a salt bridge is chosen to be an inert salt such as potassium nitrate because",a:"Its ions must not react with either half-cell solution; they only need to move to balance charge",w:["Its ions carry the electrons between the half-cells","It must react with the anode to keep the cell going","Its colour shows when the cell is finished"]},
    {q:"In the anode compartment of a running galvanic cell, positive ions are being produced. The solution stays neutral because",a:"Negative ions flow in from the salt bridge to balance the new positive charge",w:["Positive ions flow out through the wire","Electrons flow back through the salt bridge","The electrode absorbs the extra positive ions"]},
    {q:"A student replaces the salt bridge with a metal wire dipped into both solutions. The cell fails mainly because",a:"A wire cannot let ions move between the solutions, and it would also short the cell: the circuit for charge balance is not completed",w:["Metal wires cannot touch solutions without dissolving instantly","The wire is too good a conductor, so the voltage becomes too high","The solutions needed the salt for their colour"]}
];
E("u4-84-salt-bridge",4,["8.4"],2,"var",varset(SBCASES.map(function(v){
  return function(){
    var q=mcq(v.q+":",
      v.a,v.w,
      "<b>"+v.a+"</b>.",{}); q.figure=c32cellSVG("Electrode","Ion solution","Electrode","Ion solution","Salt bridge"); return q;
  };
})));

E("u4-84-build-cell",4,["8.4"],3,"gen",function(){
  var pairs=[["Zn","Cu"],["Mg","Cu"],["Fe","Cu"],["Zn","Ag"],["Mg","Zn"],["Fe","Zn"],["Ni","Cu"],["Pb","Ag"],["Al","Cu"],["Mg","Ag"]];
  var pr=pick(pairs);
  var map={}; ECOUPLES.forEach(function(c){map[c.metal]=c;});
  var A=map[pr[0]],B=map[pr[1]];
  var anode=A.e<B.e?A:B, cathode=A.e<B.e?B:A;
  var conc=pick([0.100,0.500,1.00]);
  var notation=anode.metal+"(s) | "+anode.ion+"(aq) || "+cathode.ion+"(aq) | "+cathode.metal+"(s)";
  var mode=pick(["parts","notation"]);
  if(mode==="parts"){
    var q=mcq("Using "+gF(conc)+" mol/L solutions and the reduction potentials in the Reference Information, a galvanic cell is built from "+A.metal+" and "+B.metal+" half-cells. Which description of the finished cell is correct?",
      "Anode: "+anode.metal+" (oxidation); cathode: "+cathode.metal+" (reduction); electrons flow from "+anode.metal+" to "+cathode.metal+" through the wire; the "+anode.metal+" electrode loses mass",
      ["Anode: "+cathode.metal+" (oxidation); cathode: "+anode.metal+" (reduction); electrons flow from "+cathode.metal+" to "+anode.metal+" through the wire; the "+cathode.metal+" electrode loses mass",
       "Anode: "+anode.metal+" (reduction); cathode: "+cathode.metal+" (oxidation); electrons flow through the salt bridge",
       "Anode: "+anode.metal+" (oxidation); cathode: "+cathode.metal+" (reduction); the "+cathode.metal+" electrode loses mass as it dissolves"],
      "The couple with the lower E\u00B0 supplies the anode: "+anode.metal+" ("+eF(anode.e)+" V) is oxidized and dissolves, while "+cathode.ion+" is reduced at the "+cathode.metal+" cathode ("+eF(cathode.e)+" V), which gains mass. Electrons flow anode to cathode through the wire. <b>Anode: "+anode.metal+"; cathode: "+cathode.metal+"</b>.",{mode:mode});
      q.figure=c32cellSVG(A.metal+" electrode",A.ion+"(aq) solution",B.metal+" electrode",B.ion+"(aq) solution","Salt bridge");
      return q;
  }
  var q=mcq("Using "+gF(conc)+" mol/L solutions and the reduction potentials in the Reference Information, a galvanic cell is built from "+A.metal+" and "+B.metal+" half-cells. Which cell notation is correct?",
    notation,
    [cathode.metal+"(s) | "+cathode.ion+"(aq) || "+anode.ion+"(aq) | "+anode.metal+"(s)",
     anode.metal+"(s) | "+cathode.ion+"(aq) || "+anode.ion+"(aq) | "+cathode.metal+"(s)",
     anode.ion+"(aq) | "+anode.metal+"(s) || "+cathode.metal+"(s) | "+cathode.ion+"(aq)"],
    "Cell notation lists the anode (oxidation) on the left and the cathode (reduction) on the right, with a single line for a phase boundary and a double line for the salt bridge. The anode is "+anode.metal+" (lower E\u00B0). <b>"+notation+"</b>.",{mode:mode});
    q.figure=c32cellSVG(A.metal+" electrode",A.ion+"(aq) solution",B.metal+" electrode",B.ion+"(aq) solution","Salt bridge");
    return q;
});

/* ---------- 8.5 Electrolytic cells ---------- */

E("u4-85-compare",4,["8.5"],2,"var",varset([
  function(){
    return mcq("Which statement correctly contrasts galvanic and electrolytic cells?",
      "A galvanic cell converts chemical energy to electrical energy using a spontaneous reaction; an electrolytic cell uses electrical energy to drive a nonspontaneous reaction",
      ["Both cell types use electrical energy to drive reactions",
       "An electrolytic cell converts chemical energy to electrical energy spontaneously",
       "A galvanic cell requires a power supply to keep running"],
      "The two are opposites in energy conversion. Galvanic: spontaneous chemistry makes electricity. Electrolytic: electricity forces chemistry that would not happen on its own.",{});
  },
  function(){
    return mcq("In an electrolytic cell, the anode is the positive electrode, while in a galvanic cell the anode is negative. The reason for the difference is that",
      "What defines the anode is oxidation, not the sign: the power supply pulls electrons from the electrolytic anode, making it positive, while the galvanic anode produces electrons, making it negative",
      ["The labels anode and cathode swap meaning between the two cell types",
       "Electrolytic cells do not really have an anode",
       "The sign of an electrode is decided by its size"],
      "Anode always means oxidation. The sign follows from how the cell works: a galvanic anode is the source of electrons (negative); a power supply drains electrons from an electrolytic anode (positive).",{});
  },
  function(){
    return mcq("A rechargeable battery is being recharged. During recharging it operates as",
      "An electrolytic cell, because electrical energy is being supplied to reverse the discharge reaction",
      ["A galvanic cell, because all batteries are always galvanic",
       "Neither, because charging is not an electrochemical process",
       "A galvanic cell, because the reaction is spontaneous"],
      "Discharge is galvanic (spontaneous, producing current). Charging drives the same reaction backwards with outside electrical energy, which is electrolysis.",{});
  },
  function(){
    return mcq("Which process is an application of an electrolytic cell?",
      "Electroplating a steel bumper with chromium",
      ["A flashlight battery lighting a bulb",
       "A hydrogen fuel cell powering a bus",
       "Rusting of an iron gate"],
      "Electroplating forces metal ions onto an object using a power supply: a nonspontaneous reduction driven by electricity. The others are spontaneous processes or galvanic devices.",{});
  }
]));

E("u4-85-features",4,["8.5"],1,"var",varset([
  function(){
    return mcq("An electrolytic cell requires which component that a galvanic cell does not?",
      "An external power supply (such as a DC source or battery) to drive the reaction",
      ["A salt bridge in every design",
       "Two different metals",
       "A voltmeter"],
      "Electrolysis is nonspontaneous: without a power supply pushing the electrons, the reaction does not occur. A galvanic cell is its own power supply.",{});
  },
  function(){
    return mcq("In an electrolytic cell, reduction takes place at the",
      "Cathode, which is connected to the negative terminal of the power supply",
      ["Anode, which is connected to the negative terminal",
       "Cathode, which is connected to the positive terminal",
       "Salt bridge, which stores the electrons"],
      "Red Cat holds in both cell types: reduction is always at the cathode. In electrolysis the supply's negative terminal feeds electrons to the cathode, making it negative.",{});
  },
  function(){
    return mcq("Which statement is true of every electrolytic cell?",
      "Electrical energy is converted into chemical energy, stored in the products of a nonspontaneous reaction",
      ["Chemical energy is converted into electrical energy",
       "The overall reaction has a positive standard cell potential",
       "The cell can run indefinitely with no energy input"],
      "Electrolysis stores energy in chemical form by forcing a nonspontaneous reaction (one whose cell potential as a galvanic cell would be negative). The energy books always balance: in from the supply, stored in the products.",{});
  }
]));

E("u4-85-molten-products",4,["8.5"],2,"gen",function(){
  var salts=[
    {name:"sodium chloride",cat:"Sodium metal forms at the cathode",an:"Chlorine gas forms at the anode",wc:["Chlorine gas forms at the cathode","Sodium metal forms at the anode","Hydrogen gas forms at the cathode"]},
    {name:"lead(II) bromide",cat:"Lead metal forms at the cathode",an:"Bromine forms at the anode",wc:["Bromine forms at the cathode","Lead metal forms at the anode","Oxygen gas forms at the cathode"]},
    {name:"magnesium chloride",cat:"Magnesium metal forms at the cathode",an:"Chlorine gas forms at the anode",wc:["Chlorine gas forms at the cathode","Magnesium metal forms at the anode","Hydrogen gas forms at the anode"]},
    {name:"calcium chloride",cat:"Calcium metal forms at the cathode",an:"Chlorine gas forms at the anode",wc:["Chlorine gas forms at the cathode","Calcium metal forms at the anode","Sodium metal forms at the cathode"]},
    {name:"aluminium oxide (with cryolite, in the Hall process)",cat:"Aluminium metal forms at the cathode",an:"Oxygen gas forms at the anode (which slowly burns away)",wc:["Oxygen gas forms at the cathode","Aluminium metal forms at the anode","Carbon dioxide forms at the cathode"]}
  ];
  var s=pick(salts);
  var cur=pick([2.00,4.00,5.00,10.0,25.0,50.0,100.0]);
  var mins=pick([30,60,120,240]);
  var askAnode=Math.random()<0.5;
  if(askAnode){
    var q=mcq("Molten "+s.name+" is electrolyzed with a current of "+gF(cur)+" A for "+mins+" minutes. What forms at the anode?",
      s.an,[s.cat,s.wc[0],s.wc[2]],
      "At the anode, oxidation: the negative ions give up electrons. For molten "+s.name+", <b>"+s.an.toLowerCase()+"</b>.",{cur:cur,mins:mins});
    q.figure=c32electroSVG(s.name);
    return q;
  }
  var q=mcq("Molten "+s.name+" is electrolyzed with a current of "+gF(cur)+" A for "+mins+" minutes. What forms at the cathode?",
    s.cat,[s.an,s.wc[0],s.wc[1]],
    "At the cathode, reduction: the positive metal ions gain electrons. For molten "+s.name+", <b>"+s.cat.toLowerCase()+"</b>.",{cur:cur,mins:mins});
  q.figure=c32electroSVG(s.name);
  return q;
});

E("u4-85-scenario-judgement",4,["8.5"],3,"var",varset([
  function(){
    var q=mcq("A jeweller connects a silver-plating bath to a DC power supply: the object to be plated is wired to the negative terminal and a silver bar to the positive terminal, both in a silver nitrate solution. Which judgement is correct?",
      "This is an electrolytic cell: the object is the cathode, where Ag\u207A is reduced and deposited, and the silver bar is the anode, where silver is oxidized to replace the ions used",
      ["This is a galvanic cell: the object is the anode, where silver is deposited by oxidation",
       "This is an electrolytic cell: the object is the anode, where Ag\u207A is reduced",
       "No cell is involved, because plating is a physical coating process"],
      "Plating is driven by the supply, so it is electrolysis. Reduction (deposition) happens at the cathode, which must be the object; the supply's negative terminal feeds it electrons. The silver anode dissolves to keep [Ag\u207A] steady. <b>Electrolytic; object = cathode; bar = anode</b>.",{});
    q.figure=c32plateSVG("Object to be plated","Silver bar","Silver nitrate solution","-","+");
    return q;
  },
  function(){
    return mcq("A fuel cell in a bus combines hydrogen and oxygen to produce water and electricity, and it runs a motor as long as fuel is supplied. Which judgement is correct?",
      "This is a galvanic cell: the reaction is spontaneous and converts chemical energy directly into electrical energy",
      ["This is an electrolytic cell: gases reacting always need a power supply",
       "This is neither: fuel cells are combustion engines",
       "This is an electrolytic cell while starting and galvanic after that"],
      "The hydrogen-oxygen reaction is spontaneous, and the cell harvests it as electricity rather than heat: the definition of a galvanic (voltaic) device. No external supply drives it. <b>Galvanic</b>.",{});
  },
  function(){
    return mcq("A car battery is first used to start the engine, then recharged by the alternator while driving. Which statement about the two phases is correct?",
      "Starting is galvanic (the battery supplies electrical energy); recharging is electrolytic (electrical energy is supplied to reverse the reaction)",
      ["Both phases are galvanic, because a battery is a galvanic device",
       "Both phases are electrolytic, because lead-acid chemistry is electrolysis",
       "Starting is electrolytic and recharging is galvanic"],
      "The same cell plays both roles: spontaneous discharge when it delivers energy, forced reversal when energy is pushed back in. Direction of energy flow decides the classification.",{});
  }
]));

/* ---------- 8.6 Predicting spontaneity from E\u00B0 ---------- */

E("u4-86-predict-spontaneous",4,["8.6"],2,"gen",function(){
  var metals=["Mg","Al","Zn","Fe","Ni","Pb","Cu","Ag"];
  var map={}; ECOUPLES.forEach(function(c){map[c.metal]=c;});
  var i1=ri(0,7),i2=ri(0,7);
  if(i1===i2)i2=(i2+1)%8;
  var strip=map[metals[i1]],ionC=map[metals[i2]];
  var reacts=strip.e<ionC.e;
  var vol=pick([50,100,200,250]),conc=pick([0.100,0.500,1.00]);
  var correct=reacts?
    "The "+strip.metal+" strip dissolves and "+ionC.metal+" plates out: the reaction is spontaneous because E\u00B0("+ionC.ion+") is greater than E\u00B0("+strip.ion+")":
    "Nothing observable happens: the reaction is not spontaneous because E\u00B0("+ionC.ion+") is less than E\u00B0("+strip.ion+"), so "+ionC.metal+" cannot take electrons from "+strip.metal;
  var wrongs=reacts?
    ["Nothing observable happens: "+strip.metal+" is less reactive than "+ionC.metal,
     "The "+strip.metal+" strip gains mass as "+strip.metal+" ions plate onto it from the solution",
     "The "+ionC.metal+" already in the solution dissolves the container instead"]:
    ["The "+strip.metal+" strip dissolves and "+ionC.metal+" plates out, because any metal dissolves in any ion solution",
     "The solution changes colour as "+strip.ion+" is reduced by the "+ionC.metal+" ions",
     "Hydrogen gas bubbles off the strip, because ion solutions are acidic"];
  var q=mcq("A strip of "+strip.metal+" is placed in "+vol+" mL of a "+gF(conc)+" mol/L solution containing "+ionC.ion+" ions. Using the reduction potentials in the Reference Information (E\u00B0 for "+strip.ion+" is "+eF(strip.e)+" V and for "+ionC.ion+" is "+eF(ionC.e)+" V), what is observed?",
    correct,wrongs,
    "A metal can reduce the ions of a metal below it in the reduction table, that is, a couple with a higher E\u00B0. Here E\u00B0("+ionC.ion+") = "+eF(ionC.e)+" V and E\u00B0("+strip.ion+") = "+eF(strip.e)+" V. "+(reacts?"Since "+eF(ionC.e)+" > "+eF(strip.e)+", the displacement goes ahead.":"Since "+eF(ionC.e)+" < "+eF(strip.e)+", the displacement cannot go ahead.")+" <b>"+(reacts?"The reaction is spontaneous":"No reaction")+"</b>.",{});
  q.figure=c32beakerSVG(strip.metal,ionC.ion);
  return q;
});

E("u4-86-table-reading",4,["8.6"],1,"gen",function(){
  var askOx=Math.random()<0.5;
  var sets=[["F\u2082","Cl\u2082","Br\u2082","I\u2082"],["O\u2082","Br\u2082","Ag\u207A","Cu\u00B2\u207A"],["Cl\u2082","Fe\u00B3\u207A","H\u207A","Zn\u00B2\u207A"]];
  var s=pick(sets);
  var vals={"F\u2082":2.87,"Cl\u2082":1.36,"Br\u2082":1.07,"I\u2082":0.54,"O\u2082":1.23,"Ag\u207A":0.80,"Cu\u00B2\u207A":0.34,"Fe\u00B3\u207A":0.77,"H\u207A":0.00,"Zn\u00B2\u207A":-0.76};
  var t=ri(15,35);
  if(askOx){
    var best=s.slice().sort(function(a,b){return vals[b]-vals[a];})[0];
    var ds=s.filter(function(x){return x!==best;});
    return mcq("At "+t+" \u00B0C, four oxidizing agents are compared using the reduction potential table: "+s.join(", ")+". Which is the strongest oxidizing agent?",
      best,ds,
      "The strongest oxidizing agent is the species most eager to be reduced, which sits with the highest (most positive) E\u00B0 in the table. That is <b>"+best+"</b> ("+eF(vals[best])+" V).",{});
  }
  var redMap={"F\u2082":"F\u207B","Cl\u2082":"Cl\u207B","Br\u2082":"Br\u207B","I\u2082":"I\u207B","O\u2082":"H\u2082O","Ag\u207A":"Ag","Cu\u00B2\u207A":"Cu","Fe\u00B3\u207A":"Fe\u00B2\u207A","H\u207A":"H\u2082","Zn\u00B2\u207A":"Zn"};
  var worst=s.slice().sort(function(a,b){return vals[a]-vals[b];})[0];
  var bestRed=redMap[worst];
  var ds2=s.filter(function(x){return x!==worst;}).map(function(x){return redMap[x];});
  return mcq("At "+t+" \u00B0C, the reduced forms of four couples are compared using the reduction potential table: the couples are those of "+s.join(", ")+". Which reduced form is the strongest reducing agent?",
    bestRed,ds2,
    "The strongest reducing agent is the reduced form of the couple with the lowest (most negative) E\u00B0: it gives up electrons most readily. That couple is "+worst+" ("+eF(vals[worst])+" V), whose reduced form is <b>"+bestRed+"</b>.",{});
});

E("u4-86-strongest-ranking",4,["8.6"],2,"var",varset([
  function(){
    var temp=pick([20,25,30]);
    return mcq("Using the reduction potential table in the Reference Information at "+temp+" \u00B0C, identify the strongest reducing agent among Li, Na, Mg, Zn and Cu (as metals):",
      "Li",["Na","Mg","Zn"],
      "The strongest reducing agent is the metal whose couple has the most negative E\u00B0: <b>Li</b>, because the couple Li\u207A/Li sits at -3.04 V, so lithium metal gives up electrons most readily.",{temp:temp});
  },
  function(){
    var temp=pick([20,25,30]);
    return mcq("Using the reduction potential table in the Reference Information at "+temp+" \u00B0C, identify the strongest oxidizing agent among F\u2082, Cl\u2082, Br\u2082 and O\u2082:",
      "F\u2082",["Cl\u2082","Br\u2082","O\u2082"],
      "The strongest oxidizing agent is the species whose couple has the most positive E\u00B0: <b>F\u2082</b>, because the couple F\u2082/F\u207B sits at +2.87 V, so fluorine takes electrons most readily.",{temp:temp});
  },
  function(){
    var temp=pick([20,25,30]);
    return mcq("Using the reduction potential table in the Reference Information at "+temp+" \u00B0C, identify the weakest reducing agent among Ag, Cu, Zn and Mg (as metals):",
      "Ag",["Cu","Zn","Mg"],
      "The weakest reducing agent is the metal whose couple has the most positive E\u00B0 of the four: <b>Ag</b>, because the couple Ag\u207A/Ag sits at +0.80 V, so silver metal holds its electrons most tightly.",{temp:temp});
  },
  function(){
    var temp=pick([20,25,30]);
    return mcq("Using the reduction potential table in the Reference Information at "+temp+" \u00B0C, identify the weakest oxidizing agent among Ag\u207A, Cu\u00B2\u207A, Zn\u00B2\u207A and Mg\u00B2\u207A (as ions):",
      "Mg\u00B2\u207A",["Ag\u207A","Cu\u00B2\u207A","Zn\u00B2\u207A"],
      "The weakest oxidizing agent is the ion whose couple has the most negative E\u00B0 of the four: <b>Mg\u00B2\u207A</b>, because the couple Mg\u00B2\u207A/Mg sits at -2.37 V, so magnesium ions are the least eager to be reduced.",{temp:temp});
  }
]));

E("u4-86-e-not-multiply",4,["8.6"],2,"gen",function(){
  var cases=[
    {half:"Zn(s) \u2192 Zn\u00B2\u207A(aq) + 2 e\u207B (E\u00B0 = +0.76 V for the oxidation)",mult:3,claim:"+2.28 V",right:"+0.76 V"},
    {half:"Ag\u207A(aq) + e\u207B \u2192 Ag(s) (E\u00B0 = +0.80 V)",mult:2,claim:"+1.60 V",right:"+0.80 V"},
    {half:"Cu\u00B2\u207A(aq) + 2 e\u207B \u2192 Cu(s) (E\u00B0 = +0.34 V)",mult:2,claim:"+0.68 V",right:"+0.34 V"},
    {half:"Fe\u00B2\u207A(aq) + 2 e\u207B \u2192 Fe(s) (E\u00B0 = -0.44 V)",mult:3,claim:"-1.32 V",right:"-0.44 V"}
  ];
  var c=pick(cases);
  var vol=pick([50,100,250,500]),conc=pick([0.100,0.500,1.00]),temp=pick([15,20,25,30]);
  return mcq("While balancing a cell reaction at "+temp+" \u00B0C (in "+vol+" mL of "+gF(conc)+" mol/L solutions), a student multiplies the half-reaction "+c.half+" by "+c.mult+" so the electrons cancel, and writes that its potential becomes "+c.claim+". Which judgement is correct?",
    "The student is wrong: E\u00B0 is an intensive property of the couple and does not change when the half-reaction is scaled, so it stays "+c.right+". Only the number of electrons changes",
    ["The student is right: multiplying the equation by "+c.mult+" multiplies the voltage by "+c.mult,
     "The student is wrong: the potential becomes zero when a half-reaction is scaled",
     "The student is right for reductions but wrong for oxidations"],
    "Voltage is energy per unit charge, an intensive quantity: scaling the equation scales the energy and the charge together, leaving the ratio unchanged. E\u00B0 stays <b>"+c.right+"</b> no matter the multiplier. This is one of the most common errors in cell calculations.",{});
});

/* ---------- 8.7 Standard reduction potentials and cell voltage ---------- */

E("u4-87-cell-voltage",4,["8.7"],2,"gen",function(){
  var map={}; ECOUPLES.forEach(function(c){map[c.metal]=c;});
  var keys=Object.keys(map);
  var i=ri(0,keys.length-1),j=ri(0,keys.length-1);
  if(i===j)j=(j+1)%keys.length;
  var hi=map[keys[Math.max(i,j)]],lo=map[keys[Math.min(i,j)]];
  if(hi.e<lo.e){var tmp=hi;hi=lo;lo=tmp;}
  var E=sfR(hi.e-lo.e,3);
  var device=pick(["a voltmeter","a small electric motor","an LED circuit"]);
  var q=numq("A galvanic cell is built from a "+lo.metal+" electrode in "+lo.ion+" solution and a "+hi.metal+" electrode in "+hi.ion+" solution, and connected to "+device+". Using the standard reduction potentials in the Reference Information, calculate the standard cell potential. Give your answer in V.",
    E,0.02,
    "The cathode is the couple with the higher E\u00B0: "+hi.ion+" ("+eF(hi.e)+" V). The anode is "+lo.ion+" ("+eF(lo.e)+" V). E\u00B0cell = E\u00B0(cathode) - E\u00B0(anode) = "+fmtF(hi.e,2)+" V - ("+fmtF(lo.e,2)+" V) = +"+fmtF(E,2)+" V. The standard cell potential is <b>+"+fmtF(E,2)+" V</b>.",{});
  q.figure=c32cellSVG(lo.metal+" electrode",lo.ion+"(aq) solution",hi.metal+" electrode",hi.ion+"(aq) solution","Salt bridge");
  return q;
});

E("u4-87-find-e-half",4,["8.7"],3,"gen",function(){
  var map={}; ECOUPLES.forEach(function(c){map[c.metal]=c;});
  var keys=Object.keys(map);
  var i=ri(0,keys.length-1),j=ri(0,keys.length-1);
  if(i===j)j=(j+2)%keys.length;
  var hi=map[keys[Math.max(i,j)]],lo=map[keys[Math.min(i,j)]];
  if(hi.e<lo.e){var tmp=hi;hi=lo;lo=tmp;}
  var E=sfR(hi.e-lo.e,3);
  var askAnode=Math.random()<0.5;
  if(askAnode){
    return numq("A galvanic cell built from a "+hi.metal+" electrode (in "+hi.ion+" solution) and a second metal electrode has a standard cell potential of +"+fmtF(E,2)+" V. The "+hi.ion+" couple is the cathode, with E\u00B0 = "+eF(hi.e)+" V. Calculate the standard reduction potential of the anode couple. Give your answer in V.",
      lo.e,0.02,
      "E\u00B0cell = E\u00B0(cathode) - E\u00B0(anode), so E\u00B0(anode) = E\u00B0(cathode) - E\u00B0cell = "+fmtF(hi.e,2)+" V - "+fmtF(E,2)+" V = "+fmtF(lo.e,2)+" V. The anode couple is "+lo.ion+"/"+lo.metal+", and its standard reduction potential is <b>"+eF(lo.e)+" V</b>.",{});
  }
  return numq("A galvanic cell built from a "+lo.metal+" electrode (in "+lo.ion+" solution) and a second metal electrode has a standard cell potential of +"+fmtF(E,2)+" V. The "+lo.ion+" couple is the anode, with E\u00B0 = "+eF(lo.e)+" V. Calculate the standard reduction potential of the cathode couple. Give your answer in V.",
    hi.e,0.02,
    "E\u00B0cell = E\u00B0(cathode) - E\u00B0(anode), so E\u00B0(cathode) = E\u00B0cell + E\u00B0(anode) = "+fmtF(E,2)+" V + ("+fmtF(lo.e,2)+" V) = "+fmtF(hi.e,2)+" V. The cathode couple is "+hi.ion+"/"+hi.metal+", and its standard reduction potential is <b>"+eF(hi.e)+" V</b>.",{});
});

E("u4-87-standard-conditions",4,["8.7"],1,"var",varset([
  function(){
    return mcq("Standard reduction potentials, E\u00B0, are measured under standard conditions, which include",
      "Solutions at 1.00 mol/L, gases at 100 kPa, and a temperature of 25 \u00B0C",
      ["Solutions at any concentration, as long as the temperature is 0 \u00B0C",
       "Pure metals in distilled water at 100 \u00B0C",
       "Solutions at 1.00 mol/L and gases at 500 kPa"],
      "Standard state for these tables: 1.00 mol/L concentrations, 100 kPa for gases, and 25 \u00B0C. Potentials measured under other conditions differ from the tabulated E\u00B0 values.",{});
  },
  function(){
    return mcq("The standard hydrogen electrode is assigned E\u00B0 = 0.00 V. Its role in the table is",
      "The reference point: every other couple's potential is measured relative to it",
      ["To show that hydrogen never reacts in cells",
       "To mark the exact middle of the table by strength",
       "To supply hydrogen gas to every cell built"],
      "Potentials are relative. The hydrogen couple is set to zero by agreement, and every other E\u00B0 is the voltage of a cell built against it under standard conditions.",{});
  },
  function(){
    return mcq("A couple with a negative E\u00B0, such as Zn\u00B2\u207A/Zn at -0.76 V, is best interpreted as",
      "Its reduced form (Zn metal) is a stronger reducing agent than H\u2082: the metal gives up electrons more readily than hydrogen does",
      ["The couple can never appear in a working cell",
       "Its ions are stronger oxidizing agents than H\u207A",
       "The negative sign means the value was measured incorrectly"],
      "Negative means the couple sits below hydrogen in the table: the metal is more willing to be oxidized than H\u2082 is. Such metals react with acids to release hydrogen.",{});
  }
]));

E("u4-87-voltage-compare",4,["8.7"],3,"gen",function(){
  var map={}; ECOUPLES.forEach(function(c){map[c.metal]=c;});
  var names=["Mg","Al","Zn","Fe","Ni","Pb","Cu","Ag"];
  var pairs=[];
  var used={};
  while(pairs.length<4){
    var a=pick(names),b=pick(names);
    if(a===b)continue;
    var key=[a,b].sort().join("/");
    if(used[key])continue;
    used[key]=1;
    var ca=map[a],cb=map[b];
    var E=Math.abs(ca.e-cb.e);
    pairs.push({a:a,b:b,E:E,label:a+" with "+b+" (E\u00B0cell = +"+fmtF(E,2)+" V)"});
  }
  pairs.sort(function(x,y){return y.E-x.E;});
  var best=pairs[0];
  if(pairs[1]&&best.E-pairs[1].E<0.05){ return mcq("Four galvanic cells are built under standard conditions. Which pairing of electrodes gives the largest cell potential?",
    "Mg with Ag (E\u00B0cell = +3.17 V)",
    ["Zn with Cu (E\u00B0cell = +1.10 V)","Fe with Ag (E\u00B0cell = +1.24 V)","Pb with Cu (E\u00B0cell = +0.47 V)"],
    "The largest potential comes from the widest spread in the table: E\u00B0cell = E\u00B0(cathode) - E\u00B0(anode) = +0.80 - (-2.37) = +3.17 V for Mg with Ag. <b>Mg with Ag</b>.",{}); }
  var ds=pairs.slice(1).map(function(p){return p.label;});
  return mcq("Four galvanic cells are built under standard conditions from these electrode pairings: "+pairs.map(function(p){return p.a+" with "+p.b;}).join("; ")+". Which pairing gives the largest cell potential?",
    best.label,ds,
    "Cell potential is the gap between the two couples: E\u00B0cell = E\u00B0(higher) - E\u00B0(lower). Computing the four gaps from the table, the largest belongs to <b>"+best.a+" with "+best.b+"</b> at +"+fmtF(best.E,2)+" V.",{});
});

/* ---------- 8.8 Electrolysis calculations (Faraday's law) ---------- */

var PLATING=[
  {ion:"Ag\u207A",metal:"silver",z:1,M:107.87},
  {ion:"Cu\u00B2\u207A",metal:"copper",z:2,M:63.55},
  {ion:"Al\u00B3\u207A",metal:"aluminium",z:3,M:26.98},
  {ion:"Zn\u00B2\u207A",metal:"zinc",z:2,M:65.39},
  {ion:"Ni\u00B2\u207A",metal:"nickel",z:2,M:58.69},
  {ion:"Cr\u00B3\u207A",metal:"chromium",z:3,M:52.00},
  {ion:"Pb\u00B2\u207A",metal:"lead",z:2,M:207.20},
  {ion:"Sn\u00B2\u207A",metal:"tin",z:2,M:118.71}
];

E("u4-88-faraday-mass",4,["8.8"],3,"gen",function(){
  var p=pick(PLATING);
  var I=pick([0.500,1.00,1.50,2.00,2.50,3.00,5.00]);
  var mins=pick([10.0,15.0,20.0,30.0,45.0,60.0,90.0]);
  var t=mins*60;
  var Q=sfR(I*t,4);
  var ne=sfR(Q/96500,4);
  var n=sfR(ne/p.z,4);
  var mass=sfR(n*p.M,4);
  var ans=sfR(mass,3);
  var q=numq("A solution containing "+p.ion+" ions is electrolyzed with a current of "+gF(I)+" A for "+gF(mins)+" min. Calculate the mass of "+p.metal+" deposited at the cathode. Use F = 9.65 \u00D7 10\u2074 C/mol. Give your answer in g.",
    ans,Math.max(0.02*ans,0.01),
    "Charge passed: Q = I \u00D7 t = "+gF(I)+" A \u00D7 ("+gF(mins)+" \u00D7 60) s = "+iF(Q)+" C. Moles of electrons: n = Q / F = "+iF(Q)+" / 96500 = "+iF(ne)+" mol. Each "+p.ion+" ion needs "+p.z+" electron"+(p.z>1?"s":"")+", so moles of "+p.metal+" = "+iF(ne)+" / "+p.z+" = "+iF(n)+" mol. Mass = "+iF(n)+" mol \u00D7 "+gF(p.M)+" g/mol = "+iF(mass)+" g. The mass deposited is <b>"+F3(ans)+" g</b>.",{});
  q.figure=c32plateSVG("Cathode","Electrode","Solution containing "+p.ion+" ions",null,null);
  return q;
});

E("u4-88-faraday-time",4,["8.8"],3,"gen",function(){
  var p=pick(PLATING);
  var target=pick([0.500,1.00,2.00,2.50,5.00,10.0]);
  var I=pick([0.500,1.00,1.50,2.00,2.50,3.00,5.00]);
  var n=sfR(target/p.M,4);
  var ne=sfR(n*p.z,4);
  var Q=sfR(ne*96500,4);
  var tsec=sfR(Q/I,4);
  var tmin=sfR(tsec/60,4);
  var ans=sfR(tmin,3);
  var q=numq("How long must a current of "+gF(I)+" A be passed through a solution containing "+p.ion+" ions to deposit "+gF(target)+" g of "+p.metal+" at the cathode? Use F = 9.65 \u00D7 10\u2074 C/mol. Give your answer in minutes.",
    ans,Math.max(0.02*ans,0.2),
    "Moles of "+p.metal+": n = "+gF(target)+" g / "+gF(p.M)+" g/mol = "+iF(n)+" mol. Each "+p.ion+" ion needs "+p.z+" electron"+(p.z>1?"s":"")+", so moles of electrons = "+p.z+" \u00D7 "+iF(n)+" = "+iF(ne)+" mol. Charge needed: Q = "+iF(ne)+" \u00D7 96500 = "+iF(Q)+" C. Time: t = Q / I = "+iF(Q)+" / "+gF(I)+" = "+iF(tsec)+" s = "+iF(tmin)+" min. The time required is <b>"+F3(ans)+" min</b>.",{});
  q.figure=c32plateSVG("Cathode","Electrode","Solution containing "+p.ion+" ions",null,null);
  return q;
});

E("u4-88-electrons-moles",4,["8.8"],2,"gen",function(){
  var Q=pick([4825,9650,14475,19300,24125,28950,33775,38600,48250,57900,67525,77200,86850,96500,106150,115800]);
  var n=sfR(Q/96500,4),ans=sfR(n,3);
  var I=pick([0.500,1.00,1.50,2.00,2.50,3.00,4.00,5.00]);
  return numq("An electrolysis experiment passes a total charge of "+Q+" C (a current of "+gF(I)+" A run for the necessary time). Calculate the amount of electrons transferred. Use F = 9.65 \u00D7 10\u2074 C/mol. Give your answer in mol.",
    ans,Math.max(0.02*ans,0.002),
    "One mole of electrons carries 9.65 \u00D7 10\u2074 C (the Faraday constant). n(e\u207B) = Q / F = "+Q+" / 96500 = "+iF(n)+" mol. The amount of electrons transferred is <b>"+F3(ans)+" mol</b>.",{Q:Q});
});

E("u4-88-faraday-concept",4,["8.8"],1,"var",varset([
  function(){
    return mcq("The Faraday constant, F = 9.65 \u00D7 10\u2074 C/mol, represents",
      "The total charge carried by one mole of electrons",
      ["The charge on a single electron",
       "The voltage produced by one mole of electrons",
       "The mass of one mole of electrons"],
      "F links the mole scale to the coulomb scale: multiply moles of electrons by F to get coulombs, or divide a charge in coulombs by F to get moles of electrons.",{});
  },
  function(){
    return mcq("In an electrolysis, the mass of metal deposited at the cathode is doubled if",
      "The total charge passed is doubled, for example by doubling the current or doubling the time",
      ["The voltage alone is doubled, whatever the current and time",
       "The solution is made twice as deep",
       "The electrodes are moved twice as far apart"],
      "Faraday's law: the amount deposited tracks the total charge, Q = I \u00D7 t. Doubling Q (by current or by time) doubles the moles of electrons and so doubles the deposit.",{});
  },
  function(){
    return mcq("The same charge is passed through solutions of Ag\u207A ions and of Cu\u00B2\u207A ions in separate cells. The moles of metal deposited satisfy",
      "Twice as many moles of silver as of copper form, because each Ag\u207A needs one electron while each Cu\u00B2\u207A needs two",
      ["Equal moles of each metal form",
       "Twice as many moles of copper as of silver form",
       "No copper forms, because it needs two electrons"],
      "The charge buys electrons. A fixed number of moles of electrons reduces twice as many 1+ ions as 2+ ions, so n(Ag) = 2 \u00D7 n(Cu) for the same charge.",{});
  }
]));

/* ---------- 8.9 The hydrogen fuel cell ---------- */

E("u4-89-fuel-cell-basics",4,["8.9"],1,"var",varset([
  function(){
    return mcq("The overall reaction in a hydrogen fuel cell is",
      "2 H\u2082(g) + O\u2082(g) \u2192 2 H\u2082O(l)",
      ["2 H\u2082O(l) \u2192 2 H\u2082(g) + O\u2082(g)",
       "H\u2082(g) + O\u2082(g) \u2192 H\u2082O\u2082(l)",
       "CH\u2084(g) + 2 O\u2082(g) \u2192 CO\u2082(g) + 2 H\u2082O(l)"],
      "A hydrogen fuel cell runs the familiar reaction of hydrogen with oxygen, but harvests it as electricity instead of heat: the only product is water.",{});
  },
  function(){
    return mcq("A hydrogen fuel cell differs from a hydrogen storage battery in that",
      "The fuel cell keeps producing electricity as long as hydrogen and oxygen are supplied from outside; it is not recharged and does not store the reactants inside",
      ["The fuel cell stores hydrogen inside itself like a tank battery",
       "The fuel cell burns hydrogen in a flame to spin a turbine",
       "There is no difference at all"],
      "A fuel cell is a flow device: reactants are fed in continuously and the product leaves. A battery stores its reactants inside and runs down (or is recharged).",{});
  },
  function(){
    return mcq("The main environmental advantage claimed for hydrogen fuel cells in vehicles is that",
      "Their only exhaust product is water, with no carbon dioxide produced at the vehicle",
      ["They consume no energy to run",
       "They produce hydrogen as a waste product",
       "They never need any fuel infrastructure"],
      "At the point of use, the product is water only. (How the hydrogen itself is produced is a separate question for the full environmental picture.)",{});
  }
]));

E("u4-89-fuel-cell-half",4,["8.9"],2,"var",varset([
  function(){
    var t=pick([25,40,60,80]);
    return mcq("In an acidic hydrogen fuel cell operating at "+t+" \u00B0C, hydrogen gas is fed to one electrode and oxygen to the other. The half-reaction at the anode is",
      "H\u2082(g) \u2192 2 H\u207A(aq) + 2 e\u207B",
      ["H\u2082(g) + 2 e\u207B \u2192 2 H\u207B(aq)",
       "O\u2082(g) + 4 H\u207A(aq) + 4 e\u207B \u2192 2 H\u2082O(l)",
       "2 H\u2082O(l) \u2192 O\u2082(g) + 4 H\u207A(aq) + 4 e\u207B"],
      "The anode is where oxidation happens: hydrogen is oxidized, releasing electrons that travel through the external circuit. <b>H\u2082(g) \u2192 2 H\u207A(aq) + 2 e\u207B</b>.",{t:t});
  },
  function(){
    var t=pick([25,40,60,80]);
    return mcq("In an acidic hydrogen fuel cell operating at "+t+" \u00B0C, hydrogen gas is fed to one electrode and oxygen to the other. The half-reaction at the cathode is",
      "O\u2082(g) + 4 H\u207A(aq) + 4 e\u207B \u2192 2 H\u2082O(l)",
      ["H\u2082(g) \u2192 2 H\u207A(aq) + 2 e\u207B",
       "O\u2082(g) \u2192 2 O\u00B2\u207B(aq)",
       "2 H\u207A(aq) + 2 e\u207B \u2192 H\u2082(g)"],
      "The cathode is where reduction happens: oxygen accepts the electrons arriving from the anode and combines with H\u207A to form water. <b>O\u2082(g) + 4 H\u207A(aq) + 4 e\u207B \u2192 2 H\u2082O(l)</b>.",{t:t});
  },
  function(){
    return mcq("Combining the two fuel cell half-reactions gives the overall reaction. In that overall reaction, which substance is reduced?",
      "Oxygen, O\u2082: its oxidation number falls from 0 to -2 in water",
      ["Hydrogen, H\u2082: its oxidation number rises from 0 to +1",
       "Water, because it is the product",
       "Neither: a fuel cell reaction is not a redox reaction"],
      "Oxidation numbers tell the story: hydrogen goes 0 to +1 (oxidized) and oxygen goes 0 to -2 (reduced). The fuel cell is a redox reaction whose energy is harvested as electricity.",{});
  }
]));

var FCCASES=[
    {q:"A fuel cell is described as more efficient than burning the same hydrogen in an engine mainly because",a:"The cell converts the chemical energy directly into electrical energy, avoiding the losses of the heat-to-motion steps in an engine",w:["The cell creates extra energy from the water it produces","Burning hydrogen in an engine produces no useful energy","The cell does not need oxygen, so it saves fuel"]},
    {q:"A hydrogen fuel cell powering a bus produces water fast enough that it must be drained or vented. This is because",a:"Water is the product of the cell reaction, formed continuously at the cathode as the cell runs",w:["The hydrogen fuel is stored dissolved in water","Water leaks in from the cooling system by design","The cell condenses all of the humidity from the air"]},
    {q:"If the hydrogen supply to a running fuel cell is cut off, the cell",a:"Stops producing electricity once the remaining hydrogen is used, because a fuel cell only runs while reactants are supplied",w:["Keeps running for hours from its stored charge, like a large battery","Switches to using water as its fuel","Produces more voltage to compensate"]}
];
E("u4-89-fuel-cell-reasoning",4,["8.9"],2,"var",varset(FCCASES.map(function(v){
  return function(){
    var t=pick([25,40,60,80]);
    return mcq("A hydrogen fuel cell operates at "+t+" \u00B0C in a test vehicle. "+v.q+":",
      v.a,v.w,
      "<b>"+v.a+"</b>.",{t:t});
  };
})));

/* ----- bank-br.js ----- */
/* Chemistry 3202: prior-learning bridging bank (Unit 5 slot).
   Source course: Chemistry 2202 (mole concept, concentration, stoichiometry,
   solubility and equilibrium foundations). Codes B.1 to B.4. NOT counted
   toward Chemistry 3202 coverage and carries no CR marks. These entries
   reuse the helpers defined in bank-u1.js (shared scope). */

E("br-b1-molar-mass",5,["B.1"],1,"gen",function(){
  var cs=[
    {f:"NaCl",M:58.44,ans:"58.44 g/mol",w:["35.45 g/mol","22.99 g/mol","81.44 g/mol"]},
    {f:"CaCl\u2082",M:110.98,ans:"110.98 g/mol",w:["75.53 g/mol","145.98 g/mol","95.21 g/mol"]},
    {f:"Na\u2082CO\u2083",M:105.99,ans:"105.99 g/mol",w:["82.99 g/mol","61.02 g/mol","124.00 g/mol"]},
    {f:"CuSO\u2084",M:159.61,ans:"159.61 g/mol",w:["95.61 g/mol","127.55 g/mol","191.67 g/mol"]},
    {f:"NH\u2084NO\u2083",M:80.05,ans:"80.05 g/mol",w:["62.05 g/mol","43.03 g/mol","98.06 g/mol"]},
    {f:"Ca(OH)\u2082",M:74.10,ans:"74.10 g/mol",w:["57.09 g/mol","56.11 g/mol","90.09 g/mol"]},
    {f:"KNO\u2083",M:101.10,ans:"101.10 g/mol",w:["85.10 g/mol","69.10 g/mol","117.11 g/mol"]},
    {f:"MgSO\u2084",M:120.37,ans:"120.37 g/mol",w:["88.37 g/mol","104.37 g/mol","72.38 g/mol"]},
    {f:"Fe\u2082O\u2083",M:159.70,ans:"159.70 g/mol",w:["71.85 g/mol","87.84 g/mol","103.85 g/mol"]}
  ];
  var c=pick(cs);
  var n=ri(2,9);
  var amt=pick([0.500,1.00,2.00,2.50]);
  var temp=pick([15,20,25,30,35]);
  return mcq("A student is preparing "+gF(amt)+" mol of a compound for a Chemistry 3202 lab at "+temp+" \u00B0C and checks the molar mass first. Using the atomic masses in the Reference Information, the molar mass of "+c.f+" is",
    c.ans,c.w,
    "Add the atomic masses for every atom in the formula, counting subscripts. For "+c.f+" the total is <b>"+c.ans+"</b>. (Bridge practice x"+n+": the mole scale underlies every calculation in kinetics, equilibrium and electrolysis.)",{amt:amt,temp:temp});
});

E("br-b1-mass-moles",5,["B.1"],2,"gen",function(){
  var cs=[
    {f:"NaCl",M:58.44},{f:"CaCl\u2082",M:110.98},{f:"Na\u2082CO\u2083",M:105.99},{f:"KNO\u2083",M:101.10},{f:"CuSO\u2084",M:159.61},{f:"glucose (C\u2086H\u2081\u2082O\u2086)",M:180.18}
  ];
  var c=pick(cs);
  var mass=pick([5.85,11.7,23.4,29.2,10.6,21.2,31.8,15.9,31.9,9.01,18.0,36.0]);
  var n=sfR(mass/c.M,4);
  var ans=sfR(n,3);
  return numq("Calculate the amount of substance in "+gF(mass)+" g of "+c.f+" (molar mass "+gF(c.M)+" g/mol). Give your answer in mol.",
    ans,Math.max(0.02*ans,0.002),
    "n = m / M = "+gF(mass)+" g / "+gF(c.M)+" g/mol = "+iF(n)+" mol. The amount is <b>"+F3(ans)+" mol</b>.",{});
});

E("br-b2-concentration",5,["B.2"],2,"gen",function(){
  var n=pick([0.100,0.200,0.250,0.400,0.500,0.750,1.00]);
  var VL=pick([0.250,0.500,1.00,2.00]);
  var solute=pick(["sodium chloride","potassium nitrate","sodium hydroxide","glucose"]);
  var c0=sfR(n/VL,4);
  var ans=sfR(c0,3);
  return numq("A student dissolves "+gF(n)+" mol of "+solute+" and makes the solution up to "+gF(VL)+" L in a volumetric flask. Calculate the molar concentration of the solution. Give your answer in mol/L.",
    ans,Math.max(0.02*ans,0.002),
    "c = n / V = "+gF(n)+" mol / "+gF(VL)+" L = "+iF(c0)+" mol/L. The concentration is <b>"+F3(ans)+" mol/L</b>.",{solute:solute});
});

E("br-b2-dilution",5,["B.2"],2,"gen",function(){
  var c1=pick([1.00,2.00,4.00,6.00]),v1=pick([10.0,25.0,50.0]),v2=pick([100.0,250.0,500.0]);
  var stock=pick(["hydrochloric acid","sodium hydroxide","sulfuric acid","acetic acid"]);
  var c2=sfR(c1*v1/v2,4);
  var ans=sfR(c2,3);
  return numq("A student pipettes "+gF(v1)+" mL of a "+gF(c1)+" mol/L stock solution of "+stock+" and dilutes it to a final volume of "+gF(v2)+" mL. Calculate the concentration of the diluted solution. Give your answer in mol/L.",
    ans,Math.max(0.02*ans,0.002),
    "Dilution keeps the moles of solute the same: c\u2081V\u2081 = c\u2082V\u2082, so c\u2082 = ("+gF(c1)+" \u00D7 "+gF(v1)+") / "+gF(v2)+" = "+iF(c2)+" mol/L. The diluted concentration is <b>"+F3(ans)+" mol/L</b>.",{});
});

var RXCASES=[
    {eq:"2 H\u2082(g) + O\u2082(g) \u2192 2 H\u2082O(l)",ask:"moles of water produced from 4.00 mol of hydrogen",ans:"4.00 mol",w:["2.00 mol","8.00 mol","1.00 mol"]},
    {eq:"N\u2082(g) + 3 H\u2082(g) \u2192 2 NH\u2083(g)",ask:"moles of hydrogen needed to produce 6.00 mol of ammonia",ans:"9.00 mol",w:["4.00 mol","2.00 mol","18.0 mol"]},
    {eq:"CH\u2084(g) + 2 O\u2082(g) \u2192 CO\u2082(g) + 2 H\u2082O(l)",ask:"moles of oxygen needed to burn 3.00 mol of methane completely",ans:"6.00 mol",w:["3.00 mol","1.50 mol","12.0 mol"]},
    {eq:"2 KClO\u2083(s) \u2192 2 KCl(s) + 3 O\u2082(g)",ask:"moles of oxygen produced from 4.00 mol of potassium chlorate",ans:"6.00 mol",w:["4.00 mol","2.67 mol","12.0 mol"]},
    {eq:"CaCO\u2083(s) + 2 HCl(aq) \u2192 CaCl\u2082(aq) + H\u2082O(l) + CO\u2082(g)",ask:"moles of HCl needed to react with 5.00 mol of calcium carbonate",ans:"10.0 mol",w:["5.00 mol","2.50 mol","20.0 mol"]}
];
E("br-b3-mole-ratio",5,["B.3"],2,"var",varset(RXCASES.map(function(r){
  return function(){
    var temp=pick([20,25,30]);
    return mcq("In a laboratory at "+temp+" \u00B0C, the reaction "+r.eq+" is carried out. Find the "+r.ask+":",
      r.ans,r.w,
      "Use the coefficient ratio from the balanced equation: convert the given amount with the mole ratio of the two substances involved. The answer is <b>"+r.ans+"</b>.",{temp:temp});
  };
})));

E("br-b3-percent-yield",5,["B.3"],2,"gen",function(){
  var actual=pick([12.5,24.0,31.5,42.0,55.5,68.0,73.5,84.0]);
  var pct=pick([75.0,80.0,85.0,90.0,95.0]);
  var synth=pick(["an aspirin synthesis","a biodiesel preparation","an esterification reaction","a soap-making reaction","a recrystallization prep"]);
  var theoretical=sfR(actual/(pct/100),4);
  var truePct=sfR(actual/theoretical*100,3);
  return numq("In "+synth+", the theoretical yield is "+gF(theoretical)+" g of product, but the student isolates only "+gF(actual)+" g. Calculate the percent yield. Give your answer in %.",
    truePct,1.0,
    "Percent yield = (actual / theoretical) \u00D7 100% = ("+gF(actual)+" / "+gF(theoretical)+") \u00D7 100% = "+sfF(truePct,3)+"%. The percent yield is <b>"+sfF(truePct,3)+"%</b>.",{});
});

var SOLCASES=[
    {q:"Which ionic compound is insoluble in water?",a:"Silver chloride, AgCl",w:["Sodium chloride, NaCl","Potassium nitrate, KNO\u2083","Ammonium sulfate, (NH\u2084)\u2082SO\u2084"]},
    {q:"Which ionic compound is soluble in water?",a:"Copper(II) sulfate, CuSO\u2084",w:["Barium sulfate, BaSO\u2084","Lead(II) chloride, PbCl\u2082","Calcium carbonate, CaCO\u2083"]},
    {q:"According to the solubility rules, all compounds containing the nitrate ion are",a:"Soluble in water",w:["Insoluble in water","Soluble only when heated","Formed only as precipitates"]},
    {q:"Mixing solutions of silver nitrate and sodium chloride produces a precipitate because",a:"Silver chloride is insoluble, so Ag\u207A and Cl\u207B leave the solution as a solid",w:["Silver nitrate is insoluble in water","Sodium nitrate is insoluble and forms the solid","The temperature of the mixture drops to freezing"]}
];
E("br-b4-solubility",5,["B.4"],1,"var",varset(SOLCASES.map(function(v){
  return function(){
    return mcq(v.q,v.a,v.w,"<b>"+v.a+"</b>. Solubility rules from Chemistry 2202 decide which ions stay in solution and which precipitate, the same judgement used when judging ionic equilibria.",{});
  };
})));

E("br-b4-equilibrium-basics",5,["B.4"],1,"var",varset([
  function(){
    return mcq("A saturated solution of a slightly soluble salt in a sealed flask is at equilibrium. This means",
      "The rate of dissolving equals the rate of crystallization, so concentrations stay constant even though both processes continue",
      ["All dissolving and crystallizing have stopped completely",
       "All of the salt has dissolved",
       "The solution can hold no more water"],
      "Equilibrium is dynamic: forward and reverse processes continue at equal rates, so the observable properties stay constant. This is the foundation for every equilibrium in Unit 1.",{});
  },
  function(){
    return mcq("Which change increases the amount of dissolved oxygen in a lake at equilibrium with the air?",
      "Cooling the water, because gases are more soluble at lower temperature",
      ["Warming the water, because the particles move faster",
       "Stirring the surface violently",
       "Removing the plants from the lake"],
      "Gas solubility falls as temperature rises (one reason warm discharge water stresses fish). Cooling shifts the dissolving equilibrium toward more dissolved gas.",{});
  },
  function(){
    return mcq("More solid salt is added to a saturated salt solution that already has undissolved solid sitting at the bottom. At equilibrium, the concentration of the solution",
      "Stays the same: the added solid simply joins the undissolved solid, because the solution is already saturated",
      ["Increases, because there is more salt present in total",
       "Decreases, because the extra solid absorbs dissolved salt",
       "Doubles, because twice as much salt was used"],
      "Saturation is the equilibrium point for that temperature: the dissolved concentration is fixed. Extra solid cannot push more into solution; it settles as more undissolved solid while dissolving and crystallizing continue at equal rates.",{});
  }
]));

/* ============ Constructed-response marks (generated) ============ */
/* Built by assemble-bank.py from the CRMARKS manifests at the top of
   each unit file. Exam Section B draws only from these entries. */
window.__BANK_CRMARKS={"u1-51-rate-explain":3,"u1-52-rate-scenario":2,"u1-53-ea-reverse":3,"u1-54-mechanism-analysis":4,"u1-56-ice-k":4,"u1-56-k-calc":3,"u1-57-shift-predict":2,"u2-63-net-equation":3,"u2-63-write-net":4,"u2-64-dilution-ph":3,"u2-64-mix-stoich-ph":4,"u2-64-ph-from-h":2,"u2-65-ka-from-ph":3,"u2-65-weak-acid-ph":4,"u2-65-weak-base-ph":4,"u2-66-kb-calc":2,"u2-68-titration-calc":3,"u2-68-titration-diprotic":4,"u3-710-molar-combustion":4,"u3-711-write-thermochem":3,"u3-712-bond-energy":3,"u3-712-formation":3,"u3-712-hess":5,"u3-74-calorimetry-error":4,"u3-74-calorimetry-molar":4,"u3-74-find-delta-t":2,"u3-74-mixture-temp":4,"u3-74-q-temp":3,"u3-77-q-combined":4,"u3-77-q-phase":3,"u3-78-deltah-from-q":3,"u4-83-balance-acidic":5,"u4-83-half-reaction-write":3,"u4-83-net-reaction":4,"u4-84-build-cell":4,"u4-84-label-scenario":2,"u4-86-predict-spontaneous":3,"u4-87-cell-voltage":4,"u4-87-find-e-half":3,"u4-88-faraday-mass":4,"u4-88-faraday-time":4};
