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
