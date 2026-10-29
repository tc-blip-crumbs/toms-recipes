/* Cookbooks: search every recipe in Tom's cookbooks by dish or ingredient. Data comes from /assets/cookbooks.json, built by tools/cookbooks.py from the Eat Your Books bookshelf. */
(function () {
  var q = document.getElementById('q');
  var bookSel = document.getElementById('book');
  var list = document.getElementById('cb-list');
  var close = document.getElementById('cb-close');
  var closeList = document.getElementById('cb-close-list');
  var count = document.getElementById('result-count');
  var empty = document.getElementById('empty');
  var more = document.getElementById('cb-more');
  var clear = document.querySelectorAll('[data-clear]');
  var books = [], recipes = [], shown = 40;

  // Words that mean the same thing in a recipe search.
  var SAME = [
    ['spaghetti', 'linguine', 'pasta', 'tagliatelle', 'pappardelle', 'fettuccine', 'bucatini'],
    ['mince', 'minced', 'ground'],
    ['courgette', 'zucchini'], ['aubergine', 'eggplant'], ['coriander', 'cilantro'],
    ['prawn', 'shrimp'], ['chilli', 'chili'], ['spring onion', 'scallion']
  ];
  function norm(s) { return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim(); }
  function stem(w) { if (w.length > 4 && /ies$/.test(w)) return w.slice(0, -3) + 'y'; if (w.length > 4 && /(ches|shes|oes)$/.test(w)) return w.slice(0, -2); if (w.length > 3 && /s$/.test(w) && !/ss$/.test(w)) return w.slice(0, -1); return w; }
  function words(s) { return norm(s).split(' ').filter(Boolean).map(stem); }
  function alts(w) { for (var i = 0; i < SAME.length; i++) { var g = SAME[i].map(stem); if (g.indexOf(w) !== -1) return g; } return [w]; }
  function has(tokens, w) { for (var i = 0; i < tokens.length; i++) { if (tokens[i] === w || (w.length > 3 && tokens[i].indexOf(w) === 0)) return true; } return false; }

  function score(r, qw) {
    var all = 0, total = 0;
    for (var i = 0; i < qw.length; i++) {
      var a = alts(qw[i]), best = 0;
      for (var j = 0; j < a.length; j++) {
        var exact = a[j] === qw[i] ? 1 : 0.6;
        if (has(r.tw, a[j])) best = Math.max(best, 3 * exact);
        else if (has(r.iw, a[j])) best = Math.max(best, 1.5 * exact);
        else if (has(r.cw, a[j])) best = Math.max(best, 1 * exact);
      }
      if (best > 0) all++;
      total += best;
    }
    return { all: all === qw.length, matched: all, total: total };
  }

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function item(r) {
    var b = books[r.b];
    return '<li class="cb-item"><div class="cb-top"><h3>' + esc(r.t) + '</h3>' + (r.p ? '<span class="cb-page">p. ' + esc(r.p) + '</span>' : '') + '</div>' +
      '<p class="cb-book"><b>' + esc(b[0]) + '</b>' + (b[1] ? ' · ' + esc(b[1]) : '') + '</p>' +
      (r.i ? '<p class="cb-ing">' + esc(r.i.split('; ').join(', ')) + '</p>' : '') +
      (r.c ? '<p class="cb-cat">' + esc(r.c.split('; ').slice(0, 4).join(' · ')) + '</p>' : '') + '</li>';
  }

  function readURL() { var p = new URLSearchParams(location.search); q.value = p.get('q') || ''; bookSel.value = p.get('book') || ''; }
  function writeURL() {
    var p = new URLSearchParams(); if (q.value.trim()) p.set('q', q.value.trim()); if (bookSel.value) p.set('book', bookSel.value);
    var s = p.toString(); history.replaceState(null, '', s ? '?' + s : location.pathname);
  }

  function apply() {
    var qw = words(q.value), bk = bookSel.value === '' ? -1 : +bookSel.value;
    var pool = bk < 0 ? recipes : recipes.filter(function (r) { return r.b === bk; });
    var hits = [], near = [];
    if (qw.length) {
      pool.forEach(function (r) { var s = score(r, qw); if (s.all) hits.push([s.total, r]); else if (qw.length > 1 && s.matched >= qw.length - 1 && s.total >= 3) near.push([s.total, r]); });
      var by = function (a, b) { return b[0] - a[0] || a[1].t.localeCompare(b[1].t); };
      hits.sort(by); near.sort(by);
      hits = hits.map(function (x) { return x[1]; }); near = near.slice(0, 30).map(function (x) { return x[1]; });
    } else {
      hits = bk < 0 ? [] : pool.slice().sort(function (a, b) { return (parseInt(a.p, 10) || 0) - (parseInt(b.p, 10) || 0); });
    }
    list.innerHTML = hits.slice(0, shown).map(item).join('');
    more.hidden = hits.length <= shown;
    closeList.innerHTML = near.map(item).join('');
    close.hidden = !near.length;
    var filtering = qw.length > 0 || bk >= 0;
    count.textContent = filtering ? hits.length.toLocaleString('en-GB') + (hits.length === 1 ? ' recipe' : ' recipes') : recipes.length.toLocaleString('en-GB') + ' recipes in ' + books.length + ' books';
    empty.hidden = !filtering || hits.length || near.length;
    clear.forEach(function (b) { b.hidden = !filtering; });
    writeURL();
  }

  var t;
  q.addEventListener('input', function () { clearTimeout(t); t = setTimeout(function () { shown = 40; apply(); }, 150); });
  bookSel.addEventListener('change', function () { shown = 40; apply(); });
  more.addEventListener('click', function () { shown += 40; apply(); });
  clear.forEach(function (b) { b.addEventListener('click', function () { q.value = ''; bookSel.value = ''; shown = 40; apply(); q.focus(); }); });
  document.addEventListener('keydown', function (e) { if (e.key === '/' && document.activeElement !== q) { e.preventDefault(); q.focus(); } });

  fetch('/assets/cookbooks.json').then(function (r) { return r.json(); }).then(function (d) {
    books = d.books;
    recipes = d.recipes.map(function (x) { return { t: x[0], p: x[1], b: x[2], c: x[3], i: x[4], tw: words(x[0]), iw: words(x[4]), cw: words(x[3]) }; });
    var opts = books.map(function (b, n) { return [b[0], n]; }).sort(function (a, b) { return a[0].localeCompare(b[0]); });
    bookSel.insertAdjacentHTML('beforeend', opts.map(function (o) { return '<option value="' + o[1] + '">' + esc(o[0]) + '</option>'; }).join(''));
    readURL(); apply();
  }).catch(function () { count.textContent = 'The cookbook index did not load. Pull down to reload the page.'; });
})();
