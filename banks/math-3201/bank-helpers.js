// Math 3201 shared bank helpers, carried verbatim from the standalone
// app's bank source: the bank-local helpers the first builds use,
// plus the graph helpers for Units 2 to 4.
/* ================= bank-local helpers (Unit 1-4 builds) ================= */
function gcd2(x,y){x=Math.abs(x);y=Math.abs(y);while(y){var t=x%y;x=y;y=t;}return x||1;}
function frN(n,d){var g=gcd2(n,d);n/=g;d/=g;if(d<0){n=-n;d=-d;}if(d===1)return ""+n;return "\\frac{"+n+"}{"+d+"}";}
function linS(a,b){var s;if(a===1)s="x";else if(a===-1)s="-x";else if(a===0)s="";else s=a+"x";if(b===0)return s===""?"0":s;if(s==="")return ""+b;return s+(b>0?" + "+b:" - "+(-b));}
function linF(r){if(r===0)return "x";return "(x "+(r>0?"- "+r:"+ "+(-r))+")";}
function quadS(a,b,c){var s;if(a===1)s="x^2";else if(a===-1)s="-x^2";else s=a+"x^2";if(b!==0)s+=(b>0?" + ":" - ")+(Math.abs(b)===1?"x":Math.abs(b)+"x");if(c!==0)s+=(c>0?" + ":" - ")+Math.abs(c);return s;}
function quadR(r1,r2){return quadS(1,-(r1+r2),r1*r2);}
function FR(n,d){return "\\frac{"+n+"}{"+d+"}";}
function MV(s){return "\\("+s+"\\)";}

/* ================= graph helpers for Units 2 to 4 ================= */
function plotSVG(fn,x0,x1,y0,y1,o){
  o=o||{};var W=440,H=250,pad=26;
  var X=function(x){return pad+(x-x0)/(x1-x0)*(W-2*pad);};
  var Y=function(y){return H-pad-(y-y0)/(y1-y0)*(H-2*pad);};
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="100%" style="max-width:440px;background:#fff;border:1px solid #d8d2c4;border-radius:6px" xmlns="http://www.w3.org/2000/svg">';
  var gsx=o.gx||1,gsy=o.gy||1,gx,gy,xidx=0;
  for(gx=Math.ceil(x0/gsx)*gsx;gx<=x1;gx+=gsx,xidx++){out+='<line x1="'+fmt(X(gx),1)+'" y1="'+pad+'" x2="'+fmt(X(gx),1)+'" y2="'+(H-pad)+'" stroke="#eae5d6" stroke-width="1"/>';
    if(o.labelX&&(!o.labelEvery||xidx%o.labelEvery===0))out+='<text x="'+fmt(X(gx),1)+'" y="'+(H-6)+'" font-size="9" fill="#5a5344" text-anchor="middle">'+fmt(gx)+'</text>';}
  for(gy=Math.ceil(y0/gsy)*gsy;gy<=y1;gy+=gsy){out+='<line x1="'+pad+'" y1="'+fmt(Y(gy),1)+'" x2="'+(W-pad)+'" y2="'+fmt(Y(gy),1)+'" stroke="#eae5d6" stroke-width="1"/>';
    if(o.labelY&&gy!==0)out+='<text x="'+(pad-4)+'" y="'+fmt(Y(gy)+3,1)+'" font-size="9" fill="#5a5344" text-anchor="end">'+fmt(gy)+'</text>';}
  if(y0<0&&y1>0)out+='<line x1="'+pad+'" y1="'+fmt(Y(0),1)+'" x2="'+(W-pad)+'" y2="'+fmt(Y(0),1)+'" stroke="#17352a" stroke-width="1.3"/>';
  if(x0<0&&x1>0)out+='<line x1="'+fmt(X(0),1)+'" y1="'+pad+'" x2="'+fmt(X(0),1)+'" y2="'+(H-pad)+'" stroke="#17352a" stroke-width="1.3"/>';
  out+='<text x="'+(W-pad-2)+'" y="'+fmt(Y(0)-6,1)+'" font-size="12" fill="#17352a" text-anchor="end">x</text>';
  out+='<text x="'+fmt(X(0)+6,1)+'" y="'+(pad-8)+'" font-size="12" fill="#17352a">y</text>';
  if(!o.nocurve&&fn){
    var pts=[],N=140,i,x,y;
    for(i=0;i<=N;i++){x=x0+(x1-x0)*i/N;y=fn(x);if(y<y0)y=y0;if(y>y1)y=y1;pts.push(fmt(X(x),1)+","+fmt(Y(y),1));}
    out+='<polyline points="'+pts.join(" ")+'" fill="none" stroke="#0f766e" stroke-width="2.2"/>';
  }
  (o.points||[]).forEach(function(p){out+='<circle cx="'+fmt(X(p[0]),1)+'" cy="'+fmt(Y(p[1]),1)+'" r="3.6" fill="#b3541e"/>';});
  return out+'</svg>';
}
function tblHTML(xs,ys,xh,yh){
  var s='<table><tr><th>'+xh+'</th>';xs.forEach(function(x){s+='<td>'+x+'</td>';});
  s+='</tr><tr><th>'+yh+'</th>';ys.forEach(function(y){s+='<td>'+(y===null?'?':y)+'</td>';});
  return s+'</tr></table>';
}

/* ================= Graphics pass tranche 4 builders (ported from the Math 3200 helpers) ================= */
// fnPathD: sample fn on [x0,x1]; skip non-finite values and break the path
// on jumps (asymptotes) instead of drawing false lines. No clamping.
function fnPathD(fn,X,Y,x0,x1,y0,y1,N){
  N=N||240;var d="",pen=false,py=0,i,x,y;
  for(i=0;i<=N;i++){
    x=x0+(x1-x0)*i/N;
    try{y=fn(x);}catch(e){y=NaN;}
    if(typeof y!=="number"||!isFinite(y)||y<y0||y>y1){pen=false;continue;}
    if(pen&&Math.abs(y-py)>0.75*(y1-y0)){pen=false;}
    d+=(pen?"L ":"M ")+fmt(X(x),1)+" "+fmt(Y(y),1)+" ";
    pen=true;py=y;
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

/* ================= Venn builders, moved from bank-u7.js (Graphics pass tranche 4) ================= */
function venn2(aO,both,bO,none,lA,lB,mark){
  var s="<svg viewBox='0 0 220 150' width='220' height='150' xmlns='http://www.w3.org/2000/svg'>"
  +"<rect x='4' y='4' width='212' height='142' fill='none' stroke='#888'/>"
  +"<circle cx='84' cy='74' r='44' fill='#3a7bd5' fill-opacity='0.22' stroke='#3a7bd5'/>"
  +"<circle cx='136' cy='74' r='44' fill='#e67e22' fill-opacity='0.22' stroke='#e67e22'/>"
  +"<text x='14' y='20' font-size='12' fill='#666'>U</text>"
  +"<text x='52' y='38' font-size='13' font-weight='bold' fill='#2c5f9e'>"+lA+"</text>"
  +"<text x='146' y='38' font-size='13' font-weight='bold' fill='#b35c14'>"+lB+"</text>";
  if(aO!==null)s+="<text x='66' y='79' font-size='14' text-anchor='middle'>"+aO+"</text>";
  if(both!==null)s+="<text x='110' y='79' font-size='14' text-anchor='middle'>"+both+"</text>";
  if(bO!==null)s+="<text x='154' y='79' font-size='14' text-anchor='middle'>"+bO+"</text>";
  if(none!==null)s+="<text x='206' y='136' font-size='14' text-anchor='end'>"+none+"</text>";
  if(mark)s+="<text x='"+mark[0]+"' y='"+mark[1]+"' font-size='17' text-anchor='middle' fill='#c0392b'>★</text>";
  return s+"</svg>";
}
function venn3(aO,bO,cO,ab,ac,bc,abc,none,lA,lB,lC){
  var s="<svg viewBox='0 0 220 172' width='220' height='172' xmlns='http://www.w3.org/2000/svg'>"
  +"<rect x='4' y='4' width='212' height='164' fill='none' stroke='#888'/>"
  +"<circle cx='110' cy='64' r='40' fill='#3a7bd5' fill-opacity='0.20' stroke='#3a7bd5'/>"
  +"<circle cx='82' cy='110' r='40' fill='#27ae60' fill-opacity='0.20' stroke='#27ae60'/>"
  +"<circle cx='138' cy='110' r='40' fill='#e67e22' fill-opacity='0.20' stroke='#e67e22'/>"
  +"<text x='14' y='20' font-size='12' fill='#666'>U</text>"
  +"<text x='110' y='16' font-size='13' font-weight='bold' text-anchor='middle' fill='#2c5f9e'>"+lA+"</text>"
  +"<text x='30' y='88' font-size='13' font-weight='bold' fill='#1e8449'>"+lB+"</text>"
  +"<text x='178' y='88' font-size='13' font-weight='bold' fill='#b35c14'>"+lC+"</text>"
  +"<text x='110' y='45' font-size='13' text-anchor='middle'>"+aO+"</text>"
  +"<text x='52' y='133' font-size='13' text-anchor='middle'>"+bO+"</text>"
  +"<text x='168' y='133' font-size='13' text-anchor='middle'>"+cO+"</text>"
  +"<text x='83' y='86' font-size='13' text-anchor='middle'>"+ab+"</text>"
  +"<text x='137' y='86' font-size='13' text-anchor='middle'>"+ac+"</text>"
  +"<text x='110' y='133' font-size='13' text-anchor='middle'>"+bc+"</text>"
  +"<text x='110' y='106' font-size='13' text-anchor='middle'>"+abc+"</text>"
  +"<text x='208' y='162' font-size='13' text-anchor='end'>"+none+"</text>";
  return s+"</svg>";
}
