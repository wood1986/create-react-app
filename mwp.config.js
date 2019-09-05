const path = require("path");

module.exports = {
  "children": [path.resolve(__dirname, "node.webpack.config.js")],
  "parent": path.resolve(__dirname, "web.webpack.config.js")
};
