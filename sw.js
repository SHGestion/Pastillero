/* Pastillero — service worker: funciona sin conexión y maneja los toques en los avisos */
const CACHE = 'pastillero-v1';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png', './icon-maskable-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {
    // red primero (para recibir actualizaciones), caché si no hay conexión
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)); return r; })
      .catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const key = e.notification.data && e.notification.data.key;
  const type = e.action === 'take' ? 'take' : 'open';
  e.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    if (all.length) {
      const c = all[0];
      try { await c.focus(); } catch (_) {}
      if (key) c.postMessage({ type, key });
      return;
    }
    await self.clients.openWindow('./' + (key ? `?${type}=${encodeURIComponent(key)}` : ''));
  })());
});
