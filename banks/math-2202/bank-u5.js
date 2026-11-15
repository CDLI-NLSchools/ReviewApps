// Math 2202 Unit 5 Budgets question bank
// Cut verbatim from the standalone bank source
// (math-2202-review/bank-src.js, lines 2438 to 2925).
// CRMARKS: u5-cr-total-expenses=2
// CRMARKS: u5-cr-budget-balance=2
// CRMARKS: u5-cr-category-percent=2
// CRMARKS: u5-cr-week-record-total=3
// CRMARKS: u5-cr-modify-budget=3
// CRMARKS: u5-cr-what-if-balance=3
// CRMARKS: u5-cr-goal-after-change=2
// CRMARKS: u5-cr-max-wants-spending=3
/* ===== Unit 5 ===== */
/* Unit 5 (Budgets) bank for Mathematics 2202 Review. Codes 1.1 to 1.6.
   All money is handled in integer cents so totals are exact to the cent. */
function u5M(c){ var neg=c<0; var a=Math.abs(Math.round(c)); var d=Math.floor(a/100); var r=a%100; var ds=String(d).replace(/\B(?=(\d{3})+(?!\d))/g,","); return (neg?"-":"")+"$"+ds+"."+(r<10?"0":"")+r; }
function u5PctTxt(p){ return fmtF(Math.round(p*10)/10,1)+"%"; }
var u5Names=["Alex","Maya","Jordan","Priya","Sam","Taylor","Noah","Emma","Liam","Zoe"];
function u5BarFig(title,labels,valsC){
  var max=1; valsC.forEach(function(v){ if(v>max)max=v; });
  var H=labels.length*30+34, s='<svg viewBox="0 0 340 '+H+'" xmlns="http://www.w3.org/2000/svg" role="img">';
  s+='<text x="170" y="16" font-size="13" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">'+title+'</text>';
  for(var i=0;i<labels.length;i++){
    var y=26+i*30, w=Math.max(4,Math.round(valsC[i]/max*160));
    s+='<text x="88" y="'+(y+13)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="end">'+labels[i]+'</text>';
    s+='<rect x="94" y="'+y+'" width="'+w+'" height="18" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
    s+='<text x="'+(100+w)+'" y="'+(y+13)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="start">'+u5M(valsC[i])+'</text>';
  }
  return s+'</svg>';
}
function u5Budget(){
  var inc=ri(2000,3800)*100;
  var exps=[
    {label:"Housing", c:ri(800,1400)*100},
    {label:"Food", c:ri(300,650)*100},
    {label:"Transport", c:ri(120,350)*100},
    {label:"Phone and internet", c:ri(70,150)*100},
    {label:"Other spending", c:ri(100,400)*100}
  ];
  var tot=0; exps.forEach(function(e){ tot+=e.c; });
  return {inc:inc, exps:exps, tot:tot, bal:inc-tot};
}
function u5ExpList(exps){ return exps.map(function(e){ return e.label.toLowerCase()+" "+u5M(e.c); }).join(", "); }
function u5MoneyOpts(correctC,errs){
  /* errs: [{v: cents, fb: string}]; guarantees 3 distinct distractor texts */
  var seen={}; seen[correctC]=1; var out=[];
  errs.forEach(function(e){
    var v=Math.round(e.v), guard=0;
    while((seen[v]||v===correctC)&&guard<60){ v+=1000; guard++; }
    seen[v]=1; out.push({t:u5M(v), fb:e.fb});
  });
  return out;
}

/* ---------- Level 1 MC ---------- */

E("u5-classify-item", 5, ["1.1"], 1, "gen", function(){
  var pools=[
    {kind:"Income", items:[
      {t:"monthly pay from a part time job at a grocery store", lo:700, hi:1600},
      {t:"monthly pay from weekend shifts at a hardware store", lo:500, hi:1400},
      {t:"tips earned in one month serving at a cafe", lo:120, hi:480},
      {t:"money earned in one month clearing snow for neighbours", lo:150, hi:600},
      {t:"monthly pay from a job at a recreation centre", lo:800, hi:1900}]},
    {kind:"Fixed expense", items:[
      {t:"monthly rent for an apartment", lo:750, hi:1450},
      {t:"a monthly car insurance payment", lo:110, hi:260},
      {t:"a monthly phone plan payment", lo:45, hi:95},
      {t:"a monthly internet payment", lo:60, hi:120},
      {t:"a monthly bus pass", lo:65, hi:110},
      {t:"a monthly gym membership payment", lo:30, hi:75}]},
    {kind:"Variable expense", items:[
      {t:"groceries bought during the month", lo:240, hi:680},
      {t:"gasoline bought during the month", lo:90, hi:320},
      {t:"an electricity bill for the month", lo:80, hi:240},
      {t:"takeout meals bought during the month", lo:40, hi:220},
      {t:"clothing bought during the month", lo:35, hi:260},
      {t:"household supplies bought during the month", lo:30, hi:180}]},
    {kind:"Unexpected expense", items:[
      {t:"a car repair after an unexpected breakdown", lo:220, hi:950},
      {t:"replacing a phone with a broken screen", lo:150, hi:520},
      {t:"an emergency visit to a veterinarian", lo:130, hi:640},
      {t:"a plumbing repair after a pipe leaked", lo:200, hi:880}]}
  ];
  var defs={
    "Income":"Income is money coming in, such as pay or tips.",
    "Fixed expense":"A fixed expense is a regular payment that stays about the same each month.",
    "Variable expense":"A variable expense is a payment that changes from month to month.",
    "Unexpected expense":"An unexpected expense is an unplanned cost, such as a repair."
  };
  var cat=pick(pools), item=pick(cat.items), amtC=ri(item.lo,item.hi)*100, name=pick(u5Names);
  var distractors=[];
  Object.keys(defs).forEach(function(k){
    if(k!==cat.kind) distractors.push({t:k, fb:defs[k]+" This item does not fit that description."});
  });
  return mcq(name+" is building a personal budget. For one month, the budget lists "+item.t+", "+u5M(amtC)+". How should this item be classified?",
    {t:cat.kind, fb:"Yes. "+defs[cat.kind]+" This item matches that description."}, distractors,
    defs[cat.kind]+" The item listed is "+item.t+", so it belongs in the budget as <b>"+cat.kind.toLowerCase()+"</b>.",
    {kind:cat.kind, amt:amtC});
}, ["First decide whether money is coming in or going out, then whether the amount is regular, changing, or unplanned.", "Ask whether this item would appear at about the same amount every month, change each month, be a surprise, or be money earned."]);

E("u5-budget-considerations", 5, ["1.2"], 1, "var", varset([
  function(){ return mcq("Riley is making a first monthly budget. Which step should come first?",
    {t:"List the monthly income, then list regular expenses and needs", fb:"Yes. A budget starts from the money coming in and the costs that must be covered."},
    [{t:"Choose the fun purchases for the month first of all", fb:"Wants are planned after income and needs are known, not before."},
     {t:"Spend as usual and write down what is left over at the end", fb:"That tracks spending after the fact. A budget plans ahead."},
     {t:"Leave out small regular costs to keep it simple, and round the rest", fb:"Small regular costs add up and belong in the budget."}],
    "A budget is built by starting with income, then covering regular expenses and needs, and then planning other spending. The first step is <b>listing income, then regular expenses and needs</b>.", {}); },
  function(){ return mcq("Which of these is an unexpected expense in a monthly budget?",
    {t:"A car repair after a breakdown", fb:"Yes. A breakdown is unplanned, so the repair is an unexpected expense."},
    [{t:"Rent due on the first of the month", fb:"Rent is a regular, expected cost."},
     {t:"A monthly phone plan payment", fb:"A phone plan payment is a regular, expected cost."},
     {t:"A monthly bus pass", fb:"A bus pass is a regular, expected cost."}],
    "An unexpected expense is a cost that was not planned for. A car repair after a breakdown fits, while rent, a phone plan and a bus pass are regular costs. The answer is <b>a car repair after a breakdown</b>.", {}); },
  function(){ return mcq("Why does a good budget include an amount for unexpected expenses?",
    {t:"So a surprise cost does not force missed bills or new borrowing", fb:"Yes. Planning a cushion keeps one surprise from breaking the whole budget."},
    [{t:"So every dollar of income is spent on shopping, with nothing saved", fb:"The cushion is kept aside for surprises, not spent on shopping."},
     {t:"So fixed bills no longer need to be paid at all any more", fb:"Fixed bills still must be paid. The cushion protects those payments."},
     {t:"So the budget never needs to be checked again at all", fb:"Budgets still need regular checking. The cushion handles surprise costs."}],
    "Unexpected costs, such as repairs, happen even in a careful plan. Setting money aside for them means a surprise does not force missed bills or new borrowing. The answer is <b>to protect the budget from surprise costs</b>.", {}); },
  function(){ return mcq("In a budget, prioritizing means:",
    {t:"Paying needs and important bills before optional spending", fb:"Yes. Prioritizing puts needs and bills first, then wants."},
    [{t:"Paying for optional spending before the bills arrive in the mail", fb:"That reverses the priority. Bills and needs come first."},
     {t:"Giving every budget category the same amount", fb:"Categories get amounts based on need, not equal amounts."},
     {t:"Removing savings from the budget completely", fb:"Prioritizing does not remove savings. It orders what gets paid first."}],
    "Prioritizing means ranking what the money must do first. Needs and important bills are paid before optional spending. The answer is <b>paying needs and bills before optional spending</b>.", {}); },
  function(){ return mcq("Which of these is a recurring expense in a monthly budget?",
    {t:"Rent, which is due every month", fb:"Yes. Rent repeats every month, so it is a recurring expense."},
    [{t:"A one time repair to a bicycle", fb:"A one time repair does not repeat each month."},
     {t:"A birthday gift of money received", fb:"Money received is income, not an expense."},
     {t:"A single payment to replace a lost wallet", fb:"That is a one time cost, not a repeating one."}],
    "A recurring expense repeats on a regular schedule. Rent is due every month, so it is recurring. The answer is <b>rent, which is due every month</b>.", {}); },
  function(){ return mcq("Sam's income changes from month to month because the work shifts vary. What is the safest way to build the monthly budget?",
    {t:"Base it on a lower typical month and move extra money to savings in better months", fb:"Yes. Planning on a lower month keeps bills covered when income dips."},
    [{t:"Base it on the best month of the year and assume the pay stays at that level", fb:"Spending planned for the best month will not fit in a lower month."},
     {t:"Plan as if there is no income at all, so nothing at all can be planned", fb:"That ignores the regular income that does arrive."},
     {t:"Stop budgeting until the income is steady, and just spend as usual in the meantime", fb:"A changing income makes planning more important, not less."}],
    "When income varies, the safe base is a lower typical month, so regular costs stay covered. Extra money in a better month can go to savings. The answer is <b>basing the budget on a lower typical month</b>.", {}); }
]), ["Think about what a budget must do: cover needs first and still work when something unplanned happens.", "Sort each option by whether it plans ahead, protects the bills, or only deals with spending after it happens."]);

E("u5-need-or-want", 5, ["1.1","1.2"], 1, "gen", function(){
  var pools=[
    {kind:"A need", items:[
      {t:"basic groceries for meals at home", lo:240, hi:650},
      {t:"rent for housing", lo:750, hi:1400},
      {t:"a bus pass needed to get to work", lo:65, hi:110},
      {t:"prescription medicine", lo:25, hi:180},
      {t:"winter boots needed for an outdoor job", lo:90, hi:220},
      {t:"a basic phone plan needed for work calls", lo:40, hi:85}]},
    {kind:"A want", items:[
      {t:"tickets to a concert", lo:50, hi:180},
      {t:"a new video game", lo:60, hi:110},
      {t:"designer sneakers when a good pair already fits", lo:120, hi:280},
      {t:"a weekend trip with friends", lo:200, hi:550},
      {t:"takeout meals three times a week", lo:120, hi:300},
      {t:"a larger TV when the current TV still works", lo:350, hi:900}]}
  ];
  var cat=pick(pools), item=pick(cat.items), amtC=ri(item.lo,item.hi)*100, name=pick(u5Names);
  var isNeed=(cat.kind==="A need");
  var distractors=[
    {t:isNeed?"A want":"A need", fb:isNeed?"A want is optional spending. This item is required for living or working.":"A need is required for living or working. This item is optional."},
    {t:"Income", fb:"Income is money coming in, such as pay. This item is a cost."},
    {t:"Money set aside as savings", fb:"Savings is money kept for later. This item is a purchase."}
  ];
  return mcq(name+" lists "+item.t+", costing "+u5M(amtC)+", in a monthly budget. Which best describes this item?",
    {t:cat.kind, fb:isNeed?"Yes. This item is required for living or working, so it is a need.":"Yes. This item is optional, so it is a want."}, distractors,
    (isNeed?"A need is something required for living or working. ":"A want is something optional that a person would like to have. ")+"The item listed is "+item.t+", so it is <b>"+cat.kind.toLowerCase()+"</b>.",
    {kind:cat.kind, amt:amtC});
}, ["Ask whether the person must have this item to live or work, or whether it is optional.", "If the item is required, it is a need. If the person could skip it and still manage, it is a want."]);

/* ---------- Level 2 MC (deep generators) ---------- */

E("u5-budget-totals-mc", 5, ["1.3"], 2, "gen", function(){
  var name=pick(u5Names), b=u5Budget(), mode=ri(0,1), guard=0;
  while(mode===1 && b.bal===0 && guard<20){ b=u5Budget(); guard++; }
  var prompt=name+" has a monthly income of "+u5M(b.inc)+". The monthly expenses are: "+u5ExpList(b.exps)+". ";
  var q;
  if(mode===0){
    var smallest=Math.min.apply(null,b.exps.map(function(e){return e.c;}));
    var opts=u5MoneyOpts(b.tot,[
      {v:b.tot-smallest, fb:"This leaves out one of the expense items. Add every expense listed."},
      {v:b.tot-b.exps[0].c, fb:"This leaves out the housing cost. Housing is part of the total."},
      {v:b.inc+b.tot, fb:"This adds the income to the expenses. The question asks for expenses only."}]);
    q=mcq(prompt+"What are the total monthly expenses?",
      {t:u5M(b.tot), fb:"Yes. Adding all five expenses gives this total."}, opts,
      "Add every expense, in dollars. \\[ \\begin{aligned} \\text{Total expenses} &= "+b.exps.map(function(e){return fmtF(e.c/100,2);}).join(" + ")+" \\\\ &= "+fmtF(b.tot/100,2)+" \\end{aligned} \\] Rounded to the cent, the answer is <b>"+u5M(b.tot)+"</b>.",
      {mode:"total", tot:b.tot});
  } else {
    var opts2=u5MoneyOpts(b.bal,[
      {v:b.tot-b.inc, fb:"This subtracts in the wrong order. The balance is income minus expenses."},
      {v:b.inc-b.exps[0].c, fb:"This subtracts only the housing cost. Subtract all of the expenses."},
      {v:b.inc+b.tot, fb:"This adds income and expenses. The balance is the difference between them."}]);
    q=mcq(prompt+"What is the monthly balance (income minus total expenses)?",
      {t:u5M(b.bal), fb:"Yes. Income minus the total of all expenses gives this balance."}, opts2,
      "First total the expenses, then subtract from the income. \\[ \\begin{aligned} \\text{Total expenses} &= "+fmtF(b.tot/100,2)+" \\\\ \\text{Balance} &= "+fmtF(b.inc/100,2)+" - "+fmtF(b.tot/100,2)+" \\\\ &= "+fmtF(b.bal/100,2)+" \\end{aligned} \\] The answer is <b>"+u5M(b.bal)+"</b>.",
      {mode:"balance", bal:b.bal});
  }
  q.figure=u5BarFig("Monthly expenses", b.exps.map(function(e){return e.label;}), b.exps.map(function(e){return e.c;}));
  return q;
}, ["The balance is income minus expenses, so the expense total is needed either way.", "Start by adding all of the expense amounts together."]);

E("u5-percent-of-income-mc", 5, ["1.3"], 2, "gen", function(){
  var name=pick(u5Names), attempt=0, out=null;
  while(attempt<60 && !out){
    attempt++;
    var inc=ri(1800,4200)*100, mode=ri(0,2);
    var cats=[{label:"housing", lo:700, hi:1500},{label:"food", lo:280, hi:650},{label:"transport", lo:110, hi:380},{label:"child care", lo:300, hi:800}];
    var c1=pick(cats), a1=ri(c1.lo,c1.hi)*100;
    var c2=pick(cats.filter(function(c){return c.label!==c1.label;}));
    var a2=ri(c2.lo,c2.hi)*100;
    var save=ri(100,500)*100;
    var part, partTxt, prompt, errVals;
    if(mode===0){
      part=a1; partTxt=c1.label;
      prompt=name+" has a monthly income of "+u5M(inc)+". The amount spent on "+c1.label+" is "+u5M(a1)+". What percent of the income is spent on "+c1.label+"?";
      errVals=[
        {p:(inc-a1)/inc*100, fb:"This is the percent of income left after "+c1.label+", not the percent spent on it."},
        {p:a1/(inc+a1)*100, fb:"This divides by the income plus the expense. Divide by the income alone."},
        {p:inc/a1*100, fb:"This divides the income by the expense, which reverses the ratio and gives a value over 100%."}];
    } else if(mode===1){
      part=a1+a2; partTxt=c1.label+" and "+c2.label;
      prompt=name+" has a monthly income of "+u5M(inc)+". The amounts spent are "+u5M(a1)+" on "+c1.label+" and "+u5M(a2)+" on "+c2.label+". What percent of the income is spent on "+c1.label+" and "+c2.label+" combined?";
      errVals=[
        {p:a1/inc*100, fb:"This counts only the "+c1.label+" amount. Add both amounts first."},
        {p:a2/inc*100, fb:"This counts only the "+c2.label+" amount. Add both amounts first."},
        {p:(inc-part)/inc*100, fb:"This is the percent of income left after both costs, not the percent spent on them."}];
    } else {
      part=save; partTxt="savings";
      prompt=name+" has a monthly income of "+u5M(inc)+" and puts "+u5M(save)+" into savings each month. What percent of the income goes into savings?";
      errVals=[
        {p:(inc-save)/inc*100, fb:"This is the percent of income that is not saved, not the percent saved."},
        {p:save/(inc-save)*100, fb:"This divides by the income after saving. Divide by the full income."},
        {p:inc/save*100, fb:"This divides the income by the savings, which reverses the ratio."}];
    }
    var correct=Math.round(part/inc*1000)/10;
    var seen={}; seen[correct]=1; var ok=true; var distractors=[];
    for(var i=0;i<errVals.length;i++){
      var v=Math.round(errVals[i].p*10)/10;
      if(seen[v]||v<=0){ ok=false; break; }
      seen[v]=1; distractors.push({t:u5PctTxt(v), fb:errVals[i].fb});
    }
    if(!ok) continue;
    var sol="Divide the part by the full income, then multiply by 100. \\[ \\begin{aligned} \\text{Percent} &= \\frac{"+fmtF(part/100,2)+"}{"+fmtF(inc/100,2)+"} \\times 100 \\\\ &\\approx "+fmtF(correct,1)+"\\% \\end{aligned} \\] The answer is <b>"+u5PctTxt(correct)+"</b>.";
    out=mcq(prompt, {t:u5PctTxt(correct), fb:"Yes. The part divided by the income, times 100, gives this percent."}, distractors, sol, {mode:mode, pct:correct});
  }
  if(out) return out;
  return mcq("A monthly income is $2,000.00. The amount spent on housing is $800.00. What percent of the income is spent on housing?",
    {t:"40.0%", fb:"Yes. 800 divided by 2000, times 100, is 40.0%."},
    [{t:"60.0%", fb:"This is the percent of income left after housing."},{t:"250.0%", fb:"This reverses the ratio."},{t:"20.0%", fb:"This uses half of the housing amount."}],
    "Divide the part by the full income, then multiply by 100: 800 divided by 2000 times 100 is 40.0%. The answer is <b>40.0%</b>.", {mode:0, pct:40});
}, ["A percent of income is the part divided by the income, times 100.", "Write the amounts as a fraction with the category amount on top and the income on the bottom."]);

E("u5-week-spending-mc", 5, ["1.4"], 2, "gen", function(){
  var name=pick(u5Names), attempt=0, out=null;
  while(attempt<60 && !out){
    attempt++;
    var food=[
      {d:"Monday", t:"groceries", c:ri(2400,9200)},
      {d:"Wednesday", t:"lunch at a cafe", c:ri(950,2400)},
      {d:"Friday", t:"groceries", c:ri(1800,7600)},
      {d:"Saturday", t:"snacks for a movie night at home", c:ri(800,3200)}];
    var trans=[
      {d:"Tuesday", t:"bus fares", c:ri(300,1200)},
      {d:"Thursday", t:"gasoline", c:ri(2800,8200)}];
    var fun=[
      {d:"Friday", t:"a movie ticket", c:ri(1100,1900)},
      {d:"Sunday", t:"a video game rental", c:ri(500,1500)}];
    var all=food.concat(trans).concat(fun);
    var sumF=0; food.forEach(function(e){sumF+=e.c;});
    var sumT=0; trans.forEach(function(e){sumT+=e.c;});
    var sumFun=0; fun.forEach(function(e){sumFun+=e.c;});
    var total=sumF+sumT+sumFun;
    var list=all.map(function(e){ return e.d+": "+e.t+", "+u5M(e.c); }).join("; ")+".";
    var mode=ri(0,2), prompt, correctC, errs, solHead, solParts;
    if(mode===0){
      prompt=name+" recorded one week of spending. "+list+" What was the total spent on food (groceries, lunch and snacks)?";
      correctC=sumF; solHead="Add only the food items: groceries, lunch and snacks.";
      solParts=food.map(function(e){return fmtF(e.c/100,2);});
      errs=[{v:sumF-food[1].c, fb:"This leaves out the cafe lunch, which is a food cost."},
            {v:total, fb:"This is the total for the whole week, including transport and fun spending."},
            {v:sumF+sumT, fb:"This adds the transport costs to the food costs."}];
    } else if(mode===1){
      prompt=name+" recorded one week of spending. "+list+" What was the total spent during the week?";
      correctC=total; solHead="Add every item recorded during the week.";
      solParts=all.map(function(e){return fmtF(e.c/100,2);});
      errs=[{v:sumF, fb:"This counts only the food items. Add transport and fun spending as well."},
            {v:total-fun[0].c-fun[1].c, fb:"This leaves out the fun spending. It is part of the week total."},
            {v:total+trans[1].c, fb:"This counts the gasoline cost twice."}];
    } else {
      prompt=name+" recorded one week of spending. "+list+" What was the total spent on transport and fun activities combined?";
      correctC=sumT+sumFun; solHead="Add the transport items and the fun items, and leave out the food items.";
      solParts=trans.concat(fun).map(function(e){return fmtF(e.c/100,2);});
      errs=[{v:sumT, fb:"This counts only transport. Add the fun activities as well."},
            {v:sumFun, fb:"This counts only the fun activities. Add transport as well."},
            {v:total, fb:"This includes the food costs, which the question does not ask for."}];
    }
    var vals=[correctC].concat(errs.map(function(e){return e.v;}));
    var uniq={}; var dup=false;
    vals.forEach(function(v){ if(uniq[v]) dup=true; uniq[v]=1; });
    if(dup) continue;
    var distractors=errs.map(function(e){ return {t:u5M(e.v), fb:e.fb}; });
    var q=mcq(prompt, {t:u5M(correctC), fb:"Yes. Adding the matching items gives this total."}, distractors,
      solHead+" \\[ \\begin{aligned} \\text{Total} &= "+solParts.join(" + ")+" \\\\ &= "+fmtF(correctC/100,2)+" \\end{aligned} \\] Rounded to the cent, the answer is <b>"+u5M(correctC)+"</b>.",
      {mode:mode, tot:correctC});
    q.figure=u5BarFig("Week spending by category", ["Food","Transport","Fun"], [sumF,sumT,sumFun]);
    out=q;
  }
  if(out) return out;
  return mcq("One week of spending: Monday: groceries, $40.00; Tuesday: bus fares, $6.00. What was the total spent on food?",
    {t:"$40.00", fb:"Yes. The groceries are the only food item."},
    [{t:"$46.00", fb:"This adds the bus fares, which are transport."},{t:"$6.00", fb:"This is the transport cost, not food."},{t:"$34.00", fb:"This subtracts the fares from the groceries."}],
    "Add only the food items. The groceries are the only food cost, so the total is $40.00. The answer is <b>$40.00</b>.", {mode:0});
}, ["First sort the records into categories, then add only the items the question asks about.", "Go through the list one item at a time and mark which category each item belongs to."]);

/* ---------- Level 3 MC (generators) ---------- */

E("u5-modify-for-goal-mc", 5, ["1.5","1.3"], 3, "gen", function(){
  var name=pick(u5Names), attempt=0, out=null;
  while(attempt<80 && !out){
    attempt++;
    var b=u5Budget();
    var goal=ri(200,550)*100;
    if(b.bal>=goal) continue;
    var need=goal-b.bal;
    var cand=[goal, goal-2*b.bal, Math.abs(b.bal)];
    var vals=[need].concat(cand); var seen={}; var bad=false;
    vals.forEach(function(v){ if(v<=0||seen[v]) bad=true; seen[v]=1; });
    if(bad) continue;
    var prompt=name+" has a monthly income of "+u5M(b.inc)+" and monthly expenses of: "+u5ExpList(b.exps)+". "+name+" wants to save "+u5M(goal)+" each month. By how much must monthly spending be reduced to reach that saving goal?";
    out=mcq(prompt,
      {t:u5M(need), fb:"Yes. The goal minus the current balance is the extra amount that must be freed."},
      [{t:u5M(cand[0]), fb:"This is the full goal. It ignores the balance the budget already has, whether it is a surplus or a shortfall."},
       {t:u5M(cand[1]), fb:"This counts the current balance twice. Use the goal minus the balance, once."},
       {t:u5M(cand[2]), fb:"This is just the size of the current balance. The cut must close the gap between the balance and the goal."}],
      "Find the current balance, then the gap to the goal. \\[ \\begin{aligned} \\text{Balance} &= "+fmtF(b.inc/100,2)+" - "+fmtF(b.tot/100,2)+" = "+fmtF(b.bal/100,2)+" \\\\ \\text{Extra saving needed} &= "+fmtF(goal/100,2)+" - ("+fmtF(b.bal/100,2)+") \\\\ &= "+fmtF(need/100,2)+" \\end{aligned} \\] Spending must be reduced by <b>"+u5M(need)+"</b> per month.",
      {need:need, goal:goal, bal:b.bal});
  }
  if(out) return out;
  return mcq("A monthly budget has an income of $2,600.00 and total expenses of $2,500.00. The goal is to save $300.00 each month. By how much must monthly spending be reduced?",
    {t:"$200.00", fb:"Yes. The current balance is $100.00, so another $200.00 must be freed."},
    [{t:"$300.00", fb:"This is the full goal and ignores the current balance."},{t:"$100.00", fb:"This is the current balance, not the extra cut needed."},{t:"$400.00", fb:"This counts the current balance the wrong way."}],
    "The balance is 2600 minus 2500, which is 100. The gap to the goal is 300 minus 100, which is 200. Spending must be reduced by <b>$200.00</b>.", {need:20000});
}, ["Work out the current balance first. The cut needed is the gap between that balance and the saving goal.", "Start with income minus total expenses to find what the budget already saves or overspends."]);

E("u5-what-if-mc", 5, ["1.6","1.3"], 3, "gen", function(){
  var name=pick(u5Names), b=u5Budget(), mode=ri(0,3);
  var changeC, changeTxt, promptBase=name+" has a monthly income of "+u5M(b.inc)+" and monthly expenses of: "+u5ExpList(b.exps)+". The current balance is "+u5M(b.bal)+". ";
  var housing=b.exps[0].c;
  if(mode===0){
    var p=pick([10,15,20,25]); changeC=Math.round(b.inc*p/100);
    changeTxt="the income drops by "+p+"% (a loss of "+u5M(changeC)+")";
  } else if(mode===1){
    changeC=ri(40,180)*100;
    changeTxt="the housing cost rises by "+u5M(changeC);
  } else if(mode===2){
    changeC=ri(100,420)*100;
    changeTxt="the income drops by "+u5M(changeC)+" because fewer shifts are worked";
  } else {
    var p2=pick([5,10,15,20]); changeC=Math.round(housing*p2/100);
    changeTxt="the housing cost rises by "+p2+"% (an increase of "+u5M(changeC)+")";
  }
  var newBal=b.bal-changeC;
  var opts=u5MoneyOpts(newBal,[
    {v:b.bal, fb:"This is the old balance. It ignores the change described in the question."},
    {v:b.bal+changeC, fb:"This moves the balance the wrong way. The change makes the balance smaller, not larger."},
    {v:b.bal-2*changeC, fb:"This applies the change twice. Apply it once."}]);
  return mcq(promptBase+"What if "+changeTxt+" and nothing else changes? What is the new monthly balance?",
    {t:u5M(newBal), fb:"Yes. The new balance is the old balance minus the size of the change."}, opts,
    "The change reduces the balance by "+u5M(changeC)+". \\[ \\begin{aligned} \\text{New balance} &= "+fmtF(b.bal/100,2)+" - "+fmtF(changeC/100,2)+" \\\\ &= "+fmtF(newBal/100,2)+" \\end{aligned} \\] The answer is <b>"+u5M(newBal)+"</b>.",
    {mode:mode, newBal:newBal, change:changeC});
}, ["Find the size of the change in dollars, then apply it to the current balance once.", "Start by working out how many dollars the income drop or expense rise is worth."]);

/* ---------- Constructed response (numq) ---------- */

E("u5-cr-total-expenses", 5, ["1.3"], 2, "gen", function(){
  var name=pick(u5Names), b=u5Budget();
  return numq(name+" is creating a budget. The monthly expenses are: "+u5ExpList(b.exps)+". What are the total monthly expenses, in dollars?",
    b.tot/100, 0.01,
    "Add all five expenses. \\[ \\begin{aligned} \\text{Total expenses} &= "+b.exps.map(function(e){return fmtF(e.c/100,2);}).join(" + ")+" \\\\ &= "+fmtF(b.tot/100,2)+" \\end{aligned} \\] The answer is <b>"+u5M(b.tot)+"</b>.",
    {tot:b.tot});
}, ["Add every expense category, including the small ones.", "Start by adding the two largest expenses, then add the rest one at a time."]);

E("u5-cr-budget-balance", 5, ["1.3"], 2, "gen", function(){
  var name=pick(u5Names), b=u5Budget(), guard=0;
  while((b.bal<2000||b.bal>45000)&&guard<60){ b=u5Budget(); guard++; }
  return numq(name+" has a monthly income of "+u5M(b.inc)+". The monthly expenses are: "+u5ExpList(b.exps)+". What is the monthly balance, in dollars? (Income minus total expenses.)",
    b.bal/100, 0.01,
    "Total the expenses, then subtract from the income. \\[ \\begin{aligned} \\text{Total expenses} &= "+fmtF(b.tot/100,2)+" \\\\ \\text{Balance} &= "+fmtF(b.inc/100,2)+" - "+fmtF(b.tot/100,2)+" \\\\ &= "+fmtF(b.bal/100,2)+" \\end{aligned} \\] The answer is <b>"+u5M(b.bal)+"</b>.",
    {bal:b.bal});
}, ["The balance compares the money coming in with the money going out.", "Start by adding all of the expenses to get one total."]);

E("u5-cr-category-percent", 5, ["1.3"], 2, "gen", function(){
  var name=pick(u5Names);
  var inc=ri(1900,4200)*100, house=ri(700,1500)*100;
  var pct=Math.round(house/inc*1000)/10;
  return numq(name+" has a monthly income of "+u5M(inc)+" and pays "+u5M(house)+" for housing. What percent of the income is spent on housing? Give your answer as a percent, to the nearest tenth of a percent.",
    pct, 0.6,
    "Divide the housing cost by the income, then multiply by 100. \\[ \\begin{aligned} \\text{Percent} &= \\frac{"+fmtF(house/100,2)+"}{"+fmtF(inc/100,2)+"} \\times 100 \\\\ &\\approx "+fmtF(pct,1)+"\\% \\end{aligned} \\] The answer is <b>"+u5PctTxt(pct)+"</b>.",
    {pct:pct});
}, ["A percent of income is a part divided by the whole income, times 100.", "Start by writing the housing cost over the income as a fraction."]);

E("u5-cr-week-record-total", 5, ["1.4"], 2, "gen", function(){
  var name=pick(u5Names);
  var recs=[
    {d:"Monday", t:"groceries", cat:"food", c:ri(2600,9400)},
    {d:"Tuesday", t:"bus fares", cat:"transport", c:ri(300,1250)},
    {d:"Wednesday", t:"sandwiches from a deli", cat:"food", c:ri(850,2600)},
    {d:"Thursday", t:"gasoline", cat:"transport", c:ri(3000,8400)},
    {d:"Friday", t:"groceries", cat:"food", c:ri(1900,7800)},
    {d:"Saturday", t:"a concert ticket", cat:"fun", c:ri(4200,9800)},
    {d:"Sunday", t:"fruit and snacks", cat:"food", c:ri(700,3400)}];
  var foodC=0, foodParts=[];
  recs.forEach(function(r){ if(r.cat==="food"){ foodC+=r.c; foodParts.push(fmtF(r.c/100,2)); } });
  var list=recs.map(function(r){ return r.d+": "+r.t+", "+u5M(r.c); }).join("; ")+".";
  return numq(name+" kept a one week spending record to help build a budget. "+list+" What was the total spent on food during the week, in dollars?",
    foodC/100, 0.01,
    "Sort the record first: the food items are the groceries on Monday, the sandwiches, the groceries on Friday, and the fruit and snacks. \\[ \\begin{aligned} \\text{Food total} &= "+foodParts.join(" + ")+" \\\\ &= "+fmtF(foodC/100,2)+" \\end{aligned} \\] The answer is <b>"+u5M(foodC)+"</b>.",
    {food:foodC});
}, ["Sort each record into a category first, then add only the category asked for.", "Go through the week one day at a time and mark each item as food, transport, or fun."]);

E("u5-cr-modify-budget", 5, ["1.5"], 2, "gen", function(){
  var name=pick(u5Names), attempt=0, out=null;
  while(attempt<80 && !out){
    attempt++;
    var b=u5Budget();
    var months=pick([4,5,6,8,10,12]);
    var monthlyGoal=ri(150,400)*100;
    if(b.bal>=monthlyGoal) continue;
    var totalGoal=monthlyGoal*months;
    var need=monthlyGoal-b.bal;
    out=numq(name+" wants to save "+u5M(totalGoal)+" in "+months+" months. The current monthly budget has an income of "+u5M(b.inc)+" and total monthly expenses of "+u5M(b.tot)+". By how much, in dollars, must monthly spending be reduced so the goal is reached on time?",
      need/100, 0.01,
      "Work out the saving needed each month, then compare it with the current balance. \\[ \\begin{aligned} \\text{Saving needed per month} &= "+fmtF(totalGoal/100,2)+" \\div "+months+" = "+fmtF(monthlyGoal/100,2)+" \\\\ \\text{Current balance} &= "+fmtF(b.inc/100,2)+" - "+fmtF(b.tot/100,2)+" = "+fmtF(b.bal/100,2)+" \\\\ \\text{Extra reduction} &= "+fmtF(monthlyGoal/100,2)+" - ("+fmtF(b.bal/100,2)+") = "+fmtF(need/100,2)+" \\end{aligned} \\] Monthly spending must be reduced by <b>"+u5M(need)+"</b>.",
      {need:need, months:months});
  }
  if(out) return out;
  return numq("A saver wants to save $1,800.00 in 6 months. The current monthly budget has an income of $2,600.00 and total monthly expenses of $2,500.00. By how much, in dollars, must monthly spending be reduced so the goal is reached on time?",
    200, 0.01,
    "Saving needed per month is 1800 divided by 6, which is 300. The current balance is 2600 minus 2500, which is 100. The extra reduction is 300 minus 100, which is 200. Monthly spending must be reduced by <b>$200.00</b>.", {need:20000});
}, ["Split the goal across the months first, then compare that monthly target with what the budget already saves.", "Start by dividing the total goal by the number of months."]);

E("u5-cr-what-if-balance", 5, ["1.6"], 2, "gen", function(){
  var name=pick(u5Names), b=u5Budget();
  var drop=ri(80,350)*100, rise=ri(25,150)*100;
  var newBal=b.bal-drop-rise;
  return numq(name+" has a monthly income of "+u5M(b.inc)+" and monthly expenses of: "+u5ExpList(b.exps)+". Next month the income drops by "+u5M(drop)+" and the food cost rises by "+u5M(rise)+", with nothing else changing. What is the new monthly balance, in dollars?",
    newBal/100, 0.01,
    "Find the current balance, then apply both changes once. \\[ \\begin{aligned} \\text{Current balance} &= "+fmtF(b.inc/100,2)+" - "+fmtF(b.tot/100,2)+" = "+fmtF(b.bal/100,2)+" \\\\ \\text{New balance} &= "+fmtF(b.bal/100,2)+" - "+fmtF(drop/100,2)+" - "+fmtF(rise/100,2)+" \\\\ &= "+fmtF(newBal/100,2)+" \\end{aligned} \\] The answer is <b>"+u5M(newBal)+"</b>.",
    {newBal:newBal, drop:drop, rise:rise});
}, ["Both changes make the balance smaller: one brings in less money and the other spends more.", "Start by finding the current balance from the income and the expense total."]);

E("u5-cr-goal-after-change", 5, ["1.5","1.6"], 3, "gen", function(){
  var name=pick(u5Names), attempt=0, out=null;
  while(attempt<80 && !out){
    attempt++;
    var b=u5Budget();
    var drop=ri(100,400)*100;
    var newBal=b.bal-drop;
    var goal=ri(200,500)*100;
    if(newBal>=goal) continue;
    var need=goal-newBal;
    out=numq(name+" has a monthly income of "+u5M(b.inc)+" and monthly expenses of: "+u5ExpList(b.exps)+". Work hours are cut, so the income will drop by "+u5M(drop)+" per month. "+name+" still wants to save "+u5M(goal)+" each month. By how much, in dollars, must monthly spending be reduced to reach the saving goal after the income drop?",
      need/100, 0.01,
      "Apply the income drop to the balance first, then find the gap to the goal. \\[ \\begin{aligned} \\text{Current balance} &= "+fmtF(b.inc/100,2)+" - "+fmtF(b.tot/100,2)+" = "+fmtF(b.bal/100,2)+" \\\\ \\text{Balance after the drop} &= "+fmtF(b.bal/100,2)+" - "+fmtF(drop/100,2)+" = "+fmtF(newBal/100,2)+" \\\\ \\text{Reduction needed} &= "+fmtF(goal/100,2)+" - ("+fmtF(newBal/100,2)+") = "+fmtF(need/100,2)+" \\end{aligned} \\] Monthly spending must be reduced by <b>"+u5M(need)+"</b>.",
      {need:need, newBal:newBal});
  }
  if(out) return out;
  return numq("A monthly budget has an income of $2,600.00 and total expenses of $2,500.00. The income will drop by $200.00 per month, and the goal is still to save $300.00 each month. By how much, in dollars, must monthly spending be reduced?",
    400, 0.01,
    "The current balance is 100. After the drop it is -100. The gap to the goal is 300 minus -100, which is 400. Monthly spending must be reduced by <b>$400.00</b>.", {need:40000});
}, ["Update the balance for the income change first. The spending cut then has to close the gap between the new balance and the goal.", "Start with income minus total expenses, then subtract the income drop."]);

E("u5-cr-max-wants-spending", 5, ["1.3","1.5","1.6"], 3, "gen", function(){
  var name=pick(u5Names), attempt=0, out=null;
  while(attempt<80 && !out){
    attempt++;
    var inc=ri(2200,3600)*100;
    var p=pick([4,5,6,8,10]);
    var newInc=inc+Math.round(inc*p/100);
    var needs=[
      {label:"Housing", c:ri(800,1350)*100},
      {label:"Food", c:ri(300,600)*100},
      {label:"Transport", c:ri(120,320)*100},
      {label:"Phone and internet", c:ri(70,150)*100}];
    var needTot=0; needs.forEach(function(e){ needTot+=e.c; });
    var goal=ri(200,450)*100;
    var maxWants=newInc-needTot-goal;
    if(maxWants<5000||maxWants>70000) continue;
    out=numq(name+" earns "+u5M(inc)+" per month and will get a raise of "+p+"%. The monthly needs are: "+u5ExpList(needs)+". "+name+" wants to save "+u5M(goal)+" each month after the raise. What is the most, in dollars, that can be spent on wants each month after the raise while still covering the needs and the saving goal?",
      maxWants/100, 0.01,
      "Find the new income, total the needs, then subtract the needs and the saving goal. \\[ \\begin{aligned} \\text{New income} &= "+fmtF(inc/100,2)+" \\times 1."+(p<10?"0":"")+p+" = "+fmtF(newInc/100,2)+" \\\\ \\text{Total needs} &= "+fmtF(needTot/100,2)+" \\\\ \\text{Most for wants} &= "+fmtF(newInc/100,2)+" - "+fmtF(needTot/100,2)+" - "+fmtF(goal/100,2)+" \\\\ &= "+fmtF(maxWants/100,2)+" \\end{aligned} \\] The answer is <b>"+u5M(maxWants)+"</b>.",
      {maxWants:maxWants, newInc:newInc});
  }
  if(out) return out;
  return numq("A worker earns $2,500.00 per month and will get a raise of 10%. Monthly needs total $1,900.00 and the saving goal is $300.00 per month. What is the most, in dollars, that can be spent on wants each month after the raise?",
    550, 0.01,
    "The new income is 2500 times 1.10, which is 2750. Subtract the needs and the goal: 2750 minus 1900 minus 300 is 550. The answer is <b>$550.00</b>.", {maxWants:55000});
}, ["Wants get whatever is left after the new income covers the needs and the saving goal.", "Start by applying the raise to find the new monthly income."]);

/* ===== Prior knowledge tranche (Nov 15, 2026): Cluster 8 (pay and budget readiness). Borrowed verbatim from Mathematics 1202 (u4-decimal-hours-total, u4-gross-overtime, u4-gross-with-tips, u4-deduction-calc, u4-cpp-ei-tax-cr, u4-net-from-deductions) and Mathematics 8 (u5-percent-of-number); feeder helper copies ride in bank-helpers.js. ===== */
E("u5-pk-hours-total", 5, ["1.3"],1,"gen",function(){
 var days=["Monday","Tuesday","Wednesday"], hs=[], ms=[], tot=0, wrongMin=0, parts=[], chain=[];
 for(var i=0;i<3;i++){var h=ri(4,9), m=pick([0,15,30,45]); hs.push(h); ms.push(m); tot+=h+m/60; wrongMin+=h+m/100; parts.push(days[i]+" "+h+" h "+(m<10?"0":"")+m+" min"); chain.push(fmt(h+m/60));}
 var last=hs[2]+ms[2]/60;
 var ds=u4Dist(tot,[{v:wrongMin,fb:"That treats the minutes as hundredths of an hour. Divide minutes by 60 to change them to hours."},{v:tot-last,fb:"That leaves out one day. Add the time for all three days."},{v:tot+1,fb:"That adds a full extra hour. Convert each day's minutes by dividing by 60, then add."}],function(v){return fmt(v);},0.25);
 var _bo=balOpts({t:fmt(tot),fb:"Yes: change each day's minutes to a decimal part of an hour, then add the three days."},ds);
 var q=mcq("The table shows the time one worker put in on three days. What is the total time worked, in decimal hours?",
  _bo[0],_bo[1],
  "Change minutes to hours by dividing by 60, then add. \\[ \\begin{aligned} \\text{Total} &= "+chain.join(" + ")+" \\\\ &= "+fmt(tot)+" \\end{aligned} \\] The total time worked is <b>"+u4Hrs(tot)+"</b>.",
  {hs:hs,ms:ms});
 q.figure=u4TableFig([["Day","Time worked"]].concat(parts.map(function(p){var b=p.split(" ");return [b[0],b.slice(1).join(" ")];})));
 return q;
},["Decimal hours means the minutes become a decimal part of one hour.","For each day, divide the minutes by 60 and add that to the hours, then total the days."]);

E("u5-pk-gross-overtime", 5, ["1.3"],2,"gen",function(){
 var w=ri(1500,2600)/100, R=ri(30,40), O=ri(2,10);
 var reg=u4R(R*w), ot=u4R(O*1.5*w), gross=u4R(reg+ot);
 var ds=u4Dist(gross,[{v:u4R((R+O)*w),fb:"That pays every hour at the regular rate. Overtime hours earn time and a half, not the regular rate."},
  {v:u4R(reg+O*2*w),fb:"That pays overtime at double time, which is 2 times the wage. The stem says time and a half, which is 1.5 times."},
  {v:reg,fb:"That is only the regular hours. Add pay for the overtime hours at 1.5 times the wage."}],u4M,2.50);
 return mcq("A cook earns "+u4M(w)+" per hour. In one week the cook works "+R+" regular hours and "+O+" overtime hours paid at time and a half. What is the gross pay for the week?",
  {t:u4M(gross),fb:"Yes: regular pay plus overtime pay at 1.5 times the wage."},ds,
  "Work out regular pay and overtime pay, then add. \\[ \\begin{aligned} \\text{Regular pay} &= "+R+" \\times "+fmtF(w,2)+" = "+fmtF(reg,2)+" \\\\ \\text{Overtime pay} &= "+O+" \\times 1.5 \\times "+fmtF(w,2)+" = "+fmtF(ot,2)+" \\\\ \\text{Gross pay} &= "+fmtF(reg,2)+" + "+fmtF(ot,2)+" = "+fmtF(gross,2)+" \\end{aligned} \\] The gross pay is <b>"+u4M(gross)+"</b>.",
  {w:w,R:R,O:O});
},["Split the hours into regular hours and overtime hours, and price each group at its own rate.","Start with the regular hours times the wage."]);

E("u5-pk-gross-tips", 5, ["1.3"],2,"gen",function(){
 var w=ri(1400,2000)/100, h=ri(20,38), tips=ri(40,240);
 var wage=u4R(h*w), gross=u4R(wage+tips);
 var ds=u4Dist(gross,[{v:wage,fb:"That is the wage only. The tips are part of gross pay too, so add them."},
  {v:u4R(wage-tips),fb:"That subtracts the tips. Tips add to what the server earned."},
  {v:u4R(h*(w+tips)),fb:"That treats the tips as an hourly rate and multiplies them by the hours. Tips are one total amount, added once."}],u4M,2.50);
 return mcq("A server earns "+u4M(w)+" per hour and works "+h+" hours in a week. The server also receives "+u4M(tips)+" in tips. What is the gross pay for the week?",
  {t:u4M(gross),fb:"Yes: hours times wage, plus the full tips amount, gives gross pay."},ds,
  "Gross pay counts both the wage and the tips. \\[ \\begin{aligned} \\text{Wage} &= "+h+" \\times "+fmtF(w,2)+" = "+fmtF(wage,2)+" \\\\ \\text{Gross pay} &= "+fmtF(wage,2)+" + "+fmtF(tips,2)+" = "+fmtF(gross,2)+" \\end{aligned} \\] The gross pay is <b>"+u4M(gross)+"</b>.",
  {w:w,h:h,tips:tips});
},["Gross pay includes everything earned in the period: the wage and the tips.","Start with hours times the hourly wage."]);

E("u5-pk-deduction-calc", 5, ["1.3"],2,"gen",function(){
 var G=ri(1500,3400), mode=ri(1,4), name="", rate=0, ded=0, cap=0, stem="";
 if(mode===1){name="CPP"; rate=pick([5,5.5,6,6.5]); ded=u4R(G*rate/100); stem="The CPP rate given for this problem is "+fmt(rate)+"% of gross pay.";}
 else if(mode===2){name="EI"; rate=pick([1.5,2,2.5]); ded=u4R(G*rate/100); stem="The EI rate given for this problem is "+fmt(rate)+"% of gross pay.";}
 else if(mode===3){name="income tax"; rate=pick([10,12,15,20]); ded=u4R(G*rate/100); stem="The income tax rate given for this problem is "+fmt(rate)+"% of gross pay.";}
 else {name="CPP"; rate=pick([6,6.5,7]); cap=ri(150,210); var raw=u4R(G*rate/100); ded=Math.min(raw,cap); stem="The CPP rate given for this problem is "+fmt(rate)+"% of gross pay, up to a maximum deduction of "+u4M(cap)+" per pay period.";}
 var ds=u4Dist(ded,[{v:u4R(G-ded),fb:"That is the pay left after this one deduction. The question asks for the deduction itself."},
  {v:u4R(ded/2),fb:"That takes half of the deduction. Apply the stated percent to the full gross pay for the period."},
  {v:u4R(G*(rate+2)/100),fb:"That uses a rate 2 percent higher than the stated rate. Use the rate given in the stem."}],u4M,2.50);
 var capNote=(mode===4)?" The percent gives "+fmtF(u4R(G*rate/100),2)+", which is over the maximum, so the deduction is capped at "+fmtF(cap,2)+".":"";
 return mcq("A worker's gross pay for one pay period is "+u4M(G)+". "+stem+" What is the "+name+" deduction for this period?",
  {t:u4M(ded),fb:"Yes: apply the stated rate to the gross pay"+(mode===4?", and respect the stated maximum":"")+"."},ds,
  "A percent deduction is the rate times the gross pay. \\[ \\begin{aligned} \\text{"+name+" deduction} &= "+fmt(rate)+"\\% \\times "+fmtF(G,2)+" \\\\ &= "+fmtF(u4R(G*rate/100),2)+" \\end{aligned} \\]"+capNote+" The "+name+" deduction is <b>"+u4M(ded)+"</b>.",
  {mode:mode,G:G,rate:rate});
},["Percent deduction means rate times gross pay. Watch for a stated maximum.","Start by writing the rate as a decimal or as a fraction of 100."]);

E("u5-pk-cpp-ei-tax", 5, ["1.3"],2,"gen",function(){
 var G=ri(140,320)*10, cppR=pick([5,5.5,6]), eiR=pick([1.5,2]), taxR=pick([10,12,15]);
 var cpp=u4R(G*cppR/100), ei=u4R(G*eiR/100), tax=u4R(G*taxR/100), tot=u4R(cpp+ei+tax);
 return numq("A worker's gross pay for a pay period is "+u4M(G)+". For this problem, use these deduction rates: CPP is "+fmt(cppR)+"% of gross pay, EI is "+fmt(eiR)+"% of gross pay, and income tax is "+fmt(taxR)+"% of gross pay. Find the total of these three deductions. Give your answer in dollars.",
  tot,0.05,
  "Apply each stated rate to the gross pay, then add. \\[ \\begin{aligned} \\text{CPP} &= "+fmt(cppR)+"\\% \\times "+fmtF(G,2)+" = "+fmtF(cpp,2)+" \\\\ \\text{EI} &= "+fmt(eiR)+"\\% \\times "+fmtF(G,2)+" = "+fmtF(ei,2)+" \\\\ \\text{Income tax} &= "+fmt(taxR)+"\\% \\times "+fmtF(G,2)+" = "+fmtF(tax,2)+" \\\\ \\text{Total} &= "+fmtF(cpp,2)+" + "+fmtF(ei,2)+" + "+fmtF(tax,2)+" = "+fmtF(tot,2)+" \\end{aligned} \\] The total deductions are <b>"+u4M(tot)+"</b>.",
  {G:G,cppR:cppR,eiR:eiR,taxR:taxR});
},["Each deduction is its stated percent of the same gross pay.","Start with the CPP amount: rate times gross pay, with the percent changed to a decimal."]);

E("u5-pk-net-pay", 5, ["1.3"],2,"gen",function(){
 var G=ri(1500,3000), mode=ri(1,2);
 var items=[["health plan",ri(30,90)],["union dues",ri(20,60)],["uniform cost",ri(10,40)],["charitable donation",ri(5,30)]];
 var use=items.slice(0,ri(3,4)), tot=0, list=use.map(function(x){tot+=x[1]; return x[0]+" "+u4M(x[1]);}).join(", ");
 var vp=0, vpText="", earn=G;
 if(mode===2){var pct=pick([4,6]); vp=u4R(G*pct/100); vpText=" Vacation pay of "+pct+"% of gross pay is added before deductions."; earn=u4R(G+vp);}
 var good=u4R(earn-tot);
 var ds=u4Dist(good,[{v:u4R(G-tot),fb:mode===2?"That leaves out the vacation pay. Add the vacation pay to gross pay first, then subtract deductions.":"That subtracts from gross pay only. Check every amount that should come off."},
  {v:u4R(earn+tot),fb:"That adds the deductions. Deductions come off, so net pay is smaller."},
  {v:u4R(earn-use[0][1]),fb:"That subtracts only the first deduction. Subtract the total of all the deductions listed."}],u4M,2.50);
 return mcq("A worker's gross pay for a period is "+u4M(G)+"."+vpText+" The deductions for the period are: "+list+". What is the net pay?",
  {t:u4M(good),fb:"Yes: total the deductions and subtract them"+(mode===2?" after adding the vacation pay":"")+"."},ds,
  "Add any extra earnings, total the deductions, then subtract. \\[ \\begin{aligned} \\text{Total deductions} &= "+use.map(function(x){return fmtF(x[1],2);}).join(" + ")+" = "+fmtF(tot,2)+" \\\\ \\text{Net pay} &= "+fmtF(earn,2)+" - "+fmtF(tot,2)+" = "+fmtF(good,2)+" \\end{aligned} \\] The net pay is <b>"+u4M(good)+"</b>.",
  {mode:mode,G:G,tot:tot,vp:vp});
},["Net pay is what remains after every listed deduction comes off the earnings.","Start by adding all the deductions into one total."]);

E("u5-pk-percent-of-amount", 5, ["1.5"], 1, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var pairs = [[20, 150], [25, 240], [30, 120], [40, 250], [50, 180], [60, 350], [75, 160], [80, 450], [15, 200], [35, 300], [90, 600], [10, 480], [45, 220], [55, 400], [65, 500], [70, 320], [85, 700], [95, 900], [5, 640], [12, 350], [18, 450], [22, 550]];
    var pr = pick(pairs), p = pr[0], W = pr[1], ans = W * p / 100;
    var ctxs = [
      "In a survey, " + p + "% of " + W + " students said they walk to school. How many students said they walk to school?",
      "A hockey team won " + p + "% of its " + W + " shots on goal as goals this season. How many goals did the team score?",
      "A store sold " + p + "% of " + W + " concert tickets in the first hour. How many tickets were sold in the first hour?"
    ];
    var prompt = pick(ctxs);
    var sol = "Find the percent of the whole amount: \\[ \\begin{aligned} " + p + "\\% \\text{ of } " + W + " &= " + fmt(p / 100, 2) + " \\times " + W + " \\\\ &= " + fmt(ans, 0) + " \\end{aligned} \\] So the answer is <b>" + fmt(ans, 0) + "</b>.";
    return numq(prompt, ans, 0.01, sol, { mode: "pct-of-std", p: p, w: W });
  }
  if (mode === 1) {
    var pairs2 = [[110, 200], [120, 250], [125, 160], [130, 300], [150, 240], [175, 120], [200, 90], [140, 350], [115, 400], [135, 500], [160, 450], [180, 600], [225, 320], [250, 280]];
    var pr2 = pick(pairs2), p2 = pr2[0], W2 = pr2[1], ans2 = W2 * p2 / 100;
    var prompt2 = "Last year a trail crew cleared " + W2 + " m of trail. This year the crew cleared " + p2 + "% as much trail as last year. How many metres of trail did the crew clear this year?";
    var sol2 = "A percent over 100% gives an amount larger than the whole it is compared with: \\[ \\begin{aligned} " + p2 + "\\% \\text{ of } " + W2 + " &= " + fmt(p2 / 100, 2) + " \\times " + W2 + " \\\\ &= " + fmt(ans2, 0) + " \\end{aligned} \\] So the crew cleared <b>" + fmt(ans2, 0) + " m</b>.";
    return numq(prompt2, ans2, 0.01, sol2, { mode: "pct-of-over", p: p2, w: W2 });
  }
  var pairs3 = [[5, 4000], [4, 5000], [8, 2000], [5, 8000], [2, 10000], [8, 6000], [4, 12000], [2, 15000], [5, 20000], [8, 9000], [4, 25000], [2, 30000]];
  var pr3 = pick(pairs3), p10 = pr3[0], W3 = pr3[1], ans3 = W3 * p10 / 1000;
  var pStr3 = fmt(p10 / 10, 1);
  var prompt3 = "A town has " + W3 + " residents. About " + pStr3 + "% of the residents were born on a holiday. About how many residents were born on a holiday?";
  var sol3 = "A percent under 1% is a small fraction of the whole: \\[ \\begin{aligned} " + pStr3 + "\\% \\text{ of } " + W3 + " &= " + fmt(p10 / 1000, 4) + " \\times " + W3 + " \\\\ &= " + fmt(ans3, 0) + " \\end{aligned} \\] So about <b>" + fmt(ans3, 0) + " residents</b> were born on a holiday.";
  return numq(prompt3, ans3, 0.01, sol3, { mode: "pct-of-small", p: pStr3, w: W3 });
}, ["Turn the percent into a decimal first, then multiply by the whole amount.", "First write the percent as a decimal by dividing it by 100."]);

/* PK tranche metadata pass for Unit 5. The tranche's own entries are flagged here.  */
var PKT_U5_FOR=["1.1","1.2","1.3","1.4","1.5","1.6"];
var PKT_U5={
 "u5-pk-hours-total":{src:"math-1202:1.11",group:"gross-pay"},
 "u5-pk-gross-overtime":{src:"math-1202:1.12",group:"gross-pay"},
 "u5-pk-gross-tips":{src:"math-1202:1.12",group:"gross-pay"},
 "u5-pk-deduction-calc":{src:"math-1202:1.16",group:"payroll"},
 "u5-pk-cpp-ei-tax":{src:"math-1202:1.16",group:"payroll"},
 "u5-pk-net-pay":{src:"math-1202:1.17",group:"payroll"},
 "u5-pk-percent-of-amount":{src:"math-8:6.1",group:"percent-of-amount"}
};
BANK.forEach(function(e){var t=PKT_U5[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U5_FOR.slice();e.pkGroup=t.group;}});
