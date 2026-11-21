// Math 3200 shared bank helpers (added Nov 12, 2026 for Graphics Pass
// Tranche 4). The unit files keep their unit-prefixed local helpers;
// these builders are shared across units.
/* ================= Tranche 4 graphics builders =================
   fnPlotSVG: an honest general function plotter. It samples the given
   function and draws only where the value is finite and inside the
   window: nothing is clamped, so logarithmic and radical curves stop
   at their domain edges, and asymptotes break the path instead of
   drawing a false line across. fnPanelsSVG draws two such panels side
   by side for transformation comparisons. treeSVG draws a branching
   tree diagram with stage titles and edge labels; a stage's options
   may be a fixed list or a function of the path taken so far (for
   arrangements without repetition). treeSVG returns null when the
   tree has more leaves than o.maxLeaves (default 120), so callers can
   leave oversized draws unfigured. */
/* clipCurveSVG (Nov 20, 2026): draw fn clipped to the plot window.
   The curve stops where it leaves the window, the crossing point
   interpolated (no clamping shelves along the edges). A clipped end
   of an unrestricted graph carries a small arrowhead: exits through
   the window edge, and left/right edge ends whose function is still
   defined just outside the window. An end where the function is
   undefined beyond (a domain endpoint) gets no arrowhead. A jump
   across the whole window within one sample step is treated as an
   asymptote and left open. */
function clipCurveSVG(fn,X,Y,x0,x1,y0,y1){
  var N=240,i,x,y,dx=(x1-x0)/N,segs=[],cur=null,px=0,py=0,ps=-1;
  function st(v){return (typeof v!=="number"||!isFinite(v))?0:(v>y1?2:(v<y0?3:1));}
  function cx(xa,ya,xb,yb,bnd){var t=(bnd-ya)/(yb-ya);return [xa+(xb-xa)*t,bnd];}
  function begin(p,clip){cur={pts:[p],sc:clip,ec:false};}
  function finish(clip){if(cur){cur.ec=clip;if(cur.pts.length>=2)segs.push(cur);cur=null;}}
  for(i=0;i<=N;i++){
    x=x0+dx*i;
    try{y=fn(x);}catch(e){y=NaN;}
    var s=st(y);
    if(s===1){
      if(ps===1&&cur)cur.pts.push([x,y]);
      else if(ps===2||ps===3){var c1=cx(px,py,x,y,ps===2?y1:y0);begin(c1,true);cur.pts.push([x,y]);}
      else begin([x,y],false);
    }else if(s===2||s===3){
      if(ps===1&&cur){cur.pts.push(cx(px,py,x,y,s===2?y1:y0));finish(true);}
      else if((ps===2&&s===3)||(ps===3&&s===2)){
        if(Math.abs(y-py)<=1.5*(y1-y0))segs.push({pts:[cx(px,py,x,y,ps===2?y1:y0),cx(px,py,x,y,s===2?y1:y0)],sc:true,ec:true});
      }
    }else if(ps===1)finish(false);
    px=x;py=y;ps=s;
  }
  if(cur){var cont=false;try{var yv=fn(x1+dx);cont=(typeof yv==="number"&&isFinite(yv));}catch(e){}finish(cont?"edge":false);}
  if(segs.length&&segs[0].sc===false&&segs[0].pts[0][0]===x0){
    var cont0=false;try{var yv0=fn(x0-dx);cont0=(typeof yv0==="number"&&isFinite(yv0));}catch(e){}
    if(cont0)segs[0].sc="edge";
  }
  function arrow(p,q){ /* arrowhead at pixel point p, pointing away from pixel point q */
    var ax=p[0]-q[0],ay=p[1]-q[1],mag=Math.sqrt(ax*ax+ay*ay);if(!mag)return "";
    var ux=ax/mag,uy=ay/mag,bx=p[0]-ux*8,by=p[1]-uy*8,ox=-uy*3.8,oy=ux*3.8;
    return '<polygon points="'+fmt(p[0],1)+","+fmt(p[1],1)+" "+fmt(bx+ox,1)+","+fmt(by+oy,1)+" "+fmt(bx-ox,1)+","+fmt(by-oy,1)+'" fill="#0f766e"/>';
  }
  var out="",k,seg,pp,pa,pb;
  for(k=0;k<segs.length;k++){seg=segs[k];
    pp=seg.pts.map(function(q){return [X(q[0]),Y(q[1])];});
    out+='<polyline points="'+pp.map(function(q){return fmt(q[0],1)+","+fmt(q[1],1);}).join(" ")+'" fill="none" stroke="#0f766e" stroke-width="2.2"/>';
    if(seg.ec){pa=pp[pp.length-1];pb=pp[pp.length-2];out+=arrow(pa,pb);}
    if(seg.sc){pa=pp[0];pb=pp[1];out+=arrow(pa,pb);}
  }
  return out;
}
/* fnPathD (domain endpoints, Nov 21, 2026): a run of samples that
   ends or begins at an undefined sample ends or begins at a domain
   boundary, and the path now reaches the boundary point itself:
   the abscissa where the function stops being defined is located
   by bisection between the last defined and first undefined
   sample, and that point is appended or prepended when it lies in
   the window and continues the run (the standing jump guard).
   Before, a radical curve stopped at the nearest defined sample
   (the sqrt(x^2-49) branches ended near (plus/minus 7.02, 0.53)
   instead of (plus/minus 7, 0)). Window exits are unchanged, a
   fully defined function produces the same path as before, and
   the large-jump break still fires on finite jumps, so no path
   is ever connected across an asymptote or a discontinuity. */
function fnPathD(fn,X,Y,x0,x1,y0,y1,N){
  N=N||240;var d="",pen=false,py=0,i,x,y;
  var px=0,pUndef=false;
  function boundary(ua,da){ /* ua: fn undefined there; da: fn
     defined there. Bisect to the defined abscissa nearest the
     boundary and return it with its value. */
    var lo=ua,hi=da,mid,my,k;
    for(k=0;k<60;k++){mid=(lo+hi)/2;try{my=fn(mid);}catch(e){my=NaN;}
      if(typeof my==="number"&&isFinite(my))hi=mid;else lo=mid;}
    try{my=fn(hi);}catch(e){my=NaN;}
    return [hi,my];
  }
  for(i=0;i<=N;i++){
    x=x0+(x1-x0)*i/N;
    try{y=fn(x);}catch(e){y=NaN;}
    if(typeof y!=="number"||!isFinite(y)){
      if(pen){
        var be=boundary(x,px);
        if(be[1]>=y0&&be[1]<=y1&&Math.abs(be[1]-py)<=0.75*(y1-y0))d+="L "+fmt(X(be[0]),1)+" "+fmt(Y(be[1]),1)+" ";
      }
      pen=false;px=x;pUndef=true;continue;
    }
    if(y<y0||y>y1){pen=false;px=x;pUndef=false;continue;}
    if(pen&&Math.abs(y-py)>0.75*(y1-y0)){pen=false;}
    if(!pen&&pUndef&&i>0){
      var bs=boundary(px,x);
      if(bs[1]>=y0&&bs[1]<=y1&&Math.abs(y-bs[1])<=0.75*(y1-y0)){
        d+="M "+fmt(X(bs[0]),1)+" "+fmt(Y(bs[1]),1)+" ";
        d+="L "+fmt(X(x),1)+" "+fmt(Y(y),1)+" ";
        pen=true;py=y;px=x;pUndef=false;continue;
      }
    }
    d+=(pen?"L ":"M ")+fmt(X(x),1)+" "+fmt(Y(y),1)+" ";
    pen=true;py=y;px=x;pUndef=false;
  }
  return d;
}
function fnPlotSVG(fn,x0,x1,y0,y1,o){
  o=o||{};
  var i,x,y;
  if(y0===undefined||y1===undefined){
    var lo=Infinity,hi=-Infinity;
    for(i=0;i<=400;i++){
      x=x0+(x1-x0)*i/400;
      try{y=fn(x);}catch(e){y=NaN;}
      if(typeof y==="number"&&isFinite(y)){if(y<lo)lo=y;if(y>hi)hi=y;}
    }
    if(!isFinite(lo)){lo=-1;hi=1;}
    if(o.asymY!==undefined){lo=Math.min(lo,o.asymY);hi=Math.max(hi,o.asymY);}
    var padY=(hi-lo)*0.15+0.5;
    if(y0===undefined)y0=Math.floor((lo-padY)*2)/2;
    if(y1===undefined)y1=Math.ceil((hi+padY)*2)/2;
    if(y1-y0<1)y1=y0+1;
  }
  var W=440,H=250,padL=30,padR=12,padT=10,padB=24;
  var X=function(x){return padL+(x-x0)/(x1-x0)*(W-padL-padR);};
  var Y=function(y){return H-padB-(y-y0)/(y1-y0)*(H-padT-padB);};
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="100%" style="max-width:440px;background:#fff;border:1px solid #d8d2c4;border-radius:6px" xmlns="http://www.w3.org/2000/svg">';
  function labFmt(v,labels){
    if(labels){for(var j=0;j<labels.length;j++){if(Math.abs(labels[j][0]-v)<1e-6)return labels[j][1];}}
    return fmt(v);
  }
  var gx=o.gx||1,gy=o.gy||1,g,idx;
  if((x1-x0)/gx<=220){
    idx=0;
    for(g=Math.ceil(x0/gx)*gx;g<=x1+1e-9;g+=gx,idx++){
      out+='<line x1="'+fmt(X(g),1)+'" y1="'+padT+'" x2="'+fmt(X(g),1)+'" y2="'+(H-padB)+'" stroke="#eae5d6" stroke-width="1"/>';
      if(o.labelX&&(!o.labelEvery||idx%o.labelEvery===0))
        out+='<text x="'+fmt(X(g),1)+'" y="'+(H-6)+'" font-size="9" fill="#5a5344" text-anchor="middle">'+labFmt(g,o.xLabels)+'</text>';
    }
  }
  if((y1-y0)/gy<=220){
    for(g=Math.ceil(y0/gy)*gy;g<=y1+1e-9;g+=gy){
      out+='<line x1="'+padL+'" y1="'+fmt(Y(g),1)+'" x2="'+(W-padR)+'" y2="'+fmt(Y(g),1)+'" stroke="#eae5d6" stroke-width="1"/>';
      if(o.labelY&&!(g===0&&o.labelX))
        out+='<text x="'+(padL-4)+'" y="'+fmt(Y(g)+3,1)+'" font-size="9" fill="#5a5344" text-anchor="end">'+labFmt(g,o.yLabels)+'</text>';
    }
  }
  if(y0<0&&y1>0)out+='<line x1="'+padL+'" y1="'+fmt(Y(0),1)+'" x2="'+(W-padR)+'" y2="'+fmt(Y(0),1)+'" stroke="'+FIG_INK+'" stroke-width="1.3"/>';
  if(x0<0&&x1>0)out+='<line x1="'+fmt(X(0),1)+'" y1="'+padT+'" x2="'+fmt(X(0),1)+'" y2="'+(H-padB)+'" stroke="'+FIG_INK+'" stroke-width="1.3"/>';
  var xLabY=(y0<0&&y1>0)?Y(0):(H-padB);
  out+='<text x="'+(W-padR-2)+'" y="'+fmt(xLabY-6,1)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="end">x</text>';
  var yLabX=(x0<0&&x1>0)?X(0):padL;
  out+='<text x="'+fmt(yLabX+6,1)+'" y="'+(padT+10)+'" font-size="12" fill="'+FIG_INK+'">y</text>';
  if(o.asymY!==undefined&&o.asymY>y0&&o.asymY<y1){
    out+='<line x1="'+padL+'" y1="'+fmt(Y(o.asymY),1)+'" x2="'+(W-padR)+'" y2="'+fmt(Y(o.asymY),1)+'" stroke="'+FIG_ALT+'" stroke-width="1.4" stroke-dasharray="6 4"/>';
    out+='<text x="'+(W-padR-4)+'" y="'+fmt(Y(o.asymY)-5,1)+'" font-size="10" fill="'+FIG_ALT+'" text-anchor="end">y = '+fmt(o.asymY)+'</text>';
  }
  if(o.asymX!==undefined&&o.asymX>=x0&&o.asymX<=x1){
    out+='<line x1="'+fmt(X(o.asymX),1)+'" y1="'+padT+'" x2="'+fmt(X(o.asymX),1)+'" y2="'+(H-padB)+'" stroke="'+FIG_ALT+'" stroke-width="1.4" stroke-dasharray="6 4"/>';
    out+='<text x="'+fmt(X(o.asymX)+5,1)+'" y="'+(padT+24)+'" font-size="10" fill="'+FIG_ALT+'">x = '+fmt(o.asymX)+'</text>';
  }
  if(fn){
    var d=fnPathD(fn,X,Y,x0,x1,y0,y1,o.N);
    if(d)out+='<path d="'+d+'" fill="none" stroke="'+(o.color||FIG_ACC)+'" stroke-width="2.2"/>';
  }
  (o.extraFns||[]).forEach(function(ef){
    var dd=fnPathD(ef.fn,X,Y,x0,x1,y0,y1,o.N);
    if(dd)out+='<path d="'+dd+'" fill="none" stroke="'+(ef.color||FIG_ALT)+'" stroke-width="2"/>';
  });
  (o.points||[]).forEach(function(p,i){
    out+='<circle cx="'+fmt(X(p[0]),1)+'" cy="'+fmt(Y(p[1]),1)+'" r="3.6" fill="'+FIG_ALT+'"/>';
    if(o.pointLabels&&o.pointLabels[i])out+='<text x="'+fmt(X(p[0])+7,1)+'" y="'+fmt(Y(p[1])-7,1)+'" font-size="10" fill="'+FIG_INK+'">'+o.pointLabels[i]+'</text>';
  });
  return out+'</svg>';
}
function fnPanelsSVG(panels,o){
  o=o||{};
  var W=440,H=250,gap=12,np=panels.length;
  var pw=(W-gap*(np-1))/np;
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="100%" style="max-width:440px;background:#fff;border:1px solid #d8d2c4;border-radius:6px" xmlns="http://www.w3.org/2000/svg">';
  panels.forEach(function(pn,pi){
    var ox=pi*(pw+gap),padL=24,padR=5,padT=18,padB=20;
    var x0=pn.x0,x1=pn.x1,y0=pn.y0,y1=pn.y1;
    var X=function(x){return ox+padL+(x-x0)/(x1-x0)*(pw-padL-padR);};
    var Y=function(y){return H-padB-(y-y0)/(y1-y0)*(H-padT-padB);};
    out+='<rect x="'+fmt(ox+0.5,1)+'" y="0.5" width="'+fmt(pw-1,1)+'" height="'+(H-1)+'" fill="none" stroke="#eae5d6" stroke-width="1"/>';
    if(pn.title)out+='<text x="'+fmt(ox+pw/2,1)+'" y="13" font-size="11" fill="'+FIG_INK+'" text-anchor="middle">'+pn.title+'</text>';
    var gx=pn.gx||1,gy=pn.gy||1,g;
    if((x1-x0)/gx<=60){for(g=Math.ceil(x0/gx)*gx;g<=x1+1e-9;g+=gx){
      out+='<line x1="'+fmt(X(g),1)+'" y1="'+padT+'" x2="'+fmt(X(g),1)+'" y2="'+(H-padB)+'" stroke="#eae5d6" stroke-width="1"/>';
      out+='<text x="'+fmt(X(g),1)+'" y="'+(H-5)+'" font-size="8" fill="#5a5344" text-anchor="middle">'+fmt(g)+'</text>';}}
    if((y1-y0)/gy<=60){for(g=Math.ceil(y0/gy)*gy;g<=y1+1e-9;g+=gy){
      out+='<line x1="'+fmt(ox+padL,1)+'" y1="'+fmt(Y(g),1)+'" x2="'+fmt(ox+pw-padR,1)+'" y2="'+fmt(Y(g),1)+'" stroke="#eae5d6" stroke-width="1"/>';
      if(g!==0)out+='<text x="'+fmt(ox+padL-3,1)+'" y="'+fmt(Y(g)+3,1)+'" font-size="8" fill="#5a5344" text-anchor="end">'+fmt(g)+'</text>';}}
    if(y0<0&&y1>0)out+='<line x1="'+fmt(ox+padL,1)+'" y1="'+fmt(Y(0),1)+'" x2="'+fmt(ox+pw-padR,1)+'" y2="'+fmt(Y(0),1)+'" stroke="'+FIG_INK+'" stroke-width="1.2"/>';
    if(x0<0&&x1>0)out+='<line x1="'+fmt(X(0),1)+'" y1="'+padT+'" x2="'+fmt(X(0),1)+'" y2="'+(H-padB)+'" stroke="'+FIG_INK+'" stroke-width="1.2"/>';
    if(pn.asymY!==undefined&&pn.asymY>y0&&pn.asymY<y1)
      out+='<line x1="'+fmt(ox+padL,1)+'" y1="'+fmt(Y(pn.asymY),1)+'" x2="'+fmt(ox+pw-padR,1)+'" y2="'+fmt(Y(pn.asymY),1)+'" stroke="'+FIG_ALT+'" stroke-width="1.3" stroke-dasharray="5 4"/>';
    if(pn.fn){var d=fnPathD(pn.fn,X,Y,x0,x1,y0,y1,200);if(d)out+='<path d="'+d+'" fill="none" stroke="'+(pn.color||FIG_ACC)+'" stroke-width="2.2"/>';}
    (pn.points||[]).forEach(function(p){out+='<circle cx="'+fmt(X(p[0]),1)+'" cy="'+fmt(Y(p[1]),1)+'" r="3.2" fill="'+FIG_ALT+'"/>';});
  });
  return out+'</svg>';
}
function treeSVG(stages,o){
  o=o||{};
  function optsAt(depth,path){
    var s=stages[depth];
    return (typeof s.options==="function")?s.options(path.slice()):s.options;
  }
  function countLeaves(depth,path){
    if(depth>=stages.length)return 1;
    var opts=optsAt(depth,path),sum=0,i;
    for(i=0;i<opts.length;i++)sum+=countLeaves(depth+1,path.concat([opts[i]]));
    return sum;
  }
  var leaves=countLeaves(0,[]);
  var maxL=o.maxLeaves||120;
  if(leaves>maxL)return null;
  var pitch=leaves<=12?24:(leaves<=30?19:16);
  var colW=o.colW||104;
  var leafW=o.leafLabel?58:14;
  var W=36+stages.length*colW+leafW;
  var top=34,H=top+leaves*pitch+8;
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="100%" style="max-width:520px;background:#fff;border:1px solid #d8d2c4;border-radius:6px" xmlns="http://www.w3.org/2000/svg">';
  var d,px,cx;
  for(d=0;d<stages.length;d++){
    px=(d===0)?18:36+(d-1)*colW;
    cx=36+d*colW;
    if(stages[d].title)out+='<text x="'+fmt((px+cx)/2,1)+'" y="16" font-size="10.5" fill="'+FIG_INK+'" text-anchor="middle">'+stages[d].title+'</text>';
  }
  var body="",leafIdx=0;
  function layout(depth,path){
    var x=(depth<0)?18:36+depth*colW;
    if(depth===stages.length-1){
      var ly=top+(leafIdx+0.5)*pitch;leafIdx++;
      body+='<circle cx="'+x+'" cy="'+fmt(ly,1)+'" r="2.6" fill="'+FIG_ALT+'"/>';
      if(o.leafLabel)body+='<text x="'+(x+8)+'" y="'+fmt(ly+3.5,1)+'" font-size="10.5" fill="'+FIG_INK+'">'+o.leafLabel(path)+'</text>';
      return ly;
    }
    var opts=optsAt(depth+1,path),ys=[],i;
    for(i=0;i<opts.length;i++)ys.push(layout(depth+1,path.concat([opts[i]])));
    var y=(ys[0]+ys[ys.length-1])/2;
    var nx=36+(depth+1)*colW;
    for(i=0;i<opts.length;i++){
      body+='<line x1="'+x+'" y1="'+fmt(y,1)+'" x2="'+nx+'" y2="'+fmt(ys[i],1)+'" stroke="#8a8272" stroke-width="1.2"/>';
      body+='<text x="'+fmt(nx-7,1)+'" y="'+fmt(ys[i]-5,1)+'" font-size="10" fill="#5a5344" text-anchor="end">'+opts[i]+'</text>';
    }
    body+='<circle cx="'+x+'" cy="'+fmt(y,1)+'" r="2.6" fill="'+FIG_INK+'"/>';
    return y;
  }
  layout(-1,[]);
  return out+body+'</svg>';
}
