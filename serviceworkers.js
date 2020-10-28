var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    '/',
    '/fonts',
    '/images',
    '/js',
    '/plugins',
    '/styles',
];

// installing service worker
self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function (cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// Aktivasi service worker
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter((cacheNames) => {
                    return cacheName !== CHACE_NAME
                }).map((cacheName) => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});