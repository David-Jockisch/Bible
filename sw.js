self.addEventListener('install', function(event) {
//add comment bracket under this line 


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


//add comment bracket above this line
});
self.addEventListener('fetch', function(event) {
//add comment bracket under this line 


  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );


//add comment bracket above this line
  
  event.respondWith(fetch(event.request));

});
