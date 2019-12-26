const path = require("path");

module.exports = (_env, argv) => ({ // eslint-disable-line max-lines-per-function
  "devtool": false,
  "entry": {
    "serviceworker": path.resolve(__dirname, "src", "serviceworker.js"),
    "webworker": path.resolve(__dirname, "src", "webworker.js")
  },
  "module": {
    "rules": [
      {
        "enforce": "pre",
        "exclude": /node_modules/u,
        "loader": "eslint-loader",
        "options": {
          "configFile": path.resolve(__dirname, ".eslintrc.js"),
          "fix": true
        },
        "test": /\.m?js$/u
      }
    ]
  },
  "optimization": {
    "chunkIds": "named",
    "moduleIds": "hashed",
    "runtimeChunk": {
      "name": "webworker.vendors"
    },
    "splitChunks": {
      "cacheGroups": {
        "webworker.vendors": {
          "chunks": "all",
          "name": "webworker.vendors",
          "test": /node_modules/u
        }
      }
    }
  },
  "output": {
    "filename": `[name].${argv.mode}.[chunkhash].js`,
    "libraryTarget": "umd",
    "path": path.resolve(__dirname, "dist")
  },
  "resolve": {
    "extensions": [".js", ".json", ".mjs"]
  },
  "target": "webworker"
});
