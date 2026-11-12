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
