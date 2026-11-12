/* Math 1201 bank module for the unified review app shell.
   Assembled by assemble-bank.py from banks/math-1201/; edit the
   per-unit sources there, not this file. Entries register through
   the shell's E(id, unit, indicators, level, kind, gen). */

/* ----- bank-helpers.js ----- */
/* Math 1201 bank helpers: FR, cut verbatim from the head of
   the standalone bank source (math-1201-review/bank-src.js,
   lines 1 to 8), where it precedes the Unit 1 banner. */
/* Math 1201 Review bank source. Tranche 1 (Units 1 to 3) assembled November
   6, 2026 from tranche1/unit1.js to unit3.js; tranche 2 (Units 4 to 7)
   follows from tranche2/. FR returns the raw \frac fragment for use
   INSIDE math delimiters (the Math 3201 chassis convention), defined here
   for the entries that use it. CR_MARKS stays at the end of this file and
   must be carried over verbatim at every assembly. */
function FR(n,d){return "\\frac{"+n+"}{"+d+"}";}

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

/* ----- bank-u1.js ----- */
// Math 1201 Unit 1 Measurement question bank
// Cut verbatim from the standalone bank source
// (math-1201-review/bank-src.js, lines 9 to 629).
// CRMARKS: u1-convert-multistep=2
// CRMARKS: u1-sa-basic=3
// CRMARKS: u1-sa-unknown=2
// CRMARKS: u1-vol-basic=2
// CRMARKS: u1-vol-unknown=2
// CRMARKS: u1-sphere=3
// CRMARKS: u1-composite=3
// CRMARKS: u1-composite-sa=2
// Figures (Nov 2026): the shape, solid and instrument entries carry
// inline SVG diagrams drawn from each generator's own values, with
// the helpers in bank-helpers.js. Conversion, referent, estimation,
// justification and strategy entries stay figureless.
/* Unit 1: Measurement (indicators 5.1 to 5.15, 6.1 to 6.4).
   All scenarios and values are original. Helper prefix: u1. */

function u1r1(n){return Math.round(n*10)/10;}
function u1r2(n){return Math.round(n*100)/100;}
function u1setOk(a){return (new Set(a.map(function(x){return String(x);})).size===a.length);}

/* Rule 7 (balanced precision, pairs criterion, Nov 8 2026): pad distractor
   strings with trailing zeros so no option stands alone at a unique number
   of decimal places. The correct option's string is never changed, no value
   changes, and no randomness is consumed. Applies only when every option is
   a bare number string; otherwise the set is returned unchanged. */
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

/* 1. Convert within one system */
E("u1-convert-si",1,["6.1"],1,"gen",function(){
  var modes=[
    {from:"kilometres",to:"metres",f:1000,alts:[100,10000,10],dec:true,note:"1 kilometre = 1000 metres"},
    {from:"metres",to:"centimetres",f:100,alts:[10,1000,10000],dec:true,note:"1 metre = 100 centimetres"},
    {from:"centimetres",to:"millimetres",f:10,alts:[100,1000,2],dec:false,note:"1 centimetre = 10 millimetres"},
    {from:"metres",to:"millimetres",f:1000,alts:[100,10,10000],dec:true,note:"1 metre = 1000 millimetres"},
    {from:"centimetres",to:"metres",f:0.01,alts:[0.1,0.001,10],dec:false,note:"100 centimetres = 1 metre"},
    {from:"millimetres",to:"centimetres",f:0.1,alts:[0.01,10,0.001],dec:false,note:"10 millimetres = 1 centimetre"},
    {from:"feet",to:"inches",f:12,alts:[3,36,6],dec:false,note:"1 foot = 12 inches"},
    {from:"yards",to:"feet",f:3,alts:[12,36,2],dec:false,note:"1 yard = 3 feet"},
    {from:"yards",to:"inches",f:36,alts:[12,3,72],dec:false,note:"1 yard = 36 inches"}
  ];
  var m=pick(modes),v,ans,tries=0,ds;
  do{
    v=m.dec?ri(2,24)+pick([0,0.25,0.5,0.75]):ri(3,40);
    if(m.f<1&&m.from==="centimetres")v=ri(2,40)*50;
    if(m.f===0.1)v=ri(3,40)*10;
    ans=u1r2(v*m.f);
    ds=m.alts.map(function(a){return fmt(u1r2(v*a));});
    tries++;
  }while(!u1setOk([fmt(ans)].concat(ds))&&tries<80);
  var sol="Use the fact that "+m.note+". Multiply or divide by the conversion factor: \\[ "+fmt(v)+" \\times "+fmt(m.f)+" = "+fmt(ans)+" \\] So the measure is <b>"+fmt(ans)+" "+m.to+"</b>.";
  if(m.f<1)sol="Use the fact that "+m.note+". Divide by the number of smaller units in one larger unit: \\[ "+fmt(v)+" \\times "+fmt(m.f)+" = "+fmt(ans)+" \\] So the measure is <b>"+fmt(ans)+" "+m.to+"</b>.";
  return mcq("Convert "+fmt(v)+" "+m.from+" to "+m.to+".",fmt(ans),balDp(fmt(ans),ds),sol,{mode:m.from+"-"+m.to,v:v});
});

/* 2. Convert between systems, multiple choice with numeric options */
E("u1-convert-between",1,["6.1","6.2"],1,"gen",function(){
  var mode=ri(1,5),v,ans,ds,prompt,sol,tries=0;
  do{
    tries++;
    if(mode===1){
      v=ri(2,40)+pick([0,0.25,0.5,0.75]); ans=u1r2(v*2.54);
      ds=[fmt(u1r2(v*2.5)),fmt(u1r2(v/2.54)),fmt(u1r2(v*25.4))];
      prompt="A ribbon is "+fmt(v)+" inches long. Convert this length to centimetres. Use 1 inch = 2.54 centimetres. Give the length in centimetres.";
      sol="Multiply by the conversion factor: \\[ \\begin{aligned} "+fmt(v)+" \\times 2.54 &= "+fmt(ans)+" \\end{aligned} \\] So the ribbon is <b>"+fmt(ans)+" centimetres</b> long.";
    }else if(mode===2){
      v=ri(10,60); ans=u1r2(v*0.3048);
      ds=[fmt(u1r2(v*0.3)),fmt(u1r2(v*3.048)),fmt(u1r2(v*0.03048))];
      prompt="An extension cable is "+v+" feet long. Convert this length to metres. Use 1 foot = 0.3048 metres. Give the length in metres.";
      sol="Multiply by the conversion factor: \\[ \\begin{aligned} "+v+" \\times 0.3048 &= "+fmt(ans)+" \\end{aligned} \\] So the cable is <b>"+fmt(ans)+" metres</b> long.";
    }else if(mode===3){
      v=ri(2,90); ans=u1r1(v*1.6);
      ds=[fmt(u1r1(v*0.16)),fmt(v*16),fmt(u1r1(v*2.6))];
      prompt="A hiking trail is "+v+" miles long. Convert this length to kilometres. Use 1 mile = 1.6 kilometres. Give the length in kilometres.";
      sol="Multiply by the conversion factor: \\[ \\begin{aligned} "+v+" \\times 1.6 &= "+fmt(ans)+" \\end{aligned} \\] So the trail is <b>"+fmt(ans)+" kilometres</b> long.";
    }else if(mode===4){
      v=ri(2,40); ans=u1r2(v*3.28);
      ds=[fmt(u1r2(v*0.328)),fmt(u1r2(v*32.8)),fmt(u1r2(v*2.28))];
      prompt="A rope is "+v+" metres long. Convert this length to feet. Use 1 metre = 3.28 feet. Give the length in feet.";
      sol="Multiply by the conversion factor: \\[ \\begin{aligned} "+v+" \\times 3.28 &= "+fmt(ans)+" \\end{aligned} \\] So the rope is <b>"+fmt(ans)+" feet</b> long.";
    }else{
      var t=ri(2,30); v=u1r2(t*2.54); ans=t;
      ds=[fmt(u1r2(v*2.54)),fmt(t/2),fmt(t*2)];
      prompt="A photograph is "+fmt(v)+" centimetres wide. Convert this width to inches. Use 1 inch = 2.54 centimetres. Give the width in inches.";
      sol="Divide by the conversion factor, since centimetres are the smaller unit here: \\[ \\begin{aligned} "+fmt(v)+" \\div 2.54 &= "+fmt(ans)+" \\end{aligned} \\] So the photograph is <b>"+fmt(ans)+" inches</b> wide.";
    }
  }while(!u1setOk([fmt(ans)].concat(ds))&&tries<80);
  return mcq(prompt,fmt(ans),balDp(fmt(ans),ds),sol,{mode:mode,v:v});
});

/* 3. Multistep conversions, numeric answer */
E("u1-convert-multistep",1,["6.2"],2,"gen",function(){
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

/* 4. Unit analysis setups */
E("u1-unit-analysis",1,["6.3"],1,"var",varset([
  function(){return mcq("Which setup correctly converts 7.5 kilometres to metres?",
    "7.5 km x (1000 m / 1 km)",
    ["7.5 km x (1 km / 1000 m)","7.5 km x (100 m / 1 km)","7.5 km x (1 m / 1000 km)"],
    "In the correct setup the kilometre units cancel and only metres remain, and the factor uses 1000 m = 1 km. The correct setup is <b>7.5 km x (1000 m / 1 km)</b>.",{});},
  function(){return mcq("Which setup correctly converts 48 inches to feet?",
    "48 in x (1 ft / 12 in)",
    ["48 in x (12 in / 1 ft)","48 in x (1 ft / 36 in)","48 in x (12 ft / 1 in)"],
    "In the correct setup the inch units cancel and only feet remain, and the factor uses 1 ft = 12 in. The correct setup is <b>48 in x (1 ft / 12 in)</b>.",{});},
  function(){return mcq("Which setup correctly converts 250 centimetres to metres?",
    "250 cm x (1 m / 100 cm)",
    ["250 cm x (100 cm / 1 m)","250 cm x (1 m / 10 cm)","250 cm x (1000 m / 1 cm)"],
    "In the correct setup the centimetre units cancel and only metres remain, and the factor uses 1 m = 100 cm. The correct setup is <b>250 cm x (1 m / 100 cm)</b>.",{});},
  function(){return mcq("Which setup correctly converts 6 feet to inches?",
    "6 ft x (12 in / 1 ft)",
    ["6 ft x (1 ft / 12 in)","6 ft x (36 in / 1 ft)","6 ft x (1 in / 12 ft)"],
    "In the correct setup the foot units cancel and only inches remain, and the factor uses 1 ft = 12 in. The correct setup is <b>6 ft x (12 in / 1 ft)</b>.",{});},
  function(){return mcq("Which setup correctly converts 9 miles to kilometres? Use 1 mile = 1.6 kilometres.",
    "9 mi x (1.6 km / 1 mi)",
    ["9 mi x (1 mi / 1.6 km)","9 mi x (16 km / 1 mi)","9 mi x (1.6 mi / 1 km)"],
    "In the correct setup the mile units cancel and only kilometres remain, and the factor uses 1 mi = 1.6 km. The correct setup is <b>9 mi x (1.6 km / 1 mi)</b>.",{});},
  function(){return mcq("Which setup correctly converts 3.2 metres to centimetres?",
    "3.2 m x (100 cm / 1 m)",
    ["3.2 m x (1 m / 100 cm)","3.2 m x (10 cm / 1 m)","3.2 m x (100 m / 1 cm)"],
    "In the correct setup the metre units cancel and only centimetres remain, and the factor uses 1 m = 100 cm. The correct setup is <b>3.2 m x (100 cm / 1 m)</b>.",{});},
  function(){return mcq("A student writes 5 yd x (1 yd / 3 ft) to convert 5 yards to feet. Which statement describes this setup?",
    "The units do not cancel to feet, and the factor is upside down",
    ["The units cancel to feet, and the factor is written correctly","The units cancel to yards, and the factor is written correctly","The units do not cancel to feet, but the answer will still be feet"],
    "The yard in the numerator cannot cancel the yards in the given measure, so the units do not reduce to feet, and the conversion factor is also upside down. The statement is <b>the units do not cancel to feet, and the factor is upside down</b>.",{});},
  function(){return mcq("Which setup correctly converts 420 millimetres to centimetres?",
    "420 mm x (1 cm / 10 mm)",
    ["420 mm x (10 mm / 1 cm)","420 mm x (1 cm / 100 mm)","420 mm x (10 cm / 1 mm)"],
    "In the correct setup the millimetre units cancel and only centimetres remain, and the factor uses 1 cm = 10 mm. The correct setup is <b>420 mm x (1 cm / 10 mm)</b>.",{});}
]));

/* 5. Reasonableness of a conversion, mental mathematics */
E("u1-reasonable",1,["6.4"],3,"var",varset([
  function(){return mcq("A runner says a 5 kilometre run is 500 metres long. Judge this conversion.",
    "Not reasonable: 1 km is 1000 m, so 5 km should be 5000 m",
    ["Reasonable: 1 km is 100 m, so 5 km should be 500 m","Not reasonable: 1 km is 100 m, so 5 km should be 50000 m","Reasonable: 1 km is 1000 m, so 5 km should be 500 m"],
    "Mentally, 1 km = 1000 m, so 5 km = 5000 m. The claim of 500 m is ten times too small. It is <b>not reasonable: 1 km is 1000 m, so 5 km should be 5000 m</b>.",{});},
  function(){return mcq("A ribbon 30 centimetres long is described as about 12 inches long. Judge this conversion. Use 1 inch = 2.54 centimetres.",
    "Reasonable: 30 divided by about 2.5 is about 12",
    ["Not reasonable: 30 divided by about 2.5 is about 12","Reasonable: 30 times about 2.5 is about 12","Not reasonable: 30 times about 2.5 is about 75"],
    "Mentally, divide 30 by about 2.5 to get about 12, which matches the claim. It is <b>reasonable: 30 divided by about 2.5 is about 12</b>.",{});},
  function(){return mcq("A student 180 centimetres tall is described as 18 feet tall. Judge this conversion.",
    "Not reasonable: 180 cm is about 1.8 m, which is about 6 ft",
    ["Reasonable: 180 cm is about 1.8 m, which is about 6 ft in height","Not reasonable: 180 cm is about 18 m, which is about 6 ft","Reasonable: 180 cm is about 18 m, which is about 60 ft"],
    "Mentally, 180 cm is 1.8 m, and a person 1.8 m tall is about 6 ft tall, not 18 ft. It is <b>not reasonable: 180 cm is about 1.8 m, which is about 6 ft</b>.",{});},
  function(){return mcq("A board 8 feet long is described as about 2.4 metres long. Judge this conversion.",
    "Reasonable: 1 ft is about 0.3 m, so 8 ft is about 2.4 m",
    ["Not reasonable: 1 ft is about 0.3 m, so 8 ft is about 2.4 m","Reasonable: 1 ft is about 3 m, so 8 ft is about 2.4 m","Not reasonable: 1 ft is about 3 m, so 8 ft is about 24 m"],
    "Mentally, 1 ft is about 0.3 m, so 8 ft is about 2.4 m, which matches the claim. It is <b>reasonable: 1 ft is about 0.3 m, so 8 ft is about 2.4 m</b>.",{});},
  function(){return mcq("A paperclip 3 centimetres long is described as 30 millimetres long. Judge this conversion.",
    "Reasonable: 1 cm is 10 mm, so 3 cm should be 30 mm here",
    ["Not reasonable: 1 cm is 10 mm, so 3 cm should be 30 mm","Reasonable: 1 cm is 100 mm, so 3 cm should be 30 mm","Not reasonable: 1 cm is 100 mm, so 3 cm should be 300 mm"],
    "Mentally, 1 cm = 10 mm, so 3 cm = 30 mm, which matches the claim. It is <b>reasonable: 1 cm is 10 mm, so 3 cm should be 30 mm here</b>.",{});},
  function(){return mcq("A drive of 100 kilometres is described as about 620 miles. Judge this conversion. Use 1 mile = 1.6 kilometres.",
    "Not reasonable: 100 divided by 1.6 is about 62, not 620",
    ["Reasonable: 100 divided by 1.6 is about 62, not 620","Not reasonable: 100 times 1.6 is about 160, not 620","Reasonable: 100 times 1.6 is about 620 miles, not 160 km at all"],
    "Mentally, divide 100 by 1.6 to get about 62 miles. The claim of 620 miles is ten times too large. It is <b>not reasonable: 100 divided by 1.6 is about 62, not 620</b>.",{});},
  function(){return mcq("A ribbon 45 centimetres wide is described as 4.5 metres wide. Judge this conversion.",
    "Not reasonable: 45 cm is 0.45 m, since 100 cm make 1 m",
    ["Reasonable: 45 cm is 0.45 m, since 100 cm make 1 m","Not reasonable: 45 cm is 4.5 m, since 10 cm make 1 m","Reasonable: 45 cm is 45 m, since 100 cm make up one full metre stick"],
    "Mentally, 45 cm is a little under half of 100 cm, so it is 0.45 m, not 4.5 m. It is <b>not reasonable: 45 cm is 0.45 m, since 100 cm make 1 m</b>.",{});},
  function(){return mcq("A yardstick 3 feet long is described as 36 inches long. Judge this conversion.",
    "Reasonable: 1 ft is 12 in, so 3 ft should be 36 in",
    ["Not reasonable: 1 ft is 12 in, so 3 ft should be 36 in","Reasonable: 1 ft is 36 in, so 3 ft should be 36 in","Not reasonable: 1 ft is 36 in, so 3 ft should be 108 in"],
    "Mentally, 1 ft = 12 in, so 3 ft = 36 in, which matches the claim. It is <b>reasonable: 1 ft is 12 in, so 3 ft should be 36 in</b>.",{});}
]));

/* 6. Referents and comparing SI and imperial units */
E("u1-referent",1,["5.10","5.11"],1,"var",varset([
  function(){return mcq("Which unit is the best choice for measuring the length of a pencil?",
    "centimetres",["millimetres","kilometres","metres"],
    "A pencil is about 18 units long in centimetres, a manageable count. Millimetres give a large count for a hand object and metres and kilometres are far too large. The best unit is <b>centimetres</b>.",{});},
  function(){return mcq("Which referent is closest to 1 millimetre?",
    "the thickness of a dime",["the width of a fingernail","the height of a doorway","the length of a paperclip"],
    "A dime is about 1 mm thick. A fingernail is about 1 cm wide, a paperclip is a few centimetres long, and a doorway is about 2 m high. The closest referent is <b>the thickness of a dime</b>.",{});},
  function(){return mcq("Which unit is the best choice for measuring the distance between two towns?",
    "kilometres",["centimetres","metres","millimetres"],
    "Town to town distances run to tens or hundreds of kilometres, a manageable count. The smaller units would give enormous counts. The best unit is <b>kilometres</b>.",{});},
  function(){return mcq("Which referent is closest to 1 centimetre?",
    "the width of a fingernail",["the thickness of a dime","the height of a doorway","the length of a shoelace"],
    "A fingernail is about 1 cm wide. A dime is about 1 mm thick, a doorway is about 2 m high, and a shoelace is close to a metre long. The closest referent is <b>the width of a fingernail</b>.",{});},
  function(){return mcq("Which statement correctly compares 1 metre and 1 yard?",
    "A metre is a little longer than a yard",["A yard is a little longer than a metre","A metre is exactly the same as a yard","A yard is about twice as long as a metre"],
    "One metre is about 39 inches and one yard is 36 inches, so a metre is a little longer. The correct statement is <b>a metre is a little longer than a yard</b>.",{});},
  function(){return mcq("Which statement correctly compares 1 kilometre and 1 mile?",
    "A mile is longer than a kilometre",["A kilometre is longer than a mile","A mile is exactly the same as a kilometre","A kilometre is about twice as long as a mile"],
    "One mile is about 1.6 kilometres, so a mile is longer. The correct statement is <b>a mile is longer than a kilometre</b>.",{});},
  function(){return mcq("Which referent is closest to 1 inch?",
    "the width of an adult thumb",["the width of a fingernail","the height of a doorway","the length of a paperclip"],
    "An adult thumb is about 1 inch, or 2.54 cm, wide. A fingernail is about 1 cm wide, a paperclip is longer than an inch, and a doorway is about 2 m high. The closest referent is <b>the width of an adult thumb</b>.",{});},
  function(){return mcq("Which unit is the best choice for measuring the height of a classroom ceiling?",
    "metres",["centimetres","kilometres","millimetres"],
    "A ceiling is a few metres high, a manageable count in metres. Centimetres and millimetres give large counts and kilometres are far too large. The best unit is <b>metres</b>.",{});},
  function(){return mcq("Which referent is closest to 1 foot?",
    "the length of a standard ruler",["the width of an adult thumb","the height of a doorway","the length of a shoelace"],
    "A standard ruler is 12 inches, which is 1 foot. A thumb is about 1 inch wide, a doorway is about 2 m high, and a shoelace is close to a metre. The closest referent is <b>the length of a standard ruler</b>.",{});},
  function(){return mcq("Which statement correctly compares a centimetre and an inch?",
    "An inch is longer than a centimetre",["A centimetre is longer than an inch","An inch is exactly the same as a centimetre","A centimetre is about twice as long as an inch"],
    "One inch is 2.54 centimetres, so an inch is longer. The correct statement is <b>an inch is longer than a centimetre</b>.",{});}
]));

/* 7. Estimate a length using a referent */
E("u1-estimate",1,["5.12"],1,"var",varset([
  function(){return mcq("A doorway is about 2 metres high. A classroom wall is about 4 doorway heights wide. Estimate the width of the wall, in metres.",
    "8",["4","12","20"],
    "Use the doorway as the referent and multiply the count by its height: \\[ 4 \\times 2 = 8 \\] The best estimate is <b>8 metres</b>.",{});},
  function(){return mcq("A paperclip is about 3 centimetres long. A desk is about 20 paperclip lengths wide. Estimate the width of the desk, in centimetres.",
    "60",["23","40","120"],
    "Use the paperclip as the referent and multiply the count by its length: \\[ 20 \\times 3 = 60 \\] The best estimate is <b>60 centimetres</b>.",{});},
  function(){return mcq("One long stride is about 1 metre. A hallway takes about 15 strides to walk. Estimate the length of the hallway, in metres.",
    "15",["5","30","45"],
    "Use the stride as the referent and multiply the count by its length: \\[ 15 \\times 1 = 15 \\] The best estimate is <b>15 metres</b>.",{});},
  function(){return mcq("A student is about 1.8 metres tall. A tree is about 4 student heights tall. Estimate the height of the tree, in metres.",
    "7.2",["3.6","5.4","10.8"],
    "Use the student height as the referent and multiply: \\[ 4 \\times 1.8 = 7.2 \\] The best estimate is <b>7.2 metres</b>.",{});},
  function(){return mcq("A thumb width is about 2 centimetres. A phone is about 7 thumb widths wide. Estimate the width of the phone, in centimetres.",
    "14",["7","9","28"],
    "Use the thumb width as the referent and multiply the count by its width: \\[ 7 \\times 2 = 14 \\] The best estimate is <b>14 centimetres</b>.",{});},
  function(){return mcq("A car is about 4 metres long. A bus is about 3 car lengths long. Estimate the length of the bus, in metres.",
    "12",["7","8","24"],
    "Use the car as the referent and multiply the count by its length: \\[ 3 \\times 4 = 12 \\] The best estimate is <b>12 metres</b>.",{});},
  function(){return mcq("A floor tile is about 30 centimetres wide. A kitchen floor is about 12 tiles wide. Estimate the width of the floor, in centimetres.",
    "360",["42","180","720"],
    "Use the tile as the referent and multiply the count by its width: \\[ 12 \\times 30 = 360 \\] The best estimate is <b>360 centimetres</b>.",{});},
  function(){return mcq("A doorway is about 2 metres high. A school building is about 5 doorway heights tall. Estimate the height of the building, in metres.",
    "10",["7","15","25"],
    "Use the doorway as the referent and multiply the count by its height: \\[ 5 \\times 2 = 10 \\] The best estimate is <b>10 metres</b>.",{});}
]));

/* 8. Justify the choice of unit in a problem context */
E("u1-justify-unit",1,["5.13"],3,"var",varset([
  function(){return mcq("A town crew must record the length of a marathon course for a race permit. Which choice of unit is best justified?",
    "Kilometres, because the course is long and the count stays manageable",
    ["Millimetres, because the course is long and the count stays small","Centimetres, because the course is short and the count stays manageable","Metres only, because the course is short and no other unit can be used"],
    "A marathon course is tens of kilometres long, so kilometres keep the count manageable while still describing the full distance. The best justified choice is <b>kilometres, because the course is long and the count stays manageable</b>.",{});},
  function(){return mcq("A carpenter must record the thickness of a sheet of plywood for a cutting plan. Which choice of unit is best justified?",
    "Millimetres, because the sheet is thin and small units show the detail",
    ["Kilometres, because the sheet is thin and small units show the detail","Metres only, because the sheet is thick and large units show the detail","Centimetres, because the sheet is thin and no other unit can be used"],
    "Plywood thickness is a small measure, so millimetres give a whole number count that shows the detail a cutting plan needs. The best justified choice is <b>millimetres, because the sheet is thin and small units show the detail</b>.",{});},
  function(){return mcq("A nurse must record a student height for a health form. Which choice of unit is best justified?",
    "Centimetres, because a height is moderate and the count is easy to read",
    ["Kilometres, because a height is moderate and the count is easy to read","Millimetres, because a height is very large and the count is easy to read","Metres only, because a height is moderate and decimals are never allowed"],
    "A student height is a moderate measure, and centimetres give a whole number count that is easy to read and compare. The best justified choice is <b>centimetres, because a height is moderate and the count is easy to read</b>.",{});},
  function(){return mcq("A gardener must buy a hose that reaches across a backyard. Which choice of unit is best justified?",
    "Metres, because the yard is moderate and the count is easy to handle too",
    ["Millimetres, because the yard is moderate and the count is easy to handle","Kilometres, because the yard is very small and the count is easy to handle","Inches only, because the yard is moderate and no other unit can be used"],
    "A backyard reach is a moderate measure of some metres, so metres keep the count easy to handle when choosing a hose. The best justified choice is <b>metres, because the yard is moderate and the count is easy to handle</b>.",{});},
  function(){return mcq("A machinist must record the length of a small screw for a parts order. Which choice of unit is best justified?",
    "Millimetres, because the screw is tiny and small units show the detail",
    ["Centimetres, because the screw is tiny and small units show the detail","Metres only, because the screw is long and large units show the detail","Kilometres, because the screw is tiny and no other unit can be used"],
    "A screw length is a tiny measure, so millimetres give a whole number count that shows the detail a parts order needs. The best justified choice is <b>millimetres, because the screw is tiny and small units show the detail</b>.",{});},
  function(){return mcq("A coach must record the length of a running track for a meet schedule. Which choice of unit is best justified?",
    "Metres, because the track is moderate and the count is standard for races",
    ["Kilometres, because the track is moderate and the count is standard for races","Millimetres, because the track is very long and the count is standard for races","Centimetres, because the track is moderate and no other unit can be used"],
    "A track lap is a moderate measure, and metres are the standard unit for race distances, keeping the count familiar. The best justified choice is <b>metres, because the track is moderate and the count is standard for races</b>.",{});},
  function(){return mcq("A mover must record the width of a doorway to check whether a sofa fits. Which choice of unit is best justified?",
    "Centimetres, because the width is under a metre and detail still counts",
    ["Kilometres, because the width is under a metre and detail still matters","Metres only, because the width is very large and detail still matters","Millimetres, because the width is under a metre and no detail is needed"],
    "A doorway width is under a metre, and centimetres give a precise whole number count for checking a fit. The best justified choice is <b>centimetres, because the width is under a metre and detail still matters</b>.",{});},
  function(){return mcq("A driver must record the distance of a highway trip for a log book. Which choice of unit is best justified?",
    "Kilometres, because the trip is long and the count stays manageable",
    ["Centimetres, because the trip is long and the count stays manageable","Millimetres, because the trip is short and the count stays manageable","Metres only, because the trip is long and no other unit can be used"],
    "A highway trip is a long distance, so kilometres keep the count manageable in a log book. The best justified choice is <b>kilometres, because the trip is long and the count stays manageable</b>.",{});}
]));

/* 9. Linear measure with instruments, multiple choice with numeric options */
E("u1-linear-problem",1,["5.14"],1,"gen",function(){
  var mode=ri(1,5),ans,ds,prompt,sol,tries=0,v1,v2;
  do{
    tries++;
    if(mode===1){
      v1=ri(5,24); var C=u1r1(Math.PI*v1); ans=v1;
      ds=[fmt(v1/2),fmt(v1*2),fmt(v1+3)];
      prompt="A tape measure wrapped around a circular jar reads "+fmt(C)+" centimetres. The reading is the circumference of the jar. Determine the diameter of the jar, in centimetres.";
      sol="The diameter comes from the circumference formula: \\[ \\begin{aligned} d &= \\frac{C}{\\pi} \\\\ &= \\frac{"+fmt(C)+"}{\\pi} \\\\ &\\approx "+v1+" \\end{aligned} \\] So the diameter is <b>"+v1+" centimetres</b>.";
    }else if(mode===2){
      v1=ri(3,15); var C2=u1r1(2*Math.PI*v1); ans=v1;
      ds=[fmt(v1*2),fmt(v1/2),fmt(v1+4)];
      prompt="A tape measure wrapped around a tree trunk reads "+fmt(C2)+" centimetres. The reading is the circumference of the trunk. Determine the radius of the trunk, in centimetres.";
      sol="The radius comes from the circumference formula: \\[ \\begin{aligned} r &= \\frac{C}{2\\pi} \\\\ &= \\frac{"+fmt(C2)+"}{2\\pi} \\\\ &\\approx "+v1+" \\end{aligned} \\] So the radius is <b>"+v1+" centimetres</b>.";
    }else if(mode===3){
      v1=ri(3,20); v2=ri(3,15); ans=2*(v1+v2);
      ds=[fmt(v1+v2),fmt(v1*v2),fmt(2*v1+v2)];
      prompt="A tape measure gives the length of a rectangular garden as "+v1+" metres and the width as "+v2+" metres. Determine the perimeter of the garden, in metres.";
      sol="Add the length and width, then double: \\[ \\begin{aligned} P &= 2(l + w) \\\\ &= 2("+v1+" + "+v2+") \\\\ &= "+ans+" \\end{aligned} \\] So the perimeter is <b>"+ans+" metres</b>.";
    }else if(mode===4){
      v1=pick([10,20,25,50]); v2=pick([2,3,4,5]); var tot4=v1*v2/10; ans=v2/10;
      ds=[fmt(tot4),fmt(v2),fmt(v2/100)];
      prompt="A caliper measures a stack of "+v1+" identical sheets of card stock as "+fmt(tot4)+" millimetres thick in total. Determine the thickness of one sheet, in millimetres.";
      sol="Divide the total thickness by the number of sheets: \\[ \\begin{aligned} \\frac{"+fmt(tot4)+"}{"+v1+"} &= "+fmt(ans)+" \\end{aligned} \\] So one sheet is <b>"+fmt(ans)+" millimetres</b> thick.";
    }else{
      v1=ri(15,80); v2=ri(3,8); ans=v1*v2;
      ds=[fmt(v1+v2),fmt(v1*v2/2),fmt(v1*2)];
      prompt="A measuring tape shows that one roll of ribbon is "+v1+" centimetres long. Determine the total length of "+v2+" identical rolls, in centimetres.";
      sol="Multiply the length of one roll by the number of rolls: \\[ \\begin{aligned} "+v1+" \\times "+v2+" &= "+ans+" \\end{aligned} \\] So the total length is <b>"+ans+" centimetres</b>.";
    }
  }while(!u1setOk([fmt(ans)].concat(ds.map(function(x){return String(x);})))&&tries<80);
  var q=mcq(prompt,fmt(ans),balDp(fmt(ans),ds),sol,{mode:mode,v1:v1,v2:v2});
  if(mode===1)q.figure=u1figCirc(fmt(C)+" cm","d");
  else if(mode===2)q.figure=u1figCirc(fmt(C2)+" cm","r");
  else if(mode===3)q.figure=u1figRect(v1,v2,v1+" m",v2+" m");
  return q;
});

/* 10. Personal strategy for a hard-to-measure length */
E("u1-strategy",1,["5.15"],3,"var",varset([
  function(){return mcq("Which strategy best determines the circumference of a water bottle?",
    "Wrap a string around the bottle, mark it, then measure the string flat out",
    ["Measure straight across the bottle top, then report that as the distance","Wrap a string around the bottle, mark it, then weigh the string on a scale","Estimate the distance by eye, then report that as the measured distance"],
    "A string can follow the curve around the bottle. Marking where it meets and measuring it flat against a ruler turns the curve into a straight length. The best strategy is to <b>wrap a string around the bottle, mark it, then measure the string flat</b>.",{});},
  function(){return mcq("Which strategy best determines the length of a curved path on a map?",
    "Lay a thread along the curve, then straighten it and measure the thread",
    ["Draw a straight line between the ends, then measure that line on the map","Lay a thread along the curve, then count the colours printed on the map","Estimate the length by eye, then convert the guess using the map scale"],
    "A thread can follow the curve. Straightening it and measuring it gives the curve length, which the map scale then converts. The best strategy is to <b>lay a thread along the curve, then straighten it and measure the thread</b>.",{});},
  function(){return mcq("Which strategy best determines the perimeter of the base of an irregular planter?",
    "Wrap a tape around the base, mark the join, then read the full tape length",
    ["Measure the longest side of the base, then multiply that length by four","Wrap a tape around the base, mark the join, then read only half the length","Estimate each side by eye, then add the guesses and report the total sum"],
    "A flexible tape can follow the irregular base all the way around, so the full reading at the join is the perimeter. The best strategy is to <b>wrap a tape around the base, mark the join, then read the full tape length</b>.",{});},
  function(){return mcq("Which strategy best determines the diameter of a tree trunk too wide to measure across directly?",
    "Measure the circumference with a tape, then divide that measure by pi",
    ["Measure the circumference with a tape, then multiply that measure by pi","Measure the height of the trunk with a tape, then divide that by pi","Estimate the width by eye, then report that guess as the diameter"],
    "The tape gives the circumference, and diameter is circumference divided by pi. The best strategy is to <b>measure the circumference with a tape, then divide that measure by pi</b>.",{});},
  function(){return mcq("Which strategy best determines the length of a curved garden edge?",
    "Lay a rope along the edge, mark its ends, then measure the rope straight out",
    ["Measure the straight distance between the ends, then report it as the length","Lay a rope along the edge, mark its ends, then count the stones beside it","Estimate the length by pacing beside it, then report the pace count alone"],
    "A rope can follow the curve. Measuring the marked rope laid straight gives the length of the edge. The best strategy is to <b>lay a rope along the edge, mark its ends, then measure the rope straight</b>.",{});},
  function(){return mcq("Which strategy best determines the circumference of a round table top?",
    "Wrap a tape around the edge, mark the join, then read the full tape length",
    ["Measure straight across the centre, then report that as the distance around","Wrap a tape around the edge, mark the join, then read only a quarter length","Estimate the distance by eye, then report that as the measured distance"],
    "A flexible tape follows the round edge all the way around, so the full reading at the join is the circumference. The best strategy is to <b>wrap a tape around the edge, mark the join, then read the full tape length</b>.",{});},
  function(){return mcq("Which strategy best determines the length of a winding hallway on a floor plan?",
    "Trace the path with a string on the plan, then measure the string and scale",
    ["Draw a straight line between the doors, then measure that line and scale it","Trace the path with a string on the plan, then weigh the string and scale it","Estimate the length by eye on the plan, then report the guess as the length"],
    "A string can trace the winding path on the plan. Measuring it and applying the plan scale gives the real length. The best strategy is to <b>trace the path with a string on the plan, then measure the string and scale it</b>.",{});},
  function(){return mcq("Which strategy best determines the perimeter of an irregularly shaped sticker?",
    "Press a thread around the outline, mark it, then measure the thread flat",
    ["Measure the widest part of the sticker, then multiply that width by four","Press a thread around the outline, mark it, then measure only half of it","Estimate each part by eye, then add the guesses and report the total sum"],
    "A thread can follow the irregular outline. Marking the join and measuring the thread flat gives the perimeter. The best strategy is to <b>press a thread around the outline, mark it, then measure the thread flat</b>.",{});}
]));

/* 11. Surface area of a basic solid, one mode describes a net (5.1) */
E("u1-sa-basic",1,["5.1","5.2"],2,"gen",function(){
  var mode=ri(1,6);
  if(mode===1||mode===2){
    var r=ri(3,10),h=ri(5,15),ans=u1r1(2*Math.PI*r*(r+h));
    var prompt=mode===1?
      "A closed cylindrical paint can has radius "+r+" cm and height "+h+" cm. Determine its total surface area. Give your answer to the nearest tenth, in square centimetres.":
      "The net of a closed cylinder is a rectangle joined to two congruent circles. The circles have radius "+r+" cm, and the rectangle has height "+h+" cm and length equal to the circumference of a circle. Sketch the net in words and determine the total surface area of the cylinder. Give your answer to the nearest tenth, in square centimetres.";
    var q=numq(prompt,ans,0.11,
      "The surface area of a closed cylinder is the two circles plus the curved rectangle: \\[ \\begin{aligned} SA &= 2\\pi r^2 + 2\\pi r h \\\\ &= 2\\pi("+r+")^2 + 2\\pi("+r+")("+h+") \\\\ &\\approx "+fmt(ans)+" \\end{aligned} \\] So the surface area is <b>"+fmt(ans)+" square centimetres</b>.",{mode:mode,r:r,h:h});
    q.figure=u1figCyl(r,h,fmt(r)+" cm",fmt(h)+" cm");
    return q;
  }
  if(mode===3){
    var r3=ri(3,9),l3=r3+ri(2,7),ans3=u1r1(Math.PI*r3*(r3+l3));
    var q=numq("A solid cone ornament has radius "+r3+" cm and slant height "+l3+" cm. Determine its total surface area. Give your answer to the nearest tenth, in square centimetres.",ans3,0.11,
      "The surface area of a cone is the circular base plus the lateral area: \\[ \\begin{aligned} SA &= \\pi r^2 + \\pi r l \\\\ &= \\pi("+r3+")^2 + \\pi("+r3+")("+l3+") \\\\ &\\approx "+fmt(ans3)+" \\end{aligned} \\] So the surface area is <b>"+fmt(ans3)+" square centimetres</b>.",{mode:mode,r:r3,l:l3});
    q.figure=u1figCone(r3,Math.sqrt(Math.max(l3*l3-r3*r3,0.25)),{rLab:fmt(r3)+" cm",lLab:fmt(l3)+" cm"});
    return q;
  }
  if(mode===4||mode===5){
    var a=ri(3,12),b=ri(3,12),c=ri(3,12),ans4=2*(a*b+a*c+b*c);
    var prompt4=mode===4?
      "A closed rectangular storage box has length "+a+" cm, width "+b+" cm and height "+c+" cm. Determine its total surface area. Give your answer to the nearest tenth, in square centimetres.":
      "The net of a closed rectangular prism is six rectangles in three congruent pairs, with dimensions "+a+" cm by "+b+" cm, "+a+" cm by "+c+" cm, and "+b+" cm by "+c+" cm. Sketch the net in words and determine the total surface area of the prism. Give your answer to the nearest tenth, in square centimetres.";
    var q=numq(prompt4,ans4,0.11,
      "Add the areas of the three pairs of congruent faces: \\[ \\begin{aligned} SA &= 2(lw + lh + wh) \\\\ &= 2("+a+"\\times"+b+" + "+a+"\\times"+c+" + "+b+"\\times"+c+") \\\\ &= "+ans4+" \\end{aligned} \\] So the surface area is <b>"+fmt(ans4)+" square centimetres</b>.",{mode:mode,a:a,b:b,c:c});
    q.figure=u1figPrism(a,b,c,fmt(a)+" cm",fmt(b)+" cm",fmt(c)+" cm");
    return q;
  }
  var s=ri(4,12),l6=s+ri(2,8),ans6=s*s+2*s*l6;
  var q=numq("A square based pyramid paperweight has base side "+s+" cm and slant height "+l6+" cm. Determine its total surface area. Give your answer to the nearest tenth, in square centimetres.",ans6,0.11,
    "The surface area is the square base plus four congruent triangular faces: \\[ \\begin{aligned} SA &= s^2 + 2sl \\\\ &= "+s+"^2 + 2("+s+")("+l6+") \\\\ &= "+ans6+" \\end{aligned} \\] So the surface area is <b>"+fmt(ans6)+" square centimetres</b>.",{mode:mode,s:s,l:l6});
  q.figure=u1figPyr(s,Math.sqrt(Math.max(l6*l6-(s/2)*(s/2),0.25)),{sLab:fmt(s)+" cm",lLab:fmt(l6)+" cm"});
  return q;
});

/* 12. Unknown dimension from a surface area, one clean step */
E("u1-sa-unknown",1,["5.3"],2,"gen",function(){
  var mode=ri(1,4);
  if(mode===1){
    var r=ri(3,9),h=ri(4,14),SA=u1r1(2*Math.PI*r*(r+h));
    var q=numq("A closed cylinder has radius "+r+" cm and total surface area "+fmt(SA)+" square centimetres. Determine its height. Give your answer to the nearest tenth, in centimetres.",h,0.11,
      "Substitute into the surface area formula and solve for the height: \\[ \\begin{aligned} 2\\pi r(r + h) &= "+fmt(SA)+" \\\\ r + h &\\approx \\frac{"+fmt(SA)+"}{2\\pi("+r+")} \\\\ h &\\approx "+h+" \\end{aligned} \\] So the height is <b>"+h+" centimetres</b>.",{mode:mode,r:r});
    q.figure=u1figCyl(r,h,fmt(r)+" cm","?");
    return q;
  }
  if(mode===2){
    var w=ri(3,9),h2=ri(3,9),l=ri(4,14),SA2=2*(l*w+l*h2+w*h2);
    var q=numq("A closed rectangular box has width "+w+" cm, height "+h2+" cm and total surface area "+SA2+" square centimetres. Determine its length. Give your answer to the nearest tenth, in centimetres.",l,0.11,
      "Substitute into the surface area formula and solve for the length: \\[ \\begin{aligned} 2(lw + lh + wh) &= "+SA2+" \\\\ l("+w+" + "+h2+") &= "+(SA2/2-w*h2)+" \\\\ l &= "+l+" \\end{aligned} \\] So the length is <b>"+l+" centimetres</b>.",{mode:mode,w:w,h:h2});
    q.figure=u1figPrism(l,w,h2,"?",fmt(w)+" cm",fmt(h2)+" cm");
    return q;
  }
  if(mode===3){
    var l3=ri(6,14),r3=ri(3,8),LA=u1r1(Math.PI*r3*l3);
    if(r3>=l3){r3=l3-3;}
    LA=u1r1(Math.PI*r3*l3);
    var q=numq("The lateral surface area of a cone is "+fmt(LA)+" square centimetres and its slant height is "+l3+" cm. Determine its radius. Give your answer to the nearest tenth, in centimetres.",r3,0.11,
      "The lateral area is pi times radius times slant height, so divide: \\[ \\begin{aligned} r &= \\frac{LA}{\\pi l} \\\\ &\\approx \\frac{"+fmt(LA)+"}{\\pi("+l3+")} \\\\ &\\approx "+r3+" \\end{aligned} \\] So the radius is <b>"+r3+" centimetres</b>.",{mode:mode,l:l3});
    q.figure=u1figCone(r3,Math.sqrt(Math.max(l3*l3-r3*r3,0.25)),{rLab:"?",lLab:fmt(l3)+" cm"});
    return q;
  }
  var s=ri(4,12),l4=ri(5,14),SA4=s*s+2*s*l4;
  var q=numq("A square based pyramid has base side "+s+" cm and total surface area "+SA4+" square centimetres. Determine its slant height. Give your answer to the nearest tenth, in centimetres.",l4,0.11,
    "Subtract the base area, then divide by twice the base side: \\[ \\begin{aligned} 2sl &= "+SA4+" - "+s+"^2 \\\\ l &= \\frac{"+(SA4-s*s)+"}{2("+s+")} \\\\ &= "+l4+" \\end{aligned} \\] So the slant height is <b>"+l4+" centimetres</b>.",{mode:mode,s:s});
  q.figure=u1figPyr(s,Math.sqrt(Math.max(l4*l4-(s/2)*(s/2),0.25)),{sLab:fmt(s)+" cm",lLab:"?"});
  return q;
});

/* 13. Volume of a basic solid */
E("u1-vol-basic",1,["5.4"],2,"gen",function(){
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

/* 14. The one-third volume relation */
E("u1-vol-relation",1,["5.5"],1,"gen",function(){
  var mode=ri(1,4),small=ri(8,120),big=small*3,ans,ds,prompt,sol;
  if(mode===1){
    ans=small; ds=[fmt(big),fmt(big/2),fmt(big*3)];
    prompt="A right cylinder has volume "+big+" cubic centimetres. A right cone has the same base and the same height as the cylinder. Determine the volume of the cone, in cubic centimetres.";
    sol="A cone with the same base and height as a cylinder holds one third of the volume: \\[ \\begin{aligned} V &= \\frac{1}{3} \\times "+big+" \\\\ &= "+small+" \\end{aligned} \\] So the cone volume is <b>"+small+" cubic centimetres</b>.";
  }else if(mode===2){
    ans=big; ds=[fmt(small),fmt(small*2),fmt(u1r1(small/3))];
    prompt="A right cone has volume "+small+" cubic centimetres. A right cylinder has the same base and the same height as the cone. Determine the volume of the cylinder, in cubic centimetres.";
    sol="A cylinder holds three times the volume of a cone with the same base and height: \\[ \\begin{aligned} V &= 3 \\times "+small+" \\\\ &= "+big+" \\end{aligned} \\] So the cylinder volume is <b>"+big+" cubic centimetres</b>.";
  }else if(mode===3){
    ans=small; ds=[fmt(big),fmt(big/2),fmt(big*3)];
    prompt="A right prism has volume "+big+" cubic centimetres. A right pyramid has the same base and the same height as the prism. Determine the volume of the pyramid, in cubic centimetres.";
    sol="A pyramid with the same base and height as a prism holds one third of the volume: \\[ \\begin{aligned} V &= \\frac{1}{3} \\times "+big+" \\\\ &= "+small+" \\end{aligned} \\] So the pyramid volume is <b>"+small+" cubic centimetres</b>.";
  }else{
    ans=big; ds=[fmt(small),fmt(small*2),fmt(u1r1(small/3))];
    prompt="A right pyramid has volume "+small+" cubic centimetres. A right prism has the same base and the same height as the pyramid. Determine the volume of the prism, in cubic centimetres.";
    sol="A prism holds three times the volume of a pyramid with the same base and height: \\[ \\begin{aligned} V &= 3 \\times "+small+" \\\\ &= "+big+" \\end{aligned} \\] So the prism volume is <b>"+big+" cubic centimetres</b>.";
  }
  var q=mcq(prompt,fmt(ans),balDp(fmt(ans),ds),sol,{mode:mode,small:small});
  if(mode===1)q.figure=u1figPair("cyl","cone",fmt(big)+" cm³","?");
  else if(mode===2)q.figure=u1figPair("cone","cyl",fmt(small)+" cm³","?");
  else if(mode===3)q.figure=u1figPair("prism","pyr",fmt(big)+" cm³","?");
  else q.figure=u1figPair("pyr","prism",fmt(small)+" cm³","?");
  return q;
});

/* 15. Unknown dimension from a volume */
E("u1-vol-unknown",1,["5.6"],2,"gen",function(){
  var mode=ri(1,5);
  if(mode===1){
    var r=ri(3,9),h=ri(4,14),V=u1r1(Math.PI*r*r*h);
    var q=numq("A cylinder has radius "+r+" cm and volume "+fmt(V)+" cubic centimetres. Determine its height. Give your answer to the nearest tenth, in centimetres.",h,0.11,
      "Substitute the known values into \\(V = A_b \\times h\\), where the base area is \\(A_b = \\pi r^2\\), and solve for the height: \\[ \\begin{aligned} "+fmt(V)+" &= \\pi("+r+")^2 \\times h \\\\ h &\\approx \\frac{"+fmt(V)+"}{\\pi("+r+")^2} \\\\ &\\approx "+h+" \\end{aligned} \\] So the height is <b>"+h+" centimetres</b>.",{mode:mode,r:r});
    q.figure=u1figCyl(r,h,fmt(r)+" cm","?");
    return q;
  }
  if(mode===2){
    var r2=ri(3,10),h2=ri(4,12),V2=u1r1(Math.PI*r2*r2*h2);
    var q=numq("A cylinder has height "+h2+" cm and volume "+fmt(V2)+" cubic centimetres. Determine its radius. Give your answer to the nearest tenth, in centimetres.",r2,0.11,
      "Substitute the known values into the volume formula \\(V = \\pi r^2 h\\) and solve for the radius: \\[ \\begin{aligned} "+fmt(V2)+" &= \\pi r^2 \\times "+h2+" \\\\ r^2 &\\approx \\frac{"+fmt(V2)+"}{\\pi \\times "+h2+"} \\\\ r &\\approx "+r2+" \\end{aligned} \\] So the radius is <b>"+r2+" centimetres</b>.",{mode:mode,h:h2});
    q.figure=u1figCyl(r2,h2,"?",fmt(h2)+" cm");
    return q;
  }
  if(mode===3){
    var r3=ri(3,9),h3=ri(4,15),V3=u1r1(Math.PI*r3*r3*h3/3);
    var q=numq("A cone has radius "+r3+" cm and volume "+fmt(V3)+" cubic centimetres. Determine its height. Give your answer to the nearest tenth, in centimetres.",h3,0.11,
      "Substitute the known values into \\(V = \\frac{1}{3} A_b \\times h\\), where the base area is \\(A_b = \\pi r^2\\), and solve for the height: \\[ \\begin{aligned} "+fmt(V3)+" &= \\frac{1}{3} \\times \\pi("+r3+")^2 \\times h \\\\ h &\\approx \\frac{3 \\times "+fmt(V3)+"}{\\pi("+r3+")^2} \\\\ &\\approx "+h3+" \\end{aligned} \\] So the height is <b>"+h3+" centimetres</b>.",{mode:mode,r:r3});
    q.figure=u1figCone(r3,h3,{rLab:fmt(r3)+" cm",hLab:"?"});
    return q;
  }
  if(mode===4){
    var a=ri(3,10),b=ri(3,10),c=ri(3,12),V4=a*b*c;
    var q=numq("A rectangular box has length "+a+" cm, width "+b+" cm and volume "+V4+" cubic centimetres. Determine its height. Give your answer to the nearest tenth, in centimetres.",c,0.11,
      "First find the area of the base, \\(A_b = "+a+" \\times "+b+" = "+(a*b)+"\\). Substitute the known values into \\(V = A_b \\times h\\) and solve for the height: \\[ \\begin{aligned} "+V4+" &= "+(a*b)+" \\times h \\\\ h &= \\frac{"+V4+"}{"+(a*b)+"} = "+c+" \\end{aligned} \\] So the height is <b>"+c+" centimetres</b>.",{mode:mode,a:a,b:b});
    q.figure=u1figPrism(a,b,c,fmt(a)+" cm",fmt(b)+" cm","?");
    return q;
  }
  var s=ri(3,9),h5=ri(3,12),V5=s*s*h5/3;
  if(V5!==Math.floor(V5)){h5=h5*3; V5=s*s*h5/3;}
  var q=numq("A square based pyramid has base side "+s+" cm and volume "+fmt(V5)+" cubic centimetres. Determine its height. Give your answer to the nearest tenth, in centimetres.",h5,0.11,
    "First find the area of the base, \\(A_b = "+s+"^2 = "+(s*s)+"\\). Substitute the known values into \\(V = \\frac{1}{3} A_b \\times h\\) and solve for the height: \\[ \\begin{aligned} "+fmt(V5)+" &= \\frac{1}{3} \\times "+(s*s)+" \\times h \\\\ h &= \\frac{3 \\times "+fmt(V5)+"}{"+(s*s)+"} = "+h5+" \\end{aligned} \\] So the height is <b>"+h5+" centimetres</b>.",{mode:mode,s:s});
  q.figure=u1figPyr(s,h5,{sLab:fmt(s)+" cm",hLab:"?"});
  return q;
});

/* 16. Sphere surface area and volume, and radius from surface area */
E("u1-sphere",1,["5.7","5.8"],2,"gen",function(){
  var mode=ri(1,6),prof=pick([
    {name:"spherical garden ornament",lo:3,hi:12},
    {name:"globe",lo:10,hi:20},
    {name:"marble",lo:1,hi:3},
    {name:"spherical water tank",lo:8,hi:18},
    {name:"spherical exercise ball",lo:15,hi:35},
    {name:"beach ball",lo:12,hi:24}
  ]);
  var r=ri(prof.lo,prof.hi);
  if(mode===1){
    var ans=u1r1(4*Math.PI*r*r);
    var q=numq("A "+prof.name+" has radius "+r+" cm. Determine its surface area. Give your answer to the nearest tenth, in square centimetres.",ans,0.11,
      "The surface area of a sphere is four pi times radius squared: \\[ \\begin{aligned} SA &= 4\\pi r^2 \\\\ &= 4\\pi("+r+")^2 \\\\ &\\approx "+fmt(ans)+" \\end{aligned} \\] So the surface area is <b>"+fmt(ans)+" square centimetres</b>.",{mode:mode,r:r,prof:prof.name});
    q.figure=u1figSphere(fmt(r)+" cm",null);
    return q;
  }
  if(mode===2){
    var ans2=u1r1(4*Math.PI*r*r*r/3);
    var q=numq("A "+prof.name+" has radius "+r+" cm. Determine its volume. Give your answer to the nearest tenth, in cubic centimetres.",ans2,0.11,
      "The volume of a sphere is four thirds pi times radius cubed: \\[ \\begin{aligned} V &= \\frac{4}{3}\\pi r^3 \\\\ &= \\frac{4}{3}\\pi("+r+")^3 \\\\ &\\approx "+fmt(ans2)+" \\end{aligned} \\] So the volume is <b>"+fmt(ans2)+" cubic centimetres</b>.",{mode:mode,r:r,prof:prof.name});
    q.figure=u1figSphere(fmt(r)+" cm",null);
    return q;
  }
  if(mode===3){
    var d=r*2,ans3=u1r1(4*Math.PI*r*r);
    var q=numq("A "+prof.name+" has diameter "+d+" cm. Determine its surface area. Give your answer to the nearest tenth, in square centimetres.",ans3,0.11,
      "Halve the diameter to get the radius, then use the sphere formula: \\[ \\begin{aligned} r &= "+d+" \\div 2 = "+r+" \\\\ SA &= 4\\pi("+r+")^2 \\\\ &\\approx "+fmt(ans3)+" \\end{aligned} \\] So the surface area is <b>"+fmt(ans3)+" square centimetres</b>.",{mode:mode,r:r,prof:prof.name});
    q.figure=u1figSphere(null,fmt(d)+" cm");
    return q;
  }
  if(mode===4){
    var d4=r*2,ans4=u1r1(4*Math.PI*r*r*r/3);
    var q=numq("A "+prof.name+" has diameter "+d4+" cm. Determine its volume. Give your answer to the nearest tenth, in cubic centimetres.",ans4,0.11,
      "Halve the diameter to get the radius, then use the sphere formula: \\[ \\begin{aligned} r &= "+d4+" \\div 2 = "+r+" \\\\ V &= \\frac{4}{3}\\pi("+r+")^3 \\\\ &\\approx "+fmt(ans4)+" \\end{aligned} \\] So the volume is <b>"+fmt(ans4)+" cubic centimetres</b>.",{mode:mode,r:r,prof:prof.name});
    q.figure=u1figSphere(null,fmt(d4)+" cm");
    return q;
  }
  if(mode===5){
    var SA5=u1r1(4*Math.PI*r*r);
    var q=numq("A sphere has surface area "+fmt(SA5)+" square centimetres. Determine its radius. Give your answer to the nearest tenth, in centimetres.",r,0.11,
      "Substitute the known value into the surface area formula \\(SA = 4\\pi r^2\\) and solve for the radius: \\[ \\begin{aligned} "+fmt(SA5)+" &= 4\\pi r^2 \\\\ r^2 &\\approx \\frac{"+fmt(SA5)+"}{4\\pi} \\\\ r &\\approx "+r+" \\end{aligned} \\] So the radius is <b>"+r+" centimetres</b>.",{mode:mode,r:r,prof:prof.name});
    q.figure=u1figSphere("?",null);
    return q;
  }
  var SA6=u1r1(4*Math.PI*r*r);
  var q=numq("A sphere has surface area "+fmt(SA6)+" square centimetres. Determine its diameter. Give your answer to the nearest tenth, in centimetres.",r*2,0.11,
    "Substitute the known value into the surface area formula \\(SA = 4\\pi r^2\\) and solve for the radius, then double it: \\[ \\begin{aligned} "+fmt(SA6)+" &= 4\\pi r^2 \\\\ r^2 &\\approx \\frac{"+fmt(SA6)+"}{4\\pi} \\\\ r &\\approx "+r+" \\\\ d &= 2 \\times "+r+" = "+(r*2)+" \\end{aligned} \\] So the diameter is <b>"+(r*2)+" centimetres</b>.",{mode:mode,r:r,prof:prof.name});
  q.figure=u1figSphere(null,"?");
  return q;
});

/* 17. Composite volume, the decomposition is the decision */
E("u1-composite",1,["5.9"],3,"gen",function(){
  var mode=ri(1,4);
  if(mode===1){
    var r=ri(3,8),h=ri(6,14),ans=u1r1(Math.PI*r*r*h+2*Math.PI*r*r*r/3);
    var q=numq("A storage silo is a cylinder with a hemispherical top. The cylinder has radius "+r+" cm and height "+h+" cm, and the hemisphere has the same radius. Determine the total volume of the silo. Give your answer to the nearest tenth, in cubic centimetres.",ans,0.11,
      "Split the solid into a cylinder plus a hemisphere. First find the area of the base, then use it for the cylinder. The hemisphere is half a sphere, so its volume is half the volume of a full sphere: \\[ \\begin{aligned} A_b &= \\pi r^2 = \\pi("+r+")^2 \\\\ V_{\\text{cylinder}} &= A_b \\times h = \\pi("+r+")^2("+h+") \\\\ V_{\\text{hemisphere}} &= \\frac{1}{2} \\times \\frac{4}{3}\\pi("+r+")^3 \\\\ V &= V_{\\text{cylinder}} + V_{\\text{hemisphere}} \\\\ &\\approx "+fmt(ans)+" \\end{aligned} \\] So the total volume is <b>"+fmt(ans)+" cubic centimetres</b>.",{mode:mode,r:r,h:h});
    q.figure=u1figSilo(r,h,fmt(r)+" cm",fmt(h)+" cm");
    return q;
  }
  if(mode===2){
    var a=ri(4,10),b=ri(3,8),hp=ri(4,10),hq=ri(3,8),ans2=a*b*hp+(a*b*hq)/3;
    if(ans2!==Math.floor(ans2))hq=hq*3,ans2=a*b*hp+(a*b*hq)/3;
    var q=numq("A storage building is a rectangular prism with a pyramid roof. The prism has length "+a+" cm, width "+b+" cm and height "+hp+" cm. The pyramid has the same length and width as its base and height "+hq+" cm. Determine the total volume of the building. Give your answer to the nearest tenth, in cubic centimetres.",u1r1(ans2),0.11,
      "Split the solid into a prism plus a pyramid on the same base. First find the shared base area: \\[ \\begin{aligned} A_b &= l \\times w = "+a+" \\times "+b+" = "+(a*b)+" \\\\ V &= A_b \\times "+hp+" + \\frac{1}{3} A_b \\times "+hq+" \\\\ &= "+fmt(u1r1(ans2))+" \\end{aligned} \\] So the total volume is <b>"+fmt(u1r1(ans2))+" cubic centimetres</b>.",{mode:mode,a:a,b:b,hp:hp,hq:hq});
    q.figure=u1figHouse(a,b,hp,hq,{aLab:fmt(a)+" cm",bLab:fmt(b)+" cm",hpLab:fmt(hp)+" cm",hqLab:fmt(hq)+" cm"});
    return q;
  }
  if(mode===3){
    var r3=ri(3,8),H=ri(8,15),hc=pick([3,6]),ans3=u1r1(Math.PI*r3*r3*H-Math.PI*r3*r3*hc/3);
    var q=numq("A cylindrical block has radius "+r3+" cm and height "+H+" cm. A cone shaped hole with the same radius and height "+hc+" cm is removed from the block. Determine the volume that remains. Give your answer to the nearest tenth, in cubic centimetres.",ans3,0.11,
      "Subtract the removed cone from the full cylinder. Both parts share the same circular base, so find its area first: \\[ \\begin{aligned} A_b &= \\pi r^2 = \\pi("+r3+")^2 \\\\ V &= A_b \\times "+H+" - \\frac{1}{3} A_b \\times "+hc+" \\\\ &= \\pi("+r3+")^2("+H+") - \\frac{1}{3}\\pi("+r3+")^2("+hc+") \\\\ &\\approx "+fmt(ans3)+" \\end{aligned} \\] So the remaining volume is <b>"+fmt(ans3)+" cubic centimetres</b>.",{mode:mode,r:r3,H:H,hc:hc});
    q.figure=u1figBlock(r3,H,hc,fmt(r3)+" cm",fmt(H)+" cm",fmt(hc)+" cm");
    return q;
  }
  var r4=ri(3,7),h4=pick([6,9,12]),ans4=u1r1(Math.PI*r4*r4*h4/3+2*Math.PI*r4*r4*r4/3);
  var q=numq("A treat is a cone topped with a hemispherical scoop. The cone has radius "+r4+" cm and height "+h4+" cm, and the hemisphere has the same radius. Determine the total volume of the treat. Give your answer to the nearest tenth, in cubic centimetres.",ans4,0.11,
    "Split the solid into a cone plus a hemisphere. First find the area of the base, then use it for the cone. The hemisphere is half a sphere, so its volume is half the volume of a full sphere: \\[ \\begin{aligned} A_b &= \\pi r^2 = \\pi("+r4+")^2 \\\\ V_{\\text{cone}} &= \\frac{1}{3} A_b \\times h = \\frac{1}{3}\\pi("+r4+")^2("+h4+") \\\\ V_{\\text{hemisphere}} &= \\frac{1}{2} \\times \\frac{4}{3}\\pi("+r4+")^3 \\\\ V &= V_{\\text{cone}} + V_{\\text{hemisphere}} \\\\ &\\approx "+fmt(ans4)+" \\end{aligned} \\] So the total volume is <b>"+fmt(ans4)+" cubic centimetres</b>.",{mode:mode,r:r4,h:h4});
  q.figure=u1figTreat(r4,h4,fmt(r4)+" cm",fmt(h4)+" cm");
  return q;
});

/* 18. Read an instrument scale */
E("u1-read-instrument",1,["5.14"],1,"var",varset([
  function(){var q=mcq("On a centimetre ruler, the end of a ribbon lines up with the third millimetre tick after the 7 centimetre mark. Determine the length of the ribbon, in centimetres.",
    "7.3",["7.0","7.03","10.00"],
    "Each millimetre tick is 0.1 cm, so three ticks past 7 cm add 0.3 cm: \\[ 7 + 0.3 = 7.3 \\] The length is <b>7.3 centimetres</b>.",{}); q.figure=u1figRuler({min:0,max:8,major:1,minorPer:10,from:0,to:7.3,unit:"cm"}); return q;},
  function(){return mcq("A caliper scale reads 24 millimetres for the diameter of a bolt. Which reading, in centimetres, matches the caliper?",
    "2.4",["0.24","24.0","240.00"],
    "Divide millimetres by 10 to get centimetres: \\[ 24 \\div 10 = 2.4 \\] The matching reading is <b>2.4 centimetres</b>.",{});},
  function(){return mcq("On a tape measure, a board ends at the 1 metre mark plus 24 centimetres more. Determine the length of the board, in centimetres.",
    "124",["24","100","125"],
    "Change the metre to centimetres and add: \\[ 100 + 24 = 124 \\] The length is <b>124 centimetres</b>.",{});},
  function(){var q=mcq("On an inch ruler divided into quarter inches, the end of a card lines up with the second quarter tick after the 3 inch mark. Determine the length of the card, in inches.",
    "3.5",["3.25","3.75","5.0"],
    "Two quarter ticks make one half inch past the 3 inch mark: \\[ 3 + 0.5 = 3.5 \\] The length is <b>3.5 inches</b>.",{}); q.figure=u1figRuler({min:0,max:5,major:1,minorPer:4,from:0,to:3.5,unit:"in"}); return q;},
  function(){return mcq("A length is given as 68 millimetres. Which caliper reading, in centimetres, shows the same length?",
    "6.8",["0.68","68.0","680.00"],
    "Divide millimetres by 10 to get centimetres: \\[ 68 \\div 10 = 6.8 \\] The matching reading is <b>6.8 centimetres</b>.",{});},
  function(){var q=mcq("On a metre stick, the end of a cord lines up with the 47 centimetre mark. Determine the length of the cord, in metres.",
    "0.47",["0.047","4.70","47.000"],
    "Divide centimetres by 100 to get metres: \\[ 47 \\div 100 = 0.47 \\] The length is <b>0.47 metres</b>.",{}); q.figure=u1figRuler({min:0,max:100,major:10,minorPer:10,from:0,to:47,unit:"cm"}); return q;},
  function(){return mcq("A caliper scale reads 12.5 millimetres for the thickness of a washer. Determine the thickness, in millimetres.",
    "12.5",["1.25","12.0","125.00"],
    "The scale already reads in millimetres, so the reading is taken directly. The thickness is <b>12.5 millimetres</b>.",{});},
  function(){var q=mcq("A strip of paper starts at the 2 centimetre mark of a ruler and ends at the 9 centimetre mark. Determine the length of the strip, in centimetres.",
    "7",["9","11","18"],
    "Subtract the starting mark from the ending mark, since the strip does not start at zero: \\[ 9 - 2 = 7 \\] The length is <b>7 centimetres</b>.",{}); q.figure=u1figRuler({min:0,max:10,major:1,minorPer:10,from:2,to:9,unit:"cm"}); return q;},
  function(){var q=mcq("A ribbon starts at the 1 inch mark of a ruler and ends at the 4.5 inch mark. Determine the length of the ribbon, in inches.",
    "3.5",["4.5","5.0","5.5"],
    "Subtract the starting mark from the ending mark, since the ribbon does not start at zero: \\[ 4.5 - 1 = 3.5 \\] The length is <b>3.5 inches</b>.",{}); q.figure=u1figRuler({min:0,max:6,major:1,minorPer:4,from:1,to:4.5,unit:"in"}); return q;},
  function(){var q=mcq("On a centimetre ruler, a screw lines up from the 0 mark to the sixth millimetre tick after the 4 centimetre mark. Determine the length of the screw, in centimetres.",
    "4.6",["4.06","5.0","10.00"],
    "Each millimetre tick is 0.1 cm, so six ticks past 4 cm add 0.6 cm: \\[ 4 + 0.6 = 4.6 \\] The length is <b>4.6 centimetres</b>.",{}); q.figure=u1figRuler({min:0,max:6,major:1,minorPer:10,from:0,to:4.6,unit:"cm"}); return q;}
]));

/* 19. Composite surface area, deciding which surfaces count */
E("u1-composite-sa",1,["5.9"],3,"gen",function(){
  var mode=ri(1,4);
  if(mode===1){
    var r=ri(3,8),h=ri(6,14),ans=u1r1(2*Math.PI*r*h+2*Math.PI*r*r);
    var q=numq("A silo is a cylinder with a hemispherical top. The cylinder has radius "+r+" cm and height "+h+" cm, and the hemisphere has the same radius. The silo sits on the ground and is painted on all outside surfaces except the bottom. Determine the area painted. Give your answer to the nearest tenth, in square centimetres.",ans,0.11,
      "Only the curved wall of the cylinder and the curved surface of the hemisphere are painted. The flat circle where they join is inside the silo, and the bottom is not painted: \\[ \\begin{aligned} SA &= 2\\pi r h + 2\\pi r^2 \\\\ &= 2\\pi("+r+")("+h+") + 2\\pi("+r+")^2 \\\\ &\\approx "+fmt(ans)+" \\end{aligned} \\] So the area painted is <b>"+fmt(ans)+" square centimetres</b>.",{mode:mode,r:r,h:h});
    q.figure=u1figSilo(r,h,fmt(r)+" cm",fmt(h)+" cm");
    return q;
  }
  if(mode===2){
    var s=ri(4,10),hp=ri(3,9),l=ri(5,12),ans2=s*s+4*s*hp+2*s*l;
    var q=numq("A solid ornament is a square prism with a square pyramid on top. The prism has base side "+s+" cm and height "+hp+" cm. The pyramid has the same base side and slant height "+l+" cm. Determine the total surface area of the solid. Give your answer to the nearest tenth, in square centimetres.",ans2,0.11,
      "Count the bottom and the four walls of the prism plus the four triangular faces of the pyramid. The top face of the prism is covered by the pyramid, and the base of the pyramid is inside the solid, so neither is counted: \\[ \\begin{aligned} SA &= s^2 + 4sh + 2sl \\\\ &= "+s+"^2 + 4("+s+")("+hp+") + 2("+s+")("+l+") \\\\ &= "+ans2+" \\end{aligned} \\] So the total surface area is <b>"+ans2+" square centimetres</b>.",{mode:mode,s:s,hp:hp,l:l});
    q.figure=u1figHouse(s,s,hp,Math.sqrt(Math.max(l*l-(s/2)*(s/2),0.25)),{aLab:fmt(s)+" cm",hpLab:fmt(hp)+" cm",lLab:fmt(l)+" cm"});
    return q;
  }
  if(mode===3){
    var r3=ri(3,9),h3=ri(5,13),ans3=u1r1(Math.PI*r3*r3+2*Math.PI*r3*h3);
    var q=numq("An open top cylindrical bin has radius "+r3+" cm and height "+h3+" cm. Sheet metal is used for the bottom and the curved side only. Determine the area of sheet metal used. Give your answer to the nearest tenth, in square centimetres.",ans3,0.11,
      "Count the circular bottom plus the curved side. There is no lid, so no top circle is counted: \\[ \\begin{aligned} SA &= \\pi r^2 + 2\\pi r h \\\\ &= \\pi("+r3+")^2 + 2\\pi("+r3+")("+h3+") \\\\ &\\approx "+fmt(ans3)+" \\end{aligned} \\] So the area used is <b>"+fmt(ans3)+" square centimetres</b>.",{mode:mode,r:r3,h:h3});
    q.figure=u1figCyl(r3,h3,fmt(r3)+" cm",fmt(h3)+" cm");
    return q;
  }
  var r4=ri(3,8),h4=ri(5,12),l4=r4+ri(3,7),ans4=u1r1(Math.PI*r4*r4+2*Math.PI*r4*h4+Math.PI*r4*l4);
  var q=numq("A solid tower ornament is a cylinder with a cone roof on top. The cylinder has radius "+r4+" cm and height "+h4+" cm. The cone has the same radius and slant height "+l4+" cm. Determine the total surface area of the solid. Give your answer to the nearest tenth, in square centimetres.",ans4,0.11,
    "Count the bottom circle and curved wall of the cylinder plus the lateral area of the cone. The top circle of the cylinder is covered by the cone, and the base of the cone is inside the solid, so neither is counted: \\[ \\begin{aligned} SA &= \\pi r^2 + 2\\pi r h + \\pi r l \\\\ &= \\pi("+r4+")^2 + 2\\pi("+r4+")("+h4+") + \\pi("+r4+")("+l4+") \\\\ &\\approx "+fmt(ans4)+" \\end{aligned} \\] So the total surface area is <b>"+fmt(ans4)+" square centimetres</b>.",{mode:mode,r:r4,h:h4,l:l4});
  q.figure=u1figTower(r4,h4,l4,fmt(r4)+" cm",fmt(h4)+" cm",fmt(l4)+" cm");
  return q;
});

/* ----- bank-u2.js ----- */
// Math 1201 Unit 2 Roots and Powers question bank
// Cut verbatim from the standalone bank source
// (math-1201-review/bank-src.js, lines 630 to 1441).
// CRMARKS: u2-gcf-lcm=2
// CRMARKS: u2-gcf-lcm-problem=3
// CRMARKS: u2-radical-mixed=2
// CRMARKS: u2-laws-integral=3
// CRMARKS: u2-laws-rational=2
// CRMARKS: u2-evaluate-exp=2
// CRMARKS: u2-error=2
// CRMARKS: u2-problem=3
/* Math 1201 Review, Unit 2: Roots and Powers (tranche 1).
   All scenarios and numbers are original to this bank; sources gave types only.
   Helper prefix: u2. Every entry returns the same question type on every draw. */

/* ================= u2 helpers ================= */
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

/* ================= 1. prime factorization (1.12, L1) ================= */
E("u2-prime-factor",2,["1.12"],1,"gen",function(){
  var n=ri(24,600),t=0;
  while((u2isPrime(n)||n<24)&&t<200){n=ri(24,600);t++;}
  var mode=ri(1,3),fm=u2facMap(n),list=u2facList(n);
  var primes=Object.keys(fm).map(Number);
  var expanded=list.join(" \\times ");
  var solSteps="Divide out prime factors one at a time until the quotient is \\(1\\). This gives \\["+
    "\\begin{aligned} "+n+" &= "+expanded+" \\\\ &= "+u2facStr(n)+" \\end{aligned} \\]";
  if(mode===1){
    var correct="\\("+u2facStr(n)+"\\)";
    var m1=u2cloneMap(fm);m1[primes[0]]=m1[primes[0]]+1;
    var m2=u2cloneMap(fm);var lp=primes[primes.length-1];
    if(m2[lp]>1){m2[lp]=m2[lp]-1;}else{delete m2[lp];m2[u2nextPrime(lp)]=1;}
    if(Object.keys(m2).length===0){m2[2]=1;m2[3]=1;}
    var m3=u2cloneMap(fm);var sp=primes[0];if(m3[sp]>1){m3[sp]=m3[sp]-1;}else{delete m3[sp];}
    var np=u2nextPrime(sp);m3[np]=(m3[np]||0)+1;
    var ds=u2pickS3(correct,["\\("+u2mapStr(m1)+"\\)","\\("+u2mapStr(m2)+"\\)","\\("+u2mapStr(m3)+"\\)",
      "\\("+u2mapStr(m1).replace(/ \\times /," \\times ")+"\\)"]);
    return mcq("What is the <b>prime factorization</b> of \\("+n+"\\)?",
      correct,ds,
      solSteps+" The prime factorization is <b>\\("+u2facStr(n)+"\\)</b>.",
      {n:n,mode:mode});
  }
  if(mode===2){
    var correct2="\\("+expanded+"\\)";
    var l1=list.slice();l1.splice(0,2,""+(list[0]*list[1]));
    var l2=list.slice(0,list.length-1);
    var l3=list.slice();l3[l3.length-1]=u2nextPrime(list[list.length-1]);
    var ds2=u2pickS3(correct2,["\\("+l1.join(" \\times ")+"\\)","\\("+l2.join(" \\times ")+"\\)","\\("+l3.join(" \\times ")+"\\)"]);
    return mcq("Which product of primes is equal to \\("+n+"\\)?",
      correct2,ds2,
      solSteps+" Written as a product of primes with no exponents, the value is <b>\\("+expanded+"\\)</b>. Each factor in the product must be prime, and no factor may be dropped or changed.",
      {n:n,mode:mode});
  }
  var correct3="\\(\\{"+list.join(", ")+"\\}\\)";
  var l1b=list.slice();l1b.splice(0,2,""+(list[0]*list[1]));
  var l2b=list.slice(0,list.length-1);
  var l3b=list.slice();l3b.push(list[0]);
  var ds3=u2pickS3(correct3,["\\(\\{"+l1b.join(", ")+"\\}\\)","\\(\\{"+l2b.join(", ")+"\\}\\)","\\(\\{"+l3b.join(", ")+"\\}\\)"]);
  return mcq("Which list gives <b>all</b> the prime factors of \\("+n+"\\), with repetition?",
    correct3,ds3,
    solSteps+" Listing each prime as many times as it occurs gives <b>\\(\\{"+list.join(", ")+"\\}\\)</b>.",
    {n:n,mode:mode});
});

/* ================= 2. why 0 and 1 have no prime factors (1.13, L1, var) ================= */
E("u2-zero-one",2,["1.13"],1,"var",varset([
  function(){var key="Its only positive divisor is \\(1\\), and \\(1\\) is not a prime number, so it has no prime divisor";
    return mcq("Why does the number \\(1\\) have no prime factors?",
    key,
    ["It is an odd number, and prime factors are only ever listed for numbers that are even",
     "It has too many divisors to list them all, so its prime factors are left out of the list entirely",
     "It is a perfect square, and perfect squares are not broken into prime factors at all"],
    "A prime factor of a number is a divisor of that number which is itself prime. The only positive divisor of \\(1\\) is \\(1\\), and \\(1\\) is not prime, because a prime has exactly two positive divisors. So \\(1\\) has <b>no prime factors</b>: its only divisor is not prime.",
    {stmt:true,keyText:key});},
  function(){var key="Every prime divides \\(0\\), and a product of primes is never \\(0\\), so no fixed set of primes builds \\(0\\)";
    return mcq("Why does the number \\(0\\) have no prime factors?",
    key,
    ["Zero is an even number, and even numbers take their prime factors from the number that is exactly half as big as it is",
     "Zero has no divisors at all, and a number without any divisors cannot have prime factors in a list",
     "Zero is less than every prime, and numbers below the smallest prime are given no prime factors"],
    "For any prime \\(p\\), \\(0 = p \\times 0\\), so every prime divides \\(0\\); there is no single set of prime divisors to name. Also, a product of primes is at least \\(2\\), never \\(0\\). So \\(0\\) has <b>no prime factors</b> and no prime factorization.",
    {stmt:true,keyText:key});},
  function(){var key="A prime factorization uses only prime numbers, and \\(1\\) is not a prime number";
    return mcq("A student writes: the prime factorization of \\(1\\) is \\(1\\). Which statement explains the mistake?",
    key,
    ["A prime factorization uses only even numbers, and \\(1\\) is an odd number here",
     "A prime factorization must start with \\(2\\), and this one starts with the number \\(1\\)",
     "A prime factorization must have two factors, and this one has only one factor"],
    "A prime factorization is a product in which every factor is prime. The number \\(1\\) is neither prime nor composite: it has only one positive divisor, while a prime has exactly two. So writing \\(1\\) on its own is <b>not a prime factorization</b>, because \\(1\\) is not prime.",
    {stmt:true,keyText:key});},
  function(){var key="\\(1\\) is not prime, and \\(0\\) cannot be built as a product of primes, so neither has prime factors";
    return mcq("Which statement correctly explains why \\(0\\) and \\(1\\) do not appear in prime factorizations?",
    key,
    ["\\(1\\) is too small to divide anything at all, and \\(0\\) is too small to be divided by prime numbers",
     "\\(0\\) and \\(1\\) are both even numbers, and even numbers are described without prime factors",
     "\\(0\\) and \\(1\\) have prime factors, but the factors are hidden and are never written down"],
    "The number \\(1\\) is not prime, so it cannot serve as a prime factor or be built from primes. A product of primes is always at least \\(2\\), so it can never equal \\(0\\), and every prime divides \\(0\\) anyway. So <b>neither \\(0\\) nor \\(1\\) has prime factors</b>.",
    {stmt:true,keyText:key});}
]));

/* ================= 3. perfect squares and cubes, roots (1.8, 1.9, 1.10, L1) ================= */
E("u2-perfect",2,["1.8","1.9","1.10"],1,"gen",function(){
  var mode=ri(1,3);
  if(mode===1){
    var cat=pick([1,2,3,4,4]),n,ansText;
    if(cat===1){var r=ri(3,35);n=r*r;var t=0;while((u2isCu(n)||!u2isSq(n))&&t<100){r=ri(3,35);n=r*r;t++;}ansText="Perfect square only";}
    else if(cat===2){var r2=ri(2,12);n=r2*r2*r2;var t2=0;while((u2isSq(n)||!u2isCu(n))&&t2<100){r2=ri(2,12);n=r2*r2*r2;t2++;}ansText="Perfect cube only";}
    else if(cat===3){n=pick([64,729,4096,15625,46656]);ansText="Both a perfect square and a perfect cube";}
    else{n=ri(10,2000);var t3=0;while((u2isSq(n)||u2isCu(n))&&t3<200){n=ri(10,2000);t3++;}ansText="Neither a perfect square nor a perfect cube";}
    var sqR=Math.round(Math.sqrt(n)),cuR=Math.round(Math.cbrt(n));
    var sol="Check both roots. The square root of \\("+n+"\\) is "+(u2isSq(n)?"exactly \\("+sqR+"\\), since \\("+sqR+"^2 = "+n+"\\)":"not a whole number, since \\("+sqR+"^2 = "+(sqR*sqR)+"\\) and \\("+(sqR+1)+"^2 = "+((sqR+1)*(sqR+1))+"\\) bracket it")+
      ". The cube root of \\("+n+"\\) is "+(u2isCu(n)?"exactly \\("+cuR+"\\), since \\("+cuR+"^3 = "+n+"\\)":"not a whole number, since \\("+cuR+"^3 = "+(cuR*cuR*cuR)+"\\) and \\("+(cuR+1)+"^3 = "+((cuR+1)*(cuR+1)*(cuR+1))+"\\) bracket it")+
      ". So \\("+n+"\\) is classified as: <b>"+ansText.toLowerCase()+"</b>.";
    return mcq("How is the number \\("+n+"\\) best classified?",
      ansText,
      ["Perfect square only","Perfect cube only","Both a perfect square and a perfect cube","Neither a perfect square nor a perfect cube"].filter(function(s){return s!==ansText;}),
      sol,{mode:mode,n:n,ansText:ansText});
  }
  if(mode===2){
    var r3=ri(4,40),n3=r3*r3;
    var ds=u2pickD3(r3,[r3-1,r3+1,r3+2,r3-2,2*r3]).map(function(v){return "\\("+v+"\\)";});
    return mcq("What is \\(\\sqrt{"+n3+"}\\)?",
      "\\("+r3+"\\)",ds,
      "Find the whole number that multiplies by itself to give \\("+n3+"\\): \\["+
      "\\begin{aligned} "+r3+" \\times "+r3+" &= "+n3+" \\\\ \\sqrt{"+n3+"} &= "+r3+" \\end{aligned} \\]"+
      " The square root is <b>\\("+r3+"\\)</b>.",
      {mode:mode,n:n3,ansVal:r3});
  }
  var r4=ri(3,15),n4=r4*r4*r4;
  var ds4=u2pickD3(r4,[r4-1,r4+1,r4+2,r4-2,2*r4]).map(function(v){return "\\("+v+"\\)";});
  return mcq("What is \\(\\sqrt[3]{"+n4+"}\\)?",
    "\\("+r4+"\\)",ds4,
    "Find the whole number that multiplies by itself three times to give \\("+n4+"\\): \\["+
    "\\begin{aligned} "+r4+" \\times "+r4+" \\times "+r4+" &= "+n4+" \\\\ \\sqrt[3]{"+n4+"} &= "+r4+" \\end{aligned} \\]"+
    " The cube root is <b>\\("+r4+"\\)</b>.",
    {mode:mode,n:n4,ansVal:r4});
});

/* ================= 4. index and radicand (1.1, L1) ================= */
E("u2-index",2,["1.1"],1,"gen",function(){
  var mode=ri(1,3);
  if(mode===3){
    var idx=pick([3,4,5]),base=ri(2,5),rad=Math.pow(base,idx);
    var radStr=u2radS(idx,rad);
    var key="Find a number that gives \\("+rad+"\\) when it is multiplied by itself \\("+idx+"\\) times";
    var d1="Find a number that gives \\("+rad+"\\) when it is multiplied by \\("+idx+"\\) exactly";
    var d2="Multiply the number \\("+rad+"\\) by itself \\("+idx+"\\) times and then report the complete result";
    var d3="Divide the number \\("+rad+"\\) into \\("+idx+"\\) equal groups and report the size";
    return mcq("In the radical \\("+radStr+"\\), what does the index tell you?",
      key,[d1,d2,d3],
      "The index of a radical tells how many equal factors of the radicand the root represents. Here the index is \\("+idx+"\\), so \\("+radStr+"\\) asks for a number which, used as a factor \\("+idx+"\\) times, gives \\("+rad+"\\): indeed \\("+base+"^"+idx+" = "+rad+"\\), so the root is \\("+base+"\\). The index tells you to <b>find a number that gives \\("+rad+"\\) when multiplied by itself \\("+idx+"\\) times</b>.",
      {mode:mode,idx:idx,rad:rad,stmt:true,keyText:key});
  }
  var idx2=ri(2,9),rad2=ri(10,999);
  var radStr2=u2radS(idx2,rad2);
  if(mode===1){
    var ds=u2pickD3(idx2,[idx2-1,idx2+1,idx2+2,2,3]).map(function(v){return "\\("+v+"\\)";});
    return mcq("What is the <b>index</b> of the radical \\("+radStr2+"\\)?",
      "\\("+idx2+"\\)",ds,
      "The index is the small number written in the notch of the radical sign"+(idx2===2?". When no index is written, the index is understood to be \\(2\\) (a square root)":", here \\("+idx2+"\\)")+". The number under the sign, \\("+rad2+"\\), is the radicand. The index is <b>\\("+idx2+"\\)</b>.",
      {mode:mode,idx:idx2,rad:rad2,ansVal:idx2});
  }
  var ds2=u2pickD3(rad2,[rad2-1,rad2+1,rad2+10,rad2-10,idx2]).map(function(v){return "\\("+v+"\\)";});
  return mcq("What is the <b>radicand</b> of the radical \\("+radStr2+"\\)?",
    "\\("+rad2+"\\)",ds2,
    "The radicand is the number under the radical sign, here \\("+rad2+"\\). The small number in the notch, \\("+idx2+"\\), is the index. The radicand is <b>\\("+rad2+"\\)</b>.",
    {mode:mode,idx:idx2,rad:rad2,ansVal:rad2});
});

/* ================= 5. GCF and LCM (1.14, L2) ================= */
E("u2-gcf-lcm",2,["1.14"],1,"gen",function(){
  var mode=ri(1,4),a,b,c,ans,kindWord,nums;
  if(mode===1){
    var g=ri(2,18),u=ri(2,9),v=ri(2,9),t=0;
    while(u2gcd(u,v)!==1&&t<100){u=ri(2,9);v=ri(2,9);t++;}
    a=g*u;b=g*v;ans=g;kindWord="greatest common factor";nums=[a,b];c=null;
  }else if(mode===2){
    var g2=ri(2,12),u2=ri(1,6),v2=ri(1,6),w2=ri(1,6),t2=0;
    while(u2gcd(u2gcd(u2,v2),w2)!==1&&t2<100){u2=ri(1,6);v2=ri(1,6);w2=ri(1,6);t2++;}
    a=g2*u2;b=g2*v2;c=g2*w2;ans=g2;kindWord="greatest common factor";nums=[a,b,c];
  }else if(mode===3){
    a=ri(4,40);b=ri(4,40);ans=u2lcm(a,b);kindWord="least common multiple";nums=[a,b];c=null;
  }else{
    a=ri(3,20);b=ri(3,20);c=ri(3,20);ans=u2lcm(u2lcm(a,b),c);kindWord="least common multiple";nums=[a,b,c];
  }
  var isGcf=(kindWord==="greatest common factor");
  var cand=isGcf?[ans+1,ans-1,2*ans,ans+2,nums[0],nums[1]]:[ans-nums[0],ans-nums[1],nums[0]*nums[1],ans+nums[0],u2gcd(a,b),ans+1];
  var ds=u2pickD3(ans,cand).map(function(v){return ""+v;});
  var facLines=nums.map(function(x){return x+" &= "+u2facStr(x);}).join(" \\\\ ");
  var reason=isGcf?
    "The answer is the largest value that divides evenly into "+(nums.length===3?"each of the three numbers":"both numbers")+". Matching the prime factorizations and keeping the shared primes at the lower exponent gives \\("+ans+"\\).":
    "The answer is the smallest value that "+(nums.length===3?"each of the three numbers":"both numbers")+" divides evenly into. Building it from the prime factorizations, keeping each prime at the higher exponent, gives \\("+ans+"\\).";
  return mcq("What is the <b>"+kindWord+"</b> of \\("+nums.join(", ")+"\\)?",
    ""+ans,ds,
    "Write each number as a product of primes: \\[ \\begin{aligned} "+facLines+" \\end{aligned} \\] "+reason+
    " The "+kindWord+" is <b>\\("+ans+"\\)</b>.",
    {mode:mode,a:a,b:b,c:c,ans:ans,isGcf:isGcf});
});

/* ================= 6. GCF / LCM problems (1.15, L2, num) ================= */
E("u2-gcf-lcm-problem",2,["1.15"],2,"gen",function(){
  var ctx=ri(1,3);
  if(ctx===1){
    var g=ri(6,30),u=ri(2,6),v=ri(2,6),t=0;
    while((u2gcd(u,v)!==1||u===v)&&t<100){u=ri(2,6);v=ri(2,6);t++;}
    var W=g*u,L=g*v;
    return numq("A rectangular floor measures \\("+W+"\\) cm by \\("+L+"\\) cm. It is to be covered exactly by the largest possible square tiles, with no cutting and no gaps. What is the side length, in centimetres, of one tile?",
      g,0.001,
      "The tile side must divide evenly into both \\("+W+"\\) and \\("+L+"\\), and it must be as large as possible, so this is a common divisor question. \\["+
      "\\begin{aligned} "+W+" &= "+u2facStr(W)+" \\\\ "+L+" &= "+u2facStr(L)+" \\end{aligned} \\]"+
      " The largest value dividing both is \\("+g+"\\). The side length is <b>\\("+g+"\\) cm</b>.",
      {ctx:ctx,W:W,L:L,ans:g,kind:"gcf"});
  }
  if(ctx===2){
    var a=ri(4,28),b=ri(4,28),t2=0;
    while((a===b||u2lcm(a,b)===Math.max(a,b))&&t2<100){a=ri(4,28);b=ri(4,28);t2++;}
    var ans=u2lcm(a,b);
    return numq("Two harbour ferries leave the same dock together at noon. One ferry then leaves every \\("+a+"\\) minutes and the other leaves every \\("+b+"\\) minutes. In how many minutes will the two ferries next leave the dock together?",
      ans,0.001,
      "The ferries leave together again at a time that is a multiple of both \\("+a+"\\) and \\("+b+"\\), and the first such time is the smallest common multiple. \\["+
      "\\begin{aligned} "+a+" &= "+u2facStr(a)+" \\\\ "+b+" &= "+u2facStr(b)+" \\end{aligned} \\]"+
      " The smallest value that both divide into is \\("+ans+"\\). They next leave together in <b>\\("+ans+"\\) minutes</b>.",
      {ctx:ctx,a:a,b:b,ans:ans,kind:"lcm"});
  }
  var g3=ri(4,20),p=ri(2,9),q=ri(2,9),t3=0;
  while(u2gcd(p,q)!==1&&t3<100){p=ri(2,9);q=ri(2,9);t3++;}
  var A=g3*p,B=g3*q;
  return numq("A caterer has \\("+A+"\\) apples and \\("+B+"\\) oranges. She packs identical baskets using all of the fruit, with the same number of apples in every basket and the same number of oranges in every basket. What is the greatest number of baskets she can pack?",
    g3,0.001,
    "The number of baskets must divide evenly into both \\("+A+"\\) and \\("+B+"\\), and she wants it as large as possible, so this is a common divisor question. \\["+
    "\\begin{aligned} "+A+" &= "+u2facStr(A)+" \\\\ "+B+" &= "+u2facStr(B)+" \\end{aligned} \\]"+
    " The largest value dividing both is \\("+g3+"\\). The greatest number of baskets is <b>\\("+g3+"\\)</b>.",
    {ctx:ctx,A:A,B:B,ans:g3,kind:"gcf"});
});

/* ================= 7. entire radical to mixed radical (1.16, L2) ================= */
E("u2-radical-mixed",2,["1.16"],1,"gen",function(){
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

/* ================= 8. mixed radical to entire radical (1.17, L2) ================= */
E("u2-radical-entire",2,["1.17"],1,"gen",function(){
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

/* ================= 9. rational exponents and radicals (1.3, L2) ================= */
E("u2-rational-exp",2,["1.3"],1,"gen",function(){
  var n=ri(2,6),m=ri(1,9),t=0;
  while((u2gcd(m,n)!==1||m===n)&&t<200){m=ri(1,9);n=ri(2,6);t++;}
  var b=ri(2,25),mode=ri(1,2);
  function radPow(bb,mm,nn){
    if(mm===1)return u2radS(nn,bb);
    if(nn===2)return "\\sqrt{"+bb+"^"+mm+"}";
    return "\\sqrt["+nn+"]{"+bb+"^"+mm+"}";
  }
  if(mode===1){
    var key="\\("+radPow(b,m,n)+"\\)";
    var cands=[];
    if(m>1)cands.push("\\("+u2radS(n,b)+"\\)");
    cands.push("\\("+radPow(b,m,n+1)+"\\)");
    cands.push("\\("+radPow(b,m+1,n)+"\\)");
    if(m>=2)cands.push("\\("+radPow(b,n,m)+"\\)");
    cands.push("\\("+radPow(b,1,n)+"\\)");
    cands.push("\\("+radPow(b,m,n+2)+"\\)");
    var ds=u2pickS3(key,cands);
    return mcq("Express \\("+b+"^{"+FR(m,n)+"}\\) as a radical.",
      key,ds,
      "In a rational exponent, the denominator is the index of the root and the numerator is the power: \\["+
      "\\begin{aligned} "+b+"^{"+FR(m,n)+"} &= \\left("+u2radS(n,b)+"\\right)^"+m+" \\\\ &= "+radPow(b,m,n)+" \\end{aligned} \\]"+
      " As a radical, the expression is <b>\\("+radPow(b,m,n)+"\\)</b>.",
      {mode:mode,b:b,m:m,n:n,keyStr:key});
  }
  var key2="\\("+b+"^{"+FR(m,n)+"}\\)";
  var cands2=["\\("+b+"^{"+FR(n,m)+"}\\)","\\("+b+"^{"+FR(m+1,n)+"}\\)","\\("+b+"^{"+FR(m,n+1)+"}\\)","\\("+b+"^{"+(m*n)+"}\\)","\\("+b+"^{"+FR(m+2,n)+"}\\)"];
  if(m===1)cands2=cands2.filter(function(s){return s!==key2;});
  var ds2=u2pickS3(key2,cands2);
  return mcq("Express \\("+radPow(b,m,n)+"\\) as a power with a rational exponent.",
    key2,ds2,
    "The index of the root becomes the denominator of the exponent and the power on the radicand becomes the numerator: \\["+
    "\\begin{aligned} "+radPow(b,m,n)+" &= \\left("+b+"^"+m+"\\right)^{"+FR(1,n)+"} \\\\ &= "+b+"^{"+FR(m,n)+"} \\end{aligned} \\]"+
    " As a power, the expression is <b>\\("+b+"^{"+FR(m,n)+"}\\)</b>.",
    {mode:mode,b:b,m:m,n:n,keyStr:key2});
});

/* ================= 10. negative exponents (1.5, L2, num) ================= */
E("u2-negative-exp",2,["1.5"],1,"gen",function(){
  var mode=ri(1,4);
  var pattern="The pattern behind negative exponents comes from dividing by the base at each step: as the exponent drops by \\(1\\), the value is divided by the base. Continuing the pattern past zero gives reciprocals, so \\(a^{-n} = "+FR(1,"a^n")+"\\) for \\(a \\ne 0\\). ";
  if(mode===1){
    var a=ri(2,30),n=pick([2,2,3,3,4]);if(n===4)a=ri(2,12);
    var ans=Math.pow(a,n);
    return numq("When \\("+a+"^{-"+n+"}\\) is written in the form \\("+FR(1,"k")+"\\), what is the value of \\(k\\)?",
      ans,0.001,
      pattern+"Here \\["+"\\begin{aligned} "+a+"^{-"+n+"} &= "+FR(1,a+"^"+n)+" \\\\ &= "+FR(1,ans)+" \\end{aligned} \\]"+
      " So the value of \\(k\\) is <b>\\("+ans+"\\)</b>.",
      {mode:mode,a:a,n:n,ans:ans});
  }
  if(mode===2){
    var a2=ri(2,15),n2=ri(2,3),ans2=Math.pow(a2,n2);
    return numq("Evaluate \\(\\left("+FR(1,a2)+"\\right)^{-"+n2+"}\\).",
      ans2,0.001,
      pattern+"A negative exponent on a fraction flips the fraction first: \\["+
      "\\begin{aligned} \\left("+FR(1,a2)+"\\right)^{-"+n2+"} &= "+a2+"^{"+n2+"} \\\\ &= "+ans2+" \\end{aligned} \\]"+
      " The value is <b>\\("+ans2+"\\)</b>.",
      {mode:mode,a:a2,n:n2,ans:ans2});
  }
  if(mode===3){
    var a3=pick([2,4,5,8,10,20,25]),n3=ri(1,3);
    var ans3=Math.round((1/Math.pow(a3,n3))*1e10)/1e10;
    return numq("Evaluate \\("+a3+"^{-"+n3+"}\\). Give the exact decimal value.",
      ans3,0.001,
      pattern+"Here \\["+"\\begin{aligned} "+a3+"^{-"+n3+"} &= "+FR(1,Math.pow(a3,n3))+" \\\\ &= "+ans3+" \\end{aligned} \\]"+
      " The value is <b>\\("+ans3+"\\)</b>.",
      {mode:mode,a:a3,n:n3,ans:ans3});
  }
  var a4=ri(2,30),n4=ri(2,12);
  return numq("When \\("+FR(1,a4+"^{"+n4+"}")+"\\) is written as a single power of \\("+a4+"\\), what is the exponent?",
    -n4,0.001,
    pattern+"The reciprocal \\("+FR(1,a4+"^{"+n4+"}")+"\\) is the power with the exponent negated: \\("+a4+"^{-"+n4+"}\\). The exponent is <b>\\(-"+n4+"\\)</b>.",
    {mode:mode,a:a4,n:n4,ans:-n4});
});

/* ================= 11. why a^(m/n) is a root then a power (1.2, L2, var) ================= */
E("u2-rational-pattern",2,["1.2"],2,"var",varset([
  function(){var key="The denominator \\(3\\) names the root and the numerator \\(2\\) names the power: \\(\\left(\\sqrt[3]{8}\\right)^2 = 2^2 = 4\\)";
    return mcq("Which explanation correctly shows why \\(8^{"+FR(2,3)+"}\\) equals \\(4\\)?",
    key,
    ["The numerator \\(2\\) names the root and the denominator \\(3\\) names the power: \\(\\left(\\sqrt{8}\\right)^3\\) is about \\(4\\)",
     "The fraction \\("+FR(2,3)+"\\) means divide \\(8\\) by \\(3\\) and then round the result up to the whole number \\(4\\)",
     "The exponent means multiply \\(8\\) by itself \\(2\\) times and then divide the answer \\(64\\) by the number \\(3\\)"],
    "Use the pattern from the exponent laws: \\(8^{"+FR(1,3)+"}\\) must satisfy \\(\\left(8^{"+FR(1,3)+"}\\right)^3 = 8\\), so \\(8^{"+FR(1,3)+"} = \\sqrt[3]{8} = 2\\). Raising to the numerator power gives \\(2^2 = 4\\). Numeric check: \\(\\left(\\sqrt[3]{8}\\right)^2 = 2^2 = 4\\), matching \\(8^{"+FR(2,3)+"}\\). The denominator names the root and the numerator names the power, giving <b>\\(4\\)</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Raising \\(a^{"+FR(1,"n")+"}\\) to the power \\(n\\) must give \\(a\\), so \\(a^{"+FR(1,"n")+"}\\) is the \\(n\\)th root of \\(a\\); raising that root to \\(m\\) gives the value";
    return mcq("A student asks why \\(a^{"+FR("m","n")+"} = \\left(\\sqrt[n]{a}\\right)^m\\). Which explanation uses the exponent laws correctly?",
    key,
    ["The fraction \\("+FR("m","n")+"\\) means the base \\(a\\) is multiplied by \\(m\\) and then divided by \\(n\\), and roots are just a shorter way to write that division",
     "The exponent laws say exponents in a fraction cancel out, so \\(a^{"+FR("m","n")+"}\\) is the same as \\(a\\), and the root form is only a different notation for \\(a\\)",
     "A root is defined as any fractional exponent, so the equality holds by definition and no exponent law is needed"],
    "By the power law, \\(\\left(a^{"+FR(1,"n")+"}\\right)^n = a^{"+FR(1,"n")+" \\times n} = a^1 = a\\). The only positive quantity raised to the power \\(n\\) that gives \\(a\\) is \\(\\sqrt[n]{a}\\), so \\(a^{"+FR(1,"n")+"} = \\sqrt[n]{a}\\). Then \\(a^{"+FR("m","n")+"} = \\left(a^{"+FR(1,"n")+"}\\right)^m = \\left(\\sqrt[n]{a}\\right)^m\\). Numeric check with \\(a = 27\\), \\(m = 2\\), \\(n = 3\\): \\(\\left(\\sqrt[3]{27}\\right)^2 = 3^2 = 9 = 27^{"+FR(2,3)+"}\\). The pattern is: <b>the \\(n\\)th root comes from the denominator, then raise to the numerator power</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Since \\(3^3 = 27\\), the cube root part gives \\(3\\), and the numerator power then gives \\(3^2 = 9\\), so both sides match";
    return mcq("Which statement best explains, using a pattern, why \\(27^{"+FR(2,3)+"}\\) equals \\(\\left(\\sqrt[3]{27}\\right)^2\\)?",
    key,
    ["Since \\(9^2 = 81\\), the square part gives \\(9\\), and the denominator root then adjusts the answer \\(81\\) back down to \\(9\\)",
     "Since \\(27\\) divided by \\(3\\) is \\(9\\), the denominator acts as a plain divisor in the calculation",
     "Since \\(2^3 = 8\\), the powers \\(2\\) and \\(3\\) trade places, and swapping them in any base gives the same value as the root form"],
    "Follow the denominator first: \\(27^{"+FR(1,3)+"} = \\sqrt[3]{27} = 3\\), because \\(3^3 = 27\\). The numerator then says to square: \\(3^2 = 9\\). So \\(27^{"+FR(2,3)+"} = \\left(\\sqrt[3]{27}\\right)^2 = 9\\), and the numeric check confirms the pattern: <b>root first from the denominator, then the numerator power, giving \\(9\\)</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The fourth root of \\(16\\) is \\(2\\), because \\(2^4 = 16\\), and cubing that root gives \\(2^3 = 8\\), which matches the power";
    return mcq("Which explanation correctly shows why \\(16^{"+FR(3,4)+"}\\) equals \\(8\\)?",
    key,
    ["The square root of \\(16\\) is \\(4\\), because \\(4^2 = 16\\), and raising that root to \\(4\\) gives a value near \\(8\\)",
     "The fraction \\("+FR(3,4)+"\\) of \\(16\\) is \\(12\\), and subtracting the denominator \\(4\\) from that part gives the stated answer \\(8\\)",
     "The cube of \\(16\\) is very large, and taking the fourth root of that cube brings the value back down close to the number \\(8\\)"],
    "The denominator \\(4\\) names a fourth root: \\(\\sqrt[4]{16} = 2\\) since \\(2^4 = 16\\). The numerator \\(3\\) then cubes it: \\(2^3 = 8\\). Numeric check: \\(\\left(\\sqrt[4]{16}\\right)^3 = 2^3 = 8 = 16^{"+FR(3,4)+"}\\). The value is <b>\\(8\\)</b>, from the root named by the denominator followed by the power named by the numerator.",
    {stmt:true,keyText:key});}
]));

/* ================= 12. exponent laws, integral exponents (1.6, L2) ================= */
E("u2-laws-integral",2,["1.6"],2,"gen",function(){
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

/* ================= 13. exponent laws, rational exponents (1.6, L2) ================= */
function u2expStr(base,n,d){
  var r=u2red(n,d);
  if(r[0]===0)return "\\(1\\)";
  if(r[1]===1){if(r[0]===1)return "\\("+base+"\\)";return "\\("+base+"^{"+r[0]+"}\\)";}
  return "\\("+base+"^{"+FR(r[0],r[1])+"}\\)";
}
E("u2-laws-rational",2,["1.6"],2,"gen",function(){
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

/* ================= 14. evaluate powers (1.6, 1.3, L2, num) ================= */
E("u2-evaluate-exp",2,["1.6","1.3"],1,"gen",function(){
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

/* ================= 15. error analysis (1.7, L3, var) ================= */
E("u2-error",2,["1.7"],3,"var",varset([
  function(){var key="The student added the exponents; a power raised to a power multiplies the exponents, so the correct simplification is \\(x^{12}\\)";
    return mcq("A student simplifies \\(\\left(x^3\\right)^4\\) and gets \\(x^7\\). Which statement identifies the error and gives the correct simplification?",
    key,
    ["The student multiplied the exponents; a power raised to a power adds the exponents, so the correct simplification is \\(x^7\\)",
     "The student added the exponents; a power raised to a power multiplies them, so the correct simplification is \\(x^{10}\\)",
     "There is no error in the work; adding exponents is the rule for a power of a power, and the correct simplification is \\(x^7\\), exactly as the student wrote"],
    "A power raised to a power keeps the base and multiplies the exponents: \\(\\left(x^3\\right)^4 = x^{3 \\times 4} = x^{12}\\). The student added \\(3 + 4\\) instead, which is the rule for multiplying powers with the same base. The error is <b>adding the exponents</b>, and the correct simplification is <b>\\(x^{12}\\)</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The student left the coefficient unchanged; the power applies to the whole base, so the correct simplification is \\(27x^6\\)";
    return mcq("A student simplifies \\(\\left(3x^2\\right)^3\\) and gets \\(3x^6\\). Which statement identifies the error and gives the correct simplification?",
    key,
    ["The student cubed the coefficient as well; the power applies only to the variable, so the correct simplification is \\(3x^6\\)",
     "The student left the coefficient unchanged; the power applies to the whole base, so the correct simplification is \\(9x^6\\)",
     "There is no error in the work; a coefficient is never raised to a power, and the correct simplification is \\(3x^6\\)"],
    "In \\(\\left(3x^2\\right)^3\\), the exponent \\(3\\) applies to every factor inside the brackets: \\(3^3 \\times \\left(x^2\\right)^3 = 27x^6\\). The student raised only the variable part to the power. The error is <b>leaving the coefficient unchanged</b>, and the correct simplification is <b>\\(27x^6\\)</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The student divided the exponents; dividing powers with the same base subtracts them, so the correct simplification is \\(x^3\\)";
    return mcq("A student simplifies \\("+FR("x^6","x^3")+"\\) and gets \\(x^2\\). Which statement identifies the error and gives the correct simplification?",
    key,
    ["The student subtracted the exponents; dividing powers with the same base divides them, so the correct simplification is \\(x^2\\)",
     "The student divided the exponents; dividing powers with the same base adds them, so the correct simplification is \\(x^9\\)",
     "There is no error in the work; exponents are divided in a quotient of powers, and the correct simplification is \\(x^2\\)"],
    "For a quotient of powers with the same base, subtract the exponents: \\("+FR("x^6","x^3")+" = x^{6 - 3} = x^3\\). The student divided \\(6\\) by \\(3\\) instead. The error is <b>dividing the exponents</b>, and the correct simplification is <b>\\(x^3\\)</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The student read the negative exponent as a negative answer; a negative exponent gives a reciprocal, so the correct value is \\("+FR(1,16)+"\\)";
    return mcq("A student evaluates \\(4^{-2}\\) and gets \\(-16\\). Which statement identifies the error and gives the correct simplification?",
    key,
    ["The student read the negative exponent as a negative answer; a negative exponent doubles the base, so the correct value is \\(32\\) for this power",
     "The student should have multiplied the base by the exponent; following that rule here, the correct value for the power is \\(-8\\)",
     "There is no error in the work; a negative exponent makes the value negative, and the correct value of the power is \\(-16\\)"],
    "A negative exponent means take the reciprocal, not a negative result: \\(4^{-2} = "+FR(1,"4^2")+" = "+FR(1,16)+"\\). The student treated the exponent as a sign on the answer and multiplied out \\(4^2\\) with a negative sign attached. The error is <b>reading the negative exponent as a negative answer</b>, and the correct value is <b>\\("+FR(1,16)+"\\)</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The student multiplied the exponents; multiplying powers with the same base adds them, so the correct simplification is \\(x^9\\)";
    return mcq("A student simplifies \\(x^5 \\times x^4\\) and gets \\(x^{20}\\). Which statement identifies the error and gives the correct simplification?",
    key,
    ["The student added the exponents; multiplying powers with the same base multiplies them, so the correct simplification is \\(x^{20}\\)",
     "The student multiplied the exponents; multiplying powers with the same base subtracts them, so the correct simplification is \\(x^1\\)",
     "There is no error in the work; exponents are multiplied in a product of powers, and the correct simplification is \\(x^{20}\\)"],
    "When multiplying powers with the same base, add the exponents: \\(x^5 \\times x^4 = x^{5 + 4} = x^9\\). The student multiplied \\(5 \\times 4\\), which is the rule for a power raised to a power. The error is <b>multiplying the exponents</b>, and the correct simplification is <b>\\(x^9\\)</b>.",
    {stmt:true,keyText:key});}
]));

/* ================= 16. problems with powers and radicals (1.4, L3, num) ================= */
E("u2-problem",2,["1.4"],3,"gen",function(){
  var mode=ri(1,5);
  if(mode===1||mode===5){
    var prof=pick([
      {thing:"bacteria culture",start:pick([3,5,6,9,12,15,18,20]),startUnit:"bacteria",unit:"bacteria",per:"hour",mult:2,verb:"doubles"},
      {thing:"patch of algae on a pond",start:pick([2,4,5,8,10,12,16,20]),startUnit:"square centimetres",unit:"square centimetres of algae",per:"day",mult:2,verb:"doubles"},
      {thing:"photo post",start:pick([5,10,15,20,25,30,40,50]),startUnit:"views",unit:"views",per:"day",mult:2,verb:"doubles"},
      {thing:"forwarded message chain",start:pick([2,3,4,5,6]),startUnit:"people",unit:"people reached",per:"round",mult:3,verb:"triples"},
      {thing:"yeast colony",start:pick([2,3,4,5,6,8]),startUnit:"cells",unit:"cells",per:"hour",mult:3,verb:"triples"}
    ]);
    var t=prof.mult===2?ri(3,8):ri(3,6);
    var ans=prof.start*Math.pow(prof.mult,t);
    return numq("A "+prof.thing+" starts at \\("+prof.start+"\\) "+prof.startUnit+". The amount "+prof.verb+" every "+prof.per+". What is the total after \\("+t+"\\) "+prof.per+"s? Give the number of "+prof.unit+".",
      ans,0.001,
      "Each "+prof.per+" multiplies the total by \\("+prof.mult+"\\), so after \\("+t+"\\) "+prof.per+"s the total is the starting amount times \\("+prof.mult+"\\) raised to the power \\("+t+"\\): \\["+
      "\\begin{aligned} \\text{total} &= "+prof.start+" \\times "+prof.mult+"^{"+t+"} \\\\ &= "+prof.start+" \\times "+Math.pow(prof.mult,t)+" \\\\ &= "+ans+" \\end{aligned} \\]"+
      " The total is <b>\\("+ans+"\\)</b> "+prof.unit+".",
      {mode:mode,start:prof.start,mult:prof.mult,t:t,ans:ans});
  }
  if(mode===2){
    var r=ri(4,60),A=r*r;
    return numq("A square patio has an area of \\("+A+"\\) square metres. What is the side length, in metres, of the patio?",
      r,0.001,
      "For a square, the area is the side length multiplied by itself. Substitute the known area into the area formula and solve: \\["+
      "\\begin{aligned} s^2 &= "+A+" \\\\ s &= \\sqrt{"+A+"} = "+r+" \\end{aligned} \\]"+
      " The side length is <b>\\("+r+"\\) m</b>.",
      {mode:mode,r:r,A:A,ans:r});
  }
  if(mode===3){
    var r3=ri(3,30),V=r3*r3*r3;
    return numq("A cube-shaped storage box has a volume of \\("+V+"\\) cubic centimetres. What is the edge length, in centimetres, of the box?",
      r3,0.001,
      "For a cube, the volume is the edge length used as a factor three times. Substitute the known volume into the volume formula and solve: \\["+
      "\\begin{aligned} s^3 &= "+V+" \\\\ s &= \\sqrt[3]{"+V+"} = "+r3+" \\end{aligned} \\]"+
      " The edge length is <b>\\("+r3+"\\) cm</b>.",
      {mode:mode,r:r3,V:V,ans:r3});
  }
  var folds=ri(4,9),th=pick([0.08,0.1,0.12]),ans4=Math.round(th*Math.pow(2,folds)*100)/100;
  return numq("A sheet of paper is \\("+th+"\\) mm thick. It is folded in half, then folded in half again, and so on, for a total of \\("+folds+"\\) folds. How thick, in millimetres, is the folded stack?",
    ans4,0.01,
    "Each fold doubles the thickness, so after \\("+folds+"\\) folds the thickness is the original thickness times \\(2\\) raised to the power \\("+folds+"\\): \\["+
    "\\begin{aligned} \\text{thickness} &= "+th+" \\times 2^{"+folds+"} \\\\ &= "+th+" \\times "+Math.pow(2,folds)+" \\\\ &= "+ans4+" \\end{aligned} \\]"+
    " The folded stack is <b>\\("+ans4+"\\) mm</b> thick.",
    {mode:mode,folds:folds,th:th,ans:ans4});
});

/* ================= 17. sorting rational and irrational numbers (1.18, L2) ================= */
E("u2-sort-numbers",2,["1.18"],1,"gen",function(){
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

/* ================= 18. subsets of the real numbers (1.19, L2, var) ================= */
E("u2-subsets",2,["1.19"],1,"var",varset([
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

/* ================= 19. approximating irrationals (1.20, 1.21, L2, num) ================= */
E("u2-approx",2,["1.20","1.21"],2,"gen",function(){
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

/* ================= 20. ordering irrationals (1.22, L3) ================= */
E("u2-order-irrational",2,["1.22"],3,"gen",function(){
  var pool=[];
  for(var n=2;n<=40;n++){if(!u2isSq(n))pool.push({frag:"\\sqrt{"+n+"}",val:Math.sqrt(n)});}
  for(var c=2;c<=80;c++){if(!u2isCu(c)&&Math.cbrt(c)<4.4)pool.push({frag:"\\sqrt[3]{"+c+"}",val:Math.cbrt(c)});}
  pool.push({frag:"\\pi",val:Math.PI});
  var items=null,guard=0;
  while(!items&&guard<500){
    guard++;
    var cand=shuffle(pool).slice(0,4);
    var ok=true;
    for(var i=0;i<4;i++)for(var j=i+1;j<4;j++){if(Math.abs(cand[i].val-cand[j].val)<0.35)ok=false;}
    var strs=cand.map(function(x){return x.frag;});
    if(new Set(strs).size<4)ok=false;
    if(ok)items=cand;
  }
  var sortedItems=items.slice().sort(function(x,y){return x.val-y.val;});
  function ordStr(arr){return arr.map(function(x){return "\\("+x.frag+"\\)";}).join(", ");}
  var key=ordStr(sortedItems);
  var rev=ordStr(sortedItems.slice().reverse());
  var sw1=sortedItems.slice();var tmp=sw1[0];sw1[0]=sw1[1];sw1[1]=tmp;
  var sw2=sortedItems.slice();var tmp2=sw2[2];sw2[2]=sw2[3];sw2[3]=tmp2;
  var ds=u2pickS3(key,[rev,ordStr(sw1),ordStr(sw2)]);
  var approxLines=sortedItems.map(function(x){return x.frag+" &\\approx "+(Math.round(x.val*100)/100);}).join(" \\\\ ");
  return mcq("The numbers "+ordStr(items)+" are to be placed on a number line. Which list orders them from <b>least to greatest</b>?",
    key,ds,
    "Approximate each number by comparing it with perfect squares and cubes: \\[ \\begin{aligned} "+approxLines+" \\end{aligned} \\]"+
    " Reading the approximations in increasing order gives the placement on the number line. From least to greatest: <b>"+key+"</b>.",
    {items:items.map(function(x){return {frag:x.frag,val:x.val};}),keyStr:key});
});

/* ----- bank-u3.js ----- */
// Math 1201 Unit 3 Factors and Products question bank
// Cut verbatim from the standalone bank source
// (math-1201-review/bank-src.js, lines 1442 to 2188).
// CRMARKS: u3-binomial-expand=2
// CRMARKS: u3-binom-tri-expand=3
// CRMARKS: u3-special-products=2
// CRMARKS: u3-verify-sub=1
// CRMARKS: u3-gcf=2
// CRMARKS: u3-factor-monic=2
// CRMARKS: u3-factor-hard=3
// CRMARKS: u3-factor-product=2
// CRMARKS: u3-factor-gcf-first=2
// CRMARKS: u3-diff-squares=2
// CRMARKS: u3-mult-error=2
// CRMARKS: u3-factor-error=3
/* Math 1201 Review, Unit 3 (Factors and Products) bank entries.
   Authored November 2026 from the tranche 1 briefs. All scenarios and
   values are original. Polynomials are rendered by the u3 helpers below:
   terms in descending powers, signs folded in, coefficients small.
   Helper prefix: u3. */

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

/* ============ 1. monomial times a binomial or trinomial (3.4, L1) ============ */
E("u3-monomial-expand", 3, ["3.4"], 1, "gen", function () {
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

/* ============ 2. multiplication and factoring relationship (3.8, L1, var) ============ */
E("u3-mult-factor-rel", 3, ["3.8"], 1, "var", varset([
  function () {
    var key = "Factoring is the reverse of multiplying: the factors of a polynomial multiply together to give the polynomial.";
    return mcq("Which statement best describes the relationship between multiplying polynomials and factoring polynomials?",
      key,
      ["Factoring is the reverse of multiplying: the factors of a polynomial add together to give the polynomial.",
       "Multiplying is the reverse of factoring: the terms of a product multiply together to give each separate factor.",
       "Multiplying and factoring are the same process: both rewrite a polynomial as a sum of its individual terms."],
      "Multiplying builds a product from factors, and factoring undoes that step by splitting a polynomial back into the expressions that multiply to give it. The statement that says this is **" + key + "**",
      { t: "stmt", ans: key });
  },
  function () {
    var key = "Multiply \\((x + 2)\\) by \\((x + 3)\\) and confirm that the product is \\(x^2 + 5x + 6\\).";
    return mcq("A student factors \\(x^2 + 5x + 6\\) as \\((x + 2)(x + 3)\\). Which action checks the factoring by using its relationship with multiplication?",
      key,
      ["Add \\((x + 2)\\) and \\((x + 3)\\) and confirm that the sum is \\(x^2 + 5x + 6\\).",
       "Multiply \\((x + 2)\\) by \\((x + 3)\\) and confirm that the product is \\(x^2 + 6x + 5\\).",
       "Substitute \\(x = 0\\) into \\(x^2 + 5x + 6\\) and confirm that the value is \\(6\\)."],
      "Factoring and multiplying are inverse processes, so a factorization is checked by multiplying the factors back together and comparing with the original polynomial. The checking action is **" + key + "**",
      { t: "stmt", ans: key });
  },
  function () {
    var key = "\\((x + 1)(x + 4) = x^2 + 5x + 4\\) and \\(x^2 + 5x + 4 = (x + 1)(x + 4)\\)";
    return mcq("Which pair of equations shows multiplication and factoring as inverse processes?",
      key,
      ["\\((x + 1)(x + 4) = x^2 + 4x + 4\\) and \\(x^2 + 4x + 4 = (x + 1)(x + 4)\\)",
       "\\((x + 2)(x + 3) = x^2 + 6x + 6\\) and \\(x^2 + 6x + 6 = (x + 2)(x + 3)\\)",
       "\\((x + 1)(x + 4) = x^2 + 5x + 4\\) and \\(x^2 + 5x + 4 = (x + 2)(x + 3)\\)"],
      "The two equations must use the same polynomial and the same factors, with one equation expanding the product and the other splitting the polynomial into those factors. Since \\((x + 1)(x + 4) = x^2 + 5x + 4\\), the inverse pair is **" + key + "**.",
      { t: "stmt", ans: key });
  },
  function () {
    var key = "Because factoring rewrites the polynomial as a product, and expanding a product reverses that rewriting exactly.";
    return mcq("A polynomial is factored correctly. Why does expanding the factored form always return the original polynomial?",
      key,
      ["Because factoring rewrites the polynomial as a sum, and expanding a sum reverses that rewriting exactly.",
       "Because each factor has the same degree as the polynomial, so expanding restores every original term in its place.",
       "Because expanding removes the common factor from each term of the polynomial, which returns the terms to their places."],
      "A factored form is a product of expressions that together equal the polynomial, so multiplying them back out must reproduce the polynomial exactly. The reason is **" + key + "**",
      { t: "stmt", ans: key });
  }
]));

/* ============ 3. binomials and two-digit numbers (3.1, L1, var) ============ */
E("u3-two-digit", 3, ["3.1"], 1, "var", varset([
  function () {
    var key = "\\((30 + 4)(20 + 6)\\)";
    return mcq("A student multiplies \\(34\\) by \\(26\\) by splitting each number into tens and ones, the same split used for binomials. Which expression matches this method?",
      key,
      ["\\((30 + 4)(20 + 4)\\)", "\\((30 + 4) + (20 + 6)\\)", "\\((30 \\times 20) + (4 \\times 6)\\)"],
      "Split each number into tens and ones: \\(34 = 30 + 4\\) and \\(26 = 20 + 6\\). The product keeps both splits as factors, exactly like a product of binomials." +
      u3Alg(["(30 + 4)(20 + 6) &= 600 + 180 + 80 + 24", "&= 884"]) +
      "This matches \\(34 \\times 26 = 884\\). The matching expression is **" + key + "**.",
      { t: "stmt", ans: key });
  },
  function () {
    return mcq("The product \\(47 \\times 35\\) is computed by splitting each factor into tens and ones: \\((40 + 7)(30 + 5)\\). What is the value of the product?",
      "1645",
      ["1235", "1435", "1640"],
      "Each part of one split multiplies each part of the other, as with binomials." +
      u3Alg(["(40 + 7)(30 + 5) &= 1200 + 200 + 210 + 35", "&= 1645"]) +
      "The value of the product is **1645**.",
      { t: "stmt", ans: "1645" });
  },
  function () {
    var key = "\\(13 \\times 15\\)";
    return mcq("Setting \\(x = 10\\) in the binomial product \\((x + 3)(x + 5)\\) produces a product of two two-digit numbers. Which product is it?",
      key,
      ["\\(10 \\times 15\\)", "\\(13 \\times 8\\)", "\\(30 \\times 50\\)"],
      "Replace \\(x\\) by \\(10\\) in each binomial: \\(x + 3 = 13\\) and \\(x + 5 = 15\\). A binomial in \\(x\\) with \\(x = 10\\) is a two-digit number split into tens and ones. The product is **" + key + "**.",
      { t: "stmt", ans: key });
  },
  function () {
    var key = "1000, 150, 40, 6";
    return mcq("The product \\(52 \\times 23\\) is split as \\((50 + 2)(20 + 3)\\). Which list gives all four partial products?",
      key,
      ["1000, 150, 40", "1000, 100, 60, 6", "100, 150, 40, 6"],
      "Multiply each part of the first split by each part of the second: \\(50 \\times 20 = 1000\\), \\(50 \\times 3 = 150\\), \\(2 \\times 20 = 40\\) and \\(2 \\times 3 = 6\\). Their sum is \\(1196 = 52 \\times 23\\). The four partial products are **" + key + "**.",
      { t: "stmt", ans: key });
  }
]));

/* ============ 4. area model (3.2, 3.3, L1, var) ============ */
E("u3-area-model", 3, ["3.2", "3.3"], 1, "var", varset([
  function () {
    var key = "\\(x^2 + 6x + 8\\)";
    return mcq("A rectangle with length \\(x + 4\\) and width \\(x + 2\\) is divided into four regions with areas \\(x^2\\), \\(2x\\), \\(4x\\) and \\(8\\). What is the area of the whole rectangle, in simplified form?",
      key,
      ["\\(x^2 + 8x + 8\\)", "\\(x^2 + 6x + 6\\)", "\\(x^2 + 4x + 8\\)"],
      "The area of the whole rectangle is the sum of the four partial areas." +
      u3Alg(["x^2 + 2x + 4x + 8 &= x^2 + 6x + 8"]) +
      "The total area is **" + key + "**.",
      { t: "stmt", ans: key });
  },
  function () {
    var key = "\\((x + 3)(x + 4)\\)";
    return mcq("Four regions of an area model have areas \\(x^2\\), \\(3x\\), \\(4x\\) and \\(12\\). The total area, \\(x^2 + 7x + 12\\), is the product of the rectangle's length and width. Which expressions give the length and width?",
      key,
      ["\\((x + 2)(x + 6)\\)", "\\((x + 1)(x + 12)\\)", "\\((x + 3)(x + 7)\\)"],
      "The side pieces must produce the partial areas: \\(3x\\) comes from a side piece of \\(3\\) meeting the \\(x\\) side, and \\(4x\\) from a side piece of \\(4\\), with \\(3 \\times 4 = 12\\) for the corner region. The sides are \\(x + 3\\) and \\(x + 4\\), so the length and width are given by **" + key + "**.",
      { t: "stmt", ans: key });
  },
  function () {
    var key = "\\((x + 2)(x + 3)\\)";
    return mcq("An algebra-tile rectangle uses one \\(x^2\\) tile, five \\(x\\) tiles and six unit tiles, with no gaps. Which product does the rectangle model?",
      key,
      ["\\((x + 1)(x + 6)\\)", "\\((x + 2)(x + 2)\\)", "\\((x + 5)(x + 6)\\)"],
      "The tiles total \\(x^2 + 5x + 6\\). The side pieces must add to \\(5\\) (the number of \\(x\\) tiles along the sides) and multiply to \\(6\\) (the unit tiles in the corner), giving pieces of \\(2\\) and \\(3\\). The product modelled is **" + key + "**.",
      { t: "stmt", ans: key });
  },
  function () {
    var key = "\\(x + 5\\)";
    return mcq("In an area model for \\((x + 2)(x + 5)\\), one side of the rectangle is \\(x + 2\\). The four regions have areas \\(x^2\\), \\(5x\\), \\(2x\\) and \\(10\\). What is the other side of the rectangle?",
      key,
      ["\\(x + 2\\)", "\\(x + 7\\)", "\\(x + 10\\)"],
      "The region \\(5x\\) is formed where the \\(x\\) part of the known side meets a piece of length \\(5\\) on the other side, and the corner \\(10 = 2 \\times 5\\) confirms that piece. The other side is **" + key + "**.",
      { t: "stmt", ans: key });
  }
]));

/* ============ 5. binomial times binomial (3.4, L2) ============ */
E("u3-binomial-expand", 3, ["3.4"], 2, "gen", function () {
  var v = pick(["x", "x", "y"]);
  var A = [ri(1, 3), u3Nz(-6, 6)], B = [ri(1, 3), u3Nz(-6, 6)];
  var prod = u3Conv(A, B), keyRaw = u3PC(prod, v);
  var partials = u3Mul(u3TermsOf(A, v), u3TermsOf(B, v));
  var prompt = "Expand and simplify \\(" + u3Par(A, v) + u3Par(B, v) + "\\).";
  var sol = "Multiply each term of the first binomial by each term of the second binomial, then combine like terms." +
    u3Alg([u3Par(A, v) + u3Par(B, v) + " &= " + u3StrSeq(partials), "&= " + keyRaw]) +
    "The expanded form is **" + u3M(keyRaw) + "**.";
  return mcq(prompt, u3M(keyRaw), u3DistrCoeffs(prod, v, 3), sol,
    { t: "expand", P: u3TermsOf(A, v), Q: u3TermsOf(B, v) });
});

/* ============ 6. binomial times trinomial (3.4, L2) ============ */
E("u3-binom-tri-expand", 3, ["3.4"], 2, "gen", function () {
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

/* ============ 7. special products, coefficient of the linear term (3.4, L2, num) ============ */
E("u3-special-products", 3, ["3.4"], 2, "gen", function () {
  var v = pick(["x", "y"]);
  var a = ri(1, 6), b = ri(1, 9);
  var mode = pick(["sq", "sq", "conj"]);
  var A, B, expr, steps;
  if (mode === "sq") {
    var s = pick([1, -1]);
    A = [a, s * b]; B = [a, s * b];
    expr = u3Par(A, v) + "^2";
    var parts = u3Mul(u3TermsOf(A, v), u3TermsOf(B, v));
    steps = [expr + " &= " + u3StrSeq(parts), "&= " + u3PC(u3Conv(A, B), v)];
  } else {
    A = [a, b]; B = [a, -b];
    expr = u3Par(A, v) + u3Par(B, v);
    var parts2 = u3Mul(u3TermsOf(A, v), u3TermsOf(B, v));
    steps = [expr + " &= " + u3StrSeq(parts2), "&= " + u3PC(u3Conv(A, B), v)];
  }
  var prod = u3Conv(A, B), ans = prod[1];
  var prompt = "Expand \\(" + expr + "\\). What is the coefficient of \\(" + v + "\\) in the expansion?";
  var sol = (mode === "sq"
    ? "Squaring a binomial produces three terms; the middle term comes from both cross products together."
    : "The two factors are conjugates, so the two cross products are opposites and cancel.") +
    u3Alg(steps) +
    "The coefficient of \\(" + v + "\\) in the expansion is **" + ans + "**.";
  return numq(prompt, ans, 0.01, sol, { t: "coef", P: A, Q: B, v: v });
});

/* ============ 8. verify by substitution (3.5, L2, num) ============ */
E("u3-verify-sub", 3, ["3.5"], 1, "gen", function () {
  var b = u3Nz(-8, 8), c = u3Nz(-8, 8);
  var B = b + c, C = b * c;
  var bad = Math.random() < 0.5, Bp = B, Cp = C;
  if (bad) {
    if (Math.random() < 0.5) Bp = B + pick([-2, -1, 1, 2]); else Cp = C + pick([-3, -1, 1, 3]);
  }
  var v = ri(-3, 5);
  var lhs = (v + b) * (v + c), rhs = v * v + Bp * v + Cp;
  var fac1 = u3Par([1, b], "x"), fac2 = u3Par([1, c], "x");
  var claim = u3PC([1, Bp, Cp], "x");
  var prompt = "A student claims that \\(" + fac1 + fac2 + " = " + claim + "\\). To test the claim, substitute \\(x = " + v + "\\). What value does the left side, \\(" + fac1 + fac2 + "\\), take when \\(x = " + v + "\\)?";
  var sub1 = "(" + v + (b < 0 ? " - " + (-b) : " + " + b) + ")(" + v + (c < 0 ? " - " + (-c) : " + " + c) + ")";
  var sol = "Substitute \\(x = " + v + "\\) into both sides of the claim." +
    u3Alg(["\\text{left side} &= " + sub1 + " = " + lhs,
           "\\text{right side} &= " + v + "^2 + " + Bp + "(" + v + ") + " + Cp + " = " + rhs]) +
    (bad
      ? "The two values differ, so the claim does not hold. "
      : "The two values agree, which supports the claim (one value is a check, not a proof). ") +
    "The value of the left side is **" + lhs + "**.";
  return numq(prompt, lhs, 0.01, sol, { t: "verify", b: b, c: c, v: v, rhs: rhs });
});

/* ============ 9. greatest common factor (3.10, L2) ============ */
E("u3-gcf", 3, ["3.10"], 2, "gen", function () {
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

/* ============ 10. factor a monic trinomial, larger constant (3.12, L2, num) ============ */
E("u3-factor-monic", 3, ["3.12"], 2, "gen", function () {
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

/* ============ 11. factor a non-monic trinomial (3.12, L2) ============ */
E("u3-factor-hard", 3, ["3.12"], 2, "gen", function () {
  var pairs = [[1, 2], [2, 1], [1, 3], [3, 1], [2, 2], [1, 4], [4, 1], [2, 3], [3, 2], [1, 5], [5, 1], [1, 6], [6, 1]];
  var pr, b, d, prod, tries = 0;
  do {
    tries++;
    pr = pick(pairs); b = u3Nz(-6, 6); d = u3Nz(-6, 6);
    prod = u3Conv([pr[0], b], [pr[1], d]);
  } while ((u3GCD3(prod[0], Math.abs(prod[1]), Math.abs(prod[2])) !== 1 || prod[1] === 0) && tries < 80);
  var facs = [[pr[0], b], [pr[1], d]];
  facs.sort(function (f, g) { if (f[0] !== g[0]) return g[0] - f[0]; return f[1] - g[1]; });
  var keyRaw = u3FacRaw("", facs, "x");
  var poly = u3PC(prod, "x");
  var prompt = "Factor the trinomial \\(" + poly + "\\) completely.";
  var sol = "Look for two binomials \\((px + q)(rx + s)\\) with \\(pr = " + prod[0] + "\\), \\(qs = " + prod[2] + "\\) and cross sum \\(ps + qr = " + prod[1] + "\\). The pair that works is shown, and multiplying it back out returns the trinomial." +
    u3Alg([poly + " &= " + keyRaw,
           keyRaw + " &= " + u3StrSeq(u3Mul(u3TermsOf(facs[0], "x"), u3TermsOf(facs[1], "x"))),
           "&= " + poly]) +
    "The factored form is **" + u3M(keyRaw) + "**.";
  return mcq(prompt, u3M(keyRaw), u3FacDistr("", facs, "x", prod, 3), sol,
    { t: "fac", g: "", parts: facs, v: "x" });
});

/* ============ 12. express as a product of factors, verified (3.9, 3.11, L2) ============ */
E("u3-factor-product", 3, ["3.9", "3.11"], 2, "gen", function () {
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

/* ============ 13. factor completely, common factor first (3.9, 3.10, L2) ============ */
E("u3-factor-gcf-first", 3, ["3.9", "3.10"], 2, "gen", function () {
  var g0 = ri(2, 6);
  var mode = pick(["tri", "tri", "ds"]);
  var keyRaw, poly, quoRaw, quoCoeffs, facs, note;
  if (mode === "tri") {
    var r = u3Nz(-7, 7), s = u3Nz(-7, 7);
    var B = r + s, C = r * s;
    var prod = [g0, g0 * B, g0 * C];
    poly = u3PC(prod, "x");
    quoCoeffs = [1, B, C];
    quoRaw = u3PC(quoCoeffs, "x");
    facs = [[1, Math.min(r, s)], [1, Math.max(r, s)]];
    keyRaw = g0 + u3FacRaw("", facs, "x");
    note = "Inside the brackets, the two numbers multiply to \\(" + C + "\\) and add to \\(" + B + "\\)";
  } else {
    var a = ri(1, 3), b = ri(1, 7);
    poly = u3PC([g0 * a * a, 0, -g0 * b * b], "x");
    quoCoeffs = [a * a, 0, -b * b];
    quoRaw = u3PC(quoCoeffs, "x");
    facs = [[a, b], [a, -b]];
    keyRaw = g0 + u3FacRaw("", facs, "x");
    note = "Inside the brackets is a difference of squares, \\((" + a + "x)^2 - " + b + "^2\\)";
  }
  var cands = [], seen = {};
  function addC(s) { if (s !== keyRaw && !seen[s]) { seen[s] = 1; cands.push(u3M(s)); } }
  addC(g0 + "(" + quoRaw + ")");
  u3FacDistr(String(g0), facs, "x", mode === "tri" ? [1, facs[0][1] + facs[1][1], facs[0][1] * facs[1][1]] : u3FacExpand(facs), 3)
    .forEach(function (s) { addC(s.replace(/^\\\(|\\\)$/g, "")); });
  var divs = [];
  for (var d = 1; d < g0; d++) if (g0 % d === 0) divs.push(d);
  if (divs.length) {
    var dv2 = pick(divs), sc2 = g0 / dv2;
    addC(dv2 + "(" + u3PC(quoCoeffs.map(function (x) { return x * sc2; }), "x") + ")");
  }
  var prompt = "Factor the polynomial \\(" + poly + "\\) completely.";
  var sol = "First remove the greatest common factor, \\(" + g0 + "\\), then factor what remains. " + note + "." +
    u3Alg([poly + " &= " + g0 + "(" + quoRaw + ")", "&= " + keyRaw]) +
    "Factored completely, the polynomial is **" + u3M(keyRaw) + "**.";
  return mcq(prompt, u3M(keyRaw), shuffle(cands).slice(0, 3), sol,
    { t: "fac", g: String(g0), parts: facs, v: "x" });
});

/* ============ 14. difference of squares (3.14, L2) ============ */
E("u3-diff-squares", 3, ["3.14"], 2, "gen", function () {
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

/* ============ 15. perfect-square trinomial, find k (3.12, L2, num) ============ */
E("u3-perfect-square", 3, ["3.12"], 2, "gen", function () {
  var v = pick(["x", "y"]);
  var a = ri(1, 6), b = ri(1, 10), s = pick([1, -1]);
  var coeffs = [a * a, 2 * a * b * s, b * b];
  var poly = u3PC(coeffs, v);
  var facRaw = u3Par([a, s * b], v) + "^2";
  var prompt = "The trinomial \\(" + poly + "\\) is a perfect-square trinomial. It factors as the square of a binomial, \\((p" + v + " + k)^2\\), for some numbers \\(p\\) and \\(k\\). What is the value of \\(k\\)?";
  var sol = "The first term is \\((" + a + v + ")^2\\), so \\(p = " + a + "\\). The last term is \\(" + b + "^2\\), and the middle term checks: \\(2 \\times " + a + " \\times " + b + " = " + (2 * a * b) + "\\), with the sign of the middle term giving the sign of \\(k\\)." +
    u3Alg([poly + " &= " + facRaw]) +
    "The value of \\(k\\) is **" + (s * b) + "**.";
  return numq(prompt, s * b, 0.01, sol, { t: "pst", a: a, b: b, s: s });
});

/* ============ 16. generalize a multiplication strategy (3.6, L3, var) ============ */
E("u3-strategy", 3, ["3.6"], 3, "var", varset([
  function () {
    var key = "Multiply each term of the first binomial by each term of the second binomial, then combine like terms.";
    return mcq("Which statement correctly generalizes how to multiply two binomials?",
      key,
      ["Multiply each term of the first binomial by the matching term of the second binomial, then combine like terms.",
       "Multiply the first terms together and the last terms together, then add the two products together.",
       "Add each term of the first binomial to each term of the second binomial, then combine like terms."],
      "Every term of one binomial must meet every term of the other, giving four partial products before like terms are combined; matching terms only, or using only the first and last products, misses the cross products. The correct generalization is **" + key + "**",
      { t: "stmt", ans: key });
  },
  function () {
    var key = "Six, because each of the 2 terms of the binomial multiplies each of the 3 terms of the trinomial.";
    return mcq("A student multiplies a binomial by a trinomial. How many partial products are there before like terms are combined?",
      key,
      ["Five, because the number of partial products is the sum of the numbers of terms in the factors, 2 + 3.",
       "Six, because the binomial contributes 3 partial products and the trinomial contributes 3 more.",
       "Nine, because each of the 3 terms of the trinomial multiplies each of the 3 terms of the trinomial."],
      "Count the pairings: each of the 2 terms of the binomial pairs with each of the 3 terms of the trinomial, giving \\(2 \\times 3 = 6\\) partial products. The correct count is **" + key + "**",
      { t: "stmt", ans: key });
  },
  function () {
    var key = "FOIL names pairings for two binomials only; the trinomial's third term also has to be multiplied by both terms of the binomial.";
    return mcq("Why does the FOIL method, on its own, not multiply \\((x + 2)(x^2 + 3x + 4)\\) completely?",
      key,
      ["FOIL names pairings for two binomials only; the trinomial must be factored into binomials before any multiplication can begin.",
       "FOIL works only when both factors have positive terms; the trinomial's terms must be rearranged into the right order first.",
       "FOIL gives the outer and inner products twice, so two of the six partial products have to be discarded at the end of the work."],
      "FOIL is a checklist for the four pairings of two binomials. With a trinomial factor there are six pairings, and the two extra ones involve the third term. The reason is **" + key + "**",
      { t: "stmt", ans: key });
  },
  function () {
    var key = "Multiply the monomial by every term of the polynomial, then combine any like terms in the result.";
    return mcq("Which strategy multiplies a monomial by a polynomial of any number of terms?",
      key,
      ["Multiply the monomial by the first and last terms of the polynomial, then combine any like terms.",
       "Multiply the monomial by the term with the highest degree, then add the remaining terms unchanged.",
       "Add the monomial to every term of the polynomial, then combine any like terms in the result."],
      "Distribution has no term limit: the monomial multiplies every term of the polynomial, however many there are, and like terms are combined afterwards. The strategy is **" + key + "**",
      { t: "stmt", ans: key });
  }
]));

/* ============ 17. error in a polynomial multiplication (3.7, L3, var) ============ */
E("u3-mult-error", 3, ["3.7"], 3, "var", varset([
  function () {
    var key = "\\(x^2 + 8x + 15\\)";
    return mcq("A student expands \\((x + 3)(x + 5)\\) as shown. The work contains one error. \\[ (x + 3)(x + 5) = x^2 + 15 \\] What is the correct product?",
      key,
      ["\\(x^2 + 15\\)", "\\(x^2 + 5x + 15\\)", "\\(x^2 + 8x + 8\\)"],
      "The error: only the first and last terms were multiplied, so the two cross products are missing. Correct work:" +
      u3Alg(["(x + 3)(x + 5) &= x^2 + 5x + 3x + 15", "&= x^2 + 8x + 15"]) +
      "The correct product is **" + key + "**.",
      { t: "expand", P: [[1, 1, 0], [3, 0, 0]], Q: [[1, 1, 0], [5, 0, 0]] });
  },
  function () {
    var key = "\\(2x^2 + 9x + 4\\)";
    return mcq("A student expands \\((2x + 1)(x + 4)\\) as shown. The work contains one error. \\[ (2x + 1)(x + 4) = 2x^2 + 4x + x + 4 = 2x^2 + 5x + 4 \\] What is the correct product?",
      key,
      ["\\(2x^2 + 5x + 4\\)", "\\(2x^2 + 9x + 5\\)", "\\(2x^2 + 6x + 4\\)"],
      "The error is in the outer product: \\(2x \\times 4 = 8x\\), not \\(4x\\). Correct work:" +
      u3Alg(["(2x + 1)(x + 4) &= 2x^2 + 8x + x + 4", "&= 2x^2 + 9x + 4"]) +
      "The correct product is **" + key + "**.",
      { t: "expand", P: [[2, 1, 0], [1, 0, 0]], Q: [[1, 1, 0], [4, 0, 0]] });
  },
  function () {
    var key = "\\(x^2 + 4x - 12\\)";
    return mcq("A student expands \\((x - 2)(x + 6)\\) as shown. The work contains one error. \\[ (x - 2)(x + 6) = x^2 + 6x - 2x - 12 = x^2 + 4x + 12 \\] What is the correct product?",
      key,
      ["\\(x^2 + 4x + 12\\)", "\\(x^2 - 4x - 12\\)", "\\(x^2 + 8x - 12\\)"],
      "The error is in the last step: the constant term \\(-12\\) changed sign while the \\(x\\) terms were combined. Correct work:" +
      u3Alg(["(x - 2)(x + 6) &= x^2 + 6x - 2x - 12", "&= x^2 + 4x - 12"]) +
      "The correct product is **" + key + "**.",
      { t: "expand", P: [[1, 1, 0], [-2, 0, 0]], Q: [[1, 1, 0], [6, 0, 0]] });
  },
  function () {
    var key = "\\(3x^3 + 6x^2 + 12x\\)";
    return mcq("A student expands \\(3x(x^2 + 2x + 4)\\) as shown. The work contains one error. \\[ 3x(x^2 + 2x + 4) = 3x^3 + 6x^2 + 4 \\] What is the correct product?",
      key,
      ["\\(3x^3 + 6x^2 + 4\\)", "\\(3x^3 + 6x^2 + 12\\)", "\\(3x^3 + 2x^2 + 12x\\)"],
      "The error: the last term was never multiplied by \\(3x\\); it should become \\(3x \\times 4 = 12x\\). Correct work:" +
      u3Alg(["3x(x^2 + 2x + 4) &= 3x^3 + 6x^2 + 12x"]) +
      "The correct product is **" + key + "**.",
      { t: "expand", P: [[3, 1, 0]], Q: [[1, 2, 0], [2, 1, 0], [4, 0, 0]] });
  },
  function () {
    var key = "\\(x^2 + 8x + 16\\)";
    return mcq("A student expands \\((x + 4)^2\\) as shown. The work contains one error. \\[ (x + 4)^2 = x^2 + 16 \\] What is the correct product?",
      key,
      ["\\(x^2 + 16\\)", "\\(x^2 + 4x + 16\\)", "\\(x^2 + 8x + 8\\)"],
      "The error: squaring a binomial is not squaring each term separately; the cross term \\(2 \\times x \\times 4 = 8x\\) is missing. Correct work:" +
      u3Alg(["(x + 4)^2 &= x^2 + 4x + 4x + 16", "&= x^2 + 8x + 16"]) +
      "The correct product is **" + key + "**.",
      { t: "expand", P: [[1, 1, 0], [4, 0, 0]], Q: [[1, 1, 0], [4, 0, 0]] });
  }
]));

/* ============ 18. error in a polynomial factorization (3.13, L3, var) ============ */
E("u3-factor-error", 3, ["3.13"], 3, "var", varset([
  function () {
    var key = "\\((x + 3)(x + 4)\\)";
    return mcq("A student factors \\(x^2 + 7x + 12\\) as shown. The work contains one error. \\[ x^2 + 7x + 12 = (x + 6)(x + 2) \\] What is the correct factorization?",
      key,
      ["\\((x + 6)(x + 2)\\)", "\\((x + 1)(x + 12)\\)", "\\((x + 2)(x + 5)\\)"],
      "The error: \\(6\\) and \\(2\\) multiply to \\(12\\) but add to \\(8\\), not \\(7\\). The pair that multiplies to \\(12\\) and adds to \\(7\\) is \\(3\\) and \\(4\\)." +
      u3Alg(["x^2 + 7x + 12 &= (x + 3)(x + 4)"]) +
      "The correct factorization is **" + key + "**.",
      { t: "fac", g: "", parts: [[1, 3], [1, 4]], v: "x" });
  },
  function () {
    var key = "\\((x - 2)(x - 3)\\)";
    return mcq("A student factors \\(x^2 - 5x + 6\\) as shown. The work contains one error. \\[ x^2 - 5x + 6 = (x - 1)(x - 6) \\] What is the correct factorization?",
      key,
      ["\\((x - 1)(x - 6)\\)", "\\((x + 2)(x + 3)\\)", "\\((x - 1)(x - 5)\\)"],
      "The error: \\(-1\\) and \\(-6\\) multiply to \\(6\\) but add to \\(-7\\), not \\(-5\\). The pair that multiplies to \\(6\\) and adds to \\(-5\\) is \\(-2\\) and \\(-3\\)." +
      u3Alg(["x^2 - 5x + 6 &= (x - 2)(x - 3)"]) +
      "The correct factorization is **" + key + "**.",
      { t: "fac", g: "", parts: [[1, -2], [1, -3]], v: "x" });
  },
  function () {
    var key = "\\((2x + 1)(x + 3)\\)";
    return mcq("A student factors \\(2x^2 + 7x + 3\\) as shown. The work contains one error. \\[ 2x^2 + 7x + 3 = (2x + 3)(x + 1) \\] What is the correct factorization?",
      key,
      ["\\((2x + 3)(x + 1)\\)", "\\((2x + 3)(x + 3)\\)", "\\((2x + 1)(x + 1)\\)"],
      "The error: the student's factors expand to \\(2x^2 + 5x + 3\\); the cross sum is \\(2 \\times 1 + 3 \\times 1 = 5\\), not \\(7\\). Swapping the constants gives a cross sum of \\(2 \\times 3 + 1 \\times 1 = 7\\)." +
      u3Alg(["2x^2 + 7x + 3 &= (2x + 1)(x + 3)"]) +
      "The correct factorization is **" + key + "**.",
      { t: "fac", g: "", parts: [[2, 1], [1, 3]], v: "x" });
  },
  function () {
    var key = "\\((x + 4)(x - 4)\\)";
    return mcq("A student factors \\(x^2 - 16\\) as shown. The work contains one error. \\[ x^2 - 16 = (x - 4)(x - 4) \\] What is the correct factorization?",
      key,
      ["\\((x - 4)(x - 4)\\)", "\\((x + 4)(x + 4)\\)", "\\((x - 2)(x - 8)\\)"],
      "The error: \\((x - 4)(x - 4)\\) expands to \\(x^2 - 8x + 16\\), which has an \\(x\\) term. A difference of squares needs one factor with \\(+4\\) and one with \\(-4\\), so the \\(x\\) terms cancel." +
      u3Alg(["x^2 - 16 &= (x + 4)(x - 4)"]) +
      "The correct factorization is **" + key + "**.",
      { t: "fac", g: "", parts: [[1, 4], [1, -4]], v: "x" });
  },
  function () {
    var key = "\\(4x(x + 2)\\)";
    return mcq("A student factors \\(4x^2 + 8x\\) as shown. The work contains one error. \\[ 4x^2 + 8x = 4x(x + 8) \\] What is the correct factorization?",
      key,
      ["\\(4x(x + 8)\\)", "\\(4(x^2 + 8x)\\)", "\\(2x(2x + 8)\\)"],
      "The error: the second term inside the brackets was not divided by the common factor; \\(8x \\div 4x = 2\\), not \\(8\\)." +
      u3Alg(["4x^2 + 8x &= 4x(x + 2)"]) +
      "The correct factorization is **" + key + "**.",
      { t: "fac", g: "4x", parts: [[1, 2]], v: "x" });
  }
]));

/* ----- bank-u4.js ----- */
// Math 1201 Unit 4 Relations and Functions question bank
// Cut verbatim from the standalone bank source
// (math-1201-review/bank-src.js, lines 2189 to 3075).
// CRMARKS: u4-domain-range=3
// CRMARKS: u4-rate-of-change=3
// CRMARKS: u4-intercepts=2
// CRMARKS: u4-context-problem=3
// CRMARKS: u4-eval-function=2
// CRMARKS: u4-solve-input=2
// CRMARKS: u4-domain-decision=2
/* Math 1201 Review, Unit 4: Relations and Functions (tranche 2).
   All scenarios and numbers are original to this bank; sources gave types only.
   Helper prefix: u4. Every entry returns the same question type on every draw. */

/* ================= u4 helpers ================= */
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

/* ================= 1. situation for a described graph (4.1, L2, var) ================= */
E("u4-situation-graph",4,["4.1"],2,"var",varset([
  function(){var key="The greenhouse warms through the morning, holds its temperature at midday, then cools later on in the day";
    return mcq("A graph has time in hours on the horizontal axis and the temperature of a greenhouse on the vertical axis. The graph rises steadily, then stays level, then falls steadily. Which situation could this graph represent?",
    key,
    ["The greenhouse cools through the morning, holds its temperature at midday, then warms later on in the day",
     "The greenhouse warms through the morning, then keeps on rising faster and faster until the day is over now",
     "The greenhouse stays at one temperature all morning, then falls steadily, then rises again during the night"],
    "Read the shape in three parts. Rising means the temperature is increasing, a level part means it is holding steady, and falling means it is decreasing. Only one situation follows that order: warming, holding steady, then cooling. The situation is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="A cyclist rides away from home at a steady pace, rests for a while at a park, then rides home at a steady pace";
    return mcq("A graph has time in minutes on the horizontal axis and distance from home on the vertical axis. The graph rises steadily, then stays level, then falls steadily back to zero. Which situation could this graph represent?",
    key,
    ["A cyclist rides away from home at a steady pace, rests for a while at a park, then rides on even farther away",
     "A cyclist stays at home for a while, then rides away at a steady pace, then rests for a while at a local park",
     "A cyclist rides toward home at a steady pace, rests for a while at a park, then rides away from home once more"],
    "Rising distance from home means moving away, a level part means the distance is not changing, so the cyclist is resting, and falling back to zero means returning home. The situation is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="A tank is drained at a steady rate for a time, sits empty for a time, then is filled at a steady rate again";
    return mcq("A graph has time in minutes on the horizontal axis and the volume of water in a tank on the vertical axis. The graph falls steadily, then stays level at zero, then rises steadily. Which situation could this graph represent?",
    key,
    ["A tank is filled at a steady rate for a time, sits full for a time, then is drained at a steady rate again",
     "A tank sits empty for a time, then is drained at a steady rate, then is filled at a steady rate once again",
     "A tank is drained at a steady rate for a time, sits partly full for a while, then is drained completely dry"],
    "Falling volume means water is leaving the tank, a level part at zero means the tank sits empty, and rising volume means water is being added. The situation is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="A seedling grows slowly during its first weeks, then grows much more quickly once its roots are established";
    return mcq("A graph has time in weeks on the horizontal axis and the height of a seedling on the vertical axis. The graph rises slowly at first, then rises more and more steeply. Which situation could this graph represent?",
    key,
    ["A seedling grows quickly during its first weeks, then grows much more slowly once its roots are established",
     "A seedling stays the same height for its first weeks, then grows at one steady rate for the rest of the time",
     "A seedling grows slowly during its first weeks, then shrinks back down once its roots are fully established"],
    "A graph that rises slowly and then more steeply shows a quantity increasing at a growing rate. The height increases slowly at first and then faster. The situation is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="A phone battery drains at a steady rate while it is used, then charges at a steady rate when it is plugged in";
    return mcq("A graph has time in hours on the horizontal axis and the charge left in a phone battery on the vertical axis. The graph falls steadily, then rises steadily. Which situation could this graph represent?",
    key,
    ["A phone battery charges at a steady rate while it is used, then drains at a steady rate when it is plugged in",
     "A phone battery drains at a steady rate while it is used, then stays at the same low charge for the whole day",
     "A phone battery stays fully charged while it is used, then drains at a steady rate when it is plugged in too"],
    "Falling charge means the battery is draining, and rising charge means it is being charged. The order in the graph is drain first, then charge. The situation is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="A hiker climbs a steady slope, walks along a flat ridge for a while, then climbs a second steady slope upward";
    return mcq("A graph has distance walked in kilometres on the horizontal axis and height above sea level on the vertical axis. The graph rises steadily, then stays level, then rises steadily again. Which situation could this graph represent?",
    key,
    ["A hiker climbs a steady slope, walks along a flat ridge for a while, then walks down a second steady slope now",
     "A hiker walks along a flat ridge for a while, climbs a steady slope, then walks along a second flat ridge top",
     "A hiker climbs a steady slope, walks down into a flat valley for a while, then climbs a second steady slope up"],
    "Rising height means climbing, a level part means walking on flat ground, and rising again means climbing a second slope. The situation is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});}
]));

/* ================= 2. graph that fits a situation (4.2, L2, var) ================= */
E("u4-sketch-situation",4,["4.2"],2,"var",varset([
  function(){var key="The graph rises steadily, stays level for a while, rises steadily again, then stays level until the trip ends";
    return mcq("A school bus leaves its depot, drives steadily to a first stop, waits, drives steadily to a second stop, then waits there. A graph plots the distance from the depot against time. Which description matches a graph for this trip?",
    key,
    ["The graph rises steadily, stays level for a while, falls steadily back to zero, then stays level until it ends",
     "The graph stays level for a while, rises steadily the whole rest of the way, then falls steadily back to zero",
     "The graph rises more and more steeply the whole way, with no level parts anywhere along the trip at all today"],
    "Driving steadily away makes the distance rise steadily, and waiting at a stop makes it stay level. The pattern is rise, level, rise, level. The matching description is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The graph rises steadily at first, then stays level for the rest of the time shown on the graph axes here";
    return mcq("A bathtub is filled with the tap fully open, then the tap is turned off and the water sits in the tub. A graph plots the depth of water against time. Which description matches a graph for this situation?",
    key,
    ["The graph falls steadily at first, then stays level for the rest of the time shown on the graph axes here",
     "The graph rises steadily at first, then falls steadily for the rest of the time shown on the graph axes here",
     "The graph stays level at first, then rises steadily for the rest of the time shown on the graph axes here"],
    "While the tap runs, the depth rises steadily. Once the tap is off, the depth stays level. The matching description is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The graph falls quickly at first, then falls more and more slowly, levelling off near room temperature";
    return mcq("A mug of hot soup is left on a counter to cool toward room temperature. A graph plots the temperature of the soup against time. Which description matches a graph for this situation?",
    key,
    ["The graph rises quickly at first, then rises more and more slowly, levelling off near room temperature",
     "The graph falls at one steady rate the whole time, reaching room temperature in a single straight line",
     "The graph falls quickly at first, then rises more and more slowly, levelling off near room temperature"],
    "Hot soup cools fastest when it is hottest, then cools more slowly as it nears room temperature, so the graph falls quickly and then levels off. The matching description is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The graph stays level, then falls steadily to zero, then stays level at zero for the rest of the time";
    return mcq("A full rain barrel sits unused, is then drained at a steady rate until it is empty, and is left empty. A graph plots the volume of water in the barrel against time. Which description matches a graph for this situation?",
    key,
    ["The graph stays level, then rises steadily to the top, then stays level at the top for the rest of time",
     "The graph falls steadily to zero right away, then rises steadily for the rest of the time shown here",
     "The graph stays level, then falls more and more steeply, then rises steadily for the rest of the time"],
    "Sitting unused keeps the volume level, draining at a steady rate makes it fall steadily to zero, and left empty it stays at zero. The matching description is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The graph rises in equal steps, with a level part between each step, as each floor is passed in turn";
    return mcq("A lift in an office building stops at each floor on its way up, pausing at every floor. A graph plots the height of the lift against time. Which description matches a graph for this situation?",
    key,
    ["The graph rises in equal steps, getting steeper between each step, as each floor is passed in turn",
     "The graph rises steadily in one straight line the whole way up, as each floor is passed in turn",
     "The graph falls in equal steps, with a level part between each step, as each floor is passed by below"],
    "Between stops the lift rises, and at each floor it pauses, so the height stays level. Equal floors give equal steps with level parts between them. The matching description is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});}
]));

/* ================= 3. connect the points or not (4.3, L3, var) ================= */
E("u4-connect-points",4,["4.3"],3,"var",varset([
  function(){var key="No: tickets are sold in whole numbers only, so points between the plotted values would have no meaning at all";
    return mcq("A graph plots the number of raffle tickets a student buys against the total cost of the tickets. Should the plotted points be connected?",
    key,
    ["Yes: tickets are sold one after another all day, so points between the plotted values would have meaning here",
     "No: the cost of the tickets goes up and down during the day, so points between the values change too much to use",
     "Yes: a connected graph is always the right choice, so points between the plotted values need no meaning at all"],
    "Between one ticket and two tickets there is no possible purchase: tickets come in whole numbers, so the values between the points cannot occur. The points should <b>not</b> be connected, because <b>tickets are sold in whole numbers only</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Yes: the temperature changes continuously between readings, so every point along the line has a real meaning";
    return mcq("A graph plots the temperature inside a cold storage room, read once each hour, against time. Should the plotted points be connected?",
    key,
    ["No: the temperature is read in whole hours only, so each point on the line would be a guess with no meaning",
     "Yes: the temperature changes all at once at each reading, so every point along the line has a real meaning too",
     "No: a connected graph is never the right choice, so every point along the line must be left out of the picture"],
    "The temperature does not jump from one reading to the next; it changes continuously the whole time, so the points between readings represent real temperatures. The points <b>should</b> be connected, because <b>the temperature changes continuously between readings</b>.",
    {stmt:true,keyText:key});},
  function(){var key="No: people are counted in whole numbers only, so points between the plotted values would have no meaning at all";
    return mcq("A graph plots the number of members in a chess club at the end of each month against the month. Should the plotted points be connected?",
    key,
    ["Yes: members join the club a little at a time, so points between the plotted values would have a real meaning",
     "No: the club meets in a different room each month, so points between the plotted values change too much to use",
     "Yes: a connected graph is always the right choice, so points between the plotted values need no meaning at all here"],
    "A club cannot have a fractional member, and membership only takes whole number values, so the values between the points cannot occur. The points should <b>not</b> be connected, because <b>people are counted in whole numbers only</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Yes: the depth grows continuously as the water flows in, so every point along the line has a real meaning";
    return mcq("A graph plots the depth of water in a filling aquarium against time. Should the plotted points be connected?",
    key,
    ["No: the depth is measured in whole centimetres, so every point along the line would be a guess with no meaning",
     "Yes: the depth jumps up all at once at each minute, so each point on the line has a real meaning as well",
     "No: a connected graph is never the right choice, so every point along the line must be left out of the picture"],
    "As water flows in, the depth takes every value between one measurement and the next; nothing jumps. The points <b>should</b> be connected, because <b>the depth grows continuously as the water flows in</b>.",
    {stmt:true,keyText:key});},
  function(){var key="No: goals are scored one whole goal at a time, so points between the plotted values would have no meaning here";
    return mcq("A graph plots the total goals scored by a hockey team, counted game by game, against the game number. Should the plotted points be connected?",
    key,
    ["Yes: goals build up a little at a time during play, so points between the plotted values would have real meaning",
     "No: the team plays in a different rink each game, so points between the plotted values change too much to use",
     "Yes: a connected graph is always the right choice, so points between the plotted values need no meaning here"],
    "The total can only change by whole goals, one at a time, so fractional totals between games cannot occur. The points should <b>not</b> be connected, because <b>goals are scored one whole goal at a time</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Yes: the plant grows continuously between measurements, so every point along the line has a real meaning";
    return mcq("A graph plots the height of a tomato plant, measured each Sunday, against time in weeks. Should the plotted points be connected?",
    key,
    ["No: the plant is measured in weeks only, so each point on the line would be a guess with no meaning",
     "Yes: the plant grows all at once each Sunday night, so every point along the line has a real meaning as well",
     "No: a connected graph is never the right choice, so every point along the line must be left out of the picture"],
    "The plant grows a little every day, not only on Sundays, so heights between the weekly measurements are real. The points <b>should</b> be connected, because <b>the plant grows continuously between measurements</b>.",
    {stmt:true,keyText:key});}
]));

/* ================= 4. convert between representations (4.4, L2, gen) ================= */
E("u4-represent",4,["4.4"],1,"gen",function(){
  var mode=ri(1,3);
  if(mode===1){
    var xs=shuffle([1,2,3,4,5,6,7,8]).slice(0,4).sort(function(a,b){return a-b;});
    var ys=xs.map(function(){return ri(1,15);});
    var pairs=xs.map(function(x,i){return [x,ys[i]];});
    var key="\\("+u4pairsS(pairs)+"\\)";
    var swapped=xs.map(function(x,i){return [x,ys[(i+1)%4]];});
    var rev=xs.map(function(x,i){return [ys[i],x];});
    var off=pairs.map(function(p,i){return i===0?[p[0],p[1]+1]:p;});
    var ds=u4pickS3(key,["\\("+u4pairsS(swapped)+"\\)","\\("+u4pairsS(rev)+"\\)","\\("+u4pairsS(off)+"\\)"]);
    return mcq("A relation is given in a table: the \\(x\\) values are \\("+xs.join(", ")+"\\) and the matching \\(y\\) values, in the same order, are \\("+ys.join(", ")+"\\). Which set of ordered pairs represents this relation?",
      key,ds,
      "Pair each \\(x\\) value with the \\(y\\) value in the same position: \\[ \\begin{aligned} "+pairs.map(function(p){return "("+p[0]+", "+p[1]+")";}).join(" \\\\ ")+" \\end{aligned} \\] As a set, the relation is <b>\\("+u4pairsS(pairs)+"\\)</b>.",
      {mode:mode,pairs:pairs,keyStr:key});
  }
  if(mode===2){
    var xs2=shuffle([1,2,3,4,5,6,7,8,9]).slice(0,3).sort(function(a,b){return a-b;});
    var ys2=xs2.map(function(){return ri(2,16);});
    var pairs2=xs2.map(function(x,i){return [x,ys2[i]];});
    function desc(prs){return prs.map(function(p){return p[0]+" is paired with "+p[1];}).join(", ");}
    var key2=desc(pairs2);
    var sw=pairs2.map(function(p,i){return [p[0],ys2[(i+1)%3]];});
    var rv=pairs2.map(function(p){return [p[1],p[0]];});
    var ds2=u4pickS3(key2,[desc(sw),desc(rv),desc(pairs2.map(function(p,i){return i===2?[p[0],p[1]+2]:p;}))]);
    return mcq("A relation is given as the set of ordered pairs \\("+u4pairsS(pairs2)+"\\). Which description states the same relation in words?",
      key2,ds2,
      "Read each ordered pair in order, first coordinate first: "+desc(pairs2)+". The description that states the same relation is: <b>"+key2+"</b>.",
      {mode:mode,pairs:pairs2,keyStr:key2});
  }
  var m=pick([-3,-2,-1,1,2,3]),b=ri(-6,8),x0=ri(1,6);
  var y0=m*x0+b,t=0;while((y0< -20||y0>25)&&t<50){b=ri(-6,8);y0=m*x0+b;t++;}
  var key3="\\("+u4pairS(x0,y0)+"\\)";
  var ds3=u4pickS3(key3,["\\("+u4pairS(x0,y0+1)+"\\)","\\("+u4pairS(x0+1,y0)+"\\)","\\("+u4pairS(y0,x0)+"\\)","\\("+u4pairS(x0,-y0)+"\\)","\\("+u4pairS(x0,m+b)+"\\)"]);
  return mcq("A relation is given by the equation \\(y = "+u4lin(m,b)+"\\). Which ordered pair belongs in a table of values for this relation?",
    key3,ds3,
    "Substitute the first coordinate into the equation and check the result: \\[ \\begin{aligned} y &= "+u4lin(m,b)+" \\\\ y &= "+u4num(m)+"("+x0+") + ("+b+") \\\\ &= "+y0+" \\end{aligned} \\] The ordered pair that belongs is <b>\\("+u4pairS(x0,y0)+"\\)</b>.",
    {mode:mode,m:m,b:b,x0:x0,y0:y0,keyStr:key3});
});

/* ================= 5. is a set of pairs a function (4.5, L1, gen) ================= */
E("u4-is-function",4,["4.5"],1,"gen",function(){
  var isFunc=Math.random()<0.5;
  var xs=shuffle([0,1,2,3,4,5,6,7,8]).slice(0,4);
  var pairs,repX,repY1,repY2,outRep,outA,outB;
  if(isFunc){
    var yRep=ri(2,12);
    pairs=xs.map(function(x,i){return [x, i<2?yRep:ri(1,14)];});
    outRep=yRep;
  }else{
    var ys=shuffle([1,2,3,4,5,6,7,8,9,10,11,12,13,14]).slice(0,5);
    pairs=[[xs[0],ys[0]],[xs[1],ys[1]],[xs[2],ys[2]],[xs[0],ys[3]]];
    repX=xs[0];repY1=ys[0];repY2=ys[3];
  }
  pairs=shuffle(pairs);
  var prompt="Consider the relation given by the set of ordered pairs \\("+u4pairsS(pairs)+"\\). Which statement correctly decides whether this relation is a function?";
  var yesKey="Yes, it is a function: each input value is paired with exactly one output value in this set";
  var yesAlt="Yes, it is a function: each output value is paired with exactly one input value in this set";
  var key,sol;
  if(isFunc){
    key=yesKey;
    var fa=pairs[0][0],fb=pairs[0][1],fc=pairs[1][1];
    var dNo="No, it is not a function: one input value, "+fa+", is paired with two outputs, "+fb+" and "+fc;
    var dNo2="No, it is not a function: one output value, "+fb+", is paired with two inputs, "+fa+" and "+fc;
    sol="Check the first coordinates: in \\("+u4pairsS(pairs)+"\\), no input value repeats, so each input has exactly one output. A repeated output is allowed and does not change this. The relation <b>is a function: each input value is paired with exactly one output value</b>.";
    return mcq(prompt,key,[dNo,dNo2,yesAlt],sol,{isFunc:true,pairs:pairs,keyText:key,stmt:true});
  }
  key="No, it is not a function: one input value, "+repX+", is paired with two outputs, "+repY1+" and "+repY2;
  var dNoAlt="No, it is not a function: one output value, "+repY1+", is paired with two inputs, "+repX+" and "+repY2;
  sol="Check the first coordinates: the input \\("+repX+"\\) appears twice, paired with \\("+repY1+"\\) and with \\("+repY2+"\\). One input with two different outputs breaks the rule for a function. The relation <b>is not a function: the input value "+repX+" is paired with two outputs</b>.";
  return mcq(prompt,key,[yesKey,yesAlt,dNoAlt],sol,{isFunc:false,pairs:pairs,repX:repX,repY1:repY1,repY2:repY2,keyText:key,stmt:true});
});

/* ================= 6. relations that are not functions (4.6, L3, var) ================= */
E("u4-relation-not-function",4,["4.6"],3,"var",varset([
  function(){var key="Every function is a relation, but a relation such as pairing one student with every course she takes is not a function";
    return mcq("Which statement correctly explains the link between relations and functions, using an example?",
    key,
    ["Every relation is a function, and a relation such as pairing one student with every course she takes shows this clearly",
     "Some functions are not relations, but a relation such as pairing one student with every course she takes is a function",
     "Every function is a relation, and a relation such as pairing one student with every course she takes is always one too"],
    "A relation is any pairing of inputs with outputs. A function is the special case where each input has exactly one output. One student paired with several courses has one input with several outputs, so that relation is not a function, while every function still counts as a relation. The correct statement is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="A relation fails to be a function when one input has more than one output, as when the number 4 is paired with both 2 and -2";
    return mcq("Which statement correctly explains why some relations are not functions, using an example?",
    key,
    ["A relation fails to be a function when one output has more than one input, as when the number 4 is paired with both 2 and -2",
     "A relation fails to be a function when its outputs are not all whole numbers, as when the number 4 is paired with 2 and -2",
     "A relation fails to be a function when it has more than one pair in it, as when the number 4 is paired with both 2 and -2"],
    "What matters is the inputs: one input may not lead to two different outputs. Pairing \\(4\\) with both \\(2\\) and \\(-2\\) gives one input two outputs, so that relation is not a function. Repeated outputs, by contrast, are allowed. The correct statement is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="All functions are relations because a function is a relation with one extra rule: each input has exactly one output value";
    return mcq("Which statement correctly explains why all functions are relations but not all relations are functions?",
    key,
    ["All relations are functions because a relation is a function with one extra rule: each input has exactly one output value",
     "All functions are relations because a function is a relation with one extra rule: each output has exactly one input value",
     "All functions are relations because a function is a relation with one extra rule: each input has at least one output value"],
    "Start with a relation, any pairing of inputs and outputs, and add the rule that each input has exactly one output: that special relation is a function. So every function is a relation, but a relation that breaks the rule is not a function. The correct statement is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Pairing each person in a class with their eye colour can fail as a function only if one person is given two different colours";
    return mcq("A relation pairs each person in a class with their eye colour. Which statement about this relation is correct?",
    key,
    ["Pairing each person in a class with their eye colour can fail as a function only if one colour is shared by two people",
     "Pairing each person in a class with their eye colour can fail as a function only if the class has more people than colours",
     "Pairing each person in a class with their eye colour can fail as a function only if one person has no colour listed at all here"],
    "Each person is an input and their colour is the output. The relation is a function unless one person, one input, is assigned two different outputs. Two people sharing one colour is a repeated output, which is allowed. The correct statement is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The relation pairing a whole number with its factors is not a function, since one input such as 6 is paired with 1, 2, 3 and 6";
    return mcq("Which statement correctly classifies the relation that pairs each whole number with its factors?",
    key,
    ["The relation pairing a whole number with its factors is a function, since one input such as 6 is paired with 1, 2, 3 and 6",
     "The relation pairing a whole number with its factors is not a function, since one output such as 1 is paired with many inputs in all",
     "The relation pairing a whole number with its factors is a function, since every whole number input has at least one factor"],
    "The number \\(6\\) is one input, and it is paired with several outputs: \\(1, 2, 3\\) and \\(6\\). One input with more than one output means the relation is not a function. The correct statement is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});}
]));

/* ================= 7. sort described graphs (4.7, L2, var) ================= */
E("u4-sort-graphs",4,["4.7"],1,"var",varset([
  function(){var key="Graphs A and C only";
    return mcq("Four graphs are described. Graph A is a straight line with a positive slope. Graph B is a circle. Graph C is a parabola opening upward. Graph D is a vertical line. Which of these graphs represent functions?",
    key,["Graphs A and D only","Graphs B and C only","Graphs A, C and D only"],
    "Use the vertical line test. A straight slanted line and an upward parabola are each met once by any vertical line, so they are functions. A circle and a vertical line are each met more than once by some vertical line, so they are not. The functions are <b>graphs A and C only</b>.",
    {keyText:key});},
  function(){var key="Graphs B and D only";
    return mcq("Four graphs are described. Graph A is a parabola opening to the right. Graph B is a horizontal line. Graph C is a circle. Graph D is a straight line with a negative slope. Which of these graphs represent functions?",
    key,["Graphs A and B only","Graphs C and D only","Graphs B, C and D only"],
    "A horizontal line and a slanted line pass the vertical line test. A sideways parabola and a circle fail it, since a vertical line can meet each of them twice. The functions are <b>graphs B and D only</b>.",
    {keyText:key});},
  function(){var key="Graph C only";
    return mcq("Four graphs are described. Graph A is a vertical line. Graph B is an oval closed curve. Graph C is a parabola opening downward. Graph D is a sideways parabola opening left. Which of these graphs represent functions?",
    key,["Graph A only","Graph B only","Graphs C and D only"],
    "Only the downward parabola passes the vertical line test. A vertical line, a closed oval, and a sideways parabola are each met more than once by some vertical line. The only function is <b>graph C only</b>.",
    {keyText:key});},
  function(){var key="Graphs A, B and D only";
    return mcq("Four graphs are described. Graph A is a V shape opening upward. Graph B is a straight line through the origin. Graph C is a circle. Graph D is a parabola opening upward. Which of these graphs represent functions?",
    key,["Graphs A and B only","Graphs A, C and D only","Graphs B and D only"],
    "The V shape, the line through the origin, and the upward parabola are each met at most once by any vertical line. The circle fails the test. The functions are <b>graphs A, B and D only</b>.",
    {keyText:key});},
  function(){var key="Graphs B and C only";
    return mcq("Four graphs are described. Graph A is a vertical line segment. Graph B is a curve that rises, levels off, then rises again. Graph C is a horizontal line segment. Graph D is a closed oval curve. Which of these graphs represent functions?",
    key,["Graphs A and C only","Graphs A, B and C only","Graphs C and D only"],
    "The rising curve and the horizontal segment each give one height for each input. A vertical segment and a closed oval each fail the vertical line test. The functions are <b>graphs B and C only</b>.",
    {keyText:key});}
]));

/* ================= 8. the general function rule (4.8, L3, var) ================= */
E("u4-function-rule",4,["4.8"],3,"var",varset([
  function(){var key="A relation is a function when each input has exactly one output; on a graph, this means every vertical line meets it at most once";
    return mcq("Which statement gives the general rule for deciding whether a relation is a function, in both of its common forms?",
    key,
    ["A relation is a function when each output has just one input; on a graph, this means every horizontal line meets it at most once",
     "A relation is a function when each input has at least one output; on a graph, this means every vertical line meets it at least once",
     "A relation is a function when each input has exactly one output; on a graph, this means every horizontal line meets it at most once"],
    "The rule is about inputs: each input has exactly one output. On a graph, two points sharing an input lie on one vertical line, so the graph form of the rule is that every vertical line meets the graph at most once. The correct statement is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="It is not a function: the input 5 appears with two different outputs, and one input may have only one output in a function";
    return mcq("A set of ordered pairs contains both \\((5, 2)\\) and \\((5, 9)\\). A student applies the general rule. Which conclusion follows?",
    key,
    ["It is a function: the input 5 appears with two different outputs, and one input may have several outputs in a function",
     "It is not a function: the output 2 appears with two different inputs, and one output may have only one input in a function",
     "It is a function: the input 5 appears with two different outputs, and outputs may repeat freely in any kind of relation"],
    "The general rule says each input has exactly one output. Here the single input \\(5\\) is paired with both \\(2\\) and \\(9\\), so the rule is broken. The correct conclusion is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="It is still a function: outputs may repeat, because the rule only requires each input to have exactly one output of its own";
    return mcq("A table of values has the output \\(7\\) appearing for two different inputs, and no input repeats. A student applies the general rule. Which conclusion follows?",
    key,
    ["It is not a function: outputs may not repeat, because the rule requires each output to belong to exactly one input of its own",
     "It is still a function: inputs may repeat, because the rule only requires each output to have exactly one input of its own",
     "It is not a function: outputs may repeat only in graphs, because the rule for tables requires each output to be used just once"],
    "The rule restricts inputs, not outputs. No input repeats, so each input has exactly one output, and a repeated output is allowed. The correct conclusion is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Draw a vertical line that meets the graph twice; two points at one input value show the relation is not a function at all";
    return mcq("To show that a graphed relation is not a function, which test uses the general rule correctly?",
    key,
    ["Draw a horizontal line that meets the graph twice; two points at one output value show the relation is not a function at all",
     "Draw a vertical line that meets the graph twice; two points at one output value show the relation is not a function",
     "Draw a horizontal line that meets the graph twice; two points at one input value show the relation is not a function at all"],
    "Two points on one vertical line share the same input value but have different outputs, which breaks the rule that each input has exactly one output. The correct test is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Check the first coordinates: if any first coordinate repeats with a different second coordinate, the relation is not a function";
    return mcq("Which procedure correctly applies the general rule to a set of ordered pairs?",
    key,
    ["Check the second coordinates: if any second coordinate repeats with a different first coordinate, the relation is not a function",
     "Check the first coordinates: if any first coordinate repeats with the same second coordinate, the relation is not a function",
     "Check the second coordinates: if any second coordinate repeats with the same first coordinate, the relation is not a function"],
    "The first coordinates are the inputs. A repeated input is a problem only when it comes with a different output; a repeated pair is still one output for that input. The correct procedure is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});}
]));

/* ================= 9. domain or range of graphed data (4.9, L2, gen) ================= */
E("u4-graph-data",4,["4.9"],1,"gen",function(){
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

/* ================= 10. domain and range together (4.10, L2, gen, CR 3) ================= */
E("u4-domain-range",4,["4.10"],1,"gen",function(){
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

/* ================= 11. independent and dependent variables (4.11, L1, gen) ================= */
E("u4-indep-dep",4,["4.11"],1,"gen",function(){
  var profs=[
    {ctx:"A plumber charges by the job",span:["jobs in a month",4,20],indep:"the number of hours the plumber works",dep:"the total charge for the work",extra:["the colour of the plumber van","the day of the week the work is booked"]},
    {ctx:"A bakery sells sourdough loaves at a set price per loaf",span:["days of sales records",3,21],indep:"the number of loaves sold",dep:"the money taken in from loaf sales",extra:["the name of the baker on shift","the colour of the bakery sign"]},
    {ctx:"A cyclist rides at a steady speed on a trail",span:["hours of riding recorded",2,14],indep:"the time spent riding",dep:"the distance covered on the trail",extra:["the brand of the bicycle used","the colour of the rider helmet"]},
    {ctx:"A hall rents tables for community suppers",span:["suppers in a year",4,16],indep:"the number of tables rented",dep:"the total rental cost for the tables",extra:["the menu served at the supper","the name of the hall caretaker"]},
    {ctx:"A student reads a novel at a steady pace",span:["days of reading logged",4,20],indep:"the number of days spent reading",dep:"the number of pages read so far",extra:["the cover design of the novel","the author of the novel"]},
    {ctx:"A greenhouse heater runs on cold nights",span:["nights in a season",10,40],indep:"the number of hours the heater runs",dep:"the amount of fuel the heater uses",extra:["the colour of the greenhouse frame","the type of plants in the beds"]},
    {ctx:"A ferry carries passengers across a harbour",span:["crossings in a week",8,32],indep:"the number of passengers carried",dep:"the total fare money collected",extra:["the name painted on the ferry","the colour of the harbour water"]},
    {ctx:"A knitter makes scarves to sell at a market",span:["weeks of knitting logged",2,14],indep:"the number of scarves finished",dep:"the total length of yarn used up",extra:["the pattern used for the scarves","the colour of the market stall"]},
    {ctx:"A dog walker takes dogs out in small groups",span:["walks in a month",6,24],indep:"the number of walks taken",dep:"the total distance walked with the dogs",extra:["the names of the dogs in the group","the colour of the walker coat"]},
    {ctx:"A guitar teacher gives lessons after school",span:["lessons in a term",8,30],indep:"the number of lessons given",dep:"the total lesson fees collected",extra:["the make of the teacher guitar","the room the lessons are held in"]},
    {ctx:"A market stall sells jars of homemade jam",span:["market days in a season",4,18],indep:"the number of jars sold",dep:"the money taken in from jam sales",extra:["the flavour of jam on display","the colour of the stall canopy"]},
    {ctx:"A lawn care worker mows lawns in a neighbourhood",span:["lawns in a month",10,36],indep:"the number of lawns mowed",dep:"the total mowing charges billed",extra:["the brand of the mower used","the street the lawns are on"]}
  ];
  var prof=pick(profs);
  var spanVal=ri(prof.span[1],prof.span[2]);
  var askDep=Math.random()<0.5;
  var key=askDep?prof.dep:prof.indep;
  var other=askDep?prof.indep:prof.dep;
  var ds=u4pickS3(key,[other,prof.extra[0],prof.extra[1]]);
  return mcq(prof.ctx+", and records are kept over "+spanVal+" "+prof.span[0]+". In this relation, which quantity is the <b>"+(askDep?"dependent":"independent")+" variable</b>?",
    key,ds,
    "The independent variable is the quantity that is chosen or that drives the relation, and the dependent variable is the quantity that results from it. Here "+prof.dep+" results from "+prof.indep+". The <b>"+(askDep?"dependent":"independent")+" variable is "+key+"</b>.",
    {profCtx:prof.ctx,askDep:askDep,keyText:key,spanVal:spanVal});
});

/* ================= 12. domain and range of a linear graph (4.12, L2, gen) ================= */
E("u4-dr-linear",4,["4.12"],1,"gen",function(){
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

/* ================= 13. is a table linear (4.13, L2, gen) ================= */
E("u4-linear-table",4,["4.13"],2,"gen",function(){
  var isLin=Math.random()<0.5;
  var x0=ri(0,4),step=pick([1,2]),y0=ri(1,12);
  var xs=[0,1,2,3].map(function(i){return x0+i*step;});
  var ys,diffs;
  if(isLin){var d=pick([2,3,4,5,6,7]);ys=xs.map(function(x,i){return y0+i*d;});diffs=[d,d,d];}
  else{var d1=pick([2,3,4,5]),d2=d1+pick([1,2,3]);ys=[y0,y0+d1,y0+d1+d2,y0+d1+d2+d2];diffs=[d1,d2,d2];}
  function yesOpt(d){return "Yes, it is linear: the first differences of the outputs stay at "+d+" across the whole table of values shown";}
  function noOpt(a,b){return "No, it is not linear: the first differences of outputs move from "+a+" to "+b+" across the table shown";}
  var key=isLin?yesOpt(diffs[0]):noOpt(diffs[0],diffs[1]);
  var ds=isLin?[yesOpt(diffs[0]+1),noOpt(diffs[0],diffs[0]+1),noOpt(diffs[0]+1,diffs[0])]:[noOpt(diffs[1],diffs[0]),yesOpt(diffs[0]),yesOpt(diffs[1])];
  var dsF=u4pickS3(key,ds);
  return mcq("A table of values has \\(x\\) values \\("+xs.join(", ")+"\\) and matching \\(y\\) values, in the same order, \\("+ys.join(", ")+"\\). The \\(x\\) values increase by a constant step. Which statement correctly decides whether this relation is linear?",
    key,dsF,
    "Work out the first differences of the \\(y\\) values: \\[ \\begin{aligned} "+ys[1]+" - "+ys[0]+" &= "+diffs[0]+" \\\\ "+ys[2]+" - "+ys[1]+" &= "+diffs[1]+" \\\\ "+ys[3]+" - "+ys[2]+" &= "+diffs[2]+" \\end{aligned} \\] "+(isLin?"The differences are all the same, so the relation is linear.":"The differences are not all the same, so the relation is not linear.")+" The correct statement is: <b>"+key+"</b>.",
    {xs:xs,ys:ys,isLin:isLin,keyText:key,stmt:true});
});

/* ================= 14. is a described graph linear (4.14, L1, var) ================= */
E("u4-linear-graph",4,["4.14"],1,"var",varset([
  function(){var key="Yes, it is a linear relation: the graph is a straight line, so the rate of change is the same everywhere";
    return mcq("A graph is described as a single straight line rising from the lower left to the upper right. Which statement correctly decides whether this graph represents a linear relation?",
    key,
    ["No, it is not a linear relation: the graph is a straight line, so the rate of change is the same",
     "Yes, it is a linear relation: the graph is a straight line, so the rate of change grows steadily everywhere",
     "No, it is not a linear relation: the graph is a straight line, so the rate of change changes from point to point"],
    "A linear relation graphs as a straight line, with a constant rate of change. The correct statement is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="No, it is not a linear relation: the graph is a curve, so the rate of change is not the same everywhere on it";
    return mcq("A graph is described as a smooth curve that rises slowly at first and then more and more steeply. Which statement correctly decides whether this graph represents a linear relation?",
    key,
    ["Yes, it is a linear relation: the graph is a curve, so the rate of change is the same everywhere along the graph",
     "No, it is not a linear relation: the graph is a curve, so the rate of change is exactly the same everywhere on it",
     "Yes, it is a linear relation: the graph is a curve, so the rate of change is not the same everywhere along it"],
    "A curve that steepens does not have a constant rate of change, and a linear relation must graph as a straight line. The correct statement is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Yes, it is a linear relation: a horizontal graph is a straight line, so its rate of change is a constant zero";
    return mcq("A graph is described as a single horizontal straight line. Which statement correctly decides whether this graph represents a linear relation?",
    key,
    ["No, it is not a linear relation: a horizontal graph is a straight line, so its rate of change is a constant zero",
     "Yes, it is a linear relation: a horizontal graph is straight, so its rate of change is a changing value",
     "No, it is not a linear relation: a horizontal graph is a straight line, so its rate of change cannot be stated"],
    "A horizontal line is still a straight line, and its rate of change is constantly zero, so it is a linear relation. The correct statement is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="No, it is not a linear relation: the graph bends at its middle point, so it is not one straight line throughout";
    return mcq("A graph is described as two straight pieces joined at a point, rising steeply and then rising gently. Which statement correctly decides whether this graph represents a linear relation?",
    key,
    ["Yes, it is a linear relation: the graph bends at its middle point, so it is not one straight line throughout",
     "No, it is not a linear relation: the graph bends at its middle point, so it is one straight line throughout it",
     "Yes, it is a linear relation: the graph bends at its middle point, so its rate of change stays constant overall"],
    "One linear relation has one constant rate of change and one straight line. Two pieces with different steepness have two different rates of change. The correct statement is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Yes, it is a linear relation: the graph is a straight line, even though it falls rather than rises along its length";
    return mcq("A graph is described as a single straight line falling from the upper left to the lower right. Which statement correctly decides whether this graph represents a linear relation?",
    key,
    ["No, it is not a linear relation: the graph is a straight line, even though it falls rather than rises along it",
     "Yes, it is a linear relation: the graph is a straight line, even though it rises rather than falls along length",
     "No, it is not a linear relation: the graph is a straight line, and a falling line has a rate that changes slowly over time"],
    "Falling lines are straight lines with a constant negative rate of change, so they represent linear relations. The correct statement is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});}
]));

/* ================= 15. is an equation linear (4.15, L2, gen) ================= */
E("u4-linear-equation",4,["4.15"],1,"gen",function(){
  var kind=pick(["linSlope","linSlope","linStd","linVert","sq","prod","recip","ysq","sqrt"]);
  var a=ri(2,6),b=ri(2,7),c=ri(3,12);
  var eqStr,isLin;
  if(kind==="linSlope"){eqStr="y = "+u4lin(pick([-3,-2,2,3,4]),ri(-6,6));isLin=true;}
  else if(kind==="linStd"){eqStr=a+"x + "+b+"y = "+c;isLin=true;}
  else if(kind==="linVert"){eqStr="x = "+ri(-5,7);isLin=true;}
  else if(kind==="sq"){eqStr="y = "+a+"x^2 + "+b;isLin=false;}
  else if(kind==="prod"){eqStr="xy = "+c;isLin=false;}
  else if(kind==="recip"){eqStr="y = "+FR(c,"x");isLin=false;}
  else if(kind==="ysq"){eqStr="y^2 = "+a+"x + "+b;isLin=false;}
  else{eqStr="y = \\sqrt{x} + "+b;isLin=false;}
  function yesOpt(w){return "Yes, it is linear: every variable in the equation appears only to the "+w+" power, with no products of variables";}
  function noOpt(w){return "No, it is not linear: the equation cannot be written with each variable only to the "+w+" power in every term";}
  var key=isLin?yesOpt("first"):noOpt("first");
  var ds=isLin?[yesOpt("third"),noOpt("first"),noOpt("third")]:[noOpt("third"),yesOpt("first"),yesOpt("third")];
  var dsF=u4pickS3(key,ds);
  var reason=isLin?"Every variable appears to the first power only, there is no product of variables, and no variable sits under a root or in a denominator, so the graph is a straight line.":
    "A squared variable, a product of the variables, a variable in a denominator, a squared \\(y\\), or a variable under a root all break the pattern of a linear equation, whose variables appear only to the first power.";
  return mcq("Consider the equation \\("+eqStr+"\\). Which statement correctly decides whether this equation represents a linear relation?",
    key,dsF,
    reason+" The correct statement is: <b>"+key+"</b>.",
    {kind:kind,isLin:isLin,keyText:key,stmt:true});
});

/* ================= 16. are ordered pairs linear (4.16, L2, gen) ================= */
E("u4-pairs-linear",4,["4.16"],2,"gen",function(){
  var isLin=Math.random()<0.5;
  var x0=ri(-3,3),step=pick([1,2,3]),y0=ri(-4,10);
  var xs=[0,1,2,3].map(function(i){return x0+i*step;});
  var ys,slopes;
  if(isLin){var m=pick([1,2,3]);ys=xs.map(function(x){return m*(x-x0)+y0;});slopes=[m,m,m];}
  else{var m1=pick([1,2,3]),m2=m1+pick([1,2]);ys=[y0,y0+m1*step,y0+m1*step+m2*step,y0+m1*step+2*m2*step];slopes=[m1,m2,m2];}
  var pairs=xs.map(function(x,i){return [x,ys[i]];});
  function yesOpt(v){return "Yes, it is linear: the rate of change between pairs stays at "+v+" from one pair to the next pair in the set";}
  function noOpt(a,b){return "No, it is not linear: the rate of change between pairs moves from "+a+" to "+b+" within the set of pairs";}
  var key=isLin?yesOpt(slopes[0]):noOpt(slopes[0],slopes[1]);
  var ds=isLin?[yesOpt(slopes[0]+1),noOpt(slopes[0],slopes[0]+1),noOpt(slopes[0]+1,slopes[0])]:[noOpt(slopes[1],slopes[0]),yesOpt(slopes[0]),yesOpt(slopes[1])];
  var dsF=u4pickS3(key,ds);
  return mcq("A relation is given by the ordered pairs \\("+u4pairsS(pairs)+"\\). The pairs are listed in order of increasing first coordinate. Which statement correctly decides whether this relationship is linear?",
    key,dsF,
    "Compare the change in the second coordinates with the change in the first coordinates between consecutive pairs: \\[ \\begin{aligned} \\text{rates} &= "+slopes.join(", ")+" \\end{aligned} \\] "+(isLin?"The rate of change is the same between every pair, so the relationship is linear.":"The rate of change changes between pairs, so the relationship is not linear.")+" The correct statement is: <b>"+key+"</b>.",
    {pairs:pairs,isLin:isLin,keyText:key,stmt:true});
});

/* ================= 17. rate of change (4.19, L2, gen, num, CR 3) ================= */
E("u4-rate-of-change",4,["4.19"],1,"gen",function(){
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

/* ================= 18. one intercept from an equation (4.28, L2, gen, num, CR 2) ================= */
E("u4-intercepts",4,["4.28"],2,"gen",function(){
  var askX=Math.random()<0.5;
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

/* ================= 19. how many intercepts (4.29, L1, var) ================= */
E("u4-intercept-count",4,["4.29"],1,"var",varset([
  function(){var key="A slanted line that does not pass through the origin";
    return mcq("Which described line has exactly two intercepts, one on each axis, at two different points?",
    key,["A horizontal line above the horizontal axis","A vertical line to the right of the vertical axis","The horizontal axis itself, taken as a line"],
    "A slanted line that misses the origin crosses the horizontal axis once and the vertical axis once, at two different points. A horizontal or vertical line off the axes crosses only one axis, and the horizontal axis meets the vertical axis once while lying along the other. The line is: <b>"+key+"</b>.",
    {keyText:key});},
  function(){var key="A horizontal line above the horizontal axis";
    return mcq("Which described line has exactly one intercept, on the vertical axis only?",
    key,["A slanted line that does not pass through the origin","The vertical axis itself, taken as a line","A vertical line to the right of the vertical axis"],
    "A horizontal line above the axis crosses the vertical axis once and never crosses the horizontal axis, so its only intercept is on the vertical axis. A slanted line missing the origin has two intercepts, the vertical axis coincides with one axis, and a vertical line crosses only the horizontal axis. The line is: <b>"+key+"</b>.",
    {keyText:key});},
  function(){var key="The vertical axis itself, taken as a line";
    return mcq("Which described line has an infinite number of intercepts on one axis?",
    key,["A vertical line to the right of the vertical axis","A horizontal line above the horizontal axis","A slanted line that does not pass through the origin"],
    "A line that coincides with an axis meets that axis at every one of its points, giving infinitely many intercepts on that axis. Lines off the axes cross each axis at most once. The line is: <b>"+key+"</b>.",
    {keyText:key});},
  function(){var key="A slanted line that passes through the origin";
    return mcq("Which described line has its two intercepts at the same single point?",
    key,["A horizontal line above the horizontal axis","A vertical line to the left of the vertical axis","The horizontal axis itself, taken as a line"],
    "A slanted line through the origin crosses both axes at the origin, so its horizontal and vertical intercepts are the same point. The line is: <b>"+key+"</b>.",
    {keyText:key});},
  function(){var key="A vertical line to the left of the vertical axis";
    return mcq("Which described line has exactly one intercept, on the horizontal axis only?",
    key,["A horizontal line below the horizontal axis","A slanted line that does not pass through the origin","The vertical axis itself, taken as a line"],
    "A vertical line away from the vertical axis crosses the horizontal axis once and never reaches the vertical axis, so it has exactly one intercept, on the horizontal axis. The line is: <b>"+key+"</b>.",
    {keyText:key});}
]));

/* ================= 20. match a rate and intercept (4.30, L2, gen) ================= */
E("u4-match-slope-intercept",4,["4.30"],1,"gen",function(){
  var m=pick([-5,-4,-3,-2,-1,1,2,3,4,5]),b=ri(-10,11);
  while(b===m||b===0)b=ri(-10,11);
  var mode=ri(1,2);
  if(mode===1){
    var key="\\(y = "+u4lin(m,b)+"\\)";
    var ds=u4pickS3(key,["\\(y = "+u4lin(-m,b)+"\\)","\\(y = "+u4lin(m,-b)+"\\)","\\(y = "+u4lin(b,m)+"\\)","\\(y = "+u4lin(m,b+2)+"\\)"]);
    return mcq("A linear relation has a rate of change of \\("+m+"\\) and a vertical intercept of \\("+b+"\\). Which equation represents this relation?",
      key,ds,
      "The rate of change is the coefficient of the input and the vertical intercept is the constant term: \\[ \\begin{aligned} y &= "+u4lin(m,b)+" \\end{aligned} \\] The equation is <b>\\(y = "+u4lin(m,b)+"\\)</b>.",
      {mode:mode,m:m,b:b,keyStr:key});
  }
  function graphDesc(mm,bb){return "A line that "+(mm>0?"rises":"falls")+" as it moves right, crossing the vertical axis at \\("+bb+"\\)";}
  var key2=graphDesc(m,b);
  var ds2=u4pickS3(key2,[graphDesc(-m,b),graphDesc(m,-b),graphDesc(m,b+3)]);
  return mcq("A linear relation has a rate of change of \\("+m+"\\) and a vertical intercept of \\("+b+"\\). Which description matches its graph?",
    key2,ds2,
    "A "+(m>0?"positive":"negative")+" rate of change means the line "+(m>0?"rises":"falls")+" to the right, and the vertical intercept says where it crosses the vertical axis, at \\("+b+"\\). The matching description is: <b>"+key2+"</b>.",
    {mode:mode,m:m,b:b,keyStr:key2});
});

/* ================= 21. read a rate and intercept from points (4.31, L2, gen) ================= */
E("u4-read-graph",4,["4.31"],2,"gen",function(){
  var m=pick([-3,-2,-1,-0.5,0.5,1,2,3]),b=ri(-6,7);
  var x1=pick([1,2,3]),x2=x1+pick([2,3,4]);
  var y1=m*x1+b,y2=m*x2+b;
  function optStr(mm,bb){return "Rate of change \\("+u4num(mm)+"\\), vertical intercept \\("+bb+"\\)";}
  var key=optStr(m,b);
  var inv=(m!==0)?(Math.round((1/m)*2)/2):2; if(inv===m)inv=m+1;
  var ds=u4pickS3(key,[optStr(inv,b),optStr(m,-b),optStr(-m,b),optStr(m,b+2)]);
  return mcq("A line passes through the points \\("+u4pairS(x1,y1)+"\\) and \\("+u4pairS(x2,y2)+"\\). Which choice gives the rate of change and the vertical intercept of this line?",
    key,ds,
    "Divide the change in the second coordinates by the change in the first coordinates, then substitute one point to find the intercept: \\[ \\begin{aligned} \\text{rate} &= "+FR(u4num(y2-y1),u4num(x2-x1))+" = "+u4num(m)+" \\\\ b &= "+u4num(y1)+" - ("+u4num(m)+")("+x1+") = "+b+" \\end{aligned} \\] The rate of change is <b>\\("+u4num(m)+"\\)</b> and the vertical intercept is <b>\\("+b+"\\)</b>.",
    {x1:x1,y1:y1,x2:x2,y2:y2,m:m,b:b,keyStr:key});
});

/* ================= 22. contextual linear problem (4.32, L3, gen, CR 3) ================= */
E("u4-context-problem",4,["4.32"],3,"gen",function(){
  var profs=[
    {name:"A community hall rental",item:"rental",startLabel:"booking fee",startUnit:"dollars",rateLabel:"per hour",rateUnit:"dollars per hour",xlab:"hours of rental",ylab:"total cost in dollars"},
    {name:"A water tank on a farm",item:"tank",startLabel:"starting volume",startUnit:"litres",rateLabel:"per minute of draining",rateUnit:"litres per minute",xlab:"minutes of draining",ylab:"volume left in litres",drain:true},
    {name:"A savings jar",item:"jar",startLabel:"starting amount",startUnit:"dollars",rateLabel:"per week",rateUnit:"dollars per week",xlab:"weeks",ylab:"total saved in dollars"},
    {name:"A delivery cargo bike",item:"bike",startLabel:"starting charge",startUnit:"dollars",rateLabel:"per kilometre",rateUnit:"dollars per kilometre",xlab:"kilometres travelled",ylab:"total charge in dollars"}
  ];
  var prof=pick(profs);
  var start=prof.drain?ri(40,90):ri(5,30);
  var rate=prof.drain?pick([2,3,4,5]):pick([3,4,5,6,8,10]);
  var mode=ri(1,3);
  var promptBase=prof.name+" is modelled by a linear relation between "+prof.xlab+" (the input) and "+prof.ylab+" (the output). The relation starts at "+start+" "+prof.startUnit+" when the input is zero, and the output "+(prof.drain?"decreases":"increases")+" at "+rate+" "+prof.rateUnit+".";
  if(mode===1){
    var key="The value "+start+" is the starting amount: it is the output of the relation when the input value is exactly zero";
    var d1="The value "+start+" is the starting amount: it is the input of the relation when the output value is exactly zero";
    var d2="The value "+start+" is the largest amount: it is the greatest output the relation can reach at any input value used";
    var d3="The value "+start+" is the final amount: it is the output of the relation when the input reaches its largest value";
    var ds=u4pickS3(key,[d1,d2,d3]);
    return mcq(promptBase+" In this model, what does the vertical intercept represent?",
      key,ds,
      "The vertical intercept is the output when the input is zero. Here that output is \\("+start+"\\), the amount present before any "+prof.xlab+" have passed. The vertical intercept represents <b>the starting amount, the output when the input is exactly zero</b>.",
      {mode:mode,profName:prof.name,start:start,rate:rate,keyText:key,stmt:true});
  }
  if(mode===2){
    var key2="Each unit increase in the input changes the output by "+rate+" "+prof.rateUnit+", in the "+(prof.drain?"downward":"upward")+" direction each time";
    var d12="Each unit increase in the output changes the input by "+rate+" "+prof.rateUnit+", in the "+(prof.drain?"downward":"upward")+" direction each time";
    var d22="Each unit increase in the input sets the output to "+rate+" "+prof.rateUnit+", no matter what the input value is each time";
    var d32="Each unit increase in the input changes the output by "+rate+" "+prof.rateUnit+", in the "+(prof.drain?"upward":"downward")+" direction each time";
    var ds2=u4pickS3(key2,[d12,d22,d32]);
    return mcq(promptBase+" In this model, what does the rate of change represent?",
      key2,ds2,
      "The rate of change is the change in output for each one unit increase in input. Here the output "+(prof.drain?"falls":"rises")+" by \\("+rate+"\\) for each unit, while the starting value \\("+start+"\\) is the intercept, not the rate. The rate of change represents <b>a change of "+rate+" "+prof.rateUnit+" per unit of input</b>.",
      {mode:mode,profName:prof.name,start:start,rate:rate,keyText:key2,stmt:true});
  }
  var maxIn=prof.drain?Math.floor(start/rate):ri(6,12);
  var maxOut=prof.drain?0:start+rate*maxIn;
  var loOut=prof.drain?0:start, hiOut=prof.drain?start:maxOut;
  function domStr(a,b,whole){return "Domain: "+(whole?"whole numbers":"values")+" from "+a+" to "+b+"; range: values from "+loOut+" to "+hiOut;}
  var whole=prof.drain?false:(prof.item==="bike"?false:true);
  var key3=domStr(0,maxIn,whole);
  var ds3=u4pickS3(key3,[domStr(0,maxIn+5,whole),domStr(start,maxIn,whole),"Domain: "+(whole?"values":"whole numbers")+" from 0 to "+maxIn+"; range: values from "+loOut+" to "+hiOut]);
  return mcq(promptBase+" The model is used only for inputs from zero up to "+maxIn+". Which choice gives a sensible domain and range for the model in this use?",
    key3,ds3,
    "The input starts at zero and is used only up to \\("+maxIn+"\\), and the output then runs from \\("+loOut+"\\) to \\("+hiOut+"\\): \\[ \\begin{aligned} \\text{Domain} &: 0 \\text{ to } "+maxIn+" \\\\ \\text{Range} &: "+loOut+" \\text{ to } "+hiOut+" \\end{aligned} \\] The sensible choice is: <b>"+key3+"</b>.",
    {mode:mode,profName:prof.name,start:start,rate:rate,maxIn:maxIn,loOut:loOut,hiOut:hiOut,keyText:key3});
});

/* ================= 23. match representations of a line (4.37, L2, gen) ================= */
E("u4-match-representations",4,["4.37"],2,"gen",function(){
  var m=pick([-5,-4,-3,-2,-1,1,2,3,4,5]),b=ri(-8,9);
  while(b===0)b=ri(-8,9);
  var mode=ri(1,2);
  var xs=[0,1,2];
  function tableStr(mm,bb){return "\\("+u4pairsS(xs.map(function(x){return [x,mm*x+bb];}))+"\\)";}
  if(mode===1){
    var key=tableStr(m,b);
    var ds=u4pickS3(key,[tableStr(-m,b),tableStr(m,-b),tableStr(m+1,b),tableStr(m,b+2)]);
    return mcq("A linear relation is given by the equation \\(y = "+u4lin(m,b)+"\\). Which set of ordered pairs is a table of values for the same relation?",
      key,ds,
      "Evaluate the equation at each input: \\[ \\begin{aligned} "+xs.map(function(x){return "x = "+x+" &\\Rightarrow y = "+(m*x+b);}).join(" \\\\ ")+" \\end{aligned} \\] The matching table is <b>"+key+"</b>.",
      {mode:mode,m:m,b:b,xs:xs,keyStr:key});
  }
  function graphDesc(mm,bb){return "A line that "+(mm>0?"rises":"falls")+" as it moves right, crossing the vertical axis at \\("+bb+"\\)";}
  var key2=graphDesc(m,b);
  var ds2=u4pickS3(key2,[graphDesc(-m,b),graphDesc(m,-b),graphDesc(-m,-b)]);
  return mcq("A linear relation is given by the equation \\(y = "+u4lin(m,b)+"\\). Which description matches the graph of the same relation?",
    key2,ds2,
    "The coefficient \\("+m+"\\) is "+(m>0?"positive, so the line rises":"negative, so the line falls")+", and the constant \\("+b+"\\) is the vertical intercept. The matching description is: <b>"+key2+"</b>.",
    {mode:mode,m:m,b:b,keyStr:key2});
});

/* ================= 24. write function notation (4.45, L1, gen) ================= */
E("u4-fn-notation",4,["4.45"],1,"gen",function(){
  var m=pick([-5,-4,-3,-2,-1,1,2,3,4,5]),b=ri(-15,16);
  var key="\\(f(x) = "+u4lin(m,b)+"\\)";
  var ds=u4pickS3(key,["\\(f(y) = "+u4lin(m,b)+"\\)","\\(f(x) = "+u4lin(m,-b)+"\\)","\\(f(x) = "+u4lin(-m,b)+"\\)","\\(f(x) = "+u4lin(b===0?m+1:b,m)+"\\)"]);
  if(b===0)ds=u4pickS3(key,["\\(f(y) = "+u4lin(m,b)+"\\)","\\(f(x) = "+u4lin(-m,b)+"\\)","\\(f(x) = "+u4lin(m+1,b)+"\\)"]);
  return mcq("Rewrite the equation \\(y = "+u4lin(m,b)+"\\) using function notation.",
    key,ds,
    "Function notation names the output \\(f(x)\\) in place of \\(y\\), and the rule on the right side stays unchanged: \\[ \\begin{aligned} y &= "+u4lin(m,b)+" \\\\ f(x) &= "+u4lin(m,b)+" \\end{aligned} \\] In function notation, the equation is <b>\\(f(x) = "+u4lin(m,b)+"\\)</b>.",
    {m:m,b:b,keyStr:key});
});

/* ================= 25. convert from function notation (4.46, L1, gen) ================= */
E("u4-fn-convert",4,["4.46"],1,"gen",function(){
  var fn=pick(["f","g","h"]);
  var m=pick([-4,-3,-2,-1,1,2,3,4]),b=ri(-8,9);
  var key="\\(y = "+u4lin(m,b)+"\\)";
  var ds=u4pickS3(key,["\\(x = "+u4lin(m,b)+"\\)","\\(y = "+u4lin(m,-b)+"\\)","\\(y = "+u4lin(-m,b)+"\\)","\\(y = "+u4lin(m,b+2)+"\\)"]);
  if(b===0)ds=u4pickS3(key,["\\(x = "+u4lin(m,b)+"\\)","\\(y = "+u4lin(-m,b)+"\\)","\\(y = "+u4lin(m+1,b)+"\\)"]);
  return mcq("Rewrite the function \\("+fn+"(x) = "+u4lin(m,b)+"\\) as a linear equation in two variables.",
    key,ds,
    "The value \\("+fn+"(x)\\) is the output, which is written as \\(y\\) in a two variable equation, and the rule stays unchanged: \\[ \\begin{aligned} "+fn+"(x) &= "+u4lin(m,b)+" \\\\ y &= "+u4lin(m,b)+" \\end{aligned} \\] As a two variable equation, it is <b>\\(y = "+u4lin(m,b)+"\\)</b>.",
    {fn:fn,m:m,b:b,keyStr:key});
});

/* ================= 26. evaluate a linear function (4.47, L2, gen, num, CR 2) ================= */
E("u4-eval-function",4,["4.47"],1,"gen",function(){
  var fn=pick(["f","g","h"]);
  var m=pick([-4,-3,-2,-1,1,2,3,4,5]),b=ri(-9,10),x0=ri(-5,8);
  var ans=m*x0+b;
  return numq("A linear function is given by \\("+fn+"(x) = "+u4lin(m,b)+"\\). What is the value of \\("+fn+"("+x0+")\\)?",
    ans,0.011,
    "Substitute the given domain value into the function and simplify: \\[ \\begin{aligned} "+fn+"("+x0+") &= "+u4num(m)+"("+x0+") + ("+b+") \\\\ &= "+u4num(m*x0)+" + ("+b+") \\\\ &= "+ans+" \\end{aligned} \\] The value is <b>\\("+ans+"\\)</b>.",
    {fn:fn,m:m,b:b,x0:x0,ans:ans});
});

/* ================= 27. find the input for a given output (4.48, L2, gen, num, CR 2) ================= */
E("u4-solve-input",4,["4.48"],2,"gen",function(){
  var fn=pick(["f","g","h"]);
  var m=pick([-4,-3,-2,-1,1,2,3,4,5]),b=ri(-9,10),xAns=ri(-6,9);
  var target=m*xAns+b;
  return numq("A linear function is given by \\("+fn+"(x) = "+u4lin(m,b)+"\\). For what domain value is \\("+fn+"(x) = "+target+"\\)?",
    xAns,0.011,
    "Set the function equal to the given range value and solve for the input: \\[ \\begin{aligned} "+u4lin(m,b)+" &= "+target+" \\\\ "+u4num(m)+"x &= "+(target-b)+" \\\\ x &= "+xAns+" \\end{aligned} \\] The domain value is <b>\\("+xAns+"\\)</b>.",
    {fn:fn,m:m,b:b,target:target,ans:xAns});
});

/* ================= 28. describe the graph of a function (4.49, L2, var) ================= */
E("u4-sketch-fn",4,["4.49"],1,"var",varset([
  function(){var key="The graph rises to the right and crosses the vertical axis at 3";
    return mcq("A linear function is given by \\(f(x) = 2x + 3\\). Which description matches the graph of this function?",
    key,["The graph falls to the right and crosses the vertical axis at 3","The graph rises to the right and crosses the vertical axis at -3","The graph falls to the right and crosses the vertical axis at -3"],
    "The coefficient of \\(x\\) is \\(2\\), a positive rate of change, so the graph rises to the right. The constant \\(3\\) is the vertical intercept. The matching description is: <b>"+key+"</b>.",
    {keyText:key});},
  function(){var key="The graph falls to the right and crosses the vertical axis at -4";
    return mcq("A linear function is given by \\(f(x) = -3x - 4\\). Which description matches the graph of this function?",
    key,["The graph rises to the right and crosses the vertical axis at -4","The graph falls to the right and crosses the vertical axis at 4","The graph rises to the right and crosses the vertical axis at 4"],
    "The coefficient of \\(x\\) is \\(-3\\), a negative rate of change, so the graph falls to the right. The constant \\(-4\\) is the vertical intercept. The matching description is: <b>"+key+"</b>.",
    {keyText:key});},
  function(){var key="The graph falls to the right and crosses the vertical axis at 5";
    return mcq("A linear function is given by \\(g(x) = -x + 5\\). Which description matches the graph of this function?",
    key,["The graph rises to the right and crosses the vertical axis at 5","The graph falls to the right and crosses the vertical axis at -5","The graph rises to the right and crosses the vertical axis at -5"],
    "The coefficient of \\(x\\) is \\(-1\\), a negative rate of change, so the graph falls to the right. The constant \\(5\\) is the vertical intercept. The matching description is: <b>"+key+"</b>.",
    {keyText:key});},
  function(){var key="The graph rises to the right and crosses the vertical axis at -2";
    return mcq("A linear function is given by \\(h(x) = 4x - 2\\). Which description matches the graph of this function?",
    key,["The graph falls to the right and crosses the vertical axis at -2","The graph rises to the right and crosses the vertical axis at 2","The graph falls to the right and crosses the vertical axis at 2"],
    "The coefficient of \\(x\\) is \\(4\\), a positive rate of change, so the graph rises to the right. The constant \\(-2\\) is the vertical intercept. The matching description is: <b>"+key+"</b>.",
    {keyText:key});},
  function(){var key="The graph is a horizontal line crossing the vertical axis at 6";
    return mcq("A linear function is given by \\(f(x) = 6\\). Which description matches the graph of this function?",
    key,["The graph is a horizontal line crossing the vertical axis at -6","The graph rises to the right and crosses the vertical axis at 6","The graph falls to the right and crosses the vertical axis at 6"],
    "There is no \\(x\\) term, so the rate of change is zero and the output is always \\(6\\): the graph is horizontal, crossing the vertical axis at \\(6\\). The matching description is: <b>"+key+"</b>.",
    {keyText:key});},
  function(){var key="The graph rises to the right and passes through the origin";
    return mcq("A linear function is given by \\(g(x) = 5x\\). Which description matches the graph of this function?",
    key,["The graph falls to the right and passes through the origin","The graph rises to the right and crosses the vertical axis at 5","The graph falls to the right and crosses the vertical axis at 5"],
    "The coefficient of \\(x\\) is \\(5\\), a positive rate of change, so the graph rises to the right, and there is no constant term, so the vertical intercept is zero: the graph passes through the origin. The matching description is: <b>"+key+"</b>.",
    {keyText:key});}
]));

/* ================= 29. error analysis on a function claim (4.5, 4.8, L3, var) ================= */
E("u4-function-error",4,["4.5","4.8"],3,"var",varset([
  function(){var key="The student used the outputs; a repeated output is allowed, and the error is that the input 3 has two outputs, 4 and 7";
    return mcq("A student looks at the relation \\(\\{(3, 4), (5, 4), (3, 7)\\}\\) and says it is a function because the output \\(4\\) repeats in a tidy pattern. Which statement identifies the error and gives the correction?",
    key,
    ["The student used the inputs; a repeated input is allowed, and the error is that the output 4 has two inputs, 3 and 5 in it",
     "The student used the outputs; a repeated output is not allowed, and the error is that the output 4 appears twice in the set",
     "There is no error in the claim; a repeated output is allowed, and the relation is a function as the student says it is"],
    "Check the inputs first: the input \\(3\\) is paired with both \\(4\\) and \\(7\\), two different outputs, so the relation is not a function. A repeated output, such as \\(4\\) for inputs \\(3\\) and \\(5\\), is allowed. The correct statement is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The student trusted the straight shape; a vertical line fails the vertical line test, so the graph is not a function";
    return mcq("A student graphs a vertical line and says it represents a function because the graph is a straight line. Which statement identifies the error and gives the correction?",
    key,
    ["The student trusted the straight shape; a vertical line passes the vertical line test, so the graph is not a function",
     "The student trusted the curved shape; a vertical line fails the horizontal line test, so the graph is not a function",
     "There is no error in the claim; a vertical line fails the vertical line test, so the graph is a function as claimed"],
    "Straightness is not the test for a function. A vertical line itself is a vertical line that meets the graph at many points, all sharing one input with many outputs. The correct statement is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The student reversed the rule; outputs may repeat freely, and this table is a function since no input value repeats at all";
    return mcq("A table has inputs \\(1, 2, 3\\) with outputs \\(6, 6, 9\\). A student says the relation is not a function because the output \\(6\\) repeats. Which statement identifies the error and gives the correction?",
    key,
    ["The student reversed the rule; inputs may repeat freely, and this table is a function since no output value repeats at all",
     "The student reversed the rule; outputs may repeat freely, and this table is not a function since one input value repeats here",
     "There is no error in the claim; outputs may repeat freely, and this table is not a function as the student says it is here"],
    "The function rule limits inputs: each input needs exactly one output. It places no limit on outputs, so the repeated output \\(6\\) is fine, and since no input repeats, the table is a function. The correct statement is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The student checked the outputs only; the correction is to check inputs, and here input 8 is paired with both 1 and 12";
    return mcq("A student checks the relation \\(\\{(8, 1), (2, 5), (8, 12)\\}\\), sees that all the outputs are different, and says it must be a function. Which statement identifies the error and gives the correction?",
    key,
    ["The student checked the inputs only; the correction is to check outputs, and output 1 is paired with both 8 and 12",
     "The student checked the outputs only; the correction is to check inputs, and here all of the inputs are different in the set",
     "There is no error in the claim; the correction is to check inputs, and here input 8 is paired with both 1 and 12 as said"],
    "Different outputs do not settle the question; inputs decide it. The input \\(8\\) appears with both \\(1\\) and \\(12\\), so the relation is not a function. The correct statement is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The student applied the wrong line test; a graph is checked with vertical lines, and this circle fails that test clearly";
    return mcq("A student draws a circle, checks it with a horizontal line, finds the line meets it twice, and says that alone proves it is not a function, with the right conclusion but the wrong test. Which statement identifies the error and gives the correction?",
    key,
    ["The student applied the wrong line test; a graph is checked with horizontal lines, and this circle passes that test clearly",
     "The student applied the right line test; a graph is checked with vertical lines, and this circle fails that test clearly",
     "There is no error in the work at all; a graph is checked with vertical lines, and this circle fails that test clearly too"],
    "The conclusion is right but the test is wrong: the vertical line test is the graph form of the function rule, since points on one vertical line share an input. A horizontal line meeting a graph twice only shows a repeated output, which is allowed. The correct statement is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});}
]));

/* ================= 30. sensible domain or range decision (4.10, 4.12, L3, gen, CR 2) ================= */
E("u4-domain-decision",4,["4.10","4.12"],3,"gen",function(){
  var profs=[
    {name:"A theatre sells tickets for one show",thing:"tickets sold",unit:"tickets",discrete:true,capMin:80,capMax:240,outUnit:"dollars",outPer:12,outBase:0},
    {name:"A bakery sells muffins from one batch",thing:"muffins sold",unit:"muffins",discrete:true,capMin:24,capMax:96,outUnit:"dollars",outPer:3,outBase:0},
    {name:"A pool is filled from empty with a hose",thing:"time spent filling",unit:"minutes",discrete:false,capMin:30,capMax:120,outUnit:"litres",outPer:14,outBase:0},
    {name:"A hiker walks a coastal trail from the trailhead",thing:"time spent walking",unit:"hours",discrete:false,capMin:2,capMax:6,outUnit:"kilometres",outPer:4,outBase:0},
    {name:"A school rents chairs for an assembly",thing:"chairs rented",unit:"chairs",discrete:true,capMin:50,capMax:180,outUnit:"dollars",outPer:2,outBase:25},
    {name:"A kettle heats water from cold",thing:"time spent heating",unit:"minutes",discrete:false,capMin:3,capMax:9,outUnit:"degrees",outPer:11,outBase:8}
  ];
  var prof=pick(profs);
  var cap=ri(prof.capMin,prof.capMax);
  var askRange=prof.discrete?false:(Math.random()<0.5);
  var outMax=prof.outBase+prof.outPer*cap;
  var word=prof.discrete?"whole numbers":"all real values";
  var otherWord=prof.discrete?"all real values":"whole numbers";
  function domStr(w,hi){return "The "+(askRange?"range":"domain")+" is the "+w+" from "+(askRange?prof.outBase:0)+" to "+(askRange?outMax:cap);}
  var key=domStr(word,0);
  var twin="The "+(askRange?"range":"domain")+" is the "+word+" from "+(askRange?(prof.outBase+1):1)+" to "+(askRange?outMax:cap);
  var ds=u4pickS3(key,[domStr(otherWord,0),"The "+(askRange?"range":"domain")+" is the "+word+" from "+(askRange?prof.outBase:0)+" to "+((askRange?outMax:cap)+10),twin]);
  var prompt=prof.name+". The relation pairs "+prof.thing+" with the total in "+prof.outUnit+". "+prof.thing.charAt(0).toUpperCase()+prof.thing.slice(1)+" can run from 0 up to "+cap+" "+prof.unit+", and the total in "+prof.outUnit+" runs from "+prof.outBase+" to "+outMax+". Which statement gives the sensible "+(askRange?"range":"domain")+" for this relation?";
  return mcq(prompt,key,ds,
    "Decide two things: the values "+(prof.discrete?"are whole numbers, since the quantity is counted in whole units":"vary continuously, since the quantity can take any value in between")+", and the span runs from the starting value to the stated limit: \\[ \\begin{aligned} \\text{"+(askRange?"Range":"Domain")+"} &: "+(askRange?prof.outBase:0)+" \\text{ to } "+(askRange?outMax:cap)+" \\end{aligned} \\] The sensible "+(askRange?"range":"domain")+" is <b>"+key+"</b>.",
    {profName:prof.name,discrete:prof.discrete,cap:cap,outBase:prof.outBase,outMax:outMax,asked:askRange?"range":"domain",keyText:key,stmt:true});
});

/* ----- bank-u5.js ----- */
// Math 1201 Unit 5 Linear Functions question bank
// Cut verbatim from the standalone bank source
// (math-1201-review/bank-src.js, lines 3076 to 3697).
// CRMARKS: u5-problem-equation=2
// CRMARKS: u5-slope-rate=3
// CRMARKS: u5-parallel-perp=2
// CRMARKS: u5-slope-context=3
// CRMARKS: u5-context-line=2
// CRMARKS: u5-rewrite-form=2
// CRMARKS: u5-eq-from-graph=3
// CRMARKS: u5-eq-slope-point=2
// CRMARKS: u5-eq-two-points=3
// CRMARKS: u5-eq-parallel-perp=2
// CRMARKS: u5-slope-error=2
/* Math 1201 Review, Unit 5: Linear Functions (tranche 2).
   All scenarios and numbers are original to this bank; sources gave types only.
   Helper prefix: u5. Every entry returns the same question type on every draw.
   No figures: lines and graphs are described in words or by stated points. */

/* ================= u5 helpers ================= */
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

/* ================= 1. problem using an equation (4.17, L2, num, CR 2) ================= */
E("u5-problem-equation",5,["4.17"],2,"gen",function(){
  var mode=ri(1,4);
  if(mode===1){
    var m=pick([12,15,18,20,24,25,30,36]),b=pick([15,20,25,30,40,50,60]),x=ri(2,9),y=m*x+b;
    return numq("A community hall charges a booking fee plus an hourly rate. The total cost, in dollars, is given by \\(C = "+m+"h + "+b+"\\), where \\(h\\) is the number of hours booked. A group pays "+y+" dollars in total. For how many hours did the group book the hall?",
      x,0.001,
      "Set the total cost equal to \\("+y+"\\) and solve for \\(h\\): \\[ \\begin{aligned} "+y+" &= "+m+"h + "+b+" \\\\ "+(y-b)+" &= "+m+"h \\\\ h &= "+x+" \\end{aligned} \\] The group booked the hall for <b>\\("+x+"\\) hours</b>.",
      {mode:mode,m:m,b:b,given:y,ans:x});
  }
  if(mode===2){
    var m2=pick([8,10,12,14,15,16,20,25]),b2=pick([20,30,40,50,60,80,100]),t=ri(2,12),ans=m2*t+b2;
    return numq("A water tank is being filled. The volume of water in the tank, in litres, is given by \\(V = "+m2+"t + "+b2+"\\), where \\(t\\) is the time in minutes since filling started. What is the volume of water in the tank after \\("+t+"\\) minutes?",
      ans,0.001,
      "Substitute \\(t = "+t+"\\) into the equation: \\[ \\begin{aligned} V &= "+m2+"("+t+") + "+b2+" \\\\ &= "+(m2*t)+" + "+b2+" \\\\ &= "+ans+" \\end{aligned} \\] The volume is <b>\\("+ans+"\\) litres</b>.",
      {mode:mode,m:m2,b:b2,given:t,ans:ans});
  }
  if(mode===3){
    var p=pick([8,9,10,11,12,14,15]),q=pick([5,6,7,8,9,10]),a=ri(2,8),c=ri(2,9),tot=p*a+q*c;
    return numq("Adult tickets cost "+p+" dollars each and child tickets cost "+q+" dollars each. The total cost, in dollars, is given by \\(T = "+p+"a + "+q+"c\\), where \\(a\\) is the number of adult tickets and \\(c\\) is the number of child tickets. A group pays "+tot+" dollars in total and buys "+a+" adult tickets. How many child tickets does the group buy?",
      c,0.001,
      "Substitute the total and the number of adult tickets, then solve for \\(c\\): \\[ \\begin{aligned} "+tot+" &= "+p+"("+a+") + "+q+"c \\\\ "+tot+" &= "+(p*a)+" + "+q+"c \\\\ "+(tot-p*a)+" &= "+q+"c \\\\ c &= "+c+" \\end{aligned} \\] The group buys <b>\\("+c+"\\) child tickets</b>.",
      {mode:mode,p:p,q:q,given:a,tot:tot,ans:c});
  }
  var m4=pick([20,25,30,35,40,45,50,60]),b4=pick([30,40,50,60,80,100,120]),x4=ri(2,10),y4=m4*x4+b4;
  return numq("A student is saving toward a goal. The total saved, in dollars, is given by \\(S = "+m4+"w + "+b4+"\\), where \\(w\\) is the number of weeks of saving. The student reaches a total of "+y4+" dollars. For how many weeks has the student been saving?",
    x4,0.001,
    "Set the total saved equal to \\("+y4+"\\) and solve for \\(w\\): \\[ \\begin{aligned} "+y4+" &= "+m4+"w + "+b4+" \\\\ "+(y4-b4)+" &= "+m4+"w \\\\ w &= "+x4+" \\end{aligned} \\] The student has been saving for <b>\\("+x4+"\\) weeks</b>.",
    {mode:mode,m:m4,b:b4,given:y4,ans:x4});
});

/* ================= 2. slope from rise and run (4.18, L1, mcq) ================= */
E("u5-slope-rise-run",5,["4.18"],1,"gen",function(){
  var mode=ri(1,3),rise,run,desc;
  if(mode===3){
    var x1=ri(0,5),y1=ri(0,10),dx=ri(2,8),dy=0;while(dy===0)dy=ri(-9,9);
    rise=dy;run=dx;
    desc="A line segment joins the points \\("+u5pt(x1,y1)+"\\) and \\("+u5pt(x1+dx,y1+dy)+"\\)";
    var prm={mode:mode,x1:x1,y1:y1,x2:x1+dx,y2:y1+dy,ansN:u5red(rise,run)[0],ansD:u5red(rise,run)[1]};
  }else{
    var R=ri(2,24),U=ri(2,24);
    if(mode===1){rise=R;desc="A line segment rises "+R+" units over a horizontal run of "+U+" units";}
    else{rise=-R;desc="A line segment falls "+R+" units over a horizontal run of "+U+" units";}
    run=U;
    var prm={mode:mode,rise:rise,run:run,ansN:u5red(rise,run)[0],ansD:u5red(rise,run)[1]};
  }
  var ar=u5red(rise,run),ansN=ar[0],ansD=ar[1];
  var key="\\("+u5fs(ansN,ansD)+"\\)";
  var cands=["\\("+u5fs(run,rise)+"\\)","\\("+u5fs(-rise,run)+"\\)","\\("+u5fs(rise+run,run)+"\\)","\\("+u5fs(rise,run+rise)+"\\)","\\("+u5fs(rise*2,run)+"\\)"];
  var ds=u5pickS3(key,cands);
  return mcq(desc+". What is the slope of the segment?",
    key,ds,
    "Slope is rise divided by run: \\[ \\begin{aligned} m &= "+u5fs(rise,run)+" \\\\ &= "+u5fs(ansN,ansD)+" \\end{aligned} \\] The slope is <b>\\("+u5fs(ansN,ansD)+"\\)</b>.",
    prm);
});

/* ================= 3. why any two points give the same slope (4.20, L3, var, SR) ================= */
E("u5-slope-any-two",5,["4.20"],3,"var",varset([
  function(){var key="The rise and run between any two points form similar triangles, so the ratio of rise to run stays constant";
    return mcq("Why does using any two points on a straight line always give the same slope?",
    key,
    ["The rise and run between any two points are always equal, so the ratio of rise to run stays constant",
     "The points on a line are evenly spaced along it, so the ratio of rise to run stays the same at each step",
     "The slope formula subtracts the coordinates in reverse order, and that reversal makes every result match exactly"],
    "Join any two pairs of points on the line to the horizontal and vertical steps between them. Those step triangles all have the same shape, so they are similar, and in similar triangles the ratio of the vertical side to the horizontal side is fixed. That ratio is the slope, so <b>any two points give the same slope</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Between points farther apart, the rise and the run both grow by the same factor, so their ratio is unchanged";
    return mcq("Points \\(A\\) and \\(B\\) are close together on a line, and points \\(C\\) and \\(D\\) are far apart on the same line. Why is the slope from \\(C\\) to \\(D\\) the same as the slope from \\(A\\) to \\(B\\)?",
    key,
    ["Between points farther apart, the rise grows but the run stays fixed, so their ratio is unchanged",
     "Between points farther apart, the rise and the run are both equal to the distance, so their ratio is unchanged",
     "Between points farther apart, the coordinates are larger numbers, so their ratio is unchanged"],
    "Moving farther along the same line scales both steps together: the rise and the run are each multiplied by the same factor, and multiplying the top and bottom of a ratio by the same factor leaves the ratio unchanged. So <b>the slope is the same for any two points on the line</b>.",
    {stmt:true,keyText:key});},
  function(){var key="A straight line has a constant rate of change, so the change in y for each unit change in x is the same everywhere";
    return mcq("Which statement best explains why the slope of a line does not depend on which two of its points are chosen?",
    key,
    ["A line has a constant length between points, so the change in y per unit change in x is always the same",
     "A straight line has a constant direction word for it, so the change in y for each unit change in x is the same everywhere",
     "A straight line has coordinates that repeat in a pattern, so the change in y for each unit change in x is the same everywhere"],
    "A line is straight precisely because its rate of change never varies: each unit step in \\(x\\) always comes with the same change in \\(y\\). Slope measures that rate, so it comes out the same no matter which two points are used. The slope is <b>the same for every pair of points</b> because the rate of change is constant.",
    {stmt:true,keyText:key});},
  function(){var key="The step triangles built on any two pairs of points are similar, and similar triangles have equal ratios of matching sides";
    return mcq("A student draws a right triangle under a line using one pair of points, then a larger right triangle using another pair, and gets the same slope both times. Which statement explains this?",
    key,
    ["The step triangles built on any two pairs of points are congruent, and congruent triangles have equal ratios of matching sides",
     "The step triangles built on any two pairs of points have equal areas, and equal areas give equal ratios of matching sides",
     "The step triangles built on any two pairs of points share the line as a side, and a shared side gives equal ratios of matching sides"],
    "Both triangles sit against the same line, so they share its angle with the horizontal and both have a right angle. That makes them similar, and in similar triangles the ratios of matching sides are equal. The ratio of the vertical side to the horizontal side is the slope in both cases, so <b>the two slopes agree</b>.",
    {stmt:true,keyText:key});}
]));

/* ================= 4. slope as a rate of change (4.21, L2, num, CR 3) ================= */
E("u5-slope-rate",5,["4.21"],1,"gen",function(){
  var mode=ri(1,4);
  if(mode===1){
    var v=pick([45,50,55,60,65,70,75,80,90]),off=pick([0,10,20,30]),x1=ri(1,3),dt=ri(2,4),x2=x1+dt,y1=off+v*x1,y2=off+v*x2;
    return numq("A car travels along a highway. After \\("+x1+"\\) hours it is \\("+y1+"\\) km from its starting point, and after \\("+x2+"\\) hours it is \\("+y2+"\\) km from its starting point. The distance grows at a constant rate. What is the slope of the distance and time relation, as a rate of change? Give the rate in kilometres per hour.",
      v,0.001,
      "Slope is the change in distance divided by the change in time: \\[ \\begin{aligned} m &= \\frac{"+y2+" - "+y1+"}{"+x2+" - "+x1+"} \\\\ &= \\frac{"+(y2-y1)+"}{"+(x2-x1)+"} \\\\ &= "+v+" \\end{aligned} \\] As a rate of change, the slope is <b>\\("+v+"\\) kilometres per hour</b>.",
      {mode:mode,x1:x1,x2:x2,y1:y1,y2:y2,ans:v});
  }
  if(mode===2){
    var r=pick([3,4,5,6,8,10,12,15]),start=pick([10,20,30,40,50]),x1b=ri(2,6),dtb=ri(2,5),x2b=x1b+dtb,y1b=start+r*x1b,y2b=start+r*x2b;
    return numq("A tank fills at a constant rate. After \\("+x1b+"\\) minutes the tank holds \\("+y1b+"\\) litres, and after \\("+x2b+"\\) minutes it holds \\("+y2b+"\\) litres. What is the slope of the volume and time relation, as a rate of change? Give the rate in litres per minute.",
      r,0.001,
      "Slope is the change in volume divided by the change in time: \\[ \\begin{aligned} m &= \\frac{"+y2b+" - "+y1b+"}{"+x2b+" - "+x1b+"} \\\\ &= \\frac{"+(y2b-y1b)+"}{"+(x2b-x1b)+"} \\\\ &= "+r+" \\end{aligned} \\] As a rate of change, the slope is <b>\\("+r+"\\) litres per minute</b>.",
      {mode:mode,x1:x1b,x2:x2b,y1:y1b,y2:y2b,ans:r});
  }
  if(mode===3){
    var price=pick([1.5,2.5,3.5,4.5,5.5,6.5]),fee=pick([2,3,4,5,6]),n1=ri(2,5),dtn=ri(2,4),n2=n1+dtn,c1=fee+price*n1,c2=fee+price*n2;
    return numq("A snack stand charges a fixed tray fee plus a price for each item. Buying \\("+n1+"\\) items costs "+c1+" dollars in total, and buying \\("+n2+"\\) items costs "+c2+" dollars in total. What is the slope of the cost and items relation, as a rate of change? Give the rate in dollars per item.",
      price,0.011,
      "Slope is the change in cost divided by the change in the number of items: \\[ \\begin{aligned} m &= \\frac{"+c2+" - "+c1+"}{"+n2+" - "+n1+"} \\\\ &= \\frac{"+(c2-c1)+"}{"+(n2-n1)+"} \\\\ &= "+price+" \\end{aligned} \\] As a rate of change, the slope is <b>\\("+price+"\\) dollars per item</b>.",
      {mode:mode,x1:n1,x2:n2,y1:c1,y2:c2,ans:price});
  }
  var w=pick([16,18,20,22,24,25,28,30]),base=pick([0,15,30,45]),h1=ri(2,5),dth=ri(2,5),h2=h1+dth,e1=base+w*h1,e2=base+w*h2;
  return numq("A worker earns a fixed weekly bonus plus an hourly wage. Working \\("+h1+"\\) hours in a week pays "+e1+" dollars in total, and working \\("+h2+"\\) hours pays "+e2+" dollars in total. What is the slope of the pay and hours relation, as a rate of change? Give the rate in dollars per hour.",
    w,0.001,
    "Slope is the change in pay divided by the change in hours: \\[ \\begin{aligned} m &= \\frac{"+e2+" - "+e1+"}{"+h2+" - "+h1+"} \\\\ &= \\frac{"+(e2-e1)+"}{"+(h2-h1)+"} \\\\ &= "+w+" \\end{aligned} \\] As a rate of change, the slope is <b>\\("+w+"\\) dollars per hour</b>.",
    {mode:mode,x1:h1,x2:h2,y1:e1,y2:e2,ans:w});
});

/* ================= 5. positive or negative slope (4.22, L1, var, SR) ================= */
E("u5-slope-sign",5,["4.22"],1,"var",varset([
  function(){var key="It has a positive slope, because the y values increase as the x values increase along the line";
    return mcq("A line rises as it is read from left to right. Which classification is correct?",
    key,
    ["It has a negative slope, because the y values increase as the x values increase along the line",
     "It has a slope of zero, because the y values increase as the x values increase along the line",
     "It has no defined slope, because the y values increase as the x values increase along the line"],
    "A line that rises from left to right gains height as \\(x\\) grows, so the change in \\(y\\) and the change in \\(x\\) have the same sign and their ratio is positive. The line has a <b>positive slope</b>.",
    {stmt:true,keyText:key});},
  function(){var key="It has a negative slope, because the y values decrease as the x values increase along the line";
    return mcq("A line falls as it is read from left to right. Which classification is correct?",
    key,
    ["It has a positive slope, because the y values decrease as the x values increase along the line",
     "It has a slope of zero, because the y values decrease as the x values increase along the line",
     "It has no defined slope, because the y values decrease as the x values increase along the line"],
    "A line that falls from left to right loses height as \\(x\\) grows, so the change in \\(y\\) is negative while the change in \\(x\\) is positive, and their ratio is negative. The line has a <b>negative slope</b>.",
    {stmt:true,keyText:key});},
  function(){var key="It has a negative slope, because the second point is lower than the first point on the line";
    return mcq("A line passes through the points \\((2, 7)\\) and \\((6, 3)\\). Which classification is correct?",
    key,
    ["It has a positive slope, because the second point is lower than the first point on the line",
     "It has a slope of zero, because the second point is lower than the first point on the line",
     "It has no defined slope, because the second point is lower than the first point on the line"],
    "From the first point to the second, \\(y\\) drops from \\(7\\) to \\(3\\) while \\(x\\) grows from \\(2\\) to \\(6\\), so the rise is negative and the run is positive. The slope is negative: the line has a <b>negative slope</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The harbour path has a positive slope and the hill path has a negative slope, matching how each one is described";
    return mcq("One path rises steadily toward a harbour and another path descends steadily from a hill. Which pairing of slopes is correct?",
    key,
    ["The harbour path has a negative slope and the hill path has a positive slope, matching how each one is described",
     "The harbour path has a positive slope and the hill path has a positive slope, matching how each one is described",
     "The harbour path has a negative slope and the hill path has a negative slope, matching how each one is described"],
    "A path that rises has a positive slope, and a path that descends has a negative slope. So the harbour path has a <b>positive slope</b> and the hill path has a <b>negative slope</b>.",
    {stmt:true,keyText:key});}
]));

/* ================= 6. slope of horizontal and vertical lines (4.23, L1, var, SR) ================= */
E("u5-slope-hv",5,["4.23"],1,"var",varset([
  function(){var key="Its slope is 0, because the y values never change, so the rise is 0 for any run along the line";
    return mcq("What is the slope of a horizontal line, and why?",
    key,
    ["Its slope is not defined, because the y values never change, so the rise is 0 for any run along the line",
     "Its slope is 1, because the y values never change, so the rise is 0 for any run along the line",
     "Its slope is negative, because the y values never change, so the rise is 0 for any run along the line"],
    "On a horizontal line every point has the same \\(y\\) value, so the rise between any two points is \\(0\\), and \\(0\\) divided by any run is \\(0\\). The slope of a horizontal line is <b>0</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Its slope is not a number, because the x values never change, so the run is 0 and division by 0 is not possible";
    return mcq("What is the slope of a vertical line, and why?",
    key,
    ["Its slope is 0, because the x values never change, so the run is 0 and division by 0 is not possible",
     "Its slope is 1, because the x values never change, so the run is 0 and division by 0 is not possible",
     "Its slope is negative, because the x values never change, so the run is 0 and division by 0 is not possible in any case"],
    "On a vertical line every point has the same \\(x\\) value, so the run between any two points is \\(0\\). Slope would need a division by \\(0\\), which is not possible, so a vertical line has <b>no defined slope</b>. Undefined is the standard word for a slope that cannot be computed as a number.",
    {stmt:true,keyText:key});},
  function(){var key="The slope is 0, which means the height stays the same the whole way across the flat stretch of road";
    return mcq("A flat stretch of road is drawn as the horizontal line through points with height \\(4\\) m. What does its slope mean?",
    key,
    ["The slope is not defined, which means the height stays the same the whole way across the flat stretch of road",
     "The slope is 1, which means the height stays the same the whole way across the flat stretch of road",
     "The slope is 4, which means the height stays the same the whole way across the flat stretch of road"],
    "The line is horizontal, so its slope is \\(0\\). A slope of \\(0\\) means there is no rise at all: the height stays the same the whole way across. The slope is <b>0</b>.",
    {stmt:true,keyText:key});},
  function(){var key="No slope value exists for it, which means the wall rises straight up with no horizontal run at all";
    return mcq("A wall face is drawn as the vertical line through points with position \\(3\\) m. What does its slope mean?",
    key,
    ["The slope is 0, which means the wall rises straight up with no horizontal run at all",
     "The slope is 1, which means the wall rises straight up with no horizontal run at all",
     "The slope is 3, which means the wall rises straight up with no horizontal run at all, from its base to its top"],
    "The line is vertical, so the run between any two of its points is \\(0\\), and slope would require dividing by \\(0\\). The line <b>has no defined slope</b>: the wall rises straight up with no horizontal run. Undefined is the standard word for this case.",
    {stmt:true,keyText:key});}
]));

/* ================= 7. draw a line from slope and a point (4.24, L2, mcq) ================= */
E("u5-draw-line",5,["4.24"],1,"gen",function(){
  var sl=u5slopes().filter(function(s){return Math.abs(s[0])!==s[1];});
  var s=pick(sl),mN=s[0],mD=s[1];
  var x=ri(-5,7),y=ri(-4,9),x2=x+mD,y2=y+mN;
  var dirWord=mN>0?("move "+mD+" units right and "+mN+" units up"):("move "+mD+" units right and "+(-mN)+" units down");
  var key="Start at "+u5pt(x,y)+", "+dirWord+" to reach "+u5pt(x2,y2)+", then draw the line through the two points";
  var sx=x+Math.abs(mN),sy=y+(mN>0?mD:-mD);
  var fx=x+mD,fy=y-mN;
  var lx=x-mD,ly=y+mN;
  var d1="Start at "+u5pt(x,y)+", move "+Math.abs(mN)+" units right and "+(mN>0?mD+" units up":mD+" units down")+" to reach "+u5pt(sx,sy)+", then draw the line through the two points";
  var d2="Start at "+u5pt(x,y)+", "+(mN>0?("move "+mD+" units right and "+mN+" units down"):("move "+mD+" units right and "+(-mN)+" units up"))+" to reach "+u5pt(fx,fy)+", then draw the line through the two points";
  var d3="Start at "+u5pt(x,y)+", "+(mN>0?("move "+mD+" units left and "+mN+" units up"):("move "+mD+" units left and "+(-mN)+" units down"))+" to reach "+u5pt(lx,ly)+", then draw the line through the two points";
  var ds=u5pickS3(key,[d1,d2,d3]);
  return mcq("A line has slope \\("+u5fs(mN,mD)+"\\) and passes through the point \\("+u5pt(x,y)+"\\) (coordinates given as \\((x, y)\\)). Which description correctly draws the line?",
    key,ds,
    "Start at the given point and use the slope as rise over run, moving "+mD+" units right and "+mN+" units "+(mN>0?"up":"down (a negative rise)")+": \\[ \\begin{aligned} "+u5pt(x,y)+" &\\to "+u5pt(x2,y2)+" \\end{aligned} \\] Draw the line through those two points. The correct description starts at <b>"+u5pt(x,y)+"</b> and reaches <b>"+u5pt(x2,y2)+"</b>.",
    {mN:mN,mD:mD,x:x,y:y,x2:x2,y2:y2,keyText:key});
});

/* ================= 8. another point on a line (4.25, L2, mcq) ================= */
E("u5-another-point",5,["4.25"],2,"gen",function(){
  var sl=u5slopes().filter(function(s){return Math.abs(s[0])!==s[1];});
  var s=pick(sl),mN=s[0],mD=s[1];
  var x=ri(-6,6),y=ri(-5,9),st=pick([1,2]);
  var x2=x+mD*st,y2=y+mN*st;
  var key=u5pt(x2,y2);
  var candPts=[[x+Math.abs(mN)*st,y+(mN>0?mD*st:-mD*st)],[x+mD*st,y-mN*st],[x+mD*st+1,y+mN*st],[x-mD*st,y-mN*st],[x+mD*(st+1),y+mN*st]];
  var cands=candPts.map(function(p){return u5pt(p[0],p[1]);});
  var ds=u5pickS3(key,cands);
  return mcq("A line has slope \\("+u5fs(mN,mD)+"\\) and passes through the point \\("+u5pt(x,y)+"\\) (coordinates given as \\((x, y)\\)). Which point is also on the line?",
    key,ds,
    "Use the slope as rise over run, taking "+st+(st===1?" step":" steps")+" from the given point: \\[ \\begin{aligned} x &: "+x+" + "+(mD*st)+" = "+x2+" \\\\ y &: "+y+" + "+(mN*st)+" = "+y2+" \\end{aligned} \\] Another point on the line is <b>\\("+u5pt(x2,y2)+"\\)</b>.",
    {mN:mN,mD:mD,x:x,y:y,st:st,x2:x2,y2:y2,keyText:key});
});

/* ================= 9. parallel or perpendicular (4.26, L2, mcq, CR 2) ================= */
E("u5-parallel-perp",5,["4.26"],1,"gen",function(){
  var rel=ri(0,2); /* 0 parallel, 1 perpendicular, 2 neither */
  var s=u5pickSlope(),m1N=s[0],m1D=s[1];
  var b1=ri(-8,8),b2=b1+pick([-5,-4,-3,-2,-1,1,2,3,4,5]);
  var m2N,m2D;
  if(rel===0){m2N=m1N;m2D=m1D;}
  else if(rel===1){var r=u5red(-m1D,m1N);m2N=r[0];m2D=r[1];}
  else{
    var alt=u5slopes().filter(function(t){var a=u5red(t[0],t[1]);var same=(a[0]*m1D===m1N*a[1]);var perp=(a[0]*m1N===-m1D*a[1]);return !same&&!perp;});
    var t2=pick(alt);m2N=t2[0];m2D=t2[1];
  }
  var key=rel===0?"Parallel":rel===1?"Perpendicular":"Neither parallel nor perpendicular";
  var ds=u5pickS3(key,["Parallel","Perpendicular","Neither parallel nor perpendicular","The same line"]);
  var prodNote=rel===1?("The product of the slopes is \\("+u5fs(m1N,m1D)+" \\times "+u5fs(m2N,m2D)+" = -1\\), the test for perpendicular lines."):
    rel===0?("The slopes are equal, \\("+u5fs(m1N,m1D)+" = "+u5fs(m2N,m2D)+"\\), and the intercepts differ, so the lines are parallel and distinct."):
    ("The slopes \\("+u5fs(m1N,m1D)+"\\) and \\("+u5fs(m2N,m2D)+"\\) are not equal, and their product is not \\(-1\\), so the lines meet at one point without being perpendicular.");
  return mcq("Line A is \\("+u5ybRaw(m1N,m1D,b1)+"\\) and Line B is \\("+u5ybRaw(m2N,m2D,b2)+"\\) (each in the form \\(y = mx + b\\)). How are the two lines related?",
    key,ds,
    "Compare the slopes. Line A has slope \\("+u5fs(m1N,m1D)+"\\) and Line B has slope \\("+u5fs(m2N,m2D)+"\\). "+prodNote+" The lines are <b>"+key.toLowerCase()+"</b>.",
    {m1N:m1N,m1D:m1D,b1:b1,m2N:m2N,m2D:m2D,b2:b2,rel:rel,keyText:key});
});

/* ================= 10. contextual slope problem with a decision (4.27, L3, num, CR 3) ================= */
E("u5-slope-context",5,["4.27"],3,"gen",function(){
  var mode=ri(1,4);
  if(mode===1){
    var run=pick([120,144,168,192,216,240,264,288,312,360]),allowed=run/12,extra=pick([3,4,5,6,7,8,9,10,11,12,14,15,16,18,20,22,24]),actual=allowed+extra;
    return numq("A new access ramp rises "+actual+" cm over a horizontal run of "+run+" cm. A building standard allows a slope of at most \\(1\\) unit of rise for every \\(12\\) units of run. By how many centimetres must the rise of this ramp be reduced so that it meets the standard exactly?",
      extra,0.001,
      "The greatest rise the standard allows for this run is found from the limiting slope: \\[ \\begin{aligned} \\text{allowed rise} &= \\frac{"+run+"}{12} \\\\ &= "+allowed+" \\end{aligned} \\] The ramp rises "+actual+" cm, which is over the limit, so it must come down by \\("+actual+" - "+allowed+" = "+extra+"\\). The rise must be reduced by <b>\\("+extra+"\\) cm</b>.",
      {mode:mode,run:run,allowed:allowed,actual:actual,ans:extra});
  }
  if(mode===2){
    var rise=pick([16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,48]),need=12*rise,short=pick([18,24,30,36,42,48,54,60,72,84,96]),run2=need-short;
    return numq("A garden ramp must rise "+rise+" cm. Its horizontal run is currently "+run2+" cm. A safety guide allows a slope of at most \\(1\\) unit of rise for every \\(12\\) units of run. By how many centimetres must the run be lengthened so that the ramp meets the guide exactly?",
      short,0.001,
      "The shortest run the guide allows for this rise is found from the limiting slope: \\[ \\begin{aligned} \\text{needed run} &= 12 \\times "+rise+" \\\\ &= "+need+" \\end{aligned} \\] The run is "+run2+" cm, which is too short, so it must be lengthened by \\("+need+" - "+run2+" = "+short+"\\). The run must be lengthened by <b>\\("+short+"\\) cm</b>.",
      {mode:mode,rise:rise,need:need,run:run2,ans:short});
  }
  if(mode===3){
    var r1=ri(2,14),r2=ri(2,14),t=0;while(r2===r1&&t<50){r2=ri(2,14);t++;}
    var big=Math.max(r1,r2),ans=big/20;
    return numq("Two roofs each span a horizontal run of \\(20\\) m. One roof rises "+r1+" m over that run and the other rises "+r2+" m over that run. Which roof is steeper is decided by comparing slopes. What is the slope of the steeper roof?",
      ans,0.001,
      "With the same run, the roof with the greater rise has the greater slope. Compare the two slopes: \\[ \\begin{aligned} \\text{first slope} &= \\frac{"+r1+"}{20} = "+(r1/20)+" \\\\ \\text{second slope} &= \\frac{"+r2+"}{20} = "+(r2/20)+" \\end{aligned} \\] The steeper roof is the one rising "+big+" m. Its slope is <b>\\("+ans+"\\)</b>.",
      {mode:mode,r1:r1,r2:r2,ans:ans});
  }
  var a1=ri(2,12),gap=pick([3,6,9]),a2=a1+gap,ans2=gap/12;
  return numq("Two garden paths each cover a horizontal run of \\(12\\) m. One path climbs "+a1+" m over that run and the other climbs "+a2+" m over that run. By how much does the slope of the steeper path exceed the slope of the less steep path?",
    ans2,0.001,
    "Find each slope, then subtract: \\[ \\begin{aligned} \\text{steeper slope} &= \\frac{"+a2+"}{12} \\\\ \\text{less steep slope} &= \\frac{"+a1+"}{12} \\\\ \\text{difference} &= \\frac{"+a2+" - "+a1+"}{12} = "+ans2+" \\end{aligned} \\] The slope of the steeper path exceeds the other by <b>\\("+ans2+"\\)</b>.",
    {mode:mode,r1:a1,r2:a2,ans:ans2});
});

/* ================= 11. match a relation to its graph (4.33, L2, mcq) ================= */
E("u5-match-graphs",5,["4.33"],1,"gen",function(){
  var s=u5pickSlope(),mN=s[0],mD=s[1],b=0;while(b===0)b=ri(-9,9);
  var signWord=mN>0?"positive":"negative";
  function desc(sw,bv){return "A line with "+sw+" slope that crosses the y-axis at "+bv;}
  var key=desc(signWord,b);
  var ds=u5pickS3(key,[desc(mN>0?"negative":"positive",b),desc(signWord,-b),desc(mN>0?"negative":"positive",-b),desc(signWord,b+3),desc("zero",b)]);
  return mcq("A graph is described in words only. Which description matches the graph of the relation \\("+u5ybRaw(mN,mD,b)+"\\)?",
    key,ds,
    "In the form \\(y = mx + b\\), the value of \\(m\\) gives the sign of the slope and the value of \\(b\\) gives where the line crosses the y-axis: \\[ \\begin{aligned} m &= "+u5fs(mN,mD)+" \\\\ b &= "+b+" \\end{aligned} \\] The slope is "+signWord+" and the line crosses the y-axis at \\("+b+"\\). The matching description is: <b>"+key+"</b>.",
    {mN:mN,mD:mD,b:b,keyText:key});
});

/* ================= 12. graphing strategies for each form (4.34, L2, var, SR) ================= */
E("u5-graph-strategy",5,["4.34"],1,"var",varset([
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

/* ================= 13. graph a relation in a given form (4.35, L2, mcq) ================= */
E("u5-graph-form",5,["4.35"],2,"gen",function(){
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

/* ================= 14. equation from contextual data, then use it (4.36, L3, num, CR 2) ================= */
E("u5-context-line",5,["4.36"],3,"gen",function(){
  var mode=ri(1,4),m,b,x1,x2,x3,prompt;
  var step=ri(2,4),extra=ri(2,5);x1=ri(1,4);x2=x1+step;x3=x2+extra;
  if(mode===1){m=pick([6,8,10,12,15]);b=pick([5,10,15,20,25]);
    prompt="A bike rental shop keeps a record of its charges. Renting a bike for \\("+x1+"\\) hours costs "+(m*x1+b)+" dollars, and renting for \\("+x2+"\\) hours costs "+(m*x2+b)+" dollars. The cost follows a linear relation. Using the equation of that relation, what is the cost of renting a bike for \\("+x3+"\\) hours, in dollars?";}
  else if(mode===2){m=pick([12,15,18,20,24,30]);b=pick([40,60,80,100,120]);
    prompt="A tank is filling at a steady rate. After \\("+x1+"\\) minutes it holds "+(m*x1+b)+" litres of water, and after \\("+x2+"\\) minutes it holds "+(m*x2+b)+" litres. The volume follows a linear relation. Using the equation of that relation, how many litres does the tank hold after \\("+x3+"\\) minutes?";}
  else if(mode===3){var rate=pick([8,10,12,15,20]);m=-rate;b=pick([240,260,280,300,320,360]);
    prompt="A storage tank is draining at a steady rate. After \\("+x1+"\\) minutes it holds "+(m*x1+b)+" litres of water, and after \\("+x2+"\\) minutes it holds "+(m*x2+b)+" litres. The volume follows a linear relation. Using the equation of that relation, how many litres does the tank hold after \\("+x3+"\\) minutes?";}
  else{m=pick([25,30,40,50,60]);b=pick([20,40,60,80,100]);
    prompt="A student saves the same amount each week. After \\("+x1+"\\) weeks the student has saved "+(m*x1+b)+" dollars in total, and after \\("+x2+"\\) weeks the student has saved "+(m*x2+b)+" dollars in total. The total follows a linear relation. Using the equation of that relation, how many dollars has the student saved after \\("+x3+"\\) weeks?";}
  var y1=m*x1+b,y2=m*x2+b,ans=m*x3+b;
  return numq(prompt,ans,0.001,
    "First find the slope from the two stated values, then the starting value, then evaluate at the new value: \\[ \\begin{aligned} m &= \\frac{"+y2+" - "+y1+"}{"+x2+" - "+x1+"} = "+m+" \\\\ b &= "+y1+" - "+m+"("+x1+") = "+b+" \\\\ \\text{value at } "+x3+" &= "+m+"("+x3+") + "+b+" \\\\ &= "+ans+" \\end{aligned} \\] The value at \\("+x3+"\\) is <b>\\("+ans+"\\)</b>.",
    {mode:mode,m:m,b:b,x1:x1,x2:x2,x3:x3,y1:y1,y2:y2,ans:ans});
});

/* ================= 15. same relation in different forms (4.38, L2, mcq) ================= */
E("u5-compare-forms",5,["4.38"],2,"gen",function(){
  var rel=ri(0,3); /* 0 same line, 1 parallel, 2 perpendicular, 3 intersecting only */
  var s=u5pickSlope(),mN=s[0],mD=s[1],b=ri(-8,8);
  var m2N,m2D,b2;
  if(rel===0){m2N=mN;m2D=mD;b2=b;}
  else if(rel===1){m2N=mN;m2D=mD;b2=b+pick([-4,-3,-2,-1,1,2,3,4]);}
  else if(rel===2){var r=u5red(-mD,mN);m2N=r[0];m2D=r[1];b2=b+pick([-3,-2,-1,1,2,3]);}
  else{
    var alt=u5slopes().filter(function(t){var a=u5red(t[0],t[1]);return !(a[0]*mD===mN*a[1])&&!(a[0]*mN===-mD*a[1]);});
    var t2=pick(alt);m2N=t2[0];m2D=t2[1];b2=ri(-8,8);
  }
  var g=u5genFromLine(m2N,m2D,b2);
  var scale=pick([1,1,2,3]);var A=g[0]*scale,B=g[1]*scale,C=g[2]*scale;
  var key=rel===0?"The graphs are the same line":rel===1?"The graphs are parallel distinct lines":rel===2?"The graphs are perpendicular lines":"The graphs intersect at exactly one point, and are not perpendicular";
  var ds=u5pickS3(key,["The graphs are the same line","The graphs are parallel distinct lines","The graphs are perpendicular lines","The graphs intersect at exactly one point, and are not perpendicular"]);
  var reason=rel===0?("The general form rearranges and scales to the same slope \\("+u5fs(mN,mD)+"\\) and the same intercept \\("+b+"\\), so it is the same relation and the graphs coincide."):
    rel===1?("The second relation has slope \\("+u5fs(m2N,m2D)+"\\) like the first, but intercept \\("+b2+"\\) instead of \\("+b+"\\), so the graphs are parallel and distinct."):
    rel===2?("The second relation has slope \\("+u5fs(m2N,m2D)+"\\), and \\("+u5fs(mN,mD)+" \\times "+u5fs(m2N,m2D)+" = -1\\), so the graphs are perpendicular."):
    ("The second relation has slope \\("+u5fs(m2N,m2D)+"\\), which is neither equal to \\("+u5fs(mN,mD)+"\\) nor its negative reciprocal, so the graphs cross once without being perpendicular.");
  return mcq("One relation is given in slope-intercept form as \\("+u5ybRaw(mN,mD,b)+"\\) and another is given in general form as \\("+u5genRaw(A,B,C)+"\\) (forms: \\(y = mx + b\\) and \\(Ax + By + C = 0\\)). How do their graphs compare?",
    key,ds,
    reason+" The comparison is: <b>"+key+"</b>.",
    {mN:mN,mD:mD,b:b,m2N:m2N,m2D:m2D,b2:b2,rel:rel,keyText:key});
});

/* ================= 16. rewrite a relation in another form (4.39, L2, mcq, CR 2) ================= */
E("u5-rewrite-form",5,["4.39"],2,"gen",function(){
  var mode=ri(1,2);
  var s=u5pickSlope(),mN=s[0],mD=s[1],b=ri(-9,9);
  var g=u5genFromLine(mN,mD,b),A=g[0],B=g[1],C=g[2];
  if(mode===1){
    var key=u5ybOpt(mN,mD,b);
    var ds=u5eqCands([mN,mD,b],[[-mN,mD,b],[mD,mN,b],[mN,mD,-b]]);
    return mcq("Rewrite the relation \\("+u5genRaw(A,B,C)+"\\) (given in general form, \\(Ax + By + C = 0\\)) in slope-intercept form.",
      key,ds,
      "Isolate \\(y\\): move the \\(x\\) term and the constant across, then divide through by the coefficient of \\(y\\): \\[ \\begin{aligned} "+u5genRaw(A,B,C).replace(" = 0","")+" &= 0 \\\\ y &= "+u5coef(mN,mD,"x")+(b>0?" + "+b:b<0?" - "+(-b):"")+" \\end{aligned} \\] In slope-intercept form, the relation is <b>"+key+"</b>.",
      {mode:mode,mN:mN,mD:mD,b:b,A:A,B:B,C:C,keyStr:key});
  }
  var key2="\\("+u5genRaw(A,B,C)+"\\)";
  var alt1=u5genFromLine(-mN,mD,b),alt2=u5genFromLine(mN,mD,-b),alt3=u5genFromLine(mD,mN,b);
  var ds2=u5pickS3(key2,["\\("+u5genRaw(alt1[0],alt1[1],alt1[2])+"\\)","\\("+u5genRaw(alt2[0],alt2[1],alt2[2])+"\\)","\\("+u5genRaw(alt3[0],alt3[1],alt3[2])+"\\)"]);
  return mcq("Rewrite the relation \\("+u5ybRaw(mN,mD,b)+"\\) (given in slope-intercept form, \\(y = mx + b\\)) in general form, with integer coefficients, a positive coefficient for \\(x\\), and the constant on the same side as the variable terms.",
    key2,ds2,
    "Move every term to one side and clear the fraction in the slope: \\[ \\begin{aligned} "+u5ybRaw(mN,mD,b)+" &\\;\\text{ rearranged} \\\\ "+u5genRaw(A,B,C)+" &\\;\\text{ in general form} \\end{aligned} \\] In general form, the relation is <b>"+key2+"</b>.",
    {mode:mode,mN:mN,mD:mD,b:b,A:A,B:B,C:C,keyStr:key2});
});

/* ================= 17. equivalent relations (4.40, L2, mcq) ================= */
E("u5-equivalent",5,["4.40"],2,"gen",function(){
  var s=u5pickSlope(),mN=s[0],mD=s[1],b=ri(-9,9);
  var k=pick([2,3]);
  var g=u5genFromLine(mN,mD,b);
  var key="\\("+u5genRaw(g[0]*k,g[1]*k,g[2]*k)+"\\)";
  function genOpt(mmN,mmD,bb,kk){var gg=u5genFromLine(mmN,mmD,bb);return "\\("+u5genRaw(gg[0]*kk,gg[1]*kk,gg[2]*kk)+"\\)";}
  var ds=u5pickS3(key,[genOpt(-mN,mD,b,1),genOpt(mN,mD,b+pick([2,3]),1),genOpt(mD,mN,b,1),genOpt(mN,mD,-b,2)]);
  return mcq("Which relation is equivalent to \\("+u5ybRaw(mN,mD,b)+"\\) (given in the form \\(y = mx + b\\))? The choices are in general form, \\(Ax + By + C = 0\\).",
    key,ds,
    "Two relations are equivalent when they describe the same line: the same slope and the same intercept. Rearranging the given relation and multiplying through by \\("+k+"\\) gives \\[ \\begin{aligned} "+u5ybRaw(mN,mD,b)+" &\\;\\text{ rearranged and scaled} \\\\ "+key.slice(2,-2)+" &\\;\\text{ in general form} \\end{aligned} \\] The equivalent relation is <b>"+key+"</b>.",
    {mN:mN,mD:mD,b:b,k:k,keyStr:key});
});

/* ================= 18. equation from a described graph (4.41, L2, mcq, CR 3) ================= */
E("u5-eq-from-graph",5,["4.41"],1,"gen",function(){
  var mode=ri(1,2),mN,mD,b,x1,y1,x2,y2,desc;
  if(mode===1){
    var s=u5pickSlope();mN=s[0];mD=s[1];b=ri(-9,9);
    x1=0;y1=b;var st=pick([1,2]);x2=mD*st;y2=b+mN*st;
    desc="A line is described by the points it passes through: \\("+u5pt(x1,y1)+"\\) and \\("+u5pt(x2,y2)+"\\) (coordinates given as \\((x, y)\\))";
  }else{
    b=0;while(b===0)b=ri(-9,9);
    var xi=pick([2,3,4,5,6,8]); /* slope = -b/xi */
    var r=u5red(-b,xi);mN=r[0];mD=r[1];
    x1=xi;y1=0;x2=0;y2=b;
    desc="A line is described by its intercepts: it crosses the x-axis at \\("+u5pt(x1,y1)+"\\) and the y-axis at \\("+u5pt(x2,y2)+"\\) (coordinates given as \\((x, y)\\))";
  }
  var key=u5ybOpt(mN,mD,b);
  var ds=u5eqCands([mN,mD,b],[[-mN,mD,b],[mD,mN,b],[mN,mD,-b],[mN,mD,b+2]]);
  return mcq(desc+". What is the equation of the line in the form \\(y = mx + b\\)?",
    key,ds,
    "Find the slope from the two points, and read the intercept from the point where \\(x = 0\\): \\[ \\begin{aligned} m &= \\frac{"+y2+" - "+y1+"}{"+x2+" - "+x1+"} = "+u5fs(mN,mD)+" \\\\ b &= "+b+" \\\\ y &= "+u5coef(mN,mD,"x")+(b>0?" + "+b:b<0?" - "+(-b):"")+" \\end{aligned} \\] The equation is <b>"+key+"</b>.",
    {mode:mode,mN:mN,mD:mD,b:b,x1:x1,y1:y1,x2:x2,y2:y2,keyStr:key});
});

/* ================= 19. equation given slope and a point (4.42, L2, mcq, CR 2) ================= */
E("u5-eq-slope-point",5,["4.42"],1,"gen",function(){
  var s=u5pickSlope(),mN=s[0],mD=s[1];
  var x=mD*ri(-3,3),y=ri(-9,11),b=y-(mN*x)/mD;
  var key=u5ybOpt(mN,mD,b);
  var bNegSlope=y-((-mN)*x)/mD;
  var ds=u5eqCands([mN,mD,b],[[-mN,mD,bNegSlope],[mN,mD,-b],[mD,mN,b],[mN,mD,b+3]]);
  return mcq("What is the equation, in the form \\(y = mx + b\\), of the line with slope \\("+u5fs(mN,mD)+"\\) that passes through the point \\("+u5pt(x,y)+"\\) (coordinates given as \\((x, y)\\))?",
    key,ds,
    "Substitute the slope and the point into \\(y = mx + b\\) and solve for \\(b\\), reasoning that the point must satisfy the equation: \\[ \\begin{aligned} "+y+" &= ("+u5fs(mN,mD)+")("+x+") + b \\\\ "+y+" &= "+((mN*x)/mD)+" + b \\\\ b &= "+b+" \\end{aligned} \\] The equation is <b>"+key+"</b>.",
    {mN:mN,mD:mD,x:x,y:y,b:b,keyStr:key});
});

/* ================= 20. equation given two points (4.43, L2, mcq, CR 3) ================= */
E("u5-eq-two-points",5,["4.43"],2,"gen",function(){
  var s=u5pickSlope(),mN=s[0],mD=s[1],b=ri(-9,9);
  var x1=mD*ri(-3,2),st=pick([1,2]),x2=x1+mD*st;
  var y1=mN*(x1/mD)+b,y2=mN*(x2/mD)+b;
  var key=u5ybOpt(mN,mD,b);
  var ds=u5eqCands([mN,mD,b],[[-mN,mD,y1-((-mN)*x1)/mD],[mN,mD,-b],[mD,mN,b],[mN,mD,b-3]]);
  return mcq("What is the equation, in the form \\(y = mx + b\\), of the line through the points \\("+u5pt(x1,y1)+"\\) and \\("+u5pt(x2,y2)+"\\) (coordinates given as \\((x, y)\\))?",
    key,ds,
    "First find the slope from the two points, then use one point to find the intercept, reasoning that both points must satisfy the equation: \\[ \\begin{aligned} m &= \\frac{"+y2+" - "+y1+"}{"+x2+" - "+x1+"} = "+u5fs(mN,mD)+" \\\\ b &= "+y1+" - ("+u5fs(mN,mD)+")("+x1+") = "+b+" \\\\ y &= "+u5coef(mN,mD,"x")+(b>0?" + "+b:b<0?" - "+(-b):"")+" \\end{aligned} \\] The equation is <b>"+key+"</b>.",
    {mN:mN,mD:mD,b:b,x1:x1,y1:y1,x2:x2,y2:y2,keyStr:key});
});

/* ================= 21. equation parallel or perpendicular to a given line (4.44, L3, mcq, CR 2) ================= */
E("u5-eq-parallel-perp",5,["4.44"],3,"gen",function(){
  var mode=ri(1,2); /* 1 parallel, 2 perpendicular */
  var s=u5pickSlope(),m1N=s[0],m1D=s[1],b1=ri(-8,8);
  var m2N,m2D;
  if(mode===1){m2N=m1N;m2D=m1D;}
  else{var r=u5red(-m1D,m1N);m2N=r[0];m2D=r[1];}
  var x=m2D*ri(-3,3),y=ri(-9,11),b2=y-(m2N*x)/m2D;
  var key=u5ybOpt(m2N,m2D,b2);
  var wrongN,wrongD;
  if(mode===1){var rw=u5red(-m1D,m1N);wrongN=rw[0];wrongD=rw[1];}
  else{wrongN=m1N;wrongD=m1D;}
  var bWrong=y-(wrongN*x)/wrongD;
  var ds=u5eqCands([m2N,m2D,b2],[[wrongN,wrongD,bWrong],[m2N,m2D,b1],[-m2N,m2D,y-((-m2N)*x)/m2D],[m2N,m2D,b2+3]]);
  var word=mode===1?"parallel":"perpendicular";
  var slopeReason=mode===1?("A parallel line keeps the same slope, \\("+u5fs(m1N,m1D)+"\\)."):("A perpendicular line takes the negative reciprocal slope: \\("+u5fs(m1N,m1D)+"\\) becomes \\("+u5fs(m2N,m2D)+"\\), since the product of the two slopes is \\(-1\\).");
  return mcq("What is the equation, in the form \\(y = mx + b\\), of the line through the point \\("+u5pt(x,y)+"\\) (coordinates given as \\((x, y)\\)) that is "+word+" to the line \\("+u5ybRaw(m1N,m1D,b1)+"\\)?",
    key,ds,
    slopeReason+" Then substitute the new slope and the given point to find the intercept: \\[ \\begin{aligned} "+y+" &= ("+u5fs(m2N,m2D)+")("+x+") + b \\\\ b &= "+b2+" \\end{aligned} \\] The equation is <b>"+key+"</b>.",
    {mode:mode,m1N:m1N,m1D:m1D,b1:b1,m2N:m2N,m2D:m2D,x:x,y:y,b2:b2,keyStr:key});
});

/* ================= 22. error in a slope calculation (4.18, 4.43, L3, num, CR 2) ================= */
E("u5-slope-error",5,["4.18","4.43"],3,"gen",function(){
  var pairs=[[3,1],[2,1],[1,2],[3,2],[5,2],[-2,1],[-3,2],[-1,2],[4,5],[3,4],[5,4],[-4,5],[-3,4],[2,5],[-2,5],[5,1],[-5,2]];
  var pr=pick(pairs),mN=pr[0],mD=pr[1];
  var t=pick([1,2,3]),x1=ri(-6,6),y1=ri(-6,10),x2=x1+mD*t,y2=y1+mN*t;
  var mode=ri(1,3),wrongStr,errorWord;
  if(mode===1){wrongStr=u5fs(mD,mN);errorWord="swapped the rise and the run, dividing the run by the rise";}
  else if(mode===2){wrongStr=u5fs(-mN,mD);errorWord="lost the sign, subtracting the coordinates in opposite orders in the top and bottom";}
  else{wrongStr=u5fs(-mD,mN);errorWord="found the slope of a perpendicular line, taking the negative reciprocal of the true slope";}
  var ans=mN/mD;
  return numq("A line passes through the points \\("+u5pt(x1,y1)+"\\) and \\("+u5pt(x2,y2)+"\\) (coordinates given as \\((x, y)\\)). A student calculates the slope of the line as \\("+wrongStr+"\\), which is not correct. What is the correct slope of the line? Give the slope as a decimal or a whole number.",
    ans,0.001,
    "The student "+errorWord+". The correct calculation subtracts in the same order in the top and the bottom: \\[ \\begin{aligned} m &= \\frac{"+y2+" - "+y1+"}{"+x2+" - "+x1+"} \\\\ &= \\frac{"+(y2-y1)+"}{"+(x2-x1)+"} \\\\ &= "+u5fs(mN,mD)+" \\end{aligned} \\] The correct slope is <b>\\("+u5fs(mN,mD)+"\\)</b>.",
    {mode:mode,x1:x1,y1:y1,x2:x2,y2:y2,mN:mN,mD:mD,ans:ans});
});

/* ================= 23. identify the form of an equation (4.39, L1, mcq) ================= */
E("u5-identify-form",5,["4.39"],1,"gen",function(){
  var mode=ri(1,3),eqStr,key;
  var forms=["General form","Slope-intercept form","Slope-point form","Vertex form"];
  var s=u5pickSlope(),mN=s[0],mD=s[1],b=ri(-9,9);
  var mN2=mN,mD2=mD,b2v=b,x1=0,y1=0;
  if(mode===1){eqStr=u5ybRaw(mN,mD,b);key="Slope-intercept form";}
  else if(mode===2){
    x1=mD*ri(-3,3);y1=ri(-8,10);
    eqStr=u5minusTerm("y",y1)+" = "+u5fs(mN,mD)+"("+u5minusTerm("x",x1)+")";
    if(u5red(mN,mD)[0]===1&&u5red(mN,mD)[1]===1)eqStr=u5minusTerm("y",y1)+" = ("+u5minusTerm("x",x1)+")";
    key="Slope-point form";
  }else{
    var g=u5genFromLine(mN,mD,b),sc=pick([1,2]);
    eqStr=u5genRaw(g[0]*sc,g[1]*sc,g[2]*sc);key="General form";
    var gv={A:g[0]*sc,B:g[1]*sc,C:g[2]*sc};var A2=gv.A,B2=gv.B,C2=gv.C;
    var dsF=u5pickS3(key,forms.filter(function(f){return f!==key;}));
    return mcq("In which form is the linear equation \\("+eqStr+"\\) written?",
      key,dsF,
      "The equation has every term on one side, set equal to \\(0\\), with \\(x\\) and \\(y\\) terms and a constant term, which is the shape of general form. The equation is in <b>general form</b>.",
      {mode:mode,mN:mN,mD:mD,b:b,A:A2,B:B2,C:C2,keyText:key});
  }
  var ds=u5pickS3(key,forms.filter(function(f){return f!==key;}));
  return mcq("In which form is the linear equation \\("+eqStr+"\\) written?",
    key,ds,
    (mode===1?
      "The equation is solved for \\(y\\), with the slope and the y-intercept visible on the right side, which is the shape of slope-intercept form. The equation is in <b>slope-intercept form</b>.":
      "The equation states a point \\("+u5pt(x1,y1)+"\\) on the line and the slope \\("+u5fs(mN,mD)+"\\), in the shape \\(y - y_1 = m(x - x_1)\\), which is slope-point form. The equation is in <b>slope-point form</b>."),
    {mode:mode,mN:mN2,mD:mD2,b:b2v,x1:x1,y1:y1,keyText:key});
});

/* ----- bank-u6.js ----- */
// Math 1201 Unit 6 Systems of Linear Equations question bank
// Cut verbatim from the standalone bank source
// (math-1201-review/bank-src.js, lines 3698 to 4138).
// CRMARKS: u6-solve-graph=3
// CRMARKS: u6-problem=3
// CRMARKS: u6-solve-algebra=3
// CRMARKS: u6-solution-count=2
// CRMARKS: u6-break-even=2
// CRMARKS: u6-solve-elimination=4
// CRMARKS: u6-word-problem=2
/* Math 1201 Review, Unit 6: Systems of Linear Equations (tranche 2).
   All scenarios and numbers are original to this bank; sources gave types only.
   Helper prefix: u6. Every entry returns the same question type on every draw.
   Every system is built solution-first: the integer solution is chosen first,
   then the equations are constructed around it, so keys verify exactly. */

/* ================= u6 helpers ================= */
function u6gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t;}return a||1;}
function u6sgn(n){return n>0?(" + "+n):(n<0?(" - "+(-n)):"");}
function u6coefVar(c,v){if(c===1)return v;if(c===-1)return "-"+v;return c+v;}
function u6slopeTerm(m){return u6coefVar(m,"x");}
function u6yRHS(m,b){return u6slopeTerm(m)+u6sgn(b);}
function u6yEq(m,b){return "y = "+u6yRHS(m,b);}
function u6lhs(a,b){var s=u6coefVar(a,"x");if(b>0)s+=" + "+u6coefVar(b,"y").replace("-","");else if(b<0)s+=" - "+u6coefVar(-b,"y");return s;}
function u6std(a,b,c){return u6lhs(a,b)+" = "+c;}
function u6pair(x,y){return "("+x+", "+y+")";}
function u6pickD3(ans,cands){
  var out=[],seen={};seen[ans]=1;
  for(var i=0;i<cands.length&&out.length<3;i++){var c=cands[i];if(typeof c==="number"&&isFinite(c)&&c!==ans&&!seen[c]){seen[c]=1;out.push(c);}}
  var k=2;while(out.length<3){var c2=ans+k;k++;if(c2!==ans&&!seen[c2]){seen[c2]=1;out.push(c2);}}
  return out;
}
function u6pickS3(ans,cands){
  var out=[],seen={};seen[ans]=1;
  for(var i=0;i<cands.length&&out.length<3;i++){var c=cands[i];if(typeof c==="string"&&c!==ans&&!seen[c]){seen[c]=1;out.push(c);}}
  return out;
}
/* Aligned solution chain for the shared solve of y = m1 x + b1 and y = m2 x + b2
   meeting at (X, Y); ask is "x" or "y". */
function u6meetSol(m1,b1,m2,b2,X,Y,ask){
  return "\\[ \\begin{aligned} "+u6yEq(m1,b1)+" \\\\ "+u6yEq(m2,b2)+" \\end{aligned} \\]"+
  " At the intersection the two \\(y\\) values are equal, so set the right sides equal and solve: \\["+
  "\\begin{aligned} "+u6yRHS(m1,b1)+" &= "+u6yRHS(m2,b2)+" \\\\ "+u6coefVar(m1-m2,"x")+" &= "+(b2-b1)+" \\\\ x &= "+X+" \\end{aligned} \\]"+
  " Substitute \\(x = "+X+"\\) into the first equation to get \\(y\\): \\["+
  "\\begin{aligned} y &= "+m1+"("+X+")"+u6sgn(b1)+" \\\\ y &= "+Y+" \\end{aligned} \\]"+
  " The point of intersection is \\("+u6pair(X,Y)+"\\) (check: the second equation also gives \\("+m2+"("+X+")"+u6sgn(b2)+" = "+Y+"\\), confirming the solution in both equations). The "+(ask==="x"?"x":"y")+"-value is <b>\\("+(ask==="x"?X:Y)+"\\)</b>.";
}

/* ================= 1. model a situation (4.50, L2, gen mcq) ================= */
E("u6-model",6,["4.50"],2,"gen",function(){
  var profs=[
    {intro:"A reader shops at a book fair.",n1:"paperback books",n2:"hardcover books",pair:[4,11]},
    {intro:"A gardener shops at a market stall.",n1:"bags of potatoes",n2:"bags of onions",pair:[5,8]},
    {intro:"A rider buys transit passes at a kiosk.",n1:"single ride passes",n2:"day passes",pair:[3,9]},
    {intro:"A pet owner shops at a supply store.",n1:"cans of cat food",n2:"bags of treats",pair:[2,6]},
    {intro:"A camper rents gear at an outfitter.",n1:"day rentals of kayaks",n2:"day rentals of canoes",pair:[12,18]}
  ];
  var pi=ri(0,profs.length-1),prof=profs[pi];
  var p=prof.pair[0],q=prof.pair[1];
  if(Math.random()<0.5){var tp=p;p=q;q=tp;}
  var X=ri(3,14),Y=ri(3,14),T=X+Y,S=p*X+q*Y;
  var key="\\(x + y = "+T+", \\quad "+p+"x + "+q+"y = "+S+"\\)";
  var d1="\\(x + y = "+S+", \\quad "+p+"x + "+q+"y = "+T+"\\)";
  var d2="\\(x + y = "+T+", \\quad "+q+"x + "+p+"y = "+S+"\\)";
  var d3="\\(x - y = "+T+", \\quad "+p+"x + "+q+"y = "+S+"\\)";
  var ds=u6pickS3(key,[d1,d2,d3]);
  return mcq(prof.intro+" Let \\(x\\) be the number of "+prof.n1+" bought and \\(y\\) be the number of "+prof.n2+" bought. One of the first item costs "+p+" dollars and one of the second item costs "+q+" dollars. In total, "+T+" items are bought for "+S+" dollars. Which system of equations models this situation?",
    key,ds,
    "The count of items gives one equation and the total cost gives the other: \\["+
    "\\begin{aligned} x + y &= "+T+" \\\\ "+p+"x + "+q+"y &= "+S+" \\end{aligned} \\]"+
    " The first equation counts the items, and the second adds each price times its count to reach the total cost in dollars. The system that models the situation is <b>"+key+"</b>.",
    {prof:pi,X:X,Y:Y,p:p,q:q,T:T,S:S,keyText:key});
});

/* ================= 2. relate a system to its context (4.51, L1, var mcq) ================= */
E("u6-relate",6,["4.51"],1,"var",varset([
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

/* ================= 3. meaning of the point of intersection (4.52, L2, var mcq) ================= */
E("u6-intersection",6,["4.52"],1,"var",varset([
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

/* ================= 4. solve graphically from line descriptions (4.53, L2, gen num, CR 3) ================= */
E("u6-solve-graph",6,["4.53"],2,"gen",function(){
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

/* ================= 5. problem solved by a system, setup not announced (4.54, L3, gen num, CR 3) ================= */
E("u6-problem",6,["4.54"],3,"gen",function(){
  var profs=[
    {intro:"A cafe sells baked goods to two customers on the same morning.",n1:"scones",n2:"muffins",buyer:"customer"},
    {intro:"A fruit stand sells bags of fruit to two shoppers on the same day.",n1:"bags of strawberries",n2:"bags of blueberries",buyer:"shopper"},
    {intro:"A craft shop sells supplies to two makers on the same afternoon.",n1:"balls of yarn",n2:"packs of buttons",buyer:"maker"},
    {intro:"A snack cart sells items to two students on the same lunch break.",n1:"granola bars",n2:"trail mix pouches",buyer:"student"}
  ];
  var pi=ri(0,profs.length-1),prof=profs[pi];
  var px=ri(2,7),py=ri(2,7),t0=0;
  while(py===px&&t0<50){py=ri(2,7);t0++;}
  var a1,b1,a2,b2,det=0,t=0;
  while(det===0&&t<200){a1=ri(1,6);b1=ri(1,6);a2=ri(1,6);b2=ri(1,6);det=a1*b2-a2*b1;t++;}
  var T1=a1*px+b1*py,T2=a2*px+b2*py;
  var askX=det>0,ask=askX?"x":"y",ans=askX?px:py,askName=askX?prof.n1:prof.n2;
  var solIntro="Let \\(x\\) be the price, in dollars, of one of the "+prof.n1+", and \\(y\\) be the price, in dollars, of one of the "+prof.n2+". The two purchases give the system \\["+
    "\\begin{aligned} "+u6lhs(a1,b1)+" &= "+T1+" \\\\ "+u6lhs(a2,b2)+" &= "+T2+" \\end{aligned} \\]";
  var sol;
  if(askX){
    sol=solIntro+" Eliminate \\(y\\): multiply the first equation by \\("+b2+"\\) and the second by \\("+b1+"\\), then subtract: \\["+
    "\\begin{aligned} "+u6lhs(a1*b2,b1*b2)+" &= "+(T1*b2)+" \\\\ "+u6lhs(a2*b1,b1*b2)+" &= "+(T2*b1)+" \\\\ "+u6coefVar(det,"x")+" &= "+(T1*b2-T2*b1)+" \\\\ x &= "+px+" \\end{aligned} \\]"+
    " The price of one of the "+prof.n1+" is <b>"+px+" dollars</b>.";
  }else{
    var detY=a2*b1-a1*b2;
    sol=solIntro+" Eliminate \\(x\\): multiply the first equation by \\("+a2+"\\) and the second by \\("+a1+"\\), then subtract the second result from the first: \\["+
    "\\begin{aligned} "+u6lhs(a1*a2,b1*a2)+" &= "+(T1*a2)+" \\\\ "+u6lhs(a2*a1,b2*a1)+" &= "+(T2*a1)+" \\\\ "+u6coefVar(detY,"y")+" &= "+(T1*a2-T2*a1)+" \\\\ y &= "+py+" \\end{aligned} \\]"+
    " The price of one of the "+prof.n2+" is <b>"+py+" dollars</b>.";
  }
  return numq(prof.intro+" The first "+prof.buyer+" buys "+a1+" of the "+prof.n1+" and "+b1+" of the "+prof.n2+", and pays "+T1+" dollars in total. The second "+prof.buyer+" buys "+a2+" of the "+prof.n1+" and "+b2+" of the "+prof.n2+", and pays "+T2+" dollars in total. Prices do not change between the two purchases. What is the price, in dollars, of one of the "+askName+"?",
    ans,0.001,sol,
    {prof:pi,a1:a1,b1:b1,a2:a2,b2:b2,T1:T1,T2:T2,px:px,py:py,ask:ask,ans:ans});
});

/* ================= 6. solve by substitution (4.55, L2, gen num, CR 3) ================= */
E("u6-solve-algebra",6,["4.55"],2,"gen",function(){
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

/* ================= 7. choose a solving strategy (4.56, L2, var mcq) ================= */
E("u6-strategy",6,["4.56"],2,"var",varset([
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

/* ================= 8. number of solutions (4.57, L3, gen mcq, CR 2) ================= */
E("u6-solution-count",6,["4.57"],3,"gen",function(){
  var m1=pick([-3,-2,-1,1,2,3]),b1=ri(-8,8);
  var cls=ri(1,3),m2,b2;
  if(cls===1){m2=pick([-3,-2,-1,1,2,3]);var t=0;while(m2===m1&&t<50){m2=pick([-3,-2,-1,1,2,3]);t++;}b2=ri(-8,8);}
  else if(cls===2){m2=m1;b2=ri(-8,8);var t2=0;while(b2===b1&&t2<50){b2=ri(-8,8);t2++;}}
  else{m2=m1;b2=b1;}
  var rep=ri(1,3);if(cls===3)rep=pick([2,3]);
  var eq2,q=ri(1,3);
  if(rep===1)eq2=u6yEq(m2,b2);
  else if(rep===2)eq2=u6std(-m2*q,q,q*b2);
  else eq2=(q===1?"y":q+"y")+" = "+u6coefVar(m2*q,"x")+u6sgn(q*b2);
  var ansText=(cls===1?"One solution":(cls===2?"No solution":"Infinitely many solutions"));
  var cmp=(cls===1?
    "The slopes are different (\\("+m1+"\\) and \\("+m2+"\\)) so the lines cross at exactly one point.":
    (cls===2?
    "The slopes are the same (\\("+m1+"\\)) but the \\(y\\)-intercepts are different (\\("+b1+"\\) and \\("+b2+"\\)) so the lines are parallel and never meet.":
    "The slopes are the same (\\("+m1+"\\)) and the \\(y\\)-intercepts are the same (\\("+b1+"\\)) so the two equations describe the very same line, and every point on it works."));
  return mcq("How many solutions does this system of equations have? First equation: \\("+u6yEq(m1,b1)+"\\). Second equation: \\("+eq2+"\\).",
    ansText,
    ["No solution","One solution","Infinitely many solutions","Exactly two solutions"].filter(function(s){return s!==ansText;}),
    "Rearrange the second equation into slope-intercept form: \\["+
    "\\begin{aligned} y &= "+u6yRHS(m2,b2)+" \\end{aligned} \\]"+
    " Now compare the two lines. "+cmp+" The system has <b>"+ansText.toLowerCase()+"</b>.",
    {m1:m1,b1:b1,m2:m2,b2:b2,cls:cls,rep:rep,ansText:ansText});
});

/* ================= 9. verify a proposed solution (4.53, 4.55, L1, gen mcq) ================= */
E("u6-verify",6,["4.53","4.55"],1,"gen",function(){
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

/* ================= 10. break-even and cheaper plan (4.54, L3, gen num, CR 2) ================= */
E("u6-break-even",6,["4.54"],3,"gen",function(){
  var profs=[
    {intro:"A community gym offers two class passes.",unit:"classes attended",per:"class attended"},
    {intro:"A print studio offers two pricing plans for posters.",unit:"posters printed",per:"poster printed"},
    {intro:"A boat rental shop offers two pricing plans.",unit:"hours rented",per:"hour rented"},
    {intro:"A mobile provider offers two monthly data plans.",unit:"extra gigabytes used",per:"extra gigabyte used"}
  ];
  var pi=ri(0,profs.length-1),prof=profs[pi];
  var U=ri(4,28),fA=ri(5,60),rB=ri(1,12),dd=ri(1,6);
  var rA=rB+dd,fB=fA+dd*U,mode=ri(1,2);
  var planText="Plan A charges a fee of "+fA+" dollars plus "+rA+" dollars for each "+prof.per+". Plan B charges a fee of "+fB+" dollars plus "+rB+" dollars for each "+prof.per+". Let \\(x\\) be the number of "+prof.unit+" and \\(y\\) be the total cost in dollars.";
  if(mode===1){
    var C=fA+rA*U;
    return numq(prof.intro+" "+planText+" At what number of "+prof.unit+" do the two plans cost exactly the same?",
      U,0.001,
      "The cost equations are \\(y = "+rA+"x"+u6sgn(fA)+"\\) for Plan A and \\(y = "+rB+"x"+u6sgn(fB)+"\\) for Plan B. Set the costs equal and solve: \\["+
      "\\begin{aligned} "+rA+"x"+u6sgn(fA)+" &= "+rB+"x"+u6sgn(fB)+" \\\\ "+u6coefVar(dd,"x")+" &= "+(fB-fA)+" \\\\ x &= "+U+" \\end{aligned} \\]"+
      " At that usage both plans cost \\("+C+"\\) dollars. The plans cost the same at <b>\\("+U+"\\)</b> "+prof.unit+".",
      {prof:pi,mode:mode,fA:fA,rA:rA,fB:fB,rB:rB,U:U,ans:U});
  }
  var U0=ri(3,32),g=0;
  while(U0===U&&g<50){U0=ri(3,32);g++;}
  var CA=fA+rA*U0,CB=fB+rB*U0,ans=Math.min(CA,CB),cheaper=(CA<CB?"Plan A":"Plan B");
  return numq(prof.intro+" "+planText+" When the usage is "+U0+" "+prof.unit+", what is the cost, in dollars, of the cheaper plan?",
    ans,0.001,
    "Use the cost equations \\(y = "+rA+"x"+u6sgn(fA)+"\\) for Plan A and \\(y = "+rB+"x"+u6sgn(fB)+"\\) for Plan B, and evaluate both at \\(x = "+U0+"\\): \\["+
    "\\begin{aligned} \\text{Plan A} &= "+fA+" + "+rA+"("+U0+") = "+CA+" \\\\ \\text{Plan B} &= "+fB+" + "+rB+"("+U0+") = "+CB+" \\end{aligned} \\]"+
    " The lower value is "+cheaper+" at \\("+ans+"\\) dollars (the plans would only tie at \\("+U+"\\) "+prof.unit+"). The cheaper plan costs <b>\\("+ans+"\\) dollars</b>.",
    {prof:pi,mode:mode,fA:fA,rA:rA,fB:fB,rB:rB,U:U,U0:U0,ans:ans});
});

/* ================= 11. solve by elimination (4.55, L2, gen num, CR 2) ================= */
E("u6-solve-elimination",6,["4.55"],2,"gen",function(){
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

/* ================= 12. direct word problems (4.54, L2, gen mcq, CR 2) ================= */
E("u6-word-problem",6,["4.54"],2,"gen",function(){
  var mode=ri(1,4);
  if(mode===1){
    var nL=ri(4,18),nT=ri(3,15),N=nL+nT,V=nL+2*nT;
    var askL=Math.random()<0.5,ans=askL?nL:nT,other=askL?nT:nL;
    var ds=u6pickD3(ans,[other,ans+1,ans-1,ans+2,N]).map(function(v){return ""+v;});
    return mcq("A jar holds only loonies and toonies. There are "+N+" coins in the jar, and their total value is "+V+" dollars. How many "+(askL?"loonies":"toonies")+" are in the jar?",
      ""+ans,ds,
      "Let \\(x\\) be the number of loonies and \\(y\\) be the number of toonies. The coin count and the value give the system \\["+
      "\\begin{aligned} x + y &= "+N+" \\\\ x + 2y &= "+V+" \\end{aligned} \\]"+
      " Subtract the first equation from the second to get \\(y = "+(V-N)+"\\), the number of toonies, and then \\(x = "+N+" - "+(V-N)+" = "+nL+"\\), the number of loonies. The number of "+(askL?"loonies":"toonies")+" is <b>"+ans+"</b>.",
      {mode:mode,N:N,V:V,ans:ans,askL:askL});
  }
  if(mode===2){
    var rtype=ri(1,2),W=ri(4,20),L,relText;
    if(rtype===1){var dd=ri(1,12);L=W+dd;relText="The length is "+dd+" cm more than the width.";}
    else{var kk=pick([2,3]);L=kk*W;relText="The length is "+kk+" times the width.";}
    var P=2*(L+W),askL2=Math.random()<0.5,ans2=askL2?L:W,other2=askL2?W:L;
    var ds2=u6pickD3(ans2,[other2,ans2+1,ans2-1,ans2+2,P/2]).map(function(v){return ""+v;});
    return mcq("The perimeter of a rectangle is "+P+" cm. "+relText+" What is the "+(askL2?"length":"width")+" of the rectangle, in centimetres?",
      ""+ans2,ds2,
      "Let \\(l\\) be the length and \\(w\\) be the width, in centimetres. The perimeter and the stated relation give the system \\["+
      "\\begin{aligned} 2l + 2w &= "+P+" \\\\ l &= "+(rtype===1?("w + "+dd):(kk+"w"))+" \\end{aligned} \\]"+
      " Halving the perimeter equation gives \\(l + w = "+(P/2)+"\\). Substituting the relation and solving gives \\(w = "+W+"\\) and \\(l = "+L+"\\). The "+(askL2?"length":"width")+" is <b>"+ans2+" cm</b>.",
      {mode:mode,rtype:rtype,P:P,dd:(rtype===1?dd:0),kk:(rtype===2?kk:0),ans:ans2,askL:askL2});
  }
  if(mode===3){
    var pa=pick([8,10,12,15]),pc=pick([4,5,6,7]),A=ri(5,25),C=ri(4,20);
    var N3=A+C,T3=pa*A+pc*C,askA=Math.random()<0.5,ans3=askA?A:C,other3=askA?C:A;
    var ds3=u6pickD3(ans3,[other3,ans3+1,ans3-1,ans3+2,N3]).map(function(v){return ""+v;});
    return mcq("A school sells tickets for a play. An adult ticket costs "+pa+" dollars and a child ticket costs "+pc+" dollars. In total, "+N3+" tickets are sold for "+T3+" dollars. How many "+(askA?"adult":"child")+" tickets are sold?",
      ""+ans3,ds3,
      "Let \\(x\\) be the number of adult tickets and \\(y\\) be the number of child tickets. The ticket count and the money collected give the system \\["+
      "\\begin{aligned} x + y &= "+N3+" \\\\ "+pa+"x + "+pc+"y &= "+T3+" \\end{aligned} \\]"+
      " Multiply the first equation by \\("+pc+"\\) and subtract it from the second: \\("+(pa-pc)+"x = "+(T3-pc*N3)+"\\), so \\(x = "+A+"\\) adult tickets, and then \\(y = "+N3+" - "+A+" = "+C+"\\) child tickets. The number of "+(askA?"adult":"child")+" tickets is <b>"+ans3+"</b>.",
      {mode:mode,N:N3,T:T3,pa:pa,pc:pc,ans:ans3,askA:askA});
  }
  var nD=ri(5,20),nQ=ri(4,16),N4=nD+nQ,V4=10*nD+25*nQ;
  var askD=Math.random()<0.5,ans4=askD?nD:nQ,other4=askD?nQ:nD;
  var ds4=u6pickD3(ans4,[other4,ans4+1,ans4-1,ans4+2,N4]).map(function(v){return ""+v;});
  return mcq("A piggy bank holds only dimes and quarters. There are "+N4+" coins in the bank, and their total value is "+V4+" cents. How many "+(askD?"dimes":"quarters")+" are in the bank?",
    ""+ans4,ds4,
    "Let \\(x\\) be the number of dimes and \\(y\\) be the number of quarters. The coin count and the value, in cents, give the system \\["+
    "\\begin{aligned} x + y &= "+N4+" \\\\ 10x + 25y &= "+V4+" \\end{aligned} \\]"+
    " Multiply the first equation by \\(10\\) and subtract it from the second: \\(15y = "+(V4-10*N4)+"\\), so \\(y = "+nQ+"\\) quarters, and then \\(x = "+N4+" - "+nQ+" = "+nD+"\\) dimes. The number of "+(askD?"dimes":"quarters")+" is <b>"+ans4+"</b>.",
    {mode:mode,N:N4,V:V4,ans:ans4,askD:askD});
});

/* ----- bank-u7.js ----- */
// Math 1201 Unit 7 Trigonometry question bank
// Cut verbatim from the standalone bank source
// (math-1201-review/bank-src.js, lines 4139 to 4641).
// CRMARKS: u7-find-angle=2
// CRMARKS: u7-find-side=3
// CRMARKS: u7-find-hypotenuse=2
// CRMARKS: u7-pythagoras=2
// CRMARKS: u7-clinometer=3
// CRMARKS: u7-solve-triangle=3
// CRMARKS: u7-two-triangles=2
// CRMARKS: u7-elevation-decision=2
/* Math 1201 Review, Unit 7: Trigonometry (tranche 2).
   All scenarios and numbers are original to this bank; sources gave types only.
   Helper prefix: u7. Degrees only. Every entry returns the same question
   type on every draw. Figures (added Nov 2026): the ratio, solving and
   setup entries draw a labelled triangle from the drawn values; the
   elevation, decision and Pythagoras entries draw scene diagrams; three
   purely verbal variants of u7-ratio-similar stay figureless. */

/* ================= u7 helpers ================= */
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

/* ================= 1. label sides (7.1, L1, gen mcq) ================= */
E("u7-label-sides",7,["7.1"],1,"gen",function(){
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

/* ================= 2. ratios and similar triangles (7.2, L2, var mcq) ================= */
E("u7-ratio-similar",7,["7.2"],2,"var",varset([
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

/* ================= 3. ratio from stated sides (7.2, L1, gen mcq) ================= */
E("u7-ratio-def",7,["7.2"],1,"gen",function(){
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

/* ================= 4. find a missing angle (7.3, L2, gen num, CR 2) ================= */
E("u7-find-angle",7,["7.3"],2,"gen",function(){
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

/* ================= 5. find a missing side (7.4, L2, gen num, CR 3) ================= */
E("u7-find-side",7,["7.4"],2,"gen",function(){
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

/* ================= 6. find the hypotenuse or a rearranged leg (7.4, L2, gen num, CR 2) ================= */
E("u7-find-hypotenuse",7,["7.4"],2,"gen",function(){
  var V=pick(["A","B"]);
  var oppName=(V==="A"?"BC":"AC"),adjName=(V==="A"?"AC":"BC");
  var theta=pick(U7_ANGLES),mode=ri(1,3),given,targetName,givenText,raw,steps,askWord;
  if(mode===1){
    given=ri(8,40);theta=pick(U7_ANGLES.filter(function(a){return a>=25;}));targetName="AB";askWord="the hypotenuse, AB";
    givenText="the side opposite angle "+V+", "+oppName+", is \\("+given+"\\) cm";
    raw=given/u7sinD(theta);
    steps="\\sin "+theta+"^\\circ &= "+FR(given,"x")+" \\\\ x &= "+FR(given,"\\sin "+theta+"^\\circ")+" \\\\ &\\approx "+u7f1(raw);
  }else if(mode===2){
    given=ri(8,40);theta=pick(U7_ANGLES.filter(function(a){return a<=65;}));targetName="AB";askWord="the hypotenuse, AB";
    givenText="the side adjacent to angle "+V+", "+adjName+", is \\("+given+"\\) cm";
    raw=given/u7cosD(theta);
    steps="\\cos "+theta+"^\\circ &= "+FR(given,"x")+" \\\\ x &= "+FR(given,"\\cos "+theta+"^\\circ")+" \\\\ &\\approx "+u7f1(raw);
  }else{
    given=ri(8,40);theta=pick(U7_ANGLES.filter(function(a){return a>=30&&a<=65;}));targetName=adjName;askWord="side "+adjName;
    givenText="the side opposite angle "+V+", "+oppName+", is \\("+given+"\\) cm";
    raw=given/u7tanD(theta);
    steps="\\tan "+theta+"^\\circ &= "+FR(given,"x")+" \\\\ x &= "+FR(given,"\\tan "+theta+"^\\circ")+" \\\\ &\\approx "+u7f1(raw);
  }
  var ans=u7r1(raw);
  var q=numq("A right triangle ABC has the right angle at C and angle "+V+" is \\("+theta+"^\\circ\\). In the triangle, "+givenText+". Find the length of "+askWord+", in centimetres, to the nearest tenth.",
    ans,0.06,
    "Let \\(x\\) be the length asked for. Write the ratio at angle "+V+" with \\(x\\) in the denominator, then rearrange: \\[ \\begin{aligned} "+steps+" \\end{aligned} \\] The length of "+askWord+" is <b>\\("+u7f1(ans)+"\\) cm</b>.",
    {mode:mode,V:V,theta:theta,given:given,ans:ans});
  var oppV,adjV,hypV;
  if(mode===1){oppV=given;hypV=given/u7sinD(theta);adjV=given/u7tanD(theta);}
  else if(mode===2){adjV=given;hypV=given/u7cosD(theta);oppV=given*u7tanD(theta);}
  else{oppV=given;adjV=given/u7tanD(theta);hypV=given/u7sinD(theta);}
  var oi=(V==="A"?0:1),ai=(V==="A"?1:0);
  var sLab=[null,null,null];
  sLab[mode===2?ai:oi]=given+" cm";
  sLab[mode===3?ai:2]="?";
  var aLab=[null,null,null];aLab[V==="A"?0:1]=theta+"°";
  q.figure=triSVG(V==="A"?oppV:adjV,V==="A"?adjV:oppV,hypV,{L:["A","B","C"],side:sLab,ang:aLab});
  return q;
});

/* ================= 7. Pythagorean theorem in context (7.5, 7.7, L2, gen mcq, CR 2) ================= */
E("u7-pythagoras",7,["7.5","7.7"],2,"gen",function(){
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

/* ================= 8. clinometer indirect measurement (7.5, L3, gen num, CR 3) ================= */
E("u7-clinometer",7,["7.5"],3,"gen",function(){
  var prof=pick([
    {obj:"tree in a park",dLo:12,dHi:30,thHi:50,add:pick([1.5,1.6,1.7]),addWhat:"the observer's eyes are",addUnit:"above the ground"},
    {obj:"office building",art:"an",dLo:25,dHi:60,thHi:62,add:pick([1.5,1.6,1.7]),addWhat:"the observer's eyes are",addUnit:"above the ground"},
    {obj:"wind turbine, measured to the top of its tower",dLo:40,dHi:80,thHi:50,add:pick([1.5,1.6]),addWhat:"the observer's eyes are",addUnit:"above the ground"},
    {obj:"flagpole in a schoolyard",dLo:8,dHi:18,thHi:48,add:1.2,addWhat:"the clinometer sits on a tripod",addUnit:"above the ground"},
    {obj:"lighthouse on a point of land",dLo:20,dHi:45,thHi:42,add:pick([1.6,1.7,1.8]),addWhat:"the observer's eyes are",addUnit:"above the ground"}
  ]);
  var dist=ri(prof.dLo,prof.dHi),theta=pick(U7_ANGLES.filter(function(a){return a>=24&&a<=prof.thHi;}));
  var above=dist*u7tanD(theta),raw=above+prof.add,ans=u7r1(raw);
  var q=numq("A student uses a clinometer to measure the height of "+(prof.art||"a")+" "+prof.obj+". Standing on level ground \\("+dist+"\\) m from its base, the student measures an angle of elevation of \\("+theta+"^\\circ\\) to the top, and "+prof.addWhat+" \\("+prof.add+"\\) m "+prof.addUnit+". Find the height of the "+prof.obj.split(",")[0]+", in metres, to the nearest tenth.",
    ans,0.06,
    "The clinometer reading gives the height above the instrument level first; the instrument height is added at the end: \\[ \\begin{aligned} \\tan "+theta+"^\\circ &= "+FR("h",""+dist)+" \\\\ h &= "+dist+" \\times \\tan "+theta+"^\\circ \\\\ &\\approx "+u7f1(above)+" \\\\ \\text{height} &= "+u7f1(above)+" + "+prof.add+" \\\\ &\\approx "+u7f1(ans)+" \\end{aligned} \\] The height is <b>\\("+u7f1(ans)+"\\) m</b>.",
    {dist:dist,theta:theta,add:prof.add,ans:ans});
  q.figure=u7elevSVG({objX:dist,objH:ans,objLabel:"?",obs:[{x:0,eye:prof.add,eyeLabel:prof.add+" m",sights:[{y:ans,ang:theta+"°"}]}],ground:[{x1:0,x2:dist,label:dist+" m"}]});
  return q;
});

/* ================= 9. solve a right triangle (7.6, L2, gen num, CR 3) ================= */
E("u7-solve-triangle",7,["7.6"],2,"gen",function(){
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

/* ================= 10. two right triangles (7.7, L3, gen num, CR 2) ================= */
E("u7-two-triangles",7,["7.7"],3,"gen",function(){
  var mode=ri(1,3);
  if(mode===1){
    var D=ri(40,120),a1=pick([28,30,32,35,38,40,42,45]),a2=pick([35,38,40,42,45,48,50,52,55]),tries=0;
    while(Math.abs(a1-a2)<8&&tries<50){a2=pick([35,38,40,42,45,48,50,52,55]);tries++;}
    var eye=pick([1.5,1.6,1.7]);
    var hSight=D/(1/u7tanD(a1)+1/u7tanD(a2)),raw=hSight+eye,ans=u7r1(raw);
    var q=numq("Two observers stand on level ground on opposite sides of a water tower, \\("+D+"\\) m apart, with the tower between them. Their eyes are each \\("+eye+"\\) m above the ground. From one side, the angle of elevation to the top of the tower is \\("+a1+"^\\circ\\); from the other side, it is \\("+a2+"^\\circ\\). Find the height of the tower, in metres, to the nearest tenth.",
      ans,0.06,
      "Let \\(h\\) be the height of the tower above eye level. The two ground distances are \\("+FR("h","\\tan "+a1+"^\\circ")+"\\) and \\("+FR("h","\\tan "+a2+"^\\circ")+"\\), and together they make \\("+D+"\\) m: \\[ \\begin{aligned} h &= \\frac{"+D+"}{\\frac{1}{\\tan "+a1+"^\\circ} + \\frac{1}{\\tan "+a2+"^\\circ}} \\\\ &\\approx "+u7f1(hSight)+" \\\\ \\text{height} &= "+u7f1(hSight)+" + "+eye+" \\\\ &\\approx "+u7f1(ans)+" \\end{aligned} \\] The height of the tower is <b>\\("+u7f1(ans)+"\\) m</b>.",
      {mode:mode,D:D,a1:a1,a2:a2,eye:eye,ans:ans});
    var hAbv=ans-eye;
    q.figure=u7elevSVG({objX:hAbv/u7tanD(a1),objH:ans,objLabel:"?",obs:[{x:0,eye:eye,eyeLabel:eye+" m",sights:[{y:ans,ang:a1+"°"}]},{x:D,eye:eye,sights:[{y:ans,ang:a2+"°"}]}],ground:[{x1:0,x2:D,label:D+" m"}]});
    return q;
  }
  if(mode===2){
    var d=ri(15,45),far=pick([25,28,30,32,35,38]),near=pick([42,45,48,50,52,55,58]),tr2=0;
    while(near-far<12&&tr2<50){near=pick([42,45,48,50,52,55,58]);tr2++;}
    var eye2=pick([1.5,1.6,1.7]);
    var hS=d*u7tanD(far)*u7tanD(near)/(u7tanD(near)-u7tanD(far)),raw2=hS+eye2,ans2=u7r1(raw2);
    var q=numq("A surveyor measures the height of a cliff from two points on level ground on the same side of the cliff. The points are \\("+d+"\\) m apart, in line with the base of the cliff, and the surveyor's eyes are \\("+eye2+"\\) m above the ground at each point. From the farther point, the angle of elevation to the top of the cliff is \\("+far+"^\\circ\\); from the nearer point, it is \\("+near+"^\\circ\\). Find the height of the cliff, in metres, to the nearest tenth.",
      ans2,0.06,
      "Let \\(h\\) be the height of the cliff above eye level and \\(x\\) the distance from the nearer point to the base. Then \\(h = x \\tan "+near+"^\\circ\\) and \\(h = (x + "+d+") \\tan "+far+"^\\circ\\) in the two triangles. Solving the pair for \\(h\\): \\[ \\begin{aligned} h &= \\frac{"+d+" \\times \\tan "+far+"^\\circ \\times \\tan "+near+"^\\circ}{\\tan "+near+"^\\circ - \\tan "+far+"^\\circ} \\\\ &\\approx "+u7f1(hS)+" \\\\ \\text{height} &= "+u7f1(hS)+" + "+eye2+" \\\\ &\\approx "+u7f1(ans2)+" \\end{aligned} \\] The height of the cliff is <b>\\("+u7f1(ans2)+"\\) m</b>.",
      {mode:mode,d:d,far:far,near:near,eye:eye2,ans:ans2});
    var hAbv2=ans2-eye2;
    q.figure=u7elevSVG({objX:d+hAbv2/u7tanD(near),objH:ans2,objLabel:"?",obs:[{x:0,eye:eye2,eyeLabel:eye2+" m",sights:[{y:ans2,ang:far+"°"}]},{x:d,eye:eye2,sights:[{y:ans2,ang:near+"°"}]}],ground:[{x1:0,x2:d,label:d+" m"}]});
    return q;
  }
  var hs=pick([12,15,18,20,24]),dep=pick([30,35,40,45]),elev=pick([25,30,35,40,45,50]);
  var distB=hs/u7tanD(dep),topPart=distB*u7tanD(elev),raw3=hs+topPart,ans3=u7r1(raw3);
  var q=numq("From the flat roof of a shorter building \\("+hs+"\\) m tall, a student measures the taller building across the street. The angle of depression to the base of the taller building is \\("+dep+"^\\circ\\), and the angle of elevation to its top is \\("+elev+"^\\circ\\). Find the height of the taller building, in metres, to the nearest tenth.",
    ans3,0.06,
    "The depression triangle gives the horizontal distance between the buildings first; the elevation triangle then gives the part of the taller building above the roof: \\[ \\begin{aligned} \\text{distance} &= "+FR(hs,"\\tan "+dep+"^\\circ")+" \\\\ &\\approx "+u7f1(distB)+" \\\\ \\text{part above roof} &= "+u7f1(distB)+" \\times \\tan "+elev+"^\\circ \\\\ &\\approx "+u7f1(topPart)+" \\\\ \\text{height} &= "+hs+" + "+u7f1(topPart)+" \\\\ &\\approx "+u7f1(ans3)+" \\end{aligned} \\] The height of the taller building is <b>\\("+u7f1(ans3)+"\\) m</b>.",
    {mode:mode,hs:hs,dep:dep,elev:elev,ans:ans3});
  q.figure=u7elevSVG({objX:distB,objH:ans3,objLabel:"?",base:{x:0,h:hs,label:hs+" m"},obs:[{x:0,eye:hs,sights:[{y:ans3,ang:elev+"°"},{y:0,ang:dep+"°"}]}],ground:[]});
  return q;
});

/* ================= 11. elevation decision (7.5, 7.7, L3, gen mcq, CR 2) ================= */
E("u7-elevation-decision",7,["7.5","7.7"],3,"gen",function(){
  var mode=pick(["cable","reach"]);
  if(mode==="cable"){
    var sub=pick(["angle","triple"]),raw,margin=pick([1,1.5,2,2.5]),step=pick([2,5]),facts,P;
    var tries=0;
    do{
      tries++;
      if(sub==="angle"){
        var d=ri(15,50),theta=pick(U7_ANGLES.filter(function(a){return a>=28&&a<=58;}));
        raw=d/u7cosD(theta);
        facts="A guy cable runs from the top of a vertical antenna mast to an anchor on level ground. The anchor is \\("+d+"\\) m from the foot of the mast, and the cable makes an angle of \\("+theta+"^\\circ\\) with the ground.";
        P={mode:mode,sub:sub,d:d,theta:theta,margin:margin};
      }else{
        var t=pick(U7_TRIPLES),k=ri(1,3),hL=t[0]*k,gd=t[1]*k;
        raw=t[2]*k;
        facts="A cable brace runs from a point \\("+hL+"\\) m up a vertical pole to a ground anchor \\("+gd+"\\) m from the base of the pole, in a straight line.";
        P={mode:mode,sub:sub,hL:hL,gd:gd,margin:margin};
      }
    }while(Math.ceil((raw+margin)/step)*step<3*step&&tries<60);
    var req=raw+margin,keyVal=Math.ceil(req/step)*step;
    var opts=[keyVal-2*step,keyVal-step,keyVal,keyVal+step];
    P.req=req;P.step=step;
    var solBody=(sub==="angle"
      ?"\\[ \\begin{aligned} \\cos "+theta+"^\\circ &= "+FR(d,"L")+" \\\\ L &= "+FR(d,"\\cos "+theta+"^\\circ")+" \\\\ &\\approx "+u7f1(raw)+" \\\\ \\text{needed} &= "+u7f1(raw)+" + "+margin+" \\\\ &\\approx "+u7f1(req)+" \\end{aligned} \\]"
      :"\\[ \\begin{aligned} L^2 &= "+hL+"^2 + "+gd+"^2 \\\\ L &= "+raw+" \\\\ \\text{needed} &= "+raw+" + "+margin+" \\\\ &= "+u7f1(req)+" \\end{aligned} \\]");
    var q=mcq(facts+" An extra \\("+margin+"\\) m must be allowed for fastening at the ends. Cable is sold only in the lengths shown, in metres. Which is the shortest length that can be bought?",
      ""+keyVal,opts.filter(function(v){return v!==keyVal;}).map(function(v){return ""+v;}),
      "Find the cable length first, then add the fastening allowance: "+solBody+" The shortest sold length that covers \\("+u7f1(req)+"\\) m is <b>\\("+keyVal+"\\) m</b>.",
      P);
    if(sub==="angle"){
      q.figure=u7triSceneSVG({vert:d*u7tanD(theta),ground:d,slant:raw,vertLabel:null,groundLabel:d+" m",slantLabel:"?",angle:theta+"°"});
    }else{
      q.figure=u7triSceneSVG({vert:hL,ground:gd,slant:raw,vertLabel:hL+" m",groundLabel:gd+" m",slantLabel:"?"});
    }
    return q;
  }
  var L=pick([7,8,9,10,11]),th=pick([38,42,48,52,55,58]);
  var reach=L*u7sinD(th),wrong=L*u7cosD(th);
  var delta=pick([0.5,0.8,1,1.2,1.5]),reachIt=pick([true,false]);
  var sill=u7r1(reachIt?reach-delta:reach+delta);
  if(sill<2)sill=u7r1(reach+delta),reachIt=false;
  var reachS=u7f1(reach),wrongS=u7f1(wrong);
  function decR(v){return "The ladder reaches the sill, with the top at "+v+" m";}
  function decN(v){return "The ladder does not reach the sill, with the top at "+v+" m";}
  var key=reachIt?decR(reachS):decN(reachS);
  var ds=[reachIt?decN(reachS):decR(reachS),reachIt?decR(wrongS):decN(wrongS),reachIt?decN(wrongS):decR(wrongS)];
  var q=mcq("A ladder \\("+L+"\\) m long leans against a vertical wall, making an angle of \\("+th+"^\\circ\\) with the level ground. A window sill is \\("+u7f1(sill)+"\\) m above the ground. Which statement about the ladder is correct?",
    key,ds,
    "The height the ladder reaches is the side opposite the ground angle in the triangle the ladder makes with the wall: \\[ \\begin{aligned} \\sin "+th+"^\\circ &= "+FR("h",""+L)+" \\\\ h &= "+L+" \\times \\sin "+th+"^\\circ \\\\ &\\approx "+reachS+" \\end{aligned} \\] The top reaches \\("+reachS+"\\) m and the sill is \\("+u7f1(sill)+"\\) m up, so the ladder <b>"+(reachIt?"reaches the sill":"does not reach the sill")+"</b>. (Using cosine instead would give the foot distance along the ground, \\("+wrongS+"\\) m, not the height reached.)",
    {stmt:true,keyText:key,mode:mode,L:L,theta:th,sill:sill});
  q.figure=u7triSceneSVG({vert:reach,ground:L*u7cosD(th),slant:L,wallH:Math.max(reach,sill),vertLabel:null,groundLabel:null,slantLabel:L+" m",angle:th+"°",sill:{h:sill,label:u7f1(sill)+" m"}});
  return q;
});

/* ================= 12. choose the ratio setup (7.3, 7.4, L2, gen mcq) ================= */
E("u7-choose-ratio",7,["7.3","7.4"],2,"gen",function(){
  var V=pick(["A","B"]);
  var oppName=(V==="A"?"BC":"AC"),adjName=(V==="A"?"AC":"BC");
  var theta=pick(U7_ANGLES),mode=ri(1,6);
  var fn,numS,denS,givenText,askText,relText;
  function setup(f,n,d){return "\\(\\"+f+" "+theta+"^\\circ = "+FR(n,d)+"\\)";}
  if(mode===1){
    var H=ri(14,48);fn="sin";numS="x";denS=""+H;
    givenText="the hypotenuse, AB, is \\("+H+"\\) cm";askText="side "+oppName+", the side opposite angle "+V;
    relText="Side "+oppName+" is opposite angle "+V+" and AB is the hypotenuse, so the ratio is sine: opposite over hypotenuse.";
  }else if(mode===2){
    var H2=ri(14,48);fn="cos";numS="x";denS=""+H2;
    givenText="the hypotenuse, AB, is \\("+H2+"\\) cm";askText="side "+adjName+", the side adjacent to angle "+V;
    relText="Side "+adjName+" is adjacent to angle "+V+" and AB is the hypotenuse, so the ratio is cosine: adjacent over hypotenuse.";
  }else if(mode===3){
    var G=ri(8,40);fn="sin";numS=""+G;denS="x";
    givenText="the side opposite angle "+V+", "+oppName+", is \\("+G+"\\) cm";askText="the hypotenuse, AB";
    relText="The known side is opposite angle "+V+" and the unknown is the hypotenuse, so the ratio is sine: opposite over hypotenuse, with the unknown in the denominator.";
  }else if(mode===4){
    var G2=ri(8,40);fn="tan";numS="x";denS=""+G2;
    givenText="the side adjacent to angle "+V+", "+adjName+", is \\("+G2+"\\) cm";askText="side "+oppName+", the side opposite angle "+V;
    relText="The unknown side is opposite angle "+V+" and the known side is adjacent, so the ratio is tangent: opposite over adjacent.";
  }else if(mode===5){
    var G3=ri(8,40);fn="tan";numS=""+G3;denS="x";
    givenText="the side opposite angle "+V+", "+oppName+", is \\("+G3+"\\) cm";askText="side "+adjName+", the side adjacent to angle "+V;
    relText="The known side is opposite angle "+V+" and the unknown side is adjacent, so the ratio is tangent: opposite over adjacent, with the unknown in the denominator.";
  }else{
    /* unknown angle: two sides given, inverse setup */
    var pair=pick(["sin","cos","tan"]),nVal,dVal,pairText;
    if(pair==="sin"){nVal=ri(5,28);dVal=nVal+ri(3,25);pairText="the side opposite angle "+V+", "+oppName+", is \\("+nVal+"\\) cm and the hypotenuse, AB, is \\("+dVal+"\\) cm";}
    else if(pair==="cos"){nVal=ri(5,28);dVal=nVal+ri(3,25);pairText="the side adjacent to angle "+V+", "+adjName+", is \\("+nVal+"\\) cm and the hypotenuse, AB, is \\("+dVal+"\\) cm";}
    else{nVal=ri(5,28);dVal=ri(5,28);var tg=0;while(dVal===nVal&&tg<50){dVal=ri(5,28);tg++;}pairText="the side opposite angle "+V+", "+oppName+", is \\("+nVal+"\\) cm and the side adjacent to angle "+V+", "+adjName+", is \\("+dVal+"\\) cm";}
    var keyA="\\("+V+" = \\"+pair+"^{-1}\\left("+FR(nVal,dVal)+"\\right)\\)";
    var others=["sin","cos","tan"].filter(function(f){return f!==pair;});
    var dsA=["\\("+V+" = \\"+others[0]+"^{-1}\\left("+FR(nVal,dVal)+"\\right)\\)",
             "\\("+V+" = \\"+others[1]+"^{-1}\\left("+FR(nVal,dVal)+"\\right)\\)",
             "\\("+V+" = \\"+pair+"^{-1}\\left("+FR(dVal,nVal)+"\\right)\\)"];
    var pairWord=(pair==="sin"?"sine, opposite over hypotenuse":pair==="cos"?"cosine, adjacent over hypotenuse":"tangent, opposite over adjacent");
    var q=mcq("A right triangle ABC has the right angle at C. In the triangle, "+pairText+". Which setup finds the measure of angle "+V+"?",
      keyA,dsA,
      "The two known sides are the pair used by "+pairWord+". To undo the ratio and get the angle, use its inverse: the setup is <b>"+keyA+"</b>. The other inverse setups use the wrong side pair, and the last setup inverts the fraction.",
      {mode:mode,V:V,fn:pair,numS:""+nVal,denS:""+dVal,angleMode:true,keyText:keyA});
    var oppV6,adjV6,hypV6;
    if(pair==="sin"){oppV6=nVal;hypV6=dVal;adjV6=Math.sqrt(dVal*dVal-nVal*nVal);}
    else if(pair==="cos"){adjV6=nVal;hypV6=dVal;oppV6=Math.sqrt(dVal*dVal-nVal*nVal);}
    else{oppV6=nVal;adjV6=dVal;hypV6=Math.sqrt(nVal*nVal+dVal*dVal);}
    var sLab6=[null,null,null];
    if(pair==="sin"){sLab6[V==="A"?0:1]=nVal+" cm";sLab6[2]=dVal+" cm";}
    else if(pair==="cos"){sLab6[V==="A"?1:0]=nVal+" cm";sLab6[2]=dVal+" cm";}
    else{sLab6[V==="A"?0:1]=nVal+" cm";sLab6[V==="A"?1:0]=dVal+" cm";}
    var aLab6=[null,null,null];aLab6[V==="A"?0:1]="?";
    q.figure=triSVG(V==="A"?oppV6:adjV6,V==="A"?adjV6:oppV6,hypV6,{L:["A","B","C"],side:sLab6,ang:aLab6});
    return q;
  }
  var key=setup(fn,numS,denS);
  var others2=["sin","cos","tan"].filter(function(f){return f!==fn;});
  var ds=[setup(others2[0],numS,denS),setup(others2[1],numS,denS),setup(fn,denS,numS)];
  var q=mcq("A right triangle ABC has the right angle at C and angle "+V+" is \\("+theta+"^\\circ\\). In the triangle, "+givenText+". Which setup finds "+askText+"? Let \\(x\\) be the length asked for.",
    key,ds,
    relText+" With \\(x\\) as the length asked for, the setup is <b>"+key+"</b>. The other setups use a ratio for a different pair of sides, or put the known and unknown lengths in the wrong places.",
    {mode:mode,V:V,theta:theta,fn:fn,numS:numS,denS:denS,angleMode:false,keyText:key});
  var oppV,adjV,hypV,givVal;
  if(mode===1){hypV=H;oppV=H*u7sinD(theta);adjV=H*u7cosD(theta);givVal=H;}
  else if(mode===2){hypV=H2;adjV=H2*u7cosD(theta);oppV=H2*u7sinD(theta);givVal=H2;}
  else if(mode===3){oppV=G;hypV=G/u7sinD(theta);adjV=G/u7tanD(theta);givVal=G;}
  else if(mode===4){adjV=G2;oppV=G2*u7tanD(theta);hypV=G2/u7cosD(theta);givVal=G2;}
  else{oppV=G3;adjV=G3/u7tanD(theta);hypV=G3/u7sinD(theta);givVal=G3;}
  var oi=(V==="A"?0:1),ai=(V==="A"?1:0);
  var givIdx=(mode<=2)?2:(mode===4?ai:oi);
  var tarIdx=(mode===3)?2:((mode===1||mode===4)?oi:ai);
  var sLab=[null,null,null];
  sLab[givIdx]=givVal+" cm";sLab[tarIdx]="x";
  var aLab=[null,null,null];aLab[V==="A"?0:1]=theta+"°";
  q.figure=triSVG(V==="A"?oppV:adjV,V==="A"?adjV:oppV,hypV,{L:["A","B","C"],side:sLab,ang:aLab});
  return q;
});

/* ----- bank-fix.js ----- */
// Math 1201 unit test pool fix additions (November 9, 2026)
// Cut verbatim from the standalone bank source
// (math-1201-review/bank-src.js, lines 4642 to 4889).
// CRMARKS: u2-square-diagonal=3
// CRMARKS: u2-entire-radical-cr=3
// CRMARKS: u2-prime-factor-cr=2
// CRMARKS: u4-function-repair=3
// CRMARKS: u4-table-extend-cr=3
// CRMARKS: u4-graph-read-cr=2
// CRMARKS: u4-pair-intercept-cr=2
// CRMARKS: u5-point-from-slope-cr=3
// CRMARKS: u5-slope-from-form-cr=2
// CRMARKS: u5-line-point-cr=2
/* Unit test pool fix additions, November 9, 2026 (additions only).
   Unit 1: three Level 2 multiple choice generators (the unit's Level 2
   entries were all numeric, so Section A had no Level 2 pool).
   Unit 2: one Level 3 CR (3), Level 2 CR at 3 and 2 marks.
   Unit 4: one Level 3 CR (3), Level 2 CR at 3, 2 and 2 marks.
   Unit 5: Level 2 CR at 3, 2 and 2 marks. */

/* U1a. Conversion problem, multiple choice (6.2, L2) */
E("u1-convert-choice",1,["6.2"],2,"gen",function(){
  var modes=[
    {from:"inches",to:"centimetres",f:2.54,how:"multiply",note:"1 inch = 2.54 centimetres",vmin:2,vmax:30,dec:true},
    {from:"centimetres",to:"inches",f:2.54,how:"divide",note:"1 inch = 2.54 centimetres",vmin:10,vmax:90,dec:false},
    {from:"miles",to:"kilometres",f:1.6,how:"multiply",note:"1 mile = 1.6 kilometres",vmin:3,vmax:60,dec:false},
    {from:"kilometres",to:"miles",f:1.6,how:"divide",note:"1 mile = 1.6 kilometres",vmin:8,vmax:96,dec:false},
    {from:"feet",to:"metres",f:0.3048,how:"multiply",note:"1 foot = 0.3048 metres",vmin:5,vmax:80,dec:false},
    {from:"yards",to:"metres",f:0.9144,how:"multiply",note:"1 yard = 0.9144 metres",vmin:4,vmax:60,dec:false}
  ];
  var m=pick(modes),v,ans,tries=0,ds;
  do{
    tries++;
    v=m.dec?ri(m.vmin,m.vmax)+pick([0,0.5]):ri(m.vmin,m.vmax);
    ans=m.how==="multiply"?u1r2(v*m.f):u1r2(v/m.f);
    var wrongOp=m.how==="multiply"?u1r2(v/m.f):u1r2(v*m.f);
    var off10=m.how==="multiply"?u1r2(v*m.f*10):u1r2(v/m.f/10);
    var near=m.how==="multiply"?u1r2(v*(m.f+ (m.f>1?0.46:0.0452))):u1r2(v/(m.f-0.3));
    ds=[fmt(wrongOp),fmt(off10),fmt(near)];
  }while(!u1setOk([fmt(ans)].concat(ds))&&tries<90);
  var op=m.how==="multiply"?"Multiply":"Divide";
  var sol=op+" by the conversion factor, since "+m.note+": \\[ "+fmt(v)+" "+(m.how==="multiply"?"\\times":"\\div")+" "+fmt(m.f)+" = "+fmt(ans)+" \\] The measure is <b>"+fmt(ans)+" "+m.to+"</b>.";
  return mcq("Convert "+fmt(v)+" "+m.from+" to "+m.to+". Use "+m.note+". Give the measure in "+m.to+".",fmt(ans),balDp(fmt(ans),ds),sol,{mode:m.from+"-"+m.to,v:v});
});

/* U1b. Surface area from stated dimensions, multiple choice (5.2, L2).
   Figures (Nov 2026): this entry and u1-vol-choice below carry inline
   SVG diagrams drawn from their drawn dimensions (helpers in
   bank-helpers.js). u1-convert-choice stays figureless. */
E("u1-sa-choice",1,["5.2"],2,"gen",function(){
  var mode=ri(1,2),ans,tries=0,ds,prompt,sol;
  do{
    tries++;
    if(mode===1){
      var l=ri(3,14),w=ri(2,10),h=ri(2,9);
      ans=2*(l*w+l*h+w*h);
      ds=[fmt(l*w*h),fmt(2*(l*h+w*h)),fmt(l*w+l*h+w*h)];
      prompt="A closed rectangular box is "+l+" cm long, "+w+" cm wide and "+h+" cm high. What is the surface area of the box, in square centimetres?";
      sol="The box has three pairs of matching faces: \\[ 2(lw + lh + wh) = 2("+l+" \\times "+w+" + "+l+" \\times "+h+" + "+w+" \\times "+h+") = 2("+ (l*w+l*h+w*h) +") = "+ans+" \\] The surface area is <b>"+ans+" square centimetres</b>.";
    }else{
      var r=pick([2,3,4,5,6,7,8]),hh=ri(4,15);
      ans=u1r2(2*3.14*r*(r+hh));
      ds=[fmt(u1r2(3.14*r*r*hh)),fmt(u1r2(2*3.14*r*hh)),fmt(u1r2(3.14*r*(r+hh)))];
      prompt="A closed cylinder has radius "+r+" cm and height "+hh+" cm. What is the surface area of the cylinder, in square centimetres? Use \\(\\pi = 3.14\\).";
      sol="The surface area is the two circular ends plus the curved side: \\[ 2\\pi r^2 + 2\\pi r h = 2(3.14)("+r+")("+r+" + "+hh+") = "+fmt(ans)+" \\] The surface area is <b>"+fmt(ans)+" square centimetres</b>.";
    }
  }while(!u1setOk([fmt(ans)].concat(ds))&&tries<90);
  var q=mcq(prompt,fmt(ans),balDp(fmt(ans),ds),sol,{mode:mode,ans:ans});
  if(mode===1)q.figure=u1figPrism(l,w,h,fmt(l)+" cm",fmt(w)+" cm",fmt(h)+" cm");
  else q.figure=u1figCyl(r,hh,fmt(r)+" cm",fmt(hh)+" cm");
  return q;
});

/* U1c. Volume from stated dimensions, multiple choice (5.4, L2) */
E("u1-vol-choice",1,["5.4"],2,"gen",function(){
  var mode=ri(1,3),ans,tries=0,ds,prompt,sol;
  do{
    tries++;
    if(mode===1){
      var r=pick([2,3,4,5,6,7,8,9,10]),h=ri(3,16);
      ans=u1r2(3.14*r*r*h);
      ds=[fmt(u1r2(3.14*r*r*h/3)),fmt(u1r2(3.14*2*r*2*r*h)),fmt(u1r2(2*3.14*r*h))];
      prompt="A cylinder has radius "+r+" cm and height "+h+" cm. What is the volume of the cylinder, in cubic centimetres? Use \\(\\pi = 3.14\\).";
      sol="For a cylinder, \\(V = A_b \\times h\\) where \\(A_b\\) is the area of the circular base: \\[ V = 3.14 \\times "+r+"^2 \\times "+h+" = "+fmt(ans)+" \\] The volume is <b>"+fmt(ans)+" cubic centimetres</b>.";
    }else if(mode===2){
      var r2=pick([3,4,5,6,7,8,9]),h2=pick([6,9,12,15]);
      ans=u1r2(3.14*r2*r2*h2/3);
      ds=[fmt(u1r2(3.14*r2*r2*h2)),fmt(u1r2(3.14*r2*r2*h2/2)),fmt(u1r2(3.14*2*r2*h2))];
      prompt="A cone has radius "+r2+" cm and height "+h2+" cm. What is the volume of the cone, in cubic centimetres? Use \\(\\pi = 3.14\\).";
      sol="A cone is a pointed solid, so \\(V = \\frac{1}{3} A_b \\times h\\): \\[ V = \\frac{1}{3} \\times 3.14 \\times "+r2+"^2 \\times "+h2+" = "+fmt(ans)+" \\] The volume is <b>"+fmt(ans)+" cubic centimetres</b>.";
    }else{
      var s=ri(3,12),h3=pick([3,6,9,12]);
      ans=s*s*h3/3;
      ds=[fmt(s*s*h3),fmt(s*s*h3/2),fmt(2*s*s+4*s*h3)];
      prompt="A square-based pyramid has base side "+s+" cm and height "+h3+" cm. What is the volume of the pyramid, in cubic centimetres?";
      sol="A pyramid is a pointed solid, so \\(V = \\frac{1}{3} A_b \\times h\\) with \\(A_b = "+s+"^2\\): \\[ V = \\frac{1}{3} \\times "+(s*s)+" \\times "+h3+" = "+ans+" \\] The volume is <b>"+ans+" cubic centimetres</b>.";
    }
  }while(!u1setOk([fmt(ans)].concat(ds))&&tries<90);
  var q=mcq(prompt,fmt(ans),balDp(fmt(ans),ds),sol,{mode:mode,ans:ans});
  if(mode===1)q.figure=u1figCyl(r,h,fmt(r)+" cm",fmt(h)+" cm");
  else if(mode===2)q.figure=u1figCone(r2,h2,{rLab:fmt(r2)+" cm",hLab:fmt(h2)+" cm"});
  else q.figure=u1figPyr(s,h3,{sLab:fmt(s)+" cm",hLab:fmt(h3)+" cm"});
  return q;
});

/* U2a. Squares and cubes in context, path not named (1.9, 1.20, L3, CR 3) */
E("u2-square-diagonal",2,["1.9","1.20"],3,"gen",function(){
  var mode=ri(1,3);
  if(mode===1){
    var d=2*ri(3,15),ans=d*d/2;
    return numq("A square window has a diagonal of \\("+d+"\\) cm. What is the area of the window, in square centimetres?",
      ans,0.01,
      "The diagonal splits the square into two right triangles, and the area of a square can be built from its diagonal: the two triangles each have area \\(\\frac{d \\times d}{2} \\div 2\\), so together \\[ A = \\frac{d^2}{2} = \\frac{"+d+"^2}{2} = \\frac{"+(d*d)+"}{2} = "+ans+" \\] The area is <b>\\("+ans+"\\) square centimetres</b>.",
      {mode:mode,d:d,ans:ans});
  }
  if(mode===2){
    var A=pick([30,32,38,40,42,45,48,50,52,55,58,60,62,65,68,70,72,75,78,80,82,85,88,90,92,95,98]);
    var side=Math.sqrt(A),per=Math.round(4*side*10)/10;
    return numq("A square garden plot has an area of \\("+A+"\\) square metres. What is the perimeter of the plot, to the nearest tenth of a metre?",
      per,0.02,
      "Substitute the area into the area formula for a square and solve for the side: \\[ s = \\sqrt{"+A+"} \\approx "+(Math.round(side*100)/100)+" \\] The perimeter is four side lengths: \\[ P = 4 \\times "+(Math.round(side*100)/100)+" \\approx "+per+" \\] The perimeter is about <b>\\("+per+"\\) m</b>.",
      {mode:mode,A:A,ans:per});
  }
  var V=pick([50,60,70,80,90,100,110,120,130,140,150,160,175,190,200]);
  var edge=Math.cbrt(V),ans3=Math.round(edge*10)/10;
  return numq("A cube-shaped tank holds \\("+V+"\\) cubic centimetres of water when full. What is the edge length of the tank, to the nearest tenth of a centimetre?",
    ans3,0.02,
    "Substitute the volume into the volume formula for a cube and solve: \\[ s = \\sqrt[3]{"+V+"} \\approx "+(Math.round(edge*100)/100)+" \\] The edge length is about <b>\\("+ans3+"\\) cm</b>.",
    {mode:mode,V:V,ans:ans3});
});

/* U2b. Express a mixed radical as an entire radical (1.17, L2, CR 3) */
E("u2-entire-radical-cr",2,["1.17"],2,"gen",function(){
  var a=ri(2,9),b=pick([2,3,5,6,7,10,11,13,14,15]);
  var ans=a*a*b;
  return numq("Express \\("+a+"\\sqrt{"+b+"}\\) as an entire radical \\(\\sqrt{n}\\). What is the value of \\(n\\)?",
    ans,0.001,
    "The coefficient enters the radicand as a square: \\[ "+a+"\\sqrt{"+b+"} = \\sqrt{"+a+"^2 \\times "+b+"} = \\sqrt{"+(a*a)+" \\times "+b+"} = \\sqrt{"+ans+"} \\] So \\(n\\) is <b>"+ans+"</b>.",
    {a:a,b:b,ans:ans});
});

/* U2c. Largest prime factor (1.12, L2, CR 2) */
E("u2-prime-factor-cr",2,["1.12"],2,"gen",function(){
  function factorStr(n){
    var out=[],d=2,m=n;
    while(d*d<=m){while(m%d===0){out.push(d);m/=d;}d++;}
    if(m>1)out.push(m);
    return out;
  }
  var P=pick([17,19,23,29,31]),mult=pick([6,8,9,10,12,14,15,16,18,20,21,22,24,25,26,27,28]);
  var N=P*mult,facs=factorStr(N);
  return numq("What is the largest prime factor of \\("+N+"\\)?",
    P,0.001,
    "Divide \\("+N+"\\) by prime numbers in turn until the quotient is prime: \\[ "+N+" = "+facs.join(" \\times ")+" \\] The prime factors are "+facs.join(", ")+", so the largest is <b>\\("+P+"\\)</b>.",
    {N:N,ans:P});
});

/* U4a. Repair a wrong claim about functions (4.6, 4.8, L3, CR 3) */
E("u4-function-repair",4,["4.6","4.8"],3,"var",varset([
  function(){var key="The claim is wrong: an output may repeat; the relation is a function because each input has exactly one output";
    return mcq("A student says the relation \\(\\{(2, 4), (3, 4), (5, 6)\\}\\) is not a function, because the output 4 appears twice. Which statement identifies the error and gives the correct conclusion?",
    key,
    ["The claim is wrong: an input may repeat; the relation is a function because each output has exactly one input",
     "The claim is right: an output may never repeat; the relation is not a function because the output 4 appears twice",
     "The claim is wrong: the relation is not a function either way, because the input 2 has the output 4 instead of 2"],
    "A relation is a function when each input has exactly one output. Here the inputs 2, 3 and 5 each appear once, so each has exactly one output; outputs are allowed to repeat. The error is <b>applying the one-output rule to the outputs instead of the inputs</b>, and the relation <b>is a function</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The claim is wrong: the repeated input 1 has two different outputs, so the relation is not a function";
    return mcq("A student says the relation \\(\\{(1, 3), (1, 5), (2, 7)\\}\\) is a function, because every number in the set is used only a few times. Which statement identifies the error and gives the correct conclusion?",
    key,
    ["The claim is wrong: the repeated output 3 has two different inputs, so the relation is not a function",
     "The claim is right: the repeated input 1 has two different outputs, so the relation is a function",
     "The claim is wrong: the relation is a function, but only because the outputs 3, 5 and 7 are all different numbers"],
    "Check the inputs: the input 1 appears twice, paired with 3 and with 5. One input with two different outputs breaks the definition, no matter how the other pairs look. The error is <b>not checking whether an input repeats with a different output</b>, and the relation <b>is not a function</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The claim is wrong: a graph that fails the vertical line test is not a function, whatever its shape";
    return mcq("A student graphs a circle and says it is a function because the graph is smooth and unbroken. Which statement identifies the error and gives the correct conclusion?",
    key,
    ["The claim is wrong: a graph that passes the vertical line test is not a function, whatever its shape",
     "The claim is right: any smooth, unbroken graph is a function, so the circle is a function",
     "The claim is wrong: the circle is a function, because every input on it has at most one output"],
    "The test is the vertical line test, not smoothness: a vertical line crosses a circle at two points, which means one input has two outputs. The error is <b>judging by the look of the graph instead of the vertical line test</b>, and the circle <b>is not a function</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The claim is wrong: swapping domain and range changes the question; inputs 1, 2, 3 each have one output, so it is a function";
    return mcq("A student is given the table with inputs 1, 2, 3 and outputs 6, 6, 9, and says it is not a function because the output 6 comes from two inputs. Which statement identifies the error and gives the correct conclusion?",
    key,
    ["The claim is wrong: swapping domain and range changes the question; outputs 6 and 9 each have one input, so it is a function",
     "The claim is right: an output with two inputs breaks the rule, so the table is not a function",
     "The claim is wrong: the table is a function only if the outputs increase, and here they do not always increase"],
    "The rule concerns inputs: each input may have only one output, but two inputs may share an output. Inputs 1, 2 and 3 each have exactly one output here. The error is <b>testing the outputs against the rule that belongs to the inputs</b>, and the table <b>does represent a function</b>.",
    {stmt:true,keyText:key});}
]));

/* U4b. Extend a linear table (4.13, L2, CR 3) */
E("u4-table-extend-cr",4,["4.13"],2,"gen",function(){
  var m=pick([2,3,4,5,-2,-3,1.5,2.5]),b=ri(-6,9),x0=ri(0,3),dx=pick([1,2]);
  var xs=[x0,x0+dx,x0+2*dx,x0+3*dx];
  var target=xs[3]+dx*ri(3,5);
  function y(x){return m*x+b;}
  var ans=y(target);
  var pairs=xs.map(function(x){return "("+x+", "+fmt(y(x))+")";}).join(", ");
  return numq("The ordered pairs "+pairs+" belong to a linear relation. What is the y-value when x = "+target+"?",
    ans,0.01,
    "The first differences are constant: each step of "+dx+" in x changes y by "+fmt(m*dx)+", so the rate of change is "+fmt(m)+" and the relation is linear. From the last given pair, x grows by "+(target-xs[3])+", which is "+((target-xs[3])/dx)+" steps, adding "+fmt(m*(target-xs[3]))+" to y: \\[ y = "+fmt(y(xs[3]))+" + "+fmt(m*(target-xs[3]))+" = "+fmt(ans)+" \\] The y-value is <b>"+fmt(ans)+"</b>.",
    {m:m,b:b,target:target,ans:ans});
});

/* U4c. Rate of change from a described graph (4.31, L2, CR 2) */
E("u4-graph-read-cr",4,["4.31"],2,"gen",function(){
  var b=ri(-5,8),m=pick([2,3,4,-2,-3,0.5,1.5,-1.5,2.5]),x2=pick([2,4,5]);
  var y2=m*x2+b;
  return numq("A graph of a linear relation passes through the points (0, "+b+") and ("+x2+", "+fmt(y2)+"). What is the rate of change of the relation?",
    m,0.01,
    "The rate of change is the change in y divided by the change in x between the two points: \\[ \\frac{"+fmt(y2)+" - ("+b+")}{"+x2+" - 0} = \\frac{"+fmt(y2-b)+"}{"+x2+"} = "+fmt(m)+" \\] The rate of change is <b>"+fmt(m)+"</b>.",
    {b:b,m:m,ans:m});
});

/* U4d. Vertical intercept from a set of pairs (4.16, L2, CR 2) */
E("u4-pair-intercept-cr",4,["4.16"],2,"gen",function(){
  var m=pick([2,3,-2,4,-3,1]),b=ri(-7,9);
  var xs=[1,2,3,4].map(function(k){return k+pick([0,1]);});
  xs=Array.from(new Set(xs)).slice(0,4);
  while(xs.length<4)xs.push(xs[xs.length-1]+1);
  var pairs=xs.map(function(x){return "("+x+", "+(m*x+b)+")";}).join(", ");
  return numq("A linear relation contains the points "+pairs+". What is the vertical intercept of the relation?",
    b,0.01,
    "Consecutive points change y by "+m+" for each step of 1 in x, so the rate of change is "+m+". Work back from the first point ("+xs[0]+", "+(m*xs[0]+b)+") to x = 0, subtracting "+m+" a total of "+xs[0]+" times: \\[ "+(m*xs[0]+b)+" - "+xs[0]+" \\times "+m+" = "+b+" \\] The vertical intercept is <b>"+b+"</b>.",
    {m:m,b:b,ans:b});
});

/* U5a. Another point from slope and a point (4.25, L2, CR 3) */
E("u5-point-from-slope-cr",5,["4.25"],2,"gen",function(){
  var fracs=[[3,4],[2,3],[4,5],[5,3],[3,2],[5,4],[2,5],[4,3]];
  var f=pick(fracs),p=f[0]*pick([1,1,-1]),q=f[1],k=pick([1,2]);
  var x1=ri(0,9),y1=ri(1,15),x2=x1+k*q,y2=y1+k*p;
  return numq("A line has slope \\("+FR(p,q)+"\\) and passes through the point ("+x1+", "+y1+"). Another point on the line has x-coordinate "+x2+". What is its y-coordinate?",
    y2,0.01,
    "The slope \\("+FR(p,q)+"\\) means y changes by "+p+" for every run of "+q+" in x. From x = "+x1+" to x = "+x2+" the run is "+(x2-x1)+", which is "+k+" slope steps, so y changes by "+k+" \\times "+p+" = "+(k*p)+": \\[ y = "+y1+" + "+(k*p)+" = "+y2+" \\] The y-coordinate is <b>"+y2+"</b>.",
    {p:p,q:q,x2:x2,ans:y2});
});

/* U5b. Slope or intercept from general form (4.38, L2, CR 2) */
E("u5-slope-from-form-cr",5,["4.38"],2,"gen",function(){
  var mode=ri(1,2),B=pick([2,3,4,5]),m=pick([2,3,-2,-3,4,-4,1,-1]),b0=ri(-6,8);
  var A=-m*B,C=B*b0;
  function sgn(v,first){if(v<0)return " - "+fmt(-v);return first?fmt(v):" + "+fmt(v);}
  var eq=sgn(A,true)+"x + "+fmt(B)+"y = "+fmt(C);
  var solved=fmt(B)+"y = "+sgn(-A,true)+"x"+(C<0?" - "+fmt(-C):" + "+fmt(C));
  var finalForm="y = "+fmt(m)+"x"+(b0<0?" - "+fmt(-b0):" + "+fmt(b0));
  if(mode===1){
    return numq("The linear relation "+eq+" is rewritten in slope-intercept form. What is the slope of the relation?",
      m,0.01,
      "Solve for y: \\[ "+solved+" \\quad\\Rightarrow\\quad "+finalForm+" \\] The slope is <b>"+fmt(m)+"</b>.",
      {mode:mode,ans:m});
  }
  return numq("The linear relation "+eq+" is rewritten in slope-intercept form. What is the y-intercept of the relation?",
    b0,0.01,
    "Solve for y: \\[ "+solved+" \\quad\\Rightarrow\\quad "+finalForm+" \\] The y-intercept is <b>"+fmt(b0)+"</b>.",
    {mode:mode,ans:b0});
});

/* U5c. A point on a line from slope and a point (4.24, L2, CR 2) */
E("u5-line-point-cr",5,["4.24"],2,"gen",function(){
  var m=pick([2,3,4,-2,-3,-4,5,-5]),x1=ri(1,8),y1=ri(2,16),dx=pick([2,3,4,-2,-3]);
  var x2=x1+dx,ans=y1+m*dx;
  return numq("A line has slope "+m+" and passes through the point ("+x1+", "+y1+"). What is the y-value of the line at x = "+x2+"?",
    ans,0.01,
    "From x = "+x1+" to x = "+x2+" the run is "+dx+", so y changes by "+m+" \\times "+dx+" = "+(m*dx)+": \\[ y = "+y1+" + "+(m*dx)+" = "+ans+" \\] The y-value is <b>"+ans+"</b>.",
    {m:m,x2:x2,ans:ans});
});

/* ============ Constructed-response marks (generated) ============ */
/* Built by assemble-bank.py from the CRMARKS manifests at the top of
   each unit file. Exam Section B draws only from these entries. */
window.__BANK_CRMARKS={"u1-composite":3,"u1-composite-sa":2,"u1-convert-multistep":2,"u1-sa-basic":3,"u1-sa-unknown":2,"u1-sphere":3,"u1-vol-basic":2,"u1-vol-unknown":2,"u2-entire-radical-cr":3,"u2-error":2,"u2-evaluate-exp":2,"u2-gcf-lcm":2,"u2-gcf-lcm-problem":3,"u2-laws-integral":3,"u2-laws-rational":2,"u2-prime-factor-cr":2,"u2-problem":3,"u2-radical-mixed":2,"u2-square-diagonal":3,"u3-binom-tri-expand":3,"u3-binomial-expand":2,"u3-diff-squares":2,"u3-factor-error":3,"u3-factor-gcf-first":2,"u3-factor-hard":3,"u3-factor-monic":2,"u3-factor-product":2,"u3-gcf":2,"u3-mult-error":2,"u3-special-products":2,"u3-verify-sub":1,"u4-context-problem":3,"u4-domain-decision":2,"u4-domain-range":3,"u4-eval-function":2,"u4-function-repair":3,"u4-graph-read-cr":2,"u4-intercepts":2,"u4-pair-intercept-cr":2,"u4-rate-of-change":3,"u4-solve-input":2,"u4-table-extend-cr":3,"u5-context-line":2,"u5-eq-from-graph":3,"u5-eq-parallel-perp":2,"u5-eq-slope-point":2,"u5-eq-two-points":3,"u5-line-point-cr":2,"u5-parallel-perp":2,"u5-point-from-slope-cr":3,"u5-problem-equation":2,"u5-rewrite-form":2,"u5-slope-context":3,"u5-slope-error":2,"u5-slope-from-form-cr":2,"u5-slope-rate":3,"u6-break-even":2,"u6-problem":3,"u6-solution-count":2,"u6-solve-algebra":3,"u6-solve-elimination":4,"u6-solve-graph":3,"u6-word-problem":2,"u7-clinometer":3,"u7-elevation-decision":2,"u7-find-angle":2,"u7-find-hypotenuse":2,"u7-find-side":3,"u7-pythagoras":2,"u7-solve-triangle":3,"u7-two-triangles":2};
