import WebWorker from "worker-loader!./web-worker?name=web-worker";

new WebWorker().addEventListener("message", console.log);
