// Immediate activation: no waiting, no caching.
// Safe for stateless, hash-based architecture.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});
