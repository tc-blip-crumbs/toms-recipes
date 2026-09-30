/* Recipe page behaviour: servings, tabs, ticking ingredients, timers, cooking mode, print. */
(function () {
  var dataEl = document.getElementById('recipe-data');
  if (!dataEl) return;
  var recipe = JSON.parse(dataEl.textContent);
  var SERVINGS = Scale.SERVINGS;
  var key = 'servings:' + recipe.slug;

  function load() { try { var v = +localStorage.getItem(key); return SERVINGS.indexOf(v) !== -1 ? v : null; } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(key, String(v)); } catch (e) {} }

  var fromLink = +new URLSearchParams(location.search).get('serves');
  var servings = recipe.yield ? recipe.serves
    : (SERVINGS.indexOf(fromLink) !== -1 ? fromLink : (load() || recipe.defaultServings || 2));
  var ingBox = document.getElementById('ing-body');
  var methodBox = document.getElementById('method-body');
  var countEls = document.querySelectorAll('[data-servings-count]');
  var minus = document.querySelector('[data-servings="down"]');
  var plus = document.querySelector('[data-servings="up"]');
  var note = document.getElementById('pan-note');
  var live = document.getElementById('servings-live');

  function ticked() {
    var ids = [];
    document.querySelectorAll('.tick:checked').forEach(function (c) { ids.push(c.id); });
    return ids;
  }

  function render(announce) {
    var keep = ticked();
    ingBox.innerHTML = Render.ingredientsHTML(recipe, servings);
    methodBox.innerHTML = Render.methodHTML(recipe, servings);
    keep.forEach(function (id) { var c = document.getElementById(id); if (c) c.checked = true; });
    countEls.forEach(function (el) { el.textContent = servings; });
    if (minus) minus.disabled = SERVINGS.indexOf(servings) === 0;
    if (plus) plus.disabled = SERVINGS.indexOf(servings) === SERVINGS.length - 1;
    if (note) { var t = Render.panNote(recipe, servings); note.textContent = t; note.hidden = !t; }
    if (announce && live) live.textContent = 'Amounts now for ' + servings + (servings === 1 ? ' serving' : ' servings');
    if (cook.open) cook.show(cook.index);
  }

  function step(dir) {
    var i = SERVINGS.indexOf(servings) + dir;
    if (i < 0 || i >= SERVINGS.length) return;
    servings = SERVINGS[i];
    save(servings);
    render(true);
  }
  if (minus) minus.addEventListener('click', function () { step(-1); });
  if (plus) plus.addEventListener('click', function () { step(1); });

  /* Tabs, used on narrow screens */
  var columns = document.querySelector('.columns');
  var tabs = document.querySelectorAll('[role="tab"]');
  function setView(v, focus) {
    columns.setAttribute('data-view', v);
    tabs.forEach(function (t) {
      var on = t.getAttribute('data-view') === v;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
    });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () {
      setView(t.getAttribute('data-view'));
      var bar = document.querySelector('.toolbar');
      var top = columns.getBoundingClientRect().top + window.scrollY - (bar ? bar.offsetHeight : 0) - 8;
      if (window.scrollY > top) window.scrollTo({ top: top });
    });
    t.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        var n = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
        setView(n.getAttribute('data-view'), true);
      }
    });
  });

  /* Timers */
  var timerBar = document.getElementById('timers');
  var timers = [];
  var audioCtx = null;
  function beep() {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      [0, 0.35, 0.7].forEach(function (t) {
        var o = audioCtx.createOscillator(), g = audioCtx.createGain();
        o.frequency.value = 880; o.connect(g); g.connect(audioCtx.destination);
        g.gain.setValueAtTime(0.0001, audioCtx.currentTime + t);
        g.gain.exponentialRampToValueAtTime(0.3, audioCtx.currentTime + t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + t + 0.3);
        o.start(audioCtx.currentTime + t); o.stop(audioCtx.currentTime + t + 0.32);
      });
    } catch (e) {}
    if (navigator.vibrate) try { navigator.vibrate([300, 150, 300]); } catch (e) {}
  }
  function fmt(s) {
    s = Math.max(0, Math.round(s));
    var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    return (h ? h + ':' + String(m).padStart(2, '0') : m) + ':' + String(sec).padStart(2, '0');
  }
  var baseTitle = document.title;
  function drawTimers() {
    timerBar.hidden = timers.length === 0;
    var running = timers.filter(function (t) { return !t.paused && !t.rang; }).sort(function (a, b) { return a.end - b.end; })[0];
    var doneT = timers.some(function (t) { return t.rang; });
    document.title = doneT ? 'Timer done · ' + baseTitle : running ? fmt((running.end - Date.now()) / 1000) + ' · ' + baseTitle : baseTitle;
    timerBar.innerHTML = timers.map(function (t, i) {
      var left = t.paused ? t.left : (t.end - Date.now()) / 1000;
      var done = left <= 0;
      return '<div class="timer' + (done ? ' is-done' : '') + '"><span class="timer-label">' + Render.esc(t.label) + '</span>' +
        '<span class="timer-time" role="timer">' + (done ? 'Done' : fmt(left)) + '</span>' +
        (done ? '' : '<button type="button" data-t="pause" data-i="' + i + '">' + (t.paused ? 'Resume' : 'Pause') + '</button>') +
        '<button type="button" data-t="stop" data-i="' + i + '">' + (done ? 'Dismiss' : 'Cancel') + '</button></div>';
    }).join('');
  }
  setInterval(function () {
    if (!timers.length) return;
    timers.forEach(function (t) {
      if (!t.paused && !t.rang && t.end <= Date.now()) { t.rang = true; beep(); }
    });
    drawTimers();
  }, 500);
  timerBar.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    var t = timers[+b.getAttribute('data-i')]; if (!t) return;
    if (b.getAttribute('data-t') === 'stop') timers.splice(timers.indexOf(t), 1);
    else if (t.paused) { t.end = Date.now() + t.left * 1000; t.paused = false; }
    else { t.left = (t.end - Date.now()) / 1000; t.paused = true; }
    drawTimers();
  });
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.timer-link'); if (!b) return;
    var mins = +b.getAttribute('data-minutes');
    var stepEl = b.closest('[data-step]') || b.closest('.step');
    var n = stepEl ? (stepEl.getAttribute('data-step') || stepEl.id.replace('step-', '')) : '';
    var label = 'Step ' + n + ' · ' + b.textContent.trim();
    if (timers.some(function (x) { return x.label === label && !x.rang; })) { drawTimers(); return; }
    timers.push({ label: label, end: Date.now() + mins * 60000 });
    try { audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)(); } catch (err) {}
    drawTimers();
  });

  /* Cooking mode: one step at a time, large text, screen kept awake */
  var cookEl = document.getElementById('cook');
  var cook = {
    open: false, index: 0, lock: null,
    show: function (i) {
      this.index = Math.max(0, Math.min(recipe.steps.length - 1, i));
      var s = recipe.steps[this.index];
      cookEl.querySelector('.cook-count').textContent = 'Step ' + (this.index + 1) + ' of ' + recipe.steps.length;
      var body = cookEl.querySelector('.cook-step');
      body.setAttribute('data-step', this.index + 1);
      body.innerHTML = '<p>' + Render.stepTextHTML(s.text) + '</p>' + Render.chipsHTML(recipe, s, servings);
      cookEl.querySelector('.cook-bar span').style.width = ((this.index + 1) / recipe.steps.length * 100) + '%';
      cookEl.querySelector('[data-cook="back"]').disabled = this.index === 0;
      var next = cookEl.querySelector('[data-cook="next"]');
      next.textContent = this.index === recipe.steps.length - 1 ? 'Finish' : 'Next step';
    },
    start: function (i) {
      this.open = true;
      this.opener = document.activeElement;
      cookEl.hidden = false;
      document.documentElement.classList.add('is-cooking');
      this.show(i || 0);
      cookEl.querySelector('[data-cook="next"]').focus();
      var self = this;
      if (navigator.wakeLock) navigator.wakeLock.request('screen').then(function (l) { self.lock = l; }).catch(function () {});
    },
    stop: function () {
      this.open = false;
      cookEl.hidden = true;
      document.documentElement.classList.remove('is-cooking');
      if (this.lock) { this.lock.release().catch(function () {}); this.lock = null; }
      if (this.opener && this.opener.focus) this.opener.focus();
    }
  };
  document.addEventListener('visibilitychange', function () {
    if (cook.open && document.visibilityState === 'visible' && navigator.wakeLock && !cook.lock)
      navigator.wakeLock.request('screen').then(function (l) { cook.lock = l; }).catch(function () {});
  });
  document.querySelectorAll('[data-action="cook"]').forEach(function (b) { b.addEventListener('click', function () { cook.start(0); }); });
  cookEl.addEventListener('click', function (e) {
    var b = e.target.closest('[data-cook]'); if (!b) return;
    var a = b.getAttribute('data-cook');
    if (a === 'close') cook.stop();
    else if (a === 'back') cook.show(cook.index - 1);
    else if (a === 'next') { if (cook.index === recipe.steps.length - 1) cook.stop(); else cook.show(cook.index + 1); }
  });
  document.addEventListener('keydown', function (e) {
    if (!cook.open) return;
    if (e.key === 'Escape') cook.stop();
    else if (e.key === 'ArrowRight') cook.show(cook.index + 1);
    else if (e.key === 'ArrowLeft') cook.show(cook.index - 1);
  });
  var touchX = null;
  cookEl.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  cookEl.addEventListener('touchend', function (e) {
    if (touchX == null) return;
    var dx = e.changedTouches[0].clientX - touchX; touchX = null;
    if (Math.abs(dx) > 60) cook.show(cook.index + (dx < 0 ? 1 : -1));
  });

  document.querySelectorAll('[data-action="print"]').forEach(function (b) { b.addEventListener('click', function () { window.print(); }); });

  render(false);
})();
