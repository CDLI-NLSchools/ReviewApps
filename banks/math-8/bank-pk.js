/* Math 8 PK tranche (November 15, 2026). Prior knowledge check entries
   for all eight units, per Math-8-PK-Tranche-Spec-2026-11-15.md. Borrowed
   generators are verbatim copies from the Mathematics 7 bank (only the
   entry id, unit, host indicator tag and tranche metadata differ); four
   entries are authored against Mathematics 6 outcomes (MA6.9.6 and
   MA6.9.7 in Unit 1; MA6.9.13, MA6.9.15 and MA6.9.16 in Unit 8). The
   feeder helper functions the borrowed generators call, and that neither
   the shell nor this bank defines, are ported verbatim below. No
   CRMARKS lines are carried over: borrowed entries bring no CR marks
   into this bank, on the Math 9 tranche convention. */
function u1Why(n,d,yes){
  var last=n%10, last2=n%100, last3=n%1000, ds=u1DigitSum(n);
  if(d===2) return yes?("its last digit, "+last+", is even"):("its last digit, "+last+", is odd");
  if(d===5) return yes?("it ends in "+last):("it ends in "+last+", not 0 or 5");
  if(d===10) return yes?("it ends in 0"):("it ends in "+last+", not 0");
  if(d===4) return yes?("its last two digits form "+last2+", which is divisible by 4"):("its last two digits form "+last2+", which is not divisible by 4");
  if(d===8) return yes?("its last three digits form "+last3+", which is divisible by 8"):("its last three digits form "+last3+", which is not divisible by 8");
  if(d===3) return yes?("its digits add to "+ds+", which is divisible by 3"):("its digits add to "+ds+", which is not divisible by 3");
  if(d===9) return yes?("its digits add to "+ds+", which is divisible by 9"):("its digits add to "+ds+", which is not divisible by 9");
  if(d===6){ if(yes) return "it is even and its digits add to "+ds+", divisible by 3";
    if(n%2!==0) return "it is odd, so it fails the test for 2"; return "its digits add to "+ds+", not divisible by 3, so it fails the test for 3"; }
  return "";
}
function u1Factors(n){ var f=[]; for(var i=1;i<=n;i++){ if(n%i===0)f.push(i);} return f; }
function u1DigitSum(n){ var s=0; n=Math.abs(n); while(n>0){ s+=n%10; n=Math.floor(n/10);} return s; }
function u2Distr(ans,cands){
  var seen={},ds=[];
  cands.forEach(function(z){ if(z!==ans&&!seen[z]&&ds.length<3){ seen[z]=1; ds.push(z); } });
  var g=1; while(ds.length<3){ [ans+g,ans-g].forEach(function(z){ if(z!==ans&&!seen[z]&&ds.length<3){ seen[z]=1; ds.push(z); } }); g++; }
  return ds;
}
function u2Sg(n){ return n<0?"("+n+")":""+n; }
function u2SignRuleSol(a,b,op){
  if(op==="+"){
    if(a===0||b===0) return "Adding zero leaves the other integer unchanged.";
    if((a>0)===(b>0)) return "The signs are the same, so add the sizes and keep the sign: \\(|"+a+"| + |"+b+"| = "+(Math.abs(a)+Math.abs(b))+"\\).";
    return "The signs differ, so subtract the smaller size from the larger and keep the sign of the larger: \\(|"+a+"| - |"+b+"| = "+Math.abs(Math.abs(a)-Math.abs(b))+"\\).";
  }
  return "Rewrite the subtraction as adding the opposite: \\("+a+" - "+u2Sg(b)+" = "+a+" + "+u2Sg(-b)+"\\).";
}
function precPair(keyT, ds){
  function parse(s){ var m=String(s).match(/^(\$?)(-?\d+)(?:\.(\d+))?(%?)$/); if(!m) return null; return {pre:m[1], intp:m[2], frac:m[3]||"", suf:m[4], dp:(m[3]||"").length}; }
  var k=parse(keyT); if(!k) return ds;
  var ps=ds.map(function(o){ return parse(o.t); });
  if(ps.some(function(p){ return !p; })) return ds;
  var M=k.dp; ps.forEach(function(p){ if(p.dp>M) M=p.dp; });
  function render(p,target){
    var core;
    if(target===0) core=p.intp;
    else if(p.dp>=target) core=p.intp+"."+p.frac;
    else if(p.dp===0) core=p.intp+"."+("000000".slice(0,target));
    else core=p.intp+"."+p.frac+("000000".slice(0,target-p.dp));
    return p.pre+core+p.suf;
  }
  var targets=new Array(ps.length), found=null;
  function countsOk(arr){ var c={}, i; c[k.dp]=1; for(i=0;i<arr.length;i++) c[arr[i]]=(c[arr[i]]||0)+1; for(var v in c){ if(c[v]===1) return false; } return true; }
  function search(i){ if(found) return; if(i===ps.length){ if(countsOk(targets)) found=targets.slice(); return; } for(var t=ps[i].dp;t<=M;t++){ targets[i]=t; search(i+1); if(found) return; } }
  search(0);
  if(!found) return ds;
  return ds.map(function(o,i){ var nt=render(ps[i],found[i]); if(nt===o.t) return o; var n2={}; for(var kk in o) n2[kk]=o[kk]; n2.t=nt; return n2; });
}
function u5lcm(a,b){return a*b/u5gcd(a,b);}
function u5M(n,d){return "\\("+u5disp(n,d)+"\\)";}
function u5red(n,d){var g=u5gcd(n,d);return [n/g,d/g];}
function u5disp(n,d){var r=u5red(n,d);n=r[0];d=r[1];if(d===1)return String(n);if(n>d){var w=Math.floor(n/d),rem=n%d;if(rem===0)return String(w);return w+"\\frac{"+rem+"}{"+d+"}";}return "\\frac{"+n+"}{"+d+"}";}
function u5fopts(corr,errs){
  var cr=u5red(corr[0],corr[1]);var seen={};seen[cr[0]+"/"+cr[1]]=1;var out=[];
  function tryAdd(p,fb){if(out.length>=3)return;if(!p||p[0]<=0||p[1]<=0)return;var r=u5red(p[0],p[1]);var k=r[0]+"/"+r[1];if(seen[k])return;seen[k]=1;out.push({t:u5M(r[0],r[1]),fb:fb});}
  errs.forEach(function(e){tryAdd(e.p,e.fb);});
  [[cr[0]+1,cr[1]],[cr[0],cr[1]+1],[cr[0]+1,cr[1]+1],[cr[0]+2,cr[1]],[cr[0],cr[1]+2],[cr[0]+3,cr[1]+1]].forEach(function(p){tryAdd(p,"That value does not match the result you get from the steps in a correct solution.");});
  return out;
}
function u5iopts(corr,errs){
  var seen={};seen[corr]=1;var out=[];
  function tryAdd(v,fb){if(out.length>=3)return;if(v===undefined||v===null||isNaN(v))return;if(seen[v])return;seen[v]=1;out.push({t:String(v),fb:fb});}
  errs.forEach(function(e){tryAdd(e.v,e.fb);});
  [corr+1,corr-1,corr+2,corr+10,corr-2,corr+5].forEach(function(v){tryAdd(v,"That value does not match the result you get from the steps in a correct solution.");});
  return out;
}
function u5accept(N,D){
  var r=u5red(N,D);var out=[r[0]+"/"+r[1]];
  if(r[0]>r[1]){var w=Math.floor(r[0]/r[1]),rem=r[0]%r[1];if(rem>0)out.push(w+" "+rem+"/"+r[1]);}
  var dd=r[1],ok=true;while(dd%2===0)dd/=2;while(dd%5===0)dd/=5;if(dd===1){
    var val=r[0]/r[1];var s=val.toFixed(6).replace(/0+$/,"").replace(/\.$/,"");if(out.indexOf(s)<0)out.push(s);
  }
  return out;
}
function figMix(b1,h1,b2,h2,unit){
  var out='<svg viewBox="0 0 300 175" width="300" height="175" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parallelogram plot joined to a triangular plot">';
  out+='<polygon points="15,130 105,130 125,55 35,55" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<line x1="35" y1="55" x2="35" y2="130" stroke="'+FIG_ALT+'" stroke-width="1.8" stroke-dasharray="5 4"/>';
  out+='<polygon points="165,130 275,130 205,55" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<line x1="205" y1="55" x2="205" y2="130" stroke="'+FIG_ALT+'" stroke-width="1.8" stroke-dasharray="5 4"/>';
  out+=_txt(60,150,"base = "+b1+" "+unit,12,false);
  out+=_txt(220,150,"base = "+b2+" "+unit,12,false);
  out+=_txt(51,92,"h = "+h1+" "+unit,11.5,false);
  out+=_txt(221,92,"h = "+h2+" "+unit,11.5,false);
  return out+'</svg>';
}
function u4circleFig(label, mode){
  var out='<svg viewBox="0 0 240 190" width="240" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Circle diagram">';
  out+='<circle cx="120" cy="88" r="66" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<circle cx="120" cy="88" r="2.6" fill="'+FIG_INK+'"/>';
  if(mode==="r"){
    out+='<line x1="120" y1="88" x2="186" y2="88" stroke="'+FIG_ACC+'" stroke-width="2"/>';
    out+=_txt(153,74,label,12.5,false);
  } else {
    out+='<line x1="54" y1="88" x2="186" y2="88" stroke="'+FIG_ACC+'" stroke-width="2"/>';
    out+=_txt(120,74,label,12.5,false);
  }
  return out+'</svg>';
}
function u3simp(n,d){var g=u3gcd(n,d);return [n/g,d/g];}
function u6iopts(corr,errs){
  var seen={};seen[corr]=1;var out=[];
  function tryAdd(v,fb){if(out.length>=3)return;if(v===undefined||v===null||isNaN(v))return;v=Math.round(v);if(seen[v])return;seen[v]=1;out.push({t:String(v),fb:fb});}
  errs.forEach(function(e){tryAdd(e.v,e.fb);});
  [corr+1,corr-1,corr+2,corr-2,corr+10,corr-10,corr+3].forEach(function(v){tryAdd(v,"That value does not satisfy the equation. Try the inverse operations in the solution.");});
  return out;
}
function u1Expr(a,b,v){ v=v||"n"; var s=(a===1?v:a+v); if(b>0)s+=" + "+b; else if(b<0)s+=" - "+(-b); return s; }
function u1Plot(pts,xMax,yMax,xLab,yLab){
  var W=252,H=214,ox=36,oy=178,sx=(W-ox-14)/xMax,sy=(oy-24)/yMax;
  var s='<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg">';
  var yStep=yMax>12?2:1;
  for(var gy=0;gy<=yMax;gy+=yStep){ var Y=oy-gy*sy; s+='<line x1="'+ox+'" y1="'+fmt(Y,1)+'" x2="'+(W-10)+'" y2="'+fmt(Y,1)+'" stroke="#cfe4d6" stroke-width="1"/>';
    s+='<text x="'+(ox-5)+'" y="'+fmt(Y+3,1)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="end">'+gy+'</text>'; }
  for(var gx=0;gx<=xMax;gx++){ var X=ox+gx*sx; s+='<line x1="'+fmt(X,1)+'" y1="18" x2="'+fmt(X,1)+'" y2="'+oy+'" stroke="#cfe4d6" stroke-width="1"/>';
    s+='<text x="'+fmt(X,1)+'" y="'+(oy+13)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="middle">'+gx+'</text>'; }
  s+='<line x1="'+ox+'" y1="18" x2="'+ox+'" y2="'+oy+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  s+='<line x1="'+ox+'" y1="'+oy+'" x2="'+(W-10)+'" y2="'+oy+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  pts.forEach(function(p){ s+='<circle cx="'+fmt(ox+p[0]*sx,1)+'" cy="'+fmt(oy-p[1]*sy,1)+'" r="4" fill="'+FIG_ACC+'"/>'; });
  if(xLab) s+='<text x="'+fmt(ox+xMax*sx/2,1)+'" y="'+(H-2)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle">'+xLab+'</text>';
  if(yLab) s+='<text x="11" y="'+fmt(oy-yMax*sy/2,1)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle" transform="rotate(-90 11 '+fmt(oy-yMax*sy/2,1)+')">'+yLab+'</text>';
  return s+'</svg>';
}
function u8pair(x,y){return "("+x+", "+y+")";}
function u8gridSVG(points,polys,segs){
  var W=280,H=280,c=140,st=20;
  function X(x){return c+x*st;}function Y(y){return c-y*st;}
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cartesian plane grid">';
  for(var g=-6;g<=6;g++){if(g===0)continue;out+='<line x1="'+X(g)+'" y1="8" x2="'+X(g)+'" y2="272" stroke="'+FIG_SHADE+'" stroke-width="1"/>';out+='<line x1="8" y1="'+Y(g)+'" x2="272" y2="'+Y(g)+'" stroke="'+FIG_SHADE+'" stroke-width="1"/>';}
  out+='<line x1="8" y1="140" x2="272" y2="140" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  out+='<line x1="140" y1="8" x2="140" y2="272" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  out+='<polygon points="272,140 264,135 264,145" fill="'+FIG_INK+'"/><polygon points="140,8 135,16 145,16" fill="'+FIG_INK+'"/>';
  out+=_txt(266,126,"x",13,true)+_txt(152,20,"y",13,true);
  if(segs)segs.forEach(function(s){out+='<line x1="'+X(s[0])+'" y1="'+Y(s[1])+'" x2="'+X(s[2])+'" y2="'+Y(s[3])+'" stroke="'+FIG_INK+'" stroke-width="2"'+(s[4]?' stroke-dasharray="5 4"':"")+'/>';});
  if(polys)polys.forEach(function(p){out+='<polygon points="'+p.map(function(q){return fmt(X(q[0]),1)+","+fmt(Y(q[1]),1);}).join(" ")+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';});
  if(points)points.forEach(function(p){out+='<circle cx="'+X(p.x)+'" cy="'+Y(p.y)+'" r="3.4" fill="'+FIG_INK+'"/>';if(p.label)out+=_txt(X(p.x)+11,Y(p.y)-10,p.label,13,true);});
  return out+'</svg>';
}
function u8moveText(dx,dy){var parts=[];if(dx!==0)parts.push(Math.abs(dx)+(Math.abs(dx)===1?" unit ":" units ")+(dx>0?"right":"left"));if(dy!==0)parts.push(Math.abs(dy)+(Math.abs(dy)===1?" unit ":" units ")+(dy>0?"up":"down"));return parts.join(" and ");}
function figWideGrid(points,polys,segs){
  var m=6;
  function scan(x,y){var a=Math.max(Math.abs(x),Math.abs(y));if(a>m)m=a;}
  if(points)points.forEach(function(p){scan(p.x,p.y);});
  if(polys)polys.forEach(function(pl){pl.forEach(function(q){scan(q[0],q[1]);});});
  if(segs)segs.forEach(function(s){scan(s[0],s[1]);scan(s[2],s[3]);});
  var E=Math.ceil(m), W=280, c=140, st=126/E;
  function X(x){return c+x*st;} function Y(y){return c-y*st;}
  var out='<svg viewBox="0 0 '+W+' '+W+'" width="'+W+'" height="'+W+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cartesian plane grid">';
  for(var g=-E;g<=E;g++){if(g===0)continue;out+='<line x1="'+fmt(X(g),1)+'" y1="8" x2="'+fmt(X(g),1)+'" y2="272" stroke="'+FIG_SHADE+'" stroke-width="1"/>';out+='<line x1="8" y1="'+fmt(Y(g),1)+'" x2="272" y2="'+fmt(Y(g),1)+'" stroke="'+FIG_SHADE+'" stroke-width="1"/>';}
  out+='<line x1="8" y1="140" x2="272" y2="140" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  out+='<line x1="140" y1="8" x2="140" y2="272" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  out+=_txt(266,126,"x",13,true)+_txt(152,20,"y",13,true);
  if(segs)segs.forEach(function(s){out+='<line x1="'+fmt(X(s[0]),1)+'" y1="'+fmt(Y(s[1]),1)+'" x2="'+fmt(X(s[2]),1)+'" y2="'+fmt(Y(s[3]),1)+'" stroke="'+FIG_INK+'" stroke-width="2"'+(s[4]?' stroke-dasharray="5 4"':"")+'/>';});
  if(polys)polys.forEach(function(p){out+='<polygon points="'+p.map(function(q){return fmt(X(q[0]),1)+","+fmt(Y(q[1]),1);}).join(" ")+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';});
  if(points)points.forEach(function(p){out+='<circle cx="'+fmt(X(p.x),1)+'" cy="'+fmt(Y(p.y),1)+'" r="3.4" fill="'+FIG_INK+'"/>';if(p.label)out+=_txt(X(p.x)+11,Y(p.y)-10,p.label,13,true);});
  return out+'</svg>';
}
function u4graphData(){
  var topics=[
    {t:"favourite lunch", cats:["Pizza","Salad","Soup","Sandwich"]},
    {t:"favourite sport", cats:["Soccer","Hockey","Dance","Swimming"]},
    {t:"way of getting to school", cats:["Bus","Walk","Car","Bike"]},
    {t:"weekend activity", cats:["Gaming","Reading","Sports","Music"]}
  ];
  var tp=pick(topics), guard=0, ps=null;
  while(guard++<300){
    var a=ri(30,45), b=ri(20,32), c=ri(12,22), d=100-a-b-c;
    if(d<6||d>25)continue;
    var arr=[a,b,c,d], ok=true;
    for(var i=0;i<4;i++)for(var j=i+1;j<4;j++)if(arr[i]===arr[j])ok=false;
    if(ok){ps=arr;break;}
  }
  if(!ps)ps=[40,28,20,12];
  var cats=tp.cats.map(function(name,i){return {name:name, pct:ps[i]};});
  return {topic:tp.t, cats:cats};
}
function u4pieFig(cats, angleLabels){
  var cx=92, cy=92, R=68;
  var fills=[FIG_SHADE,"#ffffff","#8fb8a0","#e6ddcb"];
  var out='<svg viewBox="0 0 330 190" width="330" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Circle graph">';
  var start=0, letters=["A","B","C","D"];
  cats.forEach(function(c,i){
    var sweep=c.pct*3.6, end=start+sweep;
    var p1=u4pt(cx,cy,R,start), p2=u4pt(cx,cy,R,end);
    var large=sweep>180?1:0;
    out+='<path d="M '+cx+' '+cy+' L '+fmt(p1[0],1)+' '+fmt(p1[1],1)+' A '+R+' '+R+' 0 '+large+' 1 '+fmt(p2[0],1)+' '+fmt(p2[1],1)+' Z" fill="'+fills[i%4]+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    var mid=u4pt(cx,cy,42,(start+end)/2);
    out+=_txt(mid[0],mid[1],angleLabels?String(c.ang)+"°":letters[i],13,true);
    start=end;
  });
  if(!angleLabels){
    cats.forEach(function(c,i){
      var y=42+i*34;
      out+='<rect x="196" y="'+(y-9)+'" width="12" height="12" fill="'+fills[i%4]+'" stroke="'+FIG_INK+'" stroke-width="1.2"/>';
      out+='<text x="214" y="'+(y+1)+'" font-size="12.5" fill="'+FIG_INK+'">'+letters[i]+" = "+c.name+" "+c.pct+"%</text>";
    });
  }
  return out+'</svg>';
}
function u4pt(cx,cy,r,deg){var t=deg*Math.PI/180;return [cx+r*Math.sin(t), cy-r*Math.cos(t)];}
function u7numOpts(correct,cands){var out=[],seen={};seen[String(correct)]=1;for(var i=0;i<cands.length;i++){var v=cands[i];if(v===null||v===undefined)continue;var k=String(v);if(!seen[k]){seen[k]=1;out.push(v);if(out.length===3)break;}}var step=1;while(out.length<3){var v=correct+step;if(!seen[String(v)]){seen[String(v)]=1;out.push(v);}step++;}return out;}
function u7median(a){var s=a.slice().sort(function(x,y){return x-y;});var m=Math.floor(s.length/2);return s.length%2?s[m]:(s[m-1]+s[m])/2;}
function u7fracStr(n,d){if(d<0){n=-n;d=-d;}var g=u7gcd(n,d);n/=g;d/=g;if(d===1)return String(n);return n+"/"+d;}
function u7tableSVG(rowHead,colHead,rows){
  var W=330,rowH=26,colW=(W-70)/colHead.length,H=30+rowH*(rows.length+1);
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Outcome table">';
  out+='<rect x="10" y="10" width="'+(W-20)+'" height="'+(H-20)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  out+=_txt(40,23,rowHead,11,true);
  for(var c=0;c<colHead.length;c++){out+=_txt(70+colW*c+colW/2,23,colHead[c],12,true);}
  for(var r=0;r<rows.length;r++){var y=10+rowH*(r+1);
    out+='<line x1="10" y1="'+y+'" x2="'+(W-10)+'" y2="'+y+'" stroke="'+FIG_INK+'" stroke-width="1"/>';
    out+=_txt(40,y+13,rows[r][0],12,true);
    for(var k=1;k<rows[r].length;k++){out+=_txt(70+colW*(k-1)+colW/2,y+13,rows[r][k],11,false);}
  }
  for(var v=0;v<=colHead.length;v++){var x=v===0?70:70+colW*v;out+='<line x1="'+x+'" y1="10" x2="'+x+'" y2="'+(H-10)+'" stroke="'+FIG_INK+'" stroke-width="1"/>';}
  return out+'</svg>';
}

E("u1-pk-divisible-by", 1, ["5.1"], 1, "gen", function(){
  var d=pick([2,3,4,5,6,8,9,10]);
  var n=ri(12,140)*d;
  var ds=[],guard=0;
  while(ds.length<3&&guard++<300){ var m=ri(24,1400); if(m%d!==0&&m!==n&&ds.indexOf(m)<0)ds.push(m); }
  var opts=ds.map(function(m){ return {t:String(m), fb:fmt(m)+" is not divisible by "+d+": "+u1Why(m,d,false)+"."}; });
  return mcq("Which number is divisible by \\("+d+"\\)?",
    {t:String(n), fb:"Yes: "+u1Why(n,d,true)+", so \\("+n+" \\div "+d+"\\) has no remainder."}, opts,
    "Use the divisibility test for \\("+d+"\\): "+u1Why(n,d,true)+". So \\("+n+"\\) is divisible by \\("+d+"\\). The answer is <b>"+n+"</b>.",
    {d:d,n:n});
}, ["Pick the divisor first and recall its divisibility test.", "Start by applying the test to each number in turn until one passes."]);
E("u1-pk-divisibility-why", 1, ["5.1"], 1, "gen", function(){
  var d=pick([3,9]), n=0, guard=0;
  while(guard++<500){ var cand=ri(210,980); if(cand%d===0&&(cand%10)%d!==0&&(cand%100)%d!==0&&(cand%10)!==0&&(cand%10)!==5){ n=cand; break; } }
  if(!n)n=(d===3?417:648);
  var S=u1DigitSum(n), last=n%10, last2=n%100;
  var opts=[
    {t:"Its last digit, "+last+", is itself divisible by "+d+".", fb:"The last digit is the test for 2, 5 and 10, not for "+d+"."},
    {t:"Its last two digits form "+last2+", which is divisible by "+d+".", fb:"The last-two-digits test belongs to 4. For "+d+", use the digit sum."},
    {t:"It ends in 0 or 5, which is the test for 5.", fb:"Ending in 0 or 5 is the test for 5 (and partly for 10), not for "+d+"."}];
  return mcq("Why is \\("+n+"\\) divisible by \\("+d+"\\)?",
    {t:"Its digits add to "+S+", and "+S+" is divisible by "+d+".", fb:"Correct: the digit-sum test decides divisibility by "+d+"."}, opts,
    "Add the digits of \\("+n+"\\): the digit sum is \\("+S+"\\), and \\("+S+" \\div "+d+" = "+(S/d)+"\\). A digit sum divisible by \\("+d+"\\) means the number is divisible by \\("+d+"\\). The answer is <b>the digit sum, "+S+", is divisible by "+d+"</b>.",
    {d:d,n:n,S:S});
}, ["Recall which test goes with this divisor: 3 and 9 use a digit sum.", "Start by adding all the digits of the number."]);
E("u1-pk-factor-list", 1, ["5.1"], 1, "gen", function(){
  var n=0,f=[],g0=0;
  while(g0++<300){ n=ri(12,120); f=u1Factors(n); if(f.length>=4)break; }
  var full=f.join(", ");
  var drop=f.filter(function(x){return x!==1&&x!==n;}); var dv=pick(drop);
  var missing=f.filter(function(x){return x!==dv;}).join(", ");
  var extraVal=0,g=0; while(g++<100){ var c=ri(2,n-1); if(n%c!==0){ extraVal=c; break; } }
  var withExtra=f.concat([extraVal]).sort(function(a,b){return a-b;}).join(", ");
  var proper=f.filter(function(x){return x!==n;}).join(", ");
  var opts=[
    {t:missing, fb:"That list leaves out "+dv+", and "+dv+" divides "+n+" exactly."},
    {t:withExtra, fb:"That list includes "+extraVal+", and "+extraVal+" does not divide "+n+" exactly."},
    {t:proper, fb:"That list leaves out "+n+" itself; a number is always a factor of itself."}];
  return mcq("Which list gives ALL the factors of \\("+n+"\\)?",
    {t:full, fb:"Correct: every number in the list divides "+n+" exactly, and none are missing."}, opts,
    "Test the small numbers in order using the divisibility rules and record each factor pair. The factors of \\("+n+"\\) are "+full+". The answer is <b>"+full+"</b>.",
    {n:n});
}, ["Work through the small numbers in order and test each one.", "Start with 1 and the number itself, then test 2, 3, 4 and so on, recording pairs."]);
E("u1-pk-factors-count", 1, ["5.1"], 2, "gen", function(){
  var n=ri(18,96);
  var f=u1Factors(n);
  var pairs=[]; for(var i=0;i<f.length;i++){ if(f[i]<=n/f[i])pairs.push(f[i]+" x "+(n/f[i])); }
  return numq("How many different factors does \\("+n+"\\) have? List the factors as part of your work.", f.length, 0,
    "Work through the factor pairs of \\("+n+"\\): "+pairs.join(", ")+". The factors are "+f.join(", ")+", which is "+f.length+" factors in total. The answer is <b>"+f.length+"</b>.",
    {n:n});
}, ["Use the divisibility rules to test small numbers in order.", "Start with 1 and work upward, recording each factor as a pair."]);
E("u1-pk-carroll-cell", 1, ["5.1"], 1, "gen", function(){
  var n=ri(11,99), by5=n%5===0, even=n%2===0;
  var cells=["Divisible by 5 and even","Divisible by 5 and not even","Not divisible by 5 and even","Not divisible by 5 and not even"];
  var idx=(by5?0:2)+(even?0:1);
  var facts="\\("+n+"\\) "+(by5?"ends in "+(n%10)+", so it is divisible by 5":"ends in "+(n%10)+", so it is not divisible by 5")+" and it is "+(even?"even":"not even")+".";
  var opts=cells.filter(function(c,i){return i!==idx;}).map(function(c){ return {t:c, fb:"That cell needs different test results. "+facts}; });
  return mcq("A Carroll diagram has rows Divisible by 5 and Not divisible by 5, and columns Even and Not even. Which cell holds \\("+n+"\\)?",
    {t:cells[idx], fb:"Correct: "+facts}, opts,
    "Test \\("+n+"\\): "+facts+" So it belongs in the row and column matching those results. The answer is <b>"+cells[idx]+"</b>.",
    {n:n});
}, ["Run both tests on the number before choosing a cell.", "Start with the test for 5 (the ending digit), then check whether the number is even."]);
E("u1-pk-square-area", 1, ["9.1"], 1, "gen", function(){
  var s=ri(3,15), A=s*s;
  var pool=[4*s, 2*s, A+s, s+4];
  var seen={}; seen[String(A)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){ var v=pool[i]; if(seen[String(v)])continue; seen[String(v)]=1;
    ds.push({t:String(v), fb: i===0?("That is the perimeter: four sides of "+s+" m each. Area counts the square units inside the plot."):("Check the rule: the area of a rectangle is length times width, and for a square both measures are "+s+" m.")}); }
  var g=2; while(ds.length<3){ var z=A+g*3; if(!seen[String(z)]){ seen[String(z)]=1; ds.push({t:String(z), fb:"Check the rule: the area of a rectangle is length times width, and for a square both measures are "+s+" m."}); } g++; }
  var q=mcq("A square garden plot has sides of "+s+" m. What is the area of the plot, in square metres?",
    {t:String(A), fb:"Yes: a square is a rectangle with length and width both "+s+" m, so its area is "+s+" x "+s+" = "+A+"."},
    ds,
    "A square is a rectangle whose length and width are equal, so the rectangle area rule applies with both measures the same. \\[ \\begin{aligned} A &= "+s+" \\times "+s+" \\\\ &= "+A+" \\text{ m}^2 \\end{aligned} \\] The answer is <b>"+A+" m²</b>.",
    {s:s});
  q.figure='<svg viewBox="0 0 220 220" width="220" height="220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Square with its side labelled">'
    +'<rect x="45" y="35" width="130" height="130" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +_txt(110,190,"side = "+s+" m",13,false)
    +'</svg>';
  return q;
}, ["A square is a rectangle with equal length and width, so the rectangle area rule applies.", "Start by multiplying the side length by itself."]);
E("u2-pk-add-basic", 2, ["6.17"], 1, "gen", function(){
  var a=0,b=0,g=0;
  while(g++<200){ a=ri(-9,9); b=ri(-9,9); if(a!==0&&b!==0)break; }
  var ans=a+b;
  var ds=u2Distr(ans,[a-b, -(a+b), Math.abs(a)+Math.abs(b), -Math.abs(a)-Math.abs(b), Math.abs(Math.abs(a)-Math.abs(b))]);
  var fbFor=function(z){ if(z===a-b)return "That subtracts the second integer instead of adding it."; if(z===-(a+b))return "That has the right size but the wrong sign."; if(z===Math.abs(a)+Math.abs(b))return "That adds the sizes and drops the signs; the signs decide the result's sign."; return "That does not follow the sign rules for addition."; };
  return mcq("What is \\("+a+" + "+u2Sg(b)+"\\)?",
    {t:String(ans), fb:"Correct: "+((a>0)===(b>0)?"same signs, add the sizes and keep the sign.":"different signs, subtract the sizes and keep the sign of the larger.")},
    ds.map(function(z){return {t:String(z), fb:fbFor(z)};}),
    u2SignRuleSol(a,b,"+")+" So \\("+a+" + "+u2Sg(b)+" = "+ans+"\\). The answer is <b>"+ans+"</b>.",
    {a:a,b:b});
}, ["Look at the signs first: same signs and different signs follow different rules.", "Start by comparing the sizes of the two integers."]);
E("u2-pk-sub-basic", 2, ["6.17"], 1, "gen", function(){
  var a=ri(-9,9), b=0,g=0;
  while(g++<100){ b=ri(-9,9); if(b!==0)break; }
  var ans=a-b;
  var ds=u2Distr(ans,[a+b, -(a-b), b-a, ans+2*b]);
  var fbFor=function(z){ if(z===a+b&&b<0)return "That drops the extra minus sign; subtracting a negative adds."; if(z===a+b)return "That adds the second integer instead of subtracting it."; if(z===b-a)return "That subtracts in the wrong order."; return "That does not match rewriting the subtraction as adding the opposite."; };
  return mcq("What is \\("+a+" - "+u2Sg(b)+"\\)?",
    {t:String(ans), fb:"Correct: subtracting is adding the opposite, so this is "+a+" + "+u2Sg(-b)+"."},
    ds.map(function(z){return {t:String(z), fb:fbFor(z)};}),
    u2SignRuleSol(a,b,"-")+" Then \\("+a+" + "+u2Sg(-b)+" = "+ans+"\\). The answer is <b>"+ans+"</b>.",
    {a:a,b:b});
}, ["Change the subtraction into adding the opposite first.", "Start by flipping the sign of the number being subtracted."]);
E("u2-pk-add-context", 2, ["6.17"], 1, "gen", function(){
  var T=pick([
    {pre:"At dawn the temperature is ", mid:" degrees. By noon it ", ch:["rises by ","drops by "], post:" degrees. What is the temperature at noon?", unit:" degrees"},
    {pre:"A diver is ", mid:" m relative to the surface (below is negative). The diver then ", ch:["swims up ","sinks "], post:" m. What is the diver's new position, in metres?", unit:" m"},
    {pre:"A team's score is ", mid:" points. On the next play the team ", ch:["gains ","loses "], post:" points. What is the team's score now?", unit:" points"},
    {pre:"An account balance is $", mid:". A payment of $", ch:null, post:" is made (a payment lowers the balance). What is the new balance, in dollars?", unit:""}]);
  var a=ri(-18,18), mag=ri(3,16);
  if(T.pre.indexOf("diver")>=0&&a>0)a=-a;
  if(T.ch){
    var up=pick([true,false]); var b=up?mag:-mag;
    var ans=a+b;
    var ds=u2Distr(ans,[a-b, -ans, a+ (up?-mag:mag)]);
    return mcq(T.pre+"\\("+a+"\\)"+T.mid+(up?T.ch[0]:T.ch[1])+"\\("+mag+"\\)"+T.post,
      {t:String(ans), fb:"Correct: "+(up?"a rise adds "+mag:"a drop adds -"+mag)+", giving "+a+" + "+u2Sg(b)+" = "+ans+"."},
      ds.map(function(z){return {t:String(z), fb:"That treats the change with the wrong sign. A "+(up?"rise is positive":"drop is negative")+"."};}),
      "Write the change as a signed integer: \\("+a+" + "+u2Sg(b)+" = "+ans+"\\). The answer is <b>"+ans+T.unit+"</b>.",
      {a:a,b:b});
  }
  var ans2=a-mag;
  var ds2=u2Distr(ans2,[a+mag, -ans2, a]);
  return mcq(T.pre+"\\("+a+"\\)"+T.mid+"\\("+mag+"\\)"+T.post,
    {t:String(ans2), fb:"Correct: a payment subtracts "+mag+" from the balance."},
    ds2.map(function(z){return {t:String(z), fb:"A payment lowers the balance, so the "+mag+" is subtracted, not added."};}),
    "\\[ \\begin{aligned} \\text{new balance} &= "+a+" - "+mag+" \\\\ &= "+ans2+" \\end{aligned} \\] The answer is <b>$"+ans2+"</b>.",
    {a:a,b:-mag});
}, ["Turn words like rises, drops, gains and loses into signed numbers first.", "Start by writing the starting value and the signed change as an addition."]);
E("u2-pk-mixed-chain", 2, ["6.17"], 1, "gen", function(){
  var a=ri(-9,9), b=ri(-9,9), c=ri(-9,9), g=0;
  while(g++<100&&(b===0||c===0)){ b=ri(-9,9); c=ri(-9,9); }
  var subFirst=pick([true,false]);
  var ans=subFirst?(a-b)+c:(a+b)-c;
  var expr=subFirst?(a+" - "+u2Sg(b)+" + "+u2Sg(c)):(a+" + "+u2Sg(b)+" - "+u2Sg(c));
  var wrong1=subFirst?(a+b)+c:(a-b)-c, wrong2=subFirst?(a-b)-c:(a+b)+c;
  var ds=u2Distr(ans,[wrong1,wrong2,-ans]);
  var stepTxt=subFirst?("First \\("+a+" - "+u2Sg(b)+" = "+(a-b)+"\\), then add \\("+u2Sg(c)+"\\)"):("First \\("+a+" + "+u2Sg(b)+" = "+(a+b)+"\\), then subtract \\("+u2Sg(c)+"\\)");
  return mcq("What is \\("+expr+"\\)?",
    {t:String(ans), fb:"Correct: work left to right and the total is "+ans+"."},
    ds.map(function(z){return {t:String(z), fb:"That changes one of the signs along the way. Work left to right, one step at a time."};}),
    stepTxt+": the result is \\("+ans+"\\). The answer is <b>"+ans+"</b>.",
    {a:a,b:b,c:c});
}, ["Work left to right, one operation at a time.", "Start by doing the first operation and writing down the running total."]);
E("u2-pk-missing-start", 2, ["6.17"], 2, "gen", function(){
  var a=ri(3,14), b=ri(3,14), e=ri(-8,12), start=e-a+b;
  return numq("A game score changes twice: first it increases by "+a+" points, then it decreases by "+b+" points. The final score is "+e+" points. What was the starting score? Show your work.", start, 0,
    "Undo the two changes in reverse order, starting from the final score. \\[ \\begin{aligned} \\text{start} &= "+e+" + "+b+" - "+a+" \\\\ &= "+start+" \\end{aligned} \\] Check: \\("+start+" + "+a+" - "+b+" = "+e+"\\). The answer is <b>"+start+"</b>.",
    {a:a,b:b,e:e});
}, ["Work backwards from the final score, undoing each change with its opposite operation.", "Start by undoing the last change: add back the points that were taken away."]);
E("u2-pk-order-ops-dec", 2, ["6.27"], 3, "gen", function(){
  var tpl=ri(0,2), ans, wrong, prompt, work;
  if(tpl===0){
    var a=ri(12,89)/10, b=ri(11,49)/10, c=ri(2,9);
    ans=a+b*c; wrong=(a+b)*c;
    prompt="Evaluate: "+fmt(a,1)+" + "+fmt(b,1)+" x "+c;
    work="\\[ \\begin{aligned} "+fmt(a,1)+" + "+fmt(b,1)+" \\times "+c+" &= "+fmt(a,1)+" + "+fmt(b*c,1)+" \\\\ &= "+fmt(ans,2)+" \\end{aligned} \\]";
  } else if(tpl===1){
    var a2=ri(12,59)/10, b2=ri(11,39)/10, c2=ri(2,9);
    ans=(a2+b2)*c2; wrong=a2+b2*c2;
    prompt="Evaluate: ("+fmt(a2,1)+" + "+fmt(b2,1)+") x "+c2;
    work="\\[ \\begin{aligned} ("+fmt(a2,1)+" + "+fmt(b2,1)+") \\times "+c2+" &= "+fmt(a2+b2,1)+" \\times "+c2+" \\\\ &= "+fmt(ans,2)+" \\end{aligned} \\]";
  } else {
    var d=pick([2,4,5,8]), cq=ri(12,96)/10, c3=cq*d, a3=ri(21,59)/10, b3=ri(2,9);
    ans=a3*b3-cq; wrong=(a3*b3-c3)/d;
    prompt="Evaluate: "+fmt(a3,1)+" x "+b3+" - "+fmt(c3,1)+" / "+d;
    work="\\[ \\begin{aligned} "+fmt(a3,1)+" \\times "+b3+" - "+fmt(c3,1)+" \\div "+d+" &= "+fmt(a3*b3,1)+" - "+fmt(cq,1)+" \\\\ &= "+fmt(ans,2)+" \\end{aligned} \\]";
  }
  var pool=[wrong,ans+1,ans-1,ans+0.5];
  var seen={}; seen[fmt(ans,3)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    var k=fmt(pool[i],3);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:k, fb:i===0?"That works strictly left to right: brackets first, then multiply and divide, then add and subtract.":"That value comes from an arithmetic slip: redo each operation in order."});
  }
  ds=precPair(fmt(ans,3),ds);
  return mcq(prompt,
    {t:fmt(ans,3), fb:"Yes: brackets first, then multiplication and division, then addition and subtraction."},
    ds,
    work+" The answer is <b>"+fmt(ans,3)+"</b>.",
    {tpl:tpl});
}, ["Follow the order of operations: brackets, then multiply and divide, then add and subtract.", "Start by finding any brackets and doing that part first."]);
E("u3-pk-add-unlike", 3, ["6.4"], 2, "gen", function(){
  var d1=2,d2=3,a=1,c=1,cnt=0,L=6;
  while(cnt<60){d1=pick([2,3,4,5,6,8,9,10,12]);d2=pick([2,3,4,5,6,8,9,10,12]);if(d1===d2){cnt++;continue;}L=u5lcm(d1,d2);if(L>36){cnt++;continue;}a=ri(1,d1-1);c=ri(1,d2-1);break;}
  if(cnt>=60){d1=4;d2=3;a=1;c=1;L=12;}
  var m1=L/d1,m2=L/d2;var N=a*m1+c*m2;
  var ctx=pick(["pure","punch","walk"]);
  var prompt;
  if(ctx==="punch")prompt="A jug holds "+u5M(a,d1)+" of a litre of juice. Another "+u5M(c,d2)+" of a litre is poured in. How much juice is in the jug now, in litres?";
  else if(ctx==="walk")prompt="Sam walks "+u5M(a,d1)+" of a kilometre before lunch and "+u5M(c,d2)+" of a kilometre after lunch. How far does Sam walk in all, in kilometres?";
  else prompt="What is "+u5M(a,d1)+" + "+u5M(c,d2)+"?";
  var sol="Use the common denominator "+L+".\\[ \\begin{aligned} "+FR(a,d1)+" + "+FR(c,d2)+" &= "+FR(a*m1,L)+" + "+FR(c*m2,L)+" \\\\ &= "+FR(N,L);
  var rr=u5red(N,L);if(rr[0]!==N||rr[1]!==L)sol+=" \\\\ &= "+u5disp(N,L);
  sol+=" \\end{aligned} \\] The answer is <b>"+u5M(N,L)+"</b>.";
  return mcq(prompt,{t:u5M(N,L),fb:"Yes: rewritten over the common denominator "+L+", the numerators add to "+N+"."},
    u5fopts([N,L],[{p:[a+c,d1+d2],fb:"That adds the tops and the bottoms. Fractions can only be added once they share a denominator."},{p:[a*m1+c,L],fb:"That rewrites only the first fraction over "+L+". The second fraction must be rewritten too."},{p:[a+c*m2,L],fb:"That rewrites only the second fraction over "+L+". The first fraction must be rewritten too."}]),
    sol,{mode:"add-unlike",a:a,d1:d1,c:c,d2:d2});
}, ["The parts are different sizes, so the fractions need a common denominator first.", "Start by finding the least common multiple of the two denominators."]);
E("u3-pk-sub-unlike", 3, ["6.4"], 2, "gen", function(){
  var d1=2,d2=3,a=1,c=1,cnt=0,L=6;
  while(cnt<60){d1=pick([3,4,5,6,8,9,10,12]);d2=pick([2,3,4,5,6,8,10,12]);if(d1===d2){cnt++;continue;}L=u5lcm(d1,d2);if(L>36){cnt++;continue;}a=ri(1,d1-1);c=ri(1,d2-1);if(a*L/d1<=c*L/d2){cnt++;continue;}break;}
  if(cnt>=60){d1=3;d2=4;a=2;c=1;L=12;}
  var m1=L/d1,m2=L/d2;var N=a*m1-c*m2;
  var ctx=pick(["pure","flour","paint"]);
  var prompt;
  if(ctx==="flour")prompt="A bin holds "+u5M(a,d1)+" of a kilogram of flour. A baker takes out "+u5M(c,d2)+" of a kilogram. How much flour is left, in kilograms?";
  else if(ctx==="paint")prompt="A can is "+u5M(a,d1)+" full of paint. Then "+u5M(c,d2)+" of the can is used on a fence. What fraction of the can is left?";
  else prompt="What is "+u5M(a,d1)+" - "+u5M(c,d2)+"?";
  var sol="Use the common denominator "+L+".\\[ \\begin{aligned} "+FR(a,d1)+" - "+FR(c,d2)+" &= "+FR(a*m1,L)+" - "+FR(c*m2,L)+" \\\\ &= "+FR(N,L);
  var rr=u5red(N,L);if(rr[0]!==N||rr[1]!==L)sol+=" \\\\ &= "+u5disp(N,L);
  sol+=" \\end{aligned} \\] The answer is <b>"+u5M(N,L)+"</b>.";
  return mcq(prompt,{t:u5M(N,L),fb:"Yes: rewritten over the common denominator "+L+", the difference of the numerators is "+N+"."},
    u5fopts([N,L],[{p:[Math.abs(a-c),Math.abs(d1-d2)|| (d1+d2)],fb:"That subtracts the tops and the bottoms. Fractions can only be subtracted once they share a denominator."},{p:[a*m1-c,L],fb:"That rewrites only the first fraction over "+L+". The second fraction must be rewritten too."},{p:[a*m1+c*m2,L],fb:"That adds the rewritten numerators. The question asks for a difference, so subtract."}]),
    sol,{mode:"sub-unlike",a:a,d1:d1,c:c,d2:d2});
}, ["The parts are different sizes, so the fractions need a common denominator first.", "Start by rewriting both fractions over the least common multiple of the denominators."]);
E("u3-pk-add-mixed", 3, ["6.4"], 1, "gen", function(){
  var d=pick([3,4,5,6,8,10,12]);var w1=ri(1,5),w2=ri(1,4);var n1=ri(1,d-1),n2=ri(1,d-1);var cc=0;
  while((u5gcd(n1,d)!==1||u5gcd(n2,d)!==1)&&cc<40){n1=ri(1,d-1);n2=ri(1,d-1);cc++;}
  if(u5gcd(n1,d)!==1||u5gcd(n2,d)!==1){d=5;n1=ri(1,4);n2=ri(1,4);}
  var W=w1+w2,S=n1+n2;var N=W*d+S;
  var A=u5disp(w1*d+n1,d),B=u5disp(w2*d+n2,d);
  var ctx=pick(["pure","bags","laps"]);
  var prompt;
  if(ctx==="bags")prompt="One bag holds "+ "\\("+A+"\\)"+" kilograms of soil and another holds "+"\\("+B+"\\)"+" kilograms. What is the total mass, in kilograms?";
  else if(ctx==="laps")prompt="A runner completes "+"\\("+A+"\\)"+" laps in the morning and "+"\\("+B+"\\)"+" laps in the evening. How many laps is that in all?";
  else prompt="What is "+"\\("+A+"\\)"+" + "+"\\("+B+"\\)"+"?";
  var sol="Add the whole numbers, then add the fraction parts."+(S>=d?" The fraction parts add to more than one whole, so regroup.":"")+"\\[ \\begin{aligned} "+A+" + "+B+" &= "+W+" + "+FR(S,d)+" \\\\ &= "+u5disp(N,d)+" \\end{aligned} \\] The answer is <b>"+u5M(N,d)+"</b>.";
  return mcq(prompt,{t:u5M(N,d),fb:"Yes: the wholes add to "+W+" and the fraction parts add to "+S+"/"+d+", which combines to this total."},
    u5fopts([N,d],[{p:[W*d+(S%d),d],fb:"That keeps the fraction part below one whole but forgets to regroup the extra whole when the fraction parts add past "+d+"/"+d+"."},{p:[W*2*d+S,2*d],fb:"That adds the denominators of the fraction parts. The parts are the same size, so the denominator stays "+d+"."},{p:[W*d+Math.abs(n1-n2),d],fb:"That subtracts the fraction parts. The question asks for a total, so add them."}]),
    sol,{mode:"add-mixed",w1:w1,n1:n1,w2:w2,n2:n2,d:d});
}, ["Work with the whole numbers and the fraction parts separately.", "Start by adding the whole numbers, then add the numerators of the fraction parts."]);
E("u3-pk-sub-mixed", 3, ["6.4"], 1, "gen", function(){
  var d=pick([3,4,5,6,8,10,12]);var w2=ri(1,3);var w1=w2+ri(1,3);var n2=ri(1,d-2);var n1=n2+ri(1,d-1-n2);var cc=0;
  while((u5gcd(n1,d)!==1||u5gcd(n2,d)!==1)&&cc<40){n2=ri(1,d-2);n1=n2+ri(1,d-1-n2);cc++;}
  if(u5gcd(n1,d)!==1||u5gcd(n2,d)!==1){d=7;n2=ri(1,5);n1=n2+ri(1,6-n2);}
  var N=(w1-w2)*d+(n1-n2);
  var A=u5disp(w1*d+n1,d),B=u5disp(w2*d+n2,d);
  var ctx=pick(["pure","board","water"]);
  var prompt;
  if(ctx==="board")prompt="A board is "+"\\("+A+"\\)"+" metres long. A piece "+"\\("+B+"\\)"+" metres long is cut off. How much board is left, in metres?";
  else if(ctx==="water")prompt="A cooler holds "+"\\("+A+"\\)"+" litres of water. A team drinks "+"\\("+B+"\\)"+" litres. How much water is left, in litres?";
  else prompt="What is "+"\\("+A+"\\)"+" - "+"\\("+B+"\\)"+"?";
  var sol="Subtract the whole numbers, then subtract the fraction parts.\\[ \\begin{aligned} "+A+" - "+B+" &= "+(w1-w2)+" + "+FR(n1-n2,d)+" \\\\ &= "+u5disp(N,d)+" \\end{aligned} \\] The answer is <b>"+u5M(N,d)+"</b>.";
  return mcq(prompt,{t:u5M(N,d),fb:"Yes: the wholes differ by "+(w1-w2)+" and the fraction parts differ by "+(n1-n2)+"/"+d+"."},
    u5fopts([N,d],[{p:[(w1-w2)*d+(n1+n2),d],fb:"That adds the fraction parts. The question asks how much is left, so subtract the fraction parts too."},{p:[(w1+w2)*d+(n1-n2),d],fb:"That adds the whole numbers. Both the wholes and the fraction parts are subtracted here."},{p:[(w1-w2)*2*d+(n1-n2),2*d],fb:"That changes the denominator. The parts are the same size, so the denominator stays "+d+"." }]),
    sol,{mode:"sub-mixed",w1:w1,n1:n1,w2:w2,n2:n2,d:d});
}, ["Work with the whole numbers and the fraction parts separately.", "Start by subtracting the whole numbers, then subtract the numerators of the fraction parts."]);
E("u3-pk-simplify-fraction", 3, ["6.4"], 1, "gen", function(){
  var q=pick([3,4,5,6,7,8,9,10,11,12]);var p=ri(1,q-1);var cnt=0;
  while(u5gcd(p,q)!==1&&cnt<40){p=ri(1,q-1);cnt++;}
  if(u5gcd(p,q)!==1){p=1;}
  var k=ri(2,6);var N=p*k,D=q*k;
  var ctx=pick(["pure","length","mass","time"]);
  var prompt;
  if(ctx==="length")prompt="A strip is "+u5M(N,D)+" of a metre long. Write this length as a fraction in lowest terms.";
  else if(ctx==="mass")prompt="A bag has a mass of "+u5M(N,D)+" of a kilogram. Write this mass as a fraction in lowest terms.";
  else if(ctx==="time")prompt="A task takes "+u5M(N,D)+" of an hour. Write this time as a fraction in lowest terms.";
  else prompt="Write "+u5M(N,D)+" in lowest terms.";
  var sol="The greatest common factor of "+N+" and "+D+" is "+k+". Divide the numerator and the denominator by "+k+".\\[ \\begin{aligned} "+FR(N,D)+" &= "+FR(N/k,D/k)+" \\end{aligned} \\] The answer is <b>"+u5M(p,q)+"</b>.";
  return mcq(prompt,{t:u5M(p,q),fb:"Yes: dividing "+N+" and "+D+" each by their common factor "+k+" gives lowest terms."},
    u5fopts([p,q],[{p:[p,D],fb:"That divides only the numerator by "+k+". The denominator must be divided by the same factor."},{p:[N,q],fb:"That divides only the denominator by "+k+". The numerator must be divided by the same factor."},{p:[N-k,D-k],fb:"That subtracts "+k+" from the top and bottom. Simplifying means dividing by a common factor, not subtracting."}]),
    sol,{mode:"simplify",p:p,q:q,k:k});
}, ["Look for the largest number that divides both the numerator and the denominator.", "Start by listing factors of the numerator and the denominator and finding the one they share."]);
E("u3-pk-common-denominator", 3, ["6.4"], 1, "gen", function(){
  var pairs=[[2,4],[2,6],[3,6],[4,6],[3,4],[4,8],[5,10],[6,8],[3,8],[4,10],[5,6],[6,10],[8,12],[9,12],[4,12],[3,9],[5,15],[6,9],[8,10],[10,15]];
  var pr=pick(pairs);var d1=pr[0],d2=pr[1];var L=u5lcm(d1,d2);
  var na=ri(1,d1-1),nb=ri(1,d2-1);
  var prompt="What is the least common denominator of "+u5M(na,d1)+" and "+u5M(nb,d2)+"?";
  var sol="List multiples of "+d1+": "+d1+", "+(2*d1)+", "+(3*d1)+", "+(4*d1)+". List multiples of "+d2+": "+d2+", "+(2*d2)+", "+(3*d2)+", "+(4*d2)+". The first multiple they share is "+L+", so the least common denominator is <b>"+L+"</b>.";
  return mcq(prompt,{t:String(L),fb:"Yes: "+L+" is the smallest number that is a multiple of both "+d1+" and "+d2+"."},
    u5iopts(L,[{v:d1*d2,fb:"That is the product of the denominators. It is a common denominator, but not the least one here."},{v:d1+d2,fb:"That adds the denominators. A common denominator must be a multiple of each denominator."},{v:Math.max(d1,d2),fb:"That is just the larger denominator, and "+Math.min(d1,d2)+" does not divide it evenly here."}]),
    sol,{mode:"lcd",d1:d1,d2:d2});
}, ["A common denominator is a multiple of both denominators.", "Start by listing the multiples of the larger denominator until you find one the other denominator divides."]);
E("u3-pk-problem-add", 3, ["6.15"], 2, "gen", function(){
  var d1=4,d2=3,a=1,c=1,cnt=0,L=12;
  while(cnt<60){d1=pick([2,3,4,5,6,8,10,12]);d2=pick([2,3,4,5,6,8,10,12]);if(d1===d2){cnt++;continue;}L=u5lcm(d1,d2);if(L>24){cnt++;continue;}a=ri(1,d1-1);c=ri(1,d2-1);break;}
  if(cnt>=60){d1=4;d2=3;a=1;c=1;L=12;}
  var m1=L/d1,m2=L/d2;var N=a*m1+c*m2;
  var ctx=pick(["flour","trail","paint"]);
  var prompt;
  if(ctx==="flour")prompt="A baker uses "+u5M(a,d1)+" of a cup of flour for a dough and "+u5M(c,d2)+" of a cup of flour for a topping. How many cups of flour does the baker use in all? Give your answer as a fraction or mixed number in lowest terms.";
  else if(ctx==="trail")prompt="A trail crew clears "+u5M(a,d1)+" of a kilometre of path on Saturday and "+u5M(c,d2)+" of a kilometre on Sunday. How many kilometres do they clear in all? Give your answer as a fraction or mixed number in lowest terms.";
  else prompt="A painter uses "+u5M(a,d1)+" of a can of paint on a door and "+u5M(c,d2)+" of a can on a window frame. How many cans of paint is that in all? Give your answer as a fraction or mixed number in lowest terms.";
  var sol="The amounts are added. Use the common denominator "+L+".\\[ \\begin{aligned} "+FR(a,d1)+" + "+FR(c,d2)+" &= "+FR(a*m1,L)+" + "+FR(c*m2,L)+" \\\\ &= "+FR(N,L)+" \\\\ &= "+u5disp(N,L)+" \\end{aligned} \\] The answer is <b>"+u5M(N,L)+"</b>.";
  return textq(prompt,u5accept(N,L),sol,{mode:"problem-add",a:a,d1:d1,c:c,d2:d2});
}, ["The question asks for a total, so the two amounts are added.", "Start by finding a common denominator for the two fractions."]);
E("u4-pk-area-triangle", 4, ["9.4"], 1, "gen", function(){
  var b=ri(6,16), h=ri(4,12), A=b*h/2;
  var fig='<svg viewBox="0 0 300 190" width="300" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Triangle with base and height labelled">'
    +'<polygon points="55,145 245,145 120,50" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<line x1="120" y1="50" x2="120" y2="145" stroke="'+FIG_ALT+'" stroke-width="1.8" stroke-dasharray="5 4"/>'
    +_txt(150,163,"base = "+b+" cm",12.5,false)
    +_txt(104,100,"h = "+h+" cm",12,false)
    +'</svg>';
  var pool=[b*h,b+h,A+b,A*3];
  var seen={}; seen[fmt(A)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    var k=fmt(pool[i]);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:k+" cm²", fb:i===0?"That is the area of the full parallelogram: a triangle is half of it.":"Check the formula: area of a triangle is base times height divided by 2."});
  }
  var q=mcq("What is the area of the triangle in the diagram?",
    {t:fmt(A)+" cm²", fb:"Yes: A = (base x height) / 2 = ("+b+" x "+h+") / 2 = "+fmt(A)+" cm²."},
    ds,
    "\\[ \\begin{aligned} A &= "+FR("b \\times h","2")+" \\\\ &= "+FR(b+" \\times "+h,"2")+" \\\\ &= "+fmt(A)+" \\text{ cm}^2 \\end{aligned} \\] The answer is <b>"+fmt(A)+" cm²</b>.",
    {b:b, h:h});
  q.figure=fig;
  return q;
}, ["Area of a triangle is base times height, divided by 2.", "Start by multiplying base by height, then halve the result."]);
E("u4-pk-area-parallelogram", 4, ["9.4"], 2, "gen", function(){
  var b=ri(6,15), h=ri(4,10), s=h+ri(1,4);
  var A=b*h;
  var fig='<svg viewBox="0 0 300 190" width="300" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parallelogram with base, height and slanted side labelled">'
    +'<polygon points="55,140 215,140 245,60 85,60" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<line x1="110" y1="60" x2="110" y2="140" stroke="'+FIG_ALT+'" stroke-width="1.8" stroke-dasharray="5 4"/>'
    +_txt(135,158,"base = "+b+" cm",12.5,false)
    +_txt(96,102,"h = "+h+" cm",12,false)
    +_txt(238,88,""+s+" cm",12,false)
    +'</svg>';
  var pool=[b*s,A/2,b+h,b*s/2];
  var seen={}; seen[fmt(A)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    var k=fmt(pool[i]);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:k+" cm²", fb:i===0?"That multiplies by the slanted side: area uses the perpendicular height.":"Check the formula: area of a parallelogram is base times height."});
  }
  var q=mcq("What is the area of the parallelogram in the diagram?",
    {t:fmt(A)+" cm²", fb:"Yes: A = base x height = "+b+" x "+h+" = "+A+" cm²."},
    ds,
    "\\[ \\begin{aligned} A &= b \\times h \\\\ &= "+b+" \\times "+h+" \\\\ &= "+A+" \\text{ cm}^2 \\end{aligned} \\] The slanted side length is not used. The answer is <b>"+A+" cm²</b>.",
    {b:b, h:h, s:s});
  q.figure=fig;
  return q;
}, ["Area of a parallelogram is base times the perpendicular height.", "Start by finding the height: the dashed line at right angles to the base."]);
E("u4-pk-area-mix", 4, ["9.4"], 2, "gen", function(){
  var b1=ri(6,14), h1=ri(3,9), b2=ri(6,14), h2=pick([4,6,8,10,12]);
  var A1=b1*h1, A2=b2*h2/2, tot=A1+A2;
  var q=numq("A garden is made of a parallelogram plot with base "+b1+" m and height "+h1+" m, joined to a triangular plot with base "+b2+" m and height "+h2+" m. What is the total area of the garden? Give your answer in square metres.",
    tot, 0.01,
    "\\[ \\begin{aligned} A_{\\text{parallelogram}} &= "+b1+" \\times "+h1+" = "+A1+" \\\\ A_{\\text{triangle}} &= "+FR(b2+" \\times "+h2,"2")+" = "+A2+" \\\\ \\text{total} &= "+A1+" + "+A2+" = "+tot+" \\text{ m}^2 \\end{aligned} \\] The answer is <b>"+tot+" m²</b>.",
    {b1:b1, h1:h1, b2:b2, h2:h2}); q.figure=figMix(b1,h1,b2,h2,"m"); return q;
}, ["Find each plot's area with its own formula, then add.", "Start with the parallelogram: base times height."]);
E("u4-pk-area-circle", 4, ["9.6"], 2, "gen", function(){
  var modeA=ri(0,2);
  if(modeA===2){
    var rs=ri(2,20), As=3.14*rs*rs/2;
    var poolS=[3.14*rs*rs,2*3.14*rs,3.14*rs,As*4,As/2,As*3];
    var seenS={}; seenS[fmtF(As,2)]=1; var dsS=[];
    for(var s2=0;s2<poolS.length&&dsS.length<3;s2++){
      var kk=fmtF(poolS[s2],2);
      if(seenS[kk])continue; seenS[kk]=1;
      dsS.push({t:kk+" cm²", fb:s2===0?"That is the area of the full circle: a semicircle is half of it.":"Check the steps: find the full circle area with pi x r², then halve it."});
    }
    var qS=mcq("The diagram shows a semicircle (half of a circle) with radius "+rs+" cm. What is its area? Use 3.14 for pi.",
      {t:fmtF(As,2)+" cm²", fb:"Yes: half of 3.14 x "+rs+"² is "+fmtF(As,2)+" cm²."},
      dsS,
      "\\[ \\begin{aligned} A &= "+FR("3.14 \\times "+rs+"^2","2")+" \\\\ &= "+fmtF(As,2)+" \\text{ cm}^2 \\end{aligned} \\] The answer is <b>"+fmtF(As,2)+" cm²</b>.",
      {mode:"semi", r:rs});
    qS.figure=u4circleFig("r = "+rs+" cm","r");
    return qS;
  }
  if(modeA===0){
    var r=ri(3,20), A=3.14*r*r;
    var pool=[2*3.14*r,3.14*r,3.14*2*r*r,A+3.14*r];
    var seen={}; seen[fmtF(A,2)]=1; var ds=[];
    for(var i=0;i<pool.length&&ds.length<3;i++){
      var k=fmtF(pool[i],2);
      if(seen[k])continue; seen[k]=1;
      ds.push({t:k+" cm²", fb:i===0?"That is the circumference: area uses pi times the radius squared.":"Check the formula: A = pi x r² with pi = 3.14."});
    }
    var q=mcq("What is the area of the circle in the diagram? Use 3.14 for pi.",
      {t:fmtF(A,2)+" cm²", fb:"Yes: A = 3.14 x "+r+"² = "+fmtF(A,2)+" cm²."},
      ds,
      "\\[ \\begin{aligned} A &= \\pi r^2 \\\\ &= 3.14 \\times "+r+"^2 \\\\ &= "+fmtF(A,2)+" \\text{ cm}^2 \\end{aligned} \\] The answer is <b>"+fmtF(A,2)+" cm²</b>.",
      {mode:"r", r:r});
    q.figure=u4circleFig("r = "+r+" cm","r");
    return q;
  }
  var d=2*ri(3,20), r2=d/2, A2=3.14*r2*r2;
  var pool2=[2*3.14*r2,3.14*d*d,A2*2,3.14*r2];
  var seen2={}; seen2[fmtF(A2,2)]=1; var ds2=[];
  for(var j=0;j<pool2.length&&ds2.length<3;j++){
    var k2=fmtF(pool2[j],2);
    if(seen2[k2])continue; seen2[k2]=1;
    ds2.push({t:k2+" cm²", fb:j===1?"That squares the diameter: halve the diameter to get the radius first.":"Check the steps: halve the diameter for the radius, then A = pi x r²."});
  }
  var q2=mcq("What is the area of the circle in the diagram? Use 3.14 for pi.",
    {t:fmtF(A2,2)+" cm²", fb:"Yes: radius is "+r2+" cm, and A = 3.14 x "+r2+"² = "+fmtF(A2,2)+" cm²."},
    ds2,
    "\\[ \\begin{aligned} r &= "+d+" \\div 2 = "+r2+" \\\\ A &= \\pi r^2 = 3.14 \\times "+r2+"^2 \\\\ &= "+fmtF(A2,2)+" \\text{ cm}^2 \\end{aligned} \\] The answer is <b>"+fmtF(A2,2)+" cm²</b>.",
    {mode:"d", d:d});
  q2.figure=u4circleFig("d = "+d+" cm","d");
  return q2;
}, ["Area of a circle is pi times the radius squared.", "Start by making sure you have the radius; halve the diameter if that is what is given."]);
E("u4-pk-area-diameter", 4, ["9.6"], 2, "gen", function(){
  var r=ri(3,14), d=2*r, area=Math.round(3.14*r*r*100)/100; var item=pick(["A circular rug","A round clock","A circular pizza pan","A round garden bed","A circular table"]);
  var q=numq(item+" has a diameter of "+d+" cm. Find its area, in square centimetres. Use 3.14 for pi. Show your work.", area, 0.1,
    "The radius is half the diameter, and the area uses the radius. \\[ \\begin{aligned} r &= "+d+" \\div 2 = "+r+" \\\\ A &= 3.14 \\times "+r+"^2 = "+fmt(area,2)+" \\end{aligned} \\] The answer is <b>"+fmt(area,2)+"</b>.",
    {r:r,d:d}); q.figure=u4circleFig("d = "+d+" cm","d"); return q;
}, ["Halve the diameter to get the radius before using the area formula.", "Start by dividing the diameter by 2."]);
E("u4-pk-add-sub-decimals", 4, ["9.5"], 1, "gen", function(){
  var ctxs=[
    {add:true, s:"Maya buys a notebook for $%A and a pen for $%B. How much does she spend in total?"},
    {add:true, s:"A trail has two parts: %A km and %B km. What is the total length of the trail?"},
    {add:true, s:"Three ribbons measure %A m, %B m and %C m. What is their total length?"},
    {add:false, s:"Jonah has $%A and spends $%B on lunch. How much money does he have left?"},
    {add:false, s:"A tank holds %A L of water. A family uses %B L. How much water is left?"},
    {add:false, s:"A board is %A m long. A piece %B m long is cut off. How long is the piece that remains?"}
  ];
  var c=pick(ctxs);
  var A=ri(120,4800)/100, B=ri(110,2900)/100;
  if(!c.add&&B>A){var tmp=A;A=B;B=tmp;}
  var parts=[A,B], ans=A+B;
  if(c.add&&c.s.indexOf("%C")>=0){var C=ri(105,1500)/100; parts.push(C); ans+=C;}
  if(!c.add)ans=A-B;
  var prompt=c.s.replace("%A",fmtF(A,2)).replace("%B",fmtF(B,2));
  if(parts.length===3)prompt=prompt.replace("%C",fmtF(parts[2],2));
  var pool=[ans+0.1,ans-0.1,ans+1,ans-1,ans+0.01,ans+10];
  var seen={}; seen[fmtF(ans,2)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    if(pool[i]<=0)continue;
    var k=fmtF(pool[i],2);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:"$"+k.replace(/^\$/,""), fb:"Check the place values: line up the decimal points and add or subtract column by column."});
  }
  ds=ds.map(function(o){return {t:(c.s.indexOf("$")>=0?"$":"")+o.t.replace(/^\$/,""), fb:o.fb};});
  var corT=(c.s.indexOf("$")>=0?"$":"")+fmtF(ans,2);
  ds.forEach(function(o){if(o.t.indexOf("$")!==0&&corT.indexOf("$")===0)o.t="$"+o.t;});
  var steps=parts.map(function(x){return fmtF(x,2);}).join(c.add?" + ":"");
  var sol=c.add
    ? "\\[ \\begin{aligned} &"+parts.map(function(x){return fmtF(x,2);}).join(" + ")+" \\\\ &= "+fmtF(ans,2)+" \\end{aligned} \\] The answer is <b>"+corT+"</b>."
    : "\\[ \\begin{aligned} "+fmtF(A,2)+" - "+fmtF(B,2)+" &= "+fmtF(ans,2)+" \\end{aligned} \\] The answer is <b>"+corT+"</b>.";
  return mcq(prompt,
    {t:corT, fb:"Yes: lining up the decimal points and working column by column gives this value."},
    ds, sol, {mode:c.add?"add":"sub", A:A, B:B});
}, ["Line up the decimal points before adding or subtracting.", "Start by rewriting the numbers with the decimal points in one column."]);
E("u4-pk-mult-decimals", 4, ["9.5"], 1, "gen", function(){
  var mode=ri(0,1), ans, prompt, work;
  if(mode===0){
    var p=ri(125,1999)/100, q=ri(12,48);
    ans=p*q;
    prompt="Fabric costs $"+fmtF(p,2)+" per metre. How much do "+q+" metres cost?";
    work="\\[ \\begin{aligned} "+fmtF(p,2)+" \\times "+q+" &= "+fmt(ans,2)+" \\end{aligned} \\]";
  } else {
    var a=ri(115,999)/100, b=ri(12,35)/10;
    ans=a*b;
    prompt="A garden bed is "+fmt(a,2)+" m long and "+fmt(b,1)+" m wide. What is its area, in square metres?";
    work="\\[ \\begin{aligned} "+fmt(a,2)+" \\times "+fmt(b,1)+" &= "+fmt(ans,3)+" \\end{aligned} \\]";
  }
  var pool=[ans*10,ans/10,ans+a||ans+1,ans+(mode===0?p:a),ans- (mode===0?p:a)];
  var seen={}; seen[fmt(ans,3)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    if(!(pool[i]>0))continue;
    var k=fmt(pool[i],3);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:(mode===0?"$":"")+k, fb:"Check the decimal placement: count the total decimal places in the factors, or estimate the size first."});
  }
  var corT=(mode===0?"$":"")+fmt(ans,3);
  ds.forEach(function(o){if(mode===0&&o.t.indexOf("$")!==0)o.t="$"+o.t;});
  ds=precPair(corT,ds);
  return mcq(prompt,
    {t:corT, fb:"Yes: the multiplication and decimal placement are both right."},
    ds,
    work+" Multiply as with whole numbers, then place the decimal point using the total number of decimal places in the factors. The answer is <b>"+corT+"</b>.",
    {mode:mode});
}, ["Multiply as if the numbers were whole, then place the decimal point.", "Start by estimating the size of the product so a misplaced decimal stands out."]);
E("u5-pk-percent-convert", 5, ["3.13"], 1, "gen", function(){
  var p=ri(2,98);
  if(ri(0,1)===0){
    var s=u3simp(p,100);
    var pool=[[p,100],[100-p,100],[p,10],[p+100,100],[100,p]];
    var seen={}; seen[fmt(p/100,6)]=1; var ds=[];
    for(var i=0;i<pool.length&&ds.length<3;i++){
      var cv=pool[i][0]/pool[i][1], key=fmt(cv,6);
      if(seen[key])continue; seen[key]=1;
      var ss=u3simp(pool[i][0],pool[i][1]);
      ds.push({t:"\\("+FR(ss[0],ss[1])+"\\)", fb:"That fraction has a different value: a percent is a part out of 100, then simplify."});
    }
    return mcq("Write "+p+"% as a fraction in lowest terms.",
      {t:"\\("+FR(s[0],s[1])+"\\)", fb:"Yes: "+p+"% = "+p+"/100, which simplifies to the fraction shown."},
      ds,
      "\\[ \\begin{aligned} "+p+"\\% &= "+FR(p,100)+" \\\\ &= "+FR(s[0],s[1])+" \\end{aligned} \\] The answer is <b>\\("+FR(s[0],s[1])+"\\)</b>.",
      {mode:"frac", p:p});
  }
  var cor=p/100;
  var pool2=[p/10,p/1000,(100+p)/100,p,cor+0.1];
  var seen2={}; seen2[fmt(cor,6)]=1; var ds2=[];
  for(var j=0;j<pool2.length&&ds2.length<3;j++){
    var key2=fmt(pool2[j],6);
    if(seen2[key2])continue; seen2[key2]=1;
    ds2.push({t:fmt(pool2[j],3), fb:"That decimal shifts the percent by the wrong number of places: divide by 100."});
  }
  ds2=precPair(fmt(cor),ds2);
  return mcq("Write "+p+"% as a decimal.",
    {t:fmt(cor), fb:"Yes: dividing "+p+" by 100 moves the decimal point two places left."},
    ds2,
    "A percent is out of 100, so \\("+p+"\\% = "+p+" \\div 100 = "+fmt(cor)+"\\). The answer is <b>"+fmt(cor)+"</b>.",
    {mode:"dec", p:p});
}, ["Percent means out of 100.", "Start by writing the percent over 100, then simplify or divide."]);
E("u5-pk-percent-of", 5, ["3.13"], 1, "gen", function(){
  if(ri(0,1)===0){
    var Ns=[40,50,60,80,90,120,150,200,240,250,300,400];
    var N=pick(Ns), p=pick([5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95]);
    var ans=N*p/100;
    var ctxs=["What is "+p+"% of "+N+"?","A school has "+N+" students and "+p+"% of them take the bus. How many students take the bus?","A test is out of "+N+" marks. A student scores "+p+"%. How many marks is that?","Of "+N+" beads, "+p+"% are red. How many beads are red?"];
    var pool=[p,ans+N*0.05,ans-N*0.05,ans*2,100-p,ans+N*0.1,ans*3,ans/2,p+10];
    var seen={}; seen[fmt(ans,2)]=1; var ds=[];
    for(var i=0;i<pool.length&&ds.length<3;i++){
      if(!(pool[i]>0))continue;
      var k=fmt(pool[i],2);
      if(seen[k])continue; seen[k]=1;
      ds.push({t:k, fb:"Convert the percent to a decimal first ("+p+"% = "+fmt(p/100)+"), then multiply by "+N+"."});
    }
    ds=precPair(fmt(ans,2),ds);
    return mcq(pick(ctxs),
      {t:fmt(ans,2), fb:"Yes: "+p+"% = "+fmt(p/100)+", and "+fmt(p/100)+" of "+N+" is "+fmt(ans,2)+"."},
      ds,
      "\\[ \\begin{aligned} "+p+"\\% \\text{ of } "+N+" &= "+fmt(p/100)+" \\times "+N+" \\\\ &= "+fmt(ans,2)+" \\end{aligned} \\] The answer is <b>"+fmt(ans,2)+"</b>.",
      {mode:"of", N:N, p:p});
  }
  var Ns2=[40,50,60,80,100,120,150,200,240,300];
  var N2=pick(Ns2), k2=pick([5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95]);
  var part=N2*k2/100;
  var pool3=[k2+10,k2-10,100-k2,k2+25,k2+5,k2-5,k2+15,k2-15];
  var seen3={}; seen3[k2+"%"]=1; var ds3=[];
  for(var j=0;j<pool3.length&&ds3.length<3;j++){
    if(pool3[j]<=0||pool3[j]>100)continue;
    var kk=pool3[j]+"%";
    if(seen3[kk])continue; seen3[kk]=1;
    ds3.push({t:kk, fb:"Write the part over the whole as a fraction, then convert to a percent."});
  }
  return mcq(fmt(part,1)+" out of "+N2+" students passed a quiz. What percent passed?",
    {t:k2+"%", fb:"Yes: "+fmt(part,1)+"/"+N2+" = "+fmt(k2/100)+", which is "+k2+"%."},
    ds3,
    "\\[ \\begin{aligned} "+FR(Math.round(part*10),N2*10)+" &= "+fmt(k2/100)+" \\\\ &= "+k2+"\\% \\end{aligned} \\] The answer is <b>"+k2+"%</b>.",
    {mode:"find", N:N2, k:k2});
}, ["Percent of a number: convert the percent to a decimal and multiply.", "Start by writing the percent as a decimal (divide by 100)."]);
E("u5-pk-discount-total", 5, ["3.14"], 2, "gen", function(){
  var P=20*ri(3,12), p=pick([10,15,20,25,30,35,40,45]);
  var disc=P*p/100, ans=P-disc;
  var item=pick(["jacket","bicycle helmet","backpack"]);
  return numq("A "+item+" is priced at $"+P+". The store offers a discount of "+p+"%. How many dollars does a customer pay for the "+item+"? Show your work.", ans, 0,
    "Find the discount amount first, then subtract it from the price. \\[ \\begin{aligned} \\text{discount} &= "+p+"\\% \\text{ of } "+P+" = "+disc+" \\\\ \\text{amount paid} &= "+P+" - "+disc+" = "+ans+" \\end{aligned} \\] The answer is <b>$"+ans+"</b>.",
    {P:P,p:p});
}, ["Find the percent amount first; the amount paid is what remains after it is taken off.", "Start by calculating the discount in dollars."]);
E("u5-pk-simplify-fraction", 5, ["3.12"], 1, "gen", function(){
  var q=pick([3,4,5,6,7,8,9,10,11,12]);var p=ri(1,q-1);var cnt=0;
  while(u5gcd(p,q)!==1&&cnt<40){p=ri(1,q-1);cnt++;}
  if(u5gcd(p,q)!==1){p=1;}
  var k=ri(2,6);var N=p*k,D=q*k;
  var ctx=pick(["pure","length","mass","time"]);
  var prompt;
  if(ctx==="length")prompt="A strip is "+u5M(N,D)+" of a metre long. Write this length as a fraction in lowest terms.";
  else if(ctx==="mass")prompt="A bag has a mass of "+u5M(N,D)+" of a kilogram. Write this mass as a fraction in lowest terms.";
  else if(ctx==="time")prompt="A task takes "+u5M(N,D)+" of an hour. Write this time as a fraction in lowest terms.";
  else prompt="Write "+u5M(N,D)+" in lowest terms.";
  var sol="The greatest common factor of "+N+" and "+D+" is "+k+". Divide the numerator and the denominator by "+k+".\\[ \\begin{aligned} "+FR(N,D)+" &= "+FR(N/k,D/k)+" \\end{aligned} \\] The answer is <b>"+u5M(p,q)+"</b>.";
  return mcq(prompt,{t:u5M(p,q),fb:"Yes: dividing "+N+" and "+D+" each by their common factor "+k+" gives lowest terms."},
    u5fopts([p,q],[{p:[p,D],fb:"That divides only the numerator by "+k+". The denominator must be divided by the same factor."},{p:[N,q],fb:"That divides only the denominator by "+k+". The numerator must be divided by the same factor."},{p:[N-k,D-k],fb:"That subtracts "+k+" from the top and bottom. Simplifying means dividing by a common factor, not subtracting."}]),
    sol,{mode:"simplify",p:p,q:q,k:k});
}, ["Look for the largest number that divides both the numerator and the denominator.", "Start by listing factors of the numerator and the denominator and finding the one they share."]);
E("u5-pk-simplify-solution", 5, ["3.12"], 1, "gen", function(){
  var d=12,a=2,b=4,cnt=0,s=6;
  while(cnt<80){d=pick([6,8,9,10,12,14,15,16,18,20,21,22,24]);a=ri(1,d-2);b=ri(1,d-1-a);s=a+b;if(u5gcd(s,d)>=2)break;cnt++;}
  if(cnt>=80){d=12;a=2;b=4;s=6;}
  var rr=u5red(s,d);var g=u5gcd(s,d);
  var ctx=pick(["pure","gym","garden"]);
  var prompt;
  if(ctx==="gym")prompt="A student trains for "+u5M(a,d)+" of an hour on Monday and "+u5M(b,d)+" of an hour on Tuesday. How many hours is that in all? Give your answer as a fraction in lowest terms (for example, 3/4).";
  else if(ctx==="garden")prompt="A gardener waters "+u5M(a,d)+" of a bed in the morning and "+u5M(b,d)+" of the bed in the afternoon. What fraction of the bed is watered in all? Give your answer as a fraction in lowest terms (for example, 3/4).";
  else prompt="Calculate "+u5M(a,d)+" + "+u5M(b,d)+". Give your answer as a fraction in lowest terms (for example, 3/4).";
  var sol="Add the numerators, then simplify by dividing the numerator and the denominator by their common factor "+g+".\\[ \\begin{aligned} "+FR(a,d)+" + "+FR(b,d)+" &= "+FR(s,d)+" \\\\ &= "+u5disp(s,d)+" \\end{aligned} \\] The answer is <b>"+u5M(s,d)+"</b>.";
  return textq(prompt,u5accept(s,d),sol,{mode:"simplify-solution",a:a,b:b,d:d});
}, ["First add the fractions, then check whether the result can be simplified.", "Start by adding the numerators, since the denominators already match."]);
E("u5-pk-frac-to-decimal", 5, ["3.11"], 1, "gen", function(){
  var dens=[2,4,5,8,10,20,25,40,50];
  var d=pick(dens), w=ri(0,2), n=ri(1,d-1);
  var v=(w*d+n)/d;
  var pool=[v+0.1,v-0.1,v+0.02,v-0.02,v+1,v+0.5];
  var seen={}; seen[fmt(v,4)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    if(pool[i]<=0)continue;
    var key=fmt(pool[i],4);
    if(seen[key])continue; seen[key]=1;
    ds.push({t:fmt(pool[i],3), fb:"That decimal has a different value: divide the numerator by the denominator to check."});
  }
  ds=precPair(fmt(v,3),ds);
  var num=w*d+n;
  return mcq("Write \\("+FR(num,d)+"\\) as a decimal.",
    {t:fmt(v,3), fb:"Yes: "+num+" divided by "+d+" gives this decimal."},
    ds,
    "\\[ \\begin{aligned} "+FR(num,d)+" &= "+num+" \\div "+d+" \\\\ &= "+fmt(v,3)+" \\end{aligned} \\] The answer is <b>"+fmt(v,3)+"</b>.",
    {num:num, d:d});
}, ["A fraction is a division: numerator divided by denominator.", "Start by dividing the top number by the bottom number."]);
E("u5-pk-div-decimals", 5, ["6.28"], 1, "gen", function(){
  var ctxs=[
    {s:"A rope %D m long is cut into %V equal pieces. How long is each piece, in metres?"},
    {s:"A group pays $%D for a van rental, split equally among %V friends. How much does each friend pay?"},
    {s:"A jug holds %D L of juice, poured equally into %V bottles. How many litres are in each bottle?"}
  ];
  var useDecDiv=ri(0,1)===0;
  var dv=useDecDiv?ri(3,9)/10:ri(3,9);
  var q=ri(125,2400)/100;
  var dvd=q*dv;
  var c=pick(ctxs);
  var prompt=c.s.replace("%D",fmt(dvd,3)).replace("%V",fmt(dv,1));
  var money=c.s.indexOf("$")>=0;
  var pool=[q*10,q/10,q+dv,q- dv];
  var seen={}; seen[fmt(q,3)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    if(!(pool[i]>0))continue;
    var k=fmt(pool[i],3);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:(money?"$":"")+k, fb:"Check by multiplying your answer by the divisor: it should return the starting amount."});
  }
  var corT=(money?"$":"")+fmt(q,3);
  ds.forEach(function(o){if(money&&o.t.indexOf("$")!==0)o.t="$"+o.t;});
  ds=precPair(corT,ds);
  return mcq(prompt,
    {t:corT, fb:"Yes: "+fmt(q,3)+" times "+fmt(dv,1)+" gives back "+fmt(dvd,3)+"."},
    ds,
    "\\[ \\begin{aligned} "+fmt(dvd,3)+" \\div "+fmt(dv,1)+" &= "+fmt(q,3)+" \\end{aligned} \\] Check: \\("+fmt(q,3)+" \\times "+fmt(dv,1)+" = "+fmt(dvd,3)+"\\). The answer is <b>"+corT+"</b>.",
    {dv:dv, q:q});
}, ["Division undoes multiplication: answer times divisor should give the starting amount.", "Start by estimating: how many groups of the divisor fit into the starting amount?"]);
E("u6-pk-inspection-trial", 6, ["8.1"], 1, "gen", function(){
  var v=pick(["x","n","m","y","t"]);
  var mode=pick(["times","plus","trial"]);
  var a,x,b,sol,prompt,errs;
  if(mode==="times"){
    a=ri(2,9);x=ri(2,12);b=a*x;
    prompt="Solve \\("+a+v+" = "+b+"\\) by inspection.";
    sol="Inspection means finding the value that makes the equation true: "+a+" times what equals "+b+"?\\[ \\begin{aligned} "+a+v+" &= "+b+" \\\\ "+v+" &= "+x+" \\end{aligned} \\] The answer is <b>\\("+v+" = "+x+"\\)</b>.";
    errs=[{v:b-a,fb:"That subtracts "+a+" from "+b+". In "+a+v+", the variable is multiplied by "+a+", so divide instead."},{v:x+1,fb:"Check it: "+a+" times "+(x+1)+" is "+(a*(x+1))+", not "+b+"."},{v:b+a,fb:"That adds "+a+" to "+b+", which makes the value far too large."}];
    return mcq(prompt,{t:String(x),fb:"Yes: "+a+" times "+x+" equals "+b+", so the equation is true."},u6iopts(x,errs),sol,{mode:mode,a:a});
  }else if(mode==="plus"){
    a=ri(2,15);x=ri(2,15);b=x+a;
    prompt="Solve \\("+v+" + "+a+" = "+b+"\\) by inspection.";
    sol="Find the value that makes the equation true: what plus "+a+" equals "+b+"?\\[ \\begin{aligned} "+v+" + "+a+" &= "+b+" \\\\ "+v+" &= "+x+" \\end{aligned} \\] The answer is <b>\\("+v+" = "+x+"\\)</b>.";
    errs=[{v:b+a,fb:"That adds "+a+" to "+b+". The value added to "+a+" must be smaller than "+b+" here."},{v:x+1,fb:"Check it: "+(x+1)+" + "+a+" is "+(x+1+a)+", not "+b+"."},{v:a,fb:"That is the number added to the variable, not the value of the variable."}];
    return mcq(prompt,{t:String(x),fb:"Yes: "+x+" + "+a+" equals "+b+", so the equation is true."},u6iopts(x,errs),sol,{mode:mode,a:a});
  }
  a=ri(2,6);x=ri(3,9);b=ri(1,10);var c=a*x+b;
  var t1=x-1,t2=x+1;
  prompt="A student solves \\("+a+v+" + "+b+" = "+c+"\\) by systematic trial. Trial \\("+v+" = "+t1+"\\) gives a left side of "+(a*t1+b)+". Trial \\("+v+" = "+t2+"\\) gives a left side of "+(a*t2+b)+". What is the solution?";
  sol="The left side must equal "+c+". The trial "+t1+" gives "+(a*t1+b)+", which is too small, and the trial "+t2+" gives "+(a*t2+b)+", which is too large, so the solution lies between them.\\[ \\begin{aligned} "+a+v+" + "+b+" &= "+c+" \\\\ "+a+"("+x+") + "+b+" &= "+(a*x+b)+" \\end{aligned} \\] The answer is <b>\\("+v+" = "+x+"\\)</b>.";
  errs=[{v:t1,fb:"That trial gives a left side of "+(a*t1+b)+", not "+c+", so it is too small."},{v:t2,fb:"That trial gives a left side of "+(a*t2+b)+", not "+c+", so it is too large."},{v:x+2,fb:"The trials bracket the answer between "+t1+" and "+t2+", so it cannot be as large as "+(x+2)+"."}];
  return mcq(prompt,{t:String(x),fb:"Yes: substituting "+x+" makes the left side equal "+c+"."},u6iopts(x,errs),sol,{mode:mode,a:a,b:b});
}, ["Inspection means finding the value that makes the equation true, and trial means testing values in order.", "Start by asking what value, placed in the equation, makes the two sides equal."]);
E("u6-pk-solve-two-step", 6, ["8.2"], 2, "gen", function(){
  var v=pick(["x","n","m","y","t"]);var a=ri(2,9),x=ri(2,12),b=ri(2,15),c=a*x+b;
  var ctx=pick(["pure","gym","books"]);
  var prompt;
  if(ctx==="gym")prompt="A gym charges a joining fee of $"+b+" plus $"+a+" per class. A member pays $"+c+" in total. The number of classes, \\("+v+"\\), satisfies \\("+a+v+" + "+b+" = "+c+"\\). How many classes did the member take?";
  else if(ctx==="books")prompt="A book club charges $"+b+" for shipping plus $"+a+" per book. A member pays $"+c+" in total. The number of books, \\("+v+"\\), satisfies \\("+a+v+" + "+b+" = "+c+"\\). How many books did the member order?";
  else prompt="Solve \\("+a+v+" + "+b+" = "+c+"\\).";
  var sol="Undo the addition first, then undo the multiplication, doing the same to both sides each time.\\[ \\begin{aligned} "+a+v+" + "+b+" &= "+c+" \\\\ "+a+v+" &= "+(c-b)+" \\\\ "+v+" &= "+x+" \\end{aligned} \\] The answer is <b>\\("+v+" = "+x+"\\)</b>. Check: "+a+"("+x+") + "+b+" = "+c+".";
  return mcq(prompt,{t:String(x),fb:"Yes: subtracting "+b+" leaves "+a+v+" = "+(c-b)+", and dividing by "+a+" gives "+x+"."},
    u6iopts(x,[{v:c-b,fb:"That subtracts "+b+" but stops before dividing by "+a+". One more step is needed."},{v:x+a,fb:"Check it in the equation: "+a+"("+ (x+a) +") + "+b+" is more than "+c+"."},{v:Math.floor((c+b)/a),fb:"That adds "+b+" instead of subtracting it before dividing."}]),
    sol,{mode:"ax-plus-b",a:a,b:b});
}, ["Undo the operations in reverse order: the added number first, then the multiplier.", "Start by subtracting the added number from both sides."]);
E("u6-pk-solve-other-forms", 6, ["8.2"], 2, "gen", function(){
  var v=pick(["x","n","m","y","t"]);
  var mode=pick(["minus","divide"]);
  var prompt,sol,corr,errs;
  if(mode==="minus"){
    var a=ri(2,9),x=ri(3,12),b=ri(2,a*x-2),c=a*x-b;
    prompt="Solve \\("+a+v+" - "+b+" = "+c+"\\).";
    sol="Undo the subtraction first, then undo the multiplication, doing the same to both sides each time.\\[ \\begin{aligned} "+a+v+" - "+b+" &= "+c+" \\\\ "+a+v+" &= "+(c+b)+" \\\\ "+v+" &= "+x+" \\end{aligned} \\] The answer is <b>\\("+v+" = "+x+"\\)</b>. Check: "+a+"("+x+") - "+b+" = "+c+".";
    corr={t:String(x),fb:"Yes: adding "+b+" leaves "+a+v+" = "+(c+b)+", and dividing by "+a+" gives "+x+"." };
    errs=[{v:c+b,fb:"That adds "+b+" but stops before dividing by "+a+". One more step is needed."},{v:Math.max(1,Math.floor((c-b)/a)),fb:"That subtracts "+b+" instead of adding it back before dividing."},{v:x+2,fb:"Check it in the equation: "+a+"("+(x+2)+") - "+b+" is more than "+c+"." }];
    return mcq(prompt,corr,u6iopts(x,errs),sol,{mode:mode,a:a,b:b});
  }
  var a2=ri(2,9),x2=ri(2,12),b2=x2;
  prompt="Solve \\(\\frac{"+v+"}{"+a2+"} = "+b2+"\\).";
  sol="The variable is divided by "+a2+", so undo the division by multiplying both sides by "+a2+".\\[ \\begin{aligned} \\frac{"+v+"}{"+a2+"} &= "+b2+" \\\\ "+v+" &= "+b2+" \\times "+a2+" \\\\ "+v+" &= "+(a2*b2)+" \\end{aligned} \\] The answer is <b>\\("+v+" = "+(a2*b2)+"\\)</b>. Check: "+(a2*b2)+" divided by "+a2+" is "+b2+".";
  corr={t:String(a2*b2),fb:"Yes: multiplying both sides by "+a2+" gives "+v+" = "+b2+" times "+a2+" = "+(a2*b2)+"." };
  errs=[{v:b2+a2,fb:"That adds the divisor. The variable is divided by "+a2+", so multiply to undo it."},{v:b2,fb:"That is the result after division, not the value of the variable itself."},{v:Math.max(1,b2-a2),fb:"That subtracts the divisor. The variable is divided by "+a2+", so multiply to undo it."}];
  return mcq(prompt,corr,u6iopts(a2*b2,errs),sol,{mode:mode,a:a2});
}, ["Look at the form of the equation and undo each operation with its inverse, on both sides.", "Start by undoing the addition or subtraction, or by undoing the division if the variable is divided."]);
E("u6-pk-verify-two-step", 6, ["8.3"], 2, "gen", function(){
  var v=pick(["x","n","m"]);var a=ri(2,6),b=ri(1,10),x=ri(2,10),c=a*x+b;
  var isSol=pick([true,false]);var cand=isSol?x:x+pick([1,2]);
  var lhs=a*cand+b;
  var corrStmt=cand+" substituted: "+a+"("+cand+") + "+b+" = "+lhs+(isSol?", and "+lhs+" = "+c+", so "+cand+" is a solution." : ", and "+lhs+" is not "+c+", so "+cand+" is not a solution.");
  var wrongArith=(a*cand-b);
  var distr=[
    {t:cand+" substituted: "+a+"("+cand+") + "+b+" = "+wrongArith+(isSol?", and that equals "+c+", so "+cand+" is a solution." : ", and that equals "+c+" as well, so "+cand+" is a solution."),fb:"That arithmetic subtracts "+b+" instead of adding it. Redo the substitution carefully."},
    {t:cand+" substituted: "+a+"("+cand+") + "+b+" = "+lhs+(isSol?", so "+cand+" is not a solution." : ", and "+lhs+" = "+c+" exactly, so "+cand+" is a solution."),fb:"The substitution value "+lhs+" is right, but the conclusion is backwards: compare "+lhs+" with the right side "+c+"."},
    {t:cand+" substituted: ("+a+" + "+b+")("+cand+") = "+((a+b)*cand)+(isSol?", so "+cand+" is a solution." : ", so "+cand+" is not a solution, by that check."),fb:"That adds the coefficient and the constant before multiplying. Multiply "+a+" by "+cand+" first, then add "+b+"."}
  ];
  var prompt="Which statement correctly verifies whether \\("+v+" = "+cand+"\\) is a solution of \\("+a+v+" + "+b+" = "+c+"\\)?";
  var sol="Substitute "+cand+" for "+v+" and compare the two sides.\\[ \\begin{aligned} "+a+v+" + "+b+" &= "+a+"("+cand+") + "+b+" \\\\ &= "+lhs+" \\end{aligned} \\] The right side is "+c+", so <b>"+cand+" is "+(isSol?"":"not ")+"a solution</b>.";
  return mcq(prompt,{t:corrStmt,fb:"Yes: the substitution is computed correctly and the conclusion matches the comparison with "+c+"."},distr,sol,{mode:"verify-two-step",cand:cand});
}, ["Verification means substituting the value and comparing the two sides of the equation.", "Start by replacing the variable with the given value and working out the left side."]);
E("u6-pk-table-missing", 6, ["7.2"], 1, "gen", function(){
  var a=ri(2,6), b=ri(1,9), miss=pick([2,3,4]);
  var ys=[1,2,3,4].map(function(x){return a*x+b;});
  var shown=ys.map(function(y,i){return (i+1)===miss?"?":y;}).join(", ");
  var val=a*miss+b;
  var cand=[a*miss, val+a, (a+1)*miss+b, val+2*a];
  var seen={},ds=[]; cand.forEach(function(z){ if(z!==val&&!seen[z]&&ds.length<3){seen[z]=1;ds.push(z);} });
  var g2=1; while(ds.length<3){ var z2=val+g2*3; if(!seen[z2]){seen[z2]=1;ds.push(z2);} g2++; }
  var fbFor=function(z){ if(z===a*miss)return "That forgets the constant term of the relation."; if(z===a*(miss+1)+b)return "That is the value for the next x, one row too far."; return "That breaks the pattern of adding "+a+" each row."; };
  return mcq("For the relation \\(y = "+u1Expr(a,b,"x")+"\\), a table of values shows \\(x = 1, 2, 3, 4\\) with \\(y = "+shown+"\\). What is the missing value?",
    {t:String(val), fb:"Correct: substitute x = "+miss+" into the relation."},
    ds.map(function(z){return {t:String(z), fb:fbFor(z)};}),
    "Substitute \\(x = "+miss+"\\): \\[ \\begin{aligned} y &= "+a+" \\times "+miss+" + "+b+" \\\\ &= "+val+" \\end{aligned} \\] The answer is <b>"+val+"</b>.",
    {a:a,b:b,miss:miss});
}, ["Use the relation, or follow the step pattern down the table.", "Start by substituting the missing row's x value into the relation."]);
E("u6-pk-graph-relation", 6, ["7.3"], 2, "gen", function(){
  var a=0,b=0,g=0; while(g++<200){ a=ri(1,4); b=ri(1,8); if(a!==b)break; }
  var xmax=pick([3,4,5]);
  var pts=[]; for(var gx=0;gx<=xmax;gx++)pts.push([gx,a*gx+b]);
  var yMax=a*xmax+b+1;
  var corr="y = "+u1Expr(a,b,"x");
  var cand=["y = "+u1Expr(b,a,"x"), "y = "+u1Expr(a,b+1,"x"), "y = "+u1Expr(a+1,b,"x")];
  var q=mcq("The graph shows discrete points plotted from a table of values for a linear relation. Which relation matches the points?",
    {t:corr, fb:"Correct: the points start at "+b+" when x is 0 and rise by "+a+" each step."},
    [{t:cand[0], fb:"That starts at "+a+" when x is 0; the graph starts at "+b+"."},
     {t:cand[1], fb:"That starts one unit too high; the first point is at height "+b+"."},
     {t:cand[2], fb:"That rises by "+(a+1)+" each step; the graph rises by "+a+"."}],
    "Read two features from the graph: at \\(x = 0\\) the height is \\("+b+"\\), the constant term, and each step right raises the height by \\("+a+"\\), the coefficient. The relation is \\("+corr+"\\). The answer is <b>"+corr+"</b>.",
    {a:a,b:b,xmax:xmax});
  q.figure=u1Plot(pts,xmax,yMax,"x","y");
  return q;
}, ["Read the starting height and the step size from the points.", "Start with the point at x = 0; its height is the constant term."]);
E("u6-pk-read-point", 6, ["7.4"],1,"gen",function(){
  var x=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);var y=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);var guard=0;
  while(Math.abs(x)===Math.abs(y)&&guard<20){y=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);guard++;}
  if(Math.abs(x)===Math.abs(y))y=x>0?x-1:x+1;
  var correct=u8pair(x,y);
  var cands=[u8pair(y,x),u8pair(-x,y),u8pair(x,-y)];
  var ds=cands.map(function(t,i){return {t:t,fb:i===0?"The first number is the x-coordinate (horizontal), the second is the y-coordinate (vertical). That pair swaps them.":(i===1?"Check the sign of the x-coordinate: the point is on the other side of the y-axis.":"Check the sign of the y-coordinate: the point is on the other side of the x-axis.")};});
  var q=mcq("Point P is plotted on the Cartesian plane. What are the coordinates of point P?",
    {t:correct,fb:"Yes: from the origin, move "+x+" horizontally and "+y+" vertically to reach P."},ds,
    "From the origin, point P sits "+Math.abs(x)+" units "+(x>0?"right":"left")+" and "+Math.abs(y)+" units "+(y>0?"up":"down")+". The coordinates are <b>"+correct+"</b>.",{mode:"read"});
  q.figure=u8gridSVG([{x:x,y:y,label:"P"}],null,null);
  return q;
},["Coordinates are written (x, y): horizontal movement first, then vertical.","Start at the origin and count across, then up or down."]);
E("u6-pk-evaluate-expression", 6, ["8.5"], 1, "gen", function(){
  var a=ri(2,8), b=ri(2,12), x=ri(2,9), sub=pick([true,false]);
  if(sub&&a*x<=b){ b=a*x-1; if(b<1)b=1; }
  var val=sub?a*x-b:a*x+b, v=pick(["x","n","t"]);
  var shown="\\("+u1Expr(a,sub?-b:b,v)+"\\)";
  var cand=[sub?a*x+b:a*x-b, a*x, a+x+(sub?-b:b), val+ a];
  var seen={},ds=[]; cand.forEach(function(z){ if(z!==val&&!seen[z]&&ds.length<3){seen[z]=1;ds.push(z);} });
  var g=1; while(ds.length<3){ var z=val+g*2; if(z!==val&&!seen[z]){seen[z]=1;ds.push(z);} g++; }
  var fbFor=function(z){ if(z===a*x)return "That multiplies but forgets the constant term."; if(z===(sub?a*x+b:a*x-b))return "That uses the wrong operation on the constant term."; return "That does not follow substituting "+x+" and then following the order of operations."; };
  return mcq("Evaluate "+shown+" when \\("+v+" = "+x+"\\).",
    {t:String(val), fb:"Correct: "+a+" times "+x+" is "+(a*x)+", then "+(sub?"subtract ":"add ")+b+"."},
    ds.map(function(z){return {t:String(z), fb:fbFor(z)};}),
    "\\[ \\begin{aligned} "+u1Expr(a,sub?-b:b,v)+" &= "+a+" \\times "+x+(sub?" - ":" + ")+b+" \\\\ &= "+val+" \\end{aligned} \\] The answer is <b>"+val+"</b>.",
    {a:a,b:b,x:x,sub:sub});
}, ["Substitute first, then follow the order of operations.", "Start by replacing the variable with the given value everywhere it appears."]);
E("u7-pk-graph-quantities", 7, ["11.4"], 1, "gen", function(){
  var g=u4graphData(), idx=ri(0,3), cat=g.cats[idx];
  var T=pick([100,200,300,400]), qty=cat.pct*T/100;
  var ds=g.cats.filter(function(c,i){return i!==idx;}).map(function(c){
    return {t:String(c.pct*T/100), fb:"That is the count for "+c.name+": use the percent for "+cat.name+"."};
  });
  var q=mcq("The circle graph shows the "+g.topic+" of "+T+" students. How many students chose "+cat.name+"?",
    {t:String(qty), fb:"Yes: "+cat.pct+"% of "+T+" is "+qty+"."},
    ds,
    "\\[ \\begin{aligned} \\text{students} &= "+FR(cat.pct,"100")+" \\times "+T+" \\\\ &= "+qty+" \\end{aligned} \\] The answer is <b>"+qty+"</b>.",
    {topic:g.topic, idx:idx, T:T});
  q.figure=u4pieFig(g.cats,false);
  return q;
}, ["Turn the sector's percent into a count by multiplying it by the total surveyed.", "Start by reading the percent for the category from the legend."]);
E("u7-pk-range-basic", 7, ["11.1"],1,"gen",function(){
  var ctx=pick(["daily high temperatures in degrees","heights of plants in centimetres","race times in seconds","numbers of pets per household","goals scored each week"]);
  var lo=ri(2,10),hi=lo+ri(4,14);var vals=[lo,hi];var n=ri(4,6);for(var i=0;i<n;i++)vals.push(ri(lo,hi));vals=shuffle(vals);
  var r=hi-lo;
  var cand=u7numOpts(r,[hi,lo,r+2,Math.max(r-2,0),hi+lo]);
  var ds=cand.map(function(v){return {t:String(v),fb:v===hi?"That is the largest value alone. The range subtracts the smallest value from the largest.":"The range is largest minus smallest: "+hi+" minus "+lo+"."};});
  return mcq("A set of "+ctx+" is: "+vals.join(", ")+". What is the range?",{t:String(r),fb:"Yes: "+hi+" minus "+lo+" equals "+r+"."},ds,
    "The largest value is "+hi+" and the smallest is "+lo+". \\[ \\begin{aligned} \\text{range} &= "+hi+" - "+lo+" \\\\ &= "+r+" \\end{aligned} \\] The range is <b>"+r+"</b>.",{mode:"range"});
},["The range measures spread: largest value minus smallest value.","Start by finding the largest and smallest values in the set."]);
E("u7-pk-outlier-find", 7, ["11.1"],1,"gen",function(){
  var base=ri(10,30);var cluster=[];for(var i=0;i<5;i++)cluster.push(base+ri(-3,4));
  var high=Math.random()<0.5;var out=high?base+ri(25,45):Math.max(base-ri(18,26),1);
  var vals=shuffle(cluster.concat([out]));
  var others=cluster.slice().sort(function(a,b){return a-b;});
  var cand=[others[4],others[0],Math.round(u7median(vals))];
  var seen={};seen[String(out)]=1;var ds=[];
  cand.forEach(function(v){if(!seen[String(v)]){seen[String(v)]=1;ds.push({t:String(v),fb:"That value sits inside the main cluster. An outlier lies far away from the rest of the data."});}});
  var k=1;while(ds.length<3){var v=out+k*7;k++;if(seen[String(v)])continue;seen[String(v)]=1;ds.push({t:String(v),fb:"That value is not even in the data set. Check each listed value against the cluster."});}
  return mcq("Data set: "+vals.join(", ")+". Which value is an outlier?",
    {t:String(out),fb:"Yes: "+out+" lies far from the cluster of values near "+base+"."},ds,
    "Most values cluster near "+base+", between "+Math.min.apply(null,cluster)+" and "+Math.max.apply(null,cluster)+". The value "+out+" lies far outside that cluster. The outlier is <b>"+out+"</b>.",{mode:"find"});
},["An outlier is a value far removed from the main cluster of data.","Start by picturing the values on a number line and looking for a gap."]);
E("u7-pk-two-event-pct", 7, ["12.2"],1,"gen",function(){
  var fam=pick(["coinspin","coinspin","coindie","twocoin","spindie","twospin","dicesum"]);
  var fav,total,desc;
  var opener=pick(["At a games table","In a class activity","During a board game","At the school fair","In a probability lesson"]);
  if(fam==="coinspin"){var s1=pick([3,4,5,6,8]);var k=ri(1,s1);var face=pick(["heads","tails"]);fav=1;total=2*s1;desc="a coin is tossed and a "+s1+"-section spinner is spun, and the outcome is "+face+" and section "+k;}
  else if(fam==="coindie"){var tg=pick([["heads and an even number",3],["tails and an odd number",3],["heads and a number greater than 4",2],["tails and a number less than 3",2],["heads and a 5",1],["tails and a 2",1]]);fav=tg[1];total=12;desc="a coin is tossed and a die is rolled, and the outcome is "+tg[0];}
  else if(fam==="twocoin"){var tg2=pick([["two heads",1],["two tails",1],["exactly one head",2],["at least one head",3]]);fav=tg2[1];total=4;desc="two coins are tossed, and the outcome is "+tg2[0];}
  else if(fam==="spindie"){var s2=pick([3,4,5,6]);var k2=ri(1,s2);var j=ri(1,6);fav=1;total=6*s2;desc="a "+s2+"-section spinner is spun and a die is rolled, and the outcome is section "+k2+" and a "+j;}
  else if(fam==="twospin"){var s3=pick([3,4,5]);var k3=ri(1,s3);fav=1;total=s3*s3;desc="a "+s3+"-section spinner is spun twice, and the outcome is section "+k3+" both times";}
  else {var t=ri(2,8);fav=t<=7?t-1:13-t;total=36;desc="two dice are rolled, and the outcome is a total of "+t;}
  var pct=fav/total*100;
  return numq(opener+", "+desc+". What is the theoretical probability of this outcome, as a percent?",
    Math.round(pct*100)/100,0.02,
    "The combined sample space has "+total+" equally likely outcomes, and "+fav+" of them match. \\[ \\begin{aligned} P &= "+FR(fav,total)+" \\\\ &= "+fmt(pct)+"\\% \\end{aligned} \\] The probability is <b>"+fmt(pct)+"%</b>.",
    {mode:"pct",total:total,fav:fav});
},["List the combined sample space size first: multiply the outcomes of each event.","Start by counting all combined outcomes, then the matching ones."]);
E("u7-pk-sample-space", 7, ["12.1"],1,"gen",function(){
  var mode=pick(["table","table","count","favcount"]);
  if(mode==="table"){
    var d=pick([3,4,5,6]);var useSpin=Math.random()<0.4;
    var colHead=useSpin?["A","B","C"]:["H","T"];var ncols=colHead.length;
    var rows=[];for(var r=1;r<=d;r++){var row=[String(r)];for(var c=0;c<ncols;c++)row.push(colHead[c]+r);rows.push(row);}
    var total=d*ncols;var ask=pick(["total","dienum","single"]);
    if(ask==="total"){
      var dsT=u7numOpts(total,[total+ncols,total-d,d+ncols]).map(function(v){return {t:String(v),fb:"Multiply the outcomes of one event by the outcomes of the other, or count every cell in the table."};});
      var qT=mcq("The table shows all outcomes when a "+(useSpin?"three-section spinner is spun":"coin is tossed")+" and a "+d+"-sided die is rolled. How many outcomes are in the sample space?",
        {t:String(total),fb:"Yes: "+d+" die results times "+ncols+" results from the other event gives "+total+"."},dsT,
        "Multiply the outcomes of each event: \\("+d+" \\times "+ncols+" = "+total+"\\). The sample space has <b>"+total+"</b> outcomes.",{mode:"table"});
      qT.figure=u7tableSVG("Die",colHead,rows);return qT;
    }
    if(ask==="dienum"){var target=ri(1,d);
      /* Option A fix (Nov 2026): this ask is worded for the coin, so force the coin table here regardless of the spinner draw; the spinner table stays in play for the total ask only. */
      var chead=["H","T"],cnc=2,ctot=d*2,crows=[];for(var cr=1;cr<=d;cr++){var crow=[String(cr)];for(var cc=0;cc<cnc;cc++)crow.push(chead[cc]+cr);crows.push(crow);}
      var dsD=u7numOpts(cnc,[cnc+1,ctot,d]).map(function(v){return {t:String(v),fb:"Find the row for that die number and count its cells, one for each result of the other event."};});
      var qD=mcq("The table shows all outcomes when a coin is tossed and a "+d+"-sided die is rolled. How many outcomes have die number "+target+"?",
        {t:String(cnc),fb:"Yes: die number "+target+" appears once with heads and once with tails."},dsD,
        "The row for die number "+target+" holds one cell for heads and one for tails. The answer is <b>"+cnc+"</b> outcomes.",{mode:"table"});
      qD.figure=u7tableSVG("Die",chead,crows);return qD;
    }
    var k=ri(1,d);var face=pick(["H","T"]);
    /* Option A fix (Nov 2026): as in the dienum branch above, force the coin table for this coin-worded ask. */
    var chead=["H","T"],cnc=2,ctot=d*2,crows=[];for(var cr=1;cr<=d;cr++){var crow=[String(cr)];for(var cc=0;cc<cnc;cc++)crow.push(chead[cc]+cr);crows.push(crow);}
    var dsS=u7numOpts(1,[2,d,ctot]).map(function(v){return {t:String(v),fb:"A single exact combination appears exactly once in a complete outcome table."};});
    var qS=mcq("The table shows all outcomes when a coin is tossed and a "+d+"-sided die is rolled. How many outcomes are exactly "+face+k+" (coin result "+face+", die number "+k+")?",
      {t:"1",fb:"Yes: that exact combination fills exactly one cell of the table."},dsS,
      "Each cell of the table is one exact combination, and "+face+k+" fills one cell. The answer is <b>1</b>.",{mode:"table"});
    qS.figure=u7tableSVG("Die",chead,crows);return qS;
  }
  var devA=[["coin",2],["three-section spinner",3],["four-section spinner",4],["five-section spinner",5],["six-sided die",6],["eight-sided die",8]];
  var devB=[["coin",2],["four-sided die",4],["six-section spinner",6],["eight-sided die",8],["three-section spinner",3],["four-sided die",4]];
  var A=pick(devA),B=pick(devB);var guard=0;while(A[1]*B[1]>36&&guard<20){B=pick(devB);guard++;}
  if(A[1]*B[1]>36){B=["four-sided die",4];}
  var tot=A[1]*B[1];
  if(mode==="favcount"){
    var dsF=u7numOpts(A[1],[B[1],tot,A[1]+B[1]]).map(function(v){return {t:String(v),fb:"Fix the named result for the second event; the first event can still show any of its outcomes."};});
    return mcq("A "+A[0]+" is used together with a "+B[0]+". In the combined sample space, how many outcomes show one specified result on the "+B[0]+" (with any result on the "+A[0]+")?",
      {t:String(A[1]),fb:"Yes: the second event is fixed, and the "+A[0]+" can show any of its "+A[1]+" outcomes."},dsF,
      "With the second event fixed at one result, the first event still has "+A[1]+" possible results. The answer is <b>"+A[1]+"</b> outcomes.",{mode:"favcount"});
  }
  var ds3=u7numOpts(tot,[A[1]+B[1],tot+4,Math.max(tot-2,2),tot*2]).map(function(v){return {t:String(v),fb:"For independent events, multiply the number of outcomes of each event."};});
  return mcq("A "+A[0]+" is used together with a "+B[0]+". How many outcomes are in the combined sample space?",
    {t:String(tot),fb:"Yes: "+A[1]+" outcomes times "+B[1]+" outcomes gives "+tot+"."},ds3,
    "The events are independent, so multiply: \\("+A[1]+" \\times "+B[1]+" = "+tot+"\\). The sample space has <b>"+tot+"</b> outcomes.",{mode:"count"});
},["For two independent events, multiply the outcome counts to size the sample space.","Start by counting the outcomes of each event on its own."]);
E("u7-pk-exp-vs-theor", 7, ["12.1"],1,"gen",function(){
  var trials=pick([20,40,50,100]);var theo=pick([["rolling a 6 on a die",1,6],["flipping heads",1,2],["landing on one section of a four-section spinner",1,4],["drawing a red marble from 3 red and 2 blue",3,5]]);
  var expected=theo[1]/theo[2]*trials;var obs=Math.max(1,Math.round(expected+ri(-4,4)));var guard=0;while(obs===expected&&guard<10){obs=Math.max(1,Math.round(expected+ri(-4,4)));guard++;}
  var expP=obs/trials;var mode=pick(["expfrac","compare"]);
  if(mode==="compare"){
    var larger=expP>theo[1]/theo[2]?"Experimental probability is larger":"Theoretical probability is larger";
    var other=larger.indexOf("Experimental")===0?"Theoretical probability is larger":"Experimental probability is larger";
    return mcq("In "+trials+" trials of "+theo[0]+", the outcome occurred "+obs+" times. Which statement compares the probabilities correctly?",
      {t:larger,fb:"Yes: the experimental value is "+u7fracStr(obs,trials)+" and the theoretical value is "+u7fracStr(theo[1],theo[2])+", and comparing them gives this result."},
      [{t:other,fb:"Compare the two values directly: experimental is "+obs+"/"+trials+", theoretical is "+theo[1]+"/"+theo[2]+"."},{t:"The two probabilities are exactly equal",fb:"The counts do not match the theoretical share exactly, so the probabilities differ."},{t:"The two cannot be compared directly",fb:"Both are fractions between 0 and 1, so they can be compared directly."}],
      "Experimental probability: \\("+FR(obs,trials)+"\\). Theoretical probability: \\("+FR(theo[1],theo[2])+"\\). Comparing the two, <b>"+larger.toLowerCase()+"</b>.",{mode:"compare"});
  }
  var cs=u7fracStr(obs,trials);
  var seen={};seen[cs]=1;var ds=[];
  [u7fracStr(theo[1],theo[2]),obs+"/"+trials,u7fracStr(trials-obs,trials)].forEach(function(a){if(!seen[a]&&ds.length<3){seen[a]=1;ds.push({t:"\\("+a+"\\)",fb:"Experimental probability uses the observed count over the number of trials, then simplifies."});}});
  var e=2;while(ds.length<3){var a2=u7fracStr(e,trials);if(!seen[a2]){seen[a2]=1;ds.push({t:"\\("+a2+"\\)",fb:"Experimental probability uses the observed count over the number of trials, then simplifies."});}e++;}
  return mcq("In "+trials+" trials of "+theo[0]+", the outcome occurred "+obs+" times. What is the experimental probability of the outcome?",
    {t:"\\("+cs+"\\)",fb:"Yes: "+obs+" successes out of "+trials+" trials simplifies to "+cs+"."},ds,
    "Experimental probability is successes over trials. \\(P = "+FR(obs,trials)+" = "+cs+"\\). The experimental probability is <b>\\("+cs+"\\)</b>.",{mode:"expfrac"});
},["Experimental probability comes from results: successes divided by trials.","Start by writing the observed count over the total number of trials."]);
E("u7-pk-expected-pct", 7, ["12.1"], 2, "gen", function(){
  var p=pick([10,15,20,25,30,40,50,60,75,80]), N=pick([120,160,200,240,300,400]);
  var ans=N*p/100;
  return numq("A spinner lands on red "+p+"% of the time in the long run. The spinner is spun "+N+" times. How many red results should be expected? Show your work.", ans, 0,
    "Change the percent to a fraction of the trials, then apply it to the number of spins. \\[ \\begin{aligned} \\text{expected reds} &= "+p+"\\% \\text{ of } "+N+" \\\\ &= "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {p:p,N:N});
}, ["An expected count applies the long-run percent to the actual number of trials.", "Start by finding what one percent of the trials is, or by writing the percent as a decimal."]);
E("u8-pk-translate", 8, ["10.13"],1,"gen",function(){
  var x=ri(-6,4),y=ri(-6,4);var dx=pick([-4,-3,-2,-1,1,2,3,4]);var dy=pick([-4,-3,-2,-1,1,2,3,4]);
  var nx=x+dx,ny=y+dy;var askX=Math.random()<0.5;
  var ans=askX?nx:ny;
  var q=numq("Point P "+u8pair(x,y)+" is translated "+u8moveText(dx,dy)+". What is the "+(askX?"x":"y")+"-coordinate of the image point?",
    ans,0,
    "Apply the translation to each coordinate. \\[ \\begin{aligned} \\text{image} &= ("+x+" + ("+dx+"), "+y+" + ("+dy+")) \\\\ &= "+u8pair(nx,ny)+" \\end{aligned} \\] The "+(askX?"x":"y")+"-coordinate is <b>"+ans+"</b>.",{mode:askX?"tx":"ty"}); q.figure=figWideGrid([{x:x,y:y,label:"P"}],null,null); return q;
},["A translation adds to the x-coordinate for left or right moves and to the y-coordinate for up or down moves.","Start by working out how the asked coordinate changes."]);
E("u8-pk-reflect-point", 8, ["10.13"],1,"gen",function(){
  var x=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);var y=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);
  var overX=Math.random()<0.5;var axis=overX?"x-axis":"y-axis";
  var img=overX?[x,-y]:[-x,y];var other=overX?[-x,y]:[x,-y];
  var correct=u8pair(img[0],img[1]);
  var raw=[u8pair(x,y),u8pair(other[0],other[1]),u8pair(-x,-y)];
  var ds=raw.map(function(t,i){return {t:t,fb:i===0?"That is the original point; a reflection moves it across the axis.":(i===1?"That is a reflection across the other axis; check which axis the question names.":"That flips both coordinates, which is a half-turn, not a single-axis reflection.")};});
  var q=mcq("Point P "+u8pair(x,y)+" is reflected across the "+axis+". What are the coordinates of the image?",
    {t:correct,fb:"Yes: reflection across the "+axis+" flips the sign of the "+(overX?"y":"x")+"-coordinate only."},ds,
    "Reflecting across the "+axis+" changes the sign of the "+(overX?"y":"x")+"-coordinate and leaves the other alone: "+u8pair(x,y)+" becomes <b>"+correct+"</b>.",{mode:overX?"rx":"ry"});
  q.figure=u8gridSVG([{x:x,y:y,label:"P"}],null,null);
  return q;
},["Reflection across the x-axis flips the y sign; across the y-axis flips the x sign.","Start by deciding which coordinate changes sign for the named axis."]);
E("u8-pk-transform-describe", 8, ["10.13"],1,"gen",function(){
  var type=pick(["translate","reflectX","reflectY"]);
  var px=pick([-4,-3,-2,-1,1,2,3,4]);var py=pick([-4,-3,-2,-1,1,2,3,4]);
  var qx=px+pick([-3,-2,2,3]);var qy=py+pick([-3,-2,2,3]);if(qx>5||qx<-5)qx=px-2;if(qy>5||qy<-5)qy=py-2;
  var P=[px,py],Q=[qx,qy],P2,Q2,correct;
  function transText(dx,dy){return "Translation: "+u8moveText(dx,dy);}
  var opts=[];
  if(type==="translate"){var dx=pick([-3,-2,-1,1,2,3]);var dy=pick([-3,-2,-1,1,2,3]);if(Math.abs(dx)===Math.abs(dy))dy=dy>0?dy+1:dy-1;
    P2=[px+dx,py+dy];Q2=[qx+dx,qy+dy];correct=transText(dx,dy);
    opts=[{t:transText(dy,dx),fb:"That swaps the horizontal and vertical changes; check the change in x first."},{t:"Reflection across the x-axis",fb:"A reflection would flip the sign of the y-coordinates; here both points shift by the same amounts instead."},{t:"Reflection across the y-axis",fb:"A reflection would flip the sign of the x-coordinates; here both points shift by the same amounts instead."}];
  } else if(type==="reflectX"){P2=[px,-py];Q2=[qx,-qy];correct="Reflection across the x-axis";
    opts=[{t:"Reflection across the y-axis",fb:"That would flip the x signs; here the y signs flipped and the x values stayed."},{t:transText(P2[0]-px,P2[1]-py),fb:"That translation fits point P alone, but it does not carry Q to its image; check both vertices."},{t:transText(Q2[0]-qx,Q2[1]-qy),fb:"That translation fits point Q alone, but it does not carry P to its image; check both vertices."}];
    if(opts[1].t===opts[2].t)opts[2]={t:transText(1,P2[1]-py),fb:"Check both vertices: a single translation must move every vertex by the same change."};
  } else {P2=[-px,py];Q2=[-qx,qy];correct="Reflection across the y-axis";
    opts=[{t:"Reflection across the x-axis",fb:"That would flip the y signs; here the x signs flipped and the y values stayed."},{t:transText(P2[0]-px,P2[1]-py),fb:"That translation fits point P alone, but it does not carry Q to its image; check both vertices."},{t:transText(Q2[0]-qx,Q2[1]-qy),fb:"That translation fits point Q alone, but it does not carry P to its image; check both vertices."}];
    if(opts[1].t===opts[2].t)opts[2]={t:transText(P2[0]-px,1),fb:"Check both vertices: a single translation must move every vertex by the same change."};
  }
  var seen={};seen[correct]=1;var ds=[];
  opts.forEach(function(o){if(!seen[o.t]){seen[o.t]=1;ds.push(o);}});
  var filler=type==="translate"?"Reflection across the origin":"Translation: "+u8moveText(1,1);
  while(ds.length<3){if(!seen[filler]){seen[filler]=1;ds.push({t:filler,fb:"Test the description on both vertices; it must carry each one to its image."});}else filler="Translation: "+u8moveText(2,1);}
  var q=mcq("A two-vertex design has vertices P "+u8pair(P[0],P[1])+" and Q "+u8pair(Q[0],Q[1])+". After a transformation, the images are P' "+u8pair(P2[0],P2[1])+" and Q' "+u8pair(Q2[0],Q2[1])+". Which transformation describes the change?",
    {t:correct,fb:"Yes: applying it to both P and Q gives exactly the image vertices."},ds,
    "Test each vertex. P "+u8pair(P[0],P[1])+" goes to "+u8pair(P2[0],P2[1])+" and Q "+u8pair(Q[0],Q[1])+" goes to "+u8pair(Q2[0],Q2[1])+", which matches: <b>"+correct+"</b>.",{mode:type}); q.figure=figWideGrid([{x:P[0],y:P[1],label:"P"},{x:Q[0],y:Q[1],label:"Q"},{x:P2[0],y:P2[1],label:"P'"},{x:Q2[0],y:Q2[1],label:"Q'"}],[[P,Q],[P2,Q2]],null); return q;
},["Test a description on every vertex, not just one: a transformation must fit them all.","Start by comparing the first vertex with its image, then confirm with the second."]);
E("u8-pk-rotate", 8, ["10.13"], 2, "gen", function(){
  var x=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]), y=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]);
  var cw=Math.random()<0.5;
  var step1=cw?[y,-x]:[-y,x], step2=[-x,-y];
  var askX=Math.random()<0.5, ans=askX?step2[0]:step2[1];
  var dirTxt=cw?"clockwise":"counterclockwise";
  var q=numq("Point P "+u8pair(x,y)+" is rotated 90 degrees "+dirTxt+" about the origin, and the image is then rotated another 90 degrees "+dirTxt+" about the origin. What is the "+(askX?"x":"y")+"-coordinate of the final image? Show your work.", ans, 0,
    "Apply the quarter-turn rule twice, updating the point after each turn. \\[ \\begin{aligned} \\text{start} &= "+u8pair(x,y)+" \\\\ \\text{after one turn} &= "+u8pair(step1[0],step1[1])+" \\\\ \\text{after two turns} &= "+u8pair(step2[0],step2[1])+" \\end{aligned} \\] The "+(askX?"x":"y")+"-coordinate is <b>"+ans+"</b>.",
    {x:x,y:y}); q.figure=figWideGrid([{x:x,y:y,label:"P"}],null,null); return q;
}, ["Apply the rotation one quarter turn at a time, updating the coordinates after each turn.", "Start by applying the first 90 degree turn to the original point."]);
E("u8-pk-angle-chain", 8, ["10.4"], 2, "gen", function(){
  var B=0,C=0,D=0,third=0,g=0;
  while(g++<200){ B=ri(35,120); C=180-B; D=ri(15,60); third=180-C-D; if(third>=10) break; }
  var q=numq("Angle P sits on a straight line with an angle of "+B+" degrees, so angle P and the "+B+" degree angle are supplementary. Angle P is one angle of a triangle whose second angle is "+D+" degrees. Find the third angle of the triangle, in degrees. Show your work.", third, 0,
    "Find angle P from the straight line first, then use the triangle angle sum. \\[ \\begin{aligned} P &= 180 - "+B+" = "+C+" \\\\ \\text{third angle} &= 180 - "+C+" - "+D+" = "+third+" \\end{aligned} \\] The answer is <b>"+third+"</b>.",
    {B:B,D:D}); q.figure=triAngSVG(C,D,third,{L:["","",""],ang:["P",D+"°","?"]}); return q;
}, ["Two angle facts are chained here: use the straight-line fact first, then feed its result into the triangle.", "Start by finding the supplementary angle on the straight line."]);
E("u8-pk-protractor-read", 8, ["10.8"], 1, "gen", function(){
  var A=pick([20,40,50,70,80,100,110,130,140,160]);
  var cx=170, cy=165, R=125;
  function pt(r,deg){ var t=deg*Math.PI/180; return [cx+r*Math.cos(t), cy-r*Math.sin(t)]; }
  var fig='<svg viewBox="0 0 340 190" width="340" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Angle shown on a protractor scale">';
  for(var dgr=0; dgr<=180; dgr+=10){ var big=(dgr%30===0); var p1=pt(R-((big)?14:8),dgr), p2=pt(R,dgr);
    fig+='<line x1="'+fmt(p1[0],1)+'" y1="'+fmt(p1[1],1)+'" x2="'+fmt(p2[0],1)+'" y2="'+fmt(p2[1],1)+'" stroke="'+FIG_INK+'" stroke-width="'+(big?1.8:1)+'"/>';
    if(big){ var pl=pt(R-30,dgr); fig+=_txt(pl[0],pl[1]+4,String(dgr),11,false,"middle"); } }
  var arc=[]; for(var a2=0;a2<=180;a2+=5){ var pa=pt(R,a2); arc.push(fmt(pa[0],1)+","+fmt(pa[1],1)); }
  fig+='<polyline points="'+arc.join(" ")+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  var pb=pt(R+8,0), pr=pt(R+8,A);
  fig+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(pb[0],1)+'" y2="'+fmt(pb[1],1)+'" stroke="'+FIG_INK+'" stroke-width="2.4"/>';
  fig+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(pr[0],1)+'" y2="'+fmt(pr[1],1)+'" stroke="'+FIG_INK+'" stroke-width="2.4"/>';
  fig+='<circle cx="'+cx+'" cy="'+cy+'" r="3.5" fill="'+FIG_INK+'"/>';
  fig+='</svg>';
  var wrong=180-A;
  var ds=[{t:String(wrong), fb:"That reads the scale that starts at 0 on the left. The baseline ray points right, so read the scale that starts at 0 on the right."},
          {t:String(A-10), fb:"That is one numbered mark too few: the ray crosses the scale at a numbered tick, not between ticks."},
          {t:String(A+10), fb:"That is one numbered mark too many: check exactly which tick the ray crosses."}];
  var q=mcq("The diagram shows an angle placed on a protractor, with one ray along the baseline to the right. What is the measure of the angle, in degrees?",
    {t:String(A), fb:"Yes: starting from the 0 on the right, the second ray crosses the scale at "+A+"."},
    ds,
    "Place the centre of the protractor on the vertex and line the baseline ray up with 0. Reading from that 0, the second ray crosses the scale at "+A+". The angle measures <b>"+A+" degrees</b>.",
    {A:A});
  q.figure=fig;
  return q;
}, ["Find the 0 that the baseline ray points to, and read the scale that starts there.", "Start by checking whether the angle is acute or obtuse, then read the matching scale."]);
E("u8-pk-triangle-third-angle", 8, ["10.4"], 1, "gen", function(){
  var a=ri(25,80), b=ri(25,80), g=0;
  while(a+b>150&&g++<200){ a=ri(25,80); b=ri(25,80); }
  var c=180-a-b;
  return numq("Two angles of a triangle measure "+a+" degrees and "+b+" degrees. What is the measure of the third angle, in degrees? Show your work.", c, 0,
    "The interior angles of every triangle add to 180 degrees: cutting the corners off a paper triangle and joining them at a point forms a straight angle. \\[ \\begin{aligned} \\text{third angle} &= 180 - "+a+" - "+b+" \\\\ &= "+c+" \\end{aligned} \\] The answer is <b>"+c+" degrees</b>.",
    {a:a,b:b});
}, ["The three interior angles of a triangle always add to the same total.", "Start by adding the two given angles, then subtract from the triangle total."]);
E("u8-pk-quadrilateral-angle", 8, ["10.4"], 2, "gen", function(){
  var a=ri(50,130), b=ri(50,130), c=ri(50,130), g=0;
  while((a+b+c>320||360-(a+b+c)<30)&&g++<300){ a=ri(50,130); b=ri(50,130); c=ri(50,130); }
  var fourth=360-(a+b+c);
  return numq("Three angles of a quadrilateral measure "+a+" degrees, "+b+" degrees and "+c+" degrees. What is the measure of the fourth angle, in degrees? Show your work.", fourth, 0,
    "The interior angles of every quadrilateral add to 360 degrees: joining the four corners at a point forms a full circle. \\[ \\begin{aligned} \\text{fourth angle} &= 360 - "+a+" - "+b+" - "+c+" \\\\ &= "+fourth+" \\end{aligned} \\] The answer is <b>"+fourth+" degrees</b>.",
    {a:a,b:b,c:c});
}, ["The four interior angles of a quadrilateral always add to the same total.", "Start by adding the three given angles, then subtract from the quadrilateral total."]);

var PK8_FOR_C1=["3.19","3.20","5.1","5.2","5.3"];
var PK8_FOR_C2=["9.1","9.2","9.12","9.13","9.14"];
var PK8_FOR_C3=["6.17","6.18","6.19","6.20","6.21","6.22","6.23","6.24","6.25","6.26","6.27"];
var PK8_FOR_C3OOO=["6.27"];
var PK8_FOR_C4=["6.4","6.5","6.6","6.7","6.8","6.9","6.10","6.11","6.12","6.13","6.14","6.15","6.16"];
var PK8_FOR_C5=["10.1","10.11","10.2","10.12","10.3","9.3","9.4","9.5","9.6","9.7","9.8","9.9","9.10","9.11"];
var PK8_FOR_C6=["9.3","9.4","9.5","9.6","9.7","9.8","9.9","9.10","9.11"];
var PK8_FOR_C7=["3.6","3.7","3.13","3.14","3.15","3.16","3.17","3.18","6.1","6.2","6.3"];
var PK8_FOR_C8=["3.8","3.9","3.10","3.11","6.28","6.29"];
var PK8_FOR_C9=["8.1","8.2","8.3","8.4","8.5","8.6","8.7"];
var PK8_FOR_C10=["7.1","7.2","7.3","7.4"];
var PK8_FOR_C10SUB=["7.1","7.2","7.3","7.4","8.5"];
var PK8_FOR_C11=["11.1","11.2","11.3","11.4","11.5","11.6"];
var PK8_FOR_C12=["12.1","12.2","12.3","12.4"];
var PK8_FOR_C13=["10.15","10.9","10.10","10.16","10.17","10.18","10.4","10.5","10.6","10.7","10.8","10.13","10.14"];
var PKT8={
  "u1-pk-divisible-by":{src:"Math 7 indicator 5.1",group:"factors-multiples",for:PK8_FOR_C1},
  "u1-pk-divisibility-why":{src:"Math 7 indicator 5.1",group:"factors-multiples",for:PK8_FOR_C1},
  "u1-pk-factor-list":{src:"Math 7 indicator 5.4",group:"factors-multiples",for:PK8_FOR_C1},
  "u1-pk-factors-count":{src:"Math 7 indicator 5.4",group:"factors-multiples",for:PK8_FOR_C1},
  "u1-pk-carroll-cell":{src:"Math 7 indicators 5.1 and 5.2",group:"factors-multiples",for:PK8_FOR_C1},
  "u1-pk-square-area":{src:"Mathematics 6 outcomes MA6.9.6 and MA6.9.7 (authored for this tranche; no banked source exists)",group:"area",for:PK8_FOR_C2},
  "u2-pk-add-basic":{src:"Math 7 indicator 6.25",group:"integer-operations",for:PK8_FOR_C3},
  "u2-pk-sub-basic":{src:"Math 7 indicator 6.27",group:"integer-operations",for:PK8_FOR_C3},
  "u2-pk-add-context":{src:"Math 7 indicators 6.25 and 6.29",group:"integer-operations",for:PK8_FOR_C3},
  "u2-pk-mixed-chain":{src:"Math 7 indicators 6.25, 6.27 and 6.29",group:"integer-operations",for:PK8_FOR_C3},
  "u2-pk-missing-start":{src:"Math 7 indicators 6.25 and 6.29",group:"integer-operations",for:PK8_FOR_C3},
  "u2-pk-order-ops-dec":{src:"Math 7 indicator 6.10",group:"integer-operations",for:PK8_FOR_C3OOO},
  "u3-pk-add-unlike":{src:"Math 7 indicators 6.16 and 6.17",group:"fraction-operations",for:PK8_FOR_C4},
  "u3-pk-sub-unlike":{src:"Math 7 indicators 6.16 and 6.19",group:"fraction-operations",for:PK8_FOR_C4},
  "u3-pk-add-mixed":{src:"Math 7 indicators 6.20 and 6.21",group:"fraction-operations",for:PK8_FOR_C4},
  "u3-pk-sub-mixed":{src:"Math 7 indicators 6.20 and 6.21",group:"fraction-operations",for:PK8_FOR_C4},
  "u3-pk-simplify-fraction":{src:"Math 7 indicator 6.15",group:"equivalent-fractions",for:PK8_FOR_C4},
  "u3-pk-common-denominator":{src:"Math 7 indicator 6.16",group:"equivalent-fractions",for:PK8_FOR_C4},
  "u3-pk-problem-add":{src:"Math 7 indicators 6.17 and 6.23",group:"fraction-operations",for:PK8_FOR_C4},
  "u4-pk-area-triangle":{src:"Math 7 indicators 9.3 and 9.5",group:"area",for:PK8_FOR_C5},
  "u4-pk-area-parallelogram":{src:"Math 7 indicators 9.2 and 9.3",group:"area",for:PK8_FOR_C5},
  "u4-pk-area-mix":{src:"Math 7 indicator 9.3",group:"area",for:PK8_FOR_C5},
  "u4-pk-area-circle":{src:"Math 7 indicators 9.3 and 9.9",group:"area",for:PK8_FOR_C5},
  "u4-pk-area-diameter":{src:"Math 7 indicators 9.9 and 9.11",group:"area",for:PK8_FOR_C5},
  "u4-pk-add-sub-decimals":{src:"Math 7 indicators 6.5 and 6.6",group:"decimal-operations",for:PK8_FOR_C6},
  "u4-pk-mult-decimals":{src:"Math 7 indicator 6.7",group:"decimal-operations",for:PK8_FOR_C6},
  "u5-pk-percent-convert":{src:"Math 7 indicator 3.7",group:"percent-of-amount",for:PK8_FOR_C7},
  "u5-pk-percent-of":{src:"Math 7 indicators 3.7 and 6.11",group:"percent-of-amount",for:PK8_FOR_C7},
  "u5-pk-discount-total":{src:"Math 7 indicators 6.11 and 6.12",group:"percent-of-amount",for:PK8_FOR_C7},
  "u5-pk-simplify-fraction":{src:"Math 7 indicator 6.15",group:"equivalent-fractions",for:PK8_FOR_C7},
  "u5-pk-simplify-solution":{src:"Math 7 indicators 6.15 and 6.22",group:"equivalent-fractions",for:PK8_FOR_C7},
  "u5-pk-frac-to-decimal":{src:"Math 7 indicator 3.11",group:"rate",for:PK8_FOR_C8},
  "u5-pk-div-decimals":{src:"Math 7 indicator 6.8",group:"rate",for:PK8_FOR_C8},
  "u6-pk-inspection-trial":{src:"Math 7 indicator 8.14",group:"linear-equations",for:PK8_FOR_C9},
  "u6-pk-solve-two-step":{src:"Math 7 indicator 8.14",group:"linear-equations",for:PK8_FOR_C9},
  "u6-pk-solve-other-forms":{src:"Math 7 indicator 8.14",group:"linear-equations",for:PK8_FOR_C9},
  "u6-pk-verify-two-step":{src:"Math 7 indicators 8.16 and 8.17",group:"linear-equations",for:PK8_FOR_C9},
  "u6-pk-table-missing":{src:"Math 7 indicator 7.9",group:"tables-and-graphs",for:PK8_FOR_C10},
  "u6-pk-graph-relation":{src:"Math 7 indicators 7.5 and 7.10",group:"tables-and-graphs",for:PK8_FOR_C10},
  "u6-pk-read-point":{src:"Math 7 indicator 10.7",group:"tables-and-graphs",for:PK8_FOR_C10},
  "u6-pk-evaluate-expression":{src:"Math 7 indicator 7.8",group:"substitution",for:PK8_FOR_C10SUB},
  "u7-pk-graph-quantities":{src:"Math 7 indicators 11.4 and 11.5",group:"graphing-data",for:PK8_FOR_C11},
  "u7-pk-range-basic":{src:"Math 7 indicator 11.7",group:"centre-measures",for:PK8_FOR_C11},
  "u7-pk-outlier-find":{src:"Math 7 indicator 11.10",group:"centre-measures",for:PK8_FOR_C11},
  "u7-pk-two-event-pct":{src:"Math 7 indicators 12.4, 12.5 and 12.7",group:"probability-forms",for:PK8_FOR_C12},
  "u7-pk-sample-space":{src:"Math 7 indicators 12.3 and 12.4",group:"probability-forms",for:PK8_FOR_C12},
  "u7-pk-exp-vs-theor":{src:"Math 7 indicator 12.6",group:"probability-forms",for:PK8_FOR_C12},
  "u7-pk-expected-pct":{src:"Math 7 indicators 12.6 and 12.7",group:"expected-count",for:PK8_FOR_C12},
  "u8-pk-translate":{src:"Math 7 indicator 10.20",group:"transformations",for:PK8_FOR_C13},
  "u8-pk-reflect-point":{src:"Math 7 indicators 10.12 and 10.20",group:"transformations",for:PK8_FOR_C13},
  "u8-pk-transform-describe":{src:"Math 7 indicator 10.11",group:"transformations",for:PK8_FOR_C13},
  "u8-pk-rotate":{src:"Math 7 indicators 10.12 and 10.20",group:"transformations",for:PK8_FOR_C13},
  "u8-pk-angle-chain":{src:"Math 7 indicator 10.1",group:"triangle-angles",for:PK8_FOR_C13},
  "u8-pk-protractor-read":{src:"Mathematics 6 outcome MA6.9.13 (authored for this tranche; no banked source exists)",group:"instrument-reading",for:PK8_FOR_C13},
  "u8-pk-triangle-third-angle":{src:"Mathematics 6 outcome MA6.9.15 (authored for this tranche; no banked source exists)",group:"triangle-angles",for:PK8_FOR_C13},
  "u8-pk-quadrilateral-angle":{src:"Mathematics 6 outcome MA6.9.16 (authored for this tranche; no banked source exists)",group:"polygon-angles",for:PK8_FOR_C13},
  "u7-missing-mean-value-gap":{src:"Math 7 indicators 11.6 and 11.9",group:"centre-measures",for:PK8_FOR_C11},
  "u7-mean-difference-gap":{src:"Math 7 indicators 11.6 and 11.9",group:"centre-measures",for:PK8_FOR_C11},
  "u7-combined-mean-gap":{src:"Math 7 indicators 11.6 and 11.9",group:"centre-measures",for:PK8_FOR_C11}
};
BANK.forEach(function(e){var t=PKT8[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=t.for.slice();e.pkGroup=t.group;}});
