// Weekly meal plans. A meal is either { r: 'recipe-slug', label?, note? } or { t: 'plain text' }.
// "serves" on a person sets how many servings their recipe links open at.
const r = (slug, extra) => Object.assign({ r: slug }, extra || {});
const t = (text, extra) => Object.assign({ t: text }, extra || {});
// Calories and plate weight for one adult. kcal is an estimate, g is the weight of one plate, parts says what makes up that weight.
const k = (kcal, g, parts) => ({ kcal, g, parts });
const FRUIT_NOTE = ', and a piece of fruit';
const KCAL = {
  'red-wine-burnt-onion-beef': k(900, 640, '550g beef stew, 90g butter beans'),
  'carnitas-tacos': k(720, 290, '150g pork, 3 small tortillas weighing 90g, 50g onion, coriander and lime'),
  'red-lentil-curry': k(770, 580, '350g curry, 230g cooked rice from 75g dry'),
  'batalis-bolognese': k(950, 530, '320g sauce, 200g cooked pasta from 80g dry, 7g Parmesan'),
  'pork-larb': k(700, 500, '170g cooked pork, 230g cooked rice from 75g dry, 100g lettuce and herbs'),
  'roast-chicken': k(700, 600, '150g chicken, 230g potatoes, 170g vegetables, 50ml gravy'),
  'roast-pork-belly': k(1050, 700, '1 pork belly chunky weighing about 170g cooked, 330g mash, 200g vegetables'),
  'sausage-mash-gravy-cabbage': k(950, 790, '3 Cumberland sausages weighing 145g cooked, 430g mash, 150g cabbage, 70ml gravy'),
  'hainanish-soy-poached-chicken': k(650, 440, '150g chicken, 200g cooked rice from 65g dry, 60g cucumber and spring onion, 30g sauce'),
  'roast-chicken-caesar-sandwich': k(390, 245, '2 slices of bread weighing 80g, 70g chicken, 95g filling')
};
// Adds the calorie figures to a recipe meal unless the meal sets its own.
const withK = c => (c.r && KCAL[c.r] && c.kcal === undefined ? Object.assign({}, KCAL[c.r], c) : c);

const FRUIT = [
  ['Banana and pear', 'Blueberries and strawberries', 'Pear and banana', 'Banana and blueberries', 'Strawberries and pear', 'Blueberries and banana', 'Pear and strawberries'],
  ['Pear and blueberries', 'Banana and strawberries', 'Blueberries and pear', 'Strawberries and banana', 'Pear and banana', 'Blueberries and strawberries', 'Banana and pear']
];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const YOG = t('Yoghurt bowl', k(385, 430, '200g yoghurt, 30g granola, 80g berries, 1 banana'));
const EGGS = t('Eggs, toast and bacon', k(375, 175, '2 eggs, 1 slice of toast weighing 40g, 2 rashers of streaky bacon'));
const TOM_BREAKFAST = [YOG, YOG, YOG, YOG, YOG, EGGS, EGGS];
const CHICKEN_LUNCH = k(650, 480, '150g chicken, 200g cooked rice, 130ml broth' + FRUIT_NOTE);
function tomLunch(w) {
  return [
    w.monTueLunch ? w.monTueLunch[0] : r('roast-chicken-caesar-sandwich', { label: 'Roast Chicken Caesar Sandwich', note: 'Make the filling on Sunday night with chicken from the roast. It covers Monday and Tuesday for you both.', serves: 4 }),
    w.monTueLunch ? w.monTueLunch[1] : r('roast-chicken-caesar-sandwich', { label: 'Chicken Caesar Sandwich, Second Lunch', serves: 4 }),
    t('Jacket potato with half a jar of Bold Bean baked beans and 20g of cheddar each, or with cottage cheese and ham. A piece of fruit.', k(490, 470, '250g potato, 200g beans, 20g cheddar' + FRUIT_NOTE)),
    w.thursdayLunch ? w.thursdayLunch : w.beefFriday ? t('A portion each of Wednesday\'s soy-poached chicken, with a tub of the rice and broth. Reheat until piping hot. A piece of fruit.', CHICKEN_LUNCH) : t('A portion each of red lentil curry from the freezer, with a handful of frozen spinach stirred in. A slice of toast if you are still hungry.', k(520, 380, '350g curry, 30g spinach. A slice of toast adds 95 kcal')),
    w.beefFriday ? t('The last of Wednesday\'s soy-poached chicken, with the frozen rice and some broth. Reheat until piping hot. A piece of fruit.', CHICKEN_LUNCH) : t('A pot of fresh soup each, such as minestrone or lentil and bacon, with a bread roll and a piece of fruit.', k(510, 660, '600g soup, 60g roll' + FRUIT_NOTE)),
    t('An omelette made with 3 eggs, ham and 30g of cheddar each, with cherry tomatoes cooked in the pan and a slice of toast.', k(550, 360, '3 eggs, 40g ham, 30g cheddar, 100g tomatoes, 1 slice of toast weighing 40g')),
    t('Beans on toast with a poached egg.', k(425, 330, '200g beans, 2 slices of toast weighing 80g, 1 egg'))
  ];
}
const TOM_BOXES = [
  { title: 'Breakfasts', list: [
    'Yoghurt bowl. 200g of 0% fat Greek yoghurt, 30g of granola, berries and a sliced banana. Weigh the granola once to see what 30g looks like.',
    'Eggs, toast and bacon. Two poached eggs on a slice of toast, with two rashers of streaky bacon grilled.',
    'Any day. Porridge made with 50g of oats and 250ml of semi-skimmed milk, with a sliced banana and berries, works in place of the yoghurt bowl.',
    'Any day. 45g of Shredded Wheat with semi-skimmed milk and a banana works in place of the yoghurt bowl.'
  ] },
  { title: 'Lunch Notes', list: [
    'Jacket potato. Prick the potato and microwave it at work for 8 to 10 minutes, then heat the beans for 1 to 2 minutes.',
    'Curry. Two extra portions come out of the freezer on Tuesday night with Wednesday\'s dinner. Reheat them until piping hot.',
    'Fruit. Pack a piece of fruit, such as an apple, a pear or a satsuma, with every weekday lunch.'
  ] },
  { title: 'Daily Target', text: 'For Tom, about 1,900 calories a day, which is the NHS figure for men losing weight. That is about 400 for breakfast, 500 for lunch, 750 for dinner and 250 for snacks, mostly fruit.' },
  { title: 'Calories & Portions', text: 'Each meal shows the calories for one person and what one person\'s plate should weigh. Weigh the plate once or twice to learn what the portion looks like. The figure beside each day adds up breakfast, lunch and dinner, and leaves out snacks and extra vegetables. The calories are estimates from standard figures for each ingredient, so treat them as a guide to within about 10%.' }
];
const VEG_BOX = { title: 'Extra Fruit & Veg', list: [
  'Every night. About 80g each of frozen peas, green beans, broccoli or edamame, microwaved for 3 to 4 minutes.',
  'Tacos. Add a tin of black beans and some sweetcorn to the filling.',
  'Bolognese. Stir a tin of green lentils into the sauce when you reheat it.',
  'Curry. Stir a handful of frozen spinach into each portion as it reheats.',
  'Larb. Add the mangetout and serve it with a bag of microwaved green beans.'
] };

// One repeating week. "w" holds the few things that differ from week to week.
function week(w) {
  const fruit = FRUIT[w.n % 2];
  const ted = [
    w.tedMonday || [t('At nursery'), w.mondayTed || r('chicken-couscous', { note: 'Uses chicken left from Sunday\'s roast. Shred it into the couscous and warm it through until piping hot.' })],
    [t('At nursery'), r('spinach-omelette-wedges')],
    [t('At nursery'), r('red-lentil-curry', { label: 'Red Lentil Curry with Rice', note: w.beefFriday ? 'From Ted\'s tub in the freezer.' : 'Shared with you, from Ted\'s tub in the freezer.' })],
    [r('potato-cakes', { note: 'With Granny. Made on Wednesday.' }), r('tomato-fusilli', { note: 'With Granny. Made on Wednesday.' })],
    [r('eggy-crumpet'), r('jacket-potato-cheddar-beans', w.friday ? {} : { note: 'The Bolognese is too salty for Ted.' })],
    [r('banana-oat-pancakes'), r('pea-risotto')],
    [w.tedSundayLunch || r('scrambled-egg-toast-avocado'), w.pork ? r('roast-pork-belly', { label: 'Pork Belly with Mash, Carrots and Broccoli', note: 'Shared with you.' }) : r('roast-chicken', { label: 'Roast Chicken with Mash, Carrots and Broccoli', note: 'Shared with you.', serves: 4 })]
  ];
  const adults = [
    w.monday || [t('Chilli Con Carne', k(720, 580, '350g chilli, 230g cooked rice from 75g dry')), t('From the freezer')],
    [w.tuesday || r('carnitas-tacos'), t('From the freezer, crisped in 15 minutes')],
    [w.wednesday || r('red-lentil-curry', { note: 'Shared with Ted. Cook 75g of rice for each of you and a little for Ted.' }), t(w.wednesdayWhen || 'From the freezer')],
    w.beefFriday
      ? [r('red-lentil-curry', { note: 'Moved from Wednesday this week.' }), t('From the freezer')]
      : [r('red-wine-burnt-onion-beef'), t('Beef from the freezer, butter beans in 20 minutes')],
    w.beefFriday
      ? (w.fridayAdults || [r('red-wine-burnt-onion-beef', { note: 'Moved from Thursday this week, in place of the Bolognese.' }), t('Beef from the freezer, butter beans in 20 minutes')])
      : [w.friday || r('batalis-bolognese'), w.friday ? t('Nothing to cook') : t('From the freezer, pasta in 12 minutes')],
    [w.saturday, t(w.saturdayWhen)],
    [w.pork ? r('roast-pork-belly', { note: 'Shared with Ted. One pork belly chunky each.' }) : r('roast-chicken', { note: 'Shared with Ted. Keep about 250g of chicken for your sandwiches and a little for Ted\'s couscous.', serves: 4 }), t('Cooked on the day')]
  ];
  const freezer = (w.freezerExtra || []).concat([
    'Sunday night. Move a tub of chilli to the fridge for Monday.',
    w.beefFriday ? 'Monday night. Move a tub of carnitas pork to the fridge for Tuesday, and a whole chicken for Wednesday.' : 'Monday night. Move a tub of carnitas pork to the fridge for Tuesday.',
    w.beefFriday ? 'Tuesday night. Move one of Ted\'s curry tubs to the fridge for Wednesday.' : 'Tuesday night. Move the curry for Wednesday, two more portions for your lunches on Thursday, and one of Ted\'s curry tubs to the fridge.',
    w.beefFriday ? 'Wednesday night. Move 2 portions of curry to the fridge for Thursday.' : 'Wednesday night. Move a tub of beef to the fridge for Thursday.'
  ]);
  if (w.beefFriday) freezer.push(w.fridayAdults ? 'Thursday night. Move the frozen rice to the fridge for Friday lunch.' : 'Thursday night. Move a tub of beef to the fridge for Friday, and the frozen rice for Friday lunch.');
  if (!w.friday && !w.beefFriday) freezer.push('Thursday night. Move a tub of Bolognese to the fridge for Friday.');
  if (!w.pork) freezer.push('Friday morning. Move the chicken to the fridge for Sunday.');
  freezer.push('Friday night. Move the ' + w.saturdayMeat + ' to the fridge for Saturday.');
  if (w.pork) freezer.push('Saturday night. Move 2 pork belly chunkies to the fridge for Sunday.');
  return {
    id: w.id, start: w.id, title: w.title,
    people: [
      {
        name: 'Ted', serves: 1,
        columns: ['Lunch', 'Dinner or Supper', 'Fruit'],
        intro: 'Nursery on Monday, Tuesday and Wednesday, where Ted has lunch and tea, so he has a small supper at home. Granny on Thursday, with both meals made ahead. The same week repeats until 1 November.',
        rows: DAYS.map((d, i) => [d, ted[i][0], ted[i][1], t(fruit[i])]),
        boxes: [
          { title: 'Thursday with Granny', text: 'Make the potato cakes and the fusilli on Wednesday evening and keep them in labelled tubs in the fridge. Granny can serve the potato cakes cold or warmed through. She should reheat the fusilli until piping hot with a splash of milk and let it cool before serving. Pack a pot of yoghurt and the cut fruit in the same bag.' }
        ]
      },
      {
        name: 'Tom & Sophie', serves: 2,
        columns: ['Breakfast', 'Lunch', 'Dinner', 'When It\'s Cooked'],
        intro: w.intro + ' Weekday lunches are packed for the coworking space, which has a microwave and a toaster.',
        rows: DAYS.map((d, i) => [d, TOM_BREAKFAST[i], withK(tomLunch(w)[i]), withK(adults[i][0]), adults[i][1]]),
        dayTotal: true,
        boxes: (w.boxes || []).concat([{ title: 'Out of the Freezer', list: freezer }, VEG_BOX], TOM_BOXES)
      }
    ]
  };
}

module.exports = [
  week({
    n: 0, id: '2026-10-05', title: 'Week of 5 October',
    intro: 'The first of four repeating weeks. Everything from Monday to Friday is batch cooked on Saturday 3 and Sunday 4 October.',
    mondayTed: r('cheese-on-toast-fingers', { note: 'No roast the day before this week.' }),
    beefFriday: true,
    monTueLunch: [
      t('Leftover beef stew from the batch cook.', k(790, 550, '550g beef stew')),
      t('The chilli con carne that came out of the freezer for Monday dinner. It defrosted on Sunday night, so eat it today. Serve it with 75g of rice each, cooked on Monday night and cooled within an hour, and reheat both until piping hot. If the chilli is still in the freezer, leave it there and have the second portion of beef stew.', k(720, 580, '350g chilli, 230g cooked rice from 75g dry'))
    ],
    monday: [
      r('sausage-mash-gravy-cabbage', Object.assign({ label: 'Sausage and Mash with Chipolatas', note: 'In place of the chilli. Uses the 10 chipolatas from the freezer, 5 each, in place of the Cumberland sausages. Cook them from frozen, which takes a few minutes longer, until there is no pink in the middle.' }, k(850, 760, '5 chipolatas weighing 110g cooked, 430g mash, 150g cabbage, 70ml gravy'))),
      t('Chipolatas from the freezer, 35 minutes on the night')
    ],
    freezerExtra: ['Monday night. Freeze the second portion of beef stew if the chilli is in the fridge for Tuesday lunch.'],
    fridayAdults: [t('Tom is out. Sophie has fish fingers.', Object.assign(k(290, 140, '5 fish fingers'), { noTotal: true })), t('About 15 minutes in the air fryer')],
    wednesday: r('hainanish-soy-poached-chicken', { note: 'Uses a whole chicken from the freezer, moved to the fridge on Monday night. It makes about 6 portions. Keep 2 portions of chicken and about 1 litre of the poaching broth for Thursday\'s soup, and box 2 with rice and broth for your lunches on Friday. Freeze Friday\'s rice as soon as it has cooled, because cooked rice keeps only a day in the fridge.', serves: 6 }),
    wednesdayWhen: '1 hour 30 minutes of poaching, 30 minutes of work',
    thursdayLunch: t('Chicken and sweetcorn soup, from Tom Kerridge\'s Lose Weight for Good, page 70. Make it on Wednesday night with the leftover soy-poached chicken and the poaching broth in place of chicken stock, then split it into 2 tubs. Take the skin off the chicken and use about 100g each, and measure the sesame oil with a spoon. Reheat until piping hot. A piece of fruit.', k(410, 500, '500g soup with 100g chicken' + FRUIT_NOTE)),
    tedMonday: [r('scrambled-egg-toast-avocado', { note: 'Home from nursery before lunch today.' }), r('egg-fried-rice', { note: 'There is no rice from yesterday, so cook 40g of rice at lunchtime. Spread it on a plate to cool, get it into the fridge within an hour, and fry it at teatime.' })],
    tuesday: r('carnitas-tacos', { note: 'Movie night with 2 guests, so this makes 4 portions.', serves: 4 }),
    saturday: r('pork-larb', { note: 'Cook 40g more rice and 80ml more water than the recipe says, which leaves enough for Ted\'s egg fried rice on Sunday. Use a 500g pack of 5% fat pork mince.' }), saturdayWhen: '20 minutes on the night', saturdayMeat: 'pork mince',
    tedSundayLunch: r('egg-fried-rice', { note: 'Uses rice left from Saturday\'s larb.' }),
    boxes: [
      { title: 'Saturday 3 October Batch Cook', list: [
        'Morning. Cook one batch of the beef, which uses 2.7kg of shin and makes 8 servings, in the oven at 160°C for 3½ hours. Use your largest casserole, or split it between 2.',
        'While the beef cooks, make the red lentil curry at 3× the batch. Leave out the chilli, chilli powder and salt, spoon out 4 small portions for Ted before the almond butter goes in, then fry the chilli and chilli powder in a little oil and stir them into the rest with the salt and almond butter.',
        'Evening. Cool everything and freeze it. The beef goes in 4 tubs of 2 portions, the curry in 2-portion tubs with Ted\'s in small tubs. Make the butter beans fresh on the night you eat the beef.'
      ] },
      { title: 'Sunday 4 October Batch Cook', list: [
        'Morning. Make one batch of the carnitas, which is the 2.5kg joint and makes about 10 servings. It cooks on low in the slow cooker for 9 to 10 hours.',
        'Late morning. Make the Bolognese and leave it to simmer for 2 to 3 hours.',
        'Afternoon. Cool the Bolognese and freeze it in 3 tubs of 2 portions.',
        'Evening. Shred the pork. Keep 4 portions and some of the liquid in the fridge for Tuesday\'s movie night, and freeze the rest in 3 tubs of 2 portions, with any extra in a small tub for lunches.'
      ] },
      { title: 'When the Meat Arrives', text: 'The braising steak and lardons come with the Sainsbury\'s delivery on Thursday 1 October. Pipers delivers frozen, and its earliest delivery is Friday 2 October. When it arrives, put the pork shoulder, the beef mince and the 3 packs of pork mince in the fridge to defrost for the batch cook. Freeze the 2 chickens, the 4 pork belly chunkies, the 2 packs of meatballs, the sausages and the bacon. The meatballs are now spare for a treat night.' }
    ]
  }),
  week({
    n: 1, id: '2026-10-12', title: 'Week of 12 October',
    intro: 'The second of four repeating weeks. Tom is out on Wednesday and you are both out on Friday. Sunday is pork belly in place of chicken.',
    pork: true,
    wednesday: r('red-lentil-curry', { label: 'Red Lentil Curry for Sophie', note: 'Tom is out. One portion, with 75g of rice and a little for Ted.', serves: 1 }),
    friday: t('Out for dinner'),
    saturday: r('sausage-mash-gravy-cabbage', { note: 'Buy 6 Cumberland sausages in an earlier shop and freeze them, because the freezer sausages went on Monday 5 October.' }), saturdayWhen: '25 minutes on the night', saturdayMeat: 'sausages'
  }),
  week({
    n: 0, id: '2026-10-19', title: 'Week of 19 October',
    intro: 'The third of four repeating weeks.',
    monTueLunch: [t('A tub of Bolognese from the freezer, shared, with 60g of pasta each. A piece of fruit.', k(900, 465, '320g sauce, 145g cooked pasta from 60g dry' + FRUIT_NOTE)), t('The second spare tub of Bolognese, with 60g of pasta each. A piece of fruit.', k(900, 465, '320g sauce, 145g cooked pasta from 60g dry' + FRUIT_NOTE))],
    freezerExtra: ['Sunday and Monday nights. Also move a tub of Bolognese to the fridge for the next day\'s lunch.'],
    mondayTed: r('cheese-on-toast-fingers', { note: 'Sunday was pork belly, so there is no chicken to use up.' }),
    saturday: r('pork-larb', { note: 'Cook 40g more rice and 80ml more water than the recipe says, which leaves enough for Ted\'s egg fried rice on Sunday. Use a 500g pack of 5% fat pork mince.' }), saturdayWhen: '20 minutes on the night', saturdayMeat: 'pork mince',
    tedSundayLunch: r('egg-fried-rice', { note: 'Uses rice left from Saturday\'s larb.' })
  }),
  week({
    n: 1, id: '2026-10-26', title: 'Week of 26 October',
    intro: 'The last of four repeating weeks. This uses up the last of the batch cooking, apart from a few portions of curry. Sunday is pork belly in place of chicken.',
    pork: true,
    saturday: r('sausage-mash-gravy-cabbage', { note: 'Buy 6 Cumberland sausages in an earlier shop and freeze them, because the freezer sausages went on Monday 5 October.' }), saturdayWhen: '25 minutes on the night', saturdayMeat: 'sausages'
  })
];
