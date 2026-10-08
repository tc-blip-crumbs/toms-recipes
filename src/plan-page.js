/* Meal plans: week labels, today's row, tabs, and the "this week" link on the home page. */
(function () {
  function dayStart(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  function parse(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  var today = dayStart(new Date());
  function weekOffset(start) { return Math.floor((today - parse(start)) / 86400000 / 7); }
  function label(off) { return off === 0 ? 'This week' : off === -1 ? 'Next week' : off === 1 ? 'Last week' : ''; }

  document.querySelectorAll('[data-start]').forEach(function (el) {
    var off = weekOffset(el.getAttribute('data-start'));
    var badge = el.querySelector('.week-badge');
    var text = label(off);
    if (badge && text) { badge.textContent = text; badge.hidden = false; if (off === 0) badge.classList.add('is-now'); }
    if (off === 0 && el.classList.contains('plan-page')) {
      var names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      el.querySelectorAll('tr[data-day="' + names[today.getDay()] + '"]').forEach(function (tr) {
        tr.classList.add('is-today');
        tr.querySelector('th').insertAdjacentHTML('beforeend', '<span class="today-tag">Today</span>');
      });
    }
  });

  // On the plans list, put this week first, then weeks ahead, then past weeks.
  var list = document.querySelector('.plan-list');
  if (list) {
    var items = Array.prototype.slice.call(list.children);
    function rank(li) { var o = weekOffset(li.querySelector('[data-start]').getAttribute('data-start')); return o === 0 ? [0, 0] : o < 0 ? [1, -o] : [2, o]; }
    items.sort(function (a, b) { var x = rank(a), y = rank(b); return x[0] - y[0] || x[1] - y[1]; }).forEach(function (li) { list.appendChild(li); });
  }

  var tabs = document.querySelectorAll('.plan-tabs [role="tab"]');
  function show(id, focus) {
    tabs.forEach(function (t) {
      var on = t.getAttribute('data-panel') === id;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('data-panel')).hidden = !on;
      if (on && focus) t.focus();
    });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { show(t.getAttribute('data-panel')); history.replaceState(null, '', '#' + t.getAttribute('data-panel')); });
    t.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var n = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
      show(n.getAttribute('data-panel'), true);
    });
  });
  if (tabs.length && location.hash && document.getElementById(location.hash.slice(1))) show(location.hash.slice(1));

  // This week's plan opens on today's meals. Monday is already at the top.
  function goToday() {
    var rows = Array.prototype.filter.call(document.querySelectorAll('tr.is-today'), function (tr) { return !tr.closest('[hidden]'); });
    if (rows[0] && rows[0].getAttribute('data-day') !== 'Monday') rows[0].scrollIntoView({ block: 'start' });
  }
  goToday();
  tabs.forEach(function (t) { t.addEventListener('click', goToday); });

})();
