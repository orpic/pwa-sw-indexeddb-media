var deferrredPrompt;

// check service worker featuer available or not

if ("serviceWorker" in navigator) {
  // register as a service worker
  navigator.serviceWorker
    .register("/sw.js", {
      scope: "/",
      // higher scope doubt
    })
    .then(() => {
      return console.log("Service worker registered");
    });
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferrredPrompt = event;
  console.log("prompt prevent");
  return false;
});


