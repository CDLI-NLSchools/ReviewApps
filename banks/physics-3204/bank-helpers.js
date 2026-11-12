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
