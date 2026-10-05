// Weekly meal plans. A meal is either { r: 'recipe-slug', label?, note? } or { t: 'plain text' }.
// "serves" on a person sets how many servings their recipe links open at.
const r = (slug, extra) => Object.assign({ r: slug }, extra || {});
const t = text => ({ t: text });

const FRUIT = [
  ['Banana and pear', 'Blueberries and strawberries', 'Pear and banana', 'Banana and blueberries', 'Strawberries and pear', 'Blueberries and banana', 'Pear and strawberries'],
  ['Pear and blueberries', 'Banana and strawberries', 'Blueberries and pear', 'Strawberries and banana', 'Pear and banana', 'Blueberries and strawberries', 'Banana and pear']
];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const TOM_BREAKFAST = ['Yoghurt bowl', 'Yoghurt bowl', 'Yoghurt bowl', 'Yoghurt bowl', 'Yoghurt bowl', 'Eggs, toast and bacon', 'Eggs, toast and bacon'];
function tomLunch(w) {
  const ham = !!w.mondayTed;
  return [
    r('roast-chicken-caesar-sandwich', { label: ham ? 'Ham Caesar Sandwich' : 'Roast Chicken Caesar Sandwich', note: ham ? 'Make the filling on Sunday night with 140g of ham, because there is no roast chicken this week. It covers Monday and Tuesday.' : 'Make the filling on Sunday night with chicken from the roast. It covers Monday and Tuesday.' }),
    r('roast-chicken-caesar-sandwich', { label: ham ? 'Ham Caesar Sandwich, Second Lunch' : 'Chicken Caesar Sandwich, Second Lunch' }),
    t('Jacket potato with half a jar of Bold Bean baked beans and 20g of cheddar, or with cottage cheese and ham. A piece of fruit.'),
    t('A portion of red lentil curry from the freezer, with a handful of frozen spinach stirred in. A slice of toast if you are still hungry.'),
    t('A small tub of Thursday\'s beef, potatoes and carrots, with a slice of toast and a piece of fruit.'),
    t('An omelette made with 3 eggs, ham and 30g of cheddar, with cherry tomatoes cooked in the pan and a slice of toast.'),
    t('Beans on toast with a poached egg.')
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
    'Curry. The extra portion comes out of the freezer on Tuesday night with Wednesday\'s dinner. Reheat it until piping hot.',
    'Beef. Box about a third of your portion on Thursday night, before you sit down to eat.',
    'Fruit. Pack a piece of fruit, such as an apple, a pear or a satsuma, with every weekday lunch.'
  ] },
  { title: 'Daily Target', text: 'About 1,900 calories a day, which is the NHS figure for men losing weight. That is about 400 for breakfast, 500 for lunch, 750 for dinner and 250 for snacks, mostly fruit.' }
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
    [t('At nursery'), r('red-lentil-curry', { label: 'Red Lentil Curry with Rice', note: 'Shared with you, from Ted\'s tub in the freezer.' })],
    [r('potato-cakes', { note: 'With Granny. Made on Wednesday.' }), r('mini-pork-meatballs', { note: 'From the freezer. Defrost on Wednesday night.' })],
    [r('eggy-crumpet'), r('tomato-fusilli', w.friday ? {} : { note: 'The Bolognese is too salty for Ted.' })],
    [r('banana-oat-pancakes'), r('pea-risotto')],
    [w.tedSundayLunch || r('scrambled-egg-toast-avocado'), w.pork ? r('roast-pork-belly', { label: 'Pork Belly with Mash, Carrots and Broccoli', note: 'Shared with you.' }) : r('roast-chicken', { label: 'Roast Chicken with Mash, Carrots and Broccoli', note: 'Shared with you.', serves: 4 })]
  ];
  const adults = [
    [t('Chilli Con Carne'), t('From the freezer')],
    [w.tuesday || r('carnitas-tacos'), t('From the freezer, crisped in 15 minutes')],
    [w.wednesday || r('red-lentil-curry', { note: 'Shared with Ted. Cook 75g of rice for each of you and a little for Ted.' }), t('From the freezer')],
    [r('red-wine-burnt-onion-beef', { note: 'Box about a third of Tom\'s portion before you sit down, for his lunch on Friday.' }), t('Beef from the freezer, butter beans in 20 minutes')],
    [w.friday || r('batalis-bolognese'), w.friday ? t('Nothing to cook') : t('From the freezer, pasta in 12 minutes')],
    [w.saturday, t(w.saturdayWhen)],
    [w.pork ? r('roast-pork-belly', { note: 'Shared with Ted. One pork belly chunky each.' }) : r('roast-chicken', { note: 'Shared with Ted. Keep about 140g of chicken for Tom\'s sandwiches and a little for Ted\'s couscous.', serves: 4 }), t('Cooked on the day')]
  ];
  const freezer = [
    'Sunday night. Move a tub of chilli to the fridge for Monday.',
    'Monday night. Move a tub of carnitas pork to the fridge for Tuesday.',
    'Tuesday night. Move the curry for Wednesday, one more portion for Tom\'s lunch on Thursday, and one of Ted\'s curry tubs to the fridge.',
    'Wednesday night. Move a tub of beef and a portion of Ted\'s meatballs to the fridge for Thursday.'
  ];
  if (!w.friday) freezer.push('Thursday night. Move a tub of Bolognese to the fridge for Friday.');
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
          { title: 'Thursday with Granny', text: 'Make the potato cakes on Wednesday evening and move a portion of meatballs from the freezer to the fridge. Granny can serve the potato cakes cold or warmed through. She should reheat the meatballs and their sauce until piping hot and let them cool before serving. Pack a pot of yoghurt and the cut fruit in the same bag.' }
        ]
      },
      {
        name: 'Tom & Sophie', serves: 2,
        columns: ['Dinner', 'When It\'s Cooked'],
        intro: w.intro,
        rows: DAYS.map((d, i) => [d, adults[i][0], adults[i][1]]),
        boxes: (w.boxes || []).concat([{ title: 'Out of the Freezer', list: freezer }, VEG_BOX])
      },
      {
        name: 'Tom', serves: 2,
        columns: ['Breakfast', 'Lunch'],
        intro: 'Breakfast and lunch for losing weight, at about 1,900 calories a day. Weekday lunches go to the coworking space, which has a microwave and a toaster.',
        rows: DAYS.map((d, i) => [d, t(TOM_BREAKFAST[i]), tomLunch(w)[i]]),
        boxes: TOM_BOXES
      }
    ]
  };
}

module.exports = [
  week({
    n: 0, id: '2026-10-05', title: 'Week of 5 October',
    intro: 'The first of four repeating weeks. Everything from Monday to Friday is batch cooked on Saturday 3 and Sunday 4 October.',
    mondayTed: r('cheese-on-toast-fingers', { note: 'No roast the day before this week.' }),
    tedMonday: [r('scrambled-egg-toast-avocado', { note: 'Home from nursery before lunch today.' }), r('mini-pork-meatballs', { label: 'Mini Pork Meatballs with Fusilli', note: 'Uses the spare portion of meatballs from the freezer. Defrost it in the microwave and reheat until piping hot.' })],
    tuesday: r('carnitas-tacos', { note: 'Movie night with 2 guests, so this makes 4 portions.', serves: 4 }),
    saturday: r('pork-larb', { note: 'Cook 40g more rice and 80ml more water than the recipe says, which leaves enough for Ted\'s egg fried rice on Sunday. Use a 500g pack of 5% fat pork mince.' }), saturdayWhen: '20 minutes on the night', saturdayMeat: 'pork mince',
    tedSundayLunch: r('egg-fried-rice', { note: 'Uses rice left from Saturday\'s larb.' }),
    boxes: [
      { title: 'Saturday 3 October Batch Cook', list: [
        'Morning. Cook one batch of the beef, which uses 2.7kg of shin and makes 8 servings, in the oven at 160°C for 3½ hours. Use your largest casserole, or split it between 2.',
        'While the beef cooks, make the red lentil curry at 3× the batch. Leave out the chilli, chilli powder and salt, spoon out 4 small portions for Ted before the almond butter goes in, then fry the chilli and chilli powder in a little oil and stir them into the rest with the salt and almond butter.',
        'Afternoon. Make Ted\'s meatballs in the air fryer, using 1 pack of the pork mince.',
        'Evening. Cool everything and freeze it. The beef goes in 4 tubs of 2 portions, the curry in 2-portion tubs with Ted\'s in small tubs, and the meatballs in 5 portions with their sauce. Make the butter beans fresh on the night you eat the beef.'
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
    saturday: r('sausage-mash-gravy-cabbage'), saturdayWhen: '25 minutes on the night', saturdayMeat: 'sausages'
  }),
  week({
    n: 0, id: '2026-10-19', title: 'Week of 19 October',
    intro: 'The third of four repeating weeks.',
    mondayTed: r('cheese-on-toast-fingers', { note: 'Sunday was pork belly, so there is no chicken to use up.' }),
    saturday: r('pork-larb', { note: 'Cook 40g more rice and 80ml more water than the recipe says, which leaves enough for Ted\'s egg fried rice on Sunday. Use a 500g pack of 5% fat pork mince.' }), saturdayWhen: '20 minutes on the night', saturdayMeat: 'pork mince',
    tedSundayLunch: r('egg-fried-rice', { note: 'Uses rice left from Saturday\'s larb.' })
  }),
  week({
    n: 1, id: '2026-10-26', title: 'Week of 26 October',
    intro: 'The last of four repeating weeks. This uses up the last of the batch cooking, apart from a few portions of curry. Sunday is pork belly in place of chicken.',
    pork: true,
    saturday: r('sausage-mash-gravy-cabbage'), saturdayWhen: '25 minutes on the night', saturdayMeat: 'sausages'
  })
];
