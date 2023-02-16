var deferrredPrompt;

// check borwser supports promises, if not then assign polyfils
if (!window.Promise) {
  window.Promise = Promise;
}

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
    })
    .catch((err) => {
      console.log(err);
    });
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferrredPrompt = event;
  console.log("prompt prevent");
  return false;
});
