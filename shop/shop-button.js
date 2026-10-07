/*
  Tom's Sainsbury's shop button. The site build turns this file into a
  bookmark, with the shopping list put in place of __LIST__.

  When clicked on a Sainsbury's page, it:
  1. finds the Add button for an item on the list and clicks it, and copies
     the current request details (action ID, store and delivery slot) from it;
  2. adds the rest of the list, 5 requests at a time;
  3. shows a box saying what it added and anything it could not add.

  If the page has no Add button for a list item, it opens a Sainsbury's
  search for one, and Tom clicks the bookmark again.
*/
(async function tomShopButton() {
  const list = __LIST__;
  const WORKERS = 5;
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const searchFor = item => 'https://www.sainsburys.co.uk/gol-ui/SearchResults/' + encodeURIComponent(item.name);

  if (!/(^|\.)sainsburys\.co\.uk$/.test(location.hostname)) { location.href = searchFor(list[0]); return; }

  // 1. Find an Add button for a list item and capture its request.
  const label = b => (b.getAttribute('aria-label') || '').toLowerCase();
  const addButtons = [...document.querySelectorAll('button')].filter(b => /^add .* to basket$/.test(label(b)));
  const addButton = addButtons.find(b => list.some(it => label(b) === ('add ' + it.name + ' to basket').toLowerCase()));
  if (!addButton) {
    let n = 0; try { n = +sessionStorage.getItem('tomShopTry') || 0; sessionStorage.setItem('tomShopTry', n + 1); } catch (e) {}
    if (n >= 3) { try { sessionStorage.removeItem('tomShopTry'); } catch (e) {} return say('I could not find a list item to start from. Search Sainsbury\'s for any item on your list that is not in your trolley yet, then click the button again.'); }
    say('Opening a Sainsbury\'s page to start from. When it has loaded, click the button again.');
    await sleep(1500);
    location.href = searchFor(list[n % list.length]);
    return;
  }
  try { sessionStorage.removeItem('tomShopTry'); } catch (e) {}

  const captured = [];
  const realFetch = window.fetch;
  window.fetch = function (input, init) {
    const h = {}; const hh = init && init.headers;
    if (hh) { if (hh.forEach) hh.forEach((v, k) => (h[k] = v)); else Object.assign(h, hh); }
    if (h['next-action'] && init && typeof init.body === 'string' && init.body.includes('"sku"')) captured.push({ headers: h, body: init.body });
    return realFetch.apply(this, arguments);
  };
  say('Filling your trolley…');
  addButton.click();
  for (let i = 0; i < 20 && !captured.length; i++) await sleep(250);
  window.fetch = realFetch;
  if (!captured.length) return say('Sainsbury\'s did not respond in the usual way, so nothing else was added. Its website may have changed. Ask Claude to look at the shop button.');
  const template = captured[0];
  const t = JSON.parse(template.body)[0];
  const clickedSku = String(t.sku);

  // 2. Add the rest, 5 at a time. Sainsbury's takes one product per request.
  const results = [];
  const queue = list.slice();
  async function worker() {
    while (queue.length) {
      const item = queue.shift();
      let qty = item.qty;
      if (String(item.sku) === clickedSku) qty -= 1; // the click added one already
      if (qty <= 0) { results.push({ ...item, ok: true }); continue; }
      const body = JSON.stringify([{ sku: String(item.sku), uom: 'ea', quantity: qty, selectedCatchweight: '$undefined', storeNumber: t.storeNumber, slotBooked: t.slotBooked, pickTime: t.pickTime, isBasketCreated: true }]);
      try {
        const res = await realFetch(location.pathname + location.search, { method: 'POST', headers: template.headers, body });
        const txt = await res.text();
        results.push({ ...item, ok: res.ok && txt.includes(String(item.sku)) });
      } catch (e) {
        results.push({ ...item, ok: false });
      }
    }
  }
  await Promise.all(Array.from({ length: WORKERS }, worker));

  // 3. Report.
  const failed = results.filter(r => !r.ok);
  return say('Done. Added ' + (results.length - failed.length) + ' of ' + results.length + ' items to your trolley.' +
    (failed.length ? '\n\nCould not add these, so add them yourself or pick a substitute:\n' + failed.map(f => '— ' + f.name).join('\n') : '') +
    '\n\nNow open your trolley, check it, choose a slot and pay.', true);

  function say(msg, link) {
    const old = document.getElementById('tom-shop-box'); if (old) old.remove();
    const box = document.createElement('div');
    box.id = 'tom-shop-box';
    box.style.cssText = 'position:fixed;top:16px;right:16px;z-index:2147483647;max-width:380px;max-height:80vh;overflow:auto;white-space:pre-wrap;background:#fff;color:#222;border:3px solid #f06c00;border-radius:10px;padding:16px 18px;font:16px/1.45 sans-serif;box-shadow:0 6px 24px rgba(0,0,0,.25)';
    box.textContent = msg;
    if (link) { const a = document.createElement('a'); a.href = '/gol-ui/trolley'; a.textContent = 'Open my trolley →'; a.style.cssText = 'display:block;margin-top:12px;font-weight:700;color:#f06c00'; box.appendChild(a); }
    const x = document.createElement('button'); x.textContent = '×'; x.setAttribute('aria-label', 'Close'); x.style.cssText = 'position:absolute;top:4px;right:8px;border:0;background:none;font-size:22px;cursor:pointer;color:#666'; x.onclick = () => box.remove(); box.appendChild(x);
    document.body.appendChild(box);
    return msg;
  }
})();
