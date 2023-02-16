// refererring to service worker with self
// no dom access to sw

self.addEventListener("install", (event) => {
  console.log("Install event", event);
});

self.addEventListener("activate", (event) => {
  console.log("Activate event", event);

  return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // console.log("Fetch event triggered", event)
  event.respondWith(fetch(event.request));
});
