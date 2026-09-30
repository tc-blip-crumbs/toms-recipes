// Weekly meal plans. A meal is either { r: 'recipe-slug', label?, note? } or { t: 'plain text' }.
// "serves" on a person sets how many servings their recipe links open at.
const r = (slug, extra) => Object.assign({ r: slug }, extra || {});
const t = text => ({ t: text });

const FRUIT = [
  ['Banana and pear', 'Blueberries and strawberries', 'Pear and banana', 'Banana and blueberries', 'Strawberries and pear', 'Blueberries and banana', 'Pear and strawberries'],
  ['Pear and blueberries', 'Banana and strawberries', 'Blueberries and pear', 'Strawberries and banana', 'Pear and banana', 'Blueberries and strawberries', 'Banana and pear']
];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// One repeating week. "w" holds the few things that differ from week to week.
function week(w) {
  const fruit = FRUIT[w.n % 2];
  const ted = [
    [t('At nursery'), w.mondayTed || r('chicken-couscous', { note: 'Uses chicken left from Sunday\'s roast. Shred it into the couscous and warm it through until piping hot.' })],
    [t('At nursery'), r('spinach-omelette-wedges')],
    [t('At nursery'), r('red-lentil-curry', { label: 'Red Lentil Curry with Rice', note: 'Shared with you, from Ted\'s tub in the freezer.' })],
    [r('potato-cakes', { note: 'With Granny. Made on Wednesday.' }), r('mini-pork-meatballs', { note: 'From the freezer. Defrost on Wednesday night.' })],
    [r('eggy-crumpet'), r('tomato-fusilli', w.friday ? {} : { note: 'The Bolognese is too salty for Ted.' })],
    [r('banana-oat-pancakes'), r('pea-risotto')],
    [r('scrambled-egg-toast-avocado'), w.pork ? r('roast-pork-belly', { label: 'Pork Belly with Mash, Carrots and Broccoli', note: 'Shared with you.' }) : r('roast-chicken', { label: 'Roast Chicken with Mash, Carrots and Broccoli', note: 'Shared with you.', serves: 4 })]
  ];
  const adults = [
    [t('Chilli Con Carne'), t('From the freezer')],
    [w.tuesday || r('carnitas-tacos'), t('From the freezer, crisped in 15 minutes')],
    [w.wednesday || r('red-lentil-curry', { note: 'Shared with Ted. Cook 75g of rice for each of you and a little for Ted.' }), t('From the freezer')],
    [r('red-wine-burnt-onion-beef'), t('Beef from the freezer, butter beans in 20 minutes')],
    [w.friday || r('batalis-bolognese'), w.friday ? t('Nothing to cook') : t('From the freezer, pasta in 12 minutes')],
    [w.saturday, t(w.saturdayWhen)],
    [w.pork ? r('roast-pork-belly', { note: 'Shared with Ted. One pork belly chunky each.' }) : r('roast-chicken', { note: 'Shared with Ted.', serves: 4 }), t('Cooked on the day')]
  ];
  const freezer = [
    'Sunday night. Move a tub of chilli to the fridge for Monday.',
    'Monday night. Move a tub of carnitas pork to the fridge for Tuesday.',
    'Tuesday night. Move the curry and one of Ted\'s curry tubs to the fridge for Wednesday.',
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
        boxes: (w.boxes || []).concat([{ title: 'Out of the Freezer', list: freezer }])
      }
    ]
  };
}

module.exports = [
  week({
    n: 0, id: '2026-10-05', title: 'Week of 5 October',
    intro: 'The first of four repeating weeks. Everything from Monday to Friday is batch cooked on Saturday 3 and Sunday 4 October.',
    mondayTed: r('cheese-on-toast-fingers', { note: 'No roast the day before this week.' }),
    tuesday: r('carnitas-tacos', { note: 'Movie night with 2 guests, so this makes 4 portions.', serves: 4 }),
    saturday: r('pork-larb'), saturdayWhen: '20 minutes on the night', saturdayMeat: 'pork mince',
    boxes: [
      { title: 'Saturday 3 October Batch Cook', list: [
        'Morning. Cook the beef for 8, using about 2.7kg of steak, in the oven at 160°C for 3½ hours. Use your largest casserole, or split it between 2.',
        'While the beef cooks, make a triple batch of the red lentil curry. Leave out the chilli, chilli powder and salt, spoon out 4 small portions for Ted before the almond butter goes in, then fry the chilli and chilli powder in a little oil and stir them into the rest with the salt and almond butter.',
        'Afternoon. Make Ted\'s meatballs in the air fryer, using 250g of the pork mince.',
        'Evening. Cool everything and freeze it. The beef goes in 4 tubs of 2 portions, the curry in 2-portion tubs with Ted\'s in small tubs, and the meatballs in 5 portions with their sauce. Make the butter beans fresh on the night you eat the beef.'
      ] },
      { title: 'Sunday 4 October Batch Cook', list: [
        'Morning. Put the carnitas pork, about 2.25kg, in the slow cooker on low for 9 to 10 hours.',
        'Late morning. Make the Bolognese and leave it to simmer for 2 to 3 hours.',
        'Afternoon. Cool the Bolognese and freeze it in 3 tubs of 2 portions.',
        'Evening. Shred the pork. Keep 4 portions and some of the liquid in the fridge for Tuesday\'s movie night, and freeze the rest in 3 tubs of 2 portions.'
      ] },
      { title: 'When the Meat Arrives', text: 'The braising steak and lardons come with the Sainsbury\'s delivery on Thursday 1 October. Pipers delivers frozen, and its earliest delivery is Friday 2 October. When it arrives, put the pork shoulder, the beef mince and 3 packs of pork mince in the fridge to defrost for the batch cook. Freeze the 2 chickens, the 4 pork belly chunkies and the other 4 packs of pork mince.' }
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
    saturday: r('pork-larb'), saturdayWhen: '20 minutes on the night', saturdayMeat: 'pork mince'
  }),
  week({
    n: 1, id: '2026-10-26', title: 'Week of 26 October',
    intro: 'The last of four repeating weeks. This uses up the last of the batch cooking, apart from a few portions of curry. Sunday is pork belly in place of chicken.',
    pork: true,
    saturday: r('sausage-mash-gravy-cabbage'), saturdayWhen: '25 minutes on the night', saturdayMeat: 'sausages'
  })
];
