/* Recipe index: search, filters and URL state. */
(function () {
  var index = JSON.parse(document.getElementById('index-data').textContent);
  var q = document.getElementById('q');
  var cards = Array.prototype.slice.call(document.querySelectorAll('.card[data-slug]'));
  var sections = document.querySelectorAll('.course-section');
  var empty = document.getElementById('empty');
  var countEl = document.getElementById('result-count');
  var filters = document.querySelectorAll('[data-filter]');
  var clear = document.querySelectorAll('[data-clear]');
  var state = { q: '', label: [], cuisine: [] };

  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, ' '); }
  var hay = {};
  index.forEach(function (r) { hay[r.slug] = norm([r.title, r.description, r.course, r.cuisine, r.main, r.labels.join(' '), r.ingredients.join(' '), r.equipment.join(' ')].join(' ')); });

  function readURL() {
    var p = new URLSearchParams(location.search);
    state.q = p.get('q') || '';
    state.label = p.getAll('label');
    state.cuisine = p.getAll('cuisine');
    q.value = state.q;
  }
  function writeURL() {
    var p = new URLSearchParams();
    if (state.q) p.set('q', state.q);
    state.label.forEach(function (l) { p.append('label', l); });
    state.cuisine.forEach(function (c) { p.append('cuisine', c); });
    var s = p.toString();
    history.replaceState(null, '', s ? '?' + s : location.pathname);
  }

  function apply() {
    var words = norm(state.q).split(/\s+/).filter(Boolean);
    var shown = 0;
    cards.forEach(function (c) {
      var r = index.find(function (x) { return x.slug === c.getAttribute('data-slug'); });
      var ok = words.every(function (w) { return hay[r.slug].indexOf(w) !== -1 || hay[r.slug].indexOf(w.replace(/s$/, '')) !== -1; })
        && state.label.every(function (l) { return r.labels.indexOf(l) !== -1; })
        && (!state.cuisine.length || state.cuisine.indexOf(r.cuisine) !== -1);
      c.hidden = !ok;
      if (ok) shown++;
    });
    sections.forEach(function (s) {
      var n = s.querySelectorAll('.card:not([hidden])').length;
      s.hidden = n === 0;
      var c = s.querySelector('h2 small'); if (c) c.textContent = n;
    });
    var filtering = words.length || state.label.length || state.cuisine.length;
    empty.hidden = shown !== 0;
    countEl.textContent = filtering ? shown + (shown === 1 ? ' recipe matches' : ' recipes match') : index.length + ' recipes';
    clear.forEach(function (b) { b.hidden = !filtering; });
    filters.forEach(function (b) {
      var kind = b.getAttribute('data-filter'), val = b.getAttribute('data-value');
      b.setAttribute('aria-pressed', state[kind].indexOf(val) !== -1 ? 'true' : 'false');
    });
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
  filters.forEach(function (b) {
    b.addEventListener('click', function () {
      var kind = b.getAttribute('data-filter'), val = b.getAttribute('data-value');
      var list = state[kind], i = list.indexOf(val);
      if (i === -1) list.push(val); else list.splice(i, 1);
      apply(); writeURL();
    });
  });
  clear.forEach(function (b) {
    b.addEventListener('click', function () {
      state = { q: '', label: [], cuisine: [] }; q.value = '';
      apply(); writeURL(); q.focus();
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && document.activeElement !== q) { e.preventDefault(); q.focus(); }
  });

  readURL();
  apply();
  // Bring any active filter into view in its sideways-scrolling row.
  document.querySelectorAll('.pill[aria-pressed="true"]').forEach(function (b) {
    var row = b.parentElement;
    row.scrollLeft = b.offsetLeft - row.offsetLeft - 90;
  });
})();
