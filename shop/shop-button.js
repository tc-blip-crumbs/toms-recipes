/*
  Tom's Sainsbury's shop button. The site build turns this file into a
  bookmark, with the shopping list put in place of __LIST__.

  When clicked on a Sainsbury's page, it:
  1. finds the Add button for an item on the list and clicks it, and copies
     the current request details (action ID, store and delivery slot) from it;
  2. adds the rest of the list, 5 requests at a time;
  3. shows a box saying what it added and anything it could not add.

  If the page has no Add button for a list item, it loads a Sainsbury's
  search for one in a hidden frame and starts from there, so one click
  works from any Sainsbury's page.
*/
(async function tomShopButton() {
  const list = __LIST__;
  const WORKERS = 5;
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const searchFor = item => 'https://www.sainsburys.co.uk/gol-ui/SearchResults/' + encodeURIComponent(item.name);

  if (!/(^|\.)sainsburys\.co\.uk$/.test(location.hostname)) { location.href = 'https://www.sainsburys.co.uk/gol-ui/groceries'; return; }

  // 1. Find an Add button for a list item. If this page has none, load a
  //    Sainsbury's search for a list item in a hidden frame and use that.
  const label = b => (b.getAttribute('aria-label') || '').toLowerCase();
  const findAdd = doc => [...doc.querySelectorAll('button')].find(b => /^add .* to basket$/.test(label(b)) && list.some(it => label(b) === ('add ' + it.name + ' to basket').toLowerCase()));
  say('Filling your trolley…');
  let win = window, frame = null, addButton = findAdd(document);
  for (let n = 0; !addButton && n < 4; n++) {
    frame = document.createElement('iframe');
    frame.style.cssText = 'position:fixed;left:-9999px;top:0;width:1200px;height:900px;opacity:0';
    frame.src = searchFor(list[n * 7 % list.length]);
    document.body.appendChild(frame);
    for (let i = 0; i < 80 && !addButton; i++) {
      await sleep(250);
      try { const d = frame.contentDocument; if (d && d.readyState === 'complete') addButton = findAdd(d); } catch (e) {}
    }
    if (addButton) win = frame.contentWindow; else { frame.remove(); frame = null; }
  }
  if (!addButton) return say('I could not find an item from your list to start from. Check that you are signed in to Sainsbury\'s, then click the button again.');

  // Watch the page's requests, then click Add. Sainsbury's page needs a
  // moment after loading before its buttons respond, so try a few times.
  const captured = [];
  const realFetch = win.fetch;
  win.fetch = function (input, init) {
    const h = {}; const hh = init && init.headers;
    if (hh) { if (hh.forEach) hh.forEach((v, k) => (h[k] = v)); else Object.assign(h, hh); }
    if (h['next-action'] && init && typeof init.body === 'string' && init.body.includes('"sku"')) captured.push({ headers: h, body: init.body });
    return realFetch.apply(this, arguments);
  };
  if (frame) await sleep(2500);
  for (let tries = 0; tries < 4 && !captured.length; tries++) {
    const btn = findAdd(win.document) || addButton;
    btn.click();
    for (let i = 0; i < 12 && !captured.length; i++) await sleep(250);
  }
  win.fetch = realFetch;
  if (!captured.length) { if (frame) frame.remove(); return say('Sainsbury\'s did not respond in the usual way, so nothing was added. Its website may have changed. Ask Claude to look at the shop button.'); }
  const template = captured[0];
  const t = JSON.parse(template.body)[0];
  const clickedSku = String(t.sku);
  const postTo = win.location.pathname + win.location.search;

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
      let ok = false;
      for (let attempt = 0; attempt < 2 && !ok; attempt++) {
        try {
          const res = await realFetch.call(win, postTo, { method: 'POST', headers: template.headers, body });
          await res.text();
          ok = res.ok;
        } catch (e) {}
      }
      results.push({ ...item, ok });
    }
  }
  await Promise.all(Array.from({ length: WORKERS }, worker));

  // 3. Report.
  if (frame) frame.remove();
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
