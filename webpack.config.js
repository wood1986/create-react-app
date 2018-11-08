const fs = require("fs")
const path = require("path")
const CompressionPlugin = require("compression-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer")
const webpack = require("webpack")
const DEBUG = require("yargs").argv.mode !== "production" // eslint-disable-line global-require

module.exports = {
  "devServer": {
    "clientLogLevel": "error",
    "compress": true,
    "host": "0.0.0.0",
    "https": true,
    "open": true
  },
  "devtool": DEBUG ? "inline-source-map" : false,
  "entry": {
    "index": path.resolve(__dirname, "example/index/index.web.jsx"),
    // "index.spec": path.resolve(__dirname, "example/index/index.spec.web.js"),
  },
  "module": {
    "rules": [
      {
        "enforce": "pre",
        "exclude": /node_modules/,
        "loader": "eslint-loader",
        "options": {
          "configFile": path.join(__dirname, ".eslintrc.js"),
          "fix": true
        },
        "test": /\.jsx?$/
      },
      {
        "exclude": /node_modules/,
        "test": /\.jsx?$/,
        "use": [
          {
            "loader": "babel-loader",
            "options": {
              "plugins": [
                "babel-plugin-syntax-dynamic-import",
                [
                  "babel-plugin-styled-components",
                  {"displayName": DEBUG}
                ]
              ].concat(DEBUG ? [] : [
                [
                  "transform-react-remove-prop-types",
                  {"removeImport": true}
                ]
              ]),
              "presets": ["@babel/react"]
            }
          }
        ]
      }
    ]
  },
  "optimization": {
    "splitChunks": {
      "cacheGroups": {
        "commons": {
          "chunks": "all",
          "test": /[\\/]node_modules[\\/]/
        }
      }
    }
  },
  "output": {
    "filename": "[name]-[chunkhash].js",
    "libraryTarget": "umd",
    "path": path.resolve(__dirname, `dist/web/${DEBUG ? "debug" : "release"}`)
  },
  "plugins": [
    new webpack.ProvidePlugin({"jasmineRequire": "jasmine-core/lib/jasmine-core/jasmine.js"}),
    new webpack.DefinePlugin({"DEBUG": JSON.stringify(DEBUG)}),
    new HtmlWebpackPlugin({
      "filename": "index.html",
      "minify": {
        "collapseWhitespace": !DEBUG,
        "removeComments": !DEBUG
      },
      "template": path.resolve(__dirname, "example/index/index.web.ejs")
    }),
    new BundleAnalyzerPlugin({
      "analyzerMode": "static",
      "openAnalyzer": false
    })
  ].concat(DEBUG ? [] : [new CompressionPlugin()]),
  "resolve": {"alias": {"tetris/libs": path.resolve(__dirname, "src/components")}},
  "resolveLoader": {"alias": {"tetris/loaders": path.resolve(__dirname, "src/loaders")}},
  "target": "web"
}
