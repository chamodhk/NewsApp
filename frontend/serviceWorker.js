// this is a service worker 
const CACHE_NAME = "newsapp-cache-v2";

const pathsToCache = [
    "/",
    "/style.css",
    "/app.js"
];


self.addEventListener("install", event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(pathsToCache)));

    });


self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );}))});

self.addEventListener("fetch", event => {
    if (event.request.url.includes("/api/news")) {
        event.respondWith(
            fetch(event.request) 
                .then(response => {
                    const responseCopy = response.clone();

                    const cachingPromise = caches.open(CACHE_NAME)
                        .then(cache => {
                            return cache.put(event.request, responseCopy);
                        });

                    event.waitUntil(cachingPromise);

                    return response;
                })
                .catch(() => {
                    return caches.match(event.request);
                })
        );
    } else {
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    return response || fetch(event.request) ; 
                })
        );
    }
            });