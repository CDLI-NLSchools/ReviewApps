// Math 3208 Unit 4 Derivatives question bank
// CRMARKS: u4-average-rate=1
// CRMARKS: u4-instantaneous-concept=1
// CRMARKS: u4-definition-point=2
// CRMARKS: u4-first-principles=2
// CRMARKS: u4-basic-derivatives=2
// CRMARKS: u4-product-quotient=3
// CRMARKS: u4-higher-derivatives=2
// CRMARKS: u4-chain-rule=2
// CRMARKS: u4-tangent-normal=2
// CRMARKS: u4-motion=2
// CRMARKS: u4-implicit=3
// CRMARKS: u4-implicit-second=3
// CRMARKS: u4-tangent-parameter=3
// CRMARKS: u4-chain-values=2
// CRMARKS: u4-average-rate-context=1
// CRMARKS: u4-definition-h-form=2
// CRMARKS: u4-tangent-point-slope=2
// CRMARKS: u4-derivative-zero-points=1
// CRMARKS: u4-derivative-extremum-x=2
// CRMARKS: u4-basic-derivatives-value=1
// CRMARKS: u4-implicit-second-hyperbola=3
/* Math 3208 Review, Unit 4 (Derivatives), tranche 1 entries.
   Format per brief-common.md. Fractions are written as literal \frac strings
   (this chassis does not define an FR helper). */

E("u4-secant-tangent",4,["3.1"],1,"var",varset([
  function(){return mcq("Which statement best describes a secant line to the graph of \\( y = f(x) \\)?",
    "It is a line through two points on the graph, and its slope is the average rate of change between them",
    ["It is a line through one point on the graph, and its slope is the instantaneous rate of change there",
     "It is a line through one point on the graph, perpendicular to the curve's tangent line at that point",
     "It is a line through two points on the graph, and its slope is the instantaneous rate of change there"],
    "A secant line joins two points on the graph of the function. Its slope is the change in the function values divided by the change in \\( x \\), which is the average rate of change between the two points. A line through a single point carrying the curve's own slope there is a tangent line. The secant line is <b>the line through two points on the graph, whose slope is the average rate of change between them</b>.",{});},
  function(){return mcq("Which statement best describes the tangent line to the graph of \\( y = f(x) \\) at \\( x = a \\)?",
    "It touches the graph at \\( (a, f(a)) \\) and has slope equal to the derivative of \\( f \\) at \\( a \\)",
    ["It joins \\( (a, f(a)) \\) to a second point on the graph and has slope equal to an average rate of change",
     "It touches the graph at \\( (a, f(a)) \\) and runs perpendicular to the secant line through that point",
     "It crosses the graph at two points and has slope equal to the derivative of \\( f \\) at \\( a \\)"],
    "The tangent line touches the graph at the single point \\( (a, f(a)) \\) and points in the direction of the curve there, so its slope is the instantaneous rate of change \\( f'(a) \\). A line joining two points of the graph is a secant line. The tangent line is <b>the line touching the graph at \\( (a, f(a)) \\) with slope \\( f'(a) \\)</b>.",{});},
  function(){return mcq("The slope of the secant line through \\( (a, f(a)) \\) and \\( (a + h, f(a + h)) \\) is",
    "\\( \\frac{f(a + h) - f(a)}{h} \\)",
    ["\\( \\frac{f(a + h) - f(a)}{a} \\)",
     "\\( \\frac{f(h) - f(a)}{h} \\)",
     "\\( \\frac{f(a) - f(a + h)}{h} \\)"],
    "Slope is rise over run. The rise is the change in function values, \\( f(a + h) - f(a) \\), and the run is the change in \\( x \\), from \\( a \\) to \\( a + h \\), which is \\( h \\). The slope of the secant line is <b>\\( \\frac{f(a + h) - f(a)}{h} \\)</b>.",{});},
  function(){return mcq("As \\( h \\) shrinks toward 0, the secant lines through \\( (a, f(a)) \\) and \\( (a + h, f(a + h)) \\) approach",
    "the tangent line at \\( x = a \\), whose slope is \\( f'(a) \\)",
    ["the normal line at \\( x = a \\), whose slope is \\( -\\frac{1}{f'(a)} \\)",
     "a vertical line, whose slope is undefined",
     "a horizontal line through \\( (a, f(a)) \\), whose slope is 0"],
    "As \\( h \\) shrinks, the second point slides along the graph toward \\( (a, f(a)) \\) and the secant lines settle onto the line that just touches the curve there. That limiting line is the tangent line, and its slope is the derivative. The secants approach <b>the tangent line at \\( x = a \\), whose slope is \\( f'(a) \\)</b>.",{});}
]));

E("u4-average-rate",4,["3.2"],1,"gen",function(){
  function P(cs,vn){if(vn===undefined)vn="x";var n=cs.length-1,parts=[],i,c,p,t;for(i=0;i<cs.length;i++){c=cs[i];if(c===0)continue;p=n-i;if(p===0)t=""+Math.abs(c);else t=(Math.abs(c)===1?"":Math.abs(c))+(p===1?vn:vn+"^{"+p+"}");parts.push({neg:c<0,term:t});}
    if(!parts.length)return "0";var s=parts[0].neg?"-"+parts[0].term:parts[0].term;for(var j=1;j<parts.length;j++)s+=parts[j].neg?" - "+parts[j].term:" + "+parts[j].term;return s;}
  function par(v){return v<0?"("+v+")":""+v;}
  var mode=ri(0,3), p=ri(0,3), span=ri(1,4), q=p+span, a, b, c0, F, fp, fq, avg, prompt, unit;
  if(mode===0){ a=pick([-3,-2,-1,1,2,3,4]); b=ri(-6,9); c0=ri(-8,8); F="f";
    fp=a*p*p+b*p+c0; fq=a*q*q+b*q+c0; avg=a*(p+q)+b; unit="";
    prompt="For \\( f(x) = "+P([a,b,c0])+" \\), find the average rate of change of \\( f \\) over the interval \\( ["+p+", "+q+"] \\).";
  } else if(mode===1){ a=pick([1,2,3]); b=ri(0,8); c0=0; F="s";
    fp=a*p*p+b*p; fq=a*q*q+b*q; avg=a*(p+q)+b; unit=" metres per second";
    prompt="A particle moves along a line with position \\( s(t) = "+P([a,b,0],"t")+" \\) metres after \\( t \\) seconds. Find its average velocity, in metres per second, over the time interval \\( ["+p+", "+q+"] \\).";
  } else if(mode===2){ a=pick([1,2]); b=ri(7,13); c0=ri(2,10); F="T"; p=ri(0,2); span=ri(1,3); q=p+span;
    fp=-a*p*p+b*p+c0; fq=-a*q*q+b*q+c0; avg=-a*(p+q)+b; unit=" degrees Celsius per hour";
    prompt="The temperature on a spring day is modelled by \\( T(t) = "+P([-a,b,c0],"t")+" \\) degrees Celsius, where \\( t \\) is the number of hours after 8:00 AM. Find the average rate of change of the temperature, in degrees Celsius per hour, from \\( t = "+p+" \\) to \\( t = "+q+" \\).";
  } else { a=pick([1,2,3]); b=ri(2,9); c0=ri(25,80); F="P";
    fp=a*p*p+b*p+c0; fq=a*q*q+b*q+c0; avg=a*(p+q)+b; unit=" thousand people per year";
    prompt="A town's population is modelled by \\( P(t) = "+P([a,b,c0],"t")+" \\), where \\( P \\) is in thousands of people and \\( t \\) is the number of years since 2020. Find the average rate of change of the population, in thousands of people per year, between \\( t = "+p+" \\) and \\( t = "+q+" \\).";
  }
  var sol="The average rate of change is the total change in the function divided by the change in the input. \\[ \\begin{aligned} \\frac{"+F+"("+q+") - "+F+"("+p+")}{"+q+" - "+p+"} &= \\frac{"+par(fq)+" - "+par(fp)+"}{"+span+"} \\\\ &= "+avg+" \\end{aligned} \\] The average rate of change is <b>"+avg+unit+"</b>.";
  return numq(prompt, avg, 0.011, sol, {mode:mode});
});

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


E("u4-instantaneous-concept",4,["3.3"],1,"gen",function(){
  var hs=pick([[1,0.1,0.01],[1,0.5,0.25],[2,1,0.5],[0.5,0.25,0.05]]);
  var a=ri(1,6), c=pick([-3,-2,-1,0,1,2,3,4]), L=2*a+c, formula=Math.random()<0.5;
  var vals=hs.map(function(h){return fmt(L+h);});
  var fstr = c===0 ? "x^2" : (c>0 ? "x^2 + "+c+"x" : "x^2 - "+(-c)+"x");
  var prompt;
  if(formula){
    prompt="For \\( f(x) = "+fstr+" \\), the average rates of change over \\( ["+a+", "+a+" + h] \\) when \\( h = "+hs[0]+" \\), \\( h = "+hs[1]+" \\), and \\( h = "+hs[2]+" \\) are "+vals[0]+", "+vals[1]+", and "+vals[2]+", respectively. What is the instantaneous rate of change of \\( f \\) at \\( x = "+a+" \\)?";
  } else {
    prompt="Average rates of change of a function \\( g \\) over intervals that start at \\( x = "+a+" \\) are computed for shrinking widths \\( h \\). When \\( h = "+hs[0]+" \\) the average rate is "+vals[0]+"; when \\( h = "+hs[1]+" \\) it is "+vals[1]+"; when \\( h = "+hs[2]+" \\) it is "+vals[2]+". What is the instantaneous rate of change of \\( g \\) at \\( x = "+a+" \\)?";
  }
  var sol="As the interval shrinks, the average rates of change settle closer and closer to one value: "+vals[0]+", then "+vals[1]+", then "+vals[2]+", closing in on "+L+". The instantaneous rate of change is that limiting value of the average rates. The instantaneous rate of change is <b>"+L+"</b>.";
  return mcq(prompt, ""+L, balDp(""+L,[""+fmt(L+hs[2]), ""+fmt(L+hs[0]), ""+(L-1)]), sol, {});
});

E("u4-notation",4,["3.7"],1,"var",varset([
  function(){return mcq("Which expression represents the derivative of \\( y \\) with respect to \\( x \\)?",
    "\\( \\frac{dy}{dx} \\)",
    ["\\( \\frac{\\Delta y}{\\Delta x} \\)","\\( \\frac{dx}{dy} \\)","\\( \\frac{y}{x} \\)"],
    "The symbol \\( \\frac{dy}{dx} \\) is Leibniz notation for the derivative of \\( y \\) with respect to \\( x \\). The expression \\( \\frac{\\Delta y}{\\Delta x} \\) is an average rate of change, a difference quotient before any limit is taken, and \\( \\frac{dx}{dy} \\) reverses the roles of the variables. The derivative is <b>\\( \\frac{dy}{dx} \\)</b>.",{});},
  function(){return mcq("For \\( f(x) = x^3 - 2x \\), the symbol \\( f'(2) \\) represents",
    "the value of the derivative of \\( f \\) when \\( x = 2 \\)",
    ["the value of the function \\( f \\) when \\( x = 2 \\), which is 4",
     "the second derivative of \\( f \\) when \\( x = 2 \\)",
     "the value of the derivative of \\( f \\) when \\( x = 2 \\), which is 4"],
    "The prime marks the derivative function, and the 2 is the input at which that derivative is evaluated: \\( f'(x) = 3x^2 - 2 \\), so \\( f'(2) = 10 \\). The value 4 is \\( f(2) \\), the function's own value, not its derivative. The symbol represents <b>the value of the derivative of \\( f \\) when \\( x = 2 \\)</b>.",{});},
  function(){return mcq("Which notation means the same as \\( \\frac{d}{dx}\\left[ g(x) \\right] \\)?",
    "\\( g'(x) \\)",
    ["\\( \\frac{dx}{dg} \\)","\\( g^{-1}(x) \\)","\\( \\frac{\\Delta g}{\\Delta x} \\)"],
    "The operator \\( \\frac{d}{dx} \\) says: take the derivative with respect to \\( x \\). Applied to \\( g(x) \\), the result is written in prime notation as \\( g'(x) \\). The symbol \\( g^{-1}(x) \\) is the inverse function, and \\( \\frac{\\Delta g}{\\Delta x} \\) is an average rate of change. The equivalent notation is <b>\\( g'(x) \\)</b>.",{});},
  function(){return mcq("A position function is given by \\( s(t) \\). Which expression gives the velocity at time \\( t \\)?",
    "\\( s'(t) \\)",
    ["\\( \\frac{s(t)}{t} \\)","\\( s(t + 1) - s(t) \\)","\\( \\frac{\\Delta s}{\\Delta t} \\)"],
    "Velocity is the instantaneous rate of change of position, which is the derivative \\( s'(t) \\). The expressions \\( \\frac{s(t)}{t} \\) and \\( \\frac{\\Delta s}{\\Delta t} \\) are average rates of change, and \\( s(t + 1) - s(t) \\) is a change in position over one unit of time. The velocity is <b>\\( s'(t) \\)</b>.",{});}
]));

E("u4-definition-point",4,["3.4"],2,"gen",function(){
  function sgt(v){return v>=0 ? "+ "+v : "- "+(-v);}
  if(Math.random()<0.55){
    var a=pick([-3,-2,2,3,4]), b=ri(-7,7), c0=ri(-6,6), p=ri(-3,4), ans=2*a*p+b;
    var xs = p>=0 ? "x - "+p : "x + "+(-p);
    var xp = p>=0 ? "x + "+p : "x - "+(-p);
    function P2(cs){var n=cs.length-1,parts=[],i,c,pp,t;for(i=0;i<cs.length;i++){c=cs[i];if(c===0)continue;pp=n-i;if(pp===0)t=""+Math.abs(c);else t=(Math.abs(c)===1?"":Math.abs(c))+(pp===1?"x":"x^{"+pp+"}");parts.push({neg:c<0,term:t});}
      if(!parts.length)return "0";var s=parts[0].neg?"-"+parts[0].term:parts[0].term;for(var j=1;j<parts.length;j++)s+=parts[j].neg?" - "+parts[j].term:" + "+parts[j].term;return s;}
    var prompt="Use the limit definition to find \\( f'("+p+") \\) for \\( f(x) = "+P2([a,b,c0])+" \\).";
    var sol="Apply the definition of the derivative at a point and simplify before taking the limit. \\[ \\begin{aligned} f'("+p+") &= \\lim_{x \\to "+p+"} \\frac{f(x) - f("+p+")}{"+xs+"} \\\\ &= \\lim_{x \\to "+p+"} \\frac{"+a+"\\left(x^2 - "+(p*p)+"\\right) "+sgt(b)+" \\left("+xs+"\\right)}{"+xs+"} \\\\ &= \\lim_{x \\to "+p+"} \\left( "+a+"\\left("+xp+"\\right) "+sgt(b)+" \\right) \\\\ &= "+a+"\\left("+(2*p)+"\\right) "+sgt(b)+" = "+ans+" \\end{aligned} \\] The derivative at the point is <b>"+ans+"</b>.";
    return numq(prompt, ans, 0.011, sol, {mode:"quad"});
  }
  var s=pick([2,3,4,5,6,10]), c=ri(-4,9), a0=s*s-c, guard=0;
  while((a0<1||a0>45)&&guard<40){ c=ri(-4,9); a0=s*s-c; guard++; }
  var rad = c===0 ? "x" : (c>0 ? "x + "+c : "x - "+(-c));
  var ansR=1/(2*s);
  var promptR="Use the limit definition to find \\( f'("+a0+") \\) for \\( f(x) = \\sqrt{"+rad+"} \\).";
  var solR="Apply the \\( h \\) form of the definition and multiply by the conjugate to remove the square roots from the numerator. \\[ \\begin{aligned} f'("+a0+") &= \\lim_{h \\to 0} \\frac{\\sqrt{"+(s*s)+" + h} - "+s+"}{h} \\\\ &= \\lim_{h \\to 0} \\frac{h}{h\\left( \\sqrt{"+(s*s)+" + h} + "+s+" \\right)} \\\\ &= \\frac{1}{"+s+" + "+s+"} = "+fmt(ansR)+" \\end{aligned} \\] The derivative at the point is <b>"+fmt(ansR)+"</b>.";
  return numq(promptR, ansR, 0.011, solR, {mode:"root"});
});

E("u4-first-principles",4,["3.6"],2,"gen",function(){
  function P(cs){var n=cs.length-1,parts=[],i,c,p,t;for(i=0;i<cs.length;i++){c=cs[i];if(c===0)continue;p=n-i;if(p===0)t=""+Math.abs(c);else t=(Math.abs(c)===1?"":Math.abs(c))+(p===1?"x":"x^{"+p+"}");parts.push({neg:c<0,term:t});}
    if(!parts.length)return "0";var s=parts[0].neg?"-"+parts[0].term:parts[0].term;for(var j=1;j<parts.length;j++)s+=parts[j].neg?" - "+parts[j].term:" + "+parts[j].term;return s;}
  function T(v,base){var av=Math.abs(v);if(base==="")return ""+av;return av===1?base:av+base;}
  function J(v,base,first){if(v===0)return "";var cf=T(v,base);if(first)return (v<0?"-":"")+cf;return (v<0?" - ":" + ")+cf;}
  if(Math.random()<0.6){
    var a=pick([-3,-2,2,3,4]), b=pick([-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8]), c0=ri(-9,9);
    var prompt="Using the limit definition, find \\( f'(x) \\) for \\( f(x) = "+P([a,b,c0])+" \\).";
    var num = J(a,"(x + h)^2",true)+J(b,"(x + h)",false)+J(c0,"",false);
    var num0 = J(a,"x^2",true)+J(b,"x",false)+J(c0,"",false);
    var exp1 = J(2*a,"xh",true)+J(a,"h^2",false)+J(b,"h",false);
    var exp2 = J(2*a,"x",true)+J(a,"h",false)+J(b,"",false);
    var sol="Substitute into the limit definition, expand, and cancel the factor \\( h \\) before letting \\( h \\to 0 \\). \\[ \\begin{aligned} f'(x) &= \\lim_{h \\to 0} \\frac{"+num+" - \\left( "+num0+" \\right)}{h} \\\\ &= \\lim_{h \\to 0} \\frac{"+exp1+"}{h} \\\\ &= \\lim_{h \\to 0} \\left( "+exp2+" \\right) \\\\ &= "+P([2*a,b])+" \\end{aligned} \\] The derivative is <b>\\( f'(x) = "+P([2*a,b])+" \\)</b>.";
    return mcq(prompt, "\\( "+P([2*a,b])+" \\)", ["\\( "+P([a,b])+" \\)","\\( "+P([2*a,-b])+" \\)","\\( "+P([2*a,0])+" \\)"], sol, {mode:"quad"});
  }
  var b2=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]), c2=ri(-9,9);
  var prompt2="Using the limit definition, find \\( f'(x) \\) for \\( f(x) = "+P([1,0,b2,c2])+" \\).";
  var expn = "3x^2h + 3xh^2 + h^3"+J(b2,"h",false);
  var exps = "3x^2 + 3xh + h^2"+J(b2,"",false);
  var sol2="Substitute into the limit definition. The cube expands as \\( (x + h)^3 = x^3 + 3x^2h + 3xh^2 + h^3 \\); cancel \\( h \\) and let \\( h \\to 0 \\). \\[ \\begin{aligned} f'(x) &= \\lim_{h \\to 0} \\frac{"+expn+"}{h} \\\\ &= \\lim_{h \\to 0} \\left( "+exps+" \\right) \\\\ &= "+P([3,0,b2])+" \\end{aligned} \\] The derivative is <b>\\( f'(x) = "+P([3,0,b2])+" \\)</b>.";
  return mcq(prompt2, "\\( "+P([3,0,b2])+" \\)", ["\\( "+P([3,0,-b2])+" \\)","\\( "+P([1,0,b2])+" \\)","\\( "+P([3,b2,0])+" \\)"], sol2, {mode:"cubic"});
});

E("u4-first-principles-pick",4,["3.6"],2,"var",varset([
  function(){return mcq("A student starts a first-principles calculation for \\( f(x) = x^2 + 3x \\): \\[ f'(x) = \\lim_{h \\to 0} \\frac{(x + h)^2 + 3(x + h) - (x^2 + 3x)}{h} \\] Which continuation and result are correct?",
    "Expanding gives \\( \\lim_{h \\to 0} \\frac{2xh + h^2 + 3h}{h} \\); cancelling \\( h \\) and letting \\( h \\to 0 \\) gives \\( f'(x) = 2x + 3 \\)",
    ["Expanding gives \\( \\lim_{h \\to 0} \\frac{2xh + h^2 + 3xh}{h} \\); cancelling \\( h \\) and letting \\( h \\to 0 \\) gives \\( f'(x) = 5x \\)",
     "Setting \\( h = 0 \\) at the start makes the numerator and denominator both 0, so the derivative does not exist",
     "Expanding gives \\( \\lim_{h \\to 0} \\frac{2xh + h^2}{h} \\); cancelling \\( h \\) and letting \\( h \\to 0 \\) gives \\( f'(x) = 2x \\)"],
    "Expanding, \\( (x + h)^2 + 3(x + h) - (x^2 + 3x) = 2xh + h^2 + 3h \\). Every term carries a factor of \\( h \\); cancelling it and letting \\( h \\to 0 \\) leaves \\( 2x + 3 \\). The correct continuation gives <b>\\( f'(x) = 2x + 3 \\)</b>.",{});},
  function(){return mcq("A student starts a first-principles calculation for \\( f(x) = 2x^2 - x \\): \\[ f'(x) = \\lim_{h \\to 0} \\frac{2(x + h)^2 - (x + h) - (2x^2 - x)}{h} \\] Which continuation and result are correct?",
    "Expanding gives \\( \\lim_{h \\to 0} \\frac{4xh + 2h^2 - h}{h} \\); cancelling \\( h \\) and letting \\( h \\to 0 \\) gives \\( f'(x) = 4x - 1 \\)",
    ["Expanding gives \\( \\lim_{h \\to 0} \\frac{4xh + 2h^2 + h}{h} \\); cancelling \\( h \\) and letting \\( h \\to 0 \\) gives \\( f'(x) = 4x + 1 \\)",
     "Expanding gives \\( \\lim_{h \\to 0} \\frac{2xh + 2h^2 - h}{h} \\); cancelling \\( h \\) and letting \\( h \\to 0 \\) gives \\( f'(x) = 2x - 1 \\)",
     "Setting \\( h = 0 \\) at the start makes the numerator and denominator both 0, so the derivative does not exist"],
    "Expanding, \\( 2(x + h)^2 - (x + h) - (2x^2 - x) = 4xh + 2h^2 - h \\). Cancelling the common factor \\( h \\) and letting \\( h \\to 0 \\) leaves \\( 4x - 1 \\). The correct continuation gives <b>\\( f'(x) = 4x - 1 \\)</b>.",{});},
  function(){return mcq("A student starts a first-principles calculation for \\( f(x) = x^2 - 5x + 2 \\): \\[ f'(x) = \\lim_{h \\to 0} \\frac{(x + h)^2 - 5(x + h) + 2 - (x^2 - 5x + 2)}{h} \\] Which continuation and result are correct?",
    "Expanding gives \\( \\lim_{h \\to 0} \\frac{2xh + h^2 - 5h}{h} \\); cancelling \\( h \\) and letting \\( h \\to 0 \\) gives \\( f'(x) = 2x - 5 \\)",
    ["Expanding gives \\( \\lim_{h \\to 0} \\frac{2xh + h^2 + 5h}{h} \\); cancelling \\( h \\) and letting \\( h \\to 0 \\) gives \\( f'(x) = 2x + 5 \\)",
     "Expanding gives \\( \\lim_{h \\to 0} \\frac{2xh + h^2}{h} \\); cancelling \\( h \\) and letting \\( h \\to 0 \\) gives \\( f'(x) = 2x \\)",
     "Setting \\( h = 0 \\) at the start makes the numerator and denominator both 0, so the derivative does not exist"],
    "Expanding, \\( (x + h)^2 - 5(x + h) + 2 - (x^2 - 5x + 2) = 2xh + h^2 - 5h \\); the constant 2 cancels and every remaining term has a factor of \\( h \\). Cancelling and letting \\( h \\to 0 \\) leaves \\( 2x - 5 \\). The correct continuation gives <b>\\( f'(x) = 2x - 5 \\)</b>.",{});},
  function(){return mcq("A student starts a first-principles calculation for \\( f(x) = 3x^2 + 2x \\): \\[ f'(x) = \\lim_{h \\to 0} \\frac{3(x + h)^2 + 2(x + h) - (3x^2 + 2x)}{h} \\] Which continuation and result are correct?",
    "Expanding gives \\( \\lim_{h \\to 0} \\frac{6xh + 3h^2 + 2h}{h} \\); cancelling \\( h \\) and letting \\( h \\to 0 \\) gives \\( f'(x) = 6x + 2 \\)",
    ["Expanding gives \\( \\lim_{h \\to 0} \\frac{6xh + 3h^2 - 2h}{h} \\); cancelling \\( h \\) and letting \\( h \\to 0 \\) gives \\( f'(x) = 6x - 2 \\)",
     "Expanding gives \\( \\lim_{h \\to 0} \\frac{3xh + 3h^2 + 2h}{h} \\); cancelling \\( h \\) and letting \\( h \\to 0 \\) gives \\( f'(x) = 3x + 2 \\)",
     "Setting \\( h = 0 \\) at the start makes the numerator and denominator both 0, so the derivative does not exist"],
    "Expanding, \\( 3(x + h)^2 + 2(x + h) - (3x^2 + 2x) = 6xh + 3h^2 + 2h \\). Cancelling the common factor \\( h \\) and letting \\( h \\to 0 \\) leaves \\( 6x + 2 \\). The correct continuation gives <b>\\( f'(x) = 6x + 2 \\)</b>.",{});}
]));

E("u4-basic-derivatives",4,["3.14"],2,"gen",function(){
  function P(cs){var n=cs.length-1,parts=[],i,c,p,t;for(i=0;i<cs.length;i++){c=cs[i];if(c===0)continue;p=n-i;if(p===0)t=""+Math.abs(c);else t=(Math.abs(c)===1?"":Math.abs(c))+(p===1?"x":"x^{"+p+"}");parts.push({neg:c<0,term:t});}
    if(!parts.length)return "0";var s=parts[0].neg?"-"+parts[0].term:parts[0].term;for(var j=1;j<parts.length;j++)s+=parts[j].neg?" - "+parts[j].term:" + "+parts[j].term;return s;}
  var mode=ri(0,2);
  if(mode===0){
    var a=pick([-3,-2,2,3,4,5]), b=pick([-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9]), c=ri(-9,9), d=ri(-9,9);
    var prompt="Find \\( f'(x) \\) for \\( f(x) = "+P([a,b,c,d])+" \\).";
    var sol="Differentiate term by term with the power rule: bring the exponent down as a multiplier and reduce the exponent by 1. The constant term differentiates to 0. \\[ \\begin{aligned} f'(x) &= "+P([3*a,2*b,c])+" \\end{aligned} \\] The derivative is <b>\\( f'(x) = "+P([3*a,2*b,c])+" \\)</b>.";
    return mcq(prompt, "\\( "+P([3*a,2*b,c])+" \\)", ["\\( "+P([3*a,-2*b,c])+" \\)","\\( "+P([a,b,c])+" \\)","\\( "+P([6*a,2*b,c])+" \\)"], sol, {mode:"poly"});
  }
  if(mode===1){
    var combos=[[6,2,3],[9,2,3],[12,2,3],[4,3,2],[8,3,4],[10,1,2],[5,4,5],[6,5,3],[15,2,5],[7,3,7],[14,3,7],[9,4,3]];
    var cb=pick(combos), A=cb[0], pp=cb[1], qq=cb[2], k=A*pp/qq;
    function ex(num,den){ if(den===1) return "^{"+num+"}"; return num<0 ? "^{-"+(-num)+"/"+den+"}" : "^{"+num+"/"+den+"}"; }
    var prompt="Find \\( f'(x) \\) for \\( f(x) = "+A+"x^{"+pp+"/"+qq+"} \\).";
    var sol="Apply the power rule with the fractional exponent: multiply by the exponent and reduce the exponent by 1. \\[ \\begin{aligned} f'(x) &= "+A+" \\cdot \\frac{"+pp+"}{"+qq+"} x^{"+pp+"/"+qq+" - 1} \\\\ &= "+k+"x"+ex(pp-qq,qq)+" \\end{aligned} \\] The derivative is <b>\\( f'(x) = "+k+"x"+ex(pp-qq,qq)+" \\)</b>.";
    return mcq(prompt, "\\( "+k+"x"+ex(pp-qq,qq)+" \\)", ["\\( "+A+"x"+ex(pp-qq,qq)+" \\)","\\( "+k+"x"+ex(pp,qq)+" \\)","\\( "+(-k)+"x"+ex(pp-qq,qq)+" \\)"], sol, {mode:"power"});
  }
  var A2=ri(2,9), n=pick([2,3,4,5]);
  var prompt="Find \\( f'(x) \\) for \\( f(x) = \\frac{"+A2+"}{x^{"+n+"}} \\).";
  var sol="Rewrite the function as a negative power, \\( f(x) = "+A2+"x^{-"+n+"} \\), then apply the power rule: multiply by the exponent and reduce the exponent by 1. \\[ \\begin{aligned} f'(x) &= "+(-A2*n)+"x^{-"+(n+1)+"} \\\\ &= \\frac{"+(-A2*n)+"}{x^{"+(n+1)+"}} \\end{aligned} \\] The derivative is <b>\\( f'(x) = \\frac{"+(-A2*n)+"}{x^{"+(n+1)+"}} \\)</b>.";
  return mcq(prompt, "\\( \\frac{"+(-A2*n)+"}{x^{"+(n+1)+"}} \\)", ["\\( \\frac{"+(A2*n)+"}{x^{"+(n+1)+"}} \\)","\\( \\frac{"+(-A2)+"}{x^{"+(n+1)+"}} \\)","\\( \\frac{"+(-A2*n)+"}{x^{"+n+"}} \\)"], sol, {mode:"negpower"});
});

E("u4-product-quotient",4,["3.13","3.14"],2,"gen",function(){
  function P(cs){var n=cs.length-1,parts=[],i,c,p,t;for(i=0;i<cs.length;i++){c=cs[i];if(c===0)continue;p=n-i;if(p===0)t=""+Math.abs(c);else t=(Math.abs(c)===1?"":Math.abs(c))+(p===1?"x":"x^{"+p+"}");parts.push({neg:c<0,term:t});}
    if(!parts.length)return "0";var s=parts[0].neg?"-"+parts[0].term:parts[0].term;for(var j=1;j<parts.length;j++)s+=parts[j].neg?" - "+parts[j].term:" + "+parts[j].term;return s;}
  function L(p,q){var s="";if(p!==0)s+=(p===1?"x":p===-1?"-x":p+"x");if(q!==0){if(s)s+=(q>0?" + ":" - ")+Math.abs(q);else s=""+q;}if(!s)s="0";return s;}
  var mode=pick([0,0,1,1,2,3]);
  if(mode===0){
    var a=ri(1,4), b=ri(-6,6), c=ri(1,4), d=ri(-6,6);
    var prompt="Find \\( f'(x) \\) for \\( f(x) = \\left( "+L(a,b)+" \\right) \\left( "+P([c,0,d])+" \\right) \\).";
    var sol="Use the product rule: \\( (uv)' = u'v + uv' \\). Here the derivative of the first factor is \\( "+a+" \\) and the derivative of the second is \\( "+(2*c)+"x \\). \\[ \\begin{aligned} f'(x) &= "+a+" \\left( "+P([c,0,d])+" \\right) + \\left( "+L(a,b)+" \\right) \\left( "+(2*c)+"x \\right) \\\\ &= "+P([3*a*c,2*b*c,a*d])+" \\end{aligned} \\] The derivative is <b>\\( f'(x) = "+P([3*a*c,2*b*c,a*d])+" \\)</b>.";
    return mcq(prompt, "\\( "+P([3*a*c,2*b*c,a*d])+" \\)", ["\\( "+P([2*a*c,0])+" \\)","\\( "+P([2*a*c,2*b*c,0])+" \\)","\\( "+P([a*c,0,a*d])+" \\)"], sol, {mode:"prodA"});
  }
  if(mode===1){
    var a=ri(1,4), b=ri(-6,6), c=ri(1,4), d=ri(-6,6);
    var prompt="Find \\( f'(x) \\) for \\( f(x) = \\left( "+P([a,0,b])+" \\right) \\left( "+L(c,d)+" \\right) \\).";
    var sol="Use the product rule: \\( (uv)' = u'v + uv' \\). Here the derivative of the first factor is \\( "+(2*a)+"x \\) and the derivative of the second is \\( "+c+" \\). \\[ \\begin{aligned} f'(x) &= "+(2*a)+"x \\left( "+L(c,d)+" \\right) + \\left( "+P([a,0,b])+" \\right) \\left( "+c+" \\right) \\\\ &= "+P([3*a*c,2*a*d,b*c])+" \\end{aligned} \\] The derivative is <b>\\( f'(x) = "+P([3*a*c,2*a*d,b*c])+" \\)</b>.";
    return mcq(prompt, "\\( "+P([3*a*c,2*a*d,b*c])+" \\)", ["\\( "+P([2*a*c,0])+" \\)","\\( "+P([a*c,0,b*c])+" \\)","\\( "+P([2*a*c,2*a*d,0])+" \\)"], sol, {mode:"prodB"});
  }
  if(mode===2){
    var a=ri(1,5), b=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]), c=ri(1,5), d=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]), guard=0;
    while(a*d-b*c===0&&guard<40){ b=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]); d=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]); guard++; }
    var num=a*d-b*c, den="("+L(c,d)+")^2";
    var prompt="Find \\( f'(x) \\) for \\( f(x) = \\frac{"+L(a,b)+"}{"+L(c,d)+"} \\).";
    var sol="Use the quotient rule: the derivative of the top times the bottom, minus the top times the derivative of the bottom, over the bottom squared. \\[ \\begin{aligned} f'(x) &= \\frac{"+a+" \\left( "+L(c,d)+" \\right) - "+c+" \\left( "+L(a,b)+" \\right)}{"+den+"} \\\\ &= \\frac{"+num+"}{"+den+"} \\end{aligned} \\] The derivative is <b>\\( f'(x) = \\frac{"+num+"}{"+den+"} \\)</b>.";
    return mcq(prompt, "\\( \\frac{"+num+"}{"+den+"} \\)", ["\\( \\frac{"+(-num)+"}{"+den+"} \\)","\\( \\frac{"+(a*d+b*c)+"}{"+den+"} \\)","\\( \\frac{"+a+"}{"+c+"} \\)"], sol, {mode:"quot"});
  }
  var prompt="The product rule is derived from the definition \\( (fg)'(x) = \\lim_{h \\to 0} \\frac{f(x + h)g(x + h) - f(x)g(x)}{h} \\). Which step makes the derivation work?";
  var sol="The numerator involves both functions at once. Adding and subtracting the mixed term \\( f(x + h)g(x) \\) splits it into two pieces: \\( g(x) \\) times the difference quotient of \\( f \\), plus \\( f(x + h) \\) times the difference quotient of \\( g \\). Taking the limit then gives \\( (fg)' = f'g + fg' \\). The key step is <b>adding and subtracting \\( f(x + h)g(x) \\) in the numerator and regrouping into two difference quotients</b>.";
  return mcq(prompt,
    "Add and subtract \\( f(x + h)g(x) \\) in the numerator, then regroup into two difference quotients",
    ["Replace \\( g(x + h) \\) by \\( g(x) \\) in the numerator, since \\( h \\) is close to 0 anyway",
     "Factor \\( h \\) out of the numerator, then cancel it with the \\( h \\) in the denominator",
     "Set \\( h = 0 \\) in the numerator first, then divide the result by the remaining denominator"],
    sol, {mode:"proof"});
});

E("u4-higher-derivatives",4,["3.15"],2,"gen",function(){
  function P(cs){var n=cs.length-1,parts=[],i,c,p,t;for(i=0;i<cs.length;i++){c=cs[i];if(c===0)continue;p=n-i;if(p===0)t=""+Math.abs(c);else t=(Math.abs(c)===1?"":Math.abs(c))+(p===1?"x":"x^{"+p+"}");parts.push({neg:c<0,term:t});}
    if(!parts.length)return "0";var s=parts[0].neg?"-"+parts[0].term:parts[0].term;for(var j=1;j<parts.length;j++)s+=parts[j].neg?" - "+parts[j].term:" + "+parts[j].term;return s;}
  var a4=pick([1,2,3]), b3=ri(-5,5), c2=ri(-6,6), d1=ri(-8,8), e0=ri(-9,9), t=ri(-3,3), order=pick([2,3]);
  var f1=P([4*a4,3*b3,2*c2,d1]), f2=P([12*a4,6*b3,2*c2]), f3=P([24*a4,6*b3]);
  var ans = order===2 ? 12*a4*t*t+6*b3*t+2*c2 : 24*a4*t+6*b3;
  var sym = order===2 ? "f''" : "f'''";
  var prompt="For \\( f(x) = "+P([a4,b3,c2,d1,e0])+" \\), find \\( "+sym+"("+t+") \\).";
  var steps="\\[ \\begin{aligned} f'(x) &= "+f1+" \\\\ f''(x) &= "+f2+" \\end{aligned} \\]";
  if(order===3) steps="\\[ \\begin{aligned} f'(x) &= "+f1+" \\\\ f''(x) &= "+f2+" \\\\ f'''(x) &= "+f3+" \\end{aligned} \\]";
  var sol="Differentiate repeatedly with the power rule, then substitute \\( x = "+t+" \\). "+steps+" Evaluating at \\( x = "+t+" \\) gives <b>\\( "+sym+"("+t+") = "+ans+" \\)</b>.";
  return numq(prompt, ans, 0.011, sol, {order:order});
});

E("u4-chain-rule",4,["3.16"],2,"gen",function(){
  function P(cs){var n=cs.length-1,parts=[],i,c,p,t;for(i=0;i<cs.length;i++){c=cs[i];if(c===0)continue;p=n-i;if(p===0)t=""+Math.abs(c);else t=(Math.abs(c)===1?"":Math.abs(c))+(p===1?"x":"x^{"+p+"}");parts.push({neg:c<0,term:t});}
    if(!parts.length)return "0";var s=parts[0].neg?"-"+parts[0].term:parts[0].term;for(var j=1;j<parts.length;j++)s+=parts[j].neg?" - "+parts[j].term:" + "+parts[j].term;return s;}
  function L(p,q){var s="";if(p!==0)s+=(p===1?"x":p===-1?"-x":p+"x");if(q!==0){if(s)s+=(q>0?" + ":" - ")+Math.abs(q);else s=""+q;}if(!s)s="0";return s;}
  var mode=ri(0,2);
  if(mode===0){
    var a=ri(2,5), b=ri(-8,8), n=pick([3,4,5,6]);
    var prompt="Find \\( f'(x) \\) for \\( f(x) = \\left( "+L(a,b)+" \\right)^{"+n+"} \\).";
    var sol="Use the chain rule: apply the power rule to the outer function, then multiply by the derivative of the inside, \\( "+L(a,b)+" \\), which is \\( "+a+" \\). \\[ \\begin{aligned} f'(x) &= "+n+" \\left( "+L(a,b)+" \\right)^{"+(n-1)+"} \\cdot "+a+" \\\\ &= "+(n*a)+" \\left( "+L(a,b)+" \\right)^{"+(n-1)+"} \\end{aligned} \\] The derivative is <b>\\( f'(x) = "+(n*a)+" \\left( "+L(a,b)+" \\right)^{"+(n-1)+"} \\)</b>.";
    return mcq(prompt, "\\( "+(n*a)+" \\left( "+L(a,b)+" \\right)^{"+(n-1)+"} \\)",
      ["\\( "+n+" \\left( "+L(a,b)+" \\right)^{"+(n-1)+"} \\)","\\( "+(n*a)+" \\left( "+L(a,b)+" \\right)^{"+n+"} \\)","\\( \\left( "+L(a,b)+" \\right)^{"+(n-1)+"} \\)"], sol, {mode:"powerlin"});
  }
  if(mode===1){
    var a=pick([1,2,3]), b=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]), c=ri(1,9);
    var prompt="Find \\( f'(x) \\) for \\( f(x) = \\sqrt{"+P([a,b,c])+"} \\).";
    var sol="Write the root as a power, \\( f(x) = \\left( "+P([a,b,c])+" \\right)^{1/2} \\), and use the chain rule with the derivative of the inside, \\( "+L(2*a,b)+" \\). \\[ \\begin{aligned} f'(x) &= \\frac{1}{2\\sqrt{"+P([a,b,c])+"}} \\cdot \\left( "+L(2*a,b)+" \\right) \\\\ &= \\frac{"+L(2*a,b)+"}{2\\sqrt{"+P([a,b,c])+"}} \\end{aligned} \\] The derivative is <b>\\( f'(x) = \\frac{"+L(2*a,b)+"}{2\\sqrt{"+P([a,b,c])+"}} \\)</b>.";
    return mcq(prompt, "\\( \\frac{"+L(2*a,b)+"}{2\\sqrt{"+P([a,b,c])+"}} \\)",
      ["\\( \\frac{"+L(2*a,b)+"}{\\sqrt{"+P([a,b,c])+"}} \\)","\\( \\frac{1}{2\\sqrt{"+P([a,b,c])+"}} \\)","\\( \\frac{"+L(2*a,-b)+"}{2\\sqrt{"+P([a,b,c])+"}} \\)"], sol, {mode:"root"});
  }
  var b=pick([-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7]), c=ri(-8,8), n=pick([3,4,5]);
  var prompt="Find \\( f'(x) \\) for \\( f(x) = \\left( "+P([1,b,c])+" \\right)^{"+n+"} \\).";
  var sol="Use the chain rule: apply the power rule to the outer function, then multiply by the derivative of the inside, \\( "+P([1,b,c])+" \\), which is \\( "+L(2,b)+" \\). \\[ \\begin{aligned} f'(x) &= "+n+" \\left( "+P([1,b,c])+" \\right)^{"+(n-1)+"} \\left( "+L(2,b)+" \\right) \\end{aligned} \\] The derivative is <b>\\( f'(x) = "+n+" \\left( "+P([1,b,c])+" \\right)^{"+(n-1)+"} \\left( "+L(2,b)+" \\right) \\)</b>.";
  return mcq(prompt, "\\( "+n+" \\left( "+P([1,b,c])+" \\right)^{"+(n-1)+"} \\left( "+L(2,b)+" \\right) \\)",
    ["\\( "+n+" \\left( "+P([1,b,c])+" \\right)^{"+(n-1)+"} \\)","\\( "+n+" \\left( "+P([1,b,c])+" \\right)^{"+(n-1)+"} \\left( "+L(2,-b)+" \\right) \\)","\\( "+n+" \\left( "+P([1,b,c])+" \\right)^{"+n+"} \\left( "+L(2,b)+" \\right) \\)"], sol, {mode:"powerquad"});
});

E("u4-tangent-normal",4,["3.5","3.19"],2,"gen",function(){
  function P(cs){var n=cs.length-1,parts=[],i,c,p,t;for(i=0;i<cs.length;i++){c=cs[i];if(c===0)continue;p=n-i;if(p===0)t=""+Math.abs(c);else t=(Math.abs(c)===1?"":Math.abs(c))+(p===1?"x":"x^{"+p+"}");parts.push({neg:c<0,term:t});}
    if(!parts.length)return "0";var s=parts[0].neg?"-"+parts[0].term:parts[0].term;for(var j=1;j<parts.length;j++)s+=parts[j].neg?" - "+parts[j].term:" + "+parts[j].term;return s;}
  function lineStr(num,den,icpt){ var s="y = ";
    if(num!==0){ var an=Math.abs(num); var xt = den===1 ? (an===1?"x":an+"x") : "\\frac{"+an+"}{"+den+"}x"; s += (num<0?"-":"")+xt; }
    if(icpt!==0){ s += (num!==0 ? (icpt>0?" + ":" - ") : (icpt>0?"":"-")) + Math.abs(icpt); }
    else if(num===0){ s += "0"; }
    return "\\( "+s+" \\)"; }
  if(Math.random()<0.35){
    var triples=[[3,4,5],[4,3,5],[6,8,10],[8,6,10],[5,12,13],[12,5,13],[8,15,17],[15,8,17],[7,24,25],[24,7,25],[9,12,15],[20,21,29],[21,20,29]];
    var tr=pick(triples), sx=pick([-1,1]), sy=pick([-1,1]);
    var x0=sx*tr[0], y0=sy*tr[1], r=tr[2];
    function tv(cx,cy,rhs){ var s=""; var ax=Math.abs(cx), ay=Math.abs(cy);
      s += (cx<0?"-":"") + (ax===1?"x":ax+"x");
      s += (cy<0?" - ":" + ") + (ay===1?"y":ay+"y");
      return s+" = "+rhs; }
    var prompt="Find the equation of the tangent line to the circle \\( x^2 + y^2 = "+(r*r)+" \\) at the point \\( ("+x0+", "+y0+") \\).";
    var sol="Differentiate the relation implicitly: \\( 2x + 2y \\frac{dy}{dx} = 0 \\), so \\( \\frac{dy}{dx} = -\\frac{x}{y} \\). At \\( ("+x0+", "+y0+") \\) the slope is \\( -\\frac{"+x0+"}{"+y0+"} \\). Using this slope with the point gives \\[ \\begin{aligned} y - ("+y0+") &= -\\frac{"+x0+"}{"+y0+"} \\left( x - ("+x0+") \\right) \\\\ "+tv(x0,y0,r*r)+" \\end{aligned} \\] The tangent line is <b>\\( "+tv(x0,y0,r*r)+" \\)</b>.";
    return mcq(prompt, "\\( "+tv(x0,y0,r*r)+" \\)", ["\\( "+tv(y0,x0,r*r)+" \\)","\\( "+tv(x0,-y0,r*r)+" \\)","\\( "+tv(x0,y0,r)+" \\)"], sol, {mode:"implicit"});
  }
  var askNormal = Math.random()<0.45, ok=false, tries=0, m, x0, a, b, c, y0, ti, ni, nnum, nden, correct, cands;
  while(!ok&&tries<80){ tries++;
    m=pick([-5,-4,-3,-2,-1,1,2,3,4,5]); x0=ri(-3,3); a=pick([1,2,3]); b=m-2*a*x0; c=ri(-6,6);
    y0=a*x0*x0+b*x0+c; ti=y0-m*x0;
    nnum = m>0 ? -1 : 1; nden = Math.abs(m);
    if(x0 % m === 0) ni = y0 + x0/m; else ni = null;
    if(askNormal){ if(ni===null||ni===0) continue; correct=lineStr(nnum,nden,ni);
      cands=[lineStr(m,1,ti), lineStr(nnum,nden,-ni), lineStr(nnum,nden,0), lineStr(nnum,nden,ti)];
    } else { if(ti===0) continue; correct=lineStr(m,1,ti);
      cands=[lineStr(m,1,-ti), lineStr(m,1,0), lineStr(m,1,y0+m*x0)];
      if(ni!==null) cands.push(lineStr(nnum,nden,ni));
    }
    var seen={}, dists=[];
    cands.forEach(function(s){ if(s!==correct&&!seen[s]){ seen[s]=1; dists.push(s); } });
    if(dists.length>=3) ok=true;
  }
  var prompt="Find the equation of the "+(askNormal?"normal":"tangent")+" line to the graph of \\( f(x) = "+P([a,b,c])+" \\) at \\( x = "+x0+" \\).";
  var sol;
  if(askNormal){
    sol="The point on the graph is \\( ("+x0+", "+y0+") \\) and \\( f'(x) = "+P([2*a,b])+" \\) gives the tangent slope \\( f'("+x0+") = "+m+" \\). The normal line is perpendicular to the tangent, so its slope is the negative reciprocal, and it passes through \\( ("+x0+", "+y0+") \\). The normal line is <b>"+correct+"</b>.";
  } else {
    sol="The point on the graph is \\( ("+x0+", "+y0+") \\) and \\( f'(x) = "+P([2*a,b])+" \\) gives the slope \\( f'("+x0+") = "+m+" \\). A line with this slope through \\( ("+x0+", "+y0+") \\) has equation \\( y = "+m+"x + "+ti+" \\) after rearranging. The tangent line is <b>"+correct+"</b>.";
  }
  return mcq(prompt, correct, dists.slice(0,3), sol, {mode:askNormal?"normal":"tangent"});
});

E("u4-motion",4,["3.17"],2,"gen",function(){
  function P(cs){var n=cs.length-1,parts=[],i,c,p,t;for(i=0;i<cs.length;i++){c=cs[i];if(c===0)continue;p=n-i;if(p===0)t=""+Math.abs(c);else t=(Math.abs(c)===1?"":Math.abs(c))+(p===1?"t":"t^{"+p+"}");parts.push({neg:c<0,term:t});}
    if(!parts.length)return "0";var s=parts[0].neg?"-"+parts[0].term:parts[0].term;for(var j=1;j<parts.length;j++)s+=parts[j].neg?" - "+parts[j].term:" + "+parts[j].term;return s;}
  var mode=pick([0,0,1,2]);
  if(mode===2){
    var pairs=[[1,3],[1,5],[1,7],[1,9],[2,4],[2,6],[2,8],[3,5],[3,7],[3,9],[4,6],[4,8],[5,7],[5,9],[6,8]];
    var pr=pick(pairs), r1=pr[0], r2=pr[1], S=r1+r2, Pp=r1*r2;
    var prompt="A particle moves along a straight line with position \\( s(t) = "+P([1,-3*S/2,3*Pp,0])+" \\) metres after \\( t \\) seconds. The particle is momentarily at rest at two times with \\( t > 0 \\). Find the later of these two times, in seconds.";
    var sol="Velocity is the derivative of position. \\[ \\begin{aligned} v(t) = s'(t) &= "+P([3,-3*S,3*Pp])+" \\\\ &= 3 \\left( t - "+r1+" \\right) \\left( t - "+r2+" \\right) \\end{aligned} \\] The particle is at rest when \\( v(t) = 0 \\), at \\( t = "+r1+" \\) and \\( t = "+r2+" \\). The later time is <b>"+r2+" seconds</b>.";
    return numq(prompt, r2, 0.011, sol, {mode:"rest"});
  }
  var a3=pick([-2,-1,1,2,3]), b2=ri(-6,6), c1=ri(-9,9), d0=ri(0,20), t0=ri(1,5);
  var v=P([3*a3,2*b2,c1]), acc=P([6*a3,2*b2]);
  if(mode===0){
    var ansV=3*a3*t0*t0+2*b2*t0+c1;
    var prompt="A particle moves along a straight line with position \\( s(t) = "+P([a3,b2,c1,d0])+" \\) metres after \\( t \\) seconds. Find its velocity, in metres per second, at \\( t = "+t0+" \\).";
    var sol="Velocity is the derivative of position. \\[ \\begin{aligned} v(t) = s'(t) &= "+v+" \\\\ v("+t0+") &= "+ansV+" \\end{aligned} \\] The velocity is <b>"+ansV+" metres per second</b>.";
    return numq(prompt, ansV, 0.011, sol, {mode:"vel"});
  }
  var ansA=6*a3*t0+2*b2;
  var prompt="A particle moves along a straight line with position \\( s(t) = "+P([a3,b2,c1,d0])+" \\) metres after \\( t \\) seconds. Find its acceleration, in metres per second squared, at \\( t = "+t0+" \\).";
  var sol="Acceleration is the derivative of velocity, the second derivative of position. \\[ \\begin{aligned} v(t) &= "+v+" \\\\ a(t) &= "+acc+" \\\\ a("+t0+") &= "+ansA+" \\end{aligned} \\] The acceleration is <b>"+ansA+" metres per second squared</b>.";
  return numq(prompt, ansA, 0.011, sol, {mode:"acc"});
});

E("u4-differentiability-why",4,["3.8","3.9"],1,"var",varset([
  function(){return mcq("Consider \\( f(x) = |x - 2| \\). Why is \\( f \\) not differentiable at \\( x = 2 \\)?",
    "The graph has a corner there: the slope from the left is \\( -1 \\) and the slope from the right is \\( 1 \\), so no single tangent slope exists",
    ["The graph has a cusp there: the slopes from the two sides grow without bound in opposite directions at that point",
     "The function is not continuous there, and a function must be continuous at a point to be differentiable there, so this alone rules out a derivative",
     "The tangent line there is vertical: the slope grows without bound, so the derivative is not a finite number at that point"],
    "The graph of \\( |x - 2| \\) is a V with its vertex at \\( x = 2 \\). The function is continuous there, but the left-hand slope is \\( -1 \\) while the right-hand slope is \\( 1 \\); the two one-sided derivatives disagree, which is a corner. The function is not differentiable at \\( x = 2 \\) because <b>the graph has a corner there, with different slopes from the left and from the right</b>.",{});},
  function(){return mcq("Consider \\( f(x) = x^{2/3} \\). Why is \\( f \\) not differentiable at \\( x = 0 \\)?",
    "The graph has a cusp there: the slopes from the two sides grow without bound in opposite directions",
    ["The graph has a corner there: the slope from the left and the slope from the right are two different finite numbers",
     "The function is not continuous there, and a function must be continuous to be differentiable there",
     "The tangent line there is vertical: the slope grows without bound in the same direction from both sides"],
    "The derivative \\( f'(x) = \\frac{2}{3}x^{-1/3} \\) blows up as \\( x \\to 0 \\): it tends to \\( -\\infty \\) from the left and \\( +\\infty \\) from the right. The two branches of the graph meet in a sharp point with oppositely directed tangents, which is a cusp. The function is not differentiable at \\( x = 0 \\) because <b>the graph has a cusp there</b>.",{});},
  function(){return mcq("Consider \\( f(x) = \\begin{cases} x + 1, & x < 1 \\\\ x + 3, & x \\ge 1 \\end{cases} \\). Why is \\( f \\) not differentiable at \\( x = 1 \\)?",
    "The function is not continuous there, and a function must be continuous at a point to be differentiable there",
    ["The graph has a corner there: the slope from the left and the slope from the right are two different finite numbers",
     "The graph has a cusp there: the slopes from the two sides grow without bound in opposite directions",
     "The tangent line there is vertical: the slope grows without bound, so the derivative is not a finite number"],
    "From the left, the function values approach \\( 1 + 1 = 2 \\), but \\( f(1) = 1 + 3 = 4 \\): there is a jump, so \\( f \\) is not continuous at \\( x = 1 \\). Differentiability requires continuity, so the derivative cannot exist there. The function is not differentiable at \\( x = 1 \\) because <b>it is not continuous there</b>.",{});},
  function(){return mcq("Consider \\( f(x) = \\sqrt[3]{x} \\). Why is \\( f \\) not differentiable at \\( x = 0 \\)?",
    "The tangent line there is vertical: the slope grows without bound, so the derivative is not a finite number",
    ["The graph has a corner there: the slope from the left and the slope from the right are two different finite numbers",
     "The graph has a cusp there: the slopes from the two sides grow without bound in opposite directions",
     "The function is not continuous there, and a function must be continuous at a point to be differentiable there"],
    "The derivative \\( f'(x) = \\frac{1}{3}x^{-2/3} \\) tends to \\( +\\infty \\) as \\( x \\to 0 \\) from both sides. The graph is continuous and smooth through the point, but its tangent line is the vertical line \\( x = 0 \\), which has no finite slope. The function is not differentiable at \\( x = 0 \\) because <b>the tangent line there is vertical</b>.",{});},
  function(){return mcq("Consider \\( f(x) = \\begin{cases} 2x, & x \\le 1 \\\\ x + 1, & x > 1 \\end{cases} \\). Why is \\( f \\) not differentiable at \\( x = 1 \\)?",
    "The graph has a corner there: the slope from the left is \\( 2 \\) and the slope from the right is \\( 1 \\), so no single tangent slope exists",
    ["The function is not continuous there, and a function must be continuous at a point to be differentiable there, so this alone rules out a derivative",
     "The graph has a cusp there: the slopes from the two sides grow without bound in opposite directions at that point",
     "The tangent line there is vertical: the slope grows without bound, so the derivative is not a finite number at that point"],
    "Both pieces give the value 2 at \\( x = 1 \\), so the function is continuous there. But the left piece has slope 2 and the right piece has slope 1, so the graph changes direction abruptly: a corner. The function is not differentiable at \\( x = 1 \\) because <b>the graph has a corner there, with different slopes from the left and from the right</b>.",{});}
]));

E("u4-derivative-graph-features",4,["3.10","3.11"],2,"gen",function(){
  if(Math.random()<0.5){
    var p=ri(-4,4), c=ri(-9,9);
    function P(cs){var n=cs.length-1,parts=[],i,cc,pp,t;for(i=0;i<cs.length;i++){cc=cs[i];if(cc===0)continue;pp=n-i;if(pp===0)t=""+Math.abs(cc);else t=(Math.abs(cc)===1?"":Math.abs(cc))+(pp===1?"x":"x^{"+pp+"}");parts.push({neg:cc<0,term:t});}
      if(!parts.length)return "0";var s=parts[0].neg?"-"+parts[0].term:parts[0].term;for(var j=1;j<parts.length;j++)s+=parts[j].neg?" - "+parts[j].term:" + "+parts[j].term;return s;}
    var prompt="For \\( f(x) = "+P([1,-2*p,c])+" \\), which statement describes \\( f'(x) \\) correctly?";
    var correct="\\( f'(x) < 0 \\) for \\( x < "+p+" \\), \\( f'(x) = 0 \\) at \\( x = "+p+" \\), and \\( f'(x) > 0 \\) for \\( x > "+p+" \\)";
    var d1="\\( f'(x) > 0 \\) for \\( x < "+p+" \\), \\( f'(x) = 0 \\) at \\( x = "+p+" \\), and \\( f'(x) < 0 \\) for \\( x > "+p+" \\)";
    var d2="\\( f'(x) < 0 \\) for \\( x < "+p+" \\), \\( f'(x) \\) does not exist at \\( x = "+p+" \\), and \\( f'(x) > 0 \\) for \\( x > "+p+" \\)";
    var d3="\\( f'(x) > 0 \\) for every \\( x \\ne "+p+" \\), and \\( f'(x) = 0 \\) at \\( x = "+p+" \\)";
    var sol="Here \\( f'(x) = "+(2*p>=0 ? "2x - "+(2*p) : "2x + "+(-2*p))+" = 2 \\left( x - ("+p+") \\right) \\), a linear function with a zero at \\( x = "+p+" \\). It is negative to the left of its zero and positive to the right, and it exists everywhere since the parabola is smooth. The correct description is <b>"+correct+"</b>.";
    return mcq(prompt, correct, [d1,d2,d3], sol, {mode:"parabola"});
  }
  var p=ri(-5,5);
  var absStr = p>=0 ? "|x - "+p+"|" : "|x + "+(-p)+"|";
  var prompt="For \\( f(x) = "+absStr+" \\), which statement describes \\( f'(x) \\) correctly?";
  var correct="\\( f'(x) = -1 \\) for \\( x < "+p+" \\), \\( f'(x) = 1 \\) for \\( x > "+p+" \\), and \\( f'(x) \\) does not exist at \\( x = "+p+" \\)";
  var d1="\\( f'(x) = 1 \\) for \\( x < "+p+" \\), \\( f'(x) = -1 \\) for \\( x > "+p+" \\), and \\( f'(x) \\) does not exist at \\( x = "+p+" \\)";
  var d2="\\( f'(x) = -1 \\) for \\( x < "+p+" \\), \\( f'(x) = 1 \\) for \\( x > "+p+" \\), and \\( f'(x) = 0 \\) at \\( x = "+p+" \\)";
  var d3="\\( f'(x) = 1 \\) for \\( x < "+p+" \\) and for \\( x > "+p+" \\), and \\( f'(x) \\) does not exist at \\( x = "+p+" \\)";
  var sol="The graph is a V with its vertex at \\( x = "+p+" \\). To the left of the vertex the graph falls with slope \\( -1 \\); to the right it rises with slope \\( 1 \\). At the vertex the two slopes disagree, so the derivative does not exist there. The correct description is <b>"+correct+"</b>.";
  return mcq(prompt, correct, [d1,d2,d3], sol, {mode:"abs"});
});

E("u4-sketch-from-derivative",4,["3.12"],3,"gen",function(){
  var p=ri(-6,3), q=p+ri(2,6), pattern=pick([0,1]);
  var prompt, correct, d1, d2, d3, sol;
  if(pattern===0){
    prompt="The derivative of a function \\( f \\) satisfies: \\( f'(x) > 0 \\) on \\( (-\\infty, "+p+") \\), \\( f'(x) < 0 \\) on \\( ("+p+", "+q+") \\), \\( f'(x) > 0 \\) on \\( ("+q+", \\infty) \\), and \\( f'("+p+") = f'("+q+") = 0 \\). Which statement describes \\( f \\)?";
    correct="\\( f \\) is increasing on \\( (-\\infty, "+p+") \\) and \\( ("+q+", \\infty) \\), decreasing on \\( ("+p+", "+q+") \\), with a local maximum at \\( x = "+p+" \\) and a local minimum at \\( x = "+q+" \\)";
    d1="\\( f \\) is increasing on \\( (-\\infty, "+p+") \\) and \\( ("+q+", \\infty) \\), decreasing on \\( ("+p+", "+q+") \\), with a local minimum at \\( x = "+p+" \\) and a local maximum at \\( x = "+q+" \\)";
    d2="The graph of \\( f \\) lies above the \\( x \\)-axis on \\( (-\\infty, "+p+") \\) and \\( ("+q+", \\infty) \\) and below it on \\( ("+p+", "+q+") \\), crossing the axis at \\( x = "+p+" \\) and \\( x = "+q+" \\)";
    d3="\\( f \\) is decreasing on \\( (-\\infty, "+p+") \\) and \\( ("+q+", \\infty) \\), increasing on \\( ("+p+", "+q+") \\), with a local minimum at \\( x = "+p+" \\) and a local maximum at \\( x = "+q+" \\)";
    sol="A positive derivative means the function is increasing, and a negative derivative means it is decreasing. The derivative changes from positive to negative at \\( x = "+p+" \\), so \\( f \\) has a local maximum there; it changes from negative to positive at \\( x = "+q+" \\), so \\( f \\) has a local minimum there. Nothing in the sign of \\( f' \\) says where the graph of \\( f \\) itself sits relative to the axis. The correct description is <b>"+correct+"</b>.";
  } else {
    prompt="The derivative of a function \\( f \\) satisfies: \\( f'(x) < 0 \\) on \\( (-\\infty, "+p+") \\), \\( f'(x) > 0 \\) on \\( ("+p+", "+q+") \\), \\( f'(x) < 0 \\) on \\( ("+q+", \\infty) \\), and \\( f'("+p+") = f'("+q+") = 0 \\). Which statement describes \\( f \\)?";
    correct="\\( f \\) is decreasing on \\( (-\\infty, "+p+") \\) and \\( ("+q+", \\infty) \\), increasing on \\( ("+p+", "+q+") \\), with a local minimum at \\( x = "+p+" \\) and a local maximum at \\( x = "+q+" \\)";
    d1="\\( f \\) is decreasing on \\( (-\\infty, "+p+") \\) and \\( ("+q+", \\infty) \\), increasing on \\( ("+p+", "+q+") \\), with a local maximum at \\( x = "+p+" \\) and a local minimum at \\( x = "+q+" \\)";
    d2="The graph of \\( f \\) lies below the \\( x \\)-axis on \\( (-\\infty, "+p+") \\) and \\( ("+q+", \\infty) \\) and above it on \\( ("+p+", "+q+") \\), crossing the axis at \\( x = "+p+" \\) and \\( x = "+q+" \\)";
    d3="\\( f \\) is increasing on \\( (-\\infty, "+p+") \\) and \\( ("+q+", \\infty) \\), decreasing on \\( ("+p+", "+q+") \\), with a local maximum at \\( x = "+p+" \\) and a local minimum at \\( x = "+q+" \\)";
    sol="A negative derivative means the function is decreasing, and a positive derivative means it is increasing. The derivative changes from negative to positive at \\( x = "+p+" \\), so \\( f \\) has a local minimum there; it changes from positive to negative at \\( x = "+q+" \\), so \\( f \\) has a local maximum there. Nothing in the sign of \\( f' \\) says where the graph of \\( f \\) itself sits relative to the axis. The correct description is <b>"+correct+"</b>.";
  }
  return mcq(prompt, correct, [d1,d2,d3], sol, {pattern:pattern});
});

E("u4-implicit",4,["3.18"],3,"gen",function(){
  var mode=ri(0,2);
  if(mode===0){
    var triples=[[3,4,5],[4,3,5],[6,8,10],[8,6,10],[5,12,13],[12,5,13],[8,15,17],[15,8,17],[7,24,25],[24,7,25],[9,12,15],[20,21,29]];
    var tr=pick(triples), x0=pick([-1,1])*tr[0], y0=pick([-1,1])*tr[1], r=tr[2], ans=-x0/y0;
    var prompt="For the circle \\( x^2 + y^2 = "+(r*r)+" \\), find \\( \\frac{dy}{dx} \\) at the point \\( ("+x0+", "+y0+") \\).";
    var sol="Differentiate both sides with respect to \\( x \\), treating \\( y \\) as a function of \\( x \\). \\[ \\begin{aligned} 2x + 2y \\frac{dy}{dx} &= 0 \\\\ \\frac{dy}{dx} &= -\\frac{x}{y} \\\\ &= \\frac{"+(-x0)+"}{"+y0+"} = "+fmt(ans)+" \\end{aligned} \\] At the point, <b>\\( \\frac{dy}{dx} = "+fmt(ans)+" \\)</b>.";
    return numq(prompt, ans, 0.011, sol, {mode:"circle"});
  }
  if(mode===1){
    var x0=ri(-4,4), y0=ri(-4,4), guard=0;
    while((x0+2*y0===0||(x0===0&&y0===0))&&guard<60){ x0=ri(-4,4); y0=ri(-4,4); guard++; }
    var K=x0*x0+x0*y0+y0*y0, ans=-(2*x0+y0)/(x0+2*y0);
    var prompt="For the curve \\( x^2 + xy + y^2 = "+K+" \\), find \\( \\frac{dy}{dx} \\) at the point \\( ("+x0+", "+y0+") \\).";
    var sol="Differentiate term by term, using the product rule on the \\( xy \\) term and the chain rule on terms in \\( y \\). \\[ \\begin{aligned} 2x + y + x \\frac{dy}{dx} + 2y \\frac{dy}{dx} &= 0 \\\\ \\frac{dy}{dx} \\left( x + 2y \\right) &= - \\left( 2x + y \\right) \\\\ \\frac{dy}{dx} &= -\\frac{2x + y}{x + 2y} \\\\ &= -\\frac{"+(2*x0+y0)+"}{"+(x0+2*y0)+"} = "+fmt(ans)+" \\end{aligned} \\] At the point, <b>\\( \\frac{dy}{dx} = "+fmt(ans)+" \\)</b>.";
    return numq(prompt, ans, 0.011, sol, {mode:"curve"});
  }
  var a=pick([2,3,4,5,9]), K=ri(10,60);
  var prompt="Find \\( \\frac{dy}{dx} \\) for the relation \\( x^2 + "+a+"y^2 = "+K+" \\).";
  var sol="Differentiate both sides with respect to \\( x \\), applying the chain rule to the term in \\( y \\), then solve for \\( \\frac{dy}{dx} \\). \\[ \\begin{aligned} 2x + "+(2*a)+"y \\frac{dy}{dx} &= 0 \\\\ \\frac{dy}{dx} &= \\frac{-2x}{"+(2*a)+"y} = \\frac{-x}{"+a+"y} \\end{aligned} \\] The derivative is <b>\\( \\frac{dy}{dx} = \\frac{-x}{"+a+"y} \\)</b>.";
  return mcq(prompt, "\\( \\frac{-x}{"+a+"y} \\)", ["\\( \\frac{x}{"+a+"y} \\)","\\( \\frac{-"+a+"y}{x} \\)","\\( \\frac{-x}{y} \\)"], sol, {mode:"expr"});
});

E("u4-implicit-second",4,["3.20"],3,"gen",function(){
  if(Math.random()<0.5){
    var pairs=[[5,3],[5,4],[10,6],[10,8],[13,5],[13,12],[17,8],[17,15],[25,7],[25,24],[26,10],[26,24],[29,20],[29,21],[15,9],[15,12],[20,12],[20,16]];
    var pr=pick(pairs), r=pr[0], ya=pr[1], xa=Math.sqrt(r*r-ya*ya);
    var x0=pick([-1,1])*xa, y0=pick([-1,1])*ya, ans=-(r*r)/(y0*y0*y0);
    var prompt="For the circle \\( x^2 + y^2 = "+(r*r)+" \\), find \\( \\frac{d^2y}{dx^2} \\) at the point \\( ("+x0+", "+y0+") \\).";
    var sol="First, implicit differentiation gives \\( \\frac{dy}{dx} = -\\frac{x}{y} \\). Differentiate again, using the quotient rule and then substituting \\( \\frac{dy}{dx} \\) back in. \\[ \\begin{aligned} \\frac{d^2y}{dx^2} &= -\\frac{y - x \\frac{dy}{dx}}{y^2} \\\\ &= -\\frac{y + \\frac{x^2}{y}}{y^2} \\\\ &= -\\frac{x^2 + y^2}{y^3} \\\\ &= \\frac{"+(-(r*r))+"}{"+(y0*y0*y0)+"} = "+fmt(ans)+" \\end{aligned} \\] At the point, <b>\\( \\frac{d^2y}{dx^2} = "+fmt(ans)+" \\)</b>.";
    return numq(prompt, ans, 0.011, sol, {mode:"circle"});
  }
  var x0=pick([-5,-4,-3,-2,-1,1,2,3,4,5]), y0=pick([-4,-3,-2,-1,1,2,3,4]), k=x0*y0, ans=2*y0/(x0*x0);
  var prompt="For the curve \\( xy = "+k+" \\), find \\( \\frac{d^2y}{dx^2} \\) at the point \\( ("+x0+", "+y0+") \\).";
  var sol="Differentiate implicitly, using the product rule on the left side. \\[ \\begin{aligned} y + x \\frac{dy}{dx} &= 0 \\\\ \\frac{dy}{dx} &= -\\frac{y}{x} \\end{aligned} \\] Differentiate the first equation again and substitute \\( \\frac{dy}{dx} = -\\frac{y}{x} \\). \\[ \\begin{aligned} 2 \\frac{dy}{dx} + x \\frac{d^2y}{dx^2} &= 0 \\\\ \\frac{d^2y}{dx^2} &= -\\frac{2}{x} \\cdot \\frac{dy}{dx} = \\frac{2y}{x^2} \\\\ &= \\frac{"+(2*y0)+"}{"+(x0*x0)+"} = "+fmt(ans)+" \\end{aligned} \\] At the point, <b>\\( \\frac{d^2y}{dx^2} = "+fmt(ans)+" \\)</b>.";
  return numq(prompt, ans, 0.011, sol, {mode:"hyperbola"});
});

E("u4-tangent-parameter",4,["3.17"],3,"gen",function(){
  function L(p,q){var s="";if(p!==0)s+=(p===1?"x":p===-1?"-x":p+"x");if(q!==0){if(s)s+=(q>0?" + ":" - ")+Math.abs(q);else s=""+q;}if(!s)s="0";return s;}
  function P(cs){var n=cs.length-1,parts=[],i,c,p,t;for(i=0;i<cs.length;i++){c=cs[i];if(c===0)continue;p=n-i;if(p===0)t=""+Math.abs(c);else t=(Math.abs(c)===1?"":Math.abs(c))+(p===1?"x":"x^{"+p+"}");parts.push({neg:c<0,term:t});}
    if(!parts.length)return "0";var s=parts[0].neg?"-"+parts[0].term:parts[0].term;for(var j=1;j<parts.length;j++)s+=parts[j].neg?" - "+parts[j].term:" + "+parts[j].term;return s;}
  function sg(v){return v>0 ? " + "+v : (v<0 ? " - "+(-v) : "");}
  if(Math.random()<0.6){
    var m=ri(-4,6), dE=pick([-8,-6,-4,-2,0,2,4,6,8]), b=m+dE, c=ri(-6,6), k=c+dE*dE/4;
    var prompt="Find the value of \\( k \\) for which the line \\( y = "+L(m,c)+" \\) is tangent to the parabola \\( y = "+P([1,b,0])+" + k \\).";
    var sol="At a point of tangency the line and the parabola meet in exactly one point, so setting them equal must give a repeated root. \\[ \\begin{aligned} x^2 + \\left( "+(b-m)+" \\right) x + \\left( k - ("+c+") \\right) &= 0 \\\\ \\left( "+(b-m)+" \\right)^2 - 4 \\left( k - ("+c+") \\right) &= 0 \\\\ k &= "+c+" + \\frac{"+((b-m)*(b-m))+"}{4} = "+k+" \\end{aligned} \\] The discriminant of the combined equation must be zero, which forces <b>\\( k = "+k+" \\)</b>.";
    return numq(prompt, k, 0.011, sol, {mode:"line"});
  }
  var s=pick([2,3,4,5,6]), b=ri(-6,6), c=b+s*s, a=2*s;
  var prompt="Find the positive value of \\( a \\) for which the line \\( y = ax"+sg(b)+" \\) is tangent to the parabola \\( y = x^2"+sg(c)+" \\).";
  var sol="Let the point of tangency be \\( x_0 \\). Matching slopes there gives \\( a = 2x_0 \\), and the point lies on both graphs. \\[ \\begin{aligned} x_0^2 + ("+c+") &= a x_0 + ("+b+") \\\\ \\frac{a^2}{4} + ("+c+") &= \\frac{a^2}{2} + ("+b+") \\\\ \\frac{a^2}{4} &= "+(c-b)+" \\\\ a &= "+a+" \\end{aligned} \\] The positive value is <b>\\( a = "+a+" \\)</b>.";
  return numq(prompt, a, 0.011, sol, {mode:"slope"});
});

E("u4-chain-values",4,["3.16"],3,"gen",function(){
  function nz(){ return pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]); }
  var a0=pick([1,2,3]), v=pick([1,2,3,4]), w=pick([2,3,4,5]);
  while(v===a0) v=pick([1,2,3,4]);
  while(w===a0) w=pick([2,3,4,5]);
  var gpA=nz(), fpV=nz(), fpA=nz(), gpW=nz();
  var values="\\( f("+a0+") = "+w+" \\), \\( g("+a0+") = "+v+" \\), \\( f'("+a0+") = "+fpA+" \\), \\( g'("+a0+") = "+gpA+" \\), \\( f'("+v+") = "+fpV+" \\), and \\( g'("+w+") = "+gpW+" \\)";
  if(Math.random()<0.5){
    var ans=fpV*gpA;
    var prompt="Values of two differentiable functions and their derivatives are given: "+values+". If \\( h(x) = f(g(x)) \\), find \\( h'("+a0+") \\).";
    var sol="By the chain rule, \\( h'(x) = f'(g(x)) \\cdot g'(x) \\). Read off the needed values: \\( g("+a0+") = "+v+" \\), so \\( f'(g("+a0+")) = f'("+v+") = "+fpV+" \\), and \\( g'("+a0+") = "+gpA+" \\). \\[ \\begin{aligned} h'("+a0+") &= "+fpV+" \\cdot "+gpA+" \\\\ &= "+ans+" \\end{aligned} \\] The value is <b>\\( h'("+a0+") = "+ans+" \\)</b>.";
    return numq(prompt, ans, 0.011, sol, {mode:"fog"});
  }
  var ans=gpW*fpA;
  var prompt="Values of two differentiable functions and their derivatives are given: "+values+". If \\( h(x) = g(f(x)) \\), find \\( h'("+a0+") \\).";
  var sol="By the chain rule, \\( h'(x) = g'(f(x)) \\cdot f'(x) \\). Read off the needed values: \\( f("+a0+") = "+w+" \\), so \\( g'(f("+a0+")) = g'("+w+") = "+gpW+" \\), and \\( f'("+a0+") = "+fpA+" \\). \\[ \\begin{aligned} h'("+a0+") &= "+gpW+" \\cdot "+fpA+" \\\\ &= "+ans+" \\end{aligned} \\] The value is <b>\\( h'("+a0+") = "+ans+" \\)</b>.";
  return numq(prompt, ans, 0.011, sol, {mode:"gof"});
});

/* ============ External drafting pilot tranche (November 18, 2026) ============
   Nineteen entries drafted externally (Gemini) under the External
   Authoring Pack against the Math 3208 Unit 4 pilot assignment, and
   integrated after the intake sweep: 3,000 draws per entry with every
   key recomputed independently from the dealt parameters, plus the
   distractor length scan and the bank overlap check. Four entries
   carry intake repairs, each listed in the pilot intake report
   (Pilot-Intake-Report-Math-3208-Gemini-2026-11-18, review apps goal
   files). Three assigned entries were rejected from this tranche at
   intake (u4-product-rule-derive, u4-differentiability-point and
   u4-motion-direction); they appear at the end of this file in the
   swap tranche of November 18, 2026, in their ChatGPT versions. */

E("u4-average-rate-secant-slope",4,["3.2"],1,"gen",function(){
  function gcd(x,y){x=Math.abs(x);y=Math.abs(y);while(y){var u=y;y=x%y;x=u;}return x||1;}
  function fr(n,d){if(d<0){n=-n;d=-d;}var g=gcd(n,d);n/=g;d/=g;return d===1?""+n:"\\frac{"+n+"}{"+d+"}";}
  var a,b,c,xs,ys,i1,i2,x1,x2,y1,y2,dy,dx,key,ds,tries=0;
  do{
    tries++;
    a=pick([-2,-1,1,2]);b=ri(-3,3);c=ri(-4,6);
    var start=ri(-2,1);
    xs=[start,start+1,start+2,start+3,start+4];
    ys=xs.map(function(x){return a*x*x+b*x+c;});
    i1=ri(0,2);i2=ri(i1+1,4);
    x1=xs[i1];x2=xs[i2];y1=ys[i1];y2=ys[i2];
    dy=y2-y1;dx=x2-x1;
    if(dy===0||Math.abs(dy)===dx){ds=null;continue;}
    key="\\("+fr(dy,dx)+"\\)";
    var cands=["\\("+fr(-dy,dx)+"\\)","\\("+fr(dx,dy)+"\\)","\\("+dy+"\\)","\\("+fr(-dx,dy)+"\\)"];
    ds=[];
    for(var i=0;i<cands.length&&ds.length<3;i++){if(cands[i]!==key&&ds.indexOf(cands[i])<0)ds.push(cands[i]);}
    if(ds.length<3)ds=null;
  }while(!ds&&tries<80);
  var rowX="\\(x\\): "+xs.map(function(v){return "\\("+v+"\\)";}).join(", ");
  var rowY="\\(f(x)\\): "+ys.map(function(v){return "\\("+v+"\\)";}).join(", ");
  return mcq("A table of values for a function \\(f\\) is given below:<br>"+rowX+"<br>"+rowY+"<br>Find the average rate of change of \\(f\\) over the interval \\(["+x1+", "+x2+"]\\).",
    key,ds,
    "The average rate of change over \\(["+x1+", "+x2+"]\\) is \\[\\frac{f("+x2+") - f("+x1+")}{"+x2+" - ("+x1+")} = \\frac{"+y2+" - ("+y1+")}{"+dx+"} = "+fr(dy,dx)+".\\]The average rate of change is <b>"+key+"</b>.",
    {a:a,b:b,c:c,x1:x1,x2:x2,y1:y1,y2:y2});
});

E("u4-average-rate-context",4,["3.2"],2,"gen",function(){
  var ctx=ri(0,2);
  var t1,t2,v1,v2,ans,prompt,sol,params;
  if(ctx===0){
    var v0=pick([16,20,24,28]),h0=ri(1,5);
    t1=ri(0,1);t2=t1+ri(1,2);
    v1=-5*t1*t1+v0*t1+h0;v2=-5*t2*t2+v0*t2+h0;
    ans=(v2-v1)/(t2-t1);
    prompt="The height \\(h\\) (in metres) of a ball thrown upward after \\(t\\) seconds is given by \\(h(t) = -5t^2 + "+v0+"t + "+h0+"\\). Find the average velocity of the ball, in \\(\\text{m/s}\\), from \\(t = "+t1+"\\) to \\(t = "+t2+"\\).";
    sol="Evaluate \\(h(t)\\) at the endpoints: \\(h("+t1+") = "+v1+"\\) and \\(h("+t2+") = "+v2+"\\). The average velocity is \\[\\frac{h("+t2+") - h("+t1+")}{"+t2+" - "+t1+"} = \\frac{"+v2+" - "+v1+"}{"+(t2-t1)+"} = "+ans+"\\text{ m/s}.\\]The average velocity is <b>\\("+ans+"\\)</b> \\(\\text{m/s}\\).";
    params={ctx:ctx,v0:v0,h0:h0,t1:t1,t2:t2};
  }else if(ctx===1){
    var a=pick([-1,1]),b=ri(2,6),c=ri(4,12);
    t1=ri(0,2);t2=t1+ri(2,4);
    v1=a*t1*t1+b*t1+c;v2=a*t2*t2+b*t2+c;
    ans=(v2-v1)/(t2-t1);
    var quad=(a===1?"t^2":"-t^2")+" + "+b+"t + "+c;
    prompt="The air temperature \\(T\\) (in \\(^\\circ\\text{C}\\)) \\(t\\) hours after sunrise is modelled by \\(T(t) = "+quad+"\\). Find the average rate of change of temperature, in \\(^\\circ\\text{C/h}\\), from \\(t = "+t1+"\\) to \\(t = "+t2+"\\).";
    sol="Evaluate \\(T(t)\\) at the endpoints: \\(T("+t1+") = "+v1+"\\) and \\(T("+t2+") = "+v2+"\\). The average rate of change is \\[\\frac{T("+t2+") - T("+t1+")}{"+t2+" - "+t1+"} = \\frac{"+v2+" - "+v1+"}{"+(t2-t1)+"} = "+ans+"^\\circ\\text{C/h}.\\]The average rate of change is <b>\\("+ans+"\\)</b> \\(^\\circ\\text{C/h}\\).";
    params={ctx:ctx,a:a,b:b,c:c,t1:t1,t2:t2};
  }else{
    var a2=pick([-2,-1]),b2=ri(8,14),c2=ri(10,25);
    t1=ri(0,1);t2=t1+ri(1,3);
    v1=a2*t1*t1+b2*t1+c2;v2=a2*t2*t2+b2*t2+c2;
    ans=(v2-v1)/(t2-t1);
    prompt="The depth \\(d\\) (in centimetres) of water in a tank \\(t\\) minutes after a valve opens is given by \\(d(t) = "+a2+"t^2 + "+b2+"t + "+c2+"\\). Find the average rate of change of the water depth, in \\(\\text{cm/min}\\), over \\(["+t1+", "+t2+"]\\).";
    sol="Evaluate \\(d(t)\\) at the endpoints: \\(d("+t1+") = "+v1+"\\) and \\(d("+t2+") = "+v2+"\\). The average rate of change is \\[\\frac{d("+t2+") - d("+t1+")}{"+t2+" - "+t1+"} = \\frac{"+v2+" - "+v1+"}{"+(t2-t1)+"} = "+ans+"\\text{ cm/min}.\\]The average rate of change is <b>\\("+ans+"\\)</b> \\(\\text{cm/min}\\).";
    params={ctx:ctx,a:a2,b:b2,c:c2,t1:t1,t2:t2};
  }
  return numq(prompt,ans,0.011,sol,params);
});

E("u4-instantaneous-estimate",4,["3.3"],2,"gen",function(){
  var a=ri(-3,4);
  var k=pick([-4,-3,-2,2,3,4,5]);
  var L=pick([-12,-9,-6,-4,-3,3,4,6,8,9,12,15]);
  var r1=L+k,r2=L+0.1*k,r3=L+0.01*k;
  var mean=Math.round(((r1+r2+r3)/3)*100)/100;
  var over=L-k;
  var key="\\("+L+"\\)";
  var ds=["\\("+fmt(r1,2)+"\\)","\\("+fmt(mean,2)+"\\)","\\("+over+"\\)"];
  return mcq("For a function \\(f\\), the average rates of change over intervals \\(["+a+", "+a+" + h]\\) are recorded as \\(h\\) approaches \\(0\\):<br>\\(h = 1\\): \\("+fmt(r1,2)+"\\)<br>\\(h = 0.1\\): \\("+fmt(r2,2)+"\\)<br>\\(h = 0.01\\): \\("+fmt(r3,2)+"\\)<br>Based on this trend, estimate the instantaneous rate of change of \\(f\\) at \\(x = "+a+"\\).",
    key,ds,
    "As \\(h\\) shrinks toward \\(0\\) through \\(1, 0.1, 0.01\\), the average rates \\("+fmt(r1,2)+", "+fmt(r2,2)+", "+fmt(r3,2)+"\\) approach \\("+L+"\\). The instantaneous rate of change at \\(x = "+a+"\\) is the limiting value of these average rates, which is <b>"+key+"</b>.",
    {a:a,k:k,L:L,r1:r1,r2:r2,r3:r3});
});

E("u4-instantaneous-meaning",4,["3.3"],1,"gen",function(){
  var mode=ri(0,2);
  var t0,rate,key,ds,prompt,sol;
  if(mode===0){
    t0=ri(2,8);rate=ri(4,15);
    prompt="Water flows into a storage tank so that \\(V(t)\\) gives the volume in litres after \\(t\\) minutes. If the instantaneous rate of change at \\(t = "+t0+"\\) is \\("+rate+"\\), what does this value represent?";
    key="The tank is filling at \\("+rate+"\\text{ L/min}\\) at \\(t = "+t0+"\\text{ min}\\)";
    ds=[
      "The tank is filling at \\("+rate+"\\text{ min/L}\\) at \\(t = "+t0+"\\text{ min}\\)",
      "The tank contains a total of \\("+rate+"\\text{ L}\\) at \\(t = "+t0+"\\text{ min}\\)",
      "The tank filled at an average of \\("+rate+"\\text{ L/min}\\) over \\("+t0+"\\text{ min}\\)"
    ];
    sol="The derivative \\(V'("+t0+") = "+rate+"\\) measures the instantaneous rate of change of volume with respect to time at the single moment \\(t = "+t0+"\\), with units \\(\\text{L/min}\\). Thus, <b>"+key+"</b>.";
  }else if(mode===1){
    t0=ri(1,5);rate=ri(50,95);
    prompt="A car travels along a highway so that \\(s(t)\\) gives its distance in kilometres after \\(t\\) hours. If the instantaneous rate of change at \\(t = "+t0+"\\) is \\("+rate+"\\), what does this value represent?";
    key="The car is travelling at \\("+rate+"\\text{ km/h}\\) at \\(t = "+t0+"\\text{ h}\\)";
    ds=[
      "The car is travelling at \\("+rate+"\\text{ h/km}\\) at \\(t = "+t0+"\\text{ h}\\)",
      "The car has travelled a total of \\("+rate+"\\text{ km}\\) at \\(t = "+t0+"\\text{ h}\\)",
      "The car averaged \\("+rate+"\\text{ km/h}\\) over the first \\("+t0+"\\text{ h}\\)"
    ];
    sol="The derivative \\(s'("+t0+") = "+rate+"\\) measures the instantaneous speed at the exact moment \\(t = "+t0+"\\), with units \\(\\text{km/h}\\). Thus, <b>"+key+"</b>.";
  }else{
    t0=ri(3,10);rate=ri(2,9);
    prompt="A bakery produces loaves of bread where \\(C(x)\\) is the total cost in dollars of baking \\(x\\) hundred loaves. If the instantaneous rate of change at \\(x = "+t0+"\\) is \\("+rate+"\\), what does this value represent?";
    key="Cost is rising at \\(\\$"+rate+"\\) per hundred loaves at \\(x = "+t0+"\\)";
    ds=[
      "Output is rising at \\("+rate+"\\) hundred loaves per dollar at \\(x = "+t0+"\\)",
      "The total cost of baking \\("+t0+"\\) hundred loaves is \\(\\$"+rate+"\\)",
      "The average cost across all \\("+t0+"\\) hundred loaves is \\(\\$"+rate+"\\)"
    ];
    sol="The derivative \\(C'("+t0+") = "+rate+"\\) gives the instantaneous rate of change of cost per unit of output at \\(x = "+t0+"\\). Thus, <b>"+key+"</b>.";
  }
  return mcq(prompt,key,ds,sol,{mode:mode,t0:t0,rate:rate});
});

E("u4-definition-h-form",4,["3.4"],2,"gen",function(){
  function P(a,b,c){
    var s="";
    if(a!==0)s+=(a===1?"":a===-1?"-":a)+"x^2";
    if(b!==0)s+=(s?(b>0?" + ":" - "):(b<0?"-":""))+(Math.abs(b)===1?"":Math.abs(b))+"x";
    if(c!==0)s+=(s?(c>0?" + ":" - "):(c<0?"-":""))+Math.abs(c);
    return s||"0";
  }
  var a=pick([-3,-2,-1,1,2,3]),b=ri(-5,5),c=ri(-6,6),x0=ri(-3,3);
  var ans=2*a*x0+b;
  var fx0=a*x0*x0+b*x0+c;
  var lin=2*a*x0+b;
  var numClean=lin===0?(""+a+"h^2"):((lin===1?"":lin===-1?"-":lin)+"h")+(a>0?" + "+a+"h^2":" - "+Math.abs(a)+"h^2");
  var factored=lin===0?("h("+a+"h)"):("h("+lin+(a>0?" + "+a+"h":" - "+Math.abs(a)+"h")+")");
  return numq("Use the limit definition \\(f'("+x0+") = \\lim_{h \\to 0} \\frac{f("+x0+" + h) - f("+x0+")}{h}\\) to find \\(f'("+x0+")\\) for \\(f(x) = "+P(a,b,c)+"\\).",
    ans,0.011,
    "First find \\(f("+x0+") = "+fx0+"\\) and expand \\(f("+x0+" + h)\\):\\[\\begin{aligned}f("+x0+" + h) &= "+a+"("+x0+" + h)^2"+(b>=0?" + "+b:" - "+Math.abs(b))+"("+x0+" + h)"+(c>=0?" + "+c:" - "+Math.abs(c))+" \\\\ &= "+fx0+(lin>=0?" + "+lin:" - "+Math.abs(lin))+"h"+(a>0?" + "+a:" - "+Math.abs(a))+"h^2.\\end{aligned}\\]Substitute into the limit definition and cancel \\(h\\):\\[\\begin{aligned}f'("+x0+") &= \\lim_{h \\to 0} \\frac{("+fx0+(lin>=0?" + "+lin:" - "+Math.abs(lin))+"h"+(a>0?" + "+a:" - "+Math.abs(a))+"h^2) - ("+fx0+")}{h} \\\\ &= \\lim_{h \\to 0} \\frac{"+numClean+"}{h} = \\lim_{h \\to 0} \\frac{"+factored+"}{h} = \\lim_{h \\to 0} ("+lin+(a>0?" + "+a:" - "+Math.abs(a))+"h) = "+ans+".\\end{aligned}\\]Therefore, \\(f'("+x0+") = \\) <b>\\("+ans+"\\)</b>.",
    {a:a,b:b,c:c,x0:x0});
});

E("u4-definition-identify",4,["3.4"],2,"gen",function(){
  var a,b,x0,fx0,der,expr,key,ds,tries=0;
  do{
    tries++;
    a=pick([2,3,4]);b=pick([-5,-4,-3,-2,2,3,4,5]);x0=pick([-3,-2,-1,1,2,3]);
    fx0=a*x0*x0+b*x0;
    der=2*a*x0+b;
    if(x0===der||x0===-x0){ds=null;continue;}
    var bStr=b>0?" + "+b+"x":" - "+Math.abs(b)+"x";
    var bAlt=b>0?" - "+b+"x":" + "+Math.abs(b)+"x";
    var fx0Str=fx0>=0?" - "+fx0:" + "+Math.abs(fx0);
    expr="\\lim_{h \\to 0} \\frac{"+a+"("+x0+" + h)^2"+(b>0?" + "+b:" - "+Math.abs(b))+"("+x0+" + h)"+fx0Str+"}{h}";
    key="\\(f(x) = "+a+"x^2"+bStr+"\\) at \\(x = "+x0+"\\)";
    var cands=[
      "\\(f(x) = "+a+"x^2"+bStr+"\\) at \\(x = "+(-x0)+"\\)",
      "\\(f(x) = "+a+"x^2"+bStr+"\\) at \\(x = "+der+"\\)",
      "\\(f(x) = "+b+"x^2 + "+a+"x\\) at \\(x = "+x0+"\\)",
      "\\(f(x) = "+a+"x^2"+bAlt+"\\) at \\(x = "+x0+"\\)"
    ];
    ds=[];
    for(var i=0;i<cands.length&&ds.length<3;i++){if(cands[i]!==key&&ds.indexOf(cands[i])<0)ds.push(cands[i]);}
    if(ds.length<3)ds=null;
  }while(!ds&&tries<80);
  var bStr2=b>0?" + "+b+"x":" - "+Math.abs(b)+"x";
  return mcq("The limit expression \\["+expr+"\\] represents \\(f'(a)\\) for which function \\(f\\) and value \\(x = a\\)?",
    key,ds,
    "Compare the numerator with \\(f(a + h) - f(a)\\). Replacing \\("+x0+" + h\\) with \\(x\\) in the first two terms gives \\(f(x) = "+a+"x^2"+bStr2+"\\), and checking \\(f("+x0+") = "+a+"("+x0+")^2"+(b>0?" + "+b:" - "+Math.abs(b))+"("+x0+") = "+fx0+"\\) confirms \\(a = "+x0+"\\). The limit represents <b>"+key+"</b>.",
    {a:a,b:b,x0:x0});
});

E("u4-tangent-point-slope",4,["3.5"],2,"gen",function(){
  function P(a,b,c,d){
    var s="";
    if(a!==0)s+=(a===1?"":a===-1?"-":a)+"x^3";
    if(b!==0)s+=(s?(b>0?" + ":" - "):(b<0?"-":""))+(Math.abs(b)===1?"":Math.abs(b))+"x^2";
    if(c!==0)s+=(s?(c>0?" + ":" - "):(c<0?"-":""))+(Math.abs(c)===1?"":Math.abs(c))+"x";
    if(d!==0)s+=(s?(d>0?" + ":" - "):(d<0?"-":""))+Math.abs(d);
    return s||"0";
  }
  var a,b,c,d,x0,y0,m,ans,tries=0;
  var isNormal=Math.random()<0.5;
  do{
    tries++;
    a=pick([-1,1]);b=ri(-3,3);c=ri(-4,4);d=ri(-5,5);
    x0=pick([-2,-1,1,2]);
    y0=a*x0*x0*x0+b*x0*x0+c*x0+d;
    m=3*a*x0*x0+2*b*x0+c;
    if(isNormal&&(m===0||x0%m!==0))continue;
    ans=isNormal?(y0+x0/m):(y0-m*x0);
    break;
  }while(tries<120);
  var lineType=isNormal?"normal line":"tangent line";
  var mLine=isNormal?(-1/m):m;
  var mStr=isNormal?(m>0?"-\\frac{1}{"+m+"}":"\\frac{1}{"+(-m)+"}"):""+m;
  return numq("Find the \\(y\\)-intercept of the "+lineType+" to the graph of \\(f(x) = "+P(a,b,c,d)+"\\) at \\(x = "+x0+"\\).",
    ans,0.011,
    "First find the point on the curve: \\(f("+x0+") = "+y0+"\\), giving \\(("+x0+", "+y0+")\\). Differentiate to find the tangent slope:\\[f'(x) = "+(3*a)+"x^2"+(2*b>=0?" + "+(2*b):" - "+Math.abs(2*b))+"x"+(c>=0?" + "+c:" - "+Math.abs(c))+",\\quad f'("+x0+") = "+m+".\\]"+(isNormal?"The normal slope is the negative reciprocal, \\(m_{\\perp} = "+mStr+"\\). ":"")+"Using point-slope form \\(y - ("+y0+") = "+mStr+"(x - ("+x0+"))\\) and setting \\(x = 0\\) gives \\(y = "+y0+" - ("+mLine+")("+x0+") = "+ans+"\\). The \\(y\\)-intercept is <b>\\("+ans+"\\)</b>.",
    {a:a,b:b,c:c,d:d,x0:x0,isNormal:isNormal});
});

E("u4-first-principles-setup",4,["3.6"],2,"gen",function(){
  var a=pick([2,3,4,5]),b=pick([2,3,4,5,6]),c=pick([1,2,3,4,5]);
  var x0=pick([1,2,3]);
  var bStr=" + "+b+"x",cStr=" + "+c;
  var key="\\(\\lim_{h \\to 0} \\frac{"+a+"(x + h)^2 + "+b+"(x + h) + "+c+" - ("+a+"x^2 + "+b+"x + "+c+")}{h}\\)";
  var ds=[
    "\\(\\lim_{h \\to 0} \\frac{"+a+"(x + h)^2 + "+b+"(x + h) + "+c+" - "+a+"x^2 + "+b+"x + "+c+"}{h}\\)",
    "\\(\\lim_{h \\to 0} \\frac{"+a+"("+x0+" + h)^2 + "+b+"("+x0+" + h) + "+c+" - ("+a+"("+x0+")^2 + "+b+"("+x0+") + "+c+")}{h}\\)",
    "\\(\\lim_{h \\to 0} \\frac{"+a+"x^2 + "+b+"x + "+c+" + h - ("+a+"x^2 + "+b+"x + "+c+")}{h}\\)"
  ];
  return mcq("Which limit expression correctly sets up the derivative \\(f'(x)\\) from first principles for \\(f(x) = "+a+"x^2"+bStr+cStr+"\\) before expanding?",
    key,ds,
    "By definition, \\(f'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}\\). Substituting \\(x + h\\) into every \\(x\\) in \\(f(x)\\) gives \\("+a+"(x + h)^2 + "+b+"(x + h) + "+c+"\\), and subtracting the entire function \\(f(x)\\) requires brackets around \\(("+a+"x^2 + "+b+"x + "+c+")\\). The correct setup is <b>"+key+"</b>.",
    {a:a,b:b,c:c,x0:x0});
});

E("u4-notation-convert",4,["3.7"],1,"gen",function(){
  var x0=ri(-3,5),m=pick([-6,-4,-3,-2,2,3,4,5,7]);
  if(m===x0)m=7;
  var mode=ri(0,2);
  var prompt,key,ds,sol;
  if(mode===0){
    prompt="The slope of the tangent line to the curve \\(y = f(x)\\) at \\(x = "+x0+"\\) is \\("+m+"\\). Which statement expresses this in Leibniz notation?";
    key="\\(\\left.\\frac{dy}{dx}\\right|_{x="+x0+"} = "+m+"\\)";
    ds=[
      "\\(\\left.\\frac{d^2y}{dx^2}\\right|_{x="+x0+"} = "+m+"\\)",
      "\\(\\left.\\frac{dx}{dy}\\right|_{x="+x0+"} = "+m+"\\)",
      "\\(\\left.y(x)\\right|_{x="+x0+"} = "+m+"\\)"
    ];
    sol="The derivative \\(\\frac{dy}{dx}\\) evaluated at \\(x = "+x0+"\\) gives the tangent slope at that point, written \\(\\left.\\frac{dy}{dx}\\right|_{x="+x0+"} = "+m+"\\). The equivalent statement is <b>"+key+"</b>.";
  }else if(mode===1){
    prompt="Given \\(\\left.\\frac{dy}{dx}\\right|_{x="+x0+"} = "+m+"\\) for \\(y = f(x)\\), which statement is equivalent in prime notation?";
    key="\\(f'("+x0+") = "+m+"\\)";
    ds=[
      "\\(f("+x0+") = "+m+"\\)",
      "\\(f''("+x0+") = "+m+"\\)",
      "\\(f'("+m+") = "+x0+"\\)"
    ];
    sol="Leibniz notation \\(\\left.\\frac{dy}{dx}\\right|_{x="+x0+"}\\) and Lagrange prime notation \\(f'("+x0+")\\) both denote the first derivative of \\(f\\) at \\(x = "+x0+"\\). The equivalent statement is <b>"+key+"</b>.";
  }else{
    prompt="Which limit statement is equivalent to \\(f'("+x0+") = "+m+"\\)?";
    key="\\(\\lim_{h \\to 0} \\frac{f("+x0+" + h) - f("+x0+")}{h} = "+m+"\\)";
    ds=[
      "\\(\\lim_{h \\to 0} \\frac{f("+x0+" + h) + f("+x0+")}{h} = "+m+"\\)",
      "\\(\\lim_{h \\to 0} \\frac{f("+m+" + h) - f("+m+")}{h} = "+x0+"\\)",
      "\\(\\lim_{x \\to "+x0+"} f(x) = "+m+"\\)"
    ];
    sol="By the limit definition of the derivative at a point, \\(f'(a) = \\lim_{h \\to 0} \\frac{f(a + h) - f(a)}{h}\\). With \\(a = "+x0+"\\), this gives <b>"+key+"</b>.";
  }
  return mcq(prompt,key,ds,sol,{mode:mode,x0:x0,m:m});
});


E("u4-differentiable-values",4,["3.10"],2,"gen",function(){
  var a=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);
  var k=pick([1,2,3]);
  var b=pick([-4,-3,-2,2,3,4]);
  var c=ri(-6,6);
  var other=pick([-5,-4,-3,-2,-1,1,2,3,4,5].filter(function(v){return v!==a;}));
  var absInner=a>0?"x - "+a:"x + "+(-a);
  var fStr="|"+absInner+"| + "+(k===1?"":k)+"x^2"+(b>0?" + "+b:" - "+Math.abs(b))+"x"+(c>=0?" + "+c:" - "+Math.abs(c));
  var key="All real numbers except \\(x = "+a+"\\)";
  var ds=[
    "All real numbers \\(\\mathbb{R}\\)",
    "All real numbers except \\(x = "+a+"\\) and \\(x = "+other+"\\)",
    "Only \\(x = "+a+"\\)"
  ];
  return mcq("For which values of \\(x\\) is the function \\(f(x) = "+fStr+"\\) differentiable?",
    key,ds,
    "The polynomial part \\("+(k===1?"":k)+"x^2"+(b>0?" + "+b:" - "+Math.abs(b))+"x"+(c>=0?" + "+c:" - "+Math.abs(c))+"\\) is differentiable for all real numbers. The absolute value term \\(|"+absInner+"|\\) is differentiable everywhere except at its corner where \\("+absInner+" = 0\\), namely \\(x = "+a+"\\). Thus, \\(f\\) is differentiable for <b>"+key+"</b>.",
    {a:a,k:k,b:b,c:c,other:other});
});

E("u4-derivative-zero-points",4,["3.10"],2,"gen",function(){
  var a=pick([-3,-2,-1,1,2,3]);
  var x0=ri(-6,6);
  var b=-2*a*x0;
  var c=ri(-9,9);
  var fStr=(a===1?"":a===-1?"-":a)+"x^2"+(b===0?"":(b>0?" + "+b:" - "+Math.abs(b))+"x")+(c===0?"":(c>0?" + "+c:" - "+Math.abs(c)));
  return numq("Find the value of \\(x\\) at which the derivative of \\(f(x) = "+fStr+"\\) is equal to zero.",
    x0,0.011,
    "Differentiate term by term: \\(f'(x) = "+(2*a)+"x"+(b===0?"":(b>0?" + "+b:" - "+Math.abs(b)))+"\\). Setting \\(f'(x) = 0\\) gives \\("+(2*a)+"x = "+(-b)+"\\), so \\(x = "+x0+"\\). The derivative is zero at \\(x = \\) <b>\\("+x0+"\\)</b>.",
    {a:a,b:b,c:c,x0:x0});
});

E("u4-derivative-extremum-x",4,["3.12"],3,"gen",function(){
  var r1=ri(-5,3);
  var r2=ri(r1+2,6);
  var lead=pick([-3,-2,-1,1,2,3]);
  var ans=lead>0?r2:r1;
  var f1="(x "+(r1>0?"- "+r1:r1<0?"+ "+(-r1):"+ 0")+")";
  if(r1===0)f1="x";
  var f2="(x "+(r2>0?"- "+r2:r2<0?"+ "+(-r2):"+ 0")+")";
  if(r2===0)f2="x";
  var leadStr=lead===1?"":lead===-1?"-":""+lead;
  var signLeft=lead>0?"+":"-";
  var signMid=lead>0?"-":"+";
  var signRight=lead>0?"+":"-";
  return numq("The derivative of a function \\(f\\) is \\(f'(x) = "+leadStr+f1+f2+"\\). Find the \\(x\\)-coordinate of the local minimum of \\(f\\).",
    ans,0.011,
    "Setting \\(f'(x) = 0\\) gives critical numbers \\(x = "+r1+"\\) and \\(x = "+r2+"\\). Test the sign of \\(f'(x)\\) on each interval:<br>&bull; For \\(x < "+r1+"\\): \\(f'(x)\\) has sign \\("+signLeft+"\\).<br>&bull; For \\("+r1+" < x < "+r2+"\\): \\(f'(x)\\) has sign \\("+signMid+"\\).<br>&bull; For \\(x > "+r2+"\\): \\(f'(x)\\) has sign \\("+signRight+"\\).<br>A local minimum occurs where \\(f'(x)\\) changes from negative to positive, which happens at \\(x = "+ans+"\\). The \\(x\\)-coordinate of the local minimum is <b>\\("+ans+"\\)</b>.",
    {lead:lead,r1:r1,r2:r2});
});


E("u4-quotient-rule-setup",4,["3.13"],2,"gen",function(){
  var a=pick([2,3,4,5]),b=pick([1,2,3,4,5]),c=pick([2,3,4]),d=pick([1,2,3,4,5]);
  var u="("+a+"x^2 + "+b+")";
  var du="("+(2*a)+"x)";
  var v="("+c+"x - "+d+")";
  var dv="("+c+")";
  var key="\\(\\frac{"+du+v+" - "+u+dv+"}{"+v+"^2}\\)";
  var ds=[
    "\\(\\frac{"+u+dv+" - "+du+v+"}{"+v+"^2}\\)",
    "\\(\\frac{"+du+v+" - "+u+dv+"}{"+v+"}\\)",
    "\\(\\frac{"+du+v+" + "+u+dv+"}{"+v+"^2}\\)"
  ];
  return mcq("Which expression correctly sets up \\(f'(x)\\) using the Quotient Rule for \\(f(x) = \\frac{"+a+"x^2 + "+b+"}{"+c+"x - "+d+"}\\) before simplifying?",
    key,ds,
    "With numerator \\(u(x) = "+a+"x^2 + "+b+"\\) (\\(u'(x) = "+(2*a)+"x\\)) and denominator \\(v(x) = "+c+"x - "+d+"\\) (\\(v'(x) = "+c+"\\)), the Quotient Rule \\(\\frac{u'(x)v(x) - u(x)v'(x)}{[v(x)]^2}\\) gives <b>"+key+"</b>.",
    {a:a,b:b,c:c,d:d});
});

E("u4-basic-derivatives-value",4,["3.14"],2,"gen",function(){
  function P(a,b,c,d,e){
    var s="";
    if(a!==0)s+=(a===1?"":a===-1?"-":a)+"x^4";
    if(b!==0)s+=(s?(b>0?" + ":" - "):(b<0?"-":""))+(Math.abs(b)===1?"":Math.abs(b))+"x^3";
    if(c!==0)s+=(s?(c>0?" + ":" - "):(c<0?"-":""))+(Math.abs(c)===1?"":Math.abs(c))+"x^2";
    if(d!==0)s+=(s?(d>0?" + ":" - "):(d<0?"-":""))+(Math.abs(d)===1?"":Math.abs(d))+"x";
    if(e!==0)s+=(s?(e>0?" + ":" - "):(e<0?"-":""))+Math.abs(e);
    return s||"0";
  }
  var a=pick([-1,0,1,2]),b=pick([-2,-1,1,2,3]),c=ri(-4,4),d=ri(-5,5),e=ri(-6,6);
  var x0=pick([-2,-1,1,2]);
  var ans=4*a*x0*x0*x0+3*b*x0*x0+2*c*x0+d;
  var dp=P(0,4*a,3*b,2*c,d);
  return numq("Find \\(f'("+x0+")\\) for \\(f(x) = "+P(a,b,c,d,e)+"\\).",
    ans,0.011,
    "Apply the Power, Constant Multiple, and Sum/Difference Rules term by term:\\[f'(x) = "+dp+".\\]Substitute \\(x = "+x0+"\\):\\[f'("+x0+") = "+(4*a)+"("+x0+")^3 + ("+(3*b)+")("+x0+")^2 + ("+(2*c)+")("+x0+") + ("+d+") = "+ans+".\\]Thus, \\(f'("+x0+") = \\) <b>\\("+ans+"\\)</b>.",
    {a:a,b:b,c:c,d:d,e:e,x0:x0});
});

E("u4-derivative-roots-form",4,["3.14"],2,"gen",function(){
  var a=pick([2,4,6,8]),b=pick([3,6,9]),c=pick([2,3,4,5]);
  var ha=a/2,tb=b/3;
  var key="\\("+ha+"x^{-1/2} + "+tb+"x^{-2/3} - "+c+"x^{-2}\\)";
  var ds=[
    "\\("+ha+"x^{1/2} + "+tb+"x^{2/3} - "+c+"x^{-2}\\)",
    "\\("+a+"x^{-1/2} + "+b+"x^{-2/3} - "+c+"x^{-2}\\)",
    "\\("+ha+" + "+tb+" - "+c+"x^{-2}\\)"
  ];
  return mcq("Differentiate \\(f(x) = "+a+"\\sqrt{x} + "+b+"\\sqrt[3]{x} + \\frac{"+c+"}{x}\\).",
    key,ds,
    "Rewrite each term using rational and negative exponents: \\(f(x) = "+a+"x^{1/2} + "+b+"x^{1/3} + "+c+"x^{-1}\\). Applying the Power Rule to each term gives\\[f'(x) = "+a+"\\left(\\frac{1}{2}\\right)x^{-1/2} + "+b+"\\left(\\frac{1}{3}\\right)x^{-2/3} + "+c+"(-1)x^{-2} = "+ha+"x^{-1/2} + "+tb+"x^{-2/3} - "+c+"x^{-2}.\\]The derivative is <b>"+key+"</b>.",
    {a:a,b:b,c:c});
});

E("u4-higher-derivative-expression",4,["3.15"],2,"gen",function(){
  function P(a,b,c,d,e){
    var s="";
    if(a!==0)s+=(a===1?"":a===-1?"-":a)+"x^4";
    if(b!==0)s+=(s?(b>0?" + ":" - "):(b<0?"-":""))+(Math.abs(b)===1?"":Math.abs(b))+"x^3";
    if(c!==0)s+=(s?(c>0?" + ":" - "):(c<0?"-":""))+(Math.abs(c)===1?"":Math.abs(c))+"x^2";
    if(d!==0)s+=(s?(d>0?" + ":" - "):(d<0?"-":""))+(Math.abs(d)===1?"":Math.abs(d))+"x";
    if(e!==0)s+=(s?(e>0?" + ":" - "):(e<0?"-":""))+Math.abs(e);
    return s||"0";
  }
  var a=pick([1,2,3]),b=pick([-3,-2,-1,1,2,3]),c=pick([-5,-4,-3,-2,2,3,4,5]),d=ri(-6,6),e=ri(-6,6);
  var key="\\("+P(0,0,12*a,6*b,2*c)+"\\)";
  var ds=[
    "\\("+P(0,4*a,3*b,2*c,d)+"\\)",
    "\\("+P(0,0,0,24*a,6*b)+"\\)",
    "\\("+P(0,0,12*a,6*b,c)+"\\)"
  ];
  return mcq("Find the second derivative \\(f''(x)\\) of \\(f(x) = "+P(a,b,c,d,e)+"\\).",
    key,ds,
    "First differentiate \\(f(x)\\) to find \\(f'(x)\\):\\[f'(x) = "+P(0,4*a,3*b,2*c,d)+".\\]Differentiate \\(f'(x)\\) once more to obtain \\(f''(x)\\):\\[f''(x) = "+P(0,0,12*a,6*b,2*c)+".\\]Therefore, \\(f''(x) = \\) <b>"+key+"</b>.",
    {a:a,b:b,c:c,d:d,e:e});
});

E("u4-chain-rule-power-fraction",4,["3.16"],2,"gen",function(){
  var a=pick([2,3,4,5]),b=pick([1,2,3,4,5,7]);
  var mode=ri(0,1);
  var inner=a+"x + "+b;
  var prompt,key,ds,sol;
  if(mode===0){
    var mult=a%2===0?"\\frac{"+(a/2)+"}{\\sqrt{"+inner+"}}":"\\frac{"+a+"}{2\\sqrt{"+inner+"}}";
    var noChain=a%2===0?"\\frac{1}{2\\sqrt{"+inner+"}}":"\\frac{1}{2\\sqrt{"+inner+"}}";
    var noDrop=a%2===0?"\\frac{"+(a/2)+"}{("+inner+")^{3/2}}":"\\frac{"+a+"}{2("+inner+")^{3/2}}";
    var twice=a%2===0?"\\frac{"+(a*a/2)+"}{\\sqrt{"+inner+"}}":"\\frac{"+(a*a)+"}{2\\sqrt{"+inner+"}}";
    prompt="Differentiate \\(f(x) = \\sqrt{"+inner+"}\\).";
    key="\\("+mult+"\\)";
    ds=["\\("+noChain+"\\)","\\("+noDrop+"\\)","\\("+twice+"\\)"];
    sol="Write \\(f(x) = ("+inner+")^{1/2}\\). By the Power and Chain Rules, \\[f'(x) = \\frac{1}{2}("+inner+")^{-1/2} \\cdot "+a+" = "+mult+".\\]The derivative is <b>"+key+"</b>.";
  }else{
    var coef=a%2===0?(3*(a/2))+"("+inner+")^{1/2}":"\\frac{"+(3*a)+"}{2}("+inner+")^{1/2}";
    var noChain2="\\frac{3}{2}("+inner+")^{1/2}";
    var noDrop2=a%2===0?(3*(a/2))+"("+inner+")^{3/2}":"\\frac{"+(3*a)+"}{2}("+inner+")^{3/2}";
    var twice2=a%2===0?(3*(a*a/2))+"("+inner+")^{1/2}":"\\frac{"+(3*a*a)+"}{2}("+inner+")^{1/2}";
    prompt="Differentiate \\(f(x) = ("+inner+")^{3/2}\\).";
    key="\\("+coef+"\\)";
    ds=["\\("+noChain2+"\\)","\\("+noDrop2+"\\)","\\("+twice2+"\\)"];
    sol="Applying the Power and Chain Rules gives \\[f'(x) = \\frac{3}{2}("+inner+")^{1/2} \\cdot "+a+" = "+coef+".\\]The derivative is <b>"+key+"</b>.";
  }
  return mcq(prompt,key,ds,sol,{mode:mode,a:a,b:b});
});


E("u4-implicit-expression",4,["3.18"],3,"gen",function(){
  var a=pick([2,3,4,5]),b=pick([2,3,4,5]),c=pick([2,3,4]),k=ri(5,20);
  var key="\\(\\frac{dy}{dx} = \\frac{-"+(2*a)+"x - "+b+"y}{"+b+"x + "+(2*c)+"y}\\)";
  var ds=[
    "\\(\\frac{dy}{dx} = \\frac{"+(2*a)+"x + "+b+"y}{"+b+"x + "+(2*c)+"y}\\)",
    "\\(\\frac{dy}{dx} = \\frac{-"+(2*a)+"x - "+b+"}{"+(2*c)+"y}\\)",
    "\\(\\frac{dy}{dx} = -"+(2*a)+"x - "+b+"y - "+b+"x\\frac{dy}{dx} - "+(2*c)+"y\\)"
  ];
  return mcq("Use implicit differentiation to find \\(\\frac{dy}{dx}\\) for the relation \\("+a+"x^2 + "+b+"xy + "+c+"y^2 = "+k+"\\).",
    key,ds,
    "Differentiate both sides with respect to \\(x\\), applying the Product Rule to \\("+b+"xy\\) and the Chain Rule to \\("+c+"y^2\\):\\[\\begin{aligned}"+(2*a)+"x + "+b+"y + "+b+"x\\frac{dy}{dx} + "+(2*c)+"y\\frac{dy}{dx} &= 0 \\\\ ("+b+"x + "+(2*c)+"y)\\frac{dy}{dx} &= -"+(2*a)+"x - "+b+"y \\\\ \\frac{dy}{dx} &= \\frac{-"+(2*a)+"x - "+b+"y}{"+b+"x + "+(2*c)+"y}.\\end{aligned}\\]Therefore, <b>"+key+"</b>.",
    {a:a,b:b,c:c,k:k});
});

E("u4-implicit-second-hyperbola",4,["3.20"],3,"gen",function(){
  var triples=[[5,3,4],[5,4,3],[10,6,8],[10,8,6],[13,5,12],[13,12,5]];
  var tr=pick(triples);
  var x0=tr[0]*(Math.random()<0.5?1:-1);
  var y0=tr[1]*(Math.random()<0.5?1:-1);
  var k=tr[2]*tr[2];
  var ans=Math.round((-k/(y0*y0*y0))*10000)/10000;
  return numq("Consider the hyperbola \\(x^2 - y^2 = "+k+"\\). Use implicit differentiation to find \\(\\frac{d^2y}{dx^2}\\) at the point \\(("+x0+", "+y0+")\\). Round your answer to two decimal places if necessary.",
    ans,0.011,
    "Differentiate \\(x^2 - y^2 = "+k+"\\) implicitly with respect to \\(x\\):\\[2x - 2y\\frac{dy}{dx} = 0 \\implies \\frac{dy}{dx} = \\frac{x}{y}.\\]Differentiate a second time using the Quotient Rule:\\[\\frac{d^2y}{dx^2} = \\frac{y(1) - x\\frac{dy}{dx}}{y^2} = \\frac{y - x\\left(\\frac{x}{y}\\right)}{y^2} = \\frac{y^2 - x^2}{y^3} = \\frac{-"+k+"}{y^3}.\\]At \\(("+x0+", "+y0+")\\), \\(\\frac{d^2y}{dx^2} = \\frac{-"+k+"}{("+y0+")^3} = "+fmt(ans,4)+"\\). The second derivative is <b>\\("+fmt(ans,4)+"\\)</b>.",
    {x0:x0,y0:y0,k:k});
});

/* ============ External drafting pilot swap tranche (November 18, 2026) ============
   Three entries drafted externally (ChatGPT) under the same External
   Authoring Pack and Math 3208 Unit 4 pilot assignment, completing the
   pilot unit at the full 22 assigned entries. These are the three
   entries rejected from the Gemini tranche above; the ChatGPT versions
   passed the comparison intake sweep (3,000 draws per entry, keys
   recomputed independently, zero defects), and Jason approved the
   swap on November 18, 2026. Two mechanical integration repairs: the
   restated key is wrapped in bold at the end of the two generator
   solutions (the variant set keeps the pack worked example's
   unwrapped style), and u4-motion-direction's option wording is
   aligned to its prompt (forward and backward). Intake report:
   Pilot-Intake-Report-Math-3208-ChatGPT-2026-11-18 (review apps goal
   files). */

E("u4-differentiability-point", 4, ["3.8"], 2, "gen", function () {
  const a = pick([-4, -3, -2, 1, 2, 3, 4]), y = ri(2, 9), leftSlope = ri(2, 5);
  const A = pick([-3, -2, 2, 3]), mode = pick(["smooth", "corner", "jump"]);
  const rightSlope = mode === "corner" ? leftSlope + ri(1, 3) : leftSlope;
  const rightValue = mode === "jump" ? y + ri(1, 3) : y;
  const shifted = "(x" + (a < 0 ? "+" : "-") + Math.abs(a) + ")";
  function P(A, B, C) { return (A ? A + shifted + "^2+" : "") + B + shifted + "+" + C; }
  const options = [
    "Yes. The branches meet at the join and have equal slopes there.",
    "No. The branches meet at the join but have unequal slopes there.",
    "No. The branches approach different values at their join point.",
    "Yes. The two branches approach different values at the join point."
  ];
  const index = { smooth: 0, corner: 1, jump: 2 }[mode];
  return mcq(
    "Is \\(f\\) differentiable at \\(x=" + a + "\\), and why? " +
      "\\[f(x)=\\begin{cases}" + P(0, leftSlope, y) + ",&x\\lt " + a + "\\\\" +
      P(A, rightSlope, rightValue) + ",&x\\ge " + a + ".\\end{cases}\\]",
    options[index], options.filter((_, i) => i !== index),
    "At \\(x=" + a + "\\), the left-hand limit is \\(" + y + "\\), and the right-hand limit and \\(f(" + a +
      ")\\) equal \\(" + rightValue + "\\). " +
      (mode === "jump" ? "The limits differ, so \\(f\\) is discontinuous there. Differentiability requires continuity. " :
        "The limits agree with the function value, so \\(f\\) is continuous. The left branch has slope \\(" +
        leftSlope + "\\). The derivative of the right branch is \\(" + 2 * A + shifted + "+" + rightSlope +
        "\\), which gives a right-hand slope of \\(" + rightSlope + "\\) at the join. ") + "<b>" + options[index] + "</b>",
    { a, y, leftSlope, A, rightSlope, rightValue, mode }
  );
});

E("u4-product-rule-derive", 4, ["3.13"], 2, "var", varset([
  function () {
    return mcq(
      "Let \\(u=x^3+2\\) and \\(v=x^2+4\\). Using \\(u'\\) and \\(v'\\) for their derivatives, " +
        "which expression gives \\((uv)'\\) before substitution or simplification?",
      "\\((u')v+u(v')\\)",
      ["\\((u')(v')\\)", "\\((u')+(v')\\)", "\\((u')v-u(v')\\)"],
      "Differentiate the first factor and keep the second to get \\((u')v\\). Keep the first factor and " +
        "differentiate the second to get \\(u(v')\\). Add the two terms. The unsimplified rule is \\((u')v+u(v')\\).",
      { variant: "unsimplified", uCoefficients: [1, 0, 0, 2], vCoefficients: [1, 0, 4] }
    );
  },
  function () {
    const key = "\\(U_h\\frac{V_h-V}{h}+V\\frac{U_h-U}{h}\\)";
    return mcq(
      "For differentiable functions \\(u\\) and \\(v\\), write \\(U=u(x)\\), \\(V=v(x)\\), \\(U_h=u(x+h)\\), " +
        "and \\(V_h=v(x+h)\\). The product-rule derivation starts with \\(\\lim_{h\\to0}\\frac{U_hV_h-UV}{h}\\). " +
        "Insert \\(-U_hV+U_hV\\) in the numerator. Which expression is the next line inside the limit after regrouping?",
      key,
      ["\\(\\frac{U_h-U}{h}\\cdot\\frac{V_h-V}{h}\\)", "\\(\\frac{U_h-U}{h}+\\frac{V_h-V}{h}\\)",
        "\\(U_h\\frac{V_h-V}{h}-V\\frac{U_h+U}{h}\\)"],
      "Group the numerator as \\((U_hV_h-U_hV)+(U_hV-UV)\\). Factor \\(U_h\\) from the first group " +
        "and \\(V\\) from the second, then divide each group by \\(h\\). The next line inside the limit is " + key + ".",
      { variant: "insert-u-shifted-v", insertedTerm: "U_h V" }
    );
  },
  function () {
    const key = "\\(V_h\\frac{U_h-P}{h}+P\\frac{V_h-Q}{h}\\)";
    return mcq(
      "Suppose \\(p\\) and \\(q\\) are differentiable at \\(x=a\\). Write \\(P=p(a)\\), \\(Q=q(a)\\), " +
        "\\(U_h=p(a+h)\\), and \\(V_h=q(a+h)\\). To derive \\((pq)'(a)\\), start with " +
        "\\(\\lim_{h\\to0}\\frac{U_hV_h-PQ}{h}\\) and split the numerator into two groups using \\(PV_h\\). " +
        "Which expression goes inside the limit after factoring each group?",
      key,
      ["\\(\\frac{U_h-P}{h}\\cdot\\frac{V_h-Q}{h}\\)", "\\(\\frac{U_h-P}{h}+\\frac{V_h-Q}{h}\\)",
        "\\(V_h\\frac{U_h-P}{h}-P\\frac{V_h+Q}{h}\\)"],
      "Subtract \\(PV_h\\) in the first group and add it back in the second. This gives " +
        "\\((U_hV_h-PV_h)+(PV_h-PQ)\\). Factoring the first group by \\(V_h\\) and the second by \\(P\\), " +
        "then dividing by \\(h\\), gives \\(V_h\\frac{U_h-P}{h}+P\\frac{V_h-Q}{h}\\).",
      { variant: "insert-p-q-shifted-at-a", insertedTerm: "P V_h" }
    );
  }
]));

E("u4-motion-direction", 4, ["3.17"], 2, "gen", function () {
  const a = ri(2, 5), A = pick([-3, -2, 2, 3]);
  const mode = pick(["forward", "backward", "rest"]);
  const targetVelocity = mode === "forward" ? ri(2, 8) : mode === "backward" ? ri(-8, -2) : 0;
  const targetPosition = mode === "forward" ? ri(-9, -2) : mode === "backward" ? ri(10, 19) : ri(2, 9);
  const B = targetVelocity - 2 * A * a, C = targetPosition - A * a ** 2 - B * a;
  function term(value, variable) {
    return value === 0 ? "" : (value < 0 ? "-" : "+") + Math.abs(value) + variable;
  }
  function P() { return A + "t^2" + term(B, "t") + term(C, ""); }
  function option(value, direction) {
    const motion = { forward: "moving forward", backward: "moving backward", rest: "momentarily at rest" };
    return "\\(v(" + a + ")=" + value + "\\), so the particle is " + motion[direction] + ".";
  }
  const velocity = 2 * A * a + B, position = A * a ** 2 + B * a + C;
  const key = option(velocity, mode);
  return mcq(
    "A particle moves on a straight line. Its position is \\(s(t)=" + P() + "\\) metres, where \\(t\\) is in seconds " +
      "and the positive direction is forward. Which statement gives its velocity in metres per second and describes its " +
      "motion at \\(t=" + a + "\\)?",
    key,
    [option(velocity, mode === "forward" ? "rest" : "forward"), option(position, "forward"), option(position, "backward")],
    "Velocity is the derivative of position, so \\(v(t)=s'(t)=" + 2 * A + "t" + term(B, "") +
      "\\). At \\(t=" + a + "\\), \\(v(" + a + ")=" + "(" + 2 * A + ")(" + a + ")" + term(B, "") +
      "=" + velocity + "\\). A positive velocity means forward, a negative velocity means backward, and zero velocity " +
      "means instantaneous rest. Here <b>" + key + "</b>",
    { A, B, C, a, mode, targetVelocity, targetPosition }
  );
});
