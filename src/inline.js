import WebWorker from "worker-loader!./web-worker";

new WebWorker().addEventListener("message", console.log);
