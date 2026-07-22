const CACHE_NAME = 'akwaaba-finance-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/js/app.js',
    '/js/calculator.js',
    '/js/quantum-engine.js',
    '/js/translations.js',
    '/manifest.json'
];

// Install
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('⚛️ AKWAABA Cache opened');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) return response;
                return fetch(event.request)
                    .then(response => {
                        if (!response || response.status !== 200) return response;
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => cache.put(event.request, responseToCache));
                        return response;
                    });
            })
            .catch(() => {
                return caches.match('/index.html');
            })
    );
});

// Activate
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(names => {
            return Promise.all(
                names.filter(name => name !== CACHE_NAME)
                     .map(name => caches.delete(name))
            );
        })
    );
});