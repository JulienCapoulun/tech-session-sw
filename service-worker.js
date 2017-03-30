var CACHE_ID = 'tech-session-v2';


var URLS_TO_CACHE = [
   'style.css',
   'js/jquery.scrollTo.min.js',
   'img/font-1.jpg'
]


/**
 * INSTALL
 */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_ID).then( cache => {
      cache.addAll(URLS_TO_CACHE).then( cached => {
        console.log('URLs bien mises en cache');
      })
      .catch( err => {
        console.log('Erreur lors de la mise en cache des URLs : ' + err);
      })
    }).catch( err => {
        console.log('Erreur lors de l\'ouverture de cache : ' + err);
    })
  )
})


/**
 * FETCH
 */
self.addEventListener('fetch', event => {
  if(event.request.method == 'GET'){
    //console.log('requête : ' + event.request.url);
    event.respondWith(
      caches.match(event.request).then( res => {
        if(res) console.log('cache utilisé pour : ' + event.request.url)
        return res || fetch(event.request);
      })
    )
  }
})

/**
 * ACTIVATE
 */
self.addEventListener('activate', function(event) {

  var cacheWhitelist = [CACHE_ID];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      console.log('Cache : ' + cacheNames);
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log("cache " + cacheName + " supprimé.")
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

 /**
  * SYNC
  */
self.addEventListener('sync', function(event) {
  self.registration.showNotification("Sync event fired!");
});