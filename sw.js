var cacheName = 'v3';

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll([
                '/alberta-trip-2022/',
                '/alberta-trip-2022/index.html',
                '/alberta-trip-2022/index.js',
                '/alberta-trip-2022/style.css',
                '/alberta-trip-2022/jquery.csv.js'
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