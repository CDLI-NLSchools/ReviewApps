// Math 9 Unit 9 Probability and Statistics question bank
// Cut verbatim from the standalone bank source
// (math-9-review/bank-src.js, lines 4981 to 5766).
// CRMARKS: u9-combined-decision=3
// CRMARKS: u9-collection-problem=3
// CRMARKS: u9-collection-biggest-threat=3
// CRMARKS: u9-match-influence=3
// CRMARKS: u9-generalization-critique=2
// CRMARKS: u9-rubric-missing-part=2
// CRMARKS: u9-plan-element=2
E("u9-prob-in-media", 9, ["12.1"], 1, "var", varset([
  function(){
    return mcq("Four short items appear in a school newsletter. Which item uses probability?",
      {t:"There is a 70% chance of snow for the outdoor skating party on Friday", fb:"Right: a percent chance states how likely the snow is, which is probability in use."},
      [{t:"The skating party will start at noon on Friday in the school gym lobby", fb:"That item gives a time and a place, with no statement about how likely anything is."},
       {t:"Last winter the school held three skating parties for students and staff", fb:"That item reports a count from the past, with no statement about chance."},
       {t:"Students voted skating as their favourite winter activity this school year", fb:"That item reports a vote result, with no statement about how likely an event is."}],
      "Probability is used when a statement gives how likely an event is. The item that uses probability is <b>the 70% chance of snow for the skating party</b>.",
      {mode:"media-weather"});
  },
  function(){
    return mcq("Four short items appear on a sports page. Which item uses probability?",
      {t:"Forecasters give the home team a 3 in 5 chance of winning on Saturday", fb:"Right: a 3 in 5 chance states how likely a win is, which is probability in use."},
      [{t:"The home team scored two late goals to win the game on Saturday", fb:"That item reports what already happened, with no statement about chance."},
       {t:"Tickets for the game on Saturday cost eight dollars at the door", fb:"That item gives a price, with no statement about how likely anything is."},
       {t:"The team will practise on Tuesday and Thursday evenings this week", fb:"That item gives a schedule, with no statement about how likely an event is."}],
      "Probability is used when a statement gives how likely an event is. The item that uses probability is <b>the 3 in 5 chance of winning on Saturday</b>.",
      {mode:"media-sports"});
  },
  function(){
    return mcq("Four short items appear on a clinic poster board. Which item uses probability?",
      {t:"A health poster says about 1 in 4 teens will catch a cold this winter", fb:"Right: 1 in 4 states how likely catching a cold is, which is probability in use."},
      [{t:"The clinic is open on weekdays from nine in the morning until five", fb:"That item gives opening hours, with no statement about how likely anything is."},
       {t:"Washing hands with soap helps remove germs picked up during the day", fb:"That item gives health advice, with no statement about chance."},
       {t:"Two nurses and one doctor work at the clinic on most weekdays in town", fb:"That item reports a staffing count, with no statement about how likely an event is."}],
      "Probability is used when a statement gives how likely an event is. The item that uses probability is <b>about 1 in 4 teens catching a cold this winter</b>.",
      {mode:"media-health"});
  },
  function(){
    return mcq("Four short items appear in a student council report. Which item uses probability?",
      {t:"A poll gives one candidate a 55% chance of winning the council vote", fb:"Right: a 55% chance states how likely a win is, which is probability in use."},
      [{t:"Voting for student council will take place in the gym at lunch time", fb:"That item gives a place and a time, with no statement about chance."},
       {t:"Three candidates are running for president of the student council", fb:"That item gives a count of candidates, with no statement about how likely anything is."},
       {t:"Last year the council raised money with a bake sale in the fall", fb:"That item reports a past event, with no statement about how likely an event is."}],
      "Probability is used when a statement gives how likely an event is. The item that uses probability is <b>the 55% chance of winning the council vote</b>.",
      {mode:"media-election"});
  },
  function(){
    return mcq("Four short items appear on signs at a school fair. Which item uses probability?",
      {t:"A game sign says players have a 1 in 6 chance of winning a prize", fb:"Right: a 1 in 6 chance states how likely a win is, which is probability in use."},
      [{t:"The ring toss game costs two dollars for three tries at the fair", fb:"That sign gives a price, with no statement about how likely anything is."},
       {t:"Prizes for the games are kept on the top shelf of the booth", fb:"That sign gives a location, with no statement about chance."},
       {t:"The school fair opens at six in the evening and closes at nine", fb:"That sign gives opening hours, with no statement about how likely an event is."}],
      "Probability is used when a statement gives how likely an event is. The item that uses probability is <b>the 1 in 6 chance of winning a prize</b>.",
      {mode:"media-fair"});
  },
  function(){
    return mcq("Four short items appear in a community radio report. Which item uses probability?",
      {t:"The report says there is a 40% chance of rain for the festival weekend", fb:"Right: a 40% chance states how likely rain is, which is probability in use."},
      [{t:"The harbour festival will run from Friday evening until Sunday night", fb:"That item gives dates, with no statement about how likely anything is."},
       {t:"Last summer forty boats took part in the harbour festival boat parade", fb:"That item reports a count from the past, with no statement about chance."},
       {t:"Festival tickets can be bought at the town office during the week", fb:"That item tells where to buy tickets, with no statement about how likely an event is."}],
      "Probability is used when a statement gives how likely an event is. The item that uses probability is <b>the 40% chance of rain for the festival weekend</b>.",
      {mode:"media-festival"});
  }
]), ["Probability shows up as a chance, an odds statement or a percent chance that something will happen.", "Scan the four items for words like chance, in 4, or percent, tied to a future event."]);

E("u9-assumption-limit", 9, ["12.2"], 1, "var", varset([
  function(){
    return mcq("A student says the probability of heads on a coin toss is \\(\\frac{1}{2}\\). Which option states the assumption behind this probability and its limitation?",
      {t:"It assumes the coin and the toss are fair; it fails if the coin is bent or tossed unevenly", fb:"Right: equal chances need a fair coin, and damage or an uneven toss breaks that assumption."},
      [{t:"It assumes heads came up half the time last week; it fails if the coin is tossed only a few times", fb:"Last week results describe experimental probability, but the stated value comes from equal outcomes."},
       {t:"It assumes the student wants heads to come up; it fails if the student hopes for tails instead", fb:"Wanting an outcome is a personal feeling, but the stated value comes from the two equal sides."},
       {t:"It assumes the coin has landed heads many times; it fails if the coin is fair and lands evenly", fb:"A fair coin supports the value rather than limiting it, and past landings are not the assumption."}],
      "The value \\(\\frac{1}{2}\\) rests on equally likely outcomes, so it assumes a fair coin and a fair toss. The correct statement is <b>it assumes the coin and the toss are fair; it fails if the coin is bent or tossed unevenly</b>.",
      {mode:"assume-coin"});
  },
  function(){
    return mcq("A game sheet says the probability of rolling a 6 on a die is \\(\\frac{1}{6}\\). Which option states the assumption behind this probability and its limitation?",
      {t:"It assumes all six faces are equally likely; it fails if the die is chipped or weighted", fb:"Right: the value counts six equal faces, and damage or weighting makes the faces unequal."},
      [{t:"It assumes a 6 came up once in the last six rolls; it fails if the next roll is also a 6", fb:"Recent rolls describe experimental results, but the stated value comes from counting equal faces."},
       {t:"It assumes the player feels lucky about rolling a 6; it fails if the player feels unlucky", fb:"A feeling is subjective judgement, but the stated value comes from the six equal faces."},
       {t:"It assumes the die is rolled on a hard table top; it fails if the die is rolled on carpet", fb:"The rolling surface does not set the value; equal faces do, and damage is the real limit."}],
      "The value \\(\\frac{1}{6}\\) rests on six equally likely faces, so it assumes a fair die. The correct statement is <b>it assumes all six faces are equally likely; it fails if the die is chipped or weighted</b>.",
      {mode:"assume-die"});
  },
  function(){
    return mcq("A poll of 400 voters says a mayor has a 52% chance of winning the town election. Which option states the assumption behind this probability and its limitation?",
      {t:"It assumes the voters polled represent all voters; it fails if whole groups were left out", fb:"Right: a poll speaks for everyone only when the sample matches the whole voting population."},
      [{t:"It assumes every voter answered the poll; it fails if the winner gets under half the votes", fb:"Only 400 voters were polled, so the claim rests on that sample standing for the rest."},
       {t:"It assumes the mayor is the strongest candidate; it fails if another candidate campaigns harder", fb:"Candidate strength is a judgement call, but the stated chance comes from the poll sample."},
       {t:"It assumes the election uses a fair coin to break ties; it fails if no tie happens in the vote", fb:"Tie breaking plays no part here; the chance comes from voters sampled in the poll."}],
      "A poll probability rests on the sample standing for the whole population of voters. The correct statement is <b>it assumes the voters polled represent all voters; it fails if whole groups were left out</b>.",
      {mode:"assume-poll"});
  },
  function(){
    return mcq("A forecast says there is an 80% chance of rain for a school field trip tomorrow. Which option states the assumption behind this probability and its limitation?",
      {t:"It assumes the weather model fits local conditions; it fails when coastal weather changes fast", fb:"Right: the percent comes from a model, and fast changing coastal conditions can outrun the model."},
      [{t:"It assumes rain fell on 8 of the last 10 field trips; it fails if the class stays inside all day", fb:"Past trips would be experimental data, but a forecast percent comes from a weather model."},
       {t:"It assumes the teacher expects rain on the field trip; it fails if the teacher expects sunshine", fb:"A teacher expectation is a personal judgement, but the stated percent comes from the forecast model."},
       {t:"It assumes every student brings a rain jacket along; it fails if some students forget their jackets", fb:"Student gear does not set the forecast percent; the weather model and its limits do."}],
      "A forecast probability rests on a weather model matching the local conditions ahead. The correct statement is <b>it assumes the weather model fits local conditions; it fails when coastal weather changes fast</b>.",
      {mode:"assume-forecast"});
  },
  function(){
    return mcq("A card sheet says the probability of drawing an ace from a full deck is \\(\\frac{4}{52}\\). Which option states the assumption behind this probability and its limitation?",
      {t:"It assumes the deck is complete and well shuffled; it fails if cards are missing or poorly mixed", fb:"Right: the count needs all 52 cards present, and missing cards or poor shuffling breaks it."},
      [{t:"It assumes an ace was drawn 4 times in 52 past draws; it fails if the deck is complete and shuffled", fb:"Past draws describe experimental results, and a complete shuffled deck supports the count."},
       {t:"It assumes the player believes an ace is due soon; it fails if the player believes otherwise", fb:"A belief about being due is subjective, but the stated value comes from counting the deck."},
       {t:"It assumes the cards are dealt face up on the table; it fails if the cards are dealt face down", fb:"Face up or face down does not change the count; missing or unmixed cards are the real limit."}],
      "The value \\(\\frac{4}{52}\\) rests on counting a complete deck with every card equally likely to be drawn. The correct statement is <b>it assumes the deck is complete and well shuffled; it fails if cards are missing or poorly mixed</b>.",
      {mode:"assume-cards"});
  },
  function(){
    return mcq("A teacher says the probability of picking a red marble from a bag with 3 red and 3 blue marbles is \\(\\frac{1}{2}\\). Which option states the assumption behind this probability and its limitation?",
      {t:"It assumes the marbles feel alike and are well mixed; it fails if sizes differ or mixing is poor", fb:"Right: a blind draw is equal only when marbles cannot be told apart and are mixed well."},
      [{t:"It assumes a red marble was picked half the time before; it fails if the bag holds equal colours", fb:"Earlier picks describe experimental results, and equal colours support the stated count."},
       {t:"It assumes the student hopes to pick a red marble; it fails if the student hopes for blue instead", fb:"Hoping is a personal feeling, but the stated value comes from the equal colour counts."},
       {t:"It assumes the bag is placed on the teacher desk; it fails if the bag is placed on a shelf", fb:"Where the bag sits does not set the value; equal, well mixed marbles are what matter."}],
      "The value \\(\\frac{1}{2}\\) rests on a blind draw from equal numbers of alike, well mixed marbles. The correct statement is <b>it assumes the marbles feel alike and are well mixed; it fails if sizes differ or mixing is poor</b>.",
      {mode:"assume-marbles"});
  }
]), ["Every stated probability rests on an assumption: ask what must be true for the number to hold.", "Name what the number counts or is based on first, then ask what could make that basis fail."]);

E("u9-same-number-two-sides", 9, ["12.3"], 2, "var", varset([
  function(){
    return mcq("A clinic reports that a treatment helped 7 out of 10 patients. Supporters say most patients improved. How could people who oppose the treatment use the same result to argue their side?",
      {t:"They can say it did not help 3 out of 10 patients, so almost a third saw no benefit", fb:"Right: the same result leaves 3 out of 10 unhelped, and that count supports the other side."},
      [{t:"They can say it helped only 7 out of 20 patients, so under half of patients improved", fb:"That changes the total from 10 to 20, which invents a new result instead of reusing the same one."},
       {t:"They can say it helped 10 out of 7 patients, so the report must have counted wrongly", fb:"A count of 10 out of 7 is impossible, and it does not restate the reported result at all."},
       {t:"They can say patients disliked the clinic waiting room, so the treatment should be stopped", fb:"Waiting room opinions are a different topic; the opposing case must reuse the same 7 out of 10."}],
      "One probability or rate can support opposing positions by stressing the opposite outcome: 7 out of 10 helped also means 3 out of 10 were not helped. The opposing use is <b>it did not help 3 out of 10 patients</b>.",
      {mode:"twosides-treatment"});
  },
  function(){
    return mcq("A report says 8 out of 10 students passed a safety course at school. Leaders say the course works well. How could critics use the same result to argue the course needs changes?",
      {t:"They can say 2 out of 10 students did not pass, so one in five students was left behind", fb:"Right: the same result leaves 2 out of 10 without a pass, and that count supports the critics."},
      [{t:"They can say only 8 out of 100 students passed, so the course failed almost every student", fb:"That changes the total from 10 to 100, which invents a new result instead of reusing the same one."},
       {t:"They can say the course ran for ten weeks in the fall term, so the schedule needs changes", fb:"Course length is a different topic; the critics case must reuse the same 8 out of 10 result."},
       {t:"They can say 10 out of 8 students passed the course, so the marking must have been too easy", fb:"A count of 10 out of 8 is impossible, and it does not restate the reported result at all."}],
      "One result can support opposing positions by stressing the opposite outcome: 8 out of 10 passing also means 2 out of 10 did not pass. The critics use is <b>2 out of 10 students did not pass</b>.",
      {mode:"twosides-course"});
  },
  function(){
    return mcq("A store reports that 75% of customers were happy with a new self checkout. Managers say customers love the change. How could opponents use the same result to argue against the change?",
      {t:"They can say 25% of customers were unhappy, so one in four customers had a poor experience", fb:"Right: 75% happy leaves 25% unhappy, and that share supports the opposing side."},
      [{t:"They can say 75% of customers were unhappy, so three in four customers disliked the change", fb:"That swaps the happy and unhappy shares, which misstates the reported result."},
       {t:"They can say the store is open 75% of the day, so the checkouts sit idle too often", fb:"Opening hours are a different topic; the opposing case must reuse the same satisfaction result."},
       {t:"They can say only 7.5 customers were happy, so the change pleased very few people", fb:"A count of 7.5 customers makes no sense; the result is a percent of all customers."}],
      "One percent can support opposing positions by stressing the opposite share: 75% happy also means 25% unhappy. The opposing use is <b>25% of customers were unhappy</b>.",
      {mode:"twosides-checkout"});
  },
  function(){
    return mcq("A school team won 6 of its 10 games this season. Fans say the team had a strong season. How could critics use the same result to argue the season was weak?",
      {t:"They can say the team failed to win 4 of its 10 games, so it lost ground in most close races", fb:"Right: winning 6 of 10 also means failing to win 4 of 10, and that count supports the critics."},
      [{t:"They can say the team won only 6 of its 20 games, so it won under a third of its games", fb:"That changes the total from 10 to 20, which invents a new result instead of reusing the same one."},
       {t:"They can say the team practised 10 times a month, so the players trained far too little", fb:"Practice counts are a different topic; the critics case must reuse the same 6 of 10 result."},
       {t:"They can say the team won 10 of its 6 games, so the record book must be wrong after all", fb:"A count of 10 out of 6 is impossible, and it does not restate the reported result at all."}],
      "One record can support opposing positions by stressing the opposite outcome: winning 6 of 10 also means failing to win 4 of 10. The critics use is <b>the team failed to win 4 of its 10 games</b>.",
      {mode:"twosides-team"});
  },
  function(){
    return mcq("At a taste test, 4 out of 5 students liked a new cafeteria drink. The cafeteria says the drink is a hit. How could students who want a different drink use the same result to argue their side?",
      {t:"They can say 1 out of 5 students did not like the drink, so a fifth of students want a change", fb:"Right: liking by 4 out of 5 leaves 1 out of 5 who did not like it, supporting the other side."},
      [{t:"They can say only 4 out of 50 students liked the drink, so almost nobody enjoyed it at all", fb:"That changes the total from 5 to 50, which invents a new result instead of reusing the same one."},
       {t:"They can say the drink comes in 5 flavours at the store, so the cafeteria chose the wrong one", fb:"Store flavours are a different topic; the opposing case must reuse the same 4 out of 5 result."},
       {t:"They can say 5 out of 4 students liked the drink, so the taste test was counted poorly", fb:"A count of 5 out of 4 is impossible, and it does not restate the reported result at all."}],
      "One result can support opposing positions by stressing the opposite outcome: 4 out of 5 liking a drink also means 1 out of 5 did not like it. The opposing use is <b>1 out of 5 students did not like the drink</b>.",
      {mode:"twosides-drink"});
  }
]), ["The same number can be framed by its opposite outcome: what did not happen, out of the same total.", "Subtract the stated count from the total to find the count the other side will stress."]);

E("u9-combined-decision", 9, ["12.4"], 1, "var", varset([
  function(){
    return mcq("A coach must choose a shooter for a final free throw. The chance from the chart counts equally likely outcomes, practice trials show the shooter made 18 of 20 shots this week, and the coach feels this player stays calm under pressure. Which option describes how the three kinds of probability combine in this decision?",
      {t:"The chart gives theoretical probability, the practice record gives experimental probability, and the calm feeling is subjective judgement", fb:"Right: equal outcomes are theoretical, trial results are experimental, and a feeling is subjective."},
      [{t:"The chart gives experimental probability, the practice record gives theoretical probability, and the calm feeling is subjective judgement", fb:"The chart counts set outcomes, which is theoretical, while counted practice shots are experimental."},
       {t:"The chart gives theoretical probability, the practice record gives subjective judgement, and the calm feeling is experimental probability", fb:"Counted practice shots are data from trials, and a feeling is a judgement, so those two are swapped."},
       {t:"The chart gives subjective judgement, the practice record gives experimental probability, and the calm feeling is theoretical probability", fb:"A chart of equal outcomes is not a feeling, and a feeling is not a count of equal outcomes."}],
      "Decisions often combine all three kinds: theoretical probability from equally likely outcomes, experimental probability from trials, and subjective judgement from personal feel. Here the correct description is <b>the chart is theoretical, the practice record is experimental, and the calm feeling is subjective judgement</b>.",
      {mode:"combine-coach"});
  },
  function(){
    return mcq("A board game player decides whether to risk a move. The die gives six equally likely faces, the player remembers rolling many low numbers in past games, and the player feels a high roll is due this turn. Which option describes how the three kinds of probability combine in this decision?",
      {t:"The die faces give theoretical probability, past rolls give experimental probability, and the due feeling is subjective judgement", fb:"Right: equal faces are theoretical, remembered results are experimental, and a due feeling is subjective."},
      [{t:"The die faces give subjective judgement, past rolls give theoretical probability, and the due feeling is experimental probability", fb:"Equal faces are counted, not felt, and remembered rolls are trial results rather than theory."},
       {t:"The die faces give theoretical probability, past rolls give subjective judgement, and the due feeling is experimental probability", fb:"Remembered rolls are records of trials, and a feeling of being due is a judgement, so those are swapped."},
       {t:"The die faces give experimental probability, past rolls give subjective judgement, and the due feeling is theoretical probability", fb:"No part is matched correctly here: faces are counted, rolls are trials, and feelings are judgements."}],
      "Decisions often combine all three kinds: theoretical probability from equally likely outcomes, experimental probability from past trials, and subjective judgement from personal feel. Here the correct description is <b>the die faces are theoretical, past rolls are experimental, and the due feeling is subjective judgement</b>.",
      {mode:"combine-boardgame"});
  },
  function(){
    return mcq("A farmer in the valley decides when to plant. A forecast model gives a 60% chance of rain this week, her own fields gave good crops in 4 of the last 5 wet springs, and she judges her soil feels ready when she checks it by hand. Which option describes how the three kinds of probability combine in this decision?",
      {t:"The forecast model gives theoretical probability, her field records give experimental probability, and her soil feel is subjective judgement", fb:"Right: a model estimate is theoretical, her recorded springs are experimental, and hand feel is subjective."},
      [{t:"The forecast model gives experimental probability, her field records give subjective judgement, and her soil feel is theoretical probability", fb:"Her own past springs are trial records, not feelings, and a hand check is a judgement, not a model."},
       {t:"The forecast model gives subjective judgement, her field records give experimental probability, and her soil feel is theoretical probability", fb:"The forecast comes from a model rather than a feeling, and the soil check is the personal judgement."},
       {t:"The forecast model gives theoretical probability, her field records give subjective judgement, and her soil feel is experimental probability", fb:"Field records over five springs are data from trials, while the soil feel is the judgement part."}],
      "Decisions often combine all three kinds: theoretical probability from a model, experimental probability from recorded trials, and subjective judgement from personal feel. Here the correct description is <b>the forecast is theoretical, the field records are experimental, and the soil feel is subjective judgement</b>.",
      {mode:"combine-farmer"});
  },
  function(){
    return mcq("A fishing captain decides whether to head out at dawn. A forecast model gives a 30% chance of high winds, his logbook shows rough seas on 2 of his last 10 dawn trips, and he judges the sky looks settled when he studies it at the wharf. Which option describes how the three kinds of probability combine in this decision?",
      {t:"The forecast model gives theoretical probability, the logbook gives experimental probability, and the sky judgement is subjective judgement", fb:"Right: the model is theoretical, the logged trips are experimental, and reading the sky is subjective."},
      [{t:"The forecast model gives subjective judgement, the logbook gives theoretical probability, and the sky judgement is experimental probability", fb:"A logbook is a record of trials, not theory, and reading the sky is a judgement, not a trial."},
       {t:"The forecast model gives theoretical probability, the logbook gives subjective judgement, and the sky judgement is experimental probability", fb:"Logged past trips are data from trials, and a personal reading of the sky is the judgement part."},
       {t:"The forecast model gives experimental probability, the logbook gives subjective judgement, and the sky judgement is theoretical probability", fb:"The model estimate is not trial data, and neither the logbook nor the sky reading is a theory count."}],
      "Decisions often combine all three kinds: theoretical probability from a model, experimental probability from recorded trials, and subjective judgement from personal feel. Here the correct description is <b>the forecast is theoretical, the logbook is experimental, and the sky judgement is subjective judgement</b>.",
      {mode:"combine-captain"});
  },
  function(){
    return mcq("A student chooses which carnival game to play. One game wins on 2 of 8 equally likely spinner sections, the student watched 30 plays at another game and saw 6 wins, and the student feels the third game is the luckiest of the row. Which option describes how the three kinds of probability combine in this decision?",
      {t:"The spinner count gives theoretical probability, the watched plays give experimental probability, and the lucky feeling is subjective judgement", fb:"Right: equal sections are theoretical, watched plays are experimental, and a lucky feeling is subjective."},
      [{t:"The spinner count gives experimental probability, the watched plays give subjective judgement, and the lucky feeling is theoretical probability", fb:"Counting equal sections is theory, watched plays are trial data, and luck is a feeling, so all three shift."},
       {t:"The spinner count gives subjective judgement, the watched plays give experimental probability, and the lucky feeling is theoretical probability", fb:"A count of equal sections is not a feeling, and a lucky feeling is not a count of outcomes."},
       {t:"The spinner count gives theoretical probability, the watched plays give subjective judgement, and the lucky feeling is experimental probability", fb:"Watched plays supply real trial results, and the lucky feeling is the judgement, so those two are swapped."}],
      "Decisions often combine all three kinds: theoretical probability from equally likely outcomes, experimental probability from observed trials, and subjective judgement from personal feel. Here the correct description is <b>the spinner count is theoretical, the watched plays are experimental, and the lucky feeling is subjective judgement</b>.",
      {mode:"combine-carnival"});
  }
]), ["Sort the decision into three parts: counted equal outcomes, results from trials, and a personal feeling.", "Match each detail in order: equal outcomes first, trial results second, feelings last."]);

E("u9-classify-probability", 9, ["12.4"], 1, "var", varset([
  function(){
    return mcq("Maya flipped a coin 50 times and it landed on heads 28 times. She says her chance of heads is 28 out of 50. Which option classifies this judgement correctly?",
      {t:"Experimental probability, because it is based on results from trials that were carried out", fb:"Right: the value comes from counting what happened in 50 real trials."},
      [{t:"Theoretical probability, because it is based on results from trials that were carried out", fb:"The reason names trials, which is experimental; theoretical counts equally likely outcomes instead."},
       {t:"Subjective judgement, because it is based on results from trials that were carried out", fb:"The reason names counted trial results, which is data, while subjective judgement rests on a feeling."},
       {t:"Theoretical probability, because it is based on counting the equally likely sides of a coin", fb:"Maya used her flip results, not the two equal sides, so this reason describes a different judgement."}],
      "A probability built from the results of trials that were carried out is experimental probability. The correct classification is <b>experimental probability, because it is based on results from trials</b>.",
      {mode:"classify-flips"});
  },
  function(){
    return mcq("Liam counts the cards in a full deck and says his chance of drawing a heart is 13 out of 52, or \\(\\frac{1}{4}\\). Which option classifies this judgement correctly?",
      {t:"Theoretical probability, because it is based on counting the equally likely cards in a deck", fb:"Right: the value comes from counting outcomes in a full deck where each card is equally likely."},
      [{t:"Experimental probability, because it is based on counting the equally likely cards in a deck", fb:"The reason names counting equal outcomes, which is theoretical; experimental needs trial results."},
       {t:"Subjective judgement, because it is based on counting the equally likely cards in a deck", fb:"The reason names a count of outcomes, which is worked out, while subjective judgement rests on a feeling."},
       {t:"Experimental probability, because it is based on results from cards drawn in earlier games", fb:"Liam counted the deck itself and drew no cards, so no earlier game results are involved here."}],
      "A probability built by counting equally likely outcomes is theoretical probability. The correct classification is <b>theoretical probability, because it is based on counting the equally likely cards</b>.",
      {mode:"classify-deck"});
  },
  function(){
    return mcq("A teacher looks at a new class list and says she feels about two thirds of the class will enjoy the outdoor lesson, before meeting any of the students. Which option classifies this judgement correctly?",
      {t:"Subjective judgement, because it is based on a personal feeling with no counts or trials", fb:"Right: with no outcomes counted and no trials run, the estimate rests on personal feeling alone."},
      [{t:"Theoretical probability, because it is based on a personal feeling with no counts or trials", fb:"The reason names a feeling with no counts, which is subjective; theoretical needs counted equal outcomes."},
       {t:"Experimental probability, because it is based on a personal feeling with no counts or trials", fb:"The reason names a feeling with no trials, which is subjective; experimental needs results from trials."},
       {t:"Theoretical probability, because it is based on counting the equally likely names on the list", fb:"The teacher counted nothing on the list; she gave a feeling before meeting the class at all."}],
      "A probability that rests on a personal feeling, with no counts and no trials, is subjective judgement. The correct classification is <b>subjective judgement, because it is based on a personal feeling</b>.",
      {mode:"classify-teacher-feel"});
  },
  function(){
    return mcq("A spinner has 8 equal sections and 2 of them are red. Noah says the chance of landing on red is \\(\\frac{2}{8}\\), or \\(\\frac{1}{4}\\). Which option classifies this judgement correctly?",
      {t:"Theoretical probability, because it is based on counting the equally likely sections of a spinner", fb:"Right: the value comes from counting red sections out of equal sections, with no spins needed."},
      [{t:"Experimental probability, because it is based on counting the equally likely sections of a spinner", fb:"The reason names counting equal sections, which is theoretical; experimental needs results from spins."},
       {t:"Subjective judgement, because it is based on counting the equally likely sections of a spinner", fb:"The reason names a count of sections, which is worked out, while subjective judgement rests on a feeling."},
       {t:"Experimental probability, because it is based on results from spins the student did earlier", fb:"Noah counted the sections and did no spins, so no earlier spin results are involved here."}],
      "A probability built by counting equally likely outcomes is theoretical probability: \\(\\frac{2}{8} = \\frac{1}{4}\\). The correct classification is <b>theoretical probability, because it is based on counting the equally likely sections</b>.",
      {mode:"classify-spinner"});
  },
  function(){
    return mcq("Sofia took 20 practice shots at a basket and scored on 11 of them. She says her chance of scoring on the next shot is 11 out of 20. Which option classifies this judgement correctly?",
      {t:"Experimental probability, because it is based on results from trials that were carried out", fb:"Right: the value comes from counting scores in 20 real practice trials."},
      [{t:"Theoretical probability, because it is based on results from trials that were carried out", fb:"The reason names trials, which is experimental; theoretical counts equally likely outcomes instead."},
       {t:"Subjective judgement, because it is based on results from trials that were carried out", fb:"The reason names counted trial results, which is data, while subjective judgement rests on a feeling."},
       {t:"Subjective judgement, because it is based on how confident the player feels at practice", fb:"Sofia used her counted scores, not her confidence, so this reason describes a different judgement."}],
      "A probability built from the results of trials that were carried out is experimental probability. The correct classification is <b>experimental probability, because it is based on results from trials</b>.",
      {mode:"classify-shots"});
  },
  function(){
    return mcq("An old sailor in the community looks at the evening sky and says he feels there is a good chance of a storm tomorrow, without checking any forecast or records. Which option classifies this judgement correctly?",
      {t:"Subjective judgement, because it is based on a personal feeling with no counts or trials", fb:"Right: with no forecast counted and no records checked, the estimate rests on personal feeling."},
      [{t:"Theoretical probability, because it is based on a personal feeling with no counts or trials", fb:"The reason names a feeling with no counts, which is subjective; theoretical needs counted equal outcomes."},
       {t:"Experimental probability, because it is based on a personal feeling with no counts or trials", fb:"The reason names a feeling with no trials, which is subjective; experimental needs results from trials."},
       {t:"Experimental probability, because it is based on weather records the sailor kept for years", fb:"The sailor checked no records for this call; he gave a feeling from looking at the sky."}],
      "A probability that rests on a personal feeling, with no counts and no trials, is subjective judgement. The correct classification is <b>subjective judgement, because it is based on a personal feeling</b>.",
      {mode:"classify-sailor"});
  }
]), ["Ask where the number came from: counted equal outcomes, results of trials, or a personal feeling.", "Check the story for trials that were actually carried out; their presence points to experimental probability."]);

E("u9-collection-problem", 9, ["11.1"], 1, "var", varset([
  function(){
    return mcq("To learn what a whole town thinks about building a new arena, a reporter asks only fans leaving a hockey game at the old arena. What is the main problem with this data collection?",
      {t:"Bias, because fans at one game do not represent the whole town being studied", fb:"Right: the group asked is one sided, so the results lean toward fans and miss other residents."},
      [{t:"Use of language, because the question at the game was worded to push one answer", fb:"No wording is described here; the flaw is who was asked, not how the question was phrased."},
       {t:"Privacy, because fans were asked to give their names along with their answers", fb:"Names are never mentioned here; the flaw is that only fans were asked about a town question."},
       {t:"Cost, because asking fans at the game costs more than mailing a survey to homes", fb:"Cost is never raised here; the flaw is a one sided group speaking for the whole town."}],
      "Asking only fans about a question for the whole town gives a biased sample, because the group asked does not represent the population. The main problem is <b>bias, because fans at one game do not represent the whole town</b>.",
      {mode:"problem-fans"});
  },
  function(){
    return mcq("A school survey about a new late bus asks students: 'Do you agree that everyone needs our wonderful new late bus?' What is the main problem with this data collection?",
      {t:"Use of language, because the wording pushes students toward agreeing with the bus", fb:"Right: praise words and a push to agree lead students to one answer before they think."},
      [{t:"Bias, because only students who ride the late bus were given the survey at school", fb:"The survey went to students generally; the flaw is the leading wording, not who received it."},
       {t:"Ethics, because students were offered a prize for finishing the survey at school", fb:"No prize is mentioned here; the flaw is wording that pushes students toward one answer."},
       {t:"Time and timing, because the survey was handed out during the busiest exam week", fb:"Timing is never mentioned here; the flaw is the leading wording of the question itself."}],
      "Wording that praises one choice and pushes agreement is a use of language problem, because it leads answers instead of measuring them. The main problem is <b>use of language, because the wording pushes students toward agreeing</b>.",
      {mode:"problem-latebus"});
  },
  function(){
    return mcq("In June, a town mails a survey asking residents how satisfied they were with snow clearing on their streets last winter. What is the main problem with this data collection?",
      {t:"Time and timing, because winter memories have faded by the time June arrives", fb:"Right: asking months later means faded memories and changed opinions spoil the answers."},
      [{t:"Bias, because only residents with driveways were mailed the survey in June", fb:"The survey went to residents generally; the flaw is the late timing, not who received it."},
       {t:"Cultural sensitivity, because the survey ignores how different families mark winter", fb:"Cultural marking of winter is not the issue here; the flaw is asking long after the season."},
       {t:"Privacy, because residents had to sign their names to the mailed survey form", fb:"Names are never mentioned here; the flaw is asking about winter well after it ended."}],
      "Asking about a winter service in June is a time and timing problem, because memories fade and conditions change. The main problem is <b>time and timing, because winter memories have faded by June</b>.",
      {mode:"problem-snow"});
  },
  function(){
    return mcq("A class survey about family income asks each student to write their name at the top, and the teacher reads the finished surveys aloud to check them. What is the main problem with this data collection?",
      {t:"Privacy, because names link sensitive income answers to each student in the class", fb:"Right: income is sensitive, and names plus reading aloud expose private information."},
      [{t:"Cost, because printing a name line on each survey uses extra ink and paper", fb:"Printing cost is trivial here; the flaw is exposing sensitive answers tied to names."},
       {t:"Use of language, because the income question was worded to push one answer", fb:"No leading wording is described here; the flaw is names attached to sensitive answers."},
       {t:"Bias, because only students present that day were able to take the survey form", fb:"Attendance is not the issue raised here; the flaw is private answers linked to student names."}],
      "Collecting sensitive answers with names attached, then reading them aloud, is a privacy problem. The main problem is <b>privacy, because names link sensitive income answers to each student</b>.",
      {mode:"problem-income"});
  },
  function(){
    return mcq("A cafeteria survey about favourite meals lists only foods from one cultural tradition and asks all students why they do not eat the foods their families serve at home. What is the main problem with this data collection?",
      {t:"Cultural sensitivity, because the survey treats one tradition as the standard for everyone", fb:"Right: the choices and the question dismiss the food traditions of many families in the school."},
      [{t:"Time and timing, because the survey was handed out right before the lunch bell rang", fb:"Timing is never mentioned here; the flaw is treating one food tradition as the standard."},
       {t:"Cost, because printing a longer menu list for the survey would cost too much money overall", fb:"Cost is never raised here; the flaw is a survey built around only one cultural tradition."},
       {t:"Ethics, because students were promised a free lunch for finishing the survey form early", fb:"No promise is mentioned here; the flaw is insensitivity to the traditions families follow."}],
      "A survey that treats one cultural tradition as the standard for everyone shows a cultural sensitivity problem. The main problem is <b>cultural sensitivity, because the survey treats one tradition as the standard</b>.",
      {mode:"problem-cafeteria"});
  },
  function(){
    return mcq("For a project on family rules, a class questions Grade 4 students in the hallway without asking their teachers or parents for permission first. What is the main problem with this data collection?",
      {t:"Ethics, because young students were questioned without permission from adults responsible", fb:"Right: questioning young children without consent treats participants unfairly, which is an ethics flaw."},
      [{t:"Bias, because only Grade 4 students who walk that hallway were questioned that day", fb:"The hallway group is a side detail; the central flaw is questioning children without permission."},
       {t:"Privacy, because the students were asked to state their home addresses in the hallway", fb:"Addresses are never mentioned here; the flaw is missing permission to question young students."},
       {t:"Use of language, because the questions used words the younger students found confusing", fb:"Confusing words are not described here; the flaw is questioning children without consent."}],
      "Questioning young students without permission from the adults responsible for them is an ethics problem. The main problem is <b>ethics, because young students were questioned without permission</b>.",
      {mode:"problem-permission"});
  }
]), ["Name the influence at work: who was asked, how it was worded, when it ran, or how people were treated.", "Check who was asked first; a one sided group points to bias before any other factor."]);

E("u9-collection-biggest-threat", 9, ["11.1"], 3, "var", varset([
  function(){
    return mcq("A town website poll about a new pool lets anyone vote as often as they like, and it stays open for one week. Supporters share the link widely on the first day. Which problem most threatens the validity of the results?",
      {t:"Bias, because repeat voting and shared links let one keen group flood the results", fb:"Right: unlimited repeat votes destroy any link between the results and the town as a whole."},
      [{t:"Time and timing, because a one week window may miss residents who are away then", fb:"A short window matters, but repeat flooding can swamp the count far beyond a timing gap."},
       {t:"Cost, because running a website poll for a full week adds hosting charges too", fb:"Hosting cost affects the budget, not whether the counted votes reflect the whole town."},
       {t:"Use of language, because the poll question is written in short, plain words only", fb:"Plain wording is a strength here; the threat is who can vote and how often they can vote."}],
      "Two influences are present, but repeat voting plus link sharing creates bias that can overwhelm every other concern, because the results stop representing the town. The biggest threat is <b>bias, because repeat voting lets one keen group flood the results</b>.",
      {mode:"threat-repeatpoll"});
  },
  function(){
    return mcq("A survey about school start times uses slightly leading wording, and it is given only to the team captain and four of her friends to answer for all 300 students in the school. Which problem most threatens the validity of the results?",
      {t:"Bias, because five friends cannot speak for the views of all 300 students in the school", fb:"Right: even perfect wording cannot fix answers drawn from five friends for a whole school."},
      [{t:"Use of language, because slightly leading wording can nudge students toward one answer", fb:"Leading wording matters, but it touches five answers here, while the tiny group decides everything."},
       {t:"Ethics, because the captain was asked to speak for her friends without their consent", fb:"Consent is a side concern here; the results fail mainly because the group is tiny and one sided."},
       {t:"Privacy, because the five friends could see each other answers while they filled it in", fb:"Shared viewing is minor beside the core flaw: five friends standing in for 300 students."}],
      "Two influences are present, but a sample of five friends for 300 students creates bias that no wording fix can repair, because the group cannot represent the school. The biggest threat is <b>bias, because five friends cannot speak for all 300 students</b>.",
      {mode:"threat-fivefriends"});
  },
  function(){
    return mcq("A health survey is costly to print and deliver, and the finished forms, with student names beside sensitive health answers, are pinned on a classroom board for the class to read. Which problem most threatens the validity of the results?",
      {t:"Privacy, because exposed names and health answers will stop students answering honestly", fb:"Right: once answers are public, students hide the truth, so the data itself becomes unreliable."},
      [{t:"Cost, because printing and delivering the survey uses a large share of the budget", fb:"High cost limits how many surveys run, but exposed answers corrupt the answers already given."},
       {t:"Bias, because only students in that one classroom were given the health survey form", fb:"One classroom limits reach, but public exposure changes what students dare to write at all."},
       {t:"Time and timing, because the survey was pinned up for a full week of classes at school", fb:"Display length is a side detail; the threat is sensitive answers tied to names in public view."}],
      "Two influences are present, but pinning named health answers in public is a privacy failure that changes how honestly students answer, so the results cannot be trusted. The biggest threat is <b>privacy, because exposed names and health answers will stop honest answers</b>.",
      {mode:"threat-board"});
  },
  function(){
    return mcq("A lunch survey runs during a busy exam week, and its questions treat one cultural food tradition as normal while describing other family foods as unusual choices. Many families skip the survey entirely. Which problem most threatens the validity of the results?",
      {t:"Cultural sensitivity, because offended families skip the survey, so whole groups go missing", fb:"Right: when whole groups refuse, the missing answers bend the results more than a busy week does."},
      [{t:"Time and timing, because exam week leaves families with little time to reply to it", fb:"A busy week lowers replies, but offended families are missing for a reason tied to the questions."},
       {t:"Cost, because reprinting the survey with better questions would cost extra money in the end", fb:"Reprinting cost is a budget issue, not the reason whole groups of families are absent."},
       {t:"Ethics, because families were offered a small prize draw for returning the survey form", fb:"A prize draw is a side detail here; the results fail because the questions drive groups away."}],
      "Two influences are present, but questions that dismiss family food traditions create a cultural sensitivity failure that removes whole groups from the results. The biggest threat is <b>cultural sensitivity, because offended families skip the survey and whole groups go missing</b>.",
      {mode:"threat-lunchsurvey"});
  },
  function(){
    return mcq("An interviewer uses plain, clear questions, and offers students a free snack only if they say they like a new juice being tested. Most students praise the juice. Which problem most threatens the validity of the results?",
      {t:"Ethics, because rewarding only praise pressures students to give dishonest answers", fb:"Right: tying a reward to one answer treats students unfairly and fills the data with false praise."},
      [{t:"Use of language, because plain and clear questions can still guide how students answer", fb:"Plain wording is a strength in this case; the pressure comes from the reward, not the words."},
       {t:"Bias, because students who like snacks are more likely to agree to the interview", fb:"Snack liking plays a small part; the reward for praise directly buys the answers recorded."},
       {t:"Cost, because buying snacks for the interviews adds to the cost of the study", fb:"Snack cost affects the budget, not whether the recorded praise can be believed at all."}],
      "Two influences are present, but rewarding only positive answers is an ethics failure that pressures students into dishonest responses, so the praise cannot be trusted. The biggest threat is <b>ethics, because rewarding only praise pressures students to give dishonest answers</b>.",
      {mode:"threat-snack"});
  }
]), ["Two influences can appear together: judge which one does more damage to whether the results can be trusted.", "Ask which flaw changes the answers themselves, not just the cost or the schedule of the study."]);

E("u9-match-influence", 9, ["11.2"], 1, "var", varset([
  function(){
    return mcq("A town wants to survey every household about road repairs. Printing and mailing a long survey to all 4000 households, with staff to read the replies, would use the whole yearly survey budget. Which influence does this situation illustrate?",
      {t:"Cost, because reaching the whole population would spend the entire survey budget", fb:"Right: money is the limiting influence, since full coverage costs more than the town can spend."},
      [{t:"Bias, because households with mailboxes would be more likely to send a reply back", fb:"Mailbox access is not raised here; the stated limit is the price of reaching everyone."},
       {t:"Privacy, because households would have to share repair details about their own roads", fb:"Road repair details are public works information; the stated limit is the budget for the mailing."},
       {t:"Time and timing, because reading thousands of replies would take staff many weeks", fb:"Reading time is plausible, but the situation stresses the budget being fully spent, which is cost."}],
      "When the money needed to reach everyone is the limiting factor, the influence is cost. This situation illustrates <b>cost, because reaching the whole population would spend the entire budget</b>.",
      {mode:"match-cost"});
  },
  function(){
    return mcq("A farm co-op surveys its members about harvest help during the busiest harvest week, when members work long days in the fields. Very few members reply. Which influence does this situation illustrate?",
      {t:"Time and timing, because the survey arrived when members had no time to answer it", fb:"Right: the moment chosen for the survey clashes with the busiest week of the farm year."},
      [{t:"Use of language, because the survey questions were written in technical farm terms", fb:"Question wording is not described here; the stated problem is the week the survey arrived."},
       {t:"Cultural sensitivity, because the survey ignored how member families mark harvest time", fb:"Harvest customs are not raised here; the stated problem is members having no spare time."},
       {t:"Ethics, because members were pressured to reply during their busiest working week", fb:"Pressure is not described here; the influence shown is the poor timing of the survey itself."}],
      "When the moment chosen for a survey clashes with the lives of the people asked, the influence is time and timing. This situation illustrates <b>time and timing, because the survey arrived when members had no time to answer</b>.",
      {mode:"match-timing"});
  },
  function(){
    return mcq("A survey about weekend activities lists only events from one community group as answer choices, so students from other backgrounds find none of their usual activities listed. Which influence does this situation illustrate?",
      {t:"Cultural sensitivity, because the choices leave out the activities of many backgrounds", fb:"Right: answer choices built around one group overlook the traditions of the wider school."},
      [{t:"Bias, because only students from that one community group were handed the survey", fb:"The survey went to students broadly; the flaw is the choice list, not who received the form."},
       {t:"Cost, because adding more answer choices would make the survey longer to print out", fb:"Printing length is not raised here; the stated flaw is choices that exclude many students."},
       {t:"Privacy, because students must reveal their weekend activities to their classmates", fb:"Weekend activities here are ordinary choices; the stated flaw is a list missing whole groups."}],
      "When answer choices are built around one group and overlook others, the influence is cultural sensitivity. This situation illustrates <b>cultural sensitivity, because the choices leave out many backgrounds</b>.",
      {mode:"match-cultural"});
  },
  function(){
    return mcq("A radio station runs a call in poll asking listeners whether its morning show is the best in town. Only keen listeners phone in, many of them daily fans of the show. Which influence does this situation illustrate?",
      {t:"Bias, because keen fans who choose to call in do not represent all town listeners", fb:"Right: volunteers who already love the show lean the results in one direction from the start."},
      [{t:"Use of language, because the poll question praises the morning show in its wording", fb:"The wording here is plain; the flaw is that only self chosen fans take part in the poll."},
       {t:"Time and timing, because the poll runs early in the morning when many people work", fb:"The hour matters less than who calls: the callers are fans, not a cross section of the town."},
       {t:"Cost, because running a phone poll every morning adds to the station phone bill", fb:"Phone cost is not raised here; the stated flaw is a one sided group answering the question."}],
      "When the people who answer are self chosen fans rather than a cross section, the influence is bias. This situation illustrates <b>bias, because keen fans who call in do not represent all listeners</b>.",
      {mode:"match-bias"});
  },
  function(){
    return mcq("A library survey asks visitors: 'How much do you love our amazing, award winning new reading room?' Most visitors pick the top answer. Which influence does this situation illustrate?",
      {t:"Use of language, because praise words in the question push visitors toward the top answer", fb:"Right: loaded praise in the wording leads answers before visitors judge the room themselves."},
      [{t:"Bias, because only visitors who use the reading room were asked the survey question", fb:"Asking room users is reasonable here; the flaw is praise wording steering their answers."},
       {t:"Ethics, because visitors were offered a bookmark for answering the survey question", fb:"No offer is mentioned here; the stated flaw is wording loaded with praise for the room."},
       {t:"Cultural sensitivity, because the question assumes all visitors read in the same way", fb:"Reading habits across cultures are not raised here; the flaw is leading praise in the wording."}],
      "When wording praises one answer and pushes respondents toward it, the influence is use of language. This situation illustrates <b>use of language, because praise words push visitors toward the top answer</b>.",
      {mode:"match-language"});
  },
  function(){
    return mcq("A school health survey asks students to write their name and any medicines they take on the same form, and classmates pass the finished forms to the front of the room. Which influence does this situation illustrate?",
      {t:"Privacy, because names and medicine details can be seen by classmates handling the forms", fb:"Right: sensitive health details tied to names are exposed as forms pass through many hands."},
      [{t:"Cost, because printing a name line and a medicine line makes each form longer to print", fb:"Form length is trivial here; the stated flaw is sensitive details exposed to classmates."},
       {t:"Time and timing, because passing forms to the front takes time at the end of class", fb:"Passing time is a side detail; the influence shown is private information being visible to others."},
       {t:"Bias, because students who take medicine may choose to leave the survey blank entirely", fb:"Blank forms could follow, but the influence illustrated is private details seen by classmates."}],
      "When sensitive personal details can be seen by others during collection, the influence is privacy. This situation illustrates <b>privacy, because names and medicine details can be seen by classmates</b>.",
      {mode:"match-privacy"});
  }
]), ["Match the situation to the one influence it shows most clearly: money, moment, wording, who answers, or private details.", "Underline the detail in the story that does the damage, then name the influence that detail belongs to."]);

E("u9-sample-or-population", 9, ["11.3"], 1, "var", varset([
  function(){
    return mcq("A population is everyone in the group being studied, and a sample is part of that group. A principal asks every student in the school about lunch choices for the cafeteria. Which option classifies this correctly?",
      {t:"A population, because everyone in the group being studied was included in the asking", fb:"Right: every student in the school was asked, so the whole group being studied took part."},
      [{t:"A sample, because everyone in the group being studied was included in the asking", fb:"The reason describes everyone taking part, which is a population, so the label and reason clash."},
       {t:"A population, because only part of the group being studied was included in the asking", fb:"The reason describes only part taking part, which is a sample, so the label and reason clash."},
       {t:"A sample, because the students who were asked were chosen by drawing names at random", fb:"No names were drawn here; the principal asked every student in the school directly."}],
      "When everyone in the group being studied is included, the study uses a population. The correct classification is <b>a population, because everyone in the group was included</b>.",
      {mode:"sampop-school"});
  },
  function(){
    return mcq("A population is everyone in the group being studied, and a sample is part of that group. A factory tests 20 batteries from a shipment of 2000 to check battery life. Which option classifies this correctly?",
      {t:"A sample, because only part of the group being studied was included in the testing", fb:"Right: 20 batteries out of 2000 is part of the shipment, so the factory tested a sample."},
      [{t:"A population, because only part of the group being studied was included in the testing", fb:"The reason describes only part taking part, which is a sample, so the label and reason clash."},
       {t:"A sample, because everyone in the group being studied was included in the testing", fb:"The reason describes everyone taking part, which is a population, so the label and reason clash."},
       {t:"A population, because the batteries that were tested were chosen by drawing at random", fb:"Random choice still tests only part of the shipment, and a part is always a sample."}],
      "When only part of the group being studied is included, the study uses a sample. The correct classification is <b>a sample, because only part of the group was included</b>.",
      {mode:"sampop-batteries"});
  },
  function(){
    return mcq("A population is everyone in the group being studied, and a sample is part of that group. A club president asks all 12 members of a small chess club about a new meeting day. Which option classifies this correctly?",
      {t:"A population, because everyone in the group being studied was included in the asking", fb:"Right: all 12 members were asked, so the whole group being studied took part in full."},
      [{t:"A sample, because everyone in the group being studied was included in the asking", fb:"The reason describes everyone taking part, which is a population, so the label and reason clash."},
       {t:"A population, because only part of the group being studied was included in the asking", fb:"The reason describes only part taking part, which is a sample, so the label and reason clash."},
       {t:"A sample, because the members who were asked were chosen by drawing names at random", fb:"No names were drawn here; the president asked all 12 members of the club directly."}],
      "When everyone in the group being studied is included, the study uses a population. The correct classification is <b>a population, because everyone in the group was included</b>.",
      {mode:"sampop-chess"});
  },
  function(){
    return mcq("A population is everyone in the group being studied, and a sample is part of that group. A grocer checks 25 apples from a shipment of 500 apples for bruises. Which option classifies this correctly?",
      {t:"A sample, because only part of the group being studied was included in the checking", fb:"Right: 25 apples out of 500 is part of the shipment, so the grocer checked a sample."},
      [{t:"A population, because only part of the group being studied was included in the checking", fb:"The reason describes only part taking part, which is a sample, so the label and reason clash."},
       {t:"A sample, because everyone in the group being studied was included in the checking", fb:"The reason describes everyone taking part, which is a population, so the label and reason clash."},
       {t:"A population, because the apples that were checked were chosen by drawing at random", fb:"Random choice still checks only part of the shipment, and a part is always a sample."}],
      "When only part of the group being studied is included, the study uses a sample. The correct classification is <b>a sample, because only part of the group was included</b>.",
      {mode:"sampop-apples"});
  },
  function(){
    return mcq("A population is everyone in the group being studied, and a sample is part of that group. A town studying all its households surveys every household on one street, Bay Street, and no others. Which option classifies this correctly?",
      {t:"A sample, because only part of the group being studied was included in the survey", fb:"Right: the group studied is all town households, and one street is only part of that group."},
      [{t:"A population, because only part of the group being studied was included in the survey", fb:"The reason describes only part taking part, which is a sample, so the label and reason clash."},
       {t:"A sample, because everyone in the group being studied was included in the survey", fb:"The reason describes everyone taking part, but households on other streets were left out."},
       {t:"A population, because every household on the chosen street answered the survey fully", fb:"Full answers on one street still cover only part of all the households in the town."}],
      "The group being studied is all households in the town, and one street is only part of it, so the study uses a sample. The correct classification is <b>a sample, because only part of the group was included</b>.",
      {mode:"sampop-street"});
  },
  function(){
    return mcq("A population is everyone in the group being studied, and a sample is part of that group. A swim coach times every one of the 14 swimmers on the team during a practice. Which option classifies this correctly?",
      {t:"A population, because everyone in the group being studied was included in the timing", fb:"Right: all 14 swimmers on the team were timed, so the whole group being studied took part."},
      [{t:"A sample, because everyone in the group being studied was included in the timing", fb:"The reason describes everyone taking part, which is a population, so the label and reason clash."},
       {t:"A population, because only part of the group being studied was included in the timing", fb:"The reason describes only part taking part, which is a sample, so the label and reason clash."},
       {t:"A sample, because the swimmers who were timed were chosen by drawing names at random", fb:"No names were drawn here; the coach timed every swimmer on the team directly."}],
      "When everyone in the group being studied is included, the study uses a population. The correct classification is <b>a population, because everyone in the group was included</b>.",
      {mode:"sampop-swim"});
  }
]), ["First name the group being studied, then ask whether all of it or only part of it took part.", "Compare the group named in the question with the group that actually took part."]);

E("u9-use-whole-population", 9, ["11.4"], 1, "var", varset([
  function(){
    return mcq("Which situation is best answered by using the whole population?",
      {t:"A class of 24 students choosing a theme for their own class party this term", fb:"Right: the class is small and everyone is easy to reach, so asking all of them makes sense."},
      [{t:"All drivers in the province rating the condition of highways across the region", fb:"Drivers across a province are far too many to ask one by one for a single class question."},
       {t:"Every fish in a harbour being checked to learn the average size of the catch", fb:"Catching and checking every fish is impossible in practice, so a sample is used instead."},
       {t:"Each battery in a warehouse being run until empty to test how long they last", fb:"Running every battery empty destroys the stock being tested, so a sample is used instead."}],
      "Using a whole population makes sense when the group is small, cheap to reach, and everyone can take part. The best situation is <b>a class of 24 students choosing their own class party theme</b>.",
      {mode:"wholepop-class"});
  },
  function(){
    return mcq("Which situation is best answered by using the whole population?",
      {t:"A chess club with 10 members choosing which evening to hold its weekly games", fb:"Right: with only 10 members, all easy to reach, asking everyone is quick and complete."},
      [{t:"All shoppers in a city rating a new downtown parking plan for the council", fb:"Shoppers across a whole city are far too many to ask one by one for this question."},
       {t:"Every light bulb in a factory being burned until it fails to test its lifetime", fb:"Burning every bulb until it fails destroys the stock being tested, so a sample is used."},
       {t:"All residents of a province rating winter road clearing on provincial highways", fb:"Residents across a province are far too many to reach for one survey of this kind."}],
      "Using a whole population makes sense when the group is small, cheap to reach, and everyone can take part. The best situation is <b>a chess club with 10 members choosing its game evening</b>.",
      {mode:"wholepop-chess"});
  },
  function(){
    return mcq("Which situation is best answered by using the whole population?",
      {t:"A teacher asking all 18 students in a class which field trip visit they prefer", fb:"Right: the class is small and present together, so the teacher can ask every student easily."},
      [{t:"All teenagers in the country rating a new national advertising campaign online", fb:"Teenagers across a country are far too many to ask one by one for this question."},
       {t:"Every candle in a shipment being burned to the end to measure burning time", fb:"Burning every candle to the end destroys the shipment being tested, so a sample is used."},
       {t:"All farmers in a region rating a proposed change to provincial farm rules", fb:"Farmers across a whole region are too many and too spread out to ask one by one here."}],
      "Using a whole population makes sense when the group is small, cheap to reach, and everyone can take part. The best situation is <b>a teacher asking all 18 students in a class about a field trip</b>.",
      {mode:"wholepop-fieldtrip"});
  },
  function(){
    return mcq("Which situation is best answered by using the whole population?",
      {t:"A small bakery asking all 6 of its staff which morning opening time suits them", fb:"Right: with only 6 staff, all easy to reach, the bakery can ask everyone directly."},
      [{t:"All customers of a national store chain rating a new store layout design", fb:"Customers of a national chain are far too many to ask one by one for this question."},
       {t:"Every water bottle in a plant being crushed to test how much force it can take", fb:"Crushing every bottle destroys the products being tested, so a sample is used instead."},
       {t:"All homeowners in a town rating a proposed new tax that affects the province", fb:"Homeowners across a town are too many to ask one by one for a provincial question."}],
      "Using a whole population makes sense when the group is small, cheap to reach, and everyone can take part. The best situation is <b>a small bakery asking all 6 of its staff about opening time</b>.",
      {mode:"wholepop-bakery"});
  },
  function(){
    return mcq("Which situation is best answered by using the whole population?",
      {t:"A book club with 15 members choosing which novel the club will read next month", fb:"Right: the club is small and meets together, so every member can be asked with ease."},
      [{t:"All viewers in the country rating a new evening television program schedule", fb:"Viewers across a country are far too many to ask one by one for this question."},
       {t:"Every helmet in a warehouse being crash tested to check how well it protects", fb:"Crash testing every helmet destroys the helmets being tested, so a sample is used instead."},
       {t:"All workers in a province rating a proposed change to workplace safety rules", fb:"Workers across a province are far too many and too spread out to ask one by one here."}],
      "Using a whole population makes sense when the group is small, cheap to reach, and everyone can take part. The best situation is <b>a book club with 15 members choosing its next novel</b>.",
      {mode:"wholepop-bookclub"});
  }
]), ["A whole population works when the group is small, everyone is reachable, and testing harms nothing.", "Rule out any option where the group is huge or where testing would destroy the items."]);

E("u9-population-limitation", 9, ["11.5"], 1, "var", varset([
  function(){
    return mcq("A maker wants to know how many hours its candles burn. Burning a candle to measure it uses the candle up completely. Which limitation best explains why a sample is used instead of the whole population?",
      {t:"Testing the whole population would destroy every candle in the stock being studied", fb:"Right: each test consumes the candle, so testing all of them leaves nothing to sell or use."},
      [{t:"The cost of mailing surveys to candle buyers in other towns would be far too high", fb:"No survey is planned here; the limit is that the test itself uses up each candle tested."},
       {t:"There is not enough time before the shop opens to question every candle buyer", fb:"Buyer questions are not part of this study; the limit is the destructive burn test itself."},
       {t:"The population of candle buyers across the country is too large to reach in person", fb:"Buyers are not the group tested here; the candles are, and testing destroys each one used."}],
      "When testing destroys the item tested, the whole population cannot be used, so a sample is tested instead. The limitation is <b>testing the whole population would destroy every candle</b>.",
      {mode:"limit-candles"});
  },
  function(){
    return mcq("A health region wants the views of every household in the province on clinic hours. Printing, mailing and staffing a survey for every household would take most of the region budget for the year. Which limitation best explains why a sample is used instead of the whole population?",
      {t:"The cost of reaching every household in the province is too high for the budget", fb:"Right: full coverage would consume most of a yearly budget, so cost rules out the population."},
      [{t:"Testing every household survey form would destroy the forms before they are read", fb:"Reading survey forms does not destroy them; the stated limit is the money full coverage takes."},
       {t:"The region has only two computers available to record any of the survey replies", fb:"Equipment is not mentioned here; the stated limit is the budget that full mailing would use."},
       {t:"Households need the results before the weekend, leaving too little time to reply", fb:"A weekend deadline is not mentioned here; the stated limit is the cost of reaching everyone."}],
      "When reaching everyone costs more than the available budget allows, cost is the limitation that rules out the whole population. The limitation is <b>the cost of reaching every household is too high</b>.",
      {mode:"limit-clinic"});
  },
  function(){
    return mcq("A school must decide on Monday whether to hold an outdoor sports day, and wants student views first. Asking all 900 students and counting the answers would take the whole week. Which limitation best explains why a sample is used instead of the whole population?",
      {t:"There is not enough time to ask everyone before the decision has to be made", fb:"Right: the decision deadline arrives before a full count could finish, so time rules it out."},
      [{t:"The cost of printing a one question survey for the school would use the budget", fb:"A one question school survey is cheap; the stated limit is the week a full count would take."},
       {t:"Asking every student the question would destroy the survey forms after one use", fb:"Asking a question destroys nothing; the stated limit is the deadline for the decision itself."},
       {t:"The school owns only two pencils that students could use to mark their answers", fb:"Pencils are not the limit described here; the stated limit is time before the Monday decision."}],
      "When a decision deadline arrives before everyone can be asked, time is the limitation that rules out the whole population. The limitation is <b>there is not enough time to ask everyone before the decision</b>.",
      {mode:"limit-sportsday"});
  },
  function(){
    return mcq("A region wants to test water quality at every well in the area. The lab owns only two test kits, and each kit can test one well per day. Which limitation best explains why a sample is used instead of the whole population?",
      {t:"The tools and staff available for the testing are too limited to cover every well", fb:"Right: two kits testing one well a day cannot cover every well, so resources rule it out."},
      [{t:"The cost of buying the land around every well in the region would be far too high", fb:"Land purchase is not part of this study; the stated limit is the small number of test kits."},
       {t:"Testing a well sample uses up the whole well, leaving the owner with no water", fb:"A water sample does not empty a well; the stated limit is the few kits available for testing."},
       {t:"Well owners need their results within the hour, leaving too little time to test", fb:"A one hour deadline is not mentioned here; the stated limit is the limited testing equipment."}],
      "When the equipment and people available cannot cover the whole group, limited resources rule out the whole population. The limitation is <b>the tools and staff available are too limited</b>.",
      {mode:"limit-wells"});
  },
  function(){
    return mcq("A researcher wants the opinions of all adults in Canada about a new national park pass. There are many millions of adults spread across the whole country. Which limitation best explains why a sample is used instead of the whole population?",
      {t:"The population is too large and spread out for every adult to be reached and asked", fb:"Right: millions of people across a country cannot all be contacted, so size rules it out."},
      [{t:"Testing every adult opinion would destroy the park passes the study is examining", fb:"Opinions destroy nothing, and passes are not tested here; the stated limit is population size."},
       {t:"The researcher owns only two clipboards for recording answers during interviews", fb:"Clipboards are not the limit described here; the stated limit is the huge, spread out population."},
       {t:"Adults need to answer before supper tonight, leaving too little time to respond", fb:"A supper deadline is not mentioned here; the stated limit is how many adults there are."}],
      "When a population is so large and spread out that everyone cannot be reached, its size rules out using the whole population. The limitation is <b>the population is too large and spread out to be reached</b>.",
      {mode:"limit-parkpass"});
  }
]), ["A sample replaces a population when something blocks full coverage: money, time, resources, destruction, or sheer size.", "Find the blocking detail in the story first, then match it to the limitation it names."]);

E("u9-generalization-critique", 9, ["11.6"], 3, "var", varset([
  function(){
    return mcq("Jordan asks 5 close friends at lunch and then claims that all teenagers in town love a new skate shop. Which option gives the soundest critique of this generalization from a sample?",
      {t:"The sample is too small and made only of friends, so it cannot speak for all teenagers in town", fb:"Right: five friends share tastes and miss most teenagers, so the claim reaches far beyond the sample."},
      [{t:"The claim is sound, because friends usually know what other teenagers in town will enjoy", fb:"Friends share the same circle, so their tastes are a poor guide to every teenager in town."},
       {t:"The sample is too large for a lunch break study, so fewer students should have been asked", fb:"Five is a very small sample, not a large one; size in the other direction is the problem."},
       {t:"The claim is sound, because the question was asked directly rather than through a survey form", fb:"Asking directly does not fix a tiny group of friends standing in for a whole town of teenagers."}],
      "A generalization is only as good as the sample behind it: a claim about a whole population needs a sample large enough and representative enough to support it. The sound critique is <b>the sample is too small and made only of friends</b>.",
      {mode:"critique-friends"});
  },
  function(){
    return mcq("A report surveys members at one gym and then claims that most adults in town exercise every day. Which option gives the soundest critique of this generalization from a sample?",
      {t:"Gym members exercise more than most adults, so the sample does not represent the whole town", fb:"Right: people who join a gym differ from the general population in exactly the habit being measured."},
      [{t:"The claim is sound, because gym members are adults and the claim is about adults in town", fb:"Being adults is not enough; gym members are untypical adults for a question about exercise habits."},
       {t:"The sample is too small to use, because a single gym can hold only a handful of members", fb:"Gym size is not given here; the flaw is that members differ from the town, not the head count."},
       {t:"The claim is sound, because a survey at a gym is a direct way to study exercise habits", fb:"Directness does not fix a sample drawn only from people who already choose to exercise often."}],
      "A generalization is only as good as the sample behind it: a sample that differs from the population on the very topic studied cannot support a town wide claim. The sound critique is <b>gym members do not represent the whole town</b>.",
      {mode:"critique-gym"});
  },
  function(){
    return mcq("A school draws 200 student names at random from all grades and surveys them about library use, then claims the results describe library use across the whole school. Which option judges this generalization correctly?",
      {t:"The generalization is reasonable, because a large random sample from all grades can represent the school", fb:"Right: random selection across all grades with 200 students gives the claim a solid sample behind it."},
      [{t:"The generalization fails, because any sample smaller than the whole school is always invalid as a rule", fb:"Samples can support claims when they are large, random and drawn from the whole group studied."},
       {t:"The generalization fails, because library users were more likely to answer the survey at school that day", fb:"Names were drawn at random from all grades, so keen users hold no special place in this sample."},
       {t:"The generalization is reasonable, because the students surveyed all visit the same library room at school", fb:"Sharing a library room is not the reason; random selection across grades is what supports the claim."}],
      "A generalization is only as good as the sample behind it, and a large random sample drawn from the whole group can support a claim about that group. The correct judgement is <b>the generalization is reasonable, because the sample is large and random</b>.",
      {mode:"critique-random"});
  },
  function(){
    return mcq("A student asks people at a skate park whether the town should build a bigger skate park, and then claims most residents support the project. Which option gives the soundest critique of this generalization from a sample?",
      {t:"People at a skate park already favour skate parks, so the sample leans one way from the start", fb:"Right: asking only users about their own facility stacks the answers toward support for the project."},
      [{t:"The claim is sound, because people at the park know more about skate parks than others do", fb:"Knowledge about skate parks does not make park users typical of all residents in the town."},
       {t:"The sample is too large for one student to handle, so fewer people should have been asked", fb:"Sample size is not given as the flaw here; the flaw is asking only people who already use the park."},
       {t:"The claim is sound, because the question was asked in person rather than on a printed form", fb:"Asking in person does not fix a sample drawn only from people who favour the project already."}],
      "A generalization is only as good as the sample behind it: asking only people who already use a facility cannot support a claim about all residents. The sound critique is <b>people at a skate park already favour skate parks</b>.",
      {mode:"critique-skatepark"});
  },
  function(){
    return mcq("A study surveys 300 Grade 9 students and then claims that students in the whole school, Grades 7 to 12, prefer morning classes. Which option gives the soundest critique of this generalization from a sample?",
      {t:"Only one grade was surveyed, so older and younger students may answer very differently", fb:"Right: a large sample from a single grade still misses every other grade the claim covers."},
      [{t:"The claim is sound, because 300 students is a large sample for any school wide question", fb:"Size alone does not help when every student surveyed comes from just one of six grades."},
       {t:"The sample is too small to use, because a school survey needs thousands of students", fb:"Three hundred is a fair size; the flaw is that all of them come from a single grade level."},
       {t:"The claim is sound, because Grade 9 students sit between the youngest and oldest grades", fb:"A middle grade does not automatically share the views of the grades above and below it."}],
      "A generalization is only as good as the sample behind it: a sample drawn from one grade cannot support a claim covering six grades. The sound critique is <b>only one grade was surveyed, so other grades may differ</b>.",
      {mode:"critique-onegrade"});
  }
]), ["Test the claim against its sample: check the size, then check whether the sample matches the whole group claimed.", "Picture who is missing from the sample; missing groups are where a generalization usually breaks."]);

E("u9-rubric-missing-part", 9, ["11.7"], 1, "var", varset([
  function(){
    return mcq("A rubric for a data project assesses the choice of a data collection method with social considerations, the selection of a population or a sample with justification, and the communication of findings. Which required part is missing from this rubric?",
      {t:"A question for investigation that the project sets out to answer with collected data", fb:"Right: the rubric never assesses whether the project has a clear question guiding the study."},
      [{t:"A choice of data collection method that includes social considerations for participants", fb:"That part is listed in the rubric already, in its method criterion, so it is present."},
       {t:"A selection of a population or a sample with a justification for that selection", fb:"That part is listed in the rubric already, in its selection criterion, so it is present."},
       {t:"A communication of findings that shares the project conclusions with an audience", fb:"That part is listed in the rubric already, in its final criterion, so it is present."}],
      "A complete project rubric assesses the question for investigation, the collection method with social considerations, the population or sample choice with justification, and the communication of findings. The missing part is <b>a question for investigation</b>.",
      {mode:"rubric-question"});
  },
  function(){
    return mcq("A rubric for a data project assesses the question for investigation, the selection of a population or a sample with justification, and the communication of findings. Which required part is missing from this rubric?",
      {t:"A choice of data collection method that includes social considerations for participants", fb:"Right: the rubric never assesses how data will be gathered or how people will be treated."},
      [{t:"A question for investigation that the project sets out to answer with collected data", fb:"That part is listed in the rubric already, in its first criterion, so it is present."},
       {t:"A selection of a population or a sample with a justification for that selection", fb:"That part is listed in the rubric already, in its selection criterion, so it is present."},
       {t:"A communication of findings that shares the project conclusions with an audience", fb:"That part is listed in the rubric already, in its final criterion, so it is present."}],
      "A complete project rubric assesses the question for investigation, the collection method with social considerations, the population or sample choice with justification, and the communication of findings. The missing part is <b>the choice of a data collection method with social considerations</b>.",
      {mode:"rubric-method"});
  },
  function(){
    return mcq("A rubric for a data project assesses the question for investigation, the choice of a data collection method with social considerations, and the communication of findings. Which required part is missing from this rubric?",
      {t:"A selection of a population or a sample with a justification for that selection", fb:"Right: the rubric never assesses who will be studied or why that group was chosen."},
      [{t:"A question for investigation that the project sets out to answer with collected data", fb:"That part is listed in the rubric already, in its first criterion, so it is present."},
       {t:"A choice of data collection method that includes social considerations for participants", fb:"That part is listed in the rubric already, in its method criterion, so it is present."},
       {t:"A communication of findings that shares the project conclusions with an audience", fb:"That part is listed in the rubric already, in its final criterion, so it is present."}],
      "A complete project rubric assesses the question for investigation, the collection method with social considerations, the population or sample choice with justification, and the communication of findings. The missing part is <b>the selection of a population or a sample with justification</b>.",
      {mode:"rubric-selection"});
  },
  function(){
    return mcq("A rubric for a data project assesses the question for investigation, the choice of a data collection method with social considerations, and the selection of a population or a sample with justification. Which required part is missing from this rubric?",
      {t:"A communication of findings that shares the project conclusions with an audience", fb:"Right: the rubric never assesses how the project results will be shared at the end."},
      [{t:"A question for investigation that the project sets out to answer with collected data", fb:"That part is listed in the rubric already, in its first criterion, so it is present."},
       {t:"A choice of data collection method that includes social considerations for participants", fb:"That part is listed in the rubric already, in its method criterion, so it is present."},
       {t:"A selection of a population or a sample with a justification for that selection", fb:"That part is listed in the rubric already, in its selection criterion, so it is present."}],
      "A complete project rubric assesses the question for investigation, the collection method with social considerations, the population or sample choice with justification, and the communication of findings. The missing part is <b>the communication of findings</b>.",
      {mode:"rubric-communication"});
  }
]), ["Hold the full rubric list in mind, then tick off each part the described rubric already covers.", "List the four required parts first; the missing one is the part never named in the stem."]);

E("u9-plan-element", 9, ["11.8"], 1, "var", varset([
  function(){
    return mcq("A project plan states that interviewers will ask each person for permission before starting and will keep names off all answer forms. Which element of the project plan does this detail belong to?",
      {t:"The method of data collection, in the social considerations that protect participants", fb:"Right: permission and nameless forms are social considerations built into how data is collected."},
      [{t:"The question for investigation, in the wording that the project sets out to answer", fb:"No research question is stated in this detail; it describes how people are treated during collection."},
       {t:"The method for selecting a population or a sample from the group being studied", fb:"No selection of people is described in this detail; it describes treatment during the interviews."},
       {t:"The method to be used for collection of the data during the project field work", fb:"Collection steps are close, but permission and privacy belong to the social considerations part."}],
      "A project plan describes a question for investigation, a collection method with social considerations, a selection method, and a collection procedure. This detail belongs to <b>the method of data collection, in its social considerations</b>.",
      {mode:"plan-social"});
  },
  function(){
    return mcq("A project plan states that 30 students will be chosen by drawing names from the class lists of every grade in the school. Which element of the project plan does this detail belong to?",
      {t:"The method for selecting a population or a sample from the group being studied", fb:"Right: drawing names from class lists is exactly how the sample is selected for the study."},
      [{t:"The question for investigation, in the wording that the project sets out to answer", fb:"No research question is stated in this detail; it describes how the students are chosen."},
       {t:"The method of data collection, in the social considerations that protect participants", fb:"No treatment of participants is described in this detail; it describes how names are drawn."},
       {t:"The method to be used for collection of the data during the project field work", fb:"Field work steps come later; this detail settles who takes part before any data is gathered."}],
      "A project plan describes a question for investigation, a collection method with social considerations, a selection method, and a collection procedure. This detail belongs to <b>the method for selecting a population or a sample</b>.",
      {mode:"plan-selection"});
  },
  function(){
    return mcq("A project plan states its question for investigation, describes a survey method with permission and privacy protections, and explains how its sample will be drawn from class lists. The plan says nothing about how, when or where the survey answers will actually be gathered and recorded. What does the plan still need?",
      {t:"The method to be used for collection of the data during the project field work", fb:"Right: the plan never says how answers will be gathered and recorded, which is its missing element."},
      [{t:"The question for investigation, in the wording that the project sets out to answer", fb:"The question is stated at the start of the plan, so that element is already covered in full."},
       {t:"The method of data collection, in the social considerations that protect participants", fb:"Permission and privacy protections are described in the plan, so that element is covered already."},
       {t:"The method for selecting a population or a sample from the group being studied", fb:"Drawing the sample from class lists is explained in the plan, so that element is covered already."}],
      "A project plan describes a question for investigation, a collection method with social considerations, a selection method, and a collection procedure. The plan still needs <b>the method to be used for collection of the data</b>.",
      {mode:"plan-collection"});
  },
  function(){
    return mcq("A project plan opens with this sentence: the project will investigate whether students who walk to school arrive more alert in first period than students who ride the bus. Which element of the project plan does this sentence belong to?",
      {t:"The question for investigation, in the wording that the project sets out to answer", fb:"Right: the sentence states what the project will investigate, which is its guiding question."},
      [{t:"The method for selecting a population or a sample from the group being studied", fb:"No people are selected in this sentence; it states what the project will investigate overall."},
       {t:"The method of data collection, in the social considerations that protect participants", fb:"No collection method or treatment of people appears in this sentence; it frames the study question."},
       {t:"The method to be used for collection of the data during the project field work", fb:"No gathering or recording steps appear in this sentence; it states the question the data must answer."}],
      "A project plan describes a question for investigation, a collection method with social considerations, a selection method, and a collection procedure. This sentence belongs to <b>the question for investigation</b>.",
      {mode:"plan-question"});
  }
]), ["A plan has four elements: its question, its collection method with social considerations, its selection method, and its collection procedure.", "Decide what the detail does in the plan: states the question, protects people, picks people, or gathers data."]);

E("u9-supported-conclusion", 9, ["11.9"], 3, "var", varset([
  function(){
    return mcq("For a project, a student surveys 40 students at school about getting to school. Of the 40 students, 30 say they walk, 6 ride a bus and 4 get a ride. Which conclusion does this data actually support?",
      {t:"Most of the 40 students surveyed said they walk to school on a regular school day", fb:"Right: 30 of 40 is most of the group surveyed, so the conclusion stays inside the data."},
      [{t:"Most students in the whole province walk to school on a regular school day each year", fb:"Forty students at one school cannot support a claim about a whole province of students."},
       {t:"Walking to school causes students to arrive at school feeling more alert each day", fb:"The survey counted travel methods only; it measured nothing about alertness or its causes."},
       {t:"Most of the 40 students surveyed said they ride a bus to school on a regular day", fb:"Only 6 of 40 named the bus, so this conclusion contradicts the numbers in the survey."}],
      "A conclusion must stay inside the data collected: 30 of the 40 students surveyed walk, and nothing wider was measured. The supported conclusion is <b>most of the 40 students surveyed said they walk to school</b>.",
      {mode:"conclusion-walk"});
  },
  function(){
    return mcq("For a project, a student grows 10 bean plants with extra light and 10 without it. After three weeks, 7 of the extra light plants are taller than the tallest plant grown without extra light. Which conclusion does this data actually support?",
      {t:"In this trial, most plants with extra light grew taller than the plants without it", fb:"Right: 7 of 10 beating every untreated plant supports a conclusion about this trial only."},
      [{t:"Extra light will make every bean plant grow taller in any garden or classroom trial", fb:"One small trial cannot promise results for every plant in any place it might be grown."},
       {t:"Extra light is the only reason any of the plants in the trial grew taller at all", fb:"Other factors also affect growth, and this trial never tested light as the only cause."},
       {t:"In this trial, most plants without extra light grew taller than the plants with it", fb:"The tallest plants were in the extra light group, so this conclusion contradicts the results."}],
      "A conclusion must stay inside the data collected: in this trial the extra light plants grew taller, and nothing wider was tested. The supported conclusion is <b>in this trial, most plants with extra light grew taller</b>.",
      {mode:"conclusion-plants"});
  },
  function(){
    return mcq("For a project, a student counts library loans over two school weeks. Fiction books were borrowed 120 times and non fiction books were borrowed 45 times during those two weeks. Which conclusion does this data actually support?",
      {t:"During those two weeks, fiction books were borrowed more often than non fiction books", fb:"Right: 120 loans against 45 loans supports a comparison limited to the two weeks counted."},
      [{t:"Fiction books are better written than non fiction books for student readers at school", fb:"Loan counts say nothing about writing quality; the project counted borrowing, not quality."},
       {t:"Every student in the school prefers fiction books over non fiction books this year", fb:"Loan counts over two weeks cannot show what every student prefers across a whole year."},
       {t:"During those two weeks, non fiction books were borrowed more often than fiction books", fb:"Non fiction had 45 loans against 120 for fiction, so this conclusion contradicts the counts."}],
      "A conclusion must stay inside the data collected: fiction loans outnumbered non fiction loans in the two weeks counted. The supported conclusion is <b>during those two weeks, fiction books were borrowed more often</b>.",
      {mode:"conclusion-library"});
  },
  function(){
    return mcq("For a project, a student records the recess temperature on 10 school days in May. On 6 of the 10 days the temperature was above 10 degrees, and on 4 days it was at or below 10 degrees. Which conclusion does this data actually support?",
      {t:"On most of the 10 days recorded, the recess temperature was above 10 degrees in May", fb:"Right: 6 of 10 days is most of the recorded days, so the conclusion matches the records."},
      [{t:"May is always the warmest month of the school year in this part of the province", fb:"Ten days in one month cannot rank all months, and no other month was recorded at all."},
       {t:"Warm recess weather causes students to play outside for longer at recess time", fb:"The project recorded temperatures only; it measured nothing about play time or its causes."},
       {t:"On most of the 10 days recorded, the recess temperature was at or below 10 degrees", fb:"Only 4 of 10 days were at or below 10 degrees, so this conclusion contradicts the records."}],
      "A conclusion must stay inside the data collected: 6 of the 10 recorded days were above 10 degrees, and nothing wider was measured. The supported conclusion is <b>on most of the 10 days recorded, the temperature was above 10 degrees</b>.",
      {mode:"conclusion-temp"});
  }
]), ["A supported conclusion says only what the numbers show, for the group and the time actually studied.", "Check each option against the numbers in the stem, and drop any option that reaches past them."]);

E("u9-self-assessment", 9, ["11.10"], 1, "var", varset([
  function(){
    return mcq("A rubric criterion says a project must select a population or a sample and justify the choice. For the project, a student asked only close friends and gave no reason for choosing them. Which self assessment statement is accurate for this criterion?",
      {t:"My project falls short on this criterion, because I asked only friends and gave no reason for the choice", fb:"Right: the statement honestly matches the criterion to what the project actually did."},
      [{t:"My project was excellent in every way, and the whole study went very well from start to finish overall", fb:"General praise names no criterion and no evidence, so it cannot judge this part of the project."},
       {t:"My project fully meets this criterion, because my friends enjoyed answering all of my questions in the survey", fb:"Enjoyment does not justify a sample choice; the criterion asks for a reasoned selection."},
       {t:"My project had a clear title page and neat charts, so this part of the project is strong and well organized", fb:"Titles and charts belong to other criteria; this criterion is about justifying who was asked."}],
      "Self assessment applies the rubric honestly to the work done: the project asked only friends with no justification, so it falls short on this criterion. The accurate statement is <b>my project falls short, because I asked only friends and gave no reason</b>.",
      {mode:"selfassess-sample"});
  },
  function(){
    return mcq("A rubric criterion says a data collection method must include social considerations, such as permission and privacy. For the project, a student asked permission before each interview and kept names off every form. Which self assessment statement is accurate for this criterion?",
      {t:"My project meets this criterion, because I asked permission first and kept names off every form I used", fb:"Right: the statement ties the criterion to two social considerations the project actually used."},
      [{t:"My project was really good overall, and I feel proud of how the whole study turned out in the end", fb:"General pride names no criterion and no evidence, so it cannot judge this part of the project."},
       {t:"My project falls short on this criterion, because my sample came from only one grade in the school", fb:"Sample grade range belongs to a different criterion; on social considerations this project delivered."},
       {t:"My project fully meets this criterion, because my interview questions were short and easy to read", fb:"Short questions aid clarity, but the criterion asks about permission and privacy protections."}],
      "Self assessment applies the rubric honestly to the work done: permission was asked and names were kept off forms, so the project meets this criterion. The accurate statement is <b>my project meets this criterion, because I asked permission and kept names off forms</b>.",
      {mode:"selfassess-social"});
  },
  function(){
    return mcq("A rubric criterion says findings must be communicated clearly, with labelled charts that an audience can read. For the project, a student presented one chart with no title and no labels on its axes. Which self assessment statement is accurate for this criterion?",
      {t:"My project partly meets this criterion, because my chart shows the data but has no title or axis labels", fb:"Right: the statement honestly credits the chart while naming exactly what the criterion still needs."},
      [{t:"My project was fantastic from beginning to end, and the presentation was the best part of my work", fb:"General praise names no criterion and no evidence, so it cannot judge this part of the project."},
       {t:"My project fully meets this criterion, because my audience clapped at the end of my presentation", fb:"Applause does not show clear communication; the criterion asks for labelled, readable charts."},
       {t:"My project falls short on this criterion, because my sample was drawn from a single classroom only", fb:"Sample source belongs to a different criterion; this criterion is about communicating the findings."}],
      "Self assessment applies the rubric honestly to the work done: the chart shows data but lacks a title and labels, so the project partly meets this criterion. The accurate statement is <b>my project partly meets this criterion, because the chart has no title or axis labels</b>.",
      {mode:"selfassess-charts"});
  },
  function(){
    return mcq("A rubric criterion says a project must state a clear question for investigation that data can answer. For the project, a student investigated one focused question: how many students walk to school each day. Which self assessment statement is accurate for this criterion?",
      {t:"My project meets this criterion, because my question was focused and my data answered it directly", fb:"Right: the statement ties the criterion to the focused question and the data that answered it."},
      [{t:"My project was strong in every area, and I would give the whole study full marks without changes", fb:"Full marks with no evidence names no criterion detail, so it cannot judge this part fairly."},
       {t:"My project falls short on this criterion, because my charts used colours that were hard to read", fb:"Chart colours belong to the communication criterion; the investigation question here was clear."},
       {t:"My project fully meets this criterion, because I finished the whole study before the deadline date", fb:"Finishing on time is not the criterion; it asks whether the question was clear and answerable."}],
      "Self assessment applies the rubric honestly to the work done: the question was focused and the data answered it, so the project meets this criterion. The accurate statement is <b>my project meets this criterion, because my question was focused and my data answered it</b>.",
      {mode:"selfassess-question"});
  }
]), ["Self assessment means applying the rubric criterion to what the project actually did, with evidence.", "Match the criterion to the project detail first; vague praise and unrelated strengths do not count."]);

