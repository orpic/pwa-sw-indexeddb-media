// refererring to service worker with self
// no dom access to sw

self.addEventListener("install", (event) => {
  console.log("Install event", event);

  //refer to cache api, creating an open api
  event.waitUntil(
    caches.open("static").then((cache) => {
      console.log("[Service Worker] Pre-cache..ing app.js ");
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
  event.respondWith(fetch(event.request));
});
