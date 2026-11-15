// Math 3202 Unit 6 Businesses and Taxes question bank
// CRMARKS: u6-profit-cr=3
// CRMARKS: u6-tax-return-cr=4
// CRMARKS: u6-breakeven-cr=5
// CRMARKS: u6-tax-return-exam-cr=4
// CRMARKS: u6-target-profit-cr=5
/* ===== Unit 6 ===== */
/* Math 3202 Unit 6: Businesses and Taxes (1.5-1.9, 1.13-1.15). Helpers prefixed u6. */
function u6M(n){ var neg=n<0; var s=Math.abs(Math.round(n*100)/100).toFixed(2); var p=s.split("."); p[0]=p[0].replace(/\B(?=(\d{3})+(?!\d))/g,","); return (neg?"-$":"$")+p[0]+"."+p[1]; }
function u6Bar(items){
  var W=320,H=190,base=158,ox=36,max=0,i;
  for(i=0;i<items.length;i++) if(items[i].v>max) max=items[i].v;
  var step=(W-ox-10)/items.length, bw=Math.min(52,step-16);
  var s='<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cost breakdown bar chart">';
  s+='<line x1="'+ox+'" y1="12" x2="'+ox+'" y2="'+base+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+='<line x1="'+ox+'" y1="'+base+'" x2="'+(W-6)+'" y2="'+base+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  for(i=0;i<items.length;i++){ var h=items[i].v/max*(base-30), x=ox+8+i*step, y=base-h;
    s+='<rect x="'+fmt(x,1)+'" y="'+fmt(y,1)+'" width="'+fmt(bw,1)+'" height="'+fmt(h,1)+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
    s+='<text x="'+fmt(x+bw/2,1)+'" y="'+fmt(y-6,1)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle">'+u6M(items[i].v)+'</text>';
    s+='<text x="'+fmt(x+bw/2,1)+'" y="'+(base+15)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="middle">'+items[i].label+'</text>'; }
  return s+'</svg>';
}

E("u6-business-expenses", 6, ["1.5"], 1, "var", varset([
  function(){ return mcq("A small cafe pays the same amount of rent every month, no matter how many customers it serves. How is rent classed as a business expense?",
    {t:"A fixed expense, because it stays the same month to month", fb:"Yes: fixed expenses do not change with the level of business."},
    [{t:"A variable expense, because it is paid every month", fb:"Paying monthly does not make an expense variable; the amount staying the same makes it fixed."},
     {t:"A variable expense, because rent is a large amount", fb:"Size does not decide the class; whether the amount changes with business activity does."},
     {t:"Revenue, because the cafe earns money in the space", fb:"Rent is money the business pays out, so it is an expense, not revenue."}],
    "Rent that stays the same regardless of sales is a <b>fixed expense</b>.", {}); },
  function(){ return mcq("A bakery buys flour, eggs and packaging. In a busy month it buys much more of them than in a quiet month. How are these ingredient and packaging costs classed?",
    {t:"Variable expenses, because they rise and fall with how much the bakery sells", fb:"Yes: costs that grow with production and sales are variable expenses."},
    [{t:"Fixed expenses, because the bakery always needs them, month after month, all year", fb:"Needing a cost does not make it fixed; its amount changes with sales, so it is variable."},
     {t:"Fixed expenses, because the prices never change at any time of year", fb:"Even at steady prices, buying more in busy months makes the total change, so the expense is variable."},
     {t:"Profit, because they are used to make goods that sell in the bakery", fb:"Ingredients are costs of making the goods, so they are expenses, not profit."}],
    "Costs that rise and fall with the amount produced and sold are <b>variable expenses</b>.", {}); },
  function(){ return mcq("Which list contains only expenses of operating a small business?",
    {t:"Rent, wages, insurance and supplies", fb:"Yes: all four are costs of running the business."},
    [{t:"Rent, wages, sales revenue and supplies", fb:"Sales revenue is money coming in, not an expense of operating."},
     {t:"Insurance, wages, profit and rent", fb:"Profit is what is left after expenses, not an expense itself."},
     {t:"Supplies, rent, customer payments and wages", fb:"Customer payments are revenue, money in, not an operating expense."}],
    "Operating expenses are the costs of running the business: rent, wages, insurance and supplies. The answer is <b>the list with no revenue or profit</b>.", {}); },
  function(){ return mcq("A lawn care business pays a set monthly insurance premium and buys fuel for its mowers based on how many lawns it cuts. Which statement is correct?",
    {t:"Insurance is a fixed expense and fuel is a variable expense.", fb:"Yes: the premium is set, while fuel use depends on the amount of work done."},
    [{t:"Insurance and fuel are both fixed expenses.", fb:"Fuel depends on how many lawns are cut, so fuel is variable."},
     {t:"Insurance is variable and fuel is fixed.", fb:"The two are reversed: the premium is set in advance and fuel changes with work."},
     {t:"Neither is an expense, because both keep the business running.", fb:"Both are costs the business pays, so both are expenses; they differ in type, not in being expenses."}],
    "A set premium is fixed; fuel that depends on the work done is variable. The answer is <b>insurance fixed, fuel variable</b>.", {}); },
  function(){ return mcq("Which expense would a small retail shop class as a fixed expense?",
    {t:"A yearly business licence fee", fb:"Yes: the licence fee is a set amount that does not depend on sales."},
    [{t:"Bags and wrapping for customer purchases", fb:"Bags and wrapping are used in proportion to sales, so they are variable."},
     {t:"Extra stock bought for a busy holiday season", fb:"Stock bought in amounts that follow sales is a variable expense."},
     {t:"Delivery fuel for customer orders", fb:"Delivery fuel grows with the number of orders, so it is variable."}],
    "A set yearly fee that does not follow sales is a fixed expense. The answer is <b>the business licence fee</b>.", {}); },
  function(){ return mcq("A food truck pays wages that grow in months when it hires extra staff for festivals. How are these wages best described in those months?",
    {t:"A variable expense, because the total changes with staffing and sales", fb:"Yes: when hours and staff change with business activity, the wage total is variable."},
    [{t:"A fixed expense, because wages are paid on a regular schedule all year", fb:"A regular pay schedule does not fix the total; extra staff and hours raise it."},
     {t:"Revenue, because staff help earn money for the business", fb:"Wages are paid out by the business, so they are an expense."},
     {t:"A one-time start-up cost paid when the business opens", fb:"Wages are an ongoing operating expense, not a start-up cost."}],
    "Wage totals that change with staffing and activity are a <b>variable expense</b>.", {}); }
]), ["Ask whether the amount stays the same or changes with the level of business.", "Start by checking one item: would its total grow in a busier month?"]);

E("u6-why-file", 6, ["1.13"], 1, "var", varset([
  function(){ return mcq("During the year, tax was taken off Ana's paycheques. Her final tax calculation shows she paid in more than she owes. Why does filing a return matter for her?",
    {t:"Filing is how she claims back the extra tax as a refund.", fb:"Yes: a refund is paid only after a return is filed and assessed."},
    [{t:"Filing raises the tax rate on her income for the year.", fb:"Filing does not change tax rates; it settles what she owes against what she already paid."},
     {t:"Filing lets her employer stop taking tax off her pay.", fb:"Employers keep deducting tax as required; filing settles the year afterwards."},
     {t:"Filing is only for people who owe more tax at year end.", fb:"People who are owed refunds file too; filing is how the refund is claimed."}],
    "Tax taken off pay during the year is compared with the final amount owed on the return. Filing claims the difference back as a refund. The answer is <b>to claim the refund</b>.", {}); },
  function(){ return mcq("A family receives the Canada child benefit and the GST/HST credit. Why are they expected to file a tax return every year, even in a year with little income?",
    {t:"Benefits and credits like these are worked out from the return, so filing keeps them going.", fb:"Yes: eligibility and amounts for these benefits are based on the filed return."},
    [{t:"Benefits are paid only to people with full-time jobs, never to anyone working part time at all.", fb:"These benefits are based on family income and information on the return, not on having a full-time job."},
     {t:"Filing guarantees their benefits will increase every year they file a return.", fb:"Filing keeps benefits flowing and correctly sized; it does not promise an increase."},
     {t:"The return replaces the benefit applications forever, so no other forms are ever needed.", fb:"Benefits are recalculated from each year's return, so yearly filing is still expected."}],
    "Benefit and credit amounts are calculated from the annual return. Filing each year keeps them going. The answer is <b>because benefits are based on the return</b>.", {}); },
  function(){ return mcq("Which statement best explains why most Canadians file an income tax return each year?",
    {t:"It is the yearly settlement: income and credits are reported, and any refund or balance owing is worked out.", fb:"Yes: the return reports the year's income, deductions and credits, and settles the final amount."},
    [{t:"It is a form that sets next year's pay rate, telling the employer what to pay in the year ahead, month by month.", fb:"The return does not set pay rates; employers set pay."},
     {t:"It is only needed in the year a person starts a job, and never has to be filed again after that.", fb:"Returns are filed every year, not only in the first year of work."},
     {t:"It is a way to apply for a driver's licence, since the tax office issues licences when returns come in each year.", fb:"Tax returns and licences are unrelated; the return deals with income tax."}],
    "The annual return reports income, deductions and credits, and settles whether the taxpayer gets a refund or owes a balance. The answer is <b>the yearly settlement statement</b>.", {}); },
  function(){ return mcq("A newcomer to Canada asks why she should file a return for a year when she worked only part of the year. Which reason is correct?",
    {t:"She may be owed a refund of tax taken off her pay, and filing starts her benefit eligibility.", fb:"Yes: part-year earnings often mean too much tax was withheld, and filing also supports benefit claims."},
    [{t:"She should not file, because only full-year workers file returns in Canada.", fb:"Part-year workers file too, and often have refunds waiting."},
     {t:"Filing will remove the tax her employer already sent in during the year from her pay, wiping it out.", fb:"Tax already sent in is credited to her on the return; it is not removed."},
     {t:"She files so her employer can set her hours for the coming year's work schedule.", fb:"Work hours are set by the employer and have nothing to do with filing a return."}],
    "Filing can recover tax withheld from part-year pay and establishes benefit eligibility. The answer is <b>the refund and benefits reason</b>.", {}); },
  function(){ return mcq("What can happen if a person who is owed a refund simply never files a return?",
    {t:"The refund is not paid, because refunds are issued only after a return is filed and assessed.", fb:"Yes: there is no automatic refund without a filed return."},
    [{t:"The refund is paid automatically with interest added, whether or not a return is filed.", fb:"Refunds are not automatic; a return must be filed to claim one."},
     {t:"The employer returns the tax in the next paycheque, handing it back directly to the worker herself.", fb:"Employers do not settle the year; the tax return does."},
     {t:"The amount is added to next year's wages, appearing in the first pay of the new year.", fb:"Unclaimed refunds do not become wages; filing is the claim route."}],
    "A refund exists only on paper until a return is filed and assessed. The answer is <b>the refund is not paid</b>.", {}); }
]), ["Think about what the return settles: tax already paid, benefits, and the final amount owed.", "Start by asking what the person gets, or keeps, only by filing."]);

E("u6-tax-forms-docs", 6, ["1.14","1.13"], 1, "var", varset([
  function(){ return mcq("An employer gives each worker a slip showing the year's pay and the tax, CPP and EI amounts taken off. What is this slip called?",
    {t:"A T4 slip", fb:"Yes: the T4 reports employment income and the amounts deducted from it."},
    [{t:"A T1 form", fb:"The T1 is the tax return form itself, not the slip an employer issues."},
     {t:"A notice of assessment", fb:"The notice of assessment comes from the tax agency after a return is filed, not from the employer."},
     {t:"A pay stub from December", fb:"A pay stub covers one pay period; the yearly summary slip is the T4."}],
    "The yearly slip from an employer showing income and deductions is the <b>T4 slip</b>.", {}); },
  function(){ return mcq("What is the T1 in Canadian income tax filing?",
    {t:"The main personal income tax return form that is completed and filed each year", fb:"Yes: the T1 is the general return where income, deductions, credits and the final amount are worked out."},
    [{t:"A slip from a bank showing interest earned", fb:"Bank interest is reported on other slips; the T1 is the return itself."},
     {t:"A receipt for charitable donations", fb:"Donation receipts support a credit claimed on the return; they are not the return form."},
     {t:"A form an employer uses to hire a worker", fb:"Hiring forms are separate; the T1 is the personal tax return."}],
    "The T1 is the main personal income tax and benefit return. The answer is <b>the main return form</b>.", {}); },
  function(){ return mcq("Which statement correctly separates tax deductions from tax credits?",
    {t:"A deduction lowers taxable income; a credit lowers the tax payable itself.", fb:"Yes: deductions act before tax is calculated, credits act on the tax after it is calculated."},
    [{t:"A deduction lowers tax payable; a credit lowers taxable income.", fb:"The two are reversed: deductions reduce income first, credits reduce the tax itself."},
     {t:"Both lower taxable income by the same amount.", fb:"Credits do not lower taxable income; they lower the tax payable."},
     {t:"Both are paid out as refunds before tax is calculated.", fb:"Neither works that way: deductions come off income and credits come off tax payable."}],
    "Deductions reduce taxable income. Credits reduce tax payable. The answer is <b>the deduction-first, credit-on-tax statement</b>.", {}); },
  function(){ return mcq("Jordan puts money into an RRSP, and the amount is subtracted from income before tax is worked out. What is this an example of?",
    {t:"A tax deduction", fb:"Yes: the RRSP amount is deducted from income, lowering taxable income."},
    [{t:"A tax credit", fb:"A credit would come off the tax payable after calculation; this amount comes off income first."},
     {t:"A T4 slip", fb:"A T4 is a document from an employer, not the name for subtracting an amount from income."},
     {t:"A refund", fb:"A refund may result at the end, but the RRSP amount itself is a deduction."}],
    "An amount subtracted from income before tax is calculated is a <b>tax deduction</b>.", {}); },
  function(){ return mcq("A student claims the tuition amount on a return. The value of the claim is taken off the tax payable at the end of the calculation. What is this an example of?",
    {t:"A non-refundable tax credit", fb:"Yes: the tuition amount supports a credit that reduces tax payable, and it cannot create a refund on its own."},
    [{t:"A tax deduction", fb:"A deduction would come off income before tax is calculated; this value comes off the tax itself."},
     {t:"A T4 slip", fb:"The T4 reports employment income; tuition amounts are reported on education receipts."},
     {t:"An instalment payment", fb:"Instalments are payments of tax during the year, not a claim that reduces tax payable."}],
    "A claim that reduces tax payable at the end of the calculation is a <b>non-refundable tax credit</b>.", {}); },
  function(){ return mcq("Which document would a filer use to report income from a part-time job at a grocery store?",
    {t:"The T4 slip issued by the store", fb:"Yes: employment income and source deductions are reported on the T4 from the employer."},
    [{t:"A property tax bill", fb:"A property tax bill is a municipal charge on a home, not a report of job income."},
     {t:"A charitable donation receipt", fb:"A donation receipt supports a credit claim; it does not report employment income."},
     {t:"A vehicle registration", fb:"Registration documents a vehicle; it has nothing to do with reporting job income."}],
    "Employment income is reported from the employer's <b>T4 slip</b>.", {}); }
]), ["Match each name to its job: a slip reports amounts, the T1 is the return, a deduction lowers income, a credit lowers tax.", "Start by sorting the choices into documents and calculation steps."]);

E("u6-feasible-business", 6, ["1.6"], 2, "var", varset([
  function(){ return mcq("A small fishing community fills with visitors each summer who rent cottages, but it has no place that rents bikes, kayaks or paddleboards. Which new business is the most feasible fit for this community?",
    {t:"An outdoor gear rental shop open through the tourist season", fb:"Yes: it serves the visitors who are already there, in the season when they come."},
    [{t:"A large snowmobile dealership with a full repair garage", fb:"The community's known demand is summer visitors; a large winter dealership is a poor match and a big risk."},
     {t:"A formal wear shop selling wedding dresses year round", fb:"A small community with seasonal visitors is unlikely to support a year-round formal wear shop."},
     {t:"A second fish plant competing with the existing one", fb:"Competing head-on with an established plant ignores the unmet need the scenario describes."}],
    "Feasibility means matching a real, unmet need in the community. Summer visitors with no gear rental nearby point to <b>the outdoor gear rental shop</b>.", {}); },
  function(){ return mcq("A growing suburb has many young families, long wait lists at the two existing childcare centres, and no licensed after-school program. Which business option is most feasible?",
    {t:"A licensed childcare and after-school centre", fb:"Yes: the wait lists show proven demand from the families already living there."},
    [{t:"A retirement home supply store", fb:"The described population is young families; the proven demand is childcare."},
     {t:"A hunting outfitter serving fly-in guests", fb:"Nothing in the description suggests hunting tourism; the demand shown is local and child-focused."},
     {t:"A nightclub open until 3 a.m.", fb:"A family suburb with childcare wait lists points to family services, not late-night entertainment."}],
    "Wait lists prove demand. A licensed childcare and after-school centre matches it. The answer is <b>the childcare centre</b>.", {}); },
  function(){ return mcq("A town's arena hosts hockey and skating all winter. Players travel 40 minutes to the next town to get skates sharpened and equipment repaired. Which add-on business is most feasible in the arena?",
    {t:"A skate sharpening and equipment repair kiosk", fb:"Yes: it serves a steady stream of users who already come to the building and currently travel for the service."},
    [{t:"A beachwear boutique", fb:"The arena's traffic is winter sport users; beachwear does not match them or the season."},
     {t:"A boat motor showroom", fb:"A showroom is a large, costly business with no link to the arena users described."},
     {t:"A formal photo studio", fb:"Studio demand is not shown in the scenario; the sharpening trips are shown directly."}],
    "The users are already in the building and already travel for this exact service. The answer is <b>the skate sharpening kiosk</b>.", {}); },
  function(){ return mcq("A rural community has long, snowy winters, many seniors, and driveways that must be cleared for medical and home care visits. Two large companies already sell groceries in the town. Which business is most feasible?",
    {t:"A snow clearing service with seasonal contracts for households", fb:"Yes: the climate, the population, and the access need all support steady seasonal demand."},
    [{t:"A third large grocery store", fb:"Two large grocery companies already serve the town; a third faces strong competition with no shown gap."},
     {t:"An outdoor swimming pool business", fb:"Long, snowy winters make a pool business a poor seasonal fit."},
     {t:"A surfboard rental shop", fb:"There is no sign of surfing demand in an inland, snowy community."}],
    "Climate and population create the demand here: reliable snow clearing for households that need access. The answer is <b>the snow clearing service</b>.", {}); },
  function(){ return mcq("A town sits beside a ski hill. Lodges are full all winter, and visitors often ask where they can get hot lunches quickly near the lifts. The town already has three sit-down restaurants with evening lineups. Which option is most feasible?",
    {t:"A lunch food truck near the lifts serving quick hot meals", fb:"Yes: it targets the exact gap named, quick hot lunches near the lifts at peak time."},
    [{t:"A fourth sit-down restaurant aimed at evening diners", fb:"Evenings are already served by three restaurants; the unmet need is quick lunch near the lifts."},
     {t:"A gardening supply store open in January", fb:"January skiers are not the market for gardening supplies; the season and the crowd point to food."},
     {t:"A beach umbrella rental stand", fb:"A winter ski town has no beach demand; the feasible gap is lunch for skiers."}],
    "Feasibility follows the named gap: quick hot lunches where the visitors already are. The answer is <b>the lunch food truck</b>.", {}); },
  function(){ return mcq("Which question is the most useful first test of whether a business idea is feasible in a community?",
    {t:"Is there a group of local customers with an unmet need this business would serve?", fb:"Yes: customers with an unmet need are the foundation of a feasible business."},
    [{t:"Can the owner pick a catchy name for the business?", fb:"A name matters later; without customers, no name can make the business work."},
     {t:"Does the owner personally enjoy the product?", fb:"Enjoyment helps motivation but does not prove that customers exist."},
     {t:"Is there a similar business in a much larger city?", fb:"Success in a big city does not show that this community has the customers for it."}],
    "A feasible business starts with local customers and an unmet need. The answer is <b>the unmet-need question</b>.", {}); }
]), ["Look for the unmet need and the customers who are already there.", "Start by naming the group in the scenario whose need is not being met."]);

E("u6-improve-profit", 6, ["1.7"], 2, "var", varset([
  function(){ return mcq("A cafe is busy at breakfast but nearly empty after 2 p.m. Its kitchen staff are already on shift until 4 p.m. Which option is most likely to improve profitability?",
    {t:"Add an afternoon take-out special using the staff and kitchen hours already paid for", fb:"Yes: it adds sales in dead hours without adding much cost, since staff are already there."},
    [{t:"Close at noon to save on electricity, giving up the afternoon trade entirely", fb:"Closing earlier cuts the busy lunch trade and saves very little; it gives up revenue."},
     {t:"Raise all prices by half, on every item the business sells, starting now", fb:"A very large price jump usually drives customers away and can lower total profit."},
     {t:"Hire two more servers for the afternoon, paying wages for hours that are not busy at all", fb:"Adding staff to an empty period adds cost without adding customers."}],
    "Using already-paid hours to add sales in a quiet period raises revenue with little extra cost. The answer is <b>the afternoon take-out special</b>.", {}); },
  function(){ return mcq("A bakery throws out many unsold loaves at closing each day. Which option is most likely to improve profitability?",
    {t:"Track daily sales and bake closer to the amount that usually sells, with a small end-of-day discount", fb:"Yes: less waste lowers cost, and a discount recovers some value from loaves that would be thrown out."},
    [{t:"Bake twice as many loaves so the shelves always look full, with plenty left over unsold at closing time", fb:"More baking means more waste, which is the very cost hurting profit."},
     {t:"Stop selling bread and sell only cakes, giving up the bakery's main product line entirely, for good", fb:"Giving up a main product line removes revenue instead of fixing the waste problem."},
     {t:"Give unsold loaves away free all day to anyone who walks into the bakery, every single day", fb:"Giving away sellable product all day removes revenue; a targeted closing discount is different."}],
    "Matching production to demand cuts waste, a direct cost. The answer is <b>bake to demand with a closing discount</b>.", {}); },
  function(){ return mcq("A craft shop sells well in its store but has no online presence. Many past customers live in other towns. Which option is most likely to improve profitability?",
    {t:"Sell the most popular items online to reach past customers in other towns", fb:"Yes: it opens a new group of buyers for products that already sell, using existing stock knowledge."},
    [{t:"Rent a second, larger store in the same town, across the street from the first", fb:"A bigger rent bill in the same market adds fixed cost without clear new customers."},
     {t:"Cut prices on every item by a third, on everything in the store", fb:"Cutting all prices shrinks the margin on items that already sell at full price."},
     {t:"Stop restocking the best-selling items, letting the shelves empty", fb:"Removing the products customers want most reduces revenue directly."}],
    "Reaching proven customers in other towns grows revenue from products that already sell. The answer is <b>sell popular items online</b>.", {}); },
  function(){ return mcq("A small gym has most members training between 5 p.m. and 8 p.m. Its mornings sit nearly empty, and local seniors have asked about daytime classes. Which option is most likely to improve profitability?",
    {t:"Run daytime classes for seniors in the empty morning hours", fb:"Yes: it fills unused capacity with a group that has already expressed interest."},
    [{t:"Close the gym in the mornings to save wages on morning staff", fb:"Closing removes the chance to use the space; the seniors' interest shows revenue is available there."},
     {t:"Double the evening drop-in price for every visitor", fb:"A steep price rise at peak time can push members to rival gyms and reduce profit."},
     {t:"Buy more evening equipment for the crowded hours", fb:"More equipment adds cost but does not add members if space and time slots are the limit."}],
    "Filling empty hours with an interested group adds revenue on the same fixed costs. The answer is <b>daytime seniors classes</b>.", {}); },
  function(){ return mcq("A landscaping business buys plants from a supplier whose prices have risen three times this year. A nearby grower offers the same quality at lower prices. Which option is most likely to improve profitability?",
    {t:"Compare total costs and switch supply to the lower-cost grower if quality holds", fb:"Yes: lowering a major variable cost raises the profit on every job, as long as quality is maintained."},
    [{t:"Raise prices sharply to cover any future increases in supply costs", fb:"Sharp increases can cost the business its customers; the direct fix is the supply cost itself."},
     {t:"Buy a full year of plants at the higher price now, before checking around for better prices", fb:"Locking in more stock at the higher price increases cost and storage risk."},
     {t:"Stop offering plants and only mow lawns for customers", fb:"Dropping a service line removes revenue instead of fixing the cost problem."}],
    "Profit improves when a major cost drops while quality and prices hold. The answer is <b>switch to the lower-cost grower</b>.", {}); },
  function(){ return mcq("Which change would improve profitability by raising revenue without raising costs very much?",
    {t:"A take-out window added to an existing restaurant kitchen", fb:"Yes: it sells more meals from the kitchen and staff the restaurant already has."},
    [{t:"A second location across town with its own rent and staff", fb:"A second location adds major fixed costs, so profit is not a sure result."},
     {t:"New uniforms for all staff in the restaurant", fb:"Uniforms add cost and do not by themselves bring in more sales."},
     {t:"A larger parking lot repaving job outside", fb:"Repaving is a cost; it does not directly add meals sold."}],
    "Profitability improves when revenue grows faster than costs. A take-out window does that for an existing kitchen. The answer is <b>the take-out window</b>.", {}); }
]), ["Look for the option that raises revenue or lowers cost without creating a bigger problem.", "Start by asking what each option does to the two sides of profit: revenue and expenses."]);

E("u6-profit-cr", 6, ["1.8"], 2, "gen", function(){
  var biz=pick(["candle shop","bike repair shop","jam and preserves stand","dog treat bakery","plant shop"]);
  var units=ri(300,900), price=pick([12,15,18,20,25]);
  var rent=ri(70,120)*10, wages=ri(90,160)*10, supplies=ri(30,70)*10;
  var revenue=units*price, expenses=rent+wages+supplies, profit=revenue-expenses;
  return numq("A "+biz+" sells "+units+" items in a month at "+u6M(price)+" each. Its expenses for the month are rent "+u6M(rent)+", wages "+u6M(wages)+", and supplies "+u6M(supplies)+". What is the profit, in dollars, for the month? Give the number only.",
    profit, 0.5,
    "Profit is revenue minus expenses. \\[ \\begin{aligned} \\text{revenue} &= "+units+" \\times "+fmt(price)+" = "+fmt(revenue)+" \\\\ \\text{expenses} &= "+fmt(rent)+" + "+fmt(wages)+" + "+fmt(supplies)+" = "+fmt(expenses)+" \\\\ \\text{profit} &= "+fmt(revenue)+" - "+fmt(expenses)+" = "+fmt(profit)+" \\end{aligned} \\] The profit is <b>"+u6M(profit)+"</b>.",
    {units:units,price:price,expenses:expenses});
}, ["Profit is what remains when total expenses are subtracted from total revenue.", "Start by multiplying the number of items by the price to get revenue."]);

E("u6-breakeven-cr", 6, ["1.8"], 2, "gen", function(){
  var biz=pick(["smoothie stand","candle maker","T-shirt printer","soap maker","coffee cart"]);
  var c=pick([4,5,6,8,10,12,15,20]), units=ri(120,600), fixed=c*units;
  var v=pick([6,9,11,14,18,23]), price=v+c;
  return numq("A "+biz+" has fixed costs of "+u6M(fixed)+" per month. Each item sells for "+u6M(price)+" and costs "+u6M(v)+" in materials and other variable costs. How many items must the business sell in a month to break even? Give the number only.",
    units, 0.5,
    "Break-even happens when the contribution from sales exactly covers the fixed costs. Each item contributes the price minus its variable cost. \\[ \\begin{aligned} \\text{contribution per item} &= "+fmt(price)+" - "+fmt(v)+" = "+fmt(c)+" \\\\ \\text{break-even units} &= "+fmt(fixed)+" \\div "+fmt(c)+" = "+fmt(units)+" \\end{aligned} \\] The business breaks even at <b>"+fmt(units)+" items</b>.",
    {fixed:fixed,price:price,v:v,c:c});
}, ["Each sale contributes the price minus its variable cost toward covering fixed costs.", "Start by subtracting the variable cost from the price to find the contribution per item."]);

E("u6-tax-return-cr", 6, ["1.15"], 2, "gen", function(){
  var name=pick(["Kelly","Robin","Jamie","Alex","Taylor","Casey"]);
  var income=ri(320,520)*100, rrsp=ri(10,40)*100, other=pick([300,500,800]);
  var taxable=income-rrsp-other;
  var tax=Math.round(taxable*0.15), credits=pick([1800,2000,2200,2400]);
  var net=tax-credits, refund=pick([200,400,600,900,1200,1500]), withheld=net+refund;
  return numq(name+" files a simple return. Total income is "+u6M(income)+". Deductions are "+u6M(rrsp)+" for RRSP contributions and "+u6M(other)+" in other deductions. For this simplified return, tax is 15 percent of taxable income. Non-refundable credits then reduce the tax by "+u6M(credits)+". During the year, "+u6M(withheld)+" in tax was withheld from pay. What is the refund, in dollars? Give the number only.",
    refund, 0.5,
    "Move through the return in order: income, deductions, taxable income, tax, credits, then compare with tax already withheld. \\[ \\begin{aligned} \\text{taxable income} &= "+fmt(income)+" - "+fmt(rrsp)+" - "+fmt(other)+" = "+fmt(taxable)+" \\\\ \\text{tax} &= 0.15 \\times "+fmt(taxable)+" = "+fmt(tax)+" \\\\ \\text{net tax} &= "+fmt(tax)+" - "+fmt(credits)+" = "+fmt(net)+" \\\\ \\text{refund} &= "+fmt(withheld)+" - "+fmt(net)+" = "+fmt(refund)+" \\end{aligned} \\] The refund is <b>"+u6M(refund)+"</b>.",
    {income:income,taxable:taxable,net:net,withheld:withheld});
}, ["Follow the return in order: deductions come off income, credits come off the tax, withheld tax is compared last.", "Start by subtracting the deductions from total income to get taxable income."]);

E("u6-expense-total", 6, ["1.5"], 2, "gen", function(){
  var biz=pick(["cafe","food truck","craft shop","lawn care business","bakery","bike shop"]);
  var rent=ri(80,200)*10, wages=ri(150,400)*10, util=ri(15,45)*10, ins=pick([90,120,150,180,210,240]), supplies=ri(30,90)*10;
  var total=rent+wages+util+ins+supplies;
  var opts=[
    {t:u6M(total-wages), fb:"That total leaves out wages of "+u6M(wages)+", the biggest expense on the list."},
    {t:u6M(total-supplies), fb:"That total leaves out supplies of "+u6M(supplies)+"."},
    {t:u6M(total+util), fb:"That total counts utilities of "+u6M(util)+" twice."}];
  var q=mcq("The monthly expenses of a "+biz+" are: rent "+u6M(rent)+", wages "+u6M(wages)+", utilities "+u6M(util)+", insurance "+u6M(ins)+", and supplies "+u6M(supplies)+". What are the total monthly expenses?",
    {t:u6M(total), fb:"Yes: all five expenses added once each give this total."}, opts,
    "Add every expense once. \\[ \\begin{aligned} \\text{total} &= "+fmt(rent)+" + "+fmt(wages)+" + "+fmt(util)+" + "+fmt(ins)+" + "+fmt(supplies)+" \\\\ &= "+fmt(total)+" \\end{aligned} \\] The total monthly expenses are <b>"+u6M(total)+"</b>.",
    {biz:biz,total:total});
  q.figure=u6Bar([{label:"Rent",v:rent},{label:"Wages",v:wages},{label:"Utilities",v:util},{label:"Insurance",v:ins},{label:"Supplies",v:supplies}]);
  return q;
}, ["The total is every listed expense added once, with nothing skipped or doubled.", "Start by adding the two largest expenses, then the rest."]);

E("u6-profit-factors", 6, ["1.9","1.7"], 2, "var", varset([
  function(){ return mcq("An ice cream stand at a beach makes most of its money in July and August and very little in January. Which factor affecting profitability is this?",
    {t:"Seasonal variation, because demand follows the time of year", fb:"Yes: sales rising and falling with the seasons is seasonal variation."},
    [{t:"Hours of operation, because the stand is open in summer", fb:"Being open in summer is part of the pattern, but the demand itself following the season is the factor named here."},
     {t:"Supplier pricing, because ingredients cost more in summer", fb:"Nothing in the scenario mentions ingredient prices changing."},
     {t:"Staff wages, because summer staff are students hired for the season", fb:"The scenario describes sales changing with the season, not a wage effect."}],
    "Demand that rises and falls with the time of year is seasonal variation. The answer is <b>seasonal variation</b>.", {}); },
  function(){ return mcq("A diner closes at 6 p.m., but the supper crowd in town eats between 6 p.m. and 8 p.m., and a nearby diner stays open and is full. Which factor is hurting this diner's profitability, and what is the direct response?",
    {t:"Hours of operation; staying open through the supper hours would capture sales it now misses.", fb:"Yes: the missed sales window is set by the closing time, and extending hours addresses it directly."},
    [{t:"Seasonal variation; the diner should close for the winter, since winter is its slow season each year.", fb:"The problem is a daily time window, not a season, and closing more would cut sales further."},
     {t:"Location; the diner should move to another town with more customers passing through each day.", fb:"The crowd is already in this town at supper time; the hours, not the location, miss them."},
     {t:"Pricing; the diner should double its supper prices to make up for the missed hours.", fb:"The diner closes before supper, so supper prices are not the issue; the missed hours are."}],
    "Closing before the busy supper window loses sales every day. The factor is hours of operation. The answer is <b>extend the hours</b>.", {}); },
  function(){ return mcq("A snow clearing business earns strong income from November to March and almost nothing in the summer. Which response best protects its yearly profitability?",
    {t:"Add a summer service, such as lawn care, that uses the same truck and workers in the off season", fb:"Yes: a counter-seasonal service fills the income gap with assets and staff the business already has."},
    [{t:"Raise winter prices to cover the whole year, whatever customers think of them", fb:"Very high winter prices can drive contract customers to competitors; filling the summer gap is steadier."},
     {t:"Close the business every summer and lay off all staff until the winter season returns", fb:"Closing saves some cost but gives up the chance to earn in summer and loses trained staff."},
     {t:"Buy a second plow truck for the winter rush, since one truck cannot cover every driveway in town", fb:"More winter equipment adds cost without addressing the summer income gap."}],
    "A business with a strong season and an empty season can add a service for the off season. The answer is <b>add a summer service</b>.", {}); },
  function(){ return mcq("A tour boat business finds that rainy weeks cut its ticket sales sharply, while sunny weeks sell out. Which statement about this factor is correct?",
    {t:"Weather is a factor outside the owner's control that makes weekly profit vary, so the business should plan savings in good weeks.", fb:"Yes: uncontrollable variation calls for planning around it, such as keeping a cushion from strong weeks."},
    [{t:"Weather proves the business is badly run. A well-run business would make the same profit in any weather at all, every week of the season.", fb:"Weather affects all tour operators in the area; it is an outside factor, not proof of poor management."},
     {t:"The owner should guarantee sunny weather in advertisements, promising visitors a perfect day on the hill every time.", fb:"Weather cannot be guaranteed, and advertising it would mislead customers."},
     {t:"Ticket prices should change every hour with the forecast, rising and falling as the weather shifts through the day.", fb:"Constant price changes are impractical; planning savings across good and bad weeks is the sound response."}],
    "Outside factors such as weather make profit vary from week to week. Planning a cushion from good weeks is the sound response. The answer is <b>plan savings in good weeks</b>.", {}); },
  function(){ return mcq("A bakery opens at 9 a.m., but commuters pass its door between 6:30 a.m. and 8 a.m. heading to a bus stop, and a rival bakery opens at 6:30 a.m. Which change targets the factor costing this bakery sales?",
    {t:"Open earlier on weekdays to serve the commuter traffic", fb:"Yes: the lost sales are tied to opening hours, and the customers are already passing by."},
    [{t:"Move the bakery to a quieter street across town", fb:"The current street has the customer traffic; moving away from it gives up the opportunity."},
     {t:"Stop selling coffee and sell only bread, cakes and pies", fb:"Commuters are a natural coffee market, so cutting coffee works against the opportunity."},
     {t:"Open only on weekends, closing on weekdays", fb:"The commuter traffic is on weekdays, so weekend-only hours miss it entirely."}],
    "The bakery's opening time misses a daily stream of customers. The answer is <b>open earlier on weekdays</b>.", {}); },
  function(){ return mcq("A ski rental shop earns most of its profit in four winter months. Which plan best fits this seasonal pattern?",
    {t:"Hire seasonal staff for the winter peak and keep year-round costs low for the quiet months", fb:"Yes: matching staffing to the season keeps peak service strong without carrying peak costs all year."},
    [{t:"Hire the full winter staff for the whole year, keeping everyone on through the quiet months", fb:"Carrying peak staffing through quiet months adds heavy cost with little revenue."},
     {t:"Keep the shop closed during the winter school break, the busiest part of the season", fb:"The school break is part of the peak season, so closing then gives up the best sales."},
     {t:"Set the same sales target for every month of the year, whether the month is busy or quiet", fb:"Seasonal businesses cannot expect equal months; planning should follow the season."}],
    "Seasonal staffing matches costs to the busy period. The answer is <b>seasonal staff and low off-season costs</b>.", {}); }
]), ["Name the factor first (season, hours, weather), then judge the response against it.", "Start by asking what pattern in the scenario makes profit rise or fall."]);

E("u6-credit-deduction", 6, ["1.14"], 2, "gen", function(){
  var names=["Sam","Ruth","Omar","Beth","Carl","Nina"];
  var n=pick(names), mode=ri(0,1);
  if(mode===0){
    var rate=pick([15,20,25]), D=ri(4,30)*100, save=D*rate/100;
    var opts=[
      {t:u6M(D), fb:"That is the full deduction amount. A deduction lowers taxable income, so the tax saving is the rate times the amount."},
      {t:u6M(D/2), fb:"That uses a 50 percent rate. The stated tax rate is "+rate+" percent."},
      {t:u6M(D*10/100), fb:"That uses a 10 percent rate. The stated tax rate is "+rate+" percent."}];
    return mcq(n+" claims a deduction of "+u6M(D)+". In this simplified problem, income tax is "+rate+" percent of taxable income. By how much does the deduction reduce the tax payable?",
      {t:u6M(save), fb:"Yes: the deduction removes "+u6M(D)+" from taxable income, and tax on that income would have been "+rate+" percent of it."}, opts,
      "A deduction lowers taxable income, so the saving is the tax that would have been charged on that slice of income. \\[ \\begin{aligned} \\text{tax saved} &= "+fmt(D)+" \\times 0."+rate+" = "+fmt(save)+" \\end{aligned} \\] The deduction reduces tax payable by <b>"+u6M(save)+"</b>.",
      {mode:"deduction",D:D,rate:rate});
  }
  var crate=pick([15,20]), B=ri(10,50)*100, cred=B*crate/100;
  var opts2=[
    {t:u6M(B), fb:"That is the full claim amount. The credit is worth "+crate+" percent of the amount, taken off tax payable."},
    {t:u6M(B*25/100), fb:"That uses a 25 percent rate. The stated credit rate is "+crate+" percent."},
    {t:u6M(cred/2), fb:"That is only half of the credit value. The credit rate applies to the full claim amount."}];
  if(crate===25) opts2[1]={t:u6M(B*10/100), fb:"That uses a 10 percent rate. The stated credit rate is "+crate+" percent."};
  return mcq(n+" claims a tuition amount of "+u6M(B)+". In this simplified problem, the non-refundable credit for tuition is "+crate+" percent of the amount claimed, taken off the tax payable. By how much does the credit reduce the tax payable?",
    {t:u6M(cred), fb:"Yes: a credit comes straight off tax payable, at "+crate+" percent of the amount claimed."}, opts2,
    "A credit reduces tax payable directly. Its value is the credit rate times the amount claimed. \\[ \\begin{aligned} \\text{credit value} &= "+fmt(B)+" \\times 0."+crate+" = "+fmt(cred)+" \\end{aligned} \\] The credit reduces tax payable by <b>"+u6M(cred)+"</b>.",
    {mode:"credit",B:B,rate:crate});
}, ["Keep the two mechanisms separate: a deduction lowers taxable income, a credit lowers tax payable.", "Start by deciding whether the amount is multiplied by a tax rate or a credit rate."]);

E("u6-tax-return-exam-cr", 6, ["1.15"], 3, "gen", function(){
  var name=pick(["Morgan","Devon","Priya","Logan","Farrah","Glen"]);
  var emp=ri(480,720)*100, other=pick([1200,2500,4000]), rrsp=ri(20,60)*100, union=pick([600,900]);
  var taxable=emp+other-rrsp-union;
  var tax=6000+Math.round((taxable-40000)*0.20);
  var amounts=15000+pick([2000,3500,5000])+pick([0,400,800]);
  var credits=Math.round(amounts*0.15);
  var net=tax-credits, owing=pick([150,300,450,600,900]), withheld=net-owing;
  return numq(name+" files a return. Employment income is "+u6M(emp)+" and other income is "+u6M(other)+". Deductions are RRSP contributions of "+u6M(rrsp)+" and union dues of "+u6M(union)+". For this simplified return, tax is 15 percent of the first $40,000 of taxable income and 20 percent of the part above $40,000. Non-refundable credits are 15 percent of total credit amounts of "+u6M(amounts)+". Tax withheld from pay during the year was "+u6M(withheld)+". What is the balance owing, in dollars? Give the number only.",
    owing, 0.5,
    "Work through the return in order. \\[ \\begin{aligned} \\text{taxable income} &= "+fmt(emp)+" + "+fmt(other)+" - "+fmt(rrsp)+" - "+fmt(union)+" = "+fmt(taxable)+" \\\\ \\text{tax} &= 0.15 \\times 40000 + 0.20 \\times "+fmt(taxable-40000)+" = "+fmt(tax)+" \\\\ \\text{credits} &= 0.15 \\times "+fmt(amounts)+" = "+fmt(credits)+" \\\\ \\text{net tax} &= "+fmt(tax)+" - "+fmt(credits)+" = "+fmt(net)+" \\\\ \\text{balance owing} &= "+fmt(net)+" - "+fmt(withheld)+" = "+fmt(owing)+" \\end{aligned} \\] The balance owing is <b>"+u6M(owing)+"</b>.",
    {taxable:taxable,tax:tax,credits:credits,net:net,withheld:withheld});
}, ["Follow the return in order and split taxable income at the $40,000 mark for the two rates.", "Start by adding the income sources and subtracting the deductions."]);

E("u6-target-profit-cr", 6, ["1.8"], 3, "gen", function(){
  var biz=pick(["honey producer","wooden toy maker","frozen meal business","candle studio","juice company"]);
  var c=pick([5,6,8,10,12,15,20]), beUnits=ri(150,500), fixed=c*beUnits;
  var extra=ri(40,240), target=c*extra, v=pick([7,10,13,16,21]), price=v+c;
  var units=beUnits+extra;
  return numq("A "+biz+" has fixed costs of "+u6M(fixed)+" per month. Each item sells for "+u6M(price)+" and has variable costs of "+u6M(v)+". How many items must the business sell in a month to make a profit of exactly "+u6M(target)+"? Give the number only.",
    units, 0.5,
    "The contribution from sales must cover the fixed costs and then the target profit on top. \\[ \\begin{aligned} \\text{contribution per item} &= "+fmt(price)+" - "+fmt(v)+" = "+fmt(c)+" \\\\ \\text{amount to cover} &= "+fmt(fixed)+" + "+fmt(target)+" = "+fmt(fixed+target)+" \\\\ \\text{items needed} &= "+fmt(fixed+target)+" \\div "+fmt(c)+" = "+fmt(units)+" \\end{aligned} \\] The business must sell <b>"+fmt(units)+" items</b>.",
    {fixed:fixed,target:target,c:c,price:price,v:v});
}, ["Profit targets sit on top of fixed costs: the contribution must cover both.", "Start by finding the contribution per item, then add fixed costs and target profit together."]);

E("u6-seasonal-analysis", 6, ["1.9","1.7"], 3, "gen", function(){
  var ctxs=[
    {biz:"ice cream stand", peak:"summer", off:"the rest of the year"},
    {biz:"snow clearing business", peak:"winter", off:"the rest of the year"},
    {biz:"tour boat operation", peak:"summer", off:"the rest of the year"},
    {biz:"garden centre", peak:"spring", off:"the rest of the year"},
    {biz:"ski rental shop", peak:"winter", off:"the rest of the year"}];
  var ctx=pick(ctxs), m1=pick([3,4,5]), m2=12-m1;
  var p1=ri(80,300)*10, loss=ri(20,90)*10, guard=0;
  var annual, d1, d2, d3;
  do { annual=m1*p1-m2*loss; d1=m1*p1; d2=p1*12-m2*loss; d3=(p1-loss)*12; p1+= (guard>0? 70:0); guard++; }
  while((annual<=0 || d1===annual || d2===annual || d3===annual || d1===d2 || d1===d3 || d2===d3) && guard<40);
  annual=m1*p1-m2*loss; d1=m1*p1; d2=p1*12-m2*loss; d3=(p1-loss)*12;
  var opts=[
    {t:"The yearly profit is "+u6M(d1)+", because the off season can be ignored.", fb:"That counts only the peak months. The off season losses of "+u6M(loss)+" a month still count."},
    {t:"The yearly profit is "+u6M(d2)+", because the peak profit applies to all 12 months.", fb:"That gives peak profit to the off season months too, but those months lose money instead."},
    {t:"The yearly profit is "+u6M(d3)+", by subtracting one month of loss from one month of peak profit and multiplying by 12.", fb:"That treats every month as the same. Peak and off season months come in different counts: "+m1+" and "+m2+"."}];
  var q=mcq("A "+ctx.biz+" makes a profit of "+u6M(p1)+" in each of its "+m1+" peak "+ctx.peak+" months, and loses "+u6M(loss)+" in each of the other "+m2+" months of the year. Which statement about its yearly result is correct?",
    {t:"The yearly profit is "+u6M(annual)+", because the peak months carry the off season losses.", fb:"Yes: peak profit over "+m1+" months, minus off season losses over "+m2+" months, gives this yearly figure."}, opts,
    "Total each part of the year separately. \\[ \\begin{aligned} \\text{peak months} &= "+m1+" \\times "+fmt(p1)+" = "+fmt(m1*p1)+" \\\\ \\text{off season} &= "+m2+" \\times (-"+fmt(loss)+") = -"+fmt(m2*loss)+" \\\\ \\text{year} &= "+fmt(m1*p1)+" - "+fmt(m2*loss)+" = "+fmt(annual)+" \\end{aligned} \\] The answer is <b>the "+u6M(annual)+" statement</b>.",
    {m1:m1,p1:p1,loss:loss,annual:annual});
  q.figure=u6Bar([{label:"Peak month",v:p1},{label:"Off month loss",v:loss}]);
  return q;
}, ["Total the peak months and the off season months separately, then combine them.", "Start by multiplying the peak monthly profit by the number of peak months."]);

/* ===== Prior knowledge tranche (Nov 15, 2026): Clusters 7 and 8 (businesses; taxes). Borrowed verbatim from Mathematics 2202 (u5-budget-totals-mc, shared with Unit 5's pool under a separate host entry, and u5-week-spending-mc), Mathematics 9 (u5-balance-model, shared with Unit 2's pool under a separate host entry, and u5-gap-both-sides-cr) and Mathematics 1202 (u4-deduction-calc, u4-net-from-deductions); feeder helper copies ride in bank-helpers.js. Authored for this tranche: u6-pk-profit-loss (revenue and expenses to a profit or loss, business dress). The community-knowledge element of indicator 1.6 is not assessable and carries no item (source gap 2). ===== */
E("u6-pk-budget-totals", 6, ["1.8"], 2, "gen", function(){
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

E("u6-pk-week-spending", 6, ["1.8"], 2, "gen", function(){
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
    var list=all.map(function(e){ return e.d+": "+e.t+", "+f22_u5M(e.c); }).join("; ")+".";
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
    var distractors=errs.map(function(e){ return {t:f22_u5M(e.v), fb:e.fb}; });
    var q=mcq(prompt, {t:f22_u5M(correctC), fb:"Yes. Adding the matching items gives this total."}, distractors,
      solHead+" \\[ \\begin{aligned} \\text{Total} &= "+solParts.join(" + ")+" \\\\ &= "+fmtF(correctC/100,2)+" \\end{aligned} \\] Rounded to the cent, the answer is <b>"+f22_u5M(correctC)+"</b>.",
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

E("u6-pk-profit-loss", 6, ["1.8"], 1, "gen", function () {
  function mny(v) { return "$" + String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
  var biz = pick([["food truck", ["sales", "catering"], ["food supplies", "fuel", "market fees"]],
    ["lawn care service", ["weekly mowing contracts", "one-time cleanups"], ["fuel", "equipment repairs", "advertising"]],
    ["craft stall", ["market sales", "online orders"], ["materials", "stall fees", "packaging"]],
    ["bike repair shop", ["repairs", "parts sales"], ["parts", "rent", "tools"]]]);
  var rev = [ri(30, 90) * 25, ri(10, 50) * 25];
  var exp = [ri(15, 60) * 25, ri(8, 40) * 25, ri(5, 30) * 25];
  var R = rev[0] + rev[1], E2 = exp[0] + exp[1] + exp[2];
  var tries = 0;
  while ((R === E2 || Math.abs(R - E2) < 100) && tries < 40) { rev[1] = ri(10, 50) * 25; R = rev[0] + rev[1]; tries++; }
  var profit = R > E2, D = Math.abs(R - E2);
  var word = profit ? "profit" : "loss";
  var keyT = "A " + word + " of " + mny(D);
  var dsOpts = [
    { t: "A " + (profit ? "loss" : "profit") + " of " + mny(D), fb: profit ? "The money coming in is larger than the money going out, so the business made a profit, not a loss." : "The money going out is larger than the money coming in, so the business took a loss, not a profit." },
    { t: "A " + word + " of " + mny(R + E2), fb: "That adds the revenue and the expenses together. A " + word + " comes from the difference between them, not their total." },
    { t: profit ? "A profit of " + mny(R) : "A loss of " + mny(E2), fb: profit ? "That is the revenue on its own. The profit is what remains after the expenses come off the revenue." : "That is the expenses on their own. The loss is how much the expenses pass the revenue, not the whole expense total." }
  ];
  var sol = "Total the money in: " + mny(rev[0]) + " + " + mny(rev[1]) + " = " + mny(R) + ". Total the money out: " + mny(exp[0]) + " + " + mny(exp[1]) + " + " + mny(exp[2]) + " = " + mny(E2) +
    ". The difference is " + mny(D) + ", and since the money " + (profit ? "in is larger" : "out is larger") + ", the business made <b>" + keyT.toLowerCase() + "</b>.";
  var prompt = "A " + biz[0] + " has these amounts for one month. Money in: " + biz[1][0] + " " + mny(rev[0]) + ", " + biz[1][1] + " " + mny(rev[1]) +
    ". Money out: " + biz[2][0] + " " + mny(exp[0]) + ", " + biz[2][1] + " " + mny(exp[1]) + ", " + biz[2][2] + " " + mny(exp[2]) + ". What was the business's result for the month?";
  return mcq(prompt, { t: keyT, fb: "Correct: revenue minus expenses gives the result, and its direction names it a " + word + "." },
    dsOpts, sol, { mode: "profit-loss", revenue: R, expenses: E2, ans: D, profit: profit });
}, ["Total the money coming in and the money going out separately.", "Revenue minus expenses: a positive result is a profit, and if expenses are bigger the business took a loss."]);

E("u6-pk-balance-model", 6, ["1.8"], 1, "gen", function () {
  var a = ri(1, 3), b = ri(1, 4), c = ri(b + 2, 10);
  function eq(x, y, z) { return "\\(" + u5lin(x, y) + "=" + fmt(z) + "\\)"; }
  var corr = eq(a, b, c);
  var cands = [
    { t: eq(a, c, b), fb: "That swaps the unit blocks: the left pan has " + fmt(b) + " unit blocks and the right pan has " + fmt(c) + "." },
    { t: eq(b, a, c), fb: "That swaps the counts: there are " + fmt(a) + " x blocks and " + fmt(b) + " unit blocks on the left pan." },
    { t: eq(a + 1, b, c), fb: "That counts one x block too many; the left pan shows " + fmt(a) + " x blocks." },
    { t: eq(a, b, c + 1), fb: "That counts one unit block too many on the right pan; it shows " + fmt(c) + "." },
    { t: eq(a, b + 1, c), fb: "That counts one unit block too many on the left pan; it shows " + fmt(b) + "." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Count the blocks on each pan: \\[ \\begin{aligned} \\text{left pan} &= " + fmt(a) + " \\text{ x blocks} + " + fmt(b) + " \\text{ unit blocks} \\\\ \\text{right pan} &= " + fmt(c) + " \\text{ unit blocks} \\end{aligned} \\] The pans balance, so the model shows <b>" + corr + "</b>.";
  var q = mcq("The diagram shows a balance model. Each large block is labelled x and each small block is labelled 1. The pans balance. Which equation does the model show?", { t: corr, fb: "Correct: the left pan gives the x terms and units, and the right pan gives the total." }, ds, sol, { mode: "balance", a: a, b: b, c: c });
  q.figure = u5balance(a, b, c);
  return q;
}, ["Count the blocks on the left pan first: x blocks give the x term, small blocks give the constant.", "The left pan is one side of the equation and the right pan is the other side."]);

E("u6-pk-both-sides", 6, ["1.8"], 2, "gen", function () {
  var x0 = ri(-9, 9);
  if (x0 === 0) x0 = 4;
  var a = ri(4, 9), c = ri(2, a - 2), b = ri(-10, 10), d = b + (a - c) * x0;
  var prompt = "Solve the equation \\(" + u5lin(a, b) + " = " + u5lin(c, d) + "\\). What is the value of \\(x\\)?";
  var sol = "Collect the x terms on one side first, then collect the constants: \\[ \\begin{aligned} " + u5lin(a, b) + " &= " + u5lin(c, d) + " \\\\ " + fmt(a - c) + "x &= " + fmt(d - b) + " \\\\ x &= " + fmt(x0) + " \\end{aligned} \\] The answer is <b>" + fmt(x0) + "</b>.";
  return numq(prompt, x0, 0.01, sol, { mode: "gap-both-sides", a: a, c: c, b: b, d: d });
}, ["The x terms start on both sides, so they must be gathered before dividing.", "Subtract the smaller x term from both sides as the first step."]);

E("u6-pk-deduction-calc", 6, ["1.15"],2,"gen",function(){
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

E("u6-pk-net-from-deductions", 6, ["1.15"],2,"gen",function(){
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

/* PK tranche metadata pass for Unit 6. pkFor is the unit's cluster
   indicator list from the prior knowledge map, as registered for this
   unit in courses.js. */
var PKT_U6_FOR=["1.5","1.6","1.7","1.8","1.9","1.13","1.14","1.15"];
var PKT_U6={
 "u6-pk-budget-totals":{src:"math-2202:1.3",group:"business-totals"},
 "u6-pk-week-spending":{src:"math-2202:1.4",group:"business-totals"},
 "u6-pk-profit-loss":{src:"authored:profit-and-loss",group:"business-totals"},
 "u6-pk-balance-model":{src:"math-9:8.17",group:"break-even"},
 "u6-pk-both-sides":{src:"math-9:8.17",group:"break-even"},
 "u6-pk-deduction-calc":{src:"math-1202:1.16",group:"payroll"},
 "u6-pk-net-from-deductions":{src:"math-1202:1.17",group:"payroll"}
};
BANK.forEach(function(e){var t=PKT_U6[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U6_FOR.slice();e.pkGroup=t.group;}});
