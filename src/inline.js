console.log("111");

import Worker from "./web-worker";

const worker = new Worker();

// eslint-disable-next-line no-empty-function
worker.addEventListener("message", console.log);
