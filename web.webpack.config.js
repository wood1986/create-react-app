const path = require("path"),
      HtmlWebpackPlugin = require("html-webpack-plugin"),
      {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer"),
      {CleanWebpackPlugin} = require("clean-webpack-plugin"),
      TerserPlugin = require("terser-webpack-plugin"),
      SplitChunksPlugin = require("webpack/lib/optimize/SplitChunksPlugin"),
      ManifestPlugin = require("webpack-manifest-plugin");

module.exports = (_env, argv) => { // eslint-disable-line max-lines-per-function
  const PROD = argv.mode === "production";

  return {
    "devServer": {
      "open": true,
      "openPage": ["index.context.html", "index.redux.html"],
      "writeToDisk": true
    },
    "devtool": false,
    "entry": {
      "app.context": path.resolve(__dirname, "src", "context", "web.index.jsx"),
      "app.redux": path.resolve(__dirname, "src", "redux", "web.index.jsx"),
      "inline": path.resolve(__dirname, "src", "inline")
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
                "plugins": ["@babel/plugin-syntax-dynamic-import", ["babel-plugin-styled-components", {"displayName": !PROD}]].concat(PROD ? [["transform-react-remove-prop-types", {"removeImport": true}]] : []),
                "presets": ["@babel/preset-react"]
              }
            }
          ]
        }
      ]
    },
    "optimization": {
      "chunkIds": "named",
      "minimizer": PROD
        ? [
          new TerserPlugin({
            "terserOptions": {
              "mangle": false,
              "output": {
                "comments": false
              }
            }
          })
        ]
        : [],
      "moduleIds": "hashed",
      "runtimeChunk": {
        "name": (entrypoint) => entrypoint.name === "inline" ? `${entrypoint.name}` : "vendors"
      },
      "splitChunks": {
        "cacheGroups": {
          "vendors": {
            "chunks": "all",
            "name": "vendors",
            "test": (module, chunks) => chunks.findIndex((chunk) => chunk.name === "inline") === -1 &&
              SplitChunksPlugin.checkTest(/node_modules/u, module)
          }
        }
      }
    },
    "output": {
      "filename": `[name].${argv.mode}.[chunkhash].js`,
      "libraryTarget": "umd",
      "path": path.resolve(__dirname, "dist")
    },
    "plugins": [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        "excludeChunks": ["inline", "app.context"],
        "filename": "index.redux.html",
        "template": path.resolve(__dirname, "src", "index.ejs")
      }),
      new HtmlWebpackPlugin({
        "excludeChunks": ["inline", "app.redux"],
        "filename": "index.context.html",
        "template": path.resolve(__dirname, "src", "index.ejs")
      }),
      new ManifestPlugin(),
      new BundleAnalyzerPlugin({
        "analyzerMode": "static",
        "openAnalyzer": false
      })
    ],
    "resolve": {
      "extensions": [".js", ".json", ".jsx", ".mjs"]
    },
    "target": "web"
  };
};
