// Math 9 Unit 4 top-up tranche (November 7, 2026) question bank
// Cut verbatim from the standalone bank source
// (math-9-review/bank-src.js, lines 2328 to 2521).
/* Top-up tranche (November 7, 2026): Unit 4 additions from tranche1/unit4-topup.js */
function u4tTiles(a,b,c){
  var groups=[];
  if(a!==0)groups.push({n:a,kind:0,w:34,h:34,lab:(a<0?"-":"")+"x²",fs:11});
  if(b!==0)groups.push({n:b,kind:1,w:34,h:12,lab:(b<0?"-":"")+"x",fs:9});
  if(c!==0)groups.push({n:c,kind:2,w:12,h:12,lab:(c<0?"-":"")+"1",fs:8});
  if(!groups.length)groups.push({n:1,kind:2,w:12,h:12,lab:"0",fs:8});
  var pad=10,gapX=4,gapY=8,maxRow=0,totH=0,i,j;
  for(i=0;i<groups.length;i++){var rw=Math.abs(groups[i].n)*groups[i].w+(Math.abs(groups[i].n)-1)*gapX;if(rw>maxRow)maxRow=rw;totH+=groups[i].h;if(i>0)totH+=gapY;}
  var W=maxRow+2*pad;if(W<90)W=90;
  var H=totH+2*pad;
  var s='<svg xmlns="http://www.w3.org/2000/svg" width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Algebra tile model">';
  s+='<rect x="1" y="1" width="'+(W-2)+'" height="'+(H-2)+'" fill="#ffffff" stroke="'+FIG_INK+'" stroke-width="1"/>';
  var y=pad;
  for(i=0;i<groups.length;i++){
    var g=groups[i],x=pad,count=Math.abs(g.n);
    for(j=0;j<count;j++){
      var pos=g.n>0;
      var fill=pos?(g.kind===1?FIG_ACC:FIG_SHADE):"#ffffff";
      var tf=(pos&&g.kind===1)?"#ffffff":FIG_INK;
      s+='<rect x="'+x+'" y="'+y+'" width="'+g.w+'" height="'+g.h+'" fill="'+fill+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
      s+='<text x="'+fmt(x+g.w/2,1)+'" y="'+fmt(y+g.h/2,1)+'" font-size="'+g.fs+'" fill="'+tf+'" text-anchor="middle" dominant-baseline="central">'+g.lab+'</text>';
      x+=g.w+gapX;
    }
    y+=g.h+gapY;
  }
  return s+'</svg>';
}
function u4tArea(m,p,c){
  var monoLab=fmt(m)+"x";
  var part1=p===1?"x":fmt(p)+"x";
  var part2=fmt(c);
  var W=300,H=146,rx=56,ry=34,rw=216,rh=76,sw=128,sx=rx+sw;
  var totalLab="("+part1+(c<0?" - "+fmt(Math.abs(c)):" + "+part2)+")";
  var s='<svg xmlns="http://www.w3.org/2000/svg" width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Rectangle split into two regions for an area model">';
  s+='<rect x="'+rx+'" y="'+ry+'" width="'+sw+'" height="'+rh+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<rect x="'+sx+'" y="'+ry+'" width="'+(rw-sw)+'" height="'+rh+'" fill="#ffffff" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="'+sx+'" y1="'+ry+'" x2="'+sx+'" y2="'+(ry+rh)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<text x="30" y="'+fmt(ry+rh/2,1)+'" font-size="13" fill="'+FIG_INK+'" text-anchor="middle" dominant-baseline="central">'+monoLab+'</text>';
  s+='<text x="'+fmt(rx+sw/2,1)+'" y="'+(ry+16)+'" font-size="13" fill="'+FIG_INK+'" text-anchor="middle" dominant-baseline="central">'+part1+'</text>';
  s+='<text x="'+fmt(sx+(rw-sw)/2,1)+'" y="'+(ry+16)+'" font-size="13" fill="'+FIG_INK+'" text-anchor="middle" dominant-baseline="central">'+part2+'</text>';
  s+='<text x="'+fmt(rx+rw/2,1)+'" y="'+(ry+rh+22)+'" font-size="13" fill="'+FIG_INK+'" text-anchor="middle" dominant-baseline="central">'+totalLab+'</text>';
  return s+'</svg>';
}

E("u4-tiles-figure-expr", 4, ["8.16"], 1, "gen", function(){
  for(var att=0;att<300;att++){
    var a=ri(-3,3),b=ri(-5,5),c=ri(-5,5);
    var nz=(a!==0?1:0)+(b!==0?1:0)+(c!==0?1:0);
    if(nz<2)continue;
    var hasPos=(a>0||b>0||c>0),hasNeg=(a<0||b<0||c<0);
    if(!hasPos||!hasNeg)continue;
    var corr=u4m(a,b,c);
    var aOff=a===0?1:(a>0?a+1:a-1),cOff=c===0?-1:(c>0?c+1:c-1);
    var cands=[
      {t:u4m(a,-b,c),fb:"The x tiles have the opposite sign in the model."},
      {t:u4m(a,b,-c),fb:"The unit tiles have the opposite sign in the model."},
      {t:u4m(-a,b,c),fb:"The x squared tiles have the opposite sign in the model."},
      {t:u4m(b,a,c),fb:"That swaps the x squared count with the x count."},
      {t:u4m(aOff,b,c),fb:"That miscounts the x squared tiles in the model."},
      {t:u4m(a,b,cOff),fb:"That miscounts the unit tiles in the model."}
    ];
    var ds=u4pick3(corr,cands);
    if(ds.length<3)continue;
    var sol="Count each kind of tile in the picture, keeping its sign: \\[ \\begin{aligned} x^{2} \\text{ tiles} &= "+fmt(a)+" \\\\ x \\text{ tiles} &= "+fmt(b)+" \\\\ \\text{unit tiles} &= "+fmt(c)+" \\end{aligned} \\] So the model shows <b>"+corr+"</b>.";
    var q=mcq("In the tile model in the diagram, a large square is an \\(x^{2}\\) tile, a long thin rectangle is an \\(x\\) tile and a small square is a unit tile. Positive tiles are filled and negative tiles are outlined only, with a minus sign on each one. Which expression does the model show?",{t:corr,fb:"Correct: each tile count in the picture becomes the matching term."},ds,sol,{mode:"tiles-fig-expr",a:a,b:b,c:c});
    q.figure=u4tTiles(a,b,c);
    return q;
  }
  var qf=mcq("In the tile model in the diagram, a large square is an \\(x^{2}\\) tile, a long thin rectangle is an \\(x\\) tile and a small square is a unit tile. Positive tiles are filled and negative tiles are outlined only, with a minus sign on each one. Which expression does the model show?",{t:u4m(2,-3,1),fb:"Correct: each tile count in the picture becomes the matching term."},[{t:u4m(2,3,1),fb:"The x tiles have the opposite sign in the model."},{t:u4m(2,-3,-1),fb:"The unit tiles have the opposite sign in the model."},{t:u4m(-3,2,1),fb:"That swaps the x squared count with the x count."}],"Counting the tiles with their signs gives <b>"+u4m(2,-3,1)+"</b>.",{mode:"tiles-fig-expr",a:2,b:-3,c:1});
  qf.figure=u4tTiles(2,-3,1);
  return qf;
}, ["Read the picture tile by tile: count each kind and keep the sign shown on the tiles.", "First count the large squares: that count, with its sign, is the x squared coefficient."]);

E("u4-tiles-figure-build", 4, ["8.15"], 1, "gen", function(){
  function kindName(k){return k===0?"x squared":(k===1?"x":"unit");}
  function kindTex(k){return k===0?"x^{2}":(k===1?"x":"\\text{unit}");}
  function tileWord(n){return n===1?"tile":"tiles";}
  function makeAction(verb,count,sign,k){return verb+" "+fmt(count)+" "+sign+" "+kindName(k)+" "+tileWord(count);}
  for(var att=0;att<300;att++){
    var prime=[ri(-3,3),ri(-5,5),ri(-5,5)];
    var nzP=(prime[0]!==0?1:0)+(prime[1]!==0?1:0)+(prime[2]!==0?1:0);
    if(nzP<2)continue;
    var k=ri(0,2),delta=pick([-2,-1,1,2]);
    var from=prime[k],to=from+delta;
    var lim=k===0?3:5;
    if(Math.abs(to)>lim)continue;
    if(!(from===0||to===0||(from>0)===(to>0)))continue;
    var target=prime.slice();target[k]=to;
    var nzT=(target[0]!==0?1:0)+(target[1]!==0?1:0)+(target[2]!==0?1:0);
    if(nzT<2)continue;
    var verb,sign;
    if(delta>0&&from>=0){verb="Add";sign="positive";}
    else if(delta>0){verb="Remove";sign="negative";}
    else if(to>=0){verb="Remove";sign="positive";}
    else{verb="Add";sign="negative";}
    var count=Math.abs(delta);
    var corr=makeAction(verb,count,sign,k);
    var otherKind=k===0?1:(k===1?2:0);
    var cands=[
      {t:makeAction(verb==="Add"?"Remove":"Add",count,sign,k),fb:"That moves the "+kindName(k)+" count the wrong way; compare the two coefficients."},
      {t:makeAction(verb,count,sign==="positive"?"negative":"positive",k),fb:"That uses tiles of the wrong sign; the needed change keeps the sign shown by the coefficients."},
      {t:makeAction(verb,count+1,sign,k),fb:"That changes the right kind of tile by the wrong amount; the coefficients differ by "+fmt(count)+"."},
      {t:makeAction(verb,count,sign,otherKind),fb:"That changes the "+kindName(otherKind)+" tiles; only the "+kindName(k)+" coefficient changes."}
    ];
    var ds=u4pick3(corr,cands);
    if(ds.length<3)continue;
    var sol="Compare the "+kindName(k)+" coefficients: \\[ \\begin{aligned} "+kindTex(k)+" \\text{ in the model} &= "+fmt(from)+" \\\\ "+kindTex(k)+" \\text{ needed} &= "+fmt(to)+" \\end{aligned} \\] The other coefficients already match, so the change is to <b>"+corr+"</b>.";
    var q=mcq("The diagram shows an algebra tile model of "+u4m(prime[0],prime[1],prime[2])+". What must be done to change this model into a model of "+u4m(target[0],target[1],target[2])+"? In the model, a large square is an \\(x^{2}\\) tile, a long thin rectangle is an \\(x\\) tile and a small square is a unit tile; positive tiles are filled and negative tiles are outlined only, with a minus sign on each one.",{t:corr,fb:"Correct: only that one coefficient changes, by exactly that edit."},ds,sol,{mode:"tiles-fig-build",a:prime[0],b:prime[1],c:prime[2],ta:target[0],tb:target[1],tc:target[2],k:k});
    q.figure=u4tTiles(prime[0],prime[1],prime[2]);
    return q;
  }
  var qf=mcq("The diagram shows an algebra tile model of "+u4m(1,1,2)+". What must be done to change this model into a model of "+u4m(1,3,2)+"? In the model, a large square is an \\(x^{2}\\) tile, a long thin rectangle is an \\(x\\) tile and a small square is a unit tile; positive tiles are filled and negative tiles are outlined only, with a minus sign on each one.",{t:"Add 2 positive x tiles",fb:"Correct: only that one coefficient changes, by exactly that edit."},[{t:"Remove 2 positive x tiles",fb:"That moves the x count the wrong way."},{t:"Add 2 negative x tiles",fb:"That uses tiles of the wrong sign."},{t:"Add 2 positive unit tiles",fb:"That changes the unit tiles; only the x coefficient changes."}],"The x coefficient rises from 1 to 3, so the change is to <b>Add 2 positive x tiles</b>.",{mode:"tiles-fig-build",a:1,b:1,c:2,ta:1,tb:3,tc:2,k:1});
  qf.figure=u4tTiles(1,1,2);
  return qf;
}, ["Compare the model expression with the target expression one coefficient at a time and find the one that differs.", "First compare the x squared coefficients, then the x coefficients, then the constants, until you find the single difference."]);

E("u4-match-equivalent", 4, ["8.4"], 2, "gen", function(){
  for(var att=0;att<300;att++){
    var a=u4nz(-4,4),b=u4nz(-5,5),c=u4nz(-6,6);
    var feas=[];
    if(Math.abs(a)>=2)feas.push(0);
    if(Math.abs(b)>=2)feas.push(1);
    if(Math.abs(c)>=2)feas.push(2);
    if(!feas.length)continue;
    var sk=pick(feas);
    var corrPlain,splitNote;
    if(sk===0){var a1=a>0?1:-1,a2=a-a1;corrPlain=u4expr([[a1,"x^{2}"],[b,"x"],[a2,"x^{2}"],[c,""]]);splitNote=u4expr([[a1,""],[a2,""]])+"="+fmt(a);}
    else if(sk===1){var b1=b>0?1:-1,b2=b-b1;corrPlain=u4expr([[a,"x^{2}"],[b1,"x"],[c,""],[b2,"x"]]);splitNote=u4expr([[b1,""],[b2,""]])+"="+fmt(b);}
    else{var c1=c>0?1:-1,c2=c-c1;corrPlain=u4expr([[a,"x^{2}"],[c1,""],[b,"x"],[c2,""]]);splitNote=u4expr([[c1,""],[c2,""]])+"="+fmt(c);}
    var corr="\\("+corrPlain+"\\)";
    var orders=[[[c,""],[a,"x^{2}"],[b,"x"]],[[b,"x"],[c,""],[a,"x^{2}"]],[[c,""],[b,"x"],[a,"x^{2}"]]];
    var targetPlain=u4expr(pick(orders));
    var aOff=a>0?a+1:a-1;
    var cands=[
      {t:u4m(a,-b,c),fb:"The x coefficient has the wrong sign; equivalent forms keep every coefficient."},
      {t:u4m(aOff,b,c),fb:"The x squared coefficient is off by one; equivalent forms keep every coefficient."},
      {t:u4m(a,b,-c),fb:"The constant has the wrong sign; equivalent forms keep every coefficient."},
      {t:u4m(a+b,0,c),fb:"That folds the x coefficient into the x squared term, but those are unlike terms."}
    ];
    var ds=u4pick3(corr,cands);
    if(ds.length<3)continue;
    var sol="Write the target in the usual order, and combine the split part of the matching form (\\("+splitNote+"\\)): \\[ \\begin{aligned} \\text{target} &= "+u4p(a,b,c)+" \\\\ \\text{matching form} &= "+corrPlain+" \\\\ &= "+u4p(a,b,c)+" \\end{aligned} \\] Both give the same polynomial, so the match is <b>"+corr+"</b>.";
    return mcq("Which expression is equivalent to \\("+targetPlain+"\\)? Equivalent expressions have the same value for every value of \\(x\\).",{t:corr,fb:"Correct: its split terms combine back to exactly the target coefficients."},ds,sol,{mode:"match-equiv",a:a,b:b,c:c,sk:sk});
  }
  return mcq("Which expression is equivalent to \\(5+3x^{2}-2x\\)? Equivalent expressions have the same value for every value of \\(x\\).",{t:"\\(x^{2}+2x^{2}-2x+5\\)",fb:"Correct: its split terms combine back to exactly the target coefficients."},[{t:u4m(3,2,5),fb:"The x coefficient has the wrong sign."},{t:u4m(4,-2,5),fb:"The x squared coefficient is off by one."},{t:u4m(3,-2,-5),fb:"The constant has the wrong sign."}],"Combining the split x squared part, 1 plus 2, gives the target, so the match is <b>\\(x^{2}+2x^{2}-2x+5\\)</b>.",{mode:"match-equiv",a:3,b:-2,c:5,sk:0});
}, ["Compare coefficients kind by kind: equivalent forms have the same x squared coefficient, the same x coefficient and the same constant.", "First rewrite the target with the x squared term first, then check which option combines to those same three numbers."]);

E("u4-mult-monomial-area", 4, ["8.8"], 3, "gen", function(){
  for(var att=0;att<300;att++){
    var m=ri(2,4),p=ri(1,5),c=u4nz(-6,6);
    var mp=m*p,mc=m*c;
    var corr=u4m(mp,mc,0);
    var cands=[
      {t:u4m(mp,0,mc),fb:"That writes the second region product as a constant; multiplying by a monomial with x gives an x term."},
      {t:u4m(mp,m+c,0),fb:"The constant part was added to the monomial coefficient instead of multiplied by the whole monomial."},
      {t:u4m(mp,-mc,0),fb:"The second region product has the wrong sign; check the sign of the constant part."},
      {t:u4m(mp,c,0),fb:"That counts only the first region and leaves the second part unmultiplied by the monomial."}
    ];
    var ds=u4pick3(corr,cands);
    if(ds.length<3)continue;
    var mono=u4expr([[m,"x"]]),other=u4p(0,p,c);
    var sol="Multiply the monomial into each part of the other side and add the two region areas: \\[ \\begin{aligned} A &= ("+mono+")("+other+") \\\\ &= ("+mono+")("+u4expr([[p,"x"]])+") + ("+mono+")("+fmt(c)+") \\\\ &= "+u4p(mp,mc,0)+" \\end{aligned} \\] So the total area is <b>"+corr+"</b>.";
    var q=mcq("The diagram shows a rectangle split into two regions. Its height is \\("+mono+"\\), and the two parts of its top side are \\("+u4expr([[p,"x"]])+"\\) and \\("+fmt(c)+"\\). The area of a rectangle is its height times its width. What is the total area of the rectangle as a simplified polynomial?",{t:corr,fb:"Correct: the monomial multiplies both parts, and the region areas add."},ds,sol,{mode:"area-mono",m:m,p:p,c:c});
    q.figure=u4tArea(m,p,c);
    return q;
  }
  var qf=mcq("The diagram shows a rectangle split into two regions. Its height is \\(3x\\), and the two parts of its top side are \\(2x\\) and \\(5\\). The area of a rectangle is its height times its width. What is the total area of the rectangle as a simplified polynomial?",{t:u4m(6,15,0),fb:"Correct: the monomial multiplies both parts, and the region areas add."},[{t:u4m(6,0,15),fb:"That writes the second region product as a constant."},{t:u4m(6,8,0),fb:"The constant part was added instead of multiplied."},{t:u4m(6,-15,0),fb:"The second region product has the wrong sign."}],"Multiplying into both parts gives <b>"+u4m(6,15,0)+"</b>.",{mode:"area-mono",m:3,p:2,c:5});
  qf.figure=u4tArea(3,2,5);
  return qf;
}, ["Multiply the monomial by each part of the split side, then add the two region areas.", "First find the area of the left region: multiply the height by the first part of the top side."]);

E("u4-divide-missing-term", 4, ["8.9"], 3, "gen", function(){
  for(var att=0;att<300;att++){
    var m=pick([-4,-3,-2,2,3,4]),p=u4nz(-5,5),qq=u4nz(-5,5);
    var B=m*qq,mp=m*p;
    var corrPlain=u4expr([[mp,"x^{3}"]]);
    var corr="\\("+corrPlain+"\\)";
    var cands=[
      {t:"\\("+u4expr([[p,"x^{2}"]])+"\\)",fb:"That is the quotient term itself; it still has to be multiplied by the divisor."},
      {t:"\\("+u4expr([[p,"x^{3}"]])+"\\)",fb:"The power is right, but the coefficient of the divisor was not applied."},
      {t:"\\("+u4expr([[mp,"x^{2}"]])+"\\)",fb:"The coefficient is right, but multiplying by the divisor raises the power by one, to 3."},
      {t:"\\("+u4expr([[mp,"x^{4}"]])+"\\)",fb:"That power is one too high; the divisor has power 1, so the missing term has power 3."}
    ];
    var ds=u4pick3(corr,cands);
    if(ds.length<3)continue;
    var divisor=u4expr([[m,"x"]]),quotient=u4p(p,qq,0);
    var bSigned=(B<0?" - ":" + ")+u4expr([[Math.abs(B),"x^{2}"]]);
    var sol="Work backwards from the quotient term that pairs with the blank, and check with the known term: \\[ \\begin{aligned} \\text{missing term} \\div ("+divisor+") &= "+u4expr([[p,"x^{2}"]])+" \\\\ \\text{missing term} &= "+u4expr([[p,"x^{2}"]])+" \\cdot ("+divisor+") \\\\ &= "+corrPlain+" \\end{aligned} \\] Check: \\(("+u4expr([[B,"x^{2}"]])+") \\div ("+divisor+") = "+u4expr([[qq,"x"]])+"\\), which matches the quotient. So the blank is <b>"+corr+"</b>.";
    return mcq("A division has one term of the dividend missing: \\((\\underline{\\hspace{1.2cm}}"+bSigned+") \\div ("+divisor+") = ("+quotient+")\\). Which monomial fills the blank?",{t:corr,fb:"Correct: multiplying that quotient term by the divisor gives this term."},ds,sol,{mode:"div-missing",m:m,p:p,q:qq});
  }
  return mcq("A division has one term of the dividend missing: \\((\\underline{\\hspace{1.2cm}} + 6x^{2}) \\div (3x) = (2x^{2}+2x)\\). Which monomial fills the blank?",{t:"\\(6x^{3}\\)",fb:"Correct: multiplying that quotient term by the divisor gives this term."},[{t:"\\(2x^{2}\\)",fb:"That is the quotient term itself; it still has to be multiplied by the divisor."},{t:"\\(2x^{3}\\)",fb:"The power is right, but the coefficient of the divisor was not applied."},{t:"\\(6x^{2}\\)",fb:"The coefficient is right, but the power should rise by one, to 3."}],"Multiplying the quotient term by the divisor gives <b>\\(6x^{3}\\)</b>.",{mode:"div-missing",m:3,p:2,q:2});
}, ["Division undoes multiplication: multiply the matching quotient term by the divisor to recover the missing term.", "First match the blank with the first quotient term, since the known term pairs with the second one."]);

