if (typeof idb === "undefined") {
  self.importScripts("js/idb/idb.js");
}

self.importScripts("js/idb/utility.js");

const cacheName = "v8";

const cacheAssets = [
  "index.html",
  "restaurant.html",
  "/css/styles.css",
  "/css/responsive.css",
  "/js/main.js",
  "/js/restaurant_info.js",
  "/js/dbhelper.js"
];

// Call install event

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(cacheAssets);
    })
  );
});

// Call Activate Event

self.addEventListener("activate", event => {
  // Remove unwanted caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cache => cache !== cacheName)
          .map(cacheNamesToDelete => caches.delete(cacheNamesToDelete))
      );
    })
  );
});

// Call Fetch Event
self.addEventListener("fetch", event => {
  const port = 1337;
  const url = `http://localhost:${port}/restaurants`;

  if (event.request.url.indexOf(url) > -1) {
    event.respondWith(
      fetch(event.request).then(res => {
        const clonedRes = res.clone();
        clonedRes.json().then(data => {
          data.forEach(restObj => {
            writeData("restaurants", restObj);
          });
        });
        return res;
      })
    );
  } else {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          // Make Copy/Clone
          const resClone = res.clone();
          caches.open(cacheName).then(cache => {
            // Add Response To Cache
            cache.put(event.request, resClone);
          });
          return res;
        })
        .catch(err => caches.match(event.request).then(res => res))
    );
  }
});
