// Ted's meals and the dinners from the meal plans. Same house rules as recipes.js.
const TED = 'For Ted';

module.exports = [
{
  slug: 'eggy-crumpet', title: 'Eggy Crumpet with Cucumber Sticks', short: 'Eggy crumpet',
  description: 'A crumpet soaked in egg and fried in butter, cut into fingers for Ted to hold.',
  serves: 1, defaultServings: 1, prep: 5, cook: 6, course: TED, cuisine: '', main: 'Egg', labels: ['Quick'],
  groups: [{ name: '', items: [
    { id: 'egg', qty: 1, name: 'egg', plural: 'eggs', scale: 'whole', ref: 'egg' },
    { id: 'milk', qty: 1, unit: 'tbsp', name: 'whole milk', scale: 'spoon', liquid: true, ref: 'milk' },
    { id: 'crumpet', qty: 1, name: 'crumpet', plural: 'crumpets', scale: 'whole', ref: 'crumpet' },
    { id: 'butter', qty: 5, unit: 'g', name: 'unsalted butter', scale: 'weight', ref: 'butter' },
    { id: 'cucumber', qty: 40, unit: 'g', name: 'cucumber', scale: 'weight', ref: 'cucumber' }
  ]}],
  steps: [
    { text: 'Whisk the egg and milk together in a shallow bowl.', uses: ['egg', 'milk'] },
    { text: 'Cut the crumpet in half and soak both halves in the egg for 1 minute on each side.', uses: ['crumpet'] },
    { text: 'Melt the butter in a frying pan over a medium heat and fry the crumpet for 2 to 3 minutes on each side, until the egg is fully set.', uses: ['butter'] },
    { text: 'Peel the cucumber and cut it into sticks about the size of your finger.', uses: ['cucumber'] },
    { text: 'Cut the crumpet into fingers and serve with the cucumber sticks.', uses: [] }
  ],
  notes: []
},
{
  slug: 'tomato-fusilli', title: 'Fusilli with Tomatoes, Cream, Butter and Cheddar', short: 'Tomato fusilli',
  description: 'Soft fusilli in a creamy tomato sauce with melted cheddar, one of Ted\'s favourites.',
  serves: 1, defaultServings: 1, prep: 5, cook: 15, course: TED, cuisine: 'Italian', main: 'Pasta', labels: ['Quick'],
  groups: [{ name: '', items: [
    { id: 'fusilli', qty: 40, unit: 'g', name: 'fusilli', scale: 'weight', ref: 'fusilli' },
    { id: 'tomatoes', qty: 3, unit: 'tbsp', name: 'tinned chopped tomatoes', scale: 'spoon', ref: 'tomatoes', chip: 'chopped tomatoes' },
    { id: 'butter', qty: 5, unit: 'g', name: 'unsalted butter', scale: 'weight', ref: 'butter' },
    { id: 'cream', qty: 1, unit: 'tbsp', name: 'double cream', scale: 'spoon', liquid: true, ref: 'cream' },
    { id: 'cheddar', qty: 15, unit: 'g', name: 'mature cheddar', prep: 'grated', scale: 'weight', ref: 'cheddar' }
  ]}],
  steps: [
    { text: 'Cook the fusilli for 2 minutes longer than the packet says, so it is soft, then drain.', uses: ['fusilli'] },
    { text: 'Warm the tomatoes and butter in a small pan over a low heat for 5 minutes, stirring now and then.', uses: ['tomatoes', 'butter'] },
    { text: 'Stir in the cream, then the fusilli and cheddar, and heat until the cheese melts.', uses: ['cream', 'cheddar'] },
    { text: 'Let it cool before serving.', uses: [] }
  ],
  notes: [{ title: 'Making Ahead', text: 'Keeps for 2 days in the fridge. Reheat it until piping hot with a splash of milk, then let it cool before serving.' }]
},
{
  slug: 'potato-cakes', title: 'Potato Cakes with Peas and Sweetcorn', short: 'Potato cakes',
  description: 'Soft mashed potato cakes with peas, sweetcorn and a little Grana Padano, good hot or cold.',
  yield: 'Makes 6 small cakes', yieldShort: '6 cakes', serves: 6, prep: 15, cook: 25, course: TED, cuisine: 'British', main: 'Potato', labels: ['Freezes well'],
  groups: [{ name: '', items: [
    { id: 'potato', qty: 1, name: 'baking potato', prep: 'about 200g', scale: 'fixed', ref: 'potato' },
    { id: 'peas', qty: 2, unit: 'tbsp', name: 'frozen peas', scale: 'fixed', ref: 'peas' },
    { id: 'sweetcorn', qty: 2, unit: 'tbsp', name: 'frozen sweetcorn', scale: 'fixed', ref: 'sweetcorn' },
    { id: 'egg', qty: 1, name: 'egg', scale: 'fixed', ref: 'egg' },
    { id: 'rice', qty: 2, unit: 'tbsp', name: 'cooked rice', prep: 'optional', scale: 'fixed', ref: 'rice' },
    { id: 'grana', qty: 1, unit: 'tbsp', name: 'grated Grana Padano', scale: 'fixed', ref: 'Grana Padano', chip: 'Grana Padano' },
    { id: 'oil', phrase: 'A little vegetable oil', prep: 'for frying', scale: 'fixed', ref: 'oil', chip: 'oil' }
  ]}],
  steps: [
    { text: 'Peel the potato, cut it into chunks and boil for 15 minutes until soft. Drain, mash and leave to cool.', uses: ['potato'] },
    { text: 'Cook the peas and sweetcorn in boiling water for 3 minutes, drain and crush them lightly with a fork.', uses: ['peas', 'sweetcorn'] },
    { text: 'Mix the potato, peas, sweetcorn, egg, rice and Grana Padano together.', uses: ['egg', 'rice', 'grana'] },
    { text: 'Shape the mixture into 6 small, flat cakes.', uses: [] },
    { text: 'Fry the cakes in a little oil over a medium heat for 3 to 4 minutes on each side, until golden and hot in the middle.', uses: ['oil'] }
  ],
  notes: [
    { title: 'In the Air Fryer', text: 'Brush the cakes with a little oil and cook them at 190°C for 10 to 12 minutes, turning them once.' },
    { title: 'Storing', text: 'Keep them for 2 days in the fridge or freeze them once cool. Serve cold or warmed through until hot in the middle.' }
  ]
},
{
  slug: 'chicken-couscous', title: 'Chicken and Vegetable Couscous', short: 'Chicken couscous',
  description: 'Small pieces of chicken thigh with carrot and peas stirred through buttery couscous.',
  serves: 1, defaultServings: 1, prep: 10, cook: 15, course: TED, cuisine: '', main: 'Chicken', labels: ['Quick'],
  groups: [{ name: '', items: [
    { id: 'chicken', qty: 1, name: 'boneless chicken thigh', plural: 'boneless chicken thighs', prep: 'skin removed', scale: 'wholeUp', ref: 'chicken', chip: 'chicken thigh' },
    { id: 'oil', qty: 1, unit: 'tsp', name: 'vegetable oil', scale: 'spoon', liquid: true, ref: 'oil' },
    { id: 'carrot', qty: 1, name: 'carrot', plural: 'carrots', size: 'small', prep: 'grated', scale: 'halve', ref: 'carrot' },
    { id: 'peas', qty: 2, unit: 'tbsp', name: 'frozen peas', scale: 'spoon', ref: 'peas' },
    { id: 'couscous', qty: 40, unit: 'g', name: 'couscous', scale: 'weight', ref: 'couscous' },
    { id: 'stock', qty: 80, unit: 'ml', name: 'hot low-salt stock', scale: 'weight', ref: 'stock', chip: 'low-salt stock' },
    { id: 'butter', qty: 5, unit: 'g', name: 'unsalted butter', scale: 'weight', ref: 'butter' }
  ]}],
  steps: [
    { text: 'Cut the chicken into very small pieces.', uses: ['chicken'] },
    { text: 'Fry the chicken in the oil over a medium heat for 6 to 8 minutes, until cooked through with no pink left.', uses: ['oil'] },
    { text: 'Add the carrot and peas and cook for 3 minutes more.', uses: ['carrot', 'peas'] },
    { text: 'Pour the hot stock over the couscous in a bowl, cover and leave for 5 minutes.', uses: ['couscous', 'stock'] },
    { text: 'Fluff the couscous with a fork and stir in the butter, then the chicken and vegetables.', uses: ['butter'] }
  ],
  notes: [{ title: 'Serving', text: 'Press small handfuls into balls so Ted can pick them up.' }]
},
{
  slug: 'scrambled-egg-toast-avocado', title: 'Scrambled Egg with Toast Fingers and Avocado', short: 'Scrambled egg',
  description: 'Firm scrambled egg with buttered toast fingers and strips of ripe avocado.',
  serves: 1, defaultServings: 1, prep: 5, cook: 5, course: TED, cuisine: '', main: 'Egg', labels: ['Quick'],
  groups: [{ name: '', items: [
    { id: 'egg', qty: 1, name: 'egg', plural: 'eggs', scale: 'whole', ref: 'egg' },
    { id: 'milk', qty: 1, unit: 'tbsp', name: 'whole milk', scale: 'spoon', liquid: true, ref: 'milk' },
    { id: 'butter', qty: 10, unit: 'g', name: 'unsalted butter', scale: 'weight', ref: 'butter' },
    { id: 'bread', qty: 1, name: 'slice of bread', plural: 'slices of bread', scale: 'whole', ref: 'bread' },
    { id: 'avocado', qty: 0.5, name: 'ripe avocado', plural: 'ripe avocados', scale: 'halve', ref: 'avocado' }
  ]}],
  steps: [
    { text: 'Whisk the egg and milk together.', uses: ['egg', 'milk'] },
    { text: 'Melt half the butter in a small pan over a low heat. Add the egg and stir until it is cooked through and firm.', uses: [{ id: 'butter', part: 0.5 }] },
    { text: 'Toast the bread lightly, spread it thinly with the rest of the butter and cut it into fingers.', uses: ['bread', { id: 'butter', part: 0.5 }] },
    { text: 'Cut the avocado into strips and serve with the egg and toast.', uses: ['avocado'] }
  ],
  notes: []
},
{
  slug: 'mini-pork-meatballs', title: 'Mini Pork Meatballs in Tomato Sauce', short: 'Pork meatballs',
  description: 'Small baked pork meatballs in a smooth tomato sauce, served with soft pasta. The batch fills the freezer.',
  yield: 'Makes about 20 meatballs', yieldShort: '20 meatballs', serves: 5, prep: 20, cook: 25, airC: 190, course: TED, cuisine: 'Italian', main: 'Pork', labels: ['Freezes well', 'Batch cook'],
  groups: [{ name: '', items: [
    { id: 'pork', qty: 250, unit: 'g', name: 'pork mince', scale: 'fixed', ref: 'pork' },
    { id: 'onion', qty: 1, name: 'red onion', prep: 'very finely chopped', scale: 'fixed', ref: 'red onion' },
    { id: 'oats', qty: 2, unit: 'tbsp', name: 'porridge oats', scale: 'fixed', ref: 'oats' },
    { id: 'grana', qty: 2, unit: 'tbsp', name: 'grated Grana Padano', scale: 'fixed', ref: 'Grana Padano', chip: 'Grana Padano' },
    { id: 'oil', qty: 1, unit: 'tsp', name: 'vegetable oil', scale: 'fixed', ref: 'oil' },
    { id: 'tomatoes', qty: 1, unit: 'tin', tinSize: 400, name: 'chopped tomatoes', scale: 'fixed', ref: 'chopped tomatoes' },
    { id: 'fusilli', phrase: 'Fusilli', prep: '40g for each portion', scale: 'fixed', ref: 'fusilli', chip: 'fusilli' }
  ]}],
  steps: [
    { text: 'Heat the air fryer to 190°C.', uses: [] },
    { text: 'Mix the pork mince, half the red onion, the oats and the Grana Padano with your hands.', uses: ['pork', { id: 'onion', part: 0.5 }, 'oats', 'grana'] },
    { text: 'Roll the mixture into about 20 balls, each about 2cm across, and set them on a plate.', uses: [] },
    { text: 'Cook the meatballs in a single layer on the crisper tray for 10 to 12 minutes, turning them halfway, until cooked through with no pink in the middle.', uses: [] },
    { text: 'While they cook, soften the rest of the red onion in the oil over a medium heat for 5 minutes. Add the chopped tomatoes, simmer for 15 minutes and blend until smooth.', uses: [{ id: 'onion', part: 0.5 }, 'oil', 'tomatoes'] },
    { text: 'Cook the fusilli until soft. Halve 4 or 5 meatballs and serve them with the fusilli and some sauce.', uses: ['fusilli'] }
  ],
  notes: [{ title: 'In the Oven', text: 'Bake the meatballs on a lined tray at 200°C for 18 to 20 minutes.' }, { title: 'Freezing', text: 'Freeze the spare meatballs and sauce in portions. Defrost them in the fridge overnight and reheat until piping hot.' }]
},
{
  slug: 'lentil-carrot-fritters', title: 'Red Lentil and Carrot Fritters', short: 'Lentil fritters',
  description: 'Soft red lentil and carrot fritters for Ted to dip in hummus.',
  yield: 'Makes about 8 fritters', yieldShort: '8 fritters', serves: 4, prep: 10, cook: 25, course: TED, cuisine: '', main: 'Lentils', labels: ['Freezes well'],
  groups: [{ name: '', items: [
    { id: 'lentils', qty: 50, unit: 'g', name: 'red lentils', scale: 'fixed', ref: 'lentils' },
    { id: 'water', qty: 200, unit: 'ml', name: 'water', scale: 'fixed', ref: 'water' },
    { id: 'carrot', qty: 1, name: 'carrot', prep: 'grated', scale: 'fixed', ref: 'carrot' },
    { id: 'egg', qty: 1, name: 'egg', scale: 'fixed', ref: 'egg' },
    { id: 'flour', qty: 2, unit: 'tbsp', name: 'plain flour', scale: 'fixed', ref: 'flour' },
    { id: 'cheddar', qty: 10, unit: 'g', name: 'mature cheddar', prep: 'grated', scale: 'fixed', ref: 'cheddar' },
    { id: 'oil', phrase: 'A little vegetable oil', prep: 'for frying', scale: 'fixed', ref: 'oil', chip: 'oil' },
    { id: 'hummus', phrase: 'Hummus', prep: 'to serve', scale: 'fixed', ref: 'hummus', chip: 'hummus' }
  ]}],
  steps: [
    { text: 'Rinse the lentils and simmer them in the water for 12 to 15 minutes, until soft and the water has gone. Leave them to cool.', uses: ['lentils', 'water'] },
    { text: 'Mix the lentils with the carrot, egg, flour and cheddar.', uses: ['carrot', 'egg', 'flour', 'cheddar'] },
    { text: 'Heat a little oil in a frying pan over a medium heat. Fry tablespoons of the mixture for 3 minutes on each side, pressing them flat.', uses: ['oil'] },
    { text: 'Serve warm with a spoonful of hummus for dipping.', uses: ['hummus'] }
  ],
  notes: []
},
{
  slug: 'egg-fried-rice', title: 'Egg Fried Rice with Peas and Sweetcorn', short: 'Egg fried rice',
  description: 'Yesterday\'s leftover rice fried with egg, peas and sweetcorn, with no soy sauce.',
  serves: 1, defaultServings: 1, prep: 5, cook: 8, course: TED, cuisine: 'Chinese', main: 'Rice', labels: ['Quick'],
  groups: [{ name: '', items: [
    { id: 'rice', qty: 100, unit: 'g', name: 'cold cooked rice', prep: 'left over from the day before', scale: 'weight', ref: 'rice' },
    { id: 'oil', qty: 1, unit: 'tsp', name: 'vegetable oil', scale: 'spoon', liquid: true, ref: 'oil' },
    { id: 'peas', qty: 2, unit: 'tbsp', name: 'frozen peas', scale: 'spoon', ref: 'peas' },
    { id: 'sweetcorn', qty: 2, unit: 'tbsp', name: 'frozen sweetcorn', scale: 'spoon', ref: 'sweetcorn' },
    { id: 'egg', qty: 1, name: 'egg', plural: 'eggs', scale: 'whole', ref: 'egg' }
  ]}],
  steps: [
    
    { text: 'Heat the oil in a frying pan over a medium-high heat and cook the peas and sweetcorn for 3 minutes.', uses: ['oil', 'peas', 'sweetcorn'] },
    { text: 'Add the rice and stir-fry until it is piping hot all the way through.', uses: ['rice'] },
    { text: 'Push the rice to one side, crack in the egg and scramble it until fully set, then mix it through.', uses: ['egg'] }
  ],
  notes: [{ title: 'Rice', text: 'Cool cooked rice within an hour and keep it in the fridge. Reheat it only once, until piping hot. Leave out soy sauce.' }]
},
{
  slug: 'jacket-potato-cheddar-beans', title: 'Jacket Potato with Cheddar and Mashed Beans', short: 'Jacket potato',
  description: 'Baked potato mashed with butter, cheddar and reduced-salt baked beans.',
  serves: 1, defaultServings: 1, prep: 5, cook: 45, cookText: '40 to 45 minutes', airC: 200, course: TED, cuisine: 'British', main: 'Potato', labels: [],
  groups: [{ name: '', items: [
    { id: 'potato', qty: 1, name: 'baking potato', plural: 'baking potatoes', scale: 'whole', ref: 'potato' },
    { id: 'beans', qty: 2, unit: 'tbsp', name: 'reduced-salt baked beans', scale: 'spoon', ref: 'baked beans' },
    { id: 'butter', qty: 5, unit: 'g', name: 'unsalted butter', scale: 'weight', ref: 'butter' },
    { id: 'cheddar', qty: 15, unit: 'g', name: 'mature cheddar', prep: 'grated', scale: 'weight', ref: 'cheddar' }
  ]}],
  steps: [
    { text: 'Heat the air fryer to 200°C. Prick the potato and cook it on the crisper tray for 40 to 45 minutes, turning it halfway, until soft.', uses: ['potato'] },
    { text: 'Warm the baked beans and mash them with a fork.', uses: ['beans'] },
    { text: 'Scoop out the potato and mix it with the butter, baked beans and cheddar.', uses: ['butter', 'cheddar'] },
    { text: 'Serve in small scoops, with a little of the soft skin if Ted likes it.', uses: [] }
  ],
  notes: [{ title: 'Quicker', text: 'Microwave the potato for 8 minutes, then give it 10 minutes in the air fryer at 200°C.' }, { title: 'In the Oven', text: 'Bake the potato at 200°C for 60 to 75 minutes.' }]
},
{
  slug: 'chicken-sweet-potato-mash', title: 'Chicken, Sweet Potato and Pea Mash with Broccoli', short: 'Chicken and mash',
  description: 'Roast chicken thigh shredded fine, with sweet potato and pea mash and soft broccoli.',
  serves: 1, defaultServings: 1, prep: 10, cook: 20, airC: 190, course: TED, cuisine: 'British', main: 'Chicken', labels: [],
  groups: [{ name: '', items: [
    { id: 'chicken', qty: 1, name: 'boneless chicken thigh', plural: 'boneless chicken thighs', prep: 'skin removed', scale: 'wholeUp', ref: 'chicken', chip: 'chicken thigh' },
    { id: 'sweet', qty: 1, name: 'sweet potato', plural: 'sweet potatoes', size: 'small', scale: 'halve', ref: 'sweet potato' },
    { id: 'peas', qty: 2, unit: 'tbsp', name: 'frozen peas', scale: 'spoon', ref: 'peas' },
    { id: 'butter', qty: 5, unit: 'g', name: 'unsalted butter', scale: 'weight', ref: 'butter' },
    { id: 'broccoli', qty: 4, name: 'small broccoli floret', plural: 'small broccoli florets', scale: 'whole', ref: 'broccoli' }
  ]}],
  steps: [
    { text: 'Heat the air fryer to 190°C and cook the chicken for 18 to 20 minutes, turning it once, until cooked through with no pink left.', uses: ['chicken'] },
    { text: 'Peel the sweet potato, cut it into chunks and boil for 12 minutes. Add the peas for the last 3 minutes.', uses: ['sweet', 'peas'] },
    { text: 'Drain and mash the sweet potato and peas with the butter.', uses: ['butter'] },
    { text: 'Steam the broccoli for 6 to 7 minutes, until you can squash it between your finger and thumb.', uses: ['broccoli'] },
    { text: 'Shred the chicken finely and serve it with the mash and broccoli.', uses: [] }
  ],
  notes: [{ title: 'In the Oven', text: 'Roast the chicken on a tray at 200°C for 25 minutes.' }]
},
{
  slug: 'banana-oat-pancakes', title: 'Banana and Oat Pancakes', short: 'Banana pancakes',
  description: 'Three-ingredient pancakes of banana, egg and oats, cut into strips.',
  serves: 1, defaultServings: 1, prep: 5, cook: 8, course: TED, cuisine: '', main: 'Banana', labels: ['Quick'],
  groups: [{ name: '', items: [
    { id: 'banana', qty: 1, name: 'ripe banana', plural: 'ripe bananas', scale: 'halve', ref: 'banana' },
    { id: 'egg', qty: 1, name: 'egg', plural: 'eggs', scale: 'whole', ref: 'egg' },
    { id: 'oats', qty: 3, unit: 'tbsp', name: 'porridge oats', scale: 'spoon', ref: 'oats' },
    { id: 'butter', qty: 5, unit: 'g', name: 'unsalted butter', scale: 'weight', ref: 'butter' }
  ]}],
  steps: [
    { text: 'Mash the banana well in a bowl.', uses: ['banana'] },
    { text: 'Beat in the egg, then stir in the oats. Blitz the batter with a hand blender for smoother pancakes.', uses: ['egg', 'oats'] },
    { text: 'Melt the butter in a frying pan over a medium heat.', uses: ['butter'] },
    { text: 'Drop in tablespoons of batter and cook for 2 minutes on each side, until set and golden.', uses: [] },
    { text: 'Cool slightly and cut into strips.', uses: [] }
  ],
  notes: []
},
{
  slug: 'cod-white-sauce', title: 'Cod in a White Sauce with Mashed Potato and Peas', short: 'Cod in white sauce',
  description: 'Cod poached in milk and folded through a cheesy white sauce, with buttery mash and peas.',
  serves: 1, defaultServings: 1, prep: 10, cook: 25, course: TED, cuisine: 'British', main: 'Fish', labels: [],
  groups: [{ name: '', items: [
    { id: 'potato', qty: 1, name: 'potato', plural: 'potatoes', scale: 'whole', ref: 'potato' },
    { id: 'peas', qty: 2, unit: 'tbsp', name: 'frozen peas', scale: 'spoon', ref: 'peas' },
    { id: 'butter', qty: 15, unit: 'g', name: 'unsalted butter', scale: 'weight', ref: 'butter' },
    { id: 'cod', qty: 1, name: 'frozen boneless cod fillet', plural: 'frozen boneless cod fillets', prep: 'defrosted overnight in the fridge', scale: 'wholeUp', ref: 'cod', chip: 'cod fillet' },
    { id: 'milk', qty: 150, unit: 'ml', name: 'whole milk', scale: 'weight', ref: 'milk' },
    { id: 'flour', qty: 1, unit: 'tbsp', name: 'plain flour', scale: 'spoon', ref: 'flour' },
    { id: 'cheddar', qty: 15, unit: 'g', name: 'mature cheddar', prep: 'grated, optional', scale: 'weight', ref: 'cheddar' }
  ]}],
  steps: [
    { text: 'Peel the potato, cut it into chunks and boil for 15 minutes. Add the peas for the last 3 minutes. Drain and mash the potato with a third of the butter and a splash of the milk.', uses: ['potato', 'peas', { id: 'butter', part: 1 / 3 }] },
    { text: 'Put the cod in a small pan with the milk and simmer gently for 5 to 6 minutes, until it flakes easily.', uses: ['cod', 'milk'] },
    { text: 'Lift out the fish, flake it and check carefully for bones. Keep the milk.', uses: [] },
    { text: 'Melt the rest of the butter in a clean pan, stir in the flour and cook for 1 minute.', uses: [{ id: 'butter', part: 2 / 3 }, 'flour'] },
    { text: 'Whisk in the warm milk a little at a time until the sauce thickens, then stir in the cheddar.', uses: ['cheddar'] },
    { text: 'Fold the fish into the sauce and serve with the mash and peas.', uses: [] }
  ],
  notes: [{ title: 'Bones', text: 'Check every flake of fish for bones before it goes on Ted\'s plate.' }]
},
{
  slug: 'spinach-omelette-wedges', title: 'Spinach Omelette Fingers with Sweet Potato Wedges', short: 'Spinach omelette',
  description: 'A cheesy spinach omelette cut into strips, with soft baked sweet potato wedges.',
  serves: 1, defaultServings: 1, prep: 10, cook: 20, airC: 200, course: TED, cuisine: '', main: 'Egg', labels: [],
  groups: [{ name: '', items: [
    { id: 'sweet', qty: 1, name: 'sweet potato', plural: 'sweet potatoes', size: 'small', scale: 'halve', ref: 'sweet potato' },
    { id: 'oil', qty: 1, unit: 'tsp', name: 'vegetable oil', scale: 'spoon', liquid: true, ref: 'oil' },
    { id: 'spinach', qty: 20, unit: 'g', name: 'baby spinach', scale: 'weight', ref: 'spinach' },
    { id: 'egg', qty: 1, name: 'egg', plural: 'eggs', scale: 'whole', ref: 'egg' },
    { id: 'cheddar', qty: 10, unit: 'g', name: 'mature cheddar', prep: 'grated', scale: 'weight', ref: 'cheddar' },
    { id: 'butter', qty: 5, unit: 'g', name: 'unsalted butter', scale: 'weight', ref: 'butter' }
  ]}],
  steps: [
    { text: 'Heat the air fryer to 200°C. Cut the sweet potato into thin wedges, toss them in the oil and cook on the crisper tray for 15 to 18 minutes, turning them halfway, until soft.', uses: ['sweet', 'oil'] },
    { text: 'Wilt the spinach in a pan with a splash of water, squeeze out the liquid and chop it finely.', uses: ['spinach'] },
    { text: 'Whisk the egg with the spinach and cheddar.', uses: ['egg', 'cheddar'] },
    { text: 'Melt the butter in a small frying pan over a medium heat, pour in the egg and cook for 2 to 3 minutes. Flip it and cook for 1 minute more, until fully set.', uses: ['butter'] },
    { text: 'Cut the omelette into strips and serve with the wedges.', uses: [] }
  ],
  notes: [{ title: 'In the Oven', text: 'Bake the wedges on a tray at 200°C for 25 to 30 minutes.' }]
},
{
  slug: 'pea-risotto', title: 'Pea and Grana Padano Risotto', short: 'Pea risotto',
  description: 'A soft, mild risotto with crushed peas and a little Grana Padano.',
  serves: 1, defaultServings: 1, prep: 5, cook: 30, course: TED, cuisine: 'Italian', main: 'Rice', labels: [],
  groups: [{ name: '', items: [
    { id: 'shallot', qty: 0.5, name: 'small shallot', plural: 'small shallots', prep: 'very finely chopped', scale: 'halve', ref: 'shallot' },
    { id: 'butter', qty: 5, unit: 'g', name: 'unsalted butter', scale: 'weight', ref: 'butter' },
    { id: 'rice', qty: 40, unit: 'g', name: 'risotto rice', scale: 'weight', ref: 'risotto rice' },
    { id: 'stock', qty: 300, unit: 'ml', name: 'hot low-salt stock', scale: 'weight', ref: 'stock', chip: 'low-salt stock' },
    { id: 'peas', qty: 2, unit: 'tbsp', name: 'frozen peas', scale: 'spoon', ref: 'peas' },
    { id: 'grana', qty: 10, unit: 'g', name: 'Grana Padano', prep: 'finely grated', scale: 'weight', ref: 'Grana Padano' }
  ]}],
  steps: [
    { text: 'Soften the shallot in the butter over a low heat for 5 minutes.', uses: ['shallot', 'butter'] },
    { text: 'Add the risotto rice and stir for 1 minute.', uses: ['rice'] },
    { text: 'Add the hot stock a ladle at a time, stirring and waiting for each ladle to soak in before adding the next. This takes 18 to 20 minutes.', uses: ['stock'] },
    { text: 'Add the peas for the last 4 minutes and crush a few with the back of a spoon.', uses: ['peas'] },
    { text: 'Stir in the Grana Padano and let the risotto cool before serving.', uses: ['grana'] }
  ],
  notes: [{ title: 'Leftovers', text: 'Cool any leftover risotto quickly and reheat it only once, until piping hot.' }]
},
{
  slug: 'toast-cream-cheese-cucumber', title: 'Toast Fingers with Cream Cheese and Cucumber', short: 'Cream cheese toast',
  description: 'A small supper of cream cheese toast fingers and cucumber sticks.',
  serves: 1, defaultServings: 1, prep: 5, cook: 2, course: TED, cuisine: '', main: 'Bread', labels: ['Quick'],
  groups: [{ name: '', items: [
    { id: 'bread', qty: 1, name: 'slice of bread', plural: 'slices of bread', scale: 'whole', ref: 'bread' },
    { id: 'cheese', qty: 1, unit: 'tbsp', name: 'full-fat cream cheese', scale: 'spoon', ref: 'cream cheese' },
    { id: 'cucumber', qty: 40, unit: 'g', name: 'cucumber', scale: 'weight', ref: 'cucumber' }
  ]}],
  steps: [
    { text: 'Toast the bread lightly and spread it thinly with the cream cheese.', uses: ['bread', 'cheese'] },
    { text: 'Cut the toast into fingers.', uses: [] },
    { text: 'Peel the cucumber and cut it into sticks about the size of your finger.', uses: ['cucumber'] }
  ],
  notes: []
},
{
  slug: 'cheese-on-toast-fingers', title: 'Cheese on Toast Fingers', short: 'Cheese on toast',
  description: 'Grilled cheddar on toast, cooled and cut into fingers.',
  serves: 1, defaultServings: 1, prep: 2, cook: 5, airC: 180, course: TED, cuisine: 'British', main: 'Bread', labels: ['Quick'],
  groups: [{ name: '', items: [
    { id: 'bread', qty: 1, name: 'slice of bread', plural: 'slices of bread', scale: 'whole', ref: 'bread' },
    { id: 'cheddar', qty: 15, unit: 'g', name: 'mature cheddar', prep: 'grated', scale: 'weight', ref: 'cheddar' }
  ]}],
  steps: [
    { text: 'Heat the air fryer to 180°C. Put the bread on the crisper tray and toast it for 2 minutes.', uses: ['bread'] },
    { text: 'Turn it over, scatter the cheddar on top and cook for 2 to 3 minutes more, until the cheese melts.', uses: ['cheddar'] },
    { text: 'Let it cool for a few minutes and cut it into fingers.', uses: [] }
  ],
  notes: [{ title: 'Under the Grill', text: 'Toast one side under a hot grill, then add the cheddar to the other side and grill for 2 minutes.' }]
},
{
  slug: 'chicken-teriyaki-rice-bowls', title: 'Chicken Teriyaki Rice Bowls', short: 'Teriyaki bowls',
  description: 'Chicken thighs glazed in a quick teriyaki sauce, sliced over rice with edamame and cucumber.',
  serves: 2, prep: 10, cook: 20, course: 'Dinners', cuisine: 'Japanese', main: 'Chicken', labels: ['Weeknight'],
  groups: [{ name: '', items: [
    { id: 'rice', qty: 150, unit: 'g', name: 'jasmine rice', scale: 'weight', ref: 'rice' },
    { id: 'water', qty: 300, unit: 'ml', name: 'cold water', prep: 'for the rice', scale: 'weight', ref: 'water' },
    { id: 'soy', qty: 3, unit: 'tbsp', name: 'soy sauce', scale: 'spoon', liquid: true, ref: 'soy sauce' },
    { id: 'mirin', qty: 2, unit: 'tbsp', name: 'mirin', scale: 'spoon', liquid: true, ref: 'mirin' },
    { id: 'sugar', qty: 1, unit: 'tbsp', name: 'soft brown sugar', scale: 'spoon', ref: 'sugar' },
    { id: 'garlic', qty: 1, name: 'garlic clove', plural: 'garlic cloves', prep: 'grated', scale: 'whole', ref: 'garlic' },
    { id: 'ginger', qty: 5, unit: 'g', name: 'fresh ginger', prep: 'grated', scale: 'weight', ref: 'ginger', chip: 'ginger' },
    { id: 'chicken', qty: 4, name: 'boneless chicken thigh', plural: 'boneless chicken thighs', prep: 'skin removed', scale: 'wholeUp', ref: 'chicken', chip: 'chicken thighs' },
    { id: 'oil', qty: 1, unit: 'tbsp', name: 'vegetable oil', scale: 'spoon', liquid: true, ref: 'oil' },
    { id: 'edamame', qty: 100, unit: 'g', name: 'frozen edamame beans', scale: 'weight', ref: 'edamame' },
    { id: 'cucumber', qty: 0.5, name: 'cucumber', plural: 'cucumbers', prep: 'sliced', scale: 'halve', ref: 'cucumber' },
    { id: 'onions', qty: 2, name: 'spring onion', plural: 'spring onions', prep: 'sliced', scale: 'whole', ref: 'spring onions' },
    { id: 'sesame', phrase: 'Sesame seeds', prep: 'to serve', scale: 'fixed', ref: 'sesame', chip: 'sesame seeds' }
  ]}],
  steps: [
    { text: 'Put the rice and water in the Sistema rice cooker, fit both lids and microwave on full power for 10 minutes.', uses: ['rice', 'water'] },
    { text: 'Mix the soy sauce, mirin, sugar, garlic and ginger in a jug.', uses: ['soy', 'mirin', 'sugar', 'garlic', 'ginger'] },
    { text: 'Fry the chicken in the oil over a medium-high heat for 5 to 6 minutes on each side, until cooked through.', uses: ['chicken', 'oil'] },
    { text: 'Pour in the sauce and let it bubble for 2 minutes, turning the chicken until it is glazed.', uses: [] },
    { text: 'Cook the edamame in boiling water for 3 minutes. Slice the chicken and serve it over the rice with the edamame, cucumber, spring onions and sesame seeds.', uses: ['edamame', 'cucumber', 'onions', 'sesame'] }
  ],
  notes: [{ title: 'For Ted', text: 'The teriyaki sauce is too salty for Ted. Any leftover rice makes his egg fried rice the next day.' }]
},
{
  slug: 'roast-pork-belly', title: 'Roast Pork Belly with Mash, Carrots and Broccoli', short: 'Roast pork belly',
  description: 'Thick strips of pork belly cooked slowly in the air fryer until soft, then blasted for crackling, with mash, carrots and broccoli.',
  serves: 2, prep: 15, cook: 110, airC: 160, course: 'Dinners', cuisine: 'British', main: 'Pork', labels: ['Weekend', 'Ted can share'],
  source: { name: 'Pipers & Co cooking instructions' },
  groups: [
    { name: 'For the Pork', items: [
      { id: 'pork', qty: 2, name: 'pork belly chunky', plural: 'pork belly chunkies', prep: 'about 260g each, defrosted', scale: 'wholeUp', ref: 'pork', chip: 'pork belly' },
      { id: 'oil', qty: 1, unit: 'tsp', name: 'olive oil', scale: 'spoon', liquid: true, ref: 'oil' },
      { id: 'salt', phrase: 'Sea salt', scale: 'fixed', ref: 'salt', chip: 'salt' }
    ]},
    { name: 'For the Mash & Vegetables', items: [
      { id: 'potatoes', qty: 600, unit: 'g', name: 'floury potatoes, such as Maris Piper', prep: 'peeled and cut into chunks', scale: 'weight', ref: 'potatoes', chip: 'potatoes' },
      { id: 'carrots', qty: 2, name: 'carrot', plural: 'carrots', prep: 'cut into batons', scale: 'halve', ref: 'carrots' },
      { id: 'broccoli', qty: 0.5, name: 'head of broccoli', plural: 'heads of broccoli', prep: 'cut into florets', scale: 'halve', ref: 'broccoli' },
      { id: 'butter', qty: 25, unit: 'g', name: 'unsalted butter', scale: 'weight', ref: 'butter' },
      { id: 'milk', qty: 50, unit: 'ml', name: 'whole milk', scale: 'weight', ref: 'milk' },
      { id: 'apple', phrase: 'Apple sauce', prep: 'to serve', scale: 'fixed', ref: 'apple sauce', chip: 'apple sauce' }
    ]}
  ],
  steps: [
    { text: 'Pat the pork dry and score the skin with a sharp knife. Rub the skin with the oil and plenty of salt. Heat the air fryer to 160°C.', uses: ['pork', 'oil', 'salt'] },
    { text: 'Put the pork skin side up on the crisper tray and cook it for 1 hour 30 minutes, until the fat is soft and the middle of the meat reaches 70°C.', uses: [] },
    { text: 'Turn the air fryer up to 200°C and cook the pork for 15 to 20 minutes more, until the skin blisters into crackling. Rest it for 5 minutes.', uses: [] },
    { text: 'While the pork cooks, boil the potatoes for 15 to 20 minutes, until soft, adding the carrots for the last 10 minutes. Steam the broccoli over the pan for the last 5 minutes.', uses: ['potatoes', 'carrots', 'broccoli'] },
    { text: 'Drain the potatoes and mash them with the butter and milk. Spoon out Ted\'s mash before you season the rest with salt.', uses: ['butter', 'milk'] },
    { text: 'Serve the pork with the mash, carrots, broccoli and apple sauce.', uses: ['apple'] }
  ],
  notes: [
    { title: 'In the Oven', text: 'Cook the pork on a tray at 150°C for 1 hour 45 minutes, then turn the oven up to 220°C for 20 minutes, until the skin crackles.' },
    { title: 'Defrosting', text: 'Pipers delivers the pork frozen. Defrost it in the fridge overnight and cook it within 3 days.' },
    { title: 'For Ted', text: 'Give Ted small pieces of meat from under the skin with the fat trimmed off, because the salt sits on the skin. Serve it with his unseasoned mash and soft carrot and broccoli cut small.' }
  ]
},
{
  slug: 'roast-chicken', title: 'Roast Chicken with Roast Potatoes and Carrots', short: 'Roast chicken',
  description: 'A whole chicken roasted with lemon and garlic, crisp roast potatoes, carrots, broccoli and gravy.',
  serves: 4, prep: 20, cook: 95, ovenC: 200, course: 'Dinners', cuisine: 'British', main: 'Chicken', labels: ['Weekend', 'Ted can share'],
  groups: [{ name: '', items: [
    { id: 'chicken', qty: 1, name: 'whole chicken', prep: 'about 1.6kg', scale: 'fixed', ref: 'chicken' },
    { id: 'lemon', qty: 1, name: 'lemon', prep: 'halved', scale: 'fixed', ref: 'lemon' },
    { id: 'garlic', qty: 1, name: 'garlic bulb', prep: 'halved across the middle', scale: 'fixed', ref: 'garlic' },
    { id: 'oil', qty: 3, unit: 'tbsp', name: 'olive oil', scale: 'spoon', liquid: true, ref: 'oil' },
    { id: 'salt', phrase: 'Sea salt', scale: 'fixed', ref: 'salt', chip: 'salt' },
    { id: 'potatoes', qty: 1000, unit: 'g', name: 'floury potatoes, such as Maris Piper', prep: 'peeled and cut into chunks', scale: 'weight', ref: 'potatoes', chip: 'potatoes' },
    { id: 'carrots', qty: 4, name: 'carrot', plural: 'carrots', prep: 'halved lengthways', scale: 'halve', ref: 'carrots' },
    { id: 'broccoli', qty: 1, name: 'head of broccoli', plural: 'heads of broccoli', prep: 'cut into florets', scale: 'halve', ref: 'broccoli' },
    { id: 'gravy', phrase: 'Gravy', prep: 'made from granules or your own', scale: 'fixed', ref: 'gravy', chip: 'gravy' }
  ]}],
  steps: [
    { text: 'Heat the oven to 200°C. Put the lemon and garlic inside the chicken, rub the skin with 1 tbsp of the oil and plenty of salt, and roast for 1 hour 20 minutes, until the juices run clear.', uses: ['chicken', 'lemon', 'garlic', { id: 'oil', part: 1 / 3 }, 'salt'] },
    { text: 'Boil the potatoes for 8 minutes. Keep a couple of pieces back for Ted and boil them until soft.', uses: ['potatoes'] },
    { text: 'Drain the rest, shake them to rough up the edges and roast them in the rest of the oil with the carrots for 50 to 60 minutes, turning once.', uses: [{ id: 'oil', part: 2 / 3 }, 'carrots'] },
    { text: 'Rest the chicken under foil for 15 minutes while you steam the broccoli and make the gravy.', uses: ['broccoli', 'gravy'] },
    { text: 'Carve the chicken, taking Ted\'s portion before anything goes near the gravy.', uses: [] }
  ],
  notes: [
    { title: 'For Ted', text: 'Give Ted chicken from under the skin, because the skin carries the salt. Mash his boiled potato with a little unsalted butter and milk, and cut a carrot and some broccoli small. Serve it with no gravy.' },
    { title: 'Air Fryer', text: 'A whole chicken and the potatoes together need the oven. With a large air fryer, you can cook the chicken on its own at 180°C for 50 to 60 minutes, breast side down for the first half.' },
    { title: 'Leftovers', text: 'Keep leftover chicken in the fridge for 2 days, for sandwiches or Ted\'s meals.' }
  ]
},
{
  slug: 'chicken-ramen', title: 'Chicken Ramen', short: 'Chicken ramen',
  description: 'A soy sauce chicken broth with ramen noodles, sticky glazed chicken thighs, soft-boiled eggs, shiitake and greens.',
  serves: 4, prep: 15, rest: 60, restLabel: 'Marinating', cook: 35, airC: 200, course: 'Dinners', cuisine: 'Japanese', main: 'Chicken', labels: ['Weekend'],
  source: { name: 'The Flavor Bender, by Dini Kodippili', url: 'https://www.theflavorbender.com/easy-homemade-chicken-ramen/' },
  groups: [
    { name: 'For the Chicken', items: [
      { id: 'cmirin', qty: 2, unit: 'tbsp', name: 'mirin', scale: 'spoon', liquid: true, ref: 'mirin' },
      { id: 'cdark', qty: 1, unit: 'tbsp', name: 'dark soy sauce', scale: 'spoon', liquid: true, ref: 'dark soy sauce' },
      { id: 'clight', qty: 1, unit: 'tbsp', name: 'light soy sauce', scale: 'spoon', liquid: true, ref: 'light soy sauce' },
      { id: 'cayenne', qty: 0.25, unit: 'tsp', name: 'cayenne pepper', scale: 'spoon', ref: 'cayenne' },
      { id: 'cgarlic', qty: 2, name: 'garlic clove', plural: 'garlic cloves', prep: 'finely chopped', scale: 'whole', ref: 'garlic' },
      { id: 'chicken', qty: 4, name: 'boneless chicken thigh', plural: 'boneless chicken thighs', prep: 'skin on or off', scale: 'wholeUp', ref: 'chicken', chip: 'chicken thighs' }
    ]},
    { name: 'For the Glaze', items: [
      { id: 'sugar', qty: 2, unit: 'tsp', name: 'soft brown sugar', scale: 'spoon', ref: 'sugar' },
      { id: 'gdark', qty: 2, unit: 'tbsp', name: 'dark soy sauce', scale: 'spoon', liquid: true, ref: 'dark soy sauce' }
    ]},
    { name: 'For the Broth', items: [
      { id: 'stock', qty: 1000, unit: 'ml', name: 'unsalted or low-salt chicken stock', scale: 'weight', ref: 'stock', chip: 'chicken stock' },
      { id: 'bonions', qty: 4, name: 'spring onion', plural: 'spring onions', prep: 'cut in half', scale: 'whole', ref: 'spring onions' },
      { id: 'bgarlic', qty: 5, name: 'garlic clove', plural: 'garlic cloves', prep: 'left whole', scale: 'whole', ref: 'garlic' },
      { id: 'ginger', qty: 30, unit: 'g', name: 'fresh ginger', prep: 'sliced', scale: 'weight', ref: 'ginger', chip: 'ginger' },
      { id: 'chillies', qty: 4, name: 'red chilli', plural: 'red chillies', prep: 'halved, optional', scale: 'whole', ref: 'chillies' },
      { id: 'blight', qty: 4, unit: 'tbsp', name: 'light soy sauce', scale: 'spoon', liquid: true, ref: 'light soy sauce' },
      { id: 'bmirin', qty: 4, unit: 'tbsp', name: 'mirin', scale: 'spoon', liquid: true, ref: 'mirin' },
      { id: 'dried', qty: 6, name: 'dried shiitake mushroom', plural: 'dried shiitake mushrooms', prep: 'optional', scale: 'whole', ref: 'dried shiitake' },
      { id: 'fresh', qty: 225, unit: 'g', name: 'fresh shiitake mushrooms', prep: 'sliced', scale: 'weight', ref: 'fresh shiitake', chip: 'fresh shiitake' },
      { id: 'noodles', qty: 340, unit: 'g', name: 'dried ramen noodles', scale: 'weight', ref: 'noodles' },
      { id: 'eggs', qty: 4, name: 'large egg', plural: 'large eggs', scale: 'wholeUp', ref: 'eggs' }
    ]},
    { name: 'For the Greens', items: [
      { id: 'greens', qty: 1, name: 'large bunch of pak choi or spinach', plural: 'large bunches of pak choi or spinach', scale: 'halve', ref: 'greens', chip: 'pak choi or spinach' },
      { id: 'gsoy', phrase: 'Soy sauce', scale: 'fixed', ref: 'soy sauce', chip: 'soy sauce' },
      { id: 'sesame', phrase: 'A drizzle of sesame oil', scale: 'fixed', ref: 'sesame oil', chip: 'sesame oil' },
      { id: 'ggarlic', qty: 2, name: 'garlic clove', plural: 'garlic cloves', prep: 'thinly sliced', scale: 'whole', ref: 'garlic' }
    ]},
    { name: 'To Serve', items: [
      { id: 'sonions', qty: 4, name: 'spring onion', plural: 'spring onions', prep: 'finely sliced', scale: 'whole', ref: 'spring onions' },
      { id: 'radishes', phrase: 'Sliced radishes or bean sprouts', scale: 'fixed', ref: 'radishes', chip: 'radishes or bean sprouts' },
      { id: 'chillioil', phrase: 'Chilli garlic oil', scale: 'fixed', ref: 'chilli oil', chip: 'chilli garlic oil' }
    ]}
  ],
  steps: [
    { text: 'Mix the mirin, dark soy sauce, light soy sauce, cayenne and garlic in a bowl and turn the chicken in it. Leave it to marinate for at least 1 hour, or overnight in the fridge.', uses: ['cmirin', 'cdark', 'clight', 'cayenne', 'cgarlic', 'chicken'] },
    { text: 'Heat the air fryer to 200°C. Lay the chicken on the crisper tray smooth side down and cook for 10 minutes.', uses: [] },
    { text: 'Mix the sugar and dark soy sauce for the glaze. Turn the chicken, brush over the glaze and cook for 8 to 10 minutes more, until sticky and cooked through, then let it rest and slice it.', uses: ['sugar', 'gdark'] },
    { text: 'Meanwhile, put the stock, spring onions, garlic, ginger, chillies, light soy sauce, mirin and dried shiitake in a pan. Cover, bring to the boil, then simmer over a medium heat for 20 to 25 minutes.', uses: ['stock', 'bonions', 'bgarlic', 'ginger', 'chillies', 'blight', 'bmirin', 'dried'] },
    { text: 'Lower the eggs into a pan of boiling water and cook them for 6 to 6½ minutes. Cool them under cold running water and peel them.', uses: ['eggs'] },
    { text: 'Cook the noodles in boiling water for 1 minute less than the packet says. Drain them and divide them between the bowls.', uses: ['noodles'] },
    { text: 'Strain the broth and return it to the pan. Slice the dried shiitake, add them with the fresh shiitake and simmer for 5 minutes until the mushrooms soften.', uses: ['fresh'] },
    { text: 'Toss the greens with a little soy sauce, sesame oil and the sliced garlic. Cover and microwave them in short bursts of about 1 minute until just wilted.', uses: ['greens', 'gsoy', 'sesame', 'ggarlic'] },
    { text: 'Pour the hot broth over the noodles and top with the chicken, halved eggs, greens, spring onions, radishes and chilli oil.', uses: ['sonions', 'radishes', 'chillioil'] }
  ],
  notes: [
    { title: 'In the Oven', text: 'Roast the chicken on a lined tray at 200°C for 15 minutes, then glaze it and roast for 10 to 15 minutes more.' },
    { title: 'Quicker Version', text: 'Add the marinated chicken to the broth with the garlic and ginger and simmer it for 20 minutes. Shred it and return it to the broth with the mushrooms.' },
    { title: 'More Flavour', text: 'A small pinch of MSG in the broth deepens the flavour.' },
    { title: 'For Ted', text: 'Leave this one out for Ted, because the soy sauce makes the broth very salty.' }
  ]
},
{
  slug: 'sausage-mash-gravy-cabbage', title: 'Sausage and Mash with Gravy and Cabbage', short: 'Sausage and mash',
  description: 'Roast sausages with buttery mash, onion gravy and cabbage from the freezer.',
  serves: 2, prep: 10, cook: 25, airC: 190, course: 'Dinners', cuisine: 'British', main: 'Pork', labels: ['Weeknight'],
  groups: [{ name: '', items: [
    { id: 'sausages', qty: 6, name: 'Cumberland sausage', plural: 'Cumberland sausages', scale: 'wholeUp', ref: 'sausages' },
    { id: 'potatoes', qty: 800, unit: 'g', name: 'floury potatoes, such as Maris Piper', prep: 'peeled and cut into chunks', scale: 'weight', ref: 'potatoes', chip: 'potatoes' },
    { id: 'butter', qty: 30, unit: 'g', name: 'butter', scale: 'weight', ref: 'butter' },
    { id: 'milk', qty: 60, unit: 'ml', name: 'whole milk', scale: 'weight', ref: 'milk' },
    { id: 'season', phrase: 'Salt and black pepper', scale: 'fixed', ref: 'salt', chip: 'salt and pepper' },
    { id: 'cabbage', qty: 300, unit: 'g', name: 'frozen sliced cabbage', scale: 'weight', ref: 'cabbage', chip: 'frozen cabbage' },
    { id: 'gravy', phrase: 'Onion gravy', prep: 'made from granules or your own', scale: 'fixed', ref: 'gravy', chip: 'gravy' }
  ]}],
  steps: [
    { text: 'Boil the potatoes in salted water for 15 to 20 minutes until soft.', uses: ['potatoes'] },
    { text: 'Meanwhile, heat the air fryer to 190°C and cook the sausages for 12 to 15 minutes, turning them halfway, until browned and cooked through.', uses: ['sausages'] },
    { text: 'Drain the potatoes and mash them with the butter and milk. Season with salt and pepper.', uses: ['butter', 'milk', 'season'] },
    { text: 'Cook the cabbage in a pan of boiling water for 4 to 5 minutes and drain it.', uses: ['cabbage'] },
    { text: 'Make the gravy and pour it over the sausages, mash and cabbage.', uses: ['gravy'] }
  ],
  notes: [{ title: 'In the Oven', text: 'Roast the sausages on a tray at 180°C for 25 minutes, turning them once.' }, { title: 'For Ted', text: 'Set aside some mash for Ted before you season it, with soft cabbage cut small. The sausages and gravy are too salty for him.' }]
},
{
  slug: 'microwave-rice', title: 'Microwave Rice', short: 'Microwave rice',
  description: 'Jasmine or long-grain rice cooked in the Sistema microwave rice cooker, with a little left over for Ted.',
  serves: 2, prep: 2, cook: 10, course: 'Basics', cuisine: '', main: 'Rice', labels: ['Quick'],
  equipment: ['A Sistema microwave rice cooker, 2.6 litres'],
  groups: [{ name: '', items: [
    { id: 'rice', qty: 150, unit: 'g', name: 'jasmine or long-grain rice', scale: 'weight', ref: 'rice' },
    { id: 'water', qty: 300, unit: 'ml', name: 'cold water', scale: 'weight', ref: 'water' }
  ]}],
  steps: [
    { text: 'Put the rice and water in the rice cooker and fit both lids.', uses: ['rice', 'water'] },
    { text: 'Microwave on full power for 10 minutes.', uses: [] },
    { text: 'Fluff the rice with a fork and serve.', uses: [] }
  ],
  notes: [
    { title: 'The Ratio', text: 'Use 75g of rice for each person and twice that weight of water. For 2 people, this leaves a little over for Ted.' },
    { title: 'Leftovers', text: 'Cool leftover rice within an hour, keep it in the fridge and use it the next day, such as in Ted\'s egg fried rice. Reheat it only once, until piping hot.' },
    { title: 'Bigger Batches', text: 'The 10 minutes is for 2 people. Larger amounts may need a few minutes more, so check the rice is tender and the water has gone.' }
  ]
},
{
  slug: 'curried-coconut-chicken-rice', title: 'Curried Coconut Chicken and Rice', short: 'Coconut chicken and rice',
  description: 'Oyster sauce chicken thighs over rice in a yellow curry and coconut broth, with chilli oil and crispy onions.',
  serves: 4, prep: 10, cook: 30, airC: 200, course: 'Dinners', cuisine: 'Thai', main: 'Chicken', labels: ['Weeknight'],
  source: { name: 'Mob, by Chloe René', url: 'https://www.mob.co.uk/recipes/curried-coconut-chicken-rice' },
  groups: [
    { name: 'For the Chicken', items: [
      { id: 'chicken', qty: 8, name: 'boneless, skinless chicken thigh', plural: 'boneless, skinless chicken thighs', scale: 'wholeUp', ref: 'chicken', chip: 'chicken thighs' },
      { id: 'garlic', qty: 1, name: 'garlic clove', plural: 'garlic cloves', scale: 'whole', ref: 'garlic' },
      { id: 'oyster', qty: 4, unit: 'tbsp', name: 'oyster sauce', scale: 'spoon', liquid: true, ref: 'oyster sauce' },
      { id: 'season', phrase: 'Salt and black pepper', scale: 'fixed', ref: 'salt', chip: 'salt and pepper' },
      { id: 'oil', phrase: 'A drizzle of olive oil', scale: 'fixed', ref: 'oil', chip: 'olive oil' }
    ]},
    { name: 'For the Broth', items: [
      { id: 'coriander', qty: 10, unit: 'g', name: 'fresh coriander', scale: 'weight', ref: 'coriander', chip: 'coriander' },
      { id: 'paste', qty: 2, unit: 'tbsp', name: 'Thai yellow curry paste', scale: 'spoon', ref: 'curry paste' },
      { id: 'coconut', qty: 1, unit: 'tin', tinSize: 400, tinUnit: 'ml', name: 'full-fat coconut milk', scale: 'tin', ref: 'coconut milk' },
      { id: 'water', qty: 400, unit: 'ml', name: 'water', scale: 'weight', ref: 'water' },
      { id: 'lime', qty: 1, name: 'lime', plural: 'limes', prep: 'juiced', scale: 'halve', ref: 'lime juice', chip: 'lime juice' },
      { id: 'sugar', qty: 0.5, unit: 'tsp', name: 'sugar', scale: 'spoon', ref: 'sugar' }
    ]},
    { name: 'For the Rice', items: [
      { id: 'rice', qty: 300, unit: 'g', name: 'jasmine rice', scale: 'weight', ref: 'rice' },
      { id: 'ricewater', qty: 600, unit: 'ml', name: 'cold water', prep: 'for the rice', scale: 'weight', ref: 'water' }
    ]},
    { name: 'To Serve', items: [
      { id: 'chillioil', qty: 4, unit: 'tsp', name: 'chilli oil', scale: 'spoon', ref: 'chilli oil' },
      { id: 'onions', qty: 25, unit: 'g', name: 'crispy fried onions', scale: 'weight', ref: 'crispy onions', chip: 'crispy onions' },
      { id: 'wedges', qty: 1, name: 'lime', plural: 'limes', prep: 'cut into wedges', scale: 'halve', ref: 'lime wedge', chip: 'lime wedges' }
    ]}
  ],
  steps: [
    { text: 'Put the chicken in a bowl, grate over the garlic and stir through half the oyster sauce. Season with salt and pepper and leave it to marinate.', uses: ['chicken', 'garlic', { id: 'oyster', part: 0.5 }, 'season'] },
    { text: 'Pick the coriander leaves and finely chop the stalks, keeping them separate.', uses: ['coriander'] },
    { text: 'Put the rice and water in the Sistema rice cooker, fit both lids and microwave on full power for 10 minutes.', uses: ['rice', 'ricewater'] },
    { text: 'Heat a saucepan over a medium-high heat, add a splash of the coconut milk and cook for a few seconds. Stir in the coriander stalks, curry paste and the rest of the oyster sauce and cook until fragrant.', uses: ['paste', { id: 'oyster', part: 0.5 }] },
    { text: 'Add the water and the rest of the coconut milk, bring to the boil, then simmer over a low heat for 10 to 15 minutes.', uses: ['coconut', 'water'] },
    { text: 'Meanwhile, heat the air fryer to 200°C. Brush the chicken with the oil and cook it on the crisper tray for 18 to 20 minutes, turning it halfway, until charred at the edges and cooked through.', uses: ['oil'] },
    { text: 'Season the broth with the lime juice, sugar, salt and pepper, adding more lime juice if you like it sharper.', uses: ['lime', 'sugar'] },
    { text: 'Divide the rice between bowls, ladle over the broth and top with the sliced chicken. Finish with the chilli oil, crispy onions, coriander leaves and a lime wedge.', uses: ['chillioil', 'onions', 'wedges'] }
  ],
  notes: [
    { title: 'In a Pan', text: 'Fry the chicken in the oil in a frying pan over a medium-high heat for 5 to 6 minutes on each side, until charred and cooked through.' },
    { title: 'For Ted', text: 'Leave this one out for Ted, because the oyster sauce and curry paste make it salty.' }
  ]
},
{
  slug: 'spicy-pork-sesame-noodles', title: 'Spicy Pork and Sesame Noodles', short: 'Spicy pork noodles',
  description: 'Gochujang pork mince over egg noodles tossed in a tahini and miso sauce, with a cucumber and herb salad. Keeps for 5 days.',
  serves: 4, prep: 15, cook: 20, course: 'Dinners', cuisine: 'Korean', main: 'Pork', labels: ['Batch cook', 'Weeknight'],
  source: { name: 'Mob, by Finn Tonry', url: 'https://www.mob.co.uk/recipes/spicy-pork-sesame-noodles' },
  equipment: ['A blender or mini chopper'],
  groups: [
    { name: 'For the Tahini Miso Sauce', items: [
      { id: 'tahini', qty: 120, unit: 'g', name: 'tahini', scale: 'weight', ref: 'tahini' },
      { id: 'miso', qty: 50, unit: 'g', name: 'white miso', scale: 'weight', ref: 'miso' },
      { id: 'svinegar', qty: 40, unit: 'ml', name: 'rice vinegar', scale: 'weight', ref: 'rice vinegar' },
      { id: 'ssoy', qty: 40, unit: 'ml', name: 'Japanese soy sauce', scale: 'weight', ref: 'soy sauce' },
      { id: 'msg', qty: 1, unit: 'tsp', name: 'MSG', scale: 'spoon', ref: 'MSG' },
      { id: 'swater', qty: 130, unit: 'ml', name: 'water', scale: 'weight', ref: 'water' }
    ]},
    { name: 'For the Salad', items: [
      { id: 'cucumber', qty: 1, name: 'cucumber', plural: 'cucumbers', scale: 'halve', ref: 'cucumber' },
      { id: 'coriander', qty: 15, unit: 'g', name: 'fresh coriander', scale: 'weight', ref: 'coriander', chip: 'coriander' },
      { id: 'mint', qty: 15, unit: 'g', name: 'fresh mint', scale: 'weight', ref: 'mint', chip: 'mint' },
      { id: 'sponions', qty: 8, name: 'spring onion', plural: 'spring onions', prep: 'greens for the salad, whites for the pork', scale: 'whole', ref: 'spring onion' }
    ]},
    { name: 'For the Pork', items: [
      { id: 'garlic', qty: 6, name: 'garlic clove', plural: 'garlic cloves', scale: 'whole', ref: 'garlic' },
      { id: 'gochujang', qty: 2, unit: 'tbsp', name: 'gochujang', scale: 'spoon', ref: 'gochujang' },
      { id: 'flakes', qty: 2, unit: 'tbsp', name: 'Korean chilli flakes', scale: 'spoon', ref: 'chilli flakes' },
      { id: 'dsoy', qty: 2, unit: 'tbsp', name: 'Chinese dark soy sauce', scale: 'spoon', liquid: true, ref: 'dark soy sauce' },
      { id: 'pvinegar', qty: 1, unit: 'tbsp', name: 'rice vinegar', scale: 'spoon', liquid: true, ref: 'rice vinegar' },
      { id: 'sugar', qty: 1, unit: 'tbsp', name: 'sugar', scale: 'spoon', ref: 'sugar' },
      { id: 'pork', qty: 1000, unit: 'g', name: '5% fat pork mince', scale: 'weight', ref: 'pork' },
      { id: 'oil', qty: 2, unit: 'tbsp', name: 'vegetable oil', scale: 'spoon', liquid: true, ref: 'oil' }
    ]},
    { name: 'To Serve', items: [
      { id: 'noodles', qty: 400, unit: 'g', name: 'egg noodles', scale: 'weight', ref: 'noodles' }
    ]}
  ],
  steps: [
    { text: 'Whisk the tahini, miso, rice vinegar, soy sauce and MSG together in a bowl until smooth. Whisk in the water a little at a time until the sauce is silky.', uses: ['tahini', 'miso', 'svinegar', 'ssoy', 'msg', 'swater'] },
    { text: 'Halve the cucumber lengthways and slice it thinly into half moons. Pick the coriander and mint leaves.', uses: ['cucumber', 'coriander', 'mint'] },
    { text: 'Thinly slice the green tops of the spring onions and toss them with the cucumber and herbs, keeping the white parts for the pork. Put the salad in iced water to keep it crisp while you cook.', uses: [{ id: 'sponions', part: 0.5 }] },
    { text: 'Blitz the garlic, gochujang, chilli flakes, dark soy sauce, rice vinegar and sugar in a blender to a smooth paste.', uses: ['garlic', 'gochujang', 'flakes', 'dsoy', 'pvinegar', 'sugar'] },
    { text: 'Heat a large frying pan over a high heat, add half the oil and half the pork mince and press it flat. Leave it to brown on one side for 3 to 4 minutes, then break it up and cook it through. Lift it out and repeat with the rest.', uses: ['oil', 'pork'] },
    { text: 'Return all the pork to the pan, add the paste and cook for 2 to 3 minutes, until it darkens and clings to the mince. Stir in the spring onion whites and half the tahini miso sauce and cook for 2 minutes more.', uses: [{ id: 'sponions', part: 0.5 }] },
    { text: 'Cook the noodles following the packet instructions, drain them and toss them with most of the remaining sauce.', uses: ['noodles'] },
    { text: 'Divide the noodles between plates, top with the pork and the drained salad, and drizzle over the last of the sauce.', uses: [] }
  ],
  notes: [
    { title: 'Storing', text: 'The pork, sauce and salad keep for up to 5 days in the fridge in separate tubs. Cook the noodles fresh each day.' },
    { title: 'For Ted', text: 'Leave this one out for Ted, because the gochujang, soy sauce and miso make it spicy and salty.' }
  ]
},
{
  slug: 'spanakopita-roast-chicken', title: 'Spanakopita Roast Chicken', short: 'Spanakopita chicken',
  description: 'Crisp roast chicken legs over garlicky spinach and yoghurt, with feta, dill and buttery shards of sesame filo.',
  serves: 4, prep: 15, cook: 60, ovenC: 200, course: 'Dinners', cuisine: 'Greek', main: 'Chicken', labels: ['Weekend'],
  source: { name: 'Mob, by Kitty Coles', url: 'https://www.mob.co.uk/recipes/spanakopita-roast-chicken' },
  equipment: ['A large, high-sided roasting tray', 'A baking tray lined with baking parchment'],
  groups: [
    { name: 'For the Chicken', items: [
      { id: 'chicken', qty: 4, name: 'chicken leg', plural: 'chicken legs', scale: 'wholeUp', ref: 'chicken' },
      { id: 'lemon', qty: 1, name: 'lemon', plural: 'lemons', scale: 'halve', ref: 'lemon' },
      { id: 'oil', qty: 2, unit: 'tbsp', name: 'olive oil', scale: 'spoon', liquid: true, ref: 'oil' },
      { id: 'oregano', qty: 2, unit: 'tsp', name: 'dried oregano', scale: 'spoon', ref: 'oregano' },
      { id: 'season', phrase: 'Salt and black pepper', scale: 'fixed', ref: 'salt', chip: 'salt and pepper' }
    ]},
    { name: 'For the Filo Shards', items: [
      { id: 'butter', qty: 30, unit: 'g', name: 'unsalted butter', scale: 'weight', ref: 'butter' },
      { id: 'filo', qty: 4, name: 'sheet of filo pastry', plural: 'sheets of filo pastry', scale: 'whole', ref: 'filo' },
      { id: 'sesame', qty: 2, unit: 'tbsp', name: 'sesame seeds', scale: 'spoon', ref: 'sesame seeds' }
    ]},
    { name: 'For the Spinach', items: [
      { id: 'garlic', qty: 3, name: 'garlic clove', plural: 'garlic cloves', scale: 'whole', ref: 'garlic' },
      { id: 'sponions', qty: 6, name: 'spring onion', plural: 'spring onions', scale: 'whole', ref: 'spring onions' },
      { id: 'spinach', qty: 400, unit: 'g', name: 'spinach', scale: 'weight', ref: 'spinach' },
      { id: 'yoghurt', qty: 150, unit: 'g', name: 'full-fat Greek yoghurt', scale: 'weight', ref: 'yoghurt' },
      { id: 'dill', qty: 20, unit: 'g', name: 'fresh dill', prep: 'chopped', scale: 'weight', ref: 'dill', chip: 'dill' }
    ]},
    { name: 'To Serve', items: [
      { id: 'feta', qty: 150, unit: 'g', name: 'feta', scale: 'weight', ref: 'feta' },
      { id: 'wedges', qty: 1, name: 'lemon', plural: 'lemons', prep: 'cut into wedges', scale: 'halve', ref: 'lemon wedges', chip: 'lemon wedges' }
    ]}
  ],
  steps: [
    { text: 'Heat the oven to 200°C. Put the chicken legs in the roasting tray, zest the lemon over them, drizzle with the oil and rub them all over with the oregano and plenty of salt and pepper.', uses: ['chicken', 'lemon', 'oil', 'oregano', 'season'] },
    { text: 'Roast the chicken for 30 minutes.', uses: [] },
    { text: 'Meanwhile, melt the butter. Stack the filo sheets on the lined baking tray, brushing each one with butter, and scatter over the sesame seeds.', uses: ['butter', 'filo', 'sesame'] },
    { text: 'Bake the filo alongside the chicken for 10 to 12 minutes until deep golden, then leave it to cool, when it crisps up further.', uses: [] },
    { text: 'Lightly crush the garlic and roughly chop the spring onions. Add them to the chicken, toss everything in the juices and roast for 10 to 15 minutes more, until the skin is crisp and the juices run clear. Lift out the chicken to rest.', uses: ['garlic', 'sponions'] },
    { text: 'Toss half the spinach in the tray juices and return it to the oven for 3 to 4 minutes until wilted. Add the rest and cook for 2 to 3 minutes more.', uses: ['spinach'] },
    { text: 'Stir the yoghurt and most of the dill through the spinach, squeeze over the juice of half the zested lemon and season with salt and pepper.', uses: ['yoghurt', 'dill'] },
    { text: 'Spoon the spinach onto plates and top with the chicken. Scatter over the rest of the dill, the filo broken into shards and the feta in large crumbs, and serve with the lemon wedges.', uses: ['feta', 'wedges'] }
  ],
  notes: [
    { title: 'Frozen Spinach', text: 'Frozen spinach works too. Add the blocks straight to the tray and stir them halfway through.' },
    { title: 'Timing', text: 'Chicken legs can take longer than the method says to crisp, so go by the skin and the juices.' },
    { title: 'Legs from a Whole Chicken', text: 'The 2 legs from a whole chicken serve 2. Cut through the skin between the leg and the body, bend the leg back until the joint pops, then cut through the joint. Freeze the legs if you are not cooking them within 2 days and defrost them in the fridge overnight.' },
    { title: 'For Ted', text: 'Give Ted chicken from under the skin with some spinach and yoghurt, taken before the feta goes on.' }
  ]
},
{
  slug: 'hainanish-soy-poached-chicken', title: 'Hainan(ish) Soy Poached Chicken', short: 'Soy poached chicken',
  description: 'A whole chicken gently poached in soy, ginger and garlic, served in its broth over seasoned rice with a creamy sesame sauce.',
  serves: 6, prep: 20, rest: 90, restLabel: 'Poaching', cook: 30, course: 'Dinners', cuisine: 'Singaporean', main: 'Chicken', labels: ['Weekend', 'Freezes well'],
  source: { name: 'Mob, by Ben Lippett', url: 'https://www.mob.co.uk/recipes/soy-poached-chicken-sesame-sauce' },
  equipment: ['A large pot with a lid'],
  groups: [
    { name: 'For the Poached Chicken', fixedNote: 'The chicken and its poaching liquid stay the same at every number of servings. Freeze any spare chicken and broth.', items: [
      { id: 'chicken', qty: 1, name: 'whole chicken', prep: 'about 1.5kg', scale: 'fixed', ref: 'chicken' },
      { id: 'water', phrase: 'Cold water or chicken stock', prep: 'to cover', scale: 'fixed', ref: 'water', chip: 'water or stock' },
      { id: 'psonions', qty: 100, unit: 'g', name: 'spring onions', scale: 'fixed', ref: 'spring onions' },
      { id: 'garlic', qty: 5, name: 'garlic clove', plural: 'garlic cloves', scale: 'fixed', ref: 'garlic' },
      { id: 'ginger', qty: 40, unit: 'g', name: 'fresh ginger', scale: 'fixed', ref: 'ginger', chip: 'ginger' },
      { id: 'psoy', qty: 5, unit: 'tbsp', name: 'soy sauce', scale: 'fixed', ref: 'soy sauce' }
    ]},
    { name: 'For the Sesame Sauce', items: [
      { id: 'ssugar', qty: 1, unit: 'tbsp', name: 'sugar', scale: 'spoon', ref: 'sugar' },
      { id: 'svinegar', qty: 1, unit: 'tbsp', name: 'rice vinegar', scale: 'spoon', liquid: true, ref: 'rice vinegar' },
      { id: 'tahini', qty: 3.5, unit: 'tbsp', name: 'tahini', scale: 'spoon', ref: 'tahini' },
      { id: 'ssoy', qty: 1, unit: 'tbsp', name: 'soy sauce', scale: 'spoon', liquid: true, ref: 'soy sauce' },
      { id: 'ice', phrase: 'Iced water', prep: 'to loosen', scale: 'fixed', ref: 'iced water', chip: 'iced water' },
      { id: 'sesame', qty: 1.5, unit: 'tbsp', name: 'toasted sesame seeds', scale: 'spoon', ref: 'sesame seeds' }
    ]},
    { name: 'For the Rice', items: [
      { id: 'rice', qty: 400, unit: 'g', name: 'sushi rice', scale: 'weight', ref: 'rice' },
      { id: 'rsalt', qty: 1, unit: 'tsp', name: 'salt', scale: 'spoon', ref: 'salt' },
      { id: 'rsugar', qty: 2, unit: 'tsp', name: 'sugar', scale: 'spoon', ref: 'sugar' },
      { id: 'rvinegar', qty: 3, unit: 'tsp', name: 'rice vinegar', scale: 'spoon', liquid: true, ref: 'rice vinegar' },
      { id: 'liquid', qty: 480, unit: 'ml', name: 'chicken cooking liquid', prep: 'from the pot', scale: 'weight', ref: 'cooking liquid' }
    ]},
    { name: 'To Serve', items: [
      { id: 'cucumber', qty: 0.5, name: 'cucumber', plural: 'cucumbers', scale: 'halve', ref: 'cucumber' },
      { id: 'ssonions', qty: 100, unit: 'g', name: 'spring onions', scale: 'weight', ref: 'spring onions' },
      { id: 'tsoy', qty: 4, unit: 'tbsp', name: 'soy sauce', scale: 'spoon', liquid: true, ref: 'soy sauce' }
    ]}
  ],
  steps: [
    { text: 'Put the chicken in a large pot and cover it with cold water or chicken stock. Cut the spring onions into chunks, bash the garlic and roughly chop the ginger, then add them to the pot with the soy sauce.', uses: ['chicken', 'water', 'psonions', 'garlic', 'ginger', 'psoy'] },
    { text: 'Bring to a rolling boil over a high heat, then take the pot off the heat straight away. Put the lid on and leave it for 1½ hours, while the heat of the water poaches the chicken.', uses: [] },
    { text: 'Blend or whisk the sugar, rice vinegar, tahini and soy sauce until smooth, adding iced water a little at a time until creamy. Stir in the sesame seeds.', uses: ['ssugar', 'svinegar', 'tahini', 'ssoy', 'ice', 'sesame'] },
    { text: 'Rinse the rice in cold water until the water runs almost clear. Put it in a saucepan with the salt, sugar, rice vinegar and the cooking liquid from the chicken pot.', uses: ['rice', 'rsalt', 'rsugar', 'rvinegar', 'liquid'] },
    { text: 'Cover, bring to the boil, then cook on the lowest heat for 8 to 10 minutes until the liquid is absorbed. Take the pan off the heat and leave it covered for 10 minutes.', uses: [] },
    { text: 'Thinly slice the cucumber and finely chop the spring onions. Lift out the chicken and carve or shred the meat.', uses: ['cucumber', 'ssonions'] },
    { text: 'Return the chicken to the broth and warm it over a medium heat for 5 to 10 minutes.', uses: [] },
    { text: 'Divide the rice between bowls and top with the chicken, cucumber, spring onions and a few ladles of the broth. Finish with a spoonful of soy sauce and plenty of the sesame sauce.', uses: ['tsoy'] }
  ],
  notes: [
    { title: 'Chicken Breasts', text: 'For 2 people, poach 2 chicken breasts in the same way, leaving them in the hot liquid for about 35 minutes.' },
    { title: 'Without the Legs', text: 'You can take the legs off for another meal and poach the rest of the bird in the same way. There is enough breast meat for 2 with some left over, and the carcass still flavours the broth. Check the thickest part of the breast is white all the way through before serving.' },
    { title: 'Storing', text: 'Freeze spare chicken and broth together in portions. Reheat until piping hot and add the cucumber and spring onions at the end.' },
    { title: 'For Ted', text: 'Leave this one out for Ted, because the chicken poaches in soy sauce.' }
  ]
}
];
