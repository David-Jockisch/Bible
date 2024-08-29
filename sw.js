// Install event: Comment out caching logic for development
self.addEventListener('install', function(event) {
  // Commented out caching for development
  
  event.waitUntil(
    caches.open('proverbs-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/icons/icon-192x192.png',
        '/icons/icon-512x512.png'
      ]);
    })
  );

});

// Fetch event: Comment out caching logic for development
self.addEventListener('fetch', function(event) {
  // Commented out caching logic for development
  
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
  
  
  // Always fetch from the network
  event.respondWith(fetch(event.request));
});
