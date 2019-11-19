
const filesToCache = [
  // '/',
  'style/main.css',
  'index.html',
  'ind.html',
  'http://192.168.2.250:5000/json_formatter',
  'http://192.168.2.250:5000/get_img'
];

const staticCacheName = 'pages-cache-v1';

self.addEventListener('install', event => {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      console.log("cc");
      
      return cache.addAll(filesToCache);
    })
    
  );
});



self.addEventListener('fetch', event => {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)

      .then(response => {
        // TODO 5 - Respond with custom 404 page
        return caches.open(staticCacheName).then(cache => {
          cache.put(event.request.url, response.clone());
          console.log("loyees");
          return response;
        });
      });

    }).catch(error => {

      // TODO 6 - Respond with custom offline page

    })
  );
});