// Checks every recipe against the house rules. Exits with an error listing each broken rule.
const recipes = require('./recipes.js');
const Scale = require('./scale.js');
const LABELS = ['Batch cook', 'Freezes well', 'Ted can share', 'Weeknight', 'Weekend', 'Quick', 'Vegan'];
const COURSES = ['Dinners', 'For Ted', 'Puddings', 'Baking', 'Breakfast & Drinks', 'Basics'];
const UNITS = ['g', 'ml', 'tsp', 'tbsp', 'tin', undefined];
const SCALES = ['weight', 'spoon', 'halve', 'whole', 'wholeUp', 'tin', 'fixed'];
const BANNED = [
  [/\bcups?\b/i, 'cups'], [/\boz\b|\bounces?\b/i, 'ounces'], [/\blbs?\b|\bpounds?\b/i, 'pounds'], [/°F|fahrenheit/i, '°F'],
  [/\bsticks? of butter/i, 'sticks of butter'], [/cilantro/i, 'cilantro'], [/\bbroil/i, 'broil'], [/scallion/i, 'scallion'],
  [/green onion/i, 'green onion'], [/zucchini/i, 'zucchini'], [/eggplant/i, 'eggplant'], [/all-purpose/i, 'all-purpose'],
  [/heavy cream/i, 'heavy cream'], [/skillet/i, 'skillet'], [/stovetop|stove\b/i, 'stove'], [/kosher/i, 'kosher'],
  [/ground beef/i, 'ground beef'], [/\b(?:a|the|one|two|\d+(?:g|ml)?) cans?\b|\bcans\b|canned/i, 'can (use tin)'], [/fan-forced|fan forced/i, 'fan-forced'], [/gravy beef/i, 'gravy beef'],
  [/cocktail potatoes/i, 'cocktail potatoes'], [/\bchili\b/i, 'chili'], [/yogurt/i, 'yogurt'], [/flavor\b/i, 'flavor'],
  [/\bcolor\b/i, 'color'], [/caramelize/i, 'caramelize'], [/\bbroth\b(?! or)/i, null], [/—/, 'em dash'],
  [/\bminced\b/i, 'minced (use crushed or finely chopped)'], [/\d\.\d+\s*(?:tsp|tbsp)/, 'decimal spoon amount'],
  [/\bmins?\b/i, 'min'], [/\bhrs?\b/i, 'hr'], [/°C fan/i, 'fan temperature'], [/basket/i, 'basket (the Duowave has a crisper tray)'], [/following the .* recipe|\bsee the .* recipe|\bthe [A-Z][a-z]+ [A-Z][a-z]+ recipe\b/, 'a pointer to another recipe (spell the method out)']
].filter(b => b[1]);
const errors = [];
// Subheadings: title case, with "&" in place of "and".
const SMALL = new Set(['a', 'an', 'the', 'of', 'for', 'to', 'in', 'on', 'with', 'at', 'by', 'or', 'as', 'from']);
function subhedProblem(s) {
  if (/\band\b/i.test(s)) return 'use "&" in place of "and"';
  const words = s.split(/\s+/);
  for (let n = 0; n < words.length; n++) {
    const w = words[n];
    if (!/^[a-zà-ÿ]/i.test(w)) continue;
    const lower = w.toLowerCase();
    if (n > 0 && SMALL.has(lower)) { if (w !== lower) return `"${w}" should be lower case`; continue; }
    if (w[0] !== w[0].toUpperCase()) return `"${w}" should start with a capital`;
  }
  return null;
}
const slugs = new Set();
function err(r, m) { errors.push(`${r.slug}: ${m}`); }

for (const r of recipes) {
  if (slugs.has(r.slug)) err(r, 'duplicate slug'); slugs.add(r.slug);
  for (const f of ['slug', 'title', 'short', 'description', 'serves', 'prep', 'course', 'main']) if (r[f] == null || r[f] === '') err(r, `missing ${f}`);
  if (!COURSES.includes(r.course)) err(r, `unknown course ${r.course}`);
  [r.course, ...r.groups.map(g => g.name).filter(Boolean), ...(r.notes || []).map(n => n.title)].forEach(h => {
    const p = subhedProblem(h); if (p) err(r, `subheading "${h}": ${p}`);
  });
  (r.labels || []).forEach(l => { if (!LABELS.includes(l)) err(r, `unknown label ${l}`); });
  if (/[a-z]/.test(r.title[0])) err(r, 'title must start with a capital');
  [r.title, r.description].forEach(t => { if (/&/.test(t)) err(r, 'titles and descriptions use "and", not "&"'); });
  r.steps.forEach((s, n) => { if (/&/.test(s.text)) err(r, `step ${n + 1}: use "and", not "&"`); });
  const all = new Map();
  r.groups.forEach(g => g.items.forEach(i => {
    if (all.has(i.id)) err(r, `duplicate ingredient id ${i.id}`);
    all.set(i.id, i);
    if (!SCALES.includes(i.scale)) err(r, `${i.id}: missing or unknown scale type`);
    if (!i.ref) err(r, `${i.id}: missing ref`);
    if (!i.phrase) {
      if (!UNITS.includes(i.unit)) err(r, `${i.id}: unit ${i.unit} not allowed`);
      if (typeof i.qty !== 'number' || !(i.qty > 0)) err(r, `${i.id}: needs a number qty`);
      if (i.unit === 'tin' && !i.tinSize) err(r, `${i.id}: tin needs tinSize`);
      if (i.unit === undefined && !['halve', 'whole', 'wholeUp', 'fixed'].includes(i.scale)) err(r, `${i.id}: counted item needs halve, whole, wholeUp or fixed`);
      if ((i.unit === 'g' || i.unit === 'ml') && !['weight', 'fixed'].includes(i.scale)) err(r, `${i.id}: g/ml must scale by weight`);
      if ((i.unit === 'tsp' || i.unit === 'tbsp') && !['spoon', 'fixed'].includes(i.scale)) err(r, `${i.id}: spoons must scale as spoon`);
      if (i.qty > 1 && i.unit === undefined && !i.plural && i.scale !== 'fixed') err(r, `${i.id}: counted item needs a plural`);
    }
    const txt = [i.name, i.prep, i.phrase].filter(Boolean).join(' ');
    BANNED.forEach(([re, w]) => { if (re.test(txt)) err(r, `${i.id}: banned wording "${w}"`); });
  }));
  if (r.ovenC && r.airC) err(r, 'pick one method for the steps: ovenC or airC, and put the other in a note');
  if (r.yield && r.groups.some(g => g.items.some(i => i.scale !== 'fixed'))) err(r, 'a fixed-yield recipe must have only fixed ingredients');
  const used = new Set();
  r.steps.forEach((s, n) => {
    const t = s.text;
    if (!/^[A-Z]/.test(t)) err(r, `step ${n + 1}: must start with a capital`);
    const sentences = t.split(/(?<=[.!?])\s+(?=[A-Z])/).length;
    if (sentences > 3) err(r, `step ${n + 1}: ${sentences} sentences, the limit is 3`);
    BANNED.forEach(([re, w]) => { if (re.test(t)) err(r, `step ${n + 1}: banned wording "${w}"`); });
    if (/\boven\b/i.test(t) && !r.ovenC) err(r, `step ${n + 1}: mentions the oven but the recipe has no ovenC`);
    if (r.airC && /air fryer/i.test(t) && /shak(e|ing)/i.test(t)) err(r, `step ${n + 1}: the Duowave has a tray, so say turn or stir, not shake`);
    if (/air fryer/i.test(t) && !r.airC) err(r, `step ${n + 1}: mentions the air fryer but the recipe has no airC`);
    if (/air fryer to/i.test(t) && !(t.match(/(\d+)°C/g) || []).includes(r.airC + '°C')) err(r, `step ${n + 1}: air fryer temperature differs from airC ${r.airC}`);
    if (/\b(roast|bake|grill)\b/i.test(t) && r.airC && !r.ovenC) err(r, `step ${n + 1}: says roast, bake or grill in an air fryer recipe`);
    const temps = [...t.matchAll(/(\d+)°C/g)].map(m => +m[1]);
    if (/oven to/i.test(t) && !temps.includes(r.ovenC)) err(r, `step ${n + 1}: oven temperature differs from ovenC ${r.ovenC}`);
    (s.uses || []).forEach(u => {
      const id = typeof u === 'string' ? u : u.id;
      const i = all.get(id);
      if (!i) { err(r, `step ${n + 1}: uses unknown ingredient ${id}`); return; }
      used.add(id);
      if (!t.toLowerCase().includes(i.ref.toLowerCase())) err(r, `step ${n + 1}: uses ${id} but the text never says "${i.ref}"`);
    });
  });
  const parts = {};
  r.steps.forEach(s => (s.uses || []).forEach(u => { if (typeof u === 'object') parts[u.id] = (parts[u.id] || 0) + u.part; }));
  Object.entries(parts).forEach(([id, p]) => { if (Math.abs(p - 1) > 0.01) err(r, `${id}: split parts add up to ${p.toFixed(2)}, not 1`); });
  all.forEach((i, id) => { if (!used.has(id)) err(r, `${id} is in the ingredients but no step uses it`); });
  if (r.source && r.source.url && !/^https:\/\//.test(r.source.url)) err(r, 'source url must be https');
  [r.title, r.description, ...(r.notes || []).map(n => n.text)].forEach(t => BANNED.forEach(([re, w]) => { if (re.test(t)) err(r, `banned wording "${w}" in "${t.slice(0, 40)}..."`); }));
  // Every servings choice must produce clean amounts.
  const factors = r.yield ? [1] : Scale.SERVINGS.map(s => s / r.serves);
  factors.forEach(f => all.forEach(i => {
    const l = Scale.lineText(i, f).text;
    if (/\d\.\d{3,}|NaN|undefined|\d\.\d+ (?:tsp|tbsp)/.test(l)) err(r, `${i.id} at factor ${f.toFixed(2)}: "${l}"`);
    if (/^0\b/.test(l)) err(r, `${i.id} at factor ${f.toFixed(2)}: rounds to zero`);
  }));
}
// Every meal in a plan must point at a real recipe.
const plansList = require('./plans.js');
const known = new Set(recipes.map(r => r.slug));
plansList.forEach(p => p.people.forEach(pp => pp.rows.forEach(row => {
  if (row.length !== pp.columns.length + 1) errors.push(`plan ${p.id}, ${pp.name}, ${row[0]}: wrong number of columns`);
  row.slice(1).forEach(c => { if (c.r && !known.has(c.r)) errors.push(`plan ${p.id}, ${pp.name}, ${row[0]}: no recipe called ${c.r}`); });
})));
if (errors.length) { console.error(errors.join('\n')); console.error(`\n${errors.length} rule(s) broken.`); process.exit(1); }
console.log(`All ${recipes.length} recipes pass the house rules.`);
