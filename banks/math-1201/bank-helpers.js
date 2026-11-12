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
