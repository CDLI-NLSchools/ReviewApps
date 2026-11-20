/* Math 2200 bank module for the unified review app shell.
   Assembled by assemble-bank.py from banks/math-2200/; edit the
   per-unit sources there, not this file. Entries register through
   the shell's E(id, unit, indicators, level, kind, gen). */

/* ----- bank-helpers.js ----- */
// Math 2200 bank header, carried verbatim from the standalone app's
// bank source (bank-src.js, lines 1 to 3). The standalone's bank is
// maintained in that one assembled file (its build note: "Entry source
// is maintained in bank-src.js") and spliced into its index.html by
// inject_bank.py; the tranche files under tranche1/ and tranche2/ in
// the standalone folder are earlier drafts and differ from it, so
// these per-unit sources were cut from bank-src.js itself, at the
// unit banner boundaries, and tile it exactly.
/* Math 2200 Review bank source. Assembled from tranche1/unit1.js to unit4.js
   (mid scope) and tranche2/unit5.js to unit9.js (final scope). Spliced into
   index.html by inject_bank.py. */

/* ==== Graphics pass Tranche 2 (November 12, 2026): parabola and
   rectangle figure builders, ported verbatim from the Math 2201
   bank's Tranche 1 builders (banks/math-2201/bank-helpers.js).
   Same contract: every figure is drawn from the calling entry's
   own drawn values, in the shell figure style (FIG_INK, FIG_SHADE,
   FIG_ACC, _txt, fmt). parSVG label modes: "values" shows axis
   numbers (read-off questions); "none" (the default) shows
   gridlines and unlabelled dots only, so the figure supports a
   compute question without giving away its key. ==== */
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

/* ============ Prior knowledge tranche helpers (Nov 15, 2026) ============ */
/* Helper families copied from the feeder banks for the borrowed
   tranche entries. The Mathematics 9 families travel under n1, n5
   and n6 prefixes: their original names collide with Math 2200
   helpers of different behaviour (notably u5lin). The Mathematics
   1201 and Mathematics 8 families copy verbatim; the gcd helpers
   whose bodies are identical in both banks were not duplicated. */

/* u7names: from math-1201:u7names */
function u7names(){return pick([["A","B","C"],["D","E","F"],["G","H","J"],["K","L","M"],["M","N","P"],["P","Q","R"],["S","T","U"],["V","W","X"],["B","C","D"],["H","J","K"],["R","S","T"],["W","X","Y"],["C","D","E"],["F","G","H"],["J","K","L"],["N","P","Q"],["Q","R","S"],["T","U","V"],["X","Y","Z"],["D","F","G"],["E","G","H"],["L","M","N"],["P","R","S"],["U","V","W"],["A","C","E"],["B","D","F"],["H","K","M"],["K","M","P"],["M","P","R"],["R","T","V"]]);}

/* u7side: from math-1201:u7side */
function u7side(a,b){return a+b;}

/* FR: from math-1201:FR */
function FR(n,d){return "\\frac{"+n+"}{"+d+"}";}

/* u7red: from math-1201:u7red */
function u7red(n,d){var g=u7gcd(n,d);n/=g;d/=g;if(d<0){n=-n;d=-d;}return [n,d];}

/* u7fracS: from math-1201:u7fracS */
function u7fracS(n,d){var r=u7red(n,d);if(r[1]===1)return ""+r[0];return FR(r[0],r[1]);}

/* u7pickS3: from math-1201:u7pickS3 */
function u7pickS3(ans,cands){
  var out=[],seen={};seen[ans]=1;
  for(var i=0;i<cands.length&&out.length<3;i++){var c=cands[i];if(typeof c==="string"&&c!==ans&&!seen[c]){seen[c]=1;out.push(c);}}
  var k=2;while(out.length<3){var c2="\\("+(ans.length+k)+"\\)";k++;if(!seen[c2]){seen[c2]=1;out.push(c2);}}
  return out;
}

/* U7_TRIPLES: from math-1201:U7_TRIPLES */
var U7_TRIPLES=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[6,8,10],[9,12,15],[20,21,29],[9,40,41],[12,35,37],[10,24,26],[12,16,20],[16,30,34]];

/* u7figArc: from math-1201:u7figArc */
function u7figArc(E,r,u,hx){
  var sweep=(hx*u[1]>0)?1:0;
  return '<path d="M '+fmt(E[0]+r*hx,1)+' '+fmt(E[1],1)+' A '+r+' '+r+' 0 0 '+sweep+' '+fmt(E[0]+r*u[0],1)+' '+fmt(E[1]+r*u[1],1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
}

/* u7pairSVG: from math-1201:u7pairSVG */
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

/* u7asinD: from math-1201:u7asinD */
function u7asinD(x){return Math.asin(x)*180/Math.PI;}

/* u7acosD: from math-1201:u7acosD */
function u7acosD(x){return Math.acos(x)*180/Math.PI;}

/* u7atanD: from math-1201:u7atanD */
function u7atanD(x){return Math.atan(x)*180/Math.PI;}

/* u7sinD: from math-1201:u7sinD */
function u7sinD(d){return Math.sin(d*Math.PI/180);}

/* u7cosD: from math-1201:u7cosD */
function u7cosD(d){return Math.cos(d*Math.PI/180);}

/* u7tanD: from math-1201:u7tanD */
function u7tanD(d){return Math.tan(d*Math.PI/180);}

/* u7r1: from math-1201:u7r1 */
function u7r1(n){return Math.round(n*10)/10;}

/* u7f1: from math-1201:u7f1 */
function u7f1(n){return (Math.round(n*10)/10).toFixed(1);}

/* U7_ANGLES: from math-1201:U7_ANGLES */
var U7_ANGLES=[25,28,30,32,35,38,40,42,45,48,50,52,55,58,60,62,65];

/* balDp: from math-1201:balDp */
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

/* u7figLine: from math-1201:u7figLine */
function u7figLine(x1,y1,x2,y2,w,dash){
  return '<line x1="'+fmt(x1,1)+'" y1="'+fmt(y1,1)+'" x2="'+fmt(x2,1)+'" y2="'+fmt(y2,1)+'" stroke="'+FIG_INK+'" stroke-width="'+(w||2)+'"'+(dash?' stroke-dasharray="5 4"':"")+'/>';
}

/* u7figAngLab: from math-1201:u7figAngLab */
function u7figAngLab(E,r,u,hx,str){
  var bx=hx+u[0],by=u[1],bl=Math.sqrt(bx*bx+by*by)||1;
  return _txt(E[0]+(r+13)*bx/bl,E[1]+(r+13)*by/bl,str,12,false);
}

/* u7triSceneSVG: from math-1201:u7triSceneSVG */
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

/* u7rectDiagSVG: from math-1201:u7rectDiagSVG */
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

/* m8GridDistSVG: from math-8:m8GridDistSVG */
function m8GridDistSVG(x1,y1,x2,y2){
  var xm=x2+1,ym=y2+1,cell=Math.min(230/Math.max(xm,1),165/Math.max(ym,1));
  var ox=45,oy=195;
  function X(v){return ox+v*cell;} function Y(v){return oy-v*cell;}
  var s='<svg viewBox="0 0 320 225" width="320" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: two points on a grid joined by a straight line">';
  for(var i=0;i<=xm;i++){s+='<line x1="'+fmt(X(i),1)+'" y1="'+fmt(Y(0),1)+'" x2="'+fmt(X(i),1)+'" y2="'+fmt(Y(ym),1)+'" stroke="'+FIG_SHADE+'" stroke-width="1.2"/>';}
  for(var j=0;j<=ym;j++){s+='<line x1="'+fmt(X(0),1)+'" y1="'+fmt(Y(j),1)+'" x2="'+fmt(X(xm),1)+'" y2="'+fmt(Y(j),1)+'" stroke="'+FIG_SHADE+'" stroke-width="1.2"/>';}
  s+='<line x1="'+fmt(X(0),1)+'" y1="'+fmt(Y(0),1)+'" x2="'+fmt(X(xm),1)+'" y2="'+fmt(Y(0),1)+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  s+='<line x1="'+fmt(X(0),1)+'" y1="'+fmt(Y(0),1)+'" x2="'+fmt(X(0),1)+'" y2="'+fmt(Y(ym),1)+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  s+='<line x1="'+fmt(X(x1),1)+'" y1="'+fmt(Y(y1),1)+'" x2="'+fmt(X(x2),1)+'" y2="'+fmt(Y(y1),1)+'" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5 4"/>';
  s+='<line x1="'+fmt(X(x2),1)+'" y1="'+fmt(Y(y1),1)+'" x2="'+fmt(X(x2),1)+'" y2="'+fmt(Y(y2),1)+'" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5 4"/>';
  s+='<line x1="'+fmt(X(x1),1)+'" y1="'+fmt(Y(y1),1)+'" x2="'+fmt(X(x2),1)+'" y2="'+fmt(Y(y2),1)+'" stroke="'+FIG_ACC+'" stroke-width="2.4"/>';
  s+='<circle cx="'+fmt(X(x1),1)+'" cy="'+fmt(Y(y1),1)+'" r="3.6" fill="'+FIG_INK+'"/>';
  s+='<circle cx="'+fmt(X(x2),1)+'" cy="'+fmt(Y(y2),1)+'" r="3.6" fill="'+FIG_INK+'"/>';
  s+=_txt(X(x1)-4,Y(y1)+18,"("+x1+", "+y1+")",11.5,true);
  s+=_txt(X(x2)+6,Y(y2)-14,"("+x2+", "+y2+")",11.5,true);
  s+=_txt((X(x1)+X(x2))/2-13,(Y(y1)+Y(y2))/2-10,"?",14,true);
  return s+'</svg>';
}

/* u7trim: from math-1201:u7trim */
function u7trim(n){var r=Math.round(n*100)/100;return ""+r;}

/* u7slantAngle: from math-1201:u7slantAngle */
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

/* u7ans1: from math-1201:u7ans1 */
function u7ans1(v){var a=u7f1(v),out=[a];if(a.slice(-2)===".0")out.push(a.slice(0,-2));return out;}

/* u7riseRun: from math-1201:u7riseRun */
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

/* u4pickS3: from math-1201:u4pickS3 */
function u4pickS3(ans,cands){
  var out=[],seen={};seen[ans]=1;
  for(var i=0;i<cands.length&&out.length<3;i++){var c=cands[i];if(typeof c==="string"&&c!==ans&&!seen[c]){seen[c]=1;out.push(c);}}
  var pad=[" (one reading of the graph)"," (a second reading of the graph)"," (a third reading of the graph)"];
  var k=0;while(out.length<3){out.push(ans+pad[k]);k++;}
  return out;
}

/* u4setS: from math-1201:u4setS */
function u4setS(arr){return "\\{"+arr.join(", ")+"\\}";}

/* u4num: from math-1201:u4num */
function u4num(n){var v=Math.round(n*100)/100;return ""+v;}

/* u4pairS: from math-1201:u4pairS */
function u4pairS(x,y){return "("+u4num(x)+", "+u4num(y)+")";}

/* u4pairsS: from math-1201:u4pairsS */
function u4pairsS(pairs){return "\\{"+pairs.map(function(p){return u4pairS(p[0],p[1]);}).join(", ")+"\\}";}

/* u4interval: from math-1201:u4interval */
function u4interval(v,lo,hi){return "\\("+lo+" \\le "+v+" \\le "+hi+"\\)";}

/* u4term: from math-1201:u4term */
function u4term(m){
  if(m===1)return "x"; if(m===-1)return "-x";
  return u4num(m)+"x";
}

/* u4lin: from math-1201:u4lin */
function u4lin(m,b){
  var s=u4term(m);
  if(b>0)s+=" + "+b; else if(b<0)s+=" - "+Math.abs(b);
  return s;
}

/* u3VarPart: from math-1201:u3VarPart */
function u3VarPart(ex, ey) {
  var s = "";
  if (ex > 0) s += "x" + (ex > 1 ? "^" + ex : "");
  if (ey > 0) s += "y" + (ey > 1 ? "^" + ey : "");
  return s;
}

/* u3Body: from math-1201:u3Body */
function u3Body(c, ex, ey) {
  var vp = u3VarPart(ex, ey);
  return (vp && Math.abs(c) === 1) ? vp : Math.abs(c) + vp;
}

/* u3Str: from math-1201:u3Str */
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

/* u3TermsOf: from math-1201:u3TermsOf */
function u3TermsOf(coeffs, v) {
  return coeffs.map(function (c, i) { var p = coeffs.length - 1 - i; return v === "y" ? [c, 0, p] : [c, p, 0]; });
}

/* u3PC: from math-1201:u3PC */
function u3PC(coeffs, v) { return u3Str(u3TermsOf(coeffs, v)); }

/* u3Alg: from math-1201:u3Alg */
function u3Alg(lines) { return "\\[ \\begin{aligned} " + lines.join(" \\\\ ") + " \\end{aligned} \\]"; }

/* u3Par: from math-1201:u3Par */
function u3Par(coeffs, v) { return "(" + u3PC(coeffs, v) + ")"; }

/* u3FacRaw: from math-1201:u3FacRaw */
function u3FacRaw(gRaw, facs, v) {
  return (gRaw || "") + facs.map(function (f) { return u3Par(f, v); }).join("");
}

/* u3Nz: from math-1201:u3Nz */
function u3Nz(a, b) { var n = 0; while (n === 0) n = ri(a, b); return n; }

/* u3StrSeq: from math-1201:u3StrSeq */
function u3StrSeq(list) {
  var parts = list.filter(function (t) { return t[0] !== 0; });
  if (!parts.length) return "0";
  return parts.map(function (t, i) {
    var b = u3Body(t[0], t[1], t[2]);
    if (i === 0) return (t[0] < 0 ? "-" : "") + b;
    return (t[0] < 0 ? " - " : " + ") + b;
  }).join("");
}

/* u3Mul: from math-1201:u3Mul */
function u3Mul(P, Q) {
  var out = [];
  P.forEach(function (p) { Q.forEach(function (q) { out.push([p[0] * q[0], p[1] + q[1], p[2] + q[2]]); }); });
  return out;
}

/* u3Conv: from math-1201:u3Conv */
function u3Conv(A, B) {
  var out = [], i;
  for (i = 0; i < A.length + B.length - 1; i++) out.push(0);
  A.forEach(function (a, j) { B.forEach(function (b, k) { out[j + k] += a * b; }); });
  return out;
}

/* u3M: from math-1201:u3M */
function u3M(raw) { return "\\(" + raw + "\\)"; }

/* u3PerturbCoeffs: from math-1201:u3PerturbCoeffs */
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

/* u3DistrCoeffs: from math-1201:u3DistrCoeffs */
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

/* u3GCD: from math-1201:u3GCD */
function u3GCD(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; }

/* u3GCD3: from math-1201:u3GCD3 */
function u3GCD3(a, b, c) { return u3GCD(u3GCD(a, b), c); }

/* u3FacExpand: from math-1201:u3FacExpand */
function u3FacExpand(facs) {
  var acc = [1];
  facs.forEach(function (f) { acc = u3Conv(acc, f); });
  return acc;
}

/* u3SameArr: from math-1201:u3SameArr */
function u3SameArr(a, b) { return a.length === b.length && a.every(function (x, i) { return x === b[i]; }); }

/* u3FacDistr: from math-1201:u3FacDistr */
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

/* u3PerturbTerms: from math-1201:u3PerturbTerms */
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

/* u5red: from math-1201:u5red */
function u5red(n,d){var g=u5gcd(n,d);n/=g;d/=g;if(d<0){n=-n;d=-d;}return [n,d];}

/* u5fs: from math-1201:u5fs */
function u5fs(n,d){var r=u5red(n,d);if(r[1]===1)return ""+r[0];if(r[0]<0)return "-"+FR(-r[0],r[1]);return FR(r[0],r[1]);}

/* u5coef: from math-1201:u5coef */
function u5coef(n,d,v){var r=u5red(n,d);if(r[0]===0)return "0";if(r[1]===1){if(r[0]===1)return v;if(r[0]===-1)return "-"+v;return r[0]+v;}return u5fs(r[0],r[1])+v;}

/* u5ybRaw: from math-1201:u5ybRaw */
function u5ybRaw(mN,mD,b){var r=u5red(mN,mD);if(r[0]===0)return "y = "+b;var s="y = "+u5coef(r[0],r[1],"x");if(b>0)s+=" + "+b;else if(b<0)s+=" - "+(-b);return s;}

/* u5genRaw: from math-1201:u5genRaw */
function u5genRaw(A,B,C){
  var s=(A===1?"x":A===-1?"-x":A+"x");
  s+=(B<0?" - ":" + ")+(Math.abs(B)===1?"y":Math.abs(B)+"y");
  if(C>0)s+=" + "+C;else if(C<0)s+=" - "+(-C);
  return s+" = 0";
}

/* u5genFromLine: from math-1201:u5genFromLine */
function u5genFromLine(mN,mD,b){ /* primitive general form of y = mx + b, A positive */
  var r=u5red(mN,mD),p=r[0],q=r[1];
  var A=Math.abs(p),B=(p>0?-q:q),C=(p>0?q*b:-q*b);
  if(p===0){A=0;B=1;C=-b;}
  return [A,B,C];
}

/* u5pickD3: from math-1201:u5pickD3 */
function u5pickD3(ans,cands){
  var out=[],seen={};seen[ans]=1;
  for(var i=0;i<cands.length&&out.length<3;i++){var c=cands[i];if(typeof c==="number"&&isFinite(c)&&c!==ans&&!seen[c]){seen[c]=1;out.push(c);}}
  var k=2;while(out.length<3){var c2=ans+k;k++;if(!seen[c2]){seen[c2]=1;out.push(c2);}}
  return out;
}

/* u5slopes: from math-1201:u5slopes */
function u5slopes(){return [[1,2],[2,3],[3,2],[2,1],[3,1],[1,3],[4,3],[3,4],[5,2],[1,4],[5,4],[4,5],[-1,2],[-2,3],[-3,2],[-2,1],[-3,1],[-1,3],[-4,3],[-3,4],[-5,2],[-1,4],[-5,4],[-4,5]];}

/* u5pickSlope: from math-1201:u5pickSlope */
function u5pickSlope(){return pick(u5slopes());}

/* u5pt: from math-1201:u5pt */
function u5pt(x,y){return "("+x+", "+y+")";}

/* u5minusTerm: from math-1201:u5minusTerm */
function u5minusTerm(v,val){return v+(val>=0?" - "+val:" + "+(-val));}

/* u2radS: from math-1201:u2radS */
function u2radS(idx,rad){return idx===2?("\\sqrt{"+rad+"}"):("\\sqrt["+idx+"]{"+rad+"}");}

/* u2pickS3: from math-1201:u2pickS3 */
function u2pickS3(ans,cands){
  var out=[],seen={};seen[ans]=1;
  for(var i=0;i<cands.length&&out.length<3;i++){var c=cands[i];if(typeof c==="string"&&c!==ans&&!seen[c]){seen[c]=1;out.push(c);}}
  return out;
}

/* u2gcd: from math-1201:u2gcd */
function u2gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t;}return a||1;}

/* u2red: from math-1201:u2red */
function u2red(n,d){var g=u2gcd(n,d);n/=g;d/=g;if(d<0){n=-n;d=-d;}return [n,d];}

/* u2expStr: from math-1201:u2expStr */
function u2expStr(base,n,d){
  var r=u2red(n,d);
  if(r[0]===0)return "\\(1\\)";
  if(r[1]===1){if(r[0]===1)return "\\("+base+"\\)";return "\\("+base+"^{"+r[0]+"}\\)";}
  return "\\("+base+"^{"+FR(r[0],r[1])+"}\\)";
}

/* u2isSq: from math-1201:u2isSq */
function u2isSq(n){var r=Math.round(Math.sqrt(n));return r*r===n;}

/* u2isCu: from math-1201:u2isCu */
function u2isCu(n){var r=Math.round(Math.cbrt(n));return r*r*r===n;}

/* n5lin: from math-9:u5lin */
function n5lin(a, b) { var s; if (a === 1) s = "x"; else if (a === -1) s = "-x"; else s = fmt(a) + "x"; if (b > 0) s += "+" + fmt(b); else if (b < 0) s += "-" + fmt(-b); return s; }

/* n1gcd: from math-9:u1gcd */
function n1gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }

/* n1red: from math-9:u1red */
function n1red(n, d) { var g = n1gcd(n, d); return [n / g, d / g]; }

/* n1frac: from math-9:u1frac */
function n1frac(n, d) { var r = n1red(n, d); n = r[0]; d = r[1]; if (d === 1) return "\\(" + n + "\\)"; if (n < 0) return "\\(-" + FR(-n, d) + "\\)"; return "\\(" + FR(n, d) + "\\)"; }

/* n1round: from math-9:u1round */
function n1round(x, p) { var m = Math.pow(10, p); return Math.round(x * m) / m; }

/* solT: from math-9:solT */
function solT(x, y, str, size, bold) {
  return '<text x="' + fmt(x, 1) + '" y="' + fmt(y, 1) + '" font-size="' + (size || 12) + '" fill="' + FIG_INK + '" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="middle" dominant-baseline="central"' + (bold ? ' font-weight="bold"' : "") + '>' + str + '</text>';
}

/* u6sgn: from math-1201:u6sgn */
function u6sgn(n){return n>0?(" + "+n):(n<0?(" - "+(-n)):"");}

/* u6coefVar: from math-1201:u6coefVar */
function u6coefVar(c,v){if(c===1)return v;if(c===-1)return "-"+v;return c+v;}

/* u6slopeTerm: from math-1201:u6slopeTerm */
function u6slopeTerm(m){return u6coefVar(m,"x");}

/* u6yRHS: from math-1201:u6yRHS */
function u6yRHS(m,b){return u6slopeTerm(m)+u6sgn(b);}

/* u6yEq: from math-1201:u6yEq */
function u6yEq(m,b){return "y = "+u6yRHS(m,b);}

/* u6pair: from math-1201:u6pair */
function u6pair(x,y){return "("+x+", "+y+")";}

/* u6meetSol: from math-1201:u6meetSol */
function u6meetSol(m1,b1,m2,b2,X,Y,ask){
  return "\\[ \\begin{aligned} "+u6yEq(m1,b1)+" \\\\ "+u6yEq(m2,b2)+" \\end{aligned} \\]"+
  " At the intersection the two \\(y\\) values are equal, so set the right sides equal and solve: \\["+
  "\\begin{aligned} "+u6yRHS(m1,b1)+" &= "+u6yRHS(m2,b2)+" \\\\ "+u6coefVar(m1-m2,"x")+" &= "+(b2-b1)+" \\\\ x &= "+X+" \\end{aligned} \\]"+
  " Substitute \\(x = "+X+"\\) into the first equation to get \\(y\\): \\["+
  "\\begin{aligned} y &= "+m1+"("+X+")"+u6sgn(b1)+" \\\\ y &= "+Y+" \\end{aligned} \\]"+
  " The point of intersection is \\("+u6pair(X,Y)+"\\) (check: the second equation also gives \\("+m2+"("+X+")"+u6sgn(b2)+" = "+Y+"\\), confirming the solution in both equations). The "+(ask==="x"?"x":"y")+"-value is <b>\\("+(ask==="x"?X:Y)+"\\)</b>.";
}

/* u6lhs: from math-1201:u6lhs */
function u6lhs(a,b){var s=u6coefVar(a,"x");if(b>0)s+=" + "+u6coefVar(b,"y").replace("-","");else if(b<0)s+=" - "+u6coefVar(-b,"y");return s;}

/* u6std: from math-1201:u6std */
function u6std(a,b,c){return u6lhs(a,b)+" = "+c;}

/* n5sym: from math-9:u5sym */
function n5sym(r) { return r === "le" ? "\\le" : r === "ge" ? "\\ge" : r === "lt" ? "<" : ">"; }

/* n5ineqTex: from math-9:u5ineqTex */
function n5ineqTex(v, r, rhs) { return "\\(" + v + " " + n5sym(r) + " " + rhs + "\\)"; }

/* n5line: from math-9:u5line */
function n5line(k, closed, dir) {
  var lo = k - 4, W = 320, H = 72, cy = 38;
  function X(v) { return 20 + (v - lo) * 35; }
  var s = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Number line graph">';
  s += '<line x1="8" y1="' + cy + '" x2="312" y2="' + cy + '" stroke="' + FIG_INK + '" stroke-width="1.5"/>';
  s += '<polygon points="312,' + cy + ' 302,' + (cy - 4) + ' 302,' + (cy + 4) + '" fill="' + FIG_INK + '"/>';
  s += '<polygon points="8,' + cy + ' 18,' + (cy - 4) + ' 18,' + (cy + 4) + '" fill="' + FIG_INK + '"/>';
  for (var v = lo; v <= k + 4; v++) { s += '<line x1="' + X(v) + '" y1="' + (cy - 5) + '" x2="' + X(v) + '" y2="' + (cy + 5) + '" stroke="' + FIG_INK + '" stroke-width="1.5"/><text x="' + X(v) + '" y="' + (cy + 22) + '" font-size="12" fill="' + FIG_INK + '" text-anchor="middle">' + fmt(v) + '</text>'; }
  var ex = dir === "right" ? 306 : 14;
  s += '<line x1="' + X(k) + '" y1="' + cy + '" x2="' + ex + '" y2="' + cy + '" stroke="' + FIG_ACC + '" stroke-width="4"/>';
  if (dir === "right") s += '<polygon points="' + ex + ',' + cy + ' ' + (ex - 9) + ',' + (cy - 5) + ' ' + (ex - 9) + ',' + (cy + 5) + '" fill="' + FIG_ACC + '"/>';
  else s += '<polygon points="' + ex + ',' + cy + ' ' + (ex + 9) + ',' + (cy - 5) + ' ' + (ex + 9) + ',' + (cy + 5) + '" fill="' + FIG_ACC + '"/>';
  s += '<circle cx="' + X(k) + '" cy="' + cy + '" r="6" fill="' + (closed ? FIG_INK : "#ffffff") + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  return s + '</svg>';
}

/* n5gcd: from math-9:u5gcd */
function n5gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }

/* n5fracTex: from math-9:u5fracTex */
function n5fracTex(p, q) { if (q < 0) { p = -p; q = -q; } var g = n5gcd(p, q); p /= g; q /= g; if (q === 1) return fmt(p); if (p < 0) return "-" + FR(-p, q); return FR(p, q); }

/* n5flip: from math-9:u5flip */
function n5flip(r) { return r === "lt" ? "gt" : r === "gt" ? "lt" : r === "le" ? "ge" : "le"; }

/* n6lin: from math-9:u6lin */
function n6lin(m, b, v) {
  var head = (m === 1 ? v : fmt(m) + v);
  if (b > 0) return head + " + " + fmt(b);
  if (b < 0) return head + " - " + fmt(-b);
  return head;
}

/* n6stageFig: from math-9:u6stageFig */
function n6stageFig(counts, item) {
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

/* ----- bank-u1.js ----- */
// Math 2200 Unit 1 Trigonometry question bank
// CRMARKS: u1-ambiguous-case=3
// CRMARKS: u1-axis-ratios=2
// CRMARKS: u1-context-distance=3
// CRMARKS: u1-cosine-law=2
// CRMARKS: u1-exact-values=2
// CRMARKS: u1-point-angle=2
// CRMARKS: u1-point-distance=2
// CRMARKS: u1-point-ratios=2
// CRMARKS: u1-quadrant=1
// CRMARKS: u1-read-sketch=1
// CRMARKS: u1-reference-angle=1
// CRMARKS: u1-same-reference=2
// CRMARKS: u1-sine-law=2
// CRMARKS: u1-solve-equation=2
// BIMODAL: u1-solve-equation=a
// BIMODAL: u1-point-ratios=a
// BIMODAL: u1-exact-values=a
// BIMODAL: u1-ambiguous-case=a
/* ================= Unit 1: Trigonometry ================= */
/* ================= Unit 1: Trigonometry =================
   Helpers are prefixed u1; the only other top-level statements are E(...) calls.
   18 entries: L1 4, L2 11, L3 3. Codes: MA2200.7.1 to 7.22 (all degrees; this
   course has no radians). Cluster A: the sine and cosine laws (7.1 to 7.6).
   Cluster B: angles in standard position (7.7 to 7.22). */

function u1gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }

function u1fr(n, d) { /* signed reduced fraction as a KaTeX body (no delimiters) */
  if (d < 0) { n = -n; d = -d; }
  if (n === 0) return "0";
  var g = u1gcd(n, d); n /= g; d /= g;
  var s = n < 0 ? "-" : ""; n = Math.abs(n);
  if (d === 1) return s + n;
  return s + "\\frac{" + n + "}{" + d + "}";
}

function u1dist3(correct, cands) { /* first three candidate strings that differ from the key and each other */
  var out = [];
  for (var i = 0; i < cands.length; i++) {
    var c = cands[i];
    if (c !== null && c !== undefined && c !== correct && out.indexOf(c) < 0) out.push(c);
    if (out.length === 3) break;
  }
  return out;
}

function u1quadOf(deg) { var p = ((deg % 360) + 360) % 360; return p < 90 ? 1 : p < 180 ? 2 : p < 270 ? 3 : 4; }
function u1refOf(deg) { var p = ((deg % 360) + 360) % 360; return p <= 90 ? p : p <= 180 ? 180 - p : p <= 270 ? p - 180 : 360 - p; }

function u1mag(kind, av) { /* exact magnitude string for a special-angle ratio value */
  var table;
  if (kind === "sin" || kind === "cos") table = [[0, "0"], [0.5, "\\frac{1}{2}"], [0.7071, "\\frac{\\sqrt{2}}{2}"], [0.866, "\\frac{\\sqrt{3}}{2}"], [1, "1"]];
  else table = [[0, "0"], [0.5774, "\\frac{\\sqrt{3}}{3}"], [1, "1"], [1.7321, "\\sqrt{3}"]];
  for (var i = 0; i < table.length; i++) if (Math.abs(av - table[i][0]) < 0.01) return table[i][1];
  return null;
}

function u1exact(kind, deg) { /* {s, v}: exact string and value of sin/cos/tan at a special degree, or null */
  var th = deg * Math.PI / 180, sv = Math.sin(th), cv = Math.cos(th), v;
  if (kind === "sin") v = sv;
  else if (kind === "cos") v = cv;
  else { if (Math.abs(cv) < 1e-9) return null; v = sv / cv; }
  var mag = u1mag(kind, Math.abs(v));
  if (mag === null) return null;
  return { s: (v < 0 && mag !== "0" ? "-" : "") + mag, v: v };
}

function u1armSVG(deg) { /* axes, unit circle, rotation arc and terminal arm for a standard-position angle */
  var th = deg * Math.PI / 180, cx = 88, cy = 88, R = 64;
  var ex = cx + R * Math.cos(th), ey = cy - R * Math.sin(th);
  var large = Math.abs(deg) > 180 ? 1 : 0, sweep = deg >= 0 ? 0 : 1;
  var ax = cx + 38 * Math.cos(th), ay = cy - 38 * Math.sin(th);
  var out = '<svg viewBox="0 0 176 176" width="176" height="176" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Angle in standard position">';
  out += '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="none" stroke="' + FIG_INK + '" stroke-width="1.3"/>';
  out += '<line x1="' + (cx - R - 12) + '" y1="' + cy + '" x2="' + (cx + R + 12) + '" y2="' + cy + '" stroke="' + FIG_INK + '" stroke-width="1"/>';
  out += '<line x1="' + cx + '" y1="' + (cy - R - 12) + '" x2="' + cx + '" y2="' + (cy + R + 12) + '" stroke="' + FIG_INK + '" stroke-width="1"/>';
  out += '<path d="M ' + (cx + 38) + ' ' + cy + ' A 38 38 0 ' + large + ' ' + sweep + ' ' + fmt(ax, 1) + ' ' + fmt(ay, 1) + '" fill="none" stroke="' + FIG_ACC + '" stroke-width="2"/>';
  out += '<line x1="' + cx + '" y1="' + cy + '" x2="' + fmt(ex, 1) + '" y2="' + fmt(ey, 1) + '" stroke="' + FIG_INK + '" stroke-width="2.2"/>';
  out += '<circle cx="' + fmt(ex, 1) + '" cy="' + fmt(ey, 1) + '" r="3.2" fill="' + FIG_ALT + '"/>';
  return out + '</svg>';
}

function u1ptSVG(x, y) { /* axes with the terminal arm to the point P(x, y) and dashed coordinate drops */
  var r = Math.sqrt(x * x + y * y), cx = 88, cy = 88, R = 64;
  var px = cx + R * x / r, py = cy - R * y / r;
  var out = '<svg viewBox="0 0 176 176" width="176" height="176" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Point on a terminal arm">';
  out += '<line x1="8" y1="' + cy + '" x2="168" y2="' + cy + '" stroke="' + FIG_INK + '" stroke-width="1"/>';
  out += '<line x1="' + cx + '" y1="8" x2="' + cx + '" y2="168" stroke="' + FIG_INK + '" stroke-width="1"/>';
  out += '<line x1="' + fmt(px, 1) + '" y1="' + fmt(py, 1) + '" x2="' + fmt(px, 1) + '" y2="' + cy + '" stroke="' + FIG_INK + '" stroke-width="0.8" stroke-dasharray="3 3"/>';
  out += '<line x1="' + fmt(px, 1) + '" y1="' + fmt(py, 1) + '" x2="' + cx + '" y2="' + fmt(py, 1) + '" stroke="' + FIG_INK + '" stroke-width="0.8" stroke-dasharray="3 3"/>';
  out += '<line x1="' + cx + '" y1="' + cy + '" x2="' + fmt(px, 1) + '" y2="' + fmt(py, 1) + '" stroke="' + FIG_INK + '" stroke-width="2.2"/>';
  out += '<circle cx="' + fmt(px, 1) + '" cy="' + fmt(py, 1) + '" r="3.2" fill="' + FIG_ALT + '"/>';
  out += _txt(px + (x >= 0 ? 8 : -8), py - 10, "P(" + x + ", " + y + ")", 12, true, x >= 0 ? "start" : "end");
  return out + '</svg>';
}

/* ---- 7.1: match a described situation to the labels of its diagram ---- */
E("u1-diagram-choice", 1, ["7.1"], 1, "gen", function () {
  var ctxs = [
    { name: "surveyor", open: "A surveyor is mapping a triangular plot of land with corners " },
    { name: "gardener", open: "A gardener is laying out a triangular garden bed with corners " },
    { name: "engineer", open: "An engineer is sketching a triangular brace with corners " },
    { name: "hiker", open: "A hiker is plotting three landmarks, " }
  ];
  var ctx = pick(ctxs);
  var L = pick([["P", "Q", "R"], ["A", "B", "C"], ["X", "Y", "Z"], ["D", "E", "F"]]);
  var len = pick([24, 30, 36, 45, 52, 68, 85, 120]);
  var A = ri(38, 78), B = ri(35, 145 - A);
  while (B === A) B = ri(35, 145 - A);
  var side = L[0] + L[1], side2 = L[1] + L[2], side3 = L[2] + L[0];
  function opt(s, a1, a2) { return s + " = " + len + ", angle " + L[0] + " = " + a1 + "°, angle " + L[1] + " = " + a2 + "°"; }
  var corr = opt(side, A, B);
  var dis = [opt(side2, A, B), opt(side3, A, B), opt(side, B, A)];
  return mcq(ctx.open + L[0] + ", " + L[1] + " and " + L[2] + ". The distance between " + L[0] + " and " + L[1] + " is " + len + " m. The angle at " + L[0] + " is " + A + "° and the angle at " + L[1] + " is " + B + "°. Which set of labels belongs on a diagram of this situation?",
    corr, dis,
    "The measured distance joins vertices " + L[0] + " and " + L[1] + ", so the side " + side + " carries the label " + len + ". The two given angles sit at the ends of that side: angle " + L[0] + " is " + A + "° and angle " + L[1] + " is " + B + "°. The matching labels are <b>" + corr + "</b>.",
    { ctx: ctx.name, len: len, A: A, B: B });
});

/* ---- 7.8: quadrant of an angle in standard position ---- */
E("u1-quadrant", 1, ["7.8"], 1, "gen", function () {
  var deg = ri(3, 357);
  while (deg % 90 < 3 || deg % 90 > 87) deg = ri(3, 357);
  var q = u1quadOf(deg), names = ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"];
  var corr = names[q - 1];
  var dis = names.filter(function (n) { return n !== corr; });
  var lo = (q - 1) * 90, hi = q * 90;
  return mcq("An angle of " + deg + "° is drawn in standard position. In which quadrant does its terminal arm lie?",
    corr, dis,
    "Standard position angles are measured counterclockwise from the positive x-axis. Since \\(" + lo + "^\\circ < " + deg + "^\\circ < " + hi + "^\\circ\\), the terminal arm of the " + deg + "° angle lies in <b>" + corr + "</b>.",
    { deg: deg });
});

/* ---- 7.9: reference angle ---- */
E("u1-reference-angle", 1, ["7.9"], 1, "gen", function () {
  var deg = ri(5, 355);
  while (deg % 90 === 0) deg = ri(5, 355);
  var ref = u1refOf(deg), q = u1quadOf(deg);
  var step = q === 1 ? deg + "^\\circ" : q === 2 ? "180^\\circ - " + deg + "^\\circ" : q === 3 ? deg + "^\\circ - 180^\\circ" : "360^\\circ - " + deg + "^\\circ";
  return numq("Determine the reference angle for an angle of " + deg + "° in standard position. Give the answer in degrees.",
    ref, 0.5,
    "The reference angle is the acute angle between the terminal arm and the x-axis. The angle " + deg + "° terminates in Quadrant " + ["I", "II", "III", "IV"][q - 1] + ": \\[ \\begin{aligned} \\text{reference angle} &= " + step + " \\\\ &= " + ref + "^\\circ \\end{aligned} \\] The reference angle is <b>" + ref + "°</b>.",
    { deg: deg });
});

/* ---- 7.7: read the measure of a sketched standard-position angle ---- */
E("u1-read-sketch", 1, ["7.7"], 1, "gen", function () {
  var pool = [];
  for (var d = 20; d <= 340; d += 5) if (d % 90 !== 0) pool.push(d);
  var deg = pick(pool);
  var corr = deg + "°";
  var cands = [360 - deg, (deg + 180) % 360, (540 - deg) % 360, (deg + 90) % 360, (deg + 270) % 360, (180 - deg + 360) % 360].map(function (x) { return x + "°"; });
  var q = mcq("The diagram shows an angle in standard position. What is the measure of the angle?",
    corr, u1dist3(corr, cands),
    "The initial arm lies on the positive x-axis and the rotation is counterclockwise. The terminal arm is in Quadrant " + ["I", "II", "III", "IV"][u1quadOf(deg) - 1] + " with reference angle " + u1refOf(deg) + "°, which gives the measure <b>" + deg + "°</b>.",
    { deg: deg });
  q.figure = u1armSVG(deg);
  return q;
});

/* ---- 7.4: sine law, find a side or an angle ---- */
E("u1-sine-law", 1, ["7.4"], 1, "gen", function () {
  if (Math.random() < 0.5) {
    var A = ri(25, 80), B = ri(25, 155 - A), C = 180 - A - B;
    var a = ri(6, 38);
    var b = a * Math.sin(B * Math.PI / 180) / Math.sin(A * Math.PI / 180);
    var q1 = numq("In triangle ABC, angle A is " + A + "°, angle B is " + B + "°, and side a is " + a + " cm. Determine the length of side b, to the nearest tenth of a centimetre.",
      b, 0.06,
      "Side a is opposite angle A and side b is opposite angle B, so the sine law gives: \\[ \\begin{aligned} \\frac{b}{\\sin B} &= \\frac{a}{\\sin A} \\\\ b &= \\frac{a \\sin B}{\\sin A} \\\\ &= \\frac{" + a + " \\sin " + B + "^\\circ}{\\sin " + A + "^\\circ} \\\\ &\\approx " + fmt(b, 1) + " \\end{aligned} \\] The length of side b is <b>" + fmt(b, 1) + " cm</b>.",
      { mode: "side", A: A, B: B, a: a });
    q1.figure = triAngSVG(A, B, C, { L: ["A", "B", "C"], ang: [A + "°", B + "°", ""], side: ["" + a, "?", ""] });
    return q1;
  }
  var A2 = ri(25, 60), Bt = ri(A2 + 8, 85), b2 = ri(12, 30);
  var aRaw = b2 * Math.sin(A2 * Math.PI / 180) / Math.sin(Bt * Math.PI / 180);
  var a2 = Math.ceil(aRaw * 10) / 10; /* round UP so the printed side a keeps sin B below 1 */
  var Bans = Math.asin(Math.min(1, b2 * Math.sin(A2 * Math.PI / 180) / a2)) * 180 / Math.PI;
  var q2 = numq("In triangle ABC, angle A is " + A2 + "°, side a is " + fmt(a2, 1) + " cm, and side b is " + b2 + " cm. Angle B is acute. Determine the measure of angle B, to the nearest degree.",
    Bans, 0.6,
    "Side a is opposite angle A and side b is opposite angle B, so the sine law gives: \\[ \\begin{aligned} \\frac{\\sin B}{b} &= \\frac{\\sin A}{a} \\\\ \\sin B &= \\frac{b \\sin A}{a} \\\\ &= \\frac{" + b2 + " \\sin " + A2 + "^\\circ}{" + fmt(a2, 1) + "} \\\\ &\\approx " + fmt(Math.sin(Bans * Math.PI / 180)) + " \\\\ B &\\approx " + Math.round(Bans) + "^\\circ \\end{aligned} \\] The measure of angle B is <b>" + Math.round(Bans) + "°</b>.",
    { mode: "angle", A: A2, a: a2, b: b2 });
  q2.figure = triAngSVG(A2, Bt, 180 - A2 - Bt, { L: ["A", "B", "C"], ang: [A2 + "°", "?", ""], side: ["" + fmt(a2, 1), "" + b2, ""] });
  return q2;
});

/* ---- 7.6: cosine law, find a side or an angle ---- */
E("u1-cosine-law", 1, ["7.6"], 1, "gen", function () {
  if (Math.random() < 0.5) {
    var A = ri(35, 140), b = ri(7, 30), c = ri(7, 30);
    var a = Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(A * Math.PI / 180));
    var B = Math.acos((a * a + c * c - b * b) / (2 * a * c)) * 180 / Math.PI;
    var C = 180 - A - B;
    var q1 = numq("In triangle ABC, side b is " + b + " cm, side c is " + c + " cm, and the included angle A is " + A + "°. Determine the length of side a, to the nearest tenth of a centimetre.",
      a, 0.06,
      "Side a is opposite the included angle A, so the cosine law gives: \\[ \\begin{aligned} a^2 &= b^2 + c^2 - 2bc \\cos A \\\\ &= " + b + "^2 + " + c + "^2 - 2(" + b + ")(" + c + ") \\cos " + A + "^\\circ \\\\ &\\approx " + fmt(a * a, 1) + " \\\\ a &\\approx " + fmt(a, 1) + " \\end{aligned} \\] The length of side a is <b>" + fmt(a, 1) + " cm</b>.",
      { mode: "side", A: A, b: b, c: c });
    q1.figure = triAngSVG(A, B, C, { L: ["A", "B", "C"], ang: [A + "°", "", ""], side: ["?", "" + b, "" + c] });
    return q1;
  }
  var a2 = ri(9, 30), b2 = ri(9, 30), c2 = ri(9, 30), tries = 0;
  while ((a2 + b2 <= c2 + 2 || b2 + c2 <= a2 + 2 || c2 + a2 <= b2 + 2) && tries < 60) { a2 = ri(9, 30); b2 = ri(9, 30); c2 = ri(9, 30); tries++; }
  var cosA = (b2 * b2 + c2 * c2 - a2 * a2) / (2 * b2 * c2);
  var Aans = Math.acos(Math.max(-1, Math.min(1, cosA))) * 180 / Math.PI;
  var q2 = numq("In triangle ABC, side a is " + a2 + " cm, side b is " + b2 + " cm, and side c is " + c2 + " cm. Determine the measure of angle A, to the nearest degree.",
    Aans, 0.6,
    "The cosine law, rearranged for angle A, gives: \\[ \\begin{aligned} \\cos A &= \\frac{b^2 + c^2 - a^2}{2bc} \\\\ &= \\frac{" + b2 + "^2 + " + c2 + "^2 - " + a2 + "^2}{2(" + b2 + ")(" + c2 + ")} \\\\ &\\approx " + fmt(cosA) + " \\\\ A &\\approx " + Math.round(Aans) + "^\\circ \\end{aligned} \\] The measure of angle A is <b>" + Math.round(Aans) + "°</b>.",
    { mode: "angle", a: a2, b: b2, c: c2 });
  q2.figure = triSVG(a2, b2, c2, { L: ["A", "B", "C"], side: ["" + a2, "" + b2, "" + c2] });
  return q2;
});

/* ---- 7.2, 7.22: contextual distance problems (cosine law and sine law settings) ---- */
E("u1-context-distance", 1, ["7.2", "7.22"], 2, "gen", function () {
  if (Math.random() < 0.5) {
    var ctxs = [
      { name: "roads", dmin: 12, dmax: 58, text: function (ang, d1, d2) { return "Two straight roads leave town P, one running to town Q and one to town R. The angle between the two roads is " + ang + "°. Town Q is " + d1 + " km from P and town R is " + d2 + " km from P. How far apart are towns Q and R, to the nearest tenth of a kilometre?"; } },
      { name: "boats", dmin: 6, dmax: 40, text: function (ang, d1, d2) { return "Two boats leave a marina at the same time and travel in straight lines. The angle between their paths is " + ang + "°. After some time, one boat has travelled " + d1 + " km and the other has travelled " + d2 + " km. How far apart are the two boats, to the nearest tenth of a kilometre?"; } },
      { name: "hikers", dmin: 3, dmax: 15, text: function (ang, d1, d2) { return "Two hikers leave a trailhead and walk in straight lines. The angle between their routes is " + ang + "°. One hiker walks " + d1 + " km and the other walks " + d2 + " km. How far apart are the two hikers, to the nearest tenth of a kilometre?"; } }
    ];
    var ctx = pick(ctxs);
    var ang = ri(40, 145), d1 = ri(ctx.dmin, ctx.dmax), d2 = ri(ctx.dmin, ctx.dmax);
    var dist = Math.sqrt(d1 * d1 + d2 * d2 - 2 * d1 * d2 * Math.cos(ang * Math.PI / 180));
    return numq(ctx.text(ang, d1, d2),
      dist, 0.06,
      "The two distances from the starting point and the distance between the endpoints form a triangle, with the given angle included between the known sides. The cosine law gives: \\[ \\begin{aligned} d^2 &= " + d1 + "^2 + " + d2 + "^2 - 2(" + d1 + ")(" + d2 + ") \\cos " + ang + "^\\circ \\\\ &\\approx " + fmt(dist * dist, 1) + " \\\\ d &\\approx " + fmt(dist, 1) + " \\end{aligned} \\] The distance is <b>" + fmt(dist, 1) + " km</b>.",
      { ctx: ctx.name, ang: ang, d1: d1, d2: d2, law: "cosine" });
  }
  var ctxs2 = [
    { name: "lighthouse", bmin: 60, bmax: 300, text: function (base, A, B) { return "A lighthouse stands offshore. From point A on a straight shoreline, the angle between the shoreline and the line of sight to the lighthouse is " + A + "°. Point B is " + base + " m from A along the shoreline, and from B the angle between the shoreline and the line of sight to the lighthouse is " + B + "°. Determine the distance from A to the lighthouse, to the nearest metre."; } },
    { name: "tower", bmin: 40, bmax: 180, text: function (base, A, B) { return "A water tower stands on the far side of a river. From point A on the near bank, the angle between the bank and the line of sight to the tower is " + A + "°. Point B is " + base + " m from A along the bank, and from B the angle between the bank and the line of sight to the tower is " + B + "°. Determine the distance from A to the tower, to the nearest metre."; } }
  ];
  var ctx2 = pick(ctxs2);
  var base = ri(ctx2.bmin, ctx2.bmax), A = ri(38, 78), B = ri(38, 155 - A), L = 180 - A - B;
  var dist2 = base * Math.sin(B * Math.PI / 180) / Math.sin(L * Math.PI / 180);
  return numq(ctx2.text(base, A, B),
    dist2, 0.6,
    "The two sight lines and the shoreline form a triangle. The angle at the lighthouse is \\(180^\\circ - " + A + "^\\circ - " + B + "^\\circ = " + L + "^\\circ\\). The distance from A is opposite the " + B + "° angle, so the sine law gives: \\[ \\begin{aligned} \\frac{d}{\\sin " + B + "^\\circ} &= \\frac{" + base + "}{\\sin " + L + "^\\circ} \\\\ d &= \\frac{" + base + " \\sin " + B + "^\\circ}{\\sin " + L + "^\\circ} \\\\ &\\approx " + Math.round(dist2) + " \\end{aligned} \\] The distance is <b>" + Math.round(dist2) + " m</b>.",
    { ctx: ctx2.name, base: base, A: A, B: B, law: "sine" });
});

/* ---- 7.10, 7.11: angles sharing a reference angle; reflections ---- */
E("u1-same-reference", 1, ["7.10", "7.11"], 1, "gen", function () {
  if (Math.random() < 0.5) {
    var r = pick([15, 20, 25, 30, 35, 40, 50, 55, 60, 65, 70, 75, 80]);
    function setStr(arr) { return arr.join("°, ") + "°"; }
    var corrArr = [r, 180 - r, 180 + r, 360 - r];
    var corr = setStr(corrArr);
    var cands = [
      setStr([r, 90 + r, 180 + r, 360 - r]),
      setStr([r, 180 - r, 270 + r, 360 - r]),
      setStr([r, 180 - r, 180 + r, 270 - r]),
      setStr([90 - r, 180 - r, 180 + r, 360 - r])
    ];
    return mcq("Which list gives all the angles between 0° and 360° that have a reference angle of " + r + "°?",
      corr, u1dist3(corr, cands),
      "An angle with reference angle " + r + "° can terminate in any quadrant. In Quadrant I the angle is " + r + "°; reflecting the terminal arm into Quadrant II gives \\(180^\\circ - " + r + "^\\circ = " + (180 - r) + "^\\circ\\); into Quadrant III gives \\(180^\\circ + " + r + "^\\circ = " + (180 + r) + "^\\circ\\); into Quadrant IV gives \\(360^\\circ - " + r + "^\\circ = " + (360 - r) + "^\\circ\\). The list is <b>" + corr + "</b>.",
      { mode: "sets", r: r });
  }
  var q = pick([2, 3, 4]);
  var deg = q === 2 ? ri(100, 170) : q === 3 ? ri(190, 260) : ri(280, 350);
  var ref = u1refOf(deg);
  var opts = ["the x-axis only", "the y-axis only", "both axes", "the line y = x"];
  var corr = q === 2 ? opts[1] : q === 3 ? opts[2] : opts[0];
  var dis = opts.filter(function (o) { return o !== corr; });
  var how = q === 2 ? "Quadrant II is reached by reflecting the reference arm in the y-axis." : q === 3 ? "Quadrant III is reached by reflecting the reference arm in both axes." : "Quadrant IV is reached by reflecting the reference arm in the x-axis.";
  return mcq("An angle of " + deg + "° has a reference angle of " + ref + "°. The terminal arm of the " + deg + "° angle is the reflection of the terminal arm of its reference angle in",
    corr, dis,
    "The angle " + deg + "° terminates in Quadrant " + ["I", "II", "III", "IV"][q - 1] + ". " + how + " The reflection is in <b>" + corr + "</b>.",
    { mode: "reflect", deg: deg });
});

/* ---- 7.14: distance from the origin to a point on the terminal arm ---- */
E("u1-point-distance", 1, ["7.14"], 1, "gen", function () {
  var bases = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41]];
  var bs = pick(bases), s = ri(1, 3);
  var lx = bs[0] * s, ly = bs[1] * s, r = bs[2] * s;
  if (Math.random() < 0.5) { var t = lx; lx = ly; ly = t; }
  var x = lx * pick([1, -1]), y = ly * pick([1, -1]);
  return numq("The point P(" + x + ", " + y + ") lies on the terminal arm of an angle in standard position. Determine the distance from the origin to point P.",
    r, 0.1,
    "The distance from the origin to P is the hypotenuse of a right triangle with legs \\(|" + x + "|\\) and \\(|" + y + "|\\). The Pythagorean theorem gives: \\[ \\begin{aligned} r^2 &= (" + x + ")^2 + (" + y + ")^2 \\\\ &= " + (x * x) + " + " + (y * y) + " \\\\ &= " + (r * r) + " \\\\ r &= " + r + " \\end{aligned} \\] The distance is <b>" + r + "</b>.",
    { x: x, y: y });
});

/* ---- 7.15: a trigonometric ratio from a point on the terminal arm ---- */
E("u1-point-ratios", 1, ["7.15"], 2, "gen", function () {
  var bases = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]];
  var bs = pick(bases);
  var lx = bs[0], ly = bs[1], r = bs[2];
  if (Math.random() < 0.5) { var t = lx; lx = ly; ly = t; }
  var x = lx * pick([1, -1]), y = ly * pick([1, -1]);
  var kind = pick(["sin", "cos", "tan"]);
  var kd = "\\" + kind;
  var num = kind === "sin" ? y : kind === "cos" ? x : y;
  var den = kind === "sin" ? r : kind === "cos" ? r : x;
  var corr = "\\(" + u1fr(num, den) + "\\)";
  var candBodies = [u1fr(x, r), u1fr(y, r), u1fr(y, x), u1fr(x, y), u1fr(-y, r), u1fr(-x, r), u1fr(-y, x), u1fr(r, y), u1fr(r, x)];
  var dis = u1dist3(u1fr(num, den), candBodies).map(function (s) { return "\\(" + s + "\\)"; });
  var defn = kind === "sin" ? "\\sin\\theta = \\frac{y}{r}" : kind === "cos" ? "\\cos\\theta = \\frac{x}{r}" : "\\tan\\theta = \\frac{y}{x}";
  return mcq("The point P(" + x + ", " + y + ") lies on the terminal arm of an angle \\(\\theta\\) in standard position. What is the exact value of \\(" + kd + " \\theta\\)?",
    corr, dis,
    "First find the distance from the origin: \\(r = \\sqrt{(" + x + ")^2 + (" + y + ")^2} = " + r + "\\). Using \\(" + defn + "\\): \\[ \\begin{aligned} \\" + kd + " \\theta &= " + corr.slice(2, -2) + " \\end{aligned} \\] The exact value is <b>" + corr + "</b>.",
    { x: x, y: y, kind: kind });
});

/* ---- 7.12, 7.17: read an angle from its sketched terminal-arm point ---- */
E("u1-point-angle", 1, ["7.12", "7.17"], 2, "gen", function () {
  var x = ri(2, 9) * pick([1, -1]), y = ri(2, 9) * pick([1, -1]);
  var theta = Math.atan2(y, x) * 180 / Math.PI;
  if (theta < 0) theta += 360;
  var refA = Math.atan(Math.abs(y / x)) * 180 / Math.PI;
  var q = u1quadOf(Math.round(theta));
  var adjust = q === 1 ? "the angle is the reference angle itself" : q === 2 ? "\\(\\theta = 180^\\circ - " + fmt(refA, 1) + "^\\circ\\)" : q === 3 ? "\\(\\theta = 180^\\circ + " + fmt(refA, 1) + "^\\circ\\)" : "\\(\\theta = 360^\\circ - " + fmt(refA, 1) + "^\\circ\\)";
  var qq = numq("The diagram shows the point P(" + x + ", " + y + ") on the terminal arm of an angle \\(\\theta\\) in standard position. Determine the measure of \\(\\theta\\), to the nearest degree.",
    theta, 0.6,
    "The reference angle satisfies \\(\\tan\\theta' = \\left|\\frac{" + y + "}{" + x + "}\\right|\\), so \\(\\theta' \\approx " + fmt(refA, 1) + "^\\circ\\). The point is in Quadrant " + ["I", "II", "III", "IV"][q - 1] + ", so " + adjust + ". To the nearest degree, \\(\\theta\\) is <b>" + Math.round(theta) + "°</b>.",
    { x: x, y: y });
  qq.figure = u1ptSVG(x, y);
  return qq;
});

/* ---- 7.18: ratio values at axis angles, from a point on the terminal arm ---- */
E("u1-axis-ratios", 1, ["7.18"], 1, "gen", function () {
  var dirs = [
    { deg: 0, dx: 1, dy: 0 }, { deg: 90, dx: 0, dy: 1 }, { deg: 180, dx: -1, dy: 0 },
    { deg: 270, dx: 0, dy: -1 }, { deg: 360, dx: 1, dy: 0 }
  ];
  var d = pick(dirs), m = ri(2, 9);
  var x = d.dx * m, y = d.dy * m;
  var kind = pick(["sin", "cos", "tan"]);
  var kd = "\\" + kind;
  var corr, why;
  if (kind === "sin") { corr = "" + d.dy; why = "\\sin\\theta = \\frac{y}{r} = \\frac{" + y + "}{" + m + "}"; }
  else if (kind === "cos") { corr = "" + d.dx; why = "\\cos\\theta = \\frac{x}{r} = \\frac{" + x + "}{" + m + "}"; }
  else if (d.dx === 0) { corr = "undefined"; why = "\\tan\\theta = \\frac{y}{x} = \\frac{" + y + "}{0}"; }
  else { corr = "0"; why = "\\tan\\theta = \\frac{y}{x} = \\frac{" + y + "}{" + x + "}"; }
  var all = ["-1", "0", "1", "undefined"];
  var dis = all.filter(function (s) { return s !== corr; });
  var sol = "The point is on the terminal arm of the " + d.deg + "° angle, and \\(r = " + m + "\\). Using the definition, \\(" + why + "\\)." + (corr === "undefined" ? " Division by zero is undefined." : "") + " The exact value of \\(" + kd + " " + d.deg + "^\\circ\\) is <b>" + corr + "</b>.";
  return mcq("The point P(" + x + ", " + y + ") lies on the terminal arm of an angle \\(\\theta\\) in standard position. Without using technology, determine the exact value of \\(" + kd + "\\theta\\).",
    corr, dis, sol,
    { deg: d.deg, kind: kind, m: m });
});

/* ---- 7.19: solve sin/cos/tan equations on 0 to 360 degrees ---- */
E("u1-solve-equation", 1, ["7.19"], 2, "gen", function () {
  function pairFmt(p) { return "\\(\\theta = " + p[0] + "^\\circ\\) or \\(\\theta = " + p[1] + "^\\circ\\)"; }
  function pairFor(ratio, ref, sign) {
    if (ratio === "sin") { if (ref === 0) return [0, 180]; return sign > 0 ? [ref, 180 - ref] : [180 + ref, 360 - ref]; }
    if (ratio === "cos") { if (ref === 0) return [90, 270]; return sign > 0 ? [ref, 360 - ref] : [180 - ref, 180 + ref]; }
    if (ref === 0) return [0, 180];
    return sign > 0 ? [ref, 180 + ref] : [180 - ref, 360 - ref];
  }
  function validPair(p) { return p[0] !== p[1] && p[0] >= 0 && p[0] < 360 && p[1] >= 0 && p[1] < 360; }
  function samePair(p, q) { return (p[0] === q[0] && p[1] === q[1]) || (p[0] === q[1] && p[1] === q[0]); }
  function distPairs(corrP, candPs) {
    var out = [];
    for (var i = 0; i < candPs.length; i++) {
      var p = candPs[i];
      if (!validPair(p) || samePair(p, corrP)) continue;
      var s = pairFmt(p);
      if (out.indexOf(s) < 0) out.push(s);
      if (out.length === 3) break;
    }
    return out;
  }
  if (Math.random() < 0.55) {
    var table = [
      { ratio: "sin", a: "\\frac{1}{2}", ref: 30, sign: 1 }, { ratio: "sin", a: "\\frac{\\sqrt{2}}{2}", ref: 45, sign: 1 },
      { ratio: "sin", a: "\\frac{\\sqrt{3}}{2}", ref: 60, sign: 1 }, { ratio: "sin", a: "-\\frac{1}{2}", ref: 30, sign: -1 },
      { ratio: "sin", a: "-\\frac{\\sqrt{2}}{2}", ref: 45, sign: -1 }, { ratio: "sin", a: "-\\frac{\\sqrt{3}}{2}", ref: 60, sign: -1 },
      { ratio: "sin", a: "0", ref: 0, sign: 1 },
      { ratio: "cos", a: "\\frac{1}{2}", ref: 60, sign: 1 }, { ratio: "cos", a: "\\frac{\\sqrt{2}}{2}", ref: 45, sign: 1 },
      { ratio: "cos", a: "\\frac{\\sqrt{3}}{2}", ref: 30, sign: 1 }, { ratio: "cos", a: "-\\frac{1}{2}", ref: 60, sign: -1 },
      { ratio: "cos", a: "-\\frac{\\sqrt{2}}{2}", ref: 45, sign: -1 }, { ratio: "cos", a: "-\\frac{\\sqrt{3}}{2}", ref: 30, sign: -1 },
      { ratio: "cos", a: "0", ref: 0, sign: 1 },
      { ratio: "tan", a: "1", ref: 45, sign: 1 }, { ratio: "tan", a: "\\sqrt{3}", ref: 60, sign: 1 },
      { ratio: "tan", a: "\\frac{\\sqrt{3}}{3}", ref: 30, sign: 1 }, { ratio: "tan", a: "-1", ref: 45, sign: -1 },
      { ratio: "tan", a: "-\\sqrt{3}", ref: 60, sign: -1 }, { ratio: "tan", a: "-\\frac{\\sqrt{3}}{3}", ref: 30, sign: -1 },
      { ratio: "tan", a: "0", ref: 0, sign: 1 }
    ];
    var e = pick(table);
    var rd = "\\" + e.ratio;
    var corrP = pairFor(e.ratio, e.ref, e.sign);
    var others = e.ratio === "sin" ? ["cos", "tan"] : e.ratio === "cos" ? ["sin", "tan"] : ["sin", "cos"];
    var candPs = [
      pairFor(e.ratio, e.ref, -e.sign),
      pairFor(e.ratio, 90 - e.ref, e.sign),
      pairFor(others[0], e.ref, e.sign),
      pairFor(others[1], e.ref, e.sign),
      pairFor(e.ratio, e.ref === 30 ? 60 : 30, e.sign),
      pairFor(e.ratio, e.ref === 45 ? 30 : 45, e.sign)
    ];
    var corr = pairFmt(corrP);
    return mcq("Solve \\(" + rd + " \\theta = " + e.a + "\\) for \\(0^\\circ \\le \\theta < 360^\\circ\\).",
      corr, distPairs(corrP, candPs),
      "The reference angle is " + e.ref + "°, since \\(" + rd + " " + e.ref + "^\\circ = " + (e.a === "0" ? "0" : e.a.replace("-", "")) + "\\). The ratio \\(" + rd + "\\) is " + (e.sign > 0 ? "positive" : "negative") + " in the quadrants that give the solutions \\(\\theta = " + corrP[0] + "^\\circ\\) and \\(\\theta = " + corrP[1] + "^\\circ\\). The solutions are <b>" + corr + "</b>.",
      { mode: "exact", ratio: e.ratio, ref: e.ref, sign: e.sign });
  }
  var ratio = pick(["sin", "cos"]);
  var rd2 = "\\" + ratio;
  var av = ri(15, 95) / 100, sign = pick([1, -1]);
  var ref = Math.round((ratio === "sin" ? Math.asin(av) : Math.acos(av)) * 180 / Math.PI);
  var corrP2 = pairFor(ratio, ref, sign);
  var candPs2 = [
    pairFor(ratio, ref, -sign),
    pairFor(ratio, 90 - ref, sign),
    pairFor(ratio === "sin" ? "cos" : "sin", ref, sign),
    pairFor(ratio, Math.max(5, ref - 15), sign),
    pairFor(ratio, Math.min(85, ref + 15), sign)
  ];
  var corr2 = pairFmt(corrP2);
  var aStr = (sign < 0 ? "-" : "") + fmt(av);
  return mcq("Solve \\(" + rd2 + " \\theta = " + aStr + "\\) for \\(0^\\circ \\le \\theta < 360^\\circ\\), to the nearest degree.",
    corr2, distPairs(corrP2, candPs2),
    "The reference angle is \\(" + rd2 + "^{-1}(" + fmt(av) + ") \\approx " + ref + "^\\circ\\). The ratio \\(" + rd2 + "\\) is " + (sign > 0 ? "positive" : "negative") + " in the quadrants that give the solutions \\(\\theta = " + corrP2[0] + "^\\circ\\) and \\(\\theta = " + corrP2[1] + "^\\circ\\). The solutions are <b>" + corr2 + "</b>.",
    { mode: "dec", ratio: ratio, a: aStr });
});

/* ---- 7.20: exact values at angles with reference angle 30, 45 or 60 ---- */
E("u1-exact-values", 1, ["7.20"], 2, "gen", function () {
  var degs = [120, 135, 150, 210, 225, 240, 300, 315, 330, 30, 45, 60];
  var deg = pick(degs), kind = pick(["sin", "cos", "tan"]);
  var kd = "\\" + kind;
  var pres = pick([deg, deg, deg + 360, deg - 360]);
  var ex = u1exact(kind, deg);
  var ref = u1refOf(deg);
  var corr = "\\(" + ex.s + "\\)";
  var others = ["sin", "cos", "tan"].filter(function (k) { return k !== kind; });
  var candBodies = [];
  var e1 = u1exact(kind, ref); if (e1) candBodies.push(e1.s);
  var e2 = u1exact(others[0], deg); if (e2) candBodies.push(e2.s);
  var e3 = u1exact(others[1], deg); if (e3) candBodies.push(e3.s);
  var e4 = u1exact(kind, (deg + 180) % 360); if (e4) candBodies.push(e4.s);
  var e5 = u1exact(kind, (360 - deg) % 360); if (e5) candBodies.push(e5.s);
  candBodies.push(ex.s.charAt(0) === "-" ? ex.s.slice(1) : "-" + ex.s);
  candBodies = candBodies.concat(["\\frac{1}{2}", "-\\frac{1}{2}", "\\frac{\\sqrt{2}}{2}", "-\\frac{\\sqrt{2}}{2}", "\\frac{\\sqrt{3}}{2}", "-\\frac{\\sqrt{3}}{2}", "\\frac{\\sqrt{3}}{3}", "-\\frac{\\sqrt{3}}{3}", "\\sqrt{3}", "-\\sqrt{3}", "1", "-1", "0"]);
  var dis = u1dist3(ex.s, candBodies).map(function (s) { return "\\(" + s + "\\)"; });
  var q = u1quadOf(deg);
  var cotNote = pres === deg ? "" : "The angle " + pres + "° is coterminal with " + deg + "°, so it has the same ratio values. ";
  return mcq("Determine the exact value of \\(" + kd + " " + pres + "^\\circ\\).",
    corr, dis,
    cotNote + "The reference angle for " + deg + "° is " + ref + "°, and the angle terminates in Quadrant " + ["I", "II", "III", "IV"][q - 1] + ", where \\(" + kd + "\\) is " + (ex.v < 0 ? "negative" : "positive") + ". Since \\(" + kd + " " + ref + "^\\circ = " + (u1exact(kind, ref) || {}).s + "\\), the value is \\[ \\begin{aligned} " + kd + " " + deg + "^\\circ &= " + ex.s + " \\end{aligned} \\] The exact value is <b>" + corr + "</b>.",
    { deg: deg, pres: pres, kind: kind });
});

/* ---- 7.16: which sign statement is true for a given angle ---- */
E("u1-sign-statements", 1, ["7.16"], 1, "gen", function () {
  var q = pick([1, 2, 3, 4]);
  var deg = q === 1 ? ri(8, 82) : q === 2 ? ri(98, 172) : q === 3 ? ri(188, 262) : ri(278, 352);
  var stmts = [
    "\\(\\sin\\theta\\) and \\(\\cos\\theta\\) are both positive",
    "\\(\\sin\\theta\\) is positive and \\(\\cos\\theta\\) is negative",
    "\\(\\sin\\theta\\) and \\(\\cos\\theta\\) are both negative",
    "\\(\\sin\\theta\\) is negative and \\(\\cos\\theta\\) is positive"
  ];
  var corr = stmts[q - 1];
  var dis = stmts.filter(function (s) { return s !== corr; });
  var signs = q === 1 ? "both x and y are positive on the terminal arm, so sine and cosine are both positive"
    : q === 2 ? "x is negative and y is positive on the terminal arm, so sine is positive and cosine is negative"
    : q === 3 ? "both x and y are negative on the terminal arm, so sine and cosine are both negative"
    : "x is positive and y is negative on the terminal arm, so sine is negative and cosine is positive";
  return mcq("For \\(\\theta = " + deg + "^\\circ\\), which statement is true?",
    corr, dis,
    "The angle " + deg + "° terminates in Quadrant " + ["I", "II", "III", "IV"][q - 1] + ", where " + signs + ". The true statement is <b>" + corr + "</b>.",
    { deg: deg });
});

/* ---- 7.5: the ambiguous case, how many triangles ---- */
E("u1-ambiguous-case", 1, ["7.5"], 3, "gen", function () {
  var opts = ["No triangle can be drawn", "One triangle can be drawn", "Two triangles can be drawn", "It cannot be determined"];
  var mode = pick(["two", "zero", "oneRight", "oneLong", "obtOne", "obtZero"]);
  var A, b, a, key, expl;
  if (mode === "two" || mode === "zero") {
    A = pick([35, 42, 48, 55, 62]); b = pick([12, 14, 15, 16, 18, 20]);
    var h = b * Math.sin(A * Math.PI / 180);
    a = mode === "two" ? Math.round((h + b) / 2 * 10) / 10 : Math.round(h * 0.75 * 10) / 10;
    key = mode === "two" ? opts[2] : opts[0];
    expl = "The altitude from the third vertex would be \\(h = b \\sin A = " + b + " \\sin " + A + "^\\circ \\approx " + fmt(h, 1) + "\\). Since side a is " + fmt(a, 1) + ", which is " + (mode === "two" ? "greater than h but less than b = " + b : "less than h") + ", " + (mode === "two" ? "the side of length a can swing to meet the base in two positions" : "the side of length a is too short to reach the base at all") + ".";
  } else if (mode === "oneRight") {
    A = 30; b = pick([10, 14, 18, 22]); a = b / 2;
    key = opts[1];
    expl = "The altitude from the third vertex would be \\(h = b \\sin A = " + b + " \\sin 30^\\circ = " + a + "\\). Side a equals h exactly, so the side of length a just reaches the base, forming a single right triangle.";
  } else if (mode === "oneLong") {
    A = pick([40, 50, 60]); b = pick([11, 13, 17]); a = b + ri(2, 7);
    key = opts[1];
    expl = "Side a (" + a + ") is longer than side b (" + b + "). The side of length a can meet the base in only one position on the correct side of the given angle, so only one triangle fits.";
  } else {
    A = pick([100, 110, 120, 130]); b = pick([10, 12, 14, 16, 18]);
    if (mode === "obtOne") { a = b + ri(2, 8); key = opts[1]; expl = "Angle A is obtuse, so side a must be the longest side of the triangle. Since a = " + a + " is greater than b = " + b + ", exactly one triangle fits."; }
    else { a = b - ri(1, 4); key = opts[0]; expl = "Angle A is obtuse, so side a must be the longest side of the triangle. Since a = " + a + " is not greater than b = " + b + ", no triangle fits."; }
  }
  var dis = opts.filter(function (o) { return o !== key; });
  return mcq("In triangle ABC, angle A is " + A + "°, side b is " + b + " cm, and side a is " + fmt(a, 1) + " cm. How many different triangles satisfy these measurements?",
    key, dis,
    expl + " So <b>" + key.charAt(0).toLowerCase() + key.slice(1) + "</b>.",
    { mode: mode, A: A, b: b, a: a });
});

/* ---- 7.3: steps in the proofs of the sine law and cosine law ---- */
E("u1-law-proof-steps", 1, ["7.3"], 3, "var", varset([
  function () {
    return mcq("A proof of the sine law starts by drawing the altitude from vertex C of triangle ABC to side AB. The altitude has length h, with \\(h = b\\sin A\\) from one right triangle and \\(h = a\\sin B\\) from the other. Which step completes the proof of the sine law?",
      "Set the two expressions for h equal, then divide both sides by \\(\\sin A \\sin B\\)",
      ["Add the two expressions for h to get \\(2h = b\\sin A + a\\sin B\\)",
       "Apply the Pythagorean theorem in both right triangles and add the results",
       "Replace h with c in both expressions and simplify the result"],
      "Setting the two expressions for the same altitude equal gives \\(b\\sin A = a\\sin B\\). Dividing both sides by \\(\\sin A \\sin B\\) gives \\(\\frac{b}{\\sin B} = \\frac{a}{\\sin A}\\), which is the sine law. The completing step is: <b>set the two expressions for h equal, then divide both sides by \\(\\sin A \\sin B\\)</b>.",
      { v: 1 });
  },
  function () {
    return mcq("In a proof of the cosine law, the altitude from C divides side AB into segments of length x and \\(c - x\\). The two right triangles give \\(b^2 = h^2 + x^2\\) and \\(a^2 = h^2 + (c - x)^2\\). Which step produces the cosine law from these equations?",
      "Expand \\((c - x)^2\\), replace \\(h^2 + x^2\\) with \\(b^2\\), and use \\(x = b\\cos A\\)",
      ["Expand \\((c - x)^2\\), replace \\(h^2 + x^2\\) with \\(a^2\\), and use \\(x = b\\sin A\\)",
       "Set the two equations equal to eliminate h, then solve for x in terms of c",
       "Expand \\((c - x)^2\\) and replace h with \\(b\\sin A\\) throughout both equations"],
      "Expanding gives \\(a^2 = h^2 + c^2 - 2cx + x^2 = (h^2 + x^2) + c^2 - 2cx\\). The first equation says \\(h^2 + x^2 = b^2\\), and in the right triangle at A, \\(\\cos A = \\frac{x}{b}\\), so \\(x = b\\cos A\\). Substituting gives \\(a^2 = b^2 + c^2 - 2bc\\cos A\\). The step is: <b>expand \\((c - x)^2\\), replace \\(h^2 + x^2\\) with \\(b^2\\), and use \\(x = b\\cos A\\)</b>.",
      { v: 2 });
  },
  function () {
    return mcq("A second proof of the sine law writes the area of triangle ABC in two ways: \\(\\text{Area} = \\frac{1}{2}bc\\sin A\\) and \\(\\text{Area} = \\frac{1}{2}ac\\sin B\\). Which equality follows directly from setting these equal and dividing both sides by \\(\\frac{1}{2}c\\)?",
      "\\(b\\sin A = a\\sin B\\)",
      ["\\(b\\sin B = a\\sin A\\)", "\\(c\\sin A = a\\sin B\\)", "\\(b\\sin A = c\\sin B\\)"],
      "Setting the two area expressions equal gives \\(\\frac{1}{2}bc\\sin A = \\frac{1}{2}ac\\sin B\\). Dividing both sides by \\(\\frac{1}{2}c\\) removes the common factors and leaves <b>\\(b\\sin A = a\\sin B\\)</b>, which rearranges into the sine law.",
      { v: 3 });
  },
  function () {
    return mcq("A proof of the cosine law for side a ends with \\(a^2 = b^2 + c^2 - 2bc\\cos A\\). Which fact is responsible for the \\(\\cos A\\) in the final term?",
      "The side adjacent to angle A in the right triangle at A has length \\(x = b\\cos A\\)",
      ["The identity \\(\\sin^2 A + \\cos^2 A = 1\\) is used to replace \\(h^2\\) in the final step",
       "The sine law is applied to the altitude to rewrite h in terms of angle A",
       "Angle A is assumed to be acute, so each of its ratios is a positive number"],
      "When \\((c - x)^2\\) is expanded, the term \\(-2cx\\) appears. In the right triangle with hypotenuse b at vertex A, \\(\\cos A = \\frac{x}{b}\\), so \\(x = b\\cos A\\) and \\(-2cx = -2bc\\cos A\\). The fact is: <b>the side adjacent to angle A in the right triangle at A has length \\(x = b\\cos A\\)</b>.",
      { v: 4 });
  }
]));

/* ---- 7.13, 7.21: reflected terminal-arm points; patterns among ratio values ---- */
E("u1-reflection-points", 1, ["7.13", "7.21"], 3, "gen", function () {
  if (Math.random() < 0.5) {
    var x = ri(2, 9), y = ri(2, 9);
    var target = pick([2, 3, 4]);
    var pts = { 2: "(" + (-x) + ", " + y + ")", 3: "(" + (-x) + ", " + (-y) + ")", 4: "(" + x + ", " + (-y) + ")" };
    var corr = pts[target];
    var others = ["(" + (-x) + ", " + y + ")", "(" + (-x) + ", " + (-y) + ")", "(" + x + ", " + (-y) + ")", "(" + y + ", " + x + ")"];
    var dis = others.filter(function (s) { return s !== corr; });
    var how = target === 2 ? "Quadrant II has the opposite x-sign from Quadrant I, with y unchanged" : target === 3 ? "Quadrant III has both signs opposite to Quadrant I" : "Quadrant IV has the opposite y-sign from Quadrant I, with x unchanged";
    return mcq("The point P(" + x + ", " + y + ") lies on the terminal arm of an angle in standard position. Which point lies on the terminal arm of the angle in Quadrant " + ["I", "II", "III", "IV"][target - 1] + " that has the same reference angle?",
      corr, dis,
      "Angles with the same reference angle have terminal arms that are reflections of one another, so their points have the same coordinate magnitudes with signs set by the quadrant. " + how + ". The point is <b>" + corr + "</b>.",
      { mode: "points", x: x, y: y, target: target });
  }
  var pats = [
    { prompt: "Which statement about the sine ratio on the interval from 0° to 360° is true?",
      correct: "As \\(\\theta\\) increases from \\(0^\\circ\\) to \\(90^\\circ\\), \\(\\sin\\theta\\) increases from 0 to 1",
      dis: ["As \\(\\theta\\) increases from \\(0^\\circ\\) to \\(90^\\circ\\), \\(\\sin\\theta\\) decreases from 1 to 0",
            "As \\(\\theta\\) increases from \\(90^\\circ\\) to \\(180^\\circ\\), \\(\\sin\\theta\\) increases from 1 to 2",
            "As \\(\\theta\\) increases from \\(180^\\circ\\) to \\(270^\\circ\\), \\(\\sin\\theta\\) increases from 0 to 1"],
      sol: "In Quadrant I, the y-coordinate on the terminal arm grows from 0 to its maximum, so \\(\\sin\\theta\\) increases from 0 to 1. It then falls back through Quadrant II, and it is negative through Quadrants III and IV." },
    { prompt: "Which statement about ratio signs is true?",
      correct: "\\(\\sin\\theta\\) is negative for every angle in Quadrant III",
      dis: ["\\(\\sin\\theta\\) is positive for every angle in Quadrant III",
            "\\(\\tan\\theta\\) is negative for every angle in Quadrant III",
            "\\(\\cos\\theta\\) is positive for every angle in Quadrant III"],
      sol: "In Quadrant III both coordinates on the terminal arm are negative, so sine and cosine are negative while tangent, a ratio of the two, is positive." },
    { prompt: "Which statement about ratio values at axis angles is true?",
      correct: "\\(\\cos\\theta = 0\\) when \\(\\theta = 90^\\circ\\) or \\(\\theta = 270^\\circ\\)",
      dis: ["\\(\\sin\\theta = 0\\) when \\(\\theta = 90^\\circ\\) or \\(\\theta = 270^\\circ\\)",
            "\\(\\cos\\theta = 0\\) when \\(\\theta = 0^\\circ\\) or \\(\\theta = 180^\\circ\\)",
            "\\(\\tan\\theta = 0\\) when \\(\\theta = 90^\\circ\\) or \\(\\theta = 270^\\circ\\)"],
      sol: "At 90° and 270° the terminal arm is vertical, so the x-coordinate is 0 and \\(\\cos\\theta = \\frac{x}{r} = 0\\). At those angles sine is 1 or -1 and tangent is undefined." },
    { prompt: "Which statement about the tangent ratio is true?",
      correct: "The values of \\(\\tan\\theta\\) are positive in Quadrants I and III",
      dis: ["The values of \\(\\tan\\theta\\) are positive in Quadrants I and II",
            "The values of \\(\\tan\\theta\\) are negative in Quadrants I and III",
            "The values of \\(\\tan\\theta\\) are positive in Quadrants II and IV"],
      sol: "Tangent is \\(\\frac{y}{x}\\), which is positive exactly when x and y have the same sign. That happens in Quadrant I (both positive) and Quadrant III (both negative)." },
    { prompt: "Which statement about the cosine ratio on the interval from 0° to 360° is true?",
      correct: "As \\(\\theta\\) increases from \\(180^\\circ\\) to \\(270^\\circ\\), \\(\\cos\\theta\\) increases from \\(-1\\) to 0",
      dis: ["As \\(\\theta\\) increases from \\(180^\\circ\\) to \\(270^\\circ\\), \\(\\cos\\theta\\) decreases from \\(-1\\) to 0",
            "As \\(\\theta\\) increases from \\(180^\\circ\\) to \\(270^\\circ\\), \\(\\sin\\theta\\) increases from 0 to \\(-1\\)",
            "As \\(\\theta\\) increases from \\(180^\\circ\\) to \\(270^\\circ\\), \\(\\cos\\theta\\) decreases from 0 to \\(-1\\)"],
      sol: "At 180° the terminal arm points along the negative x-axis, so \\(\\cos\\theta = -1\\). Turning toward 270° brings the x-coordinate back up to 0, so cosine increases from -1 to 0." }
  ];
  var p = pick(pats);
  return mcq(p.prompt, p.correct, p.dis, p.sol + " The true statement is <b>" + p.correct + "</b>.", { mode: "pattern" });
});

/* ============ Prior knowledge tranche (Nov 15, 2026) ============ */
/* Borrowed verbatim from the feeder banks named in the source
   comments and the PKT table below, plus authored micro-items
   where the prior knowledge map names a skill no feeder entry
   assesses. Spec: Math-2200-PK-Tranche-Spec-2026-11-15.md. */

/* u1-pk-label-sides: borrowed verbatim from math-1201 entry u7-label-sides (math-1201:7.1). */
E("u1-pk-label-sides",1,["7.1"],1,"gen",function(){
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

/* u1-pk-ratio-def: borrowed verbatim from math-1201 entry u7-ratio-def (math-1201:7.2). */
E("u1-pk-ratio-def",1,["7.2"],1,"gen",function(){
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

/* u1-pk-ratio-similar: borrowed verbatim from math-1201 entry u7-ratio-similar (math-1201:7.2). */
E("u1-pk-ratio-similar",1,["7.2"],1,"var",varset([
  function(){var key="The triangles are similar, so matching sides stay in proportion, and the opposite side divided by the hypotenuse is the same in both";
    return mcq("Two right triangles each have an acute angle of \\(38^\\circ\\). One triangle is an enlargement of the other. Why is \\(\\sin 38^\\circ\\) the same for both triangles?",
    key,
    ["The triangles are congruent, so matching sides stay equal in length, and the opposite side divided by the hypotenuse is the same in both",
     "The sine ratio uses only the angle in its name, and the side lengths of a triangle play no part at all in the value of the ratio",
     "The larger triangle has longer sides all round, so its ratios grow in step, and the value works out the same by coincidence"],
    "Enlarging a triangle keeps its angles and multiplies every side by the same scale factor, so the triangles are similar. In the ratio for \\(\\sin 38^\\circ\\), the scale factor appears in both the opposite side and the hypotenuse and cancels. The ratio depends on the angle alone: <b>the triangles are similar, so the ratio is the same in both</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Both sides in the ratio are doubled, so the doubling cancels and the value of the tangent ratio stays exactly the same as at first";
    return mcq("Every side of a right triangle is doubled to make a larger triangle. What happens to the value of \\(\\tan A\\) for the matching acute angle \\(A\\)?",
    key,
    ["Only the side opposite the angle is doubled, so the doubling stays in the ratio and the value of the tangent ratio doubles as well",
     "Both sides in the ratio are halved when the triangle grows, so the value of the tangent ratio falls to exactly one half of its value",
     "The tangent ratio compares side lengths with the angle size, so a larger triangle gives a larger value for the tangent ratio overall"],
    "The tangent ratio is opposite divided by adjacent. Doubling the triangle doubles both of those sides, and the factor of \\(2\\) cancels in the fraction: \\[ \\begin{aligned} \\tan A &= \\frac{2 \\times \\text{opposite}}{2 \\times \\text{adjacent}} \\\\ &= \\frac{\\text{opposite}}{\\text{adjacent}} \\end{aligned} \\] The value of the tangent ratio <b>stays exactly the same</b>.",
    {stmt:true,keyText:key});},
  function(){var key="\\(\\cos A\\) is the adjacent side over the hypotenuse, \\(AC\\) over \\(AB\\), because \\(AC\\) forms angle \\(A\\) with the hypotenuse";
    var q=mcq("Triangle \\(ABC\\) has the right angle at \\(C\\). Which statement correctly gives \\(\\cos A\\) and the reason for the sides it uses?",
    key,
    ["\\(\\cos A\\) is the opposite side over the hypotenuse, \\(BC\\) over \\(AB\\), because \\(BC\\) forms angle \\(A\\) with the hypotenuse",
     "\\(\\cos A\\) is the adjacent side over the opposite side, \\(AC\\) over \\(BC\\), because \\(AC\\) forms angle \\(A\\) with the side \\(BC\\)",
     "\\(\\cos A\\) is the hypotenuse over the adjacent side, \\(AB\\) over \\(AC\\), because \\(AB\\) is the longest side of the whole triangle"],
    "By definition, \\(\\cos A = "+FR("\\text{adjacent}","\\text{hypotenuse}")+"\\). For angle \\(A\\), the adjacent side is \\(AC\\), the side that forms angle \\(A\\) with the hypotenuse \\(AB\\). So \\(\\cos A\\) is <b>\\("+FR("AC","AB")+"\\)</b>, the adjacent side over the hypotenuse.",
    {stmt:true,keyText:key});
    q.figure=triSVG(3,4,5,{L:["A","B","C"],ang:["A",null,null],side:["BC","AC","AB"]});
    return q;},
  function(){var key="The hypotenuse grew, but the opposite side grew by the same factor, so their ratio is unchanged and the sine value stays the same";
    return mcq("A student says the sine of an acute angle must be larger in a bigger right triangle because the hypotenuse is longer. Which statement corrects the student?",
    key,
    ["The hypotenuse grew, and the opposite side stayed the same length, so their ratio is smaller and the sine value actually goes down",
     "The hypotenuse is the only side used in the sine ratio, so a longer hypotenuse does give a larger value for the sine of the angle",
     "The sine of an angle is set by the size of the triangle, so the bigger triangle does have the larger sine value for its angles"],
    "Sine is a ratio, opposite divided by hypotenuse, not a length. In a bigger similar triangle both the opposite side and the hypotenuse are multiplied by the same scale factor, which cancels in the ratio. So <b>the sine value stays the same</b>; it depends on the angle, not on the size of the triangle.",
    {stmt:true,keyText:key});},
  function(){var key="Scaling by \\(3\\) multiplies the opposite side and the hypotenuse alike, so their ratio is still \\("+FR(4,5)+"\\), as in the small triangle";
    var q=mcq("In a small right triangle, an acute angle has opposite side \\(4\\) cm and hypotenuse \\(5\\) cm. The triangle is enlarged by a scale factor of \\(3\\). Which statement gives the sine of the matching angle in the large triangle?",
    key,
    ["Scaling by \\(3\\) multiplies the opposite side only, so their ratio becomes \\("+FR(12,5)+"\\), which is larger than the ratio in the small triangle",
     "Scaling by \\(3\\) multiplies the hypotenuse only, so their ratio becomes \\("+FR(4,15)+"\\), which is smaller than the ratio in the small triangle",
     "Scaling by \\(3\\) adds \\(3\\) cm to each side in turn, so their ratio becomes \\("+FR(7,8)+"\\), a value close to the ratio in the small one"],
    "In the large triangle the opposite side is \\(3 \\times 4 = 12\\) cm and the hypotenuse is \\(3 \\times 5 = 15\\) cm: \\[ \\begin{aligned} \\sin &= \\frac{12}{15} \\\\ &= \\frac{4}{5} \\end{aligned} \\] The scale factor cancels, so the sine is <b>\\("+FR(4,5)+"\\)</b>, the same as in the small triangle.",
    {stmt:true,keyText:key});
    q.figure=u7pairSVG();
    return q;}
]));

/* u1-pk-find-angle: borrowed verbatim from math-1201 entry u7-find-angle (math-1201:7.3). */
E("u1-pk-find-angle",1,["7.3"],1,"gen",function(){
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

/* u1-pk-find-side: borrowed verbatim from math-1201 entry u7-find-side (math-1201:7.4). */
E("u1-pk-find-side",1,["7.4"],1,"gen",function(){
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

/* u1-pk-pythagoras: borrowed verbatim from math-1201 entry u7-pythagoras (math-1201:7.5). */
E("u1-pk-pythagoras",1,["7.14"],1,"gen",function(){
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

/* u1-pk-grid-distance: borrowed verbatim from math-8 entry u1-grid-distance-gap (math-8:9.12). */
E("u1-pk-grid-distance",1,["7.14"], 2, "gen", function(){
  var base=pick([[3,4,5],[5,12,13],[8,15,17],[6,8,10],[9,12,15]]);
  var kk=ri(1,2); var dx=base[0]*kk, dy=base[1]*kk, c=base[2]*kk;
  var x1=ri(0,4), y1=ri(0,4), x2=x1+dx, y2=y1+dy;
  var q=numq("On a grid map, a library stands at ("+x1+", "+y1+") and a skating rink stands at ("+x2+", "+y2+"). Each grid square represents 1 km. What is the straight-line distance between the library and the rink, in kilometres?", c, 0.01,
    "The two points give the legs of a right triangle: the horizontal change is "+x2+" - "+x1+" = "+dx+" and the vertical change is "+y2+" - "+y1+" = "+dy+". Then: \\[ \\begin{aligned} d^{2} &= "+dx+"^{2} + "+dy+"^{2} \\\\ &= "+(dx*dx)+" + "+(dy*dy)+" \\\\ &= "+(c*c)+" \\\\ d &= "+c+" \\end{aligned} \\] The answer is <b>"+c+" km</b>.",
    {mode:"grid-distance", x1:x1, y1:y1, x2:x2, y2:y2}); q.figure=m8GridDistSVG(x1,y1,x2,y2); return q;
}, ["Subtract the coordinates to find the two legs before using the theorem.", "Find the horizontal change and the vertical change first, then square and add them."]);

/* u1-pk-solve-triangle: borrowed verbatim from math-1201 entry u7-solve-triangle (math-1201:7.6). */
E("u1-pk-solve-triangle",1,["7.2"],2,"gen",function(){
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

/* u1-pk-rope-angle: borrowed verbatim from math-1201 entry u7-rope-angle (math-1201:7.3). */
E("u1-pk-rope-angle",1,["7.22"],2,"var",varset([
  function(){return u7slantAngle("rope");},
  function(){return u7slantAngle("slide");},
  function(){return u7slantAngle("zip");},
  function(){return u7slantAngle("kite");}
]));

/* u1-pk-ramp-run: borrowed verbatim from math-1201 entry u7-ramp-run (math-1201:7.4). */
E("u1-pk-ramp-run",1,["7.22"],2,"var",varset([
  function(){return u7riseRun("dock");},
  function(){return u7riseRun("belt");},
  function(){return u7riseRun("escalator");}
]));

/* PK tranche pass for Unit 1. pkFor is the cluster's dependent
   indicator list from the prior knowledge map, as registered
   for this unit in courses.js. */
var PKT_U1_FOR=["7.1","7.2","7.3","7.4","7.5","7.6","7.7","7.8","7.9","7.10","7.11","7.12","7.13","7.14","7.15","7.16","7.17","7.18","7.19","7.20","7.21","7.22"];
var PKT_U1={
 "u1-pk-label-sides":{src:"math-1201:7.1",group:"trig-sides"},
 "u1-pk-ratio-def":{src:"math-1201:7.2",group:"trig-ratios"},
 "u1-pk-ratio-similar":{src:"math-1201:7.2",group:"trig-ratios"},
 "u1-pk-find-angle":{src:"math-1201:7.3",group:"trig-ratios"},
 "u1-pk-find-side":{src:"math-1201:7.4",group:"trig-ratios"},
 "u1-pk-pythagoras":{src:"math-1201:7.5",group:"pythagoras"},
 "u1-pk-grid-distance":{src:"math-8:9.12",group:"pythagoras"},
 "u1-pk-solve-triangle":{src:"math-1201:7.6",group:"solve-triangle"},
 "u1-pk-rope-angle":{src:"math-1201:7.3",group:"trig-context"},
 "u1-pk-ramp-run":{src:"math-1201:7.4",group:"trig-context"}
};
BANK.forEach(function(e){var t=PKT_U1[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U1_FOR.slice();e.pkGroup=t.group;}});

/* ----- bank-u2.js ----- */
// Math 2200 Unit 2 Quadratic Functions question bank
// Graphics pass Tranche 2 (November 12, 2026): figures attached
// attach-only from the builders ported into bank-helpers.js;
// u2-translations, u2-intercepts-count and u2-vertex-standard
// gained graphed read-off second arms under the Tranche 1b ruling
// (their original generators sit verbatim as arm 1).
// CRMARKS: u2-analyze-problem=3
// CRMARKS: u2-complete-square=2
// CRMARKS: u2-cts-reasoning=2
// CRMARKS: u2-error-complete-square=3
// CRMARKS: u2-intercepts-count=2
// CRMARKS: u2-model-situation=3
// CRMARKS: u2-model-situation-evaluate=3
// CRMARKS: u2-translations=1
// CRMARKS: u2-vertex-read=1
// CRMARKS: u2-vertex-rule=3
// CRMARKS: u2-vertex-standard=2
// CRMARKS: u2-write-from-characteristics=3
// BIMODAL: u2-write-from-characteristics=b
// BIMODAL: u2-vertex-standard=a
// BIMODAL: u2-vertex-rule=a
// BIMODAL: u2-model-situation=b
// BIMODAL: u2-error-complete-square=b
// BIMODAL: u2-complete-square=b
/* ================= Unit 2: Quadratic Functions ================= */
/* ================= Unit 2: Quadratic Functions (MA2200.4.27 to 4.32, 4.37 to 4.47) =================
   Tranche 1, mid scope. All stems, contexts and values are original.
   Helpers are prefixed u2; entries register through E(...). */

/* ---------- u2 helpers ---------- */
function u2VS(a,p,q){ /* vertex form a(x - p)^2 + q as a string */
  var s=(a===1?"":a===-1?"-":""+a);
  if(p===0) s+="x^2";
  else s+="(x"+(p>0?" - "+p:" + "+(-p))+")^2";
  if(q>0) s+=" + "+q; else if(q<0) s+=" - "+(-q);
  return s;
}
function u2Std(a,b,c){ /* ax^2 + bx + c as a string */
  var s=(a===1?"x^2":a===-1?"-x^2":a+"x^2");
  if(b!==0) s+=(b>0?" + ":" - ")+(Math.abs(b)===1?"x":Math.abs(b)+"x");
  if(c!==0) s+=(c>0?" + ":" - ")+Math.abs(c);
  return s;
}
function u2QuadB(B){ /* x^2 + Bx as a string, B nonzero */
  return "x^2"+(B>0?" + ":" - ")+(Math.abs(B)===1?"x":Math.abs(B)+"x");
}
function u2JoinSigned(nums){ var out=""; nums.forEach(function(v,i){ if(i===0) out=""+v; else out+=(v<0?" - "+(-v):" + "+v); }); return out; }
function u2Pair(x,y){ return "\\(("+x+", "+y+")\\)"; }
function u2Plot(fn,x0,x1,o){ /* axes-and-curve SVG, y-range fitted from samples and capped */
  o=o||{}; var W=440,H=250,pad=26,i,x,y,mn=1e18,mx=-1e18;
  for(i=0;i<=200;i++){ x=x0+(x1-x0)*i/200; y=fn(x); if(isFinite(y)){ if(y<mn)mn=y; if(y>mx)mx=y; } }
  var y1=(o.y1!==undefined)?o.y1:Math.min(90,Math.max(12,Math.ceil(mx*1.2)));
  var y0=(o.y0!==undefined)?o.y0:Math.max(-90,Math.min(-12,Math.floor(mn*1.2)));
  var X=function(v){ return pad+(v-x0)/(x1-x0)*(W-2*pad); };
  var Y=function(v){ return H-pad-(v-y0)/(y1-y0)*(H-2*pad); };
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="100%" style="max-width:440px;background:#fff;border:1px solid #d8d2c4;border-radius:6px" xmlns="http://www.w3.org/2000/svg">';
  var gy=(y1-y0>90)?20:((y1-y0>45)?10:((y1-y0>22)?5:2)), gx, gyv;
  for(gx=Math.ceil(x0);gx<=x1;gx+=1){ out+='<line x1="'+fmt(X(gx),1)+'" y1="'+pad+'" x2="'+fmt(X(gx),1)+'" y2="'+(H-pad)+'" stroke="#eae5d6" stroke-width="1"/>';
    out+='<text x="'+fmt(X(gx),1)+'" y="'+(H-6)+'" font-size="9" fill="#5a5344" text-anchor="middle">'+gx+'</text>'; }
  for(gyv=Math.ceil(y0/gy)*gy;gyv<=y1;gyv+=gy){ out+='<line x1="'+pad+'" y1="'+fmt(Y(gyv),1)+'" x2="'+(W-pad)+'" y2="'+fmt(Y(gyv),1)+'" stroke="#eae5d6" stroke-width="1"/>';
    if(gyv!==0) out+='<text x="'+(pad-4)+'" y="'+fmt(Y(gyv)+3,1)+'" font-size="9" fill="#5a5344" text-anchor="end">'+gyv+'</text>'; }
  if(y0<0&&y1>0) out+='<line x1="'+pad+'" y1="'+fmt(Y(0),1)+'" x2="'+(W-pad)+'" y2="'+fmt(Y(0),1)+'" stroke="#17352a" stroke-width="1.3"/>';
  if(x0<0&&x1>0) out+='<line x1="'+fmt(X(0),1)+'" y1="'+pad+'" x2="'+fmt(X(0),1)+'" y2="'+(H-pad)+'" stroke="#17352a" stroke-width="1.3"/>';
  out+='<text x="'+(W-pad-2)+'" y="'+fmt(Y(0)-6,1)+'" font-size="12" fill="#17352a" text-anchor="end">x</text>';
  out+='<text x="'+fmt(X(0)+6,1)+'" y="'+(pad-8)+'" font-size="12" fill="#17352a">y</text>';
  out+=clipCurveSVG(fn,X,Y,x0,x1,y0,y1);
  (o.points||[]).forEach(function(p){ out+='<circle cx="'+fmt(X(p[0]),1)+'" cy="'+fmt(Y(p[1]),1)+'" r="3.6" fill="#b3541e"/>'; });
  return out+'</svg>';
}
function u2EffectPanels(items){ /* parPanelsSVG panels for y = v x^2 items, at a common scale */
  function plain(d){ return d.replace(/\\frac\{(\d+)\}\{(\d+)\}/,"$1/$2"); }
  var maxAbs=1; items.forEach(function(it){ if(Math.abs(it.v)>maxAbs) maxAbs=Math.abs(it.v); });
  var yAbs=4*maxAbs, anyNeg=items.some(function(it){ return it.v<0; });
  var yr=anyNeg?[-yAbs*1.06, yAbs*1.06]:[-yAbs*0.16, yAbs*1.06];
  return parPanelsSVG(items.map(function(it){
    return {a:it.v, b:0, c:0, caption:(it.d===""?"y = x\u00B2":"y = "+plain(it.d)+"x\u00B2"), xrange:[-2,2], yrange:yr};
  }));
}

/* ---------- 4.29: effect of a on the width of y = ax^2 (L1) ---------- */
E("u2-effect-of-a",2,["4.29"],1,"gen",function(){
  var pool=[{d:"2",v:2},{d:"3",v:3},{d:"4",v:4},{d:"5",v:5},{d:"-2",v:-2},{d:"-3",v:-3},
            {d:"\\frac{1}{2}",v:0.5},{d:"\\frac{1}{3}",v:1/3},{d:"\\frac{1}{4}",v:0.25},
            {d:"\\frac{2}{3}",v:2/3},{d:"\\frac{3}{4}",v:0.75},{d:"\\frac{1}{5}",v:0.2}];
  if(ri(0,2)<2){ /* compare a set of three parabolas */
    var att=0, it1, it2;
    while(att<200){
      att++;
      it1=pick(pool); it2=pick(pool);
      if(Math.abs(it1.v)!==Math.abs(it2.v)) break;
    }
    var askWide=ri(0,1)===0;
    var items=[{d:"",v:1},{d:it1.d,v:it1.v},{d:it2.d,v:it2.v}];
    function eqOf(it){ return "\\(y = "+(it.d===""?"":it.d)+"x^2\\)"; }
    var target=items.slice().sort(function(m,n){ return askWide ? Math.abs(m.v)-Math.abs(n.v) : Math.abs(n.v)-Math.abs(m.v); })[0];
    var keyEq=eqOf(target);
    var dis=items.filter(function(it){ return eqOf(it)!==keyEq; }).map(eqOf);
    dis.push("All three parabolas are equally wide.");
    var absList=items.map(function(it){ var av=Math.abs(it.v); return "\\(\\left|"+(it.d===""?"1":it.d)+"\\right| "+(Number.isInteger(av*4)?"=":"\\approx")+" "+fmt(av,2)+"\\)"; }).join(", ");
    var qe1=mcq("The graphs of \\(y = x^2\\), \\(y = "+it1.d+"x^2\\) and \\(y = "+it2.d+"x^2\\) are drawn on the same axes. Which parabola is the <b>"+(askWide?"widest":"narrowest")+"</b>?",
      keyEq, dis,
      "Comparing parabolas of the form \\(y = ax^2\\), the width is decided by \\(\\left|a\\right|\\): the larger \\(\\left|a\\right|\\) is, the faster the values grow and the narrower the parabola; the smaller \\(\\left|a\\right|\\), the wider it is. Here the absolute values are "+absList+". So the "+(askWide?"widest":"narrowest")+" parabola is "+keyEq+". A negative value of \\(a\\) reflects a parabola in the x-axis but does not change its width.",
      {askWide:askWide, v1:it1.v, v2:it2.v});
    qe1.figure=u2EffectPanels(items);
    return qe1;
  }
  var it=pick(pool);
  var W=Math.abs(it.v)>1?"narrower":"wider", O=it.v>0?"opens upward":"opens downward";
  var W2=Math.abs(it.v)>1?"wider":"narrower", O2=it.v>0?"opens downward":"opens upward";
  function stmt(w,o){ return "It is "+w+" and "+o+"."; }
  var qe2=mcq("Compared with the graph of \\(y = x^2\\), how does the graph of \\(y = "+it.d+"x^2\\) differ?",
    stmt(W,O), [stmt(W2,O), stmt(W,O2), stmt(W2,O2)],
    "For \\(y = ax^2\\), compare \\(\\left|a\\right|\\) with 1 and check the sign of \\(a\\). Here \\(\\left|a\\right| = "+fmt(Math.abs(it.v),2)+"\\), which is "+(Math.abs(it.v)>1?"greater":"less")+" than 1, so the values of \\(y\\) change "+(Math.abs(it.v)>1?"faster":"more slowly")+" than for \\(y = x^2\\) and the parabola is "+W+". The coefficient is "+(it.v>0?"positive, so the parabola still opens upward.":"negative, so the parabola is reflected in the x-axis and opens downward."),
    {v:it.v});
  qe2.figure=u2EffectPanels([{d:"",v:1},it]);
  return qe2;
});

/* ---------- 4.30 and 4.31: translations from p and q (L1) ---------- */
E("u2-translations",2,["4.30","4.31"],1,"var",varset([
  function(){
  var fam=pick(["p","q","both"]);
  if(fam==="p"){
    var p=ri(2,8), sgn=pick([1,-1]);
    var form=sgn>0?"(x - "+p+")^2":"(x + "+p+")^2";
    var keyDir=sgn>0?"to the right":"to the left", altDir=sgn>0?"to the left":"to the right";
    return mcq("The graph of \\(y = x^2\\) is transformed to the graph of \\(y = "+form+"\\). How does the graph change?",
      "It shifts "+p+" units "+keyDir+".",
      ["It shifts "+p+" units "+altDir+".", "It shifts "+p+" units up.", "It shifts "+p+" units down."],
      "Replacing \\(x\\) by \\("+(sgn>0?"(x - "+p+")":"(x + "+p+")")+"\\) shifts every point of the graph "+p+" units "+keyDir+": the value in the brackets must reach the same size as before, so each point moves "+keyDir+" by "+p+". The sign inside the brackets points opposite to the direction of the shift.",
      {fam:fam, p:p, sgn:sgn});
  }
  if(fam==="q"){
    var q=ri(2,9), up=ri(0,1)===0;
    var form2=up?"x^2 + "+q:"x^2 - "+q;
    return mcq("The graph of \\(y = x^2\\) is transformed to the graph of \\(y = "+form2+"\\). How does the graph change?",
      "It shifts "+q+" units "+(up?"up":"down")+".",
      ["It shifts "+q+" units "+(up?"down":"up")+".", "It shifts "+q+" units to the right.", "It shifts "+q+" units to the left."],
      "Adding a constant to the whole function moves every point straight up or down by that amount. Here "+(up?"\\(+"+q+"\\) is added, so each y-value grows by "+q+" and the graph shifts "+q+" units up.":"\\("+q+"\\) is subtracted, so each y-value drops by "+q+" and the graph shifts "+q+" units down."),
      {fam:fam, q:q, up:up});
  }
  var p2=ri(2,8), q2=ri(2,8), sp=pick([1,-1]), sq=pick([1,-1]);
  var H=sp>0?"to the right":"to the left", H2=sp>0?"to the left":"to the right";
  var V=sq>0?"up":"down", V2=sq>0?"down":"up";
  function st(h,v){ return "It shifts "+p2+" units "+h+" and "+q2+" units "+v+"."; }
  return mcq("The graph of \\(y = x^2\\) is transformed to the graph of \\(y = "+u2VS(1,sp*p2,sq*q2)+"\\). How does the graph change?",
    st(H,V), [st(H2,V), st(H,V2), st(H2,V2)],
    "The two changes act independently. Inside the brackets, \\((x "+(sp>0?"- ":"+ ")+p2+")\\) shifts the graph "+p2+" units "+H+" (the sign inside points opposite to the shift). The constant "+(sq>0?"+ "+q2:"- "+q2)+" added to the whole function shifts it "+q2+" units "+V+".",
    {fam:fam, p:p2, q:q2, sp:sp, sq:sq});
},
  function(){
    var fam=pick(["p","q","both"]);
    var P=0, Q=0;
    if(fam==="p"){ P=ri(2,8)*pick([1,-1]); }
    else if(fam==="q"){ Q=ri(2,9)*pick([1,-1]); }
    else { P=ri(2,8)*pick([1,-1]); Q=ri(2,8)*pick([1,-1]); }
    var H=P>0?"to the right":"to the left", H2=P>0?"to the left":"to the right";
    var V=Q>0?"up":"down", V2=Q>0?"down":"up";
    function st(h,v){ return "It shifts "+Math.abs(P)+" units "+h+" and "+Math.abs(Q)+" units "+v+"."; }
    var key, dis;
    if(fam==="p"){ key="It shifts "+Math.abs(P)+" units "+H+"."; dis=["It shifts "+Math.abs(P)+" units "+H2+".", "It shifts "+Math.abs(P)+" units up.", "It shifts "+Math.abs(P)+" units down."]; }
    else if(fam==="q"){ key="It shifts "+Math.abs(Q)+" units "+V+"."; dis=["It shifts "+Math.abs(Q)+" units "+V2+".", "It shifts "+Math.abs(Q)+" units to the right.", "It shifts "+Math.abs(Q)+" units to the left."]; }
    else { key=st(H,V); dis=[st(H2,V), st(H,V2), st(H2,V2)]; }
    var move=(P!==0?Math.abs(P)+" units "+H:"")+((P!==0&&Q!==0)?" and ":"")+(Q!==0?Math.abs(Q)+" units "+V:"");
    var qfig=mcq("The graph shows the parabola obtained by transforming the graph of \\(y = x^2\\). How has the graph changed?",
      key, dis,
      "The graph of \\(y = x^2\\) has its vertex at \\((0, 0)\\). The marked vertex of the shown graph is \\(("+P+", "+Q+")\\), so the graph has shifted "+move+".",
      {fam:fam, P:P, Q:Q});
    qfig.figure=parSVG(1,-2*P,P*P+Q,{labels:"values",marks:[{x:P,y:Q}]});
    return qfig;
  }
]));

/* ---------- 4.38: read the vertex from vertex form (L1) ---------- */
E("u2-vertex-read",2,["4.38"],1,"gen",function(){
  var a=pick([1,2,3,-1,-2,-3]);
  var p=0, q=0;
  while(p===0) p=ri(-6,6);
  while(q===0) q=ri(-6,6);
  var qv=mcq("What are the coordinates of the <b>vertex</b> of the graph of \\(y = "+u2VS(a,p,q)+"\\)?",
    u2Pair(p,q), [u2Pair(-p,q), u2Pair(p,-q), u2Pair(-p,-q)],
    "In the form \\(y = a(x - p)^2 + q\\), the vertex is \\((p, q)\\): the squared part is zero when \\(x = "+p+"\\), and the value of the function there is \\("+q+"\\). A check on a graphing utility shows the turning point at "+u2Pair(p,q)+", confirming the read-off.",
    {a:a, p:p, q:q});
  qv.figure=parSVG(a,-2*a*p,a*p*p+q,{marks:[{x:p,y:q}]});
  return qv;
});

/* ---------- 4.27: number of x-intercepts from a and q (L2) ---------- */
E("u2-intercepts-count",2,["4.27"],1,"var",varset([
  function(){
  var mode=pick(["two","two","one","none","none"]);
  var a=pick([1,2,3,-1,-2,-3]), q;
  if(mode==="one") q=0;
  else if(mode==="two"){ q=ri(1,9)*(a>0?-1:1); }
  else { q=ri(1,9)*(a>0?1:-1); }
  var key=mode==="two"?"Two x-intercepts":mode==="one"?"One x-intercept":"No x-intercepts";
  var dis=["Two x-intercepts","One x-intercept","No x-intercepts","More information is needed"].filter(function(s){ return s!==key; });
  var extrem=a>0?"minimum":"maximum";
  var sol;
  if(mode==="two"){
    sol="The vertex of the graph is \\((p, q)\\), so \\(q = "+q+"\\) is the "+extrem+" value of the function. Since \\(a = "+a+"\\) and the "+extrem+" value lies on the opposite side of the x-axis from the ends of the graph, the graph must cross the x-axis on both sides of the vertex: two x-intercepts. The value of \\(p\\) only slides the graph sideways, so it cannot change the count.";
  } else if(mode==="one"){
    sol="The vertex of the graph is \\((p, q)\\), and here \\(q = 0\\), so the vertex sits exactly on the x-axis. Since \\(a = "+a+"\\), the rest of the graph lies entirely on one side of the axis, so the graph touches the axis at the vertex and nowhere else: one x-intercept. The value of \\(p\\) only slides the graph sideways, so it cannot change the count.";
  } else {
    sol="The vertex of the graph is \\((p, q)\\), so \\(q = "+q+"\\) is the "+extrem+" value of the function. Since \\(a = "+a+"\\), the graph opens "+(a>0?"upward from a minimum":"downward from a maximum")+" that is already on the same side of the x-axis as the rest of the graph, so the graph never reaches the x-axis: no x-intercepts. The value of \\(p\\) only slides the graph sideways, so it cannot change the count.";
  }
  return mcq("A quadratic function is written as \\(y = a(x - p)^2 + q\\), with \\(a = "+a+"\\) and \\(q = "+q+"\\). How many <b>x-intercepts</b> does its graph have?",
    key, dis, sol, {a:a, q:q, mode:mode});
},
  function(){
    var a=pick([1,2,-1,-2,3,-3]), h=ri(-6,6), k=ri(-9,9);
    var cnt=(k===0)?1:(((a>0&&k<0)||(a<0&&k>0))?2:0);
    var mk=[];
    if(cnt===2){ var sd=Math.sqrt(-k/a); mk=[{x:h-sd,y:0},{x:h+sd,y:0}]; }
    else if(cnt===1){ mk=[{x:h,y:0}]; }
    var qfig=numq("How many x-intercepts does the parabola shown in the graph have?",
      cnt,0.011,
      "The vertex is \\(("+h+", "+k+")\\) and the parabola opens "+(a>0?"upward":"downward")+". "+(k===0?"The vertex sits right on the x-axis, so the graph touches it at exactly one point: <b>1</b> x-intercept.":(cnt===2?"The vertex is on the opposite side of the x-axis from the direction the parabola opens away from, so the graph must cross the axis twice: <b>2</b> x-intercepts.":"The vertex is on the same side of the x-axis as the opening, so the graph never reaches the axis: <b>0</b> x-intercepts.")),
      {a:a,h:h,k:k});
    qfig.figure=parSVG(a,-2*a*h,a*h*h+k,{labels:"values",marks:mk});
    return qfig;
  }
]));

/* ---------- 4.28: features of a graphed parabola in vertex form (L2) ---------- */
E("u2-graph-features",2,["4.28"],1,"gen",function(){
  var a=pick([1,2,-1,-2]);
  var p=0, q=0;
  while(p===0) p=ri(-4,4);
  while(q===0) q=ri(-4,4);
  var fn=function(x){ return a*(x-p)*(x-p)+q; };
  function feat(vx, vy, ax, geq, open){
    return "Vertex: \\(("+vx+", "+vy+")\\); axis of symmetry: \\(x = "+ax+"\\); range: \\(y "+(geq?"\\geq":"\\leq")+" "+vy+"\\); opens "+open;
  }
  var up=a>0;
  var key=feat(p, q, p, up, up?"upward":"downward");
  var d1=feat(-p, q, p, up, up?"upward":"downward");
  var d2=feat(p, q, p, !up, up?"upward":"downward");
  var d3=feat(p, q, p, up, up?"downward":"upward");
  var qq=mcq("The graph of \\(y = "+u2VS(a,p,q)+"\\) is shown. Which list of features matches the graph?",
    key, [d1, d2, d3],
    "Start from \\(y = x^2\\) and apply the transformations: the graph shifts "+(p>0?p+" units to the right":(-p)+" units to the left")+" and "+(q>0?q+" units up":(-q)+" units down")+(a===-1||a===1?"":", and the values are stretched by a factor of \\("+Math.abs(a)+"\\)")+(a<0?", and it is reflected in the x-axis":"")+". The vertex lands at \\(("+p+", "+q+")\\), the axis of symmetry is the vertical line through the vertex, \\(x = "+p+"\\), and because the graph opens "+(up?"upward, the smallest value is the vertex value, giving the range \\(y \\geq "+q+"\\)":"downward, the largest value is the vertex value, giving the range \\(y \\leq "+q+"\\)")+".",
    {a:a, p:p, q:q});
  qq.figure=u2Plot(fn, p-5, p+5, {points:[[p,q]]});
  return qq;
});

/* ---------- 4.32: vertex of a standard-form quadratic (L2) ---------- */
E("u2-vertex-standard",2,["4.32"],2,"var",varset([
  function(){
  var a=pick([1,2,3,-1,-2]);
  var p=0, q=0, att=0, b, c;
  while(att<200){
    att++;
    p=0; while(p===0) p=ri(-5,5);
    q=ri(-6,6);
    b=-2*a*p; c=a*p*p+q;
    var fneg=a*p*p - b*p + c; /* f(-p) */
    if(q!==c && fneg!==q && fneg!==c) break;
  }
  b=-2*a*p; c=a*p*p+q;
  var fneg2=a*p*p - b*p + c;
  var sub=(a===1?"":a===-1?"-":""+a)+"("+p+")^2"+(b>0?" + "+b+"("+p+")":b<0?" - "+(-b)+"("+p+")":"")+(c>0?" + "+c:c<0?" - "+(-c):"");
  return mcq("What is the <b>vertex</b> of the graph of \\(y = "+u2Std(a,b,c)+"\\)?",
    u2Pair(p,q), [u2Pair(-p,q), u2Pair(p,c), u2Pair(p,fneg2)],
    "To sketch the graph, first find its turning point. The vertex sits on the axis of symmetry, \\(x = \\frac{-b}{2a}\\):"+
    "\\[ \\begin{aligned} x &= \\frac{-b}{2a} = \\frac{"+(-b)+"}{"+(2*a)+"} = "+p+" \\\\ y &= "+sub+" \\\\ &= "+u2JoinSigned([a*p*p, b*p, c])+" \\\\ &= "+q+" \\end{aligned} \\]"+
    "So the vertex, the point where the graph turns, is "+u2Pair(p,q)+".",
    {a:a, p:p, q:q, b:b, c:c});
},
  function(){
    var a=pick([1,2,3,-1,-2]);
    var p=0, q=0, att=0, b, c;
    while(att<200){
      att++;
      p=0; while(p===0) p=ri(-5,5);
      q=ri(-6,6);
      b=-2*a*p; c=a*p*p+q;
      var fneg=a*p*p - b*p + c;
      if(q!==c && fneg!==q && fneg!==c) break;
    }
    b=-2*a*p; c=a*p*p+q;
    var fneg2=a*p*p - b*p + c;
    var qfig=mcq("The graph shows a parabola with its vertex marked. What is the <b>vertex</b> of the graph?",
      u2Pair(p,q), [u2Pair(-p,q), u2Pair(p,c), u2Pair(p,fneg2)],
      "The marked point is the turning point of the graph, its vertex: "+u2Pair(p,q)+".",
      {a:a, p:p, q:q, b:b, c:c});
    qfig.figure=parSVG(a,b,c,{labels:"values",marks:[{x:p,y:q}]});
    return qfig;
  }
]));

/* ---------- 4.41: characteristics of a standard-form quadratic (L2) ---------- */
E("u2-characteristics-standard",2,["4.41"],2,"gen",function(){
  var a=pick([1,2,-1,-2]);
  var p=0; while(p===0) p=ri(-5,5);
  var q=ri(-6,6); if(q===0) q=3;
  var b=-2*a*p, c=a*p*p+q;
  function stYint(v){ return "The y-intercept is \\("+v+"\\)."; }
  function stAxis(v){ return "The axis of symmetry is \\(x = "+v+"\\)."; }
  function stOpen(upw){ return upw?"The parabola opens upward.":"The parabola opens downward."; }
  function stExtr(isMax, v, x){ return "The "+(isMax?"maximum":"minimum")+" value is \\("+v+"\\), reached at \\(x = "+x+"\\)."; }
  var falseYint=[b, q, -c, c+1].filter(function(v){ return v!==c; })[0];
  var chars={
    yint:{ t:stYint(c), f:stYint(falseYint) },
    axis:{ t:stAxis(p), f:stAxis(-p) },
    open:{ t:stOpen(a>0), f:stOpen(a<0) },
    extr:{ t:stExtr(a<0, q, p), f:stExtr(a>0, q, p) }
  };
  var keyChar=pick(["yint","axis","open","extr"]);
  var opts={};
  ["yint","axis","open","extr"].forEach(function(k){ opts[k]=(k===keyChar?chars[k].t:chars[k].f); });
  var qc=mcq("Which statement about the graph of \\(y = "+u2Std(a,b,c)+"\\) is <b>correct</b>?",
    opts[keyChar], ["yint","axis","open","extr"].filter(function(k){ return k!==keyChar; }).map(function(k){ return opts[k]; }),
    "Work through the characteristics one at a time. The y-intercept comes from setting \\(x = 0\\), which leaves \\(y = "+c+"\\). The axis of symmetry is \\(x = \\frac{-b}{2a} = \\frac{"+(-b)+"}{"+(2*a)+"} = "+p+"\\). Since \\(a = "+a+"\\) is "+(a>0?"positive":"negative")+", the parabola opens "+(a>0?"upward":"downward")+", so the vertex \\(("+p+", "+q+")\\) gives a "+(a>0?"minimum":"maximum")+" value of \\("+q+"\\). Only one of the four statements matches all of this.",
    {a:a, p:p, q:q, keyChar:keyChar});
  qc.figure=parSVG(a,-2*a*p,a*p*p+q,{marks:[{x:p,y:q}]});
  return qc;
});

/* ---------- 4.43 and 4.45: complete the square, and verify two forms agree (L2) ---------- */
E("u2-complete-square",2,["4.43","4.45"],2,"gen",function(){
  var fam=pick(["convert","verify"]);
  var a=1, p=0, q=0, b=0, c=0, key="", att=0, dis=[];
  while(att<200){
    att++;
    a=pick([1,1,2,-1,-2]);
    p=0; while(p===0) p=ri(-5,5);
    q=0; while(q===0) q=ri(-6,6);
    b=-2*a*p; c=a*p*p+q;
    key="\\(y = "+u2VS(a,p,q)+"\\)";
    var pool=["\\(y = "+u2VS(a,-p,q)+"\\)", "\\(y = "+u2VS(a,p,c)+"\\)", "\\(y = "+u2VS(a,p,-q)+"\\)", "\\(y = "+u2VS(a,-p,-q)+"\\)"];
    if(a!==1) pool.push("\\(y = "+u2VS(1,p,q)+"\\)");
    dis=[]; var seen={};
    pool.forEach(function(s){ if(s!==key && !seen[s]){ seen[s]=1; dis.push(s); } });
    if(dis.length>=3){ dis=dis.slice(0,3); break; }
  }
  var B=b/a, P2=p*p;
  var aPre=(a===1?"":a===-1?"-":""+a);
  var cTail=(c>0?" + "+c:c<0?" - "+(-c):"");
  var sol;
  if(fam==="convert"){
    var lines="\\[ \\begin{aligned} y &= "+u2Std(a,b,c)+" \\\\ ";
    if(a===1){
      lines+="&= \\left("+u2QuadB(B)+" + "+P2+"\\right) + \\left("+u2JoinSigned([c,-P2])+"\\right) \\\\ &= "+u2VS(a,p,q)+" \\end{aligned} \\]";
    } else {
      lines+="&= "+aPre+"\\left("+u2QuadB(B)+"\\right)"+cTail+" \\\\ &= "+aPre+"\\left("+u2QuadB(B)+" + "+P2+"\\right) + \\left("+u2JoinSigned([c,-a*P2])+"\\right) \\\\ &= "+u2VS(a,p,q)+" \\end{aligned} \\]";
    }
    sol="Complete the square on the x-terms. Half of the coefficient of \\(x\\) inside the brackets is \\("+(B/2)+"\\), and \\("+(B/2)+"\\) squared is \\("+P2+"\\); that amount is added inside the brackets and balanced outside them:"+
      lines+
      "The result is the vertex form \\(y = "+u2VS(a,p,q)+"\\) with vertex \\(("+p+", "+q+")\\).";
    return mcq("Rewrite \\(y = "+u2Std(a,b,c)+"\\) in the form \\(y = a(x - p)^2 + q\\).",
      key, dis, sol, {fam:fam, a:a, p:p, q:q});
  }
  sol="Expand the squared bracket in the matching choice and compare term by term:"+
    "\\[ \\begin{aligned} "+u2VS(a,p,q)+" &= "+aPre+"\\left("+u2Std(1,-2*p,P2)+"\\right) "+(q>0?"+ "+q:"- "+(-q))+" \\\\ &= "+u2Std(a,b,a*P2)+(q>0?" + "+q:" - "+(-q))+" \\\\ &= "+u2Std(a,b,c)+" \\end{aligned} \\]"+
    "The expansion gives exactly \\(y = "+u2Std(a,b,c)+"\\), so the two forms represent the same function. The other choices expand to different quadratics.";
  return mcq("Which function represents the <b>same function</b> as \\(y = "+u2Std(a,b,c)+"\\)?",
    key, dis, sol, {fam:fam, a:a, p:p, q:q});
});

/* ---------- 4.42: reasoning inside completing the square (L2, var) ---------- */
E("u2-cts-reasoning",2,["4.42"],1,"var",varset([
  function(){
    var b=pick([2,4,6,8,10,-2,-4,-6,-8,-10]), h=b/2, h2=h*h;
    var facS="(x"+(h>0?" + "+h:" - "+(-h))+")^2";
    return mcq("A student begins completing the square on \\("+u2QuadB(b)+"\\) by adding \\("+h2+"\\). Why is \\("+h2+"\\) the number that is added?",
      "Because half of the coefficient of \\(x\\) is \\("+h+"\\), and adding its square makes \\("+u2QuadB(b)+" + "+h2+"\\) a perfect square: it factors as \\("+facS+"\\).",
      ["To eliminate the \\(x\\) term from the expression, so that the work is left with only two terms, \\(x^2\\) and a constant, to deal with.",
       "To make the constant term of the expression equal to the coefficient of \\(x\\), so the two middle values in the trinomial match each other exactly.",
       "Because the square of the full coefficient of \\(x\\) must always be added first, before any other step in the method is carried out."],
      "Completing the square aims at the pattern \\((x + k)^2 = x^2 + 2kx + k^2\\). Matching \\(2k\\) with the coefficient \\("+b+"\\) gives \\(k = "+h+"\\), so the constant to add is \\(k^2 = "+h2+"\\). With it added, the trinomial factors as \\("+facS+"\\).",
      {b:b});
  },
  function(){
    var b=pick([2,4,6,8,-2,-4,-6,-8]), h=b/2, h2=h*h, c=pick([1,3,5,7,-2,-4]);
    return mcq("When \\(y = "+u2Std(1,b,c)+"\\) is rewritten by completing the square, the work includes the step \\(y = "+u2QuadB(b)+" + "+h2+" - "+h2+(c>0?" + "+c:" - "+(-c))+"\\). Why is \\("+h2+"\\) subtracted as well as added?",
      "Adding and subtracting the same number does not change the value of the expression, so the rewritten function is still equivalent to the original one.",
      ["So that the y-intercept of the graph ends up in a different position once the function has been rewritten and is graphed in its new form at the end of the work shown.",
       "Because a square has to be completed on both sides of the equation, and the subtraction is what balances what was done on the left side.",
       "To make the constant term of the function into a perfect square as well, so that both parts of the expression end up as perfect squares."],
      "The \\(+"+h2+"\\) is there to complete the square, but it changes the value of the expression unless it is balanced. Subtracting \\("+h2+"\\) again keeps the new expression equal to \\("+u2Std(1,b,c)+"\\) for every value of \\(x\\), which is what makes the rewriting a rewriting of the same function.",
      {b:b, c:c});
  },
  function(){
    var a=pick([2,3]), B=pick([4,6,8]), c=pick([1,2,5,7]);
    return mcq("To rewrite \\(y = "+u2Std(a,a*B,c)+"\\) by completing the square, the first step gives \\(y = "+a+"\\left("+u2QuadB(B)+"\\right) + "+c+"\\). Why does the coefficient of \\(x^2\\) inside the brackets need to be 1?",
      "The pattern \\((x + k)^2 = x^2 + 2kx + k^2\\) has \\(x^2\\) with coefficient 1, so halving the \\(x\\)-coefficient gives \\(k\\) only when the \\(x^2\\) coefficient is 1.",
      ["Because a perfect square trinomial can never have a coefficient in front of it when it is written out in factored form, so the coefficient must be removed first.",
       "So that the constant term can be factored out of the brackets at the same time as the coefficient of \\(x^2\\) is factored out of them as well.",
       "Because the quadratic formula can only be used when the leading coefficient is 1, as in \\(x^2 + bx + c\\), which is the standard form the formula needs."],
      "Inside the brackets the work matches the trinomial against \\((x + k)^2 = x^2 + 2kx + k^2\\), whose \\(x^2\\) coefficient is 1. Factoring out \\("+a+"\\) first makes the bracket a monic trinomial, so half of \\("+B+"\\) is the value of \\(k\\) to use. The constant \\("+c+"\\) is not part of the square being completed and stays outside.",
      {a:a, B:B});
  },
  function(){
    var b=pick([2,4,6,8,10,-2,-4,-6,-8,-10]), h=b/2, h2=h*h, c=pick([2,3,5,-1,-4,6]);
    var q=c-h2;
    var facS="(x"+(h>0?" + "+h:" - "+(-h))+")^2";
    return mcq("The work for rewriting \\(y = "+u2Std(1,b,c)+"\\) by completing the square is shown:"+
      "\\[ \\begin{aligned} y &= "+u2QuadB(b)+" + "+h2+" + \\left("+u2JoinSigned([c,-h2])+"\\right) \\\\ &= "+facS+(q>0?" + "+q:" - "+(-q))+" \\end{aligned} \\]"+
      "What does the last step, writing \\("+u2QuadB(b)+" + "+h2+"\\) as \\("+facS+"\\), accomplish?",
      "It puts the function in vertex form, so the vertex and the transformations of the graph can be read off directly.",
      ["It solves the equation \\(y = 0\\) for the function, which gives the x-intercepts of the graph where it crosses the axis.",
       "It removes the constant term from the function completely, so only the squared part of the function is left.",
       "It factors the original trinomial into two different binomials, each with its own constant term in it."],
      "The trinomial \\("+u2QuadB(b)+" + "+h2+"\\) is a perfect square, equal to \\("+facS+"\\). Writing it that way turns the whole function into vertex form, \\(y = "+u2VS(1,-h,q)+"\\), and the vertex \\(("+(-h)+", "+q+")\\) can be read from it. Nothing has been solved and no term has been dropped.",
      {b:b, c:c});
  }
]));

/* ---------- 4.37: why vertex form is a quadratic function (L2, var) ---------- */
E("u2-why-quadratic",2,["4.37"],2,"var",varset([
  function(){
    return mcq("The function \\(y = a(x - p)^2 + q\\) is a quadratic function only when \\(a \\neq 0\\). Why does setting \\(a = 0\\) destroy the quadratic property?",
      "If \\(a = 0\\), the whole squared term becomes 0 and the function reduces to the constant \\(y = q\\), which has degree 0.",
      ["If \\(a = 0\\), the function becomes linear, because the \\(x\\) term from the expansion is the highest term left.",
       "If \\(a = 0\\), the squared term still contains an \\(x^2\\) term, so the function stays quadratic.",
       "If \\(a = 0\\), the vertex of the graph moves to the origin, which a quadratic cannot have."],
      "The factor \\(a\\) multiplies the entire squared bracket. When \\(a = 0\\), that bracket contributes nothing, no matter what \\(x\\) is, and only the constant \\(q\\) survives. A constant function has degree 0, so it is not a quadratic function; this is why the definition of the form includes the condition \\(a \\neq 0\\).",
      {});
  },
  function(){
    var a=pick([2,3,4,5]), p=pick([1,2,3]), q=pick([1,2,3,4,5,6]);
    var lin=pick([3,5,7]), cub=pick([2,4]);
    return mcq("Which function is a <b>quadratic function</b>?",
      "\\(f(x) = "+u2VS(a,p,q)+"\\)",
      ["\\(f(x) = "+lin+"x - "+pick([1,2,6])+"\\)",
       "\\(f(x) = x^3 - "+cub+"x\\)",
       "\\(f(x) = \\sqrt{x} + "+pick([2,4])+"\\)"],
      "A quadratic function is a polynomial function of degree 2. Expanding \\("+u2VS(a,p,q)+"\\) gives \\("+u2Std(a,-2*a*p,a*p*p+q)+"\\), which has degree 2. The others have degree 1, degree 3, and a square root of the variable, so none of them is quadratic.",
      {a:a, p:p, q:q});
  },
  function(){
    var a=pick([2,3,4]), p=pick([1,2,3]), q=pick([1,2,3,4,5,6]);
    var std=u2Std(a,-2*a*p,a*p*p+q);
    return mcq("A classmate claims that \\(y = "+u2VS(a,p,q)+"\\) is not a quadratic function, because it contains no \\(x^2\\) term. Which statement corrects the claim?",
      "Expanding gives \\(y = "+std+"\\), which does contain an \\(x^2\\) term, so the function is quadratic.",
      ["The claim is correct. A quadratic function must show an \\(x^2\\) term in the form it is written.",
       "The claim is correct. The squared bracket makes the function a quartic, not a quadratic.",
       "The claim is incorrect. The function is quadratic because the constant \\("+q+"\\) shifts the graph up."],
      "Whether a function is quadratic is decided after it is written as a polynomial: expanding the squared bracket gives \\(y = "+std+"\\). The \\(x^2\\) term was there all along, hidden inside the squared bracket, and its coefficient \\("+a+"\\) is not zero, so the function has degree 2.",
      {a:a, p:p, q:q});
  },
  function(){
    return mcq("When \\(y = a(x - p)^2 + q\\) is expanded into the form \\(y = ax^2 + bx + c\\), what is the coefficient of the \\(x\\) term?",
      "\\(-2ap\\)",
      ["\\(2ap\\)", "\\(-ap\\)", "\\(ap\\)"],
      "Expand the squared bracket first: \\((x - p)^2 = x^2 - 2px + p^2\\). Multiplying by \\(a\\) gives \\(ax^2 - 2apx + ap^2\\), and adding \\(q\\) does not affect the \\(x\\) term. So the coefficient of \\(x\\) is \\(-2ap\\).",
      {});
  }
]));

/* ---------- 4.40: write a quadratic from a vertex and a point or intercept (L2) ---------- */
E("u2-write-from-characteristics",2,["4.40"],2,"gen",function(){
  var fam=pick(["point","yint"]);
  var a=pick([1,2,3,-1,-2,-3]);
  var p=0; while(p===0) p=ri(-4,4);
  var q=ri(-5,5);
  var key="\\(y = "+u2VS(a,p,q)+"\\)";
  var pool=["\\(y = "+u2VS(-a,p,q)+"\\)", "\\(y = "+u2VS(a,-p,q)+"\\)", "\\(y = "+u2VS(a,p,-q)+"\\)", "\\(y = "+u2VS(a,-p,-q)+"\\)", "\\(y = "+u2VS(a+(a>0?1:-1),p,q)+"\\)"];
  var dis=[], seen={};
  pool.forEach(function(s){ if(s!==key && !seen[s]){ seen[s]=1; dis.push(s); } });
  dis=dis.slice(0,3);
  var qTail=(q>0?" + "+q:q<0?" - "+(-q):"");
  if(fam==="point"){
    var d=pick([1,2,3]), x1=p+(ri(0,1)===0?d:-d), y1=a*d*d+q, dx=x1-p;
    var qw=mcq("A parabola has vertex \\(("+p+", "+q+")\\) and passes through the point \\(("+x1+", "+y1+")\\). Which function, in vertex form, describes the parabola?",
      key, dis,
      "Use the vertex form \\(y = a(x - p)^2 + q\\) with the given vertex, then substitute the known point to find \\(a\\):"+
      "\\[ \\begin{aligned} "+y1+" &= a("+dx+")^2"+qTail+" \\\\ "+(y1-q)+" &= "+(d*d)+"a \\\\ a &= \\frac{"+(y1-q)+"}{"+(d*d)+"} = "+a+" \\end{aligned} \\]"+
      "So the function is \\(y = "+u2VS(a,p,q)+"\\).",
      {fam:fam, a:a, p:p, q:q, x1:x1, y1:y1});
    qw.figure=parSVG(a,-2*a*p,a*p*p+q,{marks:[{x:p,y:q},{x:x1,y:y1}]});
    return qw;
  }
  var yi=a*p*p+q;
  var qw=mcq("A parabola has vertex \\(("+p+", "+q+")\\) and y-intercept \\("+yi+"\\). Which function, in vertex form, describes the parabola?",
    key, dis,
    "Use the vertex form \\(y = a(x - p)^2 + q\\) with the given vertex. The y-intercept is the value at \\(x = 0\\), so substitute the point \\((0, "+yi+")\\) to find \\(a\\):"+
    "\\[ \\begin{aligned} "+yi+" &= a("+(0-p)+")^2"+qTail+" \\\\ "+(yi-q)+" &= "+(p*p)+"a \\\\ a &= \\frac{"+(yi-q)+"}{"+(p*p)+"} = "+a+" \\end{aligned} \\]"+
    "So the function is \\(y = "+u2VS(a,p,q)+"\\).",
    {fam:fam, a:a, p:p, q:q, yi:yi});
  qw.figure=parSVG(a,-2*a*p,a*p*p+q,{marks:[{x:p,y:q},{x:0,y:yi}]});
  return qw;
});

/* ---------- 4.46: write a quadratic model, with assumptions (L2, var) ---------- */
E("u2-model-situation",2,["4.46"],2,"var",varset([
  function(){
    var price=pick([30,40,50]), cut=pick([1,2]), base=pick([150,200,250]), gain=pick([5,10,15]);
    return mcq("A gym has "+base+" members who each pay $"+price+" per month. For each $"+cut+" monthly discount the gym offers, "+gain+" new members join. Let \\(x\\) be the number of $"+cut+" discounts offered. Which function gives the monthly revenue \\(R\\), in dollars?",
      "\\(R(x) = ("+price+" - "+cut+"x)("+base+" + "+gain+"x)\\)",
      ["\\(R(x) = ("+price+" - "+cut+"x)("+base+" - "+gain+"x)\\)",
       "\\(R(x) = ("+price+" + "+cut+"x)("+base+" + "+gain+"x)\\)",
       "\\(R(x) = ("+price+" - x)("+base+" + x)\\)"],
      "Revenue is price per member times the number of members. Each discount lowers the price by $"+cut+", so the price is \\("+price+" - "+cut+"x\\), and each discount adds "+gain+" members, so membership is \\("+base+" + "+gain+"x\\). Multiplying gives the model. It assumes the joining pattern stays linear, with the same "+gain+" new members for each further discount.",
      {ctx:"gym membership", price:price, cut:cut, base:base, gain:gain});
  },
  function(){
    var W=pick([40,48,60,80]);
    var qf=mcq("A farmer uses "+W+" m of fencing to enclose a rectangular pen on three sides, with a long barn wall forming the fourth side. The two sides perpendicular to the wall each have length \\(x\\) metres. Which function gives the area \\(A\\), in square metres, of the pen?",
      "\\(A(x) = x("+W+" - 2x)\\)",
      ["\\(A(x) = x("+W+" - x)\\)",
       "\\(A(x) = 2x("+W+" - 2x)\\)",
       "\\(A(x) = x("+(W/2)+" - x)\\)"],
      "The fencing covers two sides of length \\(x\\) and the side opposite the wall, so that side has length \\("+W+" - 2x\\) metres. Area is length times width: \\(A(x) = x("+W+" - 2x)\\). The model assumes the barn wall is at least as long as the side opposite it and that the pen is rectangular.",
      {ctx:"fenced pen", W:W});
    qf.figure=fenceSVG(W,"barn wall");
    return qf;
  },
  function(){
    var S=pick([20,24,30,36]);
    return mcq("Two numbers add to "+S+". Let \\(x\\) be one of the numbers. Which function gives the product \\(P\\) of the two numbers?",
      "\\(P(x) = x("+S+" - x)\\)",
      ["\\(P(x) = x("+S+" + x)\\)",
       "\\(P(x) = "+S+" - x^2\\)",
       "\\(P(x) = x + ("+S+" - x)\\)"],
      "If one number is \\(x\\) and the two add to "+S+", the other number is \\("+S+" - x\\). The product is one number times the other: \\(P(x) = x("+S+" - x)\\). No further assumption is needed; the only condition is that the two numbers add to "+S+".",
      {ctx:"two numbers", S:S});
  }
]));

/* ---------- 4.46: substitute into a model form printed in the stem (L1, var; split from u2-model-situation under ruling 8, Nov 13, 2026) ---------- */
E("u2-model-situation-evaluate",2,["4.46"],1,"var",varset([
  function(){
    var v=pick([12,15,18,20]), h0=pick([1,2]);
    return mcq("A ball is thrown upward from a platform "+h0+" m above the ground, with an initial velocity of "+v+" m/s. The height of the ball is modelled by a function of the form \\(h(t) = -4.9t^2 + v_0 t + h_0\\), where \\(t\\) is the time in seconds. Which function models this ball?",
      "\\(h(t) = -4.9t^2 + "+v+"t + "+h0+"\\)",
      ["\\(h(t) = -4.9t^2 + "+v+"t\\)",
       "\\(h(t) = -4.9t^2 + "+h0+"t + "+v+"\\)",
       "\\(h(t) = 4.9t^2 + "+v+"t + "+h0+"\\)"],
      "In the template, \\(v_0\\) is the initial velocity, "+v+" m/s, and \\(h_0\\) is the starting height, "+h0+" m, so the model is \\(h(t) = -4.9t^2 + "+v+"t + "+h0+"\\). The model assumes the only force acting after the throw is gravity (the \\(-4.9\\) comes from half of \\(9.8\\ \\mathrm{m/s^2}\\)) and that air resistance is ignored.",
      {ctx:"thrown ball", v:v, h0:h0});
  }
]));

/* ---------- 4.47: solve a problem by analyzing a quadratic (L2) ---------- */
E("u2-analyze-problem",2,["4.47"],2,"gen",function(){
  var fam=pick(["projectile","projectile","revenue","fence"]);
  if(fam==="projectile"){
    var ctxs=[
      {n:"A ball is thrown upward from a rooftop", h0s:[10,12,15,18,20], vs:[10,20,30]},
      {n:"A stone is tossed upward from the top of a cliff", h0s:[15,20,25,30], vs:[10,20,30]},
      {n:"A ball is launched upward from a platform", h0s:[2,3,4,5], vs:[10,20]}];
    var ctx=pick(ctxs), h0=pick(ctx.h0s), v=pick(ctx.vs);
    var ts=v/10, mx=h0+v*v/20;
    var qa=numq(ctx.n+" "+h0+" m above the ground. Its height, in metres, after \\(t\\) seconds is modelled by \\(h(t) = -5t^2 + "+v+"t + "+h0+"\\). What is the <b>maximum height</b>, in metres, that the ball reaches?",
      mx, 0.01,
      "The height function is a downward-opening parabola, so its maximum is at the vertex. The time at the vertex is \\(t = \\frac{-b}{2a}\\):"+
      "\\[ \\begin{aligned} t &= \\frac{-"+v+"}{2(-5)} = "+ts+" \\\\ h("+ts+") &= -5("+ts+")^2 + "+v+"("+ts+") + "+h0+" \\\\ &= "+u2JoinSigned([-5*ts*ts, v*ts, h0])+" \\\\ &= "+mx+" \\end{aligned} \\]"+
      "So the maximum height is <b>"+mx+" m</b>, reached after "+ts+" s.",
      {fam:fam, ctx:ctx.n, h0:h0, v:v});
    qa.figure=trajSVG(-5,v,h0);
    return qa;
  }
  if(fam==="revenue"){
    var ctx=pick([{n:"A concert venue", item:"tickets"}, {n:"A community theatre", item:"tickets"}, {n:"A ski hill", item:"lift passes"}]);
    var k=pick([10,20,25,50]), p0=pick([8,10,12,15,20]), xs=pick([2,3,4,5,6,8]);
    var n0=k*(2*xs+p0), B=n0-k*p0, price=p0+xs;
    var qa=numq(ctx.n+" sells "+n0+" "+ctx.item+" at $"+p0+" each. For each $1 increase in price, "+k+" fewer "+ctx.item+" are sold. The revenue is modelled by \\(R(x) = ("+p0+" + x)("+n0+" - "+k+"x)\\), where \\(x\\) is the number of $1 increases. What ticket price, in dollars, gives the <b>maximum revenue</b>?",
      price, 0.01,
      "First expand the revenue function into standard form:"+
      "\\[ \\begin{aligned} R(x) &= ("+p0+" + x)("+n0+" - "+k+"x) \\\\ &= -"+k+"x^2 + "+B+"x + "+(p0*n0)+" \\end{aligned} \\]"+
      "This parabola opens downward, so its vertex gives the maximum. The vertex is at:"+
      "\\[ \\begin{aligned} x &= \\frac{-"+B+"}{2(-"+k+")} = "+xs+" \\end{aligned} \\]"+
      "That is "+xs+" increases of $1 on the starting price of $"+p0+", so the price that gives the maximum revenue is <b>$"+price+"</b>.",
      {fam:fam, ctx:ctx.n, k:k, p0:p0, xs:xs, n0:n0});
    qa.figure=parSVG(-k,B,p0*n0,{xrange:[0,n0/k],xLab:"x",yLab:"R(x)",aria:"Revenue parabola"});
    return qa;
  }
  var ctx2=pick([{n:"A farmer builds a rectangular pen against a long barn wall", Ws:[40,60,80,100,120]},
                 {n:"A gardener makes a rectangular plot against a house wall", Ws:[40,60,80]},
                 {n:"A school builds a rectangular garden plot against a gym wall", Ws:[40,60]}]);
  var W=pick(ctx2.Ws), Amax=W*W/8;
  var qa=numq(ctx2.n+", using "+W+" m of fencing for the other three sides. The area is modelled by \\(A(x) = x("+W+" - 2x)\\), where \\(x\\) is the length, in metres, of each side perpendicular to the wall. What is the <b>maximum area</b>, in square metres, of the plot?",
    Amax, 0.01,
    "Expand the area function: \\(A(x) = -2x^2 + "+W+"x\\). This parabola opens downward, so the maximum is at the vertex:"+
    "\\[ \\begin{aligned} x &= \\frac{-"+W+"}{2(-2)} = "+(W/4)+" \\\\ A("+(W/4)+") &= "+(W/4)+"\\left("+W+" - 2("+ (W/4) +")\\right) \\\\ &= "+(W/4)+" \\times "+(W/2)+" \\\\ &= "+Amax+" \\end{aligned} \\]"+
    "So the maximum area is <b>"+Amax+" m<sup>2</sup></b>, when each perpendicular side is "+(W/4)+" m.",
    {fam:fam, ctx:ctx2.n, W:W});
  qa.figure=fenceSVG(W,(ctx2.n.indexOf("barn")>=0?"barn wall":(ctx2.n.indexOf("house")>=0?"house wall":"gym wall")));
  return qa;
});

/* ---------- 4.44: diagnose and correct an error in completing the square (L3, error analysis) ---------- */
E("u2-error-complete-square",2,["4.44"],3,"gen",function(){
  var att=0, b=0, c=0, h=0, h2=0, q=0, type="";
  while(att<200){
    att++;
    b=pick([2,4,6,8,10,-2,-4,-6,-8,-10]); h=b/2; h2=h*h;
    c=ri(-9,12); if(c===0) continue;
    q=c-h2; if(q===0) continue;
    type=pick(["nosub","bsq","sign"]);
    break;
  }
  var facS="(x"+(h>0?" + "+h:" - "+(-h))+")^2";
  var correct="\\(y = "+u2VS(1,-h,q)+"\\)";
  var flawed, flawNote;
  if(type==="nosub"){
    flawed="\\(y = "+u2VS(1,-h,c)+"\\)";
    flawNote="The student added \\("+h2+"\\) to complete the square but never subtracted it back out, so their expression is worth \\("+h2+"\\) more than the original function. The balance has to be kept: the constant must fall from \\("+c+"\\) to \\("+c+" - "+h2+" = "+q+"\\).";
  } else if(type==="bsq"){
    flawed="\\(y = "+u2VS(1,-b,c-b*b)+"\\)";
    flawNote="The student squared the whole coefficient of \\(x\\), using \\("+b+"^2 = "+(b*b)+"\\), instead of squaring half of it. The amount the pattern needs is the square of half the coefficient: \\(\\left(\\frac{"+b+"}{2}\\right)^2 = "+h2+"\\).";
  } else {
    flawed="\\(y = "+u2VS(1,h,q)+"\\)";
    flawNote="The constant work is right, but the sign inside the squared bracket is wrong. Since \\(2 \\times ("+h+") = "+b+"\\), the trinomial \\("+u2QuadB(b)+" + "+h2+"\\) factors as \\("+facS+"\\), with the sign of \\("+h+"\\) following the coefficient of \\(x\\).";
  }
  var others={
    nosub:"\\(y = "+u2VS(1,-h,c)+"\\)",
    bsq:"\\(y = "+u2VS(1,-b,c-b*b)+"\\)",
    sign:"\\(y = "+u2VS(1,h,q)+"\\)"
  };
  var dis=[flawed].concat(["nosub","bsq","sign"].filter(function(t){ return t!==type; }).map(function(t){ return others[t]; }));
  return mcq("A student rewrote \\(y = "+u2Std(1,b,c)+"\\) in vertex form. Their final answer was \\("+flawed.slice(2,-2)+"\\), but it contains exactly one error. What is the <b>correct</b> vertex form?",
    correct, dis,
    flawNote+" Correct work:"+
    "\\[ \\begin{aligned} y &= "+u2Std(1,b,c)+" \\\\ &= \\left("+u2QuadB(b)+" + "+h2+"\\right) + \\left("+u2JoinSigned([c,-h2])+"\\right) \\\\ &= "+u2VS(1,-h,q)+" \\end{aligned} \\]",
    {b:b, c:c, type:type});
});

/* ---------- 4.39: generalize the vertex rule from examples (L3) ---------- */
E("u2-vertex-rule",2,["4.39"],3,"gen",function(){
  var exs=[], att=0;
  while(exs.length<3 && att<400){
    att++;
    var p=ri(-6,6), q=ri(-6,6);
    if(p===0 || q===0) continue;
    if(exs.some(function(e){ return e.p===p && e.q===q; })) continue;
    exs.push({p:p, q:q});
  }
  var P=0, Q=0; att=0;
  while(att<400){
    att++;
    P=ri(-7,7); Q=ri(-7,7);
    if(P===0 || Q===0) continue;
    if(exs.some(function(e){ return e.p===P && e.q===Q; })) continue;
    break;
  }
  var list=exs.map(function(e){ return "\\(y = "+u2VS(1,e.p,e.q)+"\\) has vertex \\(("+e.p+", "+e.q+")\\)"; }).join("; ");
  return mcq("Three quadratic functions are listed with their vertices: "+list+". Following the pattern in these examples, what is the <b>vertex</b> of \\(y = "+u2VS(1,P,Q)+"\\)?",
    u2Pair(P,Q), [u2Pair(-P,Q), u2Pair(P,-Q), u2Pair(-P,-Q)],
    "Read the pattern across the examples. In each one, the x-coordinate of the vertex is the value that makes the squared part zero, which is the number subtracted from \\(x\\) inside the brackets, and the y-coordinate is the constant added at the end. Applying the same rule to \\(y = "+u2VS(1,P,Q)+"\\): the squared part is zero at \\(x = "+P+"\\) and the added constant is \\("+Q+"\\), so the vertex is \\(("+P+", "+Q+")\\).",
    {P:P, Q:Q});
});

/* ---------- 4.47: evaluate a claim about a maximum (L3) ---------- */
E("u2-evaluate-claim",2,["4.47"],3,"gen",function(){
  var ctx=pick([
    {n:"A theatre", item:"ticket prices"},
    {n:"A concert hall", item:"ticket prices"},
    {n:"A ski hill", item:"lift pass prices"},
    {n:"A bus tour company", item:"ticket prices"}]);
  var a=pick([2,5,10]);
  var xs=ri(3,10), b=2*a*xs, c=pick([1500,2400,3000,4800]);
  var M=a*xs*xs+c, xc=2*xs, Mc=c;
  var d=pick([1,2,3]), x2=xs+d, M2=c+a*xs*xs-a*d*d;
  function Rv(x){ return -a*x*x+b*x+c; }
  var key="The claim is incorrect. The vertex is at \\(x = "+xs+"\\), so the greatest revenue is $"+M+".";
  var dis=[
    "The claim is correct. The vertex is at \\(x = "+xc+"\\), so the greatest revenue is $"+Mc+".",
    "The claim is incorrect. The vertex is at \\(x = "+x2+"\\), so the greatest revenue is $"+M2+".",
    "The claim is incorrect. The revenue has no maximum, because it keeps increasing as \\(x\\) increases."];
  var qe=mcq(ctx.n+" models its revenue, in dollars, by \\(R(x) = "+u2Std(-a,b,c)+"\\), where \\(x\\) is the number of one-dollar increases in its "+ctx.item+". The manager claims that the revenue is greatest after "+xc+" increases. Which statement evaluates the claim correctly?",
    key, dis,
    "The revenue graph opens downward, so its maximum is at the vertex:"+
    "\\[ \\begin{aligned} x &= \\frac{-b}{2a} = \\frac{-"+b+"}{2("+(-a)+")} = "+xs+" \\\\ R("+xs+") &= "+u2JoinSigned([-a*xs*xs, b*xs, c])+" = "+M+" \\end{aligned} \\]"+
    "So the greatest revenue is $"+M+", after "+xs+" increases, not "+xc+". The manager divided by the coefficient of \\(x^2\\) only once instead of twice (using \\(x = "+xc+"\\)); at that point the revenue has already fallen back to $"+Mc+", the same as with no increase at all. (Revenue values check: \\(R("+x2+") = "+Rv(x2)+"\\), also less than $"+M+".)",
    {ctx:ctx.n, a:a, xs:xs, xc:xc});
  qe.figure=parSVG(-a,b,c,{xLab:"x",yLab:"R(x)",aria:"Revenue parabola"});
  return qe;
});

/* ============ Prior knowledge tranche (Nov 15, 2026) ============ */
/* Borrowed verbatim from the feeder banks named in the source
   comments and the PKT table below, plus authored micro-items
   where the prior knowledge map names a skill no feeder entry
   assesses. Spec: Math-2200-PK-Tranche-Spec-2026-11-15.md. */

/* u2-pk-graph-data: borrowed verbatim from math-1201 entry u4-graph-data (math-1201:4.9). */
E("u2-pk-graph-data",2,["4.41"],1,"gen",function(){
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

/* u2-pk-domain-range: borrowed verbatim from math-1201 entry u4-domain-range (math-1201:4.10). */
E("u2-pk-domain-range",2,["4.28"],1,"gen",function(){
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

/* u2-pk-dr-linear: borrowed verbatim from math-1201 entry u4-dr-linear (math-1201:4.12). */
E("u2-pk-dr-linear",2,["4.28"],1,"gen",function(){
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

/* u2-pk-intercepts: borrowed verbatim from math-1201 entry u4-intercepts (math-1201:4.28). */
E("u2-pk-intercepts",2,["4.41"],1,"gen",function(){
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

/* u2-pk-intercepts-solve: borrowed verbatim from math-1201 entry u4-intercepts-solve (math-1201:4.28). */
E("u2-pk-intercepts-solve",2,["4.41"],2,"gen",function(){
  var askX=true;
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

/* u2-pk-eval-function: borrowed verbatim from math-1201 entry u4-eval-function (math-1201:4.47). */
E("u2-pk-eval-function",2,["4.41"],1,"gen",function(){
  var fn=pick(["f","g","h"]);
  var m=pick([-4,-3,-2,-1,1,2,3,4,5]),b=ri(-9,10),x0=ri(-5,8);
  var ans=m*x0+b;
  return numq("A linear function is given by \\("+fn+"(x) = "+u4lin(m,b)+"\\). What is the value of \\("+fn+"("+x0+")\\)?",
    ans,0.011,
    "Substitute the given domain value into the function and simplify: \\[ \\begin{aligned} "+fn+"("+x0+") &= "+u4num(m)+"("+x0+") + ("+b+") \\\\ &= "+u4num(m*x0)+" + ("+b+") \\\\ &= "+ans+" \\end{aligned} \\] The value is <b>\\("+ans+"\\)</b>.",
    {fn:fn,m:m,b:b,x0:x0,ans:ans});
});

/* u2-pk-factor-monic: borrowed verbatim from math-1201 entry u3-factor-monic (math-1201:3.12). */
E("u2-pk-factor-monic",2,["4.41"], 2, "gen", function () {
  var v = pick(["x", "y"]);
  var r = u3Nz(-9, 9), s = u3Nz(-9, 9), guard = 0;
  while (r === s && guard < 40) { guard++; s = u3Nz(-9, 9); }
  var B = r + s, C = r * s;
  var poly = u3PC([1, B, C], v);
  var facs = [[1, Math.min(r, s)], [1, Math.max(r, s)]];
  var ans = Math.max(r, s);
  var prompt = "When the trinomial \\(" + poly + "\\) is factored as a product of two binomials, the two constant terms are two numbers. What is the larger of those two numbers?";
  var sol = "Find two numbers that multiply to \\(" + C + "\\) and add to \\(" + B + "\\): the numbers are \\(" + Math.min(r, s) + "\\) and \\(" + Math.max(r, s) + "\\)." +
    u3Alg([poly + " &= " + u3FacRaw("", facs, v)]) +
    "The larger of the two constant terms is **" + ans + "**.";
  return numq(prompt, ans, 0.01, sol, { t: "pair", r: r, s: s, B: B, C: C });
});

/* u2-pk-binom-expand: borrowed verbatim from math-1201 entry u3-binom-tri-expand (math-1201:3.4). */
E("u2-pk-binom-expand",2,["4.43"], 2, "gen", function () {
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

/* PK tranche pass for Unit 2. pkFor is the cluster's dependent
   indicator list from the prior knowledge map, as registered
   for this unit in courses.js. */
var PKT_U2_FOR=["4.27","4.28","4.29","4.30","4.31","4.32","4.37","4.38","4.39","4.40","4.41","4.42","4.43","4.44","4.45","4.46","4.47"];
var PKT_U2={
 "u2-pk-graph-data":{src:"math-1201:4.9",group:"graphing-data"},
 "u2-pk-domain-range":{src:"math-1201:4.10",group:"domain-range"},
 "u2-pk-dr-linear":{src:"math-1201:4.12",group:"domain-range"},
 "u2-pk-intercepts":{src:"math-1201:4.28",group:"intercepts"},
 "u2-pk-intercepts-solve":{src:"math-1201:4.28",group:"intercepts"},
 "u2-pk-eval-function":{src:"math-1201:4.47",group:"substitution"},
 "u2-pk-factor-monic":{src:"math-1201:3.12",group:"factoring"},
 "u2-pk-binom-expand":{src:"math-1201:3.4",group:"polynomial-multiply"}
};
BANK.forEach(function(e){var t=PKT_U2[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U2_FOR.slice();e.pkGroup=t.group;}});

/* ----- bank-u3.js ----- */
// Math 2200 Unit 3 Quadratic Equations question bank
// Graphics pass Tranche 2 (November 12, 2026): figures attached
// attach-only from the builders ported into bank-helpers.js;
// u3-discriminant-nature gained a graphed read-off second arm
// under the Tranche 1b ruling (its original generator sits
// verbatim as arm 1). The frame context of u3-problem-model
// carries no figure: the border builder's labels are in metres
// and that context is in centimetres.
// CRMARKS: u3-derive-apply=3
// CRMARKS: u3-derive-cts-number=1
// CRMARKS: u3-derive-first-step=2
// CRMARKS: u3-derive-formula=4
// CRMARKS: u3-derive-late-steps=3
// CRMARKS: u3-discriminant-compute=1
// CRMARKS: u3-discriminant-k=3
// CRMARKS: u3-discriminant-param=3
// CRMARKS: u3-discriminant-range=2
// CRMARKS: u3-error-expand=2
// CRMARKS: u3-factor-common=1
// CRMARKS: u3-factor-completely=2
// CRMARKS: u3-factor-func-diff=2
// CRMARKS: u3-factor-negative=2
// CRMARKS: u3-factor-pst=2
// CRMARKS: u3-factor-test=2
// CRMARKS: u3-factor-test-evaluate=1
// CRMARKS: u3-factor-test-find-k=2
// CRMARKS: u3-factor-test-remainder=2
// CRMARKS: u3-factor-trinomial=2
// CRMARKS: u3-factor-trinomial-nonmonic=2
// CRMARKS: u3-factor-trinomial-two-var=2
// CRMARKS: u3-factor-two-var=2
// CRMARKS: u3-func-diff-completely=3
// CRMARKS: u3-func-diff-expand=1
// CRMARKS: u3-func-diff-functions=2
// CRMARKS: u3-func-diff-quad-inner=2
// CRMARKS: u3-func-diff-simple=2
// CRMARKS: u3-intercepts-find-a=3
// CRMARKS: u3-method-choice=3
// CRMARKS: u3-method-verify-check=2
// CRMARKS: u3-problem-model=3
// CRMARKS: u3-problem-path=3
// CRMARKS: u3-problem-projectile-height=3
// CRMARKS: u3-problem-revenue=3
// CRMARKS: u3-problem-sum-squares=3
// CRMARKS: u3-problem-triangle=3
// CRMARKS: u3-roots-from-graph=2
// CRMARKS: u3-roots-zeros=1
// CRMARKS: u3-solve-formula-radical=2
// CRMARKS: u3-solve-fraction-roots=2
// CRMARKS: u3-solve-nature-roots=2
// CRMARKS: u3-solve-strategies=2
// CRMARKS: u3-zeros-count=1
// BIMODAL: u3-solve-strategies=b
// BIMODAL: u3-solve-nature-roots=a
// BIMODAL: u3-solve-fraction-roots=a
// BIMODAL: u3-solve-formula-radical=b
// BIMODAL: u3-roots-from-graph=a
// BIMODAL: u3-method-choice=b
// BIMODAL: u3-func-diff-quad-inner=b
// BIMODAL: u3-func-diff-functions=b
// BIMODAL: u3-func-diff-completely=b
// BIMODAL: u3-factor-two-var=b
// BIMODAL: u3-factor-trinomial-two-var=b
// BIMODAL: u3-factor-trinomial-nonmonic=b
// BIMODAL: u3-factor-pst=b
// BIMODAL: u3-factor-negative=b
// BIMODAL: u3-factor-func-diff=b
// BIMODAL: u3-factor-completely=b
// BIMODAL: u3-discriminant-range=b
// BIMODAL: u3-derive-late-steps=b
// BIMODAL: u3-derive-formula=b
// BIMODAL: u3-derive-apply=b
/* ================= Unit 3: Quadratic Equations ================= */
/* ================= Unit 3: Quadratic Equations (MA2200.3.14 to 3.17, 4.9 to 4.15) =================
   Tranche 1, mid scope. All stems, contexts and values are original.
   Helpers are prefixed u3; entries register through E(...). */

/* ---------- u3 helpers ---------- */
function u3Gcd(a,b){ a=Math.abs(a); b=Math.abs(b); while(b){ var t=a%b; a=b; b=t; } return a||1; }
function u3PolyS(cf){ /* coefficients, highest degree first, to a polynomial string in x */
  var out="", first=true, n=cf.length-1, i, c, p, term;
  for(i=0;i<cf.length;i++){ c=cf[i]; p=n-i; if(c===0) continue;
    if(p===0) term=""+Math.abs(c);
    else { var base=(p===1?"x":"x^"+p); term=(Math.abs(c)===1?base:Math.abs(c)+base); }
    if(first){ out=(c<0?"-":"")+term; first=false; }
    else out+=(c<0?" - ":" + ")+term;
  }
  return out===""?"0":out;
}
function u3QuadS(a,b,c){ return u3PolyS([a,b,c]); }
function u3FacS(r){ /* factor (x - r) as a string, for a root r */
  if(r===0) return "x";
  return r>0?"(x - "+r+")":"(x + "+(-r)+")";
}
function u3FacLinS(p,q){ /* factor (px + q) as a string, p >= 1 */
  if(q===0) return p===1?"x":"("+p+"x)";
  var lead=(p===1?"x":p+"x");
  return "("+lead+(q>0?" + "+q:" - "+(-q))+")";
}
function u3TwoFac(s1,s2){ /* two factor strings concatenated in a fixed (alphabetical) order */
  return s1<=s2 ? s1+s2 : s2+s1;
}
function u3BinS(r){ /* binomial text for a root r: x - r, x + |r|, or x */
  if(r===0) return "x";
  return r>0?"x - "+r:"x + "+(-r);
}
function u3InnerS(coef,v,k){ /* inner linear expression: coef*v + k, coef >= 1 */
  var s=(coef===1?v:coef+v);
  if(k>0) s+=" + "+k; else if(k<0) s+=" - "+(-k);
  return s;
}
function u3FracS(num,den){ /* reduced fraction as LaTeX content (no delimiters); den != 0 */
  if(den<0){ num=-num; den=-den; }
  var g=u3Gcd(num,den); num/=g; den/=g;
  if(den===1) return ""+num;
  return (num<0?"-":"")+"\\frac{"+Math.abs(num)+"}{"+den+"}";
}
function u3RadParts(n){ /* n = c^2 * m with m squarefree; returns [c, m] */
  var c=1, m=n, i;
  for(i=2;i*i<=m;i++){ while(m%(i*i)===0){ m/=(i*i); c*=i; } }
  return [c,m];
}
function u3PairNum(a,b){ /* solution-set option for two integer roots, ascending */
  var lo=Math.min(a,b), hi=Math.max(a,b);
  return "\\(x = "+lo+" \\text{ or } x = "+hi+"\\)";
}
function u3Opts(key,cands){ /* first 3 candidate strings distinct from the key and each other */
  var out=[], seen={}; seen[key]=1;
  for(var i=0;i<cands.length;i++){ var s=String(cands[i]);
    if(!seen[s]){ seen[s]=1; out.push(s); if(out.length===3) break; } }
  return out;
}
function u3SignCands(r1,r2){ /* distractor solution-set options for integer roots r1, r2 */
  return [ u3PairNum(-r1,-r2), u3PairNum(-r1,r2), u3PairNum(r1,-r2),
           u3PairNum(r1+r2, r1*r2), u3PairNum(r1-1, r2), u3PairNum(r1, r2+1),
           u3PairNum(r1+1, r2), u3PairNum(r1, r2-1), u3PairNum(r2-r1, r1+r2),
           u3PairNum(r1-1, r2+1), u3PairNum(r1-2, r2), u3PairNum(r1, r2+2) ];
}

/* ---------- 3.14: factor out a common factor (L1) ---------- */
E("u3-factor-common",3,["3.14"],1,"gen",function(){
  var att=0, d, k, A2, A1, A0, inside, origP;
  while(att<300){
    att++;
    d=ri(2,9); k=ri(1,2);
    A2=pick([0,1,2,3,-2,-3]); A1=ri(-9,9);
    A0=pick([-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9]);
    var nz=(A2!==0?1:0)+(A1!==0?1:0)+1;
    if(nz<2) continue;
    if(u3Gcd(u3Gcd(A2,A1),A0)!==1) continue;
    if(A2!==0){ var disc=A1*A1-4*A2*A0, dsq=Math.sqrt(disc); if(disc>=0&&dsq===Math.floor(dsq)) continue; }
    break;
  }
  inside={0:A0,1:A1,2:A2};
  origP={}; Object.keys(inside).forEach(function(p){ origP[Number(p)+k]=d*inside[p]; });
  function polyPS(P){ var ps=Object.keys(P).map(Number).sort(function(x,y){return y-x;});
    var cf=ps.map(function(p){ return P[p]; });
    /* rebuild with explicit degree so zero gaps are kept */
    var top=ps[0], arr=[], i;
    for(i=top;i>=0;i--) arr.push(P[i]||0);
    return u3PolyS(arr);
  }
  var gcfS=d+"x"+(k>1?"^"+k:"");
  var insideS=polyPS(inside);
  var key=gcfS+"("+insideS+")";
  var shifted={}; Object.keys(inside).forEach(function(p){ shifted[Number(p)+k]=inside[p]; });
  var scaled={}; Object.keys(inside).forEach(function(p){ scaled[p]=d*inside[p]; });
  var midFlip={0:A0,1:-A1,2:A2}, constFlip={0:-A0,1:A1,2:A2}, noConst={1:A1,2:A2};
  var cands=[ d+"("+polyPS(shifted)+")",
              gcfS+"("+polyPS(midFlip)+")",
              gcfS+"("+polyPS(constFlip)+")",
              "x^"+k+"("+polyPS(scaled)+")".replace("x^1","x"),
              (d+1)+"x"+(k>1?"^"+k:"")+"("+insideS+")" ];
  if(A1===0) cands.splice(1,1);
  return mcq("Factor completely: \\("+polyPS(origP)+"\\)",
    "\\("+key+"\\)",
    u3Opts("\\("+key+"\\)", cands.map(function(s){ return "\\("+s+"\\)"; })),
    "Every term of \\("+polyPS(origP)+"\\) is divisible by \\("+gcfS+"\\), and the remaining factor \\("+insideS+"\\) has no factor common to all of its terms:"+
    "\\[ "+polyPS(origP)+" = "+key+" \\]"+
    "So the complete factorization is <b>\\("+key+"\\)</b>.",
    {d:d, k:k});
});

/* ---------- 4.9: roots, zeros and x-intercepts are the same numbers (L1) ---------- */
E("u3-roots-zeros",3,["4.9"],1,"gen",function(){
  var mode=pick(["given","intercepts","factored","factored","statement"]);
  if(mode==="statement"){
    return mcq("For a quadratic function \\(f\\) and the corresponding equation \\(f(x) = 0\\), which statement is correct?",
      "The roots of the equation are exactly the zeros of the function, and both are the x-coordinates of the x-intercepts of the graph",
      ["The roots of the equation are exactly the zeros of the function, and both are the y-coordinates of the y-intercept of the graph",
       "The zeros of the function are the x-coordinates of the x-intercepts, and the roots of the equation are the coordinates of the vertex",
       "The zeros of the function occur where the graph crosses the y-axis, and the roots are the values of the function at those points"],
      "The three terms name the same numbers from three points of view. Solving \\(f(x) = 0\\) gives the <b>roots</b> of the equation; those input values are the <b>zeros</b> of the function; and on the graph they appear as the x-coordinates of the <b>x-intercepts</b>, the points where the graph crosses the x-axis.",
      {mode:mode});
  }
  var r1=0, r2=0, att=0;
  while(att<200){ att++; r1=ri(-6,6); r2=ri(-6,6);
    if(r1!==0 && r2!==0 && r1!==r2 && r1+r2!==0) break; }
  var lo=Math.min(r1,r2), hi=Math.max(r1,r2);
  var a=pick([1,2,3]), b=-a*(r1+r2), c=a*r1*r2, Q=u3QuadS(a,b,c);
  function andPair(x,y){ return "\\(x = "+x+"\\) and \\(x = "+y+"\\)"; }
  function andPairN(x,y){ return andPair(Math.min(x,y), Math.max(x,y)); }
  if(mode==="given"){
    var key=andPairN(lo,hi);
    var cands=[andPairN(-lo,-hi), andPairN(-lo,hi), andPairN(lo,-hi), andPairN(lo+hi, lo*hi)];
    var qz=mcq("The equation \\("+Q+" = 0\\) has solutions \\(x = "+lo+"\\) and \\(x = "+hi+"\\). What are the <b>zeros</b> of the function \\(f(x) = "+Q+"\\)?",
      key, u3Opts(key,cands),
      "The zeros of a function are the input values that make the output zero, so they are exactly the solutions of the equation \\(f(x) = 0\\). The zeros are <b>\\(x = "+lo+"\\)</b> and <b>\\(x = "+hi+"\\)</b>.",
      {mode:mode, a:a});
    qz.figure=parSVG(a,b,c,{marks:[{x:lo,y:0},{x:hi,y:0}]});
    return qz;
  }
  if(mode==="intercepts"){
    var key2=andPairN(lo,hi);
    var cands2=[andPairN(-lo,-hi), andPairN(-lo,hi), andPairN(lo,-hi), andPairN(lo+hi, lo*hi)];
    var qz=mcq("The graph of the function \\(f(x) = "+Q+"\\) crosses the x-axis at \\(("+lo+", 0)\\) and \\(("+hi+", 0)\\). What are the <b>solutions</b> of the equation \\("+Q+" = 0\\)?",
      key2, u3Opts(key2,cands2),
      "An x-intercept is a point where the function value is zero, so its x-coordinate is a solution of \\(f(x) = 0\\). The solutions are <b>\\(x = "+lo+"\\)</b> and <b>\\(x = "+hi+"\\)</b>.",
      {mode:mode, a:a});
    qz.figure=parSVG(a,b,c,{marks:[{x:lo,y:0},{x:hi,y:0}]});
    return qz;
  }
  /* factored */
  var fS="\\(f(x) = "+(a===1?"":a)+u3FacS(r1)+u3FacS(r2)+"\\)";
  function ptPair(x,y){ return "\\(("+x+", 0)\\) and \\(("+y+", 0)\\)"; }
  function ptPairN(x,y){ return ptPair(Math.min(x,y), Math.max(x,y)); }
  var key3=ptPairN(lo,hi);
  var cands3=[ptPairN(-lo,-hi), ptPairN(-lo,hi), ptPairN(lo,-hi),
              "\\((0, "+lo+")\\) and \\((0, "+hi+")\\)"];
  var qz=mcq("Given "+fS+", what are the <b>x-intercepts</b> of the graph of \\(f\\)?",
    key3, u3Opts(key3,cands3),
    "The product "+(a===1?"":a)+u3FacS(r1)+u3FacS(r2)+" is zero when one of its factors is zero: \\("+u3BinS(r1)+" = 0\\) gives \\(x = "+r1+"\\), and \\("+u3BinS(r2)+" = 0\\) gives \\(x = "+r2+"\\). So the graph crosses the x-axis at <b>\\(("+lo+", 0)\\)</b> and <b>\\(("+hi+", 0)\\)</b>.",
    {mode:mode, a:a});
  qz.figure=parSVG(a,b,c,{marks:[{x:lo,y:0},{x:hi,y:0}]});
  return qz;
});

/* ---------- 3.15: factor trinomials and differences of squares (L1; the non-monic family was split out as u3-factor-trinomial-nonmonic under ruling 8, Nov 13, 2026) ---------- */
E("u3-factor-trinomial",3,["3.15"],1,"gen",function(){
  var fam=pick(["monic","diffsq"]);
  if(fam==="monic"){
    var r1=ri(-9,9), r2=ri(-9,9), att=0;
    while(att<200 && (r1===0 || r2===0)){ att++; r1=ri(-9,9); r2=ri(-9,9); }
    var b=-(r1+r2), c=r1*r2;
    var key=u3TwoFac(u3FacS(r1), u3FacS(r2));
    function expM(x,y){ return [1, -(x+y), x*y]; }
    var candRoots=[[-r1,r2],[r1,-r2],[-r1,-r2],[r1+1,r2-1],[r1-1,r2+1],[r1+2,r2],[r1,r2+2]];
    var cands=[];
    candRoots.forEach(function(pr){ var e=expM(pr[0],pr[1]);
      if(e[1]!==b || e[2]!==c) cands.push(u3TwoFac(u3FacS(pr[0]), u3FacS(pr[1]))); });
    return mcq("Factor: \\("+u3QuadS(1,b,c)+"\\)",
      "\\("+key+"\\)", u3Opts("\\("+key+"\\)", cands.map(function(s){ return "\\("+s+"\\)"; })),
      "Look for two numbers with product \\("+c+"\\) and sum \\("+b+"\\): the numbers are \\("+(-r1)+"\\) and \\("+(-r2)+"\\), since \\(("+(-r1)+") \\times ("+(-r2)+") = "+c+"\\) and \\(("+(-r1)+") + ("+(-r2)+") = "+b+"\\)."+
      "\\[ "+u3QuadS(1,b,c)+" = "+key+" \\]"+
      "So the factorization is <b>\\("+key+"\\)</b>.",
      {fam:fam});
  }
  /* difference of squares */
  var A=ri(2,9), B=ri(2,9), twoVar=Math.random()<0.5;
  var stemExpr, key3, cands3;
  if(twoVar){
    stemExpr=(A*A)+"x^2 - "+(B*B)+"y^2";
    key3="("+A+"x - "+B+"y)("+A+"x + "+B+"y)";
    cands3=[ "("+A+"x - "+B+"y)("+A+"x - "+B+"y)",
             "("+A+"x + "+B+"y)("+A+"x + "+B+"y)",
             "("+(A*A)+"x - "+(B*B)+"y)("+(A*A)+"x + "+(B*B)+"y)",
             "("+A+"x - "+(B*B)+"y)("+A+"x + "+(B*B)+"y)" ];
  } else {
    stemExpr=(A*A)+"x^2 - "+(B*B);
    key3="("+A+"x - "+B+")("+A+"x + "+B+")";
    cands3=[ "("+A+"x - "+B+")("+A+"x - "+B+")",
             "("+A+"x + "+B+")("+A+"x + "+B+")",
             "("+(A*A)+"x - "+(B*B)+")("+(A*A)+"x + "+(B*B)+")",
             "("+A+"x - "+(B*B)+")("+A+"x + "+(B*B)+")" ];
  }
  return mcq("Factor: \\("+stemExpr+"\\)",
    "\\("+key3+"\\)", u3Opts("\\("+key3+"\\)", cands3.map(function(s3){ return "\\("+s3+"\\)"; })),
    "Each term is a perfect square: \\("+(A*A)+(twoVar?"x^2":"x^2")+" = ("+A+(twoVar?"x":"x")+")^2\\) and \\("+(B*B)+(twoVar?"y^2":"")+" = ("+B+(twoVar?"y":"")+")^2\\). A difference of squares factors as \\(u^2 - v^2 = (u - v)(u + v)\\):"+
    "\\[ "+stemExpr+" = "+key3+" \\]"+
    "So the factorization is <b>\\("+key3+"\\)</b>.",
    {fam:fam});
});

/* ---------- 3.15: factor non-monic trinomials (L2; split from u3-factor-trinomial under ruling 8, Nov 13, 2026) ---------- */
E("u3-factor-trinomial-nonmonic",3,["3.15"],2,"gen",function(){
  var fam="nonmonic";
    var att2=0, p,q,r,s,a2,b2,c2,key2;
    while(att2<300){
      att2++;
      p=pick([1,2,3]); r=pick([1,2,3]); q=ri(-6,6); s=ri(-6,6);
      if(q===0 || s===0) continue;
      a2=p*r; b2=p*s+q*r; c2=q*s;
      if(a2<2) continue;
      key2=u3TwoFac(u3FacLinS(p,q), u3FacLinS(r,s));
      break;
    }
    function expN(p1,q1,p2,q2){ return [p1*p2, p1*q2+q1*p2, q1*q2]; }
    var specs=[[p,-q,r,s],[p,q,r,-s],[p,-q,r,-s],[p,s,r,q],[r,q,p,s],[p,q+1,r,s],[p,q,r,s+1]];
    var cands2=[];
    specs.forEach(function(sp){ var e=expN(sp[0],sp[1],sp[2],sp[3]);
      if(e[0]!==a2 || e[1]!==b2 || e[2]!==c2)
        cands2.push(u3TwoFac(u3FacLinS(sp[0],sp[1]), u3FacLinS(sp[2],sp[3]))); });
    function xTerm(co){ if(co===0) return ""; var t=(Math.abs(co)===1?"x":Math.abs(co)+"x"); return (co<0?" - ":" + ")+t; }
    function cTerm(co){ if(co===0) return ""; return (co<0?" - "+(-co):" + "+co); }
    var expLine=a2+"x^2"+xTerm(p*s)+xTerm(q*r)+cTerm(q*s);
    return mcq("Factor: \\("+u3QuadS(a2,b2,c2)+"\\)",
      "\\("+key2+"\\)", u3Opts("\\("+key2+"\\)", cands2.map(function(s2){ return "\\("+s2+"\\)"; })),
      "The factor pair "+key2+" can be checked by expanding:"+
      "\\[ \\begin{aligned} "+key2+" &= "+expLine+" \\\\ &= "+u3QuadS(a2,b2,c2)+" \\end{aligned} \\]"+
      "which matches the given trinomial, so the factorization is <b>\\("+key2+"\\)</b>.",
      {fam:fam});
});

/* ---------- 3.16: is a binomial a factor? Use the factor theorem (L2) ---------- */
E("u3-factor-test",3,["3.16"],1,"gen",function(){
  var isFac=Math.random()<0.5;
  var k=ri(-6,6); if(k===0) k=3;
  var al=pick([1,2,3]), be=ri(-6,6);
  /* base = (x - k)(al x + be); P(k) = r0 */
  var a=al, b=be-al*k, c=-be*k;
  var r0=0;
  if(!isFac){ r0=pick([-5,-4,-3,-2,-1,1,2,3,4,5]); c+=r0; }
  var P=u3QuadS(a,b,c), val=a*k*k+b*k+c;
  var wk1=pick([1,2,3,4,6]), wk2=pick([-6,-4,-3,-2,-1,1,2,3,4,6]);
  if(wk2===val || wk2===0) wk2=val+3;
  var key, cands;
  if(isFac){
    key="Yes, because \\(P("+k+") = 0\\)";
    cands=["No, because \\(P("+k+") = 0\\)",
           "Yes, because \\(P("+k+") = "+wk1+"\\)",
           "No, because \\(P("+k+") = "+wk2+"\\)"];
  } else {
    key="No, because \\(P("+k+") = "+val+"\\)";
    cands=["Yes, because \\(P("+k+") = 0\\)",
           "Yes, because \\(P("+k+") = "+val+"\\)",
           "No, because \\(P("+k+") = "+wk2+"\\)"];
  }
  return mcq("Let \\(P(x) = "+P+"\\). Is \\("+u3BinS(k)+"\\) a factor of \\(P(x)\\)?",
    key, cands,
    "By the factor theorem, \\("+u3BinS(k)+"\\) is a factor of \\(P(x)\\) exactly when \\(P("+k+") = 0\\). Evaluate:"+
    "\\[ \\begin{aligned} P("+k+") &= "+a+"("+k+")^2 "+(b<0?"- "+(-b):"+ "+b)+"("+k+") "+(c<0?"- "+(-c):"+ "+c)+" \\\\ &= "+val+" \\end{aligned} \\]"+
    (isFac ? "Since \\(P("+k+") = 0\\), the remainder on division by \\("+u3BinS(k)+"\\) is zero, so <b>yes</b>, \\("+u3BinS(k)+"\\) is a factor."
           : "Since \\(P("+k+") = "+val+" \\ne 0\\), division by \\("+u3BinS(k)+"\\) leaves a remainder of \\("+val+"\\), so <b>no</b>, \\("+u3BinS(k)+"\\) is not a factor."),
    {k:k, val:val});
});

/* ---------- 3.17: factor a difference of squares with function expressions (L2) ---------- */
E("u3-factor-func-diff",3,["3.17"],2,"gen",function(){
  var fam=pick(["xy","xx","mix"]);
  var A=ri(2,9), B=ri(2,9), p=ri(-5,5), q=ri(-5,5);
  if(fam==="xx" && p===q) q=q+2;
  var innerX, innerY;
  if(fam==="xy"){ innerX=u3InnerS(1,"x",p); innerY=u3InnerS(1,"y",q); }
  else if(fam==="xx"){ innerX=u3InnerS(1,"x",p); innerY=u3InnerS(1,"x",q); }
  else { innerX=u3InnerS(2,"x",p); innerY=u3InnerS(1,"y",q); }
  var bigX=A+"("+innerX+")", bigY=B+"("+innerY+")";
  var stemExpr=(A*A)+"("+innerX+")^2 - "+(B*B)+"("+innerY+")^2";
  var key="("+bigX+" - "+bigY+")("+bigX+" + "+bigY+")";
  var bigX2=(A*A)+"("+innerX+")", bigY2=(B*B)+"("+innerY+")";
  var cands=[ "("+bigX+" - "+bigY+")("+bigX+" - "+bigY+")",
              "("+bigX+" + "+bigY+")("+bigX+" + "+bigY+")",
              "("+bigX2+" - "+bigY2+")("+bigX2+" + "+bigY2+")",
              "("+bigX+" - "+bigY2+")("+bigX+" + "+bigY2+")" ];
  return mcq("Factor: \\("+stemExpr+"\\)",
    "\\("+key+"\\)", u3Opts("\\("+key+"\\)", cands.map(function(s){ return "\\("+s+"\\)"; })),
    "The expression is a difference of squares, \\(\\left("+bigX+"\\right)^2 - \\left("+bigY+"\\right)^2\\), where the two squared parts are \\("+bigX+"\\) and \\("+bigY+"\\). Using \\(u^2 - v^2 = (u - v)(u + v)\\):"+
    "\\[ "+stemExpr+" = "+key+" \\]"+
    "So the factorization is <b>\\("+key+"\\)</b>.",
    {fam:fam});
});

/* ---------- 4.10: solve a quadratic equation (L2) ---------- */
E("u3-solve-strategies",3,["4.10"],2,"gen",function(){
  var fam=pick(["sqroot","sqroot","factor","formula","cts"]);
  if(fam==="sqroot"){
    var h=ri(-6,6); if(h===0) h=4;
    var radical=Math.random()<0.45, K, s, rp;
    if(radical){ var mm=pick([2,3,5,6,7]); s=pick([1,2]); K=s*s*mm; rp=[s,mm]; }
    else { s=ri(2,7); K=s*s; rp=[s,1]; }
    var inner=u3InnerS(1,"x",-h);
    var eqStr="("+inner+")^2 = "+K;
    function radRoot(sign){ /* h + sign * s*sqrt(mm) as a string */
      var coef=rp[0], mm2=rp[1];
      if(mm2===1) return ""+(h+sign*coef);
      var term=(coef===1?"\\sqrt{"+mm2+"}":coef+"\\sqrt{"+mm2+"}");
      if(h===0) return (sign<0?"-":"")+term;
      return h+(sign<0?" - ":" + ")+term;
    }
    var loS=radRoot(-1), hiS=radRoot(1);
    var key="\\(x = "+loS+" \\text{ or } x = "+hiS+"\\)";
    function radRootH(hh, sign){
      var coef=rp[0], mm2=rp[1];
      if(mm2===1) return ""+(hh+sign*coef);
      var term=(coef===1?"\\sqrt{"+mm2+"}":coef+"\\sqrt{"+mm2+"}");
      if(hh===0) return (sign<0?"-":"")+term;
      return hh+(sign<0?" - ":" + ")+term;
    }
    var cands=[ "\\(x = "+radRootH(-h,-1)+" \\text{ or } x = "+radRootH(-h,1)+"\\)",
                "\\(x = "+radRootH(0,-1)+" \\text{ or } x = "+radRootH(0,1)+"\\)" ];
    if(rp[1]===1) cands.push("\\(x = "+(h-s*s)+" \\text{ or } x = "+(h+s*s)+"\\)");
    else if(rp[0]===1) cands.push("\\(x = "+h+" - 2\\sqrt{"+rp[1]+"} \\text{ or } x = "+h+" + 2\\sqrt{"+rp[1]+"}\\)");
    else cands.push("\\(x = "+h+" - "+(rp[0]*rp[1])+"\\sqrt{"+rp[0]+"} \\text{ or } x = "+h+" + "+(rp[0]*rp[1])+"\\sqrt{"+rp[0]+"}\\)");
    var sqrtK=(rp[1]===1? ""+rp[0] : (rp[0]===1?"\\sqrt{"+rp[1]+"}":rp[0]+"\\sqrt{"+rp[1]+"}"));
    return mcq("Solve: \\("+eqStr+"\\)",
      key, u3Opts(key,cands),
      "Take the square root of both sides, keeping both the positive and negative roots:"+
      "\\[ \\begin{aligned} ("+inner+")^2 &= "+K+" \\\\ "+inner+" &= \\pm "+sqrtK+" \\\\ x &= "+h+" \\pm "+sqrtK+" \\end{aligned} \\]"+
      "So the solutions are <b>\\(x = "+loS+"\\)</b> and <b>\\(x = "+hiS+"\\)</b>.",
      {fam:fam});
  }
  if(fam==="factor" || fam==="formula"){
    var a2=(fam==="factor") ? pick([1,2]) : pick([2,3,4]);
    var r1=ri(-8,8), r2=ri(-8,8), att=0;
    while(att<200 && r1===r2){ att++; r2=ri(-8,8); }
    var b2=-a2*(r1+r2), c2=a2*r1*r2, Q=u3QuadS(a2,b2,c2);
    var key2=u3PairNum(r1,r2);
    var sol;
    if(fam==="factor"){
      sol="Factor the left side and set each factor equal to zero:"+
        "\\[ \\begin{aligned} "+Q+" &= 0 \\\\ "+(a2===1?"":a2)+u3FacS(r1)+u3FacS(r2)+" &= 0 \\end{aligned} \\]"+
        "So \\("+u3BinS(r1)+" = 0\\) or \\("+u3BinS(r2)+" = 0\\), giving <b>\\(x = "+r1+"\\)</b> or <b>\\(x = "+r2+"\\)</b>.";
    } else {
      var D=b2*b2-4*a2*c2, sD=Math.round(Math.sqrt(D));
      sol="Apply the quadratic formula with \\(a = "+a2+"\\), \\(b = "+b2+"\\) and \\(c = "+c2+"\\):"+
        "\\[ \\begin{aligned} x &= \\frac{-("+b2+") \\pm \\sqrt{("+b2+")^2 - 4("+a2+")("+c2+")}}{2("+a2+")} \\\\ &= \\frac{"+(-b2)+" \\pm "+sD+"}{"+(2*a2)+"} \\end{aligned} \\]"+
        "So the solutions are <b>\\(x = "+r1+"\\)</b> and <b>\\(x = "+r2+"\\)</b>.";
    }
    return mcq("Solve: \\("+Q+" = 0\\)",
      key2, u3Opts(key2, u3SignCands(r1,r2)), sol, {fam:fam});
  }
  /* completing the square, presented in the solution */
  var t1=ri(-8,8), t2=ri(-8,8), att3=0;
  while(att3<300){ att3++; t1=ri(-8,8); t2=ri(-8,8);
    if(t1!==t2 && ((t1+t2)%2===0)) break; }
  var B=-(t1+t2), C=t1*t2, m=B/2, s2=Math.abs(t2-t1)/2;
  var key3=u3PairNum(t1,t2);
  return mcq("Solve: \\("+u3QuadS(1,B,C)+" = 0\\)",
    key3, u3Opts(key3, u3SignCands(t1,t2)),
    "Complete the square. Move the constant, then add \\(\\left(\\frac{"+B+"}{2}\\right)^2 = "+(m*m)+"\\) to both sides:"+
    "\\[ \\begin{aligned} x^2 "+(B<0?"- "+(-B):"+ "+B)+"x &= "+(-C)+" \\\\ x^2 "+(B<0?"- "+(-B):"+ "+B)+"x + "+(m*m)+" &= "+(-C)+" + "+(m*m)+" \\\\ (x "+(m<0?"- "+(-m):"+ "+m)+")^2 &= "+(s2*s2)+" \\\\ x "+(m<0?"- "+(-m):"+ "+m)+" &= \\pm "+s2+" \\end{aligned} \\]"+
    "So the solutions are <b>\\(x = "+t1+"\\)</b> and <b>\\(x = "+t2+"\\)</b>.",
    {fam:fam});
});

/* ---------- 4.14: discriminant and the nature of the roots (L2) ---------- */
E("u3-discriminant-nature",3,["4.14"],2,"var",varset([
  function(){
  var N={two:"two distinct real roots", rep:"one repeated real root", none:"no real roots"};
  var G={two:"crosses the x-axis at two points", rep:"touches the x-axis at exactly one point", none:"does not cross the x-axis"};
  if(Math.random()<0.3){
    var facts=[ ["The graph of a quadratic function crosses the x-axis at two points","two"],
                ["The graph of a quadratic function touches the x-axis at exactly one point","rep"],
                ["The graph of a quadratic function does not cross the x-axis","none"],
                ["A quadratic equation has two distinct real roots","two"],
                ["A quadratic equation has no real roots","none"],
                ["A quadratic equation has one repeated real root","rep"] ];
    var f=pick(facts), ck=f[1];
    var keyS="\\(b^2 - 4ac "+(ck==="two"?">":ck==="rep"?"=":"<")+" 0\\)";
    var others=[">","=","<"].filter(function(sy){ return sy!==(ck==="two"?">":ck==="rep"?"=":"<"); });
    var cands=["\\(b^2 - 4ac "+others[0]+" 0\\)", "\\(b^2 - 4ac "+others[1]+" 0\\)",
               "It cannot be determined from this information"];
    return mcq(f[0]+". What is the sign of the discriminant \\(b^2 - 4ac\\) of the corresponding equation?",
      keyS, cands,
      "The discriminant determines the number of real roots: positive means two distinct real roots and two x-intercepts, zero means one repeated root and one touching point, and negative means no real roots and no x-intercepts. Here the discriminant is <b>"+(ck==="two"?"positive":ck==="rep"?"zero":"negative")+"</b>, so <b>"+keyS.replace("\\(","").replace("\\)","")+"</b>.",
      {mode:"fact"});
  }
  var which=pick(["two-square","two-nonsquare","repeated","none"]);
  var a,b,c,D;
  if(which==="two-square"){
    a=pick([1,2]); var r1=ri(-7,7), r2=ri(-7,7), att=0;
    while(att<200 && r1===r2){ att++; r2=ri(-7,7); }
    b=-a*(r1+r2); c=a*r1*r2; D=b*b-4*a*c;
  } else if(which==="repeated"){
    a=pick([1,2,3]); var r=ri(-6,6); b=-2*a*r; c=a*r*r; D=0;
  } else {
    var att2=0;
    while(att2<500){ att2++; a=ri(1,3); b=ri(-10,10); c=ri(-10,10); D=b*b-4*a*c;
      if(which==="none" && D<0) break;
      if(which==="two-nonsquare" && D>0 && u3RadParts(D)[1]>1) break; }
  }
  var ck2=(which==="repeated")?"rep":(which==="none")?"none":"two";
  var wIdx=pick(["two","rep","none"].filter(function(x){ return x!==ck2; }));
  function stmt(n,g){ return "The equation has "+N[n]+", and the graph of the corresponding function "+G[g]; }
  var key4=stmt(ck2,ck2);
  var cands4=[stmt(ck2,wIdx), stmt(wIdx,ck2), stmt(wIdx,wIdx)];
  return mcq("For the equation \\("+u3QuadS(a,b,c)+" = 0\\), which statement is correct?",
    key4, cands4,
    "Compute the discriminant:"+
    "\\[ \\begin{aligned} b^2 - 4ac &= ("+b+")^2 - 4("+a+")("+c+") \\\\ &= "+D+" \\end{aligned} \\]"+
    (ck2==="two" ? "The discriminant is positive, so there are <b>two distinct real roots</b>, and the graph crosses the x-axis at two points."
      : ck2==="rep" ? "The discriminant is zero, so there is <b>one repeated real root</b>, and the graph touches the x-axis at exactly one point."
      : "The discriminant is negative, so there are <b>no real roots</b>, and the graph does not cross the x-axis."),
    {mode:"equation", D:D});
},
  function(){
    var kind=pick(["two","rep","none"]);var a=pick([1,2]),b,c,D;
    if(kind==="rep"){b=pick([4,6]);c=b*b/(4*a);D=0;}
    else if(kind==="two"){b=ri(3,9);c=ri(-6,3);D=b*b-4*a*c;if(D<=0){c=-5;D=b*b-4*a*c;}}
    else{b=ri(1,4);c=ri(3,9);D=b*b-4*a*c;if(D>=0){b=1;c=9;D=1-4*a*9;}}
    var NN={two:"two distinct real roots",rep:"one repeated real root",none:"no real roots"};
    var SS={two:"positive",rep:"zero",none:"negative"};
    function stmt(n){ return "The equation has "+NN[n]+", and its discriminant is "+SS[n]; }
    var key=stmt(kind);
    var others=["two","rep","none"].filter(function(x){ return x!==kind; });
    var solD=kind==="two" ? "The graph crosses the x-axis at two points, so the equation has two distinct real roots. That happens exactly when the discriminant is positive."
      : kind==="rep" ? "The graph touches the x-axis at exactly one point, so the equation has one repeated real root. That happens exactly when the discriminant is zero."
      : "The graph never reaches the x-axis, so the equation has no real roots. That happens exactly when the discriminant is negative.";
    var qfig=mcq("The graph of a quadratic function is shown. Which statement about the corresponding equation is correct?",
      key,[stmt(others[0]),stmt(others[1]),"It cannot be determined from the graph"],
      solD,
      {kind:kind,a:a,b:b,c:c,D:D});
    var mk=[];if(D>0){var sq=Math.sqrt(D);mk=[{x:(-b-sq)/(2*a),y:0},{x:(-b+sq)/(2*a),y:0}];}else if(D===0){mk=[{x:-b/(2*a),y:0}];}
    qfig.figure=parSVG(a,b,c,{labels:"values",marks:mk});
    return qfig;
  }
]));

/* ---------- 4.14: find k from a discriminant condition (L2) ---------- */
E("u3-discriminant-k",3,["4.14"],2,"gen",function(){
  var mode=pick(["constK","constK","linK","leadK","givenD"]);
  if(mode==="constK"){
    var pr=pick([[1,4],[1,6],[1,8],[1,10],[1,12],[1,-6],[1,-8],[1,-10],
                 [4,4],[4,8],[4,12],[4,16],[4,-8],[2,4],[2,8],[2,12],[2,-8]]);
    var A=pr[0], B=pr[1], kv=(B*B)/(4*A);
    return numq("The equation \\("+A+"x^2 "+(B<0?"- "+(-B):"+ "+B)+"x + k = 0\\) has exactly one repeated real root. What is the value of \\(k\\)?",
      kv, 0.001,
      "A repeated root occurs exactly when the discriminant is zero:"+
      "\\[ \\begin{aligned} b^2 - 4ac &= 0 \\\\ ("+B+")^2 - 4("+A+")k &= 0 \\\\ "+(B*B)+" &= "+(4*A)+"k \\\\ k &= "+kv+" \\end{aligned} \\]"+
      "So <b>\\(k = "+kv+"\\)</b>.",
      {mode:mode});
  }
  if(mode==="linK"){
    var m=ri(2,9), C=m*m, kv2=2*m;
    return numq("The equation \\(x^2 + kx + "+C+" = 0\\) has two equal real roots. What is the positive value of \\(k\\)?",
      kv2, 0.001,
      "Equal roots require a discriminant of zero:"+
      "\\[ \\begin{aligned} b^2 - 4ac &= 0 \\\\ k^2 - 4(1)("+C+") &= 0 \\\\ k^2 &= "+(4*C)+" \\\\ k &= \\pm "+kv2+" \\end{aligned} \\]"+
      "The positive value is <b>\\(k = "+kv2+"\\)</b>.",
      {mode:mode});
  }
  if(mode==="leadK"){
    var pr2=pick([[2,1],[4,1],[6,1],[4,4],[8,4],[12,4],[6,9],[12,9],[-6,1],[-8,4]]);
    var B2=pr2[0], C2=pr2[1], kv3=(B2*B2)/(4*C2);
    return numq("The equation \\(kx^2 "+(B2<0?"- "+(-B2):"+ "+B2)+"x + "+C2+" = 0\\) has exactly one repeated real root. What is the value of \\(k\\)?",
      kv3, 0.001,
      "Set the discriminant equal to zero:"+
      "\\[ \\begin{aligned} b^2 - 4ac &= 0 \\\\ ("+B2+")^2 - 4(k)("+C2+") &= 0 \\\\ "+(B2*B2)+" &= "+(4*C2)+"k \\\\ k &= "+kv3+" \\end{aligned} \\]"+
      "So <b>\\(k = "+kv3+"\\)</b>.",
      {mode:mode});
  }
  /* givenD: a discriminant value is given, one coefficient is missing */
  if(Math.random()<0.5){
    var B3=ri(-10,10), c0=ri(-12,12), D0=B3*B3-4*c0;
    return numq("The discriminant of \\(x^2 "+(B3<0?"- "+(-B3):"+ "+B3)+"x + c = 0\\) is "+D0+". What is the value of \\(c\\)?",
      c0, 0.001,
      "Substitute into the discriminant formula and solve for \\(c\\):"+
      "\\[ \\begin{aligned} b^2 - 4ac &= "+D0+" \\\\ ("+B3+")^2 - 4(1)c &= "+D0+" \\\\ "+(B3*B3)+" - 4c &= "+D0+" \\\\ c &= "+c0+" \\end{aligned} \\]"+
      "So <b>\\(c = "+c0+"\\)</b>.",
      {mode:mode});
  }
  var b0=ri(2,10), C3=ri(-8,12), D3=b0*b0-4*C3;
  return numq("The discriminant of \\(x^2 + bx "+(C3<0?"- "+(-C3):"+ "+C3)+" = 0\\) is "+D3+", and \\(b > 0\\). What is the value of \\(b\\)?",
    b0, 0.001,
    "Substitute into the discriminant formula and solve for \\(b\\):"+
    "\\[ \\begin{aligned} b^2 - 4ac &= "+D3+" \\\\ b^2 - 4(1)("+C3+") &= "+D3+" \\\\ b^2 &= "+(b0*b0)+" \\\\ b &= "+b0+" \\end{aligned} \\]"+
    "Taking the positive value, <b>\\(b = "+b0+"\\)</b>.",
    {mode:mode});
});

/* ---------- 4.15: model a problem with a quadratic equation and solve it (L2) ---------- */
E("u3-problem-model",3,["4.15"],2,"gen",function(){
  var ctx=pick(["rect","projectile","consecutive","frame"]);
  if(ctx==="rect"){
    var w=ri(4,15), d=ri(2,7), A=w*(w+d);
    var qp=numq("A rectangular garden is "+d+" m longer than it is wide, and its area is "+A+" m². What is the width of the garden, in metres?",
      w, 0.001,
      "Let the width be \\(w\\) metres, so the length is \\(w + "+d+"\\) metres. Area gives:"+
      "\\[ \\begin{aligned} w(w + "+d+") &= "+A+" \\\\ w^2 + "+d+"w - "+A+" &= 0 \\\\ (w - "+w+")(w + "+(w+d)+") &= 0 \\end{aligned} \\]"+
      "So \\(w = "+w+"\\) or \\(w = "+(-(w+d))+"\\). A width cannot be negative, so the width is <b>"+w+" m</b>.",
      {ctx:"rect", w:w, d:d});
    qp.figure=rectDiagSVG("w m","w + "+d+" m","Area = "+A+" m²");
    return qp;
  }
  if(ctx==="projectile"){
    var T=pick([2,3,4]);
    var v=pick(T===2?[5]:(T===3?[5,10]:[5,10,15]));
    var h0=T*(5*T-v), Dv=(10*T-v)*(10*T-v), sD=10*T-v;
    var surface=(h0>=40)?"the top of a cliff":"a platform";
    var qp=numq("A ball is thrown upward from "+surface+" "+h0+" m above the ground, with an initial speed of "+v+" m/s. Its height above the ground, in metres, after \\(t\\) seconds is \\(h(t) = -5t^2 + "+v+"t + "+h0+"\\). How long does it take for the ball to reach the ground, in seconds?",
      T, 0.001,
      "The ball reaches the ground when \\(h(t) = 0\\). Apply the quadratic formula:"+
      "\\[ \\begin{aligned} -5t^2 + "+v+"t + "+h0+" &= 0 \\\\ t &= \\frac{-"+v+" \\pm \\sqrt{"+v+"^2 - 4(-5)("+h0+")}}{2(-5)} \\\\ &= \\frac{-"+v+" \\pm "+sD+"}{-10} \\end{aligned} \\]"+
      "The two values are \\(t = "+T+"\\) and \\(t = "+fmt((v-5*T)/5,2)+"\\). Time cannot be negative, so the ball reaches the ground after <b>"+T+" s</b>.",
      {ctx:"projectile", T:T, v:v, h0:h0, surface:surface});
    qp.figure=trajSVG(-5,v,h0);
    return qp;
  }
  if(ctx==="consecutive"){
    var kind=pick(["plain","even","odd"]);
    var step=(kind==="plain")?1:2, n;
    if(kind==="plain") n=ri(6,20);
    else if(kind==="even") n=2*ri(3,12);
    else n=2*ri(2,11)+1;
    var P=n*(n+step);
    var label=(kind==="plain")?"consecutive positive integers":(kind==="even")?"consecutive positive even integers":"consecutive positive odd integers";
    var stepW=(kind==="plain")?"n + 1":"n + 2";
    return numq("The product of two "+label+" is "+P+". What is the smaller of the two numbers?",
      n, 0.001,
      "Let the smaller number be \\(n\\); the next one is \\("+stepW+"\\). Their product gives:"+
      "\\[ \\begin{aligned} n("+stepW+") &= "+P+" \\\\ n^2 + "+step+"n - "+P+" &= 0 \\\\ (n - "+n+")(n + "+(n+step)+") &= 0 \\end{aligned} \\]"+
      "So \\(n = "+n+"\\) or \\(n = "+(-(n+step))+"\\). The numbers are positive, so the smaller number is <b>"+n+"</b>.",
      {ctx:"consecutive", kind:kind, n:n, step:step});
  }
  /* frame */
  var dims=pick([[24,18],[30,20],[25,20],[40,30],[36,24],[20,16]]);
  var W=dims[0], H=dims[1], x=ri(2,5);
  var TOT=(W+2*x)*(H+2*x), S=W+H, sD2=2*(S+4*x);
  return numq("A photograph "+W+" cm by "+H+" cm is mounted in a frame with a border of uniform width. The total area of the photograph and the frame together is "+TOT+" cm². What is the width of the border, in centimetres?",
    x, 0.001,
    "Let the border width be \\(x\\) cm. The outer dimensions are \\(("+W+" + 2x)\\) cm by \\(("+H+" + 2x)\\) cm, so:"+
    "\\[ \\begin{aligned} ("+W+" + 2x)("+H+" + 2x) &= "+TOT+" \\\\ 4x^2 + "+(2*S)+"x "+((W*H-TOT)<0?"- "+(TOT-W*H):"+ "+(W*H-TOT))+" &= 0 \\\\ x &= \\frac{-"+(2*S)+" \\pm \\sqrt{"+(2*S)+"^2 - 16("+(W*H-TOT)+")}}{8} \\\\ &= \\frac{-"+(2*S)+" \\pm "+sD2+"}{8} \\end{aligned} \\]"+
    "The two values are \\(x = "+x+"\\) and \\(x = "+fmt((-(2*S)-sD2)/8,2)+"\\). A border width cannot be negative, so the width is <b>"+x+" cm</b>.",
    {ctx:"frame", W:W, H:H, x:x});
});

/* ---------- 4.11: derive the quadratic formula (L3, var) ---------- */
E("u3-derive-formula",3,["4.11"],3,"var",varset([
  function(){
    return mcq("The quadratic formula is derived from \\(ax^2 + bx + c = 0\\), where \\(a \\ne 0\\), by completing the square. After every term is divided by \\(a\\) and the constant term is moved to the right side, the equation reads \\(x^2 + \\frac{b}{a}x = -\\frac{c}{a}\\). What is the next step?",
      "Add \\(\\left(\\frac{b}{2a}\\right)^2\\) to both sides",
      ["Take the square root of both sides",
       "Add \\(\\frac{b}{2a}\\) to both sides",
       "Multiply both sides by \\(2a\\)"],
      "Completing the square means adding the square of half the coefficient of \\(x\\). Half of \\(\\frac{b}{a}\\) is \\(\\frac{b}{2a}\\), so \\(\\left(\\frac{b}{2a}\\right)^2\\) is added to both sides, which keeps the equation balanced and makes the left side a perfect square:"+
      "\\[ \\begin{aligned} x^2 + \\frac{b}{a}x + \\left(\\frac{b}{2a}\\right)^2 &= -\\frac{c}{a} + \\left(\\frac{b}{2a}\\right)^2 \\\\ \\left(x + \\frac{b}{2a}\\right)^2 &= \\frac{b^2 - 4ac}{4a^2} \\end{aligned} \\]"+
      "Taking square roots and then isolating \\(x\\) gives the formula.",
      {v:1});
  },
  function(){
    return mcq("When the square is completed on \\(x^2 + \\frac{b}{a}x\\), the number added to both sides is \\(\\frac{b^2}{4a^2}\\). Why is this the number that is added?",
      "It is the square of half the coefficient of \\(x\\): \\(\\left(\\frac{1}{2} \\cdot \\frac{b}{a}\\right)^2 = \\left(\\frac{b}{2a}\\right)^2\\)",
      ["It is chosen so that the right side of the equation becomes zero in the end",
       "It is the square of the constant term \\(c\\), adjusted by the value of \\(a\\)",
       "It is twice the coefficient of \\(x\\), divided by the value of \\(a\\), giving \\(\\left(\\frac{2b}{a}\\right)^2\\)"],
      "To complete the square on \\(x^2 + px\\), add \\(\\left(\\frac{p}{2}\\right)^2\\). Here \\(p = \\frac{b}{a}\\), so the number added is \\(\\left(\\frac{b}{2a}\\right)^2 = \\frac{b^2}{4a^2}\\), and the left side becomes \\(\\left(x + \\frac{b}{2a}\\right)^2\\).",
      {v:2});
  },
  function(){
    return mcq("Near the end of deriving the quadratic formula, \\(\\left(x + \\frac{b}{2a}\\right)^2 = \\frac{b^2 - 4ac}{4a^2}\\) is rewritten as \\(x + \\frac{b}{2a} = \\pm \\frac{\\sqrt{b^2 - 4ac}}{2a}\\). Why does the \\(\\pm\\) symbol appear?",
      "Taking a square root gives two possibilities, because a number and its opposite have the same square",
      ["Because the value of \\(a\\) in the equation can be positive or negative, depending on the quadratic",
       "To allow the formula to produce imaginary roots as well as real ones when they are needed in a problem",
       "Because the square root of a fraction must be written out twice, once for each of its two parts"],
      "If \\(u^2 = w\\), then \\(u = \\sqrt{w}\\) or \\(u = -\\sqrt{w}\\): both values square to \\(w\\). The \\(\\pm\\) records both possibilities in one line. It has nothing to do with the sign of \\(a\\); the denominator \\(2a\\) comes from \\(\\sqrt{4a^2}\\) in the root of the right side.",
      {v:3});
  },
  function(){
    return mcq("The quadratic formula is derived by completing the square on \\(ax^2 + bx + c = 0\\). The derivation begins by dividing every term by \\(a\\). Which condition is required for this step?",
      "\\(a \\ne 0\\): division by zero is not possible, and a quadratic equation has \\(a \\ne 0\\) by definition",
      ["\\(b \\ne 0\\), so that the equation still has an \\(x\\) term after the division step is carried out",
       "\\(c \\ne 0\\), so that the constant term can be moved to the right side of the equation afterwards",
       "The discriminant must be positive, so that a real square root exists later in the derivation"],
      "Dividing by \\(a\\) is only meaningful when \\(a \\ne 0\\). That condition is automatic: if \\(a\\) were zero, the equation would be linear, not quadratic. The values of \\(b\\) and \\(c\\) may be zero, and the sign of the discriminant plays no part in this step.",
      {v:4});
  }
]));

/* ---------- extra u3 helper (hoisted): join numbers with signs, e.g. 25 - 40 + 15 ---------- */
function u3JoinSigned(nums){
  var out="";
  nums.forEach(function(v,i){ if(i===0) out=""+v; else out+=(v<0?" - "+(-v):" + "+v); });
  return out;
}

/* ---------- 4.12: find the first error in a worked solution (L3) ----------
   Deliberate error-analysis entry: the stem presents flawed work by design. */
E("u3-error-analysis",3,["4.12"],3,"gen",function(){
  var fam=pick(["F1","F1","F2","F2","F3","F4"]);
  function present(stem, lines){
    return stem+"<br>"+lines.map(function(L,i){ return "<b>Line "+(i+1)+":</b> "+L; }).join("<br>")+
      "<br>The work contains exactly one error. Which statement identifies the error?";
  }
  if(fam==="F1"){
    var A=pick([1,2]), r1=ri(2,7), r2=ri(3,8), att=0;
    while(att<200 && r1>=r2){ att++; r1=ri(2,7); r2=ri(3,8); }
    var B=-A*(r1+r2), C=A*r1*r2, D=A*A*(r2-r1)*(r2-r1), s=A*(r2-r1), base=-B;
    var mut=ri(1,4);
    var bv=(mut===1)?B:base;
    var sv=(mut===2)?s+2:s, Dv=sv*sv;
    var L1="\\(x = \\frac{"+(mut===1?"("+B+")":"-("+B+")")+" \\pm \\sqrt{("+B+")^2 - 4("+A+")("+C+")}}{2("+A+")}\\)";
    var L2="\\(x = \\frac{"+bv+" \\pm \\sqrt{"+Dv+"}}{"+(2*A)+"}\\)";
    var L3="\\(x = \\frac{"+bv+" + "+sv+"}{"+(2*A)+"} \\text{ or } x = \\frac{"+bv+" "+(mut===3?"+":"-")+" "+sv+"}{"+(2*A)+"}\\)";
    var plus, minus;
    if(mut===4){ plus=""+(-r2); minus=""+(-r1); }
    else { plus=u3FracS(bv+sv,2*A); minus=(mut===3)?plus:u3FracS(bv-sv,2*A); }
    var L4="\\(x = "+plus+" \\text{ or } x = "+minus+"\\)";
    var cat=["Line 1 writes the first term of the numerator as \\(b\\) instead of \\(-b\\) in the formula",
             "Line 2 evaluates the discriminant \\(b^2 - 4ac\\) incorrectly when its value is worked out",
             "Line 3 uses the same sign for both roots when the \\(\\pm\\) is split into two separate roots",
             "Line 4 changes the signs of the roots when the final answer is stated at the very end"];
    var why=[ "In Line 1, the numerator must begin with \\(-b = "+base+"\\), since \\(b = "+B+"\\). Every later line is built on the wrong starting value.",
              "In Line 2, the discriminant is \\(b^2 - 4ac = "+D+"\\), not "+Dv+"; its square root is \\("+s+"\\), not "+sv+".",
              "In Line 3, splitting \\(\\pm\\) must produce one root with \\(+\\) and one with \\(-\\). Using \\(+\\) twice loses the second root.",
              "Lines 1 to 3 are correct. Line 4 then changes the signs of both roots when the answer is stated."][mut-1];
    return mcq(present("A student solves the equation \\("+u3QuadS(A,B,C)+" = 0\\) using the quadratic formula. The work is shown below.", [L1,L2,L3,L4]),
      cat[mut-1], cat.filter(function(_,i){ return i!==mut-1; }),
      why+" The correct computation is \\(x = \\frac{"+base+" \\pm "+s+"}{"+(2*A)+"}\\), so the solutions are <b>\\(x = "+r1+"\\)</b> and <b>\\(x = "+r2+"\\)</b>.",
      {fam:fam, mut:mut});
  }
  if(fam==="F2"){
    var s1=ri(-8,7), s2=ri(-7,8), att2=0;
    while(att2<300){ att2++; s1=ri(-8,7); s2=ri(-7,8);
      if(s1<s2 && s2!==0) break; }
    var B2=-(s1+s2), C2=s1*s2, mut2=ri(1,4);
    var f1=s1, f2=(mut2===1)?-s2:s2;
    var prs=[{r:f1},{r:f2}];
    prs.forEach(function(o){ o.s=u3FacS(o.r); });
    prs.sort(function(x,y){ return x.s<y.s?-1:(x.s>y.s?1:0); });
    if(prs[1].r===0 && mut2===3) mut2=4; /* a sign flip on a zero root would be invisible */
    var LL1="\\("+prs.map(function(o){ return o.s; }).join("")+" = 0\\)";
    var LL2=(mut2===2) ? "\\("+u3BinS(prs[0].r)+" = 0\\)"
                       : "\\("+u3BinS(prs[0].r)+" = 0 \\text{ or } "+u3BinS(prs[1].r)+" = 0\\)";
    var t1=prs[0].r, t2=(mut2===3)?-prs[1].r:prs[1].r;
    var LL3=(mut2===2) ? "\\(x = "+t1+"\\)" : "\\(x = "+t1+" \\text{ or } x = "+t2+"\\)";
    var LL4;
    if(mut2===2) LL4="The solution is \\(x = "+t1+"\\).";
    else if(mut2===4) LL4="The solutions are \\(x = "+Math.min(-t1,-t2)+"\\) and \\(x = "+Math.max(-t1,-t2)+"\\).";
    else LL4="The solutions are \\(x = "+Math.min(t1,t2)+"\\) and \\(x = "+Math.max(t1,t2)+"\\).";
    var cat2=["A sign in one factor in Line 1 is wrong, so the factored form does not expand to the original trinomial",
              "Line 2 sets only one factor equal to zero, so one of the two solutions is lost from the work shown",
              "Line 3 changes a sign incorrectly when isolating \\(x\\) in one of the two equations in the student's work",
              "Line 4 states both of the solutions with their signs reversed when they are written out in full here"];
    var why2=[ "In Line 1, the factor \\("+u3FacS(f2)+"\\) should be \\("+u3FacS(s2)+"\\) so that the factors expand to \\("+u3QuadS(1,B2,C2)+"\\). The later lines follow the incorrect factor consistently.",
               "In Line 2, the zero product property must be applied to both factors. Setting only one factor equal to zero loses the solution \\(x = "+prs[1].r+"\\).",
               "In Line 3, solving \\("+u3BinS(prs[1].r)+" = 0\\) gives \\(x = "+prs[1].r+"\\), not \\(x = "+(-prs[1].r)+"\\). The sign is changed incorrectly at that step.",
               "Lines 1 to 3 are correct. Line 4 then reverses the signs of both solutions when stating the answer."][mut2-1];
    return mcq(present("A student solves the equation \\("+u3QuadS(1,B2,C2)+" = 0\\) by factoring. The work is shown below.", [LL1,LL2,LL3,LL4]),
      cat2[mut2-1], cat2.filter(function(_,i){ return i!==mut2-1; }),
      why2+" The correct solutions are <b>\\(x = "+s1+"\\)</b> and <b>\\(x = "+s2+"\\)</b>.",
      {fam:fam, mut:mut2});
  }
  if(fam==="F3"){
    var u1=ri(-7,8), u2=ri(-6,9), att3=0;
    while(att3<400){ att3++; u1=ri(-7,8); u2=ri(-6,9);
      if(u1<u2 && u1!==0 && u2!==0 && ((u1+u2)%2===0) && (u1+u2)!==0) break; }
    var B3=-(u1+u2), C3=u1*u2, m3=B3/2, s3=(u2-u1)/2, mut3=pick([3,4]);
    var ML1="\\("+u3QuadS(1,B3,0)+" = "+(-C3)+"\\)";
    var ML2="\\("+u3QuadS(1,B3,m3*m3)+" = "+(-C3)+" + "+(m3*m3)+"\\)";
    var fi="x"+(m3>0?" + "+m3:" - "+(-m3)), fiB="x"+(B3>0?" + "+B3:" - "+(-B3));
    var ML3=(mut3===3) ? "\\(("+fiB+")^2 = "+(s3*s3)+" \\Rightarrow "+fiB+" = \\pm "+s3+"\\)"
                       : "\\(("+fi+")^2 = "+(s3*s3)+" \\Rightarrow "+fi+" = \\pm "+s3+"\\)";
    var ML4=(mut3===3) ? "\\(x = "+(-B3-s3)+" \\text{ or } x = "+(-B3+s3)+"\\)"
                       : "\\(x = "+(m3-s3)+" \\text{ or } x = "+(m3+s3)+"\\)";
    var cat3=["Line 1 moves the constant term to the right side without changing its sign to the opposite one",
              "Line 2 adds a value that is not the square of half the coefficient of \\(x\\) in the trinomial shown",
              "Line 3 writes the squared factor with the full coefficient of \\(x\\) instead of half of it in the work",
              "Line 4 isolates \\(x\\) by adding half the coefficient of \\(x\\) instead of subtracting it at that step"];
    var why3=(mut3===3)
      ? "In Line 3, completing the square on \\(x^2 "+(B3<0?"- "+(-B3):"+ "+B3)+"x\\) produces the factor \\(("+fi+")^2\\), built from half the coefficient of \\(x\\), which is \\("+m3+"\\). Writing \\(("+fiB+")^2\\) uses the full coefficient \\("+B3+"\\) instead."
      : "In Line 4, isolating \\(x\\) from \\("+fi+" = \\pm "+s3+"\\) means subtracting \\("+m3+"\\) from both sides. Adding it instead shifts both roots.";
    return mcq(present("A student solves the equation \\("+u3QuadS(1,B3,C3)+" = 0\\) by completing the square. The work is shown below.", [ML1,ML2,ML3,ML4]),
      cat3[mut3-1], cat3.filter(function(_,i){ return i!==mut3-1; }),
      why3+" The correct solutions are <b>\\(x = "+u1+"\\)</b> and <b>\\(x = "+u2+"\\)</b>.",
      {fam:fam, mut:mut3});
  }
  /* F4: square-root method on (x - h)^2 = K */
  var h=ri(-7,7); if(h===0) h=5;
  var kk=ri(2,9), K=kk*kk, mut4=ri(1,4);
  var inner="x"+(h>0?" - "+h:" + "+(-h));
  var vP=h+kk, vM=h-kk;
  var NL1=(mut4===1) ? "\\("+inner+" = "+kk+"\\)" : "\\("+inner+" = \\pm "+kk+"\\)";
  var NL2=(mut4===1) ? "\\("+inner+" = "+kk+"\\)"
        : (mut4===2) ? "\\("+inner+" = "+kk+" \\text{ or } "+inner+" = "+kk+"\\)"
        : "\\("+inner+" = "+kk+" \\text{ or } "+inner+" = "+(-kk)+"\\)";
  var NL3=(mut4===1 || mut4===2) ? "\\(x = "+vP+"\\)"
        : (mut4===3) ? "\\(x = "+(-h+kk)+" \\text{ or } x = "+(-h-kk)+"\\)"
        : "\\(x = "+vP+" \\text{ or } x = "+vM+"\\)";
  var NL4;
  if(mut4===1 || mut4===2) NL4="The solution is \\(x = "+vP+"\\).";
  else if(mut4===3) NL4="The solutions are \\(x = "+(-h-kk)+"\\) and \\(x = "+(-h+kk)+"\\).";
  else if(mut4===4) NL4="The solutions are \\(x = "+(-vP)+"\\) and \\(x = "+(-vM)+"\\).";
  else NL4="The solutions are \\(x = "+vM+"\\) and \\(x = "+vP+"\\).";
  var cat4=["Line 1 takes the square root of the right side but drops the negative possibility entirely",
            "Line 2 writes the same equation twice instead of writing the positive and negative cases",
            "Line 3 moves the constant term to the other side of the equation with the wrong sign entirely",
            "Line 4 states both of the solutions with their signs reversed when they are written out in full"];
  var why4=[ "In Line 1, taking the square root of \\("+K+"\\) gives both \\("+kk+"\\) and \\("+(-kk)+"\\). Dropping the negative case loses the solution \\(x = "+vM+"\\).",
             "In Line 2, the two cases must be \\("+inner+" = "+kk+"\\) and \\("+inner+" = "+(-kk)+"\\). Writing the positive case twice loses the solution \\(x = "+vM+"\\).",
             "In Line 3, isolating \\(x\\) in \\("+inner+" = "+(-kk)+"\\) means adding \\("+h+"\\) to both sides. The sign is handled incorrectly, shifting both values.",
             "Lines 1 to 3 are correct. Line 4 then reverses the signs of both solutions when stating the answer."][mut4-1];
  return mcq(present("A student solves the equation \\(("+inner+")^2 = "+K+"\\). The work is shown below.", [NL1,NL2,NL3,NL4]),
    cat4[mut4-1], cat4.filter(function(_,i){ return i!==mut4-1; }),
    why4+" The correct solutions are <b>\\(x = "+vM+"\\)</b> and <b>\\(x = "+vP+"\\)</b>.",
    {fam:fam, mut:mut4});
});

/* ---------- 4.13: choose a method, justify it, and verify (L3) ---------- */
E("u3-method-choice",3,["4.13"],3,"gen",function(){
  function formulaRootStr(base,coef,rad,den,sign){
    var g=u3Gcd(u3Gcd(base,coef),den); base/=g; coef/=g; den/=g;
    var radTerm=(coef===1?"\\sqrt{"+rad+"}":coef+"\\sqrt{"+rad+"}");
    var num;
    if(base===0) num=(sign<0?"-":"")+radTerm;
    else num=base+(sign<0?" - ":" + ")+radTerm;
    return den===1 ? num : "\\frac{"+num+"}{"+den+"}";
  }
  var sc=pick(["SA","SB","SC","SD","SE"]);
  var stemHead="Which method is the most appropriate first choice for solving the equation ";
  if(sc==="SA"){
    var form=pick(["shift","pure"]), rp, K, eqS, solA, hiS;
    if(form==="shift"){
      var h=ri(-6,6); if(h===0) h=3;
      K=pick([9,16,25,36,49,8,12,18,20,27,32,45,50]); rp=u3RadParts(K);
      var inner=u3InnerS(1,"x",-h);
      eqS="\\(("+inner+")^2 = "+K+"\\)";
      var sqrtTerm=(rp[1]===1? ""+rp[0] : (rp[0]===1?"\\sqrt{"+rp[1]+"}":rp[0]+"\\sqrt{"+rp[1]+"}"));
      function rrS(hh,sign){ if(rp[1]===1) return ""+(hh+sign*rp[0]);
        var t=(rp[0]===1?"\\sqrt{"+rp[1]+"}":rp[0]+"\\sqrt{"+rp[1]+"}"); return hh+(sign<0?" - ":" + ")+t; }
      hiS=rrS(h,1);
      solA="Taking square roots is the direct method here:"+
        "\\[ \\begin{aligned} ("+inner+")^2 &= "+K+" \\\\ "+inner+" &= \\pm "+sqrtTerm+" \\\\ x &= "+h+" \\pm "+sqrtTerm+" \\end{aligned} \\]"+
        "Check: when \\(x = "+hiS+"\\), \\("+inner+" = "+sqrtTerm+"\\), and \\(("+sqrtTerm+")^2 = "+K+"\\), so the equation is satisfied.";
    } else {
      K=pick([6,10,14,15,21,24,30,35,40]); rp=u3RadParts(K);
      eqS="\\(x^2 = "+K+"\\)";
      var sqrtTerm2=(rp[0]===1?"\\sqrt{"+rp[1]+"}":rp[0]+"\\sqrt{"+rp[1]+"}");
      hiS=sqrtTerm2;
      solA="Taking square roots is the direct method here:"+
        "\\[ \\begin{aligned} x^2 &= "+K+" \\\\ x &= \\pm "+sqrtTerm2+" \\end{aligned} \\]"+
        "Check: \\(\\left("+sqrtTerm2+"\\right)^2 = "+K+"\\), so \\(x = "+sqrtTerm2+"\\) satisfies the equation, and so does its opposite.";
    }
    return mcq(stemHead+eqS+", and why?",
      "Take square roots of both sides: the equation is already a squared expression equal to a constant, so this undoes the square in one step",
      ["Use the quadratic formula: the equation must first be expanded into the form \\(ax^2 + bx + c = 0\\) before any method can be applied to it",
       "Complete the square: the squared expression on the left still has to be built by adding a constant to both sides of the equation",
       "Factor the left side and use the zero product property: the left side is written as a product of two different factors in the equation"],
      solA, {sc:sc});
  }
  if(sc==="SB"){
    var r1=ri(-7,7), r2=ri(-7,7), att=0;
    while(att<200 && r1===r2){ att++; r2=ri(-7,7); }
    var B=-(r1+r2), C=r1*r2, Q=u3QuadS(1,B,C);
    return mcq(stemHead+"\\("+Q+" = 0\\), and why?",
      "Factor the trinomial and apply the zero product property: it factors into two binomials with integer constants",
      ["Use the quadratic formula: no other method can produce the two roots of the equation exactly, whatever the roots are",
       "Use the quadratic formula: the trinomial factors, but only with fraction constants in the two binomials",
       "Take square roots of both sides: the trinomial on the left is already a perfect square trinomial here"],
      "Factoring is the most direct method:"+
      "\\[ \\begin{aligned} "+Q+" &= 0 \\\\ "+u3TwoFac(u3FacS(r1), u3FacS(r2))+" &= 0 \\end{aligned} \\]"+
      "So \\(x = "+r1+"\\) or \\(x = "+r2+"\\). Verify by substituting \\(x = "+r1+"\\) into the original equation:"+
      "\\[ ("+r1+")^2 + ("+B+")("+r1+") + ("+C+") = "+u3JoinSigned([r1*r1, B*r1, C])+" = 0 \\]"+
      "The value checks, so \\(x = "+r1+"\\) is a root.",
      {sc:sc});
  }
  if(sc==="SC"){
    var bE=pick([6,8,10,12])*pick([-1,1]), D=pick([20,28,40,44,52,60,68,76,80,84,92].filter(function(v){ return v<bE*bE && (bE*bE-v)%4===0; }));
    var cE=(bE*bE-D)/4, mE=bE/2, rpE=u3RadParts(D), tC=rpE[0]/2, tR=rpE[1];
    var Q2=u3QuadS(1,bE,cE);
    function scRoot(sign){ var t=(tC===1?"\\sqrt{"+tR+"}":tC+"\\sqrt{"+tR+"}"); return (-mE)+(sign<0?" - ":" + ")+t; }
    return mcq(stemHead+"\\("+Q2+" = 0\\), and why?",
      "Complete the square: \\(a = 1\\) and the coefficient of \\(x\\) is even, so halving it gives a whole number and the square completes without fractions",
      ["Factor the trinomial: it factors into two binomials with integer constants, and those two factors give both of the roots directly, with no fractions involved.",
       "Use the quadratic formula: it is the only method that can produce irrational roots, such as \\(x = -3 \\pm \\sqrt{5}\\), for an equation like this one",
       "Take square roots of both sides: the left side is a perfect square trinomial, so its square root can be taken directly in one step"],
      "Completing the square keeps the arithmetic clean here:"+
      "\\[ \\begin{aligned} x^2 "+(bE<0?"- "+(-bE):"+ "+bE)+"x &= "+(-cE)+" \\\\ x^2 "+(bE<0?"- "+(-bE):"+ "+bE)+"x + "+(mE*mE)+" &= "+(-cE)+" + "+(mE*mE)+" \\\\ (x "+(mE<0?"- "+(-mE):"+ "+mE)+")^2 &= "+(D/4)+" \\\\ x &= "+scRoot(-1)+" \\text{ or } "+scRoot(1)+" \\end{aligned} \\]"+
      "Verify with the sum and product of the roots: the sum is \\("+(-2*mE)+" = -b\\) and the product is \\("+(mE*mE)+" - "+(tC*tC*tR)+" = "+cE+" = c\\), which matches the equation.",
      {sc:sc});
  }
  if(sc==="SD"){
    var att3=0, a3,b3,c3,D3,rp3;
    while(att3<600){ att3++;
      a3=pick([2,3,5]); b3=pick([-9,-7,-5,-3,-1,1,3,5,7,9]); c3=ri(-9,9);
      if(c3===0) continue;
      D3=b3*b3-4*a3*c3; if(D3<=0) continue;
      rp3=u3RadParts(D3); if(rp3[1]<=1) continue;
      break; }
    var Q3=u3QuadS(a3,b3,c3);
    var loR=formulaRootStr(-b3, rp3[0], rp3[1], 2*a3, -1), hiR=formulaRootStr(-b3, rp3[0], rp3[1], 2*a3, 1);
    return mcq(stemHead+"\\("+Q3+" = 0\\), and why?",
      "Use the quadratic formula: the trinomial does not factor over the integers, so the formula gives the exact roots directly",
      ["Factor the trinomial: it factors into two binomials with integer constants, and those two factors give both of the roots directly, with no fractions involved.",
       "Complete the square: half of the coefficient of \\(x\\) is a whole number, so no fractions appear in the work at all",
       "Take square roots of both sides: the equation has no \\(x\\) term, so the squared part can be undone directly in one step"],
      "The discriminant is \\("+D3+"\\), which is not a perfect square, so the roots are irrational and no integer factorization exists. The formula gives them directly:"+
      "\\[ \\begin{aligned} x &= \\frac{-("+b3+") \\pm \\sqrt{"+D3+"}}{"+(2*a3)+"} \\\\ &= "+loR+" \\text{ or } "+hiR+" \\end{aligned} \\]"+
      "Verify with the sum and product of the roots: their sum is \\("+u3FracS(-b3,a3)+" = -\\frac{b}{a}\\) and their product is \\("+u3FracS(c3,a3)+" = \\frac{c}{a}\\), which matches the equation.",
      {sc:sc});
  }
  /* SE: perfect square trinomial */
  var mm=pick([-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8]);
  var B5=2*mm, C5=mm*mm, Q5=u3QuadS(1,B5,C5);
  var inner5="x"+(mm>0?" + "+mm:" - "+(-mm));
  return mcq(stemHead+"\\("+Q5+" = 0\\), and why?",
    "Take square roots: the left side is a perfect square trinomial, \\(("+inner5+")^2\\), so the equation has a single repeated root",
    ["Use the quadratic formula: the discriminant of the equation is positive, so the equation has two distinct roots",
     "Factor by grouping: the expression splits naturally into two pairs of terms that share factors with each other",
     "Complete the square: a square such as \\((x + k)^2\\) still has to be built by adding a constant to both sides of the equation"],
    "The left side is already a perfect square:"+
    "\\[ \\begin{aligned} "+Q5+" &= ("+inner5+")^2 \\\\ "+inner5+" &= 0 \\\\ x &= "+(-mm)+" \\end{aligned} \\]"+
    "Verify by substituting \\(x = "+(-mm)+"\\) into the original equation:"+
    "\\[ ("+(-mm)+")^2 + ("+B5+")("+(-mm)+") + ("+C5+") = "+u3JoinSigned([mm*mm, B5*(-mm), C5])+" = 0 \\]"+
    "The value checks, so \\(x = "+(-mm)+"\\) is the repeated root.",
    {sc:sc});
});

/* ============ Prior knowledge tranche (Nov 15, 2026) ============ */
/* Borrowed verbatim from the feeder banks named in the source
   comments and the PKT table below, plus authored micro-items
   where the prior knowledge map names a skill no feeder entry
   assesses. Spec: Math-2200-PK-Tranche-Spec-2026-11-15.md. */

/* u3-pk-gcf: borrowed verbatim from math-1201 entry u3-gcf (math-1201:3.10). */
E("u3-pk-gcf",3,["3.14"], 2, "gen", function () {
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

/* u3-pk-factor-monic: borrowed verbatim from math-1201 entry u3-factor-monic (math-1201:3.12). */
E("u3-pk-factor-monic",3,["3.15"], 2, "gen", function () {
  var v = pick(["x", "y"]);
  var r = u3Nz(-9, 9), s = u3Nz(-9, 9), guard = 0;
  while (r === s && guard < 40) { guard++; s = u3Nz(-9, 9); }
  var B = r + s, C = r * s;
  var poly = u3PC([1, B, C], v);
  var facs = [[1, Math.min(r, s)], [1, Math.max(r, s)]];
  var ans = Math.max(r, s);
  var prompt = "When the trinomial \\(" + poly + "\\) is factored as a product of two binomials, the two constant terms are two numbers. What is the larger of those two numbers?";
  var sol = "Find two numbers that multiply to \\(" + C + "\\) and add to \\(" + B + "\\): the numbers are \\(" + Math.min(r, s) + "\\) and \\(" + Math.max(r, s) + "\\)." +
    u3Alg([poly + " &= " + u3FacRaw("", facs, v)]) +
    "The larger of the two constant terms is **" + ans + "**.";
  return numq(prompt, ans, 0.01, sol, { t: "pair", r: r, s: s, B: B, C: C });
});

/* u3-pk-diff-squares: borrowed verbatim from math-1201 entry u3-diff-squares (math-1201:3.14). */
E("u3-pk-diff-squares",3,["3.15"], 1, "gen", function () {
  var mode = pick(["pure", "pure", "twovar"]);
  if (mode === "twovar") {
    var a = ri(1, 4), b = ri(1, 6);
    var polyTerms = [[a * a, 2, 0], [-b * b, 0, 2]];
    var poly = u3Str(polyTerms);
    var f1 = u3Str([[a, 1, 0], [b, 0, 1]]), f2 = u3Str([[a, 1, 0], [-b, 0, 1]]);
    var keyRaw = "(" + f1 + ")(" + f2 + ")";
    var P = [[a, 1, 0], [b, 0, 1]], Q = [[a, 1, 0], [-b, 0, 1]];
    var cands = [], seen = {};
    function addT(s) { if (s !== keyRaw && !seen[s]) { seen[s] = 1; cands.push(u3M(s)); } }
    addT("(" + f2 + ")(" + f2 + ")");
    addT("(" + f1 + ")(" + f1 + ")");
    addT("(" + u3Str([[a, 1, 0], [b * b, 0, 1]]) + ")(" + u3Str([[a, 1, 0], [-b * b, 0, 1]]) + ")");
    addT("(" + u3Str([[1, 1, 0], [b, 0, 1]]) + ")(" + u3Str([[1, 1, 0], [-b, 0, 1]]) + ")");
    addT("(" + u3Str([[a, 1, 0], [b + 1, 0, 1]]) + ")(" + f2 + ")");
    addT("(" + u3Str([[a + 1, 1, 0], [b, 0, 1]]) + ")(" + u3Str([[a + 1, 1, 0], [-b, 0, 1]]) + ")");
    var solT = "Each term is a perfect square: \\(" + poly + " = (" + a + "x)^2 - (" + b + "y)^2\\). A difference of squares factors into a sum and a difference of the two square roots. As a trinomial the middle term is \\(0\\): a pair of numbers multiplying to the negative constant term and adding to \\(0\\) must be opposites, which is why the two factors differ only in sign." +
      u3Alg([poly + " &= " + keyRaw]) +
      "The factored form is **" + u3M(keyRaw) + "**.";
    return mcq("Factor the polynomial \\(" + poly + "\\).",
      u3M(keyRaw), shuffle(cands).slice(0, 3), solT, { t: "facT", P: P, Q: Q, poly: poly });
  }
  var v = pick(["x", "y"]);
  var a2 = ri(1, 5), b2 = ri(1, 9);
  var prod = [a2 * a2, 0, -b2 * b2];
  var poly2 = u3PC(prod, v);
  var facs = [[a2, b2], [a2, -b2]];
  var keyRaw2 = u3FacRaw("", facs, v);
  var sqTerm = a2 === 1 ? v + "^2" : (a2 * a2) + v + "^2";
  var sol = "Each term is a perfect square: \\(" + poly2 + " = (" + a2 + v + ")^2 - " + b2 + "^2\\). Written as a trinomial, this is \\(" + sqTerm + " + 0" + v + " - " + (b2 * b2) + "\\), the case where the middle coefficient is \\(0\\). A factor pair of \\(-" + (b2 * b2) + "\\) that adds to \\(0\\) must consist of opposites, \\(" + b2 + "\\) and \\(-" + b2 + "\\), so the factors differ only in sign." +
    u3Alg([poly2 + " &= " + keyRaw2]) +
    "The factored form is **" + u3M(keyRaw2) + "**.";
  return mcq("Factor the polynomial \\(" + poly2 + "\\).",
    u3M(keyRaw2), u3FacDistr("", facs, v, prod, 3), sol,
    { t: "fac", g: "", parts: facs, v: v });
});

/* u3-pk-monomial-expand: borrowed verbatim from math-1201 entry u3-monomial-expand (math-1201:3.4). */
E("u3-pk-monomial-expand",3,["3.14"], 1, "gen", function () {
  var mode = ri(0, 2), P, Q, pdesc;
  if (mode === 0) {
    var a = u3Nz(-6, 6); if (Math.abs(a) < 2) a = a < 0 ? -3 : 3;
    var k = ri(1, 2), p = ri(1, 4), q = u3Nz(-7, 7);
    P = [[a, k, 0]]; Q = [[p, 1, 0], [q, 0, 0]];
    pdesc = u3Str(P) + u3Par([p, q], "x");
  } else if (mode === 1) {
    var a2 = u3Nz(-5, 5); if (Math.abs(a2) < 2) a2 = a2 < 0 ? -2 : 2;
    var p2 = ri(1, 3), q2 = u3Nz(-6, 6), r2 = u3Nz(-8, 8);
    P = [[a2, 1, 0]]; Q = [[p2, 2, 0], [q2, 1, 0], [r2, 0, 0]];
    pdesc = u3Str(P) + u3Par([p2, q2, r2], "x");
  } else {
    var a3 = u3Nz(-5, 5); if (Math.abs(a3) < 2) a3 = a3 < 0 ? -4 : 4;
    var p3 = ri(1, 3), q3 = u3Nz(-4, 4);
    P = [[a3, 1, 1]]; Q = [[p3, 1, 0], [q3, 0, 1]];
    pdesc = u3Str(P) + "(" + u3Str(Q) + ")";
  }
  var partials = u3Mul(P, Q), keyRaw = u3Str(partials);
  var seen = {}, distr = [];
  shuffle(u3PerturbTerms(partials)).forEach(function (s) {
    if (s !== keyRaw && !seen[s]) { seen[s] = 1; distr.push(u3M(s)); }
  });
  var prompt = "Expand and simplify \\(" + pdesc + "\\).";
  var sol = "Multiply the monomial by every term inside the brackets." +
    u3Alg([pdesc + " &= " + u3StrSeq(partials), "&= " + keyRaw]) +
    "The expanded form is **" + u3M(keyRaw) + "**.";
  return mcq(prompt, u3M(keyRaw), distr.slice(0, 3), sol, { t: "expand", P: P, Q: Q });
});

/* u3-pk-graph-strategy: borrowed verbatim from math-1201 entry u5-graph-strategy (math-1201:4.34). */
E("u3-pk-graph-strategy",3,["4.9"],1,"var",varset([
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

/* u3-pk-graph-form: borrowed verbatim from math-1201 entry u5-graph-form (math-1201:4.35). */
E("u3-pk-graph-form",3,["4.9"],2,"gen",function(){
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

/* u3-pk-solve-input: borrowed verbatim from math-1201 entry u4-solve-input (math-1201:4.48). */
E("u3-pk-solve-input",3,["4.10"],2,"gen",function(){
  var fn=pick(["f","g","h"]);
  var m=pick([-4,-3,-2,-1,1,2,3,4,5]),b=ri(-9,10),xAns=ri(-6,9);
  var target=m*xAns+b;
  return numq("A linear function is given by \\("+fn+"(x) = "+u4lin(m,b)+"\\). For what domain value is \\("+fn+"(x) = "+target+"\\)?",
    xAns,0.011,
    "Set the function equal to the given range value and solve for the input: \\[ \\begin{aligned} "+u4lin(m,b)+" &= "+target+" \\\\ "+u4num(m)+"x &= "+(target-b)+" \\\\ x &= "+xAns+" \\end{aligned} \\] The domain value is <b>\\("+xAns+"\\)</b>.",
    {fn:fn,m:m,b:b,target:target,ans:xAns});
});

/* u3-pk-sqrt-eval: authored micro-item (authored:squares-and-square-roots),
   written for this tranche. */
E("u3-pk-sqrt-eval",3,["4.10"],1,"gen",function(){
  var a=ri(3,15);
  if(ri(0,1)===0){
    return mcq("What is \\(\\sqrt{(-"+a+")^2}\\)?",
      "\\("+a+"\\)",
      ["\\("+(-a)+"\\)","\\("+(a*a)+"\\)","\\("+(-(a*a))+"\\)"],
      "Squaring \\(-"+a+"\\) gives \\((-"+a+")^2 = "+(a*a)+"\\), and the square root then returns the size of the number: \\(\\sqrt{"+(a*a)+"} = "+a+"\\). The answer is <b>\\("+a+"\\)</b>.",
      {mode:"root-of-square",a:a,ans:a});
  }
  return mcq("What is \\((-"+a+")^2\\)?",
    "\\("+(a*a)+"\\)",
    ["\\("+(-(a*a))+"\\)","\\("+a+"\\)","\\("+(2*a)+"\\)"],
    "A negative number squared gives a positive result: \\((-"+a+")^2 = (-"+a+") \\times (-"+a+") = "+(a*a)+"\\). The answer is <b>\\("+(a*a)+"\\)</b>.",
    {mode:"square-of-negative",a:a,ans:a*a});
}, ["Work out the square first, then the root.", "Squaring a negative number gives a positive result."]);

/* PK tranche pass for Unit 3. pkFor is the cluster's dependent
   indicator list from the prior knowledge map, as registered
   for this unit in courses.js. */
var PKT_U3_FOR=["3.14","3.15","3.16","3.17","4.9","4.10","4.11","4.12","4.13","4.14","4.15"];
var PKT_U3={
 "u3-pk-gcf":{src:"math-1201:3.10",group:"common-factor"},
 "u3-pk-factor-monic":{src:"math-1201:3.12",group:"factoring"},
 "u3-pk-diff-squares":{src:"math-1201:3.14",group:"factoring"},
 "u3-pk-monomial-expand":{src:"math-1201:3.4",group:"polynomial-multiply"},
 "u3-pk-graph-strategy":{src:"math-1201:4.34",group:"graph-forms"},
 "u3-pk-graph-form":{src:"math-1201:4.35",group:"graph-forms"},
 "u3-pk-solve-input":{src:"math-1201:4.48",group:"isolate-variable"},
 "u3-pk-sqrt-eval":{src:"authored:squares-and-square-roots",group:"square-roots"}
};
BANK.forEach(function(e){var t=PKT_U3[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U3_FOR.slice();e.pkGroup=t.group;}});

/* ================= Bank Strengthening Programme pass 5 (November 19, 2026) =================
   45 entries drafted in-house, closing every Unit 3 pool to depth 6.
   Helpers for this tranche are prefixed u3x; entries register through
   E(...), in pool order: 3.14, 3.15, 3.16, 3.17, 4.9, 4.10, 4.11,
   4.12, 4.13, 4.14, 4.15. */

/* ---------- u3x helpers (new for this tranche) ---------- */
function u3xMonoBody(coef, xp, yp){ /* monomial magnitude string: 12x^3y^2, x, y^2, 5 */
  var v = (xp>0 ? (xp===1 ? "x" : "x^"+xp) : "") + (yp>0 ? (yp===1 ? "y" : "y^"+yp) : "");
  if(v === "") return ""+Math.abs(coef);
  return (Math.abs(coef)===1 ? "" : ""+Math.abs(coef)) + v;
}
function u3xJoinTerms(terms){ /* terms: [coef, bodyString] pairs, joined with signs */
  var out = "", first = true;
  terms.forEach(function(t){
    if(t[0] === 0) return;
    var body = t[1];
    if(first){ out = (t[0] < 0 ? "-" : "") + body; first = false; }
    else out += (t[0] < 0 ? " - " : " + ") + body;
  });
  return out === "" ? "0" : out;
}
function u3xMonoPoly(terms){ /* terms: [coef, xpow, ypow] triples */
  return u3xJoinTerms(terms.map(function(t){ return [t[0], u3xMonoBody(t[0], t[1], t[2])]; }));
}
function u3xFacXY(p, q){ /* factor (px + qy) as a string, p >= 1, q != 0 */
  var lead = (p===1 ? "x" : p+"x");
  return "(" + lead + (q>0 ? " + " : " - ") + (Math.abs(q)===1 ? "y" : Math.abs(q)+"y") + ")";
}
function u3xQuadXY(A, B, C){ /* Ax^2 + Bxy + Cy^2 as a string */
  function body(coef, v){ return (Math.abs(coef)===1 ? "" : ""+Math.abs(coef)) + v; }
  return u3xJoinTerms([[A, body(A,"x^2")], [B, body(B,"xy")], [C, body(C,"y^2")]]);
}
function u3xTwoFacXY(s1, s2){ return s1 <= s2 ? s1+s2 : s2+s1; }
function u3xRootTerm(num, coef, m, den, sign){ /* one root (num + sign*coef*sqrt(m)) / den, canonical */
  var term = (coef===1 ? "\\sqrt{"+m+"}" : coef+"\\sqrt{"+m+"}");
  var body;
  if(num === 0) body = (sign < 0 ? "-" : "") + term;
  else body = num + (sign < 0 ? " - " : " + ") + term;
  return den === 1 ? body : "\\frac{" + body + "}{" + den + "}";
}
function u3xPairRad(nb, s, m, den){ /* pair string for roots (nb +- s*sqrt(m)) / den, den > 0, ascending */
  var lo = u3xRootTerm(nb, s, m, den, -1), hi = u3xRootTerm(nb, s, m, den, 1);
  return "\\(x = " + lo + " \\text{ or } x = " + hi + "\\)";
}
function u3xPairFrac(n1, d1, n2, d2){ /* pair string for two rational roots, ascending */
  var v1 = n1/d1, v2 = n2/d2;
  var lo = v1 <= v2 ? [n1, d1] : [n2, d2], hi = v1 <= v2 ? [n2, d2] : [n1, d1];
  return "\\(x = " + u3FracS(lo[0], lo[1]) + " \\text{ or } x = " + u3FracS(hi[0], hi[1]) + "\\)";
}
function u3xFracRaw(num, den){ /* fraction string WITHOUT reducing (for the unreduced distractor) */
  if(den < 0){ num = -num; den = -den; }
  if(den === 1) return "" + num;
  return (num < 0 ? "-" : "") + "\\frac{" + Math.abs(num) + "}{" + den + "}";
}
function u3xPairFracRaw(n1, d1, n2, d2){
  var v1 = n1/d1, v2 = n2/d2;
  var lo = v1 <= v2 ? [n1, d1] : [n2, d2], hi = v1 <= v2 ? [n2, d2] : [n1, d1];
  return "\\(x = " + u3xFracRaw(lo[0], lo[1]) + " \\text{ or } x = " + u3xFracRaw(hi[0], hi[1]) + "\\)";
}

/* ================= 3.14 (3 new: completely, negative, two-var) ================= */

/* ---------- 3.14: factor completely, common factor and factorable inside (L2) ---------- */
E("u3-factor-completely",3,["3.14"],2,"gen",function(){
  var d = ri(2,6), r1 = 0, r2 = 0, att = 0;
  while(att < 200){ att++; r1 = ri(-7,7); r2 = ri(-7,7);
    if(r1 !== 0 && r2 !== 0 && r1 !== r2) break; }
  var A = d, B = -d*(r1+r2), C = d*r1*r2;
  var Q = u3QuadS(A,B,C), inside = u3QuadS(1, -(r1+r2), r1*r2);
  var fac = u3TwoFac(u3FacS(r1), u3FacS(r2));
  var key = d + fac;
  var cands = [ fac,
                d + "(" + inside + ")",
                d + u3TwoFac(u3FacS(-r1), u3FacS(r2)),
                (d+1) + fac,
                d + u3TwoFac(u3FacS(-r1), u3FacS(-r2)) ];
  return mcq("Factor completely: \\(" + Q + "\\)",
    "\\(" + key + "\\)",
    u3Opts("\\(" + key + "\\)", cands.map(function(s){ return "\\(" + s + "\\)"; })),
    "Every term has the common factor \\(" + d + "\\). Factoring it out leaves a trinomial that factors further:" +
    "\\[ \\begin{aligned} " + Q + " &= " + d + "(" + inside + ") \\\\ &= " + key + " \\end{aligned} \\]" +
    "So the complete factorization is <b>\\(" + key + "\\)</b>.",
    {d:d, r1:r1, r2:r2, A:A, B:B, C:C});
});

/* ---------- 3.14: factor out a negative common factor (L2) ---------- */
E("u3-factor-negative",3,["3.14"],2,"gen",function(){
  var d = ri(2,6), p = ri(-9,9), q = 0, att = 0;
  while(att < 200){ att++; q = ri(-9,9); if(q !== 0) break; }
  var Q = u3QuadS(-d, -d*p, -d*q), inside = u3QuadS(1, p, q);
  var key = "-" + d + "(" + inside + ")";
  var cands = [ d + "(" + inside + ")",
                "-" + d + "(" + u3QuadS(1, -p, q) + ")",
                "-" + d + "(" + u3QuadS(1, p, -q) + ")",
                "-" + d + "(" + u3QuadS(-1, -p, -q) + ")",
                "-x(" + u3QuadS(d, d*p, d*q) + ")" ];
  return mcq("Factor completely: \\(" + Q + "\\)",
    "\\(" + key + "\\)",
    u3Opts("\\(" + key + "\\)", cands.map(function(s){ return "\\(" + s + "\\)"; })),
    "The leading coefficient is negative, so factor out \\(-" + d + "\\), the negative common factor. Each term divided by \\(-" + d + "\\) gives:" +
    "\\[ " + Q + " = " + key + " \\]" +
    "The factor in brackets now has a positive leading coefficient. So the complete factorization is <b>\\(" + key + "\\)</b>.",
    {d:d, p:p, q:q});
});

/* ---------- 3.14: common factor in two variables (L3) ---------- */
E("u3-factor-two-var",3,["3.14"],3,"gen",function(){
  var n = ri(2,9), gx = ri(0,2), gy = ri(0,2), att = 0, a1, a2, a3;
  while(att < 300){ att++;
    a1 = ri(-6,6); a2 = ri(-6,6); a3 = ri(-6,6);
    if(a1 === 0 || a2 === 0 || a3 === 0) continue;
    if(u3Gcd(u3Gcd(a1,a2),a3) !== 1) continue;
    break; }
  var stemT = [[n*a1, gx+2, gy], [n*a2, gx+1, gy+1], [n*a3, gx, gy+2]];
  var stem = u3xMonoPoly(stemT);
  var gBody = u3xMonoBody(n, gx, gy);
  var gStr = (gx + gy === 0) ? ""+n : (n === 1 ? "" : ""+n) + (gx>0 ? (gx===1 ? "x" : "x^"+gx) : "") + (gy>0 ? (gy===1 ? "y" : "y^"+gy) : "");
  var inside = u3xMonoPoly([[a1,2,0],[a2,1,1],[a3,0,2]]);
  var key = gStr + "(" + inside + ")";
  var nDiv = [1,2,3].filter(function(v){ return n % v === 0 && v < n; });
  var partial = nDiv.length ? (n / nDiv[nDiv.length-1]) : n;
  var partialG = (gx + gy === 0) ? ""+partial : (partial === 1 ? "" : ""+partial) + (gx>0 ? (gx===1 ? "x" : "x^"+gx) : "") + (gy>0 ? (gy===1 ? "y" : "y^"+gy) : "");
  var scaledIn = u3xMonoPoly([[a1*(n/partial),2,0],[a2*(n/partial),1,1],[a3*(n/partial),0,2]]);
  var cands = [ partialG + "(" + scaledIn + ")",
                gStr + "(" + u3xMonoPoly([[a1,2,0],[-a2,1,1],[a3,0,2]]) + ")",
                gStr + "(" + u3xMonoPoly([[a1,2,0],[a2,1,1],[-a3,0,2]]) + ")",
                gStr + "(" + u3xMonoPoly([[a1+1,2,0],[a2,1,1],[a3,0,2]]) + ")" ];
  return mcq("Factor completely: \\(" + stem + "\\)",
    "\\(" + key + "\\)",
    u3Opts("\\(" + key + "\\)", cands.map(function(s){ return "\\(" + s + "\\)"; })),
    "Every term is divisible by \\(" + gStr + "\\): the coefficients share the factor \\(" + n + "\\)" +
    (gx + gy > 0 ? ", and every term contains " + (gx>0 ? "\\(" + (gx===1 ? "x" : "x^"+gx) + "\\)" : "") + (gx>0 && gy>0 ? " and " : "") + (gy>0 ? "\\(" + (gy===1 ? "y" : "y^"+gy) + "\\)" : "") : "") +
    ". Dividing each term by \\(" + gStr + "\\) leaves:" +
    "\\[ " + stem + " = " + key + " \\]" +
    "The remaining terms share no common factor, so the complete factorization is <b>\\(" + key + "\\)</b>.",
    {n:n, gx:gx, gy:gy, a1:a1, a2:a2, a3:a3});
});

/* ================= 3.15 (2 new: two-var trinomial, perfect square) ================= */

/* ---------- 3.15: factor a trinomial in two variables (L2) ---------- */
E("u3-factor-trinomial-two-var",3,["3.15"],2,"gen",function(){
  var p = pick([1,2]), r = pick([1,2]), q = 0, s = 0, att = 0;
  while(att < 200){ att++; q = ri(-5,5); s = ri(-5,5);
    if(q !== 0 && s !== 0) break; }
  var A = p*r, B = p*s + q*r, C = q*s;
  var Q = u3xQuadXY(A, B, C);
  var key = u3xTwoFacXY(u3xFacXY(p, q), u3xFacXY(r, s));
  function expOK(p1,q1,p2,q2){ return p1*p2 === A && p1*q2 + q1*p2 === B && q1*q2 === C; }
  var specs = [[p,-q,r,s],[p,q,r,-s],[p,-q,r,-s],[p,s,r,q],[p,q+1,r,s],[p,q,r,s+1],[r,s,p,q]];
  var cands = [];
  specs.forEach(function(sp){ if(!expOK(sp[0],sp[1],sp[2],sp[3])) cands.push(u3xTwoFacXY(u3xFacXY(sp[0],sp[1]), u3xFacXY(sp[2],sp[3]))); });
  return mcq("Factor: \\(" + Q + "\\)",
    "\\(" + key + "\\)",
    u3Opts("\\(" + key + "\\)", cands.map(function(s2){ return "\\(" + s2 + "\\)"; })),
    "Treat the trinomial as a quadratic in \\(x\\) whose coefficients involve \\(y\\). The factor pair " + key + " can be checked by expanding:" +
    "\\[ \\begin{aligned} " + key + " &= " + u3xJoinTerms([[A, (Math.abs(A) === 1 ? "x^2" : Math.abs(A) + "x^2")], [p*s, (Math.abs(p*s) === 1 ? "xy" : Math.abs(p*s) + "xy")], [q*r, (Math.abs(q*r) === 1 ? "xy" : Math.abs(q*r) + "xy")], [C, (Math.abs(C) === 1 ? "y^2" : Math.abs(C) + "y^2")]]) + " \\\\ &= " + Q + " \\end{aligned} \\]" +
    "which matches the given trinomial, so the factorization is <b>\\(" + key + "\\)</b>.",
    {p:p, q:q, r:r, s:s, A:A, B:B, C:C});
});

/* ---------- 3.15: factor a perfect square trinomial (L3) ---------- */
E("u3-factor-pst",3,["3.15"],3,"gen",function(){
  var a = ri(2,5), b = ri(2,9), s = pick([1,-1]);
  var A = a*a, B = 2*a*b*s, C = b*b;
  var Q = u3QuadS(A, B, C);
  var base = a + "x " + (s > 0 ? "+ " : "- ") + b;
  var key = "(" + base + ")^2";
  var flip = a + "x " + (s > 0 ? "- " : "+ ") + b;
  var cands = [ "(" + flip + ")^2",
                "(" + base + ")(" + flip + ")",
                "(" + (a*a) + "x + " + b + ")^2",
                "(" + a + "x + " + (b*b) + ")^2" ];
  return mcq("Factor: \\(" + Q + "\\)",
    "\\(" + key + "\\)",
    u3Opts("\\(" + key + "\\)", cands.map(function(s2){ return "\\(" + s2 + "\\)"; })),
    "The first and last terms are perfect squares, \\(" + A + "x^2 = (" + a + "x)^2\\) and \\(" + C + " = " + b + "^2\\), and the middle term is twice their product, \\(2(" + a + "x)(" + b + ") = " + Math.abs(B) + "x\\). So the trinomial is a perfect square:" +
    "\\[ " + Q + " = " + key + " \\]" +
    "So the factorization is <b>\\(" + key + "\\)</b>.",
    {a:a, b:b, s:s, A:A, B:B, C:C});
});

/* ================= 3.16 (5 new) ================= */

/* ---------- 3.16: evaluate P(k), the mechanical core of the factor test (L1) ---------- */
E("u3-factor-test-evaluate",3,["3.16"],1,"gen",function(){
  var a = ri(1,3), b = ri(-9,9), c = ri(-9,9), k = 0, att = 0;
  while(att < 200){ att++; k = ri(-6,6); if(k !== 0) break; }
  var val = a*k*k + b*k + c;
  var P = u3QuadS(a,b,c);
  return numq("Let \\(P(x) = " + P + "\\). What is the value of \\(P(" + k + ")\\)?",
    val, 0.001,
    "Substitute \\(x = " + k + "\\) into the polynomial:" +
    "\\[ \\begin{aligned} P(" + k + ") &= " + a + "(" + k + ")^2 " + (b < 0 ? "- " + (-b) : "+ " + b) + "(" + k + ") " + (c < 0 ? "- " + (-c) : "+ " + c) + " \\\\ &= " + val + " \\end{aligned} \\]" +
    "So <b>\\(P(" + k + ") = " + val + "\\)</b>.",
    {a:a, b:b, c:c, k:k, val:val});
});

/* ---------- 3.16: remainder on division, by the remainder theorem (L2) ---------- */
E("u3-factor-test-remainder",3,["3.16"],2,"gen",function(){
  var a = ri(1,3), b = ri(-9,9), c = ri(-9,9), k = 0, val = 0, att = 0;
  while(att < 300){ att++; a = ri(1,3); b = ri(-9,9); c = ri(-9,9); k = ri(-6,6);
    if(k === 0) continue;
    val = a*k*k + b*k + c;
    if(val !== 0) break; }
  var P = u3QuadS(a,b,c);
  return numq("What is the remainder when \\(P(x) = " + P + "\\) is divided by \\(" + u3BinS(k) + "\\)?",
    val, 0.001,
    "By the remainder theorem, the remainder on division by \\(" + u3BinS(k) + "\\) is \\(P(" + k + ")\\):" +
    "\\[ \\begin{aligned} P(" + k + ") &= " + a + "(" + k + ")^2 " + (b < 0 ? "- " + (-b) : "+ " + b) + "(" + k + ") " + (c < 0 ? "- " + (-c) : "+ " + c) + " \\\\ &= " + val + " \\end{aligned} \\]" +
    "So the remainder is <b>" + val + "</b>.",
    {a:a, b:b, c:c, k:k, val:val});
});

/* ---------- 3.16: find the unknown coefficient from a stated factor (L2) ---------- */
E("u3-factor-test-find-k",3,["3.16"],2,"gen",function(){
  var fam = pick(["unknownB","unknownC"]), h = 0, att = 0;
  while(att < 200){ att++; h = ri(-6,6); if(h !== 0) break; }
  if(fam === "unknownB"){
    var mult = ri(-3,3); if(mult === 0) mult = 2;
    var c = h * mult, k = -(h*h + c) / h;
    var P = "x^2 + kx " + (c < 0 ? "- " + (-c) : "+ " + c);
    return numq("If \\(" + u3BinS(h) + "\\) is a factor of \\(P(x) = " + P + "\\), what is the value of \\(k\\)?",
      k, 0.001,
      "By the factor theorem, \\(P(" + h + ") = 0\\):" +
      "\\[ \\begin{aligned} (" + h + ")^2 + k(" + h + ") " + (c < 0 ? "- " + (-c) : "+ " + c) + " &= 0 \\\\ " + (h*h) + " " + (h < 0 ? "- " + (-h) : "+ " + h) + "k " + (c < 0 ? "- " + (-c) : "+ " + c) + " &= 0 \\\\ k &= " + k + " \\end{aligned} \\]" +
      "So <b>\\(k = " + k + "\\)</b>.",
      {fam:fam, h:h, c:c, k:k});
  }
  var b = ri(-9,9), k2 = -h*h - b*h;
  return numq("If \\(" + u3BinS(h) + "\\) is a factor of \\(P(x) = x^2 " + (b < 0 ? "- " + (-b) : "+ " + b) + "x + k\\), what is the value of \\(k\\)?",
    k2, 0.001,
    "By the factor theorem, \\(P(" + h + ") = 0\\):" +
    "\\[ \\begin{aligned} (" + h + ")^2 " + (b < 0 ? "- " + (-b) : "+ " + b) + "(" + h + ") + k &= 0 \\\\ " + (h*h) + " " + (b*h < 0 ? "- " + (-(b*h)) : "+ " + (b*h)) + " + k &= 0 \\\\ k &= " + k2 + " \\end{aligned} \\]" +
    "So <b>\\(k = " + k2 + "\\)</b>.",
    {fam:fam, h:h, b:b, k:k2});
});

/* ---------- 3.16: which of four binomials is a factor? (L2) ---------- */
E("u3-factor-test-which",3,["3.16"],2,"gen",function(){
  var k = 0, att = 0;
  while(att < 200){ att++; k = ri(-6,6); if(k !== 0) break; }
  var al = pick([1,2]), be = ri(-6,6);
  var a = al, b = be - al*k, c = -be*k;
  var P = u3QuadS(a,b,c);
  function pval(m){ return a*m*m + b*m + c; }
  var others = [], att2 = 0;
  while(att2 < 400 && others.length < 3){ att2++;
    var m = ri(-7,7);
    if(m === k || others.indexOf(m) >= 0) continue;
    if(pval(m) === 0) continue;
    others.push(m); }
  var key = "\\(" + u3BinS(k) + "\\)";
  var cands = others.map(function(m2){ return "\\(" + u3BinS(m2) + "\\)"; });
  var r2n = -be, r2d = al;
  return mcq("Let \\(P(x) = " + P + "\\). Which of the following is a factor of \\(P(x)\\)?",
    key, cands,
    "By the factor theorem, \\(" + u3BinS(k) + "\\) is a factor exactly when \\(P(" + k + ") = 0\\):" +
    "\\[ \\begin{aligned} P(" + k + ") &= " + a + "(" + k + ")^2 " + (b < 0 ? "- " + (-b) : "+ " + b) + "(" + k + ") " + (c < 0 ? "- " + (-c) : "+ " + c) + " \\\\ &= 0 \\end{aligned} \\]" +
    "The only other value at which \\(P\\) is zero is \\(x = " + u3FracS(r2n, r2d) + "\\), so no other listed binomial can be a factor. The factor is <b>" + key + "</b>.",
    {a:a, b:b, c:c, k:k, others:others});
});

/* ---------- 3.16: explain why a binomial is or is not a factor (L3, var) ---------- */
// VARIANTS: 4 (factor with zero remainder; non-factor with nonzero remainder; the sign trap in P(k); what a remainder tells you)
E("u3-factor-test-explain",3,["3.16"],3,"var",varset([
  function(){
    var key = "P(5) = 0, so the remainder on division by (x - 5) is 0, which is exactly what it means for (x - 5) to be a factor";
    return mcq("Let \\(P(x) = x^2 - 4x - 5\\). A student claims that \\(x - 5\\) is a factor of \\(P(x)\\). Which statement explains why the claim is correct?",
      key,
      ["P(-5) = 0, so the remainder on division by (x - 5) is 0, which is exactly what it means for (x - 5) to be a factor",
       "P(5) = 40, so the remainder on division by (x - 5) is 0, which is exactly what it means for (x - 5) to be a factor",
       "P(5) = 0, so the remainder on division by (x - 5) is 5, which is exactly what it means for (x - 5) to be a factor"],
      "Evaluate at the value that makes the binomial zero: \\(P(5) = 25 - 20 - 5 = 0\\). A remainder of zero on division is the definition of a factor, so the claim is correct: <b>P(5) = 0, so (x - 5) is a factor</b>.",
      {v:1, keyText:key});
  },
  function(){
    var key = "P(2) = -3, which is not zero, so division by (x - 2) leaves a remainder of -3 and (x - 2) is not a factor";
    return mcq("Let \\(P(x) = x^2 - 3x + 1\\). A student claims that \\(x - 2\\) is a factor of \\(P(x)\\). Which statement explains why the claim is incorrect?",
      key,
      ["P(2) = -3, which is not zero, so division by (x - 2) leaves a remainder of 3 and (x - 2) is not a factor",
       "P(-2) = -3, which is not zero, so division by (x - 2) leaves a remainder of -3 and (x - 2) is not a factor",
       "P(2) = 0, which is not zero, so division by (x - 2) leaves a remainder of -3 and (x - 2) is not a factor"],
      "Evaluate at the value that makes the binomial zero: \\(P(2) = 4 - 6 + 1 = -3\\). The remainder theorem says the remainder on division by \\(x - 2\\) is \\(P(2)\\), and a nonzero remainder means the binomial does not divide evenly: <b>P(2) = -3, so (x - 2) is not a factor</b>.",
      {v:2, keyText:key});
  },
  function(){
    var key = "The value to substitute is -4, not 4: (x + 4) is zero when x = -4, so the claim should be that P(-4) = 0";
    return mcq("A student writes: \"Since \\(x + 4\\) is a factor of \\(P(x)\\), it must be that \\(P(4) = 0\\).\" Which statement corrects the student's reasoning?",
      key,
      ["The value to substitute is -4, not 4: (x + 4) is zero when x = 4, so the claim should be that P(-4) = 0",
       "The value to substitute is 4, not -4: (x + 4) is zero when x = -4, so the claim should be that P(-4) = 0",
       "The value to substitute is -4, not 4: (x + 4) is zero when x = -4, so the claim should be that P(4) = 0"],
      "The factor theorem substitutes the value that makes the binomial zero. \\(x + 4 = 0\\) when \\(x = -4\\), so the factor statement is about \\(P(-4)\\), not \\(P(4)\\): <b>the value to substitute is -4</b>.",
      {v:3, keyText:key});
  },
  function(){
    var key = "P(3) = 7, and (x - 3) is not a factor of P(x), because a factor would leave a remainder of 0";
    return mcq("Dividing \\(P(x)\\) by \\(x - 3\\) leaves a remainder of 7. Which statement follows from this?",
      key,
      ["P(3) = 7, and (x - 3) is a factor of P(x), because a factor would leave a remainder of 0",
       "P(-3) = 7, and (x - 3) is not a factor of P(x), because a factor would leave a remainder of 0",
       "P(3) = -7, and (x - 3) is not a factor of P(x), because a factor would leave a remainder of 0"],
      "By the remainder theorem, the remainder on division by \\(x - 3\\) equals \\(P(3)\\), so \\(P(3) = 7\\). Since the remainder is not zero, the division is not exact: <b>(x - 3) is not a factor</b>.",
      {v:4, keyText:key});
  }
]));

/* ================= 3.17 (5 new) ================= */

/* ---------- 3.17: difference of squares with unit outer coefficients (L1) ---------- */
E("u3-func-diff-simple",3,["3.17"],1,"gen",function(){
  var fam = pick(["xy","xx"]);
  var p = ri(-6,6), q = ri(-6,6), att = 0;
  while(att < 200 && fam === "xx" && p === q){ att++; q = ri(-6,6); }
  var innerX = u3InnerS(1, "x", p), innerY = u3InnerS(1, fam === "xy" ? "y" : "x", q);
  var stemExpr = "(" + innerX + ")^2 - (" + innerY + ")^2";
  var key = "(" + innerX + " - " + innerY + ")(" + innerX + " + " + innerY + ")";
  var cands = [ "(" + innerX + " - " + innerY + ")(" + innerX + " - " + innerY + ")",
                "(" + innerX + " + " + innerY + ")(" + innerX + " + " + innerY + ")",
                "(" + innerX + " - " + innerY + ")^2 - (" + innerX + " + " + innerY + ")^2" ];
  return mcq("Factor: \\(" + stemExpr + "\\)",
    "\\(" + key + "\\)",
    u3Opts("\\(" + key + "\\)", cands.map(function(s){ return "\\(" + s + "\\)"; })),
    "The expression is a difference of squares, \\(\\left(" + innerX + "\\right)^2 - \\left(" + innerY + "\\right)^2\\). Using \\(u^2 - v^2 = (u - v)(u + v)\\):" +
    "\\[ " + stemExpr + " = " + key + " \\]" +
    "So the factorization is <b>\\(" + key + "\\)</b>.",
    {fam:fam, p:p, q:q});
});

/* ---------- 3.17: recognize the difference of squares behind a factored form (L1) ---------- */
E("u3-func-diff-expand",3,["3.17"],1,"gen",function(){
  var A = ri(2,5), B = ri(2,5), p = ri(-5,5), q = ri(-5,5);
  var innerX = u3InnerS(1, "x", p), innerY = u3InnerS(1, "y", q);
  var bigX = A + "(" + innerX + ")", bigY = B + "(" + innerY + ")";
  var factored = "(" + bigX + " - " + bigY + ")(" + bigX + " + " + bigY + ")";
  var key = (A*A) + "(" + innerX + ")^2 - " + (B*B) + "(" + innerY + ")^2";
  var cands = [ (A*A) + "(" + innerX + ")^2 + " + (B*B) + "(" + innerY + ")^2",
                A + "(" + innerX + ")^2 - " + B + "(" + innerY + ")^2",
                (A*A) + "(" + innerX + ")^2 - " + (B*B) + "(" + innerX + ")^2" ];
  return mcq("Which expression is equivalent to \\(" + factored + "\\)?",
    "\\(" + key + "\\)",
    u3Opts("\\(" + key + "\\)", cands.map(function(s){ return "\\(" + s + "\\)"; })),
    "The factored form has the shape \\((u - v)(u + v)\\) with \\(u = " + bigX + "\\) and \\(v = " + bigY + "\\), and \\((u - v)(u + v) = u^2 - v^2\\). Squaring each part, \\(\\left(" + bigX + "\\right)^2 = " + (A*A) + "(" + innerX + ")^2\\) and \\(\\left(" + bigY + "\\right)^2 = " + (B*B) + "(" + innerY + ")^2\\), so:" +
    "\\[ " + factored + " = " + key + " \\]" +
    "So the equivalent expression is <b>\\(" + key + "\\)</b>.",
    {A:A, B:B, p:p, q:q});
});

/* ---------- 3.17: difference of squares with a quadratic inner expression (L2) ---------- */
E("u3-func-diff-quad-inner",3,["3.17"],2,"gen",function(){
  var fam = pick(["qx","qy","qq"]);
  var A = ri(2,9), B = ri(2,9), p = ri(-5,5), q = ri(-5,5);
  function qIn(v, k){ return v + "^2" + (k > 0 ? " + " + k : k < 0 ? " - " + (-k) : ""); }
  var innerX, innerY;
  if(fam === "qx"){ innerX = qIn("x", p); innerY = u3InnerS(1, "x", q); }
  else if(fam === "qy"){ innerX = u3InnerS(1, "x", p); innerY = qIn("y", q); }
  else { innerX = qIn("x", p); innerY = qIn("y", q); }
  var bigX = A + "(" + innerX + ")", bigY = B + "(" + innerY + ")";
  var stemExpr = (A*A) + "(" + innerX + ")^2 - " + (B*B) + "(" + innerY + ")^2";
  var key = "(" + bigX + " - " + bigY + ")(" + bigX + " + " + bigY + ")";
  var bigX2 = (A*A) + "(" + innerX + ")", bigY2 = (B*B) + "(" + innerY + ")";
  var cands = [ "(" + bigX + " - " + bigY + ")(" + bigX + " - " + bigY + ")",
                "(" + bigX + " + " + bigY + ")(" + bigX + " + " + bigY + ")",
                "(" + bigX2 + " - " + bigY2 + ")(" + bigX2 + " + " + bigY2 + ")",
                "(" + bigX + " - " + bigY2 + ")(" + bigX + " + " + bigY2 + ")" ];
  return mcq("Factor: \\(" + stemExpr + "\\)",
    "\\(" + key + "\\)",
    u3Opts("\\(" + key + "\\)", cands.map(function(s){ return "\\(" + s + "\\)"; })),
    "The expression is a difference of squares, \\(\\left(" + bigX + "\\right)^2 - \\left(" + bigY + "\\right)^2\\), where the two squared parts are \\(" + bigX + "\\) and \\(" + bigY + "\\). Using \\(u^2 - v^2 = (u - v)(u + v)\\):" +
    "\\[ " + stemExpr + " = " + key + " \\]" +
    "So the factorization is <b>\\(" + key + "\\)</b>.",
    {fam:fam, A:A, B:B, p:p, q:q});
});

/* ---------- 3.17: difference of squares stated with function definitions (L2) ---------- */
E("u3-func-diff-functions",3,["3.17"],2,"gen",function(){
  var A = ri(2,9), B = ri(2,9), p = ri(-5,5), q = ri(-5,5);
  var innerX = u3InnerS(1, "x", p), innerY = u3InnerS(1, "y", q);
  var bigX = A + "(" + innerX + ")", bigY = B + "(" + innerY + ")";
  var stemExpr = (A*A) + "(f(x))^2 - " + (B*B) + "(g(y))^2";
  var key = "(" + bigX + " - " + bigY + ")(" + bigX + " + " + bigY + ")";
  var bigX2 = (A*A) + "(" + innerX + ")", bigY2 = (B*B) + "(" + innerY + ")";
  var cands = [ "(" + bigX + " - " + bigY + ")(" + bigX + " - " + bigY + ")",
                "(" + bigX + " + " + bigY + ")(" + bigX + " + " + bigY + ")",
                "(" + bigX2 + " - " + bigY2 + ")(" + bigX2 + " + " + bigY2 + ")",
                "(" + bigX + " - " + bigY2 + ")(" + bigX + " + " + bigY2 + ")" ];
  return mcq("Let \\(f(x) = " + innerX + "\\) and \\(g(y) = " + innerY + "\\). Factor: \\(" + stemExpr + "\\)",
    "\\(" + key + "\\)",
    u3Opts("\\(" + key + "\\)", cands.map(function(s){ return "\\(" + s + "\\)"; })),
    "Substituting the definitions, \\(" + (A*A) + "(f(x))^2 = \\left(" + bigX + "\\right)^2\\) and \\(" + (B*B) + "(g(y))^2 = \\left(" + bigY + "\\right)^2\\), so the expression is a difference of squares. Using \\(u^2 - v^2 = (u - v)(u + v)\\):" +
    "\\[ " + stemExpr + " = " + key + " \\]" +
    "So the factorization is <b>\\(" + key + "\\)</b>.",
    {A:A, B:B, p:p, q:q});
});

/* ---------- 3.17: factor completely, a difference of squares twice over (L3) ---------- */
E("u3-func-diff-completely",3,["3.17"],3,"gen",function(){
  var fam = pick(["std","std","scaled","const"]);
  function cStr(c){ return c === 1 ? "" : "" + c; }
  if(fam === "const"){
    var s1 = ri(2,4), s2 = ri(2,6);
    var M1 = s1*s1, B = s2*s2*s2*s2, A = M1*M1;
    var stemC = A + "(x^2)^2 - " + B;
    var stage1C = "(" + M1 + "x^2 - " + (s2*s2) + ")(" + M1 + "x^2 + " + (s2*s2) + ")";
    var linC2 = "(" + s1 + "x - " + s2 + ")(" + s1 + "x + " + s2 + ")";
    var keyC = linC2 + "(" + M1 + "x^2 + " + (s2*s2) + ")";
    var candsC = [ stage1C,
                   "(" + s1 + "x - " + s2 + ")(" + s1 + "x - " + s2 + ")(" + M1 + "x^2 + " + (s2*s2) + ")",
                   linC2 + "(" + M1 + "x^2 - " + (s2*s2) + ")",
                   "(" + M1 + "x^2 - " + (s2*s2) + ")^2" ];
    return mcq("Factor completely: \\(" + stemC + "\\)",
      "\\(" + keyC + "\\)",
      u3Opts("\\(" + keyC + "\\)", candsC.map(function(s){ return "\\(" + s + "\\)"; })),
      "The expression is a difference of squares with squared parts \\(" + M1 + "x^2\\) and \\(" + (s2*s2) + "\\):" +
      "\\[ \\begin{aligned} " + stemC + " &= " + stage1C + " \\\\ &= " + keyC + " \\end{aligned} \\]" +
      "The first factor is itself a difference of squares, \\(" + M1 + "x^2 - " + (s2*s2) + " = (" + s1 + "x - " + s2 + ")(" + s1 + "x + " + s2 + ")\\), while \\(" + M1 + "x^2 + " + (s2*s2) + "\\) is a sum of squares and does not factor further. So the complete factorization is <b>\\(" + keyC + "\\)</b>.",
      {fam:fam, s1:s1, s2:s2});
  }
  var PAIRS = [[1,2],[2,1],[1,3],[3,1],[1,4],[4,1],[1,5],[5,1],[2,3],[3,2],[2,5],[5,2],[3,4],[4,3],[3,5],[5,3],[4,5],[5,4]];
  var pr = pick(PAIRS), u1 = pr[0], u2 = pr[1];
  var t = fam === "scaled" ? pick([2,3,4]) : 1;
  var M1 = t*u1*u1, M2 = t*u2*u2, A2 = M1*M1, B2 = M2*M2;
  var stem = (A2 === 1 ? "" : A2) + "(x^2)^2 - " + B2 + "(y^2)^2";
  var diffF = "(" + cStr(M1) + "x^2 - " + cStr(M2) + "y^2)", sumF = "(" + cStr(M1) + "x^2 + " + cStr(M2) + "y^2)";
  var stage1 = diffF + sumF;
  var lin = "(" + cStr(u1) + "x - " + cStr(u2) + "y)(" + cStr(u1) + "x + " + cStr(u2) + "y)";
  var baseSum = "(" + cStr(u1*u1) + "x^2 + " + cStr(u2*u2) + "y^2)", baseDiff = "(" + cStr(u1*u1) + "x^2 - " + cStr(u2*u2) + "y^2)";
  var key, cands, stepNote;
  if(t > 1){
    key = (t*t) + lin + baseSum;
    cands = [ stage1,
              "" + t + lin + sumF,
              (t*t) + lin + baseDiff,
              (t*t) + baseDiff + baseSum ];
    stepNote = "Each factor still has the common factor \\(" + t + "\\): \\(" + cStr(M1) + "x^2 - " + cStr(M2) + "y^2 = " + t + baseDiff + "\\) and \\(" + cStr(M1) + "x^2 + " + cStr(M2) + "y^2 = " + t + baseSum + "\\). The difference \\(" + baseDiff + "\\) factors once more, while the sum \\(" + baseSum + "\\) does not factor further.";
  } else {
    key = lin + sumF;
    cands = [ stage1,
              "(" + cStr(u1) + "x - " + cStr(u2) + "y)(" + cStr(u1) + "x - " + cStr(u2) + "y)" + sumF,
              lin + diffF,
              "(" + cStr(M1) + "x^2 - " + cStr(M2) + "y^2)^2",
              "2" + lin + sumF ];
    stepNote = "The first factor is itself a difference of squares, \\(" + cStr(M1) + "x^2 - " + cStr(M2) + "y^2 = " + lin + "\\), while \\(" + cStr(M1) + "x^2 + " + cStr(M2) + "y^2\\) is a sum of squares and does not factor further.";
  }
  return mcq("Factor completely: \\(" + stem + "\\)",
    "\\(" + key + "\\)",
    u3Opts("\\(" + key + "\\)", cands.map(function(s){ return "\\(" + s + "\\)"; })),
    "The expression is a difference of squares with squared parts \\(" + cStr(M1) + "x^2\\) and \\(" + cStr(M2) + "y^2\\):" +
    "\\[ \\begin{aligned} " + stem + " &= " + stage1 + " \\\\ &= " + key + " \\end{aligned} \\]" +
    stepNote + " So the complete factorization is <b>\\(" + key + "\\)</b>.",
    {fam:fam, t:t, u1:u1, u2:u2});
});

/* ================= 4.9 (3 new) ================= */

/* ---------- 4.9: read the zeros from a graph alone (L2) ---------- */
E("u3-roots-from-graph",3,["4.9"],2,"gen",function(){
  var r1 = 0, r2 = 0, att = 0;
  while(att < 200){ att++; r1 = ri(-6,6); r2 = ri(-6,6);
    if(r1 !== 0 && r2 !== 0 && r1 !== r2 && r1 + r2 !== 0) break; }
  var lo = Math.min(r1, r2), hi = Math.max(r1, r2);
  var a = pick([1,2]), b = -a*(r1 + r2), c = a*r1*r2;
  function andPair(x, y){ return "\\(x = " + x + "\\) and \\(x = " + y + "\\)"; }
  function andPairN(x, y){ return andPair(Math.min(x, y), Math.max(x, y)); }
  var key = andPairN(lo, hi);
  var cands = [andPairN(-lo, -hi), andPairN(-lo, hi), andPairN(lo, -hi), andPairN(lo + hi, lo * hi)];
  var q = mcq("The graph of a quadratic function \\(f\\) is shown. What are the <b>zeros</b> of \\(f\\)?",
    key, u3Opts(key, cands),
    "The zeros of a function are the input values where the graph crosses the x-axis. The graph crosses at \\((" + lo + ", 0)\\) and \\((" + hi + ", 0)\\), so the zeros are <b>\\(x = " + lo + "\\)</b> and <b>\\(x = " + hi + "\\)</b>.",
    {a:a, r1:r1, r2:r2});
  q.figure = parSVG(a, b, c, {marks: [{x: lo, y: 0}, {x: hi, y: 0}]});
  return q;
});

/* ---------- 4.9: how many zeros, from the position of the graph (L2, var) ---------- */
// VARIANTS: 4 (two crossings; tangent; no crossing opening up; tangent opening down)
E("u3-zeros-count",3,["4.9"],2,"var",varset([
  function(){
    var key = "The function has two distinct zeros";
    var q = mcq("The graph of a quadratic function \\(f\\) is shown. Which statement about the zeros of \\(f\\) is correct?",
      key,
      ["The function has one repeated zero",
       "The function has no real zeros at all",
       "The function has three distinct zeros"],
      "The graph crosses the x-axis at two different points, and each crossing point gives one zero. So <b>the function has two distinct zeros</b>.",
      {v:1, keyText:key, a:1, b:2, c:-3});
    q.figure = parSVG(1, 2, -3, {marks: [{x: -3, y: 0}, {x: 1, y: 0}]});
    return q;
  },
  function(){
    var key = "The function has one repeated zero";
    var q = mcq("The graph of a quadratic function \\(f\\) is shown. Which statement about the zeros of \\(f\\) is correct?",
      key,
      ["The function has two distinct zeros",
       "The function has no real zeros at all",
       "The function has three distinct zeros"],
      "The graph touches the x-axis at exactly one point, its vertex, and turns around there. That single touching point gives one zero, counted twice. So <b>the function has one repeated zero</b>.",
      {v:2, keyText:key, a:1, b:-4, c:4});
    q.figure = parSVG(1, -4, 4, {marks: [{x: 2, y: 0}]});
    return q;
  },
  function(){
    var key = "The function has no real zeros at all";
    var q = mcq("The graph of a quadratic function \\(f\\) is shown. Which statement about the zeros of \\(f\\) is correct?",
      key,
      ["The function has two distinct zeros",
       "The function has one repeated zero",
       "The function has three distinct zeros"],
      "The graph opens upward and its vertex sits above the x-axis, so the graph never reaches the x-axis. With no x-intercepts there are no input values that make the output zero. So <b>the function has no real zeros at all</b>.",
      {v:3, keyText:key, a:1, b:-2, c:4});
    q.figure = parSVG(1, -2, 4, {});
    return q;
  },
  function(){
    var key = "The function has one repeated zero";
    var q = mcq("The graph of a quadratic function \\(f\\) is shown. Which statement about the zeros of \\(f\\) is correct?",
      key,
      ["The function has two distinct zeros",
       "The function has no real zeros at all",
       "The function has three distinct zeros"],
      "The graph opens downward and its vertex rests on the x-axis at \\((-1, 0)\\), touching at exactly one point. That single touching point gives one zero, counted twice. So <b>the function has one repeated zero</b>.",
      {v:4, keyText:key, a:-1, b:-2, c:-1});
    q.figure = parSVG(-1, -2, -1, {marks: [{x: -1, y: 0}]});
    return q;
  }
]));

/* ---------- 4.9: determine the leading coefficient from the intercepts and a point (L3) ---------- */
E("u3-intercepts-find-a",3,["4.9"],3,"gen",function(){
  var r1 = 0, r2 = 0, att = 0;
  while(att < 200){ att++; r1 = ri(-6,6); r2 = ri(-6,6);
    if(r1 !== 0 && r2 !== 0 && r1 !== r2) break; }
  var a = pick([-3,-2,-1,1,2,3]);
  var y0 = a * r1 * r2;
  return numq("A quadratic function has x-intercepts \\(" + r1 + "\\) and \\(" + r2 + "\\), and its graph passes through \\((0, " + y0 + ")\\). The function has the form \\(f(x) = a(x - (" + r1 + "))(x - (" + r2 + "))\\). What is the value of \\(a\\)?",
    a, 0.001,
    "The zeros \\(" + r1 + "\\) and \\(" + r2 + "\\) fix the factored form up to the multiplier \\(a\\). Substitute the known point \\((0, " + y0 + ")\\):" +
    "\\[ \\begin{aligned} " + y0 + " &= a(0 - (" + r1 + "))(0 - (" + r2 + ")) \\\\ " + y0 + " &= " + (r1*r2) + "a \\\\ a &= " + a + " \\end{aligned} \\]" +
    "So <b>\\(a = " + a + "\\)</b>.",
    {r1:r1, r2:r2, a:a, y0:y0});
});

/* ================= 4.10 (3 new) ================= */

/* ---------- 4.10: solve by the formula, irrational roots (L2) ---------- */
E("u3-solve-formula-radical",3,["4.10"],2,"gen",function(){
  var a = 1, b = 0, c = 0, D = 0, rp = [1,1], att = 0;
  while(att < 600){ att++;
    a = pick([1,2,3]); b = ri(-9,9); c = ri(-9,9);
    if(c === 0 || b === 0) continue;
    D = b*b - 4*a*c;
    if(D <= 0) continue;
    rp = u3RadParts(D);
    if(rp[1] <= 1) continue;
    break; }
  var g = u3Gcd(u3Gcd(Math.abs(b), rp[0]), 2*a);
  var nb = -b/g, s = rp[0]/g, den = (2*a)/g;
  var key = u3xPairRad(nb, s, rp[1], den);
  var g0 = 1;
  var raw = u3xPairRad(-b, rp[0], rp[1], 2*a);
  var cands = [ u3xPairRad(b/g, s, rp[1], den),
                raw,
                u3xPairRad(nb, s, rp[1], a),
                u3xPairRad(nb, rp[0], rp[1], den),
                u3xPairRad(nb, s, rp[1] === 2 ? 3 : 2, den),
                u3xPairRad(nb + den, s, rp[1], den) ];
  var Q = u3QuadS(a, b, c);
  return mcq("Solve: \\(" + Q + " = 0\\)",
    key, u3Opts(key, cands),
    "The trinomial does not factor over the integers. Apply the quadratic formula with \\(a = " + a + "\\), \\(b = " + b + "\\) and \\(c = " + c + "\\):" +
    "\\[ \\begin{aligned} x &= \\frac{-(" + b + ") \\pm \\sqrt{(" + b + ")^2 - 4(" + a + ")(" + c + ")}}{2(" + a + ")} \\\\ &= \\frac{" + (-b) + " \\pm " + (rp[0] === 1 ? "" : rp[0]) + "\\sqrt{" + rp[1] + "}}{" + (2*a) + "} \\end{aligned} \\]" +
    (g > 1 ? "Dividing the numerator and the denominator by \\(" + g + "\\) gives the solutions in lowest terms. " : "") +
    "So the solutions are <b>" + key + "</b>.",
    {a:a, b:b, c:c, D:D});
});

/* ---------- 4.10: solution sets at the discriminant boundary cases (L2, var) ---------- */
// VARIANTS: 4 (no real roots from a negative discriminant; repeated root; no real roots for a sum of squares; repeated negative root)
E("u3-solve-nature-roots",3,["4.10"],2,"var",varset([
  function(){
    var key = "The equation has no real solutions";
    return mcq("Solve: \\(x^2 + 4x + 9 = 0\\)",
      key,
      ["\\(x = -2 - \\sqrt{5} \\text{ or } x = -2 + \\sqrt{5}\\)",
       "\\(x = -2\\), a repeated root",
       "\\(x = 2 - \\sqrt{5} \\text{ or } x = 2 + \\sqrt{5}\\)"],
      "The discriminant is \\(4^2 - 4(1)(9) = -20\\), which is negative. A negative discriminant means the equation has <b>no real solutions</b>. (The options with \\(\\sqrt{5}\\) come from using \\(+20\\) for the discriminant, a sign error.)",
      {v:1, keyText:key, a:1, b:4, c:9, D:-20});
  },
  function(){
    var key = "\\(x = 3\\), a repeated root";
    return mcq("Solve: \\(x^2 - 6x + 9 = 0\\)",
      key,
      ["\\(x = -3\\), a repeated root",
       "\\(x = -3 \\text{ or } x = 3\\)",
       "\\(x = 9\\), a repeated root"],
      "The left side is a perfect square, \\(x^2 - 6x + 9 = (x - 3)^2\\), and the discriminant is \\((-6)^2 - 4(1)(9) = 0\\). So the only solution is <b>\\(x = 3\\), a repeated root</b>.",
      {v:2, keyText:key, a:1, b:-6, c:9, D:0});
  },
  function(){
    var key = "The equation has no real solutions";
    return mcq("Solve: \\(x^2 + 16 = 0\\)",
      key,
      ["\\(x = -4 \\text{ or } x = 4\\)",
       "\\(x = 16\\), a repeated root",
       "\\(x = -16 \\text{ or } x = 16\\)"],
      "Isolating the squared term gives \\(x^2 = -16\\). No real number squares to a negative value, so the equation has <b>no real solutions</b>.",
      {v:3, keyText:key, a:1, b:0, c:16, D:-64});
  },
  function(){
    var key = "\\(x = -2\\), a repeated root";
    return mcq("Solve: \\(x^2 + 4x + 4 = 0\\)",
      key,
      ["\\(x = 2\\), a repeated root",
       "\\(x = -2 \\text{ or } x = 2\\)",
       "\\(x = -4\\), a repeated root"],
      "The left side is a perfect square, \\(x^2 + 4x + 4 = (x + 2)^2\\), and the discriminant is \\(4^2 - 4(1)(4) = 0\\). So the only solution is <b>\\(x = -2\\), a repeated root</b>.",
      {v:4, keyText:key, a:1, b:4, c:4, D:0});
  }
]));

/* ---------- 4.10: solve a non-monic equation with fraction roots (L3) ---------- */
E("u3-solve-fraction-roots",3,["4.10"],3,"gen",function(){
  var q1 = 2, q2 = 2, p1 = 1, p2 = 1, att = 0;
  while(att < 400){ att++;
    q1 = ri(2,4); q2 = ri(2,4); p1 = ri(-7,7); p2 = ri(-7,7);
    if(p1 === 0 || p2 === 0) continue;
    if(u3Gcd(p1, q1) !== 1 || u3Gcd(p2, q2) !== 1) continue;
    if(p1 * q2 === p2 * q1) continue;
    break; }
  var a = q1 * q2, b = -(q1 * p2 + q2 * p1), c = p1 * p2;
  var Q = u3QuadS(a, b, c);
  var key = u3xPairFrac(p1, q1, p2, q2);
  var cands = [ u3xPairFrac(-p1, q1, -p2, q2),
                u3xPairFrac(q1, Math.abs(p1) * (p1 < 0 ? -1 : 1), q2, Math.abs(p2) * (p2 < 0 ? -1 : 1)),
                u3xPairFrac(p1, q2, p2, q1),
                u3xPairFrac(p1 + q1, q1, p2, q2),
                u3xPairFrac(-p1, q1, p2, q2),
                u3xPairFrac(p1, q1, -p2, q2),
                u3xPairFracRaw(2 * p1, 2 * q1, 2 * p2, 2 * q2) ];
  var fac1 = "(" + (q1 === 1 ? "" : q1) + "x " + (p1 > 0 ? "- " + p1 : "+ " + (-p1)) + ")";
  var fac2 = "(" + (q2 === 1 ? "" : q2) + "x " + (p2 > 0 ? "- " + p2 : "+ " + (-p2)) + ")";
  return mcq("Solve: \\(" + Q + " = 0\\)",
    key, u3Opts(key, cands),
    "Factor the left side and set each factor equal to zero:" +
    "\\[ \\begin{aligned} " + Q + " &= 0 \\\\ " + fac1 + fac2 + " &= 0 \\end{aligned} \\]" +
    "So \\(" + (q1 === 1 ? "" : q1) + "x = " + p1 + "\\) or \\(" + (q2 === 1 ? "" : q2) + "x = " + p2 + "\\), giving <b>" + key + "</b>.",
    {a:a, b:b, c:c, n1:p1, d1:q1, n2:p2, d2:q2});
});

/* ================= 4.11 (5 new) ================= */

/* ---------- 4.11: the first steps of the derivation on concrete equations (L1, var) ---------- */
// VARIANTS: 4 (result of dividing by a; first move for a monic equation; result of dividing by 4; dividing and moving the constant together)
E("u3-derive-first-step",3,["4.11"],1,"var",varset([
  function(){
    var key = "\\(x^2 + \\frac{5}{3}x - \\frac{2}{3} = 0\\)";
    return mcq("The quadratic formula is derived by completing the square. For the equation \\(3x^2 + 5x - 2 = 0\\), the derivation begins by dividing every term by \\(3\\). Which equation results?",
      key,
      ["\\(x^2 + \\frac{5}{3}x - 2 = 0\\)",
       "\\(x^2 + 5x - \\frac{2}{3} = 0\\)",
       "\\(3x^2 + \\frac{5}{3}x - \\frac{2}{3} = 0\\)"],
      "Every term, including the constant, is divided by \\(3\\): \\(3x^2 \\div 3 = x^2\\), \\(5x \\div 3 = \\frac{5}{3}x\\) and \\(-2 \\div 3 = -\\frac{2}{3}\\). The result is <b>" + key + "</b>.",
      {v:1, keyText:key});
  },
  function(){
    var key = "Move the constant term to the right side, giving \\(x^2 + 7x = -3\\)";
    return mcq("To derive the quadratic formula from \\(x^2 + 7x + 3 = 0\\) by completing the square, what is the first move?",
      key,
      ["Add \\(\\left(\\frac{7}{2}\\right)^2\\) to both sides, giving \\(x^2 + 7x + \\frac{49}{4} = -3\\)",
       "Take the square root of both sides, giving \\(x + \\sqrt{7x} = -\\sqrt{3}\\)",
       "Divide every term by \\(7\\), giving \\(\\frac{1}{7}x^2 + x + \\frac{3}{7} = 0\\)"],
      "The equation is already monic, so no division is needed. Completing the square starts by isolating the variable terms: move the constant to the right side. Only then is \\(\\left(\\frac{7}{2}\\right)^2\\) added to both sides. The first move is: <b>move the constant term to the right side</b>.",
      {v:2, keyText:key});
  },
  function(){
    var key = "\\(x^2 - 2x + \\frac{3}{4} = 0\\)";
    return mcq("The quadratic formula is derived by completing the square. For the equation \\(4x^2 - 8x + 3 = 0\\), the derivation begins by dividing every term by \\(4\\). Which equation results?",
      key,
      ["\\(x^2 - 2x + 3 = 0\\)",
       "\\(x^2 - 8x + \\frac{3}{4} = 0\\)",
       "\\(4x^2 - 2x + \\frac{3}{4} = 0\\)"],
      "Every term, including the constant, is divided by \\(4\\): \\(4x^2 \\div 4 = x^2\\), \\(-8x \\div 4 = -2x\\) and \\(3 \\div 4 = \\frac{3}{4}\\). The result is <b>" + key + "</b>.",
      {v:3, keyText:key});
  },
  function(){
    var key = "\\(x^2 + 5x = -2\\)";
    return mcq("Following the derivation of the quadratic formula, the equation \\(2x^2 + 10x + 4 = 0\\) is divided by \\(2\\) and then the constant term is moved to the right side. Which equation results?",
      key,
      ["\\(x^2 + 5x = 2\\)",
       "\\(x^2 + 10x = -2\\)",
       "\\(2x^2 + 5x = -2\\)"],
      "Dividing every term by \\(2\\) gives \\(x^2 + 5x + 2 = 0\\), and moving the constant term to the right side changes its sign: \\(x^2 + 5x = -2\\). The result is <b>" + key + "</b>.",
      {v:4, keyText:key});
  }
]));

/* ---------- 4.11: the number added when completing the square (L1) ---------- */
E("u3-derive-cts-number",3,["4.11"],1,"gen",function(){
  var b = 0, att = 0;
  while(att < 200){ att++; b = ri(-16,16); if(b !== 0 && Math.abs(b) >= 2) break; }
  var c = 0; att = 0;
  while(att < 200){ att++; c = ri(-15,15); if(c !== 0) break; }
  var ans = (b/2) * (b/2);
  var Q = u3QuadS(1, b, c);
  return numq("A student derives the quadratic formula by completing the square on \\(" + Q + " = 0\\). After the constant term is moved to the right side, what number must be added to both sides to complete the square?",
    ans, 0.001,
    "Completing the square on \\(x^2 " + (b < 0 ? "- " + (-b) : "+ " + b) + "x\\) means adding the square of half the coefficient of \\(x\\). Half of \\(" + b + "\\) is \\(" + (b/2) + "\\), and its square is:" +
    "\\[ \\begin{aligned} \\left(\\frac{" + b + "}{2}\\right)^2 &= " + ans + " \\end{aligned} \\]" +
    "So the number added to both sides is <b>" + ans + "</b>.",
    {b:b, c:c, ans:ans});
});

/* ---------- 4.11: the late steps of the derivation (L2, var) ---------- */
// VARIANTS: 4 (combining over a common denominator; the step after the squared equation; the final isolation step; the line that completes the square)
E("u3-derive-late-steps",3,["4.11"],2,"var",varset([
  function(){
    var key = "\\(\\frac{b^2 - 4ac}{4a^2}\\)";
    return mcq("In the derivation of the quadratic formula, the right side \\(-\\frac{c}{a} + \\left(\\frac{b}{2a}\\right)^2\\) is written as a single fraction. Which expression is the result?",
      key,
      ["\\(\\frac{b^2 - 4ac}{2a}\\)",
       "\\(\\frac{b^2 + 4ac}{4a^2}\\)",
       "\\(\\frac{b^2 - c}{4a^2}\\)"],
      "Write both terms over the common denominator \\(4a^2\\): \\(-\\frac{c}{a} = -\\frac{4ac}{4a^2}\\) and \\(\\left(\\frac{b}{2a}\\right)^2 = \\frac{b^2}{4a^2}\\). Adding gives <b>" + key + "</b>, which is where the discriminant \\(b^2 - 4ac\\) first appears.",
      {v:1, keyText:key});
  },
  function(){
    var key = "Take the square root of both sides, giving \\(x + \\frac{b}{2a} = \\pm \\frac{\\sqrt{b^2 - 4ac}}{2a}\\)";
    return mcq("The derivation of the quadratic formula reaches \\(\\left(x + \\frac{b}{2a}\\right)^2 = \\frac{b^2 - 4ac}{4a^2}\\). What is the next step?",
      key,
      ["Add \\(\\frac{b}{2a}\\) to both sides, giving \\(x + \\frac{b}{2a} = \\pm \\frac{\\sqrt{b^2 - 4ac}}{2a}\\)",
       "Multiply both sides by \\(4a^2\\), giving \\(x + \\frac{b}{2a} = \\pm \\frac{\\sqrt{b^2 - 4ac}}{2a}\\)",
       "Square both sides a second time, giving \\(x + \\frac{b}{2a} = \\pm \\frac{\\sqrt{b^2 - 4ac}}{2a}\\)"],
      "The squared expression is undone by taking the square root of both sides, with \\(\\pm\\) for the two possibilities, and \\(\\sqrt{4a^2} = 2a\\) in the denominator. The next step is: <b>take the square root of both sides</b>.",
      {v:2, keyText:key});
  },
  function(){
    var key = "Subtract \\(\\frac{b}{2a}\\) from both sides";
    return mcq("Near the end of the derivation, the equation reads \\(x + \\frac{b}{2a} = \\pm \\frac{\\sqrt{b^2 - 4ac}}{2a}\\). Which operation isolates \\(x\\) and completes the formula?",
      key,
      ["Add \\(\\frac{b}{2a}\\) to both sides as well",
       "Multiply both sides by \\(2a\\) and simplify",
       "Divide both sides by the coefficient \\(b\\)"],
      "The term \\(\\frac{b}{2a}\\) is added to \\(x\\) on the left, so it is removed by subtracting it from both sides, leaving \\(x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\). The operation is: <b>subtract \\(\\frac{b}{2a}\\) from both sides</b>.",
      {v:3, keyText:key});
  },
  function(){
    var key = "\\(x^2 + \\frac{b}{a}x + \\frac{b^2}{4a^2} = -\\frac{c}{a} + \\frac{b^2}{4a^2}\\)";
    return mcq("In the derivation, the equation \\(x^2 + \\frac{b}{a}x = -\\frac{c}{a}\\) has the square completed on it. Which line results?",
      key,
      ["\\(x^2 + \\frac{b}{a}x + \\frac{b^2}{2a} = -\\frac{c}{a} + \\frac{b^2}{4a^2}\\)",
       "\\(x^2 + \\frac{b}{a}x + \\frac{b^2}{4a^2} = -\\frac{c}{a}\\)",
       "\\(x^2 + \\frac{b}{a}x + \\frac{b}{a} = -\\frac{c}{a} + \\frac{b^2}{4a^2}\\)"],
      "Completing the square adds \\(\\left(\\frac{b}{2a}\\right)^2 = \\frac{b^2}{4a^2}\\) to BOTH sides, keeping the equation balanced. The resulting line is <b>" + key + "</b>.",
      {v:4, keyText:key});
  }
]));

/* ---------- 4.11: run the derivation's steps on a concrete non-monic equation (L2) ---------- */
E("u3-derive-apply",3,["4.11"],2,"gen",function(){
  var a = pick([2,4]), m = 0, att = 0;
  while(att < 200){ att++; m = ri(-4,4); if(m !== 0) break; }
  var K = pick([4,9,16,25]), sK = Math.sqrt(K);
  var c = a * (m*m - K), b = 2 * a * m;
  var Q = u3QuadS(a, b, c);
  function sqForm(h, KK){ return "\\((x " + (h < 0 ? "- " + (-h) : "+ " + h) + ")^2 = " + KK + "\\)"; }
  var key = sqForm(m, K);
  var cands = [ sqForm(-m, K), sqForm(b/2, K), sqForm(m, m*m + c/a + 2*K) ];
  return mcq("A student solves \\(" + Q + " = 0\\) by completing the square, following the same steps used to derive the quadratic formula. After every term is divided by \\(" + a + "\\) and the square is completed, which equation results?",
    key, u3Opts(key, cands),
    "Divide every term by \\(" + a + "\\), move the constant, then add the square of half the new coefficient of \\(x\\), which is \\(\\left(\\frac{" + (b/a) + "}{2}\\right)^2 = " + (m*m) + "\\):" +
    "\\[ \\begin{aligned} " + Q + " &= 0 \\\\ x^2 " + (b/a < 0 ? "- " + (-(b/a)) : "+ " + (b/a)) + "x " + (c/a < 0 ? "- " + (-(c/a)) : "+ " + (c/a)) + " &= 0 \\\\ (x " + (m < 0 ? "- " + (-m) : "+ " + m) + ")^2 &= " + K + " \\end{aligned} \\]" +
    "So the equation becomes <b>" + key + "</b>.",
    {a:a, b:b, c:c, m:m, K:K});
});

/* ---------- 4.11: what the derivation itself shows (L3, var) ---------- */
// VARIANTS: 4 (where the discriminant first appears; the formula's range of validity; where real roots are decided; the a = 0 claim)
E("u3-derive-discriminant-origin",3,["4.11"],3,"var",varset([
  function(){
    var key = "When \\(-\\frac{c}{a}\\) and \\(\\left(\\frac{b}{2a}\\right)^2\\) are combined over the common denominator \\(4a^2\\)";
    return mcq("In the derivation of the quadratic formula, the expression \\(b^2 - 4ac\\) appears for the first time at one particular step. At which step?",
      key,
      ["When every term of the equation is divided by \\(a\\) at the start of the derivation, before the square is completed",
       "When the square root of both sides is taken near the end of the derivation, after the square is completed",
       "When the finished formula is checked at the end by substituting it back into the original equation"],
      "Combining the two right-side terms over the common denominator \\(4a^2\\) gives \\(\\frac{b^2 - 4ac}{4a^2}\\), and the numerator of that fraction is the discriminant. It is created by the common-denominator step: <b>when the two terms are combined over \\(4a^2\\)</b>.",
      {v:1, keyText:key});
  },
  function(){
    var key = "It applies to every quadratic equation with \\(a \\ne 0\\), because the derivation uses no property of the particular coefficients";
    return mcq("The quadratic formula is derived once, for the general equation \\(ax^2 + bx + c = 0\\). What does the derivation establish about the formula?",
      key,
      ["It applies only to quadratic equations whose coefficients are integers, because the derivation uses no property of the particular coefficients",
       "It applies only to quadratic equations that factor over the integers, because the derivation uses no property of the particular coefficients",
       "It applies only when the discriminant is positive, because the derivation uses no property of the particular coefficients"],
      "The derivation manipulates the symbols \\(a\\), \\(b\\) and \\(c\\) without assuming anything about their values beyond \\(a \\ne 0\\). That is what makes the result a formula: <b>it applies to every quadratic equation with \\(a \\ne 0\\)</b>.",
      {v:2, keyText:key});
  },
  function(){
    var key = "When the square root is taken: a real result exists only if \\(b^2 - 4ac \\ge 0\\), which is decided by the sign of the discriminant";
    return mcq("At which step of the derivation does the question of whether the roots are real numbers arise?",
      key,
      ["When the equation is divided by \\(a\\): a real result exists only if \\(b^2 - 4ac \\ge 0\\), which is decided by the sign of the discriminant",
       "When the square is completed: a real result exists only if \\(b^2 - 4ac \\ge 0\\), which is decided by the sign of the discriminant",
       "When \\(x\\) is isolated at the end: a real result exists only if \\(b^2 - 4ac \\ge 0\\), which is decided by the sign of the discriminant"],
      "Every step before the square root is taken works for any coefficients. The square root of \\(\\frac{b^2 - 4ac}{4a^2}\\) is a real number only when \\(b^2 - 4ac \\ge 0\\). So the reality of the roots is decided <b>when the square root is taken</b>.",
      {v:3, keyText:key});
  },
  function(){
    var key = "It does not: the first step divides by \\(a\\), and with \\(a = 0\\) the equation is linear, not quadratic, so the formula does not apply";
    return mcq("A student claims the derivation shows the quadratic formula also works when \\(a = 0\\). Which statement is correct?",
      key,
      ["It does: the first step divides by \\(a\\), and with \\(a = 0\\) the equation is linear, not quadratic, so the formula does not apply",
       "It does not: the last step divides by \\(a\\), and with \\(a = 0\\) the equation is linear, not quadratic, so the formula does not apply",
       "It does not: the first step divides by \\(a\\), and with \\(a = 0\\) the equation is quadratic, not linear, so the formula does not apply"],
      "The derivation's first step is division by \\(a\\), which is impossible when \\(a = 0\\); and an equation with \\(a = 0\\) has no \\(x^2\\) term, so it is linear. The correct statement is: <b>the formula does not apply when \\(a = 0\\)</b>.",
      {v:4, keyText:key});
  }
]));

/* ================= 4.12 (5 new) ================= */

/* ---------- 4.12: find the error in an expansion of factored form (L1) ---------- */
E("u3-error-expand",3,["4.12"],1,"gen",function(){
  var r1 = 0, r2 = 0, att = 0;
  while(att < 200){ att++; r1 = ri(-8,8); r2 = ri(-8,8);
    if(r1 !== 0 && r2 !== 0 && r1 !== r2 && r1 + r2 !== 0) break; }
  var B = -(r1 + r2), C = r1 * r2;
  var mut = pick(["bSign","cSign","bArith","cArith"]);
  var sB = B, sC = C;
  if(mut === "bSign") sB = -B;
  if(mut === "cSign") sC = -C;
  if(mut === "bArith") sB = B + pick([-2,-1,1,2]);
  if(mut === "cArith") sC = C + pick([-3,-2,-1,1,2,3]);
  var fac = u3TwoFac(u3FacS(r1), u3FacS(r2));
  var shown = u3QuadS(1, sB, sC), right = u3QuadS(1, B, C);
  var stmtB = "The coefficient of \\(x\\) is wrong: it should be \\(" + B + "\\)";
  var stmtC = "The constant term is wrong: it should be \\(" + C + "\\) instead";
  var key = (mut === "bSign" || mut === "bArith") ? stmtB : stmtC;
  var cands = [ (mut === "bSign" || mut === "bArith") ? stmtC : stmtB,
                "Both the coefficient of \\(x\\) and the constant term are wrong",
                "The coefficient of \\(x^2\\) is wrong: it should be \\(2\\)" ];
  return mcq("A student expands \\(" + fac + "\\). The work is shown below.<br>\\(" + fac + " = " + shown + "\\)<br>The expansion contains exactly one error. Which statement identifies the error?",
    key, cands,
    "Expanding carefully: each term of the first factor multiplies each term of the second, giving \\(" + fac + " = " + right + "\\). Comparing term by term with the work shown, <b>" + key.charAt(0).toLowerCase() + key.slice(1) + "</b>.",
    {r1:r1, r2:r2, mut:mut, B:B, C:C, sB:sB, sC:sC, keyText:key});
});

/* ---------- 4.12: find the error in a discriminant computation (L2) ---------- */
E("u3-error-discriminant",3,["4.12"],2,"gen",function(){
  var a = ri(1,3), b = ri(-10,10), c = 0, att = 0;
  while(att < 300){ att++; c = ri(-10,10);
    if(c !== 0 && b !== 0) break; }
  var D = b*b - 4*a*c;
  var mut = pick(["sign","arith","concl"]);
  var Dshown = D, concl;
  var nature = D > 0 ? "two distinct real roots" : D === 0 ? "one repeated real root" : "no real roots";
  if(mut === "sign") Dshown = b*b + 4*a*c;
  if(mut === "arith"){ var bs = b + (b < 0 ? -1 : 1); Dshown = bs*bs - 4*a*c; }
  var natShown = nature;
  if(mut === "concl") natShown = D >= 0 ? "no real roots" : "two distinct real roots";
  concl = "So the equation has " + natShown + ".";
  var lines = ["\\(b^2 - 4ac = (" + b + ")^2 - 4(" + a + ")(" + c + ")\\)",
               "\\(b^2 - 4ac = " + Dshown + "\\)",
               concl];
  var stem = "A student uses the discriminant to determine the nature of the roots of \\(" + u3QuadS(a,b,c) + " = 0\\). The work is shown below.<br>" +
    lines.map(function(L, i){ return "<b>Line " + (i+1) + ":</b> " + L; }).join("<br>") +
    "<br>The work contains exactly one error. Which statement identifies the error?";
  var cat = { sign: "Line 2 drops the sign of the last term when substituting: with \\(c = " + c + "\\), the product \\(-4(" + a + ")(" + c + ")\\) is \\(" + (-4*a*c) + "\\), so the discriminant is \\(" + D + "\\)",
              arith: "Line 2 squares \\(b\\) incorrectly when the discriminant is worked out: \\((" + b + ")^2 = " + (b*b) + "\\), and with the correct value the discriminant is \\(" + D + "\\)",
              concl: "Line 3 states the wrong conclusion: a discriminant of \\(" + D + "\\) means the equation has " + nature };
  var key = cat[mut];
  var cands = ["sign","arith","concl"].filter(function(x){ return x !== mut; }).map(function(x){ return cat[x]; });
  cands.push("Line 1 substitutes the wrong value for \\(b\\): the coefficient of \\(x\\) is \\(" + (-b) + "\\), not \\(" + b + "\\)");
  return mcq(stem, key, cands,
    "The discriminant is \\(b^2 - 4ac = (" + b + ")^2 - 4(" + a + ")(" + c + ") = " + D + "\\), so the equation has " + nature + ". Comparing with the work shown, the error is: <b>" + key + "</b>.",
    {a:a, b:b, c:c, D:D, mut:mut, keyText:key});
});

/* ---------- 4.12: find the error in the final reduction of a formula solution (L2) ---------- */
E("u3-error-reduce",3,["4.12"],2,"gen",function(){
  var A = pick([1,2]), r1 = 0, r2 = 0, att = 0;
  while(att < 200){ att++; r1 = ri(2,7); r2 = ri(3,8);
    if(r1 < r2) break; }
  var B = -A*(r1 + r2), C = A*r1*r2, D = A*A*(r2 - r1)*(r2 - r1), s = A*(r2 - r1), base = -B;
  var mut = pick(["firstOnly","rootDen","addDen"]);
  var plus, minus;
  if(mut === "firstOnly"){ plus = "" + (base/(2*A) + s); minus = "" + (base/(2*A) - s); }
  else if(mut === "rootDen"){ plus = u3FracS(base + 2*s, 2*A); minus = u3FracS(base - 2*s, 2*A); }
  else { plus = "" + (r1 + 2*A); minus = "" + (r2 + 2*A); var tmp = plus; plus = "" + (r2 + 2*A); minus = "" + (r1 + 2*A); }
  var lines = ["\\(x = \\frac{-(" + B + ") \\pm \\sqrt{(" + B + ")^2 - 4(" + A + ")(" + C + ")}}{2(" + A + ")}\\)",
               "\\(x = \\frac{" + base + " \\pm " + s + "}{" + (2*A) + "}\\)",
               "\\(x = " + plus + " \\text{ or } x = " + minus + "\\)"];
  var stem = "A student solves \\(" + u3QuadS(A,B,C) + " = 0\\) using the quadratic formula. Lines 1 and 2 are correct. The work is shown below.<br>" +
    lines.map(function(L, i){ return "<b>Line " + (i+1) + ":</b> " + L; }).join("<br>") +
    "<br>Line 3 contains exactly one error. Which statement identifies the error?";
  var cat = { firstOnly: "Line 3 divides only the first term of the numerator by \\(" + (2*A) + "\\): the whole numerator, including the \\(\\pm " + s + "\\) part, must be divided",
              rootDen: "Line 3 divides the square root term by \\(" + A + "\\) instead of \\(" + (2*A) + "\\): every term of the numerator shares the denominator \\(" + (2*A) + "\\)",
              addDen: "Line 3 adds the denominator to the roots instead of dividing by it: the values from Line 2 must be divided by \\(" + (2*A) + "\\), not increased by it" };
  var key = cat[mut];
  var cands = ["firstOnly","rootDen","addDen"].filter(function(x){ return x !== mut; }).map(function(x){ return cat[x]; });
  cands.push("Line 3 changes the signs of both roots when the final answer is stated in the last line");
  return mcq(stem, key, cands,
    "From Line 2, \\(x = \\frac{" + base + " + " + s + "}{" + (2*A) + "} = " + r2 + "\\) or \\(x = \\frac{" + base + " - " + s + "}{" + (2*A) + "} = " + r1 + "\\). The error is: <b>" + key + "</b>.",
    {A:A, B:B, C:C, r1:r1, r2:r2, mut:mut, keyText:key});
});

/* ---------- 4.12: find the error in completing the square with a not 1 (L3) ---------- */
E("u3-error-cts-nonmonic",3,["4.12"],3,"gen",function(){
  var a = pick([2,3]), t1 = 0, t2 = 0, att = 0;
  while(att < 300){ att++; t1 = ri(-7,7); t2 = ri(-7,7);
    if(t1 !== t2 && ((t1 + t2) % 2 === 0)) break; }
  var B = -a*(t1 + t2), C = a*t1*t2, Q = u3QuadS(a, B, C);
  var Ba = B/a, Ca = C/a, h = Ba/2, hSq = h*h, s2 = Math.abs(t2 - t1)/2;
  function linX(coef){ return "x^2 " + (coef < 0 ? "- " + (-coef) : "+ " + coef) + "x"; }
  function sqBin(hh){ return "(x " + (hh < 0 ? "- " + (-hh) : "+ " + hh) + ")^2"; }
  var mut = pick(["constNotDivided","wrongHalf","oneSide"]);
  var lines;
  if(mut === "constNotDivided"){
    lines = ["\\(" + linX(Ba) + " " + (C < 0 ? "- " + (-C) : "+ " + C) + " = 0\\)",
             "\\(" + linX(Ba) + " + " + hSq + " = " + (-C) + " + " + hSq + "\\)",
             "\\(" + sqBin(h) + " = " + (-C + hSq) + "\\)"];
  } else if(mut === "wrongHalf"){
    var wH = (B/2)*(B/2);
    lines = ["\\(" + linX(Ba) + " = " + (-Ca) + "\\)",
             "\\(" + linX(Ba) + " + " + wH + " = " + (-Ca) + " + " + wH + "\\)",
             "\\(" + sqBin(h) + " = " + (-Ca + wH) + "\\)"];
  } else {
    lines = ["\\(" + linX(Ba) + " = " + (-Ca) + "\\)",
             "\\(" + linX(Ba) + " + " + hSq + " = " + (-Ca) + "\\)",
             "\\(" + sqBin(h) + " = " + (-Ca) + "\\)"];
  }
  var stem = "A student solves \\(" + Q + " = 0\\) by completing the square. The work is shown below.<br>" +
    lines.map(function(L, i){ return "<b>Line " + (i+1) + ":</b> " + L; }).join("<br>") +
    "<br>The work contains exactly one error. Which statement identifies the error?";
  var cat = { constNotDivided: "Line 1 divides the \\(x^2\\) and \\(x\\) terms by \\(" + a + "\\) but leaves the constant term undivided: every term of the equation must be divided by the same number, so the constant should be \\(" + Ca + "\\)",
              wrongHalf: "Line 2 adds \\(\\left(\\frac{" + B + "}{2}\\right)^2 = " + ((B/2)*(B/2)) + "\\), built from the original coefficient of \\(x\\), instead of the square of half the divided coefficient, \\(\\left(\\frac{" + Ba + "}{2}\\right)^2 = " + hSq + "\\)",
              oneSide: "Line 2 adds \\(" + hSq + "\\) to the left side only: the same amount must be added to the right side to keep the equation balanced" };
  var key = cat[mut];
  var cands = ["constNotDivided","wrongHalf","oneSide"].filter(function(x){ return x !== mut; }).map(function(x){ return cat[x]; });
  cands.push("Line 1 moves the constant term to the right side without changing its sign to the opposite one");
  return mcq(stem, key, cands,
    "Dividing every term by \\(" + a + "\\) gives \\(" + linX(Ba) + " = " + (-Ca) + "\\); half of \\(" + Ba + "\\) is \\(" + h + "\\), whose square is \\(" + hSq + "\\), and it must be added to both sides, giving \\(" + sqBin(h) + " = " + (s2*s2) + "\\). The correct roots are \\(x = " + t1 + "\\) and \\(x = " + t2 + "\\). The error is: <b>" + key + "</b>.",
    {a:a, t1:t1, t2:t2, mut:mut, keyText:key});
});

/* ---------- 4.12: find the error in a solution read from a graph (L3, var) ---------- */
// VARIANTS: 4 (vertex read as the only root; no crossing read as two roots; zeros stated as points; tangent read as no solution)
E("u3-error-graph-read",3,["4.12"],3,"var",varset([
  function(){
    var key = "The student read the vertex as a root: the vertex is the turning point, and the roots are where the graph crosses the x-axis, at x = -3 and x = 2";
    var q = mcq("A student solves \\(f(x) = 0\\) from the graph of \\(f\\), shown below. The student states: \"The equation has one solution, \\(x = -0.5\\), because the lowest point of the graph is \\((-0.5, -6.25)\\).\" Which statement identifies the error?",
      key,
      ["The student read the y-intercept as a root: the y-intercept is where the graph crosses the y-axis, and the roots are where the graph crosses the x-axis, at x = -3 and x = 2",
       "The student read the vertex as a root: the vertex is the turning point, and the roots are where the graph crosses the x-axis, at x = -6 and x = 1",
       "The student used the wrong sign for the roots: the vertex is the turning point, and the roots are where the graph crosses the x-axis, at x = 3 and x = -2"],
      "The lowest point is the vertex, not a root. Roots of \\(f(x) = 0\\) are read where the graph meets the x-axis, here at \\(x = -3\\) and \\(x = 2\\). The error is: <b>the student read the vertex as a root</b>.",
      {v:1, keyText:key, a:1, b:1, c:-6});
    q.figure = parSVG(1, 1, -6, {marks: [{x: -3, y: 0}, {x: 2, y: 0}]});
    return q;
  },
  function(){
    var key = "The graph never meets the x-axis, so there are no roots to read: the equation has no real solutions, whatever the vertex is";
    var q = mcq("A student solves \\(f(x) = 0\\) from the graph of \\(f\\), shown below. The student states: \"The solutions are \\(x = 1 - 2 = -1\\) and \\(x = 1 + 2 = 3\\), two units either side of the vertex.\" Which statement identifies the error?",
      key,
      ["The graph never meets the x-axis, so the roots are the two y-intercepts: the equation has no real solutions, whatever the vertex is",
       "The student measured from the wrong point: the solutions are read two units either side of the y-intercept, whatever the vertex is",
       "The student used the wrong distance: the solutions are one unit either side of the vertex, at x = 0 and x = 2, whatever the vertex is"],
      "The parabola opens upward with its vertex above the x-axis, so it never crosses or touches the axis: there are no x-intercepts and hence no real roots. The error is: <b>the graph never meets the x-axis, so the equation has no real solutions</b>.",
      {v:2, keyText:key, a:1, b:-2, c:4});
    q.figure = parSVG(1, -2, 4, {});
    return q;
  },
  function(){
    var key = "The zeros of a function are values of x, not points: the zeros are x = 1 and x = 4, while (1, 0) and (4, 0) are the x-intercepts as points";
    var q = mcq("A student is asked for the zeros of the function \\(f\\) whose graph is shown below. The student states: \"The zeros are \\((1, 0)\\) and \\((4, 0)\\).\" Which statement identifies the error?",
      key,
      ["The zeros of a function are values of x, not points: the zeros are x = 1 and x = -4, while (1, 0) and (4, 0) are the x-intercepts as points",
       "The zeros of a function are values of y, not points: the zeros are y = 1 and y = 4, while (1, 0) and (4, 0) are the x-intercepts as points",
       "The zeros of a function are values of x, not points: the zeros are x = 0 and x = 4, while (1, 0) and (4, 0) are the x-intercepts as points"],
      "An x-intercept can be named as a point, \\((1, 0)\\) or \\((4, 0)\\), but a zero of a function is the input value itself. The error is: <b>the zeros are the values \\(x = 1\\) and \\(x = 4\\), not the points</b>.",
      {v:3, keyText:key, a:1, b:-5, c:4});
    q.figure = parSVG(1, -5, 4, {marks: [{x: 1, y: 0}, {x: 4, y: 0}]});
    return q;
  },
  function(){
    var key = "Touching the x-axis still gives a root: the graph meets the axis at x = 3, so the equation has the repeated solution x = 3";
    var q = mcq("A student solves \\(f(x) = 0\\) from the graph of \\(f\\), shown below. The student states: \"The graph touches the x-axis but does not cross it, so the equation has no solutions.\" Which statement identifies the error?",
      key,
      ["Touching the x-axis still gives a root: the graph meets the axis at x = -3, so the equation has the repeated solution x = 3",
       "Crossing the x-axis still gives a root: the graph meets the axis at x = 3, so the equation has the repeated solution x = 3",
       "Touching the x-axis still gives a root: the graph meets the axis at x = 3, so the equation has the repeated solution x = -3"],
      "A zero occurs wherever the graph meets the x-axis, crossing or touching. Here the vertex rests on the axis at \\(x = 3\\), which is a repeated root. The error is: <b>touching the x-axis still gives a root, the repeated solution \\(x = 3\\)</b>.",
      {v:4, keyText:key, a:1, b:-6, c:9});
    q.figure = parSVG(1, -6, 9, {marks: [{x: 3, y: 0}]});
    return q;
  }
]));

/* ================= 4.13 (5 new) ================= */

/* ---------- 4.13: verify a claimed solution by substitution (L1) ---------- */
E("u3-method-verify-check",3,["4.13"],1,"gen",function(){
  var r1 = 0, r2 = 0, att = 0;
  while(att < 200){ att++; r1 = ri(-8,8); r2 = ri(-8,8);
    if(r1 !== 0 && r2 !== 0 && r1 !== r2) break; }
  var B = -(r1 + r2), C = r1 * r2, Q = u3QuadS(1, B, C);
  var wCands = shuffle([-r1, -r2, r1 + 1, r1 - 1, r2 + 1, r2 - 1, 0, r1 + r2]);
  var w = null;
  for(var wi = 0; wi < wCands.length; wi++){ if(wCands[wi] !== r1 && wCands[wi] !== r2){ w = wCands[wi]; break; } }
  var V = w*w + B*w + C;
  var key = "The claim is incorrect, because substituting \\(x = " + w + "\\) gives \\(" + V + "\\), not 0";
  var cands = [ "The claim is correct, because substituting \\(x = " + w + "\\) gives \\(" + V + "\\), not 0",
                "The claim is incorrect, because substituting \\(x = " + w + "\\) gives \\(" + (-V) + "\\), not 0",
                "The claim is correct, because substituting \\(x = " + w + "\\) gives 0, as required" ];
  return mcq("A student claims that \\(x = " + w + "\\) is a solution of \\(" + Q + " = 0\\). Which statement is correct?",
    key, cands,
    "Verify by substituting into the original equation:" +
    "\\[ \\begin{aligned} (" + w + ")^2 " + (B < 0 ? "- " + (-B) : "+ " + B) + "(" + w + ") " + (C < 0 ? "- " + (-C) : "+ " + C) + " &= " + V + " \\end{aligned} \\]" +
    "The result is not zero, so the claim fails the check: <b>the claim is incorrect</b>.",
    {B:B, C:C, w:w, V:V, keyText:key});
});

/* ---------- 4.13: compare two students' methods (L2, var) ---------- */
// VARIANTS: 4 (factoring against the formula on an integer-root equation; square roots against expanding; graphing against the formula for exactness; completing the square against integer factoring)
E("u3-method-compare",3,["4.13"],2,"var",varset([
  function(){
    var key = "Both methods are valid; factoring is the more direct choice here because the trinomial factors into two binomials with integer constants";
    return mcq("For the equation \\(x^2 - 5x + 6 = 0\\), Ana factors the trinomial and Ben applies the quadratic formula. Which statement compares their methods correctly?",
      key,
      ["Only the quadratic formula is valid; factoring is the more direct choice here because the trinomial factors into two binomials with integer constants",
       "Only factoring is valid; the quadratic formula is the more direct choice here because the trinomial factors into two binomials with integer constants",
       "Both methods are valid; the quadratic formula is the more direct choice here because the trinomial factors into two binomials with integer constants"],
      "Both methods solve any quadratic. Here the trinomial factors as \\((x - 2)(x - 3)\\), so factoring reaches the roots \\(x = 2\\) and \\(x = 3\\) in one step, while the formula takes several. The correct comparison is: <b>both are valid, and factoring is more direct here</b>.",
      {v:1, keyText:key});
  },
  function(){
    var key = "Both methods are valid; taking square roots is the more direct choice here because the equation is already a squared expression equal to a constant";
    return mcq("For the equation \\((x - 3)^2 = 25\\), Ana takes the square root of both sides and Ben expands the left side and then factors. Which statement compares their methods correctly?",
      key,
      ["Only taking square roots is valid; expanding is the more direct choice here because the equation is already a squared expression equal to a constant",
       "Both methods are valid; expanding is the more direct choice here because the equation is already a squared expression equal to a constant",
       "Only expanding is valid; taking square roots is the more direct choice here because the equation is already a squared expression equal to a constant"],
      "Taking square roots gives \\(x - 3 = \\pm 5\\) at once. Expanding gives \\(x^2 - 6x - 16 = 0\\), which also solves the equation but takes longer. The correct comparison is: <b>both are valid, and taking square roots is more direct here</b>.",
      {v:2, keyText:key});
  },
  function(){
    var key = "Both methods can be used; only the quadratic formula gives the exact roots, because the roots read from a graph are approximations";
    return mcq("For the equation \\(x^2 + 3x - 9 = 0\\), Ana reads the roots from a graph of the corresponding function and Ben applies the quadratic formula. Which statement compares their methods correctly?",
      key,
      ["Both methods can be used; only graphing gives the exact roots, because the roots read from a graph are approximations",
       "Only the quadratic formula can be used; only the quadratic formula gives the exact roots, because the roots read from a graph are approximations",
       "Both methods can be used; only the quadratic formula gives the exact roots, because the roots read from a graph are exact values"],
      "The roots are irrational (the discriminant is \\(45\\), not a perfect square). A graph shows where they lie, to reading accuracy only, while the formula produces \\(x = \\frac{-3 \\pm 3\\sqrt{5}}{2}\\) exactly. The correct comparison is: <b>both can be used, but only the formula gives the exact roots</b>.",
      {v:3, keyText:key});
  },
  function(){
    var key = "Completing the square works; factoring over the integers cannot, because no pair of integers multiplies to 2 and adds to 6";
    return mcq("For the equation \\(x^2 + 6x + 2 = 0\\), Ana completes the square and Ben tries to factor the trinomial over the integers. Which statement compares their methods correctly?",
      key,
      ["Completing the square works; factoring over the integers cannot, because no pair of integers multiplies to 6 and adds to 2",
       "Factoring over the integers works; completing the square cannot, because no pair of integers multiplies to 2 and adds to 6",
       "Completing the square works; factoring over the integers cannot, because no pair of integers multiplies to 2 and adds to -6"],
      "The integer pairs multiplying to \\(2\\) are \\(1, 2\\) and \\(-1, -2\\), with sums \\(3\\) and \\(-3\\), never \\(6\\), so the trinomial has no integer factorization and Ben's method cannot start. Completing the square gives \\((x + 3)^2 = 7\\). The correct comparison is: <b>completing the square works; integer factoring cannot</b>.",
      {v:4, keyText:key});
  }
]));

/* ---------- 4.13: read approximate roots from a graph and judge the method (L2) ---------- */
E("u3-method-graph-approx",3,["4.13"],2,"gen",function(){
  var a = 1, b = 0, c = 0, D = 0, att = 0;
  while(att < 600){ att++;
    b = ri(-8,8); c = ri(-9,9);
    if(c === 0 || b === 0) continue;
    D = b*b - 4*c;
    if(D <= 0) continue;
    if(u3RadParts(D)[1] <= 1) continue;
    break; }
  var sq = Math.sqrt(D);
  var lo = (-b - sq)/2, hi = (-b + sq)/2;
  var loS = fmt(lo, 1), hiS = fmt(hi, 1);
  var key = "The roots are approximately \\(x = " + loS + "\\) and \\(x = " + hiS + "\\), read from where the graph crosses the x-axis";
  var cands = [ "The roots are approximately \\(x = " + fmt(-lo, 1) + "\\) and \\(x = " + fmt(-hi, 1) + "\\), read from where the graph crosses the x-axis",
                "The roots are approximately \\(x = " + loS + "\\) and \\(x = " + hiS + "\\), read from where the graph crosses the y-axis",
                "The roots are exactly \\(x = " + loS + "\\) and \\(x = " + hiS + "\\), read from where the graph crosses the x-axis" ];
  var q = mcq("The graph of \\(f(x) = " + u3QuadS(a, b, c) + "\\) is shown. Which statement about the solutions of \\(f(x) = 0\\) is correct?",
    key, cands,
    "The solutions are the x-coordinates where the graph crosses the x-axis. Reading them off gives approximately \\(" + loS + "\\) and \\(" + hiS + "\\); the formula confirms \\(x = \\frac{" + (-b) + " \\pm \\sqrt{" + D + "}}{2}\\), which rounds to the same values. Read from a graph, they are approximations: <b>the roots are approximately \\(x = " + loS + "\\) and \\(x = " + hiS + "\\)</b>.",
    {a:a, b:b, c:c, D:D, lo:lo, hi:hi, keyText:key});
  q.figure = parSVG(a, b, c, {labels: "values", marks: [{x: lo, y: 0}, {x: hi, y: 0}]});
  return q;
});

/* ---------- 4.13: a chosen method with a flawed justification (L3, var) ---------- */
// VARIANTS: 4 (positive discriminant does not justify factoring; even a does not justify completing the square; square roots do work for non-square constants; small coefficients do not justify factoring)
E("u3-method-flawed-why",3,["4.13"],3,"var",varset([
  function(){
    var key = "Factoring is appropriate because the discriminant, 1, is a perfect square, so the roots are rational; a positive discriminant alone guarantees only that the roots are real";
    return mcq("A student chooses to factor \\(x^2 - 5x + 6 = 0\\), saying: \"Factoring works here because the discriminant is positive.\" Which statement gives the correct assessment?",
      key,
      ["Factoring is appropriate because the discriminant, 1, is positive, so the roots are rational; a positive discriminant alone guarantees only that the roots are real",
       "Factoring is not appropriate because the discriminant, 1, is a perfect square, so the roots are rational; a positive discriminant alone guarantees only that the roots are real",
       "Factoring is appropriate because the discriminant, 49, is a perfect square, so the roots are rational; a positive discriminant alone guarantees only that the roots are real"],
      "The discriminant is \\((-5)^2 - 4(1)(6) = 1\\). Positivity alone would allow irrational roots, as with a discriminant of \\(5\\); what makes factoring work is that \\(1\\) is a perfect square, so \\(\\sqrt{1}\\) is exact and the roots are rational. The correct assessment is: <b>factoring works because the discriminant is a perfect square</b>.",
      {v:1, keyText:key});
  },
  function(){
    var key = "The choice is not the most appropriate: with a = 2 and an odd coefficient of x, completing the square introduces fractions at the first step, so the quadratic formula is the more direct choice";
    return mcq("A student chooses to complete the square on \\(2x^2 + 3x - 7 = 0\\), saying: \"Completing the square is clean here because a is even.\" Which statement gives the correct assessment?",
      key,
      ["The choice is the most appropriate: with a = 2 and an odd coefficient of x, completing the square introduces fractions at the first step, so the quadratic formula is the more direct choice",
       "The choice is not the most appropriate: with a = 2 and an even coefficient of x, completing the square introduces fractions at the first step, so the quadratic formula is the more direct choice",
       "The choice is not the most appropriate: with a = 2 and an odd coefficient of x, completing the square introduces fractions at the last step, so the quadratic formula is the more direct choice"],
      "Completing the square first divides by \\(a = 2\\), giving the coefficient \\(\\frac{3}{2}\\), whose half is \\(\\frac{3}{4}\\): fractions from the first step, whatever the parity of \\(a\\). The formula handles the equation directly. The correct assessment is: <b>the formula is the more direct choice here</b>.",
      {v:2, keyText:key});
  },
  function(){
    var key = "Taking square roots is the direct method: it works for any constant on the right side, giving x = -1 plus or minus the square root of 13";
    return mcq("A student expands \\((x + 1)^2 = 13\\) and applies the quadratic formula, saying: \"Taking square roots only works when the right side is a perfect square.\" Which statement gives the correct assessment?",
      key,
      ["Taking square roots is the direct method: it works only when the right side is a perfect square, giving x = -1 plus or minus the square root of 13",
       "Expanding is the direct method: it works for any constant on the right side, giving x = -1 plus or minus the square root of 13",
       "Taking square roots is the direct method: it works for any constant on the right side, giving x = 1 plus or minus the square root of 13"],
      "Taking square roots needs no perfect square: \\((x + 1)^2 = 13\\) gives \\(x + 1 = \\pm \\sqrt{13}\\) immediately, so \\(x = -1 \\pm \\sqrt{13}\\). The stated reason is false. The correct assessment is: <b>taking square roots is the direct method, and it works for any constant</b>.",
      {v:3, keyText:key});
  },
  function(){
    var key = "No integer pair multiplies to 3 and adds to 8, so the trinomial does not factor over the integers; completing the square is clean here because a = 1 and the coefficient of x is even";
    return mcq("A student chooses to factor \\(x^2 + 8x + 3 = 0\\) over the integers, saying: \"Factoring works here because the coefficients are small.\" Which statement gives the correct assessment?",
      key,
      ["No integer pair multiplies to 8 and adds to 3, so the trinomial does not factor over the integers; completing the square is clean here because a = 1 and the coefficient of x is even",
       "No integer pair multiplies to 3 and adds to 8, so the trinomial does not factor over the integers; completing the square is clean here because a = 1 and the coefficient of x is odd",
       "An integer pair multiplies to 3 and adds to 8, so the trinomial does factor over the integers; completing the square is clean here because a = 1 and the coefficient of x is even"],
      "The pairs multiplying to \\(3\\) are \\(1, 3\\) and \\(-1, -3\\), with sums \\(4\\) and \\(-4\\), never \\(8\\): coefficient size is not the test, the factor pair is. With \\(a = 1\\) and an even \\(x\\) coefficient, completing the square stays in whole numbers. The correct assessment is: <b>the trinomial does not factor over the integers, and completing the square is clean here</b>.",
      {v:4, keyText:key});
  }
]));

/* ---------- 4.13: statements about verifying solutions (L3, var) ---------- */
// VARIANTS: 4 (substitution verifies one root at a time; the sum and product check; graph checks are approximate; each claimed root is substituted separately)
E("u3-verify-methods",3,["4.13"],3,"var",varset([
  function(){
    var key = "Substituting a claimed root into the original equation and getting 0 verifies that root, but it says nothing about any other claimed root";
    return mcq("Which statement about verifying the solutions of a quadratic equation is correct?",
      key,
      ["Substituting a claimed root into the factored form and getting 0 verifies that root, but it says nothing about any other claimed root",
       "Substituting a claimed root into the original equation and getting 0 verifies that root, and it also confirms any other claimed root",
       "Substituting a claimed root into the original equation and getting 0 verifies the method, but it says nothing about any other claimed root"],
      "Verification is value by value: a substitution that returns \\(0\\) proves that one value is a root of the original equation. It must be the original equation, not a derived form, and each claimed root needs its own check. The correct statement is: <b>substitution into the original equation verifies that root only</b>.",
      {v:1, keyText:key});
  },
  function(){
    var key = "The sum and the product of the roots can be checked against -b/a and c/a, and both must match for the pair of roots to be correct";
    return mcq("Which statement about verifying the solutions of a quadratic equation is correct?",
      key,
      ["The sum and the product of the roots can be checked against -b/a and c/a, and either one matching is enough for the pair of roots to be correct",
       "The sum and the product of the roots can be checked against b/a and c/a, and both must match for the pair of roots to be correct",
       "The sum and the product of the roots can be checked against -b/a and c/a, and both must match for the pair of roots to be correct, but only when a = 1"],
      "For \\(ax^2 + bx + c = 0\\), the roots add to \\(-\\frac{b}{a}\\) and multiply to \\(\\frac{c}{a}\\). Two numbers are pinned down by their sum and product together, so both checks must pass, for any \\(a\\). The correct statement is: <b>both the sum and the product must match</b>.",
      {v:2, keyText:key});
  },
  function(){
    var key = "Reading the roots from a graph verifies them only approximately, because the crossing points are read from a picture, not computed";
    return mcq("Which statement about verifying the solutions of a quadratic equation is correct?",
      key,
      ["Reading the roots from a graph verifies them exactly, because the crossing points are read from a picture, not computed",
       "Reading the roots from a graph verifies them only approximately, because the crossing points are computed, not read from a picture",
       "Reading the roots from a graph does not verify them at all, because the crossing points are read from a picture, not computed"],
      "A graph is a picture with reading accuracy: it can confirm that computed roots are in the right places, but it cannot certify exact values, especially irrational ones. The correct statement is: <b>a graph check is approximate only</b>.",
      {v:3, keyText:key});
  },
  function(){
    var key = "A claimed pair of roots is fully verified only when each value is substituted separately into the original equation";
    return mcq("Which statement about verifying the solutions of a quadratic equation is correct?",
      key,
      ["A claimed pair of roots is fully verified only when the two values are substituted together into the original equation",
       "A claimed pair of roots is fully verified only when each value is substituted separately into the factored equation",
       "A claimed pair of roots is fully verified only when each value is substituted separately into the original equation, and one of them checks"],
      "Each root is a separate claim about the original equation, so each must be substituted on its own, and both substitutions must return \\(0\\). The correct statement is: <b>each value is substituted separately into the original equation</b>.",
      {v:4, keyText:key});
  }
]));

/* ================= 4.14 (4 new) ================= */

/* ---------- 4.14: compute the discriminant (L1) ---------- */
E("u3-discriminant-compute",3,["4.14"],1,"gen",function(){
  var a = ri(1,4), b = ri(-12,12), c = ri(-12,12);
  var D = b*b - 4*a*c;
  return numq("What is the discriminant of the equation \\(" + u3QuadS(a,b,c) + " = 0\\)?",
    D, 0.001,
    "Substitute \\(a = " + a + "\\), \\(b = " + b + "\\) and \\(c = " + c + "\\) into \\(b^2 - 4ac\\):" +
    "\\[ \\begin{aligned} b^2 - 4ac &= (" + b + ")^2 - 4(" + a + ")(" + c + ") \\\\ &= " + D + " \\end{aligned} \\]" +
    "So the discriminant is <b>" + D + "</b>.",
    {a:a, b:b, c:c, D:D});
});

/* ---------- 4.14: the range of a parameter from a root condition (L2) ---------- */
E("u3-discriminant-range",3,["4.14"],2,"gen",function(){
  var fam = pick(["inC","inB","inA"]);
  var cond = pick(["distinct","none"]);
  var condText = cond === "distinct" ? "two distinct real roots" : "no real roots";
  var key, cands, sol, prm;
  if(fam === "inC"){
    var b = 0, att = 0;
    while(att < 200){ att++; b = ri(-13,13); if(b !== 0) break; }
    var T = (b*b)/4, Ts = u3FracS(b*b, 4);
    var ineq = cond === "distinct" ? "<" : ">";
    var ineqO = cond === "distinct" ? ">" : "<";
    key = "\\(k " + ineq + " " + Ts + "\\)";
    cands = ["\\(k " + ineqO + " " + Ts + "\\)",
             "\\(k = " + Ts + "\\)",
             "\\(k " + ineq + " " + u3FracS(-(b*b), 4) + "\\)"];
    sol = "Two distinct real roots require a positive discriminant, and no real roots require a negative one. Here:" +
      "\\[ \\begin{aligned} b^2 - 4ac &= " + (b*b) + " - 4k \\end{aligned} \\]" +
      "Setting \\(" + (b*b) + " - 4k " + (cond === "distinct" ? "> 0" : "< 0") + "\\) gives \\(k " + ineq + " " + Ts + "\\). So the equation has " + condText + " when <b>" + key + "</b>.";
    prm = {fam:fam, cond:cond, b:b, T:T, keyText:key};
    return mcq("For which values of \\(k\\) does the equation \\(x^2 " + (b < 0 ? "- " + (-b) : "+ " + b) + "x + k = 0\\) have " + condText + "?",
      key, cands, sol, prm);
  }
  if(fam === "inB"){
    var s = ri(2,7), cc = s*s, T2 = 2*s;
    var keyBody = cond === "distinct" ? "k < -" + T2 + " \\text{ or } k > " + T2 : "-" + T2 + " < k \\text{ and } k < " + T2;
    var altBody = cond === "distinct" ? "-" + T2 + " < k \\text{ and } k < " + T2 : "k < -" + T2 + " \\text{ or } k > " + T2;
    key = "\\(" + keyBody + "\\)";
    cands = ["\\(" + altBody + "\\)",
             "\\(k \\le -" + T2 + " \\text{ or } k \\ge " + T2 + "\\)",
             "\\(k = -" + T2 + " \\text{ or } k = " + T2 + "\\)"];
    sol = "The discriminant is \\(k^2 - 4(1)(" + cc + ") = k^2 - " + (4*cc) + "\\). " +
      (cond === "distinct" ? "Two distinct real roots require \\(k^2 - " + (4*cc) + " > 0\\), that is \\(|k| > " + T2 + "\\)." : "No real roots require \\(k^2 - " + (4*cc) + " < 0\\), that is \\(|k| < " + T2 + "\\).") +
      " So the equation has " + condText + " when <b>" + key + "</b>.";
    prm = {fam:fam, cond:cond, s:s, T:T2, keyText:key};
    return mcq("For which values of \\(k\\) does the equation \\(x^2 + kx + " + cc + " = 0\\) have " + condText + "?",
      key, cands, sol, prm);
  }
  var bA = pick([4,6,8,10,12]), cA = pick([1,2,3,4,6]);
  while((bA*bA) % (4*cA) !== 0){ cA = pick([1,2,3,4,6]); }
  var TA = (bA*bA)/(4*cA);
  var ineqA = cond === "distinct" ? "<" : ">", ineqAO = cond === "distinct" ? ">" : "<";
  key = "\\(k " + ineqA + " " + TA + "\\)";
  cands = ["\\(k " + ineqAO + " " + TA + "\\)",
           "\\(k = " + TA + "\\)",
           "\\(k " + ineqA + " " + (TA + cA) + "\\)"];
  sol = "The discriminant is \\((" + bA + ")^2 - 4(k)(" + cA + ") = " + (bA*bA) + " - " + (4*cA) + "k\\). " +
    (cond === "distinct" ? "Two distinct real roots require this to be positive" : "No real roots require this to be negative") +
    ", giving \\(k " + ineqA + " " + TA + "\\). So the equation has " + condText + " when <b>" + key + "</b>.";
  prm = {fam:fam, cond:cond, b:bA, c:cA, T:TA, keyText:key};
  return mcq("For which values of \\(k\\) does the equation \\(kx^2 + " + bA + "x + " + cA + " = 0\\) have " + condText + "?",
    key, cands, sol, prm);
});

/* ---------- 4.14: equal roots with the parameter in two places (L3) ---------- */
E("u3-discriminant-param",3,["4.14"],3,"gen",function(){
  var fam = pick(["inB","inA"]);
  if(fam === "inB"){
    var m = ri(1,5), s = ri(2,6), ask = pick(["larger","smaller"]);
    var k1 = 2*s - m, k2 = -2*s - m;
    var kAns = ask === "larger" ? k1 : k2;
    return numq("The equation \\(x^2 + (k + " + m + ")x + " + (s*s) + " = 0\\) has two equal real roots. What is the " + ask + " value of \\(k\\)?",
      kAns, 0.001,
      "Equal roots require a discriminant of zero:" +
      "\\[ \\begin{aligned} (k + " + m + ")^2 - 4(1)(" + (s*s) + ") &= 0 \\\\ (k + " + m + ")^2 &= " + (4*s*s) + " \\\\ k + " + m + " &= \\pm " + (2*s) + " \\end{aligned} \\]" +
      "So \\(k = " + k1 + "\\) or \\(k = " + k2 + "\\). The " + ask + " value is <b>\\(k = " + kAns + "\\)</b>.",
      {fam:fam, m:m, s:s, ask:ask, kAns:kAns, kOther: ask === "larger" ? k2 : k1});
  }
  var bB = pick([4,6,8,10,12]), cB = pick([1,2,4]);
  while((bB*bB) % (4*cB) !== 0){ cB = pick([1,2,4]); }
  var kB = (bB*bB)/(4*cB);
  return numq("The equation \\(kx^2 + " + bB + "x + " + cB + " = 0\\) has two equal real roots. What is the value of \\(k\\)?",
    kB, 0.001,
    "Equal roots require a discriminant of zero:" +
    "\\[ \\begin{aligned} (" + bB + ")^2 - 4(k)(" + cB + ") &= 0 \\\\ " + (bB*bB) + " &= " + (4*cB) + "k \\\\ k &= " + kB + " \\end{aligned} \\]" +
    "So <b>\\(k = " + kB + "\\)</b>.",
    {fam:fam, b:bB, c:cB, kAns:kB});
});

/* ---------- 4.14: what a discriminant value tells you (L3, var) ---------- */
// VARIANTS: 4 (perfect square discriminant; positive non-square; zero; negative)
E("u3-discriminant-statements",3,["4.14"],2,"var",varset([
  function(){
    var key = "The roots are rational, because 49 is a perfect square, so the square root of the discriminant is a whole number";
    return mcq("A quadratic equation with integer coefficients has discriminant \\(49\\). Which conclusion follows?",
      key,
      ["The roots are irrational, because 49 is a perfect square, so the square root of the discriminant is a whole number",
       "The roots are equal, because 49 is a perfect square, so the square root of the discriminant is a whole number",
       "The roots are rational, because 49 is positive, so the square root of the discriminant is a whole number"],
      "In the quadratic formula the discriminant sits under a square root. Since \\(\\sqrt{49} = 7\\) exactly, the roots are rational numbers. The conclusion is: <b>the roots are rational, because 49 is a perfect square</b>.",
      {v:1, keyText:key, D:49});
  },
  function(){
    var key = "The roots are irrational, because 20 is positive but not a perfect square, so its square root is irrational";
    return mcq("A quadratic equation with integer coefficients has discriminant \\(20\\). Which conclusion follows?",
      key,
      ["The roots are rational, because 20 is positive but not a perfect square, so its square root is irrational",
       "The roots are equal, because 20 is positive but not a perfect square, so its square root is irrational",
       "The roots are irrational, because 20 is a perfect square, so its square root is irrational"],
      "A positive discriminant gives two distinct real roots, and \\(\\sqrt{20}\\) is irrational, so the roots produced by the formula are irrational. The conclusion is: <b>the roots are irrational, because 20 is not a perfect square</b>.",
      {v:2, keyText:key, D:20});
  },
  function(){
    var key = "The equation has one repeated root, and the graph of the corresponding function touches the x-axis at its vertex";
    return mcq("A quadratic equation has discriminant \\(0\\). Which conclusion follows?",
      key,
      ["The equation has two distinct roots, and the graph of the corresponding function touches the x-axis at its vertex",
       "The equation has one repeated root, and the graph of the corresponding function crosses the x-axis at its vertex",
       "The equation has no real roots, and the graph of the corresponding function touches the x-axis at its vertex"],
      "A discriminant of zero puts a single value, \\(x = -\\frac{b}{2a}\\), in the formula, and that value is the vertex's x-coordinate: the graph rises or falls to the axis and turns there. The conclusion is: <b>one repeated root, with the graph touching the x-axis at its vertex</b>.",
      {v:3, keyText:key, D:0});
  },
  function(){
    var key = "The equation has no real roots, and the graph of the corresponding function has no x-intercepts";
    return mcq("A quadratic equation has discriminant \\(-9\\). Which conclusion follows?",
      key,
      ["The equation has roots \\(3\\) and \\(-3\\), and the graph of the corresponding function has no x-intercepts",
       "The equation has no real roots, and the graph of the corresponding function has two x-intercepts",
       "The equation has one repeated root, and the graph of the corresponding function has no x-intercepts"],
      "A negative discriminant would require the square root of a negative number in the formula, so there are no real roots; with no roots, the graph cannot meet the x-axis. The conclusion is: <b>no real roots and no x-intercepts</b>.",
      {v:4, keyText:key, D:-9});
  }
]));

/* ================= 4.15 (5 new) ================= */

/* ---------- 4.15: a revenue target for ticket pricing (L2) ---------- */
E("u3-problem-revenue",3,["4.15"],2,"gen",function(){
  var d = pick([5,10,20]), P0 = pick([8,10,12,15,20]), xs = ri(3,10);
  var N = d * (P0 + 2*xs);
  var x1 = ri(1, xs - 1), x2 = 2*xs - x1;
  var R = (P0 + x1) * (N - d * x1);
  var ans = P0 + x1;
  return numq("A theatre charges $" + P0 + " per ticket and sells " + N + " tickets for a show. For each $1 increase in the ticket price, the theatre sells " + d + " fewer tickets. At what ticket price, in dollars, will the revenue be $" + R + "? Give the lower of the two prices that achieve this revenue.",
    ans, 0.001,
    "Let the price increase be \\(x\\) dollars. Then the price is \\(" + P0 + " + x\\) dollars and the number of tickets sold is \\(" + N + " - " + d + "x\\), so revenue is \\(((" + P0 + " + x)(" + N + " - " + d + "x)\\). Set the revenue equal to \\(" + R + "\\):" +
    "\\[ \\begin{aligned} (" + P0 + " + x)(" + N + " - " + d + "x) &= " + R + " \\\\ -" + d + "x^2 + " + (N - d*P0) + "x - " + (R - P0*N) + " &= 0 \\\\ (x - " + x1 + ")(x - " + x2 + ") &= 0 \\end{aligned} \\]" +
    "So \\(x = " + x1 + "\\) or \\(x = " + x2 + "\\), giving prices of $" + (P0 + x1) + " and $" + (P0 + x2) + ". The lower price is <b>$" + ans + "</b>.",
    {P0:P0, N:N, d:d, x1:x1, x2:x2, R:R, ans:ans});
});

/* ---------- 4.15: the first time a projectile reaches a given height (L2) ---------- */
E("u3-problem-projectile-height",3,["4.15"],2,"gen",function(){
  var t1 = ri(1,3), t2 = t1 + ri(1,4);
  var v = 5 * (t1 + t2), h0 = pick([0,5,10,15,20]);
  var H = -5*t1*t1 + v*t1 + h0;
  var start = h0 === 0 ? "from the ground" : "from a platform " + h0 + " m above the ground";
  return numq("A ball is launched upward " + start + " with an initial speed of " + v + " m/s. Its height above the ground, in metres, after \\(t\\) seconds is \\(h(t) = -5t^2 + " + v + "t + " + h0 + "\\). After how many seconds is the ball first at a height of " + H + " m?",
    t1, 0.001,
    "Set the height equal to \\(" + H + "\\) and solve:" +
    "\\[ \\begin{aligned} -5t^2 + " + v + "t + " + h0 + " &= " + H + " \\\\ -5t^2 + " + v + "t - " + (H - h0) + " &= 0 \\\\ -5(t - " + t1 + ")(t - " + t2 + ") &= 0 \\end{aligned} \\]" +
    "So \\(t = " + t1 + "\\) or \\(t = " + t2 + "\\): the ball passes the height on the way up and again on the way down. The first time is <b>" + t1 + " s</b>.",
    {t1:t1, t2:t2, v:v, h0:h0, H:H});
});

/* ---------- 4.15: the legs of a right triangle (L2) ---------- */
E("u3-problem-triangle",3,["4.15"],2,"gen",function(){
  var triples = [[3,4,5],[6,8,10],[5,12,13],[8,15,17],[9,12,15],[12,16,20],[7,24,25],[20,21,29],[9,40,41],[12,35,37]];
  var tr = pick(triples), sc = pick([1,1,2,3]);
  var L1 = tr[0] * sc, L2 = tr[1] * sc, hyp = tr[2] * sc;
  var d = L2 - L1, askLong = Math.random() < 0.5;
  var ans = askLong ? L2 : L1;
  return numq("The legs of a right triangle differ by " + d + " cm, and the hypotenuse is " + hyp + " cm. What is the length of the " + (askLong ? "longer" : "shorter") + " leg, in centimetres?",
    ans, 0.001,
    "Let the shorter leg be \\(x\\) cm, so the longer leg is \\(x + " + d + "\\) cm. By the Pythagorean theorem:" +
    "\\[ \\begin{aligned} x^2 + (x + " + d + ")^2 &= " + (hyp*hyp) + " \\\\ 2x^2 + " + (2*d) + "x - " + (hyp*hyp - d*d) + " &= 0 \\\\ x^2 + " + d + "x - " + (L1*L2) + " &= 0 \\\\ (x - " + L1 + ")(x + " + L2 + ") &= 0 \\end{aligned} \\]" +
    "So \\(x = " + L1 + "\\) or \\(x = " + (-L2) + "\\). A length cannot be negative, so the shorter leg is \\(" + L1 + "\\) cm and the longer leg is \\(" + L2 + "\\) cm. The " + (askLong ? "longer" : "shorter") + " leg is <b>" + ans + " cm</b>.",
    {L1:L1, L2:L2, d:d, hyp:hyp, askLong:askLong, ans:ans});
});

/* ---------- 4.15: two positive numbers from the sum of their squares (L3) ---------- */
E("u3-problem-sum-squares",3,["4.15"],3,"gen",function(){
  var n = ri(3,15), m = ri(1,9);
  var S = n*n + (n + m)*(n + m);
  return numq("Two positive numbers differ by " + m + ". The sum of their squares is " + S + ". What is the smaller of the two numbers?",
    n, 0.001,
    "Let the smaller number be \\(x\\); the larger is \\(x + " + m + ")\\). The sum of their squares gives:" +
    "\\[ \\begin{aligned} x^2 + (x + " + m + ")^2 &= " + S + " \\\\ 2x^2 + " + (2*m) + "x - " + (S - m*m) + " &= 0 \\\\ x^2 + " + m + "x - " + (n*(n + m)) + " &= 0 \\\\ (x - " + n + ")(x + " + (n + m) + ") &= 0 \\end{aligned} \\]" +
    "So \\(x = " + n + "\\) or \\(x = " + (-(n + m)) + ")\\). The numbers are positive, so the smaller number is <b>" + n + "</b>.",
    {n:n, m:m, S:S});
});

/* ---------- 4.15: the width of a path from the area of the path itself (L3) ---------- */
E("u3-problem-path",3,["4.15"],3,"gen",function(){
  var W = pick([8,10,12,15,20]), H = pick([6,8,10,12]), x = ri(1,4);
  var PA = (W + 2*x)*(H + 2*x) - W*H;
  var S = W + H;
  return numq("A rectangular garden measures " + W + " m by " + H + " m. A path of uniform width is built around the outside of the garden, and the area of the path is " + PA + " m². What is the width of the path, in metres?",
    x, 0.001,
    "Let the width of the path be \\(x\\) m. The garden and path together measure \\((" + W + " + 2x)\\) m by \\((" + H + " + 2x)\\) m, and the path is the difference of the two areas:" +
    "\\[ \\begin{aligned} (" + W + " + 2x)(" + H + " + 2x) - " + (W*H) + " &= " + PA + " \\\\ 4x^2 + " + (2*S) + "x - " + PA + " &= 0 \\\\ x &= \\frac{-" + (2*S) + " \\pm \\sqrt{" + (2*S) + "^2 + 16(" + PA + ")}}{8} \\\\ &= \\frac{-" + (2*S) + " \\pm " + (2*S + 8*x) + "}{8} \\end{aligned} \\]" +
    "The two values are \\(x = " + x + "\\) and \\(x = " + fmt(-(S/2) - x, 2) + "\\). A width cannot be negative, so the width is <b>" + x + " m</b>.",
    {W:W, H:H, x:x, PA:PA});
});

/* ----- bank-u4.js ----- */
// Math 2200 Unit 4 Radical Expressions and Equations question bank
// CRMARKS: u4-conjugate-why=3
// CRMARKS: u4-convert-numeric=1
// CRMARKS: u4-defined-values=2
// CRMARKS: u4-extraneous-why=3
// CRMARKS: u4-model-radical=3
// CRMARKS: u4-order-radicals=2
// CRMARKS: u4-rationalize-binomial=3
// CRMARKS: u4-rationalize-mono=1
// CRMARKS: u4-root-of-square=1
// CRMARKS: u4-simplify-ops=2
// CRMARKS: u4-solve-radical=2
// CRMARKS: u4-var-to-entire=1
// CRMARKS: u4-var-to-mixed=2
// CRMARKS: u4-verify-roots=2
// BIMODAL: u4-var-to-mixed=b
// BIMODAL: u4-simplify-ops=b
// BIMODAL: u4-rationalize-binomial=b
// BIMODAL: u4-order-radicals=a
// BIMODAL: u4-extraneous-why=b
// BIMODAL: u4-conjugate-why=b
/* ================= Unit 4: Radical Expressions and Equations ================= */
/* ================= Unit 4: Radical Expressions and Equations ================= */
/* Indicators: 1.1, 1.2, 1.3, 1.4, 1.9, 1.11, 1.12, 1.13, 1.14, 1.15, 1.16,
   1.17, 1.18, 1.19, 1.20. Types follow the Mauger Chapter 5 sets (simplify
   radicals, convert between entire and mixed radicals, add/subtract/multiply
   radicals, rationalize denominators, restrictions, solve radical equations
   and check roots, error spotting) and the MHR Pre-Calculus 11 Chapter 5 bank
   (Radical Expressions and Equations), rewritten with original stems and
   values. */

function u4sgn(n){return n>0?" + "+n:(n<0?" - "+(-n):"");}
function u4gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t;}return a||1;}
function u4sqf(n){if(n<2)return false;for(var d=2;d*d<=n;d++){if(n%(d*d)===0)return false;}return true;}
function u4simp(N){var a=1;for(var d=Math.floor(Math.sqrt(N));d>=2;d--){if(N%(d*d)===0){a=d;break;}}return [a,N/(a*a)];}
function u4simp3(N){var a=1;for(var d=Math.floor(Math.cbrt(N))+1;d>=2;d--){if(N%(d*d*d)===0){a=d;break;}}return [a,N/(a*a*a)];}
function u4mixS(a,b,idx){var rad=(idx===3)?"\\sqrt[3]{"+b+"}":"\\sqrt{"+b+"}";return (a===1?"":a)+rad;}
function u4vp(v,e){return e===0?"":(e===1?v:v+"^{"+e+"}");}
function u4coef(c){return c===1?"":(""+c);}
/* collect n distractor strings from cands, each distinct and different from correct */
function u4dis(correct,cands,n){
  var out=[],seen={};seen[String(correct)]=1;
  for(var i=0;i<cands.length&&out.length<n;i++){var s=String(cands[i]);if(!seen[s]){seen[s]=1;out.push(s);}}
  return out;
}
function u4wrap(s){return "\\("+s+"\\)";}

/* ---------- 1.1 + 1.2: convert between entire and mixed radicals, numerical (L1) ---------- */
E("u4-convert-numeric",4,["1.1","1.2"],1,"gen",function(){
  var shape=pick(["toMixed","toMixed","toEntire"]);
  if(shape==="toMixed"){
    var idx=pick([2,2,2,3]);
    if(idx===2){
      var a=ri(2,9),b=pick([2,3,5,6,7,10,11,13,14,15,17,19,21,22,23,26,29,30]);
      var N=a*a*b,cor=u4mixS(a,b,2);
      var b2=pick([2,3,5,6,7,10,11,13,14,15].filter(function(z){return z!==b;}));
      var cands=[u4mixS(a+1,b,2),u4mixS(a,b2,2),u4mixS(a+2,b,2)];
      if(a>2)cands.push(u4mixS(a-1,b,2));
      if(a%2===0)cands.push(u4mixS(a/2,4*b,2));
      return mcq("Express \\(\\sqrt{"+N+"}\\) as a mixed radical in simplest form.",
        u4wrap(cor),u4dis(cor,cands,3).map(u4wrap),
        "The largest perfect square that divides \\("+N+"\\) is \\("+a+"^2 = "+(a*a)+"\\), and \\("+N+" = "+(a*a)+" \\times "+b+"\\): \\[ \\begin{aligned} \\sqrt{"+N+"} &= \\sqrt{"+(a*a)+" \\times "+b+"} \\\\ &= \\sqrt{"+(a*a)+"} \\times \\sqrt{"+b+"} \\\\ &= "+cor+" \\end{aligned} \\] So \\(\\sqrt{"+N+"} = <b>"+cor+"</b>\\).",
        {a:a,b:b,idx:idx,shape:shape});
    }
    var a3=ri(2,5),b3=2,sm3,tries=0;
    do{b3=pick([2,3,4,5,6,7,9,10,11,12,13,14,15,17,18,19,20,22,23,25,26,28,30]);sm3=u4simp3(a3*a3*a3*b3);tries++;}
    while((sm3[0]!==a3||sm3[1]!==b3)&&tries<80);
    var N3=a3*a3*a3*b3,cor3=u4mixS(a3,b3,3);
    var b3x=pick([2,3,5,6,7,10,12,14,15,20].filter(function(z){return z!==b3;}));
    var cands3=[u4mixS(a3+1,b3,3),u4mixS(a3,b3x,3),u4mixS(a3+2,b3,3)];
    if(a3>2)cands3.push(u4mixS(a3-1,b3,3));
    return mcq("Express \\(\\sqrt[3]{"+N3+"}\\) as a mixed radical in simplest form.",
      u4wrap(cor3),u4dis(cor3,cands3,3).map(u4wrap),
      "The largest perfect cube that divides \\("+N3+"\\) is \\("+a3+"^3 = "+(a3*a3*a3)+"\\), and \\("+N3+" = "+(a3*a3*a3)+" \\times "+b3+"\\): \\[ \\begin{aligned} \\sqrt[3]{"+N3+"} &= \\sqrt[3]{"+(a3*a3*a3)+" \\times "+b3+"} \\\\ &= \\sqrt[3]{"+(a3*a3*a3)+"} \\times \\sqrt[3]{"+b3+"} \\\\ &= "+cor3+" \\end{aligned} \\] So \\(\\sqrt[3]{"+N3+"} = <b>"+cor3+"</b>\\).",
      {a:a3,b:b3,idx:3,shape:shape});
  }
  var idx2=pick([2,2,3]);
  if(idx2===2){
    var p=ri(2,9),q=pick([2,3,5,6,7,10,11,13,14,15].filter(function(z){return z!==p;}));
    var R=p*p*q;
    var candR=u4dis(""+R,[p*q,p*q*q,p*p+q,(p+1)*(p+1)*q,p*p*q+q],3);
    return mcq("Express \\("+p+"\\sqrt{"+q+"}\\) as an entire radical.",
      "\\(\\sqrt{"+R+"}\\)",candR.map(function(z){return "\\(\\sqrt{"+z+"}\\)";}),
      "The coefficient moves inside the radical as its square: \\[ \\begin{aligned} "+p+"\\sqrt{"+q+"} &= \\sqrt{"+(p*p)+"} \\times \\sqrt{"+q+"} \\\\ &= \\sqrt{"+(p*p)+" \\times "+q+"} \\\\ &= \\sqrt{"+R+"} \\end{aligned} \\] So \\("+p+"\\sqrt{"+q+"} = <b>\\sqrt{"+R+"}</b>\\).",
      {p:p,q:q,idx:idx2,shape:shape});
  }
  var p3=ri(2,5),q3=pick([2,3,4,5,6,7,9,10,11,13,14,15].filter(function(z){return z!==p3;}));
  var R3=p3*p3*p3*q3;
  var candR3=u4dis(""+R3,[p3*q3,p3*q3*q3*q3,p3*p3*p3+q3,(p3+1)*(p3+1)*(p3+1)*q3,p3*p3*q3],3);
  return mcq("Express \\("+p3+"\\sqrt[3]{"+q3+"}\\) as an entire radical.",
    "\\(\\sqrt[3]{"+R3+"}\\)",candR3.map(function(z){return "\\(\\sqrt[3]{"+z+"}\\)";}),
    "The coefficient moves inside the radical as its cube: \\[ \\begin{aligned} "+p3+"\\sqrt[3]{"+q3+"} &= \\sqrt[3]{"+(p3*p3*p3)+"} \\times \\sqrt[3]{"+q3+"} \\\\ &= \\sqrt[3]{"+(p3*p3*p3)+" \\times "+q3+"} \\\\ &= \\sqrt[3]{"+R3+"} \\end{aligned} \\] So \\("+p3+"\\sqrt[3]{"+q3+"} = <b>\\sqrt[3]{"+R3+"}</b>\\).",
    {p:p3,q:q3,idx:idx2,shape:shape});
});

/* ---------- 1.11: value of a square root of a square, numerical (L1) ---------- */
E("u4-root-of-square",4,["1.11"],1,"gen",function(){
  var shape=pick(["neg","neg","given","square","decimal"]);
  if(shape==="neg"||shape==="decimal"){
    var k=(shape==="neg")?ri(2,25):pick([0.5,1.5,2.5,3.5,4.5,5.5,6.5,7.5,8.5,9.5]);
    var ks=fmt(k,1),nks=(shape==="decimal")?fmtF(-k,2):fmt(-k,1),sq=fmt(k*k,2);
    return mcq("What is the value of \\(\\sqrt{(-"+ks+")^2}\\)?",
      ks,[nks,"\\(\\pm "+ks+"\\)",sq],
      "The square removes the sign: \\((-"+ks+")^2 = "+sq+"\\). A square root symbol means the non-negative (principal) root, so \\(\\sqrt{"+sq+"} = "+ks+"\\). The value is never negative, and a single square root never gives a plus-or-minus pair. The value is <b>"+ks+"</b>.",
      {k:k,shape:shape});
  }
  if(shape==="given"){
    var k2=ri(2,20);
    return mcq("If \\(x = -"+k2+"\\), what is the value of \\(\\sqrt{x^2}\\)?",
      ""+k2,[""+(-k2),"\\(\\pm "+k2+"\\)",""+(k2*k2)],
      "Substituting gives \\(\\sqrt{(-"+k2+")^2} = \\sqrt{"+(k2*k2)+"}\\). The principal square root is non-negative, so the value is <b>"+k2+"</b>, the absolute value of \\(x\\).",
      {k:k2,shape:shape});
  }
  var k3=ri(2,20);
  return mcq("What is the value of \\((-"+k3+")^2\\)?",
    ""+(k3*k3),[""+(-k3*k3),""+k3,""+(-k3)],
    "Squaring a negative number gives a positive product: \\((-"+k3+")^2 = (-"+k3+") \\times (-"+k3+") = "+(k3*k3)+"\\). In general, \\((-x)^2 = x^2\\). The value is <b>"+(k3*k3)+"</b>.",
    {k:k3,shape:shape});
});

/* ---------- 1.4: mixed radical with variables to entire radical (L1) ---------- */
E("u4-var-to-entire",4,["1.4"],2,"gen",function(){
  var v=pick(["x","y","t","m"]),p=ri(2,6),q=ri(0,3),s=ri(0,2),r;
  if(q===0&&s===0)q=1;
  if(s===0)r=pick([2,3,5,6,7,10,11,13]);
  else r=pick([1,2,3,5,6,7,10]);
  var R=p*p*r,E=2*q+s;
  function rad(rc,re){return "\\sqrt{"+rc+u4vp(v,re)+"}";}
  var outside=u4coef(p)+u4vp(v,q);
  var inside=(r===1?"":r)+u4vp(v,s);
  var cor=rad(R,E);
  var cands=[rad(p*r,E),rad(R,q===0?2*s:q+s),rad(p*p*r*r,E),rad((p+1)*(p+1)*r,E),rad(R,E+1),rad(p*p,E)];
  return mcq("Express \\("+outside+"\\sqrt{"+inside+"}\\) as an entire radical.",
    u4wrap(cor),u4dis(cor,cands,3).map(u4wrap),
    "The outside factor moves inside by squaring it, variable part included: \\[ \\begin{aligned} "+outside+"\\sqrt{"+inside+"} &= \\sqrt{"+(p*p)+u4vp(v,2*q)+"} \\times \\sqrt{"+inside+"} \\\\ &= \\sqrt{"+R+u4vp(v,E)+"} \\end{aligned} \\] So the entire radical is <b>"+u4wrap(cor)+"</b>.",
    {p:p,q:q,r:r,s:s,v:v});
});

/* ---------- 1.3: entire radical with variables to mixed radical (L2) ---------- */
function u4mixVarStr(a,v,f,b,g){
  var out=u4coef(a)+u4vp(v,f);
  var inside=(b===1?"":b)+u4vp(v,g);
  if(inside==="")return out===""?"1":out;
  return out+"\\sqrt{"+inside+"}";
}
function u4twoVarStr(oc,ex,ey,ic,ix,iy){
  var out=u4coef(oc)+u4vp("x",ex)+u4vp("y",ey);
  var inside=(ic===1?"":ic)+u4vp("x",ix)+u4vp("y",iy);
  if(inside==="")return out===""?"1":out;
  return out+"\\sqrt{"+inside+"}";
}
E("u4-var-to-mixed",4,["1.3"],2,"gen",function(){
  var shape=pick(["one","one","two"]);
  if(shape==="one"){
    var a=ri(2,7),b=pick([1,2,3,5,6,7,10]),e=ri(2,9);
    if(b===1&&e%2===0)e=e+1;
    var c=a*a*b,f=Math.floor(e/2),g=e%2;
    var cor=u4mixVarStr(a,"x",f,b,g);
    var d2=(g===1)?u4mixVarStr(a,"x",f,b,0):u4mixVarStr(a,"x",f,b,1);
    var cands=[u4mixVarStr(1,"x",f,c,g),d2,u4mixVarStr(a,"x",f-1,b,g+2),u4mixVarStr(a,"x",f+1,b,0)];
    var insideB=(b===1?"":b)+u4vp("x",g);
    return mcq("Express \\(\\sqrt{"+c+u4vp("x",e)+"}\\) as a mixed radical in simplest form. Assume \\(x \\geq 0\\).",
      u4wrap(cor),u4dis(cor,cands,3).map(u4wrap),
      "Factor out the largest perfect square, \\("+a+"^2 x^{"+(2*f)+"} = "+(a*a)+u4vp("x",2*f)+"\\): \\[ \\begin{aligned} \\sqrt{"+c+u4vp("x",e)+"} &= \\sqrt{"+(a*a)+u4vp("x",2*f)+" \\times "+insideB+"} \\\\ &= "+cor+" \\end{aligned} \\] So the mixed radical is <b>"+u4wrap(cor)+"</b>.",
      {a:a,b:b,e:e,shape:shape});
  }
  var a2=ri(2,5),b2=pick([1,2,3,5,6]),ex=ri(1,6),ey=ri(1,6);
  if(ex===1&&ey===1)ey=2;
  if(b2===1&&ex%2===0&&ey%2===0)ex=ex+1;
  var c2=a2*a2*b2,fx=Math.floor(ex/2),fy=Math.floor(ey/2),gx=ex%2,gy=ey%2;
  var cor2=u4twoVarStr(a2,fx,fy,b2,gx,gy);
  var cands2=[u4twoVarStr(1,fx,0,c2,gx,ey),u4twoVarStr(1,0,fy,c2,ex,gy),u4twoVarStr(a2,fx,fy,b2,0,0),u4twoVarStr(1,fx,fy,c2,gx,gy)];
  return mcq("Express \\(\\sqrt{"+c2+u4vp("x",ex)+u4vp("y",ey)+"}\\) as a mixed radical in simplest form. Assume \\(x, y \\geq 0\\).",
    u4wrap(cor2),u4dis(cor2,cands2,3).map(u4wrap),
    "Factor out the largest perfect square, \\("+(a2*a2)+u4vp("x",2*fx)+u4vp("y",2*fy)+"\\), which is the square of \\("+a2+u4vp("x",fx)+u4vp("y",fy)+"\\): \\[ \\begin{aligned} \\sqrt{"+c2+u4vp("x",ex)+u4vp("y",ey)+"} &= \\sqrt{"+(a2*a2)+u4vp("x",2*fx)+u4vp("y",2*fy)+" \\times "+((b2===1?"":b2)+u4vp("x",gx)+u4vp("y",gy))+"} \\\\ &= "+cor2+" \\end{aligned} \\] So the mixed radical is <b>"+u4wrap(cor2)+"</b>.",
    {a:a2,b:b2,ex:ex,ey:ey,shape:shape});
});

/* ---------- 1.9: compare and order radicals (L2) ---------- */
E("u4-order-radicals",4,["1.9"],2,"gen",function(){
  var pool=[5,6,7,8,10,11,12,13,14,15,17,18,19,20,21,22,23,24,26,27,28,29,30,31,32,33,34,35,37,38,39,40,41,42,43,44,45,46,47,48];
  var vals,tries=0;
  do{
    vals=shuffle(pool.slice()).slice(0,4).sort(function(x,y){return x-y;});
    tries++;
  }while(vals.filter(function(v){return u4simp(v)[0]>1;}).length<2&&tries<60);
  var letters=["P","Q","R","S"];
  var items=vals.map(function(v){
    var sm=u4simp(v),form;
    if(sm[0]>1&&Math.random()<0.65)form="\\("+u4mixS(sm[0],sm[1],2)+"\\)";
    else form="\\(\\sqrt{"+v+"}\\)";
    return {v:v,form:form};
  });
  var order=shuffle([0,1,2,3]);
  var stem="The four radicals are: "+letters.map(function(L,i){return L+" = "+items[order[i]].form;}).join(", ")+". Which list orders the radicals from <b>least to greatest</b>?";
  var letterOf=items.map(function(it,vi){return letters[order.indexOf(vi)];});
  var corSeq=letterOf.join(", ");
  var sw1=letterOf.slice(),sw2=letterOf.slice(),tmp;
  tmp=sw1[0];sw1[0]=sw1[1];sw1[1]=tmp;
  tmp=sw2[2];sw2[2]=sw2[3];sw2[3]=tmp;
  var rev=letterOf.slice().reverse();
  return mcq(stem,corSeq,u4dis(corSeq,[sw1.join(", "),sw2.join(", "),rev.join(", ")],3),
    "Rewrite each radical as an entire radical: "+items.map(function(it,vi){return letterOf[vi]+" = \\(\\sqrt{"+it.v+"}\\)";}).join(", ")+". For square roots, a larger radicand means a larger value, and "+vals.join(" < ")+". So the order from least to greatest is <b>"+corSeq+"</b>.",
    {vals:vals});
});

/* ---------- 1.11: the identities sqrt(x^2) = |x| and (-x)^2 = x^2 (L2) ---------- */
E("u4-identity-truth",4,["1.11"],2,"gen",function(){
  var shape=pick(["allReal","allRealCoef","sign","whichX","shifted","numeric"]);
  if(shape==="allReal"){
    var v=pick(["x","a","t","n"]);
    return mcq("Which statement is true for <b>all</b> real values of \\("+v+"\\)?",
      "\\(\\sqrt{"+v+"^2} = |"+v+"|\\)",
      ["\\(\\sqrt{"+v+"^2} = "+v+"\\)","\\(\\sqrt{"+v+"^2} = \\pm "+v+"\\)","\\(\\sqrt{"+v+"^2} = "+v+"^2\\)"],
      "A square root symbol always gives the non-negative root. When \\("+v+"\\) is negative, \\(\\sqrt{"+v+"^2}\\) is still positive, so it equals the absolute value: <b>\\(\\sqrt{"+v+"^2} = |"+v+"|\\)</b>. It cannot equal \\("+v+"\\) itself when \\("+v+" < 0\\), and one square root never produces a plus-or-minus pair.",
      {v:v,shape:shape});
  }
  if(shape==="allRealCoef"){
    var k=ri(2,5),v2=pick(["x","t"]);
    return mcq("Which statement is true for <b>all</b> real values of \\("+v2+"\\)?",
      "\\(\\sqrt{("+k+v2+")^2} = |"+k+v2+"|\\)",
      ["\\(\\sqrt{("+k+v2+")^2} = "+k+v2+"\\)","\\(\\sqrt{("+k+v2+")^2} = \\pm "+k+v2+"\\)","\\(\\sqrt{("+k+v2+")^2} = -"+k+v2+"\\)"],
      "The expression inside the square, \\("+k+v2+"\\), can be negative, zero, or positive as \\("+v2+"\\) varies. The square root of its square is its absolute value: <b>\\(\\sqrt{("+k+v2+")^2} = |"+k+v2+"|\\)</b>, which is the choice that stays non-negative for every value of \\("+v2+"\\).",
      {k:k,v:v2,shape:shape});
  }
  if(shape==="sign"){
    var v3=pick(["x","a","t"]),neg=pick([true,false]);
    if(neg){
      return mcq("If \\("+v3+" < 0\\), then \\(\\sqrt{"+v3+"^2}\\) equals",
        "\\(-"+v3+"\\)",
        ["\\("+v3+"\\)","\\(\\pm "+v3+"\\)","\\("+v3+"^2\\)"],
        "Since \\(\\sqrt{"+v3+"^2} = |"+v3+"|\\) and \\("+v3+"\\) is negative, its absolute value is its opposite: <b>\\(-"+v3+"\\)</b>, which is positive.",
        {v:v3,shape:shape});
    }
    return mcq("If \\("+v3+" > 0\\), then \\(\\sqrt{"+v3+"^2}\\) equals",
      "\\("+v3+"\\)",
      ["\\(-"+v3+"\\)","\\(\\pm "+v3+"\\)","\\("+v3+"^2\\)"],
      "Since \\(\\sqrt{"+v3+"^2} = |"+v3+"|\\) and \\("+v3+"\\) is positive, its absolute value is itself: <b>\\("+v3+"\\)</b>.",
      {v:v3,shape:shape});
  }
  if(shape==="whichX"){
    var k4=ri(3,9);
    return mcq("For which value of \\(x\\) is the statement \\(\\sqrt{x^2} = -x\\) true?",
      ""+(-k4),[""+k4,"Every real number","No real number"],
      "The left side is \\(|x|\\) in disguise, and \\(|x| = -x\\) holds exactly when \\(x \\leq 0\\). Of the choices, only \\(x = "+(-k4)+"\\) qualifies: at \\(x = "+k4+"\\) the left side is \\("+k4+"\\) while the right side is \\("+(-k4)+"\\). So the statement is true for <b>\\(x = "+(-k4)+"\\)</b>.",
      {k:k4,shape:shape});
  }
  if(shape==="shifted"){
    var v5=pick(["x","t"]),h=ri(2,12);
    return mcq("What is \\(\\sqrt{("+v5+" - "+h+")^2}\\) in simplest form?",
      "\\(|"+v5+" - "+h+"|\\)",
      ["\\("+v5+" - "+h+"\\)","\\("+h+" - "+v5+"\\)","\\(\\pm ("+v5+" - "+h+")\\)"],
      "The square root of a square is the absolute value of the expression inside, because that expression can be positive or negative depending on \\("+v5+"\\). So \\(\\sqrt{("+v5+" - "+h+")^2} = <b>|"+v5+" - "+h+"|</b>\\).",
      {v:v5,h:h,shape:shape});
  }
  var k6=ri(3,12);
  return mcq("Which statement is true?",
    "\\(\\sqrt{(-"+k6+")^2} = "+k6+"\\)",
    ["\\(\\sqrt{(-"+k6+")^2} = -"+k6+"\\)","\\(\\sqrt{"+(k6*k6)+"} = \\pm "+k6+"\\)","\\((-"+k6+")^2 = "+(-(k6*k6))+"\\)"],
    "Check each claim. Squaring first, \\((-"+k6+")^2 = "+(k6*k6)+"\\), and the principal root of \\("+(k6*k6)+"\\) is \\("+k6+"\\) (never negative, and a single value, not a plus-or-minus pair). Also \\((-"+k6+")^2\\) is positive \\("+(k6*k6)+"\\), not \\("+(-(k6*k6))+"\\). So the true statement is <b>\\(\\sqrt{(-"+k6+")^2} = "+k6+"\\)</b>.",
    {k:k6,shape:shape});
});

/* ---------- 1.12: values for which a radical expression is defined (L2) ---------- */
E("u4-defined-values",4,["1.12"],1,"gen",function(){
  var shape=pick(["pos","pos","neg","denom"]);
  var c0=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]);
  if(shape==="pos"){
    var a=pick([1,2,3,4]);
    var rad="\\sqrt{"+(a===1?"x":a+"x")+u4sgn(-a*c0)+"}";
    var steps=(a===1)?("x"+u4sgn(-a*c0)+" &\\geq 0 \\\\ x &\\geq "+c0)
      :((a+"x")+u4sgn(-a*c0)+" &\\geq 0 \\\\ "+a+"x &\\geq "+(a*c0)+" \\\\ x &\\geq "+c0);
    return mcq("For which values of \\(x\\) is the expression \\("+rad+"\\) defined?",
      "\\(x \\geq "+c0+"\\)",
      ["\\(x \\leq "+c0+"\\)","\\(x \\geq "+(-c0)+"\\)","\\(x > "+c0+"\\)"],
      "A square root is defined when its radicand is non-negative: \\[ \\begin{aligned} "+steps+" \\end{aligned} \\] So the expression is defined for <b>\\(x \\geq "+c0+"\\)</b>. The endpoint is included because a square root of zero is zero.",
      {a:a,c0:c0,shape:shape});
  }
  if(shape==="neg"){
    var a2=pick([1,2,3,4]);
    var rad2="\\sqrt{"+(a2*c0)+(a2===1?" - x":" - "+a2+"x")+"}";
    var steps2=(a2===1)?((a2*c0)+" - x &\\geq 0 \\\\ -x &\\geq "+(-a2*c0)+" \\\\ x &\\leq "+c0)
      :((a2*c0)+" - "+a2+"x &\\geq 0 \\\\ -"+a2+"x &\\geq "+(-a2*c0)+" \\\\ x &\\leq "+c0);
    return mcq("For which values of \\(x\\) is the expression \\("+rad2+"\\) defined?",
      "\\(x \\leq "+c0+"\\)",
      ["\\(x \\geq "+c0+"\\)","\\(x \\leq "+(-c0)+"\\)","\\(x < "+c0+"\\)"],
      "The radicand must be non-negative. Dividing by a negative number reverses the inequality: \\[ \\begin{aligned} "+steps2+" \\end{aligned} \\] So the expression is defined for <b>\\(x \\leq "+c0+"\\)</b>.",
      {a:a2,c0:c0,shape:shape});
  }
  var n=ri(2,9);
  var expr="\\frac{"+n+"}{\\sqrt{x"+u4sgn(-c0)+"}}";
  return mcq("For which values of \\(x\\) is the expression \\("+expr+"\\) defined?",
    "\\(x > "+c0+"\\)",
    ["\\(x \\geq "+c0+"\\)","\\(x < "+c0+"\\)","\\(x > "+(-c0)+"\\)"],
    "The radicand sits in a denominator, so it must be strictly positive: zero would make the denominator zero, and a negative radicand has no real square root. \\[ \\begin{aligned} x"+u4sgn(-c0)+" &> 0 \\\\ x &> "+c0+" \\end{aligned} \\] So the expression is defined for <b>\\(x > "+c0+"\\)</b>.",
    {n:n,c0:c0,shape:shape});
});

/* ---------- 1.13: simplify with operations on radicals (L2) ---------- */
E("u4-simplify-ops",4,["1.13"],2,"gen",function(){
  var shape=pick(["add","add","product","conjugate","binomSquare","varAdd"]);
  if(shape==="add"){
    var b=pick([2,3,5,6,7,10]),a1=ri(2,6),a2=ri(2,6),t=0;
    while(a2===a1&&t<40){a2=ri(2,6);t++;}
    var N1=a1*a1*b,N2=a2*a2*b;
    var cor=u4mixS(a1+a2,b,2);
    var sm=u4simp(N1+N2);
    var sumOpt=(sm[1]===1)?(""+sm[0]):u4mixS(sm[0],sm[1],2);
    var cands=[u4mixS(a1*a2,b,2),sumOpt,u4mixS(Math.abs(a1-a2),b,2),u4mixS(a1+a2+1,b,2)];
    return mcq("Simplify \\(\\sqrt{"+N1+"} + \\sqrt{"+N2+"}\\).",
      u4wrap(cor),u4dis(cor,cands,3).map(u4wrap),
      "Simplify each radical first, then add the like radicals: \\[ \\begin{aligned} \\sqrt{"+N1+"} + \\sqrt{"+N2+"} &= "+u4mixS(a1,b,2)+" + "+u4mixS(a2,b,2)+" \\\\ &= "+cor+" \\end{aligned} \\] Radicals cannot be added by adding their radicands. The simplified sum is <b>"+u4wrap(cor)+"</b>.",
      {a1:a1,a2:a2,b:b,shape:shape});
  }
  if(shape==="product"){
    var a=ri(2,5),bb=ri(2,5);
    var m=pick([2,3,5,6,7,10,11,14,15]),n=pick([2,3,5,6,7,10,11,14,15].filter(function(z){return z!==m;}));
    var smB=u4simp(m*n);
    var corB=(smB[1]===1)?(""+(a*bb*smB[0])):u4mixS(a*bb*smB[0],smB[1],2);
    function rawS(coef,rad){return coef+"\\sqrt{"+rad+"}";}
    var candsB=[rawS(a+bb,m*n),rawS(a*bb,m+n),rawS(a*bb,m*n),rawS((a+1)*bb,m*n),rawS(a*bb+1,m*n)];
    var stepsB="\\[ \\begin{aligned} "+a+"\\sqrt{"+m+"} \\times "+bb+"\\sqrt{"+n+"} &= "+(a*bb)+"\\sqrt{"+(m*n)+"} \\\\ &= "+corB+" \\end{aligned} \\]";
    return mcq("Simplify \\("+a+"\\sqrt{"+m+"} \\times "+bb+"\\sqrt{"+n+"}\\). Give the answer in simplest form.",
      u4wrap(corB),u4dis(corB,candsB,3).map(u4wrap),
      "Multiply the coefficients together and the radicands together, then simplify the result: "+stepsB+" So the product is <b>"+u4wrap(corB)+"</b>.",
      {a:a,bb:bb,m:m,n:n,shape:shape});
  }
  if(shape==="conjugate"){
    var mm=pick([5,6,7,10,11,13,14,15,18,20,21,22]),nn=pick([2,3,5,6,7,10,11,13]),t2=0;
    while(nn>=mm&&t2<40){nn=pick([2,3,5,6,7,10,11,13]);t2++;}
    return mcq("Expand and simplify \\((\\sqrt{"+mm+"} + \\sqrt{"+nn+"})(\\sqrt{"+mm+"} - \\sqrt{"+nn+"})\\).",
      ""+(mm-nn),[""+(mm+nn),""+(nn-mm),""+(mm*nn)],
      "This is a conjugate pair, so the product is a difference of squares and the middle terms cancel: \\[ \\begin{aligned} (\\sqrt{"+mm+"} + \\sqrt{"+nn+"})(\\sqrt{"+mm+"} - \\sqrt{"+nn+"}) &= (\\sqrt{"+mm+"})^2 - (\\sqrt{"+nn+"})^2 \\\\ &= "+mm+" - "+nn+" \\\\ &= "+(mm-nn)+" \\end{aligned} \\] The product is <b>"+(mm-nn)+"</b>.",
      {mm:mm,nn:nn,shape:shape});
  }
  if(shape==="binomSquare"){
    var p=ri(2,6),q=pick([2,3,5,6,7,10,11,13]);
    var corC=""+(p*p+q)+" + "+(2*p)+"\\sqrt{"+q+"}";
    var candsC=[""+(p*p+q),""+(p*p+q)+" + "+p+"\\sqrt{"+q+"}",""+(p*p)+" + "+(2*p)+"\\sqrt{"+q+"}",""+(p*p+q)+" + "+(2*p)+"\\sqrt{"+(q+2)+"}"];
    return mcq("Expand and simplify \\(("+p+" + \\sqrt{"+q+"})^2\\).",
      u4wrap(corC),u4dis(corC,candsC,3).map(u4wrap),
      "Squaring a binomial produces a middle term; the expression is not squared term by term: \\[ \\begin{aligned} ("+p+" + \\sqrt{"+q+"})^2 &= "+p+"^2 + 2 \\times "+p+" \\times \\sqrt{"+q+"} + (\\sqrt{"+q+"})^2 \\\\ &= "+(p*p)+" + "+(2*p)+"\\sqrt{"+q+"} + "+q+" \\\\ &= "+corC+" \\end{aligned} \\] So the expansion is <b>"+u4wrap(corC)+"</b>.",
      {p:p,q:q,shape:shape});
  }
  var bD=pick([2,3,5,6]),d1=ri(2,5),d2=ri(2,5),t3=0;
  while(d2===d1&&t3<40){d2=ri(2,5);t3++;}
  var c1=d1*d1*bD,c2=d2*d2*bD;
  var corD=(d1+d2)+"\\sqrt{"+bD+"x}";
  var candsD=[(d1*d2)+"\\sqrt{"+bD+"x}",(d1+d2)+"\\sqrt{"+bD+"}",Math.abs(d1-d2)+"\\sqrt{"+bD+"x}",(d1+d2)+"\\sqrt{"+(bD+1)+"x}"];
  return mcq("Simplify \\(\\sqrt{"+c1+"x} + \\sqrt{"+c2+"x}\\). Assume \\(x \\geq 0\\).",
    u4wrap(corD),u4dis(corD,candsD,3).map(u4wrap),
    "Simplify each radical first: \\(\\sqrt{"+c1+"x} = "+d1+"\\sqrt{"+bD+"x}\\) and \\(\\sqrt{"+c2+"x} = "+d2+"\\sqrt{"+bD+"x}\\). These are like radicals, so their coefficients add: \\[ \\begin{aligned} \\sqrt{"+c1+"x} + \\sqrt{"+c2+"x} &= "+d1+"\\sqrt{"+bD+"x} + "+d2+"\\sqrt{"+bD+"x} \\\\ &= "+corD+" \\end{aligned} \\] The simplified sum is <b>"+u4wrap(corD)+"</b>.",
    {d1:d1,d2:d2,b:bD,shape:shape});
});

/* ---------- 1.14: rationalize a monomial denominator (L2) ---------- */
E("u4-rationalize-mono",4,["1.14"],1,"gen",function(){
  var shape=pick(["mono","monoCoef"]);
  if(shape==="mono"||shape==="monoCoef"){
    var n=ri(2,9),m=pick([2,3,5,6,7,10]);
    var a=(shape==="mono")?1:ri(2,5);
    var den=(a===1)?("\\sqrt{"+m+"}"):(a+"\\sqrt{"+m+"}");
    var D=a*m,g=u4gcd(n,D),n1=n/g,D1=D/g;
    var cor=(D1===1)?(n1+"\\sqrt{"+m+"}"):("\\frac{"+n1+"\\sqrt{"+m+"}}{"+D1+"}");
    var cands=["\\frac{"+n+"\\sqrt{"+m+"}}{"+(D*m)+"}","\\frac{\\sqrt{"+(n*m)+"}}{"+D+"}","\\frac{"+n+"}{"+D+"}","\\frac{"+(n+1)+"\\sqrt{"+m+"}}{"+D+"}"];
    return mcq("Rationalize the denominator of \\(\\frac{"+n+"}{"+den+"}\\) and simplify.",
      u4wrap(cor),u4dis(cor,cands,3).map(u4wrap),
      "Multiply the numerator and denominator by \\(\\sqrt{"+m+"}\\), which makes the denominator rational: \\[ \\begin{aligned} \\frac{"+n+"}{"+den+"} &= \\frac{"+n+"\\sqrt{"+m+"}}{"+D+"} \\\\ &= "+cor+" \\end{aligned} \\] So the rationalized form is <b>"+u4wrap(cor)+"</b>.",
      {n:n,m:m,a:a,shape:shape});
  }
});

/* ---------- 1.14: rationalize a binomial denominator (L2) ---------- */
E("u4-rationalize-binomial",4,["1.14"],2,"gen",function(){
  var shape=pick(["binom","twoRad"]);
  if(shape==="binom"){
    var a2=ri(2,6),b2=pick([2,3,5,6,7,10,11,13].filter(function(z){return z<a2*a2&&z!==a2;})),n2=ri(1,6);
    var D2=a2*a2-b2,g2=u4gcd(n2,D2),n2r=n2/g2,D2r=D2/g2;
    var numCore="("+a2+" - \\sqrt{"+b2+"})";
    var cor2=(D2r===1)?((n2r===1?"":n2r)+numCore):("\\frac{"+(n2r===1?"":n2r)+numCore+"}{"+D2r+"}");
    var npre=(n2===1?"":n2);
    var cands2=["\\frac{"+npre+"("+a2+" + \\sqrt{"+b2+"})}{"+D2+"}",
      "\\frac{"+npre+numCore+"}{"+(a2*a2+b2)+"}",
      "\\frac{"+n2+"\\sqrt{"+b2+"}}{"+b2+" + "+a2+"\\sqrt{"+b2+"}}",
      "\\frac{"+npre+numCore+"}{"+(D2*D2)+"}"];
    return mcq("Rationalize the denominator of \\(\\frac{"+n2+"}{"+a2+" + \\sqrt{"+b2+"}}\\) and simplify.",
      u4wrap(cor2),u4dis(cor2,cands2,3).map(u4wrap),
      "Multiply the numerator and denominator by the conjugate \\("+a2+" - \\sqrt{"+b2+"}\\). The denominator becomes a difference of squares: \\[ \\begin{aligned} \\frac{"+n2+"}{"+a2+" + \\sqrt{"+b2+"}} &= \\frac{"+n2+numCore+"}{("+a2+")^2 - (\\sqrt{"+b2+"})^2} \\\\ &= \\frac{"+n2+numCore+"}{"+D2+"} \\\\ &= "+cor2+" \\end{aligned} \\] So the rationalized form is <b>"+u4wrap(cor2)+"</b>.",
      {a:a2,b:b2,n:n2,shape:shape});
  }
  var A=pick([5,6,7,10,11,13,14,15]),B=pick([2,3,5,6,7,10].filter(function(z){return z<A;})),n3=ri(1,6);
  var D3=A-B,g3=u4gcd(n3,D3),n3r=n3/g3,D3r=D3/g3;
  var numC="(\\sqrt{"+A+"} + \\sqrt{"+B+"})";
  var cor3=(D3r===1)?((n3r===1?"":n3r)+numC):("\\frac{"+(n3r===1?"":n3r)+numC+"}{"+D3r+"}");
  var npre3=(n3===1?"":n3);
  var cands3=["\\frac{"+npre3+"(\\sqrt{"+A+"} - \\sqrt{"+B+"})}{"+D3+"}",
    "\\frac{"+npre3+numC+"}{"+(A+B)+"}",
    "\\frac{"+npre3+numC+"}{"+(D3*D3)+"}",
    "\\frac{"+npre3+"(\\sqrt{"+A+"} - \\sqrt{"+B+"})}{"+(A+B)+"}"];
  return mcq("Rationalize the denominator of \\(\\frac{"+n3+"}{\\sqrt{"+A+"} - \\sqrt{"+B+"}}\\) and simplify.",
    u4wrap(cor3),u4dis(cor3,cands3,3).map(u4wrap),
    "Multiply the numerator and denominator by the conjugate \\(\\sqrt{"+A+"} + \\sqrt{"+B+"}\\). The denominator becomes a difference of squares: \\[ \\begin{aligned} \\frac{"+n3+"}{\\sqrt{"+A+"} - \\sqrt{"+B+"}} &= \\frac{"+n3+numC+"}{(\\sqrt{"+A+"})^2 - (\\sqrt{"+B+"})^2} \\\\ &= \\frac{"+n3+numC+"}{"+D3+"} \\\\ &= "+cor3+" \\end{aligned} \\] So the rationalized form is <b>"+u4wrap(cor3)+"</b>.",
    {A:A,B:B,n:n3,shape:shape});
});

/* ---------- 1.16 + 1.17: restrictions and solving radical equations (L2) ---------- */
E("u4-solve-radical",4,["1.16","1.17"],2,"gen",function(){
  var shape=pick(["basic","linear","isolated","twoRad"]);
  if(shape==="basic"){
    var b=pick([-9,-7,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9,11,13,15]),c=ri(2,9);
    var x=c*c-b;
    return numq("Solve the equation \\(\\sqrt{x"+u4sgn(b)+"} = "+c+"\\).",
      x,0.01,
      "Restriction: the radicand must be non-negative, so \\(x \\geq "+(-b)+"\\). Square both sides and solve: \\[ \\begin{aligned} \\sqrt{x"+u4sgn(b)+"} &= "+c+" \\\\ x"+u4sgn(b)+" &= "+(c*c)+" \\\\ x &= "+x+" \\end{aligned} \\] Check: \\(\\sqrt{"+x+u4sgn(b)+"} = \\sqrt{"+(c*c)+"} = "+c+"\\), so the root is <b>\\(x = "+x+"\\)</b>.",
      {b:b,c:c,shape:shape});
  }
  if(shape==="linear"){
    var a=pick([2,3,4]),x0=ri(3,15),c2=ri(2,8);
    var Bc=c2*c2-a*x0;
    return numq("Solve the equation \\(\\sqrt{"+a+"x"+u4sgn(Bc)+"} = "+c2+"\\).",
      x0,0.01,
      "Restriction: the radicand must be non-negative, so \\("+a+"x"+u4sgn(Bc)+" \\geq 0\\). Square both sides and solve: \\[ \\begin{aligned} \\sqrt{"+a+"x"+u4sgn(Bc)+"} &= "+c2+" \\\\ "+a+"x"+u4sgn(Bc)+" &= "+(c2*c2)+" \\\\ "+a+"x &= "+(a*x0)+" \\\\ x &= "+x0+" \\end{aligned} \\] Check: \\(\\sqrt{"+a+" \\times "+x0+u4sgn(Bc)+"} = \\sqrt{"+(c2*c2)+"} = "+c2+"\\), so the root is <b>\\(x = "+x0+"\\)</b>.",
      {a:a,x0:x0,c:c2,shape:shape});
  }
  if(shape==="isolated"){
    var p=ri(1,6),c3=ri(2,8),d=p+c3;
    var b3=pick([-9,-7,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9,11,13,15]);
    var x3=c3*c3-b3;
    return numq("Solve the equation \\("+p+" + \\sqrt{x"+u4sgn(b3)+"} = "+d+"\\).",
      x3,0.01,
      "First isolate the radical. Restriction: the radicand must be non-negative, so \\(x \\geq "+(-b3)+"\\). \\[ \\begin{aligned} "+p+" + \\sqrt{x"+u4sgn(b3)+"} &= "+d+" \\\\ \\sqrt{x"+u4sgn(b3)+"} &= "+c3+" \\\\ x"+u4sgn(b3)+" &= "+(c3*c3)+" \\\\ x &= "+x3+" \\end{aligned} \\] Check: \\("+p+" + \\sqrt{"+x3+u4sgn(b3)+"} = "+p+" + "+c3+" = "+d+"\\), so the root is <b>\\(x = "+x3+"\\)</b>.",
      {p:p,c:c3,b:b3,shape:shape});
  }
  var av=ri(1,9),bv=ri(1,9),xv=av+bv;
  return numq("Solve the equation \\(\\sqrt{x + "+av+"} = \\sqrt{2x"+u4sgn(-bv)+"}\\).",
    xv,0.01,
    "Restrictions: both radicands must be non-negative, so \\(x \\geq "+(-av)+"\\) and \\(x \\geq "+fmt(bv/2,1)+"\\). Square both sides and solve: \\[ \\begin{aligned} \\sqrt{x + "+av+"} &= \\sqrt{2x"+u4sgn(-bv)+"} \\\\ x + "+av+" &= 2x"+u4sgn(-bv)+" \\\\ x &= "+xv+" \\end{aligned} \\] Check: both radicands equal \\("+(xv+av)+"\\), which is non-negative, so the root is <b>\\(x = "+xv+"\\)</b>.",
    {a:av,b:bv,shape:shape});
});

/* ---------- 1.18: verify a claimed root by substitution (L2) ---------- */
E("u4-verify-roots",4,["1.18"],1,"gen",function(){
  var shape=pick(["simple","simple","validStmt","extrValue"]);
  if(shape==="simple"){
    var b=pick([-9,-7,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9,11,13,15]),c=ri(2,9);
    var r=c*c-b;
    return numq("A student solves \\(\\sqrt{x"+u4sgn(b)+"} = "+c+"\\) and claims the root is \\(x = "+r+"\\). To verify the claim, the student substitutes \\(x = "+r+"\\) into the <b>left side</b> of the original equation. What value does the left side give?",
      c,0.01,
      "Substitute into the original equation, not a squared version of it: \\[ \\begin{aligned} \\sqrt{"+r+u4sgn(b)+"} &= \\sqrt{"+(c*c)+"} \\\\ &= "+c+" \\end{aligned} \\] The left side gives <b>"+c+"</b>, which matches the right side, so the claim checks.",
      {b:b,c:c,r:r,shape:shape});
  }
  var cc=ri(2,8),kk=ri(1,4),s=cc-kk,r2=2*cc+1-s,bb2=cc*cc-r2*s;
  var eq="\\sqrt{x"+u4sgn(bb2)+"} = x - "+cc, kv=r2-cc;
  if(shape==="validStmt"){
    var corS="Substituting gives \\(\\sqrt{"+(kv*kv)+"} = "+kv+"\\) on the left and \\("+r2+" - "+cc+" = "+kv+"\\) on the right, so the value checks";
    var candsS=["Substituting gives \\(\\sqrt{"+(kv*kv)+"} = "+(-kv)+"\\) on the left and \\("+r2+" - "+cc+" = "+kv+"\\) on the right, so the value checks",
      "Substituting gives \\(\\sqrt{"+(kv*kv)+"} = "+kv+"\\) on the left and \\("+r2+" - "+cc+" = "+(-kv)+"\\) on the right, so the value checks",
      "Substituting gives \\("+(kv*kv)+"\\) on the left and \\("+r2+" - "+cc+" = "+kv+"\\) on the right, so the value checks"];
    return mcq("A student solves \\("+eq+"\\) and obtains \\(x = "+r2+"\\). Which statement shows the <b>correct verification</b> of this value?",
      corS,u4dis(corS,candsS,3),
      "Verification means substituting into the original equation and evaluating each side separately. The left side is \\(\\sqrt{"+r2+u4sgn(bb2)+"} = \\sqrt{"+(kv*kv)+"} = "+kv+"\\) (a square root is never negative), and the right side is \\("+r2+" - "+cc+" = "+kv+"\\). The two sides agree, so <b>\\(x = "+r2+"\\)</b> is verified as a root.",
      {c:cc,s:s,r:r2,shape:shape});
  }
  return numq("A student solves \\("+eq+"\\) by squaring and lists \\(x = "+s+"\\) as a possible root. Substituting \\(x = "+s+"\\) into the <b>left side</b> of the original equation gives what value?",
    kk,0.01,
    "Substitute into the original equation: \\[ \\begin{aligned} \\sqrt{"+s+u4sgn(bb2)+"} &= \\sqrt{"+(kk*kk)+"} \\\\ &= "+kk+" \\end{aligned} \\] The left side gives <b>"+kk+"</b>. The right side at \\(x = "+s+"\\) is \\("+s+" - "+cc+" = "+(-kk)+"\\), which is different, so this substitution shows \\(x = "+s+"\\) is not a root.",
    {c:cc,s:s,r:r2,shape:shape});
});

/* ---------- 1.15: why the conjugate rationalizes (difference of squares) (L3) ---------- */
E("u4-conjugate-why",4,["1.15"],3,"gen",function(){
  var shape=pick(["whyConj","whyConj","claim"]);
  if(shape==="whyConj"){
    var b=pick([2,3,5,6,7,10,11,13]);
    var a=pick([2,3,4,5,6,7].filter(function(z){return z*z>b;}));
    var D=a*a-b;
    var cor="The product \\(("+a+")^2 - (\\sqrt{"+b+"})^2 = "+(a*a)+" - "+b+" = "+D+"\\) is a difference of squares, so it is a rational number";
    var cands=["The terms \\(+\\sqrt{"+b+"}\\) and \\(-\\sqrt{"+b+"}\\) add to zero, so the denominator becomes \\("+a+" + "+a+" = "+(2*a)+"\\) with no radical",
      "The product \\(("+a+")^2 + (\\sqrt{"+b+"})^2 = "+(a*a)+" + "+b+" = "+(a*a+b)+"\\) is a sum of squares, so it is a rational number",
      "The factor \\("+a+" - \\sqrt{"+b+"}\\) is the reciprocal of \\("+a+" + \\sqrt{"+b+"}\\), so their product is \\(1\\) and the radical disappears"];
    return mcq("To rationalize the denominator of \\(\\frac{1}{"+a+" + \\sqrt{"+b+"}}\\), the numerator and denominator are multiplied by the conjugate \\("+a+" - \\sqrt{"+b+"}\\). Why does this remove the radical from the denominator?",
      cor,u4dis(cor,cands,3),
      "Multiply the pair out: \\(("+a+" + \\sqrt{"+b+"})("+a+" - \\sqrt{"+b+"}) = "+a+"^2 - "+a+"\\sqrt{"+b+"} + "+a+"\\sqrt{"+b+"} - "+b+"\\). The two middle terms cancel, leaving the difference of squares \\("+a+"^2 - "+b+" = "+D+"\\), a rational number with no radical. The conjugate works precisely because a product of the form \\((p + q)(p - q)\\) collapses to \\(p^2 - q^2\\).",
      {a:a,b:b,shape:shape});
  }
  var A2=pick([2,3,5,6,7,10]),B2=pick([2,3,5,6,7,10].filter(function(z){return z!==A2;})),n2=ri(1,6);
  var corB="\\("+(A2+B2)+" + 2\\sqrt{"+(A2*B2)+"}\\)";
  var candsB=["\\("+(A2+B2)+"\\)","\\("+(A2-B2)+"\\)","\\("+(A2+B2)+" - 2\\sqrt{"+(A2*B2)+"}\\)"];
  return mcq("A student multiplies the numerator and denominator of \\(\\frac{"+n2+"}{\\sqrt{"+A2+"} + \\sqrt{"+B2+"}}\\) by \\(\\sqrt{"+A2+"} + \\sqrt{"+B2+"}\\), claiming the new denominator will be rational. What is the new denominator actually equal to?",
    corB,u4dis(corB,candsB,3).map(function(z){return z;}),
    "Squaring the binomial keeps a middle term: \\((\\sqrt{"+A2+"} + \\sqrt{"+B2+"})^2 = "+A2+" + 2\\sqrt{"+A2+" \\times "+B2+"} + "+B2+" = "+(A2+B2)+" + 2\\sqrt{"+(A2*B2)+"}\\), which still contains a radical, so the claim fails. The conjugate \\(\\sqrt{"+A2+"} - \\sqrt{"+B2+"}\\) is the multiplier that works, because its product with the denominator is the difference of squares \\("+A2+" - "+B2+" = "+(A2-B2)+"\\), a rational number.",
    {A:A2,B:B2,n:n2,shape:shape});
});

/* ---------- 1.19: why a root from squaring can be extraneous (L3) ---------- */
E("u4-extraneous-why",4,["1.19"],3,"gen",function(){
  var c=ri(2,8),k=ri(1,4),s=c-k,r=2*c+1-s,b=c*c-r*s;
  var eq="\\sqrt{x"+u4sgn(b)+"} = x - "+c;
  var shape=pick(["why","why","step","which"]);
  if(shape==="why"){
    var cor="At \\(x = "+s+"\\), the right side is \\("+s+" - "+c+" = "+(-k)+"\\), which is negative, but a square root is never negative, so the two sides cannot be equal";
    var cands=["At \\(x = "+s+"\\), the radicand \\(x"+u4sgn(b)+"\\) is a negative number, so the square root in the equation is undefined there",
      "Squaring both sides is never a valid step in solving an equation, so both values found this way have to be thrown out entirely",
      "The value \\(x = "+s+"\\) does not satisfy the squared equation either, since it fails \\(x"+u4sgn(b)+" = (x - "+c+")^2\\) when it is substituted back and checked"];
    return mcq("Solving \\("+eq+"\\) by squaring both sides leads to \\(x = "+r+"\\) and \\(x = "+s+"\\). The value \\(x = "+s+"\\) is not a solution of the original equation. Why not?",
      cor,u4dis(cor,cands,3),
      "Check \\(x = "+s+"\\) in the original equation: the left side is \\(\\sqrt{"+s+u4sgn(b)+"} = \\sqrt{"+(k*k)+"} = "+k+"\\) (the radicand there is positive), while the right side is \\("+s+" - "+c+" = "+(-k)+"\\). Squaring can produce values that solve the squared equation but fail the original, because the squared equation cannot tell \\("+k+"\\) from \\("+(-k)+"\\) on the right side. Only \\(x = "+r+"\\) checks.",
      {c:c,k:k,s:s,r:r,shape:shape});
  }
  if(shape==="step"){
    var cor2="When both sides are squared, because the squared equation also admits roots of the equation with the right side negated";
    var cands2=["When the radical is isolated on one side, since moving terms across the equals sign changes the solution set of the equation",
      "When the resulting quadratic is factored, since factoring a quadratic can introduce values that were not there before",
      "When the final answers are checked by substitution, since the check itself can create values that fail the original equation"];
    return mcq("When an equation such as \\("+eq+"\\) is solved, an extraneous root can appear. At which step does it enter?",
      cor2,u4dis(cor2,cands2,3),
      "Squaring is the step that can enlarge the solution set: the squared equation \\(x"+u4sgn(b)+" = (x - "+c+")^2\\) is satisfied not only by roots of the original equation but also by roots of \\(\\sqrt{x"+u4sgn(b)+"} = -(x - "+c+")\\). Isolating and factoring preserve the solution set, and checking only filters values out. That is why every root is checked in the original equation.",
      {c:c,k:k,s:s,r:r,shape:shape});
  }
  return mcq("Solving \\("+eq+"\\) by squaring gives \\(x = "+r+"\\) or \\(x = "+s+"\\). Which value is extraneous?",
    ""+s,[""+r,"Both values","Neither value"],
    "Substitute each value into the original equation. At \\(x = "+r+"\\): the left side is \\(\\sqrt{"+(r+b)+"} = \\sqrt{"+((r-c)*(r-c))+"} = "+(r-c)+"\\) and the right side is \\("+r+" - "+c+" = "+(r-c)+"\\), so it checks. At \\(x = "+s+"\\): the left side is \\(\\sqrt{"+(k*k)+"} = "+k+"\\) but the right side is \\("+s+" - "+c+" = "+(-k)+"\\), so it fails. The extraneous value is <b>\\(x = "+s+"\\)</b>.",
    {c:c,k:k,s:s,r:r,shape:shape});
});

/* ---------- 1.20: model a situation with a radical equation (L3) ---------- */
E("u4-model-radical",4,["1.20"],3,"gen",function(){
  var shape=pick(["pendulum","pendulum","fallTime","fallHeight","horizon","tank"]);
  if(shape==="pendulum"){
    var penCtx=[
      {key:"longcase clock",text:"A pendulum in a longcase clock",Ts:[1.0,1.4,2.0]},
      {key:"science display",text:"A pendulum on a science centre display",Ts:[1.6,2.0,2.4,2.8,3.0]},
      {key:"playground swing",text:"A playground swing, modelled as a pendulum",Ts:[1.8,2.2,2.6,3.0]}];
    var pc=pick(penCtx),T=pick(pc.Ts);
    var L=9.8*Math.pow(T/(2*Math.PI),2);
    return numq(pc.text+" has a period of "+fmt(T,1)+" s. The period is modelled by \\(T = 2\\pi\\sqrt{\\frac{L}{9.8}}\\), where \\(L\\) is the length of the pendulum in metres. Find the length of the pendulum, in metres.",
      L,0.03,
      "Substitute \\(T = "+fmt(T,1)+"\\) and solve the radical equation for \\(L\\): \\[ \\begin{aligned} "+fmt(T,1)+" &= 2\\pi\\sqrt{\\frac{L}{9.8}} \\\\ \\frac{"+fmt(T,1)+"}{2\\pi} &= \\sqrt{\\frac{L}{9.8}} \\\\ \\left(\\frac{"+fmt(T,1)+"}{2\\pi}\\right)^2 &= \\frac{L}{9.8} \\\\ L &= 9.8 \\times \\left(\\frac{"+fmt(T,1)+"}{2\\pi}\\right)^2 \\\\ &\\approx "+fmt(L,2)+" \\end{aligned} \\] The length of the pendulum is about <b>"+fmt(L,2)+" m</b>.",
      {ctx:"pendulum: "+pc.key,T:T,L:Math.round(L*1000)/1000});
  }
  var fallCtx=[
    {key:"cliff",text:"A stone is dropped from a cliff",hs:[20,30,40,50,65,80],ts:[2,2.5,3,3.5,4]},
    {key:"scaffold",text:"A wrench slips from the top of a scaffold",hs:[5,10,15,20,25],ts:[1,1.5,2]},
    {key:"bridge",text:"A ball is dropped from a bridge deck",hs:[15,20,25,30,40,50],ts:[1.5,2,2.5,3]}];
  if(shape==="fallTime"){
    var fc=pick(fallCtx),h=pick(fc.hs),t=Math.sqrt(2*h/9.8);
    return numq(fc.text+" that is "+h+" m above the ground. The time to reach the ground is modelled by \\(t = \\sqrt{\\frac{2h}{9.8}}\\), with \\(t\\) in seconds and \\(h\\) in metres. Find the time, in seconds.",
      t,0.05,
      "Substitute \\(h = "+h+"\\) and evaluate: \\[ \\begin{aligned} t &= \\sqrt{\\frac{2 \\times "+h+"}{9.8}} \\\\ &= \\sqrt{"+fmt(2*h/9.8,2)+"} \\\\ &\\approx "+fmt(t,2)+" \\end{aligned} \\] The fall takes about <b>"+fmt(t,2)+" s</b>.",
      {ctx:"fall: "+fc.key,h:h,t:Math.round(t*100)/100});
  }
  if(shape==="fallHeight"){
    var fc2=pick(fallCtx),t2=pick(fc2.ts),h2=4.9*t2*t2;
    return numq(fc2.text+" and takes "+fmt(t2,1)+" s to reach the ground. The fall time is modelled by \\(t = \\sqrt{\\frac{2h}{9.8}}\\), with \\(t\\) in seconds and \\(h\\) in metres. Find the height, in metres.",
      h2,0.5,
      "Substitute \\(t = "+fmt(t2,1)+"\\) and solve the radical equation for \\(h\\): \\[ \\begin{aligned} "+fmt(t2,1)+" &= \\sqrt{\\frac{2h}{9.8}} \\\\ "+fmt(t2*t2,2)+" &= \\frac{2h}{9.8} \\\\ h &= \\frac{9.8 \\times "+fmt(t2*t2,2)+"}{2} \\\\ &= "+fmt(h2,1)+" \\end{aligned} \\] The height is about <b>"+fmt(h2,1)+" m</b>.",
      {ctx:"fall: "+fc2.key,t:t2,h:Math.round(h2*10)/10});
  }
  if(shape==="horizon"){
    var horCtx=[
      {key:"ship deck",text:"from the deck of a ship",hs:[4,9,16,25]},
      {key:"lighthouse",text:"from a lighthouse platform",hs:[16,25,36,49]},
      {key:"cliff top",text:"from a seaside cliff top",hs:[25,36,49,64,81,100]}];
    var hc=pick(horCtx),hh=pick(hc.hs),dd=3.57*Math.sqrt(hh);
    return numq("An observer "+hc.text+" is "+hh+" m above the sea. The distance to the horizon is modelled by \\(d = 3.57\\sqrt{h}\\), where \\(h\\) is the height in metres and \\(d\\) is the distance in kilometres. Find the distance to the horizon, in kilometres.",
      dd,0.15,
      "Substitute \\(h = "+hh+"\\) and evaluate: \\[ \\begin{aligned} d &= 3.57\\sqrt{"+hh+"} \\\\ &= 3.57 \\times "+fmt(Math.sqrt(hh),1)+" \\\\ &= "+fmt(dd,2)+" \\end{aligned} \\] The distance to the horizon is about <b>"+fmt(dd,2)+" km</b>.",
      {ctx:"horizon: "+hc.key,h:hh,d:Math.round(dd*10)/10});
  }
  var tankCtx=[
    {key:"rain barrel",text:"a rain barrel",hs:[0.5,1,1.5]},
    {key:"storage tank",text:"a storage tank",hs:[1,2,3,4,5]}];
  var tc=pick(tankCtx),th=pick(tc.hs),tv=Math.sqrt(19.6*th);
  return numq("Water drains through a hole near the bottom of "+tc.text+". The speed of the water leaving the hole is modelled by \\(v = \\sqrt{19.6h}\\), where \\(h\\) is the depth of the hole below the surface in metres and \\(v\\) is the speed in metres per second. If the hole is "+fmt(th,1)+" m below the surface, find the speed, in metres per second.",
    tv,0.1,
    "Substitute \\(h = "+fmt(th,1)+"\\) and evaluate: \\[ \\begin{aligned} v &= \\sqrt{19.6 \\times "+fmt(th,1)+"} \\\\ &= \\sqrt{"+fmt(19.6*th,1)+"} \\\\ &\\approx "+fmt(tv,2)+" \\end{aligned} \\] The speed is about <b>"+fmt(tv,2)+" m/s</b>.",
    {ctx:"tank: "+tc.key,h:th,v:Math.round(tv*100)/100});
});

/* ============ Prior knowledge tranche (Nov 15, 2026) ============ */
/* Borrowed verbatim from the feeder banks named in the source
   comments and the PKT table below, plus authored micro-items
   where the prior knowledge map names a skill no feeder entry
   assesses. Spec: Math-2200-PK-Tranche-Spec-2026-11-15.md. */

/* u4-pk-radical-mixed: borrowed verbatim from math-1201 entry u2-radical-mixed (math-1201:1.16). */
E("u4-pk-radical-mixed",4,["1.1"],1,"gen",function(){
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

/* u4-pk-radical-entire: borrowed verbatim from math-1201 entry u2-radical-entire (math-1201:1.17). */
E("u4-pk-radical-entire",4,["1.2"],1,"gen",function(){
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

/* u4-pk-laws-integral: borrowed verbatim from math-1201 entry u2-laws-integral (math-1201:1.6). */
E("u4-pk-laws-integral",4,["1.13"],2,"gen",function(){
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

/* u4-pk-laws-rational: borrowed verbatim from math-1201 entry u2-laws-rational (math-1201:1.6). */
E("u4-pk-laws-rational",4,["1.13"],2,"gen",function(){
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

/* u4-pk-sort-numbers: borrowed verbatim from math-1201 entry u2-sort-numbers (math-1201:1.18). */
E("u4-pk-sort-numbers",4,["1.9"],1,"gen",function(){
  function ratItem(){
    var kind=ri(1,5);
    if(kind===1){var p=ri(1,15),q=pick([2,3,4,5,6,7,8,9]),tg=0;while(u2gcd(p,q)!==1&&tg<60){p=ri(1,15);q=pick([2,3,4,5,6,7,8,9]);tg++;}return {str:"\\("+FR(p,q)+"\\)",rat:true};}
    if(kind===2){return {str:""+pick([0.5,1.25,2.75,3.4,0.125,5.6,7.05,0.9]),rat:true};}
    if(kind===3){var r=ri(2,12);return {str:"\\(\\sqrt{"+(r*r)+"}\\)",rat:true};}
    if(kind===4){return {str:"\\(0.\\overline{"+ri(2,9)+"}\\)",rat:true};}
    var r5=ri(2,6);return {str:"\\(\\sqrt[3]{"+(r5*r5*r5)+"}\\)",rat:true};
  }
  function irrItem(){
    var kind=ri(1,4);
    if(kind===1){var n=ri(2,60);var t=0;while(u2isSq(n)&&t<100){n=ri(2,60);t++;}return {str:"\\(\\sqrt{"+n+"}\\)",rat:false};}
    if(kind===2){var n2=ri(2,80);var t2=0;while(u2isCu(n2)&&t2<100){n2=ri(2,80);t2++;}return {str:"\\(\\sqrt[3]{"+n2+"}\\)",rat:false};}
    if(kind===3){return {str:"\\(\\pi\\)",rat:false};}
    return {str:pick(["1.01001000100001...","2.12112111211112...","0.123456789101112...","3.23223222322223..."]),rat:false};
  }
  var mode=ri(1,3);
  if(mode===3){
    function rawOf(it){var s=it.str;if(s.slice(0,2)==="\\("&&s.slice(-2)==="\\)")return s.slice(2,-2);return s;}
    function fragSet(wantBad){
      var frags=[],seenF={},g=0;
      while(frags.length<3&&g<300){g++;
        var it=(wantBad&&frags.length===2)?irrItem():ratItem();
        var f=rawOf(it);
        if(seenF[f])continue;seenF[f]=1;frags.push(f);}
      return shuffle(frags);
    }
    function setStr(frags){return "\\(\\{"+frags.join(", ")+"\\}\\)";}
    var good=setStr(fragSet(false));
    var bads=[],guard=0;
    while(bads.length<3&&guard<200){guard++;var bs=setStr(fragSet(true));if(bs!==good&&bads.indexOf(bs)<0)bads.push(bs);}
    return mcq("Which set contains <b>only</b> rational numbers?",
      good,bads,
      "A rational number can be written as a ratio of integers, which includes fractions, terminating decimals, repeating decimals, and roots of perfect powers. Roots of numbers that are not perfect powers, \\(\\pi\\), and decimals that go on without repeating are irrational. Only one set avoids all of those. The set with only rational numbers is <b>"+good+"</b>.",
      {mode:mode,keyStr:good});
  }
  var wantIrr=(mode===1);
  var items=[],seen={};
  function addItem(it){if(!it||seen[it.str])return;seen[it.str]=1;items.push(it);}
  if(wantIrr){
    addItem(irrItem());
    var g1=0;while(items.length<4&&g1<300){g1++;addItem(ratItem());}
  }else{
    addItem(ratItem());
    var g2=0;while(items.length<4&&g2<300){g2++;addItem(irrItem());}
  }
  var target=items.filter(function(x){return x.rat===!wantIrr;})[0];
  var others=items.filter(function(x){return x!==target;}).map(function(x){return x.str;});
  return mcq(wantIrr?"Which number is <b>irrational</b>?":"Which number is <b>rational</b>?",
    target.str,others,
    "Rational numbers are exactly the numbers that can be written as a ratio of two integers: fractions, terminating or repeating decimals, and roots that come out whole. A root of a number that is not a perfect power, the number \\(\\pi\\), and a decimal that continues without repeating are irrational. The "+(wantIrr?"irrational":"rational")+" number in the list is <b>"+target.str+"</b>.",
    {mode:mode,items:items,keyStr:target.str});
});

/* u4-pk-subsets: borrowed verbatim from math-1201 entry u2-subsets (math-1201:1.19). */
E("u4-pk-subsets",4,["1.9"],1,"var",varset([
  function(){var key="Integers: the whole numbers, their negatives, and zero";
    return mcq("What is the <b>most specific</b> subset of the real numbers that \\(-12\\) belongs to?",
    key,["Natural numbers: the counting numbers, starting from one","Whole numbers: the counting numbers, together with zero","Rational numbers: ratios of two integers"],
    "The number \\(-12\\) is a negative whole value. It is not a natural number (the counting numbers start at \\(1\\)) and not a whole number (whole numbers are \\(0\\) and up). It is an integer, and although every integer is also rational, the most specific set that fits is the integers. The most specific subset is <b>integers</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Whole numbers: the counting numbers, together with zero";
    return mcq("What is the <b>most specific</b> subset of the real numbers that \\(0\\) belongs to?",
    key,["Natural numbers: the counting numbers, starting from one","Integers: the whole numbers, their negatives, and zero","Rational numbers: ratios of two integers"],
    "The number \\(0\\) is not a natural number, because the natural numbers are the counting numbers \\(1, 2, 3, \\ldots\\). It is a whole number, since the whole numbers are the natural numbers together with \\(0\\). It is also an integer and a rational number, but the most specific set that fits is the whole numbers. The most specific subset is <b>whole numbers</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Rational numbers: ratios of two integers, with a nonzero denominator";
    return mcq("What is the <b>most specific</b> subset of the real numbers that \\("+FR(4,5)+"\\) belongs to?",
    key,["Natural numbers: the counting numbers, starting from one and continuing without end","Whole numbers: the counting numbers, together with zero","Integers: the whole numbers, their negatives, and zero"],
    "The value \\("+FR(4,5)+"\\) is a ratio of two integers, which is exactly the definition of a rational number. It is not a counting number, a whole number, or an integer, because it lies between \\(0\\) and \\(1\\). The most specific subset is <b>rational numbers</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Irrational numbers: real numbers that are not ratios of integers";
    return mcq("What is the <b>most specific</b> subset of the real numbers that \\(\\sqrt{7}\\) belongs to?",
    key,["Natural numbers: the counting numbers, starting from one","Integers: the whole numbers, their negatives, and zero","Rational numbers: ratios of two integers, with a nonzero denominator, in lowest terms"],
    "The value \\(\\sqrt{7}\\) cannot be written as a ratio of two integers, because \\(7\\) is not a perfect square and its root is a non-terminating, non-repeating decimal. Numbers that are real but not rational form the irrational numbers. The most specific subset is <b>irrational numbers</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Natural numbers: the counting numbers, starting from one";
    return mcq("What is the <b>most specific</b> subset of the real numbers that \\(9\\) belongs to?",
    key,["Whole numbers: the counting numbers, together with the number zero","Integers: the whole numbers, their negatives, and zero","Rational numbers: ratios of two integers"],
    "The number \\(9\\) is a counting number, so it is a natural number. Every natural number is also a whole number, an integer, and a rational number, since the sets nest inside each other, but the most specific set that fits is the smallest one containing it. The most specific subset is <b>natural numbers</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Every integer is also a rational number";
    return mcq("Which statement about the subsets of the real numbers is <b>true</b>?",
    key,
    ["Every rational number is an integer","Every whole number is also a natural number","Irrational numbers are rational numbers written in lowest terms"],
    "The subsets nest: natural numbers sit inside whole numbers, inside integers, inside rational numbers. So any integer \\(k\\) can be written as the ratio \\("+FR("k",1)+"\\), which makes it rational. The reverse claims fail: \\("+FR(1,2)+"\\) is rational but not an integer, \\(0\\) is whole but not natural, and irrational numbers cannot be written as ratios at all. The true statement is: <b>every integer is also a rational number</b>.",
    {stmt:true,keyText:key});}
]));

/* u4-pk-approx: borrowed verbatim from math-1201 entry u2-approx (math-1201:1.20). */
E("u4-pk-approx",4,["1.9"],2,"gen",function(){
  var roll=Math.random();
  if(roll<0.6){
    var n=ri(2,600),t=0;while(u2isSq(n)&&t<200){n=ri(2,600);t++;}
    var lo=Math.floor(Math.sqrt(n)),ans=Math.round(Math.sqrt(n)*10)/10;
    var dLo=n-lo*lo,dHi=(lo+1)*(lo+1)-n;
    return numq("Give the approximate value of \\(\\sqrt{"+n+"}\\) to one decimal place.",
      ans,0.051,
      "Locate \\(\\sqrt{"+n+"}\\) between consecutive perfect squares: \\["+
      "\\begin{aligned} "+(lo*lo)+" &< "+n+" < "+((lo+1)*(lo+1))+" \\\\ "+lo+" &< \\sqrt{"+n+"} < "+(lo+1)+" \\end{aligned} \\]"+
      " Since \\("+n+"\\) is closer to \\("+(dLo<dHi?(lo*lo):((lo+1)*(lo+1)))+"\\), the root is closer to \\("+(dLo<dHi?lo:(lo+1))+"\\), and checking tenths gives \\(\\sqrt{"+n+"} \\approx "+ans+"\\). On a number line it sits between \\("+lo+"\\) and \\("+(lo+1)+"\\), nearer \\("+(dLo<dHi?lo:(lo+1))+"\\). The approximate value is <b>\\("+ans+"\\)</b>.",
      {mode:2,n:n,ans:ans});
  }
  if(roll<0.9){
    var n3=ri(2,600),t3=0;while(u2isCu(n3)&&t3<200){n3=ri(2,600);t3++;}
    var lo3=Math.floor(Math.cbrt(n3)),ans3=Math.round(Math.cbrt(n3)*10)/10;
    var dLo3=n3-lo3*lo3*lo3,dHi3=(lo3+1)*(lo3+1)*(lo3+1)-n3;
    return numq("Give the approximate value of \\(\\sqrt[3]{"+n3+"}\\) to one decimal place.",
      ans3,0.051,
      "Locate \\(\\sqrt[3]{"+n3+"}\\) between consecutive perfect cubes: \\["+
      "\\begin{aligned} "+(lo3*lo3*lo3)+" &< "+n3+" < "+((lo3+1)*(lo3+1)*(lo3+1))+" \\\\ "+lo3+" &< \\sqrt[3]{"+n3+"} < "+(lo3+1)+" \\end{aligned} \\]"+
      " Since \\("+n3+"\\) is closer to \\("+(dLo3<dHi3?(lo3*lo3*lo3):((lo3+1)*(lo3+1)*(lo3+1)))+"\\), the root is closer to \\("+(dLo3<dHi3?lo3:(lo3+1))+"\\), and checking tenths gives \\(\\sqrt[3]{"+n3+"} \\approx "+ans3+"\\). On a number line it sits between \\("+lo3+"\\) and \\("+(lo3+1)+"\\). The approximate value is <b>\\("+ans3+"\\)</b>.",
      {mode:3,n:n3,ans:ans3});
  }
  var k=ri(2,9),ansP=Math.round(k*Math.PI*100)/100;
  return numq("Give the approximate value of \\("+k+"\\pi\\) to two decimal places.",
    ansP,0.011,
    "Use \\(\\pi \\approx 3.14159\\): \\["+
    "\\begin{aligned} "+k+"\\pi &\\approx "+k+" \\times 3.14159 \\\\ &\\approx "+ansP+" \\end{aligned} \\]"+
    " The approximate value is <b>\\("+ansP+"\\)</b>.",
    {mode:1,k:k,ans:ansP});
});

/* u4-pk-solve-two-step: borrowed verbatim from math-9 entry u5-solve-two-step (math-9:8.18). */
E("u4-pk-solve-two-step",4,["1.17"], 2, "gen", function () {
  var form = ri(0, 2);
  if (form === 0) {
    var a = ri(2, 9), x0 = ri(-9, 9); if (x0 === 0) x0 = 4;
    var b = ri(-12, 12); if (b === 0) b = 5;
    var c = a * x0 + b;
    var sol = "Undo the constant first, then undo the multiplication: \\[ \\begin{aligned} " + n5lin(a, b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(c - b) + " \\\\ x &= " + fmt(x0) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x0) + "\\)</b>.";
    return numq("Solve the equation \\(" + n5lin(a, b) + " = " + fmt(c) + "\\). What is the value of \\(x\\)?", x0, 0.01, sol, { mode: "ax+b", a: a, b: b, c: c });
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
  var sol3 = "Collect the x terms on one side first: \\[ \\begin{aligned} " + fmt(a3) + "x &= " + n5lin(c3, b3) + " \\\\ " + fmt(a3 - c3) + "x &= " + fmt(b3) + " \\\\ x &= " + fmt(x2) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x2) + "\\)</b>.";
  return numq("Solve the equation \\(" + fmt(a3) + "x = " + n5lin(c3, b3) + "\\). What is the value of \\(x\\)?", x2, 0.01, sol3, { mode: "ax=cx+b", a: a3, b: b3, c: c3 });
}, ["Undo the operations in reverse order: deal with the constant term before the term attached to x.", "First isolate the x term on one side, using the same operation on both sides."]);

/* u4-pk-which-is-solution: borrowed verbatim from math-9 entry u5-which-is-solution (math-9:8.20). */
E("u4-pk-which-is-solution",4,["1.18"], 1, "gen", function () {
  var a = ri(2, 7), x0 = ri(-6, 9), b = ri(-9, 9);
  var c = a * x0 + b;
  function fbFor(v) { return "Substituting \\(x = " + fmt(v) + "\\) gives a left side of " + fmt(a * v + b) + ", which is not " + fmt(c) + "."; }
  var cands = [
    { t: fmt(x0 + 1), fb: fbFor(x0 + 1) },
    { t: fmt(x0 - 1), fb: fbFor(x0 - 1) },
    { t: fmt(x0 + 2), fb: fbFor(x0 + 2) }
  ];
  var sol = "Substitute the value and compare the two sides: \\[ \\begin{aligned} " + n5lin(a, b) + " &= " + fmt(a) + "(" + fmt(x0) + ")" + (b >= 0 ? "+" + fmt(b) : "-" + fmt(-b)) + " \\\\ &= " + fmt(c) + " \\end{aligned} \\] Both sides match, so the solution is <b>\\(x = " + fmt(x0) + "\\)</b>.";
  return mcq("Which value is the solution of \\(" + n5lin(a, b) + " = " + fmt(c) + "\\)?", { t: fmt(x0), fb: "Correct: substituting it makes both sides equal." }, cands, sol, { mode: "which-sol", a: a, b: b, c: c });
}, ["A solution is a value that makes both sides equal when it is substituted.", "First substitute one value and work out the left side, then compare it with the right side."]);

/* PK tranche pass for Unit 4. pkFor is the cluster's dependent
   indicator list from the prior knowledge map, as registered
   for this unit in courses.js. */
var PKT_U4_FOR=["1.1","1.2","1.3","1.4","1.9","1.11","1.12","1.13","1.14","1.15","1.16","1.17","1.18","1.19","1.20"];
var PKT_U4={
 "u4-pk-radical-mixed":{src:"math-1201:1.16",group:"radical-forms"},
 "u4-pk-radical-entire":{src:"math-1201:1.17",group:"radical-forms"},
 "u4-pk-laws-integral":{src:"math-1201:1.6",group:"exponent-laws"},
 "u4-pk-laws-rational":{src:"math-1201:1.6",group:"exponent-laws"},
 "u4-pk-sort-numbers":{src:"math-1201:1.18",group:"real-numbers"},
 "u4-pk-subsets":{src:"math-1201:1.19",group:"real-numbers"},
 "u4-pk-approx":{src:"math-1201:1.20",group:"real-numbers"},
 "u4-pk-solve-two-step":{src:"math-9:8.18",group:"linear-equations"},
 "u4-pk-which-is-solution":{src:"math-9:8.20",group:"verify-solution"}
};
BANK.forEach(function(e){var t=PKT_U4[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U4_FOR.slice();e.pkGroup=t.group;}});

/* ----- bank-u5.js ----- */
// Math 2200 Unit 5 Rational Expressions and Equations question bank
// CRMARKS: u5-add-subtract=2
// CRMARKS: u5-complex-fraction=2
// CRMARKS: u5-divide=2
// CRMARKS: u5-equivalent-form=1
// CRMARKS: u5-equivalent-restrictions=2
// CRMARKS: u5-error-cancel=2
// CRMARKS: u5-lcd=1
// CRMARKS: u5-lcd-choose=2
// CRMARKS: u5-meeting-problem=3
// CRMARKS: u5-multiply=2
// CRMARKS: u5-npv-basic=1
// CRMARKS: u5-npv-quadratic=2
// CRMARKS: u5-simplify-basic=1
// CRMARKS: u5-simplify-evaluate=2
// CRMARKS: u5-simplify-trinomial=2
// CRMARKS: u5-solve-linear=2
// CRMARKS: u5-word-problem=3
// BIMODAL: u5-simplify-trinomial=b
// BIMODAL: u5-npv-quadratic=a
// BIMODAL: u5-multiply=b
// BIMODAL: u5-error-cancel=b
// BIMODAL: u5-equivalent-restrictions=b
// BIMODAL: u5-divide=b
// BIMODAL: u5-add-subtract=b
/* ================= Unit 5: Rational Expressions and Equations ================= */
/* ================= Unit 5: Rational Expressions and Equations ================= */
/* Indicators: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10, 3.11, 3.12,
   3.13, 3.18, 3.19, 3.20, 3.21. Types follow the Mauger Chapter 6 sets
   (non-permissible values, equivalent expressions, simplify and state
   restrictions, multiply/divide, add/subtract with LCD, complex fractions,
   solve rational equations with extraneous roots, first-step and first-error
   items, and the four word-problem scenarios: work rates, distance and
   speed, upstream/downstream, shared cost) and the MHR Pre-Calculus 11
   Chapter 6 bank, rewritten with original stems and values.
   19 entries: L1 4, L2 11, L3 4. Helpers are prefixed u5. */

function u5gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t;}return a||1;}
function u5sgn(n){return n>0?" + "+n:(n<0?" - "+(-n):"");}
function u5lin(a,b){if(a===0)return ""+b;var s=(a===1?"x":(a===-1?"-x":a+"x"));if(b>0)s+=" + "+b;else if(b<0)s+=" - "+(-b);return s;}
function u5par(a,b){return "("+u5lin(a,b)+")";}
function u5quad(a,b,c){var s=(a===1?"x^2":(a===-1?"-x^2":a+"x^2"));if(b>0)s+=" + "+(b===1?"x":b+"x");else if(b<0)s+=" - "+(b===-1?"x":(-b)+"x");if(c>0)s+=" + "+c;else if(c<0)s+=" - "+(-c);return s;}
function u5fr(n,d){if(d<0){n=-n;d=-d;}if(n===0)return "0";var g=u5gcd(n,d);n/=g;d/=g;var s=n<0?"-":"";n=Math.abs(n);if(d===1)return s+n;return s+"\\frac{"+n+"}{"+d+"}";}
function u5wrap(s){return "\\("+s+"\\)";}
function u5frac(n,d){return "\\frac{"+n+"}{"+d+"}";}
function u5dis(correct,cands,n){var out=[],seen={};seen[String(correct)]=1;for(var i=0;i<cands.length&&out.length<n;i++){var s=String(cands[i]);if(!seen[s]){seen[s]=1;out.push(s);}}return out;}
function u5npvStr(vals){var v=vals.slice().sort(function(x,y){return x-y;});return v.map(function(z){return "x \\ne "+z;}).join(", ");}
function u5pow(e){return e===0?"":(e===1?"x":"x^{"+e+"}");}
function u5cp(c,e){if(e===0)return ""+c;var p=u5pow(e);return c===1?p:c+p;}
function u5fac(r,p){var s=u5par(1,-r);return p===1?s:s+"^"+p;}
function u5monoVal(cn,cd,e){ /* body for (cn/cd) * x^e, cn,cd positive and reduced, e any sign */
  var top,bot;
  if(e>=0){top=u5cp(cn,e);bot=(cd===1?"":""+cd);}
  else{top=""+cn;bot=(cd===1?"":cd)+u5pow(-e);}
  if(bot==="")return top;
  return "\\frac{"+top+"}{"+bot+"}";
}
var U5NZ=[-6,-5,-4,-3,-2,-1,1,2,3,4,5,6];
function u5twoRoots(){var r1=pick(U5NZ),r2=pick(U5NZ),t=0;while(r2===r1&&t<60){r2=pick(U5NZ);t++;}return [r1,r2];}

/* ---------- 3.1 + 3.2: non-permissible values, monomial/binomial/factored denominators (L1) ---------- */
E("u5-npv-basic",5,["3.1","3.2"],1,"gen",function(){
  var shape=pick(["mono","binom","factored","factored3"]);
  if(shape==="mono"){
    var a=ri(2,6),c=ri(2,9),tc=0;
    while(c===a&&tc<40){c=ri(2,9);tc++;}
    var cor="x \\ne 0";
    return mcq("State the non-permissible value of the rational expression \\("+u5frac(c,a+"x")+"\\).",
      u5wrap(cor),u5dis(cor,["x \\ne "+a,"x \\ne "+(-a),"x \\ne "+c,"x \\ne "+(a+2)],3).map(u5wrap),
      "A value is non-permissible when it makes the denominator zero. Here \\("+a+"x = 0\\) when \\(x = 0\\), so the non-permissible value is <b>\\(x \\ne 0\\)</b>.",
      {shape:shape,roots:[0]});
  }
  if(shape==="binom"){
    var r=pick(U5NZ),c2=ri(2,9);
    var cor2="x \\ne "+r;
    return mcq("State the non-permissible value of the rational expression \\("+u5frac(c2,u5lin(1,-r))+"\\).",
      u5wrap(cor2),u5dis(cor2,["x \\ne "+(-r),"x \\ne 0","x \\ne "+(r+(r>0?2:-2))],3).map(u5wrap),
      "Set the denominator equal to zero and solve: \\[ \\begin{aligned} "+u5lin(1,-r)+" &= 0 \\\\ x &= "+r+" \\end{aligned} \\] So the non-permissible value is <b>\\(x \\ne "+r+"\\)</b>.",
      {shape:shape,roots:[r]});
  }
  var rs=u5twoRoots(),r1=rs[0],r2=rs[1],c3=ri(2,9);
  if(shape==="factored"){
    var cor3=u5npvStr([r1,r2]);
    return mcq("State the non-permissible values of the rational expression \\("+u5frac(c3,u5par(1,-r1)+u5par(1,-r2))+"\\).",
      u5wrap(cor3),u5dis(cor3,[u5npvStr([r1]),u5npvStr([r2]),u5npvStr([-r1,-r2]),u5npvStr([r1,-r2])],3).map(u5wrap),
      "The denominator is zero when either factor is zero: \\("+u5lin(1,-r1)+" = 0\\) gives \\(x = "+r1+"\\), and \\("+u5lin(1,-r2)+" = 0\\) gives \\(x = "+r2+"\\). So the non-permissible values are <b>\\("+cor3+"\\)</b>.",
      {shape:shape,roots:[r1,r2]});
  }
  var r3=pick(U5NZ),t3=0;while((r3===r1||r3===r2)&&t3<60){r3=pick(U5NZ);t3++;}
  var cor4=u5npvStr([r1,r2,r3]);
  return mcq("State the non-permissible values of the rational expression \\("+u5frac(c3,u5par(1,-r1)+u5par(1,-r2)+u5par(1,-r3))+"\\).",
    u5wrap(cor4),u5dis(cor4,[u5npvStr([r1,r2]),u5npvStr([-r1,-r2,-r3]),u5npvStr([r1,r3]),u5npvStr([r2,r3])],3).map(u5wrap),
    "The denominator is zero when any one of its factors is zero: \\(x = "+r1+"\\), \\(x = "+r2+"\\), or \\(x = "+r3+"\\). So the non-permissible values are <b>\\("+cor4+"\\)</b>.",
    {shape:shape,roots:[r1,r2,r3]});
});

/* ---------- 3.2: non-permissible values, trinomial denominator to factor (L2) ---------- */
E("u5-npv-quadratic",5,["3.2"],2,"gen",function(){
  var shape=pick(["trinom","trinom","dos"]);
  if(shape==="dos"){
    var a=ri(2,7),n=ri(2,9);
    var cor=u5npvStr([-a,a]);
    return mcq("State the non-permissible values of the rational expression \\("+u5frac(n,"x^2 - "+(a*a))+"\\).",
      u5wrap(cor),u5dis(cor,[u5npvStr([a]),u5npvStr([-a]),u5npvStr([a*a]),u5npvStr([0,a])],3).map(u5wrap),
      "Factor the denominator and set each factor equal to zero: \\[ \\begin{aligned} x^2 - "+(a*a)+" &= 0 \\\\ "+u5par(1,-a)+u5par(1,a)+" &= 0 \\\\ x &= "+a+" \\text{ or } x = "+(-a)+" \\end{aligned} \\] So the non-permissible values are <b>\\("+cor+"\\)</b>.",
      {shape:shape,roots:[-a,a]});
  }
  var rs=u5twoRoots(),r1=rs[0],r2=rs[1];
  var b=-(r1+r2),cc=r1*r2;
  var num=pick(["const","lin"]),nv=(num==="const")?(""+ri(2,9)):u5lin(1,pick(U5NZ));
  var cor2=u5npvStr([r1,r2]);
  return mcq("State the non-permissible values of the rational expression \\("+u5frac(nv,u5quad(1,b,cc))+"\\).",
    u5wrap(cor2),u5dis(cor2,[u5npvStr([-r1,-r2]),u5npvStr([r1]),u5npvStr([r2]),u5npvStr([-r1,r2]),u5npvStr([r1,-r2])],3).map(u5wrap),
    "Factor the denominator, then set each factor equal to zero: \\[ \\begin{aligned} "+u5quad(1,b,cc)+" &= 0 \\\\ "+u5par(1,-r1)+u5par(1,-r2)+" &= 0 \\\\ x &= "+r1+" \\text{ or } x = "+r2+" \\end{aligned} \\] So the non-permissible values are <b>\\("+cor2+"\\)</b>.",
    {shape:shape,roots:[r1,r2]});
});

/* ---------- 3.3: build an equivalent expression by multiplying num and denom (L1) ---------- */
E("u5-equivalent-form",5,["3.3"],1,"gen",function(){
  var mode=pick(["linOverConst","constOverLin","linOverLin","negOne"]);
  if(mode==="linOverConst"){
    var a=pick(U5NZ),k=ri(2,6),c=pick(U5NZ);
    var base=u5frac(u5par(1,a),""+k),mult=u5par(1,c);
    var cor=u5frac(u5par(1,a)+u5par(1,c),""+k+u5par(1,c));
    var cands=[u5frac(u5par(1,a)+u5par(1,c),""+k),
      u5frac(u5par(1,a),""+k+u5par(1,c)),
      u5frac(u5par(1,a)+u5par(1,-c),""+k+u5par(1,-c)),
      u5frac(u5par(1,c),""+k+u5par(1,a))];
    return mcq("The numerator and denominator of \\("+base+"\\) are both multiplied by \\("+mult+"\\). What is the resulting expression?",
      u5wrap(cor),u5dis(cor,cands,3).map(u5wrap),
      "Multiplying the numerator and denominator by the same factor multiplies the expression by \\(1\\), so its value does not change. The numerator becomes \\("+u5par(1,a)+u5par(1,c)+"\\) and the denominator becomes \\("+k+u5par(1,c)+"\\). The resulting expression is <b>\\("+cor+"\\)</b>.",
      {mode:mode,a:a,k:k,c:c});
  }
  if(mode==="constOverLin"){
    var m=ri(2,8),b=pick(U5NZ),n=ri(2,5);
    var base2=u5frac(""+m,u5par(1,b));
    var cor2=u5frac(""+(m*n),""+n+u5par(1,b));
    var cands2=[u5frac(""+m,""+n+u5par(1,b)),
      u5frac(""+(m*n),u5par(1,b)),
      u5frac(""+(m+n),""+n+u5par(1,b)),
      u5frac(""+(m*n),""+n+u5par(1,-b))];
    return mcq("The numerator and denominator of \\("+base2+"\\) are both multiplied by \\("+n+"\\). What is the resulting expression?",
      u5wrap(cor2),u5dis(cor2,cands2,3).map(u5wrap),
      "Both parts must be multiplied: the numerator \\("+m+"\\) becomes \\("+(m*n)+"\\) and the denominator \\("+u5par(1,b)+"\\) becomes \\("+n+u5par(1,b)+"\\). Multiplying only one part would change the value. The resulting expression is <b>\\("+cor2+"\\)</b>.",
      {mode:mode,m:m,b:b,n:n});
  }
  if(mode==="negOne"){
    var an=pick(U5NZ),bn=pick(U5NZ);
    var baseN=u5frac(u5par(1,an),u5par(1,bn));
    var corN=u5frac(u5lin(-1,-an),u5lin(-1,-bn));
    var candsN=[u5frac(u5lin(-1,-an),u5lin(1,bn)),
      u5frac(u5lin(1,an),u5lin(-1,-bn)),
      u5frac(u5lin(-1,an),u5lin(-1,bn)),
      u5frac(u5lin(-1,-an),u5lin(-1,-an))];
    return mcq("The numerator and denominator of \\("+baseN+"\\) are both multiplied by \\(-1\\). What is the resulting expression?",
      u5wrap(corN),u5dis(corN,candsN,3).map(u5wrap),
      "Multiplying by \\(-1\\) changes the sign of <b>every</b> term it multiplies. The numerator \\("+u5par(1,an)+"\\) becomes \\("+u5lin(-1,-an)+"\\), and the denominator \\("+u5par(1,bn)+"\\) becomes \\("+u5lin(-1,-bn)+"\\). Since both parts were multiplied by the same number, the expression was multiplied by \\(1\\) and its value is unchanged. The resulting expression is <b>\\("+corN+"\\)</b>.",
      {mode:mode,a:an,b:bn});
  }
  var a3=pick(U5NZ),b3=pick(U5NZ),c3=pick(U5NZ),t=0;
  while(b3===-a3&&t<40){b3=pick(U5NZ);t++;}
  var base3=u5frac(u5par(1,a3),u5par(1,b3)),mult3=u5par(1,c3);
  var cor3=u5frac(u5par(1,a3)+u5par(1,c3),u5par(1,b3)+u5par(1,c3));
  var cands3=[u5frac(u5par(1,a3)+u5par(1,c3),u5par(1,b3)),
    u5frac(u5par(1,a3),u5par(1,b3)+u5par(1,c3)),
    u5frac(u5par(1,a3)+u5par(1,-c3),u5par(1,b3)+u5par(1,-c3)),
    u5frac(u5par(1,c3),u5par(1,b3)+u5par(1,a3))];
  return mcq("The numerator and denominator of \\("+base3+"\\) are both multiplied by \\("+mult3+"\\). What is the resulting expression?",
    u5wrap(cor3),u5dis(cor3,cands3,3).map(u5wrap),
    "Multiplying the numerator and denominator by the same factor multiplies the expression by \\(1\\), so its value does not change. The numerator becomes \\("+u5par(1,a3)+u5par(1,c3)+"\\) and the denominator becomes \\("+u5par(1,b3)+u5par(1,c3)+"\\). The resulting expression is <b>\\("+cor3+"\\)</b>.",
    {mode:mode,a:a3,b:b3,c:c3});
});

/* ---------- 3.4 (+3.3): equivalence includes the restrictions (L2) ---------- */
E("u5-equivalent-restrictions",5,["3.4","3.3"],2,"gen",function(){
  var r=pick(U5NZ),s=pick(U5NZ),tt=pick(U5NZ),t=0;
  while((s===r||tt===r||tt===s)&&t<80){s=pick(U5NZ);tt=pick(U5NZ);t++;}
  var orig=u5frac(u5par(1,-r)+u5par(1,-s),u5par(1,-r)+u5par(1,-tt));
  var simp=u5frac(u5lin(1,-s),u5lin(1,-tt));
  var cor=simp+", \\quad "+u5npvStr([r,tt]);
  var cands=[simp+", \\quad "+u5npvStr([tt]),
    simp+", \\quad "+u5npvStr([s,tt]),
    u5frac(u5lin(1,-r),u5lin(1,-tt))+", \\quad "+u5npvStr([r,tt]),
    simp+", \\quad "+u5npvStr([r,s])];
  return mcq("Which expression is equivalent to \\("+orig+"\\), restrictions included?",
    u5wrap(cor),u5dis(cor,cands,3).map(u5wrap),
    "Factor and cancel the common factor \\("+u5par(1,-r)+"\\): the expression simplifies to \\("+simp+"\\). But two rational expressions are equivalent only when their restrictions also match. The original denominator is zero at \\(x = "+r+"\\) and \\(x = "+tt+"\\), so both restrictions must be carried along: <b>\\("+cor+"\\)</b>. The simplified fraction on its own would wrongly allow \\(x = "+r+"\\).",
    {r:r,s:s,t:tt});
});

/* ---------- 3.5: simplify to lowest terms, basic shapes (L1) ---------- */
E("u5-simplify-basic",5,["3.5"],1,"gen",function(){
  var mode=pick(["mono","binom"]);
  if(mode==="mono"){
    var g0=pick([2,3]),a1=ri(2,7),b1=ri(2,7),t=0;
    while((a1===b1||u5gcd(a1,b1)!==1)&&t<80){a1=ri(2,7);b1=ri(2,7);t++;}
    var a=g0*a1,b=g0*b1,m=ri(3,6),n=ri(1,m-1),e=m-n;
    var expr=u5frac(u5cp(a,m),u5cp(b,n));
    var cor=(b1===1)?u5cp(a1,e):u5frac(u5cp(a1,e),""+b1);
    var cands=[u5frac(u5cp(a1,e),""+b),
      (b1===1)?u5cp(a1,m+n):u5frac(u5cp(a1,m+n),""+b1),
      u5frac(u5cp(b1,e),""+a1),
      u5frac(u5cp(a,e),""+b1)];
    return mcq("Simplify \\("+expr+"\\) to lowest terms.",
      u5wrap(cor),u5dis(cor,cands,3).map(u5wrap),
      "Divide the numerator and denominator by their common factors: the coefficients share a factor of \\("+g0+"\\), and the powers combine by subtracting exponents, \\(x^{"+m+"} \\div x^{"+n+"} = x^{"+e+"}\\): \\[ \\begin{aligned} "+expr+" &= \\frac{"+a1+"x^{"+m+"}}{"+b1+"x^{"+n+"}} \\\\ &= "+cor+" \\end{aligned} \\] The simplified form is <b>\\("+cor+"\\)</b>, for \\(x \\ne 0\\).",
      {mode:mode,a:a,b:b,m:m,n:n});
  }
  var k=ri(2,6),rs=u5twoRoots(),r=rs[0],s=rs[1];
  var expr2=u5frac(""+k+u5par(1,-r),u5par(1,-r)+u5par(1,-s));
  var cor2=u5frac(""+k,u5lin(1,-s));
  var cands2=[u5frac(""+k,u5lin(1,-r)),
    u5frac("1",u5lin(1,-s)),
    u5frac(u5par(1,-r),u5lin(1,-s)),
    u5frac(""+k,u5lin(1,-r)+u5par(1,-s))];
  return mcq("Simplify \\("+expr2+"\\) to lowest terms.",
    u5wrap(cor2),u5dis(cor2,cands2,3).map(u5wrap),
    "The factor \\("+u5par(1,-r)+"\\) appears in both the numerator and the denominator, so it divides out: \\[ \\begin{aligned} "+expr2+" &= "+cor2+" \\end{aligned} \\] The simplified form is <b>\\("+cor2+"\\)</b>, for \\("+u5npvStr([r,s])+"\\).",
    {mode:mode,k:k,r:r,s:s});
});

/* ---------- 3.5 + 3.6: simplify a trinomial ratio, restrictions carried (L2) ---------- */
E("u5-simplify-trinomial",5,["3.5","3.6"],2,"gen",function(){
  var mode=pick(["both","binomialDen"]);
  var r=pick(U5NZ),s=pick(U5NZ),tt=pick(U5NZ),t=0;
  while((s===r||tt===r||tt===s)&&t<80){s=pick(U5NZ);tt=pick(U5NZ);t++;}
  var numQ=u5quad(1,-(r+s),r*s);
  if(mode==="both"){
    var denQ=u5quad(1,-(r+tt),r*tt);
    var cor=u5frac(u5lin(1,-s),u5lin(1,-tt));
    var cands=[u5frac(u5lin(1,-tt),u5lin(1,-s)),
      u5frac(u5lin(1,-r),u5lin(1,-tt)),
      u5fr(s,tt),
      u5frac(u5lin(1,-s),u5lin(1,-r))];
    return mcq("Simplify \\("+u5frac(numQ,denQ)+"\\) to lowest terms.",
      u5wrap(cor),u5dis(cor,cands,3).map(u5wrap),
      "Factor both polynomials. The numerator is \\("+u5par(1,-r)+u5par(1,-s)+"\\) and the denominator is \\("+u5par(1,-r)+u5par(1,-tt)+"\\), so the common factor \\("+u5par(1,-r)+"\\) divides out: \\[ \\begin{aligned} "+u5frac(numQ,denQ)+" &= "+u5frac(u5par(1,-r)+u5par(1,-s),u5par(1,-r)+u5par(1,-tt))+" \\\\ &= "+cor+" \\end{aligned} \\] The simplified form is <b>\\("+cor+"\\)</b>, for \\("+u5npvStr([r,tt])+"\\). Only factors divide out; the terms of the trinomials cannot be cancelled.",
      {mode:mode,r:r,s:s,t:tt});
  }
  var k=pick([2,3,4]);
  var cor2=u5frac(u5lin(1,-s),""+k);
  var cands2=[u5frac(u5lin(1,-tt),""+k),
    u5frac(u5lin(1,-s),u5lin(1,-r)),
    u5fr(s,k),
    u5frac(u5lin(1,-r),""+k)];
  return mcq("Simplify \\("+u5frac(numQ,""+k+u5par(1,-r))+"\\) to lowest terms.",
    u5wrap(cor2),u5dis(cor2,cands2,3).map(u5wrap),
    "Factor the numerator: \\("+numQ+" = "+u5par(1,-r)+u5par(1,-s)+"\\). The factor \\("+u5par(1,-r)+"\\) also appears in the denominator, so it divides out: \\[ \\begin{aligned} "+u5frac(numQ,""+k+u5par(1,-r))+" &= "+u5frac(u5par(1,-r)+u5par(1,-s),""+k+u5par(1,-r))+" \\\\ &= "+cor2+" \\end{aligned} \\] The simplified form is <b>\\("+cor2+"\\)</b>, for \\(x \\ne "+r+"\\).",
    {mode:mode,r:r,s:s,t:tt,k:k});
});

/* ---------- 3.6: simplify, then evaluate (L2, numeric) ---------- */
E("u5-simplify-evaluate",5,["3.6"],2,"gen",function(){
  var mode=pick(["trinomial","monomial"]);
  if(mode==="trinomial"){
    var rs=u5twoRoots(),r=rs[0],s=rs[1];
    var k0=ri(-3,6),t=0;while((k0===r||k0===s)&&t<60){k0=ri(-3,6);t++;}
    var expr=u5frac(u5quad(1,-(r+s),r*s),u5lin(1,-r));
    var val=k0-s;
    return numq("What is the value of \\("+expr+"\\) when \\(x = "+k0+"\\)?",
      val,0.01,
      "Simplify first. The numerator factors as \\("+u5par(1,-r)+u5par(1,-s)+"\\), and the factor \\("+u5par(1,-r)+"\\) divides out, leaving \\("+u5lin(1,-s)+"\\) (for \\(x \\ne "+r+"\\)). Substituting \\(x = "+k0+"\\): \\[ \\begin{aligned} "+u5lin(1,-s)+" &= "+k0+u5sgn(-s)+" \\\\ &= "+val+" \\end{aligned} \\] The value is <b>"+val+"</b>.",
      {mode:mode,r:r,s:s,k0:k0});
  }
  var a=pick([2,3]),p=ri(2,6),k1=ri(2,5);
  var expr2=u5frac(u5quad(a,a*p,0),""+a+"x");
  var val2=k1+p;
  return numq("What is the value of \\("+expr2+"\\) when \\(x = "+k1+"\\)?",
    val2,0.01,
    "Simplify first: factor the numerator and divide out the common factor \\("+a+"x\\) (for \\(x \\ne 0\\)): \\[ \\begin{aligned} "+expr2+" &= \\frac{"+a+"x"+u5par(1,p)+"}{"+a+"x} \\\\ &= "+u5lin(1,p)+" \\end{aligned} \\] Substituting \\(x = "+k1+"\\) gives \\("+k1+" + "+p+" = "+val2+"\\). The value is <b>"+val2+"</b>.",
    {mode:mode,a:a,p:p,k0:k1});
});

/* ---------- 3.7: a shown simplification cancels terms, not factors (L3) ---------- */
E("u5-error-cancel",5,["3.7"],3,"gen",function(){
  var mode=pick(["linTerms","splitNum","noFactor"]);
  if(mode==="linTerms"){
    var p=pick(U5NZ),q=pick(U5NZ),t=0;while(q===p&&t<60){q=pick(U5NZ);t++;}
    var expr=u5frac(u5lin(1,p),u5lin(1,q)),claim=u5fr(p,q);
    var cor=expr;
    var cands=[claim,u5frac(u5lin(1,q),u5lin(1,p)),"1",u5fr(q,p)];
    return mcq("A student simplifies \\("+expr+"\\) and writes \\("+claim+"\\), explaining that the \\(x\\) terms cancel. What is the correct simplification?",
      u5wrap(cor),u5dis(cor,cands,3).map(u5wrap),
      "The student's move cancels <b>terms</b>, not factors. In \\("+u5lin(1,p)+"\\) the \\(x\\) is one term of a sum, not a factor of the whole numerator, and the same holds in the denominator, so nothing can divide out. No factor is common to the numerator and the denominator, so the expression is already in lowest terms: <b>\\("+cor+"\\)</b> (for \\(x \\ne "+(-q)+"\\).",
      {mode:mode,p:p,q:q});
  }
  if(mode==="splitNum"){
    var p2=pick([2,3,4,5,6]);
    var expr2=u5frac(u5lin(2,2*p2),"2"),claim2=u5lin(1,2*p2);
    var cor2=u5lin(1,p2);
    var cands2=[claim2,"x + "+u5fr(p2,2),u5lin(2,p2),u5frac(u5lin(1,p2),"2")];
    return mcq("A student simplifies \\("+expr2+"\\) and writes \\("+claim2+"\\), explaining that the \\(2\\) in the denominator cancels the \\(2x\\) term. What is the correct simplification?",
      u5wrap(cor2),u5dis(cor2,cands2,3).map(u5wrap),
      "The denominator \\(2\\) is a factor of the whole numerator, so it must divide <b>every</b> term, not just the first one: \\[ \\begin{aligned} "+expr2+" &= \\frac{2"+u5par(1,p2)+"}{2} \\\\ &= "+cor2+" \\end{aligned} \\] The student divided only the \\(2x\\) term and left the constant untouched. The correct simplification is <b>\\("+cor2+"\\)</b>.",
      {mode:mode,p:p2});
  }
  var p3=pick([3,5,6,7,8,10,12]);
  var expr3=u5frac(u5quad(1,0,p3),"x^2"),claim3=""+(p3+1);
  var cor3=expr3;
  var cands3=[claim3,u5frac("x^2",u5quad(1,0,p3)),u5fr(p3,1)+" + "+u5frac("1","x^2")];
  return mcq("A student simplifies \\("+expr3+"\\) and writes \\("+claim3+"\\), explaining that \\(x^2\\) divided by \\(x^2\\) is \\(1\\) and the constant stays. What is the correct simplification?",
    u5wrap(cor3),u5dis(cor3,cands3,3).map(u5wrap),
    "The student treated the numerator as separate pieces. In fact \\(x^2\\) is not a factor of the whole numerator \\("+u5quad(1,0,p3)+"\\): the constant term \\("+p3+"\\) has no \\(x^2\\) in it, so nothing divides out. A sum cannot be split and simplified piece by piece unless each term is divided, which here would give \\(1 + "+u5frac(p3,"x^2")+"\\), a different (and not simpler) form. The expression is already in lowest terms: <b>\\("+cor3+"\\)</b> (for \\(x \\ne 0\\).",
    {mode:mode,p:p3});
});

/* ---------- 3.8: multiply rational expressions (L2) ---------- */
E("u5-multiply",5,["3.8"],2,"gen",function(){
  var mode=pick(["poly","poly","mono"]);
  if(mode==="mono"){
    var a=ri(2,9),b=ri(2,9),c=ri(2,9),d=ri(2,9),m=ri(2,5),n=ri(1,4);
    var g=u5gcd(a*c,b*d),cn=(a*c)/g,cd=(b*d)/g,e=m-n;
    var expr=u5frac(u5cp(a,m),""+b)+" \\times "+u5frac(""+c,u5cp(d,n));
    var cor=u5monoVal(cn,cd,e);
    var gd=u5gcd(a*d,b*c);
    var cands=[u5monoVal(cn,cd,m+n),
      u5monoVal((a*d)/gd,(b*c)/gd,e),
      u5monoVal(cd,cn,e),
      u5monoVal(cn,cd,-e),
      u5monoVal(cn,cd,e+2),
      u5monoVal(cd+1,cn,e)];
    return mcq("Multiply and simplify: \\("+expr+"\\).",
      u5wrap(cor),u5dis(cor,cands,3).map(u5wrap),
      "Multiply the numerators and the denominators, then reduce: the coefficients give \\("+a+" \\times "+c+" = "+(a*c)+"\\) over \\("+b+" \\times "+d+" = "+(b*d)+"\\), which reduces to \\("+u5fr(a*c,b*d)+"\\), and \\(x^{"+m+"} \\div x^{"+n+"} = x^{"+e+"}\\) (with the power moving to the denominator if the exponent is negative). The product is <b>\\("+cor+"\\)</b>, for \\(x \\ne 0\\).",
      {mode:mode,a:a,b:b,c:c,d:d,m:m,n:n});
  }
  var r=pick(U5NZ),u=pick(U5NZ),s=pick(U5NZ),tt=pick(U5NZ),t=0;
  while((u===r||s===r||s===u||tt===r||tt===u||tt===s)&&t<100){u=pick(U5NZ);s=pick(U5NZ);tt=pick(U5NZ);t++;}
  var numQ=u5quad(1,-(r+u),r*u);
  var expr2=u5frac(numQ,u5lin(1,-s))+" \\times "+u5frac(u5lin(1,-s),u5lin(1,-tt));
  var cor2=u5frac(u5par(1,-r)+u5par(1,-u),u5lin(1,-tt));
  var cands2=[u5frac(u5lin(1,-tt),u5par(1,-r)+u5par(1,-u)),
    u5frac(u5par(1,-s)+u5par(1,-u),u5lin(1,-tt)),
    u5frac(u5par(1,-r)+u5par(1,-u),u5par(1,-s)+u5par(1,-tt)),
    u5frac(u5par(1,-r)+u5par(1,-tt),u5lin(1,-u))];
  return mcq("Multiply and simplify: \\("+expr2+"\\).",
    u5wrap(cor2),u5dis(cor2,cands2,3).map(u5wrap),
    "Factor first, then divide out the common factors before multiplying. The trinomial factors as \\("+u5par(1,-r)+u5par(1,-u)+"\\), and the factor \\("+u5par(1,-s)+"\\) appears in a numerator and a denominator: \\[ \\begin{aligned} "+expr2+" &= "+u5frac(u5par(1,-r)+u5par(1,-u),u5lin(1,-tt))+" \\end{aligned} \\] The product is <b>\\("+cor2+"\\)</b>, for \\("+u5npvStr([s,tt])+"\\).",
    {mode:mode,r:r,u:u,s:s,t:tt});
});

/* ---------- 3.9: divide rational expressions (L2) ---------- */
E("u5-divide",5,["3.9"],2,"gen",function(){
  var mode=pick(["poly","poly2","mono"]);
  if(mode==="mono"){
    var a=ri(2,9),b=ri(2,9),c=ri(2,9),d=ri(2,9),m=ri(2,5),n=ri(1,4),p=ri(1,4),q=ri(1,4);
    var cn0=a*d,cd0=b*c,e=(m-n)-(p-q),g=u5gcd(cn0,cd0),cn=cn0/g,cd=cd0/g;
    var expr=u5frac(u5cp(a,m),u5cp(b,n))+" \\div "+u5frac(u5cp(c,p),u5cp(d,q));
    var cor=u5monoVal(cn,cd,e);
    var gm=u5gcd(a*c,b*d);
    var cands=[u5monoVal(cn,cd,(m-n)+(p-q)),
      u5monoVal((a*c)/gm,(b*d)/gm,e),
      u5monoVal(cd,cn,e),
      u5monoVal(cn,cd,-e),
      u5monoVal(cn,cd,(m-n)-(p+q)),
      u5monoVal(cn,cd,e+2),
      u5monoVal(cd+1,cn,e)];
    return mcq("Divide and simplify: \\("+expr+"\\).",
      u5wrap(cor),u5dis(cor,cands,3).map(u5wrap),
      "To divide, multiply by the reciprocal of the second expression: \\[ \\begin{aligned} "+expr+" &= \\frac{"+u5cp(a,m)+"}{"+u5cp(b,n)+"} \\times \\frac{"+u5cp(d,q)+"}{"+u5cp(c,p)+"} \\\\ &= "+cor+" \\end{aligned} \\] The coefficients combine to \\("+u5fr(cn0,cd0)+"\\), and the exponent of \\(x\\) is \\(("+m+" - "+n+") - ("+p+" - "+q+") = "+e+"\\); a negative exponent places the power in the denominator. The quotient is <b>\\("+cor+"\\)</b>, for \\(x \\ne 0\\).",
      {mode:mode,a:a,b:b,c:c,d:d,m:m,n:n,p:p,q:q});
  }
  if(mode==="poly"){
    var r=pick(U5NZ),s=pick(U5NZ),tt=pick(U5NZ),t=0;
    while((s===r||tt===r||tt===s)&&t<80){s=pick(U5NZ);tt=pick(U5NZ);t++;}
    var expr2=u5frac(u5lin(1,-r),u5lin(1,-s))+" \\div "+u5frac(u5lin(1,-tt),u5lin(1,-s));
    var cor2=u5frac(u5lin(1,-r),u5lin(1,-tt));
    var cands2=[u5frac(u5lin(1,-tt),u5lin(1,-r)),
      u5frac(u5par(1,-r)+u5par(1,-tt),u5par(1,-s)+u5par(1,-s)),
      u5frac(u5lin(1,-r),u5lin(1,-s)),
      u5frac(u5lin(1,-s),u5lin(1,-tt))];
    return mcq("Divide and simplify: \\("+expr2+"\\).",
      u5wrap(cor2),u5dis(cor2,cands2,3).map(u5wrap),
      "Dividing by a rational expression means multiplying by its reciprocal. The divisor's reciprocal is \\("+u5frac(u5lin(1,-s),u5lin(1,-tt))+"\\), and the factor \\("+u5par(1,-s)+"\\) then divides out: \\[ \\begin{aligned} "+expr2+" &= "+u5frac(u5lin(1,-r),u5lin(1,-s))+" \\times "+u5frac(u5lin(1,-s),u5lin(1,-tt))+" \\\\ &= "+cor2+" \\end{aligned} \\] The quotient is <b>\\("+cor2+"\\)</b>, for \\("+u5npvStr([s,tt])+"\\). Note the extra restriction \\(x \\ne "+tt+"\\): it comes from the numerator of the divisor, which becomes a denominator after the flip.",
      {mode:mode,r:r,s:s,t:tt});
  }
  var r2=pick(U5NZ),u2=pick(U5NZ),s2=pick(U5NZ),t2=0;
  while((u2===r2||s2===r2||s2===u2)&&t2<80){u2=pick(U5NZ);s2=pick(U5NZ);t2++;}
  var numQ=u5quad(1,-(r2+u2),r2*u2);
  var expr3=u5frac(numQ,u5lin(1,-s2))+" \\div "+u5frac(u5lin(1,-u2),u5lin(1,-s2));
  var cor3=u5lin(1,-r2);
  var cands3=[u5frac(u5lin(1,-r2),u5lin(1,-u2)),
    u5frac(u5par(1,-r2)+u5par(1,-u2),u5lin(1,-s2)),
    u5lin(1,-u2),
    u5frac(u5lin(1,-r2),u5lin(1,-s2))];
  return mcq("Divide and simplify: \\("+expr3+"\\).",
    u5wrap(cor3),u5dis(cor3,cands3,3).map(u5wrap),
    "Factor the numerator of the first expression: \\("+numQ+" = "+u5par(1,-r2)+u5par(1,-u2)+"\\). Then multiply by the reciprocal of the divisor: \\[ \\begin{aligned} "+expr3+" &= "+u5frac(numQ,u5lin(1,-s2))+" \\times "+u5frac(u5lin(1,-s2),u5lin(1,-u2))+" \\\\ &= "+cor3+" \\end{aligned} \\] The factors \\("+u5par(1,-s2)+"\\) and \\("+u5par(1,-u2)+"\\) both divide out, leaving just \\("+cor3+"\\). The quotient is <b>\\("+cor3+"\\)</b>, for \\("+u5npvStr([s2,u2])+"\\).",
    {mode:mode,r:r2,u:u2,s:s2});
});

/* ---------- 3.10: lowest common denominator of two rational expressions (L1) ---------- */
E("u5-lcd",5,["3.10"],1,"gen",function(){
  var mode=pick(["mono","distinct","shared"]);
  if(mode==="mono"){
    var a=pick([1,2,3,4,6]),b=pick([1,2,3,4,6]),m=ri(1,3),n=ri(1,3),p=ri(2,9),q=ri(2,9);
    var L=a*b/u5gcd(a,b),E=Math.max(m,n);
    var d1=(a===1?u5pow(m):a+u5pow(m)),d2=(b===1?u5pow(n):b+u5pow(n));
    var cor=(L===1?u5pow(E):L+u5pow(E));
    var cands=[(a*b===1?u5pow(m+n):(a*b)+u5pow(m+n)),
      (L===1?u5pow(Math.min(m,n)):L+u5pow(Math.min(m,n))),
      (a*b===1?u5pow(E):(a*b)+u5pow(E)),
      u5pow(Math.max(m,n)),
      (L+2)+u5pow(E),
      (L+1)+u5pow(E),
      (L+3)+u5pow(E),
      u5pow(E+1)];
    return mcq("What is the lowest common denominator of \\("+u5frac(p,d1)+"\\) and \\("+u5frac(q,d2)+"\\)?",
      u5wrap(cor),u5dis(cor,cands,3).map(u5wrap),
      "The LCD must be a multiple of both denominators. The coefficient is the least common multiple of \\("+a+"\\) and \\("+b+"\\), which is \\("+L+"\\), and the power of \\(x\\) must be the larger of the two powers, \\(x^{"+E+"}\\). So the lowest common denominator is <b>\\("+cor+"\\)</b>. Taking the product of the coefficients or adding the powers would give a common denominator, but not the lowest one.",
      {mode:mode,a:a,b:b,m:m,n:n});
  }
  if(mode==="distinct"){
    var rs=u5twoRoots(),r=rs[0],s=rs[1],p2=ri(2,9),q2=ri(2,9);
    var cor2=u5par(1,-r)+u5par(1,-s);
    var cands2=[u5lin(2,-(r+s)),u5par(1,-r),u5par(1,-s),u5par(1,-r)+u5par(1,-r)];
    return mcq("What is the lowest common denominator of \\("+u5frac(p2,u5lin(1,-r))+"\\) and \\("+u5frac(q2,u5lin(1,-s))+"\\)?",
      u5wrap(cor2),u5dis(cor2,cands2,3).map(u5wrap),
      "The two denominators share no factor, so neither divides the other. The lowest common denominator is their product: <b>\\("+cor2+"\\)</b>. Adding the denominators would not give a multiple of either one.",
      {mode:mode,r:r,s:s});
  }
  var rs3=u5twoRoots(),r3=rs3[0],s3=rs3[1],p3=ri(2,9),q3=ri(2,9);
  var cor3=u5par(1,-r3)+u5par(1,-s3);
  var cands3=[u5par(1,-r3)+u5par(1,-s3)+u5par(1,-s3),
    u5lin(1,-s3),
    u5par(1,-r3),
    u5par(1,-s3)+u5par(1,-s3)];
  return mcq("What is the lowest common denominator of \\("+u5frac(p3,u5par(1,-r3)+u5par(1,-s3))+"\\) and \\("+u5frac(q3,u5lin(1,-s3))+"\\)?",
    u5wrap(cor3),u5dis(cor3,cands3,3).map(u5wrap),
    "The second denominator \\("+u5lin(1,-s3)+"\\) already divides the first, so it adds nothing new. The lowest common denominator is the first denominator itself: <b>\\("+cor3+"\\)</b>. Multiplying the two denominators together would repeat the factor \\("+u5par(1,-s3)+"\\).",
    {mode:mode,r:r3,s:s3});
});

/* ---------- 3.12 (+3.11): add or subtract rational expressions (L2) ---------- */
E("u5-add-subtract",5,["3.12","3.11"],2,"gen",function(){
  var mode=pick(["mono","binom","binom"]);
  if(mode==="mono"){
    var op=pick(["+","-"]),b=ri(2,6),d=ri(2,6),t=0;
    while(b===d&&t<40){d=ri(2,6);t++;}
    var L=b*d/u5gcd(b,d);
    var a=ri(2,9),c=ri(2,9);
    while((op==="-"&&a/b<=c/d)||(op==="+"&&(a/b===c/d))){a=ri(2,9);c=ri(2,9);}
    var num=a*(L/b)+(op==="+"?c*(L/d):-c*(L/d));
    var g=u5gcd(num,L),numR=num/g,LR=L/g;
    var expr=u5frac(a,""+b+"x")+" "+op+" "+u5frac(c,""+d+"x");
    var cor=(LR===1)?u5frac(numR,"x"):u5frac(numR,""+LR+"x");
    var numErr=a*(L/b)+(op==="+"?-c*(L/d):c*(L/d));
    var cands=[(LR===1)?u5frac(numErr,"x"):u5frac(numErr,""+LR+"x"),
      u5frac(a+c,""+(b+d)+"x"),
      u5frac(num,""+(L+b+d)+"x"),
      (LR===1)?u5frac(numR,"x"):(u5frac(numR,""+(LR+1)+"x"))];
    return mcq("Add or subtract and simplify: \\("+expr+"\\).",
      u5wrap(cor),u5dis(cor,cands,3).map(u5wrap),
      "The denominators are \\("+b+"x\\) and \\("+d+"x\\), so their lowest common denominator is \\("+L+"x\\). Rewrite each fraction with that denominator and combine the numerators: \\[ \\begin{aligned} "+expr+" &= "+u5frac(a*(L/b),""+L+"x")+" "+op+" "+u5frac(c*(L/d),""+L+"x")+" \\\\ &= "+u5frac(num,""+L+"x")+" \\\\ &= "+cor+" \\end{aligned} \\] The sum is <b>\\("+cor+"\\)</b>, for \\(x \\ne 0\\). The numerators are combined only after both fractions share the same denominator.",
      {mode:mode,op:op,a:a,b:b,c:c,d:d});
  }
  var op2=pick(["+","-"]),p=ri(2,7),q=ri(2,7),rs=u5twoRoots(),r=rs[0],s=rs[1];
  var A=p+q,B=-(p*s+q*r);
  if(op2==="-"){A=p-q;B=-p*s+q*r;}
  var numBody=u5lin(A,B);
  var expr2=u5frac(p,u5lin(1,-r))+" "+op2+" "+u5frac(q,u5lin(1,-s));
  var cor2=u5frac(numBody,u5par(1,-r)+u5par(1,-s));
  var numErr2=u5lin(A,-(p*s-q*r));
  if(op2==="-")numErr2=u5lin(A,-(p*s+q*r));
  var cands2=[u5frac(numErr2,u5par(1,-r)+u5par(1,-s)),
    u5frac(numBody,u5lin(2,-(r+s))),
    u5frac(""+(p+q),u5par(1,-r)+u5par(1,-s)),
    u5frac(numBody,u5par(1,-r))];
  return mcq("Add or subtract and simplify: \\("+expr2+"\\).",
    u5wrap(cor2),u5dis(cor2,cands2,3).map(u5wrap),
    "The denominators share no factor, so the lowest common denominator is \\("+u5par(1,-r)+u5par(1,-s)+"\\). Give each fraction that denominator, then combine the numerators: \\[ \\begin{aligned} "+expr2+" &= "+u5frac(p+u5par(1,-s),u5par(1,-r)+u5par(1,-s))+" "+op2+" "+u5frac(q+u5par(1,-r),u5par(1,-r)+u5par(1,-s))+" \\\\ &= "+u5frac(numBody,u5par(1,-r)+u5par(1,-s))+" \\end{aligned} \\] The numerator is \\("+numBody+"\\); it shares no factor with the denominator, so nothing cancels. The result is <b>\\("+cor2+"\\)</b>, for \\("+u5npvStr([r,s])+"\\).",
    {mode:mode,op:op2,p:p,q:q,r:r,s:s});
});

/* ---------- 3.11: choose the lowest common denominator for a pair or triple (L2) ---------- */
E("u5-lcd-choose",5,["3.11"],1,"gen",function(){
  var mode=pick(["shared","shared","power","coeff","triple"]);
  function threeRoots(){var rs=u5twoRoots(),r=rs[0],s=rs[1],t=pick(U5NZ),g=0;while((t===r||t===s)&&g<60){t=pick(U5NZ);g++;}return [r,s,t];}
  if(mode==="shared"){
    var R=threeRoots(),r=R[0],s=R[1],t=R[2],p=ri(2,9),q=ri(2,9);
    var d1=u5fac(r,1)+u5fac(s,1),d2=u5fac(r,1)+u5fac(t,1);
    var cor=u5fac(r,1)+u5fac(s,1)+u5fac(t,1);
    var cands=[u5fac(r,2)+u5fac(s,1)+u5fac(t,1),
      pick([d1,d2]),
      u5fac(s,1)+u5fac(t,1),
      u5fac(-r,1)+u5fac(s,1)+u5fac(t,1),
      u5quad(2,-(2*r+s+t),r*s+r*t)];
    return mcq("What is the lowest common denominator of \\("+u5frac(p,d1)+"\\) and \\("+u5frac(q,d2)+"\\)?",
      u5wrap(cor),u5dis(cor,cands,3).map(u5wrap),
      "Both denominators are already in factored form: \\("+d1+"\\) and \\("+d2+"\\). Build the LCD factor by factor, taking each different factor the greatest number of times it appears in any one denominator. The factor \\("+u5fac(r,1)+"\\) appears in both denominators, but it is needed only once; \\("+u5fac(s,1)+"\\) and \\("+u5fac(t,1)+"\\) each appear once. So the LCD is \\["+cor+"\\] The lowest common denominator is <b>\\("+cor+"\\)</b>. Multiplying the two denominators together would use the shared factor \\("+u5fac(r,1)+"\\) twice, which gives a common denominator, but not the lowest one.",
      {mode:mode,dens:[{c:1,f:[[r,1],[s,1]]},{c:1,f:[[r,1],[t,1]]}],lcd:{c:1,f:[[r,1],[s,1],[t,1]]}});
  }
  if(mode==="power"){
    var R2=threeRoots(),r2=R2[0],s2=R2[1],t2=R2[2],p2=ri(2,9),q2=ri(2,9);
    var e1=u5fac(r2,2)+u5fac(s2,1),e2=u5fac(r2,1)+u5fac(t2,1);
    var cor2=u5fac(r2,2)+u5fac(s2,1)+u5fac(t2,1);
    var cands2=[u5fac(r2,1)+u5fac(s2,1)+u5fac(t2,1),
      u5fac(r2,3)+u5fac(s2,1)+u5fac(t2,1),
      pick([e1,u5fac(r2,2)+u5fac(t2,1)]),
      u5fac(-r2,2)+u5fac(s2,1)+u5fac(t2,1)];
    return mcq("What is the lowest common denominator of \\("+u5frac(p2,e1)+"\\) and \\("+u5frac(q2,e2)+"\\)?",
      u5wrap(cor2),u5dis(cor2,cands2,3).map(u5wrap),
      "Both denominators are already in factored form: \\("+e1+"\\) and \\("+e2+"\\). The LCD takes each factor at the highest power it has in any one denominator. The factor \\("+u5fac(r2,1)+"\\) appears squared in the first denominator and only once in the second, so the LCD uses \\("+u5fac(r2,2)+"\\) for it, and takes \\("+u5fac(s2,1)+"\\) and \\("+u5fac(t2,1)+"\\) once each: \\["+cor2+"\\] The lowest common denominator is <b>\\("+cor2+"\\)</b>. Using only the first power of \\("+u5fac(r2,1)+"\\) would leave the first denominator unable to divide the result evenly.",
      {mode:mode,dens:[{c:1,f:[[r2,2],[s2,1]]},{c:1,f:[[r2,1],[t2,1]]}],lcd:{c:1,f:[[r2,2],[s2,1],[t2,1]]}});
  }
  if(mode==="coeff"){
    var a=ri(2,9),b=ri(2,9),g0=0;while(b===a&&g0<40){b=ri(2,9);g0++;}
    var L=a*b/u5gcd(a,b),r3=pick(U5NZ),p3=ri(2,9),q3=ri(2,9);
    var f1=u5fac(r3,1),dA=a+f1,dB=b+f1,cor3=L+f1;
    var cands3=[(a*b)+f1,""+a+f1,(a+b)+f1,""+b+f1,L+u5fac(-r3,1)];
    var remark=(u5gcd(a,b)>1)?("The coefficients "+a+" and "+b+" share a common factor, so their least common multiple is "+L+", not their product "+(a*b)+"."):("The coefficients "+a+" and "+b+" have no common factor, so their least common multiple is their product, "+L+".");
    return mcq("What is the lowest common denominator of \\("+u5frac(p3,dA)+"\\) and \\("+u5frac(q3,dB)+"\\)?",
      u5wrap(cor3),u5dis(cor3,cands3,3).map(u5wrap),
      "Both denominators contain the factor \\("+f1+"\\), so that factor is needed only once in the LCD. "+remark+" So the LCD is \\["+cor3+"\\] The lowest common denominator is <b>\\("+cor3+"\\)</b>.",
      {mode:mode,dens:[{c:a,f:[[r3,1]]},{c:b,f:[[r3,1]]}],lcd:{c:L,f:[[r3,1]]}});
  }
  var R4=threeRoots(),r4=R4[0],s4=R4[1],t4=R4[2],p4=ri(2,9),q4=ri(2,9),w4=ri(2,9);
  var g1=u5fac(r4,1)+u5fac(s4,1),g2=u5fac(s4,1)+u5fac(t4,1),g3=u5fac(r4,1)+u5fac(t4,1);
  var cor4=u5fac(r4,1)+u5fac(s4,1)+u5fac(t4,1);
  var cands4=[u5fac(r4,2)+u5fac(s4,2)+u5fac(t4,2),
    pick([g1,g2,g3]),
    u5quad(3,-2*(r4+s4+t4),r4*s4+s4*t4+r4*t4),
    u5fac(-r4,1)+u5fac(s4,1)+u5fac(t4,1)];
  return mcq("What is the lowest common denominator of \\("+u5frac(p4,g1)+"\\), \\("+u5frac(q4,g2)+"\\) and \\("+u5frac(w4,g3)+"\\)?",
    u5wrap(cor4),u5dis(cor4,cands4,3).map(u5wrap),
    "Write out the factors of the three denominators: \\("+g1+"\\), \\("+g2+"\\) and \\("+g3+"\\). Across the three denominators, the different factors are \\("+u5fac(r4,1)+"\\), \\("+u5fac(s4,1)+"\\) and \\("+u5fac(t4,1)+"\\), and each one appears at most once in any single denominator, so the LCD takes each of them once: \\["+cor4+"\\] The lowest common denominator is <b>\\("+cor4+"\\)</b>. Multiplying all three denominators together would use every factor twice.",
    {mode:mode,dens:[{c:1,f:[[r4,1],[s4,1]]},{c:1,f:[[s4,1],[t4,1]]},{c:1,f:[[r4,1],[t4,1]]}],lcd:{c:1,f:[[r4,1],[s4,1],[t4,1]]}});
});

/* ---------- 3.13: simplify a complex fraction (L2) ---------- */
E("u5-complex-fraction",5,["3.13"],1,"gen",function(){
  var mode=pick(["numeric","singleVar","binomial"]);
  if(mode==="numeric"){
    var a=ri(2,9),b=ri(2,9),c=ri(2,9),d=ri(2,9),t=0;
    while((a===b||c===d)&&t<60){a=ri(2,9);b=ri(2,9);c=ri(2,9);d=ri(2,9);t++;}
    var expr=u5frac(u5frac(a,b),u5frac(c,d));
    var cor=u5fr(a*d,b*c);
    var cands=[u5fr(b*c,a*d),u5fr(a*c,b*d),u5fr(a+c,b+d),u5fr(a*d+1,b*c)];
    return mcq("Simplify the complex fraction \\("+expr+"\\).",
      u5wrap(cor),u5dis(cor,cands,3).map(u5wrap),
      "A complex fraction is a division in disguise: divide the numerator by the denominator, which means multiplying by its reciprocal. \\[ \\begin{aligned} "+expr+" &= "+u5frac(a,b)+" \\div "+u5frac(c,d)+" \\\\ &= "+u5frac(a,b)+" \\times "+u5frac(d,c)+" \\\\ &= "+u5frac(a*d,b*c)+" \\\\ &= "+cor+" \\end{aligned} \\] The simplified fraction is <b>\\("+cor+"\\)</b>.",
      {mode:mode,a:a,b:b,c:c,d:d});
  }
  if(mode==="singleVar"){
    var a2=ri(2,7),b2=ri(2,7),t2=0;while(a2===b2&&t2<60){b2=ri(2,7);t2++;}
    var expr2=u5frac(u5frac("x",""+a2),u5frac("x",""+b2));
    var cor2=u5fr(b2,a2);
    var cands2=[u5fr(a2,b2),"1",u5fr(a2+b2,a2)];
    return mcq("Simplify the complex fraction \\("+expr2+"\\).",
      u5wrap(cor2),u5dis(cor2,cands2,3).map(u5wrap),
      "Divide the numerator by the denominator: multiply by the reciprocal of \\("+u5frac("x",""+b2)+"\\). \\[ \\begin{aligned} "+expr2+" &= "+u5frac("x",""+a2)+" \\div "+u5frac("x",""+b2)+" \\\\ &= "+u5frac("x",""+a2)+" \\times "+u5frac(""+b2,"x")+" \\\\ &= "+cor2+" \\end{aligned} \\] The \\(x\\) factors divide out (for \\(x \\ne 0\\)), leaving <b>\\("+cor2+"\\)</b>.",
      {mode:mode,a:a2,b:b2});
  }
  var a3=pick(U5NZ);
  var expr3=u5frac(u5frac("1",u5lin(1,-a3)),u5frac("1",u5lin(1,a3)));
  var cor3=u5frac(u5lin(1,a3),u5lin(1,-a3));
  var cands3=[u5frac(u5lin(1,-a3),u5lin(1,a3)),"1",u5frac(u5quad(1,0,-(a3*a3)),"1")];
  return mcq("Simplify the complex fraction \\("+expr3+"\\).",
    u5wrap(cor3),u5dis(cor3,cands3,3).map(u5wrap),
    "Divide the numerator by the denominator: multiply by the reciprocal of \\("+u5frac("1",u5lin(1,a3))+"\\). \\[ \\begin{aligned} "+expr3+" &= "+u5frac("1",u5lin(1,-a3))+" \\div "+u5frac("1",u5lin(1,a3))+" \\\\ &= "+u5frac("1",u5lin(1,-a3))+" \\times "+u5frac(u5lin(1,a3),"1")+" \\\\ &= "+cor3+" \\end{aligned} \\] The simplified fraction is <b>\\("+cor3+"\\)</b>, for \\("+u5npvStr([-a3,a3])+"\\).",
    {mode:mode,a:a3});
});

/* ---------- 3.18: solve a rational equation that reduces to a linear equation (L2, numeric) ---------- */
E("u5-solve-linear",5,["3.18"],2,"gen",function(){
  var mode=pick(["constOverLin","proportion","selfRatio"]);
  if(mode==="constOverLin"){
    var a=pick(U5NZ),m=ri(2,5),j=ri(2,6),k=m*j,x=a+j;
    var expr=u5frac(k,u5lin(1,-a))+" = "+m;
    return numq("Solve the equation \\("+expr+"\\).",
      x,0.01,
      "Restriction: \\("+u5npvStr([a])+"\\). Multiply both sides by \\("+u5lin(1,-a)+"\\): \\[ \\begin{aligned} "+k+" &= "+m+u5par(1,-a)+" \\\\ "+u5lin(1,-a)+" &= "+j+" \\\\ x &= "+x+" \\end{aligned} \\] The value \\(x = "+x+"\\) is not the restricted value, so it is kept. The solution is <b>\\(x = "+x+"\\)</b>.",
      {mode:mode,a:a,m:m,j:j});
  }
  if(mode==="proportion"){
    var av=ri(2,5),dm=ri(2,4),bv=av+dm,tv=ri(2,4),cv=dm*tv,x=av*tv;
    var expr=u5frac(av,"x")+" = "+u5frac(bv,"x + "+cv);
    return numq("Solve the equation \\("+expr+"\\).",
      x,0.01,
      "Restrictions: \\(x \\ne 0\\) and \\(x \\ne "+(-cv)+"\\). Cross-multiply, which is multiplying both sides by the LCD \\(x(x + "+cv+")\\) and then cancelling: \\[ \\begin{aligned} "+av+"(x + "+cv+") &= "+bv+"x \\\\ "+av+"x + "+(av*cv)+" &= "+bv+"x \\\\ "+(av*cv)+" &= "+dm+"x \\\\ x &= "+x+" \\end{aligned} \\] The value \\(x = "+x+"\\) is permissible, so it is kept. The solution is <b>\\(x = "+x+"\\)</b>.",
      {mode:mode,a:av,b:bv,c:cv});
  }
  var c0=ri(2,5),tv2=ri(2,5),av2=(c0-1)*tv2,x2=c0*tv2;
  var expr3=u5frac("x",u5lin(1,-av2))+" = "+c0;
  return numq("Solve the equation \\("+expr3+"\\).",
    x2,0.01,
    "Restriction: \\("+u5npvStr([av2])+"\\). Multiply both sides by \\("+u5lin(1,-av2)+"\\): \\[ \\begin{aligned} x &= "+c0+u5par(1,-av2)+" \\\\ x &= "+c0+"x "+(-c0*av2)+" \\\\ "+(c0*av2)+" &= "+(c0-1)+"x \\\\ x &= "+x2+" \\end{aligned} \\] The value \\(x = "+x2+"\\) is not the restricted value, so it is kept. The solution is <b>\\(x = "+x2+"\\)</b>.",
    {mode:mode,a:av2,c0:c0});
});

/* ---------- 3.19 (+3.18): solve, with one extraneous root from the cleared equation (L2) ---------- */
E("u5-solve-extraneous",5,["3.19","3.18"],2,"gen",function(){
  var mode=pick(["oneValid","oneValid","noSolution"]);
  if(mode==="noSolution"){
    var a=ri(2,8),sg=pick([1,1,-1]),xv=sg*a;
    var expr=u5frac("1",u5lin(1,-a))+" + "+u5frac("1",u5lin(1,a))+" = "+u5frac(""+(2*a*sg),"x^2 - "+(a*a));
    var cor="No solution";
    var cands=[""+a,""+(-a),"0"];
    return mcq("Solve the equation \\("+expr+"\\).",
      cor,u5dis(cor,cands,3),
      "Restrictions: \\("+u5npvStr([-a,a])+"\\). The LCD is \\(x^2 - "+(a*a)+" = "+u5par(1,-a)+u5par(1,a)+"\\). Multiply every term by it: \\[ \\begin{aligned} "+u5par(1,a)+" + "+u5par(1,-a)+" &= "+(2*a*sg)+" \\\\ 2x &= "+(2*a*sg)+" \\\\ x &= "+xv+" \\end{aligned} \\] But \\(x = "+xv+"\\) is one of the restricted values: it makes the original denominators zero. It is an extraneous root produced by clearing the denominators, so it must be rejected, and the equation has <b>no solution</b>.",
      {mode:mode,a:a});
  }
  var av=ri(2,8),cv=av+ri(1,7),t=0;
  while(cv===2*av&&t<40){cv=av+ri(1,7);t++;}
  var r=cv-av,dv=av*av-cv*av,pres=pick(["normal","flipped"]);
  var expr2=(pres==="normal")?(u5frac("x^2",u5lin(1,-av))+" = "+u5frac(u5lin(cv,dv),u5lin(1,-av))):(u5frac(u5lin(cv,dv),u5lin(1,-av))+" = "+u5frac("x^2",u5lin(1,-av)));
  return numq("Solve the equation \\("+expr2+"\\).",
    r,0.01,
    "Restriction: \\("+u5npvStr([av])+"\\). The denominators are the same, so set the numerators equal and solve the resulting quadratic: \\[ \\begin{aligned} x^2 &= "+u5lin(cv,dv)+" \\\\ "+u5quad(1,-cv,-dv)+" &= 0 \\\\ "+u5par(1,-av)+u5par(1,-r)+" &= 0 \\\\ x &= "+av+" \\text{ or } x = "+r+" \\end{aligned} \\] The value \\(x = "+av+"\\) makes the original denominator zero, so it is extraneous and is rejected. The only solution is <b>\\(x = "+r+"\\)</b>.",
    {mode:mode,a:av,c:cv,r:r});
});

/* ---------- 3.20 (+3.19): find the first error in shown solving work (L3) ---------- */
E("u5-solve-first-error",5,["3.20","3.19"],3,"gen",function(){
  var tpl=pick(["distribute","extraneousKept","crossPair"]);
  if(tpl==="distribute"){
    var q=pick([2,3,4]),w=ri(1,3),av=q*w,j=ri(1,4),p=ri(2,9),r=p+q*j;
    var stuX=j+w,trueX=av+j;
    var eq=u5frac(p,u5lin(1,-av))+" + "+q+" = "+u5frac(r,u5lin(1,-av));
    var prompt="A student solves \\("+eq+"\\). The work is shown in four lines.<br>Line 1: \\("+eq+"\\)<br>Line 2: \\("+p+" + "+q+"x - "+av+" = "+r+"\\)<br>Line 3: \\("+q+"x = "+(r-p+av)+"\\)<br>Line 4: \\(x = "+stuX+"\\)<br>Which option describes the first error in the work?";
    var cor="Line 2: \\("+q+u5par(1,-av)+"\\) was expanded as \\("+q+"x - "+av+"\\), but the correct expansion is \\("+q+"x - "+(q*av)+"\\)";
    var cands=["Line 3: \\("+av+"\\) should have stayed negative when moved to the right side, giving \\("+q+"x = "+(r-p-av)+"\\)",
      "Line 1: the fractions should have been combined into one fraction before anything was done",
      "There is no error in any of the four lines of the student's work; the solution is correct"];
    return mcq(prompt,cor,u5dis(cor,cands,3),
      "Multiplying the equation by the LCD \\("+u5lin(1,-av)+"\\) turns the term \\("+q+"\\) into \\("+q+u5par(1,-av)+"\\), and expanding that product gives \\("+q+"x - "+(q*av)+"\\), not \\("+q+"x - "+av+"\\). That is the first error; lines 3 and 4 follow correctly from the wrong line 2. With the correct expansion, \\("+q+"x = "+(r-p+q*av)+"\\) and the true solution is \\(x = "+trueX+"\\), not \\("+stuX+"\\).",
      {tpl:tpl,line:2,stuX:stuX,trueX:trueX,p:p,q:q,a:av,r:r});
  }
  if(tpl==="extraneousKept"){
    var av2=pick([2,3,4,5]),cv2=av2+ri(1,5),t2=0;
    while(cv2===2*av2&&t2<40){cv2=av2+ri(1,5);t2++;}
    var r2=cv2-av2,dv2=av2*av2-cv2*av2;
    var eq2=u5frac("x^2",u5lin(1,-av2))+" = "+u5frac(u5lin(cv2,dv2),u5lin(1,-av2));
    var prompt2="A student solves \\("+eq2+"\\). The work is shown in four lines.<br>Line 1: \\("+eq2+"\\)<br>Line 2: \\(x^2 = "+u5lin(cv2,dv2)+"\\)<br>Line 3: \\("+u5quad(1,-cv2,-dv2)+" = 0\\), which factors as \\("+u5par(1,-av2)+u5par(1,-r2)+" = 0\\)<br>Line 4: The solutions are \\(x = "+av2+"\\) and \\(x = "+r2+"\\)<br>Which option describes the first error in the work?";
    var cor2="Line 4: \\(x = "+av2+"\\) is not a permissible value, because it makes the original denominator zero; it is extraneous and must be rejected";
    var cands2=["Line 2: the numerators of two fractions cannot be set equal to each other, even when the denominators are the same",
      "Line 3: the equation does not factor as \\("+u5par(1,-av2)+u5par(1,-r2)+" = 0\\); expanding the factors shown gives an entirely different trinomial instead",
      "There is no error in any of the four lines of the student's work; the final solution is correct as it stands"];
    return mcq(prompt2,cor2,u5dis(cor2,cands2,3),
      "Lines 2 and 3 are correct: with equal denominators the numerators can be set equal (for permissible \\(x\\)), and the trinomial does factor as shown. The error is at the end: \\(x = "+av2+"\\) makes the denominator of the original equation zero, so it is an extraneous root from clearing denominators and must be rejected. The only solution is \\(x = "+r2+"\\).",
      {tpl:tpl,line:4,stuX:av2,trueX:r2,a:av2,c:cv2,r:r2,d:dv2});
  }
  var av3=2,bv3=1,cv3=4,dv3=3,xt=0,xs=0,ok3=false,tries3=0;
  while(!ok3&&tries3<600){
    av3=ri(2,6);cv3=ri(2,6);bv3=pick(U5NZ);dv3=pick(U5NZ);tries3++;
    if(av3===cv3||bv3===dv3)continue;
    var den=av3-cv3,numT=av3*dv3-cv3*bv3,numS=av3*bv3-cv3*dv3;
    if(numT%den!==0||numS%den!==0)continue;
    xt=numT/den;xs=numS/den;
    if(xt===xs||xt===bv3||xt===dv3||xs===bv3||xs===dv3)continue;
    ok3=true;
  }
  var eq3=u5frac(av3,u5lin(1,-bv3))+" = "+u5frac(cv3,u5lin(1,-dv3));
  var prompt3="A student solves \\("+eq3+"\\). The work is shown in four lines.<br>Line 1: \\("+eq3+"\\)<br>Line 2: \\("+av3+u5par(1,-bv3)+" = "+cv3+u5par(1,-dv3)+"\\)<br>Line 3: \\("+u5lin(av3,-av3*bv3)+" = "+u5lin(cv3,-cv3*dv3)+"\\)<br>Line 4: \\(x = "+xs+"\\)<br>Which option describes the first error in the work?";
  var cor3="Line 2: each numerator was multiplied by its own denominator; \\("+av3+"\\) must multiply \\("+u5par(1,-dv3)+"\\) and \\("+cv3+"\\) must multiply \\("+u5par(1,-bv3)+"\\)";
  var cands3=["Line 3: the expansion of \\("+av3+u5par(1,-bv3)+"\\) is incorrect, so the lines that follow it are built on a wrong equation",
    "Line 4: the value of \\(x\\) was rounded to the wrong number when the final answer was stated at the end of the work, so it is wrong",
    "There is no error in any of the four lines of the student's work; the final solution is correct as it stands"];
  return mcq(prompt3,cor3,u5dis(cor3,cands3,3),
    "Cross-multiplication pairs each numerator with the <b>other</b> denominator: the cleared equation should be \\("+av3+u5par(1,-dv3)+" = "+cv3+u5par(1,-bv3)+"\\). Line 2 paired each numerator with its own denominator instead, and lines 3 and 4 follow correctly from that wrong line. The correct cleared equation gives the true solution \\(x = "+xt+"\\), not \\("+xs+"\\).",
    {tpl:tpl,line:2,stuX:xs,trueX:xt,a:av3,b:bv3,c:cv3,d:dv3});
});

/* ---------- 3.21: write and solve a rational equation for a problem (L3, numeric) ---------- */
E("u5-word-problem",5,["3.21"],3,"gen",function(){
  var ctx=pick(["work","work","boat","cost","reciprocal"]);
  if(ctx==="work"){
    var jobs=[
      {key:"paint fence",text:"Nora can paint a fence in ",text2:" hours working alone, and her cousin Dev can paint the same fence in ",unit:" hours",pairs:[[2,6],[3,6],[4,4],[6,6],[2,2],[4,12],[6,3],[8,8],[6,12],[3,3],[4,6]]},
      {key:"fill pool",text:"One hose can fill a backyard pool in ",text2:" hours, and a second hose can fill the same pool in ",unit:" hours",pairs:[[3,6],[4,12],[6,6],[2,6],[5,5],[6,12],[4,4],[8,8],[3,3]]},
      {key:"rake leaves",text:"Sam can rake a park lawn in ",text2:" hours working alone, and his sister Ana can rake the same lawn in ",unit:" hours",pairs:[[2,6],[3,6],[4,4],[6,12],[2,2],[6,6],[4,12],[3,3]]}];
    var job=pick(jobs),pr=pick(job.pairs),A=pr[0],B=pr[1],ans=A*B/(A+B);
    return numq(job.text+A+job.text2+B+". Working together, how long will they take, in"+job.unit+"?",
      ans,0.03,
      "Let \\(t\\) be the time working together. In one hour the pair completes \\(\\frac{1}{"+A+"} + \\frac{1}{"+B+"}\\) of the job, so: \\[ \\begin{aligned} \\frac{1}{"+A+"} + \\frac{1}{"+B+"} &= \\frac{1}{t} \\\\ \\frac{"+(A+B)+"}{"+(A*B)+"} &= \\frac{1}{t} \\\\ t &= \\frac{"+(A*B)+"}{"+(A+B)+"} \\\\ &\\approx "+fmt(ans,2)+" \\end{aligned} \\] Working together they take about <b>"+fmt(ans,2)+" hours</b>.",
      {ctx:"work: "+job.key,A:A,B:B});
  }
  if(ctx==="boat"){
    var boats=[
      {key:"tour boat",text:"A tour boat travels ",text2:" km downstream in ",text3:" hours and returns the same distance upstream in ",unit:" hours"},
      {key:"ferry",text:"A small ferry covers ",text2:" km downstream in ",text3:" hours and returns the same distance upstream in ",unit:" hours"}];
    var bt=pick(boats),sp=pick([[12,8],[15,9],[14,10],[16,12],[18,12],[20,16],[10,6]]),u=sp[0],v=sp[1];
    var lcm=u*v/u5gcd(u,v),mm=pick([1,1,2]),D=lcm*mm;
    var t1=D/u,t2=D/v,ans2=(u-v)/2;
    return numq(bt.text+D+bt.text2+t1+bt.text3+t2+bt.unit+". What is the speed of the current, in kilometres per hour?",
      ans2,0.01,
      "The downstream speed is \\("+D+" \\div "+t1+" = "+u+"\\) km/h and the upstream speed is \\("+D+" \\div "+t2+" = "+v+"\\) km/h. If \\(b\\) is the boat's speed in still water and \\(c\\) is the current: \\[ \\begin{aligned} b + c &= "+u+" \\\\ b - c &= "+v+" \\\\ 2c &= "+(u-v)+" \\\\ c &= "+ans2+" \\end{aligned} \\] The speed of the current is <b>"+ans2+" km/h</b>.",
      {ctx:"boat: "+bt.key,D:D,t1:t1,t2:t2});
  }
  if(ctx==="cost"){
    var gv=pick([4,5,6,7,8,9,10]),kk=pick([1,2,3,4]),wv=pick([5,10,15,20,25,30]),tg=0;
    while((wv*gv*(gv+kk))%kk!==0&&tg<40){kk=pick([1,2,3,4]);tg++;}
    var T=wv*gv*(gv+kk)/kk;
    return numq("A group of friends rents a cottage for a total of $"+T+". If "+kk+" more friend"+(kk===1?"":"s")+" join"+(kk===1?"s":"")+" the group, the cost per person drops by $"+wv+". How many friends were in the original group?",
      gv,0.01,
      "Let \\(x\\) be the original number of friends. The original share is \\(\\frac{"+T+"}{x}\\) and the new share is \\(\\frac{"+T+"}{x + "+kk+"}\\), and the drop is $"+wv+": \\[ \\begin{aligned} \\frac{"+T+"}{x} - \\frac{"+T+"}{x + "+kk+"} &= "+wv+" \\\\ "+T+"(x + "+kk+") - "+T+"x &= "+wv+"x(x + "+kk+") \\\\ x^2 + "+kk+"x - "+(gv*(gv+kk))+" &= 0 \\\\ (x - "+gv+")(x + "+(gv+kk)+") &= 0 \\\\ x &= "+gv+" \\text{ or } x = "+(-(gv+kk))+" \\end{aligned} \\] A group size cannot be negative, so the inadmissible root is rejected. The original group had <b>"+gv+" friends</b>.",
      {ctx:"cost: cottage",g:gv,k:kk,T:T,w:wv});
  }
  var nv=pick([2,3,4,5,6]);
  return numq("The sum of a number and its reciprocal is \\("+u5fr(nv*nv+1,nv)+"\\). The number is greater than \\(1\\). Find the number.",
    nv,0.01,
    "Let the number be \\(x\\). Translating the statement into an equation: \\[ \\begin{aligned} x + \\frac{1}{x} &= "+u5fr(nv*nv+1,nv)+" \\\\ "+nv+"x^2 - "+(nv*nv+1)+"x + "+nv+" &= 0 \\\\ (x - "+nv+")("+nv+"x - 1) &= 0 \\\\ x &= "+nv+" \\text{ or } x = "+u5fr(1,nv)+" \\end{aligned} \\] Only \\(x = "+nv+"\\) is greater than \\(1\\) (the other value is its reciprocal). The number is <b>"+nv+"</b>.",
    {ctx:"reciprocal",n:nv});
});

/* ---------- 3.21: two travellers toward each other, or apart from one point (L3, numeric) ---------- */
E("u5-meeting-problem",5,["3.21"],3,"gen",function(){
  var ctxs=[
    {key:"cars",noun:"car",
     toward:"Two cars start at the same time from two towns that are D km apart and drive toward each other on the same road. One car travels at V1 km/h and the other at V2 km/h.",
     apart:"Two cars leave the same town at the same time and drive in opposite directions along a straight highway. One car travels at V1 km/h and the other at V2 km/h.",
     tuples:[[80,70,300],[90,60,300],[70,50,300],[80,40,300],[100,80,270],[60,40,250],[85,65,300],[95,55,300],[65,55,240],[75,45,240]]},
    {key:"cyclists",noun:"cyclist",
     toward:"Two cyclists start at the same time from opposite ends of a trail D km long and ride toward each other. One cyclist rides at V1 km/h and the other at V2 km/h.",
     apart:"Two cyclists leave the same trailhead at the same time and ride in opposite directions. One cyclist rides at V1 km/h and the other at V2 km/h.",
     tuples:[[16,14,45],[18,12,45],[20,16,54],[15,10,50],[22,18,60],[24,16,100],[14,10,36],[25,15,80],[16,12,42],[20,12,48]]},
    {key:"walkers",noun:"hiker",
     toward:"Two hikers start at the same time from trailheads at opposite ends of a trail D km long and walk toward each other. One hiker walks at V1 km/h and the other at V2 km/h.",
     apart:"Two hikers leave the same trailhead at the same time, one taking a north path and the other a south path. One hiker walks at V1 km/h and the other at V2 km/h.",
     tuples:[[5,4,18],[6,4,25],[6,3,18],[4,4,12],[6,5,22],[4,3,14],[7,5,24],[7,4,22],[8,4,24],[5,3,16]]}];
  var cx=pick(ctxs),dir=pick(["toward","toward","apart"]),ask=pick(["time","dist"]);
  var tp=pick(cx.tuples),v1=tp[0],v2=tp[1],D=tp[2];
  var t=D/(v1+v2),ans=(ask==="time")?t:v1*t;
  function fill(s){return s.replace(/V1/g,""+v1).replace(/V2/g,""+v2).replace(/\bD\b/g,""+D);}
  var stem=fill(dir==="toward"?cx.toward:cx.apart);
  var tStr=""+t,hm=(t%1===0.5)?(" ("+Math.floor(t)+" h 30 min)"):"";
  var meta={ctx:"meeting: "+cx.key,dir:dir,ask:ask,v1:v1,v2:v2,D:D,t:t,ans:ans};
  if(dir==="toward"&&ask==="time"){
    return numq(stem+" How long, in hours, until they meet?",
      ans,0.01,
      "Let \\(t\\) be the number of hours until they meet. In \\(t\\) hours the first "+cx.noun+" travels \\("+v1+"t\\) km and the second travels \\("+v2+"t\\) km, and together they cover the "+D+" km between their starting points, so the two distances add to "+D+": \\[ \\begin{aligned} "+v1+"t + "+v2+"t &= "+D+" \\\\ "+(v1+v2)+"t &= "+D+" \\\\ t &= "+tStr+" \\end{aligned} \\] They meet after <b>"+tStr+" hours</b>"+hm+".",
      meta);
  }
  if(dir==="apart"&&ask==="time"){
    return numq(stem+" How long, in hours, until they are "+D+" km apart?",
      ans,0.01,
      "Let \\(t\\) be the number of hours. In \\(t\\) hours the first "+cx.noun+" travels \\("+v1+"t\\) km and the second travels \\("+v2+"t\\) km in the opposite direction, so the distance between them is the sum of the two distances: \\[ \\begin{aligned} "+v1+"t + "+v2+"t &= "+D+" \\\\ "+(v1+v2)+"t &= "+D+" \\\\ t &= "+tStr+" \\end{aligned} \\] They are "+D+" km apart after <b>"+tStr+" hours</b>"+hm+".",
      meta);
  }
  if(dir==="toward"&&ask==="dist"){
    return numq(stem+" How far, in kilometres, has the first "+cx.noun+" travelled when they meet?",
      ans,0.01,
      "Let \\(x\\) be the distance, in kilometres, that the first "+cx.noun+" has travelled when they meet. The second "+cx.noun+" has then travelled \\("+D+" - x\\) km. They have been travelling for the same length of time, and time is distance divided by speed, so their two times are equal: \\[ \\begin{aligned} \\frac{x}{"+v1+"} &= \\frac{"+D+" - x}{"+v2+"} \\\\ "+v2+"x &= "+v1+"("+D+" - x) \\\\ "+v2+"x &= "+(v1*D)+" - "+v1+"x \\\\ "+(v1+v2)+"x &= "+(v1*D)+" \\\\ x &= "+ans+" \\end{aligned} \\] The first "+cx.noun+" has travelled <b>"+ans+" km</b> when they meet.",
      meta);
  }
  return numq(stem+" When they are "+D+" km apart, how far, in kilometres, has the first "+cx.noun+" travelled?",
    ans,0.01,
    "Moving in opposite directions, the two separate at a combined speed of \\("+v1+" + "+v2+" = "+(v1+v2)+"\\) km/h, so they are "+D+" km apart after \\(t = \\frac{"+D+"}{"+(v1+v2)+"} = "+tStr+"\\) hours. In that time the first "+cx.noun+" travels \\("+v1+" \\times "+tStr+" = "+ans+"\\) km. The first "+cx.noun+" has travelled <b>"+ans+" km</b>.",
    meta);
});

/* ============ Prior knowledge tranche (Nov 15, 2026) ============ */
/* Borrowed verbatim from the feeder banks named in the source
   comments and the PKT table below, plus authored micro-items
   where the prior knowledge map names a skill no feeder entry
   assesses. Spec: Math-2200-PK-Tranche-Spec-2026-11-15.md. */

/* u5-pk-frac-context: borrowed verbatim from math-9 entry u1-frac-context (math-9:6.1). */
E("u5-pk-frac-context",5,["3.8"], 1, "gen", function () {
  var dens = [2, 4, 5, 8, 10, 20];
  var d1 = pick(dens), d2 = pick(dens);
  var n1 = ri(1, 15), n2 = ri(1, 15);
  var v1 = n1 / d1, v2 = n2 / d2;
  var sub = Math.random() < 0.5;
  if (sub && v2 > v1) { var tn = n1; n1 = n2; n2 = tn; var td = d1; d1 = d2; d2 = td; v1 = n1 / d1; v2 = n2 / d2; }
  if (sub && Math.abs(v1 - v2) < 0.01) { n1 += d1; v1 = n1 / d1; }
  var ctxs = ["cups of flour", "metres of ribbon", "litres of juice"];
  var thing = pick(ctxs);
  var ans = n1round(sub ? v1 - v2 : v1 + v2, 4);
  var lcm = (d1 * d2) / n1gcd(d1, d2);
  var e1 = n1 * (lcm / d1), e2 = n2 * (lcm / d2);
  var resN = sub ? e1 - e2 : e1 + e2;
  var prompt = sub
    ? "A project starts with " + n1frac(n1, d1) + " " + thing + ". Then " + n1frac(n2, d2) + " " + thing + " is used. How much is left? Give your answer as a decimal."
    : "A project uses " + n1frac(n1, d1) + " " + thing + " in the morning and " + n1frac(n2, d2) + " " + thing + " in the afternoon. How much is used in total? Give your answer as a decimal.";
  var solution = "Use the common denominator \\(" + lcm + "\\): \\[ \\begin{aligned} " + FR(n1, d1) + (sub ? " - " : " + ") + FR(n2, d2) + " &= " + FR(e1, lcm) + (sub ? " - " : " + ") + FR(e2, lcm) + " \\\\ &= " + FR(resN, lcm) + " = " + fmt(ans) + " \\end{aligned} \\] So the answer is <b>" + fmt(ans) + "</b>.";
  return numq(prompt, ans, 0.01, solution, { mode: sub ? "sub-frac-ctx" : "add-frac-ctx", a: n1, b: d1, c: n2, d: d2 });
}, ["Fractions with different denominators need a common denominator first.", "Rewrite both fractions with the least common denominator, then combine the numerators."]);

/* u5-pk-frac-div-add: borrowed verbatim from math-9 entry u1-gap-div-add-cr (math-9:6.1). */
E("u5-pk-frac-div-add",5,["3.8"], 2, "gen", function () {
  var q = pick([3, 4, 5, 6]);
  var r = pick([2, 3]);
  var p = r * ri(2, 5);
  var f = pick([4, 8]);
  var e = ri(1, f - 1);
  var quot = p / r;
  var ans = Math.round((quot + e / f) * 1000) / 1000;
  var prompt = "Evaluate \\(" + FR(p, q) + " \\div " + FR(r, q) + " + " + FR(e, f) + "\\). Give your answer as a decimal.";
  var sol = "Divide first by multiplying by the reciprocal, then add: \\[ \\begin{aligned} " + FR(p, q) + " \\div " + FR(r, q) + " &= " + FR(p, q) + " \\times " + FR(q, r) + " = " + fmt(quot) + " \\\\ " + fmt(quot) + " + " + FR(e, f) + " &= " + fmt(quot) + " + " + fmt(e / f, 3) + " = " + fmt(ans, 3) + " \\end{aligned} \\] The answer is <b>" + fmt(ans, 3) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-div-add", p: p, q: q, r: r, e: e, f: f });
}, ["Division is the first job: flip the divisor and multiply, then do the addition.", "Rewrite the division as a multiplication by the reciprocal of the second fraction."]);

/* u5-pk-multistep-rational: borrowed verbatim from math-9 entry u1-multistep-rational (math-9:6.1). */
E("u5-pk-multistep-rational",5,["3.8"], 3, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var start = ri(-160, 80) / 4, r1 = ri(2, 20) / 4, f1 = ri(2, 16) / 4, r2 = ri(2, 12) / 4;
    var ans = n1round(start + r1 - f1 + r2, 4);
    var promptT = "At 6 a.m. the temperature in St. John's is " + fmt(start) + " degrees. By noon it rises by " + fmt(r1) + " degrees, by 6 p.m. it falls by " + fmt(f1) + " degrees, and by midnight it rises by " + fmt(r2) + " degrees. Determine the temperature at midnight, in degrees.";
    var solT = "Apply each change in order: \\[ \\begin{aligned} " + fmt(start) + " + " + fmt(r1) + " - " + fmt(f1) + " + " + fmt(r2) + " &= " + fmt(n1round(start + r1, 4)) + " - " + fmt(f1) + " + " + fmt(r2) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the temperature at midnight is <b>" + fmt(ans) + " degrees</b>.";
    return numq(promptT, ans, 0.01, solT, { mode: "temp-change", start: start });
  }
  if (mode === 1) {
    var startC = ri(2000, 20000), depC = ri(500, 8000), w1C = ri(400, 6000), w2C = ri(300, 5000);
    var ansB = n1round((startC + depC - w1C - w2C) / 100, 2);
    var promptB = "A bank account starts with $" + (startC / 100).toFixed(2) + ". A deposit of $" + (depC / 100).toFixed(2) + " is made, then withdrawals of $" + (w1C / 100).toFixed(2) + " and $" + (w2C / 100).toFixed(2) + " are made. Determine the final balance, in dollars.";
    var solB = "Add the deposit and subtract both withdrawals: \\[ \\begin{aligned} " + (startC / 100).toFixed(2) + " + " + (depC / 100).toFixed(2) + " - " + (w1C / 100).toFixed(2) + " - " + (w2C / 100).toFixed(2) + " &= " + ((startC + depC) / 100).toFixed(2) + " - " + (w1C / 100).toFixed(2) + " - " + (w2C / 100).toFixed(2) + " \\\\ &= " + ansB.toFixed(2) + " \\end{aligned} \\] So the final balance is <b>$" + ansB.toFixed(2) + "</b>.";
    return numq(promptB, ansB, 0.01, solB, { mode: "bank-balance", start: startC });
  }
  var dens = [2, 4, 5, 8, 10];
  var dA = pick(dens), dB = pick(dens), dC = pick(dens);
  var nA = ri(3, 30), nB = ri(3, 30), nC = ri(3, 30);
  var ansD = n1round(nA / dA + nB / dB + nC / dC, 4);
  var promptD = "On a three day hike, a group walks " + n1frac(nA, dA) + " km on day 1, " + n1frac(nB, dB) + " km on day 2, and " + n1frac(nC, dC) + " km on day 3. Determine the total distance walked, in kilometres, as a decimal.";
  var solD = "Add the three distances as decimals: \\[ \\begin{aligned} " + FR(nA, dA) + " + " + FR(nB, dB) + " + " + FR(nC, dC) + " &= " + fmt(n1round(nA / dA, 4)) + " + " + fmt(n1round(nB / dB, 4)) + " + " + fmt(n1round(nC / dC, 4)) + " \\\\ &= " + fmt(ansD) + " \\end{aligned} \\] So the total distance is <b>" + fmt(ansD) + " km</b>.";
  return numq(promptD, ansD, 0.01, solD, { mode: "distance-3day", a: nA, b: nB, c: nC });
}, ["Break the problem into one change or part at a time, in order.", "Start from the opening value and apply each step before moving to the next."]);

/* u5-pk-equiv-fractions: authored micro-item (authored:equivalent-fractions),
   written for this tranche. */
E("u5-pk-equiv-fractions",5,["3.3"],1,"gen",function(){
  var fr=function(p,q){return "\\(\\frac{"+p+"}{"+q+"}\\)";};
  var gcd=function(x,y){while(y){var t=x%y;x=y;y=t;}return x;};
  if(ri(0,1)===0){
    var p=ri(1,9),q=p+ri(1,9),k=ri(2,6);
    return mcq("Which fraction is equivalent to "+fr(p,q)+"?",
      fr(p*k,q*k),
      [fr(p+k,q+k),fr(p*k,q),fr(p,q*k)],
      "Equivalent fractions come from multiplying the numerator and the denominator by the same number: \\(\\frac{"+p+"}{"+q+"} = \\frac{"+p+" \\times "+k+"}{"+q+" \\times "+k+"} = \\frac{"+(p*k)+"}{"+(q*k)+"}\\). Changing only one of the two numbers, or adding instead of multiplying, gives a different value. The answer is <b>"+fr(p*k,q*k)+"</b>.",
      {mode:"build",p:p,q:q,k:k});
  }
  var g=pick([2,3,4,5,6]),p2=2,q2=3,tries=0;
  do { p2=ri(2,9); q2=p2+ri(1,8); tries++; } while(gcd(p2,q2)!==1&&tries<60);
  var P=p2*g,Q=q2*g;
  return mcq("Write "+fr(P,Q)+" in lowest terms.",
    fr(p2,q2),
    [fr(p2,Q),fr(P,q2),fr(P-g,Q-g)],
    "The numerator and the denominator share the factor "+g+", so divide both by "+g+": \\(\\frac{"+P+"}{"+Q+"} = \\frac{"+P+" \\div "+g+"}{"+Q+" \\div "+g+"} = \\frac{"+p2+"}{"+q2+"}\\). Dividing only one of the two numbers, or subtracting instead of dividing, changes the value. The answer is <b>"+fr(p2,q2)+"</b>.",
    {mode:"reduce",P:P,Q:Q,g:g});
}, ["The numerator and the denominator must change in the same way.", "Look for a factor the numerator and the denominator share."]);

/* u5-pk-gcf: borrowed verbatim from math-1201 entry u3-gcf (math-1201:3.10). */
E("u5-pk-gcf",5,["3.5"], 2, "gen", function () {
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

/* u5-pk-factor-product: borrowed verbatim from math-1201 entry u3-factor-product (math-1201:3.9). */
E("u5-pk-factor-product",5,["3.5"], 2, "gen", function () {
  var mode = pick(["bb", "mt"]);
  if (mode === "bb") {
    var a = ri(2, 4), b = u3Nz(-6, 6), c = u3Nz(-6, 6), prod, tries = 0;
    do { tries++; b = u3Nz(-6, 6); c = u3Nz(-6, 6); prod = u3Conv([a, b], [1, c]); }
    while (u3GCD3(prod[0], Math.abs(prod[1]), Math.abs(prod[2])) !== 1 && tries < 80);
    var facs = [[a, b], [1, c]];
    var keyRaw = u3FacRaw("", facs, "x");
    var poly = u3PC(prod, "x");
    var sol = "Find the two binomials whose product gives the polynomial, then verify by multiplying the factors back out." +
      u3Alg([poly + " &= " + keyRaw,
             keyRaw + " &= " + u3StrSeq(u3Mul(u3TermsOf(facs[0], "x"), u3TermsOf(facs[1], "x"))),
             "&= " + poly]) +
      "As a product of its factors, the polynomial is **" + u3M(keyRaw) + "**.";
    return mcq("Express the polynomial \\(" + poly + "\\) as a product of its factors.",
      u3M(keyRaw), u3FacDistr("", facs, "x", prod, 3), sol,
      { t: "fac", g: "", parts: facs, v: "x" });
  }
  var gn = ri(2, 5), gp = ri(1, 2);
  var A = ri(1, 3), B = u3Nz(-5, 5), C = u3Nz(-6, 6), t2 = 0;
  while (u3GCD3(A, Math.abs(B), Math.abs(C)) !== 1 && t2 < 60) { t2++; A = ri(1, 3); B = u3Nz(-5, 5); C = u3Nz(-6, 6); }
  var quo = [A, B, C];
  var polyTerms = [[gn * A, gp + 2, 0], [gn * B, gp + 1, 0], [gn * C, gp, 0]];
  var polyRaw = u3Str(polyTerms);
  var gRaw = u3Str([[gn, gp, 0]]);
  var keyRaw2 = gRaw + u3Par(quo, "x");
  var prodTerms = u3Mul([[gn, gp, 0]], u3TermsOf(quo, "x"));
  var cands = [], seen = {};
  function addC(s) { if (s !== keyRaw2 && !seen[s]) { seen[s] = 1; cands.push(u3M(s)); } }
  addC(gRaw + u3Par([A, B + (B > 0 ? 1 : -1), C], "x"));
  addC(gRaw + u3Par([A, B, -C], "x"));
  addC(u3Str([[gn, gp + 1, 0]]) + u3Par(quo, "x"));
  addC(gRaw + u3Par([A + 1, B, C], "x"));
  var sol2 = "The terms share the factor \\(" + gRaw + "\\). Removing it leaves \\(" + u3PC(quo, "x") + "\\). Verify by multiplying the factors back out." +
    u3Alg([keyRaw2 + " &= " + u3StrSeq(prodTerms), "&= " + polyRaw]) +
    "As a product of its factors, the polynomial is **" + u3M(keyRaw2) + "**.";
  return mcq("Express the polynomial \\(" + polyRaw + "\\) as a product of its factors.",
    u3M(keyRaw2), shuffle(cands).slice(0, 3), sol2,
    { t: "fac", g: gRaw, parts: [quo], v: "x" });
});

/* u5-pk-npv-numerical: authored micro-item (authored:undefined-numerical-fraction),
   written for this tranche. */
E("u5-pk-npv-numerical",5,["3.1"],1,"gen",function(){
  var fr=function(n,d){return "\\(\\frac{"+n+"}{"+d+"}\\)";};
  var a=ri(2,9),b=ri(2,9);
  var undef=pick([
    fr(a,b+" - "+b),
    fr(a,(2*b)+" - "+b+" \\times 2"),
    fr(a,b+" \\times 3 - "+(3*b)),
    fr(a,(b+4)+" - "+(b+4))
  ]);
  var defs=[fr(a+1,b+" - 1"),fr(b,a+" + 2"),fr(a+b,"2 \\times "+b)];
  return mcq("Which of these fractions is <b>undefined</b>?",
    undef,defs,
    "A fraction is undefined when its denominator works out to 0, because division by 0 is undefined. In "+undef+" the denominator is 0. Each of the other denominators works out to a nonzero number, so those fractions are defined. The answer is <b>"+undef+"</b>.",
    {mode:"which-undefined",a:a,b:b});
}, ["Work out each denominator first.", "A fraction with denominator 0 has no value."]);

/* u5-pk-solve-two-step: borrowed verbatim from math-9 entry u5-solve-two-step (math-9:8.18). */
E("u5-pk-solve-two-step",5,["3.19"], 2, "gen", function () {
  var form = ri(0, 2);
  if (form === 0) {
    var a = ri(2, 9), x0 = ri(-9, 9); if (x0 === 0) x0 = 4;
    var b = ri(-12, 12); if (b === 0) b = 5;
    var c = a * x0 + b;
    var sol = "Undo the constant first, then undo the multiplication: \\[ \\begin{aligned} " + n5lin(a, b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(c - b) + " \\\\ x &= " + fmt(x0) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x0) + "\\)</b>.";
    return numq("Solve the equation \\(" + n5lin(a, b) + " = " + fmt(c) + "\\). What is the value of \\(x\\)?", x0, 0.01, sol, { mode: "ax+b", a: a, b: b, c: c });
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
  var sol3 = "Collect the x terms on one side first: \\[ \\begin{aligned} " + fmt(a3) + "x &= " + n5lin(c3, b3) + " \\\\ " + fmt(a3 - c3) + "x &= " + fmt(b3) + " \\\\ x &= " + fmt(x2) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x2) + "\\)</b>.";
  return numq("Solve the equation \\(" + fmt(a3) + "x = " + n5lin(c3, b3) + "\\). What is the value of \\(x\\)?", x2, 0.01, sol3, { mode: "ax=cx+b", a: a3, b: b3, c: c3 });
}, ["Undo the operations in reverse order: deal with the constant term before the term attached to x.", "First isolate the x term on one side, using the same operation on both sides."]);

/* PK tranche pass for Unit 5. pkFor is the cluster's dependent
   indicator list from the prior knowledge map, as registered
   for this unit in courses.js. */
var PKT_U5_FOR=["3.1","3.2","3.3","3.4","3.5","3.6","3.7","3.8","3.9","3.10","3.11","3.12","3.13","3.18","3.19","3.20","3.21"];
var PKT_U5={
 "u5-pk-frac-context":{src:"math-9:6.1",group:"fraction-operations"},
 "u5-pk-frac-div-add":{src:"math-9:6.1",group:"fraction-operations"},
 "u5-pk-multistep-rational":{src:"math-9:6.1",group:"fraction-operations"},
 "u5-pk-equiv-fractions":{src:"authored:equivalent-fractions",group:"equivalent-fractions"},
 "u5-pk-gcf":{src:"math-1201:3.10",group:"common-factor"},
 "u5-pk-factor-product":{src:"math-1201:3.9",group:"factoring"},
 "u5-pk-npv-numerical":{src:"authored:undefined-numerical-fraction",group:"undefined-values"},
 "u5-pk-solve-two-step":{src:"math-9:8.18",group:"linear-equations"}
};
BANK.forEach(function(e){var t=PKT_U5[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U5_FOR.slice();e.pkGroup=t.group;}});

/* ----- bank-u6.js ----- */
// Math 2200 Unit 6 Absolute Value and Reciprocal Functions question bank
// CRMARKS: u6-abs-context=2
// CRMARKS: u6-distance=1
// CRMARKS: u6-equation-from-graph=2
// CRMARKS: u6-evaluate-abs=1
// CRMARKS: u6-invariant-points=2
// CRMARKS: u6-no-solution=2
// CRMARKS: u6-order-abs=1
// CRMARKS: u6-original-from-reciprocal=3
// CRMARKS: u6-piecewise=2
// CRMARKS: u6-recip-features=2
// CRMARKS: u6-simplify-expr=2
// CRMARKS: u6-solve-graphical=2
// CRMARKS: u6-solve-linear=2
// CRMARKS: u6-solve-quadratic=3
// CRMARKS: u6-wcr-abs-error-correction=4
// CRMARKS: u6-wcr-drone-height=5
// BIMODAL: u6-solve-quadratic=a
// BIMODAL: u6-solve-linear=a
// BIMODAL: u6-recip-features=b
// BIMODAL: u6-piecewise=b
// BIMODAL: u6-original-from-reciprocal=b
// BIMODAL: u6-no-solution=a
// BIMODAL: u6-invariant-points=a
// BIMODAL: u6-equation-from-graph=b
/* ================= Unit 6: Absolute Value and Reciprocal Functions ================= */
/* ================= Unit 6: Absolute Value and Reciprocal Functions (MA2200.1.5 to 1.8, 1.10, 4.1 to 4.8, 4.33 to 4.36) =================
   Tranche 2, final scope. All stems, contexts and values are original.
   Helpers are prefixed u6; entries register through E(...). */

/* ---------- u6 helpers ---------- */
function u6JoinSigned(nums){ var out=""; nums.forEach(function(v,i){ if(i===0) out=""+v; else out+=(v<0?" - "+(-v):" + "+v); }); return out; }
function u6Lin(a,b){ /* ax + b as a string */
  var s=(a===1?"x":a===-1?"-x":a+"x");
  if(b>0) s+=" + "+b; else if(b<0) s+=" - "+(-b);
  return s;
}
function u6Quad(a,b,c){ /* ax^2 + bx + c as a string */
  var s=(a===1?"x^2":a===-1?"-x^2":a+"x^2");
  if(b!==0) s+=(b>0?" + ":" - ")+(Math.abs(b)===1?"x":Math.abs(b)+"x");
  if(c!==0) s+=(c>0?" + ":" - ")+Math.abs(c);
  return s;
}
function u6Pt(x,y){ return "("+fmt(x)+", "+fmt(y)+")"; }
function u6SetStr(vals){ return "\\{"+vals.join(", ")+"\\}"; }
function u6PtSet(pts){ return "\\{"+pts.map(function(p){ return u6Pt(p[0],p[1]); }).join(", ")+"\\}"; }
function u6AbsArg(a,b){ return "\\left|"+u6Lin(a,b)+"\\right|"; }
function u6Plot(fn,x0,x1,o){ /* axes-and-curve SVG; segments break when the curve leaves the y-range (poles) */
  o=o||{}; var W=440,H=250,pad=26,i,x,y;
  var y1=(o.y1!==undefined)?o.y1:12;
  var y0=(o.y0!==undefined)?o.y0:-12;
  var X=function(v){ return pad+(v-x0)/(x1-x0)*(W-2*pad); };
  var Y=function(v){ return H-pad-(v-y0)/(y1-y0)*(H-2*pad); };
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="100%" style="max-width:440px;background:#fff;border:1px solid #d8d2c4;border-radius:6px" xmlns="http://www.w3.org/2000/svg">';
  var gy=(y1-y0>90)?20:((y1-y0>45)?10:((y1-y0>22)?5:((y1-y0>11)?2:1))), gx, gyv;
  for(gx=Math.ceil(x0);gx<=x1;gx+=1){ out+='<line x1="'+fmt(X(gx),1)+'" y1="'+pad+'" x2="'+fmt(X(gx),1)+'" y2="'+(H-pad)+'" stroke="#eae5d6" stroke-width="1"/>';
    out+='<text x="'+fmt(X(gx),1)+'" y="'+(H-6)+'" font-size="9" fill="#5a5344" text-anchor="middle">'+gx+'</text>'; }
  for(gyv=Math.ceil(y0/gy)*gy;gyv<=y1;gyv+=gy){ out+='<line x1="'+pad+'" y1="'+fmt(Y(gyv),1)+'" x2="'+(W-pad)+'" y2="'+fmt(Y(gyv),1)+'" stroke="#eae5d6" stroke-width="1"/>';
    if(gyv!==0) out+='<text x="'+(pad-4)+'" y="'+fmt(Y(gyv)+3,1)+'" font-size="9" fill="#5a5344" text-anchor="end">'+gyv+'</text>'; }
  if(y0<0&&y1>0) out+='<line x1="'+pad+'" y1="'+fmt(Y(0),1)+'" x2="'+(W-pad)+'" y2="'+fmt(Y(0),1)+'" stroke="#17352a" stroke-width="1.3"/>';
  if(x0<0&&x1>0) out+='<line x1="'+fmt(X(0),1)+'" y1="'+pad+'" x2="'+fmt(X(0),1)+'" y2="'+(H-pad)+'" stroke="#17352a" stroke-width="1.3"/>';
  out+='<text x="'+(W-pad-2)+'" y="'+fmt(Y(0)-6,1)+'" font-size="12" fill="#17352a" text-anchor="end">x</text>';
  out+='<text x="'+fmt(X(0)+6,1)+'" y="'+(pad-8)+'" font-size="12" fill="#17352a">y</text>';
  (o.poles||[]).forEach(function(px){ out+='<line x1="'+fmt(X(px),1)+'" y1="'+pad+'" x2="'+fmt(X(px),1)+'" y2="'+(H-pad)+'" stroke="#b3541e" stroke-width="1.2" stroke-dasharray="5 4"/>'; });
  function trace(f,colour,width){
    var segs=[],cur=[],N=280,j,xx,yy;
    for(j=0;j<=N;j++){ xx=x0+(x1-x0)*j/N; yy=f(xx);
      if(!isFinite(yy)||yy<y0||yy>y1){ if(cur.length>1)segs.push(cur); cur=[]; continue; }
      cur.push(fmt(X(xx),1)+","+fmt(Y(yy),1));
    }
    if(cur.length>1)segs.push(cur);
    return segs.map(function(s){ return '<polyline points="'+s.join(" ")+'" fill="none" stroke="'+colour+'" stroke-width="'+width+'"/>'; }).join("");
  }
  out+=trace(fn,"#0f766e",2.2);
  if(o.fn2) out+=trace(o.fn2,"#7a4fa3",2);
  (o.points||[]).forEach(function(p){ out+='<circle cx="'+fmt(X(p[0]),1)+'" cy="'+fmt(Y(p[1]),1)+'" r="3.6" fill="#b3541e"/>'; });
  (o.labels||[]).forEach(function(L){ out+='<text x="'+fmt(X(L.p[0])+(L.dx||8),1)+'" y="'+fmt(Y(L.p[1])+(L.dy||-8),1)+'" font-size="11" fill="#17352a" text-anchor="'+(L.anc||"start")+'">'+L.t+'</text>'; });
  return out+'</svg>';
}

/* ---------- 1.5, 1.6 and 1.10: evaluate a numerical absolute-value expression (L1) ---------- */
E("u6-evaluate-abs",6,["1.5","1.6","1.10"],1,"gen",function(){
  var fam=pick(["a","b","c"]);
  if(fam==="a"){
    var a=ri(3,14), b=ri(2,6), c=ri(2,5), d=ri(1,9);
    var inside=a-b*c, ans=Math.abs(inside)+d;
    return numq("Evaluate \\(\\left|"+a+" - "+b+"("+c+")\\right| + "+d+"\\).",
      ans, 0.01,
      "Work inside the absolute value first, using the order of operations:"+
      "\\[ \\begin{aligned} \\left|"+a+" - "+b+"("+c+")\\right| + "+d+" &= \\left|"+a+" - "+(b*c)+"\\right| + "+d+" \\\\ &= \\left|"+inside+"\\right| + "+d+" \\\\ &= "+Math.abs(inside)+" + "+d+" \\\\ &= "+ans+" \\end{aligned} \\]"+
      "The absolute value is taken only after the inside has been simplified to a single number, and it gives the distance of that number from zero.",
      {fam:fam, a:a, b:b, c:c, d:d});
  }
  if(fam==="b"){
    var a2=ri(2,5), b2=ri(3,7), c2=ri(2,12), d2=ri(1,8);
    var inside2=a2*b2-c2, ans2=d2-Math.abs(inside2);
    return numq("Evaluate \\("+d2+" - \\left|"+a2+"("+b2+") - "+c2+"\\right|\\).",
      ans2, 0.01,
      "Simplify inside the absolute value first:"+
      "\\[ \\begin{aligned} "+d2+" - \\left|"+a2+"("+b2+") - "+c2+"\\right| &= "+d2+" - \\left|"+(a2*b2)+" - "+c2+"\\right| \\\\ &= "+d2+" - \\left|"+inside2+"\\right| \\\\ &= "+d2+" - "+Math.abs(inside2)+" \\\\ &= "+ans2+" \\end{aligned} \\]"+
      "The subtraction outside the bars happens last, after the absolute value has been found.",
      {fam:fam, a:a2, b:b2, c:c2, d:d2});
  }
  var a3=ri(2,9), b3=ri(2,11), c3=ri(2,5), d3=ri(2,6);
  var inside3=b3-c3*d3, ans3=a3+Math.abs(inside3);
  return numq("Evaluate \\(\\left|-"+a3+"\\right| + \\left|"+b3+" - "+c3+"("+d3+")\\right|\\).",
    ans3, 0.01,
    "Each absolute value gives a distance from zero, so each one is positive or zero:"+
    "\\[ \\begin{aligned} \\left|-"+a3+"\\right| + \\left|"+b3+" - "+c3+"("+d3+")\\right| &= "+a3+" + \\left|"+b3+" - "+(c3*d3)+"\\right| \\\\ &= "+a3+" + \\left|"+inside3+"\\right| \\\\ &= "+a3+" + "+Math.abs(inside3)+" \\\\ &= "+ans3+" \\end{aligned} \\]",
    {fam:fam, a:a3, b:b3, c:c3, d:d3});
});

/* ---------- 1.8 and 1.6: order a set of absolute values (L1) ---------- */
E("u6-order-abs",6,["1.8","1.6"],1,"gen",function(){
  var pool=[
    {d:"\\left|-8\\right|", sv:-8, v:8}, {d:"\\left|6\\right|", sv:6, v:6},
    {d:"\\left|-4\\right|", sv:-4, v:4}, {d:"\\left|-11\\right|", sv:-11, v:11},
    {d:"\\left|3\\right|", sv:3, v:3}, {d:"\\left|-2.5\\right|", sv:-2.5, v:2.5},
    {d:"\\left|\\frac{7}{2}\\right|", sv:3.5, v:3.5}, {d:"\\left|-\\frac{9}{4}\\right|", sv:-2.25, v:2.25},
    {d:"\\left|4 - 9\\right|", sv:-5, v:5}, {d:"\\left|-1\\right|", sv:-1, v:1},
    {d:"\\left|-0.5\\right|", sv:-0.5, v:0.5}, {d:"\\left|10 - 3\\right|", sv:7, v:7},
    {d:"\\left|-\\frac{5}{4}\\right|", sv:-1.25, v:1.25}, {d:"\\left|12\\right|", sv:12, v:12}
  ];
  var att=0, q=null;
  while(att<400 && !q){
    att++;
    var drawn=shuffle(pool).slice(0,4);
    var vs=drawn.map(function(it){ return it.v; });
    if(new Set(vs).size<4) continue;
    var labels=["A","B","C","D"];
    var items=drawn.map(function(it,i){ return {lab:labels[i], d:it.d, sv:it.sv, v:it.v}; });
    var byAbs=items.slice().sort(function(m,n){ return m.v-n.v; }).map(function(it){ return it.lab; });
    var bySign=items.slice().sort(function(m,n){ return m.sv-n.sv; }).map(function(it){ return it.lab; });
    var key=byAbs.join(", "), rev=byAbs.slice().reverse().join(", "), sgn=bySign.join(", ");
    var swapped=byAbs.slice(); var tmp=swapped[0]; swapped[0]=swapped[1]; swapped[1]=tmp; var swp=swapped.join(", ");
    var dis=[rev, sgn, swp];
    if(dis.indexOf(key)>=0 || new Set(dis).size<3) continue;
    var list=items.map(function(it){ return it.lab+". \\("+it.d+"\\)"; }).join("; ");
    var vals=items.slice().sort(function(m,n){ return m.v-n.v; }).map(function(it){ return "\\("+it.d+" = "+fmt(it.v)+"\\)"; }).join(", ");
    q=mcq("Four values are labelled A to D: "+list+". Which list orders the values from <b>least to greatest</b>?",
      key, dis,
      "Evaluate each absolute value first: "+vals+". Ordering those results from least to greatest gives "+key+". Ordering the numbers inside the bars instead, without taking absolute values, would give "+sgn+", which is a different list.",
      {key:key, vals:items.map(function(it){ return it.v; })});
  }
  return q;
});

/* ---------- 1.7: distance between two numbers on a number line (L1) ---------- */
E("u6-distance",6,["1.7"],1,"gen",function(){
  var fam=pick(["street","street","temp","numbers"]);
  if(fam==="street"){
    var names=["the library","the post office","the bakery","the arena","the school","the pharmacy","the café","the fire hall"];
    var two=shuffle(names).slice(0,2);
    var p1=0, p2=0;
    while(p1===0) p1=ri(-14,14)*25;
    while(p2===0 || p2===p1) p2=ri(-14,14)*25;
    var dist=Math.abs(p1-p2);
    return numq("On the main street of a town, positions are measured in metres from the town square, with east positive. "+u6Cap(two[0])+" is at position "+p1+" and "+two[1]+" is at position "+p2+". What is the <b>distance</b>, in metres, between them?",
      dist, 0.01,
      "The distance between two positions \\(a\\) and \\(b\\) on a number line is \\(\\left|a - b\\right|\\):"+
      "\\[ \\begin{aligned} \\left|"+p1+" - ("+p2+")\\right| &= \\left|"+(p1-p2)+"\\right| \\\\ &= "+dist+" \\end{aligned} \\]"+
      "Distance is never negative, so the answer is <b>"+dist+" m</b>, whichever position is subtracted from the other.",
      {fam:fam, a:p1, b:p2, ctx:"street metres", n1:two[0], n2:two[1]});
  }
  if(fam==="temp"){
    var t1=ri(-28,-2), t2=ri(-6,18);
    if(t2===t1) t2=t1+5;
    var distT=Math.abs(t1-t2);
    return numq("A thermometer reads "+t1+" °C at dawn and "+t2+" °C in the middle of the afternoon. What is the <b>distance</b> between the two temperatures on the number line, in degrees?",
      distT, 0.01,
      "Distance on a number line is the absolute value of the difference:"+
      "\\[ \\begin{aligned} \\left|"+t1+" - ("+t2+")\\right| &= \\left|"+(t1-t2)+"\\right| \\\\ &= "+distT+" \\end{aligned} \\]"+
      "So the two temperatures are <b>"+distT+" degrees</b> apart.",
      {fam:fam, a:t1, b:t2, ctx:"temperature °C"});
  }
  var a3=ri(-24,20)/2, b3=ri(-24,24)/2;
  if(b3===a3) b3=a3+1.5;
  var dist3=Math.abs(a3-b3);
  return numq("What is the <b>distance</b> between "+fmt(a3)+" and "+fmt(b3)+" on a number line?",
    dist3, 0.01,
    "Subtract one number from the other and take the absolute value:"+
    "\\[ \\begin{aligned} \\left|"+fmt(a3)+" - ("+fmt(b3)+")\\right| &= \\left|"+fmt(a3-b3)+"\\right| \\\\ &= "+fmt(dist3)+" \\end{aligned} \\]",
    {fam:fam, a:a3, b:b3, ctx:"number line"});
});
function u6Cap(s){ return s.charAt(0).toUpperCase()+s.slice(1); }

/* ---------- 1.10: simplify a multi-term absolute-value expression (L2) ---------- */
E("u6-simplify-expr",6,["1.10"],1,"gen",function(){
  var att=0, q=null;
  while(att<400 && !q){
    att++;
    var c1=ri(1,4), c2=ri(1,4), s2=pick([1,-1]);
    var v1=ri(-9,9); if(v1===0) continue;
    var mode=pick(["sub","mulsub"]);
    var p=ri(2,9), qq=ri(2,5), r=ri(2,6);
    var inside2=(mode==="sub") ? p-qq*r : p*qq-r;
    var g=ri(-8,8);
    var key=c1*Math.abs(v1)+s2*c2*Math.abs(inside2)+g;
    var e1=c1*v1+s2*c2*Math.abs(inside2)+g;
    var e2=c1*Math.abs(v1)-s2*c2*Math.abs(inside2)+g;
    var inside2alt=(mode==="sub") ? (p-qq)*r : (p-r)*qq;
    var e3=c1*Math.abs(v1)+s2*c2*Math.abs(inside2alt)+g;
    var dis=[e1,e2,e3];
    if(dis.indexOf(key)>=0 || new Set(dis).size<3) continue;
    var coef1=(c1===1?"":(""+c1)), coef2=(c2===1?"":(""+c2));
    var insideDisp=(mode==="sub") ? (p+" - "+qq+"("+r+")") : (p+"("+qq+") - "+r);
    var expr=coef1+"\\left|"+v1+"\\right| "+(s2>0?"+":"-")+" "+coef2+"\\left|"+insideDisp+"\\right|"+(g>0?" + "+g:g<0?" - "+(-g):"");
    var line3=u6JoinSigned([c1*Math.abs(v1), s2*c2*Math.abs(inside2), g]);
    q=mcq("Evaluate \\("+expr+"\\).",
      ""+key, dis.map(function(v){ return ""+v; }),
      "Simplify inside each pair of bars first, then take the absolute values, then combine:"+
      "\\[ \\begin{aligned} &"+coef1+"\\left|"+v1+"\\right| "+(s2>0?"+":"-")+" "+coef2+"\\left|"+insideDisp+"\\right|"+(g>0?" + "+g:g<0?" - "+(-g):"")+" \\\\ &= "+coef1+"\\left|"+v1+"\\right| "+(s2>0?"+":"-")+" "+coef2+"\\left|"+inside2+"\\right|"+(g>0?" + "+g:g<0?" - "+(-g):"")+" \\\\ &= "+line3+" \\\\ &= "+key+" \\end{aligned} \\]"+
      "Note that the coefficient in front of a pair of bars multiplies the absolute value after it is taken; it does not go inside the bars.",
      {c1:c1, v1:v1, s2:s2, c2:c2, inside2:inside2, g:g});
  }
  return q;
});

/* ---------- 4.1 and 4.2: features of a graphed absolute value function (L2) ---------- */
E("u6-graph-features",6,["4.1","4.2"],1,"gen",function(){
  var fam=pick(["linear","linear","quad"]);
  if(fam==="linear"){
    var a=pick([1,2,3,-1,-2]);
    var h=0; while(h===0) h=ri(-5,5);
    var b=-a*h, yint=Math.abs(b);
    var fn=function(x){ return Math.abs(a*x+b); };
    function feat(vx, rng, yi){
      return "Vertex: \\("+u6Pt(vx,0)+"\\); x-intercept: \\("+h+"\\); y-intercept: \\("+yi+"\\); range: \\(y "+rng+" 0\\)";
    }
    var key=feat(h, "\\geq", yint);
    var dis=[feat(-h, "\\geq", yint), feat(h, "\\leq", yint), feat(h, "\\geq", b)];
    if(b===yint) dis[2]=feat(h, "\\geq", yint+Math.abs(a));
    var qq=mcq("The graph of \\(y = "+u6AbsArg(a,b)+"\\) is shown. Which list of features matches the graph?",
      key, dis,
      "The graph is the graph of \\(y = "+u6Lin(a,b)+"\\) with its negative part reflected in the x-axis, so it is a V with its vertex on the x-axis. The inside of the bars is zero when \\("+u6Lin(a,b)+" = 0\\), at \\(x = "+h+"\\), so the vertex and the x-intercept are both at \\("+h+"\\) and the range is \\(y \\geq 0\\). Setting \\(x = 0\\) gives the y-intercept \\(\\left|"+b+"\\right| = "+yint+"\\).",
      {fam:fam, a:a, b:b, h:h});
    qq.figure=u6Plot(fn, h-5, h+5, {y0:-2, y1:Math.ceil(Math.abs(a)*5*1.2)+1, points:[[h,0]]});
    return qq;
  }
  var mid=ri(-2,2), d=pick([2,4,6]), r1=mid-d/2, r2=mid+d/2;
  var S=r1+r2, P=r1*r2, peak=d*d/4;
  var fnq=function(x){ return Math.abs((x-r1)*(x-r2)); };
  function featq(yi, pk, rng){
    return "x-intercepts: \\("+r1+"\\) and \\("+r2+"\\); y-intercept: \\("+yi+"\\); highest point between the intercepts: \\("+u6Pt(mid,pk)+"\\); range: \\(y "+rng+" 0\\)";
  }
  var keyq=featq(Math.abs(P), peak, "\\geq");
  var disq=[featq(P, peak, "\\geq"), featq(Math.abs(P), -peak, "\\geq"), featq(Math.abs(P), peak, "\\leq")];
  if(P===Math.abs(P)) disq[0]=featq(-Math.abs(P)-1, peak, "\\geq");
  var q2=mcq("The graph of \\(y = \\left|"+u6Quad(1,-S,P)+"\\right|\\) is shown. Which list of features matches the graph?",
    keyq, disq,
    "The expression inside the bars factors as \\((x - ("+r1+"))(x - ("+r2+"))\\) once the signs are tidied, so the x-intercepts are \\("+r1+"\\) and \\("+r2+"\\). Between the intercepts the quadratic is negative and the absolute value reflects it upward, reaching its highest point halfway across, at \\(x = "+mid+"\\), where the value is \\("+peak+"\\). The y-intercept is \\(\\left|"+P+"\\right| = "+Math.abs(P)+"\\), and the graph never goes below the x-axis, so the range is \\(y \\geq 0\\).",
    {fam:fam, r1:r1, r2:r2, mid:mid});
  q2.figure=u6Plot(fnq, r1-3, r2+3, {y0:-3, y1:Math.ceil(3*(d+3)*1.15)+1, points:[[r1,0],[r2,0],[mid,peak]]});
  return q2;
});

/* ---------- 4.2 and 4.1: the equation of a graphed absolute value function (L2) ---------- */
E("u6-equation-from-graph",6,["4.2","4.1"],2,"gen",function(){
  var a=pick([1,2,3]);
  var h=ri(-4,4), k=pick([-3,-2,-1,0,0,1,2,3]);
  var fn=function(x){ return a*Math.abs(x-h)+k; };
  var key="\\(y = "+(a===1?"":a)+"\\left|x"+(h>0?" - "+h:h<0?" + "+(-h):"")+"\\right|"+(k>0?" + "+k:k<0?" - "+(-k):"")+"\\)";
  var dis=[
    "\\(y = "+(a===1?"":a)+"\\left|x"+(h>0?" + "+h:h<0?" - "+(-h):"")+"\\right|"+(k>0?" + "+k:k<0?" - "+(-k):"")+"\\)",
    "\\(y = "+(a+1)+"\\left|x"+(h>0?" - "+h:h<0?" + "+(-h):"")+"\\right|"+(k>0?" + "+k:k<0?" - "+(-k):"")+"\\)",
    "\\(y = "+(a===1?"":a)+"\\left|x"+(h>0?" - "+h:h<0?" + "+(-h):"")+"\\right|"+(k>0?" - "+k:k<0?" + "+(-k):"")+"\\)"
  ];
  if(h===0) dis[0]="\\(y = "+(a===1?"":a)+"\\left|x - 2\\right|"+(k>0?" + "+k:k<0?" - "+(-k):"")+"\\)";
  if(k===0) dis[2]="\\(y = "+(a===1?"":a)+"\\left|x"+(h>0?" - "+h:h<0?" + "+(-h):"")+"\\right| + 2\\)";
  var qq=mcq("The graph of an absolute value function is shown, with two points marked. What is the equation of the function?",
    key, dis,
    "The vertex of the V is the marked point \\("+u6Pt(h,k)+"\\), so the function has the form \\(y = a\\left|x - ("+h+")\\right| + ("+k+")\\). The second marked point \\("+u6Pt(h+1,k+a)+"\\) is one unit across from the vertex and \\(a\\) units up, and the rise over that one unit gives \\(a = "+a+"\\). So the equation is "+key+".",
    {a:a, h:h, k:k});
  qq.figure=u6Plot(fn, h-4, h+4, {y0:Math.min(-2,k-2), y1:Math.max(6,k+4*a+2), points:[[h,k],[h+1,k+a]],
    labels:[{p:[h,k], t:u6Pt(h,k), dx:8, dy:14}, {p:[h+1,k+a], t:u6Pt(h+1,k+a), dx:8, dy:-8}]});
  return qq;
});

/* ---------- 4.3: write an absolute value function in piecewise notation (L2) ---------- */
E("u6-piecewise",6,["4.3"],2,"gen",function(){
  var fam=pick(["linear","linear","shifted","quad"]);
  if(fam==="linear" || fam==="shifted"){
    var a=pick([1,2,3]), h=0;
    while(h===0) h=ri(-6,6);
    var k=(fam==="shifted") ? pick([-3,-2,-1,1,2,3]) : 0;
    var b=-a*h;
    var expr=u6Lin(a,b), tail=(k>0?" + "+k:k<0?" - "+(-k):"");
    var posE=expr+tail, negE="-\\left("+expr+"\\right)"+tail;
    function pw(first, second, split){
      return "\\("+first+"\\) for \\(x \\geq "+split+"\\); \\("+second+"\\) for \\(x < "+split+"\\)";
    }
    var key=pw(posE, negE, h);
    var dis=[pw(negE, posE, h), pw(posE, negE, -h), pw(posE, posE, h)];
    return mcq("Which piecewise definition matches \\(y = "+u6AbsArg(a,b)+tail+"\\)?",
      key, dis,
      "The expression inside the bars, \\("+expr+"\\), is zero at \\(x = "+h+"\\) and decides the split. For \\(x \\geq "+h+"\\) the inside is positive (or zero), so the bars come off unchanged: \\("+posE+"\\). For \\(x < "+h+"\\) the inside is negative, so the bars negate it: \\("+negE+"\\)."+(k!==0?" The constant "+k+" outside the bars is added to both pieces.":""),
      {fam:fam, a:a, h:h, k:k});
  }
  var mid=ri(-2,2), d=pick([2,4]), r1=mid-d/2, r2=mid+d/2;
  var S=r1+r2, P=r1*r2, quad=u6Quad(1,-S,P);
  function pwq(first, second){
    return "\\("+first+"\\) for \\(x \\leq "+r1+"\\) or \\(x \\geq "+r2+"\\); \\("+second+"\\) for \\("+r1+" < x < "+r2+"\\)";
  }
  var keyq=pwq(quad, "-\\left("+quad+"\\right)");
  var candq=[pwq("-\\left("+quad+"\\right)", quad), pwq(quad, quad),
    "\\("+quad+"\\) for \\(x \\leq "+(-r2)+"\\) or \\(x \\geq "+(-r1)+"\\); \\(-\\left("+quad+"\\right)\\) for \\("+(-r2)+" < x < "+(-r1)+"\\)",
    "\\("+quad+"\\) for \\(x \\geq "+r1+"\\); \\(-\\left("+quad+"\\right)\\) for \\(x < "+r1+"\\)"];
  var disq=candq.filter(function(s){ return s!==keyq; }).slice(0,3);
  return mcq("Which piecewise definition matches \\(y = \\left|"+quad+"\\right|\\)?",
    keyq, disq,
    "The quadratic inside the bars has x-intercepts \\("+r1+"\\) and \\("+r2+"\\) and opens upward, so it is positive outside the interval between the intercepts and negative inside it. Where it is positive, the bars come off unchanged; where it is negative, the bars negate it. That gives the definition with \\("+quad+"\\) outside the interval and its negation inside.",
    {fam:fam, r1:r1, r2:r2});
});

/* ---------- 4.4: solve an absolute value equation graphically (L2) ---------- */
E("u6-solve-graphical",6,["4.4"],1,"gen",function(){
  var a=pick([1,2,3]);
  var s1=0, s2=0, att=0;
  while(att<200){
    att++;
    s1=ri(-8,6); s2=s1+pick([2,4,6,8,10]);
    if(s2>8) continue;
    if((a*(s1+s2))%2!==0) continue;
    break;
  }
  var c=a*(s2-s1)/2, b=-a*(s1+s2)/2;
  var fn=function(x){ return Math.abs(a*x+b); };
  var key="\\("+u6SetStr([s1,s2])+"\\)";
  var dis=["\\("+u6SetStr([s1])+"\\)", "\\("+u6SetStr([s2])+"\\)", "No solution"];
  var qq=mcq("The graphs of \\(y = "+u6AbsArg(a,b)+"\\) and \\(y = "+c+"\\) are shown. Use the graphs to solve \\("+u6AbsArg(a,b)+" = "+c+"\\).",
    key, dis,
    "The solutions of the equation are the x-coordinates of the points where the two graphs meet. The V meets the horizontal line at \\("+u6Pt(s1,c)+"\\) and \\("+u6Pt(s2,c)+"\\), so the solution set is "+key+". Reading only one meeting point misses half of the solution.",
    {a:a, b:b, c:c, s1:s1, s2:s2});
  qq.figure=u6Plot(fn, s1-3, s2+3, {y0:-2, y1:c+3*a+2, fn2:function(){ return c; }, points:[[s1,c],[s2,c]]});
  return qq;
});

/* ---------- 4.6 and 4.4: solve a linear absolute value equation algebraically (L2) ---------- */
E("u6-solve-linear",6,["4.6","4.4"],2,"gen",function(){
  var fam=pick(["standard","standard","both-sides"]);
  if(fam==="standard"){
    var a=pick([1,2,3]);
    var s1=0, s2=0, att=0;
    while(att<200){
      att++;
      s1=ri(-9,7); s2=s1+pick([2,4,6,8,10,12]);
      if(s2>9) continue;
      if((a*(s1+s2))%2!==0) continue;
      break;
    }
    var c=a*(s2-s1)/2, b=-a*(s1+s2)/2;
    var key="\\("+u6SetStr([s1,s2])+"\\)";
    var dis=["\\("+u6SetStr([s2])+"\\)", "\\("+u6SetStr([-s2,-s1])+"\\)", "No solution"];
    if(s1===-s2) dis[1]="\\("+u6SetStr([s1-1,s2+1])+"\\)";
    return mcq("Solve \\("+u6AbsArg(a,b)+" = "+c+"\\).",
      key, dis,
      "An absolute value equation splits into two cases, because the expression inside the bars can equal \\("+c+"\\) or \\(-"+c+"\\):"+
      "\\[ \\begin{aligned} "+u6Lin(a,b)+" &= "+c+" \\\\ "+(a===1?"x":a+"x")+" &= "+(c-b)+" \\\\ x &= "+s2+" \\end{aligned} \\]"+
      "\\[ \\begin{aligned} "+u6Lin(a,b)+" &= -"+c+" \\\\ "+(a===1?"x":a+"x")+" &= "+(-c-b)+" \\\\ x &= "+s1+" \\end{aligned} \\]"+
      "Both values satisfy the original equation, so the solution set is "+key+".",
      {fam:fam, a:a, b:b, c:c, sols:[s1,s2]});
  }
  var bdPairs=[[3,3],[4,2],[4,5],[5,1],[5,4],[6,3],[7,2],[7,5],[8,1],[8,4],[9,3],[6,6],[9,6]];
  var bdp=pick(bdPairs), b2=bdp[0], d2=bdp[1];
  var v=b2-d2, w=-(b2+d2)/3;
  return mcq("Solve \\(\\left|x + "+b2+"\\right| = 2x + "+d2+"\\).",
    "\\("+u6SetStr([v])+"\\)",
    ["\\("+u6SetStr([w,v])+"\\)", "\\("+u6SetStr([w])+"\\)", "No solution"],
    "Split into two cases. Case 1, the inside is positive:"+
    "\\[ \\begin{aligned} x + "+b2+" &= 2x + "+d2+" \\\\ x &= "+v+" \\end{aligned} \\]"+
    "Case 2, the inside is negative:"+
    "\\[ \\begin{aligned} -\\left(x + "+b2+"\\right) &= 2x + "+d2+" \\\\ -x - "+b2+" &= 2x + "+d2+" \\\\ -3x &= "+(b2+d2)+" \\\\ x &= "+w+" \\end{aligned} \\]"+
    "Now check both candidates in the original equation. For \\(x = "+v+"\\): the left side is \\(\\left|"+(v+b2)+"\\right| = "+(v+b2)+"\\) and the right side is \\("+(2*v+d2)+"\\), so it works. For \\(x = "+w+"\\): the right side is \\(2("+w+") + "+d2+" = "+(2*w+d2)+"\\), which is negative, while an absolute value can never be negative, so \\("+w+"\\) is extraneous. The only solution is \\("+v+"\\)",
    {fam:fam, b:b2, d:d2, sols:[v], extra:w});
});

/* ---------- 4.6: solve an absolute value equation with a quadratic inside (L2) ---------- */
E("u6-solve-quadratic",6,["4.6"],2,"gen",function(){
  var fam=pick(["both-squares","one-square","linear-rhs","vertex-form"]);
  if(fam==="both-squares" || fam==="one-square"){
    var A, B, sols, dis;
    if(fam==="both-squares"){
      var pairs=[[36,16],[25,9],[49,25],[36,4],[64,36],[25,1],[49,9],[64,16],[81,49],[16,4],[81,25],[100,36]];
      var pr=pick(pairs), sBig=pr[0], sSmall=pr[1];
      A=(sBig+sSmall)/2; B=(sBig-sSmall)/2;
      var rB=Math.sqrt(sBig), rS=Math.sqrt(sSmall);
      sols=[-rB,-rS,rS,rB];
      dis=["\\("+u6SetStr([-rB,rB])+"\\)", "\\("+u6SetStr([-rS,rS])+"\\)", "\\("+u6SetStr([rS,rB])+"\\)"];
    } else {
      var combos=[[5,16],[10,25],[13,36],[8,25],[20,49],[12,36],[7,25],[11,49],[6,36],[14,64],[9,49],[15,81]];
      var cb=pick(combos); A=cb[0]; var s1q=cb[1]; B=s1q-A;
      var r1q=Math.sqrt(s1q);
      sols=[-r1q,r1q];
      dis=["\\("+u6SetStr([-r1q,r1q-1])+"\\)", "\\("+u6SetStr([r1q])+"\\)", "No solution"];
    }
    return mcq("Solve \\(\\left|x^2 - "+A+"\\right| = "+B+"\\).",
      "\\("+u6SetStr(sols)+"\\)", dis,
      "Split into two cases:"+
      "\\[ \\begin{aligned} x^2 - "+A+" &= "+B+" \\\\ x^2 &= "+(A+B)+" \\end{aligned} \\]"+
      (fam==="both-squares"
        ? "\\[ \\begin{aligned} x^2 - "+A+" &= -"+B+" \\\\ x^2 &= "+(A-B)+" \\end{aligned} \\]"+
          "The first case gives \\(x = \\pm "+Math.sqrt(A+B)+"\\) and the second gives \\(x = \\pm "+Math.sqrt(A-B)+"\\). All four values check in the original equation, so the solution set is \\("+u6SetStr(sols)+"\\)"
        : "\\[ \\begin{aligned} x^2 - "+A+" &= -"+B+" \\\\ x^2 &= "+(A-B)+" \\end{aligned} \\]"+
          "The second case asks for the square root of a negative number, so it gives no real solutions. The first case gives \\(x = \\pm "+Math.sqrt(A+B)+"\\), and both check in the original equation, so the solution set is \\("+u6SetStr(sols)+"\\)"),
      {fam:fam, A:A, B:B, sols:sols});
  }
  if(fam==="linear-rhs"){
    var pairsB=[[12,6,2],[12,4,3],[18,9,2],[20,10,2],[20,5,4],[24,12,2],[24,8,3],[24,6,4],[30,15,2],[30,10,3],[30,6,5],[36,18,2],[36,12,3],[40,20,2],[40,10,4],[42,21,2],[42,14,3],[48,24,2],[48,16,3],[48,12,4],[54,27,2],[54,18,3],[60,30,2],[60,20,3],[60,15,4],[56,28,2],[56,14,4],[72,36,2],[72,24,3],[72,18,4],[8,4,2],[16,8,2],[32,16,2],[32,8,4],[50,25,2],[50,10,5],[63,21,3],[63,9,7],[27,9,3]];
    var pb=pick(pairsB), A2=pb[0], r=pb[1], s=pb[2], B2=r-s;
    return mcq("Solve \\(\\left|x^2 - "+A2+"\\right| = "+B2+"x\\).",
      "\\("+u6SetStr([s,r])+"\\)",
      ["\\("+u6SetStr([-r,-s,s,r])+"\\)", "\\("+u6SetStr([-s,-r])+"\\)", "\\("+u6SetStr([r])+"\\)"],
      "Split into two cases:"+
      "\\[ \\begin{aligned} x^2 - "+A2+" &= "+B2+"x \\\\ x^2 - "+B2+"x - "+A2+" &= 0 \\\\ (x - "+r+")(x + "+s+") &= 0 \\\\ x &= "+r+" \\text{ or } x = -"+s+" \\end{aligned} \\]"+
      "\\[ \\begin{aligned} x^2 - "+A2+" &= -"+B2+"x \\\\ x^2 + "+B2+"x - "+A2+" &= 0 \\\\ (x - "+s+")(x + "+r+") &= 0 \\\\ x &= "+s+" \\text{ or } x = -"+r+" \\end{aligned} \\]"+
      "Now check the candidates, because the right side, \\("+B2+"x\\), must not be negative. At \\(x = -"+s+"\\) and \\(x = -"+r+"\\) the right side is negative, which an absolute value can never equal, so both are extraneous. At \\(x = "+s+"\\) and \\(x = "+r+"\\) both sides agree. The solution set is \\("+u6SetStr([s,r])+"\\)",
      {fam:fam, A:A2, B:B2, sols:[s,r], extra:[-r,-s]});
  }
  var pairsV=[[36,16],[25,9],[49,25],[36,4],[64,36],[25,1],[49,9],[64,16],[16,4],[100,36]];
  var pv=pick(pairsV), AV=(pv[0]+pv[1])/2, BV=(pv[0]-pv[1])/2;
  var rBV=Math.sqrt(pv[0]), rSV=Math.sqrt(pv[1]);
  var h=0; while(h===0) h=ri(-4,4);
  var solsV=[h-rBV, h-rSV, h+rSV, h+rBV];
  var hs=(h>0?" - "+h:" + "+(-h));
  return mcq("Solve \\(\\left|(x"+hs+")^2 - "+AV+"\\right| = "+BV+"\\).",
    "\\("+u6SetStr(solsV)+"\\)",
    ["\\("+u6SetStr([h-rBV,h+rBV])+"\\)", "\\("+u6SetStr([h-rSV,h+rSV])+"\\)", "\\("+u6SetStr([-rBV,-rSV,rSV,rBV])+"\\)"],
    "Split into two cases and solve for the squared bracket first:"+
    "\\[ \\begin{aligned} (x"+hs+")^2 - "+AV+" &= "+BV+" \\\\ (x"+hs+")^2 &= "+pv[0]+" \\\\ x"+hs+" &= \\pm "+rBV+" \\end{aligned} \\]"+
    "\\[ \\begin{aligned} (x"+hs+")^2 - "+AV+" &= -"+BV+" \\\\ (x"+hs+")^2 &= "+pv[1]+" \\\\ x"+hs+" &= \\pm "+rSV+" \\end{aligned} \\]"+
    "So \\(x = "+h+" \\pm "+rBV+"\\) or \\(x = "+h+" \\pm "+rSV+"\\), giving the solution set \\("+u6SetStr(solsV)+"\\) All four values check in the original equation.",
    {fam:fam, A:AV, B:BV, h:h, sols:solsV});
});

/* ---------- 4.5: problem solving with a linear absolute value model (L2) ---------- */
E("u6-abs-context",6,["4.5"],1,"gen",function(){
  var fam=pick(["bolt","bolt","storage","package"]);
  if(fam==="bolt"){
    var ctxs=[
      {n:"machine bolts", unit:"mm", Ts:[25,40,50,80,120], ts:[0.2,0.3,0.4,0.5,0.8]},
      {n:"cut dowels", unit:"mm", Ts:[150,200,300,450,600], ts:[0.5,1,1.5,2]},
      {n:"steel pins", unit:"mm", Ts:[12,18,24,36,48], ts:[0.1,0.2,0.3,0.5]}
    ];
    var ctx=pick(ctxs), T=pick(ctx.Ts), t=pick(ctx.ts), askMax=ri(0,1)===0;
    var ans=askMax ? Math.round((T+t)*100)/100 : Math.round((T-t)*100)/100;
    return numq("A workshop makes "+ctx.n+" with a target length of "+T+" "+ctx.unit+". A part is accepted when its length \\(x\\), in "+ctx.unit+", satisfies \\(\\left|x - "+T+"\\right| \\leq "+t+"\\). What is the <b>"+(askMax?"greatest":"least")+"</b> length, in "+ctx.unit+", that is accepted?",
      ans, 0.01,
      "The inequality says the length can differ from the target by at most "+t+" "+ctx.unit+":"+
      "\\[ \\begin{aligned} -"+t+" \\leq x - "+T+" &\\leq "+t+" \\\\ "+fmt(T-t)+" \\leq x &\\leq "+fmt(T+t)+" \\end{aligned} \\]"+
      "So the accepted lengths run from "+fmt(T-t)+" "+ctx.unit+" to "+fmt(T+t)+" "+ctx.unit+", and the "+(askMax?"greatest":"least")+" accepted length is <b>"+fmt(ans)+" "+ctx.unit+"</b>.",
      {fam:fam, ctx:ctx.n, T:T, t:t, askMax:askMax});
  }
  if(fam==="storage"){
    var ctxs2=[
      {n:"A cold-storage room for fish", S:2, ds:[1,1.5,2]},
      {n:"A vaccine fridge", S:4, ds:[1,1.5,2]},
      {n:"A greenhouse", S:21, ds:[2,2.5,3]},
      {n:"A server room", S:20, ds:[1.5,2,3]}
    ];
    var ctx2=pick(ctxs2), S2=ctx2.S, d2v=pick(ctx2.ds), askMax2=ri(0,1)===0;
    var ans2=askMax2 ? S2+d2v : S2-d2v;
    return numq(ctx2.n+" must be kept within "+fmt(d2v)+" °C of "+S2+" °C. The allowed temperatures \\(T\\), in °C, satisfy \\(\\left|T - "+S2+"\\right| \\leq "+fmt(d2v)+"\\). What is the <b>"+(askMax2?"warmest":"coolest")+"</b> allowed temperature, in °C?",
      ans2, 0.01,
      "The temperature can sit at most "+fmt(d2v)+" °C away from "+S2+" °C in either direction:"+
      "\\[ \\begin{aligned} -"+fmt(d2v)+" \\leq T - "+S2+" &\\leq "+fmt(d2v)+" \\\\ "+fmt(S2-d2v)+" \\leq T &\\leq "+fmt(S2+d2v)+" \\end{aligned} \\]"+
      "So the "+(askMax2?"warmest":"coolest")+" allowed temperature is <b>"+fmt(ans2)+" °C</b>.",
      {fam:fam, ctx:ctx2.n, T:S2, t:d2v, askMax:askMax2});
  }
  var ctxs3=[
    {n:"bags of flour", W:1000, gs:[10,15,20,25]},
    {n:"bags of coffee beans", W:500, gs:[5,8,10]},
    {n:"boxes of nails", W:750, gs:[10,15,20]},
    {n:"jars of preserves", W:250, gs:[4,5,8]}
  ];
  var ctx3=pick(ctxs3), W3=ctx3.W, g3=pick(ctx3.gs), askMax3=ri(0,1)===0;
  var ans3=askMax3 ? W3+g3 : W3-g3;
  return numq("A packer fills "+ctx3.n+" labelled "+W3+" g. A bag is accepted when its mass \\(m\\), in grams, satisfies \\(\\left|m - "+W3+"\\right| \\leq "+g3+"\\). What is the <b>"+(askMax3?"heaviest":"lightest")+"</b> accepted mass, in grams?",
    ans3, 0.01,
    "The mass can differ from the labelled mass by at most "+g3+" g:"+
    "\\[ \\begin{aligned} -"+g3+" \\leq m - "+W3+" &\\leq "+g3+" \\\\ "+(W3-g3)+" \\leq m &\\leq "+(W3+g3)+" \\end{aligned} \\]"+
    "So the "+(askMax3?"heaviest":"lightest")+" accepted mass is <b>"+ans3+" g</b>.",
    {fam:fam, ctx:ctx3.n, T:W3, t:g3, askMax:askMax3});
});

/* ---------- 4.33 and 4.34: asymptotes, domain and range of a reciprocal function (L2) ---------- */
E("u6-recip-features",6,["4.33","4.34"],2,"gen",function(){
  var fam=pick(["va-linear","va-linear","va-quad","domain-range","point"]);
  if(fam==="va-linear"){
    var a=pick([1,2,3,-2,-3]), k=0;
    while(k===0) k=ri(-6,6);
    var b=-a*k;
    var key="\\(x = "+k+"\\)";
    var dis=["\\(x = "+(-k)+"\\)", "\\(x = "+b+"\\)", "\\(y = 0\\)"];
    if(b===k || b===-k) dis[1]="\\(x = "+(k+1)+"\\)";
    return mcq("What is the <b>vertical asymptote</b> of the graph of \\(y = \\frac{1}{"+u6Lin(a,b)+"}\\)?",
      key, dis,
      "A reciprocal function is undefined exactly where its denominator is zero, and that x-value is the vertical asymptote:"+
      "\\[ \\begin{aligned} "+u6Lin(a,b)+" &= 0 \\\\ "+(a===1?"x":a+"x")+" &= "+(-b)+" \\\\ x &= "+k+" \\end{aligned} \\]"+
      "So the graph approaches the line \\(x = "+k+"\\) without ever reaching it. The horizontal asymptote is \\(y = 0\\), which describes the end behaviour, not a vertical line.",
      {fam:fam, a:a, b:b, va:k});
  }
  if(fam==="va-quad"){
    var r1=ri(-5,2), r2=r1+pick([2,3,4]);
    var S=r1+r2, P=r1*r2;
    return mcq("What are the <b>vertical asymptotes</b> of the graph of \\(y = \\frac{1}{"+u6Quad(1,-S,P)+"}\\)?",
      "\\(x = "+r1+"\\) and \\(x = "+r2+"\\)",
      ["\\(x = "+(-r1)+"\\) and \\(x = "+(-r2)+"\\)", "\\(x = "+r1+"\\) only", "There are no vertical asymptotes"],
      "Factor the denominator first: \\("+u6Quad(1,-S,P)+" = (x - ("+r1+"))(x - ("+r2+"))\\). The function is undefined where either factor is zero, at \\(x = "+r1+"\\) and \\(x = "+r2+"\\). Each zero of the denominator gives a vertical asymptote, so there are two of them.",
      {fam:fam, r1:r1, r2:r2});
  }
  if(fam==="domain-range"){
    var a2=pick([1,2,3,-2]), k2=0;
    while(k2===0) k2=ri(-6,6);
    var b2=-a2*k2;
    function dr(d, rg){ return "Domain: all real numbers except \\(x = "+d+"\\); range: all real numbers except \\(y = "+rg+"\\)"; }
    return mcq("What are the <b>domain and range</b> of \\(y = \\frac{1}{"+u6Lin(a2,b2)+"}\\)?",
      dr(k2, 0), [dr(-k2, 0), dr(k2, 1), "Domain: all real numbers; range: all real numbers"],
      "The denominator is zero when \\("+u6Lin(a2,b2)+" = 0\\), at \\(x = "+k2+"\\), and the function is undefined there, so \\("+k2+"\\) is excluded from the domain. Every other x-value is allowed. The reciprocal of a real number is never 0, so \\(y = 0\\) is excluded from the range, and every other y-value does occur.",
      {fam:fam, a:a2, b:b2, va:k2});
  }
  var x0=ri(-5,5), y0=pick([2,4,5,10,-2,-4,-5,-10]), rev=ri(0,1)===0;
  function ptStr(x,y){ return "\\("+u6Pt(x,y)+"\\)"; }
  var frac1=(y0===2?"\\frac{1}{2}":y0===4?"\\frac{1}{4}":y0===5?"\\frac{1}{5}":y0===10?"\\frac{1}{10}":y0===-2?"-\\frac{1}{2}":y0===-4?"-\\frac{1}{4}":y0===-5?"-\\frac{1}{5}":"-\\frac{1}{10}");
  var recipDisp=frac1;
  function ptRaw(x,y){ return "("+x+", "+y+")"; }
  if(rev){
    return mcq("The point \\("+ptRaw(x0,recipDisp)+"\\) lies on the graph of the reciprocal function \\(y = \\frac{1}{f(x)}\\). Which point lies on the graph of \\(y = f(x)\\)?",
      ptStr(x0,y0),
      ["\\("+ptRaw(x0,recipDisp)+"\\)", "\\("+ptRaw(recipDisp,x0)+"\\)", ptStr(x0,-y0)],
      "A point \\((a, b)\\) on \\(y = \\frac{1}{f(x)}\\) has \\(b = \\frac{1}{f(a)}\\), so \\(f(a) = \\frac{1}{b}\\). Here \\(b = "+recipDisp+"\\), so \\(f("+x0+") = "+y0+"\\), and the corresponding point on the original function is "+ptStr(x0,y0)+". The x-coordinate does not change between the two graphs.",
      {fam:fam, x:x0, y:y0, rev:rev});
  }
  return mcq("The point "+ptStr(x0,y0)+" lies on the graph of \\(y = f(x)\\). Which point lies on the graph of the reciprocal function \\(y = \\frac{1}{f(x)}\\)?",
    "\\("+ptRaw(x0,recipDisp)+"\\)",
    [ptStr(x0,y0), "\\("+ptRaw(recipDisp,x0)+"\\)", ptStr(x0,-y0)],
    "A point \\((a, b)\\) on \\(y = f(x)\\) gives the value \\(f(a) = "+y0+"\\). On the reciprocal function the same x-value appears with the reciprocal of the y-value: \\(\\frac{1}{"+y0+"} = "+recipDisp+"\\). So the corresponding point is \\("+ptRaw(x0,recipDisp)+"\\)",
    {fam:fam, x:x0, y:y0, rev:rev});
});

/* ---------- 4.35: invariant points of a function and its reciprocal (L2) ---------- */
E("u6-invariant-points",6,["4.35"],2,"gen",function(){
  var fam=pick(["linear","linear","quad-a2","quad-k1"]);
  if(fam==="linear"){
    var a=pick([1,2,-1,-2]);
    var x1=ri(-6,6);
    var b=1-a*x1, x2=x1-2/a;
    var key=u6PtSet([[x1,1],[x2,-1]]);
    var dis=[u6PtSet([[x1,-1],[x2,1]]), u6PtSet([[x1,1],[x1,-1]]), u6PtSet([[-x1,1],[-x2,-1]])];
    if(x1===0 || x2===0 || x2===-x1) dis[2]=u6PtSet([[x1+1,1],[x2+1,-1]]);
    return mcq("What are the <b>invariant points</b> of \\(f(x) = "+u6Lin(a,b)+"\\) and its reciprocal function \\(y = \\frac{1}{f(x)}\\)?",
      "\\("+key+"\\)", dis.map(function(s){ return "\\("+s+"\\)"; }),
      "Invariant points are the points the two graphs share, where \\(f(x) = \\frac{1}{f(x)}\\). That happens when \\(f(x) = 1\\) or \\(f(x) = -1\\):"+
      "\\[ \\begin{aligned} "+u6Lin(a,b)+" &= 1 \\\\ "+(a===1?"x":a+"x")+" &= "+(1-b)+" \\\\ x &= "+x1+" \\end{aligned} \\]"+
      "\\[ \\begin{aligned} "+u6Lin(a,b)+" &= -1 \\\\ "+(a===1?"x":a+"x")+" &= "+(-1-b)+" \\\\ x &= "+x2+" \\end{aligned} \\]"+
      "So the invariant points are \\("+key+"\\), where the graphs cross.",
      {fam:fam, a:a, b:b, pts:[[x1,1],[x2,-1]]});
  }
  if(fam==="quad-a2"){
    var h=ri(-4,4);
    var key2=u6PtSet([[h-1,1],[h,-1],[h+1,1]]);
    var dis2=[u6PtSet([[h-1,-1],[h,1],[h+1,-1]]), u6PtSet([[h-1,1],[h+1,1]]), u6PtSet([[h-2,1],[h,-1],[h+2,1]])];
    return mcq("What are the <b>invariant points</b> of \\(f(x) = 2(x"+(h>0?" - "+h:h<0?" + "+(-h):"")+")^2 - 1\\) and its reciprocal function?",
      "\\("+key2+"\\)", dis2.map(function(s){ return "\\("+s+"\\)"; }),
      "Invariant points satisfy \\(f(x) = 1\\) or \\(f(x) = -1\\). For \\(f(x) = 1\\):"+
      "\\[ \\begin{aligned} 2(x"+(h>0?" - "+h:h<0?" + "+(-h):"")+")^2 - 1 &= 1 \\\\ 2(x"+(h>0?" - "+h:h<0?" + "+(-h):"")+")^2 &= 2 \\\\ (x"+(h>0?" - "+h:h<0?" + "+(-h):"")+")^2 &= 1 \\\\ x &= "+(h-1)+" \\text{ or } x = "+(h+1)+" \\end{aligned} \\]"+
      "For \\(f(x) = -1\\): \\(2(x"+(h>0?" - "+h:h<0?" + "+(-h):"")+")^2 - 1 = -1\\) gives \\((x"+(h>0?" - "+h:h<0?" + "+(-h):"")+")^2 = 0\\), so \\(x = "+h+"\\). The invariant points are \\("+key2+"\\).",
      {fam:fam, h:h, pts:[[h-1,1],[h,-1],[h+1,1]]});
  }
  var h3=ri(-5,5);
  return mcq("What are the <b>invariant points</b> of \\(f(x) = (x"+(h3>0?" - "+h3:h<0?" + "+(-h3):"")+")^2 + 1\\) and its reciprocal function?",
    "\\("+u6PtSet([[h3,1]])+"\\)",
    ["\\("+u6PtSet([[h3,-1]])+"\\)", "\\("+u6PtSet([[h3-1,1],[h3+1,1]])+"\\)", "There are no invariant points."],
    "Invariant points satisfy \\(f(x) = 1\\) or \\(f(x) = -1\\). The squared part is never negative, so \\(f(x) \\geq 1\\) for every \\(x\\); the value \\(-1\\) never occurs. For \\(f(x) = 1\\), the squared part must be zero, so \\(x = "+h3+"\\), giving the single invariant point \\("+u6PtSet([[h3,1]])+"\\).",
    {fam:fam, h:h3, pts:[[h3,1]]});
});

/* ---------- 4.7: identify the error in a worked solution (L3, var) ----------
   Options state error descriptions, so the plausible-error space for each
   classic mistake is a fixed variant set rather than a generator. */
E("u6-error-analysis",6,["4.7"],3,"var",varset([
  function(){
    return mcq("A student solves \\(-2\\left|x - 3\\right| = 10\\) by first rewriting the left side as \\(\\left|-2x + 6\\right|\\), then splitting into cases. Which statement identifies the <b>error</b>?",
      "Multiplying through the absolute value is not valid. The coefficient -2 multiplies the whole absolute value, so the first move should be to divide both sides by -2 and get \\(\\left|x - 3\\right| = -5\\), which has no solution.",
      ["There is no error in the work. Distributing a negative number through the bars gives an equivalent equation, so rewriting \\(-2\\left|x - 3\\right|\\) as \\(\\left|-2x + 6\\right|\\) is a valid first step and the cases that follow from it are right.",
       "The error is in the splitting step. The cases should be \\(-2x + 6 = 10\\) and \\(-2x + 6 = -10\\), which the student did next, and solving those two cases gives \\(x = -2\\) and \\(x = 8\\) as the reported solutions of the equation.",
       "The only error is the arithmetic inside the bars: -2 multiplied by -3 gives -6, not 6, so the left side should have been \\(\\left|-2x - 6\\right|\\), and splitting that gives the two cases \\(-2x - 6 = 10\\) and \\(-2x - 6 = -10\\)."],
      "An absolute value is not a bracket: multiplying by a constant outside the bars does not distribute inside them, because \\(-2\\left|x - 3\\right|\\) and \\(\\left|-2x + 6\\right|\\) take different values (try \\(x = 0\\): they give -6 and 6). Dividing by -2 isolates the absolute value as \\(\\left|x - 3\\right| = -5\\), and since an absolute value is never negative, the equation has no solution.",
      {err:"distribute"});
  },
  function(){
    return mcq("A student solves \\(\\left|x - 3\\right| = 8\\) by writing the two cases \\(x - 3 = 8\\) and \\(-x - 3 = 8\\), and reports the solutions 11 and -11. Which statement identifies the <b>error</b>?",
      "The second case negates only the first term. It should negate the whole expression: \\(-(x - 3) = 8\\), that is \\(-x + 3 = 8\\), which gives \\(x = -5\\), not -11.",
      ["There is no error in the work: both reported solutions satisfy the original equation when they are substituted back into it and checked carefully.",
       "The error is in the first case: it should be \\(x + 3 = 8\\) rather than \\(x - 3 = 8\\), which gives \\(x = 5\\) as the first of the two reported solutions.",
       "The only error is the sign of the constant in the second case: -3 divided by -1 is 3, so the second solution is positive 11, and the reported -11 has the wrong sign."],
      "Splitting an absolute value equation means the entire expression inside the bars takes both signs: \\(x - 3 = 8\\) or \\(-(x - 3) = 8\\). Writing \\(-x - 3\\) negates only the \\(x\\), leaving the \\(- 3\\) untouched. Solving the correct second case gives \\(x = -5\\), which checks: \\(\\left|-5 - 3\\right| = 8\\). The reported -11 fails the check: \\(\\left|-11 - 3\\right| = 14\\).",
      {err:"negate"});
  },
  function(){
    return mcq("A student solves \\(\\left|x^2 - 4\\right| = 3x\\), splits into cases, and reports all four values -4, -1, 1 and 4 as the solutions. Which statement identifies the <b>error</b>?",
      "The candidates were never checked. At \\(x = -4\\) and \\(x = -1\\), the right side \\(3x\\) is negative and cannot equal an absolute value, so both are extraneous; only 1 and 4 are solutions.",
      ["There is no error in the work. Two cases arise from the bars, and each case is a quadratic with two roots, so four solutions are expected and all four of the reported values stand.",
       "The error is algebraic: the two case equations are \\(x^2 - 4 = 3x\\) and \\(x^2 - 4 = -3x\\), and neither of these equations has integer roots among its solutions at all.",
       "The only error is a missing fifth solution at \\(x = 0\\), where the two sides of the equation come closest to each other, so the reported list is incomplete rather than wrong in itself."],
      "Splitting gives candidates, not solutions. Every candidate must be checked in the original equation, because the right side can be negative for negative \\(x\\), and a negative number can never equal an absolute value. Checking: \\(x = 4\\) gives \\(12 = 12\\); \\(x = 1\\) gives \\(3 = 3\\); \\(x = -1\\) gives \\(3 = -3\\), false; \\(x = -4\\) gives \\(12 = -12\\), false. So the solution set is \\(\\{1, 4\\}\\)",
      {err:"extraneous"});
  },
  function(){
    return mcq("A student solves \\(\\left|2x - 1\\right| = 7\\) by writing only the case \\(2x - 1 = 7\\), and reports the single solution \\(x = 4\\). Which statement identifies the <b>error</b>?",
      "Only one of the two cases was solved. The number 7 is a distance from zero, so the inside can equal 7 or -7; the missing case \\(2x - 1 = -7\\) gives a second solution, \\(x = -3\\).",
      ["There is no error in the work. An absolute value equation has one case for each side of the equation, and only the right side varies here, so one case is enough for it.",
       "The error is that 7 should first be split into 7 and -7 on both sides, as in \\(\\left|2x - 1\\right| = 7\\) and \\(\\left|2x - 1\\right| = -7\\), giving four cases to solve instead of the single case the student wrote.",
       "The only error is arithmetic in the case shown: 7 plus 1 is 8, and 8 divided by 2 is 4, so the answer given is correct and the solution is complete as it stands in the work."],
      "The equation says the expression \\(2x - 1\\) is at distance 7 from zero, and two numbers sit at that distance: 7 and -7. Both cases must be solved. The second case gives \\(2x = -6\\), so \\(x = -3\\), and it checks: \\(\\left|2(-3) - 1\\right| = \\left|-7\\right| = 7\\). The full solution set is \\(\\{-3, 4\\}\\)",
      {err:"onecase"});
  }
]));

/* ---------- 4.8: recognize and justify when an equation has no solution (L3) ---------- */
E("u6-no-solution",6,["4.8"],3,"gen",function(){
  var fam=pick(["negative-rhs","parameter","quad-inside"]);
  if(fam==="negative-rhs"){
    var a=pick([1,2,3]), b=ri(-8,8), c=ri(2,9);
    return mcq("Which statement correctly describes the solutions of \\("+u6AbsArg(a,b)+" = -"+c+"\\)?",
      "No solution. The left side is an absolute value, so it is never negative, while the right side is negative.",
      ["Two solutions, found by solving \\("+u6Lin(a,b)+" = -"+c+"\\) and \\("+u6Lin(a,b)+" = "+c+"\\), one from each of the two cases that arise here.",
       "One solution, where the graph of \\(y = "+u6AbsArg(a,b)+"\\) touches the line \\(y = -"+c+"\\) at its vertex.",
       "Every real number is a solution, because absolute value makes both sides match in size."],
      "The graph of \\(y = "+u6AbsArg(a,b)+"\\) is a V lying on and above the x-axis, because an absolute value is a distance and distances are never negative. The line \\(y = -"+c+"\\) lies entirely below the x-axis, so the graphs never meet and the equation has no solution. Splitting into cases cannot rescue it: both case equations would claim a distance equals a negative number.",
      {fam:fam, a:a, b:b, c:c, ans:"none"});
  }
  if(fam==="parameter"){
    var ask=pick(["none","one","two"]);
    var a2=pick([1,2,3]), b2=ri(-8,8);
    var keyC=(ask==="none"?"\\(m < 0\\)":ask==="one"?"\\(m = 0\\)":"\\(m > 0\\)");
    var poolC=["\\(m < 0\\)","\\(m = 0\\)","\\(m > 0\\)","\\(m \\neq 0\\)"];
    var disC=poolC.filter(function(s){ return s!==keyC; });
    var desc=(ask==="none"?"no solution":ask==="one"?"exactly one solution":"two solutions");
    return mcq("For which values of \\(m\\) does \\("+u6AbsArg(a2,b2)+" = m\\) have <b>"+desc+"</b>?",
      keyC, disC,
      "Read the equation graphically. The left side is a V-shaped graph lying on and above the x-axis, and the right side is a horizontal line at height \\(m\\). The line meets the V twice when it is above the x-axis (\\(m > 0\\)), touches it once at the vertex when it is on the x-axis (\\(m = 0\\)), and misses it entirely when it is below (\\(m < 0\\)), because an absolute value is never negative. So "+desc+" occur exactly when "+keyC+".",
      {fam:fam, a:a2, b:b2, ask:ask});
  }
  var k=pick([1,2,3,5]), m=ri(1,8);
  return mcq("Which statement correctly describes the solutions of \\(\\left|x^2 + "+k+"\\right| = -"+m+"\\)?",
    "No solution. The expression inside the bars is positive for every \\(x\\), and its absolute value is even further from being negative.",
    ["Two solutions, found by setting \\(x^2 + "+k+" = -"+m+"\\) and \\(x^2 + "+k+" = "+m+"\\) and solving each of the two quadratics in turn, just as in the positive case.",
     "One solution when the variable is zero, where the inside of the bars takes its smallest value and the two sides come closest.",
     "Solutions exist but are not real numbers, so they are reported as imaginary values, written in the form \\(x = \\pm \\sqrt{"+(m+k)+"}\\,i\\)."],
    "Work by inspection: \\(x^2 \\geq 0\\), so \\(x^2 + "+k+" \\geq "+k+" > 0\\), and the absolute value of a positive number is that number, which is at least "+k+". The left side can therefore never equal the negative number \\(-"+m+"\\) and the equation has no solution. Splitting into cases produces a case with \\(x^2 = -"+(m+k)+"\\), which has no real solutions anyway.",
    {fam:fam, k:k, m:m, ans:"none"});
});

/* ---------- 4.36 and 4.34: recover the original function from its reciprocal graph (L3) ---------- */
E("u6-original-from-reciprocal",6,["4.36","4.34"],3,"gen",function(){
  var fam=pick(["quad-eq","quad-eq","quad-intercepts","linear-eq"]);
  if(fam==="quad-intercepts"){
    var r1=ri(-4,1), d=pick([2,4]), r2=r1+d;
    if(r2===0 || r1===0){ r1=-3; r2=r1+d; }
    var midQ=(r1+r2)/2, midVal=-4/(d*d);
    var fnI=function(x){ return 1/((x-r1)*(x-r2)); };
    var keyI="\\("+u6SetStr([r1,r2])+"\\)";
    var disI=["\\("+u6SetStr([-r1,-r2])+"\\)", "\\("+u6SetStr([midQ])+"\\)", "The graph of \\(f\\) has no x-intercepts."]; if(r1+r2===0) disI[0]="\\("+u6SetStr([r1-1,r2+1])+"\\)";
    var qI=mcq("The graph shows \\(y = \\frac{1}{f(x)}\\), where \\(f\\) is a quadratic function. What are the <b>x-intercepts</b> of the graph of \\(y = f(x)\\)?",
      keyI,
      disI,
      "Work backwards from the reciprocal graph. The dashed vertical lines are the vertical asymptotes of the reciprocal graph, at \\(x = "+r1+"\\) and \\(x = "+r2+"\\). An asymptote of the reciprocal sits exactly where the original function is zero, so those x-values are the x-intercepts of \\(f\\). The lowest point of the reciprocal graph, \\("+u6Pt(midQ,midVal)+"\\), lies between them, which matches a quadratic that dips below the axis between its intercepts.",
      {fam:fam, r1:r1, r2:r2});
    qI.figure=u6Plot(fnI, r1-3, r2+3, {y0:-3, y1:3, poles:[r1,r2], points:[[midQ,midVal]],
      labels:[{p:[midQ,midVal], t:u6Pt(midQ,midVal), dx:8, dy:14}]});
    return qI;
  }
  if(fam==="linear-eq"){
    var aL=pick([1,2,-1]), rL=0;
    while(rL===0) rL=ri(-5,5);
    var fnL=function(x){ return 1/(aL*(x-rL)); };
    var px=rL+1, pv=1/aL, pvDisp=(pv===0.5?"\\frac{1}{2}":pv===-1?"-1":"1");
    var keyL="\\(f(x) = "+u6Lin(aL,-aL*rL)+"\\)";
    var disL=[
      "\\(f(x) = "+u6Lin(aL,aL*rL)+"\\)",
      "\\(f(x) = \\frac{1}{"+u6Lin(aL,-aL*rL)+"}\\)",
      "\\(f(x) = "+u6Lin(1,-rL)+"\\)"
    ];
    if(aL===1) disL[2]="\\(f(x) = "+u6Lin(2,-2*rL)+"\\)";
    var qL=mcq("The graph shows \\(y = \\frac{1}{f(x)}\\), where \\(f\\) is a linear function, with one point marked. Which function is \\(f\\)?",
      keyL, disL,
      "The single dashed vertical asymptote of the reciprocal graph is at \\(x = "+rL+"\\), so \\(f\\) is zero there: \\(f(x) = a(x - ("+rL+"))\\) for some leading coefficient \\(a\\). The marked point on the reciprocal graph is \\("+u6Pt(px,pv)+"\\), so \\(f("+px+") = \\frac{1}{"+pvDisp+"} = "+aL+"\\). One unit across from the intercept, the original function has value \\(a\\), so \\(a = "+aL+"\\) and \\(f(x) = "+u6Lin(aL,-aL*rL)+"\\)",
      {fam:fam, a:aL, r:rL});
    qL.figure=u6Plot(fnL, rL-4, rL+4, {y0:-4, y1:4, poles:[rL], points:[[px,pv]],
      labels:[{p:[px,pv], t:u6Pt(px,pv), dx:8, dy:-8}]});
    return qL;
  }
  var aQ=pick([1,2]);
  var r1q=pick([-4,-3,-2,-1,1,2]), dQ=pick([2,4]), r2q=r1q+dQ;
  if(r2q===0){ dQ=(dQ===2?4:2); r2q=r1q+dQ; }
  var SQ=r1q+r2q, PQ=r1q*r2q, mid2=(r1q+r2q)/2;
  var fMid=aQ*(mid2-r1q)*(mid2-r2q), recMid=1/fMid;
  var recMidDisp=(recMid===-1?"-1":recMid===-0.5?"-\\frac{1}{2}":recMid===-0.25?"-\\frac{1}{4}":"-\\frac{1}{8}");
  var fnQ=function(x){ return 1/(aQ*(x-r1q)*(x-r2q)); };
  var keyQ="\\(f(x) = "+u6Quad(aQ,-aQ*SQ,aQ*PQ)+"\\)";
  var candDisQ=[
    "\\(f(x) = "+u6Quad(aQ,aQ*SQ,aQ*PQ)+"\\)",
    "\\(f(x) = \\frac{1}{"+u6Quad(aQ,-aQ*SQ,aQ*PQ)+"}\\)",
    "\\(f(x) = "+u6Quad(aQ,-aQ*SQ,-aQ*PQ)+"\\)",
    "\\(f(x) = "+u6Quad(aQ+1,-(aQ+1)*SQ,(aQ+1)*PQ)+"\\)"
  ];
  var disQ=candDisQ.filter(function(s){ return s!==keyQ; }).slice(0,3);
  var qQ=mcq("The graph shows \\(y = \\frac{1}{f(x)}\\), where \\(f\\) is a quadratic function, with one point marked. Which function is \\(f\\)?",
    keyQ, disQ,
    "The vertical asymptotes of the reciprocal graph are the dashed lines at \\(x = "+r1q+"\\) and \\(x = "+r2q+"\\), so \\(f\\) has x-intercepts there and looks like \\(f(x) = a(x - ("+r1q+"))(x - ("+r2q+"))\\). The marked point on the reciprocal graph is \\("+u6Pt(mid2,recMid)+"\\), so at \\(x = "+mid2+"\\) the original function has value \\(\\frac{1}{"+recMidDisp+"} = "+fMid+"\\). Trying \\(a = "+aQ+"\\) gives \\("+aQ+"("+mid2+" - ("+r1q+"))("+mid2+" - ("+r2q+")) = "+fMid+"\\), which matches, so \\(f(x) = "+u6Quad(aQ,-aQ*SQ,aQ*PQ)+"\\)",
    {fam:fam, a:aQ, r1:r1q, r2:r2q});
  qQ.figure=u6Plot(fnQ, r1q-3, r2q+3, {y0:-3, y1:3, poles:[r1q,r2q], points:[[mid2,recMid]],
    labels:[{p:[mid2,recMid], t:u6Pt(mid2,recMid), dx:8, dy:14}]});
  return qQ;
});

/* ============ Prior knowledge tranche (Nov 15, 2026) ============ */
/* Borrowed verbatim from the feeder banks named in the source
   comments and the PKT table below, plus authored micro-items
   where the prior knowledge map names a skill no feeder entry
   assesses. Spec: Math-2200-PK-Tranche-Spec-2026-11-15.md. */

/* u6-pk-number-line-distance: authored micro-item (authored:number-line-distance),
   written for this tranche. */
E("u6-pk-number-line-distance",6,["1.7"],1,"gen",function(){
  var mode=ri(0,1),a,b;
  if(mode===0){ a=-ri(2,12); b=ri(1,12); }
  else { a=-(ri(1,9)+0.5); b=ri(1,9)+0.5; }
  var d=b-a, as=fmt(a), bs=fmt(b), ds=fmt(d);
  return numq("Two points are marked on a number line at \\("+as+"\\) and \\("+bs+"\\). What is the distance between the two points?",
    d,0.01,
    "Distance is always positive, so take the positive difference of the two positions: \\("+bs+" - ("+as+") = "+ds+"\\). The distance is <b>"+ds+"</b>.",
    {mode:mode,a:a,b:b,ans:d});
}, ["Distance is never negative.", "Subtract the smaller position from the larger one."]);

/* u6-pk-domain-range: borrowed verbatim from math-1201 entry u4-domain-range (math-1201:4.10). */
E("u6-pk-domain-range",6,["4.33"],1,"gen",function(){
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

/* u6-pk-graph-data: borrowed verbatim from math-1201 entry u4-graph-data (math-1201:4.9). */
E("u6-pk-graph-data",6,["4.2"],1,"gen",function(){
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

/* u6-pk-eval-function: borrowed verbatim from math-1201 entry u4-eval-function (math-1201:4.47). */
E("u6-pk-eval-function",6,["4.2"],1,"gen",function(){
  var fn=pick(["f","g","h"]);
  var m=pick([-4,-3,-2,-1,1,2,3,4,5]),b=ri(-9,10),x0=ri(-5,8);
  var ans=m*x0+b;
  return numq("A linear function is given by \\("+fn+"(x) = "+u4lin(m,b)+"\\). What is the value of \\("+fn+"("+x0+")\\)?",
    ans,0.011,
    "Substitute the given domain value into the function and simplify: \\[ \\begin{aligned} "+fn+"("+x0+") &= "+u4num(m)+"("+x0+") + ("+b+") \\\\ &= "+u4num(m*x0)+" + ("+b+") \\\\ &= "+ans+" \\end{aligned} \\] The value is <b>\\("+ans+"\\)</b>.",
    {fn:fn,m:m,b:b,x0:x0,ans:ans});
});

/* u6-pk-fn-notation: borrowed verbatim from math-1201 entry u4-fn-notation (math-1201:4.45). */
E("u6-pk-fn-notation",6,["4.33"],1,"gen",function(){
  var m=pick([-5,-4,-3,-2,-1,1,2,3,4,5]),b=ri(-15,16);
  var key="\\(f(x) = "+u4lin(m,b)+"\\)";
  var ds=u4pickS3(key,["\\(f(y) = "+u4lin(m,b)+"\\)","\\(f(x) = "+u4lin(m,-b)+"\\)","\\(f(x) = "+u4lin(-m,b)+"\\)","\\(f(x) = "+u4lin(b===0?m+1:b,m)+"\\)"]);
  if(b===0)ds=u4pickS3(key,["\\(f(y) = "+u4lin(m,b)+"\\)","\\(f(x) = "+u4lin(-m,b)+"\\)","\\(f(x) = "+u4lin(m+1,b)+"\\)"]);
  return mcq("Rewrite the equation \\(y = "+u4lin(m,b)+"\\) using function notation.",
    key,ds,
    "Function notation names the output \\(f(x)\\) in place of \\(y\\), and the rule on the right side stays unchanged: \\[ \\begin{aligned} y &= "+u4lin(m,b)+" \\\\ f(x) &= "+u4lin(m,b)+" \\end{aligned} \\] In function notation, the equation is <b>\\(f(x) = "+u4lin(m,b)+"\\)</b>.",
    {m:m,b:b,keyStr:key});
});

/* u6-pk-sort-numbers: borrowed verbatim from math-1201 entry u2-sort-numbers (math-1201:1.18). */
E("u6-pk-sort-numbers",6,["1.8"],1,"gen",function(){
  function ratItem(){
    var kind=ri(1,5);
    if(kind===1){var p=ri(1,15),q=pick([2,3,4,5,6,7,8,9]),tg=0;while(u2gcd(p,q)!==1&&tg<60){p=ri(1,15);q=pick([2,3,4,5,6,7,8,9]);tg++;}return {str:"\\("+FR(p,q)+"\\)",rat:true};}
    if(kind===2){return {str:""+pick([0.5,1.25,2.75,3.4,0.125,5.6,7.05,0.9]),rat:true};}
    if(kind===3){var r=ri(2,12);return {str:"\\(\\sqrt{"+(r*r)+"}\\)",rat:true};}
    if(kind===4){return {str:"\\(0.\\overline{"+ri(2,9)+"}\\)",rat:true};}
    var r5=ri(2,6);return {str:"\\(\\sqrt[3]{"+(r5*r5*r5)+"}\\)",rat:true};
  }
  function irrItem(){
    var kind=ri(1,4);
    if(kind===1){var n=ri(2,60);var t=0;while(u2isSq(n)&&t<100){n=ri(2,60);t++;}return {str:"\\(\\sqrt{"+n+"}\\)",rat:false};}
    if(kind===2){var n2=ri(2,80);var t2=0;while(u2isCu(n2)&&t2<100){n2=ri(2,80);t2++;}return {str:"\\(\\sqrt[3]{"+n2+"}\\)",rat:false};}
    if(kind===3){return {str:"\\(\\pi\\)",rat:false};}
    return {str:pick(["1.01001000100001...","2.12112111211112...","0.123456789101112...","3.23223222322223..."]),rat:false};
  }
  var mode=ri(1,3);
  if(mode===3){
    function rawOf(it){var s=it.str;if(s.slice(0,2)==="\\("&&s.slice(-2)==="\\)")return s.slice(2,-2);return s;}
    function fragSet(wantBad){
      var frags=[],seenF={},g=0;
      while(frags.length<3&&g<300){g++;
        var it=(wantBad&&frags.length===2)?irrItem():ratItem();
        var f=rawOf(it);
        if(seenF[f])continue;seenF[f]=1;frags.push(f);}
      return shuffle(frags);
    }
    function setStr(frags){return "\\(\\{"+frags.join(", ")+"\\}\\)";}
    var good=setStr(fragSet(false));
    var bads=[],guard=0;
    while(bads.length<3&&guard<200){guard++;var bs=setStr(fragSet(true));if(bs!==good&&bads.indexOf(bs)<0)bads.push(bs);}
    return mcq("Which set contains <b>only</b> rational numbers?",
      good,bads,
      "A rational number can be written as a ratio of integers, which includes fractions, terminating decimals, repeating decimals, and roots of perfect powers. Roots of numbers that are not perfect powers, \\(\\pi\\), and decimals that go on without repeating are irrational. Only one set avoids all of those. The set with only rational numbers is <b>"+good+"</b>.",
      {mode:mode,keyStr:good});
  }
  var wantIrr=(mode===1);
  var items=[],seen={};
  function addItem(it){if(!it||seen[it.str])return;seen[it.str]=1;items.push(it);}
  if(wantIrr){
    addItem(irrItem());
    var g1=0;while(items.length<4&&g1<300){g1++;addItem(ratItem());}
  }else{
    addItem(ratItem());
    var g2=0;while(items.length<4&&g2<300){g2++;addItem(irrItem());}
  }
  var target=items.filter(function(x){return x.rat===!wantIrr;})[0];
  var others=items.filter(function(x){return x!==target;}).map(function(x){return x.str;});
  return mcq(wantIrr?"Which number is <b>irrational</b>?":"Which number is <b>rational</b>?",
    target.str,others,
    "Rational numbers are exactly the numbers that can be written as a ratio of two integers: fractions, terminating or repeating decimals, and roots that come out whole. A root of a number that is not a perfect power, the number \\(\\pi\\), and a decimal that continues without repeating are irrational. The "+(wantIrr?"irrational":"rational")+" number in the list is <b>"+target.str+"</b>.",
    {mode:mode,items:items,keyStr:target.str});
});

/* u6-pk-approx: borrowed verbatim from math-1201 entry u2-approx (math-1201:1.20). */
E("u6-pk-approx",6,["1.8"],2,"gen",function(){
  var roll=Math.random();
  if(roll<0.6){
    var n=ri(2,600),t=0;while(u2isSq(n)&&t<200){n=ri(2,600);t++;}
    var lo=Math.floor(Math.sqrt(n)),ans=Math.round(Math.sqrt(n)*10)/10;
    var dLo=n-lo*lo,dHi=(lo+1)*(lo+1)-n;
    return numq("Give the approximate value of \\(\\sqrt{"+n+"}\\) to one decimal place.",
      ans,0.051,
      "Locate \\(\\sqrt{"+n+"}\\) between consecutive perfect squares: \\["+
      "\\begin{aligned} "+(lo*lo)+" &< "+n+" < "+((lo+1)*(lo+1))+" \\\\ "+lo+" &< \\sqrt{"+n+"} < "+(lo+1)+" \\end{aligned} \\]"+
      " Since \\("+n+"\\) is closer to \\("+(dLo<dHi?(lo*lo):((lo+1)*(lo+1)))+"\\), the root is closer to \\("+(dLo<dHi?lo:(lo+1))+"\\), and checking tenths gives \\(\\sqrt{"+n+"} \\approx "+ans+"\\). On a number line it sits between \\("+lo+"\\) and \\("+(lo+1)+"\\), nearer \\("+(dLo<dHi?lo:(lo+1))+"\\). The approximate value is <b>\\("+ans+"\\)</b>.",
      {mode:2,n:n,ans:ans});
  }
  if(roll<0.9){
    var n3=ri(2,600),t3=0;while(u2isCu(n3)&&t3<200){n3=ri(2,600);t3++;}
    var lo3=Math.floor(Math.cbrt(n3)),ans3=Math.round(Math.cbrt(n3)*10)/10;
    var dLo3=n3-lo3*lo3*lo3,dHi3=(lo3+1)*(lo3+1)*(lo3+1)-n3;
    return numq("Give the approximate value of \\(\\sqrt[3]{"+n3+"}\\) to one decimal place.",
      ans3,0.051,
      "Locate \\(\\sqrt[3]{"+n3+"}\\) between consecutive perfect cubes: \\["+
      "\\begin{aligned} "+(lo3*lo3*lo3)+" &< "+n3+" < "+((lo3+1)*(lo3+1)*(lo3+1))+" \\\\ "+lo3+" &< \\sqrt[3]{"+n3+"} < "+(lo3+1)+" \\end{aligned} \\]"+
      " Since \\("+n3+"\\) is closer to \\("+(dLo3<dHi3?(lo3*lo3*lo3):((lo3+1)*(lo3+1)*(lo3+1)))+"\\), the root is closer to \\("+(dLo3<dHi3?lo3:(lo3+1))+"\\), and checking tenths gives \\(\\sqrt[3]{"+n3+"} \\approx "+ans3+"\\). On a number line it sits between \\("+lo3+"\\) and \\("+(lo3+1)+"\\). The approximate value is <b>\\("+ans3+"\\)</b>.",
      {mode:3,n:n3,ans:ans3});
  }
  var k=ri(2,9),ansP=Math.round(k*Math.PI*100)/100;
  return numq("Give the approximate value of \\("+k+"\\pi\\) to two decimal places.",
    ansP,0.011,
    "Use \\(\\pi \\approx 3.14159\\): \\["+
    "\\begin{aligned} "+k+"\\pi &\\approx "+k+" \\times 3.14159 \\\\ &\\approx "+ansP+" \\end{aligned} \\]"+
    " The approximate value is <b>\\("+ansP+"\\)</b>.",
    {mode:1,k:k,ans:ansP});
});

/* u6-pk-reciprocal-values: authored micro-item (authored:reciprocal-of-a-value),
   written for this tranche. */
E("u6-pk-reciprocal-values",6,["4.33"],1,"gen",function(){
  var fr=function(p,q){return "\\(\\frac{"+p+"}{"+q+"}\\)";};
  var frI=function(p,q){return "\\frac{"+p+"}{"+q+"}";};
  var mode=ri(0,2);
  if(mode===0){
    var n=pick([-10,-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9,10]);
    var keyIn= n>0 ? frI(1,n) : "-"+frI(1,-n);
    var oppIn= n>0 ? "-"+frI(1,n) : frI(1,-n);
    return mcq("A function table gives \\(f(3) = "+n+"\\). What is \\(\\frac{1}{f(3)}\\)?",
      "\\("+keyIn+"\\)",
      ["\\("+n+"\\)","\\("+(-n)+"\\)","\\("+oppIn+"\\)"],
      "The reciprocal of a number flips it over and keeps its sign: \\(\\frac{1}{"+n+"} = "+keyIn+"\\). A small number has a large reciprocal, and a negative number has a negative reciprocal. The answer is <b>\\("+keyIn+"\\)</b>.",
      {mode:"integer",n:n});
  }
  if(mode===1){
    var k=pick([2,3,4,5,6,8,10]);
    return mcq("A function table gives \\(f(5) = "+frI(1,k)+"\\). What is \\(\\frac{1}{f(5)}\\)?",
      "\\("+k+"\\)",
      [fr(1,k),"\\("+(-k)+"\\)",fr(1,k*k)],
      "The reciprocal of \\("+frI(1,k)+"\\) flips it over: \\(\\frac{1}{1/"+k+"} = "+k+"\\). A number smaller than 1 has a reciprocal larger than 1. The answer is <b>\\("+k+"\\)</b>.",
      {mode:"unit-fraction",k:k});
  }
  var pair=pick([[2,3],[2,5],[3,4],[3,5],[4,5],[2,7],[3,7],[5,6],[5,8],[4,7]]);
  var p=pair[0],q=pair[1];
  return mcq("A function table gives \\(f(2) = -"+frI(p,q)+"\\). What is \\(\\frac{1}{f(2)}\\)?",
    "\\(-"+frI(q,p)+"\\)",
    [fr(q,p),"\\(-"+frI(p,q)+"\\)",fr(p,q)],
    "The reciprocal of \\(-"+frI(p,q)+"\\) flips the fraction over and keeps the negative sign: the reciprocal is \\(-"+frI(q,p)+"\\). The answer is <b>\\(-"+frI(q,p)+"\\)</b>.",
    {mode:"fraction",p:p,q:q});
}, ["The reciprocal flips the number over.", "The sign does not change when you take a reciprocal."]);

/* Bimodal build additions (Nov 19, 2026): two written-form Level 2 entries, an error-correction absolute value equation (4 marks) and an absolute value context problem (5 marks). SME-flagged for the specialist pass. */

/* u6-wcr-abs-error-correction: written form, 4 marks. A student keeps only
   one case of an absolute value equation; find the missing solution. */
E("u6-wcr-abs-error-correction",6,["4.7","4.6"],2,"gen",function(){
  var a=pick([2,4]);
  var r1=0,r2=0,att=0;
  do { r1=ri(-8,3); r2=r1+pick([4,6,8]); att++; } while(r2>8 && att<60);
  var c=a*(r2-r1)/2, b=-a*(r1+r2)/2;
  var arg=u6Lin(a,b);
  return numq("A student solves the equation \\("+u6AbsArg(a,b)+" = "+c+"\\). The student writes \\("+arg+" = "+c+"\\), solves to get \\(x = "+r2+"\\), and states that \\("+r2+"\\) is the only solution. The student's answer is incomplete. What is the other solution of the equation?",
    r1,0.01,
    "An absolute value equals \\("+c+"\\) when the expression inside the bars equals \\("+c+"\\) or \\(-"+c+"\\). The student used only the first case. The second case gives the missing solution: \\[ \\begin{aligned} "+arg+" &= -"+c+" \\\\ "+a+"x &= "+(-c-b)+" \\\\ x &= "+r1+" \\end{aligned} \\] Checking in the original equation gives \\(\\left|"+(a*r1+b)+"\\right| = "+c+"\\), so it works. The other solution is <b>\\("+r1+"\\)</b>.",
    {a:a,b:b,c:c,r1:r1,r2:r2});
});

/* u6-wcr-drone-height: written form, 5 marks. An absolute value model of a
   drone that climbs then descends; find the later of two times at a height. */
E("u6-wcr-drone-height",6,["4.5","4.4"],2,"gen",function(){
  var m=ri(6,10), delta=ri(2,5), a=ri(2,4);
  var Y=pick([50,60,70,80,90]);
  var P=Y+a*delta, t2=m+delta, t1=m-delta;
  return numq("A drone climbs at a constant rate, then descends at the same rate. Its height, in metres, \\(t\\) minutes after takeoff is modelled by \\(h(t) = "+P+" - "+a+"\\left|t - "+m+"\\right|\\). The drone passes a height of "+Y+" metres twice. What is the later of the two times, in minutes, at which the drone is at a height of "+Y+" metres?",
    t2,0.01,
    "Set the height equal to \\("+Y+"\\): \\[ \\begin{aligned} "+P+" - "+a+"\\left|t - "+m+"\\right| &= "+Y+" \\\\ -"+a+"\\left|t - "+m+"\\right| &= "+(Y-P)+" \\\\ \\left|t - "+m+"\\right| &= "+delta+" \\end{aligned} \\] The expression inside the bars equals \\("+delta+"\\) or \\(-"+delta+"\\), giving \\(t = "+t1+"\\) or \\(t = "+t2+"\\). The later of the two times is <b>"+t2+" minutes</b>.",
    {m:m,delta:delta,a:a,Y:Y,P:P,t1:t1,t2:t2});
});

/* PK tranche pass for Unit 6. pkFor is the cluster's dependent
   indicator list from the prior knowledge map, as registered
   for this unit in courses.js. */
var PKT_U6_FOR=["1.5","1.6","1.7","1.8","1.10","4.1","4.2","4.3","4.4","4.5","4.6","4.7","4.8","4.33","4.34","4.35","4.36"];
var PKT_U6={
 "u6-pk-number-line-distance":{src:"authored:number-line-distance",group:"number-line-distance"},
 "u6-pk-domain-range":{src:"math-1201:4.10",group:"domain-range"},
 "u6-pk-graph-data":{src:"math-1201:4.9",group:"graphing-data"},
 "u6-pk-eval-function":{src:"math-1201:4.47",group:"substitution"},
 "u6-pk-fn-notation":{src:"math-1201:4.45",group:"function-notation"},
 "u6-pk-sort-numbers":{src:"math-1201:1.18",group:"real-numbers"},
 "u6-pk-approx":{src:"math-1201:1.20",group:"real-numbers"},
 "u6-pk-reciprocal-values":{src:"authored:reciprocal-of-a-value",group:"reciprocal-values"}
};
BANK.forEach(function(e){var t=PKT_U6[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U6_FOR.slice();e.pkGroup=t.group;}});

/* ----- bank-u7.js ----- */
// Math 2200 Unit 7 Systems of Equations question bank
// CRMARKS: u7-classify-algebraic=2
// CRMARKS: u7-context-area=2
// CRMARKS: u7-context-projectile=3
// CRMARKS: u7-graph-count=1
// CRMARKS: u7-graph-solutions=2
// CRMARKS: u7-intersection-meaning=1
// CRMARKS: u7-model-two-numbers=3
// CRMARKS: u7-solve-linquad=2
// CRMARKS: u7-solve-quadquad=2
// CRMARKS: u7-tangent-param=4
// BIMODAL: u7-tangent-param=a
// BIMODAL: u7-solve-quadquad=a
// BIMODAL: u7-solve-linquad=a
// BIMODAL: u7-model-two-numbers=a
// BIMODAL: u7-context-projectile=a
// BIMODAL: u7-context-area=b
// BIMODAL: u7-classify-algebraic=a
/* ================= Unit 7: Systems of Equations ================= */
/* ================= Unit 7: Systems of Equations (MA2200.4.48 to 4.54) =================
   Tranche 2, final scope. All stems, contexts and values are original.
   Helpers are prefixed u7; entries register through E(...).
   11 entries: L1 2, L2 7, L3 2. Every system is built from chosen integer
   intersection points, so every solution is exact and hand-solvable.
   Codes: 4.48 meaning of intersection points; 4.49 number of solutions;
   4.50 solve graphically; 4.51 solve algebraically; 4.52 model a situation;
   4.53 relate the system to its context; 4.54 solve and explain strategy. */

/* ---------- u7 helpers ---------- */
function u7gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
function u7fr(n, d) { /* signed reduced fraction as a KaTeX body (no delimiters) */
  if (d < 0) { n = -n; d = -d; }
  if (n === 0) return "0";
  var g = u7gcd(n, d); n /= g; d /= g;
  var s = n < 0 ? "-" : ""; n = Math.abs(n);
  if (d === 1) return s + n;
  return s + "\\frac{" + n + "}{" + d + "}";
}
function u7Std(a, b, c) { /* ax^2 + bx + c as a KaTeX body */
  var s = (a === 1 ? "x^2" : a === -1 ? "-x^2" : a + "x^2");
  if (b !== 0) s += (b > 0 ? " + " : " - ") + (Math.abs(b) === 1 ? "x" : Math.abs(b) + "x");
  if (c !== 0) s += (c > 0 ? " + " : " - ") + Math.abs(c);
  return s;
}
function u7Lin(m, b) { /* mx + b as a KaTeX body */
  var s = "";
  if (m === 1) s = "x"; else if (m === -1) s = "-x"; else if (m !== 0) s = m + "x";
  if (b !== 0) { if (s === "") s = "" + b; else s += (b > 0 ? " + " + b : " - " + (-b)); }
  if (s === "") s = "0";
  return s;
}
function u7Pt(x, y) { return "(" + x + ", " + y + ")"; }
function u7PairStr(p1, p2) { return "\\(" + u7Pt(p1[0], p1[1]) + "\\) and \\(" + u7Pt(p2[0], p2[1]) + "\\)"; }
function u7Fac(v, vn) { /* (x - v) or (x + |v|) factor text */ return "(" + vn + (v < 0 ? " + " + (-v) : " - " + v) + ")"; }
function u7dist3(correct, cands) { /* first three candidate strings differing from the key and each other */
  var out = [];
  for (var i = 0; i < cands.length; i++) {
    var c = cands[i];
    if (c !== null && c !== undefined && c !== correct && out.indexOf(c) < 0) out.push(c);
    if (out.length === 3) break;
  }
  return out;
}
function u7Plot(f, g, pts, x0, x1) { /* two curves on fitted axes, intersection points marked */
  var W = 440, H = 250, pad = 26, i, x, y, mn = 1e18, mx = -1e18;
  for (i = 0; i <= 200; i++) { x = x0 + (x1 - x0) * i / 200; [f, g].forEach(function (fn) { y = fn(x); if (isFinite(y)) { if (y < mn) mn = y; if (y > mx) mx = y; } }); }
  pts.forEach(function (p) { if (p[1] < mn) mn = p[1]; if (p[1] > mx) mx = p[1]; });
  var y1 = Math.min(120, Math.max(10, Math.ceil(mx * 1.3))), y0 = Math.max(-120, Math.min(-10, Math.floor(mn * 1.3)));
  if (mn >= 0) y0 = -2; if (mx <= 0) y1 = 2;
  var X = function (v) { return pad + (v - x0) / (x1 - x0) * (W - 2 * pad); };
  var Y = function (v) { return H - pad - (v - y0) / (y1 - y0) * (H - 2 * pad); };
  var out = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:440px;background:#fff;border:1px solid #d8d2c4;border-radius:6px" xmlns="http://www.w3.org/2000/svg">';
  var gy = (y1 - y0 > 90) ? 20 : ((y1 - y0 > 45) ? 10 : ((y1 - y0 > 22) ? 5 : 2)), gx, gyv;
  for (gx = Math.ceil(x0); gx <= x1; gx += 1) { out += '<line x1="' + fmt(X(gx), 1) + '" y1="' + pad + '" x2="' + fmt(X(gx), 1) + '" y2="' + (H - pad) + '" stroke="#eae5d6" stroke-width="1"/>'; out += '<text x="' + fmt(X(gx), 1) + '" y="' + (H - 6) + '" font-size="9" fill="#5a5344" text-anchor="middle">' + gx + '</text>'; }
  for (gyv = Math.ceil(y0 / gy) * gy; gyv <= y1; gyv += gy) { out += '<line x1="' + pad + '" y1="' + fmt(Y(gyv), 1) + '" x2="' + (W - pad) + '" y2="' + fmt(Y(gyv), 1) + '" stroke="#eae5d6" stroke-width="1"/>'; if (gyv !== 0) out += '<text x="' + (pad - 4) + '" y="' + fmt(Y(gyv) + 3, 1) + '" font-size="9" fill="#5a5344" text-anchor="end">' + gyv + '</text>'; }
  if (y0 < 0 && y1 > 0) out += '<line x1="' + pad + '" y1="' + fmt(Y(0), 1) + '" x2="' + (W - pad) + '" y2="' + fmt(Y(0), 1) + '" stroke="#17352a" stroke-width="1.3"/>';
  if (x0 < 0 && x1 > 0) out += '<line x1="' + fmt(X(0), 1) + '" y1="' + pad + '" x2="' + fmt(X(0), 1) + '" y2="' + (H - pad) + '" stroke="#17352a" stroke-width="1.3"/>';
  out += '<text x="' + (W - pad - 2) + '" y="' + fmt(Y(0) - 6, 1) + '" font-size="12" fill="#17352a" text-anchor="end">x</text>';
  out += '<text x="' + fmt(X(0) + 6, 1) + '" y="' + (pad - 8) + '" font-size="12" fill="#17352a">y</text>';
  [ { fn: f, col: "#0f766e" }, { fn: g, col: "#b3541e" } ].forEach(function (cv) {
    var ptsArr = [], N = 160;
    for (i = 0; i <= N; i++) { x = x0 + (x1 - x0) * i / N; y = cv.fn(x); if (y < y0) y = y0; if (y > y1) y = y1; ptsArr.push(fmt(X(x), 1) + "," + fmt(Y(y), 1)); }
    out += '<polyline points="' + ptsArr.join(" ") + '" fill="none" stroke="' + cv.col + '" stroke-width="2.2"/>';
  });
  pts.forEach(function (p) { out += '<circle cx="' + fmt(X(p[0]), 1) + '" cy="' + fmt(Y(p[1]), 1) + '" r="4" fill="#17352a" stroke="#ffffff" stroke-width="1.4"/>'; });
  return out + '</svg>';
}
/* Builders: every system is assembled from chosen intersection points, so the
   coefficients are integers and the solutions are exact. quad is [a, b, c]. */
function u7makeLQ2() { /* linear-quadratic, two intersections */
  var a = pick([1, 1, -1]), r1 = ri(-6, 3), r2 = r1 + ri(2, 5);
  if (r2 > 6) r2 = 6;
  var m = ri(-3, 3), b = ri(-6, 6);
  var quad = [a, m - a * (r1 + r2), a * r1 * r2 + b];
  return { quad: quad, m: m, b: b, roots: [r1, r2], pts: [[r1, m * r1 + b], [r2, m * r2 + b]] };
}
function u7makeLQ1() { /* linear-quadratic, tangent (one intersection) */
  var a = pick([1, -1]), r = ri(-5, 5), m = ri(-3, 3), b = ri(-6, 6);
  var quad = [a, m - 2 * a * r, a * r * r + b];
  return { quad: quad, m: m, b: b, roots: [r, r], pts: [[r, m * r + b]] };
}
function u7makeLQ0() { /* linear-quadratic, no intersection: parabola offset from the line */
  var a = pick([1, -1]), h = ri(-3, 3), k = ri(2, 5), m = ri(-3, 3), b = ri(-6, 6);
  var quad = a === 1 ? [1, m - 2 * h, b + h * h + k] : [-1, m + 2 * h, b - h * h - k];
  return { quad: quad, m: m, b: b, roots: [], pts: [] };
}
function u7makeQQ2() { /* quadratic-quadratic, two intersections, moderate heights */
  for (var att = 0; att < 60; att++) {
    var a2 = pick([1, -1]), a1 = a2 + pick([1, -1, 2, -2]);
    if (a1 === 0) a1 = 2;
    var r1 = ri(-5, 2), r2 = r1 + ri(2, 5);
    if (r2 > 5) r2 = 5;
    var b2 = ri(-5, 5), c2 = ri(-7, 7), D = a1 - a2;
    var q2 = [a2, b2, c2], q1 = [a1, b2 - D * (r1 + r2), c2 + D * r1 * r2];
    var yA = q2[0] * r1 * r1 + q2[1] * r1 + q2[2], yB = q2[0] * r2 * r2 + q2[1] * r2 + q2[2];
    if (Math.abs(yA) <= 60 && Math.abs(yB) <= 60) return { q1: q1, q2: q2, roots: [r1, r2], pts: [[r1, yA], [r2, yB]] };
  }
  return { q1: [1, 0, 0], q2: [-1, 0, 8], roots: [-2, 2], pts: [[-2, 4], [2, 4]] };
}

function u7wrongPts(solves, yOn, roots, n) { /* points on one curve (via yOn) that are NOT solutions */
  var out = [], xs = [roots[0] - 1, roots[0] + 1, roots[1] - 1, roots[1] + 1, -roots[0], -roots[1], roots[0] + 2, roots[1] - 2, 0, 1, -1, 2, -2];
  for (var i = 0; i < xs.length && out.length < n; i++) {
    var p = [xs[i], yOn(xs[i])];
    if (!solves(p[0], p[1]) && Math.abs(p[0]) <= 9 && Math.abs(p[1]) <= 80 && !out.some(function (w) { return w[0] === p[0] && w[1] === p[1]; })) out.push(p);
  }
  return out;
}

/* ---------- 4.50, 4.48: read the solutions of a system from its graph (L2) ---------- */
E("u7-graph-solutions", 7, ["4.50", "4.48"], 1, "gen", function () {
  var S = u7makeLQ2(), q = S.quad;
  var f = function (x) { return q[0] * x * x + q[1] * x + q[2]; }, g = function (x) { return S.m * x + S.b; };
  function solves(x, y) { return f(x) === y && g(x) === y; }
  var W = u7wrongPts(solves, function (x) { return S.m * x + S.b; }, S.roots, 4);
  var key = u7PairStr(S.pts[0], S.pts[1]);
  var cands = [
    u7PairStr(S.pts[0], W[0]), u7PairStr(W[1], S.pts[1]), u7PairStr(W[0], W[1]),
    u7PairStr([S.pts[0][1], S.pts[0][0]], [S.pts[1][1], S.pts[1][0]]),
    u7PairStr([S.roots[0], -S.pts[0][1]], [S.roots[1], -S.pts[1][1]])
  ].filter(function (c) { return c !== key; });
  var qq = mcq("The graph shows the system \\(y = " + u7Std(q[0], q[1], q[2]) + "\\) and \\(y = " + u7Lin(S.m, S.b) + "\\). What are the solutions of the system?",
    key, u7dist3(key, cands),
    "The solutions of a system are the points that lie on both graphs: the intersection points. Reading the marked points from the graph, the curves meet at \\(" + u7Pt(S.pts[0][0], S.pts[0][1]) + "\\) and \\(" + u7Pt(S.pts[1][0], S.pts[1][1]) + "\\). Checking in the line: \\(" + S.m + "(" + S.roots[0] + ") + (" + S.b + ") = " + S.pts[0][1] + "\\) and \\(" + S.m + "(" + S.roots[1] + ") + (" + S.b + ") = " + S.pts[1][1] + "\\), and each point also satisfies the quadratic. The solutions are <b>" + key + "</b>.",
    { quad: q, m: S.m, b: S.b, pts: S.pts });
  qq.figure = u7Plot(f, g, S.pts, Math.max(-9, S.roots[0] - 3), Math.min(9, S.roots[1] + 3));
  return qq;
});

/* ---------- 4.49, 4.50: count the solutions from a graph (L1) ---------- */
E("u7-graph-count", 7, ["4.49", "4.50"], 1, "gen", function () {
  var mode = pick(["lq2", "lq1", "lq0", "qq2", "qq0"]);
  var f, g, pts = [], eqText, cnt, S, Q;
  if (mode === "lq2" || mode === "lq1" || mode === "lq0") {
    S = mode === "lq2" ? u7makeLQ2() : mode === "lq1" ? u7makeLQ1() : u7makeLQ0();
    f = function (x) { return S.quad[0] * x * x + S.quad[1] * x + S.quad[2]; };
    g = function (x) { return S.m * x + S.b; };
    pts = S.pts; cnt = mode === "lq2" ? 2 : mode === "lq1" ? 1 : 0;
    eqText = "\\(y = " + u7Std(S.quad[0], S.quad[1], S.quad[2]) + "\\) and \\(y = " + u7Lin(S.m, S.b) + "\\)";
  } else {
    Q = u7makeQQ2();
    if (mode === "qq0") { /* rebuild q1 so the difference of the parabolas is never zero */
      var sgn = Q.q2[0] > 0 ? 1 : -1, hh = ri(-3, 3), kk2 = ri(2, 5);
      Q.q1 = [Q.q2[0] + sgn, Q.q2[1] - sgn * 2 * hh, Q.q2[2] + sgn * (hh * hh + kk2)];
      pts = []; cnt = 0;
    }
    else { pts = Q.pts; cnt = 2; }
    f = function (x) { return Q.q1[0] * x * x + Q.q1[1] * x + Q.q1[2]; };
    g = function (x) { return Q.q2[0] * x * x + Q.q2[1] * x + Q.q2[2]; };
    eqText = "\\(y = " + u7Std(Q.q1[0], Q.q1[1], Q.q1[2]) + "\\) and \\(y = " + u7Std(Q.q2[0], Q.q2[1], Q.q2[2]) + "\\)";
  }
  var words = { 0: "No solutions", 1: "One solution", 2: "Two solutions" };
  var key = words[cnt];
  var dis = ["No solutions", "One solution", "Two solutions", "Infinitely many solutions"].filter(function (w) { return w !== key; });
  var why = cnt === 2 ? "The two graphs cross at two marked points, and each crossing point is one solution of the system."
    : cnt === 1 ? "The line just touches the parabola at one marked point, so that single point is the only solution of the system."
    : "The two graphs never meet, so no point can satisfy both equations at once.";
  var qq = mcq("The graph shows the system " + eqText + ". How many solutions does the system have?",
    key, dis,
    why + " The system has <b>" + key.toLowerCase() + "</b>.",
    { mode: mode, cnt: cnt, quad: S ? S.quad : Q.q1, quad2: S ? null : Q.q2, m: S ? S.m : null, b: S ? S.b : null });
  qq.figure = u7Plot(f, g, pts, -7, 7);
  return qq;
});

/* ---------- 4.48: what an intersection point means (L1) ---------- */
E("u7-intersection-meaning", 7, ["4.48"], 1, "gen", function () {
  var S = u7makeLQ2(), q = S.quad, P1 = S.pts[0], P2 = S.pts[1];
  var sysText = "The graphs of \\(y = " + u7Std(q[0], q[1], q[2]) + "\\) and \\(y = " + u7Lin(S.m, S.b) + "\\) intersect at \\(" + u7Pt(P1[0], P1[1]) + "\\) and \\(" + u7Pt(P2[0], P2[1]) + "\\). ";
  if (Math.random() < 0.5) {
    var key = "A pair of values that satisfies both equations together";
    var dis = ["The turning point of the parabola, where it changes direction",
      "The point where the two graphs cross the vertical axis",
      "The greatest value that either function can take"];
    return mcq(sysText + "What does an intersection point of the two graphs represent?",
      key, dis,
      "An intersection point lies on both graphs, so its coordinates make both equations true at the same time. It represents <b>a pair of values that satisfies both equations together</b>. It is not a vertex, a y-intercept, or an extreme value of either function on its own.",
      { tpl: 1, quad: q, m: S.m, b: S.b, pts: S.pts });
  }
  var r = P1[0], yv = P1[1];
  var xv = -q[1] / (2 * q[0]);
  var cands = [
    { t: "When \\(x = " + yv + "\\), both of the equations give the value \\(y = " + r + "\\)", ok: false },
    { t: "\\(x = " + r + "\\) is the only value that satisfies both equations", ok: false },
    { t: "The parabola has its vertex at the point \\(" + u7Pt(r, yv) + "\\)", ok: xv === r && q[0] * r * r + q[1] * r + q[2] === yv },
    { t: "Both graphs cross the horizontal axis at the point \\(" + u7Pt(r, yv) + "\\)", ok: yv === 0 }
  ,
    { t: "Substituting \\(x = " + P2[0] + "\\) gives two different values of \\(y\\)", ok: false },
    { t: "The point \\(" + u7Pt(r, yv) + "\\) lies on the parabola but not on the line", ok: false }];
  var dis2 = cands.filter(function (c) { return !c.ok; }).map(function (c) { return c.t; });
  var key2 = "At \\(x = " + r + "\\), the two equations have the same value, \\(y = " + yv + "\\)";
  return mcq(sysText + "What does the point \\(" + u7Pt(r, yv) + "\\) tell you?",
    key2, u7dist3(key2, dis2),
    "The point \\(" + u7Pt(r, yv) + "\\) lies on both graphs. Substituting \\(x = " + r + "\\) into the line gives \\(y = " + S.m + "(" + r + ") + (" + S.b + ") = " + yv + "\\), and into the quadratic gives the same value, so at \\(x = " + r + "\\) the two equations agree. The point tells you: <b>at \\(x = " + r + "\\), the two equations have the same value, \\(y = " + yv + "\\)</b>.",
    { tpl: 2, quad: q, m: S.m, b: S.b, pts: S.pts });
});

/* ---------- 4.51: solve a linear-quadratic system algebraically (L2) ---------- */
E("u7-solve-linquad", 7, ["4.51"], 2, "gen", function () {
  var S = u7makeLQ2(), q = S.quad;
  function solves(x, y) { return q[0] * x * x + q[1] * x + q[2] === y && S.m * x + S.b === y; }
  var W = u7wrongPts(solves, function (x) { return S.m * x + S.b; }, S.roots, 4);
  var key = u7PairStr(S.pts[0], S.pts[1]);
  var cands = [u7PairStr(S.pts[0], W[0]), u7PairStr(W[1], S.pts[1]), u7PairStr(W[0], W[1]),
    u7PairStr([S.pts[0][1], S.pts[0][0]], [S.pts[1][1], S.pts[1][0]])];
  var dA = q[0], dB = q[1] - S.m, dC = q[2] - S.b;
  var diff = u7Std(dA, dB, dC);
  var sol = "Both equations give \\(y\\), so set them equal and solve: \\[ \\begin{aligned} " + u7Std(q[0], q[1], q[2]) + " &= " + u7Lin(S.m, S.b) + " \\\\ " + diff + " &= 0 \\\\ " + (dA < 0 ? "-" : "") + u7Fac(S.roots[0], "x") + u7Fac(S.roots[1], "x") + " &= 0 \\end{aligned} \\] So \\(x = " + S.roots[0] + "\\) or \\(x = " + S.roots[1] + "\\). Substituting into the line, \\(y = " + S.m + "(" + S.roots[0] + ") + (" + S.b + ") = " + S.pts[0][1] + "\\) and \\(y = " + S.m + "(" + S.roots[1] + ") + (" + S.b + ") = " + S.pts[1][1] + "\\). Each point checks in the quadratic as well. The solutions are <b>" + key + "</b>.";
  return mcq("Solve the system \\(y = " + u7Std(q[0], q[1], q[2]) + "\\) and \\(y = " + u7Lin(S.m, S.b) + "\\) algebraically.",
    key, u7dist3(key, cands), sol,
    { quad: q, m: S.m, b: S.b, pts: S.pts });
});

/* ---------- 4.51: solve a quadratic-quadratic system algebraically (L2) ---------- */
E("u7-solve-quadquad", 7, ["4.51"], 2, "gen", function () {
  var S = u7makeQQ2(), q1 = S.q1, q2 = S.q2;
  function yAt(q, x) { return q[0] * x * x + q[1] * x + q[2]; }
  function solves(x, y) { return yAt(q1, x) === y && yAt(q2, x) === y; }
  var W = u7wrongPts(solves, function (x) { return yAt(q2, x); }, S.roots, 4);
  var key = u7PairStr(S.pts[0], S.pts[1]);
  var cands = [u7PairStr(S.pts[0], W[0]), u7PairStr(W[1], S.pts[1]), u7PairStr(W[0], W[1]),
    u7PairStr([S.pts[0][1], S.pts[0][0]], [S.pts[1][1], S.pts[1][0]])];
  var dA = q1[0] - q2[0], dB = q1[1] - q2[1], dC = q1[2] - q2[2];
  var sol = "Set the two expressions for \\(y\\) equal and collect terms: \\[ \\begin{aligned} " + u7Std(q1[0], q1[1], q1[2]) + " &= " + u7Std(q2[0], q2[1], q2[2]) + " \\\\ " + u7Std(dA, dB, dC) + " &= 0 \\end{aligned} \\] Factoring, the equation gives \\(x = " + S.roots[0] + "\\) or \\(x = " + S.roots[1] + "\\). Substituting into the second quadratic, \\(y = " + yAt(q2, S.roots[0]) + "\\) when \\(x = " + S.roots[0] + "\\) and \\(y = " + yAt(q2, S.roots[1]) + "\\) when \\(x = " + S.roots[1] + "\\); both points also check in the first quadratic. The solutions are <b>" + key + "</b>.";
  return mcq("Solve the system \\(y = " + u7Std(q1[0], q1[1], q1[2]) + "\\) and \\(y = " + u7Std(q2[0], q2[1], q2[2]) + "\\) algebraically.",
    key, u7dist3(key, cands), sol,
    { q1: q1, q2: q2, pts: S.pts });
});

/* ---------- 4.49, 4.51: classify the number of solutions algebraically (L2) ---------- */
E("u7-classify-algebraic", 7, ["4.49", "4.51"], 2, "gen", function () {
  var mode = pick(["lq2", "lq1", "lq0", "qq2", "qqSameA", "qqIdentical"]);
  var eqText, cnt, dA, dB, dC, note, P;
  if (mode === "lq2" || mode === "lq1" || mode === "lq0") {
    var S = mode === "lq2" ? u7makeLQ2() : mode === "lq1" ? u7makeLQ1() : u7makeLQ0();
    eqText = "\\(y = " + u7Std(S.quad[0], S.quad[1], S.quad[2]) + "\\) and \\(y = " + u7Lin(S.m, S.b) + "\\)";
    dA = S.quad[0]; dB = S.quad[1] - S.m; dC = S.quad[2] - S.b;
    cnt = mode === "lq2" ? 2 : mode === "lq1" ? 1 : 0;
    P = { dA: dA, dB: dB, dC: dC, identical: false };
    note = "Setting the expressions equal gives the single quadratic \\(" + u7Std(dA, dB, dC) + " = 0\\).";
  } else if (mode === "qqIdentical") {
    var hp = ri(-4, 4), kq = ri(-5, 6);
    var B = -2 * hp, C = hp * hp + kq;
    eqText = "\\(y = (x " + (hp > 0 ? "- " + hp : hp < 0 ? "+ " + (-hp) : "") + ")^2 " + (kq > 0 ? "+ " + kq : kq < 0 ? "- " + (-kq) : "") + "\\) and \\(y = " + u7Std(1, B, C) + "\\)";
    cnt = -1; dA = 0; dB = 0; dC = 0;
    P = { dA: 0, dB: 0, dC: 0, identical: true };
    note = "Expanding the vertex form gives \\(y = " + u7Std(1, B, C) + "\\), which is exactly the second equation.";
  } else {
    var Q = u7makeQQ2();
    if (mode === "qqSameA") { /* force equal leading coefficients: difference is linear */
      Q.q1 = [Q.q2[0], Q.q1[1], Q.q1[2]];
      if (Q.q1[1] === Q.q2[1]) Q.q1[1] += 2;
      cnt = 1;
    } else cnt = 2;
    eqText = "\\(y = " + u7Std(Q.q1[0], Q.q1[1], Q.q1[2]) + "\\) and \\(y = " + u7Std(Q.q2[0], Q.q2[1], Q.q2[2]) + "\\)";
    dA = Q.q1[0] - Q.q2[0]; dB = Q.q1[1] - Q.q2[1]; dC = Q.q1[2] - Q.q2[2];
    P = { dA: dA, dB: dB, dC: dC, identical: false };
    note = "Setting the expressions equal and collecting terms gives \\(" + u7Std(dA, dB, dC) + " = 0\\)" + (dA === 0 ? ", a linear equation" : "") + ".";
  }
  var words = { "-1": "Infinitely many real solutions", "0": "No real solutions", "1": "One real solution", "2": "Two real solutions" };
  var key = words[cnt];
  var dis = ["No real solutions", "One real solution", "Two real solutions", "Infinitely many real solutions"].filter(function (w) { return w !== key; });
  var disc = dB * dB - 4 * dA * dC;
  var why = cnt === -1 ? note + " The two equations describe the same parabola, so every point on it is a solution."
    : cnt === 1 && dA === 0 ? note + " A linear equation has exactly one solution, so the parabolas meet at exactly one point."
    : cnt === 1 ? note + " Its discriminant is \\(" + dB + "^2 - 4(" + dA + ")(" + dC + ") = " + disc + "\\). A discriminant of zero means the equation has one repeated root, so the graphs touch at one point."
    : cnt === 0 ? note + " Its discriminant is \\(" + dB + "^2 - 4(" + dA + ")(" + dC + ") = " + disc + " < 0\\). A negative discriminant means the equation has no real roots, so the graphs never meet."
    : note + " Its discriminant is \\(" + dB + "^2 - 4(" + dA + ")(" + dC + ") = " + disc + " > 0\\). A positive discriminant means two distinct real roots, so the graphs meet at two points.";
  return mcq("Consider the system " + eqText + ". Without graphing, determine how many real solutions the system has.",
    key, dis, why + " The system has <b>" + key.toLowerCase() + "</b>.",
    P);
});

/* ---------- 4.52: model and solve a two-number problem (L2) ---------- */
E("u7-model-two-numbers", 7, ["4.52"], 2, "gen", function () {
  var mode = pick(["diffSq", "sumSq", "sqLin"]);
  var p = ri(4, 15), q = ri(2, p - 1);
  var S = p + q, keyNums = [p, q], stem, sysText, work;
  function pairT(a, b) { return a + " and " + b; }
  var key = pairT(p, q), cands = [];
  if (mode === "diffSq") {
    var D = p * p - q * q;
    stem = "The sum of two positive numbers is " + S + ", and the difference of their squares is " + D + ". What are the two numbers?";
    sysText = "\\(x + y = " + S + "\\) and \\(x^2 - y^2 = " + D + "\\)";
    work = "Modelling with \\(x\\) and \\(y\\) gives the system " + sysText + ". Since \\(x^2 - y^2 = (x - y)(x + y)\\), substituting the sum gives \\((x - y)(" + S + ") = " + D + "\\), so \\(x - y = " + (p - q) + "\\). Solving \\(x + y = " + S + "\\) together with \\(x - y = " + (p - q) + "\\) gives \\(x = " + p + "\\) and \\(y = " + q + "\\). Check: \\(" + p + "^2 - " + q + "^2 = " + (p * p) + " - " + (q * q) + " = " + D + "\\).";
    cands = [pairT(p + 1, q - 1), pairT(p, -q), pairT(p - q, q), pairT(p + 2, q - 2)];
  } else if (mode === "sumSq") {
    var Q = p * p + q * q;
    stem = "The sum of two positive numbers is " + S + ", and the sum of their squares is " + Q + ". What are the two numbers?";
    sysText = "\\(x + y = " + S + "\\) and \\(x^2 + y^2 = " + Q + "\\)";
    work = "Modelling with \\(x\\) and \\(y\\) gives the system " + sysText + ". From the first equation, \\(y = " + S + " - x\\); substituting into the second and simplifying gives \\(x^2 - " + S + "x + " + (p * q) + " = 0\\), which factors as \\((x - " + p + ")(x - " + q + ") = 0\\). So the numbers are \\(" + p + "\\) and \\(" + q + "\\). Check: \\(" + p + "^2 + " + q + "^2 = " + (p * p) + " + " + (q * q) + " = " + Q + "\\).";
    cands = [pairT(p + 1, q - 1), pairT(p, -q), pairT(p - q, q), pairT(q + 1, p - 1)];
  } else {
    var T = p * p + q;
    stem = "The sum of two positive numbers is " + S + ". The square of the larger number, added to the smaller number, gives " + T + ". What are the two numbers?";
    sysText = "\\(x + y = " + S + "\\) and \\(x^2 + y = " + T + "\\)";
    work = "Modelling with \\(x\\) the larger and \\(y\\) the smaller number gives the system " + sysText + ". Substituting \\(y = " + S + " - x\\) into the second equation gives \\(x^2 - x + " + (S - T) + " = 0\\), which factors as \\((x - " + p + ")(x + " + (p - 1) + ") = 0\\). The positive root is \\(x = " + p + "\\), so \\(y = " + S + " - " + p + " = " + q + "\\). Check: \\(" + p + "^2 + " + q + " = " + T + "\\).";
    cands = [pairT(p - 1, q + 1), pairT(p, -q), pairT(q, p - q), pairT(p + 1, q - 1)];
  }
  /* keep only distractors that fail at least one stated condition */
  function conds(a, b) {
    if (a + b !== S) return false;
    if (mode === "diffSq") return a * a - b * b === D;
    if (mode === "sumSq") return a * a + b * b === Q;
    return a * a + b === T;
  }
  var dis = [];
  cands.forEach(function (c) {
    var parts = c.split(" and ").map(Number);
    if (!conds(parts[0], parts[1]) && c !== key && dis.indexOf(c) < 0) dis.push(c);
  });
  var extra = 3;
  while (dis.length < 3) { var cc = pairT(p + extra, q - extra); var pp = cc.split(" and ").map(Number); if (!conds(pp[0], pp[1]) && cc !== key && dis.indexOf(cc) < 0) dis.push(cc); extra++; }
  return mcq(stem, key, dis.slice(0, 3), work + " The two numbers are <b>" + key + "</b>.",
    { mode: mode, p: p, q: q, S: S, D: mode === "diffSq" ? D : mode === "sumSq" ? Q : T });
});

/* ---------- 4.52, 4.54: when are a thrown ball and a rising drone level? (L2) ---------- */
E("u7-context-projectile", 7, ["4.52", "4.54"], 2, "gen", function () {
  var ctxs = [
    { name: "drone", mover: "a drone that takes off from a tall mast and climbs at a steady rate", verb: "climbs" },
    { name: "balloon", mover: "a weather balloon released from a hilltop station that rises at a steady rate", verb: "rises" }
  ];
  var ctx = pick(ctxs);
  var t1 = ri(1, 2), t2 = t1 + ri(1, 2); if (t2 > 3) t2 = 3; if (t2 === t1) t2 = t1 + 1;
  var m = ri(2, 5), h0 = ri(2, 9);
  var c = 5 * t1 * t2 + h0;
  var B = m + 5 * (t1 + t2);
  var hB = function (t) { return -5 * t * t + B * t + h0; }, hL = function (t) { return m * t + c; };
  var key = "t = " + t1 + " s and t = " + t2 + " s";
  var tv = (t1 + t2) / 2;
  var cands = ["t = " + t2 + " s and t = " + (t2 + t1) + " s",
    "t = " + (t2 - t1) + " s and t = " + t2 + " s",
    "t = " + t1 + " s and t = " + (t1 + t2) + " s",
    "t = " + t2 + " s only"];
  var sol = "Model the ball's height by \\(h = -5t^2 + " + B + "t + " + h0 + "\\) and the height of the other object by \\(h = " + m + "t + " + c + "\\). The strategy is to set the heights equal, since the objects are level exactly when the system has a solution: \\[ \\begin{aligned} -5t^2 + " + B + "t + " + h0 + " &= " + m + "t + " + c + " \\\\ -5t^2 + " + (B - m) + "t - " + (c - h0) + " &= 0 \\\\ t^2 - " + (t1 + t2) + "t + " + (t1 * t2) + " &= 0 \\\\ (t - " + t1 + ")(t - " + t2 + ") &= 0 \\end{aligned} \\] So \\(t = " + t1 + "\\) or \\(t = " + t2 + "\\). Both times come after the throw and the shared height is positive (at \\(t = " + t1 + "\\), both are at " + hL(t1) + " m), so both count. The objects are level at <b>" + key + "</b>.";
  var stem = "A ball is thrown upward from a platform " + h0 + " m above the ground. Its height, in metres, after t seconds is given by \\(h = -5t^2 + " + B + "t + " + h0 + "\\). At the same moment, " + ctx.mover + "; its height is given by \\(h = " + m + "t + " + c + "\\). At what times are the ball and the other object at the same height?";
  return mcq(stem, key, u7dist3(key, cands), sol,
    { ctx: ctx.name, t1: t1, t2: t2, m: m, h0: h0, c: c, B: B });
});

/* ---------- 4.52, 4.53: perimeter and area give the dimensions (L2) ---------- */
E("u7-context-area", 7, ["4.52", "4.53"], 2, "gen", function () {
  var ctxs = [
    { name: "garden", what: "rectangular garden plot", thing: "The plot" },
    { name: "patio", what: "rectangular patio", thing: "The patio" },
    { name: "pen", what: "rectangular dog pen", thing: "The pen" },
    { name: "bed", what: "rectangular vegetable bed", thing: "The bed" }
  ];
  var ctx = pick(ctxs);
  var w = ri(3, 14), l = w + ri(1, 8);
  var P = 2 * (l + w), A = l * w;
  var key = "Length " + l + " m, width " + w + " m";
  function dimT(a, b) { return "Length " + a + " m, width " + b + " m"; }
  function fits(a, b) { return 2 * (a + b) === P && a * b === A; }
  var raw = [[l + 1, w - 1], [l + 2, w + 1], [l - 1, w + 1], [l + 3, w - 1], [w + 1, l - w + 1], [l + 1, w + 2], [l + 4, w - 2], [l - 2, w + 3]];
  var dis = [];
  raw.forEach(function (pr) { var t = dimT(pr[0], pr[1]); if (pr[0] > 0 && pr[1] > 0 && !fits(pr[0], pr[1]) && t !== key && dis.indexOf(t) < 0) dis.push(t); });
  var sol = "Let the length be \\(l\\) metres and the width be \\(w\\) metres. The perimeter and area give the system \\(2l + 2w = " + P + "\\) and \\(lw = " + A + "\\), a linear-quadratic system. From the first equation, \\(l = " + (P / 2) + " - w\\); substituting into the second gives \\[ \\begin{aligned} w(" + (P / 2) + " - w) &= " + A + " \\\\ w^2 - " + (P / 2) + "w + " + A + " &= 0 \\\\ (w - " + w + ")(w - " + l + ") &= 0 \\end{aligned} \\] So \\(w = " + w + "\\) (the width is the smaller measure) and \\(l = " + (P / 2) + " - " + w + " = " + l + "\\). In context: the dimensions multiply to " + A + " m² and add, doubled, to the " + P + " m of fencing. The dimensions are <b>" + key.toLowerCase() + "</b>.";
  return mcq("A " + ctx.what + " has a perimeter of " + P + " m and an area of " + A + " m². What are the dimensions of the " + ctx.what.split(" ").pop() + "?",
    key, dis.slice(0, 3), sol,
    { ctx: ctx.name, l: l, w: w, P: P, A: A });
});

/* ---------- 4.53, 4.54: one algebraic solution must be rejected in context (L3) ---------- */
E("u7-inadmissible-root", 7, ["4.53", "4.54"], 3, "gen", function () {
  if (Math.random() < 0.5) {
    var k = ri(1, 6), w = ri(3, 12), l = w + k, A = l * w;
    var key = "Length " + l + " m and width " + w + " m; the pair with negative measures is impossible";
    var dis = ["Length " + l + " m and width " + w + " m; both solution pairs describe possible gardens",
      "Length " + w + " m and width " + l + " m; the length is the smaller of the two measures",
      "Length " + (w + 2 * k) + " m and width " + (w + k) + " m; these come from solving directly"];
    var sol = "Let the width be \\(w\\) metres; then the length is \\(w + " + k + "\\) metres, and the area gives \\[ \\begin{aligned} w(w + " + k + ") &= " + A + " \\\\ w^2 + " + k + "w - " + A + " &= 0 \\\\ (w - " + w + ")(w + " + l + ") &= 0 \\end{aligned} \\] So \\(w = " + w + "\\) or \\(w = " + (-l) + "\\). The strategy is not finished at the algebra: a width of " + (-l) + " m, with its matching negative length, cannot describe a real garden, so that solution of the system is rejected in context. The garden measures <b>" + l + " m by " + w + " m</b>.";
    return mcq("The length of a rectangular garden is " + k + " m more than its width, and its area is " + A + " m². Which statement correctly gives the dimensions of the garden?",
      key, dis, sol,
      { mode: "rect", k: k, w: w, l: l, A: A });
  }
  var t1 = pick([-2, -1]), t2 = ri(3, 5), H = ri(6, 20);
  var vv = 5 * (t1 + t2), cc = H - 5 * t1 * t2;
  var key2 = "t = " + t2 + " s; the solution t = " + t1 + " s falls before the launch";
  var dis2 = ["Both t = " + t1 + " s and t = " + t2 + " s; each one solves the system",
    "t = " + t1 + " s; it is the first solution the algebra produces",
    "t = " + fmt((t1 + t2) / 2, 1) + " s; that is when the ball is at its greatest height"];
  var sol2 = "Setting the height equal to the beam height gives the system solution: \\[ \\begin{aligned} -5t^2 + " + vv + "t + " + cc + " &= " + H + " \\\\ -5t^2 + " + vv + "t + " + (cc - H) + " &= 0 \\\\ t^2 - " + (t1 + t2) + "t " + (t1 * t2 < 0 ? "- " + (-t1 * t2) : "+ " + (t1 * t2)) + " &= 0 \\\\ " + u7Fac(t1, "t") + u7Fac(t2, "t") + " &= 0 \\end{aligned} \\] So \\(t = " + t1 + "\\) or \\(t = " + t2 + "\\). Both values solve the system algebraically, but time in this problem is measured from the launch, so \\(t = " + t1 + "\\) s describes a moment before the ball existed in flight and is rejected. The ball reaches the beam height, on its way down, at <b>t = " + t2 + " s</b>.";
  return mcq("A ball is launched from a platform. Its height, in metres, after t seconds is \\(h = -5t^2 + " + vv + "t + " + cc + "\\). A sensor beam crosses the flight path at a height of " + H + " m. Which statement correctly gives when the ball passes the beam on its way down?",
    key2, dis2, sol2,
    { mode: "time", t1: t1, t2: t2, H: H, v: vv, c: cc });
});

/* ---------- 4.49, 4.51: the parameter that makes a system tangent (L3) ---------- */
E("u7-tangent-param", 7, ["4.49", "4.51"], 3, "gen", function () {
  var P = ri(-4, 4), M = ri(-3, 3);
  while ((P - M) % 2 !== 0) { M = ri(-3, 3); }
  var Q = ri(-6, 6), dm = P - M;
  var kk = Q - dm * dm / 4;
  var key = "" + kk;
  var cands = ["" + (Q + dm * dm / 4), "" + (Q - dm * dm / 2), "" + (kk + 2), "" + (kk - 3), "" + (Q + dm * dm / 2), "" + (kk + 1), "" + (kk - 1), "" + (kk + 4), "" + (Q + 2), "" + (Q - 2)];
  var sol = "Setting the expressions equal and collecting terms gives \\(" + u7Std(1, dm, 0) + " + (" + Q + " - k) = 0\\). Exactly one solution means the graphs touch, so this quadratic must have a repeated root: its discriminant is zero. \\[ \\begin{aligned} " + dm + "^2 - 4(1)(" + Q + " - k) &= 0 \\\\ " + (dm * dm) + " - (" + (4 * Q) + ") + 4k &= 0 \\\\ 4k &= " + (4 * Q - dm * dm) + " \\\\ k &= " + kk + " \\end{aligned} \\] With \\(k = " + kk + "\\), the system has exactly one solution. The value is <b>" + kk + "</b>.";
  var lineStr = M === 0 ? "k" : u7Lin(M, 0) + " + k";
  return mcq("The system \\(y = " + u7Std(1, P, Q) + "\\) and \\(y = " + lineStr + "\\) has exactly one solution. What is the value of \\(k\\)?",
    key, u7dist3(key, cands), sol,
    { P: P, M: M, Q: Q, k: kk });
});

/* ============ Prior knowledge tranche (Nov 15, 2026) ============ */
/* Borrowed verbatim from the feeder banks named in the source
   comments and the PKT table below, plus authored micro-items
   where the prior knowledge map names a skill no feeder entry
   assesses. Spec: Math-2200-PK-Tranche-Spec-2026-11-15.md. */

/* u7-pk-relate: borrowed verbatim from math-1201 entry u6-relate (math-1201:4.51). */
E("u7-pk-relate",7,["4.48"],1,"var",varset([
  function(){var key="It says that the total number of muffins and scones bought adds up to 18 items in total";
    return mcq("Leah buys muffins and scones at a bakery. Let \\(x\\) be the number of muffins and \\(y\\) be the number of scones. One equation in the system for her purchase is \\(x + y = 18\\). What does this equation represent?",
    key,
    ["It says that the total cost of the muffins and scones bought comes to 18 dollars in all",
     "It says that the number of muffins bought is 18 more than the number of scones she bought",
     "It says that one muffin and one scone bought together cost a combined 18 dollars in all"],
    "The variables \\(x\\) and \\(y\\) count items, not dollars, so their sum counts items. The equation \\(x + y = 18\\) adds the number of muffins and the number of scones, so <b>it says that the total number of muffins and scones bought adds up to 18 items in total</b>.",
    {stmt:true,keyText:key});},
  function(){var key="It is the total cost, in dollars, of all the cars that used the parking lot that day";
    return mcq("A parking lot charges 20 dollars per car and 35 dollars per truck. Let \\(x\\) be the number of cars and \\(y\\) be the number of trucks that used the lot one day, with \\(x + y = 40\\) and \\(20x + 35y = 950\\). In the second equation, what does the term \\(20x\\) represent?",
    key,
    ["It is the total number of cars that used the parking lot on that particular busy day",
     "It is the cost, in dollars, of parking one single car in the lot for one full day there",
     "It is the total cost, in dollars, of all the trucks that used the lot that day instead"],
    "The term \\(20x\\) multiplies the price for one car, \\(20\\) dollars, by the number of cars, \\(x\\). A price times a count gives a total cost, so <b>it is the total cost, in dollars, of all the cars that used the parking lot that day</b>.",
    {stmt:true,keyText:key});},
  function(){var key="It says the total amount spent on smoothies and salads together is exactly 84 dollars";
    return mcq("At a juice stand, a smoothie costs 6 dollars and a salad costs 9 dollars. Let \\(x\\) be the number of smoothies and \\(y\\) be the number of salads in one order. One equation for the order is \\(6x + 9y = 84\\). What does this equation represent?",
    key,
    ["It says the total number of smoothies and salads in the order together is 84 items",
     "It says one smoothie and one salad in the order together cost a combined 84 dollars",
     "It says the number of smoothies in the order is 84 more than the number of salads in it"],
    "Each term multiplies a price by a count: \\(6x\\) is the cost of the smoothies and \\(9y\\) is the cost of the salads. Their sum is a total cost, so <b>it says the total amount spent on smoothies and salads together is exactly 84 dollars</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The number of junior skaters at the session";
    return mcq("A skating rink records attendance at a session. Let \\(x\\) be the number of adult skaters and \\(y\\) be the number of junior skaters, with \\(x + y = 52\\) and \\(12x + 7y = 469\\). What does the variable \\(y\\) represent in this system?",
    key,
    ["The number of adult skaters at the session",
     "The total admission money collected at the session",
     "The admission price charged to one junior skater"],
    "The first equation, \\(x + y = 52\\), adds two counts of people to get the total attendance, so each variable counts one group of skaters. Since \\(x\\) counts the adult skaters, \\(y\\) is <b>the number of junior skaters at the session</b>.",
    {keyText:key});}
]));

/* u7-pk-intersection: borrowed verbatim from math-1201 entry u6-intersection (math-1201:4.52). */
E("u7-pk-intersection",7,["4.48"],1,"var",varset([
  function(){var key="When 18 posters are printed, both plans charge the same total cost, which is 126 dollars";
    return mcq("Two printing plans are graphed with cost in dollars against the number of posters printed. The graphs cross at the point \\((18, 126)\\). What does this point mean for the two plans?",
    key,
    ["When 126 posters are printed, both plans charge the same total cost, which is 18 dollars",
     "After 18 posters are printed, one of the plans stops charging and the work becomes free",
     "When 18 posters are printed, the two plans together charge a combined cost of 126 dollars"],
    "On the graph, the first coordinate counts posters and the second coordinate gives cost in dollars. Where the graphs cross, both plans give the same cost for the same number of posters. So the point means: <b>when 18 posters are printed, both plans charge the same total cost, which is 126 dollars</b>.",
    {stmt:true,keyText:key});},
  function(){var key="After 3 hours of riding, both cyclists are the same distance of 24 km from the start line";
    return mcq("Two cyclists leave the same start line, and each rider has a graph of distance from the start against time. The graphs cross at the point \\((3, 24)\\). What does this point mean for the two cyclists?",
    key,
    ["After 24 hours of riding, both cyclists are the same distance of 3 km from the start line",
     "After 3 hours of riding, the two cyclists have covered 24 km when their distances are added",
     "After 3 hours of riding, one cyclist stops for a rest and the other rider carries on alone"],
    "The first coordinate is the time in hours and the second is the distance from the start in kilometres. At a crossing point, both graphs share the same time and the same distance. So the point means: <b>after 3 hours of riding, both cyclists are the same distance of 24 km from the start line</b>.",
    {stmt:true,keyText:key});},
  function(){var key="After 5 minutes of filling, both tanks hold the same amount of water, which is 40 litres";
    return mcq("Two water tanks are being filled, and each tank has a graph of the volume of water against time. The graphs cross at the point \\((5, 40)\\). What does this point mean for the two tanks?",
    key,
    ["After 40 minutes of filling, both tanks hold the same amount of water, which is 5 litres",
     "After 5 minutes of filling, the two tanks together hold a combined amount of 40 litres",
     "After 5 minutes of filling, one tank is completely full and the other tank is fully empty"],
    "The first coordinate is the time in minutes and the second is the volume in litres. Where the graphs cross, the two tanks are measured at the same time and hold the same volume. So the point means: <b>after 5 minutes of filling, both tanks hold the same amount of water, which is 40 litres</b>.",
    {stmt:true,keyText:key});},
  function(){var key="After 2 hours of hiking, both hikers stand at the same height of 150 m above the valley";
    return mcq("Two hikers climb from the same valley, and each hiker has a graph of height above the valley against time. The graphs cross at the point \\((2, 150)\\). What does this point mean for the two hikers?",
    key,
    ["After 150 hours of hiking, both hikers stand at the same height of 2 m above the valley",
     "After 2 hours of hiking, the two hikers have heights that add together to give 150 m",
     "After 2 hours of hiking, one hiker reaches the summit and the other turns back to camp"],
    "The first coordinate is the time in hours and the second is the height in metres. At a crossing point, both hikers share the same time and the same height. So the point means: <b>after 2 hours of hiking, both hikers stand at the same height of 150 m above the valley</b>.",
    {stmt:true,keyText:key});}
]));

/* u7-pk-solve-graph: borrowed verbatim from math-1201 entry u6-solve-graph (math-1201:4.53). */
E("u7-pk-solve-graph",7,["4.50"],2,"gen",function(){
  var X=ri(-4,8),Y=ri(-3,11);
  var slopes=[-3,-2,-1,1,2,3];
  var m1=pick(slopes),m2=pick(slopes),t=0;
  while(m2===m1&&t<50){m2=pick(slopes);t++;}
  var b1=Y-m1*X,b2=Y-m2*X;
  var ask=pick(["x","y"]),ans=(ask==="x"?X:Y),mode=ri(1,2);
  if(mode===1){
    return numq("A graph shows two straight lines. The first line has slope \\("+m1+"\\) and \\(y\\)-intercept \\("+b1+"\\). The second line has slope \\("+m2+"\\) and \\(y\\)-intercept \\("+b2+"\\). The lines intersect at one point. By writing an equation for each line, determine the \\("+ask+"\\)-value of the point of intersection.",
      ans,0.001,
      "Write each line in slope-intercept form: "+u6meetSol(m1,b1,m2,b2,X,Y,ask),
      {mode:mode,m1:m1,b1:b1,m2:m2,b2:b2,X:X,Y:Y,ask:ask,ans:ans});
  }
  var dx1=ri(1,3),dx2=ri(1,3);
  var pts=[[X-dx1,Y-m1*dx1],[X+dx1,Y+m1*dx1],[X-dx2,Y-m2*dx2],[X+dx2,Y+m2*dx2]];
  return numq("A graph shows two straight lines. The first line passes through the points \\("+u6pair(pts[0][0],pts[0][1])+"\\) and \\("+u6pair(pts[1][0],pts[1][1])+"\\). The second line passes through the points \\("+u6pair(pts[2][0],pts[2][1])+"\\) and \\("+u6pair(pts[3][0],pts[3][1])+"\\). The lines intersect at one point. By writing an equation for each line, determine the \\("+ask+"\\)-value of the point of intersection.",
    ans,0.001,
    "Find the slope of each line from its two points, then write each equation. The first line has slope \\("+m1+"\\) and equation \\("+u6yEq(m1,b1)+"\\); the second line has slope \\("+m2+"\\) and equation \\("+u6yEq(m2,b2)+"\\). "+u6meetSol(m1,b1,m2,b2,X,Y,ask),
    {mode:mode,pts:pts,X:X,Y:Y,ask:ask,ans:ans});
});

/* u7-pk-verify: borrowed verbatim from math-1201 entry u6-verify (math-1201:4.53). */
E("u7-pk-verify",7,["4.51"],1,"gen",function(){
  var m1=pick([-3,-2,-1,1,2,3]),m2=pick([-3,-2,-1,1,2,3]),t=0;
  while(m2===m1&&t<50){m2=pick([-3,-2,-1,1,2,3]);t++;}
  var b1=ri(-8,8),b2=ri(-8,8),cat=ri(1,4),px,py;
  if(cat===1){px=ri(-5,8);py=m1*px+b1;b2=py-m2*px;}
  else if(cat===2){px=ri(-5,8);py=m1*px+b1;var g=0;while(py===m2*px+b2&&g<50){px++;py=m1*px+b1;g++;}}
  else if(cat===3){px=ri(-5,8);py=m2*px+b2;var g2=0;while(py===m1*px+b1&&g2<50){px++;py=m2*px+b2;g2++;}}
  else{px=ri(-5,8);py=m1*px+b1+pick([2,3,4]);var g3=0;while(py===m2*px+b2&&g3<50){py++;g3++;}}
  var key=(cat===1?"Yes, it is a solution because it satisfies both equations in the system":
    cat===2?"No, it is not a solution, because it satisfies the first equation alone":
    cat===3?"No, it is not a solution, because it satisfies the second equation only":
    "No, it is not a solution, because it satisfies neither of the equations");
  var all=["Yes, it is a solution because it satisfies both equations in the system",
    "No, it is not a solution, because it satisfies the first equation alone",
    "No, it is not a solution, because it satisfies the second equation only",
    "No, it is not a solution, because it satisfies neither of the equations"];
  var ds=all.filter(function(s){return s!==key;});
  var v1=m1*px+b1,v2=m2*px+b2;
  return mcq("Consider the system \\("+u6yEq(m1,b1)+"\\) and \\("+u6yEq(m2,b2)+"\\) (first equation listed first). Is the ordered pair \\("+u6pair(px,py)+"\\) a solution of the system?",
    key,ds,
    "A solution must satisfy both equations. Substitute \\(x = "+px+"\\) and \\(y = "+py+"\\) into each one: \\["+
    "\\begin{aligned} "+m1+"("+px+")"+u6sgn(b1)+" &= "+v1+" \\\\ "+m2+"("+px+")"+u6sgn(b2)+" &= "+v2+" \\end{aligned} \\]"+
    " The pair gives \\(y = "+v1+"\\) in the first equation and \\(y = "+v2+"\\) in the second, while the pair itself has \\(y = "+py+"\\). So the pair <b>"+(cat===1?"satisfies both equations and is a solution":(cat===2?"satisfies the first equation only, so it is not a solution":(cat===3?"satisfies the second equation only, so it is not a solution":"satisfies neither equation, so it is not a solution")))+"</b>.",
    {m1:m1,b1:b1,m2:m2,b2:b2,px:px,py:py,cat:cat,stmt:true,keyText:key});
});

/* u7-pk-solve-algebra: borrowed verbatim from math-1201 entry u6-solve-algebra (math-1201:4.55). */
E("u7-pk-solve-algebra",7,["4.51"],2,"gen",function(){
  var X=ri(-4,9),Y=ri(-3,10);
  var m=pick([-3,-2,-1,1,2,3]),mode=ri(1,2);
  var b=(mode===1)?(Y-m*X):(X-m*Y);
  var p,q,d,t=0;
  do{p=ri(-4,4);q=ri(-4,4);t++;}while(t<200&&((p===0||q===0)||(mode===1?(p+q*m===0):(q+p*m===0))));
  d=p*X+q*Y;
  var ask=pick(["x","y"]),ans=(ask==="x"?X:Y);
  var givenEq,otherEq,sol;
  if(mode===1){
    givenEq=u6yEq(m,b);otherEq=u6std(p,q,d);
    var coef=p+q*m,rest=d-q*b;
    var qPart=(q>0?(" + "+(Math.abs(q)===1?"":Math.abs(q))+"("+u6yRHS(m,b)+")"):(" - "+(Math.abs(q)===1?"":Math.abs(q))+"("+u6yRHS(m,b)+")"));
    sol="The first equation is already solved for \\(y\\), so substitute its right side into the second equation: \\["+
    "\\begin{aligned} "+u6coefVar(p,"x")+qPart+" &= "+d+" \\\\ "+u6coefVar(coef,"x")+u6sgn(q*b)+" &= "+d+" \\\\ "+u6coefVar(coef,"x")+" &= "+rest+" \\\\ x &= "+X+" \\end{aligned} \\]"+
    " Substitute \\(x = "+X+"\\) back into \\("+givenEq+"\\) to get \\(y\\): \\["+
    "\\begin{aligned} y &= "+m+"("+X+")"+u6sgn(b)+" \\\\ y &= "+Y+" \\end{aligned} \\]"+
    " The solution is \\("+u6pair(X,Y)+"\\) (check in the second equation: \\("+p+"("+X+")"+(q>0?(" + "+q+"("+Y+")"):(" - "+(-q)+"("+Y+")"))+" = "+d+"\\)). The "+ask+"-value is <b>\\("+ans+"\\)</b>.";
  }else{
    givenEq="x = "+u6coefVar(m,"y")+u6sgn(b);otherEq=u6std(p,q,d);
    var coef2=q+p*m,rest2=d-p*b;
    var pPart=(p>0?((Math.abs(p)===1?"":Math.abs(p))+"("+u6coefVar(m,"y")+u6sgn(b)+")"):(" - "+(Math.abs(p)===1?"":Math.abs(p))+"("+u6coefVar(m,"y")+u6sgn(b)+")"));
    var lead=(p>0?pPart:(" - "+(Math.abs(p)===1?"":Math.abs(p))+"("+u6coefVar(m,"y")+u6sgn(b)+")"));
    /* build the substituted left side carefully: p*(x expression) followed by the q y term */
    var subLhs=(p>0?((p===1?"":p)+"("):("-"+(p===-1?"":(-p))+"("))+u6coefVar(m,"y")+u6sgn(b)+")"+(q>0?(" + "+u6coefVar(q,"y")):(" - "+u6coefVar(-q,"y")));
    sol="The first equation is already solved for \\(x\\), so substitute its right side into the second equation: \\["+
    "\\begin{aligned} "+subLhs+" &= "+d+" \\\\ "+u6coefVar(coef2,"y")+u6sgn(p*b)+" &= "+d+" \\\\ "+u6coefVar(coef2,"y")+" &= "+rest2+" \\\\ y &= "+Y+" \\end{aligned} \\]"+
    " Substitute \\(y = "+Y+"\\) back into \\("+givenEq+"\\) to get \\(x\\): \\["+
    "\\begin{aligned} x &= "+m+"("+Y+")"+u6sgn(b)+" \\\\ x &= "+X+" \\end{aligned} \\]"+
    " The solution is \\("+u6pair(X,Y)+"\\) (check in the second equation: \\("+p+"("+X+")"+(q>0?(" + "+q+"("+Y+")"):(" - "+(-q)+"("+Y+")"))+" = "+d+"\\)). The "+ask+"-value is <b>\\("+ans+"\\)</b>.";
  }
  return numq("Solve this system of equations using substitution, and give the "+ask+"-value of the solution: \\[ \\begin{aligned} "+givenEq+" \\\\ "+otherEq+" \\end{aligned} \\]",
    ans,0.001,sol,
    {mode:mode,m:m,b:b,p:p,q:q,d:d,X:X,Y:Y,ask:ask,ans:ans});
});

/* u7-pk-solve-elimination: borrowed verbatim from math-1201 entry u6-solve-elimination (math-1201:4.55). */
E("u7-pk-solve-elimination",7,["4.51"],2,"gen",function(){
  var X=ri(-5,9),Y=ri(-4,10);
  var a1=ri(-4,4),b1=ri(-3,3),t=0;
  while((a1===0||b1===0)&&t<100){a1=ri(-4,4);b1=ri(-3,3);t++;}
  var mode=ri(1,3),a2,b2,k=1;
  if(mode===1){b2=-b1;a2=ri(-4,4);var t1=0;while((a2===0||a2===-a1)&&t1<100){a2=ri(-4,4);t1++;}}
  else if(mode===2){b2=b1;a2=ri(-4,4);var t2=0;while((a2===0||a2===a1)&&t2<100){a2=ri(-4,4);t2++;}}
  else{k=pick([2,3]);b2=-k*b1;a2=ri(-4,4);var t3=0;while((a2===0||k*a1+a2===0)&&t3<100){a2=ri(-4,4);t3++;}}
  var c1=a1*X+b1*Y,c2=a2*X+b2*Y;
  var ask=pick(["x","y"]),ans=(ask==="x"?X:Y);
  var elimLine,firstLines;
  if(mode===1){
    firstLines=u6std(a1,b1,c1)+" \\\\ "+u6std(a2,b2,c2);
    elimLine="Add the two equations so the \\(y\\) terms cancel: \\["+
    "\\begin{aligned} "+firstLines+" \\\\ "+u6coefVar(a1+a2,"x")+" &= "+(c1+c2)+" \\\\ x &= "+X+" \\end{aligned} \\]";
  }else if(mode===2){
    firstLines=u6std(a1,b1,c1)+" \\\\ "+u6std(a2,b2,c2);
    elimLine="Subtract the second equation from the first so the \\(y\\) terms cancel: \\["+
    "\\begin{aligned} "+firstLines+" \\\\ "+u6coefVar(a1-a2,"x")+" &= "+(c1-c2)+" \\\\ x &= "+X+" \\end{aligned} \\]";
  }else{
    firstLines=u6std(k*a1,k*b1,k*c1)+" \\\\ "+u6std(a2,b2,c2);
    elimLine="Multiply the first equation by \\("+k+"\\) so the \\(y\\) terms become opposites, then add: \\["+
    "\\begin{aligned} "+firstLines+" \\\\ "+u6coefVar(k*a1+a2,"x")+" &= "+(k*c1+c2)+" \\\\ x &= "+X+" \\end{aligned} \\]";
  }
  var subTerm=(b1>0?(" + "+u6coefVar(b1,"y")):(" - "+u6coefVar(-b1,"y")));
  var sol=elimLine+" Substitute \\(x = "+X+"\\) into the first equation to get \\(y\\): \\["+
  "\\begin{aligned} "+(a1*X)+subTerm+" &= "+c1+" \\\\ "+u6coefVar(b1,"y")+" &= "+(c1-a1*X)+" \\\\ y &= "+Y+" \\end{aligned} \\]"+
  " The solution is \\("+u6pair(X,Y)+"\\) (check in the second equation: \\("+a2+"("+X+")"+(b2>0?(" + "+b2+"("+Y+")"):(" - "+(-b2)+"("+Y+")"))+" = "+c2+"\\), confirming the solution in both equations). The "+ask+"-value is <b>\\("+ans+"\\)</b>.";
  return numq("Solve this system of equations using elimination, and give the "+ask+"-value of the solution: \\[ \\begin{aligned} "+u6std(a1,b1,c1)+" \\\\ "+u6std(a2,b2,c2)+" \\end{aligned} \\]",
    ans,0.001,sol,
    {mode:mode,k:k,a1:a1,b1:b1,a2:a2,b2:b2,c1:c1,c2:c2,X:X,Y:Y,ask:ask,ans:ans});
});

/* u7-pk-strategy: borrowed verbatim from math-1201 entry u6-strategy (math-1201:4.56). */
E("u7-pk-strategy",7,["4.51"],1,"var",varset([
  function(){var key="Use substitution, because the first equation already gives y directly in terms of x, so it drops right into the second equation";
    return mcq("A system begins with the equation \\(y = 3x - 2\\), followed by \\(2x + 5y = 31\\). Which strategy fits this system best, and why?",
    key,
    ["Use elimination, because the second equation has coefficients 2 and 5, and those numbers line up for adding right away here",
     "Use graphing, because the first equation already gives y directly in terms of x, and a picture is the only way to use that fact",
     "Use substitution, because the second equation has both variables in it, so the first equation cannot be used anywhere at all"],
    "Substitution works when one variable is already isolated. Here \\(y\\) is given directly as \\(3x - 2\\), so replacing \\(y\\) in the second equation leaves one equation in \\(x\\) alone. The best fit is <b>substitution, because the first equation already gives y directly in terms of x</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Use elimination here, because the x terms are opposites, so adding the two equations removes x in a single step right away";
    return mcq("A system consists of \\(4x + 3y = 26\\) and \\(-4x + 5y = 6\\). Which strategy fits this system best, and why?",
    key,
    ["Use substitution, because the x terms are opposites, so one variable must be isolated before anything can be combined here",
     "Use elimination, because the y terms are opposites, so adding the two equations removes y in a single step right away here",
     "Use graphing, because the x terms are opposites, so only a picture can show what happens when the equations are combined"],
    "Elimination works when one pair of terms cancels on adding or subtracting. Here the \\(x\\) terms, \\(4x\\) and \\(-4x\\), are opposites, so adding the equations removes \\(x\\) at once and leaves a single equation in \\(y\\). The best fit is <b>elimination, because the x terms are opposites</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Use graphing, because the question asks only for an estimate of where the lines meet, and the graph gives that estimate directly";
    return mcq("A question gives two lines drawn on a grid and asks for an estimate of the point where the two lines cross. Which strategy fits this task best, and why?",
    key,
    ["Use substitution, because the question asks only for an estimate of where the lines meet, and algebra gives exact values only",
     "Use elimination, because the question asks only for an estimate of where the lines meet, and the coefficients are already lined up",
     "Use graphing, because the question asks only for an exact algebraic answer, and a graph is the tool that produces exact values"],
    "When only an estimate is needed and the lines are already drawn, reading the crossing point off the graph is the direct route; algebra would give an exact answer the question did not ask for. The best fit is <b>graphing, because the question asks only for an estimate of where the lines meet</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Use substitution, because the second equation already gives x directly in terms of y, so it drops right into the first equation";
    return mcq("A system consists of \\(3x - 2y = 12\\) and \\(x = 4y + 1\\). Which strategy fits this system best, and why?",
    key,
    ["Use elimination, because the first equation has coefficients 3 and 2, and those numbers line up for adding right away here",
     "Use graphing, because the second equation already gives x directly in terms of y, and a picture is the only way to use that fact",
     "Use substitution, because the first equation has both variables in it, so the second equation cannot be used anywhere at all"],
    "Substitution works when one variable is already isolated. Here \\(x\\) is given directly as \\(4y + 1\\), so replacing \\(x\\) in the first equation leaves one equation in \\(y\\) alone. The best fit is <b>substitution, because the second equation already gives x directly in terms of y</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Use elimination, because tripling the first equation lines the x terms up, so subtracting then removes x in one clean step";
    return mcq("A system consists of \\(2x + y = 9\\) and \\(6x - y = 7\\). Which strategy fits this system best, and why?",
    key,
    ["Use substitution, because tripling the first equation lines the x terms up, so one variable must be isolated beforehand",
     "Use elimination, because doubling the second equation lines the x terms up, so subtracting then removes x in one clean step",
     "Use graphing, because tripling the first equation lines the x terms up, so only a picture can show the two equations combined"],
    "Elimination also works after one equation is multiplied to line up a pair of terms. Tripling the first equation makes its \\(x\\) term \\(6x\\), matching the second equation, so subtracting removes \\(x\\). The best fit is <b>elimination, because tripling the first equation lines the x terms up</b>.",
    {stmt:true,keyText:key});}
]));

/* u7-pk-solve-by-factoring: authored micro-item (authored:solve-quadratic-by-factoring),
   written for this tranche. */
E("u7-pk-solve-by-factoring",7,["4.51"],2,"gen",function(){
  var lo=0,hi=0,tries=0;
  do { var r1=ri(-6,6),r2=ri(-6,8); lo=Math.min(r1,r2); hi=Math.max(r1,r2); tries++; } while((lo===hi||lo===0||hi===0)&&tries<80);
  var B=-(lo+hi), C=lo*hi;
  var lin=function(v){ return v===1?"x":(v===-1?"-x":v+"x"); };
  var eq="x^2";
  if(B!==0) eq+= B>0 ? " + "+lin(B) : " - "+lin(-B);
  eq+= C>0 ? " + "+C : " - "+(-C);
  var fac=function(r){ return r>0 ? "(x - "+r+")" : "(x + "+(-r)+")"; };
  var askLarger=ri(0,1)===0;
  var ans=askLarger?hi:lo;
  return numq("Solve the equation \\("+eq+" = 0\\) by factoring. What is the "+(askLarger?"larger":"smaller")+" root?",
    ans,0.01,
    "The quadratic factors as \\("+eq+" = "+fac(lo)+fac(hi)+"\\). A product is 0 when one of its factors is 0, so \\(x = "+lo+"\\) or \\(x = "+hi+"\\). The "+(askLarger?"larger":"smaller")+" root is <b>"+ans+"</b>.",
    {lo:lo,hi:hi,ans:ans});
}, ["Find two numbers that multiply to the constant term and add to the middle coefficient.", "Set each factor equal to 0."]);

/* Bimodal build additions (Nov 19, 2026): two selected-response Level 2 entries, on the number of solutions of a linear-quadratic system and on modelling a ticket situation with a system of equations. SME-flagged for the specialist pass. */

/* u7-add-solution-count: how many real solutions a line-parabola system has,
   decided by the discriminant of the equation formed by setting them equal. */
E("u7-add-solution-count",7,["4.49"],2,"gen",function(){
  var mode=pick(["two","one","none"]);
  var B=0,C=0;
  if(mode==="two"){ var r1=ri(-6,4), r2=r1+ri(2,5); B=-(r1+r2); C=r1*r2; }
  else if(mode==="one"){ var r=ri(-5,6); B=-2*r; C=r*r; }
  else { var h=ri(-4,4), k=pick([1,2,3,5]); B=-2*h; C=h*h+k; }
  var D=B*B-4*C;
  var m=ri(-4,5), p=B+m, d0=ri(-6,6), q=C+d0;
  var key= mode==="two" ? "Two real solutions" : mode==="one" ? "One real solution" : "No real solutions";
  var dis=["Two real solutions","One real solution","No real solutions","Four real solutions"].filter(function(s){ return s!==key; });
  var discText= mode==="two" ? "The discriminant is positive, so the equation has two distinct real roots, and the line meets the parabola at two points."
    : mode==="one" ? "The discriminant is zero, so the equation has one repeated real root, and the line touches the parabola at one point."
    : "The discriminant is negative, so the equation has no real roots, and the line does not meet the parabola.";
  return mcq("Consider the system \\(y = "+u7Std(1,p,q)+"\\) and \\(y = "+u7Lin(m,d0)+"\\). How many real solutions does the system have?",
    key, dis,
    "Setting the two expressions for \\(y\\) equal gives \\[ \\begin{aligned} "+u7Std(1,p,q)+" &= "+u7Lin(m,d0)+" \\\\ "+u7Std(1,B,C)+" &= 0 \\end{aligned} \\] The discriminant of this quadratic is \\[ \\begin{aligned} b^2 - 4ac &= ("+B+")^2 - 4(1)("+C+") \\\\ &= "+D+" \\end{aligned} \\] "+discText+" The answer is <b>"+key+"</b>.",
    {mode:mode,B:B,C:C,D:D});
});

/* u7-add-model-tickets: choose the system that models two ticket orders,
   where x and y are the adult and child ticket prices. */
E("u7-add-model-tickets",7,["4.52"],2,"gen",function(){
  function tm(cf,v){ return cf===1 ? v : cf+v; }
  var px=ri(8,15), py=ri(4,7);
  var a1=0,c1=0,a2=0,c2=0,T1=0,T2=0,att=0;
  do { a1=ri(2,6); c1=ri(1,5); a2=ri(2,6); c2=ri(1,5); T1=a1*px+c1*py; T2=a2*px+c2*py; att++; }
  while((a1===c1||a2===c2||a1*c2===a2*c1||T1===T2) && att<100);
  var eq1=tm(a1,"x")+" + "+tm(c1,"y")+" = "+T1, eq2=tm(a2,"x")+" + "+tm(c2,"y")+" = "+T2;
  var key="\\("+eq1+"\\) and \\("+eq2+"\\)";
  var dis=[
    "\\("+tm(a1,"x")+" + "+tm(c1,"y")+" = "+T2+"\\) and \\("+tm(a2,"x")+" + "+tm(c2,"y")+" = "+T1+"\\)",
    "\\("+tm(c1,"x")+" + "+tm(a1,"y")+" = "+T1+"\\) and \\("+tm(c2,"x")+" + "+tm(a2,"y")+" = "+T2+"\\)",
    "\\("+eq1+"\\) and \\("+tm(c2,"x")+" + "+tm(a2,"y")+" = "+T2+"\\)"
  ];
  return mcq("Adult tickets and child tickets for a school play sell at fixed prices. One family buys "+a1+" adult tickets and "+(c1===1?"1 child ticket":c1+" child tickets")+" and pays $"+T1+". Another family buys "+a2+" adult tickets and "+(c2===1?"1 child ticket":c2+" child tickets")+" and pays $"+T2+". Let \\(x\\) represent the price, in dollars, of one adult ticket and \\(y\\) represent the price, in dollars, of one child ticket. Which system of equations models this situation?",
    key, dis,
    "Each adult ticket adds \\(x\\) dollars to a family's total and each child ticket adds \\(y\\) dollars. The first family's total is \\("+eq1.split(" = ")[0]+"\\), which equals \\("+T1+"\\), and the second family's total is \\("+eq2.split(" = ")[0]+"\\), which equals \\("+T2+"\\). The system that models the situation is <b>"+key+"</b>.",
    {a1:a1,c1:c1,a2:a2,c2:c2,T1:T1,T2:T2});
});

/* PK tranche pass for Unit 7. pkFor is the cluster's dependent
   indicator list from the prior knowledge map, as registered
   for this unit in courses.js. */
var PKT_U7_FOR=["4.48","4.49","4.50","4.51","4.52","4.53","4.54"];
var PKT_U7={
 "u7-pk-relate":{src:"math-1201:4.51",group:"intersection-meaning"},
 "u7-pk-intersection":{src:"math-1201:4.52",group:"intersection-meaning"},
 "u7-pk-solve-graph":{src:"math-1201:4.53",group:"systems-graphical"},
 "u7-pk-verify":{src:"math-1201:4.53",group:"verify-solution"},
 "u7-pk-solve-algebra":{src:"math-1201:4.55",group:"systems-algebraic"},
 "u7-pk-solve-elimination":{src:"math-1201:4.55",group:"systems-algebraic"},
 "u7-pk-strategy":{src:"math-1201:4.56",group:"systems-algebraic"},
 "u7-pk-solve-by-factoring":{src:"authored:solve-quadratic-by-factoring",group:"solve-quadratic"}
};
BANK.forEach(function(e){var t=PKT_U7[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U7_FOR.slice();e.pkGroup=t.group;}});

/* ----- bank-u8.js ----- */
// Math 2200 Unit 8 Linear and Quadratic Inequalities question bank
// CRMARKS: u8-both-hold=3
// CRMARKS: u8-model-context=3
// CRMARKS: u8-numberline-quad=2
// CRMARKS: u8-numberline-read=1
// CRMARKS: u8-quad-graph-id=2
// CRMARKS: u8-quad-solve-inside=2
// CRMARKS: u8-quad-solve-special=3
// CRMARKS: u8-solve-linear-basic=1
// CRMARKS: u8-solve-linear-flip=2
// CRMARKS: u8-scenario-solve=2
// CRMARKS: u8-wcr-ticket-fundraiser=5
// BIMODAL: u8-solve-linear-flip=a
// BIMODAL: u8-quad-solve-inside=a
// BIMODAL: u8-numberline-quad=b
// BIMODAL: u8-both-hold=a
/* ================= Unit 8: Linear and Quadratic Inequalities ================= */
/* ================= Unit 8: Linear and Quadratic Inequalities =================
   Tranche 2, final scope. All stems, contexts and values are original.
   Helpers are prefixed u8; entries register through E(...).
   13 entries: L1 3, L2 8, L3 2.
   Codes: 4.16 determine the solution region of a linear inequality
   using test points; 4.17 solid or broken boundary lines (both
   two-variable outcomes per the curriculum guide, corrected
   Nov 13, 2026; the one-variable solving entries in this file
   assess Math 9 outcomes and carry the pkFlag, below);
   4.18 graph linear inequalities in two variables (test point, solid/broken);
   4.19 model a context as a two-variable inequality, feasible combinations;
   4.20-4.23 quadratic inequalities in two variables (regions, test points,
   boundary type, error analysis); 4.24-4.26 solve quadratic inequalities in
   one variable (interval notation, sign analysis, special solution sets). */

function u8dist3(correct, cands) { /* first three candidate strings differing from the key and each other */
  var out = [];
  for (var i = 0; i < cands.length; i++) {
    var c = cands[i];
    if (c !== null && c !== undefined && c !== correct && out.indexOf(c) < 0) out.push(c);
    if (out.length === 3) break;
  }
  return out;
}
function u8sgn(n) { return n > 0 ? " + " + n : n < 0 ? " - " + (-n) : ""; }
function u8coef(a, v) { return a === 1 ? v : a === -1 ? "-" + v : a + v; }
function u8linB(a, b) { var s = u8coef(a, "x"); if (b !== 0) s += u8sgn(b); return s; }
function u8quadB(a, b, c) {
  var s = u8coef(a, "x^2");
  if (b !== 0) s += (b > 0 ? " + " : " - ") + (Math.abs(b) === 1 ? "x" : Math.abs(b) + "x");
  if (c !== 0) s += u8sgn(c);
  return s;
}
function u8facB(r) { return r === 0 ? "x" : r > 0 ? "(x - " + r + ")" : "(x + " + (-r) + ")"; }
function u8sqT(h) { return h === 0 ? "x^2" : h > 0 ? "(x - " + h + ")^2" : "(x + " + (-h) + ")^2"; }
var U8SYM = { lt: "<", le: "\\le", gt: ">", ge: "\\ge" };
function u8flip(s) { return { lt: "gt", le: "ge", gt: "lt", ge: "le" }[s]; }
function u8otherStrict(s) { return { lt: "le", le: "lt", gt: "ge", ge: "gt" }[s]; }
function u8incl(s) { return s === "le" || s === "ge"; }
function u8ivOne(k, sym) {
  if (sym === "lt") return "(-\\infty, " + k + ")";
  if (sym === "le") return "(-\\infty, " + k + "]";
  if (sym === "gt") return "(" + k + ", \\infty)";
  return "[" + k + ", \\infty)";
}
function u8ivBetween(lo, hi, incl) { return (incl ? "[" : "(") + lo + ", " + hi + (incl ? "]" : ")"); }
function u8ivOutside(lo, hi, incl) { return "(-\\infty, " + lo + (incl ? "]" : ")") + " \\cup " + (incl ? "[" : "(") + hi + ", \\infty)"; }
function u8wrap(s) { return "\\(" + s + "\\)"; }

/* ---------- number line figures ---------- */
function u8LineBase(xmin, xmax, inner, label) {
  var W = 340, H = 74, y0 = 30;
  function X(x) { return 18 + (x - xmin) * (304 / (xmax - xmin)); }
  var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + label + '">';
  for (var t = xmin; t <= xmax; t++) {
    s += '<line x1="' + fmt(X(t), 1) + '" y1="25" x2="' + fmt(X(t), 1) + '" y2="35" stroke="' + FIG_INK + '" stroke-width="1.2"/>';
    s += _txt(X(t), 50, "" + t, 10, false);
  }
  s += inner(X);
  s += '<line x1="8" y1="' + y0 + '" x2="332" y2="' + y0 + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  s += '<polygon points="8,' + y0 + ' 17,' + (y0 - 4) + ' 17,' + (y0 + 4) + '" fill="' + FIG_INK + '"/>';
  s += '<polygon points="332,' + y0 + ' 323,' + (y0 - 4) + ' 323,' + (y0 + 4) + '" fill="' + FIG_INK + '"/>';
  return s + "</svg>";
}
function u8shadeSeg(X, x1, x2, y0) {
  return '<line x1="' + fmt(X(x1), 1) + '" y1="' + y0 + '" x2="' + fmt(X(x2), 1) + '" y2="' + y0 + '" stroke="' + FIG_ACC + '" stroke-width="5" opacity="0.85"/>';
}
function u8dot(X, x, closed, y0) {
  return '<circle cx="' + fmt(X(x), 1) + '" cy="' + y0 + '" r="5.5" fill="' + (closed ? FIG_ACC : "#ffffff") + '" stroke="' + FIG_ACC + '" stroke-width="2.2"/>';
}
function u8Line1(k, closed, dir) { /* one endpoint, shading to one side */
  var xmin = k - 4, xmax = k + 4, y0 = 30;
  return u8LineBase(xmin, xmax, function (X) {
    var s = "";
    if (dir === "low") {
      s += u8shadeSeg(X, xmin, k, y0);
      s += '<polygon points="' + fmt(X(xmin), 1) + ',' + y0 + ' ' + fmt(X(xmin) + 11, 1) + ',' + (y0 - 5.5) + ' ' + fmt(X(xmin) + 11, 1) + ',' + (y0 + 5.5) + '" fill="' + FIG_ACC + '"/>';
    } else {
      s += u8shadeSeg(X, k, xmax, y0);
      s += '<polygon points="' + fmt(X(xmax), 1) + ',' + y0 + ' ' + fmt(X(xmax) - 11, 1) + ',' + (y0 - 5.5) + ' ' + fmt(X(xmax) - 11, 1) + ',' + (y0 + 5.5) + '" fill="' + FIG_ACC + '"/>';
    }
    return s + u8dot(X, k, closed, y0);
  }, "Number line with shading from " + k + (dir === "low" ? " leftward" : " rightward"));
}
function u8Line2(r1, r2, region, incl) { /* two endpoints, shading between or outside */
  var xmin = r1 - 3, xmax = r2 + 3, y0 = 30;
  return u8LineBase(xmin, xmax, function (X) {
    var s = "";
    if (region === "between") {
      s += u8shadeSeg(X, r1, r2, y0);
    } else {
      s += u8shadeSeg(X, xmin, r1, y0) + u8shadeSeg(X, r2, xmax, y0);
      s += '<polygon points="' + fmt(X(xmin), 1) + ',' + y0 + ' ' + fmt(X(xmin) + 11, 1) + ',' + (y0 - 5.5) + ' ' + fmt(X(xmin) + 11, 1) + ',' + (y0 + 5.5) + '" fill="' + FIG_ACC + '"/>';
      s += '<polygon points="' + fmt(X(xmax), 1) + ',' + y0 + ' ' + fmt(X(xmax) - 11, 1) + ',' + (y0 - 5.5) + ' ' + fmt(X(xmax) - 11, 1) + ',' + (y0 + 5.5) + '" fill="' + FIG_ACC + '"/>';
    }
    return s + u8dot(X, r1, incl, y0) + u8dot(X, r2, incl, y0);
  }, "Number line with shading " + region + " " + r1 + " and " + r2);
}

/* ---------- parabola figure for a two-variable quadratic inequality ---------- */
function u8Para(h, k, a, dashed, shadeAbove) {
  var W = 320, H = 264, unit = 18, ox = 160, oy = 140;
  function PX(x) { return ox + x * unit; }
  function PY(y) { return oy - y * unit; }
  var g, s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parabola with a shaded region">';
  for (g = -8; g <= 8; g++) s += '<line x1="' + fmt(PX(g), 1) + '" y1="6" x2="' + fmt(PX(g), 1) + '" y2="258" stroke="#e2e2e2" stroke-width="1"/>';
  for (g = -6; g <= 6; g++) s += '<line x1="6" y1="' + fmt(PY(g), 1) + '" x2="314" y2="' + fmt(PY(g), 1) + '" stroke="#e2e2e2" stroke-width="1"/>';
  var pts = [], x;
  for (x = -8.6; x <= 8.61; x += 0.2) pts.push([x, a * (x - h) * (x - h) + k]);
  var curve = pts.map(function (p, i) { return (i === 0 ? "M " : "L ") + fmt(PX(p[0]), 1) + " " + fmt(PY(p[1]), 1); }).join(" ");
  var edge = shadeAbove ? -6 : H + 6;
  s += '<path d="' + curve + " L " + fmt(PX(8.6), 1) + " " + edge + " L " + fmt(PX(-8.6), 1) + " " + edge + ' Z" fill="' + FIG_SHADE + '"/>';
  s += '<line x1="6" y1="' + fmt(PY(0), 1) + '" x2="314" y2="' + fmt(PY(0), 1) + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  s += '<line x1="' + fmt(PX(0), 1) + '" y1="6" x2="' + fmt(PX(0), 1) + '" y2="258" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  for (g = -8; g <= 8; g++) if (g !== 0) s += _txt(PX(g), PY(0) + 11, "" + g, 9, false);
  for (g = -6; g <= 6; g++) if (g !== 0) s += _txt(PX(0) - 9, PY(g), "" + g, 9, false);
  s += '<path d="' + curve + '" fill="none" stroke="' + FIG_INK + '" stroke-width="2.2"' + (dashed ? ' stroke-dasharray="7 5"' : "") + "/>";
  s += '<circle cx="' + fmt(PX(h), 1) + '" cy="' + fmt(PY(k), 1) + '" r="3.5" fill="' + FIG_ACC + '"/>';
  return s + "</svg>";
}

/* ---------- 4.16, 4.17: solve a two-step linear inequality (L1) ---------- */
E("u8-solve-linear-basic", 8, ["4.16", "4.17"], 1, "gen", function () {
  var a = ri(2, 9), b = ri(-9, 9), k = ri(-6, 8);
  if (k === 0) k = 3;
  var sym = pick(["lt", "le", "gt", "ge"]), rhs = a * k + b;
  var cor = "x " + U8SYM[sym] + " " + k;
  var dis = ["x " + U8SYM[u8flip(sym)] + " " + k,
             "x " + U8SYM[u8otherStrict(sym)] + " " + k,
             "x " + U8SYM[sym] + " " + (-k)];
  var sol = "Move the constant term to the right side, then divide by \\(" + a + "\\). The coefficient of \\(x\\) is positive, so the inequality sign keeps its direction: \\[ \\begin{aligned} " + u8linB(a, b) + " &" + U8SYM[sym] + " " + rhs + " \\\\ " + a + "x &" + U8SYM[sym] + " " + (rhs - b) + " \\\\ x &" + U8SYM[sym] + " " + k + " \\end{aligned} \\] The solution is <b>\\(" + cor + "\\)</b>.";
  return mcq("Solve the inequality \\(" + u8linB(a, b) + " " + U8SYM[sym] + " " + rhs + "\\).",
    u8wrap(cor), dis.map(u8wrap), sol,
    { kind: "lin", A: a, B: b, C: rhs, sym: sym });
});

/* ---------- 4.17: read a one-sided solution set from a number line (L1) ---------- */
E("u8-numberline-read", 8, ["4.17"], 1, "gen", function () {
  var k = ri(-7, 7), closed = pick([true, false]), dir = pick(["low", "high"]);
  var sym = dir === "low" ? (closed ? "le" : "lt") : (closed ? "ge" : "gt");
  var cor = u8ivOne(k, sym);
  var dis = ["lt", "le", "gt", "ge"].map(function (s) { return u8ivOne(k, s); }).filter(function (s) { return s !== cor; });
  var q = mcq("The number line shows the solution set of an inequality in one variable. Which interval notation describes the set shown?",
    u8wrap(cor), dis.map(u8wrap),
    "The circle at \\(" + k + "\\) is " + (closed ? "filled in, so \\(" + k + "\\) itself is included in the set" : "open, so \\(" + k + "\\) itself is not included in the set") + ". The shading covers every value " + (dir === "low" ? "below" : "above") + " \\(" + k + "\\), running off the end of the line. The solution set is <b>\\(" + cor + "\\)</b>.",
    { kind: "spec", spec: { type: "one", k: k, sym: sym } });
  q.figure = u8Line1(k, closed, dir);
  return q;
});

/* ---------- 4.18, 4.20, 4.22: which point is a solution (L1) ---------- */
E("u8-point-test", 8, ["4.18", "4.20", "4.22"], 1, "gen", function () {
  var shape = pick(["lin", "quad"]), sym = pick(["lt", "le", "gt", "ge"]);
  var m, b, bb, cc, ineqStr;
  function fval(x, y) {
    return shape === "lin" ? y - (m * x + b) : y - (x * x + bb * x + cc);
  }
  function holds(x, y) {
    var v = fval(x, y);
    return sym === "lt" ? v < 0 : sym === "le" ? v <= 0 : sym === "gt" ? v > 0 : v >= 0;
  }
  if (shape === "lin") {
    m = pick([-3, -2, -1, 1, 2, 3]); b = ri(-5, 5);
    ineqStr = "y " + U8SYM[sym] + " " + u8linB(m, b);
  } else {
    bb = ri(-4, 4); cc = ri(-6, 6);
    ineqStr = "y " + U8SYM[sym] + " " + u8quadB(1, bb, cc);
  }
  var good = null, bads = [], seen = {}, guard = 0;
  while ((!good || bads.length < 3) && guard++ < 600) {
    var x = ri(-4, 4), y = ri(-6, 9), key = x + "," + y;
    if (seen[key]) continue;
    seen[key] = 1;
    if (holds(x, y)) { if (!good) good = [x, y]; }
    else if (bads.length < 3) bads.push([x, y]);
  }
  var bv = shape === "lin" ? m * good[0] + b : good[0] * good[0] + bb * good[0] + cc;
  var cor = "(" + good[0] + ", " + good[1] + ")";
  var dis = bads.map(function (p) { return "(" + p[0] + ", " + p[1] + ")"; });
  var sol = "A point is a solution when substituting it makes the inequality true. For \\(" + cor + "\\), the boundary value at \\(x = " + good[0] + "\\) is \\(" + bv + "\\), and \\(" + good[1] + " " + U8SYM[sym] + " " + bv + "\\) is a true statement. Substituting each of the other three points gives a false statement, so none of them lies in the solution region. The solution point is <b>" + cor + "</b>.";
  return mcq("Which point is a solution of the inequality \\(" + ineqStr + "\\)?",
    cor, dis, sol,
    { kind: "pt", shape: shape, sym: sym, m: m, b: b, bb: bb, cc: cc });
});

/* ---------- 4.16: solve a linear inequality, sign reversal (L2) ---------- */
E("u8-solve-linear-flip", 8, ["4.16"], 2, "gen", function () {
  var shape = pick(["plain", "dist"]);
  var sym = pick(["lt", "le", "gt", "ge"]);
  var k = ri(-7, 7); if (k === 0) k = 4;
  var A, B, C, stem, step1, firstLine;
  if (shape === "plain") {
    var a = ri(2, 8); A = -a; B = ri(-9, 9); C = A * k + B;
    stem = u8linB(A, B);
    firstLine = stem;
  } else {
    var m = ri(2, 6), n = ri(1, 6);
    A = -m; B = m * n; C = A * k + B;
    stem = m + "(" + n + " - x)";
    firstLine = u8linB(A, B);
  }
  var fsym = u8flip(sym);
  var cor = u8ivOne(k, fsym);
  var dis = [u8ivOne(k, sym), u8ivOne(k, u8otherStrict(fsym)), u8ivOne(-k, fsym)];
  var steps = (shape === "dist" ? stem + " &" + U8SYM[sym] + " " + C + " \\\\ " : "") +
    firstLine + " &" + U8SYM[sym] + " " + C + " \\\\ " + A + "x &" + U8SYM[sym] + " " + (C - B) + " \\\\ x &" + U8SYM[fsym] + " " + k;
  var sol = "Isolate \\(x\\). The last step divides both sides by \\(" + A + ")\\), a negative number, so the inequality sign must reverse: \\[ \\begin{aligned} " + steps + " \\end{aligned} \\] In interval notation, the solution is <b>\\(" + cor + "\\)</b>.";
  return mcq("Solve the inequality \\(" + stem + " " + U8SYM[sym] + " " + C + "\\). Give the solution in interval notation.",
    u8wrap(cor), dis.map(u8wrap), sol,
    { kind: "lin", A: A, B: B, C: C, sym: sym });
});

/* ---------- 4.18: describe the graph of a linear inequality in two variables (L2) ---------- */
E("u8-graph-linear-desc", 8, ["4.18"], 2, "gen", function () {
  var form = pick(["si", "std"]), sym = pick(["lt", "le", "gt", "ge"]);
  var a1, a2, C, ineqStr, lineStr;
  if (form === "si") {
    var m = pick([-3, -2, -1, 1, 2, 3]), b = ri(-5, 5); if (b === 0) b = 3;
    a1 = -m; a2 = 1; C = b;
    ineqStr = "y " + U8SYM[sym] + " " + u8linB(m, b);
    lineStr = "y = " + u8linB(m, b);
  } else {
    a1 = pick([-3, -2, -1, 1, 2, 3]); a2 = pick([-3, -2, -1, 2, 3]); C = ri(-9, 9); if (C === 0) C = 5;
    var lhs = u8coef(a1, "x") + (a2 > 0 ? " + " : " - ") + (Math.abs(a2) === 1 ? "y" : Math.abs(a2) + "y");
    ineqStr = lhs + " " + U8SYM[sym] + " " + C;
    lineStr = lhs + " = " + C;
  }
  var solid = u8incl(sym);
  var contains = sym === "lt" ? 0 < C : sym === "le" ? 0 <= C : sym === "gt" ? 0 > C : 0 >= C;
  function desc(sd, ct) { return (sd ? "Solid" : "Dashed") + " line, and the shading " + (ct ? "includes" : "excludes") + " the origin"; }
  var cor = desc(solid, contains);
  var dis = [desc(!solid, contains), desc(solid, !contains), desc(!solid, !contains)];
  var testVal = form === "si" ? "0" : "0";
  var sol = "The boundary is the line \\(" + lineStr + "\\). The symbol \\(" + U8SYM[sym] + "\\) " + (solid ? "includes equality, so points on the line are solutions and the boundary is drawn solid" : "is strict, so points on the line are not solutions and the boundary is drawn dashed") + ". To choose the shaded side, test the origin \\((0, 0)\\): substituting gives \\(" + testVal + " " + U8SYM[sym] + " " + C + ")\\), which is " + (contains ? "true, so the origin lies in the shaded region" : "false, so the shaded region is the side away from the origin") + ". The matching description is <b>" + cor + "</b>.";
  return mcq("Which statement describes the graph of the inequality \\(" + ineqStr + "\\)?",
    cor, dis, sol,
    { kind: "desc", a1: a1, a2: a2, C: C, sym: sym });
});

/* ---------- 4.19: model a context with a two-variable inequality (L2) ---------- */
var U8CTX = [
  { name: "snack cart", v1: "m", v2: "j", p1: 3, p2: 2, rel: "le", caps: [36, 40, 44, 48, 52, 60], maxXY: 14,
    defs: "Let \\(m\\) be the number of muffins and \\(j\\) be the number of juice boxes.",
    text: function (cap) { return "A snack cart sells muffins for $3 each and juice boxes for $2 each. A teacher spends at most $" + cap + " on muffins and juice boxes for a class."; },
    total: "total cost in dollars", pairWords: "muffins and juice boxes" },
  { name: "shuttle", v1: "v", v2: "c", p1: 8, p2: 5, rel: "ge", caps: [55, 60, 65, 70, 75, 80], maxXY: 12,
    defs: "Let \\(v\\) be the number of vans and \\(c\\) be the number of cars.",
    text: function (cap) { return "A shuttle company uses vans that carry 8 passengers and cars that carry 5 passengers. On one trip, the company must carry at least " + cap + " passengers."; },
    total: "total number of passengers carried", pairWords: "vans and cars" },
  { name: "bakery mix", v1: "a", v2: "c", p1: 12, p2: 6, rel: "le", caps: [60, 72, 84, 96, 108, 120], maxXY: 12,
    defs: "Let \\(a\\) be the number of kilograms of almonds and \\(c\\) be the number of kilograms of dried cranberries.",
    text: function (cap) { return "A bakery sells a trail mix of almonds at $12 per kilogram and dried cranberries at $6 per kilogram. A gift mix must cost at most $" + cap + "."; },
    total: "total cost in dollars", pairWords: "kilograms of almonds and kilograms of cranberries" },
  { name: "two jobs", v1: "t", v2: "s", p1: 15, p2: 11, rel: "ge", caps: [170, 185, 200, 215, 230], maxXY: 14,
    defs: "Let \\(t\\) be the number of hours spent tutoring and \\(s\\) be the number of hours spent shelving books.",
    text: function (cap) { return "Sam earns $15 per hour tutoring and $11 per hour shelving books at a library. Sam wants to earn at least $" + cap + " next week."; },
    total: "total earnings in dollars", pairWords: "hours of tutoring and hours shelving books" },
  { name: "delivery van", v1: "w", v2: "j", p1: 12, p2: 9, rel: "le", caps: [240, 270, 300, 330, 360], maxXY: 20,
    defs: "Let \\(w\\) be the number of crates of bottled water and \\(j\\) be the number of crates of juice.",
    text: function (cap) { return "A delivery van carries crates of bottled water weighing 12 kg each and crates of juice weighing 9 kg each. The total load must be at most " + cap + " kg."; },
    total: "total load in kilograms", pairWords: "crates of bottled water and crates of juice" },
  { name: "print order", v1: "p", v2: "f", p1: 5, p2: 2, rel: "le", caps: [50, 60, 70, 80, 90], maxXY: 16,
    defs: "Let \\(p\\) be the number of posters and \\(f\\) be the number of flyers.",
    text: function (cap) { return "A student council prints posters for $5 each and flyers for $2 each for a school event. The council can spend at most $" + cap + " on printing."; },
    total: "total printing cost in dollars", pairWords: "posters and flyers" }
];
E("u8-model-context", 8, ["4.19"], 1, "gen", function () {
  var ctx = pick(U8CTX), cap = pick(ctx.caps), shape = pick(["model", "feasible"]);
  var sym = ctx.rel, symT = U8SYM[sym];
  var body = ctx.p1 + ctx.v1 + " + " + ctx.p2 + ctx.v2;
  if (shape === "model") {
    var cor = body + " " + symT + " " + cap;
    var cap2 = cap + pick([-10, -5, 5, 10]);
    var dis = [ctx.p2 + ctx.v1 + " + " + ctx.p1 + ctx.v2 + " " + symT + " " + cap,
               body + " " + U8SYM[u8flip(sym)] + " " + cap,
               body + " " + symT + " " + cap2];
    var sol = ctx.defs + " The " + ctx.total + " is \\(" + body + "\\). The words " + (ctx.rel === "le" ? "\"at most\" mean the total can equal the limit but not pass it, giving \\(\\le\\)" : "\"at least\" mean the total can equal the goal but not fall below it, giving \\(\\ge\\)") + ", and the limit here is \\(" + cap + "\\). The model is <b>\\(" + cor + "\\)</b>.";
    return mcq(ctx.text(cap) + " " + ctx.defs + " Which inequality models this situation?",
      u8wrap(cor), dis.map(u8wrap), sol,
      { kind: "model", shape: shape, ctx: ctx.name, p1: ctx.p1, p2: ctx.p2, v1: ctx.v1, v2: ctx.v2, rel: ctx.rel, cap: cap });
  }
  function okPair(x, y) {
    var tot = ctx.p1 * x + ctx.p2 * y;
    return ctx.rel === "le" ? tot <= cap : tot >= cap;
  }
  var good = null, bads = [], seen = {}, guard = 0;
  while ((!good || bads.length < 3) && guard++ < 800) {
    var px = ri(0, ctx.maxXY), py = ri(0, ctx.maxXY), key = px + "," + py;
    if (seen[key]) continue;
    seen[key] = 1;
    if (okPair(px, py)) { if (!good && px >= 1 && py >= 1) good = [px, py]; }
    else if (bads.length < 3) bads.push([px, py]);
  }
  var gtot = ctx.p1 * good[0] + ctx.p2 * good[1];
  var corP = "(" + good[0] + ", " + good[1] + ")";
  var disP = bads.map(function (p) { return "(" + p[0] + ", " + p[1] + ")"; });
  var solP = ctx.defs + " The combinations are listed in the order (" + ctx.pairWords + "). For \\(" + corP + "\\), the " + ctx.total + " is \\(" + ctx.p1 + "(" + good[0] + ") + " + ctx.p2 + "(" + good[1] + ") = " + gtot + "\\), which " + (ctx.rel === "le" ? "does not exceed" : "reaches at least") + " \\(" + cap + "\\). Each other combination gives a total on the wrong side of \\(" + cap + "\\). The combination that works is <b>" + corP + "</b>.";
  return mcq(ctx.text(cap) + " " + ctx.defs + " The inequality is \\(" + body + " " + symT + " " + cap + "\\). Which combination meets the goal?",
    corP, disP, solP,
    { kind: "model", shape: shape, ctx: ctx.name, p1: ctx.p1, p2: ctx.p2, v1: ctx.v1, v2: ctx.v2, rel: ctx.rel, cap: cap });
});

/* ---------- 4.24, 4.25: solve a quadratic inequality, inside region (L2) ---------- */
E("u8-quad-solve-inside", 8, ["4.24", "4.25"], 2, "gen", function () {
  var r1 = ri(-6, 3), r2 = r1 + ri(2, 6);
  if (r2 > 7) r2 = 7;
  var A = pick([1, 1, 2, 3]), sym = pick(["lt", "le"]);
  var B = -A * (r1 + r2), C = A * r1 * r2, incl = u8incl(sym);
  var form = pick(["factored", "expanded"]);
  var stem = form === "factored" ? (A === 1 ? "" : "" + A) + u8facB(r1) + u8facB(r2) : u8quadB(A, B, C);
  var cor = u8ivBetween(r1, r2, incl);
  var dis = [u8ivOutside(r1, r2, incl), u8ivBetween(r1, r2, !incl), u8ivOutside(r1, r2, !incl)];
  var sol = "The expression equals zero at \\(x = " + r1 + "\\) and \\(x = " + r2 + "\\)" + (form === "expanded" ? ", since \\(" + u8quadB(A, B, C) + " = " + (A === 1 ? "" : "" + A) + u8facB(r1) + u8facB(r2) + "\\)" : "") + ". The parabola \\(y = " + u8quadB(A, B, C) + "\\) opens upward, so the expression is negative between its roots and positive outside them. The inequality asks where the expression is " + (sym === "lt" ? "negative, and the strict symbol excludes the endpoints" : "negative or zero, so the endpoints are included") + ". The solution is <b>\\(" + cor + "\\)</b>.";
  return mcq("Solve the inequality \\(" + stem + " " + U8SYM[sym] + " 0\\). Give the solution in interval notation.",
    u8wrap(cor), dis.map(u8wrap), sol,
    { kind: "quad", A: A, B: B, C: C, sym: sym });
});

/* ---------- 4.24, 4.25, 4.26: negative leading coefficient and perfect-square cases (L2) ---------- */
E("u8-quad-solve-special", 8, ["4.24", "4.25", "4.26"], 1, "gen", function () {
  var shape = pick(["neg", "neg", "square"]);
  var sym = pick(["lt", "le", "gt", "ge"]), incl = u8incl(sym);
  if (shape === "neg") {
    var r1 = ri(-6, 3), r2 = r1 + ri(2, 6);
    if (r2 > 7) r2 = 7;
    var A0 = pick([1, 2]), A = -A0, B = A0 * (r1 + r2), C = -A0 * r1 * r2;
    var form = pick(["factored", "expanded"]);
    var stem = form === "factored" ? "-" + (A0 === 1 ? "" : "" + A0) + u8facB(r1) + u8facB(r2) : u8quadB(A, B, C);
    var inside = sym === "gt" || sym === "ge";
    var cor = inside ? u8ivBetween(r1, r2, incl) : u8ivOutside(r1, r2, incl);
    var dis = [inside ? u8ivOutside(r1, r2, incl) : u8ivBetween(r1, r2, incl),
               inside ? u8ivBetween(r1, r2, !incl) : u8ivOutside(r1, r2, !incl),
               inside ? u8ivOutside(r1, r2, !incl) : u8ivBetween(r1, r2, !incl)];
    var sol = "The expression equals zero at \\(x = " + r1 + "\\) and \\(x = " + r2 + "\\)" + (form === "expanded" ? ", since \\(" + u8quadB(A, B, C) + " = -" + (A0 === 1 ? "" : "" + A0) + u8facB(r1) + u8facB(r2) + "\\)" : "") + ". Because the leading coefficient is negative, the parabola opens downward: the expression is positive between its roots and negative outside them. The inequality asks where the expression is " + (sym === "lt" ? "negative, with the endpoints excluded" : sym === "le" ? "negative or zero, with the endpoints included" : sym === "gt" ? "positive, with the endpoints excluded" : "positive or zero, with the endpoints included") + ". The solution is <b>\\(" + cor + "\\)</b>.";
    return mcq("Solve the inequality \\(" + stem + " " + U8SYM[sym] + " 0\\). Give the solution in interval notation.",
      u8wrap(cor), dis.map(u8wrap), sol,
      { kind: "quad", A: A, B: B, C: C, sym: sym });
  }
  var h = ri(-5, 5), Aq = pick([1, 2, 3]);
  var stemS = (Aq === 1 ? "" : "" + Aq) + (h === 0 ? "x^2" : u8sqT(h));
  var specials = {
    gt: "(-\\infty, " + h + ") \\cup (" + h + ", \\infty)",
    ge: "All real numbers",
    lt: "No solution",
    le: "\\{" + h + "\\}"
  };
  var corS = specials[sym];
  var disS = ["gt", "ge", "lt", "le"].filter(function (s) { return s !== sym; }).map(function (s) { return specials[s]; });
  function optOf(s) { return (s === "All real numbers" || s === "No solution") ? s : u8wrap(s); }
  var reason = sym === "gt" ? "A square is positive except at \\(x = " + h + "\\), where it is zero, and a strict greater-than excludes that single point. Every other value works"
    : sym === "ge" ? "A square is never negative, so the expression is positive or zero for every real value of \\(x\\)"
    : sym === "lt" ? "A square is never negative, so the expression can never be less than zero, no matter the value of \\(x\\)"
    : "A square is never negative, and it equals zero only at \\(x = " + h + "\\), so that single value is the whole solution set";
  var solS = "The expression \\(" + stemS + "\\) is " + (Aq === 1 ? "" : Aq + " times ") + "a perfect square, \\(" + u8sqT(h) + "\\). " + reason + ". The solution is <b>" + optOf(corS) + "</b>.";
  return mcq("Solve the inequality \\(" + stemS + " " + U8SYM[sym] + " 0\\).",
    optOf(corS), disS.map(optOf), solS,
    { kind: "quad", A: Aq, B: -2 * Aq * h, C: Aq * h * h, sym: sym });
});

/* ---------- 4.26: read a quadratic solution set from a number line (L2) ---------- */
E("u8-numberline-quad", 8, ["4.26"], 2, "gen", function () {
  var r1 = ri(-6, 3), r2 = r1 + ri(2, 6);
  if (r2 > 7) r2 = 7;
  var region = pick(["between", "outside"]), incl = pick([true, false]);
  var sym = region === "between" ? (incl ? "le" : "lt") : (incl ? "ge" : "gt");
  var body = u8facB(r1) + u8facB(r2);
  var cor = body + " " + U8SYM[sym] + " 0";
  var dis = ["lt", "le", "gt", "ge"].filter(function (s) { return s !== sym; }).map(function (s) { return body + " " + U8SYM[s] + " 0"; });
  var q = mcq("The number line shows the solution set of a quadratic inequality. Which inequality has exactly this solution set?",
    u8wrap(cor), dis.map(u8wrap),
    "The endpoints are \\(" + r1 + "\\) and \\(" + r2 + ")\\), so the factors are \\(" + u8facB(r1) + "\\) and \\(" + u8facB(r2) + ")\\). The circles are " + (incl ? "filled, so the endpoints are included" : "open, so the endpoints are excluded") + ", and the shading lies " + (region === "between" ? "between the endpoints, where the product of the factors is negative" : "outside the endpoints, where the product of the factors is positive") + ". The inequality is <b>\\(" + cor + "\\)</b>.",
    { kind: "nlq", r1: r1, r2: r2, region: region, incl: incl, sym: sym });
  q.figure = u8Line2(r1, r2, region, incl);
  return q;
});

/* ---------- 4.20, 4.21: identify a quadratic inequality from its graph (L2) ---------- */
E("u8-quad-graph-id", 8, ["4.20", "4.21"], 1, "gen", function () {
  var h = ri(-3, 3), k = ri(-4, 3);
  if (h === 0 && k === 0) k = 2;
  var a = pick([1, -1]), dashed = pick([true, false]), above = pick([true, false]);
  var sym = above ? (dashed ? "gt" : "ge") : (dashed ? "lt" : "le");
  function fbody(hh, kk) { return (a === 1 ? "" : "-") + u8sqT(hh) + u8sgn(kk); }
  var cor = "y " + U8SYM[sym] + " " + fbody(h, k);
  var verr = h !== 0 ? fbody(-h, k) : fbody(h, -k);
  var dis = ["y " + U8SYM[u8flip(sym)] + " " + fbody(h, k),
             "y " + U8SYM[sym] + " " + verr,
             "y " + U8SYM[u8otherStrict(sym)] + " " + fbody(h, k)];
  var tp = k + (above ? 2 : -2);
  var sol = "The marked vertex is \\((" + h + ", " + k + ")\\), and the parabola opens " + (a === 1 ? "upward" : "downward") + ", so the boundary has equation \\(y = " + fbody(h, k) + "\\). The boundary is drawn " + (dashed ? "dashed, so the inequality is strict" : "solid, so the inequality includes equality") + ". The test point \\((" + h + ", " + tp + ")\\), straight " + (above ? "above" : "below") + " the vertex, lies in the shaded region, and it satisfies \\(y " + U8SYM[sym] + " " + fbody(h, k) + "\\). The inequality is <b>\\(" + cor + "\\)</b>.";
  var q = mcq("The shaded graph shows the solution region of a quadratic inequality. Which inequality is represented?",
    u8wrap(cor), dis.map(u8wrap), sol,
    { kind: "gid", h: h, k: k, a: a, sym: sym, dashed: dashed, above: above });
  q.figure = u8Para(h, k, a, dashed, above);
  return q;
});

/* ---------- 4.23: analyse a student's incorrect solution (L3) ---------- */
E("u8-error-analysis", 8, ["4.23"], 3, "gen", function () {
  var shape = pick(["region", "flip", "boundary"]);
  if (shape === "region") {
    var r1 = ri(-6, 3), r2 = r1 + ri(2, 6);
    if (r2 > 7) r2 = 7;
    var ineq = u8facB(r1) + u8facB(r2) + " > 0";
    var keyText = "The student chose the interval where the product is negative. A product greater than zero needs both factors to have the same sign, which happens on the two outer intervals.";
    var dis = ["The student should have reversed the inequality sign after dividing both sides by a negative number, which would have changed the direction of the final answer.",
               "The student excluded the endpoints, but the endpoints satisfy the inequality and should have been included in the final interval that is reported as the solution.",
               "The student used the wrong roots; the factors give roots of " + (r1 + 1) + " and " + (r2 - 1) + " instead, and the interval was taken from those wrong roots, so the endpoints of the answer are wrong as well."];
    return mcq("A student solves \\(" + ineq + "\\) and gives the solution \\(" + r1 + " < x < " + r2 + "\\). Which statement best describes the student's error?",
      keyText, dis,
      "Between \\(" + r1 + "\\) and \\(" + r2 + ")\\), one factor is positive and the other is negative, so the product is negative there, not positive. The product is positive when both factors are positive or both are negative: \\(x < " + r1 + "\\) or \\(x > " + r2 + "\\). <b>" + keyText + "</b>",
      { kind: "err", shape: shape, keyText: keyText });
  }
  if (shape === "flip") {
    var a = ri(2, 8), b = ri(-9, 9), k = ri(-7, 7);
    if (k === 0) k = 5;
    var sym = pick(["ge", "le"]), C = -a * k + b;
    var stem = u8linB(-a, b);
    var keyText2 = "Dividing both sides by a negative number reverses the inequality, so the sign should have been flipped in the last step.";
    var dis2 = ["The student made an arithmetic error when moving the constant term to the right side in the first step of the work.",
                "The endpoint should be excluded, because the final answer must use a strict inequality symbol rather than the one shown.",
                "The variable should have been isolated by first adding " + a + "x to both sides of the inequality before anything else was done."];
    var prompt = "A student solves \\(" + stem + " " + U8SYM[sym] + " " + C + "\\) with these steps: \\[ \\begin{aligned} " + stem + " &" + U8SYM[sym] + " " + C + " \\\\ " + (-a) + "x &" + U8SYM[sym] + " " + (C - b) + " \\\\ x &" + U8SYM[sym] + " " + k + " \\end{aligned} \\] Which statement best describes the error in the student's work?";
    return mcq(prompt, keyText2, dis2,
      "The arithmetic is correct up to the last step: \\(" + (-a) + "x " + U8SYM[sym] + " " + (C - b) + ")\\). Dividing by \\(" + (-a) + "\\) without reversing the symbol gives the stated answer, but division by a negative reverses the relation, so the correct final step is \\(x " + U8SYM[u8flip(sym)] + " " + k + "\\). <b>" + keyText2 + "</b>",
      { kind: "err", shape: shape, keyText: keyText2, a: a, b: b, C: C, sym: sym, k: k });
  }
  var bb = ri(-4, 4), cc = ri(-6, 6), bsym = pick(["gt", "lt"]);
  var fb = u8quadB(1, bb, cc);
  var keyText3 = bsym === "gt"
    ? "The boundary should be dashed, because the strict inequality does not include points on the parabola itself."
    : "The boundary should be dashed, because the strict inequality does not include points on the parabola itself.";
  var dis3 = bsym === "gt"
    ? ["The student shaded the wrong side; the region below the parabola is the one that satisfies the inequality.",
       "The parabola should open downward, because the inequality uses a greater-than symbol in the statement.",
       "The vertex of the parabola is in the wrong position, so the whole graph is shifted from where it belongs."]
    : ["The student shaded the wrong side; the region above the parabola is the one that satisfies the inequality.",
       "The parabola should open upward, because the inequality uses a less-than symbol in the given statement.",
       "The vertex of the parabola is in the wrong position, so the whole graph is shifted from where it belongs."];
  var sideWord = bsym === "gt" ? "above" : "below";
  return mcq("A student graphs \\(y " + U8SYM[bsym] + " " + fb + "\\) using a solid parabola, with the region " + sideWord + " the parabola shaded. Which statement best describes the student's error?",
    keyText3, dis3,
    "The shading is on the correct side: points " + sideWord + " the parabola have \\(y\\) values that satisfy \\(y " + U8SYM[bsym] + " " + fb + "\\). The mistake is the boundary itself. A strict symbol, \\(" + U8SYM[bsym] + "\\), excludes the points on the parabola, so it must be dashed. <b>" + keyText3 + "</b>",
    { kind: "err", shape: shape, keyText: keyText3 });
});

/* ---------- 4.25, 4.26: values that satisfy two quadratic inequalities (L3) ---------- */
E("u8-both-hold", 8, ["4.25", "4.26"], 3, "gen", function () {
  var pattern = pick(["overlap", "cross", "contain"]);
  var r1, r2, s1, s2, sym1 = "le", sym2, keyBody, solTail, spanDis;
  if (pattern === "overlap") {
    r1 = ri(-5, 0); s1 = r1 + ri(1, 3); r2 = s1 + ri(1, 3); s2 = r2 + ri(1, 3);
    sym2 = "lt";
    keyBody = "(" + s1 + ", " + r2 + "]";
    solTail = "greater than \\(" + s1 + "\\) (strictly, from the second inequality) and at most \\(" + r2 + "\\) (from the first)";
    spanDis = u8ivBetween(r1, s2, true);
  } else if (pattern === "cross") {
    r1 = ri(-5, 0); s1 = r1 - ri(1, 2); s2 = r1 + ri(1, 3); r2 = s2 + ri(1, 3);
    sym2 = "gt";
    keyBody = "(" + s2 + ", " + r2 + "]";
    solTail = "greater than \\(" + s2 + "\\) (from the outside part of the second solution) and at most \\(" + r2 + "\\) (from the first)";
    spanDis = "(" + s1 + ", " + r2 + "]";
  } else {
    r1 = ri(-6, -1); s1 = r1 + ri(1, 2); s2 = s1 + ri(2, 3); r2 = s2 + ri(1, 2);
    sym2 = "le";
    keyBody = u8ivBetween(s1, s2, true);
    solTail = "inside the second interval, which already lies inside the first, so the second interval is the overlap";
    spanDis = u8ivBetween(s1, r2, true);
  }
  var ineq1 = u8facB(r1) + u8facB(r2) + " " + U8SYM[sym1] + " 0";
  var ineq2 = u8facB(s1) + u8facB(s2) + " " + U8SYM[sym2] + " 0";
  var set1 = u8ivBetween(r1, r2, true);
  var set2 = pattern === "overlap" ? u8ivBetween(s1, s2, false)
    : pattern === "cross" ? u8ivOutside(s1, s2, false)
    : u8ivBetween(s1, s2, true);
  var flipDis = keyBody.replace("[", "(").replace("]", ")").replace("(", "TMP").replace("TMP", "[");
  if (pattern === "contain") flipDis = "(" + s1 + ", " + s2 + ")";
  else flipDis = "[" + keyBody.slice(1, -1) + ")";
  var dis = u8dist3(u8wrap(keyBody), [u8wrap(set1), u8wrap(flipDis), u8wrap(spanDis)]);
  var sol = "Solve each inequality on its own. The first gives \\(" + set1 + "\\), and the second gives \\(" + set2 + "\\). A value must lie in both sets at once, so it must be " + solTail + ". The values that satisfy both are <b>\\(" + keyBody + "\\)</b>.";
  return mcq("A value of \\(x\\) must satisfy both \\(" + ineq1 + "\\) and \\(" + ineq2 + "\\). Which interval gives all such values?",
    u8wrap(keyBody), dis, sol,
    { kind: "both", A1: 1, B1: -(r1 + r2), C1: r1 * r2, sym1: sym1, A2: 1, B2: -(s1 + s2), C2: s1 * s2, sym2: sym2 });
});

/* ---------- 4.16, 4.17: solve a one-variable inequality from a scenario (L2, CR 2) ----------
   Scenario arms reviewed Nov 13, 2026 (build order step 9): budget
   limits, grade-needed, savings goals and within-tolerance bands from
   the Pure Math 20 inequality files, written new. Whole-number answers
   are built boundary-first: the budget and the goal are set relative
   to the answer so the floor and ceiling behaviour is exact. */
E("u8-scenario-solve", 8, ["4.16", "4.17"], 2, "gen", function () {
  var shape = pick(["budget", "grade", "tolerance", "goal"]);
  if (shape === "budget") {
    var ctxs = [
      { who: "A grad committee", fixed: "hall rental", unit: "tickets", item: "dance tickets", verb: "sell" },
      { who: "A hockey team", fixed: "equipment fee", unit: "jerseys", item: "team jerseys", verb: "buy" },
      { who: "A caterer", fixed: "room fee", unit: "guests", item: "guest meals", verb: "serve" }
    ];
    var cx = pick(ctxs);
    var x = ri(4, 30), p = pick([6, 8, 9, 10, 12, 15, 20, 25]), F = pick([40, 60, 75, 80, 100, 120, 150, 200]);
    var r = ri(0, p - 1), B = F + p * x + r;
    var sol = "Let \\(x\\) be the number of " + cx.unit + ". The total cost is the fixed " + cx.fixed + " plus the per-unit cost: \\(" + p + "x + " + F + " \\le " + B + "\\). Solving: \\[ \\begin{aligned} " + p + "x + " + F + " &\\le " + B + " \\\\ " + p + "x &\\le " + (B - F) + " \\\\ x &\\le " + (x + r / p).toFixed(2).replace(/\.?0+$/, "") + " \\end{aligned} \\] The number of " + cx.unit + " must be a whole number, so at most \\(" + x + "\\) can be afforded (one more would cost $" + (F + p * (x + 1)) + ", over the $" + B + " budget). The greatest number is <b>" + x + "</b>.";
    return numq(cx.who + " has $" + B + " to spend. The " + cx.fixed + " is a fixed $" + F + ", and each of the " + cx.item + " costs $" + p + ". What is the greatest number of " + cx.unit + " that can be paid for?",
      x, 0.01, sol,
      { kind: "scen", shape: shape, p: p, F: F, B: B, ans: x });
  }
  if (shape === "grade") {
    var a, b, c, G, need, t = 0;
    do {
      a = ri(55, 98); b = ri(55, 98); c = ri(55, 98); G = pick([70, 75, 80, 85]);
      need = 4 * G - (a + b + c); t++;
    } while (t < 300 && (need < 30 || need > 100));
    if (t >= 300) { a = 78; b = 84; c = 82; G = 80; need = 76; }
    var sum = a + b + c;
    var sol = "Let \\(x\\) be the score on the fourth test. The average of the four tests must reach the goal: \\(\\frac{" + sum + " + x}{4} \\ge " + G + "\\). Solving: \\[ \\begin{aligned} " + sum + " + x &\\ge " + (4 * G) + " \\\\ x &\\ge " + need + " \\end{aligned} \\] A score of \\(" + (need - 1) + "\\) would leave the average at \\(" + ((sum + need - 1) / 4) + "\\), just short, so the minimum score needed is <b>" + need + "</b>.";
    return numq("A student has written three tests, scoring " + a + ", " + b + " and " + c + " out of 100. The student wants the average of the four tests to be at least " + G + ". What is the minimum score the student needs on the fourth test?",
      need, 0.01, sol,
      { kind: "scen", shape: shape, sum: sum, G: G, ans: need });
  }
  if (shape === "tolerance") {
    var dec = Math.random() < 0.5;
    var cx2, cc, tt;
    if (dec) {
      var pr = pick([[25, 0.4, "mm"], [40, 0.25, "mm"], [12.5, 0.3, "cm"], [60, 0.75, "mm"], [8.5, 0.15, "cm"]]);
      cx2 = pick([
        "A machined pin must have a diameter of " + pr[0] + " " + pr[2] + ", within " + pr[1] + " " + pr[2] + " of the target",
        "A cut board must have a length of " + pr[0] + " " + pr[2] + ", within " + pr[1] + " " + pr[2] + " of the target"
      ]);
      cc = pr[0]; tt = pr[1];
    } else {
      var pr2 = pick([[500, 6, "mL"], [750, 10, "mL"], [2000, 25, "g"], [1000, 15, "g"]]);
      cx2 = pick([
        "A bottling machine fills bottles with a target of " + pr2[0] + " " + pr2[2] + ", within " + pr2[1] + " " + pr2[2] + " of the target",
        "A scale packs bags with a target mass of " + pr2[0] + " " + pr2[2] + ", within " + pr2[1] + " " + pr2[2] + " of the target"
      ]);
      cc = pr2[0]; tt = pr2[1];
    }
    var hi = Math.round((cc + tt) * 100) / 100, lo = Math.round((cc - tt) * 100) / 100;
    var askHi = Math.random() < 0.5, ans = askHi ? hi : lo;
    var sol = "Within \\(" + tt + "\\) of the target means the measurement \\(x\\) satisfies \\(|x - " + cc + "| \\le " + tt + "\\), the two-sided band \\[ " + lo + " \\le x \\le " + hi + " \\] Every value in this band is acceptable, and the endpoints themselves are included because \"within\" allows equality. The " + (askHi ? "greatest" : "least") + " acceptable measurement is <b>" + fmt(ans) + "</b>.";
    return numq(cx2 + ". What is the " + (askHi ? "greatest" : "least") + " acceptable measurement?",
      ans, 0.01, sol,
      { kind: "scen", shape: shape, c: cc, t: tt, askHi: askHi, ans: ans });
  }
  var ctxs3 = [
    { who: "Riley", have: "has saved", earn: "washing cars", item: "a bicycle", per: "week" },
    { who: "Jae", have: "has saved", earn: "mowing lawns", item: "a laptop", per: "week" },
    { who: "Priya", have: "has saved", earn: "babysitting", item: "a class trip", per: "week" }
  ];
  var cx3 = pick(ctxs3);
  var x3 = ri(2, 20), w = pick([15, 20, 25, 30, 40, 50]), S = pick([0, 25, 40, 60, 80, 100, 120]);
  var G3 = S + w * (x3 - 1) + ri(1, w);
  var sol3 = "Let \\(x\\) be the number of weeks. The savings reach the goal when \\(" + S + " + " + w + "x \\ge " + G3 + "\\). Solving: \\[ \\begin{aligned} " + w + "x &\\ge " + (G3 - S) + " \\\\ x &\\ge " + ((G3 - S) / w).toFixed(2).replace(/\.?0+$/, "") + " \\end{aligned} \\] A fraction of a week does not finish the saving, so round up: after \\(" + (x3 - 1) + "\\) weeks the savings are $" + (S + w * (x3 - 1)) + ", still short of $" + G3 + ". The number of weeks needed is <b>" + x3 + "</b>.";
  return numq(cx3.who + " " + cx3.have + " $" + S + " and earns $" + w + " per " + cx3.per + " " + cx3.earn + ". How many weeks until " + cx3.who + " can afford " + cx3.item + " costing $" + G3 + "?",
    x3, 0.01, sol3,
    { kind: "scen", shape: shape, S: S, w: w, G: G3, ans: x3 });
});

/* Prior knowledge flags (Nov 13, 2026): the entries named
   below assess Math 9 one-variable linear inequality outcomes (indicators 8.24, 8.26 and 8.27), and nothing on this
   course's indicator list (Jason's assessed-target standard;
   see the prior knowledge audit and its re-test). The pkFlag
   property is set here in the bank module the way the enrich
   flags are set in Math 2201's bank-u7.js; assembly carries
   it into banks/math-2200.js verbatim, and the shell's isPK
   reads it alongside PK-coded indicators. Flagged entries
   stay in practice pools by default and leave them only
   when a teacher turns prior knowledge off in Advanced
   tools. */
BANK.forEach(function(e){if(["u8-solve-linear-basic","u8-solve-linear-flip","u8-numberline-read"].indexOf(e.id)>=0)e.pkFlag=true;});

/* ============ Prior knowledge tranche (Nov 15, 2026) ============ */
/* Borrowed verbatim from the feeder banks named in the source
   comments and the PKT table below, plus authored micro-items
   where the prior knowledge map names a skill no feeder entry
   assesses. Spec: Math-2200-PK-Tranche-Spec-2026-11-15.md. */

/* u8-pk-graph-to-ineq: borrowed verbatim from math-9 entry u5-graph-to-ineq (math-9:8.24). */
E("u8-pk-graph-to-ineq",8,["4.24"], 1, "gen", function () {
  var k = ri(-8, 8), r = pick(["lt", "gt", "le", "ge"]);
  var closed = (r === "le" || r === "ge"), dir = (r === "gt" || r === "ge") ? "right" : "left";
  var corr = n5ineqTex("x", r, fmt(k));
  var others = ["lt", "gt", "le", "ge"].filter(function (s) { return s !== r; });
  var fbMap = { lt: "That uses a strict sign the wrong way for this graph; check the circle and the shading direction.", gt: "That points the shading the wrong way or uses the wrong circle for this graph.", le: "That does not match both the circle type and the shading direction in the graph.", ge: "That does not match both the circle type and the shading direction in the graph." };
  var ds = others.map(function (s) { return { t: n5ineqTex("x", s, fmt(k)), fb: fbMap[s] }; });
  var sol = "The circle sits at \\(" + fmt(k) + "\\), it is " + (closed ? "closed, so the endpoint is included and the sign has an equals part" : "open, so the endpoint is not included and the sign is strict") + ", and the shading goes to the " + dir + ". So the graph represents <b>" + corr + "</b>.";
  var q = mcq("The number line in the diagram graphs an inequality. Which inequality does the graph represent?", { t: corr, fb: "Correct: the circle type, its position and the shading direction all match." }, ds, sol, { mode: "graph-to-ineq", r: r, k: k });
  q.figure = n5line(k, closed, dir);
  return q;
}, ["Read the graph in three parts: where the circle sits, whether it is open or closed, and which way the shading goes.", "First find the number under the circle; that is the boundary value in every choice."]);

/* u8-pk-graph-boundary: borrowed verbatim from math-9 entry u5-graph-boundary (math-9:8.24). */
E("u8-pk-graph-boundary",8,["4.24"], 1, "gen", function () {
  var k = ri(-9, 9), r = pick(["lt", "gt", "le", "ge"]);
  var closed = (r === "le" || r === "ge"), dir = (r === "gt" || r === "ge") ? "right" : "left";
  var sol = "The circle always sits on the boundary value of the inequality, the number the variable is compared with: \\[ \\begin{aligned} x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(k) + " \\end{aligned} \\] So the circle sits on <b>" + fmt(k) + "</b>.";
  return numq("The inequality \\(" + "x " + n5sym(r) + " " + fmt(k) + "\\) is graphed on a number line. The graph has a" + (closed ? " closed" : "n open") + " circle and the shading goes to the " + dir + ". On what number does the circle sit?", k, 0.01, sol, { mode: "boundary", r: r, k: k });
}, ["The circle sits on the number the variable is compared with in the inequality.", "First find the constant on the other side of the inequality sign from x."]);

/* u8-pk-solve-ineq-pos-div: borrowed verbatim from math-9 entry u5-solve-ineq-pos-div (math-9:8.26). */
E("u8-pk-solve-ineq-pos-div",8,["4.24"], 2, "gen", function () {
  var a = ri(2, 8), k = ri(-6, 9), b = ri(-11, 11); if (b === 0) b = 4;
  var c = a * k + b, r = pick(["lt", "gt", "le", "ge"]), fr = n5flip(r);
  var alt = n5fracTex(c + b, a);
  var corr = n5ineqTex("x", r, fmt(k));
  var ds = [
    { t: n5ineqTex("x", fr, fmt(k)), fb: "The boundary is right, but dividing by a positive number keeps the sign direction; it does not flip." },
    { t: n5ineqTex("x", r, alt), fb: "That boundary comes from moving the constant the wrong way before dividing." },
    { t: n5ineqTex("x", fr, alt), fb: "That has both slips: the constant was moved the wrong way and the sign was flipped needlessly." }
  ];
  var sol = "Isolate x step by step; the divisor is positive, so the sign stays as it is: \\[ \\begin{aligned} " + n5lin(a, b) + " &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(c) + " \\\\ " + fmt(a) + "x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(c - b) + " \\\\ x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(k) + " \\end{aligned} \\] So the solution is <b>" + corr + "</b>.";
  return mcq("Solve the inequality \\(" + n5lin(a, b) + " " + n5sym(r) + " " + fmt(c) + "\\). Which inequality is the solution?", { t: corr, fb: "Correct: the constant was undone, then both sides were divided by the positive coefficient." }, ds, sol, { mode: "pos-div", a: a, b: b, c: c, r: r });
}, ["Solve it like the matching equation, and remember dividing by a positive number never flips the sign.", "First undo the constant term, then divide both sides by the coefficient of x."]);

/* u8-pk-solve-ineq-two-step: borrowed verbatim from math-9 entry u5-solve-ineq-two-step-choose (math-9:8.27). */
E("u8-pk-solve-ineq-two-step",8,["4.24"], 2, "gen", function () {
  var a = ri(2, 8), k = ri(-6, 9), b = ri(2, 11), c = a * k - b, r = pick(["lt", "gt", "le", "ge"]), fr = n5flip(r);
  var alt = n5fracTex(c - b, a);
  var corr = n5ineqTex("x", r, fmt(k));
  var ds = [
    { t: n5ineqTex("x", fr, fmt(k)), fb: "The boundary is right, but nothing here flips the sign: the coefficient of x is positive." },
    { t: n5ineqTex("x", r, alt), fb: "That boundary comes from subtracting the constant again instead of adding it back." },
    { t: n5ineqTex("x", fr, alt), fb: "That has both slips: the constant was handled the wrong way and the sign was flipped needlessly." }
  ];
  var sol = "Undo the subtraction by adding to both sides, then divide by the positive coefficient: \\[ \\begin{aligned} " + fmt(a) + "x-" + fmt(b) + " &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(c) + " \\\\ " + fmt(a) + "x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(c + b) + " \\\\ x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(k) + " \\end{aligned} \\] So the fully correct solution is <b>" + corr + "</b>.";
  return mcq("Which inequality is the fully correct solution of \\(" + fmt(a) + "x - " + fmt(b) + " " + n5sym(r) + " " + fmt(c) + "\\)?", { t: corr, fb: "Correct: both steps are right and the sign direction is unchanged." }, ds, sol, { mode: "two-step-choose", a: a, b: b, c: c, r: r });
}, ["Work the solution yourself, one step at a time, then match it against the choices.", "First undo the constant term by adding it to both sides, then divide."]);

/* u8-pk-context-graph: borrowed verbatim from math-9 entry u5-context-graph (math-9:8.30). */
E("u8-pk-context-graph",8,["4.19"], 1, "gen", function () {
  var ctxs = [
    { v: "s", r: "le", text: function (k) { return "A school club can spend at most $" + fmt(k) + " on supplies. Let s be the amount spent, in dollars."; } },
    { v: "a", r: "ge", text: function (k) { return "Riders must be at least " + fmt(k) + " cm tall for a certain ride. Let a be a rider's height, in centimetres."; } },
    { v: "p", r: "lt", text: function (k) { return "Each piece cut from a board must be shorter than " + fmt(k) + " cm. Let p be the length of a piece, in centimetres."; } },
    { v: "g", r: "gt", text: function (k) { return "A team needs to score more than " + fmt(k) + " points to advance. Let g be the points the team scores."; } }
  ];
  var cx = pick(ctxs), k = ri(6, 40) * pick([1, 1, 2, 5]);
  var closed = (cx.r === "le" || cx.r === "ge"), dir = (cx.r === "gt" || cx.r === "ge") ? "right" : "left";
  var corr = n5ineqTex(cx.v, cx.r, fmt(k));
  var others = ["lt", "gt", "le", "ge"].filter(function (s) { return s !== cx.r; });
  var ds = others.map(function (s) { return { t: n5ineqTex(cx.v, s, fmt(k)), fb: "That inequality does not match the graph: check the circle type and the shading direction against the story." }; });
  var sol = "The story gives the boundary \\(" + fmt(k) + "\\), and the graph shows a " + (closed ? "closed" : "open") + " circle there with shading to the " + dir + ". So the inequality for the situation is <b>" + corr + "</b>.";
  var q = mcq(cx.text(k) + " The number line in the diagram graphs the amounts that fit the situation. Which inequality describes the situation?", { t: corr, fb: "Correct: the variable, boundary, circle type and shading direction all match the story." }, ds, sol, { mode: "context-graph", r: cx.r, k: k, v: cx.v });
  q.figure = n5line(k, closed, dir);
  return q;
}, ["Translate the story into an inequality, then check it against the circle and shading in the graph.", "First find the boundary number in the story; the graph circle sits on that same number."]);

/* Bimodal build additions (Nov 19, 2026): one written-form Level 2 entry (5 marks) solving a two-variable inequality in a fundraising context, and one selected-response Level 2 entry on boundary type and shading for a quadratic inequality. SME-flagged for the specialist pass. */

/* u8-wcr-ticket-fundraiser: written form, 5 marks. Model the amount raised
   with an inequality, solve for the number of adult tickets, and round up
   because tickets are sold whole. */
E("u8-wcr-ticket-fundraiser",8,["4.19"],2,"gen",function(){
  var A=ri(8,15), S=ri(3,7), y0=ri(20,60), x0=ri(30,80), extra=ri(1,A-1);
  var T=A*x0+S*y0+extra;
  var need=T-S*y0, ans=Math.ceil(need/A);
  return numq("A school council sells adult tickets for $"+A+" each and student tickets for $"+S+" each to raise money for a trip. The council must raise at least $"+T+". The council has already sold "+y0+" student tickets. What is the minimum number of adult tickets the council must sell to reach its goal?",
    ans,0.01,
    "Let \\(x\\) be the number of adult tickets sold. The amount raised is \\("+A+"x + "+S+"("+y0+")\\) dollars, and it must be at least \\("+T+"\\): \\[ \\begin{aligned} "+A+"x + "+(S*y0)+" &\\ge "+T+" \\\\ "+A+"x &\\ge "+need+" \\\\ x &\\ge "+fmt(need/A,2)+" \\end{aligned} \\] Tickets are sold whole, so the number of adult tickets must be rounded up to the next whole number. The minimum number of adult tickets is <b>"+ans+"</b>.",
    {A:A,S:S,y0:y0,T:T,need:need,ans:ans});
});

/* u8-add-boundary-shading: boundary type (solid or dashed) and shaded side
   for the graph of a quadratic inequality in two variables. */
E("u8-add-boundary-shading",8,["4.21","4.22"],2,"gen",function(){
  var h=ri(-3,3), k=ri(-4,4);
  if(h===0&&k===0) k=2;
  var a=pick([1,-1]), sym=pick(["lt","le","gt","ge"]);
  var dashed=(sym==="lt"||sym==="gt"), above=(sym==="gt"||sym==="ge");
  var fbody=(a===1?"":"-")+u8sqT(h)+u8sgn(k);
  function desc(d,ab){ return "A "+(d?"dashed":"solid")+" curve, with the region "+(ab?"above":"below")+" the curve shaded"; }
  var key=desc(dashed,above);
  var dis=[desc(!dashed,above), desc(dashed,!above), desc(!dashed,!above)];
  return mcq("A student is about to sketch the graph of \\(y "+U8SYM[sym]+" "+fbody+"\\). Which description matches the correct graph?",
    key, dis,
    "The symbol \\("+U8SYM[sym]+"\\) "+(dashed?"is strict, so points on the parabola itself are not included and the boundary is dashed":"includes equality, so points on the parabola itself are included and the boundary is solid")+". The inequality asks for \\(y\\) values "+(above?"greater than":"less than")+" the values on the parabola, which lie "+(above?"above":"below")+" the curve, so that region is shaded. The correct description is <b>"+key+"</b>.",
    {h:h,k:k,a:a,sym:sym});
});

/* PK tranche pass for Unit 8. pkFor is the cluster's dependent
   indicator list from the prior knowledge map, as registered
   for this unit in courses.js. */
var PKT_U8_FOR=["4.16","4.17","4.18","4.19","4.20","4.21","4.22","4.23","4.24","4.25","4.26"];
var PKT_U8={
 "u8-pk-graph-to-ineq":{src:"math-9:8.24",group:"inequality-graphing"},
 "u8-pk-graph-boundary":{src:"math-9:8.24",group:"inequality-graphing"},
 "u8-pk-solve-ineq-pos-div":{src:"math-9:8.26",group:"inequality-solving"},
 "u8-pk-solve-ineq-two-step":{src:"math-9:8.27",group:"inequality-solving"},
 "u8-pk-context-graph":{src:"math-9:8.30",group:"inequality-context"}
};
BANK.forEach(function(e){var t=PKT_U8[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U8_FOR.slice();e.pkGroup=t.group;}});

/* PK tranche metadata completion for Unit 8 (Nov 15, 2026): the
   three entries flagged in the Nov 13, 2026 pass above gain their
   pkSrc, pkFor and pkGroup records. They are not retagged and not
   reflagged; the flag pass above already set pkFlag. */
var PKT_U8_META={
 "u8-solve-linear-basic":{src:"math-9:8.27",group:"inequality-solving"},
 "u8-solve-linear-flip":{src:"math-9:8.26",group:"inequality-solving"},
 "u8-numberline-read":{src:"math-9:8.24",group:"inequality-graphing"}};
BANK.forEach(function(e){var t=PKT_U8_META[e.id];if(t){e.pkSrc=t.src;e.pkFor=PKT_U8_FOR.slice();e.pkGroup=t.group;}});

/* ----- bank-u9.js ----- */
// Math 2200 Unit 9 Sequences and Series question bank
// CRMARKS: u9-arith-diff=1
// CRMARKS: u9-arith-find-missing=2
// CRMARKS: u9-arith-general-term=2
// CRMARKS: u9-arith-graph-link=2
// CRMARKS: u9-arith-nth-count=2
// CRMARKS: u9-arith-series-context=2
// CRMARKS: u9-arith-sum-formula=2
// CRMARKS: u9-crossover=3
// CRMARKS: u9-evaluate-offers=3
// CRMARKS: u9-geo-find-index=2
// CRMARKS: u9-geo-nth-term=2
// CRMARKS: u9-geo-ratio=1
// CRMARKS: u9-geo-sum-finite=2
// CRMARKS: u9-infinite-sum=2
// CRMARKS: u9-wcr-geo-two-terms=4
// CRMARKS: u9-wcr-geo-series-views=5
// BIMODAL: u9-infinite-sum=a
// BIMODAL: u9-arith-graph-link=b
// BIMODAL: u9-arith-general-term=b
/* ================= Unit 9: Sequences and Series ================= */
/* ================= Unit 9: Sequences and Series =================
   Helpers are prefixed u9; the only other top-level statements are E(...) calls.
   16 entries: L1 3, L2 10, L3 3. Codes: MA2200.4.55 to 4.71 (stored in the
   short form "4.55" etc., as elsewhere in this bank). All angles-free exact
   arithmetic: sums and terms are kept as reduced fractions wherever the
   parameters produce them, and infinite series use only |r| < 1. */

function u9gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }

function u9fr(n, d) { /* signed reduced fraction as a KaTeX body (no delimiters) */
  if (d < 0) { n = -n; d = -d; }
  if (n === 0) return "0";
  var g = u9gcd(n, d); n /= g; d /= g;
  var s = n < 0 ? "-" : ""; n = Math.abs(n);
  if (d === 1) return s + n;
  return s + "\\frac{" + n + "}{" + d + "}";
}

function u9dist3(correct, cands) { /* first three candidate strings that differ from the key and each other */
  var out = [];
  for (var i = 0; i < cands.length; i++) {
    var c = cands[i];
    if (c !== null && c !== undefined && c !== correct && out.indexOf(c) < 0) out.push(c);
    if (out.length === 3) break;
  }
  return out;
}

function u9lin(d, c) { /* body of a linear expression dn + c, e.g. "3n - 4", "n + 2", "-n", "5n" */
  var co = d === 1 ? "n" : d === -1 ? "-n" : d + "n";
  if (c === 0) return co;
  return co + (c > 0 ? " + " + c : " - " + (-c));
}

function u9ord(n) { /* 4 -> "4th", 21 -> "21st" */
  var s = ["th", "st", "nd", "rd"], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function u9money(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }

function u9arithTerms(t1n, t1d, dn, dd, count) { /* formatted first `count` terms of an arithmetic sequence */
  var out = [], den = t1d * dd;
  for (var k = 0; k < count; k++) out.push(u9fr(t1n * dd + k * dn * t1d, den));
  return out;
}

function u9geoTerms(t1, rn, rd, count) { /* formatted first `count` terms of a geometric sequence with integer first term */
  var out = [], num = t1, den = 1;
  for (var k = 0; k < count; k++) {
    out.push(u9fr(num, den));
    num *= rn; den *= rd;
    var g = u9gcd(num, den); num /= g; den /= g;
  }
  return out;
}

/* ---- 4.55, 4.57: common difference of an arithmetic sequence ---- */
E("u9-arith-diff", 9, ["4.55", "4.57"], 1, "gen", function () {
  var D = [[2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [-2, 1], [-3, 1], [-4, 1], [-5, 1], [-6, 1],
           [1, 2], [3, 2], [5, 2], [7, 2], [-1, 2], [-3, 2], [-5, 2]];
  var dp = pick(D), dn = dp[0], dd = dp[1];
  var t1n = ri(-12, 20), t1d = pick([1, 1, 2]);
  if (t1d === 2 && t1n % 2 === 0) t1n += 1;
  var terms = u9arithTerms(t1n, t1d, dn, dd, 5);
  var key = "\\(" + u9fr(dn, dd) + "\\)";
  var cands = [[dn + dd, dd], [dn - dd, dd], [-dn, dd], [2 * dn, dd], [dn, 2 * dd], [dn + 2 * dd, dd]]
    .map(function (p) { return "\\(" + u9fr(p[0], p[1]) + "\\)"; });
  var dis = u9dist3(key, cands);
  var prompt = "An arithmetic sequence begins \\(" + terms.join(", ") + ", \\ldots\\) What is the common difference?";
  var sol = "The common difference is the amount added to get from one term to the next. Subtract the first two terms:"
    + "\\[ \\begin{aligned} d &= t_2 - t_1 \\\\ &= " + terms[1] + " - \\left(" + terms[0] + "\\right) \\\\ &= " + u9fr(dn, dd) + " \\end{aligned} \\]"
    + "Every later pair of terms differs by the same amount, so the common difference is \\(" + u9fr(dn, dd) + "\\).";
  return mcq(prompt, key, dis, sol, { t1n: t1n, t1d: t1d, dn: dn, dd: dd });
});

/* ---- 4.63, 4.65: common ratio of a geometric sequence ---- */
E("u9-geo-ratio", 9, ["4.63", "4.65"], 1, "gen", function () {
  var RT = [
    { rn: 2, rd: 1, t1: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }, { rn: 3, rd: 1, t1: [1, 2, 3, 4, 5, 6, 7, 8] },
    { rn: 4, rd: 1, t1: [1, 2, 3, 4, 5] }, { rn: 5, rd: 1, t1: [2, 3, 4] },
    { rn: -2, rd: 1, t1: [2, 3, 4, 5, 6, 7, 8, 9] }, { rn: -3, rd: 1, t1: [1, 2, 3, 4, 5] },
    { rn: 1, rd: 2, t1: [16, 24, 32, 48, 64, 96, 128] }, { rn: 1, rd: 3, t1: [27, 54, 81, 108] },
    { rn: 2, rd: 3, t1: [54, 81, 162, 243] }, { rn: -1, rd: 2, t1: [16, 32, 48, 64, 96] }
  ];
  var c = pick(RT), t1 = pick(c.t1);
  var terms = u9geoTerms(t1, c.rn, c.rd, 5);
  var key = "\\(" + u9fr(c.rn, c.rd) + "\\)";
  var cands = [[c.rd, c.rn], [-c.rn, c.rd], [c.rn + c.rd, c.rd], [2 * c.rn, c.rd], [c.rn, c.rd + c.rn]]
    .map(function (p) { return "\\(" + u9fr(p[0], p[1]) + "\\)"; });
  var dis = u9dist3(key, cands);
  var prompt = "A geometric sequence begins \\(" + terms.join(", ") + ", \\ldots\\) What is the common ratio?";
  var sol = "The common ratio is the quotient of two consecutive terms:"
    + "\\[ \\begin{aligned} r &= \\frac{t_2}{t_1} \\\\ &= \\frac{" + terms[1] + "}{" + terms[0] + "} \\\\ &= " + u9fr(c.rn, c.rd) + " \\end{aligned} \\]"
    + "Dividing any term by the term before it gives the same quotient, so the common ratio is \\(" + u9fr(c.rn, c.rd) + "\\).";
  return mcq(prompt, key, dis, sol, { t1: t1, rn: c.rn, rd: c.rd });
});

/* ---- 4.70, 4.71: does an infinite geometric series converge? ---- */
E("u9-converge-check", 9, ["4.70", "4.71"], 1, "gen", function () {
  var CASES = [
    { rn: 1, rd: 2, t1: [8, 12, 16, 24, 40], cat: "conv" }, { rn: 3, rd: 4, t1: [64, 128], cat: "conv" },
    { rn: 2, rd: 3, t1: [81], cat: "conv" }, { rn: 1, rd: 3, t1: [54], cat: "conv" },
    { rn: -1, rd: 2, t1: [24, 32], cat: "convNeg" }, { rn: -3, rd: 4, t1: [64], cat: "convNeg" },
    { rn: -2, rd: 3, t1: [81], cat: "convNeg" }, { rn: -1, rd: 5, t1: [125], cat: "convNeg" },
    { rn: 3, rd: 2, t1: [8, 16], cat: "divPos" }, { rn: 5, rd: 4, t1: [64], cat: "divPos" },
    { rn: 4, rd: 3, t1: [81], cat: "divPos" }, { rn: 2, rd: 1, t1: [3, 4, 5, 6, 7, 8, 9], cat: "divPos" },
    { rn: -2, rd: 1, t1: [2, 3, 4, 5, 6, 7, 8], cat: "divNeg" }, { rn: -4, rd: 3, t1: [81], cat: "divNeg" },
    { rn: 1, rd: 1, t1: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12], cat: "one" },
    { rn: -1, rd: 1, t1: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12], cat: "negOne" }
  ];
  var OPTS = {
    conv: { key: "It converges, because \\(|r| < 1\\): the partial sums approach one fixed value.",
      dis: ["It diverges, because a series with infinitely many terms cannot settle on a finite sum.",
            "It diverges, because the ratio must be a whole number for a sum to exist.",
            "It converges, because every ratio below 1 produces a sum for the series."] },
    convNeg: { key: "It converges, because \\(|r| < 1\\), even though the terms alternate in sign.",
      dis: ["It diverges, because the terms alternate in sign as the series goes on.",
            "It diverges, because the common ratio is negative, so no sum can exist.",
            "It converges, because every negative ratio produces a sum for the series."] },
    divPos: { key: "It diverges, because \\(|r| > 1\\): the terms grow in size, so the partial sums never approach a value.",
      dis: ["It converges, because the common ratio is positive, so the terms keep the same sign throughout.",
            "It converges, because each term is built from the one before it by the same rule, from the first term onward.",
            "It diverges, because the first term is positive and the terms grow steadily from there."] },
    divNeg: { key: "It diverges, because \\(|r| > 1\\): the terms grow in size as they alternate in sign.",
      dis: ["It converges, because the positive and negative terms cancel each other out.",
            "It converges, because the common ratio is less than 1, so the terms shrink.",
            "It diverges, because every negative ratio produces a diverging series, whatever its size."] },
    one: { key: "It diverges, because \\(r = 1\\): the partial sums grow by the same amount every step.",
      dis: ["It converges, because the terms are constant, so the sum settles quickly.",
            "It converges to the value of the first term, since the terms never change from term to term.",
            "It diverges, because the ratio must be a fraction for a sum to exist at all."] },
    negOne: { key: "It diverges, because \\(r = -1\\): the partial sums alternate between two values and never settle.",
      dis: ["It converges to 0, because the terms cancel in pairs as they are added up, one after another.",
            "It converges, because the size of the ratio is not greater than 1 in this case.",
            "It diverges, because every negative ratio produces a diverging series in the end, whatever the terms are."] }
  };
  var c = pick(CASES), t1 = pick(c.t1);
  var terms = u9geoTerms(t1, c.rn, c.rd, 4);
  var o = OPTS[c.cat];
  var prompt = "A geometric series begins \\(" + terms.join(", ") + ", \\ldots\\) and continues with the same pattern forever. Which statement about the series is correct?";
  var sol = "The common ratio is \\(r = \\dfrac{t_2}{t_1} = " + u9fr(c.rn, c.rd) + "\\), so \\(|r| = " + u9fr(Math.abs(c.rn), c.rd) + "\\). "
    + (c.cat === "conv" || c.cat === "convNeg"
      ? "Since \\(|r| < 1\\), the terms shrink toward 0 and the partial sums approach one fixed value: the series converges."
      : c.cat === "one"
        ? "With \\(r = 1\\) every term equals the first, so each partial sum is larger than the last: the series diverges."
        : c.cat === "negOne"
          ? "With \\(r = -1\\) the partial sums alternate between \\(" + terms[0] + "\\) and 0, never settling on one value: the series diverges."
          : "Since \\(|r| > 1\\), the terms grow in size instead of shrinking toward 0, so the partial sums never approach a value: the series diverges.")
    + " The correct statement is: <b>" + o.key + "</b>";
  return mcq(prompt, o.key, o.dis, sol, { t1: t1, rn: c.rn, rd: c.rd, cat: c.cat });
});

/* ---- 4.57, 4.58: general term of an arithmetic sequence ---- */
E("u9-arith-general-term", 9, ["4.57", "4.58"], 2, "gen", function () {
  var t1 = ri(-9, 15); while (t1 === 0) t1 = ri(-9, 15);
  var d = ri(-6, 9); while (d === 0) d = ri(-6, 9);
  var terms = u9arithTerms(t1, 1, d, 1, 4);
  var key = "\\(t_n = " + u9lin(d, t1 - d) + "\\)";
  var cands = [u9lin(d, t1), u9lin(t1, d), u9lin(d, t1 + d), u9lin(-d, t1 - d), u9lin(d, -(t1 - d))]
    .map(function (s) { return "\\(t_n = " + s + "\\)"; });
  var dis = u9dist3(key, cands);
  var prompt = "An arithmetic sequence begins \\(" + terms.join(", ") + ", \\ldots\\) What is the general term of the sequence?";
  var sol = "The common difference is \\(d = " + terms[1] + " - " + terms[0] + " = " + d + "\\). Start from \\(t_n = t_1 + (n - 1)d\\) and expand:"
    + "\\[ \\begin{aligned} t_n &= " + t1 + " + (n - 1)(" + d + ") \\\\ &= " + u9lin(d, t1 - d) + " \\end{aligned} \\]"
    + "Checking with \\(n = 1\\): \\(" + u9lin(d, t1 - d) + "\\) gives \\(" + terms[0] + "\\) when \\(n = 1\\), as it should.";
  return mcq(prompt, key, dis, sol, { t1: t1, d: d });
});

/* ---- 4.55, 4.56, 4.59: a later term, or the term number of a given value ---- */
E("u9-arith-nth-count", 9, ["4.55", "4.56", "4.59"], 2, "gen", function () {
  var t1 = ri(-12, 30);
  var d = ri(-9, 10); while (d === 0) d = ri(-9, 10);
  if (Math.random() < 0.5) {
    var n = ri(6, 30), ans = t1 + (n - 1) * d;
    var promptA = "An arithmetic sequence has first term \\(" + t1 + "\\) and common difference \\(" + d + "\\). Find the value of the " + u9ord(n) + " term.";
    var solA = "Use \\(t_n = t_1 + (n - 1)d\\) with \\(n = " + n + "\\):"
      + "\\[ \\begin{aligned} t_{" + n + "} &= " + t1 + " + (" + n + " - 1)(" + d + ") \\\\ &= " + t1 + " + " + ((n - 1) * d) + " \\\\ &= " + ans + " \\end{aligned} \\]";
    return numq(promptA, ans, 0.01, solA, { mode: "term", t1: t1, d: d, n: n });
  }
  var k = ri(8, 40), v = t1 + (k - 1) * d;
  var promptB = "An arithmetic sequence has first term \\(" + t1 + "\\) and common difference \\(" + d + "\\). One of the terms of the sequence is \\(" + v + "\\). Find its term number.";
  var solB = "Set the general term equal to \\(" + v + "\\) and solve for \\(n\\):"
    + "\\[ \\begin{aligned} t_1 + (n - 1)d &= " + v + " \\\\ " + t1 + " + (n - 1)(" + d + ") &= " + v + " \\\\ (n - 1)(" + d + ") &= " + (v - t1) + " \\\\ n - 1 &= " + (k - 1) + " \\\\ n &= " + k + " \\end{aligned} \\]"
    + "So \\(" + v + "\\) is the " + u9ord(k) + " term.";
  return numq(promptB, k, 0.01, solB, { mode: "count", t1: t1, d: d, n: k });
});

/* ---- 4.61: sum of the first n terms of an arithmetic sequence ---- */
E("u9-arith-sum-formula", 9, ["4.61"], 1, "gen", function () {
  var t1 = ri(-15, 30);
  var d = ri(-8, 10); while (d === 0) d = ri(-8, 10);
  var n = ri(8, 40);
  var S = n * (2 * t1 + (n - 1) * d) / 2;
  var tn = t1 + (n - 1) * d;
  var prompt = "Find the sum of the first \\(" + n + "\\) terms of the arithmetic sequence with first term \\(" + t1 + "\\) and common difference \\(" + d + "\\).";
  var sol = "First find the last term needed, then use \\(S_n = \\dfrac{n}{2}(t_1 + t_n)\\):"
    + "\\[ \\begin{aligned} t_{" + n + "} &= " + t1 + " + (" + n + " - 1)(" + d + ") = " + tn + " \\\\ S_{" + n + "} &= \\frac{" + n + "}{2}\\left(" + t1 + " + " + tn + "\\right) \\\\ &= " + S + " \\end{aligned} \\]";
  return numq(prompt, S, 0.01, sol, { t1: t1, d: d, n: n });
});

/* ---- 4.61, 4.62: arithmetic series in a seating or stacking context ---- */
E("u9-arith-series-context", 9, ["4.61", "4.62"], 2, "gen", function () {
  var CTX = [
    { key: "theatre", A: [16, 32], D: [2, 5], R: [14, 28],
      text: "A community theatre has {R} rows of seats. The first row has {A} seats, and each row after the first has {D} more seats than the row before it. How many seats does the theatre have in all?" },
    { key: "arena", A: [20, 40], D: [2, 4], R: [15, 30],
      text: "One section of a hockey arena has {R} rows of seats. The first row has {A} seats, and each row after the first has {D} more seats than the row before it. How many seats are in the section?" },
    { key: "amphitheatre", A: [18, 36], D: [3, 6], R: [12, 24],
      text: "An outdoor amphitheatre has {R} rows of benches. The first row seats {A} people, and each row after the first seats {D} more people than the row before it. How many people can the amphitheatre seat?" },
    { key: "library", A: [12, 26], D: [2, 4], R: [10, 20],
      text: "A library display has {R} shelves. The bottom shelf holds {A} books, and each shelf above it holds {D} more books than the shelf below it. How many books are on display in total?" },
    { key: "choir", A: [10, 24], D: [2, 4], R: [8, 18],
      text: "A choir performs on risers with {R} rows. The front row fits {A} singers, and each row behind it fits {D} more singers than the row in front of it. How many singers can the risers hold in total?" }
  ];
  var c = pick(CTX);
  var A = ri(c.A[0], c.A[1]), D = ri(c.D[0], c.D[1]), R = ri(c.R[0], c.R[1]);
  var last = A + (R - 1) * D;
  var S = R * (A + last) / 2;
  var prompt = c.text.replace("{R}", R).replace("{A}", A).replace("{D}", D);
  var sol = "The row sizes form an arithmetic sequence with first term \\(" + A + "\\) and common difference \\(" + D + "\\). The last of the \\(" + R + "\\) rows holds:"
    + "\\[ \\begin{aligned} t_{" + R + "} &= " + A + " + (" + R + " - 1)(" + D + ") = " + last + " \\\\ S_{" + R + "} &= \\frac{" + R + "}{2}\\left(" + A + " + " + last + "\\right) = " + S + " \\end{aligned} \\]"
    + "The total is \\(" + S + "\\).";
  return numq(prompt, S, 0.01, sol, { ctx: c.key, A: A, D: D, R: R });
});

/* ---- 4.62: recover a missing piece of an arithmetic series ---- */
E("u9-arith-find-missing", 9, ["4.62"], 2, "gen", function () {
  var n = ri(6, 25);
  var d0 = ri(-6, 9); while (d0 === 0) d0 = ri(-6, 9);
  var t10 = ri(-5, 28);
  var S = n * (2 * t10 + (n - 1) * d0) / 2;
  if (Math.random() < 0.5) {
    var promptA = "The sum of the first \\(" + n + "\\) terms of an arithmetic series is \\(" + S + "\\), and the first term is \\(" + t10 + "\\). Find the common difference.";
    var solA = "Substitute into \\(S_n = \\dfrac{n}{2}\\left(2t_1 + (n - 1)d\\right)\\) and solve for \\(d\\):"
      + "\\[ \\begin{aligned} " + S + " &= \\frac{" + n + "}{2}\\left(2(" + t10 + ") + " + (n - 1) + "d\\right) \\\\ " + (2 * S) + " &= " + n + "\\left(" + (2 * t10) + " + " + (n - 1) + "d\\right) \\\\ " + fmt(2 * S / n) + " &= " + (2 * t10) + " + " + (n - 1) + "d \\\\ " + (n - 1) + "d &= " + (2 * S / n - 2 * t10) + " \\\\ d &= " + d0 + " \\end{aligned} \\]";
    return numq(promptA, d0, 0.01, solA, { mode: "findD", t1: t10, d: d0, n: n, S: S });
  }
  var promptB = "The sum of the first \\(" + n + "\\) terms of an arithmetic series is \\(" + S + "\\), and the common difference is \\(" + d0 + "\\). Find the first term.";
  var solB = "Substitute into \\(S_n = \\dfrac{n}{2}\\left(2t_1 + (n - 1)d\\right)\\) and solve for \\(t_1\\):"
    + "\\[ \\begin{aligned} " + S + " &= \\frac{" + n + "}{2}\\left(2t_1 + (" + (n - 1) + ")(" + d0 + ")\\right) \\\\ " + fmt(2 * S / n) + " &= 2t_1 + (" + (n - 1) * d0 + ") \\\\ 2t_1 &= " + (2 * S / n - (n - 1) * d0) + " \\\\ t_1 &= " + t10 + " \\end{aligned} \\]";
  return numq(promptB, t10, 0.01, solB, { mode: "findT1", t1: t10, d: d0, n: n, S: S });
});

/* ---- 4.63, 4.66: a later term of a geometric sequence ---- */
E("u9-geo-nth-term", 9, ["4.63", "4.66"], 1, "gen", function () {
  var RT = [
    { rn: 2, rd: 1, t1: [3, 4, 5, 6, 7, 8], n: [4, 5, 6, 7] }, { rn: 3, rd: 1, t1: [2, 3, 4, 5], n: [4, 5, 6] },
    { rn: 4, rd: 1, t1: [1, 2, 3], n: [4, 5] }, { rn: -2, rd: 1, t1: [2, 3, 4, 5, 6], n: [4, 5, 6] },
    { rn: -3, rd: 1, t1: [1, 2, 3], n: [4, 5] }, { rn: 1, rd: 2, t1: [32, 48, 64, 96, 128], n: [4, 5, 6] },
    { rn: 3, rd: 2, t1: [8, 16, 32], n: [4, 5] }, { rn: -1, rd: 2, t1: [32, 64, 96], n: [4, 5, 6] },
    { rn: 2, rd: 3, t1: [81], n: [4, 5] }, { rn: 5, rd: 2, t1: [8, 16], n: [4] }
  ];
  var c = pick(RT), t1 = pick(c.t1), n = pick(c.n);
  var vn = t1 * Math.pow(c.rn, n - 1), vd = Math.pow(c.rd, n - 1);
  var rBody = u9fr(c.rn, c.rd);
  var key = "\\(" + u9fr(vn, vd) + "\\)";
  var cands = [
    "\\(" + u9fr(t1 * Math.pow(c.rn, n), Math.pow(c.rd, n)) + "\\)",
    "\\(" + u9fr(t1 * Math.pow(c.rn, n - 2), Math.pow(c.rd, n - 2)) + "\\)",
    "\\(" + u9fr(-vn, vd) + "\\)",
    "\\(" + u9fr(t1 * Math.pow(c.rd, n - 1), Math.pow(c.rn, n - 1)) + "\\)",
    "\\(" + u9fr(t1 * Math.pow(c.rn, n - 1) * -1, Math.pow(c.rd, n - 1)) + "\\)"
  ];
  var dis = u9dist3(key, cands);
  var prompt, sol;
  if (Math.random() < 0.5) {
    prompt = "A geometric sequence has first term \\(" + t1 + "\\) and common ratio \\(" + rBody + "\\). Find the " + u9ord(n) + " term.";
  } else {
    prompt = "A geometric sequence has general term \\(t_n = " + t1 + "\\left(" + rBody + "\\right)^{n-1}\\). Find the value of \\(t_{" + n + "}\\).";
  }
  sol = "Use \\(t_n = t_1 r^{n-1}\\) with \\(n = " + n + "\\):"
    + "\\[ \\begin{aligned} t_{" + n + "} &= " + t1 + "\\left(" + rBody + "\\right)^{" + (n - 1) + "} \\\\ &= " + u9fr(vn, vd) + " \\end{aligned} \\]";
  return mcq(prompt, key, dis, sol, { t1: t1, rn: c.rn, rd: c.rd, n: n, vn: vn, vd: vd });
});

/* ---- 4.64, 4.67, 4.69: finite geometric series, including the bouncing ball ---- */
E("u9-geo-sum-finite", 9, ["4.64", "4.67", "4.69"], 2, "gen", function () {
  if (Math.random() < 0.55) {
    var COMBOS = [
      { t1: 3, rn: 2, rd: 1, n: [5, 6, 7, 8] }, { t1: 4, rn: 2, rd: 1, n: [5, 6, 7] }, { t1: 5, rn: 2, rd: 1, n: [5, 6, 7] },
      { t1: 6, rn: 2, rd: 1, n: [5, 6] }, { t1: 2, rn: 3, rd: 1, n: [5, 6] }, { t1: 4, rn: 3, rd: 1, n: [5, 6] },
      { t1: 3, rn: -2, rd: 1, n: [5, 6, 7] }, { t1: 5, rn: -2, rd: 1, n: [5, 6] },
      { t1: 32, rn: 1, rd: 2, n: [5, 6, 7] }, { t1: 48, rn: 1, rd: 2, n: [5, 6] },
      { t1: 64, rn: 1, rd: 2, n: [5, 6, 7, 8] }, { t1: 96, rn: 1, rd: 2, n: [6] },
      { t1: 32, rn: -1, rd: 2, n: [5, 6] }, { t1: 64, rn: -1, rd: 2, n: [5, 6, 7] },
      { t1: 16, rn: 3, rd: 2, n: [4, 5] }, { t1: 32, rn: 3, rd: 2, n: [4, 5] }
    ];
    var cb = pick(COMBOS), t1 = cb.t1, n = pick(cb.n);
    var sumN = 0, sumD = 1, tn = t1, td = 1;
    for (var k = 0; k < n; k++) {
      var a = sumN * td + tn * sumD, b = sumD * td;
      var g = u9gcd(a, b); sumN = a / g; sumD = b / g;
      tn *= cb.rn; td *= cb.rd;
      g = u9gcd(tn, td); tn /= g; td /= g;
    }
    var S = sumN / sumD;
    var first4 = u9geoTerms(t1, cb.rn, cb.rd, Math.min(4, n));
    var promptA = "Find the sum of the geometric series \\(" + first4.join(" + ") + " + \\ldots\\) where the series has \\(" + n + "\\) terms in total.";
    var solA = "The first term is \\(" + t1 + "\\) and the common ratio is \\(r = " + u9fr(cb.rn, cb.rd) + "\\). Use \\(S_n = \\dfrac{t_1(r^n - 1)}{r - 1}\\):"
      + "\\[ \\begin{aligned} S_{" + n + "} &= \\frac{" + t1 + "\\left(\\left(" + u9fr(cb.rn, cb.rd) + "\\right)^{" + n + "} - 1\\right)}{" + u9fr(cb.rn, cb.rd) + " - 1} \\\\ &= " + S + " \\end{aligned} \\]";
    return numq(promptA, S, 0.01, solA, { mode: "series", t1: t1, rn: cb.rn, rd: cb.rd, n: n });
  }
  var BALL = [
    { H: 24, fn: 1, fd: 2, N: [4, 5, 6, 7] }, { H: 20, fn: 1, fd: 2, N: [4, 5, 6] },
    { H: 32, fn: 3, fd: 4, N: [4, 5, 6] }, { H: 16, fn: 3, fd: 4, N: [4, 5] },
    { H: 27, fn: 2, fd: 3, N: [4, 5] }, { H: 36, fn: 2, fd: 3, N: [4, 5] }
  ];
  var bb = pick(BALL), H = bb.H, N = pick(bb.N);
  var bounce = H * bb.fn / bb.fd, dist = H, heights = [];
  for (var j = 1; j < N; j++) { heights.push(bounce); dist += 2 * bounce; bounce *= bb.fn / bb.fd; }
  var fBody = u9fr(bb.fn, bb.fd);
  var promptB = "A ball is dropped from a height of \\(" + H + "\\) m onto a hard floor. Each time it bounces, it rises to \\(" + fBody + "\\) of the height of the previous bounce. Find the total distance the ball travels by the time it hits the floor for the " + u9ord(N) + " time.";
  var heightsStr = heights.map(function (h) { return fmt(h); }).join(" m, ");
  var solB = "The heights the ball reaches after each bounce form a geometric sequence: \\(" + heightsStr + "\\) m, and so on. The drop counts once, but every bounce height is travelled twice, once up and once down:"
    + "\\[ \\begin{aligned} D &= " + H + " + 2\\left(" + heights.map(function (h) { return fmt(h); }).join(" + ") + "\\right) \\\\ &= " + fmt(dist) + " \\text{ m} \\end{aligned} \\]"
    + "The total distance travelled is \\(" + fmt(dist) + "\\) m.";
  return numq(promptB, dist, 0.01, solB, { mode: "ball", H: H, fn: bb.fn, fd: bb.fd, N: N });
});

/* ---- 4.66, 4.68: which term, or what ratio, in a geometric sequence ---- */
E("u9-geo-find-index", 9, ["4.66", "4.68"], 2, "gen", function () {
  if (Math.random() < 0.6) {
    var RT = [
      { rn: 2, rd: 1, t1: [2, 3, 4, 5, 6, 7, 8], k: [2, 3, 4, 5, 6, 7] },
      { rn: 3, rd: 1, t1: [1, 2, 3, 4], k: [2, 3, 4, 5, 6] },
      { rn: 4, rd: 1, t1: [1, 2, 3], k: [2, 3, 4] },
      { rn: -2, rd: 1, t1: [2, 3, 4, 5], k: [2, 3, 4, 5] },
      { rn: -3, rd: 1, t1: [1, 2, 3], k: [2, 3, 4] },
      { rn: 1, rd: 2, t1: [64, 128, 256], k: [2, 3, 4, 5, 6] },
      { rn: 1, rd: 3, t1: [81, 243], k: [2, 3, 4] }
    ];
    var c = pick(RT), t1 = pick(c.t1), k = pick(c.k);
    var v = t1 * Math.pow(c.rn, k) / Math.pow(c.rd, k);
    var promptA = "A geometric sequence has first term \\(" + t1 + "\\) and common ratio \\(" + u9fr(c.rn, c.rd) + "\\). One term of the sequence is \\(" + u9fr(Math.round(v * Math.pow(c.rd, k)), Math.pow(c.rd, k)) + "\\). Find its term number.";
    var solA = "A term \\(t_n\\) satisfies \\(t_1 r^{n-1} = " + u9fr(Math.round(v * Math.pow(c.rd, k)), Math.pow(c.rd, k)) + "\\). Dividing by \\(t_1\\) gives \\(r^{n-1} = \\left(" + u9fr(c.rn, c.rd) + "\\right)^{" + k + "}\\), so \\(n - 1 = " + k + "\\) and \\(n = " + (k + 1) + "\\). The value is the " + u9ord(k + 1) + " term.";
    return numq(promptA, k + 1, 0.01, solA, { mode: "findN", t1: t1, rn: c.rn, rd: c.rd, k: k });
  }
  var n = pick([4, 6]);
  var r = pick([2, 3, -2, -3, 4]);
  var t1 = ri(1, 6);
  var v = t1 * Math.pow(r, n - 1);
  var promptB = "A geometric sequence has first term \\(" + t1 + "\\) and the value of the " + u9ord(n) + " term is \\(" + v + "\\). Find the common ratio.";
  var solB = "Use \\(t_n = t_1 r^{n-1}\\):"
    + "\\[ \\begin{aligned} " + v + " &= " + t1 + " \\cdot r^{" + (n - 1) + "} \\\\ r^{" + (n - 1) + "} &= " + Math.pow(r, n - 1) + " \\\\ r &= " + r + " \\end{aligned} \\]"
    + "Since the exponent \\(" + (n - 1) + "\\) is odd, there is only one real value of \\(r\\) with this power.";
  return numq(promptB, r, 0.01, solB, { mode: "findR", t1: t1, r: r, n: n, v: v });
});

/* ---- 4.70: sum of an infinite geometric series ---- */
E("u9-infinite-sum", 9, ["4.70"], 2, "gen", function () {
  var RT = [
    { rn: 1, rd: 2, t1: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }, { rn: 1, rd: 3, t1: [4, 6, 8, 10, 12, 14, 16] },
    { rn: 2, rd: 3, t1: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }, { rn: 1, rd: 4, t1: [6, 9, 12, 15] },
    { rn: 3, rd: 4, t1: [2, 3, 4, 5, 6, 7, 8, 9, 10] }, { rn: -1, rd: 2, t1: [6, 9, 12, 15] },
    { rn: -1, rd: 3, t1: [8, 12, 16] }, { rn: 2, rd: 5, t1: [6, 9, 12] },
    { rn: -2, rd: 3, t1: [10, 15] }, { rn: 1, rd: 5, t1: [8, 12, 16] }
  ];
  var c = pick(RT), t1 = pick(c.t1);
  var rBody = u9fr(c.rn, c.rd);
  var Sn = t1 * c.rd, Sd = c.rd - c.rn;
  if (Math.random() < 0.55) {
    var key = "\\(" + u9fr(Sn, Sd) + "\\)";
    var cands = [
      "\\(" + u9fr(t1 * c.rd, c.rd + c.rn) + "\\)",
      "\\(" + u9fr(-Sn, Sd) + "\\)",
      "\\(" + u9fr(t1 * c.rn, Sd) + "\\)",
      "\\(" + u9fr(2 * Sn, Sd) + "\\)"
    ];
    var dis = u9dist3(key, cands);
    var first3 = u9geoTerms(t1, c.rn, c.rd, 3);
    var promptA = "Find the sum of the infinite geometric series \\(" + first3.join(" + ") + " + \\ldots\\)";
    var solA = "The first term is \\(" + t1 + "\\) and the common ratio is \\(r = " + rBody + "\\). Since \\(|r| < 1\\), the series converges, and"
      + "\\[ S_\\infty = \\frac{t_1}{1 - r} = \\frac{" + t1 + "}{1 - \\left(" + rBody + "\\right)} = " + u9fr(Sn, Sd) + " \\]";
    return mcq(promptA, key, dis, solA, { mode: "findS", t1: t1, rn: c.rn, rd: c.rd, Sn: Sn, Sd: Sd });
  }
  var S = ri(6, 40);
  var t1n = S * (c.rd - c.rn), t1d = c.rd;
  var keyB = "\\(" + u9fr(t1n, t1d) + "\\)";
  var candsB = [
    "\\(" + u9fr(S * (c.rd + c.rn), c.rd) + "\\)",
    "\\(" + S + "\\)",
    "\\(" + u9fr(S * c.rd, c.rd - c.rn) + "\\)",
    "\\(" + u9fr(-t1n, t1d) + "\\)"
  ];
  var disB = u9dist3(keyB, candsB);
  var promptB = "An infinite geometric series with common ratio \\(" + rBody + "\\) has a sum of \\(" + S + "\\). Find its first term.";
  var solB = "Use \\(S_\\infty = \\dfrac{t_1}{1 - r}\\) and solve for \\(t_1\\):"
    + "\\[ \\begin{aligned} " + S + " &= \\frac{t_1}{1 - \\left(" + rBody + "\\right)} \\\\ t_1 &= " + S + " \\cdot \\left(1 - \\left(" + rBody + "\\right)\\right) \\\\ &= " + u9fr(t1n, t1d) + " \\end{aligned} \\]";
  return mcq(promptB, keyB, disB, solB, { mode: "findT1", t1n: t1n, t1d: t1d, rn: c.rn, rd: c.rd, S: S });
});

/* ---- 4.60: arithmetic sequence plotted as a line ---- */
E("u9-arith-graph-link", 9, ["4.60"], 2, "gen", function () {
  var d = ri(1, 5);
  var t1 = ri(d + 2, 16);
  var npts = pick([5, 6]);
  var maxY = t1 + (npts - 1) * d;
  var yMax = Math.ceil(maxY / 5) * 5 + 5;
  var W = 240, H = 210, L = 38, B = 30, pw = W - L - 14, ph = H - B - 12;
  var xs = function (k) { return L + k * pw / (npts + 1); };
  var ys = function (v) { return B + ph - v * ph / yMax; };
  var fig = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="240" height="210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Points of an arithmetic sequence">';
  fig += '<line x1="' + L + '" y1="' + (B + ph) + '" x2="' + (L + pw) + '" y2="' + (B + ph) + '" stroke="' + FIG_INK + '" stroke-width="1.2"/>';
  fig += '<line x1="' + L + '" y1="' + B + '" x2="' + L + '" y2="' + (B + ph) + '" stroke="' + FIG_INK + '" stroke-width="1.2"/>';
  for (var g = 0; g <= yMax; g += 5) {
    fig += '<line x1="' + L + '" y1="' + ys(g) + '" x2="' + (L + pw) + '" y2="' + ys(g) + '" stroke="' + FIG_INK + '" stroke-width="0.4" opacity="0.3"/>';
    fig += _txt(L - 6, ys(g) + 4, String(g), 10, false, "end");
  }
  for (var k = 1; k <= npts; k++) {
    var v = t1 + (k - 1) * d;
    fig += '<circle cx="' + fmt(xs(k), 1) + '" cy="' + fmt(ys(v), 1) + '" r="4" fill="' + FIG_ACC + '"/>';
    fig += _txt(xs(k), B + ph + 16, String(k), 10, false, "middle");
  }
  fig += _txt(L + pw / 2, H - 4, "n (term number)", 11, false, "middle");
  fig += _txt(10, B + ph / 2, "t_n", 11, true, "middle");
  fig += '</svg>';
  var key = "Slope = " + d + " and y-intercept = " + (t1 - d);
  var cands = [
    "Slope = " + d + " and y-intercept = " + t1,
    "Slope = " + (t1 - d) + " and y-intercept = " + d,
    "Slope = " + d + " and y-intercept = " + (t1 + d),
    "Slope = " + t1 + " and y-intercept = " + (t1 - d),
    "Slope = " + (d + 1) + " and y-intercept = " + (t1 - d)
  ];
  var dis = u9dist3(key, cands);
  var prompt = "The first " + (npts === 5 ? "five" : "six") + " terms of an arithmetic sequence are plotted below as points \\((n, t_n)\\). The points lie on a straight line. What are the slope and the y-intercept of that line?";
  var sol = "Each step from one term to the next adds the common difference \\(d = " + d + "\\), so the slope of the line is \\(" + d + "\\). The general term is \\(t_n = " + t1 + " + (n - 1)(" + d + ") = " + u9lin(d, t1 - d) + "\\), which has the form \\(t_n = dn + (t_1 - d)\\): the line meets the vertical axis where \\(n = 0\\), at \\(" + (t1 - d) + "\\). So the slope is \\(" + d + "\\) and the y-intercept is \\(" + (t1 - d) + "\\).";
  var q = mcq(prompt, key, dis, sol, { t1: t1, d: d, npts: npts });
  q.figure = fig;
  return q;
});

/* ---- 4.58, 4.61, 4.67: derivation steps and sequence combinations (variant set) ---- */
E("u9-derive-formulas", 9, ["4.58", "4.61", "4.67"], 3, "var", varset([
  function () {
    var key = "\\(2S_n = n\\left(t_1 + t_n\\right)\\)";
    var dis = ["\\(2S_n = t_1 + t_n\\)", "\\(2S_n = 2n\\left(t_1 + t_n\\right)\\)", "\\(2S_n = n\\left(t_n - t_1\\right)\\)"];
    var prompt = "A student derives a formula for the sum of an arithmetic series by writing the sum in reverse order underneath itself and adding the two rows, pairing the first term with the last. The series has \\(n\\) terms, first term \\(t_1\\) and last term \\(t_n\\). What does the addition produce?";
    var sol = "In each column, the pair of terms adds to \\(t_1 + t_n\\): the lower row runs from \\(t_n\\) down to \\(t_1\\), so as the top term grows by \\(d\\), the bottom term shrinks by \\(d\\). There are \\(n\\) columns, so the combined sum is \\(n\\) copies of \\(t_1 + t_n\\). But the combined sum is also \\(S_n + S_n = 2S_n\\), giving \\(2S_n = n(t_1 + t_n)\\), and dividing by 2 produces the sum formula.";
    return mcq(prompt, key, dis, sol, { variant: "arithPair" });
  },
  function () {
    var key = "\\(t_1\\left(1 - r^n\\right)\\)";
    var dis = ["\\(t_1\\left(1 - r^{n-1}\\right)\\)", "\\(t_1\\left(r^n - 1\\right)\\)", "\\(t_1\\left(1 - r\\right)\\)"];
    var prompt = "To derive a formula for the sum of a geometric series, a student writes \\(S_n = t_1 + t_1 r + t_1 r^2 + \\cdots + t_1 r^{n-1}\\), multiplies the whole equation by \\(r\\), and then works out \\(S_n - rS_n\\). What is the result of that subtraction?";
    var sol = "Multiplying by \\(r\\) shifts every term one place: \\(rS_n = t_1 r + t_1 r^2 + \\cdots + t_1 r^n\\). In the subtraction, all the middle terms appear in both rows and cancel. Only the first term of the top row and the last term of the bottom row survive: \\(S_n - rS_n = t_1 - t_1 r^n = t_1(1 - r^n)\\). Factoring \\(1 - r\\) out of the left side then gives the sum formula.";
    return mcq(prompt, key, dis, sol, { variant: "geoSubtract" });
  },
  function () {
    var key = "It is arithmetic: the general term is \\(3n + 4\\) and the common difference is 3.";
    var dis = [
      "It is arithmetic: the general term is \\(3n + 4\\) and the common difference is 4.",
      "It is arithmetic: the general term is \\(5n + 4\\) and the common difference is 5.",
      "It is not arithmetic, because sequence B is decreasing."
    ];
    var prompt = "Sequence A has general term \\(a_n = 4n - 3\\) and sequence B has general term \\(b_n = 7 - n\\). A new sequence is formed by adding corresponding terms of A and B. Which statement about the new sequence is correct?";
    var sol = "Add the general terms: \\((4n - 3) + (7 - n) = 3n + 4\\). The first few sums are \\(7, 10, 13, \\ldots\\), increasing by exactly 3 each time. Adding two arithmetic sequences always gives an arithmetic sequence whose common difference is the sum of the two differences, here \\(4 + (-1) = 3\\). So the new sequence is arithmetic with general term \\(3n + 4\\) and common difference 3.";
    return mcq(prompt, key, dis, sol, { variant: "sumSeq" });
  },
  function () {
    var key = "It is not arithmetic: the products are 12, 25, 42, and the differences between consecutive products are 13 and 17, which are not equal.";
    var dis = [
      "It is arithmetic, with common difference 13, since the products grow by that amount from each term to the next.",
      "It is arithmetic, with common difference 4, since each factor grows by a fixed amount from each term to the next.",
      "It is not arithmetic, because the product of two sequences can never be an arithmetic sequence, whatever the factors in the two sequences are."
    ];
    var prompt = "Sequence A has general term \\(a_n = 2n + 1\\) and sequence B has general term \\(b_n = n + 3\\). A new sequence is formed by multiplying corresponding terms of A and B. Which statement about the new sequence is correct?";
    var sol = "Compute the first few products: \\(3 \\times 4 = 12\\), \\(5 \\times 5 = 25\\), \\(7 \\times 6 = 42\\). The differences are \\(25 - 12 = 13\\) and \\(42 - 25 = 17\\). Since the differences are not equal, the product sequence is not arithmetic. (Multiplying is not like adding here: the differences grow because both factors grow.)";
    return mcq(prompt, key, dis, sol, { variant: "prodSeq" });
  }
]));

/* ---- 4.62: evaluate two pay offers over several years ---- */
E("u9-evaluate-offers", 9, ["4.62"], 3, "gen", function () {
  var SA, dA, SB, dB, Y, diff, tries = 0;
  do {
    SA = pick([42000, 45000, 48000, 50000, 52000]);
    dA = pick([1500, 1800, 2000, 2200, 2500]);
    var delta = pick([3000, 4000, 5000, 6000]);
    var extra = pick([700, 900, 1100, 1300, 1500]);
    Y = ri(6, 10);
    SB = SA - delta; dB = dA + extra;
    diff = -Y * delta + extra * Y * (Y - 1) / 2;
    tries++;
  } while ((diff < 2000 || diff > 40000) && tries < 300);
  var totA = Y * (2 * SA + (Y - 1) * dA) / 2;
  var totB = Y * (2 * SB + (Y - 1) * dB) / 2;
  var prompt = "Two job offers are on the table. Offer A pays a starting salary of $" + u9money(SA) + " per year, with a raise of $" + u9money(dA) + " at the start of each following year. Offer B pays a starting salary of $" + u9money(SB) + " per year, with a raise of $" + u9money(dB) + " at the start of each following year. Over the first " + Y + " years, how much more does Offer B pay in total than Offer A? Give your answer in dollars.";
  var sol = "Each offer's yearly pay forms an arithmetic sequence, so each total is an arithmetic series with \\(n = " + Y + "\\):"
    + "\\[ \\begin{aligned} \\text{Offer A total} &= \\frac{" + Y + "}{2}\\left(2(" + u9money(SA) + ") + " + (Y - 1) + "(" + u9money(dA) + ")\\right) = " + u9money(totA) + " \\\\ \\text{Offer B total} &= \\frac{" + Y + "}{2}\\left(2(" + u9money(SB) + ") + " + (Y - 1) + "(" + u9money(dB) + ")\\right) = " + u9money(totB) + " \\end{aligned} \\]"
    + "Offer B starts lower but its larger raises overtake A: it pays $" + u9money(diff) + " more over the " + Y + " years.";
  return numq(prompt, diff, 0.01, sol, { SA: SA, dA: dA, SB: SB, dB: dB, Y: Y });
});

/* ---- 4.59, 4.60: when does the faster-growing sequence catch up? ---- */
E("u9-crossover", 9, ["4.59", "4.60"], 3, "gen", function () {
  var CTX = [
    { key: "clubs", unit: "month",
      text: "Two curling clubs record their memberships at the start of each month. Club A starts with {A0} members and gains {dA} members each month. Club B starts with {B0} members and gains {dB} members each month. In which month does Club B first have more members than Club A?",
      A0: [240, 800], gap: [60, 280], dA: [8, 24], gain: [6, 26] },
    { key: "jars", unit: "week",
      text: "Mina and Theo each start a savings jar in week 1. Mina's jar starts with ${A0} and she adds ${dA} each week. Theo's jar starts with ${B0} and he adds ${dB} each week. In which week does Theo's jar first contain more money than Mina's?",
      A0: [60, 200], gap: [20, 90], dA: [5, 15], gain: [3, 12] },
    { key: "seedlings", unit: "week",
      text: "Two tomato seedlings are measured at the start of each week. Plant A starts at {A0} cm tall and grows {dA} cm each week. Plant B starts at {B0} cm tall and grows {dB} cm each week. In which week is Plant B first taller than Plant A?",
      A0: [18, 40], gap: [4, 14], dA: [2, 5], gain: [1, 4] }
  ];
  var c, A0, B0, dA, dB, n, tries = 0;
  do {
    c = pick(CTX);
    A0 = ri(c.A0[0], c.A0[1]);
    var gap = ri(c.gap[0], c.gap[1]);
    dA = ri(c.dA[0], c.dA[1]);
    var gain = ri(c.gain[0], c.gain[1]);
    B0 = A0 - gap; dB = dA + gain;
    n = Math.floor(gap / gain) + 2;
    tries++;
  } while ((n < 4 || n > 30 || B0 <= 0) && tries < 300);
  var prompt = c.text.replace("{A0}", A0).replace("{B0}", B0).replace("{dA}", dA).replace("{dB}", dB);
  var aPrev = A0 + (n - 2) * dA, bPrev = B0 + (n - 2) * dB;
  var aNow = A0 + (n - 1) * dA, bNow = B0 + (n - 1) * dB;
  var sol = "Both amounts form arithmetic sequences. The gap between them starts at \\(" + (A0 - B0) + "\\) and closes by \\(" + dB + " - " + dA + " = " + (dB - dA) + "\\) each " + c.unit + ". B first moves ahead when \\((n - 1)(" + (dB - dA) + ") > " + (A0 - B0) + "\\), which first happens at \\(n = " + n + "\\). Checking the two " + c.unit + "s either side: in " + c.unit + " " + (n - 1) + " the amounts are \\(" + aPrev + "\\) and \\(" + bPrev + "\\) (B still behind), and in " + c.unit + " " + n + " they are \\(" + aNow + "\\) and \\(" + bNow + "\\), so B is first ahead in " + c.unit + " " + n + ".";
  return numq(prompt, n, 0.01, sol, { ctx: c.key, A0: A0, B0: B0, dA: dA, dB: dB });
});

/* ============ Prior knowledge tranche (Nov 15, 2026) ============ */
/* Borrowed verbatim from the feeder banks named in the source
   comments and the PKT table below, plus authored micro-items
   where the prior knowledge map names a skill no feeder entry
   assesses. Spec: Math-2200-PK-Tranche-Spec-2026-11-15.md. */

/* u9-pk-pattern-word: borrowed verbatim from math-9 entry u6-pattern-word-total (math-9:7.1). */
E("u9-pk-pattern-word",9,["4.57"], 1, "gen", function () {
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

/* u9-pk-pattern-figure: borrowed verbatim from math-9 entry u6-pattern-figure-expr (math-9:7.1). */
E("u9-pk-pattern-figure",9,["4.57"], 2, "gen", function () {
  var item = pick(["tiles", "dots", "blocks", "counters"]);
  var m = ri(2, 6), b = ri(1, 8), att = 0;
  while (m === b && att < 40) { m = ri(2, 6); b = ri(1, 8); att++; }
  if (m === b) { m = 3; b = 2; }
  var counts = [b + m, b + 2 * m, b + 3 * m];
  var corr = "\\(" + n6lin(m, b, "n") + "\\)";
  var ds = [
    { t: "\\(" + n6lin(b, m, "n") + "\\)", fb: "That swaps the start value and the step. The count grows by " + fmt(m) + " each stage, so " + fmt(m) + " multiplies n." },
    { t: "\\(" + n6lin(m, -b, "n") + "\\)", fb: "That subtracts the start value. The start value is added, because Stage 1 is already more than one step." },
    { t: "\\(" + fmt(m + b) + "n\\)", fb: "That folds the start value into the step. The start value is added once, not once per stage." }
  ];
  var sol = "The counts grow by the same amount each stage: \\[ \\begin{aligned} \\text{step} &= " + counts[1] + " - " + counts[0] + " = " + fmt(m) + " \\\\ \\text{start} &= " + counts[0] + " - " + fmt(m) + " = " + fmt(b) + " \\end{aligned} \\] So the number of " + item + " at Stage \\(n\\) is <b>" + corr + "</b>.";
  var q = mcq("The diagram shows the first three stages of a pattern made with " + item + ". Which expression gives the number of " + item + " at Stage \\(n\\)?",
    { t: corr, fb: "Correct. The start value is " + fmt(b) + " and each new stage adds " + fmt(m) + "." }, ds, sol,
    { mode: "pattern-figure-expr", m: m, b: b, item: item });
  q.figure = n6stageFig(counts, item);
  return q;
}, ["Find how much the count grows from one stage to the next; that growth is the step.", "Work backwards from Stage 1 by subtracting one step to get the start value."]);

/* u9-pk-table-equation: borrowed verbatim from math-9 entry u6-table-equation (math-9:7.4). */
E("u9-pk-table-equation",9,["4.57"], 2, "gen", function () {
  var S = ri(1, 12), P = ri(2, 7), att = 0;
  while (S === P && att < 40) { S = ri(1, 12); P = ri(2, 7); att++; }
  if (S === P) { S = 4; P = 3; }
  var x0 = pick([0, 0, 1]);
  var xs = [], ys = [];
  for (var k = 0; k < 5; k++) { xs.push(x0 + k); ys.push(S + P * (x0 + k)); }
  var corr = "\\(y = " + n6lin(P, S, "x") + "\\)";
  var startNote = x0 === 0
    ? "When \\(x = 0\\), \\(y = " + S + "\\), so the start value is " + S + "."
    : "Extending the pattern back one step, when \\(x = 0\\), \\(y = " + ys[0] + " - " + P + " = " + S + "\\), so the start value is " + S + ".";
  var sol = "The \\(y\\) values rise by the same amount each time \\(x\\) grows by 1: \\[ \\begin{aligned} \\text{step} &= " + ys[1] + " - " + ys[0] + " = " + fmt(P) + " \\end{aligned} \\] " + startNote + " So the equation is <b>" + corr + "</b>.";
  var prompt = "A table of values for a linear relation is shown.<br>x: " + xs.join(", ") + "<br>y: " + ys.join(", ") + "<br>Which equation fits the table?";
  return mcq(prompt,
    { t: corr, fb: "Correct. The step is " + fmt(P) + " and the start value is " + fmt(S) + "." },
    [
      { t: "\\(y = " + n6lin(S, P, "x") + "\\)", fb: "That swaps the start value and the step. Check it at the first table value." },
      { t: "\\(y = " + n6lin(P, -S, "x") + "\\)", fb: "That subtracts the start value. The y values are larger than the step alone, so the start is added." },
      { t: "\\(y = " + n6lin(P, S + P, "x") + "\\)", fb: "The step is right, but the start value is too big. Use the y value when x is 0." }
    ], sol, { mode: "table-equation", S: S, P: P, x0: x0 });
}, ["Find the step first: how much does y change when x grows by 1?", "The start value is the y value when x is 0; extend the pattern back if the table starts later."]);

/* u9-pk-context-equation: borrowed verbatim from math-9 entry u6-context-equation (math-9:7.2). */
E("u9-pk-context-equation",9,["4.60"], 1, "gen", function () {
  var B = ri(3, 40), R = ri(2, 15), att = 0;
  while (B === R && att < 40) { B = ri(3, 40); R = ri(2, 15); att++; }
  if (B === R) { B = 12; R = 3; }
  var ctx = pick([
    "A taxi ride costs a base fee of $" + B + " plus $" + R + " for each kilometre driven. Let \\(x\\) be the number of kilometres and \\(y\\) be the total cost in dollars.",
    "A gym charges a sign-up fee of $" + B + " plus $" + R + " for each class attended. Let \\(x\\) be the number of classes and \\(y\\) be the total cost in dollars.",
    "A plumber charges a call-out fee of $" + B + " plus $" + R + " for each hour of work. Let \\(x\\) be the number of hours and \\(y\\) be the total cost in dollars.",
    "A snack cart charges $" + B + " for a tray plus $" + R + " for each drink on it. Let \\(x\\) be the number of drinks and \\(y\\) be the total cost in dollars."
  ]);
  var corr = "\\(y = " + n6lin(R, B, "x") + "\\)";
  var sol = "The fee of $" + B + " is paid once, and the $" + R + " charge is paid \\(x\\) times: \\[ \\begin{aligned} y &= " + B + " + " + fmt(R) + "x \\end{aligned} \\] So the equation is <b>" + corr + "</b>.";
  return mcq(ctx + " Which equation gives \\(y\\)?",
    { t: corr, fb: "Correct. The one-time fee is the start value and the per-unit charge is the step." },
    [
      { t: "\\(y = " + n6lin(B, R, "x") + "\\)", fb: "That swaps the two amounts. The fee is paid once, so it is not multiplied by x." },
      { t: "\\(y = " + B + " + " + R + " + x\\)", fb: "That adds the rate instead of multiplying it by the number of units." },
      { t: "\\(y = " + fmt(B + R) + "x\\)", fb: "That adds the fee and the rate together and multiplies the sum by x, so the fee gets charged every unit." }
    ], sol, { mode: "context-equation", B: B, R: R });
}, ["Decide which amount is paid once and which amount is paid for each unit.", "The amount paid for each unit multiplies x; the one-time amount stands alone."]);

/* u9-pk-fn-notation: borrowed verbatim from math-1201 entry u4-fn-notation (math-1201:4.45). */
E("u9-pk-fn-notation",9,["4.57"],1,"gen",function(){
  var m=pick([-5,-4,-3,-2,-1,1,2,3,4,5]),b=ri(-15,16);
  var key="\\(f(x) = "+u4lin(m,b)+"\\)";
  var ds=u4pickS3(key,["\\(f(y) = "+u4lin(m,b)+"\\)","\\(f(x) = "+u4lin(m,-b)+"\\)","\\(f(x) = "+u4lin(-m,b)+"\\)","\\(f(x) = "+u4lin(b===0?m+1:b,m)+"\\)"]);
  if(b===0)ds=u4pickS3(key,["\\(f(y) = "+u4lin(m,b)+"\\)","\\(f(x) = "+u4lin(-m,b)+"\\)","\\(f(x) = "+u4lin(m+1,b)+"\\)"]);
  return mcq("Rewrite the equation \\(y = "+u4lin(m,b)+"\\) using function notation.",
    key,ds,
    "Function notation names the output \\(f(x)\\) in place of \\(y\\), and the rule on the right side stays unchanged: \\[ \\begin{aligned} y &= "+u4lin(m,b)+" \\\\ f(x) &= "+u4lin(m,b)+" \\end{aligned} \\] In function notation, the equation is <b>\\(f(x) = "+u4lin(m,b)+"\\)</b>.",
    {m:m,b:b,keyStr:key});
});

/* u9-pk-solve-input: borrowed verbatim from math-1201 entry u4-solve-input (math-1201:4.48). */
E("u9-pk-solve-input",9,["4.58"],2,"gen",function(){
  var fn=pick(["f","g","h"]);
  var m=pick([-4,-3,-2,-1,1,2,3,4,5]),b=ri(-9,10),xAns=ri(-6,9);
  var target=m*xAns+b;
  return numq("A linear function is given by \\("+fn+"(x) = "+u4lin(m,b)+"\\). For what domain value is \\("+fn+"(x) = "+target+"\\)?",
    xAns,0.011,
    "Set the function equal to the given range value and solve for the input: \\[ \\begin{aligned} "+u4lin(m,b)+" &= "+target+" \\\\ "+u4num(m)+"x &= "+(target-b)+" \\\\ x &= "+xAns+" \\end{aligned} \\] The domain value is <b>\\("+xAns+"\\)</b>.",
    {fn:fn,m:m,b:b,target:target,ans:xAns});
});

/* u9-pk-laws-integral: borrowed verbatim from math-1201 entry u2-laws-integral (math-1201:1.6). */
E("u9-pk-laws-integral",9,["4.65"],2,"gen",function(){
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

/* u9-pk-growth: authored micro-item (authored:percent-growth-repeated-multiplication),
   written for this tranche. */
E("u9-pk-growth",9,["4.65"],2,"gen",function(){
  if(ri(0,1)===0){
    var pair=pick([[800,5],[500,10],[1000,20],[400,25],[200,50],[1200,5],[600,10],[250,20],[900,10],[800,25]]);
    var P=pair[0], r=pair[1], g=1+r/100;
    var y1=P*g, y2=y1*g;
    return numq("A town has "+P+" people. Its population grows by "+r+"% each year. How many people will there be after 2 years?",
      Math.round(y2*100)/100,0.01,
      "Growing by "+r+"% means multiplying by \\(1 + "+r+"\\% = "+fmt(g)+"\\), once for each year. After 1 year: \\("+P+" \\times "+fmt(g)+" = "+fmt(y1)+"\\). After 2 years: \\("+fmt(y1)+" \\times "+fmt(g)+" = "+fmt(y2)+"\\). There will be <b>"+fmt(y2)+" people</b>.",
      {mode:"percent",P:P,r:r,ans:y2});
  }
  var s=pick([20,25,30,40,50,60]), f=pick([2,3]), ans=s*f*f*f;
  return numq("A rumour starts with "+s+" people who have heard it. Each day, the number of people who have heard it is multiplied by "+f+". How many people have heard it after 3 days?",
    ans,0.01,
    "Multiply by "+f+" once for each day: \\("+s+" \\times "+f+" = "+(s*f)+"\\), then \\("+(s*f)+" \\times "+f+" = "+(s*f*f)+"\\), then \\("+(s*f*f)+" \\times "+f+" = "+ans+"\\). After 3 days, <b>"+ans+" people</b> have heard it.",
    {mode:"repeated",s:s,f:f,ans:ans});
}, ["Growth by a percent is repeated multiplication, not repeated addition.", "Work one year (or one day) at a time."]);

/* Bimodal build additions (Nov 19, 2026): two written-form Level 2 entries (a geometric term from two consecutive terms, 4 marks; a finite geometric series context, 5 marks) and two selected-response entries (identifying a geometric sequence; a bouncing ball total distance, Level 3). SME-flagged for the specialist pass. */

/* u9-wcr-geo-two-terms: written form, 4 marks. Two consecutive terms give
   the common ratio; the general term rule then gives a later term. */
E("u9-wcr-geo-two-terms",9,["4.65","4.66"],2,"gen",function(){
  var t1=ri(2,9), r=pick([2,3,-2,-3]);
  var A=t1*r*r*r, B=A*r;
  var n=pick([8,9,10]);
  var ans=B*Math.pow(r,n-5);
  return numq("The fourth term of a geometric sequence is "+A+" and the fifth term is "+B+". What is the "+u9ord(n)+" term of the sequence?",
    ans,0.01,
    "Consecutive terms give the common ratio, and the general term rule then extends the sequence: \\[ \\begin{aligned} r &= \\frac{"+B+"}{"+A+"} = "+r+" \\\\ t_{"+n+"} &= t_5 \\times r^{"+(n-5)+"} \\\\ &= "+B+" \\times ("+r+")^{"+(n-5)+"} \\\\ &= "+B+" \\times "+Math.pow(r,n-5)+" \\\\ &= "+ans+" \\end{aligned} \\] The "+u9ord(n)+" term is <b>"+ans+"</b>.",
    {t1:t1,r:r,A:A,B:B,n:n,ans:ans});
});

/* u9-wcr-geo-series-views: written form, 5 marks. Daily view counts form a
   finite geometric series; find the total over the first n days. */
E("u9-wcr-geo-series-views",9,["4.68","4.69"],2,"gen",function(){
  var r=pick([2,3]);
  var a= r===2 ? ri(3,30) : 2*ri(2,15);
  var n=ri(4,7);
  var Sn= r===2 ? a*(Math.pow(2,n)-1) : a*(Math.pow(3,n)-1)/2;
  return numq("A video is posted online. On the first day, it gets "+a+" views. Each day after that, the number of views is "+r+" times the number of views on the previous day. What is the total number of views over the first "+n+" days?",
    Sn,0.01,
    "The daily view counts form a geometric series with first term \\("+a+"\\), common ratio \\("+r+"\\), and \\("+n+"\\) terms: \\[ \\begin{aligned} S_{"+n+"} &= \\frac{"+a+"\\left("+r+"^{"+n+"} - 1\\right)}{"+(r-1)+"} \\\\ &= \\frac{"+a+" \\times "+(Math.pow(r,n)-1)+"}{"+(r-1)+"} \\\\ &= "+Sn+" \\end{aligned} \\] The total number of views is <b>"+Sn+"</b>.",
    {a:a,r:r,n:n,Sn:Sn});
});

/* u9-add-geo-identify: which of four sequences is geometric. The three
   distractors are built from the same starting value with multiplier
   patterns whose ratios change, so all four options stay similar in length. */
E("u9-add-geo-identify",9,["4.64"],2,"gen",function(){
  var r=pick([2,2,3,-2]);
  var t= r===3 ? ri(2,6) : ri(2,14);
  var five=ri(0,1)===1;
  var keyM,aM,bM,cM;
  if(r===2){ keyM=[1,2,4,8]; aM=[1,2,3,4]; bM=[1,2,4,7]; cM=[1,3,5,7]; if(five){ keyM.push(16); aM.push(5); bM.push(11); cM.push(9); } }
  else if(r===3){ keyM=[1,3,9,27]; aM=[1,2,3,4]; bM=[1,3,9,20]; cM=[1,3,5,7]; if(five){ keyM.push(81); aM.push(5); bM.push(41); cM.push(9); } }
  else { keyM=[1,-2,4,-8]; aM=[1,-2,3,-4]; bM=[1,-2,4,-7]; cM=[1,-3,5,-7]; if(five){ keyM.push(16); aM.push(-5); bM.push(11); cM.push(9); } }
  function seq(ms){ return "\\("+ms.map(function(mm){ return t*mm; }).join(", ")+"\\)"; }
  var key=seq(keyM);
  return mcq("Which of the following sequences is geometric?",
    key, [seq(aM), seq(bM), seq(cM)],
    "A geometric sequence has the same ratio between every pair of consecutive terms. In the sequence "+key+", each term is "+r+" times the term before it, so the ratio is constantly "+r+". In each of the other sequences, the ratio changes from one pair of terms to the next. The geometric sequence is <b>"+key+"</b>.",
    {r:r,t:t,five:five});
});

/* u9-add-bounce-total: total distance travelled by a ball that rebounds to
   a fixed fraction of its previous height, as two infinite geometric series. */
E("u9-add-bounce-total",9,["4.69","4.71"],3,"gen",function(){
  var fams=[{n:1,d:2},{n:1,d:3},{n:2,d:3},{n:1,d:4}];
  var f=pick(fams), rn=f.n, rd=f.d;
  var H=6*ri(2,15);
  var key=H*(rd+rn)/(rd-rn);
  var cands=[H*rd/(rd-rn), 2*H*rd/(rd-rn), 2*H*rn/(rd-rn), H*(rd+rn)/rd, key+H];
  var dis=[];
  cands.forEach(function(v){ if(Number.isInteger(v) && v!==key && dis.indexOf(v)<0 && dis.length<3) dis.push(v); });
  var down=H*rd/(rd-rn), up=down-H;
  return mcq("A ball is dropped from a height of "+H+" m. Each time the ball hits the ground, it rebounds to \\("+u9fr(rn,rd)+"\\) of its previous height. The ball keeps bouncing in this way. What is the total distance, in metres, that the ball travels?",
    "\\("+key+"\\)", dis.map(function(v){ return "\\("+v+"\\)"; }),
    "The falling distances form an infinite geometric series with first term \\("+H+"\\) and ratio \\("+u9fr(rn,rd)+"\\), so they add to \\("+down+"\\). The rising distances are the same series without the first drop, so they add to \\("+down+" - "+H+" = "+up+"\\). \\[ \\begin{aligned} \\text{Total distance} &= "+down+" + "+up+" \\\\ &= "+key+" \\end{aligned} \\] The total distance travelled is <b>\\("+key+"\\) m</b>.",
    {H:H,rn:rn,rd:rd,key:key});
});

/* PK tranche pass for Unit 9. pkFor is the cluster's dependent
   indicator list from the prior knowledge map, as registered
   for this unit in courses.js. */
var PKT_U9_FOR=["4.55","4.56","4.57","4.58","4.59","4.60","4.61","4.62","4.63","4.64","4.65","4.66","4.67","4.68","4.69","4.70","4.71"];
var PKT_U9={
 "u9-pk-pattern-word":{src:"math-9:7.1",group:"patterns"},
 "u9-pk-pattern-figure":{src:"math-9:7.1",group:"patterns"},
 "u9-pk-table-equation":{src:"math-9:7.4",group:"patterns"},
 "u9-pk-context-equation":{src:"math-9:7.2",group:"patterns"},
 "u9-pk-fn-notation":{src:"math-1201:4.45",group:"function-notation"},
 "u9-pk-solve-input":{src:"math-1201:4.48",group:"isolate-variable"},
 "u9-pk-laws-integral":{src:"math-1201:1.6",group:"exponent-laws"},
 "u9-pk-growth":{src:"authored:percent-growth-repeated-multiplication",group:"growth-percent"}
};
BANK.forEach(function(e){var t=PKT_U9[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U9_FOR.slice();e.pkGroup=t.group;}});

/* ----- bank-fix.js ----- */
// Math 2200 Unit 8, 1 and 7 pool fix additions, carried verbatim from the
// standalone app's bank source (bank-src.js), where they follow Unit 9.
// CRMARKS: u1-terminal-point-cr=3
// CRMARKS: u7-context-roots-cr=2
// CRMARKS: u8-inequality-design=3
// CRMARKS: u8-sign-analysis-cr=2
/* ============ Constructed-response fit (tranches 1 and 2 tagging, November 2026) ============ */
/* Exam Section B draws only from these entries (marks per question); every other
   entry is selected-response only in exam mode. Worksheet mode uses these plus
   all numeric-answer entries. */
/* Unit test pool fix additions, November 9, 2026 (additions only).
   Unit 8: two Level 3 CR entries at 3 and 2 marks (the unit's whole
   Level 3 CR pool was one entry at 3 marks, which forms no pick).
   Unit 1 (fragile): one Level 2 CR entry at 3 marks.
   Unit 7 (fragile): one Level 3 CR entry at 2 marks. */

/* U8a. Build and solve a quadratic inequality from a situation (4.23, 4.25, L3, CR 3) */
E("u8-inequality-design",8,["4.23","4.25"],3,"gen",function(){
  var mode=ri(1,3);
  if(mode===1){
    var t1=pick([1,2,3]),t2=t1+pick([2,3,4,5,6]);
    var v=5*(t1+t2),H=5*t1*t2;
    var dur=t2-t1;
    return numq("A ball is thrown upward. Its height, in metres, after \\(t\\) seconds is \\(h(t) = -5t^2 + "+v+"t\\). For how many seconds is the ball higher than "+H+" metres?",
      dur,0.01,
      "The ball is higher than "+H+" m while \\(-5t^2 + "+v+"t > "+H+"\\), that is \\(5t^2 - "+v+"t + "+H+" < 0\\). The boundary equation \\(5t^2 - "+v+"t + "+H+" = 0\\) factors as \\(5(t - "+t1+")(t - "+t2+") = 0\\), with roots \\(t = "+t1+"\\) and \\(t = "+t2+"\\). The upward parabola \\(5t^2 - "+v+"t + "+H+"\\) is negative between its roots, so the ball is above "+H+" m from \\(t = "+t1+"\\) to \\(t = "+t2+"\\), a span of <b>"+dur+" seconds</b>.",
      {mode:mode,t1:t1,t2:t2,ans:dur});
  }
  if(mode===2){
    var r1=pick([2,3,4,5,6]),r2=r1+pick([3,4,5,6,7]);
    var B=r1+r2,C=r1*r2,ans=r2-1;
    return numq("A shop models its weekly profit, in hundreds of dollars, as \\(P(x) = -x^2 + "+B+"x - "+C+"\\), where \\(x\\) is the price, in dollars, of one item. What is the greatest whole-dollar price at which the shop still makes a profit?",
      ans,0.01,
      "Profit requires \\(P(x) > 0\\), that is \\(-x^2 + "+B+"x - "+C+" > 0\\), or \\(x^2 - "+B+"x + "+C+" < 0\\). The boundary equation factors: \\(x^2 - "+B+"x + "+C+" = (x - "+r1+")(x - "+r2+") = 0\\), with roots \\(x = "+r1+"\\) and \\(x = "+r2+"\\). The profit is positive strictly between the roots, so whole-dollar prices from "+(r1+1)+" to "+ans+" work, and the greatest is <b>"+ans+" dollars</b>.",
      {mode:mode,r1:r1,r2:r2,ans:ans});
  }
  var s1=pick([1,2,3,4]),s2=s1+pick([2,3,4,5]);
  var vv=2*(s1+s2),HH=2*s1*s2,dur3=s2-s1;
  return numq("A drone rises and then descends. Its height, in metres, after \\(t\\) seconds is \\(h(t) = -2t^2 + "+vv+"t\\). For how many seconds is the drone higher than "+HH+" metres?",
    dur3,0.01,
    "The drone is higher than "+HH+" m while \\(-2t^2 + "+vv+"t > "+HH+"\\), that is \\(2t^2 - "+vv+"t + "+HH+" < 0\\). The boundary equation \\(2t^2 - "+vv+"t + "+HH+" = 0\\) factors as \\(2(t - "+s1+")(t - "+s2+") = 0\\), with roots \\(t = "+s1+"\\) and \\(t = "+s2+"\\). The upward parabola is negative between its roots, so the drone is above "+HH+" m for a span of <b>"+dur3+" seconds</b>.",
    {mode:mode,s1:s1,s2:s2,ans:dur3});
});

/* U8b. Count the integers satisfying a quadratic inequality (4.24, L3, CR 2) */
E("u8-sign-analysis-cr",8,["4.24"],3,"gen",function(){
  var mode=ri(1,3);
  var r1=ri(-4,2),gap=pick([3,4,5,6]),r2=r1+gap;
  var B=-(r1+r2),C=r1*r2;
  function fac(r){return r<0?"(x + "+(-r)+")":r>0?"(x - "+r+")":"x";}
  function term(v,sym){if(v===0)return "";return (v<0?" - "+(-v):" + "+v)+sym;}
  var expr="x^2"+term(B,"x")+term(C,"");
  if(mode===1){
    var ans=gap-1;
    return numq("How many integers satisfy the inequality \\("+expr+" < 0\\)?",
      ans,0.01,
      "Factor: \\("+expr+" = "+fac(r1)+fac(r2)+"\\), with roots \\("+r1+"\\) and \\("+r2+"\\). The upward parabola is negative strictly between its roots, so the integers satisfying the inequality are those strictly between "+r1+" and "+r2+": there are "+r2+" - "+r1+" - 1 = <b>"+ans+"</b> of them.",
      {mode:mode,r1:r1,r2:r2,ans:ans});
  }
  if(mode===2){
    var ans2=gap+1;
    return numq("How many integers satisfy the inequality \\("+expr+" \\leq 0\\)?",
      ans2,0.01,
      "Factor: \\("+expr+" = "+fac(r1)+fac(r2)+"\\), with roots \\("+r1+"\\) and \\("+r2+"\\). The upward parabola is negative between its roots and zero at them, and the inequality allows equality, so the integers from "+r1+" to "+r2+" inclusive satisfy it: "+r2+" - "+r1+" + 1 = <b>"+ans2+"</b> of them.",
      {mode:mode,r1:r1,r2:r2,ans:ans2});
  }
  var ans3=gap-1;
  var negExpr="-x^2"+term(-B,"x")+term(-C,"");
  return numq("How many integers satisfy the inequality \\("+negExpr+" > 0\\)?",
    ans3,0.01,
    "Multiply by \\(-1\\) and reverse the inequality: \\("+negExpr+" > 0\\) is the same as \\("+expr+" < 0\\). Factor: \\("+expr+" = "+fac(r1)+fac(r2)+"\\), with roots \\("+r1+"\\) and \\("+r2+"\\); the expression is negative strictly between the roots, giving "+r2+" - "+r1+" - 1 = <b>"+ans3+"</b> integers.",
    {mode:mode,r1:r1,r2:r2,ans:ans3});
});

/* U1. Ratios and reference angle from a terminal point (7.13, L2, CR 3) */
E("u1-terminal-point-cr",1,["7.13"],2,"gen",function(){
  var triples=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29],[9,40,41],[12,35,37]];
  var t=pick(triples),sx=pick([1,-1]),sy=pick([1,-1]);
  var x=sx*t[0],y=sy*t[1],r=t[2],mode=ri(1,2);
  if(mode===1){
    var cosv=Math.round(100*x/r)/100;
    return numq("The point P("+x+", "+y+") lies on the terminal arm of an angle \\(\\theta\\) in standard position. What is the value of \\(\\cos\\theta\\), to two decimal places?",
      cosv,0.02,
      "The distance from the origin is \\(r = \\sqrt{"+x+"^2 + "+y+"^2} = \\sqrt{"+(t[0]*t[0]+t[1]*t[1])+"} = "+r+"\\). Then \\[ \\cos\\theta = \\frac{x}{r} = \\frac{"+x+"}{"+r+"} \\approx "+cosv+" \\] So \\(\\cos\\theta\\) is <b>"+cosv+"</b>.",
      {mode:mode,x:x,y:y,ans:cosv});
  }
  var ref=Math.round(Math.atan2(Math.abs(y),Math.abs(x))*180/Math.PI);
  return numq("The point P("+x+", "+y+") lies on the terminal arm of an angle \\(\\theta\\) in standard position. What is the reference angle of \\(\\theta\\), to the nearest degree?",
    ref,0.02,
    "The reference angle is the acute angle between the terminal arm and the x-axis. From the point, \\[ \\tan(\\theta_R) = \\frac{|y|}{|x|} = \\frac{"+Math.abs(y)+"}{"+Math.abs(x)+"} \\] so \\(\\theta_R = \\tan^{-1}\\left(\\frac{"+Math.abs(y)+"}{"+Math.abs(x)+"}\\right) \\approx "+ref+"^\\circ\\). The reference angle is <b>"+ref+" degrees</b>.",
    {mode:mode,x:x,y:y,ans:ref});
});

/* U7. Solve a system in context and select the root the context allows (4.53, 4.54, L3, CR 2) */
E("u7-context-roots-cr",7,["4.53","4.54"],3,"gen",function(){
  var mode=ri(1,3);
  if(mode===1){
    var t1=pick([1,2,3]),t2=t1+pick([2,3,4]);
    var v=5*(t1+t2),H=5*t1*t2;
    return numq("A ball is thrown upward. Its height, in metres, after \\(t\\) seconds is \\(h(t) = -5t^2 + "+v+"t\\). A camera flash fires at the instant the ball is at a height of "+H+" metres on its way down. At what time, in seconds, does the flash fire?",
      t2,0.01,
      "Set the height equal to "+H+": \\(-5t^2 + "+v+"t = "+H+"\\), so \\(5t^2 - "+v+"t + "+H+" = 0\\), which factors as \\(5(t - "+t1+")(t - "+t2+") = 0\\). The ball is at "+H+" m at \\(t = "+t1+"\\) s on the way up and at \\(t = "+t2+"\\) s on the way down. The flash fires on the way down, at <b>"+t2+" seconds</b>.",
      {mode:mode,t1:t1,t2:t2,ans:t2});
  }
  if(mode===2){
    var s1=pick([2,3,4,5,6,7,8]),s2=s1+pick([2,3,4,5,6]);
    var per=2*(s1+s2),area=s1*s2;
    return numq("A rectangular garden has a perimeter of "+per+" metres and an area of "+area+" square metres. What is the length, in metres, of the longer side of the garden?",
      s2,0.01,
      "Let the side lengths be \\(x\\) and \\(y\\). The perimeter gives \\(x + y = "+(s1+s2)+"\\), and the area gives \\(xy = "+area+"\\). The sides are the roots of \\(x^2 - "+(s1+s2)+"x + "+area+" = 0\\), which factors as \\((x - "+s1+")(x - "+s2+") = 0\\), so the sides are "+s1+" m and "+s2+" m. The longer side is <b>"+s2+" metres</b>.",
      {mode:mode,s1:s1,s2:s2,ans:s2});
  }
  var n=ri(2,11),d=pick([2,3,4,5,6]),prod=n*(n+d),big=n+d;
  return numq("Two whole numbers differ by "+d+". Their product is "+prod+". What is the larger of the two numbers?",
    big,0.01,
    "Let the smaller number be \\(x\\); the larger is \\(x + "+d+"\\). The product condition gives \\(x(x + "+d+") = "+prod+"\\), that is \\(x^2 + "+d+"x - "+prod+" = 0\\), which factors as \\((x - "+n+")(x + "+(n+d)+") = 0\\). The roots are "+n+" and "+(-(n+d))+"; the context uses whole numbers, so the smaller number is "+n+" and the larger is <b>"+big+"</b>.",
    {mode:mode,n:n,d:d,ans:big});
});

/* ============ Constructed-response marks (generated) ============ */
/* Built by assemble-bank.py from the CRMARKS manifests at the top of
   each unit file. Exam Section B draws only from these entries. */
window.__BANK_CRMARKS={"u1-ambiguous-case":3,"u1-axis-ratios":2,"u1-context-distance":3,"u1-cosine-law":2,"u1-exact-values":2,"u1-point-angle":2,"u1-point-distance":2,"u1-point-ratios":2,"u1-quadrant":1,"u1-read-sketch":1,"u1-reference-angle":1,"u1-same-reference":2,"u1-sine-law":2,"u1-solve-equation":2,"u1-terminal-point-cr":3,"u2-analyze-problem":3,"u2-complete-square":2,"u2-cts-reasoning":2,"u2-error-complete-square":3,"u2-intercepts-count":2,"u2-model-situation":3,"u2-model-situation-evaluate":3,"u2-translations":1,"u2-vertex-read":1,"u2-vertex-rule":3,"u2-vertex-standard":2,"u2-write-from-characteristics":3,"u3-derive-apply":3,"u3-derive-cts-number":1,"u3-derive-first-step":2,"u3-derive-formula":4,"u3-derive-late-steps":3,"u3-discriminant-compute":1,"u3-discriminant-k":3,"u3-discriminant-param":3,"u3-discriminant-range":2,"u3-error-expand":2,"u3-factor-common":1,"u3-factor-completely":2,"u3-factor-func-diff":2,"u3-factor-negative":2,"u3-factor-pst":2,"u3-factor-test":2,"u3-factor-test-evaluate":1,"u3-factor-test-find-k":2,"u3-factor-test-remainder":2,"u3-factor-trinomial":2,"u3-factor-trinomial-nonmonic":2,"u3-factor-trinomial-two-var":2,"u3-factor-two-var":2,"u3-func-diff-completely":3,"u3-func-diff-expand":1,"u3-func-diff-functions":2,"u3-func-diff-quad-inner":2,"u3-func-diff-simple":2,"u3-intercepts-find-a":3,"u3-method-choice":3,"u3-method-verify-check":2,"u3-problem-model":3,"u3-problem-path":3,"u3-problem-projectile-height":3,"u3-problem-revenue":3,"u3-problem-sum-squares":3,"u3-problem-triangle":3,"u3-roots-from-graph":2,"u3-roots-zeros":1,"u3-solve-formula-radical":2,"u3-solve-fraction-roots":2,"u3-solve-nature-roots":2,"u3-solve-strategies":2,"u3-zeros-count":1,"u4-conjugate-why":3,"u4-convert-numeric":1,"u4-defined-values":2,"u4-extraneous-why":3,"u4-model-radical":3,"u4-order-radicals":2,"u4-rationalize-binomial":3,"u4-rationalize-mono":1,"u4-root-of-square":1,"u4-simplify-ops":2,"u4-solve-radical":2,"u4-var-to-entire":1,"u4-var-to-mixed":2,"u4-verify-roots":2,"u5-add-subtract":2,"u5-complex-fraction":2,"u5-divide":2,"u5-equivalent-form":1,"u5-equivalent-restrictions":2,"u5-error-cancel":2,"u5-lcd":1,"u5-lcd-choose":2,"u5-meeting-problem":3,"u5-multiply":2,"u5-npv-basic":1,"u5-npv-quadratic":2,"u5-simplify-basic":1,"u5-simplify-evaluate":2,"u5-simplify-trinomial":2,"u5-solve-linear":2,"u5-word-problem":3,"u6-abs-context":2,"u6-distance":1,"u6-equation-from-graph":2,"u6-evaluate-abs":1,"u6-invariant-points":2,"u6-no-solution":2,"u6-order-abs":1,"u6-original-from-reciprocal":3,"u6-piecewise":2,"u6-recip-features":2,"u6-simplify-expr":2,"u6-solve-graphical":2,"u6-solve-linear":2,"u6-solve-quadratic":3,"u6-wcr-abs-error-correction":4,"u6-wcr-drone-height":5,"u7-classify-algebraic":2,"u7-context-area":2,"u7-context-projectile":3,"u7-context-roots-cr":2,"u7-graph-count":1,"u7-graph-solutions":2,"u7-intersection-meaning":1,"u7-model-two-numbers":3,"u7-solve-linquad":2,"u7-solve-quadquad":2,"u7-tangent-param":4,"u8-both-hold":3,"u8-inequality-design":3,"u8-model-context":3,"u8-numberline-quad":2,"u8-numberline-read":1,"u8-quad-graph-id":2,"u8-quad-solve-inside":2,"u8-quad-solve-special":3,"u8-scenario-solve":2,"u8-sign-analysis-cr":2,"u8-solve-linear-basic":1,"u8-solve-linear-flip":2,"u8-wcr-ticket-fundraiser":5,"u9-arith-diff":1,"u9-arith-find-missing":2,"u9-arith-general-term":2,"u9-arith-graph-link":2,"u9-arith-nth-count":2,"u9-arith-series-context":2,"u9-arith-sum-formula":2,"u9-crossover":3,"u9-evaluate-offers":3,"u9-geo-find-index":2,"u9-geo-nth-term":2,"u9-geo-ratio":1,"u9-geo-sum-finite":2,"u9-infinite-sum":2,"u9-wcr-geo-series-views":5,"u9-wcr-geo-two-terms":4};
/* ============ Bimodal entries (generated) ============ */
/* Built by assemble-bank.py from the BIMODAL manifests in the unit
   files (Spec-Bimodal-Questions-2026-11-19.md): entries whose
   multiple-choice questions may be stripped to constructed
   response, class a (online-checkable) or b (print/self-check). */
window.__BANK_BIMODAL={"u1-ambiguous-case":"a","u1-exact-values":"a","u1-point-ratios":"a","u1-solve-equation":"a","u2-complete-square":"b","u2-error-complete-square":"b","u2-model-situation":"b","u2-vertex-rule":"a","u2-vertex-standard":"a","u2-write-from-characteristics":"b","u3-derive-apply":"b","u3-derive-formula":"b","u3-derive-late-steps":"b","u3-discriminant-range":"b","u3-factor-completely":"b","u3-factor-func-diff":"b","u3-factor-negative":"b","u3-factor-pst":"b","u3-factor-trinomial-nonmonic":"b","u3-factor-trinomial-two-var":"b","u3-factor-two-var":"b","u3-func-diff-completely":"b","u3-func-diff-functions":"b","u3-func-diff-quad-inner":"b","u3-method-choice":"b","u3-roots-from-graph":"a","u3-solve-formula-radical":"b","u3-solve-fraction-roots":"a","u3-solve-nature-roots":"a","u3-solve-strategies":"b","u4-conjugate-why":"b","u4-extraneous-why":"b","u4-order-radicals":"a","u4-rationalize-binomial":"b","u4-simplify-ops":"b","u4-var-to-mixed":"b","u5-add-subtract":"b","u5-divide":"b","u5-equivalent-restrictions":"b","u5-error-cancel":"b","u5-multiply":"b","u5-npv-quadratic":"a","u5-simplify-trinomial":"b","u6-equation-from-graph":"b","u6-invariant-points":"a","u6-no-solution":"a","u6-original-from-reciprocal":"b","u6-piecewise":"b","u6-recip-features":"b","u6-solve-linear":"a","u6-solve-quadratic":"a","u7-classify-algebraic":"a","u7-context-area":"b","u7-context-projectile":"a","u7-model-two-numbers":"a","u7-solve-linquad":"a","u7-solve-quadquad":"a","u7-tangent-param":"a","u8-both-hold":"a","u8-numberline-quad":"b","u8-quad-solve-inside":"a","u8-solve-linear-flip":"a","u9-arith-general-term":"b","u9-arith-graph-link":"b","u9-infinite-sum":"a"};
