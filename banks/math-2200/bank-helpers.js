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
