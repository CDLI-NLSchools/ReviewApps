/* Chemistry 2202 bank module for the unified review app shell.
   Assembled by assemble-bank.py from banks/chem-2202/; edit the
   per-unit sources there, not this file. Entries register through
   the shell's E(id, unit, indicators, level, kind, gen). */

/* ----- bank-helpers.js ----- */
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

/* ============ Condensed structure figures (Tranche 7, Nov 2026) ============
   A condensed structural formula is parsed into a graph of group tiles
   (CH3, CH2, CH, COOH, and so on) joined by single, double, or triple
   bonds, with bracketed groups drawn as branches. The parse is strict:
   every group tile's incident bond-order sum must equal the valence the
   group has in the bank's own condensed notation, and any formula the
   parser cannot account for completely returns null, so the entry
   carries no figure rather than a wrong one. The diagram transcribes
   the condensed formula already printed in the stem; it adds no atoms,
   bonds, or positions the formula does not state. Ring shorthand
   "(CH2)n ring" draws a polygon of CH2 tiles, and benzene draws as the
   usual hexagon with a circle. Disubstituted benzene formulas such as
   C6H4Cl2 are molecular formulas, not structures, and return null. */
var CHEM_SUBD={"\u2082":2,"\u2083":3,"\u2084":4,"\u2085":5,"\u2086":6,"\u2087":7,"\u2088":8,"\u2089":9};
var CHEM_TOKENS=[
 ["CONH\u2082",{C:1,O:1,N:1,H:2},1],
 ["COOH",{C:1,O:2,H:1},1],
 ["C\u2086H\u2085",{C:6,H:5},1],
 ["C\u2086H\u2084",{C:6,H:4},2],
 ["C\u2082H\u2085",{C:2,H:5},1],
 ["C\u2083H\u2087",{C:3,H:7},1],
 ["C\u2084H\u2089",{C:4,H:9},1],
 ["CH\u2083",{C:1,H:3},1],
 ["CH\u2082",{C:1,H:2},2],
 ["CH\u2084",{C:1,H:4},0],
 ["CHO",{C:1,H:1,O:1},1],
 ["NH\u2082",{N:1,H:2},1],
 ["CH",{C:1,H:1},3],
 ["CO",{C:1,O:1},2],
 ["Cl",{Cl:1},1],
 ["Br",{Br:1},1],
 ["OH",{O:1,H:1},1],
 ["C",{C:1},4],
 ["O",{O:1},2],
 ["H",{H:1},1],
 ["F",{F:1},1],
 ["I",{I:1},1]
];
var CHEM_TOKEN_MAP={};
CHEM_TOKENS.forEach(function(t){CHEM_TOKEN_MAP[t[0]]=t;});
function chemFigTxt(x,y,str,size,bold,anchor){
  return '<text x="'+fmt(x,1)+'" y="'+fmt(y,1)+'" font-size="'+(size||13)+'" fill="#17352a" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="'+(anchor||"middle")+'" dominant-baseline="central"'+(bold?' font-weight="bold"':"")+'>'+str+'</text>';
}
function chemParseSeq(str){
  var items=[],bonds=[],queued=[],i=0,pending=1;
  function clone(o){return JSON.parse(JSON.stringify(o));}
  while(i<str.length){
    var ch=str.charAt(i);
    if(ch===" "){i++;continue;}
    if(ch==="="||ch==="\u2261"){
      if(pending!==1)return null;
      pending=(ch==="=")?2:3; i++; continue;
    }
    if(ch==="("){
      if(pending!==1)return null;
      var depth=0,j=i;
      for(;j<str.length;j++){
        var cj=str.charAt(j);
        if(cj==="(")depth++;
        else if(cj===")"){depth--; if(depth===0)break;}
      }
      if(j>=str.length||depth!==0)return null;
      var inner=chemParseSeq(str.slice(i+1,j));
      if(!inner)return null;
      /* A bracketed substituent on its own, as in CH3CH(OH)CH3, parses to
         an empty sequence with the group left queued; promote the queued
         group to the branch sequence so the branch is not lost. */
      if(inner.seq.length===0){
        if(inner.queued&&inner.queued.length){
          var qItem=inner.queued[0].seq[0];
          qItem.branches=inner.queued.slice(1);
          inner={seq:[qItem],bonds:[]};
        }else{return null;}
      }
      var rep=1,k=j+1;
      if(k<str.length&&CHEM_SUBD[str.charAt(k)]!==undefined){rep=CHEM_SUBD[str.charAt(k)];k++;}
      if(inner.seq.length===1&&inner.seq[0].label==="CH\u2082"&&inner.seq[0].branches.length===0&&rep>=2&&items.length>0){
        for(var r=0;r<rep;r++){bonds.push(1); items.push(clone(inner.seq[0]));}
      }else{
        for(var r2=0;r2<rep;r2++){
          if(items.length>0){items[items.length-1].branches.push(clone(inner));}
          else{queued.push(clone(inner));}
        }
      }
      i=k; continue;
    }
    var matched=null;
    for(var t=0;t<CHEM_TOKENS.length;t++){
      if(str.substr(i,CHEM_TOKENS[t][0].length)===CHEM_TOKENS[t][0]){matched=CHEM_TOKENS[t][0];break;}
    }
    if(!matched)return null;
    /* "CHOH" is a CH group bearing an OH group, not the aldehyde group
       CHO followed by H; condensed notation never writes the latter. */
    if(matched==="CHO"&&str.substr(i,4)==="CHOH")matched="CH";
    /* Halogens, OH, and NH2 written mid-sequence are substituents on the
       previous group (CH3CHClCH3, CH3CHOHCH3), not links in the chain:
       attach them as branches and let the chain continue past them. */
    if(matched==="Cl"||matched==="Br"||matched==="F"||matched==="I"||matched==="OH"||matched==="NH\u2082"){
      if(pending!==1)return null;
      var sbr={seq:[{label:matched,branches:[]}],bonds:[]};
      if(items.length>0){items[items.length-1].branches.push(sbr);}
      else{queued.push(sbr);}
      i+=matched.length; continue;
    }
    var item={label:matched,branches:queued}; queued=[];
    if(items.length>0)bonds.push(pending);
    items.push(item); pending=1; i+=matched.length;
  }
  if(pending!==1)return null;
  return {seq:items,bonds:bonds,queued:queued};
}
function chemBuildGraph(tree){
  var nodes=[],edges=[],occ={},failed=false;
  var SLOTS=[[0,-1],[0,1],[-1,-1],[1,-1],[-1,1],[1,1],[0,-2],[0,2]];
  function placeSeq(seq,bonds,gx,gy,dx,dy){
    var first=-1,prev=-1;
    for(var idx=0;idx<seq.length;idx++){
      var it=seq[idx];
      var x=gx+dx*idx, y=gy+dy*idx;
      var key=x+","+y;
      if(occ[key]){failed=true;return -1;}
      occ[key]=1;
      var id=nodes.length;
      nodes.push({label:it.label,gx:x,gy:y});
      if(first<0)first=id;
      if(prev>=0)edges.push([prev,id,bonds[idx-1]||1]);
      prev=id;
      for(var b=0;b<it.branches.length;b++){
        var slot=SLOTS[b%SLOTS.length];
        var br=it.branches[b];
        var bid=placeSeq(br.seq,br.bonds,x+slot[0],y+slot[1],slot[0],slot[1]<0?-1:1);
        if(bid<0){failed=true;return -1;}
        edges.push([id,bid,1]);
      }
    }
    return first;
  }
  var first=placeSeq(tree.seq,tree.bonds,0,0,1,0);
  if(failed||first<0)return null;
  return {nodes:nodes,edges:edges};
}
function chemValidateGraph(g){
  var sums=[],atoms={},i;
  for(i=0;i<g.nodes.length;i++)sums.push(0);
  g.edges.forEach(function(e){sums[e[0]]+=e[2]; sums[e[1]]+=e[2];});
  for(i=0;i<g.nodes.length;i++){
    var spec=CHEM_TOKEN_MAP[g.nodes[i].label];
    if(!spec||sums[i]!==spec[2])return null;
    var at=spec[1];
    for(var k in at){atoms[k]=(atoms[k]||0)+at[k];}
  }
  return atoms;
}
function chemFigParts(src){
  if(typeof src!=="string")return null;
  var s=src.trim(),INK="#17352a";
  if(s==="six carbon ring, C\u2086H\u2086"||s==="C\u2086H\u2086 ring"){
    var bbody='<polygon points="110,28 168,61 168,129 110,162 52,129 52,61" fill="none" stroke="'+INK+'" stroke-width="2.2"/><circle cx="110" cy="95" r="30" fill="none" stroke="'+INK+'" stroke-width="2"/>';
    return {body:bbody,w:220,h:190,atoms:{C:6,H:6}};
  }
  var rm=s.match(/^\((CH\u2082)\)(.+) ring$/);
  if(rm){
    var n=CHEM_SUBD[rm[2]];
    if(!n||n<3||n>8)return null;
    var cx=110,cy=95,R=Math.max(34,23/Math.sin(Math.PI/n)),pts=[],i2,rbody="";
    for(i2=0;i2<n;i2++){var a=-Math.PI/2+i2*2*Math.PI/n; pts.push([cx+R*Math.cos(a),cy+R*Math.sin(a)]);}
    for(i2=0;i2<n;i2++){
      var p1=pts[i2],p2=pts[(i2+1)%n];
      rbody+='<line x1="'+fmt(p1[0],1)+'" y1="'+fmt(p1[1],1)+'" x2="'+fmt(p2[0],1)+'" y2="'+fmt(p2[1],1)+'" stroke="'+INK+'" stroke-width="2"/>';
    }
    for(i2=0;i2<n;i2++){
      rbody+='<circle cx="'+fmt(pts[i2][0],1)+'" cy="'+fmt(pts[i2][1],1)+'" r="16" fill="#eef6f0" stroke="'+INK+'" stroke-width="1.4"/>'+chemFigTxt(pts[i2][0],pts[i2][1],"CH\u2082",11,true);
    }
    return {body:rbody,w:220,h:190,atoms:{C:n,H:2*n}};
  }
  var tree=chemParseSeq(s);
  if(!tree||!tree.seq.length)return null;
  var g=chemBuildGraph(tree);
  if(!g)return null;
  var atoms=chemValidateGraph(g);
  if(!atoms)return null;
  var mnx=1e9,mxx=-1e9,mny=1e9,mxy=-1e9;
  g.nodes.forEach(function(nd){
    mnx=Math.min(mnx,nd.gx); mxx=Math.max(mxx,nd.gx);
    mny=Math.min(mny,nd.gy); mxy=Math.max(mxy,nd.gy);
  });
  function X(nd){return 48+(nd.gx-mnx)*62;}
  function Y(nd){return 46+(nd.gy-mny)*52;}
  var W=(mxx-mnx)*62+96, H=(mxy-mny)*52+92, body="";
  g.edges.forEach(function(e){
    var a=g.nodes[e[0]],b=g.nodes[e[1]];
    var x1=X(a),y1=Y(a),x2=X(b),y2=Y(b);
    var dx=x2-x1,dy=y2-y1,len=Math.sqrt(dx*dx+dy*dy)||1,px=-dy/len,py=dx/len;
    var offs=e[2]===1?[0]:e[2]===2?[-3.6,3.6]:[-4.6,0,4.6];
    offs.forEach(function(off){
      body+='<line x1="'+fmt(x1+px*off,1)+'" y1="'+fmt(y1+py*off,1)+'" x2="'+fmt(x2+px*off,1)+'" y2="'+fmt(y2+py*off,1)+'" stroke="'+INK+'" stroke-width="2"/>';
    });
  });
  g.nodes.forEach(function(nd){
    var wpx=Math.max(34,nd.label.length*8.2+16);
    body+='<rect x="'+fmt(X(nd)-wpx/2,1)+'" y="'+fmt(Y(nd)-14,1)+'" width="'+fmt(wpx,1)+'" height="28" rx="7" fill="#eef6f0" stroke="'+INK+'" stroke-width="1.4"/>';
    body+=chemFigTxt(X(nd),Y(nd)+1,nd.label,13,true);
  });
  return {body:body,w:W,h:H,atoms:atoms};
}
function chemCondensedFigure(src){
  var p=chemFigParts(src);
  if(!p)return null;
  return '<svg viewBox="0 0 '+p.w+' '+p.h+'" width="340" height="'+Math.round(340*p.h/p.w)+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Condensed structure diagram for '+src+'">'+p.body+'</svg>';
}
function chemMultiFigure(srcs,labels){
  var parts=[],i,p;
  for(i=0;i<srcs.length;i++){
    p=chemFigParts(srcs[i]);
    if(!p)return null;
    parts.push(p);
  }
  var W=0,H=0;
  parts.forEach(function(p2){W=Math.max(W,p2.w); H+=p2.h+(labels?18:6);});
  var body="",y=0;
  parts.forEach(function(p2,idx){
    if(labels){body+=chemFigTxt(14,y+13,labels[idx],13,true,"start"); y+=18;}
    body+='<g transform="translate(0,'+y+')">'+p2.body+'</g>';
    y+=p2.h+6;
  });
  return '<svg viewBox="0 0 '+W+' '+H+'" width="340" height="'+Math.round(340*H/W)+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Condensed structure diagrams">'+body+'</svg>';
}
function chemPairFigure(a,b){
  return chemMultiFigure([a,b],["A","B"]);
}
function chemCondensedInfo(src){
  var p=chemFigParts(src);
  return p?{atoms:p.atoms}:null;
}

/* ----- bank-u1.js ----- */
// Chemistry 2202 Unit 1 Stoichiometry question bank
// CRMARKS: u1-51-write-formula=2
// CRMARKS: u1-51-write-name=2
// CRMARKS: u1-52-molar-mass=2
// CRMARKS: u1-52-mass-to-moles=2
// CRMARKS: u1-52-moles-to-mass=2
// CRMARKS: u1-52-particles-to-moles=2
// CRMARKS: u1-52-mass-to-particles=3
// CRMARKS: u1-52-mass-to-volume-stp=3
// CRMARKS: u1-53-predict-state=2
// CRMARKS: u1-54-rate-comparison=2
// CRMARKS: u1-55-temperature-prediction=2
// CRMARKS: u1-56-precipitate-formula=3
// CRMARKS: u1-56-precipitate-formula-advanced=3
// CRMARKS: u1-57-moles-direct=2
// CRMARKS: u1-57-moles-reverse=2
// CRMARKS: u1-57-particles-ratio=3
// CRMARKS: u1-58-mass-to-mass=3
// CRMARKS: u1-58-mass-to-gas-volume=3
// CRMARKS: u1-58-concentration=2
// CRMARKS: u1-58-dilution=2
// CRMARKS: u1-58-limiting-theoretical-yield=4
// CRMARKS: u1-58-excess-remaining=4
// CRMARKS: u1-59-percent-yield-direct=2
// CRMARKS: u1-59-percent-yield-from-reaction=3
// CRMARKS: u1-510-antacid-calculation=3
// CRMARKS: u1-510-airbag-and-fertilizer=3

/* ============ Units and significant figures discipline (Nov 2026 pass) ============
   Givens print at 3 significant figures minimum (data sheet constants such
   as molar masses keep their full printed precision). Intermediates print
   at 4 significant figures: one guard digit, following the Chemistry 3202
   clarifications rule to carry at least one extra digit through a
   calculation and round only the final answer. Final answers are stored
   and printed at 3 significant figures, always with their unit in the
   solution. Exact numbers (coefficients, counts, ratios) are exempt. */
function sfR(x,sf){if(!isFinite(x)||x===0)return 0;var d=Math.pow(10,sf-Math.ceil(Math.log10(Math.abs(x))));return Math.round(x*d)/d;}
function sfSup(e){var m={"-":"\u207B","0":"\u2070","1":"\u00B9","2":"\u00B2","3":"\u00B3","4":"\u2074","5":"\u2075","6":"\u2076","7":"\u2077","8":"\u2078","9":"\u2079"};return String(e).split("").map(function(c){return m[c];}).join("");}
function sfF(x,sf){var r=sfR(x,sf);if(r===0)return "0."+"000".slice(0,Math.max(0,sf-1));var exp=Math.floor(Math.log10(Math.abs(r))),dec=sf-1-exp;if(dec<0){return (r/Math.pow(10,exp)).toFixed(sf-1)+" \u00D7 10"+sfSup(exp);}return r.toFixed(dec);}
function F3(x){return sfF(x,3);}
function iF(x){return sfF(x,4);}
function gF(x){for(var sf=3;sf<=5;sf++){if(Math.abs(sfR(x,sf)-x)<=Math.abs(x)*1e-9+1e-12)return sfF(x,sf);}return fmt(x);}

E("u1-51-name-to-formula",1,["5.1"],1,"gen",function(){
  function sb(n){var s=String(n),o="",i;for(i=0;i<s.length;i++){o+=String.fromCharCode(0x2080+parseInt(s.charAt(i),10));}return o;}
  function gcd(a,b){while(b){var t=a%b;a=b;b=t;}return a;}
  var mol=pick([{n:"carbon dioxide",f:"CO\u2082",w:["CO","C\u2082O","CO\u2083"]},{n:"carbon monoxide",f:"CO",w:["CO\u2082","C\u2082O\u2082","Co"]},{n:"sulfur dioxide",f:"SO\u2082",w:["SO","SO\u2083","S\u2082O"]},{n:"sulfur trioxide",f:"SO\u2083",w:["SO\u2082","S\u2083O","SO\u2084"]},{n:"dinitrogen tetroxide",f:"N\u2082O\u2084",w:["NO\u2082","N\u2084O\u2082","N\u2082O"]},{n:"phosphorus trichloride",f:"PCl\u2083",w:["PCl","P\u2083Cl","PCl\u2085"]},{n:"phosphorus pentachloride",f:"PCl\u2085",w:["PCl\u2083","P\u2085Cl","Cl\u2085P"]},{n:"carbon tetrachloride",f:"CCl\u2084",w:["CCl","C\u2084Cl","CCl\u2083"]},{n:"nitrogen dioxide",f:"NO\u2082",w:["NO","N\u2082O\u2084","NO\u2083"]},{n:"dinitrogen monoxide",f:"N\u2082O",w:["NO","N\u2082O\u2082","NO\u2082"]},{n:"boron trifluoride",f:"BF\u2083",w:["BF","B\u2083F","BF\u2082"]},{n:"silicon dioxide",f:"SiO\u2082",w:["SiO","Si\u2082O","SiO\u2083"]}]);
  if(pick(["ionic","ionic","ionic","molecular"])==="molecular"){
    return mcq("What is the chemical formula of "+mol.n+"?",mol.f,mol.w,"The name gives the number of each atom directly. Prefixes in the name of a molecular compound become the subscripts in the formula, and a subscript of 1 is not written. The formula is <b>"+mol.f+"</b>.",{name:mol.n});
  }
  var cats=[{n:"sodium",fd:"Na",q:1,p:0},{n:"potassium",fd:"K",q:1,p:0},{n:"lithium",fd:"Li",q:1,p:0},{n:"silver",fd:"Ag",q:1,p:0},{n:"ammonium",fd:"NH\u2084",q:1,p:1},{n:"magnesium",fd:"Mg",q:2,p:0},{n:"calcium",fd:"Ca",q:2,p:0},{n:"barium",fd:"Ba",q:2,p:0},{n:"strontium",fd:"Sr",q:2,p:0},{n:"zinc",fd:"Zn",q:2,p:0},{n:"copper(II)",fd:"Cu",q:2,p:0},{n:"iron(II)",fd:"Fe",q:2,p:0},{n:"aluminum",fd:"Al",q:3,p:0},{n:"iron(III)",fd:"Fe",q:3,p:0}];
  var ans=[{n:"chloride",fd:"Cl",q:1,p:0},{n:"bromide",fd:"Br",q:1,p:0},{n:"iodide",fd:"I",q:1,p:0},{n:"fluoride",fd:"F",q:1,p:0},{n:"nitrate",fd:"NO\u2083",q:1,p:1},{n:"hydroxide",fd:"OH",q:1,p:1},{n:"oxide",fd:"O",q:2,p:0},{n:"sulfide",fd:"S",q:2,p:0},{n:"sulfate",fd:"SO\u2084",q:2,p:1},{n:"carbonate",fd:"CO\u2083",q:2,p:1},{n:"nitride",fd:"N",q:3,p:0},{n:"phosphate",fd:"PO\u2084",q:3,p:1}];
  var cat=pick(cats),an=pick(ans);
  function mk(cs,as){
    var left=cat.p?(cs>1?"("+cat.fd+")"+sb(cs):cat.fd):cat.fd+(cs>1?sb(cs):"");
    var right=an.p?(as>1?"("+an.fd+")"+sb(as):an.fd):an.fd+(as>1?sb(as):"");
    return left+right;
  }
  var g=gcd(cat.q,an.q),cs=an.q/g,as=cat.q/g,correct=mk(cs,as),name=cat.n+" "+an.n;
  var pairs=[[1,1],[2,1],[1,2],[cs+1,as],[cs,as+1],[as,cs],[2,2],[3,2],[cs+2,as],[1,3]],seen={},ds=[];
  var cand=shuffle(pairs.slice());
  for(var i=0;i<cand.length&&ds.length<3;i++){var f=mk(cand[i][0],cand[i][1]);if(f!==correct&&!seen[f]){seen[f]=1;ds.push(f);}}
  return mcq("What is the chemical formula of "+name+"?",correct,ds,"The "+cat.n+" ion has charge "+cat.q+"+ and the "+an.n+" ion has charge "+an.q+"-. The subscripts are chosen so the total positive charge equals the total negative charge, using "+cs+" cation(s) for every "+as+" anion(s). A polyatomic ion is placed in parentheses when more than one is needed. The formula is <b>"+correct+"</b>.",{name:name});
});

E("u1-51-formula-to-name",1,["5.1"],1,"gen",function(){
  function sb(n){var s=String(n),o="",i;for(i=0;i<s.length;i++){o+=String.fromCharCode(0x2080+parseInt(s.charAt(i),10));}return o;}
  function gcd(a,b){while(b){var t=a%b;a=b;b=t;}return a;}
  var mol=pick([{f:"CO\u2082",n:"carbon dioxide",w:["carbon monoxide","carbon oxide","dicarbon dioxide"]},{f:"SO\u2083",n:"sulfur trioxide",w:["sulfur dioxide","sulfur oxide","trisulfur oxide"]},{f:"N\u2082O\u2084",n:"dinitrogen tetroxide",w:["nitrogen dioxide","dinitrogen dioxide","nitrogen tetroxide"]},{f:"PCl\u2085",n:"phosphorus pentachloride",w:["phosphorus trichloride","pentaphosphorus chloride","phosphorus chloride"]},{f:"SF\u2086",n:"sulfur hexafluoride",w:["sulfur fluoride","sulfur pentafluoride","hexasulfur fluoride"]},{f:"Cl\u2082O",n:"dichlorine monoxide",w:["chlorine monoxide","dichlorine oxide","chlorine dioxide"]},{f:"NO",n:"nitrogen monoxide",w:["nitrogen dioxide","nitrogen oxide","mononitrogen monoxide"]},{f:"CCl\u2084",n:"carbon tetrachloride",w:["carbon chloride","carbon trichloride","tetracarbon chloride"]}]);
  if(pick(["ionic","ionic","ionic","molecular"])==="molecular"){
    return mcq("What is the name of "+mol.f+"?",mol.n,mol.w,"Molecular compounds are named with prefixes that state the number of each kind of atom shown by the subscripts. Reading the subscripts in "+mol.f+" gives <b>"+mol.n+"</b>.",{formula:mol.f});
  }
  var cats=[{n:"sodium",fd:"Na",q:1,p:0},{n:"potassium",fd:"K",q:1,p:0},{n:"lithium",fd:"Li",q:1,p:0},{n:"silver",fd:"Ag",q:1,p:0},{n:"ammonium",fd:"NH\u2084",q:1,p:1},{n:"magnesium",fd:"Mg",q:2,p:0},{n:"calcium",fd:"Ca",q:2,p:0},{n:"barium",fd:"Ba",q:2,p:0},{n:"zinc",fd:"Zn",q:2,p:0},{n:"copper(II)",fd:"Cu",q:2,p:0},{n:"iron(II)",fd:"Fe",q:2,p:0},{n:"copper(I)",fd:"Cu",q:1,p:0},{n:"aluminum",fd:"Al",q:3,p:0},{n:"iron(III)",fd:"Fe",q:3,p:0}];
  var ans=[{n:"chloride",fd:"Cl",q:1,p:0},{n:"bromide",fd:"Br",q:1,p:0},{n:"iodide",fd:"I",q:1,p:0},{n:"fluoride",fd:"F",q:1,p:0},{n:"nitrate",fd:"NO\u2083",q:1,p:1},{n:"hydroxide",fd:"OH",q:1,p:1},{n:"oxide",fd:"O",q:2,p:0},{n:"sulfide",fd:"S",q:2,p:0},{n:"sulfate",fd:"SO\u2084",q:2,p:1},{n:"carbonate",fd:"CO\u2083",q:2,p:1},{n:"nitride",fd:"N",q:3,p:0},{n:"phosphate",fd:"PO\u2084",q:3,p:1}];
  var cat=pick(cats),an=pick(ans);
  function mk(cs,as){
    var left=cat.p?(cs>1?"("+cat.fd+")"+sb(cs):cat.fd):cat.fd+(cs>1?sb(cs):"");
    var right=an.p?(as>1?"("+an.fd+")"+sb(as):an.fd):an.fd+(as>1?sb(as):"");
    return left+right;
  }
  var g=gcd(cat.q,an.q),cs=an.q/g,as=cat.q/g,formula=mk(cs,as),correct=cat.n+" "+an.n;
  var oc=pick(cats),oa=pick(ans),seen={},ds=[];
  var pool=[oc.n+" "+an.n,cat.n+" "+oa.n,oc.n+" "+oa.n];
  var cand=shuffle(pool.slice());
  for(var i=0;i<cand.length;i++){if(cand[i]!==correct&&!seen[cand[i]]){seen[cand[i]]=1;ds.push(cand[i]);}}
  var extra=["sodium "+an.n,"calcium "+an.n,cat.n+" chloride",cat.n+" sulfate",cat.n+" oxide"];
  var ex=shuffle(extra.slice());
  for(var j=0;j<ex.length&&ds.length<3;j++){if(ex[j]!==correct&&!seen[ex[j]]){seen[ex[j]]=1;ds.push(ex[j]);}}
  ds=ds.slice(0,3);
  return mcq("What is the name of "+formula+"?",correct,ds,"The formula contains the "+cat.n+" cation and the "+an.n+" anion, combined so the charges balance. The cation is named first and the anion second, which gives <b>"+correct+"</b>.",{formula:formula});
});

E("u1-51-write-formula",1,["5.1"],2,"gen",function(){
  function sb(n,plain){var s=String(n),o="",i;for(i=0;i<s.length;i++){o+=plain?s.charAt(i):String.fromCharCode(0x2080+parseInt(s.charAt(i),10));}return o;}
  function gcd(a,b){while(b){var t=a%b;a=b;b=t;}return a;}
  var cats=[{n:"sodium",fd:"Na",fp:"Na",q:1,p:0},{n:"potassium",fd:"K",fp:"K",q:1,p:0},{n:"ammonium",fd:"NH\u2084",fp:"NH4",q:1,p:1},{n:"magnesium",fd:"Mg",fp:"Mg",q:2,p:0},{n:"calcium",fd:"Ca",fp:"Ca",q:2,p:0},{n:"barium",fd:"Ba",fp:"Ba",q:2,p:0},{n:"zinc",fd:"Zn",fp:"Zn",q:2,p:0},{n:"copper(II)",fd:"Cu",fp:"Cu",q:2,p:0},{n:"iron(II)",fd:"Fe",fp:"Fe",q:2,p:0},{n:"lead(II)",fd:"Pb",fp:"Pb",q:2,p:0},{n:"aluminum",fd:"Al",fp:"Al",q:3,p:0},{n:"iron(III)",fd:"Fe",fp:"Fe",q:3,p:0}];
  var ans=[{n:"chloride",fd:"Cl",fp:"Cl",q:1,p:0},{n:"bromide",fd:"Br",fp:"Br",q:1,p:0},{n:"nitrate",fd:"NO\u2083",fp:"NO3",q:1,p:1},{n:"hydroxide",fd:"OH",fp:"OH",q:1,p:1},{n:"acetate",fd:"CH\u2083COO",fp:"CH3COO",q:1,p:1},{n:"oxide",fd:"O",fp:"O",q:2,p:0},{n:"sulfide",fd:"S",fp:"S",q:2,p:0},{n:"sulfate",fd:"SO\u2084",fp:"SO4",q:2,p:1},{n:"carbonate",fd:"CO\u2083",fp:"CO3",q:2,p:1},{n:"phosphate",fd:"PO\u2084",fp:"PO4",q:3,p:1}];
  var cat=pick(cats),an=pick(ans);
  function mk(cs,as,plain){
    var cf=plain?cat.fp:cat.fd,af=plain?an.fp:an.fd;
    var left=cat.p?(cs>1?"("+cf+")"+sb(cs,plain):cf):cf+(cs>1?sb(cs,plain):"");
    var right=an.p?(as>1?"("+af+")"+sb(as,plain):af):af+(as>1?sb(as,plain):"");
    return left+right;
  }
  var g=gcd(cat.q,an.q),cs=an.q/g,as=cat.q/g,disp=mk(cs,as,false),plain=mk(cs,as,true),name=cat.n+" "+an.n;
  var acc=disp===plain?[disp]:[disp,plain];
  return textq("Write the chemical formula for "+name+".",acc,"Write the cation first and the anion second. The "+cat.n+" ion has charge "+cat.q+"+ and the "+an.n+" ion has charge "+an.q+"-, so "+cs+" cation(s) and "+as+" anion(s) are needed for the total charge to be zero. A polyatomic ion used more than once goes in parentheses. The formula is <b>"+disp+"</b>.",{name:name});
});

E("u1-51-write-name",1,["5.1"],2,"gen",function(){
  function sb(n){var s=String(n),o="",i;for(i=0;i<s.length;i++){o+=String.fromCharCode(0x2080+parseInt(s.charAt(i),10));}return o;}
  function gcd(a,b){while(b){var t=a%b;a=b;b=t;}return a;}
  var cats=[{n:"sodium",fd:"Na",q:1,p:0},{n:"potassium",fd:"K",q:1,p:0},{n:"ammonium",fd:"NH\u2084",q:1,p:1},{n:"magnesium",fd:"Mg",q:2,p:0},{n:"calcium",fd:"Ca",q:2,p:0},{n:"barium",fd:"Ba",q:2,p:0},{n:"zinc",fd:"Zn",q:2,p:0},{n:"copper(II)",fd:"Cu",q:2,p:0},{n:"iron(II)",fd:"Fe",q:2,p:0},{n:"lead(II)",fd:"Pb",q:2,p:0},{n:"aluminum",fd:"Al",q:3,p:0},{n:"iron(III)",fd:"Fe",q:3,p:0}];
  var ans=[{n:"chloride",fd:"Cl",q:1,p:0},{n:"bromide",fd:"Br",q:1,p:0},{n:"nitrate",fd:"NO\u2083",q:1,p:1},{n:"hydroxide",fd:"OH",q:1,p:1},{n:"oxide",fd:"O",q:2,p:0},{n:"sulfide",fd:"S",q:2,p:0},{n:"sulfate",fd:"SO\u2084",q:2,p:1},{n:"carbonate",fd:"CO\u2083",q:2,p:1},{n:"phosphate",fd:"PO\u2084",q:3,p:1}];
  var cat=pick(cats),an=pick(ans);
  function mk(cs,as){
    var left=cat.p?(cs>1?"("+cat.fd+")"+sb(cs):cat.fd):cat.fd+(cs>1?sb(cs):"");
    var right=an.p?(as>1?"("+an.fd+")"+sb(as):an.fd):an.fd+(as>1?sb(as):"");
    return left+right;
  }
  var g=gcd(cat.q,an.q),formula=mk(an.q/g,cat.q/g),name=cat.n+" "+an.n;
  var acc=[name];
  if(name.indexOf("(II)")>=0){acc.push(name.replace("(II)"," (II)"));}
  if(name.indexOf("(III)")>=0){acc.push(name.replace("(III)"," (III)"));}
  if(name.indexOf("aluminum")>=0){acc.push(name.replace("aluminum","aluminium"));}
  return textq("Write the name of the compound "+formula+".",acc,"Identify the ions in the formula. The cation is "+cat.n+" and the anion is "+an.n+", and their charges balance in the proportions shown. The cation is named first, giving <b>"+name+"</b>.",{formula:formula});
});

E("u1-51-acids-hydrates",1,["5.1"],2,"gen",function(){
  function sb(n){var s=String(n),o="",i;for(i=0;i<s.length;i++){o+=String.fromCharCode(0x2080+parseInt(s.charAt(i),10));}return o;}
  var branch=pick(["acid","acid","hydrate","hydrate","molecular"]);
  if(branch==="acid"){
    var a=pick([{f:"HCl(aq)",n:"hydrochloric acid",w:["chloric acid","chlorous acid","hydrogen chloride acid"]},{f:"HBr(aq)",n:"hydrobromic acid",w:["bromic acid","bromous acid","hydrogen bromide acid"]},{f:"HF(aq)",n:"hydrofluoric acid",w:["fluoric acid","fluorous acid","hydrogen fluoride acid"]},{f:"HNO\u2083(aq)",n:"nitric acid",w:["nitrous acid","hydronitric acid","nitrogen acid"]},{f:"H\u2082SO\u2084(aq)",n:"sulfuric acid",w:["sulfurous acid","hydrosulfuric acid","sulfur acid"]},{f:"H\u2082SO\u2083(aq)",n:"sulfurous acid",w:["sulfuric acid","hydrosulfurous acid","sulfur acid"]},{f:"H\u2083PO\u2084(aq)",n:"phosphoric acid",w:["phosphorous acid","hydrophosphoric acid","phosphorus acid"]},{f:"CH\u2083COOH(aq)",n:"acetic acid",w:["carbonic acid","formic acid","hydroacetic acid"]},{f:"H\u2082CO\u2083(aq)",n:"carbonic acid",w:["carbonous acid","hydrocarbonic acid","acetic acid"]}]);
    return mcq("What is the name of the acid "+a.f+"?",a.n,a.w,"Acids in aqueous solution are named from the anion they contain. An anion ending in ide gives a hydro prefix and an ic ending, an anion ending in ate gives an ic ending, and an anion ending in ite gives an ous ending. Applying the matching pattern gives <b>"+a.n+"</b>.",{formula:a.f});
  }
  if(branch==="hydrate"){
    var salts=[{bf:"CuSO\u2084",bn:"copper(II) sulfate"},{bf:"CaCl\u2082",bn:"calcium chloride"},{bf:"MgSO\u2084",bn:"magnesium sulfate"},{bf:"Na\u2082CO\u2083",bn:"sodium carbonate"},{bf:"BaCl\u2082",bn:"barium chloride"},{bf:"CoCl\u2082",bn:"cobalt(II) chloride"},{bf:"FeSO\u2084",bn:"iron(II) sulfate"},{bf:"ZnSO\u2084",bn:"zinc sulfate"}];
    var pref=["","mono","di","tri","tetra","penta","hexa","hepta","octa","nona","deca","hendeca","dodeca"];
    var s=pick(salts),w=ri(2,10),formula=s.bf+"\u00B7"+w+"H\u2082O",correct=s.bn+" "+pref[w]+"hydrate";
    var ds=[s.bn+" "+pref[w-1]+"hydrate",s.bn+" "+pref[w+1]+"hydrate",s.bn+" "+pref[w+2]+"hydrate"];
    return mcq("What is the name of the hydrate "+formula+"?",correct,ds,"In a hydrate name, the anhydrous compound is named first. The number of water molecules per formula unit is then stated with a prefix, here "+w+" water molecules, giving the prefix "+pref[w]+". The name is <b>"+correct+"</b>.",{formula:formula,w:w});
  }
  var m=pick([{f:"N\u2082O\u2084",n:"dinitrogen tetroxide",w:["nitrogen dioxide","dinitrogen dioxide","nitrogen tetroxide"]},{f:"PCl\u2083",n:"phosphorus trichloride",w:["phosphorus chloride","triphosphorus chloride","phosphorus pentachloride"]},{f:"SF\u2086",n:"sulfur hexafluoride",w:["sulfur fluoride","hexasulfur fluoride","sulfur tetrafluoride"]},{f:"CO",n:"carbon monoxide",w:["carbon oxide","carbon dioxide","monocarbon oxide"]},{f:"SO\u2082",n:"sulfur dioxide",w:["sulfur oxide","sulfur monoxide","disulfur oxide"]}]);
  return mcq("What is the name of the molecular compound "+m.f+"?",m.n,m.w,"The subscripts are read as prefixes in the name, with mono used for a single atom of the second element but omitted for a single atom of the first element. Reading "+m.f+" this way gives <b>"+m.n+"</b>.",{formula:m.f});
});

E("u1-52-molar-mass",1,["5.2"],1,"gen",function(){
  var water=2*CHEM_AM.H+CHEM_AM.O;
  var bases=[{f:"NaCl",m:CHEM_AM.Na+CHEM_AM.Cl,b:"22.99 + 35.45"},{f:"CaCl\u2082",m:CHEM_AM.Ca+2*CHEM_AM.Cl,b:"40.08 + 2(35.45)"},{f:"MgSO\u2084",m:CHEM_AM.Mg+CHEM_AM.S+4*CHEM_AM.O,b:"24.31 + 32.07 + 4(16.00)"},{f:"CuSO\u2084",m:CHEM_AM.Cu+CHEM_AM.S+4*CHEM_AM.O,b:"63.55 + 32.07 + 4(16.00)"},{f:"KNO\u2083",m:CHEM_AM.K+CHEM_AM.N+3*CHEM_AM.O,b:"39.10 + 14.01 + 3(16.00)"},{f:"Na\u2082CO\u2083",m:CHEM_AM.Na*2+CHEM_AM.C+3*CHEM_AM.O,b:"2(22.99) + 12.01 + 3(16.00)"},{f:"BaCl\u2082",m:CHEM_AM.Ba+2*CHEM_AM.Cl,b:"137.33 + 2(35.45)"},{f:"NH\u2084NO\u2083",m:2*CHEM_AM.N+4*CHEM_AM.H+3*CHEM_AM.O,b:"2(14.01) + 4(1.01) + 3(16.00)"},{f:"Ca(OH)\u2082",m:CHEM_AM.Ca+2*(CHEM_AM.O+CHEM_AM.H),b:"40.08 + 2(16.00 + 1.01)"},{f:"Al\u2082(SO\u2084)\u2083",m:2*CHEM_AM.Al+3*(CHEM_AM.S+4*CHEM_AM.O),b:"2(26.98) + 3(32.07 + 4(16.00))"},{f:"C\u2086H\u2081\u2082O\u2086",m:6*CHEM_AM.C+12*CHEM_AM.H+6*CHEM_AM.O,b:"6(12.01) + 12(1.01) + 6(16.00)"},{f:"Fe\u2082O\u2083",m:2*CHEM_AM.Fe+3*CHEM_AM.O,b:"2(55.85) + 3(16.00)"}];
  var b=pick(bases),w=pick([0,0,0,0,1,2,3,5,6,7,10]);
  var m=b.m+w*water,f=b.f;
  if(w>0){f=b.f+"\u00B7"+w+"H\u2082O";}
  var sol="Molar mass is the mass of one mole of formula units. Add the atomic masses of all the atoms in the formula: "+b.b+" = "+fmtF(b.m,2)+" g/mol for the anhydrous compound.";
  if(w>0){sol+=" The hydrate also contains "+w+" water molecules per formula unit, adding "+w+"(18.02) = "+fmtF(w*water,2)+" g/mol. The total molar mass is <b>"+fmtF(m,2)+" g/mol</b>.";}
  else{sol+=" The molar mass is <b>"+fmtF(m,2)+" g/mol</b>.";}
  return numq("Calculate the molar mass of "+f+". Give your answer in g/mol.",m,Math.max(0.05,m*0.01),sol,{cp:b.f,w:w});
});

E("u1-52-mass-to-moles",1,["5.2"],2,"gen",function(){
  var cps=[{f:"CO\u2082",m:CHEM_AM.C+2*CHEM_AM.O},{f:"H\u2082O",m:2*CHEM_AM.H+CHEM_AM.O},{f:"NH\u2083",m:CHEM_AM.N+3*CHEM_AM.H},{f:"NaCl",m:CHEM_AM.Na+CHEM_AM.Cl},{f:"O\u2082",m:2*CHEM_AM.O},{f:"CH\u2084",m:CHEM_AM.C+4*CHEM_AM.H},{f:"C\u2086H\u2081\u2082O\u2086",m:6*CHEM_AM.C+12*CHEM_AM.H+6*CHEM_AM.O},{f:"CaCO\u2083",m:CHEM_AM.Ca+CHEM_AM.C+3*CHEM_AM.O},{f:"MgO",m:CHEM_AM.Mg+CHEM_AM.O},{f:"H\u2082SO\u2084",m:2*CHEM_AM.H+CHEM_AM.S+4*CHEM_AM.O},{f:"KOH",m:CHEM_AM.K+CHEM_AM.O+CHEM_AM.H},{f:"Fe",m:CHEM_AM.Fe},{f:"Cu",m:CHEM_AM.Cu},{f:"N\u2082",m:2*CHEM_AM.N}];
  var cp=pick(cps),n=ri(15,950)/100,mass=Math.round(n*cp.m*100)/100;
  return numq("How many moles are in "+gF(mass)+" g of "+cp.f+"? Give your answer in mol (the molar mass of "+cp.f+" is "+fmtF(cp.m,2)+" g/mol).",sfR(n,3),Math.max(0.01,n*0.02),"Amount in moles = mass / molar mass = "+gF(mass)+" g / "+fmtF(cp.m,2)+" g/mol = <b>"+F3(n)+" mol</b>.",{cp:cp.f,n:n});
});

E("u1-52-moles-to-mass",1,["5.2"],2,"gen",function(){
  var cps=[{f:"CO\u2082",m:CHEM_AM.C+2*CHEM_AM.O},{f:"H\u2082O",m:2*CHEM_AM.H+CHEM_AM.O},{f:"NH\u2083",m:CHEM_AM.N+3*CHEM_AM.H},{f:"NaCl",m:CHEM_AM.Na+CHEM_AM.Cl},{f:"O\u2082",m:2*CHEM_AM.O},{f:"CH\u2084",m:CHEM_AM.C+4*CHEM_AM.H},{f:"C\u2086H\u2081\u2082O\u2086",m:6*CHEM_AM.C+12*CHEM_AM.H+6*CHEM_AM.O},{f:"CaCO\u2083",m:CHEM_AM.Ca+CHEM_AM.C+3*CHEM_AM.O},{f:"MgO",m:CHEM_AM.Mg+CHEM_AM.O},{f:"H\u2082SO\u2084",m:2*CHEM_AM.H+CHEM_AM.S+4*CHEM_AM.O},{f:"KOH",m:CHEM_AM.K+CHEM_AM.O+CHEM_AM.H},{f:"Zn",m:CHEM_AM.Zn},{f:"Ag",m:CHEM_AM.Ag},{f:"SO\u2082",m:CHEM_AM.S+2*CHEM_AM.O}];
  var cp=pick(cps),n=ri(5,800)/100,ans=sfR(n*cp.m,3);
  return numq("What mass, in grams, is "+gF(n)+" mol of "+cp.f+"? Give your answer in g (the molar mass of "+cp.f+" is "+fmtF(cp.m,2)+" g/mol).",ans,Math.max(0.05,ans*0.02),"Mass = amount in moles \u00D7 molar mass = "+gF(n)+" mol \u00D7 "+fmtF(cp.m,2)+" g/mol = <b>"+F3(ans)+" g</b>.",{cp:cp.f,n:n});
});

E("u1-52-particles-to-moles",1,["5.2"],2,"gen",function(){
  var cps=[{f:"H\u2082O",p:"molecules"},{f:"CO\u2082",p:"molecules"},{f:"NH\u2083",p:"molecules"},{f:"CH\u2084",p:"molecules"},{f:"O\u2082",p:"molecules"},{f:"NaCl",p:"formula units"},{f:"CaCO\u2083",p:"formula units"},{f:"MgO",p:"formula units"},{f:"Fe",p:"atoms"},{f:"Cu",p:"atoms"},{f:"Zn",p:"atoms"},{f:"He",p:"atoms"}];
  var cp=pick(cps),e=pick([23,23,24]),k=ri(120,950)/100;
  var moles=k*Math.pow(10,e-23)/6.022,ans=sfR(moles,3);
  return numq("A sample contains \\("+fmtF(k,2)+" \\times 10^{"+e+"}\\) "+cp.p+" of "+cp.f+". How many moles is this? Give your answer in mol.",ans,Math.max(0.01,ans*0.02),"One mole contains \\(6.022 \\times 10^{23}\\) particles. Amount in moles = number of particles / \\(6.022 \\times 10^{23}\\) = \\("+fmtF(k,2)+" \\times 10^{"+e+"}\\) / \\(6.022 \\times 10^{23}\\) = <b>"+F3(ans)+" mol</b>.",{cp:cp.f,k:k,e:e});
});

E("u1-52-mass-to-particles",1,["5.2"],3,"gen",function(){
  var cps=[{f:"H\u2082O",m:2*CHEM_AM.H+CHEM_AM.O,p:"molecules"},{f:"CO\u2082",m:CHEM_AM.C+2*CHEM_AM.O,p:"molecules"},{f:"NH\u2083",m:CHEM_AM.N+3*CHEM_AM.H,p:"molecules"},{f:"CH\u2084",m:CHEM_AM.C+4*CHEM_AM.H,p:"molecules"},{f:"NaCl",m:CHEM_AM.Na+CHEM_AM.Cl,p:"formula units"},{f:"CaCO\u2083",m:CHEM_AM.Ca+CHEM_AM.C+3*CHEM_AM.O,p:"formula units"},{f:"Fe",m:CHEM_AM.Fe,p:"atoms"},{f:"Cu",m:CHEM_AM.Cu,p:"atoms"}];
  var cp=pick(cps),nDrawn=ri(20,600)/100,mass=Math.round(nDrawn*cp.m*100)/100,n=mass/cp.m,ans=sfR(sfR(n,4)*CHEM_AV,3);
  return numq("How many "+cp.p+" are in "+gF(mass)+" g of "+cp.f+"? Give your answer as a number in scientific notation, for example 1.20e24 (the molar mass of "+cp.f+" is "+fmtF(cp.m,2)+" g/mol).",ans,ans*0.02,"First change mass to moles: "+gF(mass)+" g / "+fmtF(cp.m,2)+" g/mol = "+iF(n)+" mol. Then multiply by the Avogadro constant: "+iF(n)+" \u00D7 \\(6.022 \\times 10^{23}\\) = <b>"+ans.toExponential(2)+" "+cp.p+"</b>.",{cp:cp.f,n:nDrawn});
});

E("u1-52-mass-to-volume-stp",1,["5.2"],2,"gen",function(){
  var gases=[{f:"O\u2082",m:2*CHEM_AM.O},{f:"N\u2082",m:2*CHEM_AM.N},{f:"CO\u2082",m:CHEM_AM.C+2*CHEM_AM.O},{f:"H\u2082",m:2*CHEM_AM.H},{f:"NH\u2083",m:CHEM_AM.N+3*CHEM_AM.H},{f:"CH\u2084",m:CHEM_AM.C+4*CHEM_AM.H},{f:"SO\u2082",m:CHEM_AM.S+2*CHEM_AM.O},{f:"CO",m:CHEM_AM.C+CHEM_AM.O}];
  var g=pick(gases),nDrawn=ri(10,500)/100,mass=sfR(nDrawn*g.m,4),n=mass/g.m,vol=sfR(sfR(n,4)*22.4,3);
  return numq("What volume does "+gF(mass)+" g of "+g.f+" gas occupy at STP? Give your answer in L (the molar mass of "+g.f+" is "+fmtF(g.m,2)+" g/mol, and the molar volume at STP is 22.4 L/mol).",vol,Math.max(0.05,vol*0.02),"First change mass to moles: "+gF(mass)+" g / "+fmtF(g.m,2)+" g/mol = "+iF(n)+" mol. Then multiply by the molar volume at STP: "+iF(n)+" \u00D7 22.4 L/mol = <b>"+F3(vol)+" L</b>.",{cp:g.f,n:nDrawn});
});

E("u1-53-dynamic-equilibrium",1,["5.3"],1,"gen",function(){
  var s=pick(["sodium chloride","sucrose","potassium nitrate","copper(II) sulfate","sodium carbonate","ammonium chloride"]);
  var t=ri(15,35);
  return mcq("A saturated solution of "+s+" in water at "+t+" \u00B0C sits in a closed container with some undissolved solid present. Which statement best describes the solution at equilibrium?","Dissolving and crystallizing continue at equal rates",["Dissolving has stopped completely","Crystallizing has stopped completely","Particles no longer move between the solid and the solution"],"At saturation the solution holds the maximum amount of dissolved solute it can hold at that temperature. Particles still leave the solid and still return to it, but the two processes happen at equal rates, so the amount dissolved stays constant. Dissolving and crystallizing continue at equal rates.",{solute:s,t:t});
});

E("u1-53-observations",1,["5.3"],2,"var",varset([
  function(){
    var s=pick(["sodium chloride","copper(II) sulfate","potassium nitrate","sucrose"]),t=ri(18,30);
    return mcq("A single large crystal is placed in a saturated solution of "+s+" at "+t+" \u00B0C and observed over several days in a closed container. What is observed?","The total mass of the crystal stays the same, though its shape may change slightly",["The crystal slowly dissolves completely","The crystal grows steadily larger without limit","The crystal dissolves and then reappears each day"],"The solution is already saturated, so there is no net dissolving. Particles crystallize onto the crystal at the same rate as particles dissolve from it, so its mass stays constant even though surface particles keep exchanging. The total mass of the crystal stays the same.",{solute:s,t:t});
  },
  function(){
    var s=pick(["copper(II) sulfate","potassium dichromate","nickel(II) sulfate","food colouring"]),t=ri(18,30);
    return mcq("A saturated, coloured solution of "+s+" at "+t+" \u00B0C is kept closed and undisturbed at a constant temperature. What happens to the intensity of the colour over time?","It stays the same",["It steadily gets darker","It steadily gets paler","It fades and then returns once a day"],"Colour intensity follows the concentration of dissolved solute. At equilibrium the concentration is constant because dissolving and crystallizing occur at equal rates, so the colour intensity stays the same.",{solute:s,t:t});
  },
  function(){
    var s=pick(["sodium chloride","sucrose","potassium nitrate"]),t=ri(20,32),v=ri(80,200);
    return mcq("A small extra crystal of "+s+" is dropped into "+v+" mL of its saturated solution at "+t+" \u00B0C. There is no temperature change. What happens to the extra crystal?","It remains undissolved, with no net change in its mass",["It dissolves completely within a few minutes","It causes all the dissolved solute to crystallize out","It dissolves and doubles the concentration"],"A saturated solution cannot hold any more dissolved solute at that temperature. The added crystal joins the undissolved solid and there is no net dissolving, so it remains undissolved with no net change in mass.",{solute:s,v:v,t:t});
  },
  function(){
    var s=pick(["potassium nitrate","sodium chloride","ammonium chloride"]),t=ri(15,28);
    return mcq("A saturated solution of "+s+" at "+t+" \u00B0C contains undissolved solid. A student claims the solid proves dissolving has stopped. Which response is correct?","The claim is wrong: solid particles keep dissolving while dissolved particles keep crystallizing, at equal rates",["The claim is right: nothing happens once a solution is saturated","The claim is wrong: the solid is dissolving, but nothing is crystallizing","The claim is right: the solid and the solution no longer interact"],"Saturation is a dynamic equilibrium, not a stopped process. Both dissolving and crystallizing continue, and because their rates are equal there is no net change in the amount of solid or in the concentration.",{solute:s,t:t});
  },
  function(){
    var s=pick(["sucrose","sodium carbonate","calcium chloride"]),t=ri(19,31),m=ri(5,40);
    return mcq("In a closed flask at "+t+" \u00B0C, a saturated solution of "+s+" is in equilibrium with "+m+" g of undissolved solid. If the flask is left for a week at the same temperature, the mass of undissolved solid will be","Still "+m+" g, because the rates of dissolving and crystallizing are equal",["Less than "+m+" g, because dissolving never stops","More than "+m+" g, because crystallizing never stops","Zero, because all solid eventually dissolves at equilibrium"],"At equilibrium the two opposing processes balance. As much solid dissolves each minute as crystallizes each minute, so the undissolved mass stays at "+m+" g as long as the temperature is unchanged.",{solute:s,t:t,m:m});
  }
]));

E("u1-53-identify-type",1,["5.3"],2,"gen",function(){
  var solutes=[{n:"sodium chloride",max:36},{n:"potassium chloride",max:34},{n:"ammonium chloride",max:37},{n:"sodium nitrate",max:88},{n:"potassium bromide",max:65},{n:"sucrose",max:200}];
  var s=pick(solutes),branch=pick(["unsat","sat","super"]);
  var opts=["Unsaturated solution","Saturated solution","Supersaturated solution","A suspension"];
  if(branch==="unsat"){
    var amt=s.max-ri(3,20);
    return mcq("At 25 \u00B0C, at most "+s.max+" g of "+s.n+" can dissolve in 100 mL of water. A student dissolves "+amt+" g of "+s.n+" in 100 mL of water at 25 \u00B0C and no solid remains. How is the solution best classified?","Unsaturated solution",["Saturated solution","Supersaturated solution","A suspension"] ,amt+" g is less than the maximum of "+s.max+" g that can dissolve, and no solid is present. The solution could still dissolve more solute, so it is an unsaturated solution.",{solute:s.n,amt:amt});
  }
  if(branch==="sat"){
    var extra=ri(2,15);
    return mcq("At 25 \u00B0C, at most "+s.max+" g of "+s.n+" can dissolve in 100 mL of water. A student adds "+(s.max+extra)+" g of "+s.n+" to 100 mL of water at 25 \u00B0C, stirs thoroughly, and some solid remains at the bottom. How is the solution best classified?","Saturated solution",["Unsaturated solution","Supersaturated solution","A suspension"],"The solution holds the maximum amount it can dissolve, "+s.max+" g, and the extra "+extra+" g stays undissolved. A solution holding its maximum dissolved amount in contact with undissolved solid is a saturated solution.",{solute:s.n,extra:extra});
  }
  var over=ri(4,25);
  return mcq("At 25 \u00B0C, at most "+s.max+" g of "+s.n+" can dissolve in 100 mL of water. A student dissolves "+(s.max+over)+" g of "+s.n+" in 100 mL of water at 80 \u00B0C, then cools the clear solution very slowly to 25 \u00B0C without disturbing it. No crystals form. How is the solution best classified?","Supersaturated solution",["Unsaturated solution","Saturated solution","A suspension"],"The cooled solution holds "+(s.max+over)+" g dissolved, which is more than the "+s.max+" g maximum at 25 \u00B0C. A solution holding more dissolved solute than its equilibrium maximum is a supersaturated solution.",{solute:s.n,over:over});
});

E("u1-53-predict-state",1,["5.3"],3,"gen",function(){
  var hi=ri(55,95),lo=hi-ri(15,35),t1=ri(60,85),t2=ri(15,25),branch=pick(["undisturbed","seeded","diluted"]);
  if(branch==="undisturbed"){
    return textq("In an experiment, "+hi+" g of a salt was dissolved in 100 mL of water at "+t1+" \u00B0C to make a saturated solution. The clear solution was then cooled slowly to "+t2+" \u00B0C, where a saturated solution holds only "+lo+" g per 100 mL. The cooled solution was left completely undisturbed and no crystals formed. Give the one word term that describes the cooled solution.",["supersaturated","supersaturated solution"],"The cooled solution still holds "+hi+" g dissolved, more than the "+lo+" g that a saturated solution holds at "+t2+" \u00B0C. Because it holds more than the equilibrium maximum without crystallizing, it is <b>supersaturated</b>.",{branch:branch,hi:hi,lo:lo});
  }
  if(branch==="seeded"){
    return textq("In an experiment, "+hi+" g of a salt was dissolved in 100 mL of water at "+t1+" \u00B0C. The solution was cooled to "+t2+" \u00B0C, where a saturated solution holds "+lo+" g per 100 mL, and a seed crystal was added. Crystals formed until no more change occurred. Give the one word term that describes the solution that remains.",["saturated","saturated solution"],"Adding the seed crystal let the excess solute crystallize out until only "+lo+" g remained dissolved, the maximum at "+t2+" \u00B0C. A solution holding its maximum dissolved amount is <b>saturated</b>.",{branch:branch,hi:hi,lo:lo});
  }
  return textq("A saturated solution of a salt at "+t2+" \u00B0C holds "+lo+" g of the salt per 100 mL of water. A student adds another 100 mL of pure water and stirs until all the solid dissolves. Give the one word term that describes the resulting solution.",["unsaturated","unsaturated solution"],"Adding water increased the amount the solution could hold, and all the solid dissolved with room to spare. A solution that could still dissolve more solute is <b>unsaturated</b>.",{branch:branch,lo:lo});
});

E("u1-54-equilibrium-definition",1,["5.4"],1,"gen",function(){
  var s=pick(["sodium chloride","sucrose","potassium nitrate","copper(II) sulfate","ammonium chloride","sodium carbonate"]);
  var t=ri(16,34),v=ri(100,500);
  var wrong=shuffle(["The concentration of dissolved solute keeps increasing slowly","The rate of dissolving drops to zero once saturation is reached","The mass of undissolved solid increases steadily over time","No solid needs to be present for a solution to be saturated"].slice()).slice(0,3);
  return mcq("Which statement correctly defines equilibrium in a saturated solution of "+s+" (a "+v+" mL sample held at "+t+" \u00B0C with solid present)?","The rate of dissolving equals the rate of crystallizing, so the concentration stays constant",wrong,"Equilibrium in a saturated solution is dynamic. Solute dissolves and crystallizes at equal rates, so the dissolved concentration and the amount of solid stay constant even though both processes continue. The rate of dissolving equals the rate of crystallizing, so the concentration stays constant.",{solute:s,t:t,v:v});
});

E("u1-54-what-stays-constant",1,["5.4"],2,"var",varset([
  function(){
    var s=pick(["sodium chloride","potassium nitrate","sucrose"]),t=ri(18,30);
    return mcq("A saturated solution of "+s+" at "+t+" \u00B0C is at equilibrium with excess solid in a closed container. Which quantity stays constant over time?","The concentration of the dissolved solute",["The number of particles leaving the solid each second is zero","The identity of the particles in the solution stops changing","The mass of each individual crystal keeps growing"],"At equilibrium the rates of dissolving and crystallizing are equal, so the amount dissolved does not change. The concentration of the dissolved solute therefore stays constant, even though particles keep exchanging between the phases.",{solute:s,t:t});
  },
  function(){
    var s=pick(["copper(II) sulfate","ammonium chloride","sodium carbonate"]),t=ri(20,33);
    return mcq("Which description of particle movement is correct for a saturated solution of "+s+" at equilibrium at "+t+" \u00B0C?","Particles keep moving both into and out of the solution at equal rates",["Particles move only out of the solid and into the solution","Particles move only out of the solution and onto the solid","Particles stop moving once equilibrium is reached"],"Equilibrium is dynamic. Dissolving and crystallizing both continue, and equilibrium means the two rates are equal, not that movement has stopped.",{solute:s,t:t});
  },
  function(){
    var s=pick(["sucrose","sodium chloride","potassium chloride"]),m=ri(4,30),t=ri(17,29);
    return mcq("A saturated solution of "+s+" at "+t+" \u00B0C is at equilibrium with "+m+" g of solid. What can be said about that "+m+" g of solid over the next hour at the same temperature?","Its total mass stays "+m+" g, although the particles making it up change",["Its total mass slowly increases as more solute crystallizes than dissolves","Its total mass slowly decreases as more solute dissolves than crystallizes","It all dissolves and an equal mass of new solid appears at once"],"Because dissolving and crystallizing balance, there is no net change in the solid. Individual particles exchange, but the total mass of solid stays "+m+" g.",{solute:s,m:m,t:t});
  },
  function(){
    var s=pick(["potassium nitrate","sodium nitrate","ammonium chloride"]),t=ri(21,35),c=pick(["3.00","4.50","5.20","6.10"]);
    return mcq("At "+t+" \u00B0C a saturated solution of "+s+" has a solute concentration of "+c+" mol/L. The closed system sits at equilibrium for two days at the same temperature. The concentration after two days is","Still "+c+" mol/L, because the two rates are equal",["Higher than "+c+" mol/L, because dissolving continues","Lower than "+c+" mol/L, because crystallizing continues","Zero, because equilibrium means the reaction is finished"],"Both processes continue at equilibrium, but at equal rates, so there is no net change. The concentration remains "+c+" mol/L.",{solute:s,t:t});
  },
  function(){
    var s=pick(["calcium chloride","magnesium sulfate","sodium chloride"]),t=ri(16,27);
    return mcq("A saturated solution of "+s+" at "+t+" \u00B0C is at equilibrium. Which change would disturb the equilibrium?","Heating the solution to a higher temperature",["Watching the solution for a longer time","Moving the closed flask to another bench","Labelling the flask with the date"],"Equilibrium holds only while conditions stay the same. Changing the temperature changes how much solute the solution can hold, so one rate temporarily exceeds the other until a new equilibrium is reached.",{solute:s,t:t});
  }
]));

E("u1-54-add-solvent-or-solute",1,["5.4"],2,"gen",function(){
  var s=pick(["sodium chloride","potassium nitrate","sucrose","copper(II) sulfate"]);
  var t=ri(18,32),branch=pick(["solvent","solute","alldissolves"]);
  if(branch==="solvent"){
    var v=ri(20,80);
    return mcq("A saturated solution of "+s+" at "+t+" \u00B0C sits over excess solid. A student adds "+v+" mL of pure water and stirs, keeping the temperature the same and leaving some solid still present at the end. What happens?","More solid dissolves until the solution is saturated again, at the same concentration",["The solution stays saturated the whole time and no more solid dissolves","The final concentration is higher than the original saturated concentration","All of the solid dissolves and the solution becomes dilute"],"Adding water makes the solution temporarily unsaturated, so dissolving becomes faster than crystallizing. More solid dissolves until saturation is restored, and at the same temperature the saturated concentration is the same as before.",{solute:s,branch:branch,v:v});
  }
  if(branch==="solute"){
    var m=ri(3,20);
    return mcq("A saturated solution of "+s+" at "+t+" \u00B0C already contains undissolved solid. A student stirs in another "+m+" g of solid "+s+" at the same temperature. What happens?","The added solid stays undissolved and the concentration does not change",["The added solid dissolves and the concentration rises","The added solid dissolves and the concentration stays the same because the volume grows","The added solid causes dissolved solute to crystallize until half is solid"],"The solution already holds its maximum dissolved amount at "+t+" \u00B0C. Extra solid cannot dissolve on balance, so it joins the undissolved solid and the concentration does not change.",{solute:s,branch:branch,m:m});
  }
  var m2=ri(1,4),v2=ri(150,400);
  return mcq("A saturated solution of "+s+" at "+t+" \u00B0C contains only "+m2+" g of undissolved solid. A student adds "+v2+" mL of pure water and stirs at the same temperature, and all of the solid dissolves. The final solution is","Unsaturated, with a lower concentration than the saturated solution",["Saturated, with the same concentration as before","Supersaturated, because extra water was added","Saturated, with a higher concentration than before"],"With a large volume of added water, all the solid dissolves and the solution could still hold more solute. It is therefore unsaturated, and spreading the same amount of solute through more solvent lowers the concentration.",{solute:s,branch:branch});
});

E("u1-54-rate-comparison",1,["5.4"],3,"gen",function(){
  var s=pick(["sodium chloride","potassium nitrate","sucrose","ammonium chloride"]);
  var t=ri(18,30),branch=pick(["water","seed","undisturbed"]);
  if(branch==="water"){
    return textq("A saturated solution of "+s+" at "+t+" \u00B0C is in equilibrium with excess solid. Pure water is added and the mixture is stirred. In the first moments after the water is added, which process is temporarily faster: dissolving or crystallizing? Give one word.",["dissolving"],"Adding water makes the solution unsaturated for the moment, so more solute can dissolve than is crystallizing. The temporarily faster process is <b>dissolving</b>, until saturation is restored.",{branch:branch,solute:s});
  }
  if(branch==="seed"){
    var hi=ri(50,90),lo=hi-ri(15,30);
    return textq("A clear solution holds "+hi+" g of "+s+" dissolved in 100 mL of water at "+t+" \u00B0C, although a saturated solution at this temperature holds only "+lo+" g per 100 mL. A seed crystal of "+s+" is dropped in. In the first moments after the seed is added, which process is temporarily faster: dissolving or crystallizing? Give one word.",["crystallizing","crystallisation","crystallizing out"],"The solution is supersaturated, so it holds more solute than it can keep at equilibrium. The seed crystal triggers the excess solute to come out of solution, so the temporarily faster process is <b>crystallizing</b>.",{branch:branch,solute:s});
  }
  return textq("A saturated solution of "+s+" at "+t+" \u00B0C has sat closed and undisturbed at equilibrium for a full day, with solid present. How do the rates of dissolving and crystallizing compare? Give one word.",["equal","same","balanced"],"Nothing has disturbed the system, so it is still at equilibrium. At equilibrium the two opposing rates are <b>equal</b>.",{branch:branch,solute:s});
});

E("u1-55-like-dissolves-like",1,["5.5"],1,"gen",function(){
  var t=ri(20,30);
  var matched=pick(["ethanol in water","cooking oil in grease solvent","wax in hexane","sugar in water","sodium chloride in water","iodine in hexane"]);
  var mismatched=["cooking oil in water","wax in water","sodium chloride in hexane","sugar in hexane","grease in water","potassium nitrate in oil"];
  var ds=shuffle(mismatched.slice()).slice(0,3);
  return mcq("At "+t+" \u00B0C, which pair is most likely to mix well and form a solution?",matched,ds,"Solutes and solvents with similar polarity mix well, summed up as like dissolves like. Polar or ionic substances dissolve in polar solvents such as water, and nonpolar substances dissolve in nonpolar solvents. The matching pair is <b>"+matched+"</b>.",{pair:matched,t:t});
});

E("u1-55-polarity-prediction",1,["5.5"],2,"gen",function(){
  var t=ri(19,29),branch=pick(["water","hexane"]);
  if(branch==="water"){
    var correct=pick(["ethanol","glucose","ammonia","sodium chloride","potassium nitrate","copper(II) sulfate"]);
    var ds=shuffle(["cooking oil","wax","grease","iodine","sulfur"].slice()).slice(0,3);
    return mcq("Water is a polar solvent. At "+t+" \u00B0C, which substance is most likely to dissolve readily in water?",correct,ds,correct+" is polar or ionic, so it is attracted to polar water molecules and dissolves readily. Oil, wax, grease, iodine and sulfur are nonpolar and do not dissolve appreciably in water. Like dissolves like.",{solvent:"water",correct:correct});
  }
  var c2=pick(["cooking oil","wax","grease","iodine","naphthalene"]);
  var d2=shuffle(["sodium chloride","glucose","potassium nitrate","copper(II) sulfate","ammonia"].slice()).slice(0,3);
  return mcq("Hexane is a nonpolar solvent. At "+t+" \u00B0C, which substance is most likely to dissolve readily in hexane?",c2,d2,c2+" is nonpolar, so it mixes with the nonpolar solvent hexane. Ionic and strongly polar substances are not attracted to hexane and stay undissolved. Like dissolves like.",{solvent:"hexane",correct:c2});
});

E("u1-55-temperature-effects",1,["5.5"],2,"gen",function(){
  var t1=ri(10,25),t2=t1+ri(20,40),branch=pick(["solid","gas"]);
  if(branch==="solid"){
    var s=pick(["potassium nitrate","sodium nitrate","ammonium chloride","potassium chloride"]);
    return mcq("A saturated solution of the solid "+s+" in water is heated from "+t1+" \u00B0C to "+t2+" \u00B0C, with undissolved solid present. What usually happens?","More solid dissolves, because the solubility of most solids in water increases as temperature rises",["All the dissolved solute crystallizes out, because heating always lowers solubility","Nothing changes, because temperature never affects the solubility of a solid","The solution boils away and leaves only dry solid behind"],"For most solid solutes, solubility in water increases as temperature increases. Heating the saturated solution lets more of the undissolved "+s+" dissolve.",{solute:s,t1:t1,t2:t2});
  }
  var g=pick(["carbon dioxide","oxygen","nitrogen"]);
  return mcq("Water holding dissolved "+g+" gas is warmed from "+t1+" \u00B0C to "+t2+" \u00B0C in an open container. What happens to the amount of dissolved gas?","It decreases, because the solubility of gases in water decreases as temperature rises",["It increases, because gases dissolve better in warm water","It stays exactly the same, because temperature does not affect gases","It increases until the water is fully saturated with gas at any pressure"],"Gas solubility in water falls as temperature rises, which is why warm soda goes flat and warm lake water holds less oxygen. Warming the water drives some dissolved "+g+" out, so the amount dissolved decreases.",{gas:g,t1:t1,t2:t2});
});

E("u1-55-temperature-prediction",1,["5.5"],3,"gen",function(){
  var branch=pick(["soda","solidheat","lake","solidcool"]);
  if(branch==="soda"){
    var t1=ri(2,8),t2=ri(22,30);
    return textq("A bottle of carbonated drink is moved from a fridge at "+t1+" \u00B0C to a counter at "+t2+" \u00B0C and opened. As the drink warms, the solubility of the dissolved carbon dioxide in the drink increases or decreases? Give one word.",["decreases","decrease"],"Gases become less soluble in water as temperature rises. As the drink warms, carbon dioxide escapes as bubbles, so its solubility <b>decreases</b>.",{branch:branch});
  }
  if(branch==="solidheat"){
    var s=pick(["potassium nitrate","sodium nitrate","ammonium chloride"]),a=ri(20,35),b=a+ri(25,40);
    return textq("A saturated solution of the solid "+s+" in water, with solid present, is heated from "+a+" \u00B0C to "+b+" \u00B0C. In general, the solubility of a solid such as "+s+" in water increases or decreases as temperature rises? Give one word.",["increases","increase"],"Most solid solutes dissolve better in warm water. Heating lets more of the solid dissolve, so the solubility <b>increases</b>.",{branch:branch,solute:s});
  }
  if(branch==="lake"){
    var a2=ri(24,32);
    return textq("On a hot day the surface water of a lake reaches "+a2+" \u00B0C. Compared with cold water, the amount of dissolved oxygen the warm water can hold is higher or lower? Give one word.",["lower","less"],"Oxygen is a gas, and gases are less soluble in warmer water. Warm lake water holds less dissolved oxygen, so the amount is <b>lower</b>.",{branch:branch});
  }
  var s2=pick(["potassium chloride","sodium chloride","sucrose"]),c=ri(35,50),d=c-ri(15,25);
  return textq("A saturated solution of the solid "+s2+" in water, with solid present, is cooled from "+c+" \u00B0C to "+d+" \u00B0C. In general, the solubility of a solid such as "+s2+" in water increases or decreases as temperature falls? Give one word.",["decreases","decrease"],"Most solids are less soluble in colder water. Cooling a saturated solution makes some solute crystallize out, so the solubility <b>decreases</b> as temperature falls.",{branch:branch,solute:s2});
});

E("u1-56-solubility-rule",1,["5.6"],1,"gen",function(){
  var soluble=[{f:"NaCl",r:"Compounds of alkali metals such as sodium are soluble, and chlorides are soluble with only a few exceptions."},{f:"KNO\u2083",r:"All nitrates are soluble."},{f:"NH\u2084Cl",r:"All ammonium compounds are soluble."},{f:"Na\u2082SO\u2084",r:"Sulfates are soluble except those of barium, lead and calcium, and sodium is an alkali metal."},{f:"Ca(NO\u2083)\u2082",r:"All nitrates are soluble, whatever the cation."},{f:"K\u2082CO\u2083",r:"Carbonates are insoluble except those of alkali metals and ammonium, and potassium is an alkali metal."},{f:"(NH\u2084)\u2082CO\u2083",r:"All ammonium compounds are soluble, which overrides the usual insolubility of carbonates."},{f:"CH\u2083COONa",r:"All acetates are soluble."},{f:"Mg(NO\u2083)\u2082",r:"All nitrates are soluble."},{f:"LiBr",r:"Compounds of alkali metals such as lithium are soluble."}];
  var insoluble=[{f:"AgCl",r:"Chlorides are soluble except those of silver, lead and mercury(I)."},{f:"PbI\u2082",r:"Iodides are soluble except those of silver, lead and mercury(I)."},{f:"BaSO\u2084",r:"Sulfates are soluble except those of barium, lead and calcium."},{f:"CaCO\u2083",r:"Carbonates are insoluble except those of alkali metals and ammonium."},{f:"Fe(OH)\u2083",r:"Hydroxides are insoluble except those of alkali metals and ammonium."},{f:"Ag\u2082CO\u2083",r:"Carbonates are insoluble except those of alkali metals and ammonium."},{f:"Ca\u2083(PO\u2084)\u2082",r:"Phosphates are insoluble except those of alkali metals and ammonium."},{f:"CuS",r:"Sulfides are insoluble except those of alkali metals and ammonium."},{f:"PbBr\u2082",r:"Bromides are soluble except those of silver, lead and mercury(I)."},{f:"BaCO\u2083",r:"Carbonates are insoluble except those of alkali metals and ammonium."}];
  var slight=[{f:"CaSO\u2084",r:"Sulfates are soluble except those of barium and lead, and calcium sulfate is only slightly soluble."},{f:"Ca(OH)\u2082",r:"Hydroxides are insoluble except those of alkali metals and ammonium, and calcium hydroxide is only slightly soluble."}];
  var kind=pick(["soluble","soluble","insoluble","insoluble","slight"]);
  var item=kind==="soluble"?pick(soluble):(kind==="insoluble"?pick(insoluble):pick(slight));
  var correct=kind==="soluble"?"Soluble in water":(kind==="insoluble"?"Insoluble in water":"Slightly soluble in water");
  var all=["Soluble in water","Slightly soluble in water","Insoluble in water","Reacts violently with water"],ds=[];
  for(var i=0;i<all.length;i++){if(all[i]!==correct){ds.push(all[i]);}}
  var t=ri(15,35),room=pick(["a school lab","a teaching lab","an industrial lab","a water quality lab"]);
  return mcq("In "+room+" at "+t+" \u00B0C, a student checks the general solubility rules before adding a compound to water. According to the rules, how is "+item.f+" classified in water?",correct,ds,item.r+" So "+item.f+" is classified as: <b>"+correct+"</b>.",{cp:item.f,t:t});
});

E("u1-56-which-mixture-precipitates",1,["5.6"],2,"gen",function(){
  var conc=pick(["0.05","0.10","0.20","0.50"]),t=ri(18,28);
  var sets=[
    {c:"barium chloride and sodium sulfate",w:["sodium nitrate and potassium chloride","ammonium chloride and sodium nitrate","potassium sulfate and sodium chloride"],e:"Mixing barium ions with sulfate ions forms barium sulfate, which is insoluble because sulfates of barium are an exception to sulfate solubility. The other pairs give only soluble ions in combination, so no precipitate forms."},
    {c:"silver nitrate and sodium chloride",w:["potassium nitrate and sodium sulfate","ammonium sulfate and lithium chloride","sodium acetate and potassium chloride"],e:"Silver ions and chloride ions form silver chloride, an insoluble chloride exception. The other pairs produce only soluble compounds, so no precipitate forms."},
    {c:"lead(II) nitrate and potassium iodide",w:["sodium chloride and ammonium nitrate","barium nitrate and potassium chloride","calcium chloride and sodium nitrate"],e:"Lead(II) ions and iodide ions form lead(II) iodide, an insoluble iodide exception. The other pairs produce only soluble compounds, so no precipitate forms."},
    {c:"calcium chloride and sodium carbonate",w:["potassium carbonate and ammonium chloride","sodium sulfate and potassium nitrate","lithium chloride and sodium acetate"],e:"Calcium ions and carbonate ions form calcium carbonate, and carbonates are insoluble except with alkali metals and ammonium. The other pairs produce only soluble compounds."},
    {c:"iron(III) chloride and sodium hydroxide",w:["ammonium hydroxide and sodium chloride","potassium hydroxide and lithium nitrate","sodium hydroxide and ammonium sulfate"],e:"Iron(III) ions and hydroxide ions form iron(III) hydroxide, and hydroxides are insoluble except with alkali metals and ammonium. The other pairs produce only soluble compounds."},
    {c:"copper(II) sulfate and sodium sulfide",w:["zinc sulfate and potassium nitrate","sodium sulfide and ammonium chloride","potassium sulfate and lithium chloride"],e:"Copper(II) ions and sulfide ions form copper(II) sulfide, and sulfides are insoluble except with alkali metals and ammonium. The other pairs produce only soluble compounds."},
    {c:"magnesium chloride and sodium hydroxide",w:["sodium chloride and potassium sulfate","ammonium chloride and lithium nitrate","potassium hydroxide and sodium acetate"],e:"Magnesium ions and hydroxide ions form magnesium hydroxide, which is insoluble. The other pairs produce only soluble compounds, so no precipitate forms."},
    {c:"barium nitrate and potassium carbonate",w:["calcium nitrate and sodium chloride","ammonium carbonate and potassium nitrate","lithium sulfate and sodium chloride"],e:"Barium ions and carbonate ions form barium carbonate, and carbonates are insoluble except with alkali metals and ammonium. The other pairs produce only soluble compounds."}
  ];
  var st=pick(sets);
  return mcq("Four pairs of "+conc+" mol/L solutions are mixed in separate test tubes at "+t+" \u00B0C. Which pair forms a precipitate?",st.c,st.w,st.e,{pair:st.c,conc:conc});
});

E("u1-56-precipitate-formula",1,["5.6"],2,"gen",function(){
  var concs=["0.05","0.10","0.20","0.25","0.50","1.0"];
  var pairs=[
    {a:"silver nitrate",b:"sodium chloride",p:"AgCl",pp:"AgCl",e:"Silver ions meet chloride ions. Chlorides are soluble except with silver, lead and mercury(I), so the precipitate is silver chloride, AgCl. The sodium and nitrate ions stay in solution."},
    {a:"lead(II) nitrate",b:"potassium iodide",p:"PbI\u2082",pp:"PbI2",e:"Lead(II) ions meet iodide ions. Iodides are soluble except with silver, lead and mercury(I), so the precipitate is lead(II) iodide, PbI\u2082."},
    {a:"barium chloride",b:"sodium sulfate",p:"BaSO\u2084",pp:"BaSO4",e:"Barium ions meet sulfate ions. Sulfates are soluble except with barium, lead and calcium, so the precipitate is barium sulfate, BaSO\u2084."},
    {a:"calcium chloride",b:"sodium carbonate",p:"CaCO\u2083",pp:"CaCO3",e:"Calcium ions meet carbonate ions. Carbonates are insoluble except with alkali metals and ammonium, so the precipitate is calcium carbonate, CaCO\u2083."},
    {a:"iron(III) chloride",b:"sodium hydroxide",p:"Fe(OH)\u2083",pp:"Fe(OH)3",e:"Iron(III) ions meet hydroxide ions. Hydroxides are insoluble except with alkali metals and ammonium, and three hydroxide ions balance one iron(III) ion, giving Fe(OH)\u2083."},
    {a:"copper(II) sulfate",b:"sodium sulfide",p:"CuS",pp:"CuS",e:"Copper(II) ions meet sulfide ions. Sulfides are insoluble except with alkali metals and ammonium, so the precipitate is copper(II) sulfide, CuS."},
    {a:"magnesium chloride",b:"sodium hydroxide",p:"Mg(OH)\u2082",pp:"Mg(OH)2",e:"Magnesium ions meet hydroxide ions. Hydroxides are insoluble except with alkali metals and ammonium, and two hydroxide ions balance one magnesium ion, giving Mg(OH)\u2082."},
    {a:"lead(II) nitrate",b:"sodium chloride",p:"PbCl\u2082",pp:"PbCl2",e:"Lead(II) ions meet chloride ions. Chlorides are soluble except with silver, lead and mercury(I), and two chloride ions balance one lead(II) ion, giving PbCl\u2082."},
    {a:"silver nitrate",b:"potassium bromide",p:"AgBr",pp:"AgBr",e:"Silver ions meet bromide ions. Bromides are soluble except with silver, lead and mercury(I), so the precipitate is silver bromide, AgBr."},
    {a:"barium nitrate",b:"potassium carbonate",p:"BaCO\u2083",pp:"BaCO3",e:"Barium ions meet carbonate ions. Carbonates are insoluble except with alkali metals and ammonium, so the precipitate is barium carbonate, BaCO\u2083."},
    {a:"calcium nitrate",b:"ammonium phosphate",p:"Ca\u2083(PO\u2084)\u2082",pp:"Ca3(PO4)2",e:"Calcium ions meet phosphate ions. Phosphates are insoluble except with alkali metals and ammonium. Three calcium ions balance two phosphate ions, giving Ca\u2083(PO\u2084)\u2082."},
    {a:"zinc chloride",b:"sodium sulfide",p:"ZnS",pp:"ZnS",e:"Zinc ions meet sulfide ions. Sulfides are insoluble except with alkali metals and ammonium, so the precipitate is zinc sulfide, ZnS."}
  ];
  var nones=[
    {a:"sodium nitrate",b:"potassium chloride",e:"Swapping the ions gives sodium chloride and potassium nitrate. Nitrates are all soluble and sodium and potassium compounds are soluble, so no precipitate forms."},
    {a:"ammonium chloride",b:"sodium nitrate",e:"Swapping the ions gives ammonium nitrate and sodium chloride. Ammonium compounds, nitrates and alkali metal compounds are all soluble, so no precipitate forms."},
    {a:"potassium sulfate",b:"sodium nitrate",e:"Swapping the ions gives potassium nitrate and sodium sulfate, both soluble. No insoluble combination is produced, so no precipitate forms."},
    {a:"lithium bromide",b:"ammonium acetate",e:"Swapping the ions gives lithium acetate and ammonium bromide. Acetates, ammonium compounds and alkali metal compounds are all soluble, so no precipitate forms."}
  ];
  var c1=pick(concs),c2=pick(concs);
  if(pick(["precip","precip","precip","none"])==="none"){
    var nn=pick(nones);
    return textq("A "+c1+" mol/L solution of "+nn.a+" is mixed with a "+c2+" mol/L solution of "+nn.b+". Give the formula of the precipitate that forms, or write none if no precipitate forms.",["none","no precipitate"],nn.e+" The answer is <b>none</b>.",{a:nn.a,b:nn.b});
  }
  var pr=pick(pairs);
  var acc=pr.p===pr.pp?[pr.p]:[pr.p,pr.pp];
  return textq("A "+c1+" mol/L solution of "+pr.a+" is mixed with a "+c2+" mol/L solution of "+pr.b+". Give the formula of the precipitate that forms, or write none if no precipitate forms.",acc,pr.e,{a:pr.a,b:pr.b});
});

E("u1-56-precipitate-or-soluble",1,["5.6"],2,"gen",function(){
  var pairs=[
    {a:"silver nitrate",b:"sodium chloride",c:"AgCl",w:["NaNO\u2083","AgNO\u2083","AgCl\u2082"],e:"Silver chloride is insoluble, while the other product, sodium nitrate, stays dissolved. The precipitate is AgCl."},
    {a:"barium chloride",b:"sodium sulfate",c:"BaSO\u2084",w:["NaCl","BaCl\u2082","Ba(SO\u2084)\u2082"],e:"Barium sulfate is insoluble, while sodium chloride stays dissolved. The precipitate is BaSO\u2084."},
    {a:"calcium chloride",b:"sodium carbonate",c:"CaCO\u2083",w:["NaCl","CaCl\u2082","Ca(CO\u2083)\u2082"],e:"Calcium carbonate is insoluble, while sodium chloride stays dissolved. The precipitate is CaCO\u2083."},
    {a:"lead(II) nitrate",b:"potassium iodide",c:"PbI\u2082",w:["KNO\u2083","PbI","Pb(NO\u2083)\u2082"],e:"Lead(II) iodide is insoluble, while potassium nitrate stays dissolved. The precipitate is PbI\u2082."},
    {a:"iron(III) chloride",b:"sodium hydroxide",c:"Fe(OH)\u2083",w:["NaCl","FeOH","Fe(OH)\u2082"],e:"Iron(III) hydroxide is insoluble, while sodium chloride stays dissolved. The precipitate is Fe(OH)\u2083."},
    {a:"sodium nitrate",b:"potassium chloride",c:"No precipitate forms",w:["NaCl","KNO\u2083","NaKClNO\u2083"],e:"Every possible combination of these ions is soluble: all nitrates are soluble and sodium and potassium compounds are soluble. No precipitate forms."},
    {a:"ammonium sulfate",b:"sodium chloride",c:"No precipitate forms",w:["NH\u2084Cl","Na\u2082SO\u2084","(NH\u2084)\u2082Cl"],e:"Ammonium compounds and alkali metal compounds are soluble, and this pairing produces no insoluble combination. No precipitate forms."},
    {a:"copper(II) sulfate",b:"sodium sulfide",c:"CuS",w:["Na\u2082SO\u2084","CuSO\u2084","Cu\u2082S"],e:"Copper(II) sulfide is insoluble, while sodium sulfate stays dissolved. The precipitate is CuS."},
    {a:"magnesium nitrate",b:"potassium hydroxide",c:"Mg(OH)\u2082",w:["KNO\u2083","MgOH","Mg(OH)\u2083"],e:"Magnesium hydroxide is insoluble, while potassium nitrate stays dissolved. The precipitate is Mg(OH)\u2082."},
    {a:"potassium carbonate",b:"ammonium nitrate",c:"No precipitate forms",w:["KNO\u2083","(NH\u2084)\u2082CO\u2083","NH\u2084NO\u2083"],e:"Potassium and ammonium carbonates are the soluble exceptions to carbonate insolubility, and all nitrates are soluble. No precipitate forms."}
  ];
  var pr=pick(pairs),conc=pick(["0.05","0.10","0.20","0.50"]),t=ri(18,30);
  return mcq("Equal volumes of "+conc+" mol/L "+pr.a+" solution and "+conc+" mol/L "+pr.b+" solution are mixed at "+t+" \u00B0C. What is observed?",pr.c,pr.w,pr.e,{a:pr.a,b:pr.b,t:t});
});

E("u1-56-precipitate-formula-advanced",1,["5.6"],3,"gen",function(){
  var concs=["0.02","0.05","0.10","0.15","0.20","0.40"];
  var pairs=[
    {a:"mercury(I) nitrate",b:"sodium chloride",p:"Hg\u2082Cl\u2082",pp:"Hg2Cl2",e:"Mercury(I) exists as the Hg\u2082\u00B2\u207A ion. Chlorides are soluble except with silver, lead and mercury(I), so mercury(I) chloride precipitates. Two chloride ions balance the 2+ charge, giving Hg\u2082Cl\u2082."},
    {a:"lead(II) acetate",b:"potassium sulfate",p:"PbSO\u2084",pp:"PbSO4",e:"All acetates are soluble, so lead(II) acetate dissolves and releases lead(II) ions. Sulfates are soluble except with barium, lead and calcium, so lead(II) sulfate, PbSO\u2084, precipitates."},
    {a:"copper(II) chloride",b:"ammonium sulfide",p:"CuS",pp:"CuS",e:"Ammonium sulfide is soluble because ammonium compounds are soluble, so sulfide ions are free in solution. Sulfides are insoluble except with alkali metals and ammonium, so copper(II) sulfide, CuS, precipitates."},
    {a:"iron(II) sulfate",b:"sodium hydroxide",p:"Fe(OH)\u2082",pp:"Fe(OH)2",e:"Iron(II) sulfate is soluble, so iron(II) ions are free in solution. Hydroxides are insoluble except with alkali metals and ammonium, and two hydroxide ions balance one iron(II) ion, giving Fe(OH)\u2082."},
    {a:"aluminum sulfate",b:"sodium phosphate",p:"AlPO\u2084",pp:"AlPO4",e:"Aluminum sulfate is soluble. Phosphates are insoluble except with alkali metals and ammonium, and the 3+ aluminum ion balances the 3- phosphate ion one to one, giving AlPO\u2084."},
    {a:"chromium(III) chloride",b:"sodium hydroxide",p:"Cr(OH)\u2083",pp:"Cr(OH)3",e:"Chromium(III) chloride is soluble. Hydroxides are insoluble except with alkali metals and ammonium, and three hydroxide ions balance one chromium(III) ion, giving Cr(OH)\u2083."},
    {a:"lead(II) nitrate",b:"sodium sulfate",p:"PbSO\u2084",pp:"PbSO4",e:"All nitrates are soluble, so lead(II) ions are free in solution. Sulfates are soluble except with barium, lead and calcium, so lead(II) sulfate, PbSO\u2084, precipitates."},
    {a:"silver nitrate",b:"sodium phosphate",p:"Ag\u2083PO\u2084",pp:"Ag3PO4",e:"All nitrates are soluble, so silver ions are free in solution. Phosphates are insoluble except with alkali metals and ammonium, and three silver ions balance one phosphate ion, giving Ag\u2083PO\u2084."},
    {a:"manganese(II) chloride",b:"sodium sulfide",p:"MnS",pp:"MnS",e:"Manganese(II) chloride is soluble. Sulfides are insoluble except with alkali metals and ammonium, so manganese(II) sulfide, MnS, precipitates."},
    {a:"calcium chloride",b:"potassium phosphate",p:"Ca\u2083(PO\u2084)\u2082",pp:"Ca3(PO4)2",e:"Both starting salts are soluble. Phosphates are insoluble except with alkali metals and ammonium, and three calcium ions balance two phosphate ions, giving Ca\u2083(PO\u2084)\u2082."}
  ];
  var pr=pick(pairs),c1=pick(concs),c2=pick(concs);
  var acc=pr.p===pr.pp?[pr.p]:[pr.p,pr.pp];
  return textq("A "+c1+" mol/L solution of "+pr.a+" is mixed with a "+c2+" mol/L solution of "+pr.b+". Give the formula of the precipitate that forms, or write none if no precipitate forms.",acc,pr.e,{a:pr.a,b:pr.b});
});

E("u1-57-identify-ratio",1,["5.7"],1,"gen",function(){
  var rxns=[
    {eq:"2H\u2082 + O\u2082 \u2192 2H\u2082O",sp:[{n:"H\u2082",c:2},{n:"O\u2082",c:1},{n:"H\u2082O",c:2}]},
    {eq:"N\u2082 + 3H\u2082 \u2192 2NH\u2083",sp:[{n:"N\u2082",c:1},{n:"H\u2082",c:3},{n:"NH\u2083",c:2}]},
    {eq:"2Mg + O\u2082 \u2192 2MgO",sp:[{n:"Mg",c:2},{n:"O\u2082",c:1},{n:"MgO",c:2}]},
    {eq:"CH\u2084 + 2O\u2082 \u2192 CO\u2082 + 2H\u2082O",sp:[{n:"CH\u2084",c:1},{n:"O\u2082",c:2},{n:"CO\u2082",c:1},{n:"H\u2082O",c:2}]},
    {eq:"2H\u2082O\u2082 \u2192 2H\u2082O + O\u2082",sp:[{n:"H\u2082O\u2082",c:2},{n:"H\u2082O",c:2},{n:"O\u2082",c:1}]},
    {eq:"2KClO\u2083 \u2192 2KCl + 3O\u2082",sp:[{n:"KClO\u2083",c:2},{n:"KCl",c:2},{n:"O\u2082",c:3}]},
    {eq:"4Al + 3O\u2082 \u2192 2Al\u2082O\u2083",sp:[{n:"Al",c:4},{n:"O\u2082",c:3},{n:"Al\u2082O\u2083",c:2}]},
    {eq:"C\u2083H\u2088 + 5O\u2082 \u2192 3CO\u2082 + 4H\u2082O",sp:[{n:"C\u2083H\u2088",c:1},{n:"O\u2082",c:5},{n:"CO\u2082",c:3},{n:"H\u2082O",c:4}]},
    {eq:"2Na + 2H\u2082O \u2192 2NaOH + H\u2082",sp:[{n:"Na",c:2},{n:"H\u2082O",c:2},{n:"NaOH",c:2},{n:"H\u2082",c:1}]}
  ];
  var r=pick(rxns),i=ri(0,r.sp.length-1),j=ri(0,r.sp.length-1);
  while(j===i){j=ri(0,r.sp.length-1);}
  var A=r.sp[i],B=r.sp[j],correct=A.c+":"+B.c;
  var pool=[B.c+":"+A.c,"1:1",(A.c+1)+":"+B.c,A.c+":"+(B.c+1),"1:"+B.c,A.c+":1",(A.c+B.c)+":"+B.c,(A.c+2)+":"+B.c,A.c+":"+(B.c+2),(A.c+1)+":"+(B.c+1),"3:2","2:3",(B.c+2)+":"+A.c],seen={},ds=[];
  var cand=shuffle(pool.slice());
  for(var k=0;k<cand.length&&ds.length<3;k++){if(cand[k]!==correct&&!seen[cand[k]]){seen[cand[k]]=1;ds.push(cand[k]);}}
  return mcq("For the reaction "+r.eq+", what is the mole ratio of "+A.n+" to "+B.n+"?",correct,ds,"Mole ratios are read directly from the coefficients of the balanced equation. The coefficient of "+A.n+" is "+A.c+" and the coefficient of "+B.n+" is "+B.c+", so the ratio of "+A.n+" to "+B.n+" is <b>"+correct+"</b>.",{eq:r.eq,a:A.n,b:B.n});
});

E("u1-57-moles-direct",1,["5.7"],2,"gen",function(){
  var rxns=[
    {eq:"2H\u2082 + O\u2082 \u2192 2H\u2082O",sp:[{n:"H\u2082",c:2},{n:"O\u2082",c:1},{n:"H\u2082O",c:2}]},
    {eq:"N\u2082 + 3H\u2082 \u2192 2NH\u2083",sp:[{n:"N\u2082",c:1},{n:"H\u2082",c:3},{n:"NH\u2083",c:2}]},
    {eq:"2Mg + O\u2082 \u2192 2MgO",sp:[{n:"Mg",c:2},{n:"O\u2082",c:1},{n:"MgO",c:2}]},
    {eq:"CH\u2084 + 2O\u2082 \u2192 CO\u2082 + 2H\u2082O",sp:[{n:"CH\u2084",c:1},{n:"O\u2082",c:2},{n:"CO\u2082",c:1},{n:"H\u2082O",c:2}]},
    {eq:"4Al + 3O\u2082 \u2192 2Al\u2082O\u2083",sp:[{n:"Al",c:4},{n:"O\u2082",c:3},{n:"Al\u2082O\u2083",c:2}]},
    {eq:"C\u2083H\u2088 + 5O\u2082 \u2192 3CO\u2082 + 4H\u2082O",sp:[{n:"C\u2083H\u2088",c:1},{n:"O\u2082",c:5},{n:"CO\u2082",c:3},{n:"H\u2082O",c:4}]},
    {eq:"2Na + 2H\u2082O \u2192 2NaOH + H\u2082",sp:[{n:"Na",c:2},{n:"H\u2082O",c:2},{n:"NaOH",c:2},{n:"H\u2082",c:1}]}
  ];
  var r=pick(rxns),i=ri(0,r.sp.length-1),j=ri(0,r.sp.length-1);
  while(j===i){j=ri(0,r.sp.length-1);}
  var G=r.sp[i],T=r.sp[j],given=ri(10,900)/100,ans=sfR(given*T.c/G.c,3);
  return numq("For the reaction "+r.eq+", how many moles of "+T.n+" are produced or consumed when "+gF(given)+" mol of "+G.n+" reacts? Give your answer in mol.",ans,Math.max(0.01,ans*0.02),"Use the mole ratio from the balanced equation: moles of "+T.n+" = "+gF(given)+" mol "+G.n+" \u00D7 ("+T.c+" mol "+T.n+" / "+G.c+" mol "+G.n+") = <b>"+F3(ans)+" mol</b>.",{eq:r.eq,g:G.n,t:T.n,given:given});
});

E("u1-57-moles-reverse",1,["5.7"],2,"gen",function(){
  var rxns=[
    {eq:"2H\u2082O\u2082 \u2192 2H\u2082O + O\u2082",sp:[{n:"H\u2082O\u2082",c:2,role:"r"},{n:"H\u2082O",c:2,role:"p"},{n:"O\u2082",c:1,role:"p"}]},
    {eq:"2KClO\u2083 \u2192 2KCl + 3O\u2082",sp:[{n:"KClO\u2083",c:2,role:"r"},{n:"KCl",c:2,role:"p"},{n:"O\u2082",c:3,role:"p"}]},
    {eq:"CaCO\u2083 \u2192 CaO + CO\u2082",sp:[{n:"CaCO\u2083",c:1,role:"r"},{n:"CaO",c:1,role:"p"},{n:"CO\u2082",c:1,role:"p"}]},
    {eq:"2HgO \u2192 2Hg + O\u2082",sp:[{n:"HgO",c:2,role:"r"},{n:"Hg",c:2,role:"p"},{n:"O\u2082",c:1,role:"p"}]},
    {eq:"2NaHCO\u2083 \u2192 Na\u2082CO\u2083 + H\u2082O + CO\u2082",sp:[{n:"NaHCO\u2083",c:2,role:"r"},{n:"Na\u2082CO\u2083",c:1,role:"p"},{n:"H\u2082O",c:1,role:"p"},{n:"CO\u2082",c:1,role:"p"}]},
    {eq:"4NH\u2083 + 5O\u2082 \u2192 4NO + 6H\u2082O",sp:[{n:"NH\u2083",c:4,role:"r"},{n:"O\u2082",c:5,role:"r"},{n:"NO",c:4,role:"p"},{n:"H\u2082O",c:6,role:"p"}]}
  ];
  var r=pick(rxns),prods=[],reacts=[];
  for(var i=0;i<r.sp.length;i++){if(r.sp[i].role==="p"){prods.push(r.sp[i]);}else{reacts.push(r.sp[i]);}}
  var P=pick(prods),R=pick(reacts),given=ri(20,950)/100,ans=sfR(given*R.c/P.c,3);
  return numq("For the reaction "+r.eq+", a student wants to produce "+gF(given)+" mol of "+P.n+". How many moles of "+R.n+" are needed? Give your answer in mol.",ans,Math.max(0.01,ans*0.02),"Work backwards with the mole ratio from the balanced equation: moles of "+R.n+" = "+gF(given)+" mol "+P.n+" \u00D7 ("+R.c+" mol "+R.n+" / "+P.c+" mol "+P.n+") = <b>"+F3(ans)+" mol</b>.",{eq:r.eq,p:P.n,r:R.n,given:given});
});

E("u1-57-moles-mcq",1,["5.7"],2,"gen",function(){
  var rxns=[
    {eq:"N\u2082 + 3H\u2082 \u2192 2NH\u2083",sp:[{n:"N\u2082",c:1},{n:"H\u2082",c:3},{n:"NH\u2083",c:2}]},
    {eq:"CH\u2084 + 2O\u2082 \u2192 CO\u2082 + 2H\u2082O",sp:[{n:"CH\u2084",c:1},{n:"O\u2082",c:2},{n:"CO\u2082",c:1},{n:"H\u2082O",c:2}]},
    {eq:"2KClO\u2083 \u2192 2KCl + 3O\u2082",sp:[{n:"KClO\u2083",c:2},{n:"KCl",c:2},{n:"O\u2082",c:3}]},
    {eq:"4Al + 3O\u2082 \u2192 2Al\u2082O\u2083",sp:[{n:"Al",c:4},{n:"O\u2082",c:3},{n:"Al\u2082O\u2083",c:2}]},
    {eq:"C\u2083H\u2088 + 5O\u2082 \u2192 3CO\u2082 + 4H\u2082O",sp:[{n:"C\u2083H\u2088",c:1},{n:"O\u2082",c:5},{n:"CO\u2082",c:3},{n:"H\u2082O",c:4}]},
    {eq:"2Mg + O\u2082 \u2192 2MgO",sp:[{n:"Mg",c:2},{n:"O\u2082",c:1},{n:"MgO",c:2}]}
  ];
  var r=pick(rxns),pairs=[];
  for(var i=0;i<r.sp.length;i++){for(var j=0;j<r.sp.length;j++){if(i!==j&&r.sp[i].c!==r.sp[j].c){pairs.push([r.sp[i],r.sp[j]]);}}}
  var pr=pick(pairs),G=pr[0],T=pr[1],given=ri(20,800)/100,ans=given*T.c/G.c;
  var d1=given,d2=given*G.c/T.c,d3=given*(T.c+1)/G.c;
  var vals=[ans,d1,d2,d3],tries=0;
  function clash(a,b){return Math.abs(a-b)<0.02;}
  while(tries<20&&(clash(d1,ans)||clash(d2,ans)||clash(d3,ans)||clash(d1,d2)||clash(d1,d3)||clash(d2,d3))){d3=d3+0.53;d1=clash(d1,ans)||clash(d1,d2)?d1+1.37:d1;d2=clash(d2,ans)?d2+2.11:d2;tries++;}
  return mcq("For the reaction "+r.eq+", how many moles of "+T.n+" are involved when "+gF(given)+" mol of "+G.n+" reacts? Give your answer in mol.",F3(ans),[F3(d1),F3(d2),F3(d3)],"Apply the mole ratio from the coefficients: "+gF(given)+" mol "+G.n+" \u00D7 ("+T.c+" / "+G.c+") = <b>"+F3(ans)+" mol</b> of "+T.n+". Using the ratio upside down, or skipping the ratio entirely, gives the other values.",{eq:r.eq,g:G.n,t:T.n,given:given});
});

E("u1-57-particles-ratio",1,["5.7"],3,"gen",function(){
  var rxns=[
    {eq:"2H\u2082 + O\u2082 \u2192 2H\u2082O",sp:[{n:"H\u2082",c:2},{n:"O\u2082",c:1},{n:"H\u2082O",c:2}]},
    {eq:"N\u2082 + 3H\u2082 \u2192 2NH\u2083",sp:[{n:"N\u2082",c:1},{n:"H\u2082",c:3},{n:"NH\u2083",c:2}]},
    {eq:"CH\u2084 + 2O\u2082 \u2192 CO\u2082 + 2H\u2082O",sp:[{n:"CH\u2084",c:1},{n:"O\u2082",c:2},{n:"CO\u2082",c:1},{n:"H\u2082O",c:2}]},
    {eq:"2KClO\u2083 \u2192 2KCl + 3O\u2082",sp:[{n:"KClO\u2083",c:2},{n:"KCl",c:2},{n:"O\u2082",c:3}]},
    {eq:"C\u2083H\u2088 + 5O\u2082 \u2192 3CO\u2082 + 4H\u2082O",sp:[{n:"C\u2083H\u2088",c:1},{n:"O\u2082",c:5},{n:"CO\u2082",c:3},{n:"H\u2082O",c:4}]}
  ];
  var r=pick(rxns),i=ri(0,r.sp.length-1),j=ri(0,r.sp.length-1);
  while(j===i){j=ri(0,r.sp.length-1);}
  var G=r.sp[i],T=r.sp[j],k=ri(150,900)/100,molesGiven=sfR(k/6.022,4),ans=sfR(molesGiven*T.c/G.c,3);
  return numq("For the reaction "+r.eq+", a sample contains \\("+fmtF(k,2)+" \\times 10^{23}\\) particles of "+G.n+". How many moles of "+T.n+" will react with or form from this sample? Give your answer in mol.",ans,Math.max(0.01,ans*0.02),"First change particles to moles: \\("+fmtF(k,2)+" \\times 10^{23}\\) / \\(6.022 \\times 10^{23}\\) = "+iF(molesGiven)+" mol of "+G.n+". Then apply the mole ratio from the equation: "+iF(molesGiven)+" \u00D7 ("+T.c+" / "+G.c+") = <b>"+F3(ans)+" mol</b> of "+T.n+".",{eq:r.eq,g:G.n,t:T.n,k:k});
});

E("u1-58-mass-to-mass",1,["5.8"],2,"gen",function(){
  var rxns=[
    {eq:"2Mg + O\u2082 \u2192 2MgO",A:{f:"Mg",m:CHEM_AM.Mg,c:2},B:{f:"MgO",m:CHEM_AM.Mg+CHEM_AM.O,c:2}},
    {eq:"CaCO\u2083 \u2192 CaO + CO\u2082",A:{f:"CaCO\u2083",m:CHEM_AM.Ca+CHEM_AM.C+3*CHEM_AM.O,c:1},B:{f:"CaO",m:CHEM_AM.Ca+CHEM_AM.O,c:1}},
    {eq:"2H\u2082 + O\u2082 \u2192 2H\u2082O",A:{f:"H\u2082",m:2*CHEM_AM.H,c:2},B:{f:"H\u2082O",m:2*CHEM_AM.H+CHEM_AM.O,c:2}},
    {eq:"CH\u2084 + 2O\u2082 \u2192 CO\u2082 + 2H\u2082O",A:{f:"CH\u2084",m:CHEM_AM.C+4*CHEM_AM.H,c:1},B:{f:"CO\u2082",m:CHEM_AM.C+2*CHEM_AM.O,c:1}},
    {eq:"N\u2082 + 3H\u2082 \u2192 2NH\u2083",A:{f:"N\u2082",m:2*CHEM_AM.N,c:1},B:{f:"NH\u2083",m:CHEM_AM.N+3*CHEM_AM.H,c:2}},
    {eq:"2KClO\u2083 \u2192 2KCl + 3O\u2082",A:{f:"KClO\u2083",m:CHEM_AM.K+CHEM_AM.Cl+3*CHEM_AM.O,c:2},B:{f:"KCl",m:CHEM_AM.K+CHEM_AM.Cl,c:2}},
    {eq:"Zn + 2HCl \u2192 ZnCl\u2082 + H\u2082",A:{f:"Zn",m:CHEM_AM.Zn,c:1},B:{f:"ZnCl\u2082",m:CHEM_AM.Zn+2*CHEM_AM.Cl,c:1}},
    {eq:"Fe\u2082O\u2083 + 3CO \u2192 2Fe + 3CO\u2082",A:{f:"Fe\u2082O\u2083",m:2*CHEM_AM.Fe+3*CHEM_AM.O,c:1},B:{f:"Fe",m:CHEM_AM.Fe,c:2}}
  ];
  var r=pick(rxns),massA=ri(20,2000)/10,nA=sfR(massA/r.A.m,4),nB=sfR(nA*r.B.c/r.A.c,4),ans=sfR(nB*r.B.m,3);
  return numq("For the reaction "+r.eq+", what mass of "+r.B.f+" is produced from "+gF(massA)+" g of "+r.A.f+"? Give your answer in g.",ans,Math.max(0.05,ans*0.02),"Change the given mass to moles: "+gF(massA)+" g / "+fmtF(r.A.m,2)+" g/mol = "+iF(nA)+" mol of "+r.A.f+". Apply the mole ratio: "+iF(nA)+" \u00D7 ("+r.B.c+" / "+r.A.c+") = "+iF(nB)+" mol of "+r.B.f+". Change back to mass: "+iF(nB)+" \u00D7 "+fmtF(r.B.m,2)+" g/mol = <b>"+F3(ans)+" g</b>.",{eq:r.eq,massA:massA});
});

E("u1-58-mass-to-gas-volume",1,["5.8"],2,"gen",function(){
  var rxns=[
    {eq:"CaCO\u2083 \u2192 CaO + CO\u2082",A:{f:"CaCO\u2083",m:CHEM_AM.Ca+CHEM_AM.C+3*CHEM_AM.O,c:1},G:{f:"CO\u2082",c:1}},
    {eq:"Zn + 2HCl \u2192 ZnCl\u2082 + H\u2082",A:{f:"Zn",m:CHEM_AM.Zn,c:1},G:{f:"H\u2082",c:1}},
    {eq:"2KClO\u2083 \u2192 2KCl + 3O\u2082",A:{f:"KClO\u2083",m:CHEM_AM.K+CHEM_AM.Cl+3*CHEM_AM.O,c:2},G:{f:"O\u2082",c:3}},
    {eq:"Mg + 2HCl \u2192 MgCl\u2082 + H\u2082",A:{f:"Mg",m:CHEM_AM.Mg,c:1},G:{f:"H\u2082",c:1}},
    {eq:"Na\u2082CO\u2083 + 2HCl \u2192 2NaCl + H\u2082O + CO\u2082",A:{f:"Na\u2082CO\u2083",m:2*CHEM_AM.Na+CHEM_AM.C+3*CHEM_AM.O,c:1},G:{f:"CO\u2082",c:1}},
    {eq:"2NaHCO\u2083 \u2192 Na\u2082CO\u2083 + H\u2082O + CO\u2082",A:{f:"NaHCO\u2083",m:CHEM_AM.Na+CHEM_AM.H+CHEM_AM.C+3*CHEM_AM.O,c:2},G:{f:"CO\u2082",c:1}}
  ];
  var r=pick(rxns),massA=ri(10,1500)/10,nA=sfR(massA/r.A.m,4),nG=sfR(nA*r.G.c/r.A.c,4),ans=sfR(nG*22.4,3);
  return numq("For the reaction "+r.eq+", what volume of "+r.G.f+" gas at STP is produced from "+gF(massA)+" g of "+r.A.f+"? Give your answer in L.",ans,Math.max(0.05,ans*0.02),"Change the given mass to moles: "+gF(massA)+" g / "+fmtF(r.A.m,2)+" g/mol = "+iF(nA)+" mol of "+r.A.f+". Apply the mole ratio: "+iF(nA)+" \u00D7 ("+r.G.c+" / "+r.A.c+") = "+iF(nG)+" mol of "+r.G.f+". Change moles of gas to volume at STP: "+iF(nG)+" \u00D7 22.4 L/mol = <b>"+F3(ans)+" L</b>.",{eq:r.eq,massA:massA});
});

E("u1-58-concentration",1,["5.8"],2,"gen",function(){
  if(pick(["moles","mass"])==="moles"){
    var n=ri(5,400)/100,v=ri(100,1000),c=sfR(n/(v/1000),3);
    return numq("A solution is made by dissolving "+gF(n)+" mol of solute and making the volume up to "+v+" mL. Calculate the amount concentration of the solution. Give your answer in mol/L.",c,Math.max(0.01,c*0.02),"Amount concentration c = n / V. Convert the volume to litres: "+v+" mL = "+F3(v/1000)+" L. Then c = "+gF(n)+" mol / "+F3(v/1000)+" L = <b>"+F3(c)+" mol/L</b>.",{n:n,v:v});
  }
  var cps=[{f:"NaCl",m:CHEM_AM.Na+CHEM_AM.Cl},{f:"KNO\u2083",m:CHEM_AM.K+CHEM_AM.N+3*CHEM_AM.O},{f:"C\u2086H\u2081\u2082O\u2086",m:6*CHEM_AM.C+12*CHEM_AM.H+6*CHEM_AM.O},{f:"CuSO\u2084",m:CHEM_AM.Cu+CHEM_AM.S+4*CHEM_AM.O},{f:"NaOH",m:CHEM_AM.Na+CHEM_AM.O+CHEM_AM.H},{f:"CaCl\u2082",m:CHEM_AM.Ca+2*CHEM_AM.Cl}];
  var cp=pick(cps),mass=ri(10,600)/10,v2=pick([250,500,750,1000]),n2=sfR(mass/cp.m,4),c2=sfR(n2/(v2/1000),3);
  return numq("A solution is made by dissolving "+gF(mass)+" g of "+cp.f+" and making the volume up to "+v2+" mL. Calculate the amount concentration of the solution. Give your answer in mol/L (the molar mass of "+cp.f+" is "+fmtF(cp.m,2)+" g/mol).",c2,Math.max(0.01,c2*0.02),"First change mass to moles: "+gF(mass)+" g / "+fmtF(cp.m,2)+" g/mol = "+iF(n2)+" mol. Convert the volume: "+v2+" mL = "+F3(v2/1000)+" L. Then c = n / V = "+iF(n2)+" mol / "+F3(v2/1000)+" L = <b>"+F3(c2)+" mol/L</b>.",{cp:cp.f,mass:mass,v:v2});
});

E("u1-58-dilution",1,["5.8"],2,"gen",function(){
  var stock=pick(["hydrochloric acid","sodium hydroxide solution","copper(II) sulfate solution","potassium nitrate solution","ammonia solution"]);
  if(pick(["volume","conc"])==="volume"){
    var c1=pick([0.50,1.00,2.00,3.00,4.00,6.00]),v1=ri(10,250),factor=pick([2,4,5,10]),c2=c1/factor,ans=sfR(c1*v1/c2,3);
    return numq("A student dilutes "+v1+" mL of "+F3(c1)+" mol/L "+stock+" to prepare a "+F3(c2)+" mol/L solution, using c\u2081V\u2081 = c\u2082V\u2082. What final volume is needed? Give your answer in mL.",ans,Math.max(0.5,ans*0.02),"The amount of solute does not change during dilution, so c\u2081V\u2081 = c\u2082V\u2082. Substitute: "+F3(c1)+" mol/L \u00D7 "+v1+" mL = "+F3(c2)+" mol/L \u00D7 V\u2082. Solving gives V\u2082 = "+iF(c1*v1)+" / "+F3(c2)+" = <b>"+F3(ans)+" mL</b>.",{c1:c1,v1:v1,c2:c2});
  }
  var cc1=pick([0.50,1.00,2.00,3.00,4.00,6.00]),vv1=ri(10,200),fac=pick([2,3,4,5]),vv2=vv1*fac,ans2=sfR(cc1*vv1/vv2,3);
  return numq("A student takes "+vv1+" mL of "+F3(cc1)+" mol/L "+stock+" and dilutes it to a final volume of "+vv2+" mL, using c\u2081V\u2081 = c\u2082V\u2082. What is the concentration of the diluted solution? Give your answer in mol/L.",ans2,Math.max(0.005,ans2*0.02),"The amount of solute does not change during dilution, so c\u2081V\u2081 = c\u2082V\u2082. Substitute: "+F3(cc1)+" mol/L \u00D7 "+vv1+" mL = c\u2082 \u00D7 "+vv2+" mL. Solving gives c\u2082 = "+iF(cc1*vv1)+" / "+vv2+" = <b>"+F3(ans2)+" mol/L</b>.",{c1:cc1,v1:vv1,v2:vv2});
});

E("u1-58-limiting-theoretical-yield",1,["5.8"],3,"gen",function(){
  var rxns=[
    {eq:"2Mg + O\u2082 \u2192 2MgO",A:{f:"Mg",m:CHEM_AM.Mg,c:2},B:{f:"O\u2082",m:2*CHEM_AM.O,c:1},P:{f:"MgO",m:CHEM_AM.Mg+CHEM_AM.O,c:2}},
    {eq:"2H\u2082 + O\u2082 \u2192 2H\u2082O",A:{f:"H\u2082",m:2*CHEM_AM.H,c:2},B:{f:"O\u2082",m:2*CHEM_AM.O,c:1},P:{f:"H\u2082O",m:2*CHEM_AM.H+CHEM_AM.O,c:2}},
    {eq:"N\u2082 + 3H\u2082 \u2192 2NH\u2083",A:{f:"N\u2082",m:2*CHEM_AM.N,c:1},B:{f:"H\u2082",m:2*CHEM_AM.H,c:3},P:{f:"NH\u2083",m:CHEM_AM.N+3*CHEM_AM.H,c:2}},
    {eq:"4Al + 3O\u2082 \u2192 2Al\u2082O\u2083",A:{f:"Al",m:CHEM_AM.Al,c:4},B:{f:"O\u2082",m:2*CHEM_AM.O,c:3},P:{f:"Al\u2082O\u2083",m:2*CHEM_AM.Al+3*CHEM_AM.O,c:2}},
    {eq:"CH\u2084 + 2O\u2082 \u2192 CO\u2082 + 2H\u2082O",A:{f:"CH\u2084",m:CHEM_AM.C+4*CHEM_AM.H,c:1},B:{f:"O\u2082",m:2*CHEM_AM.O,c:2},P:{f:"CO\u2082",m:CHEM_AM.C+2*CHEM_AM.O,c:1}}
  ];
  var r=pick(rxns),pA=ri(20,300)/100,pB=Math.round(pA*pick([0.5,0.7,1.4,1.8])*100)/100;
  var massA=Math.round((pA*r.A.c/r.P.c)*r.A.m*10)/10,massB=Math.round((pB*r.B.c/r.P.c)*r.B.m*10)/10;
  var nA=sfR(massA/r.A.m,4),nB=sfR(massB/r.B.m,4);
  var fromA=sfR(nA*r.P.c/r.A.c,4),fromB=sfR(nB*r.P.c/r.B.c,4);
  var lim=fromA<fromB?r.A.f:r.B.f,nP=Math.min(fromA,fromB),ans=sfR(nP*r.P.m,3);
  return numq("For the reaction "+r.eq+", a mixture of "+gF(massA)+" g of "+r.A.f+" and "+gF(massB)+" g of "+r.B.f+" reacts. Calculate the theoretical yield of "+r.P.f+". Give your answer in g.",ans,Math.max(0.05,ans*0.02),"Test each reactant. From "+r.A.f+": "+gF(massA)+" g / "+fmtF(r.A.m,2)+" g/mol = "+iF(nA)+" mol, which can make "+iF(nA)+" \u00D7 ("+r.P.c+" / "+r.A.c+") = "+iF(fromA)+" mol of "+r.P.f+". From "+r.B.f+": "+gF(massB)+" g / "+fmtF(r.B.m,2)+" g/mol = "+iF(nB)+" mol, which can make "+iF(nB)+" \u00D7 ("+r.P.c+" / "+r.B.c+") = "+iF(fromB)+" mol of "+r.P.f+". The smaller amount wins, so "+lim+" is the limiting reactant. Theoretical yield = "+iF(nP)+" mol \u00D7 "+fmtF(r.P.m,2)+" g/mol = <b>"+F3(ans)+" g</b>.",{eq:r.eq,massA:massA,massB:massB,lim:lim});
});

E("u1-58-excess-remaining",1,["5.8"],3,"gen",function(){
  var rxns=[
    {eq:"2Mg + O\u2082 \u2192 2MgO",A:{f:"Mg",m:CHEM_AM.Mg,c:2},B:{f:"O\u2082",m:2*CHEM_AM.O,c:1},P:{f:"MgO",m:CHEM_AM.Mg+CHEM_AM.O,c:2}},
    {eq:"2H\u2082 + O\u2082 \u2192 2H\u2082O",A:{f:"H\u2082",m:2*CHEM_AM.H,c:2},B:{f:"O\u2082",m:2*CHEM_AM.O,c:1},P:{f:"H\u2082O",m:2*CHEM_AM.H+CHEM_AM.O,c:2}},
    {eq:"N\u2082 + 3H\u2082 \u2192 2NH\u2083",A:{f:"N\u2082",m:2*CHEM_AM.N,c:1},B:{f:"H\u2082",m:2*CHEM_AM.H,c:3},P:{f:"NH\u2083",m:CHEM_AM.N+3*CHEM_AM.H,c:2}},
    {eq:"4Al + 3O\u2082 \u2192 2Al\u2082O\u2083",A:{f:"Al",m:CHEM_AM.Al,c:4},B:{f:"O\u2082",m:2*CHEM_AM.O,c:3},P:{f:"Al\u2082O\u2083",m:2*CHEM_AM.Al+3*CHEM_AM.O,c:2}},
    {eq:"CH\u2084 + 2O\u2082 \u2192 CO\u2082 + 2H\u2082O",A:{f:"CH\u2084",m:CHEM_AM.C+4*CHEM_AM.H,c:1},B:{f:"O\u2082",m:2*CHEM_AM.O,c:2},P:{f:"CO\u2082",m:CHEM_AM.C+2*CHEM_AM.O,c:1}}
  ];
  var r=pick(rxns),pA=ri(20,300)/100,pB=Math.round(pA*pick([0.5,0.7,1.4,1.8])*100)/100;
  var massA=Math.round((pA*r.A.c/r.P.c)*r.A.m*10)/10,massB=Math.round((pB*r.B.c/r.P.c)*r.B.m*10)/10;
  var nA=sfR(massA/r.A.m,4),nB=sfR(massB/r.B.m,4),fromA=sfR(nA*r.P.c/r.A.c,4),fromB=sfR(nB*r.P.c/r.B.c,4);
  var aLimits=fromA<fromB,L=aLimits?r.A:r.B,X=aLimits?r.B:r.A,nL=aLimits?nA:nB,nX=aLimits?nB:nA,massX=aLimits?massB:massA;
  var used=sfR(nL*X.c/L.c,4),left=sfR(nX-used,4),ans=sfR(left*X.m,3);
  return numq("For the reaction "+r.eq+", a mixture of "+gF(massA)+" g of "+r.A.f+" and "+gF(massB)+" g of "+r.B.f+" reacts completely. What mass of the excess reactant remains unreacted? Give your answer in g.",ans,Math.max(0.05,ans*0.02),"First find the limiting reactant. "+r.A.f+" can make "+iF(fromA)+" mol of "+r.P.f+" and "+r.B.f+" can make "+iF(fromB)+" mol, so "+L.f+" is limiting and "+X.f+" is in excess. The limiting reactant uses "+iF(nL)+" mol \u00D7 ("+X.c+" / "+L.c+") = "+iF(used)+" mol of "+X.f+". Excess remaining = "+iF(nX)+" - "+iF(used)+" = "+iF(left)+" mol, which is "+iF(left)+" \u00D7 "+fmtF(X.m,2)+" g/mol = <b>"+F3(ans)+" g</b> of "+X.f+".",{eq:r.eq,massA:massA,massB:massB,excess:X.f});
});

E("u1-59-percent-yield-direct",1,["5.9"],2,"gen",function(){
  var prods=pick(["aspirin","ammonia","methanol","ethanol","calcium oxide","sodium hydroxide","ibuprofen","copper metal"]);
  var theo=ri(50,900)/10,pct=ri(55,98),act=Math.round(theo*pct/100*10)/10,ans=sfR(act/theo*100,3);
  return numq("In a preparation of "+prods+", the theoretical yield is "+gF(theo)+" g and the actual yield obtained is "+gF(act)+" g. Calculate the percent yield. Give your answer in percent.",ans,Math.max(0.5,ans*0.02),"Percent yield = (actual yield / theoretical yield) \u00D7 100. Substitute: ("+gF(act)+" g / "+gF(theo)+" g) \u00D7 100 = <b>"+F3(ans)+" %</b>.",{prod:prods,theo:theo,act:act});
});

E("u1-59-percent-yield-from-reaction",1,["5.9"],2,"gen",function(){
  var rxns=[
    {eq:"2Mg + O\u2082 \u2192 2MgO",A:{f:"Mg",m:CHEM_AM.Mg,c:2},B:{f:"MgO",m:CHEM_AM.Mg+CHEM_AM.O,c:2}},
    {eq:"CaCO\u2083 \u2192 CaO + CO\u2082",A:{f:"CaCO\u2083",m:CHEM_AM.Ca+CHEM_AM.C+3*CHEM_AM.O,c:1},B:{f:"CaO",m:CHEM_AM.Ca+CHEM_AM.O,c:1}},
    {eq:"N\u2082 + 3H\u2082 \u2192 2NH\u2083",A:{f:"N\u2082",m:2*CHEM_AM.N,c:1},B:{f:"NH\u2083",m:CHEM_AM.N+3*CHEM_AM.H,c:2}},
    {eq:"CH\u2084 + 2O\u2082 \u2192 CO\u2082 + 2H\u2082O",A:{f:"CH\u2084",m:CHEM_AM.C+4*CHEM_AM.H,c:1},B:{f:"CO\u2082",m:CHEM_AM.C+2*CHEM_AM.O,c:1}},
    {eq:"Zn + 2HCl \u2192 ZnCl\u2082 + H\u2082",A:{f:"Zn",m:CHEM_AM.Zn,c:1},B:{f:"ZnCl\u2082",m:CHEM_AM.Zn+2*CHEM_AM.Cl,c:1}}
  ];
  var r=pick(rxns),massA=ri(20,1200)/10,nA=sfR(massA/r.A.m,4),theoFull=(massA/r.A.m)*(r.B.c/r.A.c)*r.B.m,theo=sfR(nA*(r.B.c/r.A.c)*r.B.m,4);
  var pct=ri(58,97),act=Math.round(theoFull*pct/100*10)/10,ans=sfR(act/theo*100,3);
  return numq("For the reaction "+r.eq+", "+gF(massA)+" g of "+r.A.f+" reacts and "+gF(act)+" g of "+r.B.f+" is actually collected. Calculate the percent yield of "+r.B.f+". Give your answer in percent.",ans,Math.max(0.5,ans*0.02),"First calculate the theoretical yield: "+gF(massA)+" g / "+fmtF(r.A.m,2)+" g/mol = "+iF(nA)+" mol of "+r.A.f+", then \u00D7 ("+r.B.c+" / "+r.A.c+") \u00D7 "+fmtF(r.B.m,2)+" g/mol = "+iF(theo)+" g of "+r.B.f+". Then percent yield = (actual / theoretical) \u00D7 100 = ("+gF(act)+" g / "+iF(theo)+" g) \u00D7 100 = <b>"+F3(ans)+" %</b>.",{eq:r.eq,massA:massA,act:act});
});

E("u1-59-maximize-yield",1,["5.9"],3,"var",varset([
  function(){
    var ctx=pick(["an industrial ammonia plant","a school preparation of magnesium oxide","a fertilizer production line"]),scale=ri(10,90);
    return mcq("In "+ctx+" running "+scale+" kg batches, one reactant is inexpensive and the other is costly. Which strategy most directly raises the amount of product formed from the costly reactant?","Use the inexpensive reactant in excess so more of the costly reactant can react",["Use equal masses of both reactants regardless of the mole ratio","Stop the reaction early so less reactant is wasted","Throw away the first batch of product and repeat the run"],"A limiting reactant caps the amount of product. Supplying the cheap reactant in excess makes the costly reactant the one that is used up as fully as possible, so more product forms from it.",{scale:scale});
  },
  function(){
    var m=ri(2,9);
    return mcq("A student collects a precipitate as the product and notices solid residue coating the beaker and stirring rod, with "+m+" small patches of product left behind. Which practice protects the actual yield?","Transfer the product quantitatively, rinsing any residue from the glassware into the collection vessel",["Leave residue in the beaker to keep the product pure","Discard the first portion of product collected","Weigh the product while it is still soaking wet"],"Product left behind on glassware or filter paper is product lost, which lowers the actual yield. Quantitative transfer, including rinsing residue into the collection vessel, recovers as much product as possible.",{});
  },
  function(){
    var t=ri(10,40);
    return mcq("A reaction mixture is usually heated for "+t+" minutes, but a test shows unreacted starting material remains at that point. Which change most directly improves the yield?","Allow the reaction more time to reach completion",["Cool the mixture so the reaction slows down","Remove half the reactants and continue with less","Stop measuring and report the theoretical yield as the result"],"If the reaction is incomplete, some reactant has not yet become product. Giving the reaction more time lets more of it react, raising the actual yield toward the theoretical yield.",{t:t});
  },
  function(){
    var prod=pick(["a gas product","a volatile liquid product"]),vol=ri(50,400);
    return mcq("In a synthesis expected to make about "+vol+" mL of "+prod+", the product can escape from an open beaker as it forms. Which change most directly improves the actual yield?","Collect the product in a closed system so none of it escapes",["Leave the beaker open longer so the product can leave","Vent the product to the room to keep the beaker clean","Add extra solvent so the escaping product is diluted"],"Product that escapes cannot be collected or weighed, so the actual yield falls. A closed collection system keeps the product in the apparatus so it can be recovered.",{vol:vol});
  },
  function(){
    var rxn=pick(["a neutralization","a precipitation reaction","a combustion synthesis"]),tmp=ri(20,80);
    return mcq("During "+rxn+" carried out at "+tmp+" \u00B0C, a second unwanted reaction uses up some of the same reactant. Which change most directly protects the yield of the wanted product?","Choose conditions that favour the wanted reaction over the side reaction",["Add more of every substance so both reactions speed up equally","Ignore the side reaction because it does not affect the yield","Report the yield including the unwanted product mass"],"A side reaction diverts reactant away from the wanted product, lowering its yield. Conditions that favour the wanted pathway leave more reactant available to form the wanted product.",{tmp:tmp});
  }
]));

E("u1-59-why-yield-is-low",1,["5.9"],3,"var",varset([
  function(){
    var prod=pick(["aspirin","copper(II) sulfate crystals","calcium oxide"]),exp=ri(5,60);
    return mcq("A class prepares "+prod+", expecting about "+exp+" g per group, and every group gets a percent yield well below 100 percent. Which is a chemically valid reason for the shortfall?","Some reactant was consumed by a side reaction that made a different product",["The theoretical yield was calculated with a balanced equation","The products were weighed on a balance","The reaction was written with state symbols"],"A side reaction uses up reactant without making the wanted product, so less product forms than the theoretical maximum. Careful calculation and weighing do not destroy product.",{exp:exp});
  },
  function(){
    var step=pick(["filtration","recrystallization","distillation"]),mins=ri(5,30);
    return mcq("After a "+step+" step that took "+mins+" minutes, a student notices a film of product left coating the glassware. How does this affect the percent yield?","It lowers the actual yield, because that product is not collected",["It raises the actual yield above 100 percent","It has no effect, because yield only depends on the equation","It changes the theoretical yield of the reaction"],"Yield compares the product actually collected with the theoretical maximum. Product left on glassware is lost during transfer, so the collected mass, and therefore the actual yield, is lower.",{mins:mins});
  },
  function(){
    var t=ri(3,12);
    return mcq("A reaction is stopped after "+t+" minutes, and a test shows starting material still present in the mixture. Why is the percent yield low?","The reaction was incomplete, so some reactant never became product",["The theoretical yield must have been too small","Unreacted starting material counts as extra product","Percent yield is always low when a timer is used"],"The theoretical yield assumes complete conversion of the limiting reactant. Stopping early leaves reactant unconverted, so less product forms and the percent yield drops.",{t:t});
  },
  function(){
    var step2=pick(["recrystallization","washing the crystals","a second filtration"]),crude=ri(8,80);
    return mcq("A crude solid product with a mass of "+crude+" g is purified by "+step2+" before it is weighed, and the percent yield drops compared with the crude mass. Why does purification lower the yield?","Purification steps remove product along with the impurities, lowering the actual yield",["Purification creates extra product from the impurities","Purification changes the mole ratio in the equation","Purification raises the theoretical yield"],"Every purification step, such as recrystallization or washing, sacrifices some product together with the impurities. That loss lowers the actual yield even though the product obtained is cleaner.",{crude:crude});
  },
  function(){
    var gas=pick(["carbon dioxide","hydrogen","oxygen"]),gv=ri(100,900);
    return mcq("A reaction should produce about "+gv+" mL of "+gas+" gas, which is collected over water in an open apparatus, and some bubbles escape around a loose fitting. Why is the measured yield low?","Some product escaped and was never collected or measured",["The escaped gas increases the mass of product","Gas products always give a 100 percent yield","The theoretical yield counts only the escaped gas"],"Yield is based on product actually recovered. Gas that leaks away is product lost, so the measured amount falls short of the theoretical yield.",{gas:gas,gv:gv});
  }
]));

E("u1-510-application-idea",1,["5.10"],1,"var",varset([
  function(){
    var n=ri(40,80);
    return mcq("A vehicle airbag inflates when about "+n+" g of sodium azide, NaN\u2083, decomposes rapidly to form nitrogen gas, N\u2082. Which stoichiometric idea makes this design possible?","A known amount of reactant produces a predictable amount of gas, so the bag can be sized for the gas volume needed",["Any solid produces the same volume of gas when heated","The gas volume depends only on the size of the car","Decomposition reactions always produce exactly one litre of gas"],"The balanced equation fixes the mole ratio between sodium azide and nitrogen. Engineers use that ratio to choose the amount of sodium azide that will produce the volume of nitrogen needed to fill the bag.",{n:n});
  },
  function(){
    var d=pick(["300","500","1000"]);
    return mcq("An antacid tablet containing "+d+" mg of a base is dosed to neutralize excess stomach acid, HCl. Which stoichiometric idea sets the dose?","The base neutralizes acid in a fixed mole ratio, so the dose is matched to the amount of acid",["A larger tablet always neutralizes acid faster regardless of amount","The dose depends only on the colour of the tablet","Acid disappears on its own once any solid is swallowed"],"Neutralization follows the mole ratio in the balanced equation. The amount of base in the tablet is chosen so its moles match the moles of acid it is meant to neutralize.",{dose:d});
  },
  function(){
    var v=ri(10,90);
    return mcq("A baker finds that "+v+" g of baking soda in a recipe produces just the right rise. Baking soda releases carbon dioxide gas when heated and when it meets acid in the batter. Which stoichiometric idea is at work?","The amount of gas produced is proportional to the amount of baking soda used, through the mole ratio",["Baking soda produces gas in random amounts each time","The rise depends only on the oven temperature","More baking soda always gives a better loaf with no limit"],"The equation links moles of baking soda to moles of carbon dioxide. Doubling the baking soda doubles the gas available, so the recipe amount is set by that proportional relationship.",{v:v});
  },
  function(){
    var pct=pick(["21","34","46"]);
    return mcq("A fertilizer bag is labelled "+pct+" percent nitrogen by mass. Which stoichiometric idea connects the label to the fertilizer formula?","The mass fraction of nitrogen is found from the molar mass of the compound and the mass of nitrogen in one formula unit",["Every fertilizer contains the same percent nitrogen","The percent depends only on the mass of the bag","Nitrogen content cannot be calculated from a formula"],"The molar mass of the fertilizer compound sets the whole, and the nitrogen atoms in the formula set the part. Their ratio gives the percent nitrogen printed on the label.",{pct:pct});
  },
  function(){
    var v=ri(100,900);
    return mcq("A water treatment plant adds a measured dose of lime to "+v+" L batches of water to precipitate dissolved calcium ions as calcium carbonate. Which stoichiometric idea sets the dose?","The precipitating agent is dosed in proportion to the amount of calcium present, using the mole ratio",["Lime removes calcium no matter how little is added","The dose depends only on the colour of the water","Precipitation removes all ions in equal masses"],"Precipitation follows the mole ratio between lime and calcium ions. The dose is calculated from the amount of calcium to be removed, not guessed.",{v:v});
  }
]));

E("u1-510-antacid-calculation",1,["5.10"],2,"gen",function(){
  var branches=[
    {eq:"CaCO\u2083 + 2HCl \u2192 CaCl\u2082 + H\u2082O + CO\u2082",f:"CaCO\u2083",m:CHEM_AM.Ca+CHEM_AM.C+3*CHEM_AM.O,ratio:2},
    {eq:"Mg(OH)\u2082 + 2HCl \u2192 MgCl\u2082 + 2H\u2082O",f:"Mg(OH)\u2082",m:CHEM_AM.Mg+2*(CHEM_AM.O+CHEM_AM.H),ratio:2},
    {eq:"Al(OH)\u2083 + 3HCl \u2192 AlCl\u2083 + 3H\u2082O",f:"Al(OH)\u2083",m:CHEM_AM.Al+3*(CHEM_AM.O+CHEM_AM.H),ratio:3}
  ];
  var b=pick(branches),mass=ri(20,300)/100,conc=pick([0.05,0.10,0.16]);
  var nAnt=sfR(mass/b.m,4),nHCl=sfR(nAnt*b.ratio,4),vL=sfR(nHCl/conc,4),ans=sfR(vL*1000,3);
  return numq("An antacid tablet contains "+gF(mass)+" g of "+b.f+", which neutralizes stomach acid (HCl) by the reaction "+b.eq+". What volume of "+F3(conc)+" mol/L HCl can the tablet neutralize? Give your answer in mL.",ans,Math.max(1,ans*0.02),"Change the mass of antacid to moles: "+gF(mass)+" g / "+fmtF(b.m,2)+" g/mol = "+iF(nAnt)+" mol. Apply the mole ratio: "+iF(nAnt)+" \u00D7 "+b.ratio+" = "+iF(nHCl)+" mol of HCl. Change moles to volume with V = n / c: "+iF(nHCl)+" mol / "+F3(conc)+" mol/L = "+iF(vL)+" L = <b>"+F3(ans)+" mL</b>.",{cp:b.f,mass:mass,conc:conc});
});

E("u1-510-airbag-and-fertilizer",1,["5.10"],2,"gen",function(){
  if(pick(["airbag","fertilizer"])==="airbag"){
    var mNaN3=CHEM_AM.Na+3*CHEM_AM.N,mass=ri(20,120),n=sfR(mass/mNaN3,4),nN2=sfR(n*3/2,4),ans=sfR(nN2*22.4,3);
    return numq("A vehicle airbag contains "+mass+" g of sodium azide, NaN\u2083, which decomposes by the reaction 2NaN\u2083 \u2192 2Na + 3N\u2082. What volume of nitrogen gas at STP does the airbag produce? Give your answer in L (the molar mass of NaN\u2083 is "+fmtF(mNaN3,2)+" g/mol).",ans,Math.max(0.05,ans*0.02),"Change the mass to moles: "+mass+" g / "+fmtF(mNaN3,2)+" g/mol = "+iF(n)+" mol of NaN\u2083. Apply the mole ratio: "+iF(n)+" \u00D7 (3 / 2) = "+iF(nN2)+" mol of N\u2082. Change to volume at STP: "+iF(nN2)+" \u00D7 22.4 L/mol = <b>"+F3(ans)+" L</b>.",{mass:mass});
  }
  var ferts=[{f:"urea, CO(NH\u2082)\u2082",m:CHEM_AM.C+CHEM_AM.O+2*(CHEM_AM.N+2*CHEM_AM.H),nMass:2*CHEM_AM.N},{f:"ammonium nitrate, NH\u2084NO\u2083",m:2*CHEM_AM.N+4*CHEM_AM.H+3*CHEM_AM.O,nMass:2*CHEM_AM.N},{f:"ammonium sulfate, (NH\u2084)\u2082SO\u2084",m:2*CHEM_AM.N+8*CHEM_AM.H+CHEM_AM.S+4*CHEM_AM.O,nMass:2*CHEM_AM.N}];
  var f=pick(ferts),bag=pick([10,20,25,40]),frac=sfR(f.nMass/f.m,4),ans=sfR(bag*frac,3);
  return numq("A "+bag+" kg bag of fertilizer is pure "+f.f+". What mass of nitrogen does the bag contain? Give your answer in kg (the molar mass of the fertilizer is "+fmtF(f.m,2)+" g/mol, and each formula unit contains "+fmtF(f.nMass,2)+" g of nitrogen per mole).",ans,Math.max(0.02,ans*0.02),"The fraction of nitrogen by mass is "+fmtF(f.nMass,2)+" / "+fmtF(f.m,2)+" = "+iF(frac)+". Multiply by the mass of the bag: "+bag+" kg \u00D7 "+iF(frac)+" = <b>"+F3(ans)+" kg</b> of nitrogen.",{fert:f.f,bag:bag});
});

E("u1-510-application-reasoning",1,["5.10"],2,"var",varset([
  function(){
    var v=ri(200,800);
    return mcq("A treatment plant must remove dissolved calcium ions from "+v+" L of water by precipitation. What should the operator calculate first to set the lime dose?","The moles of calcium present, so the lime can be matched to it by the mole ratio",["The colour change expected when lime is added","The mass of the empty dosing tank","The time of day the dose will be added"],"Dosing is a stoichiometric calculation. The amount of calcium, in moles, comes first, and the mole ratio from the precipitation equation then gives the amount of lime required.",{v:v});
  },
  function(){
    var target=pick(["40","60","80"]);
    return mcq("An airbag designer needs the bag to fill with "+target+" L of nitrogen gas at STP. Which calculation gives the mass of sodium azide to load?","Convert the target gas volume to moles, use the mole ratio to get moles of sodium azide, then convert to mass",["Multiply the gas volume by the density of the fabric","Use the same mass as the volume number, in grams","Double the mass used in the smallest airbag tested"],"The design runs the stoichiometric chain in reverse: volume of gas to moles of gas, mole ratio to moles of reactant, and molar mass to the mass that must be loaded.",{target:target});
  },
  function(){
    var tabs=ri(2,6);
    return mcq("A patient is told to take "+tabs+" antacid tablets, each with the same mass of active base, instead of one. In stoichiometric terms, what does taking "+tabs+" tablets change?","It multiplies the moles of base available to neutralize acid by "+tabs,["It changes the mole ratio of the neutralization reaction","It makes each mole of base neutralize more acid","It removes the need for a balanced equation"],"The equation and its mole ratio do not change. More tablets simply supply proportionally more moles of base, so proportionally more moles of acid can be neutralized.",{tabs:tabs});
  },
  function(){
    var field=ri(2,20);
    return mcq("A farmer spreads fertilizer over a "+field+" hectare field and wants each hectare to receive the same mass of nitrogen. Two fertilizers have different percent nitrogen values. What must the farmer do?","Apply a larger mass of the fertilizer with the lower percent nitrogen",["Apply equal masses of both fertilizers","Apply a larger mass of the fertilizer with the higher percent nitrogen","Ignore the percent values and judge by bag size"],"The target is a fixed mass of nitrogen per hectare. A fertilizer with a lower nitrogen fraction must be applied in greater mass to deliver the same amount of nitrogen.",{field:field});
  },
  function(){
    var batch=ri(50,300);
    return mcq("A bakery scales a muffin recipe from a small test batch to a "+batch+" muffin production run. The baking soda amount is scaled in direct proportion to the other ingredients. Why does this work?","The gas produced scales with the amount of baking soda, keeping the gas per muffin the same",["Proportional scaling changes the mole ratio of the reaction","Large batches need no gas to rise","The oven produces the gas, not the baking soda"],"Each muffin needs the same amount of carbon dioxide. Because gas produced is proportional to baking soda used, scaling all ingredients by the same factor keeps the gas per muffin constant.",{batch:batch});
  }
]));

/* ----- bank-u2.js ----- */
// Chemistry 2202 Unit 2 bank: From Structures to Properties.
// Phase C diagram figures (Nov 2026): u2-03 and u2-07 attach an original
// Lewis structure figure (chemLewisFigure in bank-helpers.js) for every
// drawn molecule except sulfur dioxide and sulfur trioxide, whose
// resonance depiction is left for the SME pass; one u2-35 variant (the
// stem that says a diagram shows a shifted ionic lattice layer) attaches
// the generic shifted lattice figure. No other Unit 2 entry carries a
// figure: the remaining stems either state their structure in full in
// words or ask for a prediction, so no source diagram is missing.
// CRMARKS: u2-02=2
// CRMARKS: u2-03=3
// CRMARKS: u2-07=2
// CRMARKS: u2-08=2
// CRMARKS: u2-23=2
// CRMARKS: u2-26=3
// CRMARKS: u2-27=2
// CRMARKS: u2-29=2
// CRMARKS: u2-51=2
// CRMARKS: u2-52=2
// CRMARKS: u2-53=3

// 6.1 Formation of covalent bonds
E("u2-01", 2, ["6.1"], 1, "gen", function () {
  var ex = [
    { m: "H₂", b: "H-H", t: "single", p: 1 }, { m: "Cl₂", b: "Cl-Cl", t: "single", p: 1 },
    { m: "Br₂", b: "Br-Br", t: "single", p: 1 }, { m: "F₂", b: "F-F", t: "single", p: 1 },
    { m: "HCl", b: "H-Cl", t: "single", p: 1 }, { m: "H₂O", b: "O-H", t: "single", p: 1 },
    { m: "NH₃", b: "N-H", t: "single", p: 1 }, { m: "CH₄", b: "C-H", t: "single", p: 1 },
    { m: "O₂", b: "O=O", t: "double", p: 2 }, { m: "CO₂", b: "C=O", t: "double", p: 2 },
    { m: "C₂H₄", b: "C=C", t: "double", p: 2 }, { m: "SO₂", b: "S=O", t: "double", p: 2 },
    { m: "CH₂O", b: "C=O", t: "double", p: 2 }, { m: "CS₂", b: "C=S", t: "double", p: 2 },
    { m: "N₂", b: "N≡N", t: "triple", p: 3 }, { m: "C₂H₂", b: "C≡C", t: "triple", p: 3 },
    { m: "HCN", b: "C≡N", t: "triple", p: 3 }, { m: "CO", b: "C≡O", t: "triple", p: 3 }
  ];
  var e = pick(ex), q = pick([0, 1, 2]), ans, prompt;
  if (q === 0) { ans = e.p; prompt = "In the " + e.b + " bond in " + e.m + ", how many pairs of electrons are shared between the two atoms?"; }
  else if (q === 1) { ans = 2 * e.p; prompt = "In the " + e.b + " bond in " + e.m + ", how many electrons are shared between the two atoms in total?"; }
  else { ans = e.p; prompt = "The " + e.b + " bond in " + e.m + " is a " + e.t + " bond. What is its bond order?"; }
  var ds = [], offs = [1, -1, 2, 3], oi = 0;
  while (ds.length < 3 && oi < offs.length) { var v = ans + offs[oi++]; if (v >= 0 && v !== ans && ds.indexOf(String(v)) < 0) ds.push(String(v)); }
  return mcq(prompt, String(ans), ds, "A single bond shares 1 pair of electrons, a double bond shares 2 pairs and a triple bond shares 3 pairs. Each shared pair contains 2 electrons, and the bond order equals the number of shared pairs. The bond shown is a " + e.t + " bond, so the answer is " + ans + ".", { mol: e.m, bond: e.t, ask: q });
});

E("u2-02", 2, ["6.1"], 2, "gen", function () {
  var ms = [
    { f: "H₂O", v: 8 }, { f: "NH₃", v: 8 }, { f: "CH₄", v: 8 }, { f: "CO₂", v: 16 },
    { f: "BF₃", v: 24 }, { f: "PCl₃", v: 26 }, { f: "H₂S", v: 8 }, { f: "BeCl₂", v: 16 },
    { f: "HCl", v: 8 }, { f: "F₂", v: 14 }, { f: "O₂", v: 12 }, { f: "N₂", v: 10 },
    { f: "CH₂O", v: 12 }, { f: "CCl₄", v: 32 }, { f: "SO₂", v: 18 }, { f: "NF₃", v: 26 }
  ];
  var m = pick(ms), k = pick([1, 2, 3, 4, 5]), ans = m.v * k;
  return numq("How many valence electrons are there in total in " + k + (k === 1 ? " molecule" : " molecules") + " of " + m.f + "? Give the number of electrons.", ans, 0.1, "Add the valence electrons of every atom in one molecule of " + m.f + ", counting each atom once for every time it appears in the formula. One molecule has " + m.v + " valence electrons. For " + k + (k === 1 ? " molecule" : " molecules") + " the total is " + m.v + " x " + k + " = " + ans + " electrons.", { mol: m.f, k: k });
});

E("u2-03", 2, ["6.1"], 2, "gen", function () {
  var ms = [
    { f: "H₂O", bp: 2 }, { f: "NH₃", bp: 3 }, { f: "CH₄", bp: 4 }, { f: "CO₂", bp: 4 },
    { f: "BF₃", bp: 3 }, { f: "PCl₃", bp: 3 }, { f: "H₂S", bp: 2 }, { f: "BeCl₂", bp: 2 },
    { f: "HCl", bp: 1 }, { f: "F₂", bp: 1 }, { f: "O₂", bp: 2 }, { f: "N₂", bp: 3 },
    { f: "CH₂O", bp: 4 }, { f: "CCl₄", bp: 4 }, { f: "SO₂", bp: 3 }, { f: "NF₃", bp: 3 }
  ];
  var m = pick(ms), k = pick([1, 2, 3, 4, 5]), mode = pick([0, 1]), ans = mode === 0 ? m.bp * k : 2 * m.bp * k;
  var prompt = mode === 0
    ? "Using the usual Lewis structure of " + m.f + ", how many bonding pairs of electrons are there in total in " + k + (k === 1 ? " molecule" : " molecules") + " of the substance? Count a double bond as 2 bonding pairs and a triple bond as 3 bonding pairs."
    : "Using the usual Lewis structure of " + m.f + ", how many bonding electrons are there in total in " + k + (k === 1 ? " molecule" : " molecules") + " of the substance? Count a double bond as 4 bonding electrons and a triple bond as 6 bonding electrons.";
  var q = numq(prompt, ans, 0.1, "In the Lewis structure of " + m.f + " the bonds contain " + m.bp + " bonding pairs in one molecule, and each pair holds 2 electrons. " + (mode === 0 ? "For " + k + (k === 1 ? " molecule" : " molecules") + " the total is " + m.bp + " x " + k + " = " + ans + " bonding pairs." : "One molecule has 2 x " + m.bp + " = " + (2 * m.bp) + " bonding electrons, so " + k + (k === 1 ? " molecule has" : " molecules have") + " " + (2 * m.bp) + " x " + k + " = " + ans + " bonding electrons."), { mol: m.f, k: k, mode: mode });
  var lf = chemLewisFigure(m.f); if (lf) q.figure = lf;
  return q;
});

E("u2-04", 2, ["6.1"], 1, "gen", function () {
  var cs = [
    { a: "carbon", mol: "CH₄", cap: 4, val: 4 }, { a: "carbon", mol: "CO₂", cap: 4, val: 4 },
    { a: "carbon", mol: "CCl₄", cap: 4, val: 4 }, { a: "carbon", mol: "CH₂O", cap: 4, val: 4 },
    { a: "nitrogen", mol: "NH₃", cap: 3, val: 5 }, { a: "nitrogen", mol: "NF₃", cap: 3, val: 5 },
    { a: "nitrogen", mol: "NCl₃", cap: 3, val: 5 }, { a: "oxygen", mol: "H₂O", cap: 2, val: 6 },
    { a: "oxygen", mol: "CO₂", cap: 2, val: 6 }, { a: "oxygen", mol: "SO₂", cap: 2, val: 6 },
    { a: "hydrogen", mol: "H₂O", cap: 1, val: 1 }, { a: "hydrogen", mol: "CH₄", cap: 1, val: 1 },
    { a: "hydrogen", mol: "HCl", cap: 1, val: 1 }, { a: "fluorine", mol: "NF₃", cap: 1, val: 7 },
    { a: "fluorine", mol: "BF₃", cap: 1, val: 7 }, { a: "chlorine", mol: "PCl₃", cap: 1, val: 7 },
    { a: "chlorine", mol: "CCl₄", cap: 1, val: 7 }, { a: "boron", mol: "BF₃", cap: 3, val: 3 },
    { a: "sulfur", mol: "H₂S", cap: 2, val: 6 }, { a: "phosphorus", mol: "PCl₃", cap: 3, val: 5 },
    { a: "silicon", mol: "SiH₄", cap: 4, val: 4 }, { a: "silicon", mol: "SiCl₄", cap: 4, val: 4 },
    { a: "bromine", mol: "HBr", cap: 1, val: 7 }, { a: "oxygen", mol: "CH₂O", cap: 2, val: 6 }
  ];
  var c = pick(cs), q = pick([0, 1, 2]), ans, prompt;
  if (q === 0) { ans = c.cap; prompt = "In " + c.mol + ", how many covalent bonds does a neutral " + c.a + " atom typically form?"; }
  else if (q === 1) { ans = c.val; prompt = "How many valence electrons does a neutral " + c.a + " atom have, as used in the molecule " + c.mol + "?"; }
  else { ans = 2 * c.cap; prompt = "A neutral " + c.a + " atom in " + c.mol + " forms its usual number of covalent bonds. How many shared electrons take part in those bonds, counting 2 electrons for each bond formed by this atom?"; }
  var ds = [], offs = [1, -1, 2, -2, 3], oi = 0;
  while (ds.length < 3 && oi < offs.length) { var v = ans + offs[oi++]; if (v >= 0 && v !== ans && ds.indexOf(String(v)) < 0) ds.push(String(v)); }
  return mcq(prompt, String(ans), ds, "A neutral " + c.a + " atom has " + c.val + " valence electrons and typically forms " + c.cap + " covalent bond or bonds so that it reaches a stable outer shell. Each bond it forms contains 2 shared electrons, giving " + (2 * c.cap) + " shared electrons in its own bonds. The value asked for is " + ans + ".", { atom: c.a, mol: c.mol, ask: q });
});

E("u2-05", 2, ["6.1"], 2, "gen", function () {
  var ex = [
    { m: "H₂", b: "H-H", t: "single", p: 1 }, { m: "Cl₂", b: "Cl-Cl", t: "single", p: 1 },
    { m: "CH₄", b: "C-H", t: "single", p: 1 }, { m: "H₂O", b: "O-H", t: "single", p: 1 },
    { m: "Br₂", b: "Br-Br", t: "single", p: 1 }, { m: "NH₃", b: "N-H", t: "single", p: 1 },
    { m: "O₂", b: "O=O", t: "double", p: 2 }, { m: "CO₂", b: "C=O", t: "double", p: 2 },
    { m: "C₂H₄", b: "C=C", t: "double", p: 2 }, { m: "SO₂", b: "S=O", t: "double", p: 2 },
    { m: "CH₂O", b: "C=O", t: "double", p: 2 }, { m: "CS₂", b: "C=S", t: "double", p: 2 },
    { m: "N₂", b: "N≡N", t: "triple", p: 3 }, { m: "C₂H₂", b: "C≡C", t: "triple", p: 3 },
    { m: "HCN", b: "C≡N", t: "triple", p: 3 }, { m: "CO", b: "C≡O", t: "triple", p: 3 },
    { m: "F₂", b: "F-F", t: "single", p: 1 }, { m: "HBr", b: "H-Br", t: "single", p: 1 }
  ];
  var e = pick(ex), q = pick([0, 1, 2]);
  if (q === 2) {
    var correct = e.t === "single" ? "It is the weakest and longest of the three bond types between the same two atoms"
      : e.t === "double" ? "It is stronger and shorter than a single bond but weaker and longer than a triple bond between the same two atoms"
      : "It is the strongest and shortest of the three bond types between the same two atoms";
    var all = [
      "It is the weakest and longest of the three bond types between the same two atoms",
      "It is stronger and shorter than a single bond but weaker and longer than a triple bond between the same two atoms",
      "It is the strongest and shortest of the three bond types between the same two atoms",
      "Its strength and length are the same as every other bond type between the same two atoms"
    ];
    var ds = shuffle(all.filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("Consider the " + e.b + " bond in " + e.m + ", which is a " + e.t + " bond. Which statement about this bond is correct?", correct, ds, "Adding shared pairs pulls the two nuclei closer and holds them more strongly. A single bond has 1 shared pair, a double bond has 2 and a triple bond has 3, so going from single to double to triple the bond gets stronger and shorter. The bond in " + e.m + " is a " + e.t + " bond.", { mol: e.m, bond: e.t });
  }
  var ans = q === 0 ? e.p : 2 * e.p;
  var prompt = q === 0 ? "The " + e.b + " bond in " + e.m + " is a " + e.t + " bond. How many shared pairs does it contain?"
    : "The " + e.b + " bond in " + e.m + " is a " + e.t + " bond. How many shared electrons does it contain?";
  var ds2 = [], offs = [1, -1, 2, 3], oi = 0;
  while (ds2.length < 3 && oi < offs.length) { var v = ans + offs[oi++]; if (v >= 0 && v !== ans && ds2.indexOf(String(v)) < 0) ds2.push(String(v)); }
  return mcq(prompt, String(ans), ds2, "A single bond contains 1 shared pair, a double bond contains 2 shared pairs and a triple bond contains 3 shared pairs. Each pair is 2 electrons. The " + e.t + " bond in " + e.m + " therefore contains " + e.p + " shared pair or pairs, which is " + (2 * e.p) + " shared electrons.", { mol: e.m, bond: e.t, ask: q });
});

E("u2-06", 2, ["6.1"], 3, "gen", function () {
  var sc = [
    { m: "BF₃", c: "boron", n: 6, k: "an incomplete octet" }, { m: "BCl₃", c: "boron", n: 6, k: "an incomplete octet" },
    { m: "BeCl₂", c: "beryllium", n: 4, k: "an incomplete octet" }, { m: "BeH₂", c: "beryllium", n: 4, k: "an incomplete octet" },
    { m: "PCl₅", c: "phosphorus", n: 10, k: "an expanded octet" }, { m: "SF₆", c: "sulfur", n: 12, k: "an expanded octet" },
    { m: "SF₄", c: "sulfur", n: 10, k: "an expanded octet" }, { m: "PF₅", c: "phosphorus", n: 10, k: "an expanded octet" },
    { m: "ClF₃", c: "chlorine", n: 10, k: "an expanded octet" }, { m: "XeF₄", c: "xenon", n: 12, k: "an expanded octet" },
    { m: "H₂", c: "hydrogen", n: 2, k: "a duet" }, { m: "HCl", c: "hydrogen", n: 2, k: "a duet" },
    { m: "CH₄", c: "hydrogen", n: 2, k: "a duet" }, { m: "NO", c: "the molecule as a whole", n: 11, k: "an odd number of valence electrons" },
    { m: "NO₂", c: "the molecule as a whole", n: 17, k: "an odd number of valence electrons" }, { m: "ClO₂", c: "the molecule as a whole", n: 19, k: "an odd number of valence electrons" },
    { m: "H₂O", c: "oxygen", n: 8, k: "a complete octet" }, { m: "NH₃", c: "nitrogen", n: 8, k: "a complete octet" },
    { m: "BBr₃", c: "boron", n: 6, k: "an incomplete octet" }, { m: "BH₃", c: "boron", n: 6, k: "an incomplete octet" },
    { m: "AlCl₃", c: "aluminium", n: 6, k: "an incomplete octet" }, { m: "XeF₂", c: "xenon", n: 10, k: "an expanded octet" },
    { m: "BrF₅", c: "bromine", n: 12, k: "an expanded octet" }, { m: "ClO", c: "the molecule as a whole", n: 13, k: "an odd number of valence electrons" },
    { m: "H₂S", c: "sulfur", n: 8, k: "a complete octet" }, { m: "PH₃", c: "phosphorus", n: 8, k: "a complete octet" }
  ];
  var s = pick(sc), q = pick([0, 1]);
  if (q === 0) {
    var kinds = ["an incomplete octet", "an expanded octet", "a duet", "an odd number of valence electrons", "a complete octet"];
    var ds = shuffle(kinds.filter(function (x) { return x !== s.k; })).slice(0, 3);
    return mcq("In the usual Lewis structure of " + s.m + ", the central case to examine is " + s.c + ". How does this case relate to the octet rule?", s.k, ds, "Count the electrons around the atom named, or count the total valence electrons when the molecule itself is named. In " + s.m + " the count is " + s.n + ", which is described as " + s.k + ". Most atoms in this course follow the octet rule, but incomplete octets, expanded octets, duets for hydrogen and odd electron molecules are recognised exceptions or special cases.", { mol: s.m, kind: s.k });
  }
  var ds2 = [], offs = [2, -2, 4, -4, 1], oi = 0;
  while (ds2.length < 3 && oi < offs.length) { var v = s.n + offs[oi++]; if (v > 0 && v !== s.n && ds2.indexOf(String(v)) < 0) ds2.push(String(v)); }
  return mcq("In the usual Lewis structure of " + s.m + ", how many electrons are counted for " + s.c + " in the statement of its octet rule case?", String(s.n), ds2, "Draw or recall the Lewis structure of " + s.m + " and count every bonding pair and lone pair electron assigned to " + s.c + ". The count is " + s.n + ", which corresponds to " + s.k + ".", { mol: s.m, n: s.n });
});

// 6.2 Structural model of a molecular substance: electron pairs
E("u2-07", 2, ["6.2"], 2, "gen", function () {
  var ms = [
    { f: "H₂O", bp: 2, lp: 2 }, { f: "NH₃", bp: 3, lp: 1 }, { f: "CH₄", bp: 4, lp: 0 },
    { f: "CO₂", bp: 4, lp: 0 }, { f: "BF₃", bp: 3, lp: 0 }, { f: "PCl₃", bp: 3, lp: 1 },
    { f: "H₂S", bp: 2, lp: 2 }, { f: "BeCl₂", bp: 2, lp: 0 }, { f: "SO₃", bp: 4, lp: 0 },
    { f: "CCl₄", bp: 4, lp: 0 }, { f: "CH₂O", bp: 4, lp: 0 }, { f: "NH₄⁺", bp: 4, lp: 0 },
    { f: "H₃O⁺", bp: 3, lp: 1 }
  ];
  var m = pick(ms), k = pick([1, 2, 3, 4]), q = pick([0, 1, 2]);
  var per = q === 0 ? m.bp : q === 1 ? m.lp : m.bp + m.lp, ans = per * k;
  var what = q === 0 ? "bonding pairs on the central atom" : q === 1 ? "lone pairs on the central atom" : "electron pairs in total on the central atom, bonding pairs and lone pairs together";
  var qq = numq("For " + k + (k === 1 ? " molecule or ion" : " molecules or ions") + " of " + m.f + ", how many " + what + " are there in total? Count each double bond as 2 bonding pairs.", ans, 0.1, "On the central atom of " + m.f + " there are " + m.bp + " bonding pairs and " + m.lp + " lone pairs, so the count asked for in one particle is " + per + ". Multiplying by " + k + " gives " + per + " x " + k + " = " + ans + ".", { mol: m.f, k: k, ask: q });
  var lf = chemLewisFigure(m.f); if (lf) qq.figure = lf;
  return qq;
});

E("u2-08", 2, ["6.2"], 2, "gen", function () {
  var names = { "linear": ["linear"], "trigonal planar": ["trigonal planar"], "tetrahedral": ["tetrahedral"], "bent": ["bent", "angular"], "trigonal pyramidal": ["trigonal pyramidal", "pyramidal"], "trigonal bipyramidal": ["trigonal bipyramidal"] };
  var geoOf = function (r) { return r === 2 ? "linear" : r === 3 ? "trigonal planar" : r === 4 ? "tetrahedral" : "trigonal bipyramidal"; };
  var shapeOf = function (r, lp) {
    if (r === 2) return "linear"; if (r === 3) return lp === 0 ? "trigonal planar" : "bent";
    if (r === 4) return lp === 0 ? "tetrahedral" : lp === 1 ? "trigonal pyramidal" : "bent";
    return "trigonal bipyramidal";
  };
  var askGeo = pick([true, false]);
  if (pick([0, 1]) === 0) {
    var ms = [
      { f: "H₂O", br: 2, lp: 2 }, { f: "NH₃", br: 3, lp: 1 }, { f: "CH₄", br: 4, lp: 0 },
      { f: "CO₂", br: 2, lp: 0 }, { f: "BF₃", br: 3, lp: 0 }, { f: "PCl₃", br: 3, lp: 1 },
      { f: "H₂S", br: 2, lp: 2 }, { f: "BeCl₂", br: 2, lp: 0 }, { f: "SO₂", br: 2, lp: 1 },
      { f: "SO₃", br: 3, lp: 0 }, { f: "CH₂O", br: 3, lp: 0 }, { f: "CCl₄", br: 4, lp: 0 },
      { f: "NH₄⁺", br: 4, lp: 0 }, { f: "H₃O⁺", br: 3, lp: 1 }, { f: "CO₃²⁻", br: 3, lp: 0 },
      { f: "SiH₄", br: 4, lp: 0 }, { f: "PH₃", br: 3, lp: 1 }, { f: "SCl₂", br: 2, lp: 2 },
      { f: "AlCl₃", br: 3, lp: 0 }, { f: "CHCl₃", br: 4, lp: 0 }
    ];
    var m = pick(ms), r = m.br + m.lp;
    var ans = askGeo ? geoOf(r) : shapeOf(m.br, m.lp);
    var prompt = askGeo ? "What is the electron pair geometry of " + m.f + "? Give the name only."
      : "What is the molecular shape of " + m.f + "? Give the name only.";
    return textq(prompt, names[ans], "The central atom of " + m.f + " has " + m.br + " bonding regions and " + m.lp + " lone pair or pairs, giving " + r + " electron regions in total. The electron pair geometry for " + r + " regions is " + geoOf(r) + ". Ignoring the lone pairs and looking only at the atoms gives the shape " + shapeOf(m.br, m.lp) + ". The name asked for is " + ans + ".", { mol: m.f, geo: askGeo });
  }
  var combos = [[2, 0], [3, 0], [3, 1], [4, 0], [4, 1], [4, 2], [5, 0]];
  var c = pick(combos), br = c[0], lp = c[1], rr = br + lp;
  var ans2 = askGeo ? geoOf(rr) : shapeOf(br, lp);
  var prompt2 = "A central atom has " + br + " bonding regions and " + lp + " lone pair or pairs. " + (askGeo ? "What is its electron pair geometry? Give the name only." : "What is the molecular shape around it? Give the name only.");
  return textq(prompt2, names[ans2], "The total number of electron regions is " + br + " + " + lp + " = " + rr + ", so the electron pair geometry is " + geoOf(rr) + ". The shape is found from the positions of the atoms only, with lone pairs left out of the name, which gives " + shapeOf(br, lp) + ". The name asked for is " + ans2 + ".", { br: br, lp: lp, geo: askGeo });
});

E("u2-09", 2, ["6.2"], 1, "gen", function () {
  var ms = [
    { f: "H₂O", br: 2, lp: 2 }, { f: "NH₃", br: 3, lp: 1 }, { f: "CH₄", br: 4, lp: 0 },
    { f: "CO₂", br: 2, lp: 0 }, { f: "BF₃", br: 3, lp: 0 }, { f: "PCl₃", br: 3, lp: 1 },
    { f: "H₂S", br: 2, lp: 2 }, { f: "BeCl₂", br: 2, lp: 0 }, { f: "SO₂", br: 2, lp: 1 },
    { f: "SO₃", br: 3, lp: 0 }, { f: "CH₂O", br: 3, lp: 0 }, { f: "CCl₄", br: 4, lp: 0 },
    { f: "NH₄⁺", br: 4, lp: 0 }, { f: "H₃O⁺", br: 3, lp: 1 }, { f: "CO₃²⁻", br: 3, lp: 0 },
    { f: "SiH₄", br: 4, lp: 0 }, { f: "PH₃", br: 3, lp: 1 }, { f: "SCl₂", br: 2, lp: 2 },
    { f: "AlCl₃", br: 3, lp: 0 }, { f: "CHCl₃", br: 4, lp: 0 }
  ];
  var m = pick(ms), q = pick([0, 1, 2]);
  var ans = q === 0 ? m.br + m.lp : q === 1 ? m.br : m.lp;
  var what = q === 0 ? "steric number of the central atom" : q === 1 ? "number of bonding regions on the central atom" : "number of lone pairs on the central atom";
  var ds = [], offs = [1, -1, 2, 3], oi = 0;
  while (ds.length < 3 && oi < offs.length) { var v = ans + offs[oi++]; if (v >= 0 && v !== ans && ds.indexOf(String(v)) < 0) ds.push(String(v)); }
  return mcq("For " + m.f + ", what is the " + what + "? Count a double bond as one bonding region.", String(ans), ds, "The central atom of " + m.f + " has " + m.br + " bonding regions and " + m.lp + " lone pair or pairs. The steric number is bonding regions plus lone pairs, which is " + m.br + " + " + m.lp + " = " + (m.br + m.lp) + ". The value asked for is " + ans + ".", { mol: m.f, ask: q });
});

E("u2-10", 2, ["6.2"], 2, "gen", function () {
  var ms = [
    { f: "H₂O", g: "tetrahedral", s: "bent" }, { f: "NH₃", g: "tetrahedral", s: "trigonal pyramidal" },
    { f: "CH₄", g: "tetrahedral", s: "tetrahedral" }, { f: "CO₂", g: "linear", s: "linear" },
    { f: "BF₃", g: "trigonal planar", s: "trigonal planar" }, { f: "PCl₃", g: "tetrahedral", s: "trigonal pyramidal" },
    { f: "H₂S", g: "tetrahedral", s: "bent" }, { f: "BeCl₂", g: "linear", s: "linear" },
    { f: "SO₂", g: "trigonal planar", s: "bent" }, { f: "SO₃", g: "trigonal planar", s: "trigonal planar" },
    { f: "CH₂O", g: "trigonal planar", s: "trigonal planar" }, { f: "CCl₄", g: "tetrahedral", s: "tetrahedral" },
    { f: "NH₄⁺", g: "tetrahedral", s: "tetrahedral" }, { f: "H₃O⁺", g: "tetrahedral", s: "trigonal pyramidal" },
    { f: "SiH₄", g: "tetrahedral", s: "tetrahedral" }, { f: "PH₃", g: "tetrahedral", s: "trigonal pyramidal" },
    { f: "SCl₂", g: "tetrahedral", s: "bent" }, { f: "CHCl₃", g: "tetrahedral", s: "tetrahedral" },
    { f: "H₂Se", g: "tetrahedral", s: "bent" }, { f: "OF₂", g: "tetrahedral", s: "bent" },
    { f: "NF₃", g: "tetrahedral", s: "trigonal pyramidal" }, { f: "CH₂Cl₂", g: "tetrahedral", s: "tetrahedral" },
    { f: "SO₃²⁻", g: "tetrahedral", s: "trigonal pyramidal" }, { f: "ClO₃⁻", g: "tetrahedral", s: "trigonal pyramidal" },
    { f: "BF₄⁻", g: "tetrahedral", s: "tetrahedral" }, { f: "CO₃²⁻", g: "trigonal planar", s: "trigonal planar" }
  ];
  var allNames = ["linear", "trigonal planar", "tetrahedral", "bent", "trigonal pyramidal", "trigonal bipyramidal"];
  var m = pick(ms), q = pick([0, 1, 2]);
  if (q === 2 && m.g !== m.s) {
    var correct = "The electron pair geometry is " + m.g + " and the molecular shape is " + m.s;
    var cand = [
      "The electron pair geometry is " + m.s + " and the molecular shape is " + m.g,
      "The electron pair geometry is " + m.g + " and the molecular shape is " + m.g,
      "The electron pair geometry is " + m.s + " and the molecular shape is " + m.s,
      "The electron pair geometry and the molecular shape are both found by ignoring all lone pairs"
    ];
    var ds = shuffle(cand.filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("Which statement correctly distinguishes the two descriptions for " + m.f + "?", correct, ds, "Electron pair geometry counts every electron region around the central atom, including lone pairs. Molecular shape describes only where the atoms sit, so lone pairs change the shape name without being part of it. For " + m.f + " the geometry is " + m.g + " and the shape is " + m.s + ".", { mol: m.f });
  }
  var ans = q === 0 ? m.g : m.s;
  var ds2 = shuffle(allNames.filter(function (x) { return x !== ans; })).slice(0, 3);
  var prompt = q === 0 ? "What is the electron pair geometry of " + m.f + "?" : "What is the molecular shape of " + m.f + "?";
  return mcq(prompt, ans, ds2, "Count all electron regions on the central atom of " + m.f + ", including lone pairs, to get the electron pair geometry, which is " + m.g + ". Then describe only the positions of the atoms to get the molecular shape, which is " + m.s + ". The description asked for is " + ans + ".", { mol: m.f, ask: q });
});

E("u2-11", 2, ["6.2"], 3, "gen", function () {
  var ms = [
    { f: "SiH₄", br: 4, lp: 0, g: "tetrahedral", s: "tetrahedral" }, { f: "GeH₄", br: 4, lp: 0, g: "tetrahedral", s: "tetrahedral" },
    { f: "PH₃", br: 3, lp: 1, g: "tetrahedral", s: "trigonal pyramidal" }, { f: "AsH₃", br: 3, lp: 1, g: "tetrahedral", s: "trigonal pyramidal" },
    { f: "SCl₂", br: 2, lp: 2, g: "tetrahedral", s: "bent" }, { f: "SeH₂", br: 2, lp: 2, g: "tetrahedral", s: "bent" },
    { f: "OCl₂", br: 2, lp: 2, g: "tetrahedral", s: "bent" }, { f: "AlBr₃", br: 3, lp: 0, g: "trigonal planar", s: "trigonal planar" },
    { f: "GaCl₃", br: 3, lp: 0, g: "trigonal planar", s: "trigonal planar" }, { f: "SiCl₄", br: 4, lp: 0, g: "tetrahedral", s: "tetrahedral" },
    { f: "CBr₄", br: 4, lp: 0, g: "tetrahedral", s: "tetrahedral" }, { f: "NCl₃", br: 3, lp: 1, g: "tetrahedral", s: "trigonal pyramidal" },
    { f: "BH₃", br: 3, lp: 0, g: "trigonal planar", s: "trigonal planar" }, { f: "SnCl₂", br: 2, lp: 1, g: "trigonal planar", s: "bent" },
    { f: "TeH₂", br: 2, lp: 2, g: "tetrahedral", s: "bent" }, { f: "CF₄", br: 4, lp: 0, g: "tetrahedral", s: "tetrahedral" },
    { f: "SbH₃", br: 3, lp: 1, g: "tetrahedral", s: "trigonal pyramidal" }, { f: "InCl₃", br: 3, lp: 0, g: "trigonal planar", s: "trigonal planar" }
  ];
  var allNames = ["linear", "trigonal planar", "tetrahedral", "bent", "trigonal pyramidal", "trigonal bipyramidal"];
  var m = pick(ms), q = pick([0, 1, 2]);
  if (q === 2) {
    var ans = m.br + m.lp, ds = [], offs = [1, -1, 2, 3], oi = 0;
    while (ds.length < 3 && oi < offs.length) { var v = ans + offs[oi++]; if (v >= 0 && v !== ans && ds.indexOf(String(v)) < 0) ds.push(String(v)); }
    return mcq("Predict the steric number of the central atom in " + m.f + ", a molecule you may not have studied directly. Count a multiple bond as one region.", String(ans), ds, "The central atom of " + m.f + " is in the same family pattern as the familiar examples: it has " + m.br + " bonding regions and " + m.lp + " lone pair or pairs. The steric number is " + m.br + " + " + m.lp + " = " + ans + ", which then predicts its geometry and shape.", { mol: m.f });
  }
  var ans2 = q === 0 ? m.s : m.g;
  var ds2 = shuffle(allNames.filter(function (x) { return x !== ans2; })).slice(0, 3);
  var prompt = q === 0 ? "Predict the molecular shape of " + m.f + ", a molecule you may not have studied directly." : "Predict the electron pair geometry of " + m.f + ", a molecule you may not have studied directly.";
  return mcq(prompt, ans2, ds2, "Transfer the model from familiar molecules with the same central atom pattern. The central atom of " + m.f + " has " + m.br + " bonding regions and " + m.lp + " lone pair or pairs. Its electron pair geometry is " + m.g + " and, looking only at the atoms, its shape is " + m.s + ". The description asked for is " + ans2 + ".", { mol: m.f, ask: q });
});

// 6.3 Hydrogen bonds and van der Waals forces
E("u2-12", 2, ["6.3"], 1, "gen", function () {
  var donors = [
    { f: "H₂O", el: "oxygen" }, { f: "HF", el: "fluorine" }, { f: "NH₃", el: "nitrogen" },
    { f: "CH₃OH", el: "oxygen" }, { f: "CH₃NH₂", el: "nitrogen" }, { f: "CH₃CH₂OH", el: "oxygen" },
    { f: "H₂O₂", el: "oxygen" }, { f: "CH₃CH₂NH₂", el: "nitrogen" }, { f: "HOCH₂CH₂OH", el: "oxygen" },
    { f: "NH₂CH₃", el: "nitrogen" }
  ];
  var nons = ["CH₄", "H₂S", "PH₃", "HCl", "CO₂", "SiH₄", "CH₃F", "H₂Se", "C₂H₆", "BF₃"];
  var d = pick(donors), n = pick(nons);
  var correct = d.f + " has a hydrogen atom bonded directly to " + d.el + ", a small and highly electronegative atom, so its molecules can form hydrogen bonds";
  var ds = shuffle([
    n + " has a hydrogen atom bonded directly to a highly electronegative atom, so its molecules can form hydrogen bonds",
    "Both substances form hydrogen bonds because every molecule that contains hydrogen can form them",
    "Neither substance forms hydrogen bonds because hydrogen bonding needs a metal atom to be present",
    d.f + " forms hydrogen bonds because it contains the heaviest atoms of the two substances"
  ].filter(function (x) { return x !== correct; })).slice(0, 3);
  return mcq("Which statement correctly explains the difference in hydrogen bonding between " + d.f + " and " + n + "?", correct, ds, "A hydrogen bond forms when a hydrogen atom bonded to nitrogen, oxygen or fluorine is attracted to a lone pair on nitrogen, oxygen or fluorine in a nearby molecule. In " + d.f + " the hydrogen is bonded to " + d.el + ", which meets the condition. In " + n + " no hydrogen is bonded to nitrogen, oxygen or fluorine, so ordinary hydrogen bonding between its molecules does not occur.", { donor: d.f, other: n });
});

E("u2-13", 2, ["6.3"], 2, "gen", function () {
  var yes = ["H₂O", "HF", "NH₃", "CH₃OH", "CH₃NH₂", "CH₃CH₂OH", "H₂O₂", "CH₃CH₂NH₂", "HOCH₂CH₂OH", "NH₂OH"];
  var no = ["CH₄", "CO₂", "H₂S", "PH₃", "SiH₄", "CCl₄", "O₂", "N₂", "C₂H₆", "BF₃", "SO₂", "CH₃F", "H₂Se", "C₃H₈"];
  var ctx = pick(["in the pure liquid", "as a pure substance", "between its own molecules", "in a sample of the pure compound"]);
  if (pick([true, false])) {
    var c = pick(yes), ds = shuffle(no.slice()).slice(0, 3);
    return mcq("Which substance forms hydrogen bonds " + ctx + "?", c, ds, "Hydrogen bonds form between molecules when a hydrogen atom is bonded to nitrogen, oxygen or fluorine and is attracted to a lone pair on nitrogen, oxygen or fluorine nearby. Of the choices, only " + c + " has hydrogen bonded to nitrogen, oxygen or fluorine. The other substances have no such bond, so they rely on weaker attractions between their molecules.", { substance: c });
  }
  var c2 = pick(no), ds2 = shuffle(yes.slice()).slice(0, 3);
  return mcq("Which substance does NOT form hydrogen bonds " + ctx + "?", c2, ds2, "Hydrogen bonds need a hydrogen atom bonded to nitrogen, oxygen or fluorine. Every other choice has such a bond, so each of them forms hydrogen bonds between its molecules. " + c2 + " has no hydrogen bonded to nitrogen, oxygen or fluorine, so its molecules are held only by weaker attractions.", { substance: c2 });
});

E("u2-14", 2, ["6.3"], 2, "gen", function () {
  var sets = [
    { a: "solid NaCl, held by ionic attractions", b: "liquid H₂O, held in part by hydrogen bonds", c: "solid CH₄, held by London dispersion forces" },
    { a: "molten KBr, held by ionic attractions", b: "liquid NH₃, held in part by hydrogen bonds", c: "liquid C₃H₈, held by London dispersion forces" },
    { a: "solid MgO, held by ionic attractions", b: "liquid HF, held in part by hydrogen bonds", c: "liquid CH₄, held by London dispersion forces" },
    { a: "molten CaCl₂, held by ionic attractions", b: "liquid CH₃OH, held in part by hydrogen bonds", c: "solid CO₂, held by London dispersion forces" },
    { a: "solid KI, held by ionic attractions", b: "liquid H₂O, held in part by hydrogen bonds", c: "liquid Br₂, held by London dispersion forces" },
    { a: "molten NaF, held by ionic attractions", b: "liquid CH₃CH₂OH, held in part by hydrogen bonds", c: "liquid C₂H₆, held by London dispersion forces" }
  ];
  var forceSets = [
    { s: sets[0] }, { s: sets[1] }, { s: sets[2] }, { s: sets[3] }, { s: sets[4] }, { s: sets[5] },
    { s: { a: "a sample where ion to ion attraction acts", b: "a sample where hydrogen bonding acts", c: "a sample where only London dispersion forces act" } },
    { s: { a: "a crystal with attractions between oppositely charged ions", b: "a liquid with attractions between permanent dipoles", c: "a gas with attractions from temporary dipoles only" } },
    { s: { a: "an ionic lattice", b: "a hydrogen bonded liquid", c: "a nonpolar molecular solid" } },
    { s: { a: "a molten ionic compound", b: "a polar liquid with no hydrogen bonding", c: "a nonpolar molecular liquid" } },
    { s: { a: "molten calcium fluoride, held by ionic attractions", b: "liquid propanone, held by dipole to dipole attractions", c: "liquid pentane, held by London dispersion forces" } },
    { s: { a: "solid sodium fluoride, held by ionic attractions", b: "liquid ethanol, held in part by hydrogen bonds", c: "solid iodine, held by London dispersion forces" } },
    { s: { a: "a crystal of an ionic compound", b: "a liquid whose molecules are held by dipole to dipole attractions", c: "a molecular solid held by London dispersion forces" } },
    { s: { a: "an ionic lattice with doubly charged ions", b: "a hydrogen bonded molecular liquid", c: "a nonpolar gas" } }
  ];
  var it = pick(forceSets).s, q = pick([0, 1, 2]);
  var orderSF = it.a + ", then " + it.b + ", then " + it.c;
  var orderWS = it.c + ", then " + it.b + ", then " + it.a;
  if (q === 2) {
    var opts = [orderSF, orderWS, it.b + ", then " + it.a + ", then " + it.c, it.a + ", then " + it.c + ", then " + it.b];
    var rev = pick([true, false]);
    var correct = rev ? orderWS : orderSF;
    var ds = shuffle(opts.filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("Which list puts the three cases in order from " + (rev ? "weakest attraction to strongest attraction" : "strongest attraction to weakest attraction") + "? The cases are: (1) " + it.a + "; (2) " + it.b + "; (3) " + it.c + ".", correct, ds, "Attractions between ions are generally the strongest of these, because full charges attract. Hydrogen bonds and other dipole attractions between molecules are weaker than ion to ion attraction but stronger than London dispersion forces, which come only from temporary dipoles. Any dipole to dipole case here sits in the same middle range. The correct order is " + correct + ".", { ask: "order", rev: rev });
  }
  var correct2 = q === 0 ? it.a : it.c;
  var extra = pick(["a sample of helium gas", "a piece of wax", "a crystal of dry ice", "a sample of methane gas"].filter(function (x) { return [it.a, it.b, it.c].indexOf(x) < 0; }));
  var ds2 = shuffle([it.a, it.b, it.c, extra].filter(function (x) { return x !== correct2; })).slice(0, 3);
  return mcq("Of the following cases, which one involves the " + (q === 0 ? "strongest" : "weakest") + " attractions? The cases are: (1) " + it.a + "; (2) " + it.b + "; (3) " + it.c + ".", correct2, ds2, "Ion to ion attractions between full charges are the strongest attractions in this list. Hydrogen bonds and dipole attractions are in the middle range. London dispersion forces from temporary dipoles are the weakest here. The case asked for is " + correct2 + ".", { ask: q });
});

E("u2-15", 2, ["6.3"], 2, "gen", function () {
  var fams = [
    { name: "noble gases", items: [["He", 2], ["Ne", 10], ["Ar", 18], ["Kr", 36], ["Xe", 54]] },
    { name: "halogens", items: [["F₂", 18], ["Cl₂", 34], ["Br₂", 70], ["I₂", 106]] },
    { name: "straight chain alkanes", items: [["CH₄", 10], ["C₂H₆", 18], ["C₃H₈", 26], ["C₄H₁₀", 34], ["C₅H₁₂", 42], ["C₆H₁₄", 50]] }
  ];
  var fam = pick(fams);
  var four = shuffle(fam.items.slice()).slice(0, 4);
  var sortedBy = four.slice().sort(function (x, y) { return x[1] - y[1]; });
  var mode = pick([0, 1, 2]);
  var target = mode === 1 ? sortedBy[0] : sortedBy[sortedBy.length - 1];
  var label = four.map(function (x) { return x[0] + " (" + x[1] + " electrons)"; }).join(", ");
  var ask = mode === 0 ? "strongest London dispersion forces" : mode === 1 ? "weakest London dispersion forces" : "highest boiling point, where London dispersion is the main attraction between molecules";
  var ds = four.filter(function (x) { return x !== target; }).map(function (x) { return x[0]; });
  return mcq("A set of " + fam.name + " is shown with the number of electrons in each particle: " + label + ". Which member of the set has the " + ask + "?", target[0], ds, "London dispersion forces grow as the electron cloud gets larger and easier to distort, which happens as the number of electrons and the size of the particle increase. In this set the electron counts run from " + sortedBy[0][1] + " to " + sortedBy[sortedBy.length - 1][1] + ". The member asked for is " + target[0] + " with " + target[1] + " electrons.", { family: fam.name, target: target[0] });
});

E("u2-16", 2, ["6.3"], 3, "gen", function () {
  var yes = [
    { f: "CH₃CH₂OH (ethanol)", why: "its hydrogen atoms on oxygen" }, { f: "CH₃NH₂ (methylamine)", why: "its hydrogen atoms on nitrogen" },
    { f: "HOCH₂CH₂OH (ethylene glycol)", why: "its hydrogen atoms on oxygen" }, { f: "CH₃CH₂NH₂ (ethylamine)", why: "its hydrogen atoms on nitrogen" },
    { f: "H₂O₂ (hydrogen peroxide)", why: "its hydrogen atoms on oxygen" }, { f: "NH₂OH (hydroxylamine)", why: "its hydrogen atoms on nitrogen and oxygen" },
    { f: "CH₃OH (methanol)", why: "its hydrogen atoms on oxygen" }, { f: "HF (hydrogen fluoride)", why: "its hydrogen atoms on fluorine" }
  ];
  var no = ["CH₃OCH₃ (dimethyl ether)", "CH₃SH", "CH₂Cl₂", "C₂H₄", "SiH₄", "CH₃Br", "H₂Se", "C₄H₁₀", "PH₃", "CH₃F"];
  var y = pick(yes), n = pick(no), q = pick([0, 1, 2]);
  if (q === 0) {
    var correct = y.f + " forms hydrogen bonds between its molecules, while " + n + " does not";
    var ds = shuffle([
      n + " forms hydrogen bonds between its molecules, while " + y.f + " does not",
      "Both substances form hydrogen bonds between their molecules",
      "Neither substance forms hydrogen bonds between its molecules",
      "Both substances form only ionic attractions between their molecules"
    ].filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("A student meets two substances for the first time: " + y.f + " and " + n + ". Which prediction about hydrogen bonding is correct?", correct, ds, "Check each formula for a hydrogen atom bonded directly to nitrogen, oxygen or fluorine. " + y.f + " qualifies because of " + y.why + ". " + n + " has no hydrogen bonded to nitrogen, oxygen or fluorine, so its molecules cannot hydrogen bond to each other.", { yes: y.f, no: n });
  }
  if (q === 1) {
    var ds2 = shuffle(no.slice()).slice(0, 3);
    return mcq("Which substance, not studied in class, is predicted to form hydrogen bonds between its own molecules?", y.f, ds2, "Look for hydrogen bonded directly to nitrogen, oxygen or fluorine. In " + y.f + " the key feature is " + y.why + ", so neighbouring molecules can hydrogen bond. The other choices have no hydrogen bonded to nitrogen, oxygen or fluorine.", { yes: y.f });
  }
  var correct3 = "The key feature is " + y.why + ", and a lone pair on nitrogen, oxygen or fluorine of a neighbouring molecule attracts that hydrogen";
  var ds3 = shuffle([
    "The key feature is a carbon atom with four bonds, and carbon attracts hydrogen atoms from other molecules",
    "The key feature is a large electron cloud, and size alone creates hydrogen bonds",
    "The key feature is a full positive charge on the molecule, and ions attract the hydrogen",
    "The key feature is a hydrogen bonded to any atom at all, since every bonded hydrogen can hydrogen bond"
  ].filter(function (x) { return x !== correct3; })).slice(0, 3);
  return mcq("For the new substance " + y.f + ", which statement gives the correct structural reason that its molecules can hydrogen bond to each other?", correct3, ds3, "Hydrogen bonding needs two parts: a hydrogen bonded to nitrogen, oxygen or fluorine, which makes that hydrogen strongly positive in character, and a lone pair on nitrogen, oxygen or fluorine in a nearby molecule to attract it. In " + y.f + " the first part comes from " + y.why + ".", { yes: y.f });
});

// 6.4 Properties of molecular substances
E("u2-17", 2, ["6.4"], 1, "gen", function () {
  var subs = ["wax", "sugar", "solid carbon dioxide", "methane", "ethanol", "naphthalene", "iodine crystals", "sulfur", "glucose", "propane", "camphor", "butter fat"];
  var s = pick(subs), proc = pick(["melts", "boils", "evaporates"]), q = pick([0, 1, 2]);
  if (q === 0) {
    var correct = "Only the weak attractions between its molecules need to be overcome, and those take little energy";
    var ds = shuffle([
      "The strong covalent bonds inside each molecule must all be broken, and that takes little energy",
      "The attractions between oppositely charged ions in its lattice must be overcome",
      "Its free electrons must be removed from the electron sea around its atoms",
      "No attractions of any kind hold its particles together in the solid or liquid"
    ].filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("Molecular substances such as " + s + " generally have low melting and boiling points. Why?", correct, ds, "When a molecular substance " + proc + ", the covalent bonds inside each molecule stay intact. Only the much weaker attractions between separate molecules are overcome, and separating molecules takes far less energy than breaking bonds or an ionic lattice. That is why the change happens at a low temperature.", { substance: s });
  }
  if (q === 1) {
    var correct1 = "The molecules themselves stay whole, and only the attractions between molecules are overcome";
    var ds1 = shuffle([
      "Each molecule breaks apart into separate atoms",
      "Each molecule breaks into ions that move freely",
      "The molecules join together into one giant lattice",
      "The atoms lose their electrons to a shared electron sea"
    ].filter(function (x) { return x !== correct1; })).slice(0, 3);
    return mcq("When " + s + " " + proc + ", what happens to its molecules?", correct1, ds1, "Melting, boiling and evaporating are changes between molecules, not inside them. The molecules of " + s + " move apart as the attractions between them are overcome, but the covalent bonds inside each molecule remain unbroken.", { substance: s, proc: proc });
  }
  var correct2 = "Its melting point is low compared with an ionic compound, because attractions between molecules are weaker than attractions between ions";
  var ds2 = shuffle([
    "Its melting point is high compared with an ionic compound, because covalent bonds are stronger than ionic attractions",
    "Its melting point is about the same as an ionic compound, because all solids are held together the same way",
    "It has no melting point, because molecular substances pass directly from solid to gas in every case",
    "Its melting point is low because its molecules contain no electrons to attract each other"
  ].filter(function (x) { return x !== correct2; })).slice(0, 3);
  return mcq("How does the melting point of " + s + ", a molecular substance, compare with that of a typical ionic compound, and why?", correct2, ds2, "An ionic compound is held together by strong attractions between ions throughout a lattice, which take a great deal of energy to overcome. A molecular substance such as " + s + " is held together only by weak attractions between molecules, so it melts at a much lower temperature.", { substance: s });
});

E("u2-18", 2, ["6.4"], 1, "gen", function () {
  var subs = ["sugar", "wax", "methane", "carbon dioxide", "ethanol", "glucose", "iodine", "propane", "naphthalene", "acetone"];
  var states = [
    { st: "solid", form: "as a solid" }, { st: "liquid", form: "as a liquid" },
    { st: "molten", form: "when melted" }, { st: "gas", form: "as a gas" },
    { st: "solution", form: "dissolved in water, where it dissolves without forming ions" }
  ];
  var s = pick(subs), st = pick(states), q = pick([0, 1]);
  if (q === 0) {
    var correct = "It does not conduct, because it has no mobile ions and no free electrons in any state";
    var ds = shuffle([
      "It conducts well, because its covalent bonds act as wires for electric current",
      "It conducts only in this state, because melting or dissolving creates ions from its molecules",
      "It conducts well, because its electrons move freely through an electron sea",
      "It conducts, but only when the sample is heated until its molecules break apart"
    ].filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("A sample of " + s + " is tested " + st.form + ". Which statement about its electrical conductivity is correct?", correct, ds, "Electric current in a substance needs charged particles that are free to move: ions or electrons. A molecular substance such as " + s + " has neutral molecules in every state, with no ions and no delocalized electrons, so it does not conduct as a solid, liquid, gas or ordinary solution.", { substance: s, state: st.st });
  }
  var correct1 = "There are no charged particles free to move, because the particles are neutral molecules";
  var ds1 = shuffle([
    "The ions are locked in place, so the charge cannot move through the sample",
    "The free electrons are all used up in covalent bonds with the container",
    "The molecules carry charges, but they are too large to fit through the wires",
    "The current is carried away by evaporation before it can be measured"
  ].filter(function (x) { return x !== correct1; })).slice(0, 3);
  return mcq("Why does " + s + " fail to conduct electricity " + st.form + "?", correct1, ds1, "Conductivity needs mobile charged particles. The particles in " + s + " are neutral molecules with no overall charge and no free electrons, in this state and in every other state, so there is nothing available to carry a current.", { substance: s, state: st.st });
});

E("u2-19", 2, ["6.4"], 2, "gen", function () {
  var subs = ["paraffin wax", "solid carbon dioxide", "iodine crystals", "sugar crystals", "sulfur", "naphthalene flakes", "camphor", "frozen methane", "glucose crystals", "solid ethanol"];
  var acts = ["scratched with a fingernail", "crushed between two blocks", "cut with a knife", "dented by pressing with a spoon", "snapped with light finger pressure"];
  var s = pick(subs), a = pick(acts), q = pick([0, 1]);
  if (q === 0) {
    var correct = "It is soft, because only weak attractions between molecules must be overcome for molecules to slide or separate";
    var ds = shuffle([
      "It is very hard, because a lattice of ions resists any movement of its layers",
      "It is very hard, because its atoms are joined in one continuous network of covalent bonds",
      "It is soft, because its molecules break apart into atoms under light pressure",
      "It is soft, because it contains a sea of electrons that acts as a lubricant"
    ].filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("A sample of " + s + " can be " + a + ". Which statement best explains this softness?", correct, ds, "The molecules inside " + s + " are strongly bonded internally, but neighbouring molecules are held only by weak intermolecular forces. Light pressure overcomes those weak attractions and lets molecules move apart or slide, so the solid is soft compared with ionic or network solids.", { substance: s });
  }
  var correct1 = "An ionic solid, because its lattice of strong ion to ion attractions resists scratching and crushing far more";
  var ds1 = shuffle([
    "A molecular solid, because weak attractions between molecules make a solid harder to damage",
    "Neither, because all solids have the same hardness regardless of their bonding",
    "The molecular solid " + s + ", because its covalent bonds run through the whole sample",
    "An ionic solid is softer, because its ions roll over each other like ball bearings"
  ].filter(function (x) { return x !== correct1; })).slice(0, 3);
  return mcq("Which solid would be harder to scratch than " + s + ", and why?", correct1, ds1, "Hardness reflects how strongly the particles in a solid are held together. In " + s + " only weak forces act between molecules, so it is easily marked. In an ionic solid, strong attractions between ions act throughout the lattice and resist damage much more strongly.", { substance: s });
});

E("u2-20", 2, ["6.4"], 2, "gen", function () {
  var polars = ["sugar", "ethanol", "glucose", "acetone", "methanol", "urea", "ethylene glycol", "glycerol"];
  var nonpolars = ["cooking oil", "hexane", "iodine", "wax", "gasoline", "naphthalene", "benzene", "kerosene"];
  var polarSolvents = ["water", "ethanol", "methanol"];
  var nonpolarSolvents = ["hexane", "cooking oil", "gasoline"];
  var polarCase = pick([true, false]);
  var solute = polarCase ? pick(polars) : pick(nonpolars);
  var goodSolvent = polarCase ? pick(polarSolvents) : pick(nonpolarSolvents);
  var badSolvents = shuffle((polarCase ? nonpolarSolvents : polarSolvents).slice()).slice(0, 3);
  var correct = solute + " in " + goodSolvent;
  var ds = badSolvents.map(function (sv) { return solute + " in " + sv; });
  var sol = "A solute dissolves well in a solvent whose particles attract it in a similar way to its own particles. " + solute + " is a " + (polarCase ? "polar" : "nonpolar") + " substance, and " + goodSolvent + " is a " + (polarCase ? "polar" : "nonpolar") + " solvent, so the new attractions formed can replace the attractions that are broken. The other solvents are of the opposite type and mix poorly with it.";
  if (pick([true, false])) {
    return mcq("Which pairing is expected to dissolve readily, following the rule that like dissolves like?", correct, ds, sol, { solute: solute, solvent: goodSolvent });
  }
  return mcq("A student needs a solvent that will dissolve " + solute + " well. Which pairing should the student choose?", correct, ds, sol, { solute: solute, solvent: goodSolvent });
});

E("u2-21", 2, ["6.4"], 2, "gen", function () {
  var pool = [
    { f: "methane", bp: -161 }, { f: "ethane", bp: -89 }, { f: "propane", bp: -42 }, { f: "butane", bp: 0 },
    { f: "acetone", bp: 56 }, { f: "chloroform", bp: 61 }, { f: "hexane", bp: 69 }, { f: "ethanol", bp: 78 },
    { f: "water", bp: 100 }, { f: "acetic acid", bp: 118 }, { f: "octane", bp: 125 }, { f: "ethylene glycol", bp: 197 }
  ];
  var four = shuffle(pool.slice()).slice(0, 4);
  var byBp = four.slice().sort(function (x, y) { return x.bp - y.bp; });
  var mode = pick([0, 1]);
  var target = mode === 0 ? byBp[0] : byBp[byBp.length - 1];
  var table = four.map(function (x) { return x.f + ", boiling point " + x.bp + " °C"; }).join("; ");
  var ds = four.filter(function (x) { return x !== target; }).map(function (x) { return x.f; });
  var ask = mode === 0 ? "most volatile, evaporating most readily at room temperature" : "least volatile, evaporating least readily at room temperature";
  return mcq("Boiling points are listed for four molecular substances: " + table + ". Which substance is the " + ask + "?", target.f, ds, "Volatility is the tendency to evaporate. A substance with a low boiling point has weak attractions between its molecules, so molecules escape from the liquid easily and it is volatile. A high boiling point means stronger attractions and low volatility. In this set the boiling points run from " + byBp[0].bp + " °C to " + byBp[byBp.length - 1].bp + " °C, and the substance asked for is " + target.f + ".", { substance: target.f, mode: mode });
});

// 6.5 Intermolecular forces account for properties
E("u2-22", 2, ["6.5"], 2, "gen", function () {
  if (pick([0, 1]) === 0) {
    var sets = [
      { items: ["H₂O", "H₂S", "H₂Se"], why: "Water is the exception in its group because its molecules form hydrogen bonds, which are much stronger than the dipole and dispersion forces in H₂S and H₂Se. Between H₂S and H₂Se, the larger electron cloud of H₂Se gives stronger dispersion forces." },
      { items: ["HF", "HCl", "HBr"], why: "HF forms hydrogen bonds between its molecules, giving it the highest boiling point despite its small size. HCl and HBr have no hydrogen bonding, and HBr has the larger electron cloud, so its dispersion forces are stronger than those in HCl." },
      { items: ["NH₃", "PH₃", "AsH₃"], why: "NH₃ forms hydrogen bonds between its molecules, which lifts its boiling point above the others. PH₃ and AsH₃ rely on dipole and dispersion forces, and the larger AsH₃ molecules have stronger dispersion forces." },
      { items: ["CH₃CH₂OH", "CH₃OCH₃", "C₃H₈"], why: "Ethanol forms hydrogen bonds, so it boils highest. Dimethyl ether is polar but cannot hydrogen bond to itself, so it is next. Propane is nonpolar and has only dispersion forces, so it boils lowest." },
      { items: ["I₂", "Br₂", "Cl₂"], why: "All three are nonpolar, so only dispersion forces act. The forces grow with the number of electrons and the size of the molecules, so I₂ is held most strongly and Cl₂ least strongly." },
      { items: ["CH₃OH", "CH₃SH", "CH₃Cl"], why: "Methanol forms hydrogen bonds and boils highest. The other two are polar molecules without hydrogen bonding to themselves, and their order follows the strength of their dipole and dispersion attractions." },
      { items: ["Xe", "Kr", "Ar"], why: "These noble gases are single atoms with only dispersion forces between them. Xenon has the most electrons and the largest, most easily distorted electron cloud, so its dispersion forces are strongest and it boils highest." },
      { items: ["C₅H₁₂", "C₃H₈", "CH₄"], why: "These alkanes are nonpolar, so dispersion forces decide the order. Longer chains have more electrons and more contact between molecules, so C₅H₁₂ boils highest and CH₄ lowest." },
      { items: ["H₂O", "CH₃OH", "CH₄"], why: "Water and methanol both hydrogen bond, and water forms the more extensive hydrogen bond network, so it boils highest. Methane is nonpolar with only weak dispersion forces, so it boils far lower." },
      { items: ["Br₂", "ICl", "F₂"], why: "ICl is polar, so dipole attractions add to its dispersion forces. Br₂ and F₂ are nonpolar, and Br₂ has far more electrons than F₂, so its dispersion forces are much stronger." },
      { items: ["CH₃CH₂OH", "CH₃CH₂CH₂OH", "H₂O"], why: "All three can hydrogen bond. Water forms hydrogen bonds in every direction and boils highest here, and the longer alcohol has a larger electron cloud and stronger dispersion forces than the shorter one." },
      { items: ["HCl", "F₂", "HBr"], why: "HCl and HBr are polar and HBr also has the larger electron cloud, so HBr boils highest of the three. F₂ is nonpolar with few electrons, so its dispersion forces are the weakest." }
    ];
    var s = pick(sets), rev = pick([true, false]);
    var hiFirst = s.items.join(", then ");
    var loFirst = s.items.slice().reverse().join(", then ");
    var correct = rev ? loFirst : hiFirst;
    var others = [
      s.items[1] + ", then " + s.items[0] + ", then " + s.items[2],
      s.items[0] + ", then " + s.items[2] + ", then " + s.items[1],
      s.items[2] + ", then " + s.items[1] + ", then " + s.items[0],
      s.items[1] + ", then " + s.items[2] + ", then " + s.items[0]
    ];
    var ds = shuffle(others.filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("Which list orders these substances from " + (rev ? "lowest boiling point to highest boiling point" : "highest boiling point to lowest boiling point") + ": " + s.items.join(", ") + "?", correct, ds, s.why + " Putting the substances in the order asked for gives: " + correct + ".", { set: s.items.join("/") });
  }
  var pool = [
    { f: "water", rank: 7, note: "extensive hydrogen bonding" }, { f: "ethanol", rank: 6, note: "hydrogen bonding" },
    { f: "methanol", rank: 5, note: "hydrogen bonding" }, { f: "octane", rank: 8, note: "strong dispersion forces in long chains" },
    { f: "hexane", rank: 5.5, note: "dispersion forces in medium chains" }, { f: "acetone", rank: 4, note: "dipole attractions" },
    { f: "butane", rank: 3, note: "dispersion forces in short chains" }, { f: "propane", rank: 2, note: "weak dispersion forces" },
    { f: "methane", rank: 1, note: "very weak dispersion forces" }, { f: "hydrogen peroxide", rank: 9, note: "hydrogen bonding" },
    { f: "iodine", rank: 10, note: "very strong dispersion forces in a large electron cloud" }, { f: "bromine", rank: 4.5, note: "dispersion forces in a large electron cloud" }
  ];
  var four = shuffle(pool.slice()).slice(0, 4);
  var byRank = four.slice().sort(function (x, y) { return x.rank - y.rank; });
  var mode = pick([0, 1]);
  var target = mode === 0 ? byRank[byRank.length - 1] : byRank[0];
  var ds2 = four.filter(function (x) { return x !== target; }).map(function (x) { return x.f; });
  return mcq("Four substances are compared: " + four.map(function (x) { return x.f; }).join(", ") + ". Based on the attractions between their molecules, which one has the " + (mode === 0 ? "highest" : "lowest") + " boiling point?", target.f, ds2, "Rank the substances by the strength of the attractions between their particles. Hydrogen bonding and large electron clouds give strong attractions and high boiling points, while small nonpolar molecules have weak dispersion forces and low boiling points. In this set " + target.f + " is the extreme case because of " + target.note + ".", { substance: target.f, mode: mode });
});

E("u2-23", 2, ["6.5"], 2, "gen", function () {
  if (pick([0, 1]) === 0) {
    var pairs = [
      { a: "H₂O", b: "H₂S", ans: ["hydrogen bonding", "hydrogen bonds"], why: "water has hydrogen bonded to oxygen, while sulfur in H₂S does not give hydrogen bonding" },
      { a: "HF", b: "HCl", ans: ["hydrogen bonding", "hydrogen bonds"], why: "HF has hydrogen bonded to fluorine, while HCl has no hydrogen bonding between its molecules" },
      { a: "NH₃", b: "PH₃", ans: ["hydrogen bonding", "hydrogen bonds"], why: "NH₃ has hydrogen bonded to nitrogen, while PH₃ has no hydrogen bonding between its molecules" },
      { a: "CH₃CH₂OH", b: "CH₃OCH₃", ans: ["hydrogen bonding", "hydrogen bonds"], why: "ethanol has hydrogen bonded to oxygen, while dimethyl ether has no hydrogen on oxygen" },
      { a: "Br₂", b: "Cl₂", ans: ["london dispersion forces", "dispersion forces", "london dispersion"], why: "both are nonpolar, and Br₂ has many more electrons in a larger electron cloud" },
      { a: "I₂", b: "Br₂", ans: ["london dispersion forces", "dispersion forces", "london dispersion"], why: "both are nonpolar, and I₂ has many more electrons in a larger electron cloud" },
      { a: "C₅H₁₂", b: "CH₄", ans: ["london dispersion forces", "dispersion forces", "london dispersion"], why: "both are nonpolar alkanes, and the longer chain has more electrons and more contact between molecules" },
      { a: "HCl", b: "F₂", ans: ["dipole dipole forces", "dipole dipole attractions", "dipole forces"], why: "HCl is polar and F₂ is nonpolar, and the boiling points are close in size effects so polarity decides" },
      { a: "CH₃OH", b: "CH₃SH", ans: ["hydrogen bonding", "hydrogen bonds"], why: "methanol has hydrogen bonded to oxygen, while CH₃SH does not hydrogen bond to itself" },
      { a: "Xe", b: "Ar", ans: ["london dispersion forces", "dispersion forces", "london dispersion"], why: "both are single nonpolar atoms, and xenon has far more electrons" },
      { a: "H₂O", b: "CH₄", ans: ["hydrogen bonding", "hydrogen bonds"], why: "water hydrogen bonds extensively, while methane is nonpolar" },
      { a: "CH₃CH₂OH", b: "C₃H₈", ans: ["hydrogen bonding", "hydrogen bonds"], why: "ethanol has hydrogen bonded to oxygen, while propane is nonpolar" },
      { a: "Kr", b: "Ne", ans: ["london dispersion forces", "dispersion forces", "london dispersion"], why: "both are single nonpolar atoms, and krypton has far more electrons" },
      { a: "C₄H₁₀", b: "C₂H₆", ans: ["london dispersion forces", "dispersion forces", "london dispersion"], why: "both are nonpolar alkanes, and the longer chain has more electrons" },
      { a: "HBr", b: "H₂", ans: ["dipole dipole forces", "dipole dipole attractions", "dipole forces"], why: "HBr is polar and H₂ is nonpolar with only two electrons" },
      { a: "NH₃", b: "H₂", ans: ["hydrogen bonding", "hydrogen bonds"], why: "NH₃ has hydrogen bonded to nitrogen, while H₂ is nonpolar" }
    ];
    var p = pick(pairs);
    return textq(p.a + " has a much higher boiling point than " + p.b + ". Name the main type of attraction between molecules that accounts for the higher boiling point of " + p.a + ".", p.ans, "Compare the structures of the two substances. The deciding difference is that " + p.why + ". The attraction responsible for the higher boiling point of " + p.a + " is " + p.ans[0] + ".", { a: p.a, b: p.b });
  }
  var e1 = pick([10, 18, 26, 34, 42, 50, 58, 74, 106]), e2 = pick([2, 10, 18, 26, 34, 42, 50]);
  if (e2 >= e1) e2 = Math.max(2, e1 - 16);
  var hiBp = ri(40, 180), loBp = ri(-120, -10);
  return textq("Two nonpolar liquids are compared. Liquid A has " + e1 + " electrons per molecule and boils at " + hiBp + " °C. Liquid B has " + e2 + " electrons per molecule and boils at " + loBp + " °C. Name the type of attraction between molecules that accounts for liquid A boiling so much higher.", ["london dispersion forces", "dispersion forces", "london dispersion"], "Both liquids are nonpolar, so neither hydrogen bonding nor permanent dipole attractions can act between their molecules. The only attraction present is London dispersion, and it is stronger in liquid A because its molecules have " + e1 + " electrons in larger, more easily distorted clouds, compared with " + e2 + " electrons in liquid B.", { e1: e1, e2: e2 });
});

E("u2-24", 2, ["6.5"], 2, "gen", function () {
  var pool = [
    { f: "dry ice (solid CO₂)", mp: -78 }, { f: "ice", mp: 0 }, { f: "paraffin wax", mp: 55 },
    { f: "iodine", mp: 114 }, { f: "sulfur", mp: 115 }, { f: "glucose", mp: 146 },
    { f: "naphthalene", mp: 80 }, { f: "camphor", mp: 175 }, { f: "solid methane", mp: -182 },
    { f: "solid ethanol", mp: -114 }, { f: "benzoic acid", mp: 122 }, { f: "stearic acid", mp: 69 }
  ];
  var four = shuffle(pool.slice()).slice(0, 4);
  var byMp = four.slice().sort(function (x, y) { return x.mp - y.mp; });
  var mode = pick([0, 1]);
  var target = mode === 0 ? byMp[byMp.length - 1] : byMp[0];
  var table = four.map(function (x) { return x.f + ", melting point " + x.mp + " °C"; }).join("; ");
  var ds = four.filter(function (x) { return x !== target; }).map(function (x) { return x.f; });
  return mcq("Melting points are listed for four molecular solids: " + table + ". Judged by the attractions between their molecules, which solid needs the " + (mode === 0 ? "most energy to melt, because its intermolecular attractions are strongest" : "least energy to melt, because its intermolecular attractions are weakest") + "?", target.f, ds, "Melting a molecular solid means overcoming the attractions between its molecules, not the covalent bonds inside them. A higher melting point signals stronger intermolecular attractions and a lower melting point signals weaker ones. In this set the melting points run from " + byMp[0].mp + " °C to " + byMp[byMp.length - 1].mp + " °C, and the solid asked for is " + target.f + ".", { substance: target.f, mode: mode });
});

E("u2-25", 2, ["6.5"], 3, "var", varset([
  function () {
    var correct = "Water forms hydrogen bonds between its molecules, which are far stronger than the dispersion forces in methane, so far more energy is needed to separate water molecules";
    var ds = ["Water molecules are held together by ionic attractions, while methane molecules are held by covalent bonds", "Methane has stronger covalent bonds inside its molecules, and bond strength inside the molecule sets the boiling point", "Water boils higher because its molecules are heavier and gravity holds them in the liquid"];
    return mcq("Water boils at 100 °C while methane boils at -161 °C, even though a methane molecule is heavier than a water molecule. Which explanation is correct?", correct, ds, "Boiling separates molecules from each other, so it is the attractions between molecules that matter, not the bonds inside them or the mass alone. Water molecules hydrogen bond to each other, a strong intermolecular attraction. Methane is nonpolar and its molecules attract only by weak dispersion forces, so they escape as a gas at a very low temperature.", {});
  },
  function () {
    var correct = "Ethanol has a hydrogen atom bonded to oxygen, so its molecules hydrogen bond to each other, while dimethyl ether has no hydrogen on oxygen and cannot hydrogen bond to itself";
    var ds = ["Dimethyl ether has stronger covalent bonds, and stronger internal bonds always raise the boiling point", "Ethanol boils higher because it contains more carbon atoms than dimethyl ether", "Dimethyl ether boils lower because its molecules contain no oxygen atoms"];
    return mcq("Ethanol and dimethyl ether have the same molar mass. Ethanol boils at 78 °C and dimethyl ether boils at -24 °C. Which explanation is correct?", correct, ds, "The two substances are isomers, so mass and electron count are nearly the same and dispersion forces are similar. The difference is structural: ethanol has an O-H group, so its molecules form hydrogen bonds. Dimethyl ether has oxygen but no hydrogen bonded to it, so its molecules cannot hydrogen bond to each other and escape much more easily.", {});
  },
  function () {
    var correct = "HF molecules form hydrogen bonds because hydrogen is bonded to fluorine, while HCl molecules have no hydrogen bonding and rely on weaker dipole and dispersion attractions";
    var ds = ["HCl boils lower because chlorine is less reactive than fluorine in chemical reactions", "HF boils higher because each HF molecule contains more electrons than each HCl molecule", "HCl should boil higher because its molecules are heavier, and mass is the only factor in boiling point"];
    return mcq("HF boils at 20 °C while HCl boils at -85 °C, even though HCl molecules are heavier. Which explanation is correct?", correct, ds, "Boiling does not break the covalent bonds inside molecules. HF has hydrogen bonded to fluorine, one of the three atoms that allow hydrogen bonding, so HF molecules attract each other strongly. HCl has no such feature, so its molecules are held only by dipole and dispersion forces and boil away at a much lower temperature.", {});
  },
  function () {
    var correct = "Both are nonpolar, so only dispersion forces act, and iodine has many more electrons in a larger, more easily distorted cloud, giving stronger dispersion forces";
    var ds = ["Iodine forms hydrogen bonds between its molecules, while bromine cannot form any attractions", "Bromine boils lower because its covalent bonds break more easily when it is heated", "Iodine is an ionic solid, so ionic attractions give it the higher boiling point"];
    return mcq("Iodine is a solid at room temperature while bromine is a liquid that boils at 59 °C. Both are diatomic halogen molecules. Which explanation is correct?", correct, ds, "Neither I₂ nor Br₂ is polar and neither can hydrogen bond, so dispersion forces are the only attractions between their molecules. Dispersion forces grow with the number of electrons and the size of the electron cloud. Iodine has far more electrons than bromine, so its molecules attract strongly enough to form a solid at room temperature.", {});
  },
  function () {
    var correct = "Ammonia molecules form hydrogen bonds because hydrogen is bonded to nitrogen, while phosphine molecules have no hydrogen bonding and are held by weaker forces";
    var ds = ["Phosphine boils lower because phosphorus atoms have no electrons available for any attraction", "Ammonia boils higher because its covalent bonds must be broken before it can boil", "Phosphine should boil higher because it is heavier, and no other factor can outweigh mass"];
    return mcq("Ammonia boils at -33 °C while phosphine, PH₃, boils at -88 °C, even though phosphine molecules are heavier. Which explanation is correct?", correct, ds, "In NH₃ each hydrogen is bonded to nitrogen, which is one of the three atoms that support hydrogen bonding, so ammonia molecules attract each other strongly. In PH₃ the hydrogen is bonded to phosphorus, which does not support hydrogen bonding, so only weaker dipole and dispersion forces act and the boiling point is lower despite the greater mass.", {});
  },
  function () {
    var correct = "Pentane has a longer chain with more electrons and more surface contact between neighbouring molecules, so its dispersion forces are stronger than those in methane";
    var ds = ["Pentane forms hydrogen bonds along its carbon chain, while methane cannot form attractions", "Methane boils lower because the covalent bonds in methane are weaker than those in pentane", "Pentane molecules are joined to each other by covalent bonds in the liquid"];
    return mcq("Pentane boils at 36 °C while methane boils at -161 °C. Both are nonpolar alkanes. Which explanation is correct?", correct, ds, "Both substances are nonpolar, so dispersion forces are the only attractions between their molecules. A pentane molecule has many more electrons than a methane molecule and a longer chain, giving more contact with neighbours. Its dispersion forces are therefore much stronger, and more energy is needed to separate its molecules when it boils.", {});
  }
]));

E("u2-26", 2, ["6.5"], 2, "gen", function () {
  var type = pick([0, 1, 2]);
  if (type === 0) {
    var donor = pick(["nitrogen", "oxygen", "fluorine"]), bpA = ri(60, 220), bpB = ri(-100, 20);
    return textq("Substance A contains hydrogen atoms bonded directly to " + donor + " atoms. It boils at " + bpA + " °C. Substance B is a similar sized molecule with no hydrogen bonded to nitrogen, oxygen or fluorine, and it boils at " + bpB + " °C. Name the attraction between molecules of A that is mainly responsible for its much higher boiling point.", ["hydrogen bonding", "hydrogen bonds"], "A hydrogen bonded to " + donor + " is strongly attracted to a lone pair on a neighbouring molecule. That attraction is hydrogen bonding, and it is much stronger than the forces available to substance B, which explains the large gap between " + bpA + " °C and " + bpB + " °C.", { donor: donor });
  }
  if (type === 1) {
    var eA = pick([54, 70, 86, 106, 126]), eB = pick([10, 18, 26, 34]);
    var bpA2 = ri(80, 320), bpB2 = ri(-160, -20);
    return textq("Substance A is nonpolar and has " + eA + " electrons per molecule. It boils at " + bpA2 + " °C. Substance B is also nonpolar and has " + eB + " electrons per molecule. It boils at " + bpB2 + " °C. Name the attraction between molecules that explains why A boils so much higher.", ["london dispersion forces", "dispersion forces", "london dispersion"], "Nonpolar molecules have no permanent dipole and cannot hydrogen bond, so the only attraction between them is London dispersion. Substance A has " + eA + " electrons in a large, easily distorted cloud, compared with " + eB + " electrons for B, so its dispersion forces are far stronger and its boiling point is far higher.", { eA: eA, eB: eB });
  }
  var dA = (rf(15, 30) / 10).toFixed(1), bpA3 = ri(-80, 40), bpB3 = ri(-190, -120);
  return textq("Substance A is a polar molecule with a large dipole, about " + dA + " units on a relative scale, and no hydrogen bonded to nitrogen, oxygen or fluorine. It boils at " + bpA3 + " °C. Substance B is a nonpolar molecule of similar size and boils at " + bpB3 + " °C. Name the attraction between molecules of A, beyond dispersion, that raises its boiling point.", ["dipole dipole forces", "dipole dipole attractions", "dipole forces"], "Substance A is polar, so the positive end of one molecule attracts the negative end of the next. Those dipole dipole attractions add to the dispersion forces that both substances have. A has no hydrogen on nitrogen, oxygen or fluorine, so hydrogen bonding is not available. The extra attraction in A is dipole dipole forces.", { dipole: dA });
});

E("u2-27", 2, ["6.5"], 3, "gen", function () {
  var pairs = [
    { a: "CH₃NH₂", b: "CH₃SH", ans: ["hydrogen bonding", "hydrogen bonds"], why: "methylamine has hydrogen bonded to nitrogen, while CH₃SH does not hydrogen bond to itself" },
    { a: "CH₃CH₂OH", b: "CH₃CH₂SH", ans: ["hydrogen bonding", "hydrogen bonds"], why: "ethanol has hydrogen bonded to oxygen, while the sulfur compound does not hydrogen bond to itself" },
    { a: "HOCH₂CH₂OH", b: "CH₃OCH₂CH₃", ans: ["hydrogen bonding", "hydrogen bonds"], why: "the first substance has two O-H groups, while the ether has no hydrogen on oxygen" },
    { a: "CH₃OH", b: "CH₃Cl", ans: ["hydrogen bonding", "hydrogen bonds"], why: "methanol has hydrogen bonded to oxygen, while CH₃Cl has no hydrogen bonding" },
    { a: "I₂", b: "F₂", ans: ["london dispersion forces", "dispersion forces", "london dispersion"], why: "both are nonpolar, and iodine has far more electrons in a much larger cloud" },
    { a: "C₆H₁₄", b: "C₂H₆", ans: ["london dispersion forces", "dispersion forces", "london dispersion"], why: "both are nonpolar alkanes, and the longer chain has more electrons and more contact between molecules" },
    { a: "Xe", b: "He", ans: ["london dispersion forces", "dispersion forces", "london dispersion"], why: "both are single nonpolar atoms, and xenon has far more electrons" },
    { a: "Br₂", b: "F₂", ans: ["london dispersion forces", "dispersion forces", "london dispersion"], why: "both are nonpolar, and bromine has far more electrons in a larger cloud" },
    { a: "CH₃NH₂", b: "CH₄", ans: ["hydrogen bonding", "hydrogen bonds"], why: "methylamine has hydrogen bonded to nitrogen, while methane is nonpolar" },
    { a: "NH₂OH", b: "CH₃F", ans: ["hydrogen bonding", "hydrogen bonds"], why: "hydroxylamine has hydrogen bonded to nitrogen and oxygen, while CH₃F has no hydrogen on fluorine" },
    { a: "HBr", b: "Ar", ans: ["dipole dipole forces", "dipole dipole attractions", "dipole forces"], why: "HBr is polar, while argon atoms are nonpolar and have fewer electrons" },
    { a: "CH₃CN", b: "C₃H₈", ans: ["dipole dipole forces", "dipole dipole attractions", "dipole forces"], why: "CH₃CN is strongly polar, while propane is nonpolar" },
    { a: "SO₂", b: "CO₂", ans: ["dipole dipole forces", "dipole dipole attractions", "dipole forces"], why: "SO₂ is polar and bent, while CO₂ is nonpolar overall" },
    { a: "CHCl₃", b: "CCl₄", ans: ["dipole dipole forces", "dipole dipole attractions", "dipole forces"], why: "CHCl₃ is polar overall, while CCl₄ is nonpolar overall" }
  ];
  var p = pick(pairs), bpA = ri(50, 260), bpB = ri(-120, 30);
  if (bpB >= bpA) bpB = bpA - ri(80, 160);
  return textq("Two substances not covered in class are compared. " + p.a + " boils at " + bpA + " °C and " + p.b + " boils at " + bpB + " °C. Name the main attraction between molecules that accounts for the higher boiling point of " + p.a + ".", p.ans, "Apply the force model to the new pair. The deciding structural difference is that " + p.why + ". That makes the main attraction behind the higher boiling point of " + p.a + " " + p.ans[0] + ".", { a: p.a, b: p.b });
});

// 6.6 Formation of ionic bonds
E("u2-28", 2, ["6.6"], 1, "gen", function () {
  var metals = ["sodium", "magnesium", "calcium", "potassium", "aluminium", "lithium", "barium", "zinc"];
  var nonmetals = ["chlorine", "oxygen", "fluorine", "sulfur", "bromine", "nitrogen", "iodine", "phosphorus"];
  var m = pick(metals), n = pick(nonmetals), q = pick([0, 1, 2]);
  var correct, ds;
  if (q === 0) {
    correct = "The " + m + " atoms lose electrons and the " + n + " atoms gain electrons";
    ds = ["The " + n + " atoms lose electrons and the " + m + " atoms gain electrons", "The " + m + " atoms and the " + n + " atoms share pairs of electrons equally", "Both kinds of atoms lose electrons, and the electrons leave the sample as a gas", "Both kinds of atoms gain electrons from the air around the reaction"];
  } else if (q === 1) {
    correct = "Electrons move from the metal, " + m + ", to the nonmetal, " + n;
    ds = ["Electrons move from the nonmetal, " + n + ", to the metal, " + m, "Electrons are shared in pairs between " + m + " and " + n + " and never transfer", "Electrons move from both " + m + " and " + n + " into a shared sea and no ions form"];
  } else {
    correct = m + " forms positive ions and " + n + " forms negative ions";
    ds = [m + " forms negative ions and " + n + " forms positive ions", "Both " + m + " and " + n + " form positive ions", "Both " + m + " and " + n + " form negative ions", "Neither forms ions, because ionic bonds are made by sharing electrons"];
  }
  return mcq("When " + m + " reacts with " + n + " to form an ionic compound, which statement describes the electron transfer correctly?", correct, shuffle(ds.filter(function (x) { return x !== correct; })).slice(0, 3), "In ionic bonding a metal gives electrons to a nonmetal. The metal atoms lose electrons and become positive ions, while the nonmetal atoms gain those electrons and become negative ions. Here " + m + " is the metal and " + n + " is the nonmetal, so electrons move from " + m + " to " + n + ".", { metal: m, nonmetal: n, ask: q });
});

E("u2-29", 2, ["6.6"], 2, "gen", function () {
  var atoms = [
    { a: "sodium atom", n: 1, d: "loses" }, { a: "magnesium atom", n: 2, d: "loses" },
    { a: "calcium atom", n: 2, d: "loses" }, { a: "aluminium atom", n: 3, d: "loses" },
    { a: "potassium atom", n: 1, d: "loses" }, { a: "lithium atom", n: 1, d: "loses" },
    { a: "barium atom", n: 2, d: "loses" }, { a: "oxygen atom", n: 2, d: "gains" },
    { a: "sulfur atom", n: 2, d: "gains" }, { a: "chlorine atom", n: 1, d: "gains" },
    { a: "fluorine atom", n: 1, d: "gains" }, { a: "nitrogen atom", n: 3, d: "gains" },
    { a: "bromine atom", n: 1, d: "gains" }, { a: "phosphorus atom", n: 3, d: "gains" }
  ];
  var at = pick(atoms), k = pick([1, 2, 3, 4, 5, 6]), ans = at.n * k;
  var prompt = k === 1
    ? "How many electrons does one " + at.a + " " + (at.d === "loses" ? "lose" : "gain") + " when it forms its usual ion? Give the number of electrons."
    : "A sample contains " + k + " separate " + at.a + "s, and each one forms its usual ion. How many electrons are " + (at.d === "loses" ? "lost" : "gained") + " in total? Give the number of electrons.";
  return numq(prompt, ans, 0.1, "One " + at.a + " " + at.d + " " + at.n + " electron or electrons so that its outer shell matches the nearest noble gas arrangement. For " + k + (k === 1 ? " atom" : " atoms") + " the total is " + at.n + " x " + k + " = " + ans + " electrons.", { atom: at.a, k: k });
});

E("u2-30", 2, ["6.6"], 1, "gen", function () {
  var els = [
    { e: "sodium", sym: "Na", ch: "1+", ion: "Na⁺", grp: "Group 1", ctx: "sodium chloride" },
    { e: "potassium", sym: "K", ch: "1+", ion: "K⁺", grp: "Group 1", ctx: "potassium bromide" },
    { e: "lithium", sym: "Li", ch: "1+", ion: "Li⁺", grp: "Group 1", ctx: "lithium fluoride" },
    { e: "magnesium", sym: "Mg", ch: "2+", ion: "Mg²⁺", grp: "Group 2", ctx: "magnesium oxide" },
    { e: "calcium", sym: "Ca", ch: "2+", ion: "Ca²⁺", grp: "Group 2", ctx: "calcium chloride" },
    { e: "barium", sym: "Ba", ch: "2+", ion: "Ba²⁺", grp: "Group 2", ctx: "barium sulfide" },
    { e: "aluminium", sym: "Al", ch: "3+", ion: "Al³⁺", grp: "Group 13", ctx: "aluminium oxide" },
    { e: "oxygen", sym: "O", ch: "2-", ion: "O²⁻", grp: "Group 16", ctx: "magnesium oxide" },
    { e: "sulfur", sym: "S", ch: "2-", ion: "S²⁻", grp: "Group 16", ctx: "barium sulfide" },
    { e: "chlorine", sym: "Cl", ch: "1-", ion: "Cl⁻", grp: "Group 17", ctx: "sodium chloride" },
    { e: "fluorine", sym: "F", ch: "1-", ion: "F⁻", grp: "Group 17", ctx: "lithium fluoride" },
    { e: "bromine", sym: "Br", ch: "1-", ion: "Br⁻", grp: "Group 17", ctx: "potassium bromide" },
    { e: "nitrogen", sym: "N", ch: "3-", ion: "N³⁻", grp: "Group 15", ctx: "magnesium nitride" },
    { e: "zinc", sym: "Zn", ch: "2+", ion: "Zn²⁺", grp: "a transition metal that commonly forms a 2+ ion", ctx: "zinc chloride" },
    { e: "strontium", sym: "Sr", ch: "2+", ion: "Sr²⁺", grp: "Group 2", ctx: "strontium chloride" },
    { e: "rubidium", sym: "Rb", ch: "1+", ion: "Rb⁺", grp: "Group 1", ctx: "rubidium chloride" },
    { e: "beryllium", sym: "Be", ch: "2+", ion: "Be²⁺", grp: "Group 2", ctx: "beryllium chloride" },
    { e: "iron", sym: "Fe", ch: "2+", ion: "Fe²⁺", grp: "a transition metal that commonly forms a 2+ ion", ctx: "iron(II) chloride" },
    { e: "copper", sym: "Cu", ch: "2+", ion: "Cu²⁺", grp: "a transition metal that commonly forms a 2+ ion", ctx: "copper(II) sulfate" },
    { e: "nickel", sym: "Ni", ch: "2+", ion: "Ni²⁺", grp: "a transition metal that commonly forms a 2+ ion", ctx: "nickel chloride" },
    { e: "silver", sym: "Ag", ch: "1+", ion: "Ag⁺", grp: "a transition metal that commonly forms a 1+ ion", ctx: "silver nitrate" },
    { e: "lead", sym: "Pb", ch: "2+", ion: "Pb²⁺", grp: "a metal that commonly forms a 2+ ion", ctx: "lead(II) nitrate" },
    { e: "tin", sym: "Sn", ch: "2+", ion: "Sn²⁺", grp: "a metal that commonly forms a 2+ ion", ctx: "tin(II) chloride" },
    { e: "phosphorus", sym: "P", ch: "3-", ion: "P³⁻", grp: "Group 15", ctx: "calcium phosphide" },
    { e: "selenium", sym: "Se", ch: "2-", ion: "Se²⁻", grp: "Group 16", ctx: "sodium selenide" },
    { e: "iodine", sym: "I", ch: "1-", ion: "I⁻", grp: "Group 17", ctx: "sodium iodide" },
    { e: "gallium", sym: "Ga", ch: "3+", ion: "Ga³⁺", grp: "Group 13", ctx: "gallium oxide" }
  ];
  var el = pick(els), q = pick([0, 1]);
  if (q === 0) {
    var charges = ["1+", "2+", "3+", "1-", "2-", "3-"];
    var ds = shuffle(charges.filter(function (x) { return x !== el.ch; })).slice(0, 3);
    return mcq("In " + el.ctx + ", what is the charge on the ion formed by " + el.e + ", a " + el.grp + " element?", el.ch, ds, "Atoms form ions that give a complete outer shell. " + el.e + " is in " + el.grp + ", and its atoms reach a stable arrangement by forming the ion " + el.ion + ", which carries a charge of " + el.ch + ".", { element: el.e, ask: q });
  }
  var ions = ["Na⁺", "K⁺", "Mg²⁺", "Ca²⁺", "Al³⁺", "O²⁻", "S²⁻", "Cl⁻", "F⁻", "Br⁻", "N³⁻", "Zn²⁺"];
  var ds2 = shuffle(ions.filter(function (x) { return x !== el.ion; })).slice(0, 3);
  return mcq("Which symbol represents the usual ion formed by " + el.e + ", as found in " + el.ctx + "?", el.ion, ds2, "The ion keeps the element symbol " + el.sym + " and shows the charge gained by reaching a complete outer shell. For " + el.e + " that charge is " + el.ch + ", so the ion is written " + el.ion + ".", { element: el.e, ask: q });
});

E("u2-31", 2, ["6.6"], 2, "gen", function () {
  var pairs = [
    { m: "sodium", ms: "Na", mn: 1, mi: "Na⁺", n: "chlorine", ns: "Cl", nn: 1, ni: "Cl⁻" },
    { m: "magnesium", ms: "Mg", mn: 2, mi: "Mg²⁺", n: "oxygen", ns: "O", nn: 2, ni: "O²⁻" },
    { m: "calcium", ms: "Ca", mn: 2, mi: "Ca²⁺", n: "chlorine", ns: "Cl", nn: 1, ni: "Cl⁻" },
    { m: "potassium", ms: "K", mn: 1, mi: "K⁺", n: "fluorine", ns: "F", nn: 1, ni: "F⁻" },
    { m: "aluminium", ms: "Al", mn: 3, mi: "Al³⁺", n: "oxygen", ns: "O", nn: 2, ni: "O²⁻" },
    { m: "lithium", ms: "Li", mn: 1, mi: "Li⁺", n: "bromine", ns: "Br", nn: 1, ni: "Br⁻" },
    { m: "barium", ms: "Ba", mn: 2, mi: "Ba²⁺", n: "sulfur", ns: "S", nn: 2, ni: "S²⁻" },
    { m: "magnesium", ms: "Mg", mn: 2, mi: "Mg²⁺", n: "nitrogen", ns: "N", nn: 3, ni: "N³⁻" },
    { m: "sodium", ms: "Na", mn: 1, mi: "Na⁺", n: "oxygen", ns: "O", nn: 2, ni: "O²⁻" },
    { m: "calcium", ms: "Ca", mn: 2, mi: "Ca²⁺", n: "fluorine", ns: "F", nn: 1, ni: "F⁻" },
    { m: "potassium", ms: "K", mn: 1, mi: "K⁺", n: "oxygen", ns: "O", nn: 2, ni: "O²⁻" },
    { m: "lithium", ms: "Li", mn: 1, mi: "Li⁺", n: "oxygen", ns: "O", nn: 2, ni: "O²⁻" },
    { m: "calcium", ms: "Ca", mn: 2, mi: "Ca²⁺", n: "bromine", ns: "Br", nn: 1, ni: "Br⁻" },
    { m: "aluminium", ms: "Al", mn: 3, mi: "Al³⁺", n: "chlorine", ns: "Cl", nn: 1, ni: "Cl⁻" },
    { m: "potassium", ms: "K", mn: 1, mi: "K⁺", n: "sulfur", ns: "S", nn: 2, ni: "S²⁻" },
    { m: "zinc", ms: "Zn", mn: 2, mi: "Zn²⁺", n: "oxygen", ns: "O", nn: 2, ni: "O²⁻" },
    { m: "sodium", ms: "Na", mn: 1, mi: "Na⁺", n: "sulfur", ns: "S", nn: 2, ni: "S²⁻" },
    { m: "strontium", ms: "Sr", mn: 2, mi: "Sr²⁺", n: "chlorine", ns: "Cl", nn: 1, ni: "Cl⁻" },
    { m: "magnesium", ms: "Mg", mn: 2, mi: "Mg²⁺", n: "fluorine", ns: "F", nn: 1, ni: "F⁻" },
    { m: "iron", ms: "Fe", mn: 3, mi: "Fe³⁺", n: "oxygen", ns: "O", nn: 2, ni: "O²⁻" },
    { m: "copper", ms: "Cu", mn: 2, mi: "Cu²⁺", n: "chlorine", ns: "Cl", nn: 1, ni: "Cl⁻" },
    { m: "aluminium", ms: "Al", mn: 3, mi: "Al³⁺", n: "nitrogen", ns: "N", nn: 3, ni: "N³⁻" },
    { m: "sodium", ms: "Na", mn: 1, mi: "Na⁺", n: "phosphorus", ns: "P", nn: 3, ni: "P³⁻" }
  ];
  var p = pick(pairs);
  var gg = p.mn, hh = p.nn; while (hh) { var tt = gg % hh; gg = hh; hh = tt; }
  var sm = p.nn / gg, sn = p.mn / gg;
  var q = (sm > 1 || sn > 1) ? pick([0, 1, 2]) : pick([0, 1]);
  if (q === 0) {
    var correct = "Each " + p.ms + " atom transfers " + p.mn + " electron or electrons to a " + p.ns + " atom, forming " + p.mi + " and " + p.ni + " ions";
    var ds = shuffle([
      "Each " + p.ns + " atom transfers " + p.nn + " electron or electrons to a " + p.ms + " atom, forming " + p.mi + " and " + p.ni + " ions",
      "Each " + p.ms + " atom shares " + p.mn + " pair or pairs of electrons with a " + p.ns + " atom, and no ions form",
      "Each " + p.ms + " atom gains " + p.mn + " electron or electrons and becomes a negative ion, while " + p.ns + " becomes positive",
      "Both atoms lose their outer electrons, which collect as a free electron sea around them"
    ].filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("A Lewis style description is needed for the formation of the ionic compound from " + p.m + " and " + p.n + ". Which description is correct?", correct, ds, "In a Lewis description of ionic formation, dots for the outer electrons of the metal are shown moving to the nonmetal. The " + p.m + " atom loses " + p.mn + " electron or electrons and is written as " + p.mi + ", and the " + p.n + " atom gains electrons and is written as " + p.ni + ". No shared pair is drawn, because the electrons are transferred, not shared.", { metal: p.m, nonmetal: p.n });
  }
  if (q === 2) {
    var subs = { 1: "", 2: "₂", 3: "₃", 4: "₄" };
    var formula = p.ms + subs[sm] + p.ns + subs[sn];
    var cand = [p.ms + p.ns, p.ms + subs[sn] + p.ns + subs[sm], p.ns + subs[sn] + p.ms + subs[sm], p.ms + subs[sm] + p.ns + subs[sn + 1]];
    var seenF = {}, dsF = [];
    cand.forEach(function (x) { if (x !== formula && !seenF[x]) { seenF[x] = 1; dsF.push(x); } });
    return mcq("What is the formula of the ionic compound formed from " + p.m + " and " + p.n + "?", formula, dsF.slice(0, 3), "The ions are " + p.mi + " and " + p.ni + ". The total positive charge must equal the total negative charge, so the compound takes " + sm + " of the " + p.mi + " ions for every " + sn + " of the " + p.ni + " ions (the criss-cross rule, reduced to lowest terms). The formula is " + formula + ".", { metal: p.m, nonmetal: p.n, ask: 2 });
  }
  var correct1 = p.mi + " and " + p.ni;
  var pool = ["Na⁺ and Cl⁻", "Mg²⁺ and O²⁻", "Ca²⁺ and Cl⁻", "K⁺ and F⁻", "Al³⁺ and O²⁻", "Li⁺ and Br⁻", "Ba²⁺ and S²⁻", "Mg²⁺ and N³⁻", "Na⁺ and O²⁻", "Ca²⁺ and F⁻", "Na⁻ and Cl⁺", "Mg⁻ and O⁺", "K⁺ and O²⁻", "Li⁺ and O²⁻", "Ca²⁺ and Br⁻", "Al³⁺ and Cl⁻", "K⁺ and S²⁻", "Zn²⁺ and O²⁻", "Na⁺ and S²⁻", "Sr²⁺ and Cl⁻", "Mg²⁺ and F⁻", "Fe³⁺ and O²⁻", "Cu²⁺ and Cl⁻", "Al³⁺ and N³⁻", "Na⁺ and P³⁻"];
  var ds1 = shuffle(pool.filter(function (x) { return x !== correct1; })).slice(0, 3);
  return mcq("When " + p.m + " reacts with " + p.n + ", which pair of ions is formed?", correct1, ds1, "The metal " + p.m + " loses its outer electrons and becomes " + p.mi + ". The nonmetal " + p.n + " gains electrons until its outer shell is complete and becomes " + p.ni + ". Together they give the pair " + correct1 + ".", { metal: p.m, nonmetal: p.n });
});

E("u2-32", 2, ["6.6"], 3, "gen", function () {
  var sub = function (n) { return String(n).split("").map(function (d) { return "₀₁₂₃₄₅₆₇₈₉"[Number(d)]; }).join(""); };
  var gcd = function (a, b) { return b === 0 ? a : gcd(b, a % b); };
  var metals = [{ s: "Na", c: 1 }, { s: "K", c: 1 }, { s: "Mg", c: 2 }, { s: "Ca", c: 2 }, { s: "Al", c: 3 }, { s: "Zn", c: 2 }];
  var nonmetals = [{ s: "Cl", c: 1 }, { s: "F", c: 1 }, { s: "Br", c: 1 }, { s: "O", c: 2 }, { s: "S", c: 2 }, { s: "N", c: 3 }];
  var m = pick(metals), n = pick(nonmetals), q = pick([0, 1, 2]);
  var g = gcd(m.c, n.c), ms = n.c / g, ns = m.c / g, lcm = m.c * n.c / g;
  var formula = m.s + (ms > 1 ? sub(ms) : "") + n.s + (ns > 1 ? sub(ns) : "");
  if (q === 0) {
    var cand = [
      n.s + (ns > 1 ? sub(ns) : "") + m.s + (ms > 1 ? sub(ms) : ""),
      m.s + (ms + 1 > 1 ? sub(ms + 1) : "") + n.s + (ns > 1 ? sub(ns) : ""),
      m.s + (ms > 1 ? sub(ms) : "") + n.s + (ns + 1 > 1 ? sub(ns + 1) : ""),
      m.s + sub(m.c) + n.s + sub(n.c),
      m.s + n.s
    ];
    var ds = [], ci = 0;
    while (ds.length < 3 && ci < cand.length) { var cv = cand[ci++]; if (cv !== formula && ds.indexOf(cv) < 0) ds.push(cv); }
    return mcq("A metal whose ions carry a charge of " + m.c + "+ has symbol " + m.s + ". A nonmetal whose ions carry a charge of " + n.c + "- has symbol " + n.s + ". What is the formula of the neutral ionic compound they form?", formula, ds, "The total positive charge must equal the total negative charge. The smallest whole numbers that balance are " + ms + " ion or ions of " + m.s + " for every " + ns + " ion or ions of " + n.s + ", found by dividing each charge by their common factor " + g + " and crossing the charges over. The formula is " + formula + ".", { formula: formula });
  }
  if (q === 1) {
    var ds2 = [], offs = [1, -1, 2, 3, -2, 4], oi = 0;
    while (ds2.length < 3 && oi < offs.length) { var v = lcm + offs[oi++]; if (v > 0 && v !== lcm && ds2.indexOf(String(v)) < 0) ds2.push(String(v)); }
    return mcq("Ions of " + m.s + " carry a charge of " + m.c + "+ and ions of " + n.s + " carry a charge of " + n.c + "-. In one formula unit of their compound, how many electrons are transferred from the metal atoms to the nonmetal atoms in total?", String(lcm), ds2, "One formula unit holds " + ms + " metal ion or ions, each losing " + m.c + " electrons, for a total loss of " + ms + " x " + m.c + " = " + lcm + " electrons. The " + ns + " nonmetal ion or ions gain " + ns + " x " + n.c + " = " + lcm + " electrons, so the transfer balances at " + lcm + " electrons.", { formula: formula });
  }
  var ratio = ms + " : " + ns;
  var candR = [ns + " : " + ms, (ms + 1) + " : " + ns, ms + " : " + (ns + 1), "1 : 1", (ms + ns) + " : 1", (ms + 2) + " : " + ns, ms + " : " + (ns + 2)];
  var ds3 = [], ri2 = 0;
  while (ds3.length < 3 && ri2 < candR.length) { var rv = candR[ri2++]; if (rv !== ratio && ds3.indexOf(rv) < 0) ds3.push(rv); }
  return mcq("Ions of " + m.s + " carry a charge of " + m.c + "+ and ions of " + n.s + " carry a charge of " + n.c + "-. What is the ratio of metal ions to nonmetal ions in their neutral compound?", ratio, ds3, "Balance the charges with the smallest whole numbers. Using " + ms + " metal ions gives a total charge of " + ms + " x " + m.c + "+ and using " + ns + " nonmetal ions gives " + ns + " x " + n.c + "-, and the two totals are equal in size. The ratio of metal ions to nonmetal ions is " + ratio + ".", { formula: formula });
});

// 6.7 Structural model of an ionic substance
E("u2-33", 2, ["6.7"], 1, "gen", function () {
  var comps = ["sodium chloride", "magnesium oxide", "calcium chloride", "potassium bromide", "sodium fluoride", "calcium oxide", "aluminium oxide", "potassium iodide", "lithium chloride", "barium sulfate", "zinc chloride", "sodium oxide"];
  var c = pick(comps), ctx = pick(["in a crystal sample", "in a mineral specimen", "in a laboratory sample", "in a single large crystal"]), q = pick([0, 1, 2]);
  var correct, ds;
  if (q === 0) {
    correct = "Its ions sit in a regular, repeating three dimensional arrangement called a lattice";
    ds = ["Its ions are grouped into separate molecules, each with a fixed small number of ions", "Its ions are scattered at random with no repeating pattern of any kind", "Its ions form long chains that are not connected to each other"];
  } else if (q === 1) {
    correct = "Each ion is surrounded by ions of the opposite charge, so attractions act in every direction";
    ds = ["Each ion is surrounded only by ions of the same charge, so repulsions act in every direction", "Each ion is bonded to exactly one other ion, forming a separate pair", "Each ion is surrounded by neutral atoms that carry no charge"];
  } else {
    correct = "There are no separate molecules in the solid, only a continuous lattice of ions";
    ds = ["The solid is made of separate " + c + " molecules held together by weak forces", "The solid is one giant molecule in which all ions share electron pairs", "The solid is a mixture of metal atoms and nonmetal atoms that never formed ions"];
  }
  return mcq("Which statement describes the structure of " + c + " " + ctx + "?", correct, shuffle(ds.filter(function (x) { return x !== correct; })).slice(0, 3), "An ionic solid is a lattice: a regular, repeating arrangement of ions extending through the whole crystal. Every positive ion is surrounded by negative ions and every negative ion is surrounded by positive ions, so the formula gives a ratio of ions, not a molecule. This describes " + c + " in any sample.", { compound: c, ask: q });
});

E("u2-34", 2, ["6.7"], 2, "gen", function () {
  var comps = [
    { f: "NaCl", cat: 1, an: 1 }, { f: "MgO", cat: 1, an: 1 }, { f: "CaCl₂", cat: 1, an: 2 },
    { f: "Na₂O", cat: 2, an: 1 }, { f: "Al₂O₃", cat: 2, an: 3 }, { f: "MgCl₂", cat: 1, an: 2 },
    { f: "K₂S", cat: 2, an: 1 }, { f: "CaF₂", cat: 1, an: 2 }, { f: "Fe₂O₃", cat: 2, an: 3 },
    { f: "Na₂SO₄", cat: 2, an: 1 }, { f: "Ca₃N₂", cat: 3, an: 2 }, { f: "AlCl₃", cat: 1, an: 3 }
  ];
  var c = pick(comps), q = pick([0, 1, 2]);
  if (q === 2) {
    var correct = "It is the smallest whole number ratio of ions in the lattice, not a separate molecule";
    var ds = shuffle([
      "It is one separate molecule of the compound, held together by shared electron pairs",
      "It is the mass in grams of one mole of the compound",
      "It is a single ion pair that exists on its own inside the crystal"
    ].filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("What does the formula unit of " + c.f + " represent?", correct, ds, "Ionic solids contain no molecules. A formula unit is a bookkeeping idea: it names the smallest whole number ratio of ions in the lattice. For " + c.f + " that ratio is " + c.cat + " cation unit or units to " + c.an + " anion unit or units, repeated throughout the crystal.", { compound: c.f });
  }
  var total = c.cat + c.an, k = pick([1, 2, 3, 4]);
  var ans = q === 0 ? total : total * k;
  var prompt = q === 0
    ? "How many ions in total are counted in one formula unit of " + c.f + "?"
    : "How many ions in total are counted in " + k + " formula units of " + c.f + "?";
  var ds2 = [], offs = [1, -1, 2, 3], oi = 0;
  while (ds2.length < 3 && oi < offs.length) { var v = ans + offs[oi++]; if (v > 0 && v !== ans && ds2.indexOf(String(v)) < 0) ds2.push(String(v)); }
  return mcq(prompt, String(ans), ds2, "Read the subscripts in " + c.f + ", taking an unwritten subscript as 1. One formula unit contains " + c.cat + " cation unit or units and " + c.an + " anion unit or units, which is " + total + " ions in total. " + (q === 0 ? "That is the value asked for." : "For " + k + " formula units the total is " + total + " x " + k + " = " + ans + " ions."), { compound: c.f, ask: q });
});

E("u2-35", 2, ["6.7"], 2, "var", varset([
  function () {
    var correct = "Shifting a layer moves positive ions next to positive ions and negative ions next to negative ions, and the resulting repulsion pushes the layers apart";
    var ds = ["Shifting a layer breaks the covalent bonds between the ions, and broken bonds cannot reform", "Shifting a layer frees the electrons in the lattice, and the crystal loses its charge balance", "Shifting a layer melts the crystal from the inside, so it collapses into a liquid"];
    return mcq("An ionic crystal cracks cleanly when it is struck and one layer of ions shifts by one ion spacing. Why does the crystal split instead of bending?", correct, ds, "In the lattice each ion is surrounded by oppositely charged ions, and those attractions hold the layers in place. A shift of one spacing lines up ions of the same charge. Like charges repel strongly, so the layers are pushed apart and the crystal splits along that plane instead of sliding smoothly.", {});
  },
  function () {
    var correct = "The strong attractions act in every direction through the lattice, and a shift brings like charges together, so the layers repel and separate";
    var ds = ["The ions are held in separate molecules, and the molecules are too weak to resist the hammer", "The crystal bends until its metallic bonds stretch and then snap", "The hammer adds electrons to the crystal, and the extra charge blows the layers apart"];
    return mcq("Why are ionic solids brittle rather than malleable when hammered?", correct, ds, "A metal can change shape because its layers of ions can slide within an electron sea. An ionic lattice has no such freedom: its layers are locked by attractions in all directions, and sliding brings positive ions against positive ions and negative ions against negative ions. The repulsion separates the layers, so the solid breaks instead of bending.", {});
  },
  function () {
    var correct = "Along the shifted plane, anions now face anions and cations face cations, so repulsion replaces attraction and the plane becomes a crack";
    var ds = ["Along the shifted plane, every ion becomes neutral, so nothing holds the layers together", "Along the shifted plane, the ions share electron pairs and the crystal becomes a gas", "Along the shifted plane, the ions melt, and the liquid layer lets the crystal fall apart"];
    var q = mcq("A diagram shows one layer of an ionic lattice pushed sideways so that ions no longer alternate in charge along one plane. What happens at that plane, and why?", correct, ds, "Before the shift, each ion along the plane faced oppositely charged neighbours and was attracted to them. After a shift of one ion spacing, the facing ions carry the same charge. Like charges repel, so the attraction across the plane is replaced by repulsion and the crystal cleaves there.", {});
    q.figure = chemShiftedLatticeSVG();
    return q;
  },
  function () {
    var correct = "They cannot slide past each other, because sliding would place ions of the same charge side by side and the repulsion would split the solid";
    var ds = ["They cannot slide because each ion is joined to its neighbours by shared pairs of electrons", "They cannot slide because the ions are far too heavy to move at room temperature", "They cannot slide because the crystal contains no ions, only neutral molecules"];
    return mcq("Layers in a metal can slide when the metal is hammered, but layers in an ionic crystal cannot. What property of the ionic lattice explains the difference?", correct, ds, "In a metal the positive ions sit in a sea of electrons that holds them together in any position, so layers can slide. In an ionic crystal the holding force is attraction between oppositely charged neighbours. Sliding by one spacing puts like charges side by side, and their repulsion breaks the crystal apart.", {});
  },
  function () {
    var correct = "The tap shifts a layer by one ion spacing, like charges come together along a plane, and repulsion splits the crystal cleanly along that plane";
    var ds = ["The tap breaks every ionic bond in the crystal at once, and the pieces fall apart randomly", "The tap knocks the electrons off the ions, leaving neutral atoms that no longer attract", "The tap melts a thin layer of the crystal, and the crystal slides apart while it cools"];
    return mcq("A mineral sample of an ionic compound is tapped with a hammer and splits into flat faced pieces. Which sequence of events explains the clean split?", correct, ds, "A clean, flat split follows the planes of the lattice. The tap moves one layer by a single ion spacing, so ions of the same charge face each other along that plane. Their repulsion drives the two sides apart along the plane, leaving flat faces.", {});
  }
]));

E("u2-36", 2, ["6.7"], 2, "gen", function () {
  var comps = [
    { f: "NaCl", cat: "Na⁺", an: "Cl⁻" }, { f: "MgO", cat: "Mg²⁺", an: "O²⁻" },
    { f: "CaCl₂", cat: "Ca²⁺", an: "Cl⁻" }, { f: "KBr", cat: "K⁺", an: "Br⁻" },
    { f: "NaF", cat: "Na⁺", an: "F⁻" }, { f: "CaO", cat: "Ca²⁺", an: "O²⁻" },
    { f: "KI", cat: "K⁺", an: "I⁻" }, { f: "LiCl", cat: "Li⁺", an: "Cl⁻" },
    { f: "ZnCl₂", cat: "Zn²⁺", an: "Cl⁻" }, { f: "Na₂O", cat: "Na⁺", an: "O²⁻" },
    { f: "BaS", cat: "Ba²⁺", an: "S²⁻" }, { f: "MgCl₂", cat: "Mg²⁺", an: "Cl⁻" },
    { f: "NaBr", cat: "Na⁺", an: "Br⁻" }, { f: "LiF", cat: "Li⁺", an: "F⁻" },
    { f: "MgS", cat: "Mg²⁺", an: "S²⁻" }, { f: "CaF₂", cat: "Ca²⁺", an: "F⁻" },
    { f: "Al₂O₃", cat: "Al³⁺", an: "O²⁻" }, { f: "SrCl₂", cat: "Sr²⁺", an: "Cl⁻" },
    { f: "Na₂S", cat: "Na⁺", an: "S²⁻" }, { f: "MgF₂", cat: "Mg²⁺", an: "F⁻" }
  ];
  var c = pick(comps), q = pick([0, 1, 2]);
  var correct, ds;
  if (q === 0) {
    correct = "Negative " + c.an + " ions, because every cation in the lattice is surrounded by anions";
    ds = ["Positive " + c.cat + " ions, because ions of the same charge pack together in the lattice", "Neutral " + c.f + " molecules, because the lattice is built from molecules", "Free electrons, because the space around a cation is filled by an electron sea"];
  } else if (q === 1) {
    correct = "Strong attractions to oppositely charged ions act on it from every direction";
    ds = ["A single covalent bond to one neighbouring ion holds it in place", "Gravity alone holds it in place, since ions do not attract each other", "Attractions to ions of the same charge act on it from every direction"];
  } else {
    correct = "If a layer shifts by one ion spacing, " + c.cat + " ions can come to face " + c.cat + " ions and the repulsion can split the crystal";
    ds = ["If a layer shifts by one ion spacing, the ions become neutral and the crystal dissolves", "If a layer shifts by one ion spacing, the ions share electrons and the crystal becomes malleable", "A layer can never shift, because ionic crystals contain no layers of ions"];
  }
  return mcq("Consider the lattice of " + c.f + ", built from " + c.cat + " and " + c.an + " ions. " + (q === 0 ? "Which particles directly surround one " + c.cat + " ion in the lattice?" : q === 1 ? "What holds one ion in its place in the lattice?" : "Which statement about shifting layers in this lattice is correct?"), correct, shuffle(ds.filter(function (x) { return x !== correct; })).slice(0, 3), "In the " + c.f + " lattice the ions alternate: every " + c.cat + " ion is surrounded by " + c.an + " ions and every " + c.an + " ion is surrounded by " + c.cat + " ions. Attractions act in all directions and hold each ion in place. A shift of one spacing breaks that pattern and brings like charges together, which is why ionic crystals are brittle.", { compound: c.f, ask: q });
});

// 6.8 Properties of ionic substances
E("u2-37", 2, ["6.8"], 1, "gen", function () {
  var comps = [
    { f: "NaCl", mp: 801 }, { f: "MgO", mp: 2852 }, { f: "CaCl₂", mp: 772 }, { f: "KBr", mp: 734 },
    { f: "NaF", mp: 993 }, { f: "CaO", mp: 2613 }, { f: "Al₂O₃", mp: 2072 }, { f: "KI", mp: 681 },
    { f: "LiCl", mp: 605 }, { f: "BaO", mp: 1923 }, { f: "NaBr", mp: 747 }, { f: "MgCl₂", mp: 714 }
  ];
  var c = pick(comps), q = pick([0, 1]);
  if (q === 0) {
    var correct = "A great deal of energy is needed to overcome the strong attractions between ions throughout the lattice";
    var ds = shuffle([
      "Its molecules are unusually large, so they need more heat to start moving",
      "The covalent bonds inside its molecules are the strongest bonds known",
      "Its free electrons absorb heat and hold the solid together up to high temperatures",
      "It contains heavy atoms, and heavy atoms always need high temperatures to melt"
    ].filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq(c.f + " melts at " + c.mp + " °C. Why is the melting point of this ionic compound so high?", correct, ds, "Melting an ionic compound means giving its ions enough energy to break free from the lattice. Every ion in " + c.f + " is attracted to oppositely charged neighbours in all directions, so a very large amount of energy is needed, which is why the melting point is " + c.mp + " °C.", { compound: c.f });
  }
  var t = pick([100, 200, 300, 400, 500]);
  var correct1 = "It is still a solid, because " + t + " °C is well below its melting point of " + c.mp + " °C";
  var ds1 = shuffle([
    "It is a liquid, because all ionic compounds melt below 500 °C",
    "It is a gas, because heating any solid to " + t + " °C turns it into a gas",
    "It has dissolved, because heating a solid is the same as dissolving it"
  ].filter(function (x) { return x !== correct1; })).slice(0, 3);
  return mcq("A sample of " + c.f + ", which melts at " + c.mp + " °C, is heated to " + t + " °C. What is its state, and why?", correct1, ds1, "Compare the temperature reached with the melting point. The sample at " + t + " °C has not reached " + c.mp + " °C, so its ions still lack the energy to leave the lattice and " + c.f + " remains a solid.", { compound: c.f, temp: t });
});

E("u2-38", 2, ["6.8"], 2, "gen", function () {
  var comps = ["NaCl", "KBr", "CaCl₂", "MgO", "NaF", "KI", "LiCl", "NaBr", "MgCl₂", "CaO", "KCl", "BaCl₂"];
  var states = [
    { st: "solid", conducts: false, why: "its ions are locked in fixed positions in the lattice and cannot move to the electrodes" },
    { st: "molten", conducts: true, why: "melting frees its ions from the lattice, so they can move and carry charge" },
    { st: "aqueous solution", conducts: true, why: "dissolving separates its ions and surrounds them with water, so they can move and carry charge" }
  ];
  var c = pick(comps), s = pick(states), q = pick([0, 1]);
  if (q === 0) {
    var correct = s.conducts ? "It conducts, because its ions are free to move and carry charge" : "It does not conduct, because its ions cannot move";
    var ds = shuffle([
      s.conducts ? "It does not conduct, because its ions cannot move" : "It conducts, because its ions are free to move and carry charge",
      "It conducts, because its molecules split into atoms that carry the current",
      "It conducts only if a metal wire is dissolved in it as well",
      "It never conducts in any state, because ionic compounds contain no charged particles"
    ].filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("A sample of the ionic compound " + c + " is in the " + s.st + " state. Which statement about its electrical conductivity is correct?", correct, ds, "Ionic compounds contain charged particles in every state, but current flows only when those ions can move. For " + c + " in the " + s.st + " state, " + s.why + ". Solid ionic compounds never conduct, while molten and dissolved ionic compounds do.", { compound: c, state: s.st });
  }
  var correct1 = "It does not conduct in the solid state, because " + s.why;
  if (s.st !== "solid") correct1 = "It conducts in the " + s.st + " state, because " + s.why;
  var others = [
    "It conducts in every state, because ions carry charge even when they cannot move",
    "It never conducts, because melting or dissolving destroys its ions",
    "It conducts as a solid, because its lattice acts like a metal wire",
    "It conducts only as a gas, because gases contain free electrons"
  ];
  var ds1 = shuffle(others.filter(function (x) { return x !== correct1; })).slice(0, 3);
  return mcq("Which statement correctly explains the conductivity behaviour of " + c + " in the " + s.st + " state?", correct1, ds1, "The key question is whether the ions can move. For " + c + " in the " + s.st + " state, " + s.why + ". That is why ionic solids are insulators while their melts and solutions are conductors.", { compound: c, state: s.st });
});

E("u2-39", 2, ["6.8"], 2, "gen", function () {
  var comps = ["sodium chloride", "magnesium oxide", "calcium chloride", "potassium bromide", "sodium fluoride", "potassium iodide", "lithium chloride", "barium oxide", "sodium bromide", "magnesium chloride"];
  var acts = ["struck with a hammer", "dropped on a hard floor", "squeezed in a clamp", "hit with a chisel"];
  var c = pick(comps), a = pick(acts), q = pick([0, 1]);
  if (q === 0) {
    var correct = "It shatters, because shifting layers bring ions of the same charge together and they repel";
    var ds = shuffle([
      "It bends into a new shape, because its layers slide easily over each other",
      "It stretches into a wire, because its ions are held in an electron sea",
      "It dents softly, because weak forces between its molecules let them move aside"
    ].filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("A crystal of " + c + " is " + a + ". What happens, and why?", correct, ds, "Ionic crystals are brittle. The blow shifts a layer of ions by about one spacing, which lines up positive ions with positive ions and negative ions with negative ions. The repulsion between like charges pushes the layers apart, so " + c + " shatters instead of changing shape.", { compound: c });
  }
  var correct1 = "Brittle, because its lattice layers cannot slide without bringing like charges together";
  var ds1 = shuffle([
    "Malleable, because its ions sit in a sea of electrons that lets layers slide",
    "Soft, because only weak attractions between molecules hold it together",
    "Flexible, because its ions are joined in long chains that can bend"
  ].filter(function (x) { return x !== correct1; })).slice(0, 3);
  return mcq("Which word and reason correctly describe the mechanical behaviour of solid " + c + " when it is " + a + "?", correct1, ds1, "The lattice of " + c + " holds each ion with attractions in every direction. Layers cannot slide to a new stable position, because a shift of one spacing puts like charges together and they repel. The solid is therefore brittle and breaks rather than bending.", { compound: c });
});

E("u2-40", 2, ["6.8"], 2, "gen", function () {
  var comps = ["sodium chloride", "potassium nitrate", "sodium nitrate", "potassium chloride", "ammonium chloride", "magnesium sulfate", "calcium chloride", "potassium bromide", "sodium bromide", "lithium chloride"];
  var solvents = [
    { sv: "water", good: true, why: "water molecules are polar and attract the ions strongly, pulling them out of the lattice and surrounding them" },
    { sv: "hexane", good: false, why: "hexane molecules are nonpolar and cannot attract the ions strongly enough to pull them out of the lattice" },
    { sv: "cooking oil", good: false, why: "oil molecules are nonpolar and cannot attract the ions strongly enough to pull them out of the lattice" },
    { sv: "gasoline", good: false, why: "gasoline molecules are nonpolar and cannot attract the ions strongly enough to pull them out of the lattice" }
  ];
  var c = pick(comps), s = pick(solvents), q = pick([0, 1]);
  if (q === 0) {
    var correct = s.good ? "It dissolves readily, because " + s.why : "It stays mostly undissolved, because " + s.why;
    var ds = shuffle([
      s.good ? "It stays mostly undissolved, because " + s.why : "It dissolves readily, because " + s.why,
      "It dissolves readily in every solvent, because ionic compounds dissolve in all liquids",
      "It reacts with the solvent and turns into a metal and a gas",
      "It dissolves only after the solvent is boiled for several hours"
    ].filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("A spoonful of " + c + " is stirred into " + s.sv + ". What is expected to happen, and why?", correct, ds, "An ionic compound dissolves when the solvent can attract its ions strongly enough to replace the attractions in the lattice. For " + c + " in " + s.sv + ", " + s.why + ". Polar water dissolves many ionic compounds, while nonpolar solvents generally cannot.", { compound: c, solvent: s.sv });
  }
  var correct1 = "Water, because its polar molecules attract cations and anions and pull them from the lattice into solution";
  var ds1 = shuffle([
    "Hexane, because its nonpolar molecules attract ions more strongly than water does",
    "Cooking oil, because ions dissolve best in solvents that carry no partial charges",
    "Gasoline, because it evaporates fastest and carries the ions away with it"
  ].filter(function (x) { return x !== correct1; })).slice(0, 3);
  return mcq("Which solvent is the best choice for dissolving " + c + ", and why?", correct1, ds1, "The negative ends of water molecules attract the cations of " + c + " and the positive ends attract its anions. These attractions compete with the lattice attractions and surround each ion, carrying it into solution. Nonpolar solvents cannot attract ions in this way.", { compound: c });
});

E("u2-41", 2, ["6.8"], 3, "gen", function () {
  var comps = ["rubidium chloride", "strontium oxide", "caesium fluoride", "barium bromide", "strontium chloride", "rubidium iodide", "caesium chloride", "barium fluoride", "strontium sulfide", "rubidium bromide", "strontium nitrate", "barium iodide", "caesium bromide", "strontium bromide", "rubidium fluoride", "barium chloride"];
  var c = pick(comps), q = pick([0, 1, 2, 3]);
  var props = [
    { p: "melting point", correct: "High, because strong attractions between ions throughout its lattice take a great deal of energy to overcome", wrong: ["Low, because only weak attractions between its molecules need to be overcome", "Low, because its ions are free to move at room temperature", "About the same as a molecular solid of similar mass, because all solids melt alike"] },
    { p: "conductivity as a solid", correct: "It does not conduct, because its ions are locked in the lattice and cannot move", wrong: ["It conducts well, because its ions move freely through the solid", "It conducts well, because it contains a sea of free electrons", "It conducts, because all substances that contain ions conduct in every state"] },
    { p: "conductivity when molten", correct: "It conducts, because melting frees its ions to move and carry charge", wrong: ["It does not conduct, because melting destroys its ions", "It conducts only after it has been turned into a gas", "It does not conduct, because molten substances contain only neutral molecules"] },
    { p: "response to a hammer blow", correct: "It is brittle and shatters, because shifting layers bring like charges together and they repel", wrong: ["It is malleable and flattens, because its layers slide easily over each other", "It dents softly, because weak forces between its molecules let them move aside", "It stretches into a wire, because its ions sit in an electron sea"] }
  ];
  var pr = props[q];
  return mcq("A compound not studied in class, " + c + ", is confirmed to be ionic, with a lattice of oppositely charged ions. Predict its " + pr.p + ".", pr.correct, shuffle(pr.wrong.slice()).slice(0, 3), "Every property here follows from the lattice model. Ionic lattices have strong attractions in all directions, ions that cannot move in the solid but can move when molten, and layers that repel when shifted into like charge alignment. Applying that model to " + c + " gives the prediction stated in the correct option.", { compound: c, property: pr.p });
});

// 6.9 Metallic bonds
E("u2-42", 2, ["6.9"], 1, "gen", function () {
  var metals = ["iron", "copper", "aluminium", "sodium", "gold", "zinc", "lead", "silver", "nickel", "tin", "magnesium", "titanium"];
  var objs = ["a wire", "a coin", "a cooking pan", "a foil sheet", "a nail", "a bracelet"];
  var m = pick(metals), o = pick(objs), q = pick([0, 1, 2]);
  var correct, ds;
  if (q === 0) {
    correct = "Positive metal ions sit in a regular arrangement surrounded by delocalized electrons that move through the whole piece";
    ds = ["Neutral metal atoms are joined in separate molecules held together by weak forces", "Positive and negative metal ions alternate in a lattice like an ionic compound", "Metal atoms share fixed pairs of electrons with their nearest neighbours only"];
  } else if (q === 1) {
    correct = "Electrons that are not tied to any one atom and can move throughout the structure";
    ds = ["Electrons that have been lost from the sample completely during refining", "Electrons locked inside the nucleus of each metal atom", "Electrons shared by exactly two atoms in a single covalent bond"];
  } else {
    correct = "The attraction between the positive ions and the surrounding delocalized electrons, acting in every direction";
    ds = ["The attraction between positive ions and negative ions in alternating positions", "The shared electron pairs in the covalent bonds between neighbouring atoms", "The weak dispersion forces between separate metal molecules"];
  }
  return mcq("The electron sea model is used to describe the metal in " + o + " made of " + m + ". " + (q === 0 ? "Which statement describes the structure of the metal?" : q === 1 ? "What does the term delocalized electrons mean in this model?" : "What holds the particles of the metal together?"), correct, shuffle(ds.filter(function (x) { return x !== correct; })).slice(0, 3), "In the electron sea model for " + m + ", the outer electrons of the atoms are delocalized: they belong to the whole structure rather than to one atom. The metal is a lattice of positive ions held together by their attraction to this mobile sea of electrons in every direction.", { metal: m, ask: q });
});

E("u2-43", 2, ["6.9"], 2, "gen", function () {
  var metals = ["copper", "aluminium", "iron", "silver", "gold", "zinc", "nickel", "tin", "lead", "magnesium", "titanium", "sodium"];
  var ctxs = ["used as an electrical cable", "used as an electrode in a circuit", "wound into a heating element coil", "used as a bus bar carrying current", "used as a contact in a switch", "drawn into a long power line"];
  var m = pick(metals), ctx = pick(ctxs), q = pick([0, 1]);
  if (q === 0) {
    var correct = "Its delocalized electrons are free to move through the solid and carry the charge";
    var ds = shuffle([
      "Its positive ions roll through the solid from one end to the other",
      "Its atoms split into ions whenever a battery is connected",
      "Its covalent bonds vibrate and pass charge from atom to atom",
      "It conducts only because it is always coated with a layer of salt water"
    ].filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq(m.charAt(0).toUpperCase() + m.slice(1) + " is " + ctx + ". Why does this metal conduct electricity in the solid state?", correct, ds, "A current needs mobile charged particles. In solid " + m + " the positive ions are fixed in the lattice, but the delocalized electrons move freely through the whole piece. When a voltage is applied, these electrons drift and carry the charge, which is why metals conduct as solids, unlike ionic solids.", { metal: m });
  }
  var correct1 = "The moving particles are the delocalized electrons, while the positive ions stay in their lattice positions";
  var ds1 = shuffle([
    "The moving particles are the positive ions, while the electrons stay fixed to their atoms",
    "Both the ions and the electrons leave the metal and travel through the external wires",
    "The moving particles are neutral atoms that evaporate from the surface",
    "No particles move at all, because charge travels through empty space inside the metal"
  ].filter(function (x) { return x !== correct1; })).slice(0, 3);
  return mcq("When " + m + " is " + ctx + " and a current flows, which particles move through the metal?", correct1, ds1, "In the electron sea model the ions of " + m + " are locked in their lattice positions, and the sea of delocalized electrons moves around them. A current is a drift of those electrons through the metal, not a movement of the ions or atoms.", { metal: m });
});

E("u2-44", 2, ["6.9"], 2, "gen", function () {
  var metals = ["copper", "aluminium", "iron", "gold", "silver", "zinc", "tin", "lead", "nickel", "magnesium"];
  var procs = ["hammered into a thin sheet", "drawn out into a wire", "rolled into foil", "bent into a bracket", "stamped into a coin", "folded into a tray"];
  var m = pick(metals), p = pick(procs), q = pick([0, 1]);
  if (q === 0) {
    var correct = "Layers of positive ions slide over each other while the delocalized electrons keep holding the layers together in their new positions";
    var ds = shuffle([
      "The metal melts under the hammer and then freezes again in the new shape",
      "Its atoms break apart and recombine in a different chemical compound",
      "Layers of ions slide, and like charges repel so the metal splits cleanly",
      "Its molecules are soft, so they squash flat under pressure and stay that way"
    ].filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("A piece of " + m + " is " + p + " without breaking. Which statement explains this malleability?", correct, ds, "In " + m + " the positive ions are held together by the electron sea in all directions, not by attractions to specific neighbours. When a layer of ions slides, the delocalized electrons still surround the ions and hold the layers together in the new arrangement, so the metal changes shape instead of shattering like an ionic crystal.", { metal: m, proc: p });
  }
  var correct1 = "It keeps conducting, because the delocalized electrons can still move through the reshaped metal";
  var ds1 = shuffle([
    "It stops conducting, because bending uses up all of its free electrons",
    "It keeps conducting only if it is melted and cast again in the new shape",
    "It becomes an insulator, because sliding layers turn it into an ionic solid",
    "It conducts only along the direction in which it was hammered, and never across it"
  ].filter(function (x) { return x !== correct1; })).slice(0, 3);
  return mcq("After a piece of " + m + " has been " + p + ", what happens to its ability to conduct electricity, and why?", correct1, ds1, "Changing the shape of " + m + " slides layers of ions but does not remove the electron sea. The delocalized electrons remain free to move through the whole piece in its new shape, so the reshaped metal still conducts electricity.", { metal: m, proc: p });
});

E("u2-45", 2, ["6.9"], 2, "var", varset([
  function () {
    var correct = "Atoms of a different size disrupt the regular layers, so the layers cannot slide as easily and the alloy is harder than the pure metal";
    var ds = ["The second metal removes electrons from the alloy, leaving a rigid ionic lattice", "The second metal forms covalent molecules inside the alloy that block all movement", "Alloys are softer than pure metals, because mixing always weakens a structure"];
    return mcq("Brass is an alloy of copper and zinc. It is harder than pure copper. Why does adding zinc make the metal harder?", correct, ds, "In a pure metal the ions are all the same size and sit in regular layers that slide fairly easily. Zinc atoms have a different size from copper atoms, so they distort the layers of the brass. Distorted layers cannot slide past each other as readily, which makes the alloy harder while it stays metallic.", {});
  },
  function () {
    var correct = "Carbon atoms sit in the gaps of the iron structure and disrupt its layers, making it harder for the layers to slide";
    var ds = ["Carbon reacts with all of the iron to form a brittle ionic compound with no metallic character", "Carbon removes the electron sea, and the steel is held together by covalent bonds instead", "Steel is harder because it contains more electrons per atom than iron does"];
    return mcq("Steel is an alloy of iron with a small amount of carbon. It is harder than pure iron. Which statement explains this?", correct, ds, "Pure iron has regular layers of same sized ions that can slide. The much smaller carbon atoms fit into gaps in the iron structure and distort the layers around them. With the layers disrupted, sliding is harder, so steel is harder and stronger than pure iron while still behaving as a metal.", {});
  },
  function () {
    var correct = "Bronze is still a metal: it has positive ions in a sea of delocalized electrons, so it conducts electricity and can be shaped";
    var ds = ["Bronze is an ionic compound, so it conducts only when molten", "Bronze is a molecular substance, so it is soft and does not conduct in any state", "Bronze conducts because the tin in it forms negative ions that move through the solid"];
    return mcq("Bronze is an alloy of copper and tin, used for bells and fittings. Which statement about bronze is correct?", correct, ds, "Mixing two metals gives an alloy, which keeps the metallic structure: positive ions of both metals in a shared sea of delocalized electrons. Bronze therefore conducts electricity, is malleable and has the hardness that comes from its disrupted layers.", {});
  },
  function () {
    var correct = "Mixing a second metal changes the structure, in this case giving a mixture that melts at a lower temperature than either pure metal alone";
    var ds = ["Solder melts lower because it is an ionic compound, and ionic compounds melt at low temperatures", "Solder melts lower because its covalent bonds are the weakest bonds known", "Solder is not really a metal, because it is mostly a molecular substance"];
    return mcq("Solder is an alloy used to join wires. It melts at a lower temperature than the pure metals it is made from. Which statement about alloys does this illustrate?", correct, ds, "An alloy is a mixture of metals, and its properties differ from the pure metals in it. Disrupting the regular structure changes melting behaviour as well as hardness. Solder is chosen because its lower melting point lets it melt and join wires without melting the wires themselves.", {});
  },
  function () {
    var correct = "The alloy keeps a sea of delocalized electrons, so it still conducts, and its disrupted layers make it harder than the pure metal";
    var ds = ["The alloy stops conducting, because two kinds of ions cannot share one electron sea", "The alloy becomes brittle like an ionic solid, because it contains two kinds of atoms", "The alloy conducts only in solution, because its ions must be free to move"];
    return mcq("An engineer replaces a pure metal part with an alloy of the same metal and a second metal. Which pair of predictions is correct?", correct, ds, "An alloy is still a metal, with positive ions in a sea of delocalized electrons, so it still conducts electricity in the solid state. The different sized atoms disrupt the regular layers, so sliding is harder and the alloy is usually harder than the pure metal.", {});
  },
  function () {
    var correct = "Sterling silver is mostly silver with some copper mixed in, which disrupts the layers and makes the jewellery harder while keeping the metallic shine and conductivity";
    var ds = ["Sterling silver is a compound of silver and copper ions joined by ionic bonds", "Sterling silver is harder because the copper turns the silver into a molecular solid", "Sterling silver contains no delocalized electrons, which is why it is harder"];
    return mcq("Sterling silver, used for jewellery, is silver alloyed with a small amount of copper. Which statement explains why jewellers prefer it to pure silver?", correct, ds, "Pure silver is quite soft because its regular layers of ions slide easily. Adding copper mixes in atoms of a different size, disrupting the layers of the sterling silver and making it harder and more durable. It remains a metal, with delocalized electrons giving it shine and conductivity.", {});
  }
]));

// 6.10 The dissolving process
E("u2-46", 2, ["6.10"], 1, "gen", function () {
  var pairs = [
    { su: "sugar", sv: "water" }, { su: "sodium chloride", sv: "water" }, { su: "ethanol", sv: "water" },
    { su: "potassium nitrate", sv: "water" }, { su: "glucose", sv: "water" }, { su: "iodine", sv: "hexane" },
    { su: "cooking oil", sv: "hexane" }, { su: "ammonium chloride", sv: "water" }, { su: "wax", sv: "gasoline" },
    { su: "methanol", sv: "water" }, { su: "naphthalene", sv: "hexane" }, { su: "sodium nitrate", sv: "water" },
    { su: "grease", sv: "gasoline" }, { su: "urea", sv: "water" }, { su: "magnesium sulfate", sv: "water" },
    { su: "acetone", sv: "water" }, { su: "potassium chloride", sv: "water" }, { su: "paint resin", sv: "paint thinner" },
    { su: "calcium chloride", sv: "water" }, { su: "benzoic acid in a suitable organic solvent", sv: "ethanol" }
  ];
  var p = pick(pairs), temp = pick([15, 20, 25, 30, 35]), q = pick([0, 1, 2]);
  var correct, ds;
  if (q === 0) {
    correct = "Attractions between particles of the " + p.su + " are broken, attractions between particles of the " + p.sv + " are broken, and new attractions form between the solute and the solvent";
    ds = ["Only attractions between particles of the " + p.su + " are broken, and no new attractions form at all", "The covalent or ionic bonds inside the solute particles are broken and the atoms spread out separately", "The solvent particles join the solute particles to form one new compound with a new formula"];
  } else if (q === 1) {
    correct = "The particles of " + p.su + " separate from each other and become surrounded by particles of " + p.sv;
    ds = ["The particles of " + p.su + " melt, and the liquid solute sinks to the bottom of the container", "The particles of " + p.su + " disappear, because dissolving destroys matter", "The particles of " + p.sv + " are absorbed into the solute until the solute doubles in size"];
  } else {
    correct = "Forming new attractions between solute particles and solvent particles, which helps pay the energy cost of separating the original particles";
    ds = ["Breaking the bonds inside each solute molecule, which releases the atoms into the solvent", "Heating the solvent until it boils, which is the only way dissolving can occur", "Stirring the mixture, which is the step that supplies all of the energy for dissolving"];
  }
  return mcq("A sample of " + p.su + " is dissolving in " + p.sv + " at " + temp + " °C. " + (q === 0 ? "Which statement describes the attractions during dissolving?" : q === 1 ? "Which statement describes what happens to the solute particles?" : "Which step helps make dissolving energetically possible?"), correct, shuffle(ds.filter(function (x) { return x !== correct; })).slice(0, 3), "Dissolving is a rearrangement of attractions. Particles of " + p.su + " separate from each other and particles of " + p.sv + " move apart, which costs energy, while new solute to solvent attractions form and release energy. The particles themselves stay whole: no bonds inside a molecule are broken and no new compound is made.", { solute: p.su, solvent: p.sv, ask: q });
});

E("u2-47", 2, ["6.10"], 2, "gen", function () {
  var pairs = [
    { su: "sugar", sv: "water" }, { su: "sodium chloride", sv: "water" }, { su: "ethanol", sv: "water" },
    { su: "potassium nitrate", sv: "water" }, { su: "glucose", sv: "water" }, { su: "iodine", sv: "hexane" },
    { su: "cooking oil", sv: "hexane" }, { su: "ammonium chloride", sv: "water" }, { su: "wax", sv: "gasoline" },
    { su: "methanol", sv: "water" }, { su: "naphthalene", sv: "hexane" }, { su: "sodium nitrate", sv: "water" },
    { su: "grease", sv: "gasoline" }, { su: "urea", sv: "water" }, { su: "magnesium sulfate", sv: "water" },
    { su: "acetone", sv: "water" }, { su: "potassium chloride", sv: "water" }, { su: "calcium chloride", sv: "water" },
    { su: "sodium hydroxide pellets", sv: "water" }, { su: "citric acid", sv: "water" }
  ];
  var p = pick(pairs), q = pick([0, 1, 2, 3]);
  var correct, ds, ask;
  if (q === 0) {
    ask = "Which attractions are broken on the solute side during dissolving?";
    correct = "The attractions between neighbouring particles of " + p.su;
    ds = ["The bonds inside each particle of " + p.su, "The attractions between the container and the " + p.su, "No attractions at all are broken on the solute side"];
  } else if (q === 1) {
    ask = "Which attractions are broken on the solvent side during dissolving?";
    correct = "Some of the attractions between neighbouring particles of " + p.sv;
    ds = ["The bonds inside each molecule of " + p.sv, "The attractions between the " + p.sv + " and the air above it only", "No attractions at all are broken on the solvent side"];
  } else if (q === 2) {
    ask = "Which attractions form during dissolving?";
    correct = "New attractions between particles of " + p.su + " and particles of " + p.sv;
    ds = ["New covalent bonds that join " + p.su + " and " + p.sv + " into one compound", "New attractions between the solute particles and the glass of the container", "Attractions between the solute particles and the air above the mixture"];
  } else {
    ask = "Which bonds remain intact when " + p.su + " dissolves in " + p.sv + "?";
    correct = "The bonds inside each molecule or particle of " + p.su + " and of " + p.sv;
    ds = ["Only the attractions between solute particles remain intact", "Every bond and attraction in both substances remains intact", "No bonds of any kind remain intact once dissolving starts"];
  }
  return mcq("When " + p.su + " dissolves in " + p.sv + ", changes happen to the attractions in the mixture. " + ask, correct, shuffle(ds.filter(function (x) { return x !== correct; })).slice(0, 3), "Separate the two kinds of forces. Attractions between particles (intermolecular forces, or the lattice attractions in an ionic solute) are broken on both sides and replaced by new solute to solvent attractions. Bonds inside a particle (intramolecular bonds) are far stronger and stay intact, so dissolved particles keep their identity.", { solute: p.su, solvent: p.sv, ask: q });
});

E("u2-48", 2, ["6.10"], 2, "gen", function () {
  var comps = [
    { f: "sodium chloride", cat: "Na⁺", an: "Cl⁻" }, { f: "potassium nitrate", cat: "K⁺", an: "NO₃⁻" },
    { f: "magnesium sulfate", cat: "Mg²⁺", an: "SO₄²⁻" }, { f: "calcium chloride", cat: "Ca²⁺", an: "Cl⁻" },
    { f: "ammonium chloride", cat: "NH₄⁺", an: "Cl⁻" }, { f: "sodium nitrate", cat: "Na⁺", an: "NO₃⁻" },
    { f: "potassium chloride", cat: "K⁺", an: "Cl⁻" }, { f: "lithium chloride", cat: "Li⁺", an: "Cl⁻" },
    { f: "sodium bromide", cat: "Na⁺", an: "Br⁻" }, { f: "potassium sulfate", cat: "K⁺", an: "SO₄²⁻" }
  ];
  var grams = pick([5, 10, 15, 20, 25]), temp = pick([15, 20, 25, 30]);
  var c = pick(comps), q = pick([0, 1, 2]);
  var correct, ds;
  if (q === 0) {
    correct = "The oxygen ends of water molecules face the " + c.cat + " cations, and the hydrogen ends face the " + c.an + " anions";
    ds = ["The hydrogen ends of water molecules face both the cations and the anions", "The oxygen ends of water molecules face both the cations and the anions", "Water molecules keep their distance, because ions and water molecules do not attract each other"];
  } else if (q === 1) {
    correct = "Attractions between water molecules and the ions compete with the attractions in the lattice and pull ions away one by one";
    ds = ["Water molecules melt the surface of the solid, and the liquid compound mixes with the water", "Water molecules break the ions into neutral atoms, which then mix with the water", "The ions dissolve because they evaporate from the surface of the warm solid"];
  } else {
    correct = "Each dissolved ion becomes surrounded by a shell of water molecules, a process called hydration";
    ds = ["Each dissolved ion reacts with water to form a new neutral molecule", "Each dissolved ion collects a shell of other ions of the same charge", "Each dissolved ion loses its charge permanently when it enters the water"];
  }
  return mcq(grams + " g of " + c.f + " is stirred into water at " + temp + " °C and dissolves. " + (q === 0 ? "How do the water molecules arrange themselves around the ions?" : q === 1 ? "Why can water pull the ions out of the lattice?" : "What is the arrangement of water around a dissolved ion called, in descriptive terms?"), correct, shuffle(ds.filter(function (x) { return x !== correct; })).slice(0, 3), "Water is polar: its oxygen end carries a partial negative charge and its hydrogen ends carry partial positive charges. Oxygen ends attract cations such as " + c.cat + " and hydrogen ends attract anions such as " + c.an + ". These attractions compete with the lattice attractions of " + c.f + ", pull ions free, and surround each ion with water in hydration shells.", { compound: c.f, ask: q });
});

E("u2-49", 2, ["6.10"], 2, "gen", function () {
  var oils = ["olive oil", "canola oil", "mineral oil", "motor oil", "coconut oil", "sesame oil"];
  var nonpolars = ["hexane", "gasoline", "wax shavings", "grease", "naphthalene", "turpentine"];
  var ctxs = ["in a salad dressing bottle", "after an oil spill reaches a pond", "in a beaker during a mixing test", "when washing a greasy pan with plain water", "in a jar left standing on a shelf", "in a measuring cup after rinsing with water only", "on the surface of a rain puddle"];
  var o = pick(oils), np = pick(nonpolars), ctx = pick(ctxs), q = pick([0, 1]);
  if (q === 0) {
    var correct = "The molecules of " + o + " are nonpolar and water molecules are polar, so water molecules attract each other far more strongly than they attract the molecules of " + o;
    var ds = shuffle([
      "Oil and water repel because oil molecules carry a full negative charge",
      "Oil molecules are too large to fit between water molecules, whatever their polarity",
      "Water molecules cannot form any attractions, so nothing can mix with water",
      "Oil dissolves in water at first, but the solution separates again as it cools"
    ].filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("Oil and water do not mix, as seen " + ctx + ". Why?", correct, ds, "Mixing needs the new attractions formed to replace the ones broken. Water molecules hydrogen bond strongly to each other. Oil molecules are nonpolar and can offer water only weak dispersion attractions, so water molecules stay with each other and the oil is pushed into a separate layer.", { oil: o });
  }
  var correct1 = np + " dissolves in oil, because both are nonpolar and their molecules attract each other in a similar way";
  var ds1 = shuffle([
    np + " dissolves in water, because water dissolves every substance given enough stirring",
    np + " dissolves in neither, because nonpolar substances cannot dissolve in anything",
    np + " dissolves in water better than in oil, because water has the strongest attractions of any solvent",
    np + " dissolves in oil only after its covalent bonds are broken by the oil"
  ].filter(function (x) { return x !== correct1; })).slice(0, 3);
  return mcq("A student tests the nonpolar substance " + np + " with two solvents, oil and water, " + ctx + ". Which prediction is correct?", correct1, ds1, "Like dissolves like. " + np + " is nonpolar, so it mixes with the nonpolar oil, where dispersion attractions between the molecules can replace the attractions broken on each side. In water it would have to break strong hydrogen bonds and gain only weak attractions in return, so it stays undissolved.", { substance: np });
});

E("u2-50", 2, ["6.10"], 3, "gen", function () {
  var solutes = [
    { f: "sugar", pol: true }, { f: "ethanol", pol: true }, { f: "glucose", pol: true }, { f: "acetone", pol: true },
    { f: "urea", pol: true }, { f: "methanol", pol: true }, { f: "citric acid", pol: true }, { f: "glycerol", pol: true },
    { f: "iodine", pol: false }, { f: "cooking oil", pol: false }, { f: "hexane", pol: false }, { f: "wax", pol: false },
    { f: "gasoline", pol: false }, { f: "naphthalene", pol: false }, { f: "grease", pol: false }, { f: "sulfur", pol: false }
  ];
  var solvents = [
    { f: "water", pol: true }, { f: "ethanol", pol: true }, { f: "methanol", pol: true },
    { f: "hexane", pol: false }, { f: "cooking oil", pol: false }, { f: "toluene", pol: false }
  ];
  var su = pick(solutes), q = pick([0, 1]);
  if (q === 0) {
    var sv = pick(solvents), ok = su.pol === sv.pol;
    var correct = ok
      ? "It dissolves readily, because solute and solvent are both " + (su.pol ? "polar" : "nonpolar") + ", so the new attractions formed can replace the attractions broken"
      : "It stays mostly undissolved, because the solute is " + (su.pol ? "polar" : "nonpolar") + " and the solvent is " + (sv.pol ? "polar" : "nonpolar") + ", so the new attractions formed are too weak to replace the attractions broken";
    var ds = shuffle([
      ok ? "It stays mostly undissolved, because a solute can never dissolve in a solvent of the same type" : "It dissolves readily, because every solute dissolves in every solvent with enough stirring",
      "It dissolves only after its internal covalent bonds are broken by the solvent",
      "It reacts with the solvent to form a new compound with a new formula",
      "It dissolves readily in every case, because dissolving never depends on polarity"
    ].filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("Predict what happens when " + su.f + ", a " + (su.pol ? "polar" : "nonpolar") + " substance, is stirred into " + sv.f + ", a " + (sv.pol ? "polar" : "nonpolar") + " solvent.", correct, ds, "Use the like dissolves like rule. Dissolving works when the attractions formed between solute and solvent can replace the attractions broken in each pure substance. Here the solute is " + (su.pol ? "polar" : "nonpolar") + " and the solvent is " + (sv.pol ? "polar" : "nonpolar") + ", so the prediction follows from whether their types match.", { solute: su.f, solvent: sv.f });
  }
  var good = solvents.filter(function (x) { return x.pol === su.pol; });
  var bad = solvents.filter(function (x) { return x.pol !== su.pol; });
  var correctSv = pick(good).f;
  var ds2 = bad.map(function (x) { return x.f; });
  return mcq("Which solvent will dissolve " + su.f + ", a " + (su.pol ? "polar" : "nonpolar") + " substance, most readily?", correctSv, ds2, "Choose a solvent of the same type as the solute, so that solute to solvent attractions can replace the attractions broken during dissolving. " + su.f + " is " + (su.pol ? "polar" : "nonpolar") + ", and of the options only " + correctSv + " is of the matching type, following the rule that like dissolves like.", { solute: su.f, solvent: correctSv });
});

// 6.11 Molar solubility
E("u2-51", 2, ["6.11"], 2, "gen", function () {
  var salts = [
    { f: "NaCl", comp: [["Na", 1], ["Cl", 1]] }, { f: "KCl", comp: [["K", 1], ["Cl", 1]] },
    { f: "KBr", comp: [["K", 1], ["Br", 1]] }, { f: "NaBr", comp: [["Na", 1], ["Br", 1]] },
    { f: "NaNO₃", comp: [["Na", 1], ["N", 1], ["O", 3]] }, { f: "KNO₃", comp: [["K", 1], ["N", 1], ["O", 3]] },
    { f: "AgNO₃", comp: [["Ag", 1], ["N", 1], ["O", 3]] }, { f: "CaCl₂", comp: [["Ca", 1], ["Cl", 2]] },
    { f: "MgCl₂", comp: [["Mg", 1], ["Cl", 2]] }, { f: "Na₂SO₄", comp: [["Na", 2], ["S", 1], ["O", 4]] },
    { f: "Ca(NO₃)₂", comp: [["Ca", 1], ["N", 2], ["O", 6]] }, { f: "NH₄Cl", comp: [["N", 1], ["H", 4], ["Cl", 1]] }
  ];
  var s = pick(salts);
  var M = 0; s.comp.forEach(function (c) { M += CHEM_AM[c[0]] * c[1]; });
  var target = pick([0.05, 0.10, 0.20, 0.25, 0.40, 0.50, 0.80, 1.20]);
  var per100 = pick([true, false]);
  var gL = target * M;
  var given = per100 ? iF(gL / 10) + " g per 100 mL" : iF(gL) + " g per L";
  var ans = target;
  return numq("The solubility of " + s.f + " is " + given + " at the stated temperature. The molar mass of " + s.f + " is " + fmtF(M, 2) + " g/mol. Calculate its molar solubility in mol/L.", ans, Math.max(0.01, ans * 0.02), "Convert the mass solubility to a per litre basis first. " + (per100 ? "A solubility of " + iF(gL / 10) + " g per 100 mL is " + iF(gL) + " g in 1000 mL, that is, per litre." : "The solubility is already given per litre as " + iF(gL) + " g/L.") + " Divide the mass per litre by the molar mass: " + iF(gL) + " g / " + fmtF(M, 2) + " g/mol = <b>" + F3(ans) + " mol/L</b>. That is the molar solubility.", { salt: s.f, M: fmtF(M, 2) });
});

E("u2-52", 2, ["6.11"], 2, "gen", function () {
  var salts = [
    { f: "LiCl", comp: [["Li", 1], ["Cl", 1]] }, { f: "NaF", comp: [["Na", 1], ["F", 1]] },
    { f: "KI", comp: [["K", 1], ["I", 1]] }, { f: "MgSO₄", comp: [["Mg", 1], ["S", 1], ["O", 4]] },
    { f: "CaBr₂", comp: [["Ca", 1], ["Br", 2]] }, { f: "ZnCl₂", comp: [["Zn", 1], ["Cl", 2]] },
    { f: "FeCl₂", comp: [["Fe", 1], ["Cl", 2]] }, { f: "CuSO₄", comp: [["Cu", 1], ["S", 1], ["O", 4]] },
    { f: "BaCl₂", comp: [["Ba", 1], ["Cl", 2]] }, { f: "Na₂CO₃", comp: [["Na", 2], ["C", 1], ["O", 3]] }
  ];
  var s = pick(salts);
  var M = 0; s.comp.forEach(function (c) { M += CHEM_AM[c[0]] * c[1]; });
  var target = pick([0.10, 0.15, 0.20, 0.30, 0.40, 0.60, 0.75, 1.20]);
  var temp = pick([20, 25, 30]);
  var g100 = target * M / 10;
  var ans = target;
  return numq("At " + temp + " °C, a saturated solution of " + s.f + " contains " + iF(g100) + " g of the salt in every 100 mL of solution. The molar mass of " + s.f + " is " + fmtF(M, 2) + " g/mol. What is the molar solubility of " + s.f + " in mol/L at this temperature?", ans, Math.max(0.01, ans * 0.02), "Scale the mass up to one litre: " + iF(g100) + " g per 100 mL means 10 x " + iF(g100) + " = " + iF(g100 * 10) + " g per litre. Convert mass to amount by dividing by the molar mass: " + iF(g100 * 10) + " g / " + fmtF(M, 2) + " g/mol = <b>" + F3(ans) + " mol/L</b>. That amount per litre is the molar solubility.", { salt: s.f, M: fmtF(M, 2), temp: temp });
});

E("u2-53", 2, ["6.11"], 3, "gen", function () {
  var salts = [
    { f: "NaCl", comp: [["Na", 1], ["Cl", 1]] }, { f: "KNO₃", comp: [["K", 1], ["N", 1], ["O", 3]] },
    { f: "CuSO₄", comp: [["Cu", 1], ["S", 1], ["O", 4]] }, { f: "MgSO₄", comp: [["Mg", 1], ["S", 1], ["O", 4]] },
    { f: "CaCl₂", comp: [["Ca", 1], ["Cl", 2]] }, { f: "KI", comp: [["K", 1], ["I", 1]] },
    { f: "Na₂SO₄", comp: [["Na", 2], ["S", 1], ["O", 4]] }, { f: "BaCl₂", comp: [["Ba", 1], ["Cl", 2]] },
    { f: "AgNO₃", comp: [["Ag", 1], ["N", 1], ["O", 3]] }, { f: "ZnCl₂", comp: [["Zn", 1], ["Cl", 2]] }
  ];
  var s = pick(salts);
  var M = 0; s.comp.forEach(function (c) { M += CHEM_AM[c[0]] * c[1]; });
  var target = pick([0.20, 0.25, 0.40, 0.50, 0.80, 1.20]);
  var vol = pick([200, 250, 400, 500, 1000]);
  var mass = target * M * vol / 1000;
  var askMoles = pick([true, false]);
  if (askMoles) {
    var ansM = target * vol / 1000;
    return numq("A saturated solution of " + s.f + " is prepared with a volume of " + vol + " mL. It contains " + iF(mass) + " g of dissolved " + s.f + ". The molar mass of " + s.f + " is " + fmtF(M, 2) + " g/mol. How many moles of " + s.f + " are dissolved in the solution?", ansM, Math.max(0.01, ansM * 0.02), "Amount in moles is mass divided by molar mass. The amount dissolved is " + iF(mass) + " g / " + fmtF(M, 2) + " g/mol = <b>" + F3(ansM) + " mol</b>. The volume is not needed for this question, but it is consistent with a molar solubility of " + F3(target) + " mol/L.", { salt: s.f, vol: vol });
  }
  var ans = target;
  var amt = sfR(sfR(mass, 4) / M, 4);
  return numq("A saturated solution of " + s.f + " is prepared with a volume of " + vol + " mL. It contains " + iF(mass) + " g of dissolved " + s.f + ". The molar mass of " + s.f + " is " + fmtF(M, 2) + " g/mol. Calculate the molar solubility of " + s.f + " in mol/L.", ans, Math.max(0.01, ans * 0.02), "First find the amount dissolved: " + iF(mass) + " g / " + fmtF(M, 2) + " g/mol = " + iF(amt) + " mol. Molar solubility is amount per litre of solution, and the volume is " + vol + " mL, which is " + F3(vol / 1000) + " L. Dividing gives " + iF(amt) + " mol / " + F3(vol / 1000) + " L = <b>" + F3(ans) + " mol/L</b>.", { salt: s.f, vol: vol });
});

// 6.12 Effect of solutes on the melting point of ice
E("u2-54", 2, ["6.12"], 2, "gen", function () {
  var salts = ["sodium chloride", "calcium chloride", "magnesium chloride", "potassium chloride"];
  var ctxs = ["spread on a highway before a storm", "scattered on a front step", "packed around an ice cream making canister", "spread on a parking lot", "used in a homemade ice pack", "spread on an airport runway", "scattered on a sidewalk", "mixed with ice in a cooler experiment"];
  var s = pick(salts), ctx = pick(ctxs), q = pick([0, 1]);
  if (q === 0) {
    var correct = "The melting point of the ice is lowered, so the ice can melt at a temperature below 0 °C";
    var ds = shuffle([
      "The melting point of the ice is raised, so the ice becomes harder and colder",
      "The salt heats the ice by reacting with it, and the reaction melts the ice",
      "The salt changes ice into a different compound with a higher melting point",
      "Nothing changes, because a dissolved substance cannot affect the melting point of ice"
    ].filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("Salt, for example " + s + ", is " + ctx + " where it mixes with ice or with a thin film of water on ice. What does the dissolved salt do to the ice?", correct, ds, "When " + s + " dissolves in the water film on ice, its particles lower the temperature at which ice and water can stay in balance. Ice can then melt at temperatures below the normal melting point of 0 °C. This is the freezing point depression effect, described qualitatively: dissolved particles lower the melting point.", { salt: s, ctx: ctx });
  }
  var correct1 = "Dissolved particles interfere with water molecules joining the regular ice crystal, so the ice melts and reforms at a lower temperature";
  var ds1 = shuffle([
    "Dissolved particles supply heat to the ice, because every salt releases heat when it touches ice",
    "Dissolved particles make water molecules heavier, so the ice sinks and melts from below",
    "Dissolved particles turn the ice into salt crystals, which have a lower melting point",
    "Dissolved particles remove all attractions between water molecules, so the ice falls apart at any temperature"
  ].filter(function (x) { return x !== correct1; })).slice(0, 3);
  return mcq("Why does ice in contact with a solution of " + s + ", as when salt is " + ctx + ", melt below 0 °C?", correct1, ds1, "Pure ice melts at 0 °C because water molecules leave and join its crystal at equal rates there. Dissolved particles of " + s + " get in the way of water molecules settling into the ordered ice crystal, so the balance point shifts to a lower temperature. The melting point of the ice is depressed by the dissolved solute.", { salt: s, ctx: ctx });
});

E("u2-55", 2, ["6.12"], 2, "gen", function () {
  var solutes = [
    { f: "sugar (does not split into ions)", p: 1 }, { f: "glucose (does not split into ions)", p: 1 },
    { f: "sodium chloride (splits into 2 particles)", p: 2 }, { f: "potassium chloride (splits into 2 particles)", p: 2 },
    { f: "calcium chloride (splits into 3 particles)", p: 3 }, { f: "magnesium chloride (splits into 3 particles)", p: 3 },
    { f: "sodium sulfate (splits into 3 particles)", p: 3 }
  ];
  var concs = [0.5, 1.0, 1.5, 2.0];
  var a = pick(solutes), b = pick(solutes), ca = pick(concs), cb = pick(concs), tries = 0;
  while ((a === b && ca === cb) || a.p * ca === b.p * cb) { b = pick(solutes); cb = pick(concs); if (++tries > 40) { cb = ca === 2.0 ? 0.5 : 2.0; b = solutes[0] === a ? solutes[2] : solutes[0]; } }
  var aWins = a.p * ca > b.p * cb;
  var winner = aWins ? "Solution A" : "Solution B";
  var correct = winner + ", because it has the greater total concentration of dissolved particles";
  var ds = shuffle([
    (aWins ? "Solution B" : "Solution A") + ", because it has the greater total concentration of dissolved particles",
    "Both solutions give the same melting point, because equal volumes of solution always behave the same way",
    "Pure water with no solute, because adding solute always raises the melting point of ice",
    winner + ", because its solute has the greatest molar mass of the two solutes"
  ].filter(function (x) { return x !== correct; })).slice(0, 3);
  return mcq("Solution A is made with " + F3(ca) + " mol/L of " + a.f + ". Solution B is made with " + F3(cb) + " mol/L of " + b.f + ". Equal samples of ice are placed in each solution. Which solution gives the lower melting point for the ice?", correct, ds, "The size of the melting point lowering depends on the total concentration of dissolved particles, counting each ion separately when a solute splits in solution. Solution A has " + F3(ca) + " x " + a.p + " = " + F3(a.p * ca) + " mol/L of particles, and solution B has " + F3(cb) + " x " + b.p + " = " + F3(b.p * cb) + " mol/L of particles. The solution with more particles per litre, " + winner + ", lowers the melting point more.", { a: a.f, b: b.f });
});

E("u2-56", 2, ["6.12"], 3, "var", varset([
  function () {
    var correct = "Calcium chloride gives three dissolved particles per formula unit and keeps working at temperatures where sodium chloride has largely stopped melting ice";
    var ds = ["Calcium chloride is a darker colour, so it absorbs more sunlight and warms the road", "Calcium chloride raises the melting point of ice more than sodium chloride does", "Sodium chloride cannot dissolve in water at all, so it never affects ice"];
    return mcq("Highway crews switch from sodium chloride to calcium chloride during very cold weather. Which statement best explains the switch?", correct, ds, "Both salts work by lowering the melting point of ice, and the effect grows with the number of dissolved particles. One formula unit of calcium chloride produces three ions in solution, compared with two for sodium chloride, and calcium chloride continues to dissolve and depress the melting point at lower temperatures, so it keeps melting ice when sodium chloride is no longer effective.", {});
  },
  function () {
    var correct = "The salt dissolves in the water from the ice and lowers its melting point, so the mixture can stay liquid well below 0 °C and draw heat from the ice cream mixture";
    var ds = ["The salt insulates the canister, keeping outside warmth away from the ice cream", "The salt raises the temperature of the ice by reacting with it and releasing stored sunlight", "The salt turns the ice into a solid with a higher melting point, which feels colder"];
    return mcq("In a hand cranked ice cream maker, ice is mixed with salt around the canister. The mixture gets colder than 0 °C. Why is the salt added?", correct, ds, "Salt dissolves in the film of water on the ice and lowers the melting point of the ice. The ice then melts at a temperature well below 0 °C, and melting draws heat from the surroundings, including the ice cream mixture in the canister. The salty ice bath can therefore reach temperatures low enough to freeze the ice cream.", {});
  },
  function () {
    var correct = "Sand gives grip on the ice surface but does not dissolve, so it cannot lower the melting point of the ice";
    var ds = ["Sand dissolves in the surface water and lowers the melting point more than salt does", "Sand works in exactly the same way as salt, by depressing the melting point of ice", "Sand melts ice by absorbing water from the air and releasing heat"];
    return mcq("Sand is sometimes spread on icy roads along with, or instead of, salt. How does the action of sand differ from the action of salt?", correct, ds, "Salt acts chemically on the melting point: it dissolves in surface water and depresses the melting point of ice, so the ice itself melts below 0 °C. Sand does not dissolve and does not change the melting point at all. It simply sits on the ice and provides traction for tires and shoes.", {});
  },
  function () {
    var correct = "Up to a point, more dissolved salt gives more particles in solution, which depresses the melting point further, but the effect levels off once the solution is saturated";
    var ds = ["Adding more salt always lowers the melting point by the same amount per spoonful, with no limit", "Adding more salt eventually raises the melting point again, because the particles pack the ice tighter", "Only the first few grains of salt matter, and every grain after that has exactly the same effect as the first"];
    return mcq("A student adds salt to ice in stages and measures the lowest temperature reached each time. Which statement describes how the effect changes as more and more salt is added?", correct, ds, "The melting point depression depends on the concentration of dissolved particles. Adding salt raises that concentration and lowers the melting point further, but only while the extra salt can dissolve. Once the solution is saturated at that temperature, extra solid salt adds no more dissolved particles and the lowering levels off.", {});
  },
  function () {
    var correct = "The brine forms a salt solution on the pavement before ice can bond to it, and the dissolved particles keep the surface water from freezing at 0 °C";
    var ds = ["The brine paints the road a dark colour, so the sun melts any ice that forms", "The brine seals the pavement so that no water can ever reach its surface", "The brine raises the melting point of ice, so ice forms as a loose powder instead of a sheet"];
    return mcq("Some road crews spray salt brine on dry pavement before a storm arrives. Why does pre treating the road help?", correct, ds, "The brine leaves a layer of salt solution on the pavement. When snow or freezing rain arrives, the dissolved particles depress the melting point, so a bonded sheet of ice does not form at 0 °C and the snow stays slushy and easier to plow. The treatment works because of the dissolved particles, not the colour or a seal.", {});
  },
  function () {
    var correct = "The salt lowers the melting point of the surface ice, a film of solution forms, and traffic and plows can then break up and clear the weakened ice layer";
    var ds = ["The salt instantly melts the whole ice layer, however thick, as soon as it touches it", "The salt makes the ice expand and crack into pieces by raising its melting point", "The salt dissolves the pavement coating under the ice, so the ice slides off the road"];
    return mcq("Salt spread on an already icy road does not clear the road by itself, but it still helps the plows. Which statement explains its role?", correct, ds, "Salt can only act where it dissolves, at the surface of the ice and in any liquid film present. There it lowers the melting point, producing a solution film that weakens the bond between the ice and the road. Traffic and plow blades can then break up and remove the ice layer mechanically.", {});
  }
]));

// 6.13 Classify substances by their properties
E("u2-57", 2, ["6.13"], 2, "gen", function () {
  var types = [
    { t: "ionic", mp: function () { return ri(700, 1600); }, cs: "does not conduct", cm: "conducts", sol: "dissolves in water" },
    { t: "molecular", mp: function () { return ri(-120, 90); }, cs: "does not conduct", cm: "does not conduct", sol: "varies: some dissolve in water and some do not" },
    { t: "metallic", mp: function () { return ri(400, 1500); }, cs: "conducts", cm: "conducts", sol: "does not dissolve in water" }
  ];
  var ty = pick(types), label = ri(100, 999);
  var mp = ty.mp();
  var others = shuffle(["ionic", "molecular", "metallic", "a covalent network solid"].filter(function (x) { return x !== ty.t; })).slice(0, 3);
  var prompt = "Sample " + label + " is tested in a laboratory. Melting point: " + mp + " °C. Conductivity as a solid: " + ty.cs + ". Conductivity when molten or in aqueous solution: " + ty.cm + ". Solubility in water: " + ty.sol + ". How should sample " + label + " be classified?";
  return mcq(prompt, ty.t, others, "Match the pattern of evidence to a structure type. A solid that conducts in every state has mobile electrons and is metallic. A solid that conducts only when molten or dissolved has ions locked in a lattice and is ionic. A substance that never conducts has neutral molecules and is molecular. Sample " + label + " shows the " + ty.t + " pattern: conductivity as a solid is described as " + ty.cs + " and conductivity when molten or in solution as " + ty.cm + ".", { type: ty.t, mp: mp });
});

E("u2-58", 2, ["6.13"], 2, "gen", function () {
  var types = [
    { t: "ionic", just: "it conducts only when molten or in solution, because its ions are locked in a lattice as a solid" },
    { t: "molecular", just: "it never conducts, because its particles are neutral molecules with no mobile charged particles" },
    { t: "metallic", just: "it conducts as a solid, because its delocalized electrons move through the structure" }
  ];
  var data = {
    ionic: { mp: function () { return ri(650, 1550); }, cs: "none", cm: "strong", sol: "dissolves in water" },
    molecular: { mp: function () { return ri(-100, 110); }, cs: "none", cm: "none", sol: "partly dissolves in water" },
    metallic: { mp: function () { return ri(350, 1450); }, cs: "strong", cm: "strong", sol: "does not dissolve in water" }
  };
  var ty = pick(types), d = data[ty.t], letter = pick(["A", "B", "C", "D"]);
  var correct = "Classify it as " + ty.t + ", because " + ty.just;
  var ds = types.filter(function (x) { return x.t !== ty.t; }).map(function (x) { return "Classify it as " + x.t + ", because " + x.just; });
  ds.push("Classify it as a mixture, because no single test can ever identify a substance type");
  var prompt = "Unknown sample " + letter + " gives these results. Melting point: " + d.mp() + " °C. Conductivity as a solid: " + d.cs + ". Conductivity when molten or in aqueous solution: " + d.cm + ". Solubility in water: " + d.sol + ". Which classification and justification are both correct?";
  return mcq(prompt, correct, shuffle(ds).slice(0, 3), "Each classification carries its own signature in the conductivity tests. Ions conduct only when free to move, metals conduct as solids through delocalized electrons, and molecular substances never conduct. Sample " + letter + " matches the " + ty.t + " signature, since " + ty.just + ".", { type: ty.t });
});

E("u2-59", 2, ["6.13"], 2, "gen", function () {
  var ty = pick(["ionic", "molecular", "metallic"]);
  var solidR, solR, mp, sol;
  if (ty === "ionic") { solidR = "0.00"; solR = fmtF(rf(5, 20), 2); mp = ri(680, 1500); sol = "dissolves in water"; }
  else if (ty === "molecular") { solidR = "0.00"; solR = fmtF(rf(0, 0.02), 2); mp = ri(-110, 100); sol = "may or may not dissolve in water"; }
  else { solidR = fmtF(rf(10, 50), 2); solR = fmtF(rf(8, 40), 2); mp = ri(380, 1400); sol = "does not dissolve in water"; }
  var batch = ri(10, 99);
  var others = shuffle(["ionic", "molecular", "metallic", "a covalent network solid"].filter(function (x) { return x !== ty; })).slice(0, 3);
  var prompt = "Batch " + batch + " is tested with a conductivity meter that reads in relative units. Melting point: " + mp + " °C. Conductivity reading as a solid: " + solidR + ". Conductivity reading when molten or in aqueous solution: " + solR + ". Solubility in water: " + sol + ". How should the substance in batch " + batch + " be classified?";
  return mcq(prompt, ty, others, "Read the pattern, not the size of any one number alone. A reading of about zero in the solid state that rises when molten or dissolved means ions freed from a lattice: an ionic substance. Readings near zero in both states mean neutral molecules: a molecular substance. A strong reading in the solid state means delocalized electrons: a metallic substance. Batch " + batch + " shows the " + ty + " pattern.", { type: ty });
});

E("u2-60", 2, ["6.13"], 3, "gen", function () {
  var types = [
    { t: "ionic", mp: function () { return ri(700, 1600); }, cs: "does not conduct", cm: "conducts", sol: "dissolves in water", extra: "hard and brittle", just: "its ions are locked in a lattice as a solid but move when molten or dissolved" },
    { t: "molecular", mp: function () { return ri(-120, 95); }, cs: "does not conduct", cm: "does not conduct", sol: "varies with the solvent", extra: "soft and easily scratched", just: "it is made of neutral molecules held by weak forces, with no mobile charged particles in any state" },
    { t: "metallic", mp: function () { return ri(400, 1500); }, cs: "conducts", cm: "conducts", sol: "does not dissolve in water", extra: "shiny and malleable", just: "its delocalized electrons carry current through the solid and let its layers slide" }
  ];
  var ty = pick(types), label = ri(200, 899);
  var correct = ty.t + ": " + ty.just;
  var others = types.filter(function (x) { return x.t !== ty.t; }).map(function (x) { return x.t + ": " + x.just; });
  var wrongJust = types.filter(function (x) { return x.t !== ty.t; })[0];
  others.push(ty.t + ": " + wrongJust.just);
  var prompt = "A full property table is collected for sample " + label + ". Melting point: " + ty.mp() + " °C. Conductivity as a solid: " + ty.cs + ". Conductivity when molten or in aqueous solution: " + ty.cm + ". Solubility in water: " + ty.sol + ". Appearance and handling: " + ty.extra + ". Which classification, paired with its correct justification, fits all of the evidence?";
  return mcq(prompt, correct, shuffle(others).slice(0, 3), "Check every row of the table against each structure model. The conductivity pattern fixes the particle type, and the melting point, solubility and handling evidence must agree with it. Sample " + label + " is " + ty.t + ", because " + ty.just + ". Options that pair the right class with the wrong justification, or the wrong class with any justification, fail at least one row of evidence.", { type: ty.t });
});

E("u2-61", 2, ["6.13"], 3, "gen", function () {
  var patterns = {
    ionic: { mp: function () { return ri(700, 1600); }, cs: "does not conduct", cm: "conducts", sol: "dissolves in water" },
    molecular: { mp: function () { return ri(-120, 90); }, cs: "does not conduct", cm: "does not conduct", sol: "varies with the solvent" },
    metallic: { mp: function () { return ri(400, 1500); }, cs: "conducts", cm: "conducts", sol: "does not dissolve in water" }
  };
  var two = shuffle(["ionic", "molecular", "metallic"]).slice(0, 2);
  var A = two[0], B = two[1], pa = patterns[A], pb = patterns[B];
  var correct = "Sample A is " + A + " and sample B is " + B;
  var cand = [
    "Sample A is " + B + " and sample B is " + A,
    "Sample A is " + A + " and sample B is " + A,
    "Sample A is " + B + " and sample B is " + B,
    "Both samples are mixtures and cannot be classified from property evidence"
  ];
  var ds = shuffle(cand.filter(function (x) { return x !== correct; })).slice(0, 3);
  var prompt = "Two samples are tested. Sample A: melting point " + pa.mp() + " °C, conductivity as a solid: " + pa.cs + ", conductivity when molten or in solution: " + pa.cm + ", solubility in water: " + pa.sol + ". Sample B: melting point " + pb.mp() + " °C, conductivity as a solid: " + pb.cs + ", conductivity when molten or in solution: " + pb.cm + ", solubility in water: " + pb.sol + ". Which combined classification is correct?";
  return mcq(prompt, correct, ds, "Classify each sample separately using its conductivity pattern. Sample A shows the pattern of a " + A + " substance (solid conductivity: " + pa.cs + "; molten or solution conductivity: " + pa.cm + "). Sample B shows the pattern of a " + B + " substance (solid conductivity: " + pb.cs + "; molten or solution conductivity: " + pb.cm + "). Combining the two results gives the correct option.", { a: A, b: B });
});

/* ----- bank-u3.js ----- */
// Chemistry 2202 Review, Unit 3: Organic Chemistry. Fragment file: E(...) registrations only.
// Tranche 7 (Nov 2026): condensed structure figures (chemCondensedFigure and
// chemPairFigure in bank-helpers.js) attach to entries whose stem already
// prints the structure. Attach-only; no stem, answer, or solution changes.
// CRMARKS: u3-73-formula-from-name=2
// CRMARKS: u3-73-name-hard=2
// CRMARKS: u3-73-formula-branch=3
// CRMARKS: u3-74-isomer-count=2
// CRMARKS: u3-74-shared-formula=2
// CRMARKS: u3-75-aromatic-formula=3
// CRMARKS: u3-76-deriv-formula=2
// CRMARKS: u3-76-formula-from-structure=2
// CRMARKS: u3-77-combustion-coeff=3
// CRMARKS: u3-78-monomer-name=2

/* 7.1 Diversity of organic compounds and the carbon atom */
E("u3-71-carbon-bonds",3,["7.1"],1,"gen",function(){
  var comps=[["methane","CH\u2084"],["ethane","CH\u2083CH\u2083"],["propane","CH\u2083CH\u2082CH\u2083"],["butane","CH\u2083CH\u2082CH\u2082CH\u2083"],["pentane","CH\u2083CH\u2082CH\u2082CH\u2082CH\u2083"],["ethene","CH\u2082=CH\u2082"],["propene","CH\u2082=CHCH\u2083"],["but-2-ene","CH\u2083CH=CHCH\u2083"],["ethyne","HC\u2261CH"],["propyne","CH\u2083C\u2261CH"],["ethanol","CH\u2083CH\u2082OH"],["propanone","CH\u2083COCH\u2083"]];
  var c=pick(comps); var ph=ri(0,4);
  var prompts=[
    "In "+c[0]+" ("+c[1]+"), how many covalent bonds does each carbon atom form in total?",
    "A carbon atom in "+c[0]+" shares electrons until its outer shell is full. How many covalent bonds does each carbon atom form?",
    "Counting a double bond as two bonds and a triple bond as three bonds, how many bonds meet at each carbon atom in "+c[0]+" ("+c[1]+")?",
    "How many covalent bonds does a carbon atom form in the organic compound "+c[0]+"?",
    "Each carbon atom in "+c[0]+" ("+c[1]+") is bonded so that it has a complete outer shell. How many bonds does each carbon atom form?"];
  var ds=shuffle(["2","3","5","6"]).slice(0,3);
  var q=mcq(prompts[ph],"4",ds,
    "Carbon has four electrons in its outer shell. It shares them in four covalent bonds, so each carbon atom forms four bonds in total. A double bond counts as two bonds and a triple bond counts as three.",
    {compound:c[0],form:ph});
  if(ph===0||ph===2||ph===4){var f=chemCondensedFigure(c[1]); if(f)q.figure=f;}
  return q;
});
E("u3-71-catenation",3,["7.1"],1,"gen",function(){
  var roots={3:"prop",4:"but",5:"pent",6:"hex",7:"hept",8:"oct"};
  var n=ri(3,8); var form=pick(["chain","branch","ring"]); if(form==="branch"&&n<4){n=ri(4,8);} var desc="";
  if(form==="chain"){desc="the straight chain compound "+roots[n]+"ane";}
  else if(form==="branch"){desc="the branched compound 2-methyl"+roots[n-1]+"ane";}
  else{desc="the ring compound cyclo"+roots[n]+"ane";}
  var ph=ri(0,2);
  var prompts=[
    "Compounds such as "+desc+" can exist because carbon atoms bond to each other in chains, branches and rings. This self linking property of carbon is called:",
    "In "+desc+", carbon atoms are linked directly to other carbon atoms. The name for this self linking property of carbon is:",
    "Carbon forms straight chains, branched chains and rings, as shown by "+desc+". This property of carbon is called:"];
  var ds=shuffle(["isomerism","polymerization","hydrogenation","esterification","combustion"]).slice(0,3);
  return mcq(prompts[ph],"catenation",ds,
    "Catenation is the ability of an element to bond to itself. Carbon catenates strongly, forming long chains, branched chains and rings, which is one reason so many organic compounds exist.",
    {n:n,form:form});
});
E("u3-71-bond-types",3,["7.1"],2,"gen",function(){
  var T=[
    ["ethane","CH\u2083CH\u2083",1],["propane","CH\u2083CH\u2082CH\u2083",1],["butane","CH\u2083CH\u2082CH\u2082CH\u2083",1],["pentane","CH\u2083CH\u2082CH\u2082CH\u2082CH\u2083",1],["hexane","CH\u2083CH\u2082CH\u2082CH\u2082CH\u2082CH\u2083",1],["cyclohexane","(CH\u2082)\u2086 ring",1],
    ["ethene","CH\u2082=CH\u2082",2],["propene","CH\u2082=CHCH\u2083",2],["but-1-ene","CH\u2082=CHCH\u2082CH\u2083",2],["but-2-ene","CH\u2083CH=CHCH\u2083",2],["pent-2-ene","CH\u2083CH=CHCH\u2082CH\u2083",2],["hex-3-ene","CH\u2083CH\u2082CH=CHCH\u2082CH\u2083",2],
    ["ethyne","HC\u2261CH",3],["propyne","CH\u2083C\u2261CH",3],["but-1-yne","HC\u2261CCH\u2082CH\u2083",3],["but-2-yne","CH\u2083C\u2261CCH\u2083",3],["pent-1-yne","HC\u2261CCH\u2082CH\u2082CH\u2083",3],["hex-2-yne","CH\u2083C\u2261CCH\u2082CH\u2082CH\u2083",3]];
  var it=pick(T); var form=ri(0,2);
  var word=(it[2]===1)?"single":((it[2]===2)?"double":"triple");
  var sol="In "+it[0]+" ("+it[1]+"), the carbon to carbon bond is a "+word+" bond. A single bond shares one pair of electrons, a double bond shares two pairs, and a triple bond shares three pairs.";
  var q;
  if(form===0){
    q=mcq("What type of carbon to carbon bond is present in "+it[0]+" ("+it[1]+")?",
      word+" bond",shuffle(["single bond","double bond","triple bond","ionic bond"].filter(function(x){return x!==word+" bond";})).slice(0,3),
      sol,{compound:it[0],form:form});
  }
  else if(form===1){
    var others=["1","2","3","4"].filter(function(x){return x!==String(it[2]);});
    q=mcq("In "+it[0]+" ("+it[1]+"), how many pairs of electrons are shared in the carbon to carbon bond?",
      String(it[2]),shuffle(others).slice(0,3),sol,{compound:it[0],form:form});
  }
  else{
    var stmts=["All carbon to carbon bonds are single bonds","One carbon to carbon bond is a double bond","One carbon to carbon bond is a triple bond","All carbon to carbon bonds are triple bonds"];
    var correct=stmts[it[2]-1];
    var ds2=stmts.filter(function(x){return x!==correct;});
    q=mcq("Which statement about the carbon to carbon bonds in "+it[0]+" ("+it[1]+") is true?",
      correct,ds2,sol,{compound:it[0],form:form});
  }
  var f=chemCondensedFigure(it[1]); if(f)q.figure=f;
  return q;
});
E("u3-71-why-many-var",3,["7.1"],2,"var",varset([
  function(){return mcq("Why are there millions of known organic compounds, built from only a few elements?",
    "Carbon forms four bonds and bonds to itself in chains, branches and rings, and also bonds to many other elements",
    ["Carbon is the most common element in the Earth crust, so it appears in many compounds","Each carbon compound contains a very large number of carbon atoms","Carbon atoms can gain or lose four electrons to form many different ions"],
    "Two features combine. Carbon forms four covalent bonds, and it catenates, bonding to itself in chains, branches and rings. With hydrogen, oxygen, nitrogen and halogens also attaching, the number of possible structures is enormous.",
    {v:1});},
  function(){return mcq("Catenation, an important property of carbon, means that carbon atoms can:",
    "bond to each other to form chains, branches and rings",
    ["bond only to hydrogen atoms","form compounds with exactly four other carbon atoms","gain four electrons from other atoms"],
    "Catenation is self linking. Carbon atoms bond to each other in straight chains, branched chains and rings, giving carbon compounds their huge variety of backbones.",
    {v:2});},
  function(){return mcq("Besides carbon and hydrogen, which set of elements is commonly found attached to carbon backbones in organic derivatives?",
    "Oxygen, nitrogen and the halogens",
    ["Sodium, potassium and calcium","Iron, copper and zinc","Helium, neon and argon"],
    "Hydrocarbon derivatives form when atoms such as oxygen, nitrogen, chlorine or bromine attach to a carbon backbone. These atoms form the functional groups that define the derivative families.",
    {v:3});},
  function(){return mcq("What is the role of a functional group in an organic compound?",
    "It is the reactive part of the molecule and largely decides the family and the chemical properties",
    ["It is the part of the molecule that never takes part in any reaction","It decides only the colour of the compound","It is a group of carbon atoms found only in ring compounds"],
    "The carbon backbone gives the size and shape of a molecule. The functional group, such as -OH or -COOH, is the reactive site and places the compound in its family.",
    {v:4});},
  function(){return mcq("Which list shows bond types that carbon can form with another carbon atom?",
    "Single, double and triple covalent bonds",
    ["Single covalent bonds only","Single and double bonds, but never triple bonds","Ionic bonds and hydrogen bonds only"],
    "Carbon shares electrons with other carbon atoms in single, double and triple bonds. Ethane has a single bond, ethene a double bond and ethyne a triple bond.",
    {v:5});},
  function(){return mcq("A carbon backbone with an -OH group attached belongs to the alcohol family. Changing the backbone from two carbons to five carbons mainly changes the:",
    "size of the molecule, while it stays in the alcohol family",
    ["family, from alcohol to carboxylic acid","number of bonds each carbon forms, from four to five","bond type, from covalent to ionic"],
    "The functional group decides the family, so an -OH group keeps the compound an alcohol. A longer backbone makes a bigger molecule in the same family.",
    {v:6});}
]));

/* 7.2 Classify organic compounds into families */
E("u3-72-family-from-structure",3,["7.2"],2,"gen",function(){
  var HC=[["methane","CH\u2084","alkane","CH\u2084"],["ethane","CH\u2083CH\u2083","alkane","C\u2082H\u2086"],["propane","CH\u2083CH\u2082CH\u2083","alkane","C\u2083H\u2088"],["butane","CH\u2083CH\u2082CH\u2082CH\u2083","alkane","C\u2084H\u2081\u2080"],["pentane","CH\u2083CH\u2082CH\u2082CH\u2082CH\u2083","alkane","C\u2085H\u2081\u2082"],["hexane","CH\u2083CH\u2082CH\u2082CH\u2082CH\u2082CH\u2083","alkane","C\u2086H\u2081\u2084"],["2-methylpropane","CH\u2083CH(CH\u2083)CH\u2083","alkane","C\u2084H\u2081\u2080"],["cyclohexane","(CH\u2082)\u2086 ring","cycloalkane","C\u2086H\u2081\u2082"],["cyclopentane","(CH\u2082)\u2085 ring","cycloalkane","C\u2085H\u2081\u2080"],["ethene","CH\u2082=CH\u2082","alkene","C\u2082H\u2084"],["propene","CH\u2082=CHCH\u2083","alkene","C\u2083H\u2086"],["but-2-ene","CH\u2083CH=CHCH\u2083","alkene","C\u2084H\u2088"],["pent-1-ene","CH\u2082=CHCH\u2082CH\u2082CH\u2083","alkene","C\u2085H\u2081\u2080"],["ethyne","HC\u2261CH","alkyne","C\u2082H\u2082"],["propyne","CH\u2083C\u2261CH","alkyne","C\u2083H\u2084"],["but-2-yne","CH\u2083C\u2261CCH\u2083","alkyne","C\u2084H\u2086"],["benzene","six carbon ring, C\u2086H\u2086","aromatic","C\u2086H\u2086"],["methylbenzene","C\u2086H\u2085CH\u2083","aromatic","C\u2087H\u2088"],["chlorobenzene","C\u2086H\u2085Cl","aromatic","C\u2086H\u2085Cl"]];
  var DV=[["methanol","CH\u2083OH","alcohol","CH\u2084O"],["ethanol","CH\u2083CH\u2082OH","alcohol","C\u2082H\u2086O"],["propan-1-ol","CH\u2083CH\u2082CH\u2082OH","alcohol","C\u2083H\u2088O"],["propan-2-ol","CH\u2083CH(OH)CH\u2083","alcohol","C\u2083H\u2088O"],["butan-1-ol","CH\u2083CH\u2082CH\u2082CH\u2082OH","alcohol","C\u2084H\u2081\u2080O"],["methanoic acid","HCOOH","carboxylic acid","CH\u2082O\u2082"],["ethanoic acid","CH\u2083COOH","carboxylic acid","C\u2082H\u2084O\u2082"],["propanoic acid","CH\u2083CH\u2082COOH","carboxylic acid","C\u2083H\u2086O\u2082"],["butanoic acid","CH\u2083CH\u2082CH\u2082COOH","carboxylic acid","C\u2084H\u2088O\u2082"],["methyl methanoate","HCOOCH\u2083","ester","C\u2082H\u2084O\u2082"],["methyl ethanoate","CH\u2083COOCH\u2083","ester","C\u2083H\u2086O\u2082"],["ethyl ethanoate","CH\u2083COOCH\u2082CH\u2083","ester","C\u2084H\u2088O\u2082"],["ethyl methanoate","HCOOCH\u2082CH\u2083","ester","C\u2083H\u2086O\u2082"],["methyl propanoate","CH\u2083CH\u2082COOCH\u2083","ester","C\u2084H\u2088O\u2082"],["methanal","HCHO","aldehyde","CH\u2082O"],["ethanal","CH\u2083CHO","aldehyde","C\u2082H\u2084O"],["propanal","CH\u2083CH\u2082CHO","aldehyde","C\u2083H\u2086O"],["butanal","CH\u2083CH\u2082CH\u2082CHO","aldehyde","C\u2084H\u2088O"],["propanone","CH\u2083COCH\u2083","ketone","C\u2083H\u2086O"],["butan-2-one","CH\u2083COCH\u2082CH\u2083","ketone","C\u2084H\u2088O"],["pentan-3-one","CH\u2083CH\u2082COCH\u2082CH\u2083","ketone","C\u2085H\u2081\u2080O"],["pentan-2-one","CH\u2083COCH\u2082CH\u2082CH\u2083","ketone","C\u2085H\u2081\u2080O"],["methoxymethane","CH\u2083OCH\u2083","ether","C\u2082H\u2086O"],["methoxyethane","CH\u2083OCH\u2082CH\u2083","ether","C\u2083H\u2088O"],["ethoxyethane","CH\u2083CH\u2082OCH\u2082CH\u2083","ether","C\u2084H\u2081\u2080O"],["methylamine","CH\u2083NH\u2082","amine","CH\u2085N"],["ethylamine","CH\u2083CH\u2082NH\u2082","amine","C\u2082H\u2087N"],["propylamine","CH\u2083CH\u2082CH\u2082NH\u2082","amine","C\u2083H\u2089N"],["ethanamide","CH\u2083CONH\u2082","amide","C\u2082H\u2085NO"],["propanamide","CH\u2083CH\u2082CONH\u2082","amide","C\u2083H\u2087NO"],["chloromethane","CH\u2083Cl","halogen compound","CH\u2083Cl"],["chloroethane","CH\u2083CH\u2082Cl","halogen compound","C\u2082H\u2085Cl"],["bromoethane","CH\u2083CH\u2082Br","halogen compound","C\u2082H\u2085Br"],["2-chloropropane","CH\u2083CHClCH\u2083","halogen compound","C\u2083H\u2087Cl"]];
  var ALL=HC.concat(DV); var FAMS=["alkane","cycloalkane","alkene","alkyne","aromatic","alcohol","carboxylic acid","ester","aldehyde","ketone","ether","amine","amide","halogen compound"];
  var it=pick(ALL); var form=ri(0,1);
  var shown=(form===0)?it[1]:it[1]+", formula "+it[3];
  var ds=shuffle(FAMS.filter(function(f){return f!==it[2];})).slice(0,3);
  var q=mcq("To which family does the compound "+shown+" belong?",it[2],ds,
    "Classify by the bonding and the functional group present. The structure "+it[1]+" shows the features of the "+it[2]+" family.",
    {compound:it[0],form:form});
  var f=chemCondensedFigure(it[1]); if(f)q.figure=f;
  return q;
});
E("u3-72-family-from-name",3,["7.2"],1,"gen",function(){
  var HC=[["methane","alkane"],["ethane","alkane"],["propane","alkane"],["butane","alkane"],["pentane","alkane"],["hexane","alkane"],["2-methylpropane","alkane"],["cyclohexane","cycloalkane"],["cyclopentane","cycloalkane"],["ethene","alkene"],["propene","alkene"],["but-2-ene","alkene"],["pent-1-ene","alkene"],["ethyne","alkyne"],["propyne","alkyne"],["but-2-yne","alkyne"],["benzene","aromatic"],["methylbenzene","aromatic"],["chlorobenzene","aromatic"]];
  var DV=[["methanol","alcohol"],["ethanol","alcohol"],["propan-1-ol","alcohol"],["propan-2-ol","alcohol"],["butan-1-ol","alcohol"],["methanoic acid","carboxylic acid"],["ethanoic acid","carboxylic acid"],["propanoic acid","carboxylic acid"],["butanoic acid","carboxylic acid"],["methyl methanoate","ester"],["methyl ethanoate","ester"],["ethyl ethanoate","ester"],["ethyl methanoate","ester"],["methyl propanoate","ester"],["methanal","aldehyde"],["ethanal","aldehyde"],["propanal","aldehyde"],["butanal","aldehyde"],["propanone","ketone"],["butan-2-one","ketone"],["pentan-3-one","ketone"],["pentan-2-one","ketone"],["methoxymethane","ether"],["methoxyethane","ether"],["ethoxyethane","ether"],["methylamine","amine"],["ethylamine","amine"],["propylamine","amine"],["ethanamide","amide"],["propanamide","amide"],["chloromethane","halogen compound"],["chloroethane","halogen compound"],["bromoethane","halogen compound"],["2-chloropropane","halogen compound"]];
  var ALL=HC.concat(DV); var FAMS=["alkane","cycloalkane","alkene","alkyne","aromatic","alcohol","carboxylic acid","ester","aldehyde","ketone","ether","amine","amide","halogen compound"];
  var it=pick(ALL); var form=ri(0,1);
  var prompt=(form===0)?("To which family does "+it[0]+" belong?"):("Organic compounds are grouped into families by bonding and functional groups. In which family is "+it[0]+" placed?");
  var ds=shuffle(FAMS.filter(function(f){return f!==it[1];})).slice(0,3);
  return mcq(prompt,it[1],ds,
    "The name "+it[0]+" carries the ending or prefix of its family. It is classified as a member of the "+it[1]+" family.",
    {compound:it[0],form:form});
});
E("u3-72-family-from-group",3,["7.2"],2,"gen",function(){
  var D=[
    ["a hydroxyl group bonded to a carbon chain","-OH","alcohol",["ethanol","propan-1-ol","butan-1-ol"]],
    ["a carboxyl group at the end of the chain","-COOH","carboxylic acid",["ethanoic acid","propanoic acid","butanoic acid"]],
    ["a -COO- linkage joining two carbon groups","-COO-","ester",["methyl ethanoate","ethyl ethanoate","methyl propanoate"]],
    ["a carbonyl group at the end of the chain, written -CHO","-CHO","aldehyde",["ethanal","propanal","butanal"]],
    ["a carbonyl group bonded to two carbon groups inside the chain","C=O inside the chain","ketone",["propanone","butan-2-one","pentan-3-one"]],
    ["an oxygen atom bonded to two carbon groups","C-O-C","ether",["methoxymethane","methoxyethane","ethoxyethane"]],
    ["an amino group bonded to a carbon chain","-NH\u2082","amine",["methylamine","ethylamine","propylamine"]],
    ["an amide group in the chain","-CONH\u2082","amide",["ethanamide","propanamide","butanamide"]],
    ["single bonds only between carbon atoms, with no other functional group","C-C bonds only","alkane",["propane","pentane","hexane"]],
    ["a carbon to carbon double bond and no other functional group","C=C","alkene",["propene","but-2-ene","pent-1-ene"]],
    ["a carbon to carbon triple bond and no other functional group","C\u2261C","alkyne",["propyne","but-2-yne","pent-1-yne"]],
    ["a benzene ring in the molecule","a six carbon aromatic ring","aromatic",["benzene","methylbenzene","chlorobenzene"]],
    ["a chlorine or bromine atom bonded to a carbon chain","-Cl or -Br","halogen compound",["chloromethane","bromoethane","chloroethane"]]];
  var FAMS=["alkane","cycloalkane","alkene","alkyne","aromatic","alcohol","carboxylic acid","ester","aldehyde","ketone","ether","amine","amide","halogen compound"];
  var it=pick(D); var ex=pick(it[3]); var form=ri(0,1);
  var prompt=(form===0)?("A compound contains "+it[0]+". An example is "+ex+". To which family does it belong?"):("The group "+it[1]+" is the defining group of one family. An example compound is "+ex+". Which family is it?");
  var ds=shuffle(FAMS.filter(function(f){return f!==it[2];})).slice(0,3);
  return mcq(prompt,it[2],ds,
    "The defining feature described is the mark of the "+it[2]+" family. The example, "+ex+", is a member of that family.",
    {family:it[2],example:ex,form:form});
});
E("u3-72-classify-pair",3,["7.2"],3,"gen",function(){
  var P=[["propane","CH\u2083CH\u2082CH\u2083","alkane"],["but-2-ene","CH\u2083CH=CHCH\u2083","alkene"],["propyne","CH\u2083C\u2261CH","alkyne"],["cyclohexane","(CH\u2082)\u2086 ring","cycloalkane"],["methylbenzene","C\u2086H\u2085CH\u2083","aromatic"],["ethanol","CH\u2083CH\u2082OH","alcohol"],["propan-2-ol","CH\u2083CH(OH)CH\u2083","alcohol"],["ethanoic acid","CH\u2083COOH","carboxylic acid"],["propanoic acid","CH\u2083CH\u2082COOH","carboxylic acid"],["methyl ethanoate","CH\u2083COOCH\u2083","ester"],["ethyl ethanoate","CH\u2083COOCH\u2082CH\u2083","ester"],["propanal","CH\u2083CH\u2082CHO","aldehyde"],["propanone","CH\u2083COCH\u2083","ketone"],["butan-2-one","CH\u2083COCH\u2082CH\u2083","ketone"],["methoxyethane","CH\u2083OCH\u2082CH\u2083","ether"],["ethylamine","CH\u2083CH\u2082NH\u2082","amine"],["ethanamide","CH\u2083CONH\u2082","amide"],["bromoethane","CH\u2083CH\u2082Br","halogen compound"],["pentane","CH\u2083CH\u2082CH\u2082CH\u2082CH\u2083","alkane"],["pent-1-ene","CH\u2082=CHCH\u2082CH\u2082CH\u2083","alkene"]];
  var FAMS=["alkane","cycloalkane","alkene","alkyne","aromatic","alcohol","carboxylic acid","ester","aldehyde","ketone","ether","amine","amide","halogen compound"];
  var a=pick(P); var b=pick(P); var guard=0;
  while((b[0]===a[0]||b[2]===a[2])&&guard<60){b=pick(P);guard++;}
  if(b[2]===a[2]){b=P.filter(function(x){return x[2]!==a[2];})[0];}
  var others=shuffle(FAMS.filter(function(f){return f!==a[2]&&f!==b[2];}));
  var fx=others[0], fy=others[1];
  var correct="A is "+a[2]+" and B is "+b[2];
  var ds=["A is "+b[2]+" and B is "+a[2],"A is "+fx+" and B is "+b[2],"A is "+a[2]+" and B is "+fy];
  var q=mcq("Compound A is "+a[0]+" ("+a[1]+"). Compound B is "+b[0]+" ("+b[1]+"). Which classification is correct?",
    correct,ds,
    "Classify each compound on its own first. A, "+a[0]+", is a member of the "+a[2]+" family. B, "+b[0]+", is a member of the "+b[2]+" family. Only one option states both correctly.",
    {a:a[0],b:b[0]});
  var f=chemPairFigure(a[1],b[1]); if(f)q.figure=f;
  return q;
});
E("u3-72-saturation",3,["7.2"],2,"gen",function(){
  var SAT=[["propane","CH\u2083CH\u2082CH\u2083","C\u2083H\u2088"],["butane","CH\u2083CH\u2082CH\u2082CH\u2083","C\u2084H\u2081\u2080"],["pentane","CH\u2083CH\u2082CH\u2082CH\u2082CH\u2083","C\u2085H\u2081\u2082"],["hexane","CH\u2083CH\u2082CH\u2082CH\u2082CH\u2082CH\u2083","C\u2086H\u2081\u2084"],["heptane","CH\u2083CH\u2082CH\u2082CH\u2082CH\u2082CH\u2082CH\u2083","C\u2087H\u2081\u2086"],["octane","CH\u2083CH\u2082CH\u2082CH\u2082CH\u2082CH\u2082CH\u2082CH\u2083","C\u2088H\u2081\u2088"],["2-methylpropane","CH\u2083CH(CH\u2083)CH\u2083","C\u2084H\u2081\u2080"],["cyclohexane","(CH\u2082)\u2086 ring","C\u2086H\u2081\u2082"],["cyclopentane","(CH\u2082)\u2085 ring","C\u2085H\u2081\u2080"],["cyclobutane","(CH\u2082)\u2084 ring","C\u2084H\u2088"]];
  var UNS=[["ethene","CH\u2082=CH\u2082","C\u2082H\u2084"],["propene","CH\u2082=CHCH\u2083","C\u2083H\u2086"],["but-1-ene","CH\u2082=CHCH\u2082CH\u2083","C\u2084H\u2088"],["pent-2-ene","CH\u2083CH=CHCH\u2082CH\u2083","C\u2085H\u2081\u2080"],["hex-1-ene","CH\u2082=CHCH\u2082CH\u2082CH\u2082CH\u2083","C\u2086H\u2081\u2082"],["ethyne","HC\u2261CH","C\u2082H\u2082"],["propyne","CH\u2083C\u2261CH","C\u2083H\u2084"],["but-2-yne","CH\u2083C\u2261CCH\u2083","C\u2084H\u2086"],["pent-1-yne","HC\u2261CCH\u2082CH\u2082CH\u2083","C\u2085H\u2088"],["hex-2-yne","CH\u2083C\u2261CCH\u2082CH\u2082CH\u2083","C\u2086H\u2081\u2080"]];
  var sat=(ri(0,1)===0); var it=pick(sat?SAT:UNS); var rep=ri(0,2);
  if(rep===2&&(it[1].indexOf("ring")>=0||it[1].indexOf("=")>=0)){rep=1;}
  var shown=(rep===0)?it[0]:((rep===1)?it[1]:it[2]);
  var correct=sat?"A saturated hydrocarbon":"An unsaturated hydrocarbon";
  var ds=[sat?"An unsaturated hydrocarbon":"A saturated hydrocarbon","A hydrocarbon derivative","An inorganic compound"];
  var q=mcq("How is the compound "+shown+" best described?",correct,ds,
    (sat?"Saturated hydrocarbons hold the maximum possible number of hydrogens, with single bonds only (rings included). ":"Unsaturated hydrocarbons contain a double or triple bond, so they hold fewer hydrogens than the saturated compound with the same number of carbons. ")+"The compound shown is "+it[0]+", so it is "+(sat?"saturated.":"unsaturated."),
    {compound:it[0],sat:sat,rep:rep});
  if(rep===1){var f=chemCondensedFigure(it[1]); if(f)q.figure=f;}
  return q;
});
E("u3-72-formula-family",3,["7.2"],1,"gen",function(){
  var SB=["\u2080","\u2081","\u2082","\u2083","\u2084","\u2085","\u2086","\u2087","\u2088","\u2089"];
  function SN(k){return String(k).split("").map(function(d){return SB[+d];}).join("");}
  var cases=[]; var n,i;
  for(n=3;n<=8;n++){cases.push([n,"alkane","open chain"]);cases.push([n,"alkyne","open chain"]);cases.push([n,"alkene","open chain"]);cases.push([n,"cycloalkane","ring"]);}
  var c=pick(cases); n=c[0]; var fam=c[1];
  var h=(fam==="alkane")?(2*n+2):((fam==="alkyne")?(2*n-2):(2*n));
  var F="C"+SN(n)+"H"+SN(h);
  var ph=ri(0,2); var sw=(c[2]==="ring")?"a ring":"an open chain";
  var prompts=[
    "A hydrocarbon has molecular formula "+F+" and its carbons form "+sw+". To which family does it belong?",
    "The molecular formula "+F+" belongs to a hydrocarbon whose carbons form "+sw+". Which family is it in?",
    "A sample contains only a hydrocarbon with formula "+F+", present as "+(c[2]==="ring"?"a ring compound":"an open chain compound")+". Its family is:"];
  var ds=["alkane","alkene","alkyne","cycloalkane"].filter(function(f){return f!==fam;});
  var gen=(fam==="alkane")?"C\u2099H\u2082\u2099\u208A\u2082":((fam==="alkyne")?"C\u2099H\u2082\u2099\u208B\u2082":"C\u2099H\u2082\u2099");
  return mcq(prompts[ph],fam,ds,
    "Compare the formula with the general formulas. With "+n+" carbons, "+F+" matches "+gen+", and the structure is a"+(c[2]==="ring"?" ring":"n open chain")+", so the family is "+fam+". Note that alkenes and cycloalkanes share the general formula C\u2099H\u2082\u2099, so the ring or chain information is needed to separate them.",
    {n:n,family:fam,form:ph});
});

/* 7.3 Aliphatic naming and formulas */
E("u3-73-name-alkane",3,["7.3"],2,"gen",function(){
  var T=[
    ["CH\u2083CH(CH\u2083)CH\u2083","2-methylpropane"],["CH\u2083CH(CH\u2083)CH\u2082CH\u2083","2-methylbutane"],["C(CH\u2083)\u2084","2,2-dimethylpropane"],
    ["CH\u2083CH\u2082CH(CH\u2083)CH\u2082CH\u2083","3-methylpentane"],["CH\u2083CH(CH\u2083)CH\u2082CH\u2082CH\u2083","2-methylpentane"],["CH\u2083CH\u2082CH\u2082CH(CH\u2083)CH\u2083","2-methylpentane"],
    ["CH\u2083C(CH\u2083)\u2082CH\u2082CH\u2083","2,2-dimethylbutane"],["CH\u2083CH(CH\u2083)CH(CH\u2083)CH\u2083","2,3-dimethylbutane"],["CH\u2083CH\u2082CH(CH\u2082CH\u2083)CH\u2082CH\u2083","3-ethylpentane"],
    ["CH\u2083CH\u2082CH(CH\u2083)CH\u2082CH\u2082CH\u2083","3-methylhexane"],["CH\u2083CH(CH\u2083)CH\u2082CH\u2082CH\u2082CH\u2083","2-methylhexane"],["CH\u2083CH(CH\u2083)CH\u2082CH(CH\u2083)CH\u2083","2,4-dimethylpentane"],
    ["CH\u2083CH(CH\u2083)CH(CH\u2083)CH\u2082CH\u2083","2,3-dimethylpentane"],["CH\u2083CH\u2082CH(CH\u2082CH\u2083)CH\u2082CH\u2082CH\u2083","3-ethylhexane"],["CH\u2083C(CH\u2083)\u2082CH\u2082CH\u2082CH\u2083","2,2-dimethylpentane"],
    ["CH\u2083CH\u2082C(CH\u2083)\u2082CH\u2082CH\u2083","3,3-dimethylpentane"],["CH\u2083CH(CH\u2083)CH\u2082CH\u2082CH\u2082CH\u2082CH\u2083","2-methylheptane"],["CH\u2083CH\u2082CH(CH\u2083)CH\u2082CH\u2082CH\u2082CH\u2083","3-methylheptane"],
    ["CH\u2083C(CH\u2083)\u2082CH\u2082CH\u2082CH\u2082CH\u2083","2,2-dimethylhexane"],["CH\u2083CH\u2082CH\u2082CH\u2083","butane"],["CH\u2083CH\u2082CH\u2082CH\u2082CH\u2083","pentane"],
    ["CH\u2083CH\u2082CH\u2082CH\u2082CH\u2082CH\u2083","hexane"],["CH\u2083CH\u2082CH\u2082CH\u2082CH\u2082CH\u2082CH\u2083","heptane"],["CH\u2083CH\u2082CH\u2082CH\u2082CH\u2082CH\u2082CH\u2082CH\u2083","octane"]];
  var it=pick(T); var mode=ri(0,1); var ctx=pick([""," In a fuel sample, the compound is identified from its structure."," A student is naming compounds from a model kit."]);
  var names=T.map(function(x){return x[1];}); var structs=T.map(function(x){return x[0];});
  if(mode===0){
    var ds=shuffle(names.filter(function(x){return x!==it[1];}).filter(function(x,i,a){return a.indexOf(x)===i;})).slice(0,3);
    var q=mcq("What is the IUPAC name of "+it[0]+"?"+ctx,it[1],ds,
      "Find the longest chain first, then number it to give the branches the lowest positions. The structure "+it[0]+" is named "+it[1]+".",
      {mode:mode,compound:it[1]});
    var f=chemCondensedFigure(it[0]); if(f)q.figure=f;
    return q;
  }
  var ds2=shuffle(structs.filter(function(x){return x!==it[0];})).slice(0,3);
  return mcq("Which condensed structure matches the name "+it[1]+"?"+ctx,it[0],ds2,
    "Build the parent chain named in "+it[1]+", then attach each branch at its numbered carbon. The matching structure is "+it[0]+".",
    {mode:mode,compound:it[1]});
});
E("u3-73-name-unsaturated",3,["7.3"],2,"gen",function(){
  var T=[
    ["CH\u2082=CHCH\u2083","propene"],["CH\u2082=CHCH\u2082CH\u2083","but-1-ene"],["CH\u2083CH=CHCH\u2083","but-2-ene"],["CH\u2082=CHCH\u2082CH\u2082CH\u2083","pent-1-ene"],
    ["CH\u2083CH=CHCH\u2082CH\u2083","pent-2-ene"],["CH\u2083CH\u2082CH=CHCH\u2082CH\u2083","hex-3-ene"],["CH\u2082=CHCH(CH\u2083)CH\u2083","3-methylbut-1-ene"],["CH\u2083C(CH\u2083)=CHCH\u2083","2-methylbut-2-ene"],
    ["CH\u2082=C(CH\u2083)CH\u2082CH\u2083","2-methylbut-1-ene"],["CH\u2083CH=CHCH\u2082CH\u2082CH\u2083","hex-2-ene"],["CH\u2082=CHCH\u2082CH(CH\u2083)CH\u2083","4-methylpent-1-ene"],["CH\u2083CH=C(CH\u2083)CH\u2082CH\u2083","3-methylpent-2-ene"],
    ["HC\u2261CH","ethyne"],["CH\u2083C\u2261CH","propyne"],["CH\u2083CH\u2082C\u2261CH","but-1-yne"],["CH\u2083C\u2261CCH\u2083","but-2-yne"],
    ["CH\u2083CH\u2082CH\u2082C\u2261CH","pent-1-yne"],["CH\u2083C\u2261CCH\u2082CH\u2083","pent-2-yne"],["CH\u2083CH\u2082C\u2261CCH\u2082CH\u2083","hex-3-yne"],["HC\u2261CCH(CH\u2083)CH\u2083","3-methylbut-1-yne"],
    ["CH\u2083C\u2261CCH(CH\u2083)CH\u2083","4-methylpent-2-yne"],["HC\u2261CCH\u2082CH(CH\u2083)CH\u2083","4-methylpent-1-yne"]];
  var it=pick(T); var mode=ri(0,2);
  var names=T.map(function(x){return x[1];}); var structs=T.map(function(x){return x[0];});
  var sol="Number the longest chain so the multiple bond gets the lowest possible position, then name any branches. The compound "+it[0]+" is "+it[1]+".";
  if(mode===0){
    var ds=shuffle(names.filter(function(x){return x!==it[1];})).slice(0,3);
    var q0=mcq("What is the IUPAC name of "+it[0]+"?",it[1],ds,sol,{mode:mode,compound:it[1]});
    var f0=chemCondensedFigure(it[0]); if(f0)q0.figure=f0;
    return q0;
  }
  if(mode===1){
    var ds2=shuffle(structs.filter(function(x){return x!==it[0];})).slice(0,3);
    return mcq("Which condensed structure matches the name "+it[1]+"?",it[0],ds2,sol,{mode:mode,compound:it[1]});
  }
  var alkaneName=it[1].replace(/-\d-ene/,"ane").replace(/-\d-yne/,"ane").replace("ene","ane").replace("yne","ane");
  var otherBond=it[1].indexOf("ene")>=0?it[1].replace("ene","yne"):it[1].replace("yne","ene");
  var branched=(it[1].indexOf("methyl")>=0)?it[1].replace("methyl","ethyl"):("2-methyl"+it[1]);
  var cand=[alkaneName,otherBond,branched].filter(function(x){return x!==it[1];});
  var ds3=shuffle(cand.concat(names.filter(function(x){return x!==it[1]&&cand.indexOf(x)<0;}))).slice(0,3);
  var q2=mcq("A compound has the condensed structure "+it[0]+". What is its correct IUPAC name?",it[1],ds3,sol,{mode:mode,compound:it[1]});
  var f2=chemCondensedFigure(it[0]); if(f2)q2.figure=f2;
  return q2;
});
E("u3-73-formula-from-name",3,["7.3"],2,"gen",function(){
  var roots=["","","eth","prop","but","pent","hex","hept","oct"];
  var fam=pick(["alkane","alkene","alkyne","cycloalkane"]); var n=ri(2,8);
  if(fam==="cycloalkane"&&n<3){n=3;}
  var name=""; var h=0; var gen="";
  if(fam==="alkane"){name=roots[n]+"ane"; h=2*n+2; gen="C\u2099H\u2082\u2099\u208A\u2082";}
  else if(fam==="cycloalkane"){name="cyclo"+roots[n]+"ane"; h=2*n; gen="C\u2099H\u2082\u2099";}
  else{
    var suf=(fam==="alkene")?"ene":"yne"; h=(fam==="alkene")?(2*n):(2*n-2); gen=(fam==="alkene")?"C\u2099H\u2082\u2099":"C\u2099H\u2082\u2099\u208B\u2082";
    if(n<=3){name=roots[n]+suf;}
    else{var p=ri(1,Math.floor(n/2)); name=roots[n]+"-"+p+"-"+suf;}
  }
  var form=ri(0,1);
  var prompt=(form===0)?("Write the molecular formula of "+name+"."):("A bottle is labelled "+name+". Write its molecular formula.");
  var ans="C"+n+"H"+h;
  return textq(prompt,[ans],
    "The name "+name+" shows "+n+" carbons in a "+fam+". Use the general formula "+gen+" with n equal to "+n+": the molecular formula is C"+n+"H"+h+". Write it without subscripts, for example C7H16.",
    {name:name,n:n,family:fam});
});
E("u3-73-chain-length",3,["7.3"],2,"gen",function(){
  var T=[
    ["CH\u2083CH(CH\u2083)CH\u2083",3,4],["CH\u2083CH(CH\u2083)CH\u2082CH\u2083",4,5],["C(CH\u2083)\u2084",3,5],
    ["CH\u2083CH\u2082CH(CH\u2083)CH\u2082CH\u2083",5,6],["CH\u2083CH(CH\u2083)CH\u2082CH\u2082CH\u2083",5,6],["CH\u2083CH\u2082CH\u2082CH(CH\u2083)CH\u2083",5,6],
    ["CH\u2083C(CH\u2083)\u2082CH\u2082CH\u2083",4,6],["CH\u2083CH(CH\u2083)CH(CH\u2083)CH\u2083",4,6],["CH\u2083CH\u2082CH(CH\u2082CH\u2083)CH\u2082CH\u2083",5,7],
    ["CH\u2083CH\u2082CH(CH\u2083)CH\u2082CH\u2082CH\u2083",6,7],["CH\u2083CH(CH\u2083)CH\u2082CH\u2082CH\u2082CH\u2083",6,7],["CH\u2083CH(CH\u2083)CH\u2082CH(CH\u2083)CH\u2083",5,7],
    ["CH\u2083CH(CH\u2083)CH(CH\u2083)CH\u2082CH\u2083",5,7],["CH\u2083CH\u2082CH(CH\u2082CH\u2083)CH\u2082CH\u2082CH\u2083",6,8],["CH\u2083C(CH\u2083)\u2082CH\u2082CH\u2082CH\u2083",5,7],
    ["CH\u2083CH\u2082C(CH\u2083)\u2082CH\u2082CH\u2083",5,7],["CH\u2083CH(CH\u2083)CH\u2082CH\u2082CH\u2082CH\u2082CH\u2083",7,8],["CH\u2083CH\u2082CH(CH\u2083)CH\u2082CH\u2082CH\u2082CH\u2083",7,8],
    ["CH\u2083C(CH\u2083)\u2082CH\u2082CH\u2082CH\u2082CH\u2083",6,8],
    ["CH\u2082=CHCH(CH\u2083)CH\u2083",4,5],["CH\u2083C(CH\u2083)=CHCH\u2083",4,5],["CH\u2082=C(CH\u2083)CH\u2082CH\u2083",4,5],["CH\u2082=CHCH\u2082CH(CH\u2083)CH\u2083",5,6],["CH\u2083CH=C(CH\u2083)CH\u2082CH\u2083",5,6],
    ["HC\u2261CCH(CH\u2083)CH\u2083",4,5],["CH\u2083C\u2261CCH(CH\u2083)CH\u2083",5,6],["HC\u2261CCH\u2082CH(CH\u2083)CH\u2083",5,6]];
  var it=pick(T); var askTotal=(ri(0,1)===1);
  var q;
  if(askTotal){
    q=numq("How many carbon atoms in total, including branches, are in "+it[0]+"?",it[2],0,
      "Count every carbon: the groups in the main chain plus each branch carbon, including the carbons inside brackets. The total is "+it[2]+" carbons.",
      {ask:"total",struct:it[0]});
  }
  else{
    q=numq("How many carbon atoms are in the longest continuous chain of "+it[0]+"?",it[1],0,
      "Trace the longest unbroken run of carbon atoms through the structure, turning at a branch if that gives a longer run. Branch carbons hanging off the chain do not count. The longest chain has "+it[1]+" carbons.",
      {ask:"parent",struct:it[0]});
  }
  var f=chemCondensedFigure(it[0]); if(f)q.figure=f;
  return q;
});
E("u3-73-name-hard",3,["7.3"],3,"gen",function(){
  var roots=["","","","prop","but","pent","hex","hept","oct"];
  function grp(h,brs){
    var core=(h===3)?"CH\u2083":((h===2)?"CH\u2082":((h===1)?"CH":"C"));
    if(!brs||!brs.length){return core;}
    var m=brs.filter(function(b){return b==="m";}).length; var e=brs.length-m; var s=core;
    if(m===1){s+="(CH\u2083)";} else if(m===2){s+="(CH\u2083)\u2082";}
    if(e===1){s+="(CH\u2082CH\u2083)";}
    return s;
  }
  function buildAlkane(L,br){
    var out=""; for(var i=1;i<=L;i++){var brs=[]; br.forEach(function(b){if(b[0]===i){brs.push(b[1]);}}); var base=(i===1||i===L)?3:2; out+=grp(base-brs.length,brs);} return out;
  }
  function buildUnsat(L,d,br,triple){
    var out=""; for(var i=1;i<=L;i++){var brs=[]; br.forEach(function(b){if(b[0]===i){brs.push(b[1]);}}); var base=(i===1||i===L)?3:2; if(i===d||i===d+1){base-=(triple?2:1);} out+=grp(base-brs.length,brs); if(i===d){out+=(triple?"\u2261":"=");}} return out;
  }
  function brName(br,L,suffix){
    var mp=br.filter(function(b){return b[1]==="m";}).map(function(b){return b[0];}).sort(function(a,b){return a-b;});
    var ep=br.filter(function(b){return b[1]==="e";}).map(function(b){return b[0];}).sort(function(a,b){return a-b;});
    var parts=[];
    if(ep.length){parts.push(ep.join(",")+"-ethyl");}
    if(mp.length){parts.push(mp.join(",")+"-"+(mp.length>1?"di":"")+"methyl");}
    return (parts.length?parts.join("-"):"")+roots[L]+suffix;
  }
  var SPECS=[];
  [[4,[[2,"m"]]],[4,[[2,"m"],[2,"m"]]],[4,[[2,"m"],[3,"m"]]],[5,[[2,"m"]]],[5,[[3,"m"]]],[5,[[2,"m"],[2,"m"]]],[5,[[2,"m"],[3,"m"]]],[5,[[3,"m"],[3,"m"]]],[5,[[3,"e"]]],
   [6,[[2,"m"]]],[6,[[3,"m"]]],[6,[[2,"m"],[2,"m"]]],[6,[[2,"m"],[3,"m"]]],[6,[[2,"m"],[4,"m"]]],[6,[[3,"m"],[3,"m"]]],[6,[[3,"m"],[4,"m"]]],[6,[[3,"e"]]],
   [7,[[2,"m"]]],[7,[[3,"m"]]],[7,[[4,"m"]]],[7,[[2,"m"],[2,"m"]]],[7,[[2,"m"],[3,"m"]]],[7,[[2,"m"],[4,"m"]]],[7,[[3,"m"],[3,"m"]]],[7,[[3,"e"]]],
   [8,[[2,"m"]]],[8,[[3,"m"]]],[8,[[4,"m"]]]].forEach(function(s){SPECS.push({struct:buildAlkane(s[0],s[1]),name:brName(s[1],s[0],"ane")});});
  [[4,1,[[3,"m"]],"ene"],[4,2,[[2,"m"]],"ene"],[4,1,[[2,"m"]],"ene"],[5,1,[[3,"m"]],"ene"],[5,2,[[3,"m"]],"ene"],[5,2,[[2,"m"]],"ene"],[5,1,[[2,"m"]],"ene"],[5,2,[[4,"m"]],"ene"],[5,1,[[4,"m"]],"ene"],[6,2,[[2,"m"]],"ene"],[6,3,[[3,"m"]],"ene"],[6,1,[[3,"m"]],"ene"]].forEach(function(s){
    var nm=brName(s[2],s[0],"-"+s[1]+"-"+s[3]); SPECS.push({struct:buildUnsat(s[0],s[1],s[2],false),name:nm});});
  [[4,1,[[3,"m"]],"yne"],[5,2,[[4,"m"]],"yne"],[5,1,[[4,"m"]],"yne"],[5,1,[[3,"m"]],"yne"],[6,3,[[2,"m"]],"yne"]].forEach(function(s){
    var nm=brName(s[2],s[0],"-"+s[1]+"-"+s[3]); SPECS.push({struct:buildUnsat(s[0],s[1],s[2],true),name:nm});});
  var it=pick(SPECS); var form=ri(0,1);
  var prompt=(form===0)?("Write the IUPAC name of "+it.struct+"."):("A hydrocarbon has the condensed structure "+it.struct+". Write its IUPAC name.");
  var answers=[it.name]; if(it.alt&&it.alt!==it.name){answers.push(it.alt);}
  var q=textq(prompt,answers,
    "Find the longest chain containing any multiple bond. Number it so the multiple bond, then the branches, get the lowest positions. Name the branches with their positions in front of the parent name. The name is "+it.name+".",
    {name:it.name,form:form});
  var f=chemCondensedFigure(it.struct); if(f)q.figure=f;
  return q;
});
E("u3-73-formula-branch",3,["7.3"],3,"gen",function(){
  var T=[
    ["2-methylpropane",4,"alkane"],["2-methylbutane",5,"alkane"],["2,2-dimethylpropane",5,"alkane"],["3-methylpentane",6,"alkane"],["2-methylpentane",6,"alkane"],["2,2-dimethylbutane",6,"alkane"],["2,3-dimethylbutane",6,"alkane"],["3-ethylpentane",7,"alkane"],["3-methylhexane",7,"alkane"],["2-methylhexane",7,"alkane"],["2,4-dimethylpentane",7,"alkane"],["2,3-dimethylpentane",7,"alkane"],["3-ethylhexane",8,"alkane"],["2,2-dimethylpentane",7,"alkane"],["3,3-dimethylpentane",7,"alkane"],["2-methylheptane",8,"alkane"],["3-methylheptane",8,"alkane"],["2,2-dimethylhexane",8,"alkane"],
    ["3-methylbut-1-ene",5,"alkene"],["2-methylbut-2-ene",5,"alkene"],["2-methylbut-1-ene",5,"alkene"],["4-methylpent-1-ene",6,"alkene"],["3-methylpent-2-ene",6,"alkene"],["2-methylpent-2-ene",6,"alkene"],["3-methylhex-1-ene",7,"alkene"],
    ["3-methylbut-1-yne",5,"alkyne"],["4-methylpent-2-yne",6,"alkyne"],["4-methylpent-1-yne",6,"alkyne"],["3-methylpent-1-yne",6,"alkyne"],["2-methylhex-3-yne",7,"alkyne"],
    ["but-1-ene",4,"alkene"],["pent-2-ene",5,"alkene"],["hex-3-ene",6,"alkene"],["hept-2-ene",7,"alkene"],["oct-1-ene",8,"alkene"],["but-2-yne",4,"alkyne"],["pent-1-yne",5,"alkyne"],["hex-3-yne",6,"alkyne"],["hept-3-yne",7,"alkyne"],["oct-2-yne",8,"alkyne"]];
  var it=pick(T); var T2=it[1]; var fam=it[2];
  var h=(fam==="alkane")?(2*T2+2):((fam==="alkene")?(2*T2):(2*T2-2));
  var gen=(fam==="alkane")?"C\u2099H\u2082\u2099\u208A\u2082":((fam==="alkene")?"C\u2099H\u2082\u2099":"C\u2099H\u2082\u2099\u208B\u2082");
  var form=ri(0,1);
  var prompt=(form===0)?("Write the molecular formula of "+it[0]+"."):("Give the molecular formula of the compound "+it[0]+", counting the branch carbons as well.");
  return textq(prompt,["C"+T2+"H"+h],
    "Count all the carbons, including branches: "+it[0]+" has "+T2+" carbons in total. It is an "+fam+", so use "+gen+" with n equal to "+T2+". The formula is C"+T2+"H"+h+". Write it without subscripts, for example C7H16.",
    {name:it[0],total:T2,family:fam});
});

/* 7.4 Isomers */
E("u3-74-def",3,["7.4"],1,"gen",function(){
  var PAIRS=[["butane","2-methylpropane","C\u2084H\u2081\u2080"],["pentane","2-methylbutane","C\u2085H\u2081\u2082"],["pentane","2,2-dimethylpropane","C\u2085H\u2081\u2082"],["2-methylbutane","2,2-dimethylpropane","C\u2085H\u2081\u2082"],["hexane","2-methylpentane","C\u2086H\u2081\u2084"],["hexane","3-methylpentane","C\u2086H\u2081\u2084"],["2-methylpentane","2,2-dimethylbutane","C\u2086H\u2081\u2084"],["3-methylpentane","2,3-dimethylbutane","C\u2086H\u2081\u2084"],["but-1-ene","but-2-ene","C\u2084H\u2088"],["but-1-ene","2-methylpropene","C\u2084H\u2088"],["pent-1-ene","pent-2-ene","C\u2085H\u2081\u2080"],["pent-1-ene","2-methylbut-2-ene","C\u2085H\u2081\u2080"],["propanal","propanone","C\u2083H\u2086O"],["ethanol","methoxymethane","C\u2082H\u2086O"],["propan-1-ol","propan-2-ol","C\u2083H\u2088O"],["propan-1-ol","methoxyethane","C\u2083H\u2088O"],["ethanoic acid","methyl methanoate","C\u2082H\u2084O\u2082"],["propanoic acid","methyl ethanoate","C\u2083H\u2086O\u2082"],["butan-1-ol","ethoxyethane","C\u2084H\u2081\u2080O"],["pentan-2-one","pentan-3-one","C\u2085H\u2081\u2080O"]];
  var it=pick(PAIRS); var form=ri(0,2);
  var prompts=[
    it[0]+" and "+it[1]+" both have the molecular formula "+it[2]+" but different structures. Compounds like these are called:",
    "Compounds with the same molecular formula but different structural formulas, such as "+it[0]+" and "+it[1]+" ("+it[2]+"), are called:",
    "Which term describes the relationship between "+it[0]+" and "+it[1]+", which share the formula "+it[2]+" but have different structures?"];
  var ds=shuffle(["isotopes","allotropes","monomers"]).slice(0,3);
  return mcq(prompts[form],"structural isomers",ds,
    "Structural isomers have the same molecular formula but different structural formulas. "+it[0]+" and "+it[1]+" both are "+it[2]+", arranged in different ways, so they are structural isomers.",
    {pair:it[0]+"/"+it[1],form:form});
});
E("u3-74-which-pair",3,["7.4"],2,"gen",function(){
  var ISO=[["butane","CH\u2083CH\u2082CH\u2082CH\u2083","2-methylpropane","CH\u2083CH(CH\u2083)CH\u2083"],["pentane","CH\u2083CH\u2082CH\u2082CH\u2082CH\u2083","2-methylbutane","CH\u2083CH(CH\u2083)CH\u2082CH\u2083"],["pentane","CH\u2083CH\u2082CH\u2082CH\u2082CH\u2083","2,2-dimethylpropane","C(CH\u2083)\u2084"],["hexane","CH\u2083CH\u2082CH\u2082CH\u2082CH\u2082CH\u2083","2-methylpentane","CH\u2083CH(CH\u2083)CH\u2082CH\u2082CH\u2083"],["hexane","CH\u2083CH\u2082CH\u2082CH\u2082CH\u2082CH\u2083","3-methylpentane","CH\u2083CH\u2082CH(CH\u2083)CH\u2082CH\u2083"],["but-1-ene","CH\u2082=CHCH\u2082CH\u2083","but-2-ene","CH\u2083CH=CHCH\u2083"],["but-1-ene","CH\u2082=CHCH\u2082CH\u2083","2-methylpropene","CH\u2082=C(CH\u2083)CH\u2083"],["pent-1-ene","CH\u2082=CHCH\u2082CH\u2082CH\u2083","pent-2-ene","CH\u2083CH=CHCH\u2082CH\u2083"],["propanal","CH\u2083CH\u2082CHO","propanone","CH\u2083COCH\u2083"],["ethanol","CH\u2083CH\u2082OH","methoxymethane","CH\u2083OCH\u2083"],["propan-1-ol","CH\u2083CH\u2082CH\u2082OH","propan-2-ol","CH\u2083CH(OH)CH\u2083"],["propan-1-ol","CH\u2083CH\u2082CH\u2082OH","methoxyethane","CH\u2083OCH\u2082CH\u2083"]];
  var FALSE=[["butane","CH\u2083CH\u2082CH\u2082CH\u2083","pentane","CH\u2083CH\u2082CH\u2082CH\u2082CH\u2083"],["methane","CH\u2084","ethane","CH\u2083CH\u2083"],["propane","CH\u2083CH\u2082CH\u2083","butane","CH\u2083CH\u2082CH\u2082CH\u2083"],["propene","CH\u2082=CHCH\u2083","but-1-ene","CH\u2082=CHCH\u2082CH\u2083"],["pentane","CH\u2083CH\u2082CH\u2082CH\u2082CH\u2083","pentane","CH\u2083(CH\u2082)\u2083CH\u2083"],["butane","CH\u2083CH\u2082CH\u2082CH\u2083","butan-1-ol","CH\u2083CH\u2082CH\u2082CH\u2082OH"],["propane","CH\u2083CH\u2082CH\u2083","propanal","CH\u2083CH\u2082CHO"],["ethene","CH\u2082=CH\u2082","ethanol","CH\u2083CH\u2082OH"],["hexane","CH\u2083CH\u2082CH\u2082CH\u2082CH\u2082CH\u2083","heptane","CH\u2083CH\u2082CH\u2082CH\u2082CH\u2082CH\u2082CH\u2083"],["ethanol","CH\u2083CH\u2082OH","propan-1-ol","CH\u2083CH\u2082CH\u2082OH"],["propanone","CH\u2083COCH\u2083","butan-2-one","CH\u2083COCH\u2082CH\u2083"],["ethanoic acid","CH\u2083COOH","methyl ethanoate","CH\u2083COOCH\u2083"]];
  function pairText(p){return p[0]+" ("+p[1]+") and "+p[2]+" ("+p[3]+")";}
  var correct=pairText(pick(ISO));
  var fs=shuffle(FALSE.slice()).map(pairText).filter(function(t){return t!==correct;});
  var ds=fs.slice(0,3);
  var lead=pick(["In a practice set, four pairs of compounds are shown. ","A teacher lists four pairs on the board. ","During a review game, four pairs are displayed. ","In a workbook exercise, four pairs are given. ","A quiz shows four pairs of compounds. ","Four pairs appear in a set of flashcards. "]);
  return mcq(lead+"Which pair of compounds are structural isomers?",correct,ds,
    "Structural isomers share one molecular formula but differ in structure. Check each pair by counting atoms: only the correct pair has the same formula for both compounds, with different structures. Note that one pair shows the same compound written in two ways, which is not isomerism.",
    {pair:correct});
});
E("u3-74-isomer-count",3,["7.4"],2,"gen",function(){
  var D=[["butane","C\u2084H\u2081\u2080",4,2],["pentane","C\u2085H\u2081\u2082",5,3],["hexane","C\u2086H\u2081\u2084",6,5],["heptane","C\u2087H\u2081\u2086",7,9],["octane","C\u2088H\u2081\u2088",8,18]];
  var it=pick(D); var form=ri(0,2); var ctx=pick(["found in a fuel blend","found in a solvent mixture","listed in a data book","used in an exam review","found in a lab sample","listed in a refinery report"]);
  var prompts=[
    "How many structural isomers does the alkane "+it[0]+" ("+it[1]+"), "+ctx+", have?",
    "The alkane with formula "+it[1]+" is "+ctx+". How many structural isomers does it have?",
    "How many different structural formulas can be drawn for the alkane with "+it[2]+" carbons, "+it[0]+", "+ctx+"?"];
  return numq(prompts[form],it[3],0,
    "Draw the chain in every possible arrangement, avoiding repeats: the straight chain, then shorter chains with branches. "+it[0]+" has "+it[3]+" structural isomers.",
    {alkane:it[0],form:form});
});
E("u3-74-shared-formula",3,["7.4"],3,"gen",function(){
  var PAIRS=[["butane","CH\u2083CH\u2082CH\u2082CH\u2083","2-methylpropane","CH\u2083CH(CH\u2083)CH\u2083","C4H10","C\u2084H\u2081\u2080"],["pentane","CH\u2083CH\u2082CH\u2082CH\u2082CH\u2083","2-methylbutane","CH\u2083CH(CH\u2083)CH\u2082CH\u2083","C5H12","C\u2085H\u2081\u2082"],["pentane","CH\u2083CH\u2082CH\u2082CH\u2082CH\u2083","2,2-dimethylpropane","C(CH\u2083)\u2084","C5H12","C\u2085H\u2081\u2082"],["2-methylbutane","CH\u2083CH(CH\u2083)CH\u2082CH\u2083","2,2-dimethylpropane","C(CH\u2083)\u2084","C5H12","C\u2085H\u2081\u2082"],["hexane","CH\u2083CH\u2082CH\u2082CH\u2082CH\u2082CH\u2083","2-methylpentane","CH\u2083CH(CH\u2083)CH\u2082CH\u2082CH\u2083","C6H14","C\u2086H\u2081\u2084"],["hexane","CH\u2083CH\u2082CH\u2082CH\u2082CH\u2082CH\u2083","3-methylpentane","CH\u2083CH\u2082CH(CH\u2083)CH\u2082CH\u2083","C6H14","C\u2086H\u2081\u2084"],["2-methylpentane","CH\u2083CH(CH\u2083)CH\u2082CH\u2082CH\u2083","2,2-dimethylbutane","CH\u2083C(CH\u2083)\u2082CH\u2082CH\u2083","C6H14","C\u2086H\u2081\u2084"],["3-methylpentane","CH\u2083CH\u2082CH(CH\u2083)CH\u2082CH\u2083","2,3-dimethylbutane","CH\u2083CH(CH\u2083)CH(CH\u2083)CH\u2083","C6H14","C\u2086H\u2081\u2084"],["but-1-ene","CH\u2082=CHCH\u2082CH\u2083","but-2-ene","CH\u2083CH=CHCH\u2083","C4H8","C\u2084H\u2088"],["but-1-ene","CH\u2082=CHCH\u2082CH\u2083","2-methylpropene","CH\u2082=C(CH\u2083)CH\u2083","C4H8","C\u2084H\u2088"],["but-2-ene","CH\u2083CH=CHCH\u2083","cyclobutane","(CH\u2082)\u2084 ring","C4H8","C\u2084H\u2088"],["pent-1-ene","CH\u2082=CHCH\u2082CH\u2082CH\u2083","pent-2-ene","CH\u2083CH=CHCH\u2082CH\u2083","C5H10","C\u2085H\u2081\u2080"],["pent-1-ene","CH\u2082=CHCH\u2082CH\u2082CH\u2083","2-methylbut-2-ene","CH\u2083C(CH\u2083)=CHCH\u2083","C5H10","C\u2085H\u2081\u2080"],["pent-2-ene","CH\u2083CH=CHCH\u2082CH\u2083","cyclopentane","(CH\u2082)\u2085 ring","C5H10","C\u2085H\u2081\u2080"],["2-methylbut-1-ene","CH\u2082=C(CH\u2083)CH\u2082CH\u2083","3-methylbut-1-ene","CH\u2082=CHCH(CH\u2083)CH\u2083","C5H10","C\u2085H\u2081\u2080"],["propanal","CH\u2083CH\u2082CHO","propanone","CH\u2083COCH\u2083","C3H6O","C\u2083H\u2086O"],["ethanol","CH\u2083CH\u2082OH","methoxymethane","CH\u2083OCH\u2083","C2H6O","C\u2082H\u2086O"],["propan-1-ol","CH\u2083CH\u2082CH\u2082OH","propan-2-ol","CH\u2083CH(OH)CH\u2083","C3H8O","C\u2083H\u2088O"],["propan-1-ol","CH\u2083CH\u2082CH\u2082OH","methoxyethane","CH\u2083OCH\u2082CH\u2083","C3H8O","C\u2083H\u2088O"],["ethanoic acid","CH\u2083COOH","methyl methanoate","HCOOCH\u2083","C2H4O2","C\u2082H\u2084O\u2082"]];
  var TRIPLES=[["pentane","CH\u2083CH\u2082CH\u2082CH\u2082CH\u2083","2-methylbutane","CH\u2083CH(CH\u2083)CH\u2082CH\u2083","2,2-dimethylpropane","C(CH\u2083)\u2084","C5H12","C\u2085H\u2081\u2082"],["hexane","CH\u2083CH\u2082CH\u2082CH\u2082CH\u2082CH\u2083","2-methylpentane","CH\u2083CH(CH\u2083)CH\u2082CH\u2082CH\u2083","3-methylpentane","CH\u2083CH\u2082CH(CH\u2083)CH\u2082CH\u2083","C6H14","C\u2086H\u2081\u2084"],["propan-1-ol","CH\u2083CH\u2082CH\u2082OH","propan-2-ol","CH\u2083CH(OH)CH\u2083","methoxyethane","CH\u2083OCH\u2082CH\u2083","C3H8O","C\u2083H\u2088O"]];
  var useTriple=(ri(0,3)===0); var form=ri(0,2);
  if(useTriple){
    var t=pick(TRIPLES);
    var promptT=(form===0)?("The three compounds "+t[1]+", "+t[3]+" and "+t[5]+" are structural isomers of each other. Write the molecular formula they all share."):("Three isomers are shown: "+t[1]+", "+t[3]+", "+t[5]+". Write their shared molecular formula.");
    var qT=textq(promptT,[t[6]],
      "Count the atoms in any one structure, including branch carbons and the hydrogens on each group. All three give the same count, "+t[7]+". Write the formula without subscripts, for example C5H12.",
      {formula:t[6],triple:true});
    var fT=chemMultiFigure([t[1],t[3],t[5]],null); if(fT)qT.figure=fT;
    return qT;
  }
  var it=pick(PAIRS);
  var prompt=(form===0)?("The compounds "+it[1]+" and "+it[3]+" are structural isomers. Write the molecular formula they share."):((form===1)?("Two structural isomers are shown: "+it[1]+" and "+it[3]+". Write their shared molecular formula."):("Isomers have the same molecular formula. For the pair "+it[1]+" and "+it[3]+", write that shared formula."));
  var q=textq(prompt,[it[4]],
    "Count the atoms in one structure, including every branch. Both structures contain the same atoms, giving "+it[5]+". Write the formula without subscripts, for example C5H12.",
    {formula:it[4],triple:false});
  var f=chemMultiFigure([it[1],it[3]],null); if(f)q.figure=f;
  return q;
});
E("u3-74-evaluate-claim",3,["7.4"],2,"gen",function(){
  var CASES=[
    {a:"butane",b:"pentane",fa:"C\u2084H\u2081\u2080",fb:"C\u2085H\u2081\u2082",v:"diff"},
    {a:"propane",b:"butane",fa:"C\u2083H\u2088",fb:"C\u2084H\u2081\u2080",v:"diff"},
    {a:"ethene",b:"propene",fa:"C\u2082H\u2084",fb:"C\u2083H\u2086",v:"diff"},
    {a:"ethanol",b:"propan-1-ol",fa:"C\u2082H\u2086O",fb:"C\u2083H\u2088O",v:"diff"},
    {a:"propanone",b:"butan-2-one",fa:"C\u2083H\u2086O",fb:"C\u2084H\u2088O",v:"diff"},
    {a:"methane",b:"ethane",fa:"CH\u2084",fb:"C\u2082H\u2086",v:"diff"},
    {a:"pentane, CH\u2083CH\u2082CH\u2082CH\u2082CH\u2083",b:"pentane, CH\u2083(CH\u2082)\u2083CH\u2083",fa:"C\u2085H\u2081\u2082",fb:"C\u2085H\u2081\u2082",v:"same"},
    {a:"butan-1-ol, CH\u2083CH\u2082CH\u2082CH\u2082OH",b:"butan-1-ol, HOCH\u2082CH\u2082CH\u2082CH\u2083",fa:"C\u2084H\u2081\u2080O",fb:"C\u2084H\u2081\u2080O",v:"same"},
    {a:"butane",b:"2-methylpropane",fa:"C\u2084H\u2081\u2080",fb:"C\u2084H\u2081\u2080",v:"iso"},
    {a:"pentane",b:"2-methylbutane",fa:"C\u2085H\u2081\u2082",fb:"C\u2085H\u2081\u2082",v:"iso"},
    {a:"propanal",b:"propanone",fa:"C\u2083H\u2086O",fb:"C\u2083H\u2086O",v:"iso"},
    {a:"ethanol",b:"methoxymethane",fa:"C\u2082H\u2086O",fb:"C\u2082H\u2086O",v:"iso"},
    {a:"hexane",b:"3-methylpentane",fa:"C\u2086H\u2081\u2084",fb:"C\u2086H\u2081\u2084",v:"iso"},
    {a:"but-1-ene",b:"but-2-ene",fa:"C\u2084H\u2088",fb:"C\u2084H\u2088",v:"iso"}];
  var c=pick(CASES); var ctx=pick(["on a quiz","in a lab report","during group work","in homework"]);
  function stmt(v){
    if(v==="iso"){return "The claim is correct: both compounds have the formula "+c.fa+" but different structures";}
    if(v==="same"){return "The claim is incorrect: the two writings show the same compound, not two different structures";}
    return "The claim is incorrect: the formulas differ, "+c.fa+" and "+c.fb+", so they cannot be isomers";
  }
  var correct=stmt(c.v);
  var others=["iso","same","diff"].filter(function(v){return v!==c.v;}).map(stmt);
  var extra="The claim is correct: both compounds have the formula "+c.fa+" and identical structures";
  if(extra===correct){extra="The claim is incorrect: isomers must have different formulas";}
  var ds=shuffle(others.concat([extra])).slice(0,3);
  return mcq("A student claims "+ctx+" that "+c.a+" and "+c.b+" are structural isomers. Which statement correctly evaluates the claim?",
    correct,ds,
    "Isomers must have the same molecular formula and different structures. Here the correct evaluation is: "+correct+".",
    {verdict:c.v,ctx:ctx});
});
E("u3-74-relationship",3,["7.4"],3,"gen",function(){
  var SAME=[["butane (CH\u2083CH\u2082CH\u2082CH\u2083)","butane (CH\u2083(CH\u2082)\u2082CH\u2083)"],["2-methylpentane (CH\u2083CH(CH\u2083)CH\u2082CH\u2082CH\u2083)","2-methylpentane (CH\u2083CH\u2082CH\u2082CH(CH\u2083)CH\u2083)"],["propan-1-ol (CH\u2083CH\u2082CH\u2082OH)","propan-1-ol (HOCH\u2082CH\u2082CH\u2083)"],["pentane (CH\u2083CH\u2082CH\u2082CH\u2082CH\u2083)","pentane (CH\u2083(CH\u2082)\u2083CH\u2083)"]];
  var ISO=[["butane (CH\u2083CH\u2082CH\u2082CH\u2083)","2-methylpropane (CH\u2083CH(CH\u2083)CH\u2083)"],["pentane (CH\u2083CH\u2082CH\u2082CH\u2082CH\u2083)","2-methylbutane (CH\u2083CH(CH\u2083)CH\u2082CH\u2083)"],["hexane (CH\u2083CH\u2082CH\u2082CH\u2082CH\u2082CH\u2083)","3-methylpentane (CH\u2083CH\u2082CH(CH\u2083)CH\u2082CH\u2083)"],["but-1-ene (CH\u2082=CHCH\u2082CH\u2083)","but-2-ene (CH\u2083CH=CHCH\u2083)"],["propanal (CH\u2083CH\u2082CHO)","propanone (CH\u2083COCH\u2083)"],["ethanol (CH\u2083CH\u2082OH)","methoxymethane (CH\u2083OCH\u2083)"],["propan-1-ol (CH\u2083CH\u2082CH\u2082OH)","methoxyethane (CH\u2083OCH\u2082CH\u2083)"],["pent-1-ene (CH\u2082=CHCH\u2082CH\u2082CH\u2083)","pent-2-ene (CH\u2083CH=CHCH\u2082CH\u2083)"]];
  var DIFF=[["butane (CH\u2083CH\u2082CH\u2082CH\u2083)","pentane (CH\u2083CH\u2082CH\u2082CH\u2082CH\u2083)"],["propene (CH\u2082=CHCH\u2083)","but-1-ene (CH\u2082=CHCH\u2082CH\u2083)"],["ethanol (CH\u2083CH\u2082OH)","propanal (CH\u2083CH\u2082CHO)"],["propane (CH\u2083CH\u2082CH\u2083)","propene (CH\u2082=CHCH\u2083)"],["methane (CH\u2084)","ethane (CH\u2083CH\u2083)"],["ethanoic acid (CH\u2083COOH)","methyl ethanoate (CH\u2083COOCH\u2083)"],["propanone (CH\u2083COCH\u2083)","butan-2-one (CH\u2083COCH\u2082CH\u2083)"],["cyclohexane ((CH\u2082)\u2086 ring)","benzene (C\u2086H\u2086 ring)"]];
  var cat=pick(["same","iso","diff"]); var pair=pick(cat==="same"?SAME:(cat==="iso"?ISO:DIFF));
  var S={
    same:"They are the same compound: same formula and same structure",
    iso:"They are structural isomers: same formula, different structure",
    diff:"They are not isomers: the molecular formulas are different",
    trap:"They are structural isomers: same structure but different formulas"};
  var form=ri(0,2);
  var prompt=(form===0)?("How are these two compounds related: "+pair[0]+" and "+pair[1]+"?"):((form===1)?("Two compounds are shown: "+pair[0]+" and "+pair[1]+". Which statement describes their relationship?"):("Decide how these compounds are related: "+pair[0]+" and "+pair[1]+"."));
  var ds=[S.same,S.iso,S.diff,S.trap].filter(function(x){return x!==S[cat];});
  var q=mcq(prompt,S[cat],ds,
    "Compare the molecular formulas first, then the structures. For this pair the correct description is: "+S[cat]+".",
    {pair:pair[0],cat:cat,form:form});
  function structOf(s){return s.slice(s.indexOf("(")+1,s.lastIndexOf(")"));}
  var f=chemPairFigure(structOf(pair[0]),structOf(pair[1])); if(f)q.figure=f;
  return q;
});

/* 7.5 Aromatic compounds */
E("u3-75-benzene-basics",3,["7.5"],1,"gen",function(){
  var CTX=[["benzene",6,6],["methylbenzene",7,5],["ethylbenzene",8,5],["chlorobenzene",6,5],["bromobenzene",6,5],["propylbenzene",9,5]];
  var c=pick(CTX); var t=ri(0,8);
  var solB="Benzene, C\u2086H\u2086, has a flat ring of six carbon atoms, each bonded to one hydrogen. Its derivatives keep the six carbon ring and replace one or more ring hydrogens with other groups.";
  if(t===0){var ds0=shuffle(["4","5","7","8"]).slice(0,3); return mcq("How many carbon atoms are in the ring of "+c[0]+"?","6",ds0,solB+" In "+c[0]+" the ring still has six carbons.",{ctx:c[0],t:t});}
  if(t===1){return mcq(c[0]+" belongs to which family of organic compounds?","aromatic",["alkane","alkene","alcohol"],solB+" A compound containing a benzene ring is aromatic.",{ctx:c[0],t:t});}
  if(t===2){return mcq("The ring in "+c[0]+" is best described as:","a flat ring of six carbon atoms",["a flat ring of five carbon atoms","a chain of six carbon atoms","a ring of six carbon and six oxygen atoms"],solB,{ctx:c[0],t:t});}
  if(t===3){return mcq("In the usual drawing of the ring in "+c[0]+", the ring is drawn as:","a hexagon with a circle inside",["a pentagon with a circle inside","a hexagon with a cross inside","a square with a circle inside"],solB+" The circle represents the shared ring of bonding electrons in the benzene ring.",{ctx:c[0],t:t});}
  if(t===4){var ds4=shuffle(["5","7","12"]).slice(0,3); return mcq("Counting only the atoms in the ring itself, how many atoms make up the ring in "+c[0]+"?","6",ds4,solB+" Only the six ring carbons count; attached hydrogens and side groups are outside the ring.",{ctx:c[0],t:t});}
  if(t===5){return mcq(c[0]+" is classified as aromatic because it contains:","a benzene ring",["a carbon to carbon triple bond","a hydroxyl group","a carboxyl group"],solB,{ctx:c[0],t:t});}
  if(t===6){return mcq("The six carbons in "+c[0]+" are joined to each other in:","a closed ring",["an open chain","a branched chain","separate pairs"],solB,{ctx:c[0],t:t});}
  if(t===7){var cand=[c[1]+1,c[1]-1,c[1]+2,12,5].filter(function(x,i,a){return x!==c[1]&&x>0&&a.indexOf(x)===i;}); var ds7=shuffle(cand).slice(0,3); return mcq("How many carbon atoms in total does one molecule of "+c[0]+" contain?",String(c[1]),ds7.map(String),solB+" Counting the ring carbons plus any carbons in side groups, "+c[0]+" has "+c[1]+" carbons in total.",{ctx:c[0],t:t});}
  var pool=["4","5","6","7"].filter(function(x){return x!==String(c[2]);});
  return mcq("How many hydrogen atoms are attached directly to ring carbons in "+c[0]+"?",String(c[2]),pool,solB+" In "+c[0]+", "+c[2]+" hydrogens sit on ring carbons; the remaining ring carbon or carbons carry side groups instead.",{ctx:c[0],t:t});
});
E("u3-75-name-derivative",3,["7.5"],2,"gen",function(){
  var T=[["benzene","six carbon ring, C\u2086H\u2086","C\u2086H\u2086"],["methylbenzene","C\u2086H\u2085CH\u2083","C\u2087H\u2088"],["ethylbenzene","C\u2086H\u2085CH\u2082CH\u2083","C\u2088H\u2081\u2080"],["propylbenzene","C\u2086H\u2085CH\u2082CH\u2082CH\u2083","C\u2089H\u2081\u2082"],["chlorobenzene","C\u2086H\u2085Cl","C\u2086H\u2085Cl"],["bromobenzene","C\u2086H\u2085Br","C\u2086H\u2085Br"],["fluorobenzene","C\u2086H\u2085F","C\u2086H\u2085F"],["iodobenzene","C\u2086H\u2085I","C\u2086H\u2085I"]];
  var it=pick(T); var mode=ri(0,3); var ph=pick([""," A sample in the lab is identified from its structure."," The compound is a simple derivative of benzene."]);
  var names=T.map(function(x){return x[0];}); var structs=T.map(function(x){return x[1];}); var forms=T.map(function(x){return x[2];});
  var sol="Simple benzene derivatives are named for the group that replaces a ring hydrogen. "+it[0]+" has the structure "+it[1]+" and formula "+it[2]+".";
  if(mode===0){var q0=mcq("What is the name of the compound with structure "+it[1]+"?"+ph,it[0],shuffle(names.filter(function(x){return x!==it[0];})).slice(0,3),sol,{mode:mode,compound:it[0]}); var f0=chemCondensedFigure(it[1]); if(f0)q0.figure=f0; return q0;}
  if(mode===1){return mcq("Which structure matches the name "+it[0]+"?"+ph,it[1],shuffle(structs.filter(function(x){return x!==it[1];})).slice(0,3),sol,{mode:mode,compound:it[0]});}
  if(mode===2){return mcq("Which molecular formula matches "+it[0]+"?"+ph,it[2],shuffle(forms.filter(function(x){return x!==it[2];})).slice(0,3),sol,{mode:mode,compound:it[0]});}
  return mcq("A compound has the molecular formula "+it[2]+". Which structure could it have?"+ph,it[1],shuffle(structs.filter(function(x){return x!==it[1];})).slice(0,3),sol,{mode:mode,compound:it[0]});
});
E("u3-75-aromatic-formula",3,["7.5"],2,"gen",function(){
  var T=[["benzene","C6H6","C\u2086H\u2086",null],["methylbenzene","C7H8","C\u2087H\u2088","C\u2086H\u2085CH\u2083"],["ethylbenzene","C8H10","C\u2088H\u2081\u2080","C\u2086H\u2085CH\u2082CH\u2083"],["propylbenzene","C9H12","C\u2089H\u2081\u2082","C\u2086H\u2085CH\u2082CH\u2082CH\u2083"],["chlorobenzene","C6H5Cl","C\u2086H\u2085Cl","C\u2086H\u2085Cl"],["bromobenzene","C6H5Br","C\u2086H\u2085Br","C\u2086H\u2085Br"],["fluorobenzene","C6H5F","C\u2086H\u2085F","C\u2086H\u2085F"],["iodobenzene","C6H5I","C\u2086H\u2085I","C\u2086H\u2085I"],["1,2-dimethylbenzene","C8H10","C\u2088H\u2081\u2080","C\u2086H\u2084(CH\u2083)\u2082"],["1,3-dimethylbenzene","C8H10","C\u2088H\u2081\u2080","C\u2086H\u2084(CH\u2083)\u2082"],["1,4-dimethylbenzene","C8H10","C\u2088H\u2081\u2080","C\u2086H\u2084(CH\u2083)\u2082"],["chloromethylbenzene","C7H7Cl","C\u2087H\u2087Cl","C\u2086H\u2085CH\u2082Cl"],["1,2-dichlorobenzene","C6H4Cl2","C\u2086H\u2084Cl\u2082","C\u2086H\u2084Cl\u2082"],["1,3-dichlorobenzene","C6H4Cl2","C\u2086H\u2084Cl\u2082","C\u2086H\u2084Cl\u2082"],["1,4-dichlorobenzene","C6H4Cl2","C\u2086H\u2084Cl\u2082","C\u2086H\u2084Cl\u2082"]];
  var it=pick(T); var form=ri(0,2); var pre=pick(["","","Review question: ","Inventory check: "]);
  var prompt="";
  if(it[3]&&form===2){prompt="A compound has the condensed structure "+it[3]+". Write its molecular formula.";}
  else if(form===0){prompt="Write the molecular formula of "+it[0]+".";}
  else if(form===1){prompt="Give the molecular formula of "+it[0]+", the aromatic compound.";}
  else{prompt="Write the molecular formula of "+it[0]+".";}
  prompt=pre+prompt;
  var q=textq(prompt,[it[1]],
    "Start from the benzene ring, C\u2086H\u2086. Each group that replaces a ring hydrogen removes one H and adds its own atoms. Counting all atoms in "+it[0]+" gives "+it[2]+". Write the formula without subscripts, keeping the order C, then H, then other elements, for example C7H8.",
    {name:it[0],form:form});
  if(it[3]&&form===2){var f=chemCondensedFigure(it[3]); if(f)q.figure=f;}
  return q;
});
E("u3-75-aromatic-or-aliphatic",3,["7.5"],2,"gen",function(){
  var AROM=[["benzene","six carbon ring, C\u2086H\u2086","C\u2086H\u2086"],["methylbenzene","C\u2086H\u2085CH\u2083","C\u2087H\u2088"],["ethylbenzene","C\u2086H\u2085CH\u2082CH\u2083","C\u2088H\u2081\u2080"],["propylbenzene","C\u2086H\u2085CH\u2082CH\u2082CH\u2083","C\u2089H\u2081\u2082"],["chlorobenzene","C\u2086H\u2085Cl","C\u2086H\u2085Cl"],["bromobenzene","C\u2086H\u2085Br","C\u2086H\u2085Br"],["fluorobenzene","C\u2086H\u2085F","C\u2086H\u2085F"],["iodobenzene","C\u2086H\u2085I","C\u2086H\u2085I"]];
  var ALI=[["propane","CH\u2083CH\u2082CH\u2083","C\u2083H\u2088"],["pentane","CH\u2083CH\u2082CH\u2082CH\u2082CH\u2083","C\u2085H\u2081\u2082"],["hexane","CH\u2083CH\u2082CH\u2082CH\u2082CH\u2082CH\u2083","C\u2086H\u2081\u2084"],["heptane","CH\u2083CH\u2082CH\u2082CH\u2082CH\u2082CH\u2082CH\u2083","C\u2087H\u2081\u2086"],["propene","CH\u2082=CHCH\u2083","C\u2083H\u2086"],["but-1-ene","CH\u2082=CHCH\u2082CH\u2083","C\u2084H\u2088"],["pent-2-ene","CH\u2083CH=CHCH\u2082CH\u2083","C\u2085H\u2081\u2080"],["propyne","CH\u2083C\u2261CH","C\u2083H\u2084"],["but-2-yne","CH\u2083C\u2261CCH\u2083","C\u2084H\u2086"],["cyclohexane","(CH\u2082)\u2086 ring","C\u2086H\u2081\u2082"],["cyclopentane","(CH\u2082)\u2085 ring","C\u2085H\u2081\u2080"]];
  var arom=(ri(0,1)===0); var it=pick(arom?AROM:ALI); var rep=ri(0,2);
  var shown=(rep===0)?it[0]:((rep===1)?it[1]:it[2]);
  var correct=arom?"An aromatic compound":"An aliphatic hydrocarbon";
  var ds=[arom?"An aliphatic hydrocarbon":"An aromatic compound","An aliphatic derivative","An inorganic compound"];
  var q=mcq("How is the compound "+shown+" classified?",correct,ds,
    (arom?"Aromatic compounds contain a benzene ring. ":"Aliphatic compounds are chains or non benzene rings, with no benzene ring present. ")+"The compound shown is "+it[0]+", so it is "+(arom?"aromatic.":"aliphatic."),
    {compound:it[0],arom:arom,rep:rep});
  if(rep===1){var f=chemCondensedFigure(it[1]); if(f)q.figure=f;}
  return q;
});
E("u3-75-benzene-compare",3,["7.5"],3,"gen",function(){
  var PAIRS=[
    ["benzene","C\u2086H\u2086","cyclohexane","C\u2086H\u2081\u2082",6],
    ["benzene","C\u2086H\u2086","hexane","C\u2086H\u2081\u2084",8],
    ["benzene","C\u2086H\u2086","hex-1-ene","C\u2086H\u2081\u2082",6],
    ["methylbenzene","C\u2087H\u2088","methylcyclohexane","C\u2087H\u2081\u2084",6],
    ["benzene","C\u2086H\u2086","cyclohexene","C\u2086H\u2081\u2080",4]];
  var p=pick(PAIRS); var angle=ri(0,3); var ctx=pick(["in a solvent comparison","in a fuels data table","during a classification exercise"]);
  var lead="Consider "+p[0]+" ("+p[1]+") and "+p[2]+" ("+p[3]+"), compared "+ctx+". ";
  if(angle===0){
    var cand=[p[4]+2,p[4]-2,p[4]+4,p[4]+1].filter(function(x,i,a){return x!==p[4]&&x>0&&a.indexOf(x)===i;});
    return mcq(lead+"How many more hydrogen atoms does one molecule of "+p[2]+" have than one molecule of "+p[0]+"?",
      String(p[4]),shuffle(cand).slice(0,3).map(String),
      "Subtract the hydrogen counts in the two formulas: "+p[3]+" minus "+p[1]+" gives a difference of "+p[4]+" hydrogens. The aromatic ring holds far fewer hydrogens than a saturated ring or chain with the same carbons.",
      {pair:p[0],angle:angle});
  }
  if(angle===1){
    return mcq(lead+"Which statement about the two compounds is correct?",
      p[0]+" is aromatic and "+p[2]+" is aliphatic",
      [p[0]+" is aliphatic and "+p[2]+" is aromatic","Both compounds are aromatic","Both compounds are aliphatic"],
      "Only compounds with a benzene ring are aromatic. "+p[0]+" contains the benzene ring, while "+p[2]+" is a chain or a non benzene ring, so it is aliphatic.",
      {pair:p[0],angle:angle});
  }
  if(angle===2){
    return mcq(lead+"Which of the two compounds is the aromatic one?",p[0],[p[2],"Both of them","Neither of them"],
      "The aromatic compound is the one built on a benzene ring: "+p[0]+". The other compound, "+p[2]+", is aliphatic.",
      {pair:p[0],angle:angle});
  }
  return mcq(lead+"Which statement explains the hydrogen counts of the two compounds?",
    "The benzene ring in "+p[0]+" is unsaturated, so "+p[0]+" holds fewer hydrogens than "+p[2],
    ["The benzene ring in "+p[0]+" is saturated, so "+p[0]+" holds more hydrogens than "+p[2],"Both compounds are saturated, so their hydrogen counts should be equal","The ring in "+p[2]+" contains a benzene ring, so "+p[2]+" holds fewer hydrogens"],
    "A benzene ring is highly unsaturated: its six carbons hold only six hydrogens in benzene itself. A saturated ring or chain with the same carbons holds more hydrogens, as the formulas "+p[1]+" and "+p[3]+" show.",
    {pair:p[0],angle:angle});
});

/* 7.6 Hydrocarbon derivatives */
E("u3-76-group-id",3,["7.6"],1,"gen",function(){
  var DV=[["methanol","CH\u2083OH","alcohol","CH\u2084O"],["ethanol","CH\u2083CH\u2082OH","alcohol","C\u2082H\u2086O"],["propan-1-ol","CH\u2083CH\u2082CH\u2082OH","alcohol","C\u2083H\u2088O"],["propan-2-ol","CH\u2083CH(OH)CH\u2083","alcohol","C\u2083H\u2088O"],["butan-1-ol","CH\u2083CH\u2082CH\u2082CH\u2082OH","alcohol","C\u2084H\u2081\u2080O"],["methanoic acid","HCOOH","carboxylic acid","CH\u2082O\u2082"],["ethanoic acid","CH\u2083COOH","carboxylic acid","C\u2082H\u2084O\u2082"],["propanoic acid","CH\u2083CH\u2082COOH","carboxylic acid","C\u2083H\u2086O\u2082"],["butanoic acid","CH\u2083CH\u2082CH\u2082COOH","carboxylic acid","C\u2084H\u2088O\u2082"],["methyl methanoate","HCOOCH\u2083","ester","C\u2082H\u2084O\u2082"],["methyl ethanoate","CH\u2083COOCH\u2083","ester","C\u2083H\u2086O\u2082"],["ethyl ethanoate","CH\u2083COOCH\u2082CH\u2083","ester","C\u2084H\u2088O\u2082"],["ethyl methanoate","HCOOCH\u2082CH\u2083","ester","C\u2083H\u2086O\u2082"],["methyl propanoate","CH\u2083CH\u2082COOCH\u2083","ester","C\u2084H\u2088O\u2082"],["methanal","HCHO","aldehyde","CH\u2082O"],["ethanal","CH\u2083CHO","aldehyde","C\u2082H\u2084O"],["propanal","CH\u2083CH\u2082CHO","aldehyde","C\u2083H\u2086O"],["butanal","CH\u2083CH\u2082CH\u2082CHO","aldehyde","C\u2084H\u2088O"],["propanone","CH\u2083COCH\u2083","ketone","C\u2083H\u2086O"],["butan-2-one","CH\u2083COCH\u2082CH\u2083","ketone","C\u2084H\u2088O"],["pentan-3-one","CH\u2083CH\u2082COCH\u2082CH\u2083","ketone","C\u2085H\u2081\u2080O"],["pentan-2-one","CH\u2083COCH\u2082CH\u2082CH\u2083","ketone","C\u2085H\u2081\u2080O"],["methoxymethane","CH\u2083OCH\u2083","ether","C\u2082H\u2086O"],["methoxyethane","CH\u2083OCH\u2082CH\u2083","ether","C\u2083H\u2088O"],["ethoxyethane","CH\u2083CH\u2082OCH\u2082CH\u2083","ether","C\u2084H\u2081\u2080O"],["methylamine","CH\u2083NH\u2082","amine","CH\u2085N"],["ethylamine","CH\u2083CH\u2082NH\u2082","amine","C\u2082H\u2087N"],["propylamine","CH\u2083CH\u2082CH\u2082NH\u2082","amine","C\u2083H\u2089N"],["ethanamide","CH\u2083CONH\u2082","amide","C\u2082H\u2085NO"],["propanamide","CH\u2083CH\u2082CONH\u2082","amide","C\u2083H\u2087NO"],["chloromethane","CH\u2083Cl","halogen compound","CH\u2083Cl"],["chloroethane","CH\u2083CH\u2082Cl","halogen compound","C\u2082H\u2085Cl"],["bromoethane","CH\u2083CH\u2082Br","halogen compound","C\u2082H\u2085Br"],["2-chloropropane","CH\u2083CHClCH\u2083","halogen compound","C\u2083H\u2087Cl"]];
  var GRP={"alcohol":"hydroxyl group, -OH","carboxylic acid":"carboxyl group, -COOH","ester":"ester group, -COO-","aldehyde":"aldehyde group, -CHO","ketone":"ketone group, C=O within the chain","ether":"ether linkage, C-O-C","amine":"amino group, -NH\u2082","amide":"amide group, -CONH\u2082","halogen compound":"a halogen atom bonded to carbon"};
  var it=pick(DV); var form=ri(0,1);
  var shown=(form===0)?it[1]:it[1]+", formula "+it[3];
  var labels=Object.keys(GRP).map(function(k){return GRP[k];});
  var correct=GRP[it[2]];
  var ds=shuffle(labels.filter(function(x){return x!==correct;})).slice(0,3);
  var q=mcq("Which functional group is present in "+shown+"?",correct,ds,
    "Look for the atom pattern that is not part of the hydrocarbon backbone. In "+it[1]+" the functional group is the "+correct+", which makes the compound a member of the "+it[2]+" family.",
    {compound:it[0],form:form});
  var f=chemCondensedFigure(it[1]); if(f)q.figure=f;
  return q;
});
E("u3-76-name-derivative",3,["7.6"],2,"gen",function(){
  var DV=[["methanol","CH\u2083OH"],["ethanol","CH\u2083CH\u2082OH"],["propan-1-ol","CH\u2083CH\u2082CH\u2082OH"],["propan-2-ol","CH\u2083CH(OH)CH\u2083"],["butan-1-ol","CH\u2083CH\u2082CH\u2082CH\u2082OH"],["methanoic acid","HCOOH"],["ethanoic acid","CH\u2083COOH"],["propanoic acid","CH\u2083CH\u2082COOH"],["butanoic acid","CH\u2083CH\u2082CH\u2082COOH"],["methyl methanoate","HCOOCH\u2083"],["methyl ethanoate","CH\u2083COOCH\u2083"],["ethyl ethanoate","CH\u2083COOCH\u2082CH\u2083"],["ethyl methanoate","HCOOCH\u2082CH\u2083"],["methyl propanoate","CH\u2083CH\u2082COOCH\u2083"],["methanal","HCHO"],["ethanal","CH\u2083CHO"],["propanal","CH\u2083CH\u2082CHO"],["butanal","CH\u2083CH\u2082CH\u2082CHO"],["propanone","CH\u2083COCH\u2083"],["butan-2-one","CH\u2083COCH\u2082CH\u2083"],["pentan-3-one","CH\u2083CH\u2082COCH\u2082CH\u2083"],["pentan-2-one","CH\u2083COCH\u2082CH\u2082CH\u2083"],["methoxymethane","CH\u2083OCH\u2083"],["methoxyethane","CH\u2083OCH\u2082CH\u2083"],["ethoxyethane","CH\u2083CH\u2082OCH\u2082CH\u2083"],["methylamine","CH\u2083NH\u2082"],["ethylamine","CH\u2083CH\u2082NH\u2082"],["propylamine","CH\u2083CH\u2082CH\u2082NH\u2082"],["ethanamide","CH\u2083CONH\u2082"],["propanamide","CH\u2083CH\u2082CONH\u2082"],["chloromethane","CH\u2083Cl"],["chloroethane","CH\u2083CH\u2082Cl"],["bromoethane","CH\u2083CH\u2082Br"],["2-chloropropane","CH\u2083CHClCH\u2083"]];
  var it=pick(DV); var mode=ri(0,1);
  var names=DV.map(function(x){return x[0];}); var structs=DV.map(function(x){return x[1];});
  if(mode===0){
    var q=mcq("What is the name of the compound "+it[1]+"?",it[0],shuffle(names.filter(function(x){return x!==it[0];})).slice(0,3),
      "Name the parent chain, then add the ending for the functional group present. The structure "+it[1]+" is "+it[0]+".",
      {mode:mode,compound:it[0]});
    var f=chemCondensedFigure(it[1]); if(f)q.figure=f;
    return q;
  }
  return mcq("Which condensed structure matches the name "+it[0]+"?",it[1],shuffle(structs.filter(function(x){return x!==it[1];})).slice(0,3),
    "Build the chain named in "+it[0]+" and place its functional group as the name requires. The matching structure is "+it[1]+".",
    {mode:mode,compound:it[0]});
});
E("u3-76-deriv-formula",3,["7.6"],2,"gen",function(){
  var DV=[["methanol","CH4O","CH\u2084O"],["ethanol","C2H6O","C\u2082H\u2086O"],["propan-1-ol","C3H8O","C\u2083H\u2088O"],["propan-2-ol","C3H8O","C\u2083H\u2088O"],["butan-1-ol","C4H10O","C\u2084H\u2081\u2080O"],["methanoic acid","CH2O2","CH\u2082O\u2082"],["ethanoic acid","C2H4O2","C\u2082H\u2084O\u2082"],["propanoic acid","C3H6O2","C\u2083H\u2086O\u2082"],["butanoic acid","C4H8O2","C\u2084H\u2088O\u2082"],["methyl methanoate","C2H4O2","C\u2082H\u2084O\u2082"],["methyl ethanoate","C3H6O2","C\u2083H\u2086O\u2082"],["ethyl ethanoate","C4H8O2","C\u2084H\u2088O\u2082"],["ethyl methanoate","C3H6O2","C\u2083H\u2086O\u2082"],["methyl propanoate","C4H8O2","C\u2084H\u2088O\u2082"],["methanal","CH2O","CH\u2082O"],["ethanal","C2H4O","C\u2082H\u2084O"],["propanal","C3H6O","C\u2083H\u2086O"],["butanal","C4H8O","C\u2084H\u2088O"],["propanone","C3H6O","C\u2083H\u2086O"],["butan-2-one","C4H8O","C\u2084H\u2088O"],["pentan-3-one","C5H10O","C\u2085H\u2081\u2080O"],["pentan-2-one","C5H10O","C\u2085H\u2081\u2080O"],["methoxymethane","C2H6O","C\u2082H\u2086O"],["methoxyethane","C3H8O","C\u2083H\u2088O"],["ethoxyethane","C4H10O","C\u2084H\u2081\u2080O"],["methylamine","CH5N","CH\u2085N"],["ethylamine","C2H7N","C\u2082H\u2087N"],["propylamine","C3H9N","C\u2083H\u2089N"],["ethanamide","C2H5NO","C\u2082H\u2085NO"],["propanamide","C3H7NO","C\u2083H\u2087NO"],["chloromethane","CH3Cl","CH\u2083Cl"],["chloroethane","C2H5Cl","C\u2082H\u2085Cl"],["bromoethane","C2H5Br","C\u2082H\u2085Br"],["2-chloropropane","C3H7Cl","C\u2083H\u2087Cl"]];
  var it=pick(DV); var form=ri(0,1);
  var prompt=(form===0)?("Write the molecular formula of "+it[0]+"."):("Give the molecular formula of "+it[0]+", counting every atom, including oxygen or nitrogen where present.");
  return textq(prompt,[it[1]],
    "Build the structure of "+it[0]+" from its name and count each element. The molecular formula is "+it[2]+". Write it without subscripts, in the order C, then H, then other elements, for example C3H6O2.",
    {name:it[0],form:form});
});
E("u3-76-ester-naming",3,["7.6"],2,"gen",function(){
  var ACIDS=[["methanoate","H","methanoic acid"],["ethanoate","CH\u2083","ethanoic acid"],["propanoate","CH\u2083CH\u2082","propanoic acid"],["butanoate","CH\u2083CH\u2082CH\u2082","butanoic acid"]];
  var ALKYL=[["methyl","CH\u2083","methanol"],["ethyl","CH\u2082CH\u2083","ethanol"],["propyl","CH\u2082CH\u2082CH\u2083","propan-1-ol"],["butyl","CH\u2082CH\u2082CH\u2082CH\u2083","butan-1-ol"]];
  var a=pick(ACIDS); var al=pick(ALKYL);
  var struct=a[1]+"COO"+al[1]; var name=al[0]+" "+a[0]; var mode=ri(0,3);
  var allNames=[]; var allStructs=[];
  ACIDS.forEach(function(x){ALKYL.forEach(function(y){allNames.push(y[0]+" "+x[0]); allStructs.push(x[1]+"COO"+y[1]);});});
  var sol="Esters are named in two parts: the alkyl group from the alcohol first, then the acid part ending in oate. "+name+" comes from "+al[2]+" and "+a[2]+", and its structure is "+struct+".";
  if(mode===0){var q0=mcq("What is the name of the ester "+struct+"?",name,shuffle(allNames.filter(function(x){return x!==name;})).slice(0,3),sol,{mode:mode,ester:name}); var f0=chemCondensedFigure(struct); if(f0)q0.figure=f0; return q0;}
  if(mode===1){return mcq("Which structure matches the ester "+name+"?",struct,shuffle(allStructs.filter(function(x){return x!==struct;})).slice(0,3),sol,{mode:mode,ester:name});}
  if(mode===2){var q2=mcq("The ester "+struct+" ("+name+") was made by esterification. Which alcohol was one of the reactants?",al[2],shuffle(ALKYL.map(function(x){return x[2];}).filter(function(x){return x!==al[2];})).slice(0,3),sol,{mode:mode,ester:name}); var f2=chemCondensedFigure(struct); if(f2)q2.figure=f2; return q2;}
  var q3=mcq("The ester "+struct+" ("+name+") was made by esterification. Which carboxylic acid was one of the reactants?",a[2],shuffle(ACIDS.map(function(x){return x[2];}).filter(function(x){return x!==a[2];})).slice(0,3),sol,{mode:mode,ester:name}); var f3=chemCondensedFigure(struct); if(f3)q3.figure=f3; return q3;
});
E("u3-76-carbonyl-choice",3,["7.6"],3,"gen",function(){
  var ITEMS=[
    ["CH\u2083COOH","C\u2082H\u2084O\u2082","carboxylic acid","it has a -COOH group, with an -OH on the carbonyl carbon"],
    ["CH\u2083CH\u2082COOH","C\u2083H\u2086O\u2082","carboxylic acid","it has a -COOH group, with an -OH on the carbonyl carbon"],
    ["HCOOH","CH\u2082O\u2082","carboxylic acid","it has a -COOH group, with an -OH on the carbonyl carbon"],
    ["CH\u2083CH\u2082CH\u2082COOH","C\u2084H\u2088O\u2082","carboxylic acid","it has a -COOH group, with an -OH on the carbonyl carbon"],
    ["CH\u2083COOCH\u2083","C\u2083H\u2086O\u2082","ester","the carbonyl carbon is bonded to an -OR group, giving a -COO- linkage"],
    ["CH\u2083COOCH\u2082CH\u2083","C\u2084H\u2088O\u2082","ester","the carbonyl carbon is bonded to an -OR group, giving a -COO- linkage"],
    ["HCOOCH\u2083","C\u2082H\u2084O\u2082","ester","the carbonyl carbon is bonded to an -OR group, giving a -COO- linkage"],
    ["HCOOCH\u2082CH\u2083","C\u2083H\u2086O\u2082","ester","the carbonyl carbon is bonded to an -OR group, giving a -COO- linkage"],
    ["CH\u2083CH\u2082COOCH\u2083","C\u2084H\u2088O\u2082","ester","the carbonyl carbon is bonded to an -OR group, giving a -COO- linkage"],
    ["HCHO","CH\u2082O","aldehyde","the carbonyl carbon is at the end of the chain and bonded to a hydrogen"],
    ["CH\u2083CHO","C\u2082H\u2084O","aldehyde","the carbonyl carbon is at the end of the chain and bonded to a hydrogen"],
    ["CH\u2083CH\u2082CHO","C\u2083H\u2086O","aldehyde","the carbonyl carbon is at the end of the chain and bonded to a hydrogen"],
    ["CH\u2083CH\u2082CH\u2082CHO","C\u2084H\u2088O","aldehyde","the carbonyl carbon is at the end of the chain and bonded to a hydrogen"],
    ["CH\u2083COCH\u2083","C\u2083H\u2086O","ketone","the carbonyl carbon is bonded to two other carbon atoms"],
    ["CH\u2083COCH\u2082CH\u2083","C\u2084H\u2088O","ketone","the carbonyl carbon is bonded to two other carbon atoms"],
    ["CH\u2083CH\u2082COCH\u2082CH\u2083","C\u2085H\u2081\u2080O","ketone","the carbonyl carbon is bonded to two other carbon atoms"],
    ["CH\u2083COCH\u2082CH\u2082CH\u2083","C\u2085H\u2081\u2080O","ketone","the carbonyl carbon is bonded to two other carbon atoms"]];
  var REASONS={"carboxylic acid":"it has a -COOH group, with an -OH on the carbonyl carbon","ester":"the carbonyl carbon is bonded to an -OR group, giving a -COO- linkage","aldehyde":"the carbonyl carbon is at the end of the chain and bonded to a hydrogen","ketone":"the carbonyl carbon is bonded to two other carbon atoms"};
  var it=pick(ITEMS); var form=ri(0,2);
  var shown=(form===0)?it[0]:((form===1)?it[0]+", formula "+it[1]:it[0]+", which contains a C=O group");
  var correct="It is a member of the "+it[2]+" family, because "+it[3];
  var fams=["carboxylic acid","ester","aldehyde","ketone"].filter(function(f){return f!==it[2];});
  var ds=fams.map(function(f){return "It is a member of the "+f+" family, because "+REASONS[f];});
  var q=mcq("A compound has the structure "+shown+". Which statement about it is correct?",correct,ds,
    "All four families contain a C=O group, so the deciding detail is what else the carbonyl carbon is bonded to. In "+it[0]+", "+it[3]+", so the compound is a member of the "+it[2]+" family.",
    {family:it[2],form:form});
  var f=chemCondensedFigure(it[0]); if(f)q.figure=f;
  return q;
});
E("u3-76-formula-from-structure",3,["7.6"],2,"gen",function(){
  var DV=[["CH\u2083OH","CH4O","CH\u2084O",null],["CH\u2083CH\u2082OH","C2H6O","C\u2082H\u2086O","C\u2082H\u2085OH"],["CH\u2083CH\u2082CH\u2082OH","C3H8O","C\u2083H\u2088O","C\u2083H\u2087OH"],["CH\u2083CH(OH)CH\u2083","C3H8O","C\u2083H\u2088O","(CH\u2083)\u2082CHOH"],["CH\u2083CH\u2082CH\u2082CH\u2082OH","C4H10O","C\u2084H\u2081\u2080O","C\u2084H\u2089OH"],["HCOOH","CH2O2","CH\u2082O\u2082",null],["CH\u2083COOH","C2H4O2","C\u2082H\u2084O\u2082",null],["CH\u2083CH\u2082COOH","C3H6O2","C\u2083H\u2086O\u2082",null],["CH\u2083CH\u2082CH\u2082COOH","C4H8O2","C\u2084H\u2088O\u2082",null],["HCOOCH\u2083","C2H4O2","C\u2082H\u2084O\u2082",null],["CH\u2083COOCH\u2083","C3H6O2","C\u2083H\u2086O\u2082",null],["CH\u2083COOCH\u2082CH\u2083","C4H8O2","C\u2084H\u2088O\u2082","CH\u2083COOC\u2082H\u2085"],["HCOOCH\u2082CH\u2083","C3H6O2","C\u2083H\u2086O\u2082",null],["CH\u2083CH\u2082COOCH\u2083","C4H8O2","C\u2084H\u2088O\u2082",null],["HCHO","CH2O","CH\u2082O",null],["CH\u2083CHO","C2H4O","C\u2082H\u2084O",null],["CH\u2083CH\u2082CHO","C3H6O","C\u2083H\u2086O",null],["CH\u2083CH\u2082CH\u2082CHO","C4H8O","C\u2084H\u2088O",null],["CH\u2083COCH\u2083","C3H6O","C\u2083H\u2086O","(CH\u2083)\u2082CO"],["CH\u2083COCH\u2082CH\u2083","C4H8O","C\u2084H\u2088O","CH\u2083CH\u2082COCH\u2083"],["CH\u2083CH\u2082COCH\u2082CH\u2083","C5H10O","C\u2085H\u2081\u2080O",null],["CH\u2083COCH\u2082CH\u2082CH\u2083","C5H10O","C\u2085H\u2081\u2080O","CH\u2083CH\u2082CH\u2082COCH\u2083"],["CH\u2083OCH\u2083","C2H6O","C\u2082H\u2086O","(CH\u2083)\u2082O"],["CH\u2083OCH\u2082CH\u2083","C3H8O","C\u2083H\u2088O",null],["CH\u2083CH\u2082OCH\u2082CH\u2083","C4H10O","C\u2084H\u2081\u2080O","(C\u2082H\u2085)\u2082O"],["CH\u2083NH\u2082","CH5N","CH\u2085N",null],["CH\u2083CH\u2082NH\u2082","C2H7N","C\u2082H\u2087N",null],["CH\u2083CH\u2082CH\u2082NH\u2082","C3H9N","C\u2083H\u2089N",null],["CH\u2083CONH\u2082","C2H5NO","C\u2082H\u2085NO",null],["CH\u2083CH\u2082CONH\u2082","C3H7NO","C\u2083H\u2087NO",null],["CH\u2083Cl","CH3Cl","CH\u2083Cl",null],["CH\u2083CH\u2082Cl","C2H5Cl","C\u2082H\u2085Cl",null],["CH\u2083CH\u2082Br","C2H5Br","C\u2082H\u2085Br",null],["CH\u2083CHClCH\u2083","C3H7Cl","C\u2083H\u2087Cl","(CH\u2083)\u2082CHCl"]];
  var it=pick(DV); var useAlt=(it[3]!==null&&ri(0,1)===0);
  var shown=useAlt?it[3]:it[0]; var pre=pick(["","In a derivatives exercise, ","For a structure worksheet, "]);
  var q=textq(pre+"Write the molecular formula of the compound with condensed structure "+shown+".",[it[1]],
    "Expand the condensed structure in your head and count each element, including the atoms inside brackets and the hydrogen on any -OH or -NH\u2082 group. The count gives "+it[2]+". Write the formula without subscripts, in the order C, then H, then other elements.",
    {struct:shown,alt:useAlt});
  var f=chemCondensedFigure(shown); if(f)q.figure=f;
  return q;
});

/* 7.7 Reactions of organic compounds */
E("u3-77-combustion-coeff",3,["7.7"],2,"gen",function(){
  var D=[
    ["methane","CH\u2084",1,2,1,2],["ethane","C\u2082H\u2086",2,7,4,6],["propane","C\u2083H\u2088",1,5,3,4],["butane","C\u2084H\u2081\u2080",2,13,8,10],["pentane","C\u2085H\u2081\u2082",1,8,5,6],
    ["ethene","C\u2082H\u2084",1,3,2,2],["propene","C\u2083H\u2086",2,9,6,6],["ethyne","C\u2082H\u2082",2,5,4,2],["propyne","C\u2083H\u2084",1,4,3,2],["benzene","C\u2086H\u2086",2,15,12,6]];
  var it=pick(D); var targets=[["O\u2082",it[3],"oxygen"],["CO\u2082",it[4],"carbon dioxide"],["H\u2082O",it[5],"water"]];
  var tg=pick(targets); var form=ri(0,1);
  function cf(k){return (k===1)?"":(k+" ");}
  var eq=cf(it[2])+it[1]+" + "+(tg[0]==="O\u2082"?"?":cf(it[3]))+(tg[0]==="O\u2082"?"O\u2082":"O\u2082")+" \u2192 "+(tg[0]==="CO\u2082"?"? CO\u2082":cf(it[4])+"CO\u2082")+" + "+(tg[0]==="H\u2082O"?"? H\u2082O":cf(it[5])+"H\u2082O");
  if(tg[0]==="O\u2082"){eq=cf(it[2])+it[1]+" + ? O\u2082 \u2192 "+cf(it[4])+"CO\u2082 + "+cf(it[5])+"H\u2082O";}
  var prompt=(form===0)?("In the balanced equation for the complete combustion of "+it[0]+", "+eq+", what number belongs in place of the ?"):("When "+it[0]+" burns completely, the balanced equation is "+eq+". What is the missing coefficient?");
  return numq(prompt,tg[1],0,
    "Balance the atoms in order: carbon, then hydrogen, then oxygen. For "+it[0]+", the balanced equation needs "+tg[1]+" in front of "+tg[2]+", so the missing coefficient is "+tg[1]+".",
    {fuel:it[0],target:tg[0],form:form});
});
E("u3-77-combustion-equation",3,["7.7"],2,"gen",function(){
  var D=[
    ["methane","CH\u2084",1,2,1,2],["ethane","C\u2082H\u2086",2,7,4,6],["propane","C\u2083H\u2088",1,5,3,4],["butane","C\u2084H\u2081\u2080",2,13,8,10],["pentane","C\u2085H\u2081\u2082",1,8,5,6],
    ["ethene","C\u2082H\u2084",1,3,2,2],["propene","C\u2083H\u2086",2,9,6,6],["ethyne","C\u2082H\u2082",2,5,4,2],["propyne","C\u2083H\u2084",1,4,3,2],["benzene","C\u2086H\u2086",2,15,12,6]];
  var it=pick(D); var form=ri(0,1);
  var frame=pick(["in a Bunsen burner","in a gas furnace","in a camp stove","in an engine","in a laboratory test","as a fuel sample"]);
  function eq(a,o,c,w){function cf(k){return (k===1)?"":(k+" ");} return cf(a)+it[1]+" + "+cf(o)+"O\u2082 \u2192 "+cf(c)+"CO\u2082 + "+cf(w)+"H\u2082O";}
  if(form===0){
    var correct=eq(it[2],it[3],it[4],it[5]);
    var ds=[eq(it[2],it[3]+1,it[4],it[5]),eq(it[2],it[3],it[4],it[5]+1),eq(it[2],it[3]-1,it[4],it[5])];
    return mcq("Which equation is correctly balanced for the complete combustion of "+it[0]+" "+frame+"?",correct,ds,
      "Count the atoms on each side. Only one equation has equal numbers of carbon, hydrogen and oxygen atoms on both sides: "+correct+".",
      {fuel:it[0],form:form});
  }
  return mcq("What are the products when "+it[0]+" burns completely in excess oxygen "+frame+"?",
    "Carbon dioxide and water",
    ["Carbon monoxide and water","Carbon dioxide and hydrogen","Carbon and water"],
    "Complete combustion of any hydrocarbon in excess oxygen gives carbon dioxide and water only. The fuel "+it[0]+" is a hydrocarbon, so its complete combustion products are carbon dioxide and water.",
    {fuel:it[0],form:form});
});
E("u3-77-addition-product",3,["7.7"],2,"gen",function(){
  var COMBOS=[
    ["ethene","CH\u2082=CH\u2082","H\u2082","hydrogenation","ethane","CH\u2083CH\u2083"],["ethene","CH\u2082=CH\u2082","Br\u2082","halogenation","1,2-dibromoethane","CH\u2082BrCH\u2082Br"],["ethene","CH\u2082=CH\u2082","H\u2082O","hydration","ethanol","CH\u2083CH\u2082OH"],
    ["propene","CH\u2082=CHCH\u2083","H\u2082","hydrogenation","propane","CH\u2083CH\u2082CH\u2083"],["propene","CH\u2082=CHCH\u2083","Br\u2082","halogenation","1,2-dibromopropane","CH\u2082BrCHBrCH\u2083"],["propene","CH\u2082=CHCH\u2083","H\u2082O","hydration","propan-2-ol","CH\u2083CH(OH)CH\u2083"],
    ["but-1-ene","CH\u2082=CHCH\u2082CH\u2083","H\u2082","hydrogenation","butane","CH\u2083CH\u2082CH\u2082CH\u2083"],["but-1-ene","CH\u2082=CHCH\u2082CH\u2083","Br\u2082","halogenation","1,2-dibromobutane","CH\u2082BrCHBrCH\u2082CH\u2083"],["but-1-ene","CH\u2082=CHCH\u2082CH\u2083","H\u2082O","hydration","butan-2-ol","CH\u2083CH(OH)CH\u2082CH\u2083"],
    ["but-2-ene","CH\u2083CH=CHCH\u2083","H\u2082","hydrogenation","butane","CH\u2083CH\u2082CH\u2082CH\u2083"],["but-2-ene","CH\u2083CH=CHCH\u2083","Br\u2082","halogenation","2,3-dibromobutane","CH\u2083CHBrCHBrCH\u2083"],["but-2-ene","CH\u2083CH=CHCH\u2083","H\u2082O","hydration","butan-2-ol","CH\u2083CH(OH)CH\u2082CH\u2083"],
    ["pent-1-ene","CH\u2082=CHCH\u2082CH\u2082CH\u2083","H\u2082","hydrogenation","pentane","CH\u2083CH\u2082CH\u2082CH\u2082CH\u2083"],["pent-1-ene","CH\u2082=CHCH\u2082CH\u2082CH\u2083","Br\u2082","halogenation","1,2-dibromopentane","CH\u2082BrCHBrCH\u2082CH\u2082CH\u2083"],["pent-1-ene","CH\u2082=CHCH\u2082CH\u2082CH\u2083","H\u2082O","hydration","pentan-2-ol","CH\u2083CH(OH)CH\u2082CH\u2082CH\u2083"],
    ["pent-2-ene","CH\u2083CH=CHCH\u2082CH\u2083","H\u2082","hydrogenation","pentane","CH\u2083CH\u2082CH\u2082CH\u2082CH\u2083"],["pent-2-ene","CH\u2083CH=CHCH\u2082CH\u2083","Br\u2082","halogenation","2,3-dibromopentane","CH\u2083CHBrCHBrCH\u2082CH\u2083"],["pent-2-ene","CH\u2083CH=CHCH\u2082CH\u2083","H\u2082O","hydration","a mixture of pentan-2-ol and pentan-3-ol",null]];
  var c=pick(COMBOS);
  var askStruct=(c[5]!==null&&ri(0,1)===0);
  var wording=pick(["symbol","words"]);
  var reagentShown=(wording==="symbol")?c[2]:({"H\u2082":"hydrogen gas with a catalyst","Br\u2082":"bromine","H\u2082O":"water with an acid catalyst"})[c[2]];
  var sibs=COMBOS.filter(function(x){return x[0]===c[0]&&x[3]!==c[3];});
  var q;
  if(askStruct){
    var dsS=sibs.map(function(x){return x[5];}).concat([c[1]]);
    q=mcq(c[0]+" ("+c[1]+") undergoes "+c[3]+" with "+reagentShown+". What is the condensed structure of the product?",
      c[5],dsS,
      "In "+c[3]+", the reagent adds across the double bond, so the double bond becomes a single bond and each carbon of the former double bond gains one new group. The product is "+c[4]+", "+c[5]+".",
      {alkene:c[0],reaction:c[3],ask:"struct"});
  }
  else{
    var dsN=sibs.map(function(x){return x[4];}).concat([c[0]]);
    q=mcq(c[0]+" ("+c[1]+") undergoes "+c[3]+" with "+reagentShown+". What is the name of the organic product?",
      c[4],dsN,
      "In "+c[3]+", the reagent adds across the double bond of "+c[0]+". Following where each added atom goes gives the product "+c[4]+".",
      {alkene:c[0],reaction:c[3],ask:"name"});
  }
  var f=chemCondensedFigure(c[1]); if(f)q.figure=f;
  return q;
});
E("u3-77-esterification",3,["7.7"],2,"gen",function(){
  var ACIDS=[["methanoic acid","methanoate"],["ethanoic acid","ethanoate"],["propanoic acid","propanoate"],["butanoic acid","butanoate"]];
  var ALCS=[["methanol","methyl"],["ethanol","ethyl"],["propan-1-ol","propyl"]];
  var a=pick(ACIDS); var al=pick(ALCS); var ester=al[1]+" "+a[1];
  var mode=ri(0,2); var frame=pick([""," The mixture is warmed with a little concentrated acid as a catalyst."]);
  var allEsters=[]; ACIDS.forEach(function(x){ALCS.forEach(function(y){allEsters.push(y[1]+" "+x[1]);});});
  var sol="In esterification, a carboxylic acid reacts with an alcohol. The -OH from the acid and an H from the alcohol form water, and the rest join as the ester "+ester+".";
  if(mode===0){
    return mcq(a[0]+" reacts with "+al[0]+"."+frame+" What is the ester produced?",ester,shuffle(allEsters.filter(function(x){return x!==ester;})).slice(0,3),sol,{mode:mode,ester:ester});
  }
  if(mode===1){
    return mcq(a[0]+" reacts with "+al[0]+" in an esterification reaction."+frame+" Besides the ester, what else is produced?",
      "Water",["Carbon dioxide","Hydrogen","Oxygen"],sol,{mode:mode,ester:ester});
  }
  var pair=a[0]+" and "+al[0];
  var others=[]; ACIDS.forEach(function(x){ALCS.forEach(function(y){var pp=x[0]+" and "+y[0]; if(pp!==pair){others.push(pp);}});});
  return mcq("The ester "+ester+" is made by esterification. Which pair of reactants was used?",pair,shuffle(others).slice(0,3),sol,{mode:mode,ester:ester});
});
E("u3-77-cracking",3,["7.7"],3,"gen",function(){
  var SB=["\u2080","\u2081","\u2082","\u2083","\u2084","\u2085","\u2086","\u2087","\u2088","\u2089"];
  function SN(k){return String(k).split("").map(function(d){return SB[+d];}).join("");}
  var roots=["","","eth","prop","but","pent","hex","hept","oct","non","dec","undec","dodec"];
  var T=pick([8,9,10,11,12]); var a=ri(2,T-2); var b=T-a;
  function alkF(k){return "C"+SN(k)+"H"+SN(2*k+2);} function eneF(k){return "C"+SN(k)+"H"+SN(2*k);}
  function alkN(k){return roots[k]+"ane";} function eneN(k){return (k<=3)?(roots[k]+"ene"):(roots[k]+"-1-ene");}
  var useNames=(ri(0,1)===0);
  function pairStr(x,y){return (useNames?alkN(x):alkF(x))+" and "+(useNames?eneN(y):eneF(y));}
  function pairStrAA(x,y){return (useNames?alkN(x):alkF(x))+" and "+(useNames?alkN(y):alkF(y));}
  function pairStrEE(x,y){return (useNames?eneN(x):eneF(x))+" and "+(useNames?eneN(y):eneF(y));}
  var correct=pairStr(a,b);
  var ds=[pairStrAA(a,b),pairStrEE(a,b),pairStr(a,b+1)];
  var form=ri(0,1);
  var parent=(useNames?alkN(T):alkF(T));
  var ctx=pick(["in an oil refinery","during crude oil processing","in a fuels plant","in a petrochemical unit"]);
  var prompt=(form===0)?("Cracking "+ctx+" breaks the long chain alkane "+parent+" into a shorter alkane and an alkene. Which pair of products is possible, with all atoms balanced?"):("A refinery cracks "+parent+" using heat and a catalyst "+ctx+". Which pair could be the two products?");
  return mcq(prompt,correct,ds,
    "Cracking rearranges the atoms without adding or losing any. The parent has "+T+" carbons and "+(2*T+2)+" hydrogens. Only the correct pair adds up to the same totals: an alkane with "+a+" carbons and an alkene with "+b+" carbons.",
    {total:T,a:a,form:form});
});
E("u3-77-reaction-analysis",3,["7.7"],3,"gen",function(){
  var SC=[];
  [["methane","CH\u2084"],["propane","C\u2083H\u2088"],["pentane","C\u2085H\u2081\u2082"],["ethene","C\u2082H\u2084"],["propyne","C\u2083H\u2084"]].forEach(function(x){SC.push({desc:x[0]+" ("+x[1]+") burns in excess oxygen",type:"Complete combustion",prod:"carbon dioxide and water",wt:["Addition","Esterification","Cracking"],wp:["ethane","propan-2-ol","ethyl ethanoate"]});});
  [["ethene","hydrogen","ethane"],["propene","hydrogen","propane"],["propene","bromine","1,2-dibromopropane"],["but-1-ene","water","butan-2-ol"],["but-2-ene","bromine","2,3-dibromobutane"],["pent-1-ene","hydrogen","pentane"]].forEach(function(x){SC.push({desc:x[0]+" reacts with "+x[1]+" across its double bond",type:"Addition",prod:x[2],wt:["Complete combustion","Esterification","Cracking"],wp:["carbon dioxide and water","methyl ethanoate","a shorter alkane and an alkene"]});});
  [["ethanoic acid","methanol","methyl ethanoate"],["ethanoic acid","ethanol","ethyl ethanoate"],["propanoic acid","methanol","methyl propanoate"],["methanoic acid","ethanol","ethyl methanoate"]].forEach(function(x){SC.push({desc:x[0]+" is warmed with "+x[1],type:"Esterification",prod:x[2]+" and water",wt:["Addition","Complete combustion","Cracking"],wp:["propane","carbon dioxide and water","propan-2-ol"]});});
  [["decane","pentane and pent-1-ene"],["octane","propane and pent-1-ene"],["dodecane","hexane and hex-1-ene"],["nonane","butane and pent-1-ene"]].forEach(function(x){SC.push({desc:x[0]+" is heated strongly with a catalyst and breaks into "+x[1],type:"Cracking",prod:x[1],wt:["Addition","Esterification","Complete combustion"],wp:["carbon dioxide and water","ethyl ethanoate","ethane"]});});
  var s=pick(SC); var form=ri(0,1); var ctx=pick(["in a worksheet","in a plant log","in a test question","in a revision set"]);
  var correct=s.type+": "+s.prod;
  var wt=pick(s.wt); var wp=pick(s.wp); var wt2=pick(s.wt.filter(function(x){return x!==wt;}));
  var ds=[wt+": "+s.prod,s.type+": "+wp,wt2+": "+wp];
  var prompt=(form===0)?("A reaction is described "+ctx+": "+s.desc+". Which pairing of reaction type and product is correct?"):("Classify this reaction and name its product: "+s.desc+" (from a description "+ctx+").");
  return mcq(prompt,correct,ds,
    "Decide the reaction type from what happens to the molecules, then check the product that follows from it. Here the type is "+s.type.toLowerCase()+" and the product is "+s.prod+", so only one pairing has both parts right.",
    {type:s.type,form:form});
});

/* 7.8 Polymerization */
E("u3-78-add-or-cond",3,["7.8"],1,"gen",function(){
  var ADD=[["polyethylene","ethene"],["polypropylene","propene"],["PVC","chloroethene"],["polystyrene","phenylethene"]];
  var COND=[["a polyester","a diol and a dicarboxylic acid"],["nylon","a diamine and a dicarboxylic acid"],["starch","glucose"],["a protein","amino acids"]];
  var kind=pick(["add","cond"]); var desc=""; var answer="";
  if(kind==="add"){
    var p=pick(ADD); var v=ri(0,1);
    desc=(v===0)?("Many "+p[1]+" molecules join together to form "+p[0]+". No small molecule is given off, and the double bonds open up as the chain grows."):("The polymer "+p[0]+" forms when "+p[1]+" molecules link by opening their double bonds, with no other product formed.");
    answer="Addition polymerization";
  }else{
    var q=pick(COND); var v2=ri(0,1);
    desc=(v2===0)?(q[0]+" forms when molecules of "+q[1]+" join together, and a molecule of water is lost for each new linkage formed."):("In the formation of "+q[0]+", monomer units join and water molecules are released as the chain grows.");
    answer="Condensation polymerization";
  }
  var form=ri(0,3);
  var prompts=[
    "Which type of polymerization is described? "+desc,
    desc+" This is an example of:",
    "A student writes this description: "+desc+" Which type of polymerization is it?",
    "Read the description and classify the polymerization. "+desc];
  var others=(answer==="Addition polymerization")?["Condensation polymerization","Cracking","Esterification"]:["Addition polymerization","Cracking","Combustion"];
  return mcq(prompts[form],answer,others,
    (answer==="Addition polymerization"?"In addition polymerization, alkene monomers add to each other with no small molecule lost. The description matches this: double bonds open and nothing else is formed.":"In condensation polymerization, monomers join with the loss of a small molecule, usually water. The description states that water is lost as linkages form."),
    {kind:kind,form:form});
});
E("u3-78-monomer-name",3,["7.8"],2,"gen",function(){
  var P=[
    {names:["polyethylene","poly(ethene)"],mon:"ethene",acc:["ethene"],uses:["plastic bags","milk bottles","squeeze bottles"]},
    {names:["polypropylene","poly(propene)"],mon:"propene",acc:["propene"],uses:["ropes","food tubs","carpets"]},
    {names:["PVC","polyvinyl chloride","poly(chloroethene)"],mon:"chloroethene",acc:["chloroethene"],uses:["water pipes","window frames","floor tiles"]},
    {names:["polystyrene","poly(phenylethene)"],mon:"phenylethene",acc:["phenylethene","styrene"],uses:["foam cups","insulation panels","packaging foam"]},
    {names:["starch"],mon:"glucose",acc:["glucose"],uses:["storing energy in potatoes","storing energy in rice grains","storing energy in wheat"]},
    {names:["cellulose"],mon:"glucose",acc:["glucose"],uses:["plant cell walls","cotton fibres","paper from wood pulp"]},
    {names:["protein","proteins"],mon:"amino acids",acc:["amino acids","amino acid"],uses:["muscle tissue","enzymes","hair"]},
    {names:["DNA"],mon:"nucleotides",acc:["nucleotides","nucleotide"],uses:["storing genetic information in cells","passing on inherited characteristics"]}];
  var p=pick(P); var nm=pick(p.names); var useCtx=(ri(0,1)===0);
  var prompt=useCtx?("The polymer "+nm+" is used for "+pick(p.uses)+". Name the monomer it is made from."):("Name the monomer used to make the polymer "+nm+".");
  return textq(prompt,p.acc,
    "Each polymer is built by joining many copies of one small monomer (or, for natural polymers, one kind of building unit). "+nm+" is made from "+p.mon+".",
    {polymer:nm});
});
E("u3-78-polymer-from-monomer",3,["7.8"],2,"gen",function(){
  var M=[
    {m:"ethene",alt:"ethylene",f:"C\u2082H\u2084",s:"CH\u2082=CH\u2082",p:"polyethylene",uses:["plastic bags","milk bottles","food wrap","toys"]},
    {m:"propene",alt:"propylene",f:"C\u2083H\u2086",s:"CH\u2082=CHCH\u2083",p:"polypropylene",uses:["ropes","food tubs","carpets","bottle caps"]},
    {m:"chloroethene",alt:"vinyl chloride",f:"C\u2082H\u2083Cl",s:"CH\u2082=CHCl",p:"polyvinyl chloride (PVC)",uses:["water pipes","window frames","floor tiles","raincoats"]},
    {m:"phenylethene",alt:"styrene",f:"C\u2088H\u2088",s:"CH\u2082=CHC\u2086H\u2085",p:"polystyrene",uses:["foam cups","insulation panels","packaging foam","model kits"]},
    {m:"amino acids",alt:null,f:null,s:"small molecules with -NH\u2082 and -COOH groups",p:"proteins",uses:["muscle tissue","enzymes","hair","silk"]},
    {m:"nucleotides",alt:null,f:null,s:"units with a sugar, a phosphate group and a base",p:"DNA",uses:["storing genetic information","passing on inherited characteristics","cell instructions","heredity"]}];
  var it=pick(M); var form=ri(0,2); var shown="";
  if(form===0){shown=it.m;}
  else if(form===1){shown=(it.f!==null&&ri(0,1)===0)?(it.m+", "+it.f):it.s;}
  else{shown=(it.alt!==null&&ri(0,1)===0)?it.alt:it.m;}
  var useForm=(ri(0,2)===0); var ctx=pick(["in a plastics factory","in a recycling guide","in a materials data table","during a lesson on polymers"]);
  var prompt=useForm?("The monomer "+it.m+" is polymerized to make a material used for "+pick(it.uses)+". Which polymer is formed?"):("Which polymer is made by polymerizing "+shown+", as listed "+ctx+"?");
  var ds=shuffle(M.map(function(x){return x.p;}).filter(function(x){return x!==it.p;})).slice(0,3);
  return mcq(prompt,it.p,ds,
    "Match the monomer to the polymer built from it. Polymerizing "+it.m+" gives "+it.p+".",
    {monomer:it.m,form:form});
});
E("u3-78-natural-or-synthetic",3,["7.8"],2,"gen",function(){
  var ITEMS=[
    ["starch","made by plants to store energy","A natural polymer"],
    ["cellulose","makes up plant cell walls and cotton fibres","A natural polymer"],
    ["protein","makes up enzymes, muscle and hair","A natural polymer"],
    ["DNA","carries genetic information inside cells","A natural polymer"],
    ["silk","produced as fibres by silkworms","A natural polymer"],
    ["wool","grows as fibres on sheep","A natural polymer"],
    ["polyethylene","made by polymerizing ethene in a factory","A synthetic addition polymer"],
    ["polypropylene","made by polymerizing propene in a factory","A synthetic addition polymer"],
    ["PVC","made by polymerizing chloroethene in a factory","A synthetic addition polymer"],
    ["polystyrene","made by polymerizing phenylethene in a factory","A synthetic addition polymer"],
    ["polyester","made in a factory by joining monomers with water lost at each linkage, and used in fleece clothing","A synthetic condensation polymer"],
    ["nylon","made in a factory by joining monomers with water lost at each linkage, and used in ropes and clothing","A synthetic condensation polymer"]];
  var it=pick(ITEMS); var rep=ri(0,2);
  var shown=(rep===0)?it[0]:((rep===1)?(it[0]+", which "+it[1]):("a polymer that "+it[1]));
  var form=ri(0,1);
  var prompt=(form===0)?("How is "+shown+" classified?"):("Which classification fits "+shown+"?");
  var opts=["A natural polymer","A synthetic addition polymer","A synthetic condensation polymer","Not a polymer"];
  var ds=opts.filter(function(x){return x!==it[2];});
  return mcq(prompt,it[2],ds,
    "Natural polymers are made by living things, while synthetic polymers are made in factories, by addition if nothing is lost as monomers join, or by condensation if water is lost. On that basis, "+it[0]+" is classified as: "+it[2].toLowerCase()+".",
    {polymer:it[0],rep:rep,form:form});
});
E("u3-78-polymer-uses-var",3,["7.8"],1,"var",varset([
  function(){return mcq("Polyethylene is widely used to make:",
    "plastic bags and bottles",
    ["water pipes and window frames","foam cups and insulation panels","ropes and carpets"],
    "Polyethylene, made from ethene, is a tough, flexible plastic used for bags, bottles and containers.",
    {v:1});},
  function(){return mcq("PVC (polyvinyl chloride) is widely used to make:",
    "water pipes and window frames",
    ["plastic bags and bottles","foam cups and insulation panels","ropes and carpets"],
    "PVC, made from chloroethene, is rigid and weather resistant, so it is used for pipes, window frames and floor coverings.",
    {v:2});},
  function(){return mcq("Polystyrene is widely used to make:",
    "foam cups and insulation panels",
    ["water pipes and window frames","plastic bags and bottles","ropes and carpets"],
    "Polystyrene, made from phenylethene, is easily foamed with trapped air, giving light foam cups and insulation panels.",
    {v:3});},
  function(){return mcq("Polypropylene is widely used to make:",
    "ropes and food containers",
    ["foam cups and insulation panels","water pipes and window frames","plastic bags and bottles"],
    "Polypropylene, made from propene, is strong and resists chemicals, so it is used for ropes, carpets and food containers.",
    {v:4});},
  function(){return mcq("Which polymer is used for clothing fibres and strong ropes?",
    "Nylon",
    ["Starch","Cellulose","Polyethylene"],
    "Nylon is a synthetic condensation polymer drawn into strong fibres, used in clothing, ropes and parachutes.",
    {v:5});},
  function(){return mcq("Which polymer is used for clothing fabrics such as fleece?",
    "Polyester",
    ["Polystyrene","PVC","Starch"],
    "Polyester is a synthetic condensation polymer spun into fibres for clothing fabrics, including fleece.",
    {v:6});},
  function(){return mcq("In living things, the main job of starch is:",
    "storing energy in plants",
    ["carrying genetic information","forming plant cell walls","speeding up chemical reactions"],
    "Starch is a natural condensation polymer of glucose. Plants build it to store energy in seeds, roots and tubers such as potatoes.",
    {v:7});},
  function(){return mcq("In living things, the main job of cellulose is:",
    "forming strong plant cell walls",
    ["storing energy in animal muscles","carrying genetic information","storing energy in potatoes"],
    "Cellulose is a natural polymer of glucose arranged in strong fibres. It forms plant cell walls and materials such as cotton and wood.",
    {v:8});}
]));

/* ----- bank-br.js ----- */
// Bridging bank: Science 1206 prior-learning review for Chemistry 2202.
// Unit 4 in the app, labelled as prior-learning review. These entries are
// kept out of the Chemistry 2202 coverage counts and out of the mid and
// final exam presets.
// CRMARKS: br-b1-neutrons=2
// CRMARKS: br-b1-ion-electrons=2
// CRMARKS: br-b2-avg-mass=2

/* --- B.1: isotopes and subatomic particles --- */
E("br-b1-neutrons", 4, ["B.1"], 1, "gen", function () {
  var els = [
    { name: "carbon", sym: "C", z: 6, masses: [12, 13, 14] },
    { name: "oxygen", sym: "O", z: 8, masses: [16, 17, 18] },
    { name: "sodium", sym: "Na", z: 11, masses: [23] },
    { name: "magnesium", sym: "Mg", z: 12, masses: [24, 25, 26] },
    { name: "chlorine", sym: "Cl", z: 17, masses: [35, 37] },
    { name: "calcium", sym: "Ca", z: 20, masses: [40, 42, 44, 48] },
    { name: "iron", sym: "Fe", z: 26, masses: [54, 56, 57, 58] },
    { name: "zinc", sym: "Zn", z: 30, masses: [64, 66, 68, 70] },
    { name: "potassium", sym: "K", z: 19, masses: [39, 40, 41] },
    { name: "sulfur", sym: "S", z: 16, masses: [32, 33, 34, 36] }
  ];
  var el = pick(els);
  var a = pick(el.masses);
  var ask = pick(["neutrons", "protons", "electrons"]);
  var n = a - el.z;
  var ans, sol;
  if (ask === "neutrons") {
    ans = n;
    sol = "The atomic number is " + el.z + ", so the atom has " + el.z + " protons. Neutrons = mass number - atomic number = " + a + " - " + el.z + " = <b>" + n + "</b>.";
  } else if (ask === "protons") {
    ans = el.z;
    sol = "The atomic number equals the number of protons. The atomic number of " + el.name + " is " + el.z + ", so the atom has <b>" + el.z + " protons</b>.";
  } else {
    ans = el.z;
    sol = "A neutral atom has equal numbers of protons and electrons. The atom has " + el.z + " protons, so it has <b>" + el.z + " electrons</b>.";
  }
  return numq(
    "An atom of " + el.name + "-" + a + " \\(^{" + a + "}_{" + el.z + "}\\mathrm{" + el.sym + "}\\) is neutral. How many " + ask + " does this atom have?",
    ans, 0, sol,
    { el: el.sym, a: a, z: el.z, ask: ask });
});

E("br-b1-isotopes-def", 4, ["B.1"], 1, "gen", function () {
  var pairs = [
    { name: "carbon", a: 12, b: 13 }, { name: "carbon", a: 12, b: 14 }, { name: "carbon", a: 13, b: 14 },
    { name: "oxygen", a: 16, b: 17 }, { name: "oxygen", a: 16, b: 18 }, { name: "oxygen", a: 17, b: 18 },
    { name: "hydrogen", a: 1, b: 2 }, { name: "lithium", a: 6, b: 7 },
    { name: "nitrogen", a: 14, b: 15 }, { name: "boron", a: 10, b: 11 },
    { name: "chlorine", a: 35, b: 37 }, { name: "magnesium", a: 24, b: 25 },
    { name: "magnesium", a: 24, b: 26 }, { name: "magnesium", a: 25, b: 26 },
    { name: "sulfur", a: 32, b: 34 }, { name: "calcium", a: 40, b: 44 },
    { name: "iron", a: 56, b: 58 }, { name: "zinc", a: 64, b: 68 },
    { name: "copper", a: 63, b: 65 }, { name: "neon", a: 20, b: 22 }
  ];
  var p = pick(pairs);
  var pair = p.name + "-" + p.a + " and " + p.name + "-" + p.b;
  var stems = [
    pair + " are isotopes of the same element because they have",
    "What makes " + pair + " isotopes of each other? They have",
    "Two atoms, " + pair + ", are called isotopes because they have",
    pair + " count as isotopes of one element because they have"
  ];
  return mcq(
    pick(stems),
    "the same number of protons, but a different number of neutrons",
    [
      "the same number of neutrons, but a different number of protons",
      "the same number of electrons, but a different number of protons",
      "a different number of neutrons and a different number of protons"
    ],
    "Isotopes share the same atomic number, so they have the same number of protons. Their mass numbers differ, which means the number of neutrons differs.",
    { el: p.name, a: p.a, b: p.b });
});

E("br-b1-ion-electrons", 4, ["B.1"], 2, "gen", function () {
  var ions = [
    { name: "sodium", sym: "Na", z: 11, ch: 1, cat: true, masses: [23], tex: "\\mathrm{Na}^{+}" },
    { name: "magnesium", sym: "Mg", z: 12, ch: 2, cat: true, masses: [24, 25, 26], tex: "\\mathrm{Mg}^{2+}" },
    { name: "calcium", sym: "Ca", z: 20, ch: 2, cat: true, masses: [40, 44], tex: "\\mathrm{Ca}^{2+}" },
    { name: "aluminum", sym: "Al", z: 13, ch: 3, cat: true, masses: [27], tex: "\\mathrm{Al}^{3+}" },
    { name: "potassium", sym: "K", z: 19, ch: 1, cat: true, masses: [39, 41], tex: "\\mathrm{K}^{+}" },
    { name: "iron(II)", sym: "Fe", z: 26, ch: 2, cat: true, masses: [56, 57, 58], tex: "\\mathrm{Fe}^{2+}" },
    { name: "iron(III)", sym: "Fe", z: 26, ch: 3, cat: true, masses: [56, 57, 58], tex: "\\mathrm{Fe}^{3+}" },
    { name: "zinc", sym: "Zn", z: 30, ch: 2, cat: true, masses: [64, 66, 68], tex: "\\mathrm{Zn}^{2+}" },
    { name: "lithium", sym: "Li", z: 3, ch: 1, cat: true, masses: [6, 7], tex: "\\mathrm{Li}^{+}" },
    { name: "chlorine", sym: "Cl", z: 17, ch: 1, cat: false, masses: [35, 37], tex: "\\mathrm{Cl}^{-}" },
    { name: "oxygen", sym: "O", z: 8, ch: 2, cat: false, masses: [16, 18], tex: "\\mathrm{O}^{2-}" },
    { name: "sulfur", sym: "S", z: 16, ch: 2, cat: false, masses: [32, 34], tex: "\\mathrm{S}^{2-}" },
    { name: "fluorine", sym: "F", z: 9, ch: 1, cat: false, masses: [19], tex: "\\mathrm{F}^{-}" },
    { name: "nitrogen", sym: "N", z: 7, ch: 3, cat: false, masses: [14, 15], tex: "\\mathrm{N}^{3-}" },
    { name: "bromine", sym: "Br", z: 35, ch: 1, cat: false, masses: [79, 81], tex: "\\mathrm{Br}^{-}" }
  ];
  var ion = pick(ions);
  var a = pick(ion.masses);
  var e = ion.cat ? ion.z - ion.ch : ion.z + ion.ch;
  var chargeWord = ion.ch + (ion.cat ? "+" : "-");
  var stems = [
    "An ion of " + ion.name + "-" + a + " forms as \\(" + ion.tex + "\\). The ion has " + ion.z + " protons. How many electrons does this ion have?",
    "A " + ion.name + " ion, \\(" + ion.tex + "\\), has " + ion.z + " protons and a charge of " + chargeWord + ". How many electrons does it have?",
    "Consider the " + ion.name + "-" + a + " ion \\(" + ion.tex + "\\) with " + ion.z + " protons. How many electrons are in this ion?"
  ];
  var sol = ion.cat
    ? "A positive ion forms when an atom loses electrons. Electrons = protons - charge = " + ion.z + " - " + ion.ch + " = <b>" + e + "</b>."
    : "A negative ion forms when an atom gains electrons. Electrons = protons + charge size = " + ion.z + " + " + ion.ch + " = <b>" + e + "</b>.";
  return numq(pick(stems), e, 0, sol, { sym: ion.sym, z: ion.z, ch: ion.ch, cat: ion.cat, a: a });
});

/* --- B.2: average atomic mass --- */
E("br-b2-avg-mass", 4, ["B.2"], 2, "gen", function () {
  var pairs = [
    { name: "chlorine", m1: 35, m2: 37, base: 75.8, note: "" },
    { name: "boron", m1: 10, m2: 11, base: 19.9, note: "" },
    { name: "magnesium", m1: 24, m2: 26, base: 79.0, note: " (simplified to two isotopes)" },
    { name: "copper", m1: 63, m2: 65, base: 69.2, note: "" },
    { name: "bromine", m1: 79, m2: 81, base: 50.7, note: "" },
    { name: "lithium", m1: 6, m2: 7, base: 7.6, note: "" },
    { name: "neon", m1: 20, m2: 22, base: 90.5, note: "" },
    { name: "carbon", m1: 12, m2: 13, base: 98.9, note: "" }
  ];
  var pr = pick(pairs);
  var p1 = Math.round((pr.base + ri(-10, 10) * 0.1) * 10) / 10;
  var p2 = Math.round((100 - p1) * 10) / 10;
  var avg = (pr.m1 * p1 + pr.m2 * p2) / 100;
  var ans = sfR(avg, 3);
  return numq(
    cap(pr.name) + " has two isotopes" + pr.note + ": " + pr.name + "-" + pr.m1 + " with an abundance of " + gF(p1) + " percent and " + pr.name + "-" + pr.m2 + " with an abundance of " + gF(p2) + " percent. Calculate the average atomic mass, in atomic mass units (u).",
    ans, 0.05,
    "Multiply each isotope mass by its abundance as a decimal. (" + pr.m1 + " x " + sfF(p1 / 100, 3) + ") + (" + pr.m2 + " x " + sfF(p2 / 100, 3) + ") = " + iF(pr.m1 * p1 / 100) + " + " + iF(pr.m2 * p2 / 100) + " = <b>" + F3(ans) + " u</b>.",
    { el: pr.name, m1: pr.m1, m2: pr.m2, p1: p1 });
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
});

E("br-b2-why-not-whole", 4, ["B.2"], 1, "gen", function () {
  var names = { Cl: "chlorine", B: "boron", Cu: "copper", Br: "bromine", C: "carbon", Mg: "magnesium", Ne: "neon", Li: "lithium", Fe: "iron", Zn: "zinc", Ag: "silver", Pb: "lead", Hg: "mercury", Ni: "nickel", Sn: "tin" };
  var table = (typeof CHEM_AM !== "undefined") ? CHEM_AM : { Cl: 35.45, B: 10.81, Cu: 63.55, Br: 79.90, C: 12.01, Mg: 24.31, Ne: 20.18, Li: 6.94, Fe: 55.85, Zn: 65.39, Ag: 107.87, Pb: 207.20, Hg: 200.59, Ni: 58.69, Sn: 118.71 };
  var sym = pick(Object.keys(names));
  var mass = fmtF(table[sym], 2);
  var stems = [
    "The periodic table lists the atomic mass of " + names[sym] + " as " + mass + " u, which is not a whole number. Why is that?",
    "Why is the atomic mass of " + names[sym] + " shown on the periodic table as " + mass + " u instead of a whole number?",
    "A student asks why " + names[sym] + " has an atomic mass of " + mass + " u on the periodic table, not a whole number. What is the reason?",
    "The atomic mass of " + names[sym] + " is listed as " + mass + " u. Which statement best explains why it is not a whole number?"
  ];
  return mcq(
    pick(stems),
    "It is a weighted average of the masses of all its naturally occurring isotopes",
    [
      "It is the mass of one atom rounded off using the heaviest isotope only",
      "It is a simple average of the proton and neutron masses in one atom",
      "It is the total mass of all the atoms in a large sample of the element"
    ],
    "Each isotope has its own mass and its own abundance in nature. The table value averages the isotope masses, weighted by abundance, so it usually lands between the isotope masses and is not a whole number.",
    { sym: sym, mass: mass });
});

/* --- B.3: naming compounds and writing formulas (review) --- */
E("br-b3-binary-name", 4, ["B.3"], 1, "gen", function () {
  var items = [
    { f: "NaCl", metal: "sodium", elem: "chlorine", ide: "chloride", ms: 1, ns: 1 },
    { f: "NaBr", metal: "sodium", elem: "bromine", ide: "bromide", ms: 1, ns: 1 },
    { f: "KCl", metal: "potassium", elem: "chlorine", ide: "chloride", ms: 1, ns: 1 },
    { f: "KI", metal: "potassium", elem: "iodine", ide: "iodide", ms: 1, ns: 1 },
    { f: "LiF", metal: "lithium", elem: "fluorine", ide: "fluoride", ms: 1, ns: 1 },
    { f: "CaO", metal: "calcium", elem: "oxygen", ide: "oxide", ms: 1, ns: 1 },
    { f: "CaS", metal: "calcium", elem: "sulfur", ide: "sulfide", ms: 1, ns: 1 },
    { f: "MgO", metal: "magnesium", elem: "oxygen", ide: "oxide", ms: 1, ns: 1 },
    { f: "MgS", metal: "magnesium", elem: "sulfur", ide: "sulfide", ms: 1, ns: 1 },
    { f: "ZnO", metal: "zinc", elem: "oxygen", ide: "oxide", ms: 1, ns: 1 },
    { f: "Na\u2082O", metal: "sodium", elem: "oxygen", ide: "oxide", ms: 2, ns: 1 },
    { f: "K\u2082S", metal: "potassium", elem: "sulfur", ide: "sulfide", ms: 2, ns: 1 },
    { f: "Li\u2082S", metal: "lithium", elem: "sulfur", ide: "sulfide", ms: 2, ns: 1 },
    { f: "CaCl\u2082", metal: "calcium", elem: "chlorine", ide: "chloride", ms: 1, ns: 2 },
    { f: "MgCl\u2082", metal: "magnesium", elem: "chlorine", ide: "chloride", ms: 1, ns: 2 },
    { f: "CaF\u2082", metal: "calcium", elem: "fluorine", ide: "fluoride", ms: 1, ns: 2 },
    { f: "MgBr\u2082", metal: "magnesium", elem: "bromine", ide: "bromide", ms: 1, ns: 2 },
    { f: "Al\u2082O\u2083", metal: "aluminum", elem: "oxygen", ide: "oxide", ms: 2, ns: 3 }
  ];
  function pre(n) { return n === 1 ? "mono" : n === 2 ? "di" : "tri"; }
  var it = pick(items);
  var correct = it.metal + " " + it.ide;
  var stems = [
    "What is the name of the binary ionic compound " + it.f + "?",
    "Name the binary ionic compound with the formula " + it.f + ".",
    "Choose the correct name for the ionic compound " + it.f + ".",
    "A formula is written as " + it.f + ". What is the name of this binary ionic compound?"
  ];
  return mcq(
    pick(stems),
    correct,
    [
      it.metal + " " + it.elem,
      it.metal + " " + pre(it.ns) + it.ide,
      pre(it.ms) + it.metal + " " + it.ide
    ],
    "Binary ionic compounds put the metal name first, then the nonmetal name with an ide ending. Prefixes such as mono and di are not used for ionic compounds, so " + it.f + " is <b>" + correct + "</b>.",
    { f: it.f });
});

E("br-b3-formula-write", 4, ["B.3"], 2, "gen", function () {
  var items = [
    { name: "calcium chloride", metalName: "calcium", nonName: "chlorine", msym: "Ca", mch: 2, nsym: "Cl", nch: 1, ms: 1, ns: 2, plain: "CaCl2", uni: "CaCl\u2082" },
    { name: "magnesium bromide", metalName: "magnesium", nonName: "bromine", msym: "Mg", mch: 2, nsym: "Br", nch: 1, ms: 1, ns: 2, plain: "MgBr2", uni: "MgBr\u2082" },
    { name: "aluminum oxide", metalName: "aluminum", nonName: "oxygen", msym: "Al", mch: 3, nsym: "O", nch: 2, ms: 2, ns: 3, plain: "Al2O3", uni: "Al\u2082O\u2083" },
    { name: "calcium oxide", metalName: "calcium", nonName: "oxygen", msym: "Ca", mch: 2, nsym: "O", nch: 2, ms: 1, ns: 1, plain: "CaO", uni: "CaO" },
    { name: "sodium sulfide", metalName: "sodium", nonName: "sulfur", msym: "Na", mch: 1, nsym: "S", nch: 2, ms: 2, ns: 1, plain: "Na2S", uni: "Na\u2082S" },
    { name: "potassium oxide", metalName: "potassium", nonName: "oxygen", msym: "K", mch: 1, nsym: "O", nch: 2, ms: 2, ns: 1, plain: "K2O", uni: "K\u2082O" },
    { name: "magnesium oxide", metalName: "magnesium", nonName: "oxygen", msym: "Mg", mch: 2, nsym: "O", nch: 2, ms: 1, ns: 1, plain: "MgO", uni: "MgO" },
    { name: "calcium fluoride", metalName: "calcium", nonName: "fluorine", msym: "Ca", mch: 2, nsym: "F", nch: 1, ms: 1, ns: 2, plain: "CaF2", uni: "CaF\u2082" },
    { name: "aluminum chloride", metalName: "aluminum", nonName: "chlorine", msym: "Al", mch: 3, nsym: "Cl", nch: 1, ms: 1, ns: 3, plain: "AlCl3", uni: "AlCl\u2083" },
    { name: "sodium oxide", metalName: "sodium", nonName: "oxygen", msym: "Na", mch: 1, nsym: "O", nch: 2, ms: 2, ns: 1, plain: "Na2O", uni: "Na\u2082O" },
    { name: "lithium sulfide", metalName: "lithium", nonName: "sulfur", msym: "Li", mch: 1, nsym: "S", nch: 2, ms: 2, ns: 1, plain: "Li2S", uni: "Li\u2082S" },
    { name: "magnesium chloride", metalName: "magnesium", nonName: "chlorine", msym: "Mg", mch: 2, nsym: "Cl", nch: 1, ms: 1, ns: 2, plain: "MgCl2", uni: "MgCl\u2082" },
    { name: "barium chloride", metalName: "barium", nonName: "chlorine", msym: "Ba", mch: 2, nsym: "Cl", nch: 1, ms: 1, ns: 2, plain: "BaCl2", uni: "BaCl\u2082" },
    { name: "aluminum sulfide", metalName: "aluminum", nonName: "sulfur", msym: "Al", mch: 3, nsym: "S", nch: 2, ms: 2, ns: 3, plain: "Al2S3", uni: "Al\u2082S\u2083" },
    { name: "calcium sulfide", metalName: "calcium", nonName: "sulfur", msym: "Ca", mch: 2, nsym: "S", nch: 2, ms: 1, ns: 1, plain: "CaS", uni: "CaS" },
    { name: "potassium sulfide", metalName: "potassium", nonName: "sulfur", msym: "K", mch: 1, nsym: "S", nch: 2, ms: 2, ns: 1, plain: "K2S", uni: "K\u2082S" },
    { name: "sodium chloride", metalName: "sodium", nonName: "chlorine", msym: "Na", mch: 1, nsym: "Cl", nch: 1, ms: 1, ns: 1, plain: "NaCl", uni: "NaCl" },
    { name: "zinc sulfide", metalName: "zinc", nonName: "sulfur", msym: "Zn", mch: 2, nsym: "S", nch: 2, ms: 1, ns: 1, plain: "ZnS", uni: "ZnS" },
    { name: "magnesium fluoride", metalName: "magnesium", nonName: "fluorine", msym: "Mg", mch: 2, nsym: "F", nch: 1, ms: 1, ns: 2, plain: "MgF2", uni: "MgF\u2082" },
    { name: "lithium oxide", metalName: "lithium", nonName: "oxygen", msym: "Li", mch: 1, nsym: "O", nch: 2, ms: 2, ns: 1, plain: "Li2O", uni: "Li\u2082O" }
  ];
  var it = pick(items);
  var charges = cap(it.metalName) + " ions carry a " + it.mch + "+ charge and " + it.nonName + " ions carry a " + it.nch + "- charge.";
  var stems = [
    "Write the chemical formula for " + it.name + ". " + charges,
    cap(it.name) + " is a binary ionic compound. " + charges + " Write its chemical formula.",
    "Using charge balance, write the formula for the binary ionic compound " + it.name + ". " + charges
  ];
  var answers = it.uni === it.plain ? [it.uni] : [it.uni, it.plain];
  var total = it.mch * it.ms;
  return textq(
    pick(stems),
    answers,
    "Cross the charge numbers, without their signs, to get the subscripts, then reduce to the lowest whole numbers if needed. The total positive charge is " + it.ms + " x " + it.mch + " = " + total + " and the total negative charge is " + it.ns + " x " + it.nch + " = " + total + ", so the charges balance. The formula is <b>" + it.uni + "</b>.",
    { name: it.name, f: it.plain });
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
});

E("br-b3-molecular-poly", 4, ["B.3"], 2, "gen", function () {
  var items = [
    { f: "CO", fam: "molecular", correct: "carbon monoxide", d: ["carbon oxide", "carbon dioxide", "monocarbon monoxide"] },
    { f: "CO\u2082", fam: "molecular", correct: "carbon dioxide", d: ["carbon monoxide", "carbon oxide", "dicarbon dioxide"] },
    { f: "SO\u2082", fam: "molecular", correct: "sulfur dioxide", d: ["sulfur monoxide", "sulfur oxide", "disulfur dioxide"] },
    { f: "SO\u2083", fam: "molecular", correct: "sulfur trioxide", d: ["sulfur dioxide", "sulfur oxide", "trisulfur trioxide"] },
    { f: "NO", fam: "molecular", correct: "nitrogen monoxide", d: ["nitrogen oxide", "nitrogen dioxide", "mononitrogen monoxide"] },
    { f: "NO\u2082", fam: "molecular", correct: "nitrogen dioxide", d: ["nitrogen monoxide", "nitrogen oxide", "dinitrogen dioxide"] },
    { f: "N\u2082O", fam: "molecular", correct: "dinitrogen monoxide", d: ["nitrogen monoxide", "dinitrogen oxide", "nitrogen dioxide"] },
    { f: "N\u2082O\u2084", fam: "molecular", correct: "dinitrogen tetroxide", d: ["dinitrogen oxide", "nitrogen tetroxide", "dinitrogen dioxide"] },
    { f: "PCl\u2083", fam: "molecular", correct: "phosphorus trichloride", d: ["phosphorus chloride", "phosphorus dichloride", "triphosphorus trichloride"] },
    { f: "PCl\u2085", fam: "molecular", correct: "phosphorus pentachloride", d: ["phosphorus chloride", "phosphorus tetrachloride", "monophosphorus pentachloride"] },
    { f: "CCl\u2084", fam: "molecular", correct: "carbon tetrachloride", d: ["carbon chloride", "carbon trichloride", "monocarbon tetrachloride"] },
    { f: "CS\u2082", fam: "molecular", correct: "carbon disulfide", d: ["carbon sulfide", "carbon monosulfide", "dicarbon disulfide"] },
    { f: "BF\u2083", fam: "molecular", correct: "boron trifluoride", d: ["boron fluoride", "boron difluoride", "triboron trifluoride"] },
    { f: "SiO\u2082", fam: "molecular", correct: "silicon dioxide", d: ["silicon monoxide", "silicon oxide", "disilicon dioxide"] },
    { f: "NaNO\u2083", fam: "polyatomic", correct: "sodium nitrate", d: ["sodium nitrite", "monosodium nitrate", "sodium nitride"] },
    { f: "KNO\u2083", fam: "polyatomic", correct: "potassium nitrate", d: ["potassium nitrite", "monopotassium nitrate", "potassium nitride"] },
    { f: "NaOH", fam: "polyatomic", correct: "sodium hydroxide", d: ["sodium hydride", "monosodium hydroxide", "sodium hydroxite"] },
    { f: "Ca(OH)\u2082", fam: "polyatomic", correct: "calcium hydroxide", d: ["calcium dihydroxide", "calcium hydride", "dicalcium hydroxide"] },
    { f: "K\u2082SO\u2084", fam: "polyatomic", correct: "potassium sulfate", d: ["potassium sulfite", "dipotassium sulfate", "potassium sulfide"] },
    { f: "MgSO\u2084", fam: "polyatomic", correct: "magnesium sulfate", d: ["magnesium sulfite", "magnesium sulfide", "monomagnesium sulfate"] },
    { f: "CaCO\u2083", fam: "polyatomic", correct: "calcium carbonate", d: ["calcium carbonite", "calcium carbide", "monocalcium carbonate"] },
    { f: "Na\u2082CO\u2083", fam: "polyatomic", correct: "sodium carbonate", d: ["sodium carbonite", "disodium carbonate", "sodium carbide"] },
    { f: "NH\u2084Cl", fam: "polyatomic", correct: "ammonium chloride", d: ["ammonium chlorine", "ammonia chloride", "ammonium chlorite"] },
    { f: "(NH\u2084)\u2082SO\u2084", fam: "polyatomic", correct: "ammonium sulfate", d: ["ammonium sulfite", "ammonium sulfide", "diammonium sulfate"] }
  ];
  var it = pick(items);
  var stems = [
    "What is the name of the compound with the formula " + it.f + "?",
    "Name the compound " + it.f + ".",
    "Choose the correct name for the compound " + it.f + "."
  ];
  var sol = it.fam === "molecular"
    ? "Molecular compounds use prefixes to state how many atoms of each element are present, and the second element ends in ide. Mono is dropped from the first element, so " + it.f + " is <b>" + it.correct + "</b>."
    : "In an ionic compound, a polyatomic ion keeps its own name and no prefixes are used. So " + it.f + " is <b>" + it.correct + "</b>.";
  return mcq(pick(stems), it.correct, it.d, sol, { f: it.f, fam: it.fam });
});

/* ============ Constructed-response marks (generated) ============ */
/* Built by assemble-bank.py from the CRMARKS manifests at the top of
   each unit file. Exam Section B draws only from these entries. */
window.__BANK_CRMARKS={"br-b1-ion-electrons":2,"br-b1-neutrons":2,"br-b2-avg-mass":2,"u1-51-write-formula":2,"u1-51-write-name":2,"u1-510-airbag-and-fertilizer":3,"u1-510-antacid-calculation":3,"u1-52-mass-to-moles":2,"u1-52-mass-to-particles":3,"u1-52-mass-to-volume-stp":3,"u1-52-molar-mass":2,"u1-52-moles-to-mass":2,"u1-52-particles-to-moles":2,"u1-53-predict-state":2,"u1-54-rate-comparison":2,"u1-55-temperature-prediction":2,"u1-56-precipitate-formula":3,"u1-56-precipitate-formula-advanced":3,"u1-57-moles-direct":2,"u1-57-moles-reverse":2,"u1-57-particles-ratio":3,"u1-58-concentration":2,"u1-58-dilution":2,"u1-58-excess-remaining":4,"u1-58-limiting-theoretical-yield":4,"u1-58-mass-to-gas-volume":3,"u1-58-mass-to-mass":3,"u1-59-percent-yield-direct":2,"u1-59-percent-yield-from-reaction":3,"u2-02":2,"u2-03":3,"u2-07":2,"u2-08":2,"u2-23":2,"u2-26":3,"u2-27":2,"u2-29":2,"u2-51":2,"u2-52":2,"u2-53":3,"u3-73-formula-branch":3,"u3-73-formula-from-name":2,"u3-73-name-hard":2,"u3-74-isomer-count":2,"u3-74-shared-formula":2,"u3-75-aromatic-formula":3,"u3-76-deriv-formula":2,"u3-76-formula-from-structure":2,"u3-77-combustion-coeff":3,"u3-78-monomer-name":2};
