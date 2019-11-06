/* eslint-disable no-underscore-dangle */
const app = require("./node.index");
globalThis.__SANDBOX_PROMISE__ = app.default(globalThis.__SANDBOX_REQ__);
