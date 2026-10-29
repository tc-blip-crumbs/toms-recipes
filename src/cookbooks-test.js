// Searches Tom makes on the Cookbooks page, with recipes each one must find. Run by validate.js before every publish.
const fs = require('fs');
const path = require('path');
const data = require('./cookbooks.json');
const src = fs.readFileSync(path.join(__dirname, 'cookbooks-page.js'), 'utf8');
const code = src.slice(src.indexOf('// search:start'), src.indexOf('// search:end'));
const api = new Function(code + '\nreturn { words: words, score: score, rank: rank };')();
const R = data.recipes.map(x => ({ t: x[0], p: x[1], b: x[2], c: x[3], i: x[4], tw: api.words(x[0]), iw: api.words(x[4]), cw: api.words(x[3]) }));

function search(q) {
  const qw = api.words(q);
  return R.map(r => [api.score(r, qw).total, r, api.score(r, qw).all]).filter(x => x[2]).sort(api.rank).map(x => x[1]);
}
const has = (list, title, n) => list.slice(0, n).some(r => r.t.toLowerCase().includes(title.toLowerCase()));

// [search, recipe title that must appear, within the first N results]
const MUST = [
  ['spaghetti meatballs', 'Spaghetti alla chitarra with tiny chicken meatballs', 3],
  ['spaghetti and meatballs', 'Spaghetti alla chitarra with tiny chicken meatballs', 3],
  ['spaghetti meatballs', 'Pappardelle with a ragù of tiny meatballs', 7],
  ['spag bol', 'spaghetti Bolognese', 5],
  ['bolognese', 'A really good spaghetti Bolognese', 15],
  ['carbonara', 'Carbonara', 3],
  ['mac and cheese', 'mac and cheese', 5],
  ['macaroni cheese', 'Macaroni cheese', 5],
  ['lasagna', 'lasagne', 10],
  ['lasagne', 'Lasagna Bolognese style', 25],
  ['creme brulee', 'crème brûlée', 5],
  ['crème brûlée', 'Creme brulee', 15],
  ['shepherds pie', "Shepherd's pie", 3],
  ["shepherd's pie", "Shepherd's pie", 3],
  ['roast potatoes', 'Roast potatoes', 3],
  ['roast chicken', 'Roast chicken', 5],
  ['chips', 'Chips', 5],
  ['fish and chips', 'Battered fish and chips', 4],
  ['fish & chips', 'Battered fish and chips', 4],
  ['egg fried rice', 'Egg fried rice', 1],
  ['brownies', 'Brownies', 3],
  ['brownie', 'Brownies', 3],
  ['banana bread', 'Banana bread', 5],
  ['chickpea curry', 'Chickpea and spinach curry', 5],
  ['thai green curry', 'Thai green chicken curry', 3],
  ['lamb tagine', 'Lamb tagine with chickpeas', 4],
  ['slow cooked lamb', 'Slow-cooked lamb', 3],
  ['dhal', 'dal', 25],
  ['dal', 'dhal', 25],
  ['fish pie', 'fish pie', 5],
  ['pork belly', 'pork belly', 10],
  ['pork chops', 'pork chops', 5],
  ['yorkshire pudding', 'Yorkshire pudding', 5],
  ['stir fry', 'stir-fry', 5],
  ['stir-fry', 'stir-fry', 5],
  ['aubergine', 'eggplant', 400],
  ['courgettes', 'courgette', 10],
  ['meatballs', 'meatballs', 3],
  ['miso', 'miso', 3],
  ['ramen', 'ramen', 3],
  ['pesto', 'Pesto', 3],
  ['risotto', 'risotto', 3],
  ['gnocchi', 'gnocchi', 3],
  ['focaccia', 'focaccia', 3],
  ['pancakes', 'pancakes', 3],
  ['tacos', 'tacos', 3]
];
// [search, title words that must not appear in the first N results]
const MUST_NOT = [
  ['chips', 'chipotle', 20],
  ['pie', 'piece', 20],
  ['egg fried rice', 'Fried fish tacos', 2]
];

const fails = [];
MUST.forEach(([q, t, n]) => { const r = search(q); if (!has(r, t, n)) fails.push(`"${q}" should show "${t}" in the first ${n}, got: ${r.slice(0, 3).map(x => x.t).join(' / ') || 'nothing'}`); });
MUST_NOT.forEach(([q, t, n]) => { const r = search(q); if (has(r, t, n)) fails.push(`"${q}" should not show "${t}" in the first ${n}`); });
if (data.recipes.length < 10000) fails.push(`The index holds ${data.recipes.length} recipes, fewer than the 10,000 expected`);
if (fails.length) { console.error('Cookbook search tests failed:\n- ' + fails.join('\n- ')); process.exit(1); }
console.log(`All ${MUST.length + MUST_NOT.length} cookbook searches pass.`);
