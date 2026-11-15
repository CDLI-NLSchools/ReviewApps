// Math 3202 Unit 5 Major Financial Purchases question bank
// CRMARKS: u5-lease-total-cr=3
// CRMARKS: u5-operating-cost-cr=4
// CRMARKS: u5-home-cash-cr=5
// CRMARKS: u5-rental-term-cr=4
// CRMARKS: u5-rent-own-province-cr=5
/* ===== Unit 5 ===== */
/* Math 3202 Unit 5: Major Financial Purchases (1.1-1.4, 1.10-1.12). Helpers prefixed u5. */
function u5M(n){ var neg=n<0; var s=Math.abs(Math.round(n*100)/100).toFixed(2); var p=s.split("."); p[0]=p[0].replace(/\B(?=(\d{3})+(?!\d))/g,","); return (neg?"-$":"$")+p[0]+"."+p[1]; }
function u5Bar(items){
  var W=320,H=190,base=158,ox=36,max=0,i;
  for(i=0;i<items.length;i++) if(items[i].v>max) max=items[i].v;
  var step=(W-ox-10)/items.length, bw=Math.min(46,step-14);
  var s='<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Monthly cost breakdown bar chart">';
  s+='<line x1="'+ox+'" y1="12" x2="'+ox+'" y2="'+base+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+='<line x1="'+ox+'" y1="'+base+'" x2="'+(W-6)+'" y2="'+base+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  for(i=0;i<items.length;i++){ var h=items[i].v/max*(base-30), x=ox+8+i*step, y=base-h;
    s+='<rect x="'+fmt(x,1)+'" y="'+fmt(y,1)+'" width="'+fmt(bw,1)+'" height="'+fmt(h,1)+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
    s+='<text x="'+fmt(x+bw/2,1)+'" y="'+fmt(y-6,1)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle">'+u5M(items[i].v)+'</text>';
    s+='<text x="'+fmt(x+bw/2,1)+'" y="'+(base+15)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle">'+items[i].label+'</text>'; }
  return s+'</svg>';
}

E("u5-vehicle-options", 5, ["1.1"], 1, "var", varset([
  function(){ return mcq("Sam pays the full price of a used truck in one payment and the truck is his from that day. Which vehicle option is this?",
    {t:"Buying outright", fb:"Yes: paying the full price at once makes the vehicle yours right away."},
    [{t:"Leasing", fb:"Leasing uses monthly payments for a set term and the vehicle is returned at the end unless a buyout is paid."},
     {t:"Leasing to buy", fb:"Leasing to buy spreads payments over time before ownership, so it does not match one full payment."},
     {t:"Buying with a loan", fb:"A loan spreads the price over many payments with interest, so it does not match paying in full at once."}],
    "Paying the full price in one payment, with ownership passing at once, is <b>buying outright</b>.", {}); },
  function(){ return mcq("Priya pays a car dealer a monthly amount for 36 months, stays under a yearly kilometre limit, and returns the car at the end of the term. Which vehicle option is this?",
    {t:"Leasing", fb:"Yes: monthly payments for a fixed term, a kilometre limit, and returning the vehicle are the marks of a lease."},
    [{t:"Buying outright", fb:"Buying outright is one full payment, not 36 monthly payments ending with a return."},
     {t:"Leasing to buy", fb:"Leasing to buy ends with the driver owning the vehicle, not returning it."},
     {t:"Buying with a loan", fb:"With a loan the borrower keeps the vehicle once the loan is repaid, and there is no kilometre limit."}],
    "A fixed term of monthly payments, a kilometre limit, and returning the vehicle at the end describe <b>leasing</b>.", {}); },
  function(){ return mcq("Devon makes lower monthly payments for three years, and those payments count toward the price of the vehicle, which he owns at the end of the agreement. Which vehicle option is this?",
    {t:"Leasing to buy", fb:"Yes: payments during the term build toward owning the vehicle at the end."},
    [{t:"Buying outright", fb:"Buying outright means one full payment at the start, not three years of payments."},
     {t:"Leasing", fb:"In a plain lease the vehicle is returned at the end unless a separate buyout is paid."},
     {t:"Buying with a loan", fb:"A loan buyer owns the vehicle from the start and repays the lender; here ownership comes at the end of the agreement."}],
    "Payments that build toward ownership at the end of the agreement describe <b>leasing to buy</b>.", {}); },
  function(){ return mcq("A bank lends Mia the price of an SUV. She owns the SUV from the start and repays the bank monthly, with interest, over five years. Which vehicle option is this?",
    {t:"Buying with a loan", fb:"Yes: she owns the vehicle while repaying borrowed money with interest."},
    [{t:"Buying outright", fb:"Buying outright uses her own money in one payment, with no borrowing or interest."},
     {t:"Leasing", fb:"Leasing ends with returning the vehicle, and the payments rent its use rather than repay a loan."},
     {t:"Leasing to buy", fb:"Leasing to buy gives ownership at the end of the agreement, but Mia owns the SUV from the start."}],
    "Owning the vehicle from the start while repaying borrowed money with interest is <b>buying with a loan</b>.", {}); },
  function(){ return mcq("A plumbing company gets two new vans for four years. It pays monthly, the dealer covers most repairs under warranty during the term, and the vans go back at the end. Which vehicle option is this?",
    {t:"Leasing", fb:"Yes: a business lease gives newer vehicles for a term, with warranty cover, and the vehicles are returned."},
    [{t:"Buying outright", fb:"Buying outright would be one full payment per van and the company would keep them."},
     {t:"Leasing to buy", fb:"Leasing to buy would end with the company owning the vans, not returning them."},
     {t:"Buying with a loan", fb:"A loan would leave the company owning the vans after repayment, with no return at the end."}],
    "Monthly payments for a set term, warranty cover during the term, and returning the vehicles describe <b>leasing</b>.", {}); },
  function(){ return mcq("Which statement best describes leasing to buy?",
    {t:"Payments over a term lead to owning the vehicle at the end of the agreement.", fb:"Yes: that path from payments to ownership is what sets leasing to buy apart."},
    [{t:"The full price is paid on the first day and no payments follow.", fb:"That describes buying outright."},
     {t:"The vehicle is returned at the end and payments never build toward ownership.", fb:"That describes a plain lease."},
     {t:"A bank lends the full price and the buyer owns the vehicle from the first day.", fb:"That describes buying with a loan."}],
    "In leasing to buy, the payments made during the term lead to the driver owning the vehicle at the end. The answer is <b>the payments-to-ownership statement</b>.", {}); }
]), ["Think about two things: how the payments work, and who owns the vehicle at the end.", "Start by asking whether the vehicle is kept, returned, or owned from the first day."]);

E("u5-home-costs-identify", 5, ["1.11"], 1, "var", varset([
  function(){ return mcq("Which cost is paid once, as part of buying a home, rather than as part of keeping a home year after year?",
    {t:"Closing costs, such as legal fees for the purchase", fb:"Yes: legal and closing fees are paid at the time of purchase."},
    [{t:"Property tax", fb:"Property tax is charged every year, so it is a cost of keeping the home."},
     {t:"Home insurance premiums", fb:"Insurance premiums are paid every year to keep cover in place."},
     {t:"Heating costs", fb:"Heating is an ongoing cost of living in and keeping the home."}],
    "Legal fees and other closing costs are paid once when the purchase closes. The answer is <b>closing costs</b>.", {}); },
  function(){ return mcq("A buyer pays 10 percent of the purchase price from savings on closing day, and borrows the rest with a mortgage. What is that 10 percent payment called?",
    {t:"The down payment", fb:"Yes: the part of the price paid from the buyer's own money at purchase is the down payment."},
    [{t:"The property tax", fb:"Property tax is a yearly charge from the municipality, not part of the price paid to the seller."},
     {t:"The closing cost", fb:"Closing costs are fees such as legal and inspection fees, separate from the share of the price itself."},
     {t:"The insurance premium", fb:"A premium pays for insurance cover over a period of time, not for a share of the house price."}],
    "The share of the purchase price paid from the buyer's own savings is the <b>down payment</b>.", {}); },
  function(){ return mcq("Which cost is a cost of maintaining a home after the purchase is complete?",
    {t:"Replacing worn roof shingles", fb:"Yes: repairs such as a new roof keep the home in good condition after purchase."},
    [{t:"The down payment", fb:"The down payment is paid once, at the time of purchase."},
     {t:"Legal fees for the purchase", fb:"Legal fees for the purchase are closing costs, paid once when the home is bought."},
     {t:"A home inspection before buying", fb:"An inspection before buying is a purchase cost, paid before or at closing."}],
    "Repairs after moving in, such as replacing shingles, are maintenance costs. The answer is <b>replacing worn roof shingles</b>.", {}); },
  function(){ return mcq("A town charges a homeowner a yearly amount based on the value of the house and land. Which home cost is this?",
    {t:"Property tax", fb:"Yes: municipalities charge property tax each year based on the value of the property."},
    [{t:"The down payment", fb:"The down payment is paid once to buy the home, not yearly to the town."},
     {t:"Closing costs", fb:"Closing costs are one-time fees at purchase, not a yearly charge based on value."},
     {t:"The mortgage payment", fb:"A mortgage payment repays the loan; it goes to the lender, not to the town as a tax."}],
    "A yearly charge from the town based on the value of the house and land is <b>property tax</b>.", {}); },
  function(){ return mcq("Which list contains only costs a homeowner should budget for after the purchase is complete?",
    {t:"Property tax, home insurance, heating and repairs", fb:"Yes: all four return year after year once the home is owned."},
    [{t:"Down payment, legal fees, property tax and heating", fb:"The down payment and legal fees are paid once at purchase, so this list mixes the two groups."},
     {t:"Home inspection, closing costs, insurance and repairs", fb:"The inspection and closing costs belong to the purchase, not to the years after it."},
     {t:"Down payment, home inspection, legal fees and closing costs", fb:"Every item in this list is a one-time purchase cost."}],
    "After purchase, the recurring costs include property tax, insurance, heating and repairs. The answer is <b>the list of yearly costs</b>.", {}); },
  function(){ return mcq("Before a sale closes, a buyer pays a professional to check the furnace, roof and structure of the house. Which purchase cost is this?",
    {t:"A home inspection fee", fb:"Yes: an inspection checks the condition of the home before the buyer commits."},
    [{t:"A maintenance cost", fb:"Maintenance is upkeep of the home after purchase; this check happens before the sale closes."},
     {t:"Property tax", fb:"Property tax is a yearly municipal charge, not a one-time check of condition."},
     {t:"An insurance premium", fb:"A premium buys insurance cover; it does not pay for an inspection of the house."}],
    "Paying to have the condition of the home checked before closing is a <b>home inspection fee</b>, a cost of purchasing.", {}); }
]), ["Sort each cost by when it is paid: once at purchase, or again and again afterwards.", "Start by asking whether the cost happens on closing day or in the years that follow."]);

E("u5-operating-cost-types", 5, ["1.4"], 1, "var", varset([
  function(){ return mcq("For a car owner, which cost is a fixed cost of operating a vehicle?",
    {t:"Yearly insurance premium", fb:"Yes: the premium is set for the year and does not change with how far the car is driven."},
    [{t:"Fuel", fb:"Fuel cost grows with distance driven, so it is an ongoing, distance-based cost."},
     {t:"Oil changes", fb:"Oil changes come due with use and distance, so they are an ongoing cost."},
     {t:"Brake repairs", fb:"Repairs depend on wear and use, so they are ongoing costs, not fixed ones."}],
    "Fixed costs stay the same regardless of distance driven. The yearly insurance premium is a <b>fixed cost</b>.", {}); },
  function(){ return mcq("For a car owner, which cost is an ongoing cost of operating a vehicle?",
    {t:"Fuel used on each trip", fb:"Yes: fuel is bought again and again, and the amount depends on how much the car is driven."},
    [{t:"Yearly vehicle registration", fb:"Registration is a set yearly fee, so it is a fixed cost."},
     {t:"Insurance premium", fb:"The premium is set for the policy period, so it is a fixed cost."},
     {t:"Extended warranty payment", fb:"An extended warranty is a set amount agreed in advance, so it is a fixed cost."}],
    "Ongoing costs rise and fall with use. Fuel is an <b>ongoing cost</b>.", {}); },
  function(){ return mcq("A driver buys an extended warranty that covers major repairs for a set yearly amount agreed when the car was purchased. How should this cost be classed?",
    {t:"A fixed cost, because the amount is set in advance", fb:"Yes: the warranty amount is agreed ahead of time and does not depend on distance driven."},
    [{t:"An ongoing cost, because repairs happen over time", fb:"The warranty price itself is fixed in advance, even though it covers repairs that may happen later."},
     {t:"A purchase cost, because it was arranged at purchase time", fb:"The warranty covers operating the car during ownership, and its set amount makes it a fixed operating cost."},
     {t:"A fuel cost, because it keeps the car running", fb:"Fuel is bought per trip; the warranty is a set amount, unrelated to fuel."}],
    "An amount set in advance, the same no matter the distance driven, is a fixed cost. The answer is <b>a fixed cost</b>.", {}); },
  function(){ return mcq("Which statement about vehicle operating costs is correct?",
    {t:"Licensing is a fixed cost, while tires and maintenance are ongoing costs.", fb:"Yes: licensing is a set fee, and tires and maintenance depend on use and wear."},
    [{t:"Licensing and fuel are both fixed costs.", fb:"Fuel depends on distance driven, so fuel is an ongoing cost."},
     {t:"Insurance is an ongoing cost because it is paid every year.", fb:"A cost can repeat yearly and still be fixed: the insurance amount is set for the year, not driven by distance."},
     {t:"Maintenance is a fixed cost because every car needs it.", fb:"Needing maintenance does not make its cost fixed: the amount depends on use and wear."}],
    "Fixed costs are set amounts, such as licensing. Ongoing costs, such as tires and maintenance, depend on use. The answer is <b>the licensing statement</b>.", {}); },
  function(){ return mcq("A delivery driver tracks costs for a van. Which item belongs with the ongoing costs?",
    {t:"Windshield washer fluid and wiper blades", fb:"Yes: these are bought as they are used up or wear out, so they are ongoing costs."},
    [{t:"The yearly licence fee", fb:"The licence fee is a set amount each year, a fixed cost."},
     {t:"The insurance premium", fb:"The premium is set for the policy term, a fixed cost."},
     {t:"The extended warranty", fb:"The warranty amount is agreed in advance, a fixed cost."}],
    "Items bought as they are used up are ongoing costs. The answer is <b>washer fluid and wiper blades</b>.", {}); }
]), ["Fixed costs are set amounts. Ongoing costs change with use and distance.", "Start by asking whether the cost would change if the vehicle were driven twice as far."]);

E("u5-justify-vehicle-choice", 5, ["1.2"], 2, "var", varset([
  function(){ return mcq("Karen drives about 45,000 km a year for work. Most leases charge extra for kilometres over a yearly limit near 24,000 km. Which choice and justification fit her best?",
    {t:"Buy the vehicle, because high yearly kilometres would make lease overage charges very expensive.", fb:"Yes: her distance is far above a typical lease limit, so overage charges would pile up."},
    [{t:"Lease the vehicle, because lease payments are usually lower each month than loan payments.", fb:"Lower monthly payments ignore the overage charges her 45,000 km would trigger."},
     {t:"Lease the vehicle, because she would get a new vehicle every few years, which she would enjoy having.", fb:"A new vehicle does not solve the kilometre problem, which is the deciding factor for her use."},
     {t:"Buy the vehicle, because buying always costs less than leasing in every situation.", fb:"Buying is right here, but not because it always costs less; her high kilometres are the reason."}],
    "Karen's yearly distance is far above a typical lease kilometre limit, so lease overage charges would be large. Buying fits her use. The answer is <b>buy, because of the high kilometres</b>.", {}); },
  function(){ return mcq("Tom drives about 10,000 km a year, likes driving a vehicle that is under warranty, and enjoys changing to a newer model every three years. Which choice and justification fit him best?",
    {t:"Lease, because his low kilometres stay under the limit and the vehicle stays under warranty during the term.", fb:"Yes: low use, warranty cover, and wanting a newer model every few years all point to leasing."},
    [{t:"Buy, because he would own the vehicle at the end of five years and could keep driving it for years after that.", fb:"Owning at the end matters less to Tom; he wants to change vehicles every three years."},
     {t:"Buy outright, because paying cash avoids all interest, and interest is the main cost to avoid.", fb:"Avoiding interest is a real saving, but it ignores his wish for a newer warranted vehicle every three years."},
     {t:"Lease to buy, because he wants to keep the same vehicle for a long time, well past the term.", fb:"Tom wants to change vehicles often, not keep one for a long time."}],
    "Low yearly kilometres, warranty cover during the term, and changing vehicles every three years all suit leasing. The answer is <b>lease, because the factors line up</b>.", {}); },
  function(){ return mcq("Aisha wants to own her car at the end of her agreement, but her budget cannot handle regular loan payments right now. A lease-to-buy agreement offers lower payments first, with ownership at the end. Which judgement fits?",
    {t:"Leasing to buy fits, because the lower early payments suit her budget and she still ends up owning the car.", fb:"Yes: it answers both of her conditions, the payment size now and ownership at the end."},
    [{t:"A plain lease fits, because its payments are the lowest, and low payments are all that matters to her in the end.", fb:"A plain lease ends with returning the car, and Aisha wants to own it."},
     {t:"Buying outright fits, because she would own the car right away, with no monthly payments at all to make.", fb:"Buying outright needs the full price at once, which her budget cannot handle."},
     {t:"A five-year loan fits, because the car is hers from the first day, which settles the matter.", fb:"The loan payments are the very thing her budget cannot handle right now."}],
    "Aisha needs lower payments now and ownership at the end. Leasing to buy gives both. The answer is <b>leasing to buy fits her situation</b>.", {}); },
  function(){ return mcq("George keeps his vehicles for ten years or more and drives each one long after any loan would be paid off. Which choice and justification fit him best?",
    {t:"Buy, because years of driving with no vehicle payment after the loan ends lower his long-term cost.", fb:"Yes: keeping a vehicle well past the payoff date is where buying pays off."},
    [{t:"Lease, because the vehicle would always be new, and a new vehicle is what matters most for the work.", fb:"George keeps vehicles for a decade; starting a new lease every few years would mean payments forever."},
     {t:"Lease, because maintenance is covered by warranty for the whole term of the lease and beyond.", fb:"Warranty cover during a short term does not match a ten-year ownership pattern."},
     {t:"Buy, because leased vehicles cannot be driven in winter, and the bakery delivers all winter.", fb:"Leased vehicles can be driven year round; the season is not a factor in this decision."}],
    "Keeping a vehicle for ten years means many years with no payment once a loan is done. Buying fits. The answer is <b>buy, for the long term with no payments</b>.", {}); },
  function(){ return mcq("A small bakery needs a delivery van. The owner wants predictable costs, warranty cover for repairs, and does not want to deal with selling an old van later. Which choice and justification fit best?",
    {t:"Lease, because payments and warranty cover are predictable and the van is returned at the end.", fb:"Yes: each of the stated needs of the owner matches a feature of leasing."},
    [{t:"Buy outright, because the bakery would own the van forever, which is the main goal.", fb:"Owning forever brings back the selling problem the owner wants to avoid."},
     {t:"Buy with a loan, because the interest can be large, and large interest is worth paying for ownership.", fb:"Large interest is a drawback, not a justification, and it ignores warranty and return needs."},
     {t:"Lease to buy, because the bakery wants to sell the van later, once it is paid for.", fb:"The owner does not want to sell a van later; returning it is the point."}],
    "Predictable payments, warranty cover, and returning the vehicle are all lease features the owner asked for. The answer is <b>lease, for predictability and the return</b>.", {}); },
  function(){ return mcq("Nadia has saved enough to pay cash for a car and plans to drive it for eight years. Which justification for buying outright is strongest?",
    {t:"She pays no interest and has no monthly payment, and she keeps the car long enough for that to pay off.", fb:"Yes: no interest, no payments, and long ownership make paying cash a strong fit."},
    [{t:"Paying cash means she will never pay for repairs or insurance. Those costs vanish when a car is bought outright.", fb:"Owners still pay for repairs and insurance; paying cash removes interest and payments only."},
     {t:"Paying cash raises the resale value of the car, since a cash-bought car is worth more at resale.", fb:"How the car was paid for does not change what a buyer will pay for it later."},
     {t:"Paying cash is best because leasing is not allowed in this province, so it is not a real choice.", fb:"Leasing is allowed; the decision rests on cost and use, not on a ban."}],
    "Paying cash removes interest and monthly payments, and eight years of use spreads the price well. The answer is <b>no interest and long ownership</b>.", {}); }
]), ["Weigh the finances, use, kilometres, and how long the person keeps a vehicle.", "Start by finding the factor in the scenario that rules one option out or makes it costly."]);

E("u5-option-match", 5, ["1.1"], 2, "gen", function(){
  var names=["Liam","Emma","Noah","Ava","Lucas","Mia","Ethan","Ruby","Owen","Chloe","Adam","Grace"];
  var vehs=["compact car","pickup truck","small SUV","minivan","sedan","work van"];
  var modes=[
    {key:"Buying outright", txt:function(n,v,p,t){ return n+" pays "+u5M(p)+" in full for a "+v+" and owns it that same day."; },
     fb:"One full payment and ownership on the same day is buying outright."},
    {key:"Leasing", txt:function(n,v,p,t){ return n+" pays "+u5M(p)+" a month for "+t+" months on a "+v+", then returns it at the end of the term."; },
     fb:"Monthly payments for a term, ending with returning the vehicle, is leasing."},
    {key:"Leasing to buy", txt:function(n,v,p,t){ return n+" pays "+u5M(p)+" a month for "+t+" months on a "+v+", and the payments count toward owning it at the end."; },
     fb:"Payments that count toward ownership at the end is leasing to buy."},
    {key:"Buying with a loan", txt:function(n,v,p,t){ return n+" borrows the price of a "+v+", owns it from the first day, and repays "+u5M(p)+" a month for "+t+" months, plus interest."; },
     fb:"Owning from the first day while repaying borrowed money is buying with a loan."}];
  var m=pick(modes), n=pick(names), v=pick(vehs);
  var p=(m.key==="Buying outright")? ri(90,420)*100 : ri(24,72)*10;
  var t=pick([24,36,36,48,48,60]);
  var opts=modes.filter(function(x){return x.key!==m.key;}).map(function(x){ return {t:x.key, fb:"That option works differently from the one described: check its payment pattern and its end result."}; });
  return mcq(m.txt(n,v,p,t)+" Which vehicle option is described?",
    {t:m.key, fb:"Yes: "+m.fb}, opts,
    "Look at how the payments work and who owns the vehicle at the end. "+m.fb+" The answer is <b>"+m.key+"</b>.",
    {mode:m.key});
}, ["Ask two questions: how is it paid for, and who owns the vehicle at the end?", "Start by checking whether the vehicle is returned, kept, or owned from day one."]);

E("u5-lease-total-cr", 5, ["1.3"], 2, "gen", function(){
  var veh=pick(["compact SUV","sedan","pickup truck","hatchback"]);
  var monthly=ri(56,118)*5, months=pick([24,36,48]), upfront=ri(8,30)*100, buyout=ri(60,160)*100;
  var total=monthly*months+upfront+buyout;
  return numq("A driver leases a "+veh+" for "+months+" months at "+u5M(monthly)+" per month. At the start, the driver pays "+u5M(upfront)+" in fees and a down payment. At the end of the lease, the driver pays a buyout of "+u5M(buyout)+" to keep the vehicle. What is the total cost, in dollars, of leasing and then buying out this vehicle? Give the number only.",
    total, 0.5,
    "Add the monthly payments, the upfront costs, and the buyout. \\[ \\begin{aligned} \\text{monthly payments} &= "+months+" \\times "+fmt(monthly)+" = "+fmt(monthly*months)+" \\\\ \\text{total} &= "+fmt(monthly*months)+" + "+fmt(upfront)+" + "+fmt(buyout)+" = "+fmt(total)+" \\end{aligned} \\] The total cost is <b>"+u5M(total)+"</b>.",
    {monthly:monthly,months:months,upfront:upfront,buyout:buyout});
}, ["A lease total has three parts: the monthly payments, the upfront costs, and the buyout.", "Start by multiplying the monthly payment by the number of months."]);

E("u5-operating-cost-cr", 5, ["1.4"], 2, "gen", function(){
  var veh=pick(["family car","work truck","delivery van","compact car"]);
  var ins=ri(110,220)*10, lic=pick([90,105,120,150,175]), dist=ri(12,30)*1000;
  var cons=pick([7,8,8.5,9,10,11,12]), price=pick([1.58,1.62,1.65,1.71,1.74,1.79]);
  var maint=ri(60,150)*10;
  var fuel=Math.round(dist/100*cons*price*100)/100;
  var total=Math.round((ins+lic+fuel+maint)*100)/100;
  return numq("The yearly costs of operating a "+veh+" are: insurance "+u5M(ins)+", licensing "+u5M(lic)+", and maintenance "+u5M(maint)+". The vehicle is driven "+fmt(dist)+" km in the year, uses "+fmt(cons)+" L of fuel per 100 km, and fuel costs "+u5M(price)+" per litre. What is the total cost, in dollars, of operating the vehicle for the year? Give the number only. Round money to the cent.",
    total, 0.05,
    "Work out the fuel cost first, then add the fixed and maintenance costs. \\[ \\begin{aligned} \\text{fuel used} &= "+fmt(dist)+" \\div 100 \\times "+fmt(cons)+" = "+fmt(dist/100*cons)+"\\ \\text{L} \\\\ \\text{fuel cost} &= "+fmt(dist/100*cons)+" \\times "+fmt(price)+" = "+fmt(fuel)+" \\\\ \\text{total} &= "+fmt(ins)+" + "+fmt(lic)+" + "+fmt(fuel)+" + "+fmt(maint)+" = "+fmt(total)+" \\end{aligned} \\] The total operating cost is <b>"+u5M(total)+"</b>.",
    {ins:ins,lic:lic,dist:dist,cons:cons,price:price,maint:maint});
}, ["Split the cost into fuel, found from distance and consumption, plus the set yearly amounts.", "Start by finding how many litres the vehicle uses over the year."]);

E("u5-rental-monthly", 5, ["1.10"], 2, "gen", function(){
  var towns=["St. John's","Corner Brook","Mount Pearl","Paradise","Gander","Grand Falls-Windsor","Conception Bay South","Labrador City"];
  var town=pick(towns), rent=ri(85,165)*10, util=pick([0,80,100,120,140,160]), park=pick([0,40,50,60,75]), tins=pick([20,25,30,35]);
  var total=rent+util+park+tins;
  var depositErr=total+Math.round(rent/12);
  while(depositErr===total+120 || depositErr===total+50) depositErr+=13;
  var opts=[
    {t:u5M(rent+park+tins), fb:"That total leaves out the utilities of "+u5M(util)+" a month."},
    {t:u5M(rent+util+park), fb:"That total leaves out the tenant insurance of "+u5M(tins)+" a month."},
    {t:u5M(depositErr), fb:"That total spreads the one-time deposit over the year. A deposit is paid once, not monthly."}];
  if(util===0) opts[0]={t:u5M(total+120), fb:"That total adds utilities, but the stem says utilities are included in the rent."};
  if(park===0) opts[1]={t:u5M(total+50), fb:"That total adds parking, but the stem says parking is included at no extra charge."};
  var utilTxt=(util===0)?"utilities are included in the rent":"utilities cost "+u5M(util)+" a month";
  var parkTxt=(park===0)?"parking is included at no extra charge":"parking costs "+u5M(park)+" a month";
  var q=mcq("An apartment in "+town+" rents for "+u5M(rent)+" a month. In this unit, "+utilTxt+", "+parkTxt+", and tenant insurance costs "+u5M(tins)+" a month. A deposit of "+u5M(rent)+" is paid once at signing. What is the total monthly cost of this apartment?",
    {t:u5M(total), fb:"Yes: rent plus utilities plus parking plus insurance, with the one-time deposit left out."}, opts,
    "Monthly costs only: add the items that repeat every month, and leave out the one-time deposit. \\[ \\begin{aligned} \\text{monthly total} &= "+fmt(rent)+" + "+fmt(util)+" + "+fmt(park)+" + "+fmt(tins)+" \\\\ &= "+fmt(total)+" \\end{aligned} \\] The total monthly cost is <b>"+u5M(total)+"</b>.",
    {town:town,rent:rent,util:util,park:park,tins:tins});
  q.figure=u5Bar([{label:"Rent",v:rent},{label:"Utilities",v:util},{label:"Parking",v:park},{label:"Insurance",v:tins}]);
  return q;
}, ["Add only the costs that repeat every month.", "Start with the rent, then add each monthly extra one at a time."]);

E("u5-home-cash-cr", 5, ["1.11"], 2, "gen", function(){
  var price=ri(220,480)*1000, pct=pick([5,10,15,20]);
  var down=price*pct/100;
  var legal=ri(14,28)*100, insp=pick([400,450,500,550]), appr=pick([300,350,400]), other=ri(4,12)*100;
  var closing=legal+insp+appr+other;
  var total=down+closing;
  return numq("A family buys a home for "+u5M(price)+". They make a down payment of "+pct+" percent of the price. Their closing costs are: legal fees "+u5M(legal)+", a home inspection "+u5M(insp)+", an appraisal "+u5M(appr)+", and other fees "+u5M(other)+". How much cash, in dollars, do they need on closing day for the down payment and closing costs together? Give the number only.",
    total, 0.5,
    "Find the down payment first, then add all the closing costs. \\[ \\begin{aligned} \\text{down payment} &= "+fmt(pct/100)+" \\times "+fmt(price)+" = "+fmt(down)+" \\\\ \\text{closing costs} &= "+fmt(legal)+" + "+fmt(insp)+" + "+fmt(appr)+" + "+fmt(other)+" = "+fmt(closing)+" \\\\ \\text{cash needed} &= "+fmt(down)+" + "+fmt(closing)+" = "+fmt(total)+" \\end{aligned} \\] The cash needed on closing day is <b>"+u5M(total)+"</b>.",
    {price:price,pct:pct,down:down,closing:closing});
}, ["Cash on closing day is the down payment plus every closing cost.", "Start by changing the percent to a decimal and finding the down payment."]);

E("u5-vehicle-deal-compare", 5, ["1.3"], 2, "gen", function(){
  var guard=0, price, interest, pTotal, monthly, months, upfront, lTotal;
  do { price=ri(180,340)*100; interest=ri(14,42)*100; pTotal=Math.round(price*1.15)+interest;
    monthly=ri(30,56)*10; months=pick([36,48]); upfront=ri(10,30)*100; lTotal=monthly*months+upfront; guard++;
  } while((Math.abs(pTotal-lTotal)<400 || Math.abs(price+interest-lTotal)<200 || Math.abs(monthly*months-pTotal)<200 || Math.abs(price+interest-monthly*months)<200) && guard<60);
  if(Math.abs(pTotal-lTotal)<400 || Math.abs(price+interest-lTotal)<200 || Math.abs(monthly*months-pTotal)<200 || Math.abs(price+interest-monthly*months)<200){ price=25000; interest=2500; pTotal=Math.round(price*1.15)+interest; monthly=380; months=48; upfront=2000; lTotal=monthly*months+upfront; }
  var buyCheaper=pTotal<lTotal, cheap=Math.min(pTotal,lTotal);
  var noTax=price+interest, noUp=monthly*months;
  var opts=[
    {t:u5M(noTax), fb:"That is the purchase price plus interest with no tax. HST of 15 percent applies to the purchase price."},
    {t:u5M(noUp), fb:"That is the lease payments only. The lease also has upfront costs of "+u5M(upfront)+"."},
    {t:u5M(buyCheaper?lTotal:pTotal), fb:"That is the total for the other deal, which is the more expensive of the two."}];
  return mcq("Deal A: buy a vehicle priced at "+u5M(price)+". HST of 15 percent is added to the price, and the loan interest over the full term totals "+u5M(interest)+". Deal B: lease the same vehicle at "+u5M(monthly)+" a month for "+months+" months, with "+u5M(upfront)+" in upfront costs, and return it at the end. What is the total cost of the cheaper deal?",
    {t:u5M(cheap), fb:"Yes: the purchase totals "+u5M(pTotal)+" and the lease totals "+u5M(lTotal)+", so the lower figure is the answer."}, opts,
    "Total each deal on the same footing. \\[ \\begin{aligned} \\text{purchase} &= "+fmt(price)+" \\times 1.15 + "+fmt(interest)+" = "+fmt(pTotal)+" \\\\ \\text{lease} &= "+months+" \\times "+fmt(monthly)+" + "+fmt(upfront)+" = "+fmt(lTotal)+" \\end{aligned} \\] The cheaper total is <b>"+u5M(cheap)+"</b>.",
    {pTotal:pTotal,lTotal:lTotal});
}, ["Total each deal completely before comparing: tax and interest on one side, payments and upfront costs on the other.", "Start with Deal A: add 15 percent HST to the price, then add the interest."]);

E("u5-rent-vs-own", 5, ["1.12"], 2, "gen", function(){
  var years=pick([3,4,5]), rent=ri(95,145)*10, rUtil=pick([100,130,150,180]);
  var mort=ri(120,175)*10, tax=pick([2400,2800,3200,3600]), ins=pick([1000,1150,1300]), upkeep=pick([1200,1500,1800,2100]);
  var rTotal=rent*12*years + rUtil*12*years;
  var oTotal=mort*12*years + (tax+ins+upkeep)*years;
  var rentLower=rTotal<oTotal;
  var correctTxt=rentLower?("Renting is lower, at "+u5M(rTotal)+" versus "+u5M(oTotal)+" for owning"):("Owning is lower, at "+u5M(oTotal)+" versus "+u5M(rTotal)+" for renting");
  var swappedTxt=rentLower?("Owning is lower, at "+u5M(rTotal)+" versus "+u5M(oTotal)+" for renting"):("Renting is lower, at "+u5M(oTotal)+" versus "+u5M(rTotal)+" for owning");
  var opts=[
    {t:swappedTxt, fb:"The two totals are attached to the wrong options: check which total belongs to renting and which to owning."},
    {t:"Renting is lower, at "+u5M(rent*12*years)+" versus "+u5M(oTotal)+" for owning", fb:"The renting total there leaves out utilities of "+u5M(rUtil)+" a month."},
    {t:"Owning is lower, at "+u5M(mort*12*years)+" versus "+u5M(rTotal)+" for renting", fb:"The owning total there leaves out property tax, insurance and upkeep."}];
  if(!rentLower){ opts[1]={t:"Owning is lower, at "+u5M(mort*12*years)+" versus "+u5M(rTotal)+" for renting", fb:"The owning total there leaves out property tax, insurance and upkeep."};
    opts[2]={t:"Renting is lower, at "+u5M(rent*12*years)+" versus "+u5M(oTotal)+" for owning", fb:"The renting total there leaves out utilities of "+u5M(rUtil)+" a month."}; }
  return mcq("Over "+years+" years in Newfoundland and Labrador, compare two options. Renting: "+u5M(rent)+" a month plus utilities of "+u5M(rUtil)+" a month. Owning: mortgage payments of "+u5M(mort)+" a month, plus each year property tax of "+u5M(tax)+", home insurance of "+u5M(ins)+", and upkeep of "+u5M(upkeep)+". Which statement is correct?",
    {t:correctTxt, fb:"Yes: those are the full totals for the whole period, and the lower one is named correctly."}, opts,
    "Bring both options to the same "+years+" year period. \\[ \\begin{aligned} \\text{renting} &= ("+fmt(rent)+" + "+fmt(rUtil)+") \\times 12 \\times "+years+" = "+fmt(rTotal)+" \\\\ \\text{owning} &= "+fmt(mort)+" \\times 12 \\times "+years+" + ("+fmt(tax)+" + "+fmt(ins)+" + "+fmt(upkeep)+") \\times "+years+" = "+fmt(oTotal)+" \\end{aligned} \\] The answer is <b>"+correctTxt+"</b>.",
    {years:years,rTotal:rTotal,oTotal:oTotal});
}, ["Compare the two options over exactly the same time period, with every cost included.", "Start by turning each monthly amount into a total for the full period."]);

E("u5-rental-term-cr", 5, ["1.10"], 3, "gen", function(){
  var towns=["St. John's","Corner Brook","Mount Pearl","Gander","Happy Valley-Goose Bay"];
  var town=pick(towns), rent=ri(90,150)*10, util=pick([90,110,130,150]), park=pick([40,50,60,75]), deposit=rent;
  var total=rent*11 + (util+park)*12 + deposit;
  return numq("A tenant signs a 12 month lease on an apartment in "+town+". The rent is "+u5M(rent)+" a month, but the first month is free. Utilities cost "+u5M(util)+" a month and parking costs "+u5M(park)+" a month, and both are charged for all 12 months. A deposit of "+u5M(deposit)+" is paid once at signing. What is the total cost, in dollars, of the full 12 month term? Give the number only.",
    total, 0.5,
    "Rent is paid for 11 of the 12 months because the first month is free, while utilities and parking run for all 12. \\[ \\begin{aligned} \\text{rent} &= 11 \\times "+fmt(rent)+" = "+fmt(rent*11)+" \\\\ \\text{utilities and parking} &= ("+fmt(util)+" + "+fmt(park)+") \\times 12 = "+fmt((util+park)*12)+" \\\\ \\text{total} &= "+fmt(rent*11)+" + "+fmt((util+park)*12)+" + "+fmt(deposit)+" = "+fmt(total)+" \\end{aligned} \\] The total cost of the term is <b>"+u5M(total)+"</b>.",
    {town:town,rent:rent,util:util,park:park,deposit:deposit});
}, ["Track each part for the right number of months: rent for 11, the rest for 12, and the deposit once.", "Start with the rent: multiply by 11, not 12, because the first month is free."]);

E("u5-rent-own-province-cr", 5, ["1.12"], 3, "gen", function(){
  var years=4, mort=ri(135,175)*10, tax=pick([2400,2700,3000,3300,3600]), ins=pick([1000,1100,1200,1300]), upkeep=pick([1200,1400,1600,1800]);
  var rent=ri(105,130)*10, rUtil=pick([150,180,200,220,250]);
  var oTotal=mort*12*years+(tax+ins+upkeep)*years;
  var rTotal=(rent+rUtil)*12*years;
  var diff=oTotal-rTotal;
  return numq("A family compares two plans over 4 years. Plan A: own a home in St. John's, Newfoundland and Labrador, with mortgage payments of "+u5M(mort)+" a month, plus each year property tax of "+u5M(tax)+", home insurance of "+u5M(ins)+", and upkeep of "+u5M(upkeep)+". Plan B: rent in Halifax, Nova Scotia, at "+u5M(rent)+" a month plus utilities of "+u5M(rUtil)+" a month. How much more, in dollars, does owning cost than renting over the 4 years? Give the number only.",
    diff, 0.5,
    "Total each plan over the same 4 years, then subtract. \\[ \\begin{aligned} \\text{owning} &= "+fmt(mort)+" \\times 48 + ("+fmt(tax)+" + "+fmt(ins)+" + "+fmt(upkeep)+") \\times 4 = "+fmt(oTotal)+" \\\\ \\text{renting} &= ("+fmt(rent)+" + "+fmt(rUtil)+") \\times 48 = "+fmt(rTotal)+" \\\\ \\text{difference} &= "+fmt(oTotal)+" - "+fmt(rTotal)+" = "+fmt(diff)+" \\end{aligned} \\] Owning costs <b>"+u5M(diff)+"</b> more over the 4 years.",
    {oTotal:oTotal,rTotal:rTotal,diff:diff});
}, ["Total both plans over the same 4 year period before subtracting anything.", "Start by turning the monthly mortgage payment into a 48 month total."]);

E("u5-mileage-decision", 5, ["1.2"], 3, "gen", function(){
  var names=["Sarah","Mark","Julie","Peter","Erin","Colin","Tara","Shane"];
  var n=pick(names), excess=pick([4000,5000,6000,8000,10000,12000]), allow=pick([20000,24000,25000]);
  var years=pick([2,3,3,4]), rate=pick([0.10,0.15,0.20,0.25]);
  var over=Math.round(excess*years*rate);
  var overNoYears=Math.round(excess*rate);
  var opts=[
    {t:"The mileage charges come to "+u5M(overNoYears)+", a small amount that should not affect the decision at all.", fb:"That figure covers only one year. The charge applies in every year of the term."},
    {t:"The mileage charges come to "+u5M(over*2)+", so leasing is the clear choice for this driver.", fb:"That doubles the true charge, and a large mileage charge argues against leasing, not for it."},
    {t:"There are no mileage charges at all, because lease payments already cover all driving.", fb:"Lease payments do not cover kilometres above the allowance; extra kilometres are charged at the stated rate."}];
  return mcq(n+" expects to drive "+fmt(allow+excess)+" km a year. A lease allows "+fmt(allow)+" km a year and charges "+u5M(rate)+" for each extra kilometre. The lease runs "+years+" years. Which statement gives the best justification for a decision?",
    {t:"Mileage charges would total "+u5M(over)+" over the term, a strong reason to buy instead of lease.", fb:"Yes: the extra kilometres, the rate, and the full term all count, and the total is a real cost of leasing for this driver."}, opts,
    "Cost the extra kilometres over the whole term. \\[ \\begin{aligned} \\text{extra km per year} &= "+fmt(allow+excess)+" - "+fmt(allow)+" = "+fmt(excess)+" \\\\ \\text{charge} &= "+fmt(excess)+" \\times "+fmt(rate)+" \\times "+years+" = "+fmt(over)+" \\end{aligned} \\] Charges of that size are a strong reason to buy. The answer is <b>the "+u5M(over)+" statement</b>.",
    {excess:excess,years:years,rate:rate,over:over});
}, ["Cost the extra kilometres across every year of the lease, not just one year.", "Start by subtracting the allowance from the expected yearly kilometres."]);

/* ===== Prior knowledge tranche (Nov 15, 2026): Clusters 5 and 6 (vehicles; housing). Borrowed verbatim from Mathematics 2202 (u5-budget-totals-mc, u5-percent-of-income-mc, u6-credit-interest-cost, u6-card-vs-loan-cost, u5-modify-for-goal-mc) and Mathematics 1202 (u1-percent-change); feeder helper copies ride in bank-helpers.js (the feeder money formatter u5M rides renamed as f22_u5M: the name is taken in this bank by a different body). Authored for this tranche: u5-pk-operating-cost (totalling fixed and ongoing costs over a period, vehicle dress) and u5-pk-rent-compare (comparing rentals by totalling each over the same period). ===== */
E("u5-pk-budget-totals", 5, ["1.3"], 2, "gen", function(){
  var name=pick(u5Names), b=u5Budget(), mode=ri(0,1), guard=0;
  while(mode===1 && b.bal===0 && guard<20){ b=u5Budget(); guard++; }
  var prompt=name+" has a monthly income of "+f22_u5M(b.inc)+". The monthly expenses are: "+u5ExpList(b.exps)+". ";
  var q;
  if(mode===0){
    var smallest=Math.min.apply(null,b.exps.map(function(e){return e.c;}));
    var opts=u5MoneyOpts(b.tot,[
      {v:b.tot-smallest, fb:"This leaves out one of the expense items. Add every expense listed."},
      {v:b.tot-b.exps[0].c, fb:"This leaves out the housing cost. Housing is part of the total."},
      {v:b.inc+b.tot, fb:"This adds the income to the expenses. The question asks for expenses only."}]);
    q=mcq(prompt+"What are the total monthly expenses?",
      {t:f22_u5M(b.tot), fb:"Yes. Adding all five expenses gives this total."}, opts,
      "Add every expense, in dollars. \\[ \\begin{aligned} \\text{Total expenses} &= "+b.exps.map(function(e){return fmtF(e.c/100,2);}).join(" + ")+" \\\\ &= "+fmtF(b.tot/100,2)+" \\end{aligned} \\] Rounded to the cent, the answer is <b>"+f22_u5M(b.tot)+"</b>.",
      {mode:"total", tot:b.tot});
  } else {
    var opts2=u5MoneyOpts(b.bal,[
      {v:b.tot-b.inc, fb:"This subtracts in the wrong order. The balance is income minus expenses."},
      {v:b.inc-b.exps[0].c, fb:"This subtracts only the housing cost. Subtract all of the expenses."},
      {v:b.inc+b.tot, fb:"This adds income and expenses. The balance is the difference between them."}]);
    q=mcq(prompt+"What is the monthly balance (income minus total expenses)?",
      {t:f22_u5M(b.bal), fb:"Yes. Income minus the total of all expenses gives this balance."}, opts2,
      "First total the expenses, then subtract from the income. \\[ \\begin{aligned} \\text{Total expenses} &= "+fmtF(b.tot/100,2)+" \\\\ \\text{Balance} &= "+fmtF(b.inc/100,2)+" - "+fmtF(b.tot/100,2)+" \\\\ &= "+fmtF(b.bal/100,2)+" \\end{aligned} \\] The answer is <b>"+f22_u5M(b.bal)+"</b>.",
      {mode:"balance", bal:b.bal});
  }
  q.figure=u5BarFig("Monthly expenses", b.exps.map(function(e){return e.label;}), b.exps.map(function(e){return e.c;}));
  return q;
}, ["The balance is income minus expenses, so the expense total is needed either way.", "Start by adding all of the expense amounts together."]);

E("u5-pk-percent-of-income", 5, ["1.4"], 2, "gen", function(){
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
      prompt=name+" has a monthly income of "+f22_u5M(inc)+". The amount spent on "+c1.label+" is "+f22_u5M(a1)+". What percent of the income is spent on "+c1.label+"?";
      errVals=[
        {p:(inc-a1)/inc*100, fb:"This is the percent of income left after "+c1.label+", not the percent spent on it."},
        {p:a1/(inc+a1)*100, fb:"This divides by the income plus the expense. Divide by the income alone."},
        {p:inc/a1*100, fb:"This divides the income by the expense, which reverses the ratio and gives a value over 100%."}];
    } else if(mode===1){
      part=a1+a2; partTxt=c1.label+" and "+c2.label;
      prompt=name+" has a monthly income of "+f22_u5M(inc)+". The amounts spent are "+f22_u5M(a1)+" on "+c1.label+" and "+f22_u5M(a2)+" on "+c2.label+". What percent of the income is spent on "+c1.label+" and "+c2.label+" combined?";
      errVals=[
        {p:a1/inc*100, fb:"This counts only the "+c1.label+" amount. Add both amounts first."},
        {p:a2/inc*100, fb:"This counts only the "+c2.label+" amount. Add both amounts first."},
        {p:(inc-part)/inc*100, fb:"This is the percent of income left after both costs, not the percent spent on them."}];
    } else {
      part=save; partTxt="savings";
      prompt=name+" has a monthly income of "+f22_u5M(inc)+" and puts "+f22_u5M(save)+" into savings each month. What percent of the income goes into savings?";
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

E("u5-pk-credit-interest", 5, ["1.3"], 2, "gen", function(){
  var who=u6names();
  if(ri(0,1)===0){
    var B=pick([500,750,1000,1250,1500,2000,2500]);
    var mr=pick([1,1.5,2]);
    var m=ri(3,12);
    var I=B*mr/100*m;
    return numq(who+" carries a credit card balance of "+u6d(B)+". The card charges "+fmt(mr)+"% interest per month, charged each month on the starting balance. No payments are made and no new purchases are added for "+m+" months. How much interest builds up, in dollars?",
      Math.round(I*100)/100, 0.05,
      "Multiply the balance by the monthly rate and the number of months. \\[ \\begin{aligned} I &= "+fmt(B)+" \\times "+fmt(mr/100,4)+" \\times "+m+" \\\\ &= "+fmtF(I,2)+" \\end{aligned} \\] The interest that builds up is <b>"+u6d(I)+"</b>.",
      {mode:"card", B:B, mr:mr, m:m});
  }
  var P=pick([800,1000,1500,2000,2500,3000,4000]);
  var r=pick([5,6,7,8,9,11]);
  var t=pick([1,2,3,4,5]);
  var I2=P*r/100*t, tot=P+I2;
  if(ri(0,1)===0){
    return numq(who+" takes a personal loan of "+u6d(P)+" at a simple interest rate of "+fmt(r)+"% per year for "+t+" years to pay for "+u6goal()+". How much interest is paid over the loan, in dollars?",
      Math.round(I2*100)/100, 0.05,
      "Use \\(I = Prt\\). \\[ \\begin{aligned} I &= "+fmt(P)+" \\times "+fmt(r/100,4)+" \\times "+t+" \\\\ &= "+fmtF(I2,2)+" \\end{aligned} \\] The interest paid is <b>"+u6d(I2)+"</b>.",
      {mode:"loanI", P:P, r:r, t:t});
  }
  return numq(who+" takes a personal loan of "+u6d(P)+" at a simple interest rate of "+fmt(r)+"% per year for "+t+" years to pay for "+u6goal()+". What is the total amount repaid, in dollars?",
    Math.round(tot*100)/100, 0.05,
    "Find the interest first, then add the principal. \\[ \\begin{aligned} I &= "+fmt(P)+" \\times "+fmt(r/100,4)+" \\times "+t+" = "+fmtF(I2,2)+" \\\\ \\text{Total repaid} &= "+fmt(P)+" + "+fmtF(I2,2)+" = "+fmtF(tot,2)+" \\end{aligned} \\] The total amount repaid is <b>"+u6d(tot)+"</b>.",
    {mode:"loanTot", P:P, r:r, t:t});
}, ["Pick the interest model the stem describes: a monthly rate on a card balance, or I = Prt on a loan.", "First identify the balance or principal, the rate and the time period."]);

E("u5-pk-card-vs-loan", 5, ["1.3"], 2, "gen", function(){
  var attempt=0, P=1200, rc=21, fc=0, rl=9, fl=75, cTot=0, lTot=0;
  while(attempt<80){
    attempt++;
    P=pick([800,1000,1200,1500,2000,2500,3000]);
    rc=pick([19,21,24]); fc=pick([0,39]);
    rl=pick([7,9,11]); fl=pick([50,75,100]);
    cTot=P+P*rc/100+fc; lTot=P+P*rl/100+fl;
    if(Math.abs(cTot-lTot)>=10) break;
  }
  var cheap=Math.min(cTot,lTot), other=Math.max(cTot,lTot);
  var cheapInt=(cTot<lTot)?P*rc/100:P*rl/100;
  var otherInt=(cTot<lTot)?P*rl/100:P*rc/100;
  var cheapFee=(cTot<lTot)?fc:fl;
  var item=u6goal();
  return mcq(u6names()+" needs "+u6d(P)+" for "+item+", repaid over one year. A credit card charges "+fmt(rc)+"% annual interest and a "+u6d(fc)+" annual fee. A personal loan charges "+fmt(rl)+"% simple interest for the year and a "+u6d(fl)+" setup fee. Interest is charged on the full amount for the year. What is the total cost of the cheaper option, including repaying the "+u6d(P)+"?",
    {t:u6d(cheap), fb:"Correct: principal plus interest plus fees gives the lower total of "+u6d(cheap)+"."},
    [{t:u6d(other), fb:"That is the total for the other option. Compare both totals and take the lower one."},
     {t:u6d(cheapInt), fb:"That is the interest only. The amount borrowed and the fee must be added."},
     {t:u6d(P+otherInt+cheapFee), fb:"That mixes the interest of one option with the fee of the other. Cost each option fully on its own."}],
    "Cost each option as principal plus interest plus fees. \\[ \\begin{aligned} \\text{Card} &= "+fmt(P)+" + "+fmt(P)+" \\times "+fmt(rc/100)+" + "+fmt(fc)+" = "+fmtF(cTot,2)+" \\\\ \\text{Loan} &= "+fmt(P)+" + "+fmt(P)+" \\times "+fmt(rl/100)+" + "+fmt(fl)+" = "+fmtF(lTot,2)+" \\end{aligned} \\] The cheaper option costs <b>"+u6d(cheap)+"</b> in total.",
    {P:P, rc:rc, fc:fc, rl:rl, fl:fl});
}, ["Total cost means the amount borrowed plus its interest plus its fees, worked out separately for each option.", "First compute one year of interest on the card option."]);

E("u5-pk-percent-change", 5, ["1.11"], 2, "gen", function(){
  var mode=ri(1,2);
  var ctxs=[
    {name:"The monthly rent on an apartment", fmtC:function(v){ return u1Dol(v); }},
    {name:"The price of a winter coat", fmtC:function(v){ return u1Dol(v); }},
    {name:"A ferry fare", fmtC:function(v){ return u1Dol(v); }},
    {name:"A monthly phone plan", fmtC:function(v){ return u1Dol(v); }},
    {name:"The price of a used bicycle", fmtC:function(v){ return u1Dol(v); }},
    {name:"A weekly grocery bill total", fmtC:function(v){ return u1Dol(v); }}
  ];
  var cx=pick(ctxs); var O=pick([40,50,60,75,80,100,120,125,150,160,200,240,250,300,400,500,600,800]);
  var p=pick([10,12.5,15,20,25,30,40,50,60,75]); var inc=Math.random()<0.5;
  var N=u1R2(inc?O*(1+p/100):O*(1-p/100)); var diff=u1R2(Math.abs(N-O));
  if(mode===1){
    var wrongBase=u1R2(diff/N*100);
    var ds=u1Pick3(p,[
      {v:wrongBase, fb:"That divides the change by the new price. Percent change always divides by the original price."},
      {v:p+10, fb:"That adds 10 to the percent. Divide the change by the original price instead."},
      {v:100-p, fb:"That subtracts the percent from 100, which gives a share remaining, not the percent change."},
      {v:p/2, fb:"That halves the percent. Divide the full change by the original price."}
    ],0.9);
    var opts=ds.map(function(d){ return {t:fmt(d.v)+"%", fb:d.fb}; });
    var _bo0=balOpts({t:fmt(p)+"%", fb:"Yes: the change of "+cx.fmtC(diff)+" divided by the original "+cx.fmtC(O)+" gives "+fmt(p)+"%."}, opts); return mcq(cx.name+" changed from "+cx.fmtC(O)+" to "+cx.fmtC(N)+". What is the percent "+(inc?"increase":"decrease")+"?", _bo0[0], _bo0[1],
      "\\[ \\begin{aligned} \\text{Change} &= |"+fmtF(N,2)+" - "+fmtF(O,2)+"| = "+fmtF(diff,2)+" \\\\ \\text{Percent change} &= \\frac{"+fmtF(diff,2)+"}{"+fmtF(O,2)+"} \\times 100 = "+fmt(p)+"\\% \\end{aligned} \\] The answer is <b>"+fmt(p)+"% "+(inc?"increase":"decrease")+"</b>.",
      {mode:1,O:O,N:N});
  }
  var ans=N;
  var ds2=u1Pick3(ans,[
    {v:O+diff*2, fb:"That doubles the change. Apply the percent change once."},
    {v:inc?O-diff:O+diff, fb:"That moves the price in the wrong direction for a percent "+(inc?"increase":"decrease")+"."},
    {v:O+p, fb:"That adds the percent as dollars. A percent must be applied to the original price first."},
    {v:inc?u1R2(O*(1+p/100)+O*0.05):u1R2(O*(1-p/100)-O*0.05), fb:"That applies a different percent than the one given."}
  ],1.37);
  var opts2=ds2.map(function(d){ return {t:u1Dol(d.v), fb:d.fb}; });
  var _bo1=balOpts({t:u1Dol(ans), fb:"Yes: "+fmt(p)+"% of "+cx.fmtC(O)+" is "+cx.fmtC(diff)+", and the new amount follows from it."}, opts2); return mcq(cx.name+" was "+cx.fmtC(O)+". It then had a percent "+(inc?"increase":"decrease")+" of "+fmt(p)+"%. What is the new amount?", _bo1[0], _bo1[1],
    "\\[ \\begin{aligned} \\text{Change} &= "+fmt(p)+"\\% \\text{ of } "+fmtF(O,2)+" = "+fmtF(diff,2)+" \\\\ \\text{New amount} &= "+fmtF(O,2)+" "+(inc?"+":"-")+" "+fmtF(diff,2)+" = "+fmtF(ans,2)+" \\end{aligned} \\] The answer is <b>"+u1Dol(ans)+"</b>.",
    {mode:2,O:O,p:p,inc:inc?1:0});
}, ["Percent change is always measured against the original amount.", "Start by finding the size of the change, then compare it with the original amount."]);

E("u5-pk-modify-for-goal", 5, ["1.10"], 3, "gen", function(){
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
    var prompt=name+" has a monthly income of "+f22_u5M(b.inc)+" and monthly expenses of: "+u5ExpList(b.exps)+". "+name+" wants to save "+f22_u5M(goal)+" each month. By how much must monthly spending be reduced to reach that saving goal?";
    out=mcq(prompt,
      {t:f22_u5M(need), fb:"Yes. The goal minus the current balance is the extra amount that must be freed."},
      [{t:f22_u5M(cand[0]), fb:"This is the full goal. It ignores the balance the budget already has, whether it is a surplus or a shortfall."},
       {t:f22_u5M(cand[1]), fb:"This counts the current balance twice. Use the goal minus the balance, once."},
       {t:f22_u5M(cand[2]), fb:"This is just the size of the current balance. The cut must close the gap between the balance and the goal."}],
      "Find the current balance, then the gap to the goal. \\[ \\begin{aligned} \\text{Balance} &= "+fmtF(b.inc/100,2)+" - "+fmtF(b.tot/100,2)+" = "+fmtF(b.bal/100,2)+" \\\\ \\text{Extra saving needed} &= "+fmtF(goal/100,2)+" - ("+fmtF(b.bal/100,2)+") \\\\ &= "+fmtF(need/100,2)+" \\end{aligned} \\] Spending must be reduced by <b>"+f22_u5M(need)+"</b> per month.",
      {need:need, goal:goal, bal:b.bal});
  }
  if(out) return out;
  return mcq("A monthly budget has an income of $2,600.00 and total expenses of $2,500.00. The goal is to save $300.00 each month. By how much must monthly spending be reduced?",
    {t:"$200.00", fb:"Yes. The current balance is $100.00, so another $200.00 must be freed."},
    [{t:"$300.00", fb:"This is the full goal and ignores the current balance."},{t:"$100.00", fb:"This is the current balance, not the extra cut needed."},{t:"$400.00", fb:"This counts the current balance the wrong way."}],
    "The balance is 2600 minus 2500, which is 100. The gap to the goal is 300 minus 100, which is 200. Spending must be reduced by <b>$200.00</b>.", {need:20000});
}, ["Work out the current balance first. The cut needed is the gap between that balance and the saving goal.", "Start with income minus total expenses to find what the budget already saves or overspends."]);

E("u5-pk-operating-cost", 5, ["1.4"], 2, "gen", function () {
  var Y = pick([2, 3, 4]);
  var ins = ri(21, 48) * 50;
  var lic = pick([120, 150, 180, 200, 240]);
  var fuel = ri(9, 26) * 10;
  var maint = ri(6, 18) * 50;
  var perYear = ins + lic + maint + 12 * fuel;
  var total = Y * perYear;
  var prompt = "Sam buys a car and keeps it for " + Y + " years. The yearly costs are insurance $" + ins + " and licensing $" + lic +
    ", maintenance averages $" + maint + " per year, and fuel costs $" + fuel + " per month. What is the total cost of owning the car over the " + Y + " years?";
  var sol = "First build one year: insurance $" + ins + " + licensing $" + lic + " + maintenance $" + maint + " + fuel 12 x $" + fuel + " = $" + (12 * fuel) +
    ", for a one-year total of $" + perYear + ". Over " + Y + " years: " + Y + " x $" + perYear + " = <b>$" + total + "</b>.";
  return numq(prompt, total, 1, sol, { mode: "operating-cost", years: Y, ins: ins, lic: lic, fuel: fuel, maint: maint, perYear: perYear, ans: total });
}, ["Work out one year first: add the yearly costs and twelve months of fuel.", "Multiply the one-year total by the number of years."]);

E("u5-pk-rent-compare", 5, ["1.12"], 2, "gen", function () {
  function mny(v) { return "$" + String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
  var ra, ua, da, rb, db, TA, TB, keyT, dWrongOpt, dDep, dHalf, tries = 0;
  do {
    ra = ri(34, 56) * 25; ua = ri(9, 22) * 10; da = ri(8, 18) * 50;
    rb = ra + ri(-6, 10) * 25; db = ri(8, 18) * 50;
    TA = 12 * (ra + ua) + da; TB = 12 * rb + db;
    var aCheaper = TA < TB, D = Math.abs(TA - TB);
    keyT = "Option " + (aCheaper ? "A" : "B") + " costs less, by " + mny(D);
    dWrongOpt = "Option " + (aCheaper ? "B" : "A") + " costs less, by " + mny(Math.abs(12 * ((ra + ua) - rb)));
    var depA = 12 * (ra + ua + da), depB = 12 * (rb + db);
    dDep = "Option " + (depA < depB ? "A" : "B") + " costs less, by " + mny(Math.abs(depA - depB));
    dHalf = "Option " + (aCheaper ? "A" : "B") + " costs less, by " + mny(Math.abs(6 * ((ra + ua) - rb) + (da - db)));
    tries++;
  } while ((TA === TB || D < 60 || new Set([keyT, dWrongOpt, dDep, dHalf]).size !== 4) && tries < 200);
  var aCh = TA < TB, DD = Math.abs(TA - TB);
  var dsOpts = [
    { t: dWrongOpt, fb: "That compares only the monthly costs. The one-time deposits differ too, and over the full first year they change which option costs less or by how much." },
    { t: dDep, fb: "That counts the deposit as if it were paid every month. A deposit is paid once, so it enters the year total only once." },
    { t: dHalf, fb: "That totals only six months of the monthly costs. The question asks about the full first year, so use twelve months." }
  ];
  var sol = "Total each option over the same twelve months, adding the one-time deposit once. Option A: 12 x (" + mny(ra) + " + " + mny(ua) + ") + " + mny(da) + " = " + mny(TA) +
    ". Option B: 12 x " + mny(rb) + " + " + mny(db) + " = " + mny(TB) + ". So <b>" + keyT.toLowerCase() + "</b>.";
  return mcq("Maya is comparing two rentals for the first year. Option A rents for " + mny(ra) + " per month plus utilities of " + mny(ua) + " per month, with a one-time deposit of " + mny(da) +
    ". Option B rents for " + mny(rb) + " per month with utilities included, with a one-time deposit of " + mny(db) + ". Which option costs less over the first year, and by how much?",
    { t: keyT, fb: "Correct: both options are totalled over the same twelve months, with each deposit counted once." },
    dsOpts, sol, { mode: "rent-compare", ra: ra, ua: ua, da: da, rb: rb, db: db, totalA: TA, totalB: TB, ans: aCh ? "A" : "B" });
}, ["Total each option over the same period: twelve months of monthly costs plus the one-time deposit.", "The deposit is paid once, not every month."]);

/* PK tranche metadata pass for Unit 5. pkFor is the unit's cluster
   indicator list from the prior knowledge map, as registered for this
   unit in courses.js. */
var PKT_U5_FOR=["1.1","1.2","1.3","1.4","1.10","1.11","1.12"];
var PKT_U5={
 "u5-pk-budget-totals":{src:"math-2202:1.3",group:"budgeting"},
 "u5-pk-percent-of-income":{src:"math-2202:1.3",group:"budgeting"},
 "u5-pk-credit-interest":{src:"math-2202:1.22",group:"credit-and-loans"},
 "u5-pk-card-vs-loan":{src:"math-2202:1.22",group:"credit-and-loans"},
 "u5-pk-percent-change":{src:"math-1202:1.4",group:"percent-of-amount"},
 "u5-pk-modify-for-goal":{src:"math-2202:1.5",group:"budget-goals"},
 "u5-pk-operating-cost":{src:"authored:total-cost-over-a-period",group:"cost-totals"},
 "u5-pk-rent-compare":{src:"authored:comparing-rental-costs",group:"cost-totals"}
};
BANK.forEach(function(e){var t=PKT_U5[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U5_FOR.slice();e.pkGroup=t.group;}});
