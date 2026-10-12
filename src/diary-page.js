// Unlocks the food diary in the browser. The page holds only ciphertext.
(function () {
  var box = document.getElementById('diary'), form = document.getElementById('diary-lock'), out = document.getElementById('diary-days');
  var enc = JSON.parse(document.getElementById('diary-data').textContent);
  var STORE = 'diary-key-' + enc.salt.slice(0, 8);
  var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  function bytes(s) { var b = atob(s), a = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) a[i] = b.charCodeAt(i); return a; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function n(x) { return x.toLocaleString('en-GB'); }
  function load() { try { return localStorage.getItem(STORE); } catch (e) { return null; } }
  function save(v) { try { if (v) localStorage.setItem(STORE, v); else localStorage.removeItem(STORE); } catch (e) {} }
  function derive(pw) {
    return crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveKey']).then(function (base) {
      return crypto.subtle.deriveKey({ name: 'PBKDF2', salt: bytes(enc.salt), iterations: enc.iter, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, true, ['decrypt']);
    });
  }
  function open(key) {
    return crypto.subtle.decrypt({ name: 'AES-GCM', iv: bytes(enc.iv) }, key, bytes(enc.data)).then(function (buf) { return JSON.parse(new TextDecoder().decode(buf)); });
  }
  function render(d) {
    var today = new Date(), iso = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    var days = d.days.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    out.innerHTML = days.map(function (day) {
      var dt = new Date(day.date + 'T12:00:00');
      var title = DAYS[dt.getDay()] + ' ' + dt.getDate() + ' ' + MONTHS[dt.getMonth()];
      var all = day.entries.every(function (e) { return typeof e.kcal === 'number'; });
      var total = all ? day.entries.reduce(function (s, e) { return s + e.kcal; }, 0) : null;
      return '<section class="diary-day' + (day.date === iso ? ' is-today' : '') + '"><h2>' + esc(title) + (day.date === iso ? ' <span class="week-badge is-now">Today</span>' : '') + '</h2>' +
        '<ul class="diary-list">' + day.entries.map(function (e) {
          return '<li><span class="diary-meal">' + esc(e.meal) + '</span><span class="diary-item">' + esc(e.item) + (e.note ? '<span class="cell-note">' + esc(e.note) + '</span>' : '') + '</span>' +
            (typeof e.kcal === 'number' ? '<span class="cell-kcal">' + n(e.kcal) + ' kcal</span>' : '<span></span>') + '</li>';
        }).join('') + '</ul>' +
        (total !== null ? '<p class="diary-total">' + n(total) + ' of ' + n(d.target) + ' kcal</p>' : '') + '</section>';
    }).join('') || '<p>Nothing in the diary yet.</p>';
    form.hidden = true; box.hidden = false;
  }
  function tryKey(raw) {
    return crypto.subtle.importKey('raw', bytes(raw), { name: 'AES-GCM' }, true, ['decrypt']).then(open).then(render);
  }
  var saved = load();
  if (saved) tryKey(saved).catch(function () { save(null); form.hidden = false; }); else form.hidden = false;
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var msg = form.querySelector('.diary-msg'), btn = form.querySelector('button');
    btn.disabled = true; msg.textContent = 'Unlocking…';
    var key;
    derive(form.password.value).then(function (k) { key = k; return open(k); }).then(function (d) {
      return crypto.subtle.exportKey('raw', key).then(function (raw) {
        var s = ''; new Uint8Array(raw).forEach(function (b) { s += String.fromCharCode(b); }); save(btoa(s)); render(d);
      });
    }).catch(function () { msg.textContent = 'That password is wrong.'; btn.disabled = false; form.password.select(); });
  });
  document.getElementById('diary-lock-btn').addEventListener('click', function () { save(null); location.reload(); });
})();
