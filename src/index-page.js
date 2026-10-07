/* Recipe index: search, filters and URL state. */
(function () {
  var index = JSON.parse(document.getElementById('index-data').textContent);
  var q = document.getElementById('q');
  var cards = Array.prototype.slice.call(document.querySelectorAll('.card[data-slug]'));
  var sections = document.querySelectorAll('.course-section');
  var empty = document.getElementById('empty');
  var countEl = document.getElementById('result-count');
  var clear = document.querySelectorAll('[data-clear]');
  var others = Array.prototype.slice.call(document.querySelectorAll('[data-others]'));
  var state = { q: '' };

  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, ' '); }
  var hay = {};
  index.forEach(function (r) { hay[r.slug] = norm([r.title, r.description, r.course, r.cuisine, r.main, r.labels.join(' '), r.ingredients.join(' '), r.equipment.join(' ')].join(' ')); });

  function readURL() {
    var p = new URLSearchParams(location.search);
    state.q = p.get('q') || '';
    q.value = state.q;
  }
  function writeURL() {
    var p = new URLSearchParams();
    if (state.q) p.set('q', state.q);
    var s = p.toString();
    history.replaceState(null, '', s ? '?' + s : location.pathname);
  }

  function apply() {
    var words = norm(state.q).split(/\s+/).filter(Boolean);
    var shown = 0;
    cards.forEach(function (c) {
      var r = index.find(function (x) { return x.slug === c.getAttribute('data-slug'); });
      var ok = words.every(function (w) { return hay[r.slug].indexOf(w) !== -1 || hay[r.slug].indexOf(w.replace(/s$/, '')) !== -1; });
      c.hidden = !ok;
      if (ok) shown++;
    });
    var filtering = words.length > 0;
    // A search opens any "Other" list that holds a match, and closes it again when the search is cleared.
    others.forEach(function (d) {
      var n = d.querySelectorAll('.card:not([hidden])').length;
      d.hidden = filtering && n === 0;
      if (filtering && n) { if (!d.open) { d.open = true; d.dataset.auto = '1'; } }
      else if (!filtering && d.dataset.auto) { d.open = false; delete d.dataset.auto; }
      var c = d.querySelector('summary small'); if (c) c.textContent = n;
    });
    sections.forEach(function (s) {
      var n = s.querySelectorAll('.main-grid .card:not([hidden])').length;
      var all = s.querySelectorAll('.card:not([hidden])').length;
      s.hidden = all === 0;
      var c = s.querySelector('h2 small'); if (c) c.textContent = n;
    });
    empty.hidden = shown !== 0;
    countEl.textContent = filtering ? shown + (shown === 1 ? ' recipe matches' : ' recipes match') : index.length + ' recipes';
    clear.forEach(function (b) { b.hidden = !filtering; });
    document.getElementById('az').hidden = !!filtering;
  }

  var t;
  q.addEventListener('input', function () {
    state.q = q.value.trim();
    apply();
    clearTimeout(t); t = setTimeout(writeURL, 300);
  });
  q.closest('form').addEventListener('submit', function (e) {
    e.preventDefault();
    var first = cards.find(function (c) { return !c.hidden; });
    if (first && state.q) location.href = first.getAttribute('href');
  });
  clear.forEach(function (b) {
    b.addEventListener('click', function () {
      state = { q: '' }; q.value = '';
      apply(); writeURL(); q.focus();
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && document.activeElement !== q) { e.preventDefault(); q.focus(); }
  });

  readURL();
  apply();
})();
