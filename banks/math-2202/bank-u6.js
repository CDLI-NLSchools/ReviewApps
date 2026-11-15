// Math 2202 Unit 6 Banking question bank
// Cut verbatim from the standalone bank source
// (math-2202-review/bank-src.js, lines 2926 to 3648).
// CRMARKS: u6-simple-interest-solve=2
// CRMARKS: u6-compound-future-value=2
// CRMARKS: u6-atm-total-charges=2
// CRMARKS: u6-credit-interest-cost=3
// CRMARKS: u6-payday-loan-cost=3
// CRMARKS: u6-promo-deferred-interest=3
// CRMARKS: u6-compound-solve-periods=2
// CRMARKS: u6-credit-plan-savings=3
/* ===== Unit 6 ===== */
/* Unit 6 Banking (Math 2202). Helpers prefixed u6. */
function u6d(x){var s=(Math.round(x*100)/100).toFixed(2);var p=s.split(".");p[0]=p[0].replace(/\B(?=(\d{3})+(?!\d))/g,",");return "$"+p.join(".");}
function u6names(){return pick(["Maya","Liam","Sofia","Noah","Emma","Lucas","Ava","Ethan","Mia","Chloe","Ben","Ruby"]);}
function u6goal(){return pick(["a used car","a furnace repair","tuition fees","a snowmobile","a laptop for work","a wedding","a fishing boat motor","a home renovation"]);}

E("u6-simple-interest-basic", 6, ["1.7"], 1, "gen", function(){
  var P=pick([400,500,600,800,1000,1200,1500,1800,2000,2500,3000]);
  var r=pick([2,2.5,3,3.5,4,4.5,5,6]);
  var t=ri(2,5);
  var I=P*r/100*t, oneYr=P*r/100, extraYr=I+oneYr, FV=P+I;
  var prompt=u6names()+" invests "+u6d(P)+" at a simple interest rate of "+fmt(r)+"% per year for "+t+" years. How much interest is earned?";
  var sol="Use \\(I = Prt\\) with the rate written as a decimal. \\[ \\begin{aligned} I &= "+fmt(P)+" \\times "+fmt(r/100,4)+" \\times "+t+" \\\\ &= "+fmt(I)+" \\end{aligned} \\] Rounded to the cent, the interest earned is <b>"+u6d(I)+"</b>.";
  return mcq(prompt,
    {t:u6d(I), fb:"Correct: "+u6d(P)+" times "+fmt(r/100,4)+" times "+t+" years gives "+u6d(I)+"."},
    [{t:u6d(FV), fb:"That is the final value. It adds the principal back in, but the question asks for interest only."},
     {t:u6d(oneYr), fb:"That is the interest for one year only. The money is invested for "+t+" years."},
     {t:u6d(extraYr), fb:"That charges for one year too many. The term is "+t+" years."}],
    sol, {mode:"I", P:P, r:r, t:t});
}, ["Use the simple interest formula I = Prt from the formula sheet.", "First change the percent rate to a decimal, then multiply principal, rate and time."]);

E("u6-banking-services", 6, ["1.11"], 1, "var", varset([
  function(){ return mcq("Which option describes a service offered by most financial institutions?",
    {t:"Accepting payroll deposits and paying bills from an account", fb:"Correct: deposits and bill payments are core banking services."},
    [{t:"Repairing a car after an accident, at a garage in town", fb:"That is a service of a garage or an insurer, not a bank service."},
     {t:"Issuing a driver licence at a government service office in town", fb:"Licences are issued by a government office, not a financial institution."},
     {t:"Delivering mail to homes along a daily postal route", fb:"Mail delivery is a postal service, not a banking service."}],
    "Financial institutions accept deposits, move money and pay bills for customers. The service described is <b>accepting payroll deposits and paying bills from an account</b>.", {}); },
  function(){ return mcq("Jae wants to send money to his sister in another province on the same day. Which bank service fits this need?",
    {t:"An e-transfer sent through online or mobile banking", fb:"Correct: an e-transfer moves money between accounts quickly."},
    [{t:"A safety deposit box in the bank vault, rented yearly", fb:"A safety deposit box stores valuables. It does not send money."},
     {t:"A term deposit locked in for a full year", fb:"A term deposit holds savings for a set period. It does not send money."},
     {t:"A mortgage application for a house purchase", fb:"A mortgage is a loan for a home. It does not send money to family."}],
    "Sending money quickly between people is done with an <b>e-transfer</b> through online or mobile banking.", {}); },
  function(){ return mcq("Which option is an online banking service?",
    {t:"Checking a balance and downloading statements on a phone app", fb:"Correct: balances and statements are standard online services."},
    [{t:"Renting a safety deposit box in a bank vault", fb:"A safety deposit box is an in-branch service that needs a physical vault."},
     {t:"Signing mortgage papers with an advisor in person at the branch", fb:"That appointment happens in a branch, not online."},
     {t:"Exchanging coins for paper bills at a counter", fb:"Coin exchange is a counter service at a branch."}],
    "Online services include checking balances and downloading statements. The online service is <b>checking a balance and downloading statements on a phone app</b>.", {}); },
  function(){ return mcq("A small business owner wants help setting up payroll deposits, a business account and a loan for new equipment. Where are these services found?",
    {t:"At a financial institution, in a branch or online", fb:"Correct: banks and credit unions provide business accounts, deposits and loans."},
    [{t:"At a grocery store checkout, at the till by the door", fb:"A grocery checkout sells food. It does not provide business banking or loans."},
     {t:"At a motor vehicle office in the city", fb:"That office handles licences and registrations, not business banking."},
     {t:"At a public library, at the front desk", fb:"A library lends books and offers programs, not banking services."}],
    "Business accounts, payroll deposits and equipment loans are services of a <b>financial institution</b>, in a branch or online.", {}); },
  function(){ return mcq("Priya is travelling and wants her pay to go into her account automatically on payday. Which service does she need?",
    {t:"Direct deposit from her employer", fb:"Correct: direct deposit sends pay straight into the account."},
    [{t:"A certified cheque from the bank", fb:"A certified cheque is a paper payment. Her pay would not arrive automatically."},
     {t:"A safety deposit box in the bank vault, rented yearly", fb:"A safety deposit box stores items. It does not receive pay."},
     {t:"An overdraft application at the bank", fb:"Overdraft covers shortfalls. It does not deposit her pay."}],
    "Pay arriving automatically on payday is <b>direct deposit</b> from the employer into the account.", {}); }
]), ["Sort each option by who provides it: a bank or credit union, or someone else.", "Start with the option that involves deposits, payments, transfers or loans."]);

E("u6-account-types", 6, ["1.12","1.13"], 1, "var", varset([
  function(){ return mcq("Which account is designed for everyday deposits and withdrawals, such as pay going in and bills coming out?",
    {t:"A chequing account", fb:"Correct: chequing accounts are built for frequent everyday transactions."},
    [{t:"A high interest savings account", fb:"Savings accounts limit transactions and are meant for holding money longer."},
     {t:"A term deposit", fb:"A term deposit locks money in for a set period, so it suits no daily use."},
     {t:"A safety deposit box", fb:"That is a storage box for valuables, not an account for transactions."}],
    "Everyday deposits and withdrawals belong in a <b>chequing account</b>.", {}); },
  function(){ return mcq("Sam wants to build an emergency fund. The money should earn a higher rate and he plans to touch it rarely. Which account fits best?",
    {t:"A high interest savings account", fb:"Correct: it pays more interest and suits money that is rarely moved."},
    [{t:"A chequing account", fb:"Chequing accounts pay little or no interest, so savings grow slowly there."},
     {t:"A student chequing account for school", fb:"That account is for daily spending, not for growing a savings fund."},
     {t:"An overdraft facility at the bank", fb:"Overdraft is borrowed money for shortfalls, not a place to save."}],
    "Money saved for emergencies and rarely touched fits a <b>high interest savings account</b>, which pays a higher rate.", {}); },
  function(){ return mcq("What is a savings account at a financial institution?",
    {t:"An account that pays interest and is used to hold money for future goals", fb:"Correct: savings accounts pay interest on money held for later."},
    [{t:"A loan that must be repaid with interest, over a set term of years, in full", fb:"That describes borrowing, the opposite of saving in an account."},
     {t:"A card used to pay at store checkouts, instead of cash", fb:"That describes a debit or credit card, not a savings account."},
     {t:"A box rented to store jewellery, kept in a bank vault for safety", fb:"That is a safety deposit box, not a savings account."}],
    "A savings account <b>pays interest and holds money for future goals</b>.", {}); },
  function(){ return mcq("A 16 year old has a part time job, makes about six debit purchases a month, and wants no monthly fee. Which account fits best?",
    {t:"A youth or student chequing account with no monthly fee", fb:"Correct: youth and student accounts usually waive the monthly fee."},
    [{t:"A premium chequing account with a high monthly fee", fb:"The fee works against the goal of paying no monthly fee."},
     {t:"A term deposit for five years", fb:"A term deposit locks the money away, so pay could not be spent as needed."},
     {t:"A high interest savings account with a fee per withdrawal", fb:"Regular debit purchases would trigger withdrawal fees."}],
    "The criteria point to a <b>youth or student chequing account with no monthly fee</b>.", {}); },
  function(){ return mcq("Two partners want one account that both can deposit into and pay household bills from. Which account fits?",
    {t:"A joint chequing account", fb:"Correct: a joint account lets both holders deposit and pay bills."},
    [{t:"A term deposit in one name", fb:"A term deposit locks funds and is held in one name here."},
     {t:"A safety deposit box", fb:"A box stores valuables. Bills cannot be paid from it."},
     {t:"A store credit card", fb:"A credit card is borrowed money, not a shared bill paying account."}],
    "Shared deposits and bill payments call for a <b>joint chequing account</b>.", {}); }
]), ["Match the account to its main job: daily transactions, saving, or locking money away.", "Start by ruling out any option that is a loan, a card or a storage box rather than an account."]);


E("u6-keep-info-secure", 6, ["1.17"], 1, "var", varset([
  function(){ return mcq("Maya gets an email that looks like it is from her bank and asks her to type in her PIN to verify her account. What is the safe action?",
    {t:"Delete the email and contact the bank through its official app or phone number", fb:"Correct: banks do not ask for a PIN by email. Contact the bank directly."},
    [{t:"Reply with the PIN so the account stays open and in active use", fb:"Sharing a PIN by email hands it to a possible fraudster."},
     {t:"Forward the email to friends so they can check it and say if it looks real or not", fb:"Forwarding spreads the scam and does not protect the account."},
     {t:"Click the link in the email and sign in there with the account password", fb:"The link can lead to a fake site built to steal sign in details."}],
    "A bank never asks for a PIN by email. The safe action is to <b>delete the email and contact the bank through its official app or phone number</b>.", {}); },
  function(){ return mcq("Which password practice best protects online banking?",
    {t:"A long, unique password used only for banking, with two step verification turned on", fb:"Correct: a unique password plus two step verification gives two layers of protection."},
    [{t:"The same short password used for every account and every sign in she uses", fb:"If one account is leaked, every account using that password is at risk."},
     {t:"A password written on a note stuck to the computer at home, by the screen", fb:"Anyone near the computer can read and use it."},
     {t:"A password shared with friends in case of emergency, so they can help out if needed", fb:"Every extra person who knows the password raises the risk."}],
    "The strongest practice is a <b>long, unique banking password with two step verification turned on</b>.", {}); },
  function(){ return mcq("Liam is at an ATM. Which action protects his PIN?",
    {t:"Cover the keypad with his other hand while he enters the PIN", fb:"Correct: covering the keypad blocks cameras and onlookers."},
    [{t:"Say the PIN out loud, over and over, to remember it by heart", fb:"Anyone nearby can hear and reuse it."},
     {t:"Write the PIN on the back of the card itself, in pen", fb:"A lost card would then carry its own PIN with it."},
     {t:"Ask a stranger to watch his bag while he types it in", fb:"A stranger nearby is exactly who the PIN should be hidden from."}],
    "Covering the keypad while entering the PIN <b>protects the PIN from cameras and onlookers</b>.", {}); },
  function(){ return mcq("Old bank statements are being thrown out at home. What is the secure way to dispose of them?",
    {t:"Shred them before recycling", fb:"Correct: shredding makes account numbers unreadable."},
    [{t:"Put them in the recycling bin as they are", fb:"Account details stay readable to anyone who finds them."},
     {t:"Leave them in a bag by the door for a week", fb:"The statements can be taken or read while they sit there."},
     {t:"Give them to a neighbour to burn sometime", fb:"Handing statements to someone else exposes the information."}],
    "Shredding statements before recycling <b>keeps account numbers from being read</b>.", {}); },
  function(){ return mcq("Which habit helps keep financial information secure on a phone?",
    {t:"Using the bank app on private data or home wifi and keeping the app updated", fb:"Correct: private connections and updates reduce the risk of stolen details."},
    [{t:"Banking on open public wifi at a coffee shop in town nearby", fb:"Open networks can expose sign in details to others."},
     {t:"Saving the banking password in a notes app with no lock on it", fb:"Anyone who opens the phone can read the password."},
     {t:"Lending the phone with banking signed in, to a coworker at work for the whole day", fb:"A signed in session gives full access to the accounts."}],
    "Banking on a private connection with an updated app <b>helps keep financial information secure</b>.", {}); }
]), ["Think about who should be able to see or use the information: only the account holder.", "Start by ruling out any option that shares a PIN, a password or account details."]);

E("u6-debit-basics", 6, ["1.16","1.14"], 1, "var", varset([
  function(){ return mcq("Which option is an advantage of paying by debit card?",
    {t:"The money leaves the account right away, so spending is easy to track and no interest is charged", fb:"Correct: debit uses your own money, so there is no interest bill later."},
    [{t:"The purchase is free because no money changes hands when the card is used to pay for anything at all", fb:"Debit payments come straight out of the account balance."},
     {t:"Interest is charged each month on every purchase, just as with a credit card bill", fb:"Interest is a feature of credit cards, not debit purchases."},
     {t:"The bank pays a bonus equal to the purchase price on every single purchase made with it", fb:"Banks do not match the price of debit purchases."}],
    "Debit takes money from the account right away, so <b>spending is easy to track and no interest is charged</b>.", {}); },
  function(){ return mcq("Which option is a disadvantage of paying by debit card?",
    {t:"If the card details are stolen, money can leave the account right away and take time to get back", fb:"Correct: fraud on debit affects your own money immediately."},
    [{t:"A monthly interest bill arrives for every purchase, and it must be paid in full at the end of each month, with interest", fb:"Debit purchases do not build an interest bill."},
     {t:"The account earns no deposits from an employer, so the balance never grows on its own at all", fb:"Pay can still be deposited into the account. That is unrelated to debit use."},
     {t:"Stores are charged the full purchase price as a fee on every sale they make with it", fb:"Merchant fees are a small percentage, not the full price."}],
    "A real disadvantage is that <b>stolen debit details can drain the account right away</b>, and recovery can take time.", {}); },
  function(){ return mcq("Nora pays for groceries with a debit card. What happens to the money?",
    {t:"The amount is taken from her chequing account at the time of purchase", fb:"Correct: debit moves money from the account right away."},
    [{t:"The amount is added to a bill she pays at the end of the year in one sum", fb:"That describes a credit card balance, not a debit purchase."},
     {t:"The store lends her the amount until payday, interest free", fb:"No loan is involved. Her own money pays for the groceries."},
     {t:"The bank covers the amount as a gift, free of charge", fb:"The bank does not gift purchase amounts to customers."}],
    "A debit purchase <b>takes the amount from the chequing account at the time of purchase</b>.", {}); },
  function(){ return mcq("Which option is an advantage of online banking?",
    {t:"Bills can be paid and balances checked at any hour, without a trip to a branch", fb:"Correct: online banking is available around the clock from home."},
    [{t:"Cash can be withdrawn from a phone screen, as if the phone were a bank machine", fb:"Cash still comes from an ATM or a branch, not a phone screen."},
     {t:"No password is ever needed for any purchase at all, large or small", fb:"Online banking always needs secure sign in details."},
     {t:"Interest rates double on every account, on every purchase made", fb:"Going online does not change the rate an account pays."}],
    "Online banking lets customers <b>pay bills and check balances at any hour</b> without visiting a branch.", {}); },
  function(){ return mcq("Tom keeps a set amount in his chequing account and uses debit for all daily spending. How does debit help his budget?",
    {t:"He can see the balance drop with each purchase, so overspending shows up right away", fb:"Correct: the falling balance gives immediate feedback on spending."},
    [{t:"The bank blocks every purchase over ten dollars, so nothing costly goes through at all", fb:"Banks do not block ordinary purchases at that level by default."},
     {t:"Each purchase earns a tax refund, claimed on the yearly tax return", fb:"Debit purchases do not create tax refunds."},
     {t:"His balance stays the same no matter what he buys or where he buys it", fb:"Each debit purchase lowers the balance."}],
    "Debit helps budgeting because <b>the balance drops with each purchase</b>, so overspending shows up right away.", {}); }
]), ["Debit means your own money moves right away. Credit means borrowed money is repaid later.", "Start by checking whether the option talks about your own balance or a bill that comes later."]);

E("u6-simple-interest-solve", 6, ["1.7"], 2, "gen", function(){
  var P=pick([500,800,1000,1200,1500,2000,2500,3000]);
  var r=pick([2,2.5,3,4,5,6]);
  var t=pick([1,2,3,4,5]);
  var I=P*r/100*t;
  var mode=ri(0,3);
  var who=u6names(), goal=u6goal();
  if(mode===0){
    return numq(who+" borrows "+u6d(P)+" for "+goal+" at a simple interest rate of "+fmt(r)+"% per year for "+t+" years. How much interest is charged, in dollars?",
      Math.round(I*100)/100, 0.05,
      "Use \\(I = Prt\\). \\[ \\begin{aligned} I &= "+fmt(P)+" \\times "+fmt(r/100,4)+" \\times "+t+" \\\\ &= "+fmt(I)+" \\end{aligned} \\] The interest charged is <b>"+u6d(I)+"</b>.",
      {mode:"I", P:P, r:r, t:t});
  }
  if(mode===1){
    return numq(who+" pays "+u6d(I)+" in simple interest on a loan at "+fmt(r)+"% per year over "+t+" years. What was the principal, in dollars?",
      P, 0.5,
      "Rearrange \\(I = Prt\\) to solve for \\(P\\). \\[ \\begin{aligned} P &= \\frac{I}{rt} \\\\ &= \\frac{"+fmt(I)+"}{"+fmt(r/100,4)+" \\times "+t+"} \\\\ &= "+fmt(P)+" \\end{aligned} \\] The principal was <b>"+u6d(P)+"</b>.",
      {mode:"P", I:I, r:r, t:t});
  }
  if(mode===2){
    return numq(who+" earns "+u6d(I)+" in simple interest on a deposit of "+u6d(P)+" over "+t+" years. What is the annual interest rate, as a percent?",
      r, 0.05,
      "Rearrange \\(I = Prt\\) to solve for \\(r\\). \\[ \\begin{aligned} r &= \\frac{I}{Pt} \\\\ &= \\frac{"+fmt(I)+"}{"+fmt(P)+" \\times "+t+"} \\\\ &= "+fmt(r/100,4)+" \\end{aligned} \\] As a percent, the rate is <b>"+fmt(r)+"%</b>.",
      {mode:"r", I:I, P:P, t:t});
  }
  return numq(who+" earns "+u6d(I)+" in simple interest on a deposit of "+u6d(P)+" at "+fmt(r)+"% per year. For how many years was the money invested?",
    t, 0.05,
    "Rearrange \\(I = Prt\\) to solve for \\(t\\). \\[ \\begin{aligned} t &= \\frac{I}{Pr} \\\\ &= \\frac{"+fmt(I)+"}{"+fmt(P)+" \\times "+fmt(r/100,4)+"} \\\\ &= "+fmt(t)+" \\end{aligned} \\] The money was invested for <b>"+t+" years</b>.",
    {mode:"t", I:I, P:P, r:r});
}, ["Start from I = Prt and rearrange it for the value you are asked to find.", "First write the formula with the three given values substituted in."]);

E("u6-compound-future-value", 6, ["1.9"], 2, "gen", function(){
  var P=pick([500,800,1000,1500,2000,2500,3000,4000]);
  var r=pick([2,2.5,3,3.5,4,4.5,5,6,7]);
  var t=ri(2,10);
  var FV=P*Math.pow(1+r/100,t);
  var earn=FV-P;
  var who=u6names();
  var tol=Math.max(0.5,FV*0.005);
  if(ri(0,1)===0){
    return numq(who+" invests "+u6d(P)+" at "+fmt(r)+"% per year, compounded annually, for "+t+" years. What is the future value, in dollars?",
      Math.round(FV*100)/100, tol,
      "Use \\(FV = P(1 + r)^t\\) with the rate as a decimal. \\[ \\begin{aligned} FV &= "+fmt(P)+"(1 + "+fmt(r/100,4)+")^{"+t+"} \\\\ &= "+fmt(P)+" \\times "+fmtF(Math.pow(1+r/100,t),4)+" \\\\ &\\approx "+fmtF(FV,2)+" \\end{aligned} \\] The future value is about <b>"+u6d(FV)+"</b>.",
      {mode:"FV", P:P, r:r, t:t});
  }
  return numq(who+" invests "+u6d(P)+" at "+fmt(r)+"% per year, compounded annually, for "+t+" years. How much interest is earned, in dollars?",
    Math.round(earn*100)/100, tol,
    "First find the future value, then subtract the principal. \\[ \\begin{aligned} FV &= "+fmt(P)+"(1 + "+fmt(r/100,4)+")^{"+t+"} \\approx "+fmtF(FV,2)+" \\\\ \\text{Interest} &= "+fmtF(FV,2)+" - "+fmt(P)+" \\\\ &\\approx "+fmtF(earn,2)+" \\end{aligned} \\] The interest earned is about <b>"+u6d(earn)+"</b>.",
    {mode:"earn", P:P, r:r, t:t});
}, ["Use the compound interest form FV = P(1 + r) to the power t from the formula sheet.", "First substitute the principal, the rate as a decimal and the number of years."]);

E("u6-atm-total-charges", 6, ["1.15"], 2, "gen", function(){
  var who=u6names();
  var otherN=ri(1,6), ownN=ri(0,8);
  var otherFee=pick([2,2.5,3,3.5,4]);
  var surcharge=pick([1,1.5,2,2.5]);
  var ownFee=pick([0,0.5,1,1.25]);
  var total=otherN*(otherFee+surcharge)+ownN*ownFee;
  var month=pick(["January","March","April","June","September","November"]);
  var ownText=ownFee===0 ? "withdrawals at the home bank ATM are free" : "each withdrawal at the home bank ATM costs "+u6d(ownFee);
  return numq("In "+month+", "+who+" makes "+otherN+" withdrawals at other banks ATMs and "+ownN+" withdrawals at the home bank ATM. Each withdrawal at another bank ATM carries a "+u6d(otherFee)+" fee from that bank plus a "+u6d(surcharge)+" surcharge from the home bank, and "+ownText+". What are the total ATM charges for the month, in dollars?",
    Math.round(total*100)/100, 0.02,
    "Add the two charges on each outside withdrawal, then total both groups. \\[ \\begin{aligned} \\text{Outside} &= "+otherN+" \\times ("+fmtF(otherFee,2)+" + "+fmtF(surcharge,2)+") = "+fmtF(otherN*(otherFee+surcharge),2)+" \\\\ \\text{Home} &= "+ownN+" \\times "+fmtF(ownFee,2)+" = "+fmtF(ownN*ownFee,2)+" \\\\ \\text{Total} &= "+fmtF(otherN*(otherFee+surcharge),2)+" + "+fmtF(ownN*ownFee,2)+" = "+fmtF(total,2)+" \\end{aligned} \\] The total ATM charges are <b>"+u6d(total)+"</b>.",
    {otherN:otherN, ownN:ownN, otherFee:otherFee, surcharge:surcharge, ownFee:ownFee});
}, ["Separate the withdrawals into outside bank withdrawals and home bank withdrawals, and price each group.", "First add the fee and the surcharge together for one outside withdrawal."]);


E("u6-compounding-periods", 6, ["1.10","1.9"], 2, "gen", function(){
  var P=pick([1000,1500,2000,2500,3000,4000]);
  var r=pick([3,4,5,6]);
  var t=pick([2,3,4,5]);
  var n=pick([2,4,12]);
  var word={2:"semi-annually (2 times per year)",4:"quarterly (4 times per year)",12:"monthly (12 times per year)"}[n];
  var FVn=P*Math.pow(1+r/100/n,n*t);
  var FV1=P*Math.pow(1+r/100,t);
  var FVs=P*(1+r/100*t);
  var FVwrong=P*Math.pow(1+r/100,n*t);
  var maxV=Math.max(FVn,FV1);
  function bar(v){ return Math.max(14, Math.round(100*v/maxV)); }
  var fig='<svg width="320" height="180" viewBox="0 0 320 180">'
    +'<line x1="40" y1="140" x2="300" y2="140" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<rect x="70" y="'+(140-bar(FV1))+'" width="60" height="'+bar(FV1)+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<rect x="190" y="'+(140-bar(FVn))+'" width="60" height="'+bar(FVn)+'" fill="'+FIG_ACC+'" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<text x="100" y="'+(132-bar(FV1))+'" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">'+u6d(FV1)+'</text>'
    +'<text x="220" y="'+(132-bar(FVn))+'" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">'+u6d(FVn)+'</text>'
    +'<text x="100" y="158" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">annually</text>'
    +'<text x="220" y="158" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">'+({2:"semi-annually",4:"quarterly",12:"monthly"})[n]+'</text>'
    +'<text x="160" y="174" font-size="11" fill="'+FIG_INK+'" text-anchor="middle">Future value of '+u6d(P)+' at '+fmt(r)+'% over '+t+' years</text></svg>';
  var q=mcq(u6names()+" invests "+u6d(P)+" at "+fmt(r)+"% per year for "+t+" years, compounded "+word+". What is the future value?",
    {t:u6d(FVn), fb:"Correct: divide the rate by "+n+" and multiply the years by "+n+" in the exponent."},
    [{t:u6d(FV1), fb:"That is the value with annual compounding. More frequent compounding earns a little more."},
     {t:u6d(FVs), fb:"That is simple interest. Compound interest earns interest on interest."},
     {t:u6d(FVwrong), fb:"That keeps the full rate in every period. The rate must be divided by "+n+" first."}],
    "Use \\(FV = P\\left(1 + \\frac{r}{n}\\right)^{nt}\\). \\[ \\begin{aligned} FV &= "+fmt(P)+"\\left(1 + \\frac{"+fmt(r/100,4)+"}{"+n+"}\\right)^{"+n+" \\times "+t+"} \\\\ &\\approx "+fmtF(FVn,2)+" \\end{aligned} \\] The future value is about <b>"+u6d(FVn)+"</b>. Compounding more often gives a slightly larger value, as the bars show.",
    {mode:"FVn", P:P, r:r, t:t, n:n});
  q.figure=fig;
  return q;
}, ["Use the compound form with n compounding periods per year from the formula sheet.", "First divide the rate by the number of periods per year and multiply the years by that same number."]);

E("u6-simple-vs-compound", 6, ["1.8"], 2, "gen", function(){
  var P=pick([1000,1500,2000,2500,3000,4000,5000]);
  var r=pick([4,5,6,7,8]);
  var t=ri(3,10);
  var FVs=P*(1+r/100*t), FVc=P*Math.pow(1+r/100,t);
  var diff=FVc-FVs, Is=P*r/100*t, Ic=FVc-P, both=Is+Ic;
  return mcq(u6names()+" invests "+u6d(P)+" at "+fmt(r)+"% per year for "+t+" years. By how much does compound interest (compounded annually) beat simple interest over this period?",
    {t:u6d(diff), fb:"Correct: the compound future value minus the simple future value is "+u6d(diff)+"."},
    [{t:u6d(Is), fb:"That is the simple interest alone, not the gap between the two methods."},
     {t:u6d(Ic), fb:"That is the full compound interest alone, not the gap between the two methods."},
     {t:u6d(both), fb:"That adds both interest amounts together. The question asks for the difference."}],
    "Compare the two future values. \\[ \\begin{aligned} FV_{\\text{simple}} &= "+fmt(P)+"(1 + "+fmt(r/100,4)+" \\times "+t+") = "+fmtF(FVs,2)+" \\\\ FV_{\\text{compound}} &= "+fmt(P)+"(1 + "+fmt(r/100,4)+")^{"+t+"} \\approx "+fmtF(FVc,2)+" \\\\ \\text{Difference} &= "+fmtF(FVc,2)+" - "+fmtF(FVs,2)+" \\approx "+fmtF(diff,2)+" \\end{aligned} \\] Compound interest beats simple interest by about <b>"+u6d(diff)+"</b>, because compound interest also earns interest on past interest.",
    {P:P, r:r, t:t});
}, ["Compute the future value both ways, with simple interest and with compound interest, then subtract.", "First work out the simple interest future value using FV = P + I."]);

E("u6-best-account", 6, ["1.12","1.13"], 2, "var", varset([
  function(){ return mcq("An account charges $12 per month and includes 20 free debit transactions, then $0.75 each. A second account charges $4 per month and includes 10 free transactions, then $1.00 each. A third account charges $29 per month with unlimited transactions and extra perks. Sam makes about 30 transactions a month and wants the lowest cost. Which account fits best?",
    {t:"The $12 account, costing $12 plus 10 extra fees for a total of $19.50", fb:"Correct: $12 plus 10 times $0.75 equals $19.50, the lowest of the three."},
    [{t:"The $4 account, costing $4 plus 20 extra fees for a total of $24.00", fb:"The monthly fee is lower, but 20 extra transactions bring the total to $24.00."},
     {t:"The $29 account, because unlimited transactions always save money in the end", fb:"At 30 transactions the unlimited plan costs $29, which is higher than $19.50."},
     {t:"A savings account, to avoid transaction fees entirely, always", fb:"Savings accounts restrict transactions and charge per withdrawal, so daily use costs more."}],
    "\\[ \\begin{aligned} \\text{Plan 1} &= 12 + 10 \\times 0.75 = 19.50 \\\\ \\text{Plan 2} &= 4 + 20 \\times 1.00 = 24.00 \\\\ \\text{Plan 3} &= 29.00 \\end{aligned} \\] The lowest cost is the <b>$12 account at $19.50 per month</b>.", {}); },
  function(){ return mcq("Keira is paid weekly, pays rent and bills from her account, and checks her balance daily on her phone. She rarely carries cash. Which account fits best?",
    {t:"A chequing account with online and mobile access", fb:"Correct: frequent deposits, payments and balance checks are chequing account work."},
    [{t:"A term deposit", fb:"A term deposit locks money away, so rent and bills could not be paid from it."},
     {t:"A high interest savings account with two free withdrawals a month", fb:"Weekly pay and many bill payments would pass the free withdrawal limit quickly."},
     {t:"A safety deposit box", fb:"A box stores valuables. It cannot receive pay or pay bills."}],
    "Weekly pay in, bills out and daily balance checks point to a <b>chequing account with online and mobile access</b>.", {}); },
  function(){ return mcq("Devon is saving for a house down payment in three years. The savings will sit untouched and he wants the highest interest he can get while keeping the money at his bank. Which account fits best?",
    {t:"A term deposit or high interest savings account", fb:"Correct: money that sits untouched earns more in a term deposit or high interest savings."},
    [{t:"A basic chequing account at the bank", fb:"Chequing pays little interest, so three years of saving would earn very little."},
     {t:"A student chequing account at the bank", fb:"That account is built for daily spending by students, with low interest."},
     {t:"An account with overdraft protection, for a fee", fb:"Overdraft is a borrowing feature. It does not raise the interest on savings."}],
    "Untouched savings over three years earn the most in a <b>term deposit or high interest savings account</b>.", {}); },
  function(){ return mcq("An seniors account has no monthly fee and 25 free transactions. A regular chequing account charges $14 per month. Mrs. Adeyemi is 68, makes about 15 transactions a month, and wants low fees. Which account fits best?",
    {t:"The seniors account, at no monthly fee for her usage", fb:"Correct: her 15 transactions fit inside the 25 free ones, so she pays no fee."},
    [{t:"The regular chequing account, because it is the standard choice", fb:"Standard does not mean cheapest. She would pay $14 every month."},
     {t:"A premium account at $29 per month with travel perks", fb:"The perks cost $29 a month, which works against her low fee goal."},
     {t:"A term deposit, to earn interest instead of paying fees", fb:"A term deposit locks the money, so her monthly bills could not be paid from it."}],
    "With 15 transactions inside the 25 free ones, the <b>seniors account costs her no monthly fee</b> and fits best.", {}); },
  function(){ return mcq("A seasonal worker earns most of his income in summer and draws on savings through the winter. Which account setup fits best?",
    {t:"A chequing account for spending plus a high interest savings account for the summer surplus", fb:"Correct: the surplus earns interest in savings and moves to chequing as winter spending needs it."},
    [{t:"One term deposit holding all of his money for five years, locked away until the term ends in full", fb:"Winter spending money would be locked away and hard to reach."},
     {t:"A store credit card, used for all of the winter spending he does each year", fb:"Card interest on a winter of spending would cost far more than savings interest earns."},
     {t:"Cash kept at home for the winter, kept in a drawer and spent as needed each week", fb:"Cash at home earns nothing and can be lost or stolen."}],
    "The setup that fits is a <b>chequing account for spending plus a high interest savings account for the summer surplus</b>.", {}); }
]), ["List the criteria in the stem first, then test each account against every criterion.", "Start with the money pattern: money moving often needs chequing, money sitting still needs savings."]);

E("u6-credit-options-compare", 6, ["1.18"], 2, "var", varset([
  function(){ return mcq("Jonah plans a $2,400 furnace replacement and wants fixed monthly payments that end on a set date, at a rate lower than a credit card rate. Which credit option fits best?",
    {t:"A personal loan with fixed payments over a set term", fb:"Correct: a personal loan gives a set payment schedule and usually a lower rate than a card."},
    [{t:"A store credit card with a high rate", fb:"Store cards usually carry high rates, so the furnace would cost more."},
     {t:"Overdraft on his chequing account, arranged at the bank", fb:"Overdraft is meant for small shortfalls, not a planned $2,400 purchase."},
     {t:"A payday loan due in two weeks", fb:"A payday loan is due almost at once and carries very high fees."}],
    "A planned purchase with fixed payments to a set end date fits a <b>personal loan</b>.", {}); },
  function(){ return mcq("Which option describes a line of credit?",
    {t:"An approved limit that can be borrowed from, repaid and borrowed again as needed", fb:"Correct: a line of credit is reusable up to its limit."},
    [{t:"A loan repaid in full, with a large fee, on the next payday", fb:"That describes a payday loan, due in one payment."},
     {t:"A card that only works at one store chain, and nowhere else at all", fb:"That describes a store credit card, not a line of credit."},
     {t:"A deposit that earns interest for five years, locked in at the bank the whole time", fb:"That describes a term deposit, which is saving rather than credit."}],
    "A line of credit is an <b>approved limit that can be borrowed from, repaid and borrowed again</b>.", {}); },
  function(){ return mcq("A store card offers 10% off a first purchase and charges 28% annual interest on balances carried. A bank card charges 19% with no opening discount. Which statement is a fair comparison?",
    {t:"The store card saves money on day one but costs more if the balance is carried", fb:"Correct: the discount helps once, while the higher rate costs more over time."},
    [{t:"The store card is cheaper in every situation, without any exception at all, ever", fb:"A carried balance at 28% costs more than one at 19%, so the claim fails."},
     {t:"The bank card is always the worse choice, whatever the purchase is or costs", fb:"For a balance carried over months, the lower bank rate usually wins."},
     {t:"Both cards cost the same in the end because both are credit cards", fb:"Different rates and offers make the costs different."}],
    "The fair comparison is that the <b>store card saves money on day one but costs more if the balance is carried</b>.", {}); },
  function(){ return mcq("What is overdraft protection on a chequing account?",
    {t:"A small approved credit limit that covers payments when the balance runs short, for a fee and interest", fb:"Correct: overdraft covers shortfalls and charges for the amount used."},
    [{t:"Insurance that pays off a mortgage in full after a job loss, for a monthly premium paid each and every month", fb:"That is a different insurance product, not overdraft protection."},
     {t:"A guarantee that the account balance can never fall, no matter what is spent from the account", fb:"Balances still fall. Overdraft only covers payments past zero, for a cost."},
     {t:"A savings plan that moves money each payday, automatically, into a savings account at the bank", fb:"That describes an automatic transfer plan, not overdraft."}],
    "Overdraft protection is a <b>small approved credit limit that covers payments when the balance runs short</b>, for a fee and interest.", {}); },
  function(){ return mcq("Farah needs $600 for a car repair three days before payday and will repay it from that pay. A bank line of credit is already approved. Which option usually costs the least?",
    {t:"The approved line of credit, repaid on payday", fb:"Correct: a few days of interest on a line of credit costs far less than payday fees."},
    [{t:"A payday loan with a fee per $100 borrowed from it", fb:"Payday fees for a few days work out to a very high annual rate."},
     {t:"A new store credit card from the mall", fb:"A store card signup for one repair adds a high rate account she does not need."},
     {t:"Overdraft left unpaid for a full month", fb:"A month of overdraft fees and interest costs more than three days on a line of credit."}],
    "Borrowing briefly on an <b>approved line of credit and repaying on payday</b> usually costs the least.", {}); }
]), ["Compare each option on rate, repayment pattern and what it is designed for.", "Start by matching the option to the job: planned purchase, flexible borrowing, or a small shortfall."]);

E("u6-credit-card-offers", 6, ["1.21"], 2, "gen", function(){
  var attempt=0, B=1000, fA=29, fB=99, rA=12, rB=24, tA=149, tB=339;
  while(attempt<80){
    attempt++;
    B=pick([600,800,1000,1200,1500,2000,2500,3000]);
    fA=pick([0,29,49,79]); fB=pick([0,39,59,99]);
    rA=pick([12,15,18,21]); rB=pick([14,17,20,24]);
    tA=fA+B*rA/100; tB=fB+B*rB/100;
    var cf=(tA<tB)?fA:fB;
    if(Math.abs(tA-tB)>=12 && fA!==fB && cf>0) break;
  }
  var cheap=Math.min(tA,tB), other=Math.max(tA,tB);
  var cheapFee=(tA<tB)?fA:fB, cheapInt=(tA<tB)?B*rA/100:B*rB/100;
  var otherInt=(tA<tB)?B*rB/100:B*rA/100;
  var prompt=u6names()+" carries a balance of "+u6d(B)+" for one full year. Card A charges "+fmt(rA)+"% annual interest and a "+u6d(fA)+" annual fee. Card B charges "+fmt(rB)+"% annual interest and a "+u6d(fB)+" annual fee. Interest is charged on the full balance for the year. What is the total one year cost of the cheaper card?";
  var sol="Total cost is the annual fee plus one year of interest. \\[ \\begin{aligned} \\text{Card A} &= "+fmtF(fA,2)+" + "+fmt(B)+" \\times "+fmt(rA/100)+" = "+fmtF(tA,2)+" \\\\ \\text{Card B} &= "+fmtF(fB,2)+" + "+fmt(B)+" \\times "+fmt(rB/100)+" = "+fmtF(tB,2)+" \\end{aligned} \\] The cheaper card costs <b>"+u6d(cheap)+"</b> for the year.";
  return mcq(prompt,
    {t:u6d(cheap), fb:"Correct: fee plus one year of interest gives the lower total of "+u6d(cheap)+"."},
    [{t:u6d(other), fb:"That is the total for the other card. Compare both totals and take the lower one."},
     {t:u6d(cheapInt), fb:"That is the interest only. The annual fee must be added as well."},
     {t:u6d(cheapFee+otherInt), fb:"That mixes the fee of one card with the interest of the other. Cost out each card on its own first."}],
    sol, {B:B, fA:fA, fB:fB, rA:rA, rB:rB});
}, ["Total cost means the annual fee plus the interest for the year, for each card separately.", "First compute one year of interest on the balance for Card A."]);


E("u6-credit-interest-cost", 6, ["1.22"], 2, "gen", function(){
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

E("u6-payday-loan-cost", 6, ["1.19"], 2, "gen", function(){
  var who=u6names();
  var B=pick([200,300,400,500,600]);
  var fee=pick([15,17,20,25,30]);
  var cost=B/100*fee, tot=B+cost;
  if(ri(0,1)===0){
    return numq("A payday lender charges a fee of "+u6d(fee)+" for every $100 borrowed, due in 14 days. "+who+" borrows "+u6d(B)+". What is the fee, in dollars?",
      cost, 0.02,
      "Count the hundreds in the amount borrowed, then multiply by the fee. \\[ \\begin{aligned} \\text{Fee} &= \\frac{"+fmt(B)+"}{100} \\times "+fmt(fee)+" \\\\ &= "+fmt(B/100)+" \\times "+fmt(fee)+" = "+fmt(cost)+" \\end{aligned} \\] The fee is <b>"+u6d(cost)+"</b> for borrowing for 14 days.",
      {mode:"fee", B:B, fee:fee});
  }
  return numq("A payday lender charges a fee of "+u6d(fee)+" for every $100 borrowed, due in 14 days. "+who+" borrows "+u6d(B)+". What is the total amount due in 14 days, in dollars?",
    tot, 0.02,
    "Find the fee first, then add the amount borrowed. \\[ \\begin{aligned} \\text{Fee} &= \\frac{"+fmt(B)+"}{100} \\times "+fmt(fee)+" = "+fmt(cost)+" \\\\ \\text{Total due} &= "+fmt(B)+" + "+fmt(cost)+" = "+fmt(tot)+" \\end{aligned} \\] The total amount due is <b>"+u6d(tot)+"</b>.",
    {mode:"total", B:B, fee:fee});
}, ["The fee is charged per $100 borrowed, so scale the fee by the size of the loan.", "First divide the amount borrowed by 100 to count the fee units."]);

E("u6-promo-deferred-interest", 6, ["1.23"], 2, "gen", function(){
  var who=u6names();
  var item=pick(["a sofa set","a refrigerator","a snow blower","a mattress set","a patio set","a washer and dryer"]);
  var P=pick([700,800,900,1000,1200,1500,1800,2000,2500]);
  var r=pick([24,26,28,30]);
  var fee=pick([0,79,99,129]);
  var paid=pick([200,300,400,500]);
  if(paid>=P) paid=200;
  var interest=P*r/100;
  var remaining=P-paid;
  var owed=remaining+interest+fee;
  var feeText=fee>0 ? " plus a "+u6d(fee)+" administration fee" : "";
  if(ri(0,1)===0){
    return numq("A store offers "+item+" for "+u6d(P)+" with no interest for 12 months if the full price is paid within 12 months. If any balance remains at month 12, interest at "+fmt(r)+"% is charged on the full original price for the whole year"+feeText+". "+who+" still owes part of the price at month 12. How much interest is charged, in dollars?",
      Math.round(interest*100)/100, 0.05,
      "Deferred interest is charged on the full original price, not on the balance left. \\[ \\begin{aligned} \\text{Interest} &= "+fmt(P)+" \\times "+fmt(r/100,4)+" \\\\ &= "+fmtF(interest,2)+" \\end{aligned} \\] The interest charged is <b>"+u6d(interest)+"</b>.",
      {mode:"interest", P:P, r:r, fee:fee});
  }
  return numq("A store offers "+item+" for "+u6d(P)+" with no interest for 12 months if the full price is paid within 12 months. If any balance remains at month 12, interest at "+fmt(r)+"% is charged on the full original price for the whole year"+feeText+". "+who+" pays "+u6d(paid)+" during the year and the rest is still owing at month 12. What is the total still owed at month 12, in dollars?",
    Math.round(owed*100)/100, 0.05,
    "The balance left is charged deferred interest on the full price. \\[ \\begin{aligned} \\text{Balance left} &= "+fmt(P)+" - "+fmt(paid)+" = "+fmt(remaining)+" \\\\ \\text{Interest} &= "+fmt(P)+" \\times "+fmt(r/100,4)+" = "+fmtF(interest,2)+" \\\\ \\text{Total owed} &= "+fmt(remaining)+" + "+fmtF(interest,2)+(fee>0?" + "+fmt(fee):"")+" = "+fmtF(owed,2)+" \\end{aligned} \\] The total still owed is <b>"+u6d(owed)+"</b>.",
    {mode:"owed", P:P, r:r, fee:fee, paid:paid});
}, ["Read the promotion terms closely: deferred interest is charged on the full original price.", "First work out what balance is left when the promotion period ends."]);

E("u6-online-banking-tradeoffs", 6, ["1.11","1.14","1.17"], 2, "var", varset([
  function(){ return mcq("Which option is an advantage of online banking?",
    {t:"Transfers and bill payments can be made at any hour from home", fb:"Correct: online banking runs around the clock without a branch visit."},
    [{t:"Cash deposits can be placed into a phone, directly and at any hour", fb:"Cash is deposited at an ATM or branch. A phone cannot take cash."},
     {t:"Accounts never need a password, so anyone can sign in", fb:"Online accounts always need secure sign in details."},
     {t:"Fees are waived on every account at the bank, always", fb:"Going online does not remove account fees."}],
    "Online banking allows <b>transfers and bill payments at any hour from home</b>.", {}); },
  function(){ return mcq("Which option is a disadvantage of online banking?",
    {t:"It depends on internet access, so an outage or a rural dead zone can block banking", fb:"Correct: no connection means no online banking at that moment."},
    [{t:"Balances can only be checked once a month, on one set day each month, and no more often", fb:"Balances can be checked any time online, as often as needed."},
     {t:"Every transfer takes five business days, however small the amount sent", fb:"Many online transfers are instant or next day, not five days."},
     {t:"Paper statements are mailed every single week, wanted or not", fb:"Online banking usually replaces weekly paper with e-statements on request."}],
    "A real disadvantage is the <b>dependence on internet access</b>, so outages can block banking.", {}); },
  function(){ return mcq("Ruth wants to lower the risk of someone signing in to her online banking. Which action helps most?",
    {t:"Turn on two step verification and set up sign in alerts", fb:"Correct: a second check plus alerts make stolen passwords much less useful."},
    [{t:"Use her birthdate as her password", fb:"Birthdates are easy to guess and appear in many records."},
     {t:"Save the password in an unlocked notes file", fb:"Anyone with the phone can read an unlocked password file."},
     {t:"Share her sign in with her son so he can watch the account", fb:"Sharing sign in details gives another person full access."}],
    "Two step verification plus sign in alerts <b>lower the risk of someone signing in</b> to her banking.", {}); },
  function(){ return mcq("Which of these is a service a customer can arrange through online banking?",
    {t:"Opening a savings account and setting up automatic transfers into it", fb:"Correct: accounts can be opened and transfers scheduled online."},
    [{t:"Renting a safety deposit box in the vault of the bank branch downtown", fb:"A box rental needs a branch visit and a physical vault."},
     {t:"Having a will witnessed by a notary at a law office", fb:"That is a legal service arranged in person, not an online banking task."},
     {t:"Exchanging foreign coins for Canadian bills at a bank counter", fb:"Coin exchange happens at a branch counter."}],
    "Through online banking a customer can <b>open a savings account and set up automatic transfers</b>.", {}); },
  function(){ return mcq("A bank app shows a notice that it will be down for maintenance from 2 AM to 4 AM on Sunday. Which statement about online banking does this illustrate?",
    {t:"Online banking is convenient but is unavailable during outages and maintenance", fb:"Correct: scheduled downtime is a real limit of online services."},
    [{t:"Online banking charges double fees at night, on every account, without exception", fb:"The notice says nothing about fees changing at night."},
     {t:"Branches close whenever the app is down, for as long as it lasts", fb:"Branch hours are separate from app maintenance."},
     {t:"Accounts lose interest during maintenance, every single time it happens", fb:"Interest keeps accruing. Only access is paused."}],
    "The notice illustrates that online banking is <b>convenient but unavailable during outages and maintenance</b>.", {}); }
]), ["Weigh each option as a plus or a minus of banking on a screen instead of in a branch.", "Start by checking whether the option depends on internet access, passwords or branch only services."]);

E("u6-credit-strategies", 6, ["1.20"], 2, "var", varset([
  function(){ return mcq("Alex carries balances on two cards, one at 24% and one at 12%. Extra money is available each month. Which strategy reduces the total interest fastest?",
    {t:"Pay the minimum on both, and put every extra dollar on the 24% card", fb:"Correct: clearing the highest rate balance first cuts the most interest."},
    [{t:"Pay the minimum on both, and put every extra dollar on the 12% card", fb:"The cheaper balance grows slower, so the expensive one keeps costing more."},
     {t:"Stop paying both cards until savings grow", fb:"Missed payments add fees and hurt the credit record."},
     {t:"Open a third card and move both balances to it at 26%", fb:"Moving debt to a higher rate raises the interest cost."}],
    "Interest falls fastest when extra payments target the <b>highest rate balance first</b>, while minimums keep both accounts current.", {}); },
  function(){ return mcq("Which action is a sound strategy before a large planned purchase on credit?",
    {t:"Compare offers, negotiate the rate, and plan the payment timeline so the balance clears quickly", fb:"Correct: shopping for terms and planning payments keeps credit costs low."},
    [{t:"Apply for the first offer received in the mail, without comparing any other offers", fb:"A mailed offer is rarely the cheapest, and no comparison was made."},
     {t:"Plan to pay only the minimum each month, and let the interest build up over time", fb:"Minimum payments stretch the debt and add large interest costs."},
     {t:"Time the purchase so the balance sits through a full promotion with deferred interest at the end", fb:"Deferred interest can charge the full period if any balance remains."}],
    "A sound strategy is to <b>compare offers, negotiate the rate, and plan the payment timeline</b> before buying.", {}); },
  function(){ return mcq("Priya has paid her card on time for two years and her rate is 21%. She calls the issuer. Which request is a reasonable credit strategy?",
    {t:"Ask for a lower interest rate based on her on time payment history", fb:"Correct: issuers often lower rates for customers with strong payment records who ask."},
    [{t:"Ask the issuer to remove all past interest and fees as a favour to her", fb:"Issuers rarely erase charges wholesale. A rate request is the realistic ask."},
     {t:"Ask to raise her limit so she can spend more freely", fb:"A higher limit invites more spending rather than better credit use."},
     {t:"Ask to skip payments for three months with no cost", fb:"Skipped payments still accrue interest and can harm her record."}],
    "Asking for a <b>lower rate based on an on time payment history</b> is a reasonable negotiation strategy.", {}); },
  function(){ return mcq("Which habit helps a borrower use a credit card effectively?",
    {t:"Pay the full balance by the due date so no interest is charged", fb:"Correct: paying in full inside the grace period avoids interest entirely."},
    [{t:"Use the card up to its limit every month, in full, every time", fb:"Maxing out a card raises costs and can lower a credit score."},
     {t:"Pay bills a few days after the due date each month, as a habit", fb:"Late payments bring fees and interest and harm the credit record."},
     {t:"Take cash advances for everyday spending each and every week", fb:"Cash advances usually carry high rates with no grace period."}],
    "Paying the <b>full balance by the due date</b> means the card is used with no interest charged.", {}); },
  function(){ return mcq("Sam owes $900 and gets a $300 tax refund. Which use of the refund best supports his plan to reduce debt?",
    {t:"Put the full $300 on the card balance right away", fb:"Correct: a lump sum on the balance cuts interest from that day forward."},
    [{t:"Hold the cash and keep paying the minimum", fb:"The balance keeps accruing interest while the cash sits idle."},
     {t:"Spend the refund on a sale and keep the card balance", fb:"New spending adds to the debt the plan is trying to reduce."},
     {t:"Use the refund as a deposit on a new store card purchase", fb:"A new purchase on another card grows total debt."}],
    "Putting the refund <b>on the card balance right away</b> reduces the balance and the interest charged on it.", {}); }
]), ["Good credit strategies lower the rate, shorten the timeline, or shrink the balance sooner.", "Start by checking what each option does to the total interest paid over time."]);


E("u6-card-charges-choices", 6, ["1.15","1.16"], 2, "gen", function(){
  var who=u6names();
  if(ri(0,1)===0){
    var otherN=ri(2,6), ownN=ri(2,8);
    var otherFee=pick([2,2.5,3,3.5]), surcharge=pick([1,1.5,2]), ownFee=pick([0.5,1,1.25]);
    var total=otherN*(otherFee+surcharge)+ownN*ownFee;
    var noSurcharge=otherN*otherFee+ownN*ownFee;
    var noOwn=otherN*(otherFee+surcharge);
    var surchargeOnce=otherN*otherFee+surcharge+ownN*ownFee;
    return mcq("In one month, "+who+" makes "+otherN+" withdrawals at other banks ATMs and "+ownN+" at the home bank ATM. Each outside withdrawal costs a "+u6d(otherFee)+" fee plus a "+u6d(surcharge)+" surcharge, and each home withdrawal costs "+u6d(ownFee)+". What are the total ATM charges?",
      {t:u6d(total), fb:"Correct: outside withdrawals carry both the fee and the surcharge, every time."},
      [{t:u6d(noSurcharge), fb:"That leaves out the surcharge on each outside withdrawal."},
       {t:u6d(otherN*otherFee), fb:"That counts only the outside fees. It leaves out the surcharges and the home bank charges."},
       {t:u6d(total+ownN*(otherFee+surcharge)), fb:"That charges the outside fee and surcharge on the home bank withdrawals as well. Home withdrawals carry only the home fee."}],
      "Price each group of withdrawals. \\[ \\begin{aligned} \\text{Outside} &= "+otherN+" \\times ("+fmtF(otherFee,2)+" + "+fmtF(surcharge,2)+") = "+fmtF(otherN*(otherFee+surcharge),2)+" \\\\ \\text{Home} &= "+ownN+" \\times "+fmtF(ownFee,2)+" = "+fmtF(ownN*ownFee,2)+" \\\\ \\text{Total} &= "+fmtF(total,2)+" \\end{aligned} \\] The total ATM charges are <b>"+u6d(total)+"</b>.",
      {mode:"atm", otherN:otherN, ownN:ownN});
  }
  var freeN=pick([10,15,20]);
  var extra=ri(3,15), count=freeN+extra;
  var feePer=pick([0.5,0.75,1,1.25]);
  var planFee=pick([4,6,10]);
  var totalD=extra*feePer, allCharged=count*feePer;
  return mcq(who+" has a debit plan with "+freeN+" free debit purchases per month, then "+u6d(feePer)+" for each extra purchase. This month "+who+" makes "+count+" debit purchases. How much are the debit purchase fees?",
    {t:u6d(totalD), fb:"Correct: only the "+extra+" purchases past the free ones are charged."},
    [{t:u6d(allCharged), fb:"That charges for every purchase, including the "+freeN+" free ones."},
     {t:u6d(feePer), fb:"That is the fee for a single extra purchase. There are "+extra+" extra purchases."},
     {t:u6d(allCharged+planFee), fb:"That charges for the free purchases as well and adds a monthly account fee. The question asks for the extra purchase fees only."}],
    "Only purchases past the free count are charged. \\[ \\begin{aligned} \\text{Extra purchases} &= "+count+" - "+freeN+" = "+extra+" \\\\ \\text{Fees} &= "+extra+" \\times "+fmtF(feePer,2)+" = "+fmtF(totalD,2)+" \\end{aligned} \\] The debit purchase fees are <b>"+u6d(totalD)+"</b>. Fees like these are one cost to weigh when paying by debit.",
    {mode:"debit", freeN:freeN, count:count, feePer:feePer});
}, ["Split the transactions into the free ones and the charged ones, or into home and outside withdrawals.", "First work out how many transactions are actually charged a fee."]);

E("u6-card-vs-loan-cost", 6, ["1.18","1.22"], 2, "gen", function(){
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

E("u6-simple-interest-fv", 6, ["1.7","1.8"], 2, "gen", function(){
  var P=pick([600,800,1000,1200,1500,2000,2500,3000]);
  var r=pick([2,3,4,5,6]);
  var t=ri(2,5);
  var I=P*r/100*t, FV=P+I, oneYrFV=P+P*r/100, doubleFV=P+2*I;
  return mcq(u6names()+" deposits "+u6d(P)+" at a simple interest rate of "+fmt(r)+"% per year for "+t+" years. What is the final value of the deposit?",
    {t:u6d(FV), fb:"Correct: the final value is the principal plus the interest earned."},
    [{t:u6d(I), fb:"That is the interest only. The final value also includes the original principal."},
     {t:u6d(oneYrFV), fb:"That is the value after one year. The deposit runs for "+t+" years."},
     {t:u6d(doubleFV), fb:"That doubles the interest. Simple interest grows by the same amount each year, with no doubling."}],
    "Use \\(FV = P + I\\) after finding the interest. \\[ \\begin{aligned} I &= "+fmt(P)+" \\times "+fmt(r/100,4)+" \\times "+t+" = "+fmt(I)+" \\\\ FV &= "+fmt(P)+" + "+fmt(I)+" = "+fmt(FV)+" \\end{aligned} \\] The final value is <b>"+u6d(FV)+"</b>. Simple interest adds the same amount each year, unlike compound interest, which grows faster over time.",
    {P:P, r:r, t:t});
}, ["The final value is the principal plus the interest, so find the interest first.", "First compute I = Prt for the full term."]);

E("u6-compound-solve-periods", 6, ["1.9","1.10"], 3, "gen", function(){
  var P=pick([1000,1500,2000,2500,3000,4000,5000]);
  var r=pick([3,3.5,4,4.5,5,5.5,6]);
  var n=pick([2,4,12]);
  var t=ri(1,5);
  var word={2:"semi-annually",4:"quarterly",12:"monthly"}[n];
  var FV=P*Math.pow(1+r/100/n,n*t);
  var earn=FV-P;
  var tol=Math.max(0.5,FV*0.005);
  var who=u6names();
  if(ri(0,1)===0){
    return numq(who+" invests "+u6d(P)+" at "+fmt(r)+"% per year, compounded "+word+", for "+t+" years. What is the future value, in dollars?",
      Math.round(FV*100)/100, tol,
      "Use \\(FV = P\\left(1 + \\frac{r}{n}\\right)^{nt}\\) with \\(n = "+n+"\\). \\[ \\begin{aligned} FV &= "+fmt(P)+"\\left(1 + \\frac{"+fmt(r/100,4)+"}{"+n+"}\\right)^{"+n+" \\times "+t+"} \\\\ &\\approx "+fmtF(FV,2)+" \\end{aligned} \\] The future value is about <b>"+u6d(FV)+"</b>.",
      {mode:"FV", P:P, r:r, n:n, t:t});
  }
  return numq(who+" invests "+u6d(P)+" at "+fmt(r)+"% per year, compounded "+word+", for "+t+" years. How much interest is earned, in dollars?",
    Math.round(earn*100)/100, tol,
    "Find the future value first, then subtract the principal. \\[ \\begin{aligned} FV &= "+fmt(P)+"\\left(1 + \\frac{"+fmt(r/100,4)+"}{"+n+"}\\right)^{"+n+" \\times "+t+"} \\approx "+fmtF(FV,2)+" \\\\ \\text{Interest} &= "+fmtF(FV,2)+" - "+fmt(P)+" \\approx "+fmtF(earn,2)+" \\end{aligned} \\] The interest earned is about <b>"+u6d(earn)+"</b>.",
    {mode:"earn", P:P, r:r, n:n, t:t});
}, ["Use the compound form with n periods per year, and divide the rate by n before building the power.", "First identify n from the compounding word: semi-annually, quarterly or monthly."]);

E("u6-credit-plan-savings", 6, ["1.19","1.20"], 3, "gen", function(){
  var P=pick([1000,1250,1500,2000,2500,3000]);
  var rs=pick([26,28,30]);
  var rl=pick([9,11,13]);
  var fl=pick([59,79,99]);
  var totS=P+P*rs/100, totL=P+P*rl/100+fl;
  var save=totS-totL;
  var item=u6goal();
  return numq(u6names()+" plans a purchase of "+u6d(P)+" for "+item+", repaid over one year. A store card charges "+fmt(rs)+"% annual interest and no fee. A bank loan charges "+fmt(rl)+"% simple interest for the year plus a "+u6d(fl)+" setup fee. Interest is charged on the full amount for the year. How much is saved by choosing the bank loan instead of the store card, in dollars?",
    Math.round(save*100)/100, 0.05,
    "Total each plan, then subtract. \\[ \\begin{aligned} \\text{Store card} &= "+fmt(P)+" + "+fmt(P)+" \\times "+fmt(rs/100)+" = "+fmtF(totS,2)+" \\\\ \\text{Bank loan} &= "+fmt(P)+" + "+fmt(P)+" \\times "+fmt(rl/100)+" + "+fmt(fl)+" = "+fmtF(totL,2)+" \\\\ \\text{Savings} &= "+fmtF(totS,2)+" - "+fmtF(totL,2)+" = "+fmtF(save,2)+" \\end{aligned} \\] Choosing the bank loan saves <b>"+u6d(save)+"</b>. Comparing total costs before borrowing is the key step in an informed credit decision.",
    {P:P, rs:rs, rl:rl, fl:fl});
}, ["Build the full one year cost of each plan, including fees, then compare the two totals.", "First compute the store card total: the price plus one year of interest."]);

E("u6-compound-growth-figure", 6, ["1.8","1.10"], 3, "gen", function(){
  var P=pick([2000,3000,4000,5000]);
  var r=pick([5,6,7,8]);
  var t=pick([8,10,12,15]);
  var FVs=P*(1+r/100*t), Is=P*r/100*t;
  var FVn=P*Math.pow(1+r/100/12,12*t);
  var FV1=P*Math.pow(1+r/100,t);
  var In=FVn-P, I1=FV1-P;
  var maxV=FVn;
  function bar(v){ return Math.max(14, Math.round(100*v/maxV)); }
  var fig='<svg width="320" height="180" viewBox="0 0 320 180">'
    +'<line x1="40" y1="140" x2="300" y2="140" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<rect x="70" y="'+(140-bar(FVs))+'" width="60" height="'+bar(FVs)+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<rect x="190" y="'+(140-bar(FVn))+'" width="60" height="'+bar(FVn)+'" fill="'+FIG_ACC+'" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<text x="100" y="'+(132-bar(FVs))+'" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">'+u6d(FVs)+'</text>'
    +'<text x="220" y="'+(132-bar(FVn))+'" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">'+u6d(FVn)+'</text>'
    +'<text x="100" y="158" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">simple</text>'
    +'<text x="220" y="158" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">compound, monthly</text>'
    +'<text x="160" y="174" font-size="11" fill="'+FIG_INK+'" text-anchor="middle">Future value of '+u6d(P)+' at '+fmt(r)+'% over '+t+' years</text></svg>';
  var q=mcq("The chart compares two ways of investing "+u6d(P)+" at "+fmt(r)+"% per year for "+t+" years: simple interest, and compound interest compounded monthly. How much interest does the monthly compounding investment earn?",
    {t:u6d(In), fb:"Correct: the monthly compounding future value minus the principal gives "+u6d(In)+"."},
    [{t:u6d(Is), fb:"That is the simple interest amount, shown by the shorter bar."},
     {t:u6d(I1), fb:"That is the interest with annual compounding. Monthly compounding earns a little more."},
     {t:u6d(FVn), fb:"That is the full future value. Interest earned is the future value minus the principal."}],
    "Read the monthly compounding bar, then subtract the principal. \\[ \\begin{aligned} FV &= "+fmt(P)+"\\left(1 + \\frac{"+fmt(r/100,4)+"}{12}\\right)^{12 \\times "+t+"} \\approx "+fmtF(FVn,2)+" \\\\ \\text{Interest} &= "+fmtF(FVn,2)+" - "+fmt(P)+" \\approx "+fmtF(In,2)+" \\end{aligned} \\] The interest earned is about <b>"+u6d(In)+"</b>. Over long periods, compounding pulls well ahead of simple interest, and more frequent compounding adds a further gain.",
    {P:P, r:r, t:t});
  q.figure=fig;
  return q;
}, ["The taller bar is the compound result. Interest earned is a future value minus the starting principal.", "First find the monthly compounding future value with n equal to 12."]);

E("u6-card-payoff-months", 6, ["1.21","1.22"], 3, "gen", function(){
  var B=1150, id=20, pm=100;
  function ok(b,i,p){
    var net=p-i; if(net<=25) return false;
    var months=Math.ceil(b/net);
    var d1=Math.ceil(b/p), d2=Math.ceil(b/(p+i)), d3=Math.round(b/net);
    var vals=[months,d1,d2,d3];
    var seen={}; for(var k=0;k<4;k++){ if(seen[vals[k]]) return false; seen[vals[k]]=1; }
    return true;
  }
  var attempt=0;
  while(!ok(B,id,pm) && attempt<80){
    attempt++;
    B=pick([600,700,800,900,1000,1100,1150,1200,1300,1400,1500,1600,1800,2000,2200,2400]);
    id=pick([10,15,20,25,30]);
    pm=pick([75,100,125,150]);
  }
  if(!ok(B,id,pm)){ B=1150; id=20; pm=100; }
  var net=pm-id, months=Math.ceil(B/net);
  var who=u6names();
  var frame=ri(0,1), mode=ri(0,2);
  var setupA=who+" owes "+u6d(B)+" on a credit card. The card charges a fixed interest amount of "+u6d(id)+" each month, and "+who+" pays "+u6d(pm)+" at the end of each month. No new purchases are made. ";
  var setupB=who+" has a credit card balance of "+u6d(B)+". A fixed interest charge of "+u6d(id)+" is added each month. Monthly payments of "+u6d(pm)+" are made at the end of each month, and the card is not used for anything else. ";
  var setup=frame===0?setupA:setupB;
  var redSol="Each month the balance falls by the payment minus the interest charge. \\[ \\begin{aligned} \\text{Monthly reduction} &= "+fmt(pm)+" - "+fmt(id)+" = "+fmt(net)+" \\\\ \\text{Months} &= \\frac{"+fmt(B)+"}{"+fmt(net)+"} \\approx "+fmtF(B/net,2)+" \\end{aligned} \\] Rounding up to whole months, the balance is paid off in <b>"+months+" months</b>. ";
  if(mode===0){
    var dIgn=Math.ceil(B/pm), dAdd=Math.ceil(B/(pm+id)), dRound=Math.round(B/net);
    return mcq(setup+"In how many months is the balance paid off?",
      {t:months+" months", fb:"Correct: each month the balance falls by "+u6d(net)+", and the final partial month still counts as a month."},
      [{t:dIgn+" months", fb:"That divides by the full payment and forgets the monthly interest charge."},
       {t:dAdd+" months", fb:"That adds the interest to the payment. Interest reduces what the payment clears, so subtract it."},
       {t:dRound+" months", fb:"That rounds the month count to the nearest whole month. A part month still needs a payment, so round up."}],
      redSol+"Comparing cards by payoff time shows why a lower interest charge matters as much as the payment size.",
      {mode:"months", B:B, id:id, pm:pm});
  }
  if(mode===1){
    var totInt=months*id;
    var dForget=(months-1)*id;
    var dRoundI=Math.round(B/net)*id;
    var dRoundFb="That uses the month count rounded to the nearest month. A part month still carries an interest charge, so round up first.";
    if(dRoundI===dForget){ dRoundI=(months+1)*id; dRoundFb="That charges interest for one month too many. Count the months until the balance clears, no further."; }
    return mcq(setup+"How much interest is paid in total before the balance is cleared?",
      {t:u6d(totInt), fb:"Correct: the interest charge applies in every month until the balance clears."},
      [{t:u6d(dForget), fb:"That leaves out the interest charged in the final month. The charge applies in that month too."},
       {t:u6d(months*pm), fb:"That is the total of the monthly payments, not the interest portion of them."},
       {t:u6d(dRoundI), fb:dRoundFb}],
      redSol+"Total interest is the monthly charge times the number of months. \\[ \\begin{aligned} \\text{Total interest} &= "+months+" \\times "+fmt(id)+" = "+fmt(totInt)+" \\end{aligned} \\] The total interest paid is <b>"+u6d(totInt)+"</b>.",
      {mode:"interest", B:B, id:id, pm:pm});
  }
  var lastBal=B-(months-1)*net;
  var lastPay=lastBal+id;
  var totPaid=(months-1)*pm+lastPay;
  var dFull=months*pm, dFullFb="That pays the full monthly payment in the final month as well. The final payment only needs to clear what is left.";
  if(dFull===totPaid){ dFull=totPaid+pm; dFullFb="That adds a whole extra monthly payment beyond the payoff point."; }
  return mcq(setup+"What is the total amount paid before the balance is cleared?",
    {t:u6d(totPaid), fb:"Correct: full payments run until the final month, when only the remaining balance plus that month interest is due."},
    [{t:u6d(dFull), fb:dFullFb},
     {t:u6d(B), fb:"That is the starting balance only. Interest is paid on top of it."},
     {t:u6d(totPaid-id), fb:"That leaves out the interest charged in the final month."}],
    redSol+"The final balance is cleared by a smaller last payment. \\[ \\begin{aligned} \\text{Balance before final month} &= "+fmt(B)+" - "+(months-1)+" \\times "+fmt(net)+" = "+fmt(lastBal)+" \\\\ \\text{Final payment} &= "+fmt(lastBal)+" + "+fmt(id)+" = "+fmt(lastPay)+" \\\\ \\text{Total paid} &= "+(months-1)+" \\times "+fmt(pm)+" + "+fmt(lastPay)+" = "+fmt(totPaid)+" \\end{aligned} \\] The total amount paid is <b>"+u6d(totPaid)+"</b>.",
    {mode:"paid", B:B, id:id, pm:pm});
}, ["Work out how much of each monthly payment actually reduces the balance after the interest charge.", "First subtract the monthly interest charge from the monthly payment."]);

E("u6-promo-vs-loan", 6, ["1.23","1.19"], 3, "gen", function(){
  var P=pick([900,1000,1200,1500,1800,2000,2400]);
  var rp=pick([26,28,30]);
  var fp=pick([0,99]);
  var rl=pick([8,10,12]);
  var fl=pick([59,89]);
  var promoTot=P+P*rp/100+fp, loanTot=P+P*rl/100+fl;
  var diff=promoTot-loanTot;
  var item=pick(["a sofa set","a refrigerator","a snow blower","a washer and dryer"]);
  var who=u6names();
  if(ri(0,1)===0){
    var halfTot=P+P*rp/200+fp;
    return mcq("A store sells "+item+" for "+u6d(P)+" on a promotion: no interest for 12 months if paid in full, but if any balance remains, interest at "+fmt(rp)+"% is charged on the full original price for the whole year"+(fp>0?", plus a "+u6d(fp)+" administration fee":"")+". "+who+" pays nothing during the year. What is the total owed at month 12?",
      {t:u6d(promoTot), fb:"Correct: the price plus deferred interest on the full price"+(fp>0?" plus the fee":"")+" gives "+u6d(promoTot)+"."},
      [{t:u6d(loanTot), fb:"That is the cost of a bank loan at "+fmt(rl)+"% plus its fee, not the promotion outcome."},
       {t:u6d(halfTot), fb:"That charges interest on half the price. Deferred interest is charged on the full original price."},
       {t:u6d(P*rp/100), fb:"That is the interest only. The price itself is still owed as well."}],
      "Deferred interest applies to the full price for the full year. \\[ \\begin{aligned} \\text{Interest} &= "+fmt(P)+" \\times "+fmt(rp/100)+" = "+fmtF(P*rp/100,2)+" \\\\ \\text{Total owed} &= "+fmt(P)+" + "+fmtF(P*rp/100,2)+(fp>0?" + "+fmt(fp):"")+" = "+fmtF(promoTot,2)+" \\end{aligned} \\] The total owed is <b>"+u6d(promoTot)+"</b>.",
      {mode:"promoTotal", P:P, rp:rp, fp:fp});
  }
  return mcq("For "+item+" priced at "+u6d(P)+", "+who+" compares two plans, each repaid over one year. The store promotion charges deferred interest at "+fmt(rp)+"% on the full price if any balance remains at month 12"+(fp>0?", plus a "+u6d(fp)+" fee":", with no fee")+", and "+who+" expects a balance to remain. A bank loan charges "+fmt(rl)+"% simple interest plus a "+u6d(fl)+" fee. By how much does the bank loan beat the promotion?",
    {t:u6d(diff), fb:"Correct: the promotion total minus the loan total is "+u6d(diff)+"."},
    [{t:u6d(promoTot), fb:"That is the full promotion total, not the gap between the two plans."},
     {t:u6d(loanTot), fb:"That is the full loan total, not the gap between the two plans."},
     {t:u6d(P*rp/100), fb:"That is the promotion interest only. Compare the full totals of both plans."}],
    "Build both totals, then subtract. \\[ \\begin{aligned} \\text{Promotion} &= "+fmt(P)+" + "+fmt(P)+" \\times "+fmt(rp/100)+(fp>0?" + "+fmt(fp):"")+" = "+fmtF(promoTot,2)+" \\\\ \\text{Loan} &= "+fmt(P)+" + "+fmt(P)+" \\times "+fmt(rl/100)+" + "+fmt(fl)+" = "+fmtF(loanTot,2)+" \\\\ \\text{Difference} &= "+fmtF(promoTot,2)+" - "+fmtF(loanTot,2)+" = "+fmtF(diff,2)+" \\end{aligned} \\] The bank loan beats the promotion by <b>"+u6d(diff)+"</b>.",
    {mode:"diff", P:P, rp:rp, fp:fp, rl:rl, fl:fl});
}, ["Cost both plans in full, including deferred interest on the full price and all fees, before comparing.", "First compute the promotion total exactly as its terms state it."]);

/* ===== Prior knowledge tranche (Nov 15, 2026): Clusters 9, 10 and 12 (percent fluency, powers of ten, applying percent change). Cluster 11 (banking services) contributes no entries: its map entry names no assessable prerequisite, and the gap is recorded in the tranche spec. Borrowed verbatim from Mathematics 8 (u5-percent-of-number, u5-find-the-whole), Mathematics 9 (u3-evaluate-single-power, u3-product-law, u3-two-laws-evaluate) and Mathematics 1202 (u4-commission-plus-base, u1-percent-change, u1-cr-percent-change); feeder helper copies ride in bank-helpers.js. ===== */
E("u6-pk-percent-of-amount", 6, ["1.7"], 1, "gen", function () {
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

E("u6-pk-commission", 6, ["1.7"],2,"gen",function(){
 var base=ri(1200,2400), sales=ri(40,300)*100, rate=pick([3,4,5,6,8,10]);
 var comm=u4R(sales*rate/100), gross=u4R(base+comm);
 var ds=u4Dist(gross,[{v:comm,fb:"That is the commission only. Add the base salary to get gross pay."},
  {v:u4R(base+sales*2*rate/100),fb:"That doubles the commission rate. Use the single rate stated in the stem."},
  {v:u4R(base+sales),fb:"That adds the full sales amount. The worker earns only the stated percent of sales."}],u4M,2.50);
 return mcq("A salesperson earns a base salary of "+u4M(base)+" per month plus commission at "+rate+"% of sales. In one month the salesperson sells "+u4M(sales)+" of furniture. What is the gross pay for the month?",
  {t:u4M(gross),fb:"Yes: base salary plus the percent of sales."},ds,
  "Apply the commission formula, then add the base. \\[ \\begin{aligned} \\text{Commission} &= "+fmt(rate)+"\\% \\times "+fmtF(sales,2)+" = "+fmtF(comm,2)+" \\\\ \\text{Gross pay} &= "+fmtF(base,2)+" + "+fmtF(comm,2)+" = "+fmtF(gross,2)+" \\end{aligned} \\] The gross pay is <b>"+u4M(gross)+"</b>.",
  {base:base,sales:sales,rate:rate});
},["Gross pay here has two parts: a fixed base and a percent of sales.","Start with the commission: the rate times the sales."]);

E("u6-pk-evaluate-power", 6, ["1.9"], 1, "gen", function () {
  var tuples = [];
  for (var pb = 2; pb <= 12; pb++) for (var pe = 2; pe <= 4; pe++) tuples.push([pb, pe, 1]);
  for (var qb = 2; qb <= 6; qb++) tuples.push([qb, 5, 1]);
  for (var nb2 = 2; nb2 <= 9; nb2++) for (var ne = 2; ne <= 3; ne++) tuples.push([nb2, ne, -1]);
  var tt = pick(tuples), b = tt[0], e = tt[1], mode = tt[2] < 0 ? "neg" : "pos";
  var val, shown;
  if (mode === "neg") { val = Math.pow(-b, e); shown = "(-" + b + ")^{" + e + "}"; }
  else { val = Math.pow(b, e); shown = b + "^{" + e + "}"; }
  var base = (mode === "neg") ? -b : b;
  var sol = "Expand as repeated multiplication and multiply step by step: \\[ \\begin{aligned} " + shown + " &= " + fmt(val) + " \\end{aligned} \\] So the value is <b>" + fmt(val) + "</b>.";
  return numq("Evaluate \\(" + shown + "\\).", val, 0, sol, { mode: "evaluate-single", base: base, e: e });
}, ["Expand the power as repeated multiplication first.", "Multiply the base by itself, using the exponent as the count."]);

E("u6-pk-product-law", 6, ["1.9"], 1, "gen", function () {
  var a = ri(2, 9), m = ri(2, 6), n = ri(1, 6);
  if (m === 2 && n === 2) n = 3;
  var ds = u3PowDist(a, m + n, [
    { v: m * n, fb: "That multiplies the exponents. The product law adds them." },
    { v: m + n + 1, fb: "That adds one extra. Add the two exponents only." },
    { v: m + n - 1, fb: "That is one too small. Add the two exponents." },
    { v: Math.abs(m - n), fb: "That subtracts the exponents. The product law adds them." },
    { v: m * n + 1, fb: "That multiplies and adds one. Add the exponents instead." }
  ]);
  return mcq("Write \\(" + a + "^{" + m + "}\\times " + a + "^{" + n + "}\\) as a single power.",
    { t: "\\(" + a + "^{" + (m + n) + "}\\)", fb: "Correct. Same base, so the exponents add." }, ds,
    "The bases match, so add the exponents: \\[ \\begin{aligned} " + a + "^{" + m + "}\\times " + a + "^{" + n + "} &= " + a + "^{" + m + "+" + n + "} \\\\ &= " + a + "^{" + (m + n) + "} \\end{aligned} \\] So the single power is <b>\\(" + a + "^{" + (m + n) + "}\\)</b>.",
    { mode: "product-law", a: a, m: m, n: n });
}, ["Check whether the bases match. Matching bases use the product law.", "Add the two exponents and keep the same base."]);

E("u6-pk-two-laws", 6, ["1.9"], 1, "gen", function () {
  var mode = pick(["prod", "quot", "powpow"]);
  var a, expr, val, steps;
  if (mode === "prod") {
    a = ri(2, 6); var m = ri(2, 3), n = ri(2, 3);
    val = Math.pow(a, m + n);
    expr = a + "^{" + m + "}\\times " + a + "^{" + n + "}";
    steps = a + "^{" + m + "}\\times " + a + "^{" + n + "} &= " + a + "^{" + (m + n) + "} \\\\ &= " + fmt(val);
  } else if (mode === "quot") {
    a = ri(2, 7); var n2 = ri(1, 2), m2 = n2 + ri(3, 4);
    val = Math.pow(a, m2 - n2);
    expr = a + "^{" + m2 + "}\\div " + a + "^{" + n2 + "}";
    steps = a + "^{" + m2 + "}\\div " + a + "^{" + n2 + "} &= " + a + "^{" + (m2 - n2) + "} \\\\ &= " + fmt(val);
  } else {
    a = ri(2, 5); var m3 = ri(2, 3), n3 = 2;
    val = Math.pow(a, m3 * n3);
    expr = "(" + a + "^{" + m3 + "})^{" + n3 + "}";
    steps = "(" + a + "^{" + m3 + "})^{" + n3 + "} &= " + a + "^{" + (m3 * n3) + "} \\\\ &= " + fmt(val);
  }
  return numq("Evaluate \\(" + expr + "\\) by first writing it as a single power.", val, 0,
    "Apply the exponent law first, then evaluate: \\[ \\begin{aligned} " + steps + " \\end{aligned} \\] So the value is <b>" + fmt(val) + "</b>.",
    { mode: "two-laws-" + mode, a: a });
}, ["Use an exponent law to write the expression as one power first.", "Combine the exponents with the matching law, then evaluate that power."]);

E("u6-pk-percent-change", 6, ["1.22"], 2, "gen", function(){
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

E("u6-pk-percent-change-cr", 6, ["1.22"], 2, "gen", function(){
  var ctxs=["The price of a cord of firewood","The monthly rent on a two bedroom apartment","The price of a snowmobile jacket","A weekly paycheque amount","The price of a litre of home heating oil, in dollars","The cost of a semester parking pass"];
  var cx=pick(ctxs);
  var O=pick([80,100,120,150,160,200,240,250,300,320,400,500,600,750,800,1000]);
  var p=pick([10,15,20,25,30,40,50,60]); var inc=Math.random()<0.5;
  var N=u1R2(inc?O*(1+p/100):O*(1-p/100)); var diff=u1R2(Math.abs(N-O));
  return numq(cx+" changed from "+u1Dol(O)+" to "+u1Dol(N)+". Find the percent "+(inc?"increase":"decrease")+". Show your work.",
    p, 0.6,
    "\\[ \\begin{aligned} \\text{Change} &= |"+fmtF(N,2)+" - "+fmtF(O,2)+"| = "+fmtF(diff,2)+" \\\\ \\text{Percent change} &= \\frac{"+fmtF(diff,2)+"}{"+fmtF(O,2)+"} \\times 100 = "+fmt(p)+"\\% \\end{aligned} \\] The answer is <b>"+fmt(p)+"%</b>.",
    {O:O,N:N,inc:inc?1:0});
}, ["Percent change compares the change with the original amount.", "Start by finding the change, then divide it by the original amount."]);

E("u6-pk-find-the-whole", 6, ["1.22"], 2, "gen", function () {
  var pool = [[25, 60], [20, 80], [30, 90], [40, 150], [50, 70], [75, 120], [80, 200], [10, 240], [60, 300], [90, 400], [15, 200], [35, 260], [12, 250], [16, 150], [18, 200], [22, 150], [28, 250], [32, 200], [38, 150], [42, 200], [48, 250], [52, 200], [56, 150], [64, 200], [72, 250], [84, 150], [88, 200], [45, 180], [65, 140], [85, 220], [55, 160], [95, 300]];
  var pr = pick(pool), p = pr[0], W = pr[1], part = W * p / 100;
  var ctxs = [
    { q: part + " students is " + p + "% of the students in a school. How many students are in the school?", unit: "students" },
    { q: "A team scored " + part + " points, which is " + p + "% of the points it needs for a banner. How many points does the team need in total?", unit: "points" },
    { q: "After a morning sale, " + part + " tickets remained unsold, and that is " + p + "% of the tickets printed. How many tickets were printed?", unit: "tickets" }
  ];
  var cx = pick(ctxs);
  var sol = "The part and its percent give the whole when the part is divided by the percent as a decimal: \\[ \\begin{aligned} \\text{whole} &= " + part + " \\div " + fmt(p / 100, 2) + " \\\\ &= " + W + " \\end{aligned} \\] So the whole is <b>" + W + " " + cx.unit + "</b>.";
  return numq(cx.q, W, 0.01, sol, { mode: "find-whole", p: p, part: part });
}, ["The given amount is only the named percent of the whole, so the whole is larger.", "First write the percent as a decimal, then divide the part by that decimal."]);

/* PK tranche metadata pass for Unit 6. The tranche's own entries are flagged here.  */
var PKT_U6_FOR=["1.7","1.8","1.9","1.10","1.11","1.12","1.13","1.14","1.15","1.16","1.17","1.18","1.19","1.20","1.21","1.22","1.23"];
var PKT_U6={
 "u6-pk-percent-of-amount":{src:"math-8:6.1",group:"percent-of-amount"},
 "u6-pk-commission":{src:"math-1202:2.3",group:"formula-use"},
 "u6-pk-evaluate-power":{src:"math-9:3.10",group:"powers"},
 "u6-pk-product-law":{src:"math-9:3.11",group:"powers"},
 "u6-pk-two-laws":{src:"math-9:3.12",group:"powers"},
 "u6-pk-percent-change":{src:"math-1202:1.4",group:"percent-change"},
 "u6-pk-percent-change-cr":{src:"math-1202:1.4",group:"percent-change"},
 "u6-pk-find-the-whole":{src:"math-8:6.1",group:"percent-of-amount"}
};
BANK.forEach(function(e){var t=PKT_U6[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U6_FOR.slice();e.pkGroup=t.group;}});
