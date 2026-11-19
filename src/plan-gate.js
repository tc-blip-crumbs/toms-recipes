// Shows the meal plan pages only after the diary password has been entered.
// The password check decrypts the diary data held in the page, so both pages share one password.
(function () {
  var root = document.documentElement, box = document.getElementById('gate-box'), form = document.getElementById('gate-form');
  var enc = JSON.parse(document.getElementById('gate-data').textContent);
  var STORE = 'diary-key-' + enc.salt.slice(0, 8);
  function bytes(s) { var b = atob(s), a = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) a[i] = b.charCodeAt(i); return a; }
  function load() { try { return localStorage.getItem(STORE); } catch (e) { return null; } }
  function save(v) { try { if (v) localStorage.setItem(STORE, v); else localStorage.removeItem(STORE); } catch (e) {} }
  function derive(pw) {
    return crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveKey']).then(function (base) {
      return crypto.subtle.deriveKey({ name: 'PBKDF2', salt: bytes(enc.salt), iterations: enc.iter, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, true, ['decrypt']);
    });
  }
  function open(key) { return crypto.subtle.decrypt({ name: 'AES-GCM', iv: bytes(enc.iv) }, key, bytes(enc.data)); }
  function unlock() { root.classList.add('unlocked'); box.hidden = true; }
  var saved = load();
  if (saved) {
    crypto.subtle.importKey('raw', bytes(saved), { name: 'AES-GCM' }, true, ['decrypt']).then(open).then(unlock).catch(function () { save(null); box.hidden = false; });
  } else box.hidden = false;
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var msg = form.querySelector('.diary-msg'), btn = form.querySelector('button');
    btn.disabled = true; msg.textContent = 'Unlocking…';
    var key;
    derive(form.password.value).then(function (k) { key = k; return open(k); }).then(function () {
      return crypto.subtle.exportKey('raw', key).then(function (raw) {
        var s = ''; new Uint8Array(raw).forEach(function (b) { s += String.fromCharCode(b); }); save(btoa(s)); unlock();
      });
    }).catch(function () { msg.textContent = 'That password is wrong.'; btn.disabled = false; form.password.select(); });
  });
})();
