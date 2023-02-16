// refererring to service worker with self
// no dom access to sw

var CACHE_STATIC_NAME = "static-v10";
var CACHE_DYNAMIC_NAME = "dynamic-v3";

self.addEventListener("install", (event) => {
  console.log("Install event", event);

  //refer to cache api, creating an open api
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME).then((cache) => {
      console.log("[Service Worker] Pre-cache..ing app.js ");
      //  cache..ing requests and initial request is root ( "/" )
      // only needed on browsers that dont support service worke
      // only loading here cause of performance reasons.
      // can cache third party as well (they should have cors allow)

      cache.addAll([
        "/",
        "/index.html",
        "/offline.html",
        "/src/js/app.js",
        "/src/js/feed.js",
        "/src/js/promise.js",
        "/src/js/fetch.js",
        "/src/js/material.min.js",
        "/src/css/app.css",
        "/src/css/feed.css",
        "/src/images/main-image.jpg",
        "https://fonts.googleapis.com/css?family=Roboto:400,700",
        "https://fonts.googleapis.com/icon?family=Material+Icons",
        "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css",
      ]);

      //   cache.add("/");
      //   cache.add("/index.html");
      //   cache.add("/src/js/app.js");
    })
  );
});

//cleaning old cache only when the new service worker has activated
self.addEventListener("activate", (event) => {
  console.log("Activate event", event);
  //cleanup
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log("[Service Worker] : Removinff old cache");
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // console.log("Fetch event triggered", event)
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      } else {
        return fetch(event.request)
          .then((res) => {
            // return necessary because giving back reponse to dom is necessary
            return caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
              // response data is supposed to be consumed once only,
              // therefore we create an exact clone out of it and
              // let original be returned

              // temporarily turn off dynamic caching to simulate
              // saving on a user onClick event outside of service worker

              cache.put(event.request.url, res.clone());

              return res;
            });
          })
          .catch((err) => {
            // TODO - Handle errors if any

            return caches.open(CACHE_STATIC_NAME).then((cache) => {
              return cache.match("/offline.html");
            });
          });
      }
    })
  );
});
