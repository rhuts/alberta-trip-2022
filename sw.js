var cacheName = 'v3';

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll([
                '/usa-trip-2020/',
                '/usa-trip-2020/index.html',
                '/usa-trip-2020/index.js',
                '/usa-trip-2020/style.css',
                '/usa-trip-2020/jquery.csv.js'
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