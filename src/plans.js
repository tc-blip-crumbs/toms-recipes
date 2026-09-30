// Weekly meal plans. A meal is either { r: 'recipe-slug', label?, note? } or { t: 'plain text' }.
// "serves" on a person sets how many servings their recipe links open at.
const r = (slug, extra) => Object.assign({ r: slug }, extra || {});
const t = text => ({ t: text });

module.exports = [
{
  id: '2026-10-05',
  start: '2026-10-05',
  title: 'Week of 5 October',
  people: [
    {
      name: 'Ted', serves: 1,
      columns: ['Lunch', 'Dinner or Supper', 'Fruit'],
      intro: 'Nursery on Monday, Tuesday and Wednesday, where Ted has lunch and tea, so he has a small supper at home. Granny on Thursday, with both meals made the evening before.',
      rows: [
        ['Monday', t('At nursery'), r('toast-cream-cheese-cucumber'), t('Banana and pear')],
        ['Tuesday', t('At nursery'), r('cheese-on-toast-fingers'), t('Blueberries and strawberries')],
        ['Wednesday', t('At nursery'), r('potato-cakes', { label: 'A Potato Cake from Thursday\'s Batch' }), t('Pear and banana')],
        ['Thursday', r('potato-cakes', { note: 'With Granny. Made on Wednesday.' }), r('tomato-fusilli', { note: 'Made on Wednesday.' }), t('Banana and blueberries')],
        ['Friday', r('scrambled-egg-toast-avocado'), r('red-lentil-curry', { label: 'Red Lentil Curry with Rice', note: 'Shared with you. Ted\'s portion comes from the freezer.' }), t('Strawberries and pear')],
        ['Saturday', r('banana-oat-pancakes'), r('egg-fried-rice', { note: 'Uses rice left from Friday\'s curry.' }), t('Blueberries and banana')],
        ['Sunday', r('jacket-potato-cheddar-beans'), r('roast-chicken', { label: 'Roast Chicken with Mash, Carrots and Broccoli', note: 'Shared with you.', serves: 4 }), t('Pear and strawberries')]
      ],
      boxes: [
        { title: 'Thursday with Granny', text: 'Make the potato cakes and the fusilli on Wednesday evening and keep them in labelled tubs in the fridge. Granny can serve the potato cakes cold or warmed through. She should reheat the fusilli until piping hot with a splash of milk and let it cool before serving. Pack a pot of yoghurt and the cut fruit in the same bag.' }
      ]
    },
    {
      name: 'Tom & Sophie', serves: 2,
      columns: ['Dinner', 'When It\'s Cooked'],
      intro: 'Most of the cooking happens on Sunday 4 October, so weeknights mean reheating or one quick job.',
      rows: [
        ['Monday', t('Chilli Con Carne'), t('Already made')],
        ['Tuesday', r('carnitas-tacos', { note: 'Movie night with 2 guests, so this makes 4 portions.', serves: 4 }), t('Pork cooked on Sunday, crisped in 15 minutes')],
        ['Wednesday', r('hainanish-soy-poached-chicken', { note: 'Uses the second chicken with its legs taken off for Saturday. Poach it in the afternoon so it is ready by dinner.' }), t('1 hour 30 minutes of poaching, 30 minutes of work')],
        ['Thursday', r('sausage-mash-gravy-cabbage'), t('25 minutes on the night')],
        ['Friday', r('red-lentil-curry', { note: 'Shared with Ted. Cook 75g of rice for each person plus a little extra, which leaves enough for Ted\'s egg fried rice on Saturday.' }), t('Made on Sunday and frozen')],
        ['Saturday', r('spanakopita-roast-chicken', { note: 'Uses the 2 legs from the second chicken, defrosted in the fridge overnight.' }), t('About 1 hour in the oven')],
        ['Sunday', r('roast-chicken', { note: 'Shared with Ted.', serves: 4 }), t('Cooked on the day')]
      ],
      boxes: [
        { title: 'Three Whole Chickens', text: 'The butcher\'s order has 3 whole chickens. When they arrive, take the 2 legs off one and freeze them for Saturday\'s spanakopita chicken, and keep the rest of that bird for Wednesday. Freeze it if Wednesday is more than 2 days away and defrost it in the fridge overnight. Freeze the other 2 chickens for the roasts on Sunday 11 and Sunday 25 October, and defrost each one in the fridge for a day and a half.' },
        { title: 'Sunday 4 October Batch Cook', list: [
          'Morning. Put the carnitas pork, about 2.25kg, in the slow cooker on low for 9 to 10 hours. This makes about 10 portions.',
          'Late morning. Make a double batch of the red lentil curry. Leave out the chilli, chilli powder and salt, spoon out Ted\'s portions before the almond butter goes in, then fry the chilli and chilli powder in a little oil and stir them into the rest with the salt and almond butter.',
          'Afternoon. Cool the curry and freeze it in single portions, with Ted\'s in small tubs. Move 2 portions and one of Ted\'s tubs to the fridge on Thursday night for Friday.',
          'Evening. Shred the pork. Keep 4 portions and some of the liquid in the fridge for Tuesday\'s movie night. Freeze the rest in 3 tubs of 2 portions, for 13, 20 and 27 October.'
        ] }
      ]
    }
  ]
},
{
  id: '2026-10-12',
  start: '2026-10-12',
  title: 'Week of 12 October',
  people: [
    {
      name: 'Ted', serves: 1,
      columns: ['Lunch', 'Dinner or Supper', 'Fruit'],
      intro: 'Nursery on Monday, Tuesday and Wednesday, where Ted has lunch and tea, so he has a small supper at home. Granny on Thursday, with both meals made ahead.',
      rows: [
        ['Monday', t('At nursery'), r('chicken-couscous', { note: 'Uses chicken left from Sunday\'s roast. Shred it into the couscous and warm it through until piping hot.' }), t('Pear and blueberries')],
        ['Tuesday', t('At nursery'), r('spinach-omelette-wedges'), t('Banana and strawberries')],
        ['Wednesday', t('At nursery'), r('toast-cream-cheese-cucumber'), t('Blueberries and pear')],
        ['Thursday', r('lentil-carrot-fritters', { note: 'With Granny. Made on Wednesday.' }), r('mini-pork-meatballs', { note: 'Made on Sunday 11 October and frozen. Defrost on Wednesday night.' }), t('Strawberries and banana')],
        ['Friday', r('eggy-crumpet'), r('red-lentil-curry', { label: 'Red Lentil Curry with Rice', note: 'Ted\'s tub from the freezer. Cook 75g of rice, which leaves enough for his egg fried rice on Saturday.' }), t('Pear and banana')],
        ['Saturday', r('banana-oat-pancakes'), r('egg-fried-rice', { note: 'Uses rice left from Friday\'s curry.' }), t('Blueberries and strawberries')],
        ['Sunday', r('scrambled-egg-toast-avocado'), r('pea-risotto'), t('Banana and pear')]
      ],
      boxes: [
        { title: 'Thursday with Granny', text: 'Make the fritters on Wednesday evening and move a tub of meatballs from the freezer to the fridge. Granny can serve the fritters cold or warmed through. She should reheat the meatballs and their sauce until piping hot and let them cool before serving. Pack a pot of yoghurt and the cut fruit in the same bag.' }
      ]
    },
    {
      name: 'Tom & Sophie', serves: 2,
      columns: ['Dinner', 'When It\'s Cooked'],
      intro: 'The beef and Ted\'s meatballs cook on Sunday 11 October, around the roast chicken. Tom is out on Wednesday and you are both out on Friday.',
      rows: [
        ['Monday', t('Chilli Con Carne'), t('From the freezer')],
        ['Tuesday', r('carnitas-tacos'), t('From the freezer, crisped in 15 minutes')],
        ['Wednesday', r('red-lentil-curry', { label: 'Red Lentil Curry for Sophie', note: 'Tom is out. One portion from the freezer, with 75g of rice.', serves: 1 }), t('From the freezer')],
        ['Thursday', r('pork-larb'), t('20 minutes on the night')],
        ['Friday', t('Out for dinner'), t('Nothing to cook')],
        ['Saturday', r('red-wine-burnt-onion-beef', { note: 'Made on Sunday 11 October as a batch of 8 portions. It covers Saturday, Sunday and next Wednesday, with 2 portions left in the freezer.' }), t('Beef from the freezer, beans in 20 minutes')],
        ['Sunday', r('red-wine-burnt-onion-beef'), t('Beef from the freezer, beans in 20 minutes')]
      ],
      boxes: [
        { title: 'Sunday 11 October Cook', list: [
          'Morning. Cook a batch of the beef for 8, using about 2.7kg of steak, in the oven at 160°C for 3½ hours. Use your largest casserole, or split it between 2.',
          'While the beef cooks, make Ted\'s meatballs in the air fryer, using 250g of the pork mince from the butcher\'s order. Cool them, then freeze them in 5 portions with their sauce.',
          'Afternoon. Take out the beef, turn the oven up to 200°C and roast the chicken.',
          'Evening. Cool the beef and freeze it in 2-portion tubs. Make the butter beans fresh on the night you eat it.'
        ] },
        { title: 'Out of the Freezer', list: [
          'Sunday night. Move a tub of chilli to the fridge for Monday.',
          'Monday night. Move a tub of carnitas pork to the fridge for Tuesday.',
          'Tuesday night. Move a portion of curry to the fridge for Wednesday.',
          'Thursday night. Move one of Ted\'s curry tubs to the fridge for Friday.',
          'Friday night. Move 2 tubs of beef to the fridge for Saturday and Sunday.'
        ] }
      ]
    }
  ]
},
{
  id: '2026-10-19',
  start: '2026-10-19',
  title: 'Week of 19 October',
  people: [
    {
      name: 'Ted', serves: 1,
      columns: ['Lunch', 'Dinner or Supper', 'Fruit'],
      intro: 'Nursery on Monday, Tuesday and Wednesday, where Ted has lunch and tea, so he has a small supper at home. Granny on Thursday, with both meals made ahead.',
      rows: [
        ['Monday', t('At nursery'), r('cheese-on-toast-fingers'), t('Banana and blueberries')],
        ['Tuesday', t('At nursery'), r('scrambled-egg-toast-avocado'), t('Strawberries and pear')],
        ['Wednesday', t('At nursery'), r('potato-cakes', { label: 'A Potato Cake from Thursday\'s Batch' }), t('Pear and banana')],
        ['Thursday', r('potato-cakes', { note: 'With Granny. Made on Wednesday.' }), r('mini-pork-meatballs', { note: 'From the freezer. Defrost on Wednesday night.' }), t('Blueberries and strawberries')],
        ['Friday', r('toast-cream-cheese-cucumber'), r('egg-fried-rice', { note: 'Uses rice left from your curry on Thursday.' }), t('Banana and pear')],
        ['Saturday', r('banana-oat-pancakes'), r('jacket-potato-cheddar-beans'), t('Strawberries and banana')],
        ['Sunday', r('spinach-omelette-wedges'), r('roast-chicken', { label: 'Roast Chicken with Mash, Carrots and Broccoli', note: 'Shared with you.', serves: 4 }), t('Pear and blueberries')]
      ],
      boxes: [
        { title: 'Thursday with Granny', text: 'Make the potato cakes on Wednesday evening and move a tub of meatballs from the freezer to the fridge. Granny can serve the potato cakes cold or warmed through. She should reheat the meatballs and their sauce until piping hot and let them cool before serving. Pack a pot of yoghurt and the cut fruit in the same bag.' }
      ]
    },
    {
      name: 'Tom & Sophie', serves: 2,
      columns: ['Dinner', 'When It\'s Cooked'],
      intro: 'The first half of the week comes from the freezer. The noodles cover Friday and Saturday, and the chicken roasts on Sunday.',
      rows: [
        ['Monday', t('Chilli Con Carne'), t('From the freezer')],
        ['Tuesday', r('carnitas-tacos'), t('From the freezer, crisped in 15 minutes')],
        ['Wednesday', r('red-wine-burnt-onion-beef'), t('Beef from the freezer, beans in 20 minutes')],
        ['Thursday', r('red-lentil-curry', { note: 'Cook 75g of rice for each person plus a little extra, which leaves enough for Ted\'s egg fried rice on Friday.' }), t('From the freezer')],
        ['Friday', r('spicy-pork-sesame-noodles', { note: 'Makes 4 portions with the 800g of pork mince left after Ted\'s meatballs. Keep the pork, sauce and salad in separate tubs for Saturday.', serves: 4 }), t('35 minutes on the night')],
        ['Saturday', r('spicy-pork-sesame-noodles', { label: 'Spicy Pork Sesame Noodles, Second Night' }), t('Noodles cooked fresh in 5 minutes')],
        ['Sunday', r('roast-chicken', { note: 'Shared with Ted.', serves: 4 }), t('Cooked on the day')]
      ],
      boxes: [
        { title: 'Out of the Freezer', list: [
          'Sunday night. Move a tub of chilli to the fridge for Monday.',
          'Monday night. Move a tub of carnitas pork to the fridge for Tuesday.',
          'Tuesday night. Move a tub of beef to the fridge for Wednesday.',
          'Wednesday night. Move 2 portions of curry to the fridge for Thursday, and the pork mince if you froze it.',
          'Friday morning. Move the last chicken to the fridge for Sunday\'s roast.'
        ] }
      ]
    }
  ]
}
];
