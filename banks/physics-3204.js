/* Physics 3204 bank module for the unified review app shell.
   Assembled by assemble-bank.py from banks/physics-3204/; edit the
   per-unit sources there, not this file. Entries register through
   the shell's E(id, unit, indicators, level, kind, gen). */

/* ----- bank-helpers.js ----- */
// Physics 2204 shared bank helpers: units and significant figures discipline
// (standing rule for the science builds, from the Nov 9, 2026 Chemistry 2202
// pass). Givens print at 3 significant figures. Intermediates print at 4
// significant figures: one guard digit, carrying at least one extra digit
// through a calculation and rounding only the final answer. Final answers
// are stored and printed at 3 significant figures, always with their unit
// in the solution. Exact numbers (counts, coefficients, ratios of counts)
// are exempt. Values of 1000 or more print in the form 6.53 x 10^3 at 3
// significant figures, the established house style of the science apps.
function sfR(x,sf){if(!isFinite(x)||x===0)return 0;var d=Math.pow(10,sf-Math.ceil(Math.log10(Math.abs(x))));return Math.round(x*d)/d;}
function sfSup(e){var m={"-":"\u207B","0":"\u2070","1":"\u00B9","2":"\u00B2","3":"\u00B3","4":"\u2074","5":"\u2075","6":"\u2076","7":"\u2077","8":"\u2078","9":"\u2079"};return String(e).split("").map(function(c){return m[c];}).join("");}
function sfF(x,sf){var r=sfR(x,sf);if(r===0)return "0."+"000".slice(0,Math.max(0,sf-1));var exp=Math.floor(Math.log10(Math.abs(r))),dec=sf-1-exp;if(dec<0){return (r/Math.pow(10,exp)).toFixed(sf-1)+" \u00D7 10"+sfSup(exp);}return r.toFixed(dec);}
function F3(x){return sfF(x,3);}
function iF(x){return sfF(x,4);}
function gF(x){for(var sf=3;sf<=5;sf++){if(Math.abs(sfR(x,sf)-x)<=Math.abs(x)*1e-9+1e-12)return sfF(x,sf);}return fmt(x);}

// Physics 3204 constants (data-sheet values, 3 sf house style)
var PHYS_GRAV = 6.67e-11;   // N m^2/kg^2
var PHYS_K = 8.99e9;        // N m^2/C^2
var PHYS_E = 1.60e-19;      // C, elementary charge (also J per eV)
var PHYS_H = 6.63e-34;      // J s
var PHYS_ME = 9.11e-31;     // kg, electron mass
var PHYS_MP = 1.67e-27;     // kg, proton mass
var PHYS_C = 3.00e8;        // m/s
var PHYS_G = 9.8;           // m/s^2

// ============================================================================
// Physics 3204 diagram figures (Phase C pass, Nov 2026)
// Original code-generated SVG drawings. Every figure is built inside the
// entry's own generator from that draw's values (the values recorded in
// _p, or the generator locals that feed _p), never from hardcoded numbers.
// The unknown a question asks for is labelled "?" and is never drawn to
// scale where its size or direction would give the answer away.
// No em dashes are used in any figure text.
// ============================================================================
function p32svg(W,H,body,aria){return '<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+aria+'">'+body+'</svg>';}
function p32t(x,y,s,size,bold,anchor){return _txt(x,y,s,size||12,bold||false,anchor);}
function p32line(x1,y1,x2,y2,col,w,dash){return '<line x1="'+fmt(x1,1)+'" y1="'+fmt(y1,1)+'" x2="'+fmt(x2,1)+'" y2="'+fmt(y2,1)+'" stroke="'+(col||FIG_INK)+'" stroke-width="'+(w||2)+'"'+(dash?' stroke-dasharray="5 4"':"")+'/>';}
function p32arrow(x1,y1,x2,y2,col,w){
  col=col||FIG_ACC; w=w||2.4;
  var dx=x2-x1, dy=y2-y1, L=Math.sqrt(dx*dx+dy*dy)||1, ux=dx/L, uy=dy/L, px=-uy, py=ux, hs=Math.min(10,L*0.35);
  var bx=x2-ux*hs, by=y2-uy*hs;
  return '<line x1="'+fmt(x1,1)+'" y1="'+fmt(y1,1)+'" x2="'+fmt(x2,1)+'" y2="'+fmt(y2,1)+'" stroke="'+col+'" stroke-width="'+w+'"/>'
    +'<polygon points="'+fmt(x2,1)+','+fmt(y2,1)+' '+fmt(bx+px*hs*0.42,1)+','+fmt(by+py*hs*0.42,1)+' '+fmt(bx-px*hs*0.42,1)+','+fmt(by-py*hs*0.42,1)+'" fill="'+col+'"/>';
}
function p32dot(x,y,r,fill){return '<circle cx="'+fmt(x,1)+'" cy="'+fmt(y,1)+'" r="'+(r||4)+'" fill="'+(fill||FIG_INK)+'"/>';}
function p32circ(cx,cy,r,fill,stroke,w){return '<circle cx="'+fmt(cx,1)+'" cy="'+fmt(cy,1)+'" r="'+fmt(r,1)+'" fill="'+(fill||"none")+'" stroke="'+(stroke||FIG_INK)+'" stroke-width="'+(w||2)+'"/>';}
function p32rect(x,y,w,h,fill,stroke){return '<rect x="'+fmt(x,1)+'" y="'+fmt(y,1)+'" width="'+fmt(w,1)+'" height="'+fmt(h,1)+'" fill="'+(fill||"none")+'" stroke="'+(stroke||FIG_INK)+'" stroke-width="2"/>';}
function p32bracketX(x1,x2,y,label){ // horizontal dimension bracket with end ticks
  var s=p32line(x1,y,x2,y,FIG_INK,1.4)+p32line(x1,y-5,x1,y+5,FIG_INK,1.4)+p32line(x2,y-5,x2,y+5,FIG_INK,1.4);
  if(label)s+=p32t((x1+x2)/2,y+13,label,11,false);
  return s;
}
function p32bracketY(x,y1,y2,label){ // vertical dimension bracket
  var s=p32line(x,y1,x,y2,FIG_INK,1.4)+p32line(x-5,y1,x+5,y1,FIG_INK,1.4)+p32line(x-5,y2,x+5,y2,FIG_INK,1.4);
  if(label)s+=p32t(x-6,(y1+y2)/2,label,11,false,"end");
  return s;
}
function p32arc(cx,cy,r,a1,a2,col){ // svg arc path from angle a1 to a2 (degrees, math convention, y up)
  var p1=[cx+r*Math.cos(a1*Math.PI/180), cy-r*Math.sin(a1*Math.PI/180)], p2=[cx+r*Math.cos(a2*Math.PI/180), cy-r*Math.sin(a2*Math.PI/180)];
  var large=((a2-a1+360)%360)>180?1:0;
  return '<path d="M '+fmt(p1[0],1)+' '+fmt(p1[1],1)+' A '+fmt(r,1)+' '+fmt(r,1)+' 0 '+large+' 0 '+fmt(p2[0],1)+' '+fmt(p2[1],1)+'" fill="none" stroke="'+(col||FIG_INK)+'" stroke-width="1.4"/>';
}
function p32cross(cx,cy,s){s=s||5;return p32line(cx-s,cy-s,cx+s,cy+s,FIG_INK,1.3)+p32line(cx-s,cy+s,cx+s,cy-s,FIG_INK,1.3);}

// --- Unit 1: vectors ---
function p32figVecTri(v,th){
  var O=[64,158], L=132, rad=th*Math.PI/180, E=[O[0]+L*Math.cos(rad), O[1]-L*Math.sin(rad)];
  var s=p32line(O[0],O[1],E[0],O[1],FIG_INK,1.6,true)+p32line(E[0],O[1],E[0],E[1],FIG_INK,1.6,true);
  s+=p32arrow(O[0],O[1],E[0],E[1],FIG_ACC,2.6);
  s+=p32arc(O[0],O[1],34,0,th);
  s+=p32t(O[0]+52,O[1]-8,th+"\u00B0",12,true);
  s+=p32t((O[0]+E[0])/2+6,(O[1]+E[1])/2-12,gF(v)+" m/s",12,true);
  s+=p32t((O[0]+E[0])/2,O[1]+16,"?",13,true);
  s+=p32t(O[0]-14,O[1]+4,"O",11,true);
  return p32svg(330,195,s,"Right triangle diagram: a velocity arrow at the drawn angle, with dashed east and north components");
}
function p32figVecFromComp(a,b){
  var O=[216,164], sc=9.5, Wp=[O[0]-a*sc,O[1]], T=[O[0]-a*sc,O[1]-b*sc];
  var s=p32line(O[0],O[1],Wp[0],O[1],FIG_INK,1.6,true)+p32line(Wp[0],O[1],T[0],T[1],FIG_INK,1.6,true);
  s+=p32arrow(O[0],O[1],T[0],T[1],FIG_ACC,2.6);
  s+=p32arc(O[0],O[1],30,90,Math.atan2(b,a)*180/Math.PI+90);
  s+=p32t(O[0]-44,O[1]-16,"?",13,true);
  s+=p32t((O[0]+Wp[0])/2,O[1]+16,gF(a)+" m west",11,false);
  s+=p32t(Wp[0]-8,(O[1]+T[1])/2,gF(b)+" m",11,false,"end");
  s+=p32t(T[0]-6,T[1]-12,"?",12,true);
  return p32svg(330,195,s,"Diagram: a displacement with a west component and a north component, and the resultant drawn dashed in direction only");
}
function p32figCollinear(a,b){
  var sc=190/Math.max(a,1), S=45, E1=S+a*sc, E2=E1-b*sc;
  var s=p32line(30,118,305,118,FIG_INK,1.2);
  s+=p32arrow(S,96,E1,96,FIG_ACC,2.4)+p32t((S+E1)/2,82,gF(a)+" km east",11,true);
  s+=p32arrow(E1,66,E2,66,FIG_ALT,2.4)+p32t((E1+E2)/2,52,gF(b)+" km west",11,true);
  s+=p32dot(S,118,4)+p32dot(E2,118,4);
  s+=p32bracketX(S,E2,140,"?");
  s+=p32t(S,134,"start",10,false);
  return p32svg(330,165,s,"Line diagram: a boat sails east, then back west, with the net distance from the start marked as unknown");
}
function p32figResultant2(a,b,unit){
  var sc=175/Math.max(a,b,1), O=[52,168], Ex=O[0]+a*sc, Ny=O[1]-b*sc;
  var s=p32arrow(O[0],O[1],Ex,O[1],FIG_ACC,2.2)+p32arrow(Ex,O[1],Ex,Ny,FIG_ACC,2.2);
  s+='<line x1="'+fmt(O[0],1)+'" y1="'+fmt(O[1],1)+'" x2="'+fmt(Ex,1)+'" y2="'+fmt(Ny,1)+'" stroke="'+FIG_ALT+'" stroke-width="2.4" stroke-dasharray="6 4"/>';
  s+=p32t((O[0]+Ex)/2,O[1]+16,gF(a)+" "+unit+" east",11,false);
  s+=p32t(Ex+8,(O[1]+Ny)/2,gF(b)+" "+unit+" north",11,false,"start");
  s+=p32t((O[0]+Ex)/2-14,(O[1]+Ny)/2-8,"?",13,true);
  return p32svg(330,200,s,"Diagram: two perpendicular legs and the dashed resultant, whose magnitude is unknown");
}
function p32figResultant3(a,b,c){
  var tot=a+c, sc=185/Math.max(tot,b,1), O=[46,168], x1=O[0]+a*sc, y1=O[1]-b*sc, x2=O[0]+tot*sc;
  var s=p32arrow(O[0],O[1],x1,O[1],FIG_ACC,2.1)+p32arrow(x1,O[1],x1,y1,FIG_ACC,2.1)+p32arrow(x1,y1,x2,y1,FIG_ACC,2.1);
  s+='<line x1="'+fmt(O[0],1)+'" y1="'+fmt(O[1],1)+'" x2="'+fmt(x2,1)+'" y2="'+fmt(y1,1)+'" stroke="'+FIG_ALT+'" stroke-width="2.4" stroke-dasharray="6 4"/>';
  s+=p32t((O[0]+x1)/2,O[1]+16,gF(a)+" m",11,false)+p32t(x1+8,(O[1]+y1)/2,gF(b)+" m",11,false,"start");
  s+=p32t((x1+x2)/2,y1-12,gF(c)+" m",11,false)+p32t((O[0]+x2)/2-12,(O[1]+y1)/2+16,"?",13,true);
  return p32svg(330,200,s,"Diagram: three legs, east then north then east, with the dashed resultant marked as unknown");
}
// --- Unit 1: river and aircraft ---
function p32riverBase(){
  var s=p32rect(28,58,284,96,"#dcecf5",FIG_INK);
  s+=p32t(40,48,"far bank",10,false,"start")+p32t(40,168,"near bank",10,false,"start");
  return s;
}
function p32figRiver(vb,vc,w,mode){
  var s=p32riverBase(), bx=110, by=154, top=58;
  if(mode==="heading"){
    s+=p32arrow(bx,by,bx-42,by-78,FIG_ACC,2.4);
    s+=p32t(bx-58,by-52,gF(vb)+" m/s",11,true);
    s+=p32arrow(bx,by-88,bx+62,by-88,FIG_ALT,2.2)+p32t(bx+34,by-100,gF(vc)+" m/s",11,false);
    s+='<line x1="'+bx+'" y1="'+by+'" x2="'+bx+'" y2="'+top+'" stroke="'+FIG_INK+'" stroke-width="2.2" stroke-dasharray="6 4"/>';
    s+=p32arc(bx,by,30,90,122)+p32t(bx-16,by-38,"?",12,true);
    s+=p32dot(bx,top,4)+p32t(bx+10,top-4,"dock",10,false,"start");
  } else {
    s+=p32arrow(bx,by,bx,top,FIG_ACC,2.4)+p32t(bx-8,(by+top)/2,gF(vb)+" m/s",11,true,"end");
    s+=p32arrow(bx,by,bx+66,by-46,FIG_INK,2.0);
    s+=p32arrow(bx,top,bx+66,top,FIG_ALT,2.2)+p32t(bx+36,top-12,gF(vc)+" m/s",11,false);
    if(mode==="resultant"){
      s+='<line x1="'+bx+'" y1="'+by+'" x2="'+fmt(bx+66,1)+'" y2="'+top+'" stroke="'+FIG_ALT+'" stroke-width="2.2" stroke-dasharray="6 4"/>';
      s+=p32t(bx+52,by-58,"?",13,true);
    }
    if(mode==="time"||mode==="drift"){
      s+=p32bracketY(52,top,by,gF(w)+" m");
    }
    if(mode==="drift"){
      s+='<line x1="'+bx+'" y1="'+top+'" x2="'+fmt(bx+66,1)+'" y2="'+top+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
      s+=p32dot(bx+66,top,4)+p32bracketX(bx,bx+66,34,"?");
      s+=p32t(bx,top-10,"opposite point",9,false);
    }
  }
  s+=p32dot(bx,by,4.5);
  return p32svg(340,190,s,"River diagram: a boat velocity across the river, a current along the river, and the shore reference points named in the question");
}
function p32figAircraft(va,vw,mode){
  var O=[86,168], s="";
  s+=p32line(30,168,310,168,FIG_INK,1.1)+p32line(86,182,86,22,FIG_INK,1.1);
  s+=p32t(300,158,"E",11,true)+p32t(96,30,"N",11,true);
  if(mode==="heading"){
    s+=p32arrow(O[0],O[1],O[0]-44,O[1]-96,FIG_ACC,2.4)+p32t(O[0]-64,O[1]-58,gF(va)+" km/h",11,true);
    s+=p32arrow(O[0]-44,O[1]-96,O[0]+34,O[1]-96,FIG_ALT,2.2)+p32t(O[0]+2,O[1]-108,gF(vw)+" km/h",11,false);
    s+='<line x1="'+O[0]+'" y1="'+O[1]+'" x2="'+O[0]+'" y2="34" stroke="'+FIG_INK+'" stroke-width="2.2" stroke-dasharray="6 4"/>';
    s+=p32arc(O[0],O[1],32,90,114)+p32t(O[0]-18,O[1]-40,"?",12,true);
  } else {
    s+=p32arrow(O[0],O[1],O[0],O[1]-104,FIG_ACC,2.4)+p32t(O[0]-10,O[1]-56,gF(va)+" km/h",11,true,"end");
    s+=p32arrow(O[0],O[1]-104,O[0]+78,O[1]-104,FIG_ALT,2.2)+p32t(O[0]+42,O[1]-116,gF(vw)+" km/h",11,false);
    s+='<line x1="'+O[0]+'" y1="'+O[1]+'" x2="'+fmt(O[0]+78,1)+'" y2="'+fmt(O[1]-104,1)+'" stroke="'+FIG_ALT+'" stroke-width="2.2" stroke-dasharray="6 4"/>';
    s+=p32t(O[0]+46,O[1]-44,"?",13,true);
  }
  return p32svg(340,200,s,"Velocity triangle diagram for an aircraft in a crosswind, with the ground velocity dashed and unknown");
}
function p32figRoundTrip(d,vb,vc){
  var s=p32rect(28,52,284,86,"#dcecf5",FIG_INK);
  s+=p32arrow(60,76,282,76,FIG_ACC,2.4)+p32t(171,62,gF(d)+" m downstream",11,true);
  s+=p32arrow(282,118,60,118,FIG_ALT,2.4)+p32t(171,134,gF(d)+" m upstream",11,true);
  s+=p32t(171,160,"boat "+gF(vb)+" m/s in still water, current "+gF(vc)+" m/s",11,false);
  return p32svg(340,175,s,"River diagram: a downstream leg and an equal upstream leg, with the boat speed and current speed labelled");
}
// --- Unit 1: projectiles ---
function p32traj(x0,y0,x1,y1,sag){
  var mx=(x0+x1)/2, my=Math.min(y0,y1)-sag;
  return '<path d="M '+fmt(x0,1)+' '+fmt(y0,1)+' Q '+fmt(mx,1)+' '+fmt(my,1)+' '+fmt(x1,1)+' '+fmt(y1,1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2" stroke-dasharray="6 4"/>';
}
function p32figCliff(hLabel,vLabel,rLabel,showTraj){
  var s=p32rect(28,42,44,138,FIG_SHADE,FIG_INK);
  s+=p32line(28,180,318,180,FIG_INK,2)+p32t(300,194,"water",10,false);
  if(vLabel!==null&&vLabel!=="")s+=p32arrow(72,42,128,42,FIG_ACC,2.4)+p32t(104,28,vLabel,11,true);
  else if(vLabel===null)s+=p32arrow(72,42,112,42,FIG_ACC,2.4);
  if(showTraj)s+=p32traj(72,42,268,180,26);
  s+=p32dot(268,180,4);
  s+=p32bracketY(16,42,180,hLabel);
  if(rLabel!==null&&rLabel!=="")s+=p32bracketX(72,268,196,rLabel);
  return p32svg(330,212,s,"Cliff diagram: a horizontal launch from the top of a cliff, with the height and landing distance labelled as in the question");
}
function p32figLaunch(v,th,mode){
  var s=p32line(24,182,316,182,FIG_INK,2), O=[58,182], rad=th*Math.PI/180, E=[O[0]+64*Math.cos(rad),O[1]-64*Math.sin(rad)];
  s+=p32arrow(O[0],O[1],E[0],E[1],FIG_ACC,2.6)+p32t(E[0]+16,E[1]-8,gF(v)+" m/s",11,true);
  s+=p32arc(O[0],O[1],36,0,th)+p32t(O[0]+50,O[1]-10,th+"\u00B0",11,true);
  if(mode==="components"){
    s+=p32line(O[0],O[1],E[0],O[1],FIG_INK,1.6,true)+p32line(E[0],O[1],E[0],E[1],FIG_INK,1.6,true);
    s+=p32t(E[0]+10,(O[1]+E[1])/2,"?",13,true,"start");
  }
  if(mode==="maxheight"){
    s+=p32traj(O[0],O[1],282,O[1],86);
    s+=p32bracketY(288,182-86,182,"?")+p32line(58,96,282,96,FIG_INK,1.1,true);
  }
  if(mode==="range"){
    s+=p32traj(O[0],O[1],282,O[1],86);
    s+=p32bracketX(O[0],282,200,"?");
  }
  return p32svg(330,216,s,"Launch diagram: a projectile launched at the drawn speed and angle, with the asked quantity marked as unknown");
}
function p32figFence(v,th,d,hf){
  var s=p32line(24,182,316,182,FIG_INK,2), O=[58,182], rad=th*Math.PI/180, E=[O[0]+56*Math.cos(rad),O[1]-56*Math.sin(rad)];
  s+=p32arrow(O[0],O[1],E[0],E[1],FIG_ACC,2.6)+p32t(E[0]+14,E[1]-6,gF(v)+" m/s",11,true);
  s+=p32arc(O[0],O[1],32,0,th)+p32t(O[0]+46,O[1]-8,th+"\u00B0",11,true);
  s+=p32rect(238,112,7,70,FIG_ALT,FIG_INK)+p32bracketY(262,112,182,gF(hf)+" m");
  s+=p32bracketX(O[0],242,200,gF(d)+" m");
  s+=p32t(242,100,"fence",10,true);
  return p32svg(330,216,s,"Diagram: a ball launched toward a fence at the drawn distance and height. No flight path is drawn, so the diagram does not show whether the ball clears the fence");
}
function p32figMom2D(lab1,lab2,third){
  var s="";
  if(third){
    var C=[158,108];
    s+=p32dot(C[0],C[1],5.5,FIG_ALT)+p32t(C[0]+12,C[1]-14,"explosion",10,false,"start");
    s+=p32arrow(C[0],C[1],C[0]+104,C[1],FIG_ACC,2.4)+p32t(C[0]+54,C[1]+18,lab1,11,true);
    s+=p32arrow(C[0],C[1],C[0],C[1]-84,FIG_ACC,2.4)+p32t(C[0]-8,C[1]-44,lab2,11,true,"end");
    s+=p32arrow(C[0],C[1],C[0]-74,C[1]+60,FIG_ALT,2.4)+p32t(C[0]-84,C[1]+78,third,11,true);
    return p32svg(330,196,s,"Explosion diagram: two pieces fly east and north as stated, and the third piece flies in the opposite combined direction with its speed unknown");
  }
  var O=[70,164];
  s+=p32arrow(O[0],O[1],O[0]+118,O[1],FIG_ACC,2.4)+p32t(O[0]+60,O[1]+18,lab1,11,true);
  s+=p32arrow(O[0],O[1],O[0],O[1]-108,FIG_ACC,2.4)+p32t(O[0]-8,O[1]-58,lab2,11,true,"end");
  s+='<line x1="'+O[0]+'" y1="'+O[1]+'" x2="'+fmt(O[0]+118,1)+'" y2="'+fmt(O[1]-108,1)+'" stroke="'+FIG_ALT+'" stroke-width="2.4" stroke-dasharray="6 4"/>';
  s+=p32t(O[0]+86,O[1]-62,"?",13,true);
  return p32svg(330,196,s,"Momentum diagram: perpendicular east and north momenta, with the combined direction shown dashed and its value unknown");
}
// --- Unit 2: circular motion, inclines, torques ---
function p32figCircleTop(rLabel,vLabel,mLabel,withString){
  var s=p32circ(158,102,72,"none",FIG_INK,2.2);
  s+=p32dot(158,102,3.5);
  if(withString)s+=p32line(158,102,230,102,FIG_INK,2);
  else s+=p32line(158,102,230,102,FIG_INK,1.5,true);
  s+=p32t(194,90,rLabel,11,true);
  s+=p32dot(230,102,6,FIG_ACC);
  if(vLabel)s+=p32arrow(230,102,230,44,FIG_ACC,2.3)+p32t(246,66,vLabel,11,true,"start");
  if(mLabel)s+=p32t(230,124,mLabel,11,true);
  return p32svg(330,195,s,"Diagram of circular motion, with the radius and the values named in the question labelled");
}
function p32figLoop(r,v,m,pos){
  var top=(pos==="top"), bx=164, by=top?32:176;
  var s=p32circ(164,104,72,"none",FIG_INK,2.4);
  s+=p32line(164,104,bx,by,FIG_INK,1.5,true)+p32t(176,top?66:142,gF(r)+" m",11,true,"start");
  s+=p32dot(bx,by,7,FIG_ACC);
  if(v)s+=p32arrow(bx,by,bx+52,by,FIG_ACC,2.3)+p32t(bx+30,by+(top?-14:20),gF(v)+" m/s",11,true);
  if(m)s+=p32t(bx-12,by+(top?-14:20),gF(m)+" kg",11,true,"end");
  s+=p32line(60,188,268,188,FIG_INK,1.4);
  return p32svg(330,200,s,"Side view diagram of a ball at the "+pos+" of a vertical loop, with radius and speed labelled");
}
function p32figDip(r,v,m){
  var s='<path d="M 52 62 A 118 118 0 0 0 276 62" fill="none" stroke="'+FIG_INK+'" stroke-width="2.6"/>';
  s+=p32line(164,52,164,170,FIG_INK,1.4,true)+p32t(176,112,gF(r)+" m",11,true,"start");
  s+=p32dot(164,52,3);
  s+=p32dot(164,170,7,FIG_ACC);
  s+=p32arrow(164,170,222,170,FIG_ACC,2.3)+p32t(198,156,gF(v)+" m/s",11,true);
  if(m)s+=p32t(164,192,gF(m)+" kg",11,true);
  return p32svg(330,204,s,"Side view diagram of the bottom of a bowl shaped dip, with radius, speed and mass labelled");
}
function p32figCrestDip(kind){
  var s="";
  if(kind==="loop"){
    s+=p32circ(165,98,62,"none",FIG_INK,2.6)+p32dot(165,36,7,FIG_ACC)+p32arrow(165,36,215,36,FIG_ACC,2.2);
    s+=p32t(165,182,"top of the loop, at the minimum speed",10,false);
    return p32svg(330,195,s,"Diagram: a car at the top of a vertical loop at the minimum speed named in the question");
  }
  if(kind==="crest")s+='<path d="M 40 150 A 150 150 0 0 1 290 150" fill="none" stroke="'+FIG_INK+'" stroke-width="2.6"/>';
  else if(kind==="dip")s+='<path d="M 40 60 A 150 150 0 0 0 290 60" fill="none" stroke="'+FIG_INK+'" stroke-width="2.6"/>';
  else s+=p32line(40,130,290,130,FIG_INK,2.6);
  var cy=(kind==="crest")?58:(kind==="dip")?168:118;
  s+=p32dot(165,cy,7,FIG_ACC)+p32arrow(165,cy,215,cy,FIG_ACC,2.2);
  return p32svg(330,195,s,"Road profile diagram named in the question, with a vehicle at the named point");
}
function p32figBanked(v,r){
  var s=p32line(46,168,286,168,FIG_INK,1.4);
  s+=p32line(66,150,272,74,FIG_INK,2.8);
  s+=p32line(240,168,272,168,FIG_INK,1.3,true)+p32line(240,168,272,74,FIG_INK,1.1,true);
  s+=p32arc(240,168,34,0,20)+p32t(212,158,"?",13,true);
  s+=p32circ(178,104,9,FIG_SHADE,FIG_INK);
  s+=p32t(90,44,"speed "+gF(v)+" m/s",11,true,"start")+p32t(90,62,"curve radius "+gF(r)+" m",11,false,"start");
  return p32svg(330,185,s,"Cross section diagram of a banked curve. The banking angle is the unknown and the slope is drawn schematically, not to scale");
}
function p32figIncline(ang,mLabel,extra){
  var rad=ang*Math.PI/180, x2=292, y2=178-218*Math.tan(rad); if(y2<52)y2=52;
  var s=p32line(36,178,x2,178,FIG_INK,1.6)+p32line(36,178,x2,y2,FIG_INK,2.6)+p32line(x2,178,x2,y2,FIG_INK,1.2);
  s+=p32arc(36,178,40,0,ang)+p32t(84,166,ang+"\u00B0",11,true);
  var bx=36+(x2-36)*0.52, by=178-(178-y2)*0.52;
  s+='<g transform="rotate('+(-ang)+' '+fmt(bx,1)+' '+fmt(by,1)+')">'+p32rect(bx-17,by-30,34,20,FIG_SHADE,FIG_INK)+'</g>';
  if(mLabel)s+=p32t(bx+2,by-44,mLabel,11,true);
  if(extra==="components"){
    s+=p32arrow(bx,by-10,bx,by+42,FIG_ALT,2.2);
    s+='<line x1="'+fmt(bx,1)+'" y1="'+fmt(by-10,1)+'" x2="'+fmt(bx+52*Math.cos(rad),1)+'" y2="'+fmt(by-10+52*Math.sin(rad),1)+'" stroke="'+FIG_INK+'" stroke-width="2" stroke-dasharray="5 4"/>';
    s+=p32t(bx+62,by+22,"?",13,true);
  }
  if(extra==="friction"){
    var ux=Math.cos(rad), uy=-Math.sin(rad);
    s+=p32arrow(bx-ux*36,by-uy*36-12,bx-ux*6,by-uy*6-12,FIG_ALT,2.2)+p32t(bx-ux*44,by-uy*44-20,"friction",10,false);
    s+=p32arrow(bx,by-10,bx,by+38,FIG_INK,2.0);
  }
  if(extra==="push"){
    var ux2=Math.cos(rad), uy2=-Math.sin(rad);
    s+=p32arrow(bx-ux2*58,by-uy2*58-12,bx-ux2*22,by-uy2*22-12,FIG_ACC,2.4)+p32t(bx-ux2*66,by-uy2*66-20,"push",10,false);
    s+=p32arrow(bx+ux2*22,by+uy2*22-12,bx+ux2*54,by+uy2*54-12,FIG_ALT,2.2)+p32t(bx+ux2*62,by+uy2*62+2,"friction",10,false,"start");
  }
  return p32svg(330,196,s,"Incline diagram at the drawn angle, with the block and the forces named in the question");
}
function p32figPulleyH(mt,mh){
  var s=p32line(30,96,238,96,FIG_INK,2.6)+p32line(30,96,30,150,FIG_INK,1.4)+p32line(238,96,238,150,FIG_INK,1.4);
  s+=p32rect(96,74,44,22,FIG_SHADE,FIG_INK)+p32t(118,62,gF(mt)+" kg",11,true);
  s+=p32circ(244,102,10,"none",FIG_INK,2);
  s+=p32line(140,82,244,94,FIG_INK,1.6)+p32line(254,102,254,140,FIG_INK,1.6);
  s+=p32rect(236,140,36,24,FIG_SHADE,FIG_INK)+p32t(254,178,gF(mh)+" kg",11,true);
  s+=p32t(150,40,"frictionless table",10,false);
  return p32svg(330,192,s,"Diagram: a block on a horizontal table connected over a pulley to a hanging mass, with both masses labelled");
}
function p32figPulleyIncline(mi,mh,ang,mu){
  var rad=ang*Math.PI/180, x2=268, y2=178-190*Math.tan(rad); if(y2<46)y2=46;
  var s=p32line(30,178,296,178,FIG_INK,1.6)+p32line(30,178,x2,y2,FIG_INK,2.6);
  s+=p32arc(30,178,38,0,ang)+p32t(76,166,ang+"\u00B0",11,true);
  var bx=30+(x2-30)*0.42, by=178-(178-y2)*0.42;
  s+='<g transform="rotate('+(-ang)+' '+fmt(bx,1)+' '+fmt(by,1)+')">'+p32rect(bx-16,by-28,32,19,FIG_SHADE,FIG_INK)+'</g>';
  s+=p32t(bx,by-42,gF(mi)+" kg",11,true);
  s+=p32line(bx,by-24,x2,y2+4,FIG_INK,1.6)+p32circ(x2+4,y2+2,9,"none",FIG_INK,2);
  s+=p32line(x2+13,y2+2,x2+13,y2+52,FIG_INK,1.6)+p32rect(x2-4,y2+52,34,23,FIG_SHADE,FIG_INK);
  s+=p32t(x2+13,y2+90,gF(mh)+" kg",11,true);
  s+=p32t(150,196,"mu_k = "+gF(mu),10,false);
  return p32svg(330,206,s,"Diagram: a block on an incline connected up the slope over a pulley to a hanging mass, with masses, angle and friction coefficient labelled");
}
function p32figWrench(F,d,phi){
  var dx=70+d*300, s=p32circ(66,118,13,"none",FIG_INK,2.4)+p32dot(66,118,3);
  s+=p32line(66,118,dx,118,FIG_INK,3);
  s+=p32bracketX(66,dx,148,gF(d)+" m");
  if(phi===null){
    s+=p32arrow(dx,74,dx,112,FIG_ALT,2.5)+p32t(dx+10,66,gF(F)+" N",11,true,"start");
  } else {
    var rad=phi*Math.PI/180, sx=dx+58*Math.cos(rad), sy=118-58*Math.sin(rad);
    s+=p32arrow(sx,sy,dx,118,FIG_ALT,2.5)+p32t(sx+8,sy-8,gF(F)+" N",11,true,"start");
    s+=p32line(dx,118,dx+52,118,FIG_INK,1.2,true)+p32arc(dx,118,38,0,phi)+p32t(dx+50,96,phi+"\u00B0",11,true,"start");
  }
  return p32svg(340,168,s,"Wrench diagram: a force applied at the end of a handle at the drawn distance, and at the drawn angle where the question gives one");
}
function p32figSign(L,m,d){
  var x1=64,x2=272, cmx=x1+(d/L)*(x2-x1);
  var s=p32line(40,30,296,30,FIG_INK,2.4);
  s+=p32line(x1,30,x1,74,FIG_INK,1.8)+p32line(x2,30,x2,74,FIG_INK,1.8);
  s+=p32rect(x1,74,x2-x1,52,FIG_SHADE,FIG_INK)+p32t((x1+x2)/2,104,gF(m)+" kg sign",12,true);
  s+=p32dot(cmx,100,4.5,FIG_ALT)+p32line(cmx,74,cmx,126,FIG_ALT,1.4,true);
  s+=p32bracketX(x1,x2,20,"span "+gF(L)+" m");
  s+=p32bracketX(x1,cmx,142,"centre of mass "+gF(d)+" m from left wire");
  return p32svg(340,158,s,"Diagram: a sign hanging from two vertical wires, with the span and the centre of mass position labelled");
}
function p32figSeesaw(m1,d1,m2){
  var s=p32line(38,86,302,86,FIG_INK,3);
  s+='<polygon points="170,88 154,118 186,118" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+=p32line(30,118,310,118,FIG_INK,1.4);
  var lx=170-d1*52;
  s+=p32circ(lx,66,9,FIG_SHADE,FIG_INK)+p32t(lx,48,gF(m1)+" kg",11,true);
  s+=p32circ(238,66,9,FIG_SHADE,FIG_INK)+p32t(238,48,gF(m2)+" kg",11,true);
  s+=p32bracketX(lx,170,132,gF(d1)+" m")+p32bracketX(170,238,132,"?");
  s+=p32t(170,140,"pivot",9,false);
  return p32svg(330,150,s,"Seesaw diagram: one child at the drawn distance, the balancing distance of the second child marked as unknown");
}
function p32figMetreStick(p,ms){
  var x0=42,x1=302, px=x0+p*260;
  var s=p32rect(x0,82,x1-x0,16,FIG_SHADE,FIG_INK);
  [0,0.25,0.5,0.75,1].forEach(function(f){var x=x0+f*260;s+=p32line(x,82,x,92,FIG_INK,1.2)+p32t(x,72,Math.round(f*100)+" cm",9,false);});
  s+='<polygon points="'+fmt(px,1)+',100 '+fmt(px-11,1)+',124 '+fmt(px+11,1)+',124" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+=p32line(x0,98,x0,122,FIG_INK,1.6)+p32rect(x0-13,122,26,18,FIG_ALT,FIG_INK)+p32t(x0,154,"?",12,true);
  s+=p32dot(x0+130,90,4,FIG_ALT)+p32t(x0+130,112,"centre, 50 cm",9,false);
  s+=p32t(220,140,"stick "+gF(ms)+" kg, pivot at "+fmt(p*100,0)+" cm",10,false);
  return p32svg(330,162,s,"Metre stick diagram: a uniform stick pivoted at the drawn mark, with a balancing mass hung at the zero end");
}
function p32figBeam(L,mb,ml,x){
  var x0=52,x1=52+L*62, cx=x0+(x/L)*(x1-x0);
  var s=p32line(x0,96,x1,96,FIG_INK,4);
  s+='<polygon points="'+x0+',100 '+(x0-12)+',124 '+(x0+12)+',124" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<polygon points="'+x1+',100 '+(x1-12)+',124 '+(x1+12)+',124" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+=p32rect(cx-16,68,32,26,FIG_SHADE,FIG_INK)+p32t(cx,56,gF(ml)+" kg crate",11,true);
  s+=p32bracketX(x0,cx,140,gF(x)+" m")+p32bracketX(x0,x1,158,gF(L)+" m");
  s+=p32t((x0+x1)/2,84,"plank "+gF(mb)+" kg",10,false);
  return p32svg(340,172,s,"Beam diagram: a uniform plank on two end supports, with a crate at the drawn position");
}
function p32figBridge(mb,mw){
  var s=p32line(52,100,288,100,FIG_INK,4);
  s+='<polygon points="52,104 40,128 64,128" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<polygon points="288,104 276,128 300,128" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+=p32circ(170,66,8,FIG_SHADE,FIG_INK)+p32line(170,74,170,98,FIG_INK,2)+p32t(170,48,gF(mw)+" kg worker",11,true);
  s+=p32t(170,146,"plank "+gF(mb)+" kg",11,false);
  return p32svg(330,158,s,"Bridge diagram: a uniform plank on two supports with a worker standing at its centre");
}
function p32figLadder(m,ang,L){
  var rad=ang*Math.PI/180, fx=92, fy=178, tx=fx+150*Math.cos(rad), ty=fy-150*Math.sin(rad);
  var s=p32line(30,178,306,178,FIG_INK,2)+p32line(tx+22,178,tx+22,26,FIG_INK,2.4);
  s+=p32line(fx,fy,tx,ty,FIG_INK,3.2);
  for(var i=1;i<=4;i++){var t=i/5;s+=p32line(fx+(tx-fx)*t,fy+(ty-fy)*t,fx+(tx-fx)*t+10,fy+(ty-fy)*t-4,FIG_INK,1.2);}
  s+=p32arc(fx,fy,36,0,ang)+p32t(fx+48,fy-10,ang+"\u00B0",11,true);
  s+=p32t((fx+tx)/2-16,(fy+ty)/2,gF(L)+" m, "+gF(m)+" kg",11,true,"end");
  s+=p32t(tx+30,60,"smooth wall",10,false,"start");
  return p32svg(330,192,s,"Ladder diagram: a uniform ladder leaning against a smooth wall at the drawn angle, with length and mass labelled");
}

// --- Unit 3: circuits ---
function p32resistorH(x,y,len,label){ // horizontal zigzag resistor centred at x,y
  var s='<polyline points="'+fmt(x-len/2,1)+','+y+' '+fmt(x-len/2+6,1)+','+y+' '+fmt(x-len/2+11,1)+','+(y-8)+' '+fmt(x-len/2+19,1)+','+(y+8)+' '+fmt(x-len/2+27,1)+','+(y-8)+' '+fmt(x-len/2+35,1)+','+(y+8)+' '+fmt(x-len/2+41,1)+','+y+' '+fmt(x+len/2,1)+','+y+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  if(label)s+=p32t(x,y-16,label,11,true);
  return s;
}
function p32resistorV(x,y,len,label){ // vertical zigzag resistor
  var s='<polyline points="'+x+','+fmt(y-len/2,1)+' '+x+','+fmt(y-len/2+6,1)+' '+(x-8)+','+fmt(y-len/2+11,1)+' '+(x+8)+','+fmt(y-len/2+19,1)+' '+(x-8)+','+fmt(y-len/2+27,1)+' '+(x+8)+','+fmt(y-len/2+35,1)+' '+x+','+fmt(y-len/2+41,1)+' '+x+','+fmt(y+len/2,1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  if(label)s+=p32t(x+14,y,label,11,true,"start");
  return s;
}
function p32rawV(V){return (typeof V==="number"&&Math.round(V)===V)?String(V):gF(V);} // stem-exact label: integers print raw, other values at house precision
function p32batteryV(x,y,V){ // battery on a vertical wire segment
  var s=p32line(x,y-26,x,y-4,FIG_INK,2)+p32line(x,y+4,x,y+26,FIG_INK,2);
  s+=p32line(x-14,y-4,x+14,y-4,FIG_INK,2.6)+p32line(x-6,y+4,x+6,y+4,FIG_INK,2.6);
  s+=p32t(x-10,y,(V!==null&&V!=="")?p32rawV(V)+" V":"",11,true,"end");
  return s;
}
function p32figCircuitSeries(V,labels){
  var top=52, bot=152, x0=64, x1=276, s="";
  s+=p32line(x0,top,x1,top,FIG_INK,2)+p32line(x1,top,x1,bot,FIG_INK,2)+p32line(x1,bot,x0,bot,FIG_INK,2);
  var n=labels.length;
  for(var i=0;i<n;i++){var cx=x0+(x1-x0)*(i+0.5)/n; s+=p32resistorH(cx,top,52,labels[i]);}
  s+=p32line(x0,bot,x0,top,FIG_INK,2);
  s+=p32batteryV(x0,(top+bot)/2,V);
  return p32svg(340,178,s,"Circuit diagram: a source in series with the resistors named in the question, values labelled");
}
function p32figCircuitParallel(V,r1,r2){
  var s=p32line(64,48,276,48,FIG_INK,2)+p32line(64,156,276,156,FIG_INK,2);
  s+=p32line(64,48,64,156,FIG_INK,2)+p32batteryV(64,102,V);
  s+=p32line(150,48,150,156,FIG_INK,2)+p32resistorV(150,102,52,p32rawV(r1)+" \u03A9");
  s+=p32line(240,48,240,156,FIG_INK,2)+p32resistorV(240,102,52,p32rawV(r2)+" \u03A9");
  s+=p32dot(150,48,3.5)+p32dot(240,48,3.5)+p32dot(150,156,3.5)+p32dot(240,156,3.5);
  return p32svg(340,180,s,"Circuit diagram: a source across two parallel branches, with each branch resistance labelled");
}
function p32figCircuitCombo(V,r1,r2,r3){
  var s=p32line(56,48,286,48,FIG_INK,2)+p32line(56,156,286,156,FIG_INK,2);
  s+=p32line(56,48,56,156,FIG_INK,2)+p32batteryV(56,102,V);
  s+=p32resistorH(112,48,52,p32rawV(r1)+" \u03A9");
  s+=p32line(196,48,196,84,FIG_INK,2)+p32line(196,120,196,156,FIG_INK,2)+p32resistorV(196,102,36,p32rawV(r2)+" \u03A9");
  s+=p32line(262,48,262,84,FIG_INK,2)+p32line(262,120,262,156,FIG_INK,2)+p32resistorV(262,102,36,p32rawV(r3)+" \u03A9");
  s+=p32line(196,48,262,48,FIG_INK,2)+p32line(196,156,262,156,FIG_INK,2);
  s+=p32line(286,48,286,156,FIG_INK,2);
  return p32svg(340,180,s,"Circuit diagram: one resistor in series with a parallel pair, all values labelled as in the question");
}
function p32figJunction(a,b,c){
  var cx=168, cy=102, s="";
  s+=p32arrow(52,64,cx-14,cy-6,FIG_ACC,2.3)+p32t(76,48,fmt(a,2)+" A in",11,true);
  s+=p32arrow(52,142,cx-14,cy+6,FIG_ACC,2.3)+p32t(76,162,fmt(b,2)+" A in",11,true);
  s+=p32arrow(cx+14,cy-6,284,64,FIG_ALT,2.3)+p32t(258,48,fmt(c,2)+" A out",11,true);
  s+=p32arrow(cx+14,cy+6,284,142,FIG_ALT,2.3)+p32t(258,162,"? A out",11,true);
  s+=p32dot(cx,cy,6,FIG_INK)+p32t(cx,cy-18,"junction",10,true);
  return p32svg(340,180,s,"Junction diagram: two currents flow in, one known current and one unknown current flow out");
}
function p32figLoopDrops(emf,v1,v2){
  var s=p32line(64,52,276,52,FIG_INK,2)+p32line(276,52,276,152,FIG_INK,2)+p32line(276,152,64,152,FIG_INK,2)+p32line(64,152,64,52,FIG_INK,2);
  s+=p32batteryV(64,102,emf);
  s+=p32resistorH(128,52,52,"drop "+fmt(v1,2)+" V")+p32resistorH(216,52,52,"drop "+fmt(v2,2)+" V");
  s+=p32resistorH(170,152,52,"drop ? V");
  return p32svg(340,178,s,"Loop diagram: a battery and three resistors in series, with two potential drops given and the third unknown");
}
// --- Unit 3: charges and fields ---
function p32figPointCharge(Q,r){
  var s=p32circ(140,102,15,FIG_SHADE,FIG_INK)+p32t(140,102,"+"+gF(Q),11,true);
  for(var i=0;i<8;i++){var a=i*Math.PI/4;s+=p32line(140+20*Math.cos(a),102+20*Math.sin(a),140+52*Math.cos(a),102+52*Math.sin(a),FIG_INK,1.3);}
  s+=p32t(140,66,"+"+gF(Q)+" \u03BCC",11,true);
  s+=p32dot(252,102,4.5,FIG_ALT)+p32t(252,84,"P",12,true);
  s+=p32bracketX(140,252,140,gF(r)+" m");
  return p32svg(330,158,s,"Diagram: a single positive point charge with radial field lines and a point P at the drawn distance");
}
function p32figMidway(q1,q2,d,opp){
  var s=p32circ(74,96,15,FIG_SHADE,FIG_INK)+p32t(74,96,"+",12,true)+p32t(74,66,"A: +"+gF(q1)+" \u03BCC",11,true);
  s+=p32circ(266,96,15,FIG_SHADE,FIG_INK)+p32t(266,96,opp?"\u2212":"+",12,true)+p32t(266,66,"B: "+(opp?"\u2212":"+")+gF(q2)+" \u03BCC",11,true);
  s+=p32line(89,96,251,96,FIG_INK,1.3)+p32dot(170,96,4.5,FIG_ALT)+p32t(170,80,"midway P",11,true);
  s+=p32bracketX(74,266,128,gF(d)+" m");
  return p32svg(340,148,s,"Diagram: two charges separated by the drawn distance, with the midway point marked");
}
function p32figTwoChargesPoint(q1,q2,d1,d2){
  var nx=52, px=52+Math.round((d2-d1)/d2*150), Px=278;
  var s=p32circ(nx,92,14,FIG_SHADE,FIG_INK)+p32t(nx,92,"\u2212",12,true)+p32t(nx,62,"\u2212"+gF(q2)+" \u03BCC",11,true);
  s+=p32circ(px,92,14,FIG_SHADE,FIG_INK)+p32t(px,92,"+",12,true)+p32t(px,62,"+"+gF(q1)+" \u03BCC",11,true);
  s+=p32line(nx+14,92,Px,92,FIG_INK,1.2)+p32dot(Px,92,4.5,FIG_ALT)+p32t(Px,74,"P",12,true);
  s+=p32bracketX(px,Px,124,gF(d1)+" m")+p32bracketX(nx,Px,148,gF(d2)+" m");
  return p32svg(340,168,s,"Diagram: a negative and a positive charge on a line, with point P beyond the positive charge at the drawn distances");
}
function p32figZeroPoint(q1,q2,d){
  var s=p32circ(70,92,14,FIG_SHADE,FIG_INK)+p32t(70,92,"+",12,true)+p32t(70,62,"+"+gF(q1)+" \u03BCC (smaller)",10,true);
  s+=p32circ(270,92,16,FIG_SHADE,FIG_INK)+p32t(270,92,"+",12,true)+p32t(270,62,"+"+gF(q2)+" \u03BCC",11,true);
  s+=p32line(84,92,254,92,FIG_INK,1.2);
  s+=p32dot(158,92,4.5,FIG_ALT)+p32t(158,74,"zero field point",10,true);
  s+=p32bracketX(70,270,124,gF(d)+" m")+p32bracketX(70,158,148,"?");
  s+=p32t(170,166,"point drawn schematically, not to scale",9,false);
  return p32svg(340,176,s,"Diagram: two positive charges with a zero field point between them. The point is drawn schematically and its distance is unknown");
}
function p32figTwoSpheres(lab1,lab2,distLabel){
  var s=p32circ(96,92,17,FIG_SHADE,FIG_INK)+p32t(96,92,lab1.indexOf("-")===0||lab1.indexOf("\u2212")===0?"\u2212":"+",12,true)+p32t(96,58,lab1,11,true);
  s+=p32circ(244,92,17,FIG_SHADE,FIG_INK)+p32t(244,92,lab2.indexOf("-")===0||lab2.indexOf("\u2212")===0?"\u2212":"+",12,true)+p32t(244,58,lab2,11,true);
  s+=p32line(113,92,227,92,FIG_INK,1.2)+p32bracketX(96,244,128,distLabel);
  return p32svg(340,146,s,"Diagram: two charged spheres with the separation labelled as in the question");
}
function p32figCollinear3(qA,qB,qC,dAB,dBC){
  var tot=dAB+dBC, ax=48, bx=ax+Math.round(dAB/tot*200), cx=ax+244;
  var s="";
  [[ax,qA,"A"],[bx,qB,"B"],[cx,qC,"C"]].forEach(function(c){
    s+=p32circ(c[0],90,14,FIG_SHADE,FIG_INK)+p32t(c[0],90,"+",11,true)+p32t(c[0],60,c[2]+": +"+gF(c[1])+" \u03BCC",10,true);
  });
  s+=p32line(ax+14,90,cx-14,90,FIG_INK,1.2);
  s+=p32bracketX(ax,bx,122,gF(dAB)+" m")+p32bracketX(bx,cx,122,gF(dBC)+" m");
  s+=p32t(bx,140,"net force on B: ?",11,true);
  return p32svg(340,152,s,"Diagram: three positive charges on a line in the order A, B, C, with both separations labelled");
}
function p32figChargeTriangle(cornerLabel,sideLabA,sideLabB,a,b){
  var Px=84, Py=140, Ax=84, Ay=56, Bx=238, By=140;
  var s=p32line(Px,Py,Ax,Ay,FIG_INK,1.6)+p32line(Px,Py,Bx,By,FIG_INK,1.6)+p32line(Ax,Ay,Bx,By,FIG_INK,1.1,true);
  s+=p32line(Px,Py,Px+16,Py,FIG_INK,1.2)+p32line(Px+16,Py,Px+16,Py-16,FIG_INK,1.2)+p32line(Px,Py-16,Px+16,Py-16,FIG_INK,1.2);
  s+=p32circ(Px,Py,13,FIG_SHADE,FIG_INK)+p32t(Px,Py,"+",10,true)+p32t(Px-6,Py+26,cornerLabel,11,true,"end");
  s+=p32circ(Ax,Ay,13,FIG_SHADE,FIG_INK)+p32t(Ax,Ay,"+",10,true)+p32t(Ax,Ay-24,sideLabB,11,true);
  s+=p32circ(Bx,By,13,FIG_SHADE,FIG_INK)+p32t(Bx,By,"+",10,true)+p32t(Bx,By-24,sideLabA,11,true);
  s+=p32t((Px+Bx)/2,Py+18,gF(a)+" m",11,true)+p32t(Px-10,(Py+Ay)/2,gF(b)+" m",11,true,"end");
  return p32svg(330,178,s,"Right triangle diagram: charges at the corners, with the two side distances from the corner charge labelled");
}
function p32figFieldLinesVar(kind){
  var s="";
  if(kind==="posneg"){
    s+=p32circ(92,100,15,FIG_SHADE,FIG_INK)+p32t(92,100,"+",12,true)+p32t(92,72,"positive",10,true);
    s+=p32circ(248,100,15,FIG_SHADE,FIG_INK)+p32t(248,100,"\u2212",12,true)+p32t(248,72,"negative",10,true);
    [-36,-18,0,18,36].forEach(function(dy){s+='<path d="M 110 '+fmt(100+dy,1)+' Q 170 '+fmt(100+dy*1.25,1)+' 230 '+fmt(100+dy,1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.4"/>';});
  } else if(kind==="density"){
    s+=p32circ(170,100,14,FIG_SHADE,FIG_INK)+p32t(170,100,"+",12,true);
    for(var i=0;i<12;i++){var a=i*Math.PI/6;s+=p32line(170+19*Math.cos(a),100+19*Math.sin(a),170+58*Math.cos(a),100+58*Math.sin(a),FIG_INK,1.3);}
    s+=p32t(170,178,"lines crowd near the charge, spread far away",10,false);
  } else if(kind==="uniform"){
    [64,88,112,136].forEach(function(y){s+=p32line(70,y,270,y,FIG_INK,1.5);});
    s+=p32rect(52,52,10,96,FIG_SHADE,FIG_INK)+p32rect(278,52,10,96,FIG_SHADE,FIG_INK);
    s+=p32t(57,40,"+",12,true)+p32t(283,40,"\u2212",12,true);
    s+=p32dot(170,100,5,FIG_ALT)+p32t(170,82,"+ test charge",10,true);
  } else {
    s+=p32circ(170,100,58,"none",FIG_INK,2.6)+p32circ(170,100,57,"none",FIG_INK,1);
    s+=p32t(170,100,"hollow inside",11,true)+p32t(170,178,"closed hollow conductor",10,false);
  }
  return p32svg(340,188,s,"Electric field line diagram of the kind named in the question");
}
function p32figBarMagnet(withCore){
  var s=p32rect(104,88,132,34,FIG_SHADE,FIG_INK)+p32line(170,88,170,122,FIG_INK,1.6);
  s+=p32t(137,105,"S",13,true)+p32t(203,105,"N",13,true);
  [-1,1].forEach(function(sg){
    [26,48].forEach(function(off){
      s+='<path d="M 236 '+fmt(105+sg*6,1)+' C 268 '+fmt(105+sg*off,1)+', 72 '+fmt(105+sg*off,1)+', 104 '+fmt(105+sg*6,1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.4"/>';
    });
  });
  s+=p32line(122,88,122,64,FIG_INK,1.2)+p32line(218,88,218,64,FIG_INK,1.2);
  if(withCore)s+=p32t(170,150,"field lines drawn without arrowheads",9,false);
  return p32svg(340,162,s,"Bar magnet diagram: field lines loop outside the magnet from one pole around to the other, closest together near the poles");
}
function p32figWireCircles(){
  var s=p32circ(170,100,7,FIG_SHADE,FIG_INK)+p32t(170,100,"",10,true);
  [30,52,74].forEach(function(r){s+=p32circ(170,100,r,"none",FIG_INK,1.4);});
  s+=p32t(170,190,"wire cross section at centre",10,false);
  return p32svg(340,198,s,"Diagram: concentric circular field lines around a long straight wire, drawn without arrowheads");
}
function p32figCompassWire(horizontal){
  var s="";
  if(horizontal){
    s+=p32line(40,64,300,64,FIG_INK,2.6)+p32arrow(150,64,196,64,FIG_INK,2.2)+p32t(170,46,"wire, current north (along the wire)",10,true);
    s+=p32circ(170,138,22,"none",FIG_INK,2)+p32dot(170,138,3)+p32t(170,176,"compass below the wire",10,true);
  } else {
    s+=p32line(110,26,110,176,FIG_INK,2.6)+p32arrow(110,110,110,66,FIG_INK,2.2)+p32t(110,196,"vertical wire, current upward",10,true);
    s+=p32circ(216,102,22,"none",FIG_INK,2)+p32dot(216,102,3)+p32t(216,140,"compass",10,true);
  }
  return p32svg(340,206,s,"Diagram: a compass placed beside a current carrying wire, as described in the question");
}
function p32figSolenoid(N,L,I){
  var s=p32rect(74,78,192,52,"none",FIG_INK,2);
  for(var i=0;i<9;i++){var x=84+i*22;s+='<ellipse cx="'+x+'" cy="104" rx="7" ry="30" fill="none" stroke="'+FIG_INK+'" stroke-width="1.5"/>';}
  s+=p32line(50,104,290,104,FIG_INK,1.1,true);
  s+=p32t(170,52,N+" turns over "+gF(L)+" m",11,true)+p32t(170,152,"current "+gF(I)+" A",11,true);
  s+=p32t(60,104,"A",11,true,"end")+p32t(280,104,"B",11,true,"start");
  return p32svg(340,166,s,"Solenoid diagram: a coil of the drawn number of turns and length, carrying the drawn current");
}
function p32figSolenoidEnd(ccw,turns){
  var s=p32circ(160,98,54,"none",FIG_INK,2.4);
  s+= ccw? p32arc(160,98,66,20,300) : p32arc(160,98,66,160,-120);
  s+= ccw? p32arrow(160+66*Math.cos(300*Math.PI/180),98-66*Math.sin(300*Math.PI/180),160+66*Math.cos(332*Math.PI/180),98-66*Math.sin(332*Math.PI/180),FIG_ACC,2.2)
         : p32arrow(160+66*Math.cos(-120*Math.PI/180),98-66*Math.sin(-120*Math.PI/180),160+66*Math.cos(-152*Math.PI/180),98-66*Math.sin(-152*Math.PI/180),FIG_ACC,2.2);
  s+=p32dot(160,98,3.5)+p32t(160,98-70,"looking at end A",11,true);
  s+=p32t(160,182,"current circulates "+(ccw?"counterclockwise":"clockwise")+", "+turns+" turns",11,false);
  return p32svg(330,192,s,"End view diagram of a solenoid: the current circulates in the direction stated in the question around end A");
}
function p32figSolenoidCompass(kind){
  var s=p32rect(64,80,150,48,"none",FIG_INK,2);
  for(var i=0;i<6;i++){var x=76+i*22;s+='<ellipse cx="'+x+'" cy="104" rx="6" ry="28" fill="none" stroke="'+FIG_INK+'" stroke-width="1.4"/>';}
  if(kind==="inside"){
    s+=p32circ(139,104,13,"none",FIG_ALT,2)+p32dot(139,104,2.5,FIG_ALT)+p32t(139,140,"compass inside",10,true);
  } else if(kind==="core"){
    s+=p32rect(64,94,150,20,"#9db8a6",FIG_INK)+p32t(139,146,"this one has an iron core",10,true);
    s+=p32circ(252,104,16,"none",FIG_INK,2)+p32dot(252,104,2.5);
  } else {
    s+=p32t(76,66,"end A",11,true,"start");
    s+=p32circ(252,104,16,"none",FIG_INK,2)+p32dot(252,104,2.5)+p32t(252,140,"compass on the axis",10,true);
  }
  return p32svg(330,160,s,"Diagram: a solenoid and a compass in the positions described in the question");
}
function p32figHandRule(variant){
  var s="";
  if(variant===3){
    s+=p32line(36,84,304,84,FIG_INK,2.6)+p32arrow(150,84,198,84,FIG_INK,2.3)+p32t(170,62,"current toward the east",11,true);
    s+=p32dot(170,140,5,FIG_ALT)+p32t(170,162,"P: on the table below the wire",11,true);
  } else {
    s+=p32line(150,22,150,168,FIG_INK,2.6);
    if(variant===2)s+=p32arrow(150,80,150,124,FIG_INK,2.3)+p32t(150,186,"current downward",11,true);
    else s+=p32arrow(150,124,150,80,FIG_INK,2.3)+p32t(150,186,"current upward",11,true);
    var px=(variant===1)?92:208;
    s+=p32dot(px,96,5,FIG_ALT)+p32t(px,74,"P",12,true)+p32t(px,186,variant===1?"west of the wire":"east of the wire",10,true);
  }
  return p32svg(330,198,s,"Diagram: a straight wire with the current direction stated in the question, and the point P at the stated position. The field direction at P is not drawn");
}
function p32figParallelWires(i1,i2,same){
  var s=p32line(118,26,118,164,FIG_INK,2.6)+p32line(222,26,222,164,FIG_INK,2.6);
  s+=p32arrow(118,120,118,78,FIG_ACC,2.3)+p32arrow(222,same?120:78,222,same?78:120,FIG_ACC,2.3);
  s+=p32t(118,182,i1+" A",11,true)+p32t(222,182,i2+" A",11,true);
  s+=p32t(170,16,"currents "+(same?"in the same direction":"in opposite directions"),11,true);
  return p32svg(330,194,s,"Diagram: two long parallel wires carrying the drawn currents in the directions stated in the question");
}
function p32figForceDir(variant){
  var s="", cx=160, cy=104;
  if(variant===3){
    s+=p32line(cx,168,cx,40,FIG_INK,2.4)+p32arrow(cx,120,cx,76,FIG_ACC,2.4)+p32t(cx-10,60,"current north",11,true,"end");
    s+=p32arrow(216,cy,262,cy,FIG_ALT,2.3)+p32t(240,cy-14,"B east",11,true);
    s+=p32dot(cx,cy,4.5);
  } else {
    var who=(variant===1)?"electron":"ion / proton";
    s+=p32arrow(cx-62,cy,cx+30,cy,variant===2?FIG_INK:FIG_ACC,2.2);
    if(variant===2){
      s+=p32arrow(cx,140,cx,168,FIG_ALT,2.2)+p32t(cx+52,160,"B down",11,true);
      s+=p32t(cx-16,cy-14,"moves north",11,true,"end");
    } else {
      s+=p32arrow(cx,cy+52,cx,cy-52,FIG_ALT,2.0);
      s+=p32t(cx+14,cy-58,"B north",11,true,"start")+p32t(cx-16,cy+22,"moves east",11,false,"end");
    }
    s+=p32t(cx,cy+72,who+": force direction not drawn",10,false);
    s+=p32dot(cx,cy,4.5);
  }
  if(variant===3)s+=p32t(cx,196,"wire: force direction not drawn",10,false);
  return p32svg(330,206,s,"Diagram: the velocity or current and the magnetic field directions stated in the question. The force direction is not drawn");
}
function p32figChargeCircle(vLabel,bLabel,rLabel,particle){
  var s=p32rect(36,22,268,158,"none",FIG_INK,1.4);
  for(var gx=70;gx<=280;gx+=42)for(var gy=48;gy<=160;gy+=36)s+=p32cross(gx,gy,4);
  s+=p32t(170,14,"uniform field B into the page: "+bLabel,10,true);
  s+=p32circ(170,101,54,"none",FIG_ACC,2.2);
  s+=p32line(170,101,224,101,FIG_INK,1.5,true)+p32t(198,90,rLabel,11,true);
  s+=p32dot(224,101,5.5,FIG_ALT)+p32arrow(224,101,224,64,FIG_ACC,2.2)+p32t(240,76,vLabel,10,true,"start");
  s+=p32t(170,194,particle,10,false);
  return p32svg(340,202,s,"Diagram: a charged particle moving in a circle in a uniform magnetic field directed into the page");
}
function p32figTransformer(Np,Ns,Vp){
  var s=p32rect(150,52,40,104,FIG_SHADE,FIG_INK);
  s+=p32line(70,52,70,156,FIG_INK,2)+p32line(70,52,150,52,FIG_INK,1.4)+p32line(70,156,150,156,FIG_INK,1.4);
  for(var i=0;i<4;i++){var y=66+i*22;s+='<path d="M 70 '+y+' q -18 11 0 22" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';}
  s+=p32line(270,52,270,156,FIG_INK,2)+p32line(190,52,270,52,FIG_INK,1.4)+p32line(190,156,270,156,FIG_INK,1.4);
  for(var j=0;j<4;j++){var y2=66+j*22;s+='<path d="M 270 '+y2+' q 18 11 0 22" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';}
  s+=p32t(66,176,"primary: "+Np+" turns, "+p32rawV(Vp)+" V",11,true);
  s+=p32t(274,176,"secondary: "+Ns+" turns, ? V",11,true);
  s+=p32t(170,36,"iron core",10,true);
  return p32svg(340,190,s,"Transformer diagram: primary and secondary coils on a shared iron core, with turns and primary voltage labelled and the secondary voltage unknown");
}
function p32figMotional(B,l,v){
  var s=p32rect(52,58,236,104,"none",FIG_INK,1.1);
  for(var gx=84;gx<=272;gx+=38)for(var gy=76;gy<=148;gy+=32)s+=p32cross(gx,gy,4);
  s+=p32line(52,84,288,84,FIG_INK,2.4)+p32line(52,138,288,138,FIG_INK,2.4);
  s+=p32line(206,84,206,138,FIG_INK,3.4)+p32bracketY(192,84,138,gF(l)+" m");
  s+=p32arrow(206,66,254,66,FIG_ACC,2.4)+p32t(232,50,gF(v)+" m/s",11,true);
  s+=p32t(170,180,"field "+gF(B)+" T into the page, rod slides on rails",11,false);
  return p32svg(340,192,s,"Diagram: a metal rod sliding on rails through a magnetic field directed into the page, with rod length, speed and field labelled");
}
function p32figOrbit(label,centreLabel){
  var s=p32circ(160,104,42,FIG_SHADE,FIG_INK)+p32t(160,104,centreLabel,10,true);
  s+=p32circ(160,104,80,"none",FIG_INK,1.6)+p32dot(160,24,6,FIG_ACC);
  s+=p32line(160,104,160,24,FIG_INK,1.4,true)+p32t(172,64,label,11,true,"start");
  s+=p32arrow(160,24,192,24,FIG_ACC,2.2);
  return p32svg(330,196,s,"Orbit diagram: a satellite or moon in a circular orbit, with the orbit size labelled as in the question");
}
// --- Unit 4: Bohr, Compton, photoelectric ---
function p32figBohr(nmax,ni,nf,dir){
  // bohrE is defined in the Unit 4 slice; levels drawn for n = 1..nmax
  var s="", x0=104, x1=238;
  function yOf(n){return 176-(1-1/(n*n))*128;}
  for(var n=1;n<=nmax;n++){
    var y=yOf(n);
    s+=p32line(x0,y,x1,y,FIG_INK,2);
    s+=p32t(x0-8,y,"n = "+n,11,true,"end");
    s+=p32t(x1+8,y,gF(bohrE(n))+" eV",11,false,"start");
  }
  if(dir==="down"&&ni&&nf)s+=p32arrow(258,yOf(ni),258,yOf(nf),FIG_ALT,2.4)+p32t(272,(yOf(ni)+yOf(nf))/2,"photon",10,false,"start");
  if(dir==="up"&&ni&&nf)s+=p32arrow(258,yOf(ni),258,yOf(nf),FIG_ACC,2.4)+p32t(272,(yOf(ni)+yOf(nf))/2,"photon",10,false,"start");
  return p32svg(340,192,s,"Bohr energy level diagram for hydrogen: level energies from the level formula, with the drawn transition shown by an arrow and the photon energy not labelled");
}
function p32figCompton(lamLabel,th){
  var ex=158, ey=104, s="";
  s+=p32arrow(36,ey,ex-14,ey,FIG_ACC,2.6)+p32t(88,ey-16,lamLabel,11,true);
  s+=p32circ(ex,ey,9,FIG_SHADE,FIG_INK)+p32t(ex,ey+24,"electron",9,true);
  var rad=th*Math.PI/180, sx=ex+104*Math.cos(rad), sy=ey-104*Math.sin(rad);
  if(th===180){sy=ey-22; sx=ex-104;}
  s+=p32arrow(ex+8,ey-4,sx,sy,FIG_ALT,2.5)+p32t(sx,sy-14,"?",12,true);
  s+=p32line(ex,ey,ex+58,ey,FIG_INK,1.2,true);
  if(th!==180&&th!==0)s+=p32arc(ex,ey,36,0,th)+p32t(ex+52,ey-20,th+"\u00B0",11,true,"start");
  if(th===180)s+=p32t(ex+66,ey+16,"180\u00B0",11,true,"start");
  s+=p32arrow(ex+6,ey+6,ex+52,ey+40,FIG_INK,2.0)+p32t(ex+58,ey+48,"recoil electron",9,false,"start");
  return p32svg(340,178,s,"Compton scattering diagram: an incoming photon strikes a stationary electron and is scattered at the drawn angle, with the scattered wavelength unknown");
}
function p32figPhoto(lamLabel,subLabel,showElectron){
  var s=p32rect(70,148,220,30,FIG_SHADE,FIG_INK)+p32t(180,168,"metal surface",11,true);
  s+=p32line(52,60,96,104,FIG_ACC,2.2)+p32line(88,48,128,92,FIG_ACC,2.2)+p32line(124,60,164,104,FIG_ACC,2.2);
  s+=p32t(88,34,lamLabel,11,true);
  if(showElectron){s+=p32dot(206,128,5,FIG_ALT)+p32arrow(206,128,232,92,FIG_ALT,2.2)+p32t(240,84,"electron, ?",10,false,"start");}
  if(subLabel)s+=p32t(180,196,subLabel,10,false);
  return p32svg(340,206,s,"Photoelectric diagram: light of the drawn wavelength falls on a metal surface and electrons are emitted");
}
/* Photoelectric graph (Tranche 6, Nov 2026): maximum kinetic energy
   against frequency for a metal of work function phi (eV, from the
   draw). The line is KEmax = hf - phi: its intercept on the energy axis
   is -phi, labelled with the draw's value because the stem states phi.
   The threshold frequency, where the line crosses zero, is what the
   attached questions ask for, so it is marked "?" and the axes carry no
   scale: the crossing is drawn schematically and cannot be read off. */
function p32figPhotoGraph(phi){
  var OX=74,OY=140,s="";
  s+=p32arrow(OX,196,OX,28,FIG_INK,1.8)+p32arrow(OX,OY,314,OY,FIG_INK,1.8);
  s+=p32t(80,16,"maximum kinetic energy (eV)",11,true,"start");
  s+=p32t(310,158,"frequency f",11,true,"end");
  s+=p32line(OX,192,292,42,FIG_ACC,2.6);
  s+=p32dot(150,OY,4,FIG_ALT);
  s+=p32line(150,OY,150,166,FIG_INK,1.3,true);
  s+=p32t(150,180,"f\u2080 = ?",11,true);
  s+=p32t(OX-6,196,"-"+gF(phi)+" eV",10,false,"end");
  s+=p32t(202,58,"KEmax = hf - \u03C6",11,false);
  s+=p32t(314,214,"threshold marked ?, drawn schematically",9,false,"end");
  return p32svg(340,222,s,"Photoelectric graph: maximum kinetic energy against frequency is a straight line whose intercept is minus the work function of the metal; the threshold frequency where the line crosses zero is marked as the unknown and is not drawn to scale");
}
function p32figStandingWave(n,label){
  var cx=168, cy=102, R=62, pts=[];
  for(var i=0;i<=72;i++){var a=i/72*2*Math.PI, rr=R+7*Math.sin(n*a);pts.push(fmt(cx+rr*Math.cos(a),1)+","+fmt(cy+rr*Math.sin(a),1));}
  var s=p32dot(cx,cy,5,FIG_INK)+p32t(cx,cy+18,"nucleus",9,true);
  s+='<polyline points="'+pts.join(" ")+'" fill="none" stroke="'+FIG_ACC+'" stroke-width="2.2"/>';
  s+=p32circ(cx,cy,R,"none",FIG_INK,1.1);
  if(label)s+=p32t(cx,184,label,11,false);
  return p32svg(340,196,s,"Standing wave diagram: an electron wave fitted around a circular orbit, joining up with itself");
}

function p32figTwoWires(I1,I2,d,midway,x){
  // Cross sections of two parallel wires, currents toward the viewer.
  var w1x=104, w2x=236, cy=100, s="";
  [w1x,w2x].forEach(function(wx){[20,36].forEach(function(r){s+=p32circ(wx,cy,r,"none",FIG_INK,1.3);});s+=p32circ(wx,cy,8,FIG_SHADE,FIG_INK)+p32dot(wx,cy,2.5);});
  s+=p32t(w1x,cy-52,gF(I1)+" A",11,true)+p32t(w2x,cy-52,gF(I2)+" A",11,true);
  s+=p32bracketX(w1x,w2x,cy+58,gF(d)+" m apart");
  if(midway){
    s+=p32dot((w1x+w2x)/2,cy,4.5,FIG_ALT)+p32t((w1x+w2x)/2,cy-16,"midway point",11,true);
  } else {
    s+=p32dot(w2x+44,cy,4.5,FIG_ALT)+p32t(w2x+44,cy-16,"point",11,true);
    if(x!==undefined&&x!==null)s+=p32bracketX(w2x,w2x+44,cy+34,gF(x)+" m beyond wire 2");
  }
  s+=p32t(170,188,"wire cross sections, currents in the same direction",10,false);
  return p32svg(340,196,s,"Diagram: cross sections of two parallel wires at the drawn separation, with the field point in the position stated in the question");
}

/* ----- bank-u1.js ----- */
// Diagram figures (Phase C, Nov 2026): entries whose source question type
// carried a diagram now set qq3204.figure from the draw's own values via the
// p32fig* helpers in bank-helpers.js. Asked unknowns are labelled "?".
// Physics 3204 Unit 1 Motion question bank
// CRMARKS: u1-51-resultant-cr=3
// CRMARKS: u1-53-drift-cr=3
// CRMARKS: u1-53-heading-cr=3
// CRMARKS: u1-53-aircraft-heading-cr=4
// CRMARKS: u1-54-cliff-height-cr=3
// CRMARKS: u1-54-hit-or-miss-cr=4
// CRMARKS: u1-55-stick-2d-cr=5
// CRMARKS: u1-55-third-piece-cr=4

/* Units and significant figures discipline: givens are fixed at 3 sf and
   printed with gF(); intermediates are chained at 4 sf with iF() so every
   printed arithmetic line reproduces at printed precision; final answers
   are stored and printed at 3 sf with F3(). Helpers (sfR, sfF, F3, iF, gF)
   and constants (PHYS_G = 9.8 m/s^2, PHYS_C) come from bank-helpers.js. */

/* ---------- PH12.5.1 Vectors ---------- */

E("u1-51-components",1,["PH12.5.1"],1,"gen",function(){
  var v=ri(8,30), th=pick([24,28,32,38,42,48,52,58,64,68]);
  var rad=th*Math.PI/180, c4=sfR(Math.cos(rad),4), s4=sfR(Math.sin(rad),4);
  var vx4=sfR(v*c4,4), vy4=sfR(v*s4,4);
  var qq3204 = mcq("A velocity of "+gF(v)+" m/s is directed "+th+"° north of east. What is the east component of the velocity?",
    F3(vx4)+" m/s",
    [F3(vy4)+" m/s", F3(v)+" m/s", F3(sfR(vx4+vy4,4))+" m/s"],
    "The east component is the side adjacent to the angle, so it is v cos θ. vx = "+gF(v)+" × "+iF(c4)+" = "+iF(vx4)+" m/s. The east component is "+F3(vx4)+" m/s. (The north component, v sin θ, is "+F3(vy4)+" m/s.)",
    {v:v,th:th}); qq3204.figure = p32figVecTri(v,th); return qq3204;
});

E("u1-51-direction-from-components",1,["PH12.5.1"],1,"gen",function(){
  var a=ri(3,12), b=ri(3,12), tr=0;
  while(a===b&&tr<50){b=ri(3,12);tr++;}
  var th=sfR(Math.atan2(b,a)*180/Math.PI,4), comp=sfR(90-th,4);
  var qq3204 = mcq("A displacement has components of "+gF(-a)+" m east and "+gF(b)+" m north, using the convention that east and north are positive. In which direction is the displacement?",
    F3(th)+"° north of west",
    [F3(comp)+"° north of west", F3(th)+"° north of east", F3(comp)+"° south of west"],
    "The east component is negative, so the displacement points partly west, while the north component is positive. The angle from the west direction is arctan("+gF(b)+" / "+gF(a)+"), which gives "+F3(th)+"°. The displacement points "+F3(th)+"° north of west.",
    {a:a,b:b}); qq3204.figure = p32figVecFromComp(a,b); return qq3204;
});

E("u1-51-collinear-net",1,["PH12.5.1"],1,"gen",function(){
  var a=ri(15,60), b=ri(4,a-4);
  var ans=sfR(a-b,3);
  var qq3204 = numq("A fishing boat sails "+gF(a)+" km east from port, then turns around and sails "+gF(b)+" km west. How far is the boat from its starting point? Give your answer in km.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "The two legs are along the same line in opposite directions, so the displacement is the difference of the two distances. "+gF(a)+" - "+gF(b)+" = "+F3(a-b)+" km. The boat is "+F3(ans)+" km from its starting point, east of it.",
    {a:a,b:b}); qq3204.figure = p32figCollinear(a,b); return qq3204;
});

E("u1-51-resultant-magnitude",1,["PH12.5.1"],2,"gen",function(){
  var a=ri(20,120), b=ri(20,120);
  var sum=a*a+b*b, R=Math.sqrt(sum), ans=sfR(R,3);
  var qq3204 = numq("A hiker walks "+gF(a)+" m east and then "+gF(b)+" m north. What is the magnitude of the hiker's total displacement? Give your answer in m.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "The two legs are perpendicular, so the displacement is the hypotenuse of a right triangle. Squaring the legs: "+(a*a)+" + "+(b*b)+" = "+sum+". Taking the square root of "+sum+" gives "+F3(R)+" m. The magnitude of the displacement is "+F3(ans)+" m.",
    {a:a,b:b}); qq3204.figure = p32figResultant2(a,b,"m"); return qq3204;
});

E("u1-51-avg-vel-vs-speed",1,["PH12.5.1"],2,"gen",function(){
  var d1=ri(30,110), t1=ri(30,100), d2=ri(10,d1-6), t2=ri(20,80);
  var T4=sfR((t1+t2)/60,4);
  var avgSpeed=(d1+d2)/T4, avgVel=(d1-d2)/T4;
  var s1=d1/(t1/60), s2=d2/(t2/60), meanSpeed=(s1+s2)/2;
  var key=F3(avgSpeed)+" km/h";
  var seen={}; seen[key]=1;
  var raw=[meanSpeed,avgVel,s1];
  var opts=raw.map(function(d){var s=F3(d)+" km/h",k=0;while(seen[s]&&k<50){d=d*1.17+0.4;s=F3(d)+" km/h";k++;}seen[s]=1;return s;});
  return mcq("A delivery van drives "+gF(d1)+" km east in "+t1+" min, then turns and drives "+gF(d2)+" km west in "+t2+" min. What is the average speed of the van for the whole trip?",
    key, opts,
    "Average speed uses the total distance travelled, not the displacement. Total distance: "+d1+" + "+d2+" = "+(d1+d2)+" km. Total time: "+(t1+t2)+" min, which is "+iF(T4)+" h. Average speed = "+(d1+d2)+" / "+iF(T4)+" = "+F3(avgSpeed)+" km/h. (The average velocity is smaller, "+F3(avgVel)+" km/h east, because the displacement is only "+(d1-d2)+" km.)",
    {d1:d1,t1:t1,d2:d2,t2:t2});
});

E("u1-51-resultant-cr",1,["PH12.5.1"],2,"gen",function(){
  var a=ri(15,90), b=ri(15,90), c=ri(15,90);
  var e=a+c, sum=e*e+b*b, R=Math.sqrt(sum), ans=sfR(R,3);
  var ang=sfR(Math.atan2(b,e)*180/Math.PI,3);
  var qq3204 = numq("A kayaker paddles "+gF(a)+" m east, then "+gF(b)+" m north, then "+gF(c)+" m east again. What is the magnitude of the kayaker's total displacement from the start? Give your answer in m.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Combine the two east legs first: "+gF(a)+" + "+gF(c)+" = "+F3(e)+" m east. The north leg of "+gF(b)+" m is perpendicular to that total. Squaring and adding: "+(e*e)+" + "+(b*b)+" = "+sum+". Taking the square root of "+sum+" gives "+F3(R)+" m, at an angle of "+F3(ang)+"° north of east. The magnitude of the displacement is "+F3(ans)+" m.",
    {a:a,b:b,c:c}); qq3204.figure = p32figResultant3(a,b,c); return qq3204;
});

E("u1-51-claims",1,["PH12.5.1"],3,"gen",function(){
  var a=ri(18,95), b=ri(18,95), tr=0;
  while(a===b&&tr<50){b=ri(18,95);tr++;}
  var R=Math.sqrt(a*a+b*b);
  var half=R/2, tr2=0;
  while(Math.abs(half-Math.abs(a-b))<0.02*R&&tr2<50){half=half*1.13;tr2++;}
  var qq3204 = mcq("A student is asked for the resultant of a displacement of "+gF(a)+" m east followed by "+gF(b)+" m north. The student answers "+gF(a+b)+" m. Which statement correctly evaluates the student's answer?",
    "The student added the legs as if they were in a straight line. The legs are perpendicular, so Pythagoras gives a resultant of "+F3(R)+" m.",
    ["The student should have subtracted the legs, giving a resultant of "+F3(Math.abs(a-b))+" m.",
     "The answer "+gF(a+b)+" m is correct in size, and only the direction is missing.",
     "Each leg contributes only half, so the resultant is "+F3(half)+" m."],
    "East and north legs are perpendicular, so they cannot be added as straight-line distances. The resultant is the hypotenuse: squaring and adding, "+(a*a)+" + "+(b*b)+" = "+(a*a+b*b)+", and the square root of "+(a*a+b*b)+" is "+F3(R)+" m. The student's "+gF(a+b)+" m is the total distance walked, not the displacement.",
    {a:a,b:b}); qq3204.figure = p32figResultant2(a,b,"m"); return qq3204;
});

/* ---------- PH12.5.2 Frame of reference ---------- */

E("u1-52-largest-speed",1,["PH12.5.2"],1,"gen",function(){
  var veh=pick([["ferry","the shore",[8,14]],["bus","the road",[11,18]],["train","the ground",[14,28]],["moving walkway","the terminal floor",[0.4,0.5,0.6,0.75,0.9]]]);
  var V=veh[2][0]<1?pick(veh[2]):ri(veh[2][0],veh[2][1]);
  var w=ri(1,3), guard=0;
  while(guard++<20){var opts=[V+w,Math.abs(V-w),w,V].map(function(x){return F3(x);});if(new Set(opts).size===4)break;w=ri(1,3);}
  return mcq("A "+veh[0]+" moves at "+gF(V)+" m/s relative to "+veh[1]+". A passenger walks toward the front of the "+veh[0]+" at "+gF(w)+" m/s relative to the "+veh[0]+". What is the passenger's speed relative to "+veh[1]+"?",
    F3(V+w)+" m/s",
    [F3(Math.abs(V-w))+" m/s", F3(w)+" m/s", F3(V)+" m/s"],
    "Both motions are in the same direction, so the speeds add when the frame changes. Relative to "+veh[1]+", the passenger has the speed of the "+veh[0]+" plus the walking speed: "+gF(V)+" + "+gF(w)+" = "+F3(V+w)+" m/s.",
    {V:V,w:w});
});

E("u1-52-dropped-ball",1,["PH12.5.2"],1,"gen",function(){
  var pair=pick([["ferry","passenger"],["fishing boat","fisher"],["sailing boat","sailor"],["cargo boat","crew member"]]);
  var V=ri(4,14), h=ri(6,20);
  return textq("A "+pair[1]+" at the top of a "+pair[0]+"'s mast, "+gF(h)+" m above the deck, drops a wrench while the "+pair[0]+" moves steadily at "+gF(V)+" m/s. Describe the path of the wrench as seen by an observer standing on the shore. Give your answer as one word.",
    ["parabola"],
    "In the shore frame the wrench keeps the "+pair[0]+"'s horizontal velocity of "+gF(V)+" m/s while gravity accelerates it downward, so the two motions combine into a parabola. In the "+pair[0]+"'s own frame it simply falls straight down. The path seen from the shore is a parabola.",
    {V:V,h:h});
});

E("u1-52-invariants",1,["PH12.5.2"],1,"gen",function(){
  var V=ri(5,20);
  var ev=pick(["a crate sliding to a stop across the deck","a ball rolling down a ramp on board","a passenger walking the length of the cabin","a pendulum swinging in the cabin"]);
  return mcq("A ferry crosses a harbour at a steady "+gF(V)+" m/s. Observers on the ferry time "+ev+", and a person on the dock times the same event with an identical stopwatch. Which quantity do the ferry observers and the dock observer all measure to be the same?",
    "The time interval between the start and the end of the event",
    ["The speed of the moving object during the event",
     "The distance travelled by the object during the event",
     "The kinetic energy of the object during the event"],
    "Changing the frame of reference changes measured velocities, and with them the distances travelled and the kinetic energies. In classical physics, the time interval between the same two events is the one quantity every observer measures identically. The time interval is the same in both frames.",
    {V:V});
});

E("u1-52-two-frames",1,["PH12.5.2"],2,"gen",function(){
  var veh=pick(["snowmobiles","cyclists","kayaks","runners"]);
  var s2=ri(9,22), diff=ri(3,14), s1=s2+diff;
  return mcq("Two "+veh+" travel in the same direction along a straight trail. The faster one moves at "+gF(s1)+" m/s relative to the ground and the slower one at "+gF(s2)+" m/s relative to the ground. What is the speed of the faster one relative to the slower one?",
    F3(diff)+" m/s",
    [F3(s1+s2)+" m/s", F3(s1)+" m/s", F3((s1+s2)/2)+" m/s"],
    "For motion in the same direction, the relative speed is the difference of the two ground speeds: "+gF(s1)+" - "+gF(s2)+" = "+F3(diff)+" m/s. Adding the speeds would apply if they moved in opposite directions.",
    {s1:s1,s2:s2});
});

E("u1-52-who-is-right",1,["PH12.5.2"],3,"gen",function(){
  var veh=pick(["train","ferry","bus"]);
  var V=ri(10,30);
  return mcq("A passenger sits in a "+veh+" that moves at a steady "+gF(V)+" m/s. The passenger says, \"I am at rest.\" A person standing outside says, \"You are moving at "+gF(V)+" m/s.\" Who is correct?",
    "Both are correct, because motion is always described relative to a chosen frame of reference",
    ["Only the person outside is correct, because the "+veh+" really is moving",
     "Only the passenger is correct, because the passenger feels no motion",
     "Neither is correct, because speed cannot be measured from inside a moving vehicle"],
    "There is no single absolute frame for describing motion. Relative to the "+veh+", the passenger's velocity is zero; relative to the ground, it is "+gF(V)+" m/s. Both statements are correct in their own frame of reference.",
    {V:V});
});

/* ---------- PH12.5.3 Two-dimensional relative motion ---------- */

E("u1-53-river-resultant",1,["PH12.5.3"],2,"gen",function(){
  var vb=ri(6,16)/2, vc=ri(2,9)/2, tr=0;
  while(vc===vb&&tr<50){vc=ri(2,9)/2;tr++;}
  var sq1=sfR(vb*vb,4), sq2=sfR(vc*vc,4), sum=sfR(sq1+sq2,4), R=Math.sqrt(sum);
  var qq3204 = mcq("A boat that travels at "+gF(vb)+" m/s in still water is pointed straight across a river whose current flows at "+gF(vc)+" m/s. What is the boat's speed relative to the shore?",
    F3(R)+" m/s",
    [F3(vb+vc)+" m/s", F3(Math.abs(vb-vc))+" m/s", F3(Math.sqrt(Math.abs(sq1-sq2)))+" m/s"],
    "The boat's velocity across the river and the current's velocity along the river are perpendicular, so the resultant speed is found with Pythagoras. Squaring and adding: "+iF(sq1)+" + "+iF(sq2)+" = "+iF(sum)+", and the square root of "+iF(sum)+" is "+F3(R)+" m/s. The boat's speed relative to the shore is "+F3(R)+" m/s.",
    {vb:vb,vc:vc}); qq3204.figure = p32figRiver(vb,vc,0,"resultant"); return qq3204;
});

E("u1-53-crossing-time",1,["PH12.5.3"],2,"gen",function(){
  var w=ri(60,240), vb=ri(6,15)/2, vc=ri(2,8)/2;
  var t4=sfR(w/vb,4), ans=sfR(t4,3);
  var qq3204 = numq("A river is "+gF(w)+" m wide and flows at "+gF(vc)+" m/s. A boat that travels at "+gF(vb)+" m/s in still water is pointed straight across the river. How long does the boat take to cross? Give your answer in s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Only the across-river component of the velocity shortens the crossing, and that component is the boat's full still-water speed of "+gF(vb)+" m/s. The current pushes the boat downstream but does not change the crossing time. t = "+gF(w)+" / "+gF(vb)+" = "+iF(t4)+" s. The crossing time is "+F3(ans)+" s.",
    {w:w,vb:vb,vc:vc}); qq3204.figure = p32figRiver(vb,vc,w,"time"); return qq3204;
});

E("u1-53-drift-cr",1,["PH12.5.3"],2,"gen",function(){
  var w=ri(70,260), vb=ri(6,15)/2, vc=ri(2,8)/2;
  var t4=sfR(w/vb,4), drift4=sfR(vc*t4,4), ans=sfR(drift4,3);
  var qq3204 = numq("A boat that travels at "+gF(vb)+" m/s in still water is pointed straight across a river "+gF(w)+" m wide. The current flows at "+gF(vc)+" m/s. How far downstream from the point directly opposite the launch does the boat land? Give your answer in m.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "First find the crossing time from the across-river motion: t = "+gF(w)+" / "+gF(vb)+" = "+iF(t4)+" s. During that whole time the current carries the boat downstream at "+gF(vc)+" m/s. Drift = "+gF(vc)+" × "+iF(t4)+" = "+iF(drift4)+" m. The boat lands "+F3(ans)+" m downstream.",
    {w:w,vb:vb,vc:vc}); qq3204.figure = p32figRiver(vb,vc,w,"drift"); return qq3204;
});

E("u1-53-heading-cr",1,["PH12.5.3"],3,"gen",function(){
  var vb=pick([5.0,5.5,6.0,6.5,7.0,7.5,8.0]), vc=ri(2,9)/2;
  var ratio4=sfR(vc/vb,4), th=Math.asin(vc/vb)*180/Math.PI, ans=sfR(th,3);
  var cos4=sfR(Math.cos(th*Math.PI/180),4), cross4=sfR(vb*cos4,4);
  var qq3204 = numq("A boat that travels at "+gF(vb)+" m/s in still water must land at a dock directly across a river from its launch point. The current flows at "+gF(vc)+" m/s. At what angle upstream from the straight-across direction must the boat be pointed? Give your answer in degrees.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "To travel straight across, the upstream component of the boat's velocity must exactly cancel the current. That component is vb sin θ, so sin θ = "+gF(vc)+" / "+gF(vb)+" = "+iF(ratio4)+". Taking the inverse sine gives θ = "+F3(th)+"°. The across-river component is then "+gF(vb)+" × "+iF(cos4)+" = "+iF(cross4)+" m/s. The boat must be pointed "+F3(ans)+"° upstream from the straight-across direction.",
    {vb:vb,vc:vc}); qq3204.figure = p32figRiver(vb,vc,0,"heading"); return qq3204;
});

E("u1-53-aircraft-ground",1,["PH12.5.3"],2,"gen",function(){
  var va=ri(150,260), vw=ri(20,70);
  var sum=va*va+vw*vw, R=Math.sqrt(sum);
  var qq3204 = mcq("A plane flies with an airspeed of "+gF(va)+" km/h pointed due north. A wind blows toward the east at "+gF(vw)+" km/h. What is the plane's ground speed?",
    F3(R)+" km/h",
    [F3(va+vw)+" km/h", F3(va-vw)+" km/h", F3(Math.sqrt(va*va-vw*vw))+" km/h"],
    "The plane's velocity through the air and the wind's velocity are perpendicular, so the ground velocity is the hypotenuse of the velocity triangle. Squaring and adding: "+(va*va)+" + "+(vw*vw)+" = "+sum+", and the square root of "+sum+" is "+F3(R)+" km/h. The ground speed is "+F3(R)+" km/h.",
    {va:va,vw:vw}); qq3204.figure = p32figAircraft(va,vw,"ground"); return qq3204;
});

E("u1-53-aircraft-heading-cr",1,["PH12.5.3"],3,"gen",function(){
  var va=ri(160,280), vw=ri(25,85);
  var ratio4=sfR(vw/va,4), th=Math.asin(vw/va)*180/Math.PI, ans=sfR(th,3);
  var diff=va*va-vw*vw, vg=Math.sqrt(diff);
  var qq3204 = numq("A pilot must fly due north over the ground. The plane's airspeed is "+gF(va)+" km/h and a wind blows toward the east at "+gF(vw)+" km/h. At what angle west of north must the plane be pointed? Give your answer in degrees.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "The plane must be pointed partly into the wind so that the westward component of its velocity through the air cancels the eastward wind. That component is va sin θ, so sin θ = "+vw+" / "+va+" = "+iF(ratio4)+". Taking the inverse sine gives θ = "+F3(th)+"°. The ground speed follows from Pythagoras: "+(va*va)+" - "+(vw*vw)+" = "+diff+", and the square root of "+diff+" is "+F3(vg)+" km/h. The plane must be pointed "+F3(ans)+"° west of north.",
    {va:va,vw:vw}); qq3204.figure = p32figAircraft(va,vw,"heading"); return qq3204;
});

E("u1-53-round-trip",1,["PH12.5.3"],2,"gen",function(){
  var d=ri(300,950), vb=ri(10,18)/2, vc=ri(2,6)/2;
  var down=sfR(vb+vc,4), up=sfR(vb-vc,4);
  var td=sfR(d/down,4), tu=sfR(d/up,4), tot=sfR(td+tu,4), ans=sfR(tot,3);
  var qq3204 = numq("A patrol boat travels "+gF(d)+" m downstream and then returns "+gF(d)+" m upstream to its start. The boat's speed in still water is "+gF(vb)+" m/s and the current flows at "+gF(vc)+" m/s. What is the total time for the round trip? Give your answer in s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Downstream the current helps: "+gF(vb)+" + "+gF(vc)+" = "+gF(down)+" m/s, so the downstream leg takes "+fmt(d,0)+" / "+gF(down)+" = "+iF(td)+" s. Upstream the current opposes: "+gF(vb)+" - "+gF(vc)+" = "+gF(up)+" m/s, so the return leg takes "+fmt(d,0)+" / "+gF(up)+" = "+iF(tu)+" s. Total time: "+iF(td)+" + "+iF(tu)+" = "+iF(tot)+" s. The round trip takes "+F3(ans)+" s.",
    {d:d,vb:vb,vc:vc}); qq3204.figure = p32figRoundTrip(d,vb,vc); return qq3204;
});

/* ---------- PH12.5.4 Projectile motion ---------- */

E("u1-54-fall-time",1,["PH12.5.4"],1,"gen",function(){
  var h=ri(12,85);
  var q4=sfR(2*h/PHYS_G,4), t=sfR(Math.sqrt(q4),4), ans=sfR(t,3);
  var qq3204 = numq("A stone is projected horizontally from the top of a cliff "+gF(h)+" m above the water. How long does the stone take to reach the water? Give your answer in s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "The vertical motion is free fall from rest, so h = (1/2) g t² and t² = 2h / g. Twice the height is "+(2*h)+" m, and "+(2*h)+" / 9.8 = "+iF(q4)+" s². The square root of "+iF(q4)+" is "+F3(t)+" s. The stone takes "+F3(ans)+" s to reach the water, whatever its horizontal speed.",
    {h:h}); qq3204.figure = p32figCliff(gF(h)+" m",null,null,true); return qq3204;
});

E("u1-54-angled-components",1,["PH12.5.4"],1,"gen",function(){
  var v=ri(14,38), th=pick([25,30,35,40,50,55,60,65]);
  var rad=th*Math.PI/180, s4=sfR(Math.sin(rad),4), c4=sfR(Math.cos(rad),4);
  var vy4=sfR(v*s4,4), vx4=sfR(v*c4,4);
  var qq3204 = mcq("A ball is launched at "+gF(v)+" m/s at an angle of "+th+"° above the horizontal. What is the initial vertical component of its velocity?",
    F3(vy4)+" m/s",
    [F3(vx4)+" m/s", F3(v)+" m/s", F3(sfR(vx4+vy4,4))+" m/s"],
    "The vertical component is the side opposite the launch angle, so it is v sin θ. vy = "+gF(v)+" × "+iF(s4)+" = "+iF(vy4)+" m/s. The initial vertical component is "+F3(vy4)+" m/s.",
    {v:v,th:th}); qq3204.figure = p32figLaunch(v,th,"components"); return qq3204;
});

E("u1-54-horiz-range",1,["PH12.5.4"],2,"gen",function(){
  var v=ri(12,50)/2, h=ri(10,70);
  var q4=sfR(2*h/PHYS_G,4), t4=sfR(Math.sqrt(q4),4), r4=sfR(v*t4,4), ans=sfR(r4,3);
  var qq3204 = numq("A ball is projected horizontally at "+gF(v)+" m/s from the top of a cliff "+gF(h)+" m high. How far from the base of the cliff does the ball land? Give your answer in m.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "The fall time comes from the vertical motion: t² = 2h / g = "+(2*h)+" / 9.8 = "+iF(q4)+" s², so t = "+iF(t4)+" s. Horizontally the ball keeps its launch speed for the whole fall: range = "+gF(v)+" × "+iF(t4)+" = "+iF(r4)+" m. The ball lands "+F3(ans)+" m from the base of the cliff.",
    {v:v,h:h}); qq3204.figure = p32figCliff(gF(h)+" m",gF(v)+" m/s","?",true); return qq3204;
});

E("u1-54-cliff-height-cr",1,["PH12.5.4"],2,"gen",function(){
  var v=ri(8,30), R=ri(15,90);
  var t4=sfR(R/v,4), tsq=sfR(t4*t4,4), h4=sfR(4.9*tsq,4), ans=sfR(h4,3);
  var qq3204 = numq("A stone is projected horizontally at "+gF(v)+" m/s from the top of a sea cliff and lands in the water "+gF(R)+" m from the base of the cliff. How high is the cliff? Give your answer in m.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "The horizontal motion gives the fall time: t = "+gF(R)+" / "+gF(v)+" = "+iF(t4)+" s. Vertically the stone falls from rest under gravity, so first square the time: "+iF(t4)+" × "+iF(t4)+" = "+iF(tsq)+" s². Then h = (1/2) g t² = 4.90 × "+iF(tsq)+" = "+iF(h4)+" m. The cliff is "+F3(ans)+" m high.",
    {v:v,R:R}); qq3204.figure = p32figCliff("?",gF(v)+" m/s",gF(R)+" m",true); return qq3204;
});

E("u1-54-launch-speed",1,["PH12.5.4"],2,"gen",function(){
  var h=ri(15,75), R=ri(20,95);
  var q4=sfR(2*h/PHYS_G,4), t4=sfR(Math.sqrt(q4),4);
  var v4=sfR(R/t4,4), vy4=sfR(PHYS_G*t4,4), imp4=sfR(Math.sqrt(v4*v4+vy4*vy4),4);
  var key=F3(v4)+" m/s", seen={}; seen[key]=1;
  var raw=[vy4, sfR(v4/2,4), imp4];
  var opts=raw.map(function(d){var s=F3(d)+" m/s",k=0;while(seen[s]&&k<50){d=d*1.21+0.3;s=F3(d)+" m/s";k++;}seen[s]=1;return s;});
  var qq3204 = mcq("A ball is projected horizontally from a cliff "+gF(h)+" m high and lands "+gF(R)+" m from the base of the cliff. What was the launch speed of the ball?",
    key, opts,
    "The fall time comes from the height: t² = 2h / g = "+(2*h)+" / 9.8 = "+iF(q4)+" s², so t = "+iF(t4)+" s. The launch speed is the horizontal distance covered in that time: "+gF(R)+" / "+iF(t4)+" = "+iF(v4)+" m/s. The launch speed was "+F3(v4)+" m/s.",
    {h:h,R:R}); qq3204.figure = p32figCliff(gF(h)+" m","?",gF(R)+" m",true); return qq3204;
});

E("u1-54-max-height",1,["PH12.5.4"],2,"gen",function(){
  var v=ri(15,40), th=pick([25,30,35,40,45,50,55,60,65]);
  var rad=th*Math.PI/180, s4=sfR(Math.sin(rad),4);
  var vy4=sfR(v*s4,4), sq4=sfR(vy4*vy4,4), H4=sfR(sq4/(2*PHYS_G),4), ans=sfR(H4,3);
  var qq3204 = numq("A golf ball is driven at "+gF(v)+" m/s at an angle of "+th+"° above the horizontal. What is the maximum height the ball reaches? Give your answer in m.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Only the vertical component matters for the height. vy = "+gF(v)+" × "+iF(s4)+" = "+iF(vy4)+" m/s. At the top of the flight the vertical velocity is zero, so H = vy² / (2g). Squaring: "+iF(vy4)+" × "+iF(vy4)+" = "+iF(sq4)+". Then H = "+iF(sq4)+" / 19.6 = "+iF(H4)+" m. The maximum height is "+F3(ans)+" m.",
    {v:v,th:th}); qq3204.figure = p32figLaunch(v,th,"maxheight"); return qq3204;
});

E("u1-54-angled-range",1,["PH12.5.4"],2,"gen",function(){
  var v=ri(16,42), th=pick([25,30,35,40,45,50,55,60,65]);
  var rad=th*Math.PI/180, s4=sfR(Math.sin(rad),4), c4=sfR(Math.cos(rad),4);
  var vy4=sfR(v*s4,4), vx4=sfR(v*c4,4);
  var num4=sfR(2*vy4,4), T4=sfR(num4/PHYS_G,4), R4=sfR(vx4*T4,4), ans=sfR(R4,3);
  var qq3204 = numq("A soccer ball is kicked at "+gF(v)+" m/s at an angle of "+th+"° above the horizontal and lands on level ground. How far from the kick does the ball land? Give your answer in m.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Split the launch velocity into components: vx = "+gF(v)+" × "+iF(c4)+" = "+iF(vx4)+" m/s and vy = "+gF(v)+" × "+iF(s4)+" = "+iF(vy4)+" m/s. The flight time is the time for the vertical motion to go up and come back down: 2 × "+iF(vy4)+" = "+iF(num4)+" m/s, and "+iF(num4)+" / 9.8 = "+iF(T4)+" s. Range = "+iF(vx4)+" × "+iF(T4)+" = "+iF(R4)+" m. The ball lands "+F3(ans)+" m from the kick.",
    {v:v,th:th}); qq3204.figure = p32figLaunch(v,th,"range"); return qq3204;
});

E("u1-54-hit-or-miss-cr",1,["PH12.5.4"],3,"gen",function(){
  var v=ri(19,30), th=pick([35,40,45,50,55]);
  var rad=th*Math.PI/180, s4=sfR(Math.sin(rad),4), c4=sfR(Math.cos(rad),4);
  var vy4=sfR(v*s4,4), vx4=sfR(v*c4,4);
  var Rtot=vx4*(2*vy4/PHYS_G);
  var d=sfR(Rtot*rf(0.35,0.68),3);
  var t4=sfR(d/vx4,4), rise4=sfR(vy4*t4,4), tsq=sfR(t4*t4,4), drop4=sfR(4.9*tsq,4), y4=sfR(rise4-drop4,4);
  var clears=pick([true,false]);
  var hf=sfR(y4*(clears?0.78:1.28),3);
  var qq3204 = textq("A ball is kicked at "+gF(v)+" m/s at an angle of "+th+"° above the horizontal toward a fence "+gF(d)+" m away. The fence is "+gF(hf)+" m high. Does the ball clear the fence? Give your answer as yes or no.",
    [clears?"yes":"no"],
    "Find the height of the ball when it reaches the fence. The components are vx = "+gF(v)+" × "+iF(c4)+" = "+iF(vx4)+" m/s and vy = "+gF(v)+" × "+iF(s4)+" = "+iF(vy4)+" m/s. Time to reach the fence: "+gF(d)+" / "+iF(vx4)+" = "+iF(t4)+" s. In that time the ball rises "+iF(vy4)+" × "+iF(t4)+" = "+iF(rise4)+" m. Squaring the time, "+iF(t4)+" × "+iF(t4)+" = "+iF(tsq)+" s², so gravity pulls it down 4.90 × "+iF(tsq)+" = "+iF(drop4)+" m. Height at the fence: "+iF(rise4)+" - "+iF(drop4)+" = "+iF(y4)+" m. The fence is "+gF(hf)+" m, so the ball "+(clears?"clears the fence.":"does not clear the fence.")+" The answer is "+(clears?"yes.":"no."),
    {v:v,th:th,d:d,hf:hf}); qq3204.figure = p32figFence(v,th,d,hf); return qq3204;
});

/* ---------- PH12.5.5 Momentum, 2D collisions and explosions ---------- */

E("u1-55-stick-1d",1,["PH12.5.5"],2,"gen",function(){
  var form=pick(["rest","headon"]);
  var m1=ri(2,16)/2, v1=ri(5,12), m2=ri(2,16)/2, v2=0;
  if(form==="headon"){ v2=ri(3,10); var tr=0; while(m1*v1<=m2*v2+2&&tr<60){m2=ri(2,16)/2; v2=ri(3,10); tr++;} }
  var p1=sfR(m1*v1,4), p2=sfR(m2*v2,4);
  var ptot=(form==="headon")?sfR(p1-p2,4):p1;
  var mtot=sfR(m1+m2,4), vf4=sfR(ptot/mtot,4), ans=sfR(vf4,3);
  var prompt=(form==="headon")?
    "Take east as positive. A cart of mass "+gF(m1)+" kg moving east at "+gF(v1)+" m/s collides with a cart of mass "+gF(m2)+" kg moving west at "+gF(v2)+" m/s. The carts stick together. What is the velocity of the combined carts after the collision? Give your answer in m/s.":
    "Take east as positive. A cart of mass "+gF(m1)+" kg moving east at "+gF(v1)+" m/s collides with a stationary cart of mass "+gF(m2)+" kg. The carts stick together. What is the velocity of the combined carts after the collision? Give your answer in m/s.";
  var sol="Momentum is conserved. The first cart's momentum is "+gF(m1)+" × "+gF(v1)+" = "+iF(p1)+" kg·m/s."+
    (form==="headon"?
      " The second cart moves west, so its momentum is negative in this convention, with magnitude "+gF(m2)+" × "+gF(v2)+" = "+iF(p2)+" kg·m/s. Total momentum: "+iF(p1)+" - "+iF(p2)+" = "+iF(ptot)+" kg·m/s.":
      " The second cart is at rest, so the total momentum is "+iF(p1)+" kg·m/s.")+
    " The combined mass is "+gF(m1)+" + "+gF(m2)+" = "+gF(mtot)+" kg. Velocity = "+iF(ptot)+" / "+gF(mtot)+" = "+iF(vf4)+" m/s. The positive sign means east, so the combined carts move at "+F3(ans)+" m/s east.";
  return numq(prompt, ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {m1:m1,v1:v1,m2:m2,v2:v2});
});

E("u1-55-perp-direction",1,["PH12.5.5"],2,"gen",function(){
  var m1=ri(2,14)/2, v1=ri(3,9), m2=ri(2,14)/2, v2=ri(3,9), tr=0;
  var p1=m1*v1, p2=m2*v2;
  while(Math.abs(p1-p2)<0.08*Math.max(p1,p2)&&tr<80){m2=ri(2,14)/2; v2=ri(3,9); p2=m2*v2; tr++;}
  var th=sfR(Math.atan2(p2,p1)*180/Math.PI,4), comp=sfR(90-th,4);
  var qq3204 = mcq("A puck of mass "+gF(m1)+" kg sliding east at "+gF(v1)+" m/s collides with a puck of mass "+gF(m2)+" kg sliding north at "+gF(v2)+" m/s, and the two pucks stick together. In which direction does the combined mass move?",
    F3(th)+"° north of east",
    [F3(comp)+"° north of east", F3(th)+"° south of east", F3(comp)+"° north of west"],
    "The momenta are perpendicular: east momentum "+gF(m1)+" × "+gF(v1)+" = "+iF(sfR(p1,4))+" kg·m/s and north momentum "+gF(m2)+" × "+gF(v2)+" = "+iF(sfR(p2,4))+" kg·m/s. The combined mass moves along the total momentum, at an angle of arctan("+iF(sfR(p2,4))+" / "+iF(sfR(p1,4))+") north of east, which is "+F3(th)+"°. The combined mass moves "+F3(th)+"° north of east.",
    {m1:m1,v1:v1,m2:m2,v2:v2}); qq3204.figure = p32figMom2D(gF(m1)+" kg at "+gF(v1)+" m/s east",gF(m2)+" kg at "+gF(v2)+" m/s north",null); return qq3204;
});

E("u1-55-recoil",1,["PH12.5.5"],2,"gen",function(){
  var sc=pick(["rifle","cannon"]);
  var mp, vp, mg, thing, proj;
  if(sc==="rifle"){ mp=pick([0.020,0.025,0.030,0.040,0.050]); vp=ri(220,420); mg=ri(6,12)/2; thing="rifle"; proj="bullet"; }
  else { mp=ri(4,12); vp=ri(90,160); mg=ri(600,980); thing="cannon"; proj="shell"; }
  var p4=sfR(mp*vp,4), v4=sfR(p4/mg,4), ans=sfR(v4,3);
  return numq("A "+thing+" of mass "+gF(mg)+" kg fires a "+proj+" of mass "+gF(mp)+" kg at "+gF(vp)+" m/s. The "+thing+" is free to recoil and starts from rest. What is the recoil speed of the "+thing+"? Give your answer in m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "The total momentum starts at zero, so the "+thing+"'s recoil momentum must equal the "+proj+"'s momentum in size. The "+proj+"'s momentum is "+gF(mp)+" × "+gF(vp)+" = "+iF(p4)+" kg·m/s. Recoil speed = "+iF(p4)+" / "+gF(mg)+" = "+iF(v4)+" m/s. The "+thing+" recoils at "+F3(ans)+" m/s, in the direction opposite to the "+proj+".",
    {mp:mp,vp:vp,mg:mg});
});

E("u1-55-unknown-mass",1,["PH12.5.5"],2,"gen",function(){
  var m1=ri(2,10), v1=ri(4,12), m2true=ri(2,10);
  var vfP=sfR(m1*v1/(m1+m2true),3);
  var p4=sfR(m1*v1,4), mtot4=sfR(p4/vfP,4), m2_4=sfR(mtot4-m1,4), ans=sfR(m2_4,3);
  return numq("A cart of mass "+gF(m1)+" kg moving at "+gF(v1)+" m/s collides with a stationary cart and the two stick together. The combined carts are measured moving at "+gF(vfP)+" m/s. What is the mass of the second cart? Give your answer in kg.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Momentum is conserved. The incoming momentum is "+gF(m1)+" × "+gF(v1)+" = "+iF(p4)+" kg·m/s. This equals the combined mass multiplied by the final speed, so the combined mass is "+iF(p4)+" / "+gF(vfP)+" = "+iF(mtot4)+" kg. The second cart's mass is "+iF(mtot4)+" - "+gF(m1)+" = "+iF(m2_4)+" kg. The mass of the second cart is "+F3(ans)+" kg.",
    {m1:m1,v1:v1});
});

E("u1-55-rebound",1,["PH12.5.5"],2,"gen",function(){
  var m=pick([0.15,0.20,0.25,0.40,0.45,0.50,0.60]);
  var vi=ri(5,16), vf=ri(4,14), tr=0;
  while((vf===vi||vi===2*vf||vf===2*vi)&&tr<80){vf=ri(4,14);tr++;}
  var pi4=sfR(m*vi,4), pf4=sfR(m*vf,4), dp4=sfR(pi4+pf4,4);
  return mcq("Take the direction away from the wall as positive. A ball of mass "+gF(m)+" kg strikes a wall at "+gF(vi)+" m/s and rebounds at "+gF(vf)+" m/s. What is the magnitude of the change in momentum of the ball?",
    F3(dp4)+" kg·m/s",
    [F3(sfR(Math.abs(pi4-pf4),4))+" kg·m/s", F3(pi4)+" kg·m/s", F3(pf4)+" kg·m/s"],
    "The incoming momentum has magnitude "+gF(m)+" × "+gF(vi)+" = "+iF(pi4)+" kg·m/s and the rebound momentum has magnitude "+gF(m)+" × "+gF(vf)+" = "+iF(pf4)+" kg·m/s. Because the rebound reverses the direction, the momentum changes from negative to positive in this convention, and the change is the sum of the two magnitudes: "+iF(pi4)+" + "+iF(pf4)+" = "+iF(dp4)+" kg·m/s. The magnitude of the change in momentum is "+F3(dp4)+" kg·m/s.",
    {m:m,vi:vi,vf:vf});
});

E("u1-55-stick-2d-cr",1,["PH12.5.5"],3,"gen",function(){
  var m1=ri(2,12)/2, v1=ri(4,16)/2, m2=ri(2,12)/2, v2=ri(4,16)/2;
  var p1=sfR(m1*v1,4), p2=sfR(m2*v2,4);
  var sq1=sfR(p1*p1,4), sq2=sfR(p2*p2,4), sum=sfR(sq1+sq2,4), P4=sfR(Math.sqrt(sum),4);
  var mtot=sfR(m1+m2,4), v4=sfR(P4/mtot,4), ans=sfR(v4,3);
  var th=sfR(Math.atan2(p2,p1)*180/Math.PI,3);
  var qq3204 = numq("A cart of mass "+gF(m1)+" kg moving east at "+gF(v1)+" m/s collides with a cart of mass "+gF(m2)+" kg moving north at "+gF(v2)+" m/s on a frictionless surface, and the carts stick together. What is the speed of the combined carts after the collision? Give your answer in m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Momentum is conserved separately in each direction. East momentum: "+gF(m1)+" × "+gF(v1)+" = "+iF(p1)+" kg·m/s. North momentum: "+gF(m2)+" × "+gF(v2)+" = "+iF(p2)+" kg·m/s. Combine the perpendicular momenta: "+iF(p1)+" × "+iF(p1)+" = "+iF(sq1)+" and "+iF(p2)+" × "+iF(p2)+" = "+iF(sq2)+", and "+iF(sq1)+" + "+iF(sq2)+" = "+iF(sum)+". The square root of "+iF(sum)+" is "+iF(P4)+" kg·m/s, the magnitude of the total momentum. The combined mass is "+gF(m1)+" + "+gF(m2)+" = "+gF(mtot)+" kg, so the speed is "+iF(P4)+" / "+gF(mtot)+" = "+iF(v4)+" m/s, directed "+F3(th)+"° north of east. The speed of the combined carts is "+F3(ans)+" m/s.",
    {m1:m1,v1:v1,m2:m2,v2:v2}); qq3204.figure = p32figMom2D(gF(m1)+" kg at "+gF(v1)+" m/s east",gF(m2)+" kg at "+gF(v2)+" m/s north",null); return qq3204;
});

E("u1-55-third-piece-cr",1,["PH12.5.5"],3,"gen",function(){
  var a=ri(1,5), v1=ri(4,12), b=ri(1,5), v2=ri(4,12), c=ri(1,6);
  var p1=sfR(a*v1,4), p2=sfR(b*v2,4);
  var sq1=sfR(p1*p1,4), sq2=sfR(p2*p2,4), sum=sfR(sq1+sq2,4), P4=sfR(Math.sqrt(sum),4);
  var v4=sfR(P4/c,4), ans=sfR(v4,3);
  var th=sfR(Math.atan2(p2,p1)*180/Math.PI,3);
  var qq3204 = numq("A stationary firework shell explodes into three pieces. One piece of mass "+gF(a)+" kg flies east at "+gF(v1)+" m/s, and a second piece of mass "+gF(b)+" kg flies north at "+gF(v2)+" m/s. The third piece has mass "+gF(c)+" kg. What is the speed of the third piece? Give your answer in m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "The shell starts at rest, so the total momentum after the explosion must still be zero: the third piece must carry momentum equal in size to the combined momentum of the other two pieces, in the opposite direction. East momentum: "+gF(a)+" × "+gF(v1)+" = "+iF(p1)+" kg·m/s. North momentum: "+gF(b)+" × "+gF(v2)+" = "+iF(p2)+" kg·m/s. Combining: "+iF(p1)+" × "+iF(p1)+" = "+iF(sq1)+" and "+iF(p2)+" × "+iF(p2)+" = "+iF(sq2)+", and "+iF(sq1)+" + "+iF(sq2)+" = "+iF(sum)+". The square root of "+iF(sum)+" is "+iF(P4)+" kg·m/s. The third piece's speed is "+iF(P4)+" / "+gF(c)+" = "+iF(v4)+" m/s, directed "+F3(th)+"° south of west, opposite to the combined momentum of the first two pieces. The speed of the third piece is "+F3(ans)+" m/s.",
    {a:a,v1:v1,b:b,v2:v2,c:c}); qq3204.figure = p32figMom2D(gF(a)+" kg at "+gF(v1)+" m/s east",gF(b)+" kg at "+gF(v2)+" m/s north",gF(c)+" kg, ?"); return qq3204;
});

/* ----- bank-u2.js ----- */
// Diagram figures (Phase C, Nov 2026): entries whose source question type
// carried a diagram now set qq3204.figure from the draw's own values via the
// p32fig* helpers in bank-helpers.js. Asked unknowns are labelled "?".
// Physics 3204 Unit 2 Forces question bank (circular motion, 2D dynamics,
// static equilibrium and torques)
// CRMARKS: u2-61-scaling-cr=2
// CRMARKS: u2-61-speed-accel-cr=3
// CRMARKS: u2-62-banked-cr=4
// CRMARKS: u2-62-dip-cr=4
// CRMARKS: u2-62-minspeed-cr=3
// CRMARKS: u2-63-incline-friction-cr=4
// CRMARKS: u2-63-pulley-cr=5
// CRMARKS: u2-64-beam-cr=4
// CRMARKS: u2-64-ladder-cr=4
// CRMARKS: u2-64-wires-cr=2

/* ============ Units and significant figures discipline (Nov 2026) ============
   Givens are fixed at 3 significant figures and printed with gF().
   Intermediates print at 4 significant figures with iF() and each next step
   is computed from the printed intermediate, so every printed arithmetic
   line reproduces at printed precision. Final answers are stored and
   printed at 3 significant figures with F3(), always with their unit.
   Printed arithmetic lines are kept below 1000 so no value needs the
   scientific print form inside a checked line. g = 9.8 m/s^2 throughout. */

/* ---------- PH12.6.1 Uniform circular motion described ---------- */

E("u2-61-period-frequency",2,["PH12.6.1"],1,"gen",function(){
  var N,t,T,f,opts;
  do {
    N=ri(12,48); t=ri(25,110);
    T=sfR(t/N,3); f=sfR(N/t,3);
    opts=[T,f,sfR(2*T,3),sfR(T/2,3)].map(function(x){return F3(x);});
  } while (new Set(opts).size<4);
  return mcq("A turntable completes "+N+" full revolutions in "+t+" s. What is the period of the rotation?",
    F3(T)+" s",
    [F3(f)+" s", F3(sfR(2*T,3))+" s", F3(sfR(T/2,3))+" s"],
    "The period is the time taken for one complete revolution, so divide the total time by the number of revolutions: "+t+" / "+N+" = "+F3(T)+" s. The period is "+F3(T)+" s. The value "+F3(f)+" s would come from dividing the wrong way; "+F3(f)+" is in fact the frequency, the number of revolutions per second.",
    {N:N,t:t});
});

E("u2-61-direction",2,["PH12.6.1"],1,"var",varset([
  function(){
    var qq3204 = mcq("A ball on a string moves in a horizontal circle at a steady speed. At any instant, the direction of the ball's velocity is",
      "Tangent to the circle, in the direction of motion",
      ["Toward the centre of the circle",
       "Away from the centre of the circle",
       "Along the string, toward the hand holding it"],
      "Velocity is always along the path of motion. For circular motion the path is the circle itself, so the velocity points along the tangent to the circle at the ball's position. It is the acceleration, not the velocity, that points toward the centre.",{}); qq3204.figure = p32figCircleTop("string",null,null,true); return qq3204;
  },
  function(){
    var qq3204 = mcq("A ball on a string moves in a horizontal circle at a steady speed. The direction of the ball's acceleration is",
      "Toward the centre of the circle",
      ["Tangent to the circle, in the direction of motion",
       "Away from the centre of the circle",
       "Zero, because the speed is steady"],
      "Even at a steady speed, the direction of motion changes continuously, so the velocity changes and there is an acceleration. For uniform circular motion that acceleration points toward the centre of the circle, which is why it is called centripetal, meaning centre-seeking.",{}); qq3204.figure = p32figCircleTop("string",null,null,true); return qq3204;
  },
  function(){
    var qq3204 = mcq("A car rounds a flat curve at a steady speed. The direction of the net force on the car is",
      "Toward the centre of the curve",
      ["Forward, in the direction the car is travelling",
       "Zero, because the speed is steady",
       "Backward, opposite to the direction of travel"],
      "Newton's second law says the net force points the same way as the acceleration. In uniform circular motion the acceleration is centripetal, toward the centre of the curve, so the net force points toward the centre of the curve as well. A steady speed does not mean zero net force when the direction is changing.",{}); qq3204.figure = p32figCircleTop("string",null,null,true); return qq3204;
  },
  function(){
    var qq3204 = mcq("A ball whirled in a horizontal circle on a string is suddenly released when the string breaks. Ignoring gravity, the ball then moves",
      "In a straight line tangent to the circle at the point of release",
      ["Straight outward, away from the centre of the circle",
       "In a smaller and smaller circle until it stops",
       "Toward the centre of the circle, then stops"],
      "While the string holds, its tension supplies the centripetal force that keeps changing the ball's direction. Once the string breaks there is no inward force, so by Newton's first law the ball keeps the velocity it had at release, which is tangent to the circle. It flies off along the tangent, not radially outward.",{}); qq3204.figure = p32figCircleTop("string",null,null,true); return qq3204;
  }
]));

E("u2-61-scaling-concept",2,["PH12.6.1"],1,"var",varset([
  function(){
    return mcq("A car rounds a curve of fixed radius. If the car's speed is doubled, the centripetal acceleration",
      "Becomes four times as large",
      ["Becomes two times as large",
       "Stays the same",
       "Becomes half as large"],
      "Centripetal acceleration is a = v^2 / r, so it varies with the square of the speed. Doubling the speed multiplies v^2 by four, so the centripetal acceleration becomes four times as large.",{});
  },
  function(){
    return mcq("A cyclist rides around two curves at the same speed. The second curve has twice the radius of the first. The centripetal acceleration on the second curve is",
      "Half the acceleration on the first curve",
      ["Twice the acceleration on the first curve",
       "The same as on the first curve",
       "Four times the acceleration on the first curve"],
      "Centripetal acceleration is a = v^2 / r, so at a fixed speed it varies inversely with the radius. Doubling the radius halves the centripetal acceleration.",{});
  },
  function(){
    return mcq("A stone on a string is whirled in a circle of fixed radius. If the speed is cut in half, the centripetal force needed",
      "Becomes one quarter as large",
      ["Becomes one half as large",
       "Stays the same",
       "Becomes twice as large"],
      "Centripetal force is F = m v^2 / r, so it varies with the square of the speed. Halving the speed multiplies v^2 by one quarter, so the centripetal force needed becomes one quarter as large.",{});
  },
  function(){
    return mcq("A turntable spins a coin in a circle of fixed radius. If the frequency of rotation is doubled, the centripetal acceleration of the coin",
      "Becomes four times as large",
      ["Becomes two times as large",
       "Stays the same",
       "Becomes half as large"],
      "Doubling the frequency doubles the speed, because the coin covers the same circumference in half the time. Since centripetal acceleration varies with the square of the speed, doubling the speed makes the acceleration four times as large.",{});
  }
]));

E("u2-61-speed-numq",2,["PH12.6.1"],2,"gen",function(){
  var r=sfR(rf(0.40,3.20),3), T=sfR(rf(2.5,9.0),3);
  var C4=sfR(2*Math.PI*r,4), v4=sfR(C4/T,4), ans=sfR(v4,3);
  var qq3204 = numq("A child sits at the edge of a merry-go-round of radius "+gF(r)+" m. The merry-go-round completes one revolution every "+gF(T)+" s. What is the child's speed? Give your answer in m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "In one revolution the child travels the circumference of the circle, which is "+iF(C4)+" m. Speed is distance divided by time: "+iF(C4)+" / "+gF(T)+" = "+iF(v4)+" m/s. The child's speed is "+F3(ans)+" m/s.",
    {r:r,T:T}); qq3204.figure = p32figCircleTop(gF(r)+" m",null,null,false); return qq3204;
});

E("u2-61-centripetal-accel-mc",2,["PH12.6.1"],2,"gen",function(){
  var v,r,v24,a4,ans,opts;
  do {
    v=sfR(rf(3.5,14.0),3); r=sfR(rf(1.2,9.0),3);
    v24=sfR(v*v,4); a4=sfR(v24/r,4); ans=sfR(a4,3);
    opts=[ans,sfR(v/r,3),sfR(2*a4,3),sfR(a4/2,3)].map(function(x){return F3(x);});
  } while (new Set(opts).size<4);
  var qq3204 = mcq("A ball is whirled in a horizontal circle of radius "+gF(r)+" m at a steady speed of "+gF(v)+" m/s. What is the centripetal acceleration of the ball?",
    F3(ans)+" m/s^2",
    [F3(sfR(v/r,3))+" m/s^2", F3(sfR(2*a4,3))+" m/s^2", F3(sfR(a4/2,3))+" m/s^2"],
    "Centripetal acceleration is a = v^2 / r. First square the speed: "+gF(v)+" × "+gF(v)+" = "+iF(v24)+" m^2/s^2. Then divide by the radius: "+iF(v24)+" / "+gF(r)+" = "+iF(a4)+" m/s^2. The centripetal acceleration is "+F3(ans)+" m/s^2, directed toward the centre of the circle.",
    {v:v,r:r}); qq3204.figure = p32figCircleTop(gF(r)+" m",gF(v)+" m/s",null,false); return qq3204;
});

E("u2-61-speed-accel-cr",2,["PH12.6.1"],2,"gen",function(){
  var r=sfR(rf(6.0,14.0),3), T=sfR(rf(18.0,40.0),3);
  var C4=sfR(2*Math.PI*r,4), v4=sfR(C4/T,4), v24=sfR(v4*v4,4), a4=sfR(v24/r,4), ans=sfR(a4,3);
  var qq3204 = numq("A Ferris wheel of radius "+gF(r)+" m carries a rider at a steady speed, completing one revolution in "+gF(T)+" s. What is the centripetal acceleration of the rider? Give your answer in m/s^2.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "First find the rider's speed. One revolution covers the circumference of the wheel, which is "+iF(C4)+" m, so the speed is "+iF(C4)+" / "+gF(T)+" = "+iF(v4)+" m/s. Centripetal acceleration is a = v^2 / r. Square the speed: "+iF(v4)+" × "+iF(v4)+" = "+iF(v24)+" m^2/s^2. Then divide by the radius: "+iF(v24)+" / "+gF(r)+" = "+iF(a4)+" m/s^2. The centripetal acceleration of the rider is "+F3(ans)+" m/s^2, toward the centre of the wheel.",
    {r:r,T:T}); qq3204.figure = p32figCircleTop(gF(r)+" m",null,null,false); return qq3204;
});

E("u2-61-scaling-cr",2,["PH12.6.1"],2,"gen",function(){
  var k=pick([2,3]);
  var F1=k===2?sfR(rf(40.0,220.0),3):sfR(rf(30.0,95.0),3);
  var ratio=k*k, F2_4=sfR(F1*ratio,4), ans=sfR(F2_4,3);
  return numq("A car rounds a flat curve of fixed radius, and the road exerts a centripetal force of "+gF(F1)+" N on the car. The car then goes around the same curve at "+k+" times the speed. What centripetal force is required now? Give your answer in N.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Centripetal force is F = m v^2 / r, so with the mass and radius unchanged it varies with the square of the speed. The speed multiplier is "+k+", and the force multiplier is "+k+" × "+k+" = "+ratio+". The new force is "+gF(F1)+" × "+ratio+" = "+iF(F2_4)+" N. The required centripetal force is "+F3(ans)+" N.",
    {k:k,F1:F1});
});

E("u2-61-claim-judge",2,["PH12.6.1"],3,"var",varset([
  function(){
    var m=1.50, r=2.00;
    var v1=4.00, v2=8.00;
    var s1=sfR(v1*v1,4), s2=sfR(v2*v2,4);
    var p1=sfR(m*s1,4), F1=sfR(p1/r,4), p2=sfR(m*s2,4), F2=sfR(p2/r,4), ratio=sfR(F2/F1,4);
    return mcq("A student claims that if a car doubles its speed on a curve of the same radius, the centripetal force needed just doubles. Which judgement of the claim is correct?",
      "The claim is wrong: the force becomes four times as large, because centripetal force varies with the square of the speed",
      ["The claim is correct: force is proportional to speed, so doubling the speed doubles the force",
       "The claim is wrong: the force stays the same, because the radius does not change",
       "The claim is wrong: the force is halved, because the car spends less time on the curve"],
      "Check the claim with numbers. For a "+gF(m)+" kg object on a "+gF(r)+" m radius curve at "+gF(v1)+" m/s, the speed squared is "+iF(s1)+" m^2/s^2, and the force is "+gF(m)+" × "+iF(s1)+" = "+iF(p1)+" N, then "+iF(p1)+" / "+gF(r)+" = "+iF(F1)+" N. At double the speed, "+gF(v2)+" m/s, the speed squared is "+iF(s2)+" m^2/s^2, and the force is "+gF(m)+" × "+iF(s2)+" = "+iF(p2)+" N, then "+iF(p2)+" / "+gF(r)+" = "+iF(F2)+" N. Comparing: "+iF(F2)+" / "+iF(F1)+" = "+iF(ratio)+". The force quadruples, so the claim is wrong.",{});
  },
  function(){
    var r=50.0, tanR=sfR(Math.tan(20*Math.PI/180),3);
    var p1=sfR(r*9.8,4), p2=sfR(p1*tanR,4), v=sfR(Math.sqrt(p2),3);
    return mcq("A student claims that on a curve banked for no friction, a heavier car must travel faster than a lighter car to stay on the curve without friction. Which judgement of the claim is correct?",
      "The claim is wrong: the no-friction speed depends on the radius, the banking angle and g only, so it is the same for every mass",
      ["The claim is correct: a heavier car needs more centripetal force, so it must go faster",
       "The claim is wrong: the heavier car must travel slower, because its weight holds it down",
       "The claim is correct for trucks but wrong for cars"],
      "For a banked curve with no friction, the condition is tan of the banking angle equals v^2 / (r g). The mass cancels out of the derivation, so the design speed cannot depend on the mass. As a check, for a radius of "+gF(r)+" m banked at 20 degrees, v^2 is "+gF(r)+" × 9.8 = "+iF(p1)+" m^2/s^2, then "+iF(p1)+" × "+fmt(tanR,3)+" = "+iF(p2)+" m^2/s^2, giving a speed of "+F3(v)+" m/s for any vehicle, heavy or light. The claim is wrong.",{});
  },
  function(){
    var v1=6.00, r1=3.00, v2=12.0, r2=6.00;
    var s1=sfR(v1*v1,4), a1=sfR(s1/r1,4), s2=sfR(v2*v2,4), a2=sfR(s2/r2,4);
    return mcq("A student claims that if both the speed and the radius of a circular path are doubled, the centripetal acceleration stays the same. Which judgement of the claim is correct?",
      "The claim is wrong: the acceleration doubles, because the speed effect (squared) outweighs the radius effect",
      ["The claim is correct: doubling the radius exactly cancels doubling the speed",
       "The claim is wrong: the acceleration becomes four times as large",
       "The claim is wrong: the acceleration is halved"],
      "Test the claim with numbers. At "+gF(v1)+" m/s on a "+gF(r1)+" m radius, the speed squared is "+iF(s1)+" m^2/s^2 and the acceleration is "+iF(s1)+" / "+gF(r1)+" = "+iF(a1)+" m/s^2. Doubling both gives a speed squared of "+iF(s2)+" m^2/s^2 on a "+gF(r2)+" m radius, and the acceleration is "+iF(s2)+" / "+gF(r2)+" = "+iF(a2)+" m/s^2. The acceleration doubled, it did not stay the same, so the claim is wrong.",{});
  },
  function(){
    var T1=4.00, T2=2.00;
    var f1=sfR(1/T1,4), f2=sfR(1/T2,4);
    return mcq("A student claims that if the period of a rotation is halved, the frequency is also halved. Which judgement of the claim is correct?",
      "The claim is wrong: frequency is the reciprocal of period, so halving the period doubles the frequency",
      ["The claim is correct: period and frequency change in the same direction",
       "The claim is wrong: the frequency stays the same, because the rotation is the same motion",
       "The claim is wrong: halving the period makes the frequency four times as large"],
      "Frequency and period are reciprocals: f = 1 / T. With a period of "+gF(T1)+" s, the frequency is 1 / "+gF(T1)+" = "+iF(f1)+" Hz. Halving the period to "+gF(T2)+" s gives 1 / "+gF(T2)+" = "+iF(f2)+" Hz. The frequency doubled, so the claim is wrong.",{});
  }
]));

/* ---------- PH12.6.2 Circular motion using Newton's laws ---------- */

E("u2-62-flatcurve-maxspeed",2,["PH12.6.2"],2,"gen",function(){
  var mu=pick([0.250,0.350,0.450,0.550,0.650,0.750]), r=sfR(rf(25.0,70.0),3);
  var amax4=sfR(mu*9.8,4), v2_4=sfR(amax4*r,4), ans=sfR(Math.sqrt(v2_4),3);
  return numq("A car rounds a flat, unbanked curve of radius "+gF(r)+" m. The coefficient of static friction between the tires and the road is "+gF(mu)+". What is the maximum speed at which the car can round the curve without sliding? Give your answer in m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "On a flat curve, friction alone supplies the centripetal force. The largest centripetal acceleration friction can provide is mu times g: "+gF(mu)+" × 9.8 = "+iF(amax4)+" m/s^2. Since a = v^2 / r, the greatest v^2 is "+iF(amax4)+" × "+gF(r)+" = "+iF(v2_4)+" m^2/s^2. Taking the square root gives the maximum speed, "+F3(ans)+" m/s. Any faster and the needed centripetal force would exceed the maximum static friction.",
    {mu:mu,r:r});
});

E("u2-62-tension-horizontal",2,["PH12.6.2"],2,"gen",function(){
  var m,v,r,v24,a4,T4,T,opts;
  do {
    m=sfR(rf(0.30,1.40),3); v=sfR(rf(2.5,8.5),3); r=sfR(rf(0.60,1.60),3);
    v24=sfR(v*v,4); a4=sfR(v24/r,4); T4=sfR(m*a4,4); T=sfR(T4,3);
    opts=[T,sfR(m*v/r,3),sfR(m*9.8,3),sfR(T4/2,3)].map(function(x){return F3(x);});
  } while (new Set(opts).size<4);
  var qq3204 = mcq("A puck of mass "+gF(m)+" kg slides in a horizontal circle on a frictionless table, held by a string that passes through a hole in the table. The puck moves at "+gF(v)+" m/s in a circle of radius "+gF(r)+" m. What is the tension in the string?",
    F3(T)+" N",
    [F3(sfR(m*v/r,3))+" N", F3(sfR(m*9.8,3))+" N", F3(sfR(T4/2,3))+" N"],
    "The table is frictionless and horizontal, so the tension is the only horizontal force and it alone supplies the centripetal force. First find the centripetal acceleration: "+gF(v)+" × "+gF(v)+" = "+iF(v24)+" m^2/s^2, then "+iF(v24)+" / "+gF(r)+" = "+iF(a4)+" m/s^2. Newton's second law gives the tension: "+gF(m)+" × "+iF(a4)+" = "+iF(T4)+" N. The tension in the string is "+F3(T)+" N.",
    {m:m,v:v,r:r}); qq3204.figure = p32figCircleTop(gF(r)+" m",gF(v)+" m/s",gF(m)+" kg",true); return qq3204;
});

E("u2-62-loop-top",2,["PH12.6.2"],2,"gen",function(){
  var m,v,r,v24,a4,Fc4,W4,N4,ans;
  do {
    m=sfR(rf(0.35,0.85),3); v=sfR(rf(4.5,8.5),3); r=sfR(rf(0.45,1.10),3);
    v24=sfR(v*v,4); a4=sfR(v24/r,4); Fc4=sfR(m*a4,4); W4=sfR(m*9.8,4); N4=sfR(Fc4-W4,4);
  } while (N4<1.5);
  ans=sfR(N4,3);
  var qq3204 = numq("A ball of mass "+gF(m)+" kg rolls around the inside of a vertical loop of radius "+gF(r)+" m. At the top of the loop the ball is moving at "+gF(v)+" m/s. What is the force exerted on the ball by the track at the top of the loop? Give your answer in N.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Take toward the centre of the loop as positive. At the top, the centre is below the ball, so both gravity and the track's normal force point toward the centre and together supply the centripetal force. First find the centripetal force: "+gF(v)+" × "+gF(v)+" = "+iF(v24)+" m^2/s^2, then "+iF(v24)+" / "+gF(r)+" = "+iF(a4)+" m/s^2, then "+gF(m)+" × "+iF(a4)+" = "+iF(Fc4)+" N. The ball's weight is "+gF(m)+" × 9.8 = "+iF(W4)+" N. So the normal force is "+iF(Fc4)+" - "+iF(W4)+" = "+iF(N4)+" N. The track exerts "+F3(ans)+" N on the ball at the top of the loop.",
    {m:m,v:v,r:r}); qq3204.figure = p32figLoop(r,v,m,"top"); return qq3204;
});

E("u2-62-loop-bottom",2,["PH12.6.2"],2,"gen",function(){
  var m,v,r,v24,a4,Fc4,W4,N4,ans,opts;
  do {
    m=sfR(rf(0.35,0.85),3); v=sfR(rf(4.5,8.5),3); r=sfR(rf(0.45,1.10),3);
    v24=sfR(v*v,4); a4=sfR(v24/r,4); Fc4=sfR(m*a4,4); W4=sfR(m*9.8,4); N4=sfR(Fc4+W4,4); ans=sfR(N4,3);
    opts=[ans,sfR(Fc4,3),sfR(W4,3),sfR(Fc4-W4,4)].map(function(x){return F3(x);});
  } while (new Set(opts).size<4 || Fc4-W4<0.5);
  var qq3204 = mcq("A ball of mass "+gF(m)+" kg rolls around the inside of a vertical loop of radius "+gF(r)+" m. At the bottom of the loop the ball is moving at "+gF(v)+" m/s. What is the force exerted on the ball by the track at the bottom of the loop?",
    F3(ans)+" N",
    [F3(sfR(Fc4,3))+" N", F3(sfR(W4,3))+" N", F3(sfR(Fc4-W4,4))+" N"],
    "Take toward the centre of the loop as positive. At the bottom, the centre is above the ball, so the normal force points toward the centre and gravity points away from it: N - W = F_c. First find the centripetal force: "+gF(v)+" × "+gF(v)+" = "+iF(v24)+" m^2/s^2, then "+iF(v24)+" / "+gF(r)+" = "+iF(a4)+" m/s^2, then "+gF(m)+" × "+iF(a4)+" = "+iF(Fc4)+" N. The weight is "+gF(m)+" × 9.8 = "+iF(W4)+" N. So the normal force is "+iF(Fc4)+" + "+iF(W4)+" = "+iF(N4)+" N. The track exerts "+F3(ans)+" N on the ball at the bottom, more than at the top, because there the normal force must both support the weight and supply the centripetal force.",
    {m:m,v:v,r:r}); qq3204.figure = p32figLoop(r,v,m,"bottom"); return qq3204;
});

E("u2-62-minspeed-cr",2,["PH12.6.2"],3,"gen",function(){
  var r=sfR(rf(4.0,14.0),3);
  var v2_4=sfR(9.8*r,4), ans=sfR(Math.sqrt(v2_4),3);
  var qq3204 = numq("A roller coaster car goes around a vertical loop of radius "+gF(r)+" m. What is the minimum speed the car can have at the top of the loop and still stay on the track? Give your answer in m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "At the minimum speed, the car is just barely in contact with the track at the top, so the track exerts no normal force there. Gravity alone supplies the centripetal force: m g = m v^2 / r. The mass cancels, leaving v^2 = g r: 9.8 × "+gF(r)+" = "+iF(v2_4)+" m^2/s^2. Taking the square root gives the minimum speed, "+F3(ans)+" m/s. Any slower at the top and gravity would pull the car off the track before it completed the loop.",
    {r:r}); qq3204.figure = p32figLoop(r,0,0,"top"); return qq3204;
});

E("u2-62-dip-cr",2,["PH12.6.2"],2,"gen",function(){
  var m,v,r,v24,a4,Fc4,W4,N4,ans;
  do {
    m=sfR(rf(48.0,72.0),3); v=sfR(rf(5.0,8.5),3); r=sfR(rf(6.0,14.0),3);
    v24=sfR(v*v,4); a4=sfR(v24/r,4); Fc4=sfR(m*a4,4); W4=sfR(m*9.8,4); N4=sfR(Fc4+W4,4);
  } while (N4>=950 || Fc4<40);
  ans=sfR(N4,3);
  var qq3204 = numq("A skateboarder with a total mass of "+gF(m)+" kg (rider and board) passes through the bottom of a bowl-shaped dip of radius "+gF(r)+" m at a speed of "+gF(v)+" m/s. What force does the surface of the bowl exert on the skateboarder at the bottom of the dip? Give your answer in N.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Take toward the centre of the bowl's curve as positive. At the bottom of the dip the centre is directly above, so the normal force points toward the centre and gravity points away: N - W = F_c. First find the centripetal force: "+gF(v)+" × "+gF(v)+" = "+iF(v24)+" m^2/s^2, then "+iF(v24)+" / "+gF(r)+" = "+iF(a4)+" m/s^2, then "+gF(m)+" × "+iF(a4)+" = "+iF(Fc4)+" N. The weight is "+gF(m)+" × 9.8 = "+iF(W4)+" N. So the normal force is "+iF(Fc4)+" + "+iF(W4)+" = "+iF(N4)+" N. The surface exerts "+F3(ans)+" N, noticeably more than the skateboarder's weight, which is why the rider feels pressed into the board at the bottom of a dip.",
    {m:m,v:v,r:r}); qq3204.figure = p32figDip(r,v,m); return qq3204;
});

E("u2-62-banked-cr",2,["PH12.6.2"],3,"gen",function(){
  var v,r,v24,rg4,ratio4,ans;
  do {
    v=sfR(rf(12.0,26.0),3); r=sfR(rf(45.0,95.0),3);
    v24=sfR(v*v,4); rg4=sfR(r*9.8,4); ratio4=sfR(v24/rg4,4);
  } while (ratio4<0.15 || ratio4>0.85);
  ans=sfR(Math.atan(ratio4)*180/Math.PI,3);
  var qq3204 = numq("A highway curve of radius "+gF(r)+" m is to be banked so that a car travelling at "+gF(v)+" m/s can round the curve with no friction at all between the tires and the road. At what angle should the curve be banked? Give your answer in degrees.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "With no friction, the horizontal component of the normal force supplies the centripetal force, and the condition works out to tan of the banking angle equals v^2 / (r g). First square the speed: "+gF(v)+" × "+gF(v)+" = "+iF(v24)+" m^2/s^2. Then find r g: "+gF(r)+" × 9.8 = "+iF(rg4)+" m^2/s^2. The ratio is "+iF(v24)+" / "+iF(rg4)+" = "+iF(ratio4)+". The angle whose tangent is "+iF(ratio4)+" is "+F3(ans)+" degrees. The curve should be banked at "+F3(ans)+" degrees, and note that the mass of the car does not enter the result.",
    {v:v,r:r}); qq3204.figure = p32figBanked(v,r); return qq3204;
});

E("u2-62-effective-weight",2,["PH12.6.2"],1,"var",varset([
  function(){
    var qq3204 = mcq("A car drives at a steady speed over the crest of a rounded hill. Compared with its weight on flat ground, the normal force on the car at the crest is",
      "Less than the car's weight, so the driver feels lighter",
      ["Greater than the car's weight, so the driver feels heavier",
       "Equal to the car's weight, because the speed is steady",
       "Zero, because the car leaves the road at any crest"],
      "At the crest the centre of the curve is below the car, so gravity supplies part of the centripetal force and the road needs to push up with less than the full weight: N = m g - m v^2 / r. The normal force is less than the weight, and the driver feels lighter.",{}); qq3204.figure = p32figCrestDip("crest"); return qq3204;
  },
  function(){
    var qq3204 = mcq("A cyclist coasts through the bottom of a dip in the road at a steady speed. Compared with the cyclist's weight on flat ground, the normal force at the bottom of the dip is",
      "Greater than the cyclist's weight, so the cyclist feels heavier",
      ["Less than the cyclist's weight, so the cyclist feels lighter",
       "Equal to the cyclist's weight, because the speed is steady",
       "Zero, because the road cannot push at the bottom of a dip"],
      "At the bottom of the dip the centre of the curve is above, so the normal force must both support the weight and supply the centripetal force: N = m g + m v^2 / r. The normal force is greater than the weight, and the cyclist feels heavier.",{}); qq3204.figure = p32figCrestDip("dip"); return qq3204;
  },
  function(){
    var qq3204 = mcq("A roller coaster car passes the top of a loop at exactly the minimum speed needed to stay on the track. The normal force exerted by the track on the car at that moment is",
      "Zero, because gravity alone supplies the centripetal force",
      ["Equal to the car's weight",
       "Twice the car's weight",
       "Equal to the centripetal force plus the car's weight"],
      "At the minimum speed the car is just in contact with the track, so the track pushes with no normal force at all. Gravity alone provides the centripetal force, m g = m v^2 / r, and the riders feel momentarily weightless.",{}); qq3204.figure = p32figCrestDip("loop"); return qq3204;
  },
  function(){
    var qq3204 = mcq("A car travels at a steady speed along a straight, flat stretch of highway. The normal force exerted by the road on the car is",
      "Equal to the car's weight, because there is no vertical acceleration and no curve",
      ["Less than the car's weight, because the car is moving",
       "Greater than the car's weight, because of the car's speed",
       "Zero, because the road is flat"],
      "On a straight, flat road there is no vertical acceleration and no centre of a curve to accelerate toward, so the vertical forces balance: the normal force equals the car's weight. Speed along a straight, flat road does not change the normal force.",{}); qq3204.figure = p32figCrestDip("flat"); return qq3204;
  }
]));

E("u2-62-claim-judge",2,["PH12.6.2"],3,"var",varset([
  function(){
    var m=0.500, v=6.00, r=0.800;
    var s=sfR(v*v,4), p=sfR(m*s,4), Fc=sfR(p/r,4), W=sfR(m*9.8,4), N=sfR(Fc-W,4);
    return mcq("A student claims that a rider at the top of a loop is always weightless, no matter the speed. Which judgement of the claim is correct?",
      "The claim is wrong: the rider is weightless only at the one minimum speed; faster than that, the track pushes down with a real normal force",
      ["The claim is correct: at the top of a loop the normal force is always zero",
       "The claim is wrong: the normal force at the top is always larger than the rider's weight",
       "The claim is correct, but only for loops with a large radius"],
      "Test the claim with numbers. Take a "+gF(m)+" kg ball at "+gF(v)+" m/s at the top of a "+gF(r)+" m radius loop. The speed squared is "+iF(s)+" m^2/s^2, so the centripetal force is "+gF(m)+" × "+iF(s)+" = "+iF(p)+" N, then "+iF(p)+" / "+gF(r)+" = "+iF(Fc)+" N. The weight is "+gF(m)+" × 9.8 = "+iF(W)+" N, so the normal force is "+iF(Fc)+" - "+iF(W)+" = "+iF(N)+" N, which is not zero. The rider is weightless only at the minimum speed, where the normal force works out to exactly zero. The claim is wrong.",{});
  },
  function(){
    var m=0.500, v=6.00, r=0.800;
    var s=sfR(v*v,4), p=sfR(m*s,4), Fc=sfR(p/r,4), W=sfR(m*9.8,4), N=sfR(Fc+W,4);
    return mcq("A student claims that at the bottom of a loop, the normal force on a rider equals the centripetal force. Which judgement of the claim is correct?",
      "The claim is wrong: the normal force equals the centripetal force plus the rider's weight",
      ["The claim is correct: at the bottom the normal force is the centripetal force",
       "The claim is wrong: the normal force equals the rider's weight only",
       "The claim is wrong: the normal force equals the centripetal force minus the rider's weight"],
      "At the bottom of the loop the equation is N - W = F_c, because the normal force must overcome gravity and still supply the centripetal force. With the same numbers as a typical loop problem, a "+gF(m)+" kg ball at "+gF(v)+" m/s on a "+gF(r)+" m radius needs a centripetal force of "+iF(Fc)+" N and has a weight of "+iF(W)+" N. The normal force is "+iF(Fc)+" + "+iF(W)+" = "+iF(N)+" N, which is the centripetal force plus the weight, not the centripetal force alone. The claim is wrong.",{});
  },
  function(){
    var m=60.0, v=3.00, r=12.0;
    var s=sfR(v*v,4), p=sfR(m*s,4), Fc=sfR(p/r,4);
    return mcq("A student claims that a cyclist can round a completely icy flat curve (no friction at all) as long as they go slowly enough. Which judgement of the claim is correct?",
      "The claim is wrong: with zero friction there is no horizontal force at all, so no centripetal force is available at any speed above zero",
      ["The claim is correct: at a low enough speed, friction is not needed",
       "The claim is wrong: the cyclist would need more friction when going slower, not less",
       "The claim is correct, provided the cyclist leans into the curve"],
      "On a flat curve, friction is the only horizontal force available to supply the centripetal force. Even at a crawl the need is not zero: a "+gF(m)+" kg cyclist at just "+gF(v)+" m/s on a "+gF(r)+" m radius curve needs "+gF(m)+" × "+iF(s)+" = "+iF(p)+" N, then "+iF(p)+" / "+gF(r)+" = "+iF(Fc)+" N of centripetal force. With no friction the road can supply none of it, so the cyclist would continue in a straight line. The claim is wrong.",{});
  },
  function(){
    return mcq("A student claims that the minimum speed at the top of a loop is the speed at which the normal force there is at its largest. Which judgement of the claim is correct?",
      "The claim is wrong: at the minimum speed the normal force is zero, its smallest possible value",
      ["The claim is correct: the track pushes hardest when the car is moving slowest",
       "The claim is wrong: at the minimum speed the normal force equals the car's weight",
       "The claim is wrong: the normal force does not depend on the speed at all"],
      "At the top of a loop, N = m v^2 / r - m g, so the normal force grows as the speed grows. The minimum speed is defined by the car just staying in contact, which is the condition N = 0. Far from being the largest, the normal force at the minimum speed is zero, the smallest it can be. The claim is wrong.",{});
  }
]));

E("u2-62-string-vertical",2,["PH12.6.2"],2,"gen",function(){
  var m=sfR(rf(0.25,0.80),3), v=sfR(rf(3.5,7.5),3), r=sfR(rf(0.50,1.20),3);
  var v24=sfR(v*v,4), a4=sfR(v24/r,4), Fc4=sfR(m*a4,4), W4=sfR(m*9.8,4), T4=sfR(Fc4+W4,4), ans=sfR(T4,3);
  var qq3204 = numq("A ball of mass "+gF(m)+" kg is whirled in a vertical circle of radius "+gF(r)+" m on a string. At the bottom of the circle the ball is moving at "+gF(v)+" m/s. What is the tension in the string at the bottom of the circle? Give your answer in N.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Take toward the centre of the circle as positive. At the bottom, the centre is above the ball, so the tension points toward the centre and gravity points away: T - W = F_c. First find the centripetal force: "+gF(v)+" × "+gF(v)+" = "+iF(v24)+" m^2/s^2, then "+iF(v24)+" / "+gF(r)+" = "+iF(a4)+" m/s^2, then "+gF(m)+" × "+iF(a4)+" = "+iF(Fc4)+" N. The weight is "+gF(m)+" × 9.8 = "+iF(W4)+" N. So the tension is "+iF(Fc4)+" + "+iF(W4)+" = "+iF(T4)+" N. The tension at the bottom is "+F3(ans)+" N, greater than the weight, because the string must also supply the centripetal force.",
    {m:m,v:v,r:r}); qq3204.figure = p32figLoop(r,v,m,"bottom"); return qq3204;
});

/* ---------- PH12.6.3 Two-dimensional dynamics: inclines ---------- */

E("u2-63-components-mc",2,["PH12.6.3"],1,"gen",function(){
  var m,ang,rad,W4,sinR,cosR,tanR,par4,ans,opts;
  do {
    m=sfR(rf(4.0,28.0),3); ang=pick([20,25,30,35,40,50,55,60]); rad=ang*Math.PI/180;
    W4=sfR(m*9.8,4); sinR=sfR(Math.sin(rad),3); cosR=sfR(Math.cos(rad),3); tanR=sfR(Math.tan(rad),3);
    par4=sfR(W4*sinR,4); ans=sfR(par4,3);
    opts=[ans,sfR(W4*cosR,3),sfR(W4,3),sfR(W4*tanR,3)].map(function(x){return F3(x);});
  } while (new Set(opts).size<4);
  var qq3204 = mcq("A block of mass "+gF(m)+" kg rests on a slope inclined at "+ang+" degrees above the horizontal. What is the component of the block's weight acting down the slope?",
    F3(ans)+" N",
    [F3(sfR(W4*cosR,3))+" N", F3(sfR(W4,3))+" N", F3(sfR(W4*tanR,3))+" N"],
    "First find the weight: "+gF(m)+" × 9.8 = "+iF(W4)+" N. The component of weight parallel to the slope uses the sine of the slope angle: "+iF(W4)+" × "+fmt(sinR,3)+" = "+iF(par4)+" N. The component of the weight acting down the slope is "+F3(ans)+" N. The cosine factor would give the component perpendicular to the slope instead.",
    {m:m,ang:ang}); qq3204.figure = p32figIncline(ang,gF(m)+" kg","components"); return qq3204;
});

E("u2-63-incline-frictionless",2,["PH12.6.3"],2,"gen",function(){
  var m=sfR(rf(2.0,24.0),3), ang=pick([15,20,25,30,35,40]), rad=ang*Math.PI/180;
  var W4=sfR(m*9.8,4), sinR=sfR(Math.sin(rad),3);
  var par4=sfR(W4*sinR,4), a4=sfR(par4/m,4), ans=sfR(a4,3);
  var qq3204 = numq("A sled of mass "+gF(m)+" kg slides down a frictionless slope inclined at "+ang+" degrees above the horizontal. What is the acceleration of the sled down the slope? Give your answer in m/s^2.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "On a frictionless slope, the component of the weight parallel to the slope is the net force. The weight is "+gF(m)+" × 9.8 = "+iF(W4)+" N. Its component down the slope is "+iF(W4)+" × "+fmt(sinR,3)+" = "+iF(par4)+" N. Newton's second law gives the acceleration: "+iF(par4)+" / "+gF(m)+" = "+iF(a4)+" m/s^2. The acceleration of the sled is "+F3(ans)+" m/s^2 down the slope. Notice the mass cancels in this calculation: any sled would accelerate the same on a frictionless slope of this angle.",
    {m:m,ang:ang}); qq3204.figure = p32figIncline(ang,gF(m)+" kg",""); return qq3204;
});

E("u2-63-incline-friction-cr",2,["PH12.6.3"],2,"gen",function(){
  var m,ang,mu,rad,W4,sinR,cosR,par4,nor4,fr4,net4,a4,ans;
  do {
    m=sfR(rf(3.0,20.0),3); ang=pick([25,30,35,40]); mu=pick([0.120,0.180,0.240,0.300]); rad=ang*Math.PI/180;
    W4=sfR(m*9.8,4); sinR=sfR(Math.sin(rad),3); cosR=sfR(Math.cos(rad),3);
    par4=sfR(W4*sinR,4); nor4=sfR(W4*cosR,4); fr4=sfR(mu*nor4,4); net4=sfR(par4-fr4,4); a4=sfR(net4/m,4);
  } while (a4<1.2);
  ans=sfR(a4,3);
  var qq3204 = numq("A crate of mass "+gF(m)+" kg slides down a slope inclined at "+ang+" degrees above the horizontal. The coefficient of kinetic friction between the crate and the slope is "+gF(mu)+". What is the acceleration of the crate down the slope? Give your answer in m/s^2.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Take down the slope as positive. The weight is "+gF(m)+" × 9.8 = "+iF(W4)+" N. Its component down the slope is "+iF(W4)+" × "+fmt(sinR,3)+" = "+iF(par4)+" N. Its component perpendicular to the slope, which sets the normal force, is "+iF(W4)+" × "+fmt(cosR,3)+" = "+iF(nor4)+" N. Kinetic friction acts up the slope with magnitude "+gF(mu)+" × "+iF(nor4)+" = "+iF(fr4)+" N. The net force down the slope is "+iF(par4)+" - "+iF(fr4)+" = "+iF(net4)+" N. Newton's second law gives the acceleration: "+iF(net4)+" / "+gF(m)+" = "+iF(a4)+" m/s^2. The acceleration of the crate is "+F3(ans)+" m/s^2 down the slope.",
    {m:m,ang:ang,mu:mu}); qq3204.figure = p32figIncline(ang,gF(m)+" kg","friction"); return qq3204;
});

E("u2-63-slip-angle",2,["PH12.6.3"],2,"gen",function(){
  var ang=ri(16,35), rad=ang*Math.PI/180;
  var ctx=pick(["a wooden crate rests on a plywood board","a textbook rests on a wooden board","a rubber-soled shoe rests on a painted board","a hockey puck rests on a varnished board","a brick rests on a rough pine board","a storage bin rests on a melamine board"]);
  var tan4=sfR(Math.tan(rad),4), s4=sfR(Math.sin(rad),4), c4=sfR(Math.cos(rad),4);
  var mu=sfR(tan4,3), opts=[mu,sfR(s4,3),sfR(c4,3),sfR(1/tan4,3)].map(function(x){return F3(x);});
  var qq3204 = mcq("In a friction test, "+ctx+" and one end of the board is slowly raised. The object begins to slip when the board makes an angle of "+ang+" degrees with the horizontal. What is the coefficient of static friction for this pair of surfaces?",
    F3(mu),
    [F3(sfR(s4,3)), F3(sfR(c4,3)), F3(sfR(1/tan4,3))],
    "At the angle where slipping just begins, the component of weight down the slope has grown to equal the maximum static friction: m g sin of the angle equals mu_s times m g cos of the angle. The mass and g cancel, leaving mu_s equal to the tangent of the slip angle. For an angle of "+ang+" degrees, the tangent is "+iF(tan4)+". The coefficient of static friction is "+F3(mu)+".",
    {ang:ang}); qq3204.figure = p32figIncline(ang,"",""); return qq3204;
});

E("u2-63-push-up",2,["PH12.6.3"],2,"gen",function(){
  var m=sfR(rf(6.0,22.0),3), ang=pick([15,20,25,30]), mu=pick([0.150,0.220,0.280,0.340]), rad=ang*Math.PI/180;
  var W4=sfR(m*9.8,4), sinR=sfR(Math.sin(rad),3), cosR=sfR(Math.cos(rad),3);
  var par4=sfR(W4*sinR,4), nor4=sfR(W4*cosR,4), fr4=sfR(mu*nor4,4), F4=sfR(par4+fr4,4), ans=sfR(F4,3);
  var qq3204 = numq("A worker pushes a crate of mass "+gF(m)+" kg up a loading ramp inclined at "+ang+" degrees above the horizontal, pushing parallel to the ramp. The crate moves up the ramp at a constant speed. The coefficient of kinetic friction between the crate and the ramp is "+gF(mu)+". What force must the worker exert? Give your answer in N.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Because the crate moves at a constant speed, its acceleration is zero, so the forces along the ramp balance. Take up the ramp as positive. The weight is "+gF(m)+" × 9.8 = "+iF(W4)+" N. Its component down the ramp is "+iF(W4)+" × "+fmt(sinR,3)+" = "+iF(par4)+" N. The normal force is the perpendicular component, "+iF(W4)+" × "+fmt(cosR,3)+" = "+iF(nor4)+" N, so kinetic friction is "+gF(mu)+" × "+iF(nor4)+" = "+iF(fr4)+" N, pointing down the ramp because it opposes the motion up. The push must balance both: "+iF(par4)+" + "+iF(fr4)+" = "+iF(F4)+" N. The worker must exert "+F3(ans)+" N.",
    {m:m,ang:ang,mu:mu}); qq3204.figure = p32figIncline(ang,gF(m)+" kg","push"); return qq3204;
});

E("u2-63-pulley-horizontal",2,["PH12.6.3"],2,"gen",function(){
  var mt=sfR(rf(2.0,9.0),3), mh=sfR(rf(1.0,8.0),3);
  var Wh4=sfR(mh*9.8,4), tot4=sfR(mt+mh,4), a4=sfR(Wh4/tot4,4), ans=sfR(a4,3);
  var qq3204 = numq("A block of mass "+gF(mt)+" kg on a frictionless horizontal table is connected by a string over a pulley at the edge of the table to a hanging mass of "+gF(mh)+" kg. What is the acceleration of the system? Give your answer in m/s^2.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "The only external force driving the system is the weight of the hanging mass: "+gF(mh)+" × 9.8 = "+iF(Wh4)+" N. Both masses accelerate together, so the total mass being accelerated is "+gF(mt)+" + "+gF(mh)+" = "+iF(tot4)+" kg. Newton's second law for the whole system gives the acceleration: "+iF(Wh4)+" / "+iF(tot4)+" = "+iF(a4)+" m/s^2. The acceleration of the system is "+F3(ans)+" m/s^2, with the table block moving toward the pulley and the hanging mass moving down.",
    {mt:mt,mh:mh}); qq3204.figure = p32figPulleyH(mt,mh); return qq3204;
});

E("u2-63-pulley-tension-mc",2,["PH12.6.3"],2,"gen",function(){
  var mt,mh,Wh4,tot4,a4,T4,T,opts;
  do {
    mt=sfR(rf(2.0,9.0),3); mh=sfR(rf(1.0,8.0),3);
    Wh4=sfR(mh*9.8,4); tot4=sfR(mt+mh,4); a4=sfR(Wh4/tot4,4); T4=sfR(mt*a4,4); T=sfR(T4,3);
    opts=[T,sfR(Wh4,3),sfR(mh*a4,3),sfR(mt*9.8,3)].map(function(x){return F3(x);});
  } while (new Set(opts).size<4);
  var qq3204 = mcq("A block of mass "+gF(mt)+" kg on a frictionless horizontal table is connected by a string over a pulley at the edge of the table to a hanging mass of "+gF(mh)+" kg. What is the tension in the string?",
    F3(T)+" N",
    [F3(sfR(Wh4,3))+" N", F3(sfR(mh*a4,3))+" N", F3(sfR(mt*9.8,3))+" N"],
    "First find the acceleration of the system. The hanging weight is "+gF(mh)+" × 9.8 = "+iF(Wh4)+" N, and the total mass is "+gF(mt)+" + "+gF(mh)+" = "+iF(tot4)+" kg, so the acceleration is "+iF(Wh4)+" / "+iF(tot4)+" = "+iF(a4)+" m/s^2. The tension is the only horizontal force on the table block, so for that block alone, T = m a: "+gF(mt)+" × "+iF(a4)+" = "+iF(T4)+" N. The tension in the string is "+F3(T)+" N, less than the hanging weight, because the hanging mass is accelerating downward.",
    {mt:mt,mh:mh}); qq3204.figure = p32figPulleyH(mt,mh); return qq3204;
});

E("u2-63-pulley-cr",2,["PH12.6.3"],3,"gen",function(){
  var mi,mh,ang,mu,rad,sinR,cosR,Wh4,Wi4,par4,nor4,fr4,net1,net4,tot4,a4,ans;
  do {
    mi=sfR(rf(3.0,9.0),3); mh=sfR(rf(6.0,14.0),3); ang=pick([20,25,30]); mu=pick([0.100,0.160,0.220]); rad=ang*Math.PI/180;
    sinR=sfR(Math.sin(rad),3); cosR=sfR(Math.cos(rad),3);
    Wh4=sfR(mh*9.8,4); Wi4=sfR(mi*9.8,4); par4=sfR(Wi4*sinR,4); nor4=sfR(Wi4*cosR,4); fr4=sfR(mu*nor4,4);
    net1=sfR(Wh4-par4,4); net4=sfR(net1-fr4,4); tot4=sfR(mi+mh,4); a4=sfR(net4/tot4,4);
  } while (net4<8 || net1<fr4+4);
  ans=sfR(a4,3);
  var gma4=sfR(9.8-a4,4), T4=sfR(mh*gma4,4), T=sfR(T4,3);
  var qq3204 = numq("A block of mass "+gF(mi)+" kg sits on a slope inclined at "+ang+" degrees above the horizontal. A string attached to the block runs up the slope and over a pulley at the top, and a mass of "+gF(mh)+" kg hangs from the other end. The hanging mass falls, pulling the block up the slope. The coefficient of kinetic friction between the block and the slope is "+gF(mu)+". What is the acceleration of the system? Give your answer in m/s^2.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Treat the two masses as one system and take the direction of motion as positive. The driving force is the hanging weight: "+gF(mh)+" × 9.8 = "+iF(Wh4)+" N. The block's weight is "+gF(mi)+" × 9.8 = "+iF(Wi4)+" N. Its component down the slope, opposing the motion, is "+iF(Wi4)+" × "+fmt(sinR,3)+" = "+iF(par4)+" N. The normal force on the block is "+iF(Wi4)+" × "+fmt(cosR,3)+" = "+iF(nor4)+" N, so kinetic friction, also opposing the motion, is "+gF(mu)+" × "+iF(nor4)+" = "+iF(fr4)+" N. The net force is "+iF(Wh4)+" - "+iF(par4)+" = "+iF(net1)+" N, then "+iF(net1)+" - "+iF(fr4)+" = "+iF(net4)+" N. The total mass is "+gF(mi)+" + "+gF(mh)+" = "+iF(tot4)+" kg, so the acceleration is "+iF(net4)+" / "+iF(tot4)+" = "+iF(a4)+" m/s^2. The acceleration of the system is "+F3(ans)+" m/s^2. (As a check, the tension follows from the hanging mass alone: 9.8 - "+iF(a4)+" = "+iF(gma4)+" m/s^2, and "+gF(mh)+" × "+iF(gma4)+" = "+iF(T4)+" N, so the tension is "+F3(T)+" N.)",
    {mi:mi,mh:mh,ang:ang,mu:mu}); qq3204.figure = p32figPulleyIncline(mi,mh,ang,mu); return qq3204;
});

E("u2-63-judge",2,["PH12.6.3"],3,"var",varset([
  function(){
    var mt=4.00, mh=2.00;
    var Wh=sfR(mh*9.8,4), tot=sfR(mt+mh,4), a=sfR(Wh/tot,4), T=sfR(mt*a,4);
    return mcq("A student analyses a block on a frictionless table pulled by a hanging mass over a pulley, and claims the tension in the string equals the weight of the hanging mass. Which judgement of the claim is correct?",
      "The claim is wrong: the tension is less than the hanging weight whenever the system accelerates, because part of the weight is needed to accelerate the hanging mass itself",
      ["The claim is correct: tension always equals the weight of whatever hangs from a string",
       "The claim is wrong: the tension is greater than the hanging weight",
       "The claim is correct, as long as the table is frictionless"],
      "Test the claim with numbers: a "+gF(mt)+" kg block and a "+gF(mh)+" kg hanging mass. The hanging weight is "+gF(mh)+" × 9.8 = "+iF(Wh)+" N, the total mass is "+iF(tot)+" kg, so the acceleration is "+iF(Wh)+" / "+iF(tot)+" = "+iF(a)+" m/s^2. The tension is the only horizontal force on the table block: "+gF(mt)+" × "+iF(a)+" = "+iF(T)+" N, which is less than the hanging weight of "+iF(Wh)+" N. The tension would equal the weight only if the acceleration were zero. The claim is wrong.",{});
  },
  function(){
    var mt=4.00, mh=2.00;
    var Wh1=sfR(mh*9.8,4), tot1=sfR(mt+mh,4), a1=sfR(Wh1/tot1,4);
    var Wh2=sfR(2*mh*9.8,4), tot2=sfR(2*mt+2*mh,4), a2=sfR(Wh2/tot2,4);
    return mcq("A student claims that if both masses in a table-and-hanging-mass pulley system are doubled, the acceleration of the system doubles. Which judgement of the claim is correct?",
      "The claim is wrong: the acceleration stays the same, because doubling the hanging weight also doubles the total mass being accelerated",
      ["The claim is correct: twice the hanging weight means twice the acceleration",
       "The claim is wrong: the acceleration is halved, because there is more mass to move",
       "The claim is wrong: the acceleration becomes four times as large"],
      "Check with numbers. Originally, a "+gF(mh)+" kg hanging mass gives a weight of "+gF(mh)+" × 9.8 = "+iF(Wh1)+" N over a total mass of "+iF(tot1)+" kg, so the acceleration is "+iF(Wh1)+" / "+iF(tot1)+" = "+iF(a1)+" m/s^2. Doubling both masses gives a weight of "+iF(Wh2)+" N over a total of "+iF(tot2)+" kg, and the acceleration is "+iF(Wh2)+" / "+iF(tot2)+" = "+iF(a2)+" m/s^2, exactly the same. The claim is wrong.",{});
  },
  function(){
    var m=5.00, ang=20, rad=ang*Math.PI/180;
    var W=sfR(m*9.8,4), sinR=sfR(Math.sin(rad),3), cosR=sfR(Math.cos(rad),3);
    var par=sfR(W*sinR,4), nor=sfR(W*cosR,4), fmax=sfR(0.500*nor,4);
    return mcq("A block rests at rest on a slope. A student claims the friction force on the block must equal mu_s times the normal force, because that is the friction formula. Which judgement of the claim is correct?",
      "The claim is wrong: mu_s times the normal force is only the maximum static friction; the actual friction adjusts to match the downslope pull, up to that maximum",
      ["The claim is correct: friction always equals mu_s times the normal force",
       "The claim is wrong: there is no friction on a block at rest",
       "The claim is correct, but only on slopes below 30 degrees"],
      "Static friction is a responsive force: it matches what is needed, up to its maximum. For a "+gF(m)+" kg block on a "+ang+" degree slope, the weight is "+gF(m)+" × 9.8 = "+iF(W)+" N. The downslope component that friction must match is "+iF(W)+" × "+fmt(sinR,3)+" = "+iF(par)+" N. The maximum available is 0.500 × "+iF(nor)+" = "+iF(fmax)+" N, using the normal force of "+iF(W)+" × "+fmt(cosR,3)+" = "+iF(nor)+" N. Since "+iF(par)+" N is less than the maximum of "+iF(fmax)+" N, the friction is "+iF(par)+" N, not the maximum. The claim is wrong.",{});
  },
  function(){
    var ang=30, rad=ang*Math.PI/180;
    var sinR=sfR(Math.sin(rad),3), a=sfR(9.8*sinR,4);
    return mcq("A student claims that a heavy sled will accelerate down a frictionless slope faster than a light sled, because its larger weight gives a larger downslope force. Which judgement of the claim is correct?",
      "The claim is wrong: the acceleration is g sin of the slope angle for both, because the larger force acts on a proportionally larger mass",
      ["The claim is correct: more weight always means more acceleration",
       "The claim is wrong: the lighter sled accelerates faster, because it has less inertia",
       "The claim is correct, but only if the slope is steep"],
      "The downslope force is m g sin of the angle, and Newton's second law divides it by the same mass: a = g sin of the angle, with the mass cancelling. On a "+ang+" degree slope the acceleration is 9.8 × "+fmt(sinR,3)+" = "+iF(a)+" m/s^2 for a sled of any mass. The heavier sled does have a larger downslope force, but it has proportionally more mass to accelerate. The claim is wrong.",{});
  }
]));

/* ---------- PH12.6.4 Static equilibrium and torques ---------- */

E("u2-64-torque-basic",2,["PH12.6.4"],1,"gen",function(){
  var F=sfR(rf(25.0,180.0),3), d=sfR(rf(0.15,0.55),3);
  var tau4=sfR(F*d,4), ans=sfR(tau4,3);
  var qq3204 = numq("A mechanic pulls perpendicular to a wrench handle at a point "+gF(d)+" m from the centre of a bolt, with a force of "+gF(F)+" N. What torque does the mechanic apply to the bolt? Give your answer in N·m.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Torque is the force multiplied by the lever arm when the force is applied perpendicular to the handle: "+gF(F)+" × "+gF(d)+" = "+iF(tau4)+" N·m. The torque applied to the bolt is "+F3(ans)+" N·m.",
    {F:F,d:d}); qq3204.figure = p32figWrench(F,d,null); return qq3204;
});

E("u2-64-equilibrium-concept",2,["PH12.6.4"],1,"var",varset([
  function(){
    return mcq("An object is in static equilibrium. Which pair of conditions must both hold?",
      "The net force is zero and the net torque about any point is zero",
      ["The net force is zero, and the object must be at the centre of its supports",
       "The net torque is zero, and all the forces must be equal in pairs",
       "The net force is zero and the net torque is zero only about the centre of mass"],
      "Static equilibrium requires both translational and rotational balance: the vector sum of the forces is zero, so the object does not accelerate, and the sum of the torques about any point is zero, so it does not start to rotate. Either condition alone is not enough.",{});
  },
  function(){
    return mcq("A beam has forces on it that add to zero, but the torques about its left end add up to a nonzero clockwise value. The beam is",
      "Not in equilibrium: it will begin to rotate clockwise",
      ["In equilibrium, because the forces balance",
       "In equilibrium, because torque does not affect a beam",
       "Moving at a constant velocity in a straight line"],
      "Balanced forces alone do not guarantee equilibrium. A nonzero net torque produces a rotational acceleration, so the beam will start to rotate clockwise. Equilibrium needs the net torque to be zero as well as the net force.",{});
  },
  function(){
    return mcq("A door is pushed with a large force directed straight at the hinges, along the plane of the door through the hinge line. The torque of this force about the hinges is",
      "Zero, because the force has no lever arm about the hinges",
      ["Very large, because the force is large",
       "Equal to the force times the width of the door",
       "Equal to the force times the distance to the door handle"],
      "Torque depends on the lever arm, the perpendicular distance from the pivot to the line of the force. A force whose line passes through the pivot has a lever arm of zero, so its torque is zero no matter how large the force is. That is why pushing a door toward its hinges does not swing it.",{});
  },
  function(){
    return mcq("Which of the following is an example of static equilibrium?",
      "A ladder leaning against a wall, at rest, with friction at its foot",
      ["A ladder sliding down a wall at a steady speed",
       "A ladder falling away from a wall",
       "A ladder being carried up a flight of stairs at a steady speed"],
      "Static equilibrium means the object is at rest with zero net force and zero net torque. The leaning ladder at rest qualifies: its weight, the wall's push, the ground's normal force and friction balance as forces, and their torques about any point also balance. The other ladders are moving or accelerating.",{});
  }
]));

E("u2-64-wires-cr",2,["PH12.6.4"],2,"gen",function(){
  var L=sfR(rf(1.6,2.4),3), m=sfR(rf(18.0,42.0),3), d=sfR(L*rf(0.58,0.75),3);
  var W4=sfR(m*9.8,4), prod4=sfR(W4*d,4), TR4=sfR(prod4/L,4), TL4=sfR(W4-TR4,4), ans=sfR(TR4,3);
  var qq3204 = numq("A shop sign of mass "+gF(m)+" kg hangs from two vertical wires attached at its top corners, "+gF(L)+" m apart. The sign's centre of mass is "+gF(d)+" m from the left-hand wire. What is the tension in the right-hand wire? Give your answer in N.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "The sign is in equilibrium, so the torques about any point balance. Take torques about the left-hand wire, so the left tension contributes no torque. The sign's weight is "+gF(m)+" × 9.8 = "+iF(W4)+" N, acting at the centre of mass. Torque balance gives T_right × "+gF(L)+" = "+iF(W4)+" × "+gF(d)+", and the right side is "+iF(W4)+" × "+gF(d)+" = "+iF(prod4)+" N·m. So the tension in the right-hand wire is "+iF(prod4)+" / "+gF(L)+" = "+iF(TR4)+" N. The tension in the right-hand wire is "+F3(ans)+" N (and the left wire carries the rest, "+iF(W4)+" - "+iF(TR4)+" = "+iF(TL4)+" N, since the centre of mass is closer to the right wire, that wire carries more).",
    {L:L,m:m,d:d}); qq3204.figure = p32figSign(L,m,d); return qq3204;
});

E("u2-64-seesaw",2,["PH12.6.4"],2,"gen",function(){
  var m1,d1,m2,prod4,d2_4,ans;
  do {
    m1=sfR(rf(24.0,44.0),3); d1=sfR(rf(1.2,2.0),3); m2=sfR(rf(18.0,38.0),3);
    prod4=sfR(m1*d1,4); d2_4=sfR(prod4/m2,4);
  } while (d2_4>2.3 || d2_4<0.8);
  ans=sfR(d2_4,3);
  var qq3204 = numq("A child of mass "+gF(m1)+" kg sits "+gF(d1)+" m from the pivot of a seesaw. A second child of mass "+gF(m2)+" kg sits on the other side. How far from the pivot must the second child sit for the seesaw to balance? Give your answer in m.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "For the seesaw to balance, the torques about the pivot must be equal and opposite. Each torque is the child's weight times their distance, and since both weights carry the same factor of g, the balance condition reduces to m1 d1 = m2 d2. The first child's product is "+gF(m1)+" × "+gF(d1)+" = "+iF(prod4)+" kg·m. So the second child's distance is "+iF(prod4)+" / "+gF(m2)+" = "+iF(d2_4)+" m. The second child must sit "+F3(ans)+" m from the pivot.",
    {m1:m1,d1:d1,m2:m2}); qq3204.figure = p32figSeesaw(m1,d1,m2); return qq3204;
});

E("u2-64-metre-stick",2,["PH12.6.4"],2,"gen",function(){
  var p,ms,dR,prod4,mh4,ans,opts;
  do {
    p=pick([0.300,0.350,0.400]); ms=sfR(rf(0.120,0.480),3); dR=sfR(0.500-p,4);
    prod4=sfR(ms*dR,4); mh4=sfR(prod4/p,4); ans=sfR(mh4,3);
    opts=[ans,sfR(ms*p/dR,3),sfR(prod4,3),sfR(ms/2,3)].map(function(x){return F3(x);});
  } while (new Set(opts).size<4);
  var qq3204 = mcq("A uniform metre stick of mass "+gF(ms)+" kg is pivoted at the "+fmt(p*100,0)+" cm mark. A mass hung at the 0 cm end balances the stick. What mass is needed?",
    F3(ans)+" kg",
    [F3(sfR(ms*p/dR,3))+" kg", F3(sfR(prod4,3))+" kg", F3(sfR(ms/2,3))+" kg"],
    "The stick is uniform, so its weight acts at its centre, the 50 cm mark, which is "+gF(dR)+" m to the right of the pivot. The hanging mass acts at the 0 cm end, "+gF(p)+" m to the left of the pivot. Torque balance gives m_hang × "+gF(p)+" = "+gF(ms)+" × "+gF(dR)+". The right side is "+gF(ms)+" × "+gF(dR)+" = "+iF(prod4)+" kg·m, so the hanging mass is "+iF(prod4)+" / "+gF(p)+" = "+iF(mh4)+" kg. The mass needed is "+F3(ans)+" kg.",
    {p:p,ms:ms}); qq3204.figure = p32figMetreStick(p,ms); return qq3204;
});

E("u2-64-beam-cr",2,["PH12.6.4"],2,"gen",function(){
  var L=sfR(rf(3.0,4.0),3), mb=sfR(rf(12.0,20.0),3), ml=sfR(rf(15.0,25.0),3), x=sfR(rf(1.2,2.0),3);
  var Wb4=sfR(mb*9.8,4), Wl4=sfR(ml*9.8,4);
  var t1=sfR(Wb4*(L/2),4), t2=sfR(Wl4*x,4), sum4=sfR(t1+t2,4), RR4=sfR(sum4/L,4);
  var tot4=sfR(Wb4+Wl4,4), RL4=sfR(tot4-RR4,4), ans=sfR(RR4,3);
  var qq3204 = numq("A uniform scaffold plank of length "+gF(L)+" m and mass "+gF(mb)+" kg rests on supports at its two ends. A crate of mass "+gF(ml)+" kg sits on the plank "+gF(x)+" m from the left-hand support. What is the upward force exerted by the right-hand support? Give your answer in N.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Take torques about the left-hand support, so the left support force contributes no torque. The plank's weight is "+gF(mb)+" × 9.8 = "+iF(Wb4)+" N, acting at the plank's centre, "+gF(L/2)+" m from the left support, giving a torque of "+iF(Wb4)+" × "+gF(L/2)+" = "+iF(t1)+" N·m. The crate's weight is "+gF(ml)+" × 9.8 = "+iF(Wl4)+" N, giving a torque of "+iF(Wl4)+" × "+gF(x)+" = "+iF(t2)+" N·m. The total clockwise torque is "+iF(t1)+" + "+iF(t2)+" = "+iF(sum4)+" N·m. The right support force balances this over the full length: "+iF(sum4)+" / "+gF(L)+" = "+iF(RR4)+" N. The right-hand support exerts "+F3(ans)+" N (and the left support carries the remainder, "+iF(tot4)+" - "+iF(RR4)+" = "+iF(RL4)+" N, out of a total weight of "+iF(Wb4)+" + "+iF(Wl4)+" = "+iF(tot4)+" N).",
    {L:L,mb:mb,ml:ml,x:x}); qq3204.figure = p32figBeam(L,mb,ml,x); return qq3204;
});

E("u2-64-angled-torque",2,["PH12.6.4"],2,"gen",function(){
  var F=sfR(rf(30.0,110.0),3), d=sfR(rf(0.25,0.60),3), phi=pick([35,40,50,55,65]), rad=phi*Math.PI/180;
  var sinR=sfR(Math.sin(rad),3);
  var prod4=sfR(F*d,4), tau4=sfR(prod4*sinR,4), ans=sfR(tau4,3);
  var qq3204 = numq("A gardener pulls on a wrench handle of length "+gF(d)+" m with a force of "+gF(F)+" N. The force is applied at the end of the handle, at an angle of "+phi+" degrees to the handle. What is the torque about the bolt? Give your answer in N·m.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Only the component of the force perpendicular to the handle produces torque; the component along the handle just pulls along the wrench. The perpendicular component carries the sine of the angle to the handle. First, force times lever arm: "+gF(F)+" × "+gF(d)+" = "+iF(prod4)+" N·m. Then apply the sine factor: "+iF(prod4)+" × "+fmt(sinR,3)+" = "+iF(tau4)+" N·m. The torque about the bolt is "+F3(ans)+" N·m, less than it would be for a perpendicular pull at the same force.",
    {F:F,d:d,phi:phi}); qq3204.figure = p32figWrench(F,d,phi); return qq3204;
});

E("u2-64-bridge-mc",2,["PH12.6.4"],2,"gen",function(){
  var mb,mw,Wb4,Ww4,tot4,R4,ans,opts;
  do {
    mb=sfR(rf(12.0,18.0),3); mw=sfR(rf(50.0,75.0),3);
    Wb4=sfR(mb*9.8,4); Ww4=sfR(mw*9.8,4); tot4=sfR(Wb4+Ww4,4); R4=sfR(tot4/2,4); ans=sfR(R4,3);
    opts=[ans,sfR(tot4,3),sfR(sfR(Ww4/2,4)+Wb4,3),sfR(Wb4/2,3)].map(function(x){return F3(x);});
  } while (new Set(opts).size<4);
  var qq3204 = mcq("A uniform plank of mass "+gF(mb)+" kg rests on supports at both ends, forming a small bridge. A worker of mass "+gF(mw)+" kg stands at the centre of the plank. What is the upward force at each support?",
    F3(ans)+" N",
    [F3(sfR(tot4,3))+" N", F3(sfR(sfR(Ww4/2,4)+Wb4,3))+" N", F3(sfR(Wb4/2,3))+" N"],
    "The worker stands at the centre and the plank is uniform, so by symmetry the two supports share the total weight equally. The plank's weight is "+gF(mb)+" × 9.8 = "+iF(Wb4)+" N and the worker's weight is "+gF(mw)+" × 9.8 = "+iF(Ww4)+" N. The total weight is "+iF(Wb4)+" + "+iF(Ww4)+" = "+iF(tot4)+" N. Each support carries half: "+iF(tot4)+" / 2 = "+iF(R4)+" N. The upward force at each support is "+F3(ans)+" N.",
    {mb:mb,mw:mw}); qq3204.figure = p32figBridge(mb,mw); return qq3204;
});

E("u2-64-ladder-cr",2,["PH12.6.4"],3,"gen",function(){
  var m=sfR(rf(11.0,17.0),3), ang=pick([55,60,65,70]), L=pick([4.0,5.0,6.0]), rad=ang*Math.PI/180;
  var tanR=sfR(Math.tan(rad),3);
  var W4=sfR(m*9.8,4), half4=sfR(W4/2,4), Nw4=sfR(half4/tanR,4), ans=sfR(Nw4,3);
  var qq3204 = numq("A uniform ladder of mass "+gF(m)+" kg and length "+gF(L)+" m leans against a smooth vertical wall, making an angle of "+ang+" degrees with the ground. The wall is smooth, so it can exert only a horizontal force on the ladder. What friction force must the ground exert at the foot of the ladder to keep it in equilibrium? Give your answer in N.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Because the wall is smooth, it pushes horizontally on the top of the ladder; call that force N_w. Horizontally, the only other force is friction at the foot, so the friction force must equal N_w. Find N_w from the torques about the foot of the ladder, where friction and the ground's normal force contribute no torque. The ladder's weight is "+gF(m)+" × 9.8 = "+iF(W4)+" N, acting at the ladder's midpoint. Torque balance gives N_w = W / (2 tan of the angle): half the weight is "+iF(W4)+" / 2 = "+iF(half4)+" N, and dividing by the tangent factor, "+iF(half4)+" / "+fmt(tanR,3)+" = "+iF(Nw4)+" N. So the wall pushes with "+iF(Nw4)+" N, and the ground must exert a friction force of "+F3(ans)+" N at the foot, directed toward the wall.",
    {m:m,ang:ang,L:L}); qq3204.figure = p32figLadder(m,ang,L); return qq3204;
});

/* ----- bank-u3.js ----- */
// Diagram figures (Phase C, Nov 2026): entries whose source question type
// carried a diagram now set qq3204.figure from the draw's own values via the
// p32fig* helpers in bank-helpers.js. Asked unknowns are labelled "?".
// Physics 3204 Unit 3 Fields question bank
// CRMARKS: u3-71-field-radii=3
// CRMARKS: u3-72-separation-from-force=3
// CRMARKS: u3-72-orbit-period=3
// CRMARKS: u3-72-planet-mass-moon=4
// CRMARKS: u3-73-field-two-charges-point=3
// CRMARKS: u3-74-separation-from-force=3
// CRMARKS: u3-74-charge-from-force=3
// CRMARKS: u3-74-net-force-collinear=4
// CRMARKS: u3-75-energy-cost=3
// CRMARKS: u3-75-combination-circuit=4
// CRMARKS: u3-75-circuit-table=4
// CRMARKS: u3-75-parallel-branches=3
// CRMARKS: u3-77-current-from-field=3
// CRMARKS: u3-78-force-angle=3
// CRMARKS: u3-78-circular-speed=4
// CRMARKS: u3-78-field-from-orbit=3
// CRMARKS: u3-79-transformer=3
// CRMARKS: u3-710-lift-motor=3

var MU0 = 4 * Math.PI * 1e-7;   // T m/A, permeability of free space

/* ---------- PH12.7.1 Gravitational field described ---------- */

E("u3-71-field-equation", 3, ["PH12.7.1"], 1, "var", varset([
  function(){
    return mcq("The gravitational field strength at a point near a planet is best defined as",
      "The gravitational force acting on each kilogram of mass placed at that point",
      ["The total gravitational force the planet exerts on all objects near it",
       "The acceleration due to gravity divided by the mass placed at the point",
       "The mass of the planet divided by the square of its radius"],
      "A field strength is always a per-unit quantity: gravitational field strength is the force per unit mass, g = F/m, measured in N/kg. It tells what force each kilogram placed at the point would feel, so the field strength is the gravitational force on each kilogram at that point.", {});
  },
  function(){
    return mcq("Which equation gives the gravitational field strength g at a distance r from the centre of a planet of mass M?",
      "g = GM/r\u00B2",
      ["g = Gm/r\u00B2",
       "g = GM/r",
       "g = GMr\u00B2"],
      "The field is produced by the planet's mass M, so the planet's mass belongs in the numerator: g = GM/r\u00B2. The test mass m does not appear, because field strength is a property of the planet and the point, not of the object placed there. The field falls off with the square of the distance, so r is squared in the denominator.", {});
  },
  function(){
    return mcq("The unit of gravitational field strength, the newton per kilogram (N/kg), is equivalent to which other unit?",
      "The metre per second squared (m/s\u00B2), the unit of acceleration",
      ["The joule per kilogram (J/kg)",
       "The newton metre (N m)",
       "The kilogram per cubic metre (kg/m\u00B3)"],
      "Since g = F/m and also g is the acceleration a mass experiences in free fall, N/kg and m/s\u00B2 are the same unit written two ways. Near Earth's surface g = 9.8 N/kg = 9.8 m/s\u00B2. The unit of gravitational field strength is equivalent to the unit of acceleration.", {});
  },
  function(){
    return mcq("At a point above a planet's surface, the direction of the gravitational field is",
      "Toward the centre of the planet, the way a released mass would fall",
      ["Away from the centre of the planet",
       "Tangent to the planet's surface, in the direction of rotation",
       "Straight up, away from the surface"],
      "The field direction is the direction of the force on a mass placed at the point. Gravity attracts, so the force and the field both point toward the centre of the planet, the direction a dropped object falls. The field points toward the centre of the planet.", {});
  }
]));

E("u3-71-field-planet", 3, ["PH12.7.1"], 2, "gen", function(){
  var M = sfR(rf(1.5, 9.0) * 1e23, 3);
  var R = sfR(rf(2.0, 8.0) * 1e6, 3);
  var g = PHYS_GRAV * M / (R * R);
  var ans = sfR(g, 3);
  return numq("A planet has mass " + gF(M) + " kg and radius " + gF(R) + " m. Calculate the gravitational field strength at its surface. Give your answer in N/kg.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Use g = GM/r\u00B2 with the planet's mass and its radius, since the surface is one radius from the centre. Substituting M = " + gF(M) + " kg and r = " + gF(R) + " m, and computing the numerator GM and the denominator r\u00B2 as separate steps, gives g = " + F3(ans) + " N/kg. The field strength at the surface is " + F3(ans) + " N/kg.",
    {M: M, R: R});
});

E("u3-71-field-altitude", 3, ["PH12.7.1"], 2, "gen", function(){
  var Re = 6.38e6, Me = 5.97e24;
  var hKm = ri(250, 4000);
  var h = hKm * 1000;
  var r = Re + h;
  var g = PHYS_GRAV * Me / (r * r);
  var key = F3(g) + " N/kg";
  var gSurf = F3(PHYS_GRAV * Me / (Re * Re)) + " N/kg";
  var gHalf = F3(g / 2) + " N/kg";
  var gNoSq = F3(PHYS_GRAV * Me / r) + " N/kg";
  var qq3204 = mcq("Earth has mass " + gF(Me) + " kg and radius " + gF(Re) + " m. A satellite orbits " + hKm + " km above the surface. What is the gravitational field strength at the satellite?",
    key, [gSurf, gHalf, gNoSq],
    "Field strength is measured from the centre of Earth, so the distance is the radius plus the altitude: r = " + gF(Re) + " m + " + gF(h) + " m = " + iF(r) + " m. Then g = GM/r\u00B2 gives " + key + ". Using the surface radius alone would give the surface value " + gSurf + ", which ignores the altitude. The field strength at the satellite is " + key + ".",
    {hKm: hKm}); qq3204.figure = p32figOrbit("altitude "+hKm+" km","Earth"); return qq3204;
});

E("u3-71-field-radii", 3, ["PH12.7.1"], 3, "gen", function(){
  var Me = 5.97e24, Re = 6.38e6;
  var g = Math.round(rf(1.00, 4.50) * 100) / 100;
  var r = Math.sqrt(PHYS_GRAV * Me / g);
  var radii = r / Re;
  var ans = sfR(radii, 3);
  var qq3204 = numq("Earth has mass " + gF(Me) + " kg and radius " + gF(Re) + " m. At what distance from Earth's centre, measured in Earth radii, is the gravitational field strength " + fmt(g, 2) + " N/kg? Give your answer in Earth radii.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Start from g = GM/r\u00B2 and solve for the distance: r\u00B2 = GM/g, so r is the square root of GM/g. Step 1: GM = " + iF(PHYS_GRAV * Me) + " N m\u00B2/kg (computed from G = 6.67 \u00D7 10\u207B\u00B9\u00B9 and M = " + gF(Me) + " kg). Step 2: dividing GM by g = " + fmt(g, 2) + " N/kg gives r\u00B2, and taking the square root gives r = " + iF(r) + " m. Step 3: divide by one Earth radius, " + gF(Re) + " m: r = " + F3(ans) + " Earth radii. The distance is " + F3(ans) + " Earth radii from the centre.",
    {g: g}); qq3204.figure = p32figOrbit("? Earth radii","Earth"); return qq3204;
});

E("u3-71-weight-moon", 3, ["PH12.7.1"], 2, "gen", function(){
  var m = sfR(rf(45, 95), 3);
  var wE = m * 9.8, wM = m * 1.62;
  var key = F3(wM) + " N";
  return mcq("An astronaut has mass " + gF(m) + " kg. On the Moon the gravitational field strength is 1.62 N/kg. What is the astronaut's weight on the Moon?",
    key, [F3(wE) + " N", F3(m) + " N", F3(wM / 2) + " N"],
    "Weight is field strength times mass: W = mg. On the Moon, W = " + gF(m) + " kg \u00D7 1.62 N/kg = " + F3(wM) + " N. The mass itself stays " + gF(m) + " kg everywhere; only the weight changes with the field. On Earth the same mass would weigh " + F3(wE) + " N. The weight on the Moon is " + key + ".",
    {m: m});
});

E("u3-71-pole-equator", 3, ["PH12.7.1"], 1, "var", varset([
  function(){
    return mcq("The gravitational field strength at Earth's poles is slightly greater than at the equator. The main reason is that",
      "Points at the poles are closer to Earth's centre, and rotation does not pull mass away from the axis there",
      ["The poles are colder, and cold increases gravity",
       "There is more mass under the poles than under the equator",
       "The Moon's gravity adds to Earth's at the poles"],
      "Earth bulges at the equator, so a point at a pole sits closer to the centre, and g = GM/r\u00B2 grows as r shrinks. Rotation also reduces the effective field at the equator slightly, because some of the gravitational force provides the centripetal acceleration there. The poles win on both counts: closer to the centre and no rotational reduction.", {});
  },
  function(){
    return mcq("A mass is moved from the equator to the North Pole without changing the mass itself. Which statement is correct?",
      "Its weight increases slightly, because the field strength is slightly greater at the pole",
      ["Its weight decreases slightly, because the pole is farther from the centre",
       "Its weight is unchanged, because weight does not depend on location",
       "Its mass increases slightly, because it weighs more at the pole"],
      "Mass is a property of the object and does not change with location. Weight is mg, and g is slightly larger at the poles (closer to Earth's centre, no rotational reduction), so the weight increases slightly. Its weight increases slightly at the pole.", {});
  },
  function(){
    return mcq("Why is the measured value of g at the equator slightly less than the value predicted from GM/r\u00B2 alone?",
      "Part of the gravitational force is used to keep surface objects moving in a circle as Earth rotates",
      ["The air at the equator pushes up on objects and reduces their weight",
       "Earth's magnetic field lifts objects at the equator",
       "The value of G is smaller at low latitudes"],
      "An object on the equator travels in a circle once a day, so a small part of the gravitational force must act as centripetal force. What remains is the effective gravity a scale measures, so measured g is slightly less than GM/r\u00B2. G itself is a universal constant and does not change with latitude.", {});
  },
  function(){
    return mcq("Two identical spring scales are taken to the equator and to the North Pole. The same mass is hung from each. The scale at the pole reads",
      "Slightly more, because the field strength there is slightly greater",
      ["Slightly less, because the pole is higher above sea level in the field",
       "Exactly the same, because spring scales measure mass",
       "Zero, because there is no rotation at the pole to create gravity"],
      "A spring scale responds to weight, mg. The field strength is slightly greater at the pole (closer to the centre, and no part of gravity is spent on circular motion there), so the pole scale stretches a little more and reads slightly more. Gravity exists whether or not Earth rotates; rotation only trims the effective value at the equator.", {});
  }
]));

/* ---------- PH12.7.2 Universal gravitation applied ---------- */

E("u3-72-force-two-masses", 3, ["PH12.7.2"], 2, "gen", function(){
  var m1 = sfR(rf(2.0, 9.0) * 1e3, 3);
  var m2 = sfR(rf(2.0, 9.0) * 1e4, 3);
  var r = sfR(rf(1.5, 6.0), 3);
  var F = PHYS_GRAV * m1 * m2 / (r * r);
  var ans = sfR(F, 3);
  return numq("Two crates in a warehouse, of mass " + gF(m1) + " kg and " + gF(m2) + " kg, sit with their centres " + gF(r) + " m apart. Calculate the gravitational force of attraction between them. Give your answer in N.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-12),
    "Use the law of universal gravitation, F = Gm\u2081m\u2082/r\u00B2. Multiply the two masses together and by G = 6.67 \u00D7 10\u207B\u00B9\u00B9 N m\u00B2/kg\u00B2, then divide by r\u00B2 = (" + gF(r) + " m)\u00B2. The result is F = " + F3(ans) + " N. Gravitational forces between everyday objects are extremely small, which is why the crates do not slide together. The force is " + F3(ans) + " N.",
    {m1: m1, m2: m2, r: r});
});

E("u3-72-scaling-mass", 3, ["PH12.7.2"], 1, "var", varset([
  function(){
    return mcq("Two masses attract each other with force F. If the mass of one of them is doubled, with the separation unchanged, the new force is",
      "2F", ["F", "4F", "F/2"],
      "The force is proportional to each mass: F = Gm\u2081m\u2082/r\u00B2. Doubling one mass doubles the product m\u2081m\u2082, so the force doubles to 2F.", {});
  },
  function(){
    return mcq("Two masses attract each other with force F. If the distance between their centres is doubled, with the masses unchanged, the new force is",
      "F/4", ["F/2", "F", "4F"],
      "Gravity follows an inverse square law: F varies as 1/r\u00B2. Doubling r multiplies the force by 1/2\u00B2 = 1/4, so the new force is F/4.", {});
  },
  function(){
    return mcq("Two masses attract each other with force F. If both masses are doubled, with the separation unchanged, the new force is",
      "4F", ["2F", "F", "8F"],
      "Each doubling multiplies the force by 2. Doubling m\u2081 gives 2F, and doubling m\u2082 doubles it again: 2 \u00D7 2 = 4, so the new force is 4F.", {});
  },
  function(){
    return mcq("Two masses attract each other with force F. If the distance between their centres is halved, with the masses unchanged, the new force is",
      "4F", ["2F", "F/2", "F/4"],
      "With an inverse square law, halving r multiplies the force by 1/(1/2)\u00B2 = 4. The new force is 4F. Getting closer strengthens gravity much faster than a simple proportion would suggest.", {});
  },
  function(){
    return mcq("Two masses attract each other with force F. If one mass is tripled, with the separation unchanged, the new force is",
      "3F", ["9F", "F/3", "F"],
      "The force is directly proportional to each mass separately. Tripling one mass triples the product m\u2081m\u2082, so the new force is 3F. It is not squared, because only one mass changed.", {});
  }
]));

E("u3-72-separation-from-force", 3, ["PH12.7.2"], 3, "gen", function(){
  var m1 = sfR(rf(3.0, 8.0) * 1e11, 3);
  var m2 = sfR(rf(3.0, 8.0) * 1e11, 3);
  var rTrue = sfR(rf(2.0, 9.0) * 1e3, 3);
  var F = sfR(PHYS_GRAV * m1 * m2 / (rTrue * rTrue), 3);
  var r = Math.sqrt(PHYS_GRAV * m1 * m2 / F);
  var ans = sfR(r, 3);
  return numq("Two asteroids of mass " + gF(m1) + " kg and " + gF(m2) + " kg attract each other with a gravitational force of " + gF(F) + " N. Calculate the distance between their centres. Give your answer in m.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Rearrange F = Gm\u2081m\u2082/r\u00B2 to r\u00B2 = Gm\u2081m\u2082/F, then take the square root. Step 1: the product Gm\u2081m\u2082 is computed from G = 6.67 \u00D7 10\u207B\u00B9\u00B9 and the two masses. Step 2: dividing that product by F = " + gF(F) + " N gives r\u00B2 = " + iF(r * r) + " m\u00B2. Step 3: the square root of r\u00B2 is r = " + F3(ans) + " m. The distance between the centres is " + F3(ans) + " m.",
    {m1: m1, m2: m2, F: F});
});

E("u3-72-satellite-speed", 3, ["PH12.7.2"], 2, "gen", function(){
  var Me = 5.97e24, Re = 6.38e6;
  var altKm = ri(250, 3000);
  var r = Re + altKm * 1000;
  var v = Math.sqrt(PHYS_GRAV * Me / r);
  var ans = sfR(v, 3);
  var qq3204 = numq("A satellite is in a circular orbit " + altKm + " km above Earth's surface. Earth has mass " + gF(Me) + " kg and radius " + gF(Re) + " m. Calculate the satellite's orbital speed. Give your answer in m/s.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Gravity provides the centripetal force, which gives v = \u221A(GM/r) for a circular orbit. The orbit radius is measured from Earth's centre: r = " + gF(Re) + " m + " + gF(altKm * 1000) + " m = " + iF(r) + " m. Dividing GM by this radius and taking the square root gives v = " + F3(ans) + " m/s. The orbital speed is " + F3(ans) + " m/s.",
    {altKm: altKm}); qq3204.figure = p32figOrbit("altitude "+altKm+" km","Earth"); return qq3204;
});

E("u3-72-orbit-period", 3, ["PH12.7.2"], 2, "gen", function(){
  var Me = 5.97e24, Re = 6.38e6;
  var altKm = ri(400, 3500);
  var r = Re + altKm * 1000;
  var T = 2 * Math.PI * Math.sqrt(r * r * r / (PHYS_GRAV * Me));
  var ans = sfR(T, 3);
  var qq3204 = numq("A weather satellite is in a circular orbit " + altKm + " km above Earth's surface. Earth has mass " + gF(Me) + " kg and radius " + gF(Re) + " m. Calculate the satellite's orbital period. Give your answer in s.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "For a circular orbit, T = 2\u03C0\u221A(r\u00B3/GM). Step 1: the orbit radius from Earth's centre is r = " + gF(Re) + " m + " + gF(altKm * 1000) + " m = " + iF(r) + " m. Step 2: cube the radius to get r\u00B3 and divide by GM, keeping the powers of ten in words to avoid errors. Step 3: take the square root and multiply by 2\u03C0. The period is T = " + F3(ans) + " s, about " + F3(T / 60) + " min. The orbital period is " + F3(ans) + " s.",
    {altKm: altKm}); qq3204.figure = p32figOrbit("altitude "+altKm+" km","Earth"); return qq3204;
});

E("u3-72-planet-mass-moon", 3, ["PH12.7.2"], 3, "gen", function(){
  var r = sfR(rf(1.5, 6.0) * 1e8, 3);
  var Tdays = sfR(rf(4.0, 28.0), 3);
  var T = Tdays * 86400;
  var M = 4 * Math.PI * Math.PI * r * r * r / (PHYS_GRAV * T * T);
  var ans = sfR(M, 3);
  var qq3204 = numq("A moon orbits a planet in a circle of radius " + gF(r) + " m with a period of " + gF(Tdays) + " days. Calculate the mass of the planet. Give your answer in kg.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Gravity supplies the moon's centripetal force, which rearranges to M = 4\u03C0\u00B2r\u00B3/(GT\u00B2). Step 1: convert the period to seconds by multiplying the number of days by 86400 s/day, which gives T = " + iF(T) + " s. Step 2: cube the orbit radius and square the period, tracking powers of ten in words. Step 3: multiply r\u00B3 by 4\u03C0\u00B2 and divide by GT\u00B2. The planet's mass is M = " + F3(ans) + " kg. This is how astronomers weigh planets that have moons.",
    {r: r, Tdays: Tdays}); qq3204.figure = p32figOrbit(gF(r)+" m","planet"); return qq3204;
});

E("u3-72-force-ratio-distance", 3, ["PH12.7.2"], 2, "gen", function(){
  var F1 = sfR(rf(20, 90), 3);
  var k = pick([2, 3, 4]);
  var F2 = F1 / (k * k);
  var key = F3(F2) + " N";
  return mcq("Two stars attract each other with a gravitational force of " + gF(F1) + " N. Over time they drift until the distance between their centres is " + k + " times as great, with the masses unchanged. What is the new force of attraction?",
    key, [F3(F1 / k) + " N", F3(F1) + " N", F3(F1 * k) + " N"],
    "Gravity is an inverse square law, so multiplying the distance by " + k + " divides the force by " + k + "\u00B2 = " + (k * k) + ". The new force is " + gF(F1) + " N \u00F7 " + (k * k) + " = " + F3(F2) + " N. Dividing by " + k + " only would be the mistake of treating gravity as a simple inverse proportion. The new force is " + key + ".",
    {F1: F1, k: k});
});

E("u3-72-force-altitude-ratio", 3, ["PH12.7.2"], 2, "gen", function(){
  var Re = 6.38e6;
  var w = sfR(rf(400, 900), 3);
  var altKm = pick([1000, 2000, 3180, 6380]);
  var ratio = Math.pow(Re / (Re + altKm * 1000), 2);
  var key = F3(w * ratio) + " N";
  return mcq("A supply capsule weighs " + gF(w) + " N at Earth's surface. It is raised to an altitude of " + altKm + " km, which is " + fmt(altKm * 1000 / Re, 2) + " Earth radii above the surface (Earth's radius is " + gF(Re) + " m). What is the gravitational force on the capsule at that altitude?",
    key, [F3(w) + " N", F3(w * Re / (Re + altKm * 1000)) + " N", F3(w * ratio / 2) + " N"],
    "The force falls with the square of the distance from Earth's centre. At the surface the distance is one radius; at altitude it is " + gF(Re) + " m + " + gF(altKm * 1000) + " m = " + iF(Re + altKm * 1000) + " m. The ratio of forces is (R/(R + h))\u00B2 = " + iF(ratio) + ", so the force is " + gF(w) + " N \u00D7 " + iF(ratio) + " = " + F3(w * ratio) + " N. Using the unsquared ratio is the common error. The gravitational force at altitude is " + key + ".",
    {w: w, altKm: altKm});
});

E("u3-72-compare-fields", 3, ["PH12.7.2"], 3, "var", varset([function(){
  var combos = [[2, 1], [4, 2], [3, 1], [2, 2], [5, 2], [3, 2]];
  var c = pick(combos);
  var mR = c[0], rR = c[1];
  var ratio = mR / (rR * rR);
  var key, d1, d2, d3;
  if (ratio > 1) { key = "Planet B's field is " + fmt(ratio, 2) + " times Earth's"; d1 = "The fields are equal"; d2 = "Earth's field is " + fmt(ratio, 2) + " times planet B's"; d3 = "Planet B's field is " + fmt(1 / ratio, 2) + " times Earth's"; }
  else if (ratio < 1) { key = "Earth's field is " + fmt(1 / ratio, 2) + " times planet B's"; d1 = "The fields are equal"; d2 = "Planet B's field is " + fmt(1 / ratio, 2) + " times Earth's"; d3 = "Planet B's field is " + fmt(ratio, 2) + " times Earth's"; }
  else { key = "The fields are equal"; d1 = "Planet B's field is twice Earth's"; d2 = "Earth's field is twice planet B's"; d3 = "Planet B's field is 4 times Earth's"; }
  return mcq("Planet B has " + mR + " times Earth's mass and " + rR + " times Earth's radius. How does the gravitational field strength at planet B's surface compare with Earth's?",
    key, [d1, d2, d3],
    "Surface field strength follows g = GM/R\u00B2, so the ratio is the mass ratio divided by the radius ratio squared: " + mR + " \u00F7 " + rR + "\u00B2 = " + mR + " \u00F7 " + (rR * rR) + " = " + fmt(ratio, 2) + ". A ratio above 1 means planet B's field is stronger by that factor; below 1 means Earth's is stronger by its reciprocal. Here: " + key + ".",
    {mR: mR, rR: rR});
}]));

/* ---------- PH12.7.3 Electric fields described ---------- */

E("u3-73-field-point-charge", 3, ["PH12.7.3"], 2, "gen", function(){
  var Q = sfR(rf(1.0, 9.0), 3);
  var r = sfR(rf(0.10, 0.90), 3);
  var E = PHYS_K * Q * 1e-6 / (r * r);
  var ans = sfR(E, 3);
  var qq3204 = numq("A point charge of +" + gF(Q) + " \u03BCC is fixed in place. Calculate the electric field strength at a point " + gF(r) + " m from the charge. Give your answer in N/C.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Use E = kQ/r\u00B2. Convert the charge to coulombs: Q = " + gF(Q) + " \u00D7 10\u207B\u2076 C. Multiply k = 8.99 \u00D7 10\u2079 N m\u00B2/C\u00B2 by Q, then divide by r\u00B2 = (" + gF(r) + " m)\u00B2, keeping the powers of ten in words as you go. The result is E = " + F3(ans) + " N/C, directed away from the charge because the charge is positive. The field strength is " + F3(ans) + " N/C.",
    {Q: Q, r: r}); qq3204.figure = p32figPointCharge(Q,r); return qq3204;
});

E("u3-73-force-test-charge", 3, ["PH12.7.3"], 1, "gen", function(){
  var E = sfR(rf(2.0, 9.0) * 1e4, 3);
  var q = sfR(rf(1.0, 9.0), 3);
  var F = E * q * 1e-6;
  var ans = sfR(F, 3);
  return numq("A test charge of +" + gF(q) + " \u03BCC is placed in an electric field of strength " + gF(E) + " N/C. Calculate the force on the test charge. Give your answer in N.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-12),
    "The force on a charge in a field is F = qE. Convert the charge: q = " + gF(q) + " \u00D7 10\u207B\u2076 C. Multiply by the field strength " + gF(E) + " N/C, combining the powers of ten in words. The force is F = " + F3(ans) + " N, in the direction of the field because the test charge is positive. The force is " + F3(ans) + " N.",
    {E: E, q: q});
});

E("u3-73-net-field-midway", 3, ["PH12.7.3"], 2, "gen", function(){
  var q1 = sfR(rf(2.0, 6.0), 3);
  var q2 = sfR(q1 + rf(1.0, 5.0), 3);
  var d = sfR(rf(0.20, 0.80), 3);
  var half = d / 2;
  var E1 = PHYS_K * q1 * 1e-6 / (half * half);
  var E2 = PHYS_K * q2 * 1e-6 / (half * half);
  var opp = Math.random() < 0.5;
  var net, dirWord, keyMag, wrongMag;
  if (opp) { net = E1 + E2; wrongMag = Math.abs(E2 - E1); dirWord = "toward the negative charge"; }
  else { net = Math.abs(E2 - E1); wrongMag = E1 + E2; dirWord = "away from the larger positive charge"; }
  var key = F3(net) + " N/C, " + dirWord;
  var wrongDir = opp ? "toward the positive charge" : "toward the larger positive charge";
  var qq3204 = mcq("Charge A is +" + gF(q1) + " \u03BCC and charge B is " + (opp ? "\u2212" : "+") + gF(q2) + " \u03BCC. They are " + gF(d) + " m apart. What is the electric field at the point midway between them?",
    key, [F3(net) + " N/C, " + wrongDir, F3(wrongMag) + " N/C, " + dirWord, F3(wrongMag) + " N/C, " + wrongDir],
    "At the midpoint each charge is " + gF(half) + " m away. Field from A: E = kQ/r\u00B2 = " + F3(E1) + " N/C, pointing away from A (A is positive). Field from B: " + F3(E2) + " N/C, pointing " + (opp ? "toward B, because B is negative, which is the same direction as the field from A" : "away from B, which is back toward A, opposite to the field from A") + ". So the fields " + (opp ? "add" : "partly cancel") + ", giving " + F3(net) + " N/C, " + dirWord + ". The net field is " + key + ".",
    {q1: q1, q2: q2, d: d, opp: opp}); qq3204.figure = p32figMidway(q1,q2,d,opp); return qq3204;
});

E("u3-73-field-two-charges-point", 3, ["PH12.7.3"], 3, "gen", function(){
  var q1 = sfR(rf(2.0, 8.0), 3);
  var q2 = sfR(rf(2.0, 8.0), 3);
  var d1 = sfR(rf(0.15, 0.45), 3);
  var d2 = sfR(d1 + rf(0.20, 0.50), 3);
  var E1 = PHYS_K * q1 * 1e-6 / (d1 * d1);
  var E2 = PHYS_K * q2 * 1e-6 / (d2 * d2);
  var net = Math.abs(E1 - E2);
  var ans = sfR(net, 3);
  var dirWord = E1 > E2 ? "away from the pair of charges, along the line" : "toward the pair of charges, along the line";
  var qq3204 = numq("A charge of +" + gF(q1) + " \u03BCC and a charge of \u2212" + gF(q2) + " \u03BCC lie on a line. Point P is on the same line, on the side of the positive charge away from the negative charge, " + gF(d1) + " m from the positive charge and " + gF(d2) + " m from the negative charge. Calculate the magnitude of the net electric field at P. Give your answer in N/C.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Find each field at P, with signs, and add them as vectors. Step 1: the positive charge's field at P points away from the positive charge, outward along the line away from both charges: E = kQ/r\u00B2 = " + iF(E1) + " N/C. Step 2: the field of a negative charge points toward that charge, so at P the negative charge's field points back along the line toward the charges: E = " + iF(E2) + " N/C, in the opposite direction to the first field. Step 3: the two fields oppose, so the net magnitude is the difference of the magnitudes: " + F3(ans) + " N/C, directed " + dirWord + ", in the direction of the stronger field. The magnitude of the net field at P is " + F3(ans) + " N/C.",
    {q1: q1, q2: q2, d1: d1, d2: d2}); qq3204.figure = p32figTwoChargesPoint(q1,q2,d1,d2); return qq3204;
});

E("u3-73-field-triangle", 3, ["PH12.7.3"], 2, "gen", function(){
  var q = sfR(rf(1.0, 6.0), 3);
  var a = sfR(rf(0.20, 0.60), 3);
  var b = sfR(rf(0.20, 0.60), 3);
  var Ea = PHYS_K * q * 1e-6 / (a * a);
  var Eb = PHYS_K * q * 1e-6 / (b * b);
  var net = Math.sqrt(Ea * Ea + Eb * Eb);
  var gT2 = 0;
  while (gT2++ < 60 && new Set([F3(net), F3(Ea + Eb), F3(Math.abs(Ea - Eb)), F3(net / 2)]).size < 4) {
    b = sfR(rf(0.20, 0.60), 3);
    Eb = PHYS_K * q * 1e-6 / (b * b);
    net = Math.sqrt(Ea * Ea + Eb * Eb);
  }
  var key = F3(net) + " N/C";
  var qq3204 = mcq("Two charges, each +" + gF(q) + " \u03BCC, sit at two corners of a right triangle. Point P is at the third corner. P is " + gF(a) + " m from one charge, measured along one side of the triangle, and " + gF(b) + " m from the other charge, measured along the perpendicular side. What is the magnitude of the net electric field at P?",
    key, [F3(Ea + Eb) + " N/C", F3(Math.abs(Ea - Eb)) + " N/C", F3(net / 2) + " N/C"],
    "Each field at P points away from its positive charge, along the side of the triangle joining them, so the two fields are perpendicular. Their magnitudes are E = kQ/r\u00B2: " + F3(Ea) + " N/C and " + F3(Eb) + " N/C. Perpendicular vectors combine by Pythagoras, not by adding or subtracting: the net magnitude is the square root of the sum of the squares, " + F3(net) + " N/C. The net field magnitude is " + key + ".",
    {q: q, a: a, b: b}); qq3204.figure = p32figChargeTriangle("P","+"+gF(q)+" \u03BCC","+"+gF(q)+" \u03BCC",a,b); return qq3204;
});

E("u3-73-field-lines-concept", 3, ["PH12.7.3"], 1, "var", varset([
  function(){
    var qq3204 = mcq("Which statement about electric field lines is correct?",
      "Field lines begin on positive charges and end on negative charges, and they never cross",
      ["Field lines begin on negative charges and end on positive charges",
       "Field lines can cross where the field is very strong",
       "Field lines are the paths that electrons always follow exactly"],
      "By convention, field lines show the direction of the force on a positive test charge, so they leave positive charges and arrive at negative charges. Two lines can never cross, because that would mean the field pointed in two directions at one point. Field lines begin on positive charges and end on negative charges, and they never cross.", {}); qq3204.figure = p32figFieldLinesVar("posneg"); return qq3204;
  },
  function(){
    var qq3204 = mcq("In a field line diagram, the field is strongest where",
      "The field lines are closest together",
      ["The field lines are farthest apart",
       "The field lines curve the most",
       "The field lines point straight up"],
      "Line density represents strength: where lines crowd together, more lines pass through each unit of area and the field is stronger. Near a point charge the lines spread out with distance, matching the field's 1/r\u00B2 fall. The field is strongest where the lines are closest together.", {}); qq3204.figure = p32figFieldLinesVar("density"); return qq3204;
  },
  function(){
    var qq3204 = mcq("A positive test charge is released from rest at a point in an electric field. The direction it begins to move is",
      "Along the field line at that point, in the direction the line points",
      ["Opposite to the direction the field line points",
       "Perpendicular to the field line at that point",
       "Toward the nearest field line crossing"],
      "The field at a point is defined by the force on a positive test charge there, and the field line's direction is the direction of that force. So a positive charge accelerates along the line, in the direction it points. A negative charge would start off the opposite way.", {}); qq3204.figure = p32figFieldLinesVar("uniform"); return qq3204;
  },
  function(){
    var qq3204 = mcq("The electric field inside a closed, hollow conductor in electrostatic equilibrium is",
      "Zero everywhere inside the hollow space",
      ["Equal to the field at the conductor's surface",
       "Strongest at the centre of the hollow space",
       "Directed from the centre toward the walls"],
      "In electrostatic equilibrium, any free charge in a conductor sits on its outer surface, and the field inside the material and inside a hollow space within it is zero. This is why a metal car body shields occupants from external fields. The field inside the hollow conductor is zero.", {}); qq3204.figure = p32figFieldLinesVar("hollow"); return qq3204;
  }
]));

E("u3-73-zero-field-point", 3, ["PH12.7.3"], 3, "gen", function(){
  var base = pick([1.5, 2.0, 2.5, 3.0]);
  var mult = pick([4, 9]);
  var q1 = base, q2 = base * mult;
  var d = sfR(rf(0.30, 0.90), 3);
  var root = Math.sqrt(mult);
  var x = d / (1 + root);
  var ans = sfR(x, 3);
  var qq3204 = numq("A charge of +" + gF(q1) + " \u03BCC and a charge of +" + gF(q2) + " \u03BCC are " + gF(d) + " m apart. At what distance from the smaller charge, measured along the line between them, is the net electric field zero? Give your answer in m.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Between two positive charges the fields point in opposite directions, so they can cancel. Let x be the distance from the smaller charge; the other distance is " + gF(d) + " m minus x. Setting the field magnitudes equal, kq\u2081/x\u00B2 = kq\u2082/(" + gF(d) + " \u2212 x)\u00B2, the k and the units cancel. Because the larger charge is " + mult + " times the smaller, its distance must be \u221A" + mult + " = " + root + " times as great for the fields to match. So x + " + root + "x = " + gF(d) + " m, giving x = " + F3(ans) + " m. The zero-field point is " + F3(ans) + " m from the smaller charge, closer to it because its field weakens sooner.",
    {q1: q1, q2: q2, d: d}); qq3204.figure = p32figZeroPoint(q1,q2,d); return qq3204;
});

/* ---------- PH12.7.4 Coulomb's law applied ---------- */

E("u3-74-coulomb-force", 3, ["PH12.7.4"], 2, "gen", function(){
  var q1 = sfR(rf(1.0, 9.0), 3);
  var q2 = sfR(rf(1.0, 9.0), 3);
  var r = sfR(rf(0.050, 0.500), 3);
  var F = PHYS_K * q1 * 1e-6 * q2 * 1e-6 / (r * r);
  var ans = sfR(F, 3);
  var qq3204 = numq("Two small charged spheres have charges of +" + gF(q1) + " \u03BCC and \u2212" + gF(q2) + " \u03BCC. Their centres are " + gF(r) + " m apart. Calculate the magnitude of the electric force between them. Give your answer in N.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-12),
    "Use Coulomb's law, F = kq\u2081q\u2082/r\u00B2. Convert both charges to coulombs (multiply each by 10\u207B\u2076), multiply by k = 8.99 \u00D7 10\u2079 N m\u00B2/C\u00B2, and divide by r\u00B2 = (" + gF(r) + " m)\u00B2, tracking powers of ten in words. The magnitude is F = " + F3(ans) + " N. Because the charges have opposite signs, the force is attractive. The force magnitude is " + F3(ans) + " N.",
    {q1: q1, q2: q2, r: r}); qq3204.figure = p32figTwoSpheres("+"+gF(q1)+" \u03BCC","\u2212"+gF(q2)+" \u03BCC",gF(r)+" m"); return qq3204;
});

E("u3-74-scaling", 3, ["PH12.7.4"], 1, "var", varset([
  function(){
    return mcq("Two point charges attract each other with force F. If the charge on one of them is doubled, with the separation unchanged, the new force is",
      "2F", ["F", "4F", "F/2"],
      "Coulomb's law has the force proportional to each charge: F = kq\u2081q\u2082/r\u00B2. Doubling one charge doubles the product, so the force becomes 2F.", {});
  },
  function(){
    return mcq("Two point charges repel each other with force F. If the distance between them is tripled, with the charges unchanged, the new force is",
      "F/9", ["F/3", "3F", "F/6"],
      "Coulomb's law is an inverse square law in distance. Tripling r divides the force by 3\u00B2 = 9, so the new force is F/9, not F/3.", {});
  },
  function(){
    return mcq("Two point charges exert force F on each other. If both charges are doubled and the distance is also doubled, the new force is",
      "F", ["4F", "2F", "F/4"],
      "Track each change: doubling both charges multiplies the force by 2 \u00D7 2 = 4. Doubling the distance divides it by 2\u00B2 = 4. The two effects cancel exactly, so the new force is F.", {});
  },
  function(){
    return mcq("Two point charges exert force F on each other. If one charge is halved and the distance is halved, the new force is",
      "2F", ["F", "F/2", "4F"],
      "Halving one charge multiplies the force by 1/2. Halving the distance multiplies it by 1/(1/2)\u00B2 = 4. Combined: 1/2 \u00D7 4 = 2, so the new force is 2F.", {});
  },
  function(){
    return mcq("A charge of +Q and a charge of \u2212Q attract with force F. The \u2212Q charge is replaced by a charge of +Q, everything else unchanged. The force between them is now",
      "A repulsion of magnitude F", ["An attraction of magnitude F", "A repulsion of magnitude 2F", "Zero"],
      "Coulomb's law gives the magnitude from the sizes of the charges and the distance, none of which changed, so the magnitude is still F. The sign change flips the character of the force: like charges repel. The force is now a repulsion of magnitude F.", {});
  }
]));

E("u3-74-separation-from-force", 3, ["PH12.7.4"], 3, "gen", function(){
  var q1 = sfR(rf(1.0, 8.0), 3);
  var q2 = sfR(rf(1.0, 8.0), 3);
  var rTrue = sfR(rf(0.100, 0.600), 3);
  var F = sfR(PHYS_K * q1 * 1e-6 * q2 * 1e-6 / (rTrue * rTrue), 3);
  var r = Math.sqrt(PHYS_K * q1 * 1e-6 * q2 * 1e-6 / F);
  var ans = sfR(r, 3);
  var qq3204 = numq("Two charged spheres, +" + gF(q1) + " \u03BCC and +" + gF(q2) + " \u03BCC, repel each other with a force of " + gF(F) + " N. Calculate the distance between their centres. Give your answer in m.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Rearrange Coulomb's law: r\u00B2 = kq\u2081q\u2082/F, then take the square root. Step 1: convert the charges to coulombs and compute kq\u2081q\u2082, tracking the powers of ten in words. Step 2: divide by F = " + gF(F) + " N to get r\u00B2 = " + iF(r * r) + " m\u00B2. Step 3: r is the square root of that: r = " + F3(ans) + " m. The distance between the centres is " + F3(ans) + " m.",
    {q1: q1, q2: q2, F: F}); qq3204.figure = p32figTwoSpheres("+"+gF(q1)+" \u03BCC","+"+gF(q2)+" \u03BCC","?"); return qq3204;
});

E("u3-74-charge-from-force", 3, ["PH12.7.4"], 3, "gen", function(){
  var qTrue = sfR(rf(1.0, 9.0), 3);
  var r = sfR(rf(0.100, 0.500), 3);
  var F = sfR(PHYS_K * qTrue * 1e-6 * qTrue * 1e-6 / (r * r), 3);
  var q = Math.sqrt(F * r * r / PHYS_K) * 1e6;
  var ans = sfR(q, 3);
  var qq3204 = numq("Two identical small spheres carry equal charges and are " + gF(r) + " m apart. They repel each other with a force of " + gF(F) + " N. Calculate the charge on each sphere. Give your answer in \u03BCC.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "With equal charges, Coulomb's law reads F = kq\u00B2/r\u00B2, so q\u00B2 = Fr\u00B2/k. Step 1: square the separation: r\u00B2 = (" + gF(r) + " m)\u00B2 = " + iF(r * r) + " m\u00B2. Step 2: multiply F = " + gF(F) + " N by r\u00B2 and divide by k = 8.99 \u00D7 10\u2079, tracking powers of ten in words, to get q\u00B2 in C\u00B2. Step 3: take the square root and convert back to microcoulombs by multiplying by 10\u2076: q = " + F3(ans) + " \u03BCC. The charge on each sphere is " + F3(ans) + " \u03BCC.",
    {r: r, F: F}); qq3204.figure = p32figTwoSpheres("? \u03BCC","? \u03BCC",gF(r)+" m"); return qq3204;
});

E("u3-74-net-force-collinear", 3, ["PH12.7.4"], 3, "gen", function(){
  var qA = sfR(rf(2.0, 6.0), 3);
  var qB = sfR(rf(2.0, 6.0), 3);
  var qC = sfR(rf(2.0, 6.0), 3);
  var dAB = sfR(rf(0.10, 0.30), 3);
  var dBC = sfR(rf(0.10, 0.30), 3);
  var FBA = PHYS_K * qB * 1e-6 * qA * 1e-6 / (dAB * dAB);
  var FBC = PHYS_K * qB * 1e-6 * qC * 1e-6 / (dBC * dBC);
  var net = Math.abs(FBA - FBC);
  var ans = sfR(net, 3);
  var toward = FBA > FBC ? "toward A" : "toward C";
  var qq3204 = numq("Three charges lie on a line in the order A, B, C. A is +" + gF(qA) + " \u03BCC, B is +" + gF(qB) + " \u03BCC and C is +" + gF(qC) + " \u03BCC. A and B are " + gF(dAB) + " m apart and B and C are " + gF(dBC) + " m apart. Calculate the magnitude of the net force on charge B. Give your answer in N.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-12),
    "All three charges are positive, so both neighbours repel B. Step 1: A repels B toward C, with force from Coulomb's law F = " + iF(FBA) + " N. Step 2: C repels B toward A with F = " + iF(FBC) + " N. Step 3: the two forces point in opposite directions, so the net force is the difference of the magnitudes: " + F3(ans) + " N, directed " + toward + ", toward the weaker push. The magnitude of the net force on B is " + F3(ans) + " N.",
    {qA: qA, qB: qB, qC: qC, dAB: dAB, dBC: dBC}); qq3204.figure = p32figCollinear3(qA,qB,qC,dAB,dBC); return qq3204;
});

E("u3-74-net-force-triangle", 3, ["PH12.7.4"], 2, "gen", function(){
  var q = sfR(rf(1.0, 6.0), 3);
  var qt = sfR(rf(1.0, 6.0), 3);
  var a = sfR(rf(0.10, 0.40), 3);
  var b = sfR(rf(0.10, 0.40), 3);
  var Fa = PHYS_K * q * 1e-6 * qt * 1e-6 / (a * a);
  var Fb = PHYS_K * q * 1e-6 * qt * 1e-6 / (b * b);
  var net = Math.sqrt(Fa * Fa + Fb * Fb);
  var gT = 0;
  while (gT++ < 60 && new Set([F3(net), F3(Fa + Fb), F3(Math.abs(Fa - Fb)), F3(net / 2)]).size < 4) {
    b = sfR(rf(0.10, 0.40), 3);
    Fb = PHYS_K * q * 1e-6 * qt * 1e-6 / (b * b);
    net = Math.sqrt(Fa * Fa + Fb * Fb);
  }
  var key = F3(net) + " N";
  var qq3204 = mcq("A charge of +" + gF(qt) + " \u03BCC sits at the corner of a right triangle. Along one side, " + gF(a) + " m away, is a charge of +" + gF(q) + " \u03BCC. Along the perpendicular side, " + gF(b) + " m away, is another charge of +" + gF(q) + " \u03BCC. What is the magnitude of the net electric force on the first charge?",
    key, [F3(Fa + Fb) + " N", F3(Math.abs(Fa - Fb)) + " N", F3(net / 2) + " N"],
    "Both charges repel the first charge, pushing it away along each side of the triangle, so the two forces are perpendicular. Their magnitudes from Coulomb's law are " + F3(Fa) + " N and " + F3(Fb) + " N. Perpendicular forces combine by Pythagoras: the net magnitude is the square root of the sum of the squares, " + F3(net) + " N. The net force magnitude is " + key + ".",
    {q: q, qt: qt, a: a, b: b}); qq3204.figure = p32figChargeTriangle("+"+gF(qt)+" \u03BCC","+"+gF(q)+" \u03BCC","+"+gF(q)+" \u03BCC",a,b); return qq3204;
});

E("u3-74-attract-repel", 3, ["PH12.7.4"], 1, "var", varset([
  function(){
    return mcq("A negatively charged rod is brought near a neutral metal sphere on an insulating stand, without touching it. The sphere is",
      "Attracted to the rod, because the rod repels the sphere's electrons to the far side, leaving the near side positive",
      ["Repelled by the rod, because the sphere is uncharged and cannot interact",
       "Attracted to the rod, because the sphere gains electrons from the rod through the air",
       "Unaffected, because a neutral object has no charges in it at all"],
      "A neutral object still contains equal amounts of positive and negative charge. The rod pushes the sphere's electrons to the far side, so the near side is left positive and closer to the rod; the attraction of the near side beats the repulsion of the far side. The sphere is attracted, with no contact and no charge transfer needed.", {});
  },
  function(){
    return mcq("Two balloons are rubbed on hair and hung side by side. They swing away from each other. This shows that",
      "Both balloons carry the same sign of charge, and like charges repel",
      ["The balloons carry opposite charges, and opposite charges repel",
       "Rubbing created a magnetic field between the balloons",
       "The balloons are attracted to the ceiling and only appear to separate"],
      "Rubbing charges both balloons the same way, by the same process, so they carry the same sign of charge. Like charges repel, so the balloons push apart. Opposite charges would attract and pull the balloons together instead.", {});
  },
  function(){
    return mcq("A charged rod attracts a small neutral scrap of paper. After the paper touches the rod, the paper is often seen to jump away. The jump happens because",
      "On contact the paper gains charge of the same sign as the rod, and like charges then repel",
      ["The rod's charge is used up by the first attraction, so gravity wins",
       "The paper becomes magnetized by contact and is repelled magnetically",
       "Air currents from the rod blow the paper off"],
      "Attraction to a neutral object works by induction: the near side of the paper takes the opposite sign. On contact, charge actually transfers, and the paper ends up with the rod's sign of charge. Now like charges repel and the paper jumps off. The rod keeps most of its charge; it is not used up.", {});
  },
  function(){
    return mcq("Which pair of charges exerts an attractive force on each other?",
      "A charge of +3 \u03BCC and a charge of \u22125 \u03BCC",
      ["A charge of +3 \u03BCC and a charge of +5 \u03BCC",
       "A charge of \u22123 \u03BCC and a charge of \u22125 \u03BCC",
       "A charge of +3 \u03BCC and a neutral metal ball with no induced charge separation"],
      "Attraction happens between opposite signs: one positive and one negative. Two positives repel, two negatives repel, and a neutral ball with no charge separation feels no net force. Only the +3 \u03BCC and \u22125 \u03BCC pair attracts.", {});
  }
]));

E("u3-74-force-ratio-distance", 3, ["PH12.7.4"], 2, "gen", function(){
  var q = sfR(rf(1.0, 8.0), 3);
  var F1 = sfR(rf(0.10, 0.90), 3);
  var k = pick([2, 3]);
  var key = F3(F1 * k * k) + " N";
  return mcq("A charge of +" + gF(q) + " \u03BCC experiences a force of " + gF(F1) + " N from a nearby charged sphere. The charge is moved to a point " + k + " times closer to the sphere, with both charges unchanged. What force does it experience now?",
    key, [F3(F1 * k) + " N", F3(F1) + " N", F3(F1 / (k * k)) + " N"],
    "Coulomb's law is an inverse square law. Moving " + k + " times closer divides the distance by " + k + ", which multiplies the force by " + k + "\u00B2 = " + (k * k) + ". The new force is " + gF(F1) + " N \u00D7 " + (k * k) + " = " + F3(F1 * k * k) + " N. The force now is " + key + ".",
    {q: q, F1: F1, k: k});
});

/* ---------- PH12.7.5 Electric circuits analysed ---------- */

E("u3-75-charge-current", 3, ["PH12.7.5"], 2, "gen", function(){
  var I = sfR(rf(0.400, 3.50), 3);
  var tMin = ri(1, 8);
  var t = tMin * 60;
  var Q = I * t;
  var ans = sfR(Q, 3);
  return numq("A current of " + gF(I) + " A flows through a cabin light circuit for " + tMin + " min. Calculate the total charge that passes through the circuit. Give your answer in C.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Charge is current times time: Q = It. First convert the time: " + tMin + " min = " + t + " s. Then Q = " + gF(I) + " A \u00D7 " + t + " s = " + F3(ans) + " C. The total charge is " + F3(ans) + " C.",
    {I: I, tMin: tMin});
});

E("u3-75-electron-count", 3, ["PH12.7.5"], 2, "gen", function(){
  var Q = sfR(rf(1.0, 9.0), 3);
  var N = Q / PHYS_E;
  var ans = sfR(N, 3);
  return numq("A total charge of " + gF(Q) + " C flows through a wire. Each electron carries a charge of 1.60 \u00D7 10\u207B\u00B9\u2079 C. Calculate how many electrons passed through the wire. Give your answer as a number of electrons.",
    ans, Math.max(0.02 * Math.abs(ans), 1e12),
    "The number of electrons is the total charge divided by the charge on one electron: N = Q/e. Divide " + gF(Q) + " C by 1.60 \u00D7 10\u207B\u00B9\u2079 C, subtracting the powers of ten in words (10\u2070 divided by 10\u207B\u00B9\u2079 gives 10\u00B9\u2079). The result is N = " + F3(ans) + " electrons. Even a few coulombs means an enormous number of electrons, because each electron carries so little charge.",
    {Q: Q});
});

E("u3-75-work-potential", 3, ["PH12.7.5"], 2, "gen", function(){
  var W = sfR(rf(10, 120), 3);
  var Q = sfR(rf(0.500, 8.00), 3);
  var V = W / Q;
  var ans = sfR(V, 3);
  return numq("A battery does " + gF(W) + " J of work moving " + gF(Q) + " C of charge from one terminal to the other. Calculate the potential difference between the terminals. Give your answer in V.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Potential difference is work per unit charge: V = W/Q. So V = " + gF(W) + " J \u00F7 " + gF(Q) + " C = " + F3(ans) + " V. Each coulomb of charge gains " + F3(ans) + " J of energy crossing this battery. The potential difference is " + F3(ans) + " V.",
    {W: W, Q: Q});
});

E("u3-75-resistance", 3, ["PH12.7.5"], 1, "gen", function(){
  var V = sfR(rf(3.0, 24.0), 3);
  var I = sfR(rf(0.200, 3.00), 3);
  var R = V / I;
  var ans = sfR(R, 3);
  return numq("A resistor connected across a " + gF(V) + " V supply draws a current of " + gF(I) + " A. Use R = V/I to calculate its resistance. Give your answer in \u03A9.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Resistance is the ratio of potential difference to current: R = V/I = " + gF(V) + " V \u00F7 " + gF(I) + " A = " + F3(ans) + " \u03A9. The resistance is " + F3(ans) + " \u03A9.",
    {V: V, I: I});
});

E("u3-75-power", 3, ["PH12.7.5"], 2, "gen", function(){
  var V = pick([120, 120, 240]);
  var I = sfR(rf(0.500, 12.0), 3);
  var P = V * I;
  var ans = sfR(P, 3);
  return numq("An appliance connected to a " + V + " V supply draws " + gF(I) + " A. Calculate the power it uses. Give your answer in W.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Electrical power is P = VI. So P = " + V + " V \u00D7 " + gF(I) + " A = " + F3(ans) + " W. The appliance converts electrical energy at a rate of " + F3(ans) + " W. The power is " + F3(ans) + " W.",
    {V: V, I: I});
});

E("u3-75-energy-cost", 3, ["PH12.7.5"], 2, "gen", function(){
  var PkW = sfR(rf(0.800, 2.40), 3);
  var hDay = ri(3, 9);
  var days = pick([30, 31]);
  var rate = pick([0.125, 0.132, 0.148, 0.156]);
  var hours = hDay * days;
  var kWh = PkW * hours;
  var cost = kWh * rate;
  var ans = sfR(cost, 3);
  return numq("An electric heater rated at " + gF(PkW) + " kW runs for " + hDay + " h per day for " + days + " days. Electricity costs $" + fmt(rate, 3) + " per kWh. Calculate the cost of running the heater for that period. Give your answer in dollars.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Work in kilowatt hours. Step 1: total time = " + hDay + " h/day \u00D7 " + days + " days = " + hours + " h. Step 2: energy used = " + gF(PkW) + " kW \u00D7 " + hours + " h = " + iF(kWh) + " kWh. Step 3: cost = energy \u00D7 rate = " + iF(kWh) + " kWh \u00D7 $" + fmt(rate, 3) + "/kWh = $" + F3(ans) + ". The cost of running the heater is $" + F3(ans) + ".",
    {PkW: PkW, hDay: hDay, days: days, rate: rate});
});

E("u3-75-kirchhoff-junction", 3, ["PH12.7.5"], 1, "gen", function(){
  var a = sfR(rf(1.0, 6.0), 2);
  var b = sfR(rf(1.0, 6.0), 2);
  var c = sfR(rf(0.5, a + b - 0.5), 2);
  var d = Math.round((a + b - c) * 100) / 100;
  var guard = 0;
  while ((Math.abs(d - c) < 0.005 || Math.abs(d - Math.abs(a - b)) < 0.005 || Math.abs(c - Math.abs(a - b)) < 0.005) && guard++ < 50) { c = sfR(rf(0.5, a + b - 0.5), 2); d = Math.round((a + b - c) * 100) / 100; }
  var key = fmt(d, 2) + " A";
  var qq3204 = mcq("At a junction in a circuit, currents of " + fmt(a, 2) + " A and " + fmt(b, 2) + " A flow into the junction. One wire leaving the junction carries " + fmt(c, 2) + " A. What current flows in the only other wire leaving the junction?",
    key, [fmt(a + b, 2) + " A", fmt(Math.abs(a - b), 2) + " A", fmt(c, 2) + " A"],
    "Kirchhoff's junction rule: charge is conserved, so the current entering a junction equals the current leaving it. Total in = " + fmt(a, 2) + " A + " + fmt(b, 2) + " A = " + fmt(a + b, 2) + " A. One leaving wire takes " + fmt(c, 2) + " A, so the other carries " + fmt(a + b, 2) + " A \u2212 " + fmt(c, 2) + " A = " + fmt(d, 2) + " A. The current is " + key + ".",
    {a: a, b: b, c: c}); qq3204.figure = p32figJunction(a,b,c); return qq3204;
});

E("u3-75-kirchhoff-loop", 3, ["PH12.7.5"], 2, "gen", function(){
  var emf = pick([12, 18, 24, 36]);
  var v1 = sfR(rf(2.0, emf / 3), 2);
  var v2 = sfR(rf(2.0, emf / 3), 2);
  var v3 = Math.round((emf - v1 - v2) * 100) / 100;
  var guard2 = 0;
  while (guard2++ < 80) {
    var vs = [v3, v1 + v2, emf - v1, emf];
    var bad2 = false;
    for (var i2 = 0; i2 < 4; i2++) for (var j2 = i2 + 1; j2 < 4; j2++) if (Math.abs(vs[i2] - vs[j2]) < 0.011) bad2 = true;
    if (!bad2) break;
    v1 = sfR(rf(2.0, emf / 3), 2); v2 = sfR(rf(2.0, emf / 3), 2); v3 = Math.round((emf - v1 - v2) * 100) / 100;
  }
  var key = fmt(v3, 2) + " V";
  var qq3204 = mcq("A series loop contains a " + emf + " V battery and three resistors. The potential drops across two of the resistors are " + fmt(v1, 2) + " V and " + fmt(v2, 2) + " V. What is the potential drop across the third resistor?",
    key, [fmt(v1 + v2, 2) + " V", fmt(emf - v1, 2) + " V", fmt(emf, 2) + " V"],
    "Kirchhoff's loop rule: going around a closed loop, the battery's gain equals the sum of the drops. So the three drops add to " + emf + " V. The third drop is " + emf + " V \u2212 " + fmt(v1, 2) + " V \u2212 " + fmt(v2, 2) + " V = " + fmt(v3, 2) + " V. The third drop is " + key + ".",
    {emf: emf, v1: v1, v2: v2}); qq3204.figure = p32figLoopDrops(emf,v1,v2); return qq3204;
});

E("u3-75-series-resistance", 3, ["PH12.7.5"], 1, "gen", function(){
  var rs = [ri(2, 40), ri(2, 40), ri(2, 40)];
  var tot = rs[0] + rs[1] + rs[2];
  var qq3204 = numq("Three resistors of " + rs[0] + " \u03A9, " + rs[1] + " \u03A9 and " + rs[2] + " \u03A9 are connected in series. Calculate the equivalent resistance. Give your answer in \u03A9.",
    tot, 0.4,
    "Resistances in series add directly, because the same current must pass through each one in turn: R = " + rs[0] + " \u03A9 + " + rs[1] + " \u03A9 + " + rs[2] + " \u03A9 = " + tot + " \u03A9. The equivalent resistance is " + tot + " \u03A9.",
    {rs: rs}); qq3204.figure = p32figCircuitSeries(null,[rs[0]+" \u03A9",rs[1]+" \u03A9",rs[2]+" \u03A9"]); return qq3204;
});

E("u3-75-parallel-resistance", 3, ["PH12.7.5"], 2, "gen", function(){
  var r1 = ri(3, 60);
  var r2 = ri(3, 60);
  var Rp = r1 * r2 / (r1 + r2);
  var ans = sfR(Rp, 3);
  var qq3204 = numq("Resistors of " + r1 + " \u03A9 and " + r2 + " \u03A9 are connected in parallel. Calculate the equivalent resistance. Give your answer in \u03A9.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "For two resistors in parallel, use the product over the sum: R = (R\u2081 \u00D7 R\u2082)/(R\u2081 + R\u2082) = (" + r1 + " \u03A9 \u00D7 " + r2 + " \u03A9) \u00F7 (" + r1 + " \u03A9 + " + r2 + " \u03A9) = " + (r1 * r2) + " \u00F7 " + (r1 + r2) + " = " + F3(ans) + " \u03A9. The equivalent resistance is smaller than either resistor alone, because the current has two paths. The equivalent resistance is " + F3(ans) + " \u03A9.",
    {r1: r1, r2: r2}); qq3204.figure = p32figCircuitParallel(null,r1,r2); return qq3204;
});

E("u3-75-combination-circuit", 3, ["PH12.7.5"], 3, "gen", function(){
  var V = pick([12, 24, 36, 48]);
  var r1 = ri(2, 20);
  var r2 = ri(4, 40);
  var r3 = ri(4, 40);
  var Rp = r2 * r3 / (r2 + r3);
  var Req = r1 + Rp;
  var I = V / Req;
  var ans = sfR(I, 3);
  var qq3204 = numq("A " + V + " V battery is connected to a " + r1 + " \u03A9 resistor in series with a parallel pair of " + r2 + " \u03A9 and " + r3 + " \u03A9 resistors. Calculate the total current drawn from the battery. Give your answer in A.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Reduce the circuit step by step. Step 1: the parallel pair: R = (" + r2 + " \u00D7 " + r3 + ") \u00F7 (" + r2 + " + " + r3 + ") = " + iF(Rp) + " \u03A9. Step 2: add the series resistor: R(total) = " + r1 + " \u03A9 + " + iF(Rp) + " \u03A9 = " + iF(Req) + " \u03A9. Step 3: total current I = V/R = " + V + " V \u00F7 " + iF(Req) + " \u03A9 = " + F3(ans) + " A. The total current is " + F3(ans) + " A.",
    {V: V, r1: r1, r2: r2, r3: r3}); qq3204.figure = p32figCircuitCombo(V,r1,r2,r3); return qq3204;
});

E("u3-75-circuit-table", 3, ["PH12.7.5"], 2, "gen", function(){
  var V = pick([24, 36, 48, 60]);
  var r1 = ri(3, 30);
  var r2 = ri(3, 30);
  var I = V / (r1 + r2);
  var v2 = I * r2;
  var ans = sfR(v2, 3);
  var qq3204 = numq("A " + V + " V source is connected across a series circuit of a " + r1 + " \u03A9 resistor and a " + r2 + " \u03A9 resistor. For a circuit table of this circuit, calculate the potential difference across the " + r2 + " \u03A9 resistor. Give your answer in V.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "In series the current is the same everywhere. Step 1: total resistance R = " + r1 + " \u03A9 + " + r2 + " \u03A9 = " + (r1 + r2) + " \u03A9. Step 2: current I = V/R = " + V + " V \u00F7 " + (r1 + r2) + " \u03A9 = " + iF(I) + " A. Step 3: the drop across the " + r2 + " \u03A9 resistor is V = IR = " + iF(I) + " A \u00D7 " + r2 + " \u03A9 = " + F3(ans) + " V. As a check, the drop across the other resistor makes the total add back to " + V + " V. The potential difference is " + F3(ans) + " V.",
    {V: V, r1: r1, r2: r2}); qq3204.figure = p32figCircuitSeries(V,[r1+" \u03A9",r2+" \u03A9"]); return qq3204;
});

E("u3-75-parallel-branches", 3, ["PH12.7.5"], 2, "gen", function(){
  var V = pick([12, 24, 36]);
  var r1 = ri(4, 48);
  var r2 = ri(4, 48);
  var I1 = V / r1, I2 = V / r2;
  var Itot = I1 + I2;
  var ans = sfR(Itot, 3);
  var qq3204 = numq("A " + V + " V source is connected across two parallel branches. One branch has a resistance of " + r1 + " \u03A9 and the other a resistance of " + r2 + " \u03A9. Calculate the total current drawn from the source. Give your answer in A.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Each parallel branch has the full source voltage across it. Step 1: current in the " + r1 + " \u03A9 branch: I = V/R = " + V + " V \u00F7 " + r1 + " \u03A9 = " + iF(I1) + " A. Step 2: current in the " + r2 + " \u03A9 branch: I = " + V + " V \u00F7 " + r2 + " \u03A9 = " + iF(I2) + " A. Step 3: by the junction rule the total current is the sum of the branch currents: " + iF(I1) + " A + " + iF(I2) + " A = " + F3(ans) + " A. The total current is " + F3(ans) + " A.",
    {V: V, r1: r1, r2: r2}); qq3204.figure = p32figCircuitParallel(V,r1,r2); return qq3204;
});

E("u3-75-fuse-rating", 3, ["PH12.7.5"], 3, "gen", function(){
  var over = Math.random() < 0.5;
  var apps = over ? [ri(1300, 1600), ri(800, 1100), ri(500, 800)] : [ri(600, 900), ri(300, 500), ri(100, 300)];
  var P = apps[0] + apps[1] + apps[2];
  var I = P / 120;
  var key = over ? ("The total current is " + F3(I) + " A, so the 15 A breaker will trip") : ("The total current is " + F3(I) + " A, so the load is within the 15 A breaker rating");
  var dOver = "The total current is " + F3(I) + " A, so the load is within the 15 A breaker rating";
  var dUnder = "The total current is " + F3(I) + " A, so the 15 A breaker will trip";
  var dPow = "The total power is " + F3(I) + " W, so the load is safe";
  return mcq("A 120 V household circuit protected by a 15 A breaker feeds a " + apps[0] + " W heater, a " + apps[1] + " W kettle and a " + apps[2] + " W toaster oven, all running at once. Which statement is correct?",
    key, [over ? dOver : dUnder, dPow, "The breaker compares voltages, so the current does not matter here"],
    "Add the powers: total = " + apps[0] + " W + " + apps[1] + " W + " + apps[2] + " W = " + P + " W. The current drawn is I = P/V = " + P + " W \u00F7 120 V = " + F3(I) + " A. Compare with the 15 A rating: " + (over ? "the load exceeds it, so the breaker trips to protect the wiring." : "the load is under it, so the circuit runs within its rating.") + " " + key + ".",
    {apps: apps, over: over});
});

/* ---------- PH12.7.6 Magnetic fields described ---------- */

E("u3-76-field-lines-magnet", 3, ["PH12.7.6"], 1, "var", varset([
  function(){
    var qq3204 = mcq("Outside a bar magnet, the magnetic field lines are drawn",
      "Leaving the north pole and entering the south pole",
      ["Leaving the south pole and entering the north pole",
       "Leaving both poles and meeting halfway between them",
       "Circling the magnet like the lines around a wire"],
      "By convention, field lines show the direction a north pole would be pushed. Outside the magnet they leave the north pole and enter the south pole. Inside the magnet they continue from south to north, so each line is a closed loop. Field lines leave the north pole and enter the south pole outside the magnet.", {}); qq3204.figure = p32figBarMagnet(false); return qq3204;
  },
  function(){
    var qq3204 = mcq("The magnetic field of a bar magnet is strongest",
      "Near the poles, where the field lines are closest together",
      ["At the centre of the magnet, halfway between the poles",
       "Far from the magnet, where the field lines spread out",
       "Everywhere along the magnet equally"],
      "Line spacing shows strength: lines crowd together near the poles and spread out with distance. The field is strongest near the poles, which is why a magnet picks up pins at its ends, not its middle.", {}); qq3204.figure = p32figBarMagnet(false); return qq3204;
  },
  function(){
    var qq3204 = mcq("A small compass is placed just outside the north pole of a bar magnet, on the magnet's axis. The compass needle's north pole points",
      "Away from the magnet's north pole, along the field line",
      ["Toward the magnet's north pole",
       "Toward the magnet's south pole along the side of the magnet",
       "Straight up, because compasses only respond to Earth's field"],
      "A compass needle aligns with the local field, and its north pole points in the field's direction. Outside the north pole the field points away from the magnet, so the needle's north points away too. Compasses respond to any magnetic field, not just Earth's.", {}); qq3204.figure = p32figBarMagnet(false); return qq3204;
  },
  function(){
    var qq3204 = mcq("Two magnetic field lines in a diagram of a bar magnet's field",
      "Never cross, because the field has a single direction at each point",
      ["Cross at the neutral point between two magnets only",
       "Cross wherever the field is strongest",
       "Cross at the poles, where all lines meet"],
      "A field line shows the field's direction at each point it passes through. If two lines crossed, the field at the crossing would point two ways at once, which is impossible. Field lines never cross.", {}); qq3204.figure = p32figBarMagnet(false); return qq3204;
  }
]));

E("u3-76-field-wire-lines", 3, ["PH12.7.6"], 1, "var", varset([
  function(){
    var qq3204 = mcq("The magnetic field lines around a long straight wire carrying a steady current form",
      "Concentric circles centred on the wire",
      ["Straight lines radiating out from the wire",
       "Lines running parallel to the wire along its length",
       "A helix that spirals along the wire"],
      "The field circles the wire: a compass placed anywhere near the wire aligns tangent to a circle centred on the wire. The pattern is concentric circles, with the direction given by the right-hand rule: thumb along the current, fingers curl with the field.", {}); qq3204.figure = p32figWireCircles(); return qq3204;
  },
  function(){
    var qq3204 = mcq("As you move farther from a long straight current-carrying wire, the field lines in a diagram are drawn",
      "Farther apart, because the field gets weaker with distance",
      ["Closer together, because the field gets stronger with distance",
       "At the same spacing, because the field around a wire is uniform",
       "In the opposite direction, because the field reverses"],
      "The field around a wire falls off as 1/r, so it weakens steadily with distance. In a line diagram, weakening is shown by lines spreading apart. The field keeps the same circular direction; only its strength falls.", {}); qq3204.figure = p32figWireCircles(); return qq3204;
  },
  function(){
    var qq3204 = mcq("The current in a straight wire is reversed. What happens to the magnetic field around the wire?",
      "Every field line keeps its circular shape but points the opposite way around the wire",
      ["The field disappears until the current is restored",
       "The field lines become straight and point along the wire",
       "Nothing changes, because field direction does not depend on current direction"],
      "The right-hand rule ties field direction to current direction: reverse the thumb and the fingers curl the other way. The circles stay circles, centred on the wire, but their direction reverses everywhere. The field reverses direction when the current reverses.", {}); qq3204.figure = p32figWireCircles(); return qq3204;
  },
  function(){
    var qq3204 = mcq("To find the field direction around a straight wire using the right hand, you",
      "Point the thumb along the conventional current and let the fingers curl in the field's direction",
      ["Point the fingers along the current and the thumb gives the field direction",
       "Point the thumb opposite to the current and the fingers give the field direction",
       "Hold the hand flat with the palm facing the wire, and the palm gives the direction"],
      "For a straight wire it is the grasp rule: thumb in the direction of conventional current (flow of positive charge), and the curling fingers show the way the field circles the wire. This is the correct use of the right hand for a wire.", {}); qq3204.figure = p32figWireCircles(); return qq3204;
  }
]));

E("u3-76-compass-wire", 3, ["PH12.7.6"], 2, "var", varset([
  function(){
    var qq3204 = mcq("A compass sits beside a straight vertical wire. With no current in the wire, the compass points north, along Earth's field. The current is switched on, flowing upward, and the compass needle swings away from north. The needle swings because",
      "The wire's circular field at the compass is strong enough to pull the needle partly toward the field's local direction",
      ["The current heats the compass and weakens its magnet",
       "Earth's field is switched off by the current in the wire",
       "The electric field of the wire pushes the needle directly"],
      "The needle aligns with the net field at its location. With the current on, the wire's circular field adds to Earth's field, and the needle settles along the combination, deflected from north. Nothing switches Earth's field off, and it is the magnetic field of the wire that acts on the needle.", {}); qq3204.figure = p32figCompassWire(false); return qq3204;
  },
  function(){
    var qq3204 = mcq("In the same setup, the current in the wire is reversed. The compass needle, which had deflected one way, now",
      "Deflects to the opposite side of north, because the wire's field has reversed",
      ["Returns exactly to north and stays there",
       "Deflects farther in the same direction",
       "Spins continuously while the current flows"],
      "Reversing the current reverses the wire's circular field. The wire's contribution at the compass now pulls the needle the other way, so the deflection flips to the opposite side of north. The needle deflects to the opposite side when the current reverses.", {}); qq3204.figure = p32figCompassWire(false); return qq3204;
  },
  function(){
    var qq3204 = mcq("A compass near a current-carrying wire deflects 30 degrees from north. The current is then doubled. The deflection",
      "Increases, because the wire's field is stronger and pulls the needle farther from Earth's field direction",
      ["Stays exactly 30 degrees, because compasses measure direction only",
       "Decreases, because a stronger field aligns needles with north",
       "Becomes 60 degrees exactly, because deflection is proportional to current"],
      "Doubling the current doubles the wire's field, so the wire's sideways pull on the needle grows relative to Earth's field and the needle settles farther from north. The exact new angle is not simply double, because the needle balances two fields at right angles to each other, but it definitely increases.", {}); qq3204.figure = p32figCompassWire(false); return qq3204;
  },
  function(){
    var qq3204 = mcq("A wire runs horizontally above a compass, in the north-south direction, with current flowing north. The compass needle deflects. When the same current flows through the wire running east-west instead, directly above the compass, the needle",
      "Deflects much less, because the wire's field at the compass is then along the north-south line rather than across it",
      ["Deflects exactly the same amount, because the current is unchanged",
       "Deflects twice as far, because the wire is closer to the needle's poles",
       "Cannot deflect, because an east-west wire produces no field"],
      "Deflection comes from the part of the wire's field that points across Earth's field (east-west). With the wire running east-west, the circular field directly below the wire points north or south, along Earth's field, so it barely turns the needle. Geometry, not just current size, decides the deflection.", {}); qq3204.figure = p32figCompassWire(true); return qq3204;
  }
]));

E("u3-76-domains", 3, ["PH12.7.6"], 1, "var", varset([
  function(){
    return mcq("In domain theory, a magnetic domain is",
      "A small region of a material in which the atomic magnetic fields are aligned with each other",
      ["A region from which all atomic magnetic fields have been removed",
       "The space around a magnet where its field can be detected",
       "A single atom that acts as a tiny bar magnet"],
      "Ferromagnetic materials are divided into domains: tiny regions, each containing many atoms whose magnetic fields point the same way, so each domain acts like one small magnet. A domain is a region of aligned atomic magnetic fields, much bigger than one atom, and it is inside the material, not the space around a magnet.", {});
  },
  function(){
    return mcq("An unmagnetized iron nail can be picked up by a magnet but is not itself a magnet. Domain theory explains this because in the unmagnetized nail",
      "The domains point in random directions, so their fields cancel out",
      ["There are no domains until a magnet creates them",
       "All the domains point the same way but the nail is too small to notice",
       "The domains contain no magnetic fields at all"],
      "The nail's domains exist all along, each magnetized within itself. Unmagnetized simply means their directions are random, so the fields cancel and the nail shows no overall poles. Bringing a magnet near aligns many domains and the nail becomes temporarily magnetized. The domains point in random directions in an unmagnetized nail.", {});
  },
  function(){
    return mcq("Stroking an iron bar repeatedly in one direction with a magnet can magnetize the bar. In domain terms, the stroking",
      "Persuades more and more domains to align with the applied field, until most point the same way",
      ["Adds extra domains to the bar from the magnet",
       "Removes domains whose fields point the wrong way",
       "Melts the domains together into one large atom"],
      "An applied field grows the domains that are aligned with it and rotates others toward it. Repeated stroking in one direction aligns most domains the same way, and the bar keeps that alignment as its own magnetization. Domains are rearranged, not added, removed or melted.", {});
  },
  function(){
    return mcq("A magnetized steel bar is heated red hot and then dropped several times on a hard floor. Afterwards it is only weakly magnetic. Domain theory explains this because",
      "Heating and jarring give the domains enough energy to fall back into random directions",
      ["The heat burns the domains out of the steel",
       "Dropping the bar knocks the north pole off the end",
       "The steel's domains all align with Earth's field instead"],
      "Alignment is an ordered state. Heat shakes the atomic magnets violently and impacts jar the domains, so many slip back into random orientations and their fields cancel again. Nothing is burned away and no pole is knocked off: the domains simply randomize.", {});
  }
]));

E("u3-76-field-direction", 3, ["PH12.7.6"], 2, "var", varset([
  function(){
    return mcq("The direction of a magnetic field at a point is defined as",
      "The direction in which the north pole of a small compass needle points when placed at that point",
      ["The direction in which the south pole of a compass needle points",
       "The direction a free electron moves at that point",
       "The direction from the south pole to the north pole outside any magnet"],
      "Just as the electric field is defined using a positive test charge, the magnetic field's direction is defined by a north test pole, which is what a compass needle's north end is. The field direction at a point is where a compass north pole points.", {});
  },
  function(){
    return mcq("A compass needle points toward Earth's geographic north. This works because",
      "The magnetic pole near geographic north is a magnetic south pole, which attracts the needle's north pole",
      ["The magnetic pole near geographic north is a magnetic north pole, which attracts the needle's north pole",
       "Compass needles are attracted to the coldest point on Earth",
       "Earth's rotation drags compass needles toward the axis"],
      "Opposite poles attract. The needle's north pole is drawn toward the pole near geographic north, so that pole must be a magnetic south pole, whatever it is called geographically. Like poles would repel and point the needle south. The pole near geographic north is a magnetic south pole.", {});
  },
  function(){
    var qq3204 = mcq("A bar magnet is hung from a thread so it can swing freely, far from other magnets. It settles pointing roughly north-south because",
      "It aligns itself with Earth's magnetic field, like a large compass needle",
      ["Earth's gravity pulls the heavier north pole downward toward the north",
       "The thread twists until the magnet points north by itself",
       "The magnet is attracted to the iron in distant buildings"],
      "A freely suspended magnet experiences a turning effect from Earth's field until its own field aligns with it, exactly as a compass needle does. It comes to rest along the local field direction, north-south. Gravity acts at the centre of mass and does not aim the poles.", {}); qq3204.figure = p32figBarMagnet(false); return qq3204;
  },
  function(){
    var qq3204 = mcq("Iron filings are sprinkled on a card over a bar magnet and the card is tapped. The filings form curved lines that are densest at the poles. The pattern shows",
      "The shape of the field and where it is strongest, with each filing aligning along the field like a tiny compass",
      ["The exact paths that magnetic charges travel along the card",
       "That the field exists only exactly on those lines, with gaps between",
       "The temperature pattern of the magnet's surface"],
      "Each filing becomes a small induced magnet and rotates to lie along the local field, chaining into lines that trace the field's shape. The lines are a sampling of a field that exists everywhere in the region, not wires the field travels on, and crowding at the poles shows the field is strongest there.", {}); qq3204.figure = p32figBarMagnet(false); return qq3204;
  }
]));

/* ---------- PH12.7.7 Magnetic field from current ---------- */

E("u3-77-field-wire", 3, ["PH12.7.7"], 1, "gen", function(){
  var I = sfR(rf(2.0, 30.0), 3);
  var r = sfR(rf(0.010, 0.200), 3);
  var B = MU0 * I / (2 * Math.PI * r);
  var ans = sfR(B, 3);
  var qq3204 = numq("The magnetic field strength at a distance r from a long straight wire is B = \u03BC\u2080I/(2\u03C0r), where \u03BC\u2080 = 4\u03C0 \u00D7 10\u207B\u2077 T m/A. A wire carries a current of " + gF(I) + " A. Calculate the field strength at a point " + gF(r) + " m from the wire. Give your answer in T.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-12),
    "Substitute into B = \u03BC\u2080I/(2\u03C0r). The 4\u03C0 in \u03BC\u2080 cancels the 2\u03C0 partly, leaving 2 \u00D7 10\u207B\u2077 times I divided by r: B = 2 \u00D7 10\u207B\u2077 \u00D7 " + gF(I) + " \u00F7 " + gF(r) + ", evaluated with the power of ten handled in words. The field strength is B = " + F3(ans) + " T. Fields near household wires are tiny compared with Earth's field of about 5 \u00D7 10\u207B\u2075 T.",
    {I: I, r: r}); qq3204.figure = p32figWireCircles(); return qq3204;
});

E("u3-77-current-from-field", 3, ["PH12.7.7"], 2, "gen", function(){
  var ITrue = sfR(rf(5.0, 60.0), 3);
  var r = sfR(rf(0.020, 0.150), 3);
  var B = sfR(MU0 * ITrue / (2 * Math.PI * r), 3);
  var I = 2 * Math.PI * r * B / MU0;
  var ans = sfR(I, 3);
  var qq3204 = numq("A long straight power line produces a magnetic field of " + gF(B) + " T at a point " + gF(r) + " m from the wire. Using B = \u03BC\u2080I/(2\u03C0r) with \u03BC\u2080 = 4\u03C0 \u00D7 10\u207B\u2077 T m/A, calculate the current in the wire. Give your answer in A.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Rearrange the formula before substituting: I = 2\u03C0rB/\u03BC\u2080. Step 1: because \u03BC\u2080 = 4\u03C0 \u00D7 10\u207B\u2077, the ratio 2\u03C0/\u03BC\u2080 simplifies to 1/(2 \u00D7 10\u207B\u2077) = 5 \u00D7 10\u2076, so I = 5 \u00D7 10\u2076 \u00D7 r \u00D7 B with r and B in SI units. Step 2: substitute r = " + gF(r) + " m and B = " + gF(B) + " T, handling the power of ten in words: I = " + F3(ans) + " A. The current in the wire is " + F3(ans) + " A.",
    {B: B, r: r}); qq3204.figure = p32figWireCircles(); return qq3204;
});

E("u3-77-net-field-two-wires", 3, ["PH12.7.7"], 3, "gen", function(){
  var I1 = sfR(rf(4.0, 20.0), 3);
  var I2 = sfR(rf(4.0, 20.0), 3);
  var d = sfR(rf(0.040, 0.200), 3);
  var midway = Math.random() < 0.5;
  var B1, B2, net, geom;
  if (midway) {
    B1 = MU0 * I1 / (2 * Math.PI * (d / 2));
    B2 = MU0 * I2 / (2 * Math.PI * (d / 2));
    net = Math.abs(B1 - B2);
    geom = "midway between the wires";
  } else {
    var x = sfR(rf(0.020, 0.100), 3);
    B1 = MU0 * I1 / (2 * Math.PI * (d + x));
    B2 = MU0 * I2 / (2 * Math.PI * x);
    net = B1 + B2;
    geom = "outside the pair, " + gF(x) + " m beyond the second wire on the line joining the wires";
  }
  var ans = sfR(net, 3);
  var qq3204 = numq("Two long parallel wires are " + gF(d) + " m apart and carry currents of " + gF(I1) + " A and " + gF(I2) + " A in the same direction. Calculate the magnitude of the net magnetic field at a point " + geom + ". Give your answer in T.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-12),
    "Find each wire's field at the point with B = \u03BC\u2080I/(2\u03C0r), then combine directions. Wire 1 contributes " + iF(B1) + " T and wire 2 contributes " + iF(B2) + " T. " + (midway ? "Between the wires, the two circular fields point in opposite directions (the right-hand rule gives one pointing into the page and the other out of it), so the net field is the difference of the magnitudes." : "Outside the pair on this side, both circular fields point in the same direction, so the magnitudes add.") + " The net field magnitude is " + F3(ans) + " T.",
    {I1: I1, I2: I2, d: d, midway: midway}); qq3204.figure = p32figTwoWires(I1,I2,d,midway,typeof x==="undefined"?null:x); return qq3204;
});

E("u3-77-field-scaling", 3, ["PH12.7.7"], 2, "var", varset([
  function(){
    return mcq("At a point near a long straight wire the field is B. If the current is doubled and the distance is unchanged, the field becomes",
      "2B", ["B", "4B", "B/2"],
      "The field around a wire is proportional to the current: B = \u03BC\u2080I/(2\u03C0r). Doubling I doubles B, giving 2B.", {});
  },
  function(){
    return mcq("At a point near a long straight wire the field is B. If the distance from the wire is tripled and the current is unchanged, the field becomes",
      "B/3", ["B/9", "3B", "B"],
      "Unlike a point charge's field, the wire's field follows a simple inverse proportion, B varies as 1/r, not 1/r\u00B2. Tripling r gives B/3.", {});
  },
  function(){
    return mcq("At a point near a long straight wire the field is B. If the current is doubled and the distance is also doubled, the field becomes",
      "B", ["2B", "4B", "B/2"],
      "Doubling the current doubles the field, and doubling the distance halves it. The two changes cancel: the field stays B.", {});
  },
  function(){
    return mcq("At a point near a long straight wire the field is B. If the current is halved and the distance is halved, the field becomes",
      "B", ["B/4", "2B", "B/2"],
      "Halving the current halves the field; halving the distance doubles it. The changes cancel, and the field stays B.", {});
  }
]));

E("u3-77-solenoid-field", 3, ["PH12.7.7"], 2, "gen", function(){
  var N = ri(200, 1200);
  var L = sfR(rf(0.100, 0.600), 3);
  var I = sfR(rf(0.500, 5.00), 3);
  var n = N / L;
  var B = MU0 * n * I;
  var ans = sfR(B, 3);
  var qq3204 = numq("A solenoid has " + N + " turns wound over a length of " + gF(L) + " m and carries a current of " + gF(I) + " A. The field inside a solenoid is B = \u03BC\u2080nI, where n is the number of turns per metre and \u03BC\u2080 = 4\u03C0 \u00D7 10\u207B\u2077 T m/A. Calculate the field strength inside the solenoid. Give your answer in T.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-12),
    "Step 1: turns per metre n = N/L = " + N + " \u00F7 " + gF(L) + " m = " + iF(n) + " turns/m. Step 2: B = \u03BC\u2080nI: multiply \u03BC\u2080 = 4\u03C0 \u00D7 10\u207B\u2077 by n and by I = " + gF(I) + " A, tracking the power of ten in words. The field inside is B = " + F3(ans) + " T, directed along the solenoid's axis. The field strength inside the solenoid is " + F3(ans) + " T.",
    {N: N, L: L, I: I}); qq3204.figure = p32figSolenoid(N,L,I); return qq3204;
});

E("u3-77-solenoid-poles", 3, ["PH12.7.7"], 2, "gen", function(){
  var ccw = Math.random() < 0.5;
  var turns = ri(150, 900);
  var key = ccw ? "End A acts as a north pole" : "End A acts as a south pole";
  var other = ccw ? "End A acts as a south pole" : "End A acts as a north pole";
  var qq3204 = mcq("A solenoid of " + turns + " turns carries a steady current. Looking directly at end A of the solenoid, you see the current circulating " + (ccw ? "counterclockwise" : "clockwise") + " around that end. Which statement is correct?",
    key, [other, "Both ends act as north poles", "Neither end acts as a pole until a core is inserted"],
    "Use the right-hand rule for a coil: curl the fingers of the right hand in the direction the current circulates, and the thumb points toward the north end. Current circulating counterclockwise as seen from end A means the thumb points out of end A, toward you, so end A is the north end. (Clockwise as seen from an end makes that end a south pole.) " + key + ". An iron core strengthens a solenoid but is not needed for it to have poles.",
    {ccw: ccw, turns: turns}); qq3204.figure = p32figSolenoidEnd(ccw,turns); return qq3204;
});

E("u3-77-compass-solenoid", 3, ["PH12.7.7"], 1, "var", varset([
  function(){
    var qq3204 = mcq("A current flows through a solenoid, making its end A a north pole. A compass is placed just outside end A, on the axis. The compass needle's north pole points",
      "Away from end A, continuing the line of the field outside the solenoid",
      ["Toward end A, because opposite poles attract the needle",
       "Sideways, because the field outside a solenoid is circular",
       "Nowhere, because a solenoid's field exists only inside it"],
      "Outside a solenoid the field has the same pattern as a bar magnet's: lines leave the north pole. A compass north pole follows the field direction, so outside end A it points away from the solenoid. The field does not stop at the solenoid's surface; it loops around outside from north to south.", {}); qq3204.figure = p32figSolenoidCompass("outside"); return qq3204;
  },
  function(){
    var qq3204 = mcq("The current through a solenoid is switched off while a compass sits beside it, deflected by the solenoid's field. The compass needle",
      "Settles back to pointing along Earth's field, roughly north",
      ["Stays deflected, because the solenoid stays magnetized forever",
       "Points at the solenoid's south end, which keeps its pole",
       "Spins until the current is turned on again"],
      "An air-core solenoid is an electromagnet: no current, no field of its own. (A steel core can keep a little residual magnetism, but the strong field vanishes with the current.) The compass then answers only to Earth's field and settles back toward north.", {}); qq3204.figure = p32figSolenoidCompass("outside"); return qq3204;
  },
  function(){
    var qq3204 = mcq("A compass is placed inside a current-carrying solenoid, away from the ends. The needle",
      "Aligns with the solenoid's axis, pointing toward the north end of the solenoid",
      ["Points around a circle, following the windings",
       "Is unaffected, because the fields of the loops cancel inside",
       "Points toward whichever end is nearer, regardless of polarity"],
      "Inside a solenoid the fields of all the loops add along the axis, producing a strong, nearly uniform field parallel to the axis. A compass there aligns with the axis, its north pole toward the solenoid's north end, just as it would inside the field of a hollow bar magnet.", {}); qq3204.figure = p32figSolenoidCompass("inside"); return qq3204;
  },
  function(){
    var qq3204 = mcq("Two identical solenoids carry the same current. One has an iron core and one is hollow. A compass near the north end of each deflects far more for the iron-core solenoid because",
      "The iron's domains align with the coil's field and add their own field to it",
      ["Iron conducts the current better, so the coil carries more current",
       "The iron core blocks Earth's field so the compass sees only the coil",
       "Iron is naturally attracted to compass needles"],
      "The coil's field magnetizes the iron: its domains align and the core becomes a magnet in its own right, adding to the coil's field. The current is the same in both coils; it is the core's added magnetization that strengthens the total field.", {}); qq3204.figure = p32figSolenoidCompass("core"); return qq3204;
  }
]));

E("u3-77-hand-rule", 3, ["PH12.7.7"], 1, "var", varset([
  function(){
    var qq3204 = mcq("A vertical wire carries current straight upward. At a point due east of the wire, the magnetic field points",
      "North", ["South", "East", "Up"],
      "Use the grasp rule: right thumb up, along the current. On the east side of the wire the fingers, and so the field, point north (tangent to the circle around the wire). At a point east of the wire, the field points north.", {}); qq3204.figure = p32figHandRule(0); return qq3204;
  },
  function(){
    var qq3204 = mcq("A vertical wire carries current straight upward. At a point due west of the wire, the magnetic field points",
      "South", ["North", "West", "Down"],
      "With the thumb up along the current, the fingers circle the wire. On the west side they point opposite to their direction on the east side: south. At a point west of the wire, the field points south.", {}); qq3204.figure = p32figHandRule(1); return qq3204;
  },
  function(){
    var qq3204 = mcq("A vertical wire carries current straight downward. At a point due east of the wire, the magnetic field points",
      "South", ["North", "East", "Down"],
      "Reversing the current reverses the field everywhere. Thumb down: on the east side the fingers now point south, where they pointed north for an upward current. At a point east of the wire, the field points south.", {}); qq3204.figure = p32figHandRule(2); return qq3204;
  },
  function(){
    var qq3204 = mcq("A horizontal wire runs east-west above a table and carries current toward the east. At a point on the table directly below the wire, the magnetic field points",
      "North", ["South", "East", "Down"],
      "Point the right thumb east, along the current. Below the wire the curled fingers point north (on the underside of the circle around the wire). So directly below the wire, the field points north.", {}); qq3204.figure = p32figHandRule(3); return qq3204;
  }
]));

/* ---------- PH12.7.8 Forces on moving charges and currents ---------- */

E("u3-78-force-conductor", 3, ["PH12.7.8"], 2, "gen", function(){
  var B = sfR(rf(0.050, 0.600), 3);
  var I = sfR(rf(1.0, 15.0), 3);
  var l = sfR(rf(0.100, 1.20), 3);
  var F = B * I * l;
  var ans = sfR(F, 3);
  return numq("A straight wire of length " + gF(l) + " m carries a current of " + gF(I) + " A through a uniform magnetic field of " + gF(B) + " T. The wire is held perpendicular to the field. Calculate the force on the wire. Give your answer in N.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-12),
    "A current is moving charge, so the field exerts F = BIl when the wire is perpendicular to the field. F = " + gF(B) + " T \u00D7 " + gF(I) + " A \u00D7 " + gF(l) + " m = " + F3(ans) + " N. The direction follows the right-hand rule for the current direction, perpendicular to both the wire and the field. The force on the wire is " + F3(ans) + " N.",
    {B: B, I: I, l: l});
});

E("u3-78-force-charge", 3, ["PH12.7.8"], 2, "gen", function(){
  var qE = pick([1, 2, 3]);
  var q = qE * PHYS_E;
  var v = sfR(rf(1.0, 9.0) * 1e5, 3);
  var B = sfR(rf(0.100, 1.50), 3);
  var F = q * v * B;
  var ans = sfR(F, 3);
  return numq("An ion carrying a charge of " + qE + " \u00D7 1.60 \u00D7 10\u207B\u00B9\u2079 C moves at " + gF(v) + " m/s perpendicular to a uniform magnetic field of " + gF(B) + " T. Calculate the magnitude of the force on the ion. Give your answer in N.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-15),
    "Use F = qvB for motion perpendicular to the field. The charge is q = " + qE + " \u00D7 1.60 \u00D7 10\u207B\u00B9\u2079 C = " + F3(q) + " C. Multiply q by v = " + gF(v) + " m/s and by B = " + gF(B) + " T, combining powers of ten in words: F = " + F3(ans) + " N. Because the force is always perpendicular to the velocity, it changes the ion's direction, not its speed. The force magnitude is " + F3(ans) + " N.",
    {qE: qE, v: v, B: B});
});

E("u3-78-force-angle", 3, ["PH12.7.8"], 2, "gen", function(){
  var v = sfR(rf(1.0, 8.0) * 1e6, 3);
  var B = sfR(rf(0.200, 2.00), 3);
  var th = pick([30, 45, 60]);
  var F = PHYS_E * v * B * Math.sin(th * Math.PI / 180);
  var Fperp = PHYS_E * v * B;
  var ans = sfR(F, 3);
  return numq("An electron (charge 1.60 \u00D7 10\u207B\u00B9\u2079 C) moves at " + gF(v) + " m/s through a uniform magnetic field of " + gF(B) + " T. Its velocity makes an angle of " + th + "\u00B0 with the field. Calculate the magnitude of the force on the electron. Give your answer in N.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-15),
    "Only the component of velocity perpendicular to the field produces a force: F = qvB sin\u03B8. Step 1: the full perpendicular value would be qvB = " + iF(Fperp) + " N. Step 2: multiply by sin(" + th + "\u00B0) = " + fmt(Math.sin(th * Math.PI / 180), 3) + ": F = " + iF(Fperp) + " N \u00D7 " + fmt(Math.sin(th * Math.PI / 180), 3) + " = " + F3(ans) + " N. The component of motion along the field is unaffected, so the electron spirals. The force magnitude is " + F3(ans) + " N.",
    {v: v, B: B, th: th});
});

E("u3-78-force-direction", 3, ["PH12.7.8"], 2, "var", varset([
  function(){
    var qq3204 = mcq("A positively charged ion moves east through a magnetic field that points north. The force on the ion is directed",
      "Up, out of the horizontal plane", ["Down, into the horizontal plane", "East, along its motion", "North, along the field"],
      "Use the right hand for a positive charge: fingers along the velocity (east), curl them toward the field (north), and the thumb gives the force: up. The magnetic force is always perpendicular to both the velocity and the field, so it cannot point along either. The force is directed up.", {}); qq3204.figure = p32figForceDir(0); return qq3204;
  },
  function(){
    var qq3204 = mcq("An electron moves east through a magnetic field that points north. The force on the electron is directed",
      "Down, into the horizontal plane", ["Up, out of the horizontal plane", "East, along its motion", "West, opposite its motion"],
      "For a positive charge the same setup gives an upward force. An electron carries the opposite sign of charge, so its force is exactly reversed: down. Sign of charge flips the force direction, a point that matters in every deflection question. The force on the electron is directed down.", {}); qq3204.figure = p32figForceDir(1); return qq3204;
  },
  function(){
    var qq3204 = mcq("A proton moves north across a table while a magnetic field points vertically down through the table. The force on the proton is directed",
      "West", ["East", "North", "Up"],
      "Right hand: fingers north (velocity), curl down (field, the way the fingers bend through the table), thumb points west. Equivalently, velocity cross field for a positive charge gives west. The force on the proton is directed west, perpendicular to both its motion and the field.", {}); qq3204.figure = p32figForceDir(2); return qq3204;
  },
  function(){
    var qq3204 = mcq("A wire carries current toward the north through a magnetic field that points east. The force on the wire is directed",
      "Down, perpendicular to both the wire and the field", ["Up, perpendicular to both the wire and the field", "East, pushing the wire along the field", "North, pushing the wire along the current"],
      "A current is moving positive charge, so use the same right-hand rule: fingers north (current), curl toward east (field), thumb points down. The force is perpendicular to both the current and the field, never along either one. The force on the wire is directed down.", {}); qq3204.figure = p32figForceDir(3); return qq3204;
  }
]));

E("u3-78-circular-radius", 3, ["PH12.7.8"], 2, "gen", function(){
  var v = sfR(rf(1.0, 9.0) * 1e6, 3);
  var B = sfR(rf(0.100, 1.00), 3);
  var r = PHYS_MP * v / (PHYS_E * B);
  var ans = sfR(r, 3);
  var qq3204 = numq("A proton (mass 1.67 \u00D7 10\u207B\u00B2\u2077 kg, charge 1.60 \u00D7 10\u207B\u00B9\u2079 C) moves at " + gF(v) + " m/s perpendicular to a uniform magnetic field of " + gF(B) + " T, and follows a circular path. Calculate the radius of the path. Give your answer in m.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-12),
    "The magnetic force supplies the centripetal force: qvB = mv\u00B2/r, which gives r = mv/(qB). Substitute m = 1.67 \u00D7 10\u207B\u00B2\u2077 kg, v = " + gF(v) + " m/s, q = 1.60 \u00D7 10\u207B\u00B9\u2079 C and B = " + gF(B) + " T, combining the powers of ten in words. The radius is r = " + F3(ans) + " m. A faster proton or a weaker field makes a wider circle. The radius is " + F3(ans) + " m.",
    {v: v, B: B}); qq3204.figure = p32figChargeCircle(gF(v)+" m/s",gF(B)+" T","?","proton"); return qq3204;
});

E("u3-78-circular-speed", 3, ["PH12.7.8"], 3, "gen", function(){
  var B = sfR(rf(0.200, 1.50), 3);
  var r = sfR(rf(0.050, 0.600), 3);
  var v = PHYS_E * B * r / PHYS_MP;
  var ans = sfR(v, 3);
  var qq3204 = numq("A proton (mass 1.67 \u00D7 10\u207B\u00B2\u2077 kg, charge 1.60 \u00D7 10\u207B\u00B9\u2079 C) moves in a circle of radius " + gF(r) + " m in a uniform magnetic field of " + gF(B) + " T, entering the field perpendicular to it. Calculate the proton's speed. Give your answer in m/s.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Set the magnetic force equal to the centripetal force: qvB = mv\u00B2/r. Step 1: cancel one v and rearrange for the speed: v = qBr/m. Step 2: substitute q = 1.60 \u00D7 10\u207B\u00B9\u2079 C, B = " + gF(B) + " T, r = " + gF(r) + " m and m = 1.67 \u00D7 10\u207B\u00B2\u2077 kg, combining powers of ten in words. Step 3: v = " + F3(ans) + " m/s. The mass cancels nothing here: a heavier particle at the same radius and field would be moving faster. The proton's speed is " + F3(ans) + " m/s.",
    {B: B, r: r}); qq3204.figure = p32figChargeCircle("?",gF(B)+" T",gF(r)+" m","proton"); return qq3204;
});

E("u3-78-field-from-orbit", 3, ["PH12.7.8"], 2, "gen", function(){
  var v = sfR(rf(1.0, 6.0) * 1e5, 3);
  var r = sfR(rf(0.100, 0.900), 3);
  var mA = 6.64e-27, qA = 3.20e-19;
  var B = mA * v / (qA * r);
  var ans = sfR(B, 3);
  var qq3204 = numq("An alpha particle (mass 6.64 \u00D7 10\u207B\u00B2\u2077 kg, charge 3.20 \u00D7 10\u207B\u00B9\u2079 C) moves at " + gF(v) + " m/s perpendicular to a magnetic field and follows a circle of radius " + gF(r) + " m. Calculate the strength of the field. Give your answer in T.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-12),
    "From qvB = mv\u00B2/r, solve for the field: B = mv/(qr). Step 1: multiply mass by speed: mv is computed from m = 6.64 \u00D7 10\u207B\u00B2\u2077 kg and v = " + gF(v) + " m/s. Step 2: multiply charge by radius: qr from q = 3.20 \u00D7 10\u207B\u00B9\u2079 C and r = " + gF(r) + " m. Step 3: divide, combining powers of ten in words: B = " + F3(ans) + " T. The field strength is " + F3(ans) + " T.",
    {v: v, r: r}); qq3204.figure = p32figChargeCircle(gF(v)+" m/s","?",gF(r)+" m","alpha particle"); return qq3204;
});

E("u3-78-particle-id", 3, ["PH12.7.8"], 3, "gen", function(){
  var rp = sfR(rf(0.100, 0.800), 3);
  var key = F3(2 * rp) + " m";
  return mcq("A proton enters a uniform magnetic field at a certain speed, perpendicular to the field, and follows a circular path of radius " + gF(rp) + " m. An alpha particle (4 times the proton's mass, 2 times its charge) enters the same field at the same speed. What is the radius of the alpha particle's path?",
    key, [F3(rp) + " m", F3(4 * rp) + " m", F3(rp / 2) + " m"],
    "The radius is r = mv/(qB). At the same speed in the same field, the radius scales with the ratio m/q. The alpha particle has m/q = 4/2 = 2 times the proton's ratio, so its radius doubles: 2 \u00D7 " + gF(rp) + " m = " + F3(2 * rp) + " m. Using the mass ratio alone (4) forgets that the alpha's larger charge also feels a larger force. The alpha particle's radius is " + key + ".",
    {rp: rp});
});

E("u3-78-parallel-wires", 3, ["PH12.7.8"], 2, "gen", function(){
  var same = Math.random() < 0.5;
  var i1 = ri(5, 40), i2 = ri(5, 40);
  var key = same ? "The wires attract each other" : "The wires repel each other";
  var other = same ? "The wires repel each other" : "The wires attract each other";
  var qq3204 = mcq("Two long parallel wires carry currents of " + i1 + " A and " + i2 + " A in " + (same ? "the same direction" : "opposite directions") + ". Each wire sits in the magnetic field of the other. What do the wires do?",
    key, [other, "Nothing, because parallel wires produce no field", "The wires twist around each other like a solenoid"],
    "Each wire's field circles it, and at the neighbouring wire that field points across the current there, so each wire feels a force. Working through the right-hand rule: currents in the same direction pull the wires together, and currents in opposite directions push them apart. Here the currents are " + (same ? "in the same direction, so the wires attract." : "in opposite directions, so the wires repel.") + " " + key + ".",
    {same: same, i1: i1, i2: i2}); qq3204.figure = p32figParallelWires(i1,i2,same); return qq3204;
});

/* ---------- PH12.7.9 Electromagnetic induction ---------- */

E("u3-79-lenz-direction", 3, ["PH12.7.9"], 2, "var", varset([
  function(){
    return mcq("The north pole of a bar magnet is pushed toward a flat loop of wire. Looking at the loop from the magnet's side, the induced current flows",
      "Counterclockwise, so the loop's near face acts as a north pole and opposes the approaching magnet",
      ["Clockwise, so the loop's near face acts as a north pole and welcomes the magnet in",
       "Counterclockwise, so the loop's near face acts as a south pole and pulls the magnet in",
       "Clockwise, and then stops because a loop cannot sustain a current"],
      "Lenz's law: the induced current opposes the change causing it. The approaching north pole increases the field through the loop toward the magnet, so the loop makes its own field pointing back, presenting a north face to repel the magnet. A field pointing out of a face toward the viewer corresponds to a counterclockwise current as seen by that viewer. The current flows counterclockwise.", {});
  },
  function(){
    return mcq("The north pole of a bar magnet, which was inside a coil, is pulled away from the coil. The end of the coil nearest the magnet behaves as",
      "A south pole, attracting the retreating magnet and opposing its removal",
      ["A north pole, repelling the retreating magnet away faster",
       "Neither pole, because induction needs a battery in the coil",
       "A north pole that flips to south halfway through the motion"],
      "Induction opposes the change. As the north pole leaves, the flux through the coil drops, so the induced current makes the near end a south pole, holding the magnet back. No battery is involved; the changing field through the coil drives the current. The near end behaves as a south pole while the magnet retreats.", {});
  },
  function(){
    return mcq("A magnetic field pointing into a page passes through a loop of wire lying on the page, and the field is steadily strengthening. The induced current in the loop flows",
      "Counterclockwise, creating a field out of the page to oppose the increase",
      ["Clockwise, creating a field into the page to help the increase",
       "Counterclockwise, creating a field into the page",
       "In whichever direction the loop was last carrying current"],
      "The change to oppose is the growth of the into-the-page flux. The loop counters with its own field pointing out of the page, which by the right-hand rule means a counterclockwise current as seen by someone looking at the page. Induced currents always fight the change, never help it. The induced current flows counterclockwise.", {});
  },
  function(){
    return mcq("A bar magnet is held perfectly still inside a coil connected to a sensitive meter. The meter reads zero, even though the coil sits in a strong magnetic field. This is because induction requires",
      "A changing magnetic flux through the coil, and a steady field gives no change to oppose",
      ["The magnet to be an electromagnet rather than a permanent magnet",
       "The coil to be rotating rather than the magnet moving",
       "The field inside the coil to be zero before induction can start"],
      "Faraday's law responds to change in flux, not to flux itself. A stationary magnet produces a strong but constant flux, so there is no induced emf and the meter reads zero. Move the magnet or the coil and the meter deflects at once. Induction requires changing flux.", {});
  }
]));

E("u3-79-coil-polarity", 3, ["PH12.7.9"], 2, "var", varset([
  function(){
    return mcq("The south pole of a bar magnet is pushed toward end A of a coil. To oppose the magnet's approach, end A becomes",
      "A south pole, repelling the incoming south pole",
      ["A north pole, attracting the incoming south pole",
       "Neutral, because only north poles induce effects",
       "A north pole that attracts, then repels once the magnet stops"],
      "Lenz's law is a repulsion of change: an approaching pole meets the same kind of pole. An incoming south pole induces a south pole at end A so the coil pushes back. The coil does not attract the magnet in; induction never assists the change that causes it. End A becomes a south pole.", {});
  },
  function(){
    return mcq("A magnet is pushed into a coil and held still inside it. While it is moving in, a current flows in the coil. Once it stops moving, the current",
      "Falls to zero, because the flux through the coil is no longer changing",
      ["Continues at the same strength, powered by the magnet's field",
       "Reverses and flows back out of the coil",
       "Doubles, because the magnet is now fully inside"],
      "Induced emf depends on the rate of change of flux. Moving in, the flux grows and current flows. Held still, the flux is large but constant, the rate of change is zero, and so are the emf and current. Magnets do not power steady currents for free. The current falls to zero when the motion stops.", {});
  },
  function(){
    return mcq("The current through an electromagnet is reversed. The magnet's poles",
      "Swap: the end that was north becomes south, and the field everywhere reverses",
      ["Stay the same, because poles depend on the coil's shape, not the current",
       "Both become north poles until the current is reversed again",
       "Vanish, because reversing current destroys the domains in the core"],
      "An electromagnet's polarity follows its current by the right-hand rule. Reverse the current and every part of the field reverses, so the poles swap ends. The core's domains simply realign the other way; they are not destroyed. The poles swap when the current reverses.", {});
  },
  function(){
    return mcq("A coil is connected to a meter. A bar magnet is dropped through the coil from above, north pole first. The meter needle",
      "Kicks one way as the magnet approaches and enters, then kicks the opposite way as the magnet leaves",
      ["Kicks once and stays deflected while the magnet falls through",
       "Does not move, because the magnet's speed is constant in free fall",
       "Kicks only when the magnet is exactly at the coil's centre"],
      "Entering, the flux through the coil grows in one sense, inducing current one way. Leaving, the flux shrinks, which is the opposite change, so the induced current reverses. The needle kicks one way, then the other. The magnet's changing speed does not matter; the reversal of the flux change at entry and exit does.", {});
  }
]));

E("u3-79-eddy-braking", 3, ["PH12.7.9"], 2, "var", varset([
  function(){
    return mcq("A strong magnet dropped down a long vertical copper pipe falls noticeably slowly, even though copper is not attracted to magnets. The slow fall is because",
      "The changing flux induces eddy currents in the pipe, and their fields oppose the magnet's fall, as Lenz's law requires",
      ["Copper becomes magnetic when a magnet is inside it and grips the magnet",
       "Air trapped in the pipe cushions the magnet like a piston",
       "The magnet's field lines get tangled in the copper and anchor it"],
      "As the magnet falls, the flux through each ring of the pipe changes, driving circular eddy currents. By Lenz's law their fields oppose the change, pushing up on the magnet against gravity. The magnet reaches a slow terminal speed where the upward push balances its weight. Copper stays non-magnetic; the effect is induction, not attraction.", {});
  },
  function(){
    return mcq("Some exercise bikes and train brakes use a metal disc spinning between the poles of a magnet. The braking works because",
      "Eddy currents induced in the disc create fields that oppose the disc's motion, converting kinetic energy to heat in the disc",
      ["The magnet attracts the metal disc and friction between them slows it",
       "The disc becomes a permanent magnet and locks to the brake magnet",
       "The magnet's field increases the disc's inertia"],
      "Parts of the disc continually move into and out of the field, so flux through them changes and eddy currents circulate. Their fields oppose the motion that creates them, dragging the disc. The kinetic energy ends up as heat in the disc, which is why such brakes can glow on long descents. The braking comes from eddy currents opposing the motion.", {});
  },
  function(){
    return mcq("Transformer cores are built from thin laminated sheets rather than one solid block of iron. The laminations",
      "Break up eddy currents, reducing wasted energy and heating in the core",
      ["Make the core lighter so it is easier to mount",
       "Increase the eddy currents so the transformer runs warmer",
       "Stop the core from becoming magnetized at all"],
      "The alternating flux would drive large eddy currents in a solid core, wasting energy as heat. Thin insulated laminations confine eddy currents to tiny loops, cutting the loss. The core still magnetizes fully along the laminations. Laminations reduce eddy current losses.", {});
  },
  function(){
    return mcq("A flat aluminium plate is swung like a pendulum between the poles of a strong magnet. It stops swinging much faster than it would in air alone. Aluminium is not magnetic, so the damping is caused by",
      "Eddy currents induced in the plate as it cuts through the field, whose effects oppose the swinging",
      ["The magnet attracting the plate a little on each swing until it rests",
       "The plate becoming permanently magnetized and sticking to a pole",
       "Static charge building up on the plate and discharging"],
      "Moving through the field changes the flux through parts of the plate, inducing eddy currents. By Lenz's law the resulting forces oppose the motion that made them, on both directions of swing, so the oscillation dies quickly and the plate warms slightly. No magnetism of aluminium is required. Eddy currents damp the swinging.", {});
  }
]));

E("u3-79-motional-emf", 3, ["PH12.7.9"], 2, "gen", function(){
  var B = sfR(rf(0.100, 0.900), 3);
  var l = sfR(rf(0.100, 0.800), 3);
  var v = sfR(rf(0.500, 6.00), 3);
  var emf = B * l * v;
  var ans = sfR(emf, 3);
  var qq3204 = numq("A metal rod of length " + gF(l) + " m slides at " + gF(v) + " m/s along rails through a uniform magnetic field of " + gF(B) + " T directed perpendicular to the plane of the rails. Calculate the emf induced in the rod. Give your answer in V.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-12),
    "A moving conductor in a field generates a motional emf: emf = Blv. So emf = " + gF(B) + " T \u00D7 " + gF(l) + " m \u00D7 " + gF(v) + " m/s = " + F3(ans) + " V. The charges in the rod are driven to its ends by the magnetic force until the resulting voltage balances it. The induced emf is " + F3(ans) + " V.",
    {B: B, l: l, v: v}); qq3204.figure = p32figMotional(B,l,v); return qq3204;
});

E("u3-79-transformer", 3, ["PH12.7.9"], 2, "gen", function(){
  var stepDown = Math.random() < 0.5;
  var Vp = pick([120, 240]);
  var ratio = pick([2, 4, 5, 10, 20]);
  var Np = ratio * ri(40, 200);
  var Ns = Np / ratio;
  var Vs = Vp / ratio;
  if (!stepDown) { var t = Vs; Vs = Vp; Vp = t; var t2 = Ns; Ns = Np; Np = t2; }
  var ans = sfR(Vs, 3);
  var qq3204 = numq("A transformer has " + Np + " turns on its primary coil and " + Ns + " turns on its secondary coil. The primary is connected to a " + Vp + " V alternating supply. Calculate the voltage across the secondary coil. Give your answer in V.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "The transformer ratio links voltages to turns: Vs/Vp = Ns/Np. Step 1: the turns ratio is Ns/Np = " + Ns + " \u00F7 " + Np + " = " + fmt(Ns / Np, 3) + ". Step 2: Vs = Vp \u00D7 (Ns/Np) = " + Vp + " V \u00D7 " + fmt(Ns / Np, 3) + " = " + F3(ans) + " V. Fewer secondary turns than primary turns means a step-down transformer; more means step-up. The secondary voltage is " + F3(ans) + " V.",
    {Np: Np, Ns: Ns, Vp: Vp}); qq3204.figure = p32figTransformer(Np,Ns,Vp); return qq3204;
});

E("u3-79-transmission", 3, ["PH12.7.9"], 3, "gen", function(){
  var Pmw = ri(15, 120);
  var VkV = ri(8, 30);
  var Ilo = Pmw * 1e6 / (VkV * 1e3);
  var key = "The current falls from " + F3(Ilo) + " A to " + F3(Ilo / 10) + " A, so the heating losses in the line fall to 1/100 of their former value";
  return mcq("A power station delivers " + Pmw + " MW to a town. The transmission voltage is stepped up from " + VkV + " kV to " + (VkV * 10) + " kV before the long line to the town, with the same power delivered. What happens to the line current and the heating losses in the line?",
    key, ["The current falls from " + F3(Ilo) + " A to " + F3(Ilo / 10) + " A, so the heating losses fall to 1/10 of their former value",
      "The current stays " + F3(Ilo) + " A, because the same power is delivered either way",
      "The current rises to " + F3(Ilo * 10) + " A, so the losses rise and stepping up is pointless"],
    "Power is P = VI, so at fixed power the current is inversely proportional to the voltage. At " + VkV + " kV the current is " + Pmw + " MW \u00F7 " + VkV + " kV = " + F3(Ilo) + " A; at ten times the voltage it is one tenth as much, " + F3(Ilo / 10) + " A. Heating loss is I\u00B2R, so it scales with the square of the current: one tenth the current means 1/100 the loss. That squared saving is the whole reason power grids step voltage up for long distances. " + key + ".",
    {Pmw: Pmw, VkV: VkV});
});

/* ---------- PH12.7.10 Motor versus generator ---------- */

E("u3-710-device-job", 3, ["PH12.7.10"], 2, "var", varset([
  function(){
    return mcq("A wind turbine on a coastal headland spins in the wind and supplies electricity to nearby homes. The machine in the turbine nacelle that produces the electricity is",
      "A generator, because it converts the kinetic energy of the spinning shaft into electrical energy",
      ["A motor, because it contains a spinning coil and magnets",
       "A transformer, because it changes mechanical energy into electricity",
       "A solenoid, because it is a coil of wire with a core"],
      "The job decides the name. This machine takes mechanical rotation in and puts electrical energy out: that is a generator. Motors and generators share parts (coils, magnets, a spinning shaft); the direction of energy conversion tells them apart. The turbine uses a generator.", {});
  },
  function(){
    return mcq("An electric winch on a fishing boat is plugged into the boat's battery and hauls a heavy trap up from the water. The winch's working machine is",
      "A motor, because it converts electrical energy from the battery into the mechanical work of lifting",
      ["A generator, because it has a rotating shaft and a coil",
       "A transformer, because it changes the battery's voltage",
       "A galvanometer, because it contains a coil in a magnetic field"],
      "Energy flows from electrical to mechanical here: the battery supplies current and the machine produces motion and lifting work. A machine that converts electrical energy into mechanical energy is a motor, whatever its shape. The winch uses a motor.", {});
  },
  function(){
    return mcq("A hand-cranked emergency radio works when the user turns a small handle: lights and sound come on with no battery. The handle drives",
      "A generator, because the turning coil in a magnetic field induces the current the radio runs on",
      ["A motor, because the coil rotates when the handle is turned",
       "A transformer, because the handle steps the voltage up",
       "A battery charger cell, because chemicals in the handle store the energy"],
      "The user's muscles supply mechanical energy and the device outputs electrical energy to run the radio. Mechanical in, electrical out is a generator. Rotation alone does not make it a motor; in a motor the rotation is the output, powered by a current. The crank drives a generator.", {});
  },
  function(){
    return mcq("A workshop fan starts spinning when it is switched on at the wall outlet. Inside the fan, the part that turns electrical supply into the spinning of the blades is",
      "A motor, because current in its coil experiences forces in a magnetic field and produces rotation",
      ["A generator, because anything with a spinning coil generates",
       "A transformer, because it changes the speed of the electricity",
       "An electromagnet only, because no motion is involved in its job"],
      "The fan receives electrical energy and outputs mechanical rotation: a motor. Its coil carries current in a magnetic field, and the forces on the coil (F = BIl on each side) turn the shaft. A generator is the same hardware run in reverse, but here the energy clearly flows electrical to mechanical. The fan uses a motor.", {});
  }
]));

E("u3-710-energy-conversion", 3, ["PH12.7.10"], 2, "var", varset([
  function(){
    return mcq("Which pairing of device and energy conversion is correct?",
      "Motor: electrical energy to kinetic energy. Generator: kinetic energy to electrical energy",
      ["Motor: kinetic energy to electrical energy. Generator: electrical energy to kinetic energy",
       "Motor: electrical energy to heat only. Generator: heat to electrical energy",
       "Motor and generator both convert electrical energy to kinetic energy"],
      "The two machines are the same hardware run in opposite directions. Feed a motor current and it rotates: electrical to kinetic. Spin a generator's shaft and it produces current: kinetic to electrical. Getting the direction right is the whole distinction. A motor converts electrical energy to kinetic energy, and a generator does the reverse.", {});
  },
  function(){
    return mcq("A hybrid car braking for a stop light uses its wheel machine as a generator, but pulling away from the light it uses the same machine as a motor. What changes between the two uses?",
      "The direction of energy flow: as a generator it turns the car's motion into electricity for the battery; as a motor it turns battery electricity into motion",
      ["The machine is physically swapped for a different one at each stop",
       "Nothing changes: motor and generator are just two names for the same operation",
       "As a generator it runs on gasoline, and as a motor it runs on electricity"],
      "Motor and generator are two modes of one electromagnetic machine. Braking, the wheels drive the shaft and the machine charges the battery (kinetic to electrical). Accelerating, the battery drives the machine and it pushes the wheels (electrical to kinetic). Only the energy flow reverses. The direction of energy flow changes.", {});
  },
  function(){
    return mcq("Which of these devices does NOT work by converting between electrical and mechanical energy?",
      "A transformer, which changes alternating voltage using two coils on a shared core, with no moving parts",
      ["An electric drill, which turns electrical energy into rotation",
       "A hydroelectric turbine unit, which turns falling water's energy into electricity",
       "A ceiling fan, which turns electrical energy into moving air"],
      "Drills and fans are motors; a hydroelectric unit is a generator. A transformer does something different: it trades voltage for current between two stationary coils by induction, electrical energy in and electrical energy out, nothing mechanical. The transformer does not convert between electrical and mechanical energy.", {});
  },
  function(){
    return mcq("In a simple DC motor, the coil keeps rotating in the same direction instead of rocking back and forth. This is because the split-ring commutator",
      "Reverses the current in the coil every half turn, so the forces on the coil keep pushing it the same way around",
      ["Disconnects the coil at the vertical position so friction stops it there",
       "Doubles the current every half turn to overpower the reverse force",
       "Turns the permanent magnet around with the coil"],
      "Without a commutator, the force on the coil would reverse each half turn and the coil would just oscillate. The split ring swaps the connections every half turn, reversing the coil's current at exactly the right moment so the torque keeps its direction. The commutator reverses the current every half turn.", {});
  }
]));

E("u3-710-armature", 3, ["PH12.7.10"], 2, "var", varset([
  function(){
    return mcq("In a simple DC motor the coil reaches the vertical position, where the forces on its sides momentarily vanish. The coil does not stall there because",
      "Its momentum carries it past the vertical, and the commutator then reverses the current so the forces push it onward the same way",
      ["The brushes push the coil around mechanically at that point",
       "Gravity pulls the heavier side of the coil down through the vertical",
       "The magnetic field switches direction at the vertical position"],
      "At the vertical the torque passes through zero, but a spinning coil has momentum, and it coasts through. Just past vertical the split-ring commutator has swapped the current, so the returning torque acts in the original direction of rotation. Momentum plus the commutator keeps the motor turning. The coil's momentum carries it past the vertical.", {});
  },
  function(){
    return mcq("A student builds a simple motor with a plain split ring missing: the coil is connected to the battery by fixed wires instead. When switched on and given a flick, the coil most likely",
      "Rocks back and forth and settles, because the force on the coil reverses every half turn with nothing to reverse the current",
      ["Spins steadily, because the commutator is only a safety device",
       "Spins faster and faster without limit",
       "Never moves at all, because motors cannot start from a flick"],
      "The commutator is essential, not decorative. With a fixed connection the current keeps its direction in space while the coil turns, so the torque flips sign each half turn and the coil oscillates to a stop. Reversing the current each half turn, the commutator's job, is what makes rotation continuous. The coil rocks and settles without a commutator.", {});
  },
  function(){
    return mcq("The brushes in a DC motor are the stationary contacts that press on the spinning commutator. Their job is to",
      "Carry current between the external circuit and the rotating coil while allowing the connection to swap each half turn",
      ["Brush dust off the commutator so it stays clean",
       "Act as the motor's bearings and hold the axle in place",
       "Generate the magnetic field the coil turns in"],
      "Brushes solve a connection problem: the coil spins but the battery does not. Spring-loaded carbon brushes slide on the split ring, feeding current into whichever segment is in contact, which is also how the swap happens each half turn. The field comes from the magnets or field coils, not the brushes. Brushes carry current to the rotating coil.", {});
  },
  function(){
    return mcq("A simple generator is built from the same parts as a DC motor, but its shaft is turned by a falling mass instead of the coil being driven by a battery. The output at the brushes is",
      "A direct current that pulses but keeps the same direction, because the split ring swaps the coil's ends every half turn",
      ["A smooth alternating current, because all rotating coils produce AC",
       "No output at all, because a motor cannot work backwards",
       "A steady battery-like voltage with no pulses"],
      "Motors and generators are reversible: turn the shaft and the coil cuts flux, inducing an emf. The split-ring commutator swaps connections each half turn, which rectifies the induced emf to one direction, though it still pulses as the coil rotates. Slip rings, not a split ring, would give AC. The output is pulsed direct current.", {});
  }
]));

E("u3-710-commutator", 3, ["PH12.7.10"], 2, "var", varset([
  function(){
    return mcq("An AC generator uses slip rings instead of a split-ring commutator. The reason is that slip rings",
      "Keep each end of the coil connected to the same brush all the time, so the output follows the coil's naturally alternating emf",
      ["Reverse the connections every half turn to force direct current",
       "Spin faster than a commutator and so produce more power",
       "Convert the alternating emf into direct current inside the rings"],
      "A rotating coil's emf alternates on its own. Slip rings preserve that: each coil end always meets the same brush, so the terminals see the alternating emf unchanged. A split ring would swap connections and rectify the output to DC. Slip rings keep the connection fixed, giving AC output.", {});
  },
  function(){
    return mcq("The split ring in a DC motor is split, with a gap between its two halves, so that",
      "At the gap the coil is momentarily disconnected and the connections swap sides, reversing the coil's current each half turn",
      ["The coil can spin without touching the brushes at all",
       "Extra current can leak out to cool the motor",
       "The two halves can carry different voltages to the battery"],
      "Each half of the ring is attached to one end of the coil. As the ring turns under the brushes, the halves trade brushes once per half turn, and the current through the coil reverses. The small gap is the instant of swap. The split exists to reverse the coil's current every half turn.", {});
  },
  function(){
    return mcq("A student wants a small windmill to charge a battery, which needs direct current. She has a coil-and-magnet unit with slip rings giving alternating output. What must change?",
      "Fit a split-ring commutator (or a rectifier), so the output is delivered in one direction for the battery",
      ["Spin the coil faster so the AC becomes DC at high speed",
       "Use a stronger magnet, because strong fields produce DC",
       "Connect the battery across the slip rings and let it average the AC itself"],
      "Batteries charge from current in one direction. The alternating output must be rectified: a split-ring commutator swaps the coil ends every half turn (or electronic rectifiers do the same job). Speed and magnet strength change the size and frequency of the AC, not its alternating character. The output must be rectified with a commutator or rectifier.", {});
  },
  function(){
    return mcq("In a DC generator, the split-ring commutator's role is the mirror of its role in a DC motor: it",
      "Swaps the coil's connections every half turn so the induced emf, which alternates inside the coil, appears at the terminals in one direction only",
      ["Creates the magnetic field that the coil rotates in",
       "Increases the induced emf by stepping it up like a transformer",
       "Prevents any current from being induced in the coil"],
      "Inside the coil the induced emf reverses every half turn as the coil's sides swap roles. The commutator swaps the external connections in step, so the terminals always see the same polarity: pulsed DC. In the motor the same swap keeps torque one-directional. The commutator makes the output one-directional.", {});
  }
]));

E("u3-710-lift-motor", 3, ["PH12.7.10"], 3, "gen", function(){
  var V = pick([24, 36, 48]);
  var m = sfR(rf(20, 120), 3);
  var v = sfR(rf(0.200, 0.900), 3);
  var Pmech = m * PHYS_G * v;
  var I = Pmech / V;
  var ans = sfR(I, 3);
  return numq("An electric hoist motor connected to a " + V + " V supply lifts a crate of mass " + gF(m) + " kg at a steady " + gF(v) + " m/s. Treat the motor as ideal, so all the electrical power becomes lifting power. Calculate the current the motor draws. Give your answer in A.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Equate the mechanical power needed to the electrical power supplied. Step 1: the lifting power is the rate of gain of potential energy: P = mgv = " + gF(m) + " kg \u00D7 9.8 m/s\u00B2 \u00D7 " + gF(v) + " m/s = " + iF(Pmech) + " W. Step 2: electrical power is P = VI, so I = P/V = " + iF(Pmech) + " W \u00F7 " + V + " V = " + F3(ans) + " A. A real motor would draw more, because some power is lost as heat. The current drawn is " + F3(ans) + " A.",
    {V: V, m: m, v: v});
});

/* ----- bank-u4.js ----- */
// Diagram figures (Phase C, Nov 2026): entries whose source question type
// carried a diagram now set qq3204.figure from the draw's own values via the
// p32fig* helpers in bank-helpers.js. Asked unknowns are labelled "?".
// Tranche 6 (Nov 2026): u4-82-threshold-frequency gains the photoelectric
// graph (p32figPhotoGraph). The Unit 4 energy level diagrams were already
// complete on the 8.5 entries; u4-85-absorption-cr keeps levels with no
// arrow, because the arrow would name the level the question asks for.
// Physics 3204 Unit 4 Introduction to Quantum Physics question bank
// CRMARKS: u4-82-photoelectric-cr=4
// CRMARKS: u4-82-threshold-cr=3
// CRMARKS: u4-85-transition-cr=5
// CRMARKS: u4-85-absorption-cr=2
// CRMARKS: u4-88-accelerating-cr=3
// CRMARKS: u4-83-compton-cr=3

/* ============ Units and significant figures discipline (Nov 2026) ============
   Givens are fixed at 3 significant figures and printed with gF(). Answers
   are computed from the printed givens and stored at 3 significant figures.
   Intermediates print at 4 significant figures with iF() and the next step
   is computed from the printed intermediate. Steps involving very small or
   very large values are described in words; only the final result prints,
   with F3(), in the house 10^n style. Exact counts (shell numbers, shell
   capacities) are exempt from the 3 sf rule. Bohr level energies for
   hydrogen use E_n = -13.6 eV / n^2, held at 3 sf in bohrE() below so that
   every printed line reproduces from printed values. */
function bohrE(n){return sfR(-13.6/(n*n),3);}
var PH4CTX=["in a hydrogen discharge tube in the school lab","in a low-pressure hydrogen lamp","in the atmosphere of a distant star","in a hydrogen spectrum tube","in hydrogen gas inside a nebula","in a hydrogen-filled display tube","in a university spectroscopy lab","in the outer layers of a hot star"];

/* ---------- PH12.8.1 Quantum energy ---------- */

E("u4-81-energy-from-frequency",4,["PH12.8.1"],2,"gen",function(){
  var f=sfR(rf(3.20,9.50),3)*1e14;
  var E=PHYS_H*f;
  var ans=sfR(E,3);
  return numq("A photon of light has a frequency of "+gF(f)+" Hz. Calculate the energy of the photon. Give your answer in joules (J).",
    ans,Math.max(0.02*Math.abs(ans),1e-21),
    "The energy of a photon is given by E = hf, where h is the Planck constant, 6.63 \u00D7 10\u207B\u00B3\u2074 J s. Multiplying h by the frequency gives the photon energy in joules. E = "+F3(E)+" J. Dividing by 1.60 \u00D7 10\u207B\u00B9\u2079 J per eV, this is "+F3(E/PHYS_E)+" eV.",
    {f:f});
});

E("u4-81-energy-from-wavelength",4,["PH12.8.1"],2,"gen",function(){
  var lam=sfR(rf(380,720),3);
  var E=PHYS_H*PHYS_C/(lam*1e-9);
  return mcq("A photon has a wavelength of "+gF(lam)+" nm. What is the energy of the photon?",
    F3(E)+" J",
    [F3(2*E)+" J",F3(E/2)+" J",F3(PHYS_H*(lam*1e-9))+" J"],
    "The energy of a photon is E = hc / \u03BB. Convert the wavelength to metres first, then divide hc by it. The energy is "+F3(E)+" J. Doubling or halving the wavelength would halve or double the energy, and multiplying h by \u03BB instead of dividing hc by \u03BB gives a far smaller value, so those options are wrong.",
    {lam:lam});
});

E("u4-81-wavelength-from-energy",4,["PH12.8.1"],2,"gen",function(){
  var eV=sfR(rf(1.80,4.20),3);
  var EJ=eV*PHYS_E;
  var lam=PHYS_H*PHYS_C/EJ/1e-9;
  var ans=sfR(lam,3);
  return numq("A photon has an energy of "+gF(eV)+" eV. Calculate its wavelength. Give your answer in nanometres (nm).",
    ans,Math.max(0.02*Math.abs(ans),0.01),
    "First convert the energy to joules: multiplying by 1.60 \u00D7 10\u207B\u00B9\u2079 J per eV gives "+F3(EJ)+" J. Then use \u03BB = hc / E, dividing hc by this energy to get the wavelength in metres, which converts to nanometres. \u03BB = "+F3(lam)+" nm.",
    {eV:eV});
});

E("u4-81-order-photons",4,["PH12.8.1"],1,"var",varset([
  function(){
    return mcq("Which colour of visible light is made of the most energetic photons?",
      "Violet",
      ["Red","Orange","Green"],
      "Photon energy increases with frequency. Violet light has the highest frequency of the visible colours, so violet photons carry the most energy.",{});
  },
  function(){
    return mcq("Which colour of visible light is made of the least energetic photons?",
      "Red",
      ["Blue","Green","Yellow"],
      "Photon energy increases with frequency and red light has the lowest frequency of the visible colours, so red photons carry the least energy.",{});
  },
  function(){
    return mcq("Four photons have wavelengths of 650 nm, 580 nm, 510 nm and 420 nm. Which photon has the greatest energy?",
      "420 nm",
      ["650 nm","580 nm","510 nm"],
      "Photon energy is inversely proportional to wavelength, E = hc / \u03BB. The shortest wavelength, 420 nm, belongs to the photon with the greatest energy.",{});
  },
  function(){
    return mcq("A photon of blue light and a photon of red light are compared. The blue photon has",
      "More energy and a higher frequency",
      ["More energy and a lower frequency","Less energy and a higher frequency","The same energy, because both are photons of light"],
      "Blue light has a higher frequency and a shorter wavelength than red light. Since E = hf, the blue photon carries more energy.",{});
  }
]));

E("u4-81-joules-to-ev",4,["PH12.8.1"],1,"gen",function(){
  var EJ=sfR(rf(2.40,9.60),3)*1e-19;
  var eV=EJ/PHYS_E;
  return mcq("The energy of a photon is "+gF(EJ)+" J. Given that 1 eV = 1.60 \u00D7 10\u207B\u00B9\u2079 J, what is this energy in electron volts?",
    F3(eV)+" eV",
    [F3(eV*10)+" eV",F3(eV/10)+" eV",F3(EJ*PHYS_E)+" eV"],
    "To convert joules to electron volts, divide by 1.60 \u00D7 10\u207B\u00B9\u2079 J per eV. The energy is "+F3(eV)+" eV. Multiplying instead of dividing would give a value near 10\u207B\u00B3\u2077 eV, which is not sensible for a single photon of light.",
    {EJ:EJ});
});

/* ---------- PH12.8.2 Photoelectric effect ---------- */

E("u4-82-work-function",4,["PH12.8.2"],2,"gen",function(){
  var lam0=sfR(rf(470,690),3);
  var phiJ=PHYS_H*PHYS_C/(lam0*1e-9);
  var phi=phiJ/PHYS_E;
  var ans=sfR(phi,3);
  var qq3204 = numq("The threshold wavelength of a metal surface is "+gF(lam0)+" nm. Calculate the work function of the metal. Give your answer in electron volts (eV).",
    ans,Math.max(0.02*Math.abs(ans),0.001),
    "The work function equals the energy of a photon at the threshold wavelength, \u03C6 = hc / \u03BB\u2080. Dividing hc by the threshold wavelength gives "+F3(phiJ)+" J, and dividing by 1.60 \u00D7 10\u207B\u00B9\u2079 J per eV converts this to electron volts. \u03C6 = "+F3(phi)+" eV.",
    {lam0:lam0}); qq3204.figure = p32figPhoto("threshold "+gF(lam0)+" nm","work function ?",false); return qq3204;
});

E("u4-82-max-ke",4,["PH12.8.2"],2,"gen",function(){
  var lam=sfR(rf(300,520),3);
  var E=PHYS_H*PHYS_C/(lam*1e-9)/PHYS_E;
  var Ep=sfR(E,3);
  var phi=sfR(E*rf(0.45,0.72),3);
  var ke=Ep-phi;
  var qq3204 = mcq("Light of wavelength "+gF(lam)+" nm shines on a metal whose work function is "+gF(phi)+" eV. What is the maximum kinetic energy of the emitted electrons?",
    F3(ke)+" eV",
    [F3(Ep+phi)+" eV",F3(Ep)+" eV",F3(Ep-phi/2)+" eV"],
    "The photon energy is E = hc / \u03BB, which is "+F3(Ep)+" eV once the joules are divided by 1.60 \u00D7 10\u207B\u00B9\u2079 J per eV. Each electron must spend the work function escaping, so the maximum kinetic energy is "+gF(Ep)+" - "+gF(phi)+" = "+F3(ke)+" eV.",
    {lam:lam,phi:phi}); qq3204.figure = p32figPhoto(gF(lam)+" nm","work function "+gF(phi)+" eV",true); return qq3204;
});

E("u4-82-stopping-potential",4,["PH12.8.2"],2,"gen",function(){
  var lam=sfR(rf(320,480),3);
  var E=PHYS_H*PHYS_C/(lam*1e-9)/PHYS_E;
  var Ep=sfR(E,3);
  var phi=sfR(E*rf(0.40,0.70),3);
  var ke=Ep-phi;
  var ans=sfR(ke,3);
  var qq3204 = numq("Light of wavelength "+gF(lam)+" nm shines on a metal whose work function is "+gF(phi)+" eV. What stopping potential is needed to halt the most energetic emitted electrons? Give your answer in volts (V).",
    ans,Math.max(0.02*Math.abs(ans),0.001),
    "The photon energy is E = hc / \u03BB = "+F3(Ep)+" eV. The maximum kinetic energy of the electrons is "+gF(Ep)+" - "+gF(phi)+" = "+F3(ke)+" eV. A stopping potential of V volts removes V eV of energy from each electron, so the stopping potential in volts has the same value as the maximum kinetic energy in electron volts. V = "+F3(ke)+" V.",
    {lam:lam,phi:phi}); qq3204.figure = p32figPhoto(gF(lam)+" nm","work function "+gF(phi)+" eV",true); return qq3204;
});

E("u4-82-threshold-frequency",4,["PH12.8.2"],2,"gen",function(){
  var phi=sfR(rf(1.90,4.60),3);
  var f0=phi*PHYS_E/PHYS_H;
  var ans=sfR(f0,3);
  var qq3204 = numq("A metal has a work function of "+gF(phi)+" eV. Calculate the threshold frequency of the metal. Give your answer in hertz (Hz).",
    ans,Math.max(0.02*Math.abs(ans),1e12),
    "At the threshold frequency the photon energy exactly equals the work function, so f\u2080 = \u03C6 / h. First convert the work function to joules by multiplying by 1.60 \u00D7 10\u207B\u00B9\u2079 J per eV, then divide by the Planck constant. f\u2080 = "+F3(f0)+" Hz. Light below this frequency cannot eject electrons from this metal, however bright it is.",
    {phi:phi}); qq3204.figure = p32figPhotoGraph(phi); return qq3204;
});

E("u4-82-intensity-frequency",4,["PH12.8.2"],2,"var",varset([
  function(){
    return mcq("Light above the threshold frequency shines on a metal. The light is made twice as intense while its frequency is unchanged. What happens?",
      "Twice as many electrons are emitted each second, but their maximum kinetic energy is unchanged",
      ["Twice as many electrons are emitted each second, and their maximum kinetic energy doubles",
       "The same number of electrons is emitted, each with twice the kinetic energy",
       "Emission stops, because the electrons cannot absorb energy that fast"],
      "Intensity counts how many photons arrive each second. Each photon still frees one electron with the same maximum kinetic energy, set by the frequency, so doubling the intensity doubles the emission rate but not the electron energies.",{});
  },
  function(){
    return mcq("Light above the threshold frequency shines on a metal. The light is replaced by light of a higher frequency, with the same number of photons arriving each second. What happens?",
      "The same number of electrons is emitted each second, but each electron can leave with more kinetic energy",
      ["More electrons are emitted each second, each with the same kinetic energy",
       "Fewer electrons are emitted, because higher frequency light is weaker",
       "Nothing changes, because only intensity affects the photoelectric effect"],
      "Each electron is freed by a single photon, and a higher frequency photon carries more energy, E = hf. With the same photon supply the emission rate is unchanged, but the extra photon energy beyond the work function appears as kinetic energy.",{});
  },
  function(){
    return mcq("Red light, which is below the threshold frequency of a metal, is shone on the metal and then made three times as intense. What happens?",
      "No electrons are emitted, no matter how intense the light becomes",
      ["Electrons are emitted once the light is intense enough",
       "Electrons are emitted, but only after the light has shone for a long time",
       "A few electrons are emitted with very small kinetic energies"],
      "Each red photon carries less energy than the work function, and one electron absorbs one photon. Adding more photons does not add up: no electron ever collects enough energy to escape.",{});
  },
  function(){
    return mcq("Very dim ultraviolet light, well above the threshold frequency, shines on a metal. The emitted electrons",
      "Appear immediately, few each second, but with the full maximum kinetic energy for that frequency",
      ["Appear only after enough light energy has built up on the surface",
       "Appear immediately, but with very small kinetic energies because the light is dim",
       "Do not appear, because the light is too dim to free any electrons"],
      "Dim light means few photons, so few electrons are freed each second. But each freeing is a one-photon event, and that photon carries the full energy hf, so the electrons that do escape have the full maximum kinetic energy and appear at once.",{});
  }
]));

E("u4-82-photoelectric-cr",4,["PH12.8.2"],2,"gen",function(){
  var lam=sfR(rf(350,500),3);
  var EJ=PHYS_H*PHYS_C/(lam*1e-9);
  var Ep=sfR(EJ/PHYS_E,3);
  var phi=sfR((EJ/PHYS_E)*rf(0.55,0.80),3);
  var ke=Ep-phi;
  var ans=sfR(ke,3);
  var qq3204 = numq("Ultraviolet light of wavelength "+gF(lam)+" nm falls on a metal surface whose work function is "+gF(phi)+" eV, and electrons are emitted. Calculate the stopping potential that would halt the most energetic of these electrons. Give your answer in volts (V).",
    ans,Math.max(0.02*Math.abs(ans),0.001),
    "Step 1: photon energy. E = hc / \u03BB gives "+F3(EJ)+" J. Step 2: convert to electron volts by dividing by 1.60 \u00D7 10\u207B\u00B9\u2079 J per eV: E = "+F3(Ep)+" eV. Step 3: the most energetic electron keeps whatever photon energy is left after paying the work function: "+gF(Ep)+" - "+gF(phi)+" = "+F3(ke)+" eV. Step 4: a stopping potential of V volts removes V eV from each electron, so the stopping potential is "+F3(ke)+" V.",
    {lam:lam,phi:phi}); qq3204.figure = p32figPhoto(gF(lam)+" nm","work function "+gF(phi)+" eV",true); return qq3204;
});

E("u4-82-threshold-cr",4,["PH12.8.2"],3,"gen",function(){
  var phi=sfR(rf(2.00,3.40),3);
  var lam0=PHYS_H*PHYS_C/(phi*PHYS_E)/1e-9;
  var lamA=sfR(lam0*rf(0.75,0.90),3);
  var lamB=sfR(lam0*rf(1.10,1.30),3);
  var ans=sfR(lam0,3);
  var qq3204 = numq("A metal has a work function of "+gF(phi)+" eV. A technician tests two lamps on it: lamp A, emitting light of wavelength "+gF(lamA)+" nm, and lamp B, emitting light of wavelength "+gF(lamB)+" nm. Only one of the lamps produces a photocurrent. Calculate the threshold wavelength of the metal. Give your answer in nanometres (nm).",
    ans,Math.max(0.02*Math.abs(ans),0.01),
    "At the threshold wavelength the photon energy exactly equals the work function, so \u03BB\u2080 = hc / \u03C6, with \u03C6 first converted to joules. This gives \u03BB\u2080 = "+F3(lam0)+" nm. Lamp A emits at "+gF(lamA)+" nm, which is shorter than the threshold wavelength, so its photons carry more than the work function and it produces the photocurrent. Lamp B emits at "+gF(lamB)+" nm, longer than the threshold wavelength, so its photons cannot free electrons at any intensity.",
    {phi:phi}); qq3204.figure = p32figPhoto("lamp A "+gF(lamA)+" nm, lamp B "+gF(lamB)+" nm","threshold wavelength ?",false); return qq3204;
});

/* ---------- PH12.8.3 Compton effect ---------- */

E("u4-83-what-it-showed",4,["PH12.8.3"],1,"var",varset([
  function(){
    return mcq("Compton directed X-rays at a carbon target and found that the scattered X-rays had a longer wavelength than the incoming X-rays. This result showed that",
      "Photons carry momentum and can transfer it to electrons in collisions",
      ["X-rays are slowed down by passing through carbon",
       "Electrons inside atoms are in constant rapid motion",
       "Wavelength has no connection to energy"],
      "The wavelength increase is exactly what a particle collision predicts: the photon gives some of its energy and momentum to an electron and leaves with less energy, which means a longer wavelength. Compton scattering showed that photons carry momentum.",{});
  },
  function(){
    return mcq("In Compton's experiment, a scattered X-ray photon is compared with the incoming photon. The scattered photon has",
      "Less energy and a longer wavelength",
      ["More energy and a longer wavelength","Less energy and a shorter wavelength","Exactly the same energy and wavelength"],
      "The photon hands part of its energy to the recoil electron. A less energetic photon has a lower frequency and a longer wavelength, since E = hc / \u03BB.",{});
  },
  function(){
    return mcq("Classical wave theory predicted that scattered X-rays should keep essentially the same wavelength. The observed increase in wavelength is explained if",
      "The X-ray photon collides with a single electron like a particle, giving up some of its energy and momentum",
      ["The target heats up and stretches the waves as they leave",
       "The X-rays travel more slowly inside the target and bunch up",
       "The electrons reflect the waves in all directions at random speeds"],
      "Treating the encounter as a collision between one photon and one electron, with energy and momentum conserved, predicts the wavelength shift that Compton measured. The wave picture, in which the electron should simply reradiate at the same wavelength, does not.",{});
  },
  function(){
    return mcq("In Compton scattering, the recoil electron gains kinetic energy. That energy comes from",
      "The photon, which loses an equal amount of energy",
      ["The electric field of the nucleus","The motion the electron already had","The target material heating up"],
      "Energy is conserved in the collision. Whatever kinetic energy the electron gains is energy the photon no longer has, which is why the scattered photon's wavelength increases.",{});
  }
]));

E("u4-83-photon-momentum",4,["PH12.8.3"],2,"gen",function(){
  var lam=sfR(rf(0.0200,0.120),3);
  var p=PHYS_H/(lam*1e-9);
  var ans=sfR(p,3);
  return numq("An X-ray photon has a wavelength of "+gF(lam)+" nm. Calculate the magnitude of its momentum. Give your answer in kg m/s.",
    ans,Math.max(0.02*Math.abs(ans),1e-26),
    "A photon's momentum is p = h / \u03BB. Converting the wavelength to metres and dividing the Planck constant by it gives the momentum. p = "+F3(p)+" kg m/s. It is tiny for one photon, but it is real, and it is what the recoil electron carries away in Compton scattering.",
    {lam:lam});
});

E("u4-83-scattered-wavelength",4,["PH12.8.3"],2,"gen",function(){
  var lam=sfR(rf(0.0400,0.120),3);
  var ang=pick([60,90,120,180]);
  var cosv={60:0.5,90:0,120:-0.5,180:-1}[ang];
  var dl=sfR(0.00243*(1-cosv),4);
  var lamp=lam+dl;
  var ans=sfR(lamp,3);
  var qq3204 = numq("An X-ray photon of wavelength "+gF(lam)+" nm strikes a nearly free electron and is scattered through an angle of "+ang+"\u00B0. For scattering through an angle \u03B8, the wavelength increase is (0.00243 nm)(1 - cos \u03B8). Calculate the wavelength of the scattered photon. Give your answer in nanometres (nm).",
    ans,Math.max(0.02*Math.abs(ans),0.00005),
    "First find the shift. cos "+ang+"\u00B0 = "+fmt(cosv,1)+", so 1 - cos \u03B8 = "+fmt(1-cosv,1)+". Multiplying by 0.00243 nm gives a wavelength increase of "+iF(dl)+" nm. Adding the increase to the incoming wavelength: "+gF(lam)+" + "+iF(dl)+" = "+iF(lamp)+" nm, which is "+F3(lamp)+" nm at three significant figures.",
    {lam:lam,ang:ang}); qq3204.figure = p32figCompton(gF(lam)+" nm",ang); return qq3204;
});

E("u4-83-shift-reasoning",4,["PH12.8.3"],2,"var",varset([
  function(){
    return mcq("When an X-ray photon scatters from a stationary electron, its wavelength increases. The reason is that",
      "The photon gives some of its energy to the electron, and a less energetic photon has a longer wavelength",
      ["The photon is stretched by travelling through the target material",
       "The electron adds energy to the photon as it recoils",
       "Scattering always bends light toward longer wavelengths, like a prism"],
      "The photon pays for the electron's recoil kinetic energy out of its own energy. Since E = hc / \u03BB, a smaller energy means a larger wavelength.",{});
  },
  function(){
    return mcq("After Compton scattering from an electron, the photon's frequency is",
      "Lower than the incident frequency, because the photon lost energy",
      ["Higher than the incident frequency, because the photon lost energy",
       "Unchanged, because frequency never changes in scattering",
       "Lower than the incident frequency, because the photon gained energy"],
      "The photon gives energy to the electron, and E = hf links energy directly to frequency. Less energy means a lower frequency (and a longer wavelength).",{});
  },
  function(){
    return mcq("After Compton scattering from an electron, the magnitude of the photon's momentum is",
      "Smaller than before, because its wavelength increased and momentum is inversely proportional to wavelength",
      ["Larger than before, because its wavelength increased",
       "Unchanged, because a photon's momentum never changes",
       "Zero, because the electron took all of it"],
      "Photon momentum is p = h / \u03BB. The wavelength grows in the collision, so the momentum shrinks. The missing momentum is carried away by the recoil electron.",{});
  },
  function(){
    return mcq("In Compton scattering, which statement about the collision is correct?",
      "The kinetic energy gained by the electron equals the energy lost by the photon",
      ["The electron gains energy without the photon losing any",
       "The photon gains energy and the electron slows down",
       "Total energy increases slightly because the collision is violent"],
      "The collision conserves energy: the photon's loss is the electron's gain. That bookkeeping is exactly the particle picture of the event.",{});
  }
]));

/* ---------- PH12.8.4 Bohr model, qualitative ---------- */

E("u4-84-model-descriptions",4,["PH12.8.4"],1,"var",varset([
  function(){
    return mcq("In this description, electrons move in certain allowed circular orbits around the nucleus and give off a photon only when they jump to a lower orbit. The description belongs to",
      "The Bohr model",
      ["The de Broglie standing-wave picture","The quantum mechanical orbital model","The Thomson plum pudding model"],
      "Fixed allowed orbits with jumps between them, and photons emitted during the jumps, are the heart of Bohr's 1913 model of the atom.",{});
  },
  function(){
    return mcq("In this description, the electron behaves as a standing wave wrapped around the nucleus, and only orbits whose circumference fits a whole number of wavelengths can exist. The description belongs to",
      "The de Broglie standing-wave picture",
      ["The Bohr model","The quantum mechanical orbital model","The Rutherford nuclear model"],
      "De Broglie proposed that the electron is a wave, and an orbit survives only if the wave joins up with itself around the circle, a whole number of wavelengths per lap.",{});
  },
  function(){
    return mcq("In this description, electrons are not assigned exact paths at all. Instead, orbitals describe regions of space where an electron is likely to be found. The description belongs to",
      "The quantum mechanical orbital model",
      ["The Bohr model","The de Broglie standing-wave picture","The Thomson plum pudding model"],
      "Probability regions called orbitals, rather than definite orbits, are the picture given by the full quantum mechanical model of the atom.",{});
  },
  function(){
    return mcq("In this description, the atom has a tiny, dense, positively charged nucleus with electrons around it, but the model offers no reason why atoms are stable or why their spectra contain only certain lines. The description belongs to",
      "The Rutherford nuclear model",
      ["The Bohr model","The quantum mechanical orbital model","The de Broglie standing-wave picture"],
      "Rutherford's scattering results put the charge and mass in a small nucleus, but his model could not explain atomic stability or line spectra. Bohr's model was built to answer exactly those failures.",{});
  }
]));

E("u4-84-shell-capacity",4,["PH12.8.4"],1,"var",varset([
  function(){
    return mcq("What is the maximum number of electrons that can occupy the first shell (n = 1) of an atom?",
      "2",
      ["1","8","18"],
      "The maximum number of electrons in shell n is 2n\u00B2. For n = 1 this is 2 \u00D7 1 = 2 electrons.",{});
  },
  function(){
    return mcq("What is the maximum number of electrons that can occupy the second shell (n = 2) of an atom?",
      "8",
      ["2","4","18"],
      "The maximum number of electrons in shell n is 2n\u00B2. For n = 2 this is 2 \u00D7 4 = 8 electrons.",{});
  },
  function(){
    return mcq("What is the maximum number of electrons that can occupy the third shell (n = 3) of an atom?",
      "18",
      ["6","9","32"],
      "The maximum number of electrons in shell n is 2n\u00B2. For n = 3 this is 2 \u00D7 9 = 18 electrons.",{});
  },
  function(){
    return mcq("What is the maximum number of electrons that can occupy the fourth shell (n = 4) of an atom?",
      "32",
      ["8","16","50"],
      "The maximum number of electrons in shell n is 2n\u00B2. For n = 4 this is 2 \u00D7 16 = 32 electrons.",{});
  }
]));

E("u4-84-bohr-accounts",4,["PH12.8.4"],2,"var",varset([
  function(){
    return mcq("A hydrogen atom emits light only at certain specific wavelengths, never at wavelengths in between. In Bohr's model, this is because",
      "Electrons can only occupy certain energy levels, so they can only lose specific amounts of energy, and each amount produces a photon of a specific wavelength",
      ["The nucleus only vibrates at certain frequencies, and the light copies them",
       "The electrons orbit at many speeds and average out to a few wavelengths",
       "The gas in the tube filters out all the other wavelengths"],
      "Only certain electron energies are allowed, so only certain energy differences exist. Each difference becomes one photon with E = hf, giving a discrete set of wavelengths: a line spectrum.",{});
  },
  function(){
    return mcq("An electron circling a nucleus is accelerating, and classical theory says it should radiate energy and spiral inward. In Bohr's model, the atom is stable because",
      "Bohr proposed that electrons in allowed orbits simply do not radiate; radiation happens only during a jump between orbits",
      ["The nucleus pulls the electron back outward whenever it loses energy",
       "The electron moves so fast that radiation cannot escape",
       "Electrons in atoms do not actually move"],
      "Bohr built the stability in as a postulate: an electron in one of the allowed orbits does not radiate, however classical theory protests. Radiation is emitted or absorbed only when the electron changes orbits.",{});
  },
  function(){
    return mcq("A hydrogen electron drops from the third energy level to the second. The atom",
      "Emits one photon whose energy equals the difference between the two levels",
      ["Absorbs one photon whose energy equals the difference between the two levels",
       "Emits two photons, one for each level it passes",
       "Loses the energy gradually as heat while it spirals down"],
      "In Bohr's model the jump is direct, and the energy difference leaves as a single photon with E equal to the level difference. Dropping down is emission; climbing up would be absorption.",{});
  },
  function(){
    return mcq("For a hydrogen electron to jump from a lower energy level to a higher one, the atom must",
      "Absorb exactly the energy difference between the levels, for example from an incoming photon of that energy",
      ["Be heated until the electron melts free of its orbit",
       "Absorb any amount of energy greater than the difference; the extra is kept as motion",
       "Emit a photon to make room for the jump"],
      "Absorption is the reverse of emission and just as picky: the incoming photon must carry exactly the difference between the two levels. A photon with the wrong energy is not absorbed in this way.",{});
  }
]));

E("u4-84-debroglie-orbits",4,["PH12.8.4"],2,"var",varset([
  function(){
    var qq3204 = mcq("De Broglie suggested that Bohr's allowed orbits are the ones where the electron wave fits neatly around the nucleus. The condition for an orbit to be allowed is that",
      "The circumference of the orbit equals a whole number of electron wavelengths, so the wave joins up with itself in phase",
      ["The circumference of the orbit equals exactly one electron wavelength for every orbit",
       "The electron completes the orbit in a whole number of seconds",
       "The wavelength of the electron equals the radius of the orbit"],
      "If the wave meets itself in phase after one lap, it reinforces and survives as a standing wave. That requires the circumference to be a whole number of wavelengths: 1, 2, 3 and so on.",{}); qq3204.figure = p32figStandingWave(3,"circumference = a whole number of wavelengths"); return qq3204;
  },
  function(){
    return mcq("According to de Broglie, an orbit whose circumference is two and a half electron wavelengths cannot exist, because",
      "The wave would interfere destructively with itself after each lap and die out",
      ["The electron would move too slowly in such a large orbit",
       "Half a wavelength would stick out of the atom and be lost",
       "The nucleus would repel the electron from that orbit"],
      "After one trip around, the wave would be exactly out of phase with itself, crest meeting trough. Destructive interference wipes the wave out, so no such orbit is possible.",{});
  },
  function(){
    var qq3204 = mcq("An electron orbit has a circumference exactly 4 times the electron's de Broglie wavelength, so the wave fits around it four times. This corresponds to",
      "The fourth allowed orbit, n = 4",
      ["The second allowed orbit, n = 2","The eighth allowed orbit, n = 8","No allowed orbit, because the fit must be exact to one wavelength"],
      "The number of wavelengths fitted around the circumference is the orbit number n. Four wavelengths per lap means n = 4.",{}); qq3204.figure = p32figStandingWave(4,"circumference = 4 wavelengths"); return qq3204;
  },
  function(){
    var qq3204 = mcq("De Broglie's standing-wave idea was important because it",
      "Explained why only certain orbits are allowed, which Bohr had simply assumed",
      ["Proved that electrons are classical waves like sound",
       "Showed that the nucleus contains protons and neutrons",
       "Measured the charge of the electron for the first time"],
      "Bohr had to postulate his allowed orbits with no reason behind them. De Broglie's wave condition, a whole number of wavelengths around the orbit, supplies the reason.",{}); qq3204.figure = p32figStandingWave(3,"allowed orbits are standing waves"); return qq3204;
  }
]));

/* ---------- PH12.8.5 Bohr energy levels and photons ---------- */

E("u4-85-transition-energy",4,["PH12.8.5"],2,"gen",function(){
  var ni=ri(2,6), nf=ri(1,ni-1);
  var ctx=pick(PH4CTX);
  var Ei=bohrE(ni), Ef=bohrE(nf);
  var dE=Math.abs(Ei)-Math.abs(Ef);
  var ans=sfR(dE,3);
  var qq3204 = numq("An electron in a hydrogen atom "+ctx+" falls from the n = "+ni+" level to the n = "+nf+" level. Calculate the energy of the photon emitted. Give your answer in electron volts (eV).",
    ans,Math.max(0.02*Math.abs(ans),0.001),
    "The hydrogen level energies are E_n = -13.6 eV / n\u00B2. For n = "+ni+": 13.6 / "+(ni*ni)+" = "+gF(Math.abs(Ei))+", so the level energy is "+gF(Ei)+" eV. For n = "+nf+": 13.6 / "+(nf*nf)+" = "+gF(Math.abs(Ef))+", so the level energy is "+gF(Ef)+" eV. The photon carries away the difference: "+gF(Math.abs(Ei))+" - "+gF(Math.abs(Ef))+" = "+gF(dE)+" eV, which is "+F3(dE)+" eV at three significant figures.",
    {ni:ni,nf:nf}); qq3204.figure = p32figBohr(6,ni,nf,"down"); return qq3204;
});

E("u4-85-photon-wavelength",4,["PH12.8.5"],2,"gen",function(){
  var ni=ri(2,6), nf=ri(1,ni-1);
  var ctx=pick(PH4CTX);
  var Ei=bohrE(ni), Ef=bohrE(nf);
  var dE=Math.abs(Ei)-Math.abs(Ef);
  var lam=PHYS_H*PHYS_C/(dE*PHYS_E)/1e-9;
  var ans=sfR(lam,3);
  var qq3204 = numq("An electron in a hydrogen atom "+ctx+" falls from the n = "+ni+" level to the n = "+nf+" level. Calculate the wavelength of the photon emitted. Give your answer in nanometres (nm).",
    ans,Math.max(0.02*Math.abs(ans),0.01),
    "The level energies are E_n = -13.6 eV / n\u00B2, so the n = "+ni+" level is "+gF(Ei)+" eV and the n = "+nf+" level is "+gF(Ef)+" eV. The photon energy is the difference, "+gF(Math.abs(Ei))+" - "+gF(Math.abs(Ef))+" = "+gF(dE)+" eV. Converting that energy to joules and using \u03BB = hc / E gives the wavelength. \u03BB = "+F3(lam)+" nm.",
    {ni:ni,nf:nf}); qq3204.figure = p32figBohr(6,ni,nf,"down"); return qq3204;
});

E("u4-85-greatest-transitions",4,["PH12.8.5"],3,"var",varset([
  function(){
    var qq3204 = mcq("Which of these electron transitions in hydrogen releases the most energy?",
      "n = 5 to n = 1",
      ["n = 6 to n = 5","n = 4 to n = 2","n = 3 to n = 2"],
      "Energy released is the gap between the levels, using E_n = -13.6 eV / n\u00B2. The gaps are: n = 5 to n = 1, 13.06 eV; n = 4 to n = 2, 2.55 eV; n = 3 to n = 2, 1.89 eV; n = 6 to n = 5, 0.166 eV. Falling all the way to the ground level from n = 5 releases by far the most energy.",{}); qq3204.figure = p32figBohr(6,null,null,null); return qq3204;
  },
  function(){
    var qq3204 = mcq("Which of these electron transitions in hydrogen requires the most energy to be absorbed?",
      "n = 1 to n = 4",
      ["n = 1 to n = 2","n = 2 to n = 5","n = 3 to n = 6"],
      "Energy absorbed is the gap between the levels, using E_n = -13.6 eV / n\u00B2. The gaps are: n = 1 to n = 4, 12.75 eV; n = 1 to n = 2, 10.2 eV; n = 2 to n = 5, 2.86 eV; n = 3 to n = 6, 1.13 eV. Climbing from the ground level to n = 4 is the biggest jump listed.",{}); qq3204.figure = p32figBohr(6,null,null,null); return qq3204;
  },
  function(){
    var qq3204 = mcq("Which of these electron transitions in hydrogen emits the photon with the longest wavelength?",
      "n = 6 to n = 5",
      ["n = 2 to n = 1","n = 4 to n = 3","n = 5 to n = 4"],
      "The longest wavelength belongs to the least energetic photon, since \u03BB = hc / E. The gaps are: n = 6 to n = 5, 0.166 eV; n = 5 to n = 4, 0.306 eV; n = 4 to n = 3, 0.661 eV; n = 2 to n = 1, 10.2 eV. Neighbouring high levels are closest together in energy, so n = 6 to n = 5 gives the smallest energy and the longest wavelength.",{}); qq3204.figure = p32figBohr(6,null,null,null); return qq3204;
  },
  function(){
    var qq3204 = mcq("An electron in hydrogen falls from n = 5 to n = 2, emitting a photon of about 434 nm. All transitions ending at n = 2 form the Balmer series. This photon is",
      "In the visible region, since 434 nm lies between about 380 nm and 750 nm",
      ["In the ultraviolet, since all hydrogen lines are ultraviolet",
       "In the infrared, since n = 2 is a low level",
       "An X-ray, since it comes from an energy level change"],
      "Falls to n = 2 give the Balmer series, and this one's wavelength, about 434 nm, sits inside the visible band. Falls to n = 1 give ultraviolet Lyman lines and falls to n = 3 give infrared Paschen lines.",{}); qq3204.figure = p32figBohr(6,null,null,null); return qq3204;
  }
]));

E("u4-85-transition-cr",4,["PH12.8.5"],3,"gen",function(){
  var pr=pick([[4,2],[5,2],[6,2],[3,1],[4,1],[5,1],[6,1],[5,3],[6,3]]);
  var ni=pr[0], nf=pr[1];
  var ctx=pick(PH4CTX);
  var Ei=bohrE(ni), Ef=bohrE(nf);
  var dE=Math.abs(Ei)-Math.abs(Ef);
  var EJ=dE*PHYS_E;
  var lam=PHYS_H*PHYS_C/EJ/1e-9;
  var ans=sfR(lam,3);
  var region=lam<380?"This wavelength is in the ultraviolet region.":(lam<=750?"This wavelength is in the visible region.":"This wavelength is in the infrared region.");
  var qq3204 = numq("An electron in a hydrogen atom "+ctx+" falls from the n = "+ni+" level to the n = "+nf+" level. Calculate the wavelength of the photon emitted. Give your answer in nanometres (nm).",
    ans,Math.max(0.02*Math.abs(ans),0.01),
    "Step 1: level energies from E_n = -13.6 eV / n\u00B2. For n = "+ni+": 13.6 / "+(ni*ni)+" = "+gF(Math.abs(Ei))+", so E = "+gF(Ei)+" eV. For n = "+nf+": 13.6 / "+(nf*nf)+" = "+gF(Math.abs(Ef))+", so E = "+gF(Ef)+" eV. Step 2: the photon takes the difference: "+gF(Math.abs(Ei))+" - "+gF(Math.abs(Ef))+" = "+gF(dE)+" eV. Step 3: in joules, multiplying by 1.60 \u00D7 10\u207B\u00B9\u2079 J per eV, the photon energy is "+F3(EJ)+" J. Step 4: \u03BB = hc / E then gives the wavelength in metres, converted here to nanometres: \u03BB = "+F3(lam)+" nm. "+region,
    {ni:ni,nf:nf}); qq3204.figure = p32figBohr(6,ni,nf,"down"); return qq3204;
});

E("u4-85-absorption-cr",4,["PH12.8.5"],2,"gen",function(){
  var pr=pick([[1,2],[1,3],[1,4],[1,5],[2,3],[2,4],[2,5],[3,4],[3,5],[3,6],[4,5],[4,6]]);
  var ni=pr[0], nf=pr[1];
  var ctx=pick(PH4CTX);
  var Ei=bohrE(ni), Ef=bohrE(nf);
  var Eph=Ef-Ei;
  var ans=nf;
  var qq3204 = numq("A hydrogen atom "+ctx+" has an electron in the n = "+ni+" level. It absorbs a photon of energy "+gF(Eph)+" eV. The level energies are: n = 1: -13.6 eV, n = 2: -3.40 eV, n = 3: -1.51 eV, n = 4: -0.850 eV, n = 5: -0.544 eV, n = 6: -0.378 eV. To which level does the electron rise? Give your answer as a whole number.",
    ans,0.4,
    "The electron gains the photon's energy, so its new energy is the starting level energy plus "+gF(Eph)+" eV: "+gF(Ei)+" + "+gF(Eph)+" = "+gF(Ef)+" eV. Comparing with the listed level energies, "+gF(Ef)+" eV is exactly the n = "+nf+" level, so the electron rises to n = "+nf+". A photon works for this jump only if its energy matches the gap exactly.",
    {ni:ni,nf:nf}); qq3204.figure = p32figBohr(6,null,null,null); return qq3204;
});

/* ---------- PH12.8.6 Quantum model and luminous phenomena ---------- */

E("u4-86-fluor-phos",4,["PH12.8.6"],2,"var",varset([
  function(){
    return mcq("A material shows fluorescence. In energy terms, what happens inside its atoms while the exciting light shines on it?",
      "Atoms absorb high-energy photons, and electrons fall back almost immediately, emitting lower-energy photons, so the glow stops as soon as the exciting light is removed",
      ["Atoms store the absorbed energy for hours and release it slowly as light",
       "Atoms reflect the exciting light unchanged, like tiny mirrors",
       "Electrons are knocked completely out of the atoms and recombine later"],
      "In fluorescence the excited electrons return to lower levels almost at once, emitting photons of visible light. Part of the absorbed energy is lost as heat first, so the emitted photons are less energetic than the absorbed ones, and the display ends with the exciting light.",{});
  },
  function(){
    return mcq("A material shows phosphorescence. In energy terms, what makes it different from fluorescence?",
      "Some electrons are held in long-lived excited states and return only gradually, so the material keeps emitting light long after the exciting light is removed",
      ["Its atoms absorb photons of much higher energy than fluorescent materials do",
       "Its electrons fall back instantly, but the emitted photons travel very slowly out of the material",
       "It reflects light that was stored in the material during manufacture"],
      "Phosphorescent materials trap some excited electrons in states they escape only slowly. The stored energy leaks back out as light over minutes or hours, which is why the glow outlasts the lamp.",{});
  },
  function(){
    return mcq("A fluorescent material absorbs ultraviolet photons and emits visible photons. The emitted photons have longer wavelengths than the absorbed ones because",
      "Part of each absorbed photon's energy is lost as heat and vibration before emission, so the emitted photon carries less energy",
      ["The material stretches the photons as they pass through it",
       "Visible photons always gain energy while travelling through a solid",
       "The atoms add a little of their own energy to every photon"],
      "Energy in must cover energy out. Some of the absorbed energy becomes thermal motion before the electron falls back, leaving less for the emitted photon, and less energy means a longer wavelength.",{});
  },
  function(){
    return mcq("A safety poster glows brightly while an ultraviolet lamp shines on it in a dark room, and the glow vanishes the instant the lamp is switched off. The poster is showing",
      "Fluorescence, because the emission happens only while the exciting light is shining",
      ["Phosphorescence, because the material is glowing in the dark",
       "The photoelectric effect, because ultraviolet light is involved",
       "Incandescence, because the poster is giving off light"],
      "The giveaway is the timing: emission that starts and stops with the exciting light is fluorescence. A phosphorescent poster would keep glowing after the lamp went off.",{});
  }
]));

E("u4-86-glow-applications",4,["PH12.8.6"],2,"var",varset([
  function(){
    return mcq("Plastic stars stuck on a bedroom ceiling are charged by the room light and then glow for an hour after the lights go out. This works because",
      "The material is phosphorescent: it stores absorbed photon energy in long-lived excited states and releases it slowly as visible light",
      ["The plastic reflects the room light back out again very slowly",
       "The material is slightly radioactive and glows on its own",
       "The stars keep a small electric charge that makes them shine"],
      "Charging fills long-lived excited states with energy from the room light. In the dark those states empty gradually, and each returning electron gives up its stored energy as a visible photon.",{});
  },
  function(){
    return mcq("Glow-in-the-dark stars shine brightly at first and then grow dimmer as the night goes on. The fading happens because",
      "The store of trapped excited electrons runs down as more and more of them return to the ground state",
      ["The material slowly cools, and cold materials cannot glow",
       "The photons already emitted block the ones still inside",
       "The electrons get tired and fall back more slowly"],
      "The glow is paid for out of a fixed store of excited electrons. Every emitted photon spends one of them, so as the store empties the emission rate, and the brightness, falls away.",{});
  },
  function(){
    return mcq("Inside a fluorescent lamp, an electric discharge in mercury vapour produces mostly ultraviolet photons, yet the lamp gives off visible light. The visible light comes mainly from",
      "A phosphor coating on the tube that absorbs the ultraviolet photons and re-emits their energy as visible light",
      ["The glass of the tube, which slows ultraviolet photons down until they become visible",
       "The mercury atoms directly, which emit only visible light",
       "The electrodes, which glow white hot like a filament"],
      "The coating is a fluorescent material: it takes in the invisible ultraviolet photons and returns the energy as visible photons, losing a little as heat on the way. That conversion is the whole point of the coating.",{});
  },
  function(){
    return mcq("A phosphorescent ornament sits in a dark drawer for a week. When it is taken out at night it does not glow at all. This is because",
      "Its electrons are all back in the ground state; sitting in the dark stored no energy for it to release",
      ["The darkness inside the drawer drained the glow out of the material",
       "Phosphorescent materials only work once and then wear out",
       "The ornament needs to be cold before it can glow"],
      "Phosphorescence spends stored energy, and storage needs light. A week in the dark leaves every electron in the ground state, so there is nothing to release until the ornament is charged by light again.",{});
  }
]));

E("u4-86-identify-phenomenon",4,["PH12.8.6"],1,"var",varset([
  function(){
    return mcq("Highlighter ink on a page glows vividly under a black light (ultraviolet lamp), but only while the lamp is on. The phenomenon is",
      "Fluorescence",
      ["Phosphorescence","Compton scattering","The photoelectric effect"],
      "Emission that happens only while the exciting light shines, stopping when it stops, is fluorescence.",{});
  },
  function(){
    return mcq("The hands of a watch were exposed to daylight during the day and can still be seen glowing faintly in a dark room an hour later. The phenomenon is",
      "Phosphorescence",
      ["Fluorescence","Compton scattering","The photoelectric effect"],
      "A glow that persists long after the exciting light is gone, paid for out of stored energy, is phosphorescence.",{});
  },
  function(){
    return mcq("Security ink printed on banknotes is invisible in normal light but shows up brightly the moment an ultraviolet lamp is shone on the note. The phenomenon is",
      "Fluorescence",
      ["Phosphorescence","Compton scattering","The photoelectric effect"],
      "The ink emits visible light only while the ultraviolet shines on it. Prompt emission tied to the exciting light is fluorescence.",{});
  },
  function(){
    return mcq("A child's glow star is held under a lamp for a minute, and it then glows on the bedroom wall for the next twenty minutes in the dark. The phenomenon is",
      "Phosphorescence",
      ["Fluorescence","Compton scattering","The photoelectric effect"],
      "The star stored the lamp's energy and releases it slowly after the lamp is gone. Delayed, persistent emission is phosphorescence.",{});
  }
]));

E("u4-86-energy-account",4,["PH12.8.6"],3,"gen",function(){
  var la=sfR(rf(240,300),3);
  var le=sfR(la*rf(2.05,2.75),3);
  var ratio=sfR(la/le,4);
  var pct=ratio*100;
  return mcq("A fluorescent dye absorbs photons of wavelength "+gF(la)+" nm and re-emits photons of wavelength "+gF(le)+" nm. What percentage of each absorbed photon's energy is re-emitted as light?",
    F3(pct)+"%",
    [F3(100-pct)+"%",F3(le/la*100)+"%",F3((le-la)/la*100)+"%"],
    "Photon energy is inversely proportional to wavelength, so the fraction of energy re-emitted is the absorbed wavelength divided by the emitted wavelength: "+gF(la)+" / "+gF(le)+" = "+iF(ratio)+". As a percentage: "+iF(ratio)+" \u00D7 100 = "+fmt(pct,2)+"%, which is "+F3(pct)+"% at three significant figures. The rest of the energy is lost as heat in the dye.",
    {la:la,le:le});
});

/* ---------- PH12.8.7 Evidence for wave and particle models ---------- */

E("u4-87-wave-model-fails",4,["PH12.8.7"],2,"var",varset([
  function(){
    return mcq("Bright red light shines on a metal for an hour and ejects no electrons at all, while faint ultraviolet light ejects electrons instantly. The wave model of light cannot explain this, because in the wave model",
      "Energy arrives gradually and in proportion to brightness, so bright light of any colour should eventually build up enough energy to eject electrons",
      ["Light should stop travelling when it meets a metal surface",
       "Red light should travel more slowly than ultraviolet light",
       "Electrons should not be able to leave a metal under any circumstances"],
      "A wave spreads its energy continuously over the surface, so a brighter wave of any frequency ought to free electrons given time. The observation, instant ejection depending on frequency alone, fits a stream of photons instead: each electron takes one photon, and only photons above the threshold energy can do the job.",{});
  },
  function(){
    return mcq("Doubling the brightness of light that is above the threshold frequency doubles the number of electrons a metal emits each second, but their maximum kinetic energy does not change. The photon account explains this because",
      "Each electron is freed by one photon; brighter light supplies more photons, but every photon still carries the same energy",
      ["Brighter light makes the metal hotter, and hot metals shed more electrons",
       "The extra photons collide with each other and share their energy out evenly",
       "Electrons absorb two photons at once when the light is bright"],
      "Numbers and energies separate cleanly in the photon picture. Brightness is a photon count, so it sets how many electrons are freed. Energy per electron is set by the single photon that freed it, which depends on frequency, not brightness.",{});
  },
  function(){
    return mcq("Every metal has a threshold frequency, below which no electrons are emitted however the light is adjusted. In the quantum account, the threshold exists because",
      "A photon with energy below the work function cannot free an electron, and each electron is freed by absorbing a single photon",
      ["Slow waves cannot penetrate the surface of a metal at all",
       "Electrons need time to warm up before they can escape",
       "Below that frequency the light is reflected too perfectly to interact"],
      "Escape costs the work function, and the bill must be paid by one photon in one payment. A photon with hf below the work function leaves the electron stuck, and no number of such photons changes that.",{});
  },
  function(){
    return mcq("Wave theory was unable to explain the wavelength shift Compton measured when X-rays scattered from electrons, because",
      "It offered no way for the scattered photon to hand a definite amount of energy and momentum to one single electron, the way colliding particles do",
      ["Waves cannot change direction when they meet an obstacle",
       "X-rays travel too fast for wave theory to apply to them",
       "The target contained too many electrons for the theory to handle"],
      "In the wave picture the electron should absorb energy gradually and reradiate at the same wavelength. The measured shift matches a single collision between a photon and an electron with energy and momentum conserved, a particle event.",{});
  }
]));

E("u4-87-match-model",4,["PH12.8.7"],1,"var",varset([
  function(){
    return mcq("Light passing through a narrow slit spreads out and forms a diffraction pattern. This phenomenon is direct evidence for",
      "The wave model of light",
      ["The particle (photon) model of light","Neither model of light","Both models of light equally"],
      "Spreading out after passing through a small opening, and forming patterns of interference, is behaviour characteristic of waves. This observation supports the wave model.",{});
  },
  function(){
    return mcq("Ultraviolet light ejects electrons from a metal instantly, and the electrons' energies depend on the light's frequency rather than its brightness. This phenomenon is direct evidence for",
      "The particle (photon) model of light",
      ["The wave model of light","Neither model of light","Both models of light equally"],
      "Energy arriving in concentrated packets, one packet per electron, is the signature of the photon model. The photoelectric effect is its classic evidence.",{});
  },
  function(){
    return mcq("Light passing through two close slits produces a pattern of bright and dark fringes on a screen. This phenomenon is direct evidence for",
      "The wave model of light",
      ["The particle (photon) model of light","Neither model of light","Both models of light equally"],
      "Fringes are interference: the two paths reinforce in some places and cancel in others. Only waves produce cancellation, so the double-slit pattern supports the wave model.",{});
  },
  function(){
    return mcq("X-rays scattering from electrons emerge with a longer wavelength, exactly as if each photon had collided with one electron and lost energy and momentum to it. This phenomenon is direct evidence for",
      "The particle (photon) model of light",
      ["The wave model of light","Neither model of light","Both models of light equally"],
      "A collision with a recoil, in which energy and momentum are handed over, is particle behaviour. Compton scattering is direct evidence that photons carry momentum like particles.",{});
  }
]));

E("u4-87-single-photon-doubleslit",4,["PH12.8.7"],3,"var",varset([
  function(){
    return mcq("Photons are sent through a double slit one at a time, so that only one photon is ever in the apparatus at once. After thousands of photons have arrived at the screen, the recorded pattern is",
      "An interference pattern built up from individual arrival dots",
      ["Two bright bands, one behind each slit","A smooth uniform smear with no pattern","Nothing at all, because single photons cannot interfere"],
      "Each photon lands as one dot, like a particle, yet the accumulated dots trace out the same interference fringes a wave would make. The pattern is statistical: it emerges from many single arrivals.",{});
  },
  function(){
    return mcq("In the same one-at-a-time double-slit experiment, only twenty photons have arrived so far. The screen at this stage shows",
      "A few scattered dots with no visible pattern yet; the fringes emerge only as many photons accumulate",
      ["A faint but complete interference pattern at full detail",
       "Exactly ten dots behind each slit",
       "A tiny image of the two slits"],
      "Twenty dots cannot draw a fringe pattern; they land as individual particle hits, seemingly at random. Only when thousands have built up does the wave-like pattern become visible in their distribution.",{});
  },
  function(){
    return mcq("The one-at-a-time double-slit result is best interpreted by saying that",
      "Each photon arrives as a single particle-like dot, but the probability of where it lands is governed by a wave-like pattern",
      ["Each photon splits into two half-photons that recombine at the screen",
       "Photons secretly travel in groups even when sent one at a time",
       "The screen itself rearranges the dots into fringes afterwards"],
      "The result holds both ideas at once: detection is particle-like, one dot at a time, while the distribution of the dots follows the interference pattern only a wave could produce. That pairing is wave-particle duality in action.",{});
  },
  function(){
    return mcq("Still sending photons one at a time, one of the two slits is now covered. The pattern that builds up becomes",
      "A single-slit pattern with no interference fringes, because each photon now has only one path available",
      ["The same interference pattern, but half as bright",
       "Two bright bands, because the photons bunch together",
       "A completely blank screen, because photons need both slits open"],
      "Interference needs two paths whose contributions can reinforce or cancel. With one slit covered there is nothing to interfere with, and the fringes disappear even though photons still arrive one by one.",{});
  }
]));

E("u4-87-duality-judgement",4,["PH12.8.7"],3,"var",varset([
  function(){
    return mcq("A classmate claims: light is a wave, full stop, because it diffracts. Which observation most directly shows the claim is incomplete?",
      "Light ejects electrons from a metal instantly, with electron energies set by frequency rather than brightness",
      ["Light refracts when it passes from air into water",
       "Light reflects from a mirror at equal angles",
       "Light spreads out after passing through a narrow slit"],
      "Refraction, reflection and diffraction are all behaviour the wave model handles happily. Instant electron ejection with frequency-dependent energies is not: it needs energy in packets. That observation forces the particle side of the story.",{});
  },
  function(){
    return mcq("A classmate claims: light is just a stream of tiny particles, full stop. Which observation most directly shows the claim is incomplete?",
      "Light forms interference fringes when it passes through two close slits",
      ["Light ejects electrons from a metal surface",
       "Light transfers momentum to electrons when X-rays scatter",
       "Light travels in straight lines and casts sharp shadows"],
      "Particles cannot cancel each other out, yet the dark fringes are places where light plus light gives darkness. Interference is wave behaviour that a pure particle stream cannot explain.",{});
  },
  function(){
    return mcq("Which pair of observations, taken together, is what forces the idea of wave-particle duality?",
      "Interference fringes from a double slit, together with the photoelectric effect",
      ["Diffraction of light, together with reflection of light",
       "The photoelectric effect, together with Compton scattering",
       "Refraction of light, together with diffraction of light"],
      "The first pair mixes the two camps: fringes demand a wave, the photoelectric effect demands particles. Pairs drawn from a single camp can be explained by one model alone and force nothing.",{});
  },
  function(){
    return mcq("A student wants direct evidence that photons carry momentum like particles. The most direct measurement is to",
      "Scatter X-rays from electrons and measure both the photon's wavelength increase and the electron's recoil",
      ["Show that light bends around the edge of a slit",
       "Measure the brightness of a beam very carefully",
       "Pass light through a prism and record the spectrum"],
      "Momentum transfer is the claim, so the test must catch momentum being transferred: a photon leaving with less momentum (longer wavelength) while an electron recoils with the difference. That is exactly Compton's measurement.",{});
  }
]));

/* ---------- PH12.8.8 De Broglie hypothesis ---------- */

E("u4-88-electron-wavelength",4,["PH12.8.8"],2,"gen",function(){
  var v=sfR(rf(1.00,9.00),3)*1e6;
  var lam=PHYS_H/(PHYS_ME*v)/1e-9;
  var ans=sfR(lam,3);
  return numq("An electron travels at "+gF(v)+" m/s. Calculate its de Broglie wavelength. Give your answer in nanometres (nm).",
    ans,Math.max(0.02*Math.abs(ans),0.0005),
    "De Broglie proposed that a moving particle has a wavelength \u03BB = h / (mv). Dividing the Planck constant by the electron's mass times its speed gives the wavelength in metres, converted here to nanometres. \u03BB = "+F3(lam)+" nm. That is comparable to the spacing between atoms, which is why electrons can show diffraction effects in crystals.",
    {v:v});
});

E("u4-88-proton-wavelength",4,["PH12.8.8"],2,"gen",function(){
  var vk=sfR(rf(150,900),3);
  var lam=PHYS_H/(PHYS_MP*vk*1000);
  return mcq("A proton travels at "+gF(vk)+" km/s. What is its de Broglie wavelength?",
    F3(lam)+" m",
    [F3(PHYS_H/(PHYS_ME*vk*1000))+" m",F3(PHYS_H/(PHYS_MP*vk))+" m",F3(lam/2)+" m"],
    "Use \u03BB = h / (mv) with the proton mass, 1.67 \u00D7 10\u207B\u00B2\u2077 kg, and the speed converted to metres per second: "+gF(vk)+" km/s is "+fmt(vk*1000,0)+" m/s. The wavelength is "+F3(lam)+" m. Using the electron's much smaller mass, or forgetting the km/s conversion, each inflates the answer by a large factor.",
    {vk:vk});
});

E("u4-88-accelerating-cr",4,["PH12.8.8"],3,"gen",function(){
  var V=sfR(rf(40.0,400),3);
  var KE=PHYS_E*V;
  var vP=sfR(Math.sqrt(2*KE/PHYS_ME),4);
  var lam=PHYS_H/(PHYS_ME*vP)/1e-9;
  var ans=sfR(lam,3);
  return numq("An electron is accelerated from rest through a potential difference of "+gF(V)+" V. Calculate its de Broglie wavelength after acceleration. Give your answer in nanometres (nm).",
    ans,Math.max(0.02*Math.abs(ans),0.0005),
    "Step 1: the field hands the electron a kinetic energy of one electron charge times the voltage, which in joules is "+F3(KE)+" J. Step 2: from the kinetic energy, the speed is v = \u221A(2 \u00D7 KE / m), using the electron mass 9.11 \u00D7 10\u207B\u00B3\u00B9 kg; this gives v = "+iF(vP)+" m/s. Step 3: the de Broglie wavelength is \u03BB = h / (mv), computed from that speed: \u03BB = "+F3(lam)+" nm. Wavelengths this small, comparable to atomic spacings, are what make electron microscopes possible.",
    {V:V});
});

E("u4-88-compare-particles",4,["PH12.8.8"],3,"var",varset([
  function(){
    return mcq("An electron and a proton are given exactly the same kinetic energy. The proton's de Broglie wavelength is",
      "About 0.0233 times the electron's wavelength",
      ["About 1836 times the electron's wavelength","The same as the electron's wavelength","About 0.000545 times the electron's wavelength"],
      "At the same kinetic energy, momentum is p = \u221A(2mK), so the heavier particle carries more momentum, by the square root of the mass ratio. Wavelength goes as 1 / p, so the proton's wavelength is smaller by \u221A(m_e / m_p), about 0.0233.",{});
  },
  function(){
    return mcq("An electron and a proton travel at exactly the same speed. The proton's de Broglie wavelength is",
      "About 0.000545 times the electron's wavelength",
      ["About 1836 times the electron's wavelength","The same as the electron's wavelength","About 0.0233 times the electron's wavelength"],
      "At the same speed, momentum is p = mv, so the proton's momentum is larger by the full mass ratio, about 1836. Wavelength goes as 1 / p, so the proton's wavelength is the electron's divided by about 1836, which is 0.000545 times as large.",{});
  },
  function(){
    return mcq("An electron and a proton have exactly the same momentum. Their de Broglie wavelengths are",
      "The same, because wavelength depends only on momentum",
      ["Different, because the proton is much heavier","Different, because the electron is much lighter","Impossible to compare without knowing their speeds"],
      "De Broglie's relation is \u03BB = h / p. It mentions momentum only. Same momentum, same h, so the wavelengths are identical, whatever the masses are doing.",{});
  },
  function(){
    return mcq("An electron and a proton are given exactly the same kinetic energy. The electron's de Broglie wavelength is",
      "About 42.8 times the proton's wavelength",
      ["About 1836 times the proton's wavelength","About the same as the proton's wavelength","About 0.0233 times the proton's wavelength"],
      "This is the same comparison viewed from the other side. At equal kinetic energy the proton's wavelength is the electron's divided by \u221A(m_p / m_e) with the masses swapped, so the electron's wavelength is larger by \u221A(1836), about 42.8.",{});
  }
]));

E("u4-83-compton-cr",4,["PH12.8.3"],2,"gen",function(){
  var lam=sfR(rf(35.0,65.0),3);
  var th=pick([60.0,90.0,120,180]);
  var shiftP=sfR(2.426*(1-Math.cos(th*Math.PI/180)),4);
  var lamP=sfR(lam+shiftP,4);
  var ekeV=1.240e6/lamP/1000;
  var ans=sfR(ekeV,3);
  var qq3204 = numq("An X-ray photon with a wavelength of "+gF(lam)+" pm strikes a stationary electron and is scattered at "+gF(th)+"\u00B0 from its original direction. Calculate the energy of the scattered photon. Give your answer in keV.",
    ans,Math.max(0.02*Math.abs(ans),0.01),
    "Step 1: the Compton shift is \u0394\u03BB = (h / (m_e c)) (1 - cos \u03B8), and the Compton wavelength h / (m_e c) is 2.43 pm, so at this angle the shift is \u0394\u03BB = "+iF(shiftP)+" pm. Step 2: the scattered wavelength is \u03BB' = "+gF(lam)+" pm + "+iF(shiftP)+" pm = "+iF(lamP)+" pm. Step 3: photon energy is E = hc / \u03BB', with hc = 1.240 \u00D7 10\u2076 eV\u00B7pm, so E = "+F3(ekeV)+" keV. The photon leaves with less energy than it brought; the difference is the kinetic energy handed to the electron, which is the particle behaviour Compton set out to prove.",
    {lam:lam, th:th}); qq3204.figure = p32figCompton(gF(lam)+" pm",th); return qq3204;
});

/* ============ Constructed-response marks (generated) ============ */
/* Built by assemble-bank.py from the CRMARKS manifests at the top of
   each unit file. Exam Section B draws only from these entries. */
window.__BANK_CRMARKS={"u1-51-resultant-cr":3,"u1-53-aircraft-heading-cr":4,"u1-53-drift-cr":3,"u1-53-heading-cr":3,"u1-54-cliff-height-cr":3,"u1-54-hit-or-miss-cr":4,"u1-55-stick-2d-cr":5,"u1-55-third-piece-cr":4,"u2-61-scaling-cr":2,"u2-61-speed-accel-cr":3,"u2-62-banked-cr":4,"u2-62-dip-cr":4,"u2-62-minspeed-cr":3,"u2-63-incline-friction-cr":4,"u2-63-pulley-cr":5,"u2-64-beam-cr":4,"u2-64-ladder-cr":4,"u2-64-wires-cr":2,"u3-71-field-radii":3,"u3-710-lift-motor":3,"u3-72-orbit-period":3,"u3-72-planet-mass-moon":4,"u3-72-separation-from-force":3,"u3-73-field-two-charges-point":3,"u3-74-charge-from-force":3,"u3-74-net-force-collinear":4,"u3-74-separation-from-force":3,"u3-75-circuit-table":4,"u3-75-combination-circuit":4,"u3-75-energy-cost":3,"u3-75-parallel-branches":3,"u3-77-current-from-field":3,"u3-78-circular-speed":4,"u3-78-field-from-orbit":3,"u3-78-force-angle":3,"u3-79-transformer":3,"u4-82-photoelectric-cr":4,"u4-82-threshold-cr":3,"u4-83-compton-cr":3,"u4-85-absorption-cr":2,"u4-85-transition-cr":5,"u4-88-accelerating-cr":3};
