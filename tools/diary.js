// Encrypts the food diary so the public repository holds only ciphertext.
// Usage: DIARY_PASSWORD=... node tools/diary.js path/to/food-diary.json
// Writes src/diary.enc.json. Never commit the plain diary.
const fs = require('fs');
const path = require('path');
const { webcrypto: crypto } = require('crypto');
const ITER = 600000;
(async () => {
  const pw = process.env.DIARY_PASSWORD;
  const src = process.argv[2];
  if (!pw || !src) { console.error('Set DIARY_PASSWORD and give the plain diary file.'); process.exit(1); }
  const plain = JSON.stringify(JSON.parse(fs.readFileSync(src, 'utf8')));
  const salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
  const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: ITER, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt']);
  const data = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(plain)));
  const b64 = a => Buffer.from(a).toString('base64');
  fs.writeFileSync(path.join(__dirname, '..', 'src', 'diary.enc.json'), JSON.stringify({ iter: ITER, salt: b64(salt), iv: b64(iv), data: b64(data) }) + '\n');
  console.log('Encrypted ' + JSON.parse(plain).days.length + ' diary days into src/diary.enc.json');
})();
