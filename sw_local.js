var cacheName = 'v3';

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/index.js',
                '/style.css',
                '/jquery.csv.js'
                ]);
        })
    );
});

self.addEventListener('message', function (event) {
    if (event.data.action === 'skipWaiting') {
      self.skipWaiting();
    }
  });
   
self.addEventListener('fetch', function(e) {
    console.log(e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});