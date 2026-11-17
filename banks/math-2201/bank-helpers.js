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
