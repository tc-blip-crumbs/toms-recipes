/*
  Tom's Sainsbury's shop button.

  Run it on a Sainsbury's search results page while signed in. It:
  1. clicks the page's own Add button on the first product, and copies the
     current "next-action" ID, store number and delivery slot from that request;
  2. adds every item on the list, 5 requests at a time, using the same request;
  3. shows a summary of what it added and anything that failed.

  The list is read from localStorage key "tomShopList" as
  [{ "sku": "8267158", "qty": 1, "name": "Greek Yoghurt 1kg" }, ...].
  A weekly list built from the meal plan can replace it later.
*/
(async function tomShopButton() {
  const LIST_KEY = 'tomShopList';
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const list = JSON.parse(localStorage.getItem(LIST_KEY) || '[]');
  if (!list.length) return say('No shopping list found.');

  // 1. Capture the add request from one real click.
  const captured = [];
  const realFetch = window.fetch;
  window.fetch = function (input, init) {
    const h = {}; const hh = init && init.headers;
    if (hh) { if (hh.forEach) hh.forEach((v, k) => (h[k] = v)); else Object.assign(h, hh); }
    if (h['next-action'] && init && typeof init.body === 'string' && init.body.includes('"sku"')) captured.push({ headers: h, body: init.body });
    return realFetch.apply(this, arguments);
  };
  const addButtons = [...document.querySelectorAll('button')].filter(b => /^Add .* to basket$/i.test(b.getAttribute('aria-label') || ''));
  const onList = b => list.some(it => (b.getAttribute('aria-label') || '').toLowerCase().includes(it.name.toLowerCase()));
  const addButton = addButtons.find(onList) || addButtons[0];
  if (!addButton) { window.fetch = realFetch; return say('Open a Sainsbury\'s search page first, so the button has a product to click.'); }
  addButton.click();
  for (let i = 0; i < 20 && !captured.length; i++) await sleep(250);
  window.fetch = realFetch;
  if (!captured.length) return say('Sainsbury\'s did not send the usual add request. The site may have changed.');
  const template = captured[0];
  const t = JSON.parse(template.body)[0];
  const clickedSku = String(t.sku);

  // 2. Add the list, 5 requests at a time. Sainsbury's takes one product per request.
  const WORKERS = 5;
  const results = [];
  const queue = list.slice();
  async function worker() {
    while (queue.length) {
      const item = queue.shift();
      let qty = item.qty;
      if (String(item.sku) === clickedSku) qty -= 1; // the click already added one
      if (qty <= 0) { results.push({ ...item, ok: true, note: 'added by the first click' }); continue; }
      const body = JSON.stringify([{ sku: String(item.sku), uom: 'ea', quantity: qty, selectedCatchweight: '$undefined', storeNumber: t.storeNumber, slotBooked: t.slotBooked, pickTime: t.pickTime, isBasketCreated: true }]);
      try {
        const res = await realFetch(location.pathname + location.search, { method: 'POST', headers: template.headers, body });
        const txt = await res.text();
        const ok = res.ok && txt.includes(String(item.sku));
        results.push({ ...item, ok, note: ok ? '' : 'status ' + res.status });
      } catch (e) {
        results.push({ ...item, ok: false, note: e.message });
      }
    }
  }
  await Promise.all(Array.from({ length: WORKERS }, worker));

  // 3. Report.
  const failed = results.filter(r => !r.ok);
  localStorage.setItem('tomShopLastRun', JSON.stringify({ at: new Date().toISOString(), results }));
  return say('Added ' + (results.length - failed.length) + ' of ' + results.length + ' items.' + (failed.length ? '\nCould not add:\n' + failed.map(f => '— ' + f.name).join('\n') : ''));

  function say(msg) {
    console.log('[TomShop] ' + msg);
    const box = document.createElement('div');
    box.textContent = msg;
    box.style.cssText = 'position:fixed;top:16px;right:16px;z-index:999999;max-width:360px;white-space:pre-wrap;background:#fff;color:#222;border:2px solid #f06c00;border-radius:8px;padding:14px 16px;font:15px/1.4 sans-serif;box-shadow:0 4px 18px rgba(0,0,0,.2)';
    box.onclick = () => box.remove();
    document.body.appendChild(box);
    return msg;
  }
})();
