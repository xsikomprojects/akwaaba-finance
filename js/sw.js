// ============================================
// AKWAABA FINANCE – Service Worker
// Mit XsiKOM-DIGITAL-Projects
// ============================================

var CACHE_NAME = 'akwaaba-v3';
var urlsToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/app.js',
    '/manifest.json'
];

// === INSTALL ===
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('✅ Cache geöffnet');
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting();
});

// === ACTIVATE ===
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(namen) {
            return Promise.all(
                namen.filter(function(name) {
                    return name !== CACHE_NAME;
                }).map(function(name) {
                    return caches.delete(name);
                })
            );
        })
    );
    self.clients.claim();
});

// === FETCH (Offline) ===
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) return response;
            return fetch(event.request).then(function(response) {
                if (!response || response.status !== 200) return response;
                var responseKopie = response.clone();
                caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(event.request, responseKopie);
                });
                return response;
            });
        }).catch(function() {
            return caches.match('/index.html');
        })
    );
});

// === PUSH NOTIFICATIONS ===
self.addEventListener('push', function(event) {
    var daten = {
        titel: 'AKWAABA Finance 🇹🇬',
        body: 'Neue Quantum AI Marktanalyse verfügbar!',
        icon: '/images/icon-192.png',
        badge: '/images/badge.png'
    };

    if (event.data) {
        try {
            daten = event.data.json();
        } catch(e) {
            daten.body = event.data.text();
        }
    }

    var optionen = {
        body: daten.body,
        icon: daten.icon || '/images/icon-192.png',
        badge: daten.badge,
        vibrate: [200, 100, 200],
        data: { url: '/' },
        actions: [
            { action: 'oeffnen', title: '📊 App öffnen' },
            { action: 'schliessen', title: '✕ Schließen' }
        ],
        tag: 'akwaaba-notification',
        requireInteraction: false
    };

    event.waitUntil(
        self.registration.showNotification(daten.titel, optionen)
    );
});

// === NOTIFICATION CLICK ===
self.addEventListener('notificationclick', function(event) {
    event.notification.close();

    if (event.action === 'schliessen') return;

    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(function(clientListe) {
            for (var i = 0; i < clientListe.length; i++) {
                if (clientListe[i].url === '/' && 'focus' in clientListe[i]) {
                    return clientListe[i].focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});

// === BACKGROUND SYNC ===
self.addEventListener('sync', function(event) {
    if (event.tag === 'markt-update') {
        event.waitUntil(marktUpdateSenden());
    }
});

function marktUpdateSenden() {
    return self.registration.showNotification('⚛️ AKWAABA Quantum Update', {
        body: 'Marktanalyse aktualisiert! Neue Signale verfügbar.',
        icon: '/images/icon-192.png',
        vibrate: [100, 50, 100],
        tag: 'markt-update'
    });
}