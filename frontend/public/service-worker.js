self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('vite-pwa-cache').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/src/main.jsx',
        '/icons/icon-192x192.png',
        '/icons/icon-512x512.png',
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
