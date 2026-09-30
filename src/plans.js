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
        ['Tuesday', r('carnitas-tacos'), t('Pork cooked on Sunday, crisped in 15 minutes')],
        ['Wednesday', r('hainanish-soy-poached-chicken', { note: 'Uses the second chicken with its legs taken off for Saturday. Poach it in the afternoon so it is ready by dinner.' }), t('1 hour 30 minutes of poaching, 30 minutes of work')],
        ['Thursday', r('sausage-mash-gravy-cabbage'), t('25 minutes on the night')],
        ['Friday', r('red-lentil-curry', { note: 'Shared with Ted. Cook 75g of rice for each person plus a little extra, which leaves enough for Ted\'s egg fried rice on Saturday.' }), t('Made on Sunday and frozen')],
        ['Saturday', r('spanakopita-roast-chicken', { note: 'Uses the 2 legs from the second chicken, defrosted in the fridge overnight.' }), t('About 1 hour in the oven')],
        ['Sunday', r('roast-chicken', { note: 'Shared with Ted.', serves: 4 }), t('Cooked on the day')]
      ],
      boxes: [
        { title: 'Two Whole Chickens', text: 'Buy 2 whole chickens. Roast one on Sunday 11 October. When the other arrives, take off the 2 legs and freeze them for Saturday\'s spanakopita chicken, then keep the rest of the bird in the fridge for Wednesday, or freeze it if Wednesday is more than 2 days away and defrost it in the fridge overnight. Freeze the roasting chicken too if it arrives more than 2 days before Sunday.' },
        { title: 'Sunday 4 October Batch Cook', list: [
          'Morning. Put the carnitas pork in the slow cooker on low for 8 hours.',
          'Late morning. Make a double batch of the red lentil curry. Leave out the chilli, chilli powder and salt, spoon out Ted\'s portions before the almond butter goes in, then fry the chilli and chilli powder in a little oil and stir them into the rest with the salt and almond butter.',
          'Afternoon. Cool the curry and freeze it in portions, with Ted\'s in small tubs. Keep one of Ted\'s tubs for Friday 16 October.',
          'Late afternoon. Shred the pork. Keep 2 portions of pork and some of its liquid in the fridge for Tuesday, and freeze the rest in 2-portion tubs for the Tuesdays that follow.'
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
      intro: 'The beef and Ted\'s meatballs cook on Sunday 11 October, around the roast chicken. The chilli and carnitas come from the freezer, and you are out on Friday.',
      rows: [
        ['Monday', t('Chilli Con Carne'), t('From the freezer')],
        ['Tuesday', r('carnitas-tacos'), t('From the freezer, crisped in 15 minutes')],
        ['Wednesday', r('spicy-pork-sesame-noodles', { note: 'Makes 4 portions. Keep the pork, sauce and salad in separate tubs for Thursday.' }), t('35 minutes on the night')],
        ['Thursday', r('spicy-pork-sesame-noodles', { label: 'Spicy Pork Sesame Noodles, Second Night' }), t('Noodles cooked fresh in 5 minutes')],
        ['Friday', t('Out for dinner'), t('Nothing to cook')],
        ['Saturday', r('red-wine-burnt-onion-beef', { note: 'Made on Sunday 11 October and frozen. It serves 6, which covers Saturday and Sunday with 2 portions left in the freezer.' }), t('Beef from the freezer, beans in 20 minutes')],
        ['Sunday', r('red-wine-burnt-onion-beef'), t('Beef from the freezer, beans in 20 minutes')]
      ],
      boxes: [
        { title: 'Sunday 11 October Cook', list: [
          'Morning. Put the beef in the oven at 160°C and cook it for 3½ hours, so it comes out before the chicken goes in.',
          'While the beef cooks, make Ted\'s meatballs in the air fryer. Cool them, then freeze them in portions with their sauce.',
          'Afternoon. Take out the beef, turn the oven up to 200°C and roast the chicken.',
          'Evening. Cool the beef and freeze it in 2-portion tubs. Make the butter beans fresh on the night you eat it.'
        ] },
        { title: 'Out of the Freezer', list: [
          'Sunday night. Move a tub of chilli to the fridge for Monday.',
          'Monday night. Move a tub of carnitas pork and its liquid to the fridge for Tuesday.',
          'Thursday night. Move one of Ted\'s curry tubs to the fridge for Friday.',
          'Friday night. Move 2 tubs of beef to the fridge for Saturday and Sunday.'
        ] }
      ]
    }
  ]
}
];
