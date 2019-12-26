import Entry from "webpack-loader!./webworker.webpack.config.js";

new Worker(Entry.webworker).addEventListener("message", console.log);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(Entry.serviceworker).then((registration) => {
      // Registration was successful
      console.log("ServiceWorker registration successful with scope: ", registration.scope);
    }, (err) => {
      // registration failed :(
      console.log("ServiceWorker registration failed: ", err);
    });
  });
}
