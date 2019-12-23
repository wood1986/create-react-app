console.log("111");

import Worker from "./web-worker";
import runtime from "serviceworker-webpack-plugin/lib/runtime";

const worker = new Worker();
console.log(Worker);
// eslint-disable-next-line no-empty-function
worker.addEventListener("message", console.log);

if ("serviceWorker" in navigator) {
  runtime.register();
}
