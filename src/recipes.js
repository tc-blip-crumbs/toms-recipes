// Tom's Recipes: every recipe follows the house rules in recipe-house-rules.md.
// Units: g, ml, tsp, tbsp, tin, or none (counted). Scale types: weight, spoon, halve, whole, wholeUp, tin, fixed.
// "ref" is the word the method uses for the ingredient; the checker makes sure each step that uses it says it.

module.exports = [
{
  slug: 'red-wine-burnt-onion-beef',
  title: 'Red Wine and Burnt Onion Beef with Creamy Parmesan Butter Beans',
  short: 'Burnt onion beef',
  description: 'Beef braised for hours in red wine with charred shallots and baby potatoes, spooned over butter beans in a Parmesan sauce.',
  serves: 6, prep: 30, cook: 210, cookText: '3 to 3½ hours', ovenC: 160,
  course: 'Dinners', cuisine: 'British', main: 'Beef',
  labels: ['Batch cook', 'Freezes well', 'Weekend'],
  equipment: ['A large casserole with a lid'],
  source: { name: 'Adapted from Holist', url: 'https://holisthub.substack.com' },
  groups: [
    { name: 'For the Beef', items: [
      { id: 'beef', qty: 2000, unit: 'g', name: 'braising steak or chuck steak', prep: 'cut into 5cm chunks', scale: 'weight', ref: 'beef', chip: 'beef' },
      { id: 'oil', qty: 2, unit: 'tbsp', name: 'olive oil', scale: 'spoon', liquid: true, ref: 'oil' },
      { id: 'butter', qty: 15, unit: 'g', name: 'butter', scale: 'weight', ref: 'butter' },
      { id: 'shallots', qty: 5, name: 'shallot', plural: 'shallots', prep: 'thinly sliced', scale: 'whole', ref: 'shallots' },
      { id: 'garlic', qty: 6, name: 'garlic clove', plural: 'garlic cloves', prep: 'crushed', scale: 'whole', ref: 'garlic' },
      { id: 'carrots', qty: 2, name: 'carrot', plural: 'carrots', size: 'medium', prep: 'cut into chunks', scale: 'halve', ref: 'carrots' },
      { id: 'potatoes', qty: 1000, unit: 'g', name: 'baby new potatoes', prep: 'halved if large', scale: 'weight', ref: 'potatoes', chip: 'baby new potatoes' },
      { id: 'passata', qty: 250, unit: 'ml', name: 'passata', scale: 'weight', ref: 'passata' },
      { id: 'wine', qty: 625, unit: 'ml', name: 'red wine', scale: 'weight', ref: 'red wine' },
      { id: 'broth', qty: 750, unit: 'ml', name: 'beef bone broth or beef stock', scale: 'weight', ref: 'bone broth', chip: 'bone broth' },
      { id: 'rosemary', qty: 2, name: 'sprig of rosemary', plural: 'sprigs of rosemary', scale: 'whole', ref: 'rosemary' },
      { id: 'salt', qty: 1.25, unit: 'tsp', name: 'sea salt', scale: 'spoon', ref: 'salt' },
      { id: 'pepper', phrase: 'Black pepper', scale: 'fixed', ref: 'pepper', chip: 'black pepper' }
    ]},
    { name: 'For the Butter Beans', items: [
      { id: 'beans', qty: 2, unit: 'tin', tinSize: 400, name: 'butter beans', prep: 'drained', scale: 'tin', ref: 'butter beans' },
      { id: 'stock', qty: 250, unit: 'ml', name: 'chicken stock', scale: 'weight', ref: 'chicken stock' },
      { id: 'knob', phrase: 'A knob of butter', scale: 'fixed', ref: 'butter', chip: 'a knob of butter' },
      { id: 'parmesan', qty: 30, unit: 'g', name: 'Parmesan', prep: 'finely grated', scale: 'weight', ref: 'Parmesan' },
      { id: 'lemon', phrase: 'A squeeze of lemon juice', scale: 'fixed', ref: 'lemon', chip: 'a squeeze of lemon' },
      { id: 'parsley', phrase: 'A handful of flat-leaf parsley', prep: 'chopped', scale: 'fixed', ref: 'parsley', chip: 'a handful of parsley' }
    ]}
  ],
  steps: [
    { text: 'Heat the oven to 160°C.', uses: [] },
    { text: 'Heat the oil in a large casserole over a medium-high heat. Brown the beef in three batches for 6 to 8 minutes each, until deep brown all over, then lift it onto a plate.', uses: ['oil', 'beef'] },
    { text: 'Turn the heat down to medium and add the butter and shallots. Cook for 10 minutes, stirring often, until deeply caramelised and charred at the edges.', uses: ['butter', 'shallots'] },
    { text: 'Add the garlic, carrots and potatoes and cook for 5 minutes, until glossy and starting to soften.', uses: ['garlic', 'carrots', 'potatoes'] },
    { text: 'Return the beef and its juices to the pot with the passata, red wine, bone broth and rosemary. Bring to the boil and season with the salt and some pepper.', uses: ['passata', 'wine', 'broth', 'rosemary', 'salt', 'pepper'] },
    { text: 'Put the lid on and cook in the oven for 3 to 3½ hours, until the beef falls apart when you press it with a spoon.', uses: [] },
    { text: 'Lift out the rosemary stalks and pull some of the beef apart with two forks.', uses: [] },
    { text: 'About 25 minutes before the beef is ready, put the butter beans and chicken stock in a separate pan. Simmer over a medium heat for 5 to 7 minutes, until the stock has reduced by about half.', uses: ['beans', 'stock'] },
    { text: 'Crush about a quarter of the beans with the back of a spoon. Stir in the Parmesan, the knob of butter and some pepper, and cook gently for 10 minutes until creamy. Finish with the lemon.', uses: ['parmesan', 'knob', 'pepper', 'lemon'] },
    { text: 'Spoon the beans into shallow bowls and top with the beef, carrots, potatoes and plenty of sauce. Scatter over the parsley and some pepper.', uses: ['parsley'] }
  ],
  notes: [
    { title: 'Storing', text: 'The beef keeps for 3 days in the fridge and 3 months in the freezer. The beans take 20 minutes, so make them fresh on the night.' },
    { title: 'For Ted', text: 'Leave this one out for Ted. The wine sauce and Parmesan make it too salty for him.' }
  ]
},
{
  slug: 'red-lentil-curry',
  title: 'Red Lentil Curry',
  short: 'Red lentil curry',
  description: 'Red lentils simmered with tomatoes, warm spices and coconut milk, made rich with almond butter.',
  serves: 4, prep: 10, cook: 35,
  course: 'Dinners', cuisine: 'Indian', main: 'Lentils',
  labels: ['Batch cook', 'Freezes well', 'Ted can share', 'Weeknight', 'Vegan'],
  groups: [
    { name: '', items: [
      { id: 'lentils', qty: 200, unit: 'g', name: 'red lentils', scale: 'weight', ref: 'lentils' },
      { id: 'oil', qty: 1, unit: 'tbsp', name: 'vegetable oil', scale: 'spoon', liquid: true, ref: 'oil' },
      { id: 'garlic', qty: 4, name: 'garlic clove', plural: 'garlic cloves', prep: 'crushed', scale: 'whole', ref: 'garlic' },
      { id: 'ginger', qty: 20, unit: 'g', name: 'fresh ginger', prep: 'peeled and grated', scale: 'weight', ref: 'ginger', chip: 'ginger' },
      { id: 'turmeric', qty: 1, unit: 'tsp', name: 'ground turmeric', scale: 'spoon', ref: 'turmeric' },
      { id: 'chilli', qty: 1, name: 'red chilli', plural: 'red chillies', prep: 'finely chopped', scale: 'halve', ref: 'chilli' },
      { id: 'cumin', qty: 1, unit: 'tsp', name: 'ground cumin', scale: 'spoon', ref: 'cumin' },
      { id: 'gcor', qty: 0.5, unit: 'tsp', name: 'ground coriander', scale: 'spoon', ref: 'ground coriander' },
      { id: 'chillipowder', qty: 1, unit: 'tsp', name: 'mild or hot chilli powder', scale: 'spoon', ref: 'chilli powder', chip: 'chilli powder' },
      { id: 'curry', qty: 2, unit: 'tsp', name: 'curry powder', scale: 'spoon', ref: 'curry powder' },
      { id: 'garam', qty: 1, unit: 'tsp', name: 'garam masala', scale: 'spoon', ref: 'garam masala' },
      { id: 'salt', qty: 1, unit: 'tsp', name: 'sea salt', scale: 'spoon', ref: 'salt' },
      { id: 'pepper', phrase: 'Black pepper', scale: 'fixed', ref: 'pepper', chip: 'black pepper' },
      { id: 'stock', qty: 500, unit: 'ml', name: 'vegetable stock', scale: 'weight', ref: 'stock' },
      { id: 'tomatoes', qty: 1, unit: 'tin', tinSize: 400, name: 'chopped tomatoes', scale: 'tin', ref: 'chopped tomatoes' },
      { id: 'coconut', qty: 1, unit: 'tin', tinSize: 400, tinUnit: 'ml', name: 'coconut milk', scale: 'tin', ref: 'coconut milk' },
      { id: 'almond', qty: 3, unit: 'tbsp', name: 'almond butter', scale: 'spoon', ref: 'almond butter' },
      { id: 'lemon', qty: 0.5, name: 'small lemon', plural: 'small lemons', prep: 'juiced', scale: 'halve', ref: 'lemon', chip: 'lemon' },
      { id: 'fcor', phrase: 'A handful of fresh coriander', prep: 'roughly chopped', scale: 'fixed', ref: 'fresh coriander', chip: 'a handful of coriander' },
      { id: 'rice', qty: 300, unit: 'g', name: 'jasmine rice', prep: 'or naan, to serve', scale: 'weight', ref: 'rice' },
      { id: 'ricewater', qty: 600, unit: 'ml', name: 'cold water', prep: 'for the rice', scale: 'weight', ref: 'water' }
    ]}
  ],
  steps: [
    { text: 'Rinse the lentils in a sieve under cold running water until the water runs clear.', uses: ['lentils'] },
    { text: 'Heat the oil in a large pan over a medium-high heat. Add the garlic, ginger, turmeric and chilli and cook for 2 minutes, stirring often.', uses: ['oil', 'garlic', 'ginger', 'turmeric', 'chilli'] },
    { text: 'Add the cumin, ground coriander, chilli powder, curry powder, garam masala, salt and some pepper. Cook for 30 to 60 seconds, stirring, until the spices smell fragrant.', uses: ['cumin', 'gcor', 'chillipowder', 'curry', 'garam', 'salt', 'pepper'] },
    { text: 'Pour in the stock and scrape up anything stuck to the pan. Stir in the lentils and chopped tomatoes.', uses: ['stock', 'tomatoes'] },
    { text: 'Cover and simmer over a low heat for 20 to 25 minutes, until the lentils are soft. Add a splash of water if the pan gets dry.', uses: [] },
    { text: 'While the curry simmers, put the rice and water in the Sistema rice cooker, fit both lids and microwave on full power for 10 minutes.', uses: ['rice', 'ricewater'] },
    { text: 'Take off the lid and stir in the coconut milk and almond butter. Simmer uncovered for 5 to 8 minutes until the curry thickens, then check the seasoning.', uses: ['coconut', 'almond'] },
    { text: 'Take the pan off the heat and stir in the lemon juice and fresh coriander. Serve with the rice or naan.', uses: ['lemon', 'fcor'] }
  ],
  notes: [
    { title: 'Good Additions', text: 'Stir in roasted cauliflower, spinach, grated carrot, grated parsnip, butter beans or haricot beans.' },
    { title: 'Fresh Turmeric', text: 'Use 1 tbsp fresh turmeric, grated, in place of the ground turmeric.' },
    { title: 'For Ted', text: 'Leave the chilli, chilli powder and salt out of the pan in steps 2 and 3. Spoon out Ted\'s portion before the almond butter goes in, then fry the chilli and chilli powder in a little oil for 1 minute and stir them into the rest with the salt and almond butter.' },
    { title: 'Storing', text: 'Keeps for 3 days in the fridge and 3 months in the freezer. Freeze Ted\'s portions in small tubs.' }
  ]
},
{
  slug: 'carnitas-tacos',
  title: 'Carnitas Tacos',
  short: 'Carnitas tacos',
  description: 'Pork shoulder slow-cooked with orange, cumin and oregano, shredded and crisped in the air fryer for tacos.',
  serves: 8, prep: 20, cook: 540, cookText: '8 to 10 hours', airC: 200,
  course: 'Dinners', cuisine: 'Mexican', main: 'Pork',
  labels: ['Batch cook', 'Freezes well', 'Weekend'],
  equipment: ['A slow cooker'],
  groups: [
    { name: 'For the Carnitas', fixedNote: 'This part makes about 8 servings of pork, whatever number of servings you choose. Only the tacos and toppings change with the servings. Freeze the pork you do not eat in 2-serving tubs.', items: [
      { id: 'oregano', qty: 1, unit: 'tbsp', name: 'dried oregano', scale: 'fixed', ref: 'oregano' },
      { id: 'cumin', qty: 1, unit: 'tbsp', name: 'ground cumin', scale: 'fixed', ref: 'cumin' },
      { id: 'chillipowder', qty: 2, unit: 'tsp', name: 'chilli powder', scale: 'fixed', ref: 'chilli powder' },
      { id: 'salt', qty: 1, unit: 'tsp', name: 'sea salt', scale: 'fixed', ref: 'salt' },
      { id: 'pepper', qty: 0.5, unit: 'tsp', name: 'black pepper', scale: 'fixed', ref: 'pepper' },
      { id: 'pork', qty: 1800, unit: 'g', name: 'skinless, boneless pork shoulder', scale: 'fixed', ref: 'pork', chip: 'pork shoulder' },
      { id: 'onion', qty: 1, name: 'onion', prep: 'chopped', scale: 'fixed', ref: 'onion' },
      { id: 'garlic', qty: 4, name: 'garlic clove', plural: 'garlic cloves', prep: 'crushed', scale: 'fixed', ref: 'garlic' },
      { id: 'jalapeno', qty: 1, name: 'jalapeño', prep: 'deseeded and finely chopped', scale: 'fixed', ref: 'jalapeño' },
      { id: 'orange', qty: 1, name: 'orange', prep: 'juiced', scale: 'fixed', ref: 'orange' }
    ]},
    { name: 'For the Tacos', items: [
      { id: 'tortillas', qty: 24, name: 'small flour or corn tortilla', plural: 'small flour or corn tortillas', scale: 'wholeUp', ref: 'tortillas', chip: 'tortillas' },
      { id: 'redonion', qty: 2, name: 'red onion', plural: 'red onions', prep: 'finely chopped', scale: 'halve', ref: 'red onion' },
      { id: 'coriander', qty: 30, unit: 'g', name: 'fresh coriander', prep: 'chopped', scale: 'weight', ref: 'coriander', chip: 'coriander' },
      { id: 'limes', qty: 4, name: 'lime', plural: 'limes', prep: 'cut into wedges', scale: 'halve', ref: 'limes' }
    ]}
  ],
  steps: [
    { text: 'Mix the oregano, cumin, chilli powder, salt and pepper in a small bowl.', uses: ['oregano', 'cumin', 'chillipowder', 'salt', 'pepper'] },
    { text: 'Trim the excess fat from the pork, leaving a thin layer. Rub the spice mix all over the pork and put it in the slow cooker.', uses: ['pork'] },
    { text: 'Add the onion, garlic, jalapeño and orange juice. Cover and cook on low for 8 to 10 hours, or on high for 5 to 6 hours, until the pork falls apart.', uses: ['onion', 'garlic', 'jalapeno', 'orange'] },
    { text: 'Lift the pork onto a board and shred it with two forks, keeping all the liquid in the slow cooker. If it resists, cook it for another 30 minutes.', uses: [] },
    { text: 'Heat the air fryer to 200°C. Toss the pork with a few spoonfuls of the cooking liquid and spread it over the baking pan and cook for 8 to 10 minutes, stirring halfway, until browned at the edges. Drizzle over more of the liquid before serving.', uses: [] },
    { text: 'Warm the tortillas in a dry frying pan for 20 seconds on each side.', uses: ['tortillas'] },
    { text: 'Fill the tortillas with the pork and top with the red onion and coriander. Serve with the limes for squeezing.', uses: ['redonion', 'coriander', 'limes'] }
  ],
  notes: [
    { title: 'Joint Size', text: 'A joint of 1 to 1.5kg needs about 8 hours on low. A 2.5kg joint makes about 11 servings and needs about 10 hours. For a 2.5kg joint, use half as much again of the spices, salt, garlic and orange juice.' },
    { title: 'Under the Grill', text: 'Spread the pork over a baking tray, pour over 250ml of the cooking liquid and grill on high for 5 to 10 minutes.' },
    { title: 'Storing', text: 'Keep the shredded pork and its liquid in separate tubs, for 3 days in the fridge or 3 months in the freezer. Crisp the pork in the air fryer with some of the liquid when you need it.' },
    { title: 'Leftovers', text: 'Use the pork in burritos, quesadillas or salads.' }
  ]
},
{
  slug: 'batalis-bolognese',
  title: "Batali's Bolognese",
  short: 'Bolognese',
  description: 'A slow ragù of beef, pork and pancetta, cooked with milk and white wine for up to 3 hours.',
  serves: 6, prep: 30, cook: 180, cookText: '2 to 3 hours',
  course: 'Dinners', cuisine: 'Italian', main: 'Beef',
  labels: ['Batch cook', 'Freezes well', 'Weekend'],
  equipment: ['A large, heavy pan'],
  source: { name: 'Mario Batali' },
  groups: [
    { name: 'For the Ragù', items: [
      { id: 'oil', qty: 4, unit: 'tbsp', name: 'extra virgin olive oil', scale: 'spoon', liquid: true, ref: 'oil', chip: 'olive oil' },
      { id: 'butter', qty: 30, unit: 'g', name: 'butter', scale: 'weight', ref: 'butter' },
      { id: 'onions', qty: 2, name: 'onion', plural: 'onions', prep: 'finely chopped', scale: 'halve', ref: 'onions' },
      { id: 'celery', qty: 4, name: 'celery stick', plural: 'celery sticks', prep: 'finely chopped', scale: 'whole', ref: 'celery' },
      { id: 'carrots', qty: 2, name: 'carrot', plural: 'carrots', size: 'large', prep: 'finely chopped', scale: 'halve', ref: 'carrots' },
      { id: 'garlic', qty: 5, name: 'garlic clove', plural: 'garlic cloves', prep: 'finely chopped', scale: 'whole', ref: 'garlic' },
      { id: 'salt', phrase: 'Salt', prep: 'to taste', scale: 'fixed', ref: 'salt', chip: 'salt' },
      { id: 'beef', qty: 450, unit: 'g', name: 'beef mince', scale: 'weight', ref: 'beef mince' },
      { id: 'pork', qty: 450, unit: 'g', name: 'pork mince', scale: 'weight', ref: 'pork mince' },
      { id: 'pancetta', qty: 120, unit: 'g', name: 'cubed pancetta', scale: 'weight', ref: 'pancetta', chip: 'pancetta' },
      { id: 'puree', qty: 130, unit: 'g', name: 'tomato purée', scale: 'weight', ref: 'tomato purée' },
      { id: 'milk', qty: 250, unit: 'ml', name: 'whole milk', scale: 'weight', ref: 'milk' },
      { id: 'wine', qty: 250, unit: 'ml', name: 'dry white wine, such as Sauvignon Blanc or Pinot Grigio', scale: 'weight', ref: 'wine', chip: 'dry white wine' }
    ]},
    { name: 'To Serve', items: [
      { id: 'pasta', qty: 500, unit: 'g', name: 'dried pasta, such as tagliatelle or rigatoni', scale: 'weight', ref: 'pasta', chip: 'dried pasta' },
      { id: 'parmesan', qty: 40, unit: 'g', name: 'Parmesan', prep: 'finely grated', scale: 'weight', ref: 'Parmesan' },
      { id: 'parsley', phrase: 'A small handful of parsley', prep: 'finely chopped', scale: 'fixed', ref: 'parsley', chip: 'a handful of parsley' }
    ]}
  ],
  steps: [
    { text: 'Melt the butter with the oil in a large, heavy pan over a medium heat.', uses: ['butter', 'oil'] },
    { text: 'Add the onions, celery, carrots and garlic with a pinch of salt. Cook for 8 to 10 minutes, stirring often, until soft and translucent with no colour.', uses: ['onions', 'celery', 'carrots', 'garlic', 'salt'] },
    { text: 'Turn the heat up to high, add the beef mince, pork mince and pancetta and brown them, stirring often. Turn the heat down to medium and cook for 10 to 15 minutes more, until the fat has run out, keeping the fat in the pan.', uses: ['beef', 'pork', 'pancetta'] },
    { text: 'Stir in the tomato purée and cook for 2 to 3 minutes, until it turns a rusty orange.', uses: ['puree'] },
    { text: 'Pour in the milk and cook for 2 to 3 minutes, then add the wine and bring to the boil.', uses: ['milk', 'wine'] },
    { text: 'Turn the heat to low and simmer uncovered for 2 to 3 hours, stirring now and then. Add 60ml of water whenever the ragù looks dry.', uses: [] },
    { text: 'Season the ragù with salt to taste and take the pan off the heat.', uses: [] },
    { text: 'Bring a large pan of salted water to the boil and cook the pasta for 3 minutes less than the packet says. Drain it, keeping a mugful of the cooking water.', uses: ['pasta'] },
    { text: 'For each serving, heat about 175ml of the ragù in a frying pan over a medium-high heat. Add the pasta and a splash of the cooking water and toss for 2 to 3 minutes, until the pasta is just cooked, adding more water as needed.', uses: [] },
    { text: 'Serve topped with the parsley and plenty of Parmesan.', uses: ['parsley', 'parmesan'] }
  ],
  notes: [
    { title: 'Storing', text: 'The ragù keeps for a week in the fridge and 6 months in the freezer.' },
    { title: 'For Ted', text: 'Leave this one out for Ted, because the pancetta makes it salty.' }
  ]
},
{
  slug: 'focaccia',
  title: 'Focaccia',
  short: 'Focaccia',
  description: 'A soft, oily focaccia with a crisp base, made with a stand mixer and two rises.',
  yield: 'Makes 1 tray, 23 x 33cm', yieldShort: '1 tray', serves: 8, prep: 20, rest: 135, restLabel: 'Rising', cook: 25, ovenC: 200,
  course: 'Baking', cuisine: 'Italian', main: 'Bread',
  labels: ['Weekend', 'Vegan'],
  equipment: ['A stand mixer with a dough hook', 'A 23 x 33cm baking tin'],
  groups: [
    { name: '', items: [
      { id: 'water', qty: 420, unit: 'ml', name: 'warm water', scale: 'fixed', ref: 'water' },
      { id: 'sugar', qty: 2, unit: 'tsp', name: 'caster sugar', scale: 'fixed', ref: 'sugar' },
      { id: 'yeast', qty: 1, unit: 'tin', tinSize: 7, container: 'sachet', name: 'fast-action dried yeast', scale: 'fixed', ref: 'yeast', chip: 'yeast' },
      { id: 'flour', qty: 500, unit: 'g', name: 'plain flour', scale: 'fixed', ref: 'flour' },
      { id: 'salt', qty: 2, unit: 'tsp', name: 'fine sea salt', scale: 'fixed', ref: 'salt' },
      { id: 'oil', qty: 6, unit: 'tbsp', name: 'extra virgin olive oil', prep: 'plus extra for your hands', scale: 'fixed', ref: 'olive oil', chip: 'olive oil' },
      { id: 'flaky', phrase: 'Flaky sea salt', prep: 'optional', scale: 'fixed', ref: 'flaky salt', chip: 'flaky salt' },
      { id: 'rosemary', phrase: 'Chopped rosemary', prep: 'optional', scale: 'fixed', ref: 'rosemary', chip: 'rosemary' }
    ]}
  ],
  steps: [
    { text: 'Stir the warm water and sugar together in the bowl of a stand mixer. Sprinkle over the yeast, stir and leave for 5 minutes until foamy. If it stays flat, start again with fresh yeast.', uses: ['water', 'sugar', 'yeast'] },
    { text: 'Add the flour and salt and mix on low speed until a shaggy dough forms. Turn up to medium and mix for 5 minutes, until the dough is very elastic and sticky.', uses: ['flour', 'salt'] },
    { text: 'Brush a large bowl with 2 tbsp of the olive oil and scrape in the dough. Brush the top with any oil pooling in the bowl, cover and leave for 1 to 1½ hours, until doubled in size.', uses: [{ id: 'oil', part: 1 / 3 }] },
    { text: 'Brush the tin with another 2 tbsp of the olive oil. With oiled hands, fold the edges of the dough into the middle to make a rough ball and lift it into the tin.', uses: [{ id: 'oil', part: 1 / 3 }] },
    { text: 'Turn the dough to coat it in oil and press it out to the edges of the tin, pressing again when it shrinks back. Cover and leave for 45 minutes, until doubled. Heat the oven to 200°C after 30 minutes.', uses: [] },
    { text: 'Drizzle over the rest of the olive oil and press your oiled fingers all over the dough, right down to the tin. Scatter over the flaky salt and rosemary, if using.', uses: [{ id: 'oil', part: 1 / 3 }, 'flaky', 'rosemary'] },
    { text: 'Bake for 20 to 30 minutes until golden brown.', uses: [] }
  ],
  notes: [
    { title: 'If the Tin Sticks', text: 'Grease a tin that isn\'t non-stick with butter before the oil goes in.' },
    { title: 'Storing', text: 'Best on the day. Wrap leftovers and warm them in the oven the next day.' }
  ]
},
{
  slug: 'banana-and-oat-smoothie',
  title: 'Banana and Oat Smoothie',
  short: 'Banana and oat smoothie',
  description: 'A thick breakfast smoothie of frozen banana, oats and peanut butter with cinnamon.',
  serves: 1, prep: 5, cook: 0,
  course: 'Breakfast & Drinks', cuisine: '', main: 'Banana',
  labels: ['Quick', 'Vegan'],
  equipment: ['A blender'],
  groups: [
    { name: '', items: [
      { id: 'oats', qty: 25, unit: 'g', name: 'porridge oats', scale: 'weight', ref: 'oats' },
      { id: 'banana', qty: 1, name: 'banana', plural: 'bananas', prep: 'chopped and frozen', scale: 'halve', ref: 'banana' },
      { id: 'milk', qty: 120, unit: 'ml', name: 'unsweetened almond milk', scale: 'weight', ref: 'almond milk', chip: 'almond milk' },
      { id: 'pb', qty: 1, unit: 'tbsp', name: 'smooth peanut butter', scale: 'spoon', ref: 'peanut butter', chip: 'peanut butter' },
      { id: 'maple', qty: 1.5, unit: 'tsp', name: 'maple syrup', prep: 'plus more to taste', scale: 'spoon', ref: 'maple syrup' },
      { id: 'vanilla', qty: 0.5, unit: 'tsp', name: 'vanilla extract', scale: 'spoon', ref: 'vanilla' },
      { id: 'cinnamon', qty: 0.5, unit: 'tsp', name: 'ground cinnamon', scale: 'spoon', ref: 'cinnamon' },
      { id: 'salt', phrase: 'A pinch of sea salt', scale: 'fixed', ref: 'salt', chip: 'a pinch of salt' },
      { id: 'ice', phrase: 'A few ice cubes', prep: 'optional', scale: 'fixed', ref: 'ice', chip: 'ice' }
    ]}
  ],
  steps: [
    { text: 'Blitz the oats in a blender until finely ground.', uses: ['oats'] },
    { text: 'Add the banana, almond milk, peanut butter, maple syrup, vanilla, cinnamon and salt. Blend until smooth, scraping down the sides as needed.', uses: ['banana', 'milk', 'pb', 'maple', 'vanilla', 'cinnamon', 'salt'] },
    { text: 'Taste and add more maple syrup if you like. Blend in the ice for a thicker smoothie and drink it straight away.', uses: ['ice'] }
  ],
  notes: []
},
{
  slug: 'spotted-dick',
  title: 'Spotted Dick',
  short: 'Spotted dick',
  description: 'A steamed suet pudding studded with currants and citrus zest, served hot with custard.',
  yield: 'Makes 1 pudding, serves 6', yieldShort: '1 pudding', serves: 6, prep: 15, cook: 90,
  course: 'Puddings', cuisine: 'British', main: 'Suet',
  labels: ['Weekend'],
  equipment: ['A steamer that fits over a large pan', 'Baking parchment and string'],
  source: { name: 'BBC Good Food, by Valerie Barrett', url: 'https://www.bbcgoodfood.com/recipes/spotted-dick' },
  groups: [
    { name: '', items: [
      { id: 'flour', qty: 250, unit: 'g', name: 'self-raising flour', scale: 'fixed', ref: 'flour' },
      { id: 'salt', phrase: 'A pinch of salt', scale: 'fixed', ref: 'salt', chip: 'a pinch of salt' },
      { id: 'suet', qty: 125, unit: 'g', name: 'shredded suet', scale: 'fixed', ref: 'suet' },
      { id: 'currants', qty: 180, unit: 'g', name: 'currants', scale: 'fixed', ref: 'currants' },
      { id: 'sugar', qty: 80, unit: 'g', name: 'caster sugar', scale: 'fixed', ref: 'sugar' },
      { id: 'lemon', qty: 1, name: 'lemon', prep: 'finely zested', scale: 'fixed', ref: 'lemon', chip: 'lemon zest' },
      { id: 'orange', qty: 1, name: 'orange', size: 'small', prep: 'finely zested', scale: 'fixed', ref: 'orange', chip: 'orange zest' },
      { id: 'milk', qty: 150, unit: 'ml', name: 'whole milk', prep: 'plus 2 to 3 tbsp if needed', scale: 'fixed', ref: 'milk' },
      { id: 'custard', phrase: 'Custard', prep: 'to serve', scale: 'fixed', ref: 'custard', chip: 'custard' }
    ]}
  ],
  steps: [
    { text: 'Put the flour and salt in a bowl. Add the suet, currants, sugar, lemon zest and orange zest.', uses: ['flour', 'salt', 'suet', 'currants', 'sugar', 'lemon', 'orange'] },
    { text: 'Pour in the milk and mix to a firm, moist dough, adding the extra milk a tablespoon at a time if it feels dry.', uses: ['milk'] },
    { text: 'Shape the dough into a fat roll about 20cm long and lay it on a large sheet of baking parchment. Wrap it loosely so the pudding has room to rise, and tie the ends with string like a cracker.', uses: [] },
    { text: 'Set a steamer over a large pan of boiling water, put the pudding in, cover and steam for 1½ hours. Top up the pan with boiling water from time to time.', uses: [] },
    { text: 'Lift the pudding out and let it cool for 5 minutes before unwrapping. Serve in thick slices with the custard.', uses: ['custard'] }
  ],
  notes: [
    { title: 'About the Pudding', text: 'A traditional English steamed pudding. The spots are the currants.' }
  ]
},
{
  slug: 'lime-posset',
  title: 'Lime Posset',
  short: 'Lime posset',
  description: 'Double cream boiled with sugar and set with lime juice, topped with raspberries. Three ingredients and a night in the fridge.',
  serves: 5, prep: 10, cook: 5, rest: 120, restLabel: 'Chilling',
  course: 'Puddings', cuisine: 'British', main: 'Lime',
  labels: ['Quick', 'Weekend'],
  equipment: ['Small pots or glasses, one for each person'],
  groups: [
    { name: '', items: [
      { id: 'cream', qty: 500, unit: 'ml', name: 'double cream', scale: 'weight', ref: 'cream' },
      { id: 'sugar', qty: 140, unit: 'g', name: 'caster sugar', scale: 'weight', ref: 'sugar' },
      { id: 'juice', qty: 115, unit: 'ml', name: 'lime juice', scale: 'weight', ref: 'lime juice', chip: 'lime juice' },
      { id: 'zest', qty: 2.5, name: 'lime', plural: 'limes', prep: 'finely zested', scale: 'halve', ref: 'zest', chip: 'lime zest' },
      { id: 'raspberries', phrase: 'A handful of raspberries', scale: 'fixed', ref: 'raspberries', chip: 'raspberries' }
    ]}
  ],
  steps: [
    { text: 'Put the cream and sugar in a medium saucepan and bring to the boil. Boil hard for 2½ minutes, stirring all the time.', uses: ['cream', 'sugar'] },
    { text: 'Turn off the heat and stir in the lime juice and most of the zest. Pour the mixture into the small pots.', uses: ['juice', 'zest'] },
    { text: 'Chill for at least 2 hours, or overnight, until set.', uses: [] },
    { text: 'Top each posset with a few raspberries and scatter over the rest of the zest just before serving.', uses: ['raspberries'] }
  ],
  notes: [
    { title: 'Limes', text: 'Each lime gives about 15ml of juice, so 115ml takes 7 to 8 limes. Zest the limes before you juice them.' },
    { title: 'Making Ahead', text: 'The possets keep for 2 days in the fridge, covered. Add the raspberries just before serving.' }
  ]
},
{
  slug: 'pork-larb',
  title: 'Pork Larb',
  short: 'Pork larb',
  description: 'Thai-style pork mince stir-fried with toasted rice, lime, fish sauce and a pile of herbs, eaten in lettuce leaves.',
  serves: 2, prep: 10, cook: 10,
  course: 'Dinners', cuisine: 'Thai', main: 'Pork',
  labels: ['Weeknight', 'Quick'],
  equipment: ['A wok or large frying pan'],
  groups: [
    { name: '', items: [
      { id: 'oil', qty: 1, unit: 'tbsp', name: 'vegetable oil', scale: 'spoon', liquid: true, ref: 'oil' },
      { id: 'pork', qty: 450, unit: 'g', name: 'pork mince', scale: 'weight', ref: 'pork' },
      { id: 'rice', qty: 2, unit: 'tbsp', name: 'toasted rice powder', scale: 'spoon', ref: 'toasted rice', chip: 'toasted rice powder' },
      { id: 'sugar', qty: 0.5, unit: 'tsp', name: 'caster sugar', scale: 'spoon', ref: 'sugar' },
      { id: 'fish', qty: 1, unit: 'tbsp', name: 'fish sauce', scale: 'spoon', liquid: true, ref: 'fish sauce' },
      { id: 'lime', qty: 1, name: 'lime', plural: 'limes', prep: 'juiced', scale: 'halve', ref: 'lime' },
      { id: 'mangetout', qty: 100, unit: 'g', name: 'mangetout', prep: 'optional', scale: 'weight', ref: 'mangetout' },
      { id: 'chilli', qty: 1, name: 'red chilli', plural: 'red chillies', prep: 'thinly sliced', scale: 'halve', ref: 'chilli' },
      { id: 'shallots', qty: 3, name: 'shallot', plural: 'shallots', prep: 'thinly sliced', scale: 'whole', ref: 'shallots' },
      { id: 'sponions', qty: 3, name: 'spring onion', plural: 'spring onions', prep: 'thinly sliced', scale: 'whole', ref: 'spring onions' },
      { id: 'coriander', phrase: 'A handful of coriander', prep: 'chopped', scale: 'fixed', ref: 'coriander', chip: 'a handful of coriander' },
      { id: 'mint', phrase: 'A handful of mint', prep: 'chopped', scale: 'fixed', ref: 'mint', chip: 'a handful of mint' },
      { id: 'lettuce', qty: 1, name: 'Little Gem lettuce', plural: 'Little Gem lettuces', prep: 'leaves separated, to serve', scale: 'halve', ref: 'lettuce', chip: 'Little Gem lettuce' }
    ]}
  ],
  steps: [
    { text: 'Heat a wok over a high heat until it smokes. Add the oil and pork and stir-fry for 5 to 6 minutes, breaking up the mince, until browned.', uses: ['oil', 'pork'] },
    { text: 'Add the toasted rice powder, sugar, fish sauce and lime juice, and the mangetout if you are using it. Stir-fry for 1 minute.', uses: ['rice', 'sugar', 'fish', 'lime', 'mangetout'] },
    { text: 'Add the chilli, shallots, spring onions, coriander and mint and stir-fry for 1 minute more.', uses: ['chilli', 'shallots', 'sponions', 'coriander', 'mint'] },
    { text: 'Taste and add more chilli, sugar, fish sauce or lime juice if it needs it. Serve straight away with the lettuce leaves for wrapping.', uses: ['lettuce'] }
  ],
  notes: [
    { title: 'Toasted Rice Powder', text: 'Toast 2 tbsp jasmine or sticky rice in a dry frying pan over a medium heat for 5 to 8 minutes, shaking the pan, until deep golden. Let it cool and grind it to a coarse powder in a pestle and mortar.' },
    { title: 'For Ted', text: 'Leave this one out for Ted, because the fish sauce makes it salty.' }
  ]
}
];
module.exports = module.exports.concat(require('./recipes-extra.js'));
