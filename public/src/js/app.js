// check service worker featuer available or not

if ("serviceWorker" in navigator) {
    // register as a service worker 
    navigator.serviceWorker.register("/sw.js").then(() => {
        return console.log("Service worker registered")
    })
}