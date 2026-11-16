// Math 9 Unit 4 Polynomials question bank
// Cut verbatim from the standalone bank source
// (math-9-review/bank-src.js, lines 1128 to 1504).
// CRMARKS: u4-add=3
// CRMARKS: u4-subtract=3
// CRMARKS: u4-multiply-monomial=3
// CRMARKS: u4-divide-monomial=2
// CRMARKS: u4-mult-div-mixed=2
// CRMARKS: u4-missing=3
// CRMARKS: u4-area-monomial=2
/* Unit 4: Polynomials */
function u4expr(terms){var s="",first=true;for(var i=0;i<terms.length;i++){var cf=terms[i][0],v=terms[i][1];if(cf===0)continue;var mag;if(v===""){mag=fmt(Math.abs(cf));}else if(Math.abs(cf)===1){mag=v;}else{mag=fmt(Math.abs(cf))+v;}if(first){s+=(cf<0?"-":"")+mag;first=false;}else{s+=(cf<0?"-":"+")+mag;}}return s===""?"0":s;}
function u4p(a,b,c){return u4expr([[a,"x^{2}"],[b,"x"],[c,""]]);}
function u4m(a,b,c){return "\\("+u4p(a,b,c)+"\\)";}
function u4pxy(x,y,k){return u4expr([[x,"x"],[y,"y"],[k,""]]);}
function u4mxy(x,y,k){return "\\("+u4pxy(x,y,k)+"\\)";}
function u4nz(a,b){var v=ri(a,b),g=0;while(v===0&&g<60){v=ri(a,b);g++;}return v===0?2:v;}
function u4ok(c,ds){var all=[c];for(var i=0;i<ds.length;i++){if(all.indexOf(ds[i].t)>=0)return false;all.push(ds[i].t);}return true;}
function u4tiles(a,b,c){var parts=[];function tw(n,w){return fmt(Math.abs(n))+" "+(Math.abs(n)===1?w+" tile":w+" tiles");}if(a!==0)parts.push(tw(a,(a>0?"positive":"negative")+" x squared"));if(b!==0)parts.push(tw(b,(b>0?"positive":"negative")+" x"));if(c!==0)parts.push(tw(c,(c>0?"positive":"negative")+" unit"));return parts.length?parts.join(", "):"no tiles";}
function u4pick3(c,cands){var out=[],seen=[c];for(var i=0;i<cands.length&&out.length<3;i++){if(seen.indexOf(cands[i].t)<0){seen.push(cands[i].t);out.push(cands[i]);}}return out;}

E("u4-degree", 4, ["8.14"], 1, "gen", function(){
  var form=ri(0,2),a=0,b=0,c=0,deg=0;
  if(form===0){a=u4nz(-6,6);b=ri(-6,6);c=ri(-6,6);deg=2;}
  else if(form===1){b=u4nz(-8,8);c=ri(-8,8);deg=1;}
  else{c=u4nz(-9,9);deg=0;}
  var terms=(a!==0?1:0)+(b!==0?1:0)+(c!==0?1:0);
  var lead=a!==0?a:(b!==0?b:c);
  var cands=[{t:fmt(deg+1),fb:"That is one more than the highest power of x."},{t:fmt(terms),fb:"That counts the terms, not the highest power."},{t:fmt(Math.abs(lead)),fb:"That is a coefficient, not the highest power."},{t:fmt(deg+2),fb:"That is higher than any power in the expression."},{t:fmt(deg+3),fb:"That is higher than any power in the expression."}];
  var ds=u4pick3(fmt(deg),cands);
  var sol="The degree is the highest power of \\(x\\) in "+u4m(a,b,c)+". The highest power here gives degree <b>"+fmt(deg)+"</b>.";
  return mcq("What is the degree of "+u4m(a,b,c)+"?",{t:fmt(deg),fb:"Correct: the degree is the highest power of x."},ds,sol,{mode:"degree",form:form,a:a,b:b,c:c});
}, ["Look for the highest power of x in the expression.", "Find the term with the largest exponent; that exponent is the degree."]);

E("u4-parts", 4, ["8.14"], 1, "gen", function(){
  var a=u4nz(-8,8),b=u4nz(-9,9),c=u4nz(-9,9);
  var mode=pick(["terms","coeffx","coeffx2","const"]);
  var qtext="",ans=0;
  if(mode==="terms"){qtext="How many terms does "+u4m(a,b,c)+" have?";ans=3;}
  else if(mode==="coeffx"){qtext="What is the coefficient of the \\(x\\) term in "+u4m(a,b,c)+"?";ans=b;}
  else if(mode==="coeffx2"){qtext="What is the coefficient of the \\(x^{2}\\) term in "+u4m(a,b,c)+"?";ans=a;}
  else{qtext="What is the constant term in "+u4m(a,b,c)+"?";ans=c;}
  var cands=[{t:fmt(a),fb:"That is the coefficient of the x squared term."},{t:fmt(b),fb:"That is the coefficient of the x term."},{t:fmt(c),fb:"That is the constant term."},{t:fmt(3),fb:"That is the number of terms."},{t:fmt(ans+1),fb:"That is one more than the value asked for."},{t:fmt(ans-1),fb:"That is one less than the value asked for."},{t:fmt(-ans),fb:"Watch the sign: that value has the wrong sign."},{t:fmt(ans+2),fb:"That is two more than the value asked for."}];
  var ds=u4pick3(fmt(ans),cands);
  var label=mode==="terms"?"number of terms":(mode==="coeffx"?"coefficient of the x term":(mode==="coeffx2"?"coefficient of the x squared term":"constant term"));
  var sol="In "+u4m(a,b,c)+", the "+label+" is <b>"+fmt(ans)+"</b>.";
  return mcq(qtext,{t:fmt(ans),fb:"Correct: you read that value straight from the expression."},ds,sol,{mode:mode,a:a,b:b,c:c});
}, ["Read the value straight from the written expression; no simplifying is needed.", "Point to the part named in the question, then read off its value."]);

E("u4-tiles-to-expr", 4, ["8.16"], 1, "gen", function(){
  for(var att=0;att<200;att++){
    var a=ri(-4,4),b=ri(-5,5),c=ri(-5,5);
    var nz=(a!==0?1:0)+(b!==0?1:0)+(c!==0?1:0);
    if(nz<2)continue;
    var corr=u4m(a,b,c);
    var ds=[{t:u4m(a,-b,c),fb:"The x tiles have the opposite sign in the model."},{t:u4m(a,b,-c),fb:"The unit tiles have the opposite sign in the model."},{t:u4m(b,a,c),fb:"That swaps the x squared count with the x count."},{t:u4m(-a,b,c),fb:"The x squared tiles have the opposite sign in the model."}];
    if(!u4ok(corr,ds))continue;
    ds=ds.slice(0,3);
    var sol="Count each kind of tile with its sign: \\[ \\begin{aligned} x^{2} \\text{ tiles} &= "+fmt(a)+" \\\\ x \\text{ tiles} &= "+fmt(b)+" \\\\ \\text{unit tiles} &= "+fmt(c)+" \\end{aligned} \\] So the model shows <b>"+corr+"</b>.";
    return mcq("In an algebra tile model, a large square tile stands for \\(x^{2}\\), a long thin tile stands for \\(x\\) and a small square tile stands for \\(1\\); positive tiles are shaded and negative tiles are unshaded. A model has "+u4tiles(a,b,c)+". Which expression does the model show?",{t:corr,fb:"Correct: each tile count becomes the matching term."},ds,sol,{mode:"tiles2expr",a:a,b:b,c:c});
  }
  return mcq("A model has 2 positive x squared tiles, 3 positive x tiles, 1 negative unit tile. Which expression does the model show?",{t:u4m(2,3,-1),fb:"Correct: each tile count becomes the matching term."},[{t:u4m(2,3,1),fb:"The unit tile is negative in the model."},{t:u4m(3,2,-1),fb:"That swaps the x squared count with the x count."},{t:u4m(2,-3,-1),fb:"The x tiles are positive in the model."}],"Counting with signs gives <b>"+u4m(2,3,-1)+"</b>.",{mode:"tiles2expr",a:2,b:3,c:-1});
}, ["Turn each tile count into a term, keeping the sign of the tiles.", "Write the x squared count first, then the x count, then the unit count."]);

E("u4-expr-to-tiles", 4, ["8.15"], 1, "gen", function(){
  for(var att=0;att<200;att++){
    var a=u4nz(-4,4),b=u4nz(-5,5),c=u4nz(-5,5);
    var corr=u4tiles(a,b,c);
    var ds=[{t:u4tiles(a,-b,c),fb:"That flips the sign of the x tiles."},{t:u4tiles(a,b,-c),fb:"That flips the sign of the unit tiles."},{t:u4tiles(b,a,c),fb:"That swaps the x squared count with the x count."},{t:u4tiles(-a,b,c),fb:"That flips the sign of the x squared tiles."}];
    if(!u4ok(corr,ds))continue;
    ds=ds.slice(0,3);
    var sol="Each term tells the tile count: the \\(x^{2}\\) term gives "+fmt(a)+", the \\(x\\) term gives "+fmt(b)+" and the constant gives "+fmt(c)+". So the matching model has <b>"+corr+"</b>.";
    return mcq("Which description matches an algebra tile model of "+u4m(a,b,c)+"? In the model, a large square tile stands for \\(x^{2}\\), a long thin tile stands for \\(x\\) and a small square tile stands for \\(1\\).",{t:corr,fb:"Correct: each term becomes tiles of that kind and sign."},ds,sol,{mode:"expr2tiles",a:a,b:b,c:c});
  }
  return mcq("Which description matches an algebra tile model of "+u4m(2,-3,4)+"?",{t:u4tiles(2,-3,4),fb:"Correct: each term becomes tiles of that kind and sign."},[{t:u4tiles(2,3,4),fb:"That flips the sign of the x tiles."},{t:u4tiles(2,-3,-4),fb:"That flips the sign of the unit tiles."},{t:u4tiles(-3,2,4),fb:"That swaps the x squared count with the x count."}],"Reading term by term gives <b>"+u4tiles(2,-3,4)+"</b>.",{mode:"expr2tiles",a:2,b:-3,c:4});
}, ["Match each term of the expression to tiles of the same kind and sign.", "Start with the x squared term: its coefficient tells how many large square tiles, and its sign tells positive or negative."]);

E("u4-equivalent", 4, ["8.4","8.5"], 1, "gen", function(){
  for(var att=0;att<200;att++){
    var a=u4nz(-8,8),b=ri(-8,8),c=u4nz(-8,8),d=ri(-8,8);
    if(b===0&&d===0)continue;
    var sx=a+c,sk=b+d;
    if(sx===0)continue;
    var raw="\\("+u4expr([[a,"x"],[b,""],[c,"x"],[d,""]])+"\\)";
    var corr=u4m(0,sx,sk);
    var ds=[{t:u4m(0,sx,b-d),fb:"The constants were subtracted; both constants keep their signs when combining."},{t:u4m(0,a-c,sk),fb:"The x coefficients were subtracted; like terms are added with their signs."},{t:u4m(0,sx+sk,0),fb:"That combines the x terms and the constants into one term, but they are unlike terms."},{t:u4m(0,sx,-sk),fb:"The combined constant has the wrong sign."}];
    if(!u4ok(corr,ds))continue;
    ds=ds.slice(0,3);
    var sol="Combine the like terms: \\[ \\begin{aligned} "+u4expr([[a,"x"],[b,""],[c,"x"],[d,""]])+" &= ("+fmt(a)+"x+"+fmt(c)+"x)+("+fmt(b)+""+(d<0?"":"+")+""+fmt(d)+") \\\\ &= "+u4p(0,sx,sk)+" \\end{aligned} \\] So the equivalent expression is <b>"+corr+"</b>.";
    return mcq("Which expression is equivalent to "+raw+"?",{t:corr,fb:"Correct: the x terms combine and the constants combine."},ds,sol,{mode:"combine",a:a,b:b,c:c,d:d});
  }
  return mcq("Which expression is equivalent to \\(3x+2+5x-4\\)?",{t:u4m(0,8,-2),fb:"Correct: the x terms combine and the constants combine."},[{t:u4m(0,8,6),fb:"The constants were added without their signs."},{t:u4m(0,-2,-2),fb:"The x coefficients were subtracted instead of added."},{t:u4m(0,6,0),fb:"That combines unlike terms into one term."}],"Combining like terms gives <b>"+u4m(0,8,-2)+"</b>.",{mode:"combine",a:3,b:2,c:5,d:-4});
}, ["Group the x terms together and the constants together, then combine each group.", "First add the two x coefficients, keeping the signs of both numbers."]);

E("u4-add", 4, ["8.6"], 1, "gen", function(){
  for(var att=0;att<200;att++){
    var tri=ri(0,1)===1;
    var a1=tri?u4nz(-5,5):0,b1=u4nz(-8,8),c1=u4nz(-8,8);
    var a2=tri?ri(-5,5):0,b2=u4nz(-8,8),c2=u4nz(-8,8);
    var sa=a1+a2,sb=b1+b2,sc=c1+c2;
    var corr=u4m(sa,sb,sc);
    var ds=[{t:u4m(sa,sb,c1-c2),fb:"The constants were subtracted; addition keeps both signs as they are."},{t:u4m(sa,b1-b2,sc),fb:"The x coefficients were subtracted; addition keeps both signs as they are."},{t:u4m(sa,sb+sc,0),fb:"That folds the constant into the x term, but they are unlike terms."},{t:u4m(sa+a2,sb,sc),fb:"The x squared terms were handled twice; add each pair once."}];
    if(!u4ok(corr,ds))continue;
    ds=ds.slice(0,3);
    var sol="Group the like terms: \\[ \\begin{aligned} ("+u4p(a1,b1,c1)+")+("+u4p(a2,b2,c2)+") &= ("+u4expr([[a1,"x^{2}"],[a2,"x^{2}"],[b1,"x"],[b2,"x"]])+")+("+u4expr([[c1,""],[c2,""]])+") \\\\ &= "+u4p(sa,sb,sc)+" \\end{aligned} \\] So the sum is <b>"+corr+"</b>.";
    return mcq("Add: \\(("+u4p(a1,b1,c1)+")+("+u4p(a2,b2,c2)+")\\)",{t:corr,fb:"Correct: like terms are added pair by pair."},ds,sol,{mode:tri?"add-tri":"add-bi",a1:a1,b1:b1,c1:c1,a2:a2,b2:b2,c2:c2,cr:3});
  }
  return mcq("Add: \\((3x+5)+(2x-4)\\)",{t:u4m(0,5,1),fb:"Correct: like terms are added pair by pair."},[{t:u4m(0,5,9),fb:"The constants were handled with the wrong sign."},{t:u4m(0,1,1),fb:"The x coefficients were subtracted instead of added."},{t:u4m(0,6,0),fb:"That folds the constant into the x term."}],"Grouping like terms gives <b>"+u4m(0,5,1)+"</b>.",{mode:"add-bi",cr:3});
}, ["Add matching parts: x squared with x squared, x with x, constants with constants.", "First add the two x coefficients, keeping both signs."]);

E("u4-subtract", 4, ["8.7"], 2, "gen", function(){
  for(var att=0;att<200;att++){
    var tri=ri(0,1)===1;
    var a1=tri?u4nz(-5,5):0,b1=u4nz(-8,8),c1=u4nz(-8,8);
    var a2=tri?u4nz(-5,5):0,b2=u4nz(-8,8),c2=u4nz(-8,8);
    var sa=a1-a2,sb=b1-b2,sc=c1-c2;
    var corr=u4m(sa,sb,sc);
    var ds=[{t:u4m(a1+a2,b1+b2,c1+c2),fb:"That adds the second polynomial; subtraction must change every sign in it first."},{t:u4m(sa,sb,c1+c2),fb:"The constant sign was left unchanged; subtraction changes every sign in the second polynomial."},{t:u4m(sa,b1+b2,sc),fb:"The x term sign was left unchanged; subtraction changes every sign in the second polynomial."},{t:u4m(sa,sb+sc,0),fb:"That folds the constant into the x term, but they are unlike terms."}];
    if(!u4ok(corr,ds))continue;
    ds=ds.slice(0,3);
    var sol="Change every sign in the second polynomial, then add: \\[ \\begin{aligned} ("+u4p(a1,b1,c1)+")-("+u4p(a2,b2,c2)+") &= ("+u4p(a1,b1,c1)+")+("+u4p(-a2,-b2,-c2)+") \\\\ &= "+u4p(sa,sb,sc)+" \\end{aligned} \\] So the difference is <b>"+corr+"</b>.";
    return mcq("Subtract: \\(("+u4p(a1,b1,c1)+")-("+u4p(a2,b2,c2)+")\\)",{t:corr,fb:"Correct: every sign in the second polynomial changes, then like terms combine."},ds,sol,{mode:tri?"sub-tri":"sub-bi",a1:a1,b1:b1,c1:c1,a2:a2,b2:b2,c2:c2,cr:3});
  }
  return mcq("Subtract: \\((5x+3)-(2x-4)\\)",{t:u4m(0,3,7),fb:"Correct: every sign in the second polynomial changes, then like terms combine."},[{t:u4m(0,3,-1),fb:"The constant sign was left unchanged; subtraction changes every sign in the second polynomial."},{t:u4m(0,7,7),fb:"That adds the second polynomial instead of subtracting it."},{t:u4m(0,3,1),fb:"The constant sign change was applied the wrong way."}],"Changing signs then adding gives <b>"+u4m(0,3,7)+"</b>.",{mode:"sub-bi",cr:3});
}, ["Subtraction changes the sign of every term in the second polynomial before you combine.", "First rewrite the second polynomial with every sign flipped, then add like terms."]);

E("u4-addsub-xy", 4, ["8.11"], 2, "gen", function(){
  for(var att=0;att<200;att++){
    var mode=ri(0,1);
    if(mode===0){
      var x1=u4nz(-7,7),y1=u4nz(-7,7),k1=ri(-7,7);
      var x2=u4nz(-7,7),y2=u4nz(-7,7),k2=ri(-7,7);
      var sub=ri(0,1)===1;
      var sx=sub?x1-x2:x1+x2,sy=sub?y1-y2:y1+y2,sk=sub?k1-k2:k1+k2;
      var corr=u4mxy(sx,sy,sk);
      var ds=[{t:u4mxy(sx,sub?y1+y2:y1-y2,sk),fb:sub?"The y sign was left unchanged; subtraction flips every sign in the second polynomial.":"The y coefficients were subtracted in an addition question."},{t:u4mxy(sx,sy,sub?k1+k2:k1-k2),fb:sub?"The constant sign was left unchanged; subtraction flips every sign in the second polynomial.":"The constants were subtracted in an addition question."},{t:u4mxy(sx+sy,0,sk),fb:"That combines the x and y terms, but they are unlike terms."}];
      if(!u4ok(corr,ds))continue;
      var op=sub?"-":"+",act=sub?"difference":"sum";
      var sol="Combine each kind of term on its own: the result is <b>"+corr+"</b>.";
      if(sub){sol="Change every sign in the second polynomial, then combine each kind of term on its own: \\[ \\begin{aligned} ("+u4pxy(x1,y1,k1)+")-("+u4pxy(x2,y2,k2)+") &= ("+u4pxy(x1,y1,k1)+")+("+u4pxy(-x2,-y2,-k2)+") \\\\ &= "+u4pxy(sx,sy,sk)+" \\end{aligned} \\] So the difference is <b>"+corr+"</b>.";}
      else{sol="Group the like terms: \\[ \\begin{aligned} ("+u4pxy(x1,y1,k1)+")+("+u4pxy(x2,y2,k2)+") &= ("+u4expr([[x1,"x"],[x2,"x"]])+")+("+u4expr([[y1,"y"],[y2,"y"]])+")+("+u4expr([[k1,""],[k2,""]])+") \\\\ &= "+u4pxy(sx,sy,sk)+" \\end{aligned} \\] So the sum is <b>"+corr+"</b>.";}
      return mcq((sub?"Subtract: \\((":"Add: \\((")+u4pxy(x1,y1,k1)+")"+op+"("+u4pxy(x2,y2,k2)+")\\)",{t:corr,fb:"Correct: x terms, y terms and constants are handled separately."},ds,sol,{mode:sub?"xy-sub":"xy-add",x1:x1,y1:y1,k1:k1,x2:x2,y2:y2,k2:k2});
    }else{
      var a=u4nz(-5,5),b=u4nz(-8,8),c=u4nz(-8,8);
      var d=ri(-5,5),e=-u4nz(2,8),f=-u4nz(2,8);
      var sa=a-d,sb=b-e,sc=c-f;
      var corr2=u4m(sa,sb,sc);
      var ds2=[{t:u4m(sa,b+e,sc),fb:"Subtracting a negative x term adds its value; the sign change step was missed."},{t:u4m(sa,sb,c+f),fb:"Subtracting a negative constant adds its value; the sign change step was missed."},{t:u4m(a+d,sb,sc),fb:"The x squared terms were added; this is a subtraction."}];
      if(!u4ok(corr2,ds2))continue;
      var sol2="Change every sign in the second polynomial, then add: \\[ \\begin{aligned} ("+u4p(a,b,c)+")-("+u4p(d,e,f)+") &= ("+u4p(a,b,c)+")+("+u4p(-d,-e,-f)+") \\\\ &= "+u4p(sa,sb,sc)+" \\end{aligned} \\] So the difference is <b>"+corr2+"</b>.";
      return mcq("Subtract: \\(("+u4p(a,b,c)+")-("+u4p(d,e,f)+")\\)",{t:corr2,fb:"Correct: subtracting a negative term adds its value."},ds2,sol2,{mode:"sub-neg",a:a,b:b,c:c,d:d,e:e,f:f});
    }
  }
  return mcq("Add: \\((2x+3y)+(x-2y)\\)",{t:u4mxy(3,1,0),fb:"Correct: x terms, y terms and constants are handled separately."},[{t:u4mxy(3,5,0),fb:"The y coefficients were handled with the wrong sign."},{t:u4mxy(4,1,0),fb:"That combines x and y terms, which are unlike."},{t:u4mxy(2,1,0),fb:"The x coefficients were not added."}],"Combining like terms gives <b>"+u4mxy(3,1,0)+"</b>.",{mode:"xy-add"});
}, ["Keep x terms, y terms and constants in separate groups; unlike terms stay separate.", "First combine the x coefficients, then do the same for the y coefficients."]);

E("u4-multiply-monomial", 4, ["8.8"], 1, "gen", function(){
  for(var att=0;att<200;att++){
    var mode=ri(0,2);
    if(mode===2){
      var b=u4nz(-7,7),c=u4nz(-8,8);
      var corr=u4m(b,c,0);
      var ds=[{t:u4m(0,b+c,0),fb:"Multiplying by x raises each power; the terms do not merge into one x term."},{t:u4m(b,0,0),fb:"That multiplies only the first term; x multiplies every term."},{t:u4m(-b,c,0),fb:"The first product has the wrong sign."},{t:u4m(b,-c,0),fb:"The second product has the wrong sign."}];
      if(!u4ok(corr,ds))continue;
      ds=ds.slice(0,3);
      var sol="Multiply every term by \\(x\\): \\[ \\begin{aligned} x("+u4p(0,b,c)+") &= x \\cdot "+u4expr([[b,"x"]])+" + x \\cdot ("+fmt(c)+") \\\\ &= "+u4p(b,c,0)+" \\end{aligned} \\] So the product is <b>"+corr+"</b>.";
      return mcq("Multiply: \\(x("+u4p(0,b,c)+")\\)",{t:corr,fb:"Correct: x multiplies every term and each power rises by one."},ds,sol,{mode:"x-times-bi",b:b,c:c,cr:3});
    }
    var k=pick([-5,-4,-3,-2,2,3,4,5]);
    var tri=mode===1;
    var a=tri?u4nz(-5,5):0,b2=u4nz(-7,7),c2=u4nz(-8,8);
    var corr2=u4m(k*a,k*b2,k*c2);
    var ds2=[{t:u4m(k*a,b2,c2),fb:"That multiplies only the first term; the monomial multiplies every term."},{t:u4m(k*a,k*b2,c2),fb:"The constant term was left unmultiplied; the monomial multiplies every term."},{t:u4m(k*a,k*b2,-k*c2),fb:"The constant product has the wrong sign."},{t:u4m(a+k,b2+k,c2+k),fb:"That adds the monomial to each coefficient; this question multiplies."}];
    if(!u4ok(corr2,ds2))continue;
    ds2=ds2.slice(0,3);
    var prts=[];if(a!==0)prts.push("("+u4expr([[k*a,"x^{2}"]])+")");prts.push("("+u4expr([[k*b2,"x"]])+")");prts.push("("+fmt(k*c2)+")");
    var sol2="Multiply every term by \\("+fmt(k)+"\\): \\[ \\begin{aligned} "+fmt(k)+"("+u4p(a,b2,c2)+") &= "+prts.join("+")+" \\\\ &= "+u4p(k*a,k*b2,k*c2)+" \\end{aligned} \\] So the product is <b>"+corr2+"</b>.";
    return mcq("Multiply: \\("+fmt(k)+"("+u4p(a,b2,c2)+")\\)",{t:corr2,fb:"Correct: the monomial multiplies every term."},ds2,sol2,{mode:tri?"const-times-tri":"const-times-bi",k:k,a:a,b:b2,c:c2,cr:3});
  }
  return mcq("Multiply: \\(3(2x+5)\\)",{t:u4m(0,6,15),fb:"Correct: the monomial multiplies every term."},[{t:u4m(0,6,5),fb:"The constant was left unmultiplied."},{t:u4m(0,5,15),fb:"The x term was left unmultiplied."},{t:u4m(0,6,-15),fb:"The constant product has the wrong sign."}],"Multiplying every term gives <b>"+u4m(0,6,15)+"</b>.",{mode:"const-times-bi",cr:3});
}, ["The monomial multiplies every term inside the brackets, not just the first one.", "First multiply the monomial by the first term, then by each remaining term."]);

E("u4-divide-monomial", 4, ["8.9"], 1, "gen", function(){
  for(var att=0;att<200;att++){
    if(ri(0,1)===0){
      var a=u4nz(-7,7),b=u4nz(-8,8);
      var corr=u4m(0,a,b);
      var ds=[{t:u4m(a,b,0),fb:"Dividing by x lowers each power by one; the result has an x term and a constant."},{t:u4m(0,a,0),fb:"That divides only the first term; every term is divided by x."},{t:u4m(0,-a,b),fb:"The first quotient term has the wrong sign."},{t:u4m(0,a,-b),fb:"The second quotient term has the wrong sign."}];
      if(!u4ok(corr,ds))continue;
      ds=ds.slice(0,3);
      var sol="Divide every term by \\(x\\): \\[ \\begin{aligned} ("+u4p(a,b,0)+") \\div x &= "+u4expr([[a,"x^{2}"]])+" \\div x + "+u4expr([[b,"x"]])+" \\div x \\\\ &= "+u4p(0,a,b)+" \\end{aligned} \\] So the quotient is <b>"+corr+"</b>.";
      return mcq("Divide: \\(("+u4p(a,b,0)+") \\div x\\)",{t:corr,fb:"Correct: every term is divided and each power drops by one."},ds,sol,{mode:"div-x",a:a,b:b,cr:2});
    }
    var d=pick([-4,-3,-2,2,3,4,5]);
    var q1=ri(0,1)===1?u4nz(-5,5):0,q2=u4nz(-6,6),q3=u4nz(-6,6);
    var corr2=u4m(q1,q2,q3);
    var A=d*q1,B=d*q2,C=d*q3;
    var ds2=[{t:u4m(q1,q2,C),fb:"The constant term was left undivided; every term is divided."},{t:u4m(A-d,B-d,C-d),fb:"That subtracts the divisor from each coefficient; this question divides."},{t:u4m(q1,-q2,q3),fb:"The middle quotient term has the wrong sign."},{t:u4m(q1,q2,-q3),fb:"The constant quotient term has the wrong sign."}];
    if(!u4ok(corr2,ds2))continue;
    ds2=ds2.slice(0,3);
    var dparts=[];if(A!==0)dparts.push("("+u4expr([[A,"x^{2}"]])+") \\div ("+fmt(d)+")");dparts.push("("+u4expr([[B,"x"]])+") \\div ("+fmt(d)+")");dparts.push("("+fmt(C)+") \\div ("+fmt(d)+")");
    var sol2="Divide every term by \\("+fmt(d)+"\\): \\[ \\begin{aligned} ("+u4p(A,B,C)+") \\div ("+fmt(d)+") &= "+dparts.join(" + ")+" \\\\ &= "+u4p(q1,q2,q3)+" \\end{aligned} \\] So the quotient is <b>"+corr2+"</b>.";
    return mcq("Divide: \\(("+u4p(A,B,C)+") \\div ("+fmt(d)+")\\)",{t:corr2,fb:"Correct: every term is divided by the monomial."},ds2,sol2,{mode:"div-const",d:d,q1:q1,q2:q2,q3:q3,cr:2});
  }
  return mcq("Divide: \\((6x+9) \\div 3\\)",{t:u4m(0,2,3),fb:"Correct: every term is divided by the monomial."},[{t:u4m(0,2,9),fb:"The constant was left undivided."},{t:u4m(0,3,6),fb:"That subtracts the divisor from each coefficient."},{t:u4m(0,2,-3),fb:"The constant quotient has the wrong sign."}],"Dividing every term gives <b>"+u4m(0,2,3)+"</b>.",{mode:"div-const",cr:2});
}, ["Every term of the polynomial is divided by the monomial, one term at a time.", "First divide the first term, then divide each remaining term by the same monomial."]);

E("u4-mult-div-mixed", 4, ["8.12"], 1, "gen", function(){
  for(var att=0;att<200;att++){
    if(ri(0,1)===0){
      var k=pick([-4,-3,-2,2,3,4]);
      var b=u4nz(-7,7),c=u4nz(-8,8);
      var corr=u4m(0,k*b,k*c);
      var ds=[{t:u4m(0,k*b,c),fb:"The constant was left unmultiplied; the monomial multiplies every term."},{t:u4m(0,b,k*c),fb:"The x term was left unmultiplied; the monomial multiplies every term."},{t:u4m(0,k*b,-k*c),fb:"The constant product has the wrong sign."}];
      if(!u4ok(corr,ds))continue;
      var sol="Multiply every term by \\("+fmt(k)+"\\): the product is <b>"+corr+"</b>.";
      return mcq("Multiply: \\("+fmt(k)+"("+u4p(0,b,c)+")\\)",{t:corr,fb:"Correct: the monomial multiplies every term."},ds,sol,{mode:"multiply",k:k,b:b,c:c,cr:2});
    }else{
      var d=pick([-4,-3,-2,2,3,4,5]);
      var q2=u4nz(-6,6),q3=u4nz(-6,6);
      var corr2=u4m(0,q2,q3);
      var ds2=[{t:u4m(0,q2,d*q3),fb:"The constant was left undivided; every term is divided."},{t:u4m(0,d*q2-d,q3),fb:"One part subtracts the divisor; every term is divided instead."},{t:u4m(0,-q2,q3),fb:"The first quotient term has the wrong sign."}];
      if(!u4ok(corr2,ds2))continue;
      var sol2="Divide every term by \\("+fmt(d)+"\\): the quotient is <b>"+corr2+"</b>.";
      return mcq("Divide: \\(("+u4p(0,d*q2,d*q3)+") \\div ("+fmt(d)+")\\)",{t:corr2,fb:"Correct: every term is divided by the monomial."},ds2,sol2,{mode:"divide",d:d,q2:q2,q3:q3,cr:2});
    }
  }
  return mcq("Multiply: \\(2(3x+4)\\)",{t:u4m(0,6,8),fb:"Correct: the monomial multiplies every term."},[{t:u4m(0,6,4),fb:"The constant was left unmultiplied."},{t:u4m(0,3,8),fb:"The x term was left unmultiplied."},{t:u4m(0,6,-8),fb:"The constant product has the wrong sign."}],"Multiplying every term gives <b>"+u4m(0,6,8)+"</b>.",{mode:"multiply",cr:2});
}, ["Decide first whether the monomial multiplies or divides, then apply it to every term.", "First apply the operation to the first term, then to each remaining term."]);

E("u4-error-step", 4, ["8.13"], 2, "gen", function(){
  for(var att=0;att<200;att++){
    var a=ri(3,9),b=ri(2,9),c=ri(2,8),d=ri(2,9);
    if(a-c===0||b-d===0)continue;
    var err=ri(1,4);
    var sd=-d, sxPair=a-c, skPair=b+sd;
    var s1,s2,s3,s4,px, pk;
    if(err===1){sd=d;}
    s1="\\(("+u4p(0,a,b)+")-("+u4p(0,c,d)+") = "+u4expr([[a,"x"],[b,""],[-c,"x"],[sd,""]])+"\\)";
    px=a-c; pk=b+sd;
    if(err===2){px=a+sd; pk=b-c; s2="Step 2 groups the terms as \\(("+u4expr([[a,"x"],[sd,"x"]])+")+("+u4expr([[b,""],[-c,""]])+")\\)";}
    else{s2="Step 2 groups the terms as \\(("+u4expr([[a,"x"],[-c,"x"]])+")+("+u4expr([[b,""],[sd,""]])+")\\)";}
    if(err===3){px=a+c;}
    s3="Step 3 combines the groups to get \\("+u4p(0,px,pk)+"\\)";
    if(err===4){pk=-pk;}
    s4="Step 4 writes the final answer as \\("+u4p(0,px,pk)+"\\)";
    var corr="Step "+fmt(err);
    var fbTxt={1:"Step 1 is where the sign change is handled.",2:"Step 2 is where the terms are grouped.",3:"Step 3 is where the groups are combined.",4:"Step 4 is where the final answer is written."};
    var opts=["Step 1","Step 2","Step 3","Step 4"].map(function(sv,idx){
      var n=idx+1;
      return {t:sv,fb:n===err?"Correct: this is the first line that goes wrong. "+fbTxt[n]:"That step follows correctly from the line before it."};
    });
    var corrOpt=opts[err-1];
    var ds=opts.filter(function(o){return o.t!==corr;});
    var prompt="A student simplified \\(("+u4p(0,a,b)+")-("+u4p(0,c,d)+")\\) in four steps.<br>Step 1 removes the brackets to get "+s1+".<br>"+s2+".<br>"+s3+".<br>"+s4+".<br>In which step does the first error occur?";
    var sol="Removing the brackets changes every sign in the second polynomial, grouping keeps like terms together, and combining gives \\("+u4p(0,a-c,b-d)+"\\). Checking each line against that process, the first error is in <b>"+corr+"</b>.";
    return mcq(prompt,corrOpt,ds,sol,{mode:"error-step",err:err,a:a,b:b,c:c,d:d});
  }
  return mcq("A student simplified \\((5x+3)-(2x-4)\\) and the first error is in the bracket removal step. In which step does the first error occur?",{t:"Step 1",fb:"Correct: this is the first line that goes wrong."},[{t:"Step 2",fb:"That step follows correctly from the line before it."},{t:"Step 3",fb:"That step follows correctly from the line before it."},{t:"Step 4",fb:"That step follows correctly from the line before it."}],"The first error is in <b>Step 1</b>.",{mode:"error-step",err:1});
}, ["Check each step against the step before it, in order, and stop at the first line that changes a value.", "First check the bracket removal: every sign in the second polynomial must change."]);

E("u4-equivalent-pair", 4, ["8.10"], 1, "gen", function(){
  for(var att=0;att<200;att++){
    var a=u4nz(-8,8),b=u4nz(-8,8);
    var corrT=u4m(0,a,b)+" and \\("+u4expr([[b,""],[a,"x"]])+"\\)";
    function pairStr(p,q){return u4m(0,p[0],p[1])+" and "+u4m(0,q[0],q[1]);}
    var r1=ri(2,8),r2=u4nz(-8,8),r3=u4nz(-8,8),r4=ri(2,8);
    var ds=[{t:pairStr([r1,r2],[r1,-r2]),fb:"The constant changes sign between the two expressions, so they differ."},{t:pairStr([r3,r4],[r4,r3]),fb:"The x coefficient and the constant trade places, so they differ."},{t:pairStr([r2,r1],[-r2,r1]),fb:"The x coefficient changes sign between the two expressions, so they differ."}];
    var seen=[corrT];var good=true;
    for(var i=0;i<ds.length;i++){if(seen.indexOf(ds[i].t)>=0)good=false;seen.push(ds[i].t);}
    if(!good)continue;
    var sol="Two expressions are equivalent when they simplify to the same polynomial. The pair \\("+u4p(0,a,b)+"\\) and \\("+u4expr([[b,""],[a,"x"]])+"\\) has the same terms in a different order, so the equivalent pair is <b>"+corrT+"</b>.";
    return mcq("Which pair of expressions are equivalent?",{t:corrT,fb:"Correct: the two expressions have exactly the same terms."},ds,sol,{mode:"pair",a:a,b:b});
  }
  return mcq("Which pair of expressions are equivalent?",{t:u4m(0,3,2)+" and \\(2+3x\\)",fb:"Correct: the two expressions have exactly the same terms."},[{t:u4m(0,3,2)+" and "+u4m(0,3,-2),fb:"The constant changes sign, so they differ."},{t:u4m(0,2,3)+" and "+u4m(0,3,2),fb:"The x coefficient and constant trade places, so they differ."},{t:u4m(0,3,2)+" and "+u4m(0,-3,2),fb:"The x coefficient changes sign, so they differ."}],"The equivalent pair is <b>"+u4m(0,3,2)+" and \\(2+3x\\)</b>.",{mode:"pair"});
}, ["Simplify or compare each pair term by term: equivalent expressions have identical terms.", "First check one pair: compare its x coefficient and its constant on both sides."]);

E("u4-tiles-addsub", 4, ["8.6","8.7"], 1, "gen", function(){
  for(var att=0;att<200;att++){
    var sub=ri(0,1)===1;
    var a1=ri(-3,3),b1=ri(-4,4),c1=ri(-4,4);
    var a2,b2,c2;
    if(sub){a2=ri(0,3);b2=ri(0,4);c2=ri(0,4);}
    else{a2=ri(-3,3);b2=ri(-4,4);c2=ri(-4,4);}
    var nz1=(a1!==0?1:0)+(b1!==0?1:0)+(c1!==0?1:0);
    var nz2=(a2!==0?1:0)+(b2!==0?1:0)+(c2!==0?1:0);
    if(nz1<1||nz2<1)continue;
    var ra=sub?a1-a2:a1+a2,rb=sub?b1-b2:b1+b2,rc=sub?c1-c2:c1+c2;
    var corr=u4m(ra,rb,rc);
    var ds=sub?[{t:u4m(a1+a2,b1+b2,c1+c2),fb:"That adds the second group; the question takes it away."},{t:u4m(ra,rb,c1+c2),fb:"The unit tiles were added; taking tiles away subtracts them."},{t:u4m(ra,b1+b2,rc),fb:"The x tiles were added; taking tiles away subtracts them."}]:[{t:u4m(a1-a2,b1-b2,c1-c2),fb:"That subtracts the second group; the question adds it."},{t:u4m(ra,rb,c1-c2),fb:"The unit tiles were subtracted; combining groups adds them."},{t:u4m(ra,b1-b2,rc),fb:"The x tiles were subtracted; combining groups adds them."}];
    if(!u4ok(corr,ds))continue;
    var prompt=sub?("A tile model shows "+u4tiles(a1,b1,c1)+". Then the tiles for "+u4m(a2,b2,c2)+" are taken away. Which expression shows the result?"):("A tile model shows "+u4tiles(a1,b1,c1)+". A second group of tiles, "+u4tiles(a2,b2,c2)+", is added. Which expression shows the result?");
    var sol=(sub?"Taking tiles away subtracts each count: ":"Combining the groups adds each count: ")+"the result is <b>"+corr+"</b>.";
    return mcq(prompt,{t:corr,fb:sub?"Correct: each tile count is subtracted.":"Correct: each tile count is added."},ds,sol,{mode:sub?"tiles-sub":"tiles-add",a1:a1,b1:b1,c1:c1,a2:a2,b2:b2,c2:c2});
  }
  return mcq("A tile model shows 3 positive x tiles, 2 positive unit tiles. A second group, 1 positive x tile and 1 positive unit tile, is added. Which expression shows the result?",{t:u4m(0,4,3),fb:"Correct: each tile count is added."},[{t:u4m(0,2,1),fb:"That subtracts the second group."},{t:u4m(0,4,1),fb:"The unit tiles were subtracted instead of added."},{t:u4m(0,2,3),fb:"The x tiles were subtracted instead of added."}],"Adding the counts gives <b>"+u4m(0,4,3)+"</b>.",{mode:"tiles-add"});
}, ["Work one tile kind at a time: combine or remove those counts first.", "First handle the x squared tiles, adding the counts if groups combine and subtracting if tiles are taken away."]);

E("u4-equiv-var", 4, ["8.5"], 2, "var", varset([
  function(){
    var corr="\\(5-3x+2x^{2}\\)";
    var sol="The model shows \\(2x^{2}-3x+5\\). Writing the same terms in a different order gives <b>"+corr+"</b>.";
    return mcq("A tile model has 2 positive x squared tiles, 3 negative x tiles and 5 positive unit tiles. Which expression is equivalent to the expression shown by the model?",{t:corr,fb:"Correct: it has the same three terms in a new order."},[{t:"\\(2x^{2}+3x+5\\)",fb:"The x term has the wrong sign compared with the model."},{t:"\\(3x^{2}-2x+5\\)",fb:"That swaps the x squared count with the x count."},{t:"\\(2x^{2}-3x-5\\)",fb:"The constant has the wrong sign compared with the model."}],sol,{mode:"var-tiles"});
  },
  function(){
    var corr="\\(2(2x+3)\\)";
    var sol="Multiplying out, \\(2(2x+3)=4x+6\\) for every value of \\(x\\). So the matching expression is <b>"+corr+"</b>.";
    return mcq("Which expression has the same value as \\(4x+6\\) for every value of \\(x\\)?",{t:corr,fb:"Correct: it multiplies out to exactly 4x plus 6."},[{t:"\\(2(2x+6)\\)",fb:"That multiplies out to 4x plus 12, so the constant differs."},{t:"\\(4(x+6)\\)",fb:"That multiplies out to 4x plus 24, so the constant differs."},{t:"\\(2x+3\\)",fb:"That is half of the given expression, so its values differ."}],sol,{mode:"var-same-value"});
  },
  function(){
    var corr="\\(8x+12\\)";
    var sol="Perimeter adds both lengths and both widths: \\[ \\begin{aligned} P &= 2(3x+2)+2(x+4) \\\\ &= 6x+4+2x+8 \\\\ &= 8x+12 \\end{aligned} \\] So the perimeter is <b>"+corr+"</b>.";
    return mcq("A rectangle has length \\(3x+2\\) and width \\(x+4\\). Which expression gives its perimeter in simplified form?",{t:corr,fb:"Correct: both lengths and both widths are counted, then like terms combine."},[{t:"\\(4x+6\\)",fb:"That counts each side only once; a perimeter counts all four sides."},{t:"\\(8x+6\\)",fb:"The widths were doubled but the lengths were counted once."},{t:"\\(7x+12\\)",fb:"One x term is missing when the four sides are added."}],sol,{mode:"var-perimeter"});
  }
]), ["Equivalent expressions have the same terms and the same value for every x.", "First work out what the given expression simplifies to, then compare each option with it."]);

E("u4-missing", 4, ["8.11"], 3, "gen", function(){
  for(var att=0;att<200;att++){
    var three=ri(0,1)===1;
    var a1=u4nz(-6,6),b1=u4nz(-8,8),c1=ri(-8,8);
    var ma=u4nz(-6,6),mb=u4nz(-8,8),mc2=u4nz(-8,8);
    var corr=u4m(ma,mb,mc2);
    var ds=[{t:u4m(ma,mb,-mc2),fb:"The constant has the wrong sign; work the subtraction term by term."},{t:u4m(ma,-mb,mc2),fb:"The x term has the wrong sign; work the subtraction term by term."},{t:u4m(-ma,mb,mc2),fb:"The x squared term has the wrong sign; work the subtraction term by term."}];
    if(!u4ok(corr,ds))continue;
    if(three){
      var a2=u4nz(-5,5),b2=ri(-7,7),c2v=ri(-7,7);
      var R=u4m(a1+a2+ma,b1+b2+mb,c1+c2v+mc2);
      var sol="Subtract both known polynomials from the total: \\[ \\begin{aligned} \\text{missing} &= ("+u4p(a1+a2+ma,b1+b2+mb,c1+c2v+mc2)+")-("+u4p(a1,b1,c1)+")-("+u4p(a2,b2,c2v)+") \\\\ &= "+u4p(ma,mb,mc2)+" \\end{aligned} \\] So the missing polynomial is <b>"+corr+"</b>.";
      return mcq("Find the missing polynomial: "+u4m(a1,b1,c1)+" + "+u4m(a2,b2,c2v)+" + missing = "+R+". What polynomial is missing?",{t:corr,fb:"Correct: the total minus the known parts leaves this polynomial."},ds,sol,{mode:"missing-three",cr:3});
    }
    var R2=u4m(a1+ma,b1+mb,c1+mc2);
    var sol2="Subtract the known polynomial from the total: \\[ \\begin{aligned} \\text{missing} &= ("+u4p(a1+ma,b1+mb,c1+mc2)+")-("+u4p(a1,b1,c1)+") \\\\ &= "+u4p(ma,mb,mc2)+" \\end{aligned} \\] So the missing polynomial is <b>"+corr+"</b>.";
    return mcq("Find the missing polynomial: "+u4m(a1,b1,c1)+" + missing = "+R2+". What polynomial is missing?",{t:corr,fb:"Correct: the total minus the known part leaves this polynomial."},ds,sol2,{mode:"missing-two",cr:3});
  }
  return mcq("Find the missing polynomial: "+u4m(0,3,2)+" + missing = "+u4m(0,7,-5)+". What polynomial is missing?",{t:u4m(0,4,-7),fb:"Correct: the total minus the known part leaves this polynomial."},[{t:u4m(0,4,7),fb:"The constant has the wrong sign."},{t:u4m(0,-4,-7),fb:"The x term has the wrong sign."},{t:u4m(0,10,-3),fb:"That adds the known part to the total instead of subtracting."}],"Subtracting gives <b>"+u4m(0,4,-7)+"</b>.",{mode:"missing-two",cr:3});
}, ["The missing part is the total minus the parts you already know.", "First subtract the known polynomial from the total, term by term."]);

E("u4-area-monomial", 4, ["8.12"], 3, "gen", function(){
  for(var att=0;att<200;att++){
    if(ri(0,1)===0){
      var usex=ri(0,1)===1;
      if(usex){
        var b=u4nz(-6,6),c=u4nz(-7,7);
        var corr=u4m(b,c,0);
        var ds=[{t:u4m(0,b+c,0),fb:"Multiplying by x raises each power; the terms stay separate."},{t:u4m(b,0,0),fb:"That uses only the first term; the length multiplies every term of the width."},{t:u4m(-b,c,0),fb:"The first product has the wrong sign."}];
        if(!u4ok(corr,ds))continue;
        var sol="Area is length times width: \\[ \\begin{aligned} A &= x("+u4p(0,b,c)+") \\\\ &= "+u4p(b,c,0)+" \\end{aligned} \\] So the area is <b>"+corr+"</b>.";
        return mcq("A rectangle has length \\(x\\) and width "+u4m(0,b,c)+". Which expression gives its area?",{t:corr,fb:"Correct: the length multiplies every term of the width."},ds,sol,{mode:"area-mult-x",cr:2});
      }
      var k=pick([-4,-3,-2,2,3,4]);
      var b2=u4nz(-6,6),c2=u4nz(-7,7);
      var corr2=u4m(0,k*b2,k*c2);
      var ds2=[{t:u4m(0,k*b2,c2),fb:"The second width term was left unmultiplied; the length multiplies every term."},{t:u4m(0,b2+k,c2+k),fb:"That adds the length to each term; area multiplies."},{t:u4m(0,k*b2,-k*c2),fb:"The second product has the wrong sign."}];
      if(!u4ok(corr2,ds2))continue;
      var sol2="Area is length times width: \\[ \\begin{aligned} A &= "+fmt(k)+"("+u4p(0,b2,c2)+") \\\\ &= "+u4p(0,k*b2,k*c2)+" \\end{aligned} \\] So the area is <b>"+corr2+"</b>.";
      return mcq("A rectangle has length \\("+fmt(k)+"\\) and width "+u4m(0,b2,c2)+". Which expression gives its area?",{t:corr2,fb:"Correct: the length multiplies every term of the width."},ds2,sol2,{mode:"area-mult-const",k:k,cr:2});
    }else{
      var d=pick([-4,-3,-2,2,3,4,5]);
      var q2=u4nz(-6,6),q3=u4nz(-6,6);
      var corr3=u4m(0,q2,q3);
      var ds3=[{t:u4m(0,q2,d*q3),fb:"The second term was left undivided; every term of the area is divided."},{t:u4m(0,d*q2-d,q3),fb:"One part subtracts the side length; finding a side divides."},{t:u4m(0,-q2,q3),fb:"The first term of the side has the wrong sign."}];
      if(!u4ok(corr3,ds3))continue;
      var sol3="Divide the area by the known side: \\[ \\begin{aligned} \\text{other side} &= ("+u4p(0,d*q2,d*q3)+") \\div ("+fmt(d)+") \\\\ &= "+u4p(0,q2,q3)+" \\end{aligned} \\] So the other side is <b>"+corr3+"</b>.";
      return mcq("A rectangle has area "+u4m(0,d*q2,d*q3)+" and one side of length \\("+fmt(d)+"\\) . Which expression gives the other side?",{t:corr3,fb:"Correct: the area divided by the known side gives the other side."},ds3,sol3,{mode:"area-div",d:d,cr:2});
    }
  }
  return mcq("A rectangle has length \\(3\\) and width "+u4m(0,2,5)+". Which expression gives its area?",{t:u4m(0,6,15),fb:"Correct: the length multiplies every term of the width."},[{t:u4m(0,6,5),fb:"The second width term was left unmultiplied."},{t:u4m(0,5,8),fb:"That adds the length to each term; area multiplies."},{t:u4m(0,6,-15),fb:"The second product has the wrong sign."}],"Length times width gives <b>"+u4m(0,6,15)+"</b>.",{mode:"area-mult-const",cr:2});
}, ["Area of a rectangle is length times width; a missing side is the area divided by the known side.", "First multiply or divide the first term, then do the same to every remaining term."]);

E("u4-error-var", 4, ["8.13","8.10"], 3, "var", varset([
  function(){
    var corr=u4m(0,3,7);
    var sol="Subtracting changes the sign of \\(-4\\) to \\(+4\\): \\[ \\begin{aligned} (5x+3)-(2x-4) &= 5x+3-2x+4 \\\\ &= 3x+7 \\end{aligned} \\] So the correct expression is <b>"+corr+"</b>.";
    return mcq("A student simplified \\((5x+3)-(2x-4)\\) and got \\(3x-1\\). What is the correct simplified expression?",{t:corr,fb:"Correct: the sign of the last term flips when the brackets are removed."},[{t:u4m(0,3,-1),fb:"That is the student answer; the last sign was left unchanged."},{t:u4m(0,7,7),fb:"That adds the x terms instead of subtracting them."},{t:u4m(0,3,1),fb:"The constant was combined with the wrong sign change."}],sol,{mode:"var-sub-sign"});
  },
  function(){
    var corr="\\(4x^{2}+3x\\)";
    var sol="The terms \\(4x^{2}\\) and \\(3x\\) are unlike terms, so they cannot be combined. The expression is already simplified: <b>"+corr+"</b>.";
    return mcq("A student simplified \\(4x^{2}+3x\\) and got \\(7x^{2}\\). What is the correct simplified expression?",{t:corr,fb:"Correct: x squared terms and x terms are unlike and stay separate."},[{t:"\\(7x^{2}\\)",fb:"That is the student answer; it combines unlike terms."},{t:"\\(7x\\)",fb:"That combines unlike terms into a single x term."},{t:"\\(12x^{2}\\)",fb:"That multiplies the coefficients; nothing here is multiplied."}],sol,{mode:"var-unlike"});
  },
  function(){
    var corr="\\(2(3x-2)\\)";
    var sol="Multiplying out, \\(2(3x-2)=6x-4\\), which matches the given expression. So an equivalent expression is <b>"+corr+"</b>.";
    return mcq("Which expression is equivalent to \\(6x-4\\)?",{t:corr,fb:"Correct: it multiplies out to exactly 6x minus 4."},[{t:"\\(3(2x-4)\\)",fb:"That multiplies out to 6x minus 12, so the constant differs."},{t:"\\(2(3x+2)\\)",fb:"That multiplies out to 6x plus 4, so the sign differs."},{t:"\\(6(x-4)\\)",fb:"That multiplies out to 6x minus 24, so the constant differs."}],sol,{mode:"var-equiv"});
  }
]), ["Compare the student result with a careful step by step simplification of your own.", "First redo the first step yourself, watching signs and like terms, then compare."]);

