/* Physics 2204 bank module for the unified review app shell.
   Assembled by assemble-bank.py from banks/physics-2204/; edit the
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
// Physics 2204 diagram figures (Phase C, Nov 2026): original code generated
// SVG drawings, each built inside a generator from that question's own
// drawn values, so labels always match the stem. Unknowns are marked "?"
// and no asked value is printed. Helpers carry the p22 prefix.
var P22_INK="#17352a",P22_ACC="#2e7d4f",P22_ALT="#b3541e",P22_SHADE="#dcebe2";
function p22n(x){return Math.round(x*10)/10;}
function p22Txt(x,y,s,size,bold,anchor){return '<text x="'+p22n(x)+'" y="'+p22n(y)+'" font-size="'+(size||12)+'" fill="'+P22_INK+'" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="'+(anchor||"middle")+'" dominant-baseline="central"'+(bold?' font-weight="bold"':"")+'>'+s+'</text>';}
function p22Line(x1,y1,x2,y2,w,dash,col){return '<line x1="'+p22n(x1)+'" y1="'+p22n(y1)+'" x2="'+p22n(x2)+'" y2="'+p22n(y2)+'" stroke="'+(col||P22_INK)+'" stroke-width="'+(w||2)+'"'+(dash?' stroke-dasharray="5 4"':"")+'/>';}
function p22Arrow(x1,y1,x2,y2,w,col){var a=Math.atan2(y2-y1,x2-x1),s=8,h="";col=col||P22_INK;
  h+='<line x1="'+p22n(x1)+'" y1="'+p22n(y1)+'" x2="'+p22n(x2)+'" y2="'+p22n(y2)+'" stroke="'+col+'" stroke-width="'+(w||2.2)+'"/>';
  var p1=[x2-s*Math.cos(a-0.42),y2-s*Math.sin(a-0.42)],p2=[x2-s*Math.cos(a+0.42),y2-s*Math.sin(a+0.42)];
  return h+'<polygon points="'+p22n(x2)+','+p22n(y2)+' '+p22n(p1[0])+','+p22n(p1[1])+' '+p22n(p2[0])+','+p22n(p2[1])+'" fill="'+col+'"/>';}
function p22Svg(w,h,body,label){return '<svg viewBox="0 0 '+w+' '+h+'" width="'+Math.min(w,360)+'" height="'+p22n(Math.min(w,360)*h/w)+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+label+'">'+body+'</svg>';}
function p22Rect(x,y,w,h,fill){return '<rect x="'+p22n(x)+'" y="'+p22n(y)+'" width="'+p22n(w)+'" height="'+p22n(h)+'" fill="'+(fill||"none")+'" stroke="'+P22_INK+'" stroke-width="2"/>';}
/* Generic x-y plot. cfg: series [{pts, shade}], xt [[x,label]], yt [[y,label]],
   xmax, ymax, xl, yl, dots, labels [{x,y,t}] */
function p22Plot(cfg){
  var W=340,H=232,L=58,R=16,T=14,B=38,PW=W-L-R,PH=H-T-B;
  function X(x){return L+PW*x/cfg.xmax;} function Y(y){return T+PH-PH*y/cfg.ymax;}
  var o="";
  (cfg.xt||[]).forEach(function(tk){o+='<line x1="'+p22n(X(tk[0]))+'" y1="'+p22n(T)+'" x2="'+p22n(X(tk[0]))+'" y2="'+p22n(T+PH)+'" stroke="#b9cdc2" stroke-width="1" stroke-dasharray="3 4"/>';
    o+=p22Txt(X(tk[0]),T+PH+14,tk[1],11,false);});
  (cfg.yt||[]).forEach(function(tk){o+='<line x1="'+p22n(L)+'" y1="'+p22n(Y(tk[0]))+'" x2="'+p22n(L+PW)+'" y2="'+p22n(Y(tk[0]))+'" stroke="#b9cdc2" stroke-width="1" stroke-dasharray="3 4"/>';
    o+=p22Txt(L-6,Y(tk[0]),tk[1],11,false,"end");});
  o+=p22Arrow(L,T+PH,L+PW,T+PH,1.8)+p22Arrow(L,T+PH,L,T,1.8);
  o+=p22Txt(L+PW/2,H-4,cfg.xl||"",12,true)+p22Txt(14,T+PH/2,cfg.yl||"",12,true);
  var series=cfg.series||(cfg.pts?[{pts:cfg.pts,shade:cfg.shade}]:[]);
  series.forEach(function(s){
    var path=s.pts.map(function(p,i){return (i?"L":"M")+p22n(X(p[0]))+" "+p22n(Y(p[1]));}).join(" ");
    if(s.shade){var fp=s.pts.map(function(p){return p22n(X(p[0]))+","+p22n(Y(p[1]));}).join(" ");
      o+='<polygon points="'+p22n(X(s.pts[0][0]))+','+p22n(Y(0))+' '+fp+' '+p22n(X(s.pts[s.pts.length-1][0]))+','+p22n(Y(0))+'" fill="'+P22_SHADE+'"/>';}
    o+='<path d="'+path+'" fill="none" stroke="'+P22_ACC+'" stroke-width="2.4"/>';
    if(cfg.dots)s.pts.forEach(function(p){o+='<circle cx="'+p22n(X(p[0]))+'" cy="'+p22n(Y(p[1]))+'" r="3.4" fill="'+P22_INK+'"/>';});
  });
  (cfg.markPts||[]).forEach(function(p){o+='<circle cx="'+p22n(X(p[0]))+'" cy="'+p22n(Y(p[1]))+'" r="3.4" fill="'+P22_INK+'"/>';});
  (cfg.labels||[]).forEach(function(lb){o+=p22Txt(X(lb.x),Y(lb.y),lb.t,11,false,lb.anchor||"middle");});
  return p22Svg(W,H,o,"Graph diagram");
}
/* Signed number line for collinear legs. legs: [{v (signed), t (label)}].
   pos and neg name the two directions (positive direction first). */
function p22Collinear(legs,pos,neg,start,note){
  var cums=[start||0]; legs.forEach(function(l){cums.push(cums[cums.length-1]+l.v);});
  var lo=Math.min.apply(null,cums.concat([0])),hi=Math.max.apply(null,cums.concat([0]));
  if(hi-lo<1){hi+=1;lo-=1;}
  var pad=(hi-lo)*0.14; lo-=pad; hi+=pad;
  var W=340,H=64+legs.length*34+(note?16:0),L=26,R=26,AX=H-30-(note?16:0);
  function X(v){return L+(W-L-R)*(v-lo)/(hi-lo);}
  var o="";
  if(note)o+=p22Txt(W/2,H-8,note,11,false);
  o+=p22Arrow(L,AX,W-8,AX,1.8);
  o+=p22Txt(W-10,AX-12,pos,11,true,"end")+p22Txt(10,AX-12,neg,11,true,"start");
  var seen={};
  cums.forEach(function(c){var k=Math.round(c*1000); if(seen[k])return; seen[k]=1;
    o+=p22Line(X(c),AX-5,X(c),AX+5,2)+p22Txt(X(c),AX+16,gF(c),11,false);});
  legs.forEach(function(l,i){var y=26+i*34,x1=X(cums[i]),x2=X(cums[i+1]);
    o+=p22Arrow(x1,y,x2,y,2.4,i%2?P22_ALT:P22_ACC);
    o+=p22Txt((x1+x2)/2,y-13,l.t,11,false);});
  return p22Svg(W,H,o,"Number line diagram");
}
/* Position line with an origin: a start west of the origin and an end east. */
function p22PosLine(west,east){
  var legs=[{v:west+east,t:"start "+gF(-west)+" m to end "+gF(east)+" m"}];
  return p22Collinear(legs,"east","west",-west,null);
}
/* Horizontal vector lanes, one arrow per lane, from a shared origin. */
function p22VecLanes(lanes){
  var mx=1; lanes.forEach(function(l){mx=Math.max(mx,Math.abs(l.v));});
  var W=340,H=lanes.length*46+10,OX=178;
  var o="";
  lanes.forEach(function(l,i){var y=26+i*46,len=104*Math.abs(l.v)/mx,dir=l.east?1:-1;
    o+=p22Txt(10,y-12,l.t,11,false,"start");
    o+=p22Line(20,y+8,W-20,y+8,1,"",  "#b9cdc2");
    o+=p22Arrow(OX,y+8,OX+dir*len,y+8,2.6,P22_ACC);});
  return p22Svg(W,H,o,"Vector diagram");
}
/* Free body style diagram. forces: [{dx,dy,len,t,oy,alt}] directions in
   screen units; lengths scale to the largest force when values are given. */
function p22FBD(forces,objLabel){
  var W=340,H=210,CX=170,CY=102,mx=1;
  forces.forEach(function(f){if(f.len)mx=Math.max(mx,f.len);});
  var o=p22Rect(CX-32,CY-21,64,42,"#ffffff");
  if(objLabel)o+=p22Txt(CX,CY,objLabel,11,true);
  forces.forEach(function(f){var len=f.len?30+52*f.len/mx:56;
    var ux=f.dx,uy=f.dy,n=Math.sqrt(ux*ux+uy*uy)||1; ux/=n; uy/=n;
    var oy=f.oy||0,x1=CX+ux*34,y1=CY+uy*23+oy,x2=CX+ux*(34+len),y2=CY+uy*(23+len)+oy;
    if(ux!==0){y1=CY+oy;y2=CY+oy;x1=CX+ux*32;}
    if(uy!==0){x1=CX;x2=CX;}
    o+=p22Arrow(x1,y1,x2,y2,2.4,f.alt?P22_ALT:P22_ACC);
    o+=p22Txt(x2+ux*8,y2+uy*14+(ux!==0?-10:0),f.t,11,false,ux>0?"start":(ux<0?"end":"middle"));});
  return p22Svg(W,H,o,"Force diagram");
}
/* Single angled vector with dashed component guides. */
function p22VecAng(flabel,ang){
  var W=340,H=210,OX=70,OY=168,LEN=190,rad=ang*Math.PI/180;
  var ex=OX+LEN*Math.cos(rad),ey=OY-LEN*Math.sin(rad);
  var o=p22Line(OX,OY,ex,OY,1.4,true)+p22Line(ex,OY,ex,ey,1.4,true);
  o+=p22Line(OX,OY,OX+LEN+34,OY,1.4,true);
  o+=p22Arrow(OX,OY,ex,ey,2.6);
  o+=p22Txt((OX+ex)/2+16,(OY+ey)/2-10,flabel,12,true);
  o+='<path d="M '+p22n(OX+44)+' '+p22n(OY)+' A 44 44 0 0 0 '+p22n(OX+44*Math.cos(rad))+' '+p22n(OY-44*Math.sin(rad))+'" fill="none" stroke="'+P22_INK+'" stroke-width="1.6"/>';
  o+=p22Txt(OX+62,OY-14,ang+"\u00B0",12,false);
  return p22Svg(W,H,o,"Angled force diagram");
}
/* Two angled pulls, one north of east and one south of east. */
function p22VecPair(f1,a1,f2,a2){
  var W=340,H=230,OX=60,OY=115,LEN=150;
  var r1=a1*Math.PI/180,r2=a2*Math.PI/180;
  var e1=[OX+LEN*Math.cos(r1),OY-LEN*Math.sin(r1)],e2=[OX+LEN*Math.cos(r2),OY+LEN*Math.sin(r2)];
  var o=p22Line(OX,OY,OX+LEN+52,OY,1.4,true)+p22Txt(OX+LEN+58,OY,"east",11,true,"start");
  o+=p22Arrow(OX,OY,e1[0],e1[1],2.6)+p22Arrow(OX,OY,e2[0],e2[1],2.6,P22_ALT);
  o+=p22Txt(e1[0],e1[1]-14,f1+" at "+a1+"\u00B0 north of east",11,false);
  o+=p22Txt(e2[0],e2[1]+16,f2+" at "+a2+"\u00B0 south of east",11,false);
  return p22Svg(W,H,o,"Two angled forces diagram");
}
/* Box on a floor with an angled rope pull (mode pull) or an angled push
   (mode push). fricLabel, when given, adds an unvalued friction arrow. */
function p22AngScene(flabel,ang,mode,fricLabel){
  var W=340,H=205,BX=140,BY=118,BW=74,BH=44,rad=ang*Math.PI/180;
  var o=p22Line(24,BY+BH,316,BY+BH,2.4);
  for(var gx=34;gx<316;gx+=18)o+=p22Line(gx,BY+BH,gx-8,BY+BH+8,1);
  o+=p22Rect(BX,BY,BW,BH,"#ffffff");
  if(mode==="push"){
    var sx=BX-96*Math.cos(rad),sy=BY-96*Math.sin(rad);
    o+=p22Arrow(sx,sy,BX+6,BY+10,2.6);
    o+=p22Txt(sx-4,sy-14,flabel+" at "+ang+"\u00B0 below horizontal",11,false,"end");
  }else{
    var ex=BX+BW+96*Math.cos(rad),ey=BY+6-96*Math.sin(rad);
    o+=p22Line(BX+BW,BY+10,ex,ey,2)+p22Arrow(BX+BW,BY+10,ex,ey,2.6);
    o+=p22Txt(ex-6,ey-14,flabel+" at "+ang+"\u00B0",11,false,"end");
  }
  if(fricLabel)o+=p22Arrow(BX+8,BY+BH-6,BX-52,BY+BH-6,2.2,P22_ALT)+p22Txt(BX-56,BY+BH-18,fricLabel,11,false,"end");
  return p22Svg(W,H,o,"Angled force scene diagram");
}
/* Simple scenes for the free body diagram choice entry: the setting only,
   with no force arrows, because the force list is what the question asks. */
function p22Scene(kind){
  var W=340,H=190,o="";
  if(kind==="book"){
    o+=p22Line(30,140,310,140,2.4)+p22Rect(128,108,84,32,"#ffffff")+p22Txt(170,124,"book",12,true);
  }else if(kind==="puck"){
    o+=p22Line(30,140,310,140,2.4)+'<ellipse cx="170" cy="132" rx="34" ry="10" fill="none" stroke="'+P22_INK+'" stroke-width="2"/>';
    o+=p22Arrow(120,96,220,96,2.2,P22_ALT)+p22Txt(170,80,"slides east",11,false);
  }else if(kind==="crate"){
    o+=p22Line(30,140,310,140,2.4)+p22Rect(128,100,84,40,"#ffffff")+p22Txt(170,120,"crate",12,true);
    o+=p22Line(212,112,282,112,2)+p22Txt(268,98,"rope",11,false);
  }else if(kind==="ball"){
    o+='<circle cx="170" cy="70" r="18" fill="none" stroke="'+P22_INK+'" stroke-width="2"/>';
    o+=p22Line(170,96,170,140,1.6,true)+p22Arrow(170,140,170,158,2,P22_ALT)+p22Txt(196,140,"falling",11,false,"start");
    o+=p22Line(60,168,280,168,2.4);
  }else if(kind==="bucket"){
    o+=p22Line(90,26,250,26,2.4)+p22Line(170,26,170,84,2);
    o+=p22Rect(144,84,52,40,"#ffffff")+p22Txt(170,104,"bucket",11,true);
  }
  return p22Svg(W,H,o,"Scene diagram");
}
function p22Connected(m1,m2,flabel){
  var W=340,H=170,o=p22Line(20,132,320,132,2.4);
  o+=p22Rect(52,88,72,44,"#ffffff")+p22Txt(88,110,m1,12,true);
  o+=p22Line(124,110,168,110,2);
  o+=p22Rect(168,88,72,44,"#ffffff")+p22Txt(204,110,m2,12,true);
  o+=p22Arrow(240,110,308,110,2.6)+p22Txt(292,92,flabel,12,true,"end");
  return p22Svg(W,H,o,"Connected crates diagram");
}
function p22Atwood(mh,ml){
  var W=340,H=215,o="";
  o+='<circle cx="170" cy="42" r="17" fill="none" stroke="'+P22_INK+'" stroke-width="2"/>';
  o+=p22Line(170,25,170,8,2.4)+p22Line(120,8,220,8,2.4);
  o+='<path d="M 153 42 L 153 108 M 187 42 L 187 84" stroke="'+P22_INK+'" stroke-width="2" fill="none"/>';
  o+=p22Rect(122,108,62,46,"#ffffff")+p22Txt(153,131,mh,12,true);
  o+=p22Rect(156,84,62,46,"#ffffff");
  o+=p22Txt(187,107,ml,12,true);
  o+=p22Txt(88,131,"heavier",11,false)+p22Txt(252,107,"lighter",11,false);
  return p22Svg(W,H,o,"Atwood machine diagram");
}
function p22Elevator(mlabel,alabel,up){
  var W=340,H=215,o="";
  o+=p22Rect(112,18,116,178,"none");
  o+='<circle cx="170" cy="86" r="13" fill="none" stroke="'+P22_INK+'" stroke-width="2"/>';
  o+=p22Line(170,99,170,140,2)+p22Line(170,112,146,126,2)+p22Line(170,112,194,126,2);
  o+=p22Line(170,140,152,168,2)+p22Line(170,140,188,168,2);
  o+=p22Rect(140,168,60,10,P22_SHADE)+p22Txt(170,206,mlabel,11,true);
  var ay=up?70:150;
  o+=up?p22Arrow(262,150,262,70,2.6):p22Arrow(262,70,262,150,2.6);
  o+=p22Txt(262,ay-22,"a = "+alabel,11,true);
  o+=p22Txt(262,196,"elevator",11,false);
  return p22Svg(W,H,o,"Elevator diagram");
}
function p22Pendulum(dhlabel,mlabel){
  var W=340,H=215,o="";
  o+=p22Line(120,18,220,18,2.6);
  var px=170,py=18,L=118,a=0.72;
  var rx=px+L*Math.sin(a),ry=py+L*Math.cos(a);
  o+=p22Line(px,py,px,py+L,1.4,true);
  o+='<circle cx="'+p22n(px)+'" cy="'+p22n(py+L)+'" r="15" fill="none" stroke="'+P22_INK+'" stroke-width="1.6" stroke-dasharray="4 3"/>';
  o+=p22Line(px,py,rx,ry,2);
  o+='<circle cx="'+p22n(rx)+'" cy="'+p22n(ry)+'" r="16" fill="#ffffff" stroke="'+P22_INK+'" stroke-width="2"/>';
  o+=p22Txt(rx,ry,mlabel,10,true);
  o+=p22Line(rx,ry,296,ry,1.2,true)+p22Line(px,py+L,296,py+L,1.2,true);
  o+=p22Arrow(296,ry,296,py+L,1.8)+p22Txt(302,(ry+py+L)/2,dhlabel,11,false,"start");
  o+=p22Txt(px-8,py+L+22,"lowest position",10,false,"end");
  return p22Svg(W,H,o,"Pendulum diagram");
}
function p22Incline(hlabel){
  var W=340,H=200,o="";
  o+=p22Line(50,168,300,168,2.4)+p22Line(50,168,50,52,2)+p22Line(50,52,300,168,2.4);
  o+=p22Arrow(56,52,56,168,1.8)+p22Txt(38,110,hlabel,12,true,"end");
  o+=p22Rect(66,30,40,24,"#ffffff")+p22Txt(86,20,"sled",11,false);
  o+=p22Txt(210,186,"bottom (reference level)",11,false);
  return p22Svg(W,H,o,"Slope diagram");
}
/* Horizontal spring scene. xlabel labels the stretch or displacement
   bracket, flabel labels the force arrow (or "?" when it is asked). */
function p22Spring(xlabel,flabel){
  var W=340,H=170,o="";
  o+=p22Rect(28,44,10,86,P22_SHADE)+p22Line(20,150,320,150,2.4);
  var path="M 38 92 ",x=38;
  for(var i=0;i<7;i++){x+=13;path+="L "+x+" "+(i%2?74:110)+" ";}
  path+="L 150 92";
  o+='<path d="'+path+'" fill="none" stroke="'+P22_INK+'" stroke-width="2"/>';
  o+=p22Rect(150,66,58,52,"#ffffff");
  o+=p22Line(122,44,122,132,1.4,true)+p22Txt(122,32,"equilibrium",10,false);
  o+=p22Line(122,140,208,140,1.6)+p22Line(122,134,122,146,1.6)+p22Line(208,134,208,146,1.6);
  o+=p22Txt(165,158,xlabel,11,true);
  if(flabel)o+=p22Arrow(208,92,272,92,2.4)+p22Txt(262,74,flabel,12,true,"end");
  return p22Svg(W,H,o,"Spring diagram");
}
/* Transverse wave train. totalCycles cycles are drawn; a bracket spans the
   first bracketCycles cycles (or the whole train when bracketCycles is 0). */
function p22WaveTrain(totalCycles,bracketCycles,bracketLabel,opts){
  opts=opts||{};
  var W=340,H=185,amp=opts.asym?36:30,tamp=opts.asym?9:30;
  var x0=22,x1=318,y0=92,pts=[];
  for(var i=0;i<=160;i++){var u=i/160,ph=u*totalCycles*2*Math.PI,s=Math.sin(ph);
    pts.push([x0+(x1-x0)*u,y0-(s>=0?amp*s:tamp*s)]);}
  var o=p22Line(x0,y0,x1,y0,1.2,true);
  o+='<path d="'+pts.map(function(p,i){return (i?"L":"M")+p22n(p[0])+" "+p22n(p[1]);}).join(" ")+'" fill="none" stroke="'+P22_ACC+'" stroke-width="2.4"/>';
  if(opts.rest)o+=p22Txt(x1-2,y0+16,"rest position",10,false,"end");
  var bc=bracketCycles||totalCycles;
  if(bracketLabel){var bx1=x0+(x1-x0)*bc/totalCycles,by=30;
    o+=p22Line(x0,by,x0,by+10,1.6)+p22Line(bx1,by,bx1,by+10,1.6)+p22Line(x0,by+5,bx1,by+5,1.6);
    o+=p22Txt((x0+bx1)/2,by-8,bracketLabel,12,true);}
  return p22Svg(W,H,o,"Wave diagram");
}
/* Longitudinal wave: vertical coil lines, clustered at compressions. */
function p22Longit(bracket){
  var W=340,H=160,o="",xs=[];
  var centres=[70,170,270];
  centres.forEach(function(c){[-14,-7,0,7,14].forEach(function(d){xs.push(c+d);});});
  [118,218,314].forEach(function(c){xs.push(c);});
  xs.sort(function(a,b){return a-b;});
  xs.forEach(function(x){o+=p22Line(x,52,x,118,1.8);});
  o+=p22Txt(70,138,"compression",10,false)+p22Txt(170,138,"compression",10,false);
  if(bracket){o+=p22Line(70,26,70,36,1.6)+p22Line(170,26,170,36,1.6)+p22Line(70,31,170,31,1.6);
    o+=p22Txt(120,18,"?",13,true);}
  return p22Svg(W,H,o,"Longitudinal wave diagram");
}
/* Two pulses on a rope moving toward each other. pulses: [{h,t,dir}] with
   h in cm as stated in the stem (sign gives crest or trough). */
function p22Pulses(pulses){
  var W=340,H=185,y0=104,o=p22Line(18,y0,322,y0,1.8);
  var spots=[105,235];
  pulses.forEach(function(p,i){var cx=spots[i],hh=p.h*7;
    o+='<path d="M '+p22n(cx-34)+' '+y0+' L '+p22n(cx)+' '+p22n(y0-hh)+' L '+p22n(cx+34)+' '+y0+'" fill="none" stroke="'+P22_ACC+'" stroke-width="2.4"/>';
    o+=p22Arrow(cx-22*p.dir,y0-52,cx+22*p.dir,y0-52,2,P22_ALT);
    o+=p22Txt(cx,y0-hh+(p.h>=0?-14:20),p.t,11,false);});
  return p22Svg(W,H,o,"Pulses on a rope diagram");
}
function p22PulseEnd(kind){
  var W=340,H=185,y0=104,o=p22Line(18,y0,268,y0,1.8);
  o+='<path d="M 102 '+y0+' L 140 '+p22n(y0-38)+' L 178 '+y0+'" fill="none" stroke="'+P22_ACC+'" stroke-width="2.4"/>';
  o+=p22Arrow(96,58,150,58,2,P22_ALT)+p22Txt(120,44,"pulse",11,false);
  if(kind==="fixed"){
    o+=p22Rect(268,44,10,120,P22_SHADE)+p22Txt(290,170,"fixed end (wall)",10,false);
  }else{
    o+=p22Line(278,36,278,164,2.6)+'<circle cx="268" cy="'+y0+'" r="9" fill="none" stroke="'+P22_INK+'" stroke-width="2"/>';
    o+=p22Txt(292,170,"free end (ring on a post)",10,false);
  }
  return p22Svg(W,H,o,"Pulse at the end of a rope diagram");
}
function p22StandString(n,llabel){
  var W=340,H=180,x0=34,x1=306,y0=92,pts=[],env=[];
  for(var i=0;i<=160;i++){var u=i/160;pts.push([x0+(x1-x0)*u,y0-34*Math.sin(u*n*Math.PI)]);
    env.push([x0+(x1-x0)*u,y0+34*Math.sin(u*n*Math.PI)]);}
  var o=p22Rect(24,58,10,68,P22_SHADE)+p22Rect(306,58,10,68,P22_SHADE);
  o+='<path d="'+pts.map(function(p,i){return (i?"L":"M")+p22n(p[0])+" "+p22n(p[1]);}).join(" ")+'" fill="none" stroke="'+P22_ACC+'" stroke-width="2.2"/>';
  o+='<path d="'+env.map(function(p,i){return (i?"L":"M")+p22n(p[0])+" "+p22n(p[1]);}).join(" ")+'" fill="none" stroke="'+P22_INK+'" stroke-width="1.2" stroke-dasharray="4 3"/>';
  o+=p22Line(x0,146,x1,146,1.6)+p22Line(x0,140,x0,152,1.6)+p22Line(x1,140,x1,152,1.6);
  o+=p22Txt((x0+x1)/2,162,llabel,12,true);
  o+=p22Txt((x0+x1)/2,26,"harmonic "+n,11,false);
  return p22Svg(W,H,o,"Standing wave on a string diagram");
}
/* Air column. kind "open": mode is the resonance number (antinodes at both
   ends). kind "closed": mode is the odd quarter wave count (node at the
   closed end, antinode at the open end). */
function p22Column(kind,mode,llabel,modelabel){
  var W=340,H=180,x0=52,x1=296,y0=88,pts=[];
  for(var i=0;i<=140;i++){var u=i/140;
    var v=kind==="open"?Math.cos(u*mode*Math.PI):Math.sin(u*mode*Math.PI/2);
    pts.push([x0+(x1-x0)*u,y0-26*v]);}
  var o="";
  if(kind==="closed")o+=p22Rect(x0-10,58,10,60,P22_SHADE);
  o+=p22Line(x0,58,x1,58,2.2)+p22Line(x0,118,x1,118,2.2);
  if(kind==="open")o+=p22Line(x1,58,x1,118,1.2,true);
  o+='<path d="'+pts.map(function(p,i){return (i?"L":"M")+p22n(p[0])+" "+p22n(p[1]);}).join(" ")+'" fill="none" stroke="'+P22_ACC+'" stroke-width="2.2"/>';
  o+=p22Line(x0,142,x1,142,1.6)+p22Line(x0,136,x0,148,1.6)+p22Line(x1,136,x1,148,1.6);
  o+=p22Txt((x0+x1)/2,160,llabel,12,true);
  o+=p22Txt((x0+x1)/2,32,modelabel,11,false);
  o+=p22Txt(kind==="closed"?x0-16:x0-30,44,kind==="closed"?"closed":"open",10,false);
  o+=p22Txt(x1+22,44,"open",10,false);
  return p22Svg(W,H,o,"Air column diagram");
}
function p22TwoColumns(l1,l2){
  var W=340,H=190,o="";
  o+=p22Rect(70,58,44,84,"none")+p22Rect(70,58,44,10,P22_SHADE);
  o+=p22Rect(220,34,44,108,"none")+p22Rect(220,34,44,10,P22_SHADE);
  o+=p22Txt(92,162,"first resonance",10,false)+p22Txt(92,178,l1,11,true);
  o+=p22Txt(242,162,"next resonance",10,false)+p22Txt(242,178,l2,11,true);
  o+=p22Txt(170,20,"closed air column",11,false);
  return p22Svg(W,H,o,"Resonance column diagram");
}
/* Double slit schematic (not to scale): slit separation d, screen
   distance L, fringe offset x on the screen for bright fringe m. */
function p22Slit(dlabel,llabel,xlabel,m){
  var W=340,H=200,o="";
  o+=p22Arrow(18,100,104,100,2)+p22Txt(56,84,"light",11,false);
  o+=p22Line(120,34,120,166,3);
  o+='<rect x="114" y="82" width="12" height="10" fill="#ffffff"/>'+'<rect x="114" y="108" width="12" height="10" fill="#ffffff"/>';
  o+=p22Line(140,87,140,113,1.4)+p22Arrow(140,87,140,96,1.4)+p22Arrow(140,113,140,104,1.4);
  o+=p22Txt(160,100,"d = "+dlabel,11,false,"start");
  o+=p22Line(120,182,300,182,1.6)+p22Line(120,176,120,188,1.6)+p22Line(300,176,300,188,1.6);
  o+=p22Txt(210,196,"L = "+llabel,11,true);
  o+=p22Line(300,34,300,166,3);
  o+=p22Line(120,100,300,100,1.2,true);
  o+='<circle cx="300" cy="100" r="3.4" fill="'+P22_INK+'"/>';
  o+=p22Txt(292,92,"central maximum",10,false,"end");
  var fy=100-34;
  o+='<circle cx="300" cy="'+fy+'" r="3.4" fill="'+P22_ALT+'"/>';
  o+=p22Txt(292,fy-12,"bright fringe "+m,10,false,"end");
  o+=p22Line(316,100,316,fy,1.6)+p22Txt(322,83,"x = "+xlabel,11,false,"start");
  o+=p22Txt(210,20,"not to scale",10,false);
  return p22Svg(W,H,o,"Double slit diagram");
}
/* Refraction at a flat boundary. Angles are degrees from the normal.
   The refracted label is supplied by the caller ("?" when it is asked). */
function p22Refract(med1,med2,th1label,th1,th2label,th2){
  var W=340,H=215,CX=170,CY=104,o="";
  o+=p22Rect(24,24,292,180,"none");
  o+=p22Line(24,CY,316,CY,2.4);
  o+=p22Line(CX,32,CX,196,1.4,true)+p22Txt(CX+8,40,"normal",10,false,"start");
  o+=p22Txt(36,44,med1,12,true,"start")+p22Txt(36,196-24,med2,12,true,"start");
  var r1=th1*Math.PI/180,L1=86;
  var ix=CX-L1*Math.sin(r1),iy=CY-L1*Math.cos(r1);
  o+=p22Arrow(ix,iy,CX,CY,2.6);
  o+=p22Txt((ix+CX)/2-8,(iy+CY)/2-8,th1label,12,true,"end");
  var r2=th2*Math.PI/180,L2=80;
  var ex=CX+L2*Math.sin(r2),ey=CY+L2*Math.cos(r2);
  o+=p22Arrow(CX,CY,ex,ey,2.6,P22_ALT);
  o+=p22Txt((CX+ex)/2+10,(CY+ey)/2+6,th2label,12,true,"start");
  return p22Svg(W,H,o,"Refraction diagram");
}
/* Motion graph shapes for the bridging description entry. */
function p22Shape(kind,note){
  var W=340,H=200,L=52,B=158,T=26,R=312;
  var o=p22Arrow(L,B,R,B,1.8)+p22Arrow(L,B,L,T,1.8);
  o+=p22Txt((L+R)/2,186,"time",11,true)+p22Txt(20,(T+B)/2,"distance",11,true);
  var path="";
  if(kind==="line")path="M "+L+" 132 L "+R+" 44";
  else if(kind==="flat")path="M "+L+" 84 L "+R+" 84";
  else if(kind==="riseflat")path="M "+L+" 132 L 150 74 L 208 74 L "+R+" 34";
  else if(kind==="fall")path="M "+L+" 44 L "+R+" 132";
  else path="M "+L+" 140 C 190 132, 250 104, "+R+" 36";
  o+='<path d="'+path+'" fill="none" stroke="'+P22_ACC+'" stroke-width="2.4"/>';
  if(note)o+=p22Txt((L+R)/2,20,note,11,false);
  return p22Svg(W,H,o,"Distance time graph diagram");
}
/* Energy bar chart (Tranche 6, Nov 2026). bars: [{t (category label),
   v (numeric value, sets the height), vl (value label printed above the
   bar)}]. Heights are proportional to the values. Callers pass only
   values the stem itself states, so the chart never displays a computed
   answer or a computed remainder as a bar. */
function p22Bars(bars){
  var W=340,H=212,BASE=164,MAXH=112,mx=0;
  bars.forEach(function(b){mx=Math.max(mx,b.v);});
  var cols=[P22_ACC,P22_ALT,"#476b8a"];
  var o=p22Txt(22,18,"energy (J)",11,true,"start");
  var slot=(W-76)/bars.length,bw=Math.min(88,slot*0.52);
  bars.forEach(function(b,i){
    var cx=48+slot*i+slot/2,bh=MAXH*b.v/mx;
    o+='<rect x="'+p22n(cx-bw/2)+'" y="'+p22n(BASE-bh)+'" width="'+p22n(bw)+'" height="'+p22n(bh)+'" fill="'+cols[i%3]+'" stroke="'+P22_INK+'" stroke-width="1.6"/>';
    o+=p22Txt(cx,BASE-bh-12,b.vl,12,true);
    o+=p22Txt(cx,BASE+17,b.t,11,false);
  });
  o+=p22Line(30,BASE,324,BASE,2);
  return p22Svg(W,H,o,"Energy bar chart: bar heights are proportional to the energy values labelled, which are the values stated in the question");
}
/* Ramp and incline diagram (Tranche 6, Nov 2026). cfg: hLabel (label for
   the full height bracket), h and h2 with h2Label (a second, lower point
   on the slope, its height bracket drawn at the right), sLabel (label
   along the slope), ref (mark the bottom as the reference level).
   When cfg.s is given and longer than cfg.h, the slope is drawn to
   scale from the draw's own height and slope length; otherwise the
   slope shape is the bank's standard schematic (as in p22Incline) and
   only the labels carry the draw's values. The unknown a question asks
   for is never encoded: a caller asking for a height passes "?" as its
   label and no s, so the shape stays schematic. */
function p22Ramp(cfg){
  var W=340,H=200,GY=168,TX=66,Hpx=110,RUN=222,toScale=false;
  if(cfg.h&&cfg.s&&cfg.s>cfg.h){
    var run=Math.sqrt(cfg.s*cfg.s-cfg.h*cfg.h),k=Math.min(110/cfg.h,222/run);
    Hpx=cfg.h*k; RUN=run*k; toScale=true;
  }
  var Tx=TX,Ty=GY-Hpx,Bx=TX+RUN;
  var o=p22Line(26,GY,322,GY,2.4);
  o+=p22Line(Tx,Ty,Tx,GY,1.4,true);
  o+=p22Line(Tx,Ty,Bx,GY,2.6);
  var fx=Tx+0.10*RUN,fy=Ty+0.10*Hpx;
  o+=p22Rect(fx-2,fy-17,32,17,"#ffffff");
  o+=p22Line(46,Ty,46,GY,1.6)+p22Line(41,Ty,51,Ty,1.6)+p22Line(41,GY,51,GY,1.6);
  o+=p22Txt(40,(Ty+GY)/2,cfg.hLabel,12,true,"end");
  if(cfg.h2Label&&cfg.h&&cfg.h2){
    var f=(cfg.h-cfg.h2)/cfg.h,Px=Tx+RUN*f,Py=Ty+Hpx*f;
    o+='<circle cx="'+p22n(Px)+'" cy="'+p22n(Py)+'" r="3.4" fill="'+P22_INK+'"/>';
    o+=p22Line(Px,Py,304,Py,1.2,true);
    o+=p22Line(304,Py,304,GY,1.6)+p22Line(299,Py,309,Py,1.6)+p22Line(299,GY,309,GY,1.6);
    o+=p22Txt(Px-8,Py-12,cfg.h2Label,11,true,"end");
  }
  if(cfg.sLabel){
    var mxp=(Tx+Bx)/2,myp=(Ty+GY)/2,len=Math.sqrt(RUN*RUN+Hpx*Hpx);
    o+=p22Txt(mxp+Hpx/len*17,myp-RUN/len*17,cfg.sLabel,12,true);
  }
  if(cfg.ref)o+=p22Txt(318,190,"bottom (reference level)",10,false,"end");
  return p22Svg(W,H,o,"Ramp diagram: a block at the top of a slope, with the heights and slope length labelled as in the question"+(toScale?"; the slope is drawn to scale from those values":""));
}
/* Half life decay curve through the three points the stem states. */
function p22Decay(M0,T,unit){
  var pts=[];
  for(var i=0;i<=60;i++){var t=2*T*i/60;pts.push([t,M0*Math.pow(0.5,t/T)]);}
  return p22Plot({series:[{pts:pts}],dots:false,
    xt:[[0,"0"],[T,String(T)],[2*T,String(2*T)]],
    yt:[[M0/4,String(M0/4)],[M0/2,String(M0/2)],[M0,String(M0)]],
    xmax:2*T*1.12,ymax:M0*1.15,xl:"time ("+unit+")",yl:"mass (g)",
    markPts:[[0,M0],[T,M0/2],[2*T,M0/4]]});
}

/* ----- bank-u1.js ----- */
// Diagram figures (Phase C, Nov 2026): signed number lines, motion graphs and relative motion vector lanes added where the source types carried diagrams; see bank-helpers.js p22 helpers.
// Physics 2204 Unit 1 Kinematics question bank
// CRMARKS: u1-52-stopping-cr=5
// CRMARKS: u1-52-freefall-cr=4
// CRMARKS: u1-53-relative-cr=4
// CRMARKS: u1-51-vectors-cr=3
// CRMARKS: u1-52-graph-cr=3
// CRMARKS: u1-53-meet-cr=2

/* ---------- PH11.5.1 Vectors for displacement, velocity, acceleration ---------- */

E("u1-51-signed-add",1,["PH11.5.1"],2,"gen",function(){
  var a=ri(30,80),b=ri(10,70);
  var disp=a-b,ans=sfR(disp,3);
  var dist=a+b;
  var sol="Take east as positive, so the east leg is positive and the west leg counts against it. The total distance walked is found from "+iF(a)+" + "+iF(b)+" = "+iF(dist)+" m. ";
  if(disp>=0){sol+="The displacement is the signed sum of the legs: "+iF(a)+" - "+iF(b)+" = "+iF(disp)+" m. The displacement is <b>"+F3(ans)+" m</b>, east of the starting point.";}
  else{var mag=-disp;sol+="The west leg is larger. Its size is "+iF(b)+" - "+iF(a)+" = "+iF(mag)+" m, and because it points west the signed displacement is negative. The displacement is <b>"+F3(ans)+" m</b>, and the negative sign means west.";}
  var q=numq("Take east as positive. A hiker in Gros Morne walks "+gF(a)+" m east along a trail, then turns around and walks "+gF(b)+" m west. Calculate the hiker's displacement. Give your answer in m.",
    ans,Math.max(0.02*Math.abs(ans),0.05),sol,{a:a,b:b});
    q.figure=p22Collinear([{v:a,t:gF(a)+" m east"},{v:-b,t:gF(b)+" m west"}],"east","west");return q;
});

E("u1-51-vectors-cr",1,["PH11.5.1"],2,"gen",function(){
  var a=ri(20,60),b=ri(10,30),c=ri(15,50);
  var eastTotal=a+c,disp=eastTotal-b,dist=eastTotal+b,ans=sfR(disp,3);
  var sol="Take east as positive. First combine the two east legs: "+iF(a)+" + "+iF(c)+" = "+iF(eastTotal)+" m east. The west leg points the other way, so subtract it: "+iF(eastTotal)+" - "+iF(b)+" = "+iF(disp)+" m. As a check, the total distance walked is "+iF(eastTotal)+" + "+iF(b)+" = "+iF(dist)+" m, which is larger than the displacement because part of the walk was backtracked. The positive sign means the net change of position is toward the east. The displacement is <b>"+F3(ans)+" m</b> east.";
  var q=numq("Take east as positive. A delivery cyclist in St. John's rides "+gF(a)+" m east, then "+gF(b)+" m west, then "+gF(c)+" m east again. Calculate the cyclist's displacement. Give your answer in m.",
    ans,Math.max(0.02*Math.abs(ans),0.05),sol,{a:a,b:b,c:c});
    q.figure=p22Collinear([{v:a,t:gF(a)+" m east"},{v:-b,t:gF(b)+" m west"},{v:c,t:gF(c)+" m east"}],"east","west");return q;
});

E("u1-51-distance-vs-disp",1,["PH11.5.1"],1,"gen",function(){
  var a=ri(25,70),b=ri(5,20); if(b>=a)b=a-7;
  var dist=a+b,disp=a-b;
  var q=mcq("Take east as positive. A student walks "+gF(a)+" m east across the school yard, then walks "+gF(b)+" m west. Which pair gives the distance walked and the displacement?",
    "Distance "+F3(dist)+" m, displacement "+F3(disp)+" m east",
    ["Distance "+F3(disp)+" m, displacement "+F3(dist)+" m east",
     "Distance "+F3(dist)+" m, displacement "+F3(dist)+" m east",
     "Distance "+F3(disp)+" m, displacement "+F3(disp)+" m east"],
    "Distance is the full length of the path: "+iF(a)+" + "+iF(b)+" = "+iF(dist)+" m. Displacement is the signed change of position, with west counting against east: "+iF(a)+" - "+iF(b)+" = "+iF(disp)+" m, toward the east. Distance is a scalar and displacement is a vector, so the two are only equal when there is no backtracking.",{a:a,b:b});
    q.figure=p22Collinear([{v:a,t:gF(a)+" m east"},{v:-b,t:gF(b)+" m west"}],"east","west");return q;
});

E("u1-51-avg-velocity",1,["PH11.5.1"],2,"gen",function(){
  var d=pick([48,60,72,84,96,108,120]),t=pick([6,8,10,12]);
  var subj=pick(["A snowmobile","A delivery van","A ferry in a narrow channel","A cyclist","A tour boat","A school bus"]);
  var v=sfR(d/t,4);
  var q=mcq("Take east as positive. "+subj+" travels in a straight line and its displacement is "+gF(d)+" m east in "+gF(t)+" s. What is its average velocity?",
    F3(v)+" m/s east",
    [F3(d*t)+" m/s east",F3(v)+" m/s west",F3(sfR(v/2,4))+" m/s east"],
    "Average velocity is displacement divided by time, and it keeps the direction of the displacement: "+iF(d)+" / "+iF(t)+" = "+iF(v)+" m/s. The average velocity is <b>"+F3(v)+" m/s east</b>. Multiplying instead of dividing, halving the value, or pointing it west are the errors in the other options.",{d:d,t:t});
    q.figure=p22Collinear([{v:d,t:gF(d)+" m east"}],"east","west");return q;
});

E("u1-51-convert-speed",1,["PH11.5.1"],1,"gen",function(){
  var kmh=pick([36,54,72,90,108,126]),ms=sfR(kmh/3.6,4);
  var veh=pick(["A ferry","A snowmobile","A tour bus","A delivery truck","A fishing boat","A train","A coast guard vessel","A snowplow"]),route=pick([18,24,32,45,60,85,110,140]);
  return mcq(veh+" travels a straight route of "+gF(route)+" km at "+gF(kmh)+" km/h. What is this speed in m/s?",
    F3(ms)+" m/s",
    [F3(kmh*3.6)+" m/s",F3(kmh)+" m/s",F3(sfR(kmh/1.8,4))+" m/s"],
    "To change km/h into m/s, divide by 3.6, because each kilometre is 1000 m and each hour is 3600 s: "+iF(kmh)+" / "+iF(3.6)+" = "+iF(ms)+" m/s. The speed is <b>"+F3(ms)+" m/s</b>. Multiplying by 3.6 goes the wrong way, from m/s to km/h.",{kmh:kmh});
});

E("u1-51-accel-direction",1,["PH11.5.1"],1,"var",varset([
  function(){
    var v=ri(14,26);
    return textq("A car is travelling east at "+v+" m/s and the driver brakes steadily, so the car slows down while still moving east. Take east as positive. In one word, state the direction of the car's acceleration.",
      ["west"],
      "The car keeps moving east, but its velocity is shrinking, so the change in velocity points back toward the west. Acceleration follows the change in velocity, not the motion itself. The acceleration points <b>west</b>, opposite to the velocity.",{});
  },
  function(){
    var v=ri(6,14);
    return textq("A ball is tossed straight up at "+v+" m/s and is still rising. Take up as positive. In one word, state the direction of the ball's acceleration while it rises.",
      ["down","downward"],
      "Gravity pulls the ball back the whole time it is in the air, on the way up as well as on the way down. That is why the ball slows as it rises. The acceleration points <b>down</b>, opposite to the upward velocity.",{});
  },
  function(){
    var v=ri(8,18);
    return textq("A cyclist is travelling west at "+v+" m/s and pedals harder, speeding up while still moving west. Take east as positive. In one word, state the direction of the cyclist's acceleration.",
      ["west"],
      "The cyclist is speeding up in the westward direction, so the velocity is growing toward the west and the change in velocity points west. Acceleration follows the change in velocity. The acceleration points <b>west</b>, the same way as the velocity.",{});
  },
  function(){
    var v=ri(10,22);
    return textq("A puck slides east across the ice at "+v+" m/s and friction slows it steadily. Take east as positive. In one word, state the direction of the puck's acceleration.",
      ["west"],
      "Friction acts against the sliding, toward the west, and the puck's eastward velocity shrinks. The change in velocity points west, so the acceleration points <b>west</b>, opposite to the velocity.",{});
  },
  function(){
    var v=ri(12,24);
    return textq("A skier is sliding north at "+v+" m/s and digs in her edges, slowing down while still moving north. Take north as positive. In one word, state the direction of the skier's acceleration.",
      ["south"],
      "The skier keeps moving north, but her northward velocity is shrinking, so the change in velocity points back toward the south. The acceleration points <b>south</b>, opposite to the velocity.",{});
  }
]));

E("u1-51-signed-sum-choice",1,["PH11.5.1"],2,"gen",function(){
  var a=ri(40,80),b=ri(10,35),mag=a-b,disp=-mag;
  var q=mcq("Take north as positive. A kayaker paddles "+gF(a)+" m south from a dock, then paddles "+gF(b)+" m north. Which value is the kayaker's displacement?",
    F3(disp)+" m",
    [F3(mag)+" m",F3(-(a+b))+" m",F3(a+b)+" m"],
    "South is the negative direction here. The north leg only partly cancels the south leg: "+iF(a)+" - "+iF(b)+" = "+iF(mag)+" m of net southward travel. Keeping the sign for the southward direction gives a displacement of <b>"+F3(disp)+" m</b>. The negative sign means south. Adding the two legs gives the distance, not the displacement.",{a:a,b:b});
    q.figure=p22Collinear([{v:-a,t:gF(a)+" m south"},{v:b,t:gF(b)+" m north"}],"north","south");return q;
});

E("u1-51-position-change",1,["PH11.5.1"],2,"gen",function(){
  var west=ri(10,40),east=ri(10,60);
  var xi=-west,xf=east,disp=east+west,ans=sfR(disp,3);
  var q=numq("Take east as positive and the wharf as the origin. A boat starts at position "+gF(xi)+" m (west of the wharf) and ends at position "+gF(xf)+" m (east of the wharf). Calculate the boat's displacement. Give your answer in m.",
    ans,Math.max(0.02*Math.abs(ans),0.05),
    "Displacement is the change of position, final position minus initial position. The boat begins "+iF(west)+" m west of the origin and ends "+iF(east)+" m east of it, so it covers the whole span between the two positions: "+iF(west)+" + "+iF(east)+" = "+iF(disp)+" m. The displacement is <b>"+F3(ans)+" m</b>, toward the east.",{west:west,east:east});
    q.figure=p22PosLine(west,east);return q;
});

E("u1-51-collinear-combo",1,["PH11.5.1"],3,"gen",function(){
  var a=ri(30,60),b=ri(10,30),c=ri(20,50),t=pick([12,15,18,20,24,25,30]);
  var eastTotal=a+c,net=eastTotal-b,dist=eastTotal+b;
  var avgv=sfR(net/t,4),avgs=sfR(dist/t,4);
  var q=mcq("Take east as positive. A student walks "+gF(a)+" m east, then "+gF(b)+" m west, then "+gF(c)+" m east, and the whole walk takes "+gF(t)+" s. What is the student's average velocity?",
    F3(avgv)+" m/s east",
    [F3(avgs)+" m/s east",F3(net)+" m/s east",F3(avgv)+" m/s west"],
    "Average velocity needs the displacement first, not the distance. The east legs combine: "+iF(a)+" + "+iF(c)+" = "+iF(eastTotal)+" m. Subtracting the west leg: "+iF(eastTotal)+" - "+iF(b)+" = "+iF(net)+" m. Then divide by the time: "+iF(net)+" / "+iF(t)+" = "+iF(avgv)+" m/s. The average velocity is <b>"+F3(avgv)+" m/s east</b>. Using the total distance would give the average speed instead.",{a:a,b:b,c:c,t:t});
    q.figure=p22Collinear([{v:a,t:gF(a)+" m east"},{v:-b,t:gF(b)+" m west"},{v:c,t:gF(c)+" m east"}],"east","west");return q;
});

E("u1-51-graphical-add",1,["PH11.5.1"],3,"gen",function(){
  var a=ri(55,90),b=ri(20,44);
  var mag=a-b,len=sfR(mag/10,4),bothLen=sfR((a+b)/10,4);
  var q=mcq("On a scale diagram, 1 cm represents 10 m. A vector of "+gF(a)+" m east and a vector of "+gF(b)+" m west are drawn tip to tail. Which statement describes the resultant vector on the diagram?",
    "It is "+F3(len)+" cm long and points east",
    ["It is "+F3(bothLen)+" cm long and points east","It is "+F3(mag)+" cm long and points east","It is "+F3(len)+" cm long and points west"],
    "Graphical addition with opposite directions means the shorter arrow cancels part of the longer one: "+iF(a)+" - "+iF(b)+" = "+iF(mag)+" m, and the east arrow is longer, so the resultant points east. At the stated scale, each 10 m is drawn as 1 cm: "+iF(mag)+" / "+iF(10)+" = "+iF(len)+" cm. The resultant is <b>"+F3(len)+" cm long and points east</b>.",{a:a,b:b});
    q.figure=p22Collinear([{v:a,t:gF(a)+" m east"},{v:-b,t:gF(b)+" m west"}],"east","west",0,"Scale: 1 cm represents 10 m");return q;
});

/* ---------- PH11.5.2 Quantitative one-dimensional motion ---------- */

E("u1-52-vf-accel",1,["PH11.5.2"],2,"gen",function(){
  var vi=pick([4,6,8,10,12]),acc=pick([1.5,2,2.5,3]),t=ri(3,8);
  var gain=sfR(acc*t,4),vf=sfR(vi+gain,4);
  return mcq("Take the direction of motion as positive. A snowmobile starts at "+gF(vi)+" m/s and accelerates steadily at "+gF(acc)+" m/s^2 for "+gF(t)+" s. What is its final velocity?",
    F3(vf)+" m/s",
    [F3(vf)+" m/s in the opposite direction",F3(sfR(vi+acc,4))+" m/s",F3(sfR(vi+2*gain,4))+" m/s"],
    "Use the final velocity equation, final velocity is initial velocity plus acceleration times time. First the gain in velocity: "+iF(acc)+" × "+iF(t)+" = "+iF(gain)+" m/s. Then add the starting velocity: "+iF(vi)+" + "+iF(gain)+" = "+iF(vf)+" m/s. The final velocity is <b>"+F3(vf)+" m/s</b>.",{vi:vi,acc:acc,t:t});
});

E("u1-52-distance-accel",1,["PH11.5.2"],2,"gen",function(){
  var vi=pick([2,4,5,6,8]),acc=pick([1,2,3]),t=ri(3,7);
  var term1=vi*t,t2=t*t,accFull=sfR(acc*t2,4),term2=sfR(0.5*accFull,4),d=sfR(term1+term2,4),ans=sfR(d,3);
  var sol="Use the displacement equation, displacement is initial velocity times time plus one half times acceleration times time squared. The part from the starting velocity: "+iF(vi)+" × "+iF(t)+" = "+iF(term1)+" m. The time squared is "+iF(t)+" × "+iF(t)+" = "+iF(t2)+" s^2. The acceleration part before halving: "+iF(acc)+" × "+iF(t2)+" = "+iF(accFull)+" m, and half of that is "+iF(0.5)+" × "+iF(accFull)+" = "+iF(term2)+" m. Add the parts: "+iF(term1)+" + "+iF(term2)+" = "+iF(d)+" m. The displacement is <b>"+F3(ans)+" m</b>.";
  return numq("Take the direction of motion as positive. A quad bike starts at "+gF(vi)+" m/s and accelerates steadily at "+gF(acc)+" m/s^2 for "+gF(t)+" s. Calculate its displacement during this time. Give your answer in m.",
    ans,Math.max(0.02*Math.abs(ans),0.05),sol,{vi:vi,acc:acc,t:t});
});

E("u1-52-accel-find",1,["PH11.5.2"],2,"gen",function(){
  var acc=pick([1.5,2,2.5,3,4]),t=ri(4,10),vi=ri(2,15);
  var delta=sfR(acc*t,4),vf=sfR(vi+delta,4);
  return mcq("Take the direction of motion as positive. A cyclist speeds up steadily from "+gF(vi)+" m/s to "+gF(vf)+" m/s over "+gF(t)+" s. What is the cyclist's acceleration?",
    F3(acc)+" m/s^2",
    [F3(sfR(delta*t,4))+" m/s^2",F3(sfR(vf/t,4))+" m/s^2",F3(acc)+" m/s^2 in the opposite direction"],
    "Acceleration is the change in velocity divided by the time taken. The change in velocity: "+iF(vf)+" - "+iF(vi)+" = "+iF(delta)+" m/s. Divide by the time: "+iF(delta)+" / "+iF(t)+" = "+iF(acc)+" m/s^2. The acceleration is <b>"+F3(acc)+" m/s^2</b>, in the direction of motion because the cyclist is speeding up.",{acc:acc,t:t,vi:vi});
});

E("u1-52-time-find",1,["PH11.5.2"],2,"gen",function(){
  var acc=pick([1.5,2,2.5,3,4]),t=ri(4,12),vi=ri(2,14);
  var delta=sfR(acc*t,4),vf=sfR(vi+delta,4);
  return mcq("Take the direction of motion as positive. A car accelerates steadily at "+gF(acc)+" m/s^2, going from "+gF(vi)+" m/s to "+gF(vf)+" m/s. How long does this take?",
    F3(t)+" s",
    [F3(sfR(delta*acc,4))+" s",F3(delta)+" s",F3(sfR(t/2,4))+" s"],
    "Rearrange the final velocity equation to solve for time: time is the change in velocity divided by the acceleration. The change in velocity: "+iF(vf)+" - "+iF(vi)+" = "+iF(delta)+" m/s. Divide by the acceleration: "+iF(delta)+" / "+iF(acc)+" = "+iF(t)+" s. The time taken is <b>"+F3(t)+" s</b>. No quadratic is needed, because the acceleration equation is linear in time.",{acc:acc,t:t,vi:vi});
});

E("u1-52-freefall-distance",1,["PH11.5.2"],2,"gen",function(){
  var t=pick([1.2,1.5,1.8,2,2.2,2.5,2.8,3,3.2,3.5,4]),m=pick([0.40,0.55,0.70,0.85,1.10,1.30,1.60,2.00]);
  var ctx=pick(["A wrench is dropped from a scaffold","A buoy is dropped from a bridge deck","A stone is dropped from a cliff top","A tool bag is dropped from a lift platform"]);
  var t2=sfR(t*t,4),half=sfR(0.5*9.8,4),d=sfR(half*t2,4),ans=sfR(d,3);
  var sol="The object starts from rest and falls under gravity, so use displacement is one half times g times time squared, working with magnitudes and the word down. First the time squared: "+iF(t)+" × "+iF(t)+" = "+iF(t2)+" s^2. Half of g is "+iF(0.5)+" × "+iF(9.8)+" = "+iF(half)+" m/s^2. Then the distance: "+iF(half)+" × "+iF(t2)+" = "+iF(d)+" m. The mass does not enter the calculation, because in free fall all objects accelerate at g. The distance fallen is <b>"+F3(ans)+" m</b> down.";
  return numq(ctx+" and falls freely for "+gF(t)+" s before landing. The object has mass "+gF(m)+" kg and air resistance is negligible. Take g = 9.8 m/s^2. Calculate the distance it falls. Give your answer in m.",
    ans,Math.max(0.02*Math.abs(ans),0.05),sol,{t:t,m:m});
});

E("u1-52-freefall-speed",1,["PH11.5.2"],1,"gen",function(){
  var t=pick([0.8,1.1,1.4,1.7,2,2.3,2.6,2.9,3.2,3.5]),ctx=pick(["A dropped hammer","A dropped rope coil","A dropped marker buoy","A dropped ice chunk","A dropped wrench"]);
  var m=pick([0.30,0.45,0.60,0.90,1.20]);
  var vf=sfR(9.8*t,4),ans=sfR(vf,3);
  return numq(ctx+" of mass "+gF(m)+" kg falls freely from rest for "+gF(t)+" s. Air resistance is negligible and g = 9.8 m/s^2. Calculate its speed at the end of this time. Give your answer in m/s.",
    ans,Math.max(0.02*Math.abs(ans),0.05),
    "Starting from rest, the speed grows by g every second, so final speed is g times time: "+iF(9.8)+" × "+iF(t)+" = "+iF(vf)+" m/s. The speed is <b>"+F3(ans)+" m/s</b>, directed down.",{t:t});
});

E("u1-52-thrown-down",1,["PH11.5.2"],2,"gen",function(){
  var vi=pick([3,4,5,6,7,8]),t=pick([1.2,1.6,2,2.4,2.8,3.2]),m=pick([0.20,0.35,0.50,0.65,0.80,1.00]);
  var term1=sfR(vi*t,4),t2=sfR(t*t,4),half=sfR(0.5*9.8,4),term2=sfR(half*t2,4),d=sfR(term1+term2,4),ans=sfR(d,3);
  var sol="Take down as positive. The stone already has a starting velocity, so the displacement has two parts. The part from the starting velocity: "+iF(vi)+" × "+iF(t)+" = "+iF(term1)+" m. The time squared is "+iF(t)+" × "+iF(t)+" = "+iF(t2)+" s^2. Half of g is "+iF(0.5)+" × "+iF(9.8)+" = "+iF(half)+" m/s^2, so the part from gravity is "+iF(half)+" × "+iF(t2)+" = "+iF(term2)+" m. Add the parts: "+iF(term1)+" + "+iF(term2)+" = "+iF(d)+" m. The distance fallen is <b>"+F3(ans)+" m</b>.";
  return numq("A stone of mass "+gF(m)+" kg is thrown straight down from a coastal cliff with an initial velocity of "+gF(vi)+" m/s. It falls freely for "+gF(t)+" s, with air resistance negligible and g = 9.8 m/s^2. Calculate the distance it falls in this time. Give your answer in m.",
    ans,Math.max(0.02*Math.abs(ans),0.05),sol,{vi:vi,t:t});
});

E("u1-52-vt-graph-area",1,["PH11.5.2"],2,"gen",function(){
  var pair=pick([[2,10],[4,14],[6,16],[3,11],[5,17],[4,10]]),t=pick([4,5,6,8]);
  var subj=pick(["the harbour ferry","a delivery cart","a cyclist","a tour boat","a snowmobile"]);
  var v1=pair[0],v2=pair[1],sum=v1+v2,avg=sfR(sum/2,4),disp=sfR(avg*t,4);
  var q=mcq("A velocity-time graph for "+subj+" is a straight line rising steadily from "+gF(v1)+" m/s at time zero to "+gF(v2)+" m/s at "+gF(t)+" s. What displacement does the graph give for this interval?",
    F3(disp)+" m",
    [F3(v2*t)+" m",F3(v1*t)+" m",F3((v2-v1)*t)+" m"],
    "On a velocity-time graph, the displacement is the area under the line. For a steadily rising line, that area is the average velocity times the time. The two velocities add: "+iF(v1)+" + "+iF(v2)+" = "+iF(sum)+" m/s. Half of that is the average: "+iF(sum)+" / "+iF(2)+" = "+iF(avg)+" m/s. The area is "+iF(avg)+" × "+iF(t)+" = "+iF(disp)+" m. The displacement is <b>"+F3(disp)+" m</b>.",{v1:v1,v2:v2,t:t});
    q.figure=p22Plot({series:[{pts:[[0,v1],[t,v2]],shade:true}],xt:[[0,"0"],[t,gF(t)]],yt:[[v1,gF(v1)],[v2,gF(v2)]],xmax:t*1.08,ymax:v2*1.18,xl:"time (s)",yl:"velocity (m/s)"});return q;
});

E("u1-52-vt-graph-slope",1,["PH11.5.2"],2,"gen",function(){
  var acc=pick([1.5,2,2.5,3]),t=ri(4,9),v1=ri(2,12);
  var delta=sfR(acc*t,4),v2=sfR(v1+delta,4),ans=sfR(acc,3);
  var q=numq("A velocity-time graph for a cart is a straight line passing through velocity "+gF(v1)+" m/s at time zero and velocity "+gF(v2)+" m/s at "+gF(t)+" s. Calculate the acceleration shown by the graph. Give your answer in m/s^2.",
    ans,Math.max(0.02*Math.abs(ans),0.05),
    "On a velocity-time graph, the acceleration is the slope, the rise in velocity divided by the time interval. The rise in velocity: "+iF(v2)+" - "+iF(v1)+" = "+iF(delta)+" m/s. Divide by the time: "+iF(delta)+" / "+iF(t)+" = "+iF(acc)+" m/s^2. The acceleration is <b>"+F3(ans)+" m/s^2</b>.",{acc:acc,t:t,v1:v1});
    q.figure=p22Plot({series:[{pts:[[0,v1],[t,v2]]}],xt:[[0,"0"],[t,gF(t)]],yt:[[v1,gF(v1)],[v2,gF(v2)]],xmax:t*1.08,ymax:v2*1.18,xl:"time (s)",yl:"velocity (m/s)",dots:true});return q;
});

E("u1-52-pt-graph",1,["PH11.5.2"],1,"gen",function(){
  var v=pick([2,3,4,5,6]),t=pick([4,5,6,8,10]),x1=ri(5,20);
  var disp=v*t,x2=x1+disp;
  var q=mcq("A position-time graph for a walker is a straight line from position "+gF(x1)+" m at time zero to position "+gF(x2)+" m at "+gF(t)+" s. What is the walker's velocity?",
    F3(v)+" m/s",
    [F3(sfR(x2/t,4))+" m/s",F3(disp)+" m/s",F3(sfR(1/v,4))+" m/s"],
    "On a position-time graph, the velocity is the slope, the change in position divided by the time. The change in position: "+iF(x2)+" - "+iF(x1)+" = "+iF(disp)+" m. Divide by the time: "+iF(disp)+" / "+iF(t)+" = "+iF(v)+" m/s. The velocity is <b>"+F3(v)+" m/s</b>. Using the final position alone, instead of the change in position, is the error in one of the other options.",{v:v,t:t,x1:x1});
    q.figure=p22Plot({series:[{pts:[[0,x1],[t,x2]]}],xt:[[0,"0"],[t,gF(t)]],yt:[[x1,gF(x1)],[x2,gF(x2)]],xmax:t*1.08,ymax:x2*1.15,xl:"time (s)",yl:"position (m)",dots:true});return q;
});

E("u1-52-stopping-cr",1,["PH11.5.2"],3,"gen",function(){
  var v=pick([12,14,16,18,20,22,25]),tr=pick([0.6,0.8,1,1.2,1.5]),mu=pick([0.3,0.4,0.5,0.6,0.7,0.8]);
  var acc=sfR(mu*9.8,4),dr=sfR(v*tr,4),v2=v*v,den=sfR(2*acc,4),dbP=sfR(v2/den,4),totP=sfR(dr+dbP,4),ans=sfR(totP,3);
  var sol="The stopping distance has two parts. During the reaction time the car keeps its full speed, so the reaction distance is speed times reaction time: "+iF(v)+" × "+iF(tr)+" = "+iF(dr)+" m. For the braking part, the friction gives an acceleration of mu times g: "+iF(mu)+" × "+iF(9.8)+" = "+iF(acc)+" m/s^2. The speed squared is "+iF(v)+" × "+iF(v)+" = "+iF(v2)+" m^2/s^2, and twice the braking acceleration is "+iF(2)+" × "+iF(acc)+" = "+iF(den)+" m/s^2. The braking distance is the speed squared divided by twice the braking acceleration: "+iF(v2)+" / "+iF(den)+" = "+iF(dbP)+" m. Add the two parts: "+iF(dr)+" + "+iF(dbP)+" = "+iF(totP)+" m. The total stopping distance is <b>"+F3(ans)+" m</b>.";
  return numq("A car is travelling at "+gF(v)+" m/s on a dry road where the coefficient of friction between the tires and the road is "+gF(mu)+". The driver's reaction time is "+gF(tr)+" s, and once the brakes are applied the car decelerates at mu times g, with g = 9.8 m/s^2. Calculate the total stopping distance of the car. Give your answer in m.",
    ans,Math.max(0.02*Math.abs(ans),0.05),sol,{v:v,tr:tr,mu:mu});
});

E("u1-52-freefall-cr",1,["PH11.5.2"],3,"gen",function(){
  var vi=pick([4,5,6,8,10]),vfT=pick([22,26,30,34,38]);
  var ctx=pick(["from a coastal cliff","from a harbour crane platform","from a lighthouse gallery","from a bridge over a gorge"]);
  var hRaw=(vfT*vfT-vi*vi)/(2*9.8),h=sfR(hRaw,3);
  var vi2=vi*vi,g2=sfR(2*9.8,4),prod=sfR(g2*h,4),under=sfR(vi2+prod,4),vfRaw=Math.sqrt(under),ans=sfR(vfRaw,3);
  var sol="Take down as positive and use the velocity equation that does not involve time: final velocity squared is initial velocity squared plus two times g times the height. The initial velocity squared: "+iF(vi)+" × "+iF(vi)+" = "+iF(vi2)+" m^2/s^2. Twice g is "+iF(2)+" × "+iF(9.8)+" = "+iF(g2)+" m/s^2. That times the height: "+iF(g2)+" × "+iF(h)+" = "+iF(prod)+" m^2/s^2. Add the two parts: "+iF(vi2)+" + "+iF(prod)+" = "+iF(under)+" m^2/s^2. Taking the square root of that total gives the final speed. The final speed is <b>"+F3(ans)+" m/s</b>, directed down. This route avoids any quadratic in time.";
  return numq("A rock is projected straight down "+ctx+" with an initial speed of "+gF(vi)+" m/s. It falls a vertical distance of "+gF(h)+" m before striking the water, with air resistance negligible and g = 9.8 m/s^2. Calculate its final speed just before it strikes the water. Give your answer in m/s.",
    ans,Math.max(0.02*Math.abs(ans),0.05),sol,{vi:vi,h:h});
});

E("u1-52-graph-cr",1,["PH11.5.2"],2,"gen",function(){
  var v1=pick([4,6,8]),v2=pick([12,16,20]),t1=ri(2,5),t2=ri(3,6),t3=ri(2,5);
  if(v2<=v1)v2=v1+8;
  var A1=v1*t1,sum=v1+v2,avg=sfR(sum/2,4),A2=sfR(avg*t2,4),A3=v2*t3,delta=v2-v1,accP=sfR(delta/t2,4);
  var sub=sfR(A1+A2,4),tot=sfR(sub+A3,4),ans=sfR(tot,3);
  var sol="On a velocity-time graph, displacement is the total area under the graph, so find the area of each segment. Segment one is a rectangle: "+iF(v1)+" × "+iF(t1)+" = "+iF(A1)+" m. Segment two rises steadily, so its area uses the average velocity on that segment. The velocities add: "+iF(v1)+" + "+iF(v2)+" = "+iF(sum)+" m/s, and half of that is "+iF(sum)+" / "+iF(2)+" = "+iF(avg)+" m/s. The area of segment two: "+iF(avg)+" × "+iF(t2)+" = "+iF(A2)+" m. The slope of segment two also gives its acceleration: the velocity change is "+iF(v2)+" - "+iF(v1)+" = "+iF(delta)+" m/s, and "+iF(delta)+" / "+iF(t2)+" = "+iF(accP)+" m/s^2. Segment three is a rectangle: "+iF(v2)+" × "+iF(t3)+" = "+iF(A3)+" m. Add the areas in stages: "+iF(A1)+" + "+iF(A2)+" = "+iF(sub)+" m, then "+iF(sub)+" + "+iF(A3)+" = "+iF(tot)+" m. The displacement is <b>"+F3(ans)+" m</b>.";
  var q=numq("A velocity-time graph for a ferry leaving the dock has three segments. Segment one: the ferry holds a steady velocity of "+gF(v1)+" m/s for "+gF(t1)+" s. Segment two: the velocity rises steadily from "+gF(v1)+" m/s to "+gF(v2)+" m/s over "+gF(t2)+" s. Segment three: the ferry holds a steady velocity of "+gF(v2)+" m/s for "+gF(t3)+" s. Calculate the ferry's displacement over the whole graph. Give your answer in m.",
    ans,Math.max(0.02*Math.abs(ans),0.05),sol,{v1:v1,v2:v2,t1:t1,t2:t2,t3:t3});
    q.figure=p22Plot({series:[{pts:[[0,v1],[t1,v1],[t1+t2,v2],[t1+t2+t3,v2]],shade:true}],xt:[[0,"0"],[t1,gF(t1)],[t1+t2,gF(t1+t2)],[t1+t2+t3,gF(t1+t2+t3)]],yt:[[v1,gF(v1)],[v2,gF(v2)]],xmax:(t1+t2+t3)*1.05,ymax:v2*1.18,xl:"time (s)",yl:"velocity (m/s)"});return q;
});

E("u1-52-stopping-simple",1,["PH11.5.2"],3,"gen",function(){
  var v=pick([15,18,21,24,27]),tr=pick([0.5,0.75,1,1.25]),ab=pick([3,4,5,6]);
  var dr=sfR(v*tr,4),v2=v*v,den=sfR(2*ab,4),dbP=sfR(v2/den,4),totP=sfR(dr+dbP,4),ans=sfR(totP,3);
  var sol="Split the stop into the thinking stage and the braking stage, in that order. During the reaction time the snowmobile still travels at full speed: "+iF(v)+" × "+iF(tr)+" = "+iF(dr)+" m. For the braking stage, the speed squared is "+iF(v)+" × "+iF(v)+" = "+iF(v2)+" m^2/s^2, and twice the deceleration is "+iF(2)+" × "+iF(ab)+" = "+iF(den)+" m/s^2. The braking distance is the speed squared divided by twice the deceleration: "+iF(v2)+" / "+iF(den)+" = "+iF(dbP)+" m. Add the stages: "+iF(dr)+" + "+iF(dbP)+" = "+iF(totP)+" m. The total stopping distance is <b>"+F3(ans)+" m</b>.";
  return numq("A snowmobile is travelling at "+gF(v)+" m/s when the driver spots a fallen tree ahead. The driver's reaction time is "+gF(tr)+" s, and once the brake is applied the snowmobile decelerates steadily at "+gF(ab)+" m/s^2 until it stops. Calculate the total distance the snowmobile travels from the moment the driver spots the tree until it stops. Give your answer in m.",
    ans,Math.max(0.02*Math.abs(ans),0.05),sol,{v:v,tr:tr,ab:ab});
});

E("u1-52-two-stage",1,["PH11.5.2"],3,"gen",function(){
  var acc=pick([1.5,2,2.5,3,3.5,4]),t1=ri(3,6),t2=pick([4,5,6,7,8]);
  var v=acc*t1,prod=v*t1,d1=sfR(0.5*prod,4),d2=v*t2,tot=sfR(d1+d2,4);
  return mcq("A curling rink shuttle starts from rest and accelerates steadily at "+gF(acc)+" m/s^2 for "+gF(t1)+" s, then continues at the speed it reached for a further "+gF(t2)+" s. What is the total distance it travels?",
    F3(tot)+" m",
    [F3(d2)+" m",F3(v*(t1+t2))+" m",F3(d1)+" m"],
    "First find the speed reached. The gain in speed: "+iF(acc)+" × "+iF(t1)+" = "+iF(v)+" m/s. During the acceleration stage the average speed is half of that top speed, so the stage distance is half of speed times time. Speed times time is "+iF(v)+" × "+iF(t1)+" = "+iF(prod)+" m, and half of it is "+iF(0.5)+" × "+iF(prod)+" = "+iF(d1)+" m. The steady stage: "+iF(v)+" × "+iF(t2)+" = "+iF(d2)+" m. Add the stages: "+iF(d1)+" + "+iF(d2)+" = "+iF(tot)+" m. The total distance is <b>"+F3(tot)+" m</b>.",{acc:acc,t1:t1,t2:t2});
});

E("u1-52-avgvel-distance",1,["PH11.5.2"],2,"gen",function(){
  var vi=pick([4,6,8,10]),vf=pick([16,20,24,28]),t=pick([5,6,8,10]);
  if(vf<=vi)vf=vi+12;
  var sum=vi+vf,avg=sfR(sum/2,4),d=sfR(avg*t,4);
  return mcq("Take the direction of motion as positive. A bus accelerates steadily from "+gF(vi)+" m/s to "+gF(vf)+" m/s over "+gF(t)+" s. What distance does it travel during this time?",
    F3(d)+" m",
    [F3(vf*t)+" m",F3(vi*t)+" m",F3(sum*t)+" m"],
    "With steady acceleration, the distance is the average velocity times the time. The velocities add: "+iF(vi)+" + "+iF(vf)+" = "+iF(sum)+" m/s. Half of that is the average velocity: "+iF(sum)+" / "+iF(2)+" = "+iF(avg)+" m/s. Then the distance: "+iF(avg)+" × "+iF(t)+" = "+iF(d)+" m. The distance is <b>"+F3(d)+" m</b>. Using only the starting velocity, only the final velocity, or forgetting to halve the sum are the errors in the other options.",{vi:vi,vf:vf,t:t});
});

/* ---------- PH11.5.3 Frames of reference and relative motion ---------- */

E("u1-53-frame-identify",1,["PH11.5.3"],1,"var",varset([
  function(){
    return mcq("A woman standing on the wharf at Port aux Basques times a ferry as it leaves and reports the ferry's speed as it pulls away from the land. Which frame of reference is she using for the speed?",
      "The wharf and the shore",
      ["The ferry itself","The water moving past the ferry","Another ferry sailing nearby"],
      "A speed is always measured relative to something. She is standing still on the land and judging the motion against the land, so her frame of reference is <b>the wharf and the shore</b>. In the ferry's own frame, the ferry would be at rest.",{});
  },
  function(){
    return mcq("A passenger seated inside a moving train looks at the passenger across the aisle and judges that passenger to be perfectly still, even though the train is doing highway speed. Which frame of reference is the seated passenger using?",
      "The train",
      ["The platform the train left behind","The ground beside the tracks","A car on a parallel road"],
      "Both passengers share the train's motion, so relative to the train neither is moving. The judgement of stillness is made in the frame of <b>the train</b>. Relative to the ground, both passengers are moving at the train's full speed.",{});
  },
  function(){
    return mcq("A weather report states that rain over St. John's is falling straight down at a steady speed measured by an observer standing still outdoors. Which frame of reference do the reported rain speeds use?",
      "The ground",
      ["The falling raindrops themselves","A cyclist riding through the rain","The clouds the rain fell from"],
      "The observer is standing still on the Earth and measuring the rain against the Earth, so the frame of reference is <b>the ground</b>. A moving cyclist would judge the same rain to slant, because the cyclist's frame is different.",{});
  },
  function(){
    return mcq("The captain of a fishing boat judges the speed of an approaching boat by how quickly it grows larger and closes in on her own vessel, ignoring the motion of both boats over the seabed. Which frame of reference is she using?",
      "Her own boat",
      ["The seabed","The harbour entrance","The wind"],
      "She is judging the other boat's motion only relative to her own vessel, treating her boat as if it were still. Her frame of reference is <b>her own boat</b>. Speeds measured from the shore would be different.",{});
  },
  function(){
    return mcq("A camera bolted to the boards at a hockey rink records a puck crossing the ice, and the broadcast reports the puck's speed from that footage. Which frame of reference does the reported speed use?",
      "The rink",
      ["The puck itself","The skater who shot the puck","The opposing goalie"],
      "The camera is fixed to the rink, so all positions and speeds in the footage are measured against the rink. The frame of reference is <b>the rink</b>.",{});
  }
]));

E("u1-53-relative-concept",1,["PH11.5.3"],1,"gen",function(){
  var vt=ri(18,30),vp=pick([1,1.5,2,2.5,3]),fwd=Math.random()<0.5;
  var g=fwd?sfR(vt+vp,4):sfR(vt-vp,4),other=fwd?sfR(vt-vp,4):sfR(vt+vp,4);
  var dirWord=fwd?"toward the front of the train":"toward the back of the train";
  var sol=fwd?("Relative to the ground, the passenger's walking adds to the train's motion because both point east: "+iF(vt)+" + "+iF(vp)+" = "+iF(g)+" m/s. The speed relative to the ground is <b>"+F3(g)+" m/s east</b>."):("Relative to the ground, the passenger's walking works against the train's motion: "+iF(vt)+" - "+iF(vp)+" = "+iF(g)+" m/s. The speed relative to the ground is <b>"+F3(g)+" m/s east</b>, still eastward because the train is much faster.");
  return mcq("A train travels east at "+gF(vt)+" m/s relative to the ground. A passenger walks "+dirWord+" at "+gF(vp)+" m/s relative to the train. What is the passenger's velocity relative to the ground?",
    F3(g)+" m/s east",
    [F3(other)+" m/s east",F3(vt)+" m/s east",F3(g)+" m/s west"],
    sol,{vt:vt,vp:vp,fwd:fwd});
});

E("u1-53-same-direction",1,["PH11.5.3"],2,"gen",function(){
  var closing=pick([2,3,4,5]),t=ri(8,25),vs=ri(6,14);
  var vf=vs+closing,gap=closing*t,ans=sfR(t,3);
  var q=numq("Two delivery vans travel east on the same straight highway. The van behind is moving at "+gF(vf)+" m/s and the van ahead is moving at "+gF(vs)+" m/s, and the gap between them is "+gF(gap)+" m. Calculate how long it takes the van behind to catch up to the van ahead, assuming both hold their speeds. Give your answer in s.",
    ans,Math.max(0.02*Math.abs(ans),0.05),
    "Because the vans move in the same direction, the gap closes at the difference of their speeds: "+iF(vf)+" - "+iF(vs)+" = "+iF(closing)+" m/s. The time to close the gap is the gap divided by the closing speed: "+iF(gap)+" / "+iF(closing)+" = "+iF(t)+" s. The time to catch up is <b>"+F3(ans)+" s</b>.",{vf:vf,vs:vs,gap:gap});
    q.figure=p22VecLanes([{v:vf,east:true,t:"van behind: "+gF(vf)+" m/s east, gap "+gF(gap)+" m"},{v:vs,east:true,t:"van ahead: "+gF(vs)+" m/s east"}]);return q;
});

E("u1-53-opposite",1,["PH11.5.3"],2,"gen",function(){
  var v1=ri(3,8),v2=ri(3,8); if(v2===v1)v2=v1+1;
  var tMeet=ri(6,20),closing=v1+v2,sep=closing*tMeet,mx=Math.max(v1,v2),diff=Math.abs(v1-v2);
  var q=mcq("Two hikers start "+gF(sep)+" m apart on a straight trail and walk directly toward each other, one at "+gF(v1)+" m/s and the other at "+gF(v2)+" m/s. How long before they meet?",
    F3(tMeet)+" s",
    [F3(sfR(sep/mx,4))+" s",F3(sfR(sep/diff,4))+" s",F3(tMeet)+" min"],
    "Because the hikers move toward each other, the gap closes at the sum of their speeds: "+iF(v1)+" + "+iF(v2)+" = "+iF(closing)+" m/s. The time to meet is the separation divided by the closing speed: "+iF(sep)+" / "+iF(closing)+" = "+iF(tMeet)+" s. They meet after <b>"+F3(tMeet)+" s</b>. Using only one speed, or the difference of the speeds, would be the right method for other setups, not for motion toward each other.",{v1:v1,v2:v2,sep:sep});
    q.figure=p22VecLanes([{v:v1,east:true,t:"hiker 1: "+gF(v1)+" m/s, separation "+gF(sep)+" m"},{v:v2,east:false,t:"hiker 2: "+gF(v2)+" m/s, toward hiker 1"}]);return q;
});

E("u1-53-boat-speed",1,["PH11.5.3"],2,"gen",function(){
  var vb=pick([6.5,7,8.5,9,10.5,12]),vc=pick([1.5,2,2.5,3]),down=Math.random()<0.5;
  var vessel=pick(["A fishing boat","A tour boat","A work boat","A sailboat under power"]);
  var g=down?sfR(vb+vc,4):sfR(vb-vc,4),other=down?sfR(vb-vc,4):sfR(vb+vc,4);
  var dirWord=down?"downstream, with the current helping it":"upstream, against the current";
  var ansWord=down?"downstream":"upstream";
  var sol=down?("The current and the boat point the same way, so their speeds add for an observer on the shore: "+iF(vb)+" + "+iF(vc)+" = "+iF(g)+" m/s. The ground speed is <b>"+F3(g)+" m/s downstream</b>."):("The current works against the boat, so the shore observer sees the boat's speed reduced by the current: "+iF(vb)+" - "+iF(vc)+" = "+iF(g)+" m/s. The ground speed is <b>"+F3(g)+" m/s upstream</b>, still upstream because the boat is faster than the current.");
  var q=mcq(vessel+" moves at "+gF(vb)+" m/s relative to the water of a river. The river current flows at "+gF(vc)+" m/s. The boat heads "+dirWord+". What is the boat's speed relative to the shore?",
    F3(g)+" m/s "+ansWord,
    [F3(other)+" m/s "+ansWord,F3(vb)+" m/s "+ansWord,F3(g)+" m/s in the opposite direction"],
    sol,{vb:vb,vc:vc,down:down});
    q.figure=p22VecLanes([{v:vb,east:down,t:"boat relative to water: "+gF(vb)+" m/s"},{v:vc,east:true,t:"river current: "+gF(vc)+" m/s"}]);return q;
});

E("u1-53-plane-wind",1,["PH11.5.3"],2,"gen",function(){
  var ground=pick([42,45,48,50,54,56,60]),t=ri(2,6),w=pick([8,10,12,15]),head=Math.random()<0.5;
  var va=head?ground+w:ground-w,dist=ground*t,ans=sfR(t,3);
  var windWord=head?"a headwind, blowing against the plane":"a tailwind, blowing from behind the plane";
  var sol=head?("A headwind reduces the ground speed: "+iF(va)+" - "+iF(w)+" = "+iF(ground)+" km/h. The flight time is the distance divided by the ground speed: "+iF(dist)+" / "+iF(ground)+" = "+iF(t)+" h. The flight time is <b>"+F3(ans)+" hours</b>."):("A tailwind adds to the ground speed: "+iF(va)+" + "+iF(w)+" = "+iF(ground)+" km/h. The flight time is the distance divided by the ground speed: "+iF(dist)+" / "+iF(ground)+" = "+iF(t)+" h. The flight time is <b>"+F3(ans)+" hours</b>.");
  var q=numq("A plane flies at "+gF(va)+" km/h relative to the air on a route of "+gF(dist)+" km. There is "+windWord+" of "+gF(w)+" km/h. Calculate the flight time for the trip. Give your answer in hours.",
    ans,Math.max(0.02*Math.abs(ans),0.05),sol,{va:va,w:w,dist:dist,head:head});
    q.figure=p22VecLanes([{v:va,east:true,t:"plane relative to air: "+gF(va)+" km/h"},{v:w,east:!head,t:"wind: "+gF(w)+" km/h"}]);return q;
});

E("u1-53-meet-cr",1,["PH11.5.3"],2,"gen",function(){
  var v1=pick([4.5,5,5.5,6]),v2=pick([3.5,4,4.5]),t=ri(10,30);
  var closing=sfR(v1+v2,4),sep=sfR(closing*t,4),d1=sfR(v1*t,4),ans=sfR(t,3);
  var sol="The two cyclists move toward each other, so the separation shrinks at the sum of their speeds: "+iF(v1)+" + "+iF(v2)+" = "+iF(closing)+" m/s. The time to meet is the separation divided by this closing speed: "+iF(sep)+" / "+iF(closing)+" = "+iF(t)+" s. As a check, in that time the first cyclist covers "+iF(v1)+" × "+iF(t)+" = "+iF(d1)+" m, and the second cyclist covers the rest of the separation. The time to meet is <b>"+F3(ans)+" s</b>.";
  var q=numq("Two cyclists start "+gF(sep)+" m apart on a straight section of the T'Railway and ride directly toward each other. One rides at "+gF(v1)+" m/s and the other at "+gF(v2)+" m/s, and both hold their speeds. Calculate the time until they meet. Give your answer in s.",
    ans,Math.max(0.02*Math.abs(ans),0.05),sol,{v1:v1,v2:v2,sep:sep});
    q.figure=p22VecLanes([{v:v1,east:true,t:"cyclist 1: "+gF(v1)+" m/s, separation "+gF(sep)+" m"},{v:v2,east:false,t:"cyclist 2: "+gF(v2)+" m/s, toward cyclist 1"}]);return q;
});

E("u1-53-relative-cr",1,["PH11.5.3"],2,"gen",function(){
  var vb=pick([18,20,24,30]),vc=pick([4,5,6]),L=pick([48,60,72,84,96,120]);
  var gd=vb+vc,gu=vb-vc,tdP=sfR(L/gd,4),tuP=sfR(L/gu,4),totP=sfR(tdP+tuP,4),ans=sfR(totP,3);
  var sol="Work each leg with the ground speed for that leg, measured from the shore. Downstream the current helps, so the ground speed is "+iF(vb)+" + "+iF(vc)+" = "+iF(gd)+" km/h, and the downstream time is "+iF(L)+" / "+iF(gd)+" = "+iF(tdP)+" h. Upstream the current opposes the boat, so the ground speed is "+iF(vb)+" - "+iF(vc)+" = "+iF(gu)+" km/h, and the upstream time is "+iF(L)+" / "+iF(gu)+" = "+iF(tuP)+" h. Add the two leg times: "+iF(tdP)+" + "+iF(tuP)+" = "+iF(totP)+" h. The total time for the round trip is <b>"+F3(ans)+" hours</b>. The upstream leg takes longer, which is why the current does not cancel out over the round trip.";
  var q=numq("A tour boat moves at "+gF(vb)+" km/h relative to the water of a river whose current flows at "+gF(vc)+" km/h. The boat travels "+gF(L)+" km downstream from a wharf and then returns the same "+gF(L)+" km upstream to the wharf. Calculate the total time for the round trip. Give your answer in hours.",
    ans,Math.max(0.02*Math.abs(ans),0.05),sol,{vb:vb,vc:vc,L:L});
    q.figure=p22VecLanes([{v:vb,east:true,t:"downstream leg, boat: "+gF(vb)+" km/h"},{v:vc,east:true,t:"downstream leg, current: "+gF(vc)+" km/h"},{v:vb,east:false,t:"upstream leg, boat: "+gF(vb)+" km/h"},{v:vc,east:true,t:"upstream leg, current: "+gF(vc)+" km/h"}]);return q;
});

E("u1-53-pass-separation",1,["PH11.5.3"],3,"gen",function(){
  var v1=ri(8,14),v2=ri(8,14),tMeet=ri(5,12),extra=ri(3,10);
  var closing=v1+v2,sep0=closing*tMeet,total=tMeet+extra,sep=closing*extra,ans=sfR(sep,3);
  var sol="First find when the cars meet. Moving toward each other, they close the gap at "+iF(v1)+" + "+iF(v2)+" = "+iF(closing)+" m/s, so the meeting time is "+iF(sep0)+" / "+iF(closing)+" = "+iF(tMeet)+" s. The clock time asked about is later than that: "+iF(total)+" - "+iF(tMeet)+" = "+iF(extra)+" s after they pass each other. After passing, the same closing speed becomes a separating speed, so the separation then is "+iF(closing)+" × "+iF(extra)+" = "+iF(sep)+" m. The separation is <b>"+F3(ans)+" m</b>.";
  var q=numq("Two cars start "+gF(sep0)+" m apart on a straight highway and drive directly toward each other, one at "+gF(v1)+" m/s and the other at "+gF(v2)+" m/s. Both hold their speeds, pass each other, and keep going. Calculate the separation between the cars "+gF(total)+" s after they start. Give your answer in m.",
    ans,Math.max(0.02*Math.abs(ans),0.05),sol,{v1:v1,v2:v2,sep0:sep0,total:total});
    q.figure=p22VecLanes([{v:v1,east:true,t:"car 1: "+gF(v1)+" m/s, starting separation "+gF(sep0)+" m"},{v:v2,east:false,t:"car 2: "+gF(v2)+" m/s, toward car 1"}]);return q;
});

E("u1-53-wind-roundtrip",1,["PH11.5.3"],3,"gen",function(){
  var va=ri(52,68),w=ri(6,14),D=ri(220,380);
  var go=va+w,gb=va-w,toP=sfR(D/go,4),tbP=sfR(D/gb,4),totP=sfR(toP+tbP,4),ans=sfR(totP,3);
  var bothTail=sfR(2*toP,4),oneWay=sfR(toP+sfR(D/va,4),4),bothHead=sfR(2*tbP,4);
  var q=mcq("A plane whose speed relative to the air is "+gF(va)+" km/h makes a round trip between two airports "+gF(D)+" km apart. A steady wind of "+gF(w)+" km/h blows along the route, acting as a tailwind on the way out and a headwind on the way back. What is the total flight time for the round trip?",
    F3(ans)+" hours",
    [F3(bothTail)+" hours",F3(oneWay)+" hours",F3(bothHead)+" hours"],
    "The wind changes the ground speed on each leg, so the legs must be timed separately. Outbound, with the tailwind: "+iF(va)+" + "+iF(w)+" = "+iF(go)+" km/h, and the time is "+iF(D)+" / "+iF(go)+" = "+iF(toP)+" h. Returning, against the headwind: "+iF(va)+" - "+iF(w)+" = "+iF(gb)+" km/h, and the time is "+iF(D)+" / "+iF(gb)+" = "+iF(tbP)+" h. Add the leg times: "+iF(toP)+" + "+iF(tbP)+" = "+iF(totP)+" h. The total flight time is <b>"+F3(ans)+" hours</b>. The wind does not cancel out, because the plane spends longer in the headwind leg than in the tailwind leg.",{va:va,w:w,D:D});
    q.figure=p22VecLanes([{v:va,east:true,t:"way out, plane: "+gF(va)+" km/h"},{v:w,east:true,t:"way out, wind (tailwind): "+gF(w)+" km/h"},{v:va,east:false,t:"way back, plane: "+gF(va)+" km/h"},{v:w,east:true,t:"way back, wind (headwind): "+gF(w)+" km/h"}]);return q;
});

/* ----- bank-u2.js ----- */
// Diagram figures (Phase C, Nov 2026): force diagrams, angled force scenes, Atwood, connected crates, elevator and force time graphs added where the source types carried diagrams; see bank-helpers.js p22 helpers.
// Physics 2204 Unit 2 Dynamics question bank
// CRMARKS: u2-62-multistep-cr=5
// CRMARKS: u2-65-collision-cr=4
// CRMARKS: u2-63-impulse-cr=4
// CRMARKS: u2-61-netforce-cr=3
// CRMARKS: u2-62-friction-cr=3
// CRMARKS: u2-65-stick-cr=2

/* ---------- PH11.6.1 Vectors for force and acceleration ---------- */

E("u2-61-fbd-select",2,["PH11.6.1"],1,"var",varset([
  function(){
    var q=mcq("A book rests on a horizontal table. Which list gives all the forces acting on the book?",
      "Gravity pulling down and the normal force from the table pushing up",
      ["Gravity pulling down, the normal force pushing up, and a forward force keeping it on the table",
       "Gravity pulling down only, because the book is not moving",
       "The normal force pushing up only, because gravity is cancelled before it acts"],
      "A resting book has two forces: its weight, gravity pulling down toward Earth, and the normal force from the table surface pushing up. There is no horizontal force, and no force is needed to keep a stationary object in place. Gravity pulling down and the normal force pushing up is the complete list.",{});
    q.figure=p22Scene("book");return q;
  },
  function(){
    var q=mcq("A hockey puck slides east across rough ice and slows down. Which list gives all the forces acting on the puck while it slides?",
      "Gravity down, the normal force up, and friction pointing west",
      ["Gravity down, the normal force up, friction pointing west, and a sliding force pointing east",
       "Gravity down and friction pointing west only",
       "Gravity down, the normal force up, and friction pointing east"],
      "The puck is supported by the ice, so gravity down and the normal force up both act. Kinetic friction opposes the sliding, so it points west while the puck moves east. Motion itself is not a force, so there is no extra sliding force. Gravity down, the normal force up, and friction pointing west is the complete list.",{});
    q.figure=p22Scene("puck");return q;
  },
  function(){
    var q=mcq("A crate is pulled east across a horizontal floor by a rope, and friction acts on the crate. Which list gives all the forces acting on the crate?",
      "Gravity down, the normal force up, the rope pull east, and friction west",
      ["Gravity down, the rope pull east, and friction west",
       "The rope pull east and friction west only, because vertical forces do not count",
       "Gravity down, the normal force up, the rope pull east, and friction east"],
      "Four forces act: weight down, the floor pushing up with the normal force, the applied rope pull east, and friction west opposing the motion. Leaving out the vertical pair would make the diagram incomplete, even though those two forces balance. Gravity down, the normal force up, the rope pull east, and friction west is the complete list.",{});
    q.figure=p22Scene("crate");return q;
  },
  function(){
    var q=mcq("A dropped ball is falling toward the ground, and air resistance is ignored. Which list gives all the forces acting on the ball while it falls?",
      "Gravity pulling down only",
      ["Gravity pulling down and a falling force pulling down",
       "Gravity pulling down and the normal force pushing up",
       "No forces, because the ball is not touching anything"],
      "With air resistance ignored, the only force on a falling ball is gravity. There is no surface, so there is no normal force, and falling is the motion that gravity causes, not a second force. Gravity pulling down only is the complete list.",{});
    q.figure=p22Scene("ball");return q;
  },
  function(){
    var m=ri(2,9);
    var q=mcq("A "+m+" kg bucket hangs at rest from a rope. Which list gives all the forces acting on the bucket?",
      "Gravity pulling down and tension in the rope pulling up",
      ["Gravity pulling down only, because the bucket is hanging in the air",
       "Tension pulling up only, because the rope holds the bucket",
       "Gravity pulling down, tension pulling up, and the normal force pushing up"],
      "The bucket is pulled down by gravity and pulled up by tension in the rope. Those two balanced forces keep it at rest. There is no surface under the bucket, so there is no normal force. Gravity pulling down and tension pulling up is the complete list.",{m:m});
    q.figure=p22Scene("bucket");return q;
  }
]));

E("u2-61-netforce-collinear",2,["PH11.6.1"],2,"gen",function(){
  var A=ri(24,92),B=ri(10,58),C=ri(6,42);
  var net=A-B+C; if(net===0){A+=11; net=A-B+C;}
  var s1=sfR(A+C,4), net4=sfR(s1-B,4), ans=sfR(net,3);
  var q=numq("Take east as positive. A sled is pulled east with a force of "+gF(A)+" N, pushed east with a force of "+gF(C)+" N, and friction pulls west with a force of "+gF(B)+" N. What is the net force on the sled? Give your answer in N.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Add the forces with signs, east positive. First add the two eastward forces: "+gF(A)+" + "+gF(C)+" = "+iF(s1)+" N. Then include the westward friction: "+iF(s1)+" - "+gF(B)+" = "+iF(net4)+" N. The net force is "+F3(ans)+" N, and a positive sign means the net force points east.",
    {A:A,B:B,C:C});
    q.figure=p22FBD([{dx:1,dy:0,len:A,t:"pull "+gF(A)+" N",oy:-14},{dx:1,dy:0,len:C,t:"push "+gF(C)+" N",oy:14},{dx:-1,dy:0,len:B,t:"friction "+gF(B)+" N",oy:0}],"sled");return q;
});

E("u2-61-resolve-component",2,["PH11.6.1"],2,"gen",function(){
  var F=sfR(rf(28.0,124),3), ang=pick([22,28,33,38,44,52,58]), horiz=ri(0,1)===0;
  var rad=ang*Math.PI/180;
  var trigR=horiz?sfR(Math.cos(rad),3):sfR(Math.sin(rad),3);
  var comp=sfR(F*trigR,4), ans=sfR(comp,3);
  var compName=horiz?"horizontal":"vertical", trigName=horiz?"cosine":"sine";
  var q=numq("A rope pulls a toboggan with a force of "+gF(F)+" N at an angle of "+ang+" degrees above the horizontal. What is the "+compName+" component of the pull? Give your answer in N.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Resolve the angled pull into components. The "+compName+" component uses the "+trigName+" of the angle: "+gF(F)+" × "+fmt(trigR,3)+" = "+iF(comp)+" N. The "+compName+" component of the pull is "+F3(ans)+" N.",
    {F:F,ang:ang,horiz:horiz});
    q.figure=p22VecAng(gF(F)+" N",ang);return q;
});

E("u2-61-netforce-components-mc",2,["PH11.6.1"],2,"gen",function(){
  var F1=sfR(rf(35.0,85.0),3), F2=sfR(rf(30.0,75.0),3), a1=pick([20,25,30,35,40]), a2=pick([15,20,25,30,35,40]);
  var c1=sfR(Math.cos(a1*Math.PI/180),3), c2=sfR(Math.cos(a2*Math.PI/180),3);
  var s1=sfR(Math.sin(a1*Math.PI/180),3), s2=sfR(Math.sin(a2*Math.PI/180),3);
  var x1=sfR(F1*c1,4), x2=sfR(F2*c2,4), ysum=sfR(sfR(F1*s1,4)+sfR(F2*s2,4),4);
  var netx=sfR(x1+x2,4), ans=sfR(netx,3);
  var full=sfR(F1+F2,3);
  var q=mcq("Two workers pull a fishing stage trolley eastward. One pulls with "+gF(F1)+" N at "+a1+" degrees north of east, and the other pulls with "+gF(F2)+" N at "+a2+" degrees south of east. What is the net force in the eastward direction?",
    F3(ans)+" N east",
    [F3(full)+" N east",
     F3(sfR(ans*2,3))+" N east",
     F3(x1)+" N east"],
    "Only the eastward components add to the eastward net force. The first eastward component is "+gF(F1)+" × "+fmt(c1,3)+" = "+iF(x1)+" N. The second eastward component is "+gF(F2)+" × "+fmt(c2,3)+" = "+iF(x2)+" N. Adding the eastward components: "+iF(x1)+" + "+iF(x2)+" = "+iF(netx)+" N. The net force in the eastward direction is "+F3(ans)+" N east. The northward and southward components are not part of this total.",
    {F1:F1,F2:F2,a1:a1,a2:a2});
    q.figure=p22VecPair(gF(F1)+" N",a1,gF(F2)+" N",a2);return q;
});

E("u2-61-netforce-cr",2,["PH11.6.1"],2,"gen",function(){
  var m=sfR(rf(8.0,20.0),3), F, ang, mu, rad, cosR, sinR, Fx, Fy, wt, FN, fr, Fnet;
  do { // resample until the pull clearly beats friction: the crate must actually accelerate forward
    F=sfR(rf(40.0,95.0),3); ang=pick([25,30,35]); mu=pick([0.120,0.180,0.240,0.300]);
    rad=ang*Math.PI/180; cosR=sfR(Math.cos(rad),3); sinR=sfR(Math.sin(rad),3);
    Fx=sfR(F*cosR,4); Fy=sfR(F*sinR,4);
    wt=sfR(m*9.8,4); FN=sfR(wt-Fy,4); fr=sfR(mu*FN,4); Fnet=sfR(Fx-fr,4);
  } while (Fnet<6);
  var ans=sfR(Fnet/m,3);
  var q=numq("A crate of mass "+gF(m)+" kg sits on a horizontal floor. A rope pulls the crate with a force of "+gF(F)+" N at an angle of "+ang+" degrees above the horizontal, and the coefficient of kinetic friction between the crate and the floor is "+gF(mu)+". Take the direction of the pull as positive. What is the acceleration of the crate? Give your answer in m/s^2.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Resolve the pull first. The horizontal component is "+gF(F)+" × "+fmt(cosR,3)+" = "+iF(Fx)+" N. The vertical component is "+gF(F)+" × "+fmt(sinR,3)+" = "+iF(Fy)+" N. The weight is "+gF(m)+" × 9.8 = "+iF(wt)+" N. The upward component reduces the normal force: "+iF(wt)+" - "+iF(Fy)+" = "+iF(FN)+" N. Kinetic friction is "+gF(mu)+" × "+iF(FN)+" = "+iF(fr)+" N. The net horizontal force is "+iF(Fx)+" - "+iF(fr)+" = "+iF(Fnet)+" N. Newton's second law gives the acceleration: "+iF(Fnet)+" / "+gF(m)+" = "+F3(ans)+" m/s^2. The acceleration is "+F3(ans)+" m/s^2 in the direction of the pull.",
    {m:m,F:F,ang:ang,mu:mu});
    q.figure=p22AngScene(gF(F)+" N",ang,"pull","friction");return q;
});

E("u2-61-accel-diagram",2,["PH11.6.1"],2,"gen",function(){
  var m=sfR(rf(3.0,20.0),3), A=ri(52,112), B=ri(10,44);
  var Fnet=sfR(A-B,4), ans=sfR(Fnet/m,3), asum=sfR((A+B)/m,3), aonly=sfR(A/m,3);
  var q=mcq("A free-body diagram for a cart of mass "+gF(m)+" kg shows one force of "+gF(A)+" N pointing east and friction of "+gF(B)+" N pointing west. Take east as positive. What is the acceleration of the cart?",
    F3(ans)+" m/s^2 east",
    [F3(asum)+" m/s^2 east",
     F3(ans)+" m/s^2 west",
     F3(aonly)+" m/s^2 east"],
    "The net force is found from the diagram by subtracting the westward friction: "+gF(A)+" - "+gF(B)+" = "+iF(Fnet)+" N. Newton's second law then gives the acceleration: "+iF(Fnet)+" / "+gF(m)+" = "+F3(ans)+" m/s^2. The acceleration is "+F3(ans)+" m/s^2 east, in the same direction as the net force.",
    {m:m,A:A,B:B});
    q.figure=p22FBD([{dx:1,dy:0,len:A,t:"force "+gF(A)+" N"},{dx:-1,dy:0,len:B,t:"friction "+gF(B)+" N"}],"cart "+gF(m)+" kg");return q;
});

E("u2-61-vector-direction",2,["PH11.6.1"],1,"var",varset([
  function(){
    return mcq("The net force on a sliding box points east. What is the direction of the box's acceleration?",
      "East, the same direction as the net force",
      ["West, opposite to the net force",
       "The box has no acceleration while it is sliding",
       "North, at right angles to the net force"],
      "Newton's second law says acceleration is the net force divided by the mass. Mass is positive, so the acceleration always points in the same direction as the net force. East is the direction of the acceleration.",{});
  },
  function(){
    return mcq("On a force diagram, one force arrow is drawn twice as long as another force arrow. What does the longer arrow tell you?",
      "That force has twice the magnitude of the shorter-arrow force",
      ["That force acts for twice as long a time",
       "That force points in the direction of motion",
       "That force is the net force on the object"],
      "In a vector diagram, arrow length represents magnitude and arrow direction represents the direction of the vector. A doubled arrow length means a doubled magnitude, nothing about time or motion. That force has twice the magnitude.",{});
  },
  function(){
    return mcq("A pull directed northeast is resolved into components. Which pair of components correctly describes it?",
      "One component pointing north and one component pointing east",
      ["One component pointing north and one component pointing south",
       "One component pointing northeast and one component pointing east",
       "One component pointing west and one component pointing south"],
      "Resolving a vector means replacing it with perpendicular parts that add up to the same effect. A northeast vector lies between north and east, so its components point north and east. One component north and one component east is correct.",{});
  },
  function(){
    return mcq("A cart speeds up while moving west. Which statement about its acceleration vector is correct?",
      "The acceleration points west, in the same direction as the change in velocity",
      ["The acceleration points east, because speeding up is positive",
       "The acceleration is zero, because the cart moves at a steady direction",
       "The acceleration points in the direction of the largest single force only"],
      "Acceleration is a vector in the direction of the change in velocity. A cart that speeds up while moving west has a velocity change pointing west, so its acceleration points west. The acceleration also matches the direction of the net force, not of any one force alone.",{});
  },
  function(){
    return mcq("Two equal forces pull an object, one east and one west, at the same time. What is the direction of the object's acceleration?",
      "The object has no acceleration, because the net force is zero",
      ["East, because the eastward force was named first",
       "West, because friction always wins",
       "The acceleration alternates between east and west"],
      "Equal and opposite forces add to a net force of zero. With no net force, Newton's second law gives an acceleration of zero, whatever the object was already doing. The object has no acceleration.",{});
  }
]));

E("u2-61-evaluate-fbd",2,["PH11.6.1"],3,"var",varset([
  function(){
    var q=mcq("A student draws a free-body diagram for a wagon rolling east and adds an arrow labelled 'motion force' pointing east, in addition to the pull, friction, gravity, and the normal force. Which judgement of the diagram is correct?",
      "The motion force arrow should be removed, because motion is not a force and only interactions belong on the diagram",
      ["The diagram is correct, because a moving object must have a force in its direction of motion",
       "The friction arrow should also be removed, because rolling objects have no friction",
       "The normal force should be removed, because the wagon is moving"],
      "A free-body diagram shows only forces, which come from interactions such as pulls, surfaces, and gravity. Motion is what forces explain, not an extra force itself. A wagon can even move with zero net force. The motion force arrow should be removed.",{});
    q.figure=p22FBD([{dx:1,dy:0,t:"pull",oy:-16},{dx:-1,dy:0,t:"friction",oy:16},{dx:0,dy:1,t:"gravity"},{dx:0,dy:-1,t:"normal force"},{dx:1,dy:0,t:"motion force",oy:-34,alt:1}],"wagon");return q;
  },
  function(){
    var F=64,ang=30;
    var q=mcq("A student analyses a crate pulled by a "+F+" N force at "+ang+" degrees above a horizontal floor. The student writes that the normal force equals the full weight of the crate. Which judgement is correct?",
      "The student is wrong, because the upward component of the pull lifts part of the weight off the floor, so the normal force is less than the weight",
      ["The student is right, because the normal force always equals the weight on any surface",
       "The student is wrong, because the normal force is greater than the weight when a pull is angled",
       "The student is right, because angled forces do not affect vertical forces at all"],
      "The pull has an upward vertical component, and vertical forces must balance for a crate that stays on the floor. The floor only needs to supply the part of the weight that the pull does not support, so the normal force is less than the weight. The student's claim is wrong.",{});
    q.figure=p22AngScene(gF(F)+" N",ang,"pull",null);return q;
  },
  function(){
    var q=mcq("A student says a sliding crate must be accelerating because friction is the only horizontal force drawn and friction points backward. A second look shows the crate is also being pushed forward with a force exactly equal to friction. Which judgement is correct?",
      "The crate is not accelerating, because the two horizontal forces cancel and the net force is zero",
      ["The crate is accelerating backward, because friction always causes acceleration",
       "The crate is accelerating forward, because a push always causes acceleration",
       "The crate must be at rest, because only resting objects have balanced forces"],
      "Acceleration depends on the net force, not on any single force. A push equal in size to friction gives a net force of zero, so the acceleration is zero. The crate could be sliding at constant velocity. The crate is not accelerating.",{});
    q.figure=p22FBD([{dx:1,dy:0,t:"push"},{dx:-1,dy:0,t:"friction"}],"crate");return q;
  },
  function(){
    var q=mcq("For a book sliding west across a table, a student draws friction pointing west because 'friction goes with the motion on the diagram'. Which judgement is correct?",
      "The friction arrow is wrong, because kinetic friction opposes the sliding and must point east for a book sliding west",
      ["The friction arrow is right, because friction always points in the direction of motion",
       "The friction arrow is wrong, because friction on a sliding book points down",
       "The diagram needs no friction arrow, because the book is already moving"],
      "Kinetic friction opposes relative sliding at the surface. A book sliding west experiences friction east, working against the slide. The friction arrow is wrong and must point east.",{});
    q.figure=p22FBD([{dx:-1,dy:0,t:"friction (as drawn)",oy:0}],"book, sliding west");return q;
  },
  function(){
    var q=mcq("A student resolves a 90.0 N force directed at 60 degrees above the horizontal and reports the vertical component as larger than 90.0 N. Which judgement is correct?",
      "The report must be wrong, because a component of a vector can never be larger than the vector itself",
      ["The report could be right, because components grow when an angle is large",
       "The report must be wrong, because the vertical component always equals the full force",
       "The report could be right, because the two components add up to more than the force"],
      "Each component is the full force multiplied by a sine or cosine, and those factors are never greater than one. So no component can exceed 90.0 N, even though the two components together describe the whole force. The report must be wrong.",{});
    q.figure=p22VecAng("90.0 N",60);return q;
  }
]));


/* ---------- PH11.6.2 Newton's laws ---------- */

E("u2-62-law-id",2,["PH11.6.2"],1,"var",varset([
  function(){
    return mcq("A curling rock sliding on level ice with no net force keeps moving in a straight line at nearly constant speed. Which law does this behaviour illustrate most directly?",
      "Newton's first law",
      ["Newton's second law","Newton's third law","The law of conservation of momentum"],
      "The first law says an object keeps its velocity when the net force on it is zero. The rock needs no force to keep moving, only a net force to change its motion. Newton's first law is illustrated.",{});
  },
  function(){
    return mcq("Doubling the net force on a cart doubles its acceleration, and doubling its mass halves the acceleration for the same force. Which law summarizes this relationship?",
      "Newton's second law",
      ["Newton's first law","Newton's third law","The law of conservation of momentum"],
      "The second law states the relationship among net force, mass, and acceleration: acceleration is the net force divided by the mass. The described doubling and halving follow directly from that relationship. Newton's second law summarizes it.",{});
  },
  function(){
    return mcq("A swimmer pushes water backward with her hands and the water pushes her forward. Which law explains the forward push on the swimmer?",
      "Newton's third law",
      ["Newton's first law","Newton's second law","The law of conservation of momentum"],
      "The third law says forces come in pairs: if the swimmer exerts a force on the water, the water exerts an equal and opposite force on the swimmer. That return force is what pushes her forward. Newton's third law explains it.",{});
  },
  function(){
    return mcq("A loaded sled is harder to start moving and harder to stop than the same sled empty, even on smooth ice. Which law is this resistance to a change in motion describing?",
      "Newton's first law",
      ["Newton's second law","Newton's third law","The law of conservation of momentum"],
      "The first law covers inertia: objects resist changes to their motion, and a greater mass has greater inertia. The heavy sled's reluctance to start or stop is inertia at work. Newton's first law is described.",{});
  },
  function(){
    return mcq("When a bat strikes a ball, the ball exerts a force on the bat that is equal in size and opposite in direction to the force the bat exerts on the ball. Which law states this?",
      "Newton's third law",
      ["Newton's first law","Newton's second law","The law of conservation of momentum"],
      "The third law states that the two forces in an interaction pair are equal in size and opposite in direction, acting on different objects. The bat and ball forces form exactly such a pair. Newton's third law states this.",{});
  }
]));

E("u2-62-inertia",2,["PH11.6.2"],1,"var",varset([
  function(){
    return mcq("A bus brakes suddenly and a passenger's loose lunch bag slides forward off the seat. Which statement correctly explains this using inertia?",
      "The bag keeps its forward velocity while the bus slows under it, so the bag moves forward relative to the bus",
      ["A forward force throws the bag when the brakes are applied",
       "The bag gains mass as the bus slows down",
       "The brakes push the bag forward through the seat"],
      "Inertia means the bag tends to keep the velocity it already had. The bus slows, but nothing slows the bag at the same rate, so it continues forward relative to the bus. The bag keeps its forward velocity while the bus slows.",{});
  },
  function(){
    return mcq("Two identical carts are pushed with the same force, but one carries a heavy toolbox. The loaded cart accelerates less. Which statement correctly explains this using inertia?",
      "The loaded cart has more mass, so it has more inertia and resists the change in motion more strongly",
      ["The loaded cart has less inertia, because heavier objects are easier to keep still",
       "The force on the loaded cart is smaller, because mass absorbs force",
       "The toolbox cancels part of the push before it reaches the cart"],
      "Inertia is measured by mass. More mass means a stronger resistance to a change in velocity, so the same net force produces a smaller acceleration for the loaded cart. The loaded cart has more inertia.",{});
  },
  function(){
    return mcq("A tablecloth is yanked quickly from under a set of dishes, and the dishes stay nearly where they were. Which statement correctly explains this?",
      "The dishes have inertia, and the brief friction from the cloth is not enough to change their motion much in the short time",
      ["The dishes become weightless while the cloth moves",
       "A downward force from the cloth holds the dishes in place",
       "The dishes gain forward speed equal to the speed of the cloth"],
      "The dishes resist a change in their state of rest because of inertia. The cloth acts on them only briefly through friction, so their velocity barely changes before the cloth is gone. Inertia explains why the dishes stay nearly in place.",{});
  },
  function(){
    return mcq("A driver makes a sharp left turn and a package on the back seat slides toward the right side of the car. Which statement correctly explains this using inertia?",
      "The package tends to keep moving in its original straight line while the car turns left under it",
      ["A rightward force appears in the car whenever it turns left",
       "The package's inertia pushes it to the right",
       "The turn increases the package's mass on the right side"],
      "Inertia is not a force: the package simply tends to continue in a straight line. The car turns left away from that line, so relative to the car the package drifts right. The package tends to keep its original straight line motion.",{});
  }
]));

E("u2-62-thirdlaw-pair",2,["PH11.6.2"],1,"var",varset([
  function(){
    return mcq("A rocket expels exhaust gas downward at high speed. Which pair of forces is a Newton's third law pair in this situation?",
      "The rocket pushes the gas down, and the gas pushes the rocket up",
      ["The rocket pushes the gas down, and gravity pulls the rocket down",
       "The gas pushes the rocket up, and gravity pulls the rocket down",
       "The rocket pushes the gas down, and the rocket pushes the launch pad down"],
      "A third law pair acts on two different objects and describes one interaction from both sides. The rocket and the gas interact: the rocket pushes the gas down and the gas pushes the rocket up. The rocket pushes the gas down, and the gas pushes the rocket up.",{});
  },
  function(){
    return mcq("A book rests on a table. Which force is the Newton's third law partner of the gravitational force pulling the book toward Earth?",
      "The book pulls Earth upward with an equal force",
      ["The table pushes the book upward with the normal force",
       "The book pushes the table downward",
       "Earth pulls the table downward"],
      "Third law partners come from the same interaction and act on different objects. Gravity is the Earth and book interaction, so its partner is the book pulling Earth up. The normal force belongs to a different interaction, between the book and the table. The book pulls Earth upward with an equal force.",{});
  },
  function(){
    return mcq("A hammer drives a nail into a board. Which pair of forces is a Newton's third law pair?",
      "The hammer pushes the nail forward, and the nail pushes the hammer backward",
      ["The hammer pushes the nail forward, and friction holds the nail in the board",
       "The nail pushes the board forward, and friction holds the nail",
       "Gravity pulls the hammer down, and the hammer pushes the nail forward"],
      "The hammer and nail interact directly. The hammer exerts a forward force on the nail, and the nail exerts an equal backward force on the hammer, which is part of why the hammer stops. The hammer pushes the nail forward, and the nail pushes the hammer backward.",{});
  },
  function(){
    return mcq("A skater pushes backward against the rink boards and glides forward. Which pair of forces is a Newton's third law pair?",
      "The skater pushes the boards backward, and the boards push the skater forward",
      ["The skater pushes the boards backward, and friction pushes the skater forward",
       "Gravity pulls the skater down, and the boards push the skater forward",
       "The skater pushes the boards backward, and the skater's muscles push the skater forward"],
      "The interaction is between the skater and the boards: a backward force on the boards and a forward force on the skater, equal in size and opposite in direction. The boards push the skater forward is the partner force.",{});
  },
  function(){
    return mcq("A horse pulls a cart, and the cart pulls back on the horse. A student claims the cart can never move because these forces cancel. Which statement gives the correct third law analysis?",
      "The two forces act on different objects, so they do not cancel for either object, and the horse can accelerate if the ground pushes it forward hard enough",
      ["The student is right, because third law pairs always cancel",
       "The cart moves because the pull of the horse is larger than the pull of the cart",
       "The forces cancel only when the cart is moving at constant speed"],
      "Third law partners act on different objects, so they never appear in the same net force sum. The horse accelerates when the ground's forward push on the horse beats the cart's backward pull. The two forces act on different objects, so they do not cancel.",{});
  }
]));

E("u2-62-fma-mc",2,["PH11.6.2"],2,"gen",function(){
  var mode=ri(1,3);
  if(mode===1){
    var m=sfR(rf(2.0,30.0),3), a=sfR(rf(1.5,9.0),3);
    var F=sfR(m*a,4), ans=sfR(F,3);
    return mcq("What net force is needed to give a "+gF(m)+" kg crate an acceleration of "+gF(a)+" m/s^2?",
      F3(ans)+" N",
      [F3(sfR(m/a,3))+" N", F3(sfR(F/2,3))+" N", F3(sfR(F*2,3))+" N"],
      "Newton's second law gives the net force as mass times acceleration: "+gF(m)+" × "+gF(a)+" = "+iF(F)+" N. The net force needed is "+F3(ans)+" N.",
      {mode:mode,m:m,a:a});
  }
  if(mode===2){
    var F2=sfR(rf(30.0,240),3), a2=sfR(rf(1.5,8.0),3);
    var mm=sfR(F2/a2,4), ans2=sfR(mm,3);
    return mcq("A net force of "+gF(F2)+" N gives an unknown mass an acceleration of "+gF(a2)+" m/s^2. What is the mass?",
      F3(ans2)+" kg",
      [F3(sfR(F2*a2,3))+" kg", F3(sfR(F2+a2,3))+" kg", F3(sfR(a2/F2,3))+" kg"],
      "Rearrange Newton's second law to solve for mass: mass is net force divided by acceleration: "+gF(F2)+" / "+gF(a2)+" = "+iF(mm)+" kg. The mass is "+F3(ans2)+" kg.",
      {mode:mode,F:F2,a:a2});
  }
  var F3v=sfR(rf(25.0,220),3), m3=sfR(rf(2.0,28.0),3);
  var av=sfR(F3v/m3,4), ans3=sfR(av,3);
  return mcq("A net force of "+gF(F3v)+" N acts on a "+gF(m3)+" kg snowmobile. What is its acceleration?",
    F3(ans3)+" m/s^2",
    [F3(sfR(F3v*m3,3))+" m/s^2", F3(sfR(m3/F3v,3))+" m/s^2", F3(sfR(F3v+m3,3))+" m/s^2"],
    "Newton's second law gives acceleration as net force divided by mass: "+gF(F3v)+" / "+gF(m3)+" = "+iF(av)+" m/s^2. The acceleration is "+F3(ans3)+" m/s^2.",
    {mode:mode,F:F3v,m:m3});
});

E("u2-62-weight-mass-mc",2,["PH11.6.2"],2,"gen",function(){
  var mode=ri(0,1)===0;
  if(mode){
    var m=sfR(rf(5.0,120),3), wt=sfR(m*9.8,4), ans=sfR(wt,3);
    return mcq("A student has a mass of "+gF(m)+" kg. What is the student's weight near Earth's surface?",
      F3(ans)+" N",
      [F3(sfR(m/9.8,3))+" N", F3(sfR(m+9.8,3))+" N", F3(sfR(wt/2,3))+" N"],
      "Weight is mass times the acceleration due to gravity: "+gF(m)+" × 9.8 = "+iF(wt)+" N. The weight is "+F3(ans)+" N. Mass and weight are different quantities: mass is measured in kilograms and weight, a force, in newtons.",
      {mode:mode,m:m});
  }
  var W=sfR(rf(85.0,880),3), mm=sfR(W/9.8,4), ans2=sfR(mm,3);
  return mcq("A crate weighs "+gF(W)+" N near Earth's surface. What is its mass?",
    F3(ans2)+" kg",
    [F3(sfR(W*9.8,3))+" kg", F3(sfR(W+9.8,3))+" kg", F3(sfR(9.8/W,3))+" kg"],
    "Mass is weight divided by the acceleration due to gravity: "+gF(W)+" / 9.8 = "+iF(mm)+" kg. The mass is "+F3(ans2)+" kg.",
    {mode:mode,W:W});
});

E("u2-62-friction-mc",2,["PH11.6.2"],2,"gen",function(){
  var kinetic=ri(0,1)===0;
  var m=sfR(rf(3.0,40.0),3), mu=kinetic?pick([0.150,0.220,0.280,0.340,0.420,0.480]):pick([0.250,0.320,0.380,0.460,0.540,0.620]);
  var FN=sfR(m*9.8,4), fk=sfR(mu*FN,4), ans=sfR(fk,3);
  var kindWord=kinetic?"kinetic friction acting on it":"maximum static friction that can act on it before it slips";
  var coefWord=kinetic?"coefficient of kinetic friction":"coefficient of static friction";
  return mcq("A "+gF(m)+" kg sled rests on a horizontal surface. The "+coefWord+" between the sled and the surface is "+gF(mu)+". What is the "+kindWord+"?",
    F3(ans)+" N",
    [F3(sfR(mu*m,3))+" N", F3(FN)+" N", F3(sfR(fk*2,3))+" N"],
    "On a horizontal surface with no vertical applied force, the normal force equals the weight: "+gF(m)+" × 9.8 = "+iF(FN)+" N. Friction is the coefficient times the normal force: "+gF(mu)+" × "+iF(FN)+" = "+iF(fk)+" N. The friction is "+F3(ans)+" N.",
    {kinetic:kinetic,m:m,mu:mu});
});


E("u2-62-normal-angled",2,["PH11.6.2"],2,"gen",function(){
  var m=sfR(rf(6.0,25.0),3), F=sfR(rf(20.0,80.0),3), ang=pick([20,30,40]), pull=ri(0,1)===0;
  var rad=ang*Math.PI/180, sinR=sfR(Math.sin(rad),3), Fy=sfR(F*sinR,4);
  var wt=sfR(m*9.8,4), FN=pull?sfR(wt-Fy,4):sfR(wt+Fy,4), ans=sfR(FN,3);
  var verb=pull?"pulls upward on":"pushes downward on";
  var dirWord=pull?"above":"below";
  var line=pull?iF(wt)+" - "+iF(Fy)+" = "+iF(FN)+" N":iF(wt)+" + "+iF(Fy)+" = "+iF(FN)+" N";
  var q=numq("A box of mass "+gF(m)+" kg sits on a horizontal floor. A person "+verb+" the box with a force of "+gF(F)+" N directed at an angle of "+ang+" degrees "+dirWord+" the horizontal. What is the normal force on the box? Give your answer in N.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "The weight is "+gF(m)+" × 9.8 = "+iF(wt)+" N. The vertical component of the applied force is "+gF(F)+" × "+fmt(sinR,3)+" = "+iF(Fy)+" N. " + (pull?"The upward component supports part of the weight, so it reduces the normal force: ":"The downward component adds to the weight, so it increases the normal force: ") + line + " The normal force on the box is "+F3(ans)+" N.",
    {m:m,F:F,ang:ang,pull:pull});
    q.figure=p22AngScene(gF(F)+" N",ang,pull?"pull":"push",null);return q;
});

E("u2-62-connected-blocks-mc",2,["PH11.6.2"],2,"gen",function(){
  var m1=sfR(rf(2.0,15.0),3), m2=sfR(rf(2.0,15.0),3); if(Math.abs(m1-m2)<1.0){m2=sfR(m2+2.5,3);}
  var F=sfR(rf(20.0,120),3), total=sfR(m1+m2,4), a=sfR(F/total,4), ans=sfR(a,3);
  var q=mcq("Two crates of masses "+gF(m1)+" kg and "+gF(m2)+" kg are connected by a light rope on a frictionless horizontal surface. A horizontal pull of "+gF(F)+" N is applied to the second crate. What is the acceleration of the connected crates?",
    F3(ans)+" m/s^2",
    [F3(sfR(F/m1,3))+" m/s^2", F3(sfR(F/m2,3))+" m/s^2", F3(sfR(F*total,3))+" m/s^2"],
    "Treat the two crates as one system. The total mass is "+gF(m1)+" + "+gF(m2)+" = "+iF(total)+" kg. Newton's second law gives the acceleration: "+gF(F)+" / "+iF(total)+" = "+iF(a)+" m/s^2. The acceleration of the connected crates is "+F3(ans)+" m/s^2.",
    {m1:m1,m2:m2,F:F});
    q.figure=p22Connected(gF(m1)+" kg",gF(m2)+" kg",gF(F)+" N");return q;
});

E("u2-62-atwood",2,["PH11.6.2"],2,"gen",function(){
  var mh=sfR(rf(6.0,20.0),3), ml=sfR(rf(1.5,mh-2.0),3);
  var wh=sfR(mh*9.8,4), wl=sfR(ml*9.8,4), diff=sfR(wh-wl,4), tot=sfR(mh+ml,4);
  var ans=sfR(diff/tot,3);
  var q=numq("Two masses of "+gF(mh)+" kg and "+gF(ml)+" kg are connected by a light rope over a frictionless pulley. Take the direction of the heavier mass as positive. What is the magnitude of the acceleration of the system? Give your answer in m/s^2.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "The weights are "+gF(mh)+" × 9.8 = "+iF(wh)+" N and "+gF(ml)+" × 9.8 = "+iF(wl)+" N. Their difference, which drives the system, is "+iF(wh)+" - "+iF(wl)+" = "+iF(diff)+" N. The total mass is "+gF(mh)+" + "+gF(ml)+" = "+iF(tot)+" kg. The acceleration is the driving force divided by the total mass: "+iF(diff)+" / "+iF(tot)+" = "+F3(ans)+" m/s^2. The magnitude of the acceleration is "+F3(ans)+" m/s^2, with the heavier mass going down.",
    {mh:mh,ml:ml});
    q.figure=p22Atwood(gF(mh)+" kg",gF(ml)+" kg");return q;
});

E("u2-62-elevator-mc",2,["PH11.6.2"],2,"gen",function(){
  var m=sfR(rf(50.0,95.0),3), a=sfR(rf(0.800,3.20),3), up=ri(0,1)===0;
  var wt=sfR(m*9.8,4), ma=sfR(m*a,4), FN=up?sfR(wt+ma,4):sfR(wt-ma,4), ans=sfR(FN,3);
  var desc=up?"accelerates upward with an acceleration of "+gF(a)+" m/s^2":"accelerates downward with an acceleration of "+gF(a)+" m/s^2";
  var line=up?iF(wt)+" + "+iF(ma)+" = "+iF(FN)+" N":iF(wt)+" - "+iF(ma)+" = "+iF(FN)+" N";
  var feel=up?"greater than the weight, so the person feels heavier":"less than the weight, so the person feels lighter";
  var q=mcq("A person of mass "+gF(m)+" kg stands on a scale in an elevator that "+desc+". What does the scale read, as the apparent weight of the person?",
    F3(ans)+" N",
    [F3(wt)+" N", F3(up?sfR(wt-ma,3):sfR(wt+ma,3))+" N", F3(ma)+" N"],
    "The apparent weight is the normal force from the floor. The weight is "+gF(m)+" × 9.8 = "+iF(wt)+" N, and the mass times the acceleration is "+gF(m)+" × "+gF(a)+" = "+iF(ma)+" N. " + (up?"For an upward acceleration the floor must push harder than the weight: ":"For a downward acceleration the floor pushes less than the weight: ") + line + " The scale reads "+F3(ans)+" N, which is "+feel+".",
    {m:m,a:a,up:up});
    q.figure=p22Elevator(gF(m)+" kg",gF(a)+" m/s^2",up);return q;
});

E("u2-62-friction-cr",2,["PH11.6.2"],2,"gen",function(){
  var m=sfR(rf(4.0,20.0),3), F=sfR(rf(90.0,180),3), mu=pick([0.150,0.200,0.250,0.300,0.350]);
  var FN=sfR(m*9.8,4), fr=sfR(mu*FN,4), Fnet=sfR(F-fr,4), ans=sfR(Fnet/m,3);
  return numq("A horizontal force of "+gF(F)+" N is applied to a block of mass "+gF(m)+" kg on a horizontal floor. The coefficient of kinetic friction between the block and the floor is "+gF(mu)+". What is the acceleration of the block? Give your answer in m/s^2.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "The normal force equals the weight on this horizontal surface: "+gF(m)+" × 9.8 = "+iF(FN)+" N. Kinetic friction is "+gF(mu)+" × "+iF(FN)+" = "+iF(fr)+" N. The net force is the applied force minus friction: "+gF(F)+" - "+iF(fr)+" = "+iF(Fnet)+" N. Newton's second law gives the acceleration: "+iF(Fnet)+" / "+gF(m)+" = "+F3(ans)+" m/s^2. The acceleration is "+F3(ans)+" m/s^2 in the direction of the applied force.",
    {m:m,F:F,mu:mu});
});

E("u2-62-force-required",2,["PH11.6.2"],2,"gen",function(){
  var m=sfR(rf(5.0,22.0),3), a=sfR(rf(1.0,4.5),3), mu=pick([0.120,0.180,0.240,0.300]);
  var FN=sfR(m*9.8,4), fr=sfR(mu*FN,4), ma=sfR(m*a,4), ans=sfR(ma+fr,3);
  return numq("A crate of mass "+gF(m)+" kg is to be pushed along a horizontal floor with an acceleration of "+gF(a)+" m/s^2. The coefficient of kinetic friction between the crate and the floor is "+gF(mu)+". What horizontal applied force is needed? Give your answer in N.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "The normal force equals the weight: "+gF(m)+" × 9.8 = "+iF(FN)+" N. Kinetic friction is "+gF(mu)+" × "+iF(FN)+" = "+iF(fr)+" N. The net force needed for the acceleration is "+gF(m)+" × "+gF(a)+" = "+iF(ma)+" N. The applied force must supply the net force and overcome friction: "+iF(ma)+" + "+iF(fr)+" = "+F3(ans)+" N. The applied force needed is "+F3(ans)+" N.",
    {m:m,a:a,mu:mu});
});

E("u2-62-system-judgement",2,["PH11.6.2"],3,"var",varset([
  function(){
    return mcq("Two blocks are connected by a rope and pulled along a frictionless surface. A student claims the tension in the rope equals the applied pull, because the rope transmits the pull unchanged. Which judgement is correct?",
      "The claim is wrong: the tension only accelerates the block ahead of the rope, so it is smaller than the applied pull",
      ["The claim is right: a light rope transmits the full pull to both blocks",
       "The claim is wrong: the tension is larger than the applied pull, because the rope adds its own force",
       "The claim is right when the blocks have the same mass, and wrong otherwise"],
      "Treat the pulled block and the leading block separately. The applied pull accelerates both masses together, while the tension only accelerates the leading block. With the same acceleration, a smaller mass needs a smaller force, so the tension is smaller than the applied pull. The claim is wrong.",{});
  },
  function(){
    return mcq("An Atwood machine has two masses of 4.00 kg and 5.00 kg. A student claims the acceleration is the acceleration due to gravity, because the heavier mass simply falls. Which judgement is correct?",
      "The claim is wrong: the lighter mass must also accelerate, so the total mass being accelerated reduces the acceleration below 9.8 m/s^2",
      ["The claim is right: the heavier mass falls freely and the rope only guides it",
       "The claim is wrong: the acceleration is greater than 9.8 m/s^2, because both weights add",
       "The claim is right when the masses are close, and wrong only for very different masses"],
      "The driving force is the difference of the two weights, while both masses must speed up together. Dividing the difference in weight by the total mass gives an acceleration much smaller than 9.8 m/s^2. The claim is wrong.",{});
  },
  function(){
    return mcq("An elevator moves upward at a constant velocity of 2.00 m/s, and a student claims the scale under a rider must read more than the rider's weight because the elevator is moving upward. Which judgement is correct?",
      "The claim is wrong: constant velocity means zero acceleration, so the normal force equals the weight and the scale reads the weight",
      ["The claim is right: any upward motion increases the normal force",
       "The claim is wrong: the scale reads zero while the elevator moves upward",
       "The claim is right only if the elevator is also accelerating"],
      "Apparent weight depends on acceleration, not on velocity. With a constant upward velocity the acceleration is zero, the forces balance, and the normal force equals the weight. The scale reads the weight, and the claim is wrong.",{});
  },
  function(){
    return mcq("A heavy crate and a light crate slide on the same rough floor with the same coefficient of kinetic friction. A student claims the heavy crate slows down faster because its friction force is larger. Which judgement is correct?",
      "The claim is wrong: the heavier crate has more friction but also more mass, and the two effects cancel, so both slow at the same rate",
      ["The claim is right: more friction always means a larger deceleration",
       "The claim is wrong: the heavy crate has less friction because it presses harder",
       "The claim is right: the light crate stops first because it has less inertia"],
      "Kinetic friction is the coefficient times the normal force, which grows with mass, while acceleration is force divided by mass. Both the friction force and the mass scale together, so the deceleration is the coefficient times g for both crates. The claim is wrong.",{});
  },
  function(){
    return mcq("A student argues that a car's tires push backward on the road, and the road therefore cannot push the car forward, so the car should stay put. Which judgement correctly answers this third law argument?",
      "The argument is wrong: the road's forward push acts on the car, while the tire's backward push acts on the road, so the forward push can accelerate the car",
      ["The argument is right: equal and opposite forces always cancel, so a car cannot move by pushing on the road",
       "The argument is wrong: the road's push on the car is larger than the tire's push on the road",
       "The argument is right for a car on ice, but wrong for a car on a dry road"],
      "Third law partners act on different objects and never cancel in one object's net force. The car accelerates because the road pushes it forward, while the backward force acts on the road, not on the car. The argument is wrong.",{});
  }
]));

E("u2-62-angled-pull-friction",2,["PH11.6.2"],3,"gen",function(){
  var m=sfR(rf(12.0,30.0),3), F, ang, mu, rad, cosR, sinR, Fx, Fy, wt, FN, fr, Fnet;
  do { // resample until the pull clearly beats friction: the sled must actually accelerate forward
    F=sfR(rf(60.0,140),3); ang=pick([28,36,42]); mu=pick([0.100,0.160,0.220,0.280]);
    rad=ang*Math.PI/180; cosR=sfR(Math.cos(rad),3); sinR=sfR(Math.sin(rad),3);
    Fx=sfR(F*cosR,4); Fy=sfR(F*sinR,4); wt=sfR(m*9.8,4); FN=sfR(wt-Fy,4); fr=sfR(mu*FN,4); Fnet=sfR(Fx-fr,4);
  } while (Fnet<6);
  var ans=sfR(Fnet/m,3);
  var q=numq("A sled of mass "+gF(m)+" kg is pulled across a level snowfield by a rope at "+ang+" degrees above the horizontal. The rope pulls with "+gF(F)+" N, and the coefficient of kinetic friction between the sled and the snow is "+gF(mu)+". What is the acceleration of the sled? Give your answer in m/s^2.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Work out the forces in turn. The horizontal component of the pull is "+gF(F)+" × "+fmt(cosR,3)+" = "+iF(Fx)+" N, and the vertical component is "+gF(F)+" × "+fmt(sinR,3)+" = "+iF(Fy)+" N. The weight is "+gF(m)+" × 9.8 = "+iF(wt)+" N, so the normal force is "+iF(wt)+" - "+iF(Fy)+" = "+iF(FN)+" N. Kinetic friction is "+gF(mu)+" × "+iF(FN)+" = "+iF(fr)+" N, and the net horizontal force is "+iF(Fx)+" - "+iF(fr)+" = "+iF(Fnet)+" N. The acceleration is "+iF(Fnet)+" / "+gF(m)+" = "+F3(ans)+" m/s^2 in the direction of the pull.",
    {m:m,F:F,ang:ang,mu:mu});
    q.figure=p22AngScene(gF(F)+" N",ang,"pull","friction");return q;
});

E("u2-62-multistep-cr",2,["PH11.6.2"],3,"gen",function(){
  var m=sfR(rf(14.0,26.0),3), F=sfR(rf(70.0,150),3), ang=pick([24,32,38]), mu=pick([0.120,0.180,0.240]), t=pick([3,4,5,6]);
  var rad=ang*Math.PI/180, cosR=sfR(Math.cos(rad),3), sinR=sfR(Math.sin(rad),3);
  var Fx=sfR(F*cosR,4), Fy=sfR(F*sinR,4), wt=sfR(m*9.8,4), FN=sfR(wt-Fy,4), fr=sfR(mu*FN,4), Fnet=sfR(Fx-fr,4);
  var a4=sfR(Fnet/m,4), tt=sfR(t*t,4), prod=sfR(a4*tt,4), ans=sfR(prod/2,3);
  return numq("A crate of mass "+gF(m)+" kg starts from rest on a horizontal floor. A rope pulls it with a force of "+gF(F)+" N at an angle of "+ang+" degrees above the horizontal, and the coefficient of kinetic friction between the crate and the floor is "+gF(mu)+". How far does the crate travel in the first "+t+" s? Give your answer in m.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Resolve the pull first. The horizontal component is "+gF(F)+" × "+fmt(cosR,3)+" = "+iF(Fx)+" N. The vertical component is "+gF(F)+" × "+fmt(sinR,3)+" = "+iF(Fy)+" N. The weight is "+gF(m)+" × 9.8 = "+iF(wt)+" N. The upward component reduces the normal force: "+iF(wt)+" - "+iF(Fy)+" = "+iF(FN)+" N. Kinetic friction is "+gF(mu)+" × "+iF(FN)+" = "+iF(fr)+" N. The net horizontal force is "+iF(Fx)+" - "+iF(fr)+" = "+iF(Fnet)+" N. The acceleration is "+iF(Fnet)+" / "+gF(m)+" = "+iF(a4)+" m/s^2. From rest, the distance is one half times the acceleration times the square of the time. The time squared is "+t+" × "+t+" = "+iF(tt)+" s^2. The acceleration times the time squared is "+iF(a4)+" × "+iF(tt)+" = "+iF(prod)+" m. Halving that gives "+iF(prod)+" / 2 = "+F3(ans)+" m. The crate travels "+F3(ans)+" m in the first "+t+" s.",
    {m:m,F:F,ang:ang,mu:mu,t:t});
});


/* ---------- PH11.6.3 Impulse and momentum ---------- */

E("u2-63-momentum",2,["PH11.6.3"],1,"gen",function(){
  var m=sfR(rf(0.500,12.0),3), v=sfR(rf(2.0,25.0),3), p=sfR(m*v,4), ans=sfR(p,3);
  return numq("Take east as positive. A cart of mass "+gF(m)+" kg rolls east at "+gF(v)+" m/s. What is the momentum of the cart? Give your answer in kg·m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Momentum is mass times velocity: "+gF(m)+" × "+gF(v)+" = "+iF(p)+" kg·m/s. The momentum is "+F3(ans)+" kg·m/s, east.",
    {m:m,v:v});
});

E("u2-63-impulse-concept",2,["PH11.6.3"],1,"var",varset([
  function(){
    return mcq("Impulse is best defined as",
      "The force multiplied by the time the force acts, which equals the change in momentum",
      ["The mass multiplied by the acceleration of the object",
       "The force multiplied by the distance the object moves",
       "The momentum an object has at one instant"],
      "Impulse is force times the time interval, and the impulse-momentum theorem says it equals the change in momentum of the object. It is not an instantaneous momentum, and force times distance is work, a different quantity. Impulse is force times time, equal to the change in momentum.",{});
  },
  function(){
    return mcq("Which unit could be used for impulse?",
      "N·s",
      ["N/m","kg·m/s^2","J"],
      "Impulse is force times time, so its unit is the newton times the second, N·s. That unit is equivalent to the unit of momentum, kg·m/s, as the impulse-momentum theorem requires. N·s is a unit of impulse.",{});
  },
  function(){
    return mcq("A force acts on a ball for a short time and changes the ball's momentum. If the same change in momentum were produced over twice the time, the average force would be",
      "Half as large, because impulse is force times time and the impulse is the same",
      ["Twice as large, because a longer time needs more force",
       "The same, because force does not depend on time",
       "Four times as large, because time is squared in the impulse formula"],
      "The change in momentum fixes the impulse. Since impulse is average force times time, doubling the time for the same impulse halves the average force. Half as large is correct.",{});
  },
  function(){
    return mcq("The impulse-momentum theorem states that",
      "The impulse on an object equals the final momentum minus the initial momentum",
      ["The impulse on an object equals its mass times its acceleration",
       "Momentum is conserved only when a force acts for a long time",
       "The impulse on an object equals the distance it travels times its mass"],
      "The theorem connects the two parts of this section: impulse, force times time, equals the change in momentum, final momentum minus initial momentum. The impulse on an object equals its change in momentum.",{});
  },
  function(){
    return mcq("On a force-time graph, what does the area under the curve represent?",
      "The impulse, and so the change in momentum",
      ["The final momentum of the object",
       "The distance travelled while the force acted",
       "The acceleration of the object"],
      "Area on a force-time graph is force multiplied by time, which is the definition of impulse. By the impulse-momentum theorem, that area also gives the change in momentum. The area represents the impulse.",{});
  }
]));

E("u2-63-change-momentum-rebound",2,["PH11.6.3"],2,"gen",function(){
  var m=sfR(rf(0.300,2.50),3), vi=sfR(rf(4.0,14.0),3), vf=sfR(rf(3.0,12.0),3);
  var pi=sfR(m*vi,4), pf=sfR(m*vf,4), tot=sfR(pi+pf,4), ans=sfR(-tot,3);
  return numq("Take east as positive. A ball of mass "+gF(m)+" kg rolls east at "+gF(vi)+" m/s, strikes a wall, and rebounds west at "+gF(vf)+" m/s. What is the change in momentum of the ball? Give your answer in kg·m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Work with signs, east positive. The initial momentum is "+gF(m)+" × "+gF(vi)+" = "+iF(pi)+" kg·m/s. After the rebound the velocity is west, so the final momentum has the opposite sign, with a magnitude of "+gF(m)+" × "+gF(vf)+" = "+iF(pf)+" kg·m/s. Because the direction reverses, the size of the change is the two magnitudes added together: "+iF(pi)+" + "+iF(pf)+" = "+iF(tot)+" kg·m/s. The change points west, so the change in momentum is "+F3(ans)+" kg·m/s, the negative sign meaning west.",
    {m:m,vi:vi,vf:vf});
});

E("u2-63-impulse-force-time-mc",2,["PH11.6.3"],2,"gen",function(){
  var F=sfR(rf(12.0,95.0),3), t=pick([0.400,0.500,0.600,0.750,1.60,2.00,2.50,3.20]), J=sfR(F*t,4), ans=sfR(J,3);
  return mcq("A steady force of "+gF(F)+" N pushes a ferry fender for "+gF(t)+" s as a boat comes in. What impulse does the force deliver?",
    F3(ans)+" N·s",
    [F3(sfR(F/t,3))+" N·s", F3(sfR(F+t,3))+" N·s", F3(sfR(t/F,3))+" N·s"],
    "Impulse is force times the time the force acts: "+gF(F)+" × "+gF(t)+" = "+iF(J)+" N·s. The impulse delivered is "+F3(ans)+" N·s.",
    {F:F,t:t});
});

E("u2-63-avg-force-mc",2,["PH11.6.3"],2,"gen",function(){
  var dp=sfR(rf(20.0,180),3), t=pick([0.250,0.400,0.500,0.800,1.60,2.00,2.40]), F=sfR(dp/t,4), ans=sfR(F,3);
  return mcq("A goalie stops a puck, and the puck's momentum changes by "+gF(dp)+" kg·m/s during a contact time of "+gF(t)+" s. What average force acted on the puck during the stop?",
    F3(ans)+" N",
    [F3(sfR(dp*t,3))+" N", F3(sfR(dp+t,3))+" N", F3(sfR(t/dp,3))+" N"],
    "By the impulse-momentum theorem, average force times time equals the change in momentum, so the average force is the change in momentum divided by the time: "+gF(dp)+" / "+gF(t)+" = "+iF(F)+" N. The average force is "+F3(ans)+" N.",
    {dp:dp,t:t});
});

E("u2-63-ft-graph-mc",2,["PH11.6.3"],2,"gen",function(){
  var tri=ri(0,1)===0;
  var F=sfR(rf(20.0,90.0),3), t=pick([0.400,0.600,0.800,1.40,1.80]), rect=sfR(F*t,4);
  if(tri){
    var J=sfR(rect/2,4), ans=sfR(J,3);
    var q=mcq("A force-time graph for a bat striking a ball is a triangle. The force rises from zero to a peak of "+gF(F)+" N and returns to zero over "+gF(t)+" s. What is the impulse delivered to the ball?",
      F3(ans)+" N·s",
      [F3(sfR(rect,3))+" N·s", F3(sfR(F/(2*t),3))+" N·s", F3(sfR(F*t*2,3))+" N·s"],
      "Impulse is the area under a force-time graph. First find the area of the surrounding rectangle: "+gF(F)+" × "+gF(t)+" = "+iF(rect)+" N·s. A triangle covers half of that rectangle: "+iF(rect)+" / 2 = "+F3(ans)+" N·s. The impulse delivered is "+F3(ans)+" N·s.",
      {tri:tri,F:F,t:t});
    q.figure=p22Plot({series:[{pts:[[0,0],[t*0.5,F],[t,0]],shade:true}],xt:[[0,"0"],[t,gF(t)]],yt:[[F,gF(F)]],xmax:t*1.1,ymax:F*1.2,xl:"time (s)",yl:"force (N)"});return q;
  }
  var ans2=sfR(rect,3);
  var q=mcq("A force-time graph for a tow rope pull is a rectangle: a steady force of "+gF(F)+" N lasting "+gF(t)+" s. What is the impulse delivered by the rope?",
    F3(ans2)+" N·s",
    [F3(sfR(rect/2,3))+" N·s", F3(sfR(F/t,3))+" N·s", F3(sfR(F+t,3))+" N·s"],
    "Impulse is the area under a force-time graph, and the area of this rectangle is force times time: "+gF(F)+" × "+gF(t)+" = "+iF(rect)+" N·s. The impulse delivered is "+F3(ans2)+" N·s. There is no halving, because the graph is a rectangle, not a triangle.",
    {tri:tri,F:F,t:t});
    q.figure=p22Plot({series:[{pts:[[0,F],[t,F]],shade:true}],xt:[[0,"0"],[t,gF(t)]],yt:[[F,gF(F)]],xmax:t*1.1,ymax:F*1.25,xl:"time (s)",yl:"force (N)"});return q;
});

E("u2-63-impulse-cr",2,["PH11.6.3"],2,"gen",function(){
  var m=sfR(rf(0.300,0.800),3), vi=sfR(rf(5.0,12.0),3), vf=sfR(rf(4.0,10.0),3), t=sfR(rf(0.150,0.400),3);
  var pi=sfR(m*vi,4), pf=sfR(m*vf,4), tot=sfR(pi+pf,4), Fmag=sfR(tot/t,4), ans=sfR(-Fmag,3);
  return numq("Take east as positive. A ball of mass "+gF(m)+" kg travelling east at "+gF(vi)+" m/s strikes a padded wall and rebounds west at "+gF(vf)+" m/s. The ball is in contact with the wall for "+gF(t)+" s. What is the average force exerted on the ball by the wall? Give your answer in N.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Find the momenta first. The initial momentum is "+gF(m)+" × "+gF(vi)+" = "+iF(pi)+" kg·m/s east. The rebound momentum has a magnitude of "+gF(m)+" × "+gF(vf)+" = "+iF(pf)+" kg·m/s, in the west direction. Because the ball reverses direction, the size of the momentum change is "+iF(pi)+" + "+iF(pf)+" = "+iF(tot)+" kg·m/s. The average force is the change in momentum divided by the contact time: "+iF(tot)+" / "+gF(t)+" = "+iF(Fmag)+" N. The force points west, the direction of the change, so the average force exerted on the ball is "+F3(ans)+" N, the negative sign meaning west.",
    {m:m,vi:vi,vf:vf,t:t});
});

E("u2-63-stopping-tradeoff",2,["PH11.6.3"],3,"var",varset([
  function(){
    return mcq("Two identical cars each slow from the same speed to a stop. One stops in 2.0 s on a dry road, and the other takes 6.0 s on an icy approach with gentle braking. Which judgement correctly compares the average braking forces?",
      "The gentle stop needs about one third of the average force, because the same change in momentum spread over three times the time needs one third of the force",
      ["The gentle stop needs three times the force, because the force acts for three times as long",
       "Both stops need the same average force, because the cars and the speeds are the same",
       "The gentle stop needs nine times the force, because time is squared in the impulse"],
      "Both cars have the same change in momentum, so the impulse is fixed. Impulse is average force times time, so three times the time means one third of the average force. The gentle stop needs about one third of the average force.",{});
  },
  function(){
    return mcq("A designer claims that doubling the crumple distance of a bumper, which roughly doubles the stopping time in a low-speed collision, will roughly halve the average force on the car for the same change in speed. Which judgement is correct?",
      "The claim is sound: the change in momentum is unchanged, and doubling the time halves the average force in the impulse-momentum theorem",
      ["The claim fails: a longer crumple distance increases the force because the bumper travels farther",
       "The claim fails: the average force depends only on the mass of the car",
       "The claim is sound, but for the wrong reason, because the momentum itself is halved"],
      "The impulse-momentum theorem says average force times time equals the change in momentum. The car's change in momentum is the same, so doubling the stopping time halves the average force. The claim is sound.",{});
  },
  function(){
    return mcq("A catcher moves his glove backward as he catches a fast ball, while a novice holds his glove rigid. Both catch balls with the same speed and mass. Which judgement correctly compares the forces on their hands?",
      "The catcher feels the smaller average force, because moving the glove lengthens the stopping time for the same change in momentum",
      ["Both feel the same average force, because the balls are identical",
       "The novice feels the smaller force, because a rigid glove stops the ball quickly",
       "The catcher feels the larger force, because his glove travels a longer distance"],
      "Each ball undergoes the same change in momentum. The catcher stretches that change over a longer time, and since average force is the change in momentum divided by the time, his average force is smaller. The catcher feels the smaller average force.",{});
  },
  function(){
    return mcq("An engineer must choose between two dashboard pads for the same test: pad A stops a test head in 0.012 s, and pad B stops it in 0.036 s, both from the same speed. A colleague says pad A is safer because it stops the head sooner. Which judgement is correct?",
      "The colleague is wrong: pad B gives about one third of the average force, because it takes three times as long to produce the same change in momentum",
      ["The colleague is right: a shorter stopping time always means a smaller force",
       "Both pads give the same average force, because the head and speed are the same",
       "Pad B gives three times the force of pad A, because the impulse lasts three times as long"],
      "The change in momentum of the head is the same for both pads. Pad B spreads it over three times the stopping time, so its average force is about one third of pad A's. Quicker is not safer here. The colleague is wrong, and pad B gives about one third of the average force.",{});
  },
  function(){
    return mcq("A student proposes stopping a rolling cart by letting it hit a wall, saying the force is small because the cart stops almost instantly. Which judgement correctly uses the impulse-momentum theorem?",
      "The proposal has it backwards: a near-instant stop means a very large average force for the cart's change in momentum",
      ["The proposal is right: a shorter time always means a smaller force",
       "The proposal is right: the wall absorbs the momentum, so no force is needed",
       "The force cannot be judged without knowing the mass of the wall"],
      "The cart's change in momentum is set by its mass and speed change. Dividing that change by a very small time gives a very large average force. A near-instant stop means a very large average force, so the proposal has it backwards.",{});
  }
]));

/* ---------- PH11.6.4 Egg drop design challenge ---------- */

E("u2-64-crumple-why",2,["PH11.6.4"],1,"var",varset([
  function(){
    return mcq("In an egg drop challenge, a crumple structure around the egg protects it mainly because the structure",
      "Lengthens the stopping time, so the average force on the egg is smaller for the same change in momentum",
      ["Reduces the momentum of the falling egg before it lands",
       "Makes the egg lighter, so it falls more slowly",
       "Stops the egg instantly, before any force can act on it"],
      "The egg's change in momentum at landing is fixed by its mass and landing speed. A crumple structure stretches the stop over a longer time, and average force is the change in momentum divided by the time, so the force on the egg is smaller. Lengthening the stopping time is what protects the egg.",{});
  },
  function(){
    return mcq("A team wraps their egg in thick foam and it survives a drop that cracked an unwrapped egg. The physics reason the foam helps is that the foam",
      "Crushes slowly, increasing the time of the stop and decreasing the average force on the shell",
      ["Removes the egg's momentum while it is still falling",
       "Increases the egg's mass so it lands more gently",
       "Turns the collision into one with no change in momentum"],
      "Foam crushes gradually, so the egg slows over a longer time. The change in momentum is the same, but a longer time means a smaller average force on the shell, below the cracking threshold. Crushing slowly protects the egg.",{});
  },
  function(){
    return mcq("Why do the rules of an egg drop challenge usually limit the size or mass of the protective structure?",
      "So that teams must solve the impulse problem with design, rather than simply adding unlimited cushioning",
      ["Because a larger structure would increase the momentum change of the egg",
       "Because a heavier structure makes the egg fall faster than gravity allows",
       "Because impulse does not apply to large structures"],
      "Unlimited padding would trivially lengthen the stopping time. Limits force teams to trade protection against size and mass and to use the impulse-momentum relationship thoughtfully. The limits keep the design challenge in the design.",{});
  },
  function(){
    return mcq("An egg inside a well designed capsule lands and the capsule bounces slightly, and the egg survives. The survival is best explained by the impulse-momentum theorem because",
      "The capsule gave the egg a long stopping time, so the average force stayed below the level that cracks the shell",
      ["The bounce returned the egg's momentum, so no impulse acted on it",
       "The capsule cancelled gravity during the fall",
       "The egg's momentum was zero at the moment of landing"],
      "The egg still changes its momentum at landing, bounce included. Protection comes from spreading that change over a long enough time that the average force stays small. A long stopping time kept the force below the cracking level.",{});
  }
]));

E("u2-64-increase-time",2,["PH11.6.4"],2,"var",varset([
  function(){
    return mcq("A team's egg cracks on landing. Which design change most directly increases the stopping time of the egg?",
      "Replace the rigid inner box with layers of foam that compress gradually around the egg",
      ["Replace the foam padding with a stiffer plastic shell",
       "Remove one layer of padding so the capsule is lighter",
       "Tape the egg directly to the inside of a hard container"],
      "Stopping time increases when the egg is slowed gradually. Compressible layers that crush or squeeze over a longer travel give a longer stopping time. Rigid shells and direct taping shorten the stop. Layers of foam that compress gradually is the change that increases the stopping time.",{});
  },
  function(){
    return mcq("A capsule survives a low drop but cracks its egg from the full height. Which revision best targets the problem using impulse and momentum?",
      "Add a crumple zone at the bottom that collapses steadily on impact, lengthening the stop from the higher speed",
      ["Paint the capsule so it is easier to see during the drop",
       "Make the capsule walls thinner so the whole structure weighs less",
       "Attach the egg loosely so it can rattle inside the capsule"],
      "From a greater height the egg arrives with more momentum to lose. A collapsible crumple zone lengthens the stopping time, which lowers the average force for that larger change in momentum. A crumple zone that collapses steadily best targets the problem. A loose egg would stop suddenly against the inside wall instead.",{});
  },
  function(){
    return mcq("Two capsules land at the same speed. Capsule A has a long, soft nose cone, and capsule B has a short, rigid nose. Which statement is correct?",
      "The egg in capsule A is stopped over a longer time, so it experiences a smaller average force and is more likely to survive",
      ["The egg in capsule B is safer, because a rigid nose stops it before the force builds up",
       "Both eggs experience the same average force, because they land at the same speed",
       "The egg in capsule A experiences a larger force, because its stopping time is longer"],
      "Both eggs have the same change in momentum, set by the landing speed. The long, soft nose stretches the stop over more time, so the average force is smaller. The egg in capsule A experiences a smaller average force.",{});
  },
  function(){
    return mcq("A team tests a parachute added to their capsule. The egg still cracks, and video shows the capsule lands almost as fast as before but stops abruptly. Which next revision follows from the evidence?",
      "Keep working on the landing: add compressible material under the egg to lengthen the abrupt stop",
      ["Remove the parachute, because it clearly caused the cracking",
       "Drop the capsule from a lower height and report that result",
       "Add a rigid outer frame so the capsule keeps its shape on landing"],
      "The evidence points at the stop itself, which is abrupt. The impulse-momentum fix is to lengthen the stopping time with material that compresses under the egg. A rigid frame would make the stop even more abrupt. Adding compressible material under the egg follows from the evidence.",{});
  }
]));

E("u2-64-explain-result",2,["PH11.6.4"],2,"var",varset([
  function(){
    return mcq("In testing, the same egg capsule was dropped three times from the same height. With a thin foam pad the egg cracked, and with a pad three times as thick it survived twice. Which explanation correctly uses impulse and momentum?",
      "The thicker pad lengthened the stopping time, so the same change in momentum was produced by a smaller average force that the shell could withstand",
      ["The thicker pad reduced the momentum of the egg before landing",
       "The thicker pad increased the impulse on the egg, which protected it",
       "The thicker pad worked because it made the capsule heavier"],
      "The landing speed and mass are unchanged, so the change in momentum is the same in both tests. The thick pad spreads that change over a longer time, giving a smaller average force. The thicker pad lengthened the stopping time and reduced the average force.",{});
  },
  function(){
    return mcq("A team's capsule protected the egg from a 2 m drop but failed from a 4 m drop with the same design. Which explanation correctly uses impulse and momentum?",
      "From 4 m the egg arrives faster, so its momentum change at landing is larger, and the same stopping time then means a larger average force",
      ["Impulse stops working above a certain height, so the design could not help",
       "From 4 m the egg's mass increases, so the force increases",
       "The capsule absorbed all the impulse at 2 m and had none left at 4 m"],
      "A higher drop gives a higher landing speed, hence a larger momentum to lose. If the design stops the egg in about the same time, the average force, the change in momentum divided by the time, is larger and can crack the shell. The larger momentum change explains the failure.",{});
  },
  function(){
    return mcq("After a test, a team finds their egg survived but the bottom layer of their capsule is permanently squashed flat. Which statement correctly interprets this result?",
      "The squashed layer did its job: crushing gave a longer stopping time and a smaller average force, but the layer should be replaced before the next drop",
      ["The capsule failed, because a good design is never damaged",
       "The squashed layer means the egg felt a larger force than an undamaged layer would give",
       "The result cannot be trusted, because a crushed layer changes the mass of the egg"],
      "Crumple material protects by being crushed: the crushing is the motion that stretches out the stop. Once flat, it cannot crush again, so it must be replaced for the next test. The squashed layer did its job and should be replaced.",{});
  },
  function(){
    return mcq("A team adds a small parachute and their egg survives a drop that previously cracked it, even though the capsule still stops abruptly. Which explanation correctly uses impulse and momentum?",
      "The parachute lowered the landing speed, so the egg's momentum change at landing was smaller, and even an abrupt stop then produced a survivable average force",
      ["The parachute increased the stopping time after landing",
       "The parachute removed the need for impulse at landing",
       "The parachute worked because it increased the mass of the capsule"],
      "There are two ways to reduce the average force: lengthen the time, or shrink the change in momentum. The parachute did the second, arriving slower, so the abrupt stop acted on a smaller momentum change. The parachute lowered the landing speed and the momentum change.",{});
  }
]));

E("u2-64-tradeoff",2,["PH11.6.4"],3,"var",varset([
  function(){
    return mcq("A team must pick a cushioning foam. Very soft foam bottoms out in tests, flattening completely before the egg stops, and very firm foam barely compresses. Which choice and reasoning is best?",
      "Choose a medium foam: it keeps compressing through the whole stop without bottoming out, giving the longest useful stopping time",
      ["Choose the very soft foam: softer is always safer, and bottoming out does not matter",
       "Choose the very firm foam: a strong material protects better than a weak one",
       "Choose whichever foam is lightest, because mass decides the force"],
      "Protection needs the cushion to keep compressing for the whole stop. Soft foam that bottoms out leaves a sudden final stop, and firm foam gives a short stop. A medium foam that compresses throughout gives the longest useful stopping time. The medium foam is the best choice.",{});
  },
  function(){
    return mcq("A design meets the size limit and protects the egg, but it is single use: the crumple zone is destroyed each drop, and the rules require the same capsule to survive two scored drops. Which judgement is best?",
      "The design does not yet meet the challenge: revise it, for example with replaceable or recoverable cushioning, so it can protect on both drops",
      ["The design is complete, because it protected the egg once",
       "Drop more gently in the second test and count that as a revision",
       "Add a second egg as a backup in case the first cracks"],
      "A design must be judged against all the stated requirements, not only the successful test. The challenge requires two scored drops, so a destroyed crumple zone that cannot protect twice needs revision, such as replaceable cushioning. The design does not yet meet the challenge.",{});
  },
  function(){
    return mcq("A team can either add more foam, which raises the capsule mass by a third, or add a parachute, which keeps the mass nearly the same but can drift in wind and miss the target zone. The scoring rewards both survival and landing in the zone. Which judgement best weighs the trade-off?",
      "Test both options: the foam lengthens the stopping time but the added mass raises the momentum to be stopped, while the parachute lowers the landing speed but risks the zone, so the scores must be compared in trials",
      ["Choose the foam without testing, because more cushioning always wins",
       "Choose the parachute without testing, because lower mass always wins",
       "Choose neither, because any trade-off means the design has failed"],
      "Each option helps one factor and hurts another. Extra foam lengthens the stopping time but increases the momentum change, while the parachute reduces the momentum change but adds landing risk. Only comparative testing against the scoring can settle the choice. Testing both options is the best judgement.",{});
  },
  function(){
    return mcq("In trials, design A protects the egg in 9 of 10 drops but is hard to open, sometimes cracking eggs when the egg is removed for judging. Design B protects in 8 of 10 drops and opens cleanly. Which judgement is most defensible?",
      "The comparison is genuinely close: A protects better in the drop itself, but if removal cracking counts against the team, B may score better overall, so the scoring rules decide",
      ["A is clearly better in every way, because 9 of 10 beats 8 of 10",
       "B is clearly better in every way, because ease of opening is the whole challenge",
       "Neither result counts, because a perfect design would protect in 10 of 10 drops"],
      "Judging a design means weighing performance on every part of the task, including the judging step. A is stronger on drop survival, while B avoids removal losses. Which scores better depends on how the rules count removal cracking. The comparison is genuinely close, and the scoring rules decide.",{});
  }
]));


/* ---------- PH11.6.5 Conservation of momentum ---------- */

E("u2-65-conservation-concept",2,["PH11.6.5"],1,"var",varset([
  function(){
    return mcq("In a one dimensional collision between two carts on a level track, the total momentum of the two carts is conserved when",
      "The net external force on the two-cart system is zero or negligible during the collision",
      ["The carts stick together after the collision",
       "The carts have equal masses",
       "No kinetic energy is lost in the collision"],
      "Conservation of momentum follows from the impulse-momentum theorem applied to the whole system: if the net external force is zero, or its impulse during the brief collision is negligible, the total momentum does not change. Sticking and equal masses are not required. The total momentum is conserved when the net external force is negligible.",{});
  },
  function(){
    return mcq("Two skaters push off each other on level ice, starting from rest. After the push, the total momentum of the two skaters is",
      "Zero, the same as before the push",
      ["Equal to the momentum of the heavier skater",
       "Greater than before, because both skaters are moving",
       "Impossible to state, because they move in opposite directions"],
      "The push is internal to the two-skater system, so total momentum is conserved. It starts at zero, so it stays zero: the two momenta are equal in size and opposite in direction. The total momentum is zero.",{});
  },
  function(){
    return mcq("Which statement about a collision in which two carts stick together is correct?",
      "Total momentum is conserved, but some kinetic energy is changed to other forms",
      ["Total momentum and total kinetic energy are both conserved",
       "Total momentum is not conserved, because the carts stick",
       "The final velocity is the average of the two masses"],
      "Sticking collisions conserve total momentum, provided external impulses are negligible, but they are inelastic: some kinetic energy becomes heat, sound, and deformation. Total momentum is conserved, but kinetic energy is not.",{});
  },
  function(){
    return mcq("A firecracker at rest explodes into two pieces that fly apart. Which statement is correct?",
      "The total momentum after the explosion is zero, because it was zero before and the explosion forces are internal",
      ["Each piece must have the same momentum as the other piece in the same direction",
       "The total momentum after is greater than before, because the pieces move fast",
       "Momentum is not conserved in explosions, only in collisions"],
      "The explosion forces act inside the system, so they cannot change the total momentum. It was zero at rest, so the vector sum afterward is zero, with the pieces carrying equal and opposite momenta. The total momentum after the explosion is zero.",{});
  }
]));

E("u2-65-momentum-compare-mc",2,["PH11.6.5"],2,"gen",function(){
  var m1=sfR(rf(1.0,6.0),3), v1=sfR(rf(3.0,9.0),3), m2=sfR(rf(1.0,5.0),3), v2=sfR(rf(1.0,4.0),3);
  var p1=sfR(m1*v1,4), p2=sfR(m2*v2,4); while(p1<=p2+5){v1=sfR(v1+2.0,3); p1=sfR(m1*v1,4);}
  var tot=sfR(p1-p2,4), ans=sfR(tot,3);
  return mcq("Take east as positive. Cart A, of mass "+gF(m1)+" kg, moves east at "+gF(v1)+" m/s, and cart B, of mass "+gF(m2)+" kg, moves west at "+gF(v2)+" m/s. What is the total momentum of the two carts?",
    F3(ans)+" kg·m/s",
    [F3(sfR(p1+p2,3))+" kg·m/s", F3(sfR(-tot,3))+" kg·m/s", F3(p1)+" kg·m/s"],
    "Momentum is a vector, so signs matter. Cart A has momentum "+gF(m1)+" × "+gF(v1)+" = "+iF(p1)+" kg·m/s east. Cart B moves west, so its momentum counts as negative, with a magnitude of "+gF(m2)+" × "+gF(v2)+" = "+iF(p2)+" kg·m/s. The total is "+iF(p1)+" - "+iF(p2)+" = "+iF(tot)+" kg·m/s. The total momentum is "+F3(ans)+" kg·m/s, east.",
    {m1:m1,v1:v1,m2:m2,v2:v2});
});

E("u2-65-stick-velocity-mc",2,["PH11.6.5"],2,"gen",function(){
  var m1=sfR(rf(1.0,6.0),3), m2=sfR(rf(1.0,6.0),3); if(Math.abs(m1-m2)<1.0){m2=sfR(m2+1.5,3);}
  var v1=sfR(rf(2.0,10.0),3), p=sfR(m1*v1,4), tot=sfR(m1+m2,4), vf=sfR(p/tot,4), ans=sfR(vf,3);
  return mcq("A cart of mass "+gF(m1)+" kg moving at "+gF(v1)+" m/s collides with a stationary cart of mass "+gF(m2)+" kg, and the two carts stick together. What is their common velocity after the collision?",
    F3(ans)+" m/s",
    [F3(sfR(p/m2,3))+" m/s", F3(v1)+" m/s", F3(sfR(ans*2,3))+" m/s"],
    "Total momentum is conserved. Before the collision the momentum is "+gF(m1)+" × "+gF(v1)+" = "+iF(p)+" kg·m/s. The combined mass is "+gF(m1)+" + "+gF(m2)+" = "+iF(tot)+" kg. The common velocity is "+iF(p)+" / "+iF(tot)+" = "+iF(vf)+" m/s. Their common velocity is "+F3(ans)+" m/s.",
    {m1:m1,m2:m2,v1:v1});
});

E("u2-65-stick-cr",2,["PH11.6.5"],2,"gen",function(){
  var m1=sfR(rf(2.0,8.0),3), v1=sfR(rf(3.0,11.0),3), m2=sfR(rf(1.0,6.0),3), v2=sfR(rf(0.500,3.00),3);
  if(v2>=v1){v2=sfR(v1/3,3);}
  var p1=sfR(m1*v1,4), p2=sfR(m2*v2,4), ptot=sfR(p1+p2,4), tot=sfR(m1+m2,4), ans=sfR(ptot/tot,3);
  return numq("Take east as positive. A cart of mass "+gF(m1)+" kg moving east at "+gF(v1)+" m/s catches up with a cart of mass "+gF(m2)+" kg moving east at "+gF(v2)+" m/s. The carts collide and stick together. What is their common velocity? Give your answer in m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Total momentum is conserved. The first cart has momentum "+gF(m1)+" × "+gF(v1)+" = "+iF(p1)+" kg·m/s. The second cart has momentum "+gF(m2)+" × "+gF(v2)+" = "+iF(p2)+" kg·m/s. The total momentum is "+iF(p1)+" + "+iF(p2)+" = "+iF(ptot)+" kg·m/s. The combined mass is "+gF(m1)+" + "+gF(m2)+" = "+iF(tot)+" kg. The common velocity is "+iF(ptot)+" / "+iF(tot)+" = "+F3(ans)+" m/s. Their common velocity is "+F3(ans)+" m/s east.",
    {m1:m1,v1:v1,m2:m2,v2:v2});
});

E("u2-65-rebound-velocity",2,["PH11.6.5"],2,"gen",function(){
  var m1=sfR(rf(1.0,5.0),3), v1i=sfR(rf(5.0,12.0),3), v1f=sfR(rf(1.0,3.5),3), m2=sfR(rf(1.0,6.0),3);
  var pi=sfR(m1*v1i,4), p1f=sfR(m1*v1f,4), rem=sfR(pi-p1f,4), ans=sfR(rem/m2,3);
  return numq("Take east as positive. A cart of mass "+gF(m1)+" kg moving east at "+gF(v1i)+" m/s collides with a stationary cart of mass "+gF(m2)+" kg. After the collision the first cart continues east at "+gF(v1f)+" m/s. What is the velocity of the second cart after the collision? Give your answer in m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Total momentum is conserved. Before the collision the momentum is "+gF(m1)+" × "+gF(v1i)+" = "+iF(pi)+" kg·m/s. After the collision the first cart keeps "+gF(m1)+" × "+gF(v1f)+" = "+iF(p1f)+" kg·m/s. The second cart must carry the rest: "+iF(pi)+" - "+iF(p1f)+" = "+iF(rem)+" kg·m/s. Its velocity is "+iF(rem)+" / "+gF(m2)+" = "+F3(ans)+" m/s. The velocity of the second cart is "+F3(ans)+" m/s east.",
    {m1:m1,v1i:v1i,v1f:v1f,m2:m2});
});

E("u2-65-explosion-recoil-mc",2,["PH11.6.5"],2,"gen",function(){
  var m1=sfR(rf(2.0,9.0),3), v1=sfR(rf(1.5,7.0),3), m2=sfR(rf(10.0,60.0),3);
  var p=sfR(m1*v1,4), vr=sfR(p/m2,4), ans=sfR(vr,3);
  return mcq("A loaded cart of mass "+gF(m2)+" kg is at rest on a level track. A spring launches a ball of mass "+gF(m1)+" kg east from the cart at "+gF(v1)+" m/s relative to the ground. What is the recoil velocity of the cart?",
    F3(ans)+" m/s west",
    [F3(sfR(v1*m2/m1,3))+" m/s west", F3(v1)+" m/s west", F3(ans)+" m/s east"],
    "The system starts at rest, so its total momentum is zero, and the launch forces are internal. The ball carries momentum "+gF(m1)+" × "+gF(v1)+" = "+iF(p)+" kg·m/s east. The cart must carry the same size of momentum west: "+iF(p)+" / "+gF(m2)+" = "+iF(vr)+" m/s. The recoil velocity of the cart is "+F3(ans)+" m/s west.",
    {m1:m1,v1:v1,m2:m2});
});

E("u2-65-collision-cr",2,["PH11.6.5"],3,"gen",function(){
  var mA=sfR(rf(1.5,5.0),3), vAi=sfR(rf(4.0,10.0),3), vAf=sfR(rf(1.5,4.5),3), vB=sfR(rf(2.0,7.0),3);
  var pi=sfR(mA*vAi,4), pAfmag=sfR(mA*vAf,4), pB=sfR(pi+pAfmag,4), ans=sfR(pB/vB,3);
  return numq("Take east as positive. A cart of mass "+gF(mA)+" kg moving east at "+gF(vAi)+" m/s collides with a stationary cart of unknown mass. After the collision the first cart rebounds west at "+gF(vAf)+" m/s, and the second cart moves east at "+gF(vB)+" m/s. What is the mass of the second cart? Give your answer in kg.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Use conservation of momentum with signs, east positive. Before the collision the momentum is "+gF(mA)+" × "+gF(vAi)+" = "+iF(pi)+" kg·m/s. After the collision the first cart moves west, so its momentum is negative, with a magnitude of "+gF(mA)+" × "+gF(vAf)+" = "+iF(pAfmag)+" kg·m/s. For the total to stay the same, the second cart must carry the initial momentum plus that magnitude: "+iF(pi)+" + "+iF(pAfmag)+" = "+iF(pB)+" kg·m/s. The mass of the second cart is that momentum divided by its velocity: "+iF(pB)+" / "+gF(vB)+" = "+F3(ans)+" kg. The mass of the second cart is "+F3(ans)+" kg. The rebound is why the second cart carries more momentum than the first cart started with.",
    {mA:mA,vAi:vAi,vAf:vAf,vB:vB});
});

E("u2-65-unknown-quantity",2,["PH11.6.5"],3,"gen",function(){
  var mode=ri(1,3);
  if(mode===1){
    var m1=sfR(rf(1.0,6.0),3), m2=sfR(rf(1.0,6.0),3), vf=sfR(rf(1.5,4.5),3);
    var tot=sfR(m1+m2,4), num=sfR(tot*vf,4), ans=sfR(num/m1,3);
    return numq("A moving cart collides with a stationary cart and the two stick together, moving afterward at "+gF(vf)+" m/s. The moving cart has a mass of "+gF(m1)+" kg and the stationary cart has a mass of "+gF(m2)+" kg. What was the velocity of the moving cart before the collision? Give your answer in m/s.",
      ans, Math.max(0.02*Math.abs(ans),1e-9),
      "The total momentum after the collision equals the total momentum before it. The combined mass is "+gF(m1)+" + "+gF(m2)+" = "+iF(tot)+" kg. The momentum after the collision is "+iF(tot)+" × "+gF(vf)+" = "+iF(num)+" kg·m/s. All of that momentum came from the moving cart, so its initial velocity was "+iF(num)+" / "+gF(m1)+" = "+F3(ans)+" m/s. The velocity before the collision was "+F3(ans)+" m/s.",
      {mode:mode,m1:m1,m2:m2,vf:vf});
  }
  if(mode===2){
    var mA=sfR(rf(0.500,3.00),3), vA=sfR(rf(3.0,9.0),3), vB=sfR(rf(1.0,5.0),3);
    var p=sfR(mA*vA,4), ans=sfR(p/vB,3);
    return numq("A device at rest on level ice splits into two pieces. One piece, of mass "+gF(mA)+" kg, moves east at "+gF(vA)+" m/s. The other piece moves west at "+gF(vB)+" m/s. What is the mass of the second piece? Give your answer in kg.",
      ans, Math.max(0.02*Math.abs(ans),1e-9),
      "The device starts at rest, so the total momentum is zero and stays zero: the two pieces carry equal sizes of momentum in opposite directions. The first piece carries "+gF(mA)+" × "+gF(vA)+" = "+iF(p)+" kg·m/s. The second piece carries the same size, so its mass is "+iF(p)+" / "+gF(vB)+" = "+F3(ans)+" kg. The mass of the second piece is "+F3(ans)+" kg.",
      {mode:mode,mA:mA,vA:vA,vB:vB});
  }
  var m1=sfR(rf(1.0,5.0),3), v1i=sfR(rf(4.0,10.0),3), m2=sfR(rf(1.0,5.0),3), v2i=sfR(rf(1.0,4.0),3), v1f=sfR(rf(0.500,2.50),3);
  var p1=sfR(m1*v1i,4), p2=sfR(m2*v2i,4), ptot=sfR(p1-p2,4); while(ptot<=sfR(m1*v1f,4)+2){v1i=sfR(v1i+3.0,3); p1=sfR(m1*v1i,4); ptot=sfR(p1-p2,4);}
  var p1f=sfR(m1*v1f,4), rem=sfR(ptot-p1f,4), ans=sfR(rem/m2,3);
  return numq("Take east as positive. A cart of mass "+gF(m1)+" kg moving east at "+gF(v1i)+" m/s meets a cart of mass "+gF(m2)+" kg moving west at "+gF(v2i)+" m/s. After the collision the first cart moves east at "+gF(v1f)+" m/s. What is the velocity of the second cart after the collision? Give your answer in m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Total momentum is conserved, with west momenta negative. The first cart starts with "+gF(m1)+" × "+gF(v1i)+" = "+iF(p1)+" kg·m/s. The second cart starts with a momentum of magnitude "+gF(m2)+" × "+gF(v2i)+" = "+iF(p2)+" kg·m/s pointing west. The total initial momentum is "+iF(p1)+" - "+iF(p2)+" = "+iF(ptot)+" kg·m/s. After the collision the first cart has "+gF(m1)+" × "+gF(v1f)+" = "+iF(p1f)+" kg·m/s. The second cart carries the rest: "+iF(ptot)+" - "+iF(p1f)+" = "+iF(rem)+" kg·m/s. Its velocity is "+iF(rem)+" / "+gF(m2)+" = "+F3(ans)+" m/s. The velocity of the second cart is "+F3(ans)+" m/s, east.",
    {mode:mode,m1:m1,v1i:v1i,m2:m2,v2i:v2i,v1f:v1f});
});

E("u2-65-result-judgement",2,["PH11.6.5"],3,"gen",function(){
  var m1=sfR(rf(2.0,7.0),3), v1=sfR(rf(3.0,9.0),3), m2=sfR(rf(2.0,7.0),3);
  var p=sfR(m1*v1,4), tot=sfR(m1+m2,4), vf=sfR(p/tot,4), ans=sfR(vf,3);
  var claim=sfR(ans*1.6,3); if(claim===ans){claim=sfR(ans+1.25,3);}
  return mcq("A cart of mass "+gF(m1)+" kg moving at "+gF(v1)+" m/s hits a stationary cart of mass "+gF(m2)+" kg and the two stick together. A student reports that the combined carts move at "+gF(claim)+" m/s. Which judgement of the report is correct?",
    "The report is wrong: conservation of momentum gives a common velocity of "+F3(ans)+" m/s",
    ["The report is right: sticking collisions keep the incoming speed for the combined carts",
     "The report is wrong: the combined carts must move faster than "+F3(ans)+" m/s, because their mass is larger",
     "The report cannot be judged, because momentum is not conserved when carts stick"],
    "Check the report against conservation of momentum. The incoming momentum is "+gF(m1)+" × "+gF(v1)+" = "+iF(p)+" kg·m/s. The combined mass is "+gF(m1)+" + "+gF(m2)+" = "+iF(tot)+" kg. The common velocity is "+iF(p)+" / "+iF(tot)+" = "+iF(vf)+" m/s. That is "+F3(ans)+" m/s, not the reported value, so the report is wrong.",
    {m1:m1,v1:v1,m2:m2,claim:claim});
});

/* ----- bank-u3.js ----- */
// Diagram figures (Phase C, Nov 2026): spring graphs and scenes, half life decay curve, pendulum and slope scenes added where the source types carried diagrams; see bank-helpers.js p22 helpers.
// Tranche 6 (Nov 2026): energy bar charts (p22Bars), ramp diagrams (p22Ramp), the angled pull scene and further spring scenes added attach-only. u3-76-friction-cr originally carried its ramp only on draws whose slope length exceeded the height; a guard in that entry (Nov 2026) now draws the slope length above the height on every draw, so the ramp attaches on all draws.
// CRMARKS: u3-75-energy-cr=5
// CRMARKS: u3-711-shm-energy-cr=4
// CRMARKS: u3-76-friction-cr=4
// CRMARKS: u3-73-workenergy-cr=3
// CRMARKS: u3-78-power-cr=3
// CRMARKS: u3-712-classify-cr=2
// Physics 2204 Unit 3 Work and Energy question bank
// Constants used as literals: g = 9.8 m/s^2, c = 3.00 x 10^8 m/s.
// (The shared constants PHYS_G and PHYS_C are defined only in the built
// app preamble, not in the bank-check harness, so this file uses the
// literal values to keep the self-test green.)

/* ---------- 7.1 Force, distance and work ---------- */

E("u3-71-work-parallel",3,["PH11.7.1"],2,"gen",function(){
  var ctx=pick(["A worker pushes a crate","A student pushes a trolley","A ferry worker pushes a loaded cart","A custodian pushes a floor polisher"]);
  var F=sfR(rf(20,90),3),d=sfR(rf(2,11),3),W=sfR(F*d,3);
  return numq(ctx+" with a steady horizontal force of "+gF(F)+" N. It moves "+gF(d)+" m in the direction of the force. How much work is done by the push? Give your answer in J.",W,Math.max(0.02*Math.abs(W),1e-9),
  "Work is force times distance when the force is along the motion: W = F d. "+gF(F)+" N × "+gF(d)+" m = "+F3(W)+" J. The push does "+F3(W)+" J of work.",{F:F,d:d});
});

E("u3-71-work-angle",3,["PH11.7.1"],2,"gen",function(){
  var F=sfR(rf(30,90),3),d=sfR(rf(3,12),3),ang=pick([25,30,35,40,50,55,60]);
  var rad=ang*Math.PI/180,Fp=sfR(F*Math.cos(rad),4),W=sfR(Fp*d,3);
  var q=mcq("A rope pulls a sled with a force of "+gF(F)+" N at an angle of "+ang+" degrees above the horizontal. The sled moves "+gF(d)+" m across the snow. How much work does the rope do?",
    F3(W)+" J",
    [F3(F*d)+" J",F3(F*d*Math.sin(rad))+" J",F3(W/2)+" J"],
    "Only the component of the force along the motion does work. That component is "+iF(Fp)+" N. Then "+iF(Fp)+" N × "+gF(d)+" m = "+F3(W)+" J. The rope does "+F3(W)+" J of work.",{F:F,d:d,ang:ang});
  q.figure=p22AngScene(gF(F)+" N",ang,"pull",null);return q;
});

E("u3-71-work-opposing",3,["PH11.7.1"],1,"var",varset([
  function(){
    return mcq("A box slides across a floor to the east. Kinetic friction acts on the box toward the west. What is the sign of the work done by friction on the box?",
      "Negative, because the friction force points opposite the displacement",
      ["Positive, because friction always does positive work",
       "Zero, because friction does not move the box",
       "Positive, because the box is still moving east"],
      "Work follows the angle between the force and the displacement. Friction points opposite the displacement, so the work is negative. Friction removes kinetic energy from the box.",{});
  },
  function(){
    return mcq("A car is moving north when the driver brakes. The braking force points south. What is the sign of the work done by the braking force?",
      "Negative, because the braking force points opposite the displacement",
      ["Positive, because the car is moving",
       "Zero, because the brakes do not change the direction of travel",
       "Positive, because the braking force is large"],
      "Work follows the angle between the force and the displacement. The braking force points opposite the displacement, so its work is negative and the kinetic energy of the car decreases.",{});
  },
  function(){
    return mcq("A person pushes a crate toward the west while the crate is sliding toward the east. What is the sign of the work done by the push?",
      "Negative, because the push points opposite the displacement",
      ["Positive, because the person is doing the pushing",
       "Zero, because the push and the motion cancel out",
       "Positive, because work is always positive when a person pushes"],
      "Work follows the angle between the force and the displacement. The push points opposite the displacement, so its work is negative, even though the person is exerting a force.",{});
  },
  function(){
    return mcq("A hockey puck slides across the ice and friction slows it down. Which statement about the work done by friction is correct?",
      "Friction does negative work, so the kinetic energy of the puck decreases",
      ["Friction does positive work, so the kinetic energy of the puck increases",
       "Friction does no work, because the puck keeps moving in a straight line",
       "Friction does positive work, because it acts for the whole slide"],
      "Friction acts opposite the displacement of the puck, so its work is negative. Negative work removes energy, so the kinetic energy of the puck decreases as it slides.",{});
  }
]));

E("u3-71-work-lift",3,["PH11.7.1"],2,"gen",function(){
  var m=sfR(rf(2,12),3),h=sfR(rf(1,6),3),w=sfR(m*9.8,4),W=sfR(w*h,3);
  var ctx=pick(["A worker lifts a box","A student lifts a backpack","A dock worker lifts a crate","A lifter raises a loaded tote"]);
  return numq(ctx+" of mass "+gF(m)+" kg straight up at a constant velocity through a height of "+gF(h)+" m. How much work is done by the lifting force? Give your answer in J.",W,Math.max(0.02*Math.abs(W),1e-9),
  "At a constant velocity the lifting force equals the weight. The weight is "+gF(m)+" kg × 9.8 m/s^2 = "+iF(w)+" N. Then "+iF(w)+" N × "+gF(h)+" m = "+F3(W)+" J. The lifting force does "+F3(W)+" J of work.",{m:m,h:h});
});

E("u3-71-total-work",3,["PH11.7.1"],3,"gen",function(){
  var f=sfR(rf(10,25),3),F=sfR(f+rf(35,70),3),d=sfR(rf(3,10),3);
  var Wapp=sfR(F*d,3),Wfric=sfR(f*d,3),Wtot=sfR(Wapp-Wfric,3);
  return mcq("A crate is pushed across a floor with a horizontal force of "+gF(F)+" N. Kinetic friction of "+gF(f)+" N opposes the motion. The crate moves "+gF(d)+" m. What is the total work done on the crate?",
    F3(Wtot)+" J",
    [F3(Wapp)+" J",F3(Wfric)+" J",F3((F+f)*d)+" J"],
    "Work each force separately. The push does "+gF(F)+" N × "+gF(d)+" m = "+F3(Wapp)+" J. Friction does "+gF(f)+" N × "+gF(d)+" m = "+F3(Wfric)+" J, and it is negative because friction opposes the motion. The total work is "+F3(Wapp)+" J - "+F3(Wfric)+" J = "+F3(Wtot)+" J.",{F:F,f:f,d:d});
});

/* ---------- 7.2 Mass, height and speed using energy ---------- */

E("u3-72-ke-basic",3,["PH11.7.2"],2,"gen",function(){
  var m=sfR(rf(1,10),3),vi=sfR(rf(1,6),3),vf=sfR(2*vi,4);
  var v2=sfR(vf*vf,4),hm=sfR(0.5*m,4),ek=sfR(hm*v2,3);
  return numq("A "+gF(m)+" kg object is moving at "+gF(vi)+" m/s. It then speeds up until it is moving twice as fast. What is its kinetic energy at the new speed? Give your answer in J.",ek,Math.max(0.02*Math.abs(ek),1e-9),
  "Twice as fast means a new speed of 2 × "+gF(vi)+" m/s = "+iF(vf)+" m/s. Kinetic energy is Ek = 1/2 m v^2. The new speed squared is "+iF(vf)+" m/s × "+iF(vf)+" m/s = "+iF(v2)+" m^2/s^2. Half the mass is 0.500 × "+gF(m)+" kg = "+iF(hm)+" kg. Then "+iF(hm)+" kg × "+iF(v2)+" m^2/s^2 = "+F3(ek)+" J. The kinetic energy at the new speed is "+F3(ek)+" J, four times what it was at the first speed.",{m:m,vi:vi});
});

E("u3-72-eg-basic",3,["PH11.7.2"],2,"gen",function(){
  var m=sfR(rf(2,12),3),h=sfR(rf(1,8),3),w=sfR(m*9.8,4),eg=sfR(w*h,3);
  var ctx=pick(["A toolbox of mass","A crate of mass","A backpack of mass","A bucket of mass"]);
  return numq(ctx+" "+gF(m)+" kg sits "+gF(h)+" m above the ground, which is taken as the reference level. What is its gravitational potential energy? Give your answer in J.",eg,Math.max(0.02*Math.abs(eg),1e-9),
  "Gravitational potential energy is Eg = m g h, measured from the stated reference level, the ground. The weight is "+gF(m)+" kg × 9.8 m/s^2 = "+iF(w)+" N. Then "+iF(w)+" N × "+gF(h)+" m = "+F3(eg)+" J. The gravitational potential energy is "+F3(eg)+" J.",{m:m,h:h});
});

E("u3-72-reference-level",3,["PH11.7.2"],1,"var",varset([
  function(){
    return mcq("A book is on a shelf 1.50 m above the floor. If the floor is taken as the reference level, what is the gravitational potential energy of the book relative to that level?",
      "Positive, because the book is above the reference level",
      ["Zero, because the book is not moving",
       "Negative, because the book is above the reference level",
       "Zero, because the reference level is always the top of the shelf"],
      "Gravitational potential energy is measured from the chosen reference level. Above the reference level the height is positive, so the potential energy is positive. The reference level is a choice, and the floor is the stated choice here.",{});
  },
  function(){
    return mcq("A diver is 2.00 m below the surface of the water. If the surface is taken as the reference level, what is the sign of the gravitational potential energy of the diver?",
      "Negative, because the diver is below the reference level",
      ["Positive, because the diver is below the surface",
       "Zero, because the diver is in the water",
       "Positive, because gravitational potential energy is always positive"],
      "The height is measured from the reference level. Below the reference level the height is negative, so the gravitational potential energy is negative. A negative value is allowed once a reference level is chosen.",{});
  },
  function(){
    return mcq("Two students calculate the gravitational potential energy of the same box. One takes the floor as the reference level and the other takes the top of a table as the reference level. What happens to their answers?",
      "The two values differ, because the height is measured from a different reference level",
      ["The two values are the same, because potential energy does not depend on the reference level",
       "One value is always zero, because only one reference level is correct",
       "The values differ only if the box is moving"],
      "Gravitational potential energy is Eg = m g h, and h is the height above the chosen reference level. Changing the reference level changes h, so it changes the value of Eg. Changes in Eg, which is what energy calculations use, are the same for either choice.",{});
  },
  function(){
    return mcq("A ball sits on the ground, and the ground is taken as the reference level. What is the gravitational potential energy of the ball?",
      "Zero, because the ball is at the reference level",
      ["Equal to its weight, because it is at the ground",
       "Negative, because it cannot fall any farther",
       "Equal to its kinetic energy, because it is at rest"],
      "At the reference level the height is zero, so Eg = m g h is zero. Zero potential energy at the reference level is the definition of that choice, not a statement that the ball has no energy at all.",{});
  }
]));

E("u3-72-speed-from-ke",3,["PH11.7.2"],2,"gen",function(){
  var Ek=sfR(rf(30,250),3),m=sfR(rf(3,9),3);
  var twoEk=sfR(2*Ek,4),v2=sfR(twoEk/m,4),v=sfR(Math.sqrt(v2),3);
  return numq("A "+gF(m)+" kg object has a kinetic energy of "+gF(Ek)+" J. What is its speed? Give your answer in m/s.",v,Math.max(0.02*Math.abs(v),1e-9),
  "From Ek = 1/2 m v^2, the speed squared is twice the kinetic energy divided by the mass. Twice the kinetic energy is 2 × "+gF(Ek)+" J = "+iF(twoEk)+" J. Then "+iF(twoEk)+" J / "+gF(m)+" kg = "+iF(v2)+" m^2/s^2. The speed is the square root of "+iF(v2)+" m^2/s^2, which is "+F3(v)+" m/s.",{Ek:Ek,m:m});
});

E("u3-72-eg-mcq",3,["PH11.7.2"],2,"gen",function(){
  var m=sfR(rf(2,12),3),h=sfR(rf(2,8),3),w=sfR(m*9.8,4),eg=sfR(w*h,3);
  return mcq("A "+gF(m)+" kg load is raised "+gF(h)+" m above the floor, taken as the reference level. What is its gravitational potential energy?",
    F3(eg)+" J",
    [F3(w)+" J",F3(m*h)+" J",F3(2*eg)+" J"],
    "Gravitational potential energy is Eg = m g h. The weight is "+gF(m)+" kg × 9.8 m/s^2 = "+iF(w)+" N. Then "+iF(w)+" N × "+gF(h)+" m = "+F3(eg)+" J. The gravitational potential energy is "+F3(eg)+" J.",{m:m,h:h});
});

/* ---------- 7.3 Work-energy theorem (kinetic energy only) ---------- */

E("u3-73-workenergy-cr",3,["PH11.7.3"],2,"gen",function(){
  var m=sfR(rf(2,8),3),vi=sfR(rf(2,6),3),vf=sfR(vi+rf(3,7),3);
  var hm=sfR(0.5*m,4),v2i=sfR(vi*vi,4),v2f=sfR(vf*vf,4);
  var eki=sfR(hm*v2i,3),ekf=sfR(hm*v2f,3),W=sfR(ekf-eki,3);
  var ctx=pick(["A cart","A delivery sled","A curling practice stone","A wheeled bin"]);
  return numq(ctx+" of mass "+gF(m)+" kg speeds up from "+gF(vi)+" m/s to "+gF(vf)+" m/s along a level surface. What is the net work done on it? Give your answer in J.",W,Math.max(0.02*Math.abs(W),1e-9),
  "The work-energy theorem says net work equals the change in kinetic energy, and only kinetic energy is involved here. Half the mass is 0.500 × "+gF(m)+" kg = "+iF(hm)+" kg. The initial speed squared is "+gF(vi)+" m/s × "+gF(vi)+" m/s = "+iF(v2i)+" m^2/s^2, so the initial kinetic energy is "+iF(hm)+" kg × "+iF(v2i)+" m^2/s^2 = "+F3(eki)+" J. The final speed squared is "+gF(vf)+" m/s × "+gF(vf)+" m/s = "+iF(v2f)+" m^2/s^2, so the final kinetic energy is "+iF(hm)+" kg × "+iF(v2f)+" m^2/s^2 = "+F3(ekf)+" J. The net work is "+F3(ekf)+" J - "+F3(eki)+" J = "+F3(W)+" J.",{m:m,vi:vi,vf:vf});
});

E("u3-73-final-speed",3,["PH11.7.3"],2,"gen",function(){
  var m=sfR(rf(3,8),3),vi=sfR(rf(2,5),3),W=sfR(rf(60,200),3);
  var hm=sfR(0.5*m,4),v2i=sfR(vi*vi,4),eki=sfR(hm*v2i,3);
  var ekf=sfR(eki+W,4),twoEk=sfR(2*ekf,4),v2=sfR(twoEk/m,4),vf=sfR(Math.sqrt(v2),3);
  return numq("A "+gF(m)+" kg object moving at "+gF(vi)+" m/s has "+gF(W)+" J of net work done on it. Use the work-energy theorem to find its final speed. Give your answer in m/s.",vf,Math.max(0.02*Math.abs(vf),1e-9),
  "The work-energy theorem says net work equals the change in kinetic energy. Half the mass is 0.500 × "+gF(m)+" kg = "+iF(hm)+" kg. The initial speed squared is "+gF(vi)+" m/s × "+gF(vi)+" m/s = "+iF(v2i)+" m^2/s^2, so the initial kinetic energy is "+iF(hm)+" kg × "+iF(v2i)+" m^2/s^2 = "+F3(eki)+" J. Adding the net work gives a final kinetic energy of "+F3(eki)+" J + "+gF(W)+" J = "+iF(ekf)+" J. Twice the final kinetic energy is 2 × "+iF(ekf)+" J = "+iF(twoEk)+" J. Then "+iF(twoEk)+" J / "+gF(m)+" kg = "+iF(v2)+" m^2/s^2. The final speed is the square root of "+iF(v2)+" m^2/s^2, which is "+F3(vf)+" m/s.",{m:m,vi:vi,W:W});
});

E("u3-73-net-work-mcq",3,["PH11.7.3"],2,"gen",function(){
  var m=sfR(rf(2,8),3),vf=sfR(rf(2,5),3),vi=sfR(vf+rf(2,6),3);
  var hm=sfR(0.5*m,4),v2i=sfR(vi*vi,4),v2f=sfR(vf*vf,4);
  var eki=sfR(hm*v2i,3),ekf=sfR(hm*v2f,3),W=sfR(ekf-eki,3);
  return mcq("A "+gF(m)+" kg object slows from "+gF(vi)+" m/s to "+gF(vf)+" m/s. What is the net work done on the object?",
    F3(W)+" J",
    [F3(Math.abs(W))+" J","0 J",F3(eki)+" J"],
    "The work-energy theorem says net work equals the change in kinetic energy. Half the mass is 0.500 × "+gF(m)+" kg = "+iF(hm)+" kg. The initial kinetic energy is "+iF(hm)+" kg × "+iF(v2i)+" m^2/s^2 = "+F3(eki)+" J and the final kinetic energy is "+iF(hm)+" kg × "+iF(v2f)+" m^2/s^2 = "+F3(ekf)+" J. The change is "+F3(ekf)+" J - "+F3(eki)+" J = "+F3(W)+" J. The negative value means the net force does negative work as the object slows.",{m:m,vi:vi,vf:vf});
});

E("u3-73-friction-stop",3,["PH11.7.3"],3,"gen",function(){
  var m=sfR(rf(2,10),3),vi=sfR(rf(3,12),3),d=sfR(rf(4,20),3);
  var v2i=sfR(vi*vi,4),hm=sfR(0.5*m,4),eki=sfR(hm*v2i,3),W=sfR(-eki,3);
  var ctx=pick(["A sled","A hockey puck","A storage bin","A wheeled cooler"]);
  return numq(ctx+" of mass "+gF(m)+" kg slides along a level surface at "+gF(vi)+" m/s and comes to a stop after sliding "+gF(d)+" m. How much work does friction do on it? Give your answer in J.",W,Math.max(0.02*Math.abs(W),1e-9),
  "The object ends at rest, so its final kinetic energy is zero and the work done by friction is the whole change in kinetic energy. The speed squared is "+gF(vi)+" m/s × "+gF(vi)+" m/s = "+iF(v2i)+" m^2/s^2. Half the mass is 0.500 × "+gF(m)+" kg = "+iF(hm)+" kg. The initial kinetic energy is "+iF(hm)+" kg × "+iF(v2i)+" m^2/s^2 = "+F3(eki)+" J. Friction removes all of it, so the work done by friction is "+F3(W)+" J. The negative sign shows that friction points opposite the motion.",{m:m,vi:vi,d:d});
});

/* ---------- 7.4 Mechanical energy ---------- */

E("u3-74-mechanical-sum",3,["PH11.7.4"],1,"gen",function(){
  var ek=sfR(rf(20,300),3),eg=sfR(rf(20,300),3),em=sfR(ek+eg,3);
  var q=numq("At one point in its motion an object has a kinetic energy of "+gF(ek)+" J and a gravitational potential energy of "+gF(eg)+" J, measured from the stated reference level. What is its mechanical energy at that point? Give your answer in J.",em,Math.max(0.02*Math.abs(em),1e-9),
  "Mechanical energy is the sum of the kinetic and potential energies: Em = Ek + Eg. "+gF(ek)+" J + "+gF(eg)+" J = "+F3(em)+" J. The mechanical energy is "+F3(em)+" J.",{ek:ek,eg:eg});
  q.figure=p22Bars([{t:"kinetic",v:ek,vl:F3(ek)+" J"},{t:"gravitational",v:eg,vl:F3(eg)+" J"}]);return q;
});

E("u3-74-mechanical-concept",3,["PH11.7.4"],1,"var",varset([
  function(){
    return mcq("Mechanical energy is best defined as",
      "The sum of the kinetic energy and the potential energy of an object",
      ["The kinetic energy minus the potential energy of an object",
       "The total heat energy of an object",
       "The work done on an object, whatever its speed"],
      "Mechanical energy is Em = Ek + Ep, the kinetic energy plus the potential energies present. It is a sum, not a difference, and it does not include heat energy.",{});
  },
  function(){
    var a=ri(40,90),b=ri(10,35);
    return mcq("At a given instant an object has "+a+" J of kinetic energy and "+b+" J of gravitational potential energy. Its mechanical energy is",
      (a+b)+" J",
      [(a-b)+" J",(a*b)+" J",(a+b+50)+" J"],
      "Mechanical energy is the sum of kinetic and potential energies. Adding the two values gives "+(a+b)+" J. The mechanical energy is "+(a+b)+" J.",{a:a,b:b});
  },
  function(){
    return mcq("A falling ball gains kinetic energy and loses gravitational potential energy. If no friction acts, its mechanical energy",
      "Stays the same, because the loss in potential energy equals the gain in kinetic energy",
      ["Increases, because the kinetic energy increases",
       "Decreases, because the potential energy decreases",
       "Stays the same only at the top of the fall"],
      "Mechanical energy is the sum of the two. Energy moves from the gravitational store to the kinetic store, and with no friction nothing leaves, so the sum stays the same.",{});
  },
  function(){
    return mcq("Which list contains only forms of energy that are counted in mechanical energy?",
      "Kinetic energy and gravitational potential energy",
      ["Kinetic energy and heat energy",
       "Gravitational potential energy and heat energy",
       "Heat energy and electrical energy"],
      "In this course mechanical energy is the sum of kinetic energy and potential energy, and here the potential energy is gravitational. Heat energy is not part of the mechanical energy total.",{});
  }
]));

E("u3-74-find-ek",3,["PH11.7.4"],2,"gen",function(){
  var eg=sfR(rf(50,200),3),em=sfR(eg+rf(50,250),3),ek=sfR(em-eg,3);
  var q=numq("An object has a mechanical energy of "+gF(em)+" J. At the point of interest its gravitational potential energy, measured from the stated reference level, is "+gF(eg)+" J. What is its kinetic energy at that point? Give your answer in J.",ek,Math.max(0.02*Math.abs(ek),1e-9),
  "Mechanical energy is the sum: Em = Ek + Eg, so Ek = Em - Eg. "+gF(em)+" J - "+gF(eg)+" J = "+F3(ek)+" J. The kinetic energy is "+F3(ek)+" J.",{em:em,eg:eg});
  q.figure=p22Bars([{t:"mechanical",v:em,vl:F3(em)+" J"},{t:"gravitational",v:eg,vl:F3(eg)+" J"}]);return q;
});

E("u3-74-find-height",3,["PH11.7.4"],3,"gen",function(){
  var m=sfR(rf(2,6),3),v=sfR(rf(2,6),3),em=sfR(rf(150,400),3);
  var v2=sfR(v*v,4),hm=sfR(0.5*m,4),ek=sfR(hm*v2,3);
  var eg=sfR(em-ek,3),w=sfR(m*9.8,4),h=sfR(eg/w,3);
  return numq("A "+gF(m)+" kg object moving at "+gF(v)+" m/s has a mechanical energy of "+gF(em)+" J. How high is the object above the reference level? Give your answer in m.",h,Math.max(0.02*Math.abs(h),1e-9),
  "First find the kinetic energy. The speed squared is "+gF(v)+" m/s × "+gF(v)+" m/s = "+iF(v2)+" m^2/s^2. Half the mass is 0.500 × "+gF(m)+" kg = "+iF(hm)+" kg. The kinetic energy is "+iF(hm)+" kg × "+iF(v2)+" m^2/s^2 = "+F3(ek)+" J. The rest of the mechanical energy is gravitational: "+gF(em)+" J - "+F3(ek)+" J = "+F3(eg)+" J. The weight is "+gF(m)+" kg × 9.8 m/s^2 = "+iF(w)+" N. The height is "+F3(eg)+" J / "+iF(w)+" N = "+F3(h)+" m. The object is "+F3(h)+" m above the reference level.",{m:m,v:v,em:em});
});

/* ---------- 7.5 Kinematics and dynamics using mechanical energy ---------- */

E("u3-75-energy-cr",3,["PH11.7.5"],3,"gen",function(){
  var branch=pick(["lower","needed"]);
  if(branch==="lower"){
    var h1=sfR(rf(6,14),3),h2=sfR(rf(1,Math.max(2,h1-4)),3);
    var dh=sfR(h1-h2,3),v2=sfR(19.6*dh,4),v=sfR(Math.sqrt(v2),3);
    var ctx=pick(["A skier starts from rest at the top of a slope","A toboggan starts from rest at the top of a hill","A cart starts from rest at the top of a ramp"]);
    var q=numq(ctx+" "+gF(h1)+" m above the bottom, taken as the reference level, and reaches a point "+gF(h2)+" m above the bottom. Friction is ignored. What is its speed at the lower point? Give your answer in m/s.",v,Math.max(0.02*Math.abs(v),1e-9),
    "Mechanical energy is conserved when friction is ignored, and gravitational and kinetic changes are the only ones here. The drop in height is "+gF(h1)+" m - "+gF(h2)+" m = "+F3(dh)+" m. The lost gravitational potential energy becomes kinetic energy, so the speed squared is 19.6 m/s^2 × "+F3(dh)+" m = "+iF(v2)+" m^2/s^2. The speed is the square root of "+iF(v2)+" m^2/s^2, which is "+F3(v)+" m/s.",{h1:h1,h2:h2});
    q.figure=p22Ramp({h:h1,h2:h2,hLabel:gF(h1)+" m",h2Label:gF(h2)+" m",ref:true});return q;
  }
  var v=sfR(rf(4,12),3),v2=sfR(v*v,4),h=sfR(v2/19.6,3);
  var ctx2=pick(["A skier starts from rest and wants to reach the bottom of a slope","A sled starts from rest and wants to reach the foot of a hill","A cart starts from rest and wants to reach the bottom of a ramp"]);
  var q2=numq(ctx2+" travelling at "+gF(v)+" m/s. Friction is ignored and the bottom is the reference level. From what height above the bottom must it start? Give your answer in m.",h,Math.max(0.02*Math.abs(h),1e-9),
  "Mechanical energy is conserved when friction is ignored. At the bottom all the starting gravitational potential energy has become kinetic energy, so the height is the speed squared divided by 19.6 m/s^2. The speed squared is "+gF(v)+" m/s × "+gF(v)+" m/s = "+iF(v2)+" m^2/s^2. Then "+iF(v2)+" m^2/s^2 / 19.6 m/s^2 = "+F3(h)+" m. It must start "+F3(h)+" m above the bottom.",{v:v});
  q2.figure=p22Ramp({hLabel:"?",ref:true});return q2;
});

E("u3-75-drop-speed",3,["PH11.7.5"],2,"gen",function(){
  var h=sfR(rf(2,10),3),v2=sfR(19.6*h,4),v=sfR(Math.sqrt(v2),3);
  var ctx=pick(["A ball is dropped from rest from a height","A wrench slips from rest from a height","A stone is released from rest from a height"]);
  return numq(ctx+" of "+gF(h)+" m above the ground, taken as the reference level. Use the mechanical energy concept to find its speed just before it hits the ground. Give your answer in m/s.",v,Math.max(0.02*Math.abs(v),1e-9),
  "With mechanical energy conserved, the lost gravitational potential energy becomes kinetic energy. The speed squared is 19.6 m/s^2 × "+gF(h)+" m = "+iF(v2)+" m^2/s^2. The speed is the square root of "+iF(v2)+" m^2/s^2, which is "+F3(v)+" m/s.",{h:h});
});

E("u3-75-height-for-speed",3,["PH11.7.5"],2,"gen",function(){
  var v=sfR(rf(3,11),3),v2=sfR(v*v,4),h=sfR(v2/19.6,3);
  return numq("Use the mechanical energy concept. An object starts from rest and reaches a speed of "+gF(v)+" m/s at the bottom of a drop, with the bottom as the reference level and friction ignored. From what height was it released? Give your answer in m.",h,Math.max(0.02*Math.abs(h),1e-9),
  "At the bottom all the starting gravitational potential energy has become kinetic energy, so the height is the speed squared divided by 19.6 m/s^2. The speed squared is "+gF(v)+" m/s × "+gF(v)+" m/s = "+iF(v2)+" m^2/s^2. Then "+iF(v2)+" m^2/s^2 / 19.6 m/s^2 = "+F3(h)+" m. It was released from "+F3(h)+" m.",{v:v});
});

E("u3-75-slide-speed",3,["PH11.7.5"],3,"gen",function(){
  var m=sfR(rf(5,40),3),h=sfR(rf(2,8),3),v2=sfR(19.6*h,4),v=sfR(Math.sqrt(v2),3);
  var q=mcq("A "+gF(m)+" kg sled starts from rest at the top of a frictionless slope "+gF(h)+" m above the bottom, taken as the reference level. What is the speed of the sled at the bottom?",
    F3(v)+" m/s",
    [F3(Math.sqrt(9.8*h))+" m/s",F3(2*9.8*h)+" m/s",F3(2*v)+" m/s"],
    "Gravitational potential energy lost becomes kinetic energy gained, and the mass cancels. The speed squared is 19.6 m/s^2 × "+gF(h)+" m = "+iF(v2)+" m^2/s^2. The speed is the square root of "+iF(v2)+" m^2/s^2, which is "+F3(v)+" m/s.",{m:m,h:h});
    q.figure=p22Incline(gF(h)+" m");return q;
});

E("u3-75-pendulum",3,["PH11.7.5"],3,"gen",function(){
  var m=sfR(rf(1,5),3),dh=sfR(rf(1,5),3),v2=sfR(19.6*dh,4),v=sfR(Math.sqrt(v2),3);
  var q=numq("A pendulum bob of mass "+gF(m)+" kg is released from rest at a point "+gF(dh)+" m above its lowest position. The lowest position is taken as the reference level. What is the speed of the bob as it passes the lowest position? Give your answer in m/s.",v,Math.max(0.02*Math.abs(v),1e-9),
  "As the bob swings down, gravitational potential energy becomes kinetic energy and the mass cancels. The speed squared is 19.6 m/s^2 × "+gF(dh)+" m = "+iF(v2)+" m^2/s^2. The speed is the square root of "+iF(v2)+" m^2/s^2, which is "+F3(v)+" m/s.",{m:m,dh:dh});
    q.figure=p22Pendulum(gF(dh)+" m",gF(m)+" kg");return q;
});

/* ---------- 7.6 Conservation of energy with heat ---------- */

E("u3-76-friction-cr",3,["PH11.7.6"],2,"gen",function(){
  var m=sfR(rf(3,8),3),h=sfR(rf(3,7),3),w=sfR(m*9.8,4),eg=sfR(w*h,3);
  var f=sfR(rf(10,25),3),s=sfR(rf(3,6),3);
  // Guard (Nov 2026): a slope length at or below the height cannot exist, so redraw it above the height; if that would make friction heat reach the starting potential energy, cap it just below that bound instead.
  if(s<=h){s=sfR(h+rf(0.5,3),3);if(f*s>=0.98*eg)s=sfR(0.95*eg/f,3);}
  // Extension (Nov 2026, Jason's commission): apply the same energy margin on every draw, not only on redrawn slopes. Friction is a plain given, so redraw it below the 95 percent bound when the bound leaves a range above its 10 N floor; if that range is empty, cap the slope length just below the bound instead.
  if(f*s>=0.98*eg){var fLimit=0.95*eg/s;if(fLimit>10.01){f=sfR(rf(10,0.999*fLimit),3);}else{s=sfR(0.95*eg/f,3);}}
  var Q=sfR(f*s,3);
  var ekf=sfR(eg-Q,3),twoEk=sfR(2*ekf,4),v2=sfR(twoEk/m,4),v=sfR(Math.sqrt(v2),3);
  var q=numq("A "+gF(m)+" kg block starts from rest at the top of a slope "+gF(h)+" m above the bottom, taken as the reference level. As it slides down a slope of length "+gF(s)+" m, friction of "+gF(f)+" N acts on it. What is its speed at the bottom? Give your answer in m/s.",v,Math.max(0.02*Math.abs(v),1e-9),
  "Use conservation of energy with a heat term. The weight is "+gF(m)+" kg × 9.8 m/s^2 = "+iF(w)+" N. The starting gravitational potential energy is "+iF(w)+" N × "+gF(h)+" m = "+F3(eg)+" J. Friction produces heat of "+gF(f)+" N × "+gF(s)+" m = "+F3(Q)+" J. The kinetic energy at the bottom is "+F3(eg)+" J - "+F3(Q)+" J = "+F3(ekf)+" J, so the account balances: potential energy at the top equals kinetic energy at the bottom plus heat. Twice the final kinetic energy is 2 × "+F3(ekf)+" J = "+iF(twoEk)+" J. Then "+iF(twoEk)+" J / "+gF(m)+" kg = "+iF(v2)+" m^2/s^2. The speed is the square root of "+iF(v2)+" m^2/s^2, which is "+F3(v)+" m/s.",{m:m,h:h,f:f,s:s});
  if(s>h)q.figure=p22Ramp({h:h,s:s,hLabel:gF(h)+" m",sLabel:gF(s)+" m",ref:true});return q;
});

E("u3-76-heat-friction",3,["PH11.7.6"],2,"gen",function(){
  var f=sfR(rf(5,50),3),d=sfR(rf(3,18),3),Q=sfR(f*d,3);
  var ctx=pick(["A crate slides across a warehouse floor","A sled slides across level snow","A box slides across a loading dock","A puck slides across rough ice"]);
  return numq(ctx+" against a kinetic friction force of "+gF(f)+" N for a distance of "+gF(d)+" m. How much heat energy is produced by friction? Give your answer in J.",Q,Math.max(0.02*Math.abs(Q),1e-9),
  "The heat produced by friction is the friction force times the distance it acts over. "+gF(f)+" N × "+gF(d)+" m = "+F3(Q)+" J. Friction produces "+F3(Q)+" J of heat energy.",{f:f,d:d});
});

E("u3-76-systems",3,["PH11.7.6"],1,"var",varset([
  function(){
    return mcq("An isolated system is best described as a system in which",
      "No energy and no matter cross the boundary of the system",
      ["Energy crosses the boundary but matter does not",
       "Matter crosses the boundary but energy does not",
       "Energy and matter both cross the boundary freely"],
      "An isolated system is closed off completely: neither energy nor matter crosses its boundary, so its total energy stays constant. A closed system, by contrast, allows energy to cross but not matter.",{});
  },
  function(){
    return mcq("A closed system is best described as a system in which",
      "Energy can cross the boundary, but matter cannot",
      ["No energy and no matter cross the boundary",
       "Matter can cross the boundary, but energy cannot",
       "Matter and energy both cross the boundary freely"],
      "A closed system exchanges energy with its surroundings but keeps its matter inside. An isolated system goes further and exchanges neither energy nor matter.",{});
  },
  function(){
    return mcq("A hot drink in a sealed, well insulated vacuum flask is the closest everyday example of which kind of system?",
      "An isolated system, because almost no energy or matter crosses the walls of the flask",
      ["A closed system, because the drink is a liquid",
       "An open system, because the drink is still hot",
       "An isolated system, because the drink loses heat quickly"],
      "The flask is sealed, so no matter escapes, and its insulation keeps heat transfer very small, so almost no energy crosses the boundary either. That is the closest everyday approach to an isolated system.",{});
  },
  function(){
    return mcq("A sled slides down a hill and friction warms the runners and the snow. If the sled, snow and air nearby are all included in the system, which statement follows from the law of conservation of energy?",
      "The total energy of the system stays the same, with some mechanical energy changed into heat",
      ["The total energy of the system decreases, because heat is a loss",
       "The total energy of the system increases, because heat is created",
       "The mechanical energy stays the same, because energy is conserved"],
      "Conservation applies to the total energy, not to the mechanical part alone. Mechanical energy changes into heat, but the total energy of the whole system stays the same.",{});
  }
]));

E("u3-76-final-speed-heat",3,["PH11.7.6"],3,"gen",function(){
  var m=sfR(rf(2,5),3),vi=sfR(rf(2,4),3),h=sfR(rf(2,5),3),Q=sfR(rf(20,80),3);
  var w=sfR(m*9.8,4),eg=sfR(w*h,3);
  var hm=sfR(0.5*m,4),v2i=sfR(vi*vi,4),eki=sfR(hm*v2i,3);
  var etot=sfR(eki+eg,3),ekf=sfR(etot-Q,3),twoEk=sfR(2*ekf,4),v2=sfR(twoEk/m,4),v=sfR(Math.sqrt(v2),3);
  var q=numq("A "+gF(m)+" kg cart is moving at "+gF(vi)+" m/s at the top of a slope "+gF(h)+" m above the bottom, taken as the reference level. It slides to the bottom, and friction produces "+gF(Q)+" J of heat during the slide. What is its speed at the bottom? Give your answer in m/s.",v,Math.max(0.02*Math.abs(v),1e-9),
  "Start with the total energy at the top. The weight is "+gF(m)+" kg × 9.8 m/s^2 = "+iF(w)+" N, so the gravitational potential energy is "+iF(w)+" N × "+gF(h)+" m = "+F3(eg)+" J. Half the mass is 0.500 × "+gF(m)+" kg = "+iF(hm)+" kg. The initial speed squared is "+gF(vi)+" m/s × "+gF(vi)+" m/s = "+iF(v2i)+" m^2/s^2, so the initial kinetic energy is "+iF(hm)+" kg × "+iF(v2i)+" m^2/s^2 = "+F3(eki)+" J. The total at the top is "+F3(eki)+" J + "+F3(eg)+" J = "+F3(etot)+" J. After the heat loss, the kinetic energy at the bottom is "+F3(etot)+" J - "+gF(Q)+" J = "+F3(ekf)+" J. Twice that is 2 × "+F3(ekf)+" J = "+iF(twoEk)+" J. Then "+iF(twoEk)+" J / "+gF(m)+" kg = "+iF(v2)+" m^2/s^2. The speed is the square root of "+iF(v2)+" m^2/s^2, which is "+F3(v)+" m/s.",{m:m,vi:vi,h:h,Q:Q});
  q.figure=p22Ramp({h:h,hLabel:gF(h)+" m",ref:true});return q;
});

E("u3-76-energy-account",3,["PH11.7.6"],3,"gen",function(){
  var ef=sfR(rf(90,200),3),Q0=sfR(rf(30,70),3),ei=sfR(ef+Q0,3),Q=sfR(ei-ef,3);
  var ctx=pick(["A block slides down a slope and friction acts.","A sled comes down a hill and friction acts.","A cart rolls down a ramp and friction acts."]);
  var q=mcq(ctx+" The total mechanical energy at the top is "+gF(ei)+" J and the kinetic energy at the bottom is "+gF(ef)+" J. How much heat was produced by friction?",
    F3(Q)+" J",
    [F3(ef)+" J",F3(ei)+" J",F3(ei+ef)+" J"],
    "The energy account must balance. The starting total is split between the kinetic energy at the bottom and the heat produced, so the heat is "+gF(ei)+" J - "+gF(ef)+" J = "+F3(Q)+" J.",{ei:ei,ef:ef});
  q.figure=p22Bars([{t:"total at top",v:ei,vl:F3(ei)+" J"},{t:"kinetic at bottom",v:ef,vl:F3(ef)+" J"}]);return q;
});

/* ---------- 7.7 Efficiency ---------- */

E("u3-77-efficiency-basic",3,["PH11.7.7"],2,"gen",function(){
  var use=sfR(rf(40,300),3),tot=sfR(use*rf(1.3,3),3);
  var ratio=sfR(use/tot,4),eff=sfR(ratio*100,3);
  var dev=pick(["A motor","A winch","A light bulb","A small heater"]);
  return numq(dev+" takes in "+gF(tot)+" J of energy and produces "+gF(use)+" J of useful output energy. What is its percent efficiency? Give your answer as a decimal.",eff,Math.max(0.02*Math.abs(eff),1e-9),
  "Percent efficiency is useful output divided by total input, times 100 percent. "+gF(use)+" J / "+gF(tot)+" J = "+iF(ratio)+". Then "+iF(ratio)+" × 100 = "+F3(eff)+". The percent efficiency is "+F3(eff)+" percent.",{use:use,tot:tot});
});

E("u3-77-useful-output",3,["PH11.7.7"],2,"gen",function(){
  var tot=sfR(rf(200,900),3),effp=pick([20,25,30,40,45,50,60,75,80]);
  var dec=sfR(effp/100,4),use=sfR(tot*dec,3);
  return numq("A machine is "+effp+" percent efficient and takes in "+gF(tot)+" J of energy. How much useful output energy does it produce? Give your answer in J.",use,Math.max(0.02*Math.abs(use),1e-9),
  "The efficiency as a decimal is "+effp+" / 100 = "+iF(dec)+". The useful output is the input times that decimal: "+gF(tot)+" J × "+iF(dec)+" = "+F3(use)+" J. The machine produces "+F3(use)+" J of useful output.",{tot:tot,effp:effp});
});

E("u3-77-electrical-mcq",3,["PH11.7.7"],2,"gen",function(){
  var tot=sfR(rf(300,900),3),effp=pick([25,30,40,60,70,80]);
  var use=sfR(tot*effp/100,3);
  return mcq("An electric motor takes in "+gF(tot)+" J of electrical energy and produces "+gF(use)+" J of useful mechanical energy. What is the percent efficiency of the motor?",
    F3(effp)+" percent",
    [F3(10000/effp)+" percent",F3(100-effp)+" percent",F3(effp/2)+" percent"],
    "Percent efficiency is useful output divided by total input, times 100 percent. Dividing the useful mechanical energy by the electrical input and multiplying by 100 gives "+F3(effp)+" percent. The motor is "+F3(effp)+" percent efficient.",{tot:tot,effp:effp});
});

E("u3-77-input-needed",3,["PH11.7.7"],2,"gen",function(){
  var use=sfR(rf(100,240),3),effp=pick([25,40,50,60,75,80]);
  var dec=sfR(effp/100,4),tot=sfR(use/dec,3);
  return numq("A device is "+effp+" percent efficient. How much input energy is needed for it to produce "+gF(use)+" J of useful output energy? Give your answer in J.",tot,Math.max(0.02*Math.abs(tot),1e-9),
  "The efficiency as a decimal is "+effp+" / 100 = "+iF(dec)+". The input is the required output divided by that decimal: "+gF(use)+" J / "+iF(dec)+" = "+F3(tot)+" J. It needs "+F3(tot)+" J of input energy.",{use:use,effp:effp});
});

/* ---------- 7.8 Work, time and power ---------- */

E("u3-78-power-cr",3,["PH11.7.8"],2,"gen",function(){
  var branch=pick(["power","time"]);
  var m=sfR(rf(5,15),3),h=sfR(rf(2,5),3),w=sfR(m*9.8,4),W=sfR(w*h,3);
  if(branch==="power"){
    var t=sfR(rf(4,12),3),P=sfR(W/t,3);
    return numq("A hoist lifts a "+gF(m)+" kg load at a constant speed through a height of "+gF(h)+" m in "+gF(t)+" s. What is the power output of the hoist? Give your answer in W.",P,Math.max(0.02*Math.abs(P),1e-9),
    "At a constant speed the lifting force equals the weight. The weight is "+gF(m)+" kg × 9.8 m/s^2 = "+iF(w)+" N. The work is "+iF(w)+" N × "+gF(h)+" m = "+F3(W)+" J. Power is work divided by time: "+F3(W)+" J / "+gF(t)+" s = "+F3(P)+" W. The power output is "+F3(P)+" W.",{m:m,h:h,t:t});
  }
  var P=sfR(rf(50,200),3),t=sfR(W/P,3);
  return numq("A hoist with a power output of "+gF(P)+" W lifts a "+gF(m)+" kg load at a constant speed through a height of "+gF(h)+" m. How long does the lift take? Give your answer in s.",t,Math.max(0.02*Math.abs(t),1e-9),
  "At a constant speed the lifting force equals the weight. The weight is "+gF(m)+" kg × 9.8 m/s^2 = "+iF(w)+" N. The work needed is "+iF(w)+" N × "+gF(h)+" m = "+F3(W)+" J. Time is work divided by power: "+F3(W)+" J / "+gF(P)+" W = "+F3(t)+" s. The lift takes "+F3(t)+" s.",{m:m,h:h,P:P});
});

E("u3-78-power-basic",3,["PH11.7.8"],2,"gen",function(){
  var F=sfR(rf(20,90),3),d=sfR(rf(2,10),3),t=sfR(rf(5,20),3),W=sfR(F*d,3),P=sfR(W/t,3);
  var ctx=pick(["A motor","A worker","A pump motor","A winch"]);
  return numq(ctx+" exerts a steady force of "+gF(F)+" N and moves its load "+gF(d)+" m in "+gF(t)+" s. What is the power? Give your answer in W.",P,Math.max(0.02*Math.abs(P),1e-9),
  "First find the work: "+gF(F)+" N × "+gF(d)+" m = "+F3(W)+" J. Power is work divided by time: P = W / t. "+F3(W)+" J / "+gF(t)+" s = "+F3(P)+" W. The power is "+F3(P)+" W.",{F:F,d:d,t:t});
});

E("u3-78-power-fv",3,["PH11.7.8"],2,"gen",function(){
  var m=sfR(rf(10,50),3),v=sfR(rf(0.5,1.5),3),w=sfR(m*9.8,4),P=sfR(w*v,3);
  return numq("A motor lifts a "+gF(m)+" kg load straight up at a constant speed of "+gF(v)+" m/s. What is the power output of the motor? Give your answer in W.",P,Math.max(0.02*Math.abs(P),1e-9),
  "At a constant speed the lifting force equals the weight, and power is force times speed: P = F v. The weight is "+gF(m)+" kg × 9.8 m/s^2 = "+iF(w)+" N. Then "+iF(w)+" N × "+gF(v)+" m/s = "+F3(P)+" W. The power output is "+F3(P)+" W.",{m:m,v:v});
});

E("u3-78-time-work",3,["PH11.7.8"],2,"gen",function(){
  var P=sfR(rf(40,120),3),tdraw=sfR(rf(3,8),3),W=sfR(P*tdraw,3),t=sfR(W/P,3);
  return mcq("A motor with a power output of "+gF(P)+" W does "+gF(W)+" J of work. How long does it take?",
    F3(t)+" s",
    [F3(P/W)+" s",F3(W*P)+" s",F3(W/(2*P))+" s"],
    "Power is work divided by time, so time is work divided by power. "+gF(W)+" J / "+gF(P)+" W = "+F3(t)+" s. It takes "+F3(t)+" s.",{P:P,W:W});
});

/* ---------- 7.9 Hooke's law ---------- */

E("u3-79-hooke-force",3,["PH11.7.9"],2,"gen",function(){
  var k=sfR(rf(20,200),3),xcm=ri(5,30),x=sfR(xcm/100,3),F=sfR(k*x,3);
  var ctx=pick(["A spring with a spring constant of","A bungee cord with a spring constant of","A spring scale spring with a spring constant of"]);
  var q=numq(ctx+" "+gF(k)+" N/m is stretched by "+xcm+" cm. How large is the spring force? Give your answer in N.",F,Math.max(0.02*Math.abs(F),1e-9),
  "Hooke's law needs the stretch in metres: "+xcm+" / 100 = "+iF(x)+" m. Then F = k x gives "+gF(k)+" N/m × "+gF(x)+" m = "+F3(F)+" N. The spring force is "+F3(F)+" N, directed back toward the unstretched position.",{k:k,xcm:xcm});
    q.figure=p22Spring(gF(xcm)+" cm","force = ?");return q;
});

E("u3-79-spring-constant",3,["PH11.7.9"],2,"gen",function(){
  var F=sfR(rf(10,90),3),x=sfR(rf(0.10,0.45),3),k=sfR(F/x,3);
  var q=numq("A force of "+gF(F)+" N stretches a spring by "+gF(x)+" m from its unstretched length. What is the spring constant of the spring? Give your answer in N/m.",k,Math.max(0.02*Math.abs(k),1e-9),
  "From Hooke's law, k = F / x. "+gF(F)+" N / "+gF(x)+" m = "+F3(k)+" N/m. The spring constant is "+F3(k)+" N/m.",{F:F,x:x});
    q.figure=p22Spring(gF(x)+" m",gF(F)+" N");return q;
});

E("u3-79-stretch",3,["PH11.7.9"],2,"gen",function(){
  var k=sfR(rf(30,150),3),F=sfR(rf(5,45),3),x=sfR(F/k,3);
  var q=numq("A spring with a spring constant of "+gF(k)+" N/m has a force of "+gF(F)+" N applied to it. How far does it stretch from its unstretched length? Give your answer in m.",x,Math.max(0.02*Math.abs(x),1e-9),
  "From Hooke's law, x = F / k. "+gF(F)+" N / "+gF(k)+" N/m = "+F3(x)+" m. The spring stretches "+F3(x)+" m.",{k:k,F:F});
    q.figure=p22Spring("stretch = ?",gF(F)+" N");return q;
});

E("u3-79-graph-k",3,["PH11.7.9"],2,"gen",function(){
  var k0=sfR(rf(40,180),3),x1=sfR(rf(0.05,0.15),3),x2=sfR(x1+rf(0.10,0.25),3);
  var F1=sfR(k0*x1,3),F2=sfR(k0*x2,3),dF=sfR(F2-F1,3),dx=sfR(x2-x1,3),k=sfR(dF/dx,3);
  var q=mcq("A force-stretch graph for a spring is a straight line through the points ("+gF(x1)+" m, "+gF(F1)+" N) and ("+gF(x2)+" m, "+gF(F2)+" N). What is the spring constant of the spring?",
    F3(k)+" N/m",
    [F3(k/2)+" N/m",F3(2*k)+" N/m",F3(1/k)+" N/m"],
    "The spring constant is the slope of a force-stretch graph: the change in force divided by the change in stretch. The force change is "+gF(F2)+" N - "+gF(F1)+" N = "+F3(dF)+" N and the stretch change is "+gF(x2)+" m - "+gF(x1)+" m = "+F3(dx)+" m. Then "+F3(dF)+" N / "+F3(dx)+" m = "+F3(k)+" N/m. The spring constant is "+F3(k)+" N/m.",{k:k,x1:x1,x2:x2});
    q.figure=p22Plot({series:[{pts:[[x1,F1],[x2,F2]]}],xt:[[x1,gF(x1)],[x2,gF(x2)]],yt:[[F1,gF(F1)],[F2,gF(F2)]],xmax:x2*1.25,ymax:F2*1.25,xl:"stretch (m)",yl:"force (N)",dots:true});return q;
});

E("u3-79-spring-mcq",3,["PH11.7.9"],2,"gen",function(){
  var k=sfR(rf(20,100),3),x=sfR(rf(0.10,0.30),3),F=sfR(k*x,3);
  var q=mcq("A spring with a spring constant of "+gF(k)+" N/m is stretched by "+gF(x)+" m. How large is the spring force?",
    F3(F)+" N",
    [F3(k/x)+" N",F3(k+x)+" N",F3(x/k)+" N"],
    "Hooke's law gives the size of the spring force as F = k x. "+gF(k)+" N/m × "+gF(x)+" m = "+F3(F)+" N. The spring force is "+F3(F)+" N.",{k:k,x:x});
    q.figure=p22Spring(gF(x)+" m","force = ?");return q;
});

/* ---------- 7.10 Simple harmonic motion, horizontal spring ---------- */

E("u3-710-accel-magnitude",3,["PH11.7.10"],2,"gen",function(){
  var k=sfR(rf(10,60),3),m=sfR(rf(1,4),3),x=sfR(rf(0.05,0.20),3);
  var km=sfR(k/m,4),a=sfR(km*x,3);
  var q=numq("A mass of "+gF(m)+" kg on a horizontal spring with spring constant "+gF(k)+" N/m is displaced "+gF(x)+" m from equilibrium. Use a = (k/m) x to find the size of its acceleration. Give your answer in m/s^2.",a,Math.max(0.02*Math.abs(a),1e-9),
  "For a horizontal spring the size of the acceleration is a = (k/m) x. First "+gF(k)+" N/m / "+gF(m)+" kg = "+iF(km)+" 1/s^2. Then "+iF(km)+" 1/s^2 × "+gF(x)+" m = "+F3(a)+" m/s^2. The acceleration is "+F3(a)+" m/s^2, directed back toward equilibrium.",{k:k,m:m,x:x});
    q.figure=p22Spring("displacement "+gF(x)+" m",null);return q;
});

E("u3-710-direction",3,["PH11.7.10"],1,"var",varset([
  function(){
    return mcq("A mass on a horizontal spring is pulled to the right of equilibrium and held there. In which direction is its acceleration while it is held displaced to the right?",
      "To the left, back toward equilibrium",
      ["To the right, away from equilibrium",
       "Zero, because it is held still",
       "Upward, because the spring is stretched"],
      "The spring pulls the mass back toward equilibrium, so the net force and the acceleration point toward equilibrium. Displaced to the right, the acceleration is to the left, opposite the displacement.",{});
  },
  function(){
    return mcq("A mass on a horizontal spring is pushed to the left of equilibrium. In which direction is its acceleration at that point?",
      "To the right, back toward equilibrium",
      ["To the left, away from equilibrium",
       "Zero, because the spring is compressed",
       "In the direction of its velocity, whatever that is"],
      "The compressed spring pushes the mass back toward equilibrium, so the acceleration points toward equilibrium. Displaced to the left, the acceleration is to the right, opposite the displacement.",{});
  },
  function(){
    return mcq("A mass on a horizontal spring passes through the equilibrium position. What is its acceleration at that instant?",
      "Zero, because the spring force is zero at equilibrium",
      ["A maximum, because its speed is a maximum there",
       "Equal to 9.8 m/s^2 downward",
       "The same as at the ends of the motion"],
      "At equilibrium the displacement is zero, so a = (k/m) x is zero. The speed is greatest at equilibrium, but the acceleration is zero there.",{});
  },
  function(){
    return mcq("For a mass on a horizontal spring, the acceleration is always",
      "Directed opposite the displacement, back toward equilibrium",
      ["Directed the same way as the displacement",
       "Directed the same way as the velocity",
       "Zero at every point of the motion"],
      "The relation a = -(k/m) x says the acceleration is proportional to the displacement and opposite in direction. Whatever side of equilibrium the mass is on, its acceleration points back toward equilibrium.",{});
  }
]));

E("u3-710-greatest-accel",3,["PH11.7.10"],1,"var",varset([
  function(){
    return mcq("A mass oscillates on a horizontal spring. At which point is the size of its acceleration greatest?",
      "At the ends of the motion, where the displacement is greatest",
      ["At equilibrium, where the speed is greatest",
       "Halfway between equilibrium and the end of the motion",
       "The acceleration has the same size everywhere"],
      "The acceleration is a = (k/m) x, so it grows with the displacement. The displacement is greatest at the ends of the motion, so the acceleration is greatest there, even though the mass is momentarily at rest at those points.",{});
  },
  function(){
    return mcq("A mass oscillates on a horizontal spring. At which point is its acceleration zero?",
      "At equilibrium, where the displacement is zero",
      ["At the ends of the motion, where the mass stops for an instant",
       "Nowhere, because the mass is always accelerating",
       "At every point, because the motion repeats"],
      "The acceleration is a = (k/m) x. At equilibrium the displacement x is zero, so the acceleration is zero there. At the ends the mass stops for an instant, but its acceleration is at its greatest there.",{});
  },
  function(){
    var k=ri(20,60),m=ri(1,4),x1=pick([0.05,0.08,0.10]);
    return mcq("A "+m+" kg mass on a horizontal spring with spring constant "+k+" N/m is displaced "+gF(x1)+" m from equilibrium, then displaced twice as far. What happens to the size of its acceleration?",
      "It doubles, because the acceleration is proportional to the displacement",
      ["It stays the same, because the mass and spring have not changed",
       "It is cut in half, because the spring is stretched farther",
       "It becomes zero, because the mass is farther from equilibrium"],
      "The acceleration is a = (k/m) x. With k and m fixed, doubling x doubles a. The acceleration is proportional to the displacement and directed opposite to it.",{k:k,m:m,x1:x1});
  },
  function(){
    return mcq("A mass on a horizontal spring is at the right-hand end of its motion, momentarily at rest. Which statement is correct?",
      "Its acceleration is a maximum and points to the left",
      ["Its acceleration is zero because its velocity is zero",
       "Its acceleration is a maximum and points to the right",
       "Its speed and acceleration are both a maximum"],
      "At the end of the motion the displacement is greatest, so a = (k/m) x is greatest. The spring pulls toward equilibrium, so the acceleration points to the left. Zero velocity does not mean zero acceleration.",{});
  }
]));

E("u3-710-accel-judgement",3,["PH11.7.10"],3,"gen",function(){
  var k=sfR(rf(15,60),3),m=sfR(rf(1.5,4),3),x=sfR(rf(0.06,0.22),3);
  var km=sfR(k/m,4),a=sfR(km*x,3);
  var q=mcq("A "+gF(m)+" kg mass on a horizontal spring with spring constant "+gF(k)+" N/m is held "+gF(x)+" m to the right of equilibrium. What is its acceleration when it is released from rest there?",
    F3(a)+" m/s^2 to the left",
    [F3(a)+" m/s^2 to the right",F3(k*x)+" m/s^2 to the left",F3(a/2)+" m/s^2 to the left"],
    "The size of the acceleration is a = (k/m) x. First "+gF(k)+" N/m / "+gF(m)+" kg = "+iF(km)+" 1/s^2. Then "+iF(km)+" 1/s^2 × "+gF(x)+" m = "+F3(a)+" m/s^2. The spring pulls the mass back toward equilibrium, so the acceleration is to the left: "+F3(a)+" m/s^2 to the left.",{k:k,m:m,x:x});
    q.figure=p22Spring("displacement "+gF(x)+" m",null);return q;
});

/* ---------- 7.11 Energies in simple harmonic motion ---------- */

E("u3-711-shm-energy-cr",3,["PH11.7.11"],3,"gen",function(){
  var branch=pick(["table","track"]);
  var k=sfR(rf(20,120),3),A=sfR(rf(0.12,0.30),3),x=sfR(A*rf(0.3,0.7),3);
  var halfk=sfR(0.5*k,4),A2=sfR(A*A,4),x2=sfR(x*x,4);
  var etot=sfR(halfk*A2,3),es=sfR(halfk*x2,3),ke=sfR(etot-es,3);
  var where=branch==="table"?"on a frictionless table":"on a smooth horizontal track";
  var q=numq("A mass oscillates "+where+" on a horizontal spring with spring constant "+gF(k)+" N/m and amplitude "+gF(A)+" m. What is its kinetic energy when it is "+gF(x)+" m from equilibrium? Give your answer in J.",ke,Math.max(0.02*Math.abs(ke),1e-9),
  "The total energy is set by the amplitude, where all the energy is elastic potential energy. Half the spring constant is 0.500 × "+gF(k)+" N/m = "+iF(halfk)+" N/m. The amplitude squared is "+gF(A)+" m × "+gF(A)+" m = "+iF(A2)+" m^2, so the total energy is "+iF(halfk)+" N/m × "+iF(A2)+" m^2 = "+F3(etot)+" J. At the stated displacement, the displacement squared is "+gF(x)+" m × "+gF(x)+" m = "+iF(x2)+" m^2, so the elastic potential energy is "+iF(halfk)+" N/m × "+iF(x2)+" m^2 = "+F3(es)+" J. The rest is kinetic: "+F3(etot)+" J - "+F3(es)+" J = "+F3(ke)+" J. The kinetic energy is "+F3(ke)+" J.",{k:k,A:A,x:x});
  q.figure=p22Spring("displacement "+gF(x)+" m",null);return q;
});

E("u3-711-elastic-pe",3,["PH11.7.11"],2,"gen",function(){
  var k=sfR(rf(20,150),3),x=sfR(rf(0.05,0.35),3);
  var halfk=sfR(0.5*k,4),x2=sfR(x*x,4),es=sfR(halfk*x2,3);
  var q=numq("A spring with spring constant "+gF(k)+" N/m is stretched by "+gF(x)+" m. What is the elastic potential energy stored in the spring? Give your answer in J.",es,Math.max(0.02*Math.abs(es),1e-9),
  "Elastic potential energy is Es = 1/2 k x^2. Half the spring constant is 0.500 × "+gF(k)+" N/m = "+iF(halfk)+" N/m. The stretch squared is "+gF(x)+" m × "+gF(x)+" m = "+iF(x2)+" m^2. Then "+iF(halfk)+" N/m × "+iF(x2)+" m^2 = "+F3(es)+" J. The elastic potential energy is "+F3(es)+" J.",{k:k,x:x});
  q.figure=p22Spring(gF(x)+" m",null);return q;
});

E("u3-711-total-energy",3,["PH11.7.11"],2,"gen",function(){
  var k=sfR(rf(20,150),3),A=sfR(rf(0.08,0.35),3);
  var halfk=sfR(0.5*k,4),A2=sfR(A*A,4),etot=sfR(halfk*A2,3);
  var q=numq("A mass oscillates on a horizontal spring with spring constant "+gF(k)+" N/m and amplitude "+gF(A)+" m. What is the total mechanical energy of the system? Give your answer in J.",etot,Math.max(0.02*Math.abs(etot),1e-9),
  "At the amplitude the mass is momentarily at rest, so all the energy is elastic potential energy and that amount is the total. Half the spring constant is 0.500 × "+gF(k)+" N/m = "+iF(halfk)+" N/m. The amplitude squared is "+gF(A)+" m × "+gF(A)+" m = "+iF(A2)+" m^2. Then "+iF(halfk)+" N/m × "+iF(A2)+" m^2 = "+F3(etot)+" J. The total mechanical energy is "+F3(etot)+" J.",{k:k,A:A});
  q.figure=p22Spring("amplitude "+gF(A)+" m",null);return q;
});

E("u3-711-speed-at-x",3,["PH11.7.11"],3,"gen",function(){
  var m=sfR(rf(0.5,3),3),k=sfR(rf(20,100),3),A=sfR(rf(0.15,0.35),3),x=sfR(A*rf(0.3,0.6),3);
  var halfk=sfR(0.5*k,4),A2=sfR(A*A,4),x2=sfR(x*x,4);
  var etot=sfR(halfk*A2,3),es=sfR(halfk*x2,3),ke=sfR(etot-es,3);
  var twoKe=sfR(2*ke,4),v2=sfR(twoKe/m,4),v=sfR(Math.sqrt(v2),3);
  var q=numq("A "+gF(m)+" kg mass oscillates on a horizontal spring with spring constant "+gF(k)+" N/m and amplitude "+gF(A)+" m. What is its speed when it is "+gF(x)+" m from equilibrium? Give your answer in m/s.",v,Math.max(0.02*Math.abs(v),1e-9),
  "Find the kinetic energy at that displacement first. Half the spring constant is 0.500 × "+gF(k)+" N/m = "+iF(halfk)+" N/m. The total energy, from the amplitude, is "+iF(halfk)+" N/m × "+iF(A2)+" m^2 = "+F3(etot)+" J, using the amplitude squared, "+iF(A2)+" m^2. The elastic potential energy at the displacement is "+iF(halfk)+" N/m × "+iF(x2)+" m^2 = "+F3(es)+" J, using the displacement squared, "+iF(x2)+" m^2. The kinetic energy is "+F3(etot)+" J - "+F3(es)+" J = "+F3(ke)+" J. Twice the kinetic energy is 2 × "+F3(ke)+" J = "+iF(twoKe)+" J. Then "+iF(twoKe)+" J / "+gF(m)+" kg = "+iF(v2)+" m^2/s^2. The speed is the square root of "+iF(v2)+" m^2/s^2, which is "+F3(v)+" m/s.",{m:m,k:k,A:A,x:x});
  q.figure=p22Spring("displacement "+gF(x)+" m",null);return q;
});

E("u3-711-speed-equilibrium",3,["PH11.7.11"],3,"gen",function(){
  var m=sfR(rf(0.5,3),3),k=sfR(rf(20,100),3),A=sfR(rf(0.10,0.35),3);
  var halfk=sfR(0.5*k,4),A2=sfR(A*A,4),etot=sfR(halfk*A2,3);
  var twoE=sfR(2*etot,4),v2=sfR(twoE/m,4),v=sfR(Math.sqrt(v2),3);
  var q=numq("A "+gF(m)+" kg mass oscillates on a horizontal spring with spring constant "+gF(k)+" N/m and amplitude "+gF(A)+" m. What is its speed as it passes through equilibrium? Give your answer in m/s.",v,Math.max(0.02*Math.abs(v),1e-9),
  "At equilibrium the elastic potential energy is zero, so all the total energy is kinetic there. Half the spring constant is 0.500 × "+gF(k)+" N/m = "+iF(halfk)+" N/m. The amplitude squared is "+gF(A)+" m × "+gF(A)+" m = "+iF(A2)+" m^2, so the total energy is "+iF(halfk)+" N/m × "+iF(A2)+" m^2 = "+F3(etot)+" J. Twice the total energy is 2 × "+F3(etot)+" J = "+iF(twoE)+" J. Then "+iF(twoE)+" J / "+gF(m)+" kg = "+iF(v2)+" m^2/s^2. The speed is the square root of "+iF(v2)+" m^2/s^2, which is "+F3(v)+" m/s.",{m:m,k:k,A:A});
  q.figure=p22Spring("amplitude "+gF(A)+" m",null);return q;
});

/* ---------- 7.12 Elastic and inelastic collisions ---------- */

E("u3-712-classify-cr",3,["PH11.7.12"],2,"gen",function(){
  var m1=sfR(rf(2,5),3),v1=sfR(rf(4,8),3),m2=sfR(rf(3,6),3),v2=sfR(rf(1,3),3);
  var p1=sfR(m1*v1,4),p2=sfR(m2*v2,4),ptot=sfR(p1+p2,4),M=sfR(m1+m2,3),vf=sfR(ptot/M,4);
  var hm1=sfR(0.5*m1,4),hm2=sfR(0.5*m2,4),v1sq=sfR(v1*v1,4),v2sq=sfR(v2*v2,4);
  var ke1=sfR(hm1*v1sq,3),ke2=sfR(hm2*v2sq,3),kei=sfR(ke1+ke2,3);
  var hmT=sfR(0.5*M,4),vfsq=sfR(vf*vf,4),kef=sfR(hmT*vfsq,3),lost=sfR(kei-kef,3);
  return numq("Take the direction of motion as positive. A "+gF(m1)+" kg cart moving at "+gF(v1)+" m/s collides with a "+gF(m2)+" kg cart moving at "+gF(v2)+" m/s in the same direction. The carts stick together. How much kinetic energy is lost in the collision? Give your answer in J.",lost,Math.max(0.02*Math.abs(lost),1e-9),
  "Momentum is conserved in the collision, so first find the common final speed. The momenta before are "+gF(m1)+" kg × "+gF(v1)+" m/s = "+iF(p1)+" kg m/s and "+gF(m2)+" kg × "+gF(v2)+" m/s = "+iF(p2)+" kg m/s. The total momentum is "+iF(p1)+" kg m/s + "+iF(p2)+" kg m/s = "+iF(ptot)+" kg m/s. The combined mass is "+gF(M)+" kg, so the final speed is "+iF(ptot)+" kg m/s / "+gF(M)+" kg = "+iF(vf)+" m/s. Now the kinetic energies. Half the first mass is 0.500 × "+gF(m1)+" kg = "+iF(hm1)+" kg and its speed squared is "+iF(v1sq)+" m^2/s^2, giving "+iF(hm1)+" kg × "+iF(v1sq)+" m^2/s^2 = "+F3(ke1)+" J. Half the second mass is 0.500 × "+gF(m2)+" kg = "+iF(hm2)+" kg and its speed squared is "+iF(v2sq)+" m^2/s^2, giving "+iF(hm2)+" kg × "+iF(v2sq)+" m^2/s^2 = "+F3(ke2)+" J. The kinetic energy before is "+F3(ke1)+" J + "+F3(ke2)+" J = "+F3(kei)+" J. Half the combined mass is 0.500 × "+gF(M)+" kg = "+iF(hmT)+" kg and the final speed squared is "+iF(vf)+" m/s × "+iF(vf)+" m/s = "+iF(vfsq)+" m^2/s^2, giving a final kinetic energy of "+iF(hmT)+" kg × "+iF(vfsq)+" m^2/s^2 = "+F3(kef)+" J. The kinetic energy lost is "+F3(kei)+" J - "+F3(kef)+" J = "+F3(lost)+" J. Because the carts stick together and kinetic energy is lost, the collision is inelastic: momentum is conserved, kinetic energy is not.",{m1:m1,v1:v1,m2:m2,v2:v2});
});

E("u3-712-classify-mcq",3,["PH11.7.12"],3,"gen",function(){
  var kind=pick(["elastic","inelastic"]);
  if(kind==="elastic"){
    var m=sfR(rf(1,4),3),v1=sfR(rf(4,8),3),v2=sfR(rf(1,3),3);
    var hm=sfR(0.5*m,4),sumsq=sfR(v1*v1+v2*v2,4),ke=sfR(hm*sumsq,3);
    return mcq("Two carts of equal mass "+gF(m)+" kg collide on a level track. Before the collision one moves at "+gF(v1)+" m/s and the other at "+gF(v2)+" m/s in the same direction. After the collision the first moves at "+gF(v2)+" m/s and the second at "+gF(v1)+" m/s. How should the collision be classified?",
      "Elastic, because the kinetic energy is the same before and after, about "+F3(ke)+" J in both cases",
      ["Inelastic, because kinetic energy is lost in the collision",
       "Elastic, because momentum is not conserved in the collision",
       "Inelastic, because the carts stick together after the collision"],
      "Compute the kinetic energy both times. With equal masses and the speeds simply exchanged, the kinetic energy before is "+F3(ke)+" J and the kinetic energy after is also "+F3(ke)+" J. Kinetic energy is conserved, so the collision is elastic. Momentum is conserved in both kinds of collision, and the carts do not stick.",{m:m,v1:v1,v2:v2});
  }
  var m1=sfR(rf(2,5),3),v1=sfR(rf(4,8),3),m2=sfR(rf(3,6),3),v2=sfR(rf(1,3),3);
  var ptot=sfR(sfR(m1*v1,4)+sfR(m2*v2,4),4),M=sfR(m1+m2,3),vf=sfR(ptot/M,4);
  var kei=sfR(sfR(0.5*m1,4)*sfR(v1*v1,4)+sfR(0.5*m2,4)*sfR(v2*v2,4),3);
  var kef=sfR(sfR(0.5*M,4)*sfR(vf*vf,4),3);
  return mcq("A "+gF(m1)+" kg cart moving at "+gF(v1)+" m/s collides with a "+gF(m2)+" kg cart moving at "+gF(v2)+" m/s in the same direction, and the carts stick together and move off at "+gF(vf)+" m/s. How should the collision be classified?",
    "Inelastic, because the kinetic energy falls from about "+F3(kei)+" J before to about "+F3(kef)+" J after, while momentum is conserved",
    ["Elastic, because the kinetic energy is conserved in the collision",
     "Inelastic, because the kinetic energy increases in the collision",
     "Elastic, because momentum is not conserved in the collision"],
    "Compute the kinetic energy both times. Before the collision it is about "+F3(kei)+" J and after it is about "+F3(kef)+" J, so kinetic energy is not conserved and the collision is inelastic. Momentum is conserved in the collision, as it is in every collision with no outside impulse.",{m1:m1,v1:v1,m2:m2,v2:v2});
});

E("u3-712-ke-lost",3,["PH11.7.12"],2,"gen",function(){
  var kei=sfR(rf(150,600),3),kef=sfR(kei*rf(0.3,0.7),3),lost=sfR(kei-kef,3);
  var q=numq("In a collision, the total kinetic energy of the objects is "+gF(kei)+" J before the collision and "+gF(kef)+" J after the collision. How much kinetic energy is lost in the collision? Give your answer in J.",lost,Math.max(0.02*Math.abs(lost),1e-9),
  "The kinetic energy lost is the drop in kinetic energy. "+gF(kei)+" J - "+gF(kef)+" J = "+F3(lost)+" J. The collision loses "+F3(lost)+" J of kinetic energy, so it is not elastic.",{kei:kei,kef:kef});
  q.figure=p22Bars([{t:"before",v:kei,vl:F3(kei)+" J"},{t:"after",v:kef,vl:F3(kef)+" J"}]);return q;
});

E("u3-712-which-law",3,["PH11.7.12"],1,"var",varset([
  function(){
    return mcq("Two skaters push apart from rest on smooth ice. Which conservation law is best used to find how their speeds compare?",
      "Conservation of momentum, because no outside impulse acts and their total momentum stays zero",
      ["Conservation of kinetic energy, because their kinetic energy stays the same",
       "Conservation of momentum, because their kinetic energy is lost as heat",
       "Neither law, because the skaters start from rest"],
      "The push is internal to the two-skater system, so total momentum is conserved and stays zero. Their kinetic energy increases as they push apart, so kinetic energy is not conserved here. Momentum is the law to use.",{});
  },
  function(){
    return mcq("Two carts collide and stick together. Which statement about the best way to solve for their final speed is correct?",
      "Use conservation of momentum only, because kinetic energy is not conserved when objects stick together",
      ["Use conservation of kinetic energy only, because it is always conserved",
       "Use both laws, because both are always conserved in collisions",
       "Use neither law, because a sticking collision conserves nothing"],
      "In a perfectly inelastic collision the objects stick and kinetic energy is lost, so the kinetic energy equation does not hold. Momentum is still conserved, so the final speed comes from momentum alone.",{});
  },
  function(){
    return mcq("Two steel balls collide and bounce apart, and a check shows their total kinetic energy is the same after the collision as before. Which laws can be used to solve this collision?",
      "Both conservation of momentum and conservation of kinetic energy",
      ["Conservation of momentum only",
       "Conservation of kinetic energy only",
       "Neither law, because the balls bounce"],
      "Equal kinetic energy before and after marks the collision as elastic. In an elastic collision both momentum and kinetic energy are conserved, so both laws are available to solve it.",{});
  },
  function(){
    return mcq("To decide whether a real collision is elastic or inelastic, what must be calculated?",
      "The total kinetic energy before the collision and the total kinetic energy after it",
      ["The total momentum before the collision only",
       "The mass of each object before and after",
       "The temperature of the objects after the collision"],
      "Momentum is conserved in both kinds of collision, so it cannot tell them apart. The test is kinetic energy: if it is conserved the collision is elastic, and if it drops the collision is inelastic.",{});
  }
]));

/* ---------- 7.13 Radioactive decay ---------- */

E("u3-713-alpha-properties",3,["PH11.7.13"],1,"var",varset([
  function(){
    return mcq("An alpha particle is best described as",
      "A helium nucleus, made of two protons and two neutrons",
      ["A high-energy electron from the nucleus",
       "A packet of electromagnetic radiation",
       "A single proton"],
      "An alpha particle is the nucleus of a helium atom: two protons and two neutrons, with a charge of +2 and a mass number of 4.",{});
  },
  function(){
    return mcq("What is the charge of an alpha particle?",
      "+2, because it contains two protons and no electrons",
      ["-1, because it is emitted from the nucleus",
       "0, because it is a form of radiation",
       "+1, because it contains one proton"],
      "An alpha particle has two protons and no electrons, so its net charge is +2. Beta minus particles carry -1 and gamma rays carry no charge.",{});
  },
  function(){
    return mcq("Which radiation is stopped by a sheet of paper or the outer layer of skin?",
      "Alpha radiation",
      ["Beta radiation","Gamma radiation","All three radiations equally"],
      "Alpha particles are large and slow down quickly, so paper or skin stops them. Beta particles need a few millimetres of aluminium, and gamma rays need dense material such as lead to reduce them.",{});
  },
  function(){
    return mcq("Which radiation is the most strongly ionizing?",
      "Alpha radiation, because it is large, carries a +2 charge and interacts strongly with atoms",
      ["Gamma radiation, because it travels the farthest",
       "Beta radiation, because it is an electron",
       "All three are equally ionizing"],
      "Ionizing power and penetrating power run in opposite directions here. Alpha particles interact strongly and ionize heavily over a short range, while gamma rays ionize weakly but penetrate far.",{});
  },
  function(){
    return mcq("What is the mass number of an alpha particle?",
      "4, from its two protons and two neutrons",
      ["2, from its two protons only",
       "0, because it is radiation",
       "1, like a hydrogen nucleus"],
      "Mass number counts protons plus neutrons. An alpha particle has two of each, so its mass number is 4. A hydrogen nucleus, a single proton, has mass number 1.",{});
  }
]));

E("u3-713-beta-gamma",3,["PH11.7.13"],1,"var",varset([
  function(){
    return mcq("A beta minus particle is best described as",
      "A high-energy electron emitted from the nucleus when a neutron changes into a proton",
      ["A helium nucleus emitted from the nucleus",
       "A packet of electromagnetic radiation",
       "An electron knocked out of an electron cloud by a photon"],
      "In beta minus decay a neutron in the nucleus changes into a proton and an electron, and the electron is emitted as the beta particle. The atomic number rises by 1 and the mass number stays the same.",{});
  },
  function(){
    return mcq("Gamma radiation is best described as",
      "Electromagnetic radiation with no charge and no mass, emitted from an excited nucleus",
      ["A fast electron with a charge of -1",
       "A helium nucleus with a charge of +2",
       "A stream of neutrons"],
      "Gamma rays are high-energy electromagnetic radiation. They carry no charge and no mass, so emitting a gamma ray does not change the mass number or the atomic number of the nucleus.",{});
  },
  function(){
    return mcq("Which radiation is the most penetrating?",
      "Gamma radiation, which needs thick lead or concrete to reduce it",
      ["Alpha radiation, which is stopped by paper",
       "Beta radiation, which is stopped by a few millimetres of aluminium",
       "All three are equally penetrating"],
      "Penetrating power is the reverse of ionizing power. Alpha is stopped by paper, beta by a few millimetres of aluminium, and gamma only reduced by dense shielding such as lead.",{});
  },
  function(){
    return mcq("What is the charge of a beta minus particle?",
      "-1, because it is an electron",
      ["+2, because it comes from the nucleus",
       "0, because it has almost no mass",
       "+1, because a proton is created with it"],
      "A beta minus particle is an electron, so it carries a charge of -1. The proton created at the same time stays in the nucleus, which is why the atomic number rises by 1.",{});
  },
  function(){
    return mcq("A nucleus emits a gamma ray. What happens to its mass number and atomic number?",
      "Neither changes, because a gamma ray carries away only energy",
      ["The mass number falls by 4 and the atomic number falls by 2",
       "The mass number stays the same and the atomic number rises by 1",
       "The mass number falls by 1 and the atomic number stays the same"],
      "Gamma emission changes only the energy of the nucleus. With no particles leaving, the mass number and atomic number are unchanged, unlike alpha decay (mass number -4, atomic number -2) or beta minus decay (atomic number +1).",{});
  }
]));

E("u3-713-nuclear-notation",3,["PH11.7.13"],1,"gen",function(){
  var nuc=pick([["carbon",6,12],["carbon",6,14],["oxygen",8,16],["oxygen",8,18],["calcium",20,40],["calcium",20,44],["iron",26,56],["iron",26,54],["zinc",30,64],["lead",82,208],["lead",82,206],["uranium",92,238],["uranium",92,235],["sodium",11,23],["aluminium",13,27],["gold",79,197],["nitrogen",7,14],["chlorine",17,35],["copper",29,63],["silver",47,107],["tin",50,118],["barium",56,138],["potassium",19,39],["helium",2,4]]);
  var ask=pick(["neutrons","protons","electrons"]);
  var name=nuc[0],Z=nuc[1],A=nuc[2];
  if(ask==="neutrons"){
    var n=A-Z;
    return numq("An atom of "+name+"-"+A+" has a mass number of "+A+" and an atomic number of "+Z+". How many neutrons does its nucleus contain? Give your answer as a whole number.",n,0.4,
    "The mass number counts protons plus neutrons, so the neutron count is the mass number minus the atomic number. "+A+" - "+Z+" = "+n+". The nucleus contains "+n+" neutrons.",{A:A,Z:Z,ask:ask});
  }
  if(ask==="protons"){
    return numq("An atom of "+name+"-"+A+" has a mass number of "+A+" and an atomic number of "+Z+". How many protons does its nucleus contain? Give your answer as a whole number.",Z,0.4,
    "The atomic number is the number of protons, by definition. The atomic number is "+Z+", so the nucleus contains "+Z+" protons.",{A:A,Z:Z,ask:ask});
  }
  return numq("A neutral atom of "+name+"-"+A+" has a mass number of "+A+" and an atomic number of "+Z+". How many electrons does the neutral atom have? Give your answer as a whole number.",Z,0.4,
  "A neutral atom has equal numbers of protons and electrons, so that the charges balance. The atomic number gives "+Z+" protons, so the neutral atom has "+Z+" electrons.",{A:A,Z:Z,ask:ask});
});

E("u3-713-alpha-decay",3,["PH11.7.13"],2,"gen",function(){
  var par=pick([["uranium",238,92,"thorium"],["uranium",235,92,"thorium"],["radium",226,88,"radon"],["polonium",210,84,"lead"],["radon",222,86,"polonium"],["thorium",232,90,"radium"],["americium",241,95,"neptunium"],["plutonium",239,94,"uranium"]]);
  var pn=par[0],A=par[1],Z=par[2],dn=par[3];
  var dname=dn.charAt(0).toUpperCase()+dn.slice(1),pname=pn.charAt(0).toUpperCase()+pn.slice(1);
  var ctx=pick(["found in a rock sample","found in a reactor fuel rod","used in a smoke detector source","held in a medical research sample","found in a geological survey sample","found in a museum mineral specimen","used in a power station fuel pellet","held in a laboratory sample"]);
  return mcq(pname+"-"+A+" (atomic number "+Z+"), "+ctx+", undergoes alpha decay. What is the daughter nucleus?",
    dname+"-"+(A-4),
    [dname+"-"+A,dname+"-"+(A-6),pname+"-"+(A-4)],
    "In alpha decay the nucleus loses an alpha particle with mass number 4 and atomic number 2, so the mass number falls by 4 and the atomic number falls by 2. The check on mass numbers is "+(A-4)+" + 4 = "+A+", and on atomic numbers is "+(Z-2)+" + 2 = "+Z+". Atomic number "+(Z-2)+" is "+dn+", so the daughter is "+dname+"-"+(A-4)+".",{pn:pn,A:A,Z:Z});
});

E("u3-713-beta-decay",3,["PH11.7.13"],2,"gen",function(){
  var par=pick([["carbon",14,6,"nitrogen","boron"],["strontium",90,38,"yttrium","rubidium"],["cobalt",60,27,"nickel","iron"],["iodine",131,53,"xenon","tellurium"],["phosphorus",32,15,"sulfur","silicon"],["sodium",24,11,"magnesium","neon"],["caesium",137,55,"barium","iodine"]]);
  var pn=par[0],A=par[1],Z=par[2],dn=par[3],mn=par[4];
  var dname=dn.charAt(0).toUpperCase()+dn.slice(1),pname=pn.charAt(0).toUpperCase()+pn.slice(1),mname=mn.charAt(0).toUpperCase()+mn.slice(1);
  var ctx=pick(["used as a hospital tracer","found in fallout monitoring samples","used in a cancer treatment unit","held in a laboratory sample","used in an industrial gauge","found in a dated archaeological sample","used in a research reactor sample","held in a calibration source"]);
  return mcq(pname+"-"+A+" (atomic number "+Z+"), "+ctx+", undergoes beta minus decay. What is the daughter nucleus?",
    dname+"-"+A,
    [mname+"-"+A,dname+"-"+(A-1),pname+"-"+A],
    "In beta minus decay a neutron changes into a proton and an electron, and the electron is emitted. The mass number stays the same and the atomic number rises by 1, from "+Z+" to "+(Z+1)+". Atomic number "+(Z+1)+" is "+dn+", so the daughter is "+dname+"-"+A+".",{pn:pn,A:A,Z:Z});
});

E("u3-713-radiation-match",3,["PH11.7.13"],2,"var",varset([
  function(){
    return mcq("A mixed source emits alpha, beta and gamma radiation. Which radiation passes through a sheet of paper but is stopped by a few millimetres of aluminium?",
      "Beta radiation",
      ["Alpha radiation",
       "Gamma radiation",
       "All three pass through paper and are stopped by aluminium"],
      "Each radiation has its shielding material. Paper stops alpha, so alpha never reaches the aluminium. A few millimetres of aluminium stops beta. Gamma passes through both paper and aluminium and needs lead or concrete to reduce it. So the radiation described is beta radiation.",{});
  },
  function(){
    return mcq("A worker handles a sealed alpha source with thin gloves. Why is the alpha radiation a low external hazard in this case?",
      "Alpha particles are stopped by the gloves and the outer layer of skin, so they do not reach living tissue",
      ["Alpha particles have no charge, so they cannot damage tissue",
       "Alpha sources give off no radiation until they are heated",
       "Alpha particles pass straight through the body without interacting"],
      "Alpha particles are strongly ionizing but have a very short range. Stopped by gloves and dead surface skin, they do not reach living tissue from outside the body, though an alpha emitter inside the body is a serious hazard.",{});
  },
  function(){
    return mcq("Which radiation would a Geiger counter detect most easily through the wall of a sealed metal container?",
      "Gamma radiation, because it is penetrating enough to pass through the container wall",
      ["Alpha radiation, because it is the most ionizing",
       "Beta radiation, because electrons pass through metal easily",
       "None, because sealed containers block all radiation"],
      "Alpha is stopped by paper and beta by a few millimetres of aluminium, so neither crosses a metal container wall well. Gamma rays are far more penetrating and can be detected through the wall.",{});
  },
  function(){
    return mcq("Beta radiation is directed at a target. Which change happens in the emitting nucleus during beta minus decay?",
      "A neutron changes into a proton, so the atomic number rises by 1 and the mass number is unchanged",
      ["Two protons and two neutrons leave, so the mass number falls by 4",
       "Energy leaves only, so neither number changes",
       "A proton changes into a neutron, so the atomic number falls by 1"],
      "Beta minus decay converts a neutron into a proton plus the emitted electron. The nucleon count, the mass number, is unchanged, and the extra proton raises the atomic number by 1.",{});
  }
]));

/* ---------- 7.14 Sources and half-life ---------- */

E("u3-714-sources",3,["PH11.7.14"],1,"var",varset([
  function(){
    return mcq("Which of these is a natural source of radioactivity?",
      "Radon gas seeping from rocks and soil into basements",
      ["A hospital CT scanner",
       "A nuclear generating station",
       "An americium smoke detector"],
      "Radon comes from the decay of uranium in rocks and soil, so it is part of the natural background. Scanners, generating stations and smoke detectors are constructed sources made by people.",{});
  },
  function(){
    return mcq("Which of these is a constructed source of radioactivity?",
      "A medical radioisotope used in a hospital scan",
      ["Cosmic rays arriving from space",
       "Potassium-40 in food and in the human body",
       "Uranium naturally present in granite"],
      "A medical radioisotope is produced and used by people, so it is a constructed source. Cosmic rays, potassium-40 and uranium in rock are natural background sources.",{});
  },
  function(){
    return mcq("Most of the natural background radiation dose received by people in Newfoundland and Labrador comes from",
      "Radon gas from the ground, along with cosmic rays and natural material in food and rock",
      ["Medical X-rays taken at clinics",
       "Fallout from power stations in other provinces",
       "Household smoke detectors"],
      "Natural background comes from the environment itself: radon from rocks and soil is usually the largest share, with cosmic rays and naturally radioactive material in food, water and rock making up the rest. Medical and household sources are constructed and usually smaller.",{});
  },
  function(){
    return mcq("Cosmic rays are classified as which kind of source of radioactivity?",
      "A natural source, because they arrive from space without any human involvement",
      ["A constructed source, because they are detected by instruments",
       "A natural source only when the Sun is active",
       "A constructed source, because satellites produce them"],
      "Cosmic rays are high-energy particles from space that have always reached Earth. They are part of the natural background, not something people built.",{});
  }
]));

E("u3-714-half-life-remaining",3,["PH11.7.14"],2,"gen",function(){
  var init=sfR(rf(10,100),3),n=ri(1,5),div=Math.pow(2,n),rem=sfR(init/div,3);
  var iso=pick(["a radioactive sample","a sample of a medical isotope","a sample of a radioactive tracer","a rock sample containing a radioactive isotope"]);
  return numq("After "+n+" half-lives, how much of "+iso+" that started at "+gF(init)+" g remains undecayed? Give your answer in g.",rem,Math.max(0.02*Math.abs(rem),1e-9),
  "Each half-life halves the amount remaining. After "+n+" half-lives the sample has been halved "+n+" times, a factor of "+div+". "+gF(init)+" g / "+div+" = "+F3(rem)+" g. The amount remaining is "+F3(rem)+" g. The count of half-lives is an exact number, so it carries no rounding of its own.",{init:init,n:n});
});

E("u3-714-half-life-graph",3,["PH11.7.14"],2,"gen",function(){
  var T=pick([2,3,4,5,6,8,10]),unit=pick(["days","years","hours"]),M0=pick([40,80,100,160,200]);
  var q=mcq("A decay graph for a radioactive sample starts at "+M0+" g. Reading the graph, the mass has fallen to "+(M0/2)+" g after "+T+" "+unit+", and to "+(M0/4)+" g after "+(2*T)+" "+unit+". What is the half-life of the sample?",
    T+" "+unit,
    [(T/2)+" "+unit,(2*T)+" "+unit,(4*T)+" "+unit],
    "The half-life is the time for the mass to fall to half its value. The graph shows the mass falling from "+M0+" g to "+(M0/2)+" g in "+T+" "+unit+", and halving again over the next "+T+" "+unit+". The half-life is "+T+" "+unit+".",{T:T,unit:unit,M0:M0});
    q.figure=p22Decay(M0,T,unit);return q;
});

E("u3-714-number-half-lives",3,["PH11.7.14"],1,"gen",function(){
  var n=ri(1,5),fin=pick([2,3,4,5,6,8,10,12,15,20,25,30]),init=fin*Math.pow(2,n);
  return numq("A radioactive sample decays from "+init+" g to "+fin+" g. How many half-lives have passed? Give your answer as a whole number.",n,0.4,
  "Count the halvings. Each half-life cuts the mass in half, and going from "+init+" g down to "+fin+" g takes exactly "+n+" halvings. The number of half-lives is "+n+", an exact count.",{n:n,init:init,fin:fin});
});

E("u3-714-elapsed-time",3,["PH11.7.14"],2,"gen",function(){
  var T=pick([5,8,10,20]),unit=pick(["days","years"]),n=ri(1,4),fin=pick([5,10,20]),init=fin*Math.pow(2,n),elapsed=n*T;
  return numq("The half-life of a radioactive isotope is "+T+" "+unit+". A sample of it decays from "+init+" g to "+fin+" g. How much time has elapsed? Give your answer in "+unit+".",elapsed,0.4,
  "First count the half-lives: going from "+init+" g down to "+fin+" g is "+n+" halvings. Each half-life lasts "+T+" "+unit+", so the elapsed time is "+n+" half-lives at "+T+" "+unit+" each, which is "+elapsed+" "+unit+". Both counts here are exact.",{T:T,n:n,unit:unit});
});

/* ---------- 7.15 Mass-energy equivalence ---------- */

E("u3-715-mass-energy",3,["PH11.7.15"],2,"gen",function(){
  var coeff=sfR(rf(1,9),3),m=coeff*1e-6,E=sfR(m*9.00e16,3);
  var ctx=pick(["A nuclear reaction","A fission event in a reactor core","A fusion event in a star","An annihilation event"]);
  return numq(ctx+" converts "+F3(coeff)+" × 10⁻⁶ kg of mass into energy. Using E = m c^2 with c = 3.00 × 10⁸ m/s, how much energy is released? Give your answer in J.",E,Math.max(0.02*Math.abs(E),1e-9),
  "Use Einstein's relation E = m c^2. The speed of light squared is 9.00 × 10¹⁶ m^2/s^2. Multiplying the mass, "+F3(coeff)+" × 10⁻⁶ kg, by that value gives the energy in joules. The energy released is "+F3(E)+" J. A very small mass converts into a very large amount of energy.",{coeff:coeff});
});

E("u3-715-energy-to-mass",3,["PH11.7.15"],2,"gen",function(){
  var coeff=sfR(rf(1,9),3),m0=coeff*1e-6,E=sfR(m0*9.00e16,3),m=sfR(m0,3);
  return numq("A process releases "+F3(E)+" J of energy. Using E = m c^2 with c = 3.00 × 10⁸ m/s, what mass was converted into energy? Give your answer in kg.",m,Math.max(0.02*Math.abs(m),1e-9),
  "Rearrange Einstein's relation: m = E / c^2. The speed of light squared is 9.00 × 10¹⁶ m^2/s^2. Dividing the energy, "+F3(E)+" J, by that value gives the mass in kilograms. The mass converted is "+F3(m)+" kg.",{coeff:coeff});
});

E("u3-715-mass-change-mcq",3,["PH11.7.15"],2,"gen",function(){
  var coeff=sfR(rf(1,9),3),m=coeff*1e-6,E=sfR(m*9.00e16,3);
  return mcq("A reaction releases "+F3(E)+" J of energy. Using E = m c^2 with c = 3.00 × 10⁸ m/s, what is the loss of mass in the reaction?",
    F3(m)+" kg",
    [F3(m*10)+" kg",F3(m/10)+" kg",F3(E/(3.00e8))+" kg"],
    "Rearrange Einstein's relation: m = E / c^2. Dividing the energy by the speed of light squared, 9.00 × 10¹⁶ m^2/s^2, gives a mass loss of "+F3(m)+" kg. Note the divisor is c squared, not c.",{coeff:coeff});
});

E("u3-715-claim-judge",3,["PH11.7.15"],3,"gen",function(){
  var coeff=sfR(rf(1,5),3),E=sfR(coeff*1e-6*9.00e16,3),casePick=pick(["correct","low","high"]);
  var claimStr="",correct="",distr=[];
  if(casePick==="correct"){
    claimStr=F3(E)+" J";
    correct="The claim is correct: E = m c^2 gives "+F3(E)+" J, matching the claim";
    distr=["The claim is too high: the correct value is "+F3(E/1000)+" J","The claim is too low: the correct value is "+F3(E*1000)+" J","The claim is wrong because mass can never be converted into energy"];
  }else if(casePick==="low"){
    claimStr=F3(E/1000)+" J";
    correct="The claim is too low: E = m c^2 gives "+F3(E)+" J, which is 1000 times the claimed value";
    distr=["The claim is correct: E = m c^2 gives "+F3(E/1000)+" J, matching the claim","The claim is too high: the correct value is "+F3(E/1000000)+" J","The claim is wrong because mass can never be converted into energy"];
  }else{
    claimStr=F3(E*1000)+" J";
    correct="The claim is too high: E = m c^2 gives "+F3(E)+" J, which is one thousandth of the claimed value";
    distr=["The claim is correct: E = m c^2 gives "+F3(E*1000)+" J, matching the claim","The claim is too low: the correct value is "+F3(E*1000000)+" J","The claim is wrong because mass can never be converted into energy"];
  }
  return mcq("A student claims that converting "+F3(coeff)+" × 10⁻⁶ kg of mass into energy, with c = 3.00 × 10⁸ m/s, would release "+claimStr+". Which judgement of the claim is correct?",
    correct,distr,
    "Check the claim with E = m c^2. The speed of light squared is 9.00 × 10¹⁶ m^2/s^2, and multiplying the mass, "+F3(coeff)+" × 10⁻⁶ kg, by that value gives "+F3(E)+" J. Comparing that with the claimed "+claimStr+" settles the judgement: "+correct+".",{coeff:coeff,casePick:casePick});
});

/* ---------- 7.16 Fission and fusion ---------- */

E("u3-716-fission",3,["PH11.7.16"],1,"var",varset([
  function(){
    return mcq("Nuclear fission is best defined as",
      "The splitting of a heavy nucleus into two lighter nuclei, with neutrons and energy released",
      ["The joining of two light nuclei into a heavier nucleus",
       "The emission of an alpha particle by a nucleus",
       "The splitting of an atom's electron cloud into ions"],
      "Fission splits a heavy nucleus, such as uranium-235, into two lighter nuclei. Neutrons are also released, and energy is released because some mass is converted into energy.",{});
  },
  function(){
    return mcq("A uranium-235 nucleus absorbs a neutron and splits into two lighter nuclei, releasing two or three more neutrons and a large amount of energy. This process is",
      "Fission, because a heavy nucleus has split into lighter nuclei",
      ["Fusion, because a heavy nucleus has formed",
       "Alpha decay, because particles have left the nucleus",
       "Beta decay, because the atomic number has changed"],
      "The defining feature is the splitting of a heavy nucleus into lighter ones, which is fission. The released neutrons can go on to split further nuclei, giving a chain reaction.",{});
  },
  function(){
    return mcq("Which of these is a product of a typical fission of uranium-235?",
      "Two lighter nuclei and two or three neutrons",
      ["One heavier nucleus and a helium nucleus",
       "A single neutron and a gamma ray only",
       "Two hydrogen nuclei"],
      "A fission event produces two medium-mass nuclei, called fission fragments, plus two or three neutrons and energy. Forming one heavier nucleus would be fusion, the opposite pattern.",{});
  },
  function(){
    return mcq("The energy released in fission comes from",
      "A small loss of mass, converted into energy according to E = m c^2",
      ["The neutrons, which carry energy into the reaction from outside",
       "The chemical burning of the uranium fuel",
       "The electrons of the uranium atoms"],
      "The total mass of the fission products is slightly less than the mass of the original nucleus and neutron. The missing mass appears as energy, as E = m c^2 describes.",{});
  }
]));

E("u3-716-fusion",3,["PH11.7.16"],2,"var",varset([
  function(){
    return mcq("In the Sun, hydrogen nuclei are forced together at very high temperature to form helium, releasing energy. This process is",
      "Fusion, because light nuclei join to form a heavier nucleus",
      ["Fission, because energy is released",
       "Beta decay, because the nuclei are hydrogen",
       "Fission, because the temperature is high"],
      "Fusion joins light nuclei into a heavier one. The Sun runs on fusion of hydrogen into helium, and the energy released comes from a small loss of mass. Fission is the opposite pattern, splitting heavy nuclei.",{});
  },
  function(){
    return mcq("Which conditions are needed for nuclear fusion to take place?",
      "Extremely high temperature and pressure, so light nuclei can overcome their repulsion and join",
      ["Very low temperature, so the nuclei move slowly enough to join",
       "A supply of free neutrons to split the nuclei",
       "Ordinary room temperature with a chemical catalyst"],
      "Nuclei are positively charged and repel each other. Fusion needs temperatures high enough that light nuclei approach fast enough to join despite that repulsion, which is why fusion happens in stars and is hard to sustain on Earth.",{});
  },
  function(){
    return mcq("A proposed power plant would join deuterium and tritium nuclei to form helium and a neutron, releasing energy. The core process is",
      "Fusion, because two light nuclei join into a heavier nucleus",
      ["Fission, because a neutron is produced",
       "Alpha decay, because a helium nucleus is formed",
       "Beta decay, because the fuel is hydrogen"],
      "The classification follows what happens to the nuclei: light nuclei joining into a heavier nucleus is fusion. A neutron among the products does not make it fission; fission is defined by a heavy nucleus splitting.",{});
  },
  function(){
    return mcq("Why is fusion, unlike fission, not used in today's commercial nuclear power stations?",
      "Sustaining the extreme temperature and pressure needed to keep light nuclei fusing has not yet been made practical for steady power production",
      ["Fusion releases no energy, so it cannot generate power",
       "Fusion fuels are rarer than uranium",
       "Fusion produces no neutrons, so turbines cannot be driven"],
      "Fusion does release energy, and its fuels are abundant. The barrier is engineering: holding a fuel at star-like temperatures long enough for steady, net power production is still a research problem, while fission chain reactions are straightforward to sustain.",{});
  }
]));

E("u3-716-compare",3,["PH11.7.16"],2,"var",varset([
  function(){
    return mcq("Which comparison of fission and fusion is correct?",
      "Fission splits heavy nuclei and fusion joins light nuclei, and both release energy from a loss of mass",
      ["Fission joins heavy nuclei and fusion splits light nuclei",
       "Only fission releases energy; fusion absorbs energy",
       "Only fusion involves a change of mass"],
      "The two processes run in opposite directions on the nuclear chart but share the same energy source: in both, the products have slightly less mass than the starting nuclei, and the difference is released as energy.",{});
  },
  function(){
    return mcq("Which statement about the products is correct?",
      "Fission of uranium-235 gives two radioactive medium-mass nuclei, while fusion of hydrogen isotopes gives helium, which is not radioactive",
      ["Fission gives helium, while fusion gives two radioactive medium-mass nuclei",
       "Both give exactly the same products",
       "Fusion gives two medium-mass nuclei and fission gives helium"],
      "Fission fragments are medium-mass nuclei that are usually radioactive, one reason spent fuel needs long-term care. The headline product of hydrogen fusion is helium, a stable, non-radioactive nucleus, though neutrons are also produced.",{});
  },
  function(){
    return mcq("A chain reaction, in which each event triggers further events, is a feature of",
      "Fission, because each fission releases neutrons that can split more heavy nuclei",
      ["Fusion, because each fusion releases neutrons that join more nuclei",
       "Both processes equally in current power stations",
       "Neither process"],
      "Each fission of uranium-235 releases two or three neutrons, and those neutrons can cause further fissions, which is the chain reaction controlled in a reactor. Fusion events do not trigger each other in that way.",{});
  },
  function(){
    return mcq("Per kilogram of fuel, which statement comparing the two processes is generally correct?",
      "Fusion of light nuclei releases more energy per kilogram of fuel than fission of heavy nuclei",
      ["Fission releases far more energy per kilogram than fusion",
       "Both release exactly the same energy per kilogram",
       "Neither releases energy per kilogram; only per reaction matters"],
      "A single fission releases more energy than a single fusion, because the nucleus is much bigger. But a kilogram holds far more light nuclei than heavy ones, so fusion wins per kilogram of fuel, while fission wins per single reaction.",{});
  }
]));

E("u3-716-energy-compare",3,["PH11.7.16"],3,"gen",function(){
  var ratio=pick([2,2.5,3,4,5]),smallCoeff=sfR(rf(1,4),3),bigCoeff=sfR(ratio*smallCoeff,3);
  var bigIsFission=pick([true,false]);
  var bigE=bigCoeff*1e12,smallE=smallCoeff*1e12,rat=sfR(bigE/smallE,3);
  var bigName=bigIsFission?"Fission":"Fusion",smallName=bigIsFission?"Fusion":"Fission";
  var fissE=bigIsFission?bigE:smallE,fusE=bigIsFission?smallE:bigE;
  return mcq("In a comparison test, fission reactions in one sample release a total of "+F3(fissE)+" J, while fusion reactions in another sample release a total of "+F3(fusE)+" J. Which conclusion is correct?",
    bigName+" releases more energy in total, by a factor of about "+F3(rat),
    [smallName+" releases more energy in total, by a factor of about "+F3(rat),
     "The two samples release the same total energy",
     bigName+" releases more energy in total, by a factor of about "+F3(rat*10)],
    "Compare the two totals directly. Dividing the larger total by the smaller total gives a factor of about "+F3(rat)+". So "+bigName.toLowerCase()+" releases more energy in total, by a factor of about "+F3(rat)+".",{ratio:ratio,smallCoeff:smallCoeff,bigIsFission:bigIsFission});
});

/* ----- bank-u4.js ----- */
// Diagram figures (Phase C, Nov 2026): wave anatomy, standing wave and air column patterns, double slit geometry and refraction diagrams added where the source types carried diagrams; see bank-helpers.js p22 helpers.
// Physics 2204 Unit 4 Waves question bank
// CRMARKS: u4-84-resonance-cr=5
// CRMARKS: u4-89-snell-cr=4
// CRMARKS: u4-87-doppler-cr=4
// CRMARKS: u4-86-doubleslit-cr=3
// CRMARKS: u4-82-wave-eq-cr=3
// CRMARKS: u4-84-standing-cr=2

/* ---------- 8.1 Wave characteristics ---------- */

E("u4-81-type-motion",4,["PH11.8.1"],1,"var",varset([
  function(){
    return mcq("A wave travels along a rope. Each bit of rope moves up and down while the wave pattern moves along the rope. How does the motion of the rope particles compare with the direction the energy travels?",
      "The particles move perpendicular to the direction the energy travels, so this is a transverse wave",
      ["The particles move parallel to the direction the energy travels, so this is a transverse wave",
       "The particles travel along the rope with the wave, carrying the rope to the far end",
       "The particles do not move at all; only the shape is real"],
      "In a transverse wave the particles oscillate perpendicular to the direction of energy travel. The particles stay near their own positions; it is the energy that moves along the rope. This is a transverse wave.",{});
  },
  function(){
    return mcq("Sound travels through air to a listener. How do the air particles move compared with the direction the sound energy travels?",
      "The particles move back and forth parallel to the direction the energy travels, so sound is a longitudinal wave",
      ["The particles move perpendicular to the direction the energy travels, so sound is a transverse wave",
       "The particles stream steadily from the source to the listener",
       "The particles move in circles as the sound passes"],
      "Sound in air is longitudinal: the air particles vibrate back and forth along the same line the energy travels, making compressions and rarefactions. The particles themselves do not stream to the listener. Sound is a longitudinal wave.",{});
  },
  function(){
    return mcq("A slinky is stretched out and one end is pushed and pulled along its length, sending pulses of squeezed coils down the slinky. This wave is",
      "Longitudinal, because the coils move parallel to the direction the energy travels",
      ["Transverse, because the coils move parallel to the direction the energy travels",
       "Transverse, because the coils move perpendicular to the direction the energy travels",
       "Neither, because a slinky cannot carry a wave"],
      "The coils squeeze together and spread apart along the same line the pulse travels, which is particle motion parallel to energy travel. That is a longitudinal wave.",{});
  },
  function(){
    return mcq("Which pairing is correct?",
      "Water surface wave: mainly transverse; sound in air: longitudinal",
      ["Water surface wave: longitudinal; sound in air: transverse",
       "Water surface wave: longitudinal; sound in air: longitudinal",
       "Water surface wave: transverse; sound in air: transverse"],
      "A water surface wave moves the surface up and down across the direction of travel, so it is treated as transverse at this level. Sound in air squeezes and spreads the air along the direction of travel, so it is longitudinal.",{});
  },
  function(){
    return mcq("A student shakes the end of a skipping rope side to side and a wave runs to the other end. A knot tied in the rope is observed as the wave passes. The knot",
      "Moves side to side around its own position and stays at the same place along the rope",
      ["Rides the wave all the way to the far end of the rope",
       "Moves steadily toward the far end, slower than the wave",
       "Does not move, because waves carry no energy"],
      "Particles of the medium oscillate around their own positions; they do not travel with the wave. The wave carries energy along the rope, but the knot only moves side to side in place.",{});
  }
]));

E("u4-81-anatomy",4,["PH11.8.1"],1,"var",varset([
  function(){
    var q=mcq("On a diagram of a transverse wave, the wavelength is the distance between",
      "Two neighbouring crests, or two neighbouring troughs",
      ["A crest and the nearest trough",
       "The rest position and a crest",
       "The first crest and the last trough of the whole wave"],
      "Wavelength is the length of one complete cycle, measured between the same point on two neighbouring cycles, such as crest to crest or trough to trough.",{});
    q.figure=p22WaveTrain(3,1,"?",{});return q;
  },
  function(){
    var q=mcq("In a longitudinal wave travelling through a spring, a rarefaction is a region where",
      "The coils are spread farther apart than normal",
      ["The coils are squeezed closer together than normal",
       "The coils move fastest",
       "The wave changes direction"],
      "A rarefaction is the stretched out region of a longitudinal wave, where the particles are farther apart than normal. The squeezed region is a compression.",{});
    q.figure=p22Longit(false);return q;
  },
  function(){
    var q=mcq("The amplitude of a transverse wave on a rope is measured from",
      "The rest position to a crest (or to a trough)",
      ["One crest to the next crest",
       "A crest down to a trough",
       "One end of the rope to the other"],
      "Amplitude is the greatest displacement from the rest position, so it is measured from the rest line to a crest or a trough. Crest to crest measures the wavelength instead.",{});
    q.figure=p22WaveTrain(3,0,null,{rest:true});return q;
  },
  function(){
    var q=mcq("In a longitudinal sound wave, the distance from the middle of one compression to the middle of the next compression is",
      "One wavelength",
      ["One amplitude",
       "Half a wavelength",
       "One period"],
      "Wavelength is always one complete cycle of the wave. Compression to the next compression is one full cycle, so that distance is one wavelength. The period is a time, not a distance.",{});
    q.figure=p22Longit(true);return q;
  },
  function(){
    var q=mcq("A transverse wave is drawn with crests well above the rest line and troughs just barely below it. Which statement about this drawing is correct?",
      "It cannot be a single ordinary wave, because the crest height and trough depth from the rest line should match as the amplitude",
      ["Its wavelength is the height of a crest",
       "Its amplitude is measured from a crest to a trough",
       "It has two different amplitudes, one for crests and one for troughs"],
      "For one wave, the amplitude is the displacement from the rest position, the same at a crest as at a trough. A drawing with very tall crests and very shallow troughs does not show one ordinary wave.",{});
    q.figure=p22WaveTrain(3,0,null,{asym:true});return q;
  }
]));

E("u4-81-period-mc",4,["PH11.8.1"],1,"gen",function(){
  var ctx=pick(["A vibrating reed in the lab oscillates","A signal generator drives a vibrating string","A small buzzer vibrates steadily","A tuning fork prong vibrates"]);
  var f=sfR(rf(2.0,120),3);
  var T=1/f, ans=sfR(T,3);
  var sol="The period is the time for one complete cycle, and it is the reciprocal of the frequency: T = 1 ÷ f. Substituting, 1 ÷ "+iF(f)+" = "+iF(sfR(T,4))+" s, so the period is "+F3(ans)+" s.";
  return mcq(ctx+" with a frequency of "+gF(f)+" Hz. What is the period of the motion?",
    F3(ans)+" s",
    [F3(sfR(2*T,3))+" s", F3(sfR(T/2,3))+" s", F3(f)+" s"],
    sol,{f:f});
});

E("u4-81-period-cycles",4,["PH11.8.1"],2,"gen",function(){
  var ctx=pick(["A water wave tank in the lab","A rope shaken by a student in the gym","A signal generator driving a vibrating string","A ripple tank in the lab"]);
  var N=ri(24,180);
  var t=sfR(rf(4.0,30.0),3);
  var p4=sfR(t/N,4), ans=sfR(p4,3);
  var sol="The period is the total time divided by the number of complete cycles. "+iF(t)+" s ÷ "+N+" = "+iF(p4)+" s, so the period is "+F3(ans)+" s.";
  return numq(ctx+" produces "+N+" complete cycles in "+gF(t)+" s. Find the period of the wave. Give your answer in s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {N:N,t:t});
});

E("u4-81-wavelength-reading",4,["PH11.8.1"],2,"gen",function(){
  var k=ri(3,9);
  var D=sfR(rf(2.0,18.0),3);
  var l4=sfR(D/k,4), ans=sfR(l4,3);
  var sol="From the first crest to the crest "+k+" cycles later there are exactly "+k+" wavelengths in "+gF(D)+" m. "+iF(D)+" m ÷ "+k+" = "+iF(l4)+" m, so the wavelength is "+F3(ans)+" m.";
  var q=numq("On a rope wave, the distance from the first crest to the crest "+k+" cycles later is "+gF(D)+" m. Find the wavelength of the wave. Give your answer in m.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {k:k,D:D});
    q.figure=p22WaveTrain(k,k,gF(D)+" m",{});return q;
});

/* ---------- 8.2 The wave equation ---------- */

E("u4-82-frequency-mc",4,["PH11.8.2"],1,"gen",function(){
  var v=sfR(rf(100,600),3);
  var lam=sfR(rf(0.200,3.00),3);
  var f=v/lam, ans=sfR(f,3);
  var sol="The wave equation is v = f λ, so f = v ÷ λ. Substituting, "+iF(v)+" m/s ÷ "+iF(lam)+" m = "+iF(sfR(f,4))+" Hz, so the frequency is "+F3(ans)+" Hz.";
  return mcq("A wave travels at "+gF(v)+" m/s and has a wavelength of "+gF(lam)+" m. What is its frequency?",
    F3(ans)+" Hz",
    [F3(sfR(2*f,3))+" Hz", F3(sfR(f/2,3))+" Hz", F3(sfR(lam/v,3))+" Hz"],
    sol,{v:v,lam:lam});
});

E("u4-82-speed",4,["PH11.8.2"],2,"gen",function(){
  var ctx=pick(["A motor driven vibrator sends waves along a long rope","Ripples spread across a ripple tank","A wave travels down a slinky laid along the floor","A wave runs along a vibrating string"]);
  var f=sfR(rf(2.0,80.0),3);
  var lam=sfR(rf(0.0500,2.50),3);
  var p4=sfR(f*lam,4), ans=sfR(p4,3);
  var sol="Use the wave equation v = f λ. "+iF(f)+" Hz × "+iF(lam)+" m = "+iF(p4)+" m/s, so the wave speed is "+F3(ans)+" m/s.";
  return numq(ctx+" with a frequency of "+gF(f)+" Hz and a wavelength of "+gF(lam)+" m. Find the speed of the wave. Give your answer in m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {f:f,lam:lam});
});

E("u4-82-wavelength",4,["PH11.8.2"],2,"gen",function(){
  var ctx=pick(["A low tone from a large speaker travels through air","A wave travels along a guitar string","A wave travels through a coiled spring","A wave runs along a stretched cable"]);
  var v=sfR(rf(12.0,340),3);
  var f=sfR(rf(20.0,200),3);
  var l4=sfR(v/f,4), ans=sfR(l4,3);
  var sol="Rearrange the wave equation: λ = v ÷ f. "+iF(v)+" m/s ÷ "+iF(f)+" Hz = "+iF(l4)+" m, so the wavelength is "+F3(ans)+" m.";
  return numq(ctx+" at "+gF(v)+" m/s with a frequency of "+gF(f)+" Hz. Find the wavelength. Give your answer in m.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {v:v,f:f});
});

E("u4-82-wave-eq-cr",4,["PH11.8.2"],2,"gen",function(){
  var ctx=pick(["A tuning fork makes a sound wave in air","A speaker cone vibrates and sends sound across a room","A buzzer in the lab produces a steady tone in air"]);
  var v=sfR(rf(300,360),3);
  var T=sfR(rf(0.00150,0.0120),3);
  var f4=sfR(1/T,4);
  var l4=sfR(v/f4,4), ans=sfR(l4,3);
  var sol="First change the period to a frequency: f = 1 ÷ T. 1 ÷ "+iF(T)+" s = "+iF(f4)+" Hz. Then use the wave equation solved for wavelength: λ = v ÷ f. "+iF(v)+" m/s ÷ "+iF(f4)+" Hz = "+iF(l4)+" m. The wavelength is "+F3(ans)+" m.";
  return numq(ctx+" where the wave speed is "+gF(v)+" m/s. The period of the vibration is "+gF(T)+" s. Find the wavelength of the wave. Give your answer in m.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {v:v,T:T});
});

E("u4-82-combined-mc",4,["PH11.8.2"],3,"gen",function(){
  var D=sfR(rf(30.0,300),3);
  var t=sfR(rf(2.0,20.0),3);
  var f=sfR(rf(2.0,60.0),3);
  var v=D/t, lam=v/f, ans=sfR(lam,3);
  var sol="The speed is not given, so find it first from the travel data: v = "+iF(D)+" m ÷ "+iF(t)+" s = "+iF(sfR(v,4))+" m/s. Then the wave equation gives λ = v ÷ f: "+iF(sfR(v,4))+" m/s ÷ "+iF(f)+" Hz = "+iF(sfR(lam,4))+" m. The wavelength is "+F3(ans)+" m.";
  return mcq("A wave crest travels "+gF(D)+" m in "+gF(t)+" s. The wave has a frequency of "+gF(f)+" Hz. What is its wavelength?",
    F3(ans)+" m",
    [F3(sfR(2*lam,3))+" m", F3(sfR(lam/2,3))+" m", F3(sfR(v*f,3))+" m"],
    sol,{D:D,t:t,f:f});
});

/* ---------- 8.3 Sound production and transmission ---------- */

E("u4-83-production",4,["PH11.8.3"],1,"var",varset([
  function(){
    return mcq("A guitar string is plucked and a note is heard across the room. The sound is produced by",
      "The vibrating string, which pushes the air into compressions and rarefactions",
      ["Air rushing from the guitar to the listener's ear",
       "The string itself travelling through the air to the ear",
       "Heat given off by the moving string"],
      "Sound is produced by a vibrating source. The vibrating string alternately squeezes and stretches the air next to it, and those compressions and rarefactions travel outward as the sound wave.",{});
  },
  function(){
    return mcq("An astronaut on the Moon strikes a metal bar with a hammer. A second astronaut standing nearby with no radio link hears nothing, because",
      "Sound needs a material medium to travel through, and the Moon has essentially no air",
      ["Sound cannot be produced in low gravity",
       "The bar cannot vibrate on the Moon",
       "Sound travels too slowly in a vacuum to arrive"],
      "The bar does vibrate, so sound is produced at the bar, but there is no medium between the bar and the listener to carry it. Sound cannot cross a vacuum.",{});
  },
  function(){
    return mcq("A tuning fork is struck and held over a table. The prongs are seen to blur as the fork hums. The blur is evidence that",
      "The prongs are vibrating, and that vibration is what produces the sound",
      ["The fork is heating up",
       "The sound is being reflected off the table",
       "The prongs are bending permanently"],
      "A struck tuning fork sounds because its prongs vibrate. The vibration pushes the surrounding air into compressions and rarefactions, which is the sound.",{});
  },
  function(){
    return mcq("A fog horn on a ferry sounds a long blast. Crew members below deck hear it through the steel hull as well as through the air. This shows that sound",
      "Can be transmitted through solids as well as through gases, as long as a medium carries the vibration",
      ["Can only travel through air",
       "Turns into light when it enters steel",
       "Stops at any solid surface"],
      "Sound is a vibration carried by the particles of a medium. Gases, liquids and solids can all transmit it; only a vacuum blocks it.",{});
  }
]));

E("u4-83-medium-speed",4,["PH11.8.3"],1,"var",varset([
  function(){
    return mcq("A train is still far down the track. A student puts an ear to the steel rail and hears the train clearly, while through the air it is barely audible. Sound reached the student through the rail first mainly because",
      "Sound travels much faster in steel than in air",
      ["Sound travels much faster in air than in steel",
       "Steel makes the sound louder by creating energy",
       "Sound cannot travel through air over long distances"],
      "The speed of sound depends on the medium. It is roughly 340 m/s in air but several thousand metres per second in steel, so the rail carries the sound to the student first.",{});
  },
  function(){
    return mcq("On a warm summer afternoon the speed of sound in air is greater than on a cold winter morning. This is because",
      "The speed of sound in air increases as the air temperature rises",
      ["Warm air is less dense in a way that always slows sound down",
       "The speed of sound in air does not depend on temperature",
       "Cold air carries sound faster because it is more solid"],
      "In air, sound speed rises with temperature, following v = 331 + 0.6 T m/s with T in degrees Celsius. Warmer air means a faster sound speed.",{});
  },
  function(){
    return mcq("Which list puts the speed of sound in the three media in the correct order, slowest first?",
      "Air, then water, then steel",
      ["Steel, then water, then air",
       "Water, then air, then steel",
       "Air, then steel, then water"],
      "Sound is slowest in gases, faster in liquids, and fastest in solids such as steel, where the particles are tightly linked. So the order slowest first is air, water, steel.",{});
  },
  function(){
    return mcq("A swimmer underwater hears a boat engine clearly, even though the engine is in the air above. The sound reached the swimmer because",
      "Sound can pass from one medium into another and keep travelling through the water",
      ["Sound speeds up so much in water that it arrives before it is made",
       "Water produces its own copy of the sound",
       "Sound cannot cross from air into water, so the swimmer heard it through the boat hull only"],
      "A sound wave reaching a boundary between media is partly reflected and partly transmitted. The transmitted part continues through the water to the swimmer.",{});
  }
]));

E("u4-83-temp-speed",4,["PH11.8.3"],2,"gen",function(){
  var ctx=pick(["at an outdoor concert in Bowring Park","on the deck of a ferry crossing to Bell Island","at a winter carnival rehearsal held outdoors","during a softball game in Mount Pearl"]);
  var T=ri(0,38);
  var p4=sfR(0.6*T,4);
  var v4=sfR(331+p4,4), ans=sfR(v4,3);
  var sol="The speed of sound in air is v = 331 + 0.6 T m/s, with T in degrees Celsius. First, 0.600 × "+iF(T)+" = "+iF(p4)+" m/s. Then 331 + "+iF(p4)+" = "+iF(v4)+" m/s. The speed of sound is "+F3(ans)+" m/s.";
  return numq("The air temperature "+ctx+" is "+T+" °C. Find the speed of sound in the air. Give your answer in m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {T:T});
});

E("u4-83-echo",4,["PH11.8.3"],2,"gen",function(){
  var ctx=pick(["A hiker shouts toward a cliff across a valley","A fishing boat sounds its horn toward a headland","A student claps facing the wall of an arena across an empty field","A tour boat guide calls toward the cliffs at Gros Morne"]);
  var t=sfR(rf(0.300,2.80),3);
  var p4=sfR(340*t,4);
  var d4=sfR(p4/2,4), ans=sfR(d4,3);
  var sol="Take the speed of sound in air as 340 m/s. The sound travels to the surface and back, so the one way distance is half of the total travel distance. Total distance: 340 m/s × "+iF(t)+" s = "+iF(p4)+" m. One way: "+iF(p4)+" m ÷ 2 = "+iF(d4)+" m. The reflecting surface is "+F3(ans)+" m away.";
  return numq(ctx+" and hears the echo "+gF(t)+" s later. Find the distance to the reflecting surface. Give your answer in m.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {t:t});
});

/* ---------- 8.4 Interference and reflection of sound ---------- */

E("u4-84-fixed-free",4,["PH11.8.4"],1,"var",varset([
  function(){
    var q=mcq("A single pulse travels along a rope toward a wall where the rope is tied tightly. When the pulse hits the wall, the reflected pulse",
      "Comes back inverted, crest becoming trough",
      ["Comes back with the same shape it had",
       "Stops at the wall and does not return",
       "Comes back with twice the amplitude"],
      "A fixed end cannot move, so it pulls the rope back and the reflected pulse is inverted: a crest returns as a trough. That is the rule for reflection at a fixed end.",{});
    q.figure=p22PulseEnd("fixed");return q;
  },
  function(){
    var q=mcq("A single pulse travels along a rope toward a free end, where the rope is tied to a ring that slides freely on a post. When the pulse reaches the end, the reflected pulse",
      "Comes back with the same shape it had, crest staying a crest",
      ["Comes back inverted, crest becoming trough",
       "Disappears at the end",
       "Comes back upside down and twice as wide"],
      "A free end is free to move, so the pulse is reflected without inversion: a crest returns as a crest. Inversion happens only at a fixed end.",{});
    q.figure=p22PulseEnd("free");return q;
  },
  function(){
    var q=mcq("Two identical pulses travel toward each other on a stretched rope and meet. At the moment they overlap exactly, the displacement of the rope is",
      "The sum of the two displacements, so a crest on a crest gives twice the height",
      ["Zero everywhere, because the pulses cancel each other out",
       "Only the displacement of the faster pulse",
       "Unchanged, because pulses pass through each other without adding"],
      "Superposition adds the displacements of the two pulses at each point. Two crests meeting give twice the displacement; the pulses then pass through each other and continue on their way.",{});
    q.figure=p22Pulses([{h:3,t:"crest",dir:1},{h:3,t:"crest",dir:-1}]);return q;
  },
  function(){
    var q=mcq("A crest and a trough of the same size meet on a stretched rope. At the moment they overlap exactly, the rope is",
      "Flat at the overlap, because the two displacements add to zero",
      ["Twice as high as the crest alone",
       "Twice as low as the trough alone",
       "Flat everywhere along the rope"],
      "Superposition adds displacements, so a crest plus an equal trough gives zero displacement where they overlap. This is destructive interference, and the pulses continue past each other afterwards.",{});
    q.figure=p22Pulses([{h:3,t:"crest",dir:1},{h:-3,t:"trough",dir:-1}]);return q;
  },
  function(){
    return mcq("Two pulses meet and briefly cancel each other out where they overlap. After they have passed through each other, the pulses",
      "Continue on their way with their original shapes, each on the far side",
      ["Both disappear, because they destroyed each other",
       "Merge into one stationary pulse",
       "Turn around and go back the way they came"],
      "Pulses pass through each other unchanged. The cancellation is only a brief overlap effect; afterwards each pulse carries on with its original shape and direction.",{});
  }
]));

E("u4-84-superposition",4,["PH11.8.4"],2,"var",varset([
  function(){
    var q=mcq("Two identical crest pulses of height 3.0 cm travel toward each other on a rope. At the instant they overlap exactly, the highest point of the rope is",
      "6.0 cm above the rest position",
      ["3.0 cm above the rest position",
       "0 cm, because the two crests cancel",
       "9.0 cm above the rest position"],
      "Superposition adds displacements: a crest on a crest gives 3.0 cm + 3.0 cm = 6.0 cm above the rest position. The pulses then continue past each other unchanged.",{});
    q.figure=p22Pulses([{h:3,t:"crest 3.0 cm",dir:1},{h:3,t:"crest 3.0 cm",dir:-1}]);return q;
  },
  function(){
    var q=mcq("A crest pulse 4.0 cm high meets a trough pulse 2.0 cm deep on a rope. At the instant the two overlap exactly, the rope at the overlap is",
      "2.0 cm above the rest position",
      ["2.0 cm below the rest position",
       "6.0 cm above the rest position",
       "Flat, at the rest position"],
      "Add the displacements with their signs: +4.0 cm from the crest and -2.0 cm from the trough gives +2.0 cm, so the rope is 2.0 cm above the rest position where the two overlap.",{});
    q.figure=p22Pulses([{h:4,t:"crest 4.0 cm",dir:1},{h:-2,t:"trough 2.0 cm",dir:-1}]);return q;
  },
  function(){
    return mcq("Two sound waves reach a listener at the same time, one in compression and one in rarefaction at the same point. The listener hears",
      "Quieter sound, because the two waves interfere destructively and partly cancel",
      ["Louder sound, because two waves always add up",
       "A higher pitch, because the frequency doubles",
       "No change, because sound waves cannot interfere"],
      "When a compression meets a rarefaction, the pressures partly cancel, so the combined sound is quieter. That is destructive interference of the two sound waves.",{});
  },
  function(){
    return mcq("Two identical sound waves reach a point in step, compression on compression. The result at that point is",
      "Constructive interference, a louder sound than either wave alone",
      ["Destructive interference, a quieter sound than either wave alone",
       "A sound of doubled frequency",
       "No sound, because the two waves block each other"],
      "Compression meeting compression adds, giving constructive interference and a larger amplitude, so the sound is louder there.",{});
  },
  function(){
    return mcq("A pulse on a rope passes the midpoint of the rope and continues onward. A second pulse, sent after it, follows the same path. The pulses",
      "Pass through each other unchanged if they ever meet, because each is just the rope moving as the wave passes",
      ["Merge into one bigger pulse and stay merged",
       "Bounce off each other like billiard balls",
       "Cancel each other permanently when they meet"],
      "Waves obey superposition and pass through each other unchanged. The rope particles move as each pulse passes, so meeting pulses simply add while they overlap and then carry on.",{});
  }
]));

E("u4-84-standing-cr",4,["PH11.8.4"],2,"gen",function(){
  var ctx=pick(["A guitar string","A violin string","A string on a monochord in the lab","A steel cable stretched between two fixed posts"]);
  var L=sfR(rf(0.400,1.60),3);
  var n=ri(2,5);
  var v=sfR(rf(120,320),3);
  var twoL=sfR(2*L,4);
  var l4=sfR(twoL/n,4);
  var f4=sfR(v/l4,4), ans=sfR(f4,3);
  var sol="On a string fixed at both ends the n-th harmonic has wavelength 2L ÷ n. First, 2 × "+iF(L)+" m = "+iF(twoL)+" m. Then "+iF(twoL)+" m ÷ "+n+" = "+iF(l4)+" m, so the wavelength is "+iF(l4)+" m. Then use v = f λ: f = v ÷ λ = "+iF(v)+" m/s ÷ "+iF(l4)+" m = "+iF(f4)+" Hz. The frequency of harmonic number "+n+" is "+F3(ans)+" Hz.";
  var q=numq(ctx+" of length "+gF(L)+" m is fixed at both ends. Waves travel along it at "+gF(v)+" m/s. Find the frequency of harmonic number "+n+" (counting the fundamental as number 1). Give your answer in Hz.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {L:L,n:n,v:v});
    q.figure=p22StandString(n,gF(L)+" m");return q;
});

E("u4-84-open-column",4,["PH11.8.4"],2,"gen",function(){
  var ctx=pick(["A flute-like tube open at both ends","An organ pipe open at both ends","A length of pipe open at both ends in the lab"]);
  var idx=ri(1,3);
  var lam=sfR(rf(0.400,1.70),3);
  var L=sfR(idx*lam/2,3);
  var lam2=sfR(2*L/idx,4);
  var f4=sfR(340/lam2,4), ans=sfR(f4,3);
  var word=["first","second","third"][idx-1];
  var sol="In an open air column the resonant lengths are λ/2, λ, 3λ/2, and so on. The "+word+" resonance has length "+idx+"λ/2, so λ = 2L ÷ "+idx+". 2 × "+iF(L)+" m = "+iF(sfR(2*L,4))+" m, then "+iF(sfR(2*L,4))+" m ÷ "+idx+" = "+iF(lam2)+" m. With the speed of sound in air taken as 340 m/s, f = v ÷ λ = 340 m/s ÷ "+iF(lam2)+" m = "+iF(f4)+" Hz. The frequency is "+F3(ans)+" Hz.";
  var q=numq(ctx+" has a length of "+gF(L)+" m and is sounding at its "+word+" resonance. Take the speed of sound in air as 340 m/s. Find the frequency of the sound. Give your answer in Hz.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {idx:idx,L:L});
    q.figure=p22Column("open",idx,gF(L)+" m",word+" resonance");return q;
});

E("u4-84-string-mc",4,["PH11.8.4"],2,"gen",function(){
  var L=sfR(rf(0.500,1.50),3);
  var n=ri(2,6);
  var v=sfR(rf(100,400),3);
  var f=n*v/(2*L), ans=sfR(f,3);
  var sol="For a string fixed at both ends, the n-th harmonic has wavelength 2L ÷ n, and f = v ÷ λ = n v ÷ (2L). Substituting n = "+n+", v = "+gF(v)+" m/s and L = "+gF(L)+" m gives f = "+F3(ans)+" Hz. Leaving out the harmonic number would give the fundamental, and using n v ÷ L would double the answer.";
  var q=mcq("A string "+gF(L)+" m long is fixed at both ends. Waves travel along it at "+gF(v)+" m/s. What is the frequency of harmonic number "+n+" (counting the fundamental as number 1)?",
    F3(ans)+" Hz",
    [F3(sfR(f/n,3))+" Hz", F3(sfR(2*f,3))+" Hz", F3(sfR(f/(n*n),3))+" Hz"],
    sol,{L:L,n:n,v:v});
    q.figure=p22StandString(n,gF(L)+" m");return q;
});

E("u4-84-closed-fundamental",4,["PH11.8.4"],2,"gen",function(){
  var ctx=pick(["A tube closed at one end, like a bottle","A length of pipe closed at one end","A resonance tube with one end stoppered"]);
  var L=sfR(rf(0.150,0.850),3);
  var fourL=sfR(4*L,4);
  var f4=sfR(340/fourL,4), ans=sfR(f4,3);
  var sol="The fundamental of a closed air column fits a quarter of a wavelength into the tube, so λ = 4L. 4 × "+iF(L)+" m = "+iF(fourL)+" m. Then f = v ÷ λ = 340 m/s ÷ "+iF(fourL)+" m = "+iF(f4)+" Hz. The fundamental frequency is "+F3(ans)+" Hz.";
  var q=numq(ctx+" has a length of "+gF(L)+" m. Take the speed of sound in air as 340 m/s. Find its fundamental frequency. Give your answer in Hz.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {L:L});
    q.figure=p22Column("closed",1,gF(L)+" m","fundamental");return q;
});

E("u4-84-resonance-cr",4,["PH11.8.4"],3,"gen",function(){
  var ctx=pick(["A resonance tube closed at one end","A bottle blown across the top","A length of pipe closed at one end"]);
  var r=ri(1,3);
  var odd=2*r-1;
  var lam=sfR(rf(0.500,1.40),3);
  var L=sfR(odd*lam/4,3);
  var vT=sfR(rf(335,350),3);
  var f=sfR(vT/lam,3);
  var fourL=sfR(4*L,4);
  var lam4=sfR(fourL/odd,4);
  var v4=sfR(f*lam4,4), ans=sfR(v4,3);
  var word=["first","second","third"][r-1];
  var sol="In a closed air column the resonant lengths are λ/4, 3λ/4, 5λ/4, and so on. The "+word+" resonance is the length "+odd+"λ/4, so λ = 4L ÷ "+odd+". 4 × "+iF(L)+" m = "+iF(fourL)+" m, then "+iF(fourL)+" m ÷ "+odd+" = "+iF(lam4)+" m, so the wavelength is "+iF(lam4)+" m. The speed is v = f λ = "+iF(f)+" Hz × "+iF(lam4)+" m = "+iF(v4)+" m/s. The speed of sound is "+F3(ans)+" m/s.";
  var q=numq(ctx+" of length "+gF(L)+" m resonates at its "+word+" resonance with a tuning fork of frequency "+gF(f)+" Hz. Find the speed of sound in the air. Give your answer in m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {r:r,L:L,f:f});
    q.figure=p22Column("closed",odd,gF(L)+" m",word+" resonance");return q;
});

E("u4-84-speed-by-resonance",4,["PH11.8.4"],3,"gen",function(){
  var lam=sfR(rf(0.650,1.25),3);
  var vT=sfR(rf(335,350),3);
  var f=sfR(vT/lam,3);
  var L1=sfR(lam/4,3);
  var L2=sfR(3*lam/4,3);
  var d4=sfR(L2-L1,4);
  var lam4=sfR(2*d4,4);
  var v4=sfR(f*lam4,4), ans=sfR(v4,3);
  var sol="Successive resonances of a closed column are half a wavelength apart, so the gap between the first and second resonance lengths is λ/2. "+iF(L2)+" m - "+iF(L1)+" m = "+iF(d4)+" m, so λ = 2 × "+iF(d4)+" m = "+iF(lam4)+" m. Then v = f λ = "+iF(f)+" Hz × "+iF(lam4)+" m = "+iF(v4)+" m/s. The speed of sound is "+F3(ans)+" m/s.";
  var q=numq("In a closed-end resonance experiment, the first resonance for a "+gF(f)+" Hz tuning fork is found with the air column "+gF(L1)+" m long, and the next resonance is found at "+gF(L2)+" m. Find the speed of sound in the air. Give your answer in m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {f:f,L1:L1,L2:L2});
    q.figure=p22TwoColumns(gF(L1)+" m",gF(L2)+" m");return q;
});

/* ---------- 8.5 Electromagnetic radiation compared with sound ---------- */

E("u4-85-compare-type",4,["PH11.8.5"],1,"var",varset([
  function(){
    return mcq("Which statement correctly compares light and sound?",
      "Light is a transverse electromagnetic wave that needs no medium; sound is a longitudinal wave that needs a medium",
      ["Light is a longitudinal wave that needs no medium; sound is a transverse wave that needs a medium",
       "Both are longitudinal waves that need a medium",
       "Both are transverse waves that need no medium"],
      "Electromagnetic radiation is transverse and travels through a vacuum. Sound is longitudinal and must have a material medium to carry it.",{});
  },
  function(){
    return mcq("A bell ringing inside a sealed jar is heard less and less as the air is pumped out, while a light inside the jar stays fully visible. This shows that",
      "Sound needs a medium but light does not",
      ["Light needs a medium but sound does not",
       "Both sound and light need air",
       "Neither sound nor light can cross glass"],
      "With the air gone there is no medium to carry the sound, so it fades. The light is electromagnetic radiation and crosses the vacuum easily, so it stays visible.",{});
  },
  function(){
    return mcq("Sunlight reaches Earth across the vacuum of space, but the sounds of a solar flare cannot be heard on Earth. The reason is",
      "Light is electromagnetic radiation that travels without a medium, while sound must travel through matter",
      ["Sound travels too slowly to ever arrive",
       "Light is a longitudinal wave and sound is transverse",
       "Space bends sound away from Earth"],
      "Electromagnetic radiation needs no medium and crosses empty space at the speed of light. Sound is a vibration of matter, and there is no matter between the Sun and Earth to carry it.",{});
  },
  function(){
    return mcq("Which property belongs to sound but NOT to light?",
      "It is a longitudinal wave whose speed depends strongly on the temperature of the air carrying it",
      ["It transfers energy",
       "It can be reflected",
       "It has a frequency and a wavelength"],
      "Both waves transfer energy, reflect, and have frequency and wavelength. Only sound is longitudinal and carried by air, so only its speed is set by air temperature in this way.",{});
  }
]));

E("u4-85-speeds",4,["PH11.8.5"],2,"var",varset([
  function(){
    return mcq("A lightning flash is seen over Conception Bay and the thunder arrives several seconds later. The delay happens because",
      "Light travels at 3.00 × 10^8 m/s while sound travels at only about 340 m/s in air",
      ["Sound travels at 3.00 × 10^8 m/s while light travels at only about 340 m/s in air",
       "Light and sound travel at the same speed, but thunder is produced later",
       "Sound is reflected many times on the way, while light is not"],
      "The flash and the thunder are produced at the same moment. Light covers the distance almost instantly at 3.00 × 10^8 m/s, while sound takes seconds at about 340 m/s.",{});
  },
  function(){
    return mcq("A radio station broadcasts its signal, and a listener also hears the announcer faintly through an open studio door at the same moment the broadcast starts. Which signal reaches a listener 3 km away first, and why?",
      "The radio signal, because electromagnetic waves travel at the speed of light, far faster than sound in air",
      ["The sound through the air, because sound is faster than radio waves",
       "Both at the same time, because all waves travel at the same speed",
       "The sound, because radio waves need a medium and are slowed by air"],
      "Radio waves are electromagnetic radiation travelling at 3.00 × 10^8 m/s, so they cover 3 km almost instantly. Sound in air travels at about 340 m/s and would take several seconds.",{});
  },
  function(){
    return mcq("Light passing from air into a glass block slows down. Sound passing from air into a steel rail speeds up. These facts together show that",
      "A wave's speed depends on the medium it is in, and the change is different for different kinds of wave",
      ["All waves speed up when they enter a denser material",
       "All waves slow down when they enter a denser material",
       "Wave speed never changes when the medium changes"],
      "Wave speed is a property of the wave in a given medium. Light slows in glass compared with air, while sound travels much faster in steel than in air.",{});
  },
  function(){
    return mcq("Which statement about the speeds of light and sound is correct?",
      "In a vacuum light travels at 3.00 × 10^8 m/s and sound does not travel at all",
      ["In a vacuum both light and sound travel at 3.00 × 10^8 m/s",
       "Sound travels faster than light in every medium",
       "Light travels at about 340 m/s in air and sound at 3.00 × 10^8 m/s"],
      "Light reaches its full speed of 3.00 × 10^8 m/s in a vacuum. Sound has no speed in a vacuum because there is no medium to carry it.",{});
  }
]));

E("u4-85-medium-effect",4,["PH11.8.5"],2,"var",varset([
  function(){
    return mcq("On a hot afternoon, sound from a distant band carries noticeably differently than on a cold morning, yet the colours of their instruments look exactly the same. The difference is that",
      "The speed of sound in air changes with temperature, while the speed of light in air is nearly unchanged",
      ["The speed of light in air changes strongly with temperature, while sound is unaffected",
       "Both speeds change strongly with temperature",
       "Temperature has no effect on either speed"],
      "Sound speed in air follows v = 331 + 0.6 T m/s and changes measurably with temperature. Light in air travels at essentially the vacuum speed whatever the temperature.",{});
  },
  function(){
    return mcq("A diver shines a flashlight upward and also taps a tank to signal. Compared with in air, in water the light",
      "Travels more slowly, while the sound travels faster than in air",
      ["Travels faster, while the sound travels more slowly than in air",
       "Travels at exactly the same speed, and so does the sound",
       "Cannot travel at all, while the sound can"],
      "Light slows when it enters an optically denser medium like water. Sound, by contrast, travels faster in water than in air because the liquid carries the vibration more effectively.",{});
  },
  function(){
    return mcq("A fibre optic cable carries a phone call as pulses of light in glass. The pulses travel",
      "More slowly than light in a vacuum, because light slows in glass",
      ["Faster than light in a vacuum, because glass speeds light up",
       "At exactly the vacuum speed of light, because the medium never matters for light",
       "At the speed of sound in glass"],
      "Light in any material medium travels more slowly than in a vacuum; glass is no exception. The pulses still travel enormously faster than any sound.",{});
  },
  function(){
    return mcq("Warm air above a sun-heated road can bend sound from a distant highway upward, making it harder to hear at ground level. Light from the same highway is barely affected in this situation mainly because",
      "The bending described is a sound-in-air temperature effect; light's speed in air changes only very slightly with temperature",
      ["Light cannot be bent under any circumstances",
       "Sound cannot be bent by a temperature change",
       "Light travels so slowly that it misses the warm air"],
      "Sound speed in air varies with temperature enough to bend sound noticeably. Light's speed in air stays very close to its vacuum value, so the same warm layer has little effect on it.",{});
  }
]));

E("u4-85-which-travels",4,["PH11.8.5"],2,"var",varset([
  function(){
    return mcq("Two identical signals are sent from a ship to a shore station 3 km away, one as a radio wave and one as a sound blast through the air. Which arrives first, and roughly how long does the slower one take?",
      "The radio wave arrives almost at once; the sound takes about 9 s",
      ["The sound arrives first; the radio wave takes about 9 s",
       "Both take about 9 s",
       "The radio wave arrives almost at once; the sound takes about 0.009 s"],
      "The radio wave travels at 3.00 × 10^8 m/s and arrives almost instantly. Sound covering 3000 m at about 340 m/s takes a little under 9 s.",{});
  },
  function(){
    return mcq("A solar storm erupts on the Sun. Eight minutes later, satellites detect the burst of radiation, but no sound from the eruption is ever detected on Earth. The best explanation is",
      "The radiation crossed the vacuum of space at the speed of light, while sound cannot cross a vacuum at all",
      ["The sound is still on its way and will arrive in a few years",
       "The sound was absorbed by Earth's atmosphere",
       "Sound from the Sun is too quiet to detect"],
      "Electromagnetic radiation travels through empty space; sound cannot, because there is no medium between the Sun and Earth. The missing sound is not a matter of loudness or delay.",{});
  },
  function(){
    return mcq("An explosion is detonated underwater and observers on shore see a flash of light from a lamp at the site at the same instant. Observers hear the boom noticeably later mainly because",
      "Sound, even in water, travels far more slowly than light",
      ["Light travels more slowly in water than sound does",
       "Sound cannot travel through water to the shore",
       "The light was produced before the explosion"],
      "Light travels at well over 10^8 m/s even in water, while sound in water travels at only about 1.5 × 10^3 m/s. The light arrives essentially at once and the sound later.",{});
  },
  function(){
    return mcq("A student claims that because light and sound are both waves, warming the air in a hall will change both of their speeds by the same proportion. The claim is",
      "Wrong: sound speed in air changes noticeably with temperature, while light speed in air stays essentially at its vacuum value",
      ["Right: all wave speeds respond to temperature in the same way",
       "Wrong: temperature changes light speed noticeably but never changes sound speed",
       "Right: temperature changes neither speed at all"],
      "Sound in air follows v = 331 + 0.6 T m/s, a clear temperature effect. Light in air is essentially unaffected by ordinary temperature changes. The two waves do not respond the same way.",{});
  }
]));

/* ---------- 8.6 Interference and diffraction of light ---------- */

E("u4-86-diffraction",4,["PH11.8.6"],1,"var",varset([
  function(){
    return mcq("Light passes through a narrow opening and spreads out beyond it. This spreading of light around the edges of an opening is called",
      "Diffraction",
      ["Reflection",
       "Refraction",
       "Interference"],
      "Diffraction is the spreading of a wave as it passes through an opening or around an edge. Reflection and refraction happen at boundaries, and interference is the overlap of two waves.",{});
  },
  function(){
    return mcq("A slit is gradually made narrower while light shines through it. As the slit width gets closer to the wavelength of the light, the spreading of the light beyond the slit",
      "Increases, so the light fans out more widely",
      ["Decreases, so the light stays in a narrower beam",
       "Stays exactly the same",
       "Stops completely once the slit is narrow"],
      "Diffraction is strongest when the opening is close in size to the wavelength. The narrower the slit compared with the wavelength, the more the light spreads.",{});
  },
  function(){
    return mcq("Sound from a classroom can be heard around a partly open door, but light from the same room does not visibly spread around the door in the same way. The main reason is",
      "Sound wavelengths are comparable to the door opening, while light wavelengths are far smaller, so sound diffracts much more noticeably",
      ["Light cannot diffract at all",
       "Sound travels faster than light",
       "The door absorbs light but reflects sound"],
      "Diffraction is noticeable when the opening is comparable to the wavelength. Sound wavelengths are a sizable fraction of a metre, near the size of a doorway; light wavelengths are tiny fractions of a millimetre.",{});
  },
  function(){
    return mcq("Red light has a longer wavelength than blue light. Both pass through the same narrow slit, one at a time. Which spreads out more, and why?",
      "The red light, because its longer wavelength is closer to the slit width",
      ["The blue light, because its shorter wavelength fits through more easily",
       "Both spread the same, because the slit is the same",
       "Neither spreads, because light does not diffract through slits"],
      "For a fixed opening, the wave with the longer wavelength is closer in size to the opening and diffracts more. Red light, with the longer wavelength, spreads more than blue.",{});
  }
]));

E("u4-86-doubleslit-cr",4,["PH11.8.6"],2,"gen",function(){
  var lamNm=pick([435,470,500,532,560,589,620,650]);
  var m=pick([2,3,4]);
  var dMm=pick([0.150,0.200,0.250,0.400]);
  var Lm=pick([0.800,1.00,1.20,1.50,2.00]);
  var xMm=sfR(m*lamNm*Lm/dMm/1000,3);
  var xM=xMm/1000, dM=dMm/1000;
  var prod4=sfR(xM*dM,4);
  var den4=sfR(m*Lm,4);
  var lamM4=sfR(prod4/den4,4);
  var ans=sfR(lamM4*1000000000,3);
  var sol="Bright fringes satisfy m λ = x d ÷ L, so λ = x d ÷ (m L). Convert the fringe distance and the slit separation to metres in words: x is "+iF(xM)+" m and d is "+iF(dM)+" m. First the numerator: "+iF(xM)+" m × "+iF(dM)+" m = "+iF(prod4)+" m². The denominator: "+m+" × "+iF(Lm)+" m = "+iF(den4)+" m. Then λ = "+iF(prod4)+" m² ÷ "+iF(den4)+" m = "+iF(lamM4)+" m. Converting metres to nanometres in words gives the wavelength "+F3(ans)+" nm.";
  var q=numq( "In a double slit experiment, the "+(m===2?"2nd":m===3?"3rd":m+"th")+" bright fringe is "+gF(xMm)+" mm from the central maximum. The slits are "+gF(dMm)+" mm apart and the screen is "+gF(Lm)+" m from the slits. Find the wavelength of the light. Give your answer in nm.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {m:m,dMm:dMm,Lm:Lm,xMm:xMm});
    q.figure=p22Slit(gF(dMm)+" mm",gF(Lm)+" m",gF(xMm)+" mm",m);return q;
});

E("u4-86-fringe-position",4,["PH11.8.6"],2,"gen",function(){
  var lamNm=pick([450,475,500,550,580,600,633,670]);
  var m=pick([1,2,3]);
  var dMm=pick([0.200,0.250,0.300,0.500]);
  var Lm=pick([0.900,1.10,1.40,1.80]);
  var lamM=lamNm*0.000000001, dM=dMm/1000;
  var p4=sfR(lamM*Lm,4);
  var p5=sfR(p4*m,4);
  var xM4=sfR(p5/dM,4), ans=sfR(xM4*1000,3);
  var sol="Bright fringes satisfy m λ = x d ÷ L, so x = m λ L ÷ d. Convert the wavelength and the slit separation to metres in words: λ is "+iF(lamM)+" m and d is "+iF(dM)+" m. First, "+iF(lamM)+" m × "+iF(Lm)+" m = "+iF(p4)+" m². Then "+iF(p4)+" m² × "+m+" = "+iF(p5)+" m². Then "+iF(p5)+" m² ÷ "+iF(dM)+" m = "+iF(xM4)+" m. Converting metres to millimetres in words, the fringe is "+F3(ans)+" mm from the central maximum.";
  var q=numq("Light of wavelength "+lamNm+" nm shines on two slits "+gF(dMm)+" mm apart. The screen is "+gF(Lm)+" m away. Find the distance from the central maximum to the "+m+(m===1?"st":m===2?"nd":"rd")+" bright fringe. Give your answer in mm.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {lamNm:lamNm,m:m,dMm:dMm,Lm:Lm});
    q.figure=p22Slit(gF(dMm)+" mm",gF(Lm)+" m","?",m);return q;
});

E("u4-86-slit-separation",4,["PH11.8.6"],2,"gen",function(){
  var lamNm=pick([460,490,520,560,590,620,650]);
  var m=pick([2,3,4]);
  var dMm=pick([0.180,0.220,0.280,0.350,0.450]);
  var Lm=pick([0.850,1.05,1.30,1.60,1.90]);
  var xMm=sfR(m*lamNm*Lm/dMm/1000,3);
  var lamM=lamNm*0.000000001, xM=xMm/1000;
  var p4=sfR(lamM*Lm,4);
  var p5=sfR(p4*m,4);
  var dM4=sfR(p5/xM,4), ans=sfR(dM4*1000,3);
  var sol="Bright fringes satisfy m λ = x d ÷ L, so d = m λ L ÷ x. Convert the wavelength and the fringe distance to metres in words: λ is "+iF(lamM)+" m and x is "+iF(xM)+" m. First, "+iF(lamM)+" m × "+iF(Lm)+" m = "+iF(p4)+" m². Then "+iF(p4)+" m² × "+m+" = "+iF(p5)+" m². Then "+iF(p5)+" m² ÷ "+iF(xM)+" m = "+iF(dM4)+" m. Converting metres to millimetres in words, the slit separation is "+F3(ans)+" mm.";
  var q=numq("Light of wavelength "+lamNm+" nm produces a double slit pattern on a screen "+gF(Lm)+" m from the slits. The "+(m===2?"2nd":m===3?"3rd":m+"th")+" bright fringe is "+gF(xMm)+" mm from the central maximum. Find the slit separation. Give your answer in mm.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {lamNm:lamNm,m:m,Lm:Lm,xMm:xMm});
    q.figure=p22Slit("?",gF(Lm)+" m",gF(xMm)+" mm",m);return q;
});

E("u4-86-diffraction-design",4,["PH11.8.6"],3,"var",varset([
  function(){
    var w=pick([520,560,600]);
    return mcq("A class wants light of wavelength "+w+" nm to spread out as much as possible after passing through a single opening. They can choose an opening of width 0.50 mm, 0.050 mm, or 0.0050 mm. Which choice gives the most spreading, and why?",
      "0.0050 mm, because diffraction is greatest when the opening is closest in size to the wavelength",
      ["0.50 mm, because a wider opening lets more light spread",
       "0.050 mm, because it is exactly in the middle",
       "All three spread the same, because the wavelength is unchanged"],
      "Diffraction increases as the opening approaches the wavelength in size. Of the three, 0.0050 mm is closest to the wavelength of the light, so it gives the widest spreading.",{w:w});
  },
  function(){
    return mcq("A student claims that shining blue light (shorter wavelength) through a slit will spread it out more than red light (longer wavelength) through the same slit, because the blue light is more energetic. Judging the claim by diffraction behaviour, it is",
      "Incorrect: the red light spreads more, because its longer wavelength is closer to the slit size",
      ["Correct: more energetic light always spreads more",
       "Incorrect: neither colour spreads at all through a slit",
       "Correct: shorter wavelengths always diffract more"],
      "Diffraction depends on how the wavelength compares with the opening, not on energy. The longer red wavelength is closer to the slit size, so the red light spreads more. The claim is incorrect.",{});
  },
  function(){
    return mcq("A harbour entrance is 30 m wide. Ocean swells of wavelength 25 m pass through it, and sound from a horn of wavelength 0.50 m also passes through it. Which spreads out most noticeably inside the harbour, judging by diffraction?",
      "The ocean swells, because their wavelength is close to the width of the entrance",
      ["The sound, because its wavelength is much smaller than the entrance",
       "Both spread the same amount",
       "Neither, because waves cannot spread after an opening"],
      "Diffraction is strongest when the wavelength is comparable to the opening. The 25 m swells are close to the 30 m entrance, so they fan out noticeably; the 0.50 m sound passes through with little spreading.",{});
  },
  function(){
    return mcq("To hear a speaker in the next room through a doorway more clearly, a student suggests making the doorway narrower so the sound spreads more. Judged by diffraction behaviour, the suggestion",
      "Works in principle: a narrower opening, closer to the wavelength of sound, spreads the sound more widely into the next room",
      ["Cannot work: narrowing an opening always reduces spreading",
       "Works, but only because a narrower door reflects more sound",
       "Cannot work: sound does not diffract"],
      "Sound wavelengths are a fair fraction of a metre. Narrowing the doorway brings the opening closer to the wavelength, which increases diffraction, so more sound bends into the shadow region of the next room.",{});
  }
]));

/* ---------- 8.7 The Doppler effect ---------- */

E("u4-87-doppler-cr",4,["PH11.8.7"],2,"gen",function(){
  var scen=pick([
    {txt:"An ambulance siren of frequency",who:"ambulance",move:"toward a stationary pedestrian"},
    {txt:"A train whistle of frequency",who:"train",move:"toward a stationary observer at a crossing"},
    {txt:"A fire truck siren of frequency",who:"fire truck",move:"toward a stationary cyclist who has stopped"},
    {txt:"A boat horn of frequency",who:"boat",move:"toward a stationary kayaker"}
  ]);
  var away=Math.random()<0.5;
  var f0=sfR(rf(200,800),3);
  var vs=sfR(rf(10.0,35.0),3);
  var den4=away?sfR(340+vs,4):sfR(340-vs,4);
  var ratio4=sfR(340/den4,4);
  var fp4=sfR(f0*ratio4,4), ans=sfR(fp4,3);
  var dirWords=away?("away from the observer, so the source motion stretches the wave out and the observed frequency drops. The denominator of f' = f (v + v_o) ÷ (v - v_s) becomes v + v_s because the source is receding: 340 m/s + "+iF(vs)+" m/s = "+iF(den4)+" m/s.")
                   :("toward the observer, so the source crowds the wave fronts together and the observed frequency rises. The denominator of f' = f (v + v_o) ÷ (v - v_s) subtracts the source speed because the source is approaching: 340 m/s - "+iF(vs)+" m/s = "+iF(den4)+" m/s.");
  var sol="Take the speed of sound in air as 340 m/s and the observer as stationary, so v_o is zero and the numerator is just 340 m/s. The "+scen.who+" moves "+dirWords+" The ratio is 340 m/s ÷ "+iF(den4)+" m/s = "+iF(ratio4)+". Then f' = "+iF(f0)+" Hz × "+iF(ratio4)+" = "+iF(fp4)+" Hz. The observed frequency is "+F3(ans)+" Hz.";
  return numq(scen.txt+" "+gF(f0)+" Hz sounds as the "+scen.who+" travels at "+gF(vs)+" m/s directly "+(away?"away from":"toward")+" a stationary observer. Find the frequency the observer hears. Give your answer in Hz.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {f0:f0,vs:vs,away:away});
});

E("u4-87-observer",4,["PH11.8.7"],2,"gen",function(){
  var away=Math.random()<0.5;
  var f0=sfR(rf(250,700),3);
  var vo=sfR(rf(5.00,30.0),3);
  var num4=away?sfR(340-vo,4):sfR(340+vo,4);
  var ratio4=sfR(num4/340,4);
  var fp4=sfR(f0*ratio4,4), ans=sfR(fp4,3);
  var dirWords=away?("away from the source, so the observer meets the wave fronts less often and hears a lower frequency. The numerator of f' = f (v + v_o) ÷ (v - v_s) becomes v - v_o for motion away: 340 m/s - "+iF(vo)+" m/s = "+iF(num4)+" m/s.")
                   :("toward the source, so the observer meets the wave fronts more often and hears a higher frequency. The numerator of f' = f (v + v_o) ÷ (v - v_s) takes the plus sign for motion toward: 340 m/s + "+iF(vo)+" m/s = "+iF(num4)+" m/s.");
  var sol="The source is stationary, so v_s is zero and the denominator is 340 m/s. The observer moves "+dirWords+" The ratio is "+iF(num4)+" m/s ÷ 340 m/s = "+iF(ratio4)+". Then f' = "+iF(f0)+" Hz × "+iF(ratio4)+" = "+iF(fp4)+" Hz. The observed frequency is "+F3(ans)+" Hz.";
  return numq("A stationary siren emits sound of frequency "+gF(f0)+" Hz. A cyclist travels at "+gF(vo)+" m/s directly "+(away?"away from":"toward")+" the siren. Find the frequency the cyclist hears. Take the speed of sound in air as 340 m/s. Give your answer in Hz.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {f0:f0,vo:vo,away:away});
});

E("u4-87-direction",4,["PH11.8.7"],2,"var",varset([
  function(){
    return mcq("An ambulance approaches a pedestrian, passes, and drives away. The pitch of the siren the pedestrian hears",
      "Is higher than the true pitch while approaching, then drops below the true pitch as it recedes",
      ["Is lower than the true pitch while approaching, then rises above it as it recedes",
       "Stays at the true pitch the whole time, only the loudness changes",
       "Is higher both while approaching and while receding"],
      "An approaching source crowds the wave fronts together, shortening the wavelength and raising the observed frequency. Once it recedes, the fronts are stretched out and the observed frequency falls below the true frequency.",{});
  },
  function(){
    return mcq("A train blowing a steady whistle moves away from a stationary observer. Compared with the whistle's true frequency, the observer hears",
      "A lower frequency, because the moving source leaves the wave fronts stretched out behind it",
      ["A higher frequency, because the sound has farther to travel",
       "The same frequency, because the whistle itself has not changed",
       "A higher frequency, because the wavelength ahead of the train is shorter"],
      "The whistle's own frequency does not change, but a receding source stretches the wavelength of the sound behind it, so the observer receives a lower frequency.",{});
  },
  function(){
    return mcq("In front of a fast moving source of sound, the wavelength of the sound is",
      "Shorter than it would be if the source were at rest, because each new wave front is emitted closer to the previous one",
      ["Longer than at rest, because the source is running away from its own sound",
       "Exactly the same as at rest, because only the observer matters",
       "Zero, because the source catches up with its own wave fronts"],
      "A source moving toward the observer emits each wave front from a position closer to the previous front, crowding them together. The wavelength ahead is shorter, which is why the observed frequency is higher.",{});
  },
  function(){
    return mcq("A cyclist rides toward a stationary church bell that is ringing. The cyclist hears",
      "A higher frequency than a person standing still, because the cyclist meets the wave fronts more often",
      ["A lower frequency than a person standing still, because the cyclist is moving",
       "Exactly the same frequency, because the bell is stationary",
       "A lower frequency, because the wavelength in the air got longer"],
      "The wavelength in the air is unchanged, but a moving observer who rides toward the source crosses the wave fronts more often per second, so the observed frequency is higher.",{});
  },
  function(){
    return mcq("Source and observer are both stationary, but a strong wind blows steadily from the source toward the observer. At this level, the observed frequency is",
      "Essentially unchanged, because neither the source nor the observer is moving relative to the ground-based setup of the Doppler formula in the reference panel",
      ["Much higher, because the wind adds its speed to the frequency",
       "Much lower, because the wind stretches the wave out",
       "Doubled, because the wind carries the sound twice as fast"],
      "The Doppler shifts in this course come from motion of the source or the observer as set up in f' = f (v + v_o) ÷ (v - v_s). With both at rest there is no source or observer motion to shift the frequency.",{});
  }
]));

E("u4-87-radar",4,["PH11.8.7"],2,"var",varset([
  function(){
    return mcq("A police officer aims a radar unit from a parked car at a car approaching on the highway. The radar finds the car's speed from",
      "The shift in frequency of the reflected radio waves: the faster the car, the bigger the shift",
      ["The loudness of the reflected radio waves",
       "The time the radio waves take to bounce back, which gives the speed directly with no frequency change",
       "The colour of the car, which changes with speed"],
      "Radar is the light version of the Doppler effect. The reflected waves come back frequency shifted, and the size of the shift is set by the target's speed, which is how the unit computes it.",{});
  },
  function(){
    return mcq("A radar unit measures a frequency shift from a moving car. A second car passes at exactly twice the speed of the first, in the same direction. The frequency shift from the second car is",
      "About twice the shift from the first car, because the shift is proportional to the target's speed",
      ["About the same, because the shift does not depend on speed",
       "About four times the shift, because the shift grows with the square of the speed",
       "Zero, because only the first car reflects the radar"],
      "For radar the frequency shift is proportional to the target's speed. Double the speed and the shift doubles, which is what makes the radar reading a direct measure of speed.",{});
  },
  function(){
    return mcq("A parked police car uses radar on a second parked car. The reflected signal shows",
      "No frequency shift, because the target is not moving",
      ["The largest possible frequency shift",
       "A shift that depends only on the distance between the cars",
       "A shift because the radar waves themselves are moving"],
      "A Doppler shift needs motion of the source, the observer, or here the reflecting target. A stationary target reflects the waves back at the same frequency.",{});
  },
  function(){
    return mcq("Weather radar tracks a storm by bouncing radio waves off rain in the moving air. Information about how fast the rain is moving toward or away from the radar comes from",
      "The frequency shift of the reflected waves",
      ["The brightness of the reflected waves alone",
       "The temperature of the rain",
       "The time of day the radar is used"],
      "Moving rain shifts the frequency of the reflected radio waves by the Doppler-Fizeau effect. Reading the shift tells the radar how fast the rain is moving along the beam.",{});
  }
]));

E("u4-87-both",4,["PH11.8.7"],3,"gen",function(){
  var f0=sfR(rf(300,750),3);
  var vs=sfR(rf(8.00,30.0),3);
  var vo=sfR(rf(4.00,25.0),3);
  var num4=sfR(340+vo,4);
  var den4=sfR(340-vs,4);
  var ratio4=sfR(num4/den4,4);
  var fp4=sfR(f0*ratio4,4), ans=sfR(fp4,3);
  var sol="Both are moving toward each other, so both motions raise the observed frequency. The observer moving toward the source takes the plus sign in the numerator: 340 m/s + "+iF(vo)+" m/s = "+iF(num4)+" m/s. The source moving toward the observer subtracts in the denominator: 340 m/s - "+iF(vs)+" m/s = "+iF(den4)+" m/s. The ratio is "+iF(num4)+" m/s ÷ "+iF(den4)+" m/s = "+iF(ratio4)+". Then f' = "+iF(f0)+" Hz × "+iF(ratio4)+" = "+iF(fp4)+" Hz. The observed frequency is "+F3(ans)+" Hz.";
  return numq("A car horn sounds at "+gF(f0)+" Hz as the car travels at "+gF(vs)+" m/s toward a cyclist. The cyclist rides at "+gF(vo)+" m/s straight toward the car. Find the frequency the cyclist hears. Take the speed of sound in air as 340 m/s. Give your answer in Hz.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {f0:f0,vs:vs,vo:vo});
});

/* ---------- 8.8 Refraction ---------- */

E("u4-88-bending",4,["PH11.8.8"],2,"var",varset([
  function(){
    return mcq("A light ray travels from air into water, striking the surface at an angle to the normal. In the water the ray",
      "Bends toward the normal, because light travels more slowly in water",
      ["Bends away from the normal, because light travels more slowly in water",
       "Continues perfectly straight, because bending needs a lens",
       "Bends toward the normal, because light travels faster in water"],
      "Water is a slower medium for light than air. Entering a slower medium, a ray bends toward the normal. The bending and the slowing go together.",{});
  },
  function(){
    return mcq("A light ray travels from glass back out into air at an angle to the normal. In the air the ray",
      "Bends away from the normal, because light travels faster in air",
      ["Bends toward the normal, because light travels faster in air",
       "Is always totally internally reflected",
       "Keeps the same angle, because the speed change does not affect direction"],
      "Entering a faster medium, a ray bends away from the normal. Light speeds up leaving glass for air, so the angle to the normal grows.",{});
  },
  function(){
    return mcq("A sound wave in air passes into a layer of warmer air where sound travels faster. The wave",
      "Bends away from the normal at the boundary, like any wave entering a faster medium",
      ["Bends toward the normal at the boundary",
       "Cannot bend, because bending is only for light",
       "Stops at the boundary"],
      "Refraction is a property of waves generally, not just light. Entering a medium where it travels faster, a wave bends away from the normal.",{});
  },
  function(){
    return mcq("A light wave crosses from air into glass. Which quantity stays exactly the same across the boundary?",
      "The frequency of the light",
      ["The wavelength of the light",
       "The speed of the light",
       "The direction of the light, whatever the angle"],
      "The frequency is set by the source and never changes across a boundary. In the slower medium the speed drops, so the wavelength must drop with it to keep v = f λ working.",{});
  },
  function(){
    return mcq("Light enters a block of plastic where its speed is lower than in air, hitting the surface head on, exactly along the normal. The light",
      "Slows down but does not bend, because it arrives along the normal",
      ["Bends strongly toward the normal",
       "Bends strongly away from the normal",
       "Speeds up but does not bend"],
      "Bending at a boundary happens only when the ray arrives at an angle. Along the normal there is no sideways change, so the ray slows but continues straight.",{});
  }
]));

E("u4-88-index",4,["PH11.8.8"],2,"gen",function(){
  var ctx=pick(["a transparent solid sample","a liquid sample in a lab beaker","a piece of clear plastic","a gemstone sample"]);
  var v8=sfR(rf(1.40,2.70),3);
  var n4=sfR(3.00/v8,4), ans=sfR(n4,3);
  var sol="The refractive index is n = c ÷ v, the speed of light in vacuum divided by the speed in the medium. Working in units of 10^8 m/s, c is 3.00 and the speed in the medium is "+gF(v8)+". 3.000 ÷ "+iF(v8)+" = "+iF(n4)+". The refractive index is "+F3(ans)+".";
  return numq("Light travels at "+gF(v8)+" × 10^8 m/s in "+ctx+". Find its refractive index. Give your answer as a decimal.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {v8:v8});
});

E("u4-88-speed-from-index",4,["PH11.8.8"],2,"gen",function(){
  var ctx=pick(["a transparent mineral","a type of glass","a clear liquid","a plastic used for lenses"]);
  var n=sfR(rf(1.15,2.45),3);
  var v4=sfR(3.00/n,4), ans=sfR(v4,3);
  var sol="From n = c ÷ v, the speed in the medium is v = c ÷ n. Working in units of 10^8 m/s, c is 3.00. 3.000 ÷ "+iF(n)+" = "+iF(v4)+". The speed of light in the material is "+F3(ans)+" × 10^8 m/s.";
  return numq("The refractive index of "+ctx+" is "+gF(n)+". Find the speed of light in the material. Give your answer in 10^8 m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {n:n});
});

E("u4-88-frequency-boundary",4,["PH11.8.8"],2,"gen",function(){
  var lam0=sfR(rf(400,700),3);
  var pair=pick([["glass",1.50],["water",1.33],["a clear plastic",1.46],["quartz",1.54],["ice",1.31]]);
  var lam=lam0/pair[1], ans=sfR(lam,3);
  var sol="Across a boundary the frequency never changes. The light slows in "+pair[0]+" by the factor n = "+gF(pair[1])+", and since v = f λ with f fixed, the wavelength shrinks by the same factor: λ = "+iF(lam0)+" nm ÷ "+iF(pair[1])+" = "+iF(sfR(lam,4))+" nm. The wavelength in "+pair[0]+" is "+F3(ans)+" nm.";
  return mcq("Light of wavelength "+gF(lam0)+" nm in air enters "+pair[0]+" (refractive index "+gF(pair[1])+"). What is the wavelength of the light inside "+pair[0]+"?",
    F3(ans)+" nm",
    [F3(sfR(lam0*pair[1],3))+" nm", F3(lam0)+" nm", F3(sfR(lam/(2),3))+" nm"],
    sol,{lam0:lam0,n:pair[1]});
});

E("u4-88-wavelength-medium",4,["PH11.8.8"],3,"gen",function(){
  var pair=pick([["glass",1.50],["water",1.33],["a clear plastic",1.46],["quartz",1.54],["flint glass",1.65]]);
  var f14=sfR(rf(4.00,7.50),3);
  var v4=sfR(3.00/pair[1],4);
  var q4=sfR(v4/f14,4);
  var ans=sfR(q4*1000,3);
  var sol="The frequency does not change in the medium, so first find the speed there: v = c ÷ n. Working in units of 10^8 m/s, 3.000 ÷ "+iF(pair[1])+" = "+iF(v4)+", so the speed in "+pair[0]+" is "+iF(v4)+" × 10^8 m/s. Then λ = v ÷ f. Dividing the scaled values, "+iF(v4)+" ÷ "+iF(f14)+" = "+iF(q4)+", and restoring the powers of ten in words (10^8 divided by 10^14 gives 10^-6 m, which is 1000 nm per unit) gives the wavelength "+F3(ans)+" nm.";
  return numq("Light of frequency "+gF(f14)+" × 10^14 Hz enters "+pair[0]+", which has a refractive index of "+gF(pair[1])+". Find the wavelength of the light in "+pair[0]+". Give your answer in nm.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {f14:f14,n:pair[1]});
});

/* ---------- 8.9 Reflection and refraction applied ---------- */

E("u4-89-snell-angle",4,["PH11.8.9"],2,"gen",function(){
  var pair=pick([
    ["air",1.00,"water",1.33],["air",1.00,"crown glass",1.52],["water",1.33,"crown glass",1.52],["air",1.00,"a clear plastic",1.46]
  ]);
  var th1=sfR(rf(20.0,65.0),3);
  var s2=Math.sin(th1*Math.PI/180)*pair[1]/pair[3];
  var th2=Math.asin(s2)*180/Math.PI, ans=sfR(th2,3);
  var sol="Snell's law: n_1 sin θ_1 = n_2 sin θ_2, with angles measured from the normal. Substituting n_1 = "+gF(pair[1])+", θ_1 = "+gF(th1)+"° and n_2 = "+gF(pair[3])+" gives sin θ_2 = "+iF(sfR(s2,4))+". Taking the inverse sine gives θ_2 = "+F3(ans)+"°. The ray bends toward the normal, as it should entering the slower medium.";
  var q=numq("A light ray travelling in "+pair[0]+" (n = "+gF(pair[1])+") strikes the boundary with "+pair[2]+" (n = "+gF(pair[3])+") at "+gF(th1)+"° from the normal. Find the angle of refraction in "+pair[2]+". Give your answer in degrees.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {th1:th1});
    q.figure=p22Refract(pair[0],pair[2],gF(th1)+"\u00B0",th1,"?",th2);return q;
});

E("u4-89-critical",4,["PH11.8.9"],2,"gen",function(){
  var ctx=pick(["at a harbour light testing a new lens material","in a lab sample being checked for fibre optic use","in a block of material for a headlight lens","in a transparent sample on an optics bench"]);
  var n1=sfR(rf(1.35,2.40),3);
  var ratio=n1>0?1.00/n1:0;
  var thc=Math.asin(ratio)*180/Math.PI, ans=sfR(thc,3);
  var sol="The critical angle is found from sin θ_c = n_2 ÷ n_1, and it only exists going from the higher index material toward the lower one, here air with n_2 = 1.00. That gives sin θ_c = "+iF(sfR(ratio,4))+". Taking the inverse sine gives θ_c = "+F3(ans)+"°. Above this angle, light striking the boundary from inside is totally internally reflected.";
  return numq("Light inside a material of refractive index "+gF(n1)+" "+ctx+" reaches a boundary with air (n = 1.00). Find the critical angle. Give your answer in degrees.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {n1:n1});
});

E("u4-89-snell-cr",4,["PH11.8.9"],3,"gen",function(){
  var lam1=pick([405,436,470,505,546,589,630]);
  var th1=pick([40,45,50,55]);
  var th2=th1-ri(8,18);
  var n1=1.33;
  var n2=n1*Math.sin(th1*Math.PI/180)/Math.sin(th2*Math.PI/180);
  var n2_4=sfR(n2,4);
  var prod4=sfR(lam1*n1,4);
  var lam2_4=sfR(prod4/n2_4,4), ans=sfR(lam2_4,3);
  var sol="First use Snell's law to get the unknown index: n_2 = n_1 sin θ_1 ÷ sin θ_2, with the angles measured from the normal. Substituting n_1 = 1.33, θ_1 = "+th1+"° and θ_2 = "+th2+"° gives n_2 = "+iF(n2_4)+". The frequency is unchanged across the boundary, so the wavelength scales with the speed, which scales as 1 ÷ n: λ_2 = λ_1 n_1 ÷ n_2. First, "+iF(lam1)+" nm × "+iF(n1)+" = "+iF(prod4)+" nm. Then "+iF(prod4)+" nm ÷ "+iF(n2_4)+" = "+iF(lam2_4)+" nm. The wavelength in the solid is "+F3(ans)+" nm.";
  var q=numq("Light of wavelength "+lam1+" nm in water (n = 1.33) strikes the boundary with a transparent solid at "+th1+"° from the normal and refracts at "+th2+"° from the normal. Find the wavelength of the light in the solid. Give your answer in nm.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {lam1:lam1,th1:th1,th2:th2});
    q.figure=p22Refract("water","transparent solid",th1+"\u00B0",th1,th2+"\u00B0",th2);return q;
});

E("u4-89-tir",4,["PH11.8.9"],3,"var",varset([
  function(){
    return mcq("Light inside glass (n = 1.50) strikes a glass to air boundary at 50° from the normal. The critical angle for glass to air is about 42°. What happens?",
      "The light is totally internally reflected, because it is travelling toward the lower index medium above the critical angle",
      ["The light refracts out into the air at a smaller angle",
       "The light refracts out into the air at a larger angle",
       "The light is absorbed at the boundary"],
      "Total internal reflection needs two conditions, and both hold: the light travels from higher n toward lower n, and its angle from the normal (50°) exceeds the critical angle (about 42°). So none of it refracts out.",{});
  },
  function(){
    return mcq("Light inside glass (n = 1.50) strikes a glass to air boundary at 30° from the normal. The critical angle is about 42°. What happens?",
      "The light refracts out into the air, bending away from the normal, because 30° is below the critical angle",
      ["The light is totally internally reflected, because it is inside glass",
       "The light travels straight out with no bending",
       "The light is totally internally reflected, because 30° is above the critical angle"],
      "Total internal reflection only happens above the critical angle. At 30°, below about 42°, the ray crosses into the air and bends away from the normal as it speeds up.",{});
  },
  function(){
    return mcq("A student tries to get total internal reflection with light travelling from air into water, using a very steep angle of incidence. The attempt must fail because",
      "Total internal reflection can only happen travelling from a higher index medium toward a lower index one, and air to water is the wrong way",
      ["The angle is too steep; a shallower angle would work",
       "Water absorbs all the light at steep angles",
       "Total internal reflection only works in glass"],
      "Going from air (n = 1.00) into water (n = 1.33), the ray bends toward the normal and always has a refracted ray. Total internal reflection is only possible from the higher n side toward the lower n side.",{});
  },
  function(){
    var n=pick([1.40,1.46,1.52,1.60]);
    var thc=Math.asin(1/n)*180/Math.PI;
    var ang=Math.round(thc)+ri(6,12);
    return mcq("Light inside a material of refractive index "+gF(n)+" strikes a boundary with air at "+ang+"° from the normal. The critical angle for this material to air is about "+Math.round(thc)+"°. Judging the situation, the light",
      "Undergoes total internal reflection, because it travels toward the lower index medium at an angle above the critical angle",
      ["Refracts into the air, because every ray partly refracts",
       "Refracts into the air bending toward the normal",
       "Passes straight through without bending"],
      "Both conditions for total internal reflection are met: the light is on the higher index side heading toward air, and "+ang+"° is above the critical angle of about "+Math.round(thc)+"°. The light reflects entirely back inside.",{n:n});
  },
  function(){
    return mcq("Fibre optic cables carry light signals over long distances with very little loss. They work because the light inside the fibre",
      "Keeps undergoing total internal reflection at the fibre walls, staying inside the fibre",
      ["Is refracted out and back in at each bend",
       "Travels in a perfectly straight line regardless of bends",
       "Is carried by electric current in the glass"],
      "The light inside the fibre strikes the walls from the higher index side at angles above the critical angle, so it totally internally reflects again and again and stays trapped in the fibre.",{});
  }
]));

E("u4-89-claim-index",4,["PH11.8.9"],3,"gen",function(){
  var th1=sfR(rf(35.0,60.0),3);
  var th2=sfR(th1-rf(8.0,20.0),3);
  var n1=1.00;
  var n2=Math.sin(th1*Math.PI/180)/Math.sin(th2*Math.PI/180), ans=sfR(n2,3);
  var claim=sfR(Math.sin(th2*Math.PI/180)/Math.sin(th1*Math.PI/180),3);
  var sol="The claim used the sine ratio upside down. Snell's law gives n_2 = n_1 sin θ_1 ÷ sin θ_2, with the angles measured from the normal. With n_1 = 1.00, θ_1 = "+gF(th1)+"° and θ_2 = "+gF(th2)+"°, the sines give sin θ_1 = "+iF(sfR(Math.sin(th1*Math.PI/180),4))+" and sin θ_2 = "+iF(sfR(Math.sin(th2*Math.PI/180),4))+", so n_2 = "+F3(ans)+". Because the ray bent toward the normal, the second medium must have the higher index, which the claimed value "+gF(claim)+" gets backwards.";
  var q=numq("A student measures a ray going from air (n = 1.00) into an unknown solid: the angle of incidence is "+gF(th1)+"° from the normal and the angle of refraction is "+gF(th2)+"° from the normal. The student claims the refractive index of the solid is "+gF(claim)+". Find the correct refractive index of the solid. Give your answer as a decimal.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {th1:th1,th2:th2});
    q.figure=p22Refract("air","unknown solid",gF(th1)+"\u00B0",th1,gF(th2)+"\u00B0",th2);return q;
});

E("u4-89-angle-to-speed",4,["PH11.8.9"],3,"gen",function(){
  var v1=sfR(rf(2.80,3.00),3);
  var th1=sfR(rf(38.0,62.0),3);
  var th2=sfR(th1-rf(9.0,20.0),3);
  var ratio4=sfR(Math.sin(th2*Math.PI/180)/Math.sin(th1*Math.PI/180),4);
  var v2_4=sfR(v1*ratio4,4), ans=sfR(v2_4,3);
  var sol="Snell's law can be written with speeds: when a ray bends toward the normal it has slowed down, and v_2 ÷ v_1 = sin θ_2 ÷ sin θ_1. The sines give sin θ_2 = "+iF(sfR(Math.sin(th2*Math.PI/180),4))+" and sin θ_1 = "+iF(sfR(Math.sin(th1*Math.PI/180),4))+", so the speed ratio is "+iF(ratio4)+". Then, working in units of 10^8 m/s, v_2 = "+iF(v1)+" × "+iF(ratio4)+" = "+iF(v2_4)+". The speed in the second medium is "+F3(ans)+" × 10^8 m/s.";
  var q=numq("A light ray travels at "+gF(v1)+" × 10^8 m/s in a first medium. It strikes a boundary at "+gF(th1)+"° from the normal and refracts at "+gF(th2)+"° from the normal in a second medium. Find the speed of the light in the second medium. Give your answer in 10^8 m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {v1:v1,th1:th1,th2:th2});
    q.figure=p22Refract("first medium","second medium",gF(th1)+"\u00B0",th1,gF(th2)+"\u00B0",th2);return q;
});

/* ----- bank-br.js ----- */
// Diagram figures (Phase C, Nov 2026): distance time graphs added for the B.2 motion graph entries; see bank-helpers.js p22 helpers.
// Physics 2204 Bridging bank: Science 1206 review (speed, motion graphs, scalars and vectors)
// No CRMARKS entries in this file.

/* ---------- B.1 Speed, distance and time (Science 1206 review) ---------- */

E("br-b1-avg-speed",5,["B.1"],1,"gen",function(){
  var d=ri(60,480),t=pick([4,5,6,8,10,12,15,16,20,24]);
  var ctx=pick(["A school bus travels","A cyclist rides","A ferry crosses a harbour sailing","A hiker walks","A delivery van drives","A runner covers"]);
  var vRaw=d/t,vP=sfR(vRaw,4),ans=sfR(vP,3);
  return numq(ctx+" a distance of "+gF(d)+" m in "+gF(t)+" s at a steady speed. Calculate the speed. Give your answer in m/s.",
    ans,Math.max(0.02*Math.abs(ans),0.05),
    "Speed is distance divided by time: "+iF(d)+" / "+iF(t)+" = "+iF(vP)+" m/s. The speed is <b>"+F3(ans)+" m/s</b>.",{d:d,t:t});
});

E("br-b1-time-distance",5,["B.1"],2,"gen",function(){
  var f=pick(["time","distance"]);
  if(f==="time"){
    var v=pick([3,4,5,6,8,10,12]),t=ri(6,40),d=v*t,ans=sfR(t,3);
    var ctx=pick(["A cyclist rides at a steady","A hiker walks at a steady","A boat moves at a steady","A runner keeps a steady"]);
    return numq(ctx+" speed of "+gF(v)+" m/s for a trip of "+gF(d)+" m. Calculate the time the trip takes. Give your answer in s.",
      ans,Math.max(0.02*Math.abs(ans),0.05),
      "Rearrange the speed relation to solve for time: time is distance divided by speed: "+iF(d)+" / "+iF(v)+" = "+iF(t)+" s. The trip takes <b>"+F3(ans)+" s</b>.",{v:v,t:t,d:d});
  }
  var v2=pick([2.5,3,4,5,6,7.5,8,10]),t2=ri(5,45),dRaw=v2*t2,dP=sfR(dRaw,4),ans=sfR(dP,3);
  var ctx2=pick(["A swimmer swims at a steady","A snowmobile travels at a steady","A kayaker paddles at a steady","A skater glides at a steady"]);
  return numq(ctx2+" speed of "+gF(v2)+" m/s for "+gF(t2)+" s. Calculate the distance travelled. Give your answer in m.",
    ans,Math.max(0.02*Math.abs(ans),0.05),
    "Rearrange the speed relation to solve for distance: distance is speed times time: "+iF(v2)+" × "+iF(t2)+" = "+iF(dP)+" m. The distance travelled is <b>"+F3(ans)+" m</b>.",{v2:v2,t2:t2});
});

E("br-b1-speed-compare",5,["B.1"],1,"gen",function(){
  var vA=pick([3,4,5]),tA=pick([8,10,12]),vB=vA+pick([1,2]),tB=pick([8,10,12]);
  var nameA=pick(["Maya","Liam","Sofia","Noah"]),nameB=pick(["Emma","Lucas","Ava","Ethan"]);
  var dA=vA*tA,dB=vB*tB;
  return mcq(nameA+" runs "+gF(dA)+" m in "+gF(tA)+" s. "+nameB+" runs "+gF(dB)+" m in "+gF(tB)+" s. Who runs faster?",
    nameB+", at "+F3(vB)+" m/s",
    [nameA+", at "+F3(vA)+" m/s","They run at the same speed","Whoever ran farther is faster, no matter the time"],
    "Compare the speeds, not just the distances. For "+nameA+": "+iF(dA)+" / "+iF(tA)+" = "+iF(vA)+" m/s. For "+nameB+": "+iF(dB)+" / "+iF(tB)+" = "+iF(vB)+" m/s. The larger speed belongs to <b>"+nameB+"</b>. Distance alone does not decide speed, because the times may differ.",{vA:vA,tA:tA,vB:vB,tB:tB});
});

/* ---------- B.2 Motion graphs (Science 1206 review) ---------- */

E("br-b2-slope-meaning",5,["B.2"],1,"gen",function(){
  var p=ri(6,12),q=ri(1,5),ctx=pick(["a cyclist","a hiker","a school bus","a delivery van","a runner","a ferry"]);
  var q=mcq("Two trips by "+ctx+" are drawn on the same distance-time graph. One line has slope "+gF(p)+" m/s and rises steeply, and the other has slope "+gF(q)+" m/s and rises gently. What does the steeper slope on a distance-time graph tell you?",
    "The object was moving faster",
    ["The object travelled a shorter distance","The object started earlier","The object was slowing down"],
    "On a distance-time graph, the slope is the distance covered per second, which is the speed. A steeper slope means more distance is covered each second, so <b>the object was moving faster</b>. The gently rising line, with the smaller slope, is the slower trip.",{p:p,q:q});
    q.figure=p22Plot({series:[{pts:[[0,0],[1,q._p.p]]},{pts:[[0,0],[1,q._p.q]]}],xt:[],yt:[],xmax:1.2,ymax:q._p.p*1.3,xl:"time",yl:"distance",labels:[{x:1.02,y:q._p.p,t:"slope "+gF(q._p.p)+" m/s",anchor:"start"},{x:1.02,y:q._p.q,t:"slope "+gF(q._p.q)+" m/s",anchor:"start"}]});return q;
});

E("br-b2-graph-velocity",5,["B.2"],2,"gen",function(){
  var v=pick([1.5,2,2.5,3,4,5]),t=pick([4,6,8,10,12]),x1=ri(2,15);
  var disp=sfR(v*t,4),x2=sfR(x1+disp,4),ans=sfR(v,3);
  var ctx=pick(["a walker on the East Coast Trail","a cyclist on a straight road","a boat crossing a pond","a student walking to school"]);
  var q=numq("A distance-time graph for "+ctx+" is a straight line from a distance of "+gF(x1)+" m at time zero to a distance of "+gF(x2)+" m at "+gF(t)+" s. Calculate the speed shown by the graph. Give your answer in m/s.",
    ans,Math.max(0.02*Math.abs(ans),0.05),
    "On a distance-time graph, the speed is the slope, the change in distance divided by the time. The change in distance: "+iF(x2)+" - "+iF(x1)+" = "+iF(disp)+" m. Divide by the time: "+iF(disp)+" / "+iF(t)+" = "+iF(v)+" m/s. The speed is <b>"+F3(ans)+" m/s</b>.",{v:v,t:t,x1:x1});
    q.figure=p22Plot({series:[{pts:[[0,x1],[t,x2]]}],xt:[[0,"0"],[t,gF(t)]],yt:[[x1,gF(x1)],[x2,gF(x2)]],xmax:t*1.08,ymax:x2*1.15,xl:"time (s)",yl:"distance (m)",dots:true});return q;
});

E("br-b2-motion-description",5,["B.2"],1,"var",varset([
  function(){
    var v=ri(3,7);
    var q=mcq("A distance-time graph for a cyclist is a straight line rising steadily, gaining "+v+" m of distance every second. Which motion does this line show?",
      "Moving away at a steady speed",
      ["Speeding up the whole time","Sitting still","Moving back toward the start"],
      "A straight, steadily rising distance-time line means the distance grows by the same amount each second. That is <b>moving away at a steady speed</b>. A curve would show a changing speed, and a flat line would show rest.",{});
    q.figure=p22Shape("line","gains "+v+" m every second");return q;
  },
  function(){
    var t=ri(4,10);
    var q=mcq("A distance-time graph for a parked snowmobile is a flat horizontal line lasting "+t+" s. Which motion does this line show?",
      "At rest, not moving",
      ["Moving at a steady speed","Speeding up slowly","Returning to the start"],
      "A flat line on a distance-time graph means the distance from the start never changes during those seconds. The snowmobile is <b>at rest, not moving</b>.",{});
    q.figure=p22Shape("flat","lasts "+t+" s");return q;
  },
  function(){
    var q=mcq("A distance-time graph for a hiker rises steadily, then goes flat for a while, then rises steadily again at the same steepness. Which description matches the hike?",
      "The hiker walked at a steady speed, rested for a while, then walked on at the same speed",
      ["The hiker sped up, then slowed down, then sped up again","The hiker walked out, walked back, then walked out again","The hiker climbed a hill, crossed a flat lookout, then climbed again at the same height"],
      "Each rising section shows distance growing steadily, which is a steady walking speed, and the two rises have the same steepness, so the speed is the same. The flat section shows the distance not changing, which is a rest. <b>The hiker walked at a steady speed, rested, then walked on at the same speed</b>.",{});
    q.figure=p22Shape("riseflat",null);return q;
  },
  function(){
    var v=ri(2,6);
    var q=mcq("A distance-time graph for a boat is a straight line falling steadily, losing "+v+" m of distance from the dock every second. Which motion does this line show?",
      "Moving back toward the dock at a steady speed",
      ["Moving away from the dock at a steady speed","At rest near the dock","Speeding up away from the dock"],
      "The distance from the dock shrinks by the same amount each second, so the boat is approaching the dock steadily. The line shows <b>moving back toward the dock at a steady speed</b>.",{});
    q.figure=p22Shape("fall","loses "+v+" m every second");return q;
  },
  function(){
    var q=mcq("A distance-time graph for a runner is a curve that gets steeper and steeper as time goes on. Which motion does this curve show?",
      "Speeding up",
      ["Moving at a steady speed","Slowing down","At rest"],
      "The slope of a distance-time graph is the speed. When the curve gets steeper, the slope grows, so more distance is covered each second. The runner is <b>speeding up</b>.",{});
    q.figure=p22Shape("curve",null);return q;
  }
]));

/* ---------- B.3 Scalars, vectors and unit conversion (Science 1206 review) ---------- */

E("br-b3-scalar-vector",5,["B.3"],1,"var",varset([
  function(){
    var v=ri(4,12);
    return textq("A cyclist's speedometer reads "+v+" m/s, with no direction stated. Is speed a scalar or a vector quantity? Answer with one word: scalar or vector.",
      ["scalar"],
      "Speed carries a size only, with no direction, and a quantity with size alone is a scalar. Speed is a <b>scalar</b>. Its partner quantity, velocity, is the vector, because velocity states a direction as well.",{});
  },
  function(){
    var d=ri(20,90);
    return textq("A hiker's displacement is "+d+" m east of camp. Is displacement a scalar or a vector quantity? Answer with one word: scalar or vector.",
      ["vector"],
      "Displacement states both a size and a direction, east, and a quantity with size and direction is a vector. Displacement is a <b>vector</b>. The distance walked to get there would be the scalar.",{});
  },
  function(){
    var t=ri(30,90);
    return textq("A trip takes "+t+" s from start to finish. Is time a scalar or a vector quantity? Answer with one word: scalar or vector.",
      ["scalar"],
      "Time has a size only. There is no direction attached to a number of seconds, so time is a <b>scalar</b>.",{});
  },
  function(){
    var m=ri(40,90);
    return textq("A student has a mass of "+m+" kg. Is mass a scalar or a vector quantity? Answer with one word: scalar or vector.",
      ["scalar"],
      "Mass states how much matter is present, a size only, with no direction. Mass is a <b>scalar</b>.",{});
  },
  function(){
    var v=ri(5,15);
    return textq("A boat's velocity is "+v+" m/s north across a bay. Is velocity a scalar or a vector quantity? Answer with one word: scalar or vector.",
      ["vector"],
      "Velocity states both a size and a direction, north, so it is a <b>vector</b>. Speed, its size alone, would be the scalar.",{});
  },
  function(){
    var d=ri(100,900);
    return textq("A road sign says the next town is "+d+" m away along the highway, with no direction stated. The distance on the sign is which kind of quantity? Answer with one word: scalar or vector.",
      ["scalar"],
      "The sign gives a size only, with no direction, so the distance is a <b>scalar</b>. Displacement between the two towns, stated with a direction, would be the vector.",{});
  }
]));

E("br-b3-unit-convert",5,["B.3"],1,"gen",function(){
  var toMs=Math.random()<0.5;
  if(toMs){
    var kmh=pick([18,36,54,72,90,108]),ms=sfR(kmh/3.6,4),ans=sfR(ms,3);
    var veh=pick(["A ferry","A school bus","A snowmobile","A delivery van","A train","A tour boat"]);
    return numq(veh+" travels at "+gF(kmh)+" km/h. Convert this speed to metres per second. Give your answer in m/s.",
      ans,Math.max(0.02*Math.abs(ans),0.05),
      "To change km/h into m/s, divide by 3.6: "+iF(kmh)+" / "+iF(3.6)+" = "+iF(ms)+" m/s. The speed is <b>"+F3(ans)+" m/s</b>.",{kmh:kmh});
  }
  var ms2=pick([5,10,15,20,25,30]),kmh2=sfR(ms2*3.6,4),ans2=sfR(kmh2,3);
  var veh2=pick(["A cyclist","A runner","A kayaker","A skater","A hiker","A swimmer"]);
  return numq(veh2+" moves at "+gF(ms2)+" m/s. Convert this speed to kilometres per hour. Give your answer in km/h.",
    ans2,Math.max(0.02*Math.abs(ans2),0.05),
    "To change m/s into km/h, multiply by 3.6: "+iF(ms2)+" × "+iF(3.6)+" = "+iF(kmh2)+" km/h. The speed is <b>"+F3(ans2)+" km/h</b>.",{ms2:ms2});
});

/* ============ Constructed-response marks (generated) ============ */
/* Built by assemble-bank.py from the CRMARKS manifests at the top of
   each unit file. Exam Section B draws only from these entries. */
window.__BANK_CRMARKS={"u1-51-vectors-cr":3,"u1-52-freefall-cr":4,"u1-52-graph-cr":3,"u1-52-stopping-cr":5,"u1-53-meet-cr":2,"u1-53-relative-cr":4,"u2-61-netforce-cr":3,"u2-62-friction-cr":3,"u2-62-multistep-cr":5,"u2-63-impulse-cr":4,"u2-65-collision-cr":4,"u2-65-stick-cr":2,"u3-711-shm-energy-cr":4,"u3-712-classify-cr":2,"u3-73-workenergy-cr":3,"u3-75-energy-cr":5,"u3-76-friction-cr":4,"u3-78-power-cr":3,"u4-82-wave-eq-cr":3,"u4-84-resonance-cr":5,"u4-84-standing-cr":2,"u4-86-doubleslit-cr":3,"u4-87-doppler-cr":4,"u4-89-snell-cr":4};
