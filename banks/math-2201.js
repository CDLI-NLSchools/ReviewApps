/* Math 2201 bank module for the unified review app shell.
   Assembled by assemble-bank.py from banks/math-2201/; edit the
   per-unit sources there, not this file. Entries register through
   the shell's E(id, unit, indicators, level, kind, gen). */

/* ----- bank-helpers.js ----- */
// Math 2201 bank helpers: none are carried in this file. Every
// helper and diagram function the entries call (the random and
// statistics helpers, mcq, numq, textq, varset, and the figure
// library: triSVG, twoTriSVG, transversalSVG, polySVG, normSVG and
// their kin) is defined by the unified shell itself, because the
// shell's chassis descends from this course's own app: the
// standalone keeps the same functions in its helpers and figures
// blocks (math-2201-review/Math2201Review.html, lines 388 to 642),
// and a name-by-name check confirms each one is present in the
// built shell. The curriculum map that follows those blocks in
// the standalone (UNITS, INDICATORS, UNIT_IND, lines 643 to 724)
// lives in courses.js as this course's configuration.

/* ==== Graphics pass Tranche 1 (November 12, 2026): parabola and
   rectangle figure builders, bank-local to Math 2201 (no other
   course calls them yet). Every figure is drawn from the calling
   entry's own drawn values, in the shell figure style (FIG_INK,
   FIG_SHADE, FIG_ACC, _txt, fmt). parSVG label modes: "values"
   shows axis numbers and mark labels (read-off questions);
   "none" (the default) shows gridlines and unlabelled dots only,
   so the figure supports a compute question without giving away
   its key. ==== */
function _parNum(v){var r=Math.round(v*10)/10;return (r===Math.round(r))?(""+Math.round(r)):(""+r);}
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
/* P2: trajectory setting of parSVG (first-quadrant height-time). */
function trajSVG(a,b,c,o){
  o=o||{};o.traj=true;
  o.xLab=o.xLab||"t (s)";o.yLab=o.yLab||"h (m)";
  o.aria=o.aria||"Height-time graph of a projectile";
  return parSVG(a,b,c,o);
}
/* A parabola through two points at the same height (axis family). */
function parTwoPtsSVG(x1,x2,y){
  var gap=x2-x1,mid=(x1+x2)/2,a=12/(gap*gap);
  return parSVG(a,-2*a*mid,a*mid*mid+y-3,{marks:[{x:x1,y:y},{x:x2,y:y}],aria:"Parabola through two points at the same height"});
}
/* A parabola with a given axis of symmetry through a given point. */
function parMirrorSVG(h,x1,y){
  var dd=x1-h,a=Math.min(1.5,Math.max(0.15,6/(dd*dd))),k=y-a*dd*dd;
  return parSVG(a,-2*a*h,a*h*h+k,{marks:[{x:x1,y:y}],vline:h,aria:"Parabola with its axis of symmetry shown dashed"});
}
/* P3: comparison panels, small parabolas in a row. Each panel is
   {a, b, c, caption, xrange, yrange} for y = a x^2 + b x + c. */
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
/* Wrap a fixed varset arm so its question carries a figure drawn by
   figFn (called on every draw; the arms wrapped this way have fixed
   coefficients, so the figure always matches the arm). */
function figArm(f,figFn){return function(){var q=f();q.figure=figFn();return q;};}
/* Fixed figures for the u2-vertex-form-params arms (P3 panels). */
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
/* Fixed figures for the u3-roots-zeros arms (roots marked). */
function figRootsZeros1(){return parSVG(1,-5,6,{marks:[{x:2,y:0},{x:3,y:0}],aria:"Parabola crossing the x-axis at 2 and 3"});}
function figRootsZeros2(){return parSVG(1,-4,4,{marks:[{x:2,y:0}],aria:"Parabola touching the x-axis at one point"});}
function figRootsZeros3(){return parSVG(1,3,-4,{marks:[{x:-4,y:0},{x:1,y:0}],aria:"Parabola crossing the x-axis at -4 and 1"});}
/* Fixed figures for the u3-setup-equation arms (P2 trajectories
   with the target height dashed). */
function figSetupEq1(){return trajSVG(-5,30,45,{hline:65});}
function figSetupEq2(){return trajSVG(-5,8,12,{hline:14});}
function figSetupEq3(){return trajSVG(-5,20,3,{hline:18});}
/* P4: rectangle against a wall, fencing on the other three sides.
   The wall side is drawn heavy and hatched; total is the drawn
   fencing length in metres. */
function fenceSVG(total,wall){
  var W=340,H=198,x0=64,x1=276,y0=60,y1=150;
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rectangle fenced on three sides against a wall">';
  out+='<rect x="'+x0+'" y="'+y0+'" width="'+(x1-x0)+'" height="'+(y1-y0)+'" fill="#f4f8f5"/>';
  out+='<path d="M'+x0+' '+y0+' L'+x0+' '+y1+' L'+x1+' '+y1+' L'+x1+' '+y0+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2.4"/>';
  out+='<line x1="'+(x0-14)+'" y1="'+y0+'" x2="'+(x1+14)+'" y2="'+y0+'" stroke="#7d8a82" stroke-width="5"/>';
  for(var hx=x0-8;hx<=x1+8;hx+=16)
    out+='<line x1="'+hx+'" y1="'+y0+'" x2="'+(hx-7)+'" y2="'+(y0-11)+'" stroke="#7d8a82" stroke-width="1.6"/>';
  out+=_txt((x0+x1)/2,y0-26,wall,12.5,true);
  out+=_txt((x0+x1)/2,y1+24,"Total fencing: "+total+" m",12.5,false);
  return out+'</svg>';
}
/* P4: plain labelled rectangle (modelling diagrams). */
function rectDiagSVG(wLab,lLab,capLab){
  var W=340,H=202,x0=70,x1=262,y0=38,y1=140;
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rectangle diagram">';
  out+='<rect x="'+x0+'" y="'+y0+'" width="'+(x1-x0)+'" height="'+(y1-y0)+'" fill="#f4f8f5" stroke="'+FIG_INK+'" stroke-width="2.2"/>';
  out+=_txt((x0+x1)/2,(y0+y1)/2,capLab,13.5,true);
  out+=_txt((x0+x1)/2,y1+22,lLab,12.5,false);
  out+=_txt(x1+22,(y0+y1)/2,wLab,12.5,false);
  return out+'</svg>';
}
/* P4: rectangle with a uniform border path around it (shaded);
   the inner rectangle keeps the drawn dimensions L by W, and the
   border width is the unknown, marked with a question mark. */
function borderSVG(L,Wd){
  var W=340,H=214,x0=56,x1=284,y0=30,y1=160,ix0=x0+26,ix1=x1-26,iy0=y0+26,iy1=y1-26;
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rectangle with a uniform border around it">';
  out+='<rect x="'+x0+'" y="'+y0+'" width="'+(x1-x0)+'" height="'+(y1-y0)+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2.2"/>';
  out+='<rect x="'+ix0+'" y="'+iy0+'" width="'+(ix1-ix0)+'" height="'+(iy1-iy0)+'" fill="#ffffff" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+=_txt((x0+x1)/2,(y0+iy0)/2,"?",13,true);
  out+=_txt((ix0+ix1)/2,iy1+13,L+" m",12.5,false);
  out+=_txt(ix1+15,(iy0+iy1)/2,Wd+" m",12.5,false);
  return out+'</svg>';
}
/* P4: two squares side by side; the larger side is m metres
   longer than the smaller side s. */
function twoSquaresSVG(m){
  var W=340,H=192,base=142,s1=84,s2=116,xa=52,xb=196;
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two squares, one larger than the other">';
  out+='<rect x="'+xa+'" y="'+(base-s1)+'" width="'+s1+'" height="'+s1+'" fill="#f4f8f5" stroke="'+FIG_INK+'" stroke-width="2.2"/>';
  out+='<rect x="'+xb+'" y="'+(base-s2)+'" width="'+s2+'" height="'+s2+'" fill="#f4f8f5" stroke="'+FIG_INK+'" stroke-width="2.2"/>';
  out+=_txt(xa+s1/2,base+20,"s",12.5,false);
  out+=_txt(xb+s2/2,base+20,"s + "+m+" m",12.5,false);
  return out+'</svg>';
}

/* ==== Graphics pass Tranche 3 (November 12, 2026): the Unit 5
   chart family, bank-local to Math 2201. Same contract as the
   earlier tranches: every figure is drawn from the calling
   entry's own drawn values, in the shell figure style (FIG_INK,
   FIG_SHADE, FIG_ACC, FIG_ALT, _txt, fmt). dotPlotSVG draws one
   row of dots on a labelled axis, or two rows sharing one scale
   (o.rows: [{label, data}]); o.band shades a value interval
   [lo, hi) behind the dots; o.mean draws a dashed line at the
   given mean. barsSVG draws labelled bars: o.touch makes them
   touch (histogram bars over intervals), otherwise they stand
   apart (category bars); bar heights read off the frequency
   axis, which is always labelled. polyPairSVG draws two
   frequency polygons on shared axes with an UNLABELLED
   frequency axis: it asserts shape only (tall and narrow
   against low and wide), for the one entry whose stem describes
   the two polygons in exactly those terms and gives no heights.
   The classification found no scatter or box-and-whisker data
   anywhere in Unit 5, so no builders for those were needed;
   the normal-curve figures reuse the shell's own normSVG. ==== */
function _chartStep(span){return span<=13?1:(span<=32?2:(span<=75?5:(span<=160?10:(span<=320?25:50))));}
function dotPlotSVG(data,o){
  o=o||{};
  var rows=o.rows||[{label:"",data:data}];
  var all=[];rows.forEach(function(r){all=all.concat(r.data);});
  if(o.band){all.push(o.band[0],o.band[1]);}
  if(o.mean!==undefined)all.push(o.mean);
  var mn=Math.min.apply(null,all),mx=Math.max.apply(null,all);
  var step=_chartStep(Math.max(mx-mn,1));
  var pad=step*0.55,x0=mn-pad,x1=mx+pad;
  if(x1<=x0)x1=x0+step;
  var W=340,mL=30,mR=16,iw=W-mL-mR;
  function X(v){return mL+(v-x0)/(x1-x0)*iw;}
  var mTop=(o.mean!==undefined)?17:6;
  var counts=rows.map(function(r){
    var c={},mxst=0;
    r.data.forEach(function(v){c[v]=(c[v]||0)+1;if(c[v]>mxst)mxst=c[v];});
    return {c:c,mx:mxst};
  });
  var rowH=counts.map(function(cc){return cc.mx*10.5+30;});
  var H=mTop+rowH.reduce(function(s,h){return s+h;},0)+4;
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+(o.aria||"Dot plot of a data set")+'">';
  var t,lastAxisY=0;
  for(t=Math.ceil(x0/step)*step;t<=x1+1e-9;t+=step){
    out+='<line x1="'+fmt(X(t),1)+'" y1="'+mTop+'" x2="'+fmt(X(t),1)+'" y2="'+(H-24)+'" stroke="#d8e2dc" stroke-width="1"/>';
  }
  var yCursor=mTop;
  rows.forEach(function(r,ri2){
    var cc=counts[ri2],stackH=cc.mx*10.5,axisY=yCursor+stackH+8;
    lastAxisY=axisY;
    if(o.band&&ri2===0){
      out+='<rect x="'+fmt(X(o.band[0]),1)+'" y="'+(mTop-2)+'" width="'+fmt(X(o.band[1])-X(o.band[0]),1)+'" height="'+(axisY-mTop+2)+'" fill="'+FIG_SHADE+'"/>';
      out+='<line x1="'+fmt(X(o.band[0]),1)+'" y1="'+(mTop-2)+'" x2="'+fmt(X(o.band[0]),1)+'" y2="'+axisY+'" stroke="#7d8a82" stroke-width="1.5" stroke-dasharray="5 4"/>';
      out+='<line x1="'+fmt(X(o.band[1]),1)+'" y1="'+(mTop-2)+'" x2="'+fmt(X(o.band[1]),1)+'" y2="'+axisY+'" stroke="#7d8a82" stroke-width="1.5" stroke-dasharray="5 4"/>';
    }
    var seen={};
    r.data.forEach(function(v){
      seen[v]=(seen[v]||0)+1;
      var cy=axisY-6-(seen[v]-1)*10.5;
      out+='<circle cx="'+fmt(X(v),1)+'" cy="'+fmt(cy,1)+'" r="4.2" fill="'+FIG_ACC+'" stroke="#ffffff" stroke-width="1.2"/>';
    });
    out+='<line x1="'+mL+'" y1="'+axisY+'" x2="'+(mL+iw)+'" y2="'+axisY+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    out+='<polygon points="'+(mL+iw)+','+axisY+' '+(mL+iw-8)+','+(axisY-3.4)+' '+(mL+iw-8)+','+(axisY+3.4)+'" fill="'+FIG_INK+'"/>';
    if(r.label)out+=_txt(2,axisY-stackH/2-3,r.label,12.5,true,"start");
    yCursor=axisY+22;
  });
  for(t=Math.ceil(x0/step)*step;t<=x1+1e-9;t+=step){
    out+=_txt(X(t),lastAxisY+13,_parNum(t),10.5,false);
  }
  if(o.mean!==undefined){
    out+='<line x1="'+fmt(X(o.mean),1)+'" y1="'+(mTop-4)+'" x2="'+fmt(X(o.mean),1)+'" y2="'+lastAxisY+'" stroke="'+FIG_ALT+'" stroke-width="1.5" stroke-dasharray="6 4"/>';
    out+=_txt(X(o.mean),8,"mean = "+_parNum(o.mean),10.5,false);
  }
  return out+'</svg>';
}
/* Bars for a frequency display. bars: [{label, f}]. */
function barsSVG(bars,o){
  o=o||{};
  var W=340,mL=36,mR=10,mT=12,ih=148,mB=o.xLab?42:30;
  var H=mT+ih+mB,iw=W-mL-mR;
  var maxF=0;bars.forEach(function(b){if(b.f>maxF)maxF=b.f;});
  var step=maxF<=6?1:(maxF<=12?2:(maxF<=25?5:10));
  var yMax=Math.max(step,Math.ceil(maxF/step)*step);
  function Y(f){return mT+ih-(f/yMax)*ih;}
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+(o.aria||"Bar chart")+'">';
  for(var g=0;g<=yMax;g+=step){
    out+='<line x1="'+mL+'" y1="'+fmt(Y(g),1)+'" x2="'+(mL+iw)+'" y2="'+fmt(Y(g),1)+'" stroke="#d8e2dc" stroke-width="1"/>';
    out+=_txt(mL-5,Y(g),""+g,10.5,false,"end");
  }
  out+='<line x1="'+mL+'" y1="'+(mT+ih)+'" x2="'+(mL+iw)+'" y2="'+(mT+ih)+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  var bw=iw/bars.length;
  bars.forEach(function(b,i){
    var wpx=o.touch?bw-1.5:bw*0.6;
    var x=mL+i*bw+(bw-wpx)/2;
    out+='<rect x="'+fmt(x,1)+'" y="'+fmt(Y(b.f),1)+'" width="'+fmt(wpx,1)+'" height="'+fmt(mT+ih-Y(b.f),1)+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    out+=_txt(mL+i*bw+bw/2,mT+ih+13,b.label,10.5,false);
  });
  if(o.yLab)out+='<text x="13" y="'+fmt(mT+ih/2,1)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="middle" dominant-baseline="central" transform="rotate(-90 13 '+fmt(mT+ih/2,1)+')">'+o.yLab+'</text>';
  if(o.xLab)out+=_txt(mL+iw/2,H-4,o.xLab,12,false);
  return out+'</svg>';
}
/* Two frequency polygons on shared axes, shape only: route A is
   tall and narrow, peaked over [peakLo, peakHi]; route B is low
   and wide, spread over the 10-wide intervals from 0 to top. */
function polyPairSVG(o){
  var W=340,H=200,mL=30,mR=10,mT=24,mB=28,iw=W-mL-mR,ih=H-mT-mB;
  var midA=(o.peakLo+o.peakHi)/2;
  var x0=-10,x1=Math.max(o.top+10,midA+22);
  function X(x){return mL+(x-x0)/(x1-x0)*iw;}
  function Y(r){return mT+ih-r*ih;}
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+(o.aria||"Two frequency polygons on the same axes")+'">';
  out+='<line x1="'+(mL+2)+'" y1="11" x2="'+(mL+18)+'" y2="11" stroke="'+FIG_INK+'" stroke-width="2"/><text x="'+(mL+23)+'" y="15" font-size="11.5" fill="'+FIG_INK+'" text-anchor="start">Route A</text>';
  out+='<line x1="'+(mL+92)+'" y1="11" x2="'+(mL+108)+'" y2="11" stroke="'+FIG_ALT+'" stroke-width="2"/><text x="'+(mL+113)+'" y="15" font-size="11.5" fill="'+FIG_ALT+'" text-anchor="start">Route B</text>';
  out+='<line x1="'+mL+'" y1="'+Y(0)+'" x2="'+(mL+iw)+'" y2="'+Y(0)+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  out+='<line x1="'+mL+'" y1="'+mT+'" x2="'+mL+'" y2="'+Y(0)+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  var nb=(o.top+1)/10,i;
  for(i=0;i<nb;i++){
    out+=_txt(X(i*10+4.5),Y(0)+13,(i*10)+"-"+(i*10+9),9,false);
  }
  out+='<text x="12" y="'+fmt(mT+ih/2,1)+'" font-size="11.5" fill="'+FIG_INK+'" text-anchor="middle" dominant-baseline="central" transform="rotate(-90 12 '+fmt(mT+ih/2,1)+')">Frequency</text>';
  var bPts=[[-5.5,0]],i2;
  for(i2=0;i2<nb;i2++)bPts.push([i2*10+4.5,0.30*(0.55+0.45*Math.sin(Math.PI*(i2+0.5)/nb))]);
  bPts.push([o.top+5.5,0]);
  var aPts=[[midA-20,0],[midA-10,0.45],[midA,1],[midA+10,0.45],[midA+20,0]];
  function poly(pts,col){
    var d="",s="";
    pts.forEach(function(p,j){d+=(j?"L":"M")+fmt(X(p[0]),1)+" "+fmt(Y(p[1]),1);});
    s+='<path d="'+d+'" fill="none" stroke="'+col+'" stroke-width="2"/>';
    pts.forEach(function(p){s+='<circle cx="'+fmt(X(p[0]),1)+'" cy="'+fmt(Y(p[1]),1)+'" r="2.6" fill="'+col+'"/>';});
    return s;
  }
  out+=poly(bPts,FIG_ALT);
  out+=poly(aPts,FIG_INK);
  return out+'</svg>';
}

/* ==== Prior knowledge tranche helpers (November 15, 2026) ====
   Feeder-local helpers copied with the borrowed PK entries, per
   the tranche spec's copying rule: a borrowed entry brings any
   helper it calls that this bank does not already have. Provenance:
   - FR: from math-1201/bank-helpers.js (identical in math-9's).
   - u5lin: from math-9/bank-u5.js (file-local there).
   - The u2 block: from math-1201/bank-u2.js, its own helpers
     section plus u2expStr, copied whole so the set is complete.
   - The u3 block: from math-1201/bank-u3.js, its algebra and
     rendering helpers section, copied whole.
   No name here collides with the shell or with this bank's own
   helpers (checked name by name before the copy). */
function FR(n,d){return "\\frac{"+n+"}{"+d+"}";}
function u5lin(a, b) { var s; if (a === 1) s = "x"; else if (a === -1) s = "-x"; else s = fmt(a) + "x"; if (b > 0) s += "+" + fmt(b); else if (b < 0) s += "-" + fmt(-b); return s; }
function u2gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t;}return a||1;}
function u2lcm(a,b){return a/u2gcd(a,b)*b;}
function u2red(n,d){var g=u2gcd(n,d);n/=g;d/=g;if(d<0){n=-n;d=-d;}return [n,d];}
function u2fracS(n,d){var r=u2red(n,d);if(r[1]===1)return ""+r[0];return FR(r[0],r[1]);}
function u2radS(idx,rad){return idx===2?("\\sqrt{"+rad+"}"):("\\sqrt["+idx+"]{"+rad+"}");}
function u2isSq(n){var r=Math.round(Math.sqrt(n));return r*r===n;}
function u2isCu(n){var r=Math.round(Math.cbrt(n));return r*r*r===n;}
function u2isPrime(n){if(n<2)return false;for(var p=2;p*p<=n;p++){if(n%p===0)return false;}return true;}
function u2facMap(n){var m={},x=n,p=2;while(p*p<=x){while(x%p===0){m[p]=(m[p]||0)+1;x/=p;}p++;}if(x>1)m[x]=(m[x]||0)+1;return m;}
function u2mapStr(m){return Object.keys(m).map(function(p){return m[p]>1?p+"^"+m[p]:p;}).join(" \\times ");}
function u2facStr(n){return u2mapStr(u2facMap(n));}
function u2facList(n){var m=u2facMap(n),out=[];Object.keys(m).forEach(function(p){for(var i=0;i<m[p];i++)out.push(+p);});return out;}
function u2pickD3(ans,cands){
  var out=[],seen={};seen[ans]=1;
  for(var i=0;i<cands.length&&out.length<3;i++){var c=cands[i];if(typeof c==="number"&&isFinite(c)&&c!==ans&&!seen[c]){seen[c]=1;out.push(c);}}
  var k=2;while(out.length<3){var c2=ans+k;k++;if(!seen[c2]){seen[c2]=1;out.push(c2);}}
  return out;
}
function u2pickS3(ans,cands){
  var out=[],seen={};seen[ans]=1;
  for(var i=0;i<cands.length&&out.length<3;i++){var c=cands[i];if(typeof c==="string"&&c!==ans&&!seen[c]){seen[c]=1;out.push(c);}}
  return out;
}
function u2cloneMap(m){var o={};Object.keys(m).forEach(function(k){o[k]=m[k];});return o;}
function u2nextPrime(p){var q=p+1;while(!u2isPrime(q))q++;return q;}
function u2expStr(base,n,d){
  var r=u2red(n,d);
  if(r[0]===0)return "\\(1\\)";
  if(r[1]===1){if(r[0]===1)return "\\("+base+"\\)";return "\\("+base+"^{"+r[0]+"}\\)";}
  return "\\("+base+"^{"+FR(r[0],r[1])+"}\\)";
}
/* ============ u3 algebra and rendering helpers ============ */
function u3GCD(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; }
function u3GCD3(a, b, c) { return u3GCD(u3GCD(a, b), c); }
function u3VarPart(ex, ey) {
  var s = "";
  if (ex > 0) s += "x" + (ex > 1 ? "^" + ex : "");
  if (ey > 0) s += "y" + (ey > 1 ? "^" + ey : "");
  return s;
}
function u3Body(c, ex, ey) {
  var vp = u3VarPart(ex, ey);
  return (vp && Math.abs(c) === 1) ? vp : Math.abs(c) + vp;
}
/* Render a list of terms [coeff, xPow, yPow], combining like terms and
   sorting by descending total degree. */
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
/* Render terms in the given order without combining (partial products). */
function u3StrSeq(list) {
  var parts = list.filter(function (t) { return t[0] !== 0; });
  if (!parts.length) return "0";
  return parts.map(function (t, i) {
    var b = u3Body(t[0], t[1], t[2]);
    if (i === 0) return (t[0] < 0 ? "-" : "") + b;
    return (t[0] < 0 ? " - " : " + ") + b;
  }).join("");
}
function u3TermsOf(coeffs, v) {
  return coeffs.map(function (c, i) { var p = coeffs.length - 1 - i; return v === "y" ? [c, 0, p] : [c, p, 0]; });
}
function u3PC(coeffs, v) { return u3Str(u3TermsOf(coeffs, v)); }
function u3Par(coeffs, v) { return "(" + u3PC(coeffs, v) + ")"; }
function u3Mul(P, Q) {
  var out = [];
  P.forEach(function (p) { Q.forEach(function (q) { out.push([p[0] * q[0], p[1] + q[1], p[2] + q[2]]); }); });
  return out;
}
function u3Conv(A, B) {
  var out = [], i;
  for (i = 0; i < A.length + B.length - 1; i++) out.push(0);
  A.forEach(function (a, j) { B.forEach(function (b, k) { out[j + k] += a * b; }); });
  return out;
}
function u3Alg(lines) { return "\\[ \\begin{aligned} " + lines.join(" \\\\ ") + " \\end{aligned} \\]"; }
function u3M(raw) { return "\\(" + raw + "\\)"; }
function u3PerturbCoeffs(coeffs) {
  var out = [], i, c2;
  for (i = 1; i < coeffs.length; i++) {
    if (coeffs[i] !== 0) { c2 = coeffs.slice(); c2[i] = -c2[i]; out.push(c2); }
    c2 = coeffs.slice(); c2[i] += 1; out.push(c2);
    c2 = coeffs.slice(); c2[i] -= 1; out.push(c2);
    c2 = coeffs.slice(); c2[i] += 2; out.push(c2);
    c2 = coeffs.slice(); c2[i] -= 2; out.push(c2);
  }
  c2 = coeffs.slice(); c2[0] += 1; out.push(c2);
  if (coeffs[0] > 1) { c2 = coeffs.slice(); c2[0] -= 1; out.push(c2); }
  if (coeffs.length > 2) { c2 = coeffs.slice(); var t = c2[1]; c2[1] = c2[2]; c2[2] = t; out.push(c2); }
  return out;
}
function u3DistrCoeffs(keyCoeffs, v, count) {
  var key = u3PC(keyCoeffs, v), seen = {}, out = [];
  shuffle(u3PerturbCoeffs(keyCoeffs)).forEach(function (c) {
    var s = u3PC(c, v);
    if (s !== key && !seen[s]) { seen[s] = 1; out.push(u3M(s)); }
  });
  var guard = 0;
  while (out.length < count && guard < 60) {
    guard++;
    var c2 = keyCoeffs.slice(), i = ri(1, keyCoeffs.length - 1);
    c2[i] += pick([-3, -2, -1, 1, 2, 3]);
    var s2 = u3PC(c2, v);
    if (s2 !== key && !seen[s2]) { seen[s2] = 1; out.push(u3M(s2)); }
  }
  return out.slice(0, count);
}
function u3FacRaw(gRaw, facs, v) {
  return (gRaw || "") + facs.map(function (f) { return u3Par(f, v); }).join("");
}
function u3FacExpand(facs) {
  var acc = [1];
  facs.forEach(function (f) { acc = u3Conv(acc, f); });
  return acc;
}
function u3SameArr(a, b) { return a.length === b.length && a.every(function (x, i) { return x === b[i]; }); }
/* Distractors for a factored form: perturb constants or swap them, and
   reject any candidate that expands to the same polynomial. */
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
function u3Nz(a, b) { var n = 0; while (n === 0) n = ri(a, b); return n; }
/* Factor pairs [p, q] with p <= q and p * q = m, in increasing p. */
function u3PairsOf(m) {
  var out = [];
  for (var p = 1; p * p <= m; p++) if (m % p === 0) out.push([p, m / p]);
  return out;
}
/* A value set as a sorted, deduplicated array, and its KaTeX raw
   rendering as a brace set, for the find-all-k entry. */
function u3SetArr(a) {
  var seen = {}, out = [];
  a.forEach(function (v) { if (!seen[v]) { seen[v] = 1; out.push(v); } });
  return out.sort(function (x, y) { return x - y; });
}
function u3SetRaw(a) { return "\\{" + u3SetArr(a).join(", ") + "\\}"; }

function u3PerturbTerms(terms) {
  var base = [];
  var map = {}, keys = [];
  terms.forEach(function (t) { var k = t[1] * 100 + t[2]; if (map[k] === undefined) { map[k] = [0, t[1], t[2]]; keys.push(k); } map[k][0] += t[0]; });
  keys.forEach(function (k) { if (map[k][0] !== 0) base.push(map[k]); });
  var out = [];
  base.forEach(function (t, i) {
    [function (c) { return -c; }, function (c) { return c + 1; }, function (c) { return c - 1; }, function (c) { return c + 2; }].forEach(function (f) {
      var nt = base.map(function (g) { return g.slice(); });
      nt[i][0] = f(nt[i][0]);
      out.push(u3Str(nt));
    });
    var dropped = base.filter(function (g, j) { return j !== i; });
    if (dropped.length) out.push(u3Str(dropped));
  });
  return out;
}

/* Tranche helpers, second block (November 15, 2026): the Math 1201
   Unit 7 helper family for the Cluster 1 borrows, plus balDp from
   math-1201/bank-u1.js (the decimal-place option balancer one of
   the Unit 7 entries calls). The u7 block is copied from
   math-1201/bank-u7.js: its helpers section whole, then the four
   later helpers (u7trim, u7ans1, u7slantAngle, u7riseRun) that sit
   between that file's entries. */
function balDp(keyStr,ds){
  function dpOf(s){var m=/^-?\d+(?:\.(\d+))?$/.exec(s);if(!m)return null;return m[1]?m[1].length:0;}
  function padTo(s,dp){var cur=dpOf(s);if(cur===null||dp<=cur)return s;if(s.indexOf(".")<0)return s+"."+Array(dp+1).join("0");return s+Array(dp-cur+1).join("0");}
  var all=[keyStr].concat(ds),dps=all.map(dpOf);
  if(dps.some(function(d){return d===null;}))return ds;
  function ok(list){var c={};list.forEach(function(d){c[d]=(c[d]||0)+1;});return Object.keys(c).every(function(k){return c[k]!==1;});}
  if(ok(dps))return ds;
  var cap=Math.max.apply(null,dps)+2,best=null,bestCost=1e9;
  for(var a=dps[1];a<=cap;a++)for(var b=dps[2];b<=cap;b++)for(var c2=dps[3];c2<=cap;c2++){
    var cand=[dps[0],a,b,c2];
    if(!ok(cand))continue;
    var cost=(a-dps[1])+(b-dps[2])+(c2-dps[3]);
    if(cost<bestCost){bestCost=cost;best=[a,b,c2];}
  }
  if(!best)return ds;
  return ds.map(function(s,i){return padTo(s,best[i]);});
}

function u7gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t;}return a||1;}
function u7red(n,d){var g=u7gcd(n,d);n/=g;d/=g;if(d<0){n=-n;d=-d;}return [n,d];}
function u7fracS(n,d){var r=u7red(n,d);if(r[1]===1)return ""+r[0];return FR(r[0],r[1]);}
function u7sinD(d){return Math.sin(d*Math.PI/180);}
function u7cosD(d){return Math.cos(d*Math.PI/180);}
function u7tanD(d){return Math.tan(d*Math.PI/180);}
function u7asinD(x){return Math.asin(x)*180/Math.PI;}
function u7acosD(x){return Math.acos(x)*180/Math.PI;}
function u7atanD(x){return Math.atan(x)*180/Math.PI;}
function u7r1(n){return Math.round(n*10)/10;}
function u7f1(n){return (Math.round(n*10)/10).toFixed(1);}
function u7f2(n){return (Math.round(n*100)/100).toFixed(2);}
function u7f4(n){return (Math.round(n*10000)/10000).toFixed(4);}
function u7pickS3(ans,cands){
  var out=[],seen={};seen[ans]=1;
  for(var i=0;i<cands.length&&out.length<3;i++){var c=cands[i];if(typeof c==="string"&&c!==ans&&!seen[c]){seen[c]=1;out.push(c);}}
  var k=2;while(out.length<3){var c2="\\("+(ans.length+k)+"\\)";k++;if(!seen[c2]){seen[c2]=1;out.push(c2);}}
  return out;
}
var U7_TRIPLES=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[6,8,10],[9,12,15],[20,21,29],[9,40,41],[12,35,37],[10,24,26],[12,16,20],[16,30,34]];
var U7_ANGLES=[25,28,30,32,35,38,40,42,45,48,50,52,55,58,60,62,65];
function u7names(){return pick([["A","B","C"],["D","E","F"],["G","H","J"],["K","L","M"],["M","N","P"],["P","Q","R"],["S","T","U"],["V","W","X"],["B","C","D"],["H","J","K"],["R","S","T"],["W","X","Y"],["C","D","E"],["F","G","H"],["J","K","L"],["N","P","Q"],["Q","R","S"],["T","U","V"],["X","Y","Z"],["D","F","G"],["E","G","H"],["L","M","N"],["P","R","S"],["U","V","W"],["A","C","E"],["B","D","F"],["H","K","M"],["K","M","P"],["M","P","R"],["R","T","V"]]);}
/* In a name set [X, Y, R], R is the right-angle vertex. */
function u7side(a,b){return a+b;}

/* ============ u7 scene figures: drawn from each question's own values ============ */
function u7figLine(x1,y1,x2,y2,w,dash){
  return '<line x1="'+fmt(x1,1)+'" y1="'+fmt(y1,1)+'" x2="'+fmt(x2,1)+'" y2="'+fmt(y2,1)+'" stroke="'+FIG_INK+'" stroke-width="'+(w||2)+'"'+(dash?' stroke-dasharray="5 4"':"")+'/>';
}
function u7figArc(E,r,u,hx){
  var sweep=(hx*u[1]>0)?1:0;
  return '<path d="M '+fmt(E[0]+r*hx,1)+' '+fmt(E[1],1)+' A '+r+' '+r+' 0 0 '+sweep+' '+fmt(E[0]+r*u[0],1)+' '+fmt(E[1]+r*u[1],1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
}
function u7figAngLab(E,r,u,hx,str){
  var bx=hx+u[0],by=u[1],bl=Math.sqrt(bx*bx+by*by)||1;
  return _txt(E[0]+(r+13)*bx/bl,E[1]+(r+13)*by/bl,str,12,false);
}
/* Elevation scene: a vertical object of height o.objH at o.objX (labelled
   o.objLabel), observers o.obs at ground positions with eye heights, each
   with sight lines to points on the object (sights: {y, ang}); o.base is
   an optional shorter building the observer stands on; o.ground lists
   labelled ground segments {x1, x2, label}. All geometry uses the
   question's own values; unknown lengths are labelled "?" by the caller. */
function u7elevSVG(o){
  var W=340,H=250,xs=[o.objX],mnx,mxx,span;
  o.obs.forEach(function(ob){xs.push(ob.x);});
  if(o.base)xs.push(o.base.x);
  mnx=Math.min.apply(null,xs);mxx=Math.max.apply(null,xs);span=Math.max(mxx-mnx,1);
  var dMin=mnx-span*0.16,dMax=mxx+span*0.16;
  if(o.base)dMin=Math.min(dMin,o.base.x-span*0.22);
  var pts=[[dMin,0],[dMax,0],[o.objX,o.objH]];
  o.obs.forEach(function(ob){pts.push([ob.x,ob.eye]);});
  if(o.base)pts.push([o.base.x,o.base.h]);
  var T=_fit(pts,W,H,40),out="";
  var G0=T([dMin,0]),G1=T([dMax,0]);
  out+=u7figLine(G0[0],G0[1],G1[0],G1[1],2);
  var OB=T([o.objX,0]),OT=T([o.objX,o.objH]);
  out+=u7figLine(OB[0],OB[1],OT[0],OT[1],2.4);
  var side=o.objLabelSide||(o.objX>=mxx?"left":"right");
  if(o.objLabel)out+=_txt(OT[0]+(side==="right"?12:-12),(OT[1]+OB[1])/2,o.objLabel,12.5,false,side==="right"?"start":"end");
  if(o.base){
    var BB=T([o.base.x,0]),BT=T([o.base.x,o.base.h]);
    out+=u7figLine(BB[0],BB[1],BT[0],BT[1],2.4);
    if(o.base.label)out+=_txt(BB[0]-10,(BB[1]+BT[1])/2,o.base.label,12,false,"end");
  }
  o.obs.forEach(function(ob){
    var Ep=T([ob.x,ob.eye]),hx=(o.objX>ob.x)?1:-1;
    var onBase=o.base&&ob.x===o.base.x;
    if(ob.eye>0&&!onBase){
      var PB=T([ob.x,0]);
      out+=u7figLine(PB[0],PB[1],Ep[0],Ep[1],1.6);
      if(ob.eyeLabel)out+=_txt(Ep[0]-8,(PB[1]+Ep[1])/2,ob.eyeLabel,11.5,false,"end");
    }
    out+='<circle cx="'+fmt(Ep[0],1)+'" cy="'+fmt(Ep[1],1)+'" r="2.6" fill="'+FIG_INK+'"/>';
    if(ob.sights&&ob.sights.length)out+=u7figLine(Ep[0],Ep[1],OT[0],Ep[1],1.4,true);
    (ob.sights||[]).forEach(function(s){
      var TT=T([o.objX,s.y]);
      out+=u7figLine(Ep[0],Ep[1],TT[0],TT[1],2);
      var u=_vnorm(_vsub(TT,Ep));
      out+=u7figArc(Ep,20,u,hx);
      if(s.ang)out+=u7figAngLab(Ep,20,u,hx,s.ang);
    });
  });
  (o.ground||[]).forEach(function(g){
    var A=T([g.x1,0]),B=T([g.x2,0]);
    out+=u7figLine(A[0],A[1]-4,A[0],A[1]+4,1.4)+u7figLine(B[0],B[1]-4,B[0],B[1]+4,1.4);
    if(g.label)out+=_txt((A[0]+B[0])/2,A[1]+16,g.label,12,false);
  });
  return '<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Elevation diagram">'+out+'</svg>';
}
/* Single right-triangle scene: a vertical member (wall, pole, mast) of
   height o.vert at ground distance o.ground from the foot, and a slanted
   member (ladder, wire, ramp, cable, string) of length o.slant joining
   the foot to the top of the vertical. o.wallH lets the vertical run
   higher than the slant top (a wall above a ladder's reach); o.sill
   marks a height on the vertical; o.dashedVert draws the vertical
   dashed (a kite's height line). */
function u7triSceneSVG(o){
  var W=340,H=250,wallH=(o.wallH===undefined||o.wallH===null)?o.vert:o.wallH;
  var T=_fit([[0,0],[o.ground,0],[o.ground,wallH],[o.ground,o.vert]],W,H,44);
  var F=T([0,0]),B=T([o.ground,0]),TP=T([o.ground,o.vert]),WT=T([o.ground,wallH]);
  var out=u7figLine(F[0]-22,F[1],B[0]+22,B[1],2);
  out+=u7figLine(B[0],B[1],WT[0],WT[1],2.4,o.dashedVert);
  out+=u7figLine(F[0],F[1],TP[0],TP[1],2);
  if(o.vertLabel)out+=_txt(B[0]-10,(B[1]+WT[1])/2,o.vertLabel,12,false,"end");
  if(o.groundLabel)out+=_txt((F[0]+B[0])/2,F[1]+16,o.groundLabel,12,false);
  if(o.slantLabel){
    var C=[(F[0]+B[0]+TP[0])/3,(F[1]+B[1]+TP[1])/3],M=[(F[0]+TP[0])/2,(F[1]+TP[1])/2],off=_sideOff(F,TP,C,15);
    out+=_txt(M[0]+off[0],M[1]+off[1],o.slantLabel,12,false);
  }
  if(o.angle){
    var u=_vnorm(_vsub(TP,F));
    out+=u7figArc(F,20,u,1)+u7figAngLab(F,20,u,1,o.angle);
  }
  if(o.sill){
    var sy=T([o.ground,o.sill.h])[1];
    out+=u7figLine(B[0]-11,sy,B[0],sy,2);
    out+=_txt(B[0]-15,sy,o.sill.label,12,false,"end");
  }
  return '<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Right triangle scene diagram">'+out+'</svg>';
}
/* Rectangle of width w and height h with its diagonal drawn; the sides
   are labelled with their lengths and the diagonal with "?". */
function u7rectDiagSVG(w,h){
  var W=320,H=235,T=_fit([[0,0],[w,0],[w,h],[0,h]],W,H,42);
  var P00=T([0,0]),P10=T([w,0]),P11=T([w,h]),P01=T([0,h]);
  var out=u7figLine(P00[0],P00[1],P10[0],P10[1],2)+u7figLine(P10[0],P10[1],P11[0],P11[1],2)+u7figLine(P11[0],P11[1],P01[0],P01[1],2)+u7figLine(P01[0],P01[1],P00[0],P00[1],2);
  out+=u7figLine(P00[0],P00[1],P11[0],P11[1],1.8);
  out+=_txt((P00[0]+P10[0])/2,P00[1]+16,w+" m",12,false);
  out+=_txt(P00[0]-11,(P00[1]+P01[1])/2,h+" m",12,false,"end");
  var M=[(P00[0]+P11[0])/2,(P00[1]+P11[1])/2],off=_sideOff(P00,P11,P10,14);
  out+=_txt(M[0]+off[0],M[1]+off[1],"?",12.5,false);
  return '<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rectangle with diagonal">'+out+'</svg>';
}
/* The 3-4-5 right triangle beside its scale factor 3 enlargement, for
   u7-ratio-similar: the side opposite the marked angle and the
   hypotenuse are labelled in both. */
function u7pairSVG(){
  function place(pts,ox,base,sc){return pts.map(function(p){return [ox+p[0]*sc,base-p[1]*sc];});}
  function drawTri(P,labA,labC){
    var out='<polygon points="'+P.map(function(p){return fmt(p[0],1)+","+fmt(p[1],1);}).join(" ")+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    var G=[(P[0][0]+P[1][0]+P[2][0])/3,(P[0][1]+P[1][1]+P[2][1])/3];
    var M=[(P[1][0]+P[2][0])/2,(P[1][1]+P[2][1])/2],off=_sideOff(P[1],P[2],G,14);
    out+=_txt(M[0]+off[0],M[1]+off[1],labA,12,false);
    out+=_txt((P[0][0]+P[1][0])/2,P[0][1]+15,labC,12,false);
    var u=_vnorm(_vsub(P[2],P[0]));
    out+=u7figArc(P[0],13,u,1);
    return out;
  }
  var P1=place(triLayout(4,3,5),26,172,15),P2=place(triLayout(12,9,15),168,172,10.5);
  return '<svg viewBox="0 0 340 200" width="340" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A right triangle and its enlargement by a scale factor of 3">'+drawTri(P1,"4 cm","5 cm")+drawTri(P2,"12 cm","15 cm")+'</svg>';
}

function u7trim(n){var r=Math.round(n*100)/100;return ""+r;}
function u7ans1(v){var a=u7f1(v),out=[a];if(a.slice(-2)===".0")out.push(a.slice(0,-2));return out;}
function u7slantAngle(kind){
  var scales,lo,hi,tries=0,D=null;
  if(kind==="rope"){scales=[0.5,1,1.5];lo=3;hi=9;}
  else if(kind==="slide"){scales=[0.5,1];lo=4;hi=11;}
  else if(kind==="zip"){scales=[1,1.5,2,2.5,3];lo=12;hi=45;}
  else{scales=[1,1.5,2,2.5,3];lo=18;hi=65;}
  do{
    tries++;
    var t=pick(U7_TRIPLES),k=pick(scales),hyp=t[2]*k,ground,height;
    if(pick([true,false])){ground=t[0]*k;height=t[1]*k;}else{ground=t[1]*k;height=t[0]*k;}
    D={hyp:hyp,ground:ground,height:height,ang:Math.round(u7atanD(height/ground))};
  }while((D.ang<20||D.ang>70||hyp<lo||hyp>hi)&&tries<120);
  var stem;
  if(kind==="rope")stem="A tent guy rope runs in a straight line from the top of a tent pole to a peg in level ground. The rope is \\("+u7trim(D.hyp)+"\\) m long, and the peg is \\("+u7trim(D.ground)+"\\) m from the base of the pole. Find the angle the rope makes with the ground, in degrees, to the nearest degree.";
  else if(kind==="slide")stem="A playground slide runs in a straight line from the top of a platform down to level ground. The slide is \\("+u7trim(D.hyp)+"\\) m long, and its foot is \\("+u7trim(D.ground)+"\\) m horizontally from the base of the platform. Find the angle the slide makes with the ground, in degrees, to the nearest degree.";
  else if(kind==="zip")stem="A zip line runs in a straight line from a launch platform to a landing point on level ground. The cable is \\("+u7trim(D.hyp)+"\\) m long, and the landing point is \\("+u7trim(D.ground)+"\\) m horizontally from the base of the platform. Find the angle the cable makes with the ground, in degrees, to the nearest degree.";
  else stem="A kite string is tied to a stake in level ground and pulled taut in a straight line to the kite. The string is \\("+u7trim(D.hyp)+"\\) m long, and the kite is \\("+u7trim(D.ground)+"\\) m horizontally from the stake. Find the angle of elevation of the string, in degrees, to the nearest degree.";
  var q=textq(stem,
    [""+D.ang,D.ang+"°",D.ang+" degrees"],
    "First find the height with the Pythagorean theorem, then use the tangent ratio with that height and the ground distance: \\[ \\begin{aligned} h^2 &= "+u7trim(D.hyp)+"^2 - "+u7trim(D.ground)+"^2 \\\\ h^2 &= "+u7trim(D.height*D.height)+" \\\\ h &= "+u7trim(D.height)+" \\\\ \\tan \\theta &= "+FR(u7trim(D.height),u7trim(D.ground))+" \\\\ \\theta &= \\tan^{-1}\\left("+FR(u7trim(D.height),u7trim(D.ground))+"\\right) \\\\ &\\approx "+D.ang+"^\\circ \\end{aligned} \\] The angle is <b>\\("+D.ang+"^\\circ\\)</b>.",
    {kind:kind,hyp:D.hyp,ground:D.ground,height:D.height,ang:D.ang});
  q.figure=u7triSceneSVG({vert:D.height,ground:D.ground,slant:D.hyp,vertLabel:"?",groundLabel:u7trim(D.ground)+" m",slantLabel:u7trim(D.hyp)+" m",dashedVert:kind==="kite"});
  return q;
}
function u7riseRun(kind){
  var h,theta;
  if(kind==="dock"){h=pick([1.0,1.1,1.2,1.3,1.4,1.5,1.6]);theta=pick([25,28,30,32,35]);}
  else if(kind==="belt"){h=pick([3.5,4,4.5,5,5.5,6,6.5,7,7.5,8]);theta=pick([25,28,30,32,35,38,40]);}
  else{h=pick([3.6,4.2,4.8,5.4,6.0]);theta=pick([28,30,32,35]);}
  var L=h/u7sinD(theta),run=L*u7cosD(theta),ans=u7r1(run);
  var stem;
  if(kind==="dock")stem="A loading ramp rises to a dock \\("+u7trim(h)+"\\) m above level ground. The ramp runs in a straight line and makes an angle of \\("+theta+"^\\circ\\) with the ground. How far, in metres, is the foot of the ramp from the base of the dock? Give your answer to the nearest tenth.";
  else if(kind==="belt")stem="A conveyor belt carries gravel in a straight line up to the top of a storage bin \\("+u7trim(h)+"\\) m above level ground. The belt makes an angle of \\("+theta+"^\\circ\\) with the ground. How far, in metres, is the foot of the belt from the point on the ground directly below the top of the bin? Give your answer to the nearest tenth.";
  else stem="An escalator rises \\("+u7trim(h)+"\\) m from one floor to the next, running in a straight line at an angle of \\("+theta+"^\\circ\\) to the horizontal. How far, in metres, does the escalator carry a passenger horizontally? Give your answer to the nearest tenth.";
  var q=textq(stem,u7ans1(ans),
    "The incline length comes first, from the sine ratio with the rise, rearranged; the horizontal distance then comes from that length and the cosine ratio: \\[ \\begin{aligned} \\sin "+theta+"^\\circ &= "+FR(u7trim(h),"L")+" \\\\ L &= "+FR(u7trim(h),"\\sin "+theta+"^\\circ")+" \\\\ &\\approx "+u7f1(L)+" \\\\ \\text{distance} &= "+u7f1(L)+" \\times \\cos "+theta+"^\\circ \\\\ &\\approx "+u7f1(ans)+" \\end{aligned} \\] The distance is <b>\\("+u7f1(ans)+"\\) m</b>.",
    {kind:kind,h:h,theta:theta,L:L,run:run,ans:ans});
  q.figure=u7triSceneSVG({vert:h,ground:run,slant:L,vertLabel:u7trim(h)+" m",groundLabel:"?",slantLabel:"?",angle:theta+"°"});
  return q;
}

/* Tranche helpers, third block (November 15, 2026): the Math 1201
   Unit 4 and Unit 5 helper families for the Cluster 2 and Cluster 6
   borrows, copied from math-1201/bank-u4.js and
   math-1201/bank-u5.js, each file's helpers section whole. */
function u4gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t;}return a||1;}
function u4num(n){var v=Math.round(n*100)/100;return ""+v;}
function u4pickS3(ans,cands){
  var out=[],seen={};seen[ans]=1;
  for(var i=0;i<cands.length&&out.length<3;i++){var c=cands[i];if(typeof c==="string"&&c!==ans&&!seen[c]){seen[c]=1;out.push(c);}}
  var pad=[" (one reading of the graph)"," (a second reading of the graph)"," (a third reading of the graph)"];
  var k=0;while(out.length<3){out.push(ans+pad[k]);k++;}
  return out;
}
function u4term(m){
  if(m===1)return "x"; if(m===-1)return "-x";
  return u4num(m)+"x";
}
function u4lin(m,b){
  var s=u4term(m);
  if(b>0)s+=" + "+b; else if(b<0)s+=" - "+Math.abs(b);
  return s;
}
function u4setS(arr){return "\\{"+arr.join(", ")+"\\}";}
function u4pairS(x,y){return "("+u4num(x)+", "+u4num(y)+")";}
function u4pairsS(pairs){return "\\{"+pairs.map(function(p){return u4pairS(p[0],p[1]);}).join(", ")+"\\}";}
function u4interval(v,lo,hi){return "\\("+lo+" \\le "+v+" \\le "+hi+"\\)";}
function u5gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t;}return a||1;}
function u5red(n,d){var g=u5gcd(n,d);n/=g;d/=g;if(d<0){n=-n;d=-d;}return [n,d];}
function u5fs(n,d){var r=u5red(n,d);if(r[1]===1)return ""+r[0];if(r[0]<0)return "-"+FR(-r[0],r[1]);return FR(r[0],r[1]);}
function u5coef(n,d,v){var r=u5red(n,d);if(r[0]===0)return "0";if(r[1]===1){if(r[0]===1)return v;if(r[0]===-1)return "-"+v;return r[0]+v;}return u5fs(r[0],r[1])+v;}
function u5ybRaw(mN,mD,b){var r=u5red(mN,mD);if(r[0]===0)return "y = "+b;var s="y = "+u5coef(r[0],r[1],"x");if(b>0)s+=" + "+b;else if(b<0)s+=" - "+(-b);return s;}
function u5ybOpt(mN,mD,b){return "\\("+u5ybRaw(mN,mD,b)+"\\)";}
function u5genRaw(A,B,C){
  var s=(A===1?"x":A===-1?"-x":A+"x");
  s+=(B<0?" - ":" + ")+(Math.abs(B)===1?"y":Math.abs(B)+"y");
  if(C>0)s+=" + "+C;else if(C<0)s+=" - "+(-C);
  return s+" = 0";
}
function u5genFromLine(mN,mD,b){ /* primitive general form of y = mx + b, A positive */
  var r=u5red(mN,mD),p=r[0],q=r[1];
  var A=Math.abs(p),B=(p>0?-q:q),C=(p>0?q*b:-q*b);
  if(p===0){A=0;B=1;C=-b;}
  return [A,B,C];
}
function u5pickS3(ans,cands){
  var out=[],seen={};seen[ans]=1;
  for(var i=0;i<cands.length&&out.length<3;i++){var c=cands[i];if(typeof c==="string"&&c!==ans&&!seen[c]){seen[c]=1;out.push(c);}}
  var k=0;while(out.length<3){k++;var c2=ans+" (form "+k+")";if(!seen[c2]){seen[c2]=1;out.push(c2);}}
  return out;
}
function u5pickD3(ans,cands){
  var out=[],seen={};seen[ans]=1;
  for(var i=0;i<cands.length&&out.length<3;i++){var c=cands[i];if(typeof c==="number"&&isFinite(c)&&c!==ans&&!seen[c]){seen[c]=1;out.push(c);}}
  var k=2;while(out.length<3){var c2=ans+k;k++;if(!seen[c2]){seen[c2]=1;out.push(c2);}}
  return out;
}
function u5slopes(){return [[1,2],[2,3],[3,2],[2,1],[3,1],[1,3],[4,3],[3,4],[5,2],[1,4],[5,4],[4,5],[-1,2],[-2,3],[-3,2],[-2,1],[-3,1],[-1,3],[-4,3],[-3,4],[-5,2],[-1,4],[-5,4],[-4,5]];}
function u5pickSlope(){return pick(u5slopes());}
function u5pt(x,y){return "("+x+", "+y+")";}
function u5minusTerm(v,val){return v+(val>=0?" - "+val:" + "+(-val));}
/* candidate equation options for a key line through work: tuples [mN,mD,b] */
function u5eqCands(keyT,candTs){
  var seen={},out=[];seen[keyT.join("/")]=1;
  for(var i=0;i<candTs.length&&out.length<3;i++){var r=u5red(candTs[i][0],candTs[i][1]);var t=[r[0],r[1],candTs[i][2]];var k=t.join("/");if(!seen[k]){seen[k]=1;out.push(u5ybOpt(t[0],t[1],t[2]));}}
  var d=2;while(out.length<3){out.push(u5ybOpt(keyT[0],keyT[1],keyT[2]+d));d++;}
  return out;
}


/* Tranche helpers, fourth block (November 15, 2026): the Math 1201
   Unit 1 measurement figure family (from math-1201/bank-helpers.js,
   copied whole) for the Cluster 6 surface area and volume borrows,
   and the Math 9 scale-figure helpers (u7T, u7Svg, u7Poly, u7Pts
   from math-9/bank-u6.js; solBarsFig, solSvg, solT from
   math-9/bank-helpers.js) for the Cluster 6 scale borrows. */
/* ---- Unit 1 measurement figures (added Nov 2026) ----
   Inline SVG diagrams for the Unit 1 entries, drawn inside each
   generator from that question's own values (the same locals the
   stem and solution use), so a figure always matches its question.
   Unknown lengths are labelled "?" and never with the answer.
   Solids of revolution are drawn as labelled profiles or standard
   outline views; prisms and pyramids use an oblique view so all
   three dimensions can be labelled. Helper prefix: u1fig. */
function u1figLine(x1,y1,x2,y2,w,dash){
  return '<line x1="'+fmt(x1,1)+'" y1="'+fmt(y1,1)+'" x2="'+fmt(x2,1)+'" y2="'+fmt(y2,1)+'" stroke="'+FIG_INK+'" stroke-width="'+(w||2)+'"'+(dash?' stroke-dasharray="5 4"':"")+'/>';
}
function u1figSvg(W,H,body,label){
  return '<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+label+'">'+body+'</svg>';
}
/* Rectangle with width and height labels (the garden perimeter). */
function u1figRect(w,h,wLab,hLab){
  var W=330,H=215,T=_fit([[0,0],[w,0],[w,h],[0,h]],W,H,52);
  var P00=T([0,0]),P10=T([w,0]),P11=T([w,h]),P01=T([0,h]);
  var out=u1figLine(P00[0],P00[1],P10[0],P10[1],2)+u1figLine(P10[0],P10[1],P11[0],P11[1],2)+u1figLine(P11[0],P11[1],P01[0],P01[1],2)+u1figLine(P01[0],P01[1],P00[0],P00[1],2);
  out+=_txt((P00[0]+P10[0])/2,P00[1]+16,wLab,12,false);
  out+=_txt(P00[0]-10,(P00[1]+P01[1])/2,hLab,12,false,"end");
  return u1figSvg(W,H,out,"Rectangle diagram");
}
/* Circle measured with a tape wrap: the dashed outer circle is the
   tape, cLab is the circumference reading, and the diameter (kind
   "d") or radius (kind "r") line carries the unknown "?". */
function u1figCirc(cLab,kind){
  var W=330,H=215,cx=165,cy=112,R=64,out="";
  out+='<circle cx="'+cx+'" cy="'+cy+'" r="'+(R+11)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.3" stroke-dasharray="5 4"/>';
  out+='<circle cx="'+cx+'" cy="'+cy+'" r="'+R+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+=_txt(cx,cy-R-26,cLab,12.5,false);
  if(kind==="d"){
    out+=u1figLine(cx-R,cy,cx+R,cy,1.6,true);
    out+=_txt(cx,cy-11,"?",13,false);
  }else{
    out+=u1figLine(cx,cy,cx+R,cy,1.6,true);
    out+=_txt(cx+R/2,cy-11,"?",13,false);
  }
  return u1figSvg(W,H,out,"Circle with tape measure around it");
}
/* Closed cylinder, drawn to the proportions of r and h. Either
   label may be null; an unknown dimension is passed as "?". */
function u1figCyl(r,h,rLab,hLab){
  var W=330,H=215,s=Math.min((W-130)/(2*r),(H-76)/h);
  if(!(s>0))s=10;
  var rx=r*s,ry=Math.max(4,rx*0.30),bh=h*s,cx=148,topY=(H-bh)/2,botY=topY+bh,out="";
  out+='<ellipse cx="'+fmt(cx,1)+'" cy="'+fmt(topY,1)+'" rx="'+fmt(rx,1)+'" ry="'+fmt(ry,1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+=u1figLine(cx-rx,topY,cx-rx,botY,2)+u1figLine(cx+rx,topY,cx+rx,botY,2);
  out+='<path d="M '+fmt(cx-rx,1)+' '+fmt(botY,1)+' Q '+fmt(cx,1)+' '+fmt(botY+2*ry,1)+' '+fmt(cx+rx,1)+' '+fmt(botY,1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<path d="M '+fmt(cx-rx,1)+' '+fmt(botY,1)+' Q '+fmt(cx,1)+' '+fmt(botY-2*ry,1)+' '+fmt(cx+rx,1)+' '+fmt(botY,1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.3" stroke-dasharray="4 3"/>';
  if(rLab){
    var ex=cx+rx*0.707,ey=topY+ry*0.707;
    out+=u1figLine(cx,topY,ex,ey,1.6);
    out+=_txt((cx+ex)/2+7,(topY+ey)/2-9,rLab,12,false);
  }
  if(hLab){
    var dx=cx+rx+15;
    out+=u1figLine(dx,topY,dx,botY,1.3)+u1figLine(dx-4,topY,dx+4,topY,1.3)+u1figLine(dx-4,botY,dx+4,botY,1.3);
    out+=_txt(dx+8,(topY+botY)/2,hLab,12,false,"start");
  }
  return u1figSvg(W,H,out,"Cylinder diagram");
}
/* Cone, drawn to the proportions of r and its vertical height vh.
   o carries the labels to show: rLab on the base radius, hLab on
   the dashed centre height, lLab on the right slant edge. */
function u1figCone(r,vh,o){
  o=o||{};
  var W=330,H=215,s=Math.min((W-140)/(2*r),(H-96)/Math.max(vh,0.001));
  if(!(s>0))s=10;
  var rx=r*s,bh=vh*s,cx=148,topY=(H-bh)/2-4,baseY=topY+bh,ry=Math.max(4,rx*0.28),out="";
  out+=u1figLine(cx,topY,cx-rx,baseY,2)+u1figLine(cx,topY,cx+rx,baseY,2);
  out+='<path d="M '+fmt(cx-rx,1)+' '+fmt(baseY,1)+' Q '+fmt(cx,1)+' '+fmt(baseY+2*ry,1)+' '+fmt(cx+rx,1)+' '+fmt(baseY,1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<path d="M '+fmt(cx-rx,1)+' '+fmt(baseY,1)+' Q '+fmt(cx,1)+' '+fmt(baseY-2*ry,1)+' '+fmt(cx+rx,1)+' '+fmt(baseY,1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.2" stroke-dasharray="4 3"/>';
  if(o.hLab){
    out+=u1figLine(cx,topY,cx,baseY,1.4,true);
    out+=_txt(cx-8,(topY+baseY)/2,o.hLab,12,false,"end");
  }
  if(o.rLab){
    out+=u1figLine(cx,baseY,cx+rx,baseY,1.6);
    out+=_txt(cx+rx/2,baseY+ry+13,o.rLab,12,false);
  }
  if(o.lLab){
    out+=_txt(cx+rx/2+15,(topY+baseY)/2,o.lLab,12,false);
  }
  return u1figSvg(W,H,out,"Cone diagram");
}
/* Rectangular prism in oblique view: front face a by c, depth b.
   Any label may be null; an unknown dimension is passed as "?". */
function u1figPrism(a,b,c,aLab,bLab,cLab){
  var W=330,H=215,dxu=0.55,dyu=0.38;
  var s=Math.min((W-120)/(a+b*dxu),(H-84)/(c+b*dyu));
  if(!(s>0))s=10;
  var fw=a*s,fh=c*s,dx=b*s*dxu,dy=-b*s*dyu;
  var x0=(W-fw-dx)/2-14,yT=(H-fh-dy)/2,yB=yT+fh,out="";
  var FBL=[x0,yB],FBR=[x0+fw,yB],FTR=[x0+fw,yT],FTL=[x0,yT];
  var BBL=[x0+dx,yB+dy],BBR=[x0+fw+dx,yB+dy],BTR=[x0+fw+dx,yT+dy],BTL=[x0+dx,yT+dy];
  out+=u1figLine(BTL[0],BTL[1],BTR[0],BTR[1],1.6)+u1figLine(BTR[0],BTR[1],BBR[0],BBR[1],1.6);
  out+=u1figLine(BBL[0],BBL[1],BBR[0],BBR[1],1.4,true)+u1figLine(BBL[0],BBL[1],BTL[0],BTL[1],1.4,true);
  out+=u1figLine(FBL[0],FBL[1],FBR[0],FBR[1],2)+u1figLine(FBR[0],FBR[1],FTR[0],FTR[1],2)+u1figLine(FTR[0],FTR[1],FTL[0],FTL[1],2)+u1figLine(FTL[0],FTL[1],FBL[0],FBL[1],2);
  out+=u1figLine(FBR[0],FBR[1],BBR[0],BBR[1],1.8)+u1figLine(FTR[0],FTR[1],BTR[0],BTR[1],1.8)+u1figLine(FTL[0],FTL[1],BTL[0],BTL[1],1.8);
  out+=u1figLine(FBL[0],FBL[1],BBL[0],BBL[1],1.4,true);
  if(aLab)out+=_txt(x0+fw/2,yB+17,aLab,12,false);
  if(cLab)out+=_txt(x0-9,(yT+yB)/2,cLab,12,false,"end");
  if(bLab)out+=_txt((FBR[0]+BBR[0])/2+5,(FBR[1]+BBR[1])/2+14,bLab,12,false);
  return u1figSvg(W,H,out,"Rectangular prism diagram");
}
/* Triangular prism: triangular end with base tb and height th,
   extruded by the length L in an oblique view. */
function u1figTriPrism(tb,th,L,tbLab,thLab,LLab){
  var W=330,H=215,dxu=0.55,dyu=0.38;
  var s=Math.min((W-120)/(tb+L*dxu),(H-84)/(th+L*dyu));
  if(!(s>0))s=10;
  var fw=tb*s,fh=th*s,dx=L*s*dxu,dy=-L*s*dyu;
  var x0=(W-fw-dx)/2-14,yB=(H-fh-dy)/2+fh,yT=yB-fh,out="";
  var FBL=[x0,yB],FBR=[x0+fw,yB],FA=[x0+fw/2,yT];
  var BBL=[x0+dx,yB+dy],BBR=[x0+fw+dx,yB+dy],BA=[x0+fw/2+dx,yT+dy];
  out+=u1figLine(BBL[0],BBL[1],BBR[0],BBR[1],1.4,true)+u1figLine(BBR[0],BBR[1],BA[0],BA[1],1.6)+u1figLine(BA[0],BA[1],BBL[0],BBL[1],1.4,true);
  out+=u1figLine(FBL[0],FBL[1],FBR[0],FBR[1],2)+u1figLine(FBR[0],FBR[1],FA[0],FA[1],2)+u1figLine(FA[0],FA[1],FBL[0],FBL[1],2);
  out+=u1figLine(FBR[0],FBR[1],BBR[0],BBR[1],1.8)+u1figLine(FA[0],FA[1],BA[0],BA[1],1.8);
  out+=u1figLine(FBL[0],FBL[1],BBL[0],BBL[1],1.4,true);
  if(thLab){
    out+=u1figLine(FA[0],FA[1],FA[0],yB,1.4,true);
    out+=_txt(FA[0]-8,(yT+yB)/2,thLab,12,false,"end");
  }
  if(tbLab)out+=_txt(x0+fw/2,yB+17,tbLab,12,false);
  if(LLab)out+=_txt((FBR[0]+BBR[0])/2+5,(FBR[1]+BBR[1])/2+14,LLab,12,false);
  return u1figSvg(W,H,out,"Triangular prism diagram");
}
/* Square pyramid in oblique view: base side bs, vertical height
   vh. o.sLab labels the front base edge; o.hLab labels the dashed
   centre height; o.lLab labels the dashed slant height drawn to
   the midpoint of the front base edge. */
function u1figPyr(bs,vh,o){
  o=o||{};
  var W=330,H=215,dxu=0.5,dyu=0.34;
  var sc=Math.min((W-120)/(bs+bs*dxu),(H-88)/(vh+bs*dyu));
  if(!(sc>0))sc=10;
  var fw=bs*sc,dx=bs*sc*dxu,dy=-bs*sc*dyu,hh=vh*sc;
  var totH=hh-dy/2,x0=(W-fw-dx)/2-12,yB=(H+totH)/2,yC=yB+dy/2;
  var FL=[x0,yB],FR=[x0+fw,yB],BR=[x0+fw+dx,yB+dy],BL=[x0+dx,yB+dy];
  var AP=[x0+fw/2+dx/2,yC-hh],out="";
  out+=u1figLine(BL[0],BL[1],BR[0],BR[1],1.4,true)+u1figLine(FL[0],FL[1],BL[0],BL[1],1.4,true);
  out+=u1figLine(FL[0],FL[1],FR[0],FR[1],2)+u1figLine(FR[0],FR[1],BR[0],BR[1],1.8);
  out+=u1figLine(AP[0],AP[1],FL[0],FL[1],2)+u1figLine(AP[0],AP[1],FR[0],FR[1],2)+u1figLine(AP[0],AP[1],BR[0],BR[1],1.8);
  out+=u1figLine(AP[0],AP[1],BL[0],BL[1],1.4,true);
  if(o.hLab){
    out+=u1figLine(AP[0],AP[1],AP[0],yC,1.4,true);
    out+=_txt(AP[0]+9,(AP[1]+yC)/2,o.hLab,12,false,"start");
  }
  if(o.lLab){
    var MF=[x0+fw/2,yB];
    out+=u1figLine(AP[0],AP[1],MF[0],MF[1],1.4,true);
    out+=_txt((AP[0]+MF[0])/2+14,(AP[1]+MF[1])/2,o.lLab,12,false);
  }
  if(o.sLab)out+=_txt(x0+fw/2,yB+17,o.sLab,12,false);
  return u1figSvg(W,H,out,"Square pyramid diagram");
}
/* Sphere: a diameter line when dLab is given, otherwise a radius
   line when rLab is given. An unknown is passed as "?". */
function u1figSphere(rLab,dLab){
  var W=330,H=215,cx=165,cy=107,R=76,out="";
  out+='<circle cx="'+cx+'" cy="'+cy+'" r="'+R+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  if(dLab){
    out+=u1figLine(cx-R,cy,cx+R,cy,1.6);
    out+=_txt(cx,cy-11,dLab,12,false);
  }else if(rLab){
    var ex=cx+R*0.707,ey=cy-R*0.707;
    out+=u1figLine(cx,cy,ex,ey,1.6);
    out+=_txt((cx+ex)/2+3,(cy+ey)/2-10,rLab,12,false);
  }
  return u1figSvg(W,H,out,"Sphere diagram");
}
/* Silo profile: cylinder of radius r and height h with a
   hemispherical top of the same radius (volume and painted area
   composites share this outline). */
function u1figSilo(r,h,rLab,hLab){
  var W=330,H=215,s=Math.min((W-130)/(2*r),(H-72)/(h+r));
  if(!(s>0))s=10;
  var rx=r*s,ch=h*s,cx=148,baseY=(H+ch+rx)/2,topY=baseY-ch,out="";
  out+=u1figLine(cx-rx,baseY,cx-rx,topY,2)+u1figLine(cx+rx,baseY,cx+rx,topY,2)+u1figLine(cx-rx,baseY,cx+rx,baseY,2);
  out+='<path d="M '+fmt(cx-rx,1)+' '+fmt(topY,1)+' A '+fmt(rx,1)+' '+fmt(rx,1)+' 0 0 1 '+fmt(cx+rx,1)+' '+fmt(topY,1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  if(rLab){
    out+=u1figLine(cx,topY,cx+rx,topY,1.6);
    out+=_txt(cx+rx/2,topY+13,rLab,12,false);
  }
  if(hLab){
    var dx=cx+rx+15;
    out+=u1figLine(dx,topY,dx,baseY,1.3)+u1figLine(dx-4,topY,dx+4,topY,1.3)+u1figLine(dx-4,baseY,dx+4,baseY,1.3);
    out+=_txt(dx+8,(topY+baseY)/2,hLab,12,false,"start");
  }
  return u1figSvg(W,H,out,"Silo diagram: cylinder with hemispherical top");
}
/* Treat profile: cone of radius r and height h with a
   hemispherical scoop of the same radius on top. */
function u1figTreat(r,h,rLab,hLab){
  var W=330,H=215,s=Math.min((W-130)/(2*r),(H-72)/(h+r));
  if(!(s>0))s=10;
  var rx=r*s,ch=h*s,cx=148,jy=(H-ch-rx)/2+rx,apexY=jy+ch,out="";
  out+='<path d="M '+fmt(cx-rx,1)+' '+fmt(jy,1)+' A '+fmt(rx,1)+' '+fmt(rx,1)+' 0 0 1 '+fmt(cx+rx,1)+' '+fmt(jy,1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+=u1figLine(cx-rx,jy,cx,apexY,2)+u1figLine(cx+rx,jy,cx,apexY,2);
  if(rLab){
    out+=u1figLine(cx,jy,cx+rx,jy,1.6);
    out+=_txt(cx+rx/2,jy+13,rLab,12,false);
  }
  if(hLab){
    var dx=cx+rx+15;
    out+=u1figLine(dx,jy,dx,apexY,1.3)+u1figLine(dx-4,jy,dx+4,jy,1.3)+u1figLine(dx-4,apexY,dx+4,apexY,1.3);
    out+=_txt(dx+8,(jy+apexY)/2,hLab,12,false,"start");
  }
  return u1figSvg(W,H,out,"Cone with hemispherical scoop diagram");
}
/* Tower profile: cylinder of radius r and height h with a cone
   roof of the same radius and slant height l. */
function u1figTower(r,h,l,rLab,hLab,lLab){
  var vh=Math.sqrt(Math.max(l*l-r*r,0.25));
  var W=330,H=215,s=Math.min((W-140)/(2*r),(H-76)/(h+vh));
  if(!(s>0))s=10;
  var rx=r*s,ch=h*s,rh=vh*s,cx=146,baseY=(H+ch+rh)/2,topY=baseY-ch,apexY=topY-rh,out="";
  out+=u1figLine(cx-rx,baseY,cx-rx,topY,2)+u1figLine(cx+rx,baseY,cx+rx,topY,2)+u1figLine(cx-rx,baseY,cx+rx,baseY,2);
  out+=u1figLine(cx-rx,topY,cx,apexY,2)+u1figLine(cx,apexY,cx+rx,topY,2);
  if(rLab){
    out+=u1figLine(cx,topY,cx+rx,topY,1.6);
    out+=_txt(cx+rx/2,topY+13,rLab,12,false);
  }
  if(hLab){
    var dx=cx+rx+15;
    out+=u1figLine(dx,topY,dx,baseY,1.3)+u1figLine(dx-4,topY,dx+4,topY,1.3)+u1figLine(dx-4,baseY,dx+4,baseY,1.3);
    out+=_txt(dx+8,(topY+baseY)/2,hLab,12,false,"start");
  }
  if(lLab)out+=_txt(cx+rx/2+15,(apexY+topY)/2,lLab,12,false);
  return u1figSvg(W,H,out,"Cylinder with cone roof diagram");
}
/* Cylindrical block of radius r and height H with a cone hole of
   the same radius and height hc removed: the hole is dashed. */
function u1figBlock(r,H,hc,rLab,HLab,hcLab){
  var W=330,Hh=215,s=Math.min((W-140)/(2*r),(Hh-76)/H);
  if(!(s>0))s=10;
  var rx=r*s,ry=Math.max(4,rx*0.30),bh=H*s,cx=146,topY=(Hh-bh)/2,botY=topY+bh,out="";
  out+='<ellipse cx="'+fmt(cx,1)+'" cy="'+fmt(topY,1)+'" rx="'+fmt(rx,1)+'" ry="'+fmt(ry,1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+=u1figLine(cx-rx,topY,cx-rx,botY,2)+u1figLine(cx+rx,topY,cx+rx,botY,2);
  out+='<path d="M '+fmt(cx-rx,1)+' '+fmt(botY,1)+' Q '+fmt(cx,1)+' '+fmt(botY+2*ry,1)+' '+fmt(cx+rx,1)+' '+fmt(botY,1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  var ay=topY+hc*s;
  out+=u1figLine(cx-rx,topY,cx,ay,1.5,true)+u1figLine(cx+rx,topY,cx,ay,1.5,true)+u1figLine(cx,topY,cx,ay,1.3,true);
  if(rLab){
    var ex=cx+rx*0.707,ey=topY+ry*0.707;
    out+=u1figLine(cx,topY,ex,ey,1.6);
    out+=_txt((cx+ex)/2+7,(topY+ey)/2-9,rLab,12,false);
  }
  if(hcLab)out+=_txt(cx+8,(topY+ay)/2,hcLab,11.5,false,"start");
  if(HLab){
    var dx=cx+rx+15;
    out+=u1figLine(dx,topY,dx,botY,1.3)+u1figLine(dx-4,topY,dx+4,topY,1.3)+u1figLine(dx-4,botY,dx+4,botY,1.3);
    out+=_txt(dx+8,(topY+botY)/2,HLab,12,false,"start");
  }
  return u1figSvg(W,Hh,out,"Cylinder with a cone hole removed");
}
/* House form: rectangular prism (front a, depth b, height hp)
   with a pyramid roof of height hq. o.lLab, when given, labels
   the dashed slant height to the midpoint of the front top edge
   instead of the dashed centre height o.hqLab. */
function u1figHouse(a,b,hp,hq,o){
  o=o||{};
  var W=330,H=215,dxu=0.55,dyu=0.38;
  var s=Math.min((W-120)/(a+b*dxu),(H-88)/(hp+hq+b*dyu));
  if(!(s>0))s=10;
  var fw=a*s,fh=hp*s,dx=b*s*dxu,dy=-b*s*dyu,rh=hq*s;
  var x0=(W-fw-dx)/2-14,yB=(H+fh+rh-dy)/2,yT=yB-fh,out="";
  var FBL=[x0,yB],FBR=[x0+fw,yB],FTR=[x0+fw,yT],FTL=[x0,yT];
  var BBL=[x0+dx,yB+dy],BBR=[x0+fw+dx,yB+dy],BTR=[x0+fw+dx,yT+dy],BTL=[x0+dx,yT+dy];
  var C=[x0+fw/2+dx/2,yT+dy/2],AP=[C[0],C[1]-rh];
  out+=u1figLine(BTL[0],BTL[1],BTR[0],BTR[1],1.6)+u1figLine(BTR[0],BTR[1],BBR[0],BBR[1],1.6);
  out+=u1figLine(BBL[0],BBL[1],BBR[0],BBR[1],1.4,true)+u1figLine(BBL[0],BBL[1],BTL[0],BTL[1],1.4,true);
  out+=u1figLine(FBL[0],FBL[1],FBR[0],FBR[1],2)+u1figLine(FBR[0],FBR[1],FTR[0],FTR[1],2)+u1figLine(FTR[0],FTR[1],FTL[0],FTL[1],2)+u1figLine(FTL[0],FTL[1],FBL[0],FBL[1],2);
  out+=u1figLine(FBR[0],FBR[1],BBR[0],BBR[1],1.8)+u1figLine(FTR[0],FTR[1],BTR[0],BTR[1],1.8)+u1figLine(FTL[0],FTL[1],BTL[0],BTL[1],1.8);
  out+=u1figLine(FBL[0],FBL[1],BBL[0],BBL[1],1.4,true);
  out+=u1figLine(AP[0],AP[1],FTL[0],FTL[1],2)+u1figLine(AP[0],AP[1],FTR[0],FTR[1],2)+u1figLine(AP[0],AP[1],BTR[0],BTR[1],1.8);
  out+=u1figLine(AP[0],AP[1],BTL[0],BTL[1],1.4,true);
  if(o.hqLab){
    out+=u1figLine(AP[0],AP[1],C[0],C[1],1.4,true);
    out+=_txt(AP[0]+9,(AP[1]+C[1])/2,o.hqLab,12,false,"start");
  }
  if(o.lLab){
    var MF=[x0+fw/2,yT];
    out+=u1figLine(AP[0],AP[1],MF[0],MF[1],1.4,true);
    out+=_txt((AP[0]+MF[0])/2+14,(AP[1]+MF[1])/2,o.lLab,12,false);
  }
  if(o.aLab)out+=_txt(x0+fw/2,yB+17,o.aLab,12,false);
  if(o.hpLab)out+=_txt(x0-9,(yT+yB)/2,o.hpLab,12,false,"end");
  if(o.bLab)out+=_txt((FBR[0]+BBR[0])/2+5,(FBR[1]+BBR[1])/2+14,o.bLab,12,false);
  return u1figSvg(W,H,out,"Prism with pyramid roof diagram");
}
/* Two solids side by side with the same base width and the same
   height, for the one-third volume relation. Types are "cyl",
   "cone", "prism" and "pyr"; the labels are the volumes, with
   "?" on the solid whose volume is asked for. */
function u1figPair(tL,tR,labL,labR){
  function shape(t,ox){
    var cx=ox+60,base=148,w=76,hgt=84,hw=w/2,out="";
    if(t==="cyl"){
      var top=base-hgt,ry=10;
      out+='<ellipse cx="'+cx+'" cy="'+top+'" rx="'+hw+'" ry="'+ry+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
      out+=u1figLine(cx-hw,top,cx-hw,base,2)+u1figLine(cx+hw,top,cx+hw,base,2);
      out+='<path d="M '+fmt(cx-hw,1)+' '+base+' Q '+cx+' '+fmt(base+2*ry,1)+' '+fmt(cx+hw,1)+' '+base+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    }else if(t==="cone"){
      var top2=base-hgt,ry2=9;
      out+=u1figLine(cx,top2,cx-hw,base,2)+u1figLine(cx,top2,cx+hw,base,2);
      out+='<path d="M '+fmt(cx-hw,1)+' '+base+' Q '+cx+' '+fmt(base+2*ry2,1)+' '+fmt(cx+hw,1)+' '+base+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    }else if(t==="prism"){
      var dx=14,dy=-10,top3=base-hgt,x0=cx-hw+dx/2;
      out+=u1figLine(x0+dx,top3+dy,x0+w-dx+dx,top3+dy,1.6);
      out+=u1figLine(x0,top3,x0+w-dx,top3,2)+u1figLine(x0+w-dx,top3,x0+w-dx,base,2)+u1figLine(x0+w-dx,base,x0,base,2)+u1figLine(x0,base,x0,top3,2);
      out+=u1figLine(x0+w-dx,top3,x0+w-dx+dx,top3+dy,1.8)+u1figLine(x0,top3,x0+dx,top3+dy,1.8);
    }else{
      var dx2=14,dy2=-10,yB=base,xL=cx-hw+dx2/2,apx=cx+dx2/2,apy=base-hgt-dy2;
      out+=u1figLine(xL,yB,xL+w-dx2,yB,2)+u1figLine(xL+w-dx2,yB,xL+w-dx2+dx2,yB+dy2,1.8)+u1figLine(xL,yB,xL+dx2,yB+dy2,1.6);
      out+=u1figLine(apx,apy,xL,yB,2)+u1figLine(apx,apy,xL+w-dx2,yB,2)+u1figLine(apx,apy,xL+w-dx2+dx2,yB+dy2,1.8);
    }
    return out;
  }
  var body=shape(tL,28)+shape(tR,182);
  body+=_txt(88,178,labL,12,false)+_txt(242,178,labR,12,false);
  return u1figSvg(330,200,body,"Two solids with the same base and height");
}
/* Instrument scale: a ruler band from o.min to o.max with major
   ticks labelled and o.minorPer minor ticks per major step, and
   a measured strip drawn from o.from to o.to above the band.
   Values are the scale positions in o.unit. */
function u1figRuler(o){
  var W=330,H=112,pad=28,y0=56,y1=84;
  function X(v){return pad+(v-o.min)/(o.max-o.min)*(W-2*pad);}
  var out='<rect x="'+pad+'" y="'+y0+'" width="'+(W-2*pad)+'" height="'+(y1-y0)+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  var step=o.major/o.minorPer,N=Math.round((o.max-o.min)/step);
  for(var n=0;n<=N;n++){
    var v=o.min+n*step,maj=(n%o.minorPer===0),x=X(v);
    out+=u1figLine(x,y0,x,y0+(maj?13:7),maj?1.6:1.1);
    if(maj)out+=_txt(x,y1+14,fmt(v),11,false);
  }
  out+='<rect x="'+fmt(X(o.from),1)+'" y="24" width="'+fmt(X(o.to)-X(o.from),1)+'" height="9" fill="'+FIG_ACC+'"/>';
  out+=u1figLine(X(o.from),24,X(o.from),y0,1.2,true)+u1figLine(X(o.to),24,X(o.to),y0,1.2,true);
  out+=_txt(W-pad,13,o.unit,11.5,false,"end");
  return u1figSvg(W,H,out,"Ruler scale diagram");
}
function u7T(x, y, str, size, bold, anchor) {
  return '<text x="' + fmt(x, 1) + '" y="' + fmt(y, 1) + '" font-size="' + (size || 13) + '" fill="' + FIG_INK + '" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="' + (anchor || "middle") + '" dominant-baseline="central"' + (bold ? ' font-weight="bold"' : "") + '>' + str + '</text>';
}
function u7Svg(W, H, body, aria) {
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + aria + '">' + body + '</svg>';
}
function u7Poly(pts, fill, dash) {
  return '<polygon points="' + u7Pts(pts) + '" fill="' + (fill || "none") + '" stroke="' + FIG_INK + '" stroke-width="2"' + (dash ? ' stroke-dasharray="6 4"' : "") + '/>';
}
function u7Pts(pts) { return pts.map(function (p) { return fmt(p[0], 1) + "," + fmt(p[1], 1); }).join(" "); }
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
function solSvg(W, H, body, aria) {
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + aria + '">' + body + '</svg>';
}
function solT(x, y, str, size, bold) {
  return '<text x="' + fmt(x, 1) + '" y="' + fmt(y, 1) + '" font-size="' + (size || 12) + '" fill="' + FIG_INK + '" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="middle" dominant-baseline="central"' + (bold ? ' font-weight="bold"' : "") + '>' + str + '</text>';
}
function u1r1(n){return Math.round(n*10)/10;}
function u1r2(n){return Math.round(n*100)/100;}
function u1setOk(a){return (new Set(a.map(function(x){return String(x);})).size===a.length);}

/* Tranche helpers, fifth block (November 15, 2026): u6lin and
   u6stageFig from math-9/bank-u5.js, called by the Cluster 7
   pattern borrows from math-9/bank-u6.js. */
function u6lin(m, b, v) {
  var head = (m === 1 ? v : fmt(m) + v);
  if (b > 0) return head + " + " + fmt(b);
  if (b < 0) return head + " - " + fmt(-b);
  return head;
}
function u6stageFig(counts, item) {
  var sq = 15, gap = 3, per = 8, pad = 12, seg = 26;
  var widths = counts.map(function (c) { var cols = Math.min(per, c); return cols * (sq + gap) - gap; });
  var maxRows = 1;
  counts.forEach(function (c) { var r = Math.ceil(c / per); if (r > maxRows) maxRows = r; });
  var totW = pad * 2 + seg * (counts.length - 1);
  widths.forEach(function (w) { totW += w; });
  var H = 22 + (maxRows * (sq + gap) - gap) + 26;
  var s = '<svg xmlns="http://www.w3.org/2000/svg" width="' + totW + '" height="' + H + '" viewBox="0 0 ' + totW + ' ' + H + '" role="img" aria-label="First three stages of a growing pattern">';
  var cx = pad;
  counts.forEach(function (c, i) {
    var w = widths[i], mid = fmt(cx + w / 2, 1);
    s += '<text x="' + mid + '" y="12" font-size="12" font-weight="bold" fill="' + FIG_INK + '" text-anchor="middle">Stage ' + (i + 1) + '</text>';
    for (var k = 0; k < c; k++) {
      var col = k % per, row = Math.floor(k / per);
      s += '<rect x="' + (cx + col * (sq + gap)) + '" y="' + (22 + row * (sq + gap)) + '" width="' + sq + '" height="' + sq + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="1.2"/>';
    }
    s += '<text x="' + mid + '" y="' + (H - 6) + '" font-size="12" fill="' + FIG_INK + '" text-anchor="middle">' + c + ' ' + item + '</text>';
    cx += w + seg;
  });
  return s + '</svg>';
}

/* ==== Orientation pass (November 17, 2026): rotated triangle figures.
   Jason's diagram rule: triangle diagrams too often sit with one side
   horizontal, which hands students a cue. triSVG always lays side c
   on the horizontal. The three builders below draw the same figure
   language (triDraw placement: vertex labels outward, angle labels on
   bisectors, side labels offset from the segment) after rotating the
   layout points around their centroid by o.rot degrees, so no side
   needs to be horizontal. Rotation is in layout space (y up); _fit
   flips y for the screen, which preserves the slant. Use where the
   context permits; keep scene figures (elevation, ladders, ramps)
   level, where a horizontal side is intrinsic. ==== */
function _rotPts(pts, rotDeg) {
  var G = [0, 0];
  pts.forEach(function (p) { G[0] += p[0]; G[1] += p[1]; });
  G = [G[0] / pts.length, G[1] / pts.length];
  var th = (rotDeg || 0) * Math.PI / 180, cs = Math.cos(th), sn = Math.sin(th);
  return pts.map(function (p) {
    var dx = p[0] - G[0], dy = p[1] - G[1];
    return [G[0] + dx * cs - dy * sn, G[1] + dx * sn + dy * cs];
  });
}
/* triRotSVG(a, b, c, o): triSVG with the layout rotated by o.rot
   degrees (0 or absent = identical placement to triSVG). o follows
   the triSVG option shape: L (vertex letters), ang, side. */
function triRotSVG(a, b, c, o) {
  o = o || {}; o.L = o.L || ["A", "B", "C"];
  var pts = _rotPts(triLayout(a, b, c), o.rot || 0), W = 330, H = 215;
  var T = _fit(pts, W, H, 42), P = pts.map(T);
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Triangle diagram">' + triDraw(P, o) + '</svg>';
}
/* splitTriSVG(a, b, c, t, o): triangle ABC (side a opposite A, and so
   on) with point D on BC, BD = t * BC, and the cevian AD drawn.
   o: L (3 vertex letters), DL (letter for D, default "D"),
   angA1 / angA2 (labels for the two parts of angle A), angB, angC,
   sideA1 (BD label), sideA2 (DC label), sideB (CA), sideC (AB),
   sideAD, rot (degrees). */
function splitTriSVG(a, b, c, t, o) {
  o = o || {}; var L = o.L || ["A", "B", "C"], DL = o.DL || "D";
  var lay = triLayout(a, b, c), A = lay[0], B = lay[1], C = lay[2];
  var D = [B[0] + t * (C[0] - B[0]), B[1] + t * (C[1] - B[1])];
  var rp = _rotPts([A, B, C, D], o.rot || 0);
  var W = 330, H = 215, T = _fit(rp, W, H, 42);
  var PA = T(rp[0]), PB = T(rp[1]), PC = T(rp[2]), PD = T(rp[3]);
  var G = [(PA[0] + PB[0] + PC[0]) / 3, (PA[1] + PB[1] + PC[1]) / 3];
  var out = '<polygon class="tri" points="' + [PA, PB, PC].map(function (p) { return fmt(p[0], 1) + "," + fmt(p[1], 1); }).join(" ") + '" fill="none" stroke="' + FIG_INK + '" stroke-width="2"/>';
  out += '<line x1="' + fmt(PA[0], 1) + '" y1="' + fmt(PA[1], 1) + '" x2="' + fmt(PD[0], 1) + '" y2="' + fmt(PD[1], 1) + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  function vlab(P, str) { var d = _vnorm(_vsub(P, G)); return _txt(P[0] + d[0] * 16, P[1] + d[1] * 16, str, 14, true); }
  function alab(V, P1, P2, str) { var b = _vnorm([_vnorm(_vsub(P1, V))[0] + _vnorm(_vsub(P2, V))[0], _vnorm(_vsub(P1, V))[1] + _vnorm(_vsub(P2, V))[1]]); return _txt(V[0] + b[0] * 26, V[1] + b[1] * 26, str, 12, false); }
  function slab(P1, P2, ref, str) { var M = [(P1[0] + P2[0]) / 2, (P1[1] + P2[1]) / 2], off = _sideOff(P1, P2, ref, 15); return _txt(M[0] + off[0], M[1] + off[1], str, 12, false); }
  out += vlab(PA, L[0]) + vlab(PB, L[1]) + vlab(PC, L[2]);
  (function () { var d = _vnorm(_vsub(PD, G)); out += _txt(PD[0] + d[0] * 15, PD[1] + d[1] * 15, DL, 13, true); })();
  if (o.angA1) out += alab(PA, PB, PD, o.angA1);
  if (o.angA2) out += alab(PA, PD, PC, o.angA2);
  if (o.angB) out += alab(PB, PA, PD, o.angB);
  if (o.angC) out += alab(PC, PA, PD, o.angC);
  if (o.sideC) out += slab(PA, PB, PC, o.sideC);
  if (o.sideB) out += slab(PC, PA, PB, o.sideB);
  if (o.sideA1) out += slab(PB, PD, PA, o.sideA1);
  if (o.sideA2) out += slab(PD, PC, PA, o.sideA2);
  if (o.sideAD) out += slab(PA, PD, PB, o.sideAD);
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Triangle with a line from a vertex to the opposite side">' + out + '</svg>';
}
/* chainTriSVG(AB, BC, angB, AC, CD, AD, angDAC, angD, o): the
   twoTriSVG geometry (triangles ABC and ACD sharing the diagonal AC,
   B above AC, D below) rotated by o.rot degrees. o.sideAC labels the
   shared diagonal; o.hideSides lists side keys ("AB","BC","CD","AD")
   to leave unlabelled. */
function chainTriSVG(AB, BC, angB, AC, CD, AD, angDAC, angD, o) {
  o = o || {}; var hide = o.hideSides || [];
  var A = [0, 0], C = [AC, 0];
  var Bx = (AB * AB - BC * BC + AC * AC) / (2 * AC), By = Math.sqrt(Math.max(AB * AB - Bx * Bx, 0.0001)), B = [Bx, By];
  var Dx = (AD * AD - CD * CD + AC * AC) / (2 * AC), Dy = -Math.sqrt(Math.max(AD * AD - Dx * Dx, 0.0001)), D = [Dx, Dy];
  var rp = _rotPts([A, B, C, D], o.rot || 0);
  var W = 340, H = 230, T = _fit(rp, W, H, 44);
  var PA = T(rp[0]), PB = T(rp[1]), PC = T(rp[2]), PD = T(rp[3]);
  var G = [(PA[0] + PB[0] + PC[0] + PD[0]) / 4, (PA[1] + PB[1] + PC[1] + PD[1]) / 4];
  var G1 = [(PA[0] + PB[0] + PC[0]) / 3, (PA[1] + PB[1] + PC[1]) / 3], G2 = [(PA[0] + PC[0] + PD[0]) / 3, (PA[1] + PC[1] + PD[1]) / 3];
  var out = '<polygon class="tri" points="' + [PA, PB, PC].map(function (p) { return fmt(p[0], 1) + "," + fmt(p[1], 1); }).join(" ") + '" fill="none" stroke="' + FIG_INK + '" stroke-width="2"/>';
  out += '<polygon class="tri2" points="' + [PA, PC, PD].map(function (p) { return fmt(p[0], 1) + "," + fmt(p[1], 1); }).join(" ") + '" fill="none" stroke="' + FIG_INK + '" stroke-width="2"/>';
  function vlab(P, str) { var d = _vnorm(_vsub(P, G)); return _txt(P[0] + d[0] * 16, P[1] + d[1] * 16, str, 14, true); }
  function alab(V, P1, P2, str) { var b = _vnorm([_vnorm(_vsub(P1, V))[0] + _vnorm(_vsub(P2, V))[0], _vnorm(_vsub(P1, V))[1] + _vnorm(_vsub(P2, V))[1]]); return _txt(V[0] + b[0] * 26, V[1] + b[1] * 26, str, 12, false); }
  function slab(P1, P2, ref, str) { var M = [(P1[0] + P2[0]) / 2, (P1[1] + P2[1]) / 2], off = _sideOff(P1, P2, ref, 15); return _txt(M[0] + off[0], M[1] + off[1], str, 12, false); }
  if (hide.indexOf("AB") < 0) out += slab(PA, PB, G1, AB + " m");
  if (hide.indexOf("BC") < 0) out += slab(PB, PC, G1, BC + " m");
  if (hide.indexOf("CD") < 0) out += slab(PC, PD, G2, CD + " m");
  if (hide.indexOf("AD") < 0) out += slab(PA, PD, G2, AD + " m");
  if (o.sideAC) out += slab(PA, PC, PB, o.sideAC);
  out += alab(PB, PA, PC, angB + "°");
  out += alab(PA, PD, PC, angDAC + "°");
  out += alab(PD, PA, PC, angD + "°");
  out += vlab(PA, "A") + vlab(PB, "B") + vlab(PC, "C") + vlab(PD, "D");
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two triangles sharing a diagonal">' + out + '</svg>';
}

/* ----- bank-u5.js ----- */
// Math 2201 Unit 5: Statistical Reasoning question bank
// Cut verbatim from the standalone app's served file
// (math-2201-review/Math2201Review.html, lines 727 to 1203,
// across its first three bank script blocks), minus its
// BANK and E definitions at lines 737 to 738, which the
// shell's bank loader supplies. Unit 5 registers first in
// the standalone, so it is first here too.
// CRMARKS: u5-centre-mean=1
// CRMARKS: u5-centre-median=1
// CRMARKS: u5-centre-mode=1
// CRMARKS: u5-range=1
// CRMARKS: u5-outlier-range=2
// CRMARKS: u5-ad-claim=3
// CRMARKS: u5-freq-total=1
// CRMARKS: u5-freq-missing=1
// CRMARKS: u5-freq-countin=1
// CRMARKS: u5-relfreq=1
// CRMARKS: u5-relfreq-rev=1
// CRMARKS: u5-histogram-read=2
// CRMARKS: u5-midpoint=1
// CRMARKS: u5-polygon-point=1
// CRMARKS: u5-sd-calc=2
// CRMARKS: u5-sd-from-variance=1
// CRMARKS: u5-sd-compare=2
// CRMARKS: u5-sd-decisions=4
// CRMARKS: u5-empirical=2
// CRMARKS: u5-normal-count=2
// CRMARKS: u5-z-calc=1
// CRMARKS: u5-z-compare=2
// CRMARKS: u5-z-backwards=1
// CRMARKS: u5-z-prob=2
// CRMARKS: u5-z-applied=2
// CRMARKS: u5-ci-endpoint=1
// CRMARKS: u5-ci-from-endpoints=1
// CRMARKS: u5-ci-count=2
// CRMARKS: u5-ci-majority=3
// CRMARKS: u5-media=4
/* ============ THE BANK — Unit 5: Statistical Reasoning ============ */
/* ============ BANK ADMISSION RULE (adopted Oct 26, 2026, from the bank duplication audit) ============
   A "gen" entry must produce at least 50 unique canonical questions (normalized prompt
   text + correct answer) in 2,000 test draws, or it must be registered as a "var" set
   holding at least 3 genuinely different static questions. Run the duplication audit
   as a pre-commit check before any new item is added to this bank.
   Every multiple-choice question must have exactly 4 options (Jason's standard,
   Oct 26, 2026): build exactly 3 distractors, and make sure no distractor can ever
   equal the correct answer or another distractor, because mcq() silently drops
   duplicates and the option count falls short. */

/* --- measures of centre (prior knowledge, Section 1) --- */
E("u5-centre-mean",5,["PK.1"],1,"gen",function(){
  var c=pick([{w:"quiz marks",u:""},{w:"daily high temperatures",u:"\u00B0C"},{w:"goals per game",u:""},{w:"pages read each day",u:""}]);
  var n=ri(5,7),base=ri(4,14),data=[],i;for(i=0;i<n;i++)data.push(base+ri(-4,6));
  var m=mean(data);
  var q=numq("A student records these "+c.w+": <b>\\(\\{"+data.join(", ")+"\\}\\)</b>. What is the <b>mean</b>?",
    Math.round(m*100)/100,0.011,
    "Add the values: \\("+data.join(" + ")+" = "+fmt(sum(data))+"\\). There are "+n+" values, so the mean is <b>\\("+fmt(sum(data))+" \\div "+n+" = "+fmt(m)+"\\)</b>.",
    {data:data});
  q.figure=dotPlotSVG(data,{aria:"Dot plot of the recorded values"});
  return q;
});
E("u5-centre-median",5,["PK.1"],1,"gen",function(){
  var n=pick([6,8]),base=ri(5,15),data=[],i;for(i=0;i<n;i++)data.push(base+ri(-5,7));
  var md=median(data),s=sorted(data),lo=s[n/2-1],hi=s[n/2];
  var q=numq("Find the <b>median</b> of: <b>\\(\\{"+data.join(", ")+"\\}\\)</b>.",
    md,0.011,
    "In order: \\(\\{"+s.join(", ")+"\\}\\). With "+n+" values the median is the average of the two middle values, \\("+lo+"\\) and \\("+hi+"\\): <b>\\(\\frac{"+lo+" + "+hi+"}{2} = "+fmt(md)+"\\)</b>.",
    {data:data});
  q.figure=dotPlotSVG(data,{aria:"Dot plot of the data values"});
  return q;
});
E("u5-centre-mode",5,["PK.1"],1,"gen",function(){
  var cols=["red","blue","green","black","purple","orange"];
  var win=pick(cols),others=shuffle(cols.filter(function(c){return c!==win;}));
  var list=[win,win,win];var k=ri(2,3);for(var i=0;i<k;i++){list.push(others[i%others.length]);if(i<2)list.push(others[(i+1)%others.length]);}
  list=shuffle(list);
  return textq("A class votes for a poster colour. The votes are: <b>"+list.join(", ")+"</b>. What is the <b>mode</b>? (Type the colour.)",
    [win],
    "Count each colour: "+win+" appears 3 times, more than any other colour, so the mode is <b>"+win+"</b>. The mode is the most useful measure for data in categories.",
    {win:win,list:list});
});
E("u5-choosing-measure",5,["PK.1"],2,"var",varset([
  function(){return mcq("A school store manager asks students to name their favourite hoodie design so she knows which design to order most of. Which measure of central tendency is most useful for this decision?",
    "The mode, because the data are categories and the most common choice is what matters",
    ["The mean, because it uses every student's answer and averages all the choices together","The median, because it is the middle answer when the designs are listed in order","The range, because it shows how spread out the choices are across all the designs named"],
    "The answers are categories, not numbers, so only the mode can be found \u2014 and the most-chosen design is exactly what she needs to order.",{});},
  function(){return mcq("At a small company, most workers earn about $650 a week, but the owner earns $3,800 a week. Which statement best describes a typical worker's earnings?",
    "The median, because the owner's salary pulls the mean well above what most workers earn",
    ["The mean, because it includes every salary in the company, and every salary should count","The mode, because it is the salary paid most often in every company, whatever the rest are","The range, because it is unaffected by the owner's salary and shows the spread of pay"],
    "One very large value pulls the mean up. The median sits in the middle of the workers' actual salaries, so it describes a typical worker far better.",{});},
  function(){return mcq("A data set contains one value that is far lower than all the others. What is the effect of that value?",
    "It pulls the mean down, while the median is barely affected",
    ["It pulls the median down by about the same amount as the mean","It changes the mode of the data set to a new most common value","It leaves the range unchanged, since the spread stays the same"],
    "The mean uses every value, so an extreme value drags it. The median depends only on the middle position, and the range must grow because the lowest value dropped.",{});}
]));
/* --- dispersion (8.6) --- */
E("u5-range",5,["8.6"],1,"gen",function(){
  var c=pick(["daily step counts (thousands)","lengths of fish caught (cm)","marks on a quiz","laps swum each day"]);
  var n=ri(5,6),base=ri(8,20),data=[],i;for(i=0;i<n;i++)data.push(base+ri(-6,9));
  var q=numq("Find the <b>range</b> of these "+c+": <b>\\(\\{"+data.join(", ")+"\\}\\)</b>.",
    rngOf(data),0.001,
    "Range <b>\\(= \\text{highest} - \\text{lowest} = "+Math.max.apply(null,data)+" - "+Math.min.apply(null,data)+" = "+rngOf(data)+"\\)</b>.",
    {data:data});
  q.figure=dotPlotSVG(data,{aria:"Dot plot of the data values"});
  return q;
});
E("u5-outlier-range",5,["8.6"],2,"gen",function(){
  var lo=ri(5,10),cluster=[],i;for(i=0;i<5;i++)cluster.push(lo+ri(0,5));
  var out=Math.max.apply(null,cluster)+ri(18,30);var data=shuffle(cluster.concat([out]));
  var without=rngOf(cluster);
  var correct="\\("+out+"\\) is the outlier, and the range without it is \\("+without+"\\)";
  var q=mcq("For the data set <b>\\(\\{"+data.join(", ")+"\\}\\)</b>, which statement is correct?",correct,
    ["\\("+Math.min.apply(null,data)+"\\) is the outlier, and the range without it is \\("+without+"\\)",
     "\\("+out+"\\) is the outlier, and the range without it is \\("+rngOf(data)+"\\)",
     "There is no outlier, and the range is \\("+rngOf(data)+"\\)"],
    "The value \\("+out+"\\) sits far above the cluster \\(\\{"+cluster.join(", ")+"\\}\\). Without it, the range is \\("+Math.max.apply(null,cluster)+" - "+Math.min.apply(null,cluster)+" = "+without+"\\). With it, the range stretches to \\("+rngOf(data)+"\\), which is why one outlier can make a set look far more spread out than it really is.",
    {data:data,out:out,without:without});
  q.figure=dotPlotSVG(data,{aria:"Dot plot of the data set, with one value far from the rest"});
  return q;
});
E("u5-dispersion-compare",5,["8.6"],2,"gen",function(){
  var ctx=pick([
    {who:"Two couriers",unit:"parcels delivered each day",avg:"average"},
    {who:"Two classes",unit:"marks on the same test",avg:"mean mark"},
    {who:"Two goalies",unit:"saves per game",avg:"average"}]);
  var ra=ri(4,8),rb=ra+ri(12,22),swap=Math.random()<0.5;
  var A=swap?rb:ra,B=swap?ra:rb;
  var winner=A<B?"A":"B";
  return mcq(ctx.who+" both have the same "+ctx.avg+" for "+ctx.unit+". Person A/class A's results have a range of \\("+A+"\\); B's have a range of \\("+B+"\\). Which statement is correct?",
    winner+" is more consistent, because "+winner+"'s results stay closer to the shared "+ctx.avg,
    [(winner==="A"?"B":"A")+" is more consistent, because a larger range means steadier results in the long run",
     "Both are equally consistent, because equal "+ctx.avg+"s mean the spread can be ignored",
     "Consistency cannot be compared without knowing each median value as well"],
    "Both have the same centre, so compare the spread. The smaller range (\\("+Math.min(A,B)+"\\)) means results cluster closer to the "+ctx.avg+" \u2014 that is the more consistent performance. Equal means say nothing about consistency.",
    {A:A,B:B,winner:winner});
});
E("u5-ad-claim",5,["8.6"],3,"gen",function(){
  var base=[ri(4,8),ri(6,10),ri(5,9),ri(8,12),ri(6,9),ri(9,13),ri(7,11)];
  var big=ri(220,360);var data=base.concat([big]);var m=mean(data),md=median(data);
  var claim=Math.round(m);
  var q=mcq("A gym advertises: \u201COur members lose an average of "+claim+" lb in their first month!\u201D The amounts actually lost by eight members were <b>\\(\\{"+data.join(", ")+"\\}\\)</b> lb. Why is the advertisement misleading?",
    "It uses the mean, which one member's \\("+big+"\\) lb loss pulls far above what a typical member loses (the median loss is \\("+fmt(md)+"\\) lb)",
    ["It uses the median, which one large loss pulls far above the rest, so the median ends up inflated like the advertised figure","The range of the losses is too small to support the claim, because so narrow a range means no one lost enough to lift the average that high","The mode of the losses is higher than the advertised average, because the most common loss sits above what the gym says members lose"],
    "Mean \\(= "+fmt(sum(data))+" \\div 8 = "+fmt(m)+" \\approx "+claim+"\\), so the gym used the mean. But sorted, the middle values give a median of \\("+fmt(md)+"\\) lb \u2014 a far better picture of a typical member. One extreme value did all the work in the ad.",
    {data:data,mean:m,median:md,big:big});
  q.figure=dotPlotSVG(data,{aria:"Dot plot of the eight amounts, with one value far from the rest"});
  return q;
});
/* --- frequency tables, histograms, polygons (8.7) --- */
E("u5-freq-total",5,["8.7"],1,"gen",function(){
  var rows=ri(3,4),fs=[],i;for(i=0;i<rows;i++)fs.push(ri(2,14));
  return numq("A frequency table for the number of siblings students have has frequencies \\("+fs.join(", ")+"\\) in its rows. How many students were surveyed?",
    sum(fs),0.001,"The total frequency is the total number of students: <b>\\("+fs.join(" + ")+" = "+sum(fs)+"\\)</b>.",{fs:fs});
});
E("u5-freq-missing",5,["8.7"],1,"gen",function(){
  var total=pick([40,50,60,45,55]);var a=ri(8,16),b=ri(6,14),c=ri(4,10);var miss=total-a-b-c;
  while(miss<2){a--;miss=total-a-b-c;}
  return numq("A grouped frequency table has a total of "+total+" values. Three of its intervals have frequencies "+a+", "+b+" and "+c+". What is the frequency of the remaining interval?",
    miss,0.001,"The frequencies must add to the total: <b>\\("+total+" - ("+a+" + "+b+" + "+c+") = "+total+" - "+(a+b+c)+" = "+miss+"\\)</b>.",{total:total,a:a,b:b,c:c});
});
E("u5-freq-countin",5,["8.7"],1,"gen",function(){
  var w=pick([5,10]);var lo=ri(0,3)*w;var hi=lo+w;
  var data=[],i;for(i=0;i<18;i++)data.push(ri(0,hi+w+8));
  var cnt=data.filter(function(x){return x>=lo&&x<hi;}).length;
  var q=numq("Using the class intervals from the course (lower value included, upper value excluded), how many of these values fall in the interval <b>\\("+lo+"\\text{-}"+hi+"\\)</b>?<br><b>\\(\\{"+data.join(", ")+"\\}\\)</b>",
    cnt,0.001,"Count the values that are at least \\("+lo+"\\) and less than \\("+hi+"\\): there are <b>\\("+cnt+"\\)</b>. A value of exactly \\("+hi+"\\) would belong to the next interval, not this one.",{data:data,lo:lo,hi:hi});
  q.figure=dotPlotSVG(data,{band:[lo,hi],aria:"Dot plot of the values, with the interval "+lo+" to "+hi+" shaded"});
  return q;
});
E("u5-relfreq",5,["8.7"],1,"gen",function(){
  var pcts=[5,10,12.5,15,20,25,30,40,50,60,75,80],totals=[40,60,80,100,120,160,200,240];
  var total,pct,f,guard=0;
  do{total=pick(totals);pct=pick(pcts);f=total*pct/100;guard++;}while(f!==Math.floor(f)&&guard<60);
  var ctx=pick(["In a frequency table, an interval has","In a survey table, the interval with the most responses has","A grouped table of test scores shows an interval with"]);
  return numq(ctx+" frequency \\("+f+"\\) out of a total of \\("+total+"\\) values. What is its <b>relative frequency</b>, as a percent? (Just the number.)",
    pct,0.11,"Relative frequency \\(= \\frac{"+f+"}{"+total+"} = "+fmt(f/total,4)+"\\), which is <b>\\("+fmt(pct)+"\\%\\)</b>.",{f:f,total:total});
});
E("u5-relfreq-rev",5,["8.7"],1,"gen",function(){
  var pcts=[5,10,12.5,15,20,25,30,35,40,45,50,60,75,80],totals=[40,60,80,100,120,150,200,240,300];
  var total,pct,f,guard=0;
  do{total=pick(totals);pct=pick(pcts);f=total*pct/100;guard++;}while(f!==Math.floor(f)&&guard<60);
  var ctx=pick(["An interval's","In a grouped table of marks, one interval's","For the interval containing the middle values, the"]);
  return numq(ctx+" relative frequency is \\("+fmt(pct)+"\\%\\), and the table's total is \\("+total+"\\) values. What is the interval's frequency?",
    f,0.001,"<b>\\("+fmt(pct)+"\\% \\text{ of } "+total+" = "+fmt(pct/100,4)+" \\times "+total+" = "+f+"\\)</b>.",{total:total,pct:pct});
});
E("u5-histogram-read",5,["8.7"],1,"var",varset([
  function(){
  var labels=["\\(0\\text{-}9\\)","\\(10\\text{-}19\\)","\\(20\\text{-}29\\)","\\(30\\text{-}39\\)"];var fs=[ri(2,7),ri(8,13),ri(5,10),ri(1,5)];
  var ans=fs[2]+fs[3];
  var rows=labels.map(function(l,i){return "<tr><td>"+l+"</td><td>\\("+fs[i]+"\\)</td></tr>";}).join("");
  var q=numq("A histogram is built from this table of daily high temperatures recorded over "+sum(fs)+" days:<table><tr><th>Temperature (\u00B0C)</th><th>Frequency</th></tr>"+rows+"</table>On how many days was the high temperature <b>\\(20^\\circ \\text{C}\\) or more</b>?",
    ans,0.001,"Add the frequencies for \\(20\\text{-}29\\) and \\(30\\text{-}39\\): <b>\\("+fs[2]+" + "+fs[3]+" = "+ans+"\\)</b> days.",{fs:fs});
  q.figure=barsSVG([{label:"0-9",f:fs[0]},{label:"10-19",f:fs[1]},{label:"20-29",f:fs[2]},{label:"30-39",f:fs[3]}],{touch:true,yLab:"Frequency",aria:"Histogram of daily high temperatures"});
  return q;
},
  function(){
  var fs=[ri(2,7),ri(8,13),ri(5,10),ri(1,5)];
  var ans=fs[2]+fs[3];
  var q=numq("The histogram shows daily high temperatures recorded over "+sum(fs)+" days. On how many days was the high temperature <b>\\(20^\\circ \\text{C}\\) or more</b>?",
    ans,0.001,"Read the bar heights off the frequency axis: the \\(20\\text{-}29\\) bar reaches \\("+fs[2]+"\\) and the \\(30\\text{-}39\\) bar reaches \\("+fs[3]+"\\). Add them: <b>\\("+fs[2]+" + "+fs[3]+" = "+ans+"\\)</b> days.",{fs:fs});
  q.figure=barsSVG([{label:"0-9",f:fs[0]},{label:"10-19",f:fs[1]},{label:"20-29",f:fs[2]},{label:"30-39",f:fs[3]}],{touch:true,yLab:"Frequency",aria:"Histogram of daily high temperatures"});
  return q;
}
]));
E("u5-midpoint",5,["8.7"],1,"gen",function(){
  var w=pick([4,5,10,20]);var lo=ri(0,12)*w;var hi=lo+w-1;var mid=(lo+hi)/2;
  var tail=pick([""," (from a frequency table)"," (from a table of daily high temperatures)"," (from a grouped table of sprint times)"]);
  return numq("What is the <b>midpoint</b> of the interval \\("+lo+"\\text{-}"+hi+"\\)"+tail+"?",
    mid,0.011,"Midpoint <b>\\(= \\frac{"+lo+" + "+hi+"}{2} = "+fmt(mid)+"\\)</b>. A frequency polygon plots each interval's frequency at its midpoint.",{lo:lo,hi:hi});
});
E("u5-polygon-point",5,["8.7"],1,"gen",function(){
  var w=pick([10]);var lo=ri(0,4)*w;var hi=lo+w-1;var mid=(lo+hi)/2;var f=ri(3,12);
  return mcq("A frequency polygon is drawn for a table in which the interval \\("+lo+"\\text{-}"+hi+"\\) has frequency \\("+f+"\\). At which point is that interval's polygon point plotted?",
    "\\(("+fmt(mid)+", "+f+")\\)",
    ["\\(("+lo+", "+f+")\\)","\\(("+hi+", "+f+")\\)","\\(("+f+", "+fmt(mid)+")\\)"],
    "Polygon points go at \\((\\text{midpoint}, \\text{frequency})\\). The midpoint of \\("+lo+"\\text{-}"+hi+"\\) is \\("+fmt(mid)+"\\), so the point is \\(("+fmt(mid)+", "+f+")\\).",
    {lo:lo,hi:hi,mid:mid,f:f});
});
E("u5-histogram-concepts",5,["8.7"],2,"var",varset([
  function(){return mcq("Why do the bars in a histogram touch each other, while the bars in a bar graph do not?",
    "A histogram's intervals are continuous number ranges with no gaps between them; a bar graph shows separate categories",
    ["Histogram bars are always wider than bar graph bars, because bar width is what separates the two graphs","Touching bars make the frequencies easier to add, since bars that touch can be totalled at a glance, unlike separated bars","A histogram has no vertical axis, so the bars join together, because joined bars are how histograms are drawn"],
    "A histogram groups a continuous measurement into intervals that run into each other, so the bars touch. A bar graph compares separate categories, so its bars stay apart.",{});},
  function(){return mcq("Which statement about a histogram is correct?",
    "The exact values are hidden by grouping, so counts per interval can be read but individual values cannot",
    ["The exact data values can be read off the bars, because each bar stands for one central value","The height of each bar is the midpoint of its interval, because a bar rises to the middle value it covers","The bars must all be the same height when the intervals are equal, since equal intervals carry equal counts"],
    "Once values are grouped into an interval, the graph shows only how many fell in \u2014 the individual values are gone. That is the trade-off of grouping.",{});},
  function(){return mcq("A histogram of coffee-shop wait times has its tallest bar over the interval \\(5\\text{-}9\\) minutes. What can you conclude?",
    "More waits fell in the \\(5\\text{-}9\\) minute interval than in any other single interval",
    ["The average wait was exactly \\(7\\) minutes, the midpoint of the tallest bar's interval","Every wait was between \\(5\\) and \\(9\\) minutes, because that bar covers every wait","The longest wait was \\(9\\) minutes, the top of the interval under the tallest bar"],
    "The tallest bar marks the interval with the highest frequency. Grouped bars hide the exact values, so neither the true average nor the longest wait can be read off the graph.",{});}
]));
E("u5-polygon-compare",5,["8.7"],2,"gen",function(){
  var ctx=pick(["ferry routes' passenger counts per crossing","city bus routes' passenger counts per trip","school shuttle routes' rider counts per run","commuter train routes' passenger counts per trip"]);
  var lo1=pick([20,25,30,35,40]),hi1=lo1+9;var bHi=pick([49,59,69,79]);
  var q=mcq("Two "+ctx+" are drawn as frequency polygons on the same axes. Route A's polygon is tall and narrow, peaked at \\("+lo1+"\\text{-}"+hi1+"\\) passengers. Route B's polygon is low and wide, spread from \\(0\\text{-}9\\) up to \\("+(bHi-9)+"\\text{-}"+bHi+"\\) passengers. Which statement is correct?",
    "Route B's passenger counts are more spread out, because its polygon covers a much wider range of intervals",
    ["Route A carries more passengers in total, because its polygon is taller, and its taller peak means more carried overall","Both routes are equally consistent, because both polygons peak, and a peak in the middle means equal consistency","Route B's mean is \\("+fmt(bHi-4.5,1)+"\\) passengers, the midpoint of its widest interval, so that midpoint is the mean"],
    "A polygon stretched over many intervals means the values vary widely \u2014 Route B is far more spread out. Height alone does not give a total, and a midpoint is not a mean.",{lo1:lo1});
  q.figure=polyPairSVG({peakLo:lo1,peakHi:hi1,top:bHi,aria:"The two frequency polygons described, on the same axes"});
  return q;
});
/* --- standard deviation (8.8, 8.9, 8.10, 8.16) --- */
E("u5-sd-calc",5,["8.9"],2,"gen",function(){
  var sets=[[4,6,8,10,12],[10,12,14,16],[2,5,8,11,14],[6,9,10,11,14],[15,17,19,21,23],[3,7,8,12,15]];
  var data=pick(sets).map(function(x){return x+ri(0,3);});
  var m=mean(data),v=pvar(data),sd=Math.sqrt(v);
  var devs=data.map(function(x){return fmt(x-m);}).join(", ");
  var q=numq("Using technology (or the formula), find the <b>population standard deviation</b> of <b>\\(\\{"+data.join(", ")+"\\}\\)</b>, to two decimal places. The mean is \\("+fmt(m)+"\\).",
    Math.round(sd*100)/100,0.011,
    "Deviations from the mean: \\("+devs+"\\). Square them and average: the variance is \\("+fmt(v)+"\\). Then <b>\\(\\sigma = \\sqrt{"+fmt(v)+"} \\approx "+fmt(sd)+"\\)</b>.",
    {data:data});
  q.figure=dotPlotSVG(data,{mean:m,aria:"Dot plot of the data values, with the mean marked"});
  return q;
});
E("u5-sd-from-variance",5,["8.9"],1,"gen",function(){
  var sd=pick([0.5,1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,11,12]);var v=sd*sd;
  var frame=pick(["The variance of a data set is \\("+fmt(v)+"\\). What is its <b>standard deviation</b>?",
    "A data set has variance \\("+fmt(v)+"\\). Find its <b>standard deviation</b>.",
    "The scores in a quiz have variance \\("+fmt(v)+"\\). What is the <b>standard deviation</b> of the scores?"]);
  return numq(frame,
    sd,0.011,"Standard deviation is the square root of the variance: <b>\\(\\sqrt{"+fmt(v)+"} = "+fmt(sd)+"\\)</b>.",{v:v});
});
E("u5-sd-meaning",5,["8.8"],1,"var",varset([
  function(){return mcq("What does the standard deviation of a data set measure?",
    "How far the values typically lie from the mean",
    ["The difference between the largest and smallest values","The value in the middle of the data set","How many values the data set contains in total"],
    "Standard deviation is a typical distance from the mean. The largest-minus-smallest description is the range, and the middle value is the median.",{});},
  function(){return mcq("A data set has a standard deviation of \\(0\\). What does that tell you about the set?",
    "Every value in the set is the same",
    ["The mean of the set is \\(0\\) as well","The set contains no values at all","The values are spread as far apart as possible"],
    "If every value equals the mean, every deviation is \\(0\\), so the standard deviation is \\(0\\) \u2014 the set has no spread at all.",{});},
  function(){return mcq("Two sets have the same mean. Set P has a standard deviation of \\(2\\); Set Q has a standard deviation of \\(11\\). What does that tell you?",
    "Set Q's values are spread much farther from the mean than Set P's",
    ["Set Q's values must all be larger than Set P's, because its spread is bigger","Set P has more values than Set Q, so its values are spread out more","Nothing \u2014 standard deviation cannot be compared between sets"],
    "Standard deviation is measured in the data's own units as a typical distance from the mean, so \\(11\\) means far more spread than \\(2\\).",{});}
]));
E("u5-sd-compare",5,["8.8"],2,"gen",function(){
  var m=ri(20,60),d1=pick([2,3]),d2=pick([9,10,12]);
  var A=[m-d1,m,m+d1],B=[m-d2,m,m+d2];var swap=Math.random()<0.5;
  var first=swap?B:A,second=swap?A:B;var wider=swap?"A":"B";
  var q=mcq("Set A is \\(\\{"+first.join(", ")+"\\}\\). Set B is \\(\\{"+second.join(", ")+"\\}\\). Both sets have mean \\("+m+"\\). Which statement is correct?",
    "Set "+wider+" has the larger standard deviation, because its values lie farther from the mean",
    ["Set "+(wider==="A"?"B":"A")+" has the larger standard deviation, because its values are closer together overall","Both sets have the same standard deviation, because they have the same mean value","Neither set has a standard deviation, because they have only three values each"],
    "Both sets are centred at \\("+m+"\\), but Set "+wider+"'s values sit \\("+(wider==="A"?(swap?d2:d1):(swap?d1:d2))+"\\) units away while the other's sit closer. Farther from the mean means a larger standard deviation, whatever the mean is.",
    {A:A,B:B,wider:wider,m:m});
  q.figure=dotPlotSVG(null,{rows:[{label:"A",data:first},{label:"B",data:second}],mean:m,aria:"Dot plots of the two sets on a shared scale, with their common mean marked"});
  return q;
});
E("u5-sd-interpret",5,["8.10"],2,"gen",function(){
  var ctx=pick([
    {who:"Two bus drivers complete the same route",thing:"times",unit:"minutes",m:ri(25,40)},
    {who:"Two machines fill bottles",thing:"fill amounts",unit:"mL",m:ri(480,520)},
    {who:"Two archers shoot rounds",thing:"scores",unit:"points",m:ri(70,90)}]);
  var small=ri(2,5),big=small+ri(4,8);
  return mcq(ctx.who+" with the same mean (\\("+ctx.m+"\\) "+ctx.unit+"). One has a standard deviation of \\("+small+"\\) "+ctx.unit+"; the other, \\("+big+"\\) "+ctx.unit+". Which one is more consistent, and why?",
    "The one with standard deviation \\("+small+"\\), because a smaller standard deviation means the "+ctx.thing+" cluster closer to the mean",
    ["The one with standard deviation \\("+big+"\\), because a larger standard deviation means steadier "+ctx.thing+" that stay close to the mean","Neither \u2014 consistency cannot be compared when the means are equal, because sets with the same mean must be equally steady","Both are equally consistent, because they share the same mean, and their results stay just as close to that mean"],
    "Consistency is about spread, not centre. A standard deviation of \\("+small+"\\) means results typically land within about \\("+small+"\\) "+ctx.unit+" of the mean \u2014 much steadier than \\("+big+"\\).",
    {small:small,big:big});
});
E("u5-sd-decisions",5,["8.16"],3,"var",varset([
  function(){return mcq("A phone maker is choosing which model to sell with a guarantee that the battery will still be going after \\(20\\) hours of use, or the phone is replaced. Model P has a mean battery life of \\(26\\) hours with a standard deviation of \\(3\\) hours. Model Q has a mean battery life of \\(30\\) hours with a standard deviation of \\(6\\) hours. Which model should produce fewer guarantee replacements?",
    "Model P, because \\(20\\) hours is \\(2\\) standard deviations below its mean, but only about \\(1.7\\) standard deviations below Model Q's mean, so far fewer Model P batteries die early despite the lower mean",
    ["Model Q, because its mean battery life is higher than Model P's by four hours, and the model with the higher mean will always give fewer early failures, no matter how widely its battery lives are spread out","Model Q, because its larger standard deviation means more batteries last far longer than \\(20\\) hours, and those long-lasting batteries are what keep the total number of guarantee replacements down","Both will produce the same number of replacements, because both means are above \\(20\\) hours, and once the mean clears the guarantee mark the spread around that mean makes no difference to early failures"],
    "What matters is how far the guarantee sits below the mean, in standard deviations: P: \\(\\frac{26 - 20}{3} = 2\\); Q: \\(\\frac{30 - 20}{6} \\approx 1.7\\). Model Q's wider spread puts a bigger share of its batteries below \\(20\\) hours.",{a:{m:26,s:3},b:{m:30,s:6},w:20});},
  function(){return mcq("A company is choosing which freezer model to cover with a \\(6\\)-year warranty. Model A has a mean life of \\(9\\) years with a standard deviation of \\(1.5\\) years. Model B has a mean life of \\(11\\) years with a standard deviation of \\(3\\) years. Which model should produce fewer warranty claims?",
    "Model A, because \\(6\\) years is \\(2\\) standard deviations below its mean, but only about \\(1.7\\) standard deviations below Model B's mean, so far fewer Model A units fail early despite the lower mean",
    ["Model B, because its mean life is higher than Model A's by two full years, and the model with the higher mean will always give fewer early failures, no matter how widely its working lives are spread out","Model B, because its larger standard deviation means more of its units last far longer than average, and those long-lived units are what keep the total number of warranty claims down over the years","Both will produce the same number of claims, because both means are above \\(6\\) years, and once the mean clears the warranty mark the spread around that mean makes no difference to early failures"],
    "What matters is how far the warranty sits below the mean, in standard deviations: A: \\(\\frac{9 - 6}{1.5} = 2\\); B: \\(\\frac{11 - 6}{3} \\approx 1.7\\). Model B's wider spread puts a bigger share of its units below \\(6\\) years.",{a:{m:9,s:1.5},b:{m:11,s:3},w:6});},
  function(){return mcq("A seed company guarantees a minimum yield of \\(40\\) bushels per acre, or the farmer's seed is free. Variety A has a mean yield of \\(52\\) bushels per acre with a standard deviation of \\(6\\). Variety B has a mean yield of \\(64\\) bushels per acre with a standard deviation of \\(16\\). Which variety should trigger the guarantee less often?",
    "Variety A, because \\(40\\) bushels is \\(2\\) standard deviations below its mean, but only \\(1.5\\) standard deviations below Variety B's mean, so far fewer of Variety A's fields fall short despite the lower mean",
    ["Variety B, because its mean yield is higher than Variety A's by twelve bushels per acre, and the variety with the higher mean will always fall short less often, no matter how widely its yields are spread out","Variety B, because its larger standard deviation means more fields yield far above \\(40\\) bushels, and those high-yielding fields are what keep the total number of guarantee payouts down across a season","Both will trigger the guarantee equally often, because both means are above \\(40\\) bushels, and once the mean clears the guaranteed minimum the spread around that mean makes no difference to poor fields"],
    "What matters is how far the guaranteed minimum sits below the mean, in standard deviations: A: \\(\\frac{52 - 40}{6} = 2\\); B: \\(\\frac{64 - 40}{16} = 1.5\\). Variety B's wider spread puts a bigger share of its fields below \\(40\\) bushels.",{a:{m:52,s:6},b:{m:64,s:16},w:40});},
  function(){return mcq("A retailer is choosing which brand of washing machine to cover with a \\(7\\)-year warranty. Brand A has a mean life of \\(11\\) years with a standard deviation of \\(2\\) years. Brand B has a mean life of \\(13\\) years with a standard deviation of \\(4\\) years. Which brand should produce fewer warranty claims?",
    "Brand A, because \\(7\\) years is \\(2\\) standard deviations below its mean, but only \\(1.5\\) standard deviations below Brand B's mean, so far fewer Brand A machines fail early despite the lower mean",
    ["Brand B, because its mean life is higher than Brand A's by two full years, and the brand with the higher mean will always give fewer early failures, no matter how widely its machines' lives are spread out","Brand B, because its larger standard deviation means more machines last well beyond \\(7\\) years, and those long-lasting machines are what keep the total number of warranty claims down over the years","Both will produce the same number of claims, because both means are above \\(7\\) years, and once the mean clears the warranty mark the spread around that mean makes no difference to failures"],
    "What matters is how far the warranty sits below the mean, in standard deviations: A: \\(\\frac{11 - 7}{2} = 2\\); B: \\(\\frac{13 - 7}{4} = 1.5\\). Brand B's wider spread puts a bigger share of its machines below \\(7\\) years.",{a:{m:11,s:2},b:{m:13,s:4},w:7});}
]));
/* --- normal curve (8.11-8.14) --- */
E("u5-normal-props",5,["8.11","8.13"],1,"var",varset([
  function(){return mcq("Which statement about a normal distribution is true?",
    "It is symmetric, and its mean, median and mode are all equal",
    ["Its mean is larger than its median, sitting above the middle one","It is skewed to the right, tailing off toward larger values","Its total area under the curve is \\(100\\), not a proportion of one"],
    "A normal curve is a single symmetric hump centred on the mean, so mean = median = mode, and the total area under the curve is \\(1\\) (\\(100\\%\\) of the data).",{});},
  figArm(function(){return mcq("Two caf\u00E9s both serve lunch in a mean time of \\(14\\) minutes. Caf\u00E9 A has a standard deviation of \\(2\\) minutes; Caf\u00E9 B, \\(5\\) minutes. What do the two normal curves look like?",
    "Caf\u00E9 A's curve is taller and narrower; Caf\u00E9 B's is shorter and wider, and both are centred at \\(14\\)",
    ["Caf\u00E9 B's curve is taller and narrower, because its times vary more, and more variation raises the peak","Both curves are identical, because the means are equal, and equal means mean equal shapes","Caf\u00E9 A's curve is centred at \\(2\\) and Caf\u00E9 B's at \\(5\\), because each centre is a standard deviation"],
    "Same mean means the same centre. A smaller standard deviation squeezes the data toward the centre, so the curve grows taller and narrower to keep the same total area.",{});},function(){return normSVG({mu:14, sd:2, curve2:{sd:5, tagA:"A: \u03C3 = 2", tagB:"B: \u03C3 = 5"}});}),
  function(){return mcq("What does the standard deviation do to the shape of a normal curve?",
    "A larger standard deviation makes the curve wider and flatter; a smaller one makes it taller and narrower",
    ["It moves the curve left or right along the axis, because more spread slides the curve toward larger values","It makes the curve skewed toward the larger values, stretching the side with the larger values out sideways","It has no effect on the shape, only on the labels, because the curve is fixed once the mean is set"],
    "The mean sets the centre; the standard deviation sets the spread, and the curve's width follows it.",{});}
]));
E("u5-isnormal",5,["8.12"],2,"var",varset([
  function(){return mcq("Which data set would be expected to approximate a normal distribution?",
    "The heights of \\(500\\) randomly chosen adults",
    ["The number of pets owned by students in a class","The high temperature on the coldest day of each winter month","The jersey numbers on a hockey team roster"],
    "Heights pile up symmetrically around a central value with fewer and fewer people toward the extremes \u2014 the normal shape. Pet counts are small whole numbers bunched at 0, 1 and 2, and jersey numbers are labels, not measurements.",{});},
  function(){return mcq("A teacher plots her class's marks and gets a histogram with one hump, but the hump leans left with a long tail of low marks stretching down. Does the data approximate a normal distribution?",
    "No \u2014 a normal curve is symmetric, and this distribution is skewed by the tail of low marks",
    ["Yes \u2014 any single-humped histogram is normal, and this one has a single clear hump","Yes \u2014 the tail proves the standard deviation is large, and large spread makes data normal","No \u2014 normal data can never come from a class of students, because class marks are always skewed"],
    "Symmetry is the test. A long tail on one side means the data are skewed, however the rest looks; a normal curve's two halves mirror each other.",{});},
  function(){return mcq("Which is the best first check of whether a data set approximates a normal distribution?",
    "Graph it and look for a single-peaked, roughly symmetric bell shape centred near the mean and median",
    ["Check that the standard deviation is larger than the mean, because normal data spread wider","Check that there are exactly \\(100\\) values in the set, because a normal shape needs that many values","Check that the highest and lowest values are equal, because the extremes of a normal distribution match"],
    "Normal data announce themselves in the graph: one peak, mirror-image sides, and centre measures that nearly coincide.",{});}
]));
E("u5-compare-normal",5,["8.13"],2,"gen",function(){
  var m=ri(10,20),s1=ri(1,3),s2=s1+ri(2,4);
  var q = mcq("Two bakeries' morning prep times are normally distributed with the same mean, \\("+m+"\\) minutes. Bakery A has a standard deviation of \\("+s1+"\\) minutes; Bakery B, \\("+s2+"\\) minutes. Which statement is correct?",
    "Bakery B's times are more spread out, and its curve is wider and flatter",
    ["Bakery A is more spread out, because a small standard deviation means more variation","Both bakeries are equally consistent, because their means are equal here","Bakery B must have the higher mean, because its standard deviation is larger"],
    "The standard deviation is the spread. \\("+s2+" > "+s1+"\\), so Bakery B varies more, and its normal curve spreads wider and flatter to keep the same area.",{m:m,s1:s1,s2:s2});
  q.figure = normSVG({mu:m, sd:s1, curve2:{sd:s2, tagA:"A: \u03C3 = "+s1, tagB:"B: \u03C3 = "+s2}});
  return q;
});
E("u5-empirical",5,["8.14"],1,"gen",function(){
  var ctx=pick([{w:"mass of loaves of bread",u:"g"},{w:"lifespan of a brand of battery",u:"hours"},{w:"finishing times in a fun run",u:"minutes"},{w:"length of fish of one species",u:"cm"}]);
  var mu=ri(20,60)*10,sd=pick([5,10,15,20]);var k=pick([1,2]);var pct=k===1?68:95;
  var q = numq("The "+ctx.w+" is normally distributed with mean \\("+mu+"\\) "+ctx.u+" and standard deviation \\("+sd+"\\) "+ctx.u+". About what percent of the values lie between \\("+(mu-k*sd)+"\\) and \\("+(mu+k*sd)+"\\) "+ctx.u+"? (Just the number.)",
    pct,0.01,"That interval is the mean \\(\\pm "+k+"\\) standard deviation"+(k>1?"s":"")+". By the empirical rule, about <b>\\("+pct+"\\%\\)</b> of a normal distribution lies within \\("+k+"\\) standard deviation"+(k>1?"s":"")+" of the mean.",{mu:mu,sd:sd,k:k});
  q.figure = normSVG({mu:mu, sd:sd, lo:mu-k*sd, hi:mu+k*sd});
  return q;
});
E("u5-normal-count",5,["8.14"],2,"gen",function(){
  var N=pick([400,800,1000,2000]);var mu=ri(30,60),sd=pick([4,5,6,8,10]);
  var side=Math.random()<0.5;var ans=side?0.16*N:0.025*N;var thr=side?mu+sd:mu+2*sd;
  var q = numq("Heights of seedlings are normally distributed with mean \\("+mu+"\\) cm and standard deviation \\("+sd+"\\) cm. Out of "+N+" seedlings, about how many are taller than \\("+thr+"\\) cm?",
    Math.round(ans),N*0.01+1,"Above the mean \\(+ "+(side?1:2)+"\\) standard deviation"+(side?"":"s")+" lies about \\("+(side?"16\\%":"2.5\\%")+"\\) of a normal distribution (half of the \\("+(side?"32\\%":"5\\%")+"\\) outside \\(\\pm "+(side?1:2)+"\\sigma\\)). <b>\\("+(side?"0.16":"0.025")+" \\times "+N+" = "+Math.round(ans)+"\\)</b>.",{N:N,mu:mu,sd:sd});
  q.figure = normSVG({mu:mu, sd:sd, lo:thr, hi:mu+3.4*sd, cuts:[{v:thr, label:""+thr}]});
  return q;
});
/* --- z-scores (8.15) --- */
E("u5-z-calc",5,["8.15"],1,"gen",function(){
  var mu=ri(30,80),sd=pick([4,5,8,10]);var zd=pick([-2,-1.5,-1,-0.5,0.5,1,1.5,2,2.5]);var x=mu+zd*sd;
  return numq("A value of \\("+x+"\\) comes from a normal distribution with mean \\("+mu+"\\) and standard deviation \\("+sd+"\\). What is its <b>z-score</b>?",
    zd,0.011,"<b>\\(z = \\frac{"+x+" - "+mu+"}{"+sd+"} = "+fmt(zd)+"\\)</b>. The z-score counts how many standard deviations the value sits from the mean.",{mu:mu,sd:sd,x:x});
});
E("u5-z-compare",5,["8.15"],2,"gen",function(){
  var people=[["Alex","Sam"],["Priya","Noor"],["Jack","Owen"],["Mia","Ella"],["Liam","Lucas"]];
  var pr=pick(people);
  function mk(){var mu=ri(55,75),sd=pick([5,8,10]),z=pick([0.5,1,1.5,2,2.5]);return {mu:mu,sd:sd,z:z,x:mu+z*sd};}
  var a=mk(),b=mk(),guard=0;while(b.z===a.z&&guard++<20){b=mk();}
  var winner=a.z>b.z?pr[0]:pr[1];
  return mcq(pr[0]+" scored \\("+a.x+"\\) on a test with mean \\("+a.mu+"\\) and standard deviation \\("+a.sd+"\\). "+pr[1]+" scored \\("+b.x+"\\) on a different test with mean \\("+b.mu+"\\) and standard deviation \\("+b.sd+"\\). Who did better, relative to their class?",
    winner+", with a z-score of \\("+fmt(Math.max(a.z,b.z))+"\\) compared to \\("+fmt(Math.min(a.z,b.z))+"\\)",
    [(winner===pr[0]?pr[1]:pr[0])+", because that raw score is on the harder test","They did equally well, both above their means","The higher raw mark, since z-scores ignore class results"],
    pr[0]+"'s \\(z = \\frac{"+a.x+" - "+a.mu+"}{"+a.sd+"} = "+fmt(a.z)+"\\); "+pr[1]+"'s \\(z = \\frac{"+b.x+" - "+b.mu+"}{"+b.sd+"} = "+fmt(b.z)+"\\). Z-scores put both on the same scale, and "+winner+"'s is higher.",{a:a,b:b,winner:winner});
});
E("u5-z-backwards",5,["8.15"],2,"gen",function(){
  var mu=ri(30,60),sd=pick([4,6,8]);var z=pick([1.5,1.8,2,-1.5,0.8]);var x=mu+z*sd;
  return numq("Tomato plants in a greenhouse have heights with mean \\("+mu+"\\) cm and standard deviation \\("+sd+"\\) cm. A plant is \\("+fmt(Math.abs(z))+"\\) standard deviations "+(z>=0?"above":"below")+" the mean. How tall is the plant, in cm?",
    Math.round(x*10)/10,0.06,"Work backwards: <b>\\(x = \\mu + z\\sigma = "+mu+" + ("+fmt(z)+")("+sd+") = "+fmt(x)+"\\)</b> cm.",{mu:mu,sd:sd,z:z});
});
E("u5-z-prob",5,["8.15"],1,"gen",function(){
  var mags=[0.25,0.3,0.5,0.6,0.64,0.75,0.85,0.9,1,1.18,1.2,1.25,1.5,1.75,1.8,1.86,1.97,2,2.1,2.25,2.4,2.5,2.8];
  var a=pick(mags)*(Math.random()<0.5?-1:1);
  var right=Math.random()<0.4;var cdf=zTab(a);var ans=right?Math.round((1-cdf)*10000)/10000:cdf;
  var lead=pick(["Using the standard normal table, find","For the standard normal distribution, find"]);
  var q = numq(lead+" \\(P(z "+(right?">":"<")+" "+fmt(a)+")\\). Give your answer as a decimal to four places (for example, 0.1234).",
    ans,0.0011,"The table gives the area to the left: \\(P(z < "+fmt(a)+") = "+fmtF(cdf,4)+"\\)"+(right?". The right tail is <b>\\(1 - "+fmtF(cdf,4)+" = "+fmtF(ans,4)+"\\)</b>":"."),{a:a,right:right});
  q.figure = normSVG({mu:0, sd:1, lo:(right? a : -3.4), hi:(right? 3.4 : a), cuts:[{v:a, label:"z = "+fmt(a)}]});
  return q;
});
E("u5-z-applied",5,["8.15"],2,"gen",function(){
  var FAMS=[
    {w:"amount of sleep teenagers get on school nights",unit:"hours",mus:[[7.2,0.8],[7.6,0.9],[8.1,0.7],[6.9,1.1]],hi:{verb:"sleep at least",zs:[1,1.5,2]},lo:{verb:"sleep less than",zs:[-1,-1.5,-2]}},
    {w:"lifetimes of a brand of light bulb",unit:"hours",mus:[[1200,90],[1100,120],[1350,75],[1000,150]],hi:{verb:"last at least",zs:[1,1.5,2]},lo:{verb:"burn out in less than",zs:[-1,-1.25,-2]}},
    {w:"masses of bags of apples",unit:"kg",mus:[[2.5,0.3],[3,0.4],[4.2,0.5],[1.8,0.25]],hi:{verb:"weigh at least",zs:[1,1.5,2.5]},lo:{verb:"weigh less than",zs:[-1,-1.5,-2]}},
    {w:"scores on a provincial exam",unit:"points",mus:[[68,9],[72,8],[65,11],[75,10]],hi:{verb:"score at least",zs:[1,1.5,2]},lo:{verb:"score less than",zs:[-1,-1.5,-2]}},
    {w:"morning commute times for city workers",unit:"minutes",mus:[[38,7],[42,9],[35,6],[47,10]],hi:{verb:"take at least",zs:[1,1.5,2]},lo:{verb:"take less than",zs:[-1,-1.5,-2]}},
    {w:"heights of tomato plants",unit:"cm",mus:[[54,6],[61,7.5],[48,5],[57,8]],hi:{verb:"grow to at least",zs:[1,1.5,2]},lo:{verb:"grow to less than",zs:[-1,-1.5,-2]}}
  ];
  var fam=pick(FAMS);var ms=pick(fam.mus);var mu=ms[0],sd=ms[1];
  var up=Math.random()<0.5;var dir=up?fam.hi:fam.lo;var z0=pick(dir.zs);
  var thr=Math.round((mu+z0*sd)*10)/10;
  var z=(thr-mu)/sd;var cdf=zTab(z);var p=up?1-cdf:cdf;var pct=Math.round(p*10000)/100;
  var q=numq("Values for "+fam.w+" are normally distributed with mean \\("+fmt(mu)+"\\) "+fam.unit+" and standard deviation \\("+fmt(sd)+"\\) "+fam.unit+". What percent (to two decimal places) "+dir.verb+" \\("+fmt(thr,1)+"\\) "+fam.unit+"? (Just the number.)",
    pct,0.06,"\\(z = \\frac{"+fmt(thr,1)+" - "+fmt(mu)+"}{"+fmt(sd)+"} = "+fmt(z)+"\\). From the table, the area "+(up?"to the right of":"to the left of")+" \\(z = "+fmt(z)+"\\) is \\("+fmt(p,4)+"\\), about <b>\\("+fmt(pct)+"\\%\\)</b>.",{ctx:{thr:thr,mu:mu,sd:sd,verb:dir.verb}});
  q.figure=normSVG({mu:mu, sd:sd, lo:(up? thr : mu-3.4*sd), hi:(up? mu+3.4*sd : thr), cuts:[{v:thr, label:""+fmt(thr,1)}]});
  return q;
});
/* --- confidence intervals (8.17-8.22) --- */
E("u5-ci-endpoint",5,["8.17"],1,"gen",function(){
  var p=pick([52,57,63,68,74,81]);var moe=Math.round(rf(3,7)*2)/2;var askUp=Math.random()<0.5;
  var ans=askUp?p+moe:p-moe;
  return numq("A survey reports that \\("+p+"\\%\\) of residents support a new rink, with a margin of error of \\(\\pm "+fmt(moe)+"\\) percentage points. What is the "+(askUp?"upper":"lower")+" endpoint of the confidence interval, as a percent? (Just the number.)",
    ans,0.011,"Confidence interval \\(= "+p+"\\% \\pm "+fmt(moe)+"\\), so the interval runs from \\("+fmt(p-moe)+"\\% \\text{ to } "+fmt(p+moe)+"\\%\\). The "+(askUp?"upper":"lower")+" endpoint is <b>\\("+fmt(ans)+"\\%\\)</b>.",{p:p,moe:moe,askUp:askUp});
});
E("u5-ci-from-endpoints",5,["8.17"],1,"gen",function(){
  var fam=pick([
    {pre:"A \\(95\\%\\) confidence interval for the percentage of residents who support a new arena runs from ",unit:"%",mus:[38,42.5,47,51.5,55,58.5,63,67,71.5,74],halfs:[1.8,2.4,2.9,3.1,3.6,4.2,4.8]},
    {pre:"A \\(95\\%\\) confidence interval for mean battery life runs from ",unit:" hours",mus:[16.5,17.6,18.4,19.2,20.5,22.8],halfs:[0.6,0.8,1.1,1.4,1.9,2.3]},
    {pre:"A \\(95\\%\\) confidence interval for the mean quiz score runs from ",unit:" points",mus:[71.5,74,76.5,79,82.5],halfs:[1.5,2,2.6,3.4,4.1]}]);
  var mid=pick(fam.mus),half=pick(fam.halfs);var askMoe=Math.random()<0.5;
  var ep=function(v){return "\\("+fmt(v)+(fam.unit==="%"?"\\%":"")+"\\)";};
  return numq(fam.pre+ep(mid-half)+(fam.unit==="%"?"":fam.unit)+" to "+ep(mid+half)+(fam.unit==="%"?"":fam.unit)+". What is the "+(askMoe?"margin of error":"mean at the centre of the interval")+"?",
    askMoe?half:mid,0.011,"The interval is centred at \\(\\frac{"+fmt(mid-half)+" + "+fmt(mid+half)+"}{2} = "+fmt(mid)+"\\), and it stretches \\("+fmt(half)+"\\) each way, so the margin of error is \\(\\pm "+fmt(half)+"\\). The "+(askMoe?"margin of error":"centre")+" is <b>\\("+fmt(askMoe?half:mid)+"\\)</b>.",{mid:mid,half:half,askMoe:askMoe});
});
E("u5-ci-count",5,["8.19"],2,"gen",function(){
  var p=ri(52,68),moe=pick([3,4,5]);var N=pick([800,1200,2000,18000]);var askMax=Math.random()<0.5;
  var ans=Math.round(N*(askMax?p+moe:p-moe)/100);
  return numq("In a town of "+N+" voters, a poll finds \\("+p+"\\% \\pm "+moe+"\\) support a proposal. About how many voters is the "+(askMax?"largest":"smallest")+" plausible number of supporters?",
    ans,N*0.002+1,"The interval is \\("+(p-moe)+"\\% \\text{ to } "+(p+moe)+"\\%\\). The "+(askMax?"top":"bottom")+" end is <b>\\("+(askMax?p+moe:p-moe)+"\\% \\text{ of } "+N+" = "+ans+"\\)</b> voters.",{p:p,moe:moe,N:N,askMax:askMax});
});
E("u5-ci-samplesize",5,["8.18"],1,"var",varset([
  function(){return mcq("The same survey is run three times with random samples of \\(25\\), \\(250\\) and \\(2{,}500\\) people. Which sample gives the smallest margin of error, and why?",
    "The sample of \\(2{,}500\\) \u2014 larger random samples vary less from the population value, so the interval narrows",
    ["The sample of \\(25\\) \u2014 fewer people means fewer mistakes, and each person asked counts for more in the result","All three give the same margin of error, because the survey is the same and the question wording never changes at all","The sample of \\(250\\) \u2014 medium samples are the most reliable, because they balance the small samples and the large ones"],
    "Margin of error shrinks as the sample grows: more data averages out the randomness. (Roughly, multiplying the sample by \\(100\\) divides the margin of error by \\(10\\).)",{});},
  function(){return mcq("A town polls 80 riders and finds \\(58\\% \\pm 10\\%\\) use the bus daily. It polls 800 riders and gets \\(58\\% \\pm 3\\%\\). What changed?",
    "The larger sample narrowed the margin of error, so the estimate is more precise",
    ["The larger sample changed the true percentage of riders who use the bus daily overall","The margin of error grew because more people were asked and answered","Nothing \u2014 the percentages are the same, so both polls say the same thing"],
    "Same centre, tighter interval: \\(55\\% \\text{ to } 61\\%\\) instead of \\(48\\% \\text{ to } 68\\%\\). Bigger random samples pin the value down more closely.",{});},
  function(){return mcq("A polling firm wants to cut its margin of error roughly in half. What should it do to its sample?",
    "Use a much larger random sample \u2014 roughly four times as many people, because the margin of error shrinks with the square root of the sample size",
    ["Ask exactly twice as many people \u2014 double the sample, half the error, because the margin shrinks in direct proportion to the sample size each time","Survey the same people twice and average the two results, because asking twice gives the firm twice as much information as asking once","Nothing \u2014 the sample size does not affect the margin of error, because the margin is set by the question and by how the firm reports it"],
    "Margin of error behaves like \\(\\frac{1}{\\sqrt{n}}\\): quadrupling \\(n\\) halves it. Doubling the sample only shrinks it by a factor of about \\(1.4\\).",{});}
,
function(){return mcq("Four surveys ask the same question using random samples of \\(120\\), \\(480\\), \\(1{,}200\\) and \\(3{,}000\\) people. Which sample gives the LEAST margin of error?",
    "\\(3{,}000\\) \u2014 the largest sample, so its results vary least from the population value",
    ["\\(120\\) \u2014 the smallest sample has the least room for error, because fewer answers can go wrong","\\(480\\) \u2014 a medium sample balances cost and accuracy, and middle samples are the most reliable","All four give the same margin of error \u2014 only the question matters, nothing else"],
    "Larger random samples sit closer to the population value, so their margins of error are smaller.",{});},
  function(){return mcq("Four surveys ask the same question using random samples of \\(45\\), \\(180\\), \\(720\\) and \\(1{,}500\\) people. Which sample gives the GREATEST margin of error?",
    "\\(45\\) \u2014 the smallest sample, so it can stray furthest from the population value",
    ["\\(1{,}500\\) \u2014 the largest sample has the most room for error, because more people answer","\\(720\\) \u2014 a medium sample is the least stable, sitting between the two","All four give the same margin of error \u2014 only the question matters, and it never changes"],
    "Small samples bounce around more: with only \\(45\\) people, the sample percentage can land far from the true one, which is exactly what a big margin of error says.",{});},
  function(){return mcq("Instead of sampling, a town surveys EVERY household \u2014 a census. What happens to the margin of error?",
    "There is no sampling margin of error \u2014 the count IS the population value, so there is no sampling gap to allow for",
    ["It doubles, because there are more responses to process and each one adds its own sampling error to the total","It stays whatever it would be for a sample of \\(1{,}000\\), because a census is counted just like any other survey","It becomes \\(100\\%\\), because the whole population was asked and the margin grows to match the population size in the end"],
    "Margin of error exists because a sample might not mirror the population. Survey everyone and that particular uncertainty disappears (people can still misreport, but that is a different problem).",{});}
]));
E("u5-ci-level",5,["8.18"],2,"var",varset([
  function(){return mcq("A researcher recomputes the same survey results at a \\(99\\%\\) confidence level instead of \\(95\\%\\). What happens to the interval?",
    "It gets wider \u2014 being right more often requires allowing a bigger range",
    ["It gets narrower \u2014 higher confidence means a better estimate","It stays the same \u2014 the confidence level does not affect the interval","The centre moves to \\(99\\%\\) - the interval shifts up with the level too"],
    "There is a trade-off: to capture the true value \\(99\\) times out of \\(100\\) instead of \\(95\\), the interval must stretch. Higher confidence, wider interval, same centre.",{});},
  function(){return mcq("What does a \\(95\\%\\) confidence level mean?",
    "In the long run, intervals built this way capture the true population value about \\(95\\) times out of \\(100\\) (\\(19\\) times out of \\(20\\))",
    ["\\(95\\%\\) of the sample agreed with the result, and the rest of the sample gave the opposite answer to the same question","There is a \\(95\\%\\) chance this one interval is exactly centred on the true value, and the rest of the chance is that it misses entirely","\\(95\\%\\) of the population was surveyed, so the result covers nearly every person in the group being described in the study"],
    "The \\(95\\%\\) describes the method's long-run success rate: repeat the survey many times and about \\(19\\) of every \\(20\\) intervals contain the true value.",{});},
  function(){return mcq("Two reports use the SAME survey. One gives a \\(90\\%\\) confidence interval of \\(51\\% \\pm 3\\%\\). The other gives a \\(99\\%\\) interval from the same data. What must be true of the \\(99\\%\\) interval?",
    "Its margin of error is larger than \\(3\\%\\) \u2014 higher confidence is bought with a wider interval",
    ["Its margin of error is smaller than \\(3\\%\\) - higher confidence gives a tighter interval estimate","It is centred on a different percentage, because a new level moves the centre too","It must be wrong, because a survey produces only one correct interval for its data"],
    "Same data, same centre (\\(51\\%\\)). Raising the confidence level stretches the interval both ways, so the margin of error grows past \\(3\\%\\).",{});}
,
function(){return mcq("Intervals are computed from the SAME survey data at \\(90\\%\\), \\(95\\%\\) and \\(99\\%\\) confidence. Which statement is true?",
    "All three are centred on the same value; the \\(99\\%\\) interval is the widest and the \\(90\\%\\) interval is the narrowest",
    ["The \\(99\\%\\) interval is the narrowest, because it is the most certain, and the most certain interval is always the tightest one","Each confidence level gives an interval centred on a different value, because the centre is worked out again for each level","Only the \\(95\\%\\) interval can be correct, because the other two levels are not the standard ones used in reports"],
    "The centre comes from the data and does not move. Demanding more confidence stretches the interval wider around that same centre.",{});},
  function(){return mcq("A weather station reports mean June rainfall as \\(84\\) mm, with a \\(95\\%\\) confidence interval of \\(78\\) mm to \\(90\\) mm. If the SAME data were reported at \\(99\\%\\) confidence, what would the interval look like?",
    "Still centred on \\(84\\) mm, but wider than \\(78\\) mm to \\(90\\) mm",
    ["Still centred on \\(84\\) mm, but narrower \u2014 about \\(80\\) mm to \\(88\\) mm","Centred on \\(99\\) mm instead of \\(84\\) mm, with the same width","Exactly the same: \\(78\\) mm to \\(90\\) mm, because nothing changes"],
    "Raising the confidence level never moves the centre and never narrows the interval \u2014 it widens it, so the method captures the true value more often.",{});}
]));
E("u5-ci-majority",5,["8.19","8.21"],3,"gen",function(){
  var supported=Math.random()<0.5;var p,moe;
  if(supported){moe=pick([2,3,4]);p=ri(50+moe+2,68);}else{moe=pick([4,5,6]);p=ri(51,49+moe);}
  var lo=p-moe,hi=p+moe;
  return mcq("A headline announces: \u201CMost teens support a later school start time!\u201D The survey behind it found \\("+p+"\\%\\) support, with a margin of error of \\(\\pm "+moe+"\\) points. Is the headline justified?",
    supported?"Yes \u2014 the whole interval, \\("+lo+"\\% \\text{ to } "+hi+"\\%\\), sits above \\(50\\%\\), so a majority is plausible throughout":"No \u2014 the interval, \\("+lo+"\\% \\text{ to } "+hi+"\\%\\), dips below \\(50\\%\\), so support could actually be a minority",
    [supported?"No \u2014 surveys can never justify the word \u2018most\u2019, however far above half the reported figure sits":"Yes \u2014 \\("+p+"\\%\\) is more than half, and that settles it, so the headline can treat it as settled fact",
     "Yes \u2014 the margin of error is small enough to ignore, because a few points change nothing","The headline is justified only if the sample was larger than \\(1{,}000\\), since small samples cannot support it"],
    "\u2018Most\u2019 means more than \\(50\\%\\). The interval runs \\("+lo+"\\% \\text{ to } "+hi+"\\%\\)"+(supported?", entirely above \\(50\\%\\), so the claim holds up.":", and it crosses below \\(50\\%\\), so the honest headline is \u2018about half of teens support\u2026\u2019.")+" Always check whether the whole interval clears the claim's bar.",
    {p:p,moe:moe,supported:supported});
});
E("u5-media",5,["8.20","8.21","8.22"],3,"var",varset([
  function(){return mcq("A news report says support for a new ferry sailing is \\(56\\%\\) and calls it \u2018overwhelming\u2019. The poll's margin of error is \\(\\pm 6\\) points. What is the fairest criticism?",
    "\u2018Overwhelmingly\u2019 is too strong \u2014 the interval \\(50\\% \\text{ to } 62\\%\\) is consistent with support being barely half",
    ["The report is fine, because \\(56\\%\\) is a majority, and a result above half can fairly be called overwhelming","The poll must be wrong, because its margin of error is positive, and any margin above zero makes the figure untrustworthy","Nothing \u2014 word choice does not matter in statistics, so reporters may use whatever words seem strongest"],
    "\\(56\\% \\pm 6\\) gives \\(50\\% \\text{ to } 62\\%\\). A result that could be a coin-flip is real support, but \u2018overwhelming\u2019 overstates what the numbers carry.",{});},
  function(){return mcq("A toothpaste ad announces: \u2018Nine out of ten dentists recommend our brand!\u2019 The fine print reveals the survey behind it: the company asked \\(10\\) dentists, every one of them a paid consultant for the company, and \\(9\\) said yes. Does the claim hold up as evidence about dentists in general?",
    "No \u2014 the \u2018sample\u2019 is \\(10\\) dentists hand-picked and paid by the company itself, so the result says nothing reliable about dentists in general",
    ["Yes \u2014 \\(9\\) out of \\(10\\) is \\(90\\%\\), an overwhelming majority of dentists, and a result that one-sided settles the question for dentists everywhere","Yes \u2014 dentists are experts, so their answers settle the question completely, and expert surveys need no fair sample behind them","No \u2014 \\(9\\) out of \\(10\\) cannot be turned into a percentage, so the claim is meaningless as evidence about dentists in general"],
    "A result is only as good as the sample behind it. Ten people chosen by the seller, with a financial tie to the company, are not a fair sample of dentists \u2014 \u20189 out of 10\u2019 describes those \\(10\\) consultants, not the profession.",{});},
  function(){return mcq("A radio station asks listeners to text in whether the town should build a new arena. More than \\(4{,}000\\) texts come in, and \\(78\\%\\) of them say yes. The station reports: \u2018The town strongly supports the arena.\u2019 Does the claim hold up?",
    "No \u2014 the respondents chose themselves, so \\(78\\%\\) measures the station's motivated listeners, not the town; the sample does not represent the population",
    ["Yes \u2014 \\(78\\%\\) is a large majority, so the town clearly supports the arena, and a share that large leaves no doubt where the town stands","Yes \u2014 over \\(4{,}000\\) responses is a big sample, and big samples are reliable, because a sample that large must reflect the whole town, whoever took part","No \u2014 a vote taken after dark cannot count toward a town decision, because responses sent in at night are no valid part of a town survey"],
    "Size is not the issue \u2014 who got counted is. A text-in poll only hears from people who listen to that station and felt strongly enough to respond, so the \\(78\\%\\) cannot be extended to the whole town. A much smaller random sample would say far more.",{});},
  function(){return mcq("A community garden group reports: \u2018In our survey of 300 residents, \\(67\\% \\pm 4\\) support expanding the garden.\u2019 A councillor says the survey proves most residents support the expansion. Is the councillor right?",
    "Yes \u2014 the interval \\(63\\% \\text{ to } 71\\%\\) lies entirely above \\(50\\%\\), so a majority is supported throughout the interval",
    ["No \u2014 \\(67\\%\\) of a sample never proves anything about residents, because a sample describes only its respondents","No \u2014 the margin of error means support could be under half, since the margin can pull the true figure below half in the end","Yes \u2014 but only because \\(300\\) is a large sample, since a sample that size makes the result exact for the town"],
    "The whole confidence interval clears \\(50\\%\\), so the majority claim is as solid as polling gets: the plausible range for true support is \\(63\\% \\text{ to } 71\\%\\).",{});}
]));
E("u5-interpret-ci",5,["8.21"],2,"var",varset([
  function(){return mcq("A poll reports a candidate at \\(49\\%\\) with a margin of error of \\(\\pm 3.1\\) points, \\(19\\) times out of \\(20\\). What is the correct reading?",
    "The candidate's true support is plausibly between \\(45.9\\%\\) and \\(52.1\\%\\), and intervals built this way are right about \\(19\\) times in \\(20\\)",
    ["The candidate will get exactly \\(49\\%\\) of the vote on election day, because a poll's percentage is what the election will produce","The candidate is definitely behind, because \\(49\\%\\) is less than half, and a figure below half can never finish ahead once the votes are counted","The margin of error means the poll is off by exactly \\(3.1\\) points, because the margin states the poll's exact error in advance"],
    "Add and subtract the margin of error: \\(45.9\\% \\text{ to } 52.1\\%\\). The \u2018\\(19\\) times out of \\(20\\)\u2019 is the confidence level \u2014 the method's long-run record, not a guarantee for this one poll.",{p:49,moe:3.1});},
  function(){return mcq("A city survey of 400 adults finds \\(62\\%\\) support a new compost pickup, with a margin of error of \\(\\pm 4.9\\) points, \\(19\\) times out of \\(20\\). What is the correct reading?",
    "True support is plausibly between \\(57.1\\%\\) and \\(66.9\\%\\), and intervals built this way contain the truth about \\(19\\) times in \\(20\\)",
    ["Exactly \\(62\\%\\) of all adults in the city support the pickup, because the sample percentage is the whole city's percentage too","Support is certainly between \\(57.1\\%\\) and \\(66.9\\%\\) \u2014 the survey method cannot miss, and the method behind it cannot miss the truth","The result is off by exactly \\(4.9\\) people out of the \\(400\\) surveyed, because the margin counts the people the survey got wrong"],
    "Add and subtract the margin of error: \\(62 - 4.9 = 57.1\\) and \\(62 + 4.9 = 66.9\\). \u2018\\(19\\) times out of \\(20\\)\u2019 describes the method's long-run success rate, not a promise about this one survey.",{p:62,moe:4.9});},
  function(){return mcq("A poll reports \\(38\\%\\) of voters preferring a four-day school week, with a margin of error of \\(\\pm 3\\) points, \\(19\\) times out of \\(20\\). Which statement is correct?",
    "The true share of all voters who prefer it is plausibly somewhere from \\(35\\%\\) to \\(41\\%\\)",
    ["There is a \\(95\\%\\) chance the true share is exactly \\(38\\%\\), as the level guarantees","The share of all voters is \\(38\\%\\), give or take exactly \\(3\\) people in the end","Any result outside \\(35\\%\\) to \\(41\\%\\) would prove the poll was rigged, without any exception"],
    "The confidence interval is \\(38 \\pm 3\\), that is \\(35\\% \\text{ to } 41\\%\\). It is a plausible range for the true value, built by a method that works about \\(19\\) times in \\(20\\) \u2014 not a certainty and not a count of people.",{p:38,moe:3});}
]));

/* ============ Prior knowledge tranche (November 15, 2026) ============
   Cluster 5 (Statistical Reasoning prerequisites), borrowed set.
   Provenance, one line per entry (host id: source entry in its home
   bank, the feeder indicator it assesses, verified by draw sweep):
   - u5-pk-sample-or-population: copied from math-9 u9-sample-or-population, indicator 11.3.
   - u5-pk-generalization-critique: copied from math-9 u9-generalization-critique, indicator 11.6.
   - u5-pk-freq-mean: copied from math-9 u9-gap-freq-mean-mc, indicator 11.9; that entry is
     itself pkFlagged in the Math 9 bank, where it assesses Grade 7 centre content, and it is
     copied here under the same judgement one course up.
   - u5-pk-sample-scale: copied from math-9 u9-gap-sample-scale-cr, indicator 11.6.
   - u5-pk-supported-conclusion: copied from math-9 u9-supported-conclusion, indicator 11.9.
   The four PK.1 entries earlier in this file stay coded and untouched;
   these five carry pkFlag, set by the pass at the end of this section.
   Their indicator tags are support tags (the Math 2201 indicator each
   one feeds), not assessed targets: what each item assesses is in its
   pkSrc property, and the full dependent list is in pkFor. */
E("u5-pk-sample-or-population", 5, ["8.19"], 1, "var", varset([
  function(){
    return mcq("A population is everyone in the group being studied, and a sample is part of that group. A principal asks every student in the school about lunch choices for the cafeteria. Which option classifies this correctly?",
      {t:"A population, because everyone in the group being studied was included in the asking", fb:"Right: every student in the school was asked, so the whole group being studied took part."},
      [{t:"A sample, because everyone in the group being studied was included in the asking", fb:"The reason describes everyone taking part, which is a population, so the label and reason clash."},
       {t:"A population, because only part of the group being studied was included in the asking", fb:"The reason describes only part taking part, which is a sample, so the label and reason clash."},
       {t:"A sample, because the students who were asked were chosen by drawing names at random", fb:"No names were drawn here; the principal asked every student in the school directly."}],
      "When everyone in the group being studied is included, the study uses a population. The correct classification is <b>a population, because everyone in the group was included</b>.",
      {mode:"sampop-school"});
  },
  function(){
    return mcq("A population is everyone in the group being studied, and a sample is part of that group. A factory tests 20 batteries from a shipment of 2000 to check battery life. Which option classifies this correctly?",
      {t:"A sample, because only part of the group being studied was included in the testing", fb:"Right: 20 batteries out of 2000 is part of the shipment, so the factory tested a sample."},
      [{t:"A population, because only part of the group being studied was included in the testing", fb:"The reason describes only part taking part, which is a sample, so the label and reason clash."},
       {t:"A sample, because everyone in the group being studied was included in the testing", fb:"The reason describes everyone taking part, which is a population, so the label and reason clash."},
       {t:"A population, because the batteries that were tested were chosen by drawing at random", fb:"Random choice still tests only part of the shipment, and a part is always a sample."}],
      "When only part of the group being studied is included, the study uses a sample. The correct classification is <b>a sample, because only part of the group was included</b>.",
      {mode:"sampop-batteries"});
  },
  function(){
    return mcq("A population is everyone in the group being studied, and a sample is part of that group. A club president asks all 12 members of a small chess club about a new meeting day. Which option classifies this correctly?",
      {t:"A population, because everyone in the group being studied was included in the asking", fb:"Right: all 12 members were asked, so the whole group being studied took part in full."},
      [{t:"A sample, because everyone in the group being studied was included in the asking", fb:"The reason describes everyone taking part, which is a population, so the label and reason clash."},
       {t:"A population, because only part of the group being studied was included in the asking", fb:"The reason describes only part taking part, which is a sample, so the label and reason clash."},
       {t:"A sample, because the members who were asked were chosen by drawing names at random", fb:"No names were drawn here; the president asked all 12 members of the club directly."}],
      "When everyone in the group being studied is included, the study uses a population. The correct classification is <b>a population, because everyone in the group was included</b>.",
      {mode:"sampop-chess"});
  },
  function(){
    return mcq("A population is everyone in the group being studied, and a sample is part of that group. A grocer checks 25 apples from a shipment of 500 apples for bruises. Which option classifies this correctly?",
      {t:"A sample, because only part of the group being studied was included in the checking", fb:"Right: 25 apples out of 500 is part of the shipment, so the grocer checked a sample."},
      [{t:"A population, because only part of the group being studied was included in the checking", fb:"The reason describes only part taking part, which is a sample, so the label and reason clash."},
       {t:"A sample, because everyone in the group being studied was included in the checking", fb:"The reason describes everyone taking part, which is a population, so the label and reason clash."},
       {t:"A population, because the apples that were checked were chosen by drawing at random", fb:"Random choice still checks only part of the shipment, and a part is always a sample."}],
      "When only part of the group being studied is included, the study uses a sample. The correct classification is <b>a sample, because only part of the group was included</b>.",
      {mode:"sampop-apples"});
  },
  function(){
    return mcq("A population is everyone in the group being studied, and a sample is part of that group. A town studying all its households surveys every household on one street, Bay Street, and no others. Which option classifies this correctly?",
      {t:"A sample, because only part of the group being studied was included in the survey", fb:"Right: the group studied is all town households, and one street is only part of that group."},
      [{t:"A population, because only part of the group being studied was included in the survey", fb:"The reason describes only part taking part, which is a sample, so the label and reason clash."},
       {t:"A sample, because everyone in the group being studied was included in the survey", fb:"The reason describes everyone taking part, but households on other streets were left out."},
       {t:"A population, because every household on the chosen street answered the survey fully", fb:"Full answers on one street still cover only part of all the households in the town."}],
      "The group being studied is all households in the town, and one street is only part of it, so the study uses a sample. The correct classification is <b>a sample, because only part of the group was included</b>.",
      {mode:"sampop-street"});
  },
  function(){
    return mcq("A population is everyone in the group being studied, and a sample is part of that group. A swim coach times every one of the 14 swimmers on the team during a practice. Which option classifies this correctly?",
      {t:"A population, because everyone in the group being studied was included in the timing", fb:"Right: all 14 swimmers on the team were timed, so the whole group being studied took part."},
      [{t:"A sample, because everyone in the group being studied was included in the timing", fb:"The reason describes everyone taking part, which is a population, so the label and reason clash."},
       {t:"A population, because only part of the group being studied was included in the timing", fb:"The reason describes only part taking part, which is a sample, so the label and reason clash."},
       {t:"A sample, because the swimmers who were timed were chosen by drawing names at random", fb:"No names were drawn here; the coach timed every swimmer on the team directly."}],
      "When everyone in the group being studied is included, the study uses a population. The correct classification is <b>a population, because everyone in the group was included</b>.",
      {mode:"sampop-swim"});
  }
]), ["First name the group being studied, then ask whether all of it or only part of it took part.", "Compare the group named in the question with the group that actually took part."]);
E("u5-pk-generalization-critique", 5, ["8.22"], 3, "var", varset([
  function(){
    return mcq("Jordan asks 5 close friends at lunch and then claims that all teenagers in town love a new skate shop. Which option gives the soundest critique of this generalization from a sample?",
      {t:"The sample is too small and made only of friends, so it cannot speak for all teenagers in town", fb:"Right: five friends share tastes and miss most teenagers, so the claim reaches far beyond the sample."},
      [{t:"The claim is sound, because friends usually know what other teenagers in town will enjoy", fb:"Friends share the same circle, so their tastes are a poor guide to every teenager in town."},
       {t:"The sample is too large for a lunch break study, so fewer students should have been asked", fb:"Five is a very small sample, not a large one; size in the other direction is the problem."},
       {t:"The claim is sound, because the question was asked directly rather than through a survey form", fb:"Asking directly does not fix a tiny group of friends standing in for a whole town of teenagers."}],
      "A generalization is only as good as the sample behind it: a claim about a whole population needs a sample large enough and representative enough to support it. The sound critique is <b>the sample is too small and made only of friends</b>.",
      {mode:"critique-friends"});
  },
  function(){
    return mcq("A report surveys members at one gym and then claims that most adults in town exercise every day. Which option gives the soundest critique of this generalization from a sample?",
      {t:"Gym members exercise more than most adults, so the sample does not represent the whole town", fb:"Right: people who join a gym differ from the general population in exactly the habit being measured."},
      [{t:"The claim is sound, because gym members are adults and the claim is about adults in town", fb:"Being adults is not enough; gym members are untypical adults for a question about exercise habits."},
       {t:"The sample is too small to use, because a single gym can hold only a handful of members", fb:"Gym size is not given here; the flaw is that members differ from the town, not the head count."},
       {t:"The claim is sound, because a survey at a gym is a direct way to study exercise habits", fb:"Directness does not fix a sample drawn only from people who already choose to exercise often."}],
      "A generalization is only as good as the sample behind it: a sample that differs from the population on the very topic studied cannot support a town wide claim. The sound critique is <b>gym members do not represent the whole town</b>.",
      {mode:"critique-gym"});
  },
  function(){
    return mcq("A school draws 200 student names at random from all grades and surveys them about library use, then claims the results describe library use across the whole school. Which option judges this generalization correctly?",
      {t:"The generalization is reasonable, because a large random sample from all grades can represent the school", fb:"Right: random selection across all grades with 200 students gives the claim a solid sample behind it."},
      [{t:"The generalization fails, because any sample smaller than the whole school is always invalid as a rule", fb:"Samples can support claims when they are large, random and drawn from the whole group studied."},
       {t:"The generalization fails, because library users were more likely to answer the survey at school that day", fb:"Names were drawn at random from all grades, so keen users hold no special place in this sample."},
       {t:"The generalization is reasonable, because the students surveyed all visit the same library room at school", fb:"Sharing a library room is not the reason; random selection across grades is what supports the claim."}],
      "A generalization is only as good as the sample behind it, and a large random sample drawn from the whole group can support a claim about that group. The correct judgement is <b>the generalization is reasonable, because the sample is large and random</b>.",
      {mode:"critique-random"});
  },
  function(){
    return mcq("A student asks people at a skate park whether the town should build a bigger skate park, and then claims most residents support the project. Which option gives the soundest critique of this generalization from a sample?",
      {t:"People at a skate park already favour skate parks, so the sample leans one way from the start", fb:"Right: asking only users about their own facility stacks the answers toward support for the project."},
      [{t:"The claim is sound, because people at the park know more about skate parks than others do", fb:"Knowledge about skate parks does not make park users typical of all residents in the town."},
       {t:"The sample is too large for one student to handle, so fewer people should have been asked", fb:"Sample size is not given as the flaw here; the flaw is asking only people who already use the park."},
       {t:"The claim is sound, because the question was asked in person rather than on a printed form", fb:"Asking in person does not fix a sample drawn only from people who favour the project already."}],
      "A generalization is only as good as the sample behind it: asking only people who already use a facility cannot support a claim about all residents. The sound critique is <b>people at a skate park already favour skate parks</b>.",
      {mode:"critique-skatepark"});
  },
  function(){
    return mcq("A study surveys 300 Grade 9 students and then claims that students in the whole school, Grades 7 to 12, prefer morning classes. Which option gives the soundest critique of this generalization from a sample?",
      {t:"Only one grade was surveyed, so older and younger students may answer very differently", fb:"Right: a large sample from a single grade still misses every other grade the claim covers."},
      [{t:"The claim is sound, because 300 students is a large sample for any school wide question", fb:"Size alone does not help when every student surveyed comes from just one of six grades."},
       {t:"The sample is too small to use, because a school survey needs thousands of students", fb:"Three hundred is a fair size; the flaw is that all of them come from a single grade level."},
       {t:"The claim is sound, because Grade 9 students sit between the youngest and oldest grades", fb:"A middle grade does not automatically share the views of the grades above and below it."}],
      "A generalization is only as good as the sample behind it: a sample drawn from one grade cannot support a claim covering six grades. The sound critique is <b>only one grade was surveyed, so other grades may differ</b>.",
      {mode:"critique-onegrade"});
  }
]), ["Test the claim against its sample: check the size, then check whether the sample matches the whole group claimed.", "Picture who is missing from the sample; missing groups are where a generalization usually breaks."]);
E("u5-pk-freq-mean", 5, ["8.7"], 2, "gen", function () {
  var k = ri(1, 12);
  var v1 = k, v2 = k + 2, v3 = k + 4;
  var f1 = ri(2, 5), f2 = ri(2, 6), f3 = ri(2, 5);
  var S = f1 * v1 + f2 * v2 + f3 * v3, N = f1 + f2 + f3;
  var mean = Math.round(S / N * 100) / 100;
  var dWrongDiv = Math.round(S / 3 * 100) / 100;
  var dDouble = Math.round((S + f3 * v3) / N * 100) / 100;
  var prompt = "A survey records the number of pets per household. The table shows: " + v1 + " pet for " + f1 + " households, " + v2 + " pets for " + f2 + " households, and " + v3 + " pets for " + f3 + " households. What is the mean number of pets per household?";
  var sol = "Multiply each value by its frequency, add, and divide by the total frequency: \\[ \\begin{aligned} \\text{mean} &= \\frac{" + f1 + "(" + v1 + ") + " + f2 + "(" + v2 + ") + " + f3 + "(" + v3 + ")}{" + N + "} = \\frac{" + S + "}{" + N + "} = " + fmt(mean) + " \\end{aligned} \\] The answer is <b>" + fmtF(mean, 2) + "</b>.";
  return mcq(prompt,
    { t: fmtF(mean, 2), fb: "Correct: the weighted total is divided by the total number of households." },
    [{ t: fmtF(S, 2), fb: "That is the weighted total on its own; it still has to be divided by the total number of households." },
     { t: fmtF(dWrongDiv, 2), fb: "That divides by the number of rows in the table; the divisor should be the total number of households." },
     { t: fmtF(dDouble, 2), fb: "That counts the last row of the table twice before dividing, which inflates the total." }],
    sol, { mode: "gap-freq-mean-mc", S: S, N: N });
}, ["A frequency table mean weights each value by how often it occurs, then divides by the total count.", "Multiply each pet count by its number of households as the first step."]);
E("u5-pk-sample-scale", 5, ["8.19"], 2, "gen", function () {
  var ns = pick([40, 50, 60, 80, 100]);
  var c = ri(6, Math.floor(ns * 0.7));
  var k = ri(6, 15);
  var pop = ns * k, pred = c * k;
  var T = Math.max(10, (Math.floor(pred / 10) - ri(0, 3)) * 10);
  if (T >= pred) T = pred - 10;
  var ans = pred - T;
  var prompt = "A survey of " + ns + " students finds that " + c + " of them walk to school. The whole school has " + fmt(pop) + " students. Predict how many students in the whole school walk to school, and find how many more that prediction is than " + fmt(T) + " students. Give the excess as your answer.";
  var sol = "Scale the sample count up to the population first: \\[ \\begin{aligned} \\text{scale} &= " + fmt(pop) + " \\div " + ns + " = " + k + " \\\\ \\text{prediction} &= " + c + " \\times " + k + " = " + pred + " \\\\ \\text{excess} &= " + pred + " - " + fmt(T) + " = " + ans + " \\end{aligned} \\] The answer is <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-sample-scale", pred: pred, T: T });
}, ["The sample result must be scaled to the full population before any comparison is made.", "Divide the population by the sample size to get the scale as the first step."]);
E("u5-pk-supported-conclusion", 5, ["8.22"], 3, "var", varset([
  function(){
    return mcq("For a project, a student surveys 40 students at school about getting to school. Of the 40 students, 30 say they walk, 6 ride a bus and 4 get a ride. Which conclusion does this data actually support?",
      {t:"Most of the 40 students surveyed said they walk to school on a regular school day", fb:"Right: 30 of 40 is most of the group surveyed, so the conclusion stays inside the data."},
      [{t:"Most students in the whole province walk to school on a regular school day each year", fb:"Forty students at one school cannot support a claim about a whole province of students."},
       {t:"Walking to school causes students to arrive at school feeling more alert each day", fb:"The survey counted travel methods only; it measured nothing about alertness or its causes."},
       {t:"Most of the 40 students surveyed said they ride a bus to school on a regular day", fb:"Only 6 of 40 named the bus, so this conclusion contradicts the numbers in the survey."}],
      "A conclusion must stay inside the data collected: 30 of the 40 students surveyed walk, and nothing wider was measured. The supported conclusion is <b>most of the 40 students surveyed said they walk to school</b>.",
      {mode:"conclusion-walk"});
  },
  function(){
    return mcq("For a project, a student grows 10 bean plants with extra light and 10 without it. After three weeks, 7 of the extra light plants are taller than the tallest plant grown without extra light. Which conclusion does this data actually support?",
      {t:"In this trial, most plants with extra light grew taller than the plants without it", fb:"Right: 7 of 10 beating every untreated plant supports a conclusion about this trial only."},
      [{t:"Extra light will make every bean plant grow taller in any garden or classroom trial", fb:"One small trial cannot promise results for every plant in any place it might be grown."},
       {t:"Extra light is the only reason any of the plants in the trial grew taller at all", fb:"Other factors also affect growth, and this trial never tested light as the only cause."},
       {t:"In this trial, most plants without extra light grew taller than the plants with it", fb:"The tallest plants were in the extra light group, so this conclusion contradicts the results."}],
      "A conclusion must stay inside the data collected: in this trial the extra light plants grew taller, and nothing wider was tested. The supported conclusion is <b>in this trial, most plants with extra light grew taller</b>.",
      {mode:"conclusion-plants"});
  },
  function(){
    return mcq("For a project, a student counts library loans over two school weeks. Fiction books were borrowed 120 times and non fiction books were borrowed 45 times during those two weeks. Which conclusion does this data actually support?",
      {t:"During those two weeks, fiction books were borrowed more often than non fiction books", fb:"Right: 120 loans against 45 loans supports a comparison limited to the two weeks counted."},
      [{t:"Fiction books are better written than non fiction books for student readers at school", fb:"Loan counts say nothing about writing quality; the project counted borrowing, not quality."},
       {t:"Every student in the school prefers fiction books over non fiction books this year", fb:"Loan counts over two weeks cannot show what every student prefers across a whole year."},
       {t:"During those two weeks, non fiction books were borrowed more often than fiction books", fb:"Non fiction had 45 loans against 120 for fiction, so this conclusion contradicts the counts."}],
      "A conclusion must stay inside the data collected: fiction loans outnumbered non fiction loans in the two weeks counted. The supported conclusion is <b>during those two weeks, fiction books were borrowed more often</b>.",
      {mode:"conclusion-library"});
  },
  function(){
    return mcq("For a project, a student records the recess temperature on 10 school days in May. On 6 of the 10 days the temperature was above 10 degrees, and on 4 days it was at or below 10 degrees. Which conclusion does this data actually support?",
      {t:"On most of the 10 days recorded, the recess temperature was above 10 degrees in May", fb:"Right: 6 of 10 days is most of the recorded days, so the conclusion matches the records."},
      [{t:"May is always the warmest month of the school year in this part of the province", fb:"Ten days in one month cannot rank all months, and no other month was recorded at all."},
       {t:"Warm recess weather causes students to play outside for longer at recess time", fb:"The project recorded temperatures only; it measured nothing about play time or its causes."},
       {t:"On most of the 10 days recorded, the recess temperature was at or below 10 degrees", fb:"Only 4 of 10 days were at or below 10 degrees, so this conclusion contradicts the records."}],
      "A conclusion must stay inside the data collected: 6 of the 10 recorded days were above 10 degrees, and nothing wider was measured. The supported conclusion is <b>on most of the 10 days recorded, the temperature was above 10 degrees</b>.",
      {mode:"conclusion-temp"});
  }
]), ["A supported conclusion says only what the numbers show, for the group and the time actually studied.", "Check each option against the numbers in the stem, and drop any option that reaches past them."]);
/* PK tranche pass for Unit 5: flags and accounting properties for
   the five borrowed entries above (the same forEach mechanism as
   the postMid and enrich passes). pkFor is Cluster 5's dependent
   indicator list from the prior knowledge map. */
var PKT_U5_FOR=["8.6","8.7","8.8","8.9","8.10","8.11","8.12","8.13","8.14","8.15","8.16","8.17","8.18","8.19","8.20","8.21","8.22","PK.1"];
var PKT_U5={
 "u5-pk-sample-or-population":{src:"math-9:11.3",group:"sample-population"},
 "u5-pk-generalization-critique":{src:"math-9:11.6",group:"data-claims"},
 "u5-pk-freq-mean":{src:"math-9:11.9",group:"freq-table"},
 "u5-pk-sample-scale":{src:"math-9:11.6",group:"sample-scale"},
 "u5-pk-supported-conclusion":{src:"math-9:11.9",group:"data-claims"}};
BANK.forEach(function(e){var t=PKT_U5[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U5_FOR.slice();e.pkGroup=t.group;}});

/* ----- bank-u1.js ----- */
// Math 2201 Unit 1: Acute Triangle Trigonometry question bank
// Cut verbatim from the standalone app's served file
// (math-2201-review/Math2201Review.html, lines 1204 to 1279).
// CRMARKS: u1-sine-side=2
// CRMARKS: u1-sine-angle=2
// CRMARKS: u1-cosine-side=2
// CRMARKS: u1-cosine-angle=2
// CRMARKS: u1-two-triangles=4
/* ============ Unit 1: Acute Triangle Trigonometry ============ */
function angFmt(x){return fmt(x,1)+"\u00B0";}
E("u1-law-choice",1,["7.1","7.2"],1,"var",varset([
  function(){return mcq("In triangle ABC you know two angles and the side between them. Which law starts the solution?",
    "The sine law \u2014 an angle and its opposite side form a complete pair",
    ["The cosine law \u2014 it needs no angles, so the known pair does not matter","The tangent ratio \u2014 it works in any triangle, right-angled or not","The Pythagorean theorem \u2014 first find the third angle from the two given"],
    "Two angles give the third by the angle sum, and the known side sits opposite a known angle: a complete sine-law pair. (Pythagoras and the tangent ratio are for right triangles only.)",{});},
  function(){return mcq("In triangle PQR you know two sides and the angle between them, and you need the third side. Which law do you use?",
    "The cosine law \u2014 it is built for the side-angle-side case",
    ["The sine law \u2014 it only needs the two sides and no other information","The sine law, after splitting the triangle in two parts","The Pythagorean theorem, because two sides are known and that is enough here"],
    "With no angle-opposite-side pair, the sine law has nothing to anchor to. The cosine law, \\(c^2 = a^2 + b^2 - 2ab\\cos C\\), handles SAS directly.",{});},
  function(){return mcq("You know all three sides of an acute triangle and need its largest angle. Which law should you use, and why?",
    "The cosine law, rearranged \u2014 it is the only one that uses three sides to give an angle",
    ["The sine law, because three sides give three ratios to set equal for the angle","The tangent ratio, using the two longest sides as the opposite and adjacent pair","No law is needed — the largest angle is always \\(90^\\circ\\) in a triangle with three known sides"],
    "\\(\\cos A = \\frac{b^2 + c^2 - a^2}{2bc}\\) uses exactly the three sides. The largest angle sits opposite the longest side.",{});}
,
function(){var q = mcq("In triangle ABC, a diagram marks side \\(a = 9\\text{ cm}\\) (opposite angle \\(A\\)), side \\(b = 7\\text{ cm}\\), and angle \\(A = 35^\\circ\\). Which set-up finds angle B?",
    "\\(\\frac{\\sin B}{7} = \\frac{\\sin 35^\\circ}{9}\\) — each angle is paired with the side opposite it",
    ["\\(\\frac{\\sin B}{9} = \\frac{\\sin 35^\\circ}{7}\\) \u2014 the marked sides stay with their marked angles","\\(b^2 = a^2 + c^2 - 2ac\\cos B\\) — the cosine law, because two sides are known","\\(\\tan B = \\frac{7}{9}\\) — opposite over adjacent in the marked triangle"],
    "The sine law pairs each side with the sine of its OPPOSITE angle: \\(\\frac{a}{\\sin A} = \\frac{b}{\\sin B}\\), so \\(\\frac{9}{\\sin 35^\\circ} = \\frac{7}{\\sin B}\\). The first trap swaps the pairing; the cosine law would need the side between the two known sides' angle, which is not what is marked.",{});q.figure=(function(){var Bv=Math.asin(7*Math.sin(35*Math.PI/180)/9)*180/Math.PI;return triSVG(9, 7, 9*Math.sin((180-35-Bv)*Math.PI/180)/Math.sin(35*Math.PI/180), {L:["A","B","C"], ang:["35°","?",null], side:["9 cm","7 cm",null]});})();return q;},
  function(){return mcq("You know two sides of a triangle and an angle opposite one of them, and you need another angle. Which law starts the solution, and what must you watch for?",
    "The sine law \u2014 and the angle it gives might not be the only possibility: an angle and its supplement both have the same sine, so the diagram has to rule one out",
    ["The cosine law \u2014 it is the only law that works with two known sides, so it must start the solution, and the angle it gives will be the one correct angle for the triangle shown","The sine law \u2014 and its answer is always the one correct angle, because the inverse sine returns the angle that fits the triangle, with no second candidate to check","The angle-sum rule \u2014 the third angle comes first, then either law finishes it, because knowing all three angles is what lets a law find the remaining angle"],
    "Side-side-angle is the ambiguous case for the sine law: \\(\\sin\\theta = \\sin(180^\\circ - \\theta)\\), so the calculation can offer two candidate angles and the shape of the triangle decides which one fits.",{});}
]));
E("u1-sine-side",1,["7.2"],1,"gen",function(){
  var A=pick([35,40,50,55,65]),B=pick([45,60,70,80]);var a=ri(8,20);
  var b=a*Math.sin(B*Math.PI/180)/Math.sin(A*Math.PI/180);
  var q = numq("In \\(\\triangle ABC\\), \\(\\angle A = "+A+"^\\circ\\), \\(\\angle B = "+B+"^\\circ\\), and side \\(a = "+a+"\\text{ cm}\\) (opposite \\(\\angle A\\)). Find side \\(b\\), to one decimal place, in cm.",
    Math.round(b*10)/10,0.06,"Sine law: \\(\\frac{b}{\\sin "+B+"^\\circ} = \\frac{a}{\\sin "+A+"^\\circ} = \\frac{"+a+"}{"+fmt(Math.sin(A*Math.PI/180),4)+"}\\). So \\(b = "+fmt(b,4)+" \\approx \\)<b>\\("+fmt(b,1)+"\\text{ cm}\\)</b>.",{A:A,B:B,a:a});
  q.figure = triSVG(a, b, a*Math.sin((180-A-B)*Math.PI/180)/Math.sin(A*Math.PI/180), {L:["A","B","C"], ang:[A+"°",B+"°",null], side:[a+" cm","?",null]});
  return q;
});
E("u1-sine-angle",1,["7.2"],1,"gen",function(){
  var tri=pick([{n:"DEF",u:"m"},{n:"ABC",u:"cm"},{n:"PQR",u:"km"}]);
  var A=pick([25,30,35,40,45,50,55,60]),a=pick([6,7,8,9,10,11,12,13,14,15,16]);
  var bts=[50,55,60,65,70,75,80].filter(function(x){return x>A+15&&A+x<175;});
  var Btar=pick(bts);
  var bTrue=a*Math.sin(Btar*Math.PI/180)/Math.sin(A*Math.PI/180);
  var b=Math.round(bTrue*10)/10;
  var Brev=Math.round(Math.asin(b*Math.sin(A*Math.PI/180)/a)*180/Math.PI);
  var L1=tri.n.charAt(0),L2=tri.n.charAt(1),l1=L1.toLowerCase(),l2=L2.toLowerCase();
  var q = numq("In \\(\\triangle "+tri.n+"\\), \\(\\angle "+L1+" = "+A+"^\\circ\\), side \\("+l1+" = "+a+"\\text{ "+tri.u+"}\\) (opposite \\(\\angle "+L1+"\\)), and side \\("+l2+" = "+fmt(b,1)+"\\text{ "+tri.u+"}\\). Find \\(\\angle "+L2+"\\), to the nearest degree.",
    Brev,1.1,"Sine law: \\(\\sin "+L2+" = \\frac{"+l2+" \\sin "+L1+"}{"+l1+"} = \\frac{"+fmt(b,1)+" \\times \\sin "+A+"^\\circ}{"+a+"} \\approx "+fmt(b*Math.sin(A*Math.PI/180)/a,4)+"\\). So \\(\\angle "+L2+" = \\sin^{-1}("+fmt(b*Math.sin(A*Math.PI/180)/a,4)+") \\approx \\)<b>\\("+Brev+"^\\circ\\)</b> (the triangle is acute).",{A:A,a:a,b:b,Brev:Brev});
  q.figure = triSVG(a, b, (function(){var Bx=Math.asin(Math.min(1,b*Math.sin(A*Math.PI/180)/a))*180/Math.PI;return a*Math.sin((180-A-Bx)*Math.PI/180)/Math.sin(A*Math.PI/180);})(), {L:[L1,L2,tri.n.charAt(2)], ang:[A+"°","?",null], side:[a+" "+tri.u, fmt(b,1)+" "+tri.u, null]});
  return q;
});
E("u1-cosine-side",1,["7.2"],1,"gen",function(){
  var C=pick([50,60,70,80]),a=ri(6,14),b=ri(6,14);
  var c=Math.sqrt(a*a+b*b-2*a*b*Math.cos(C*Math.PI/180));
  var q = numq("In \\(\\triangle PQR\\), sides \\(p = "+a+"\\text{ km}\\) and \\(q = "+b+"\\text{ km}\\) meet at \\(\\angle R = "+C+"^\\circ\\) between them. Find the side opposite \\(\\angle R\\), to one decimal place, in km.",
    Math.round(c*10)/10,0.06,"Cosine law: \\(r^2 = p^2 + q^2 - 2pq\\cos R = "+(a*a)+" + "+(b*b)+" - 2("+a+")("+b+")\\cos "+C+"^\\circ \\approx "+fmt(c*c,2)+"\\). So \\(r \\approx \\)<b>\\("+fmt(c,1)+"\\text{ km}\\)</b>.",{a:a,b:b,C:C});
  q.figure = triSVG(a, b, c, {L:["P","Q","R"], ang:[null,null,C+"°"], side:[a+" km",b+" km","?"]});
  return q;
});
E("u1-cosine-angle",1,["7.2"],1,"gen",function(){
  var Atar=pick([45,55,65,75]);var b=ri(6,12),c=ri(6,12);
  var aTrue=Math.sqrt(b*b+c*c-2*b*c*Math.cos(Atar*Math.PI/180));
  var a=Math.round(aTrue*10)/10;
  var cosA=(b*b+c*c-a*a)/(2*b*c);var Arev=Math.round(Math.acos(cosA)*180/Math.PI);
  var q = numq("A triangle has sides \\("+fmt(a,1)+", "+b+", "+c+"\\). Find the angle opposite the side of length \\("+fmt(a,1)+"\\), to the nearest degree.",
    Arev,1.1,"Cosine law rearranged: \\(\\cos A = \\frac{b^2 + c^2 - a^2}{2bc} = \\frac{"+(b*b)+" + "+(c*c)+" - "+fmt(a*a,2)+"}{"+(2*b*c)+"} \\approx "+fmt(cosA,4)+"\\). So \\(A \\approx \\)<b>\\("+Arev+"^\\circ\\)</b>.",{b:b,c:c,Arev:Arev,a:a});
  q.figure = triSVG(a, b, c, {L:["A","B","C"], ang:["?",null,null], side:[fmt(a,1),""+b,""+c]});
  return q;
});
E("u1-two-triangles",1,["7.3"],3,"gen",function(){
  var AB=pick([11,12,13]),BC=pick([8,9,10]),angB=pick([60,70,80]);
  var AC=Math.sqrt(AB*AB+BC*BC-2*AB*BC*Math.cos(angB*Math.PI/180));
  var angDAC=pick([50,55]),angD=pick([60,65]);var angACD=180-angDAC-angD;
  var CD=AC*Math.sin(angDAC*Math.PI/180)/Math.sin(angD*Math.PI/180);
  var q = numq("A surveyor maps two fields that share the diagonal \\(AC\\). In \\(\\triangle ABC\\), \\(AB = "+AB+"\\text{ m}\\), \\(BC = "+BC+"\\text{ m}\\) and \\(\\angle B = "+angB+"^\\circ\\). In the second field, \\(\\triangle ACD\\), \\(\\angle DAC = "+angDAC+"^\\circ\\) and \\(\\angle D = "+angD+"^\\circ\\). Find the length of \\(CD\\), to one decimal place, in m.",
    Math.round(CD*10)/10,0.16,
    "Step 1 — the shared side, from \\(\\triangle ABC\\) (cosine law): \\(AC^2 = "+(AB*AB)+" + "+(BC*BC)+" - 2("+AB+")("+BC+")\\cos "+angB+"^\\circ\\), so \\(AC \\approx "+fmt(AC,2)+"\\text{ m}\\). Step 2 — use \\(AC\\) in \\(\\triangle ACD\\): its third angle is \\(180^\\circ - "+angDAC+"^\\circ - "+angD+"^\\circ = "+angACD+"^\\circ\\), and the sine law gives \\(\\frac{CD}{\\sin "+angDAC+"^\\circ} = \\frac{AC}{\\sin "+angD+"^\\circ}\\), so \\(CD \\approx "+fmt(AC,2)+" \\times \\frac{\\sin "+angDAC+"^\\circ}{\\sin "+angD+"^\\circ} \\approx \\)<b>\\("+fmt(CD,1)+"\\text{ m}\\)</b>. The first triangle exists to produce the side the second triangle needs.",{AB:AB,BC:BC,angB:angB,AC:AC,angDAC:angDAC,angD:angD});
  q.figure = twoTriSVG(AB, BC, angB, AC, CD, AC*Math.sin(angACD*Math.PI/180)/Math.sin(angD*Math.PI/180), angDAC, angD);
  return q;
});

/* ============ Prior knowledge tranche (November 15, 2026) ============
   Cluster 1 (Sine law and cosine law prerequisites), borrowed set.
   Provenance (host id: source entry in its home bank, the feeder
   indicators it assesses, verified by draw sweep):
   - u1-pk-label-sides: copied from math-1201 u7-label-sides, indicator 7.1
     (the only 7.1 entry in the feeder bank; no second source exists).
   - u1-pk-ratio-def: copied from math-1201 u7-ratio-def, indicator 7.2.
   - u1-pk-find-angle: copied from math-1201 u7-find-angle, indicator 7.3.
   - u1-pk-find-side: copied from math-1201 u7-find-side, indicator 7.4.
   - u1-pk-pythagoras: copied from math-1201 u7-pythagoras, indicators 7.5, 7.7.
   - u1-pk-solve-triangle: copied from math-1201 u7-solve-triangle, indicator 7.6
     (the only 7.6 entry in the feeder bank; no second source exists).
   - u1-pk-rope-angle: copied from math-1201 u7-rope-angle, indicators 7.3, 7.7.
   - u1-pk-ramp-run: copied from math-1201 u7-ramp-run, indicators 7.4, 7.5.
   The u7 helper family and balDp were copied into bank-helpers.js
   with the tranche. Indicator tags are support tags, not assessed
   targets: assessed targets are in pkSrc, the full dependent list
   in pkFor. */
E("u1-pk-label-sides", 1, ["7.1"], 1, "gen",function(){
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
E("u1-pk-ratio-def", 1, ["7.2"], 1, "gen",function(){
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
E("u1-pk-find-angle", 1, ["7.2"], 1, "gen",function(){
  var V=pick(["A","B"]);
  var oppName=(V==="A"?"BC":"AC"),adjName=(V==="A"?"AC":"BC");
  var rt=pick(["sin","cos","tan"]),num,den,sideText,ratioDisp,raw,tries=0;
  do{
    tries++;
    if(rt==="sin"){num=ri(4,30);den=num+ri(3,30);}
    else if(rt==="cos"){num=ri(4,30);den=num+ri(3,30);}
    else{num=ri(4,30);den=ri(4,30);}
    raw=(rt==="sin"?u7asinD(num/den):rt==="cos"?u7acosD(num/den):u7atanD(num/den));
  }while((raw<15||raw>75)&&tries<100);
  var ans=Math.round(raw);
  if(rt==="sin"){sideText="the side opposite angle "+V+", "+oppName+", is \\("+num+"\\) cm and the hypotenuse, AB, is \\("+den+"\\) cm";
    ratioDisp="\\sin "+V+" &= "+FR(num,den);}
  else if(rt==="cos"){sideText="the side adjacent to angle "+V+", "+adjName+", is \\("+num+"\\) cm and the hypotenuse, AB, is \\("+den+"\\) cm";
    ratioDisp="\\cos "+V+" &= "+FR(num,den);}
  else{sideText="the side opposite angle "+V+", "+oppName+", is \\("+num+"\\) cm and the side adjacent to angle "+V+", "+adjName+", is \\("+den+"\\) cm";
    ratioDisp="\\tan "+V+" &= "+FR(num,den);}
  var inv=(rt==="sin"?"\\sin^{-1}":rt==="cos"?"\\cos^{-1}":"\\tan^{-1}");
  var q=numq("A right triangle ABC has the right angle at C. In the triangle, "+sideText+". Give the measure of angle "+V+", in degrees, to the nearest degree.",
    ans,0.51,
    "Use the ratio that involves the two known sides, then undo it with the inverse ratio: \\[ \\begin{aligned} "+ratioDisp+" \\\\ "+V+" &= "+inv+"\\left("+FR(num,den)+"\\right) \\\\ &\\approx "+ans+"^\\circ \\end{aligned} \\] The measure of angle "+V+" is <b>\\("+ans+"^\\circ\\)</b>.",
    {V:V,rt:rt,num:num,den:den,ans:ans});
  var oppV,adjV,hypV;
  if(rt==="sin"){oppV=num;hypV=den;adjV=Math.sqrt(den*den-num*num);}
  else if(rt==="cos"){adjV=num;hypV=den;oppV=Math.sqrt(den*den-num*num);}
  else{oppV=num;adjV=den;hypV=Math.sqrt(num*num+den*den);}
  var sLab=[null,null,null];
  if(rt==="sin"){sLab[V==="A"?0:1]=num+" cm";sLab[2]=den+" cm";}
  else if(rt==="cos"){sLab[V==="A"?1:0]=num+" cm";sLab[2]=den+" cm";}
  else{sLab[V==="A"?0:1]=num+" cm";sLab[V==="A"?1:0]=den+" cm";}
  var aLab=[null,null,null];aLab[V==="A"?0:1]="?";
  q.figure=triSVG(V==="A"?oppV:adjV,V==="A"?adjV:oppV,hypV,{L:["A","B","C"],side:sLab,ang:aLab});
  return q;
});
E("u1-pk-find-side", 1, ["7.2"], 1, "gen",function(){
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
E("u1-pk-pythagoras", 1, ["7.2"], 1, "gen",function(){
  var ctx=ri(1,11);
  var maxHyp=(ctx===1||ctx===6)?15:((ctx===8||ctx===11)?20:(ctx===3?30:(ctx===7?12:(ctx===2?60:150))));
  var scales=[0.5,1,1.5,2,2.5,3,4,5];
  var t=pick(U7_TRIPLES),k=pick(scales),trC=0;
  while(t[2]*k>maxHyp&&trC<200){t=pick(U7_TRIPLES);k=pick(scales);trC++;}
  var legA=t[0]*k,legB=t[1]*k,hyp=t[2]*k;
  if(pick([true,false])){var swp=legA;legA=legB;legB=swp;}
  var kind,prompt,solSteps,ans,known1,known2;
  if(ctx===1||ctx===6||ctx===8||ctx===11){
    kind="leg";var heightLeg=(ctx===1?legA:legB),otherLeg=(ctx===1?legB:legA);
    ans=otherLeg;known1=hyp;known2=heightLeg;
    if(ctx===1)prompt="A ladder \\("+hyp+"\\) m long leans against a vertical wall. The top of the ladder touches the wall \\("+heightLeg+"\\) m above the ground. How far, in metres, is the foot of the ladder from the wall?";
    else if(ctx===6)prompt="A ladder \\("+hyp+"\\) m long is placed with its foot \\("+heightLeg+"\\) m from the base of a vertical wall. How high, in metres, does the ladder reach up the wall?";
    else if(ctx===8)prompt="A staircase stringer \\("+hyp+"\\) m long rises \\("+heightLeg+"\\) m vertically from floor to landing. How long, in metres, is the horizontal run of the staircase?";
    else prompt="A loading ramp \\("+hyp+"\\) m long rises to a dock \\("+heightLeg+"\\) m above the ground. How far, in metres, does the foot of the ramp sit from the base of the dock?";
    solSteps="\\begin{aligned} x^2 + "+heightLeg+"^2 &= "+hyp+"^2 \\\\ x^2 &= "+hyp+"^2 - "+heightLeg+"^2 \\\\ x^2 &= "+(ans*ans)+" \\\\ x &= "+ans+" \\end{aligned}";
  }else if(ctx===3){
    kind="leg";ans=legB;known1=hyp;known2=legA;
    prompt="A guy wire \\("+hyp+"\\) m long runs from the top of a vertical pole to a ground anchor. The wire is attached \\("+legA+"\\) m up the pole. How far, in metres, is the anchor from the base of the pole?";
    solSteps="\\begin{aligned} x^2 + "+legA+"^2 &= "+hyp+"^2 \\\\ x^2 &= "+hyp+"^2 - "+legA+"^2 \\\\ x^2 &= "+(ans*ans)+" \\\\ x &= "+ans+" \\end{aligned}";
  }else if(ctx===2){
    kind="hyp";ans=hyp;known1=legA;known2=legB;
    prompt="A rectangular garden plot measures \\("+legA+"\\) m by \\("+legB+"\\) m. How long, in metres, is a path that runs straight from one corner of the plot to the opposite corner?";
    solSteps="\\begin{aligned} x^2 &= "+legA+"^2 + "+legB+"^2 \\\\ x^2 &= "+(ans*ans)+" \\\\ x &= "+ans+" \\end{aligned}";
  }else if(ctx===4){
    kind="hyp";ans=hyp;known1=legA;known2=legB;
    prompt="A rectangular playing field is \\("+legA+"\\) m long and \\("+legB+"\\) m wide. A player runs in a straight line from one corner of the field to the diagonally opposite corner. How far, in metres, does the player run?";
    solSteps="\\begin{aligned} x^2 &= "+legA+"^2 + "+legB+"^2 \\\\ x^2 &= "+(ans*ans)+" \\\\ x &= "+ans+" \\end{aligned}";
  }else if(ctx===9){
    kind="hyp";ans=hyp;known1=legA;known2=legB;
    prompt="A rectangular building lot is \\("+legA+"\\) m long and \\("+legB+"\\) m wide. A survey line runs straight from one corner of the lot to the opposite corner. How long, in metres, is the survey line?";
    solSteps="\\begin{aligned} x^2 &= "+legA+"^2 + "+legB+"^2 \\\\ x^2 &= "+(ans*ans)+" \\\\ x &= "+ans+" \\end{aligned}";
  }else if(ctx===10){
    kind="hyp";ans=hyp;known1=legA;known2=legB;
    prompt="A rectangular meadow is \\("+legA+"\\) m long and \\("+legB+"\\) m wide. A hiker walks in a straight line from one corner of the meadow to the diagonally opposite corner. How far, in metres, does the hiker walk?";
    solSteps="\\begin{aligned} x^2 &= "+legA+"^2 + "+legB+"^2 \\\\ x^2 &= "+(ans*ans)+" \\\\ x &= "+ans+" \\end{aligned}";
  }else if(ctx===7){
    kind="hyp";ans=hyp;known1=legA;known2=legB;
    prompt="A rectangular driveway gate is \\("+legA+"\\) m wide and \\("+legB+"\\) m tall. A brace runs straight from one corner of the gate to the opposite corner. How long, in metres, is the brace?";
    solSteps="\\begin{aligned} x^2 &= "+legA+"^2 + "+legB+"^2 \\\\ x^2 &= "+(ans*ans)+" \\\\ x &= "+ans+" \\end{aligned}";
  }else{
    kind="hyp";ans=hyp;known1=legA;known2=legB;
    prompt="A kite string is held so that the kite is directly above a point \\("+legA+"\\) m away from the flyer, at a height of \\("+legB+"\\) m above the flyer's hand. How long, in metres, is the straight section of string from the hand to the kite?";
    solSteps="\\begin{aligned} x^2 &= "+legA+"^2 + "+legB+"^2 \\\\ x^2 &= "+(ans*ans)+" \\\\ x &= "+ans+" \\end{aligned}";
  }
  var cands;
  if(kind==="leg")cands=[known1,known2,known1-known2,known1+known2,Math.abs(known2-2),ans+known2];
  else cands=[known1+known2,Math.abs(known1-known2),Math.max(known1,known2),known1+known2-1,Math.max(known1,known2)+1];
  var seenD={},ds=[];
  cands.forEach(function(c){if(ds.length<3&&typeof c==="number"&&isFinite(c)&&c>0&&c!==ans&&!seenD[c]){seenD[c]=1;ds.push(""+c);}});
  var pad=1;while(ds.length<3){var cc=ans+pad+2;pad++;if(!seenD[cc]){seenD[cc]=1;ds.push(""+cc);}}
  var q=mcq(prompt,""+ans,balDp(""+ans,ds),
    "The situation forms a right triangle, so the Pythagorean theorem applies. Let \\(x\\) be the length asked for: \\[ "+solSteps+" \\] The length is <b>\\("+ans+"\\) m</b>.",
    {kind:kind,x:known1,y:known2,ans:ans});
  if(ctx===2||ctx===4||ctx===7||ctx===9||ctx===10){
    q.figure=u7rectDiagSVG(legA,legB);
  }else if(ctx===5){
    q.figure=u7triSceneSVG({vert:legB,ground:legA,slant:hyp,vertLabel:legB+" m",groundLabel:legA+" m",slantLabel:"?",dashedVert:true});
  }else if(ctx===3){
    q.figure=u7triSceneSVG({vert:legA,ground:ans,slant:hyp,vertLabel:legA+" m",groundLabel:"?",slantLabel:hyp+" m"});
  }else if(ctx===6){
    q.figure=u7triSceneSVG({vert:ans,ground:heightLeg,slant:hyp,vertLabel:"?",groundLabel:heightLeg+" m",slantLabel:hyp+" m"});
  }else{
    q.figure=u7triSceneSVG({vert:heightLeg,ground:ans,slant:hyp,vertLabel:heightLeg+" m",groundLabel:"?",slantLabel:hyp+" m"});
  }
  return q;
});
E("u1-pk-solve-triangle", 1, ["7.2"], 2, "gen",function(){
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
E("u1-pk-rope-angle", 1, ["7.2"], 2, "var",varset([
  function(){return u7slantAngle("rope");},
  function(){return u7slantAngle("slide");},
  function(){return u7slantAngle("zip");},
  function(){return u7slantAngle("kite");}
]));
E("u1-pk-ramp-run", 1, ["7.2"], 2, "var",varset([
  function(){return u7riseRun("dock");},
  function(){return u7riseRun("belt");},
  function(){return u7riseRun("escalator");}
]));

/* ============ Enrichment build (November 17, 2026) ============
   89 new templates commissioned after the template-depth audit:
   16 dual-coded 7.1/7.2 (diagram representation; 7.1's first Level 2
   and Level 3 items), 23 for 7.2, 17 for 7.3, and 33 authored PK
   entries across the five groups (registered in PKT_U1 below with
   the Math 1201 outcome each one feeds). Diagram orientation follows
   Jason's November 17, 2026 rule: a good share of triangle figures
   are drawn slanted (triRotSVG / chainTriSVG / splitTriSVG with a
   rotation) so no side is horizontal, except where a horizontal side
   is intrinsic to the context. */
// CRMARKS: u1-ferry-distance=2
// CRMARKS: u1-sail-angle=2
// CRMARKS: u1-survey-baseline=2
// CRMARKS: u1-fence-angle=2
// CRMARKS: u1-orchard-tree=2
// CRMARKS: u1-lighthouse-bearing=2
// CRMARKS: u1-pipeline-angle=3
// CRMARKS: u1-panel-perimeter=3
// CRMARKS: u1-raft-crossing=2
// CRMARKS: u1-harbour-second-side=3
// CRMARKS: u1-rafter-span=2
// CRMARKS: u1-lock-gates=2
// CRMARKS: u1-meadow-angle=2
// CRMARKS: u1-regatta-choice=4
// CRMARKS: u1-perimeter-angles=3
// CRMARKS: u1-isosceles-span=2
// CRMARKS: u1-two-lamps=3
// CRMARKS: u1-scaffold-bay=3
// CRMARKS: u1-shared-side-intro=3
// CRMARKS: u1-kite-frame-chain=3
// CRMARKS: u1-river-chain=3
// CRMARKS: u1-headland-boats=3
// CRMARKS: u1-bisector-post=3
// CRMARKS: u1-truss-diagonal=3
// CRMARKS: u1-island-route=3
// CRMARKS: u1-drone-split=3
// CRMARKS: u1-race-course=3
// CRMARKS: u1-survey-network=4
// CRMARKS: u1-two-stage-height=4
// CRMARKS: u1-regatta-chain=4
// CRMARKS: u1-quad-perimeter=3
// CRMARKS: u1-offset-angle=3

// Math 2201 Unit 1 enrichment, batch A (November 17, 2026): dual-coded
// 7.1/7.2 entries giving indicator 7.1 real depth: diagram
// representation, diagram reading, first-step and plan structures.
// Fresh contexts and values throughout; solutions teach straight and
// bold the final answer.
E("u1-diagram-match",1,["7.1","7.2"],1,"var",varset([
  function(){return mcq("Two markers P and Q stand \\(46\\text{ m}\\) apart. From P, the angle between the line to Q and the line to a buoy R is \\(52^\\circ\\); from Q, the angle between the line to P and the line to the buoy is \\(63^\\circ\\). A diagram of \\(\\triangle PQR\\) is drawn to find the distance from P to the buoy. Which description matches the diagram?",
    "Angles of \\(52^\\circ\\) at P and \\(63^\\circ\\) at Q are marked known, the \\(46\\text{ m}\\) side between them is marked known, and the side from P to the buoy is marked ?",
    ["Angles of \\(52^\\circ\\) at P and \\(63^\\circ\\) at Q are marked known, the \\(46\\text{ m}\\) side between them is marked ?, and the side from P to the buoy is marked known",
     "Sides of \\(46\\text{ m}\\) from P to Q and \\(52\\text{ m}\\) from P to the buoy are marked known, the angle at Q is marked \\(63^\\circ\\), and the angle at R is marked ?",
     "The angle at R is marked \\(52^\\circ\\), the angle at P is marked \\(63^\\circ\\), the \\(46\\text{ m}\\) side is marked known, and the side from Q to the buoy is marked ?"],
    "A diagram marks exactly what the problem gives and labels the target as unknown. The problem gives two angles and the side between them, and asks for the side from P to the buoy, so the matching diagram is <b>the one that marks the \\(52^\\circ\\) and \\(63^\\circ\\) angles and the \\(46\\text{ m}\\) side as known, with the side from P to the buoy marked ?</b>.",
    {});},
  function(){return mcq("A triangular garden bed has sides of \\(8\\text{ m}\\) and \\(11\\text{ m}\\) that meet at a corner, with an angle of \\(74^\\circ\\) between them at that corner. A diagram is drawn to find the length of the third side. Which description matches the diagram?",
    "The \\(8\\text{ m}\\) and \\(11\\text{ m}\\) sides are marked known, the \\(74^\\circ\\) angle between them is marked known, and the third side is marked ?",
    ["The \\(8\\text{ m}\\) and \\(11\\text{ m}\\) sides are marked known, the \\(74^\\circ\\) angle opposite the \\(8\\text{ m}\\) side is marked known, and the third side is marked ?",
     "The \\(8\\text{ m}\\) side and the third side are marked known, the \\(74^\\circ\\) angle between them is marked known, and the \\(11\\text{ m}\\) side is marked ?",
     "The \\(8\\text{ m}\\) and \\(11\\text{ m}\\) sides are both marked ?, the \\(74^\\circ\\) angle between them is marked known, and the third side is marked known"],
    "The problem gives two sides and the angle between them, and asks for the remaining side. The matching diagram is <b>the one that marks the \\(8\\text{ m}\\) and \\(11\\text{ m}\\) sides and the \\(74^\\circ\\) angle between them as known, with the third side marked ?</b>.",
    {});},
  function(){return mcq("A triangular brace has sides of \\(5\\text{ m}\\), \\(7\\text{ m}\\) and \\(9\\text{ m}\\). A diagram is drawn to find the angle opposite the \\(9\\text{ m}\\) side. Which description matches the diagram?",
    "All three sides, \\(5\\text{ m}\\), \\(7\\text{ m}\\) and \\(9\\text{ m}\\), are marked known, no angle is marked known, and the angle opposite the \\(9\\text{ m}\\) side is marked ?",
    ["All three sides, \\(5\\text{ m}\\), \\(7\\text{ m}\\) and \\(9\\text{ m}\\), are marked known, no angle is marked known, and the angle opposite the \\(5\\text{ m}\\) side is marked ?",
     "The \\(5\\text{ m}\\) and \\(7\\text{ m}\\) sides are marked known, the \\(9\\text{ m}\\) side is marked ?, and the angle opposite the \\(9\\text{ m}\\) side is marked known",
     "Two sides, \\(7\\text{ m}\\) and \\(9\\text{ m}\\), are marked known, the third side is marked ?, and the angle opposite the \\(9\\text{ m}\\) side is marked known"],
    "The problem gives all three sides and no angle, and asks for the angle across from the \\(9\\text{ m}\\) side. The matching diagram is <b>the one that marks all three sides as known, marks no angle as known, and puts the ? on the angle opposite the \\(9\\text{ m}\\) side</b>.",
    {});},
  function(){return mcq("In \\(\\triangle DEF\\), \\(\\angle D = 41^\\circ\\), side \\(d = 13\\text{ cm}\\) opposite \\(\\angle D\\), and side \\(e = 10\\text{ cm}\\). A diagram is drawn to find \\(\\angle E\\). Which description matches the diagram?",
    "Angle D is marked \\(41^\\circ\\) and the side opposite it is marked \\(13\\text{ cm}\\), side e is marked \\(10\\text{ cm}\\), and angle E is marked ?",
    ["Angle D is marked \\(41^\\circ\\) and the side next to it is marked \\(13\\text{ cm}\\), side e is marked \\(10\\text{ cm}\\), and angle E is marked ?",
     "Angle E is marked \\(41^\\circ\\) and the side opposite it is marked \\(10\\text{ cm}\\), side d is marked \\(13\\text{ cm}\\), and angle D is marked ?",
     "Angle D is marked \\(41^\\circ\\), side d is marked \\(13\\text{ cm}\\), side e is marked ?, and angle E is marked \\(10^\\circ\\)"],
    "Side d sits opposite angle D, so the \\(13\\text{ cm}\\) mark belongs on the side across from the \\(41^\\circ\\) angle, and the unknown is angle E. The matching diagram is <b>the one that marks angle D as \\(41^\\circ\\), the side opposite it as \\(13\\text{ cm}\\), side e as \\(10\\text{ cm}\\), and angle E as ?</b>.",
    {});}
]));
E("u1-diagram-unknown",1,["7.1","7.2"],1,"gen",function(){
  var frames=[
    {intro:"Three orienteering markers A, B and C form a triangle, with C the checkpoint marker.",
     key:"The straight-line distance between markers A and B",
     t1:"The straight-line distance between the checkpoint C and marker A",
     t2:"The straight-line distance between the checkpoint C and marker B",
     per:"The total distance around all three sides of the triangle"},
    {intro:"Three corners A, B and C of a triangular garden plot form a triangle, with C the corner by the gate.",
     key:"The straight-line distance between corners A and B of the plot",
     t1:"The straight-line distance between the gate corner C and corner A",
     t2:"The straight-line distance between the gate corner C and corner B",
     per:"The total distance around all three sides of the plot"},
    {intro:"Three survey posts A, B and C form a triangle, with C the post up on the hill.",
     key:"The straight-line distance between posts A and B",
     t1:"The straight-line distance between the hill post C and post A",
     t2:"The straight-line distance between the hill post C and post B",
     per:"The total distance around all three sides of the triangle"}
  ];
  var fr=pick(frames),a=0,b=0,C=0,c=0,tries=0,ok=false;
  while(!ok&&tries<400){tries++;
    a=ri(14,38);b=ri(14,38);C=ri(48,105);
    c=Math.sqrt(a*a+b*b-2*a*b*Math.cos(C*Math.PI/180));
    var os=[fr.key,fr.t1,fr.t2,fr.per];
    ok=isFinite(c)&&c>2&&os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  var q=mcq(fr.intro+" The distance from C to A is \\("+b+"\\text{ m}\\), the distance from C to B is \\("+a+"\\text{ m}\\), and the angle at C between those two sides is \\("+C+"^\\circ\\). In the diagram the side AB is marked ?. What does the ? stand for?",
    fr.key,[fr.t1,fr.t2,fr.per],
    "The ? labels side AB, the side across from the marked angle at C. The two sides from C are already labelled \\("+a+"\\text{ m}\\) and \\("+b+"\\text{ m}\\), so the ? cannot stand for either of them, and it is a single side, not the total around the triangle. The ? stands for <b>"+fr.key+"</b>.",
    {frame:fr.key,a:a,b:b,C:C});
  q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:[null,null,C+"°"],side:[a+" m",b+" m","?"],rot:pick([9,12,15,-10,-14])});
  return q;
});
E("u1-law-diagram-choice",1,["7.1","7.2"],1,"var",varset([
  function(){var A=48,B=63,C=180-A-B,c=18;
    var a=c*Math.sin(A*Math.PI/180)/Math.sin(C*Math.PI/180),b=c*Math.sin(B*Math.PI/180)/Math.sin(C*Math.PI/180);
    var q=mcq("The diagram marks angles of \\(48^\\circ\\) and \\(63^\\circ\\) and the \\(18\\text{ m}\\) side between them, with another side marked ?. Which law, applied to the marked information, finds the marked side?",
      "The sine law, because the third angle comes from the angle sum and the \\(18\\text{ m}\\) side then pairs with its opposite angle",
      ["The cosine law, because the third angle comes from the angle sum and the \\(18\\text{ m}\\) side then pairs with its opposite angle",
       "The cosine law, because two sides and the angle between them are marked, so the third side follows in one step",
       "The sine law, because any two marked angles are enough on their own to give a side length with no side marked"],
      "The third angle is \\(180^\\circ - 48^\\circ - 63^\\circ = 69^\\circ\\), and the \\(18\\text{ m}\\) side sits opposite it: a complete pair. The sine law then gives the marked side from \\(\\frac{x}{\\sin 48^\\circ} = \\frac{18}{\\sin 69^\\circ}\\). The law that finds the marked side is <b>the sine law</b>.",
      {});
    q.figure=triSVG(a,b,c,{L:["A","B","C"],ang:["48°","63°",null],side:["?",null,"18 m"]});
    return q;},
  function(){var A=57,b=14,c=9;
    var a=Math.sqrt(b*b+c*c-2*b*c*Math.cos(A*Math.PI/180));
    var q=mcq("The diagram marks sides of \\(14\\text{ m}\\) and \\(9\\text{ m}\\) and the \\(57^\\circ\\) angle between them, with the side opposite that angle marked ?. Which law, applied to the marked information, finds the marked side?",
      "The cosine law, because the marked angle sits between the two marked sides and the side opposite it is the unknown",
      ["The sine law, because the marked angle sits between the two marked sides and the side opposite it is the unknown",
       "The sine law, because a marked angle and the side opposite it form a complete pair ready to use in a proportion",
       "The cosine law, because all three sides are marked and any angle can be rearranged out of the three of them"],
      "The side opposite the \\(57^\\circ\\) angle is the unknown, so the sine law has no complete pair to start from. The cosine law uses exactly the marked information: \\(x^2 = 14^2 + 9^2 - 2(14)(9)\\cos 57^\\circ\\). The law that finds the marked side is <b>the cosine law</b>.",
      {});
    q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:["57°",null,null],side:["?","14 m","9 m"],rot:12});
    return q;},
  function(){var q=mcq("The diagram marks all three sides of a triangle, \\(8\\text{ cm}\\), \\(11\\text{ cm}\\) and \\(13\\text{ cm}\\), with the angle opposite the \\(13\\text{ cm}\\) side marked ?. Which law, applied to the marked information, finds the marked angle?",
      "The cosine law rearranged, because three sides are marked and no angle is marked, so an angle must come from the sides",
      ["The sine law, because three sides are marked and no angle is marked, so an angle must come from the sides alone",
       "The sine law, because the side opposite the marked angle is marked too, so a complete pair is ready to use",
       "The cosine law in side form, because two marked sides and their marked included angle give the third side directly"],
      "With no angle marked, the sine law cannot start. Rearranging the cosine law for the angle opposite the \\(13\\text{ cm}\\) side gives \\(\\cos C = \\frac{8^2 + 11^2 - 13^2}{2(8)(11)} \\approx 0.0909\\), so \\(C \\approx 85^\\circ\\). The law that finds the marked angle is <b>the cosine law rearranged</b>.",
      {});
    q.figure=triSVG(8,11,13,{L:["A","B","C"],ang:[null,null,"?"],side:["8 cm","11 cm","13 cm"]});
    return q;},
  function(){var A=38,a=10,b=14;
    var Bv=Math.asin(b*Math.sin(A*Math.PI/180)/a)*180/Math.PI,Cv=180-A-Bv;
    var cv=a*Math.sin(Cv*Math.PI/180)/Math.sin(A*Math.PI/180);
    var q=mcq("The diagram marks an angle of \\(38^\\circ\\), the \\(10\\text{ cm}\\) side opposite it, and another side of \\(14\\text{ cm}\\), with the angle opposite the \\(14\\text{ cm}\\) side marked ?. Which law, applied to the marked information, finds the marked angle?",
      "The sine law, because a marked angle and its opposite side form a pair, but the angle found may have a supplement that also fits",
      ["The cosine law, because a marked angle and its opposite side form a pair, but the angle found may have a supplement that also fits",
       "The sine law, because a marked angle and its opposite side form a pair, and the angle it returns is always the only one possible",
       "The cosine law, because two marked sides with any marked angle always give the remaining angle in one rearranged step"],
      "The \\(38^\\circ\\) angle and the \\(10\\text{ cm}\\) side opposite it form a complete pair, so \\(\\frac{\\sin B}{14} = \\frac{\\sin 38^\\circ}{10}\\) gives \\(\\sin B \\approx 0.862\\). That sine value belongs to \\(60^\\circ\\) and to its supplement \\(120^\\circ\\), and the diagram decides which one fits. The law that finds the marked angle is <b>the sine law, with the ambiguous-case caution</b>.",
      {});
    q.figure=triRotSVG(a,b,cv,{L:["A","B","C"],ang:["38°","?",null],side:["10 cm","14 cm",null],rot:-10});
    return q;}
]));
E("u1-pairing-diagram",1,["7.1","7.2"],1,"gen",function(){
  var sets=["ABC","DEF","PQR"];
  var n=pick(sets),L1=n.charAt(0),L2=n.charAt(1),L3=n.charAt(2);
  var l1=L1.toLowerCase(),l2=L2.toLowerCase(),l3=L3.toLowerCase();
  var A=0,B=0,C=0,a=0,key="",dS="",dC="",dT="",tries=0,ok=false;
  while(!ok&&tries<400){tries++;
    A=ri(30,60);B=ri(35,75);C=180-A-B;a=ri(8,20);
    if(C<25||C>85)continue;
    key="\\(\\frac{"+l2+"}{\\sin "+B+"^\\circ} = \\frac{"+a+"}{\\sin "+A+"^\\circ}\\)";
    dS="\\(\\frac{"+l2+"}{\\sin "+A+"^\\circ} = \\frac{"+a+"}{\\sin "+B+"^\\circ}\\)";
    dC="\\("+l2+"^2 = "+l1+"^2 + "+l3+"^2 - 2"+l1+l3+"\\cos "+L2+"\\)";
    dT="\\(\\tan "+L2+" = \\frac{"+l2+"}{"+l1+"}\\)";
    var os=[key,dS,dC,dT];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  var b=a*Math.sin(B*Math.PI/180)/Math.sin(A*Math.PI/180);
  var c=a*Math.sin(C*Math.PI/180)/Math.sin(A*Math.PI/180);
  var q=mcq("In \\(\\triangle "+n+"\\), \\(\\angle "+L1+" = "+A+"^\\circ\\), \\(\\angle "+L2+" = "+B+"^\\circ\\), and side \\("+l1+" = "+a+"\\text{ cm}\\) (opposite \\(\\angle "+L1+"\\)), as marked in the diagram. Which equation finds side \\("+l2+"\\)?",
    key,[dS,dC,dT],
    "The sine law pairs each side with the sine of its opposite angle: \\(\\frac{"+l2+"}{\\sin "+L2+"} = \\frac{"+l1+"}{\\sin "+L1+"}\\). Side \\("+l2+"\\) goes with \\(\\angle "+L2+" = "+B+"^\\circ\\) and the known side \\("+a+"\\text{ cm}\\) goes with \\(\\angle "+L1+" = "+A+"^\\circ\\), so the set-up is <b>"+key+"</b>. The cosine law would need the third side, and the tangent ratio belongs to right triangles.",
    {tri:n,A:A,B:B,a:a});
  q.figure=triRotSVG(a,b,c,{L:[L1,L2,L3],ang:[A+"°",B+"°",null],side:[a+" cm","?",null],rot:pick([9,12,15,-10,-14])});
  return q;
});
E("u1-diagram-givens",1,["7.1","7.2"],1,"var",varset([
  function(){var A=52,B=58,C=180-A-B,c=15;
    var a=c*Math.sin(A*Math.PI/180)/Math.sin(C*Math.PI/180),b=c*Math.sin(B*Math.PI/180)/Math.sin(C*Math.PI/180);
    var q=mcq("Which statement lists exactly the information marked in the diagram?",
      "Angles A and B are known, the side between them (side c) is \\(15\\text{ m}\\), and side a is marked unknown (?)",
      ["Angles A, B and C are all known, the side between A and B (side c) is \\(15\\text{ m}\\), and no side is left unknown",
       "Angles A and B are known, side c is \\(15\\text{ m}\\), and side a is also known from its mark on the diagram",
       "Angles A and B are known, and the \\(15\\text{ m}\\) side is the side opposite angle A, with no other side or angle given"],
      "The diagram marks two angles and one side as known and one side as unknown, and nothing else. Side c sits between angles A and B, so it is opposite angle C, not angle A. The exact list is <b>angles A and B known, side c equal to \\(15\\text{ m}\\), and side a marked unknown</b>.",
      {});
    q.figure=triSVG(a,b,c,{L:["A","B","C"],ang:["52°","58°",null],side:["?",null,"15 m"]});
    return q;},
  function(){var A=64,b=10,c=13;
    var a=Math.sqrt(b*b+c*c-2*b*c*Math.cos(A*Math.PI/180));
    var q=mcq("Which statement lists exactly the information marked in the diagram?",
      "Sides b and c are known (\\(10\\text{ m}\\) and \\(13\\text{ m}\\)), the angle between them at A is \\(64^\\circ\\), and side a is marked unknown (?)",
      ["Sides b and c are known (\\(10\\text{ m}\\) and \\(13\\text{ m}\\)), the angle between them at A is \\(64^\\circ\\), and angle B is known as well",
       "Sides a, b and c are all known, with side a read from its mark, and the angle between b and c at A is \\(64^\\circ\\)",
       "Sides b and c are known (\\(10\\text{ m}\\) and \\(13\\text{ m}\\)), the \\(64^\\circ\\) angle is opposite side b, and side a is marked unknown (?)"],
      "The diagram marks two sides and the angle between them as known, and the third side as unknown; no other angle carries a mark. The exact list is <b>sides b and c known, the \\(64^\\circ\\) angle between them at A, and side a marked unknown</b>.",
      {});
    q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:["64°",null,null],side:["?","10 m","13 m"],rot:15});
    return q;},
  function(){var q=mcq("Which statement lists exactly the information marked in the diagram?",
      "All three sides are known (\\(7\\text{ cm}\\), \\(10\\text{ cm}\\) and \\(12\\text{ cm}\\)), no angle is known, and angle B is marked unknown (?)",
      ["All three sides are known (\\(7\\text{ cm}\\), \\(10\\text{ cm}\\) and \\(12\\text{ cm}\\)), angle A is known, and angle B is marked unknown (?)",
       "All three sides are known (\\(7\\text{ cm}\\), \\(10\\text{ cm}\\) and \\(12\\text{ cm}\\)), and angle B is known from the mark on the diagram",
       "All three sides are known (\\(7\\text{ cm}\\), \\(10\\text{ cm}\\) and \\(12\\text{ cm}\\)), no angle is known, and the angle opposite the \\(7\\text{ cm}\\) side is marked (?)"],
      "Every side carries a length and only one angle carries a mark, the unknown mark. Angle B sits opposite side b, the \\(10\\text{ cm}\\) side, not opposite the \\(7\\text{ cm}\\) side. The exact list is <b>all three sides known, no angle known, and angle B marked unknown</b>.",
      {});
    q.figure=triSVG(7,10,12,{L:["A","B","C"],ang:[null,"?",null],side:["7 cm","10 cm","12 cm"]});
    return q;},
  function(){var A=52,a=12,b=10;
    var Bv=Math.asin(b*Math.sin(A*Math.PI/180)/a)*180/Math.PI,Cv=180-A-Bv;
    var cv=a*Math.sin(Cv*Math.PI/180)/Math.sin(A*Math.PI/180);
    var q=mcq("Which statement lists exactly the information marked in the diagram?",
      "Angle A is known (\\(52^\\circ\\)), the side opposite it is \\(12\\text{ cm}\\), side b is \\(10\\text{ cm}\\), and angle B is marked unknown (?)",
      ["Angle A is known (\\(52^\\circ\\)), the side opposite it is \\(12\\text{ cm}\\), side b is \\(10\\text{ cm}\\), and angle C is known as well",
       "Angle A is known (\\(52^\\circ\\)), the side opposite it is \\(12\\text{ cm}\\), side b is \\(10\\text{ cm}\\), and angle B is known from its mark",
       "Angle A is known (\\(52^\\circ\\)), the side next to it is \\(12\\text{ cm}\\), side b is \\(10\\text{ cm}\\), and angle B is marked unknown (?)"],
      "The diagram marks one angle, two sides and one unknown angle. The \\(12\\text{ cm}\\) side is side a, which sits across from angle A, not next to it. The exact list is <b>angle A known at \\(52^\\circ\\), the side opposite it \\(12\\text{ cm}\\), side b equal to \\(10\\text{ cm}\\), and angle B marked unknown</b>.",
      {});
    q.figure=triRotSVG(a,b,cv,{L:["A","B","C"],ang:["52°","?",null],side:["12 cm","10 cm",null],rot:-14});
    return q;}
]));
E("u1-angle-placement",1,["7.1","7.2"],1,"var",varset([
  function(){return mcq("A triangular sail has two edges of \\(4\\text{ m}\\) and \\(6\\text{ m}\\). The corner where those two edges meet measures \\(58^\\circ\\). In a labelled diagram of the sail, where does the \\(58^\\circ\\) angle sit?",
    "Between the \\(4\\text{ m}\\) side and the \\(6\\text{ m}\\) side, at the corner where they meet",
    ["Opposite the \\(4\\text{ m}\\) side, at the corner where the \\(6\\text{ m}\\) side and the third side meet",
     "Opposite the \\(6\\text{ m}\\) side, at the corner where the \\(4\\text{ m}\\) side and the third side meet",
     "Opposite the third side, at the corner where the third side and the \\(4\\text{ m}\\) side meet"],
    "The problem places the angle at the corner where the two named edges meet, so in the diagram it sits <b>between the \\(4\\text{ m}\\) side and the \\(6\\text{ m}\\) side</b>. An angle opposite a side sits at the one corner that side does not touch, which is a different corner for each side named.",
    {});},
  function(){return mcq("A triangular plot has a front boundary of \\(18\\text{ m}\\). At the back corner, across the plot from that front boundary, the angle measures \\(47^\\circ\\). One side boundary of the plot measures \\(13\\text{ m}\\). In a labelled diagram, where does the \\(47^\\circ\\) angle sit?",
    "Opposite the \\(18\\text{ m}\\) side, the first side named in the problem",
    ["Between the \\(18\\text{ m}\\) side and the \\(13\\text{ m}\\) side, at the corner where they meet",
     "Opposite the \\(13\\text{ m}\\) side, the second side named in the problem",
     "Opposite the third side, the side with no length given in the problem"],
    "The back corner is the one corner the front boundary does not touch, so the angle there faces the front boundary across the plot. In the diagram it sits <b>opposite the \\(18\\text{ m}\\) side, the first side named</b>. It is formed by the \\(13\\text{ m}\\) side and the third side, not by the two named sides together.",
    {});},
  function(){return mcq("A triangular kite frame has a spine of \\(30\\text{ cm}\\) and a cross spar of \\(42\\text{ cm}\\) joined to it. The angle across the frame from the cross spar measures \\(71^\\circ\\). In a labelled diagram, where does the \\(71^\\circ\\) angle sit?",
    "Opposite the \\(42\\text{ cm}\\) side, the second side named in the problem",
    ["Between the \\(30\\text{ cm}\\) side and the \\(42\\text{ cm}\\) side, at the corner where they meet",
     "Opposite the \\(30\\text{ cm}\\) side, the first side named in the problem",
     "Opposite the third side, the side with no length given in the problem"],
    "An angle described as across the frame from a side sits at the corner that side does not touch, facing that side. In the diagram it sits <b>opposite the \\(42\\text{ cm}\\) side, the second side named</b>. That corner is where the spine and the third side meet, so the angle is not between the two named sides.",
    {});},
  function(){return mcq("Two roads leave a junction in different directions: one runs \\(7\\text{ km}\\) to a first village and the other runs \\(9\\text{ km}\\) to a second village. The direct distance between the two villages has not been measured. The angle at the junction is \\(63^\\circ\\). In a labelled diagram, where does the \\(63^\\circ\\) angle sit relative to the side with no length given?",
    "Opposite the side with no length given, across the triangle from it",
    ["Between the \\(7\\text{ km}\\) side and the \\(9\\text{ km}\\) side, at the corner on the unmeasured side",
     "Opposite the \\(7\\text{ km}\\) side, the first side named in the problem",
     "Opposite the \\(9\\text{ km}\\) side, the second side named in the problem"],
    "The junction is the corner the unmeasured side does not touch: the unmeasured side joins the two villages, and the junction angle faces it across the triangle. In the diagram the \\(63^\\circ\\) angle sits <b>opposite the side with no length given</b>.",
    {});}
]));
E("u1-diagram-first-step",1,["7.1","7.2"],2,"var",varset([
  function(){return mcq("Two observation posts P and Q are \\(60\\text{ m}\\) apart. In the triangle formed with a fire tower T, the angle at P is \\(48^\\circ\\) and the angle at Q is \\(67^\\circ\\). Let x be the distance from P to the tower. Which equation is the correct first step?",
    "\\(\\frac{x}{\\sin 67^\\circ} = \\frac{60}{\\sin 65^\\circ}\\)",
    ["\\(\\frac{x}{\\sin 65^\\circ} = \\frac{60}{\\sin 67^\\circ}\\)",
     "\\(\\frac{x}{\\sin 67^\\circ} = \\frac{60}{\\sin 48^\\circ}\\)",
     "\\(\\frac{x}{\\sin 67^\\circ} = \\frac{60}{\\sin 115^\\circ}\\)"],
    "The third angle is \\(180^\\circ - 48^\\circ - 67^\\circ = 65^\\circ\\), and the \\(60\\text{ m}\\) baseline sits opposite it. Side x sits opposite the \\(67^\\circ\\) angle, so the sine law pairs them as \\(\\frac{x}{\\sin 67^\\circ} = \\frac{60}{\\sin 65^\\circ}\\), giving \\(x \\approx \\)<b>\\(60.9\\text{ m}\\)</b>. The \\(115^\\circ\\) option adds the two given angles instead of subtracting them from \\(180^\\circ\\).",
    {});},
  function(){return mcq("Two straight roads leave a junction, one running \\(120\\text{ m}\\) to a store and the other \\(85\\text{ m}\\) to a school, with an angle of \\(96^\\circ\\) between the roads at the junction. Let x be the direct distance from the store to the school. Which equation is the correct first step?",
    "\\(x^2 = 120^2 + 85^2 - 2(120)(85)\\cos 96^\\circ\\)",
    ["\\(x^2 = 120^2 + 85^2 + 2(120)(85)\\cos 96^\\circ\\)",
     "\\(x^2 = 120^2 + 85^2 - 2(120)(85)\\sin 96^\\circ\\)",
     "\\(\\frac{x}{\\sin 96^\\circ} = \\frac{120}{\\sin 85^\\circ}\\)"],
    "The two roads and the direct distance form a triangle with the \\(96^\\circ\\) angle included between the \\(120\\text{ m}\\) and \\(85\\text{ m}\\) sides, so the cosine law applies with a minus sign: \\(x^2 = 120^2 + 85^2 - 2(120)(85)\\cos 96^\\circ \\approx 23757\\), giving \\(x \\approx \\)<b>\\(154.1\\text{ m}\\)</b>. The sine law has no complete pair here, and \\(85\\text{ m}\\) is a length, not an angle.",
    {});},
  function(){return mcq("A triangular frame has sides of \\(10\\text{ m}\\), \\(12\\text{ m}\\) and \\(14\\text{ m}\\). Let X be the angle opposite the \\(14\\text{ m}\\) side. Which equation is the correct first step?",
    "\\(\\cos X = \\frac{10^2 + 12^2 - 14^2}{2(10)(12)}\\)",
    ["\\(\\cos X = \\frac{10^2 + 12^2 + 14^2}{2(10)(12)}\\)",
     "\\(\\cos X = \\frac{10^2 + 14^2 - 12^2}{2(10)(14)}\\)",
     "\\(\\frac{\\sin X}{14} = \\frac{\\sin 90^\\circ}{12}\\)"],
    "The cosine law rearranged puts the side opposite the wanted angle alone at the end of the numerator: \\(\\cos X = \\frac{10^2 + 12^2 - 14^2}{2(10)(12)} = \\frac{48}{240} = 0.2\\), so \\(X \\approx \\)<b>\\(78.5^\\circ\\)</b>. The second option would find the angle opposite the \\(12\\text{ m}\\) side instead, and no angle in this triangle is \\(90^\\circ\\).",
    {});},
  function(){return mcq("In \\(\\triangle ABC\\), \\(\\angle A = 39^\\circ\\), side \\(a = 8\\text{ cm}\\) opposite \\(\\angle A\\), and side \\(b = 11\\text{ cm}\\). The triangle is acute. Which equation is the correct first step to find \\(\\angle B\\)?",
    "\\(\\frac{\\sin B}{11} = \\frac{\\sin 39^\\circ}{8}\\)",
    ["\\(\\frac{\\sin B}{8} = \\frac{\\sin 39^\\circ}{11}\\)",
     "\\(\\frac{\\sin B}{11} = \\frac{\\sin 39^\\circ}{11}\\)",
     "\\(11^2 = 8^2 + c^2 + 2(8)(c)\\cos 39^\\circ\\)"],
    "The sine law pairs side b with angle B and side a with angle A: \\(\\frac{\\sin B}{11} = \\frac{\\sin 39^\\circ}{8}\\), so \\(\\sin B = \\frac{11 \\sin 39^\\circ}{8} \\approx 0.865\\) and \\(\\angle B \\approx \\)<b>\\(59.9^\\circ\\)</b> for the acute triangle described. The cosine-law option carries a plus sign and involves the unknown side c, so it cannot start the problem.",
    {});}
]));
E("u1-diagram-two-unknowns",1,["7.1","7.2"],2,"gen",function(){
  var mode=pick(["ASA","SAS"]),tries=0,ok=false;
  var A=0,B=0,C=0,c=0,b=0,key="",dR="",dW="",dU="",q=null;
  while(!ok&&tries<400){tries++;
    if(mode==="ASA"){
      A=ri(35,58);B=ri(35,58);C=180-A-B;c=ri(12,32);
      if(C<35||C>80)continue;
      key="First find \\(\\angle C\\) with the angle sum, then use the sine law with side \\(c\\) and its opposite angle to find side \\(a\\)";
      dR="First use the sine law with side \\(c\\) to find side \\(a\\), then find \\(\\angle C\\) with the angle sum at the end";
      dW="First find \\(\\angle C\\) with the angle sum, then use the cosine law with side \\(c\\) to find side \\(a\\)";
      dU="First find side \\(b\\), which is not marked, then use the angle sum for \\(\\angle C\\) and the sine law for side \\(a\\)";
    }else{
      b=ri(9,24);c=ri(9,24);A=ri(45,95);
      key="First use the cosine law with sides \\(b\\) and \\(c\\) and the included \\(\\angle A\\) to find side \\(a\\), then use the sine law to find \\(\\angle B\\)";
      dR="First use the sine law to find \\(\\angle B\\), then use the cosine law with sides \\(b\\) and \\(c\\) to find side \\(a\\)";
      dW="First use the sine law with sides \\(b\\) and \\(c\\) and the included \\(\\angle A\\) to find side \\(a\\), then use the cosine law to find \\(\\angle B\\)";
      dU="First find \\(\\angle C\\), which is not marked, with the angle sum, then use the cosine law for side \\(a\\) and the sine law for \\(\\angle B\\)";
    }
    var os=[key,dR,dW,dU];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  if(mode==="ASA"){
    var a2=c*Math.sin(A*Math.PI/180)/Math.sin(C*Math.PI/180);
    var b2=c*Math.sin(B*Math.PI/180)/Math.sin(C*Math.PI/180);
    q=mcq("In the diagram of \\(\\triangle ABC\\), \\(\\angle A = "+A+"^\\circ\\), \\(\\angle B = "+B+"^\\circ\\) and side \\(c = "+c+"\\text{ m}\\). Side \\(a\\) and \\(\\angle C\\) are both marked ?. Which plan finds both marked unknowns, in a workable order?",
      key,[dR,dW,dU],
      "Side c sits opposite angle C, which is still unknown, so the sine law has no complete pair until the angle sum supplies \\(\\angle C = 180^\\circ - "+A+"^\\circ - "+B+"^\\circ = "+C+"^\\circ\\). The cosine law cannot work from a single side. The workable order is <b>angle sum first, then the sine law</b>.",
      {mode:mode,A:A,B:B,C:C,c:c});
    q.figure=triRotSVG(a2,b2,c,{L:["A","B","C"],ang:[A+"°",B+"°","?"],side:["?",null,c+" m"],rot:pick([9,12,15,-10,-14])});
  }else{
    var a3=Math.sqrt(b*b+c*c-2*b*c*Math.cos(A*Math.PI/180));
    q=mcq("In the diagram of \\(\\triangle ABC\\), sides \\(b = "+b+"\\text{ m}\\) and \\(c = "+c+"\\text{ m}\\) meet at \\(\\angle A = "+A+"^\\circ\\). Side \\(a\\) and \\(\\angle B\\) are both marked ?. Which plan finds both marked unknowns, in a workable order?",
      key,[dR,dW,dU],
      "The side opposite the known angle A is itself unknown, so the sine law has no complete pair at the start, and the angle sum cannot run with only one known angle. The cosine law first gives side a from the two known sides and their included angle, and then a complete pair exists for the sine law. The workable order is <b>cosine law for the marked side first, then the sine law for the marked angle</b>.",
      {mode:mode,b:b,c:c,A:A});
    q.figure=triRotSVG(a3,b,c,{L:["A","B","C"],ang:[A+"°","?",null],side:["?",""+b+" m",""+c+" m"],rot:pick([9,12,15,-10,-14])});
  }
  return q;
});
E("u1-mislabeled-diagram",1,["7.1","7.2"],2,"var",varset([
  function(){return mcq("In \\(\\triangle ABC\\), \\(\\angle A = 46^\\circ\\), side \\(a = 12\\text{ cm}\\) opposite \\(\\angle A\\), and side \\(b = 9\\text{ cm}\\). The task is to find \\(\\angle B\\). A student's diagram shows \\(\\angle A\\) marked \\(46^\\circ\\) at vertex A, the side opposite \\(\\angle B\\) labelled \\(12\\text{ cm}\\), the side opposite \\(\\angle A\\) labelled \\(9\\text{ cm}\\), and \\(\\angle B\\) marked ?. What is the one error in the student's diagram?",
    "The \\(12\\text{ cm}\\) length is marked on the side opposite angle B instead of the side opposite angle A",
    ["The interior angle at A is marked as \\(134^\\circ\\), the supplement of \\(46^\\circ\\), instead of \\(46^\\circ\\) itself",
     "Side b is marked with the unknown symbol ? instead of its given length of \\(9\\text{ cm}\\)",
     "The \\(46^\\circ\\) angle is marked at vertex C instead of at vertex A, where it belongs in the triangle"],
    "Check each mark against the problem: angle A and its position are right, side b carries its given length, and angle B is the unknown. The side lengths are the problem: side a, opposite angle A, should carry \\(12\\text{ cm}\\), but the diagram puts it across from B. The one error is <b>the \\(12\\text{ cm}\\) length marked on the side opposite angle B instead of the side opposite angle A</b>.",
    {});},
  function(){return mcq("In \\(\\triangle PQR\\), the sides from vertex P measure \\(10\\text{ m}\\) and \\(15\\text{ m}\\), and the angle between them at P is \\(68^\\circ\\). The task is to find the side opposite P. A student's diagram labels the two sides from P as \\(10\\text{ m}\\) and \\(15\\text{ m}\\) and the side opposite P as ?, but marks the \\(68^\\circ\\) angle at vertex Q, between the \\(15\\text{ m}\\) side and the side marked ?. What is the one error in the student's diagram?",
    "The \\(68^\\circ\\) angle is marked at vertex Q instead of at vertex P, where the two given sides meet",
    ["The \\(15\\text{ m}\\) length is marked on the side opposite vertex P instead of on a side from vertex P",
     "The interior angle is marked as \\(112^\\circ\\), the supplement of \\(68^\\circ\\), instead of \\(68^\\circ\\) itself",
     "The side opposite P is labelled \\(15\\text{ m}\\) instead of being marked as the unknown with a ?"],
    "The side labels all match the problem, and the unknown is marked correctly. The angle does not: the problem puts the \\(68^\\circ\\) angle at P, between the two sides that meet there, while the diagram puts it at Q. The one error is <b>the \\(68^\\circ\\) angle marked at vertex Q instead of at vertex P</b>.",
    {});},
  function(){return mcq("A triangular frame has two sides of \\(16\\text{ m}\\) and \\(21\\text{ m}\\) with a \\(59^\\circ\\) angle between them. The task is to find the third side. A student's diagram marks the \\(59^\\circ\\) angle between the two known sides and labels one of those sides \\(16\\text{ m}\\), but it marks the \\(21\\text{ m}\\) side with a ? and labels the third side as \\(21\\text{ m}\\). What is the one error in the student's diagram?",
    "The \\(21\\text{ m}\\) side is marked ? and the third side is labelled \\(21\\text{ m}\\), so a given length and the unknown have been swapped",
    ["The \\(59^\\circ\\) angle is marked opposite the \\(16\\text{ m}\\) side instead of between the two known sides of the frame",
     "The interior angle is marked as \\(121^\\circ\\), the supplement of \\(59^\\circ\\), instead of \\(59^\\circ\\) itself",
     "The \\(16\\text{ m}\\) length is marked on the third side instead of on one of the two known sides of the frame"],
    "The angle sits correctly between the known sides and the \\(16\\text{ m}\\) label is on a known side. The remaining marks trade places: a side the problem gives as \\(21\\text{ m}\\) carries the unknown mark, and the side to be found carries that length. The one error is <b>the given \\(21\\text{ m}\\) length and the unknown mark swapped between the two sides</b>.",
    {});},
  function(){return mcq("A triangular plot has its corner at B on a straight boundary line that continues past the plot. The angle outside the plot at B, between the extended boundary and one side of the plot, is \\(64^\\circ\\). The sides from B measure \\(18\\text{ m}\\) and \\(25\\text{ m}\\). The task is to find the side opposite B, which needs the interior angle at B. A student's diagram labels the sides from B as \\(18\\text{ m}\\) and \\(25\\text{ m}\\), marks the side opposite B as ?, and marks the interior angle at B as \\(64^\\circ\\). What is the one error in the student's diagram?",
    "The interior angle at B is marked \\(64^\\circ\\), but that is the outside angle on the straight line; the interior angle is \\(116^\\circ\\)",
    ["The \\(25\\text{ m}\\) length is marked on the side opposite B instead of on one of the sides that starts at B",
     "The \\(64^\\circ\\) angle is marked at the wrong vertex, at the far end of the \\(18\\text{ m}\\) side instead of at B",
     "The side opposite B is labelled with a length instead of being marked as the unknown with a ?"],
    "The side labels and the unknown mark all match the problem, and the angle is at the right vertex. Its value is the problem: the \\(64^\\circ\\) angle lies outside the plot on a straight line, so the interior angle is its supplement, \\(180^\\circ - 64^\\circ = 116^\\circ\\). The one error is <b>the interior angle at B marked as \\(64^\\circ\\) instead of \\(116^\\circ\\)</b>.",
    {});}
]));
E("u1-diagram-ambiguous-fit",1,["7.1","7.2"],2,"gen",function(){
  var A=0,b=0,a=0,tB=0,fit=0,oth=0,asinD=0,C=0,obtuse=false,fo=0,oo=0,d3=0,tries=0,ok=false;
  while(!ok&&tries<400){tries++;
    A=ri(30,50);b=ri(12,30);obtuse=Math.random()<0.5;
    tB=obtuse?ri(100,130):ri(55,80);
    a=Math.round(b*Math.sin(A*Math.PI/180)/Math.sin(tB*Math.PI/180)*10)/10;
    if(a<=0)continue;
    var s=b*Math.sin(A*Math.PI/180)/a;
    if(s>=1||s<=0)continue;
    asinD=Math.asin(s)*180/Math.PI;
    fit=obtuse?(180-asinD):asinD;
    oth=obtuse?asinD:(180-asinD);
    if(Math.abs(fit-tB)>4)continue;
    C=180-A-fit;
    if(C<15||C>95)continue;
    fo=Math.round(fit);oo=Math.round(oth);d3=fo+A;
    var os=[""+fo,""+oo,""+d3,"90"];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4&&d3<176&&fo>=40&&fo<=140;
  }
  var cval=a*Math.sin(C*Math.PI/180)/Math.sin(A*Math.PI/180);
  var q=mcq("In \\(\\triangle ABC\\), \\(\\angle A = "+A+"^\\circ\\), side \\(a = "+fmt(a,1)+"\\text{ cm}\\) (opposite \\(\\angle A\\)) and side \\(b = "+b+"\\text{ cm}\\). The diagram shows the one triangle that fits these measurements, with \\(\\angle B\\) marked ?. What is \\(\\angle B\\), in degrees?",
    ""+fo,[""+oo,""+d3,"90"],
    "Sine law: \\(\\sin B = \\frac{b \\sin A}{a} = \\frac{"+b+" \\sin "+A+"^\\circ}{"+fmt(a,1)+"} \\approx "+fmt(b*Math.sin(A*Math.PI/180)/a,3)+"\\). The inverse sine gives \\("+fmt(asinD,1)+"^\\circ\\), and its supplement is \\("+fmt(180-asinD,1)+"^\\circ\\); both have the same sine. In the diagram, angle B is "+(obtuse?"obtuse, wider than a right angle":"acute, narrower than a right angle")+", so \\(\\angle B \\approx \\)<b>\\("+fo+"^\\circ\\)</b>.",
    {A:A,a:a,b:b,B:fo});
  q.figure=triRotSVG(a,b,cval,{L:["A","B","C"],ang:[A+"°","?",null],side:[fmt(a,1)+" cm",""+b+" cm",null],rot:pick([9,12,15,-10,-14])});
  return q;
});
E("u1-diagram-read-value",1,["7.1","7.2"],1,"gen",function(){
  /* Authored November 17, 2026 for the StudyMate pack strip audit:
     the 7.1/7.2 pool at Level 1 held only law/statement selection
     items, none of which can stand with its options stripped, so the
     mixed-a returns slot had no lawful occupant. This entry is the
     diagram-representation species (the problem drawn, the unknown
     marked ?) with a producible value for an answer, so it prints
     stripped and stays answerable. */
  var mode=pick(["ASA","SAS"]),tries=0,ok=false;
  var A=0,B=0,C=0,s=0,p=0,q=0,G=0,key="",d1="",d2="",d3="",frame="",obj="",sol="",fig=null,meta={};
  while(!ok&&tries<800){tries++;
    if(mode==="ASA"){
      A=ri(38,62);B=ri(38,62);C=180-A-B;
      if(C<45||C>95)continue;
      s=ri(24,60);
      var aSide=s*Math.sin(A*Math.PI/180)/Math.sin(C*Math.PI/180);
      var bSide=s*Math.sin(B*Math.PI/180)/Math.sin(C*Math.PI/180);
      key=fmt(aSide,1);
      d1=fmt(bSide,1);
      d2=fmt(s*Math.sin(A*Math.PI/180)/Math.sin(B*Math.PI/180),1);
      d3=fmt(s*Math.sin(A*Math.PI/180),1);
      var os=[key,d1,d2,d3];
      if(os.filter(function(v,i){return os.indexOf(v)===i;}).length!==4)continue;
      var fr=pick([
        {o:"tree",f:"Two markers, A and B, stand "+s+" m apart on one bank of a river. A tree stands on the far bank at point C. From A, the angle between the line to B and the line to the tree is "+A+"°. From B, the angle between the line to A and the line to the tree is "+B+"°. The diagram shows the problem, with the distance from B to the tree marked ?."},
        {o:"swimmer",f:"Two lifeguard chairs, A and B, stand "+s+" m apart along a beach. A swimmer is at point C in the water. From A, the angle between the line to B and the line to the swimmer is "+A+"°. From B, the angle between the line to A and the line to the swimmer is "+B+"°. The diagram shows the problem, with the distance from B to the swimmer marked ?."}
      ]);
      obj=fr.o;frame=fr.f;
      sol="The third angle is \\(\\angle C = 180^\\circ - "+A+"^\\circ - "+B+"^\\circ = "+C+"^\\circ\\). The known "+s+" m side sits opposite \\(\\angle C\\), so the sine law pairs it with the unknown side opposite \\(\\angle A\\): \\(\\frac{x}{\\sin "+A+"^\\circ} = \\frac{"+s+"}{\\sin "+C+"^\\circ}\\), giving \\(x = \\frac{"+s+" \\sin "+A+"^\\circ}{\\sin "+C+"^\\circ} \\approx \\)<b>\\("+key+"\\text{ m}\\)</b>.";
      fig=triRotSVG(aSide,bSide,s,{L:["A","B","C"],ang:[A+"°",B+"°",null],side:["?",null,s+" m"],rot:pick([9,12,15,-10,-14])});
      meta={mode:mode,A:A,B:B,C:C,s:s};
      ok=true;
    }else{
      p=ri(9,26);q=ri(9,26);G=pick([52,58,64,70,76,84,96,104]);
      if(p===q)continue;
      var aVal=Math.sqrt(p*p+q*q-2*p*q*Math.cos(G*Math.PI/180));
      key=fmt(aVal,1);
      d1=fmt(Math.sqrt(p*p+q*q),1);
      d2=fmt(Math.sqrt(p*p+q*q+2*p*q*Math.cos(G*Math.PI/180)),1);
      d3=fmt(Math.sqrt(p*p+q*q-2*p*q*Math.sin(G*Math.PI/180)),1);
      var os2=[key,d1,d2,d3];
      if(os2.filter(function(v,i){return os2.indexOf(v)===i;}).length!==4)continue;
      frame=pick([
        "Two straight trails leave a trailhead at A. One runs "+p+" m to a lookout at B, and the other runs "+q+" m to a falls at C. The angle between the trails at the trailhead is "+G+"°. The diagram shows the problem, with the direct distance from the lookout to the falls marked ?.",
        "Two straight paths leave a picnic shelter at A. One runs "+p+" m to a playground at B, and the other runs "+q+" m to a garden at C. The angle between the paths at the shelter is "+G+"°. The diagram shows the problem, with the direct distance from the playground to the garden marked ?."
      ]);
      obj="point";
      sol="The unknown side sits opposite the "+G+"° angle, between the two known sides of "+p+" m and "+q+" m, so the cosine law applies: \\(x^2 = "+p+"^2 + "+q+"^2 - 2("+p+")("+q+")\\cos "+G+"^\\circ = "+fmt(p*p+q*q-2*p*q*Math.cos(G*Math.PI/180),1)+"\\), giving \\(x \\approx \\)<b>\\("+key+"\\text{ m}\\)</b>.";
      fig=triRotSVG(aVal,q,p,{L:["A","B","C"],ang:[G+"°",null,null],side:["?",q+" m",p+" m"],rot:pick([9,12,15,-10,-14])});
      meta={mode:mode,p:p,q:q,G:G};
      ok=true;
    }
  }
  var prompt="";
  if(mode==="ASA") prompt=frame+" How far is the "+obj+" from B, in metres, to one decimal place?";
  else prompt=frame+" How far is it from the "+(frame.indexOf("lookout")>=0?"lookout to the falls":"playground to the garden")+", in metres, to one decimal place?";
  var qq=mcq(prompt,key,[d1,d2,d3],sol,meta);
  qq.figure=fig;
  return qq;
});
E("u1-sketch-values",1,["7.1","7.2"],2,"gen",function(){
  var mode=pick(["SAS","ASA"]),tries=0,ok=false;
  var p=0,qq=0,G=0,G1=0,G2=0,C=0,s=0,unit="m",frame="",key="",t1="",t2="",t3="",sol="",fig=null;
  while(!ok&&tries<400){tries++;
    if(mode==="SAS"){
      p=ri(7,20);qq=ri(7,20);G=pick([48,55,63,72,84,96]);
      if(p===qq)continue;
      var fr1=pick([
        {u:"m",f:"A triangular garden plot has two fences of "+p+" m and "+qq+" m that meet at one corner of the plot. The angle at that corner is "+G+"°."},
        {u:"cm",f:"A triangular kite has two outer edges of "+p+" cm and "+qq+" cm that meet at the top corner. The angle at that corner is "+G+"°."}
      ]);
      unit=fr1.u;frame=fr1.f;
      key="The "+p+" "+unit+" side and the "+qq+" "+unit+" side meet at the "+G+"° angle, and the side opposite that angle has no length given";
      t1="The "+p+" "+unit+" side sits opposite the "+G+"° angle, and the "+qq+" "+unit+" side forms that angle with the side of no given length";
      t2="The "+qq+" "+unit+" side sits opposite the "+G+"° angle, and the "+p+" "+unit+" side forms that angle with the side of no given length";
      t3="The "+G+"° angle sits between the "+p+" "+unit+" side and the side with no length given, and the "+qq+" "+unit+" side sits opposite that angle";
      sol="The two given sides meet at the corner, so the given angle sits between them, and the side across from that angle is the one with no measurement in the problem. The assignment is <b>the "+p+" "+unit+" and "+qq+" "+unit+" sides forming the "+G+"° angle, with the opposite side unmeasured</b>.";
      var av=Math.sqrt(p*p+qq*qq-2*p*qq*Math.cos(G*Math.PI/180));
      fig=triRotSVG(av,p,qq,{L:["A","B","C"],ang:[null,null,null],side:[null,null,null],rot:pick([9,12,15,-10,-14])});
    }else{
      G1=ri(35,65);G2=ri(35,65);C=180-G1-G2;s=ri(15,60);
      if(G1===G2||C<30||C>90)continue;
      frame=pick([
        "Two birdwatching posts stand "+s+" m apart. From one post, the angle between the line to the other post and the line to a nest is "+G1+"°; from the other post, the corresponding angle is "+G2+"°.",
        "Two lifeguard chairs stand "+s+" m apart along a beach. From one chair, the angle between the line to the other chair and the line to a swimmer is "+G1+"°; from the other chair, the corresponding angle is "+G2+"°."
      ]);
      key="The "+s+" m side sits between the "+G1+"° angle and the "+G2+"° angle, and the third angle has no measure given";
      t1="The "+s+" m side sits opposite the "+G1+"° angle, and the "+G2+"° angle stands at one end of that side";
      t2="The "+s+" m side sits opposite the "+G2+"° angle, and the "+G1+"° angle stands at one end of that side";
      t3="The "+s+" m side sits between the "+G1+"° angle and the third angle, and the "+G2+"° angle sits opposite that side";
      sol="The measured distance joins the two posts, so in the sketch it is the side with one given angle at each end; the angle at the far object is the one with no measure in the problem. The assignment is <b>the "+s+" m side between the "+G1+"° and "+G2+"° angles, with the third angle unmeasured</b>.";
      var aA=s*Math.sin(G1*Math.PI/180)/Math.sin(C*Math.PI/180);
      var bB=s*Math.sin(G2*Math.PI/180)/Math.sin(C*Math.PI/180);
      fig=triRotSVG(aA,bB,s,{L:["A","B","C"],ang:[null,null,null],side:[null,null,null],rot:pick([9,12,15,-10,-14])});
    }
    var os=[key,t1,t2,t3];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  var q=mcq(frame+" A student sketches the triangle and has to place the three given numbers on it. Which statement assigns the three given numbers to the right positions in the sketch?",
    key,[t1,t2,t3],sol,
    mode==="SAS"?{mode:mode,p:p,q:qq,G:G}:{mode:mode,G1:G1,G2:G2,s:s});
  q.figure=fig;
  return q;
});
E("u1-diagram-supplement",1,["7.1","7.2"],2,"var",varset([
  function(){return mcq("Two observers at P and Q are \\(80\\text{ m}\\) apart along a straight shoreline, and a boat R floats offshore. Inside the triangle, the angle at P is \\(41^\\circ\\). At Q, the shoreline continues straight past Q, and the angle between that extension and the line from Q to the boat is \\(64^\\circ\\). Which first step is correct for finding the distance from Q to the boat?",
    "Use \\(180^\\circ - 64^\\circ = 116^\\circ\\) as the angle at Q inside the triangle, then apply the sine law",
    ["Use the given \\(64^\\circ\\) directly as the angle at Q inside the triangle, then apply the sine law",
     "Use \\(180^\\circ - 64^\\circ = 116^\\circ\\) as the angle at Q inside the triangle, then apply the cosine law",
     "Use the given \\(64^\\circ\\) directly as the angle at Q inside the triangle, then apply the cosine law"],
    "The \\(64^\\circ\\) angle sits outside the triangle on a straight line, so the interior angle at Q is its supplement: \\(180^\\circ - 64^\\circ = 116^\\circ\\). The third angle is then \\(180^\\circ - 41^\\circ - 116^\\circ = 23^\\circ\\), and the sine law gives \\(QR = \\frac{80 \\sin 41^\\circ}{\\sin 23^\\circ} \\approx \\)<b>\\(134.3\\text{ m}\\)</b>. Only one side is known, so the cosine law cannot be the first step.",
    {});},
  function(){return mcq("A straight fence line runs through corner B of a triangular plot and continues past it. Inside the plot, the two sides from B measure \\(30\\text{ m}\\) and \\(44\\text{ m}\\). The angle outside the plot at B, between the extended fence line and one side of the plot, is \\(58^\\circ\\). Which first step is correct for finding the side opposite B?",
    "Use \\(180^\\circ - 58^\\circ = 122^\\circ\\) as the angle at B inside the triangle, then apply the cosine law",
    ["Use the given \\(58^\\circ\\) directly as the angle at B inside the triangle, then apply the cosine law",
     "Use \\(180^\\circ - 58^\\circ = 122^\\circ\\) as the angle at B inside the triangle, then apply the sine law",
     "Use the given \\(58^\\circ\\) directly as the angle at B inside the triangle, then apply the sine law"],
    "The \\(58^\\circ\\) angle is outside the plot on a straight line, so the interior angle at B is \\(180^\\circ - 58^\\circ = 122^\\circ\\). That angle sits between the two known sides, so the cosine law applies: \\(x^2 = 30^2 + 44^2 - 2(30)(44)\\cos 122^\\circ \\approx 4235\\), giving \\(x \\approx \\)<b>\\(65.1\\text{ m}\\)</b>. The sine law has no complete pair to start from.",
    {});},
  function(){return mcq("A hiking trail runs \\(280\\text{ m}\\) from a trailhead A to a junction B, then \\(350\\text{ m}\\) from B to a lookout C. At B the trail bends: the angle between the straight-ahead extension of the first leg past B and the second leg is \\(71^\\circ\\). Which first step is correct for finding the straight-line distance from A to C?",
    "Use \\(180^\\circ - 71^\\circ = 109^\\circ\\) as the angle at B inside the triangle, then apply the cosine law",
    ["Use the given \\(71^\\circ\\) directly as the angle at B inside the triangle, then apply the cosine law",
     "Use \\(180^\\circ - 71^\\circ = 109^\\circ\\) as the angle at B inside the triangle, then apply the sine law",
     "Use the given \\(71^\\circ\\) directly as the angle at B inside the triangle, then apply the sine law"],
    "The bend is measured from the straight-ahead extension, outside the triangle, so the interior angle at B is \\(180^\\circ - 71^\\circ = 109^\\circ\\). It sits between the two known legs, so the cosine law applies: \\(d^2 = 280^2 + 350^2 - 2(280)(350)\\cos 109^\\circ \\approx 264711\\), giving \\(d \\approx \\)<b>\\(514.5\\text{ m}\\)</b>.",
    {});},
  function(){return mcq("Two points M and N are \\(95\\text{ m}\\) apart on a straight road, and a tower T stands off the road. Inside the triangle, the angle at M is \\(38^\\circ\\). At N, the road continues straight past N, and the angle between that extension and the line from N to the tower is \\(67^\\circ\\). Which first step is correct for finding the distance from N to the tower?",
    "Use \\(180^\\circ - 67^\\circ = 113^\\circ\\) as the angle at N inside the triangle, then apply the sine law",
    ["Use the given \\(67^\\circ\\) directly as the angle at N inside the triangle, then apply the sine law",
     "Use \\(180^\\circ - 67^\\circ = 113^\\circ\\) as the angle at N inside the triangle, then apply the cosine law",
     "Use the given \\(67^\\circ\\) directly as the angle at N inside the triangle, then apply the cosine law"],
    "The \\(67^\\circ\\) angle is outside the triangle on the straight road, so the interior angle at N is \\(180^\\circ - 67^\\circ = 113^\\circ\\). The third angle is \\(180^\\circ - 38^\\circ - 113^\\circ = 29^\\circ\\), and the sine law gives \\(NT = \\frac{95 \\sin 38^\\circ}{\\sin 29^\\circ} \\approx \\)<b>\\(120.6\\text{ m}\\)</b>. Only one side is known, so the cosine law cannot start.",
    {});}
]));
E("u1-diagram-chain-setup",1,["7.1","7.2"],3,"var",varset([
  function(){return mcq("Two triangular fields share a fence line AC. In the first field, \\(\\triangle ABC\\), the outside fences are \\(AB = 90\\text{ m}\\) and \\(BC = 70\\text{ m}\\) with the angle at B equal to \\(80^\\circ\\). In the second field, \\(\\triangle ACD\\), the angles at A and D are \\(55^\\circ\\) and \\(65^\\circ\\). The task is to find CD. Which representation plan is correct?",
    "Draw AC as the unknown in the first triangle, find it with the cosine law from the \\(90\\text{ m}\\) and \\(70\\text{ m}\\) sides and their included angle, then work in the second triangle",
    ["Start in the second triangle and find AC from its two given angles first, then carry AC back into the first triangle to finish the problem",
     "Draw the two fields as one big triangle with A and D as its far corners, and apply the cosine law once to the outside fences to get CD",
     "Draw AC as the unknown in the first triangle, but find it with the sine law, pairing the \\(90\\text{ m}\\) side with the \\(80^\\circ\\) angle as opposite sides"],
    "The second triangle has no known side, so nothing there can be found until AC is known. In the first triangle, AC sits opposite the \\(80^\\circ\\) angle between the two known fences, which is the cosine law case. The correct plan is <b>find the shared side AC with the cosine law in the first triangle, then work in the second triangle</b>. The \\(80^\\circ\\) angle is opposite AC, not opposite the \\(90\\text{ m}\\) side, so the sine-law pairing in the last option is wrong.",
    {});},
  function(){return mcq("Two points A and B on a lake shore are \\(150\\text{ m}\\) apart, and a buoy C forms a triangle with them; the angles at A and B in that triangle are \\(62^\\circ\\) and \\(48^\\circ\\). Across the side AC, a second triangle ACD shares the side AC, with a dock at D and angles at A and D of \\(50^\\circ\\) and \\(58^\\circ\\). The task is to find CD. Which representation plan is correct?",
    "Draw AC as the unknown in the shore triangle, find its third angle and then AC with the sine law, then work in the second triangle",
    ["Start in the dock triangle and find AC from its two given angles first, then carry AC back into the shore triangle to finish the problem",
     "Draw the shore points and the dock as one big triangle, and apply the sine law once to the outside measurements to get CD",
     "Draw AC as the unknown in the shore triangle, but find it with the cosine law from the \\(150\\text{ m}\\) side and the two given angles at A and B"],
    "The dock triangle has no known side, so it cannot be started. In the shore triangle, the third angle is \\(180^\\circ - 62^\\circ - 48^\\circ = 70^\\circ\\), and the \\(150\\text{ m}\\) side sits opposite it, a complete pair for the sine law. The correct plan is <b>find the shared side AC with the sine law in the shore triangle, then work in the second triangle</b>. The cosine law cannot run on one known side.",
    {});},
  function(){return mcq("Two triangular lots share a driveway edge AC. In the first lot, \\(\\triangle ABC\\), \\(\\angle A = 45^\\circ\\), side \\(a = 60\\text{ m}\\) opposite \\(\\angle A\\), and side \\(c = 52\\text{ m}\\). In the second lot, \\(\\triangle ACD\\), the angles at C and D are \\(64^\\circ\\) and \\(51^\\circ\\). The task is to find CD. Which representation plan is correct?",
    "Draw AC as the unknown in the first lot, find it with the sine law from the \\(45^\\circ\\) angle and its opposite \\(60\\text{ m}\\) side, checking the diagram for the ambiguous case, then work in the second lot",
    ["Start in the second lot and find AC from its two given angles first, then carry AC back into the first lot to finish the problem",
     "Draw the two lots as one big triangle, and apply the sine law once to the outside measurements to finish the problem",
     "Draw AC as the unknown in the first lot, but find it with the cosine law, which the first lot's marked sides and angle support directly"],
    "The second lot has no known side, so it waits for AC. In the first lot, the \\(45^\\circ\\) angle and its opposite \\(60\\text{ m}\\) side form a complete pair, so the sine law finds the angles and then AC; this is the ambiguous case, so the diagram confirms which angle fits. The correct plan is <b>find the shared side AC with the sine law in the first lot, then work in the second lot</b>. The cosine law would need the included angle or all three sides.",
    {});},
  function(){return mcq("Two triangular garden beds share a path edge AC. In the first bed, \\(\\triangle ABC\\), the angles at A and B are \\(58^\\circ\\) and \\(71^\\circ\\), and side \\(a = 34\\text{ m}\\) sits opposite \\(\\angle A\\). In the second bed, \\(\\triangle ACD\\), the angles at A and D are \\(47^\\circ\\) and \\(66^\\circ\\). The task is to find CD. Which representation plan is correct?",
    "Draw AC as the unknown in the first bed, find it with the sine law using the \\(34\\text{ m}\\) side paired with its opposite \\(58^\\circ\\) angle, then work in the second bed",
    ["Start in the second bed and find AC from its two given angles first, then carry AC back into the first bed to finish the problem",
     "Draw the two beds as one big triangle, and apply the cosine law once to the outside measurements to get CD",
     "Draw AC as the unknown in the first bed, but find it with the cosine law from the \\(34\\text{ m}\\) side and the two given angles at A and B"],
    "The second bed has no known side, so it cannot be started. In the first bed, side a and angle A are a complete opposite pair, and AC sits opposite the \\(71^\\circ\\) angle, so the sine law finds AC in one proportion. The correct plan is <b>find the shared side AC with the sine law in the first bed, then work in the second bed</b>.",
    {});}
]));
E("u1-diagram-flaw-hunt",1,["7.1","7.2"],3,"var",varset([
  function(){return mcq("A problem states: in \\(\\triangle ABC\\), \\(\\angle A = 62^\\circ\\), side \\(a = 15\\text{ cm}\\) opposite \\(\\angle A\\), and side \\(b = 11\\text{ cm}\\); find \\(\\angle B\\), then side c. A student's setup reads: Diagram: angle A is marked \\(62^\\circ\\); the side opposite angle A is labelled \\(11\\text{ cm}\\) and the side opposite angle B is labelled \\(15\\text{ cm}\\); angle B is marked ?. Equation 1: \\(\\frac{\\sin B}{11} = \\frac{\\sin 62^\\circ}{15}\\). Equation 2: \\(C = 180^\\circ - 62^\\circ - B\\), then \\(\\frac{c}{\\sin C} = \\frac{15}{\\sin 62^\\circ}\\). Where is the flaw in this setup?",
    "The diagram: a side is paired with the wrong angle",
    ["Equation 1: the wrong law is chosen for the information given",
     "Equation 2: a value is substituted for the wrong side",
     "The setup is correct: there is no flaw"],
    "Equation 1 pairs \\(\\sin B\\) with \\(11\\) and \\(\\sin 62^\\circ\\) with \\(15\\), which matches the problem, and Equation 2 reuses that same known pair correctly. The diagram does not match: it puts \\(15\\text{ cm}\\) across from angle B and \\(11\\text{ cm}\\) across from angle A, the reverse of the problem. The flaw is <b>in the diagram, where a side is paired with the wrong angle</b>.",
    {});},
  function(){return mcq("A problem states: in \\(\\triangle PQR\\), \\(\\angle P = 58^\\circ\\), side \\(p = 18\\text{ m}\\) opposite \\(\\angle P\\), and side \\(q = 13\\text{ m}\\); find \\(\\angle Q\\), then side r. A student's setup reads: Diagram: angle P is marked \\(58^\\circ\\); the side opposite angle P is labelled \\(18\\text{ m}\\) and the side opposite angle Q is labelled \\(13\\text{ m}\\); angle Q is marked ?. Equation 1: \\(q^2 = p^2 + r^2 - 2pr\\cos Q\\). Equation 2: \\(R = 180^\\circ - 58^\\circ - Q\\), then \\(\\frac{r}{\\sin R} = \\frac{18}{\\sin 58^\\circ}\\). Where is the flaw in this setup?",
    "Equation 1: the wrong law is chosen for the information given",
    ["The diagram: a side is paired with the wrong angle",
     "Equation 2: a value is substituted for the wrong side",
     "The setup is correct: there is no flaw"],
    "The diagram matches the problem, and Equation 2 correctly reuses the known pair, \\(18\\text{ m}\\) opposite \\(58^\\circ\\). Equation 1 reaches for the cosine law, which involves the unknown side r and cannot give angle Q here; the known pair makes this a sine-law start: \\(\\frac{\\sin Q}{13} = \\frac{\\sin 58^\\circ}{18}\\). The flaw is <b>in Equation 1, where the wrong law is chosen</b>.",
    {});},
  function(){return mcq("A problem states: in \\(\\triangle DEF\\), \\(\\angle D = 57^\\circ\\), side \\(d = 20\\text{ km}\\) opposite \\(\\angle D\\), and side \\(e = 14\\text{ km}\\); find \\(\\angle E\\), then side f. A student's setup reads: Diagram: angle D is marked \\(57^\\circ\\); the side opposite angle D is labelled \\(20\\text{ km}\\) and the side opposite angle E is labelled \\(14\\text{ km}\\); angle E is marked ?. Equation 1: \\(\\frac{\\sin E}{14} = \\frac{\\sin 57^\\circ}{20}\\). Equation 2: \\(F = 180^\\circ - 57^\\circ - E\\), then \\(\\frac{f}{\\sin F} = \\frac{14}{\\sin 57^\\circ}\\). Where is the flaw in this setup?",
    "Equation 2: a value is substituted for the wrong side",
    ["The diagram: a side is paired with the wrong angle",
     "Equation 1: the wrong law is chosen for the information given",
     "The setup is correct: there is no flaw"],
    "The diagram matches the problem, and Equation 1 pairs each side with its opposite angle, giving \\(\\sin E \\approx 0.587\\), so \\(E \\approx 36^\\circ\\). Equation 2 then anchors the proportion on \\(14\\), but \\(14\\text{ km}\\) is side e, opposite angle E, not opposite the \\(57^\\circ\\) angle; the known pair is \\(20\\) with \\(57^\\circ\\), so it should read \\(\\frac{f}{\\sin F} = \\frac{20}{\\sin 57^\\circ}\\). The flaw is <b>in Equation 2, where a value is substituted for the wrong side</b>.",
    {});},
  function(){return mcq("A problem states: in \\(\\triangle XYZ\\), \\(\\angle X = 60^\\circ\\), side \\(x = 16\\text{ cm}\\) opposite \\(\\angle X\\), and side \\(y = 12\\text{ cm}\\); find \\(\\angle Y\\), then side z. A student's setup reads: Diagram: angle X is marked \\(60^\\circ\\); the side opposite angle X is labelled \\(16\\text{ cm}\\) and the side opposite angle Y is labelled \\(12\\text{ cm}\\); angle Y is marked ?. Equation 1: \\(\\frac{\\sin Y}{12} = \\frac{\\sin 60^\\circ}{16}\\). Equation 2: \\(Z = 180^\\circ - 60^\\circ - Y\\), then \\(\\frac{z}{\\sin Z} = \\frac{16}{\\sin 60^\\circ}\\). Where is the flaw in this setup?",
    "The setup is correct: there is no flaw",
    ["The diagram: a side is paired with the wrong angle",
     "Equation 1: the wrong law is chosen for the information given",
     "Equation 2: a value is substituted for the wrong side"],
    "Every part checks out: the diagram pairs \\(16\\text{ cm}\\) with the \\(60^\\circ\\) angle and \\(12\\text{ cm}\\) with angle Y, Equation 1 uses the sine law on that pair (\\(\\sin Y = \\frac{12 \\sin 60^\\circ}{16} \\approx 0.650\\), so \\(Y \\approx 40.5^\\circ\\)), and Equation 2 finds \\(Z \\approx 79.5^\\circ\\) and reuses the same known pair for side z. <b>The setup is correct: there is no flaw</b>.",
    {});}
]));
E("u1-diagram-complete-plan",1,["7.1","7.2"],3,"gen",function(){
  var mode=pick(["ASA","SAS"]),tries=0,ok=false;
  var A=0,B=0,C=0,c=0,b=0,key="",d1="",d2="",d3="",prompt="",sol="";
  while(!ok&&tries<400){tries++;
    if(mode==="ASA"){
      A=ri(35,58);B=ri(35,58);C=180-A-B;c=ri(12,36);
      if(C<35||C>80)continue;
      prompt="A triangular plot has angles \\(\\angle A = "+A+"^\\circ\\) and \\(\\angle B = "+B+"^\\circ\\) with the side between them measuring \\("+c+"\\text{ m}\\). Which plan solves the whole triangle, in a workable order?";
      key="First, find the third angle with the angle sum: \\(180^\\circ - "+A+"^\\circ - "+B+"^\\circ = "+C+"^\\circ\\). Next, use the sine law with the "+c+" m side and its opposite angle to find a second side. Finally, use the sine law again to find the last side.";
      d1="First, use the sine law with the "+c+" m side to find a second side. Next, find the third angle with the angle sum: \\(180^\\circ - "+A+"^\\circ - "+B+"^\\circ = "+C+"^\\circ\\). Finally, use the sine law again to find the last side.";
      d2="First, find the third angle with the angle sum: \\(180^\\circ - "+A+"^\\circ - "+B+"^\\circ = "+C+"^\\circ\\). Next, use the cosine law with the "+c+" m side to find a second side. Finally, use the sine law to find the last side.";
      d3="First, use the cosine law with the "+c+" m side to find the third angle. Next, use the sine law to find a second side. Finally, use the sine law again to find the last side.";
      sol="The known side sits opposite the third angle, so no law has a complete pair until the angle sum runs: \\(\\angle C = "+C+"^\\circ\\). After that, the sine law works twice, once for each unknown side. The cosine law cannot find a side while only one side is known, and it cannot produce an angle from one side either. The workable plan is <b>angle sum first, then the sine law for each unknown side in turn</b>.";
    }else{
      b=ri(9,24);c=ri(9,24);A=ri(45,95);
      prompt="A triangular frame has sides \\(b = "+b+"\\text{ m}\\) and \\(c = "+c+"\\text{ m}\\) with the included angle \\(\\angle A = "+A+"^\\circ\\) between them. Which plan solves the whole triangle, in a workable order?";
      key="First, use the cosine law with the "+b+" m and "+c+" m sides and the included "+A+"° angle to find the third side. Next, use the sine law to find one of the unknown angles. Finally, use the angle sum to find the last angle.";
      d1="First, use the sine law to find one of the unknown angles. Next, use the cosine law with the "+b+" m and "+c+" m sides and the included "+A+"° angle to find the third side. Finally, use the angle sum to find the last angle.";
      d2="First, use the sine law with the "+b+" m and "+c+" m sides and the included "+A+"° angle to find the third side. Next, use the cosine law to find one of the unknown angles. Finally, use the angle sum to find the last angle.";
      d3="First, use the cosine law with the "+b+" m and "+c+" m sides and the included "+A+"° angle to find the third side. Next, use the angle sum to find the last angle. Finally, use the sine law to find the remaining unknown angle.";
      sol="The side opposite the known angle is unknown, so the sine law has no complete pair at the start, and the angle sum cannot run with one known angle. The cosine law opens the problem by giving the third side; after that, the sine law finds an angle (using the smaller known side keeps that angle acute), and the angle sum finishes. The workable plan is <b>cosine law first, then the sine law, then the angle sum</b>.";
    }
    var os=[key,d1,d2,d3];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  return mcq(prompt,key,[d1,d2,d3],sol,
    mode==="ASA"?{mode:mode,A:A,B:B,C:C,c:c}:{mode:mode,b:b,c:c,A:A});
});
E("u1-diagram-both-laws",1,["7.1","7.2"],3,"var",varset([
  function(){return mcq("A triangle is drawn from two angles, \\(54^\\circ\\) and \\(71^\\circ\\), and the side between them, \\(22\\text{ m}\\). Which statement about starting this problem is correct?",
    "The sine law can start, but only after the third angle is found from the angle sum, because the \\(22\\text{ m}\\) side then sits opposite a known angle; the cosine law cannot start, since it needs two known sides and only one side is known",
    ["The cosine law can start right away, because two known angles and one known side give it everything it needs; the sine law cannot start at all, since the known side sits between the angles and is opposite no angle in the triangle",
     "Either law can start right away, because two known angles and a known side are enough for the cosine law as well as for the sine law, and no angle has to be calculated before one of the laws is applied to the marks",
     "Neither law can start this problem, because the only known side is the one between the two known angles, so it can never be paired with an angle, and a problem like this has to be started with a scale drawing instead"],
    "The third angle is \\(180^\\circ - 54^\\circ - 71^\\circ = 55^\\circ\\), and the \\(22\\text{ m}\\) side sits opposite it, so once that angle is found the sine law has a complete pair. The cosine law needs two sides around a known angle, and only one side is known. The correct statement is <b>the sine law can start after the angle sum, and the cosine law cannot start</b>.",
    {});},
  function(){return mcq("A triangle is drawn from two sides, \\(13\\text{ m}\\) and \\(19\\text{ m}\\), and the angle between them, \\(76^\\circ\\). Which statement about starting this problem is correct?",
    "The cosine law can start, because the two known sides and the angle between them are exactly what it uses; the sine law cannot start, since the side opposite the known angle is unknown and no complete pair exists yet",
    ["The sine law can start, because the two known sides and the angle between them form a complete pair; the cosine law cannot start, since it needs the side opposite the known angle, which is the unknown in this problem",
     "Either law can start right away, because two known sides and a known angle are enough information for the sine law as well as for the cosine law, and each law would give the third side in a single first step",
     "Neither law can start this problem, because the known angle sits between the two known sides rather than opposite one of them, so no law can use it until another angle in the triangle has been found first"],
    "A complete sine-law pair needs a side whose opposite angle is known; here the side opposite the \\(76^\\circ\\) angle is the unknown, so the sine law has nothing to anchor to. The cosine law is built for two sides with the included angle. The correct statement is <b>the cosine law can start, and the sine law cannot start</b>.",
    {});},
  function(){return mcq("A triangle is drawn from three sides, \\(8\\text{ cm}\\), \\(11\\text{ cm}\\) and \\(14\\text{ cm}\\), with no angle given. Which statement about starting this problem is correct?",
    "Only the cosine law can start, rearranged to give an angle from the three sides; the sine law cannot start, because it needs a known angle paired with its opposite side and no angle in this problem is known",
    ["Only the sine law can start, by setting the three sides as three equal ratios; the cosine law cannot start, because it needs a known angle to work from and no angle in this problem is known at the beginning",
     "Either law can start right away, because three known sides are enough information for the sine law as well as for the cosine law, and each one would give an angle of the triangle in a single first step",
     "Neither law can start this problem, because every law needs at least one known angle to begin with, so a triangle given by three sides alone cannot be started until an angle is measured from a drawing"],
    "The sine law is a proportion between sides and sines of angles, so with no angle known it cannot be set up. The cosine law rearranged, \\(\\cos A = \\frac{b^2 + c^2 - a^2}{2bc}\\), uses the three sides alone to give an angle. The correct statement is <b>only the cosine law can start</b>.",
    {});},
  function(){return mcq("A triangle is drawn from an angle of \\(43^\\circ\\), the side opposite it, \\(10\\text{ cm}\\), and another side, \\(13\\text{ cm}\\). Which statement about starting this problem is correct?",
    "The sine law can start, because the \\(43^\\circ\\) angle and its opposite \\(10\\text{ cm}\\) side form a complete pair, but the angle it gives must be checked against the diagram since its supplement has the same sine; the cosine law cannot start here",
    ["The cosine law can start, because two known sides and a known angle are exactly what it uses; the sine law cannot start, since the second known side is not opposite the known angle and so no pair can be formed from the marks",
     "The sine law can start, because the \\(43^\\circ\\) angle and its opposite \\(10\\text{ cm}\\) side form a complete pair, and the angle it returns is always the one angle that fits, with no supplement ever needing to be checked against the diagram",
     "Either law can start right away, because two known sides and any known angle are enough for the cosine law as well as for the sine law, and each one would give the next part of the triangle in a single step"],
    "The \\(43^\\circ\\) angle and the \\(10\\text{ cm}\\) side opposite it are a complete pair, so the sine law starts; but \\(\\sin\\theta = \\sin(180^\\circ - \\theta)\\), so the angle it returns has a supplement with the same sine, and the diagram decides which one fits. The cosine law would need the included angle or the third side. The correct statement is <b>the sine law can start, with the ambiguous-case caution, and the cosine law cannot start</b>.",
    {});}
]));

// Math 2201 Unit 1 enrichment batch B: indicator 7.2 only (sine law / cosine law, one triangle).
// 23 new entries: 6 Level 1, 11 Level 2, 6 Level 3. All figures slanted via triRotSVG
// except the MC entries 5, 9, 14, 15 and the var entry 21, which carry no figure.
// Suggested CR marks for the num entries (MC entries carry no CR line here):
// CR: u1-ferry-distance=2
// CR: u1-sail-angle=2
// CR: u1-survey-baseline=2
// CR: u1-fence-angle=2
// CR: u1-orchard-tree=2
// CR: u1-lighthouse-bearing=2
// CR: u1-pipeline-angle=3
// CR: u1-panel-perimeter=3
// CR: u1-raft-crossing=2
// CR: u1-harbour-second-side=3
// CR: u1-rafter-span=2
// CR: u1-lock-gates=2
// CR: u1-meadow-angle=2
// CR: u1-regatta-choice=4
// CR: u1-perimeter-angles=3
// CR: u1-isosceles-span=2
// CR: u1-two-lamps=3
// CR: u1-scaffold-bay=3
E("u1-ferry-distance",1,["7.2"],1,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var v1=ri(14,30),v2=ri(14,30),t=pick([0.5,1,1.5,2]);
  var d1=v1*t,d2=v2*t,th=ri(40,130);
  var D=Math.sqrt(d1*d1+d2*d2-2*d1*d2*Math.cos(rd(th)));
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("Two ferries leave the same terminal at the same time. One travels at "+v1+" km/h and the other at "+v2+" km/h, with an angle of \\("+th+"^\\circ\\) between their routes. After "+t+" h, how far apart are the ferries, to one decimal place, in km?",
    Math.round(D*10)/10,0.06,
    "In "+t+" h the ferries travel \\("+v1+" \\times "+t+" = "+fmt(d1,1)+"\\text{ km}\\) and \\("+v2+" \\times "+t+" = "+fmt(d2,1)+"\\text{ km}\\). The two routes and the distance apart form a triangle with included angle \\("+th+"^\\circ\\), so the cosine law gives \\(D^2 = "+fmt(d1,1)+"^2 + "+fmt(d2,1)+"^2 - 2("+fmt(d1,1)+")("+fmt(d2,1)+")\\cos "+th+"^\\circ \\approx "+fmt(D*D,1)+"\\). Taking the square root, \\(D \\approx \\)<b>\\("+fmt(D,1)+"\\text{ km}\\)</b>.",
    {v1:v1,v2:v2,t:t,d1:d1,d2:d2,th:th,rot:rot});
  q.figure=triRotSVG(D,d2,d1,{L:["A","B","C"],ang:[th+"°",null,null],side:["?",fmt(d2,1)+" km",fmt(d1,1)+" km"],rot:rot});
  return q;
});
E("u1-sail-angle",1,["7.2"],1,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var A=0,a=0,Btar=0,b=0,Brev=0,tries=0;
  while(tries<400){tries++;
    A=pick([30,35,40,45,50]);a=ri(6,14);Btar=pick([40,45,50,55,60,65,70]);
    if(Btar<=A||A+Btar>=165)continue;
    b=Math.round(a*Math.sin(rd(Btar))/Math.sin(rd(A))*10)/10;
    var s=b*Math.sin(rd(A))/a;if(s>=1)continue;
    Brev=Math.asin(s)*180/Math.PI;
    if(Brev<20||Brev>85)continue;
    break;
  }
  var C=180-A-Brev;
  var c=a*Math.sin(rd(C))/Math.sin(rd(A));
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("A triangular sail has corners \\(A\\), \\(B\\) and \\(C\\). The edge opposite \\(\\angle A\\) measures \\("+a+"\\text{ m}\\) and \\(\\angle A = "+A+"^\\circ\\). The edge opposite \\(\\angle B\\) measures \\("+fmt(b,1)+"\\text{ m}\\). Find \\(\\angle B\\), to the nearest degree.",
    Math.round(Brev),0.51,
    "Use the sine law and pair each edge with its opposite angle: \\(\\frac{\\sin B}{"+fmt(b,1)+"} = \\frac{\\sin "+A+"^\\circ}{"+a+"}\\), so \\(\\sin B = \\frac{"+fmt(b,1)+" \\times \\sin "+A+"^\\circ}{"+a+"} \\approx "+fmt(b*Math.sin(rd(A))/a,4)+"\\). Then \\(\\angle B = \\sin^{-1}("+fmt(b*Math.sin(rd(A))/a,4)+") \\approx \\)<b>\\("+Math.round(Brev)+"^\\circ\\)</b>. The sail is drawn with \\(\\angle B\\) acute, so the acute value is the one that fits.",
    {A:A,a:a,b:b,Brev:Brev,rot:rot});
  q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:[A+"°","?",null],side:[a+" m",fmt(b,1)+" m",null],rot:rot});
  return q;
});
E("u1-survey-baseline",1,["7.2"],1,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var A=0,B=0,C=0,base=0,tries=0;
  while(tries<400){tries++;
    A=ri(38,68);B=ri(38,68);C=180-A-B;
    if(C<35||C>105)continue;
    base=ri(25,75);break;
  }
  var b=base*Math.sin(rd(B))/Math.sin(rd(C));
  var aside=base*Math.sin(rd(A))/Math.sin(rd(C));
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("A surveyor marks two points \\(A\\) and \\(B\\) that are \\("+base+"\\text{ m}\\) apart and sights a landmark \\(C\\) from both. At \\(A\\), the angle between the baseline and the line to the landmark is \\("+A+"^\\circ\\); at \\(B\\), the angle between the baseline and the line to the landmark is \\("+B+"^\\circ\\). How far is the landmark from \\(A\\), to one decimal place, in m?",
    Math.round(b*10)/10,0.06,
    "The two points and the landmark form a triangle. Its third angle is \\(\\angle C = 180^\\circ - "+A+"^\\circ - "+B+"^\\circ = "+C+"^\\circ\\). The distance from \\(A\\) to the landmark is opposite \\(\\angle B\\), so the sine law gives \\(\\frac{AC}{\\sin "+B+"^\\circ} = \\frac{"+base+"}{\\sin "+C+"^\\circ}\\), and \\(AC = \\frac{"+base+" \\times \\sin "+B+"^\\circ}{\\sin "+C+"^\\circ} \\approx \\)<b>\\("+fmt(b,1)+"\\text{ m}\\)</b>.",
    {A:A,B:B,C:C,base:base,rot:rot});
  q.figure=triRotSVG(aside,b,base,{L:["A","B","C"],ang:[A+"°",B+"°",null],side:[null,"?",base+" m"],rot:rot});
  return q;
});
E("u1-fence-angle",1,["7.2"],1,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var Atar=0,b=0,c=0,a=0,Arev=0,tries=0;
  while(tries<400){tries++;
    Atar=pick([40,45,50,55,60,65,70,75,80]);b=ri(8,20);c=ri(8,20);
    a=Math.round(Math.sqrt(b*b+c*c-2*b*c*Math.cos(rd(Atar)))*10)/10;
    var cs=(b*b+c*c-a*a)/(2*b*c);if(Math.abs(cs)>=1)continue;
    Arev=Math.acos(cs)*180/Math.PI;
    if(Arev<25||Arev>88)continue;
    break;
  }
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("Three fence lengths of \\("+fmt(a,1)+"\\text{ m}\\), \\("+b+"\\text{ m}\\) and \\("+c+"\\text{ m}\\) form a triangular pen. Find the angle at the corner opposite the \\("+fmt(a,1)+"\\text{ m}\\) side, to the nearest degree.",
    Math.round(Arev),0.51,
    "With all three sides known, rearrange the cosine law for the angle opposite the \\("+fmt(a,1)+"\\text{ m}\\) side: \\(\\cos A = \\frac{"+b+"^2 + "+c+"^2 - "+fmt(a,1)+"^2}{2 \\times "+b+" \\times "+c+"} = \\frac{"+(b*b)+" + "+(c*c)+" - "+fmt(a*a,1)+"}{"+(2*b*c)+"} \\approx "+fmt((b*b+c*c-a*a)/(2*b*c),4)+"\\). So \\(A = \\cos^{-1}("+fmt((b*b+c*c-a*a)/(2*b*c),4)+") \\approx \\)<b>\\("+Math.round(Arev)+"^\\circ\\)</b>.",
    {a:a,b:b,c:c,Arev:Arev,rot:rot});
  q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:["?",null,null],side:[fmt(a,1)+" m",b+" m",c+" m"],rot:rot});
  return q;
});
E("u1-crane-spread",1,["7.2"],1,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var s1=0,s2=0,th=0,key=0,d1=0,d2=0,d3=0,tries=0,ok=false;
  while(!ok&&tries<400){tries++;
    s1=ri(6,16);s2=ri(6,16);th=ri(45,125);
    key=Math.sqrt(s1*s1+s2*s2-2*s1*s2*Math.cos(rd(th)));
    d1=Math.sqrt(s1*s1+s2*s2+2*s1*s2*Math.cos(rd(th)));
    d2=Math.sqrt(s1*s1+s2*s2-2*s1*s2*Math.sin(rd(th)));
    d3=key*key;
    var os=[fmt(key,1),fmt(d1,1),fmt(d2,1),fmt(d3,1)];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  return mcq("Two straps run from a single crane hook down to two attachment points on a load. The straps are "+s1+" m and "+s2+" m long, and the angle between them at the hook is \\("+th+"^\\circ\\). What is the distance between the two attachment points, in m?",
    fmt(key,1),[fmt(d1,1),fmt(d2,1),fmt(d3,1)],
    "The straps and the spread form a triangle with the \\("+th+"^\\circ\\) angle included between the strap lengths, so the cosine law applies: \\(d^2 = "+s1+"^2 + "+s2+"^2 - 2("+s1+")("+s2+")\\cos "+th+"^\\circ \\approx "+fmt(key*key,1)+"\\). Taking the square root, the spread is <b>\\("+fmt(key,1)+"\\text{ m}\\)</b>. (Adding the cosine term instead of subtracting it, or using sine in place of cosine, gives the wrong spread.)",
    {s1:s1,s2:s2,th:th});
});
E("u1-orchard-tree",1,["7.2"],1,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var A=0,B=0,C=0,D=0,tries=0;
  while(tries<400){tries++;
    A=ri(30,60);B=ri(45,75);C=180-A-B;
    if(C<35||C>105)continue;
    D=ri(40,90);break;
  }
  var aside=D*Math.sin(rd(A))/Math.sin(rd(C));
  var bside=D*Math.sin(rd(B))/Math.sin(rd(C));
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("Two corners \\(A\\) and \\(B\\) of an orchard are \\("+D+"\\text{ m}\\) apart. From corner \\(A\\), the angle between the line to corner \\(B\\) and the line to a lone tree is \\("+A+"^\\circ\\); from corner \\(B\\), the angle between the line to corner \\(A\\) and the line to the tree is \\("+B+"^\\circ\\). How far is the tree from corner \\(B\\), to one decimal place, in m?",
    Math.round(aside*10)/10,0.06,
    "The corners and the tree form a triangle, and the angle at the tree is \\(180^\\circ - "+A+"^\\circ - "+B+"^\\circ = "+C+"^\\circ\\). The distance from corner \\(B\\) to the tree is opposite the \\("+A+"^\\circ\\) angle, so the sine law gives \\(\\frac{BT}{\\sin "+A+"^\\circ} = \\frac{"+D+"}{\\sin "+C+"^\\circ}\\), and \\(BT = \\frac{"+D+" \\times \\sin "+A+"^\\circ}{\\sin "+C+"^\\circ} \\approx \\)<b>\\("+fmt(aside,1)+"\\text{ m}\\)</b>.",
    {A:A,B:B,C:C,D:D,rot:rot});
  q.figure=triRotSVG(aside,bside,D,{L:["A","B","C"],ang:[A+"°",B+"°",null],side:["?",null,D+" m"],rot:rot});
  return q;
});
E("u1-lighthouse-bearing",1,["7.2"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var Atar=0,b=0,c=0,a=0,Arev=0,tries=0;
  while(tries<400){tries++;
    Atar=pick([35,40,45,50,55,60,65,70,75,80]);b=ri(4,15);c=ri(4,15);
    a=Math.round(Math.sqrt(b*b+c*c-2*b*c*Math.cos(rd(Atar)))*10)/10;
    var cs=(b*b+c*c-a*a)/(2*b*c);if(Math.abs(cs)>=1)continue;
    Arev=Math.acos(cs)*180/Math.PI;
    if(Arev<20||Arev>88)continue;
    break;
  }
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("Two ships are \\("+c+"\\text{ km}\\) and \\("+b+"\\text{ km}\\) from a lighthouse, and the ships are \\("+fmt(a,1)+"\\text{ km}\\) apart. Find the angle at the lighthouse between the lines to the two ships, to the nearest degree.",
    Math.round(Arev),0.51,
    "The lighthouse and the ships form a triangle with all three sides known, so rearrange the cosine law for the angle at the lighthouse, which sits opposite the \\("+fmt(a,1)+"\\text{ km}\\) side: \\(\\cos A = \\frac{"+b+"^2 + "+c+"^2 - "+fmt(a,1)+"^2}{2 \\times "+b+" \\times "+c+"} \\approx "+fmt((b*b+c*c-a*a)/(2*b*c),4)+"\\). So the angle is \\(\\cos^{-1}("+fmt((b*b+c*c-a*a)/(2*b*c),4)+") \\approx \\)<b>\\("+Math.round(Arev)+"^\\circ\\)</b>.",
    {a:a,b:b,c:c,Arev:Arev,rot:rot});
  q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:["?",null,null],side:[fmt(a,1)+" km",b+" km",c+" km"],rot:rot});
  return q;
});
E("u1-pipeline-angle",1,["7.2"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var p=ri(30,90),q2=ri(30,90),turn=ri(25,65),interior=180-turn;
  var d=Math.sqrt(p*p+q2*q2-2*p*q2*Math.cos(rd(interior)));
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("A pipeline runs in two straight sections of \\("+p+"\\text{ m}\\) and \\("+q2+"\\text{ m}\\). At the joint, the direction of the pipe turns through \\("+turn+"^\\circ\\) away from the straight-ahead direction. Find the straight-line distance between the two ends of the pipeline, to one decimal place, in m.",
    Math.round(d*10)/10,0.06,
    "A straight alignment would make an angle of \\(180^\\circ\\) at the joint, and the pipe turns \\("+turn+"^\\circ\\) away from it, so the interior angle of the triangle at the joint is \\(180^\\circ - "+turn+"^\\circ = "+interior+"^\\circ\\). The cosine law then gives \\(d^2 = "+p+"^2 + "+q2+"^2 - 2("+p+")("+q2+")\\cos "+interior+"^\\circ \\approx "+fmt(d*d,1)+"\\), so \\(d \\approx \\)<b>\\("+fmt(d,1)+"\\text{ m}\\)</b>.",
    {p:p,q:q2,turn:turn,interior:interior,rot:rot});
  q.figure=triRotSVG(q2,d,p,{L:["A","B","C"],ang:[null,interior+"°",null],side:[q2+" m","?",p+" m"],rot:rot});
  return q;
});
E("u1-gate-diagonal",1,["7.2"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var s1=0,s2=0,th=0,key=0,d1=0,d2=0,d3=0,tries=0,ok=false;
  while(!ok&&tries<400){tries++;
    s1=pick([1.2,1.5,1.8,2.0,2.4,2.7,3.0]);s2=pick([1.2,1.5,1.8,2.0,2.4,2.7,3.0]);th=ri(50,110);
    key=Math.sqrt(s1*s1+s2*s2-2*s1*s2*Math.cos(rd(th)));
    d1=Math.sqrt(s1*s1+s2*s2+2*s1*s2*Math.cos(rd(th)));
    d2=Math.sqrt(s1*s1+s2*s2-2*s1*s2*Math.sin(rd(th)));
    d3=key*key;
    var os=[fmt(key,1),fmt(d1,1),fmt(d2,1),fmt(d3,1)];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  return mcq("A triangular gate brace is formed by two sides of "+fmt(s1,1)+" m and "+fmt(s2,1)+" m with an angle of \\("+th+"^\\circ\\) between them. How long is the diagonal brace that joins their far ends, in m?",
    fmt(key,1),[fmt(d1,1),fmt(d2,1),fmt(d3,1)],
    "The diagonal sits opposite the angle between the two known sides, so the cosine law applies: \\(d^2 = "+fmt(s1,1)+"^2 + "+fmt(s2,1)+"^2 - 2("+fmt(s1,1)+")("+fmt(s2,1)+")\\cos "+th+"^\\circ \\approx "+fmt(key*key,1)+"\\). Taking the square root, the brace is <b>\\("+fmt(key,1)+"\\text{ m}\\)</b>. (Adding the cosine term is a sign error, and using sine in place of cosine does not fit the included angle.)",
    {s1:s1,s2:s2,th:th});
});
E("u1-panel-perimeter",1,["7.2"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var a=ri(2,6),b=ri(2,6),C=ri(45,120);
  var c=Math.sqrt(a*a+b*b-2*a*b*Math.cos(rd(C)));
  var P=a+b+c;
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("A triangular solar panel has two edges of \\("+a+"\\text{ m}\\) and \\("+b+"\\text{ m}\\) with an angle of \\("+C+"^\\circ\\) between them. Find the perimeter of the panel, to one decimal place, in m.",
    Math.round(P*10)/10,0.06,
    "First find the third edge with the cosine law, since it sits opposite the included angle: \\(c^2 = "+a+"^2 + "+b+"^2 - 2("+a+")("+b+")\\cos "+C+"^\\circ \\approx "+fmt(c*c,1)+"\\), so \\(c \\approx "+fmt(c,1)+"\\text{ m}\\). The perimeter adds all three edges: \\("+a+" + "+b+" + "+fmt(c,1)+" \\approx \\)<b>\\("+fmt(P,1)+"\\text{ m}\\)</b>.",
    {a:a,b:b,C:C,c:c,rot:rot});
  q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:[null,null,C+"°"],side:[a+" m",b+" m","?"],rot:rot});
  return q;
});
E("u1-raft-crossing",1,["7.2"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var A=0,Btar=0,b=0,a=0,Brev=0,tries=0;
  while(tries<400){tries++;
    A=pick([55,60,65,70]);Btar=pick([30,35,40,45]);
    if(Btar>=A-10)continue;
    b=ri(8,18);
    a=Math.round(b*Math.sin(rd(A))/Math.sin(rd(Btar))*10)/10;
    if(a<=b)continue;
    var s=b*Math.sin(rd(A))/a;if(s>=1)continue;
    Brev=Math.asin(s)*180/Math.PI;
    if(Brev<15||Brev>85)continue;
    break;
  }
  var C=180-A-Brev;
  var c=a*Math.sin(rd(C))/Math.sin(rd(A));
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("A raft crossing is modelled by \\(\\triangle ABC\\), where \\(\\angle A = "+A+"^\\circ\\), side \\(b = "+b+"\\text{ m}\\) and side \\(a = "+fmt(a,1)+"\\text{ m}\\) (side \\(a\\) is opposite \\(\\angle A\\)). Because side \\(a\\) is longer than side \\(b\\), only one triangle fits. Find \\(\\angle B\\), to the nearest degree.",
    Math.round(Brev),0.51,
    "Use the sine law with the known pair \\(a\\) and \\(\\angle A\\): \\(\\frac{\\sin B}{"+b+"} = \\frac{\\sin "+A+"^\\circ}{"+fmt(a,1)+"}\\), so \\(\\sin B = \\frac{"+b+" \\times \\sin "+A+"^\\circ}{"+fmt(a,1)+"} \\approx "+fmt(b*Math.sin(rd(A))/a,4)+"\\). Then \\(\\angle B = \\sin^{-1}("+fmt(b*Math.sin(rd(A))/a,4)+") \\approx \\)<b>\\("+Math.round(Brev)+"^\\circ\\)</b>. Since \\(a > b\\), the supplement of this value cannot fit with \\(\\angle A\\), so this is the only possible value.",
    {A:A,a:a,b:b,Brev:Brev,rot:rot});
  q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:[A+"°","?",null],side:[fmt(a,1)+" m",b+" m",null],rot:rot});
  return q;
});
E("u1-harbour-second-side",1,["7.2"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var A=0,B=0,C=0,a=0,tries=0;
  while(tries<400){tries++;
    A=ri(35,65);B=ri(35,65);C=180-A-B;
    if(C<40||C>100)continue;
    a=ri(15,40);break;
  }
  var b=a*Math.sin(rd(B))/Math.sin(rd(A));
  var c=a*Math.sin(rd(C))/Math.sin(rd(A));
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("A harbour triangle \\(ABC\\) has \\(\\angle A = "+A+"^\\circ\\), \\(\\angle B = "+B+"^\\circ\\) and side \\(a = "+a+"\\text{ m}\\) opposite \\(\\angle A\\). Find side \\(c\\), to one decimal place, in m.",
    Math.round(c*10)/10,0.06,
    "First the third angle: \\(\\angle C = 180^\\circ - "+A+"^\\circ - "+B+"^\\circ = "+C+"^\\circ\\). The sine law proportion from the known pair is \\(\\frac{"+a+"}{\\sin "+A+"^\\circ} \\approx "+fmt(a/Math.sin(rd(A)),2)+"\\). As a check, side \\(b = "+fmt(a/Math.sin(rd(A)),2)+" \\times \\sin "+B+"^\\circ \\approx "+fmt(b,1)+"\\text{ m}\\). Using the same proportion for side \\(c\\): \\(c = "+fmt(a/Math.sin(rd(A)),2)+" \\times \\sin "+C+"^\\circ \\approx \\)<b>\\("+fmt(c,1)+"\\text{ m}\\)</b>.",
    {A:A,B:B,C:C,a:a,b:b,rot:rot});
  q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:[A+"°",B+"°",null],side:[a+" m",null,"?"],rot:rot});
  return q;
});
E("u1-rafter-span",1,["7.2"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var r1=ri(4,9),r2=ri(4,9),tries=0;
  while(r1===r2&&tries<40){r2=ri(4,9);tries++;}
  var th=ri(35,85);
  var span=Math.sqrt(r1*r1+r2*r2-2*r1*r2*Math.cos(rd(th)));
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("A roof truss has two rafters of \\("+r1+"\\text{ m}\\) and \\("+r2+"\\text{ m}\\) meeting at the apex with an angle of \\("+th+"^\\circ\\) between them. Find the span across the bottom of the truss, to one decimal place, in m.",
    Math.round(span*10)/10,0.06,
    "The rafters and the span form a triangle with the apex angle included between the rafter lengths, so the cosine law gives \\(s^2 = "+r1+"^2 + "+r2+"^2 - 2("+r1+")("+r2+")\\cos "+th+"^\\circ \\approx "+fmt(span*span,1)+"\\). Taking the square root, the span is <b>\\("+fmt(span,1)+"\\text{ m}\\)</b>.",
    {r1:r1,r2:r2,th:th,rot:rot});
  q.figure=triRotSVG(span,r2,r1,{L:["A","B","C"],ang:[th+"°",null,null],side:["?",r2+" m",r1+" m"],rot:rot});
  return q;
});
E("u1-kite-spar",1,["7.2"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var s1=0,s2=0,th=0,key=0,d1=0,d2=0,d3=0,tries=0,ok=false;
  while(!ok&&tries<400){tries++;
    s1=pick([0.6,0.8,0.9,1.0,1.2,1.5]);s2=pick([0.6,0.8,0.9,1.0,1.2,1.5]);th=ri(40,110);
    key=Math.sqrt(s1*s1+s2*s2-2*s1*s2*Math.cos(rd(th)));
    d1=Math.sqrt(s1*s1+s2*s2+2*s1*s2*Math.cos(rd(th)));
    d2=Math.sqrt(s1*s1+s2*s2-2*s1*s2*Math.sin(rd(th)));
    d3=key*key;
    var os=[fmt(key,2),fmt(d1,2),fmt(d2,2),fmt(d3,2)];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  return mcq("One triangular half of a kite has frame lengths of "+fmt(s1,1)+" m and "+fmt(s2,1)+" m with an angle of \\("+th+"^\\circ\\) between them. How long is the cross-spar that joins their far ends, in m?",
    fmt(key,2),[fmt(d1,2),fmt(d2,2),fmt(d3,2)],
    "The cross-spar sits opposite the angle between the two frame lengths, so the cosine law applies: \\(d^2 = "+fmt(s1,1)+"^2 + "+fmt(s2,1)+"^2 - 2("+fmt(s1,1)+")("+fmt(s2,1)+")\\cos "+th+"^\\circ \\approx "+fmt(key*key,2)+"\\). Taking the square root, the cross-spar is <b>\\("+fmt(key,2)+"\\text{ m}\\)</b>. (Adding the cosine term is a sign error, and the value before the square root is not the length.)",
    {s1:s1,s2:s2,th:th});
});
E("u1-corner-check",1,["7.2"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var Atar=0,b=0,c=0,a=0,Aang=0,Bang=0,Cang=0,tries=0,ok=false;
  while(!ok&&tries<400){tries++;
    Atar=pick([40,45,50,55,60,65,70]);b=ri(10,30);c=ri(10,30);
    a=Math.round(Math.sqrt(b*b+c*c-2*b*c*Math.cos(rd(Atar)))*10)/10;
    var csA=(b*b+c*c-a*a)/(2*b*c);if(Math.abs(csA)>=1)continue;
    Aang=Math.acos(csA)*180/Math.PI;
    var csB=(a*a+c*c-b*b)/(2*a*c);if(Math.abs(csB)>=1)continue;
    Bang=Math.acos(csB)*180/Math.PI;Cang=180-Aang-Bang;
    if(Cang<12||Cang>120)continue;
    var os=[""+Math.round(Aang),""+Math.round(Bang),""+Math.round(Cang),""+Math.round(180-Aang)];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  return mcq("A triangular property lot has sides of "+fmt(a,1)+" m, "+b+" m and "+c+" m. What is the angle at the corner opposite the side of length "+fmt(a,1)+" m, in degrees?",
    ""+Math.round(Aang),[""+Math.round(Bang),""+Math.round(Cang),""+Math.round(180-Aang)],
    "Rearrange the cosine law for the angle opposite side \\(a\\): \\(\\cos A = \\frac{b^2 + c^2 - a^2}{2bc} = \\frac{"+b+"^2 + "+c+"^2 - "+fmt(a,1)+"^2}{2("+b+")("+c+")}\\), which gives \\(A \\approx \\)<b>\\("+Math.round(Aang)+"^\\circ\\)</b>. The other two computed values are the lot's other two corner angles, and the remaining option is the supplement of the answer, which would belong to a different corner configuration.",
    {a:a,b:b,c:c});
});
E("u1-lock-gates",1,["7.2"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var g1=pick([3.6,4.2,4.8,5.4,6.0]),g2=pick([3.6,4.2,4.8,5.4,6.0].filter(function(x){return x!==g1;}));
  var th=ri(50,120);
  var gap=Math.sqrt(g1*g1+g2*g2-2*g1*g2*Math.cos(rd(th)));
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("Two canal lock gates swing from opposite walls and meet partway across the channel. The gates are \\("+fmt(g1,1)+"\\text{ m}\\) and \\("+fmt(g2,1)+"\\text{ m}\\) long, and the angle between them where they meet is \\("+th+"^\\circ\\). Find the distance between the free ends of the gates at the walls, to one decimal place, in m.",
    Math.round(gap*10)/10,0.06,
    "The two gates and the distance between their wall ends form a triangle with the \\("+th+"^\\circ\\) angle included between the gate lengths, so the cosine law gives \\(d^2 = "+fmt(g1,1)+"^2 + "+fmt(g2,1)+"^2 - 2("+fmt(g1,1)+")("+fmt(g2,1)+")\\cos "+th+"^\\circ \\approx "+fmt(gap*gap,1)+"\\). Taking the square root, the distance is <b>\\("+fmt(gap,1)+"\\text{ m}\\)</b>.",
    {g1:g1,g2:g2,th:th,rot:rot});
  q.figure=triRotSVG(gap,g2,g1,{L:["A","B","C"],ang:[th+"°",null,null],side:["?",fmt(g2,1)+" m",fmt(g1,1)+" m"],rot:rot});
  return q;
});
E("u1-meadow-angle",1,["7.2"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var A=0,Btar=0,b=0,a=0,Brev=0,tries=0;
  while(tries<400){tries++;
    A=pick([30,35,40]);Btar=pick([50,55,60,65,70]);
    if(Btar<=A+15)continue;
    b=ri(20,45);
    a=Math.round(b*Math.sin(rd(A))/Math.sin(rd(Btar))*10)/10;
    if(a>=b)continue;
    var s=b*Math.sin(rd(A))/a;if(s>=1)continue;
    Brev=Math.asin(s)*180/Math.PI;
    if(Brev<20||Brev>85)continue;
    break;
  }
  var C=180-A-Brev;
  var c=a*Math.sin(rd(C))/Math.sin(rd(A));
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("A triangular meadow is modelled by \\(\\triangle ABC\\) in the diagram, where \\(\\angle A = "+A+"^\\circ\\), side \\(a = "+fmt(a,1)+"\\text{ m}\\) (opposite \\(\\angle A\\)) and side \\(b = "+b+"\\text{ m}\\). Find \\(\\angle B\\), to the nearest degree.",
    Math.round(Brev),0.51,
    "Use the sine law with the known pair \\(a\\) and \\(\\angle A\\): \\(\\frac{\\sin B}{"+b+"} = \\frac{\\sin "+A+"^\\circ}{"+fmt(a,1)+"}\\), so \\(\\sin B = \\frac{"+b+" \\times \\sin "+A+"^\\circ}{"+fmt(a,1)+"} \\approx "+fmt(b*Math.sin(rd(A))/a,4)+"\\). The inverse sine gives an acute value, and the diagram shows \\(\\angle B\\) acute (its supplement would not match the drawn shape), so \\(\\angle B \\approx \\)<b>\\("+Math.round(Brev)+"^\\circ\\)</b>.",
    {A:A,a:a,b:b,Brev:Brev,rot:rot});
  q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:[A+"°","?",null],side:[fmt(a,1)+" m",b+" m",null],rot:rot});
  return q;
});
E("u1-regatta-choice",1,["7.2"],3,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var A=0,b=0,a=0,B1=0,B2=0,selB=0,Csel=0,csel=0,larger=false,tries=0,ok=false;
  while(!ok&&tries<600){tries++;
    A=ri(28,42);b=ri(12,22);
    var h=b*Math.sin(rd(A));
    if(b-h<2)continue;
    a=Math.round((h+1+Math.random()*(b-h-2))*10)/10;
    if(a<=h||a>=b)continue;
    var s=b*Math.sin(rd(A))/a;if(s>=1)continue;
    B1=Math.asin(s)*180/Math.PI;B2=180-B1;
    if(B1<A+12)continue;
    var C1=180-A-B1,C2=180-A-B2;
    if(C1<20||C2<15)continue;
    larger=Math.random()<0.5;
    selB=larger?B2:B1;Csel=larger?C2:C1;
    csel=a*Math.sin(rd(Csel))/Math.sin(rd(A));
    ok=true;
  }
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("In a regatta course triangle \\(ABC\\), \\(\\angle A = "+A+"^\\circ\\), side \\(b = "+b+"\\text{ m}\\) and side \\(a = "+fmt(a,1)+"\\text{ m}\\) (side \\(a\\) is opposite \\(\\angle A\\)). Two positions for the mark at \\(B\\) fit these measurements. The course is set so that \\(\\angle B\\) is the "+(larger?"larger":"smaller")+" of the two possible values. Find side \\(c\\) for the course as set, to one decimal place, in m.",
    Math.round(csel*10)/10,0.06,
    "Start with the sine law: \\(\\sin B = \\frac{"+b+" \\times \\sin "+A+"^\\circ}{"+fmt(a,1)+"} \\approx "+fmt(b*Math.sin(rd(A))/a,4)+"\\), which gives two candidates, \\(\\angle B \\approx "+fmt(B1,1)+"^\\circ\\) or its supplement \\(\\angle B \\approx "+fmt(B2,1)+"^\\circ\\) (this is the ambiguous case, since the height \\(h = "+b+" \\sin "+A+"^\\circ \\approx "+fmt(b*Math.sin(rd(A)),1)+"\\text{ m}\\) is less than \\(a\\), and \\(a\\) is less than \\(b\\)). The course uses the "+(larger?"larger":"smaller")+" value, \\(\\angle B \\approx "+fmt(selB,1)+"^\\circ\\), so \\(\\angle C = 180^\\circ - "+A+"^\\circ - "+fmt(selB,1)+"^\\circ \\approx "+fmt(Csel,1)+"^\\circ\\). The sine law then gives \\(c = \\frac{"+fmt(a,1)+" \\times \\sin "+fmt(Csel,1)+"^\\circ}{\\sin "+A+"^\\circ} \\approx \\)<b>\\("+fmt(csel,1)+"\\text{ m}\\)</b>.",
    {A:A,a:a,b:b,B1:B1,B2:B2,selB:selB,larger:larger,rot:rot});
  q.figure=triRotSVG(a,b,csel,{L:["A","B","C"],ang:[A+"°","?",null],side:[fmt(a,1)+" m",b+" m","?"],rot:rot});
  return q;
});
E("u1-perimeter-angles",1,["7.2"],3,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var A=0,B=0,C=0,tries=0;
  while(tries<400){tries++;
    A=ri(40,70);B=ri(40,70);C=180-A-B;
    if(C<30||C>100)continue;
    break;
  }
  var P=pick([48,54,60,66,72,80,90]);
  var ssum=Math.sin(rd(A))+Math.sin(rd(B))+Math.sin(rd(C));
  var k=P/ssum;
  var a=k*Math.sin(rd(A)),b=k*Math.sin(rd(B)),c=k*Math.sin(rd(C));
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("A triangular plot has angles of \\("+A+"^\\circ\\) and \\("+B+"^\\circ\\) at two of its corners, and its perimeter is \\("+P+"\\text{ m}\\). Find the length of the side opposite the \\("+A+"^\\circ\\) angle, to one decimal place, in m.",
    Math.round(a*10)/10,0.06,
    "The third angle is \\(180^\\circ - "+A+"^\\circ - "+B+"^\\circ = "+C+"^\\circ\\). By the sine law the sides are proportional to the sines of their opposite angles, so write each side as a scale factor times a sine: the perimeter is \\(k(\\sin "+A+"^\\circ + \\sin "+B+"^\\circ + \\sin "+C+"^\\circ) = "+P+"\\), which gives \\(k = \\frac{"+P+"}{"+fmt(ssum,3)+"} \\approx "+fmt(k,2)+"\\). The side opposite the \\("+A+"^\\circ\\) angle is \\(k \\sin "+A+"^\\circ \\approx "+fmt(k,2)+" \\times "+fmt(Math.sin(rd(A)),3)+" \\approx \\)<b>\\("+fmt(a,1)+"\\text{ m}\\)</b>.",
    {A:A,B:B,C:C,P:P,rot:rot});
  q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:[A+"°",B+"°",C+"°"],side:["?",null,null],rot:rot});
  return q;
});
E("u1-isosceles-span",1,["7.2"],3,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var L=ri(5,15),mode=ri(0,1),apex=0,beta=0;
  if(mode===0){beta=ri(35,65);apex=180-2*beta;}
  else{apex=pick([40,60,80,90,100]);beta=(180-apex)/2;}
  var base=L*Math.sin(rd(apex))/Math.sin(rd(beta));
  var rot=pick([9,12,15,-10,-14]);
  var prompt=(mode===0?
    "An isosceles triangular brace has two equal sides of \\("+L+"\\text{ m}\\), and each base angle measures \\("+beta+"^\\circ\\). Find the length of the base, to one decimal place, in m.":
    "An isosceles triangular brace has two equal sides of \\("+L+"\\text{ m}\\) meeting at an apex angle of \\("+apex+"^\\circ\\). Find the length of the base, to one decimal place, in m.");
  var q=numq(prompt,
    Math.round(base*10)/10,0.06,
    (mode===0?
      "The apex angle is \\(180^\\circ - "+beta+"^\\circ - "+beta+"^\\circ = "+apex+"^\\circ\\). The base sits opposite the apex angle and each equal side sits opposite a base angle, so the sine law gives \\(\\frac{\\text{base}}{\\sin "+apex+"^\\circ} = \\frac{"+L+"}{\\sin "+beta+"^\\circ}\\), and the base is \\(\\frac{"+L+" \\times \\sin "+apex+"^\\circ}{\\sin "+beta+"^\\circ} \\approx \\)":
      "Each base angle is \\(\\frac{180^\\circ - "+apex+"^\\circ}{2} = "+beta+"^\\circ\\). The base sits opposite the apex angle and each equal side sits opposite a base angle, so the sine law gives \\(\\frac{\\text{base}}{\\sin "+apex+"^\\circ} = \\frac{"+L+"}{\\sin "+beta+"^\\circ}\\), and the base is \\(\\frac{"+L+" \\times \\sin "+apex+"^\\circ}{\\sin "+beta+"^\\circ} \\approx \\)")
    +"<b>\\("+fmt(base,1)+"\\text{ m}\\)</b>.",
    {L:L,mode:mode,apex:apex,beta:beta,rot:rot});
  q.figure=triRotSVG(base,L,L,{L:["A","B","C"],ang:[apex+"°",beta+"°",beta+"°"],side:["?",L+" m",L+" m"],rot:rot});
  return q;
});
E("u1-ambiguous-design",1,["7.2"],3,"var",varset([
  function(){return mcq("A triangular sign is specified by \\(\\angle A = 35^\\circ\\), side \\(b = 12\\text{ cm}\\) and side \\(a = 5\\text{ cm}\\) (side \\(a\\) is opposite \\(\\angle A\\)). How many different signs fit this specification?",
    "No sign fits the spec, because side a cannot reach the base line",
    ["Exactly one sign fits, and it is a right triangle","Exactly one sign fits, but it is not a right triangle","Two different signs fit the spec"],
    "Compare side \\(a\\) with the height \\(h = b\\sin A = 12 \\times \\sin 35^\\circ \\approx 6.9\\text{ cm}\\). Side \\(a = 5\\text{ cm}\\) is shorter than \\(h\\), so it cannot reach the base line at all and no triangle closes.",
    {});},
  function(){return mcq("A triangular shelf bracket is specified by \\(\\angle A = 30^\\circ\\), side \\(b = 10\\text{ cm}\\) and side \\(a = 5\\text{ cm}\\) (side \\(a\\) is opposite \\(\\angle A\\)). How many different brackets fit this specification?",
    "Exactly one bracket fits, and it is a right triangle",
    ["No bracket fits the spec, because side a is too short","Exactly one bracket fits, but it is not a right triangle","Two different brackets fit the spec"],
    "The height is \\(h = b\\sin A = 10 \\times \\sin 30^\\circ = 5\\text{ cm}\\). Side \\(a\\) equals \\(h\\) exactly, so side \\(a\\) just reaches the base at a right angle: exactly one bracket, and it is right-angled.",
    {});},
  function(){return mcq("A triangular tile is specified by \\(\\angle A = 40^\\circ\\), side \\(b = 10\\text{ cm}\\) and side \\(a = 8\\text{ cm}\\) (side \\(a\\) is opposite \\(\\angle A\\)). How many different tiles fit this specification?",
    "Two different tiles fit the spec",
    ["No tile fits the spec, because side a is too short","Exactly one tile fits, and it is a right triangle","Exactly one tile fits, but it is not a right triangle"],
    "The height is \\(h = 10 \\times \\sin 40^\\circ \\approx 6.4\\text{ cm}\\). Side \\(a = 8\\text{ cm}\\) is longer than \\(h\\) but shorter than \\(b = 10\\text{ cm}\\), so it can swing to two different positions on the base: two different tiles fit.",
    {});},
  function(){return mcq("A triangular piece of garden edging is specified by \\(\\angle A = 45^\\circ\\), side \\(b = 14\\text{ cm}\\) and side \\(a = 9\\text{ cm}\\) (side \\(a\\) is opposite \\(\\angle A\\)). As specified, no piece fits. Which single change to the specification would make exactly one piece fit?",
    "Lengthen side a to 14 cm, so that a equals b and only one piece fits",
    ["Shorten side a to 7 cm, so that it sits well below the height h","Lengthen side b to 18 cm, keeping side a at 9 cm","Reduce angle A to 30 degrees, keeping both sides unchanged"],
    "At present \\(h = 14 \\times \\sin 45^\\circ \\approx 9.9\\text{ cm}\\) and \\(a = 9\\text{ cm}\\) is shorter than \\(h\\), so no piece fits. Lengthening \\(a\\) to \\(14\\text{ cm}\\) makes \\(a = b\\), and whenever \\(a \\ge b\\) the side can land in only one position: exactly one piece. Shortening \\(a\\) or lengthening \\(b\\) leaves \\(a < h\\) (still none), and reducing \\(\\angle A\\) to \\(30^\\circ\\) gives \\(h = 7\\text{ cm}\\) with \\(h < a < b\\), which is the two-piece case.",
    {});}
]));
E("u1-two-lamps",1,["7.2"],3,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var Aang=0,b=0,c=0,a=0,Bang=0,tries=0,ok=false;
  while(!ok&&tries<400){tries++;
    Aang=ri(40,110);b=ri(10,30);c=ri(10,30);
    a=Math.sqrt(b*b+c*c-2*b*c*Math.cos(rd(Aang)));
    var s=b*Math.sin(rd(Aang))/a;if(s>=1)continue;
    Bang=Math.asin(s)*180/Math.PI;
    if(Bang<10||Bang>80)continue;
    var csB=(a*a+c*c-b*b)/(2*a*c);if(Math.abs(csB)>=1)continue;
    var Btrue=Math.acos(csB)*180/Math.PI;
    if(Math.abs(Btrue-Bang)>1)continue;
    ok=true;
  }
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("On a ground plan, a point \\(P\\) is \\("+c+"\\text{ m}\\) from one lamp and \\("+b+"\\text{ m}\\) from a second lamp, and the angle at \\(P\\) between the lines to the lamps is \\("+Aang+"^\\circ\\). Find the angle at the first lamp between the line to \\(P\\) and the line to the second lamp, to the nearest degree.",
    Math.round(Bang),0.51,
    "Step 1, the distance between the lamps, from the cosine law at \\(P\\): \\(d^2 = "+c+"^2 + "+b+"^2 - 2("+c+")("+b+")\\cos "+Aang+"^\\circ \\approx "+fmt(a*a,1)+"\\), so the lamps are \\(d \\approx "+fmt(a,1)+"\\text{ m}\\) apart. Step 2, the angle at the first lamp, from the sine law: \\(\\frac{\\sin B}{"+b+"} = \\frac{\\sin "+Aang+"^\\circ}{"+fmt(a,1)+"}\\), so \\(\\sin B \\approx "+fmt(b*Math.sin(rd(Aang))/a,4)+"\\) and \\(\\angle B \\approx \\)<b>\\("+Math.round(Bang)+"^\\circ\\)</b>. The angle is acute, as the plan shows, so the acute value fits.",
    {Aang:Aang,b:b,c:c,a:a,rot:rot});
  q.figure=triRotSVG(a,b,c,{L:["P","L1","L2"],ang:[Aang+"°","?",null],side:["?",b+" m",c+" m"],rot:rot});
  return q;
});
E("u1-scaffold-bay",1,["7.2"],3,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var A=0,Btar=0,b=0,a=0,Brev=0,C=0,c=0,tries=0;
  while(tries<400){tries++;
    A=pick([55,60,65,70,75]);Btar=pick([30,35,40,45,50]);
    if(Btar>=A-10)continue;
    b=ri(3,9);
    a=Math.round(b*Math.sin(rd(A))/Math.sin(rd(Btar))*10)/10;
    if(a<=b)continue;
    var s=b*Math.sin(rd(A))/a;if(s>=1)continue;
    Brev=Math.asin(s)*180/Math.PI;
    C=180-A-Brev;
    if(C<25||C>110)continue;
    c=a*Math.sin(rd(C))/Math.sin(rd(A));
    break;
  }
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("A scaffold bay forms \\(\\triangle ABC\\). A diagonal brace is side \\(a = "+fmt(a,1)+"\\text{ m}\\), opposite \\(\\angle A = "+A+"^\\circ\\), and side \\(b = "+b+"\\text{ m}\\). Find side \\(c\\), to one decimal place, in m.",
    Math.round(c*10)/10,0.06,
    "Step 1, find \\(\\angle B\\) with the sine law: \\(\\frac{\\sin B}{"+b+"} = \\frac{\\sin "+A+"^\\circ}{"+fmt(a,1)+"}\\), so \\(\\sin B \\approx "+fmt(b*Math.sin(rd(A))/a,4)+"\\) and \\(\\angle B \\approx "+fmt(Brev,1)+"^\\circ\\) (acute, and unique here because \\(a > b\\)). Step 2, the third angle: \\(\\angle C = 180^\\circ - "+A+"^\\circ - "+fmt(Brev,1)+"^\\circ \\approx "+fmt(C,1)+"^\\circ\\). Step 3, side \\(c\\) from the same sine law proportion: \\(c = \\frac{"+fmt(a,1)+" \\times \\sin "+fmt(C,1)+"^\\circ}{\\sin "+A+"^\\circ} \\approx \\)<b>\\("+fmt(c,1)+"\\text{ m}\\)</b>.",
    {A:A,a:a,b:b,Brev:Brev,C:C,rot:rot});
  q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:[A+"°","?",null],side:[fmt(a,1)+" m",b+" m","?"],rot:rot});
  return q;
});

// Math 2201 Unit 1, indicator 7.3 enrichment batch C (November 2026):
// "Solve a contextual problem that involves more than one triangle."
// Seventeen new generated entries with genuinely different two-triangle
// structures (shared-side chains, cevian splits, SSS-then-SAS, an SSA
// ambiguous-case chain, a two-stage height, and perimeter / angle-sum
// composites). Figures are drawn from each entry's own drawn values:
// chain entries use chainTriSVG (slanted, asked side hidden), split
// entries use splitTriSVG (slanted), level entries use twoTriSVG.
// CR marks suggested for the numeric (constructed-response) entries:
// CRMARKS: u1-shared-side-intro=3
// CRMARKS: u1-kite-frame-chain=3
// CRMARKS: u1-river-chain=3
// CRMARKS: u1-headland-boats=3
// CRMARKS: u1-bisector-post=3
// CRMARKS: u1-truss-diagonal=3
// CRMARKS: u1-island-route=3
// CRMARKS: u1-drone-split=3
// CRMARKS: u1-race-course=3
// CRMARKS: u1-survey-network=4
// CRMARKS: u1-two-stage-height=4
// CRMARKS: u1-regatta-chain=4
// CRMARKS: u1-quad-perimeter=3
// CRMARKS: u1-offset-angle=3
// (u1-double-plot, u1-farm-lanes and u1-harbour-chain are multiple
// choice, so no CR marks are suggested for them.)
E("u1-shared-side-intro",1,["7.3"],1,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var AB,BC,angB,AC,angDAC,angD,angACD,CD,AD,tries=0;
  do{
    AB=ri(15,22);BC=ri(10,16);angB=pick([58,64,70,76]);
    AC=Math.sqrt(AB*AB+BC*BC-2*AB*BC*Math.cos(rd(angB)));
    angDAC=pick([46,52,58]);angD=pick([56,64,72]);angACD=180-angDAC-angD;
    CD=AC*Math.sin(rd(angDAC))/Math.sin(rd(angD));
    AD=AC*Math.sin(rd(angACD))/Math.sin(rd(angD));
    tries++;
  }while(!(angACD>=34&&AC>6&&CD>4&&AD>4)&&tries<400);
  var q=numq("Two fields share a fence along the diagonal \\(AC\\). In the first field, \\(\\triangle ABC\\), \\(AB = "+AB+"\\text{ m}\\), \\(BC = "+BC+"\\text{ m}\\) and \\(\\angle B = "+angB+"^\\circ\\). In the second field, \\(\\triangle ACD\\), \\(\\angle DAC = "+angDAC+"^\\circ\\) and \\(\\angle D = "+angD+"^\\circ\\). Find the length of \\(CD\\), to one decimal place, in m.",
    Math.round(CD*10)/10,0.06,
    "First find the shared side \\(AC\\) in \\(\\triangle ABC\\) with the cosine law: \\(AC^2 = "+AB+"^2 + "+BC+"^2 - 2("+AB+")("+BC+")\\cos "+angB+"^\\circ\\), so \\(AC \\approx "+fmt(AC,2)+"\\text{ m}\\). Then work in \\(\\triangle ACD\\): its third angle is \\(180^\\circ - "+angDAC+"^\\circ - "+angD+"^\\circ = "+angACD+"^\\circ\\), and the sine law with the shared side gives \\(\\frac{CD}{\\sin "+angDAC+"^\\circ} = \\frac{"+fmt(AC,2)+"}{\\sin "+angD+"^\\circ}\\), so \\(CD \\approx \\)<b>\\("+fmt(CD,1)+"\\text{ m}\\)</b>.",
    {AB:AB,BC:BC,angB:angB,AC:AC,angDAC:angDAC,angD:angD});
  q.figure=twoTriSVG(AB,BC,angB,AC,CD,AD,angDAC,angD);
  return q;
});
E("u1-kite-frame-chain",1,["7.3"],1,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var AB,angA,angB,angC,AC,BC,AD,angDAC,CD,angD,tries=0;
  do{
    AB=ri(4,8);angA=pick([42,50,58]);angB=pick([56,64,72]);angC=180-angA-angB;
    AC=AB*Math.sin(rd(angB))/Math.sin(rd(angC));
    BC=AB*Math.sin(rd(angA))/Math.sin(rd(angC));
    AD=ri(3,7);angDAC=pick([48,56,64]);
    CD=Math.sqrt(AC*AC+AD*AD-2*AC*AD*Math.cos(rd(angDAC)));
    angD=Math.acos((AD*AD+CD*CD-AC*AC)/(2*AD*CD))*180/Math.PI;
    tries++;
  }while(!(angC>=35&&AC>2&&CD>2&&angD>20&&angD<120)&&tries<400);
  var q=numq("A large kite sail is held by a frame of two triangles that share the spine \\(AC\\). In \\(\\triangle ABC\\), the spar \\(AB = "+AB+"\\text{ m}\\), \\(\\angle BAC = "+angA+"^\\circ\\) and \\(\\angle B = "+angB+"^\\circ\\). In \\(\\triangle ACD\\), the spar \\(AD = "+AD+"\\text{ m}\\) and \\(\\angle DAC = "+angDAC+"^\\circ\\), the angle between the spine and \\(AD\\). Find the length of the spar \\(CD\\), to one decimal place, in m.",
    Math.round(CD*10)/10,0.06,
    "First find the shared side, the spine \\(AC\\), in \\(\\triangle ABC\\): the third angle is \\(180^\\circ - "+angA+"^\\circ - "+angB+"^\\circ = "+angC+"^\\circ\\), and the sine law gives \\(\\frac{AC}{\\sin "+angB+"^\\circ} = \\frac{"+AB+"}{\\sin "+angC+"^\\circ}\\), so \\(AC \\approx "+fmt(AC,2)+"\\text{ m}\\). Then work in \\(\\triangle ACD\\), where the spine and \\(AD\\) meet at \\(\\angle DAC\\): the cosine law gives \\(CD^2 = "+fmt(AC,2)+"^2 + "+AD+"^2 - 2("+fmt(AC,2)+")("+AD+")\\cos "+angDAC+"^\\circ\\), so \\(CD \\approx \\)<b>\\("+fmt(CD,1)+"\\text{ m}\\)</b>.",
    {AB:AB,angA:angA,angB:angB,AC:AC,AD:AD,angDAC:angDAC});
  q.figure=chainTriSVG(AB,BC,angB,AC,CD,AD,angDAC,Math.round(angD),{rot:0,hideSides:["BC","CD"],sideAC:"spine"});
  return q;
});
E("u1-double-plot",1,["7.3"],1,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var AB,BC,angB,AC,angDAC,angD,angACD,CD,AD,sum,sumWrong,opts,tries=0;
  do{
    AB=ri(13,20);BC=ri(9,15);angB=pick([58,66,74]);
    AC=Math.sqrt(AB*AB+BC*BC-2*AB*BC*Math.cos(rd(angB)));
    angDAC=pick([46,54]);angD=pick([58,66]);angACD=180-angDAC-angD;
    CD=AC*Math.sin(rd(angDAC))/Math.sin(rd(angD));
    AD=AC*Math.sin(rd(angACD))/Math.sin(rd(angD));
    sum=AC+CD;
    /* pairing slip: CD paired with sin D instead of sin DAC */
    sumWrong=AC+AC*Math.sin(rd(angD))/Math.sin(rd(angDAC));
    opts=[fmt(sum,1),fmt(AC,1),fmt(CD,1),fmt(sumWrong,1)];
    tries++;
  }while(!(angACD>=40&&new Set(opts).size===4)&&tries<400);
  var q=mcq("Two adjacent triangular garden plots share the fence line \\(AC\\). In \\(\\triangle ABC\\), \\(AB = "+AB+"\\text{ m}\\), \\(BC = "+BC+"\\text{ m}\\) and \\(\\angle B = "+angB+"^\\circ\\). In \\(\\triangle ACD\\), \\(\\angle DAC = "+angDAC+"^\\circ\\) and \\(\\angle D = "+angD+"^\\circ\\). A gardener is replacing the edging along \\(AC\\) and along \\(CD\\). What total length of edging is needed, to one decimal place, in m?",
    fmt(sum,1)+" m",
    [fmt(AC,1)+" m",fmt(CD,1)+" m",fmt(sumWrong,1)+" m"],
    "First find the shared side \\(AC\\) in \\(\\triangle ABC\\) with the cosine law: \\(AC^2 = "+AB+"^2 + "+BC+"^2 - 2("+AB+")("+BC+")\\cos "+angB+"^\\circ\\), so \\(AC \\approx "+fmt(AC,2)+"\\text{ m}\\). Then the sine law in \\(\\triangle ACD\\) gives \\(\\frac{CD}{\\sin "+angDAC+"^\\circ} = \\frac{"+fmt(AC,2)+"}{\\sin "+angD+"^\\circ}\\), so \\(CD \\approx "+fmt(CD,2)+"\\text{ m}\\). The total edging is \\("+fmt(AC,2)+" + "+fmt(CD,2)+" \\approx \\)<b>\\("+fmt(sum,1)+"\\text{ m}\\)</b>. Stopping after either triangle gives only one of the two lengths.",
    {AB:AB,BC:BC,angB:angB,AC:AC,angDAC:angDAC,angD:angD});
  q.figure=twoTriSVG(AB,BC,angB,AC,CD,AD,angDAC,angD);
  return q;
});
E("u1-river-chain",1,["7.3"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var AB,angA,angB,angC,AC,BC,angDAC,angD,angACD,CD,AD,rot,tries=0;
  do{
    AB=ri(28,55);angA=pick([38,46,54]);angB=pick([56,64,72]);angC=180-angA-angB;
    AC=AB*Math.sin(rd(angB))/Math.sin(rd(angC));
    BC=AB*Math.sin(rd(angA))/Math.sin(rd(angC));
    angDAC=pick([44,52,60]);angD=pick([58,66,74]);angACD=180-angDAC-angD;
    CD=AC*Math.sin(rd(angDAC))/Math.sin(rd(angD));
    AD=AC*Math.sin(rd(angACD))/Math.sin(rd(angD));
    tries++;
  }while(!(angC>=35&&angACD>=32&&AC>10&&CD>5&&AD>5)&&tries<400);
  rot=pick([9,12,15,-10,-14]);
  var q=numq("Points \\(A\\) and \\(B\\) are on one bank of a river, \\(AB = "+AB+"\\text{ m}\\) apart. Point \\(C\\) is on the far bank and point \\(D\\) is also on the near bank. In \\(\\triangle ABC\\), \\(\\angle BAC = "+angA+"^\\circ\\) and \\(\\angle B = "+angB+"^\\circ\\). In \\(\\triangle ACD\\), \\(\\angle DAC = "+angDAC+"^\\circ\\) and \\(\\angle D = "+angD+"^\\circ\\). Find the distance \\(CD\\), to one decimal place, in m.",
    Math.round(CD*10)/10,0.06,
    "First find the shared side \\(AC\\) in \\(\\triangle ABC\\): the third angle is \\(180^\\circ - "+angA+"^\\circ - "+angB+"^\\circ = "+angC+"^\\circ\\), and the sine law gives \\(\\frac{AC}{\\sin "+angB+"^\\circ} = \\frac{"+AB+"}{\\sin "+angC+"^\\circ}\\), so \\(AC \\approx "+fmt(AC,2)+"\\text{ m}\\). Then work in \\(\\triangle ACD\\): the sine law with the shared side gives \\(\\frac{CD}{\\sin "+angDAC+"^\\circ} = \\frac{"+fmt(AC,2)+"}{\\sin "+angD+"^\\circ}\\), so \\(CD \\approx \\)<b>\\("+fmt(CD,1)+"\\text{ m}\\)</b>.",
    {AB:AB,angA:angA,angB:angB,AC:AC,angDAC:angDAC,angD:angD,rot:rot});
  q.figure=chainTriSVG(AB,BC,angB,AC,CD,AD,angDAC,angD,{rot:rot,hideSides:["BC","CD","AD"]});
  return q;
});
E("u1-headland-boats",1,["7.3"],2,"gen",function(){
  /* Figure: chainTriSVG (the two boats and the marker/headland form a
     chain of two triangles sharing AC, not a cevian split). */
  function rd(d){return d*Math.PI/180;}
  var AB,BC,angB,AC,angDAC,angD,angACD,CD,AD,rot,tries=0;
  do{
    AB=ri(30,60);BC=ri(25,50);angB=pick([62,70,78]);
    AC=Math.sqrt(AB*AB+BC*BC-2*AB*BC*Math.cos(rd(angB)));
    angDAC=pick([44,52,60]);angD=pick([56,64,72]);angACD=180-angDAC-angD;
    CD=AC*Math.sin(rd(angDAC))/Math.sin(rd(angD));
    AD=AC*Math.sin(rd(angACD))/Math.sin(rd(angD));
    tries++;
  }while(!(angACD>=34&&AC>10&&CD>5&&AD>5)&&tries<400);
  rot=pick([9,12,15,-10,-14]);
  var q=numq("In the diagram, \\(A\\) is a harbour marker, \\(B\\) is a headland point, \\(C\\) is a first boat and \\(D\\) is a second boat. The marker is \\("+AB+"\\text{ m}\\) from the headland and the headland is \\("+BC+"\\text{ m}\\) from the first boat, with \\(\\angle B = "+angB+"^\\circ\\) between those two distances. In \\(\\triangle ACD\\), \\(\\angle DAC = "+angDAC+"^\\circ\\) and \\(\\angle D = "+angD+"^\\circ\\). Find the distance between the two boats, \\(CD\\), to one decimal place, in m.",
    Math.round(CD*10)/10,0.06,
    "First find the shared side \\(AC\\), the distance from the marker to the first boat, in \\(\\triangle ABC\\) with the cosine law: \\(AC^2 = "+AB+"^2 + "+BC+"^2 - 2("+AB+")("+BC+")\\cos "+angB+"^\\circ\\), so \\(AC \\approx "+fmt(AC,2)+"\\text{ m}\\). Then work in \\(\\triangle ACD\\): the sine law gives \\(\\frac{CD}{\\sin "+angDAC+"^\\circ} = \\frac{"+fmt(AC,2)+"}{\\sin "+angD+"^\\circ}\\), so the distance between the boats is \\(CD \\approx \\)<b>\\("+fmt(CD,1)+"\\text{ m}\\)</b>.",
    {AB:AB,BC:BC,angB:angB,AC:AC,angDAC:angDAC,angD:angD,rot:rot});
  q.figure=chainTriSVG(AB,BC,angB,AC,CD,AD,angDAC,angD,{rot:rot,hideSides:["CD","AD"]});
  return q;
});
E("u1-bisector-post",1,["7.3"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var AB,BC,angB,BD,DC,AC,angC,AD,sinDAC,DAC,rot,tries=0;
  do{
    AB=ri(12,24);BC=ri(20,32);angB=pick([48,54,60,66]);BD=ri(6,14);DC=BC-BD;
    AC=Math.sqrt(AB*AB+BC*BC-2*AB*BC*Math.cos(rd(angB)));
    angC=Math.acos((BC*BC+AC*AC-AB*AB)/(2*BC*AC))*180/Math.PI;
    AD=Math.sqrt(AB*AB+BD*BD-2*AB*BD*Math.cos(rd(angB)));
    DAC=Math.acos((AD*AD+AC*AC-DC*DC)/(2*AD*AC))*180/Math.PI;
    sinDAC=DC*Math.sin(rd(angC))/AD;
    tries++;
  }while(!(DC>=8&&angC>=18&&angC<=75&&DAC>=20&&DAC<=78&&sinDAC>0&&sinDAC<1&&Math.abs(Math.asin(sinDAC)*180/Math.PI-DAC)<1.5)&&tries<400);
  rot=pick([9,12,15,-10,-14]);
  var q=numq("A post \\(D\\) stands on side \\(BC\\) of a triangular plot \\(ABC\\). The plot has \\(AB = "+AB+"\\text{ m}\\), \\(BC = "+BC+"\\text{ m}\\) and \\(\\angle B = "+angB+"^\\circ\\). The post divides the side with \\(BD = "+BD+"\\text{ m}\\) and \\(DC = "+DC+"\\text{ m}\\). Find \\(\\angle DAC\\), to the nearest degree.",
    Math.round(DAC),0.51,
    "First work in the whole triangle \\(ABC\\): the cosine law gives \\(AC^2 = "+AB+"^2 + "+BC+"^2 - 2("+AB+")("+BC+")\\cos "+angB+"^\\circ\\), so \\(AC \\approx "+fmt(AC,2)+"\\text{ m}\\), and rearranging the cosine law for \\(\\angle C\\) gives \\(\\angle C \\approx "+fmt(angC,1)+"^\\circ\\). Next find the shared side \\(AD\\) in \\(\\triangle ABD\\): \\(AD^2 = "+AB+"^2 + "+BD+"^2 - 2("+AB+")("+BD+")\\cos "+angB+"^\\circ\\), so \\(AD \\approx "+fmt(AD,2)+"\\text{ m}\\). Finally, in \\(\\triangle ADC\\) the sine law pairs \\(DC\\) with \\(\\angle DAC\\) and \\(AD\\) with \\(\\angle C\\): \\(\\sin DAC = \\frac{"+DC+" \\times \\sin "+fmt(angC,1)+"^\\circ}{"+fmt(AD,2)+"} \\approx "+fmt(sinDAC,4)+"\\), and the angle is acute in the diagram, so \\(\\angle DAC \\approx \\)<b>\\("+Math.round(DAC)+"^\\circ\\)</b>.",
    {AB:AB,BC:BC,angB:angB,BD:BD,DC:DC,AC:AC,angC:angC,AD:AD,rot:rot});
  q.figure=splitTriSVG(BC,AC,AB,BD/BC,{L:["A","B","C"],DL:"D",angB:angB+"\u00B0",sideA1:BD+" m",sideA2:DC+" m",sideC:AB+" m",sideAD:"AD",rot:rot});
  return q;
});
E("u1-truss-diagonal",1,["7.3"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var AB,BC,CA,BD,DC,angB,AD,rot,tries=0;
  do{
    AB=ri(10,22);BC=ri(10,22);CA=ri(10,22);BD=ri(5,14);
    angB=Math.acos((AB*AB+BC*BC-CA*CA)/(2*AB*BC))*180/Math.PI;
    AD=Math.sqrt(AB*AB+BD*BD-2*AB*BD*Math.cos(rd(angB)));
    DC=BC-BD;
    tries++;
  }while(!(Math.abs(AB-BC)<CA&&CA<AB+BC&&BD<BC-3&&angB>=25&&angB<=120&&AD>3)&&tries<400);
  rot=pick([9,12,15,-10,-14]);
  var q=numq("A truss panel \\(ABC\\) has members \\(AB = "+AB+"\\text{ m}\\), \\(BC = "+BC+"\\text{ m}\\) and \\(CA = "+CA+"\\text{ m}\\). A brace runs from \\(A\\) to a point \\(D\\) on \\(BC\\), with \\(BD = "+BD+"\\text{ m}\\). Find the length of the brace \\(AD\\), to one decimal place, in m.",
    Math.round(AD*10)/10,0.06,
    "First find the angle at the shared vertex \\(B\\) from the three members of \\(\\triangle ABC\\) (cosine law rearranged): \\(\\cos B = \\frac{"+AB+"^2 + "+BC+"^2 - "+CA+"^2}{2("+AB+")("+BC+")}\\), so \\(\\angle B \\approx "+fmt(angB,1)+"^\\circ\\). Then work in \\(\\triangle ABD\\), which uses that angle between \\(AB\\) and \\(BD\\): \\(AD^2 = "+AB+"^2 + "+BD+"^2 - 2("+AB+")("+BD+")\\cos "+fmt(angB,1)+"^\\circ\\), so the brace is \\(AD \\approx \\)<b>\\("+fmt(AD,1)+"\\text{ m}\\)</b>.",
    {AB:AB,BC:BC,CA:CA,BD:BD,angB:angB,rot:rot});
  q.figure=splitTriSVG(BC,CA,AB,BD/BC,{L:["A","B","C"],DL:"D",sideC:AB+" m",sideB:CA+" m",sideA1:BD+" m",rot:rot});
  return q;
});
E("u1-island-route",1,["7.3"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var AB,angA,angB,angC,AC,BC,AD,angDAC,CD,angD,rot,tries=0;
  do{
    AB=ri(70,130);angA=pick([36,44,52]);angB=pick([54,62,70]);angC=180-angA-angB;
    AC=AB*Math.sin(rd(angB))/Math.sin(rd(angC));
    BC=AB*Math.sin(rd(angA))/Math.sin(rd(angC));
    AD=ri(60,120);angDAC=pick([46,54,62]);
    CD=Math.sqrt(AC*AC+AD*AD-2*AC*AD*Math.cos(rd(angDAC)));
    angD=Math.acos((AD*AD+CD*CD-AC*AC)/(2*AD*CD))*180/Math.PI;
    tries++;
  }while(!(angC>=35&&AC>20&&CD>20&&angD>20&&angD<120)&&tries<400);
  rot=pick([9,12,15,-10,-14]);
  var q=numq("In the diagram, \\(A\\) is a harbour, \\(B\\) is a beacon, \\(C\\) is a first island and \\(D\\) is a second island. The beacon is \\("+AB+"\\text{ m}\\) from the harbour. In \\(\\triangle ABC\\), \\(\\angle BAC = "+angA+"^\\circ\\) and \\(\\angle B = "+angB+"^\\circ\\). In \\(\\triangle ACD\\), the harbour is \\("+AD+"\\text{ m}\\) from the second island and \\(\\angle DAC = "+angDAC+"^\\circ\\). Find the distance \\(CD\\) between the two islands, to one decimal place, in m.",
    Math.round(CD*10)/10,0.06,
    "First find the shared side \\(AC\\), the harbour-to-first-island distance, in \\(\\triangle ABC\\): the third angle is \\(180^\\circ - "+angA+"^\\circ - "+angB+"^\\circ = "+angC+"^\\circ\\), and the sine law gives \\(\\frac{AC}{\\sin "+angB+"^\\circ} = \\frac{"+AB+"}{\\sin "+angC+"^\\circ}\\), so \\(AC \\approx "+fmt(AC,2)+"\\text{ m}\\). Then work in \\(\\triangle ACD\\), where \\(AC\\) and \\(AD\\) meet at \\(\\angle DAC\\): the cosine law gives \\(CD^2 = "+fmt(AC,2)+"^2 + "+AD+"^2 - 2("+fmt(AC,2)+")("+AD+")\\cos "+angDAC+"^\\circ\\), so \\(CD \\approx \\)<b>\\("+fmt(CD,1)+"\\text{ m}\\)</b>.",
    {AB:AB,angA:angA,angB:angB,AC:AC,AD:AD,angDAC:angDAC,rot:rot});
  q.figure=chainTriSVG(AB,BC,angB,AC,CD,AD,angDAC,Math.round(angD),{rot:rot,hideSides:["BC","CD"]});
  return q;
});
E("u1-drone-split",1,["7.3"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var AB,angBAD,angDAC,angB,angADB,angADC,angC,AD,DC,BD,aSide,bSide,rot,tries=0;
  do{
    AB=ri(20,45);angBAD=pick([24,30,36]);angDAC=pick([22,28,34]);angB=pick([34,42,50]);
    angADB=180-angBAD-angB;
    AD=AB*Math.sin(rd(angB))/Math.sin(rd(angADB));
    angADC=180-angADB;angC=180-angADC-angDAC;
    DC=AD*Math.sin(rd(angDAC))/Math.sin(rd(angC));
    BD=AB*Math.sin(rd(angBAD))/Math.sin(rd(angADB));
    aSide=AB*Math.sin(rd(angBAD+angDAC))/Math.sin(rd(angC));
    bSide=AB*Math.sin(rd(angB))/Math.sin(rd(angC));
    tries++;
  }while(!(angADB>=70&&angADB<=135&&angC>=20&&angC<=70&&DC>4&&Math.abs(BD+DC-aSide)<0.05*aSide)&&tries<400);
  rot=pick([9,12,15,-10,-14]);
  var q=numq("A drone survey marks a triangular field \\(ABC\\) with a marker \\(D\\) on side \\(BC\\). From \\(A\\), the two parts of the angle are \\(\\angle BAD = "+angBAD+"^\\circ\\) and \\(\\angle DAC = "+angDAC+"^\\circ\\). Side \\(AB = "+AB+"\\text{ m}\\) and \\(\\angle B = "+angB+"^\\circ\\). Find the distance \\(DC\\) along the boundary, to one decimal place, in m.",
    Math.round(DC*10)/10,0.06,
    "First work in \\(\\triangle ABD\\): its third angle is \\(\\angle ADB = 180^\\circ - "+angBAD+"^\\circ - "+angB+"^\\circ = "+angADB+"^\\circ\\), and the sine law gives the shared side \\(AD\\): \\(\\frac{AD}{\\sin "+angB+"^\\circ} = \\frac{"+AB+"}{\\sin "+angADB+"^\\circ}\\), so \\(AD \\approx "+fmt(AD,2)+"\\text{ m}\\). Then work in \\(\\triangle ADC\\): \\(\\angle ADC = 180^\\circ - "+angADB+"^\\circ = "+angADC+"^\\circ\\) (a straight line at \\(D\\)), so \\(\\angle C = 180^\\circ - "+angADC+"^\\circ - "+angDAC+"^\\circ = "+angC+"^\\circ\\), and the sine law gives \\(\\frac{DC}{\\sin "+angDAC+"^\\circ} = \\frac{"+fmt(AD,2)+"}{\\sin "+angC+"^\\circ}\\), so \\(DC \\approx \\)<b>\\("+fmt(DC,1)+"\\text{ m}\\)</b>.",
    {AB:AB,angBAD:angBAD,angDAC:angDAC,angB:angB,AD:AD,rot:rot});
  q.figure=splitTriSVG(aSide,bSide,AB,BD/aSide,{L:["A","B","C"],DL:"D",angA1:angBAD+"\u00B0",angA2:angDAC+"\u00B0",angB:angB+"\u00B0",sideC:AB+" m",rot:rot});
  return q;
});
E("u1-farm-lanes",1,["7.3"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var AB,angA,angB,angC,AC,BC,AD,angDAC,CD,angD,dSine,dPair,opts,tries=0;
  do{
    AB=ri(18,30);angA=pick([38,46,54]);angB=pick([56,64,72]);angC=180-angA-angB;
    AC=AB*Math.sin(rd(angB))/Math.sin(rd(angC));
    BC=AB*Math.sin(rd(angA))/Math.sin(rd(angC));
    AD=ri(16,28);angDAC=pick([46,54,62]);
    CD=Math.sqrt(AC*AC+AD*AD-2*AC*AD*Math.cos(rd(angDAC)));
    angD=Math.acos((AD*AD+CD*CD-AC*AC)/(2*AD*CD))*180/Math.PI;
    /* sine-ratio slip: AC treated as a hypotenuse, CD = AC sin(DAC) */
    dSine=AC*Math.sin(rd(angDAC));
    /* pairing slip: the sines of DAC and D swapped in the sine law */
    dPair=AC*Math.sin(rd(angD))/Math.sin(rd(angDAC));
    opts=[fmt(CD,1),fmt(AC,1),fmt(dSine,1),fmt(dPair,1)];
    tries++;
  }while(!(angC>=35&&CD>5&&angD>20&&angD<120&&new Set(opts).size===4)&&tries<400);
  var q=mcq("Two farm fields share a lane along the diagonal \\(AC\\). In the first field, \\(\\triangle ABC\\), a lane \\(AB = "+AB+"\\text{ m}\\), \\(\\angle BAC = "+angA+"^\\circ\\) and \\(\\angle B = "+angB+"^\\circ\\). In the second field, \\(\\triangle ACD\\), a lane \\(AD = "+AD+"\\text{ m}\\) meets the diagonal at \\(\\angle DAC = "+angDAC+"^\\circ\\). A culvert is to run along \\(CD\\). How long is the culvert, to one decimal place, in m?",
    fmt(CD,1)+" m",
    [fmt(AC,1)+" m",fmt(dSine,1)+" m",fmt(dPair,1)+" m"],
    "First find the shared side \\(AC\\) in \\(\\triangle ABC\\): the third angle is \\(180^\\circ - "+angA+"^\\circ - "+angB+"^\\circ = "+angC+"^\\circ\\), and the sine law gives \\(\\frac{AC}{\\sin "+angB+"^\\circ} = \\frac{"+AB+"}{\\sin "+angC+"^\\circ}\\), so \\(AC \\approx "+fmt(AC,2)+"\\text{ m}\\). Then work in \\(\\triangle ACD\\): \\(AC\\) and \\(AD\\) are two sides with the included angle \\(\\angle DAC\\) between them, so this is a cosine-law stage, not a sine-law one: \\(CD^2 = "+fmt(AC,2)+"^2 + "+AD+"^2 - 2("+fmt(AC,2)+")("+AD+")\\cos "+angDAC+"^\\circ\\), giving \\(CD \\approx \\)<b>\\("+fmt(CD,1)+"\\text{ m}\\)</b>.",
    {AB:AB,angA:angA,angB:angB,AC:AC,AD:AD,angDAC:angDAC});
  q.figure=chainTriSVG(AB,BC,angB,AC,CD,AD,angDAC,Math.round(angD),{rot:0,hideSides:["BC","CD"]});
  return q;
});
E("u1-race-course",1,["7.3"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var AB,angA,angB,angC,AC,BC,angDAC,angD,angACD,CD,AD,total,rot,tries=0;
  do{
    AB=ri(60,110);angA=pick([34,42,50]);angB=pick([56,64,72]);angC=180-angA-angB;
    AC=AB*Math.sin(rd(angB))/Math.sin(rd(angC));
    BC=AB*Math.sin(rd(angA))/Math.sin(rd(angC));
    angDAC=pick([46,54]);angD=pick([60,68]);angACD=180-angDAC-angD;
    CD=AC*Math.sin(rd(angDAC))/Math.sin(rd(angD));
    AD=AC*Math.sin(rd(angACD))/Math.sin(rd(angD));
    total=AC+CD;
    tries++;
  }while(!(angC>=35&&angACD>=40&&AC>20&&CD>10&&AD>10)&&tries<400);
  rot=pick([9,12,15,-10,-14]);
  var q=numq("A sailing course is marked in the diagram: \\(A\\) is the first buoy, \\(B\\) is the start, \\(C\\) is the second buoy and \\(D\\) is the finish. The start is \\("+AB+"\\text{ m}\\) from the first buoy. In \\(\\triangle ABC\\), \\(\\angle BAC = "+angA+"^\\circ\\) and \\(\\angle B = "+angB+"^\\circ\\). In \\(\\triangle ACD\\), \\(\\angle DAC = "+angDAC+"^\\circ\\) and \\(\\angle D = "+angD+"^\\circ\\). Find the total distance sailed on the two legs from buoy to buoy and then to the finish, \\(AC + CD\\), to one decimal place, in m.",
    Math.round(total*10)/10,0.06,
    "First find the shared side \\(AC\\), the buoy-to-buoy leg, in \\(\\triangle ABC\\): the third angle is \\(180^\\circ - "+angA+"^\\circ - "+angB+"^\\circ = "+angC+"^\\circ\\), and the sine law gives \\(\\frac{AC}{\\sin "+angB+"^\\circ} = \\frac{"+AB+"}{\\sin "+angC+"^\\circ}\\), so \\(AC \\approx "+fmt(AC,2)+"\\text{ m}\\). Then work in \\(\\triangle ACD\\): the sine law gives \\(\\frac{CD}{\\sin "+angDAC+"^\\circ} = \\frac{"+fmt(AC,2)+"}{\\sin "+angD+"^\\circ}\\), so \\(CD \\approx "+fmt(CD,2)+"\\text{ m}\\). The total of the two legs is \\("+fmt(AC,2)+" + "+fmt(CD,2)+" \\approx \\)<b>\\("+fmt(total,1)+"\\text{ m}\\)</b>.",
    {AB:AB,angA:angA,angB:angB,AC:AC,angDAC:angDAC,angD:angD,rot:rot});
  q.figure=chainTriSVG(AB,BC,angB,AC,CD,AD,angDAC,angD,{rot:rot,hideSides:["BC","CD","AD"]});
  return q;
});
E("u1-survey-network",1,["7.3"],3,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var AB,BC,angB,AC,BAC,CD,AD,CAD,angD,BAD,rot,tries=0;
  do{
    AB=ri(14,24);BC=ri(10,20);angB=pick([58,66,74]);
    AC=Math.sqrt(AB*AB+BC*BC-2*AB*BC*Math.cos(rd(angB)));
    BAC=Math.acos((AB*AB+AC*AC-BC*BC)/(2*AB*AC))*180/Math.PI;
    CD=ri(12,22);AD=ri(12,22);
    CAD=Math.acos((AC*AC+AD*AD-CD*CD)/(2*AC*AD))*180/Math.PI;
    angD=Math.acos((AD*AD+CD*CD-AC*AC)/(2*AD*CD))*180/Math.PI;
    BAD=BAC+CAD;
    tries++;
  }while(!(Math.abs(CD-AD)<AC&&AC<CD+AD&&BAC>=20&&BAC<=75&&CAD>=25&&CAD<=80&&BAD<165&&angD>20&&angD<130)&&tries<400);
  rot=pick([9,12,15,-10,-14]);
  var q=numq("A survey network is a quadrilateral \\(ABCD\\) split by the diagonal \\(AC\\). In \\(\\triangle ABC\\), \\(AB = "+AB+"\\text{ m}\\), \\(BC = "+BC+"\\text{ m}\\) and \\(\\angle B = "+angB+"^\\circ\\). In \\(\\triangle ACD\\), \\(CD = "+CD+"\\text{ m}\\) and \\(AD = "+AD+"\\text{ m}\\). Find the full angle of the quadrilateral at \\(A\\), \\(\\angle BAD\\), to the nearest degree.",
    Math.round(BAD),0.51,
    "First find the shared side \\(AC\\) in \\(\\triangle ABC\\) with the cosine law: \\(AC^2 = "+AB+"^2 + "+BC+"^2 - 2("+AB+")("+BC+")\\cos "+angB+"^\\circ\\), so \\(AC \\approx "+fmt(AC,2)+"\\text{ m}\\). The part of the angle above the diagonal comes from the same triangle: \\(\\cos BAC = \\frac{"+AB+"^2 + "+fmt(AC,2)+"^2 - "+BC+"^2}{2("+AB+")("+fmt(AC,2)+")}\\), so \\(\\angle BAC \\approx "+fmt(BAC,1)+"^\\circ\\). Then work in \\(\\triangle ACD\\), which is SSS once \\(AC\\) is known: \\(\\cos CAD = \\frac{"+fmt(AC,2)+"^2 + "+AD+"^2 - "+CD+"^2}{2("+fmt(AC,2)+")("+AD+")}\\), so \\(\\angle CAD \\approx "+fmt(CAD,1)+"^\\circ\\). The full angle is the sum of the two parts: \\("+fmt(BAC,1)+"^\\circ + "+fmt(CAD,1)+"^\\circ \\approx \\)<b>\\("+Math.round(BAD)+"^\\circ\\)</b>.",
    {AB:AB,BC:BC,angB:angB,AC:AC,CD:CD,AD:AD,rot:rot});
  q.figure=chainTriSVG(AB,BC,angB,AC,CD,AD,Math.round(CAD),Math.round(angD),{rot:rot});
  return q;
});
E("u1-two-stage-height",1,["7.3"],3,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var PQ,angP,angQ,angT,QT,PT,elev,h,rot,tries=0;
  do{
    PQ=ri(30,60);angP=pick([28,36,44]);angQ=pick([58,66,74]);angT=180-angP-angQ;
    QT=PQ*Math.sin(rd(angP))/Math.sin(rd(angT));
    PT=PQ*Math.sin(rd(angQ))/Math.sin(rd(angT));
    elev=pick([38,46,54]);
    h=QT*Math.tan(rd(elev));
    tries++;
  }while(!(angP<angQ&&angT>=35&&QT>8&&h>5)&&tries<400);
  rot=pick([9,12,15,-10,-14]);
  var q=numq("On a map, two observation points \\(P\\) and \\(Q\\) are \\("+PQ+"\\text{ m}\\) apart, and \\(T\\) is the base of a tower. In the map triangle \\(PQT\\), \\(\\angle P = "+angP+"^\\circ\\) and \\(\\angle Q = "+angQ+"^\\circ\\), so \\(Q\\) is the nearer point to the base. From \\(Q\\), the angle of elevation to the top of the tower is \\("+elev+"^\\circ\\). Find the height of the tower, to one decimal place, in m.",
    Math.round(h*10)/10,0.06,
    "First find the ground distance from the nearer point to the base, \\(QT\\), in the map triangle: its third angle is \\(180^\\circ - "+angP+"^\\circ - "+angQ+"^\\circ = "+angT+"^\\circ\\), and the sine law gives \\(\\frac{QT}{\\sin "+angP+"^\\circ} = \\frac{"+PQ+"}{\\sin "+angT+"^\\circ}\\), so \\(QT \\approx "+fmt(QT,2)+"\\text{ m}\\). Then use the angle of elevation from \\(Q\\) in the right triangle at the tower: \\(\\tan "+elev+"^\\circ = \\frac{h}{"+fmt(QT,2)+"}\\), so \\(h = "+fmt(QT,2)+" \\times \\tan "+elev+"^\\circ \\approx \\)<b>\\("+fmt(h,1)+"\\text{ m}\\)</b>.",
    {PQ:PQ,angP:angP,angQ:angQ,QT:QT,elev:elev,rot:rot});
  q.figure=triRotSVG(QT,PT,PQ,{L:["P","Q","T"],ang:[angP+"\u00B0",angQ+"\u00B0",null],side:["?",null,PQ+" m"],rot:rot});
  return q;
});
E("u1-regatta-chain",1,["7.3"],3,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var angA,AB,BC,h,sinC,C1,C2,B1,B2,AC1,AC2,AD,angDAC,CD,angD,tries=0;
  do{
    angA=pick([38,42,46,50]);AB=ri(20,32);h=AB*Math.sin(rd(angA));
    BC=ri(Math.ceil(h)+3,AB-2);
    sinC=AB*Math.sin(rd(angA))/BC;
    C1=Math.asin(sinC)*180/Math.PI;C2=180-C1;
    B1=180-angA-C1;B2=180-angA-C2;
    AC1=BC*Math.sin(rd(B1))/Math.sin(rd(angA));
    AC2=BC*Math.sin(rd(B2))/Math.sin(rd(angA));
    AD=ri(16,30);angDAC=pick([48,56,64]);
    CD=Math.sqrt(AC1*AC1+AD*AD-2*AC1*AD*Math.cos(rd(angDAC)));
    angD=Math.acos((AD*AD+CD*CD-AC1*AC1)/(2*AD*CD))*180/Math.PI;
    tries++;
  }while(!(sinC<1&&B2>=12&&AC1-AC2>=4&&CD>5&&angD>20&&angD<120)&&tries<400);
  var q=numq("In a regatta, \\(A\\) is the start boat, \\(B\\) is a first marker, \\(C\\) is a second marker and \\(D\\) is the finish marker. In \\(\\triangle ABC\\), \\(\\angle BAC = "+angA+"^\\circ\\), \\(AB = "+AB+"\\text{ m}\\) and \\(BC = "+BC+"\\text{ m}\\). The second marker lies beyond the first, so \\(AC\\) is the longer of the two distances that fit this data. In \\(\\triangle ACD\\), \\(AD = "+AD+"\\text{ m}\\) and \\(\\angle DAC = "+angDAC+"^\\circ\\). Find the distance \\(CD\\) from the second marker to the finish, to one decimal place, in m.",
    Math.round(CD*10)/10,0.06,
    "First find the shared side \\(AC\\) in \\(\\triangle ABC\\). This is the ambiguous case: \\(\\sin C = \\frac{"+AB+" \\times \\sin "+angA+"^\\circ}{"+BC+"} \\approx "+fmt(sinC,4)+"\\), giving \\(\\angle C \\approx "+fmt(C1,1)+"^\\circ\\) or \\("+fmt(C2,1)+"^\\circ\\). The two matching lengths are \\(AC \\approx "+fmt(AC1,2)+"\\text{ m}\\) and \\(AC \\approx "+fmt(AC2,2)+"\\text{ m}\\). The prompt states the second marker lies beyond the first, so take the longer shared side, \\(AC \\approx "+fmt(AC1,2)+"\\text{ m}\\). Then work in \\(\\triangle ACD\\) with the cosine law: \\(CD^2 = "+fmt(AC1,2)+"^2 + "+AD+"^2 - 2("+fmt(AC1,2)+")("+AD+")\\cos "+angDAC+"^\\circ\\), so \\(CD \\approx \\)<b>\\("+fmt(CD,1)+"\\text{ m}\\)</b>.",
    {angA:angA,AB:AB,BC:BC,AC1:AC1,AC2:AC2,AD:AD,angDAC:angDAC});
  q.figure=twoTriSVG(AB,BC,Math.round(B1),AC1,CD,AD,angDAC,Math.round(angD));
  return q;
});
E("u1-quad-perimeter",1,["7.3"],3,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var AB,BC,angB,AC,angDAC,angD,angACD,CD,AD,per,rot,tries=0;
  do{
    AB=ri(16,26);BC=ri(12,22);angB=pick([60,70,80]);
    AC=Math.sqrt(AB*AB+BC*BC-2*AB*BC*Math.cos(rd(angB)));
    angDAC=pick([42,50,58]);angD=pick([56,64,72]);angACD=180-angDAC-angD;
    CD=AC*Math.sin(rd(angDAC))/Math.sin(rd(angD));
    AD=AC*Math.sin(rd(angACD))/Math.sin(rd(angD));
    per=AB+BC+CD+AD;
    tries++;
  }while(!(angACD>=32&&AC>8&&CD>4&&AD>4)&&tries<400);
  rot=pick([9,12,15,-10,-14]);
  var q=numq("A quadrilateral plot \\(ABCD\\) is split by the diagonal \\(AC\\). In \\(\\triangle ABC\\), \\(AB = "+AB+"\\text{ m}\\), \\(BC = "+BC+"\\text{ m}\\) and \\(\\angle B = "+angB+"^\\circ\\). In \\(\\triangle ACD\\), \\(\\angle DAC = "+angDAC+"^\\circ\\) and \\(\\angle D = "+angD+"^\\circ\\). Find the perimeter of the quadrilateral, to one decimal place, in m.",
    Math.round(per*10)/10,0.06,
    "First find the shared side \\(AC\\) in \\(\\triangle ABC\\) with the cosine law: \\(AC^2 = "+AB+"^2 + "+BC+"^2 - 2("+AB+")("+BC+")\\cos "+angB+"^\\circ\\), so \\(AC \\approx "+fmt(AC,2)+"\\text{ m}\\). Then work in \\(\\triangle ACD\\): its third angle is \\(180^\\circ - "+angDAC+"^\\circ - "+angD+"^\\circ = "+angACD+"^\\circ\\), and the sine law gives both outer sides, \\(CD = "+fmt(AC,2)+" \\times \\frac{\\sin "+angDAC+"^\\circ}{\\sin "+angD+"^\\circ} \\approx "+fmt(CD,2)+"\\text{ m}\\) and \\(AD = "+fmt(AC,2)+" \\times \\frac{\\sin "+angACD+"^\\circ}{\\sin "+angD+"^\\circ} \\approx "+fmt(AD,2)+"\\text{ m}\\). The diagonal is inside the plot and is not part of the perimeter, so the perimeter is \\("+AB+" + "+BC+" + "+fmt(CD,2)+" + "+fmt(AD,2)+" \\approx \\)<b>\\("+fmt(per,1)+"\\text{ m}\\)</b>.",
    {AB:AB,BC:BC,angB:angB,AC:AC,angDAC:angDAC,angD:angD,rot:rot});
  q.figure=chainTriSVG(AB,BC,angB,AC,CD,AD,angDAC,angD,{rot:rot,hideSides:["CD","AD"]});
  return q;
});
E("u1-offset-angle",1,["7.3"],3,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var AB,BD,angB,DC,BC,AC,AD,ADB,ADC,sinADB,acute,rot,tries=0;
  do{
    AB=ri(18,28);BD=ri(6,12);angB=pick([35,45,55]);DC=ri(10,18);BC=BD+DC;
    AD=Math.sqrt(AB*AB+BD*BD-2*AB*BD*Math.cos(rd(angB)));
    ADB=Math.acos((AD*AD+BD*BD-AB*AB)/(2*AD*BD))*180/Math.PI;
    ADC=180-ADB;
    AC=Math.sqrt(AB*AB+BC*BC-2*AB*BC*Math.cos(rd(angB)));
    sinADB=AB*Math.sin(rd(angB))/AD;
    acute=Math.asin(Math.min(1,sinADB))*180/Math.PI;
    tries++;
  }while(!(ADB>95&&ADB<145&&ADC>=35&&ADC<=85&&Math.abs(acute-ADC)<1.5)&&tries<400);
  rot=pick([9,12,15,-10,-14]);
  var q=numq("Point \\(D\\) lies on side \\(BC\\) of \\(\\triangle ABC\\), offset from the midpoint. In \\(\\triangle ABD\\), \\(AB = "+AB+"\\text{ m}\\), \\(BD = "+BD+"\\text{ m}\\) and \\(\\angle B = "+angB+"^\\circ\\). Find \\(\\angle ADC\\), to the nearest degree.",
    Math.round(ADC),0.51,
    "First find the shared side \\(AD\\) in \\(\\triangle ABD\\) with the cosine law: \\(AD^2 = "+AB+"^2 + "+BD+"^2 - 2("+AB+")("+BD+")\\cos "+angB+"^\\circ\\), so \\(AD \\approx "+fmt(AD,2)+"\\text{ m}\\). Then the sine law in the same triangle gives \\(\\sin ADB = \\frac{"+AB+" \\times \\sin "+angB+"^\\circ}{"+fmt(AD,2)+"} \\approx "+fmt(sinADB,4)+"\\). The inverse sine returns \\("+fmt(acute,1)+"^\\circ\\), but the two candidates for \\(\\angle ADB\\) are that angle and its supplement, and the position of \\(D\\) makes \\(\\angle ADB\\) obtuse (check: \\(AD^2 + BD^2 < AB^2\\)), so \\(\\angle ADB = 180^\\circ - "+fmt(acute,1)+"^\\circ \\approx "+fmt(ADB,1)+"^\\circ\\). Since \\(B\\), \\(D\\) and \\(C\\) are on a straight line, \\(\\angle ADC = 180^\\circ - "+fmt(ADB,1)+"^\\circ \\approx \\)<b>\\("+Math.round(ADC)+"^\\circ\\)</b>.",
    {AB:AB,BD:BD,angB:angB,AD:AD,ADB:ADB,rot:rot});
  q.figure=splitTriSVG(BC,AC,AB,BD/BC,{L:["A","B","C"],DL:"D",angB:angB+"\u00B0",sideC:AB+" m",sideA1:BD+" m",rot:rot});
  return q;
});
E("u1-harbour-chain",1,["7.3"],3,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var AB,angA,angB,angC,AC,BC,AD,angDAC,CD,angD,dSine,dSwap,opts,rot,tries=0;
  do{
    AB=ri(35,60);angA=pick([40,48,56]);angB=pick([58,66,74]);angC=180-angA-angB;
    AC=AB*Math.sin(rd(angB))/Math.sin(rd(angC));
    BC=AB*Math.sin(rd(angA))/Math.sin(rd(angC));
    AD=ri(30,55);angDAC=pick([48,56,64]);
    CD=Math.sqrt(AC*AC+AD*AD-2*AC*AD*Math.cos(rd(angDAC)));
    angD=Math.acos((AD*AD+CD*CD-AC*AC)/(2*AD*CD))*180/Math.PI;
    /* sine-law pairing slip in stage 2: the sines of DAC and D swapped */
    dSine=AC*Math.sin(rd(angD))/Math.sin(rd(angDAC));
    /* sides swapped in stage 2: AD used in place of the shared side AC */
    dSwap=Math.sqrt(AD*AD+AD*AD-2*AD*AD*Math.cos(rd(angDAC)));
    opts=[fmt(CD,1),fmt(AC,1),fmt(dSine,1),fmt(dSwap,1)];
    tries++;
  }while(!(angC>=32&&CD>8&&angD>20&&angD<120&&new Set(opts).size===4)&&tries<400);
  rot=pick([9,12,15,-10,-14]);
  var q=mcq("A harbour chain is surveyed in two triangles that share the side \\(AC\\). In \\(\\triangle ABC\\), \\(A\\) is the harbour entrance, \\(B\\) is a beacon \\("+AB+"\\text{ m}\\) from the entrance, \\(\\angle BAC = "+angA+"^\\circ\\) and \\(\\angle B = "+angB+"^\\circ\\). In \\(\\triangle ACD\\), \\(D\\) is a lighthouse, \\(AD = "+AD+"\\text{ m}\\) and \\(\\angle DAC = "+angDAC+"^\\circ\\). What is the distance \\(CD\\) from the pier point \\(C\\) to the lighthouse, to one decimal place, in m?",
    fmt(CD,1)+" m",
    [fmt(AC,1)+" m",fmt(dSine,1)+" m",fmt(dSwap,1)+" m"],
    "First find the shared side \\(AC\\) in \\(\\triangle ABC\\): the third angle is \\(180^\\circ - "+angA+"^\\circ - "+angB+"^\\circ = "+angC+"^\\circ\\), and the sine law gives \\(\\frac{AC}{\\sin "+angB+"^\\circ} = \\frac{"+AB+"}{\\sin "+angC+"^\\circ}\\), so \\(AC \\approx "+fmt(AC,2)+"\\text{ m}\\). Then work in \\(\\triangle ACD\\): the shared side and \\(AD\\) meet at the included angle \\(\\angle DAC\\), so the cosine law applies: \\(CD^2 = "+fmt(AC,2)+"^2 + "+AD+"^2 - 2("+fmt(AC,2)+")("+AD+")\\cos "+angDAC+"^\\circ\\), giving \\(CD \\approx \\)<b>\\("+fmt(CD,1)+"\\text{ m}\\)</b>. The shared side alone is only the first stage, and a sine-law pairing in the second triangle pairs a side with an angle that is not opposite it.",
    {AB:AB,angA:angA,angB:angB,AC:AC,AD:AD,angDAC:angDAC,rot:rot});
  q.figure=chainTriSVG(AB,BC,angB,AC,CD,AD,angDAC,Math.round(angD),{rot:rot,hideSides:["BC","CD"]});
  return q;
});

// Math 2201 Unit 1 prior-knowledge bank, batch D (authored new, November 2026).
// Right-triangle prerequisite items (feeder skills from Math 1201 Unit 7),
// flagged PK for Math 2201 Unit 1. Entries by group:
//   trig-sides (Level 1, ["7.1"]):
//     u1-pk-role-from-diagram, u1-pk-hypotenuse-pick, u1-pk-opposite-read,
//     u1-pk-two-angles-roles, u1-pk-role-value, u1-pk-role-words
//   trig-ratios (Level 1, ["7.2"]):
//     u1-pk-ratio-from-figure, u1-pk-ratio-equation, u1-pk-find-hypotenuse,
//     u1-pk-angle-from-legs, u1-pk-ratio-letters, u1-pk-other-angle-ratio,
//     u1-pk-ratio-decimal, u1-pk-angle-from-value, u1-pk-ratio-unreduced
//   pythagoras (Level 1, ["7.2"]):
//     u1-pk-diag-num, u1-pk-leg-num, u1-pk-point-distance,
//     u1-pk-right-check, u1-pk-screen-size, u1-pk-shortcut-saving
//   solve-triangle (Level 2, ["7.2"]):
//     u1-pk-solve-perimeter, u1-pk-solve-second-leg,
//     u1-pk-solve-isosceles, u1-pk-solve-scene
//   trig-context (Level 2, ["7.2"]):
//     u1-pk-elevation-height, u1-pk-depression-distance, u1-pk-shadow-angle,
//     u1-pk-ramp-length, u1-pk-ladder-reach, u1-pk-wire-length,
//     u1-pk-tree-distance, u1-pk-slide-angle
// Entry 5 note: u1-pk-role-value uses the scene form (flagpole / tent pole /
// mast with a wire or cable to a ground anchor; options are the scene parts
// and the question asks which part is adjacent to the angle at the anchor),
// because the pure-roles numeric form collapses into u1-pk-opposite-read.

/* ================= trig-sides ================= */
E("u1-pk-role-from-diagram", 1, ["7.1"], 1, "gen", function(){
  var ns=u7names(),X=ns[0],Y=ns[1],R=ns[2];
  var t=pick(U7_TRIPLES),k=ri(1,3);
  var swap=pick([true,false]);
  var legA=(swap?t[1]:t[0])*k, legB=(swap?t[0]:t[1])*k, hyp=t[2]*k;
  var marked=pick([X,Y]),other=(marked===X?Y:X);
  var hypN=u7side(X,Y),oppM=u7side(other,R),adjM=u7side(marked,R);
  var ask=pick(["hyp","opp","adj"]);
  var key,ds,sol;
  if(ask==="hyp"){
    key="Side "+hypN+" is the hypotenuse";
    ds=["Side "+adjM+" is the hypotenuse","Side "+oppM+" is the hypotenuse","Side "+hypN+" is opposite angle "+marked];
    sol="The hypotenuse is the side opposite the right angle at "+R+"; it joins "+X+" and "+Y+", so it is <b>side "+hypN+"</b>. (Relative to angle "+marked+", side "+oppM+" is opposite and side "+adjM+" is adjacent.)";
  }else if(ask==="opp"){
    key="Side "+oppM+" is opposite angle "+marked;
    ds=["Side "+adjM+" is opposite angle "+marked,"Side "+oppM+" is adjacent to angle "+marked,"Side "+hypN+" is opposite angle "+marked];
    sol="The side opposite angle "+marked+" does not touch angle "+marked+"; it joins "+other+" and "+R+", so it is <b>side "+oppM+"</b>. Side "+adjM+" touches angle "+marked+", so it is the adjacent side, and side "+hypN+" is the hypotenuse.";
  }else{
    key="Side "+adjM+" is adjacent to angle "+marked;
    ds=["Side "+oppM+" is adjacent to angle "+marked,"Side "+adjM+" is opposite angle "+marked,"Side "+hypN+" is adjacent to angle "+marked];
    sol="The side adjacent to angle "+marked+" forms that angle together with the hypotenuse; it joins "+marked+" and "+R+", so it is <b>side "+adjM+"</b>. Side "+oppM+" does not touch angle "+marked+", so it is the opposite side.";
  }
  var askText=(ask==="hyp"?"identifies the hypotenuse":ask==="opp"?"identifies the side opposite angle "+marked:"identifies the side adjacent to angle "+marked);
  var angLab=[null,null,null];angLab[marked===X?0:1]=marked;
  var q=mcq("The diagram shows right triangle "+X+Y+R+" with the right angle at "+R+". Angle "+marked+" is marked. Which statement correctly "+askText+"?",
    key,ds,
    "In triangle "+X+Y+R+" the right angle is at "+R+". "+sol,
    {X:X,Y:Y,R:R,marked:marked,ask:ask,keyText:key});
  q.figure=triRotSVG(legA,legB,hyp,{L:[X,Y,R],ang:angLab,side:[u7side(Y,R),u7side(X,R),u7side(X,Y)],rot:pick([9,12,15,-10,-14])});
  return q;
});
E("u1-pk-hypotenuse-pick", 1, ["7.1"], 1, "gen", function(){
  var ns=u7names();
  var perm=pick([[0,1,2],[2,0,1],[1,2,0]]);
  var L=[ns[perm[0]],ns[perm[1]],ns[perm[2]]],RA=L[2];
  var t=pick(U7_TRIPLES),k=ri(1,3);
  var swap=pick([true,false]);
  var legA=(swap?t[1]:t[0])*k, legB=(swap?t[0]:t[1])*k, hyp=t[2]*k;
  var hypN=u7side(L[0],L[1]),legN1=u7side(L[1],L[2]),legN2=u7side(L[2],L[0]);
  var mi=pick([0,1]),marked=L[mi];
  var angLab=[null,null,null];angLab[mi]=marked;
  var key="Side "+hypN;
  var q=mcq("The diagram shows a right triangle "+L[0]+L[1]+L[2]+" with the right angle at "+RA+". Angle "+marked+" is marked. Which side is the hypotenuse?",
    key,
    ["Side "+legN1,"Side "+legN2,"The side opposite the marked angle"],
    "The hypotenuse is the side opposite the right angle. The right angle is at "+RA+", and the side that does not touch "+RA+" joins "+L[0]+" and "+L[1]+", so the hypotenuse is <b>side "+hypN+"</b>. The side opposite the marked angle "+marked+" is a leg, not the hypotenuse.",
    {L0:L[0],L1:L[1],RA:RA,marked:marked,keyText:key});
  q.figure=triRotSVG(legA,legB,hyp,{L:L,ang:angLab,side:[legN1,legN2,hypN],rot:pick([9,12,15,-10,-14])});
  return q;
});
E("u1-pk-opposite-read", 1, ["7.1"], 1, "gen", function(){
  var ns=u7names(),X=ns[0],Y=ns[1],R=ns[2];
  var t=pick(U7_TRIPLES),k=ri(1,4);
  var legA=t[0]*k, legB=t[1]*k, hyp=t[2]*k;
  var marked=pick([X,Y]);
  var oppLen=(marked===X?legA:legB), adjLen=(marked===X?legB:legA);
  var unit=pick(["cm","m"]);
  var angLab=[null,null,null];angLab[marked===X?0:1]=marked;
  var key=oppLen+" "+unit;
  var q=mcq("The diagram shows right triangle "+X+Y+R+" with the right angle at "+R+" and one acute angle marked. What is the length of the side opposite the marked angle?",
    key,
    [adjLen+" "+unit,hyp+" "+unit,(legA+legB)+" "+unit],
    "The side opposite the marked angle is the side that does not touch that angle. In the diagram its label reads <b>"+oppLen+" "+unit+"</b>. (The side of length "+adjLen+" "+unit+" touches the marked angle, so it is adjacent, and the side of length "+hyp+" "+unit+" is the hypotenuse.)",
    {X:X,Y:Y,R:R,marked:marked,oppLen:oppLen,adjLen:adjLen,hyp:hyp});
  q.figure=triRotSVG(legA,legB,hyp,{L:[X,Y,R],ang:angLab,side:[legA+" "+unit,legB+" "+unit,hyp+" "+unit],rot:pick([9,12,15,-10,-14])});
  return q;
});
E("u1-pk-two-angles-roles", 1, ["7.1"], 1, "var", varset([
  function(){
    var key="Angle P: opposite side QR, adjacent side PR. Angle Q: opposite side PR, adjacent side QR.";
    var q=mcq("In right triangle PQR, the right angle is at R. Which statement correctly gives the opposite and adjacent sides for both acute angles?",
      key,
      ["Angle P: opposite side PR, adjacent side QR. Angle Q: opposite side PR, adjacent side QR.",
       "Angle P: opposite side QR, adjacent side PR. Angle Q: opposite side QR, adjacent side PR.",
       "Angle P: opposite side PR, adjacent side QR. Angle Q: opposite side QR, adjacent side PR."],
      "For angle P, the side that does not touch P is QR, so QR is opposite P, and the leg that forms P with the hypotenuse is PR, so PR is adjacent to P. For angle Q the roles reverse: the side that does not touch Q is PR (opposite Q) and the leg forming Q is QR (adjacent to Q). So the correct statement gives <b>opposite QR and adjacent PR for P, and opposite PR and adjacent QR for Q</b>.",
      {variant:1});
    q.figure=triSVG(4,3,5,{L:["P","Q","R"],ang:["P","Q",null],side:["QR","PR","PQ"]});
    return q;
  },
  function(){
    var key="Angle D: opposite side EF, adjacent side DF. Angle E: opposite side DF, adjacent side EF.";
    var q=mcq("In right triangle DEF, the right angle is at F. Which statement correctly gives the opposite and adjacent sides for both acute angles?",
      key,
      ["Angle D: opposite side DF, adjacent side EF. Angle E: opposite side DF, adjacent side EF.",
       "Angle D: opposite side EF, adjacent side DF. Angle E: opposite side EF, adjacent side DF.",
       "Angle D: opposite side DF, adjacent side EF. Angle E: opposite side EF, adjacent side DF."],
      "For angle D, the side that does not touch D is EF, so EF is opposite D, and the leg that forms D with the hypotenuse is DF, so DF is adjacent to D. For angle E the roles reverse: the side that does not touch E is DF (opposite E) and the leg forming E is EF (adjacent to E). So the correct statement gives <b>opposite EF and adjacent DF for D, and opposite DF and adjacent EF for E</b>.",
      {variant:2});
    q.figure=triSVG(3,4,5,{L:["D","E","F"],ang:["D","E",null],side:["EF","DF","DE"]});
    return q;
  },
  function(){
    var key="Angle T: opposite side SU, adjacent side TU. Angle S: opposite side TU, adjacent side SU.";
    var q=mcq("In right triangle STU, the right angle is at U. Which statement correctly gives the opposite and adjacent sides for both acute angles?",
      key,
      ["Angle T: opposite side TU, adjacent side SU. Angle S: opposite side TU, adjacent side SU.",
       "Angle T: opposite side SU, adjacent side TU. Angle S: opposite side SU, adjacent side TU.",
       "Angle T: opposite side TU, adjacent side SU. Angle S: opposite side SU, adjacent side TU."],
      "For angle T, the side that does not touch T is SU, so SU is opposite T, and the leg that forms T with the hypotenuse is TU, so TU is adjacent to T. For angle S the roles reverse: the side that does not touch S is TU (opposite S) and the leg forming S is SU (adjacent to S). So the correct statement gives <b>opposite SU and adjacent TU for T, and opposite TU and adjacent SU for S</b>.",
      {variant:3});
    q.figure=triSVG(4,3,5,{L:["S","T","U"],ang:["S","T",null],side:["TU","SU","ST"]});
    return q;
  }
]));
E("u1-pk-role-value", 1, ["7.1"], 1, "gen", function(){
  var sc=pick([
    {stem:"A guy wire runs from the top of a flagpole to an anchor in level ground. At the anchor, the wire makes an angle with the ground.",key:"the ground between the pole and the anchor",slant:"the guy wire",vert:"the flagpole"},
    {stem:"A guy rope runs from the top of a tent pole to a peg in level ground. At the peg, the rope makes an angle with the ground.",key:"the ground between the pole and the peg",slant:"the guy rope",vert:"the tent pole"},
    {stem:"A support cable runs from the top of a mast to an anchor in level ground. At the anchor, the cable makes an angle with the ground.",key:"the ground between the mast and the anchor",slant:"the support cable",vert:"the mast"}
  ]);
  var q=mcq(sc.stem+" The wire, the vertical member and the ground form a right triangle. Which part of the scene is the side adjacent to the angle at the anchor?",
    sc.key,
    [sc.slant,sc.vert,"the hypotenuse"],
    "The angle at the anchor is formed by two sides: the slanted member, which is the hypotenuse, and the ground. The adjacent side is the side that forms the angle together with the hypotenuse, so it is <b>"+sc.key+"</b>. The vertical member ("+sc.vert+") is the side opposite the angle at the anchor.",
    {keyText:sc.key,slant:sc.slant,vert:sc.vert});
  q.figure=u7triSceneSVG({vert:6,ground:8,slant:10,angle:"?"});
  return q;
});
E("u1-pk-role-words", 1, ["7.1"], 1, "var", varset([
  function(){return mcq("A diagonal support beam braces a vertical post against a horizontal floor. The beam, the post and the floor form a right triangle, and a horizontal rail runs from the top of the post to the wall behind it. Which part of the scene is the hypotenuse of the right triangle?",
    "the diagonal support beam",
    ["the vertical post","the floor between the post and the foot of the beam","the horizontal rail at the top of the post"],
    "The right angle sits where the vertical post meets the horizontal floor. The hypotenuse is the side opposite that right angle, which is the slanted side of the triangle: <b>the diagonal support beam</b>.",{variant:1});},
  function(){return mcq("A ramp rises from a level floor to the top of a loading platform. The ramp, the vertical face of the platform and the floor form a right triangle. Which part of the scene is the hypotenuse of the right triangle?",
    "the ramp surface",
    ["the vertical face of the platform","the floor beneath the ramp","the flat top of the platform"],
    "The right angle sits where the vertical face of the platform meets the level floor. The hypotenuse is the side opposite that right angle, which is the slanted side of the triangle: <b>the ramp surface</b>.",{variant:2});},
  function(){return mcq("A ladder leans against a vertical wall, reaching a windowsill. The ladder, the wall and the ground form a right triangle. Which part of the scene is the hypotenuse of the right triangle?",
    "the ladder",
    ["the wall","the ground between the wall and the foot of the ladder","the windowsill the ladder reaches"],
    "The right angle sits where the vertical wall meets the level ground. The hypotenuse is the side opposite that right angle, which is the slanted side of the triangle: <b>the ladder</b>.",{variant:3});},
  function(){return mcq("A guy rope runs from the top of a tent pole to a peg in level ground. The rope, the pole and the ground form a right triangle. Which part of the scene is the hypotenuse of the right triangle?",
    "the guy rope",
    ["the tent pole","the ground between the pole and the peg","the tent fabric beside the pole"],
    "The right angle sits where the vertical pole meets the level ground. The hypotenuse is the side opposite that right angle, which is the slanted side of the triangle: <b>the guy rope</b>.",{variant:4});}
]));

/* ================= trig-ratios ================= */
E("u1-pk-ratio-from-figure", 1, ["7.2"], 1, "gen", function(){
  var ns=u7names(),X=ns[0],Y=ns[1],R=ns[2];
  var t=pick(U7_TRIPLES),k=ri(1,4);
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
  var angLab=[null,null,null];angLab[ang===X?0:1]=ang;
  var q=mcq("The diagram shows right triangle "+X+Y+R+" with the right angle at "+R+". Angle "+ang+" is marked. What is the value of \\(\\"+fn+" "+ang+"\\)?",
    key,ds,
    "The "+fnName+" ratio is "+ratioWord+". For angle "+ang+", the opposite side is \\("+opp+"\\) "+unit+", the adjacent side is \\("+adj+"\\) "+unit+", and the hypotenuse is \\("+hyp+"\\) "+unit+": \\[ \\begin{aligned} \\"+fn+" "+ang+" &= "+FR(num,den)+(u7red(num,den)[1]===1?"":" \\\\ &= "+u7fracS(num,den))+" \\end{aligned} \\] The value of \\(\\"+fn+" "+ang+"\\) is <b>"+key+"</b>.",
    {ang:ang,fn:fn,opp:opp,adj:adj,hyp:hyp,keyText:key});
  q.figure=triRotSVG(legYR,legXR,hyp,{L:[X,Y,R],ang:angLab,side:[legYR+" "+unit,legXR+" "+unit,hyp+" "+unit],rot:pick([9,12,15,-10,-14])});
  return q;
});
E("u1-pk-ratio-equation", 1, ["7.2"], 1, "gen", function(){
  var t=pick(U7_TRIPLES);
  var swap=pick([true,false]);
  var oppLeg=(swap?t[1]:t[0]), adjLeg=(swap?t[0]:t[1]), hyp0=t[2];
  var fn=pick(["sin","cos"]);
  var askedNum=(fn==="sin"?oppLeg:adjLeg), compNum=(fn==="sin"?adjLeg:oppLeg);
  var g=u7gcd(askedNum,hyp0), rn=askedNum/g, rd=hyp0/g;
  var s=ri(2,6), H=rd*s, ans=rn*s, compVal=Math.round(compNum*H/hyp0);
  var roleWord=(fn==="sin"?"opposite":"adjacent");
  var candNums=[compVal,H,rn*(s+1),rn*(s-1),ans+rn,H+rn];
  var seen={},ds=[];
  candNums.forEach(function(c){if(ds.length<3&&c>0&&c!==ans&&!seen[c]){seen[c]=1;ds.push(c+" cm");}});
  var pad=2;while(ds.length<3){var cc=ans+pad;pad++;if(!seen[cc]){seen[cc]=1;ds.push(cc+" cm");}}
  var A=pick(["P","A","K","D"]);
  var q=mcq("In a right triangle, \\(\\"+fn+" "+A+" = "+u7fracS(askedNum,hyp0)+"\\) and the hypotenuse is \\("+H+"\\) cm. How long is the side "+roleWord+" angle "+A+"?",
    ans+" cm",ds,
    "The "+(fn==="sin"?"sine":"cosine")+" ratio is "+roleWord+" over hypotenuse, so the "+roleWord+" side is the ratio times the hypotenuse: \\[ \\begin{aligned} \\text{"+roleWord+"} &= "+u7fracS(askedNum,hyp0)+" \\times "+H+" \\\\ &= "+ans+" \\end{aligned} \\] The side "+roleWord+" angle "+A+" is <b>\\("+ans+"\\) cm</b>.",
    {fn:fn,A:A,H:H,ans:ans,compVal:compVal});
  return q;
});
E("u1-pk-find-hypotenuse", 1, ["7.2"], 1, "gen", function(){
  var V=pick(["A","B"]);
  var oppName=(V==="A"?"BC":"AC"), adjName=(V==="A"?"AC":"BC");
  var theta=pick(U7_ANGLES), mode=pick([1,2]);
  var given=ri(8,40), ratio, givenName, fnWord, steps;
  if(mode===1){ratio=u7sinD(theta);givenName=oppName;fnWord="\\sin";
    steps="\\sin "+theta+"^\\circ &= "+FR(given,"AB")+" \\\\ AB &= "+FR(given,"\\sin "+theta+"^\\circ");}
  else{ratio=u7cosD(theta);givenName=adjName;fnWord="\\cos";
    steps="\\cos "+theta+"^\\circ &= "+FR(given,"AB")+" \\\\ AB &= "+FR(given,"\\cos "+theta+"^\\circ");}
  var hypV=given/ratio, ans=u7r1(hypV);
  var roleText=(mode===1?"the side opposite angle "+V+", "+oppName+", is":"the side adjacent to angle "+V+", "+adjName+", is");
  var q=numq("A right triangle ABC has the right angle at C and angle "+V+" is \\("+theta+"^\\circ\\). In the triangle, "+roleText+" \\("+given+"\\) cm. Find the length of the hypotenuse AB, in centimetres, to the nearest tenth.",
    ans,0.06,
    "The known side and the hypotenuse give the "+(mode===1?"sine":"cosine")+" ratio at angle "+V+". Rearrange it for the hypotenuse: \\[ \\begin{aligned} "+steps+" \\\\ &\\approx "+u7f1(ans)+" \\end{aligned} \\] The length of the hypotenuse AB is <b>\\("+u7f1(ans)+"\\) cm</b>.",
    {mode:mode,V:V,theta:theta,given:given,ans:ans});
  var oppV=hypV*u7sinD(theta), adjV=hypV*u7cosD(theta);
  var gi=(mode===1?(V==="A"?0:1):(V==="A"?1:0));
  var sLab=[null,null,"?"];sLab[gi]=given+" cm";
  var aLab=[null,null,null];aLab[V==="A"?0:1]=theta+"°";
  q.figure=triRotSVG(V==="A"?oppV:adjV,V==="A"?adjV:oppV,hypV,{L:["A","B","C"],side:sLab,ang:aLab,rot:pick([9,12,15,-10,-14])});
  return q;
});
E("u1-pk-angle-from-legs", 1, ["7.2"], 1, "gen", function(){
  var V=pick(["A","B"]);
  var oppName=(V==="A"?"BC":"AC"), adjName=(V==="A"?"AC":"BC");
  var opp,adj,raw,tries=0;
  do{tries++;opp=ri(4,30);adj=ri(4,30);raw=u7atanD(opp/adj);}while((raw<15||raw>75)&&tries<100);
  var ans=Math.round(raw);
  var q=numq("A right triangle ABC has the right angle at C. In the triangle, the side opposite angle "+V+", "+oppName+", is \\("+opp+"\\) cm and the side adjacent to angle "+V+", "+adjName+", is \\("+adj+"\\) cm. Give the measure of angle "+V+", in degrees, to the nearest degree.",
    ans,0.51,
    "The two known sides are the opposite and adjacent sides for angle "+V+", so use the tangent ratio and undo it with the inverse tangent: \\[ \\begin{aligned} \\tan "+V+" &= "+FR(opp,adj)+" \\\\ "+V+" &= \\tan^{-1}\\left("+FR(opp,adj)+"\\right) \\\\ &\\approx "+ans+"^\\circ \\end{aligned} \\] The measure of angle "+V+" is <b>\\("+ans+"^\\circ\\)</b>.",
    {V:V,opp:opp,adj:adj,ans:ans});
  var bcLen=(V==="A"?opp:adj), acLen=(V==="A"?adj:opp);
  var hypV=Math.sqrt(opp*opp+adj*adj);
  var aLab=[null,null,null];aLab[V==="A"?0:1]="?";
  q.figure=triRotSVG(bcLen,acLen,hypV,{L:["A","B","C"],side:[bcLen+" cm",acLen+" cm",null],ang:aLab,rot:pick([9,12,15,-10,-14])});
  return q;
});
E("u1-pk-ratio-letters", 1, ["7.2"], 1, "var", varset([
  function(){
    var key="\\("+FR("BC","AB")+"\\)";
    var q=mcq("Triangle ABC is a right triangle with the right angle at C, as shown. Which fraction equals \\(\\sin A\\)?",
      key,
      ["\\("+FR("AC","AB")+"\\)","\\("+FR("BC","AC")+"\\)","\\("+FR("AC","BC")+"\\)"],
      "Sine is opposite over hypotenuse. For angle A, the opposite side is BC and the hypotenuse is AB, so \\(\\sin A = \\)<b>"+key+"</b>. (AC over AB would be \\(\\cos A\\), and BC over AC would be \\(\\tan A\\).)",
      {variant:1});
    q.figure=triSVG(4,3,5,{L:["A","B","C"],ang:["A",null,null]});
    return q;
  },
  function(){
    var key="\\("+FR("QR","PQ")+"\\)";
    var q=mcq("Triangle PQR is a right triangle with the right angle at R, as shown. Which fraction equals \\(\\cos Q\\)?",
      key,
      ["\\("+FR("PR","PQ")+"\\)","\\("+FR("PR","QR")+"\\)","\\("+FR("PQ","QR")+"\\)"],
      "Cosine is adjacent over hypotenuse. For angle Q, the adjacent side is QR and the hypotenuse is PQ, so \\(\\cos Q = \\)<b>"+key+"</b>. (PR over PQ would be \\(\\sin Q\\), and PR over QR would be \\(\\tan Q\\).)",
      {variant:2});
    q.figure=triSVG(4,3,5,{L:["P","Q","R"],ang:[null,"Q",null]});
    return q;
  },
  function(){
    var key="\\("+FR("EF","DF")+"\\)";
    var q=mcq("Triangle DEF is a right triangle with the right angle at F, as shown. Which fraction equals \\(\\tan D\\)?",
      key,
      ["\\("+FR("EF","DE")+"\\)","\\("+FR("DF","DE")+"\\)","\\("+FR("DF","EF")+"\\)"],
      "Tangent is opposite over adjacent. For angle D, the opposite side is EF and the adjacent side is DF, so \\(\\tan D = \\)<b>"+key+"</b>. (EF over DE would be \\(\\sin D\\), and DF over DE would be \\(\\cos D\\).)",
      {variant:3});
    q.figure=triSVG(4,3,5,{L:["D","E","F"],ang:["D",null,null]});
    return q;
  }
]));
E("u1-pk-other-angle-ratio", 1, ["7.2"], 1, "gen", function(){
  var ns=u7names(),X=ns[0],Y=ns[1],R=ns[2];
  var t=pick(U7_TRIPLES),k=ri(1,4);
  var swap=pick([true,false]);
  var aLen=(swap?t[1]:t[0])*k, bLen=(swap?t[0]:t[1])*k, hyp=t[2]*k;
  var key="\\("+u7fracS(aLen,hyp)+"\\)";
  var ds=["\\("+u7fracS(bLen,hyp)+"\\)","\\("+u7fracS(bLen,aLen)+"\\)","\\("+u7fracS(hyp,aLen)+"\\)"];
  var q=mcq("In right triangle "+X+Y+R+" with the right angle at "+R+", the side opposite angle "+X+" is \\("+aLen+"\\) cm, the side adjacent to angle "+X+" is \\("+bLen+"\\) cm, and the hypotenuse is \\("+hyp+"\\) cm. What is the value of \\(\\cos "+Y+"\\)?",
    key,ds,
    "Cosine is adjacent over hypotenuse, but the angle asked for is "+Y+", not "+X+". The side adjacent to angle "+Y+" is the side joining "+Y+" and "+R+", which is the \\("+aLen+"\\) cm side (the side opposite angle "+X+"): \\[ \\begin{aligned} \\cos "+Y+" &= "+FR(aLen,hyp)+(u7red(aLen,hyp)[1]===1?"":" \\\\ &= "+u7fracS(aLen,hyp))+" \\end{aligned} \\] The value of \\(\\cos "+Y+"\\) is <b>"+key+"</b>. This matches \\(\\sin "+X+"\\): the two acute angles are complementary.",
    {X:X,Y:Y,R:R,aLen:aLen,bLen:bLen,hyp:hyp,keyText:key});
  q.figure=triRotSVG(aLen,bLen,hyp,{L:[X,Y,R],ang:[X,Y,null],side:[aLen+" cm",bLen+" cm",hyp+" cm"],rot:pick([9,12,15,-10,-14])});
  return q;
});
E("u1-pk-ratio-decimal", 1, ["7.2"], 1, "gen", function(){
  var A=pick(["A","P","K"]);
  var opp,adj,hyp,fn,keyVal,tries=0,vals=null;
  do{
    tries++;
    var t=pick(U7_TRIPLES),k=ri(1,3);
    var swap=pick([true,false]);
    opp=(swap?t[1]:t[0])*k; adj=(swap?t[0]:t[1])*k; hyp=t[2]*k;
    fn=pick(["sin","cos","tan"]);
    var sinV=opp/hyp, cosV=adj/hyp, tanV=opp/adj;
    keyVal=(fn==="sin"?sinV:fn==="cos"?cosV:tanV);
    var cand=[keyVal,(fn==="sin"?cosV:sinV),(fn==="tan"?cosV:tanV),1/keyVal];
    if(fn==="tan")cand=[keyVal,sinV,cosV,1/keyVal];
    var strs=cand.map(function(v){return (Math.round(v*100)/100).toFixed(2);});
    var uniq={};strs.forEach(function(s2){uniq[s2]=1;});
    if(Object.keys(uniq).length===4)vals={strs:strs};
  }while(!vals&&tries<200);
  var key=vals.strs[0];
  var ds=[vals.strs[1],vals.strs[2],vals.strs[3]];
  var fnName=(fn==="sin"?"sine":fn==="cos"?"cosine":"tangent");
  var num=(fn==="tan"?opp:fn==="sin"?opp:adj), den=(fn==="tan"?adj:hyp);
  var q=mcq("In a right triangle, the side opposite angle "+A+" is \\("+opp+"\\) cm, the side adjacent to angle "+A+" is \\("+adj+"\\) cm, and the hypotenuse is \\("+hyp+"\\) cm. What is the value of \\(\\"+fn+" "+A+"\\), to two decimal places?",
    key,ds,
    "The "+fnName+" ratio for angle "+A+" uses "+(fn==="tan"?"the opposite side over the adjacent side":"the "+(fn==="sin"?"opposite":"adjacent")+" side over the hypotenuse")+": \\[ \\begin{aligned} \\"+fn+" "+A+" &= "+FR(num,den)+" \\\\ &\\approx "+key+" \\end{aligned} \\] The value of \\(\\"+fn+" "+A+"\\) is <b>\\("+key+"\\)</b>.",
    {A:A,fn:fn,opp:opp,adj:adj,hyp:hyp,keyText:key});
  return q;
});
E("u1-pk-angle-from-value", 1, ["7.2"], 1, "gen", function(){
  var cases=[["sin",3,5,"0.6"],["sin",1,2,"0.5"],["cos",4,5,"0.8"],["cos",1,2,"0.5"],["sin",5,13,"0.3846"],["cos",12,13,"0.9231"],["tan",3,4,"0.75"],["tan",4,3,"1.3333"],["sin",8,17,"0.4706"],["cos",15,17,"0.8824"],["tan",5,12,"0.4167"],["sin",7,25,"0.28"]];
  var cs=pick(cases),fn=cs[0],val=cs[1]/cs[2],disp=cs[3];
  var A=pick(["A","P","K","T"]);
  var raw=(fn==="sin"?u7asinD(val):fn==="cos"?u7acosD(val):u7atanD(val));
  var ans=Math.round(raw);
  var inv=(fn==="sin"?"\\sin^{-1}":fn==="cos"?"\\cos^{-1}":"\\tan^{-1}");
  var q=numq("In a right triangle, \\(\\"+fn+" "+A+" = "+disp+"\\). Find the measure of angle "+A+", in degrees, to the nearest degree.",
    ans,0.51,
    "Undo the ratio with its inverse: \\[ \\begin{aligned} "+A+" &= "+inv+"("+disp+") \\\\ &\\approx "+ans+"^\\circ \\end{aligned} \\] The measure of angle "+A+" is <b>\\("+ans+"^\\circ\\)</b>.",
    {fn:fn,A:A,disp:disp,ans:ans});
  return q;
});
E("u1-pk-ratio-unreduced", 1, ["7.2"], 1, "gen", function(){
  var ns=u7names(),X=ns[0],Y=ns[1],R=ns[2];
  var prim=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29],[9,40,41],[12,35,37]];
  var t=pick(prim),k=pick([2,3]);
  var swap=pick([true,false]);
  var legXR=(swap?t[1]:t[0])*k, legYR=(swap?t[0]:t[1])*k, hyp=t[2]*k;
  var ang=pick([X,Y]);
  var opp=(ang===X?legYR:legXR), adj=(ang===X?legXR:legYR);
  var fn=pick(["sin","cos","tan"]);
  var num,den,wrongPr;
  if(fn==="sin"){num=opp;den=hyp;wrongPr=[adj,hyp];}
  else if(fn==="cos"){num=adj;den=hyp;wrongPr=[opp,hyp];}
  else{num=opp;den=adj;wrongPr=[opp,hyp];}
  var key="\\("+u7fracS(num,den)+"\\)";
  var ds=["\\("+FR(num,den)+"\\)","\\("+u7fracS(den,num)+"\\)","\\("+u7fracS(wrongPr[0],wrongPr[1])+"\\)"];
  var fnName=(fn==="sin"?"sine":fn==="cos"?"cosine":"tangent");
  var ratioWord=(fn==="tan"?"opposite over adjacent":fn==="sin"?"opposite over hypotenuse":"adjacent over hypotenuse");
  var unit=pick(["cm","m"]);
  var q=mcq("Triangle "+X+Y+R+" is a right triangle with the right angle at "+R+". Side "+X+R+" is \\("+legXR+"\\) "+unit+", side "+Y+R+" is \\("+legYR+"\\) "+unit+", and side "+X+Y+" is \\("+hyp+"\\) "+unit+". What is the value of \\(\\"+fn+" "+ang+"\\), in lowest terms?",
    key,ds,
    "The "+fnName+" ratio is "+ratioWord+". For angle "+ang+", the opposite side is \\("+opp+"\\) "+unit+", the adjacent side is \\("+adj+"\\) "+unit+", and the hypotenuse is \\("+hyp+"\\) "+unit+". Written with the drawn lengths the ratio is \\("+FR(num,den)+"\\) (one of the options), but the value in lowest terms is \\[ \\begin{aligned} \\"+fn+" "+ang+" &= "+FR(num,den)+" \\\\ &= "+u7fracS(num,den)+" \\end{aligned} \\] The value of \\(\\"+fn+" "+ang+"\\) is <b>"+key+"</b>.",
    {ang:ang,fn:fn,opp:opp,adj:adj,hyp:hyp,keyText:key});
  q.figure=triSVG(legYR,legXR,hyp,{L:[X,Y,R],side:[legYR+" "+unit,legXR+" "+unit,hyp+" "+unit]});
  return q;
});

/* ================= pythagoras ================= */
E("u1-pk-diag-num", 1, ["7.2"], 1, "gen", function(){
  var CTX=[
    {u:"cm",scales:[0.5,1,1.5],max:22,fig:false,make:function(a,b){return "A tablet screen is "+u7trim(a)+" cm wide and "+u7trim(b)+" cm tall. How long, in centimetres, is the diagonal of the screen? Give your answer to the nearest tenth.";}},
    {u:"m",scales:[0.5,1],max:13,fig:true,make:function(a,b){return "A sheet of plywood is "+u7trim(a)+" m long and "+u7trim(b)+" m wide. A straight cut runs from one corner of the sheet to the opposite corner. How long, in metres, is the cut? Give your answer to the nearest tenth.";}},
    {u:"m",scales:[2,3,4],max:45,fig:true,make:function(a,b){return "A rectangular tennis court measures "+u7trim(a)+" m by "+u7trim(b)+" m. How long, in metres, is a line drawn straight from one corner of the court to the opposite corner? Give your answer to the nearest tenth.";}},
    {u:"cm",scales:[2,3,4],max:70,fig:false,make:function(a,b){return "A picture frame is "+u7trim(a)+" cm wide and "+u7trim(b)+" cm tall. A wire runs diagonally across the back of the frame from one corner to the opposite corner. How long, in centimetres, is the wire? Give your answer to the nearest tenth.";}}
  ];
  var ctx=pick(CTX),t,k,a,b,hyp,tries=0;
  do{tries++;t=pick(U7_TRIPLES);k=pick(ctx.scales);a=t[0]*k;b=t[1]*k;hyp=t[2]*k;}while(hyp>ctx.max&&tries<200);
  if(pick([true,false])){var sw=a;a=b;b=sw;}
  var ans=u7r1(hyp);
  var q=numq(ctx.make(a,b),ans,0.06,
    "The diagonal is the hypotenuse of a right triangle whose legs are the two sides of the rectangle. By the Pythagorean theorem: \\[ \\begin{aligned} x^2 &= "+u7trim(a)+"^2 + "+u7trim(b)+"^2 \\\\ x^2 &= "+u7trim(a*a)+" + "+u7trim(b*b)+" \\\\ x^2 &= "+u7trim(hyp*hyp)+" \\\\ x &= "+u7trim(hyp)+" \\end{aligned} \\] The length is <b>\\("+u7trim(ans)+"\\) "+ctx.u+"</b>.",
    {a:a,b:b,hyp:hyp,ans:ans,unit:ctx.u});
  if(ctx.fig)q.figure=u7rectDiagSVG(a,b);
  return q;
});
E("u1-pk-leg-num", 1, ["7.2"], 1, "gen", function(){
  var t,k,hyp,known,ans,tries=0;
  do{tries++;t=pick(U7_TRIPLES);k=pick([0.5,1,1.5,2]);hyp=t[2]*k;}while(hyp>16&&tries<200);
  if(pick([true,false])){known=t[0]*k;ans=t[1]*k;}else{known=t[1]*k;ans=t[0]*k;}
  var ctx=pick([1,2,3]),prompt;
  if(ctx===1)prompt="A ladder "+u7trim(hyp)+" m long leans against a vertical wall. The top of the ladder touches the wall "+u7trim(known)+" m above the ground. How far, in metres, is the foot of the ladder from the wall? Give your answer to the nearest tenth.";
  else if(ctx===2)prompt="A staircase stringer "+u7trim(hyp)+" m long rises "+u7trim(known)+" m vertically from floor to landing. How long, in metres, is the horizontal run of the staircase? Give your answer to the nearest tenth.";
  else prompt="A loading ramp "+u7trim(hyp)+" m long rises to a dock "+u7trim(known)+" m above the ground. How far, in metres, does the foot of the ramp sit from the base of the dock? Give your answer to the nearest tenth.";
  var q=numq(prompt,ans,0.06,
    "The slanted member is the hypotenuse of a right triangle, and the vertical rise is one leg. Rearrange the Pythagorean theorem for the missing leg: \\[ \\begin{aligned} x^2 + "+u7trim(known)+"^2 &= "+u7trim(hyp)+"^2 \\\\ x^2 &= "+u7trim(hyp)+"^2 - "+u7trim(known)+"^2 \\\\ x^2 &= "+u7trim(ans*ans)+" \\\\ x &= "+u7trim(ans)+" \\end{aligned} \\] The distance is <b>\\("+u7trim(ans)+"\\) m</b>.",
    {ctx:ctx,hyp:hyp,known:known,ans:ans});
  q.figure=u7triSceneSVG({vert:known,ground:ans,slant:hyp,vertLabel:u7trim(known)+" m",groundLabel:"?",slantLabel:u7trim(hyp)+" m"});
  return q;
});
E("u1-pk-point-distance", 1, ["7.2"], 1, "gen", function(){
  var t=pick(U7_TRIPLES),k=pick([1,2,3]);
  var dx=t[0]*k, dy=t[1]*k, dist=t[2]*k;
  if(pick([true,false])){var sw2=dx;dx=dy;dy=sw2;}
  var x1=ri(0,6),y1=ri(0,6),x2=x1+dx,y2=y1+dy;
  var q=numq("Find the distance between the points ("+x1+", "+y1+") and ("+x2+", "+y2+"). Give your answer to the nearest tenth.",
    dist,0.06,
    "The horizontal difference between the points is "+dx+" and the vertical difference is "+dy+". These differences are the legs of a right triangle whose hypotenuse is the distance between the points: \\[ \\begin{aligned} d^2 &= "+dx+"^2 + "+dy+"^2 \\\\ d^2 &= "+(dx*dx)+" + "+(dy*dy)+" \\\\ d^2 &= "+(dist*dist)+" \\\\ d &= "+dist+" \\end{aligned} \\] The distance is <b>\\("+dist+"\\)</b>.",
    {x1:x1,y1:y1,x2:x2,y2:y2,dx:dx,dy:dy,dist:dist});
  return q;
});
E("u1-pk-right-check", 1, ["7.2"], 1, "var", varset([
  function(){return mcq("Which set of side lengths, in centimetres, forms a right triangle?",
    "6, 8, 10",
    ["6, 8, 11","5, 12, 14","4, 5, 6"],
    "A set of lengths forms a right triangle exactly when the square of the longest length equals the sum of the squares of the other two. For 6, 8, 10: \\(6^2 + 8^2 = 36 + 64 = 100 = 10^2\\), so <b>6, 8, 10</b> forms a right triangle. The others fail the check: \\(6^2 + 8^2 \\ne 11^2\\), \\(5^2 + 12^2 \\ne 14^2\\), and \\(4^2 + 5^2 \\ne 6^2\\).",{variant:1});},
  function(){return mcq("Which set of side lengths, in centimetres, forms a right triangle?",
    "9, 12, 15",
    ["9, 12, 14","8, 15, 18","7, 10, 12"],
    "A set of lengths forms a right triangle exactly when the square of the longest length equals the sum of the squares of the other two. For 9, 12, 15: \\(9^2 + 12^2 = 81 + 144 = 225 = 15^2\\), so <b>9, 12, 15</b> forms a right triangle. The others fail the check: \\(9^2 + 12^2 \\ne 14^2\\), \\(8^2 + 15^2 \\ne 18^2\\), and \\(7^2 + 10^2 \\ne 12^2\\).",{variant:2});},
  function(){return mcq("Which set of side lengths, in centimetres, forms a right triangle?",
    "5, 12, 13",
    ["5, 12, 12","6, 8, 9","10, 24, 25"],
    "A set of lengths forms a right triangle exactly when the square of the longest length equals the sum of the squares of the other two. For 5, 12, 13: \\(5^2 + 12^2 = 25 + 144 = 169 = 13^2\\), so <b>5, 12, 13</b> forms a right triangle. The others fail the check: \\(5^2 + 12^2 \\ne 12^2\\), \\(6^2 + 8^2 \\ne 9^2\\), and \\(10^2 + 24^2 \\ne 25^2\\).",{variant:3});},
  function(){return mcq("Which set of side lengths, in centimetres, forms a right triangle?",
    "8, 15, 17",
    ["8, 15, 16","12, 16, 21","9, 40, 42"],
    "A set of lengths forms a right triangle exactly when the square of the longest length equals the sum of the squares of the other two. For 8, 15, 17: \\(8^2 + 15^2 = 64 + 225 = 289 = 17^2\\), so <b>8, 15, 17</b> forms a right triangle. The others fail the check: \\(8^2 + 15^2 \\ne 16^2\\), \\(12^2 + 16^2 \\ne 21^2\\), and \\(9^2 + 40^2 \\ne 42^2\\).",{variant:4});}
]));
E("u1-pk-screen-size", 1, ["7.2"], 1, "gen", function(){
  var pr=pick([[12,9,15],[16,12,20],[20,15,25],[24,18,30],[32,24,40],[40,30,50],[48,36,60]]);
  var w=pr[0],h=pr[1],d=pr[2];
  var dev=pick(["television","computer monitor"]);
  var q=numq("A "+dev+" screen is "+w+" cm wide and "+h+" cm tall. Screens are sized by the length of their diagonal. What is the screen size, in centimetres?",
    d,0.06,
    "The diagonal is the hypotenuse of a right triangle with legs "+w+" cm and "+h+" cm. By the Pythagorean theorem: \\[ \\begin{aligned} x^2 &= "+w+"^2 + "+h+"^2 \\\\ x^2 &= "+(w*w)+" + "+(h*h)+" \\\\ x^2 &= "+(d*d)+" \\\\ x &= "+d+" \\end{aligned} \\] The screen size is <b>\\("+d+"\\) cm</b>.",
    {w:w,h:h,d:d,dev:dev});
  return q;
});
E("u1-pk-shortcut-saving", 1, ["7.2"], 1, "gen", function(){
  var t,k,a,b,hyp,tries=0;
  do{tries++;t=pick(U7_TRIPLES);k=pick([1,2,3]);a=t[0]*k;b=t[1]*k;hyp=t[2]*k;}while(hyp>80&&tries<200);
  var saving=a+b-hyp;
  var q=numq("A rectangular field is "+a+" m long and "+b+" m wide. Walking from one corner along two edges to the opposite corner covers "+(a+b)+" m. A straight path across the diagonal of the field is shorter. How many metres does the diagonal path save? Give your answer to the nearest tenth.",
    saving,0.06,
    "First find the diagonal with the Pythagorean theorem: \\[ \\begin{aligned} d^2 &= "+a+"^2 + "+b+"^2 \\\\ d^2 &= "+(hyp*hyp)+" \\\\ d &= "+hyp+" \\end{aligned} \\] The saving is the edge route minus the diagonal: \\("+(a+b)+" - "+hyp+" = "+u7trim(saving)+"\\) m. The diagonal path saves <b>\\("+u7trim(saving)+"\\) m</b>.",
    {a:a,b:b,hyp:hyp,saving:saving});
  q.figure=u7rectDiagSVG(a,b);
  return q;
});

/* ================= solve-triangle ================= */
E("u1-pk-solve-perimeter", 1, ["7.2"], 2, "gen", function(){
  var theta=pick(U7_ANGLES), H=ri(14,50);
  var bc=H*u7sinD(theta), ac=H*u7cosD(theta);
  var per=H+bc+ac, ans=u7r1(per);
  var q=numq("A right triangle ABC has the right angle at C. Angle A is \\("+theta+"^\\circ\\) and the hypotenuse AB is \\("+H+"\\) cm. Find the perimeter of the triangle, in centimetres, to the nearest tenth.",
    ans,0.16,
    "Find each leg from angle A and the hypotenuse. Side BC is opposite angle A: \\[ \\begin{aligned} BC &= "+H+" \\times \\sin "+theta+"^\\circ \\\\ &\\approx "+u7f1(bc)+" \\end{aligned} \\] Side AC is adjacent to angle A: \\[ \\begin{aligned} AC &= "+H+" \\times \\cos "+theta+"^\\circ \\\\ &\\approx "+u7f1(ac)+" \\end{aligned} \\] Add all three sides: \\("+H+" + "+u7f1(bc)+" + "+u7f1(ac)+" \\approx "+u7f1(ans)+"\\). The perimeter is <b>\\("+u7f1(ans)+"\\) cm</b>.",
    {theta:theta,H:H,bc:bc,ac:ac,ans:ans});
  q.figure=triRotSVG(bc,ac,H,{L:["A","B","C"],ang:[theta+"°",null,null],side:["?","?",H+" cm"],rot:pick([9,12,15,-10,-14])});
  return q;
});
E("u1-pk-solve-second-leg", 1, ["7.2"], 2, "gen", function(){
  var theta=pick(U7_ANGLES.filter(function(a){return a>=28&&a<=62;}));
  var G=ri(10,42);
  var hyp=G/u7sinD(theta), ac=G/u7tanD(theta), ans=u7r1(ac);
  var q=numq("A right triangle ABC has the right angle at C. Angle A is \\("+theta+"^\\circ\\) and side BC, opposite angle A, is \\("+G+"\\) cm. Find the length of side AC, in centimetres, to the nearest tenth.",
    ans,0.06,
    "First find the hypotenuse from the sine ratio, rearranged: \\[ \\begin{aligned} \\sin "+theta+"^\\circ &= "+FR(G,"AB")+" \\\\ AB &= "+FR(G,"\\sin "+theta+"^\\circ")+" \\\\ &\\approx "+u7f1(hyp)+" \\end{aligned} \\] Then use the cosine ratio at angle A with that hypotenuse: \\[ \\begin{aligned} AC &= AB \\times \\cos "+theta+"^\\circ \\\\ &\\approx "+u7f1(hyp)+" \\times \\cos "+theta+"^\\circ \\\\ &\\approx "+u7f1(ans)+" \\end{aligned} \\] The length of side AC is <b>\\("+u7f1(ans)+"\\) cm</b>.",
    {theta:theta,G:G,hyp:hyp,ans:ans});
  q.figure=triRotSVG(G,ac,hyp,{L:["A","B","C"],ang:[theta+"°",null,null],side:[G+" cm","?",null],rot:pick([9,12,15,-10,-14])});
  return q;
});
E("u1-pk-solve-isosceles", 1, ["7.2"], 2, "gen", function(){
  var mode=pick([1,2]),leg,hyp,ans,prompt,sol;
  if(mode===1){
    hyp=pick([14,18,20,24,28,30,36,40]);leg=hyp/Math.SQRT2;ans=u7r1(leg);
    prompt="An isosceles right triangle has a hypotenuse of "+hyp+" cm. Its two legs are equal in length. Find the length of one leg, in centimetres, to the nearest tenth.";
    sol="Call each leg \\(x\\). The Pythagorean theorem gives \\[ \\begin{aligned} x^2 + x^2 &= "+hyp+"^2 \\\\ 2x^2 &= "+(hyp*hyp)+" \\\\ x^2 &= "+u7trim(hyp*hyp/2)+" \\\\ x &= \\frac{"+hyp+"}{\\sqrt{2}} \\\\ &\\approx "+u7f1(ans)+" \\end{aligned} \\] The length of one leg is <b>\\("+u7f1(ans)+"\\) cm</b>.";
  }else{
    leg=pick([6,8,10,12,14,16,18,20]);hyp=leg*Math.SQRT2;ans=u7r1(hyp);
    prompt="An isosceles right triangle has legs of "+leg+" cm each. Find the length of the hypotenuse, in centimetres, to the nearest tenth.";
    sol="The two legs are equal, so the Pythagorean theorem gives \\[ \\begin{aligned} x^2 &= "+leg+"^2 + "+leg+"^2 \\\\ x^2 &= "+(2*leg*leg)+" \\\\ x &= "+leg+"\\sqrt{2} \\\\ &\\approx "+u7f1(ans)+" \\end{aligned} \\] The length of the hypotenuse is <b>\\("+u7f1(ans)+"\\) cm</b>.";
  }
  var sLab=(mode===1)?["?",null,hyp+" cm"]:[leg+" cm",null,"?"];
  var q=numq(prompt,ans,0.06,sol,{mode:mode,leg:leg,hyp:hyp,ans:ans});
  q.figure=triRotSVG(leg,leg,hyp,{L:["A","B","C"],ang:["45°","45°",null],side:sLab,rot:pick([9,12,15,-10,-14])});
  return q;
});
E("u1-pk-solve-scene", 1, ["7.2"], 2, "var", varset([
  function(){
    var s=12,theta=40;
    var height=s*u7tanD(theta), key=s/u7cosD(theta);
    var q=mcq("A flagpole stands on level ground. Its shadow is "+s+" m long, and the sun's angle of elevation is "+theta+"°. A straight line runs from the top of the flagpole to the far end of the shadow. How long is that line, in metres, to the nearest tenth?",
      u7f1(key)+" m",
      [u7f1(height)+" m",u7f1(s/u7sinD(theta))+" m",u7f1(s*u7tanD(90-theta))+" m"],
      "Two steps. First the height of the pole, from the tangent ratio with the shadow: \\[ \\begin{aligned} h &= "+s+" \\times \\tan "+theta+"^\\circ \\\\ &\\approx "+u7f1(height)+" \\end{aligned} \\] The line from the top of the pole to the end of the shadow is the hypotenuse, and the cosine ratio at the ground uses the shadow as the adjacent side: \\[ \\begin{aligned} L &= "+FR(s,"\\cos "+theta+"^\\circ")+" \\\\ &\\approx "+u7f1(key)+" \\end{aligned} \\] The line is <b>\\("+u7f1(key)+"\\) m</b> long. (Stopping after the first step gives the height, "+u7f1(height)+" m, not the line.)",
      {variant:1,s:s,theta:theta,height:height,ans:u7r1(key)});
    q.figure=u7triSceneSVG({vert:height,ground:s,slant:key,vertLabel:"?",groundLabel:s+" m",slantLabel:"?",angle:theta+"°"});
    return q;
  },
  function(){
    var h=1.2,theta=25;
    var L=h/u7sinD(theta), run=L*u7cosD(theta);
    var q=mcq("A loading ramp rises to a dock "+u7trim(h)+" m above level ground. The ramp runs in a straight line and makes an angle of "+theta+"° with the ground. How far, in metres, is the foot of the ramp from the base of the dock, to the nearest tenth?",
      u7f1(run)+" m",
      [u7f1(L)+" m",u7f1(h)+" m",u7f1(h/u7tanD(90-theta))+" m"],
      "Two steps. First the length of the ramp, from the sine ratio with the rise, rearranged: \\[ \\begin{aligned} L &= "+FR(u7trim(h),"\\sin "+theta+"^\\circ")+" \\\\ &\\approx "+u7f1(L)+" \\end{aligned} \\] Then the horizontal distance, from the cosine ratio with that length: \\[ \\begin{aligned} \\text{distance} &= "+u7f1(L)+" \\times \\cos "+theta+"^\\circ \\\\ &\\approx "+u7f1(run)+" \\end{aligned} \\] The foot of the ramp is <b>\\("+u7f1(run)+"\\) m</b> from the base of the dock. (Stopping after the first step gives the ramp's length, "+u7f1(L)+" m.)",
      {variant:2,h:h,theta:theta,L:L,ans:u7r1(run)});
    q.figure=u7triSceneSVG({vert:h,ground:run,slant:L,vertLabel:u7trim(h)+" m",groundLabel:"?",slantLabel:"?",angle:theta+"°"});
    return q;
  },
  function(){
    var d=20,theta=55;
    var height=d*u7tanD(theta), key=d/u7cosD(theta);
    var q=mcq("A kite is flying on a taut string that makes an angle of "+theta+"° with level ground. The kite is directly above a marker on the ground, "+d+" m horizontally from the flyer. How long is the string, in metres, to the nearest tenth?",
      u7f1(key)+" m",
      [u7f1(height)+" m",u7f1(d/u7sinD(theta))+" m",u7f1(d*u7tanD(90-theta))+" m"],
      "Two steps. First the height of the kite, from the tangent ratio with the horizontal distance: \\[ \\begin{aligned} h &= "+d+" \\times \\tan "+theta+"^\\circ \\\\ &\\approx "+u7f1(height)+" \\end{aligned} \\] The string is the hypotenuse, and the cosine ratio at the flyer uses the horizontal distance as the adjacent side: \\[ \\begin{aligned} L &= "+FR(d,"\\cos "+theta+"^\\circ")+" \\\\ &\\approx "+u7f1(key)+" \\end{aligned} \\] The string is <b>\\("+u7f1(key)+"\\) m</b> long. (Stopping after the first step gives the height, "+u7f1(height)+" m, not the string.)",
      {variant:3,d:d,theta:theta,height:height,ans:u7r1(key)});
    q.figure=u7triSceneSVG({vert:height,ground:d,slant:key,vertLabel:"?",groundLabel:d+" m",slantLabel:"?",angle:theta+"°",dashedVert:true});
    return q;
  },
  function(){
    var h=6,theta=70;
    var L=h/u7sinD(theta), foot=h/u7tanD(theta);
    var q=mcq("A ladder leans against a vertical wall so that its top reaches a window "+h+" m above level ground. The ladder makes an angle of "+theta+"° with the ground. How far, in metres, is the foot of the ladder from the wall, to the nearest tenth?",
      u7f1(foot)+" m",
      [u7f1(L)+" m",u7f1(h*u7tanD(theta))+" m",u7f1(L*u7cosD(90-theta))+" m"],
      "Two steps. First the length of the ladder, from the sine ratio with the height it reaches, rearranged: \\[ \\begin{aligned} L &= "+FR(h,"\\sin "+theta+"^\\circ")+" \\\\ &\\approx "+u7f1(L)+" \\end{aligned} \\] Then the distance of the foot from the wall, from the cosine ratio with that length: \\[ \\begin{aligned} \\text{distance} &= "+u7f1(L)+" \\times \\cos "+theta+"^\\circ \\\\ &\\approx "+u7f1(foot)+" \\end{aligned} \\] The foot of the ladder is <b>\\("+u7f1(foot)+"\\) m</b> from the wall. (Stopping after the first step gives the ladder's length, "+u7f1(L)+" m.)",
      {variant:4,h:h,theta:theta,L:L,ans:u7r1(foot)});
    q.figure=u7triSceneSVG({vert:h,ground:foot,slant:L,vertLabel:h+" m",groundLabel:"?",slantLabel:"?",angle:theta+"°"});
    return q;
  }
]));

/* ================= trig-context ================= */
E("u1-pk-elevation-height", 1, ["7.2"], 2, "gen", function(){
  var st=pick([{n:"building",art:"a building"},{n:"tree",art:"a tree"},{n:"cliff",art:"a cliff"},{n:"communications tower",art:"a communications tower"}]);
  var dist=ri(15,60), theta=pick(U7_ANGLES);
  var height=dist*u7tanD(theta), ans=u7r1(height);
  var q=textq("From a point on level ground "+dist+" m from the base of "+st.art+", the angle of elevation to the top of the "+st.n+" is "+theta+"°. Find the height of the "+st.n+", in metres, to the nearest tenth.",
    u7ans1(ans),
    "The height is opposite the angle of elevation and the ground distance is adjacent, so use the tangent ratio: \\[ \\begin{aligned} \\tan "+theta+"^\\circ &= "+FR("h",dist)+" \\\\ h &= "+dist+" \\times \\tan "+theta+"^\\circ \\\\ &\\approx "+u7f1(ans)+" \\end{aligned} \\] The height of the "+st.n+" is <b>\\("+u7f1(ans)+"\\) m</b>.",
    {structure:st.n,dist:dist,theta:theta,ans:ans});
  q.figure=u7triSceneSVG({vert:height,ground:dist,slant:dist/u7cosD(theta),vertLabel:"?",groundLabel:dist+" m",angle:theta+"°"});
  return q;
});
E("u1-pk-depression-distance", 1, ["7.2"], 2, "gen", function(){
  var ctx=pick([1,2,3]),h,theta=pick([25,30,35,40,45,50,55]),prompt,place;
  if(ctx===1){h=ri(8,25);place="balcony";
    prompt="From a balcony "+h+" m above level ground, the angle of depression to a car parked on the street below is "+theta+"°. How far, in metres, is the car from the base of the building? Give your answer to the nearest tenth.";}
  else if(ctx===2){h=ri(25,70);place="cliff";
    prompt="From the top of a cliff "+h+" m above the sea, the angle of depression to a boat on the water is "+theta+"°. How far, in metres, is the boat from the base of the cliff? Give your answer to the nearest tenth.";}
  else{h=ri(15,45);place="lighthouse";
    prompt="From the deck of a lighthouse "+h+" m above the water, the angle of depression to a buoy is "+theta+"°. How far, in metres, is the buoy from the base of the lighthouse? Give your answer to the nearest tenth.";}
  var dist=h/u7tanD(theta), ans=u7r1(dist);
  var q=textq(prompt,u7ans1(ans),
    "The angle of depression from the top equals the angle of elevation from the object, because the horizontal lines are parallel (alternate interior angles). In the triangle, the height is opposite that angle and the distance from the base is adjacent: \\[ \\begin{aligned} \\tan "+theta+"^\\circ &= "+FR(h,"d")+" \\\\ d &= "+FR(h,"\\tan "+theta+"^\\circ")+" \\\\ &\\approx "+u7f1(ans)+" \\end{aligned} \\] The distance is <b>\\("+u7f1(ans)+"\\) m</b>.",
    {ctx:ctx,place:place,h:h,theta:theta,ans:ans});
  q.figure=u7triSceneSVG({vert:h,ground:dist,slant:h/u7sinD(theta),vertLabel:h+" m",groundLabel:"?",angle:theta+"°"});
  return q;
});
E("u1-pk-shadow-angle", 1, ["7.2"], 2, "gen", function(){
  var h,s,raw,tries=0;
  do{tries++;h=ri(3,12);s=ri(3,16);raw=u7atanD(h/s);}while((raw<25||raw>70)&&tries<100);
  var ang=Math.round(raw);
  var q=textq("A vertical pole "+h+" m tall casts a shadow "+s+" m long on level ground. Find the sun's angle of elevation, in degrees, to the nearest degree.",
    [""+ang,ang+"°",ang+" degrees"],
    "The pole is opposite the sun's angle of elevation and the shadow is adjacent, so use the tangent ratio and undo it with the inverse tangent: \\[ \\begin{aligned} \\tan \\theta &= "+FR(h,s)+" \\\\ \\theta &= \\tan^{-1}\\left("+FR(h,s)+"\\right) \\\\ &\\approx "+ang+"^\\circ \\end{aligned} \\] The sun's angle of elevation is <b>\\("+ang+"^\\circ\\)</b>.",
    {h:h,s:s,ang:ang});
  q.figure=u7triSceneSVG({vert:h,ground:s,slant:Math.sqrt(h*h+s*s),vertLabel:h+" m",groundLabel:s+" m",angle:"?"});
  return q;
});
E("u1-pk-ramp-length", 1, ["7.2"], 2, "gen", function(){
  var h=pick([0.9,1.2,1.5,1.8,2.4,3.0]), theta=pick([25,28,30,32,35,38]);
  var L=h/u7sinD(theta), ans=u7r1(L);
  var q=textq("A ramp rises "+u7trim(h)+" m above level ground and makes an angle of "+theta+"° with the ground. Find the length of the ramp, in metres, to the nearest tenth.",
    u7ans1(ans),
    "The rise is opposite the ramp's angle and the ramp itself is the hypotenuse, so use the sine ratio and rearrange: \\[ \\begin{aligned} \\sin "+theta+"^\\circ &= "+FR(u7trim(h),"L")+" \\\\ L &= "+FR(u7trim(h),"\\sin "+theta+"^\\circ")+" \\\\ &\\approx "+u7f1(ans)+" \\end{aligned} \\] The length of the ramp is <b>\\("+u7f1(ans)+"\\) m</b>.",
    {h:h,theta:theta,ans:ans});
  q.figure=u7triSceneSVG({vert:h,ground:L*u7cosD(theta),slant:L,vertLabel:u7trim(h)+" m",slantLabel:"?",angle:theta+"°"});
  return q;
});
E("u1-pk-ladder-reach", 1, ["7.2"], 2, "gen", function(){
  var L=ri(4,12), theta=pick([50,55,58,60,62,65,68,70]);
  var height=L*u7sinD(theta), ans=u7r1(height);
  var q=textq("A ladder "+L+" m long leans against a vertical wall, making an angle of "+theta+"° with the level ground. How high, in metres, up the wall does the ladder reach? Give your answer to the nearest tenth.",
    u7ans1(ans),
    "The height reached is opposite the angle at the ground and the ladder is the hypotenuse, so use the sine ratio: \\[ \\begin{aligned} \\sin "+theta+"^\\circ &= "+FR("h",L)+" \\\\ h &= "+L+" \\times \\sin "+theta+"^\\circ \\\\ &\\approx "+u7f1(ans)+" \\end{aligned} \\] The ladder reaches <b>\\("+u7f1(ans)+"\\) m</b> up the wall.",
    {L:L,theta:theta,ans:ans});
  q.figure=u7triSceneSVG({vert:height,ground:L*u7cosD(theta),slant:L,vertLabel:"?",slantLabel:L+" m",angle:theta+"°"});
  return q;
});
E("u1-pk-wire-length", 1, ["7.2"], 2, "gen", function(){
  var h=ri(5,14), theta=pick([35,38,40,42,45,48,50,55,60]);
  var wire=h/u7sinD(theta), ans=u7r1(wire);
  var q=textq("A guy wire is attached to a pole "+h+" m above level ground and runs to an anchor in the ground, where it makes an angle of "+theta+"° with the ground. Find the length of the wire, in metres, to the nearest tenth.",
    u7ans1(ans),
    "The attachment height is opposite the angle at the anchor and the wire is the hypotenuse, so use the sine ratio and rearrange: \\[ \\begin{aligned} \\sin "+theta+"^\\circ &= "+FR(h,"L")+" \\\\ L &= "+FR(h,"\\sin "+theta+"^\\circ")+" \\\\ &\\approx "+u7f1(ans)+" \\end{aligned} \\] The length of the wire is <b>\\("+u7f1(ans)+"\\) m</b>.",
    {h:h,theta:theta,ans:ans});
  q.figure=u7triSceneSVG({vert:h,ground:h/u7tanD(theta),slant:wire,vertLabel:h+" m",slantLabel:"?",angle:theta+"°"});
  return q;
});
E("u1-pk-tree-distance", 1, ["7.2"], 2, "gen", function(){
  var h=ri(8,24), theta=pick([28,30,32,35,38,40,42,45,48,50]);
  var dist=h/u7tanD(theta), ans=u7r1(dist);
  var q=textq("A tree is "+h+" m tall. From a point on level ground, the angle of elevation to the top of the tree is "+theta+"°. How far, in metres, is the point from the base of the tree? Give your answer to the nearest tenth.",
    u7ans1(ans),
    "The height of the tree is opposite the angle of elevation and the distance from the base is adjacent, so use the tangent ratio and rearrange: \\[ \\begin{aligned} \\tan "+theta+"^\\circ &= "+FR(h,"d")+" \\\\ d &= "+FR(h,"\\tan "+theta+"^\\circ")+" \\\\ &\\approx "+u7f1(ans)+" \\end{aligned} \\] The point is <b>\\("+u7f1(ans)+"\\) m</b> from the base of the tree.",
    {h:h,theta:theta,ans:ans});
  q.figure=u7triSceneSVG({vert:h,ground:dist,slant:h/u7sinD(theta),vertLabel:h+" m",groundLabel:"?",angle:theta+"°"});
  return q;
});
E("u1-pk-slide-angle", 1, ["7.2"], 2, "gen", function(){
  var t,k,hLeg,hyp,ang,tries=0;
  do{
    tries++;
    t=pick(U7_TRIPLES);k=pick([0.5,1,1.5]);
    hLeg=pick([t[0],t[1]])*k;hyp=t[2]*k;
    ang=Math.round(u7asinD(hLeg/hyp));
  }while((ang<20||ang>65)&&tries<120);
  var ground=Math.sqrt(hyp*hyp-hLeg*hLeg);
  var q=textq("A playground slide is "+u7trim(hyp)+" m long, and the top of the slide is "+u7trim(hLeg)+" m above level ground. Find the angle the slide makes with the ground, in degrees, to the nearest degree.",
    [""+ang,ang+"°",ang+" degrees"],
    "The height of the slide is opposite the angle at the ground and the slide itself is the hypotenuse, so use the sine ratio and undo it with the inverse sine: \\[ \\begin{aligned} \\sin \\theta &= "+FR(u7trim(hLeg),u7trim(hyp))+" \\\\ \\theta &= \\sin^{-1}\\left("+FR(u7trim(hLeg),u7trim(hyp))+"\\right) \\\\ &\\approx "+ang+"^\\circ \\end{aligned} \\] The slide makes an angle of <b>\\("+ang+"^\\circ\\)</b> with the ground.",
    {hLeg:hLeg,hyp:hyp,ang:ang});
  q.figure=u7triSceneSVG({vert:hLeg,ground:ground,slant:hyp,vertLabel:u7trim(hLeg)+" m",slantLabel:u7trim(hyp)+" m",angle:"?"});
  return q;
});
// Math 2201 Unit 1 sequence rebuild batch D (November 17, 2026):
// phase enrichment for the StudyMate sequence split. Splitting the old
// Indicator 7.2 set at the teaching joints (sine law set, then cosine
// law set) pushed the sine and cosine phase draws past the composer's
// 80 percent depth cap, so this batch adds 3 sine-law, 5 cosine-law and
// 2 either-law entries in the standing style. Diagram entries are
// slanted via triRotSVG per Jason's November 17, 2026 orientation rule.
// CRMARKS: u1-sine-side-diagram=2
// CRMARKS: u1-sine-supplement-side=2
// CRMARKS: u1-cosine-side-diagram=2
// CRMARKS: u1-cosine-angle-diagram=2
// CRMARKS: u1-cosine-largest-angle=2
// CRMARKS: u1-cosine-bridge-span=2
E("u1-sine-side-diagram",1,["7.2"],1,"gen",function(){
  var A=pick([45,50,55,60]),B=pick([48,55,62,70]);var C=180-A-B;var c=ri(15,32);
  var a=c*Math.sin(A*Math.PI/180)/Math.sin(C*Math.PI/180);
  var b=c*Math.sin(B*Math.PI/180)/Math.sin(C*Math.PI/180);
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("The diagram shows \\(\\triangle ABC\\) with \\(\\angle A = "+A+"^\\circ\\) and \\(\\angle B = "+B+"^\\circ\\) marked, and the side between them, \\(c = "+c+"\\text{ m}\\), marked. Side \\(a\\) is marked ?. Find side \\(a\\), to one decimal place, in m.",
    Math.round(a*10)/10,0.06,
    "The marked side sits between the two marked angles, so first get the third angle from the angle sum: \\(\\angle C = 180^\\circ - "+A+"^\\circ - "+B+"^\\circ = "+C+"^\\circ\\). Side \\(c\\) is opposite \\(\\angle C\\), a complete pair, so the sine law gives side \\(a\\): \\(\\frac{a}{\\sin "+A+"^\\circ} = \\frac{"+c+"}{\\sin "+C+"^\\circ}\\), so \\(a = \\frac{"+c+" \\sin "+A+"^\\circ}{\\sin "+C+"^\\circ} \\approx \\)<b>\\("+fmt(a,1)+"\\text{ m}\\)</b>.",
    {A:A,B:B,C:C,c:c,rot:rot});
  q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:[A+"°",B+"°",null],side:["?",null,c+" m"],rot:rot});
  return q;
});
E("u1-sine-angle-mc",1,["7.2"],2,"gen",function(){
  var tri=pick([{n:"DEF",u:"m"},{n:"ABC",u:"cm"},{n:"PQR",u:"km"}]);
  var A=pick([30,35,40,45,50,55]),a=pick([9,10,11,12,13,14,15,16]);
  var bts=[55,60,65,70,75,80].filter(function(x){return x>A+15&&A+x<172;});
  var Btar=pick(bts);
  var bTrue=a*Math.sin(Btar*Math.PI/180)/Math.sin(A*Math.PI/180);
  var b=Math.round(bTrue*10)/10;
  var Brev=Math.asin(b*Math.sin(A*Math.PI/180)/a)*180/Math.PI;
  var sup=180-Math.round(Brev);
  var flip=Math.round(Math.asin(a*Math.sin(A*Math.PI/180)/bTrue)*180/Math.PI);
  var L1=tri.n.charAt(0),L2=tri.n.charAt(1),l1=L1.toLowerCase(),l2=L2.toLowerCase();
  return mcq("In \\(\\triangle "+tri.n+"\\), \\(\\angle "+L1+" = "+A+"^\\circ\\), side \\("+l1+" = "+a+"\\text{ "+tri.u+"}\\) (opposite \\(\\angle "+L1+"\\)) and side \\("+l2+" = "+fmt(b,1)+"\\text{ "+tri.u+"}\\). What is \\(\\angle "+L2+"\\), to the nearest degree?",
    Math.round(Brev)+"°",[sup+"°",flip+"°",A+"°"],
    "Side \\("+l1+"\\) and \\(\\angle "+L1+"\\) form a complete pair, so the sine law applies: \\(\\frac{\\sin "+L2+"}{"+fmt(b,1)+"} = \\frac{\\sin "+A+"^\\circ}{"+a+"}\\), giving \\(\\sin "+L2+" = \\frac{"+fmt(b,1)+" \\sin "+A+"^\\circ}{"+a+"} \\approx "+fmt(Math.sin(Brev*Math.PI/180),3)+"\\). Undoing with the inverse sine, \\(\\angle "+L2+" \\approx \\)<b>\\("+Math.round(Brev)+"^\\circ\\)</b>.",
    {A:A,a:a,b:b,Brev:Brev});
});
E("u1-sine-supplement-side",1,["7.2"],2,"gen",function(){
  var A=0,E=0,s=0,PR=0,tries=0,ok=false;
  while(!ok&&tries<200){tries++;
    A=ri(30,48);E=ri(105,128);s=ri(40,90);
    var Qint=180-E,R=E-A;
    PR=s*Math.sin(Qint*Math.PI/180)/Math.sin(R*Math.PI/180);
    ok=R>=50&&R<=88&&isFinite(PR);
  }
  var Qint=180-E,R=E-A;
  return numq("A straight canal path runs past a mooring buoy. Two markers, P and Q, stand on the path \\("+s+"\\text{ m}\\) apart, with Q further along the path than P. From P, the angle between the path and the line of sight to the buoy is \\("+A+"^\\circ\\). From Q, the angle between the path continued straight ahead, past Q, and the line of sight to the buoy is \\("+E+"^\\circ\\). Find the distance from P to the buoy, to one decimal place, in m.",
    Math.round(PR*10)/10,0.06,
    "The sight lines and the path form one triangle. At Q the path is a straight line, so the angle inside the triangle is supplementary to the marked one: \\(180^\\circ - "+E+"^\\circ = "+Qint+"^\\circ\\). The angle at the buoy is then \\(180^\\circ - "+A+"^\\circ - "+Qint+"^\\circ = "+R+"^\\circ\\). The marked path length \\("+s+"\\text{ m}\\) is opposite the buoy angle, a complete pair, so the sine law gives the distance from P: \\(\\frac{PR}{\\sin "+Qint+"^\\circ} = \\frac{"+s+"}{\\sin "+R+"^\\circ}\\), so \\(PR = \\frac{"+s+" \\sin "+Qint+"^\\circ}{\\sin "+R+"^\\circ} \\approx \\)<b>\\("+fmt(PR,1)+"\\text{ m}\\)</b>.",
    {A:A,E:E,s:s,Qint:Qint,R:R});
});
E("u1-cosine-side-diagram",1,["7.2"],1,"gen",function(){
  var A=pick([52,58,64,71,78]);var b=ri(9,18),c=ri(9,18);
  var a=Math.sqrt(b*b+c*c-2*b*c*Math.cos(A*Math.PI/180));
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("The diagram shows \\(\\triangle ABC\\) with sides \\(b = "+b+"\\text{ m}\\) and \\(c = "+c+"\\text{ m}\\) marked and the angle between them, \\(\\angle A = "+A+"^\\circ\\), marked. Side \\(a\\), opposite \\(\\angle A\\), is marked ?. Find side \\(a\\), to one decimal place, in m.",
    Math.round(a*10)/10,0.06,
    "The unknown side sits opposite the marked angle, and the two marked sides form that angle, so the cosine law applies: \\(a^2 = b^2 + c^2 - 2bc \\cos A = "+(b*b)+" + "+(c*c)+" - 2("+b+")("+c+") \\cos "+A+"^\\circ \\approx "+fmt(a*a,1)+"\\). Taking the square root, \\(a \\approx \\)<b>\\("+fmt(a,1)+"\\text{ m}\\)</b>.",
    {A:A,b:b,c:c,rot:rot});
  q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:[A+"°",null,null],side:["?",b+" m",c+" m"],rot:rot});
  return q;
});
E("u1-cosine-angle-diagram",1,["7.2"],2,"gen",function(){
  var Atar=pick([48,56,64,72]);var b=ri(7,13),c=ri(7,13);
  var aTrue=Math.sqrt(b*b+c*c-2*b*c*Math.cos(Atar*Math.PI/180));
  var a=Math.round(aTrue*10)/10;
  var cosA=(b*b+c*c-a*a)/(2*b*c);var Arev=Math.round(Math.acos(cosA)*180/Math.PI);
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("The diagram shows \\(\\triangle ABC\\) with all three sides marked: \\(a = "+fmt(a,1)+"\\text{ m}\\), \\(b = "+b+"\\text{ m}\\) and \\(c = "+c+"\\text{ m}\\). The angle opposite side \\(a\\) is marked ?. Find that angle, to the nearest degree.",
    Arev,1.1,
    "All three sides are known and the angle sits opposite side \\(a\\), so use the cosine law rearranged: \\(\\cos A = \\frac{b^2 + c^2 - a^2}{2bc} = \\frac{"+(b*b)+" + "+(c*c)+" - "+fmt(a*a,2)+"}{"+(2*b*c)+"} \\approx "+fmt(cosA,4)+"\\). So the marked angle is \\(A \\approx \\)<b>\\("+Arev+"^\\circ\\)</b>.",
    {b:b,c:c,Arev:Arev,a:a,rot:rot});
  q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:["?",null,null],side:[fmt(a,1)+" m",b+" m",c+" m"],rot:rot});
  return q;
});
E("u1-cosine-largest-angle",1,["7.2"],2,"gen",function(){
  var x=0,y=0,z=0,Z=0,tries=0,ok=false;
  while(!ok&&tries<300){tries++;
    x=ri(7,12);y=ri(8,14);z=Math.max(x,y)+ri(2,5);
    Z=Math.acos((x*x+y*y-z*z)/(2*x*y))*180/Math.PI;
    ok=z<x+y&&isFinite(Z)&&Z>=58&&Z<=112;
  }
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("A triangular garden plot has sides of \\("+x+"\\text{ m}\\), \\("+y+"\\text{ m}\\) and \\("+z+"\\text{ m}\\). Find the largest angle of the plot, to the nearest degree.",
    Math.round(Z),1.1,
    "The largest angle of a triangle sits opposite its longest side, here the \\("+z+"\\text{ m}\\) side. With all three sides known, the cosine law rearranged gives that angle: \\(\\cos Z = \\frac{"+(x*x)+" + "+(y*y)+" - "+(z*z)+"}{2("+x+")("+y+")} = \\frac{"+(x*x+y*y-z*z)+"}{"+(2*x*y)+"} \\approx "+fmt(Math.cos(Z*Math.PI/180),4)+"\\), so \\(Z \\approx \\)<b>\\("+Math.round(Z)+"^\\circ\\)</b>.",
    {x:x,y:y,z:z,rot:rot});
  q.figure=triRotSVG(z,x,y,{L:["A","B","C"],ang:[null,null,null],side:[z+" m",x+" m",y+" m"],rot:rot});
  return q;
});
E("u1-cosine-bridge-span",1,["7.2"],1,"gen",function(){
  var T=pick([64,72,80,88]);var u=ri(18,30),v=ri(22,34);
  var span=Math.sqrt(u*u+v*v-2*u*v*Math.cos(T*Math.PI/180));
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("Two cables run from the top of a bridge tower down to two anchors on the deck. One cable is \\("+u+"\\text{ m}\\) long and the other is \\("+v+"\\text{ m}\\) long, and the angle between the cables at the top of the tower is \\("+T+"^\\circ\\). How far apart are the two anchors, to one decimal place, in m?",
    Math.round(span*10)/10,0.06,
    "The two cables and the deck segment between the anchors form a triangle, and the anchor distance sits opposite the marked angle between the cables, so the cosine law applies: \\(d^2 = "+u+"^2 + "+v+"^2 - 2("+u+")("+v+") \\cos "+T+"^\\circ = "+(u*u)+" + "+(v*v)+" - "+(2*u*v)+" \\cos "+T+"^\\circ \\approx "+fmt(span*span,1)+"\\). Taking the square root, the anchors are <b>\\("+fmt(span,1)+"\\text{ m}\\)</b> apart.",
    {T:T,u:u,v:v,rot:rot});
  q.figure=triRotSVG(span,v,u,{L:["T","P","Q"],ang:[T+"°",null,null],side:["?",v+" m",u+" m"],rot:rot});
  return q;
});
E("u1-cosine-side-mc",1,["7.2"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var s1=0,s2=0,th=0,key=0,d1=0,d2=0,d3=0,tries=0,ok=false;
  while(!ok&&tries<400){tries++;
    s1=pick([2.4,3.0,3.6,4.2,4.8,5.4]);s2=pick([2.4,3.0,3.6,4.2,4.8,5.4]);th=ri(55,105);
    key=Math.sqrt(s1*s1+s2*s2-2*s1*s2*Math.cos(rd(th)));
    d1=Math.sqrt(s1*s1+s2*s2+2*s1*s2*Math.cos(rd(th)));
    d2=Math.sqrt(s1*s1+s2*s2-2*s1*s2*Math.sin(rd(th)));
    d3=key*key;
    var os=[fmt(key,1),fmt(d1,1),fmt(d2,1),fmt(d3,1)];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  return mcq("A triangular shade sail has two edges of "+fmt(s1,1)+" m and "+fmt(s2,1)+" m that meet at a corner with an angle of \\("+th+"^\\circ\\) between them. How long is the third edge, opposite that corner, in m?",
    fmt(key,1),[fmt(d1,1),fmt(d2,1),fmt(d3,1)],
    "The third edge sits opposite the angle between the two known edges, so the cosine law applies: \\(d^2 = "+fmt(s1,1)+"^2 + "+fmt(s2,1)+"^2 - 2("+fmt(s1,1)+")("+fmt(s2,1)+") \\cos "+th+"^\\circ \\approx "+fmt(key*key,1)+"\\). Taking the square root, the third edge is <b>\\("+fmt(key,1)+"\\text{ m}\\)</b>. (Adding the cosine term instead of subtracting it is a sign error, and using sine in place of cosine does not fit the angle between the sides.)",
    {s1:s1,s2:s2,th:th});
});
E("u1-diagram-law-pair",1,["7.1","7.2"],1,"var",varset([
  function(){var A=52,B=68,C=180-A-B,c=21;
    var a=c*Math.sin(A*Math.PI/180)/Math.sin(C*Math.PI/180),b=c*Math.sin(B*Math.PI/180)/Math.sin(C*Math.PI/180);
    var q=mcq("The diagram marks two angles, \\(52^\\circ\\) and \\(68^\\circ\\), and the \\(21\\text{ m}\\) side between them, with another side marked ?. Which statement about finding the ? side is correct?",
      "Use the sine law: the angle sum gives the third angle, and the marked side then pairs with the angle opposite it",
      ["Use the cosine law: two sides and the angle between them are marked, so the ? side follows in one step",
       "Use the sine law with the two marked angles alone: no third angle and no marked side are needed",
       "Neither law can find it: a second side length must be marked before any law can start"],
      "The third angle is \\(180^\\circ - 52^\\circ - 68^\\circ = 60^\\circ\\), and the \\(21\\text{ m}\\) side sits opposite it: a complete pair. The sine law then finds the ? side. Only one side is marked, so the cosine law has no starting point. The correct statement is: <b>use the sine law, once the angle sum completes the pair</b>.",
      {});
    q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:["52°","68°",null],side:["?",null,"21 m"],rot:12});
    return q;},
  function(){var A=59,b=13,c=10;
    var a=Math.sqrt(b*b+c*c-2*b*c*Math.cos(A*Math.PI/180));
    var q=mcq("The diagram marks sides of \\(13\\text{ m}\\) and \\(10\\text{ m}\\) and the \\(59^\\circ\\) angle between them, with the side opposite that angle marked ?. Which statement about finding the ? side is correct?",
      "Use the cosine law: the marked angle sits between the two marked sides, and the ? side is opposite it",
      ["Use the sine law: a marked side pairs with the angle opposite it, so the ? side follows from the proportion",
       "Use the sine law after the cosine law: the ? side must be found before either law can start",
       "Neither law can find it: the marked angle would have to sit opposite a marked side"],
      "No marked side sits opposite a marked angle, so the sine law has no complete pair to start from. The marked angle is contained by the two marked sides, which is exactly the cosine law's input, and the ? side is the side it produces. The correct statement is: <b>use the cosine law</b>.",
      {});
    q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:["59°",null,null],side:["?", "13 m","10 m"],rot:-10});
    return q;},
  function(){var a=16,b=13,c=10;
    var q=mcq("The diagram marks all three sides of a triangle, \\(16\\text{ m}\\), \\(13\\text{ m}\\) and \\(10\\text{ m}\\), with the angle opposite the \\(16\\text{ m}\\) side marked ?. Which statement about finding the ? angle is correct?",
      "Use the cosine law rearranged: with all three sides known, it solves directly for the marked angle",
      ["Use the sine law: a marked side pairs with its opposite angle, so the proportion gives the ? angle",
       "Use the angle sum alone: the other two angles come from the marked sides first",
       "Neither law can find it: at least one angle must be marked before any law can start"],
      "The sine law needs a side paired with its opposite angle, and no angle is marked at all. The cosine law rearranged, \\(\\cos A = \\frac{b^2 + c^2 - a^2}{2bc}\\), takes the three marked sides and returns the angle opposite the \\(16\\text{ m}\\) side. The correct statement is: <b>use the cosine law rearranged</b>.",
      {});
    q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:["?",null,null],side:["16 m","13 m","10 m"],rot:15});
    return q;}
]));
E("u1-diagram-missing-mark",1,["7.1","7.2"],2,"var",varset([
  function(){var A=47,B=59,C=180-A-B,c=20;
    var a=c*Math.sin(A*Math.PI/180)/Math.sin(C*Math.PI/180),b=c*Math.sin(B*Math.PI/180)/Math.sin(C*Math.PI/180);
    var q=mcq("The diagram marks two angles of a triangle, \\(47^\\circ\\) and \\(59^\\circ\\), but no side length, and marks the side between the two marked angles with ?. Which ONE additional mark would make the ? side findable with a law?",
      "Mark the length of one of the other sides",
      ["Mark the third angle as well",
       "Mark the altitude from the third vertex down to the ? side",
       "Mark the ? side as the longest side of the triangle"],
      "Both laws are proportions built from lengths: with no side length marked at all, there is nothing to anchor them, whatever the angles are. The third angle is already fixed by the angle sum, so marking it adds nothing, and an altitude or a longest-side note is not an input to either law. Marking <b>the length of one of the other sides</b> completes a pair and the sine law then gives the ? side.",
      {});
    q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:["47°","59°",null],side:[null,null,"?"],rot:9});
    return q;},
  function(){var A=61,B=43,C=180-A-B,a=18;
    var b=a*Math.sin(B*Math.PI/180)/Math.sin(A*Math.PI/180),c=a*Math.sin(C*Math.PI/180)/Math.sin(A*Math.PI/180);
    var q=mcq("The diagram marks side \\(a = 18\\text{ m}\\) and angle \\(B = 43^\\circ\\), which are not opposite each other, and marks angle \\(A\\) with ?. Which ONE additional mark would make angle \\(A\\) findable with a law?",
      "Mark side b, the side opposite the marked angle B",
      ["Mark the altitude from B down to side b",
       "Mark the median from A to the midpoint of side a",
       "Mark side a as the longest side of the triangle"],
      "The sine law starts from a complete pair, a side together with its opposite angle. Side \\(a\\) is marked but its opposite angle is the unknown, and angle \\(B\\) is marked but its opposite side is not, so neither law can start. Marking <b>side b</b> completes the pair at \\(B\\), and the sine law then gives \\(\\sin A\\). An altitude, a median or a longest-side note is not an input to either law.",
      {});
    q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:["?","43°",null],side:["18 m",null,null],rot:-14});
    return q;},
  function(){var A=38,B=57,C=180-A-B,b=15;
    var a=b*Math.sin(A*Math.PI/180)/Math.sin(B*Math.PI/180),c=b*Math.sin(C*Math.PI/180)/Math.sin(B*Math.PI/180);
    var q=mcq("The diagram marks side \\(b = 15\\text{ m}\\) and angle \\(A = 38^\\circ\\), which are not opposite each other, and marks side \\(a\\) with ?. Which ONE additional mark would make side \\(a\\) findable with a law?",
      "Mark angle B, the angle opposite the marked side b",
      ["Mark the altitude from A down to side a",
       "Mark the median from B to the midpoint of side b",
       "Mark side b as the shortest side of the triangle"],
      "The sine law starts from a complete pair, a side together with its opposite angle. Side \\(b\\) is marked but its opposite angle is not, and angle \\(A\\) is marked but its opposite side is the unknown, so neither law can start. Marking <b>angle B</b> completes the pair at \\(b\\), and the sine law then gives side \\(a\\). An altitude, a median or a shortest-side note is not an input to either law.",
      {});
    q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:["38°",null,null],side:["?","15 m",null],rot:12});
    return q;}
]));

/* PK tranche pass for Unit 1. pkFor is Cluster 1's dependent
   indicator list from the prior knowledge map. */
var PKT_U1_FOR=["7.1","7.2","7.3"];
var PKT_U1={
 "u1-pk-label-sides":{src:"math-1201:7.1",group:"trig-sides"},
 "u1-pk-ratio-def":{src:"math-1201:7.2",group:"trig-ratios"},
 "u1-pk-find-angle":{src:"math-1201:7.3",group:"trig-ratios"},
 "u1-pk-find-side":{src:"math-1201:7.4",group:"trig-ratios"},
 "u1-pk-pythagoras":{src:"math-1201:7.5, 7.7",group:"pythagoras"},
 "u1-pk-solve-triangle":{src:"math-1201:7.6",group:"solve-triangle"},
 "u1-pk-rope-angle":{src:"math-1201:7.3, 7.7",group:"trig-context"},
 "u1-pk-ramp-run":{src:"math-1201:7.4, 7.5",group:"trig-context"},
 "u1-pk-role-from-diagram":{src:"math-1201:7.1",group:"trig-sides"},
 "u1-pk-hypotenuse-pick":{src:"math-1201:7.1",group:"trig-sides"},
 "u1-pk-opposite-read":{src:"math-1201:7.1",group:"trig-sides"},
 "u1-pk-two-angles-roles":{src:"math-1201:7.1",group:"trig-sides"},
 "u1-pk-role-value":{src:"math-1201:7.1",group:"trig-sides"},
 "u1-pk-role-words":{src:"math-1201:7.1",group:"trig-sides"},
 "u1-pk-ratio-from-figure":{src:"math-1201:7.2",group:"trig-ratios"},
 "u1-pk-ratio-equation":{src:"math-1201:7.2",group:"trig-ratios"},
 "u1-pk-find-hypotenuse":{src:"math-1201:7.4",group:"trig-ratios"},
 "u1-pk-angle-from-legs":{src:"math-1201:7.3",group:"trig-ratios"},
 "u1-pk-ratio-letters":{src:"math-1201:7.2",group:"trig-ratios"},
 "u1-pk-other-angle-ratio":{src:"math-1201:7.2",group:"trig-ratios"},
 "u1-pk-ratio-decimal":{src:"math-1201:7.2",group:"trig-ratios"},
 "u1-pk-angle-from-value":{src:"math-1201:7.3",group:"trig-ratios"},
 "u1-pk-ratio-unreduced":{src:"math-1201:7.2",group:"trig-ratios"},
 "u1-pk-diag-num":{src:"math-1201:7.5",group:"pythagoras"},
 "u1-pk-leg-num":{src:"math-1201:7.5",group:"pythagoras"},
 "u1-pk-point-distance":{src:"math-1201:7.5",group:"pythagoras"},
 "u1-pk-right-check":{src:"math-1201:7.5",group:"pythagoras"},
 "u1-pk-screen-size":{src:"math-1201:7.5",group:"pythagoras"},
 "u1-pk-shortcut-saving":{src:"math-1201:7.5, 7.7",group:"pythagoras"},
 "u1-pk-solve-perimeter":{src:"math-1201:7.6",group:"solve-triangle"},
 "u1-pk-solve-second-leg":{src:"math-1201:7.6",group:"solve-triangle"},
 "u1-pk-solve-isosceles":{src:"math-1201:7.6",group:"solve-triangle"},
 "u1-pk-solve-scene":{src:"math-1201:7.6",group:"solve-triangle"},
 "u1-pk-elevation-height":{src:"math-1201:7.7",group:"trig-context"},
 "u1-pk-depression-distance":{src:"math-1201:7.7",group:"trig-context"},
 "u1-pk-shadow-angle":{src:"math-1201:7.7",group:"trig-context"},
 "u1-pk-ramp-length":{src:"math-1201:7.4, 7.7",group:"trig-context"},
 "u1-pk-ladder-reach":{src:"math-1201:7.7",group:"trig-context"},
 "u1-pk-wire-length":{src:"math-1201:7.7",group:"trig-context"},
 "u1-pk-tree-distance":{src:"math-1201:7.7",group:"trig-context"},
 "u1-pk-slide-angle":{src:"math-1201:7.3, 7.7",group:"trig-context"}};
BANK.forEach(function(e){var t=PKT_U1[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U1_FOR.slice();e.pkGroup=t.group;}});

/* ----- bank-u2.js ----- */
// Math 2201 Unit 2: Quadratic Functions question bank
// Cut verbatim from the standalone app's served file
// (math-2201-review/Math2201Review.html, lines 1283 to 1362).
// CRMARKS: u2-vertex-x=1
// CRMARKS: u2-vertex-value=2
// CRMARKS: u2-axis-from-intercepts=1
// CRMARKS: u2-xintercepts=2
// CRMARKS: u2-xintercepts-factored=1
// CRMARKS: u2-factored-coeffs=2
// CRMARKS: u2-eq-from-vertex=2
// CRMARKS: u2-max-context=2
// CRMARKS: u2-max-product=2
// CRMARKS: u2-perimeter-max-area=2
// CRMARKS: u2-profit-max=2
// CRMARKS: u2-revenue-max-price=3
// CRMARKS: u2-min-cost=2
// CRMARKS: u2-xintercepts-vertex-form=2
// CRMARKS: u2-other-intercept=2
// CRMARKS: u2-c-from-point=2
// CRMARKS: u2-vertex-from-factored=2
// CRMARKS: u2-vertex-fraction-y=3
// CRMARKS: u2-vertex-from-two-points=2
// CRMARKS: u2-vertex-given-axis=2
// CRMARKS: u2-vertex-given-axis-factored=2
// CRMARKS: u2-vertex-x-fraction=2
// CRMARKS: u2-find-b-given-axis=2
// CRMARKS: u2-axis-factored-num=1
// CRMARKS: u2-mirror-intercept=2
// CRMARKS: u2-standard-to-vertex-k=2
// CRMARKS: u2-vertex-to-standard-c=1
// CRMARKS: u2-a-from-intercepts-point=3
/* ============ Unit 2: Quadratic Functions ============ */
function quadStr(a,b,c){var s=(a===1?"":a===-1?"\u2212":""+a)+"x\u00B2";if(b!==0)s+=" "+(b>0?"+":"\u2212")+" "+(Math.abs(b)===1?"":Math.abs(b))+"x";if(c!==0)s+=" "+(c>0?"+":"\u2212")+" "+Math.abs(c);return s;}
function quadB(a,b,c){var s=(a===1?"":a===-1?"-":""+a)+"x^2";if(b!==0)s+=(b>0?" + ":" - ")+(Math.abs(b)===1?"":Math.abs(b))+"x";if(c!==0)s+=(c>0?" + ":" - ")+Math.abs(c);return s;}
function quadT(a,b,c){return "\\("+quadB(a,b,c)+"\\)";}
function fracT(n,d){return "\\(\\frac{"+n+"}{"+d+"}\\)";}
function frB(n,d){function g2(x,y){x=Math.abs(x);y=Math.abs(y);while(y){var t=x%y;x=y;y=t;}return x||1;}var g=g2(n,d);n/=g;d/=g;if(d<0){n=-n;d=-d;}if(d===1)return ""+n;return (n<0?"-":"")+"\\frac{"+Math.abs(n)+"}{"+d+"}";}
function vertB(a,h,k){var s=(a===1?"":a===-1?"-":""+a)+(h===0?"x^2":"(x "+(h>0?"- "+h:"+ "+(-h))+")^2");if(k>0)s+=" + "+k;else if(k<0)s+=" - "+(-k);return s;}
function vertT(a,h,k){return "\\(y = "+vertB(a,h,k)+"\\)";}
function factB(a,r1,r2){function f(r){return r===0?"x":(r>0?"(x - "+r+")":"(x + "+(-r)+")");}return (a===1?"":a===-1?"-":""+a)+f(r1)+f(r2);}
function factT(a,r1,r2){return "\\(y = "+factB(a,r1,r2)+"\\)";}
E("u2-vertex-x",2,["4.12"],1,"var",varset([
  function(){
  var a=pick([1,1,2,-1]),h=ri(-5,6)||2;var b=-2*a*h;var c=a*h*h+ri(-6,6);
  return numq("What is the x-coordinate of the vertex of \\(y = "+quadB(a,b,c)+"\\)?",
    h,0.011,"Axis of symmetry: \\(x = \\frac{-b}{2a} = \\frac{-("+b+")}{"+(2*a)+"} = \\)<b>\\("+h+"\\)</b>. The vertex sits on the axis of symmetry.",{a:a,b:b,c:c});
},
  function(){
  var a=pick([1,1,2,-1]),h=ri(-5,6)||2;var b=-2*a*h;var c=a*h*h+ri(-6,6);
  var kv=c-a*h*h;
  var qfig=numq("The graph shows a parabola with its vertex marked. What is the x-coordinate of the vertex?",
    h,0.011,"The marked point is the vertex, \\(("+h+", "+kv+")\\). The x-coordinate of the vertex is <b>\\("+h+"\\)</b>.",{a:a,b:b,c:c});
  qfig.figure=parSVG(a,b,c,{labels:"values",marks:[{x:h,y:kv}]});
  return qfig;
}
]));
E("u2-vertex-value",2,["4.11"],2,"var",varset([
  function(){
  var a=pick([1,2,-1]),h=ri(-4,5),k=ri(-8,12);var b=-2*a*h,c=a*h*h+k;
  return numq("Find the "+(a>0?"minimum":"maximum")+" value of \\(y = "+quadB(a,b,c)+"\\)"+".",
    k,0.011,"The vertex is at \\(x = \\frac{-b}{2a} = "+h+"\\). Substituting: \\(y = "+a+"("+h+")^2 + ("+b+")("+h+") + ("+c+") = \\)<b>\\("+k+"\\)</b>. Since \\(a "+(a>0?">":"<")+" 0\\), the parabola opens "+(a>0?"up and this is a minimum.":"down and this is a maximum."),{a:a,h:h,k:k});
},
  function(){
  var a=pick([1,2,-1]),h=ri(-4,5),k=ri(-8,12);var b=-2*a*h,c=a*h*h+k;
  var qfig=numq("The graph shows a parabola with its vertex marked. Find the "+(a>0?"minimum":"maximum")+" value of the function.",
    k,0.011,"The marked point is the vertex, \\(("+h+", "+k+")\\). Since the parabola opens "+(a>0?"up, the vertex is its lowest point, so the minimum value is the y-coordinate of the vertex":"down, the vertex is its highest point, so the maximum value is the y-coordinate of the vertex")+": <b>\\("+k+"\\)</b>.",{a:a,h:h,k:k});
  qfig.figure=parSVG(a,b,c,{labels:"values",marks:[{x:h,y:k}]});
  return qfig;
}
]));
E("u2-axis-from-intercepts",2,["4.13"],1,"gen",function(){
  var p=ri(-10,-1),q=ri(1,10);var mid=(p+q)/2;
  var frame=pick([
    "A parabola has x-intercepts \\("+p+"\\) and \\("+q+"\\). What is the equation of its axis of symmetry? Give your answer as \\(x = \\) (a number).",
    "The graph of a parabola crosses the x-axis at \\("+p+"\\) and \\("+q+"\\). What is the equation of its axis of symmetry? Give your answer as \\(x = \\) (a number)."]);
  var qfig=numq(frame,mid,0.011,"The axis of symmetry passes midway between the intercepts: \\(x = \\frac{"+p+" + "+q+"}{2} = \\)<b>\\("+fmt(mid)+"\\)</b>.",{p:p,q:q});
  qfig.figure=parSVG(1,-(p+q),p*q,{marks:[{x:p,y:0},{x:q,y:0}]});
  return qfig;
});
E("u2-xintercepts",2,["4.4"],2,"var",varset([
  function(){
  var p=ri(-9,-1),q=ri(1,10);var b=-(p+q),c=p*q;
  var factored=false;
  var prompt=factored? "A parabola has equation "+factT(1,p,q)+". What is the larger x-intercept?"
                     : "Find the larger x-intercept of \\(y = "+quadB(1,b,c)+"\\)"+".";
  return numq(prompt,q,0.011,"Factor: "+factT(1,p,q)+". The intercepts are \\(x = "+p+"\\) and \\(x = "+q+"\\); the larger is <b>\\("+q+"\\)</b>.",{p:p,q:q});
},
  function(){
  var p=ri(-9,-1),q=ri(1,10);var b=-(p+q),c=p*q;
  var qfig=numq("The graph shows a parabola with its x-intercepts marked. What is the larger x-intercept?",
    q,0.011,"The marked intercepts are \\(x = "+p+"\\) and \\(x = "+q+"\\); the larger is <b>\\("+q+"\\)</b>.",{p:p,q:q});
  qfig.figure=parSVG(1,b,c,{labels:"values",marks:[{x:p,y:0},{x:q,y:0}]});
  return qfig;
}
]));
E("u2-xintercepts-factored",2,["4.4"],1,"var",varset([
  function(){
  var p=ri(-9,-1),q=ri(1,10);var b=-(p+q),c=p*q;
  var factored=true;
  var prompt=factored? "A parabola has equation "+factT(1,p,q)+". What is the larger x-intercept?"
                     : "Find the larger x-intercept of \\(y = "+quadB(1,b,c)+"\\)"+".";
  return numq(prompt,q,0.011,"Factor: "+factT(1,p,q)+". The intercepts are \\(x = "+p+"\\) and \\(x = "+q+"\\); the larger is <b>\\("+q+"\\)</b>.",{p:p,q:q});
},
  function(){
  var p=ri(-9,-1),q=ri(1,10);var b=-(p+q),c=p*q;
  var qfig=numq("The parabola shown in the graph crosses the x-axis at the marked points. What is the larger x-intercept?",
    q,0.011,"The marked intercepts are \\(x = "+p+"\\) and \\(x = "+q+"\\); the larger is <b>\\("+q+"\\)</b>.",{p:p,q:q});
  qfig.figure=parSVG(1,b,c,{labels:"values",marks:[{x:p,y:0},{x:q,y:0}]});
  return qfig;
}
]));
E("u2-factored-coeffs",2,["4.5"],1,"gen",function(){
  var p=ri(-7,-2),q=ri(2,7);var askB=Math.random()<0.5;
  return numq("A quadratic function has zeros \\("+p+"\\) and \\("+q+"\\), so its equation can be written \\(y = (x - ("+p+"))(x - ("+q+"))\\). Expanded into the form \\(y = x^2 + bx + c\\), what is the value of \\("+(askB?"b":"c")+"\\)?",
    askB?-(p+q):p*q,0.011,"Expanding: \\((x - ("+p+"))(x - ("+q+")) = x^2 - ("+(p+q)+")x + ("+(p*q)+")\\), so \\(b = "+(-(p+q))+"\\) and \\(c = "+(p*q)+"\\). The asked coefficient is <b>\\("+(askB?-(p+q):p*q)+"\\)</b>.",{p:p,q:q,askB:askB});
});
E("u2-domain-range",2,["4.1"],1,"gen",function(){
  var a=pick([1,-1,2]),h=ri(-4,4),k=ri(-6,10);
  var correct=a>0?"Domain: all real numbers; Range: \\(y \\geq "+k+"\\)":"Domain: all real numbers; Range: \\(y \\leq "+k+"\\)";
  var q=mcq("A quadratic function has vertex \\(("+h+", "+k+")\\) and opens "+(a>0?"upward":"downward")+". What are its domain and range?",correct,
    [a>0?"Domain: all real numbers; Range: \\(y \\leq "+k+"\\)":"Domain: all real numbers; Range: \\(y \\geq "+k+"\\)",
     "Domain: \\(x \\geq "+h+"\\); Range: all real numbers","Domain: \\(x \\geq "+h+"\\); Range: \\(y "+(a>0?"\\geq":"\\leq")+" "+k+"\\)"],
    "Every quadratic has domain all real numbers. The vertex is the turning point: opening "+(a>0?"up, the smallest \\(y\\) is the vertex's y-value \\("+k+"\\)":"down, the largest \\(y\\) is \\("+k+"\\)")+", so the range is \\(y "+(a>0?"\\geq":"\\leq")+" "+k+"\\)"+".",{a:a,h:h,k:k});
  q.figure=parSVG(a,-2*a*h,a*h*h+k,{marks:[{x:h,y:k}]});
  return q;
});
E("u2-vertex-form-params",2,["4.15"],1,"var",varset([
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
E("u2-eq-from-vertex",2,["4.16"],2,"gen",function(){
  var h=ri(-4,4),k=ri(-5,5),a=pick([1,2,3,-1]);var dx=pick([1,2]);var px=h+dx,py=a*dx*dx+k;
  var q=numq("A parabola has vertex \\(("+h+", "+k+")\\) and passes through \\(("+px+", "+py+")\\). Using \\(y = a(x - h)^2 + k\\), find the value of \\(a\\).",
    a,0.011,"Substitute the point: \\[\\begin{aligned} "+py+" &= a("+px+" - ("+h+"))^2 + ("+k+") \\\\ &= "+(dx*dx)+"a + ("+k+") \\\\ a &= \\frac{"+py+" - ("+k+")}{"+(dx*dx)+"} = "+a+" \\end{aligned}\\]",{h:h,k:k,a:a});
  q.figure=parSVG(a,-2*a*h,a*h*h+k,{marks:[{x:h,y:k},{x:px,y:py}]});
  return q;
});
E("u2-max-context",2,["4.2"],2,"gen",function(){
  var v=pick([10,20,30,40,50,60,70]),h0=pick([0,2,5,8,10,12,15,20,25,30]);
  var thing=pick(["A ball is thrown upward","A firework shell is launched upward","A water jet from a fountain arcs upward"]);
  var tmax=v/10,hmax=-5*tmax*tmax+v*tmax+h0;
  var q=numq(thing+". Its height after \\(t\\) seconds is \\(h(t) = -5t^2 + "+v+"t"+(h0?" + "+h0:"")+"\\) metres. What is the maximum height it reaches, in metres?",
    hmax,0.11,"The maximum is at the vertex: \\(t = \\frac{-b}{2a} = \\frac{-"+v+"}{-10} = "+fmt(tmax,1)+"\\) s. Then \\(h("+fmt(tmax,1)+") = -5("+fmt(tmax*tmax,2)+") + "+v+"("+fmt(tmax,1)+") + "+h0+" = \\)<b>\\("+fmt(hmax,1)+"\\text{ m}\\)</b>.",{v:v,h0:h0});
  q.figure=trajSVG(-5,v,h0);
  return q;
});

/* ============ Expansion (November 18, 2026) ============
   Bank expansion programme, Unit 2 pass: 54 new indicator templates
   and 6 new prior knowledge templates, authored new (new question
   shapes, contexts and solution paths, not re-skins of the entries
   above). Before this pass the unit held 39 templates (31 indicator,
   8 PK); several indicators rested on one or two templates (4.11,
   4.12 and 4.14 on one each), so repeated draws across a unit
   re-dealt the same shapes with new numbers. Depth targets follow
   the November 17, 2026 Unit 1 enrichment: every indicator pool at
   least 6, the unit at 99 templates in all. A small line figure
   builder for the PK graph items comes first. */
function u2pkLineSVG(o){
  o=o||{};
  var W=300,H=238,mL=36,mR=12,mT=12,mB=26,iw=W-mL-mR,ih=H-mT-mB;
  var xs=[-2,2],ys=[-2,2];
  if(o.pts)o.pts.forEach(function(p){xs.push(p[0]);ys.push(p[1]);});
  if(o.seg){xs.push(o.seg[0][0],o.seg[1][0]);ys.push(o.seg[0][1],o.seg[1][1]);}
  var mm=null,bb=0;
  if(o.line){mm=o.line[0]/o.line[1];bb=o.line[2];xs.push(-7,7);ys.push(mm*-7+bb,mm*7+bb);}
  var x0=Math.floor(Math.min.apply(null,xs)-1),x1=Math.ceil(Math.max.apply(null,xs)+1);
  var y0=Math.floor(Math.min.apply(null,ys)-1),y1=Math.ceil(Math.max.apply(null,ys)+1);
  if(x1-x0<6){x0-=2;x1+=2;}
  if(y1-y0<6){y0-=2;y1+=2;}
  function X(x){return mL+(x-x0)/(x1-x0)*iw;}
  function Y(y){return mT+(y1-y)/(y1-y0)*ih;}
  function stepFor(s){return s<=13?1:(s<=32?2:5);}
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+(o.aria||"Graph")+'">';
  var sx=stepFor(x1-x0),sy=stepFor(y1-y0),g;
  for(g=Math.ceil(x0/sx)*sx;g<=x1+1e-9;g+=sx){
    if(Math.abs(g)<1e-9)continue;
    out+='<line x1="'+fmt(X(g),1)+'" y1="'+mT+'" x2="'+fmt(X(g),1)+'" y2="'+(mT+ih)+'" stroke="#d8e2dc" stroke-width="1"/>';
    out+=_txt(X(g),mT+ih+13,_parNum(g),10.5,false);
  }
  for(g=Math.ceil(y0/sy)*sy;g<=y1+1e-9;g+=sy){
    if(Math.abs(g)<1e-9)continue;
    out+='<line x1="'+mL+'" y1="'+fmt(Y(g),1)+'" x2="'+(mL+iw)+'" y2="'+fmt(Y(g),1)+'" stroke="#d8e2dc" stroke-width="1"/>';
    out+=_txt(mL-5,Y(g),_parNum(g),10.5,false,"end");
  }
  var yAx=(y0<0&&y1>0)?Y(0):(mT+ih),xAx=(x0<0&&x1>0)?X(0):mL;
  out+='<line x1="'+mL+'" y1="'+fmt(yAx,1)+'" x2="'+(mL+iw)+'" y2="'+fmt(yAx,1)+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  out+='<line x1="'+fmt(xAx,1)+'" y1="'+mT+'" x2="'+fmt(xAx,1)+'" y2="'+(mT+ih)+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  if(mm!==null){
    var d="",pen=false,i,x,y;
    for(i=0;i<=60;i++){x=x0+(x1-x0)*i/60;y=mm*x+bb;if(y<y0||y>y1){pen=false;continue;}d+=(pen?"L":"M")+fmt(X(x),1)+" "+fmt(Y(y),1);pen=true;}
    out+='<path d="'+d+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2.2"/>';
  }
  if(o.seg)out+='<line x1="'+fmt(X(o.seg[0][0]),1)+'" y1="'+fmt(Y(o.seg[0][1]),1)+'" x2="'+fmt(X(o.seg[1][0]),1)+'" y2="'+fmt(Y(o.seg[1][1]),1)+'" stroke="'+FIG_INK+'" stroke-width="2.2"/>';
  if(o.pts)o.pts.forEach(function(p){out+='<circle cx="'+fmt(X(p[0]),1)+'" cy="'+fmt(Y(p[1]),1)+'" r="3.6" fill="'+FIG_INK+'"/>';});
  (o.marks||[]).forEach(function(mk){out+='<circle cx="'+fmt(X(mk[0]),1)+'" cy="'+fmt(Y(mk[1]),1)+'" r="4" fill="'+FIG_ACC+'" stroke="#ffffff" stroke-width="1.2"/>';});
  if(o.xLab)out+=_txt(mL+iw,H-4,o.xLab,12,false,"end");
  return out+'</svg>';
}
/* --- 4.1: domain and range --- */
E("u2-dr-from-graph",2,["4.1"],1,"gen",function(){
  var a=pick([1,-1,2,-2]),h=ri(-4,4),k=ri(-6,9),tries=0;
  while(k===h&&tries<40){k=ri(-6,9);tries++;}
  var b=-2*a*h,c=a*h*h+k,up=a>0;
  var key="Domain: all real numbers; Range: \\(y "+(up?"\\geq":"\\leq")+" "+k+"\\)";
  var q=mcq("The graph shows a quadratic function with its vertex marked. What are the domain and range of the function?",
    key,
    ["Domain: all real numbers; Range: \\(y "+(up?"\\leq":"\\geq")+" "+k+"\\)",
     "Domain: \\(x \\geq "+h+"\\); Range: all real numbers",
     "Domain: all real numbers; Range: \\(y "+(up?"\\geq":"\\leq")+" "+h+"\\)"],
    "The domain of every quadratic function is all real numbers. The vertex is \\(("+h+", "+k+")\\) and the parabola opens "+(up?"up, so the smallest value of \\(y\\) is \\("+k+"\\)":"down, so the largest value of \\(y\\) is \\("+k+"\\)")+". The <b>range is \\(y "+(up?"\\geq":"\\leq")+" "+k+"\\)</b>.",
    {a:a,h:h,k:k});
  q.figure=parSVG(a,b,c,{labels:"values",marks:[{x:h,y:k}]});
  return q;
});
E("u2-dr-vertex-form",2,["4.1"],2,"gen",function(){
  var a=pick([1,-1,2,-2]),h=ri(-5,5),k=ri(-7,9),tries=0;
  while((k===h||k===0)&&tries<40){k=ri(-7,9);tries++;}
  var up=a>0;
  var key="Domain: all real numbers; Range: \\(y "+(up?"\\geq":"\\leq")+" "+k+"\\)";
  return mcq("What are the domain and range of the function "+vertT(a,h,k)+"?",
    key,
    ["Domain: all real numbers; Range: \\(y "+(up?"\\leq":"\\geq")+" "+k+"\\)",
     "Domain: \\(x \\geq "+h+"\\); Range: all real numbers",
     "Domain: all real numbers; Range: \\(y "+(up?"\\geq":"\\leq")+" "+h+"\\)"],
    "Vertex form shows the vertex directly: \\(("+h+", "+k+")\\). The domain of a quadratic function is all real numbers. Since \\(a = "+a+"\\) is "+(up?"positive, the parabola opens up and the least value of \\(y\\) is the vertex's y-coordinate":"negative, the parabola opens down and the greatest value of \\(y\\) is the vertex's y-coordinate")+", \\("+k+"\\)"+". The <b>range is \\(y "+(up?"\\geq":"\\leq")+" "+k+"\\)</b>.",
    {a:a,h:h,k:k});
});
E("u2-dr-standard-form",2,["4.1"],2,"gen",function(){
  var a=pick([1,-1,2]),h=ri(-4,4),k=ri(-6,9),tries=0;
  while((h===0||k===h)&&tries<40){h=ri(-4,4);k=ri(-6,9);tries++;}
  var b=-2*a*h,c=a*h*h+k,up=a>0;
  var key="Domain: all real numbers; Range: \\(y "+(up?"\\geq":"\\leq")+" "+k+"\\)";
  return mcq("What are the domain and range of \\(y = "+quadB(a,b,c)+"\\)?",
    key,
    ["Domain: all real numbers; Range: \\(y "+(up?"\\geq":"\\leq")+" "+c+"\\)",
     "Domain: all real numbers; Range: \\(y "+(up?"\\leq":"\\geq")+" "+k+"\\)",
     "Domain: \\(x \\geq "+h+"\\); Range: all real numbers"],
    "The domain of a quadratic function is all real numbers. The vertex is at \\(x = \\frac{-b}{2a} = "+h+"\\), and substituting gives \\(y = "+k+"\\), so the vertex is \\(("+h+", "+k+")\\). The parabola opens "+(up?"up, so \\("+k+"\\) is the least value of \\(y\\)":"down, so \\("+k+"\\) is the greatest value of \\(y\\)")+". The <b>range is \\(y "+(up?"\\geq":"\\leq")+" "+k+"\\)</b>. (The value \\("+c+"\\) is the y-intercept, not the range boundary.)",
    {a:a,b:b,c:c,h:h,k:k});
});
E("u2-domain-context",2,["4.1"],2,"gen",function(){
  var v=pick([10,15,20,25,30]),T=v/5,H=v*v/20;
  var ctx=pick(["A ball is kicked into the air","A stone is thrown into the air","A flare is fired into the air"]);
  return mcq(ctx+". Its height after \\(t\\) seconds is \\(h(t) = -5t^2 + "+v+"t\\) metres, until it lands. What is the domain of this function in this situation?",
    "\\(0 \\leq t \\leq "+T+"\\)",
    ["\\(0 \\leq h \\leq "+H+"\\)","\\(-"+T+" \\leq t \\leq "+T+"\\)","\\(0 \\leq t \\leq "+(2*T)+"\\)"],
    "Time in this situation starts at the kick, \\(t = 0\\), and ends when the height returns to zero: \\(-5t^2 + "+v+"t = 0\\) gives \\(t = "+T+"\\) (besides \\(t = 0\\)). So the <b>domain is \\(0 \\leq t \\leq "+T+"\\)</b>. The statement about \\(h\\) describes heights (the range), not times, and negative times do not occur.",
    {v:v,T:T,H:H});
});
E("u2-range-context-mc",2,["4.1"],2,"gen",function(){
  var v=pick([10,20,30]),H=v*v/20,T=v/5;
  var ctx=pick(["A ball is kicked into the air","A model rocket is launched from the ground","A water jet arcs from a fountain at ground level"]);
  return mcq(ctx+". Its height after \\(t\\) seconds is \\(h(t) = -5t^2 + "+v+"t\\) metres. Which statement gives the range of the height function during the flight?",
    "\\(0 \\leq h \\leq "+H+"\\)",
    ["\\(0 \\leq t \\leq "+T+"\\)","\\(0 \\leq h \\leq "+(2*H)+"\\)","\\(-"+H+" \\leq h \\leq "+H+"\\)"],
    "During the flight the height starts at \\(0\\), rises to its greatest value at the vertex, and returns to \\(0\\). The vertex is at \\(t = \\frac{"+v+"}{10} = "+fmt(T/2,1)+"\\), where \\(h = "+H+"\\) m. So the heights taken are exactly <b>\\(0 \\leq h \\leq "+H+"\\)</b>. The statement \\(0 \\leq t \\leq "+T+"\\) is the domain, not the range, and heights below \\(0\\) would be underground.",
    {v:v,H:H,T:T});
});
/* --- 4.2: contextual problems --- */
E("u2-max-product",2,["4.2"],2,"gen",function(){
  var S=pick([12,16,20,24,28,32,36,40]),half=S/2,prod=half*half,mode=ri(0,1);
  return numq("Two numbers add to \\("+S+"\\)"+". What is "+(mode===0?"the greatest possible product of the two numbers":"the value of each number when their product is greatest")+"?",
    mode===0?prod:half,0.011,
    "Let one number be \\(x\\); the other is \\("+S+" - x\\), so the product is \\(P(x) = x("+S+" - x) = -x^2 + "+S+"x\\). The vertex of this downward parabola is at \\(x = \\frac{"+S+"}{2} = "+half+"\\), where the other number is also \\("+S+" - "+half+" = "+half+"\\). The greatest product is \\("+half+" \\times "+half+" = \\)<b>\\("+prod+"\\)</b>"+(mode===1?"; it occurs when each number is <b>\\("+half+"\\)</b>":"")+".",
    {S:S,half:half,prod:prod,mode:mode});
});
E("u2-perimeter-max-area",2,["4.2"],2,"gen",function(){
  var side=ri(4,15),P=4*side,area=side*side,mode=ri(0,1);
  var ctx=pick(["rectangular garden","rectangular dog pen","rectangular vegetable plot","rectangular patio"]);
  return numq("A "+ctx+" is enclosed with \\("+P+"\\) m of fencing, with fencing on all four sides. "+(mode===0?"What is the greatest area that can be enclosed, in \\(\\text{m}^2\\)?":"How long is each side when the enclosed area is greatest, in m?"),
    mode===0?area:side,0.011,
    "Let one side be \\(x\\) m. The perimeter gives the other side as \\(\\frac{"+P+"}{2} - x = "+(P/2)+" - x\\) m, so the area is \\(A(x) = x("+(P/2)+" - x)\\), a downward parabola with vertex at \\(x = \\frac{"+(P/2)+"}{2} = "+side+"\\) m. The other side is then also \\("+(P/2)+" - "+side+" = "+side+"\\) m: the plot is a square. The greatest area is \\("+side+" \\times "+side+" = \\)<b>\\("+area+"\\text{ m}^2\\)</b>"+(mode===1?"; each side is <b>\\("+side+"\\) m</b>":"")+".",
    {P:P,side:side,area:area,mode:mode});
});
E("u2-profit-max",2,["4.2"],2,"gen",function(){
  var a=pick([1,2,3]),xv=ri(10,40),c0=pick([100,300,500,800,1200]),tries=0;
  while(a*xv*xv<=c0&&tries<40){xv=ri(10,40);tries++;}
  var b=2*a*xv,pmax=a*xv*xv-c0,mode=ri(0,1);
  var ctx=pick(["A bakery sells x cakes per day","A workshop sells x chairs per week","A farm stand sells x baskets of apples per day"]);
  return numq(ctx+". Its profit is \\(P(x) = -"+(a===1?"":a)+"x^2 + "+b+"x - "+c0+"\\) dollars. "+(mode===0?"What is the greatest profit, in dollars?":"How many are sold when the profit is greatest?"),
    mode===0?pmax:xv,0.011,
    "The profit parabola opens downward, so its greatest value is at the vertex: \\(x = \\frac{-b}{2a} = \\frac{-"+b+"}{"+(-2*a)+"} = "+xv+"\\)"+". Substituting: \\(P("+xv+") = -"+(a===1?"":a)+"("+xv+")^2 + "+b+" \\times "+xv+" - "+c0+" = \\)<b>\\($"+pmax+"\\)</b>"+(mode===1?", reached when <b>\\("+xv+"\\)</b> are sold":"")+".",
    {a:a,xv:xv,b:b,c0:c0,pmax:pmax,mode:mode});
});
E("u2-revenue-max-price",2,["4.2"],3,"gen",function(){
  var s=pick([5,10,20]),P=pick([4,5,6,8,10]),xs=pick([3,4,5,6,7,8,9,10,12,15]);
  var N=s*(2*xs+P),price=P+xs;
  var ctx=pick([["candle","candles"],["concert ticket","concert tickets"],["smoothie","smoothies"],["bus pass","bus passes"]]);
  return numq("A shop sells \\("+N+"\\) "+ctx[1]+" a week at $"+P+" per "+ctx[0]+". For every $1 increase in the price, \\("+s+"\\) fewer "+ctx[1]+" are sold. What price gives the greatest weekly revenue, in dollars?",
    price,0.011,
    "Let \\(x\\) be the number of $1 increases. The price is \\("+P+" + x\\) dollars and the number sold is \\("+N+" - "+s+"x\\), so revenue is \\(R(x) = ("+N+" - "+s+"x)("+P+" + x)\\). Expanding, \\(R(x) = -"+s+"x^2 + "+(N-s*P)+"x + "+(N*P)+"\\)"+", whose vertex is at \\(x = \\frac{"+(N-s*P)+"}{"+(2*s)+"} = "+xs+"\\)"+". The best number of increases is \\("+xs+"\\), so the price is \\("+P+" + "+xs+" = \\)<b>\\($"+price+"\\)</b>.",
    {s:s,P:P,xs:xs,N:N,price:price});
});
E("u2-min-cost",2,["4.2"],2,"gen",function(){
  var a=pick([1,2]),xv=ri(6,25),b=2*a*xv,cmin=pick([150,200,250,300,400,500,600,750,900,1200]);
  var c=cmin+a*xv*xv,mode=ri(0,1);
  var ctx=pick([["A ferry company","trips per day"],["A bakery","batches per day"],["A courier company","delivery runs per day"]]);
  return numq(ctx[0]+" models its daily cost as \\(C(x) = "+(a===1?"":a)+"x^2 - "+b+"x + "+c+"\\) dollars, where \\(x\\) is the number of "+ctx[1]+". "+(mode===0?"What is the least possible daily cost, in dollars?":"How many "+ctx[1].split(" per day")[0]+" give the least daily cost?"),
    mode===0?cmin:xv,0.011,
    "The cost parabola opens upward, so its least value is at the vertex: \\(x = \\frac{-b}{2a} = \\frac{"+b+"}{"+(2*a)+"} = "+xv+"\\)"+". Substituting: \\(C("+xv+") = "+(a===1?"":a)+"("+xv+")^2 - "+b+" \\times "+xv+" + "+c+" = \\)<b>\\($"+cmin+"\\)</b>"+(mode===1?", reached at <b>\\("+xv+"\\)</b> "+ctx[1]:"")+".",
    {a:a,xv:xv,b:b,c:c,cmin:cmin,mode:mode});
});
/* --- 4.4: intercepts --- */
E("u2-intercepts-read-graph",2,["4.4"],1,"gen",function(){
  var p=ri(-8,-1),q=ri(1,8),a=pick([1,-1]);
  var b=-a*(p+q),c=a*p*q;
  var qfig=mcq("The graph shows a parabola with its x-intercepts marked. What are the x-intercepts?",
    "\\(x = "+p+"\\) and \\(x = "+q+"\\)",
    ["\\(x = "+(-p)+"\\) and \\(x = "+(-q)+"\\)",
     "\\(x = "+p+"\\) and \\(x = "+(-q)+"\\)",
     "\\(x = "+(-p)+"\\) and \\(x = "+q+"\\)"],
    "Read the marked points where the graph crosses the x-axis: <b>\\(x = "+p+"\\) and \\(x = "+q+"\\)</b>. Watch the signs: the intercept on the left of the origin is negative.",
    {p:p,q:q,a:a});
  qfig.figure=parSVG(a,b,c,{labels:"values",marks:[{x:p,y:0},{x:q,y:0}]});
  return qfig;
});
E("u2-xintercepts-vertex-form",2,["4.4"],2,"gen",function(){
  var a=pick([1,2]),d=ri(2,6),h=ri(-5,5),k=-a*d*d,larger=Math.random()<0.5;
  var ans=larger?h+d:h-d;
  return numq("Find the "+(larger?"larger":"smaller")+" x-intercept of \\(y = "+vertB(a,h,k)+"\\)"+".",
    ans,0.011,
    "Set \\(y = 0\\): \\("+a+"(x - ("+h+"))^2 "+(k>0?"+ "+k:"- "+(-k))+" = 0\\) gives \\((x - ("+h+"))^2 = "+(d*d)+"\\)"+", so \\(x - ("+h+") = \\pm "+d+"\\) and the intercepts are \\(x = "+(h-d)+"\\) and \\(x = "+(h+d)+"\\)"+". The "+(larger?"larger":"smaller")+" is <b>\\("+ans+"\\)</b>.",
    {a:a,d:d,h:h,k:k,ans:ans});
});
E("u2-y-intercept-point",2,["4.4"],1,"gen",function(){
  var a=ri(-4,4),b=ri(-9,9),c=ri(-11,11),tries=0;
  while((a===0||c===0||b===c||a+b+c===c||a+b+c===b)&&tries<60){a=ri(-4,4);b=ri(-9,9);c=ri(-11,11);tries++;}
  return mcq("At which point does the graph of \\(y = "+quadB(a,b,c)+"\\) cross the y-axis?",
    "\\((0, "+c+")\\)",
    ["\\(("+c+", 0)\\)","\\((0, "+b+")\\)","\\((0, "+(a+b+c)+")\\)"],
    "A graph crosses the y-axis where \\(x = 0\\). Substituting \\(x = 0\\) leaves \\(y = "+c+"\\), so the crossing point is <b>\\((0, "+c+")\\)</b>. (The value \\("+(a+b+c)+"\\) is \\(f(1)\\), the value of the function at \\(x = 1\\).)",
    {a:a,b:b,c:c});
});
E("u2-intercepts-set",2,["4.4"],2,"gen",function(){
  var p=ri(-7,-1),q=ri(1,7),a=pick([1,2,-1]);
  var b=-a*(p+q),c=a*p*q;
  function stmt(x1,x2,yi){return "x-intercepts \\("+x1+"\\) and \\("+x2+"\\); y-intercept \\("+yi+"\\)";}
  return mcq("What are the intercepts of the graph of \\(y = "+quadB(a,b,c)+"\\)?",
    stmt(p,q,c),
    [stmt(-p,-q,c),stmt(p,q,-c),stmt(-p,q,c)],
    "The function factors as \\(y = "+factB(a,p,q)+"\\)"+", so it crosses the x-axis at \\(x = "+p+"\\) and \\(x = "+q+"\\)"+". At \\(x = 0\\), \\(y = "+a+" \\times ("+(-p)+") \\times ("+(-q)+") = "+c+"\\)"+". The intercepts are <b>"+stmt(p,q,c)+"</b>.",
    {p:p,q:q,a:a,b:b,c:c});
});
E("u2-other-intercept",2,["4.4"],2,"gen",function(){
  var h=ri(-5,5),d=ri(2,7),side=Math.random()<0.5?1:-1,a=pick([1,-1]);
  var x1=h+side*d,x2=h-side*d,b=-2*a*h,c=a*(h*h-d*d);
  var q=numq("The graph shows a parabola with one x-intercept marked. The dashed line is its axis of symmetry, \\(x = "+h+"\\)"+". What is the other x-intercept?",
    x2,0.011,
    "The two x-intercepts sit at equal distances on either side of the axis of symmetry. The marked intercept \\("+x1+"\\) is \\("+d+"\\) units from the axis \\(x = "+h+"\\)"+", so the other intercept is \\("+d+"\\) units on the other side: \\("+h+" "+(x2>h?"+":"-")+" "+d+" = \\)<b>\\("+x2+"\\)</b>.",
    {h:h,d:d,x1:x1,x2:x2,a:a});
  q.figure=parSVG(a,b,c,{labels:"values",vline:h,marks:[{x:x1,y:0}]});
  return q;
});
/* --- 4.5: factored form from the zeros --- */
E("u2-factored-with-a",2,["4.5"],2,"gen",function(){
  var a=pick([2,3,-2,-3]),r1=ri(-6,-1),r2=ri(1,6);
  return mcq("A quadratic function has zeros \\("+r1+"\\) and \\("+r2+"\\) and leading coefficient \\("+a+"\\)"+". Which function is it, in factored form?",
    factT(a,r1,r2),
    [factT(1,r1,r2),factT(a,-r1,r2),factT(a,r1,-r2)],
    "Each zero \\(r\\) gives a factor \\((x - r)\\), and the leading coefficient multiplies the whole product: <b>"+factT(a,r1,r2)+"</b>. Dropping the \\("+a+"\\) would change every value of the function, and flipping a sign inside a factor moves that zero to its opposite.",
    {a:a,r1:r1,r2:r2});
});
E("u2-factored-from-graph",2,["4.5"],2,"gen",function(){
  var a=pick([1,-1]),p=ri(-7,-1),q=ri(1,7);
  var b=-a*(p+q),c=a*p*q;
  var ds=a===1?[factT(1,-p,-q),factT(-1,p,q),factT(2,p,q)]:[factT(-1,-p,-q),factT(1,p,q),factT(-1,p,-q)];
  var qfig=mcq("The graph shows a parabola with its x-intercepts marked. Which function, in factored form, has this graph?",
    factT(a,p,q),ds,
    "The graph crosses the x-axis at \\(x = "+p+"\\) and \\(x = "+q+"\\)"+", so the factors are \\((x - ("+p+"))\\) and \\((x - ("+q+"))\\)"+". The parabola opens "+(a>0?"upward, so the leading coefficient is positive":"downward, so the leading coefficient is negative")+". The function is <b>"+factT(a,p,q)+"</b>.",
    {a:a,p:p,q:q});
  qfig.figure=parSVG(a,b,c,{labels:"values",marks:[{x:p,y:0},{x:q,y:0}]});
  return qfig;
});
E("u2-factored-double-root",2,["4.5"],1,"gen",function(){
  var r=ri(-6,6),a=pick([1,2,-1]),tries=0;
  while(r===0&&tries<40){r=ri(-6,6);tries++;}
  function fsF(rr){return "(x "+(rr>0?"- "+rr:"+ "+(-rr))+")";}
  return mcq("A quadratic function has a single zero at \\(x = "+r+"\\) (its graph touches the x-axis there and turns around). Which function is it, in factored form?",
    "\\(y = "+vertB(a,r,0)+"\\)",
    ["\\(y = "+vertB(a,-r,0)+"\\)",
     "\\(y = "+factB(a,r,-r)+"\\)",
     "\\(y = "+(a===1?"":a===-1?"-":a)+fsF(r)+"\\)"],
    "A single (repeated) zero means the same factor appears twice: the factor from the zero \\("+r+"\\) is \\("+fsF(r)+"\\)"+", squared. The function is <b>\\(y = "+vertB(a,r,0)+"\\)</b>. The product \\("+factB(a,r,-r)+"\\) would have two different zeros, \\("+r+"\\) and \\("+(-r)+"\\)"+".",
    {a:a,r:r});
});
E("u2-standard-to-factored",2,["4.5"],2,"gen",function(){
  var p=ri(-8,-1),q=ri(1,8),b=-(p+q),c=p*q;
  var cand=[factT(1,-p,-q),factT(1,-p,q),factT(1,p,-q),"\\(y = (x "+(b>0?"+ "+b:"- "+(-b))+")(x "+(c>0?"+ "+c:"- "+(-c))+")\\)"];
  var key=factT(1,p,q),ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  return mcq("Which function is the factored form of \\(y = "+quadB(1,b,c)+"\\)?",
    key,ds,
    "Work backwards from the zeros: a factored form \\((x - m)(x - n)\\) expands to \\(x^2 - (m + n)x + mn\\)"+". Matching \\(mn = "+c+"\\) and \\(m + n = "+(-b)+"\\) gives \\(m = "+p+"\\) and \\(n = "+q+"\\)"+", so the factored form is <b>"+key+"</b>. (Equivalently, the two numbers that multiply to \\("+c+"\\) and add to \\("+b+"\\) are \\("+(-p)+"\\) and \\("+(-q)+"\\)"+", written as the factors \\((x + ("+(-p)+"))\\) and \\((x + ("+(-q)+"))\\)"+"; the two writings are the same.)",
    {p:p,q:q,b:b,c:c});
});
E("u2-zeros-from-factored",2,["4.5"],1,"gen",function(){
  var a=pick([2,3,-2]),r1=ri(-6,-1),r2=ri(1,6);
  function zs(x,y){return "\\(x = "+x+"\\) and \\(x = "+y+"\\)";}
  return mcq("What are the zeros of \\(f(x) = "+factB(a,r1,r2)+"\\)?",
    zs(r1,r2),
    [zs(-r1,-r2),zs(-r1,r2),zs(r1,-r2)],
    "A zero is where a factor equals zero. The factor \\((x - ("+r1+"))\\) is zero at \\(x = "+r1+"\\) and the factor \\((x - ("+r2+"))\\) is zero at \\(x = "+r2+"\\)"+". The leading coefficient \\("+a+"\\) does not move the zeros. The zeros are <b>"+zs(r1,r2)+"</b>.",
    {a:a,r1:r1,r2:r2});
});
/* --- 4.10: characteristics through a, b, c --- */
E("u2-effect-of-c",2,["4.10"],1,"gen",function(){
  var b=pick([0,2,-3,4]),c1=ri(-6,6),d=pick([2,3,4,5]),up=Math.random()<0.5;
  var c2=up?c1+d:c1-d;
  function stmt(dir,amt){return "The second graph is the first graph shifted "+dir+" by "+amt+" units";}
  return mcq("How does the graph of \\(y = "+quadB(1,b,c2)+"\\) compare with the graph of \\(y = "+quadB(1,b,c1)+"\\)?",
    stmt(up?"up":"down",d),
    [stmt(up?"down":"up",d),stmt("left",d),stmt("right",d)],
    "The two functions differ only in the constant term: \\("+c2+" - ("+c1+") = "+(c2-c1)+"\\)"+". Changing the constant term moves the whole graph straight "+(up?"up":"down")+" by that amount, with no change to its shape or its axis. The second graph is <b>shifted "+(up?"up":"down")+" by "+d+" units</b>.",
    {b:b,c1:c1,c2:c2,d:d,up:up});
});
E("u2-effect-of-a",2,["4.10"],1,"gen",function(){
  var mode=ri(0,2);
  if(mode===0){
    var m=pick([2,3,4]);
    return mcq("Which statement compares the graph of \\(y = "+m+"x^2\\) with the graph of \\(y = x^2\\)?",
      "It is narrower, with the same vertex and the same opening direction",
      ["It is wider, with the same vertex and the same opening direction",
       "It opens downward instead of upward, with the same vertex",
       "It has the same width, but its vertex is higher"],
      "Multiplying by \\("+m+" > 1\\) makes every value of \\(y\\) larger in size, so the arms rise faster and the graph is <b>narrower</b>. The vertex stays at the origin and the graph still opens upward.",
      {mode:mode,m:m});
  }
  if(mode===1){
    var fr=pick(["\\frac{1}{2}","\\frac{1}{4}"]);
    return mcq("Which statement compares the graph of \\(y = "+fr+"x^2\\) with the graph of \\(y = x^2\\)?",
      "It is wider, with the same vertex and the same opening direction",
      ["It is narrower, with the same vertex and the same opening direction",
       "It opens downward instead of upward, with the same vertex",
       "It has the same width, but its vertex is lower"],
      "Multiplying by a positive number between \\(0\\) and \\(1\\) makes every value of \\(y\\) smaller in size, so the arms rise more slowly and the graph is <b>wider</b>. The vertex stays at the origin and the graph still opens upward.",
      {mode:mode,fr:fr});
  }
  return mcq("Which statement compares the graph of \\(y = -x^2\\) with the graph of \\(y = x^2\\)?",
    "It opens downward instead of upward, a reflection in the x-axis",
    ["It is wider, with the same vertex and the same opening direction",
     "It is narrower, with the same vertex and the same opening direction",
     "It has the same width and opening, but its vertex is lower"],
    "The negative sign flips the sign of every value of \\(y\\), so the graph is <b>reflected in the x-axis</b>: it opens downward instead of upward, with the same vertex and the same width.",
    {mode:mode});
});
E("u2-signs-from-graph",2,["4.10"],2,"gen",function(){
  var sa=pick([1,-1]),hv=pick([-3,-2,-1,1,2,3]),sc=pick([1,-1]);
  var a=sa,c=sc*ri(2,9),h=hv,k=c-a*h*h,b=-2*a*h;
  function sg(v){return v>0?"> 0":"< 0";}
  function stmt(x,y,z){return "\\(a "+sg(x)+"\\), \\(b "+sg(y)+"\\), \\(c "+sg(z)+"\\)";}
  var q=mcq("The graph of \\(y = ax^2 + bx + c\\) is shown, with its vertex marked. Which statement gives the signs of \\(a\\), \\(b\\) and \\(c\\)?",
    stmt(a,b,c),
    [stmt(-a,b,c),stmt(a,-b,c),stmt(a,b,-c)],
    "The parabola opens "+(a>0?"upward, so \\(a > 0\\)":"downward, so \\(a < 0\\)")+". It crosses the y-axis "+(c>0?"above":"below")+" the origin, so \\(c "+sg(c)+"\\)"+". The vertex is on the "+(h>0?"right":"left")+" of the y-axis, so the axis \\(x = \\frac{-b}{2a} = "+h+"\\) is "+(h>0?"positive":"negative")+"; with \\(a "+sg(a)+"\\) that forces \\(b "+sg(b)+"\\)"+". The signs are <b>"+stmt(a,b,c)+"</b>.",
    {a:a,b:b,c:c,h:h,k:k});
  q.figure=parSVG(a,b,c,{marks:[{x:h,y:k}]});
  return q;
});
E("u2-c-from-point",2,["4.10"],2,"gen",function(){
  var a=pick([1,2,3,-1,-2]),b=ri(-9,9),x0=ri(-4,4),c=ri(-12,12),tries=0;
  while((x0===0||c===0)&&tries<40){x0=ri(-4,4);c=ri(-12,12);tries++;}
  var y0=a*x0*x0+b*x0+c;
  return numq("The graph of \\(y = "+quadB(a,b,0)+" + c\\) passes through the point \\(("+x0+", "+y0+")\\)"+". What is the value of \\(c\\)?",
    c,0.011,
    "Substitute the point into the equation: \\[ \\begin{aligned} "+y0+" &= "+a+"("+x0+")^2 + ("+b+")("+x0+") + c \\\\ "+y0+" &= "+(a*x0*x0)+" + "+(b*x0)+" + c \\\\ c &= "+y0+" - "+(a*x0*x0+b*x0)+" = "+c+" \\end{aligned} \\] The value is <b>\\("+c+"\\)</b>.",
    {a:a,b:b,x0:x0,y0:y0,c:c});
});
E("u2-widest-graph",2,["4.10"],1,"gen",function(){
  var mags=shuffle([3,2,0.5,0.25]).slice();
  var signs=mags.map(function(){return Math.random()<0.5?-1:1;});
  function eqs(m,s){
    if(m===0.5)return "\\(y = "+(s<0?"-":"")+"\\frac{1}{2}x^2\\)";
    if(m===0.25)return "\\(y = "+(s<0?"-":"")+"\\frac{1}{4}x^2\\)";
    return "\\(y = "+(s*m)+"x^2\\)";
  }
  var keyI=mags.indexOf(0.25);
  var opts=mags.map(function(m,i){return eqs(m,signs[i]);});
  return mcq("Which function has the widest graph?",
    opts[keyI],
    opts.filter(function(_,i){return i!==keyI;}),
    "The width of a parabola is set by the size of the coefficient of \\(x^2\\): the smaller \\(|a|\\) is, the slower the arms rise and the wider the graph. Of the four, \\(|a| = \\frac{1}{4}\\) is the smallest, so <b>"+opts[keyI]+"</b> has the widest graph. The sign of \\(a\\) only chooses the opening direction.",
    {mags:mags,signs:signs});
});
/* --- 4.11: coordinates of the vertex --- */
E("u2-vertex-from-factored",2,["4.11"],2,"gen",function(){
  var a=pick([1,2,-1,-2]),r1=ri(-7,-1),gap=2*ri(2,5),r2=r1+gap;
  var mid=(r1+r2)/2,yv=-a*(gap/2)*(gap/2);
  return numq("What is the y-coordinate of the vertex of \\(y = "+factB(a,r1,r2)+"\\)?",
    yv,0.011,
    "The vertex sits on the axis of symmetry, midway between the zeros \\("+r1+"\\) and \\("+r2+"\\)"+": \\(x = \\frac{"+r1+" + "+r2+"}{2} = "+mid+"\\)"+". Substituting: \\(y = "+a+"("+mid+" - ("+r1+"))("+mid+" - ("+r2+")) = "+a+" \\times "+(mid-r1)+" \\times "+(mid-r2)+" = \\)<b>\\("+yv+"\\)</b>.",
    {a:a,r1:r1,r2:r2,mid:mid,yv:yv});
});
E("u2-vertex-from-table",2,["4.11"],2,"gen",function(){
  var h=ri(-3,3),k=ri(-7,9),a=pick([1,-1,2]),tries=0;
  while((h===0||k===0||k===h)&&tries<40){h=ri(-3,3);k=ri(-7,9);tries++;}
  var xs=[h-2,h-1,h,h+1,h+2],ys=xs.map(function(x){return a*(x-h)*(x-h)+k;});
  function pt(x,y){return "\\(("+x+", "+y+")\\)";}
  var key=pt(h,k);
  var cand=[pt(-h,k),pt(h,-k),pt(k,h),pt(h+1,ys[3])],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  var tab="\\(\\begin{array}{c|ccccc} x & "+xs.join(" & ")+" \\\\ \\hline y & "+ys.join(" & ")+" \\end{array}\\)";
  return mcq("A quadratic function has the values in the table. "+tab+" What is the vertex of its graph?",
    key,ds,
    "The y-values fall and then rise (or rise and then fall) symmetrically: the values at equal distances left and right of \\(x = "+h+"\\) match ("+ys[0]+" and "+ys[4]+", "+ys[1]+" and "+ys[3]+"). The turning point is the middle value, at \\(x = "+h+"\\)"+". The vertex is <b>"+key+"</b>.",
    {h:h,k:k,a:a,xs:xs,ys:ys});
});
E("u2-vertex-interpret",2,["4.11"],1,"gen",function(){
  var vx=pick([8,10,12,15,20]),vy=pick([2400,3600,4200,5400,6000,7500]);
  return mcq("A shop's revenue is modelled by a quadratic function of \\(x\\), the number of $1 price increases. The vertex of the revenue graph is \\(("+vx+", "+vy+")\\)"+". What does the vertex tell the shop?",
    "Revenue is greatest, at $"+vy+", after "+vx+" price increases of $1",
    ["Revenue is greatest, at $"+vx+", after "+vy+" price increases of $1",
     "The shop sells "+vx+" items a day and earns $"+vy+" before any increase",
     "Costs are least, at $"+vy+", after "+vx+" price increases of $1"],
    "On the revenue graph, the first coordinate counts the price increases and the second is the revenue in dollars. The vertex is the highest point of the graph, so it says: <b>revenue is greatest, at $"+vy+", after "+vx+" price increases of $1</b>.",
    {vx:vx,vy:vy});
});
E("u2-vertex-graph-mc",2,["4.11"],1,"gen",function(){
  var a=pick([1,-1,2,-2]),h=ri(-4,4),k=ri(-6,9),tries=0;
  while((k===0||h===0)&&tries<40){h=ri(-4,4);k=ri(-6,9);tries++;}
  var b=-2*a*h,c=a*h*h+k;
  while((k===h||k===0)&&tries<80){k=ri(-6,9);c=a*h*h+k;tries++;}
  function pt(x,y){return "\\(("+x+", "+y+")\\)";}
  var key=pt(h,k),cand=[pt(-h,k),pt(h,-k),pt(k,h)],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  var q=mcq("The graph shows a parabola with its vertex marked. What is the vertex?",
    key,ds,
    "Read the marked point's coordinates from the axes: across \\("+h+"\\), up \\("+k+"\\)"+". The vertex is <b>"+key+"</b>.",
    {a:a,h:h,k:k});
  q.figure=parSVG(a,b,c,{labels:"values",marks:[{x:h,y:k}]});
  return q;
});
E("u2-vertex-fraction-y",2,["4.11"],3,"gen",function(){
  var b=pick([-9,-7,-5,-3,-1,1,3,5,7,9]),c=ri(-9,12);
  var yv=(4*c-b*b)/4;
  return numq("What is the y-coordinate of the vertex of \\(y = "+quadB(1,b,c)+"\\)? Give the exact value.",
    yv,0.011,
    "The vertex is at \\(x = \\frac{-b}{2} = \\frac{"+(-b)+"}{2} = "+frB(-b,2)+"\\)"+". Substituting: \\[ \\begin{aligned} y &= \\left("+frB(-b,2)+"\\right)^2 + ("+b+")\\left("+frB(-b,2)+"\\right) + ("+c+") \\\\ &= \\frac{"+(b*b)+"}{4} - \\frac{"+(b*b)+"}{2} + "+c+" \\\\ &= "+frB(4*c-b*b,4)+" \\end{aligned} \\] The y-coordinate is <b>\\("+frB(4*c-b*b,4)+"\\)</b>.",
    {b:b,c:c,yv:yv});
});
E("u2-vertex-from-two-points",2,["4.11"],2,"gen",function(){
  var a=pick([1,2,-1]),h=ri(-4,4),k=ri(-6,10),d=pick([2,3]);
  var b=-2*a*h,c=a*h*h+k,x1=h-d,x2=h+d,y=a*d*d+k;
  return numq("The points \\(("+x1+", "+y+")\\) and \\(("+x2+", "+y+")\\) lie on the graph of \\(y = "+quadB(a,b,c)+"\\)"+". What is the y-coordinate of the vertex?",
    k,0.011,
    "The two points have the same y-coordinate, so they sit at the same height on the parabola, symmetrically about the axis. The axis is midway between them: \\(x = \\frac{"+x1+" + "+x2+"}{2} = "+h+"\\)"+". The vertex is on the axis, and substituting \\(x = "+h+"\\) gives \\(y = "+a+"("+h+")^2 + ("+b+")("+h+") + ("+c+") = \\)<b>\\("+k+"\\)</b>.",
    {a:a,b:b,c:c,h:h,k:k,x1:x1,x2:x2,y:y});
});
/* --- 4.12: vertex given the axis of symmetry --- */
E("u2-vertex-given-axis",2,["4.12"],2,"gen",function(){
  var a=pick([1,2,3,-1,-2]),h=ri(-6,6),d=pick([2,3,4]),tries=0;
  while(h===0&&tries<40){h=ri(-6,6);tries++;}
  var b=-2*a*h,c=ri(-9,9),x0=h+d,y0=a*x0*x0+b*x0+c,k=a*h*h+b*h+c;
  var q=numq("A parabola has axis of symmetry \\(x = "+h+"\\) and passes through the point \\(("+x0+", "+y0+")\\)"+". Its equation is \\(y = "+quadB(a,b,0)+" + c\\)"+". What is the y-coordinate of its vertex?",
    k,0.011,
    "First find \\(c\\) from the given point: \\("+y0+" = "+a+"("+x0+")^2 + ("+b+")("+x0+") + c\\)"+", so \\(c = "+y0+" - ("+(a*x0*x0+b*x0)+") = "+c+"\\)"+". The vertex lies on the axis of symmetry, so its x-coordinate is \\("+h+"\\)"+". Its y-coordinate is the value there: \\(y = "+a+"("+h+")^2 + ("+b+")("+h+") + ("+c+") = \\)<b>\\("+k+"\\)</b>.",
    {a:a,b:b,c:c,h:h,x0:x0,y0:y0,k:k});
  return q;
});
E("u2-vertex-given-axis-factored",2,["4.12"],2,"gen",function(){
  var a=pick([1,2,-1]),h=ri(-5,5),d=pick([2,3,4]),r1=h-d,r2=h+d,yv=-a*d*d;
  return numq("A parabola with equation \\(y = "+factB(a,r1,r2)+"\\) has axis of symmetry \\(x = "+h+"\\)"+". What is the y-coordinate of its vertex?",
    yv,0.011,
    "The vertex is on the axis, at \\(x = "+h+"\\)"+". Substituting into the factored form: \\(y = "+a+"("+h+" - ("+r1+"))("+h+" - ("+r2+")) = "+a+" \\times "+(h-r1)+" \\times "+(h-r2)+" = \\)<b>\\("+yv+"\\)</b>. (Check: the axis \\(x = "+h+"\\) is midway between the zeros \\("+r1+"\\) and \\("+r2+"\\)"+", as it must be.)",
    {a:a,h:h,r1:r1,r2:r2,yv:yv});
});
E("u2-axis-standard-mc",2,["4.12"],1,"gen",function(){
  var a=pick([1,2,3,-1]),h=ri(-6,6),c=ri(-9,9),tries=0;
  while(h===0&&tries<40){h=ri(-6,6);tries++;}
  var b=-2*a*h;
  return mcq("What is the axis of symmetry of the graph of \\(y = "+quadB(a,b,c)+"\\)?",
    "\\(x = "+h+"\\)",
    ["\\(x = "+(-h)+"\\)","\\(x = "+b+"\\)","\\(x = "+(-b)+"\\)"],
    "The axis of symmetry is \\(x = \\frac{-b}{2a} = \\frac{"+(-b)+"}{"+(2*a)+"} = "+h+"\\)"+". The axis is <b>\\(x = "+h+"\\)</b>.",
    {a:a,b:b,c:c,h:h});
});
E("u2-vertex-x-fraction",2,["4.12"],2,"gen",function(){
  var a=2,b=pick([-10,-6,-2,2,6,10]),c=ri(-8,10);
  var hv=-b/(2*a);
  return numq("What is the x-coordinate of the vertex of \\(y = "+quadB(a,b,c)+"\\)? Give the exact value.",
    hv,0.011,
    "The vertex is on the axis of symmetry: \\(x = \\frac{-b}{2a} = \\frac{"+(-b)+"}{"+(2*a)+"} = "+frB(-b,2*a)+"\\)"+". The x-coordinate is <b>\\("+frB(-b,2*a)+"\\)</b>.",
    {a:a,b:b,c:c,hv:hv});
});
E("u2-find-b-given-axis",2,["4.12"],2,"gen",function(){
  var a=pick([1,2,3,-1,-2]),h=ri(-6,6),c=ri(-9,9),tries=0;
  while(h===0&&tries<40){h=ri(-6,6);tries++;}
  var b=-2*a*h;
  return numq("The graph of \\(y = "+(a===1?"":a===-1?"-":a)+"x^2 + bx + "+(c<0?"- "+(-c):"+ "+c)+"\\) has axis of symmetry \\(x = "+h+"\\)"+". What is the value of \\(b\\)?",
    b,0.011,
    "The axis of symmetry is \\(x = \\frac{-b}{2a}\\)"+". Setting \\(\\frac{-b}{"+(2*a)+"} = "+h+"\\) and solving: \\(-b = "+(2*a*h)+"\\)"+", so \\(b = \\)<b>\\("+b+"\\)</b>.",
    {a:a,h:h,c:c,b:b});
});
/* --- 4.13: axis of symmetry --- */
E("u2-axis-from-vertex-form",2,["4.13"],1,"gen",function(){
  var a=pick([1,2,-1,-2]),h=ri(-7,7),k=ri(-8,9),tries=0;
  while((h===0||k===h||k===-h)&&tries<40){h=ri(-7,7);k=ri(-8,9);tries++;}
  return mcq("What is the axis of symmetry of the graph of \\(y = "+vertB(a,h,k)+"\\)?",
    "\\(x = "+h+"\\)",
    ["\\(x = "+k+"\\)","\\(x = "+(-h)+"\\)","\\(y = "+k+"\\)"],
    "In vertex form, the vertex is \\(("+h+", "+k+")\\)"+". The axis of symmetry is the vertical line through the vertex: <b>\\(x = "+h+"\\)</b>. (The value \\("+k+"\\) is the vertex's y-coordinate, not the axis.)",
    {a:a,h:h,k:k});
});
E("u2-axis-factored-num",2,["4.13"],1,"gen",function(){
  var r1=ri(-8,-1),gap=2*ri(1,5),r2=r1+gap,mid=(r1+r2)/2,a=pick([1,2,-1]);
  return numq("What is the axis of symmetry of the graph of \\(y = "+factB(a,r1,r2)+"\\)? Give its equation as \\(x = \\text{(a number)}\\) and enter the number.",
    mid,0.011,
    "The axis of symmetry passes midway between the zeros \\("+r1+"\\) and \\("+r2+"\\)"+": \\(x = \\frac{"+r1+" + "+r2+"}{2} = \\)<b>\\("+mid+"\\)</b>.",
    {r1:r1,r2:r2,mid:mid,a:a});
});
E("u2-mirror-intercept",2,["4.13"],2,"gen",function(){
  var h=ri(-5,5),d=ri(2,7),side=Math.random()<0.5?1:-1,a=pick([1,-1]);
  var x1=h+side*d,x2=h-side*d,b=-2*a*h,c=a*(h*h-d*d);
  var q=numq("The graph shows a parabola with one x-intercept marked and its axis of symmetry drawn. Using the symmetry of the graph, find the other x-intercept.",
    x2,0.011,
    "The axis of symmetry is \\(x = "+h+"\\)"+". The marked intercept \\("+x1+"\\) is \\("+d+"\\) units from the axis, so its mirror image, the other intercept, is \\("+d+"\\) units on the other side: \\("+h+" "+(x2>h?"+":"-")+" "+d+" = \\)<b>\\("+x2+"\\)</b>.",
    {h:h,d:d,x1:x1,x2:x2,a:a});
  q.figure=parSVG(a,b,c,{labels:"values",vline:h,marks:[{x:x1,y:0}]});
  return q;
});
E("u2-axis-from-graph",2,["4.13"],1,"gen",function(){
  var a=pick([1,-1,2]),h=ri(-5,5),k=ri(-6,9),tries=0;
  while((h===0||k===h||k===-h)&&tries<40){h=ri(-5,5);k=ri(-6,9);tries++;}
  var b=-2*a*h,c=a*h*h+k;
  var q=mcq("The graph shows a parabola with its vertex marked. What is the axis of symmetry?",
    "\\(x = "+h+"\\)",
    ["\\(x = "+k+"\\)","\\(y = "+k+"\\)","\\(x = "+(-h)+"\\)"],
    "The axis of symmetry is the vertical line through the vertex \\(("+h+", "+k+")\\)"+", so it is <b>\\(x = "+h+"\\)</b>.",
    {a:a,h:h,k:k});
  q.figure=parSVG(a,b,c,{labels:"values",marks:[{x:h,y:k}]});
  return q;
});
/* --- 4.14: sketching by characteristics --- */
E("u2-match-graph-standard",2,["4.14"],2,"gen",function(){
  var a=pick([1,-1]),h=ri(-4,4),k=ri(-6,8),tries=0;
  while((h===0||k===0)&&tries<40){h=ri(-4,4);k=ri(-6,8);tries++;}
  var b=-2*a*h,c=a*h*h+k;
  var specs=[
    {a:a,b:b,c:c},
    {a:-a,b:2*a*h,c:-a*h*h+k},
    {a:a,b:2*a*h,c:a*h*h+k},
    {a:a,b:-2*a*h,c:a*h*h-k}
  ];
  var order=shuffle([0,1,2,3]),letters=["A","B","C","D"];
  var panels=order.map(function(si,idx){var s=specs[si];return {a:s.a,b:s.b,c:s.c,caption:letters[idx],xrange:[-9,9],yrange:[-12,14]};});
  var keyLetter=letters[order.indexOf(0)];
  var q=mcq("Which graph shows \\(y = "+quadB(a,b,c)+"\\)?",
    keyLetter,letters.filter(function(L){return L!==keyLetter;}),
    "Work out the key features first: the vertex is at \\(x = \\frac{-b}{2a} = "+h+"\\), \\(y = "+k+"\\)"+", so the vertex is \\(("+h+", "+k+")\\)"+"; the parabola opens "+(a>0?"upward":"downward")+" and the y-intercept is \\("+c+"\\)"+". Only one panel has that vertex, that opening and that y-intercept: panel <b>"+keyLetter+"</b>.",
    {a:a,b:b,c:c,h:h,k:k,keyLetter:keyLetter});
  q.figure=parPanelsSVG(panels);
  return q;
});
E("u2-graph-features",2,["4.14"],1,"gen",function(){
  var a=pick([1,-1,2,-2]),h=ri(-5,5),k=ri(-7,9),tries=0;
  while((h===0||k===0)&&tries<40){h=ri(-5,5);k=ri(-7,9);tries++;}
  var b=-2*a*h,c=a*h*h+k,up=a>0;
  function stmt(dir,vx,vy,ext){return "Opens "+dir+"; vertex \\(("+vx+", "+vy+")\\); "+ext+" value \\("+vy+"\\)";}
  return mcq("Which description matches the graph of \\(y = "+quadB(a,b,c)+"\\)?",
    stmt(up?"up":"down",h,k,up?"minimum":"maximum"),
    [stmt(up?"down":"up",h,k,up?"minimum":"maximum"),
     stmt(up?"up":"down",-h,k,up?"minimum":"maximum"),
     stmt(up?"up":"down",h,-k,up?"maximum":"minimum")],
    "The sign of \\(a = "+a+"\\) says the parabola opens "+(up?"up":"down")+". The vertex is at \\(x = \\frac{-b}{2a} = "+h+"\\)"+", \\(y = "+k+"\\)"+", and a parabola that opens "+(up?"up has a minimum":"down has a maximum")+" there. The matching description is <b>"+stmt(up?"up":"down",h,k,up?"minimum":"maximum")+"</b>.",
    {a:a,b:b,c:c,h:h,k:k});
});
E("u2-sketch-points",2,["4.14"],2,"gen",function(){
  var a=pick([1,-1]),h=pick([-3,-2,-1,1,2,3]),d=pick([2,3]);
  var x1=h-d,x2=h+d,k=ri(-6,8),y=a*d*d+k,tries=0;
  while((y===0||k===0)&&tries<40){k=ri(-6,8);y=a*d*d+k;tries++;}
  var b=-2*a*h,c=a*h*h+k;
  function stmt(vx,vy,xa,xb,yy){return "Vertex \\(("+vx+", "+vy+")\\), passing through \\(("+xa+", "+yy+")\\) and \\(("+xb+", "+yy+")\\)";}
  var q=mcq("Which set of points would you plot to sketch the graph of \\(y = "+quadB(a,b,c)+"\\)?",
    stmt(h,k,x1,x2,y),
    [stmt(-h,k,x1,x2,y),stmt(h,-k,x1,x2,y),stmt(h,k,x1,x2,-y)],
    "The vertex is at \\(x = \\frac{-b}{2a} = "+h+"\\)"+", \\(y = "+k+"\\)"+". Points at equal distances on either side of the axis share a y-value: at \\(x = "+x1+"\\) and \\(x = "+x2+"\\)"+", \\(y = "+y+"\\)"+". A sketch through <b>"+stmt(h,k,x1,x2,y)+"</b> has the right vertex and the right symmetry.",
    {a:a,b:b,c:c,h:h,k:k,x1:x1,x2:x2,y:y});
  return q;
});
E("u2-match-graph-vertex-form",2,["4.14"],2,"gen",function(){
  var a=pick([1,-1]),h=ri(-4,4),k=ri(-6,8),tries=0;
  while((h===0||k===0)&&tries<40){h=ri(-4,4);k=ri(-6,8);tries++;}
  var specs=[
    {a:a,b:-2*a*h,c:a*h*h+k},
    {a:-a,b:2*a*h,c:-a*h*h+k},
    {a:a,b:2*a*h,c:a*h*h+k},
    {a:a,b:-2*a*h,c:a*h*h-k}
  ];
  var order=shuffle([0,1,2,3]),letters=["A","B","C","D"];
  var panels=order.map(function(si,idx){var s=specs[si];return {a:s.a,b:s.b,c:s.c,caption:letters[idx],xrange:[-9,9],yrange:[-12,14]};});
  var keyLetter=letters[order.indexOf(0)];
  var q=mcq("Which graph shows \\(y = "+vertB(a,h,k)+"\\)?",
    keyLetter,letters.filter(function(L){return L!==keyLetter;}),
    "Vertex form names the vertex directly: \\(("+h+", "+k+")\\)"+", and \\(a = "+a+"\\) says the parabola opens "+(a>0?"upward":"downward")+". Only one panel has that vertex and that opening: panel <b>"+keyLetter+"</b>.",
    {a:a,h:h,k:k,keyLetter:keyLetter});
  q.figure=parPanelsSVG(panels);
  return q;
});
E("u2-point-on-graph",2,["4.14"],1,"gen",function(){
  var a=pick([1,2,-1]),h=ri(-4,4),k=ri(-7,9),b=-2*a*h,c=a*h*h+k;
  var x0=pick([-3,-2,-1,1,2,3]),y0=a*(x0-h)*(x0-h)+k,tries=0;
  while((y0===k||y0===0||y0===x0)&&tries<40){x0=pick([-3,-2,-1,1,2,3]);y0=a*(x0-h)*(x0-h)+k;tries++;}
  function pt(x,y){return "\\(("+x+", "+y+")\\)";}
  var key=pt(x0,y0),cand=[pt(x0,-y0),pt(-x0,y0),pt(y0,x0)],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  return mcq("Which point lies on the graph of \\(y = "+quadB(a,b,c)+"\\)?",
    key,ds,
    "Test each point by substituting its x-coordinate. At \\(x = "+x0+"\\)"+": \\(y = "+a+"("+x0+")^2 + ("+b+")("+x0+") + ("+c+") = "+y0+"\\)"+", so the point <b>"+key+"</b> lies on the graph. The other points fail the same test.",
    {a:a,b:b,c:c,x0:x0,y0:y0});
});
/* --- 4.15: vertex form from standard form and back --- */
E("u2-standard-to-vertex-k",2,["4.15"],2,"gen",function(){
  var a=pick([1,2,3,-1,-2]),h=ri(-6,6),k=ri(-9,9),tries=0;
  while((k===0||h===0)&&tries<40){h=ri(-6,6);k=ri(-9,9);tries++;}
  var b=-2*a*h,c=a*h*h+k;
  return numq("When \\(y = "+quadB(a,b,c)+"\\) is written in vertex form \\(y = a(x - h)^2 + k\\), what is the value of \\(k\\)?",
    k,0.011,
    "The value of \\(k\\) is the y-coordinate of the vertex. The vertex is at \\(x = \\frac{-b}{2a} = \\frac{"+(-b)+"}{"+(2*a)+"} = "+h+"\\)"+". Substituting: \\(y = "+a+"("+h+")^2 + ("+b+")("+h+") + ("+c+") = \\)<b>\\("+k+"\\)</b>, so \\(k = "+k+"\\)"+". (Completing the square gives the same result: \\(y = "+vertB(a,h,k)+"\\)"+")",
    {a:a,b:b,c:c,h:h,k:k});
});
E("u2-vertex-to-standard-c",2,["4.15"],1,"gen",function(){
  var a=pick([1,2,-1,-2]),h=ri(-5,5),k=ri(-8,9),c=a*h*h+k,mid=-2*h;
  return numq("When \\(y = "+vertB(a,h,k)+"\\) is expanded into standard form \\(y = ax^2 + bx + c\\), what is the value of \\(c\\)?",
    c,0.011,
    "Expand: \\("+a+"(x - ("+h+"))^2 + ("+k+") = "+a+"(x^2 "+(mid>0?"+ "+mid+"x":mid<0?"- "+(-mid)+"x":"+ 0x")+" + "+(h*h)+") + ("+k+")\\)"+". The constant terms combine to \\("+a+" \\times "+(h*h)+" + ("+k+") = "+(a*h*h)+" + ("+k+") = \\)<b>\\("+c+"\\)</b>. (This is also the y-intercept: the value of the function at \\(x = 0\\).)",
    {a:a,h:h,k:k,c:c});
});
E("u2-vertex-form-from-graph",2,["4.15"],2,"gen",function(){
  var a=pick([1,-1]),h=ri(-4,4),k=ri(-6,8),tries=0;
  while((h===0||k===0)&&tries<40){h=ri(-4,4);k=ri(-6,8);tries++;}
  var b=-2*a*h,c=a*h*h+k;
  var q=mcq("The graph shows a parabola with its vertex marked. Which function has this graph?",
    vertT(a,h,k),
    [vertT(a,-h,k),vertT(-a,h,k),vertT(a,h,-k)],
    "Read the vertex from the marked point: \\(("+h+", "+k+")\\)"+". The parabola opens "+(a>0?"upward, so \\(a\\) is positive":"downward, so \\(a\\) is negative")+". Vertex form with vertex \\(("+h+", "+k+")\\) is <b>"+vertT(a,h,k)+"</b>.",
    {a:a,h:h,k:k});
  q.figure=parSVG(a,b,c,{labels:"values",marks:[{x:h,y:k}]});
  return q;
});
E("u2-expand-vertex-form",2,["4.15"],2,"gen",function(){
  var a=pick([2,3,-2]),h=ri(-5,5),k=ri(-8,9),tries=0;
  while(h===0&&tries<40){h=ri(-5,5);tries++;}
  var b=-2*a*h,c=a*h*h+k;
  while((c===0||k===-c)&&tries<80){k=ri(-8,9);c=a*h*h+k;tries++;}
  var mid=-2*h;
  function std(bb,cc){return "\\(y = "+quadB(a,bb,cc)+"\\)";}
  return mcq("Which function is \\(y = "+vertB(a,h,k)+"\\) written in standard form?",
    std(b,c),
    [std(-b,c),std(b,k),std(b,-c)],
    "Expand the square: \\((x - ("+h+"))^2 = x^2 "+(mid>0?"+ "+mid+"x":"- "+(-mid)+"x")+" + "+(h*h)+"\\)"+". Multiply by \\("+a+"\\) and add \\("+k+"\\)"+": the middle coefficient is \\("+a+" \\times ("+mid+") = "+b+"\\) and the constant is \\("+a+" \\times "+(h*h)+" + ("+k+") = "+c+"\\)"+". The standard form is <b>"+std(b,c)+"</b>.",
    {a:a,h:h,k:k,b:b,c:c});
});
/* --- 4.16: equation from characteristics --- */
E("u2-a-from-intercepts-point",2,["4.16"],3,"gen",function(){
  var p=ri(-6,-1),q=ri(1,6),a=pick([1,2,3,-1,-2]),xp=pick([0,1,-1]),tries=0;
  while(((xp===p||xp===q)||(xp===0&&a*p*q===0))&&tries<40){xp=pick([0,1,-1,2,-2]);tries++;}
  var yp=a*(xp-p)*(xp-q);
  return numq("A parabola has x-intercepts \\("+p+"\\) and \\("+q+"\\) and passes through the point \\(("+xp+", "+yp+")\\)"+". Its equation has the form \\(y = a(x - ("+p+"))(x - ("+q+"))\\)"+". What is the value of \\(a\\)?",
    a,0.011,
    "Substitute the point into the form: \\("+yp+" = a("+xp+" - ("+p+"))("+xp+" - ("+q+")) = a \\times "+(xp-p)+" \\times "+(xp-q)+" = "+((xp-p)*(xp-q))+"a\\)"+". Dividing, \\(a = \\frac{"+yp+"}{"+((xp-p)*(xp-q))+"} = \\)<b>\\("+a+"\\)</b>.",
    {p:p,q:q,a:a,xp:xp,yp:yp});
});
E("u2-equation-from-graph",2,["4.16"],1,"gen",function(){
  var a=pick([1,-1]),p=ri(-6,-1),q=ri(1,6),b=-a*(p+q),c=a*p*q;
  var qfig=mcq("The graph shows a parabola with its x-intercepts marked. Which equation has this graph?",
    factT(a,p,q),
    [factT(-a,p,q),factT(a,-p,-q),quadT(a,-b,c)],
    "The graph crosses the x-axis at \\(x = "+p+"\\) and \\(x = "+q+"\\)"+", so the factors are \\((x - ("+p+"))\\) and \\((x - ("+q+"))\\)"+". It opens "+(a>0?"upward, so the leading coefficient is positive":"downward, so the leading coefficient is negative")+". The equation is <b>"+factT(a,p,q)+"</b>. (The standard form shown as one option has the same intercepts' product but the wrong middle coefficient, so it is a different parabola.)",
    {a:a,p:p,q:q});
  qfig.figure=parSVG(a,b,c,{labels:"values",marks:[{x:p,y:0},{x:q,y:0}]});
  return qfig;
});
E("u2-eq-from-characteristics",2,["4.16"],2,"gen",function(){
  var a=pick([1,2,-1]),h=ri(-5,5),k=ri(-8,9),tries=0;
  while((h===0||k===0)&&tries<40){h=ri(-5,5);k=ri(-8,9);tries++;}
  return mcq("A quadratic function opens "+(a>0?"upward":"downward")+" and has vertex \\(("+h+", "+k+")\\)"+". Which function could it be?",
    vertT(a,h,k),
    [vertT(-a,h,k),vertT(a,-h,k),vertT(a,h,-k)],
    "The vertex \\(("+h+", "+k+")\\) goes into vertex form as \\(h = "+h+"\\) and \\(k = "+k+"\\)"+", and opening "+(a>0?"upward means \\(a > 0\\)":"downward means \\(a < 0\\)")+". Of the choices, only <b>"+vertT(a,h,k)+"</b> has that vertex and that opening.",
    {a:a,h:h,k:k});
});
E("u2-eq-from-table",2,["4.16"],3,"gen",function(){
  var a=pick([1,-1]),h=ri(-3,3),k=ri(-6,9),tries=0;
  while((k===0||h===0)&&tries<40){h=ri(-3,3);k=ri(-6,9);tries++;}
  var xs=[h-2,h-1,h,h+1,h+2],ys=xs.map(function(x){return a*(x-h)*(x-h)+k;});
  var tab="\\(\\begin{array}{c|ccccc} x & "+xs.join(" & ")+" \\\\ \\hline y & "+ys.join(" & ")+" \\end{array}\\)";
  return mcq("A quadratic function has the values in the table. "+tab+" Which equation gives the function?",
    vertT(a,h,k),
    [vertT(-a,h,k),vertT(a,-h,k),vertT(a,h,-k)],
    "The y-values are symmetric about the middle column, so the vertex is at \\(x = "+h+"\\) with value \\("+k+"\\)"+": the vertex is \\(("+h+", "+k+")\\)"+". Moving one step from the vertex changes \\(y\\) by \\("+(ys[3]-k)+"\\)"+", so \\(a = "+a+"\\)"+". The equation is <b>"+vertT(a,h,k)+"</b>.",
    {a:a,h:h,k:k,xs:xs,ys:ys});
});
E("u2-eq-intercepts-standard",2,["4.16"],2,"gen",function(){
  var a=pick([1,2,-1]),p=ri(-6,-1),q=ri(1,6),tries=0;
  while(p===-q&&tries<40){q=ri(1,6);tries++;}
  var b=-a*(p+q),c=a*p*q;
  function std(bb,cc){return "\\(y = "+quadB(a,bb,cc)+"\\)";}
  return mcq("A parabola has x-intercepts \\("+p+"\\) and \\("+q+"\\) and opens "+(a>0?"upward":"downward")+(Math.abs(a)>1?" with leading coefficient "+a:"")+". Which equation, in standard form, has this graph?",
    std(b,c),
    [std(-b,c),std(b,-c),factT(a,p,q)],
    "Start in factored form: \\(y = "+factB(a,p,q)+"\\)"+". Expanding, the middle coefficient is \\("+a+" \\times (-("+p+" + "+q+")) = "+b+"\\) and the constant is \\("+a+" \\times ("+(-p)+") \\times ("+(-q)+") = "+c+"\\)"+". In standard form the equation is <b>"+std(b,c)+"</b>. (The factored form listed is the same parabola, but the question asks for standard form.)",
    {a:a,p:p,q:q,b:b,c:c});
});
/* --- Prior knowledge additions (expansion, November 18, 2026) --- */
E("u2-pk-eval-quad",2,["4.1","4.2","4.10","4.11","4.12","4.13","4.14","4.15","4.16"],1,"gen",function(){
  var a=pick([2,3,-2]),b=ri(-9,9),c=ri(-12,12),x0=pick([-3,-2,-1,2,3]),tries=0;
  while(b===0&&tries<40){b=ri(-9,9);tries++;}
  var y0=a*x0*x0+b*x0+c;
  return numq("If \\(f(x) = "+quadB(a,b,c)+"\\), what is \\(f("+x0+")\\)?",
    y0,0.011,
    "Substitute \\(x = "+x0+"\\): \\[ \\begin{aligned} f("+x0+") &= "+a+"("+x0+")^2 + ("+b+")("+x0+") + ("+c+") \\\\ &= "+(a*x0*x0)+" + "+(b*x0)+" + ("+c+") \\\\ &= "+y0+" \\end{aligned} \\] So \\(f("+x0+") = \\)<b>\\("+y0+"\\)</b>.",
    {a:a,b:b,c:c,x0:x0,y0:y0});
});
E("u2-pk-table-value",2,["4.1","4.2","4.10","4.11","4.12","4.13","4.14","4.15","4.16"],1,"gen",function(){
  var m=pick([2,3,-2,-3]),bb=ri(-6,6),x0=ri(-4,5),tries=0;
  while(bb===0&&tries<40){bb=ri(-6,6);tries++;}
  var y0=m*x0+bb;
  var xs=[x0-2,x0-1,x0,x0+1,x0+2],ys=xs.map(function(x){return m*x+bb;});
  var tab="\\(\\begin{array}{c|ccccc} x & "+xs.join(" & ")+" \\\\ \\hline y & "+ys.join(" & ")+" \\end{array}\\)";
  return numq("The table shows values of a linear function. "+tab+" What is the value of the function when \\(x = "+(x0+7)+"\\)?",
    m*(x0+7)+bb,0.011,
    "The y-values change by \\("+m+"\\) for each step of \\(1\\) in \\(x\\), so the rate of change is \\("+m+"\\)"+". From \\(x = "+x0+"\\), where \\(y = "+y0+"\\), moving to \\(x = "+(x0+7)+"\\) is \\(7\\) steps: \\(y = "+y0+" + 7 \\times ("+m+") = \\)<b>\\("+(m*(x0+7)+bb)+"\\)</b>.",
    {m:m,bb:bb,x0:x0,y0:y0});
});
E("u2-pk-line-equation-from-graph",2,["4.1","4.2","4.10","4.11","4.12","4.13","4.14","4.15","4.16"],1,"gen",function(){
  var m=pick([1,2,-1,-2]),bb=ri(-5,5),tries=0;
  while((bb===0||bb===m)&&tries<40){bb=ri(-5,5);tries++;}
  function eq(mm,cc){return "\\(y = "+(mm===1?"":mm===-1?"-":mm)+"x "+(cc<0?"- "+(-cc):"+ "+cc)+"\\)";}
  var q=mcq("The graph shows a line. What is its equation?",
    eq(m,bb),
    [eq(-m,bb),eq(m,-bb),eq(bb,m)],
    "The line crosses the y-axis at \\("+bb+"\\)"+", so the constant term is \\("+bb+"\\)"+". From the intercept, the line rises \\("+m+"\\) for each step of \\(1\\) to the right, so the slope is \\("+m+"\\)"+". The equation is <b>"+eq(m,bb)+"</b>.",
    {m:m,bb:bb});
  q.figure=u2pkLineSVG({line:[m,1,bb],marks:[[0,bb]],aria:"Graph of a line"});
  return q;
});
E("u2-pk-line-x-intercept-graph",2,["4.1","4.2","4.10","4.11","4.12","4.13","4.14","4.15","4.16"],1,"gen",function(){
  var m=pick([1,2,-1,-2]),xi=pick([-4,-3,-2,-1,1,2,3,4]),bb=-m*xi;
  var q=numq("The graph shows a line. At what value of \\(x\\) does it cross the x-axis?",
    xi,0.011,
    "The line crosses the x-axis at the marked point, where \\(y = 0\\). Reading the mark on the axis, the crossing is at <b>\\(x = "+xi+"\\)</b>.",
    {m:m,bb:bb,xi:xi});
  q.figure=u2pkLineSVG({line:[m,1,bb],marks:[[xi,0]],aria:"Graph of a line crossing the x-axis"});
  return q;
});
E("u2-pk-dr-segment-graph",2,["4.1","4.2","4.10","4.11","4.12","4.13","4.14","4.15","4.16"],1,"gen",function(){
  var x1=pick([-4,-3,-2,-1]),x2=pick([2,3,4,5]),y1=ri(-4,4),y2=ri(-4,4),tries=0;
  while((y1===y2||(Math.min(y1,y2)===x1&&Math.max(y1,y2)===x2))&&tries<40){y1=ri(-4,4);y2=ri(-4,4);tries++;}
  var lo=Math.min(y1,y2),hi=Math.max(y1,y2);
  function dr(dx,rx){return "Domain: \\("+dx+"\\); Range: \\("+rx+"\\)";}
  var key=dr(x1+" \\leq x \\leq "+x2,lo+" \\leq y \\leq "+hi);
  var candS=[dr(lo+" \\leq x \\leq "+hi,x1+" \\leq y \\leq "+x2),
             dr(x1+" \\leq x \\leq "+x2,(lo-1)+" \\leq y \\leq "+(hi+1)),
             dr(y1+" \\leq x \\leq "+y2,lo+" \\leq y \\leq "+hi),
             dr((x1-1)+" \\leq x \\leq "+(x2-1),lo+" \\leq y \\leq "+hi)],ds=[];
  for(var ci=0;ci<candS.length&&ds.length<3;ci++){if(candS[ci]!==key&&ds.indexOf(candS[ci])<0)ds.push(candS[ci]);}
  var q=mcq("The graph shows a line segment with its endpoints marked. What are the domain and range of the segment?",
    key,ds,
    "The segment runs from \\(x = "+x1+"\\) to \\(x = "+x2+"\\)"+", so the domain is \\("+x1+" \\leq x \\leq "+x2+"\\)"+". Its lowest point has \\(y = "+lo+"\\) and its highest has \\(y = "+hi+"\\) (read from the two endpoints, \\(y = "+y1+"\\) and \\(y = "+y2+"\\))"+", so the range is \\("+lo+" \\leq y \\leq "+hi+"\\)"+". The domain and range are <b>"+key+"</b>.",
    {x1:x1,x2:x2,y1:y1,y2:y2});
  q.figure=u2pkLineSVG({seg:[[x1,y1],[x2,y2]],pts:[[x1,y1],[x2,y2]],aria:"Graph of a line segment"});
  return q;
});
E("u2-pk-scatter-dr",2,["4.1","4.2","4.10","4.11","4.12","4.13","4.14","4.15","4.16"],1,"gen",function(){
  var xs=shuffle([1,2,3,4,5,6,7]).slice(0,5).sort(function(u,v){return u-v;});
  var ys=xs.map(function(){return ri(1,9);});
  var xlo=xs[0],xhi=xs[xs.length-1],ylo=Math.min.apply(null,ys),yhi=Math.max.apply(null,ys),tries=0;
  while(ylo===xlo&&yhi===xhi&&tries<40){ys=xs.map(function(){return ri(1,9);});ylo=Math.min.apply(null,ys);yhi=Math.max.apply(null,ys);tries++;}
  var pts=xs.map(function(x,i){return [x,ys[i]];});
  function dr(dx,rx){return "Domain: "+dx+"; Range: "+rx;}
  var key=dr("\\(x\\) from "+xlo+" to "+xhi,"\\(y\\) from "+ylo+" to "+yhi);
  var ds=[dr("\\(x\\) from "+ylo+" to "+yhi,"\\(y\\) from "+xlo+" to "+xhi),
          dr("\\(x\\) from "+xlo+" to "+xhi,"\\(y\\) from "+xlo+" to "+xhi),
          dr("\\(x\\) from "+ylo+" to "+yhi,"\\(y\\) from "+ylo+" to "+yhi)];
  var q=mcq("The scatter plot shows data collected in an experiment, with \\(x\\) the input and \\(y\\) the output. Which statement describes the domain and range covered by the data?",
    key,ds,
    "The domain is covered by the x-values of the plotted points, which run from \\("+xlo+"\\) to \\("+xhi+"\\)"+". The range is covered by the y-values, which run from \\("+ylo+"\\) to \\("+yhi+"\\)"+". So: <b>"+key+"</b>.",
    {xs:xs,ys:ys});
  q.figure=u2pkLineSVG({pts:pts,xLab:"x",aria:"Scatter plot"});
  return q;
});
/* ============ Prior knowledge tranche (November 15, 2026) ============
   Cluster 2 (Quadratic Functions prerequisites), borrowed set.
   Provenance (host id: source entry in its home bank, the feeder
   indicator it assesses, verified by draw sweep):
   - u2-pk-graph-data: copied from math-1201 u4-graph-data, indicator 4.9.
   - u2-pk-domain-range: copied from math-1201 u4-domain-range, indicator 4.10.
   - u2-pk-dr-linear: copied from math-1201 u4-dr-linear, indicator 4.12.
   - u2-pk-intercepts: copied from math-1201 u4-intercepts, indicator 4.28.
   - u2-pk-eval-function: copied from math-1201 u4-eval-function, indicator 4.47.
   - u2-pk-solve-input: copied from math-1201 u4-solve-input, indicator 4.48
     (also copied into Unit 6 under its own host id).
   - u2-pk-graph-strategy: copied from math-1201 u5-graph-strategy, indicator 4.34
     (that entry sits in the feeder's Unit 5 file but carries a Unit 4 code;
     it is copied by indicator, as the spec directs).
   - u2-pk-graph-form: copied from math-1201 u5-graph-form, indicator 4.35.
   The u4 and u5 helper families were copied into bank-helpers.js
   with the tranche. Indicator tags are support tags, not assessed
   targets: assessed targets are in pkSrc, the full dependent list
   in pkFor. */
E("u2-pk-graph-data", 2, ["4.1"], 1, "gen",function(){
  var profs=[
    {name:"A weather station records the day number of a study and the high temperature that day, in degrees",xlab:"day",ylab:"temperature"},
    {name:"A coach records the week number of a training plan and the number of laps the team swam that week",xlab:"week",ylab:"laps"},
    {name:"A shop records the number of hours since opening and the number of loaves sold so far that day",xlab:"hours",ylab:"loaves"},
    {name:"A class records the number of school days since seeds were planted and the average seedling height, in centimetres",xlab:"days",ylab:"height"}
  ];
  var prof=pick(profs);
  var xs=shuffle([1,2,3,4,5,6,7]).slice(0,4).sort(function(a,b){return a-b;});
  var ys=[];while(ys.length<4){var y=ri(3,28);if(ys.indexOf(y)<0)ys.push(y);}
  var askRange=Math.random()<0.5;
  var vals=askRange?ys.slice().sort(function(a,b){return a-b;}):xs;
  var other=askRange?xs:ys.slice().sort(function(a,b){return a-b;});
  var key="\\("+u4setS(vals)+"\\)";
  var alt=vals.slice();alt[alt.length-1]=alt[alt.length-1]+2;
  var short=vals.slice(0,3);
  var ds=u4pickS3(key,["\\("+u4setS(other)+"\\)","\\("+u4setS(alt)+"\\)","\\("+u4setS(short)+"\\)"]);
  var pairs=xs.map(function(x,i){return [x,ys[i]];});
  return mcq(prof.name+". The data points are \\("+u4pairsS(pairs)+"\\), where the first coordinate is the "+prof.xlab+" value and the second is the "+prof.ylab+" value. What is the <b>"+(askRange?"range":"domain")+"</b> of this relation?",
    key,ds,
    "The domain is the set of first coordinates and the range is the set of second coordinates. From \\("+u4pairsS(pairs)+"\\), the "+(askRange?"second":"first")+" coordinates are \\("+vals.join(", ")+"\\). The <b>"+(askRange?"range":"domain")+" is \\("+u4setS(vals)+"\\)</b>.",
    {profName:prof.name,asked:askRange?"range":"domain",xs:xs,ys:ys,keyStr:key});
});
E("u2-pk-domain-range", 2, ["4.1"], 1, "gen",function(){
  var useTable=Math.random()<0.5;
  var xs=shuffle([0,1,2,3,4,5,6,7,8,9]).slice(0,4);
  var ys=[];while(ys.length<4){var y=ri(1,18);if(ys.indexOf(y)<0)ys.push(y);}
  var pairs=xs.map(function(x,i){return [x,ys[i]];});
  var dom=xs.slice(),rng=ys.slice();
  function drStr(d,r){return "Domain: \\("+u4setS(d)+"\\); range: \\("+u4setS(r)+"\\)";}
  var key=drStr(dom,rng);
  var altR=rng.slice();altR[0]=altR[0]+3;while(dom.indexOf(altR[0])>=0&&rng.indexOf(altR[0])>=0)altR[0]++;
  var ds=u4pickS3(key,[drStr(rng,dom),drStr(dom,altR),drStr(xs.slice(0,3),rng)]);
  var shown=useTable?("A table of values has \\(x\\) values \\("+xs.join(", ")+"\\) with matching \\(y\\) values, in the same order, \\("+ys.join(", ")+"\\)"):("A relation is given by the set of ordered pairs \\("+u4pairsS(pairs)+"\\)");
  return mcq(shown+". Which choice gives the domain and the range of this relation?",
    key,ds,
    "Collect the first coordinates for the domain and the second coordinates for the range, listing each value once: \\[ \\begin{aligned} \\text{Domain} &= "+u4setS(dom)+" \\\\ \\text{Range} &= "+u4setS(rng)+" \\end{aligned} \\] The domain and range are <b>domain \\("+u4setS(dom)+"\\) and range \\("+u4setS(rng)+"\\)</b>.",
    {pairs:pairs,dom:dom,rng:rng,keyStr:key});
});
E("u2-pk-dr-linear", 2, ["4.1"], 1, "gen",function(){
  var x1=ri(-6,2),x2=x1+ri(3,9);
  var m=pick([-2,-1,1,2]),b=ri(-5,6);
  var y1=m*x1+b,y2=m*x2+b;
  var askRange=Math.random()<0.5;
  var lo=askRange?Math.min(y1,y2):x1, hi=askRange?Math.max(y1,y2):x2;
  var vname=askRange?"y":"x";
  var key=u4interval(vname,lo,hi);
  var oLo=askRange?x1:Math.min(y1,y2), oHi=askRange?x2:Math.max(y1,y2), oV=askRange?"x":"y";
  var ds=u4pickS3(key,[u4interval(oV,oLo,oHi),u4interval(vname,lo,hi+2),u4interval(vname,lo-1,hi)]);
  return mcq("The graph of a linear relation is the line segment joining the points \\("+u4pairS(x1,y1)+"\\) and \\("+u4pairS(x2,y2)+"\\), including both endpoints. What is the <b>"+(askRange?"range":"domain")+"</b> of this relation?",
    key,ds,
    "On a line segment, the domain runs from the smallest to the largest first coordinate and the range runs from the smallest to the largest second coordinate. The endpoints give \\(x\\) from \\("+x1+"\\) to \\("+x2+"\\) and \\(y\\) from \\("+Math.min(y1,y2)+"\\) to \\("+Math.max(y1,y2)+"\\): \\[ \\begin{aligned} \\text{Domain} &: "+x1+" \\le x \\le "+x2+" \\\\ \\text{Range} &: "+Math.min(y1,y2)+" \\le y \\le "+Math.max(y1,y2)+" \\end{aligned} \\] The <b>"+(askRange?"range":"domain")+" is "+key+"</b>.",
    {x1:x1,x2:x2,y1:y1,y2:y2,asked:askRange?"range":"domain",keyStr:key});
});
E("u2-pk-intercepts", 2, ["4.4"], 1, "gen",function(){
  var askX=false;
  var m=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]);
  var xi=ri(-9,9);while(xi===0)xi=ri(-9,9);
  var b=-m*xi;
  var ans=askX?xi:b;
  var eq="y = "+u4lin(m,b);
  var sol=askX?
    "The \\(x\\)-intercept is where the graph meets the horizontal axis, so set the output to zero and solve: \\[ \\begin{aligned} 0 &= "+u4lin(m,b)+" \\\\ "+(-b)+" &= "+u4num(m)+"x \\\\ x &= "+xi+" \\end{aligned} \\] The \\(x\\)-intercept is <b>\\("+xi+"\\)</b>, at the point \\("+u4pairS(xi,0)+"\\)":
    "The \\(y\\)-intercept is where the graph meets the vertical axis, so use an input of zero: \\[ \\begin{aligned} y &= "+u4lin(m,b)+" \\\\ y &= "+u4num(m)+"(0) + ("+b+") \\\\ &= "+b+" \\end{aligned} \\] The \\(y\\)-intercept is <b>\\("+b+"\\)</b>, at the point \\("+u4pairS(0,b)+"\\)";
  return numq("A linear relation is given by the equation \\("+eq+"\\). What is the value of the "+(askX?"\\(x\\)-intercept":"\\(y\\)-intercept")+" of its graph?",
    ans,0.011,sol,{askX:askX,m:m,b:b,ans:ans});
});
E("u2-pk-eval-function", 2, ["4.1"], 1, "gen",function(){
  var fn=pick(["f","g","h"]);
  var m=pick([-4,-3,-2,-1,1,2,3,4,5]),b=ri(-9,10),x0=ri(-5,8);
  var ans=m*x0+b;
  return numq("A linear function is given by \\("+fn+"(x) = "+u4lin(m,b)+"\\). What is the value of \\("+fn+"("+x0+")\\)?",
    ans,0.011,
    "Substitute the given domain value into the function and simplify: \\[ \\begin{aligned} "+fn+"("+x0+") &= "+u4num(m)+"("+x0+") + ("+b+") \\\\ &= "+u4num(m*x0)+" + ("+b+") \\\\ &= "+ans+" \\end{aligned} \\] The value is <b>\\("+ans+"\\)</b>.",
    {fn:fn,m:m,b:b,x0:x0,ans:ans});
});
E("u2-pk-solve-input", 2, ["4.4"], 2, "gen",function(){
  var fn=pick(["f","g","h"]);
  var m=pick([-4,-3,-2,-1,1,2,3,4,5]),b=ri(-9,10),xAns=ri(-6,9);
  var target=m*xAns+b;
  return numq("A linear function is given by \\("+fn+"(x) = "+u4lin(m,b)+"\\). For what domain value is \\("+fn+"(x) = "+target+"\\)?",
    xAns,0.011,
    "Set the function equal to the given range value and solve for the input: \\[ \\begin{aligned} "+u4lin(m,b)+" &= "+target+" \\\\ "+u4num(m)+"x &= "+(target-b)+" \\\\ x &= "+xAns+" \\end{aligned} \\] The domain value is <b>\\("+xAns+"\\)</b>.",
    {fn:fn,m:m,b:b,target:target,ans:xAns});
});
E("u2-pk-graph-strategy", 2, ["4.14"], 1, "var",varset([
  function(){var key="Plot the y-intercept first, then use the slope as rise over run to find another point and draw the line";
    return mcq("Which strategy graphs a linear relation given in slope-intercept form?",
    key,
    ["Plot the x-intercept first, then use the intercept as rise over run to find another point and draw the line",
     "Plot both intercepts first, then use the slope as rise over run to confirm a point and draw the line",
     "Plot a point from the equation first, then read the slope off the axes to find the intercept and draw the line"],
    "Slope-intercept form states the y-intercept and the slope directly, so the natural strategy is to plot the intercept, then step out the slope to a second point. The strategy is: <b>plot the y-intercept, then use the slope as rise over run</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Find the two intercepts by setting each variable to zero in turn, plot those two points, and draw the line";
    return mcq("Which strategy graphs a linear relation given in general form, using the intercepts directly?",
    key,
    ["Find the two intercepts by setting each variable to one in turn, plot those two points, and draw the line through them",
     "Find the one intercept by setting both variables to zero in turn, plot that one point, and draw the line",
     "Find the two intercepts by reading each coefficient in turn, plot those two points, and draw the line"],
    "In general form neither the slope nor an intercept is stated directly, but setting \\(x = 0\\) gives the y-intercept and setting \\(y = 0\\) gives the x-intercept. Two points fix a line, so the strategy is: <b>find both intercepts, plot them, and draw the line</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Plot the given point first, then use the slope as rise over run to reach another point and draw the line";
    return mcq("Which strategy graphs a linear relation given in slope-point form?",
    key,
    ["Plot the given intercept first, then use the slope as rise over run to reach another point and draw the line",
     "Plot the given point first, then use the intercept as rise over run to reach another point and draw the line",
     "Plot the given point first, then use the run over rise of the slope to reach a point and draw the line"],
    "Slope-point form states one point on the line and the slope directly, so the natural strategy is to plot that point, then step out the slope to a second point. The strategy is: <b>plot the given point, then use the slope as rise over run</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The form decides the first step: an intercept and slope, a stated point and slope, or the two intercepts for general form";
    return mcq("A student must graph three relations, one in each of slope-intercept, slope-point and general form. Which statement about strategy is correct?",
    key,
    ["The form decides the first step: the two intercepts in every case, since each form is graphed from its intercepts alone",
     "The form decides the last step: an intercept and slope, a stated point and slope, or the two intercepts for general form",
     "The form changes nothing about strategy: an intercept and slope, a stated point and slope, or two intercepts for general form"],
    "Each form hands over different starting information. Slope-intercept form gives an intercept and a slope, slope-point form gives a point and a slope, and general form is handled most directly through its two intercepts. So <b>the form decides the first step</b> of the graphing strategy.",
    {stmt:true,keyText:key});}
]));
E("u2-pk-graph-form", 2, ["4.14"], 2, "gen",function(){
  var mode=ri(1,3);
  if(mode===1){
    var s=u5pickSlope(),mN=s[0],mD=s[1];
    var xi=mD*ri(1,4)*(pick([-1,1]));if(xi===0)xi=mD;
    var b=-(mN*xi)/mD; /* integer since xi is a multiple of mD */
    var key=""+xi;
    var ds=u5pickD3(xi,[-xi,b,-b,xi+1,xi-1]).map(function(v){return ""+v;});
    return mcq("A linear relation is given in slope-intercept form as \\("+u5ybRaw(mN,mD,b)+"\\) (given in the form \\(y = mx + b\\)). Using the strategy for this form, the line is plotted from its intercept and slope. What is the x-intercept of its graph?",
      key,ds,
      "The x-intercept is where \\(y = 0\\). Set \\(y\\) to \\(0\\) and solve: \\[ \\begin{aligned} 0 &= "+u5coef(mN,mD,"x")+(b>0?" + "+b:b<0?" - "+(-b):"")+" \\\\ x &= "+xi+" \\end{aligned} \\] The x-intercept is <b>\\("+xi+"\\)</b>.",
      {mode:mode,mN:mN,mD:mD,b:b,ansVal:xi});
  }
  if(mode===2){
    var s2=u5pickSlope(),mN2=s2[0],mD2=s2[1],b2=ri(-9,9);
    var g=u5genFromLine(mN2,mD2,b2),A=g[0],B=g[1],C=g[2];
    var targetY=pick([true,false]);
    var ansVal=targetY?b2:(-C/A); /* x-intercept: integer? A divides C check below handled by construction */
    if(!targetY&&C%A!==0){targetY=true;ansVal=b2;}
    var key2=""+ansVal;
    var ds2=u5pickD3(ansVal,[-ansVal,ansVal+2,ansVal-2,b2,-b2]).map(function(v){return ""+v;});
    return mcq("A linear relation is given in general form as \\("+u5genRaw(A,B,C)+"\\) (given in the form \\(Ax + By + C = 0\\)). Using the intercept strategy for this form, what is the "+(targetY?"y-intercept":"x-intercept")+" of its graph?",
      key2,ds2,
      (targetY?
        "The y-intercept is where \\(x = 0\\). Setting \\(x = 0\\) leaves \\("+B+"y "+(C>0?"+ "+C:C<0?"- "+(-C):"")+" = 0\\), which gives \\(y = "+ansVal+"\\).":
        "The x-intercept is where \\(y = 0\\). Setting \\(y = 0\\) leaves \\("+A+"x "+(C>0?"+ "+C:C<0?"- "+(-C):"")+" = 0\\), which gives \\(x = "+ansVal+"\\).")+
      " The "+(targetY?"y-intercept":"x-intercept")+" is <b>\\("+ansVal+"\\)</b>.",
      {mode:mode,A:A,B:B,C:C,targetY:targetY,ansVal:ansVal});
  }
  var s3=u5pickSlope(),mN3=s3[0],mD3=s3[1];
  var x1=mD3*ri(-2,3),y1=ri(-8,10),b3=y1-(mN3*x1)/mD3;
  var key3=""+b3;
  var ds3=u5pickD3(b3,[-b3,b3+2,b3-2,y1,-y1]).map(function(v){return ""+v;});
  var lhs=u5minusTerm("y",y1),rhs=u5coef(mN3,mD3,"")+"("+u5minusTerm("x",x1)+")";
  if(u5coef(mN3,mD3,"")==="1")rhs="("+u5minusTerm("x",x1)+")";else if(u5coef(mN3,mD3,"")==="-1")rhs="-("+u5minusTerm("x",x1)+")";else if(u5red(mN3,mD3)[1]===1)rhs=u5red(mN3,mD3)[0]+"("+u5minusTerm("x",x1)+")";else rhs=u5fs(mN3,mD3)+"("+u5minusTerm("x",x1)+")";
  return mcq("A linear relation is given in slope-point form as \\("+lhs+" = "+rhs+"\\) (given in the form \\(y - y_1 = m(x - x_1)\\)). The line is plotted from the stated point and slope. What is the y-intercept of its graph?",
    key3,ds3,
    "The stated point is \\("+u5pt(x1,y1)+"\\) and the slope is \\("+u5fs(mN3,mD3)+"\\). Work back to where \\(x = 0\\): \\[ \\begin{aligned} b &= y_1 - m x_1 \\\\ &= "+y1+" - ("+u5fs(mN3,mD3)+")("+x1+") \\\\ &= "+b3+" \\end{aligned} \\] The y-intercept is <b>\\("+b3+"\\)</b>.",
    {mode:mode,mN:mN3,mD:mD3,x1:x1,y1:y1,ansVal:b3});
});
/* PK tranche pass for Unit 2. pkFor is Cluster 2's dependent
   indicator list from the prior knowledge map. */
var PKT_U2_FOR=["4.1","4.2","4.10","4.11","4.12","4.13","4.14","4.15","4.16"];
var PKT_U2={
 "u2-pk-graph-data":{src:"math-1201:4.9",group:"graphing-data"},
 "u2-pk-domain-range":{src:"math-1201:4.10",group:"domain-range"},
 "u2-pk-dr-linear":{src:"math-1201:4.12",group:"domain-range"},
 "u2-pk-intercepts":{src:"math-1201:4.28",group:"intercepts"},
 "u2-pk-eval-function":{src:"math-1201:4.47",group:"substitution"},
 "u2-pk-solve-input":{src:"math-1201:4.48",group:"substitution"},
 "u2-pk-graph-strategy":{src:"math-1201:4.34",group:"graph-forms"},
 "u2-pk-graph-form":{src:"math-1201:4.35",group:"graph-forms"},
 "u2-pk-eval-quad":{src:"math-1201:4.47",group:"substitution"},
 "u2-pk-table-value":{src:"math-1201:4.47",group:"substitution"},
 "u2-pk-line-equation-from-graph":{src:"math-1201:4.35",group:"graph-forms"},
 "u2-pk-line-x-intercept-graph":{src:"math-1201:4.12",group:"intercepts"},
 "u2-pk-dr-segment-graph":{src:"math-1201:4.10",group:"domain-range"},
 "u2-pk-scatter-dr":{src:"math-1201:4.9",group:"graphing-data"}};
BANK.forEach(function(e){var t=PKT_U2[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U2_FOR.slice();e.pkGroup=t.group;}});

/* ----- bank-u3.js ----- */
// Math 2201 Unit 3: Quadratic Equations question bank
// Cut verbatim from the standalone app's served file
// (math-2201-review/Math2201Review.html, lines 1363 to 1405).
// CRMARKS: u3-factor-solve=2
// CRMARKS: u3-formula=2
// CRMARKS: u3-context-area=3
// CRMARKS: u3-discriminant-value=1
// CRMARKS: u3-equal-roots-constant=2
// CRMARKS: u3-solve-nonmonic=2
// CRMARKS: u3-solve-rearrange=2
// CRMARKS: u3-formula-negative-a=2
// CRMARKS: u3-formula-ground=2
// CRMARKS: u3-other-root=1
// CRMARKS: u3-sum-squares-solve=2
// CRMARKS: u3-right-triangle-legs=2
/* ============ Unit 3: Quadratic Equations ============ */
E("u3-factor-solve",3,["4.8"],2,"gen",function(){
  var p=ri(-8,-1),q=ri(1,9);var b=-(p+q),c=p*q;var askBig=Math.random()<0.5;
  return numq("Solve by factoring: "+"\\("+quadB(1,b,c)+" = 0\\)"+". Give the "+(askBig?"larger":"smaller")+" root.",
    askBig?q:p,0.011,"Factor: \\((x "+(p>0?"- "+p:"+ "+(-p))+")(x "+(q>0?"- "+q:"+ "+(-q))+") = 0\\), so \\(x = "+p+"\\) or \\(x = "+q+"\\) (check by substituting back). The "+(askBig?"larger":"smaller")+" root is <b>\\("+(askBig?q:p)+"\\)</b>.",{p:p,q:q,askBig:askBig});
});
E("u3-formula",3,["4.9"],2,"gen",function(){
  var a=pick([1,1,2]),b=ri(-9,9)||3,c=ri(-8,8)||-4;var D=b*b-4*a*c,guard=0;
  while((D<=0||Math.sqrt(D)===Math.floor(Math.sqrt(D)))&&guard++<60){b=ri(-9,9)||3;c=ri(-8,8)||-4;D=b*b-4*a*c;}
  var r1=(-b+Math.sqrt(D))/(2*a),r2=(-b-Math.sqrt(D))/(2*a);var big=Math.max(r1,r2);
  return numq("Use the quadratic formula to solve "+"\\("+quadB(a,b,c)+" = 0\\)"+". Give the larger root, to two decimal places.",
    Math.round(big*100)/100,0.011,"\\(D = b^2 - 4ac = "+D+"\\). \\(x = \\frac{"+(-b)+" \\pm \\sqrt{"+D+"}}{"+(2*a)+"}\\), giving \\(x \\approx "+fmt(r1)+"\\) or \\(x \\approx "+fmt(r2)+"\\). The larger root is <b>\\("+fmt(big)+"\\)</b>.",{a:a,b:b,c:c,D:D});
});
E("u3-discriminant",3,["4.7"],2,"var",varset([
  function(){
  var kind=pick(["two","one","zero"]);var a=pick([1,2]),b,c,D;
  if(kind==="one"){b=pick([4,6]);c=b*b/(4*a);D=0;}
  else if(kind==="two"){b=ri(3,9);c=ri(-6,3);D=b*b-4*a*c;if(D<=0){c=-5;D=b*b-4*a*c;}}
  else{b=ri(1,4);c=ri(3,9);D=b*b-4*a*c;if(D>=0){b=1;c=9;D=1-4*a*9;}}
  var correct=kind==="two"?"Two x-intercepts \u2014 the discriminant is positive":kind==="one"?"One x-intercept \u2014 the discriminant is zero":"No x-intercepts \u2014 the discriminant is negative";
  return mcq("How many x-intercepts does the graph of \\(y = "+quadB(a,b,c)+"\\) have?",correct,
    ["Two x-intercepts \u2014 the discriminant is positive","One x-intercept \u2014 the discriminant is zero","No x-intercepts \u2014 the discriminant is negative","It is impossible to tell without graphing"].filter(function(s){return s!==correct;}),
    "Discriminant: \\(b^2 - 4ac = "+(b*b)+" - "+(4*a*c)+" = "+D+"\\). "+(D>0?"Positive, so the parabola crosses the x-axis twice.":D===0?"Zero, so the vertex just touches the x-axis \u2014 one intercept (a repeated root).":"Negative, so the parabola never reaches the x-axis."),{a:a,b:b,c:c,D:D});
},
  function(){
  var kind=pick(["two","one","zero"]);var a=pick([1,2]),b,c,D;
  if(kind==="one"){b=pick([4,6]);c=b*b/(4*a);D=0;}
  else if(kind==="two"){b=ri(3,9);c=ri(-6,3);D=b*b-4*a*c;if(D<=0){c=-5;D=b*b-4*a*c;}}
  else{b=ri(1,4);c=ri(3,9);D=b*b-4*a*c;if(D>=0){b=1;c=9;D=1-4*a*9;}}
  var correct=kind==="two"?"Two x-intercepts \u2014 the discriminant is positive":kind==="one"?"One x-intercept \u2014 the discriminant is zero":"No x-intercepts \u2014 the discriminant is negative";
  var qfig=mcq("How many x-intercepts does the parabola shown in the graph have?",correct,
    ["Two x-intercepts \u2014 the discriminant is positive","One x-intercept \u2014 the discriminant is zero","No x-intercepts \u2014 the discriminant is negative","It is impossible to tell without graphing"].filter(function(s){return s!==correct;}),
    "Discriminant: \\(b^2 - 4ac = "+(b*b)+" - "+(4*a*c)+" = "+D+"\\). "+(D>0?"Positive, so the parabola crosses the x-axis twice.":D===0?"Zero, so the vertex just touches the x-axis \u2014 one intercept (a repeated root).":"Negative, so the parabola never reaches the x-axis."),{a:a,b:b,c:c,D:D});
  var mk=[];if(D>0){var sq=Math.sqrt(D);mk=[{x:(-b-sq)/(2*a),y:0},{x:(-b+sq)/(2*a),y:0}];}else if(D===0){mk=[{x:-b/(2*a),y:0}];}
  qfig.figure=parSVG(a,b,c,{labels:"values",marks:mk});
  return qfig;
}
]));
E("u3-roots-zeros",3,["4.6"],1,"var",varset([
  figArm(function(){return mcq("The equation \\(x^2 - 5x + 6 = 0\\) has roots \\(2\\) and \\(3\\). What does that say about the function \\(f(x) = x^2 - 5x + 6\\)?",
    "Its zeros are \\(2\\) and \\(3\\), and its graph crosses the x-axis at \\((2, 0)\\) and \\((3, 0)\\)",
    ["Its vertex is at \\((2, 3)\\), because the two roots become the coordinates of the turning point","Its y-intercept is \\(6\\) and its maximum is \\(3\\), so the graph never crosses the x-axis at all","Its zeros are \\(-2\\) and \\(-3\\), because finding the zeros changes the sign of each root"],
    "Roots of the equation, zeros of the function and x-intercepts of the graph are three names for the same numbers \u2014 where the function\u2019s value is \\(0\\).",{});},figRootsZeros1),
  figArm(function(){return mcq("A quadratic function\u2019s graph touches the x-axis at exactly one point. What is true of the corresponding equation?",
    "It has one root, repeated \u2014 the discriminant is zero",
    ["It has two different roots, as most quadratics do","It has no roots at all, because touching is not the same as crossing","Its discriminant is positive, as it is whenever a graph meets the axis"],
    "Touching at one point means one x-intercept, which matches a repeated root and \\(D = 0\\).",{});},figRootsZeros2),
  figArm(function(){return mcq("The graph of a quadratic function crosses the x-axis at \\(x = -4\\) and \\(x = 1\\). What are the roots of the corresponding quadratic equation?",
    "\\(-4\\) and \\(1\\) \u2014 the x-intercepts of the graph are exactly the roots of the equation",
    ["\\(4\\) and \\(-1\\), the opposite signs, because the roots change sign when read from the graph","There are no roots, because the graph crosses the axis instead of touching it","Only \\(1\\) \u2014 a root cannot be negative, so the crossing at \\(-4\\) does not count as a root"],
    "Roots of the equation, zeros of the function and x-intercepts of the graph are the same numbers, signs included.",{});},figRootsZeros3)
]));
E("u3-context-area",3,["4.3"],2,"gen",function(){
  var w=ri(3,15),d=ri(2,12);var A=w*(w+d);
  var obj=pick(["garden","patio","deck","vegetable plot","parking pad"]);
  var q=numq("A rectangular "+obj+"'s length is "+d+" m more than its width. Its area is \\("+A+"\\text{ m}^2\\). What is the width, in metres?",
    w,0.011,"Let the width be \\(w\\). Then \\[\\begin{aligned} w(w + "+d+") &= "+A+" \\\\ w^2 + "+d+"w - "+A+" &= 0 \\\\ (w + "+(w+d)+")(w - "+w+") &= 0 \\end{aligned}\\] The roots are \\(w = "+w+"\\) and \\(w = -"+(w+d)+"\\); a width cannot be negative, so the width is <b>\\("+w+"\\) m</b>.",{w:w,d:d});
  q.figure=rectDiagSVG("w m","w + "+d+" m","Area = "+A+" m\u00B2");
  return q;
});

/* ============ Prior knowledge tranche (November 15, 2026) ============
   Cluster 3 (Quadratic Equations prerequisites), borrowed support
   set. The cluster's factoring core is the guide-named PK.2 family
   in bank-fix.js, which stays coded and untouched; these four
   borrowed entries sample the cluster's other named prerequisites.
   Provenance (host id: source entry in its home bank, the feeder
   indicator it assesses, verified by draw sweep):
   - u3-pk-gcf: copied from math-1201 u3-gcf, indicator 3.10.
   - u3-pk-binom-tri-expand: copied from math-1201 u3-binom-tri-expand, indicator 3.4.
   - u3-pk-solve-two-step: copied from math-9 u5-solve-two-step, indicator 8.18
     (a shared source: the same generator is also copied into Units 4 and 8
     under their own host ids, because equation solving underpins all three).
   - u3-pk-radical-mixed: copied from math-1201 u2-radical-mixed, indicator 1.16
     (also copied into Unit 4 under its own host id). DEVIATION from the
     source, this host copy only: the generator's radical index is fixed
     at 2 (square roots only), because Unit 3 readiness needs square-root
     simplification for the quadratic formula and quadratic roots, not
     cube or fourth roots (Jason's ruling, November 15, 2026). The
     math-1201 source and the Unit 4 host copy keep the full index range.
   The u3 and u2 helper families these entries call were copied into
   bank-helpers.js with the tranche. Indicator tags are support tags,
   not assessed targets: assessed targets are in pkSrc, the full
   dependent list in pkFor. */
E("u3-pk-gcf", 3, ["4.8"], 2, "gen", function () {
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
E("u3-pk-binom-tri-expand", 3, ["4.8"], 2, "gen", function () {
  var A = [ri(1, 3), u3Nz(-5, 5)];
  var B = [ri(1, 3), u3Nz(-5, 5), u3Nz(-6, 6)];
  var prod = u3Conv(A, B), keyRaw = u3PC(prod, "x");
  var partials = u3Mul(u3TermsOf(A, "x"), u3TermsOf(B, "x"));
  var prompt = "Expand and simplify \\(" + u3Par(A, "x") + u3Par(B, "x") + "\\).";
  var sol = "Multiply each term of the binomial by each of the three terms of the trinomial, giving six partial products, then combine like terms." +
    u3Alg([u3Par(A, "x") + u3Par(B, "x") + " &= " + u3StrSeq(partials), "&= " + keyRaw]) +
    "The expanded form is **" + u3M(keyRaw) + "**.";
  return mcq(prompt, u3M(keyRaw), u3DistrCoeffs(prod, "x", 3), sol,
    { t: "expand", P: u3TermsOf(A, "x"), Q: u3TermsOf(B, "x") });
});
E("u3-pk-solve-two-step", 3, ["4.8"], 2, "gen", function () {
  var form = ri(0, 2);
  if (form === 0) {
    var a = ri(2, 9), x0 = ri(-9, 9); if (x0 === 0) x0 = 4;
    var b = ri(-12, 12); if (b === 0) b = 5;
    var c = a * x0 + b;
    var sol = "Undo the constant first, then undo the multiplication: \\[ \\begin{aligned} " + u5lin(a, b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(c - b) + " \\\\ x &= " + fmt(x0) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x0) + "\\)</b>.";
    return numq("Solve the equation \\(" + u5lin(a, b) + " = " + fmt(c) + "\\). What is the value of \\(x\\)?", x0, 0.01, sol, { mode: "ax+b", a: a, b: b, c: c });
  }
  if (form === 1) {
    var a2 = ri(2, 6), k = ri(-6, 6); if (k === 0) k = 3;
    var x1 = a2 * k, b2 = ri(-9, 9); if (b2 === 0) b2 = -4;
    var c2 = k + b2;
    var sol2 = "Undo the constant first, then undo the division: \\[ \\begin{aligned} " + FR("x", a2) + (b2 >= 0 ? "+" + fmt(b2) : "-" + fmt(-b2)) + " &= " + fmt(c2) + " \\\\ " + FR("x", a2) + " &= " + fmt(k) + " \\\\ x &= " + fmt(x1) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x1) + "\\)</b>.";
    return numq("Solve the equation \\(" + FR("x", a2) + (b2 >= 0 ? " + " + fmt(b2) : " - " + fmt(-b2)) + " = " + fmt(c2) + "\\). What is the value of \\(x\\)?", x1, 0.01, sol2, { mode: "x/a+b", a: a2, b: b2, c: c2 });
  }
  var x2 = ri(-8, 8); if (x2 === 0) x2 = 5;
  var a3 = ri(3, 9), c3 = ri(2, a3 - 1), b3 = (a3 - c3) * x2;
  var sol3 = "Collect the x terms on one side first: \\[ \\begin{aligned} " + fmt(a3) + "x &= " + u5lin(c3, b3) + " \\\\ " + fmt(a3 - c3) + "x &= " + fmt(b3) + " \\\\ x &= " + fmt(x2) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x2) + "\\)</b>.";
  return numq("Solve the equation \\(" + fmt(a3) + "x = " + u5lin(c3, b3) + "\\). What is the value of \\(x\\)?", x2, 0.01, sol3, { mode: "ax=cx+b", a: a3, b: b3, c: c3 });
}, ["Undo the operations in reverse order: deal with the constant term before the term attached to x.", "First isolate the x term on one side, using the same operation on both sides."]);
E("u3-pk-radical-mixed", 3, ["4.9"], 1, "gen",function(){
  var idx=2,k,m,N,mlist;
  if(idx===2){k=ri(2,15);mlist=[2,3,5,6,7,10,11,13,14,15,17,19,21,22,23,26,29,30,31,33,34,35,37,38,39];}
  else if(idx===3){k=ri(2,7);mlist=[2,3,4,5,6,7,9,10,11,12,13,14,15,17,18,19,20,21,22,23,25,26,28,29,30,31,33,34,35,36,37,38,39,41,42];}
  else{k=ri(2,4);mlist=[2,3,4,5,6,7,8,9,10,11,12,13,14,15,17,18,19,20,22,24,25,26,27,28,29,30,31];}
  m=pick(mlist);N=Math.pow(k,idx)*m;
  var key="\\("+k+u2radS(idx,m)+"\\)";
  var mAlt=pick(mlist.filter(function(x){return x!==m;}));
  var cands=["\\("+(k+1)+u2radS(idx,m)+"\\)","\\("+k+u2radS(idx,mAlt)+"\\)","\\("+(k*k)+u2radS(idx,m)+"\\)"];
  if(k>2)cands.push("\\("+(k-1)+u2radS(idx,m)+"\\)");
  cands.push("\\("+k+u2radS(idx,m*2)+"\\)");
  var ds=u2pickS3(key,cands);
  return mcq("Express \\("+u2radS(idx,N)+"\\) as a <b>mixed radical</b> in simplest form.",
    key,ds,
    "Pull out the largest perfect "+(idx===2?"square":idx===3?"cube":"fourth power")+" factor of \\("+N+"\\): \\["+
    "\\begin{aligned} "+u2radS(idx,N)+" &= "+u2radS(idx,Math.pow(k,idx)+" \\times "+m)+" \\\\ &= "+k+u2radS(idx,m)+" \\end{aligned} \\]"+
    " The mixed radical in simplest form is <b>\\("+k+u2radS(idx,m)+"\\)</b>.",
    {idx:idx,k:k,m:m,N:N});
});
/* ============ Expansion (November 18, 2026) ============
   Bank expansion programme, Unit 3 pass: 12 new indicator templates
   and 4 new prior knowledge templates, authored new (new question
   shapes, contexts and solution paths, not re-skins of the entries
   above). Before this pass the unit held 34 templates; counted the
   way the Unit 2 pass counted (indicator pools exclude prior
   knowledge entries), its pools stood at 4.3: 7, 4.6: 8, 4.7: 3,
   4.8: 4, 4.9: 6, and the prior knowledge pool at 7 (the coded PK.2
   family of 3 plus 4 borrowed entries, with three of its five skill
   groups resting on a single entry). Indicator 4.7 rested on three
   templates, all selected response, and indicator 4.8 on four.
   After this pass every indicator pool holds at least 6 templates
   and the unit holds 50. The four prior knowledge entries are
   authored new in the Unit 2 expansion's pattern, each taking its
   skill group from one entry to two; their provenance is recorded
   in PKT_U3 below. A small right triangle figure builder for the
   4.3 modelling item comes first. */
function u3RightTriSVG(s,l,h,d,mirror){
  var W=300,H=230,base=188;
  var sc=160/l;
  var hx=Math.max(60,Math.round(s*sc)),vy=Math.round(l*sc);
  var x0=mirror?204:96,y0=base,x1=mirror?x0-hx:x0+hx,y1=base-vy;
  var dx=mirror?-1:1,sq=11;
  return '<svg viewBox="0 0 '+W+' '+H+'" width="300" height="230" role="img" aria-label="Right triangle with shorter leg x, longer leg x plus '+d+', and hypotenuse '+h+'">'
    +'<polygon points="'+x0+','+y0+' '+x0+','+y1+' '+x1+','+y0+'" fill="#eef3f8" stroke="#333" stroke-width="1.8"/>'
    +'<path d="M '+(x0+dx*sq)+' '+y0+' L '+(x0+dx*sq)+' '+(y0-sq)+' L '+x0+' '+(y0-sq)+'" fill="none" stroke="#333" stroke-width="1.3"/>'
    +'<text x="'+((x0+x1)/2)+'" y="'+(y0+22)+'" text-anchor="middle" font-size="14" fill="#222">x m</text>'
    +'<text x="'+(mirror?x0+10:x0-10)+'" y="'+((y0+y1)/2)+'" text-anchor="'+(mirror?"start":"end")+'" font-size="14" fill="#222">(x + '+d+') m</text>'
    +'<text x="'+(((x0+x1)/2)+dx*16)+'" y="'+(((y0+y1)/2)-12)+'" text-anchor="middle" font-size="14" fill="#222">'+h+' m</text>'
    +'</svg>';
}
E("u3-vertex-intercepts",3,["4.7"],1,"gen",function(){
  var dir=Math.random()<0.5?"up":"down";
  var pos=pick([-1,0,1]);
  var h=ri(-6,6),k=pos===0?0:pos*ri(1,5);
  var count=pos===0?1:(((dir==="up"&&pos<0)||(dir==="down"&&pos>0))?2:0);
  var key=count===2?"Two x-intercepts":count===1?"One x-intercept":"No x-intercepts";
  var others=["Two x-intercepts","One x-intercept","No x-intercepts"].filter(function(s){return s!==key;});
  var where=pos===0?"on the x-axis":pos>0?"above the x-axis":"below the x-axis";
  return mcq("A parabola opens "+(dir==="up"?"upward":"downward")+" and its vertex is at \\(("+h+", "+k+")\\), which is "+where+". How many x-intercepts does its graph have?",
    key,[others[0],others[1],"It is impossible to tell without more information"],
    "The vertex is the graph's highest or lowest point, and the graph moves away from it in the direction it opens. "+(count===2?"The vertex sits on the opposite side of the x-axis from that direction, so the two arms must cross the axis: two x-intercepts.":count===1?"The vertex sits exactly on the x-axis, so the graph touches the axis there and nowhere else: one x-intercept.":"The vertex sits on the same side of the x-axis as the direction the graph opens, so the graph never reaches the axis: no x-intercepts."),
    {dir:dir,pos:pos,h:h,k:k});
});
E("u3-discriminant-value",3,["4.7"],1,"gen",function(){
  var a=pick([1,2,3]),b=ri(-9,9),c=ri(-9,9),tries=0;
  while(b===0&&c===0&&tries<40){b=ri(-9,9);c=ri(-9,9);tries++;}
  var D=b*b-4*a*c,ac4=4*a*c;
  return numq("What is the value of the discriminant of "+"\\("+quadB(a,b,c)+" = 0\\)"+"?",
    D,0.011,
    "\\(D = b^2 - 4ac\\). Here \\(a = "+a+"\\), \\(b = "+b+"\\) and \\(c = "+c+"\\), so \\[\\begin{aligned} D &= ("+b+")^2 - 4("+a+")("+c+") \\\\ &= "+(b*b)+(ac4>=0?" - "+ac4:" + "+(-ac4))+" \\\\ &= "+D+" \\end{aligned}\\] The discriminant is <b>\\("+D+"\\)</b>.",
    {a:a,b:b,c:c});
});
E("u3-equal-roots-constant",3,["4.7"],2,"gen",function(){
  var a=pick([1,1,2]);
  var b=a===1?pick([2,4,6,8,10,12,14]):pick([4,12,20]);
  if(Math.random()<0.5)b=-b;
  var k=(b*b)/(4*a);
  var stem=pick([
    "The equation \\("+(a===1?"":a)+"x^2 "+(b>0?"+ ":"- ")+Math.abs(b)+"x + k = 0\\) has exactly one real solution. What is the value of \\(k\\)?",
    "The equation \\("+(a===1?"":a)+"x^2 "+(b>0?"+ ":"- ")+Math.abs(b)+"x + k = 0\\) has two equal real roots. What is the value of \\(k\\)?"]);
  return numq(stem,k,0.011,
    "Exactly one (repeated) solution means the discriminant is zero: \\[\\begin{aligned} b^2 - 4ak &= 0 \\\\ ("+b+")^2 - "+(4*a)+"k &= 0 \\\\ "+(b*b)+" &= "+(4*a)+"k \\\\ k &= "+k+" \\end{aligned}\\] So \\(k = \\)<b>\\("+k+"\\)</b>.",
    {a:a,b:b});
});
E("u3-which-no-roots",3,["4.7"],2,"gen",function(){
  function quadStr(t){return "\\("+quadB(t[0],t[1],t[2])+" = 0\\)";}
  var ka=pick([1,2]),kb=ri(-6,6);
  var kc=Math.floor((kb*kb)/(4*ka))+ri(1,5);
  var keyT=[ka,kb,kc],triples=[keyT],tries=0;
  while(triples.length<4&&tries<200){
    tries++;
    var r1=ri(-7,7),r2=ri(-7,7);
    if(r1===0||r2===0||r1===r2)continue;
    var t=[1,-(r1+r2),r1*r2],s=quadStr(t);
    if(triples.some(function(x){return quadStr(x)===s;}))continue;
    triples.push(t);
  }
  var opts=shuffle(triples).map(quadStr);
  var keyS=quadStr(keyT);
  return mcq("Which of these equations has no real roots?",
    keyS,opts.filter(function(s){return s!==keyS;}),
    "Compute each discriminant. For \\("+quadB(ka,kb,kc)+" = 0\\), \\(D = ("+kb+")^2 - 4("+ka+")("+kc+") = "+(kb*kb)+" - "+(4*ka*kc)+" = "+(kb*kb-4*ka*kc)+"\\), which is negative, so its graph never crosses the x-axis and it has no real roots. Each of the other three equations factors over the integers, so each of them has two real roots.",
    {triples:triples,key:keyT});
});
E("u3-solve-nonmonic",3,["4.8"],2,"gen",function(){
  var pool=[-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8];
  var u=pick(pool),v=pick(pool.filter(function(x){return x!==u;}));
  var a=pick([2,3]);
  var A=a,B=-a*(u+v),C=a*u*v;
  var askBig=Math.random()<0.5;
  function fs(r){return "(x "+(r>0?"- "+r:"+ "+(-r))+")";}
  return numq("Solve by factoring: "+"\\("+quadB(A,B,C)+" = 0\\)"+". Give the "+(askBig?"larger":"smaller")+" root.",
    askBig?Math.max(u,v):Math.min(u,v),0.011,
    "The trinomial factors with its leading coefficient: \\("+quadB(A,B,C)+" = "+a+fs(u)+fs(v)+"\\). (Expanding \\("+a+fs(u)+fs(v)+"\\) gives \\("+quadB(A,B,C)+"\\) back.) Setting each bracket to zero gives \\(x = "+u+"\\) or \\(x = "+v+"\\). The "+(askBig?"larger":"smaller")+" root is <b>\\("+(askBig?Math.max(u,v):Math.min(u,v))+"\\)</b>.",
    {A:A,B:B,C:C,askBig:askBig});
});
E("u3-solve-rearrange",3,["4.8"],2,"gen",function(){
  var mode=ri(0,1),u,v,B,C,stem,ask,ans;
  if(mode===0){
    u=ri(2,9);v=ri(2,9);var t=0;while(v===u&&t<40){v=ri(2,9);t++;}
    B=-(u+v);C=u*v;
    stem="\\(x^2 + "+C+" = "+(u+v)+"x\\)";
    ask="smaller";ans=Math.min(u,v);
  }else{
    var pool=[-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8];
    u=pick(pool.filter(function(x){return x>0;}));
    v=pick(pool.filter(function(x){return x<0&&x!==-u;}));
    B=-(u+v);C=u*v;
    var S=u+v,Q=-C;
    stem="\\(x^2 = "+(S>0?S+"x + ":"- "+(-S)+"x + ")+Q+"\\)";
    ask="larger";ans=Math.max(u,v);
  }
  function fs(r){return "(x "+(r>0?"- "+r:"+ "+(-r))+")";}
  return numq("Solve by factoring: "+stem+". Give the "+ask+" root.",
    ans,0.011,
    "Bring every term to the left first: \\("+quadB(1,B,C)+" = 0\\), which factors as \\("+fs(u)+fs(v)+" = 0\\). So \\(x = "+u+"\\) or \\(x = "+v+"\\); the "+ask+" root is <b>\\("+ans+"\\)</b>.",
    {B:B,C:C,mode:mode,ask:ask});
});
E("u3-solve-fraction-roots",3,["4.8"],2,"gen",function(){
  function gcd(x,y){x=Math.abs(x);y=Math.abs(y);while(y){var u=y;y=x%y;x=u;}return x||1;}
  function mkRoot(){var p,q,t=0;do{p=pick([-3,-2,-1,1,2,3]);q=pick([2,3,4]);t++;}while(gcd(p,q)!==1&&t<40);return [p,q];}
  function pair(p1,q1,p2,q2){return "\\(x = "+frB(p1,q1)+"\\) and \\(x = "+frB(p2,q2)+"\\)";}
  var r1,r2,lo,hi,A,B,C,key,ds,tries=0;
  do{
    r1=mkRoot();r2=mkRoot();tries++;
    if(r1[0]*r2[1]===r2[0]*r1[1]){ds=null;continue;}
    lo=r1[0]*r2[1]<r2[0]*r1[1]?r1:r2; hi=lo===r1?r2:r1;
    A=lo[1]*hi[1];B=-(lo[0]*hi[1]+hi[0]*lo[1]);C=lo[0]*hi[0];
    key=pair(lo[0],lo[1],hi[0],hi[1]);
    var cands=[pair(-lo[0],lo[1],-hi[0],hi[1]),pair(lo[1],lo[0],hi[1],hi[0]),pair(-lo[0],lo[1],hi[0],hi[1]),pair(lo[0],lo[1],-hi[0],hi[1])];
    ds=[];
    for(var i=0;i<cands.length&&ds.length<3;i++){if(cands[i]!==key&&ds.indexOf(cands[i])<0)ds.push(cands[i]);}
    if(ds.length<3)ds=null;
  }while(!ds&&tries<80);
  return mcq("Solve by factoring: "+"\\("+quadB(A,B,C)+" = 0\\)"+". What are the roots?",
    key,ds,
    "The equation factors as \\(("+lo[1]+"x "+(lo[0]>0?"- "+lo[0]:"+ "+(-lo[0]))+")("+hi[1]+"x "+(hi[0]>0?"- "+hi[0]:"+ "+(-hi[0]))+") = 0\\). From the first bracket, \\("+lo[1]+"x = "+lo[0]+"\\), so \\(x = "+frB(lo[0],lo[1])+"\\); from the second, \\(x = "+frB(hi[0],hi[1])+"\\). The roots are <b>"+key+"</b>.",
    {A:A,B:B,C:C,p1:lo[0],q1:lo[1],p2:hi[0],q2:hi[1]});
});
E("u3-formula-negative-a",3,["4.9"],2,"gen",function(){
  var a=pick([-1,-2]),b=ri(-9,9),c=ri(-9,9),D=b*b-4*a*c,tries=0;
  while((b===0||c===0||D<=0||Math.sqrt(D)===Math.floor(Math.sqrt(D)))&&tries<80){b=ri(-9,9);c=ri(-9,9);D=b*b-4*a*c;tries++;}
  var r1=(-b+Math.sqrt(D))/(2*a),r2=(-b-Math.sqrt(D))/(2*a);
  var big=Math.max(r1,r2);
  return numq("Use the quadratic formula to solve "+"\\("+quadB(a,b,c)+" = 0\\)"+". Give the larger root, to two decimal places.",
    Math.round(big*100)/100,0.011,
    "\\(D = b^2 - 4ac = "+D+"\\). \\(x = \\frac{"+(-b)+" \\pm \\sqrt{"+D+"}}{"+(2*a)+"}\\), giving \\(x \\approx "+fmt(r1)+"\\) or \\(x \\approx "+fmt(r2)+"\\). Mind the signs: with \\(a = "+a+"\\) the denominator \\(2a = "+(2*a)+"\\) is negative. The larger root is <b>\\("+fmt(big)+"\\)</b>.",
    {a:a,b:b,c:c});
});
E("u3-formula-ground",3,["4.9"],2,"gen",function(){
  var b=ri(13,29),c=ri(6,30),D=b*b+20*c,tries=0;
  while(Math.sqrt(D)===Math.floor(Math.sqrt(D))&&tries<80){b=ri(13,29);c=ri(6,30);D=b*b+20*c;tries++;}
  var t=(b+Math.sqrt(D))/10,tneg=(b-Math.sqrt(D))/10;
  var ctx=pick([["flare","fired from the top of a cliff","sea"],["rocket","launched from a raised platform","ground"],["ball","thrown from a balcony","ground"]]);
  return numq("A "+ctx[0]+" is "+ctx[1]+". Its height above the "+ctx[2]+" after \\(t\\) seconds is \\(h(t) = -5t^2 + "+b+"t + "+c+"\\) metres. How many seconds does it take to reach the "+ctx[2]+"? Give your answer to two decimal places.",
    Math.round(t*100)/100,0.011,
    "Reaching the "+ctx[2]+" means \\(h(t) = 0\\): \\(-5t^2 + "+b+"t + "+c+" = 0\\). This does not factor, so use the quadratic formula: \\[\\begin{aligned} t &= \\frac{-"+b+" \\pm \\sqrt{"+b+"^2 - 4(-5)("+c+")}}{2(-5)} \\\\ &= \\frac{-"+b+" \\pm \\sqrt{"+D+"}}{-10} \\end{aligned}\\] giving \\(t \\approx "+fmt(t)+"\\) or \\(t \\approx "+fmt(tneg)+"\\). A negative time would be before the launch, so the "+ctx[0]+" reaches the "+ctx[2]+" after <b>\\("+fmt(t)+"\\) s</b>.",
    {b:b,c:c});
});
E("u3-other-root",3,["4.6"],2,"gen",function(){
  var pool=[-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9];
  var g=pick(pool),o=pick(pool.filter(function(x){return x!==g;}));
  var B=-(g+o),C=g*o;
  return numq("One root of "+"\\("+quadB(1,B,C)+" = 0\\)"+" is \\("+g+"\\). What is the other root?",
    o,0.011,
    "For \\(x^2 + bx + c\\), the sum of the roots is \\(-b = "+(-B)+"\\). So the other root is \\("+(-B)+" - "+(g<0?"("+g+")":g)+" = "+o+"\\). (Check with the product: \\("+g+" \\times "+o+" = "+C+"\\), which is \\(c\\).) The other root is <b>\\("+o+"\\)</b>.",
    {B:B,C:C,given:g});
});
E("u3-sum-squares-solve",3,["4.3"],2,"gen",function(){
  var step=pick([1,2]);
  var n=step===2?2*ri(2,9):ri(3,16);
  var T=n*n+(n+step)*(n+step);
  var kind=step===2?"consecutive even integers":"consecutive integers";
  return numq("The sum of the squares of two positive "+kind+" is "+T+". What is the smaller of the two integers?",
    n,0.011,
    "Let the smaller integer be \\(x\\); the next is \\(x + "+step+"\\). Expanding, then dividing by 2 and collecting: \\[\\begin{aligned} x^2 + (x + "+step+")^2 &= "+T+" \\\\ 2x^2 + "+(2*step)+"x + "+(step*step)+" &= "+T+" \\\\ x^2 + "+step+"x - "+(n*(n+step))+" &= 0 \\\\ (x - "+n+")(x + "+(n+step)+") &= 0 \\end{aligned}\\] The roots are \\(x = "+n+"\\) and \\(x = -"+(n+step)+"\\); the integers are positive, so the smaller is <b>\\("+n+"\\)</b>. (Check: \\("+n+"^2 + "+(n+step)+"^2 = "+(n*n)+" + "+((n+step)*(n+step))+" = "+T+"\\).)",
    {step:step,T:T});
});
E("u3-right-triangle-legs",3,["4.3"],2,"gen",function(){
  var trip=pick([[3,4,5],[6,8,10],[5,12,13],[9,12,15],[8,15,17],[12,16,20],[7,24,25],[20,21,29]]);
  var s=trip[0],l=trip[1],h=trip[2],d=l-s;
  var mirror=Math.random()<0.5;
  var q=numq("The two legs of a right triangle differ by "+d+" m. The hypotenuse is "+h+" m. How long is the shorter leg, in metres?",
    s,0.011,
    "Let the shorter leg be \\(x\\); the longer leg is \\(x + "+d+"\\). By the Pythagorean theorem: \\[\\begin{aligned} x^2 + (x + "+d+")^2 &= "+(h*h)+" \\\\ 2x^2 + "+(2*d)+"x + "+(d*d)+" &= "+(h*h)+" \\\\ x^2 + "+d+"x - "+(s*l)+" &= 0 \\\\ (x - "+s+")(x + "+l+") &= 0 \\end{aligned}\\] The positive root is \\(x = "+s+"\\), so the shorter leg is <b>\\("+s+"\\text{ m}\\)</b>. (Check: the longer leg is \\("+l+" m\\), and \\("+s+"^2 + "+l+"^2 = "+(s*s)+" + "+(l*l)+" = "+(h*h)+" = "+h+"^2\\).)",
    {d:d,h:h,mirror:mirror});
  q.figure=u3RightTriSVG(s,l,h,d,mirror);
  return q;
});
E("u3-pk-gcf-binomial",3,["4.8"],1,"gen",function(){
  function gcd(x,y){x=Math.abs(x);y=Math.abs(y);while(y){var u=y;y=x%y;x=u;}return x||1;}
  var g=ri(2,9),m=ri(1,5),n=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]),tries=0;
  while(gcd(m,Math.abs(n))!==1&&tries<60){n=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]);tries++;}
  function lin(mm,nn){return (mm===1?"x":mm+"x")+(nn>0?" + "+nn:" - "+(-nn));}
  var key="\\("+g+"x("+lin(m,n)+")\\)";
  var ds=["\\("+g+"("+lin(m,n)+")\\)","\\("+g+"x("+lin(m,-n)+")\\)","\\("+g+"x("+m+"x"+(n>0?" + ":" - ")+Math.abs(g*n)+")\\)"];
  return mcq("Factor fully: \\("+(g*m)+"x^2 "+(g*n>0?"+ ":"- ")+Math.abs(g*n)+"x\\)",
    key,ds,
    "Both terms share the factor \\("+g+"x\\): \\("+(g*m)+"x^2 \\div "+g+"x = "+(m===1?"x":m+"x")+"\\) and \\("+(g*n)+"x \\div "+g+"x = "+n+"\\). Taking \\("+g+"x\\) out leaves <b>"+key+"</b>. (Multiply back to check: \\("+g+"x \\times "+(m===1?"x":m+"x")+" = "+(g*m)+"x^2\\), and \\("+g+"x \\times "+(n>0?"":"-")+Math.abs(n)+" = "+(g*n)+"x\\).)",
    {g:g,m:m,n:n});
},["Look for the greatest factor the two terms share, including a factor of x.","Divide each term by the shared factor; what is left goes inside the brackets."]);
E("u3-pk-expand-square",3,["4.8"],1,"gen",function(){
  var a=ri(-9,9);while(a===0)a=ri(-9,9);
  var key=quadT(1,2*a,a*a);
  var ds=[quadT(1,0,a*a),quadT(1,a,a*a),quadT(1,2*a,-(a*a))];
  return mcq("Expand and simplify \\((x "+(a>0?"+ ":"- ")+Math.abs(a)+")^2\\).",
    key,ds,
    "Squaring a binomial gives three terms: \\((x "+(a>0?"+ ":"- ")+Math.abs(a)+")^2 = x^2 + 2(x)("+a+") + ("+a+")^2 = \\)<b>"+key+"</b>. The middle term, \\("+(2*a)+"x\\), is twice the product of the two terms in the brackets; it does not vanish.",
    {a:a});
},["A square means the binomial multiplied by itself.","The middle term is twice the product of the two terms in the brackets."]);
E("u3-pk-solve-brackets",3,["4.8"],2,"gen",function(){
  var mode=ri(0,1),a=ri(2,7),b=ri(-8,8),x0=ri(-9,9),tries=0;
  while((b===0||x0===0)&&tries<40){b=ri(-8,8);x0=ri(-9,9);tries++;}
  if(mode===0){
    var R=a*(x0+b);
    return numq("Solve the equation \\("+a+"(x "+(b>0?"+ ":"- ")+Math.abs(b)+") = "+R+"\\). What is the value of \\(x\\)?",
      x0,0.01,
      "Undo the multiplication first, then the constant inside the brackets: \\[\\begin{aligned} "+a+"(x "+(b>0?"+ ":"- ")+Math.abs(b)+") &= "+R+" \\\\ x "+(b>0?"+ ":"- ")+Math.abs(b)+" &= "+(R/a)+" \\\\ x &= "+x0+" \\end{aligned}\\] So the solution is <b>\\(x = "+x0+"\\)</b>.",
      {a:a,b:b,R:R,mode:mode});
  }
  var R2=a*(b-x0);
  return numq("Solve the equation \\("+a+"("+b+" - x) = "+R2+"\\). What is the value of \\(x\\)?",
    x0,0.01,
    "Undo the multiplication first: \\("+a+"("+b+" - x) = "+R2+"\\) gives \\("+b+" - x = "+(R2/a)+"\\). Then \\(x = "+b+" - "+(R2/a)+" = "+x0+"\\). So the solution is <b>\\(x = "+x0+"\\)</b>.",
    {a:a,b:b,R:R2,mode:mode});
},["Undo the operations in reverse order: deal with the multiplication outside the brackets first.","Divide both sides by the number outside the brackets, then isolate x."]);
E("u3-pk-radical-coefficient",3,["4.9"],1,"gen",function(){
  var k0=ri(2,5),m=ri(2,4),r=pick([2,3,5,6,7,10,11,13,14,15]);
  if(k0===2&&m===2)m=3; /* else the added-coefficient distractor (k0 + m) equals the key (k0 x m) */
  var N=m*m*r;
  var key="\\("+(k0*m)+u2radS(2,r)+"\\)";
  var ds=["\\("+k0+u2radS(2,r)+"\\)","\\("+(k0+m)+u2radS(2,r)+"\\)","\\("+(k0*m)+u2radS(2,N)+"\\)"];
  return mcq("Simplify \\("+k0+"\\sqrt{"+N+"}\\), giving the answer in simplest radical form.",
    key,ds,
    "Simplify the radical first: \\(\\sqrt{"+N+"} = \\sqrt{"+(m*m)+" \\times "+r+"} = "+m+"\\sqrt{"+r+"}\\). Then multiply the coefficients: \\("+k0+" \\times "+m+" = "+(k0*m)+"\\), giving <b>"+key+"</b>.",
    {k0:k0,m:m,r:r,N:N});
},["Simplify the radical first, then combine it with the coefficient already outside.","The outside coefficient multiplies the coefficient that comes out of the root."]);

/* PK tranche pass for Unit 3. pkFor is Cluster 3's dependent
   indicator list from the prior knowledge map. */
var PKT_U3_FOR=["4.3","4.4","4.5","4.6","4.7","4.8","4.9","PK.2"];
var PKT_U3={
 "u3-pk-gcf":{src:"math-1201:3.10",group:"common-factor"},
 "u3-pk-binom-tri-expand":{src:"math-1201:3.4",group:"polynomial-multiply"},
 "u3-pk-solve-two-step":{src:"math-9:8.18",group:"linear-equations"},
 "u3-pk-radical-mixed":{src:"math-1201:1.16, host copy index fixed at 2 (Jason ruling 2026-11-15)",group:"radicals"},
 "u3-pk-gcf-binomial":{src:"math-1201:3.10",group:"common-factor"},
 "u3-pk-expand-square":{src:"math-1201:3.4",group:"polynomial-multiply"},
 "u3-pk-solve-brackets":{src:"math-9:8.18",group:"linear-equations"},
 "u3-pk-radical-coefficient":{src:"math-1201:1.16",group:"radicals"}};
BANK.forEach(function(e){var t=PKT_U3[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U3_FOR.slice();e.pkGroup=t.group;}});

/* ----- bank-u4.js ----- */
// Math 2201 Unit 4: Radicals question bank
// Cut verbatim from the standalone app's served file
// (math-2201-review/Math2201Review.html, lines 1406 to 1518).
// CRMARKS: u4-mixed-to-entire=1
// CRMARKS: u4-entire-to-mixed=2
// CRMARKS: u4-simplify-add=2
// CRMARKS: u4-multiply=2
// CRMARKS: u4-rationalize=1
// CRMARKS: u4-restrictions=1
// CRMARKS: u4-radical-equation=2
// CRMARKS: u4-extraneous=3
// CRMARKS: u4-defined-count=3
// CRMARKS: u4-repair-simplify=2
// CRMARKS: u4-order=2
// CRMARKS: u4-variable-evaluate=1
// CRMARKS: u4-defined-boundary=1
// CRMARKS: u4-restriction-boundary=1
// CRMARKS: u4-cube-equation-shifted=2
// CRMARKS: u4-extraneous-valid-root=2
// CRMARKS: u4-model-solve-variable=2
/* ============ Unit 4: Radicals ============ */
function radStr(a,b){return (a===1?"":a)+"\u221A"+b;}
function radT(a,b){return "\\("+(a===1?"":a)+"\\sqrt{"+b+"}\\)";}
function sqrtT(x){return "\\(\\sqrt{"+x+"}\\)";}
function rad3T(a,b){return "\\("+(a===1?"":a)+"\\sqrt[3]{"+b+"}\\)";}
function cbrtT(x){return "\\(\\sqrt[3]{"+x+"}\\)";}
E("u4-mixed-to-entire",4,["1.1"],1,"gen",function(){
  var a=ri(2,9),b=pick([2,3,5,6,7,10,11,13,14,15]);var inside=a*a*b;
  var frame=pick(["Express "+radT(a,b)+" as an entire radical.","Which entire radical is equal to "+radT(a,b)+"?"]);
  return mcq(frame,sqrtT(inside),[sqrtT(a*b),sqrtT(a*a+b),sqrtT(a*a*b*b)],
    "Bring the outside number in by squaring it: \\("+a+"^2 \\times "+b+" = "+(a*a)+" \\times "+b+" = "+inside+"\\), so "+radT(a,b)+" = "+sqrtT(inside)+".",{a:a,b:b});
});
E("u4-entire-to-mixed",4,["1.2"],1,"gen",function(){
  var a=ri(2,12),b=pick([2,3,5,6,7,10,11,13,14,15]);var n=a*a*b;
  var frame=pick(["Express "+sqrtT(n)+" as a mixed radical in simplest form.","Write "+sqrtT(n)+" as a mixed radical in simplest form."]);
  return mcq(frame,radT(a,b),[radT(a+1,b),radT(a,b+1),sqrtT(n-1)],
    "Find the largest perfect square dividing \\("+n+"\\): \\("+n+" = "+(a*a)+" \\times "+b+"\\). So "+sqrtT(n)+" = "+radT(a,b)+".",{a:a,b:b,n:n});
});
E("u4-simplify-add",4,["1.6"],2,"gen",function(){
  var b=pick([2,3,5,6,7,10,11,13]);var a1=pick([2,3,4,5]);var a2=pick([2,3,4,5,6].filter(function(x){return x!==a1;}));
  var n1=a1*a1*b,n2=a2*a2*b;var tot=a1+a2;
  return mcq("Simplify: "+sqrtT(n1)+" + "+sqrtT(n2)+".",
    radT(tot,b),[radT(tot+1,b),radT(tot,b+1),sqrtT(n1+n2)],
    sqrtT(n1)+" = "+radT(a1,b)+" and "+sqrtT(n2)+" = "+radT(a2,b)+". Like radicals add: \\("+a1+" + "+a2+" = "+tot+"\\), so the sum is "+radT(tot,b)+". (You cannot just add the numbers under the roots.)",{b:b,a1:a1,a2:a2});
});
E("u4-multiply",4,["1.6"],2,"gen",function(){
  var k=pick([2,3,5,6,7,10,11,13,14,15]);var i=ri(1,3),j=ri(1,3);var x=k*i*i,y=k*j*j;
  return numq("The product \\(\\sqrt{"+x+"} \\times \\sqrt{"+y+"}\\) is a whole number. What is it?",
    k*i*j,0.011,"\\[\\begin{aligned} \\sqrt{"+x+"} \\times \\sqrt{"+y+"} &= \\sqrt{"+x+" \\times "+y+"} \\\\ &= \\sqrt{"+(x*y)+"} \\end{aligned}\\] Notice \\("+x+" = "+k+" \\times "+(i*i)+"\\) and \\("+y+" = "+k+" \\times "+(j*j)+"\\), so the product is <b>\\("+k+" \\times "+i+" \\times "+j+" = "+(k*i*j)+"\\)</b>.",{p:[x,y]});
});
E("u4-rationalize",4,["1.7"],1,"gen",function(){
  var d=pick([2,3,5,6,7,10,11,13,14,15]);var c=d*ri(1,5);
  var frame=pick(["Rationalize the denominator: \\(\\frac{"+c+"}{\\sqrt{"+d+"}}\\).","Write \\(\\frac{"+c+"}{\\sqrt{"+d+"}}\\) with a rational denominator."]);
  return mcq(frame,radT(c/d,d),[sqrtT(c*d),"\\(\\frac{"+c+"\\sqrt{"+d+"}}{"+d+"}\\)","\\("+(c/d)+"\\sqrt{"+(d*d)+"}\\)"],
    "Multiply top and bottom by "+sqrtT(d)+": \\[\\begin{aligned} \\frac{"+c+"}{\\sqrt{"+d+"}} &= \\frac{"+c+"\\sqrt{"+d+"}}{"+d+"} \\\\ &= "+(c/d)+"\\sqrt{"+d+"} \\end{aligned}\\] The denominator is now the rational number \\("+d+"\\).",{c:c,d:d});
});
E("u4-restrictions",4,["1.5"],1,"gen",function(){
  var a=ri(-6,15);var flipped=Math.random()<0.5;
  var rad=flipped?"("+a+" - x)":"(x "+(a>=0?"- "+a:"+ "+(-a))+")";
  var frame=pick(["For which values of x is the expression \\(\\sqrt{"+rad+"}\\) defined?","State the restriction on x so that \\(\\sqrt{"+rad+"}\\) is a real number."]);
  return mcq(frame,
    flipped?"\\(x \\leq "+a+"\\)":"\\(x \\geq "+a+"\\)",[flipped?"\\(x \\geq "+a+"\\)":"\\(x \\leq "+a+"\\)","\\(x > 0\\)","All real numbers"],
    "The radicand cannot be negative: "+(flipped?"\\("+a+" - x \\ge 0\\) gives \\(x \\le "+a+"\\)":"\\(x "+(a>=0?"- "+a:"+ "+(-a))+" \\ge 0\\) gives \\(x \\ge "+a+"\\)")+".",{a:a,flipped:flipped});
});
E("u4-radical-equation",4,["1.9"],2,"gen",function(){
  var b=ri(3,7),a=ri(1,15);var x=b*b-a;
  return numq("Solve \\(\\sqrt{x + "+a+"} = "+b+"\\). Give the value of x.",
    x,0.011,"Square both sides: \\[\\begin{aligned} x + "+a+" &= "+(b*b)+" \\\\ x &= "+(b*b)+" - "+a+" \\\\ &= "+x+" \\end{aligned}\\] Check: \\(\\sqrt{"+x+" + "+a+"} = \\sqrt{"+(b*b)+"} = "+b+"\\) \u2713.",{a:a,b:b});
});
E("u4-extraneous",4,["1.11"],3,"gen",function(){
  var b=pick([1,2,3,4]);var r=2*b+ri(1,6);var e=2*b+1-r;var a=b*b-r*e;
  var radicand="x + "+a;
  var frame=pick([
    "Solving \\(\\sqrt{"+radicand+"} = x - "+b+"\\) by squaring both sides gives two candidates: \\(x = "+r+"\\) and \\(x = "+e+"\\). Which one is extraneous, and why?",
    "A student solves \\(\\sqrt{"+radicand+"} = x - "+b+"\\) by squaring and gets two candidates: \\(x = "+r+"\\) and \\(x = "+e+"\\). Which candidate is extraneous, and why?",
    "Squaring both sides of \\(\\sqrt{"+radicand+"} = x - "+b+"\\) produces the candidates \\(x = "+r+"\\) and \\(x = "+e+"\\). Which one is extraneous, and why?"]);
  return mcq(frame,
    "\\(x = "+e+"\\) is extraneous \u2014 substituting it makes the right side negative, but a square root is never negative",
    ["\\(x = "+r+"\\) is extraneous - it is the larger answer, and the larger answer from squaring is always false","Neither is extraneous - squaring both sides never creates false roots, so both candidates work in the original equation","Both are extraneous, so the equation has no solution - each candidate fails when substituted back into the equation"],
    "Check \\(x = "+e+"\\): \\(\\sqrt{"+e+" + "+a+"} = \\sqrt{"+(e+a)+"} = "+Math.sqrt(e+a)+"\\), but \\(x - "+b+" = "+(e-b)+" < 0\\). A principal square root cannot equal a negative number, so \\(x = "+e+"\\) crept in when we squared. \\(x = "+r+"\\) checks: \\(\\sqrt{"+(r+a)+"} = "+Math.sqrt(r+a)+" = "+(r-b)+"\\) \u2713.",{b:b,r:r,e:e,a:a});
});
E("u4-defined-count",4,["1.5"],3,"gen",function(){
  function sub(v){return v>=0?"x - "+v:"x + "+(-v);}
  var mode=ri(0,2),prompt="",sol="",ans=0;
  if(mode===0){
    var a=ri(-6,4);var b=a+ri(5,14);ans=b-a+1;
    prompt="For how many integer values of \\(x\\) is the expression \\(\\sqrt{"+sub(a)+"} + \\sqrt{"+b+" - x}\\) defined?";
    sol="Each radicand must be non-negative. The first gives \\(x \\ge "+a+"\\), and the second gives \\(x \\le "+b+"\\). Both conditions must hold at once, so \\(x\\) takes every integer from \\("+a+"\\) to \\("+b+"\\) inclusive, a total of <b>\\("+ans+"\\)</b> values. Either condition on its own would allow more.";
  }else if(mode===1){
    var a2=ri(-6,4);var b2=a2+ri(5,14);ans=b2-a2;
    prompt="For how many integer values of \\(x\\) is the expression \\(\\frac{\\sqrt{"+sub(a2)+"}}{\\sqrt{"+b2+" - x}}\\) defined?";
    sol="The numerator needs \\(x \\ge "+a2+"\\). The denominator needs more: a square root sitting in a denominator must be positive, not just non-negative, so \\("+b2+" - x > 0\\) and \\(x < "+b2+"\\). The integers from \\("+a2+"\\) to \\("+(b2-1)+"\\) inclusive total <b>\\("+ans+"\\)</b> values.";
  }else{
    var hi=ri(2,14);var lo=hi-ri(5,14);ans=hi-lo+1;
    prompt="For how many integer values of \\(x\\) is the expression \\(\\sqrt{"+hi+" - x} + \\sqrt{"+sub(lo)+"}\\) defined?";
    sol="Each radicand must be non-negative. The first gives \\(x \\le "+hi+"\\), and the second gives \\(x \\ge "+lo+"\\). Both conditions must hold at once, so \\(x\\) takes every integer from \\("+lo+"\\) to \\("+hi+"\\) inclusive, a total of <b>\\("+ans+"\\)</b> values.";
  }
  return numq(prompt,ans,0.011,sol,{mode:mode});
});
E("u4-repair-simplify",4,["1.2"],3,"gen",function(){
  var sqf=[2,3,5,6,7,10,11,13,14,15];
  var mode=ri(0,1);
  if(mode===0){
    var f=pick([2,3]);var mult=ri(2,5);var a=f*mult;var b=pick(sqf);
    var N=a*a*b;var p=a/f;var qq=b*f*f;
    return numq("A student simplifies \\(\\sqrt{"+N+"}\\) and writes \\("+p+"\\sqrt{"+qq+"}\\). The value is correct, but the radicand still contains a square factor, so the radical is not fully simplified. In the fully simplified form, what is the coefficient of the square root?",
      a,0.011,
      "The radicand \\("+qq+"\\) still contains the square factor \\("+f+"^2 = "+(f*f)+"\\). Pulling it out multiplies the coefficient by \\("+f+"\\): \\("+p+" \\times "+f+" = "+a+"\\), and indeed \\(\\sqrt{"+N+"} = \\sqrt{"+(a*a)+" \\times "+b+"} = \\)<b>\\("+a+"\\sqrt{"+b+"}\\)</b>.",
      {N:N,p:p,qq:qq});
  }
  var a2=pick([4,5,6,7,8,9,10]);var b2=pick(sqf);var N2=a2*a2*b2;var pw=a2+pick([-1,1]);if(pw<2)pw=a2+1;
  return numq("A student simplifies \\(\\sqrt{"+N2+"}\\) and writes \\("+pw+"\\sqrt{"+b2+"}\\). Checking the value, \\("+pw+"^2 \\times "+b2+" \\ne "+N2+"\\), so the student\u2019s answer is wrong. What is the coefficient of the square root in the fully simplified form?",
    a2,0.011,
    "Redo the simplification from the start: \\("+N2+" = "+(a2*a2)+" \\times "+b2+"\\), and \\("+(a2*a2)+"\\) is a perfect square, so \\(\\sqrt{"+N2+"} = \\)<b>\\("+a2+"\\sqrt{"+b2+"}\\)</b>. The student\u2019s radicand was right, but the coefficient was not the square root of "+(a2*a2)+".",
    {N:N2,pw:pw});
});
E("u4-order",4,["1.4"],2,"gen",function(){
  var base=ri(5,10),g1=ri(2,4),g2=ri(2,4),g3=ri(2,5);
  var ins=[base,base+g1,base+g1+g2,base+g1+g2+g3];
  function render(n){var c=Math.floor(Math.sqrt(n));if(c*c===n)return ""+c;var r=n;var co=1;for(var d=2;d*d<=r;d++){while(r%(d*d)===0){r/=(d*d);co*=d;}}return (co>1?co:"")+"\\sqrt{"+r+"}";}
  var items=ins.map(function(n){return {s:render(n),v:Math.sqrt(n)};});
  var sorted=items.slice().sort(function(x,y){return x.v-y.v;});
  function list(arr){return "\\("+arr.map(function(o){return o.s;}).join(", ")+"\\)";}
  var asc=list(sorted);
  var shown=shuffle(items.slice());
  var shownStr=list(shown);
  var rev=list(sorted.slice().reverse());
  var rot=list([sorted[1],sorted[2],sorted[3],sorted[0]]);
  var midswap=list([sorted[0],sorted[2],sorted[1],sorted[3]]);
  return mcq("Which list shows these radicals in order from least to greatest? "+shownStr,
    asc,[rev,rot,midswap],
    "Square each value (or estimate): "+sorted.map(function(o){return "\\("+o.s+" \\approx "+fmt(o.v)+"\\)";}).join(", ")+". Ordered least to greatest: <b>"+asc+"</b>.",{items:items});
});

/* ============ Prior knowledge tranche (November 15, 2026) ============
   Cluster 4 (Radical prerequisites): seven borrowed entries and one
   authored micro-item. Provenance (host id: source, verified by
   draw sweep):
   - u4-pk-radical-mixed: copied from math-1201 u2-radical-mixed, indicator 1.16
     (the same generator is also copied into Unit 3 under its own host id).
   - u4-pk-radical-entire: copied from math-1201 u2-radical-entire, indicator 1.17.
   - u4-pk-laws-integral: copied from math-1201 u2-laws-integral, indicator 1.6.
   - u4-pk-laws-rational: copied from math-1201 u2-laws-rational, indicator 1.6.
   - u4-pk-evaluate-exp: copied from math-1201 u2-evaluate-exp, indicators 1.6, 1.3.
   - u4-pk-which-is-solution: copied from math-9 u5-which-is-solution, indicator 8.20.
   - u4-pk-solve-two-step: copied from math-9 u5-solve-two-step, indicator 8.18
     (shared source with Units 3 and 8; see the Unit 3 note).
   - u4-pk-defined: authored for the Math 2201 PK tranche (spec
     construct u4-pk-defined: numerical definedness, the one named
     Cluster 4 subskill no feeder entry samples). It assesses the
     numerical case only; variable radicands are host content.
   The Math 1201 systems entries were read and not borrowed: they
   assess systems, not the single-equation solving this cluster
   names. Indicator tags are support tags, not assessed targets:
   assessed targets are in pkSrc, the full dependent list in pkFor. */
E("u4-pk-radical-mixed", 4, ["1.2"], 1, "gen",function(){
  var idx=pick([2,2,3,3,4]),k,m,N,mlist;
  if(idx===2){k=ri(2,15);mlist=[2,3,5,6,7,10,11,13,14,15,17,19,21,22,23,26,29,30,31,33,34,35,37,38,39];}
  else if(idx===3){k=ri(2,7);mlist=[2,3,4,5,6,7,9,10,11,12,13,14,15,17,18,19,20,21,22,23,25,26,28,29,30,31,33,34,35,36,37,38,39,41,42];}
  else{k=ri(2,4);mlist=[2,3,4,5,6,7,8,9,10,11,12,13,14,15,17,18,19,20,22,24,25,26,27,28,29,30,31];}
  m=pick(mlist);N=Math.pow(k,idx)*m;
  var key="\\("+k+u2radS(idx,m)+"\\)";
  var mAlt=pick(mlist.filter(function(x){return x!==m;}));
  var cands=["\\("+(k+1)+u2radS(idx,m)+"\\)","\\("+k+u2radS(idx,mAlt)+"\\)","\\("+(k*k)+u2radS(idx,m)+"\\)"];
  if(k>2)cands.push("\\("+(k-1)+u2radS(idx,m)+"\\)");
  cands.push("\\("+k+u2radS(idx,m*2)+"\\)");
  var ds=u2pickS3(key,cands);
  return mcq("Express \\("+u2radS(idx,N)+"\\) as a <b>mixed radical</b> in simplest form.",
    key,ds,
    "Pull out the largest perfect "+(idx===2?"square":idx===3?"cube":"fourth power")+" factor of \\("+N+"\\): \\["+
    "\\begin{aligned} "+u2radS(idx,N)+" &= "+u2radS(idx,Math.pow(k,idx)+" \\times "+m)+" \\\\ &= "+k+u2radS(idx,m)+" \\end{aligned} \\]"+
    " The mixed radical in simplest form is <b>\\("+k+u2radS(idx,m)+"\\)</b>.",
    {idx:idx,k:k,m:m,N:N});
});
E("u4-pk-radical-entire", 4, ["1.1"], 1, "gen",function(){
  var idx=pick([2,2,3,3,4]),k,m,mlist;
  if(idx===2){k=ri(2,12);mlist=[2,3,5,6,7,10,11,13,14,15,17,19,21,22,23,26,29,30];}
  else if(idx===3){k=ri(2,6);mlist=[2,3,4,5,6,7,9,10,11,12,13,14,15,17,18,19,20,21,22,23,25,26,28,29,30];}
  else{k=ri(2,3);mlist=[2,3,4,5,6,7,8,9,10,11,12,13,14,15,17,18,19,20,22,24,25,26,27,28,29,30,31];}
  m=pick(mlist);
  var ansN=Math.pow(k,idx)*m;
  var key="\\("+u2radS(idx,ansN)+"\\)";
  var candN=[k*m,Math.pow(k,idx+1)*m,Math.pow(k+1,idx)*m,Math.pow(k,idx)*(m+1),Math.pow(k,idx-1)*m];
  var ds=u2pickS3(key,candN.map(function(v){return "\\("+u2radS(idx,v)+"\\)";}));
  return mcq("Express \\("+k+u2radS(idx,m)+"\\) as an <b>entire radical</b>.",
    key,ds,
    "Bring the coefficient \\("+k+"\\) under the radical sign by writing it as a root: \\("+k+" = "+u2radS(idx,Math.pow(k,idx))+"\\). Then \\["+
    "\\begin{aligned} "+k+u2radS(idx,m)+" &= "+u2radS(idx,Math.pow(k,idx))+" \\times "+u2radS(idx,m)+" \\\\ &= "+u2radS(idx,ansN)+" \\end{aligned} \\]"+
    " The entire radical is <b>\\("+u2radS(idx,ansN)+"\\)</b>.",
    {idx:idx,k:k,m:m,ansN:ansN});
});
E("u4-pk-laws-integral", 4, ["1.6"], 2, "gen",function(){
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
E("u4-pk-laws-rational", 4, ["1.6"], 2, "gen",function(){
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
E("u4-pk-evaluate-exp", 4, ["1.6"], 1, "gen",function(){
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
E("u4-pk-which-is-solution", 4, ["1.11"], 1, "gen", function () {
  var a = ri(2, 7), x0 = ri(-6, 9), b = ri(-9, 9);
  var c = a * x0 + b;
  function fbFor(v) { return "Substituting \\(x = " + fmt(v) + "\\) gives a left side of " + fmt(a * v + b) + ", which is not " + fmt(c) + "."; }
  var cands = [
    { t: fmt(x0 + 1), fb: fbFor(x0 + 1) },
    { t: fmt(x0 - 1), fb: fbFor(x0 - 1) },
    { t: fmt(x0 + 2), fb: fbFor(x0 + 2) }
  ];
  var sol = "Substitute the value and compare the two sides: \\[ \\begin{aligned} " + u5lin(a, b) + " &= " + fmt(a) + "(" + fmt(x0) + ")" + (b >= 0 ? "+" + fmt(b) : "-" + fmt(-b)) + " \\\\ &= " + fmt(c) + " \\end{aligned} \\] Both sides match, so the solution is <b>\\(x = " + fmt(x0) + "\\)</b>.";
  return mcq("Which value is the solution of \\(" + u5lin(a, b) + " = " + fmt(c) + "\\)?", { t: fmt(x0), fb: "Correct: substituting it makes both sides equal." }, cands, sol, { mode: "which-sol", a: a, b: b, c: c });
}, ["A solution is a value that makes both sides equal when it is substituted.", "First substitute one value and work out the left side, then compare it with the right side."]);
E("u4-pk-solve-two-step", 4, ["1.9"], 2, "gen", function () {
  var form = ri(0, 2);
  if (form === 0) {
    var a = ri(2, 9), x0 = ri(-9, 9); if (x0 === 0) x0 = 4;
    var b = ri(-12, 12); if (b === 0) b = 5;
    var c = a * x0 + b;
    var sol = "Undo the constant first, then undo the multiplication: \\[ \\begin{aligned} " + u5lin(a, b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(c - b) + " \\\\ x &= " + fmt(x0) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x0) + "\\)</b>.";
    return numq("Solve the equation \\(" + u5lin(a, b) + " = " + fmt(c) + "\\). What is the value of \\(x\\)?", x0, 0.01, sol, { mode: "ax+b", a: a, b: b, c: c });
  }
  if (form === 1) {
    var a2 = ri(2, 6), k = ri(-6, 6); if (k === 0) k = 3;
    var x1 = a2 * k, b2 = ri(-9, 9); if (b2 === 0) b2 = -4;
    var c2 = k + b2;
    var sol2 = "Undo the constant first, then undo the division: \\[ \\begin{aligned} " + FR("x", a2) + (b2 >= 0 ? "+" + fmt(b2) : "-" + fmt(-b2)) + " &= " + fmt(c2) + " \\\\ " + FR("x", a2) + " &= " + fmt(k) + " \\\\ x &= " + fmt(x1) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x1) + "\\)</b>.";
    return numq("Solve the equation \\(" + FR("x", a2) + (b2 >= 0 ? " + " + fmt(b2) : " - " + fmt(-b2)) + " = " + fmt(c2) + "\\). What is the value of \\(x\\)?", x1, 0.01, sol2, { mode: "x/a+b", a: a2, b: b2, c: c2 });
  }
  var x2 = ri(-8, 8); if (x2 === 0) x2 = 5;
  var a3 = ri(3, 9), c3 = ri(2, a3 - 1), b3 = (a3 - c3) * x2;
  var sol3 = "Collect the x terms on one side first: \\[ \\begin{aligned} " + fmt(a3) + "x &= " + u5lin(c3, b3) + " \\\\ " + fmt(a3 - c3) + "x &= " + fmt(b3) + " \\\\ x &= " + fmt(x2) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x2) + "\\)</b>.";
  return numq("Solve the equation \\(" + fmt(a3) + "x = " + u5lin(c3, b3) + "\\). What is the value of \\(x\\)?", x2, 0.01, sol3, { mode: "ax=cx+b", a: a3, b: b3, c: c3 });
}, ["Undo the operations in reverse order: deal with the constant term before the term attached to x.", "First isolate the x term on one side, using the same operation on both sides."]);
E("u4-pk-defined", 4, ["1.5"], 1, "gen", function () {
  var neg = ri(2, 64);
  var key = "\\(\\sqrt{-" + neg + "}\\)";
  var a = ri(2, 12), b = ri(2, 6), c = ri(3, 30);
  while (c === 4 || c === 9 || c === 16 || c === 25) c = ri(3, 30);
  var reals = ["\\(\\sqrt{" + (a * a) + "}\\)",
    "\\(\\sqrt[3]{-" + (b * b * b) + "}\\)",
    "\\(\\sqrt[3]{" + (b * b * b) + "}\\)",
    "\\(\\sqrt{" + c + "}\\)",
    "\\(-\\sqrt{" + (a * a) + "}\\)",
    "\\(\\sqrt{0}\\)"];
  var ds = shuffle(reals).slice(0, 3);
  return mcq("Which of these expressions is not a real number?",
    key, ds,
    "A square root of a negative number is not a real number, so \\(\\sqrt{-" + neg + "}\\) has no real value. The others all name real numbers: square roots of positive numbers and of zero are real, and a cube root of a negative number is real (a negative one). The expression that is not a real number is <b>\\(\\sqrt{-" + neg + "}\\)</b>.",
    { mode: "pk-defined", neg: neg });
});
/* ============ External drafting tranche (November 18, 2026) ============
   Twenty-one entries drafted externally (Gemini) under the External
   Authoring Pack against the Math 2201 Unit 4 assignment, and
   integrated after the intake sweep: 3,000 draws per entry with every
   key recomputed independently from the dealt parameters, plus the
   distractor length scan and the bank overlap check. Five entries
   carry intake repairs, each listed in the intake report
   (Intake-Report-Math-2201-Unit-4-Gemini-2026-11-18, review apps goal
   files). Two assigned entries were rejected from this tranche at
   intake (u4-equation-restriction-two and u4-extraneous-why). */

E("u4-mixed-to-entire-fraction",4,["1.1"],2,"gen",function(){
  function gcd(x,y){x=Math.abs(x);y=Math.abs(y);while(y){var t=y;y=x%y;x=t;}return x||1;}
  var p,q,r,tries=0,key,ds;
  do{
    p=ri(2,5);q=ri(p+1,7);r=pick([2,3,5,6,7,10,11,13]);tries++;
    if(gcd(p,q)!==1){ds=null;continue;}
    var n0=p*p*r,d0=q*q,g0=gcd(n0,d0);
    var kn=n0/g0,kd=d0/g0;
    key="\\(\\sqrt{"+frB(kn,kd)+"}\\)";
    var n1=p*r,d1=q,g1=gcd(n1,d1);
    var c1="\\(\\sqrt{"+frB(n1/g1,d1/g1)+"}\\)";
    var n2=p*p*p*r,d2=q*q,g2=gcd(n2,d2);
    var c2="\\(\\sqrt{"+frB(n2/g2,d2/g2)+"}\\)";
    var n3=p*r,d3=q*q,g3=gcd(n3,d3);
    var c3="\\(\\sqrt{"+frB(n3/g3,d3/g3)+"}\\)";
    var cands=[c1,c2,c3];
    ds=[];
    for(var i=0;i<cands.length;i++){if(cands[i]!==key&&ds.indexOf(cands[i])<0)ds.push(cands[i]);}
    if(ds.length<3)ds=null;
  }while(!ds&&tries<80);
  var knStr=frB(p*p*r/gcd(p*p*r,q*q),(q*q)/gcd(p*p*r,q*q));
  return mcq("Express \\("+frB(p,q)+"\\sqrt{"+r+"}\\) as an entire radical in simplest form.",
    key,ds,
    "Square the fractional coefficient before bringing it under the radical: \\(\\left("+frB(p,q)+"\\right)^2 = "+frB(p*p,q*q)+"\\). Multiply inside the square root: \\(\\sqrt{"+frB(p*p,q*q)+" \\times "+r+"} = \\sqrt{"+frB(p*p*r,q*q)+"}\\)"+(gcd(p*p*r,q*q)>1?", which reduces to \\(\\sqrt{"+knStr+"}\\)":"")+". The entire radical is <b>"+key+"</b>.",
    {p:p,q:q,r:r});
});

E("u4-mixed-to-entire-mistake",4,["1.1"],2,"var",varset([
  function(){
    return mcq("A student converts \\(4\\sqrt{3}\\) to an entire radical.<br>Line 1: \\(4\\sqrt{3}\\)<br>Line 2: \\(= \\sqrt{4 \\times 3}\\)<br>Line 3: \\(= \\sqrt{12}\\)<br>Line 4: The entire radical is \\(\\sqrt{12}\\).<br>In which line is the FIRST mistake?",
      "Line 2",["Line 1","Line 3","Line 4"],
      "Line 1 restates the given expression correctly. In Line 2, the coefficient \\(4\\) was brought inside the radical without being squared first; it should be \\(\\sqrt{4^2 \\times 3} = \\sqrt{16 \\times 3} = \\sqrt{48}\\). The first mistake is in <b>Line 2</b>.",
      {variant:1,mistakeLine:2});
  },
  function(){
    return mcq("A student converts \\(3\\sqrt{5}\\) to an entire radical.<br>Line 1: \\(3\\sqrt{5}\\)<br>Line 2: \\(= \\sqrt{3^2 \\times 5^2}\\)<br>Line 3: \\(= \\sqrt{9 \\times 25}\\)<br>Line 4: \\(= \\sqrt{225}\\)<br>In which line is the FIRST mistake?",
      "Line 2",["Line 1","Line 3","Line 4"],
      "Line 1 restates the given expression correctly. In Line 2, the student squared both the coefficient and the radicand, whereas only the coefficient moving inside the radical should be squared: \\(\\sqrt{3^2 \\times 5} = \\sqrt{45}\\). The first mistake is in <b>Line 2</b>.",
      {variant:2,mistakeLine:2});
  },
  function(){
    return mcq("A student converts \\(5\\sqrt{2}\\) to an entire radical.<br>Line 1: \\(5\\sqrt{2}\\)<br>Line 2: \\(= \\sqrt{5^2} \\cdot \\sqrt{2}\\)<br>Line 3: \\(= \\sqrt{25 + 2}\\)<br>Line 4: \\(= \\sqrt{27}\\)<br>In which line is the FIRST mistake?",
      "Line 3",["Line 1","Line 2","Line 4"],
      "Line 1 and Line 2 rewrite \\(5\\) as \\(\\sqrt{5^2}\\) properly. In Line 3, the student added the radicands instead of multiplying them (\\(\\sqrt{25 \\times 2} = \\sqrt{50}\\)). The first mistake is in <b>Line 3</b>.",
      {variant:3,mistakeLine:3});
  },
  function(){
    return mcq("A student converts \\(2\\sqrt{7}\\) to an entire radical.<br>Line 1: \\(2\\sqrt{7}\\)<br>Line 2: \\(= \\sqrt{2^2} \\cdot \\sqrt{7}\\)<br>Line 3: \\(= \\sqrt{4 \\times 7}\\)<br>Line 4: \\(= \\sqrt{11}\\)<br>In which line is the FIRST mistake?",
      "Line 4",["Line 1","Line 2","Line 3"],
      "Lines 1 through 3 set up \\(\\sqrt{4 \\times 7}\\) properly. In Line 4, the student added \\(4 + 7 = 11\\) instead of multiplying \\(4 \\times 7 = 28\\). The first mistake is in <b>Line 4</b>.",
      {variant:4,mistakeLine:4});
  }
]));

E("u4-simplify-fraction-radicand",4,["1.2","1.7"],2,"gen",function(){
  var a,b,d,key,ds,tries=0;
  do{
    a=pick([2,3,4,5]);b=pick([2,3,5,6,7]);d=pick([3,4,5,6,7,8,9]);tries++;
    var num=a*a*b,den=d*d;
    if(num>=den)continue;
    function gcd(x,y){while(y){var t=y;y=x%y;x=t;}return x||1;}
    if(gcd(num,den)!==1)continue;
    key="\\(\\frac{"+radStr(a,b)+"}{"+d+"}\\)";
    var d1="\\(\\frac{"+radStr(a,b)+"}{\\sqrt{"+den+"}}\\)";
    var badA=a===2?3:2;
    var d2="\\(\\frac{"+radStr(badA,b)+"}{"+d+"}\\)";
    var d3="\\(\\frac{"+d+"}{"+radStr(a,b)+"}\\)";
    ds=[d1,d2,d3];
    if(ds.indexOf(key)>=0||ds[0]===ds[1]||ds[0]===ds[2]||ds[1]===ds[2])ds=null;
  }while(!ds&&tries<100);
  var num=a*a*b,den=d*d;
  return mcq("Express \\(\\sqrt{"+frB(num,den)+"}\\) in simplest form.",
    key,ds,
    "Split the radical across numerator and denominator: \\(\\frac{\\sqrt{"+num+"}}{\\sqrt{"+den+"}}\\). Factor the perfect square in the numerator: \\(\\sqrt{"+num+"} = \\sqrt{"+(a*a)+" \\times "+b+"} = "+radStr(a,b)+"\\), and evaluate the denominator: \\(\\sqrt{"+den+"} = "+d+"\\). In simplest form, the expression is <b>"+key+"</b>.",
    {a:a,b:b,d:d});
});

E("u4-variable-entire",4,["1.3"],2,"gen",function(){
  var c,e,r,form,key,ds,tries=0;
  do{
    c=ri(2,6);e=ri(1,4);r=pick([2,3,5,6,7]);form=ri(0,1);tries++;
    var vPart=e===1?"x":"x^{"+e+"}";
    var vSq=(2*e)===1?"x":"x^{"+(2*e)+"}";
    var vUnch=e===1?"x":"x^{"+e+"}";
    if(form===0){
      // c x^e \sqrt{r} -> \sqrt{c^2 r x^{2e}}
      key="\\(\\sqrt{"+(c*c*r)+vSq+"}\\)";
      var d1="\\(\\sqrt{"+(c*c*r)+vUnch+"}\\)";
      var d2="\\(\\sqrt{"+(c*r)+vSq+"}\\)";
      var d3="\\(\\sqrt{"+(c*r)+vUnch+"}\\)";
      ds=[d1,d2,d3];
    }else{
      // c x^e \sqrt{r x} -> \sqrt{c^2 r x^{2e+1}}
      var vSqP="x^{"+(2*e+1)+"}";
      var vUnchP="x^{"+(e+1)+"}";
      key="\\(\\sqrt{"+(c*c*r)+vSqP+"}\\)";
      var d1="\\(\\sqrt{"+(c*c*r)+vUnchP+"}\\)";
      var d2="\\(\\sqrt{"+(c*r)+vSqP+"}\\)";
      var d3="\\(\\sqrt{"+(c*r)+vUnchP+"}\\)";
      ds=[d1,d2,d3];
    }
    if(ds.indexOf(key)>=0||ds[0]===ds[1]||ds[0]===ds[2]||ds[1]===ds[2])ds=null;
  }while(!ds&&tries<80);
  var vDisp=e===1?"x":"x^{"+e+"}";
  var radDisp=form===0?sqrtT(r):"\\(\\sqrt{"+r+"x}\\)";
  return mcq("Assuming \\(x \\ge 0\\), express \\("+c+vDisp+"\\)"+radDisp+" as an entire radical.",
    key,ds,
    "Square the entire outside factor \\("+c+vDisp+"\\) to move it inside the square root: \\(("+c+vDisp+")^2 = "+(c*c)+"x^{"+(2*e)+"}\\). Multiply by the existing radicand \\("+(form===0?r:r+"x")+"\\) to get <b>"+key+"</b>.",
    {c:c,e:e,r:r,form:form});
});

E("u4-variable-evaluate",4,["1.3"],1,"gen",function(){
  var coeff=ri(2,6);
  var m=ri(2,5);
  var k=ri(3,9);
  var shift=ri(1,10);
  var sign=pick([-1,1]);
  // rad = m*x + sign*shift = k^2 => m*x = k^2 - sign*shift
  var x,tries=0;
  do{
    m=ri(2,5);k=ri(3,9);shift=ri(1,12);sign=pick([-1,1]);tries++;
    var rhs=k*k-sign*shift;
    if(rhs>0&&rhs%m===0){x=rhs/m;break;}
  }while(tries<100);
  if(!x){m=2;k=4;shift=2;sign=1;x=7;}
  var ans=coeff*k;
  var radStrExpr=m+"x "+(sign>0?"+ "+shift:"- "+shift);
  return numq("Evaluate \\("+coeff+"\\sqrt{"+radStrExpr+"}\\) when \\(x = "+x+"\\).",
    ans,0.011,
    "Substitute \\(x = "+x+"\\) into the expression: \\("+coeff+"\\sqrt{"+m+"("+x+") "+(sign>0?"+ "+shift:"- "+shift)+"} = "+coeff+"\\sqrt{"+(k*k)+"} = "+coeff+"("+k+") = "+ans+"\\). The value is <b>\\("+ans+"\\)</b>.",
    {coeff:coeff,m:m,shift:shift,sign:sign,x:x,k:k});
});

E("u4-variable-cube",4,["1.3"],2,"gen",function(){
  var a,b,q,rem,key,ds,tries=0;
  do{
    a=pick([2,3,4]);b=pick([2,3,5]);q=ri(1,3);rem=pick([1,2]);tries++;
    var n=a*a*a*b;
    var exp=3*q+rem;
    var outVar=q===1?"x":"x^{"+q+"}";
    var inVar=rem===1?"x":"x^{"+rem+"}";
    key="\\("+a+outVar+"\\sqrt[3]{"+b+inVar+"}\\)";
    // Distractor 1: square root exponent habit (halve exp)
    var q2=Math.floor(exp/2),rem2=exp%2;
    var outV2=q2===1?"x":"x^{"+q2+"}";
    var inV2=rem2===0?"":(rem2===1?"x":"x^{"+rem2+"}");
    var d1="\\("+a+outV2+"\\sqrt[3]{"+b+inV2+"}\\)";
    // Distractor 2: variable brought out with exponent unchanged
    var d2="\\("+a+"x^{"+exp+"}\\sqrt[3]{"+b+"}\\)";
    // Distractor 3: numerical cube root mishandled (a^2 or wrong coeff)
    var badA=a===2?4:2;
    var d3="\\("+badA+outVar+"\\sqrt[3]{"+b+inVar+"}\\)";
    ds=[d1,d2,d3];
    if(ds.indexOf(key)>=0||ds[0]===ds[1]||ds[0]===ds[2]||ds[1]===ds[2])ds=null;
  }while(!ds&&tries<100);
  var n=a*a*a*b,exp=3*q+rem;
  var outVar=q===1?"x":"x^{"+q+"}";
  var inVar=rem===1?"x":"x^{"+rem+"}";
  return mcq("Simplify \\(\\sqrt[3]{"+n+"x^{"+exp+"}}\\) completely.",
    key,ds,
    "Factor the radicand into perfect cubes and leftovers: \\("+n+"x^{"+exp+"} = "+a+"^3 \\cdot "+b+" \\cdot (x^{"+q+"})^3 \\cdot "+inVar+"\\). Taking the cube root of the perfect cube factors gives \\("+a+outVar+"\\), leaving \\("+b+inVar+"\\) inside the cube root. The simplified form is <b>"+key+"</b>.",
    {a:a,b:b,q:q,rem:rem});
});

E("u4-order-mixed-index",4,["1.4"],2,"gen",function(){
  var pool=[
    {tex:"\\(\\sqrt{5}\\)",val:Math.sqrt(5)},
    {tex:"\\(\\sqrt{7}\\)",val:Math.sqrt(7)},
    {tex:"\\(\\sqrt{10}\\)",val:Math.sqrt(10)},
    {tex:"\\(\\sqrt{12}\\)",val:Math.sqrt(12)},
    {tex:"\\(\\sqrt{15}\\)",val:Math.sqrt(15)},
    {tex:"\\(2\\sqrt{2}\\)",val:2*Math.sqrt(2)},
    {tex:"\\(2\\sqrt{3}\\)",val:2*Math.sqrt(3)},
    {tex:"\\(\\sqrt[3]{10}\\)",val:Math.cbrt(10)},
    {tex:"\\(\\sqrt[3]{20}\\)",val:Math.cbrt(20)},
    {tex:"\\(\\sqrt[3]{30}\\)",val:Math.cbrt(30)},
    {tex:"\\(\\sqrt[3]{50}\\)",val:Math.cbrt(50)},
    {tex:"\\(2\\sqrt[3]{3}\\)",val:2*Math.cbrt(3)}
  ];
  var chosen,tries=0,key,ds;
  do{
    tries++;
    var idx=[];
    while(idx.length<4){var r=ri(0,pool.length-1);if(idx.indexOf(r)<0)idx.push(r);}
    chosen=idx.map(function(i){return pool[i];});
    var dealt=chosen.slice();
    chosen.sort(function(x,y){return x.val-y.val;});
    var ok=true;
    for(var i=0;i<3;i++){if(chosen[i+1].val-chosen[i].val<0.12)ok=false;}
    if(!ok){ds=null;continue;}
    function fmtList(arr){return arr.map(function(x){return x.tex;}).join(", ");}
    key=fmtList(chosen);
    var s1=[chosen[1],chosen[0],chosen[2],chosen[3]];
    var s2=[chosen[0],chosen[1],chosen[3],chosen[2]];
    var rev=[chosen[3],chosen[2],chosen[1],chosen[0]];
    ds=[fmtList(s1),fmtList(s2),fmtList(rev)];
    if(ds.indexOf(key)>=0||ds[0]===ds[1]||ds[0]===ds[2]||ds[1]===ds[2])ds=null;
  }while(!ds&&tries<120);
  var approx=chosen.map(function(x){return x.tex+" \\(\\approx "+fmt(x.val,2)+"\\)";}).join(", ");
  return mcq("Order the following radicals from least to greatest: "+dealt.map(function(x){return x.tex;}).join(", ")+".",
    key,ds,
    "Convert each radical to an approximate decimal (or raise all to the 6th power to compare): "+approx+". Arranged from least to greatest, the order is <b>"+key+"</b>.",
    {items:dealt.map(function(x){return x.tex;})});
});

E("u4-closest-integer",4,["1.4"],1,"gen",function(){
  var k,n,tries=0;
  do{
    k=ri(3,11);
    n=ri(k*k+1,(k+1)*(k+1)-1);
    tries++;
    var sq=Math.sqrt(n);
    var distLow=sq-k,distHigh=(k+1)-sq;
    if(Math.abs(distLow-distHigh)>=0.12)break;
  }while(tries<100);
  var closest=Math.sqrt(n)-k<(k+1)-Math.sqrt(n)?k:(k+1);
  var otherBound=closest===k?(k+1):k;
  var key=String(closest);
  var ds=[String(k-1),String(otherBound),String(k+2)];
  return mcq("Which whole number is closest to \\(\\sqrt{"+n+"}\\)?",
    key,ds,
    "Note that \\("+k+"^2 = "+(k*k)+"\\) and \\("+(k+1)+"^2 = "+((k+1)*(k+1))+"\\), so \\(\\sqrt{"+n+"}\\) lies between \\("+k+"\\) and \\("+(k+1)+"\\). Since \\("+n+"\\) is closer to \\("+(closest*closest)+"\\) (and \\(\\sqrt{"+n+"} \\approx "+fmt(Math.sqrt(n),2)+"\\)), the closest whole number is <b>"+key+"</b>.",
    {k:k,n:n,closest:closest});
});

E("u4-defined-two-radicals",4,["1.5"],2,"gen",function(){
  var a,b,key,ds,tries=0;
  do{
    a=ri(-6,3);b=ri(a+2,9);tries++;
    // \sqrt{x - a} + \sqrt{b - x} => a <= x <= b
    var cond1="\\(x \\ge "+a+"\\)";
    var cond2="\\(x \\le "+b+"\\)";
    key="\\("+a+" \\le x \\le "+b+"\\)";
    var d3="\\(x \\le "+a+"\\) or \\(x \\ge "+b+"\\)";
    ds=[cond1,cond2,d3];
    if(ds.indexOf(key)>=0||ds[0]===ds[1]||ds[0]===ds[2]||ds[1]===ds[2])ds=null;
  }while(!ds&&tries<80);
  var t1=a===0?"x":(a>0?"x - "+a:"x + "+(-a));
  var t2=b===0?"-x":(b>0?b+" - x":b+" - x");
  var op=pick(["+","-"]);
  return mcq("For which values of \\(x\\) is the expression \\(\\sqrt{"+t1+"} "+op+" \\sqrt{"+t2+"}\\) defined as a real number?",
    key,ds,
    "Both radicands must be non-negative simultaneously. From \\("+t1+" \\ge 0\\), we get \\(x \\ge "+a+"\\); from \\("+t2+" \\ge 0\\), we get \\(x \\le "+b+"\\). Combining both conditions gives <b>"+key+"</b>.",
    {a:a,b:b,op:op});
});

E("u4-defined-boundary",4,["1.5"],2,"gen",function(){
  var m,b,x0,tries=0;
  do{
    m=pick([-5,-4,-3,-2,2,3,4,5]);
    x0=ri(-8,8);
    b=-m*x0;
    tries++;
  }while(b===0&&tries<50);
  var expr=m+"x "+(b>0?"+ "+b:"- "+(-b));
  return numq("The radical expression \\(\\sqrt{"+expr+"}\\) is defined for \\(x "+(m>0?"\\ge":"\\le")+" k\\). What is the boundary value \\(k\\)?",
    x0,0.011,
    "Set the radicand equal to zero to find the endpoint of the domain: \\("+expr+" = 0\\), so \\("+m+"x = "+(-b)+"\\) and \\(x = "+x0+"\\). The boundary value is <b>\\("+x0+"\\)</b>.",
    {m:m,b:b,x0:x0});
});

E("u4-rationalize-binomial",4,["1.7"],2,"gen",function(){
  var num,a,b,den,key,ds,tries=0;
  do{
    num=pick([2,3,4,5,6]);
    a=ri(2,5);
    b=pick([2,3,5,6,7]);
    den=a*a-b;
    tries++;
    if(den<=1||num%den===0)continue;
    function gcd(x,y){while(y){var t=y;y=x%y;x=t;}return x||1;}
    if(gcd(num,den)!==1)continue;
    // num / (a + \sqrt{b}) => num(a - \sqrt{b}) / (a^2 - b)
    key="\\(\\frac{"+(num*a)+" - "+num+"\\sqrt{"+b+"}}{"+den+"}\\)";
    // Distractor 1: multiplied by same binomial (a + \sqrt{b}) instead of conjugate => num(a + \sqrt{b}) / (a^2 + b + 2a\sqrt{b})
    var d1="\\(\\frac{"+(num*a)+" + "+num+"\\sqrt{"+b+"}}{"+(a*a+b)+" + "+(2*a)+"\\sqrt{"+b+"}}\\)";
    // Distractor 2: conjugate used, denominator difference of squares botched as a^2 + b
    var d2="\\(\\frac{"+(num*a)+" - "+num+"\\sqrt{"+b+"}}{"+(a*a+b)+"}\\)";
    // Distractor 3: conjugate applied to denominator only, numerator unmultiplied
    var d3="\\(\\frac{"+num+"}{"+den+"}\\)";
    ds=[d1,d2,d3];
    if(ds.indexOf(key)>=0||ds[0]===ds[1]||ds[0]===ds[2]||ds[1]===ds[2])ds=null;
  }while(!ds&&tries<120);
  return mcq("Rationalize the denominator: \\(\\frac{"+num+"}{"+a+" + \\sqrt{"+b+"}}\\).",
    key,ds,
    "Multiply numerator and denominator by the conjugate \\("+a+" - \\sqrt{"+b+"}\\): \\(\\frac{"+num+"("+a+" - \\sqrt{"+b+"})}{("+a+" + \\sqrt{"+b+"})("+a+" - \\sqrt{"+b+"})} = \\frac{"+(num*a)+" - "+num+"\\sqrt{"+b+"}}{"+(a*a)+" - "+b+"}\\). Simplifying the denominator gives <b>"+key+"</b>.",
    {num:num,a:a,b:b,den:den});
});

E("u4-rationalize-cube-root",4,["1.7"],2,"gen",function(){
  var num,b,key,ds,tries=0;
  do{
    num=pick([2,3,4,5,7]);
    b=pick([2,3,4,5,6,7]);
    tries++;
    if(num%b===0)continue;
    var bSq=b*b;
    // Check if bSq has a cube factor (e.g., b=4 => bSq=16=8*2, avoid so \sqrt[3]{b^2} is already simplest)
    if(b===4||b===6)continue;
    key="\\(\\frac{"+num+"\\sqrt[3]{"+bSq+"}}{"+b+"}\\)";
    // Distractor 1: multiplied by \sqrt[3]{b} (square root habit) => num\sqrt[3]{b} / \sqrt[3]{b^2}
    var d1="\\(\\frac{"+num+"\\sqrt[3]{"+b+"}}{\\sqrt[3]{"+bSq+"}}\\)";
    // Distractor 2: correct multiplier on denominator, numerator left unmultiplied
    var d2="\\(\\frac{"+num+"}{"+b+"}\\)";
    // Distractor 3: denominator's cube computed incorrectly as b^2
    var d3="\\(\\frac{"+num+"\\sqrt[3]{"+bSq+"}}{"+bSq+"}\\)";
    ds=[d1,d2,d3];
    if(ds.indexOf(key)>=0||ds[0]===ds[1]||ds[0]===ds[2]||ds[1]===ds[2])ds=null;
  }while(!ds&&tries<100);
  return mcq("Rationalize the denominator: \\(\\frac{"+num+"}{\\sqrt[3]{"+b+"}}\\).",
    key,ds,
    "To form a perfect cube \\("+b+"^3\\) under the cube root, multiply numerator and denominator by \\(\\sqrt[3]{"+b+"^2} = \\sqrt[3]{"+(b*b)+"}\\): \\(\\frac{"+num+"\\sqrt[3]{"+(b*b)+"}}{\\sqrt[3]{"+(b*b*b)+"}}\\). Simplifying \\(\\sqrt[3]{"+(b*b*b)+"} = "+b+"\\) gives <b>"+key+"</b>.",
    {num:num,b:b});
});

E("u4-restriction-boundary",4,["1.8"],1,"gen",function(){
  var a,x0,b,rhs,tries=0;
  do{
    a=ri(2,5);x0=ri(-6,7);b=-a*x0;rhs=ri(2,7);tries++;
  }while(b===0&&tries<50);
  var expr=a+"x "+(b>0?"+ "+b:"- "+(-b));
  return numq("For the radical equation \\(\\sqrt{"+expr+"} = "+rhs+"\\), the restriction on \\(x\\) is \\(x \\ge k\\). What is the value of \\(k\\)?",
    x0,0.011,
    "The radicand must be non-negative: \\("+expr+" \\ge 0\\), so \\("+a+"x \\ge "+(-b)+"\\) and \\(x \\ge "+x0+"\\). The smallest permitted value is <b>\\("+x0+"\\)</b>.",
    {a:a,b:b,rhs:rhs,x0:x0});
});

E("u4-equation-both-sides",4,["1.9"],2,"gen",function(){
  var a,b,c,d,sol,key,ds,tries=0;
  do{
    a=ri(3,6);c=ri(1,a-1);
    sol=ri(1,8);
    b=a*pick([-1,1])*ri(1,Math.floor(6/a));
    d=(a-c)*sol+b;
    tries++;
    if(b===0||d===0)continue;
    if(a*sol+b<0||c*sol+d<0)continue;
    key="\\(x = "+sol+"\\)";
    // Distractor 1: coefficients added instead of subtracted => (a+c)x = d - b
    var bad1=(d-b)/(a+c);
    // Distractor 2: constant sign flipped in collection => (a-c)x = d + b
    var bad2=(d+b)/(a-c);
    // Distractor 3: restriction boundary from left radicand => -b/a
    var bad3=-b/a;
    if(!Number.isInteger(bad1)||!Number.isInteger(bad2)||!Number.isInteger(bad3)){ds=null;continue;}
    ds=["\\(x = "+bad1+"\\)","\\(x = "+bad2+"\\)","\\(x = "+bad3+"\\)"];
    if(ds.indexOf(key)>=0||ds[0]===ds[1]||ds[0]===ds[2]||ds[1]===ds[2])ds=null;
  }while(!ds&&tries<150);
  var lhs=a+"x "+(b>0?"+ "+b:"- "+(-b));
  var rhs=(c===1?"x":c+"x")+" "+(d>0?"+ "+d:"- "+(-d));
  return mcq("Solve for \\(x\\): \\(\\sqrt{"+lhs+"} = \\sqrt{"+rhs+"}\\).",
    key,ds,
    "Square both sides to equate the radicands: \\("+lhs+" = "+rhs+"\\). Subtract \\("+(c===1?"x":c+"x")+"\\) from both sides to get \\("+(a-c)+"x = "+(d-b)+"\\), so \\(x = "+sol+"\\). Checking in both radicands confirms both equal \\("+(a*sol+b)+" \\ge 0\\). The solution is <b>"+key+"</b>.",
    {a:a,b:b,c:c,d:d,sol:sol});
});

E("u4-cube-equation-shifted",4,["1.9"],2,"gen",function(){
  var a,b,sol,k,c,rhs,tries=0;
  do{
    a=ri(2,4);sol=ri(-5,7);k=pick([-3,-2,2,3]);
    b=k*k*k-a*sol;
    c=ri(2,8);
    var sign=pick([-1,1]);
    rhs=k+sign*c;
    tries++;
    if(b===0)continue;
    var expr=a+"x "+(b>0?"+ "+b:"- "+(-b));
    var shiftStr=sign>0?"+ "+c:"- "+c;
    return numq("Solve for \\(x\\): \\(\\sqrt[3]{"+expr+"} "+shiftStr+" = "+rhs+"\\).",
      sol,0.011,
      "Isolate the cube root first by "+(sign>0?"subtracting "+c:"adding "+c)+" on both sides: \\(\\sqrt[3]{"+expr+"} = "+k+"\\). Cube both sides: \\("+expr+" = "+k+"^3 = "+(k*k*k)+"\\). Subtract "+(b>0?b:"("+b+")")+" to get \\("+a+"x = "+(a*sol)+"\\), so \\(x = "+sol+"\\). The root is <b>\\("+sol+"\\)</b>.",
      {a:a,b:b,c:c,sign:sign,rhs:rhs,sol:sol});
  }while(tries<50);
});

E("u4-verify-which-root",4,["1.10"],2,"gen",function(){
  var sol,negCand,flipCand,a,b,c,tries=0,key,ds;
  do{
    // Equation: \sqrt{x + a} = x - c, with sol > c so sol - c > 0
    sol=ri(3,9);
    var k=ri(2,4);
    c=sol-k;
    a=k*k-sol;
    // Equation is \sqrt{x + a} = x - c
    // Candidate 2 (negative radicand): x < -a
    negCand=-a-ri(2,5);
    // Candidate 3 (satisfies sign-flipped RHS, i.e., \sqrt{x + a} = c - x, where c - x > 0 so x < c):
    // Try to find integer flipCand < c with flipCand + a = (c - flipCand)^2
    flipCand=null;
    for(var cand=c-1;cand>=-a;cand--){
      if(cand+a===(c-cand)*(c-cand)){flipCand=cand;break;}
    }
    tries++;
    if(flipCand===null||flipCand===sol||flipCand===negCand||negCand===sol)continue;
    key="\\(x = "+sol+"\\)";
    var d1="\\(x = "+negCand+"\\)";
    var d2="\\(x = "+flipCand+"\\)";
    var d3="None of these values";
    ds=[d1,d2,d3];
  }while(!ds&&tries<200);
  var radStr=a===0?"x":(a>0?"x + "+a:"x - "+(-a));
  var rhsStr=c===0?"x":(c>0?"x - "+c:"x + "+(-c));
  return mcq("Which of the following values is a root of \\(\\sqrt{"+radStr+"} = "+rhsStr+"\\)?",
    key,ds,
    "Substitute each candidate into \\(\\sqrt{"+radStr+"} = "+rhsStr+"\\). At \\(x = "+negCand+"\\), the radicand is \\("+(negCand+a)+" < 0\\) (not real). At \\(x = "+flipCand+"\\), the left side is \\(\\sqrt{"+(flipCand+a)+"} = "+(c-flipCand)+"\\) while the right side is \\("+(flipCand-c)+"\\). At \\(x = "+sol+"\\), \\(\\sqrt{"+(sol+a)+"} = "+(sol-c)+"\\) and the right side is \\("+(sol-c)+"\\). The valid root is <b>"+key+"</b>.",
    {a:a,c:c,sol:sol,negCand:negCand,flipCand:flipCand});
});

E("u4-verify-first-mistake",4,["1.10"],2,"var",varset([
  function(){
    return mcq("A student checks whether \\(x = 6\\) is a root of \\(\\sqrt{2x + 4} = x - 2\\).<br>Line 1: Substitute \\(x = 6\\): \\(\\sqrt{2(6) + 4} = 6 - 2\\)<br>Line 2: Simplify inside the root: \\(\\sqrt{12 + 4} = 4\\)<br>Line 3: Evaluate: \\(\\sqrt{16} = 8\\), so \\(8 = 4\\)<br>Line 4: Since \\(8 \\ne 4\\), \\(x = 6\\) is not a root.<br>In which line is the FIRST mistake?",
      "Line 3",["Line 1","Line 2","Line 4"],
      "Lines 1 and 2 substitute \\(x = 6\\) and simplify the radicand to \\(16\\) correctly. In Line 3, the student evaluated \\(\\sqrt{16}\\) as \\(8\\) (halving instead of taking the square root); \\(\\sqrt{16} = 4\\), which matches the right side. The first mistake is in <b>Line 3</b>.",
      {variant:1,mistakeLine:3});
  },
  function(){
    return mcq("A student checks whether \\(x = 1\\) is a root of \\(\\sqrt{x + 8} = x - 4\\).<br>Line 1: Substitute \\(x = 1\\): \\(\\sqrt{1 + 8} = 1 - 4\\)<br>Line 2: Simplify both sides: \\(\\sqrt{9} = -3\\)<br>Line 3: Evaluate the principal root: \\(3 = -3\\)<br>Line 4: Both sides have magnitude \\(3\\), so \\(x = 1\\) is a root.<br>In which line is the FIRST mistake?",
      "Line 4",["Line 1","Line 2","Line 3"],
      "Lines 1, 2, and 3 evaluate both sides accurately, arriving at \\(3 = -3\\). In Line 4, the student concludes \\(x = 1\\) is a root even though \\(3 \\ne -3\\) (an extraneous root). The first mistake is in <b>Line 4</b>.",
      {variant:2,mistakeLine:4});
  },
  function(){
    return mcq("A student checks whether \\(x = 5\\) is a root of \\(\\sqrt{3x + 1} - 1 = 3\\).<br>Line 1: Substitute \\(x = 5\\): \\(\\sqrt{3(5) + 1} - 1 = 3\\)<br>Line 2: Simplify inside the root: \\(\\sqrt{15 + 1} - 1 = 3\\)<br>Line 3: Evaluate: \\(\\sqrt{16} - 1 = 3 \\implies 4 - 1 = 3\\)<br>Line 4: Since \\(3 = 3\\), \\(x = 5\\) is extraneous.<br>In which line is the FIRST mistake?",
      "Line 4",["Line 1","Line 2","Line 3"],
      "Lines 1 through 3 evaluate the left side properly to \\(3\\), matching the right side. In Line 4, the student calls a verified solution extraneous instead of valid. The first mistake is in <b>Line 4</b>.",
      {variant:3,mistakeLine:4});
  },
  function(){
    return mcq("A student checks whether \\(x = -3\\) is a root of \\(\\sqrt{1 - 5x} = 1 - x\\).<br>Line 1: Substitute \\(x = -3\\): \\(\\sqrt{1 - 5(-3)} = 1 - (-3)\\)<br>Line 2: Simplify: \\(\\sqrt{1 - 15} = 4\\)<br>Line 3: Evaluate: \\(\\sqrt{-14} = 4\\)<br>Line 4: Since \\(\\sqrt{-14}\\) is not real, \\(x = -3\\) is not a root.<br>In which line is the FIRST mistake?",
      "Line 2",["Line 1","Line 3","Line 4"],
      "Line 1 substitutes \\(x = -3\\) correctly. In Line 2, \\(-5(-3) = +15\\), so the radicand is \\(1 + 15 = 16\\), not \\(1 - 15 = -14\\) (\\(x = -3\\) is actually a valid root since \\(\\sqrt{16} = 4\\)). The first mistake is in <b>Line 2</b>.",
      {variant:4,mistakeLine:2});
  }
]));

E("u4-extraneous-valid-root",4,["1.11"],2,"gen",function(){
  // Build \sqrt{x + a} = x - c with two distinct integer roots r1 < c < r2 of (x - c)^2 = x + a
  // Let k1 = c - r1 > 0 (extraneous) and k2 = r2 - c > 0 (valid), with k1 !== k2
  // Quadratic: x^2 - (2c + 1)x + (c^2 - a) = 0 => r1 + r2 = 2c + 1 => r2 - c = c - r1 + 1 => k2 = k1 + 1
  var k1=ri(1,4);
  var k2=k1+1;
  var c=ri(0,5);
  var r1=c-k1;
  var r2=c+k2;
  var a=k2*k2-r2;
  var radStr=a===0?"x":(a>0?"x + "+a:"x - "+(-a));
  var rhsStr=c===0?"x":(c>0?"x - "+c:"x + "+(-c));
  var bQuad=-(2*c+1),cQuad=c*c-a;
  return numq("Solve \\(\\sqrt{"+radStr+"} = "+rhsStr+"\\) and state the valid root.",
    r2,0.011,
    "Square both sides: \\("+radStr+" = ("+rhsStr+")^2\\), which rearranges to \\(x^2 "+(bQuad>=0?"+ "+bQuad:"- "+(-bQuad))+"x "+(cQuad>=0?"+ "+cQuad:"- "+(-cQuad))+" = 0\\). Factoring gives \\((x "+(r1>=0?"- "+r1:"+ "+(-r1))+")(x "+(r2>=0?"- "+r2:"+ "+(-r2))+") = 0\\), so \\(x = "+r1+"\\) or \\(x = "+r2+"\\). Check \\(x = "+r1+"\\): \\(\\sqrt{"+(r1+a)+"} = "+k1+"\\) while \\("+rhsStr+" = "+(r1-c)+"\\) (extraneous). Check \\(x = "+r2+"\\): \\(\\sqrt{"+(r2+a)+"} = "+k2+"\\) and \\("+rhsStr+" = "+(r2-c)+"\\). The valid root is <b>\\("+r2+"\\)</b>.",
    {a:a,c:c,r1:r1,r2:r2});
});

E("u4-no-solution-equation",4,["1.11"],3,"gen",function(){
  var a=ri(1,5);
  var k=ri(2,6);
  var r=k*k-a;
  // \sqrt{x + a} = -k => squaring gives x = k^2 - a = r; boundary is -a
  var radStr="x + "+a;
  var key="No solution";
  var ds=[
    "\\(x = "+r+"\\)",
    "\\(x = "+(-a)+"\\)",
    "\\(x = "+(-a)+"\\) and \\(x = "+r+"\\)"
  ];
  return mcq("Determine the solution to the equation \\(\\sqrt{"+radStr+"} = -"+k+"\\).",
    key,ds,
    "The principal square root \\(\\sqrt{"+radStr+"}\\) is always greater than or equal to \\(0\\) for all real values in its domain, so it can never equal the negative number \\(-"+k+"\\) (squaring gives the extraneous candidate \\(x = "+r+"\\)). Therefore, there is <b>No solution</b>.",
    {a:a,k:k,r:r});
});

E("u4-model-solve-variable",4,["1.12"],2,"gen",function(){
  var ctx=ri(0,1);
  if(ctx===0){
    // Distance to horizon d = 3.5 \sqrt{h}, pick h as a clean integer so d = 3.5 * k
    var k=ri(3,9);
    var h=k*k;
    var d=3.5*k;
    return numq("The distance \\(d\\) (in kilometres) to the horizon from an observation deck at height \\(h\\) (in metres) is modelled by \\(d = 3.5\\sqrt{h}\\). If a ferry is visible on the horizon at \\(d = "+fmt(d,1)+"\\text{ km}\\), find the height \\(h\\) of the deck in metres.",
      h,0.011,
      "Substitute \\(d = "+fmt(d,1)+"\\) into the formula: \\("+fmt(d,1)+" = 3.5\\sqrt{h}\\). Divide both sides by \\(3.5\\) to isolate the radical: \\(\\sqrt{h} = "+k+"\\). Square both sides to get \\(h = "+k+"^2 = "+h+"\\). The height is <b>\\("+h+"\\)</b>.",
      {ctx:0,k:k,h:h,d:d});
  }else{
    // Free-fall time t = \sqrt{d / 4.9}, pick t as integer so d = 4.9 * t^2
    var t=ri(2,6);
    var d=4.9*t*t;
    return numq("The time \\(t\\) (in seconds) for a stone to fall a distance \\(d\\) (in metres) is modelled by \\(t = \\sqrt{\\frac{d}{4.9}}\\). If the stone takes \\(t = "+t+"\\text{ s}\\) to reach the water below, find the distance \\(d\\) in metres.",
      d,0.011,
      "Substitute \\(t = "+t+"\\) into the formula: \\("+t+" = \\sqrt{\\frac{d}{4.9}}\\). Square both sides: \\("+(t*t)+" = \\frac{d}{4.9}\\). Multiply by \\(4.9\\) to get \\(d = "+(t*t)+" \\times 4.9 = "+fmt(d,1)+"\\). The distance is <b>\\("+fmt(d,1)+"\\)</b>.",
      {ctx:1,t:t,d:d});
  }
});

E("u4-model-equation-two-step",4,["1.12"],2,"gen",function(){
  var fixed=ri(4,15);
  var coeff=ri(2,6);
  var total=fixed+coeff*ri(3,7);
  var key="\\("+fixed+" + "+coeff+"\\sqrt{x} = "+total+"\\)";
  var d1="\\("+coeff+"\\sqrt{"+fixed+" + x} = "+total+"\\)";
  var d2="\\(\\sqrt{"+fixed+" + "+coeff+"x} = "+total+"\\)";
  var d3="\\("+fixed+" + "+coeff+"x^2 = "+total+"\\)";
  return mcq("A walkway consists of a fixed \\("+fixed+"\\text{ m}\\) wooden ramp connected to a stone path whose length (in metres) is \\("+coeff+"\\) times the square root of its width \\(x\\) (in metres). If the total length of the walkway is \\("+total+"\\text{ m}\\), which equation models this situation?",
    key,[d1,d2,d3],
    "The total length is the sum of the fixed \\("+fixed+"\\text{ m}\\) ramp and the stone path's length \\("+coeff+"\\sqrt{x}\\). Setting this sum equal to \\("+total+"\\) gives <b>"+key+"</b>.",
    {fixed:fixed,coeff:coeff,total:total});
});

/* PK tranche pass for Unit 4. pkFor is Cluster 4's dependent
   indicator list from the prior knowledge map. */
var PKT_U4_FOR=["1.1","1.2","1.4","1.5","1.6","1.7","1.9","1.11"];
var PKT_U4={
 "u4-pk-radical-mixed":{src:"math-1201:1.16",group:"radical-forms"},
 "u4-pk-radical-entire":{src:"math-1201:1.17",group:"radical-forms"},
 "u4-pk-laws-integral":{src:"math-1201:1.6",group:"exponent-laws"},
 "u4-pk-laws-rational":{src:"math-1201:1.6",group:"exponent-laws"},
 "u4-pk-evaluate-exp":{src:"math-1201:1.6, 1.3",group:"exponent-laws"},
 "u4-pk-which-is-solution":{src:"math-9:8.20",group:"verify-solution"},
 "u4-pk-solve-two-step":{src:"math-9:8.18",group:"equation-solving"},
 "u4-pk-defined":{src:"authored:definedness-numerical",group:"definedness"}};
BANK.forEach(function(e){var t=PKT_U4[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U4_FOR.slice();e.pkGroup=t.group;}});

/* ----- bank-u6.js ----- */
// Math 2201 Unit 6: Proportional Reasoning question bank
// Cut verbatim from the standalone app's served file
// (math-2201-review/Math2201Review.html, lines 1522 to 1686).
// CRMARKS: u6-scale-factor=1
// CRMARKS: u6-unknown-dimension=1
// CRMARKS: u6-area-scale=2
// CRMARKS: u6-volume-scale=2
// CRMARKS: u6-unit-rate=1
// CRMARKS: u6-better-buy=2
// CRMARKS: u6-rate-solve=1
// CRMARKS: u6-poster-cost=3
// CRMARKS: u6-work-rate-solo=3
// CRMARKS: u6-justify-consistency=3
// CRMARKS: u6-breakeven-plans=2
/* ============ Unit 6: Proportional Reasoning ============ */
E("u6-scale-factor",6,["6.9"],1,"gen",function(){
  var k=pick([8,9,10,12,15,18,20,24,25,30,40,50,60]);var model=pick([3,4,5,6,7,8,9,10,12,14]);var real=model*k;
  var frame=pick([
    "On a model, a part measures "+model+" cm. On the real object it measures "+real+" cm. What is the scale factor (actual \\(\\div\\) model)?",
    "A scale drawing shows a length of "+model+" cm for an object that is really "+real+" cm long. What is the scale factor (actual \\(\\div\\) model)?",
    "A map feature measures "+model+" cm on the map and "+real+" cm on the ground. What is the scale factor (actual \\(\\div\\) model)?"]);
  return numq(frame,
    k,0.011,"Scale factor = \\("+real+" \\div "+model+" = \\)<b>\\("+k+"\\)</b>. The scale is \\(1 : "+k+"\\).",{k:k,model:model});
});
E("u6-unknown-dimension",6,["6.9"],1,"gen",function(){
  var k=pick([10,12,15,20,24,25,30,40,50,60,100]);var obj=pick([{w:"toy car",u:"cm"},{w:"model boat",u:"cm"},{w:"dollhouse room",u:"cm"},{w:"model train",u:"cm"},{w:"miniature lighthouse",u:"cm"},{w:"model airplane",u:"cm"}]);
  var modelDim=pick([3,4,5,6,7,8,9,10,12,14]);var real=modelDim*k;
  return numq("A "+obj.w+" is built to a scale of \\(1 : "+k+"\\). A part that is "+modelDim+" "+obj.u+" long on the model represents what length on the real object, in "+obj.u+"?",
    real,0.011,"Multiply by the scale factor: \\("+modelDim+" \\times "+k+" = \\)<b>\\("+real+"\\text{ "+obj.u+"}\\)</b>.",{k:k,modelDim:modelDim});
});
E("u6-area-scale",6,["6.5","6.14"],1,"gen",function(){
  var k=pick([2,3,4,5,6,8,10]);var areaD=pick([3,4,5,6,7,8,9,10,12,14,15,16,18,20,24,25]);
  var obj=pick(["room","garden plot","mural","kitchen floor","rug design"]);
  var real=areaD*k*k;
  return numq("A scale diagram uses scale factor \\("+k+"\\) (diagram : actual = \\(1 : "+k+"\\)). A "+obj+" has area \\("+areaD+"\\text{ cm}^2\\) on the diagram. What is its actual area, in \\(\\text{cm}^2\\)?",
    real,0.011,"Areas scale by the square of the scale factor: \\("+areaD+" \\times "+k+"^2 = "+areaD+" \\times "+(k*k)+" = \\)<b>\\("+real+"\\text{ cm}^2\\)</b>. (Lengths scale by \\("+k+"\\); areas by \\("+k+"^2\\); volumes by \\("+k+"^3\\).)",{k:k,areaD:areaD});
});
E("u6-volume-scale",6,["6.10","6.14"],1,"gen",function(){
  var k=pick([2,3,4,5,6,10]);var askVol=Math.random()<0.5;var base=pick([3,4,5,6,8,10,12,15,20,25]);var f=askVol?k*k*k:k*k;var ans=base*f;
  var obj=pick(["model car","aquarium","storage tank","dollhouse"]);
  return numq("A "+obj+" is built at scale \\(1 : "+k+"\\). The model’s "+(askVol?"volume is \\("+base+"\\text{ cm}^3\\)":"surface area is \\("+base+"\\text{ cm}^2\\)")+". What is the corresponding measurement for the real object, in the same cubic/square units?",
    ans,0.011,(askVol?"Volumes":"Surface areas")+" scale by \\("+k+(askVol?"^3":"^2")+" = "+f+"\\): \\("+base+" \\times "+f+" = \\)<b>\\("+ans+"\\)</b>.",{k:k,base:base,askVol:askVol});
});
E("u6-unit-rate",6,["6.17"],1,"gen",function(){
  var ctxs=[
    {pre:"A case of juice boxes costs $",q:24,u:"dollars per juice box"},
    {pre:"A spool holds ribbon costing $",q:15,u:"dollars per metre of ribbon"},
    {pre:"A pack of granola bars costs $",q:12,u:"dollars per granola bar"},
    {pre:"A bag of dog treats costs $",q:30,u:"dollars per treat"},
    {pre:"A box of pencils costs $",q:20,u:"dollars per pencil"},
    {pre:"A crate of oranges costs $",q:18,u:"dollars per orange"}];
  var ctx=pick(ctxs);var rate=pick([0.5,0.6,0.75,0.8,0.9,1,1.1,1.2,1.25,1.4,1.5,1.6,1.75,1.8,2,2.2,2.4,2.5,2.8,3,3.5,4]);
  var total=Math.round(rate*ctx.q*100)/100;
  return numq(ctx.pre+fmt(total)+", and the pack holds "+ctx.q+". What is the unit rate, in "+ctx.u+"? (Just the number.)",
    rate,0.011,"Unit rate = total cost \\(\\div\\) quantity \\(= "+fmt(total)+" \\div "+ctx.q+" = \\)<b>\\(\\$"+fmt(rate)+"\\)</b>.",{rate:rate,total:total});
});
E("u6-better-buy",6,["6.17"],2,"gen",function(){
  var prod=pick([{w:"juice boxes",u:"juice box"},{w:"granola bars",u:"granola bar"},{w:"pencils",u:"pencil"},{w:"batteries",u:"battery"},{w:"muffins",u:"muffin"},{w:"golf balls",u:"golf ball"}]);
  var q1=pick([3,4,5,6,8,10]);var q2=q1*pick([2,3]);
  var r1=pick([0.9,1.1,1.2,1.4,1.5,1.6,1.8,2,2.2,2.5]);var r2=Math.round((r1-pick([0.1,0.15,0.2,0.25,0.3,0.4]))*100)/100;
  var p1=Math.round(r1*q1*100)/100,p2=Math.round(r2*q2*100)/100;var swap=Math.random()<0.5;
  var A={q:swap?q2:q1,p:swap?p2:p1},B={q:swap?q1:q2,p:swap?p1:p2};
  var winner=A.p/A.q<B.p/B.q?"The first option":"The second option";
  return mcq("Option 1: "+A.q+" "+prod.w+" for $"+fmt(A.p)+". Option 2: "+B.q+" "+prod.w+" for $"+fmt(B.p)+". Which is the better buy?",
    winner+" — its unit rate is \\(\\$"+fmt(Math.min(A.p/A.q,B.p/B.q))+"\\) per "+prod.u+", the lower of the two",
    [(winner==="The first option"?"The second option":"The first option")+" - a bigger package is always cheaper per item in every case","They are the same value - the prices scale exactly for both packs","Whichever costs less overall, regardless of quantity, is always the better buy here"],
    "Unit rates: Option 1: \\("+fmt(A.p)+" \\div "+A.q+" = \\$"+fmt(A.p/A.q)+"\\); Option 2: \\("+fmt(B.p)+" \\div "+B.q+" = \\$"+fmt(B.p/B.q)+"\\). Compare unit rates, not sticker prices — "+winner.toLowerCase()+" wins.",{A:A,B:B});
});
E("u6-rate-solve",6,["6.1"],1,"gen",function(){
  var ctxs=[
    function(R,T){return "A tap delivers "+R+" litres of water per minute. How many minutes does it take to fill a "+T+" L tank?";},
    function(R,T){return "A cyclist rides at a steady "+R+" km/h. How many hours does a "+T+" km ride take?";},
    function(R,T){return "A garden hose delivers "+R+" litres of water per minute. How many minutes does it take to fill a "+T+" L barrel?";},
    function(R,T){return "A printer prints "+R+" pages per minute. How many minutes does it take to print "+T+" pages?";},
    function(R,T){return "A snowplow clears "+R+" km of road per hour. How many hours does it take to clear "+T+" km?";},
    function(R,T){return "A download runs at "+R+" MB per second. How many seconds does a "+T+" MB file take?";},
    function(R,T){return "A bottling machine fills "+R+" bottles per minute. How many minutes does it take to fill "+T+" bottles?";},
    function(R,T){return "A painter covers \\("+R+"\\text{ m}^2\\) of wall per hour. How many hours does a \\("+T+"\\text{ m}^2\\) wall take?";}];
  var rate=pick([4,5,6,8,9,10,12,15,16,18,20,24]);var t=pick([2,3,4,5,6,7,8,9]);var total=rate*t;
  return numq(pick(ctxs)(rate,total),
    t,0.011,"Amount \\(= \\text{rate} \\times \\text{time}\\), so time \\(= \\text{amount} \\div \\text{rate} = "+total+" \\div "+rate+" = \\)<b>\\("+t+"\\)</b>. Isolating the variable first keeps the arithmetic in one step.",{t:t,total:total,rate:rate});
});
E("u6-slope-rate",6,["6.19"],1,"var",varset([
  function(){return mcq("A graph shows distance from home (km) against time (h) for a drive. The line passes through \\((0, 0)\\) and \\((2, 110)\\). What does the slope of the line represent, and what is it?",
    "The speed: \\(110 \\div 2 = 55\\text{ km/h}\\) — the slope of a distance–time graph is the rate of travel",
    ["The total distance: \\(110\\text{ km}\\) - the distance covered over the whole drive, end to end","The time taken: \\(2\\text{ h}\\) - the time the whole drive lasted from start to the finish of the trip","The acceleration: \\(55\\text{ km/h}^2\\) - the rate at which the speed changes during the drive"],
    "Slope \\(= \\text{rise} \\div \\text{run} = \\) change in distance \\(\\div\\) change in time, which is exactly a rate: \\(55\\text{ km/h}\\).",{});},
  function(){return mcq("On a graph of water volume (L) versus time (min), a filling tank's line rises \\(60\\text{ L}\\) over \\(4\\text{ min}\\). What is the slope, and what does it mean?",
    "\\(15\\text{ L/min}\\) — the rate at which water is flowing into the tank",
    ["\\(60\\text{ L}\\) - the tank's capacity when it is filled right to the top","\\(4\\text{ min}\\) - the time to fill the tank from empty to full at this rate","\\(240\\text{ L/min}\\) - rise times run, the amount multiplied by the time"],
    "Slope \\(= 60 \\div 4 = 15\\), and its units (L per min) name the rate directly.",{});},
  function(){return mcq("A graph of distance travelled (km) against fuel used (L) for a delivery van is a straight line through \\((0, 0)\\) and \\((25, 300)\\). What does its slope represent, and what is it?",
    "Fuel efficiency: \\(300 \\div 25 = 12\\text{ km per litre}\\) — the slope is distance per unit of fuel",
    ["The fuel used on the trip: \\(25\\text{ L}\\) - the fuel the van used on the whole trip","The distance travelled: \\(300\\text{ km}\\) - the distance the van travelled over the whole trip shown","\\(12\\text{ L per km}\\) - slope is fuel divided by distance: \\(300 \\div 25 = 12\\text{ L per km}\\) on this trip"],
    "Slope \\(= \\text{rise} \\div \\text{run} = \\text{km} \\div \\text{L}\\), a rate of travel per litre: \\(12\\text{ km/L}\\).",{});}
]));
E("u6-poster-cost",6,["6.14","6.17"],2,"gen",function(){
  var kw=pick([1.5,2,2.5,3,3.5,4,5]);var W=10*kw,H=15*kw;var area=W*H;var rate=pick([0.02,0.03,0.04,0.05,0.06,0.08,0.1,0.12]);var cost=area*rate;
  var frame=pick([
    "A photo 10 cm by 15 cm is enlarged so its width becomes "+fmt(W)+" cm (the height scales in proportion). A print shop charges $"+fmt(rate)+" per \\(\\text{cm}^2\\) of print area. What does the enlarged print cost, in dollars? (Just the number.)",
    "A print shop enlarges a 10 cm by 15 cm photo to a width of "+fmt(W)+" cm, keeping the proportions. Printing costs $"+fmt(rate)+" per \\(\\text{cm}^2\\). What is the cost of the enlarged print, in dollars? (Just the number.)"]);
  return numq(frame,Math.round(cost*100)/100,0.02,"Scale factor \\(= "+fmt(W)+" \\div 10 = "+fmt(kw)+"\\), so the height becomes \\(15 \\times "+fmt(kw)+" = "+fmt(H)+"\\text{ cm}\\). Area \\(= "+fmt(W)+" \\times "+fmt(H)+" = "+fmt(area)+"\\text{ cm}^2\\) (that is the original \\(150\\text{ cm}^2\\) times \\("+fmt(kw)+"^2\\), as areas scale by \\(k^2\\)). Cost \\(= "+fmt(area)+" \\times \\$"+fmt(rate)+" = \\)<b>\\(\\$"+fmt(cost)+"\\)</b>.",{kw:kw,area:area,rate:rate});
});
E("u6-work-rate-solo",6,["6.16","6.23"],3,"gen",function(){
  var ctx=pick([
    {b:"hoses",one:"hose",job:"fill a water tank"},
    {b:"snow blowers",one:"snow blower",job:"clear a parking lot"},
    {b:"printers",one:"printer",job:"print a stack of programs"},
    {b:"pipes",one:"pipe",job:"drain a swimming pool"},
    {b:"machines",one:"machine",job:"bottle a batch of juice"}]);
  var T=0,k=0,mode=0,tries=0;
  do{T=pick([2,3,4,6,8]);k=pick([2,3,4]);mode=ri(0,1);tries++;}while(T*(k+1)%k!==0&&tries<60);
  var slow=T*(k+1),fast=slow/k,ans=mode===0?slow:fast;
  return numq("Two "+ctx.b+" working together can "+ctx.job+" in "+T+" hours. One "+ctx.one+" works "+k+" times as fast as the other. How many hours would the "+(mode===0?"slower":"faster")+" "+ctx.one+" take to "+ctx.job+" on its own?",
    ans,0.011,
    "Rates add when the "+ctx.b+" work together. The combined rate is \\(\\frac{1}{"+T+"}\\) of the job per hour. If the slower "+ctx.one+" works at rate \\(r\\), the faster works at rate \\("+k+"r\\), so \\("+k+"r + r = \\frac{1}{"+T+"}\\), which gives \\(r = \\frac{1}{"+slow+"}\\) of the job per hour. The slower "+ctx.one+" alone takes \\("+slow+"\\) hours, and the faster one takes \\("+slow+" \\div "+k+" = "+fast+"\\) hours. The question asks for the "+(mode===0?"slower":"faster")+" one: <b>\\("+ans+"\\text{ hours}\\)</b>.",
    {T:T,k:k,mode:mode});
});
E("u6-justify-consistency",6,["6.16","6.17"],3,"gen",function(){
  var ctx=pick([
    {who:"bus drivers",names:["Mina","Theo"],act:"Trip times for the same route, in minutes"},
    {who:"ferry captains",names:["June","Omar"],act:"Crossing times for the same crossing, in minutes"},
    {who:"delivery drivers",names:["Ana","Karl"],act:"Delivery times for the same route, in minutes"}]);
  var base=ri(18,30);
  var offA=pick([[-1,0,1,0,-1],[0,1,-1,1,0],[1,1,0,-1,0],[0,0,1,-1,1]]);
  var offB=pick([[-4,-1,3,5,-3],[-5,2,4,-2,1],[-3,5,-4,0,2],[4,-5,1,-1,3]]);
  var tight=offA.map(function(o){return base+o;});
  var wide=offB.map(function(o){return base+o;});
  var cIdx=Math.random()<0.5?0:1;
  var lists=[null,null];lists[cIdx]=tight;lists[1-cIdx]=wide;
  function sum(arr){return arr.reduce(function(s,v){return s+v;},0);}
  function rng(arr){return Math.max.apply(null,arr)-Math.min.apply(null,arr);}
  var cName=ctx.names[cIdx],oName=ctx.names[1-cIdx];
  return textq("Two "+ctx.who+" do the same work on five different days. "+ctx.act+": "+ctx.names[0]+" recorded "+lists[0].join(", ")+"; "+ctx.names[1]+" recorded "+lists[1].join(", ")+". Which one is more consistent? (Type the name.)",
    [cName],
    "Consistency is about spread, not speed. "+cName+"\u2019s times run from "+Math.min.apply(null,tight)+" to "+Math.max.apply(null,tight)+", a range of "+rng(tight)+", while "+oName+"\u2019s run from "+Math.min.apply(null,wide)+" to "+Math.max.apply(null,wide)+", a range of "+rng(wide)+". Their averages are close ("+fmt(sum(tight)/5,1)+" min and "+fmt(sum(wide)/5,1)+" min), so the averages do not decide it. The tighter spread makes <b>"+cName+"</b> the more consistent one.",
    {base:base,cIdx:cIdx});
});
E("u6-breakeven-plans",6,["6.17","6.19"],3,"gen",function(){
  var fr=pick([
    "A moving company rents trucks under two plans.",
    "A car rental agency offers two plans."]);
  var f1=pick([29,39,49,59]);var dr=pick([0.25,0.5]);var r2=pick([0.45,0.55,0.65,0.75]);var r1=r2+dr;
  var df=pick([10,15,20,25,30,40]);var f2=f1+df;var d=df/dr;
  return numq(fr+" Plan A charges a fee of $"+f1+" plus $"+fmtF(r1,2)+" per km driven. Plan B charges a fee of $"+f2+" plus $"+fmtF(r2,2)+" per km driven. For what distance, in km, do the two plans cost exactly the same?",
    d,0.011,
    "Write each cost as a per-km rate times the distance, plus the fixed fee; the per-km charge is the slope of the cost graph. Plan A: \\(C = "+f1+" + "+fmt(r1)+"d\\). Plan B: \\(C = "+f2+" + "+fmt(r2)+"d\\). Setting the costs equal: \\("+f1+" + "+fmt(r1)+"d = "+f2+" + "+fmt(r2)+"d\\), so \\("+fmt(dr)+"d = "+df+"\\), and \\(d = \\)<b>\\("+d+"\\text{ km}\\)</b>. Below that distance the lower fee wins; above it, the lower per-km rate wins.",
    {f1:f1,f2:f2,r1:r1,r2:r2});
});
E("u6-sail-scale-mc",6,["6.10","6.14"],3,"gen",function(){
  var Am=0,k=0,tries=0,ok=false,key=0,d1=0,d2=0,d3=0;
  while(!ok&&tries<400){tries++;
    Am=pick([24,30,36,40,45,48,50,60]);k=pick([20,24,25,30,36,40,50]);
    key=Am*k*k/10000;d1=Am*k/10000;d2=Am*k*k/100;d3=Am*k*k/1000;
    var os=[fmt(key,3),fmt(d1,3),fmt(d2,3),fmt(d3,3)];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  return mcq("A scale model of a sailboat is built to a scale of \\(1 : "+k+"\\). The sail on the model has an area of "+Am+" \\(\\text{cm}^2\\). What is the area of the real sail, in \\(\\text{m}^2\\)?",
    fmt(key,3),[fmt(d1,3),fmt(d2,3),fmt(d3,3)],
    "Areas scale by the square of the scale factor, not by the factor itself: the real sail has area \\("+Am+" \\times "+k+"^2 = "+(Am*k*k)+"\\text{ cm}^2\\). Since \\(1\\text{ m}^2 = 10\\,000\\text{ cm}^2\\), that is \\("+(Am*k*k)+" \\div 10\\,000 = \\)<b>\\("+fmt(key,3)+"\\text{ m}^2\\)</b>.",
    {Am:Am,k:k});
});
E("u6-unit-price-mc",6,["6.16"],1,"gen",function(){
  var fr=null,n=0,unit=0,P=0,d1=0,d2=0,d3=0,tries=0,ok=false;
  while(!ok&&tries<400){tries++;
    fr=pick([{w:"granola bars",s:"bar"},{w:"juice boxes",s:"juice box"},{w:"batteries",s:"battery"},{w:"pencils",s:"pencil"},{w:"muffins",s:"muffin"}]);
    n=pick([4,5,6,8,10,12]);unit=pick([0.65,0.75,0.85,0.95,1.05,1.15,1.25,1.45,1.55,1.75,1.95,2.25,2.45,2.75,3.25]);
    P=Math.round(n*unit*100)/100;
    d1=Math.round((n/P)*100)/100;
    d2=Math.round((P/(n+2))*100)/100;
    d3=Math.round((P/(n-1))*100)/100;
    var os=[fmtF(unit,2),fmtF(d1,2),fmtF(d2,2),fmtF(d3,2)];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  return mcq("A pack of "+n+" "+fr.w+" costs $"+fmtF(P,2)+". What is the cost per "+fr.s+", in dollars?",
    fmtF(unit,2),[fmtF(d1,2),fmtF(d2,2),fmtF(d3,2)],
    "The unit price is the total cost divided by the number of items: \\("+fmtF(P,2)+" \\div "+n+" = \\)<b>\\(\\$"+fmtF(unit,2)+"\\)</b> per "+fr.s+". Dividing the other way would give items per dollar, not dollars per item.",
    {n:n,P:P});
});

/* ============ Prior knowledge tranche (November 15, 2026) ============
   Cluster 6 (Proportional Reasoning prerequisites): seven borrowed
   entries and one authored item. Provenance (host id: source,
   verified by draw sweep):
   - u6-pk-scale-draw: copied from math-9 u7-scale-draw-num, indicator 10.16.
   - u6-pk-scale-factor: copied from math-9 u7-scale-factor-num, indicator 10.17.
   - u6-pk-sa-basic: copied from math-1201 u1-sa-basic, indicators 5.1, 5.2.
     DEVIATION (surface area sweep, Nov 15, 2026): this copy's worked
     solutions were reworked to the net method on Jason's curriculum
     instruction (outside Math 1201, surface area is taught through
     the net), so its solution text differs from math-1201
     u1-sa-basic, which is unchanged. Numbers, key and options are
     unchanged.
   - u6-pk-vol-basic: copied from math-1201 u1-vol-basic, indicator 5.4.
   - u6-pk-convert-multistep: copied from math-1201 u1-convert-multistep, indicator 6.2.
   - u6-pk-rate-of-change: copied from math-1201 u4-rate-of-change, indicator 4.19.
   - u6-pk-solve-input: copied from math-1201 u4-solve-input, indicator 4.48
     (the same generator is also copied into Unit 2 under its own host id).
   - u6-pk-unit-rate: authored for the Math 2201 PK tranche (spec
     construct u6-pk-unit-rate: comparing two rates through unit
     rates, a named subskill no feeder entry samples).
   Helper families copied into bank-helpers.js with the tranche:
   the Math 1201 Unit 1 measurement figures and rounding helpers,
   and the Math 9 scale-figure helpers. Indicator tags are support
   tags, not assessed targets: assessed targets are in pkSrc, the
   full dependent list in pkFor. */
E("u6-pk-scale-draw", 6, ["6.2"], 1, "gen", function () {
  var ks = [0.5, 1.5, 2, 2.5, 3];
  var k = pick(ks), kind = pick(["rect", "tri"]);
  var word = k < 1 ? "reduction" : "enlargement";
  if (kind === "rect") {
    var w = ri(3, 9), h = ri(2, 7), askW = Math.random() < 0.5;
    var side = askW ? w : h, ans = Math.round(side * k * 100) / 100;
    var u = Math.min(24, 220 / w, 110 / h), x0 = 60, y0 = 40;
    var body = u7Poly([[x0, y0], [x0 + w * u, y0], [x0 + w * u, y0 + h * u], [x0, y0 + h * u]], FIG_SHADE);
    body += u7T(x0 + w * u / 2, y0 - 14, fmt(w) + " cm", 13, false);
    body += u7T(x0 + w * u + 26, y0 + h * u / 2, fmt(h) + " cm", 13, false);
    body += u7T(x0 + w * u / 2, y0 + h * u + 20, "Original", 13, true);
    var q = numq("The diagram shows a rectangle. It is redrawn as a " + word + " with scale factor " + fmt(k) + ". How long is the side of the image that matches the " + fmt(side) + " cm side, in centimetres?",
      ans, 0.01,
      "Multiply the original side by the scale factor: \\[ \\begin{aligned} \\text{image side} &= " + fmt(side) + " \\times " + fmt(k) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the matching side of the image is <b>" + fmt(ans) + " cm</b>.",
      { mode: "draw-rect", w: w, h: h, k: k, side: side });
    q.figure = u7Svg(340, 200, body, "Rectangle with labelled sides");
    return q;
  }
  var a = ri(3, 10), b = ri(3, 10), askA = Math.random() < 0.5;
  var side2 = askA ? a : b, ans2 = Math.round(side2 * k * 100) / 100;
  var u2 = Math.min(24, 220 / a, 120 / b), x1 = 60, y1 = 160;
  var body2 = u7Poly([[x1, y1], [x1 + a * u2, y1], [x1, y1 - b * u2]], FIG_SHADE);
  body2 += u7T(x1 + a * u2 / 2, y1 + 18, fmt(a) + " cm", 13, false);
  body2 += u7T(x1 - 26, y1 - b * u2 / 2, fmt(b) + " cm", 13, false);
  body2 += u7T(x1 + a * u2 / 2, y1 - b * u2 - 16, "Original", 13, true);
  var q2 = numq("The diagram shows a right triangle. It is redrawn as a " + word + " with scale factor " + fmt(k) + ". How long is the side of the image that matches the " + fmt(side2) + " cm side, in centimetres?",
    ans2, 0.01,
    "Multiply the original side by the scale factor: \\[ \\begin{aligned} \\text{image side} &= " + fmt(side2) + " \\times " + fmt(k) + " \\\\ &= " + fmt(ans2) + " \\end{aligned} \\] So the matching side of the image is <b>" + fmt(ans2) + " cm</b>.",
    { mode: "draw-tri", a: a, b: b, k: k, side: side2 });
  q2.figure = u7Svg(340, 200, body2, "Right triangle with labelled sides");
  return q2;
}, ["The image side is the original side multiplied by the scale factor.", "Find the given side in the diagram, then multiply it by the scale factor."]);
E("u6-pk-scale-factor", 6, ["6.2"], 1, "gen", function () {
  var pairs = [[1, 4], [2, 5], [1, 2], [3, 5], [3, 4], [6, 5], [5, 4], [3, 2], [8, 5], [2, 1], [5, 2], [3, 1], [4, 1]];
  var pr = pick(pairs), p = pr[0], d = pr[1], m = ri(2, 10);
  var orig = d * m, img = p * m, ans = Math.round(p / d * 100) / 100;
  var ctxs = [["A drawing of a sunflower is ", " cm tall. The real sunflower is ", " cm tall."],
            ["A model boat is ", " cm long. The real boat is ", " cm long."],
            ["A photo print is ", " cm wide. The screen image it came from is ", " cm wide."]];
  var c = pick(ctxs);
  var prompt, oLen, iLen;
  if (Math.random() < 0.5) { oLen = orig; iLen = img; } else { oLen = orig; iLen = img; }
  prompt = c[0] + fmt(iLen) + c[1] + fmt(oLen) + c[2] + " The first length is the image and the second is the original. What is the scale factor for the diagram? Give the scale factor as a decimal or whole number.";
  var sol = "The scale factor is the image length divided by the original length: \\[ \\begin{aligned} \\text{scale factor} &= " + fmt(iLen) + " \\div " + fmt(oLen) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the scale factor is <b>" + fmt(ans) + "</b>.";
  var q = numq(prompt, ans, 0.01, sol, { mode: "scale-factor", orig: oLen, img: iLen });
    q.figure = solBarsFig([{ name: "Image", len: iLen, lab: fmt(iLen) + " cm" }, { name: "Original", len: oLen, lab: fmt(oLen) + " cm" }], "Image and original lengths as bars");
    return q;
}, ["Scale factor is image length divided by original length.", "Put the image length first, then divide by the original length."]);
E("u6-pk-sa-basic", 6, ["6.10"], 2, "gen",function(){
  var mode=ri(1,6);
  if(mode===1||mode===2){
    var r=ri(3,10),h=ri(5,15),ans=u1r1(2*Math.PI*r*(r+h));
    var prompt=mode===1?
      "A closed cylindrical paint can has radius "+r+" cm and height "+h+" cm. Determine its total surface area. Give your answer to the nearest tenth, in square centimetres.":
      "The net of a closed cylinder is a rectangle joined to two congruent circles. The circles have radius "+r+" cm, and the rectangle has height "+h+" cm and length equal to the circumference of a circle. Sketch the net in words and determine the total surface area of the cylinder. Give your answer to the nearest tenth, in square centimetres.";
    var q=numq(prompt,ans,0.11,
      "Build the surface from the net: two circles plus the curved rectangle. The two circles together have area \\(2\\pi("+r+")^2 \\approx "+fmt(u1r1(2*Math.PI*r*r))+"\\), and the rectangle is the circumference by the height, \\(2\\pi("+r+")("+h+") \\approx "+fmt(u1r1(2*Math.PI*r*h))+"\\). Add the parts: \\[ \\begin{aligned} SA &\\approx "+fmt(u1r1(2*Math.PI*r*r))+" + "+fmt(u1r1(2*Math.PI*r*h))+" \\\\ &\\approx "+fmt(ans)+" \\end{aligned} \\] So the surface area is <b>"+fmt(ans)+" square centimetres</b>.",{mode:mode,r:r,h:h});
    q.figure=u1figCyl(r,h,fmt(r)+" cm",fmt(h)+" cm");
    return q;
  }
  if(mode===3){
    var r3=ri(3,9),l3=r3+ri(2,7),ans3=u1r1(Math.PI*r3*(r3+l3));
    var q=numq("A solid cone ornament has radius "+r3+" cm and slant height "+l3+" cm. Determine its total surface area. Give your answer to the nearest tenth, in square centimetres.",ans3,0.11,
      "Build the surface from the net: the circular base plus the sloped side opened flat. The base has area \\(\\pi("+r3+")^2 \\approx "+fmt(u1r1(Math.PI*r3*r3))+"\\), and the sloped side has area \\(\\pi("+r3+")("+l3+") \\approx "+fmt(u1r1(Math.PI*r3*l3))+"\\). Add the parts: \\[ \\begin{aligned} SA &\\approx "+fmt(u1r1(Math.PI*r3*r3))+" + "+fmt(u1r1(Math.PI*r3*l3))+" \\\\ &\\approx "+fmt(ans3)+" \\end{aligned} \\] So the surface area is <b>"+fmt(ans3)+" square centimetres</b>.",{mode:mode,r:r3,l:l3});
    q.figure=u1figCone(r3,Math.sqrt(Math.max(l3*l3-r3*r3,0.25)),{rLab:fmt(r3)+" cm",lLab:fmt(l3)+" cm"});
    return q;
  }
  if(mode===4||mode===5){
    var a=ri(3,12),b=ri(3,12),c=ri(3,12),ans4=2*(a*b+a*c+b*c);
    var prompt4=mode===4?
      "A closed rectangular storage box has length "+a+" cm, width "+b+" cm and height "+c+" cm. Determine its total surface area. Give your answer to the nearest tenth, in square centimetres.":
      "The net of a closed rectangular prism is six rectangles in three congruent pairs, with dimensions "+a+" cm by "+b+" cm, "+a+" cm by "+c+" cm, and "+b+" cm by "+c+" cm. Sketch the net in words and determine the total surface area of the prism. Give your answer to the nearest tenth, in square centimetres.";
    var q=numq(prompt4,ans4,0.11,
      "Add the areas of the three pairs of congruent faces. One pair measures "+a+" cm by "+b+" cm, area "+(a*b)+" each; one pair measures "+a+" cm by "+c+" cm, area "+(a*c)+" each; and one pair measures "+b+" cm by "+c+" cm, area "+(b*c)+" each: \\[ \\begin{aligned} SA &= 2("+(a*b)+") + 2("+(a*c)+") + 2("+(b*c)+") \\\\ &= "+ans4+" \\end{aligned} \\] So the surface area is <b>"+fmt(ans4)+" square centimetres</b>.",{mode:mode,a:a,b:b,c:c});
    q.figure=u1figPrism(a,b,c,fmt(a)+" cm",fmt(b)+" cm",fmt(c)+" cm");
    return q;
  }
  var s=ri(4,12),l6=s+ri(2,8),ans6=s*s+2*s*l6;
  var q=numq("A square based pyramid paperweight has base side "+s+" cm and slant height "+l6+" cm. Determine its total surface area. Give your answer to the nearest tenth, in square centimetres.",ans6,0.11,
    "Build the surface from its faces: the square base plus four congruent triangular faces. The base has area \\("+s+" \\times "+s+" = "+(s*s)+"\\). One triangular face has area \\(\\tfrac{1}{2} \\times "+s+" \\times "+l6+" = "+fmt(s*l6/2)+"\\), so the four faces together have area \\(4 \\times "+fmt(s*l6/2)+" = "+(2*s*l6)+"\\). Add the parts: \\[ \\begin{aligned} SA &= "+(s*s)+" + "+(2*s*l6)+" \\\\ &= "+ans6+" \\end{aligned} \\] So the surface area is <b>"+fmt(ans6)+" square centimetres</b>.",{mode:mode,s:s,l:l6});
  q.figure=u1figPyr(s,Math.sqrt(Math.max(l6*l6-(s/2)*(s/2),0.25)),{sLab:fmt(s)+" cm",lLab:fmt(l6)+" cm"});
  return q;
});
E("u6-pk-vol-basic", 6, ["6.10"], 2, "gen",function(){
  var mode=ri(1,5);
  if(mode===1){
    var r=ri(3,10),h=ri(5,16),ans=u1r1(Math.PI*r*r*h);
    var q=numq("A cylindrical water tank has radius "+r+" cm and height "+h+" cm. Determine its volume. Give your answer to the nearest tenth, in cubic centimetres.",ans,0.11,
      "The volume of a cylinder is the area of its base times its height, \\(V = A_b \\times h\\). First find the base area: \\[ \\begin{aligned} A_b &= \\pi r^2 = \\pi("+r+")^2 \\\\ V &= A_b \\times h = \\pi("+r+")^2("+h+") \\\\ &\\approx "+fmt(ans)+" \\end{aligned} \\] So the volume is <b>"+fmt(ans)+" cubic centimetres</b>.",{mode:mode,r:r,h:h});
    q.figure=u1figCyl(r,h,fmt(r)+" cm",fmt(h)+" cm");
    return q;
  }
  if(mode===2){
    var r2=ri(3,9),h2=pick([6,9,12,15]),ans2=u1r1(Math.PI*r2*r2*h2/3);
    var q=numq("A cone shaped pile of sand has radius "+r2+" cm and height "+h2+" cm. Determine its volume. Give your answer to the nearest tenth, in cubic centimetres.",ans2,0.11,
      "The volume of a cone is one third of the area of its base times its height. First find the base area: \\[ \\begin{aligned} A_b &= \\pi r^2 = \\pi("+r2+")^2 \\\\ V &= \\frac{1}{3} A_b \\times h = \\frac{1}{3}\\pi("+r2+")^2("+h2+") \\\\ &\\approx "+fmt(ans2)+" \\end{aligned} \\] So the volume is <b>"+fmt(ans2)+" cubic centimetres</b>.",{mode:mode,r:r2,h:h2});
    q.figure=u1figCone(r2,h2,{rLab:fmt(r2)+" cm",hLab:fmt(h2)+" cm"});
    return q;
  }
  if(mode===3){
    var a=ri(3,14),b=ri(3,12),c=ri(3,12),ans3=a*b*c;
    var q=numq("A rectangular storage crate has length "+a+" cm, width "+b+" cm and height "+c+" cm. Determine its volume. Give your answer to the nearest tenth, in cubic centimetres.",ans3,0.11,
      "The volume of a prism is the area of its base times its height, \\(V = A_b \\times h\\). First find the base area: \\[ \\begin{aligned} A_b &= l \\times w = "+a+" \\times "+b+" = "+(a*b)+" \\\\ V &= A_b \\times h = "+(a*b)+" \\times "+c+" \\\\ &= "+ans3+" \\end{aligned} \\] So the volume is <b>"+ans3+" cubic centimetres</b>.",{mode:mode,a:a,b:b,c:c});
    q.figure=u1figPrism(a,b,c,fmt(a)+" cm",fmt(b)+" cm",fmt(c)+" cm");
    return q;
  }
  if(mode===4){
    var tb=pick([4,6,8,10,12]),th=pick([3,4,5,6]),L=ri(5,14),ans4=(tb*th/2)*L;
    var q=numq("A tent is a triangular prism. Its triangular end has base "+tb+" cm and height "+th+" cm, and the prism is "+L+" cm long. Determine its volume. Give your answer to the nearest tenth, in cubic centimetres.",ans4,0.11,
      "The volume of a prism is the area of its base times its length. The base is the triangular end: \\[ \\begin{aligned} A_b &= \\frac{1}{2}bh = \\frac{1}{2}("+tb+")("+th+") = "+(tb*th/2)+" \\\\ V &= A_b \\times L = "+(tb*th/2)+" \\times "+L+" \\\\ &= "+ans4+" \\end{aligned} \\] So the volume is <b>"+fmt(ans4)+" cubic centimetres</b>.",{mode:mode,tb:tb,th:th,L:L});
    q.figure=u1figTriPrism(tb,th,L,fmt(tb)+" cm",fmt(th)+" cm",fmt(L)+" cm");
    return q;
  }
  var s=ri(4,12),h5=pick([3,6,9,12]),ans5=s*s*h5/3;
  var q=numq("A square based pyramid ornament has base side "+s+" cm and height "+h5+" cm. Determine its volume. Give your answer to the nearest tenth, in cubic centimetres.",ans5,0.11,
    "The volume of a pyramid is one third of the area of its base times its height. First find the base area: \\[ \\begin{aligned} A_b &= s^2 = "+s+"^2 = "+(s*s)+" \\\\ V &= \\frac{1}{3} A_b \\times h = \\frac{1}{3}("+s+")^2("+h5+") \\\\ &= "+ans5+" \\end{aligned} \\] So the volume is <b>"+fmt(ans5)+" cubic centimetres</b>.",{mode:mode,s:s,h:h5});
  q.figure=u1figPyr(s,h5,{sLab:fmt(s)+" cm",hLab:fmt(h5)+" cm"});
  return q;
});
E("u6-pk-convert-multistep", 6, ["6.16"], 2, "gen",function(){
  var mode=ri(1,6);
  if(mode===1){
    var ft=ri(3,7),inch=ri(0,11),tot=ft*12+inch,ans=u1r2(tot*2.54);
    return numq("A student is "+ft+" feet "+inch+" inches tall. Convert this height to centimetres. Use 1 inch = 2.54 centimetres.",ans,0.011,
      "First change the whole height to inches, then convert: \\[ \\begin{aligned} "+ft+" \\times 12 + "+inch+" &= "+tot+" \\text{ inches} \\\\ "+tot+" \\times 2.54 &= "+fmt(ans)+" \\end{aligned} \\] So the height is <b>"+fmt(ans)+" centimetres</b>.",{mode:mode,ft:ft,inch:inch});
  }
  if(mode===2){
    var yd=ri(2,20),f2=pick([1,2]),ans2=yd*36+f2*12;
    return numq("A garden hose is "+yd+" yards "+f2+" feet long. Convert this length to inches.",ans2,0.011,
      "Change each part to inches and add: \\[ \\begin{aligned} "+yd+" \\times 36 &= "+(yd*36)+" \\\\ "+f2+" \\times 12 &= "+(f2*12)+" \\\\ \\text{Total} &= "+ans2+" \\end{aligned} \\] So the hose is <b>"+ans2+" inches</b> long.",{mode:mode,yd:yd,f2:f2});
  }
  if(mode===3){
    var yd3=ri(2,30),ans3=yd3*36;
    return numq("A roll of fencing is "+yd3+" yards long. Convert this length to inches.",ans3,0.011,
      "Work through feet as the middle step: \\[ \\begin{aligned} "+yd3+" \\times 3 &= "+(yd3*3)+" \\text{ feet} \\\\ "+(yd3*3)+" \\times 12 &= "+ans3+" \\end{aligned} \\] So the fencing is <b>"+ans3+" inches</b> long.",{mode:mode,yd:yd3});
  }
  if(mode===4){
    var m4=ri(1,5),c4=pick([10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95]),ans4=m4*1000+c4*10;
    return numq("A ribbon is "+m4+" metres "+c4+" centimetres long. Convert this length to millimetres.",ans4,0.011,
      "Change each part to millimetres and add: \\[ \\begin{aligned} "+m4+" \\times 1000 &= "+(m4*1000)+" \\\\ "+c4+" \\times 10 &= "+(c4*10)+" \\\\ \\text{Total} &= "+ans4+" \\end{aligned} \\] So the ribbon is <b>"+ans4+" millimetres</b> long.",{mode:mode,m:m4,c:c4});
  }
  if(mode===5){
    var km=ri(1,9),m5=pick([50,100,150,200,250,300,350,400,450,500,550,600,650,700,750,800,850,900]),ans5=km*1000+m5;
    return numq("A cycling route is "+km+" kilometres "+m5+" metres long. Convert this length to metres.",ans5,0.011,
      "Change the kilometres to metres and add: \\[ \\begin{aligned} "+km+" \\times 1000 + "+m5+" &= "+ans5+" \\end{aligned} \\] So the route is <b>"+ans5+" metres</b> long.",{mode:mode,km:km,m:m5});
  }
  var tt=ri(3,30),cm6=u1r2(tt*2.54);
  return numq("A shelf board is "+fmt(cm6)+" centimetres long. Convert this length to inches. Use 1 inch = 2.54 centimetres.",tt,0.011,
    "Divide by the conversion factor: \\[ \\begin{aligned} "+fmt(cm6)+" \\div 2.54 &= "+tt+" \\end{aligned} \\] So the board is <b>"+tt+" inches</b> long.",{mode:mode,t:tt});
});
E("u6-pk-rate-of-change", 6, ["6.19"], 1, "gen",function(){
  var mode=ri(1,2);
  var m=pick([-3,-2,-1,-0.5,0.5,1,2,3,4]);
  var dx=pick([2,3,4,5]),x1=ri(0,6),x2=x1+dx;
  var y1=ri(1,15),y2=y1+m*dx;
  var prompt,solHead;
  if(mode===1){
    prompt="A table for a linear relation has two rows: when the input is \\("+x1+"\\), the output is \\("+y1+"\\), and when the input is \\("+x2+"\\), the output is \\("+y2+"\\). What is the rate of change of this relation?";
    solHead="The rate of change is the change in output divided by the change in input, using the two rows of the table:";
  }else{
    prompt="The graph of a linear relation passes through the points \\("+u4pairS(x1,y1)+"\\) and \\("+u4pairS(x2,y2)+"\\). What is the rate of change of this relation?";
    solHead="The rate of change is the change in the second coordinates divided by the change in the first coordinates:";
  }
  return numq(prompt,m,0.011,
    solHead+" \\[ \\begin{aligned} \\text{rate of change} &= "+FR(y2+" - "+y1,x2+" - "+x1)+" \\\\ &= "+FR(u4num(y2-y1),u4num(x2-x1))+" \\\\ &= "+u4num(m)+" \\end{aligned} \\] The rate of change is <b>\\("+u4num(m)+"\\)</b>.",
    {mode:mode,x1:x1,y1:y1,x2:x2,y2:y2,ans:m});
});
E("u6-pk-solve-input", 6, ["6.23"], 2, "gen",function(){
  var fn=pick(["f","g","h"]);
  var m=pick([-4,-3,-2,-1,1,2,3,4,5]),b=ri(-9,10),xAns=ri(-6,9);
  var target=m*xAns+b;
  return numq("A linear function is given by \\("+fn+"(x) = "+u4lin(m,b)+"\\). For what domain value is \\("+fn+"(x) = "+target+"\\)?",
    xAns,0.011,
    "Set the function equal to the given range value and solve for the input: \\[ \\begin{aligned} "+u4lin(m,b)+" &= "+target+" \\\\ "+u4num(m)+"x &= "+(target-b)+" \\\\ x &= "+xAns+" \\end{aligned} \\] The domain value is <b>\\("+xAns+"\\)</b>.",
    {fn:fn,m:m,b:b,target:target,ans:xAns});
});
E("u6-pk-unit-rate", 6, ["6.16"], 2, "gen", function () {
  var mode = ri(1, 3);
  if (mode === 1) {
    var u1 = pick([55, 60, 65, 70, 75, 80, 85, 90, 95, 105, 110, 120, 130, 140, 150, 165, 180]);
    var u2 = pick([55, 60, 65, 70, 75, 80, 85, 90, 95, 105, 110, 120, 130, 140, 150, 165, 180].filter(function (x) { return x !== u1; }));
    var m1 = pick([300, 400, 500, 600, 800, 1000, 1200]);
    var m2 = pick([300, 400, 500, 600, 800, 1000, 1200].filter(function (x) { return x !== m1; }));
    var p1 = u1 * m1 / 10000, p2 = u2 * m2 / 10000;
    var item = pick(["rice", "pasta", "oats", "flour", "sugar", "lentils"]);
    var ans = Math.min(u1, u2) / 100;
    return numq("A " + m1 + " g bag of " + item + " costs $" + fmtF(p1, 2) + ". A " + m2 + " g bag of the same " + item + " costs $" + fmtF(p2, 2) + ". Convert each price to a unit rate. What is the lower price per 100 g, in dollars?",
      ans, 0.011,
      "Divide each price by its mass in hundreds of grams. The " + m1 + " g bag: $" + fmtF(p1, 2) + " for " + (m1 / 100) + " hundreds of grams is $" + fmtF(u1 / 100, 2) + " per 100 g. The " + m2 + " g bag: $" + fmtF(p2, 2) + " for " + (m2 / 100) + " hundreds of grams is $" + fmtF(u2 / 100, 2) + " per 100 g. Comparing the two unit rates, the lower price per 100 g is <b>$" + fmtF(ans, 2) + "</b>.",
      { mode: "pk-unit-rate-price", u1: u1, u2: u2 });
  }
  if (mode === 2) {
    var r1 = pick([12.5, 13.25, 14, 14.75, 15.5, 16.25, 17, 18.5, 19.75, 21, 22.5, 24.25]);
    var r2 = pick([12.5, 13.25, 14, 14.75, 15.5, 16.25, 17, 18.5, 19.75, 21, 22.5, 24.25].filter(function (x) { return x !== r1; }));
    var h1 = pick([4, 5, 6, 8]), h2 = pick([4, 5, 6, 8].filter(function (x) { return x !== h1; }));
    var e1 = r1 * h1, e2 = r2 * h2;
    var ans2 = Math.max(r1, r2);
    return numq("One worker earns $" + fmtF(e1, 2) + " for " + h1 + " hours of work. Another worker earns $" + fmtF(e2, 2) + " for " + h2 + " hours of work. Convert each pay to an hourly unit rate. What is the higher hourly rate, in dollars per hour?",
      ans2, 0.011,
      "Divide each pay by its hours. The first worker: $" + fmtF(e1, 2) + " over " + h1 + " hours is $" + fmtF(r1, 2) + " per hour. The second worker: $" + fmtF(e2, 2) + " over " + h2 + " hours is $" + fmtF(r2, 2) + " per hour. Comparing the two unit rates, the higher hourly rate is <b>$" + fmtF(ans2, 2) + " per hour</b>.",
      { mode: "pk-unit-rate-pay", r1: r1, r2: r2 });
  }
  var v1 = ri(35, 95), v2 = ri(35, 95);
  while (v2 === v1) v2 = ri(35, 95);
  var t1 = pick([2, 3, 4, 5]), t2 = pick([2, 3, 4, 5].filter(function (x) { return x !== t1; }));
  var d1 = v1 * t1, d2 = v2 * t2;
  var ans3 = Math.min(v1, v2);
  return numq("A car travels " + d1 + " km in " + t1 + " hours. A bus travels " + d2 + " km in " + t2 + " hours. Convert each trip to a unit rate. What is the lower average speed, in kilometres per hour?",
    ans3, 0.011,
    "Divide each distance by its time. The car: " + d1 + " km over " + t1 + " hours is " + v1 + " km/h. The bus: " + d2 + " km over " + t2 + " hours is " + v2 + " km/h. Comparing the two unit rates, the lower average speed is <b>" + ans3 + " km/h</b>.",
    { mode: "pk-unit-rate-speed", v1: v1, v2: v2 });
});
/* PK tranche pass for Unit 6. pkFor is Cluster 6's dependent
   indicator list from the prior knowledge map. */
var PKT_U6_FOR=["6.2","6.5","6.9","6.10","6.14","6.16","6.17","6.19","6.23"];
var PKT_U6={
 "u6-pk-scale-draw":{src:"math-9:10.16",group:"scale"},
 "u6-pk-scale-factor":{src:"math-9:10.17",group:"scale"},
 "u6-pk-sa-basic":{src:"math-1201:5.1, 5.2",group:"measurement"},
 "u6-pk-vol-basic":{src:"math-1201:5.4",group:"measurement"},
 "u6-pk-convert-multistep":{src:"math-1201:6.2",group:"conversion"},
 "u6-pk-rate-of-change":{src:"math-1201:4.19",group:"rate-of-change"},
 "u6-pk-solve-input":{src:"math-1201:4.48",group:"isolate-variable"},
 "u6-pk-unit-rate":{src:"authored:unit-rate-comparison",group:"unit-rate"}};
BANK.forEach(function(e){var t=PKT_U6[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U6_FOR.slice();e.pkGroup=t.group;}});

/* ----- bank-u7.js ----- */
// Math 2201 Unit 7: Inductive and Deductive Reasoning question bank
// Cut verbatim from the standalone app's served file
// (math-2201-review/Math2201Review.html, lines 1687 to 1772).
// CRMARKS: u7-pattern-next=1
// CRMARKS: u7-pattern-quad=2
// CRMARKS: u7-counterexample=2
/* ============ Unit 7: Inductive and Deductive Reasoning ============ */
E("u7-pattern-next",7,["2.1"],2,"gen",function(){
  var a=ri(2,6),b=ri(1,9);var terms=[1,2,3,4].map(function(n){return a*n+b;});
  var askN=pick([8,10,12]);var ans=a*askN+b;
  return numq("A pattern begins \\("+terms.join(", ")+", \\ldots\\) The rule is linear. What is term \\("+askN+"\\) of the pattern?",
    ans,0.011,"Each term grows by \\("+a+"\\): term \\(n\\) is \\("+a+"n + "+b+"\\). Term \\("+askN+" = "+a+"("+askN+") + "+b+" = \\)<b>\\("+ans+"\\)</b>. (Spotted by observing the pattern, then justifying with the rule — inductive reasoning at work.)",{a:a,b:b,askN:askN});
});
E("u7-pattern-quad",7,["2.1"],2,"gen",function(){
  var c=pick([0,1,2,3,4,5,6,8,10]);var obj=pick(["tiles","matchsticks","beads"]);var terms=[1,2,3,4].map(function(n){return n*n+c;});var askN=pick([6,7,8,9,10,11,12,13,14,15]);var ans=askN*askN+c;
  return numq("A pattern of figures is built from "+obj+": figure 1 uses "+terms[0]+" "+obj+", figure 2 uses "+terms[1]+", figure 3 uses "+terms[2]+", figure 4 uses "+terms[3]+". How many "+obj+" does figure "+askN+" use?",
    ans,0.011,"The counts are \\(1^2"+(c?" + "+c:"")+", 2^2"+(c?" + "+c:"")+", 3^2"+(c?" + "+c:"")+"\\), \\(\\ldots\\) so figure \\(n\\) uses \\(n^2"+(c?" + "+c:"")+"\\) "+obj+". Figure \\("+askN+"\\) uses \\("+askN+"^2"+(c?" + "+c:"")+" = \\)<b>\\("+ans+"\\)</b>.",{c:c,askN:askN});
});
E("u7-counterexample",7,["2.4"],1,"var",varset([
  function(){return mcq("Conjecture: \u2018All prime numbers are odd.\u2019 Which value is a counterexample?",
    "\\(2\\) — it is prime but not odd",
    ["\\(9\\) — it is odd but not prime","\\(15\\) — it is odd and composite","\\(1\\) — it is neither prime nor composite"],
    "A counterexample must satisfy the conjecture's condition (prime) and break its claim (odd). Only \\(2\\) does both: it is prime, and it is even. One counterexample is enough to kill a conjecture.",{});},
  function(){return mcq("Conjecture: \u2018Every number divisible by \\(3\\) is also divisible by \\(6\\).\u2019 Which value is a counterexample?",
    "\\(9\\) — divisible by \\(3\\), but \\(9 \\div 6\\) is not whole",
    ["\\(12\\) — divisible by both \\(3\\) and \\(6\\), so it agrees","\\(18\\) — divisible by both \\(3\\) and \\(6\\), so it agrees","\\(4\\) — not divisible by \\(3\\) or \\(6\\)"],
    "\\(9\\) meets the condition (divisible by \\(3\\)) but fails the claim (not divisible by \\(6\\)). \\(12\\) and \\(18\\) support the conjecture; \\(4\\) never meets its condition.",{});},
  function(){return mcq("Conjecture: \u2018The product of two odd numbers is always even.\u2019 Which calculation is a counterexample?",
    "\\(3 \\times 5 = 15\\) — two odd numbers with an odd product",
    ["\\(3 \\times 4 = 12\\) - \\(4\\) is even, so the condition fails","\\(2 \\times 5 = 10\\) — but \\(2\\) is even, so the condition is not met","\\(4 \\times 6 = 24\\) — both factors are even, so it fails"],
    "A counterexample must use two odd numbers (the condition) and break the claim (an even product). Only \\(3 \\times 5 = 15\\) does that. The others smuggle in an even factor, so they never test the conjecture.",{});}
,
function(){return mcq("Conjecture: \u2018The square of a number is always greater than the number itself.\u2019 Which value is a counterexample?",
    "\\(\\frac{1}{2}\\) — its square is \\(\\frac{1}{4}\\), and \\(\\frac{1}{4}\\) is less than \\(\\frac{1}{2}\\)",
    ["\\(2\\) - its square is \\(4\\), so it agrees with the conjecture","\\(3\\) - its square is \\(9\\), greater than \\(3\\), so it agrees","\\(-1\\) - its square is \\(1\\), so it agrees with the conjecture too"],
    "A counterexample must break the claim. Squaring a number between \\(0\\) and \\(1\\) makes it SMALLER: \\(\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}\\), and \\(\\frac{1}{4} < \\frac{1}{2}\\). The other values all agree with the conjecture, so they cannot refute it.",{});},
  function(){return mcq("Conjecture: \u2018Dividing one natural number by another always gives a result smaller than the number you started with.\u2019 Which calculation is a counterexample?",
    "\\(6 \\div 1 = 6\\) — the result equals the starting number instead of being smaller",
    ["\\(6 \\div 2 = 3\\) - smaller than \\(6\\), so it agrees with the conjecture completely","\\(6 \\div 3 = 2\\) — smaller than \\(6\\), so it agrees with the conjecture","\\(6 \\div 6 = 1\\) — smaller than \\(6\\), so it agrees with the conjecture"],
    "Dividing by \\(1\\) leaves a number unchanged, so the result is not smaller. One counterexample is enough to show the conjecture is false.",{});}
]));
E("u7-inductive-false",7,["2.2"],1,"var",varset([
  function(){return mcq("A student notices \\(3\\), \\(5\\) and \\(7\\) are all prime and concludes \u2018every odd number is prime\u2019. Why might this inductive conclusion be false?",
    "Inductive reasoning generalizes from a few cases — an unchecked case (like \\(9 = 3 \\times 3\\)) can break the pattern",
    ["Because \\(3\\), \\(5\\) and \\(7\\) are not really prime, and a conclusion based on unchecked examples cannot be trusted","Because odd numbers cannot be studied by patterns, so no pattern spotted among odd numbers can ever lead to a conclusion","Because conclusions need \(3 + 7 = 10\) examples to be allowed, and three cases is far too few to count"],
    "Induction spots a pattern in observed cases but never checks them all. The very next odd numbers include \\(9\\), which is composite — the conjecture fails.",{});},
  function(){return mcq("Which statement best compares inductive and deductive reasoning?",
    "Inductive reasoning moves from examples to a general conjecture that might be false; deductive reasoning starts from accepted facts and its conclusions must follow",
    ["Inductive reasoning is always wrong and deductive reasoning is always right, because reasoning from examples can never be trusted in any situation whatsoever","Deductive reasoning is based on examples; inductive reasoning is based on definitions, and the two labels are fixed by those starting points in every question","They are two names for the same process, and the difference between them is only a matter of wording, not of how the conclusion is actually reached in the end"],
    "Induction suggests; deduction proves. A conjecture from induction still needs a deductive proof \u2014 or one counterexample ends it.",{});},
  function(){return mcq("A student lists the primes \\(3, 5, 7, 11\\) and \\(13\\), notices they are all odd, and concludes every prime number is odd. Which number is a counterexample?",
    "\\(2\\) — it is prime, and it is even",
    ["\\(9\\) — it is odd and composite","\\(1\\) — it is neither prime nor composite","\\(15\\) — it is odd and composite"],
    "A single counterexample destroys a universal claim. The student's list simply skipped \\(2\\), the one even prime — induction from a partial list is never a proof.",{});}
,
function(){return mcq("A fair coin has landed heads five times in a row. Marcus concludes it will land heads on every future toss. Why is this inductive conclusion unreliable?",
    "Five tosses are a tiny sample \u2014 each toss is independent, so tails can still come up; a short streak does not establish a rule",
    ["Because after five heads, tails is now due \u2014 the coin has to balance out soon, since long runs always correct themselves before long","Because five heads in a row proves the coin must be rigged, since a fair coin could never land the same way five times","Because inductive conclusions are always false, whatever they are based on, so a conclusion reached this way can simply be thrown out"],
    "Induction from a handful of cases is fragile. Nothing about the first five tosses changes the coin, and a longer run would very likely include tails.",{});},
  function(){return mcq("A bakery's Saturday sales doubled three weeks running: \\(40\\), \\(80\\), then \\(160\\) loaves. The owner concludes sales will keep doubling and orders ingredients for \\(1{,}280\\) loaves in week \\(6\\). What is the weakness in this inductive reasoning?",
    "The pattern rests on only three weeks and ignores real limits \u2014 oven space, staff and the number of customers in town cap how much can actually be sold",
    ["Doubling patterns never continue past three terms, because a pattern that doubles is guaranteed to stop once it has appeared three times in a row in a sequence","The arithmetic is wrong — week \\(6\\) would be \\(1{,}024\\) loaves, not \\(1{,}280\\), because the owner worked the doubling out wrongly for week six","Inductive reasoning can never be used to plan a business, because spotting a pattern in past sales tells the owner nothing useful at all about what will happen next"],
    "Three observations make a shaky rule, and this one also runs into the real world: demand and capacity do not double forever. Week \\(6\\) at \\(1{,}280\\) follows the pattern \\((40, 80, 160, 320, 640, 1{,}280)\\) — the flaw is trusting the pattern, not the arithmetic.",{});}
]));
E("u7-valid-argument",7,["2.3"],2,"var",varset([
  function(){return mcq("Argument: \u2018All provincial parks charge an entry fee. Gros Morne is a provincial park. Therefore Gros Morne charges an entry fee.\u2019 (Take the premises as given.) Is the argument valid?",
    "Yes \u2014 if the premises are true, the conclusion must follow: the park belongs to the group the first statement covers",
    ["No - because Gros Morne is actually a national park and not a provincial one, the argument is invalid as stated here","No - arguments about money and entry fees are about real world charges rather than logic, so an argument like this can never be valid","Yes - because the conclusion happens to be true, and any argument whose conclusion is true in real life must be valid"],
    "Validity is about the logic, not the real-world facts. (Gros Morne is in fact a national park, which makes a premise false in reality \u2014 but the argument's form is valid: membership in the group forces the conclusion.)",{});},
  function(){return mcq("Argument: \u2018All squares are rectangles. This shape is a rectangle. Therefore this shape is a square.\u2019 Is the argument valid?",
    "No \u2014 being a rectangle does not force the shape to be a square; the reasoning runs the rule backwards",
    ["Yes - squares and rectangles are the same thing, because both have four sides and four right angles","Yes - the conclusion is true for some shapes, and validity only needs the conclusion to hold in some cases","No - because no shape can be both a square and a rectangle at the same time, so the conclusion cannot follow here"],
    "The premise covers squares inside rectangles, but rectangles form the bigger group. Membership in the bigger group says nothing about the smaller one \u2014 the argument is invalid.",{});},
  function(){return mcq("Argument: \u2018All teachers at this school have a classroom key. Ms. Lee has a classroom key. Therefore Ms. Lee is a teacher at this school.\u2019 Is the argument valid?",
    "No \u2014 having a key does not force her to be a teacher here; custodians and substitutes hold keys too, so the reasoning runs the rule backwards",
    ["Yes - the conclusion sounds reasonable, Ms. Lee is at the school daily, and nothing in the premises rules out her being a teacher there","Yes - every statement in the argument is about the school, its keys, and an argument stays valid when all of its statements stay on the one topic","No - an argument is only valid if it contains numbers, measurements or a calculation, and this argument contains nothing but words about keys"],
    "The premise puts teachers inside the bigger group of key-holders. Membership in the bigger group cannot prove membership in the smaller one \u2014 the same backwards step as the rectangle argument.",{});}
]));
E("u7-proof-error",7,["2.8"],3,"var",varset([
  function(){return mcq("A famous fake proof starts with \\(a = b\\), multiplies out to reach \\((a - b)(a + b) = b(a - b)\\), then cancels \\((a - b)\\) from both sides — and ends with \\(2 = 1\\). Where is the error?",
    "Cancelling \\((a - b)\\) divides both sides by \\(a - b\\), which is \\(0\\) — division by zero is not allowed",
    ["The error is in the first line: \\(a\\) can never equal \\(b\\), because two letters cannot name one number","The error is that \\((a + b)\\) should be \\((a - b)\\), because each term there should come from a subtraction","There is no error; the proof shows \\(2 = 1\\), which means arithmetic breaks down when letters replace numbers"],
    "Since \\(a = b\\), \\(a - b = 0\\). Every later step is fine algebra \u2014 but that one cancellation divides by zero, and from a false step anything can \u2018follow\u2019.",{});},
  function(){return mcq("A student \u2018proves\u2019 that every triangle is isosceles by drawing an angle bisector and a perpendicular bisector, then claiming two pairs of congruent triangles force the two sides equal. What kind of flaw should you look for first?",
    "The proof leans on the diagram \u2014 the intersection point was drawn inside the triangle, but in general it falls outside, changing the argument",
    ["Triangles can never be proved congruent, because no two drawn triangles are ever exactly alike, so every congruence claim rests on the picture","Angle bisectors do not exist in all triangles, because only some triangles have an angle that can be split into two equal parts by a line","The flaw is arithmetic in the side lengths: the student added the side lengths up incorrectly when comparing the two triangles in the proof"],
    "Deductive proofs must follow from stated facts, not from how one picture happens to look. A diagram-based assumption is the classic hidden flaw.",{});},
  function(){return mcq("A student ‘proves’ that \\(-1 = 1\\): ‘Since \\((-1)^2 = 1^2\\), taking the square root of both sides gives \\(-1 = 1\\).’ What is the flaw?",
    "Taking the square root loses the sign — \\(x^2 = y^2\\) only implies \\(x = \\pm y\\), not \\(x = y\\)",
    ["The arithmetic is wrong: \\((-1)^2\\) is \\(-1\\), not \\(1\\), because a negative times a negative stays negative","You are never allowed to square both sides of an equation, because squaring is not a permitted step","There is no flaw - the proof is correct, because square rooting undoes squaring exactly"],
    "Squaring is not reversible on its own: both \\(1\\) and \\(-1\\) square to \\(1\\). The step treats the square root as if it restored the original number exactly.",{});}
]));
/* ============ Enrichment: converse and contrapositive (Nov 13, 2026) ============
   Built at Jason's direction from step 7 of the Pure Math bank
   scan's build order. No Unit 7 indicator names the converse or
   the contrapositive, so both entries are flagged enrichment at
   the foot of this file: they stay out of practice draws and
   composed papers unless a teacher deliberately includes them
   from Advanced tools. Every statement is generated from
   hypothesis and conclusion parts (h, c, and their negations nh,
   nc), so each derived form is built mechanically: the original
   is h then c, the converse swaps the parts, the inverse negates
   both parts without swapping, and the contrapositive negates
   both parts and swaps them. Truth values in the second entry
   come from template families whose truth and converse truth are
   known by construction: definitions, which hold both ways, and
   one-way properties, each carrying its standard counterexample. */
var U7_FORMS=[
  {h:"a triangle is equilateral",c:"it is equiangular",nh:"a triangle is not equilateral",nc:"it is not equiangular"},
  {h:"a quadrilateral is a square",c:"it is a rectangle",nh:"a quadrilateral is not a square",nc:"it is not a rectangle"},
  {h:"a whole number is divisible by 6",c:"it is divisible by 3",nh:"a whole number is not divisible by 6",nc:"it is not divisible by 3"},
  {h:"two lines are parallel",c:"the alternate interior angles formed by a transversal are equal",nh:"two lines are not parallel",nc:"the alternate interior angles formed by a transversal are not equal"},
  {h:"an angle is a right angle",c:"it measures 90 degrees",nh:"an angle is not a right angle",nc:"it does not measure 90 degrees"},
  {h:"a point is the midpoint of a segment",c:"it divides the segment into two equal parts",nh:"a point is not the midpoint of a segment",nc:"it does not divide the segment into two equal parts"},
  {h:"a line through the centre of a circle is perpendicular to a chord",c:"it bisects the chord",nh:"a line through the centre of a circle is not perpendicular to a chord",nc:"it does not bisect the chord"},
  {h:"two angles are vertical angles",c:"they have the same measure",nh:"two angles are not vertical angles",nc:"they do not have the same measure"},
  {h:"a library book is returned late",c:"a fine is charged",nh:"a library book is not returned late",nc:"no fine is charged"}
];
function u7Stmt(h,c){return "If "+h+", then "+c+".";}
E("u7-converse-contrapositive",7,["2.3"],2,"gen",function(){
  var t=pick(U7_FORMS);
  var orig=u7Stmt(t.h,t.c),conv=u7Stmt(t.c,t.h),inv=u7Stmt(t.nh,t.nc),contra=u7Stmt(t.nc,t.nh);
  var ask=pick(["converse","contrapositive"]);
  var key=ask==="converse"?conv:contra;
  var distract=[orig,inv,ask==="converse"?contra:conv];
  var sol=ask==="converse"
    ? "The converse swaps the hypothesis and the conclusion, leaving both statements positive: ‘"+conv+"’ The inverse negates both parts without swapping them, and the contrapositive negates both parts and swaps them, so neither of those is the converse."
    : "The contrapositive negates both parts and swaps them: ‘"+contra+"’ The converse swaps the parts without negating them, and the inverse negates both parts without swapping them, so neither of those is the contrapositive.";
  return mcq("Consider the statement ‘"+orig+"’ Which statement is the "+ask+" of this statement?",key,distract,sol,{h:t.h,c:t.c,nh:t.nh,nc:t.nc,ask:ask});
});
var U7_FALSE_CONVERSE=[
  {h:"a quadrilateral is a square",c:"it is a rectangle",nh:"a quadrilateral is not a square",nc:"it is not a rectangle",counter:"a rectangle measuring 3 units by 5 units is a rectangle, but it is not a square"},
  {h:"a whole number is divisible by 6",c:"it is divisible by 3",nh:"a whole number is not divisible by 6",nc:"it is not divisible by 3",counter:"9 is divisible by 3, but 9 is not divisible by 6"},
  {h:"a whole number is divisible by 4",c:"it is even",nh:"a whole number is not divisible by 4",nc:"it is not even",counter:"6 is even, but 6 is not divisible by 4"},
  {h:"a whole number greater than 2 is prime",c:"it is odd",nh:"a whole number greater than 2 is not prime",nc:"it is not odd",counter:"9 is odd, but 9 is not prime"},
  {h:"a student is on the school hockey team",c:"the student attends this school",nh:"a student is not on the school hockey team",nc:"the student does not attend this school",counter:"Alex attends this school but is not on the hockey team"}
];
var U7_TRUE_CONVERSE=[
  {h:"a triangle is equilateral",c:"it is equiangular",nh:"a triangle is not equilateral",nc:"it is not equiangular",why:"the statement is a definition in both directions: a triangle with all sides equal has all angles equal, and a triangle with all angles equal has all sides equal"},
  {h:"an angle is a right angle",c:"it measures 90 degrees",nh:"an angle is not a right angle",nc:"it does not measure 90 degrees",why:"that is the definition of a right angle: an angle measuring 90 degrees is a right angle, and every right angle measures 90 degrees"},
  {h:"a point is the midpoint of a segment",c:"it divides the segment into two equal parts",nh:"a point is not the midpoint of a segment",nc:"it does not divide the segment into two equal parts",why:"that is the definition of a midpoint: a point on a segment that divides it into two equal parts is its midpoint, and the midpoint always divides it that way"},
  {h:"a whole number is even",c:"it is divisible by 2",nh:"a whole number is not even",nc:"it is not divisible by 2",why:"that is the definition of an even number: the whole numbers divisible by 2 are exactly the even numbers, with nothing left over on either side"}
];
E("u7-converse-truth",7,["2.4","2.3"],2,"gen",function(){
  var arm=pick(["falseConverse","trueConverse","equivalence"]);
  if(arm==="equivalence"){
    var t=pick(U7_FORMS);
    var givenTrue=Math.random()<0.5;
    var orig=u7Stmt(t.h,t.c),contra=u7Stmt(t.nc,t.nh);
    var gv=givenTrue?"true":"false",opp=givenTrue?"false":"true";
    return mcq("The statement ‘"+orig+"’ is "+gv+". What must be true about its contrapositive, ‘"+contra+"’?",
      "It must also be "+gv+". A statement and its contrapositive always have the same truth value: they stand or fall together.",
      ["It must be "+opp+". Negating both parts of a statement reverses its truth value, so the contrapositive always differs from the original statement.",
       "It may be true or false. Like the converse, the contrapositive has to be checked on its own before anything can be concluded about it.",
       "Nothing follows about it, because the contrapositive is just the converse with negatives added, and only the converse is tied to the original."],
      "A statement is logically equivalent to its contrapositive: whenever one is "+gv+", the other is "+gv+" too. That is exactly what sets the contrapositive apart from the converse and the inverse, which can differ in truth from the original statement.",
      {arm:arm,h:t.h,c:t.c,nh:t.nh,nc:t.nc,given:gv});
  }
  var fam=arm==="falseConverse"?U7_FALSE_CONVERSE:U7_TRUE_CONVERSE;
  var t=pick(fam);
  var orig=u7Stmt(t.h,t.c),conv=u7Stmt(t.c,t.h);
  if(arm==="falseConverse"){
    return mcq("The statement ‘"+orig+"’ is true. Its converse is ‘"+conv+"’ Is the converse true?",
      "No. The converse is false: "+t.counter+".",
      ["Yes. The converse of a true statement is always true, because swapping the hypothesis and the conclusion cannot change whether a statement holds.",
       "Yes. The hypothesis and the conclusion of a true statement can be swapped freely, since each one implies the other whenever the original statement is true.",
       "It cannot be decided. A converse always has to be checked separately, and nothing in this question settles whether it is true or false."],
      "The original statement being true says nothing on its own about the converse. Here the converse fails outright: "+t.counter+". One counterexample is enough to show a converse is false. Notice the contrast with the contrapositive, which always shares the original statement's truth value.",
      {arm:arm,h:t.h,c:t.c,nh:t.nh,nc:t.nc,converseTrue:false,counter:t.counter});
  }
  return mcq("The statement ‘"+orig+"’ is true. Its converse is ‘"+conv+"’ Is the converse true?",
    "Yes. The converse is also true: "+t.why+".",
    ["No. A converse is never guaranteed to be true, so this converse must be false as well, whatever the statement happens to say.",
     "No. The converse is false: a statement and its converse can both be true only for a definition, and this statement is not a definition.",
     "It cannot be decided. A converse always has to be checked separately, and nothing in this question settles whether it is true or false."],
    "A converse is never guaranteed, but it can still be true, and here it is: "+t.why+". The converse has to be checked on its own merits, and this one passes the check.",
    {arm:arm,h:t.h,c:t.c,nh:t.nh,nc:t.nc,converseTrue:true,why:t.why});
});
/* Enrichment flags (Nov 13, 2026): converse and contrapositive
   work is beyond the named Unit 7 indicators, so these two
   entries are enrichment. The flag is a property on the entry,
   set here in the bank module the way the postMid flags are set
   in bank-fix.js; assembly carries it into banks/math-2201.js
   verbatim, and the shell keeps flagged entries out of practice
   draws and composed papers unless a teacher deliberately
   includes them from Advanced tools. */
BANK.forEach(function(e){if(e.id==="u7-converse-contrapositive"||e.id==="u7-converse-truth")e.enrich=true;});

/* ============ Prior knowledge tranche (November 15, 2026) ============
   Cluster 7 (Reasoning and proof prerequisites): three borrowed
   pattern entries and six authored proof-readiness items.
   Provenance (host id: source, verified by draw sweep):
   - u7-pk-pattern-word: copied from math-9 u6-pattern-word-total, indicator 7.1.
   - u7-pk-pattern-figure: copied from math-9 u6-pattern-figure-expr, indicator 7.1.
   - u7-pk-table-equation: copied from math-9 u6-table-equation, indicator 7.4.
   - u7-pk-conjecture: authored for the Math 2201 PK tranche, placement unevidenced.
   - u7-pk-inductive-limit: authored for the Math 2201 PK tranche, placement unevidenced.
   - u7-pk-counterexample: authored for the Math 2201 PK tranche, placement unevidenced.
   - u7-pk-valid-chain: authored for the Math 2201 PK tranche, placement unevidenced.
   - u7-pk-proof-error: authored for the Math 2201 PK tranche, placement unevidenced.
   - u7-pk-angle-justify: authored for the Math 2201 PK tranche, placement unevidenced.
   The authored six are written to the prior knowledge map's skill
   statements for this cluster: no indicator in Math 1201 or Math 9
   on file names conjecture, counterexample or proof readiness, so
   there is no feeder placement to borrow against and none is
   claimed. The two enrichment entries earlier in this file are not
   prior knowledge and are untouched. Indicator tags are support
   tags, not assessed targets: assessed targets are in pkSrc, the
   full dependent list in pkFor. */
E("u7-pk-pattern-word", 7, ["2.1"], 1, "gen", function () {
  var S = ri(4, 48), r = ri(2, 9), N = ri(11, 30);
  var ctx = pick([
    "A savings jar starts with $" + S + ". Each week, $" + r + " is added to the jar. How much money, in dollars, is in the jar after " + N + " weeks?",
    "A tomato plant is " + S + " cm tall. It grows " + r + " cm each week. How tall, in centimetres, is the plant after " + N + " weeks?",
    "A reader has finished " + S + " pages of a novel. She reads " + r + " more pages each day. How many pages has she finished after " + N + " days?",
    "A water tank holds " + S + " litres. A hose adds " + r + " litres each hour. How many litres are in the tank after " + N + " hours?"
  ]);
  var ans = S + r * N;
  var sol = "Start with the opening amount, then add the step once for each stage: \\[ \\begin{aligned} \\text{total} &= " + S + " + " + fmt(r) + " \\times " + N + " \\\\ &= " + S + " + " + fmt(r * N) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the total after " + N + " stages is <b>" + fmt(ans) + "</b>.";
  return numq(ctx, ans, 0.01, sol, { mode: "pattern-word-total", S: S, r: r, N: N });
}, ["The total is the start amount plus the step, added once for each stage.", "First multiply the step by the number of stages."]);
E("u7-pk-pattern-figure", 7, ["2.1"], 2, "gen", function () {
  var item = pick(["tiles", "dots", "blocks", "counters"]);
  var m = ri(2, 6), b = ri(1, 8), att = 0;
  while (m === b && att < 40) { m = ri(2, 6); b = ri(1, 8); att++; }
  if (m === b) { m = 3; b = 2; }
  var counts = [b + m, b + 2 * m, b + 3 * m];
  var corr = "\\(" + u6lin(m, b, "n") + "\\)";
  var ds = [
    { t: "\\(" + u6lin(b, m, "n") + "\\)", fb: "That swaps the start value and the step. The count grows by " + fmt(m) + " each stage, so " + fmt(m) + " multiplies n." },
    { t: "\\(" + u6lin(m, -b, "n") + "\\)", fb: "That subtracts the start value. The start value is added, because Stage 1 is already more than one step." },
    { t: "\\(" + fmt(m + b) + "n\\)", fb: "That folds the start value into the step. The start value is added once, not once per stage." }
  ];
  var sol = "The counts grow by the same amount each stage: \\[ \\begin{aligned} \\text{step} &= " + counts[1] + " - " + counts[0] + " = " + fmt(m) + " \\\\ \\text{start} &= " + counts[0] + " - " + fmt(m) + " = " + fmt(b) + " \\end{aligned} \\] So the number of " + item + " at Stage \\(n\\) is <b>" + corr + "</b>.";
  var q = mcq("The diagram shows the first three stages of a pattern made with " + item + ". Which expression gives the number of " + item + " at Stage \\(n\\)?",
    { t: corr, fb: "Correct. The start value is " + fmt(b) + " and each new stage adds " + fmt(m) + "." }, ds, sol,
    { mode: "pattern-figure-expr", m: m, b: b, item: item });
  q.figure = u6stageFig(counts, item);
  return q;
}, ["Find how much the count grows from one stage to the next; that growth is the step.", "Work backwards from Stage 1 by subtracting one step to get the start value."]);
E("u7-pk-table-equation", 7, ["2.1"], 2, "gen", function () {
  var S = ri(1, 12), P = ri(2, 7), att = 0;
  while (S === P && att < 40) { S = ri(1, 12); P = ri(2, 7); att++; }
  if (S === P) { S = 4; P = 3; }
  var x0 = pick([0, 0, 1]);
  var xs = [], ys = [];
  for (var k = 0; k < 5; k++) { xs.push(x0 + k); ys.push(S + P * (x0 + k)); }
  var corr = "\\(y = " + u6lin(P, S, "x") + "\\)";
  var startNote = x0 === 0
    ? "When \\(x = 0\\), \\(y = " + S + "\\), so the start value is " + S + "."
    : "Extending the pattern back one step, when \\(x = 0\\), \\(y = " + ys[0] + " - " + P + " = " + S + "\\), so the start value is " + S + ".";
  var sol = "The \\(y\\) values rise by the same amount each time \\(x\\) grows by 1: \\[ \\begin{aligned} \\text{step} &= " + ys[1] + " - " + ys[0] + " = " + fmt(P) + " \\end{aligned} \\] " + startNote + " So the equation is <b>" + corr + "</b>.";
  var prompt = "A table of values for a linear relation is shown.<br>x: " + xs.join(", ") + "<br>y: " + ys.join(", ") + "<br>Which equation fits the table?";
  return mcq(prompt,
    { t: corr, fb: "Correct. The step is " + fmt(P) + " and the start value is " + fmt(S) + "." },
    [
      { t: "\\(y = " + u6lin(S, P, "x") + "\\)", fb: "That swaps the start value and the step. Check it at the first table value." },
      { t: "\\(y = " + u6lin(P, -S, "x") + "\\)", fb: "That subtracts the start value. The y values are larger than the step alone, so the start is added." },
      { t: "\\(y = " + u6lin(P, S + P, "x") + "\\)", fb: "The step is right, but the start value is too big. Use the y value when x is 0." }
    ], sol, { mode: "table-equation", S: S, P: P, x0: x0 });
}, ["Find the step first: how much does y change when x grows by 1?", "The start value is the y value when x is 0; extend the pattern back if the table starts later."]);
E("u7-pk-conjecture", 7, ["2.1"], 1, "var", varset([
  function () {
    return mcq("A student adds odd numbers in order and records the results: 1 = 1; 1 + 3 = 4; 1 + 3 + 5 = 9; 1 + 3 + 5 + 7 = 16. Which conjecture fits every case shown?",
      "The sum of the first few odd numbers is always a square number",
      ["The sum of the first few odd numbers is always an even number",
       "The sum grows by exactly 2 each time another odd number is added",
       "The sum of the first few odd numbers is always twice the count of terms"],
      "Check each option against all four cases. The sums 1, 4, 9 and 16 are all square numbers, so the first conjecture fits every case. The first sum, 1, is odd, the growth from 1 to 4 is 3 rather than 2, and three terms give 9 rather than 6. The conjecture that fits every case is <b>the sum is always a square number</b>.",
      { mode: "pk-conjecture-odds" });
  },
  function () {
    return mcq("A student multiplies pairs of consecutive whole numbers: 2 x 3 = 6; 4 x 5 = 20; 6 x 7 = 42; 8 x 9 = 72. Which conjecture fits every case shown?",
      "The product of two consecutive whole numbers is always even",
      ["The product of two consecutive whole numbers is always a multiple of 3",
       "The product of two consecutive whole numbers is always a multiple of 4",
       "The product of two consecutive whole numbers is odd"],
      "Check each option against all four cases. The products 6, 20, 42 and 72 are all even, so the first conjecture fits every case. But 20 is not a multiple of 3, 6 is not a multiple of 4, and every product shown is even rather than odd. The conjecture that fits every case is <b>the product is always even</b>.",
      { mode: "pk-conjecture-consec" });
  },
  function () {
    return mcq("A student measures the angles of three different triangles: 60, 60 and 60 degrees; 90, 45 and 45 degrees; 110, 35 and 35 degrees. Which conjecture fits every case shown?",
      "The three angles of a triangle always add to 180 degrees",
      ["The three angles of a triangle always add to 360 degrees",
       "Every triangle always has at least one right angle in it",
       "The largest angle of a triangle is always more than 90 degrees"],
      "Check each option against all three cases. Each set adds to 180 degrees: 60 + 60 + 60, 90 + 45 + 45 and 110 + 35 + 35. The first triangle has no right angle and its largest angle is only 60 degrees, so those two conjectures fail. The conjecture that fits every case is <b>the angles add to 180 degrees</b>.",
      { mode: "pk-conjecture-triangles" });
  },
  function () {
    return mcq("A student adds the digits of multiples of 3: 12 gives 3; 24 gives 6; 39 gives 12; 105 gives 6. Which conjecture fits every case shown?",
      "The digits of a multiple of 3 always add to a multiple of 3",
      ["The digits of a multiple of 3 always add to exactly 3 each time",
       "Every multiple of 3 shown here is an even number as well",
       "The digits of a multiple of 3 always add to an even number"],
      "Check each option against all four cases. The digit sums 3, 6, 12 and 6 are all multiples of 3, so the first conjecture fits every case. But 24 has digit sum 6 rather than 3, 39 is odd, and 12 has the odd digit sum 3. The conjecture that fits every case is <b>the digits add to a multiple of 3</b>.",
      { mode: "pk-conjecture-digits" });
  }
]));
E("u7-pk-valid-chain", 7, ["2.3"], 2, "var", varset([
  function () {
    return mcq("Read the chain of statements. If a number is divisible by 6, then it is divisible by 3. If a number is divisible by 3, then the sum of its digits is divisible by 3. The number 42 is divisible by 6. Which conclusion must follow?",
      "The sum of the digits of 42 is divisible by 3",
      ["Any number with that digit sum is divisible by 6",
       "The number 42 is also divisible by 9",
       "If 42 were not divisible by 6, its digit sum would fail too"],
      "Follow the chain forward: 42 is divisible by 6, so it is divisible by 3, so the sum of its digits is divisible by 3 (and indeed 4 + 2 = 6). The other options reverse the chain or add a claim the chain never makes, and neither move is allowed. The conclusion that must follow is <b>the sum of the digits of 42 is divisible by 3</b>.",
      { mode: "pk-chain-digits" });
  },
  function () {
    return mcq("Read the chain of statements. If a student is on the curling team, then she practises on Wednesdays. If a student practises on Wednesdays, then she stays after school. Emma is on the curling team. Which conclusion must follow?",
      "Emma stays after school on Wednesdays",
      ["Every student who stays after school is on the curling team",
       "Emma is on the team because she stays after school",
       "Emma stays after school daily"],
      "Follow the chain forward: Emma is on the curling team, so she practises on Wednesdays, so she stays after school. The other options reverse the chain or add a claim the chain never makes, and neither move is allowed. The conclusion that must follow is <b>Emma stays after school on Wednesdays</b>.",
      { mode: "pk-chain-curling" });
  },
  function () {
    return mcq("Read the chain of statements. If a triangle is equilateral, then all three of its angles measure 60 degrees. If all three angles of a triangle measure 60 degrees, then the triangle is equiangular. Triangle T is equilateral. Which conclusion must follow?",
      "Triangle T is equiangular",
      ["Every equiangular triangle is equilateral by the chain",
       "A non-equilateral triangle has no 60 degree angles",
       "Triangle T is isosceles"],
      "Follow the chain forward: Triangle T is equilateral, so all its angles measure 60 degrees, so it is equiangular. The other options reverse the chain or add a claim the chain never makes, and neither move is allowed. The conclusion that must follow is <b>Triangle T is equiangular</b>.",
      { mode: "pk-chain-triangle" });
  },
  function () {
    return mcq("Read the chain of statements. If it rains on game day, then the field is wet. If the field is wet, then the game is moved indoors. It rained on game day. Which conclusion must follow?",
      "The game is moved indoors",
      ["If the game is moved indoors, then it rained on game day",
       "If it does not rain, the game stays outdoors",
       "The field stays dry"],
      "Follow the chain forward: it rained, so the field is wet, so the game is moved indoors. The other options reverse the chain or contradict what the chain gives, and neither move is allowed. The conclusion that must follow is <b>the game is moved indoors</b>.",
      { mode: "pk-chain-rain" });
  }
]));
E("u7-pk-proof-error", 7, ["2.8"], 2, "var", varset([
  function () {
    return mcq("A student argues: Claim: every even number is divisible by 4. Step 1: The first even numbers are 2, 4, 6, 8, 10, 12. Step 2: Among these, 4, 8 and 12 are divisible by 4. Step 3: The even numbers beyond these follow the same pattern. Step 4: So every even number is divisible by 4. Which step does not follow?",
      "Step 3: the numbers never checked are simply assumed to follow the pattern, with no reason given for them",
      ["Step 1: the list of even numbers is wrong, because 2 is not an even number and should not be listed there",
       "Step 2: the multiples listed are wrong, because 8 is not divisible by 4 and should not be counted there",
       "Step 4: the conclusion is too strong, because a claim about all numbers can never be made from any steps"],
      "Steps 1 and 2 are correct as far as they go, and Step 4 only repeats the claim. The gap is Step 3: the unchecked numbers (starting with 2, 6 and 10, which are not divisible by 4) are waved through by assuming the pattern continues. <b>Step 3 is the step that does not follow.</b>",
      { mode: "pk-error-pattern" });
  },
  function () {
    return mcq("A student argues: Claim: a quadrilateral with one pair of parallel sides has both pairs parallel. Step 1: A trapezoid has one pair of parallel sides. Step 2: A parallelogram has both pairs of sides parallel. Step 3: A trapezoid is a kind of parallelogram. Step 4: So a trapezoid has both pairs of sides parallel. Which step does not follow?",
      "Step 3: a trapezoid is not a kind of parallelogram, and this is stated as if it were a known fact",
      ["Step 1: a trapezoid does not have a pair of parallel sides, so the argument starts falsely",
       "Step 2: a parallelogram does not have both pairs of sides parallel, so the fact used there is false",
       "Step 4: the conclusion is too strong, because a claim about all shapes can never be made from steps"],
      "Steps 1 and 2 state true facts, and Step 4 only draws the conclusion the steps point to. The gap is Step 3: a trapezoid is not a kind of parallelogram, so the bridge between the two facts was never earned. <b>Step 3 is the step that does not follow.</b>",
      { mode: "pk-error-trapezoid" });
  },
  function () {
    return mcq("A student argues: Claim: if x^2 = 36, then x = 6 is the only solution. Step 1: Squaring 6 gives 36. Step 2: Taking the square root of both sides of x^2 = 36 gives x = 6. Step 3: So x = 6 is the only solution. Which step does not follow?",
      "Step 2: the square root step drops the negative solution, since (-6)^2 = 36 as well as 6^2",
      ["Step 1: the arithmetic is wrong, because squaring 6 gives 12, not 36",
       "Step 3: the conclusion is too strong, because an equation can never have a single solution at all",
       "Step 2: square roots cannot be taken in an equation, so the step uses an illegal move in algebra"],
      "Step 1 is correct, and taking square roots is a legal move. The gap is inside Step 2: x^2 = 36 has two solutions, 6 and -6, and the step keeps only one of them without any reason. <b>Step 2 is the step that does not follow.</b>",
      { mode: "pk-error-sqrt" });
  }
]));
E("u7-pk-angle-justify", 7, ["2.3"], 2, "gen", function () {
  var mode = ri(1, 2);
  if (mode === 1) {
    var A = ri(30, 80), s = ri(100, 150), B = 180 - s, C = 180 - A - B, tries = 0;
    while (C < 15 && tries < 60) { A = ri(30, 80); s = ri(100, 150); B = 180 - s; C = 180 - A - B; tries++; }
    return numq("In triangle ABC, angle A measures " + A + " degrees. The angle adjacent to angle B, on a straight line with it, measures " + s + " degrees. What is the measure of angle C, in degrees?",
      C, 0.011,
      "Two facts do the work, and both are named here. First, angles on a straight line are supplementary, so angle B = 180 - " + s + " = " + B + " degrees. Second, the angles of a triangle add to 180 degrees, so angle C = 180 - " + A + " - " + B + " = <b>" + C + " degrees</b>.",
      { mode: "pk-angle-justify-tri", A: A, B: B });
  }
  var p = ri(25, 75), q = ri(25, 75), tries2 = 0;
  while (p + q > 150 && tries2 < 60) { p = ri(25, 75); q = ri(25, 75); tries2++; }
  var third = 180 - p - q, supp = 180 - third;
  return numq("Two angles of a triangle measure " + p + " degrees and " + q + " degrees. What is the measure of the angle adjacent to the third angle, on a straight line with it, in degrees?",
    supp, 0.011,
    "Two facts do the work, and both are named here. First, the angles of a triangle add to 180 degrees, so the third angle is 180 - " + p + " - " + q + " = " + third + " degrees. Second, angles on a straight line are supplementary, so the adjacent angle is 180 - " + third + " = <b>" + supp + " degrees</b>.",
    { mode: "pk-angle-justify-supp", p: p, q: q });
});
E("u7-pk-inductive-limit", 7, ["2.2"], 2, "var", varset([
  function () {
    return mcq("A student tests the claim that n^2 + n + 41 is prime for every whole number n. The claim holds for n = 1, 2, 3, and so on up to n = 10. Which statement best explains why the claim is still not proven?",
      "A pattern in checked cases can fail at a case not yet checked, so one untested value could still give a composite number",
      ["The claim is proven, because ten cases in a row is enough checking to settle any claim about numbers of this kind",
       "The claim must be false, because no formula can produce that many prime numbers in a row without failing somewhere along the way",
       "Checking every case up to n = 100 would settle the claim completely for every possible value of n that exists"],
      "Checking cases, however many, tests only those cases. The values from 1 to 10 all work, but the claim is about every whole number, and a single untested value that gives a composite number would break it. That is why <b>checked cases alone can never settle a claim about all cases</b>.",
      { mode: "pk-inductive-prime" });
  },
  function () {
    return mcq("The first five terms of a sequence are 2, 4, 8, 16, 32. A student claims the next term must be 64. Which statement best explains why the claim is not certain?",
      "A different rule can fit the same five terms and give a different next term, because shown terms never force one single rule",
      ["The claim is certain, because doubling is the only pattern that can produce the five terms shown in the sequence, so no other continuation is possible",
       "The next term is 64 only when the first term of the sequence happens to be exactly the number 2, as it is here",
       "Sequences can never be predicted at all, even when a rule for the sequence is stated in the question itself"],
      "The five terms fit the doubling rule, but they also fit other rules that agree on these terms and differ later. Until a rule is given, the terms alone cannot force the next one. That is why <b>the claim is a reasonable guess, not a certainty</b>.",
      { mode: "pk-inductive-sequence" });
  },
  function () {
    return mcq("Maya draws 20 different triangles and finds that the angles of each one add to 180 degrees. Which statement best explains why this does not, by itself, prove the angle sum for every triangle?",
      "Triangles she has not drawn might behave differently, because examples can support a claim but cannot cover every possible case",
      ["Twenty triangles is too few, because a proof needs at least one hundred agreeing examples before it can count as settled for every triangle",
       "The claim is proven once twenty different cases all agree with it, so nothing further is needed to settle it at all",
       "Drawings are useless in geometry, so the twenty checks tell her nothing about triangles in general or in particular"],
      "Each drawn triangle is one case. Twenty agreeing cases make the claim plausible, but the claim covers every triangle, including ones never drawn. A proof has to cover all cases at once, which is why <b>examples alone cannot settle a claim about every triangle</b>.",
      { mode: "pk-inductive-triangles" });
  }
]));
E("u7-pk-counterexample", 7, ["2.4"], 2, "var", varset([
  function () {
    var ds = shuffle([7, 11, 19, 23, 29]).slice(0, 3).map(function (p) { return "" + p; });
    return mcq("Consider the claim: every prime number is odd. Which value is a counterexample to this claim?",
      "2", ds,
      "A counterexample must satisfy the claim's condition and break its conclusion. The number 2 is prime, so it satisfies the condition, but it is even, so it breaks the conclusion. The other values are odd primes, which agree with the claim instead of breaking it. The counterexample is <b>2</b>.",
      { mode: "pk-counter-prime" });
  },
  function () {
    var k = pick([9, 15, 21, 27, 33, 39, 45]);
    var ds2 = shuffle([12, 18, 24, 30, 36, 42, 48]).slice(0, 3).map(function (p) { return "" + p; });
    return mcq("Consider the claim: every number divisible by 3 is also divisible by 6. Which value is a counterexample to this claim?",
      "" + k, ds2,
      "A counterexample must satisfy the claim's condition and break its conclusion. The number " + k + " is divisible by 3, so it satisfies the condition, but it is not divisible by 6, so it breaks the conclusion. The other values are divisible by both 3 and 6, so they agree with the claim. The counterexample is <b>" + k + "</b>.",
      { mode: "pk-counter-divisible", k: k });
  },
  function () {
    var fp = pick([["1/2", "1/4"], ["1/3", "1/9"], ["2/3", "4/9"], ["1/4", "1/16"], ["3/4", "9/16"]]);
    var ds3 = shuffle(["2", "3", "5", "10"]).slice(0, 3);
    return mcq("Consider the claim: the square of a number is always greater than the number itself. Which value is a counterexample to this claim?",
      fp[0], ds3,
      "A counterexample must satisfy the claim's condition and break its conclusion. Squaring " + fp[0] + " gives " + fp[1] + ", which is less than " + fp[0] + ", so " + fp[0] + " breaks the claim. Squaring 2, 3, 5 or 10 gives a larger number, so those values agree with the claim. The counterexample is <b>" + fp[0] + "</b>.",
      { mode: "pk-counter-square", f: fp[0] });
  },
  function () {
    return mcq("Consider the claim: every four-sided figure has all four sides equal. Which figure is a counterexample to this claim?",
      "A rectangle 3 cm by 5 cm",
      ["A square with side length 4 cm",
       "A rhombus with side length 6 cm",
       "An equilateral triangle of side 5 cm"],
      "A counterexample must satisfy the claim's condition and break its conclusion. A rectangle 3 cm by 5 cm has four sides, so it satisfies the condition, but its sides are not all equal, so it breaks the conclusion. A square and a rhombus have all sides equal, and a triangle does not have four sides at all. The counterexample is <b>a rectangle 3 cm by 5 cm</b>.",
      { mode: "pk-counter-quad" });
  }
]));
/* PK tranche pass for Unit 7. pkFor is Cluster 7's dependent
   indicator list from the prior knowledge map. */
var PKT_U7_FOR=["2.1","2.2","2.3","2.4","2.7","2.8"];
var PKT_U7={
 "u7-pk-pattern-word":{src:"math-9:7.1",group:"patterns"},
 "u7-pk-pattern-figure":{src:"math-9:7.1",group:"patterns"},
 "u7-pk-table-equation":{src:"math-9:7.4",group:"patterns"},
 "u7-pk-conjecture":{src:"authored:conjecture, placement unevidenced",group:"conjecture"},
 "u7-pk-inductive-limit":{src:"authored:inductive-limit, placement unevidenced",group:"inductive-limit"},
 "u7-pk-counterexample":{src:"authored:counterexample, placement unevidenced",group:"counterexample"},
 "u7-pk-valid-chain":{src:"authored:valid-chain, placement unevidenced",group:"valid-chain"},
 "u7-pk-proof-error":{src:"authored:proof-error, placement unevidenced",group:"proof-error"},
 "u7-pk-angle-justify":{src:"authored:angle-justification, placement unevidenced",group:"angle-justification"}};
BANK.forEach(function(e){var t=PKT_U7[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U7_FOR.slice();e.pkGroup=t.group;}});

/* ----- bank-u8.js ----- */
// Math 2201 Unit 8: Properties of Angles and Triangles question bank
// Cut verbatim from the standalone app's served file
// (math-2201-review/Math2201Review.html, lines 1773 to 2138).
// CRMARKS: u8-triangle-sum=1
// CRMARKS: u8-co-interior=1
// CRMARKS: u8-alternate-algebra=2
// CRMARKS: u8-polygon-sum=1
// CRMARKS: u8-regular-angle=1
// CRMARKS: u8-exterior=1
// CRMARKS: u8-polygon-ratio=2
// CRMARKS: u7-counterexample-gen=2
// CRMARKS: u7-sequence-gap=1
// CRMARKS: u5-ci-level-from-report=1
// CRMARKS: u5-ci-shrink=2
// CRMARKS: u5-poll-position=3
// CRMARKS: u5-ci-build=1
// CRMARKS: u5-ci-read-report=2
// CRMARKS: u3-equation-from-roots=2
// CRMARKS: u6-similar-dimension=1
// CRMARKS: u6-compare-rates=2
// CRMARKS: u6-rate-isolate=1
// CRMARKS: u8-angle-sum-rule=1
/* ============ Unit 8: Properties of Angles and Triangles ============ */
E("u8-triangle-sum",8,["5.3"],1,"gen",function(){
  var a=ri(35,75),b=ri(35,75);while(a+b>160){b=ri(30,60);}
  var c=180-a-b;
  var q = numq("Two angles of a triangle measure \\("+a+"^\\circ\\) and \\("+b+"^\\circ\\). What is the measure of the third angle, in degrees?",
    c,0.011,"The interior angles of a triangle sum to \\(180^\\circ\\): \\(180 - "+a+" - "+b+" = \\)<b>\\("+c+"^\\circ\\)</b>.",{a:a,b:b});
  q.figure = triAngSVG(a, b, 180-a-b, {ang:[a+"°",b+"°","?"]});
  return q;
});
E("u8-co-interior",8,["5.8"],1,"gen",function(){
  var a=ri(55,160);var b=180-a;
  var frame=pick([
    "Two parallel lines are cut by a transversal. A co-interior angle measures \\("+a+"^\\circ\\). What is the measure of the co-interior angle on the same side of the transversal, in degrees?",
    "Two parallel rails are cut by a straight crossing path. On the same side of the path, one co-interior angle measures \\("+a+"^\\circ\\). What is the measure of the other co-interior angle on that side, in degrees?"]);
  var q = numq(frame,b,0.011,"Co-interior angles between parallel lines are supplementary: \\(180 - "+a+" = \\)<b>\\("+b+"^\\circ\\)</b>.",{a:a});
  q.figure = transversalSVG("TR", a+"°", "BR", "?");
  return q;
});
E("u8-alternate-algebra",8,["5.8"],2,"gen",function(){
  var x=ri(8,20);var a=3,b=ri(1,15);var val=a*x+b;
  var q = numq("Two parallel lines are cut by a transversal. Alternate interior angles measure \\(("+a+"x + "+b+")^\\circ\\) and \\("+val+"^\\circ\\). Find \\(x\\).",
    x,0.011,"Alternate interior angles between parallel lines are equal: \\[\\begin{aligned} "+a+"x + "+b+" &= "+val+" \\\\ "+a+"x &= "+(val-b)+" \\\\ x &= "+x+" \\end{aligned}\\]",{x:x});
  q.figure = transversalSVG("TR", "("+a+"x + "+b+")°", "BL", val+"°");
  return q;
});
E("u8-polygon-sum",8,["5.2"],1,"gen",function(){
  var n=ri(3,30);var s=(n-2)*180;
  var frame=pick([
    "What is the sum of the interior angles of a polygon with "+n+" sides, in degrees?",
    "A polygon has "+n+" sides. What is the sum of its interior angles, in degrees?",
    "How many degrees do the interior angles of a "+n+"-sided polygon add up to?"]);
  var q = numq(frame,
    s,0.011,"Sum \\(= ("+n+" - 2) \\times 180^\\circ = "+(n-2)+" \\times 180^\\circ = \\)<b>\\("+s+"^\\circ\\)</b>.",{n:n});
  q.figure = polySVG(n, false);
  return q;
});
E("u8-regular-angle",8,["5.1"],1,"gen",function(){
  var n=ri(3,30);var sum=(n-2)*180;var each=sum/n;
  var names={3:"equilateral triangle",4:"square",5:"regular pentagon",6:"regular hexagon",7:"regular heptagon",8:"regular octagon",9:"regular nonagon",10:"regular decagon",11:"regular hendecagon",12:"regular dodecagon"};
  var frame=pick(["What is the measure of each interior angle of a regular polygon with "+n+" sides, in degrees? (A decimal is fine.)",
    "Find the measure of one interior angle of a regular "+n+"-gon, in degrees. (A decimal is fine.)",
    "A regular polygon has "+n+" sides. What is the measure of each of its interior angles, in degrees? (A decimal is fine.)"]);
  if(names[n]&&Math.random()<0.5)frame="What is the measure of each interior angle of a "+names[n]+" (a regular "+n+"-gon), in degrees? (A decimal is fine.)";
  var q = numq(frame,
    each,0.011,"Sum of interior angles \\(= ("+n+" - 2) \\times 180^\\circ = "+sum+"^\\circ\\). All \\("+n+"\\) angles are equal: \\("+sum+" \\div "+n+" = \\)<b>\\("+fmt(each)+"^\\circ\\)</b>.",{n:n});
  q.figure = polySVG(n, true);
  return q;
});
E("u8-exterior",8,["5.11"],1,"gen",function(){
  var a=ri(30,70),b=ri(30,70);var ext=a+b;
  var q = numq("In a triangle, the two non-adjacent interior angles measure \\("+a+"^\\circ\\) and \\("+b+"^\\circ\\). What is the measure of the exterior angle at the third vertex, in degrees?",
    ext,0.011,"The exterior angle equals the sum of the two remote interior angles: \\("+a+" + "+b+" = \\)<b>\\("+ext+"^\\circ\\)</b>. It is also \\(180^\\circ\\) minus the adjacent interior angle — the two facts agree.",{a:a,b:b});
  q.figure = triAngSVG(a, b, 180-a-b, {ang:[a+"°",b+"°",null], ext:2, extLabel:"?"});
  return q;
});
E("u8-congruent",8,["5.6"],1,"var",varset([
  function(){return mcq("Which piece of information is NOT enough, on its own, to prove two triangles congruent?",
    "Three pairs of equal angles (AAA) \u2014 the triangles could be different sizes",
    ["Three pairs of equal sides (SSS) - all three sides match in pairs","Two sides and the contained angle (SAS) - the equal angle sits between the sides","Two angles and the side between them (ASA) - the side between the equal angles"],
    "AAA fixes the shape but not the size \u2014 those triangles are similar, not necessarily congruent. Congruence needs at least one side length anchored.",{});},
  function(){return mcq("Two triangles share a side, have another pair of sides equal, and the angles between those sides are equal. Which congruence rule applies?",
    "SAS \u2014 two sides and the contained angle",
    ["SSS - three sides, matched in pairs","ASA - two angles and a side included between them","AAA - three angles in matching pairs"],
    "The equal angle sits between the two equal sides, which is exactly the side-angle-side pattern.",{});},
  function(){return mcq("Two triangles have two pairs of equal angles, and the side between those two angles is the same length in both triangles. Which rule proves the triangles congruent?",
    "ASA \u2014 two angles and the side between them",
    ["SAS \u2014 two sides and the contained angle","SSS - three sides, matched in pairs","AAA - three angles, matched in pairs at each vertex"],
    "The equal side sits between the two equal angles in each triangle, which is the angle-side-angle pattern.",{});}
]));
E("u8-parallel-check",8,["5.9"],1,"var",varset([
  function(){return mcq("A transversal cuts two lines. Corresponding angles measure \\(112^\\circ\\) and \\(112^\\circ\\). What can you conclude?",
    "The lines are parallel \u2014 equal corresponding angles is one of the tests for parallel lines",
    ["The lines are not parallel, because the angles should add to \\(180^\\circ\\) rather than be equal to each other","Nothing - angle measures cannot tell us about parallel lines or about any other lines","The lines are perpendicular, because equal angles show the lines meet at right angles"],
    "When a transversal makes corresponding angles equal, the lines are parallel. (Supplementary is the test for co-interior angles, a different pair.)",{});},
  function(){return mcq("A transversal cuts two lines, and co-interior angles measure \\(105^\\circ\\) and \\(82^\\circ\\). Are the lines parallel?",
    "No — co-interior angles between parallel lines must be supplementary, and \\(105 + 82 = 187 \\neq 180\\)",
    ["Yes - any two angles formed by a transversal prove the lines parallel, whatever they measure","Yes - because both angles are obtuse and acute in balance, which makes the lines parallel","No - because co-interior angles must be equal, so \\(105 = 82\\) must hold for parallel lines"],
    "For parallel lines, co-interior angles add to exactly \\(180^\\circ\\). \\(187^\\circ\\) misses, so the lines are not parallel.",{});},
  function(){return mcq("A transversal cuts two lines, and a pair of alternate exterior angles both measure \\(74^\\circ\\). What can you conclude?",
    "The lines are parallel \u2014 equal alternate exterior angles is one of the tests for parallel lines",
    ["The lines are not parallel - alternate angles must add to \\(180^\\circ\\) rather than match each other","Nothing - angles outside the lines give no information about whether the two lines are parallel or not","The lines are perpendicular - matching outside angles show the lines meet at right angles"],
    "Equal corresponding angles, equal alternate angles, or supplementary co-interior angles each certify parallel lines. Here the alternate exterior pair matches at \\(74^\\circ\\).",{});}
]));
E("u8-polygon-ratio",8,["5.2"],2,"gen",function(){
  var r=pick([1,2,3,4,5,7,8,9,11,14,15,17,19,23,29,35]);var ext=180/(r+1);var n=360/ext;var interior=r*ext;
  var frame=pick([
    "In a regular polygon, each interior angle is "+r+" times as large as each exterior angle. How many sides does the polygon have?",
    "Each interior angle of a regular polygon is "+r+" times each exterior angle. How many sides does the polygon have?",
    "A regular polygon's interior angle is "+r+" times its exterior angle. Find the number of sides.",
    "For a regular polygon, the ratio of an interior angle to its exterior angle is \\("+r+" : 1\\). How many sides does it have?"]);
  return numq(frame,
    n,0.011,"\\(\\text{Interior} + \\text{exterior} = 180^\\circ\\). With interior \\(= "+r+" \\times \\text{exterior}\\): \\(("+r+" + 1) \\times \\text{exterior} = 180^\\circ\\), so each exterior angle is \\("+fmt(ext)+"^\\circ\\) (and each interior angle is \\("+fmt(interior)+"^\\circ\\)). The exterior angles make one full turn: \\(360 \\div "+fmt(ext)+" = \\)<b>\\("+fmt(n)+"\\text{ sides}\\)</b>.",{r:r,ext:ext});
});
E("u7-reasoning-type",7,["2.7"],1,"var",varset([
  function(){return mcq("Which option uses INDUCTIVE reasoning?",
    "\\(4 \\times 6 = 24\\), \\(2 \\times 8 = 16\\) and \\(10 \\times 12 = 120\\) — in every case tried, the product of two even numbers is even",
    ["Let the numbers be \\(2a\\) and \\(2b\\). Their product is \\(4ab = 2(2ab)\\), a multiple of \\(2\\), so it is even","An even number is defined as a multiple of \\(2\\), and a product of multiples of \\(2\\) is a multiple of \\(2\\)","Let one number be \\(2a + 1\\) and the other \\(2b + 1\\). Their product is \\(4ab + 2a + 2b + 1\\), which is an odd number"],
    "Inductive reasoning generalizes from specific cases that were actually tried. The other options argue from general forms or definitions \u2014 that is deduction (and the last one is even about odd numbers, not this claim).",{});},
  function(){return mcq("Sam writes: \u2018The bus was late on Monday and on Tuesday, so it will be late again tomorrow.\u2019 What kind of reasoning is this?",
    "Inductive \u2014 it predicts tomorrow from a few observed cases",
    ["Deductive \u2014 the conclusion simply has to follow","A counterexample \u2014 it disproves the bus schedule","A proof \u2014 two examples are enough to prove a pattern holds"],
    "Sam observed two cases and generalized to an unobserved one. That is induction: the conclusion is plausible, not guaranteed.",{});},
  function(){return mcq("The angles in any triangle add to \\(180^\\circ\\). Priya uses that rule to work out the third angle of the triangle in her homework. What kind of reasoning is she using?",
    "Deductive \u2014 she applies a general rule to a specific case",
    ["Inductive \u2014 she is looking for a pattern in triangles","A counterexample \u2014 she is testing whether the rule ever fails","Circular \u2014 she assumes the very thing she is proving"],
    "Deduction moves from the general to the specific: the rule covers every triangle, so it covers hers.",{});}
]));
E("u7-proof-pick",7,["2.7"],3,"var",varset([
  function(){return mcq("Which option uses DEDUCTIVE reasoning to show that the sum of two odd numbers is always even?",
    "Let the two numbers be \\(2a + 1\\) and \\(2b + 1\\). Their sum is \\(2a + 2b + 2 = 2(a + b + 1)\\), which is a multiple of \\(2\\) — so the sum is even for every pair of odd numbers",
    ["\\(3 + 5 = 8\\), \\(7 + 9 = 16\\), \\(11 + 13 = 24\\), \\(15 + 17 = 32\\), \\(21 + 23 = 44\\) and \\(31 + 33 = 64\\) - in each case the sum is even, so odd numbers add to an even sum","Let the two numbers be \\(2a + 1\\) and \\(2b + 1\\). Their sum is \\(2ab + 2\\), which is a multiple of \\(2\\), so the sum is even for every pair of odd numbers, for all values of \\(a\\) and \\(b\\)","A calculator checked \\(500\\) random pairs of odd numbers, small ones and large ones in the hundreds and thousands alike, and every sum came out even, with no exception found"],
    "Deductive reasoning starts from a general form \u2014 every odd number can be written as \\(2a + 1\\) — and the algebra settles the claim for all cases at once. Checking examples, even \\(500\\) of them, is inductive: it can suggest the claim but never prove it. And the option giving the sum as \\(2ab + 2\\) is algebra gone wrong \u2014 that is not what the sum is.",{});},
  function(){return mcq("Which option uses DEDUCTIVE reasoning to show that the sum of three even integers is always even?",
    "Write the integers as \\(2a\\), \\(2b\\) and \\(2c\\). Their sum is \\(2a + 2b + 2c = 2(a + b + c)\\), a multiple of \\(2\\), so the sum is even",
    ["\\(2 + 4 + 6 = 12\\), \\(4 + 8 + 10 = 22\\), \\(6 + 10 + 14 = 30\\) and \\(8 + 12 + 16 = 36\\) - in every case the sum comes out even","Write the integers as \\(2a\\), \\(2b\\) and \\(2c\\). Their sum is \\(2a + 2b + 2c = 6abc\\), which is even, so the sum is always even","A spreadsheet tested \\(500\\) triples of even integers, small triples and large ones alike, and every sum the spreadsheet produced was even"],
    "Only the option that factors the sum as \\(2(a + b + c)\\) proves the claim for every triple at once. Examples and spreadsheet checks are inductive, and \\(6abc\\) is not the sum of \\(2a\\), \\(2b\\) and \\(2c\\).",{});}
]));
E("u7-counterexample-gen",7,["2.4"],1,"gen",function(){
  var pairs=[[3,4],[3,5],[4,6],[5,6],[2,5],[6,8],[6,9],[4,10],[6,10],[6,15],[8,12],[9,12],[10,15],[5,7],[4,7]];
  var pr=pick(pairs),A=pr[0],B=pr[1];
  function gg(x,y){while(y){var t=x%y;x=y;y=t;}return x;}
  var L=A*B/gg(A,B);
  var valid=[];for(var t=1;t<=8;t++){if((A*t)%B!==0)valid.push(t);}
  var k=A*pick(valid);
  var mults=[1,2,3,4].sort(function(){return Math.random()-0.5;}).slice(0,3);
  var wrongs=mults.map(function(m){return "\\("+(L*m)+"\\)";});
  var claim=pick(["Every number divisible by \\("+A+"\\) is also divisible by \\("+B+"\\)","A multiple of \\("+A+"\\) is always a multiple of \\("+B+"\\)"]);
  return mcq("Conjecture: \u2018"+claim+".\u2019 Which value is a counterexample?",
    "\\("+k+"\\)",wrongs,
    "\\("+k+"\\) is divisible by \\("+A+"\\) (\\("+A+" \\times "+(k/A)+" = "+k+"\\)), but \\("+k+" \\div "+B+"\\) is not a whole number, so it breaks the conjecture. Each other value is a multiple of \\("+B+"\\) as well as \\("+A+"\\), so those values agree with the conjecture instead of refuting it.",{A:A,B:B,k:k});
});
E("u7-sequence-gap",7,["2.1"],1,"gen",function(){
  var fam=ri(0,2),terms=[],ans=0,sig={};
  if(fam===0){var a0=ri(2,9),r=pick([2,3]);for(var i=0;i<6;i++)terms.push(a0*Math.pow(r,i));var g=pick([2,3,4]);ans=terms[g];sig={fam:"geo",a0:a0,r:r,g:g};}
  else if(fam===1){var x=ri(1,4),y=ri(1,6);terms=[x,y];for(var i2=2;i2<7;i2++)terms.push(terms[i2-1]+terms[i2-2]);var g2=pick([3,4,5]);ans=terms[g2];sig={fam:"fib",x:x,y:y,g:g2};}
  else{var s0=ri(2,9),d0=ri(1,4);terms=[s0];for(var i3=1;i3<6;i3++)terms.push(terms[i3-1]+d0+(i3-1));var g3=pick([3,4]);ans=terms[g3];sig={fam:"grow",s0:s0,d0:d0,g:g3};}
  var shown=terms.slice();shown[sig.g]="___";
  var ruleTxt=fam===0?"Each term is the one before it multiplied by \\("+sig.r+"\\).":fam===1?"Each term is the sum of the two terms before it.":"The gaps between terms grow by \\(1\\) each time: \\(+"+sig.d0+"\\), \\(+"+(sig.d0+1)+"\\), \\(+"+(sig.d0+2)+"\\), and so on.";
  var sigOut={fam:sig.fam,g:sig.g,terms:terms};if(sig.a0!==undefined){sigOut.a0=sig.a0;sigOut.r=sig.r;}if(sig.x!==undefined){sigOut.x=sig.x;sigOut.y=sig.y;}if(sig.s0!==undefined){sigOut.s0=sig.s0;sigOut.d0=sig.d0;}
  return numq("Find the missing term in the pattern: \\("+shown.join(", ").replace("___","\\)___\\(")+"\\)",ans,0.011,
    ruleTxt+" The missing term is <b>\\("+ans+"\\)</b>.",sigOut);
});
E("u7-proof-steps",7,["2.8"],3,"var",varset([
  function(){return mcq("A number trick says: pick a number, add 6, double it, subtract 4, divide by 2, then subtract your starting number. (It always ends at \\(4\\) — try starting with \\(5\\).) A student 'proves' the trick with this algebra:<br>Step 1: Start with \\(n\\). Add \\(6\\): \\(n + 6\\).<br>Step 2: Double it: \\(2n + 6\\).<br>Step 3: Subtract \\(4\\): \\(2n + 2\\).<br>Step 4: Divide by \\(2\\), then subtract \\(n\\): \\((n + 1) - n = 1\\) — so the trick always ends at \\(1\\).<br>The conclusion is wrong. In which step does the FIRST error occur?",
    "Step 2 — doubling \\(n + 6\\) gives \\(2n + 12\\), not \\(2n + 6\\): both terms must double",
    ["Step 1 — adding \\(6\\) to \\(n\\) should give \\(6n\\), because the two merge into one term","Step 3 — subtracting \\(4\\) from \\(2n + 6\\) should give \\(2n + 10\\) when the subtraction is done","Step 4 \u2014 the division must be carried out before the subtraction step is reached"],
    "Every later step follows correctly from the line before it \u2014 the damage is done when \\(2(n + 6)\\) is written as \\(2n + 6\\) instead of \\(2n + 12\\). With that fixed, the proof ends at \\((2n + 8) \\div 2 - n = 4\\), exactly as the trick promises.",{});},
  function(){return mcq("A number trick says: pick a number, multiply it by 3, add 9, divide by 3, then subtract your starting number. (It always ends at \\(3\\) — try starting with \\(2\\).) A student 'proves' the trick like this:<br>Step 1: Start with \\(n\\). Multiply by \\(3\\): \\(3n\\).<br>Step 2: Add \\(9\\): \\(3n + 9\\).<br>Step 3: Divide by \\(3\\): \\(n + 9\\).<br>Step 4: Subtract \\(n\\): \\(9\\) — so the trick always ends at \\(9\\).<br>The conclusion is wrong. In which step does the FIRST error occur?",
    "Step 3 — dividing \\(3n + 9\\) by \\(3\\) gives \\(n + 3\\), not \\(n + 9\\): both terms must be divided",
    ["Step 1 — multiplying \\(n\\) by \\(3\\) should give \\(n3\\), because the number belongs after the letter","Step 2 — adding \\(9\\) to \\(3n\\) should give \\(12n\\), because the two combine into a bigger term","Step 4 — subtracting \\(n\\) from \\(n + 9\\) should give \\(9n\\), because the letter stays in the result"],
    "Only the \\(3n\\) was divided; the \\(+9\\) slipped through untouched. Fixed, the proof reads \\((3n + 9) \\div 3 - n = (n + 3) - n = 3\\).",{});},
  function(){return mcq("A number trick says: pick a number, add 4, multiply by 2, subtract 6, then divide by 2. (It always ends one MORE than your starting number — try starting with \\(5\\) and you get \\(6\\).) A student 'proves' the trick like this:<br>Step 1: Start with \\(n\\). Add \\(4\\): \\(n + 4\\).<br>Step 2: Multiply by \\(2\\): \\(2n + 8\\).<br>Step 3: Subtract \\(6\\): \\(2n + 2\\).<br>Step 4: Divide by \\(2\\): \\(2n + 1\\) — so the trick always ends at one more than DOUBLE your number.<br>The conclusion is wrong. In which step does the FIRST error occur?",
    "Step 4 — dividing \\(2n + 2\\) by \\(2\\) gives \\(n + 1\\), not \\(2n + 1\\): both terms must be divided",
    ["Step 1 — adding \\(4\\) to \\(n\\) should give \\(4n\\), because adding merges them into a single product","Step 2 — multiplying \\(n + 4\\) by \\(2\\) should give \\(2n + 4\\), because only the first term doubles","Step 3 — subtracting \\(6\\) from \\(2n + 8\\) should give \\(2n + 14\\), because the constant grows"],
    "Steps \\(1\\) to \\(3\\) are correct. The last division halves only the constant in the student's line: \\((2n + 2) \\div 2 = n + 1\\), which is exactly what the trick promises \u2014 one more than the starting number.",{});},
  function(){return mcq("A number trick says: pick a number, double it, add 10, divide by 2, then subtract 3. (It always ends \\(2\\) above your starting number — try starting with \\(4\\) and you get \\(6\\).) A student 'proves' the trick like this:<br>Step 1: Start with \\(n\\).<br>Step 2: Double it, then add \\(10\\): \\(2(n + 10) = 2n + 20\\).<br>Step 3: Divide by \\(2\\): \\(n + 10\\).<br>Step 4: Subtract \\(3\\): \\(n + 7\\) — so the trick always ends \\(7\\) above the starting number.<br>The conclusion is wrong. In which step does the FIRST error occur?",
    "Step 2 — 'double it, then add \\(10\\)' means \\(2n + 10\\); writing \\(2(n + 10)\\) adds the \\(10\\) BEFORE doubling, which doubles the \\(10\\) as well",
    ["Step 1 — the starting number should have been called \\(x\\), not \\(n\\), because using the wrong letter invalidates every later step in the proof","Step 3 — dividing \\(2n + 20\\) by \\(2\\) should give \\(2n + 10\\), because only the constant term is halved, not the whole expression","Step 4 — subtracting \\(3\\) from \\(n + 10\\) should give \\(n + 13\\), because subtracting a number raises the constant term in the line"],
    "The trick doubles first and adds \\(10\\) second: \\(2n + 10\\). The brackets quietly reversed that order. Done correctly: \\((2n + 10) \\div 2 - 3 = n + 2\\).",{});}
]));
E("u5-ci-level-from-report",5,["8.21"],1,"gen",function(){
  var phrases=[[19,20],[9,10],[18,20],[99,100],[17,20],[4,5],[49,50],[47,50]];
  var ph=pick(phrases),k=ph[0],n=ph[1],level=Math.round(100*k/n);
  var topic=pick(["a later school start time","a new community rink","the mayoral race","a proposed cellphone policy","a new ferry sailing","a four-day school week"]);
  var N=pick([400,800,1200,2000]);
  var cand=[100-level,level-5,level+5,k],distractors=[];
  cand.forEach(function(d){if(d!==level&&d>0&&d<100&&distractors.indexOf(d)<0)distractors.push(d);});
  distractors=distractors.slice(0,3);
  var extras=[level-10,level+10,level-15,level+15];
  while(distractors.length<3){var e=extras.pop();if(e!==undefined&&e!==level&&e>0&&e<100&&distractors.indexOf(e)<0)distractors.push(e);else if(e===undefined)break;}
  return mcq("A news report about "+topic+", based on a survey of "+N+" people, says the results are \u2018accurate \\("+k+"\\) times out of \\("+n+"\\)\u2019. What confidence level is the report claiming?",
    "\\("+level+"\\%\\)",distractors.map(function(d){return "\\("+d+"\\%\\)";}),
    "\\("+k+"\\) times out of \\("+n+"\\) is the fraction \\(\\frac{"+k+"}{"+n+"} = "+level+"\\%\\). A confidence level reported as a fraction of times converts straight to that percent.",{k:k,n:n,level:level});
});
E("u5-ci-shrink",5,["8.18"],2,"gen",function(){
  var d=pick([2,3,4,5,10]);
  var m2=d===10?pick([0.5,1,1.5,2]):pick([1,1.5,2,2.5,3]);
  var base=pick([50,80,100,120,150,200,250,300,400]);
  var grow=Math.random()<0.6,n0,n1,moe0,ans;
  if(grow){n0=base;n1=base*d*d;moe0=m2*d;ans=m2;}
  else{n0=base*d*d;n1=base;moe0=m2;ans=m2*d;}
  return numq("A survey of \\("+n0+"\\) people reports a margin of error of \\(\\pm "+fmt(moe0)+"\\) percentage points. The survey is repeated with \\("+n1+"\\) people, using the same method. What is the new margin of error, in percentage points? (Just the number.)",
    ans,0.011,
    "Margin of error changes like \\(\\frac{1}{\\sqrt{n}}\\). Going from \\("+n0+"\\) to \\("+n1+"\\) people multiplies the sample by \\("+(grow?(d*d):"\\frac{1}{"+(d*d)+"}")+"\\), so the margin of error "+(grow?"divides":"multiplies")+" by \\("+d+"\\): <b>\\("+fmt(moe0)+" "+(grow?"\\div ":"\\times ")+d+" = "+fmt(ans)+"\\)</b> percentage points.",{n0:n0,n1:n1,moe0:moe0,d:d,ans:ans});
});
E("u5-poll-position",5,["8.20","8.22"],3,"var",varset([
  function(){return mcq("An advertisement announces: \u2018In a survey, \\(80\\%\\) of users said our toothpaste gave them a cleaner feeling!\u2019 The fine print says the survey is accurate within \\(\\pm 4\\) percentage points, \\(9\\) times out of \\(10\\). Which statement is the honest summary of the survey?",
    "The survey supports a range of about \\(76\\% \\text{ to } 84\\%\\) \u2014 the ad quotes the single middle number as if it were exact",
    ["At least \\(80\\%\\) for sure \u2014 that is the number the survey found, and the true figure cannot fall below a found figure","The range is \\(72\\% \\text{ to } 88\\%\\), because the margin counts twice on each side, once below the figure and once above it","The ad is fair \u2014 being right \\(9\\) times out of \\(10\\) makes the \\(80\\%\\) nearly exact, so the single figure is fair"],
    "\\(80\\% \\pm 4\\) points gives \\(76\\% \\text{ to } 84\\%\\). The honest figure could sit several points either side of the advertised one.",{});},
  function(){return mcq("Two candidates poll at \\(47\\%\\) and \\(44\\%\\), with a margin of error of \\(\\pm 4\\) points. The first candidate's campaign claims: \u2018We have a clear lead.\u2019 Is the claim supported?",
    "No \u2014 the intervals (\\(43\\% \\text{ to } 51\\%\\) and \\(40\\% \\text{ to } 48\\%\\)) overlap, so the trailing candidate could actually be ahead",
    ["Yes \u2014 \\(47\\) is greater than \\(44\\), so the lead is real, because the larger reported figure truly leads, margin or no margin","Yes \u2014 the margin of error applies only to the trailing candidate, so the leading figure stands exactly as reported","No \u2014 any poll with a margin of error is worthless, because a poll admitting error tells readers nothing reliable"],
    "A lead smaller than the margin of error is not a secure lead. With \\(\\pm 4\\) points, the true support could run the other way.",{});},
  function(){return mcq("A survey at a school of 1,200 students finds \\(68\\% \\pm 5\\) points favour a later start time. The principal announces: \u2018At least \\(800\\) of our students want this change.\u2019 Is the announcement justified by the survey?",
    "Not necessarily \u2014 the interval reaches down to \\(63\\%\\), and \\(63\\%\\) of \\(1{,}200\\) is \\(756\\) students, which is below \\(800\\)",
    ["Yes \u2014 \\(68\\%\\) of \\(1{,}200\\) is \\(816\\) students, comfortably over \\(800\\), and the middle estimate is the count the school should go by","Yes \u2014 a survey of a whole school gives exact figures, because asking within one school leaves no sampling error of any kind to allow for at all","No \u2014 the true figure could be fewer than \\(600\\) students, because five points of error can hide hundreds of students here"],
    "The middle estimate (\\(816\\)) clears \\(800\\), but the interval's low end (\\(756\\)) does not. A claim of 'at least \\(800\\)' needs the whole interval above \\(800\\).",{});},
  function(){return mcq("In a town of 25,000 voters, a poll finds \\(54\\% \\pm 3\\) points support a new arena. A councillor says: \u2018Somewhere between \\(12{,}000\\) and \\(15{,}000\\) voters back this.\u2019 Is she reading the poll correctly?",
    "Yes \u2014 \\(51\\% \\text{ to } 57\\%\\) of \\(25{,}000\\) voters is \\(12{,}750\\) to \\(14{,}250\\) voters, which sits inside the range she quoted",
    ["No \u2014 the range is \\(13{,}500\\) voters, give or take \\(3\\) voters, because the margin counts individual voters","No \u2014 a percentage from a sample can never be applied to a whole population, because percentages describe only the people asked","Yes \u2014 exactly \\(13{,}500\\) voters support the arena, because the middle percentage gives the town's exact count"],
    "Apply both ends of the interval to the population: \\(0.51 \\times 25{,}000 = 12{,}750\\) and \\(0.57 \\times 25{,}000 = 14{,}250\\). Her wider range safely contains the poll's range.",{});}
]));
E("u7-valid-chains",7,["2.3"],2,"var",varset([
  function(){return mcq("Premises: Rex is a Chocolate Lab. All Chocolate Labs are brown. What can be deduced?",
    "Rex is brown",
    ["All brown dogs are Labs","Rex must love swimming","Rex is black"],
    "Rex belongs to the group the second premise covers, so its property follows. The first trap reverses the premise (nothing says brown dogs are Labs), and the last one contradicts it.",{});},
  function(){return mcq("Premises: All band members play an instrument. Everyone who plays an instrument can read music. Leo is in the band. What can be deduced?",
    "Leo can read music",
    ["Leo is the best","All music readers are in the band","Leo plays in an orchestra"],
    "The chain runs Leo \u2192 band \u2192 instrument \u2192 reads music, one premise at a time. The second trap reverses the chain, and the others add facts no premise gives.",{});},
  function(){return mcq("Premises: Everyone who attends spin class regularly gets fitter. Maya attends spin class regularly. Consider two conclusions: I. Maya gets fitter. II. Maya is the fittest person in the class. Which conclusions follow?",
    "I only \u2014 the premises say she gets fitter, but they never compare her with anyone else",
    ["II only \u2014 regular attendance matters most, making her the fittest in the class","Both I and II - the premises also compare her with everyone else in the class","Neither I nor II - regular attendance alone cannot support either conclusion drawn here"],
    "Conclusion I is the premise applied directly. Conclusion II is a superlative the premises cannot support \u2014 getting fitter does not mean fittest.",{});},
  function(){return mcq("Premises: All squares are rectangles. Figure X is a rectangle. What can be deduced about Figure X?",
    "Only that X is a rectangle \u2014 it may or may not be a square",
    ["X must be a square - all rectangles here are squares","X cannot be a square - squares and rectangles never overlap at all","All four of X's sides must be equal, just as they would be for a square"],
    "Every square is a rectangle, but the premise does not run backwards: most rectangles are not squares. Nothing given decides whether X is one of the square ones.",{});},
  function(){return mcq("Take these premises as given, even though one is false in real life: All fish can fly. A trout is a fish. Is the conclusion \u2018a trout can fly\u2019 validly deduced?",
    "Yes \u2014 the conclusion follows from the premises, so the argument is valid; the problem is the false premise, not the logic",
    ["No \u2014 a false premise automatically makes an argument invalid, however carefully the reasoning is built on it","No \u2014 trout live in water, so the conclusion cannot be reached, because real world facts override whatever the premises say","Yes \u2014 because some trout really can fly, and a conclusion that is true in real life makes the whole argument a valid one"],
    "Validity is about the chain, not the facts. If the premises were true, the conclusion would have to be true \u2014 that is a valid argument built on a false premise.",{});}
]));
E("u5-ci-build",5,["8.21"],1,"gen",function(){
  var p=ri(38,72),m=pick([2,2.5,3,3.5,4,4.5,5]);
  var topic=pick(["a new arena","a later school start","the mayoral race","a cellphone ban in class","a new ferry sailing","a four-day school week"]);
  var phrase=pick(["\\(19\\) times out of \\(20\\)","\\(9\\) times out of \\(10\\)","\\(99\\) times out of \\(100\\)"]);
  var lo=p-m,hi=p+m;
  function rng(x,y){return "\\("+fmt(x)+"\\% \\text{ to } "+fmt(y)+"\\%\\)";}
  return mcq("A poll finds \\("+p+"\\%\\) support for "+topic+", with a margin of error of \\(\\pm "+fmt(m)+"\\) percentage points, accurate "+phrase+". What is the confidence interval for the true level of support?",
    rng(lo,hi),[rng(p,hi),rng(lo,p),rng(p-2*m,p+2*m)],
    "The interval runs the margin of error in BOTH directions from the result: \\("+p+"\\% - "+fmt(m)+" = "+fmt(lo)+"\\%\\) and \\("+p+"\\% + "+fmt(m)+" = "+fmt(hi)+"\\%\\).",{p:p,m:m});
});
E("u5-ci-read-report",5,["8.21"],1,"var",varset([
  function(){return mcq("A survey reports a confidence interval of \\(74.9\\% \\text{ to } 79.1\\%\\), accurate \\(9\\) times out of \\(10\\). What are the margin of error and the confidence level?",
    "Margin of error \\(2.1\\) points; confidence level \\(90\\%\\)",
    ["Margin of error \\(4.2\\) points; confidence level \\(90\\%\\)","Margin of error \\(2.1\\) points; confidence level \\(95\\%\\)","Margin of error \\(77\\) points; confidence level \\(90\\%\\)"],
    "The interval is \\(4.2\\) points wide, so the margin of error is half of that: \\(2.1\\) points either side of the centre, \\(77\\%\\). And \\(9\\) times out of \\(10\\) is a \\(90\\%\\) confidence level.",{});},
  function(){return mcq("A fisheries report gives a \\(90\\%\\) confidence interval for the mean weight of cod of \\(3.0\\) kg to \\(3.4\\) kg. What are the reported mean and the margin of error?",
    "Mean \\(3.2\\) kg; margin of error \\(\\pm 0.2\\) kg",
    ["Mean \\(3.0\\) kg; margin of error \\(\\pm 0.4\\) kg","Mean \\(3.4\\) kg; margin of error \\(\\pm 0.2\\) kg","Mean \\(3.2\\) kg; margin of error \\(\\pm 0.4\\) kg"],
    "The mean is the midpoint: \\(\\frac{3.0 + 3.4}{2} = 3.2\\) kg. The margin of error is half the width: \\(\\frac{3.4 - 3.0}{2} = 0.2\\) kg.",{});},
  function(){return mcq("A survey reports a \\(90\\%\\) confidence level, a margin of error of \\(\\pm 3\\) points, and a confidence interval of \\(57\\%\\) to \\(63\\%\\). What percentage did the survey itself find?",
    "\\(60\\%\\) \u2014 the interval is centred on the survey result",
    ["\\(57\\%\\) \u2014 the bottom of the interval is the result itself","\\(63\\%\\) \u2014 the top of the interval is the result itself","\\(90\\%\\) \u2014 the confidence level is the survey result"],
    "The interval is built as result \\(\\pm\\) margin: \\(60\\% - 3 = 57\\%\\) and \\(60\\% + 3 = 63\\%\\). The reported percentage is the centre, \\(60\\%\\).",{});},
  function(){return mcq("A factory reports that \\(85\\%\\) of its batteries pass a 100-hour test, accurate within \\(\\pm 2.5\\) percentage points, \\(19\\) times out of \\(20\\). What is the confidence interval for the true pass rate?",
    "\\(82.5\\% \\text{ to } 87.5\\%\\)",
    ["\\(85\\% \\text{ to } 87.5\\%\\)","\\(82.5\\% \\text{ to } 85\\%\\)","\\(80\\% \\text{ to } 90\\%\\)"],
    "Apply the margin in both directions: \\(85 - 2.5 = 82.5\\) and \\(85 + 2.5 = 87.5\\).",{});}
]));
E("u2-params-characteristics",2,["4.10"],1,"gen",function(){
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
E("u2-graph-description",2,["4.14"],2,"gen",function(){
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
E("u3-equation-from-roots",3,["4.6"],2,"gen",function(){
  var r1=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5]),r2=pick([-5,-4,-3,-2,-1,1,2,3,4,5,6]);
  if(r2===r1||r2===-r1)r2=r2>0?r2+2:r2-2;
  var B=-(r1+r2),C=r1*r2;
  function eqs(bb,cc){return "\\(x^2"+(bb>0?" + "+bb+"x":bb<0?" - "+Math.abs(bb)+"x":"")+(cc>0?" + "+cc:cc<0?" - "+Math.abs(cc):"")+" = 0\\)";}
  var good=eqs(B,C);
  var wrongs=[eqs(-B,C),eqs(B,-C),eqs(-B,-C)].filter(function(x){return x!==good;});
  return mcq("A quadratic equation in the form \\(x^2 + bx + c = 0\\) has roots \\("+r1+"\\) and \\("+r2+"\\). What is the equation?",good,wrongs,
    "Work backwards: \\((x - ("+r1+"))(x - ("+r2+"))\\) expands to \\(x^2 - ("+(r1+r2)+")x + ("+C+")\\), so \\(b = "+B+"\\) and \\(c = "+C+"\\). The coefficient \\(b\\) is the NEGATIVE of the sum of the roots, and \\(c\\) is their product.",{r1:r1,r2:r2,B:B,C:C,exp:good});
});
E("u6-similar-dimension",6,["6.2"],2,"gen",function(){
  var mode=ri(0,1);
  if(mode===0){
    var dims=pick([[3,4],[4,6],[5,8],[6,9],[4,10],[8,12],[6,10],[10,14]]);
    var w=dims[0],h=dims[1],k=pick([2,3,4]),W=w*k,H=h*k,askW=Math.random()<0.5;
    var ans=askW?W:H,known=askW?H:W;
    return numq("A rectangle "+w+" cm by "+h+" cm is enlarged to a similar rectangle. The "+(askW?"longer":"shorter")+" side of the large rectangle is "+known+" cm. What is the "+(askW?"shorter":"longer")+" side of the large rectangle, in cm?",
      ans,0.011,"Similar shapes keep the same ratio. The scale factor is \\("+known+" \\div "+(askW?h:w)+" = "+k+"\\), so the other side is \\("+(askW?w:h)+" \\times "+k+" = \\)<b>\\("+ans+"\\text{ cm}\\)</b>.",{mode:mode,w:w,h:h,k:k,askW:askW,ans:ans});
  }
  var trip=pick([[3,4,5],[5,12,13],[6,8,10],[8,15,17]]);
  var m1=pick([1,2,3]),m2=pick([2,3,4,5]);if(m2===m1)m2=m2+1;
  var j=ri(0,2),l=ri(0,2);if(l===j)l=(j+1)%3;
  var small=trip.map(function(x){return x*m1;}),known=trip[j]*m2,ans=trip[l]*m2;
  function gg2(x,y){while(y){var t=x%y;x=y;y=t;}return x;}
  var gd=gg2(m2,m1),fnum=m2/gd,fden=m1/gd,ftxt=fden===1?""+fnum:"\\frac{"+fnum+"}{"+fden+"}";
  return numq("Two triangles are similar. The smaller has sides \\("+small.join("\\text{ cm}, ")+"\\text{ cm}\\). The larger triangle's side corresponding to the \\("+(trip[j]*m1)+"\\text{ cm}\\) side measures \\("+known+"\\text{ cm}\\). What is the length, in cm, of the larger triangle's side corresponding to the \\("+(trip[l]*m1)+"\\text{ cm}\\) side?",
    ans,0.011,"The scale factor from small to large is \\("+known+" \\div "+(trip[j]*m1)+" = "+ftxt+"\\). Apply it to the \\("+(trip[l]*m1)+"\\text{ cm}\\) side's counterpart: \\("+(trip[l]*m1)+" \\times "+ftxt+" = \\)<b>\\("+ans+"\\text{ cm}\\)</b>.",{mode:mode,trip:trip,m1:m1,m2:m2,j:j,l:l,ans:ans});
});
E("u6-compare-rates",6,["6.16"],2,"gen",function(){
  var ctx=pick([{n:"cyclist",vs:[14,16,18,20,22,24,26,28,30]},{n:"bus",vs:[50,55,60,65,70,75,80,85,90]},{n:"delivery van",vs:[40,45,50,55,60,70,80]},{n:"kayaker",vs:[6,7,8,9,10,11,12]}]);
  var v1=pick(ctx.vs),v2=pick(ctx.vs);if(v2===v1)v2=v1+pick([2,3,4]);
  var t1=ri(2,6),t2=ri(2,6),d1=v1*t1,d2=v2*t2;
  var ans=Math.abs(v1-v2);
  return numq("Two "+ctx.n+"s travel on the same route. The first covers "+d1+" km in "+t1+" hours; the second covers "+d2+" km in "+t2+" hours. How many km/h faster is the faster "+ctx.n+"? (Just the number.)",
    ans,0.011,"Rates first: \\("+d1+" \\div "+t1+" = "+v1+"\\text{ km/h}\\) and \\("+d2+" \\div "+t2+" = "+v2+"\\text{ km/h}\\). The difference is \\("+Math.max(v1,v2)+" - "+Math.min(v1,v2)+" = \\)<b>\\("+ans+"\\text{ km/h}\\)</b>.",{v1:v1,v2:v2,ans:ans});
});
E("u6-rate-isolate",6,["6.23"],1,"gen",function(){
  var mode=ri(0,2);
  if(mode===0){
    var v=pick([25,40,50,60,75,80,90,100]),t=pick([1.5,2,2.5,3,4,5]),d=v*t;
    return numq("A truck drives at a steady "+v+" km/h and covers "+fmt(d)+" km. How many hours does the trip take? (Just the number.)",
      t,0.011,"Isolate the time in \\(d = vt\\): \\(t = \\frac{d}{v} = \\frac{"+fmt(d)+"}{"+v+"} = \\)<b>\\("+fmt(t)+"\\text{ hours}\\)</b>.",{mode:mode,v:v,d:d,ans:t});
  }
  if(mode===1){
    var r=pick([12,15,20,24,30,36,40]),t2=ri(3,9),A=r*t2;
    return numq("A printer produces "+A+" pages in "+t2+" minutes at a steady rate. What is its rate, in pages per minute? (Just the number.)",
      r,0.011,"Rate \\(= \\frac{\\text{amount}}{\\text{time}} = \\frac{"+A+"}{"+t2+"} = \\)<b>\\("+r+"\\text{ pages per minute}\\)</b>.",{mode:mode,A:A,t:t2,ans:r});
  }
  var r2=pick([15,20,25,40,60,80]),t3=ri(4,12),A2=r2*t3;
  return numq("A pump moves water at "+r2+" litres per minute. How many litres does it move in "+t3+" minutes? (Just the number.)",
    A2,0.011,"Amount \\(= \\text{rate} \\times \\text{time} = "+r2+" \\times "+t3+" = \\)<b>\\("+A2+"\\text{ litres}\\)</b>.",{mode:mode,r:r2,t:t3,ans:A2});
});
E("u8-angle-sum-rule",8,["5.5"],1,"var",varset([
  function(){return mcq("The interior angles of a triangle sum to \\(180^\\circ\\), of a quadrilateral to \\(360^\\circ\\), and of a pentagon to \\(540^\\circ\\). Following this pattern, what is the sum of the interior angles of a polygon with \\(n\\) sides?",
    "\\((n - 2) \\times 180^\\circ\\)",
    ["\\(n \\times 180^\\circ\\)","\\((n - 1) \\times 180^\\circ\\)","\\((n + 2) \\times 180^\\circ\\)"],
    "Each added side adds \\(180^\\circ\\), but the count starts at \\(180^\\circ\\) for \\(3\\) sides: the multiplier is always \\(2\\) less than the number of sides, \\((n - 2)\\). Check: pentagon, \\((5 - 2) \\times 180^\\circ = 540^\\circ\\).",{});},
  function(){var q = mcq("Using the rule for the sum of the interior angles, what is the sum for a polygon with 7 sides?",
    "\\(900^\\circ\\)",["\\(1260^\\circ\\)","\\(1080^\\circ\\)","\\(1620^\\circ\\)"],
    "\\((7 - 2) \\times 180^\\circ = 5 \\times 180^\\circ = 900^\\circ\\).",{});q.figure=polySVG(7, false);return q;},
  function(){var q = mcq("Using the rule for the sum of the interior angles, what is the sum for a polygon with 9 sides?",
    "\\(1260^\\circ\\)",["\\(1620^\\circ\\)","\\(1440^\\circ\\)","\\(1980^\\circ\\)"],
    "\\((9 - 2) \\times 180^\\circ = 7 \\times 180^\\circ = 1260^\\circ\\).",{});q.figure=polySVG(9, false);return q;},
  function(){var q = mcq("Using the rule for the sum of the interior angles, what is the sum for a polygon with 11 sides?",
    "\\(1620^\\circ\\)",["\\(1980^\\circ\\)","\\(1800^\\circ\\)","\\(2340^\\circ\\)"],
    "\\((11 - 2) \\times 180^\\circ = 9 \\times 180^\\circ = 1620^\\circ\\).",{});q.figure=polySVG(11, false);return q;},
  function(){var q = mcq("Using the rule for the sum of the interior angles, what is the sum for a polygon with 12 sides?",
    "\\(1800^\\circ\\)",["\\(2160^\\circ\\)","\\(1980^\\circ\\)","\\(2520^\\circ\\)"],
    "\\((12 - 2) \\times 180^\\circ = 10 \\times 180^\\circ = 1800^\\circ\\).",{});q.figure=polySVG(12, false);return q;},
  function(){var q = mcq("Using the rule for the sum of the interior angles, what is the sum for a polygon with 15 sides?",
    "\\(2340^\\circ\\)",["\\(2700^\\circ\\)","\\(2520^\\circ\\)","\\(3060^\\circ\\)"],
    "\\((15 - 2) \\times 180^\\circ = 13 \\times 180^\\circ = 2340^\\circ\\).",{});q.figure=polySVG(15, false);return q;},
  function(){var q = mcq("Using the rule for the sum of the interior angles, what is the sum for a polygon with 20 sides?",
    "\\(3240^\\circ\\)",["\\(3600^\\circ\\)","\\(3420^\\circ\\)","\\(3960^\\circ\\)"],
    "\\((20 - 2) \\times 180^\\circ = 18 \\times 180^\\circ = 3240^\\circ\\).",{});q.figure=polySVG(20, false);return q;}
]));

/* ============ Prior knowledge tranche (November 15, 2026) ============
   Cluster 8 (Geometry prerequisites): two borrowed equation entries
   and seven authored angle and polygon items.
   Provenance (host id: source, verified by draw sweep):
   - u8-pk-solve-two-step: copied from math-9 u5-solve-two-step, indicator 8.18.
   - u8-pk-word-two-step: copied from math-9 u5-word-two-step, indicator 8.22.
   - u8-pk-angle-measure: authored for the Math 2201 PK tranche, placement unevidenced.
   - u8-pk-comp-supp: authored for the Math 2201 PK tranche, placement unevidenced.
   - u8-pk-triangle-sum: authored for the Math 2201 PK tranche, placement unevidenced.
   - u8-pk-polygon-sum: authored for the Math 2201 PK tranche, placement unevidenced.
   - u8-pk-transversal-pairs: authored for the Math 2201 PK tranche, placement unevidenced.
   - u8-pk-transversal-measure: authored for the Math 2201 PK tranche, placement unevidenced.
   - u8-pk-parallel-decision: authored for the Math 2201 PK tranche, placement unevidenced.
   The authored seven are written to the prior knowledge map's skill
   statements for this cluster: no indicator in Math 1201 or Math 9
   on file names angle relationships, so there is no feeder
   placement to borrow against and none is claimed. Diagrammed items
   draw their figures from the draw's own values through the shell's
   diagram helpers, and no figure states the fact the item assesses.
   Math 2201 indicator 2.7 is taught inside Unit 8 of the course
   build, but the pools key on the registry's unitInd, which places
   2.7 in Unit 7; no item moves units over this. Indicator tags are
   support tags, not assessed targets: assessed targets are in
   pkSrc, the full dependent list in pkFor. */
E("u8-pk-solve-two-step", 8, ["5.8"], 2, "gen", function () {
  var form = ri(0, 2);
  if (form === 0) {
    var a = ri(2, 9), x0 = ri(-9, 9); if (x0 === 0) x0 = 4;
    var b = ri(-12, 12); if (b === 0) b = 5;
    var c = a * x0 + b;
    var sol = "Undo the constant first, then undo the multiplication: \\[ \\begin{aligned} " + u5lin(a, b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(c - b) + " \\\\ x &= " + fmt(x0) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x0) + "\\)</b>.";
    return numq("Solve the equation \\(" + u5lin(a, b) + " = " + fmt(c) + "\\). What is the value of \\(x\\)?", x0, 0.01, sol, { mode: "ax+b", a: a, b: b, c: c });
  }
  if (form === 1) {
    var a2 = ri(2, 6), k = ri(-6, 6); if (k === 0) k = 3;
    var x1 = a2 * k, b2 = ri(-9, 9); if (b2 === 0) b2 = -4;
    var c2 = k + b2;
    var sol2 = "Undo the constant first, then undo the division: \\[ \\begin{aligned} " + FR("x", a2) + (b2 >= 0 ? "+" + fmt(b2) : "-" + fmt(-b2)) + " &= " + fmt(c2) + " \\\\ " + FR("x", a2) + " &= " + fmt(k) + " \\\\ x &= " + fmt(x1) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x1) + "\\)</b>.";
    return numq("Solve the equation \\(" + FR("x", a2) + (b2 >= 0 ? " + " + fmt(b2) : " - " + fmt(-b2)) + " = " + fmt(c2) + "\\). What is the value of \\(x\\)?", x1, 0.01, sol2, { mode: "x/a+b", a: a2, b: b2, c: c2 });
  }
  var x2 = ri(-8, 8); if (x2 === 0) x2 = 5;
  var a3 = ri(3, 9), c3 = ri(2, a3 - 1), b3 = (a3 - c3) * x2;
  var sol3 = "Collect the x terms on one side first: \\[ \\begin{aligned} " + fmt(a3) + "x &= " + u5lin(c3, b3) + " \\\\ " + fmt(a3 - c3) + "x &= " + fmt(b3) + " \\\\ x &= " + fmt(x2) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x2) + "\\)</b>.";
  return numq("Solve the equation \\(" + fmt(a3) + "x = " + u5lin(c3, b3) + "\\). What is the value of \\(x\\)?", x2, 0.01, sol3, { mode: "ax=cx+b", a: a3, b: b3, c: c3 });
}, ["Undo the operations in reverse order: deal with the constant term before the term attached to x.", "First isolate the x term on one side, using the same operation on both sides."]);
E("u8-pk-word-two-step", 8, ["5.8"], 2, "gen", function () {
  var form = ri(0, 2);
  if (form === 0) {
    var a = ri(3, 9), n = ri(3, 14), b = ri(2, 12), c = a * n + b;
    var sol = "Let n be the number of tickets. The cost gives the equation and its solution: \\[ \\begin{aligned} " + fmt(a) + "n+" + fmt(b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "n &= " + fmt(c - b) + " \\\\ n &= " + fmt(n) + " \\end{aligned} \\] So the group bought <b>" + fmt(n) + " tickets</b>.";
    return numq("A group buys tickets that cost $" + fmt(a) + " each, plus a $" + fmt(b) + " booking fee paid once. The total cost is $" + fmt(c) + ". How many tickets did the group buy?", n, 0.01, sol, { mode: "word-tickets", a: a, b: b, c: c });
  }
  if (form === 1) {
    var L = ri(4, 15), w = ri(3, 14), P = 2 * w + 2 * L;
    var sol2 = "Let w be the width. The perimeter gives the equation and its solution: \\[ \\begin{aligned} 2w+" + fmt(2 * L) + " &= " + fmt(P) + " \\\\ 2w &= " + fmt(P - 2 * L) + " \\\\ w &= " + fmt(w) + " \\end{aligned} \\] So the width is <b>" + fmt(w) + " cm</b>.";
    return numq("A rectangle has length " + fmt(L) + " cm and perimeter " + fmt(P) + " cm. What is its width, in centimetres?", w, 0.01, sol2, { mode: "word-perimeter", a: L, b: P });
  }
  var a3 = ri(2, 8), n3 = ri(4, 16), b3 = ri(3, 15), c3 = a3 * n3 + b3;
  var sol3 = "Let n be the number of notebooks. The cost gives the equation and its solution: \\[ \\begin{aligned} " + fmt(a3) + "n+" + fmt(b3) + " &= " + fmt(c3) + " \\\\ " + fmt(a3) + "n &= " + fmt(c3 - b3) + " \\\\ n &= " + fmt(n3) + " \\end{aligned} \\] So Sara bought <b>" + fmt(n3) + " notebooks</b>.";
  return numq("Sara buys notebooks that cost $" + fmt(a3) + " each, plus one pen for $" + fmt(b3) + ". She spends $" + fmt(c3) + " in total. How many notebooks did she buy?", n3, 0.01, sol3, { mode: "word-notebooks", a: a3, b: b3, c: c3 });
}, ["Write an equation for the story first: a rate times the unknown, plus a fixed amount, equals the total.", "First decide what the variable counts, then build the equation from the story."]);
E("u8-pk-angle-measure", 8, ["5.1"], 1, "gen", function () {
  var kind = pick(["acute", "right", "obtuse"]);
  var v = kind === "acute" ? ri(25, 80) : kind === "right" ? 90 : ri(100, 165);
  var rad = v * Math.PI / 180, vx = 80, vy = 175, len = 165;
  var ex = vx + len * Math.cos(rad), ey = vy - len * Math.sin(rad);
  var lx = vx + 88 * Math.cos(rad / 2), ly = vy - 88 * Math.sin(rad / 2);
  var fig = '<svg viewBox="0 0 330 215" width="330" height="215" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Angle diagram">'
    + '<line x1="40" y1="' + vy + '" x2="300" y2="' + vy + '" stroke="' + FIG_INK + '" stroke-width="2"/>'
    + '<line x1="' + vx + '" y1="' + vy + '" x2="' + fmt(ex, 1) + '" y2="' + fmt(ey, 1) + '" stroke="' + FIG_INK + '" stroke-width="2"/>'
    + '<path d="M ' + fmt(vx + 46, 1) + ' ' + vy + ' A 46 46 0 0 0 ' + fmt(vx + 46 * Math.cos(rad), 1) + ' ' + fmt(vy - 46 * Math.sin(rad), 1) + '" fill="none" stroke="' + FIG_INK + '" stroke-width="1.6"/>'
    + _txt(lx, ly, v + "°", 13, false) + '</svg>';
  var key = kind === "acute" ? "An acute angle" : kind === "right" ? "A right angle" : "An obtuse angle";
  var others = ["An acute angle", "A right angle", "An obtuse angle", "A straight angle"].filter(function (s) { return s !== key; });
  var q = mcq("An angle is marked in the diagram. Read its measure from the diagram. How is this angle classified?",
    key, others,
    "The diagram labels the angle as " + v + " degrees. An angle less than 90 degrees is acute, an angle of exactly 90 degrees is right, and an angle between 90 and 180 degrees is obtuse. Since " + v + " degrees falls in the " + (kind === "acute" ? "less than 90" : kind === "right" ? "exactly 90" : "between 90 and 180") + " range, it is <b>" + key.toLowerCase() + "</b>.",
    { mode: "pk-angle-classify", v: v });
  q.figure = fig;
  return q;
});
E("u8-pk-comp-supp", 8, ["5.1"], 1, "gen", function () {
  var mode = ri(1, 2);
  if (mode === 1) {
    var a = ri(15, 75), ans = 90 - a;
    return numq("Angle A measures " + a + " degrees. Angle B is complementary to angle A. What is the measure of angle B, in degrees?",
      ans, 0.011,
      "Complementary angles add to 90 degrees. So angle B = 90 - " + a + " = <b>" + ans + " degrees</b>.",
      { mode: "pk-comp", a: a });
  }
  var b = ri(25, 155), ans2 = 180 - b;
  return numq("Angle A measures " + b + " degrees. Angle B is supplementary to angle A. What is the measure of angle B, in degrees?",
    ans2, 0.011,
    "Supplementary angles add to 180 degrees. So angle B = 180 - " + b + " = <b>" + ans2 + " degrees</b>.",
    { mode: "pk-supp", a: b });
});
E("u8-pk-triangle-sum", 8, ["5.3"], 1, "gen", function () {
  var p = ri(25, 85), q = ri(25, 85), tries = 0;
  while (p + q > 160 && tries < 60) { p = ri(25, 85); q = ri(25, 85); tries++; }
  var ans = 180 - p - q;
  return numq("Two angles of a triangle measure " + p + " degrees and " + q + " degrees. What is the measure of the third angle, in degrees?",
    ans, 0.011,
    "The angles of a triangle add to 180 degrees. The third angle is 180 - " + p + " - " + q + " = <b>" + ans + " degrees</b>.",
    { mode: "pk-triangle-sum", p: p, q: q });
});
E("u8-pk-polygon-sum", 8, ["5.5"], 2, "gen", function () {
  var names = { 5: "pentagon", 6: "hexagon", 7: "heptagon", 8: "octagon", 9: "nonagon", 10: "decagon" };
  var mode = ri(1, 2);
  if (mode === 1) {
    var n = ri(5, 10), sum = (n - 2) * 180;
    var q1 = numq("What is the sum of the interior angles of a " + names[n] + ", in degrees?",
      sum, 0.011,
      "A polygon with n sides splits into n - 2 triangles from one vertex, and each triangle contributes 180 degrees. For a " + names[n] + ", n = " + n + ", so the sum is (" + n + " - 2) x 180 = <b>" + sum + " degrees</b>.",
      { mode: "pk-polygon-sum", n: n });
    q1.figure = polySVG(n, false);
    return q1;
  }
  var n2 = pick([5, 6, 8, 9, 10]), one = (n2 - 2) * 180 / n2;
  var q2 = numq("A regular " + names[n2] + " has all interior angles equal. What is the measure of one interior angle, in degrees?",
    one, 0.011,
    "The interior angles of a " + names[n2] + " sum to (" + n2 + " - 2) x 180 = " + ((n2 - 2) * 180) + " degrees. A regular polygon shares this sum equally among its " + n2 + " angles, so one angle is " + ((n2 - 2) * 180) + " / " + n2 + " = <b>" + one + " degrees</b>.",
    { mode: "pk-polygon-one", n: n2 });
  q2.figure = polySVG(n2, true);
  return q2;
});
E("u8-pk-transversal-measure", 8, ["5.8"], 2, "gen", function () {
  var rels = [
    ["TR", "BL", "alt"], ["TL", "BR", "alt"],
    ["TR", "BR", "same"], ["TL", "BL", "same"],
    ["TR", "TL", "lin"], ["BR", "BL", "lin"]];
  var pr = pick(rels);
  var g = ri(35, 145); if (g === 90) g = 95;
  var ans = pr[2] === "alt" ? g : 180 - g;
  var why = pr[2] === "alt"
    ? "The marked angle and the unknown angle are alternate interior angles, and alternate interior angles formed by parallel lines are equal."
    : pr[2] === "same"
      ? "The marked angle and the unknown angle are same-side interior angles, and same-side interior angles formed by parallel lines are supplementary."
      : "The marked angle and the unknown angle form a linear pair on a straight line, and angles on a straight line are supplementary.";
  var calc = pr[2] === "alt" ? "So the unknown angle is also <b>" + ans + " degrees</b>." : "So the unknown angle is 180 - " + g + " = <b>" + ans + " degrees</b>.";
  var q = numq("Two parallel lines are cut by a transversal. One angle is marked " + g + " degrees and another is marked with a question mark. What is the measure of the unknown angle, in degrees?",
    ans, 0.011,
    why + " " + calc,
    { mode: "pk-transversal-measure", rel: pr[2], g: g });
  q.figure = transversalSVG(pr[0], g + "°", pr[1], "?");
  return q;
});
E("u8-pk-parallel-decision", 8, ["5.9"], 2, "gen", function () {
  var mode = ri(1, 2), parallel = ri(0, 1) === 1;
  var g = ri(40, 140); if (g === 90) g = 100;
  if (mode === 1) {
    var h = parallel ? 180 - g : Math.min(165, Math.max(25, 180 - g + pick([-18, -12, 12, 18])));
    var keyA = parallel
      ? "Yes, because the same-side interior angles add to 180 degrees"
      : "No, because the same-side interior angles do not add to 180 degrees";
    var disA = parallel
      ? ["Yes, because the two marked angles are equal to each other",
         "No, because the same-side interior angles do not add to 180 degrees",
         "No, because parallel lines never form supplementary angles"]
      : ["Yes, because the same-side interior angles in the diagram add to 180 degrees",
         "Yes, because the two marked angles are fairly close in size to each other",
         "No, because the two marked angles are not equal to each other"];
    var qA = mcq("Two lines are cut by a transversal, and the two marked angles are same-side interior angles. Are the two lines parallel?",
      keyA, disA,
      "Same-side interior angles are supplementary exactly when the lines are parallel. Here the marked angles are " + g + " degrees and " + h + " degrees, and " + g + " + " + h + " = " + (g + h) + " degrees. " + (parallel ? "That is 180 degrees, so <b>yes, the lines are parallel</b>." : "That is not 180 degrees, so <b>no, the lines are not parallel</b>."),
      { mode: "pk-parallel-sameside", parallel: parallel });
    qA.figure = transversalSVG("TR", g + "°", "BR", h + "°");
    return qA;
  }
  var h2 = parallel ? g : Math.min(160, Math.max(30, g + pick([-20, -10, 10, 20])));
  var keyB = parallel
    ? "Yes, because the alternate interior angles are equal"
    : "No, because the alternate interior angles are not equal";
  var disB = parallel
    ? ["Yes, because the two marked angles add to 180 degrees",
       "No, because the alternate interior angles are not equal",
       "No, because parallel lines never form equal angles"]
    : ["Yes, because the alternate interior angles are equal",
       "Yes, because the two marked angles are fairly close in size",
       "No, because the two marked angles do not add to 180 degrees"];
  var qB = mcq("Two lines are cut by a transversal, and the two marked angles are alternate interior angles. Are the two lines parallel?",
    keyB, disB,
    "Alternate interior angles are equal exactly when the lines are parallel. Here the marked angles are " + g + " degrees and " + h2 + " degrees. " + (parallel ? "They are equal, so <b>yes, the lines are parallel</b>." : "They are not equal, so <b>no, the lines are not parallel</b>."),
    { mode: "pk-parallel-alt", parallel: parallel });
  qB.figure = transversalSVG("TR", g + "°", "BL", h2 + "°");
  return qB;
});
E("u8-pk-transversal-pairs", 8, ["5.1"], 1, "var", varset([
  function () {
    var q = mcq("Two parallel lines are cut by a transversal, and two angles are shaded. What is the relationship between the two shaded angles?",
      "Alternate interior angles", ["Same-side interior angles", "A linear pair", "Vertical angles"],
      "The two shaded angles are inside the strip between the parallel lines, on opposite sides of the transversal. The relationship is <b>alternate interior angles</b>.",
      { mode: "pk-transversal-pair", pair: "TR-BL" });
    q.figure = transversalSVG("TR", "", "BL", "");
    return q;
  },
  function () {
    var q = mcq("Two parallel lines are cut by a transversal, and two angles are shaded. What is the relationship between the two shaded angles?",
      "Alternate interior angles", ["Same-side interior angles", "A linear pair", "Vertical angles"],
      "The two shaded angles are inside the strip between the parallel lines, on opposite sides of the transversal. The relationship is <b>alternate interior angles</b>.",
      { mode: "pk-transversal-pair", pair: "TL-BR" });
    q.figure = transversalSVG("TL", "", "BR", "");
    return q;
  },
  function () {
    var q = mcq("Two parallel lines are cut by a transversal, and two angles are shaded. What is the relationship between the two shaded angles?",
      "Same-side interior angles", ["Alternate interior angles", "A linear pair", "Vertical angles"],
      "The two shaded angles are inside the strip between the parallel lines, on the same side of the transversal. The relationship is <b>same-side interior angles</b>.",
      { mode: "pk-transversal-pair", pair: "TR-BR" });
    q.figure = transversalSVG("TR", "", "BR", "");
    return q;
  },
  function () {
    var q = mcq("Two parallel lines are cut by a transversal, and two angles are shaded. What is the relationship between the two shaded angles?",
      "Same-side interior angles", ["Alternate interior angles", "A linear pair", "Vertical angles"],
      "The two shaded angles are inside the strip between the parallel lines, on the same side of the transversal. The relationship is <b>same-side interior angles</b>.",
      { mode: "pk-transversal-pair", pair: "TL-BL" });
    q.figure = transversalSVG("TL", "", "BL", "");
    return q;
  },
  function () {
    var q = mcq("Two parallel lines are cut by a transversal, and two angles are shaded. What is the relationship between the two shaded angles?",
      "A linear pair", ["Alternate interior angles", "Same-side interior angles", "Vertical angles"],
      "The two shaded angles sit side by side on the same straight line at one intersection. The relationship is <b>a linear pair</b>.",
      { mode: "pk-transversal-pair", pair: "TR-TL" });
    q.figure = transversalSVG("TR", "", "TL", "");
    return q;
  },
  function () {
    var q = mcq("Two parallel lines are cut by a transversal, and two angles are shaded. What is the relationship between the two shaded angles?",
      "A linear pair", ["Alternate interior angles", "Same-side interior angles", "Vertical angles"],
      "The two shaded angles sit side by side on the same straight line at one intersection. The relationship is <b>a linear pair</b>.",
      { mode: "pk-transversal-pair", pair: "BR-BL" });
    q.figure = transversalSVG("BR", "", "BL", "");
    return q;
  }
]));
/* PK tranche pass for Unit 8. pkFor is Cluster 8's dependent
   indicator list from the prior knowledge map. */
var PKT_U8_FOR=["5.1","5.3","5.5","5.6","5.8","5.9","5.11"];
var PKT_U8={
 "u8-pk-solve-two-step":{src:"math-9:8.18",group:"equation-solving"},
 "u8-pk-word-two-step":{src:"math-9:8.22",group:"equation-solving"},
 "u8-pk-angle-measure":{src:"authored:angle-measure, placement unevidenced",group:"angle-measure"},
 "u8-pk-comp-supp":{src:"authored:comp-supp, placement unevidenced",group:"angle-measure"},
 "u8-pk-triangle-sum":{src:"authored:triangle-sum, placement unevidenced",group:"triangle-angles"},
 "u8-pk-polygon-sum":{src:"authored:polygon-sum, placement unevidenced",group:"polygon-angles"},
 "u8-pk-transversal-pairs":{src:"authored:transversal-pairs, placement unevidenced",group:"transversal-pairs"},
 "u8-pk-transversal-measure":{src:"authored:transversal-measure, placement unevidenced",group:"transversal-use"},
 "u8-pk-parallel-decision":{src:"authored:parallel-decision, placement unevidenced",group:"transversal-use"}};
BANK.forEach(function(e){var t=PKT_U8[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U8_FOR.slice();e.pkGroup=t.group;}});

/* ----- bank-fix.js ----- */
// Math 2201 Tranche 3 to 8 additions (Units 1 to 4 depth, the QE RHS review, and the October 2026 finish-line passes) question bank
// Cut verbatim from the standalone app's served file
// (math-2201-review/Math2201Review.html, lines 2142 to
// 3852, the Tranche 3 to 8 blocks at the head of its main
// script), followed by its selection-engine note and the
// postMid flagging (lines 3860 to 3865), which runs last
// there too. The mid-course cap those flags serve is a
// shell behaviour driven by the course configuration
// (presets.mid.cap in courses.js).
// CRMARKS: u1-sine-two-step=2
// CRMARKS: u1-cosine-context=2
// CRMARKS: u1-two-station-height=4
// CRMARKS: u2-axis-two-points=1
// CRMARKS: u2-standard-from-factored=2
// CRMARKS: u2-revenue-model=2
// CRMARKS: u2-count-intercepts=1
// CRMARKS: u2-max-area=3
// CRMARKS: u3-zeros-factored=1
// CRMARKS: u3-factor-monic=2
// CRMARKS: u3-solve-square=1
// CRMARKS: u3-gcf-solve=2
// CRMARKS: u3-setup-equation=1
// CRMARKS: u3-border=3
// CRMARKS: u3-exact-roots=2
// CRMARKS: u4-variable-mixed=2
// CRMARKS: u4-multiply-mixed=2
// CRMARKS: u4-equation-restriction=1
// CRMARKS: u4-verify-root=1
// CRMARKS: u4-model-equation=2
// CRMARKS: u4-model-evaluate=1
// CRMARKS: u4-cube-mixed=2
// CRMARKS: u4-cube-equation=2
// CRMARKS: u4-combine-multi=2
// CRMARKS: u4-binomial-square=2
// CRMARKS: u4-triangle-perimeter=2
// CRMARKS: u4-width-radical=2
// CRMARKS: u3-equation-fraction-roots=2
// CRMARKS: u3-solve-height=2
// CRMARKS: u3-model-number=2
// CRMARKS: u8-congruence-deduce=1
// CRMARKS: u8-multi-angle=2
// CRMARKS: u8-triangle-algebra=2
// CRMARKS: u8-polygon-inverse=1
// CRMARKS: u1-smallest-angle=2
// CRMARKS: u1-angle-between-paths=4
// CRMARKS: u1-guy-wire=3
// CRMARKS: u6-pack-cost=2
// CRMARKS: u6-rate-difference=2
// CRMARKS: u6-poster-dimensions=2
// CRMARKS: u6-tile-cost=3
// CRMARKS: u7-race-order=2
// CRMARKS: u7-everyday-counterexample=2
// CRMARKS: u7-pattern-equation=2
// CRMARKS: u7-counterexample-claims=2
// CRMARKS: u2-y-intercept=1
// CRMARKS: u2-mirror-point=1
// CRMARKS: u2-vertex-time=1
// CRMARKS: u2-fence-max=3
// CRMARKS: u3-roots-sum-product=1
// CRMARKS: u3-factor-nonmonic=2
// CRMARKS: u3-standard-coeffs=1
// CRMARKS: u3-two-numbers=3
// CRMARKS: u4-evaluate-mixed=1
// CRMARKS: u4-divide-radicals=2
// CRMARKS: u4-rationalize-coefficient=2
// CRMARKS: u4-conjugate-area=2
// CRMARKS: u8-diagonals=1
// CRMARKS: u8-isosceles-angles=2
// CRMARKS: u8-corresponding-algebra=2
// CRMARKS: u8-parallel-x-value=3
// CRMARKS: u8-isosceles-exterior=2
// CRMARKS: u8-regular-sides-from-angle=3
// CRMARKS: u8-exterior-algebra=3
// CRMARKS: u2-vertex-form-eval=1
// CRMARKS: u2-factored-y-intercept=1
// CRMARKS: u2-max-height=2
// CRMARKS: u3-factor-difference=2
// CRMARKS: u3-root-difference=3
// CRMARKS: u4-entire-cube=1
// CRMARKS: u4-product-simplify=2
// CRMARKS: u4-add-unlike=2
// CRMARKS: u4-diagonal-radical=2
// CRMARKS: u8-cointerior-algebra=2
// CRMARKS: u8-congruence-perimeter=2
// CRMARKS: u8-congruent-perimeter=1
// CRMARKS: u8-angle-chase=2
// CRMARKS: u1-ambiguous-count=3
// CRMARKS: u1-median-length=4
// CRMARKS: u2-evaluate-f=1
// CRMARKS: u2-vertex-shift=1
// CRMARKS: u2-factored-max-height=2
// CRMARKS: u3-formula-exact-roots=2
// CRMARKS: u3-squares-area=3
// CRMARKS: u3-number-pair=2
// CRMARKS: u4-compare-radicals=1
// CRMARKS: u4-difference-simplify=2
// CRMARKS: u4-reciprocal-sum=3
// CRMARKS: u6-map-distance=2
// CRMARKS: u7-proof-repair=3
// CRMARKS: u7-smallest-counterexample=2
// CRMARKS: u7-counterexample-name=2
// CRMARKS: u7-triangular-total=3
// CRMARKS: u7-chain-conclusion=3
// CRMARKS: u7-false-pattern=2
// CRMARKS: u7-figure-pattern=1
/* ============ Tranche 3 (Oct 26): Units 1-4 depth ============
   Existing tests and question banks, including the Holy Spirit sample
   tests and reviews and the NL Schools topic lists (see
   harvest/newsites-inventory.md), were reviewed only to gauge the
   expected depth and range of treatment; every item was written new
   with new numbers and contexts, nothing copied verbatim.
   Also repairs two indicator tags from the original build: u4-order was
   tagged 1.3 but it orders radicals (1.4), and u4-multiply was tagged
   1.4 but it multiplies radicals (an operation, 1.6). */

/* --- Unit 1: Acute Triangle Trigonometry --- */
E("u1-sine-side-mc",1,["7.2"],2,"gen",function(){
  var A=0,B=0,a=0,key=0,d1=0,d2=0,d3=0,tries=0,ok=false;
  while(!ok&&tries<400){tries++;
    A=ri(30,60);B=ri(40,80);a=ri(8,24);
    if(A+B<=95||A+B>=168)continue;
    var C=180-A-B;if(C<=10||C>=90)continue;
    var sA=Math.sin(A*Math.PI/180),sB=Math.sin(B*Math.PI/180),sC=Math.sin(C*Math.PI/180);
    key=a*sB/sA;d1=a*sA/sB;d2=a*sB/sC;d3=a*sC/sA;
    var os=[fmt(key,1),fmt(d1,1),fmt(d2,1),fmt(d3,1)];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  var b=key,cval=a*Math.sin((180-A-B)*Math.PI/180)/Math.sin(A*Math.PI/180);
  var q=mcq("In \\(\\triangle ABC\\), \\(\\angle A = "+A+"^\\circ\\), \\(\\angle B = "+B+"^\\circ\\), and side \\(a = "+a+"\\text{ cm}\\) (the side opposite \\(\\angle A\\)). What is the length of side \\(b\\), in cm?",
    fmt(key,1),[fmt(d1,1),fmt(d2,1),fmt(d3,1)],
    "Use the sine law and pair each side with its opposite angle: \\(\\frac{b}{\\sin "+B+"^\\circ} = \\frac{"+a+"}{\\sin "+A+"^\\circ}\\). So \\(b = \\frac{"+a+" \\sin "+B+"^\\circ}{\\sin "+A+"^\\circ} \\approx \\)<b>\\("+fmt(key,1)+"\\text{ cm}\\)</b>.",
    {A:A,B:B,a:a});
  q.figure=triSVG(a,b,cval,{L:["A","B","C"],ang:[A+"°",B+"°",null],side:[a+" cm","?",null]});
  return q;
});
E("u1-cosine-angle-mc",1,["7.2"],2,"gen",function(){
  var Atar=0,b=0,c=0,a=0,Aang=0,Bang=0,Cang=0,tries=0,ok=false;
  while(!ok&&tries<400){tries++;
    Atar=pick([40,45,50,55,60,65,70,75,80]);b=ri(6,14);c=ri(6,14);
    a=Math.round(Math.sqrt(b*b+c*c-2*b*c*Math.cos(Atar*Math.PI/180))*10)/10;
    var cosA=(b*b+c*c-a*a)/(2*b*c);if(Math.abs(cosA)>=1)continue;
    Aang=Math.acos(cosA)*180/Math.PI;
    var cosB=(a*a+c*c-b*b)/(2*a*c);if(Math.abs(cosB)>=1)continue;
    Bang=Math.acos(cosB)*180/Math.PI;Cang=180-Aang-Bang;
    if(Cang<=5||Cang>=90)continue;
    var os=[""+Math.round(Aang),""+Math.round(Bang),""+Math.round(Cang),""+Math.round(180-Aang)];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  var q=mcq("A triangle has sides "+fmt(a,1)+" cm, "+b+" cm and "+c+" cm. What is the angle opposite the side of length "+fmt(a,1)+" cm, in degrees?",
    ""+Math.round(Aang),[""+Math.round(Bang),""+Math.round(Cang),""+Math.round(180-Aang)],
    "Rearrange the cosine law for the angle opposite side \\(a\\): \\(\\cos A = \\frac{b^2 + c^2 - a^2}{2bc} = \\frac{"+b+"^2 + "+c+"^2 - "+fmt(a,1)+"^2}{2("+b+")("+c+")}\\). This gives \\(A \\approx \\)<b>\\("+Math.round(Aang)+"^\\circ\\)</b>. The side squared on its own at the end of the numerator is the one opposite the angle being found.",
    {a:a,b:b,c:c});
  q.figure=triSVG(a,b,c,{L:["A","B","C"],ang:["?",null,null],side:[fmt(a,1),""+b,""+c]});
  return q;
});
E("u1-crossing-distance",1,["7.3"],2,"gen",function(){
  var D=0,al=0,be=0,R=0,key=0,d1=0,d2=0,d3=0,tries=0,ok=false;
  while(!ok&&tries<400){tries++;
    D=ri(40,120);al=ri(35,70);be=ri(35,70);
    R=180-al-be;if(R<25||R>80)continue;
    var sR=Math.sin(R*Math.PI/180);
    key=D*Math.sin(be*Math.PI/180)/sR;
    d1=D*Math.sin(al*Math.PI/180)/sR;
    d2=D*sR/Math.sin(be*Math.PI/180);
    d3=D*Math.sin(be*Math.PI/180)/Math.sin(al*Math.PI/180);
    var os=[fmt(key,1),fmt(d1,1),fmt(d2,1),fmt(d3,1)];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  return mcq("Two points \\(P\\) and \\(Q\\) on one shore of a lake are "+D+" m apart. A buoy \\(R\\) floats on the lake. From \\(P\\), the angle between the line to \\(Q\\) and the line to the buoy is \\("+al+"^\\circ\\); from \\(Q\\), the angle between the line to \\(P\\) and the line to the buoy is \\("+be+"^\\circ\\). How far is the buoy from \\(P\\), in m?",
    fmt(key,1),[fmt(d1,1),fmt(d2,1),fmt(d3,1)],
    "The two shore points and the buoy form a triangle. The angle at the buoy is \\(180^\\circ - "+al+"^\\circ - "+be+"^\\circ = "+R+"^\\circ\\). By the sine law, \\(\\frac{PR}{\\sin "+be+"^\\circ} = \\frac{"+D+"}{\\sin "+R+"^\\circ}\\), so \\(PR = \\frac{"+D+" \\sin "+be+"^\\circ}{\\sin "+R+"^\\circ} \\approx \\)<b>\\("+fmt(key,1)+"\\text{ m}\\)</b>.",
    {D:D,al:al,be:be,R:R});
});
E("u1-sine-two-step",1,["7.2"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var A,B,C,tries=0;
  do{A=ri(28,58);B=ri(24,58);C=180-A-B;tries++;}while((C<25||C>95)&&tries<40);
  var a=ri(8,30);
  var c=a*Math.sin(rd(C))/Math.sin(rd(A));
  var q=numq("In \\(\\triangle ABC\\), \\(\\angle A = "+A+"^\\circ\\), \\(\\angle B = "+B+"^\\circ\\), and the side opposite \\(\\angle A\\) is \\("+a+"\\text{ cm}\\). Find the length of the side opposite \\(\\angle C\\), to one decimal place, in cm.",
    fmt(c,1),0.06,
    "First the third angle: \\(\\angle C = 180^\\circ - "+A+"^\\circ - "+B+"^\\circ = "+C+"^\\circ\\). Then the sine law: \\(\\frac{c}{\\sin "+C+"^\\circ} = \\frac{"+a+"}{\\sin "+A+"^\\circ}\\), so \\(c = "+a+" \\times \\frac{\\sin "+C+"^\\circ}{\\sin "+A+"^\\circ} = \\)<b>\\("+fmt(c,1)+"\\text{ cm}\\)</b>.",
    {A:A,B:B,C:C,a:a});
  q.figure=triAngSVG(A,B,C,{ang:[A+"\u00B0",B+"\u00B0",C+"\u00B0"],side:[a+" cm",null,"?"]});
  return q;
});
E("u1-cosine-context",1,["7.2"],1,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var p=ri(8,38),w=ri(8,38),ang=ri(38,128);
  var d=Math.sqrt(p*p+w*w-2*p*w*Math.cos(rd(ang)));
  var ctx=pick([
    "Two boats leave the same wharf at the same time. One travels "+p+" km and the other travels "+w+" km, with an angle of \\("+ang+"^\\circ\\) between their courses.",
    "Two hikers leave a trailhead at the same time. One walks "+p+" km and the other walks "+w+" km, with an angle of \\("+ang+"^\\circ\\) between their paths.",
    "Two straight roads leave an intersection. A gas station is "+p+" km along one road and a school is "+w+" km along the other, with an angle of \\("+ang+"^\\circ\\) between the roads. The distance between the gas station and the school is measured straight across."
  ]);
  var q=numq(ctx+" How far apart are the two endpoints, to one decimal place, in km?",
    fmt(d,1),0.06,
    "The two distances and the distance apart form a triangle with an included angle of \\("+ang+"^\\circ\\), so the cosine law applies: \\(d^2 = "+p+"^2 + "+w+"^2 - 2("+p+")("+w+")\\cos("+ang+"^\\circ) = "+fmt(p*p+w*w-2*p*w*Math.cos(rd(ang)),1)+"\\), so \\(d = \\)<b>\\("+fmt(d,1)+"\\text{ km}\\)</b>.",
    {p:p,w:w,ang:ang});
  q.figure=triSVG(d,p,w,{L:["A","B","C"],ang:[ang+"\u00B0",null,null],side:["?",w+" km",p+" km"]});
  return q;
});
E("u1-two-station-height",1,["7.3"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var al=ri(18,36),be=al+ri(12,28),dd=pick([15,20,25,30,40,50,60]);
  var slant=dd*Math.sin(rd(al))/Math.sin(rd(be-al));
  var h=slant*Math.sin(rd(be));
  var thing=pick(["a tower","a lighthouse","a communications mast"]);
  return numq("From a point on level ground, the angle of elevation to the top of "+thing+" is \\("+al+"^\\circ\\). Moving "+dd+" m closer to it, the angle of elevation is \\("+be+"^\\circ\\). Find its height, to one decimal place, in m.",
    fmt(h,1),0.06,
    "The two ground points and the top form a triangle. Its angle at the farther point is \\("+al+"^\\circ\\), and its angle at the top is \\("+be+"^\\circ - "+al+"^\\circ = "+(be-al)+"^\\circ\\). By the sine law, the distance from the nearer point to the top is \\("+dd+" \\times \\frac{\\sin "+al+"^\\circ}{\\sin "+(be-al)+"^\\circ} = "+fmt(slant,1)+"\\text{ m}\\). The height is then \\("+fmt(slant,1)+" \\times \\sin "+be+"^\\circ = \\)<b>\\("+fmt(h,1)+"\\text{ m}\\)</b>.",
    {al:al,be:be,dd:dd});
});
E("u1-law-choice-context",1,["7.1","7.2"],1,"var",varset([
  function(){return mcq("A triangle has sides of \\(9\\text{ cm}\\) and \\(14\\text{ cm}\\) with the angle of \\(58^\\circ\\) between them. Which law gives the third side directly?",
    "Cosine law",["Sine law","Either law gives it in one step","Neither law can be used"],
    "The known angle sits between the two known sides (SAS), so the cosine law gives the third side in one step. The sine law needs a known side-angle pair, which this triangle does not give yet." );},
  function(){return mcq("A triangle has angles of \\(47^\\circ\\) and \\(71^\\circ\\) and a side of \\(12\\text{ m}\\) opposite the \\(47^\\circ\\) angle. Which law gives another side directly?",
    "Sine law",["Cosine law","Either law gives it in one step","Neither law can be used"],
    "There is a known side-angle pair (\\(12\\text{ m}\\) opposite \\(47^\\circ\\)), so the sine law sets up a proportion for any other side. The cosine law would need two sides around a known angle." );},
  function(){return mcq("The three sides of a triangle measure \\(7\\text{ km}\\), \\(10\\text{ km}\\) and \\(13\\text{ km}\\). Which law gives one of its angles directly?",
    "Cosine law",["Sine law","Either law gives it in one step","Neither law can be used"],
    "With all three sides known (SSS) and no angle given, the cosine law rearranges to give an angle. The sine law cannot start without a known angle." );},
  function(){return mcq("In \\(\\triangle PQR\\), \\(\\angle P = 39^\\circ\\), \\(\\angle Q = 84^\\circ\\), and the side opposite \\(\\angle Q\\) is \\(15\\text{ m}\\). Which law gives the side opposite \\(\\angle P\\) directly?",
    "Sine law",["Cosine law","Either law gives it in one step","Neither law can be used"],
    "The side of \\(15\\text{ m}\\) is opposite the known angle of \\(84^\\circ\\), a known side-angle pair, so the sine law gives the side opposite \\(39^\\circ\\) in one proportion.");}
]));

/* --- Unit 2: Quadratic Functions --- */
E("u2-which-quadratic",2,["4.10"],1,"var",varset([
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
E("u2-axis-two-points",2,["4.13"],1,"gen",function(){
  var x1=ri(-9,3),gap=pick([2,4,6,8,10,12,14]),x2=x1+gap,y=ri(-6,12);
  var mid=(x1+x2)/2;
  var q=numq("The points \\(("+x1+", "+y+")\\) and \\(("+x2+", "+y+")\\) lie on the same parabola. What is the equation of the axis of symmetry? Give the value of \\(x\\).",
    mid,0.011,
    "The two points have the same y-coordinate, so they sit at the same height on the parabola, one on each side of the axis. The axis passes midway between them: \\(x = \\frac{"+x1+" + "+x2+"}{2} = \\)<b>\\("+fmt(mid,1)+"\\)</b>.",
    {x1:x1,x2:x2,y:y});
  q.figure=parTwoPtsSVG(x1,x2,y);
  return q;
});
E("u2-standard-from-factored",2,["4.5"],1,"gen",function(){
  var a=pick([1,2,-2,3,-1]),r1,r2,tries=0;
  do{r1=ri(-6,6);r2=ri(-6,6);tries++;}while((r1===0||r2===0||r1===r2||r2===-r1)&&tries<40);
  var B=-a*(r1+r2),C=a*r1*r2;
  function fsB(r){return "(x "+(r>0?"- "+r:"+ "+(-r))+")";}
  return mcq("Which function is the standard form of "+factT(a,r1,r2)+"?",
    "\\(y = "+quadB(a,B,C)+"\\)",
    ["\\(y = "+quadB(a,-B,C)+"\\)","\\(y = "+quadB(a,B,-C)+"\\)","\\(y = "+quadB(a,-B,-C)+"\\)"],
    "Expand the factors: \\[\\begin{aligned} "+fsB(r1)+fsB(r2)+" &= x^2 - ("+r1+" + "+r2+")x + ("+r1+")("+r2+") \\\\ &= x^2 "+((-(r1+r2))>0?"+ ":"- ")+Math.abs(r1+r2)+"x "+(r1*r2>0?"+ ":"- ")+Math.abs(r1*r2)+" \\end{aligned}\\] Multiplying through by \\("+a+"\\) gives \\(y = "+quadB(a,B,C)+"\\). Watch the signs: the middle coefficient is \\(-"+a+" \\times ("+r1+" + "+r2+") = "+B+"\\).",
    {a:a,r1:r1,r2:r2});
});
E("u2-revenue-model",2,["4.2"],2,"gen",function(){
  var N=pick([240,300,360,400,450,500,600]),P=pick([8,10,12,15,20]),s=pick([10,15,20,25,30,40]);
  var frame=pick([
    "A theatre sells "+N+" tickets per show at $"+P+" each. For every $1 increase in the ticket price, "+s+" fewer tickets are sold. Let \\(x\\) be the number of $1 increases. Which function gives the revenue \\(R(x)\\)?",
    "A ferry carries "+N+" passengers per crossing at $"+P+" per passenger. For every $1 added to the fare, "+s+" fewer passengers ride. Let \\(x\\) be the number of $1 increases. Which function gives the revenue \\(R(x)\\)?",
    "A market stall sells "+N+" jars of preserves a week at $"+P+" each. For every $1 increase in the price, "+s+" fewer jars are sold. Let \\(x\\) be the number of $1 increases. Which function gives the revenue \\(R(x)\\)?"
  ]);
  var q=mcq(frame,
    "\\(R(x) = ("+N+" - "+s+"x)("+P+" + x)\\)",
    ["\\(R(x) = ("+N+" + "+s+"x)("+P+" + x)\\)","\\(R(x) = ("+N+" - "+s+"x)("+P+" - x)\\)","\\(R(x) = ("+N+" - "+s+")("+P+" + x)\\)"],
    "After \\(x\\) increases, the price is \\("+P+" + x\\) dollars and the number sold is \\("+N+" - "+s+"x\\) (it drops by "+s+" per increase, so the drop is \\("+s+"x\\) in total). Revenue is price \\(\\times\\) quantity: \\(R(x) = ("+N+" - "+s+"x)("+P+" + x)\\).",
    {N:N,P:P,s:s});
  q.figure=parSVG(-s,N-s*P,N*P,{xrange:[0,N/s],xLab:"x",yLab:"R(x)",aria:"Revenue parabola"});
  return q;
});
E("u2-count-intercepts",2,["4.15"],1,"gen",function(){
  var a=pick([1,2,-1,-2,3,-3]),h=ri(-6,6),k=ri(-9,9);
  var cnt=(k===0)?1:(((a>0&&k<0)||(a<0&&k>0))?2:0);
  var q=numq("How many x-intercepts does the graph of "+vertT(a,h,k)+" have?",
    cnt,0.011,
    "The vertex is \\(("+h+", "+k+")\\) and the parabola opens "+(a>0?"upward":"downward")+". "+(k===0?"The vertex sits right on the x-axis, so the graph touches it at exactly one point: <b>\\(1\\)</b> x-intercept.":(cnt===2?"The vertex is on the opposite side of the x-axis from the direction the parabola opens away from, so the graph must cross the axis twice: <b>\\(2\\)</b> x-intercepts.":"The vertex is on the same side of the x-axis as the opening, so the graph never reaches the axis: <b>\\(0\\)</b> x-intercepts.")),
    {a:a,h:h,k:k});
  q.figure=parSVG(a,-2*a*h,a*h*h+k,{});
  return q;
});
E("u2-max-area",2,["4.2"],3,"gen",function(){
  var F=4*ri(6,40);
  var w=F/4,maxA=F*F/8,mode=ri(0,2);
  var c=pick([
    "A farmer uses "+F+" m of fencing to enclose a rectangular garden against a long barn wall. The wall forms one full side of the garden, so fencing is needed on only three sides.",
    "A homeowner uses "+F+" m of fencing to build a rectangular dog pen against the side of a house. The house forms one full side of the pen, so fencing is needed on only three sides.",
    "A lifeguard uses "+F+" m of rope to mark off a rectangular swimming area along a straight beach. The beach forms one full side, so rope is needed on only three sides."
  ]);
  var ask=(mode===0?" What is the maximum area that can be enclosed, in \\(m^2\\)?":(mode===1?" What is the length of each side perpendicular to the wall or beach when the area is greatest, in m?":" What is the length of the side parallel to the wall or beach when the area is greatest, in m?"));
  var q=numq(c+ask,
    mode===0?maxA:(mode===1?w:F/2),0.011,
    "Let \\(w\\) be the length of each side perpendicular to the wall. The side parallel to the wall is then \\("+F+" - 2w\\), and the area is \\(A = w("+F+" - 2w)\\). This quadratic opens downward; its vertex is at \\(w = \\frac{"+F+"}{4} = "+w+"\\) m. The maximum area is \\("+w+" \\times ("+F+" - 2 \\times "+w+") = "+w+" \\times "+(F-2*w)+" = \\)<b>\\("+maxA+"\\text{ m}^2\\)</b>, with the parallel side measuring "+(F-2*w)+" m.",
    {F:F,mode:mode});
  q.figure=fenceSVG(F,(c.indexOf("barn")>=0?"barn wall":(c.indexOf("house")>=0?"house":"beach")));
  return q;
});

/* --- Unit 3: Quadratic Equations --- */
E("u3-zeros-factored",3,["4.6","4.8"],1,"gen",function(){
  function g2(a,b){while(b){var t=a%b;a=b;b=t;}return a;}
  function fr(n,d){var g=g2(Math.abs(n),Math.abs(d));n/=g;d/=g;return d===1?(""+n):(n+"/"+d);}
  var p=ri(2,5),qq,tries=0;
  do{qq=ri(1,9);tries++;}while(qq===p&&tries<30);
  var r=ri(1,9);
  var root1=fr(qq,p),root1T=frB(qq,p);
  return mcq("What are the zeros of \\(y = ("+p+"x - "+qq+")(x + "+r+")\\)?",
    "\\(x = -"+r+"\\) and \\(x = "+root1T+"\\)",
    ["\\(x = "+r+"\\) and \\(x = "+root1T+"\\)",
     "\\(x = -"+r+"\\) and \\(x = -"+root1T+"\\)",
     "\\(x = -"+r+"\\) and \\(x = "+frB(p,qq)+"\\)"],
    "Set each factor equal to zero. From \\(x + "+r+" = 0\\), \\(x = -"+r+"\\). From \\("+p+"x - "+qq+" = 0\\), \\("+p+"x = "+qq+"\\), so \\(x = "+root1T+"\\).",
    {p:p,qq:qq,r:r});
});
E("u3-factor-monic",3,["PK.2"],1,"gen",function(){
  var r1,r2,tries=0;
  do{r1=ri(-9,9);r2=ri(-9,9);tries++;}while((r1===0||r2===0||r1===r2||r2===-r1)&&tries<60);
  var b=-(r1+r2),c=r1*r2;
  function fs(r){return "(x "+(r>0?"- "+r:"+ "+(-r))+")";}
  return mcq("Which is the factored form of "+quadT(1,b,c)+"?",
    "\\("+fs(r1)+fs(r2)+"\\)",
    ["\\("+fs(-r1)+fs(-r2)+"\\)","\\("+fs(-r1)+fs(r2)+"\\)","\\("+fs(r1)+fs(-r2)+"\\)"],
    "Look for two numbers that multiply to \\("+c+"\\) and add to \\("+b+"\\): they are \\("+(-r1)+"\\) and \\("+(-r2)+"\\). So \\("+quadB(1,b,c)+" = "+fs(r1)+fs(r2)+"\\). (Expand it back to check: the middle term is \\(-("+r1+" + "+r2+")x = "+b+"x\\).)",
    {r1:r1,r2:r2});
});
E("u3-first-mistake",3,["4.6"],2,"var",varset([
  function(){return mcq("A student solves \\(x^2 - 5x + 6 = 0\\) by factoring.<br>Line 1: \\((x - 2)(x - 3) = 0\\)<br>Line 2: \\(x - 2 = 0\\) &nbsp;or&nbsp; \\(x - 3 = 0\\)<br>Line 3: \\(x = 2\\) &nbsp;or&nbsp; \\(x = -3\\)<br>Line 4: The roots are \\(2\\) and \\(-3\\).<br>In which line is the FIRST mistake?",
    "Line 3",["Line 1","Line 2","Line 4"],
    "The factoring in Line 1 is correct (\\(2 \\times 3 = 6\\) and \\(-2 - 3 = -5\\)) and Line 2 applies the zero-product rule properly. In Line 3, \\(x - 3 = 0\\) gives \\(x = +3\\), not \\(-3\\). The roots are \\(2\\) and \\(3\\)." );},
  function(){return mcq("A student solves \\(x^2 + 6x + 4 = 0\\) using the quadratic formula.<br>Line 1: \\(x = \\frac{-6 \\pm \\sqrt{6^2 - 4(1)(4)}}{2}\\)<br>Line 2: \\(x = \\frac{-6 \\pm \\sqrt{52}}{2}\\)<br>Line 3: \\(x = \\frac{-6 \\pm 2\\sqrt{13}}{2}\\)<br>Line 4: \\(x = -3 \\pm \\sqrt{13}\\)<br>In which line is the FIRST mistake?",
    "Line 2",["Line 1","Line 3","Line 4"],
    "Line 1 sets up the formula correctly. In Line 2, \\(6^2 - 4(1)(4) = 36 - 16 = 20\\), not \\(52\\) (the student added instead of subtracting). Everything after is consistent with that wrong value; the correct roots are \\(x = -3 \\pm \\sqrt{5}\\)." );},
  function(){return mcq("A student solves \\(x^2 = 5x\\).<br>Line 1: Divide both sides by \\(x\\): \\(x = 5\\)<br>Line 2: Check: \\(5^2 = 25\\) and \\(5 \\times 5 = 25\\), so \\(x = 5\\) works<br>Line 3: The only root is \\(x = 5\\)<br>Line 4: Answer: \\(x = 5\\)<br>In which line is the FIRST mistake?",
    "Line 1",["Line 2","Line 3","Line 4"],
    "The mistake is Line 1: dividing both sides by \\(x\\) throws away the root \\(x = 0\\), because you cannot divide by a quantity that might be zero. Done properly: \\(x^2 - 5x = 0\\), so \\(x(x - 5) = 0\\), giving \\(x = 0\\) or \\(x = 5\\)." );},
  function(){return mcq("A student solves \\(x^2 - 4x - 5 = 0\\) by factoring.<br>Line 1: \\((x - 5)(x + 1) = 0\\)<br>Line 2: \\(x - 5 = 0\\) &nbsp;or&nbsp; \\(x + 1 = 0\\)<br>Line 3: \\(x = 5\\) &nbsp;or&nbsp; \\(x = 1\\)<br>Line 4: The roots are \\(5\\) and \\(1\\).<br>In which line is the FIRST mistake?",
    "Line 3",["Line 1","Line 2","Line 4"],
    "Line 1 factors correctly (\\(-5 \\times 1 = -5\\) and \\(-5 + 1 = -4\\)) and Line 2 is a proper zero-product split. In Line 3, \\(x + 1 = 0\\) gives \\(x = -1\\), not \\(1\\). The roots are \\(5\\) and \\(-1\\).");}
]));
E("u3-solve-square",3,["4.8"],2,"gen",function(){
  function g2(a,b){while(b){var t=a%b;a=b;b=t;}return a;}
  function fr(n,d){var g=g2(Math.abs(n),Math.abs(d));n/=g;d/=g;return d===1?(""+n):(n+"/"+d);}
  var m=ri(1,9),n=pick([1,2,3,4]),k=pick([1,2,3]),tries=0;
  while(m===n&&tries<30){m=ri(1,9);tries++;}
  var A=n*n*k,B=m*m*k;
  var d3=(m===1)?("\\(x = \\pm "+frB(2,n)+"\\)"):("\\(x = \\pm "+frB(m*m,n)+"\\)");
  return mcq("Solve: \\("+(A===1?"":A)+"x^2 = "+B+"\\).",
    "\\(x = \\pm "+frB(m,n)+"\\)",
    ["\\(x = "+frB(m,n)+"\\) only","\\(x = \\pm "+frB(n,m)+"\\)",d3],
    "Divide both sides by \\("+A+"\\), then take the square root of both sides, remembering the negative root: \\[\\begin{aligned} x^2 &= \\frac{"+B+"}{"+A+"} = "+frB(B,A)+" \\\\ x &= \\pm "+frB(m,n)+" \\end{aligned}\\]",
    {m:m,n:n,k:k});
});
E("u3-gcf-solve",3,["4.8"],2,"gen",function(){
  var a=ri(2,7),r=ri(-9,9);while(r===0)r=ri(-9,9);
  var b=a*r;
  return numq("Solve by factoring: "+"\\("+quadB(a,b,0)+" = 0\\)"+". Give the nonzero root.",
    -r,0.011,
    "Factor out the common factor \\("+a+"x\\): \\("+a+"x(x "+(r>0?"+ "+r:"- "+(-r))+") = 0\\). So \\(x = 0\\) or \\(x = "+(-r)+"\\). The nonzero root is <b>\\("+(-r)+"\\)</b>.",
    {a:a,r:r});
});
E("u3-setup-equation",3,["4.3"],2,"var",varset([
  figArm(function(){return mcq("A flare is launched from the top of a 45 m cliff. Its height above the water after t seconds is \\(h(t) = -5t^2 + 30t + 45\\). Which equation determines the times when the flare is 65 m above the water?",
    "\\(65 = -5t^2 + 30t + 45\\)",
    ["\\(0 = -5t^2 + 30t + 45\\)","\\(t = -5(65)^2 + 30(65) + 45\\)","\\(65 = -5t^2 + 30t\\)"],
    "Set the height function equal to the target height: \\(h(t) = 65\\). The equation \\(0 = \\dots\\) would be for hitting the water, and the second option wrongly substitutes \\(65\\) for \\(t\\) instead of for \\(h(t)\\)." );},figSetupEq1),
  figArm(function(){return mcq("A diver's height above a pool after t seconds is \\(h(t) = -5t^2 + 8t + 12\\). Which equation determines the times when the diver is 14 m above the pool?",
    "\\(14 = -5t^2 + 8t + 12\\)",
    ["\\(0 = -5t^2 + 8t + 12\\)","\\(t = -5(14)^2 + 8(14) + 12\\)","\\(14 = -5t^2 + 8t\\)"],
    "Set the height function equal to the target height: \\(h(t) = 14\\), keeping the constant term \\(12\\) (the starting height) in place." );},figSetupEq2),
  figArm(function(){return mcq("A fountain jet's height after t seconds is \\(h(t) = -5t^2 + 20t + 3\\). Which equation determines the times when the water is 18 m above the nozzle?",
    "\\(18 = -5t^2 + 20t + 3\\)",
    ["\\(0 = -5t^2 + 20t + 3\\)","\\(t = -5(18)^2 + 20(18) + 3\\)","\\(18 = -5t^2 + 20t\\)"],
    "Set the height function equal to the target height: \\(h(t) = 18\\). Substituting \\(18\\) for \\(t\\) (the second option) would evaluate the height at \\(t = 18\\) s instead.");},figSetupEq3)
]));
E("u3-border",3,["4.3"],3,"gen",function(){
  var L=pick([12,16,18,20,24,30]),W=pick([8,10,12,14]),w=pick([1,1.5,2,2.5,3]),tries=0;
  while(W>=L&&tries<30){W=pick([8,10,12,14]);tries++;}
  var T=(L+2*w)*(W+2*w);
  var c=pick([
    {s:"A rectangular driveway is "+L+" m long and "+W+" m wide. A brick border of uniform width is built around all four sides of the driveway. The total area of the driveway and the border together is \\("+T+"\\text{ m}^2\\).",n:"border"},
    {s:"A rectangular garden plot is "+L+" m by "+W+" m. A gravel path of uniform width is built around all four sides of the plot. The total area of the plot and the path together is \\("+T+"\\text{ m}^2\\).",n:"path"}
  ]);
  var q=numq(c.s+" Find the width of the "+c.n+", in m.",
    w,0.011,
    "Let the width be \\(w\\). The border adds \\(w\\) to every side, so the outside dimensions are \\(("+L+" + 2w)\\) by \\(("+W+" + 2w)\\), and \\[\\begin{aligned} ("+L+" + 2w)("+W+" + 2w) &= "+T+" \\\\ 4w^2 + "+(2*(L+W))+"w + "+(L*W)+" &= "+T+" \\\\ 4w^2 + "+(2*(L+W))+"w - "+(T-L*W)+" &= 0 \\end{aligned}\\] The quadratic formula gives \\(w = "+w+"\\) or a negative value; a width cannot be negative, so the width is <b>\\("+w+"\\) m</b>.",
    {L:L,W:W,w:w});
  q.figure=borderSVG(L,W);
  return q;
});
E("u3-formula-repair",3,["4.9"],3,"gen",function(){
  function pair(r1,r2){var lo=Math.min(r1,r2),hi=Math.max(r1,r2);return "\\(x = "+lo+"\\) and \\(x = "+hi+"\\)";}
  var m=0,n=0,a=1,b=0,c=0,D=0,sq=0,tmpl=0,tries=0,ok=false,keyS="",stuS="",othS="",flipS="";
  while(!ok&&tries<400){tries++;
    m=ri(-6,6);n=ri(-6,6);a=pick([1,2]);tmpl=ri(0,1);
    if(m===0||n===0||m===n||m+n===0)continue;
    b=-a*(m+n);c=a*m*n;D=b*b-4*a*c;sq=a*Math.abs(m-n);
    keyS=pair(m,n);
    stuS=tmpl===0?pair(-m,-n):pair(2*m,2*n);
    othS=tmpl===0?pair(2*m,2*n):pair(-m,-n);
    flipS=pair(-m,n);
    var os=[keyS,stuS,othS,flipS];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  var work;
  if(tmpl===0){
    work="A student solves the equation "+quadT(a,b,c).slice(0,-2)+" = 0\\) with the quadratic formula. Their first line reads \\(x = \\frac{"+b+" \\pm \\sqrt{"+D+"}}{"+(2*a)+"}\\), and they conclude the roots are "+stuS+". What are the correct roots?";
  }else{
    work="A student solves the equation "+quadT(a,b,c).slice(0,-2)+" = 0\\) with the quadratic formula. Their first line reads \\(x = \\frac{"+(-b)+" \\pm \\sqrt{"+D+"}}{"+a+"}\\), and they conclude the roots are "+stuS+". What are the correct roots?";
  }
  return mcq(work,keyS,[stuS,othS,flipS],
    "The quadratic formula needs \\(-b\\) in the numerator and \\(2a\\) in the denominator: \\(x = \\frac{"+(-b)+" \\pm \\sqrt{"+D+"}}{"+(2*a)+"} = \\frac{"+(-b)+" \\pm "+sq+"}{"+(2*a)+"}\\), which gives <b>"+keyS+"</b>. The student\u2019s first line already departs from the formula, so their roots are wrong even though the arithmetic after it was consistent.",
    {m:m,n:n,a:a,tmpl:tmpl});
});
E("u3-discriminant-parameter",3,["4.7"],3,"gen",function(){
  if(Math.random()<0.5){
    var pairs=[[1,9],[1,16],[1,25],[1,36],[2,8],[2,18],[4,9]];
    var pr=pick(pairs);var a=pr[0],c=pr[1];var ac=a*c;var rt=Math.round(Math.sqrt(ac));
    function os4(p){return "\\(k = "+p+"\\) or \\(k = -"+p+"\\)";}
    var stems=[
      "For what values of \\(k\\) does \\("+(a===1?"":a)+"x^2 + kx + "+c+" = 0\\) have exactly one real solution?",
      "For what values of \\(k\\) does \\("+(a===1?"":a)+"x^2 + kx + "+c+" = 0\\) have two equal real roots?",
      "For what values of \\(k\\) does \\("+(a===1?"":a)+"x^2 + kx + "+c+" = 0\\) have a repeated root?"];
    return mcq(pick(stems),os4(2*rt),[os4(rt),os4(2*ac),os4(ac)],
      "A single repeated solution means the discriminant is zero: \\(k^2 - 4("+a+")("+c+") = 0\\), so \\(k^2 = "+(4*ac)+"\\) and \\(k = \\pm 2\\sqrt{"+ac+"}\\), giving <b>"+os4(2*rt)+"</b>. Both signs work, because only \\(k^2\\) appears in the discriminant.",
      {a:a,c:c});
  }
  var bs=[6,8,10,12,14];var b=pick(bs);var th=b*b/4;var off=ri(1,8);
  var e1=ri(2,4),e2=e1+ri(2,4);
  return mcq("The equation \\(x^2 + "+b+"x + k = 0\\) has no real solutions. Which value could \\(k\\) be?",
    ""+(th+off),[""+th,""+(th-e1),""+(th-e2)],
    "No real solutions means the discriminant is negative: \\("+b+"^2 - 4k < 0\\), which gives \\(k > \\frac{"+(b*b)+"}{4} = "+th+"\\). Only \\("+(th+off)+"\\) is greater than \\("+th+"\\): at \\(k = "+th+"\\) there would be exactly one solution, and smaller values give two.",
    {b:b,th:th});
});
E("u3-exact-roots",3,["4.9"],2,"gen",function(){
  function g2(a,b){while(b){var t=a%b;a=b;b=t;}return a;}
  function rootPair(aa,bb,cc){
    var D=bb*bb-4*aa*cc;if(D<=0)return null;
    var rt=Math.round(Math.sqrt(D));if(rt*rt===D)return null;
    var sq=1,d0=D,f;for(f=2;f*f<=d0;f++){while(d0%(f*f)===0){d0/=(f*f);sq*=f;}}
    if(d0===1)return null;
    var g=g2(g2(Math.abs(bb),sq),2*aa),nb=-bb/g,s=sq/g,den=(2*aa)/g;
    var num=""+nb+" \\pm "+(s===1?"":s)+"\\sqrt{"+d0+"}";
    return den===1?("\\(x = "+num+"\\)"):("\\(x = \\frac{"+num+"}{"+den+"}\\)");
  }
  var a,b,c,key,d1,d2,d3,tries=0;
  do{
    a=pick([1,2]);b=ri(-9,9);c=ri(-9,9);tries++;
    if(b===0||c===0){key=null;continue;}
    key=rootPair(a,b,c);d1=rootPair(a,-b,c);d2=rootPair(a,b,-c);d3=rootPair(a,c,b);
  }while((!key||!d1||!d2||!d3||d1===key||d2===key||d3===key||d2===d1||d3===d1||d3===d2)&&tries<300);
  var D=b*b-4*a*c,sq=1,d0=D,f;for(f=2;f*f<=d0;f++){while(d0%(f*f)===0){d0/=(f*f);sq*=f;}}
  var g=g2(g2(Math.abs(b),sq),2*a);
  return mcq("What are the exact roots of "+"\\("+quadB(a,b,c)+" = 0\\)"+"?",
    key,[d1,d2,d3],
    "Quadratic formula: \\[\\begin{aligned} x &= \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\\\ &= \\frac{"+(-b)+" \\pm \\sqrt{"+D+"}}{"+(2*a)+"} \\end{aligned}\\] Since \\("+D+" = "+(sq*sq)+" \\times "+d0+"\\), \\(\\sqrt{"+D+"} = "+sq+"\\sqrt{"+d0+"}\\)"+(g>1?", and dividing numerator and denominator by \\("+g+"\\)":"")+", giving <b>"+key+"</b>.",
    {a:a,b:b,c:c});
});

/* --- Unit 4: Radicals --- */
E("u4-variable-mixed",4,["1.3"],2,"gen",function(){
  var s=ri(2,5),r=pick([2,3,5,6,7]),n=pick([1,2,3]);
  var coef=s*s*r,p=2*n+1;
  var xnT=(n===1?"x":"x^{"+n+"}");
  return mcq("Simplify: \\(\\sqrt{"+coef+"x^{"+p+"}}\\).",
    "\\("+s+xnT+"\\sqrt{"+r+"x}\\)",
    ["\\("+(s+1)+xnT+"\\sqrt{"+r+"x}\\)", "\\("+s+"x^{"+(n+1)+"}\\sqrt{"+r+"x}\\)", "\\("+s+xnT+"\\sqrt{"+coef+"x}\\)"],
    "\\("+coef+" = "+(s*s)+" \\times "+r+"\\) and \\(x^{"+p+"} = (x^{"+n+"})^2 x\\), so the square factors come out: \\(\\sqrt{"+coef+"x^{"+p+"}} = "+s+xnT+"\\sqrt{"+r+"x}\\). One x stays inside because the exponent \\("+p+"\\) is odd.",
    {s:s,r:r,n:n});
});
E("u4-multiply-mixed",4,["1.6"],2,"gen",function(){
  var pairs=[[2,3],[2,5],[2,6],[2,7],[2,10],[3,5],[3,6],[3,7],[3,10],[5,6],[5,7],[5,10],[6,7],[6,10],[7,10]];
  var pr=pick(pairs),b=pr[0],d=pr[1],a=ri(2,4),c=ri(2,4);
  var bd=b*d,t=1,rr=bd,f;for(f=2;f*f<=rr;f++){while(rr%(f*f)===0){rr/=(f*f);t*=f;}}
  var key=radT(a*c*t,rr);
  var d2=(t>1)?radT(a*c,rr):radT(a*c*t,d);
  var d3=radT(a*c*t,b+d);
  return mcq("Simplify: ("+radT(a,b)+")("+radT(c,d)+").",
    key,
    [radT(a*c*t,b),d2,d3],
    "Multiply the outside numbers together and the inside numbers together: \\("+a+" \\times "+c+" = "+(a*c)+"\\) and \\(\\sqrt{"+b+"} \\times \\sqrt{"+d+"} = \\sqrt{"+bd+"}\\). Then simplify \\(\\sqrt{"+bd+"} = "+(t>1?(t+"\\sqrt{"+rr+"}"):("\\sqrt{"+rr+"}"))+"\\), so the product is "+key+".",
    {a:a,b:b,c:c,d:d});
});
E("u4-equation-restriction",4,["1.8"],1,"gen",function(){
  var p=pick([1,2,3,4]),m=ri(-6,8),r=ri(2,9),tries=0;
  while(m===0&&tries<20){m=ri(-6,8);tries++;}
  var q=-p*m;
  var inside=(p===1?"x":(""+p+"x"))+(q>0?" + "+q:" - "+(-q));
  return mcq("State the restriction on x in the radical equation \\(\\sqrt{"+inside+"} = "+r+"\\).",
    "\\(x \\geq "+m+"\\)",
    ["\\(x \\leq "+m+"\\)","\\(x \\geq "+(-m)+"\\)","All real numbers"],
    "The radicand cannot be negative: \\("+inside+" \\ge 0\\) gives \\("+(p===1?"x":(""+p+"x"))+" \\ge "+(-q)+"\\), so \\(x \\ge "+m+"\\). This restriction must hold before the equation can have any solution at all.",
    {p:p,m:m,r:r});
});
E("u4-verify-root",4,["1.10"],1,"gen",function(){
  var s=ri(3,9),a=ri(3,20),b=ri(2,6);
  var X=s*s-a;
  if(Math.random()<0.5){
    return numq("A student solving \\(\\sqrt{x + "+a+"} = x - "+b+"\\) claims that \\(x = "+X+"\\) is a root. Substitute \\(x = "+X+"\\): what is the value of the LEFT side, \\(\\sqrt{x + "+a+"}\\)?",
      s,0.011,
      "\\(\\sqrt{"+X+" + "+a+"} = \\sqrt{"+(s*s)+"}\\) = <b>\\("+s+"\\)</b>. (For comparison, the right side at \\(x = "+X+"\\) is \\("+X+" - "+b+" = "+(X-b)+"\\). Both sides must give the same value for \\(x = "+X+"\\) to actually be a root.)",
      {mode:1,X:X,a:a,b:b});
  }
  return numq("A student solving \\(\\sqrt{x + "+a+"} = x - "+b+"\\) claims that \\(x = "+X+"\\) is a root. Substitute \\(x = "+X+"\\): what is the value of the RIGHT side, \\(x - "+b+"\\)?",
    X-b,0.011,
    "\\("+X+" - "+b+"\\) = <b>\\("+(X-b)+"\\)</b>. (For comparison, the left side at \\(x = "+X+"\\) is \\(\\sqrt{"+X+" + "+a+"} = "+s+"\\). Both sides must give the same value for \\(x = "+X+"\\) to actually be a root.)",
    {mode:2,X:X,a:a,b:b});
});
E("u4-model-equation",4,["1.12"],2,"gen",function(){
  var T=pick([2,3,4,5,6]),L=T*T/4;
  return numq("The period of a simple pendulum is modelled by \\(T = 2\\sqrt{L}\\), where T is the period in seconds and L is the length in metres. How long is a pendulum whose period is "+T+" s, in m?",
    L,0.011,
    "\\("+T+" = 2\\sqrt{L}\\), so \\(\\sqrt{L} = "+T+" \\div 2 = "+fmt(T/2,2)+"\\). Squaring both sides gives \\(L\\) = <b>\\("+fmt(L,2)+"\\text{ m}\\)</b>.",
    {mode:2,T:T});
});
E("u4-model-evaluate",4,["1.12"],1,"gen",function(){
  {
    var d=ri(3,60),sp=5*Math.sqrt(d);
    return numq("Police estimate a car's speed from a skid mark using \\(s = \\sqrt{25d}\\), where s is the speed in km/h and d is the length of the skid mark in metres. A skid mark at a collision scene measures "+d+" m. Estimate the car's speed, to one decimal place, in km/h.",
      fmt(sp,1),0.06,
      "Substitute \\(d = "+d+"\\): \\(s = \\sqrt{25 \\times "+d+"} = \\sqrt{"+(25*d)+"} \\approx "+fmt(sp,1)+"\\). So the speed is about <b>\\("+fmt(sp,1)+"\\text{ km/h}\\)</b>.",
      {mode:1,d:d});
  }
});

/* ============ Tranche 4 (Oct 26): QE RHS review: Units 4, 3, 8 ============
   Existing tests and question banks, including the QE RHS radicals /
   quadratic equations / angles tests and reviews (see
   harvest/qerhs-inventory.md), were reviewed only to gauge the expected
   depth and range of treatment; every item was written new with new
   numbers and contexts, nothing copied verbatim. */

/* --- Unit 4: Radicals --- */
E("u4-cube-mixed",4,["1.2"],1,"gen",function(){
  var a=ri(2,5),b=pick([2,3,5,6,7,10,11,13,14,15,21,22,26,30]);
  var neg=Math.random()<0.25;
  var mag=a*a*a*b;
  return mcq("Express "+cbrtT((neg?"-":"")+mag)+" as a mixed radical in simplest form.",
    rad3T(neg?-a:a,b),
    [rad3T(neg?-(a+1):a+1,b),rad3T(neg?-a:a,b+1),rad3T(neg?-a:a,a*b)],
    "Find the largest perfect cube dividing \\("+mag+"\\): \\("+mag+" = "+(a*a*a)+" \\times "+b+"\\). Cube roots group factors in threes, so "+cbrtT((neg?"-":"")+mag)+" = "+rad3T(neg?-a:a,b)+"."+(neg?" (A cube root of a negative number is negative.)":""),
    {a:a,b:b,neg:neg});
});
E("u4-cube-equation",4,["1.9"],2,"gen",function(){
  var r=ri(-4,5),p=pick([1,2,3]),x0=ri(-12,20);
  var q=r*r*r-p*x0;
  var inside=(p===1?"x":p+"x")+(q>0?" + "+q:(q<0?" - "+(-q):""));
  var sol="Cube both sides"+(p>1?", then divide by \\("+p+"\\)":"")+": \\[\\begin{aligned} "+inside+" &= {"+r+"}^{3} = "+(r*r*r)+" \\\\ "+(p===1?"x":p+"x")+" &= "+(r*r*r)+(q>0?" - "+q:(q<0?" + "+(-q):""))+" = "+(p*x0)+" \\\\ x &= "+x0+" \\end{aligned}\\] (Cube roots accept negative inputs, so there is no restriction to check.)";
  return numq("Solve: \\(\\sqrt[3]{"+inside+"} = "+r+"\\). Give the value of x.",
    x0,0.011,sol,{r:r,p:p,x0:x0,q:q});
});
E("u4-combine-multi",4,["1.6"],2,"gen",function(){
  var b=pick([2,3,5,6,7,10,11,13]);
  var D,M,SG,tot,tries=0;
  do{
    D=[ri(1,3),ri(1,3),ri(1,3)];M=[ri(1,4),ri(2,4),ri(1,4)];
    SG=[1,Math.random()<0.5?-1:1,Math.random()<0.5?-1:1];
    tot=D[0]*M[0]+SG[1]*D[1]*M[1]+SG[2]*D[2]*M[2];tries++;
  }while(tot<1&&tries<60);
  function term(i){return radT(D[i],M[i]*M[i]*b);}
  var key=radT(tot,b);
  var slip1=D[0]*M[0]-SG[1]*D[1]*M[1]+SG[2]*D[2]*M[2];
  var d2v=D[0]*M[0]+SG[1]*D[1]*M[1];
  var cand=[slip1,d2v,tot+1,tot+2,tot+3,tot+5],ds=[];
  for(var ci=0;ci<cand.length&&ds.length<2;ci++){var cv=cand[ci];if(cv>=1&&cv!==tot&&ds.indexOf(cv)<0)ds.push(cv);}
  var d1=radT(ds[0],b),d2=radT(ds[1],b);
  var d3=sqrtT(M[0]*M[0]*b+M[1]*M[1]*b+M[2]*M[2]*b);
  return mcq("Simplify: \\("+term(0).slice(2,-2)+(SG[1]>0?" + ":" - ")+term(1).slice(2,-2)+(SG[2]>0?" + ":" - ")+term(2).slice(2,-2)+"\\)",
    key,[d1,d2,d3],
    "Simplify each term first: "+term(0)+" = "+radT(D[0]*M[0],b)+", "+term(1)+" = "+radT(D[1]*M[1],b)+", and "+term(2)+" = "+radT(D[2]*M[2],b)+". They are like radicals, so combine the coefficients: \\("+(D[0]*M[0])+" "+(SG[1]>0?"+ ":"- ")+(D[1]*M[1])+" "+(SG[2]>0?"+ ":"- ")+(D[2]*M[2])+" = "+tot+"\\), giving <b>"+key+"</b>.",
    {b:b,D:D,M:M,SG:SG});
});
E("u4-binomial-square",4,["1.6"],2,"gen",function(){
  var m=pick([2,3,5,6,7,10,11,13]),n=pick([2,3,5,6,7,10,11,13].filter(function(x){return x!==m;}));
  var mn=m*n,t=1,r=mn,f;for(f=2;f*f<=r;f++){while(r%(f*f)===0){r/=(f*f);t*=f;}}
  var plus=Math.random()<0.5;
  var sgn=plus?"+":"\u2212",osgn=plus?"\u2212":"+";
  var sgnT=plus?"+":"-",osgnT=plus?"-":"+";
  var key="\\("+(m+n)+" "+sgnT+" "+(2*t)+"\\sqrt{"+r+"}\\)";
  return mcq("Expand and simplify: \\((\\sqrt{"+m+"} "+sgnT+" \\sqrt{"+n+"})^2\\).",
    key,
    ["\\("+(m+n)+" "+osgnT+" "+(2*t)+"\\sqrt{"+r+"}\\)","\\("+(m+n)+" "+sgnT+" \\sqrt{"+mn+"}\\)","\\("+(m+n)+" "+sgnT+" "+t+"\\sqrt{"+r+"}\\)"],
    "\\((a "+sgnT+" b)^2 = a^2 "+sgnT+" 2ab + b^2\\). Here \\(a^2 = "+m+"\\) and \\(b^2 = "+n+"\\), and the middle term is \\(2\\sqrt{"+m+"} \\times \\sqrt{"+n+"} = 2\\sqrt{"+mn+"} = "+(2*t)+"\\sqrt{"+r+"}\\). Adding the parts: \\("+m+" + "+n+" = "+(m+n)+"\\), so the expansion is "+key+".",
    {m:m,n:n,plus:plus});
});
E("u4-triangle-perimeter",4,["1.6"],2,"gen",function(){
  var b=pick([2,3,5,6,7,10,11,13]);
  var s1=ri(1,4),s2=ri(1,4),s3=ri(1,4),sum=s1+s2+s3;
  var n1=s1*s1*b,n2=s2*s2*b,n3=s3*s3*b;
  return mcq("A triangle has sides of "+sqrtT(n1)+" cm, "+sqrtT(n2)+" cm and "+sqrtT(n3)+" cm. What is its perimeter, in simplest radical form?",
    radT(sum,b),
    [radT(s1+s2,b),sqrtT(n1+n2+n3),radT(sum+1,b)],
    "Simplify each side: "+sqrtT(n1)+" = "+radT(s1,b)+", "+sqrtT(n2)+" = "+radT(s2,b)+", "+sqrtT(n3)+" = "+radT(s3,b)+". Add the like radicals: \\("+s1+" + "+s2+" + "+s3+" = "+sum+"\\), so the perimeter is <b>"+radT(sum,b)+" cm</b>. (Do not add the numbers under one root.)",
    {b:b,s:[s1,s2,s3]});
});
E("u4-width-radical",4,["1.6"],2,"gen",function(){
  var a=ri(2,5),b=pick([2,3,5,6,7]),c=ri(2,5),d=pick([2,3,5,6,7]);
  var bd=b*d,t=1,r0=bd,f;for(f=2;f*f<=r0;f++){while(r0%(f*f)===0){r0/=(f*f);t*=f;}}
  var keyW=radT(a,b);
  var candW=[[a,b*d],[a*c,b],[a*t,r0],[a,d],[a+1,b],[c,b],[a*c,b*d]],dsW=[];
  for(var ci=0;ci<candW.length&&dsW.length<3;ci++){var stW=radT(candW[ci][0],candW[ci][1]);if(stW!==keyW&&dsW.indexOf(stW)<0)dsW.push(stW);}
  return mcq("A rectangle has area \\("+(a*c)+"\\sqrt{"+bd+"}\\) \\(cm^2\\) and length "+radT(c,d)+" cm. What is its width, in simplest radical form?",
    keyW,
    dsW,
    "Width = area \\(\\div\\) length = \\("+(a*c)+"\\sqrt{"+bd+"} \\div "+c+"\\sqrt{"+d+"}\\). Divide the coefficients: \\("+(a*c)+" \\div "+c+" = "+a+"\\). Divide the radicals: \\(\\sqrt{"+bd+"} \\div \\sqrt{"+d+"} = \\sqrt{"+b+"}\\). So the width is <b>"+radT(a,b)+" cm</b>.",
    {a:a,b:b,c:c,d:d});
});

/* --- Unit 3: Quadratic Equations --- */
E("u3-equation-fraction-roots",3,["4.6"],2,"gen",function(){
  function gcd(x,y){x=Math.abs(x);y=Math.abs(y);while(y){var u=y;y=x%y;x=u;}return x;}
  function mkRoot(){var p,q,tries=0;do{p=pick([-3,-2,-1,1,2,3]);q=pick([2,3,4]);tries++;}while(gcd(p,q)!==1&&tries<40);return [p,q];}
  var r1=mkRoot(),r2=mkRoot(),tries=0;
  while(r1[0]*r2[1]+r2[0]*r1[1]===0&&tries<40){r2=mkRoot();tries++;}
  var p1=r1[0],q1=r1[1],p2=r2[0],q2=r2[1];
  var A=q1*q2,B=-(p1*q2+p2*q1),C=p1*p2;
  function fr(p,q){return (p<0?"-":"")+Math.abs(p)+"/"+q;}
  var key="\\("+quadB(A,B,C)+" = 0\\)";
  return mcq("Which quadratic equation has roots of \\("+frB(p1,q1)+"\\) and \\("+frB(p2,q2)+"\\)?",
    key,
    ["\\("+quadB(A,-B,C)+" = 0\\)","\\("+quadB(A,B,-C)+" = 0\\)","\\("+quadB(A,-B,-C)+" = 0\\)"],
    "Build the factors from the roots: \\(("+q1+"x "+(p1>0?"- "+p1:"+ "+(-p1))+")("+q2+"x "+(p2>0?"- "+p2:"+ "+(-p2))+") = 0\\). Expanding gives \\("+quadB(A,B,C)+" = 0\\), that is, <b>"+key+"</b>.",
    {A:A,B:B,C:C});
});
E("u3-solve-height",3,["4.3"],2,"gen",function(){
  var combos=[[1,4,40],[1,4,50],[1,5,40],[1,5,50],[1,5,60],[1,6,50],[1,6,60],[2,4,60],[2,4,80],[2,5,80],[1,7,60],[2,6,100]];
  var cb=pick(combos),t1=cb[0],t2=cb[1],H=cb[2];
  var b=5*(t1+t2),c0=H-5*t1*t2;
  var later=Math.random()<0.5;
  var ctx=pick([["missile","fired from a ship","above the water"],["rocket","launched from a platform","above the ground"],["flare","fired from a cliff top","above the sea"]]);
  var q=numq("A "+ctx[0]+" is "+ctx[1]+". Its height "+ctx[2]+" after t seconds is \\(h(t) = -5t^2 + "+b+"t + "+c0+"\\) (metres). At what time is it exactly "+H+" m "+ctx[2]+"? Give the "+(later?"later":"earlier")+" time, in s.",
    later?t2:t1,0.011,
    "Set \\(h(t) = "+H+"\\), then divide by \\(-5\\) and factor: \\[\\begin{aligned} -5t^2 + "+b+"t + "+c0+" &= "+H+" \\\\ -5t^2 + "+b+"t + "+(c0-H)+" &= 0 \\\\ t^2 - "+(t1+t2)+"t + "+(t1*t2)+" &= 0 \\\\ (t - "+t1+")(t - "+t2+") &= 0 \\end{aligned}\\] The "+ctx[0]+" is at "+H+" m at \\(t = "+t1+"\\) s and \\(t = "+t2+"\\) s; the "+(later?"later":"earlier")+" time is <b>\\("+(later?t2:t1)+"\\) s</b>.",
    {t1:t1,t2:t2,H:H,later:later});
  q.figure=trajSVG(-5,b,c0,{hline:H});
  return q;
});
E("u3-model-number",3,["4.3"],2,"var",varset([
  function(){return mcq("The product of two consecutive even integers is 120. If \\(x\\) is the smaller integer, which equation models this?",
    "\\(x(x + 2) = 120\\)",
    ["\\(x(x + 1) = 120\\)","\\((x + 2)(x + 2) = 120\\)","\\(x + (x + 2) = 120\\)"],
    "Consecutive even integers differ by \\(2\\), so the integers are \\(x\\) and \\(x + 2\\). Their product is \\(x(x + 2)\\), set equal to \\(120\\).",
    {});},
  function(){return mcq("The sum of the squares of two consecutive integers is 85. If \\(x\\) is the smaller integer, which equation models this?",
    "\\(x^2 + (x + 1)^2 = 85\\)",
    ["\\((x + (x + 1))^2 = 85\\)","\\(x^2 + (x + 2)^2 = 85\\)","\\(2x^2 = 85\\)"],
    "Consecutive integers are \\(x\\) and \\(x + 1\\). Square each, then add: \\(x^2 + (x + 1)^2 = 85\\).",
    {});},
  function(){return mcq("A rectangular room is 10 m by 8 m. A strip of width x metres is removed along one full length and one full width, making the room smaller on two adjacent sides. The new area is \\(48\\text{ m}^2\\). Which equation models this?",
    "\\((10 - x)(8 - x) = 48\\)",
    ["\\((10 - 2x)(8 - 2x) = 48\\)","\\((10 + x)(8 + x) = 48\\)","\\((10 - 2x)(8 - x) = 48\\)"],
    "Only one length and one width shrink, each by \\(x\\) (not \\(2x\\)): the new dimensions are \\((10 - x)\\) and \\((8 - x)\\), and their product is the new area, \\(48\\).",
    {});},
  function(){return mcq("A rectangle's length is 3 m more than its width. Its area is \\(40\\text{ m}^2\\). If \\(x\\) is the width, which equation models this?",
    "\\(x(x + 3) = 40\\)",
    ["\\(x + (x + 3) = 40\\)","\\(x^2 + 3 = 40\\)","\\((x - 3)x = 40\\)"],
    "The width is \\(x\\) and the length is \\(x + 3\\). Area = width \\(\\times\\) length = \\(x(x + 3) = 40\\).",
    {});}
]));

/* --- Unit 8: Properties of Angles and Triangles --- */
E("u8-congruence-deduce",8,["5.6"],1,"gen",function(){
  var sets=[["A","B","C"],["P","Q","R"],["X","Y","Z"],["D","E","F"],["M","N","S"],["J","K","L"]];
  var s1=pick(sets),s2=pick(sets.filter(function(x){return x!==s1;}));
  var name1=s1.join(""),name2=s2.join("");
  var corr="\\("+s1[0]+" \\leftrightarrow "+s2[0]+", "+s1[1]+" \\leftrightarrow "+s2[1]+", "+s1[2]+" \\leftrightarrow "+s2[2]+"\\)";
  var i=ri(0,2);
  if(Math.random()<0.5){
    var key="\\(\\angle "+s1[i]+" = \\angle "+s2[i]+"\\)";
    return mcq("Given \\(\\triangle "+name1+" \\cong \\triangle "+name2+"\\), which equality must be true?",
      key,
      ["\\(\\angle "+s1[i]+" = \\angle "+s2[(i+1)%3]+"\\)","\\(\\angle "+s1[i]+" = \\angle "+s2[(i+2)%3]+"\\)","\\(\\angle "+s1[(i+1)%3]+" = \\angle "+s2[i]+"\\)"],
      "In a congruence statement the vertices match in order: "+corr+". So \\(\\angle "+s1[i]+"\\) corresponds to \\(\\angle "+s2[i]+"\\), and corresponding angles of congruent triangles are equal.",
      {mode:"angle",s1:s1,s2:s2,i:i});
  }
  var sides=[[0,1],[1,2],[0,2]],sd=pick(sides),u=sd[0],v=sd[1],w=3-u-v;
  var keyS="\\("+s1[u]+s1[v]+" = "+s2[u]+s2[v]+"\\)";
  return mcq("Given \\(\\triangle "+name1+" \\cong \\triangle "+name2+"\\), which equality must be true?",
    keyS,
    ["\\("+s1[u]+s1[v]+" = "+s2[u]+s2[w]+"\\)","\\("+s1[u]+s1[v]+" = "+s2[v]+s2[w]+"\\)","\\("+s1[u]+s1[w]+" = "+s2[u]+s2[v]+"\\)"],
    "In a congruence statement the vertices match in order: "+corr+". Side \\("+s1[u]+s1[v]+"\\) joins the first-named corresponding vertices, so it matches side \\("+s2[u]+s2[v]+"\\), and corresponding sides of congruent triangles are equal.",
    {mode:"side",s1:s1,s2:s2,u:u,v:v});
});
E("u8-multi-angle",8,["5.8"],2,"var",varset([
  function(){return mcq("Two parallel lines are cut by a transversal. \\(\\angle x\\) is vertically opposite a \\(110^\\circ\\) angle. \\(\\angle y\\) is a corresponding angle to \\(\\angle x\\). \\(\\angle z\\) forms a co-interior pair with \\(\\angle y\\). What are the three measures?",
    "\\(\\angle x = 110^\\circ, \\angle y = 110^\\circ, \\angle z = 70^\\circ\\)",
    ["\\(\\angle x = 110^\\circ, \\angle y = 70^\\circ, \\angle z = 110^\\circ\\)","\\(\\angle x = 70^\\circ, \\angle y = 110^\\circ, \\angle z = 70^\\circ\\)","\\(\\angle x = 110^\\circ, \\angle y = 110^\\circ, \\angle z = 110^\\circ\\)"],
    "Vertically opposite angles are equal, so \\(\\angle x = 110^\\circ\\). Corresponding angles are equal, so \\(\\angle y = 110^\\circ\\). Co-interior angles are supplementary: \\(\\angle z = 180^\\circ - 110^\\circ = 70^\\circ\\).",
    {});},
  function(){return mcq("Two parallel lines are cut by a transversal. \\(\\angle x\\) is a corresponding angle to a \\(65^\\circ\\) angle. \\(\\angle y\\) sits beside \\(\\angle x\\) on a straight line. \\(\\angle z\\) is vertically opposite \\(\\angle y\\). What are the three measures?",
    "\\(\\angle x = 65^\\circ, \\angle y = 115^\\circ, \\angle z = 115^\\circ\\)",
    ["\\(\\angle x = 65^\\circ, \\angle y = 65^\\circ, \\angle z = 115^\\circ\\)","\\(\\angle x = 115^\\circ, \\angle y = 65^\\circ, \\angle z = 115^\\circ\\)","\\(\\angle x = 65^\\circ, \\angle y = 115^\\circ, \\angle z = 65^\\circ\\)"],
    "Corresponding angles are equal, so \\(\\angle x = 65^\\circ\\). Angles on a straight line add to \\(180^\\circ\\), so \\(\\angle y = 115^\\circ\\). Vertically opposite angles are equal, so \\(\\angle z = 115^\\circ\\).",
    {});},
  function(){return mcq("In \\(\\triangle ABC\\), \\(\\angle A = 48^\\circ\\) and \\(\\angle B = 67^\\circ\\). \\(\\angle D\\) is the exterior angle at \\(C\\), formed by extending side \\(BC\\). What are \\(\\angle C\\) and \\(\\angle D\\)?",
    "\\(\\angle C = 65^\\circ, \\angle D = 115^\\circ\\)",
    ["\\(\\angle C = 65^\\circ, \\angle D = 65^\\circ\\)","\\(\\angle C = 115^\\circ, \\angle D = 65^\\circ\\)","\\(\\angle C = 67^\\circ, \\angle D = 113^\\circ\\)"],
    "The interior angles add to \\(180^\\circ\\): \\(\\angle C = 180^\\circ - 48^\\circ - 67^\\circ = 65^\\circ\\). The exterior angle sits on a straight line with \\(\\angle C\\): \\(\\angle D = 180^\\circ - 65^\\circ = 115^\\circ\\) (which also equals \\(\\angle A + \\angle B\\)).",
    {});},
  function(){return mcq("Two parallel lines are cut by a transversal. \\(\\angle p\\) and a \\(72^\\circ\\) angle are alternate interior angles. \\(\\angle q\\) forms a co-interior pair with \\(\\angle p\\). \\(\\angle r\\) is vertically opposite \\(\\angle q\\). What are the three measures?",
    "\\(\\angle p = 72^\\circ, \\angle q = 108^\\circ, \\angle r = 108^\\circ\\)",
    ["\\(\\angle p = 72^\\circ, \\angle q = 72^\\circ, \\angle r = 108^\\circ\\)","\\(\\angle p = 108^\\circ, \\angle q = 72^\\circ, \\angle r = 72^\\circ\\)","\\(\\angle p = 72^\\circ, \\angle q = 108^\\circ, \\angle r = 72^\\circ\\)"],
    "Alternate interior angles are equal, so \\(\\angle p = 72^\\circ\\). Co-interior angles are supplementary: \\(\\angle q = 180^\\circ - 72^\\circ = 108^\\circ\\). Vertically opposite angles are equal, so \\(\\angle r = 108^\\circ\\).",
    {});}
]));
E("u8-triangle-algebra",8,["5.8"],2,"gen",function(){
  var combos=[[1,2,3],[1,2,6],[2,3,4],[1,3,5],[2,3,7],[3,4,5],[1,4,7],[2,5,8],[3,5,7],[4,5,9],[5,7,8],[1,1,4],[1,2,7],[1,3,6],[2,2,6],[3,3,4],[1,4,5],[2,4,9],[4,4,7],[1,5,9],[3,6,9],[4,6,8],[5,5,8],[2,7,11],[4,7,9],[6,6,8],[1,9,20],[5,10,15],[10,12,14],[9,13,14],[15,20,25],[20,25,45]];
  var cb=pick(combos),a=cb[0],b=cb[1],c=cb[2];
  var x=180/(a+b+c),vi=ri(0,2),coef=cb[vi];
  return numq("The three angles of a triangle measure \\(("+a+"x)^\\circ\\), \\(("+b+"x)^\\circ\\) and \\(("+c+"x)^\\circ\\). What is the measure of the \\(("+coef+"x)^\\circ\\) angle, in degrees?",
    coef*x,0.011,
    "The angles add to \\(180^\\circ\\): \\[\\begin{aligned} ("+a+" + "+b+" + "+c+")x &= 180 \\\\ "+(a+b+c)+"x &= 180 \\\\ x &= "+x+" \\end{aligned}\\] The angle asked for is \\("+coef+"x = "+coef+" \\times "+x+" = \\)<b>\\("+(coef*x)+"^\\circ\\)</b>.",
    {cb:cb,vi:vi});
});
E("u8-polygon-inverse",8,["5.5"],1,"gen",function(){
  var mode=ri(0,2);
  if(mode===0){
    var n=ri(5,40),S=(n-2)*180;
    return numq("The interior angles of a convex polygon add up to \\("+S+"^\\circ\\). How many sides does the polygon have?",
      n,0.011,"The sum is \\((n - 2) \\times 180^\\circ\\). So \\(n - 2 = "+S+" \\div 180 = "+(n-2)+"\\), which gives \\(n = \\)<b>\\("+n+"\\)</b>.",{mode:0,n:n});
  }
  if(mode===1){
    var pair=pick([[5,108],[6,120],[8,135],[9,140],[10,144],[12,150],[15,156],[18,160],[20,162],[24,165]]),n1=pair[0];
    return numq("Each interior angle of a regular polygon measures \\("+pair[1]+"^\\circ\\). How many sides does the polygon have?",
      n1,0.011,"For a regular polygon each interior angle is \\((n - 2) \\times 180^\\circ \\div n\\). Trying \\(n = "+n1+"\\): \\(("+n1+" - 2) \\times 180 \\div "+n1+" = "+pair[1]+"^\\circ\\). So \\(n = \\)<b>\\("+n1+"\\)</b>. (Equivalently, each exterior angle is \\(180^\\circ - "+pair[1]+"^\\circ = "+(180-pair[1])+"^\\circ\\), and \\(360 \\div "+(180-pair[1])+" = "+n1+"\\).)",{mode:1,n:n1});
  }
  var pr=pick([[4,90],[5,72],[6,60],[8,45],[9,40],[10,36],[12,30],[15,24],[18,20],[20,18],[24,15],[30,12],[36,10],[40,9],[45,8],[60,6],[72,5],[90,4],[120,3],[180,2]]),n2=pr[0];
  return numq("Each exterior angle of a regular polygon measures \\("+pr[1]+"^\\circ\\). How many sides does the polygon have?",
    n2,0.011,"The exterior angles of any convex polygon add to \\(360^\\circ\\). For a regular polygon they are all equal, so \\(n = 360 \\div "+pr[1]+" = \\)<b>\\("+n2+"\\)</b>.",{mode:2,n:n2});
});
E("u8-proof-reason",8,["5.4"],1,"var",varset([
  function(){return mcq("Lines \\(PQ\\) and \\(RS\\) are parallel, cut by a transversal. \\(\\angle a\\) is at the top right of the first intersection, and \\(\\angle b\\) is at the top right of the second intersection. A student writes: “\\(\\angle a = \\angle b\\) because they are alternate interior angles.” What is wrong with the reason?",
    "The angles are corresponding angles, not alternate interior angles",
    ["Nothing - the reason given is correct for these two angles","The angles are co-interior angles, not alternate interior angles","The angles are vertically opposite angles, not alternate interior angles"],
    "\\(\\angle a\\) and \\(\\angle b\\) sit in the same relative position (top right) at each intersection, which makes them corresponding angles. Alternate interior angles sit between the two lines, on opposite sides of the transversal. The equality is right; the named reason is wrong.",
    {});},
  function(){var q=mcq("Given \\(AB \\parallel CD\\) and \\(AE = DE\\), with \\(E\\) on the segment joining the two lines, a proof shows \\(\\triangle ABE \\cong \\triangle DCE\\). One step states \\(\\angle BAE = \\angle CDE\\). Which reason justifies that step?",
    "Alternate interior angles, because \\(AB \\parallel CD\\)",
    ["Vertically opposite angles at the crossing","Corresponding angles, because \\(AB \\parallel CD\\) holds here","Co-interior angles, because \\(AB \\parallel CD\\) - they add up"],
    "\\(\\angle BAE\\) and \\(\\angle CDE\\) lie between the parallel lines, on opposite sides of the transversal \\(AD\\) (the line through A, E and D), so they are alternate interior angles, which are equal when the lines are parallel. (Co-interior angles would be supplementary, not equal.)",
    {});q.figure=bowtieSVG();return q;},
  function(){var q=mcq("In the same proof (\\(AB \\parallel CD\\), \\(AE = DE\\), prove \\(\\triangle ABE \\cong \\triangle DCE\\)), another step states \\(\\angle AEB = \\angle CED\\). Which reason justifies that step?",
    "Vertically opposite angles",
    ["Alternate interior angles, because \\(AB \\parallel CD\\)","Given information stated","The SSS congruence postulate"],
    "\\(\\angle AEB\\) and \\(\\angle CED\\) are formed by the same two intersecting lines at point \\(E\\), directly across from each other \u2014 vertically opposite angles, which are always equal. No parallel lines are needed for this step.",
    {});q.figure=bowtieSVG();return q;}
]));

/* ============ Tranche 5 (Oct 26): Payne first, then HHM ============
   Templates reworked from Mr. Payne's chapter reviews (Ch 3 Trigonometry,
   Ch 8a Proportional Reasoning) and Jason's HHM archive (Ch 1 reasoning
   review + the inductive reasoning / counterexamples worksheet). New
   numbers and contexts throughout; nothing copied verbatim. Targets the
   thinnest units against the outline weights: U1, U6, U7. */

/* --- Unit 1: Acute Triangle Trigonometry (Payne Ch 3) --- */
E("u1-law-formula",1,["7.1","7.2"],1,"var",varset([
  function(){return mcq("In \\(\\triangle ABC\\), the sine law states \\(\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}\\). According to the sine law, side \\(a\\) equals…",
    "\\(\\frac{c \\sin A}{\\sin C}\\)",
    ["\\(\\frac{c \\sin C}{\\sin A}\\)","\\(\\frac{\\sin A}{c \\sin C}\\)","\\(\\frac{c \\sin B}{\\sin C}\\)"],
    "From \\(\\frac{a}{\\sin A} = \\frac{c}{\\sin C}\\), multiply both sides by \\(\\sin A\\): \\(a = \\frac{c \\sin A}{\\sin C}\\). Each side pairs with the sine of its OPPOSITE angle.",
    {});},
  function(){return mcq("According to the cosine law, \\(c^2\\) equals…",
    "\\(a^2 + b^2 - 2ab\\cos C\\)",
    ["\\(a^2 + b^2 + 2ab\\cos C\\)","\\(a^2 + b^2 - 2ab\\cos A\\)","\\(a^2 - b^2 - 2ab\\cos C\\)"],
    "The cosine law for side \\(c\\) uses the angle BETWEEN sides \\(a\\) and \\(b\\), which is \\(C\\): \\(c^2 = a^2 + b^2 - 2ab\\cos C\\). The sign before the cosine term is minus.",
    {});},
  function(){return mcq("All three sides of a triangle are known. To find angle \\(C\\) first, \\(\\cos C\\) equals…",
    "\\(\\frac{a^2 + b^2 - c^2}{2ab}\\)",
    ["\\(\\frac{c^2 - a^2 - b^2}{2ab}\\)","\\(\\frac{a^2 + c^2 - b^2}{2ac}\\)","\\(\\frac{a^2 + b^2 - c^2}{ab}\\)"],
    "Rearrange \\(c^2 = a^2 + b^2 - 2ab\\cos C\\): move terms to get \\(2ab\\cos C = a^2 + b^2 - c^2\\), then divide by \\(2ab\\). (The second option is the rearrangement for angle \\(B\\), not \\(C\\)).",
    {});},
  function(){return mcq("In \\(\\triangle ABC\\), the sine law states \\(\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}\\). According to the sine law, side \\(b\\) equals…",
    "\\(\\frac{a \\sin B}{\\sin A}\\)",
    ["\\(\\frac{a \\sin A}{\\sin B}\\)","\\(\\frac{\\sin B}{a \\sin A}\\)","\\(\\frac{a \\sin C}{\\sin B}\\)"],
    "From \\(\\frac{b}{\\sin B} = \\frac{a}{\\sin A}\\), multiply both sides by \\(\\sin B\\): \\(b = \\frac{a \\sin B}{\\sin A}\\). Side \\(b\\) pairs with angle \\(B\\), and the known pair is \\(a\\) with \\(A\\).",
    {});}
]));
E("u1-smallest-angle",1,["7.2"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var s,m,l,tries=0;
  do{
    s=ri(5,14);m=s+ri(1,8);l=m+ri(0,8);tries++;
  }while((s+m<=l||l>30)&&tries<60);
  var A=Math.acos((m*m+l*l-s*s)/(2*m*l))*180/Math.PI;
  var q=numq("A triangle has sides of \\("+s+"\\text{ cm}\\), \\("+m+"\\text{ cm}\\) and \\("+l+"\\text{ cm}\\). Find the measure of the SMALLEST angle, to the nearest degree.",
    Math.round(A),0.51,
    "The smallest angle is opposite the shortest side (\\("+s+"\\text{ cm}\\)). By the cosine law: \\(\\cos A = \\frac{"+m+"^2 + "+l+"^2 - "+s+"^2}{2 \\times "+m+" \\times "+l+"} = "+fmt((m*m+l*l-s*s)/(2*m*l),3)+"\\), so \\(A = \\)<b>\\("+Math.round(A)+"^\\circ\\)</b>. (Finding the angle opposite the longest side instead would give the LARGEST angle.)",
    {s:s,m:m,l:l});
  q.figure=triSVG(s,m,l,{L:["A","B","C"],ang:["?",null,null],side:[s+" cm",m+" cm",l+" cm"]});
  return q;
});
E("u1-angle-between-paths",1,["7.2"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var ctx=pick([["airplane","airport"],["boat","dock"],["airplane","airport"]]);
  var v1=pick([240,280,320,360,400,440,480,520]),v2=pick([240,280,320,360,400,440,480,520].filter(function(x){return x!==v1;}));
  var t=pick([0.5,1,1.5]),d1=v1*t,d2=v2*t;
  var th=ri(35,145);
  var D=Math.round(Math.sqrt(d1*d1+d2*d2-2*d1*d2*Math.cos(rd(th))));
  var ang=Math.acos((d1*d1+d2*d2-D*D)/(2*d1*d2))*180/Math.PI;
  return numq("Two "+ctx[0]+"s leave the same "+ctx[1]+" at the same time. One travels at "+v1+" km/h and the other at "+v2+" km/h, each in a straight line. After "+t+" h they are "+D+" km apart. Find the angle between their paths, to the nearest degree.",
    Math.round(ang),0.51,
    "In \\("+t+"\\text{ h}\\) the "+ctx[0]+"s travel \\("+v1+" \\times "+t+" = "+d1+"\\text{ km}\\) and \\("+v2+" \\times "+t+" = "+d2+"\\text{ km}\\), so the triangle has sides \\("+d1+"\\text{ km}\\), \\("+d2+"\\text{ km}\\) and \\("+D+"\\text{ km}\\). The angle between the paths is at the "+ctx[1]+", opposite the \\("+D+"\\text{ km}\\) side: \\(\\cos\\theta = \\frac{"+d1+"^2 + "+d2+"^2 - "+D+"^2}{2 \\times "+d1+" \\times "+d2+"}\\), giving \\(\\theta = \\)<b>\\("+Math.round(ang)+"^\\circ\\)</b>.",
    {d1:d1,d2:d2,D:D});
});
E("u1-guy-wire",1,["7.3"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var al=ri(42,72),be=ri(42,76),tries=0;
  while(Math.abs(al-be)<6&&tries<40){be=ri(42,76);tries++;}
  var h0=ri(18,55);
  var D=Math.round(h0*(1/Math.tan(rd(al))+1/Math.tan(rd(be)))*10)/10;
  var ssum=Math.sin(rd(al+be));
  var wL=D*Math.sin(rd(be))/ssum,wR=D*Math.sin(rd(al))/ssum;
  var h=wL*Math.sin(rd(al));
  var askWire=Math.random()<0.5;
  var longest=Math.max(wL,wR);
  var q=numq("A radio tower stands vertically between two ground anchors "+fmt(D,1)+" m apart. From the anchor on the left, the angle of elevation to the top of the tower is \\("+al+"^\\circ\\); from the anchor on the right, it is \\("+be+"^\\circ\\). Find "+(askWire?"the length of the LONGER support wire":"the height of the tower")+", to one decimal place, in m.",
    fmt(askWire?longest:h,1),0.06,
    "The two anchors and the tower top form a triangle with base \\("+fmt(D,1)+"\\text{ m}\\) and base angles \\("+al+"^\\circ\\) and \\("+be+"^\\circ\\), so the angle at the top is \\(180^\\circ - "+al+"^\\circ - "+be+"^\\circ = "+(180-al-be)+"^\\circ\\). By the sine law, the wire from the left anchor (opposite the \\("+be+"^\\circ\\) angle) is \\("+fmt(D,1)+" \\times \\frac{\\sin "+be+"^\\circ}{\\sin "+(al+be)+"^\\circ} = "+fmt(wL,1)+"\\text{ m}\\), and the wire from the right anchor is \\("+fmt(wR,1)+"\\text{ m}\\). The height is \\("+fmt(wL,1)+" \\times \\sin "+al+"^\\circ = "+fmt(h,1)+"\\text{ m}\\)."+(askWire?" The longer wire is the one opposite the larger base angle: <b>\\("+fmt(longest,1)+"\\text{ m}\\)</b>.":" So the height is <b>\\("+fmt(h,1)+"\\text{ m}\\)</b>."),
    {D:D,al:al,be:be,askWire:askWire});
  q.figure=triSVG(wR,D,wL,{L:["P","T","Q"],ang:[al+"\u00B0",null,be+"\u00B0"],side:[null,fmt(D,1)+" m",null]});
  return q;
});

/* --- Unit 6: Proportional Reasoning (Payne Ch 8a) --- */
E("u6-pack-cost",6,["6.17"],2,"gen",function(){
  var ctx=pick([
    {item:"bottles of cola",pack:6,use:"fill the store cooler"},
    {item:"juice boxes",pack:8,use:"stock the school canteen"},
    {item:"granola bars",pack:12,use:"pack the hiking kits"},
    {item:"AA batteries",pack:4,use:"supply the science fair"},
    {item:"yogurt cups",pack:10,use:"fill the cafeteria fridge"},
    {item:"muffins",pack:6,use:"stock the bake sale table"}
  ]);
  var price=ri(2,12)+pick([0.25,0.49,0.5,0.75,0.79,0.89,0.99]);
  var need=ri(60,240);
  var packs=Math.ceil(need/ctx.pack);
  var total=packs*price;
  return numq(ctx.item.charAt(0).toUpperCase()+ctx.item.slice(1)+" are sold only in packs of "+ctx.pack+", at $"+fmt(price,2)+" per pack. A manager needs at least "+need+" to "+ctx.use+". What is the total cost, in dollars?",
    fmt(total,2),0.011,
    "Packs needed: \\("+need+" \\div "+ctx.pack+" = "+fmt(need/ctx.pack,2)+"\\), and part-packs cannot be bought, so round UP to \\("+packs+"\\) packs. Total cost: \\("+packs+" \\times \\$"+fmt(price,2)+" = \\)<b>\\(\\$"+fmt(total,2)+"\\)</b>.",
    {pack:ctx.pack,price:price,need:need});
});
E("u6-rate-difference",6,["6.16"],2,"gen",function(){
  var frames=[
    {a:"Maya",b:"Leo",verb:"sent",thing:"text messages",per:"day",unit:"texts",periods:[5,7,10,14,20,28,31],rMin:80,rMax:220},
    {a:"Priya",b:"Owen",verb:"read",thing:"pages",per:"day",unit:"pages",periods:[4,5,6,7,10,14],rMin:25,rMax:90},
    {a:"Sofia",b:"Liam",verb:"swam",thing:"laps",per:"hour",unit:"laps",periods:[2,3,4,5,6,8],rMin:18,rMax:45}
  ];
  var F=pick(frames);
  var r1=ri(F.rMin,F.rMax),diff=ri(8,40),r2=r1+(Math.random()<0.5?diff:-diff),tries=0;
  while((r2<F.rMin||r2>F.rMax)&&tries<40){r2=r1+(Math.random()<0.5?diff:-diff);tries++;}
  var p1=pick(F.periods),p2=pick(F.periods);
  var T1=r1*p1,T2=r2*p2;
  var winA=r1>r2,win=winA?F.a:F.b,lose=winA?F.b:F.a;
  return mcq(F.a+" "+F.verb+" "+T1+" "+F.thing+" in "+p1+" "+F.per+"s. "+F.b+" "+F.verb+" "+T2+" "+F.thing+" in "+p2+" "+F.per+"s. Who has the higher rate, and by how many "+F.unit+" per "+F.per+"?",
    win+", by \\("+diff+"\\) per "+F.per,
    [lose+", by \\("+diff+"\\) per "+F.per,win+", by \\("+(diff+5)+"\\) per "+F.per,lose+", by \\("+(diff+5)+"\\) per "+F.per],
    F.a+"'s rate: \\("+T1+" \\div "+p1+" = "+r1+"\\text{ "+F.unit+" per "+F.per+"}\\). "+F.b+"'s rate: \\("+T2+" \\div "+p2+" = "+r2+"\\text{ "+F.unit+" per "+F.per+"}\\). The higher rate is "+win+"'s, by \\("+Math.max(r1,r2)+" - "+Math.min(r1,r2)+" = \\)<b>\\("+diff+"\\text{ per "+F.per+"}\\)</b>.",
    {r1:r1,r2:r2});
});
E("u6-poster-dimensions",6,["6.14"],2,"gen",function(){
  function trimNum(x){var s=fmt(x,2);if(s.indexOf(".")>=0)s=s.replace(/0+$/,"").replace(/\.$/,"");return s;}
  var w=ri(6,20),h=ri(6,20),k=pick([1.5,2,2.5,3,3.5,4,5]);
  var oldA=w*h,newA=k*k*oldA;
  var key="\\("+trimNum(w*k)+"\\text{ cm by }"+trimNum(h*k)+"\\text{ cm}\\)";
  var cand=[[w*k*k,h*k*k],[h*k,w*k],[w*(k+1),h*(k+1)],[w*k,h],[w,h*k],[w*2*k,h*2*k]],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){var st="\\("+trimNum(cand[i][0])+"\\text{ cm by }"+trimNum(cand[i][1])+"\\text{ cm}\\)";if(st!==key&&ds.indexOf(st)<0)ds.push(st);}
  return mcq("A rectangular crest measuring "+w+" cm by "+h+" cm is enlarged to make a poster with an area of \\("+trimNum(newA)+"\\text{ cm}^2\\). What are the dimensions of the poster?",
    key,ds,
    "The original area is \\("+w+" \\times "+h+" = "+oldA+"\\text{ cm}^2\\). The area scale factor is \\("+trimNum(newA)+" \\div "+oldA+" = "+trimNum(k*k)+"\\), so the LINEAR scale factor is \\(\\sqrt{"+trimNum(k*k)+"} = "+trimNum(k)+"\\). Multiply each dimension by \\("+trimNum(k)+"\\): \\("+w+" \\times "+trimNum(k)+" = "+trimNum(w*k)+"\\text{ cm}\\) and \\("+h+" \\times "+trimNum(k)+" = "+trimNum(h*k)+"\\text{ cm}\\). The poster is <b>"+key+"</b>.",
    {w:w,h:h,k:k});
});
E("u6-tile-cost",6,["6.14","6.17"],2,"gen",function(){
  var frames=[
    {room:"bathroom floor",scale:12,scaleTxt:"1 unit = 12 inches",tile:6,tileTxt:"6 in. by 6 in.",unit:"in."},
    {room:"kitchen floor",scale:12,scaleTxt:"1 unit = 12 inches",tile:12,tileTxt:"12 in. by 12 in.",unit:"in."},
    {room:"patio",scale:30,scaleTxt:"1 unit = 30 cm",tile:15,tileTxt:"15 cm by 15 cm",unit:"cm"},
    {room:"deck",scale:30,scaleTxt:"1 unit = 30 cm",tile:30,tileTxt:"30 cm by 30 cm",unit:"cm"}
  ];
  var F=pick(frames);
  var W=pick([6,8,9,10,12,15]),H=pick([6,8,9,10,12]);
  var realW=W*F.scale,realH=H*F.scale;
  var across=realW/F.tile,along=realH/F.tile,count=across*along;
  var price=pick([0.79,0.99,1.25,1.49,2.29]);
  var total=count*price;
  return numq("A floor plan for a "+F.room+" has a scale of "+F.scaleTxt+". On the plan the room measures "+W+" units by "+H+" units. It will be covered with square tiles measuring "+F.tileTxt+", costing $"+fmt(price,2)+" each. What is the total cost of the tiles, in dollars?",
    fmt(total,2),0.011,
    "Real dimensions: \\("+W+" \\times "+F.scale+" = "+realW+"\\text{ "+F.unit+"}\\) by \\("+H+" \\times "+F.scale+" = "+realH+"\\text{ "+F.unit+"}\\). Tiles along each side: \\("+realW+" \\div "+F.tile+" = "+across+"\\) and \\("+realH+" \\div "+F.tile+" = "+along+"\\), so \\("+across+" \\times "+along+" = "+count+"\\) tiles. Total cost: \\("+count+" \\times \\$"+fmt(price,2)+" = \\)<b>\\(\\$"+fmt(total,2)+"\\)</b>.",
    {W:W,H:H,count:count,price:price});
});

/* --- Unit 7: Reasoning (HHM Ch 1 archive) --- */
E("u7-race-order",7,["2.3"],2,"gen",function(){
  var pools=[["Amara","Devon","Priya","Tom"],["Liam","Sofia","Noah","Emma"],["Kai","Ruth","Omar","Zoe"],["Maya","Eli","Nina","Sam"]];
  var names=pick(pools).slice();
  function perms(a){if(a.length<2)return [a.slice()];var out=[];for(var i=0;i<a.length;i++){var rest=a.slice(0,i).concat(a.slice(i+1));perms(rest).forEach(function(p){out.push([a[i]].concat(p));});}return out;}
  var ALL=perms(names);
  function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
  var order=null,clues=null,tries=0;
  while(!clues&&tries<40){
    tries++;
    var ord=shuffle(names.slice());
    var cand=[];
    (function(){for(var i=0;i<3;i++){var x=ord[i],y=ord[i+1];cand.push({t:x+" finished immediately ahead of "+y+".",f:(function(x,y){return function(o){return o.indexOf(x)===o.indexOf(y)-1;};})(x,y)});}})();
    [[0,2],[0,3],[1,3]].forEach(function(pr){var x=ord[pr[0]],y=ord[pr[1]];cand.push({t:x+" finished ahead of "+y+".",f:(function(x,y){return function(o){return o.indexOf(x)<o.indexOf(y);};})(x,y)});});
    [[1,0,3],[2,0,3],[1,0,2],[2,1,3]].forEach(function(tr){var x=ord[tr[0]],y=ord[tr[1]],z=ord[tr[2]];cand.push({t:x+" finished between "+y+" and "+z+".",f:(function(x,y,z){return function(o){var ix=o.indexOf(x);return (o.indexOf(y)<ix&&ix<o.indexOf(z))||(o.indexOf(z)<ix&&ix<o.indexOf(y));};})(x,y,z)});});
    (function(x){cand.push({t:x+" did not finish first.",f:function(o){return o[0]!==x;}});})(ord[1]);
    (function(x){cand.push({t:x+" did not finish last.",f:function(o){return o[3]!==x;}});})(ord[2]);
    for(var a1=0;a1<cand.length&&!clues;a1++)for(var b1=a1+1;b1<cand.length&&!clues;b1++)for(var c1=b1+1;c1<cand.length&&!clues;c1++){
      var set=[cand[a1],cand[b1],cand[c1]];
      var n=ALL.filter(function(o){return set.every(function(c){return c.f(o);});}).length;
      if(n===1){order=ord;clues=set;}
    }
    if(!clues&&tries===40){
      order=ord;
      clues=[0,1,2].map(function(i){var x=ord[i],y=ord[i+1];return {t:x+" finished immediately ahead of "+y+".",f:(function(x,y){return function(o){return o.indexOf(x)===o.indexOf(y)-1;};})(x,y)};});
    }
  }
  var askPos=ri(0,3),ordinals=["first","second","third","fourth"];
  var others=names.filter(function(n){return n!==order[askPos];});
  return mcq("Four runners \u2014 "+names.join(", ")+" \u2014 finished a race in some order. Clues: (1) "+clues[0].t+" (2) "+clues[1].t+" (3) "+clues[2].t+" Who finished "+ordinals[askPos]+"?",
    order[askPos],others,
    "Testing the orders against all three clues, only one order fits: 1st "+order[0]+", 2nd "+order[1]+", 3rd "+order[2]+", 4th "+order[3]+". So "+ordinals[askPos]+" place went to <b>"+order[askPos]+"</b>.",
    {order:order,askPos:askPos,solutions:1});
});
E("u7-everyday-counterexample",7,["2.4"],1,"var",varset([
  function(){return mcq("Conjecture: \u201CAny piece of furniture with four legs is a chair.\u201D Which of the following is a counterexample?",
    "A dining table (a piece of furniture with four legs)",
    ["A chair with four legs and a padded seat at the table","A three-legged stool with a round wooden seat","A bookshelf with no legs, fixed flat against the wall"],
    "A counterexample must satisfy the condition (furniture with four legs) but break the conclusion (not a chair). A dining table does both. The stool and bookshelf never meet the four-leg condition, and the chair is just an example that agrees.",
    {});},
  function(){return mcq("Conjecture: \u201CIf the grass is wet, then it rained last night.\u201D Which of the following is a counterexample?",
    "The grass is wet because the sprinkler ran this morning",
    ["It rained last night and the grass is wet","The grass is dry and it did not rain last night","Rain is in the forecast for tonight, starting after midnight"],
    "A counterexample needs wet grass WITHOUT last night's rain. The sprinkler gives exactly that: the condition (wet grass) holds, but the conclusion (it rained) is false.",
    {});},
  function(){return mcq("Conjecture: \u201CIf something has a knob, then it is a door.\u201D Which of the following is a counterexample?",
    "A stove, which has control knobs",
    ["A door with a round metal knob","A window with no knob at all","A door with a lever handle instead of a knob"],
    "The stove has knobs (condition met) but is not a door (conclusion broken) \u2014 a true counterexample. The lever-handled door never meets the \u201Chas a knob\u201D condition.",
    {});},
  function(){return mcq("Conjecture: \u201CAll students at the school play a sport.\u201D Which of the following is a counterexample?",
    "One student at the school is in the chess club and plays no sport",
    ["Many students at the school play hockey on the school team each winter","One student at the school plays two sports, both hockey and soccer","A teacher at the school plays no sport and coaches no team either"],
    "To disprove \u201Call students,\u201D one student who plays no sport is enough. The teacher is not a student, so that option does not touch the claim.",
    {});}
]));
E("u7-pattern-equation",7,["2.1"],2,"var",varset([
  function(){return mcq("Look at the pattern: \\(37 \\times 3 = 111\\), \\(37 \\times 6 = 222\\), \\(37 \\times 9 = 333\\), \\(37 \\times 12 = 444\\). What is the next equation in the pattern?",
    "\\(37 \\times 15 = 555\\)",
    ["\\(37 \\times 13 = 481\\)","\\(37 \\times 15 = 505\\)","\\(37 \\times 18 = 666\\)"],
    "The multipliers grow by \\(3\\) (\\(3, 6, 9, 12, \\ldots\\)) and the products are \\(111, 222, 333, 444, \\ldots\\). Next multiplier: \\(15\\), and \\(37 \\times 15 = 555\\), continuing the repeated-digit pattern.",
    {});},
  function(){return mcq("Look at the pattern: \\(11^2 = 121\\), \\(111^2 = 12321\\), \\(1111^2 = 1234321\\). What is the next equation in the pattern?",
    "\\(11111^2 = 123454321\\)",
    ["\\(11111^2 = 12344321\\)","\\(1111^2 = 123454321\\)","\\(11111^2 = 12345654321\\)"],
    "Each base gains another digit \\(1\\), and the square counts up to the number of \\(1\\)s and back down: five \\(1\\)s give \\(123454321\\) (up to \\(5\\) and back). The last option counts to \\(6\\), which belongs to the following step, \\(111111^2\\).",
    {});},
  function(){return mcq("Look at the pattern: \\(12345679 \\times 9 = 111{,}111{,}111\\); \\(12345679 \\times 18 = 222{,}222{,}222\\); \\(12345679 \\times 27 = 333{,}333{,}333\\). What is the next equation in the pattern?",
    "\\(12345679 \\times 36 = 444{,}444{,}444\\)",
    ["\\(12345679 \\times 36 = 44{,}444{,}444\\)","\\(12345679 \\times 45 = 444{,}444{,}444\\)","\\(12345679 \\times 36 = 454{,}545{,}454\\)"],
    "The multipliers are multiples of \\(9\\) (\\(9, 18, 27, \\ldots\\)) and each product repeats the digit matching the multiple: \\(36 = 4 \\times 9\\), so the product is nine \\(4\\)s: \\(444{,}444{,}444\\).",
    {});}
]));
E("u7-counterexample-claims",7,["2.4"],1,"var",varset([
  function(){return mcq("Conjecture: \u201CIf a number is divisible by \\(4\\), then it is divisible by \\(8\\).\u201D Which number is a counterexample?",
    "\\(12\\)",
    ["\\(16\\)","\\(24\\)","\\(40\\)"],
    "\\(12\\) is divisible by \\(4\\) (\\(12 \\div 4 = 3\\)) but not by \\(8\\), so it breaks the claim. The other options are all divisible by \\(8\\), so they agree with the claim instead of disproving it.",
    {});},
  function(){return mcq("Conjecture: \u201CThe sum of any two prime numbers is even.\u201D Which calculation is a counterexample?",
    "\\(2 + 3 = 5\\)",
    ["\\(3 + 5 = 8\\)","\\(5 + 7 = 12\\)","\\(7 + 11 = 18\\)"],
    "\\(2\\) and \\(3\\) are both prime, but their sum, \\(5\\), is odd — one counterexample disproves the claim. (\\(2\\) is the only even prime, which is why it is the one that breaks this.) The other pairs all give even sums.",
    {});},
  function(){return mcq("Conjecture: \u201CEvery multiple of \\(5\\) ends in the digit \\(5\\).\u201D Which number is a counterexample?",
    "\\(20\\)",
    ["\\(15\\)","\\(25\\)","\\(12\\)"],
    "\\(20\\) is a multiple of \\(5\\) but ends in \\(0\\), breaking the claim. \\(15\\) and \\(25\\) end in \\(5\\) so they agree; \\(12\\) is not a multiple of \\(5\\) at all, so it cannot test the claim.",
    {});},
  function(){return mcq("Conjecture: \u201CIf \\(x^2 = 16\\), then \\(x = 4\\).\u201D Which value is a counterexample?",
    "\\(x = -4\\)",
    ["\\(x = 4\\)","\\(x = 16\\)","\\(x = -16\\)"],
    "\\((-4)^2 = 16\\), so \\(x = -4\\) meets the condition \\(x^2 = 16\\) but breaks the conclusion \\(x = 4\\). The values \\(16\\) and \\(-16\\) do not satisfy \\(x^2 = 16\\) in the first place.",
    {});},
  function(){return mcq("Conjecture: \u201CThe product of two numbers is always greater than each of the two numbers.\u201D Which calculation is a counterexample?",
    "\\(6 \\times \\frac{1}{2} = 3\\)",
    ["\\(3 \\times 4 = 12\\)","\\(\\frac{3}{2} \\times 2 = 3\\)","\\(10 \\times 1.1 = 11\\)"],
    "\\(6 \\times \\frac{1}{2} = 3\\), and \\(3\\) is NOT greater than \\(6\\), so the claim fails — multiplying by a fraction between \\(0\\) and \\(1\\) shrinks the number. In each other calculation the product is greater than both factors.",
    {});}
]));

/* ============ Tranche 6 (Oct 27): finish-line pass, tranche 1 of 3 ============
   Units 2, 3, 4, 8 +4 each (bank 161 -> 177). Templates reworked from the
   inventoried-but-unbuilt stock (batch5 / QE RHS / HHM families, mapped by
   topic); every item re-created with new numbers and contexts, nothing
   copied verbatim. Fixes level mix: adds a Level 3 for Units 2, 4 and 8
   (Unit 8's first Level 3 entry). */

/* --- Unit 2: Quadratic Functions --- */
E("u2-y-intercept",2,["4.4"],1,"gen",function(){
  var a,b,c,ds,tries=0;
  do{
    a=ri(1,6)*(Math.random()<0.4?-1:1);b=ri(-9,9);c=ri(-12,12);tries++;
    var cand=[b,a,a+b+c,-c,b+c,c+2,c-2];ds=[];
    for(var i=0;i<cand.length&&ds.length<3;i++){var v=String(cand[i]);if(cand[i]!==c&&ds.indexOf(v)<0)ds.push(v);}
  }while((b===0||c===0||ds.length<3)&&tries<80);
  return mcq("What is the y-intercept of the graph of \\(y = "+quadB(a,b,c)+"\\)?",
    "\\("+c+"\\)",ds.map(function(v){return "\\("+v+"\\)";}),
    "The y-intercept is the value of \\(y\\) when \\(x = 0\\). Substituting \\(x = 0\\) leaves only the constant term: \\(y = \\)<b>\\("+c+"\\)</b>.",
    {a:a,b:b,c:c});
});
E("u2-mirror-point",2,["4.13"],2,"gen",function(){
  var h=ri(-6,8),d=ri(1,9),x1=h+(Math.random()<0.5?d:-d),x2=2*h-x1,y=ri(3,45);
  var q=numq("A parabola has axis of symmetry \\(x = "+h+"\\). The point \\(("+x1+", "+y+")\\) lies on the parabola. Another point on the parabola has the same y-value. What is its x-coordinate?",
    x2,0.011,
    "Points with the same y-value sit symmetrically about the axis \\(x = "+h+"\\). The given point is \\("+Math.abs(x1-h)+"\\) units from the axis, so the mirror point is \\("+Math.abs(x1-h)+"\\) units on the other side: \\(x = "+h+" "+(x2>h?"+":"-")+" "+Math.abs(x2-h)+" = \\)<b>\\("+x2+"\\)</b>. (Check: the axis is the midpoint, \\(\\frac{"+x1+" + "+x2+"}{2} = "+h+"\\).)",
    {h:h,x1:x1,x2:x2,y:y});
  q.figure=parMirrorSVG(h,x1,y);
  return q;
});
E("u2-vertex-time",2,["4.2"],2,"gen",function(){
  var k=ri(4,18),B=5*k,C=ri(1,25);
  var ctx=pick(["ball thrown into the air","fountain jet","model rocket","firework shell"]);
  var q=numq("The height of a "+ctx+" is \\(h(t) = -5t^2 + "+B+"t + "+C+"\\) metres, \\(t\\) seconds after it is launched. At what time does it reach its maximum height, in seconds?",
    k/2,0.011,
    "The maximum occurs at the vertex, where \\(t = \\frac{-B}{2 \\times -5} = \\frac{"+B+"}{10} = \\)<b>\\("+fmt(k/2,1)+"\\text{ s}\\)</b>.",
    {B:B,C:C,k:k,ans:k/2});
  q.figure=trajSVG(-5,B,C);
  return q;
});
E("u2-fence-max",2,["4.2"],3,"gen",function(){
  var k=ri(6,20),P=4*k,mode=ri(0,1),area=2*k*k;
  var ctx=pick([["rectangular garden","a house wall"],["rectangular dog pen","a barn wall"],["rectangular patio","an existing fence"],["rectangular chicken run","a shed wall"]]);
  var prompt="A "+ctx[0]+" is built against "+ctx[1]+", so fencing is needed on only three sides. A total of "+P+" m of fencing is available. ";
  if(mode===0)prompt+="What is the greatest area that can be enclosed, in \\(m^2\\)?";
  else prompt+="How wide should it be (each side perpendicular to the wall) to enclose the greatest possible area, in metres?";
  var q=numq(prompt,mode===0?area:k,0.011,
    "Let the two sides perpendicular to the wall each be \\(x\\) m. The side parallel to the wall is \\("+P+" - 2x\\), so the area is \\(A(x) = x("+P+" - 2x) = -2x^2 + "+P+"x\\). The vertex is at \\(x = \\frac{"+P+"}{4} = "+k+"\\) m, giving a parallel side of \\("+P+" - 2 \\times "+k+" = "+(2*k)+"\\) m and a maximum area of \\("+k+" \\times "+(2*k)+" = \\)<b>\\("+area+"\\text{ m}^2\\)</b>."+(mode===1?" The width at the maximum is <b>\\("+k+"\\text{ m}\\)</b>.":""),
    {P:P,k:k,mode:mode,area:area,width:k});
  q.figure=fenceSVG(P,ctx[1].replace(/^(a|an) /,""));
  return q;
});

/* --- Unit 3: Quadratic Equations --- */
E("u3-roots-sum-product",3,["4.6"],1,"gen",function(){
  var pool=[-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8];
  var r1=pick(pool),r2=pick(pool.filter(function(x){return x!==r1;}));
  var B=-(r1+r2),C=r1*r2,mode=Math.random()<0.5?"sum":"product";
  var key=mode==="sum"?r1+r2:r1*r2;
  var cand=[B,-B,C,-C,key+1,key-1,key+2,key-2,r1-r2,r2-r1],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){var v=String(cand[i]);if(cand[i]!==key&&ds.indexOf(v)<0)ds.push(v);}
  return mcq("For the equation "+"\\("+quadB(1,B,C)+" = 0\\)"+", what is the "+mode+" of the roots?",
    "\\("+key+"\\)",ds.map(function(v){return "\\("+v+"\\)";}),
    "The equation factors as \\((x "+(r1>0?"- "+r1:"+ "+(-r1))+")(x "+(r2>0?"- "+r2:"+ "+(-r2))+") = 0\\), so the roots are \\("+r1+"\\) and \\("+r2+"\\). Their "+mode+" is \\("+(mode==="sum"?r1+" + "+r2:r1+" \\times "+r2)+" = "+key+"\\). (In general, for \\(x^2 + bx + c\\) the sum of the roots is \\(-b\\) and the product is \\(c\\).)",
    {r1:r1,r2:r2,B:B,C:C,mode:mode,key:key});
});
E("u3-factor-nonmonic",3,["PK.2"],2,"gen",function(){
  function lin(cf,tm){return (cf===1?"x":cf+"x")+(tm>0?" + "+tm:" - "+(-tm));}
  function expand(t){return [t[0]*t[2], t[0]*t[3]+t[1]*t[2], t[1]*t[3]];}
  var p,q,r,s,A,B,C,tries=0;
  do{
    p=ri(1,3);q=ri(1,3);r=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]);s=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]);
    A=p*q;B=p*s+r*q;C=r*s;tries++;
  }while((B===0||A===1)&&tries<80); /* B = 0 is a difference of squares: the sign-flip distractors collapse there (it has its own entry in tranche 7) */
  var key="\\(("+lin(p,r)+")("+lin(q,s)+")\\)";
  var cands=[[p,-r,q,s],[p,r,q,-s],[p,-r,q,-s],[q,r,p,s],[q,-r,p,-s],[p,-s,q,-r]],ds=[];
  for(var i=0;i<cands.length&&ds.length<3;i++){
    var ex=expand(cands[i]);if(ex[0]===A&&ex[1]===B&&ex[2]===C)continue;
    var st="\\(("+lin(cands[i][0],cands[i][1])+")("+lin(cands[i][2],cands[i][3])+")\\)";
    if(st!==key&&ds.indexOf(st)<0)ds.push(st);
  }
  return mcq("Factor fully: "+quadT(A,B,C)+".",
    key,ds,
    "Look for a factor pair whose cross-products add to \\("+B+"\\): \\(("+lin(p,r)+")("+lin(q,s)+")\\) expands to \\("+quadB(A,B,C)+"\\). So the factored form is <b>"+key+"</b>.",
    {p:p,r:r,q:q,s:s,A:A,B:B,C:C});
});
E("u3-standard-coeffs",3,["4.9"],1,"gen",function(){
  var A=ri(2,6),B=ri(-9,9),K=ri(-12,12),tries=0;
  while((B===0||K===0)&&tries<40){B=ri(-9,9);K=ri(-12,12);tries++;}
  var key="\\(a = "+A+", \\; b = "+B+", \\; c = "+(-K)+"\\)";
  var cand=["\\(a = "+A+", \\; b = "+B+", \\; c = "+K+"\\)","\\(a = "+A+", \\; b = "+(-B)+", \\; c = "+(-K)+"\\)","\\(a = "+B+", \\; b = "+A+", \\; c = "+(-K)+"\\)","\\(a = 1, \\; b = "+B+", \\; c = "+(-K)+"\\)"],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  return mcq("The equation \\("+quadB(A,B,0)+" = "+K+"\\) is to be solved with the quadratic formula. When it is written in standard form \\(ax^2 + bx + c = 0\\), what are a, b and c?",
    key,ds,
    "Move every term to the left: \\("+quadB(A,B,0)+" - ("+K+") = 0\\), that is, \\("+quadB(A,B,-K)+" = 0\\). Reading off the coefficients: <b>"+key+"</b>. The constant changes sign when it crosses the equals sign.",
    {A:A,B:B,K:K});
});
E("u3-two-numbers",3,["4.3"],2,"gen",function(){
  var mode=pick([["consecutive integers",1],["consecutive even integers",2],["consecutive odd integers",2]]);
  var n,step=mode[1];
  if(mode[0].indexOf("even")>=0)n=2*ri(3,20);
  else if(mode[0].indexOf("odd")>=0)n=2*ri(3,20)-1;
  else n=ri(4,30);
  var N=n*(n+step);
  return numq("The product of two positive "+mode[0]+" is "+N+". What is the smaller of the two integers?",
    n,0.011,
    "Let the smaller integer be \\(x\\); the next one is \\(x + "+step+"\\). Then \\[\\begin{aligned} x(x + "+step+") &= "+N+" \\\\ x^2 + "+step+"x - "+N+" &= 0 \\\\ (x - "+n+")(x + "+(n+step)+") &= 0 \\end{aligned}\\] The positive root is \\(x = "+n+"\\) (the other root, \\(-"+(n+step)+"\\), is rejected because the integers are positive). The two integers are \\("+n+"\\) and \\("+(n+step)+"\\), and indeed \\("+n+" \\times "+(n+step)+" = "+N+"\\).",
    {n:n,step:step,N:N,mode:mode[0]});
});

/* --- Unit 4: Radicals --- */
E("u4-evaluate-mixed",4,["1.2"],1,"gen",function(){
  var a=ri(3,15),b=ri(2,9),c=ri(2,12),tries=0;
  while(c>=a+b&&tries<40){c=ri(2,12);tries++;}
  var ans=a+b-c;
  return numq("Evaluate: \\(\\sqrt{"+(a*a)+"} + \\sqrt[3]{"+(b*b*b)+"} - \\sqrt{"+(c*c)+"}\\).",
    ans,0.011,
    "\\(\\sqrt{"+(a*a)+"} = "+a+"\\) because \\("+a+"^2 = "+(a*a)+"\\); \\(\\sqrt[3]{"+(b*b*b)+"} = "+b+"\\) because \\("+b+"^3 = "+(b*b*b)+"\\); \\(\\sqrt{"+(c*c)+"} = "+c+"\\). So the value is \\("+a+" + "+b+" - "+c+"\\) = <b>\\("+ans+"\\)</b>.",
    {a:a,b:b,c:c,ans:ans});
});
E("u4-divide-radicals",4,["1.6"],2,"gen",function(){
  var m=pick([2,3,5,6,7,10,11,13,14,15]),k=ri(2,6),d0=ri(2,9);
  var A=d0*k*k*m,B=d0;
  var key=radT(k,m);
  var cand=[radT(k+1,m),radT(k,m+1),sqrtT(k*k*m),radT(k*k,m),radT(k,m+2)],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  return mcq("Simplify: \\(\\frac{\\sqrt{"+A+"}}{\\sqrt{"+B+"}}\\). Give the answer in simplest radical form.",
    key,ds,
    "Combine under one root, then simplify (\\("+(k*k)+"\\) is a perfect square factor): \\[\\begin{aligned} \\frac{\\sqrt{"+A+"}}{\\sqrt{"+B+"}} &= \\sqrt{\\frac{"+A+"}{"+B+"}} \\\\ &= \\sqrt{"+(k*k*m)+"} \\\\ &= "+k+"\\sqrt{"+m+"} \\end{aligned}\\] In simplest form: <b>"+key+"</b>.",
    {A:A,B:B,k:k,m:m,d0:d0});
});
E("u4-rationalize-coefficient",4,["1.7"],1,"gen",function(){
  function gcd(x,y){while(y){var u=y;y=x%y;x=u;}return x;}
  var c,m,N,tries=0;
  do{c=ri(2,5);m=pick([2,3,5,6,7,10,11,13]);N=ri(2,11);tries++;}while(gcd(N,c*m)!==1&&tries<80);
  var key="\\(\\frac{"+N+"\\sqrt{"+m+"}}{"+(c*m)+"}\\)";
  var cand=["\\(\\frac{"+N+"\\sqrt{"+m+"}}{"+c+"}\\)","\\(\\frac{"+(N*m)+"\\sqrt{"+m+"}}{"+(c*m)+"}\\)","\\(\\frac{"+N+"}{"+(c*m)+"}\\)","\\(\\frac{"+N+"\\sqrt{"+m+"}}{"+(c+m)+"}\\)"],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  return mcq("Rationalize the denominator and simplify: \\(\\frac{"+N+"}{"+c+"\\sqrt{"+m+"}}\\).",
    key,ds,
    "Multiply the numerator and denominator by \\(\\sqrt{"+m+"}\\): the denominator becomes \\("+c+" \\times \\sqrt{"+m+"} \\times \\sqrt{"+m+"} = "+c+" \\times "+m+" = "+(c*m)+"\\), and the numerator becomes \\("+N+"\\sqrt{"+m+"}\\). Since \\("+N+"\\) and \\("+(c*m)+"\\) share no common factor, the simplest form is <b>"+key+"</b>.",
    {N:N,c:c,m:m});
});
E("u4-conjugate-area",4,["1.6"],2,"gen",function(){
  var a=ri(4,12),sq=[],i;
  for(i=2;i<a*a;i++){var rt=Math.sqrt(i);if(rt!==Math.floor(rt))sq.push(i);}
  var b=pick(sq),area=a*a-b;
  var ctx=pick(["rectangular garden","rectangular rug","rectangular solar panel","rectangular patio"]);
  return numq("A "+ctx+" measures \\(("+a+" + \\sqrt{"+b+"})\\) m by \\(("+a+" - \\sqrt{"+b+"})\\) m. What is its area, in \\(m^2\\)?",
    area,0.011,
    "Area = \\(("+a+" + \\sqrt{"+b+"})("+a+" - \\sqrt{"+b+"})\\), a difference of squares: \\("+a+"^2 - (\\sqrt{"+b+"})^2 = "+(a*a)+" - "+b+" = "+area+"\\), so the area is <b>\\("+area+"\\text{ m}^2\\)</b>. The radical terms cancel, which is why conjugate pairs give a whole-number area.",
    {a:a,b:b,area:area});
});

/* --- Unit 8: Properties of Angles and Triangles --- */
E("u8-diagonals",8,["5.5"],1,"gen",function(){
  var n=ri(5,30),mode=ri(0,1);
  var ans=mode===0?n-3:n*(n-3)/2;
  var ctx=pick(["convex polygon","garden outline drawn as a polygon","polygon-shaped sign","polygon-shaped tile design"]);
  var prompt="A "+ctx+" has "+n+" sides. How many diagonals "+(mode===0?"can be drawn from one vertex":"does it have in total")+"?";
  return numq(prompt,ans,0.011,
    mode===0
      ?"From one vertex, a diagonal cannot go to the vertex itself or to either of its two neighbours, so it can reach the other \\("+n+" - 3\\) vertices: <b>\\("+ans+"\\)</b> diagonals."
      :"Each of the \\("+n+"\\) vertices connects to \\("+n+" - 3\\) others by a diagonal (not itself, not its two neighbours), and each diagonal is counted twice, once from each end: \\("+n+" \\times "+(n-3)+" \\div 2 = \\)<b>\\("+ans+"\\)</b>.",
    {n:n,mode:mode,ans:ans});
});
E("u8-isosceles-angles",8,["5.3"],1,"gen",function(){
  var mode=ri(0,1),base,vertex,ans;
  if(mode===0){base=ri(28,72);vertex=180-2*base;ans=vertex;}
  else{vertex=2*ri(20,65);base=(180-vertex)/2;ans=base;}
  var q=numq(mode===0
      ?"In \\(\\triangle ABC\\), \\(AB = AC\\), so the base is \\(BC\\). The base angles at \\(B\\) and \\(C\\) each measure \\("+base+"^\\circ\\). What is the measure of the vertex angle at \\(A\\), in degrees?"
      :"In \\(\\triangle ABC\\), \\(AB = AC\\), so the base is \\(BC\\). The vertex angle at \\(A\\) measures \\("+vertex+"^\\circ\\). What is the measure of each base angle, in degrees?",
    ans,0.011,
    "The angles of a triangle add to \\(180^\\circ\\), and the base angles of an isosceles triangle are equal. "+(mode===0?"Vertex angle \\(= 180^\\circ - "+base+"^\\circ - "+base+"^\\circ = \\)<b>\\("+vertex+"^\\circ\\)</b>.":"Each base angle \\(= (180^\\circ - "+vertex+"^\\circ) \\div 2 = \\)<b>\\("+base+"^\\circ\\)</b>."),
    {mode:mode,base:base,vertex:vertex,ans:ans});
  q.figure=triAngSVG(vertex,base,base,{ang:mode===0?["?",base+"°",base+"°"]:[vertex+"°","?","?"]});
  return q;
});
E("u8-corresponding-algebra",8,["5.8"],2,"gen",function(){
  function expr(cf,kn){return cf+"x"+(kn>0?" + "+kn:(kn<0?" − "+(-kn):""));}
  function exprT(cf,kn){return expr(cf,kn).replace(/\u2212/g,"-");}
  var x0,a,c2,V,b,d,tries=0;
  do{
    x0=ri(4,15);a=ri(3,7);c2=ri(1,a-1);V=ri(65,135);
    b=V-a*x0;d=V-c2*x0;tries++;
  }while((b===0||d===0||b<-25||b>35||d<-25||d>35)&&tries<90);
  var q=numq("Two parallel lines are cut by a transversal. Two corresponding angles measure \\(("+exprT(a,b)+")^\\circ\\) and \\(("+exprT(c2,d)+")^\\circ\\). What is the measure of each of these angles, in degrees?",
    V,0.011,
    "Corresponding angles between parallel lines are equal: \\("+exprT(a,b)+" = "+exprT(c2,d)+"\\). Solving gives \\(x = "+x0+"\\). Substituting back: \\("+a+" \\times "+x0+(b>0?" + "+b:" - "+(-b))+" = \\)<b>\\("+V+"^\\circ\\)</b> (the other expression gives the same value, as it must).",
    {a:a,b:b,c:c2,d:d,x0:x0,V:V});
  q.figure=transversalSVG("TR","("+expr(a,b)+")°","BR","?");
  return q;
});
E("u8-correspondence",8,["5.6"],3,"gen",function(){
  var tris=pick([["ABC","DEF"],["PQR","STU"],["XYZ","UVW"],["JKL","MNO"],["FGH","BCD"],["RST","UVW"],["GHJ","KLM"]]);
  var T1=tris[0],T2=tris[1];
  var perm=shuffle([0,1,2]);
  function L2(i){return T2.charAt(perm[i]);}
  var mode=ri(0,1),givens;
  if(mode===0){
    givens="\\("+T1.charAt(0)+T1.charAt(1)+" = "+L2(0)+L2(1)+"\\), \\("+T1.charAt(1)+T1.charAt(2)+" = "+L2(1)+L2(2)+"\\) and \\("+T1.charAt(2)+T1.charAt(0)+" = "+L2(2)+L2(0)+"\\)";
  }else{
    givens="\\("+T1.charAt(0)+T1.charAt(1)+" = "+L2(0)+L2(1)+"\\), \\(\\angle "+T1.charAt(1)+" = \\angle "+L2(1)+"\\) and \\("+T1.charAt(1)+T1.charAt(2)+" = "+L2(1)+L2(2)+"\\)";
  }
  var keyStmt="\\(\\triangle "+T1+" \\cong \\triangle "+L2(0)+L2(1)+L2(2)+"\\)";
  var allPerms=[[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]];
  var others=allPerms.filter(function(p){return !(p[0]===perm[0]&&p[1]===perm[1]&&p[2]===perm[2]);});
  var ds=shuffle(others).slice(0,3).map(function(p){return "\\(\\triangle "+T1+" \\cong \\triangle "+T2.charAt(p[0])+T2.charAt(p[1])+T2.charAt(p[2])+"\\)";});
  return mcq("It is given that "+givens+". Which congruence statement matches these givens?",
    keyStmt,ds,
    "Match the vertices through the equal parts: "+T1.charAt(0)+" pairs with "+L2(0)+", "+T1.charAt(1)+" pairs with "+L2(1)+", and "+T1.charAt(2)+" pairs with "+L2(2)+". Writing the second triangle in that corresponding order gives <b>"+keyStmt+"</b>. In a congruence statement, the order of the letters is part of the claim.",
    {perm:perm,mode:mode});
});
E("u8-parallel-x-value",8,["5.9"],3,"gen",function(){
  var p=0,q=0,E=0,a=2,x=0,b=0,tries=0,ok=false;
  while(!ok&&tries<400){tries++;
    p=ri(35,70);q=ri(35,70);E=p+q;a=pick([2,3,4]);x=ri(8,30);
    b=(180-E)-a*x;
    ok=(E>=85&&E<=130&&b>=2&&b<=30);
  }
  return numq("Two lines are cut by a transversal. One co-interior angle is an exterior angle of a triangle, and the two remote interior angles of that triangle measure \\("+p+"^\\circ\\) and \\("+q+"^\\circ\\). The other co-interior angle, on the same side of the transversal, measures \\(("+a+"x + "+b+")^\\circ\\). For what value of \\(x\\) are the two lines parallel?",
    x,0.011,
    "Start with the triangle: an exterior angle equals the sum of the two remote interior angles, so the first co-interior angle measures \\("+p+"^\\circ + "+q+"^\\circ = "+E+"^\\circ\\). Two lines are parallel exactly when co-interior angles are supplementary, so \\("+a+"x + "+b+" = 180 - "+E+" = "+(180-E)+"\\). Then \\("+a+"x = "+(180-E-b)+"\\), giving \\(x = \\)<b>\\("+x+"\\)</b>.",
    {p:p,q:q,a:a,b:b});
});
E("u8-isosceles-exterior",8,["5.3"],3,"gen",function(){
  if(Math.random()<0.5){
    var E=2*ri(50,80);var ans=E/2;
    return numq("In \\(\\triangle ABC\\), \\(AB = AC\\). The exterior angle at \\(A\\) measures \\("+E+"^\\circ\\). What is the measure of \\(\\angle B\\), in degrees?",
      ans,0.011,
      "The interior angle at \\(A\\) is supplementary to the exterior angle: \\(180^\\circ - "+E+"^\\circ = "+(180-E)+"^\\circ\\). Since \\(AB = AC\\), the base angles at \\(B\\) and \\(C\\) are equal, and the interior angles of a triangle sum to \\(180^\\circ\\), so each base angle is \\((180^\\circ - "+(180-E)+"^\\circ) \\div 2 = \\)<b>\\("+ans+"^\\circ\\)</b>.",
      {E:E,mode:0});
  }
  var E2=ri(100,130);var ans2=2*E2-180;
  return numq("In \\(\\triangle ABC\\), \\(AB = AC\\). The exterior angle at \\(B\\) measures \\("+E2+"^\\circ\\). What is the measure of \\(\\angle A\\), in degrees?",
    ans2,0.011,
    "The interior angle at \\(B\\) is \\(180^\\circ - "+E2+"^\\circ = "+(180-E2)+"^\\circ\\). Since \\(AB = AC\\), \\(\\angle C = \\angle B = "+(180-E2)+"^\\circ\\). The interior angles sum to \\(180^\\circ\\), so \\(\\angle A = 180^\\circ - 2 \\times "+(180-E2)+"^\\circ = \\)<b>\\("+ans2+"^\\circ\\)</b>.",
    {E:E2,mode:1});
});
E("u8-regular-sides-from-angle",8,["5.5"],2,"gen",function(){
  var ns=[5,6,8,9,10,12,15,18,20,24,30,36,40,45,60,72,90];var n=pick(ns);var each=(n-2)*180/n;var sum=(n-2)*180;var mode=ri(0,2);
  if(mode===0){
    return numq("Each interior angle of a regular polygon measures \\("+each+"^\\circ\\). How many sides does the polygon have?",
      n,0.011,
      "Work with the exterior angle first: it is \\(180^\\circ - "+each+"^\\circ = "+(180-each)+"^\\circ\\). The exterior angles of a polygon add to \\(360^\\circ\\), so the number of sides is \\(360 \\div "+(180-each)+" = \\)<b>\\("+n+"\\)</b>.",
      {n:n,each:each,sum:sum,mode:mode});
  }
  if(mode===1){
    return numq("The interior angles of a regular polygon add to \\("+sum+"^\\circ\\), and each interior angle measures \\("+each+"^\\circ\\). How many sides does the polygon have?",
      n,0.011,
      "Every interior angle has the same measure, so the number of angles, which equals the number of sides, is \\("+sum+" \\div "+each+" = \\)<b>\\("+n+"\\)</b>. Check: \\(("+n+" - 2) \\times 180^\\circ = "+sum+"^\\circ\\), as given.",
      {n:n,each:each,sum:sum,mode:mode});
  }
  return numq("Each interior angle of a regular polygon measures \\("+each+"^\\circ\\). What is the sum of the interior angles, in degrees?",
    sum,0.011,
    "First find the number of sides from the exterior angle: each exterior angle is \\(180^\\circ - "+each+"^\\circ = "+(180-each)+"^\\circ\\), and exterior angles add to \\(360^\\circ\\), so the polygon has \\(360 \\div "+(180-each)+" = "+n+"\\) sides. The sum of the interior angles is then \\(("+n+" - 2) \\times 180^\\circ = \\)<b>\\("+sum+"^\\circ\\)</b>.",
    {n:n,each:each,sum:sum,mode:mode});
});
E("u8-exterior-algebra",8,["5.11"],3,"gen",function(){
  function linT(cf,kn){return cf+"x"+(kn>0?" + "+kn:(kn<0?" - "+(-kn):""));}
  function quadT(B,C){var out="x^2";if(B>0)out+=" + "+B+"x";else if(B<0)out+=" - "+(-B)+"x";if(C>0)out+=" + "+C;else if(C<0)out+=" - "+(-C);return out;}
  var v,w,d,p,r,A1,A2,q,s,b,c,E,Ew,R1w,R2w,tries=0;
  do{
    v=ri(4,12);d=ri(6,14);w=v+d;
    p=ri(2,5);r=ri(2,5);A1=ri(35,80);A2=ri(35,80);
    q=A1-p*v;s=A2-r*v;b=(p+r)-(v+w);c=q+s+v*w;E=A1+A2;
    Ew=E+(p+r)*d;R1w=A1+p*d;R2w=A2+r*d;tries++;
  }while((q===0||s===0||Math.abs(q)>45||Math.abs(s)>45||c<20||Ew<=180||Ew>320||R1w>=180||R2w>=180)&&tries<200);
  return numq("In \\(\\triangle ABC\\), the two remote interior angles for the exterior angle at \\(C\\) measure \\(("+linT(p,q)+")^\\circ\\) and \\(("+linT(r,s)+")^\\circ\\). The exterior angle at \\(C\\) measures \\(("+quadT(b,c)+")^\\circ\\). What is the measure of the exterior angle at \\(C\\), in degrees?",
    E,0.011,
    "An exterior angle equals the sum of the two remote interior angles: \\("+quadT(b,c)+" = ("+linT(p,q)+") + ("+linT(r,s)+")\\). Rearranging gives \\("+quadT(-(v+w),v*w)+" = 0\\), which factors as \\((x - "+v+")(x - "+w+") = 0\\), so \\(x = "+v+"\\) or \\(x = "+w+"\\). Try \\(x = "+w+"\\): the exterior angle would be \\("+Ew+"^\\circ\\) \u2014 greater than \\(180^\\circ\\), which no exterior angle of a triangle can be \u2014 so \\(x = "+w+"\\) is extraneous. With \\(x = "+v+"\\), the remote interior angles are \\("+A1+"^\\circ\\) and \\("+A2+"^\\circ\\), and the exterior angle is \\("+A1+" + "+A2+" = \\)<b>\\("+E+"^\\circ\\)</b>.",
    {p:p,q:q,r:r,s:s,b:b,c:c,v:v,w:w,A1:A1,A2:A2,E:E,Ew:Ew});
});

/* ============ Tranche 7 (Oct 27): finish-line pass, tranche 2 of 3 ============
   Unit 2 +4, Unit 3 +4, Unit 4 +4, Unit 8 +3 (bank 177 -> 192). Same
   reworked-template sources as tranche 6, mapped by topic, nothing verbatim.
   Adds a second Level 3 for Unit 8 and another for Unit 2. */

/* --- Unit 2: Quadratic Functions --- */
E("u2-revenue-build",2,["4.2"],3,"gen",function(){
  var fr=null,P=0,N=0,s=0,d=0,tries=0,ok=false,keyS="",d1S="",d2S="",d3S="";
  function R(t){return "\\(R(x) = "+quadB(t[0],t[1],t[2])+"\\)";}
  while(!ok&&tries<400){tries++;
    fr=pick([
      {w:"A community theatre",item:"tickets",each:"ticket"},
      {w:"A gym",item:"day passes",each:"day pass"},
      {w:"A market stall",item:"jars of preserves",each:"jar"}]);
    P=pick([6,8,9,10,12,15]);N=pick([120,150,180,200,240,300,360]);s=pick([0.5,1,1,2]);d=ri(4,25);
    if(s===d)continue;
    var A=-s*d,B=s*N-P*d,C=P*N;
    if(B===0||B-s*d===0)continue;
    keyS=R([A,B,C]);
    d1S=R([A,s*N+P*d,C]);
    d2S=R([A,B,(P+s)*(N-d)]);
    d3S=R([A,d*N-s*P,C]);
    var os=[keyS,d1S,d2S,d3S];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  var q=mcq(fr.w+" sells "+fr.item+" at $"+P+" per "+fr.each+" and normally sells "+N+" of them. The seller estimates that for every $"+fmt(s,1)+" increase in the price, "+d+" fewer will be sold. Let \\(x\\) be the number of $"+fmt(s,1)+" increases. Which function models the revenue, in dollars?",
    keyS,[d1S,d2S,d3S],
    "After \\(x\\) increases, the price is \\("+P+" + "+fmt(s,1)+"x\\) dollars and the number sold is \\("+N+" - "+d+"x\\). Revenue is price times number sold: \\(R(x) = ("+P+" + "+fmt(s,1)+"x)("+N+" - "+d+"x)\\). Expanding gives <b>"+keyS+"</b>.",
    {P:P,N:N,s:s,d:d});
  q.figure=parSVG(A,B,C,{xrange:[0,N/d],xLab:"x",yLab:"R(x)",aria:"Revenue parabola"});
  return q;
});
E("u2-function-from-vertex-point",2,["4.15","4.16"],3,"gen",function(){
  var a=0,h=0,k=0,side=0,tries=0,ok=false,keyS="",d1S="",d2S="",d3S="",px=0,py=0;
  while(!ok&&tries<400){tries++;
    a=pick([-3,-2,-1,1,2,3]);h=ri(-5,5);k=ri(-8,8);side=pick([-2,2]);
    if(h===0||k===0)continue;
    px=h+side;py=k+a*side*side;
    var B=-2*a*h,C=a*h*h+k,a2=a*side;
    keyS="\\(y = "+quadB(a,B,C)+"\\)";
    d1S="\\(y = "+quadB(a,2*a*h,C)+"\\)";
    d2S="\\(y = "+quadB(a2,-2*a2*h,a2*h*h+k)+"\\)";
    d3S="\\(y = "+quadB(a,B,a*h*h-k)+"\\)";
    var os=[keyS,d1S,d2S,d3S];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  var q=mcq("A parabola has vertex \\(("+h+", "+k+")\\) and passes through the point \\(("+px+", "+py+")\\). Which equation gives the parabola in standard form?",
    keyS,[d1S,d2S,d3S],
    "Start in vertex form and use the point to find \\(a\\): \\("+py+" = a("+side+")^2 + "+k+"\\) gives \\(a = "+a+"\\). So the vertex form is \\(y = "+vertB(a,h,k)+"\\), and expanding it gives <b>"+keyS+"</b>.",
    {a:a,h:h,k:k,px:px,py:py});
  q.figure=parSVG(a,-2*a*h,a*h*h+k,{marks:[{x:h,y:k},{x:px,y:py}]});
  return q;
});
E("u2-concavity",2,["4.10"],1,"gen",function(){
  var a=0,tries=0;while(a===0&&tries<40){a=ri(-9,9);tries++;}
  var b=ri(-9,9),c=ri(-12,12),up=a>0;
  var key=up?"It opens upward, and its vertex is a minimum":"It opens downward, and its vertex is a maximum";
  var q=mcq("Which statement describes the graph of \\(y = "+quadB(a,b,c)+"\\)?",
    key,
    [up?"It opens upward, and its vertex is a maximum":"It opens downward, and its vertex is a minimum",
     up?"It opens downward, and its vertex is a maximum":"It opens upward, and its vertex is a minimum",
     up?"It opens downward, and its vertex is a minimum":"It opens upward, and its vertex is a maximum"],
    "The sign of the \\(x^2\\) coefficient decides the opening: \\(a = "+a+"\\) is "+(up?"positive, so the parabola opens upward and the vertex is the lowest point — a minimum":"negative, so the parabola opens downward and the vertex is the highest point — a maximum")+". The other terms shift the graph but do not change its opening.",
    {a:a,b:b,c:c,up:up});
  q.figure=parSVG(a,b,c,{});
  return q;
});
E("u2-vertex-form-eval",2,["4.15"],1,"gen",function(){
  var a=0,tries=0;while(a===0&&tries<40){a=ri(-4,4);tries++;}
  var h=ri(-6,6),k=ri(-10,10),d=ri(1,5),sgn=Math.random()<0.5?1:-1;
  var x=h+sgn*d,ans=a*d*d+k;
  return numq("A quadratic function is given by \\(f(x) = "+vertB(a,h,k)+"\\). What is \\(f("+x+")\\)?",
    ans,0.011,
    "Substitute \\(x = "+x+"\\): the squared part is \\(("+(h===0?x:x+" "+(h>0?"- "+h:"+ "+(-h)))+")^2 = ("+(sgn*d)+")^2 = "+(d*d)+"\\). So \\(f("+x+") = "+a+" \\times "+(d*d)+(k>0?" + "+k:(k<0?" - "+(-k):""))+" = \\)<b>\\("+ans+"\\)</b>. (The sign of \\("+(sgn*d)+"\\) disappears when it is squared.)",
    {a:a,h:h,k:k,d:d,ans:ans});
});
E("u2-factored-y-intercept",2,["4.4"],1,"gen",function(){
  var a=0,tries=0;while(a===0&&tries<40){a=ri(-3,3);tries++;}
  var pool=[-6,-5,-4,-3,-2,-1,1,2,3,4,5,6];
  var r1=pick(pool),r2=pick(pool.filter(function(x){return x!==r1;}));
  var ans=a*r1*r2;
  return numq("What is the y-intercept of the graph of \\(f(x) = "+factB(a,r1,r2)+"\\)?",
    ans,0.011,
    "The y-intercept occurs at \\(x = 0\\): \\(f(0) = "+a+" \\times ("+(0-r1)+") \\times ("+(0-r2)+") = "+a+" \\times "+(r1*r2)+" = \\)<b>\\("+ans+"\\)</b>. (The x-intercepts are \\("+r1+"\\) and \\("+r2+"\\); the y-intercept is \\(a\\) times their product.)",
    {a:a,r1:r1,r2:r2,ans:ans});
});
E("u2-max-height",2,["4.2"],2,"gen",function(){
  var k=ri(3,9),B=10*k,C=ri(2,30),max=C+5*k*k;
  var ctx=pick([["ball","kicked"],["stone","thrown"],["water jet","a fountain"],["flare","fired"]]);
  var q=numq("A "+ctx[0]+" is "+ctx[1]+". Its height is \\(h(t) = -5t^2 + "+B+"t + "+C+"\\) metres, \\(t\\) seconds after it starts. What is the greatest height it reaches, in metres?",
    max,0.011,
    "The vertex is at \\(t = \\frac{"+B+"}{10} = "+k+"\\) s. Substituting: \\(h("+k+") = -5 \\times "+(k*k)+" + "+B+" \\times "+k+" + "+C+" = "+(-5*k*k)+" + "+(B*k)+" + "+C+" = \\)<b>\\("+max+"\\text{ m}\\)</b>.",
    {B:B,C:C,k:k,max:max});
  q.figure=trajSVG(-5,B,C);
  return q;
});

/* --- Unit 3: Quadratic Equations --- */
E("u3-formula-substitution",3,["4.9"],1,"var",varset([
  function(){return mcq("To solve \\(x^2 - 5x + 3 = 0\\) with the quadratic formula, which substitution is correct?",
    "\\(x = \\frac{5 \\pm \\sqrt{25 - 12}}{2}\\)",
    ["\\(x = \\frac{-5 \\pm \\sqrt{25 - 12}}{2}\\)","\\(x = \\frac{5 \\pm \\sqrt{25 + 12}}{2}\\)","\\(x = \\frac{5 \\pm \\sqrt{5 - 12}}{2}\\)"],
    "Here \\(a = 1\\), \\(b = -5\\), \\(c = 3\\). The formula starts with \\(-b = 5\\), and the discriminant is \\(b^2 - 4ac = 25 - 12\\). The denominator is \\(2a = 2\\).",
    {});},
  function(){return mcq("To solve \\(2x^2 + 3x - 4 = 0\\) with the quadratic formula, which substitution is correct?",
    "\\(x = \\frac{-3 \\pm \\sqrt{9 + 32}}{4}\\)",
    ["\\(x = \\frac{3 \\pm \\sqrt{9 + 32}}{4}\\)","\\(x = \\frac{-3 \\pm \\sqrt{9 - 32}}{4}\\)","\\(x = \\frac{-3 \\pm \\sqrt{9 + 32}}{2}\\)"],
    "Here \\(a = 2\\), \\(b = 3\\), \\(c = -4\\). The formula starts with \\(-b = -3\\), the discriminant is \\(9 - 4(2)(-4) = 9 + 32\\), and the denominator is \\(2a = 4\\).",
    {});},
  function(){return mcq("To solve \\(x^2 + 7x + 2 = 0\\) with the quadratic formula, which substitution is correct?",
    "\\(x = \\frac{-7 \\pm \\sqrt{49 - 8}}{2}\\)",
    ["\\(x = \\frac{7 \\pm \\sqrt{49 - 8}}{2}\\)","\\(x = \\frac{-7 \\pm \\sqrt{49 + 8}}{2}\\)","\\(x = \\frac{-7 \\pm \\sqrt{7 - 8}}{2}\\)"],
    "Here \\(a = 1\\), \\(b = 7\\), \\(c = 2\\). The formula starts with \\(-b = -7\\), and the discriminant is \\(b^2 - 4ac = 49 - 8\\). The denominator is \\(2a = 2\\).",
    {});},
  function(){return mcq("To solve \\(3x^2 - 4x - 6 = 0\\) with the quadratic formula, which substitution is correct?",
    "\\(x = \\frac{4 \\pm \\sqrt{16 + 72}}{6}\\)",
    ["\\(x = \\frac{-4 \\pm \\sqrt{16 + 72}}{6}\\)","\\(x = \\frac{4 \\pm \\sqrt{16 - 72}}{6}\\)","\\(x = \\frac{4 \\pm \\sqrt{16 + 72}}{3}\\)"],
    "Here \\(a = 3\\), \\(b = -4\\), \\(c = -6\\). The formula starts with \\(-b = 4\\), the discriminant is \\(16 - 4(3)(-6) = 16 + 72\\), and the denominator is \\(2a = 6\\).",
    {});}
]));
E("u3-factor-difference",3,["PK.2"],1,"gen",function(){
  var a=ri(1,5),k=ri(2,15),ax=a===1?"x":a+"x";
  var key="\\(("+ax+" - "+k+")("+ax+" + "+k+")\\)";
  return mcq("Factor fully: \\("+(a===1?"x^2":(a*a)+"x^2")+" - "+(k*k)+"\\)",
    key,
    ["\\(("+ax+" + "+k+")("+ax+" + "+k+")\\)","\\(("+ax+" - "+k+")("+ax+" - "+k+")\\)","\\(("+ax+" - "+(k*k)+")("+ax+" + "+(k*k)+")\\)"],
    "This is a difference of squares: \\("+(a===1?"x^2":(a*a)+"x^2")+"\\) is \\(("+ax+")^2\\) and \\("+(k*k)+"\\) is \\("+k+"^2\\). A difference of squares factors as (first - second)(first + second): <b>"+key+"</b>.",
    {a:a,k:k});
});
E("u3-discriminant-nature",3,["4.7"],2,"gen",function(){
  var mode=ri(0,2),a,b,c,D;
  if(mode===0){
    var pool=[-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7];
    var r1=pick(pool),r2=pick(pool.filter(function(x){return x!==r1;}));
    a=1;b=-(r1+r2);c=r1*r2;
  }else if(mode===1){
    var m=ri(2,5),af=pick([1,4]);a=af;b=2*m*Math.sqrt(af);c=m*m;
  }else{
    a=1;b=ri(-4,4);c=Math.floor(b*b/4)+ri(1,6);
  }
  D=b*b-4*a*c;
  var nature=mode===0?"two different real roots":(mode===1?"one repeated real root":"no real roots");
  var key="\\(D = "+D+"\\); "+nature;
  var others=["two different real roots","one repeated real root","no real roots"].filter(function(x){return x!==nature;});
  var wrongD=D===0?4:-D;
  return mcq("For the equation "+"\\("+quadB(a,b,c)+" = 0\\)"+", what is the discriminant, and what does it say about the roots?",
    key,
    ["\\(D = "+D+"\\); "+others[0],"\\(D = "+D+"\\); "+others[1],"\\(D = "+wrongD+"\\); "+nature],
    "\\(D = b^2 - 4ac = ("+b+")^2 - 4 \\times "+a+" \\times "+c+" = "+(b*b)+" - "+(4*a*c)+" = "+D+"\\). "+(mode===0?"Since \\(D > 0\\), the equation has two different real roots.":(mode===1?"Since \\(D = 0\\), the equation has one repeated real root.":"Since \\(D < 0\\), the equation has no real roots (its graph never crosses the x-axis).")),
    {a:a,b:b,c:c,D:D,mode:mode});
});
E("u3-root-difference",3,["4.6"],3,"gen",function(){
  var r=ri(2,12),d=ri(1,8),S=2*r+d,K=r*(r+d);
  var frame=pick([
    "The roots of \\(x^2 - "+S+"x + k = 0\\) differ by "+d+". What is the value of \\(k\\)?",
    "A quadratic equation \\(x^2 - "+S+"x + k = 0\\) has two roots, and the larger root is "+d+" more than the smaller root. What is the value of \\(k\\)?"
  ]);
  return numq(frame,K,0.011,
    "For \\(x^2 - Sx + k\\), the sum of the roots is \\(S = "+S+"\\) and the product is \\(k\\). If the roots differ by "+d+", they are \\(("+S+" - "+d+") \\div 2 = "+r+"\\) and \\("+r+" + "+d+" = "+(r+d)+"\\). So \\(k = "+r+" \\times "+(r+d)+" = "+K+"\\).",
    {r:r,d:d,S:S,K:K});
});

/* --- Unit 4: Radicals --- */
E("u4-entire-cube",4,["1.1"],1,"gen",function(){
  var a=ri(2,6),b=pick([2,3,4,5,6,7,9,10,11,13,14,15,18,20]);
  var key=cbrtT(a*a*a*b);
  return mcq("Express "+rad3T(a,b)+" as an entire radical.",
    key,
    [cbrtT(a*b),cbrtT(a*a*b),cbrtT((a+1)*(a+1)*(a+1)*b)],
    "The coefficient must be cubed to move under a cube root: \\("+a+" = \\sqrt[3]{"+(a*a*a)+"}\\). So \\[\\begin{aligned} "+a+"\\sqrt[3]{"+b+"} &= \\sqrt[3]{"+(a*a*a)+" \\times "+b+"} \\\\ &= \\sqrt[3]{"+(a*a*a*b)+"} \\end{aligned}\\] (Squaring the coefficient would be right for a square root, not a cube root.)",
    {a:a,b:b});
});
E("u4-product-simplify",4,["1.6"],2,"gen",function(){
  var m=pick([2,3,5,6,7,10,11,13]),a=ri(2,6),b=ri(2,6),mode=ri(0,1);
  var A=a*a*m,B=mode===0?b*b:b*b*m;
  var key,ds;
  if(mode===0){
    key=radT(a*b,m);
    var cand=[radT(a+b,m),sqrtT(A*B),radT(a*b,m+1),radT(a*b+1,m)];ds=[];
    for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  }else{
    key="\\("+(a*b*m)+"\\)";
    var cand2=["\\("+(a*b)+"\\)","\\("+((a+b)*m)+"\\)","\\("+(a*b*m+m)+"\\)",radT(a*b,m)];ds=[];
    for(var i2=0;i2<cand2.length&&ds.length<3;i2++){if(cand2[i2]!==key&&ds.indexOf(cand2[i2])<0)ds.push(cand2[i2]);}
  }
  return mcq("Simplify: \\(\\sqrt{"+A+"} \\times \\sqrt{"+B+"}\\). Give the answer in simplest form.",
    key,ds,
    "Simplify each radical first: "+sqrtT(A)+" = "+radT(a,m)+" and "+sqrtT(B)+" = "+(mode===0?"\\("+b+"\\)":radT(b,m))+". Multiplying: "+(mode===0?"\\("+a+" \\times "+b+" = "+(a*b)+"\\), giving <b>"+key+"</b>.":"\\("+a+" \\times "+b+" \\times "+m+"\\) because \\(\\sqrt{"+m+"} \\times \\sqrt{"+m+"} = "+m+"\\), giving <b>"+key+"</b>."),
    {a:a,b:b,m:m,mode:mode,A:A,B:B});
});
E("u4-add-unlike",4,["1.6"],2,"gen",function(){
  var m=pick([2,3,5,6,7,10,11,13]),a=ri(1,6),b=ri(1,6),tries=0;
  while(b===a&&tries<40){b=ri(1,6);tries++;}
  var A=a*a*m,B=b*b*m,key=radT(a+b,m);
  var cand=[sqrtT(A+B),radT(a*b,m),radT(a+b+1,m),radT(Math.abs(a-b),m)],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  return mcq("Simplify: \\(\\sqrt{"+A+"} + \\sqrt{"+B+"}\\). Give the answer in simplest radical form.",
    key,ds,
    "Simplify each term first: "+sqrtT(A)+" = "+radT(a,m)+" and "+sqrtT(B)+" = "+radT(b,m)+". They are like radicals, so add the coefficients: \\("+a+" + "+b+" = "+(a+b)+"\\), giving <b>"+key+"</b>. (The numbers under the roots are never added together.)",
    {a:a,b:b,m:m,A:A,B:B});
});
E("u4-diagonal-radical",4,["1.6"],2,"gen",function(){
  var s=ri(2,6),m=pick([2,3,5,6,7,10]);
  var r0=2*m,t=1,f;for(f=2;f*f<=r0;f++){while(r0%(f*f)===0){r0/=(f*f);t*=f;}}
  var key=r0===1?"\\("+(s*t)+"\\)":radT(s*t,r0);
  var cand=[radT(s,m),radT(2*s,m),sqrtT(2*s*s*m),r0===1?"\\("+(2*s*t)+"\\)":radT(s*t+1,r0)],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  var ctx=pick(["square tile","square panel","square garden plot","square poster"]);
  return mcq("A "+ctx+" has side length "+radT(s,m)+" m. What is the length of its diagonal, in simplest radical form?",
    key,ds,
    "By Pythagoras, the diagonal is \\(\\sqrt{2}\\) times the side: \\("+s+"\\sqrt{"+m+"} \\times \\sqrt{2} = "+s+"\\sqrt{"+(2*m)+"}\\). Simplifying \\(\\sqrt{"+(2*m)+"} = "+(r0===1?(""+t):(t===1?"\\sqrt{"+r0+"}":t+"\\sqrt{"+r0+"}"))+"\\) gives the diagonal as <b>"+key+"</b> m.",
    {s:s,m:m,t:t,r0:r0});
});

/* --- Unit 8: Properties of Angles and Triangles --- */
E("u8-cointerior-algebra",8,["5.8"],2,"gen",function(){
  function expr(cf,kn){return cf+"x"+(kn>0?" + "+kn:(kn<0?" − "+(-kn):""));}
  function exprT(cf,kn){return expr(cf,kn).replace(/\u2212/g,"-");}
  var x0,a,b,c2,d,V1,V2,tries=0;
  do{
    x0=ri(4,14);V1=ri(70,120);V2=180-V1;
    a=ri(2,6);b=V1-a*x0;c2=ri(2,6);d=V2-c2*x0;tries++;
  }while((b===0||d===0||b<-25||b>35||d<-25||d>35)&&tries<90);
  var mode=ri(0,1),ans=mode===0?V1:V2;
  var q=numq("Two parallel lines are cut by a transversal. Two co-interior angles measure \\(("+exprT(a,b)+")^\\circ\\) and \\(("+exprT(c2,d)+")^\\circ\\). What is the measure of the "+(mode===0?"first":"second")+" of these angles, in degrees?",
    ans,0.011,
    "Co-interior angles between parallel lines are supplementary: \\(("+exprT(a,b)+") + ("+exprT(c2,d)+") = 180\\). Solving gives \\(x = "+x0+"\\). The first angle is \\("+a+" \\times "+x0+(b>0?" + "+b:" - "+(-b))+" = "+V1+"^\\circ\\) and the second is \\("+V2+"^\\circ\\), so the angle asked for is <b>\\("+ans+"^\\circ\\)</b>.",
    {a:a,b:b,c:c2,d:d,x0:x0,V1:V1,V2:V2,mode:mode,ans:ans});
  q.figure=transversalSVG("TR","("+expr(a,b)+")°","BR","?");
  return q;
});
E("u8-congruence-perimeter",8,["5.6"],2,"gen",function(){
  var s=ri(6,16),s2=ri(5,16),s3,tries=0;
  do{s3=ri(5,18);tries++;}while((s3>=s+s2||s3<=Math.abs(s-s2))&&tries<60);
  var a=ri(2,5),x0=ri(3,12),b,safe=0;
  do{b=s-a*x0;safe++;if(b===0||b<-15||b>25){x0=ri(3,12);}}while((b===0||b<-15||b>25)&&safe<60);
  var P=s+s2+s3,mode=0,ans=mode===0?x0:P;
  return numq("\\(\\triangle ABC \\cong \\triangle DEF\\), with the vertices in corresponding order. \\(AB = "+s+"\\text{ cm}\\), \\(BC = "+s2+"\\text{ cm}\\) and \\(CA = "+s3+"\\text{ cm}\\). Side \\(DE\\) measures \\(("+a+"x "+(b>0?"+ "+b:"- "+(-b))+")\\text{ cm}\\). "+(mode===0?"What is the value of \\(x\\)?":"What is the perimeter of \\(\\triangle DEF\\), in cm?"),
    ans,0.011,
    "Corresponding vertices match in order, so side \\(DE\\) corresponds to side \\(AB\\): \\("+a+"x "+(b>0?"+ "+b:"- "+(-b))+" = "+s+"\\), giving \\(x = "+x0+"\\). Congruent triangles have the same perimeter: \\("+s+" + "+s2+" + "+s3+" = "+P+"\\text{ cm}\\)."+(mode===0?" So \\(x = \\)<b>\\("+x0+"\\)</b>.":" So the perimeter of \\(\\triangle DEF\\) is <b>\\("+P+"\\text{ cm}\\)</b>."),
    {s:s,s2:s2,s3:s3,a:a,b:b,x0:x0,P:P,mode:mode,ans:ans});
});
E("u8-congruent-perimeter",8,["5.6"],1,"gen",function(){
  var s=ri(6,16),s2=ri(5,16),s3,tries=0;
  do{s3=ri(5,18);tries++;}while((s3>=s+s2||s3<=Math.abs(s-s2))&&tries<60);
  var a=ri(2,5),x0=ri(3,12),b,safe=0;
  do{b=s-a*x0;safe++;if(b===0||b<-15||b>25){x0=ri(3,12);}}while((b===0||b<-15||b>25)&&safe<60);
  var P=s+s2+s3,mode=1,ans=mode===0?x0:P;
  return numq("\\(\\triangle ABC \\cong \\triangle DEF\\), with the vertices in corresponding order. \\(AB = "+s+"\\text{ cm}\\), \\(BC = "+s2+"\\text{ cm}\\) and \\(CA = "+s3+"\\text{ cm}\\). Side \\(DE\\) measures \\(("+a+"x "+(b>0?"+ "+b:"- "+(-b))+")\\text{ cm}\\). "+(mode===0?"What is the value of \\(x\\)?":"What is the perimeter of \\(\\triangle DEF\\), in cm?"),
    ans,0.011,
    "Corresponding vertices match in order, so side \\(DE\\) corresponds to side \\(AB\\): \\("+a+"x "+(b>0?"+ "+b:"- "+(-b))+" = "+s+"\\), giving \\(x = "+x0+"\\). Congruent triangles have the same perimeter: \\("+s+" + "+s2+" + "+s3+" = "+P+"\\text{ cm}\\)."+(mode===0?" So \\(x = \\)<b>\\("+x0+"\\)</b>.":" So the perimeter of \\(\\triangle DEF\\) is <b>\\("+P+"\\text{ cm}\\)</b>."),
    {s:s,s2:s2,s3:s3,a:a,b:b,x0:x0,P:P,mode:mode,ans:ans});
});
E("u8-angle-chase",8,["5.8"],2,"var",varset([
  function(){return mcq("Two parallel lines are cut by a transversal. \\(\\angle x\\) forms a co-interior pair with a \\(64^\\circ\\) angle. \\(\\angle y\\) is vertically opposite \\(\\angle x\\). \\(\\angle z\\) is a corresponding angle to \\(\\angle y\\). What is the measure of \\(\\angle z\\)?",
    "\\(116^\\circ\\)",
    ["\\(64^\\circ\\)","\\(128^\\circ\\)","\\(90^\\circ\\)"],
    "Co-interior angles are supplementary: \\(\\angle x = 180^\\circ - 64^\\circ = 116^\\circ\\). Vertically opposite angles are equal: \\(\\angle y = 116^\\circ\\). Corresponding angles are equal: \\(\\angle z = 116^\\circ\\).",
    {});},
  function(){return mcq("In \\(\\triangle ABC\\), \\(\\angle A = 52^\\circ\\) and \\(\\angle B = 68^\\circ\\). \\(\\angle e\\) is the exterior angle at \\(C\\). \\(\\angle f\\) forms a co-interior pair with \\(\\angle e\\) where a transversal cuts two parallel lines. \\(\\angle g\\) is vertically opposite \\(\\angle f\\). What is the measure of \\(\\angle g\\)?",
    "\\(60^\\circ\\)",
    ["\\(120^\\circ\\)","\\(68^\\circ\\)","\\(180^\\circ\\)"],
    "The exterior angle equals the sum of the remote interiors: \\(\\angle e = 52^\\circ + 68^\\circ = 120^\\circ\\). Co-interior angles are supplementary: \\(\\angle f = 180^\\circ - 120^\\circ = 60^\\circ\\). Vertically opposite angles are equal: \\(\\angle g = 60^\\circ\\).",
    {});},
  function(){return mcq("In an isosceles triangle the vertex angle measures \\(38^\\circ\\). \\(\\angle b\\) is one of the base angles. \\(\\angle h\\) is the exterior angle at that same base vertex. A second diagram shows \\(\\angle j\\) as an alternate interior angle equal to \\(\\angle h\\) (the lines are parallel). What is the measure of \\(\\angle j\\)?",
    "\\(109^\\circ\\)",
    ["\\(71^\\circ\\)","\\(38^\\circ\\)","\\(142^\\circ\\)"],
    "Base angle: \\(\\angle b = (180^\\circ - 38^\\circ) \\div 2 = 71^\\circ\\). Exterior angle on a straight line: \\(\\angle h = 180^\\circ - 71^\\circ = 109^\\circ\\). Alternate interior angles between parallel lines are equal: \\(\\angle j = 109^\\circ\\).",
    {});},
  function(){return mcq("Each interior angle of a regular pentagon measures \\(108^\\circ\\). In a triangle drawn beside the pentagon, one angle is supplementary to \\(108^\\circ\\) and a second angle measures \\(47^\\circ\\). What is the measure of the triangle's third angle?",
    "\\(61^\\circ\\)",
    ["\\(72^\\circ\\)","\\(108^\\circ\\)","\\(119^\\circ\\)"],
    "The supplementary angle is \\(180^\\circ - 108^\\circ = 72^\\circ\\). The triangle's angles add to \\(180^\\circ\\): \\(180^\\circ - 72^\\circ - 47^\\circ = 61^\\circ\\).",
    {});}
]));

/* ============ Tranche 8 (Oct 27): finish-line pass, tranche 3 of 3 ============
   Unit 1 +2, Unit 2 +3, Unit 3 +3, Unit 4 +3, Unit 6 +1, Unit 7 +2
   (bank 192 -> 206, the finish line). Same reworked-template sources as
   tranches 6-7, mapped by topic, nothing verbatim. Unit 5 stays deep and
   untouched at 47; the other seven units land in outline proportion with
   each other: U1 16, U2 28, U3 28, U4 31, U6 17, U7 17, U8 22. */

/* --- Unit 1: Acute Triangle Trigonometry --- */
E("u1-ambiguous-count",1,["7.2"],3,"var",varset([
  function(){return mcq("In \\(\\triangle ABC\\), \\(\\angle A = 40^\\circ\\), side \\(b = 10\\text{ cm}\\) and side \\(a = 5\\text{ cm}\\) (\\(a\\) is opposite \\(\\angle A\\)). How many different triangles fit this information?",
    "No triangle is possible",
    ["Exactly one triangle (a right triangle)","Exactly one triangle","Two different triangles are possible"],
    "Compare \\(a\\) with the height \\(h = b\\sin A = 10 \\times \\sin 40^\\circ \\approx 6.43\\text{ cm}\\). Since \\(a = 5\\text{ cm}\\) is SHORTER than \\(6.43\\text{ cm}\\), side \\(a\\) cannot reach the base line at all — no triangle closes.",
    {});},
  function(){return mcq("In \\(\\triangle ABC\\), \\(\\angle A = 30^\\circ\\), side \\(b = 10\\text{ cm}\\) and side \\(a = 5\\text{ cm}\\) (\\(a\\) is opposite \\(\\angle A\\)). How many different triangles fit this information?",
    "Exactly one triangle (a right triangle)",
    ["No triangle is possible from these lengths","Exactly one triangle","Two different triangles fit this data"],
    "The height is \\(h = b\\sin A = 10 \\times \\sin 30^\\circ = 5\\text{ cm}\\). Side \\(a\\) equals \\(h\\) exactly, so side \\(a\\) just reaches the base at a right angle — exactly one triangle, and it is right-angled.",
    {});},
  function(){return mcq("In \\(\\triangle ABC\\), \\(\\angle A = 40^\\circ\\), side \\(b = 10\\text{ cm}\\) and side \\(a = 8\\text{ cm}\\) (\\(a\\) is opposite \\(\\angle A\\)). How many different triangles fit this information?",
    "Two different triangles",
    ["No triangle is possible from these lengths","Exactly one triangle (a right triangle)","Exactly one triangle"],
    "The height is \\(h = 10 \\times \\sin 40^\\circ \\approx 6.43\\text{ cm}\\). Side \\(a = 8\\text{ cm}\\) is longer than \\(h\\) but shorter than \\(b = 10\\text{ cm}\\), so it can swing to two different positions on the base — the ambiguous case gives two different triangles.",
    {});},
  function(){return mcq("In \\(\\triangle ABC\\), \\(\\angle A = 50^\\circ\\), side \\(b = 9\\text{ cm}\\) and side \\(a = 11\\text{ cm}\\) (\\(a\\) is opposite \\(\\angle A\\)). How many different triangles fit this information?",
    "Exactly one triangle",
    ["No triangle is possible in this case","Exactly one triangle (a right triangle)","Two triangles in all"],
    "Side \\(a = 11\\text{ cm}\\) is longer than side \\(b = 9\\text{ cm}\\), so it can only land in one position past the foot of the height — exactly one triangle. (Two triangles need \\(h < a < b\\).)",
    {});}
]));
E("u1-median-length",1,["7.3"],3,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var p=ri(6,20),q=ri(6,20),A=ri(35,130);
  var a2=p*p+q*q-2*p*q*Math.cos(rd(A)),a=Math.sqrt(a2);
  var m=0.5*Math.sqrt(p*p+q*q+2*p*q*Math.cos(rd(A)));
  var ctx=pick(["triangular lot","triangular field","triangular garden plot"]);
  var qq=numq("A "+ctx+" has two sides of "+p+" m and "+q+" m meeting at a corner with an angle of \\("+A+"^\\circ\\) between them. A path runs from that corner to the midpoint of the opposite side. How long is the path, to one decimal place, in metres?",
    fmt(m,1),0.06,
    "First find the opposite side with the cosine law: \\(a^2 = "+p+"^2 + "+q+"^2 - 2 \\times "+p+" \\times "+q+" \\times \\cos "+A+"^\\circ = "+fmt(a2,1)+"\\), so \\(a \\approx "+fmt(a,1)+"\\text{ m}\\). Then the median to that side (Apollonius's rule, from applying the cosine law in the two half-triangles) is \\(m = \\frac{1}{2}\\sqrt{"+p+"^2 + "+q+"^2 + 2 \\times "+p+" \\times "+q+" \\times \\cos "+A+"^\\circ} = \\frac{1}{2}\\sqrt{"+fmt(p*p+q*q+2*p*q*Math.cos(rd(A)),1)+"} \\approx \\)<b>\\("+fmt(m,1)+"\\text{ m}\\)</b>.",
    {p:p,q:q,A:A,m:m});
  qq.figure=triSVG(a,q,p,{L:["A","B","C"],ang:[A+"°",null,null],side:[fmt(a,1)+" m",q+" m",p+" m"]});
  return qq;
});

/* --- Unit 2: Quadratic Functions --- */
E("u2-evaluate-f",2,["4.1"],1,"gen",function(){
  var a=0,tries=0;while(a===0&&tries<40){a=ri(-4,4);tries++;}
  var b=ri(-9,9),c=ri(-12,12),d=ri(-5,5),ans=a*d*d+b*d+c;
  return numq("For \\(f(x) = "+quadB(a,b,c)+"\\), what is \\(f("+d+")\\)?",
    ans,0.011,
    "Substitute \\(x = "+d+"\\): \\(f("+d+") = "+a+" \\times ("+d+")^2 + ("+b+") \\times ("+d+") + ("+c+") = "+(a*d*d)+" + "+(b*d)+" + "+c+" = \\)<b>\\("+ans+"\\)</b>.",
    {a:a,b:b,c:c,d:d,ans:ans});
});
E("u2-vertex-shift",2,["4.15"],1,"var",varset([
  function(){
  var a=0,h=0,k=0,tries=0;
  while((a===0||h===0||k===0)&&tries<60){a=ri(-5,5);h=ri(-7,7);k=ri(-9,9);tries++;}
  var open=a>0?"upward":"downward";
  function vt(x,y){return "\\(("+x+", "+y+")\\)";}
  var key=vt(h,k)+"; opens "+open;
  return mcq("What is the vertex of \\(y = "+vertB(a,h,k)+"\\), and which way does the graph open?",
    key,
    [vt(-h,k)+"; opens "+open,vt(h,-k)+"; opens "+open,vt(-h,-k)+"; opens "+open],
    "In \\(y = a(x - h)^2 + k\\) the vertex is \\((h, k)\\). Here the squared part is \\((x "+(h>0?"- "+h:"+ "+(-h))+")\\), so \\(h = "+h+"\\) (the sign flips from how it appears), and \\(k = "+k+"\\). Since \\(a = "+a+"\\) is "+(a>0?"positive":"negative")+", the graph opens "+open+". The vertex is <b>"+key+"</b>.",
    {a:a,h:h,k:k});
},
  function(){
  var a=0,h=0,k=0,tries=0;
  while((a===0||h===0||k===0)&&tries<60){a=ri(-5,5);h=ri(-7,7);k=ri(-9,9);tries++;}
  var open=a>0?"upward":"downward";
  function vt(x,y){return "\\(("+x+", "+y+"\\)";}
  var key=vt(h,k)+"; opens "+open;
  var qfig=mcq("The graph shows a parabola with its vertex marked. What is the vertex, and which way does the graph open?",
    key,
    [vt(-h,k)+"; opens "+open,vt(h,-k)+"; opens "+open,vt(-h,-k)+"; opens "+open],
    "The marked point is the vertex, \\(("+h+", "+k+")\\). The arms of the parabola point "+open+", so the graph opens "+open+". The vertex is <b>"+key+"</b>.",
    {a:a,h:h,k:k});
  qfig.figure=parSVG(a,-2*a*h,a*h*h+k,{labels:"values",marks:[{x:h,y:k}]});
  return qfig;
}
]));
E("u2-factored-max-height",2,["4.2"],2,"gen",function(){
  var a=pick([2,3,4,5]),r1=ri(3,14),r2=ri(1,8);if(r2>=r1)r2=r1-1;
  var S=r1+r2,max=a*S*S/4,tstar=(r1-r2)/2;
  var q=numq("A projectile's height is modelled by \\(h(t) = -"+a+"(t - "+r1+")(t + "+r2+")\\) metres, \\(t\\) seconds after launch. What is the greatest height it reaches? Give the exact value, in metres.",
    max,0.011,
    "The height is zero at \\(t = "+r1+"\\) and (before launch) at \\(t = -"+r2+"\\); the vertex sits midway between the roots, at \\(t = \\frac{"+r1+" - "+r2+"}{2} = "+fmt(tstar,1)+"\\) s. Substituting: \\(h("+fmt(tstar,1)+") = -"+a+" \\times ("+fmt(tstar-r1,1)+") \\times ("+fmt(tstar+r2,1)+") = \\)<b>\\("+fmt(max,2)+"\\text{ m}\\)</b>.",
    {a:a,r1:r1,r2:r2,S:S,max:max});
  q.figure=trajSVG(-a,a*(r1-r2),a*r1*r2);
  return q;
});

/* --- Unit 3: Quadratic Equations --- */
E("u3-formula-exact-roots",3,["4.9"],2,"gen",function(){
  function gcd(x,y){x=Math.abs(x);y=Math.abs(y);while(y){var u=y;y=x%y;x=u;}return x||1;}
  function fmtRoot(num,coef,rad,den){var body=num+" \\pm "+(coef===1?"":coef)+"\\sqrt{"+rad+"}";return den===1?("\\("+body+"\\)"):("\\(\\frac{"+body+"}{"+den+"}\\)");}
  var a,b,c,D,t,Dp,g,tries=0;
  do{
    a=pick([1,2]);b=ri(-9,9);c=ri(-8,8);
    D=b*b-4*a*c;t=1;Dp=D;
    for(var f=2;f*f<=Dp;f++){while(Dp%(f*f)===0){Dp/=(f*f);t*=f;}}
    tries++;
  }while((b===0||D<=0||Dp<=1)&&tries<90);
  /* require b != 0, D > 0 and D not a perfect square (Dp > 1 after extraction);
     the fallback below satisfies all three (D = 37) if the loop ever exhausts */
  if(b===0||D<=0||Dp<=1){a=1;b=-5;c=-3;D=b*b-4*a*c;t=1;Dp=D;for(var f2=2;f2*f2<=Dp;f2++){while(Dp%(f2*f2)===0){Dp/=(f2*f2);t*=f2;}}}
  g=gcd(gcd(b,t),2*a);
  var num=-b/g,coef=t/g,den=2*a/g;
  var key=fmtRoot(num,coef,Dp,den);
  var cand=[fmtRoot(b/g,coef,Dp,den),fmtRoot(num,1,D,2*a),fmtRoot(num,coef,Dp,a),fmtRoot(num,coef+1,Dp,den),fmtRoot(num+1,coef,Dp,den)],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  return mcq("Solve "+"\\("+quadB(a,b,c)+" = 0\\)"+". Which option gives the roots in simplest exact form?",
    key,ds,
    "\\[\\begin{aligned} x &= \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\\\ &= \\frac{"+(-b)+" \\pm \\sqrt{"+D+"}}{"+(2*a)+"} \\end{aligned}\\] "+(t>1?"Since \\(\\sqrt{"+D+"} = "+t+"\\sqrt{"+Dp+"}\\), ":"Since \\(\\sqrt{"+D+"}\\) does not simplify, ")+(g>1?"and the whole fraction divides by \\("+g+"\\), ":"")+"the simplest exact form is <b>"+key+"</b>.",
    {a:a,b:b,c:c,D:D,t:t,Dp:Dp,num:num,coef:coef,den:den});
});
E("u3-squares-area",3,["4.3"],2,"gen",function(){
  var s=ri(3,14),m=ri(1,6),T=s*s+(s+m)*(s+m);
  var ctx=pick([["two square garden plots","plot"],["two square patios","patio"],["two square quilts","quilt"]]);
  var q=numq("A gardener has "+ctx[0]+". The side of the larger "+ctx[1]+" is "+m+" m longer than the side of the smaller one, and their areas add to \\("+T+"\\text{ m}^2\\). What is the side length of the smaller "+ctx[1]+", in metres?",
    s,0.011,
    "Let the smaller side be \\(s\\); the larger is \\(s + "+m+"\\). Then \\(s^2 + (s + "+m+")^2 = "+T+"\\). A shortcut: \\((2s + "+m+")^2 = 2 \\times "+T+" - "+(m*m)+" = "+(2*T-m*m)+"\\), so \\(2s + "+m+" = "+(2*s+m)+"\\) and \\(s = "+s+"\\) m. (Check: \\("+s+"^2 + "+(s+m)+"^2 = "+(s*s)+" + "+((s+m)*(s+m))+" = "+T+"\\).)",
    {s:s,m:m,T:T});
  q.figure=twoSquaresSVG(m);
  return q;
});
E("u3-number-pair",3,["4.6"],2,"gen",function(){
  var u=ri(-6,10),v=u+ri(1,9),S=u+v,P=u*v;
  return numq("Two numbers add to "+S+" and multiply to "+P+". What is the larger of the two numbers?",
    v,0.011,
    "The numbers are the roots of \\(x^2 - ("+S+")x + ("+P+") = 0\\), which factors as \\("+(u>=0?"(x - "+u+")":"(x + "+(-u)+")")+(v>=0?"(x - "+v+")":"(x + "+(-v)+")")+" = 0\\). The roots are \\("+u+"\\) and \\("+v+"\\), so the larger number is <b>\\("+v+"\\)</b>. (Check: \\("+u+" + "+v+" = "+S+"\\) and \\("+u+" \\times "+v+" = "+P+"\\).)",
    {u:u,v:v,S:S,P:P});
});

/* --- Unit 4: Radicals --- */
E("u4-compare-radicals",4,["1.4"],2,"gen",function(){
  var a,b,c,d,x2,y2,tries=0;
  do{
    a=ri(1,6);b=pick([2,3,5,6,7,10,11,13]);c=ri(1,6);d=pick([2,3,5,6,7,10,11,13]);
    x2=a*a*b;y2=c*c*d;tries++;
  }while((x2===y2||(a===c&&b===d))&&tries<60);
  var X=radT(a,b),Y=radT(c,d),xBig=x2>y2;
  return mcq("Which statement about "+X+" and "+Y+" is true?",
    (xBig?X:Y)+" is the larger value",
    [(xBig?Y:X)+" is the larger value","They are equal in value","They cannot be compared without a calculator"],
    "Write both as entire radicals: "+X+" = "+sqrtT(x2)+" and "+Y+" = "+sqrtT(y2)+". Since \\("+Math.max(x2,y2)+" > "+Math.min(x2,y2)+"\\), the larger value is <b>"+(xBig?X:Y)+"</b>.",
    {a:a,b:b,c:c,d:d,x2:x2,y2:y2});
});
E("u4-difference-simplify",4,["1.6"],2,"gen",function(){
  var m=pick([2,3,5,6,7,10,11,13]),a=ri(3,7),b=ri(1,a-1);
  var A=a*a*m,B=b*b*m,key=radT(a-b,m);
  var cand=[sqrtT(A-B),radT(a+b,m),radT(a,m)],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  return mcq("Simplify: \\(\\sqrt{"+A+"} - \\sqrt{"+B+"}\\). Give the answer in simplest radical form.",
    key,ds,
    "Simplify each term first: "+sqrtT(A)+" = "+radT(a,m)+" and "+sqrtT(B)+" = "+radT(b,m)+". They are like radicals, so subtract the coefficients: \\("+a+" - "+b+" = "+(a-b)+"\\), giving <b>"+key+"</b>.",
    {a:a,b:b,m:m,A:A,B:B});
});
E("u4-reciprocal-sum",4,["1.7"],2,"gen",function(){
  function gcd(x,y){while(y){var u=y;y=x%y;x=u;}return x;}
  var a=pick([2,3,5,6,7,10,11,13,14,15,17,19,21,22,23,26]),k=ri(2,6),B=a*k*k;
  var g=gcd(k+1,k*a),num=(k+1)/g,den=(k*a)/g;
  function fr(nm,dn){return "\\(\\frac{"+(nm===1?"\\sqrt{"+a+"}":nm+"\\sqrt{"+a+"}")+"}{"+dn+"}\\)";}
  var key=fr(num,den);
  var cand=[fr(k+1,k*a),"\\(\\frac{"+(k+1)+"\\sqrt{"+a+"}}{"+a+"}\\)","\\(\\frac{\\sqrt{"+a+"}}{"+k+"}\\)",fr(k,k*a)],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  return mcq("Simplify, rationalizing the denominator: \\(\\frac{1}{\\sqrt{"+a+"}} + \\frac{1}{\\sqrt{"+B+"}}\\).",
    key,ds,
    "First, \\(\\sqrt{"+B+"} = "+k+"\\sqrt{"+a+"}\\). Write the sum over a common denominator: \\(\\frac{1}{\\sqrt{"+a+"}} + \\frac{1}{"+k+"\\sqrt{"+a+"}} = \\frac{"+(k+1)+"}{"+k+"\\sqrt{"+a+"}}\\). Rationalizing (multiply top and bottom by \\(\\sqrt{"+a+"}\\)) gives \\(\\frac{"+(k+1)+"\\sqrt{"+a+"}}{"+(k*a)+"}\\)"+(g>1?", which reduces by \\("+g+"\\)":"")+" — the simplest form is <b>"+key+"</b>.",
    {a:a,k:k,B:B,g:g,num:num,den:den});
});

/* --- Unit 6: Proportional Reasoning --- */
E("u6-map-distance",6,["6.9"],2,"gen",function(){
  var N=pick([20000,25000,40000,50000,100000]),mode=ri(0,1);
  var dcm,km,ans,tries=0;
  if(mode===0){
    dcm=ri(3,18);km=dcm*N/100000;ans=km;
  }else{
    do{km=pick([2,3,4,5,6,8,10,12]);dcm=km*100000/N;tries++;}while(dcm!==Math.floor(dcm)&&tries<60);
    ans=dcm;
  }
  return numq(mode===0
      ?"On a map with scale \\(1 : "+N+"\\), the distance between two towns measures "+dcm+" cm. What is the actual distance between the towns, in kilometres?"
      :"On a map with scale \\(1 : "+N+"\\), two towns are actually "+km+" km apart. How far apart are they on the map, in centimetres?",
    ans,0.011,
    mode===0
      ?"Each map centimetre represents \\("+N+"\\text{ cm} = "+fmt(N/100000,2)+"\\text{ km}\\) on the ground. Actual distance: \\("+dcm+" \\times "+fmt(N/100000,2)+" = \\)<b>\\("+fmt(km,2)+"\\text{ km}\\)</b>."
      :"Each map centimetre represents \\("+fmt(N/100000,2)+"\\text{ km}\\), so the map distance is \\("+km+" \\div "+fmt(N/100000,2)+" = \\)<b>\\("+dcm+"\\text{ cm}\\)</b>.",
    {N:N,dcm:dcm,km:km,mode:mode,ans:ans});
});

/* --- Unit 7: Reasoning --- */
E("u7-proof-repair",7,["2.8"],3,"gen",function(){
  var f=pick([1,-1]);var a=ri(2,9);var rootA=f*a;var b=ri(2,9);if(b===rootA)b=b+1;
  var term=rootA>=0?"(x - "+rootA+")":"(x + "+(-rootA)+")";
  return numq("A student solves \\(x"+term+" = "+b+term+"\\) by cancelling the factor \\("+term+"\\) from both sides, and reports the single solution \\(x = "+b+"\\). Cancelling that factor lost one solution. What is the missing solution?",
    rootA,0.011,
    "Cancelling \\("+term+"\\) amounts to dividing both sides by it, which throws away the case where the factor itself is zero. Move everything to one side instead: \\(x"+term+" - "+b+term+" = "+term+"(x - "+b+") = 0\\), so the solutions are \\(x = "+rootA+"\\) and \\(x = "+b+"\\). The missing solution is <b>\\(x = "+rootA+"\\)</b>, exactly the value that makes the cancelled factor zero.",
    {rootA:rootA,b:b});
});
E("u7-smallest-counterexample",7,["2.4"],3,"var",varset([
  function(){return numq("Conjecture: \u2018Every multiple of \\(4\\) is a multiple of \\(8\\).\u2019 What is the smallest positive multiple of \\(4\\) that disproves it?",
    4,0.011,"The multiples of \\(4\\) are \\(4, 8, 12, 16, \\ldots\\) The very first one, \\(4\\), is not a multiple of \\(8\\), so it is a counterexample, and no smaller positive multiple of \\(4\\) exists.",{});},
  function(){return numq("Conjecture: \u2018Every multiple of \\(6\\) is a multiple of \\(9\\).\u2019 What is the smallest positive multiple of \\(6\\) that disproves it?",
    6,0.011,"The multiples of \\(6\\) are \\(6, 12, 18, \\ldots\\) The number \\(6\\) is not a multiple of \\(9\\), so it disproves the conjecture, and it is the first multiple to check.",{});},
  function(){return numq("Conjecture: \u2018Every number divisible by \\(10\\) is divisible by \\(15\\).\u2019 What is the smallest positive number that disproves it?",
    10,0.011,"The number \\(10\\) is divisible by \\(10\\) but not by \\(15\\). It meets the condition and breaks the claim, and no smaller positive number meets the condition at all.",{});},
  function(){return numq("Conjecture: \u2018Every number divisible by \\(12\\) is divisible by \\(18\\).\u2019 What is the smallest positive number that disproves it?",
    12,0.011,"The number \\(12\\) is divisible by \\(12\\), but \\(12 \\div 18\\) is not a whole number. So \\(12\\) is a counterexample, and the smallest one possible.",{});},
  function(){return numq("For whole numbers \\(n\\), the expression \\(n^2 + n + 11\\) gives a prime for \\(n = 0, 1, 2, \\ldots, 9\\). A student conjectures it is prime for every whole number. For what value of \\(n\\) does it first fail?",
    10,0.011,"Keep testing past the cases given: at \\(n = 10\\), \\(10^2 + 10 + 11 = 121 = 11 \\times 11\\), which is not prime. The pattern survived ten cases and still failed, which is why checking cases can support a conjecture but never prove it.",{});}
]));
E("u7-counterexample-name",7,["2.4"],3,"var",varset([
  function(){return textq("Conjecture: \u2018A quadrilateral with all four sides equal is a square.\u2019 Name a quadrilateral with all sides equal that is not a square. (Type the name of the shape.)",
    ["rhombus"],
    "A <b>rhombus</b> has all four sides equal, but its angles need not be right angles, so it need not be a square. A single counterexample disproves the conjecture.",{});},
  function(){return textq("Conjecture: \u2018If the diagonals of a quadrilateral are perpendicular, the quadrilateral is a rhombus.\u2019 Name a quadrilateral with perpendicular diagonals that is not a rhombus. (Type the name of the shape.)",
    ["kite"],
    "A <b>kite</b> has perpendicular diagonals, but its sides are two pairs of adjacent equal sides, not four equal sides, so it is not a rhombus.",{});},
  function(){return textq("Conjecture: \u2018A quadrilateral with a pair of parallel sides is a parallelogram.\u2019 Name a quadrilateral that has exactly one pair of parallel sides. (Type the name of the shape.)",
    ["trapezoid","trapezium"],
    "A <b>trapezoid</b> has exactly one pair of parallel sides; a parallelogram needs two pairs. So the trapezoid is a counterexample.",{});},
  function(){return textq("Conjecture: \u2018Every prime number is odd.\u2019 Type the prime number that is a counterexample.",
    ["2"],
    "The number <b>2</b> is prime, since its only factors are 1 and itself, but it is even. One counterexample is enough to disprove the conjecture.",{});}
]));
E("u7-triangular-total",7,["2.1"],2,"gen",function(){
  var mode=ri(0,3),N=0,ans=0,prompt="",sol="";
  if(mode===0){N=ri(8,26);ans=N*(N+1)/2;
    prompt="Blocks are stacked in a staircase: a 1-step staircase uses \\(1\\) block, a 2-step staircase uses \\(3\\) blocks, and a 3-step staircase uses \\(6\\) blocks. How many blocks does a "+N+"-step staircase use?";
    sol="The totals \\(1, 3, 6, \\ldots\\) grow by \\(2\\), then \\(3\\), then \\(4\\): step \\(k\\) adds \\(k\\) blocks. So the total for \\(n\\) steps is \\(1 + 2 + \\cdots + n = \\frac{n(n+1)}{2}\\). For \\("+N+"\\) steps: \\(\\frac{"+N+" \\times "+(N+1)+"}{2} = \\)<b>\\("+ans+"\\)</b> blocks.";}
  else if(mode===1){N=ri(7,22);ans=N*(N-1)/2;
    prompt="At a meeting, every person shakes hands with every other person exactly once. With \\(4\\) people there are \\(6\\) handshakes. How many handshakes are there with "+N+" people?";
    sol="Each of the \\("+N+"\\) people shakes \\("+(N-1)+"\\) hands, but that counts every handshake twice, once from each end. The total is \\(\\frac{"+N+" \\times "+(N-1)+"}{2} = \\)<b>\\("+ans+"\\)</b>. Check the given case: \\(\\frac{4 \\times 3}{2} = 6\\), as stated.";}
  else if(mode===2){N=ri(8,28);ans=N*(N+1)/2;
    prompt="Seats are arranged in rows: row 1 has \\(1\\) seat, row 2 has \\(2\\) seats, row 3 has \\(3\\) seats, and so on. How many seats are there in the first "+N+" rows altogether?";
    sol="Add the rows: \\(1 + 2 + \\cdots + "+N+"\\). Pair the first and last rows, the second and second-last, and so on: each pair sums to \\("+(N+1)+"\\), and there are \\("+N+" \\div 2\\) pairs, giving \\(\\frac{"+N+" \\times "+(N+1)+"}{2} = \\)<b>\\("+ans+"\\)</b> seats.";}
  else{N=ri(9,24);ans=N*(N+1)/2;
    prompt="Counters are arranged in a triangular pattern: the first row has \\(1\\) counter, the second row has \\(2\\) counters, the third row has \\(3\\) counters, and so on. How many counters are there in the first "+N+" rows?";
    sol="The row counts are consecutive whole numbers, so the total is \\(1 + 2 + \\cdots + "+N+" = \\frac{"+N+" \\times "+(N+1)+"}{2} = \\)<b>\\("+ans+"\\)</b> counters.";}
  return numq(prompt,ans,0.011,sol,{mode:mode,N:N});
});
E("u7-chain-conclusion",7,["2.3"],2,"gen",function(){
  var pools=[["Amara","Devon","Priya","Tom"],["Liam","Sofia","Noah","Emma"],["Kai","Ruth","Omar","Zoe"],["Maya","Eli","Nina","Sam"]];
  var names=pick(pools).slice();
  var order=shuffle(names.slice());
  var clues=[];for(var i=0;i<3;i++)clues.push(order[i]+" is taller than "+order[i+1]+".");
  clues=shuffle(clues);
  var askTall=Math.random()<0.5;
  var target=askTall?order[0]:order[3];
  return textq("Four students, "+names.join(", ")+", are compared by height. The clues are: (1) "+clues[0]+" (2) "+clues[1]+" (3) "+clues[2]+" Who is the "+(askTall?"tallest":"shortest")+" student? (Type the name.)",
    [target],
    "Chain the clues together: "+order[0]+" is taller than "+order[1]+", who is taller than "+order[2]+", who is taller than "+order[3]+". The clues force one full order, so the "+(askTall?"tallest":"shortest")+" student is <b>"+target+"</b>. This is deductive reasoning: the conclusion has to hold.",
    {order:order,askTall:askTall});
});
E("u7-false-pattern",7,["2.2"],2,"var",varset([
  function(){return numq("A flatbread is cut with straight cuts that cross the whole flatbread. One cut makes \\(2\\) pieces, \\(2\\) cuts make \\(4\\) pieces, and \\(3\\) cuts make \\(7\\) pieces. A student conjectures the pieces double each time and predicts \\(8\\) pieces for \\(4\\) cuts. How many pieces do \\(4\\) cuts actually make?",
    11,0.011,"Watch the increases instead: the counts grow by \\(2\\), then by \\(3\\), because each new cut crosses all the earlier cuts and so adds one more piece than the cut before. The next increase is \\(4\\), giving \\(7 + 4 = \\)<b>\\(11\\)</b> pieces. The doubling pattern fit the first step and failed soon after.",{});},
  function(){return numq("A pattern of counts begins \\(1, 2, 4, 7\\). The increases are \\(1\\), then \\(2\\), then \\(3\\). Following the same pattern of increases, what is the next count?",
    11,0.011,"The increases grow by \\(1\\) each time: \\(1, 2, 3\\), so the next increase is \\(4\\). The next count is \\(7 + 4 = \\)<b>\\(11\\)</b>. Judging a pattern means looking at how it grows, not just at the terms shown.",{});},
  function(){return numq("A student computes \\(3 = 3\\), \\(3 + 6 = 9\\) and \\(3 + 6 + 9 = 18\\), and conjectures that the sums are doubling. The sums are actually built by adding the next multiple of \\(3\\) each time. What is the next sum?",
    30,0.011,"The next multiple of \\(3\\) is \\(12\\), so the next sum is \\(18 + 12 = \\)<b>\\(30\\)</b>, not the \\(36\\) that doubling predicts. The first few terms of a pattern can fit a rule that the pattern is not following.",{});},
  function(){return numq("Matchsticks form a row of squares: \\(1\\) square uses \\(4\\) matchsticks, \\(2\\) squares use \\(7\\), and \\(3\\) squares use \\(10\\). A student conjectures that each new square adds \\(4\\) matchsticks, because the first square needed \\(4\\). How many matchsticks do \\(6\\) squares use?",
    19,0.011,"After the first square, each added square shares one side with the square before it, so it adds only \\(3\\) matchsticks: \\(4, 7, 10, 13, 16, 19\\). Six squares use <b>\\(19\\)</b> matchsticks. The first term alone does not set the rule.",{});}
]));
E("u7-deductive-chain",7,["2.3"],2,"gen",function(){
  /* rows: [singular A, plural A, plural B, singular C, plural C, singular D, plural D]
     with A in B, B in C, C in D */
  var rows=[
    ["daisy","daisies","flowers","plant","plants","living thing","living things"],
    ["robin","robins","birds","animal","animals","living thing","living things"],
    ["square","squares","rectangles","quadrilateral","quadrilaterals","polygon","polygons"],
    ["salmon","salmon","fish","animal","animals","living thing","living things"],
    ["violin","violins","string instruments","musical instrument","musical instruments","man-made object","man-made objects"],
    ["poodle","poodles","dogs","mammal","mammals","animal","animals"],
    ["oak tree","oak trees","trees","plant","plants","living thing","living things"],
    ["emerald","emeralds","gems","mineral","minerals","natural substance","natural substances"],
    ["maple tree","maple trees","trees","plant","plants","living thing","living things"],
    ["eagle","eagles","birds","animal","animals","living thing","living things"],
    ["hexagon","hexagons","polygons","shape","shapes","figure","figures"],
    ["trumpet","trumpets","brass instruments","musical instrument","musical instruments","man-made object","man-made objects"],
    ["wolf","wolves","canines","mammal","mammals","animal","animals"],
    ["trout","trout","fish","animal","animals","living thing","living things"],
    ["cube","cubes","prisms","solid","solids","figure","figures"],
    ["cello","cellos","string instruments","musical instrument","musical instruments","man-made object","man-made objects"],
    ["beagle","beagles","dogs","mammal","mammals","animal","animals"],
    ["tulip","tulips","flowers","plant","plants","living thing","living things"],
    ["sparrow","sparrows","birds","animal","animals","living thing","living things"],
    ["trapezoid","trapezoids","quadrilaterals","polygon","polygons","figure","figures"]
  ];
  var R=pick(rows),mode=ri(0,2);
  if(mode===2){
    return mcq("All "+R[1]+" are "+R[2]+". All "+R[2]+" are "+R[4]+". All "+R[4]+" are "+R[6]+". One particular "+R[0]+" is being examined. Which conclusion MUST be true?",
      "The "+R[0]+" is also a "+R[5],
      ["The "+R[0]+" is not a "+R[5],"Every "+R[5]+" is a "+R[0],"Every member of "+R[4]+" is a "+R[0]],
      "Follow the whole chain: all "+R[1]+" are "+R[2]+", all "+R[2]+" are "+R[4]+", and all "+R[4]+" are "+R[6]+" — so this "+R[0]+" must be a "+R[5]+". The other options reverse the chain, which deduction does not allow.",
      {row:R,mode:mode});
  }
  var first="All "+R[1]+" are "+R[2]+". All "+R[2]+" are "+R[4]+".";
  var second="All "+R[2]+" are "+R[4]+". All "+R[1]+" are "+R[2]+".";
  return mcq((mode===0?first:second)+" One particular "+R[0]+" is being examined. Which conclusion MUST be true?",
    "The "+R[0]+" is also a "+R[3],
    ["The "+R[0]+" is not a "+R[3],"Every "+R[3]+" is a "+R[0],"Every member of "+R[2]+" is a "+R[0]],
    "Deduction follows the chain: all "+R[1]+" are "+R[2]+", and all "+R[2]+" are "+R[4]+", so this "+R[0]+" must be a "+R[3]+". The other options reverse the chain, which deduction does not allow.",
    {row:R,mode:mode});
});
E("u7-figure-pattern",7,["2.1"],1,"gen",function(){
  var p=ri(1,4),q=ri(0,5),N=ri(6,15);
  function cnt(n){return n*n+p*n+q;}
  var ctx=pick(["dots","stars","tiles"]);
  return numq("A pattern of "+ctx+" grows like this: Figure 1 has "+cnt(1)+", Figure 2 has "+cnt(2)+", and Figure 3 has "+cnt(3)+". The count for Figure \\(n\\) is \\(n^2 + "+p+"n"+(q>0?" + "+q:"")+"\\). How many "+ctx+" are in Figure \\("+N+"\\)?",
    cnt(N),0.011,
    "Substitute \\(n = "+N+"\\): \\("+N+"^2 + "+p+" \\times "+N+(q>0?" + "+q:"")+" = "+(N*N)+" + "+(p*N)+(q>0?" + "+q:"")+" = \\)<b>\\("+cnt(N)+"\\)</b>. (The formula checks against the given figures: for \\(n = 1, 2, 3\\) it gives \\("+cnt(1)+", "+cnt(2)+", "+cnt(3)+"\\), as stated.)",
    {p:p,q:q,N:N,ans:cnt(N)});
});

/* ============ selection engine ============ */
/* Mid-course scope (Table of Specifications, verified Oct 26, 2026): the mid-course
   exam samples Unit 4 only to Section 4.3, so the two Radical Equations entries
   (Section 4.4) are flagged postMid and held out whenever the Mid preset is active.
   Picking Unit 4 directly still serves the full unit. */
BANK.forEach(function(e){if(e.id==="u4-radical-equation"||e.id==="u4-extraneous"||e.id==="u4-model-equation"||e.id==="u4-model-evaluate"||e.id==="u4-cube-equation")e.postMid=true;});

/* ============ Constructed-response marks (generated) ============ */
/* Built by assemble-bank.py from the CRMARKS manifests at the top of
   each unit file. Exam Section B draws only from these entries. */
window.__BANK_CRMARKS={"u1-ambiguous-count":3,"u1-angle-between-paths":4,"u1-bisector-post":3,"u1-cosine-angle":2,"u1-cosine-angle-diagram":2,"u1-cosine-bridge-span":2,"u1-cosine-context":2,"u1-cosine-largest-angle":2,"u1-cosine-side":2,"u1-cosine-side-diagram":2,"u1-drone-split":3,"u1-fence-angle":2,"u1-ferry-distance":2,"u1-guy-wire":3,"u1-harbour-second-side":3,"u1-headland-boats":3,"u1-island-route":3,"u1-isosceles-span":2,"u1-kite-frame-chain":3,"u1-lighthouse-bearing":2,"u1-lock-gates":2,"u1-meadow-angle":2,"u1-median-length":4,"u1-offset-angle":3,"u1-orchard-tree":2,"u1-panel-perimeter":3,"u1-perimeter-angles":3,"u1-pipeline-angle":3,"u1-quad-perimeter":3,"u1-race-course":3,"u1-raft-crossing":2,"u1-rafter-span":2,"u1-regatta-chain":4,"u1-regatta-choice":4,"u1-river-chain":3,"u1-sail-angle":2,"u1-scaffold-bay":3,"u1-shared-side-intro":3,"u1-sine-angle":2,"u1-sine-side":2,"u1-sine-side-diagram":2,"u1-sine-supplement-side":2,"u1-sine-two-step":2,"u1-smallest-angle":2,"u1-survey-baseline":2,"u1-survey-network":4,"u1-truss-diagonal":3,"u1-two-lamps":3,"u1-two-stage-height":4,"u1-two-station-height":4,"u1-two-triangles":4,"u2-a-from-intercepts-point":3,"u2-axis-factored-num":1,"u2-axis-from-intercepts":1,"u2-axis-two-points":1,"u2-c-from-point":2,"u2-count-intercepts":1,"u2-eq-from-vertex":2,"u2-evaluate-f":1,"u2-factored-coeffs":2,"u2-factored-max-height":2,"u2-factored-y-intercept":1,"u2-fence-max":3,"u2-find-b-given-axis":2,"u2-max-area":3,"u2-max-context":2,"u2-max-height":2,"u2-max-product":2,"u2-min-cost":2,"u2-mirror-intercept":2,"u2-mirror-point":1,"u2-other-intercept":2,"u2-perimeter-max-area":2,"u2-profit-max":2,"u2-revenue-max-price":3,"u2-revenue-model":2,"u2-standard-from-factored":2,"u2-standard-to-vertex-k":2,"u2-vertex-form-eval":1,"u2-vertex-fraction-y":3,"u2-vertex-from-factored":2,"u2-vertex-from-two-points":2,"u2-vertex-given-axis":2,"u2-vertex-given-axis-factored":2,"u2-vertex-shift":1,"u2-vertex-time":1,"u2-vertex-to-standard-c":1,"u2-vertex-value":2,"u2-vertex-x":1,"u2-vertex-x-fraction":2,"u2-xintercepts":2,"u2-xintercepts-factored":1,"u2-xintercepts-vertex-form":2,"u2-y-intercept":1,"u3-border":3,"u3-context-area":3,"u3-discriminant-value":1,"u3-equal-roots-constant":2,"u3-equation-fraction-roots":2,"u3-equation-from-roots":2,"u3-exact-roots":2,"u3-factor-difference":2,"u3-factor-monic":2,"u3-factor-nonmonic":2,"u3-factor-solve":2,"u3-formula":2,"u3-formula-exact-roots":2,"u3-formula-ground":2,"u3-formula-negative-a":2,"u3-gcf-solve":2,"u3-model-number":2,"u3-number-pair":2,"u3-other-root":1,"u3-right-triangle-legs":2,"u3-root-difference":3,"u3-roots-sum-product":1,"u3-setup-equation":1,"u3-solve-height":2,"u3-solve-nonmonic":2,"u3-solve-rearrange":2,"u3-solve-square":1,"u3-squares-area":3,"u3-standard-coeffs":1,"u3-sum-squares-solve":2,"u3-two-numbers":3,"u3-zeros-factored":1,"u4-add-unlike":2,"u4-binomial-square":2,"u4-combine-multi":2,"u4-compare-radicals":1,"u4-conjugate-area":2,"u4-cube-equation":2,"u4-cube-equation-shifted":2,"u4-cube-mixed":2,"u4-defined-boundary":1,"u4-defined-count":3,"u4-diagonal-radical":2,"u4-difference-simplify":2,"u4-divide-radicals":2,"u4-entire-cube":1,"u4-entire-to-mixed":2,"u4-equation-restriction":1,"u4-evaluate-mixed":1,"u4-extraneous":3,"u4-extraneous-valid-root":2,"u4-mixed-to-entire":1,"u4-model-equation":2,"u4-model-evaluate":1,"u4-model-solve-variable":2,"u4-multiply":2,"u4-multiply-mixed":2,"u4-order":2,"u4-product-simplify":2,"u4-radical-equation":2,"u4-rationalize":1,"u4-rationalize-coefficient":2,"u4-reciprocal-sum":3,"u4-repair-simplify":2,"u4-restriction-boundary":1,"u4-restrictions":1,"u4-simplify-add":2,"u4-triangle-perimeter":2,"u4-variable-evaluate":1,"u4-variable-mixed":2,"u4-verify-root":1,"u4-width-radical":2,"u5-ad-claim":3,"u5-centre-mean":1,"u5-centre-median":1,"u5-centre-mode":1,"u5-ci-build":1,"u5-ci-count":2,"u5-ci-endpoint":1,"u5-ci-from-endpoints":1,"u5-ci-level-from-report":1,"u5-ci-majority":3,"u5-ci-read-report":2,"u5-ci-shrink":2,"u5-empirical":2,"u5-freq-countin":1,"u5-freq-missing":1,"u5-freq-total":1,"u5-histogram-read":2,"u5-media":4,"u5-midpoint":1,"u5-normal-count":2,"u5-outlier-range":2,"u5-poll-position":3,"u5-polygon-point":1,"u5-range":1,"u5-relfreq":1,"u5-relfreq-rev":1,"u5-sd-calc":2,"u5-sd-compare":2,"u5-sd-decisions":4,"u5-sd-from-variance":1,"u5-z-applied":2,"u5-z-backwards":1,"u5-z-calc":1,"u5-z-compare":2,"u5-z-prob":2,"u6-area-scale":2,"u6-better-buy":2,"u6-breakeven-plans":2,"u6-compare-rates":2,"u6-justify-consistency":3,"u6-map-distance":2,"u6-pack-cost":2,"u6-poster-cost":3,"u6-poster-dimensions":2,"u6-rate-difference":2,"u6-rate-isolate":1,"u6-rate-solve":1,"u6-scale-factor":1,"u6-similar-dimension":1,"u6-tile-cost":3,"u6-unit-rate":1,"u6-unknown-dimension":1,"u6-volume-scale":2,"u6-work-rate-solo":3,"u7-chain-conclusion":3,"u7-counterexample":2,"u7-counterexample-claims":2,"u7-counterexample-gen":2,"u7-counterexample-name":2,"u7-everyday-counterexample":2,"u7-false-pattern":2,"u7-figure-pattern":1,"u7-pattern-equation":2,"u7-pattern-next":1,"u7-pattern-quad":2,"u7-proof-repair":3,"u7-race-order":2,"u7-sequence-gap":1,"u7-smallest-counterexample":2,"u7-triangular-total":3,"u8-alternate-algebra":2,"u8-angle-chase":2,"u8-angle-sum-rule":1,"u8-co-interior":1,"u8-cointerior-algebra":2,"u8-congruence-deduce":1,"u8-congruence-perimeter":2,"u8-congruent-perimeter":1,"u8-corresponding-algebra":2,"u8-diagonals":1,"u8-exterior":1,"u8-exterior-algebra":3,"u8-isosceles-angles":2,"u8-isosceles-exterior":2,"u8-multi-angle":2,"u8-parallel-x-value":3,"u8-polygon-inverse":1,"u8-polygon-ratio":2,"u8-polygon-sum":1,"u8-regular-angle":1,"u8-regular-sides-from-angle":3,"u8-triangle-algebra":2,"u8-triangle-sum":1};
