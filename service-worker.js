var CACHE_NAME = 'letssnap-final';
var DATA_CACHE_NAME = 'letssnap-data-final';
var urlsToCache = [
  '/',
  '/node_modules/lodash/lodash.min.js',
  '/node_modules/moment/moment.js',
  '/src/',
  '/manifest.json',
  '/images/',
  '/bootstrap.min.css',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  var backendUrl = 'https://s3-ap-southeast-1.amazonaws.com/letssnap';
  var groupsUrl = 'https://www.letssnap-backend.tk/groups';
  if (navigator.onLine && (event.request.url.indexOf(backendUrl) > -1 || event.request.url.indexOf(groupsUrl) > -1)) {
    event.respondWith(
      caches.open(DATA_CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response){
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }

          // IMPORTANT: Clone the request. A request is a stream and
          // can only be consumed once. Since we are consuming this
          // once by cache and once by the browser for fetch, we need
          // to clone the response.
          var fetchRequest = event.request.clone();

          return fetch(fetchRequest).then(
            function(response) {
              // Check if we received a valid response
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              // IMPORTANT: Clone the response. A response is a stream
              // and because we want the browser to consume the response
              // as well as the cache consuming the response, we need
              // to clone it so we have two streams.
              var responseToCache = response.clone();

              caches.open(CACHE_NAME)
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });

              return response;
            }
          );
        })
    );
  }
});