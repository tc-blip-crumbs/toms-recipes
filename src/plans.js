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
const BOLOGNESE_LUNCH = k(900, 465, '320g sauce, 145g cooked pasta from 60g dry' + FRUIT_NOTE);
// const CHICKEN_POT = 'Uses a whole chicken from the freezer, moved to the fridge on Monday night. It feeds the 2 of you tonight, and everything left goes into Thursday\'s soup, so keep the leftover chicken and about 1 litre of the poaching broth.';
const SOUP = r('chicken-sweetcorn-soup', Object.assign({ note: 'Made on Wednesday night.', serves: 2 }, k(385, 400, '')));
const CHICKEN_LUNCH = k(650, 480, '150g chicken, 200g cooked rice, 130ml broth' + FRUIT_NOTE);
function tomLunch(w) {
  return [
    w.monTueLunch ? w.monTueLunch[0] : r('roast-chicken-caesar-sandwich', { label: 'Roast Chicken Caesar Sandwich', serves: 4 }),
    w.monTueLunch ? w.monTueLunch[1] : r('roast-chicken-caesar-sandwich', { label: 'Roast Chicken Caesar Sandwich', serves: 4 }),
    t('Jacket potato with beans and cheddar', k(490, 470, '250g potato, 200g beans, 20g cheddar' + FRUIT_NOTE)),
    SOUP,
    t('Pea and crème fraîche soup', Object.assign({ note: 'Sainsbury\'s, one pot each.' }, k(260, 400, ''))),
    t('Ham and cheese omelette with tomatoes', k(550, 360, '3 eggs, 40g ham, 30g cheddar, 100g tomatoes, 1 slice of toast weighing 40g')),
    t('Beans on toast with a poached egg', k(425, 330, '200g beans, 2 slices of toast weighing 80g, 1 egg'))
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
    'Friday. Buy 2 pots of Sainsbury\'s Petits Pois & Crème Fraîche soup in the weekly shop.',
    'Soup day. Thursday\'s soup uses the chicken and broth left from Wednesday dinner. Buy 2 corn on the cob and the other soup ingredients in the weekly shop.',
    'Fruit. Pack a piece of fruit, such as an apple, a pear or a satsuma, with every weekday lunch.'
  ] },
  { title: 'Daily Target', text: 'About 1,900 calories a day for Tom, including about 250 for snacks.' }
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
    w.tedMonday || [t('At nursery'), w.mondayTed || r('chicken-couscous', { note: 'Chicken from Sunday.' })],
    [t('At nursery'), r('spinach-omelette-wedges')],
    [t('At nursery'), r('red-lentil-curry', { label: 'Red Lentil Curry with Rice', note: 'From the freezer.' })],
    [r('potato-cakes', { note: 'With Granny.' }), r('tomato-fusilli', { note: 'With Granny.' })],
    [r('eggy-crumpet'), r('jacket-potato-cheddar-beans')],
    [r('banana-oat-pancakes'), r('pea-risotto')],
    [w.tedSundayLunch || r('scrambled-egg-toast-avocado'), w.pork ? r('roast-pork-belly', { label: 'Pork Belly with Mash, Carrots and Broccoli', note: 'Shared with you.' }) : r('roast-chicken', { label: 'Roast Chicken with Mash, Carrots and Broccoli', note: 'Shared with you.', serves: 4 })]
  ];
  const adults = [
    w.monday || [t('Chilli con carne', Object.assign({ note: 'From the freezer.' }, k(720, 580, '')))],
    [w.tuesday || r('carnitas-tacos', { note: 'From the freezer.' })],
    [r('hainanish-soy-poached-chicken', { note: (w.wednesdayNote ? w.wednesdayNote + ' ' : '') + 'Keep the leftovers for the soup.', serves: 2 })],
    [r('red-lentil-curry', { note: 'From the freezer.' })],
    w.fridayAdults || [r('red-wine-burnt-onion-beef', { note: 'Beef from the freezer.' })],
    [w.saturday],
    [w.pork ? r('roast-pork-belly', { note: 'Shared with Ted.' }) : r('roast-chicken', { note: 'Shared with Ted. Keep 250g for sandwiches.', serves: 4 })]
  ];
  // Jobs for each day, done on that day. Each one is a short command.
  const jobs = { Sunday: ['Move a tub of chilli to the fridge.'], Monday: ['Move a tub of carnitas pork and the whole chicken to the fridge.'], Tuesday: ['Move a tub of Ted\'s curry to the fridge.'],
    Wednesday: ['Make the chicken soup.', 'Make Ted\'s potato cakes and fusilli for Granny.', 'Move 2 portions of curry to the fridge.'], Thursday: [], Friday: [], Saturday: [] };
  if (!w.fridayAdults) jobs.Thursday.push('Move a tub of beef to the fridge.');
  if (!w.pork) jobs.Friday.push('Move the chicken to the fridge.');
  jobs.Friday.push('Move the ' + w.saturdayMeat + ' to the fridge.');
  if (w.pork) jobs.Saturday.push('Move 2 pork belly chunkies to the fridge.');
  (w.jobs || []).forEach(([d, x]) => jobs[d].push(x));
  return {
    id: w.id, start: w.id, title: w.title,
    people: [
      {
        name: 'Ted', serves: 1,
        columns: ['Lunch', 'Dinner or Supper', 'Fruit'],
        intro: 'Nursery on Monday to Wednesday, so a small supper at home. Granny on Thursday.',
        rows: DAYS.map((d, i) => [d, ted[i][0], ted[i][1], t(fruit[i])]),
        boxes: [
          { title: 'Thursday with Granny', text: 'Potato cakes cold or warmed through. Reheat the fusilli until piping hot with a splash of milk, then let it cool. Pack a yoghurt and the fruit.' }
        ]
      },
      {
        name: 'Tom & Sophie', serves: 2,
        columns: ['Breakfast', 'Lunch', 'Dinner', 'Jobs'],
        intro: w.intro,
        rows: DAYS.map((d, i) => [d, TOM_BREAKFAST[i], withK(tomLunch(w)[i]), withK(adults[i][0]), { jobs: jobs[d] }]),
        dayTotal: true,
        boxes: (w.boxes || []).concat([VEG_BOX], TOM_BOXES)
      }
    ]
  };
}

module.exports = [
  week({
    n: 0, id: '2026-10-05', title: 'Week of 5 October',
    intro: 'The first of four repeating weeks.',
    mondayTed: r('cheese-on-toast-fingers'),
    monTueLunch: [
      t('Beef stew with a rice pouch', k(670, 450, '')),
      t('Chilli con carne with rice', k(720, 580, ''))
    ],
    monday: [
      r('sausage-mash-gravy-cabbage', Object.assign({ label: 'Sausage and Mash', note: 'Chipolatas from the freezer, cooked from frozen.' }, k(875, 840, '')))
    ],
    
    fridayAdults: [t('Fish fingers for Sophie', Object.assign(k(290, 140, ''), { note: 'Tom is out.', noTotal: true }))],
    tedMonday: [r('scrambled-egg-toast-avocado', { note: 'Home from nursery.' }), r('egg-fried-rice', { note: 'Cook 40g of rice at lunchtime.' })],
    tuesday: r('carnitas-tacos', { note: 'Movie night, 4 portions.', serves: 4 }),
    saturday: r('pork-larb', { note: 'Cook 40g extra rice for Ted.' }), saturdayMeat: 'pork mince',
    tedSundayLunch: r('egg-fried-rice', { note: 'Rice from Saturday.' }),
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
    intro: 'The second of four repeating weeks.',
    pork: true,
    wednesdayNote: 'Tom is out.',
    fridayAdults: [t('Out for dinner', { noTotal: true })],
    saturday: r('sausage-mash-gravy-cabbage'), saturdayMeat: 'sausages'
  }),
  week({
    n: 0, id: '2026-10-19', title: 'Week of 19 October',
    intro: 'The third of four repeating weeks.',
    monTueLunch: [t('Bolognese with pasta', BOLOGNESE_LUNCH), t('Bolognese with pasta', BOLOGNESE_LUNCH)],
    jobs: [['Sunday', 'Move a tub of Bolognese to the fridge.'], ['Monday', 'Move a tub of Bolognese to the fridge.']],
    mondayTed: r('cheese-on-toast-fingers'),
    saturday: r('pork-larb', { note: 'Cook 40g extra rice for Ted.' }), saturdayMeat: 'pork mince',
    tedSundayLunch: r('egg-fried-rice', { note: 'Rice from Saturday.' })
  }),
  week({
    n: 1, id: '2026-10-26', title: 'Week of 26 October',
    intro: 'The last of four repeating weeks.',
    pork: true,
    saturday: r('sausage-mash-gravy-cabbage'), saturdayMeat: 'sausages'
  })
];
