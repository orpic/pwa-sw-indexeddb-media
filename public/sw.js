// refererring to service worker with self
// no dom access to sw

self.addEventListener("install", (event) => {
  console.log("Install event", event);

  //refer to cache api, creating an open api
  event.waitUntil(
    caches.open("static").then((cache) => {
      console.log("[Service Worker] Pre-cache..ing app.js ");
      //  cache..ing requests and initial request is root ( "/" )
      cache.add("/");
      cache.add("/index.html");
      cache.add("/src/js/app.js");
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
