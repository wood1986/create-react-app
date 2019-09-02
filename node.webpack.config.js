const path = require("path"),
      webpack = require("webpack");

module.exports = (env, argv) => { // eslint-disable-line max-lines-per-function
  const PROD = argv.mode === "production";

  return {
    "devServer": {
      "host": "0.0.0.0",
      "open": true,
      "useLocalIp": true
    },
    "devtool": false,
    "entry": {
      "node.index": path.resolve(__dirname, "src", "node.index.jsx")
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
          "test": /\.jsx?$/u
        },
        {
          "exclude": /node_modules/u,
          "test": /\.jsx?$/u,
          "use": [
            {
              "loader": "babel-loader",
              "options": {
                "plugins": [
                  "@babel/plugin-syntax-dynamic-import",
                  ["babel-plugin-styled-components", {"displayName": !PROD}]
                ].concat(PROD ? [["transform-react-remove-prop-types", {"removeImport": true}]] : []),
                "presets": ["@babel/preset-react"]
              }
            }
          ]
        }
      ]
    },
    "output": {
      "filename": "[name].js",
      "libraryTarget": "umd",
      "path": path.resolve(__dirname, "dist")
    },
    "plugins": [
      new webpack.DefinePlugin({
        // eslint-disable-next-line global-require
      })
    ],
    "resolve": {
      "extensions": [".js", ".json", ".jsx", ".mjs"]
    },
    "target": "node"
  };
};
