const path = require("path");

module.exports = {
  "node": path.resolve(__dirname, "node.webpack.config.js"),
  "web": path.resolve(__dirname, "web.webpack.config.js"),
  // "webworker": [
  //   path.join(__dirname, "sw.webpack.config.js"),
  //   path.join(__dirname, "ww.webpack.config.js")
  // ]
};
