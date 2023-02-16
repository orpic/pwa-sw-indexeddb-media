// refererring to service worker with self
// no dom access to sw

self.addEventListener("install", (event) => {
  console.log("Install event", event);

  //refer to cache api, creating an open api
  event.waitUntil(
    caches.open("static").then((cache) => {
      console.log("[Service Worker] Pre-cache..ing app.js ");
      //  cache..ing requests and initial request is root ( "/" )
      // only needed on browsers that dont support service worke
      // only loading here cause of performance reasons.
      // can cache third party as well (they should have cors allow)

      cache.addAll([
        "/",
        "/index.html",
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

self.addEventListener("activate", (event) => {
  console.log("Activate event", event);

  return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // console.log("Fetch event triggered", event)
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      } else {
        return fetch(event.request);
      }
    })
  );
});
