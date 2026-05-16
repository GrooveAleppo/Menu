const CACHE_NAME = 'groove-v1';
const ASSETS = [
  './',
  './index.html',
  './settings.html',
  './tailwindcss.js',
  './lucide_icons.js',
  './assets/logo.png',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
