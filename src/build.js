// Builds the static site into ../dist. Run: node build.js
const fs = require('fs');
const path = require('path');
const recipes = require('./recipes.js');
const Scale = require('./scale.js');
const Render = require('./render.js');
const { esc } = Render;

const SITE = process.env.SITE_URL || 'https://tc-blip-crumbs.github.io/toms-recipes';
const BASE = process.env.SITE_BASE !== undefined ? process.env.SITE_BASE : '/toms-recipes';
const NAME = "Tom's Recipes";
const INDEXABLE = false; // Some recipes are adapted from paid sources, so search engines are asked to skip the site.
const COURSES = ['Dinners', 'Lunches', 'Toddler Meals', 'Puddings', 'Bakes', 'Breakfasts & Drinks', 'Basics'];
const plans = require('./plans.js');
const bySlug = Object.fromEntries(recipes.map(r => [r.slug, r]));

// ---- Illustrations. Prepared by tools/illustrations.py into illustrations/web.
const ART_DIR = path.join(__dirname, '..', 'illustrations', 'web');
const ART = Object.fromEntries(Object.entries(JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'illustrations', 'illustrations.json'), 'utf8')))
  .filter(([slug]) => fs.existsSync(path.join(ART_DIR, slug + '-400.webp'))));
const PLATE = '<svg class="art-plate" viewBox="0 0 120 120" aria-hidden="true"><ellipse cx="60" cy="60" rx="46" ry="46" fill="none" stroke="currentColor" stroke-width="2"/><ellipse cx="60" cy="60" rx="32" ry="32" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".6"/></svg>';
function artImg(slug, alt, sizes, eager) {
  const a = `/assets/illustrations/${slug}`;
  return `<img src="${a}-400.webp" srcset="${a}-400.webp 400w, ${a}-800.webp 800w" sizes="${sizes}" width="400" height="400" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"'}>`;
}
const LABELS = []; // Labels stay in the recipe data but no longer show on the site.
const FAN = '';
const DIST = path.join(__dirname, '..', 'dist');
const DEFAULT_SERVINGS = 2;

const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
function dur(m) {
  if (!m) return '';
  if (m < 60) return m + ' minutes';
  const h = Math.floor(m / 60), r = m % 60;
  if (r === 30) return h + '½ hours';
  return h + (h === 1 ? ' hour' : ' hours') + (r ? ' ' + r + ' minutes' : '');
}
const iso = m => 'PT' + (Math.floor(m / 60) ? Math.floor(m / 60) + 'H' : '') + (m % 60 ? (m % 60) + 'M' : (m ? '' : '0M'));
const total = r => (r.prep || 0) + (r.cook || 0) + (r.rest || 0);

const ICON = {
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  print: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M6 9V3h12v6M6 18H4a1 1 0 0 1-1-1v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1h-2"/><path d="M6 14h12v7H6z"/></svg>',
  cook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>',
  screen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10.5 18.5h3" stroke-linecap="round"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>'
};

function head({ title, description, canonical, extra = '', nav = 'recipes' }) {
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${INDEXABLE ? '' : '<meta name="robots" content="noindex">\n'}<link rel="canonical" href="${canonical}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${canonical}">
<meta name="theme-color" content="#f4f3ef" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#151412" media="(prefers-color-scheme: dark)">
<script>try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}</script>
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Instrument+Sans:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="/assets/site.css">
${extra}</head>
<body>
<a class="visually-hidden" href="#main">Skip to content</a>
<header class="site-header"><div class="wrap"><a class="brand" href="/">Tom's <span>Recipes</span></a><nav class="site-nav" aria-label="Main"><a href="/"${nav === 'recipes' ? ' aria-current="page"' : ''}>Recipes</a><a href="/plans/"${nav === 'plans' ? ' aria-current="page"' : ''}>Meal Plans</a><button type="button" class="theme-btn" id="theme-btn" aria-label="Colour theme"></button></nav></div></header>
<script>(function(){var b=document.getElementById("theme-btn"),r=document.documentElement,o=["auto","light","dark"],n={auto:"Auto",light:"Light",dark:"Dark"},ic={auto:"<svg viewBox='0 0 24 24' width='18' height='18' aria-hidden='true'><circle cx='12' cy='12' r='8' fill='none' stroke='currentColor' stroke-width='2'/><path d='M12 4a8 8 0 0 1 0 16z' fill='currentColor'/></svg>",light:"<svg viewBox='0 0 24 24' width='18' height='18' aria-hidden='true' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round'><circle cx='12' cy='12' r='4'/><path d='M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4'/></svg>",dark:"<svg viewBox='0 0 24 24' width='18' height='18' aria-hidden='true'><path d='M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z' fill='currentColor'/></svg>"};function g(){try{return localStorage.getItem("theme")||"auto"}catch(e){return"auto"}}function s(v){if(v==="auto")r.removeAttribute("data-theme");else r.setAttribute("data-theme",v);try{localStorage.setItem("theme",v)}catch(e){}b.innerHTML=ic[v];b.title="Theme: "+n[v];b.setAttribute("aria-label","Colour theme: "+n[v]+". Tap to change.")}s(g());b.addEventListener("click",function(){s(o[(o.indexOf(g())+1)%3])})})();</script>
`;
}
const foot = `<footer class="site-footer"><div class="wrap"><span>${NAME}</span><span>Recipes in UK measures. Oven temperatures are for a fan oven.</span></div></footer>
<script>(function(){var r;try{r=document.referrer&&new URL(document.referrer)}catch(e){}if(!r||r.origin!==location.origin||r.pathname===location.pathname||history.length<2)return;document.querySelectorAll("[data-back]").forEach(function(a){if(r.pathname.indexOf("/recipes/")>-1){a.setAttribute("aria-label","Back");a.querySelector("span").textContent="Back"}else if(/plans.[0-9]/.test(r.pathname)&&location.pathname.indexOf("/plans/")<0){a.setAttribute("aria-label","Back to the meal plan");a.querySelector("span").textContent="Meal Plan"}a.addEventListener("click",function(e){e.preventDefault();history.back()})})})();</script>
`;

function facts(r) {
  const rows = [];
  rows.push(r.yield ? ['Makes', r.yieldShort || r.yield.replace(/^Makes /, '')] : r.batch ? ['Makes', '<span data-batch-count>' + r.serves + '</span> servings'] : ['Makes', '<span data-servings-count>' + (r.defaultServings || DEFAULT_SERVINGS) + '</span> <span data-servings-word>' + ((r.defaultServings || DEFAULT_SERVINGS) === 1 ? 'serving' : 'servings') + '</span>']);
  rows.push(['Prep', dur(r.prep)]);
  if (r.rest) rows.push([r.restLabel || 'Resting', dur(r.rest)]);
  if (r.cook) rows.push(['Cook', r.cookText || dur(r.cook)]);
  if (r.ovenC) rows.push(['Oven', r.ovenC + '°C']);
  if (r.airC) rows.push(['Air fryer', r.airC + '°C']);
  return '<dl class="facts">' + rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('') + '</dl>';
}

function tagHTML(r, link) {
  if (!r.labels.some(l => LABELS.includes(l))) return '';
  return '<ul class="tags">' + r.labels.filter(l => LABELS.includes(l)).map(l => link
    ? `<li><a class="tag${l === 'Ted can share' ? ' ted' : ''}" href="/?q=${encodeURIComponent(l)}">${esc(l)}</a></li>`
    : `<li><span class="tag${l === 'Ted can share' ? ' ted' : ''}">${esc(l)}</span></li>`).join('') + '</ul>';
}

function jsonLd(r) {
  return {
    '@context': 'https://schema.org', '@type': 'Recipe',
    name: r.title, description: r.description, author: { '@type': 'Person', name: 'Tom Colson' },
    recipeYield: r.yield || `${r.serves} servings`,
    prepTime: iso(r.prep), cookTime: iso(r.cook || 0), totalTime: iso(total(r)),
    recipeCategory: r.course, recipeCuisine: r.cuisine || undefined, keywords: [r.main, ...r.labels].join(', '),
    recipeIngredient: r.groups.flatMap(g => g.items.map(i => Scale.lineText(i, 1).text)),
    recipeInstructions: r.steps.map((s, n) => ({ '@type': 'HowToStep', position: n + 1, text: s.text, url: `${SITE}/recipes/${r.slug}/#step-${n + 1}` })),
    isBasedOn: r.source && r.source.url ? r.source.url : undefined
  };
}

function recipePage(r) {
  const servings = r.yield ? r.serves : (r.defaultServings || DEFAULT_SERVINGS);
  const size = r.batch ? { mult: 1, serve: DEFAULT_SERVINGS } : servings;
  const url = `${SITE}/recipes/${r.slug}/`;
  const courseId = 'course-' + slugify(r.course);
  const clientData = { slug: r.slug, serves: r.serves, defaultServings: r.defaultServings || DEFAULT_SERVINGS, yield: r.yield || null, batch: !!r.batch, groups: r.groups, steps: r.steps };
  const inPlans = plans.filter(p => p.people.some(pp => pp.rows.some(row => row.slice(1).some(c => c.r === r.slug))));
  const control = r.batch
    ? `<div class="batch" role="group" aria-label="Batch size"><span class="label">Make</span><div class="seg">${Scale.MULTS.map(m => `<button type="button" data-mult="${m}" aria-pressed="${m === 1}">${Scale.multLabel(m)}</button>`).join('')}</div></div>`
    : r.yield
    ? `<span class="yield">Makes ${esc(r.yieldShort || r.yield.replace(/^Makes /, ''))}</span>`
    : `<div class="servings" role="group" aria-label="Servings"><span class="label">Servings</span>
        <div class="stepper"><button type="button" data-servings="down" aria-label="Fewer servings">−</button><output data-servings-count aria-live="off">${servings}</output><button type="button" data-servings="up" aria-label="More servings">+</button></div></div>`;
  return head({ title: `${r.title} | ${NAME}`, description: r.description, canonical: url,
    extra: (ART[r.slug] ? `<meta property="og:image" content="${SITE}/assets/illustrations/${r.slug}-share.jpg">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n<meta name="twitter:card" content="summary_large_image">\n` : '') + `<script type="application/ld+json">${JSON.stringify(jsonLd(r))}</script>\n` }) + `
<main id="main">
<div class="wrap recipe-head${ART[r.slug] ? ' has-art' : ''}">
  <p class="print-only print-brand">${NAME}</p>
  ${ART[r.slug] ? `<figure class="head-art">${artImg(r.slug, ART[r.slug], '(min-width: 900px) 320px, 180px', true)}</figure>` : ''}
  <h1>${esc(r.title)}</h1>
  <p class="desc">${esc(r.description)}</p>
  ${facts(r)}
  <div class="head-row">
    ${tagHTML(r, true)}
    <div class="actions">
      <button type="button" class="btn primary" data-action="cook">${ICON.cook}Start cooking</button>
      <button type="button" class="btn icon-only" data-action="print" aria-label="Print">${ICON.print}<span>Print</span></button>
    </div>
  </div>
</div>
<div class="toolbar${r.batch ? ' toolbar-batch' : ''}"><div class="wrap">
  <a class="back" href="/#${courseId}" data-back aria-label="Back to ${esc(r.course)}">${ICON.back}<span>${esc(r.course)}</span></a>
  ${control}
  <div class="tabs" role="tablist" aria-label="Recipe sections">
    <button type="button" role="tab" data-view="ingredients" aria-selected="true" aria-controls="ingredients">Ingredients</button>
    <button type="button" role="tab" data-view="method" aria-selected="false" aria-controls="method" tabindex="-1">Method</button>
  </div>
</div></div>
<div class="wrap">
  <p class="pan-note" id="pan-note" hidden></p>
  <p class="visually-hidden" id="servings-live" aria-live="polite"></p>
  <div class="columns" data-view="ingredients">
    <section class="ingredients" id="ingredients" role="tabpanel" aria-label="Ingredients">
      <h2>Ingredients</h2>
      ${r.batch ? `<p class="for">This batch makes <span data-batch-count>${r.serves}</span> servings.</p>` : ''}
      <div id="ing-body">${Render.ingredientsHTML(r, size)}</div>
      ${r.equipment && r.equipment.length ? `<div class="equipment"><h3>You Will Need</h3><ul>${r.equipment.map(e => `<li>${esc(e)}</li>`).join('')}</ul></div>` : ''}
    </section>
    <section class="method" id="method" role="tabpanel" aria-label="Method">
      <h2>Method</h2>
      <p class="for screen-only">Tap a time to start a timer.</p>
      <div id="method-body">${Render.methodHTML(r, size)}</div>
    </section>
  </div>
  ${r.notes.length ? `<section class="notes" aria-label="Notes">${r.notes.map(n => `<div class="note"><h3>${esc(n.title)}</h3><p>${esc(n.text)}</p></div>`).join('')}</section>` : ''}
  ${r.source ? `<p class="source">Source: ${r.source.url ? `<a href="${esc(r.source.url)}" rel="noopener" target="_blank">${esc(r.source.name)}</a>` : esc(r.source.name)}</p>` : ''}
  ${inPlans.length ? `<p class="source screen-only">In the meal plans for ${inPlans.map(p => `<a href="/plans/${p.id}/">${esc(p.title.replace(/^Week of /, 'the week of '))}</a>`).join(' and ')}.</p>` : ''}
  <div class="print-only print-foot"><span>${NAME}</span><span>${SITE.replace('https://', '')}/recipes/${r.slug}</span></div>
</div>
</main>
<div class="timers" id="timers" hidden aria-live="polite"></div>
<div class="cook" id="cook" hidden role="dialog" aria-modal="true" aria-label="Cooking mode">
  <div class="wrap"><div class="cook-top"><p class="cook-title">${esc(r.short)}</p><span class="cook-count"></span><button type="button" class="icon-btn" data-cook="close" aria-label="Close cooking mode">${ICON.close}</button></div>
  <div class="cook-bar"><span></span></div></div>
  <div class="cook-main"><div class="wrap cook-step" aria-live="polite"></div></div>
  <div class="wrap cook-nav"><button type="button" data-cook="back">Back</button><button type="button" data-cook="next">Next step</button></div>
</div>
${foot}<script type="application/json" id="recipe-data">${JSON.stringify(clientData).replace(/</g, '\\u003c')}</script>
<script src="/assets/scale.js"></script>
<script src="/assets/render.js"></script>
<script src="/assets/recipe-page.js"></script>
</body>
</html>
`;
}

function card(r) {
  const t = total(r);
  return `<a class="card" href="/recipes/${r.slug}/" data-slug="${r.slug}">
  <div class="card-art${ART[r.slug] ? '' : ' is-empty'}">${ART[r.slug] ? artImg(r.slug, '', '(min-width: 700px) 220px, 45vw') : PLATE}</div>
  <h3>${esc(r.title)}</h3>
  <p class="meta">${dur(t)}</p>
</a>`;
}

function indexPage() {
  const idx = recipes.map(r => ({ slug: r.slug, title: r.title, description: r.description, course: r.course, cuisine: r.cuisine, main: r.main,
    labels: r.labels, equipment: r.equipment || [], ingredients: r.groups.flatMap(g => g.items.map(i => i.phrase || i.name + ' ' + (i.plural || ''))) }));
    const sections = COURSES.filter(c => recipes.some(r => r.course === c)).map(c => {
    const all = recipes.filter(r => r.course === c).sort((a, b) => a.title.localeCompare(b.title));
    const list = all.filter(r => !r.other), others = all.filter(r => r.other);
    const more = others.length ? `<details class="others" data-others><summary>Other ${esc(c)} <small>${others.length}</small></summary><div class="grid">${others.map(card).join('')}</div></details>` : '';
    return `<section class="course-section" id="course-${slugify(c)}" aria-labelledby="h-${slugify(c)}"><h2 id="h-${slugify(c)}">${esc(c)} <small>${list.length}</small></h2><div class="grid main-grid">${list.map(card).join('')}</div>${more}</section>`;
  }).join('');
  const az = [...recipes].sort((a, b) => a.title.localeCompare(b.title)).map(r => `<li><a href="/recipes/${r.slug}/">${esc(r.title)}</a><span>${esc(r.course)}</span></li>`).join('');
  return head({ title: NAME, description: 'Tom\'s own recipes, written the same way every time, in UK measures, with amounts that scale.', canonical: SITE + '/' }) + `
<main id="main" class="wrap">
<div class="intro">
  <h1>${NAME}</h1>
  <p class="this-week" id="this-week" hidden><a href="/plans/"></a></p>
  <form class="search" role="search" action="/" onsubmit="return false">
    ${ICON.search}
    <label for="q" class="visually-hidden">Search recipes</label>
    <input id="q" name="q" type="search" placeholder="Search recipes or ingredients" autocomplete="off" enterkeyhint="search">
    <kbd>/</kbd>
  </form>
  <nav class="jump" aria-label="Courses">${COURSES.filter(c => recipes.some(r => r.course === c)).map(c => `<a href="#course-${slugify(c)}">${esc(c)}</a>`).join('')}</nav>
  <div class="results-bar"><span id="result-count" aria-live="polite">${recipes.length} recipes</span><button type="button" class="link-button" data-clear hidden>Clear search</button></div>
</div>
${sections}
<div class="empty" id="empty" hidden><p>No recipes match that search.</p><button type="button" class="link-button" data-clear>Clear search</button></div>
<section class="az" id="az" aria-labelledby="az-h"><h2 id="az-h">A to Z</h2><ol>${az}</ol></section>
</main>
${foot}<script type="application/json" id="index-data">${JSON.stringify(idx).replace(/</g, '\\u003c')}</script>
<script type="application/json" id="plans-data">${JSON.stringify(plans.map(p => ({ id: p.id, start: p.start, title: p.title })))}</script>
<script src="/assets/index-page.js"></script>
<script src="/assets/plan-page.js"></script>
</body>
</html>
`;
}


// ---- Meal plans
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function range(p) {
  const s = new Date(p.start + 'T12:00:00Z'), e = new Date(s.getTime() + 6 * 86400000);
  const sm = MONTHS[s.getUTCMonth()], em = MONTHS[e.getUTCMonth()];
  return `Monday ${s.getUTCDate()}${sm === em ? '' : ' ' + sm} to Sunday ${e.getUTCDate()} ${em}`;
}
function kcalHTML(c) {
  if (c.kcal === undefined) return '';
  return `<span class="cell-kcal">${c.kcal.toLocaleString('en-GB')} kcal</span>`;
}
function cellHTML(c, person) {
  if (c.jobs) return c.jobs.length ? `<ul class="jobs">${c.jobs.map(j => `<li>${esc(j)}</li>`).join('')}</ul>` : '';
  if (c.t) return `<span class="plain">${esc(c.t)}</span>${c.note ? `<span class="cell-note">${esc(c.note)}</span>` : ''}${kcalHTML(c)}`;
  const rec = bySlug[c.r];
  const serves = c.serves || person.serves;
  const href = `/recipes/${rec.slug}/` + (rec.yield ? '' : `?serves=${serves}`);
  return `<a href="${href}">${esc(c.label || rec.title)}</a>${c.note ? `<span class="cell-note">${esc(c.note)}</span>` : ''}${kcalHTML(c)}`;
}
function planPanel(p, person, i) {
  const id = 'who-' + slugify(person.name);
  const dayKcal = cells => {
    if (!person.dayTotal) return '';
    const meals = cells.slice(0, 3);
    if (meals.some(c => c.kcal === undefined || c.noTotal)) return '';
    return `<span class="day-kcal">${meals.reduce((n, c) => n + c.kcal, 0).toLocaleString('en-GB')} kcal</span>`;
  };
  const rows = person.rows.map(([day, ...cells]) => `<tr data-day="${day}"><th scope="row">${day}${dayKcal(cells)}</th>${cells.map((c, n) => `<td data-label="${esc(person.columns[n])}">${cellHTML(c, person)}</td>`).join('')}</tr>`).join('');
  const boxes = (person.boxes || []).map(b => `<div class="plan-box"><h3>${esc(b.title)}</h3>${b.text ? `<p>${esc(b.text)}</p>` : ''}${b.list ? `<ol>${b.list.map(x => `<li>${esc(x)}</li>`).join('')}</ol>` : ''}</div>`).join('');
  const guide = person.name === 'Ted' ? `<p class="source"><a href="/plans/teds-food-guide/">Ted's Food Guide</a></p>` : '';
  return `<section class="plan-panel" id="${id}" role="tabpanel" aria-label="${esc(person.name)}"${i ? ' hidden' : ''}>
  ${person.intro ? `<p class="plan-intro">${esc(person.intro)}</p>` : ''}
  <div class="plan-table-wrap"><table class="plan-table"><thead><tr><th scope="col">Day</th>${person.columns.map(c => `<th scope="col">${esc(c)}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>
  ${boxes}${guide}
</section>`;
}
function planPage(p) {
  const multi = p.people.length > 1;
  const tabs = multi ? `<div class="tabs plan-tabs" role="tablist" aria-label="Whose plan">${p.people.map((pp, i) => `<button type="button" role="tab" data-panel="who-${slugify(pp.name)}" aria-selected="${i === 0}"${i ? ' tabindex="-1"' : ''}>${esc(pp.name)}</button>`).join('')}</div>` : '';
  const idx = plans.indexOf(p);
  const older = plans[idx - 1], newer = plans[idx + 1];
  return head({ title: `${p.title} | Meal Plans | ${NAME}`, description: `Meal plan for ${range(p)}.`, canonical: `${SITE}/plans/${p.id}/`, nav: 'plans' }) + `
<main id="main" class="wrap plan-page" data-start="${p.start}">
  <div class="recipe-head">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/plans/">Meal Plans</a></nav>
    <h1>${esc(p.title)}</h1>
    <p class="desc">${range(p)}<span class="week-badge" hidden></span></p>
  </div>
  <div class="toolbar plan-bar"><div class="bar-in">
    <a class="back" href="/plans/" data-back aria-label="Back to Meal Plans">${ICON.back}<span>Meal Plans</span></a>
    ${tabs || `<span class="bar-title">${esc(p.title)}</span>`}
  </div></div>
  ${p.people.map((pp, i) => planPanel(p, pp, i)).join('')}
  <nav class="week-nav" aria-label="Other weeks">${older ? `<a href="/plans/${older.id}/">← ${esc(older.title)}</a>` : '<span></span>'}${newer ? `<a href="/plans/${newer.id}/">${esc(newer.title)} →</a>` : ''}</nav>
</main>
${foot}<script src="/assets/plan-page.js"></script>
</body>
</html>
`;
}
function plansIndex() {
  const list = [...plans].reverse().map(p => `<li><a class="card plan-card" href="/plans/${p.id}/" data-start="${p.start}">
    <p class="eyebrow"><span class="week-badge" hidden></span>${esc(p.people.map(x => x.name).join(', '))}</p>
    <h3>${esc(p.title)}</h3><p class="desc">${range(p)}</p></a></li>`).join('');
  return head({ title: `Meal Plans | ${NAME}`, description: 'Weekly meal plans for Ted, Tom and Sophie.', canonical: `${SITE}/plans/`, nav: 'plans' }) + `
<main id="main" class="wrap">
  <div class="intro"><h1>Meal Plans</h1></div>
  <ul class="grid plan-list">${list}</ul>
  <p class="source"><a href="/plans/teds-food-guide/">Ted's Food Guide</a> · <a href="/shop/">Sainsbury's Shop Button</a></p>
</main>
${foot}<script src="/assets/plan-page.js"></script>
</body>
</html>
`;
}
const SAFETY = ['Cook eggs until the white and yolk are set.', 'Check fish carefully for bones before serving.', 'Cool cooked rice within an hour, keep it in the fridge and reheat it only once, until piping hot.', 'Reheat leftovers only once, until piping hot, then let them cool.', 'Cut round fruit such as blueberries so it is flat or halved.', 'Let hot food cool and test the temperature before serving.'];
const FRUIT = [['Banana', 'Cut into strips or thick rounds.'], ['Pear', 'Peel and cut ripe pear into wedges. Steam a firm pear for 3 to 4 minutes to soften it.'], ['Blueberries', 'Squash each one flat or cut it in half.'], ['Strawberries', 'Hull them and cut them into quarters lengthways.']];
function guidePage() {
  return head({ title: `Ted's Food Guide | ${NAME}`, description: 'Yoghurt, fruit and food safety for Ted.', canonical: `${SITE}/plans/teds-food-guide/`, nav: 'plans' }) + `
<main id="main" class="wrap">
  <div class="recipe-head"><nav class="crumbs" aria-label="Breadcrumb"><a href="/plans/">Meal Plans</a></nav><h1>Ted's Food Guide</h1></div>
  <div class="notes guide">
    <div class="note"><h3>Yoghurt & Fruit</h3><p>Every lunch and dinner ends with 2 to 3 tablespoons of plain, full-fat Greek yoghurt and the day's fruit.</p><ul>${FRUIT.map(([n, x]) => `<li><strong>${n}.</strong> ${esc(x)}</li>`).join('')}</ul></div>
    <div class="note"><h3>Food Safety</h3><ul>${SAFETY.map(s => `<li>${esc(s)}</li>`).join('')}</ul></div>
  </div>
  <p class="source">All of Ted's recipes are under <a href="/#course-toddler-meals">Toddler Meals</a>.</p>
</main>
${foot}</body>
</html>
`;
}

// ---- Sainsbury's shop button
function shopPage() {
  const shop = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'shop', 'list.json'), 'utf8'));
  const code = fs.readFileSync(path.join(__dirname, '..', 'shop', 'shop-button.js'), 'utf8')
    .replace(/^\/\*[\s\S]*?\*\/\s*/, '')
    .replace('__LIST__', JSON.stringify(shop.items.map(i => ({ sku: i.sku, qty: i.qty, name: i.name }))));
  const bookmarklet = 'javascript:' + encodeURIComponent(code);
  const units = shop.items.reduce((n, i) => n + i.qty, 0);
  return head({ title: `Sainsbury's Shop Button | ${NAME}`, description: 'One click fills the Sainsbury\'s trolley with the week\'s shop.', canonical: `${SITE}/shop/`, nav: 'plans' }) + `
<main id="main" class="wrap shop-page">
  <div class="recipe-head"><nav class="crumbs" aria-label="Breadcrumb"><a href="/plans/">Meal Plans</a></nav><h1>Sainsbury's Shop Button</h1>
  <p class="lede">One click puts the whole list below into your Sainsbury's trolley in about 10 seconds. You then check the trolley, choose a slot and pay as usual.</p></div>

  <div class="note shop-step"><h2>Set It Up Once, on Your Computer</h2>
  <ol>
    <li>Open this page in Chrome on your computer.</li>
    <li>Show the bookmarks bar, the strip under the address bar. On a Mac press Cmd, Shift and B together. On Windows press Ctrl, Shift and B.</li>
    <li>Drag this orange button up onto the bookmarks bar, and let go.<br><a class="shop-bookmarklet" href="${bookmarklet}" onclick="alert('Drag this button onto your bookmarks bar. Clicking it here does nothing.');return false;">🛒 Fill Sainsbury's trolley</a></li>
    <li>Check that "🛒 Fill Sainsbury's trolley" now appears on the bar.</li>
  </ol></div>

  <div class="note shop-step"><h2>Each Week</h2>
  <ol>
    <li>Go to sainsburys.co.uk, any page, and check that you are signed in.</li>
    <li>Click "🛒 Fill Sainsbury's trolley" on your bookmarks bar.</li>
    <li>Wait about 10 seconds. An orange box in the top right says how many items went in, and lists anything Sainsbury's would not add, such as items out of stock.</li>
    <li>Click "Open my trolley" in the box. Check the trolley, change anything you want, choose a delivery slot and pay.</li>
  </ol>
  <p>The button adds to whatever is already in your trolley, so empty the trolley first if you want only this list. It never checks out or pays.</p></div>

  <div class="note shop-step"><h2>If It Stops Working</h2>
  <p>Sainsbury's changes its website from time to time. If the box says Sainsbury's "did not respond in the usual way", ask Claude to look at the shop button.</p></div>

  <h2>${esc(shop.title)}</h2>
  <p>${shop.items.length} lines, ${units} items.</p>
  <div class="plan-table-wrap"><table class="plan-table"><thead><tr><th scope="col">Item</th><th scope="col">Qty</th></tr></thead><tbody>${shop.items.map(i => `<tr><td>${esc(i.name)}</td><td>${i.qty}</td></tr>`).join('')}</tbody></table></div>
</main>
${foot}</body>
</html>
`;
}

// Write the site
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(path.join(DIST, 'assets'), { recursive: true });
['site.css', 'scale.js', 'render.js', 'recipe-page.js', 'index-page.js', 'plan-page.js'].forEach(f => fs.copyFileSync(path.join(__dirname, f), path.join(DIST, 'assets', f)));
fs.mkdirSync(path.join(DIST, 'assets', 'illustrations'), { recursive: true });
fs.readdirSync(ART_DIR).forEach(f => fs.copyFileSync(path.join(ART_DIR, f), path.join(DIST, 'assets', 'illustrations', f)));
fs.writeFileSync(path.join(DIST, 'index.html'), indexPage());
recipes.forEach(r => {
  fs.mkdirSync(path.join(DIST, 'recipes', r.slug), { recursive: true });
  fs.writeFileSync(path.join(DIST, 'recipes', r.slug, 'index.html'), recipePage(r));
});
fs.mkdirSync(path.join(DIST, 'plans', 'teds-food-guide'), { recursive: true });
fs.writeFileSync(path.join(DIST, 'plans', 'index.html'), plansIndex());
fs.writeFileSync(path.join(DIST, 'plans', 'teds-food-guide', 'index.html'), guidePage());
fs.mkdirSync(path.join(DIST, 'shop'), { recursive: true });
fs.writeFileSync(path.join(DIST, 'shop', 'index.html'), shopPage());
plans.forEach(p => { fs.mkdirSync(path.join(DIST, 'plans', p.id), { recursive: true }); fs.writeFileSync(path.join(DIST, 'plans', p.id, 'index.html'), planPage(p)); });
fs.writeFileSync(path.join(DIST, 'favicon.svg'), '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#a3321c"/><text x="32" y="44" font-family="Georgia,serif" font-size="34" text-anchor="middle" fill="#fff">T</text></svg>');
fs.writeFileSync(path.join(DIST, '_redirects'), '/plans/2026-09-28/*  /plans/  301\n/recipes/hainanese-chicken-rice/*  /recipes/hainanish-soy-poached-chicken/  301\n/recipes/sausage-potato-traybake/*  /recipes/sausage-mash-gravy-cabbage/  301\n');
fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\n${INDEXABLE ? 'Allow: /' : 'Allow: /'}\nSitemap: ${SITE}/sitemap.xml\n`);
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n<url><loc>${SITE}/</loc></url>\n${recipes.map(r => `<url><loc>${SITE}/recipes/${r.slug}/</loc></url>`).join('\n')}\n<url><loc>${SITE}/plans/</loc></url>\n${plans.map(p => `<url><loc>${SITE}/plans/${p.id}/</loc></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(DIST, '404.html'), head({ title: 'Page not found | ' + NAME, description: 'Page not found', canonical: SITE + '/' }) +
  `<main id="main" class="wrap intro"><h1>That page isn't here</h1><p>The recipe may have moved. <a href="/">See all recipes</a>.</p></main>${foot}</body></html>`);
// Old addresses that now live elsewhere.
const MOVED = { 'plans/2026-09-28': 'plans/', 'recipes/hainanese-chicken-rice': 'recipes/hainanish-soy-poached-chicken/', 'recipes/sausage-potato-traybake': 'recipes/sausage-mash-gravy-cabbage/' };
Object.entries(MOVED).forEach(([from, to]) => {
  fs.mkdirSync(path.join(DIST, from), { recursive: true });
  fs.writeFileSync(path.join(DIST, from, 'index.html'), `<!doctype html><meta charset="utf-8"><meta name="robots" content="noindex"><title>Moved</title><meta http-equiv="refresh" content="0; url=/${to}"><link rel="canonical" href="/${to}"><a href="/${to}">This page has moved.</a>`);
});
fs.writeFileSync(path.join(DIST, '.nojekyll'), '');
// Give each asset a version taken from its contents, so phones fetch new scripts and styles straight away.
const VERSIONS = {};
fs.readdirSync(path.join(DIST, 'assets'), { withFileTypes: true }).filter(d => d.isFile()).map(d => d.name).forEach(f => {
  VERSIONS[f] = require('crypto').createHash('md5').update(fs.readFileSync(path.join(DIST, 'assets', f))).digest('hex').slice(0, 8);
});
// Point every site link at the base path the site is served from.
(function rebase(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(d => {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) return rebase(p);
    if (!p.endsWith('.html')) return;
    const html = fs.readFileSync(p, 'utf8')
      .replace(/"\/assets\/([\w.-]+)"/g, (m, f) => `"/assets/${f}?v=${VERSIONS[f] || ''}"`)
      .replace(/(href|src|action)="\/(?!\/)/g, `$1="${BASE}/`).replace(/srcset="([^"]+)"/g, (m, v) => `srcset="${v.replace(/(^|, )\/(?!\/)/g, `$1${BASE}/`)}"`).replace(/url=\//g, `url=${BASE}/`);
    fs.writeFileSync(p, html);
  });
})(DIST);
console.log('Built ' + recipes.length + ' recipe pages into ' + DIST);
