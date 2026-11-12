/* Chemistry 2202 bank helpers: the chemistry data shared by the bank.
   In the standalone app these two definitions live in the bank preamble
   its build script wraps around the unit files (chem-2202-review/
   build.py); the unit files read them as globals, so the unified bank
   module carries them in this helpers file, first in the build order.
   Values verbatim from the standalone preamble. */
var CHEM_AM={H:1.01,He:4.00,Li:6.94,Be:9.01,B:10.81,C:12.01,N:14.01,O:16.00,F:19.00,Ne:20.18,Na:22.99,Mg:24.31,Al:26.98,Si:28.09,P:30.97,S:32.07,Cl:35.45,K:39.10,Ca:40.08,Cr:52.00,Mn:54.94,Fe:55.85,Co:58.93,Ni:58.69,Cu:63.55,Zn:65.39,Br:79.90,Ag:107.87,Sn:118.71,I:126.90,Ba:137.33,Hg:200.59,Pb:207.20};
var CHEM_AV=6.022e23;

/* ============ Diagram figures (Phase C, Nov 2026) ============
   Original code-generated SVG drawings, built from each question's own
   drawn values. Two figure families only, both settled as faithful and
   unambiguous in the Phase C audit (see bank-u2.js header):
   1. Lewis structures for the molecules whose usual Lewis structure is
      a single settled drawing and whose bonding pair and lone pair
      counts match the bank's own counts in u2-03 and u2-07. Sulfur
      dioxide and sulfur trioxide are deliberately absent from the spec
      table: both have equivalent resonance forms, and which depiction
      to show is an SME call, so draws of those two molecules carry no
      figure. chemLewisFigure returns null for any formula with no spec.
   2. The shifted ionic lattice for the one u2-35 variant whose stem
      says a diagram shows a layer pushed sideways: generic positive and
      negative ions only, exactly as that stem describes.
   Layout convention for Lewis structures: the school cross layout
   (terminals left, right, top, bottom; lone pairs in the free slots).
   A Lewis structure shows connectivity and electrons, not geometry. */
var CHEM_LEWIS_SPECS={
"H\u2082O":{c:"O",clp:2,t:[{s:"H",b:1,lp:0},{s:"H",b:1,lp:0}]},
"NH\u2083":{c:"N",clp:1,t:[{s:"H",b:1,lp:0},{s:"H",b:1,lp:0},{s:"H",b:1,lp:0}]},
"CH\u2084":{c:"C",clp:0,t:[{s:"H",b:1,lp:0},{s:"H",b:1,lp:0},{s:"H",b:1,lp:0},{s:"H",b:1,lp:0}]},
"CO\u2082":{c:"C",clp:0,t:[{s:"O",b:2,lp:2},{s:"O",b:2,lp:2}]},
"BF\u2083":{c:"B",clp:0,t:[{s:"F",b:1,lp:3},{s:"F",b:1,lp:3},{s:"F",b:1,lp:3}]},
"PCl\u2083":{c:"P",clp:1,t:[{s:"Cl",b:1,lp:3},{s:"Cl",b:1,lp:3},{s:"Cl",b:1,lp:3}]},
"H\u2082S":{c:"S",clp:2,t:[{s:"H",b:1,lp:0},{s:"H",b:1,lp:0}]},
"BeCl\u2082":{c:"Be",clp:0,t:[{s:"Cl",b:1,lp:3},{s:"Cl",b:1,lp:3}]},
"CH\u2082O":{c:"C",clp:0,t:[{s:"O",b:2,lp:2},{s:"H",b:1,lp:0},{s:"H",b:1,lp:0}]},
"CCl\u2084":{c:"C",clp:0,t:[{s:"Cl",b:1,lp:3},{s:"Cl",b:1,lp:3},{s:"Cl",b:1,lp:3},{s:"Cl",b:1,lp:3}]},
"NF\u2083":{c:"N",clp:1,t:[{s:"F",b:1,lp:3},{s:"F",b:1,lp:3},{s:"F",b:1,lp:3}]},
"NH\u2084\u207A":{c:"N",clp:0,ch:"+",t:[{s:"H",b:1,lp:0},{s:"H",b:1,lp:0},{s:"H",b:1,lp:0},{s:"H",b:1,lp:0}]},
"H\u2083O\u207A":{c:"O",clp:1,ch:"+",t:[{s:"H",b:1,lp:0},{s:"H",b:1,lp:0},{s:"H",b:1,lp:0}]},
"HCl":{pair:[{s:"H",lp:0},{s:"Cl",lp:3}],b:1},
"F\u2082":{pair:[{s:"F",lp:3},{s:"F",lp:3}],b:1},
"O\u2082":{pair:[{s:"O",lp:2},{s:"O",lp:2}],b:2},
"N\u2082":{pair:[{s:"N",lp:1},{s:"N",lp:1}],b:3}
};
function chemLewisFigure(formula){
  var spec=CHEM_LEWIS_SPECS[formula];
  if(!spec)return null;
  var INK="#17352a",W=320,H=190,CX=160,CY=95;
  function n2(v){return Math.round(v*10)/10;}
  function txt(x,y,str,size,bold){
    return '<text x="'+n2(x)+'" y="'+n2(y)+'" font-size="'+(size||15)+'" fill="'+INK+'" stroke="#ffffff" stroke-width="4" style="paint-order:stroke" stroke-linejoin="round" text-anchor="middle" dominant-baseline="central"'+(bold?' font-weight="bold"':"")+'>'+str+'</text>';
  }
  function dots(x,y,angDeg){
    var a=angDeg*Math.PI/180,px=-Math.sin(a),py=Math.cos(a);
    return '<circle cx="'+n2(x+px*4.6)+'" cy="'+n2(y+py*4.6)+'" r="2.4" fill="'+INK+'"/><circle cx="'+n2(x-px*4.6)+'" cy="'+n2(y-py*4.6)+'" r="2.4" fill="'+INK+'"/>';
  }
  function lpAround(x,y,outDeg,count){
    var offs=count===1?[0]:count===2?[-42,42]:count===3?[-58,0,58]:[],out="";
    for(var i=0;i<offs.length;i++){
      var a=(outDeg+offs[i])*Math.PI/180;
      out+=dots(x+Math.cos(a)*22,y+Math.sin(a)*22,outDeg+offs[i]);
    }
    return out;
  }
  function bondLines(x1,y1,x2,y2,order){
    var dx=x2-x1,dy=y2-y1,len=Math.sqrt(dx*dx+dy*dy)||1,px=-dy/len,py=dx/len;
    var offs=order===1?[0]:order===2?[-4,4]:[-6,0,6],out="";
    for(var i=0;i<offs.length;i++){
      out+='<line x1="'+n2(x1+px*offs[i])+'" y1="'+n2(y1+py*offs[i])+'" x2="'+n2(x2+px*offs[i])+'" y2="'+n2(y2+py*offs[i])+'" stroke="'+INK+'" stroke-width="2"/>';
    }
    return out;
  }
  var body="";
  if(spec.pair){
    var ax=CX-48,ay=CY,bx=CX+48,by=CY;
    body+=bondLines(ax+15,ay,bx-15,by,spec.b);
    body+=lpAround(ax,ay,180,spec.pair[0].lp);
    body+=lpAround(bx,by,0,spec.pair[1].lp);
    body+=txt(ax,ay,spec.pair[0].s,16,true)+txt(bx,by,spec.pair[1].s,16,true);
  }else{
    var dirs=spec.t.length===1?[[1,0]]:spec.t.length===2?[[-1,0],[1,0]]:spec.t.length===3?[[-1,0],[1,0],[0,-1]]:[[ -1,0],[1,0],[0,-1],[0,1]];
    var R=56,used={},i,d,tx,ty;
    for(i=0;i<spec.t.length;i++){
      d=dirs[i];used[d[0]+","+d[1]]=1;
      tx=CX+d[0]*R;ty=CY+d[1]*R;
      body+=bondLines(CX+d[0]*15,CY+d[1]*15,tx-d[0]*15,ty-d[1]*15,spec.t[i].b);
    }
    var free=[[0,1],[0,-1],[-1,0],[1,0]].filter(function(f){return !used[f[0]+","+f[1]];});
    for(i=0;i<spec.clp&&i<free.length;i++){
      d=free[i];
      body+=dots(CX+d[0]*22,CY+d[1]*22,d[0]!==0?0:90);
    }
    for(i=0;i<spec.t.length;i++){
      d=dirs[i];tx=CX+d[0]*R;ty=CY+d[1]*R;
      var deg=Math.atan2(d[1],d[0])*180/Math.PI;
      body+=lpAround(tx,ty,deg,spec.t[i].lp);
      body+=txt(tx,ty,spec.t[i].s,16,true);
    }
    body+=txt(CX,CY,spec.c,16,true);
    if(spec.ch){
      body+='<path d="M 58 30 L 46 30 L 46 160 L 58 160 M 262 30 L 274 30 L 274 160 L 262 160" fill="none" stroke="'+INK+'" stroke-width="2"/>';
      body+=txt(288,42,spec.ch,16,true);
    }
  }
  return '<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Lewis structure of '+formula+'">'+body+'</svg>';
}
function chemShiftedLatticeSVG(){
  var INK="#17352a",ALT="#b3541e",W=320,H=190;
  function ion(x,y,cat){
    return '<circle cx="'+x+'" cy="'+y+'" r="17" fill="'+(cat?"#dcefe2":"#f7e3d3")+'" stroke="'+INK+'" stroke-width="1.6"/><text x="'+x+'" y="'+y+'" font-size="16" fill="'+INK+'" text-anchor="middle" dominant-baseline="central" font-weight="bold">'+(cat?"+":"-")+'</text>';
  }
  var xs=[70,124,178,232],body="",i;
  body+='<line x1="52" y1="30" x2="102" y2="30" stroke="'+INK+'" stroke-width="2"/><polygon points="102,30 92,25 92,35" fill="'+INK+'"/>';
  body+='<text x="112" y="30" font-size="12" fill="'+INK+'" dominant-baseline="central">one layer shifted sideways</text>';
  for(i=0;i<xs.length;i++){body+=ion(xs[i],68,i%2===0);}
  body+='<line x1="30" y1="106" x2="290" y2="106" stroke="'+ALT+'" stroke-width="1.6" stroke-dasharray="6 5"/>';
  body+='<text x="290" y="94" font-size="11" fill="'+ALT+'" text-anchor="end">plane</text>';
  for(i=0;i<xs.length;i++){body+=ion(xs[i],144,i%2===0);}
  return '<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: one layer of an ionic lattice shifted sideways by one ion spacing, so ions of the same charge face each other across a plane">'+body+'</svg>';
}
