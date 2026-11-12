// Math 1202 Unit 2 Measuring Length question bank
// Figures (added Nov 2026): the perimeter, circumference and
// shipping size constructed response entries draw labelled figures
// from each question's own values. Conversions, referents,
// estimates, reasonableness and error spotting entries stay
// figureless: they name no single measured shape.
// Cut verbatim from the standalone bank source
// (math-1202-review/bank-src.js, lines 1004 to 1485).
// CRMARKS: u2-cr-perim=2
// CRMARKS: u2-cr-circ=2
// CRMARKS: u2-cr-mid=2
// CRMARKS: u2-cr-ship=3
// CRMARKS: u2-cr-formula-manip=3
// CRMARKS: u2-cr-convert=3
// CRMARKS: u2-cr-estimate=2
// CRMARKS: u2-cr-error=3
/* ===== Unit 2 ===== */
// Unit 2 Measuring Length, Mathematics 1202 Review. Helpers prefixed u2.
function u2Dist(correct, wrongs, unit, fbC, fbW){
  /* Rule 9 (Nov 8, 2026): the unit lives in the prompt at every call site, so
     options carry bare values; balDpStrs then pairs their precision (Rule 7).
     The unit parameter is retained for call-site compatibility. */
  var seen={}; seen[correct]=1; var out=[];
  for(var i=0;i<wrongs.length && out.length<3;i++){ var w=wrongs[i]; if(w>0 && !seen[w]){ seen[w]=1; out.push({t:fmt(w), fb:fbW(out.length)}); } }
  var k=2; while(out.length<3){ var cand=correct*k+1; if(!seen[cand]){ seen[cand]=1; out.push({t:fmt(cand), fb:"Check the conversion factor and the direction of the conversion."}); } k++; }
  var strs=balDpStrs([fmt(correct)].concat(out.map(function(o){ return o.t; })));
  return {c:{t:strs[0], fb:fbC}, d:out.map(function(o,i){ var n={}; for(var key in o) n[key]=o[key]; n.t=strs[i+1]; return n; })};
}
function u2RulerFig(inches){
  var scale=22, x0=30, len=inches*scale, W=Math.ceil(x0+len+30), s='<svg viewBox="0 0 '+W+' 110" width="'+W+'" height="110" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ruler with an object ending at a marked length">';
  s+='<rect x="'+x0+'" y="30" width="'+fmt(len,1)+'" height="26" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
  s+='<rect x="'+x0+'" y="62" width="'+fmt(8*scale,1)+'" height="20" fill="none" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
  for(var i=0;i<=64;i++){ var x=x0+i*(scale/8); var h=(i%8===0)?14:(i%4===0?10:6); s+='<line x1="'+fmt(x,1)+'" y1="82" x2="'+fmt(x,1)+'" y2="'+fmt(82-h,1)+'" stroke="'+FIG_INK+'" stroke-width="1"/>'; if(i%8===0){ s+='<text x="'+fmt(x,1)+'" y="98" font-size="10" fill="'+FIG_INK+'" text-anchor="middle">'+(i/8)+'</text>'; } }
  s+='<text x="'+fmt(x0+len/2,1)+'" y="20" font-size="11" fill="'+FIG_INK+'" text-anchor="middle">object</text></svg>';
  return s;
}
function u2CirclesFig(od, idd){
  var s='<svg viewBox="0 0 240 170" width="240" height="170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pipe end showing outside and inside diameters">';
  s+='<circle cx="120" cy="80" r="62" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<circle cx="120" cy="80" r="'+fmt(62*idd/od,1)+'" fill="#ffffff" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="58" y1="80" x2="182" y2="80" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5 4"/>';
  s+='<text x="120" y="18" font-size="11" fill="'+FIG_INK+'" text-anchor="middle">outside diameter '+fmt(od)+' cm</text>';
  s+='<text x="120" y="160" font-size="11" fill="'+FIG_INK+'" text-anchor="middle">wall thickness shown by the shaded ring</text></svg>';
  return s;
}
function u2RectFig(L,Wd){
  var s='<svg viewBox="0 0 260 170" width="260" height="170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rectangle with labelled length and width">';
  s+='<rect x="45" y="35" width="170" height="95" fill="'+FIG_SHADE+'" fill-opacity="0.4" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<text x="130" y="22" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">'+fmt(L)+' m</text>';
  s+='<text x="232" y="86" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">'+fmt(Wd)+' m</text></svg>';
  return s;
}

E("u2-si-convert", 2, ["3.7"], 1, "gen", function(){
  var modes=[
    {f:"mm",t:"cm",k:0.1},{f:"cm",t:"m",k:0.01},{f:"m",t:"km",k:0.001},{f:"cm",t:"mm",k:10},{f:"m",t:"cm",k:100},{f:"km",t:"m",k:1000}
  ];
  var ctx=pick(["A shelf board","A ribbon for a gift box","A hallway in a school","A garden hose","A walking trail","A piece of trim"]);
  var m=pick(modes); var v=ri(3,480); if(m.k<1 && v<20) v=v+40;
  var ans=Math.round(v*m.k*1000)/1000;
  var dd=u2Dist(ans,[ans*10,ans/10,ans+ (m.k>=1?10:-ans/2)], m.t, "Correct: each step on the SI ladder moves the decimal point by the power of ten for that step.", function(i){ return ["That moves the decimal point the wrong way or by the wrong number of places.","That uses the wrong power of ten for this step on the ladder.","That changes the value instead of only changing the unit."][i]; });
  return mcq(ctx+" measures \\("+fmt(v)+"\\ \\text{"+m.f+"}\\). Write this length in "+m.t+".",
    dd.c, dd.d,
    "SI units are based on powers of ten. \\[ "+fmt(v)+"\\ \\text{"+m.f+"} \\times "+fmt(m.k)+" = "+fmt(ans)+"\\ \\text{"+m.t+"} \\] The length is <b>"+fmt(ans)+" "+m.t+"</b>.",
    {mode:m.f+"-"+m.t, v:v});
}, ["Use the SI ladder: each step is a power of ten.", "Decide whether the new unit is larger or smaller, then move the decimal point the right number of places."]);

E("u2-imp-convert", 2, ["3.14"], 1, "gen", function(){
  var modes=[{f:"in",t:"ft",k:1/12,lab:"12 in = 1 ft"},{f:"ft",t:"in",k:12,lab:"1 ft = 12 in"},{f:"ft",t:"yd",k:1/3,lab:"3 ft = 1 yd"},{f:"yd",t:"ft",k:3,lab:"1 yd = 3 ft"},{f:"yd",t:"mi",k:1/1760,lab:"1760 yd = 1 mi"}];
  var ctx=pick(["A carpenter","A quilter","A landscaper","A delivery driver","A stage builder"]);
  var m=pick(modes); var v;
  if(m.f==="yd"&&m.t==="mi") v=pick([880,1760,2640,3520,5280]); else if(m.k===1/12) v=ri(2,20)*12; else if(m.k===1/3) v=ri(2,30)*3; else v=ri(2,40);
  var ans=Math.round(v*m.k*100)/100;
  var dd=u2Dist(ans,[ans*2,ans/2,ans+ (m.k>=1?12:1)], m.t, "Correct: "+m.lab+", applied in the right direction.", function(i){ return ["That uses the wrong conversion factor for these units.","That divides where the conversion calls for the reverse operation, or the reverse.","That adds a number instead of multiplying or dividing by the conversion factor."][i]; });
  return mcq(ctx+" has a length of \\("+fmt(v)+"\\ \\text{"+m.f+"}\\). Write this length in "+m.t+".",
    dd.c, dd.d,
    "Use the relation "+m.lab+". \\[ "+fmt(v)+"\\ \\text{"+m.f+"} \\times "+fmt(m.k)+" = "+fmt(ans)+"\\ \\text{"+m.t+"} \\] The length is <b>"+fmt(ans)+" "+m.t+"</b>.",
    {mode:m.f+"-"+m.t, v:v});
}, ["Recall the imperial relation between the two units.", "Multiply or divide by that relation so the old unit cancels out."]);

E("u2-referent", 2, ["3.17"], 1, "gen", function(){
  var items=[
    {u:"1 centimetre", good:"the width of a fingernail", bad:["the height of a doorway","the length of a school bus","the width of a football field"], why:"A fingernail is about a centimetre wide."},
    {u:"1 metre", good:"the height of a kitchen counter, roughly", bad:["the thickness of a coin in your pocket","the length of a new pencil on a desk","the height of a two storey house nearby"], why:"A counter top sits about a metre above the floor."},
    {u:"1 inch", good:"the width of a thumb at the nail", bad:["the length of a forearm, roughly","the height of a door knob, roughly","the width of a sheet of paper"], why:"A thumb width is a common inch referent."},
    {u:"1 foot", good:"the length of a standard ruler", bad:["the width of a wide hand span","the height of a tall coffee mug","the length of a parked car"], why:"A standard ruler is 12 inches, which is 1 foot."},
    {u:"1 yard", good:"the height of a door knob from the floor, roughly", bad:["the length of a shoelace tip on a winter boot","the width of a doorway step at the front door","the length of a hockey rink in a small town"], why:"A door knob sits about a yard above the floor."},
    {u:"1 kilometre", good:"about a 10 minute walk", bad:["the length of a city bus","about a 1 minute walk","the distance across a classroom"], why:"Walking a kilometre takes roughly 10 minutes."},
    {u:"1 millimetre", good:"the thickness of a dime", bad:["the width of a fingernail","the length of an ant, roughly","the thickness of a textbook"], why:"A dime is about a millimetre thick."}
  ];
  var it=pick(items);
  var frame=pick(["Which referent best matches ","For a quick estimate, which referent best matches ","A student needs a referent. Which one best matches ","In a workshop, which referent best matches ","For measuring at home, which referent best matches ","Which familiar object is the best referent for ","A camper wants a referent. Which one best matches ","Which referent should a student picture for "]);
  var ds=it.bad.map(function(b){ return {t:b, fb:"That object is far from "+it.u+" in size, so it would mislead an estimate."}; });
  return mcq(frame+it.u+"? A referent is a familiar object used to judge a measure.",
    {t:it.good, fb:"Yes. "+it.why}, ds,
    it.why+" So the best referent for "+it.u+" is <b>"+it.good+"</b>.",
    {unit:it.u});
}, ["Picture each object and compare its size with the unit.", "Rule out objects that are clearly much larger or much smaller first."]);

E("u2-approx-si", 2, ["3.5"], 1, "gen", function(){
  var modes=[
    {f:"inches", per:2.5, t:"cm", lab:"1 inch is about 2.5 cm"},
    {f:"feet", per:30, t:"cm", lab:"1 foot is about 30 cm"},
    {f:"yards", per:0.9, t:"m", lab:"1 yard is about 0.9 m"},
    {f:"miles", per:1.6, t:"km", lab:"1 mile is about 1.6 km"}
  ];
  var ctx=pick(["A board is","A trail section is","A ribbon is","A room is","A fence run is"]);
  var m=pick(modes); var v=ri(2,40); var ans=Math.round(v*m.per*10)/10;
  var dd=u2Dist(ans,[ans*2,Math.round(ans/2*10)/10,v], m.t, "Correct: "+m.lab+", so multiply to get a close SI value.", function(i){ return ["That doubles the estimate instead of using the stated approximate equivalent.","That halves the estimate instead of using the stated approximate equivalent.","That keeps the same number and only changes the unit name, which cannot be right when the units differ in size."][i]; });
  return mcq(ctx+" \\("+v+"\\ \\text{"+m.f+"}\\) long. Using "+m.lab+", which is the best approximate length in "+m.t+"?",
    dd.c, dd.d,
    "This is an estimate, so use the given approximate equivalent. \\[ "+v+" \\times "+fmt(m.per)+" = "+fmt(ans)+" \\] The length is about <b>"+fmt(ans)+" "+m.t+"</b>.",
    {mode:m.f, v:v});
}, ["Use the approximate equivalent given in the question.", "Multiply the imperial measure by the per unit SI value."]);

E("u2-approx-imp", 2, ["3.12"], 1, "gen", function(){
  var modes=[
    {f:"cm", per:0.4, t:"inches", lab:"1 cm is about 0.4 inches", inv:"2.5 cm is about 1 inch"},
    {f:"m", per:1.1, t:"yards", lab:"1 m is about 1.1 yards", inv:"1 m is a little more than 1 yard"},
    {f:"km", per:0.6, t:"miles", lab:"1 km is about 0.6 miles", inv:"1 km is a little over half a mile"},
    {f:"m", per:3.3, t:"feet", lab:"1 m is about 3.3 feet", inv:"1 m is a little over 3 feet"}
  ];
  var ctx=pick(["A counter is","A path is","A shelf is","A banner is","A garden bed is"]);
  var m=pick(modes); var v=ri(2,30); var ans=Math.round(v*m.per*10)/10;
  var dd=u2Dist(ans,[ans*2,Math.round(ans/2*10)/10,v], m.t, "Correct: "+m.lab+" ("+m.inv+").", function(i){ return ["That doubles the estimate instead of using the stated approximate equivalent.","That halves the estimate instead of using the stated approximate equivalent.","That keeps the same number and only changes the unit name."][i]; });
  return mcq(ctx+" \\("+v+"\\ \\text{"+m.f+"}\\) long. Using "+m.lab+", which is the best approximate length in "+m.t+"?",
    dd.c, dd.d,
    "Use the given approximate equivalent for an estimate. \\[ "+v+" \\times "+fmt(m.per)+" = "+fmt(ans)+" \\] The length is about <b>"+fmt(ans)+" "+m.t+"</b>.",
    {mode:m.f, v:v});
}, ["Use the approximate equivalent given in the question.", "Multiply the SI measure by the per unit imperial value."]);

E("u2-frac-divide", 2, ["3.15"], 2, "gen", function(){
  var jobs=[
    {thing:"ribbon", unit:"m", piece:"bow"},
    {thing:"board", unit:"ft", piece:"shelf"},
    {thing:"trim", unit:"m", piece:"doorway section"},
    {thing:"pipe", unit:"m", piece:"section"},
    {thing:"cord", unit:"ft", piece:"hanger loop"},
    {thing:"tape strip", unit:"m", piece:"label"}
  ];
  var job=pick(jobs);
  var fw=ri(1,9), fn=pick([1,1,2,3]), fd=pick([2,3,4]);
  if(fn>=fd){ fn=1; fd=2; }
  var pn=pick([1,1,2]), pd=pick([3,4,2]);
  if(pn>=pd){ pn=1; pd=3; }
  var whole=fw+fn/fd, piece=pn/pd;
  var n=Math.round((whole/piece)*100)/100;
  var totalTxt=fw+" "+FR(fn,fd), pieceTxt=(pn===pd?"1":FR(pn,pd));
  var ds=[
    {t:"Adding the two fractional lengths together to get one single longer length", fb:"Adding finds a total length, not how many pieces fit."},
    {t:"Multiplying the two fractional lengths together to get one single larger amount", fb:"Multiplying lengths gives an area type result, not a count of pieces."},
    {t:"Subtracting the smaller length from the larger length once to find what remains", fb:"One subtraction leaves a remainder length, not the number of pieces."}
  ];
  return mcq("A "+job.thing+" is \\("+totalTxt+"\\ \\text{"+job.unit+"}\\) long. Each "+job.piece+" uses \\("+pieceTxt+"\\ \\text{"+job.unit+"}\\). A worker asks how many pieces can be made. Which situation is this?",
    {t:"A fractional length divided by a fraction: how many small pieces fit in the whole", fb:"Yes: the question asks how many of the smaller fractional measure fit into the larger one, which is division."}, ds,
    "Ask what the question wants: a count of equal pieces inside a total length. That is division of a fractional measurement by a fraction. \\[ "+fmt(whole)+" \\div "+fmt(piece)+" = "+fmt(n)+" \\] The situation is <b>dividing a fractional length by a fraction to count pieces</b>.",
    {whole:whole, piece:piece});
}, ["Ask whether the question wants a total, a leftover, or a count of pieces.", "A count of equal pieces inside a total always points to division."]);
E("u2-measure-read", 2, ["3.16","3.11"], 2, "gen", function(){
  var whole=ri(2,11); var eighths=pick([1,2,3,4,5,6,7]); var objName=pick(["object","board end","ribbon","strip of card"]); var val=whole+eighths/8;
  var names={1:"1/8",2:"1/4",3:"3/8",4:"1/2",5:"5/8",6:"3/4",7:"7/8"};
  var good=whole+" "+names[eighths]+" in";
  function lab(w,e){ if(e===0) return w+" in"; if(e===8) return (w+1)+" in"; return w+" "+names[e]+" in"; }
  var cand=[[whole,eighths+1],[whole,eighths-1],[whole+1,eighths],[whole, eighths+2]];
  var ds=[]; var used={}; used[good]=1;
  for(var i=0;i<cand.length && ds.length<3;i++){ var t=lab(cand[i][0],cand[i][1]); if(!used[t]){ used[t]=1; ds.push({t:t, fb:"That reading is off the end mark: count the whole inches first, then the eighth inch marks. Tape measures use fractions of an inch because small lengths must be marked precisely."}); } }
  while(ds.length<3){ var t2=lab(whole+2, eighths); if(!used[t2]){ used[t2]=1; ds.push({t:t2, fb:"That reading is well past the end of the object."}); } else break; }
  var q=mcq("The "+objName+" starts at 0 on the ruler in the diagram. Imperial rulers divide each inch into fractions such as eighths. What is the length of the object?",
    {t:good, fb:"Correct: count the whole inches, then count eighth inch marks past the last whole inch."}, ds,
    "Read from 0. The object ends at "+whole+" whole inches plus "+eighths+" eighth marks. \\[ "+whole+" + "+FR(eighths,8)+" = "+fmt(val)+" \\] The length is <b>"+good+"</b>.",
    {whole:whole, eighths:eighths});
  q.figure=u2RulerFig(val);
  return q;
}, ["Count whole units first, then the fractional marks.", "Find the last whole inch mark the object passes, then count the small marks after it."]);

E("u2-estimate-ref", 2, ["3.17","3.18","3.19"], 2, "gen", function(){
  var scenes=[
    {obj:"height of a door", ref:"metre stick", per:1, unit:"m", lo:2, hi:3},
    {obj:"length of a classroom", ref:"foot long ruler laid end to end", per:1, unit:"ft", lo:24, hi:36},
    {obj:"width of a hallway", ref:"yard stick", per:1, unit:"yd", lo:2, hi:4},
    {obj:"height of a desk", ref:"foot long ruler", per:1, unit:"ft", lo:2, hi:3},
    {obj:"length of a school bus", ref:"metre stick", per:1, unit:"m", lo:10, hi:14},
    {obj:"length of a gym", ref:"metre stick", per:1, unit:"m", lo:18, hi:30},
    {obj:"height of a counter", ref:"30 cm ruler", per:0.3, unit:"m", lo:3, hi:3},
    {obj:"width of a driveway", ref:"yard stick", per:1, unit:"yd", lo:3, hi:6}
  ];
  var sc=pick(scenes); var n=ri(sc.lo*2,sc.hi*2)/2; var ans=Math.round(n*sc.per*10)/10;
  var dd=u2Dist(ans,[ans*2,ans/2,ans+(ans>=10?5:1)], sc.unit, "Correct: multiply the number of referents by the size of one referent.", function(i){ return ["That doubles the count of referents without a reason.","That uses only half the referents that were counted.","That does not match the count of referents that was given."][i]; });
  return mcq("To estimate the "+sc.obj+", a student uses a "+sc.ref+" as a referent. It takes about "+n+" referents to match it. One referent is about "+fmt(sc.per)+" "+sc.unit+". About how long is it, in "+sc.unit+"?",
    dd.c, dd.d,
    "Multiply the count by the size of one referent. \\[ "+n+" \\times "+fmt(sc.per)+"\\ \\text{"+sc.unit+"} = "+fmt(ans)+"\\ \\text{"+sc.unit+"} \\] The estimate is about <b>"+fmt(ans)+" "+sc.unit+"</b>.",
    {obj:sc.obj, n:n});
}, ["An estimate with a referent is a count times the size of one referent.", "Multiply how many referents fit by the length of one referent."]);
E("u2-perimeter", 2, ["3.20","2.3"], 2, "gen", function(){
  var ctx=pick([
    {o:"garden bed", act:"edging around"},
    {o:"classroom bulletin board", act:"trim around"},
    {o:"picture frame", act:"framing around"},
    {o:"rug outline", act:"binding around the edge of"}
  ]);
  var L=ri(3,14), W=ri(2,10); if(W>=L){ var tmp=L; L=W+ri(1,3); W=tmp; }
  var guardP=0; while(guardP<40){ var valsP=[2*(L+W), L*W, L+W, 2*L+W]; var setP={}; var dupP=false; valsP.forEach(function(x){ if(setP[x]) dupP=true; setP[x]=1; }); if(!dupP) break; L=ri(3,14); W=ri(2,10); if(W>=L){ var t2=L; L=W+ri(1,3); W=t2; } guardP++; }
  var P=2*(L+W);
  var ds=[
    {t:fmt(L*W), fb:"That multiplies length by width, which gives area, not the distance around."},
    {t:fmt(L+W), fb:"That adds only one length and one width, half the trip around."},
    {t:fmt(2*L+W), fb:"That counts one width only once: both widths are part of the boundary."}
  ];
  var q=mcq("A rectangular "+ctx.o+" is \\("+L+"\\ \\text{m}\\) long and \\("+W+"\\ \\text{m}\\) wide. How much material, in metres, is needed for "+ctx.act+" it? Use \\(P = 2L + 2W\\).",
    {t:fmt(P), fb:"Correct: add both lengths and both widths."}, ds,
    "Perimeter is the distance around, and the formula applies directly. \\[ \\begin{aligned} P &= 2L + 2W \\\\ &= 2("+L+") + 2("+W+") \\\\ &= "+P+"\\ \\text{m} \\end{aligned} \\] The answer is <b>"+P+" m</b>.",
    {L:L, W:W});
  q.figure=u2RectFig(L,W);
  return q;
}, ["Perimeter is the distance all the way around a shape.", "Add both lengths and both widths, or use P = 2L + 2W."]);

E("u2-operation", 2, ["3.21"], 2, "var", varset([
  function(){ return mcq("A fence goes around a rectangular yard. The yard is 18 m by 12 m. Which operation finds the length of fence needed?",
    {t:"Add all four sides (perimeter)", fb:"Correct: fencing follows the boundary, so the side lengths are added."},
    [{t:"Multiply length by width", fb:"That gives the area covered, not the length of fence."},{t:"Divide length by width", fb:"Division does not give a boundary length here."},{t:"Subtract width from length", fb:"That gives a difference of two sides, not the full boundary."}],
    "Fence follows the boundary. Add the sides: \\(18+12+18+12 = 60\\ \\text{m}\\). The operation is <b>add all four sides</b>.", {}); },
  function(){ return mcq("A ribbon 90 cm long is cut into pieces 15 cm each. Which operation finds how many pieces there will be?",
    {t:"Divide the total length by the piece length", fb:"Correct: equal pieces inside a total is division."},
    [{t:"Multiply the total length by the piece length", fb:"That would make the length larger, not split it into pieces."},{t:"Add the two lengths", fb:"Adding gives a combined length, not a count of pieces."},{t:"Subtract the piece length once", fb:"One subtraction leaves a leftover length, not the count."}],
    "A count of equal pieces is division: \\(90 \\div 15 = 6\\) pieces. The operation is <b>division</b>.", {}); },
  function(){ return mcq("A board is 2.4 m long. A piece 0.9 m is cut off. Which operation finds the length left?",
    {t:"Subtract the cut piece from the total length", fb:"Correct: a part removed from a whole is subtraction."},
    [{t:"Add the two lengths", fb:"Adding would combine lengths, but a piece was removed."},{t:"Divide the total by the piece", fb:"Division counts pieces, but here the leftover length is wanted."},{t:"Multiply the two lengths", fb:"Multiplying lengths does not give the leftover length."}],
    "Part removed from a whole: \\(2.4 - 0.9 = 1.5\\ \\text{m}\\) left. The operation is <b>subtraction</b>.", {}); },
  function(){ return mcq("Baseboard is sold by the metre. One wall is 4.5 m and 6 walls of that length are needed. Which operation finds the total baseboard?",
    {t:"Multiply the one wall length by the number of walls", fb:"Correct: repeated equal lengths are found by multiplication."},
    [{t:"Add 4.5 and 6 once", fb:"That adds two unlike amounts once, not six equal lengths."},{t:"Divide 4.5 by 6", fb:"That would split one wall length into parts."},{t:"Subtract 6 from 4.5", fb:"Nothing is being removed in this problem."}],
    "Repeated equal lengths: \\(4.5 \\times 6 = 27\\ \\text{m}\\). The operation is <b>multiplication</b>.", {}); },
  function(){ return mcq("A circular garden has a radius of 3 m. Edging goes around the garden. Which operation finds the edging length?",
    {t:"Multiply 2 by pi by the radius (circumference)", fb:"Correct: edging around a circle is its circumference."},
    [{t:"Multiply pi by the radius squared", fb:"That is the area of the circle, not the distance around."},{t:"Add the radius to itself once and stop", fb:"That gives the diameter only, not the full trip around."},{t:"Divide the radius by pi", fb:"That does not produce the circumference."}],
    "Around a circle is circumference: \\(C = 2\\pi r = 2\\pi(3) \\approx 18.8\\ \\text{m}\\). The operation is <b>circumference</b>.", {}); },
  function(){ return mcq("A parcel has length 40 cm, width 30 cm and height 20 cm. A courier adds length, width and height to set the shipping size. Which operation describes this?",
    {t:"Add length, width and height", fb:"Correct: the shipping size rule is L + W + H."},
    [{t:"Multiply length by width by height", fb:"That gives volume, not the shipping size sum."},{t:"Find the perimeter of the top face", fb:"That uses only the length and width of one face."},{t:"Average the three measures", fb:"Averaging divides the sum by 3, which the rule does not do."}],
    "Shipping size: \\(40 + 30 + 20 = 90\\ \\text{cm}\\). The operation is <b>add length, width and height</b>.", {}); }
]), ["Read the problem and name what the answer should describe: a total, a count, a leftover, or a distance around.", "Match that description to the operation before doing any arithmetic."]);

E("u2-trade-formula", 2, ["2.2"], 2, "var", varset([
  function(){ return mcq("How does an electrician use the formula for the circumference of a circle on the job?",
    {t:"To find how much conduit bends around a circular run or the length around a round junction box", fb:"Correct: circumference gives the length around a circular object."},
    [{t:"To find the area of a ceiling for paint coverage", fb:"Paint coverage is an area problem, not a circumference problem."},{t:"To set the price of a job from an hourly rate", fb:"That is a pay calculation, not a length formula."},{t:"To convert a temperature for a thermostat", fb:"That is a temperature conversion, not circumference."}],
    "Circumference is a length around a circle, used whenever material must wrap a round object. The answer is <b>finding the length around a circular run or box</b>.", {}); },
  function(){ return mcq("How does a carpenter use the perimeter formula on the job?",
    {t:"To order baseboard or trim for the walls of a room", fb:"Correct: trim follows the boundary of the room, which is its perimeter."},
    [{t:"To find how much flooring covers the room", fb:"Flooring coverage is area, measured in square units."},{t:"To find the volume of a concrete footing", fb:"Volume needs three dimensions multiplied, not a boundary sum."},{t:"To check that a wall is level", fb:"Levelling is done with a level tool, not a perimeter calculation."}],
    "Trim runs along the walls, the boundary of the floor plan. The answer is <b>ordering baseboard or trim by perimeter</b>.", {}); },
  function(){ return mcq("How does a plumber use a diameter measurement on the job?",
    {t:"To choose a pipe or fitting that matches the opening it must connect to", fb:"Correct: pipes and fittings are sized by diameter."},
    [{t:"To find the perimeter of a bathroom", fb:"A room perimeter does not size a pipe."},{t:"To estimate paint for a wall", fb:"Paint depends on wall area, not pipe diameter."},{t:"To set a work schedule", fb:"Scheduling does not use a diameter measure."}],
    "Pipe sizes are given as diameters, so matching a diameter selects the right part. The answer is <b>choosing pipe or fittings by diameter</b>.", {}); },
  function(){ return mcq("How does a landscaper use the shipping rule L + W + H?",
    {t:"Rarely directly: a courier uses it, and the landscaper checks a boxed plant or tool order against the size limit before shipping", fb:"Correct: L + W + H is the courier size rule for parcels."},
    [{t:"To find the area of a lawn for seed", fb:"Lawn seed depends on area, not a parcel size sum."},{t:"To find the depth to dig a hole", fb:"Digging depth is a single direct measure."},{t:"To price topsoil by the bag", fb:"Topsoil is sold by volume or coverage, not by L + W + H."}],
    "L + W + H is the size sum couriers use for parcels. The answer is <b>checking a parcel against the courier size limit</b>.", {}); },
  function(){ return mcq("How does a drywaller use a midpoint on the job?",
    {t:"To mark the centre of a wall or sheet so a fixture or seam lands in the middle", fb:"Correct: a midpoint marks the centre of a length."},
    [{t:"To find the total area of a sheet", fb:"Sheet area is length times width."},{t:"To convert feet to inches", fb:"Conversion changes units, it does not locate a centre."},{t:"To find the circumference of a vent", fb:"A vent circumference uses the circle formula, not a midpoint."}],
    "A midpoint is the centre point of a length, used for centred placement. The answer is <b>marking the centre for placement</b>.", {}); },
  function(){ return mcq("How does a tile setter use the formula for the circumference of a circle?",
    {t:"To cut and fit tile around a round drain or pipe opening", fb:"Correct: fitting around a round opening uses the distance around the circle."},
    [{t:"To count boxes of tile for a rectangular floor", fb:"Box counts come from floor area, not circumference."},{t:"To mix mortar by ratio", fb:"Mixing ratios are proportions of materials, not a circle formula."},{t:"To find the height of a wall", fb:"Wall height is a direct vertical measure."}],
    "Work around a round opening follows the circle boundary. The answer is <b>fitting tile around a round drain or pipe</b>.", {}); }
]), ["Think about what the formula measures: a distance around, a centre point, or a size sum.", "Match the formula to a job task that needs exactly that kind of measure."]);

E("u2-midpoint", 2, ["3.22","3.14"], 2, "gen", function(){
  var mode=pick(["half","average","imperial"]);
  if(mode==="imperial"){
    var ft=pick([4,6,8,10,12]); var inches=ft*12; var mid=inches/2; var midFt=mid/12;
    var ds=[{t:fmt(mid+6), fb:"That is past the halfway mark: check the total in inches first."},{t:fmt(mid-6), fb:"That falls short of halfway: the board is "+inches+" in long."},{t:fmt(inches), fb:"That is the full length, not the midpoint."}];
    return mcq("A board is "+ft+" ft long. A cut mark is needed at the midpoint. The midpoint is the point halfway along a length. In inches, where is the mark?",
      {t:fmt(mid), fb:"Correct: convert to inches, then take half."}, ds,
      "Convert first, then halve. \\[ \\begin{aligned} "+ft+"\\ \\text{ft} &= "+inches+"\\ \\text{in} \\\\ \\text{midpoint} &= "+inches+" \\div 2 = "+fmt(mid)+"\\ \\text{in} \\end{aligned} \\] The mark is at <b>"+fmt(mid)+" in</b> ("+fmt(midFt)+" ft).",
      {mode:mode, ft:ft});
  }
  if(mode==="average"){
    var a=ri(10,80), gapA=ri(10,90); if(a+gapA/2===gapA || gapA===a) gapA=gapA+7; var b=a+gapA; var mid2=(a+b)/2;
    var ds2=[{t:fmt(b-a), fb:"That is the distance between the readings, not the point halfway between them."},{t:fmt(a+b), fb:"That is the sum of the readings: a midpoint using end readings is their average."},{t:fmt(b), fb:"That is just the far end reading, not a point between the two."}];
    var bo2=balOpts({t:fmt(mid2), fb:"Correct: the midpoint of two end readings is their average."}, ds2);
    return mcq("On a wall, one end of a shelf line is at the \\("+a+"\\ \\text{cm}\\) mark of a tape and the other end is at the \\("+b+"\\ \\text{cm}\\) mark. Where is the midpoint of the shelf line, in centimetres?",
      bo2[0], bo2[1],
      "Average the two end readings. \\[ \\begin{aligned} \\text{midpoint} &= \\frac{"+a+" + "+b+"}{2} \\\\ &= "+fmt(mid2)+"\\ \\text{cm} \\end{aligned} \\] The midpoint is at <b>"+fmt(mid2)+" cm</b>.",
      {mode:mode, a:a, b:b});
  }
  var L=ri(12,96)*2; var half=L/2;
  var ctx=pick(["ribbon","board","rope","strip of trim","length of wire"]);
  var ds3=[{t:fmt(half+ri(2,6)), fb:"That is past halfway: compare it with half the total length."},{t:fmt(L), fb:"That is the full length, not its midpoint."},{t:fmt(half/2), fb:"That is a quarter of the length: a midpoint is half, found with one division by 2."}];
  if(ds3[0].t===fmt(half)) ds3[0].t=fmt(half+4);
  var bo3=balOpts({t:fmt(half), fb:"Correct: half the total length gives the midpoint."}, ds3);
  return mcq("A "+ctx+" is \\("+L+"\\ \\text{cm}\\) long. Where is its midpoint, in centimetres? The midpoint is halfway along the length.",
    bo3[0], bo3[1],
    "Take half the total. \\[ "+L+" \\div 2 = "+half+" \\] The midpoint is at <b>"+half+" cm</b> from either end.",
    {mode:mode, L:L});
}, ["A midpoint is halfway: half the total, or the average of two end readings.", "Find the total length first, then divide by 2."]);

E("u2-si-imp-convert", 2, ["3.6"], 2, "gen", function(){
  var cm=pick([10,15,20,25,30,40,50,60,75,80,90,100,120,150]);
  var ans=Math.round(cm/2.54*100)/100;
  var ctx=pick(["A shelf is","A countertop section is","A piece of trim is","A toolbox is"]);
  var ds=[
    {t:fmt(Math.round(cm*2.54*100)/100), fb:"That multiplies by 2.54, which converts inches to centimetres, the reverse direction."},
    {t:fmt(Math.round(cm/2*100)/100), fb:"That divides by 2 instead of 2.54, so the proportion is off."},
    {t:fmt(cm), fb:"That keeps the same number: centimetres and inches are different sizes, so the number must change."}
  ];
  var bo=balOpts({t:fmtF(ans,2), fb:"Correct: set up the proportion with 2.54 cm per inch and divide."}, ds);
  return mcq(ctx+" \\("+cm+"\\ \\text{cm}\\) long. Convert this length to inches. Use \\(1\\ \\text{in} = 2.54\\ \\text{cm}\\). Give the answer to two decimal places.",
    bo[0], bo[1],
    "Use proportional reasoning with the given rate. \\[ \\begin{aligned} \\text{inches} &= "+cm+" \\div 2.54 \\\\ &= "+fmtF(ans,2)+"\\ \\text{in} \\end{aligned} \\] The length is <b>"+fmtF(ans,2)+" in</b>.",
    {cm:cm});
}, ["Write the rate as a proportion: 2.54 cm stands with 1 inch.", "Divide the centimetre measure by 2.54 to get inches."]);

E("u2-imp-si-convert", 2, ["3.13"], 2, "gen", function(){
  var inches=pick([4,5,6,8,9,10,12,15,18,20,24,30,36]);
  var ans=Math.round(inches*2.54*100)/100;
  var ctx=pick(["A bolt is","A photo frame side is","A pipe section is","A bookcase shelf is"]);
  var ds=[
    {t:fmt(Math.round(inches/2.54*100)/100), fb:"That divides by 2.54, which converts centimetres to inches, the reverse direction."},
    {t:fmt(Math.round(inches*2*100)/100), fb:"That uses 2 cm per inch instead of 2.54, so the proportion is off."},
    {t:fmt(inches), fb:"That keeps the same number: an inch is larger than a centimetre, so the centimetre number must be larger."}
  ];
  var corr=fmt(ans); ds.forEach(function(d){ if(d.t===corr) d.t=fmt(ans+2.54); });
  var bo=balOpts({t:corr, fb:"Correct: multiply by 2.54 cm per inch."}, ds);
  return mcq(ctx+" \\("+inches+"\\ \\text{in}\\) long. Convert this length to centimetres. Use \\(1\\ \\text{in} = 2.54\\ \\text{cm}\\).",
    bo[0], bo[1],
    "Use proportional reasoning with the given rate. \\[ \\begin{aligned} \\text{centimetres} &= "+inches+" \\times 2.54 \\\\ &= "+fmt(ans)+"\\ \\text{cm} \\end{aligned} \\] The length is <b>"+fmt(ans)+" cm</b>.",
    {inches:inches});
}, ["Write the rate as a proportion: 1 inch stands with 2.54 cm.", "Multiply the inch measure by 2.54 to get centimetres."]);

E("u2-reasonable", 2, ["3.23"], 2, "gen", function(){
  var mode=pick(["classroom","frame","doorway","plate","parcel","fence"]);
  if(mode==="classroom"){
    var trueL=ri(7,12); var rep=trueL*100;
    return mcq("A student measures a classroom and reports the length as "+rep+" m. Is this reasonable?",
      {t:"No: a classroom is about "+trueL+" m long, so "+rep+" m is far too large, likely a centimetre value given in metres", fb:"Correct: the judgement matches a referent check."},
      [{t:"Yes: classrooms are hundreds of metres long, so a value like this is reasonable for a school", fb:"Compare the reported value with a referent: a classroom is only several metres long."},{t:"Yes: any measured value is automatically reasonable as long as a tape measure was used to take it carefully", fb:"A reported value still has to fit the size of the object."},{t:"No: a classroom is about "+(trueL*10)+" m long, so "+rep+" m is only a little too large to matter at all", fb:"That referent is itself far too large for a classroom."}],
      "Judge against a referent. A classroom is about "+trueL+" m long, so "+rep+" m is not reasonable. The judgement is <b>no, the value is far too large</b>.", {mode:mode, trueL:trueL});
  }
  if(mode==="frame"){
    var L=ri(25,60), W=ri(20,50); var P=2*(L+W);
    return mcq("A student finds the perimeter of a picture frame ("+L+" cm by "+W+" cm) is "+P+" cm. Is this reasonable?",
      {t:"Yes: the sides add to "+L+" + "+W+" + "+L+" + "+W+" = "+P+" cm, which fits a frame of that size", fb:"Correct: the check calculation confirms the value."},
      [{t:"No: the perimeter should be "+L+" × "+W+" = "+(L*W)+" cm, found by multiplying the two sides together", fb:"Multiplying gives area, not perimeter."},{t:"Yes: perimeters are always in the hundreds, so any value near there works fine for a frame", fb:"Reasonableness comes from a check, not from the size of the number alone."},{t:"No: a picture frame perimeter must be under 100 cm, so this one is too big", fb:"These sides already add past 100 cm, so that claim fails the check."}],
      "Check by adding the sides: "+L+" + "+W+" + "+L+" + "+W+" = "+P+" cm. The judgement is <b>yes, it is reasonable</b>.", {mode:mode, L:L, W:W});
  }
  if(mode==="doorway"){
    var repD=pick([19,20,21,22,23]);
    return mcq("A student reports a doorway height of "+repD+" m. Is this reasonable?",
      {t:"No: a doorway is about 2.1 m high, so a decimal point error is likely", fb:"Correct: the value is about ten times a sensible doorway height."},
      [{t:"Yes: doorways in schools are over 18 m high in many school buildings", fb:"Compare with a referent: a doorway is only a little over 2 m."},{t:"No: a doorway is about 21 cm high, so the value is far too large", fb:"That referent is far too small: a person must fit through a doorway."},{t:"Yes: height values in metres are always in the tens, like this one", fb:"The unit alone does not make a value reasonable."}],
      "Judge against a referent. A doorway is about 2.1 m high, so "+repD+" m is not reasonable. The judgement is <b>no, a decimal point error is likely</b>.", {mode:mode});
  }
  if(mode==="plate"){
    var d=ri(20,32); var C=Math.round(Math.PI*d);
    return mcq("A student finds the circumference of a dinner plate with diameter "+d+" cm is about "+C+" cm. Is this reasonable?",
      {t:"Yes: circumference is a little over 3 times the diameter, and 3 times "+d+" is "+(3*d)+", close to "+C, fb:"Correct: the quick check with 3 times the diameter confirms it."},
      [{t:"No: a circumference should be less than the diameter, since going around is shorter", fb:"Going around a circle is longer than going straight across it."},{t:"No: the circumference should be about "+(d*d)+" cm, the diameter squared, so the reported value is too small", fb:"Squaring belongs to area, not circumference."},{t:"Yes: any value with pi in the calculation is automatically reasonable, so no check is needed", fb:"The value still needs a size check against the diameter."}],
      "Circumference is a little over 3 times the diameter: 3 times "+d+" is "+(3*d)+", close to "+C+". The judgement is <b>yes, it is reasonable</b>.", {mode:mode, d:d});
  }
  if(mode==="parcel"){
    var L=ri(30,60), W=ri(20,50), H=ri(15,40); var S=L+W+H, prod=L*W*H;
    return mcq("A parcel measures "+L+" cm by "+W+" cm by "+H+" cm. A student gives the shipping size L + W + H as "+prod+" cm. Is this reasonable?",
      {t:"No: the sum is "+L+" + "+W+" + "+H+" = "+S+" cm, so "+prod+" cm comes from multiplying, the wrong operation", fb:"Correct: the check sum exposes the wrong operation."},
      [{t:"Yes: shipping sizes are usually in the tens of thousands for a parcel, so this value is reasonable", fb:"Add the three measures and compare: the sum is only in the low hundreds."},{t:"No: the sum should be "+L+" + "+W+" + "+H+" divided by 10, which gives about "+Math.round(S/10)+" cm, not the reported value", fb:"That is a tenth of the actual sum: recheck the addition."},{t:"Yes: multiplying the three measures is the shipping rule, so the value is right", fb:"The shipping rule is a sum, L + W + H."}],
      "Add the measures: "+L+" + "+W+" + "+H+" = "+S+" cm, so "+prod+" cm is not reasonable. The judgement is <b>no, the wrong operation was used</b>.", {mode:mode, L:L, W:W, H:H});
  }
  var run=ri(15,40); var repF=run*10;
  return mcq("A student reports that a garden fence run is "+repF+" m long, for a small backyard garden. Is this reasonable?",
    {t:"No: a small backyard fence run is in the tens of metres at most, so "+repF+" m is far too large", fb:"Correct: the value does not fit the setting."},
    [{t:"Yes: backyard fences are usually hundreds of metres long, so this value fits a small garden perfectly well", fb:"Compare with a referent: a backyard is tens of metres across, not hundreds."},{t:"Yes: a bigger number always means a better, more careful measurement was taken on site", fb:"Size of the number says nothing without a fit check."},{t:"No: a fence run cannot be longer than 5 m in any backyard, so the report must be wrong", fb:"Many backyard runs are longer than 5 m: the reported value is too large, but not by that test."}],
    "A small backyard fence run is roughly "+run+" m scale, in the tens of metres. "+repF+" m is far too large. The judgement is <b>no, it is not reasonable</b>.", {mode:mode, run:run});
}, ["Compare the answer with a familiar referent or a rough check calculation.", "Ask whether the size of the answer fits the object being measured."]);
E("u2-cr-perim", 2, ["3.20"], 2, "gen", function(){
  var L=ri(4,18), W=ri(3,12); var P=2*(L+W);
  var ctx=pick(["rectangular garden","rectangular parking pad","rectangular rug","rectangular bulletin board"]);
  var q=numq("Find the perimeter of a "+ctx+" that is \\("+L+"\\ \\text{m}\\) long and \\("+W+"\\ \\text{m}\\) wide. Give the answer in metres.", P, 0.01,
    "Add both lengths and both widths. \\[ \\begin{aligned} P &= 2L + 2W \\\\ &= 2("+L+") + 2("+W+") \\\\ &= "+P+"\\ \\text{m} \\end{aligned} \\] The answer is <b>"+P+" m</b>.",
    {L:L, W:W}); q.figure=u2RectFig(L,W); return q;
}, ["Perimeter is the distance all the way around.", "Use P = 2L + 2W with the given length and width."]);

E("u2-cr-circ", 2, ["2.3","3.20"], 2, "gen", function(){
  var r=ri(2,30); var C=Math.round(2*Math.PI*r*10)/10;
  var ctx=pick(["round rug","circular garden","round table top","circular fire pit"]);
  var q=numq("A "+ctx+" has a radius of \\("+r+"\\ \\text{m}\\). Find its circumference. Use \\(C = 2\\pi r\\). Round the answer to one decimal place, in metres.", C, 0.15,
    "Apply the circumference formula directly. \\[ \\begin{aligned} C &= 2\\pi r \\\\ &= 2\\pi("+r+") \\\\ &\\approx "+fmt(C,1)+"\\ \\text{m} \\end{aligned} \\] The answer is <b>"+fmt(C,1)+" m</b>.",
    {r:r}); q.figure=m12CircleSVG("r = "+r+" m"); return q;
}, ["Circumference is the distance around a circle.", "Substitute the radius into C = 2 pi r."]);

E("u2-cr-mid", 2, ["3.22"], 2, "gen", function(){
  var a=ri(8,60), gap=pick([20,24,30,36,40,48,54,60]); var b=a+gap; var mid=(a+b)/2;
  return numq("A tape on a wall shows one end of a window opening at \\("+a+"\\ \\text{cm}\\) and the other end at \\("+b+"\\ \\text{cm}\\). A bracket must go at the midpoint of the opening. At what tape reading, in centimetres, should the bracket go?", mid, 0.01,
    "Average the two end readings. \\[ \\begin{aligned} \\text{midpoint} &= \\frac{"+a+" + "+b+"}{2} \\\\ &= "+fmt(mid)+"\\ \\text{cm} \\end{aligned} \\] The answer is <b>"+fmt(mid)+" cm</b>.",
    {a:a, b:b});
}, ["The midpoint of two end readings is their average.", "Add the two readings, then divide by 2."]);

E("u2-cr-ship", 2, ["3.20","2.1"], 2, "gen", function(){
  var L=ri(25,60), W=ri(15,45), H=ri(10,35); var S=L+W+H;
  var ctx=pick(["A courier parcel","A boxed tool kit","A boxed plant order","A suitcase for air travel"]);
  var q=numq(ctx+" measures \\("+L+"\\ \\text{cm}\\) long, \\("+W+"\\ \\text{cm}\\) wide and \\("+H+"\\ \\text{cm}\\) high. Couriers and airlines use the size \\(L + W + H\\). Create the calculation for this parcel and find its size, in centimetres.", S, 0.01,
    "The shipping size formula adds the three measures. \\[ \\begin{aligned} L + W + H &= "+L+" + "+W+" + "+H+" \\\\ &= "+S+"\\ \\text{cm} \\end{aligned} \\] The answer is <b>"+S+" cm</b>.",
    {L:L, W:W, H:H}); q.figure=m12BoxSVG(L,W,H,"cm"); return q;
}, ["The shipping size is a sum, not a product.", "Add length, width and height."]);

E("u2-cr-formula-manip", 2, ["2.4"], 2, "gen", function(){
  var W=ri(3,12), L=W+ri(2,10); var P=2*(L+W);
  return numq("A rectangular pen has a perimeter of \\("+P+"\\ \\text{m}\\) and a width of \\("+W+"\\ \\text{m}\\). Find its length, in metres. Use \\(P = 2L + 2W\\), rearranged to solve for \\(L\\).", L, 0.01,
    "Rearrange the formula, then substitute. \\[ \\begin{aligned} L &= \\frac{P - 2W}{2} \\\\ &= \\frac{"+P+" - 2("+W+")}{2} \\\\ &= "+L+"\\ \\text{m} \\end{aligned} \\] The answer is <b>"+L+" m</b>.",
    {P:P, W:W});
}, ["The unknown is inside the formula, so rearrange before substituting.", "Subtract twice the width from the perimeter, then divide by 2."]);

E("u2-cr-convert", 2, ["3.7"], 2, "gen", function(){
  var pieces=[ri(2,9), ri(2,9), ri(2,9)]; var cms=pieces.map(function(p){ return p*10; });
  var totalCm=cms.reduce(function(s,x){ return s+x; },0); var totalM=totalCm/100;
  return numq("Three boards measure \\("+cms[0]+"\\ \\text{cm}\\), \\("+cms[1]+"\\ \\text{cm}\\) and \\("+cms[2]+"\\ \\text{cm}\\). Placed end to end, what is their total length in metres?", totalM, 0.01,
    "Add in centimetres first, then convert. \\[ \\begin{aligned} \\text{total} &= "+cms[0]+" + "+cms[1]+" + "+cms[2]+" = "+totalCm+"\\ \\text{cm} \\\\ &= "+totalCm+" \\div 100 = "+fmt(totalM)+"\\ \\text{m} \\end{aligned} \\] The answer is <b>"+fmt(totalM)+" m</b>.",
    {cms:cms});
}, ["Add the lengths in the same unit first.", "Divide the centimetre total by 100 to get metres."]);

E("u2-error-formula", 2, ["2.5","3.23"], 3, "gen", function(){
  var mode=pick(["perim","circ","ship"]);
  if(mode==="perim"){
    var L=ri(4,12), W=ri(3,9); var wrong=L*W, right=2*(L+W);
    return mcq("A student finds the perimeter of a rectangle "+L+" m by "+W+" m by multiplying: \\("+L+" \\times "+W+" = "+wrong+"\\ \\text{m}\\). What is the error, and what is the correct perimeter?",
      {t:"The student found area: perimeter adds the sides, giving "+right+" m", fb:"Correct: multiplication of length by width is area, and "+wrong+" sq m would also be far too large for this rectangle boundary."},
      [{t:"No error: multiplying length by width is how perimeter is found", fb:"Multiplying length by width gives area, not the distance around."},{t:"The error is only rounding: the correct perimeter is "+(wrong+2)+" m", fb:"The method itself is wrong, not the rounding: perimeter adds sides."},{t:"The student should have divided: the correct perimeter is "+fmt(Math.round(wrong/W*10)/10)+" m", fb:"Division does not give a boundary length here either."}],
      "Perimeter adds the sides, it does not multiply them, and a quick size check also rules out "+wrong+" m around this small rectangle. \\[ P = 2("+L+") + 2("+W+") = "+right+"\\ \\text{m} \\] The answer is <b>area was found instead of perimeter; correct perimeter "+right+" m</b>.",
      {mode:mode, L:L, W:W});
  }
  if(mode==="circ"){
    var r=pick([4,5,6,8,10]); var wrong=Math.round(Math.PI*r*10)/10, right=Math.round(2*Math.PI*r*10)/10;
    return mcq("A student finds the circumference of a circle with radius "+r+" cm as \\(\\pi \\times "+r+" \\approx "+fmt(wrong,1)+"\\ \\text{cm}\\). What is the error, and what is the correct circumference, to one decimal place?",
      {t:"The student used pi times radius: circumference is 2 pi r, giving about "+fmt(right,1)+" cm", fb:"Correct: the factor 2 is missing, and the result was also about half a sensible circumference."},
      [{t:"No error at all: pi times the radius is exactly how circumference is found", fb:"That formula gives only half the circumference: the full formula is 2 pi r."},{t:"The error is using pi at all: the correct circumference is the diameter, "+(2*r)+" cm", fb:"That is the diameter, not the distance around the circle."},{t:"The student should have squared the radius: the correct value is about "+fmt(Math.round(Math.PI*r*r*10)/10,1)+" cm", fb:"Squaring the radius belongs to the area formula, not circumference."}],
      "The circumference formula needs the factor 2. \\[ C = 2\\pi("+r+") \\approx "+fmt(right,1)+"\\ \\text{cm} \\] The answer is <b>missing factor 2; correct circumference about "+fmt(right,1)+" cm</b>.",
      {mode:mode, r:r});
  }
  var L=ri(20,50), W=ri(15,40), H=ri(10,30); var wrongP=L*W*H, rightS=L+W+H;
  return mcq("A student finds the shipping size of a parcel "+L+" cm by "+W+" cm by "+H+" cm by multiplying all three measures, getting "+wrongP+" cm. What is the error, and what is the correct shipping size?",
    {t:"The student found volume: shipping size adds the measures, giving "+rightS+" cm", fb:"Correct: L + W + H is a sum, and "+wrongP+" cm is wildly unreasonable as a parcel size sum."},
    [{t:"No error: shipping size is found by multiplying the three measures", fb:"Multiplying gives volume in cubic units, not the shipping size sum."},{t:"The error is in the units only: the correct shipping size is "+wrongP+" m", fb:"Changing units does not fix the operation: the rule adds the three measures."},{t:"The student should have averaged the measures: the correct size is "+fmt(Math.round(rightS/3*10)/10)+" cm", fb:"Averaging divides the sum by 3, which the shipping rule does not do."}],
    "Shipping size is the sum L + W + H. \\[ "+L+" + "+W+" + "+H+" = "+rightS+"\\ \\text{cm} \\] The answer is <b>volume was found instead of the size sum; correct size "+rightS+" cm</b>.",
    {mode:mode, L:L, W:W, H:H});
}, ["Compare the student method with the correct formula for that measure.", "Name the wrong operation first, then redo the calculation with the right formula."]);

E("u2-create-formula", 2, ["2.1","2.4"], 3, "gen", function(){
  var gate=pick([0.8,1,1.2,1.5,2]); var W=ri(4,10); var L=W+ri(3,9); var fence=2*(L+W)-gate;
  var gateTxt=fmt(gate);
  var ds=[
    {t:fmt(2*(L+W)), fb:"That is the full perimeter: the gate opening needs no fencing, so it must be subtracted."},
    {t:fmt(L*W), fb:"That is the area of the yard, not a length of fence."},
    {t:fmt(2*(L+W)+gate), fb:"The gate length should be subtracted from the perimeter, not added."}
  ];
  return mcq("A yard is "+L+" m long and "+W+" m wide. Fencing goes all around except for a gate opening "+gateTxt+" m wide. Which amount of fencing, in metres, is needed?",
    {t:fmt(fence), fb:"Correct: build the perimeter formula, then subtract the gate opening."}, ds,
    "Create the problem from the perimeter formula with the gate removed. \\[ \\begin{aligned} \\text{fence} &= 2L + 2W - \\text{gate} \\\\ &= 2("+L+") + 2("+W+") - "+gateTxt+" \\\\ &= "+fmt(fence)+"\\ \\text{m} \\end{aligned} \\] The answer is <b>"+fmt(fence)+" m</b>.",
    {L:L, W:W, gate:gate});
}, ["Start from the full boundary, then adjust for the part that is left open.", "Find the perimeter first, then subtract the gate width."]);

E("u2-diameter-fig", 2, ["3.16","3.20"], 3, "gen", function(){
  var wall=pick([0.5,1,1.5,2,2.5,3]); var od=ri(10,32); var idd=od-2*wall;
  var ds=[
    {t:fmt(od-wall), fb:"That subtracts the wall only once: the wall appears on both sides of the opening."},
    {t:fmt(od), fb:"That is the outside diameter, not the inside opening."},
    {t:fmt(od-4*wall), fb:"That subtracts the wall four times: it appears twice across a diameter."}
  ];
  var bo=balOpts({t:fmt(idd), fb:"Correct: subtract the wall thickness on both sides of the opening."}, ds);
  var q=mcq("The diagram shows the end of a pipe. The outside diameter is "+fmt(od)+" cm and the wall is "+fmt(wall)+" cm thick all around. What is the inside diameter of the pipe, in centimetres? Inside diameter is the width of the opening.",
    bo[0], bo[1],
    "Across a diameter, the wall is crossed twice. \\[ \\begin{aligned} \\text{inside diameter} &= "+fmt(od)+" - 2("+fmt(wall)+") \\\\ &= "+fmt(idd)+"\\ \\text{cm} \\end{aligned} \\] The answer is <b>"+fmt(idd)+" cm</b>.",
    {od:od, wall:wall});
  q.figure=u2CirclesFig(od, idd);
  return q;
}, ["Picture a line straight across the opening: it crosses the wall twice.", "Subtract twice the wall thickness from the outside diameter."]);

E("u2-cr-estimate", 2, ["3.18","3.19"], 3, "gen", function(){
  var scenes=[
    {obj:"length of a school gym", ref:"metre stick", per:1, unit:"m"},
    {obj:"height of a flagpole, counted in storeys of about 3 m each", ref:"storey", per:3, unit:"m"},
    {obj:"width of a river bank path, counted in strides of about 0.8 m each", ref:"stride", per:0.8, unit:"m"}
  ];
  var s=pick(scenes); var n=ri(6,25); var ans=Math.round(n*s.per*10)/10;
  return numq("Estimate the "+s.obj+". It measures about "+n+" "+(s.per===1?"metre sticks":s.ref+"s")+" long. "+(s.per===1?"One metre stick is 1 m.":"One "+s.ref+" is about "+fmt(s.per)+" m.")+" Give the estimate in metres.", ans, Math.max(0.6, ans*0.15),
    "Multiply the count by the size of one referent. \\[ "+n+" \\times "+fmt(s.per)+" = "+fmt(ans)+"\\ \\text{m} \\] The answer is <b>about "+fmt(ans)+" m</b>. Estimates within a reasonable range of this value are accepted.",
    {n:n, per:s.per});
}, ["An estimate is a count of referents times the size of one referent.", "Multiply how many referents fit by the length of one."]);

E("u2-cr-error", 2, ["2.5","2.4"], 3, "gen", function(){
  var d=pick([4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,36,40]); var ctxD=pick(["circular mat","round rug","circular table top","round garden bed"]); var wrong=Math.round(Math.PI*d*d*10)/10; var right=Math.round(Math.PI*d*10)/10;
  return numq("A student was asked for the circumference of a "+ctxD+" with diameter "+d+" m. The student calculated \\(\\pi \\times "+d+"^2\\) and got about "+fmt(wrong,1)+" m. That method is wrong. Give the correct circumference, to one decimal place, in metres.", right, 0.15,
    "Squaring the diameter belongs to an area style calculation. Circumference uses the diameter once. \\[ \\begin{aligned} C &= \\pi d \\\\ &= \\pi("+d+") \\\\ &\\approx "+fmt(right,1)+"\\ \\text{m} \\end{aligned} \\] The answer is <b>"+fmt(right,1)+" m</b>.",
    {d:d});
}, ["Check which formula the student used against the formula the question needs.", "Circumference is pi times the diameter, with no squaring."]);
