const path = require("path"),
      HtmlWebpackPlugin = require("html-webpack-plugin"),
      {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer"),
      {CleanWebpackPlugin} = require("clean-webpack-plugin"),
      TerserPlugin = require("terser-webpack-plugin"),
      SplitChunksPlugin = require("webpack/lib/optimize/SplitChunksPlugin"),
      ManifestPlugin = require("webpack-manifest-plugin");

console.log(SplitChunksPlugin);

module.exports = (_env, argv) => { // eslint-disable-line max-lines-per-function
  const PROD = argv.mode === "production";

  return {
    "devServer": {
      "host": "0.0.0.0",
      "open": true,
      "writeToDisk": true
    },
    "devtool": false,
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
        },
        {
          "exclude": /node_modules/u,
          "test": /\worker\.js$/u,
          "use": {
            "loader": "worker-loader",
            "options": {
              "name": `[name].${argv.mode}.[chunkhash].js`
            }
          }
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
            "test": (module, chunks) => {
              const flag = chunks.findIndex((chunk) => chunk.name === "inline") === -1 &&
                SplitChunksPlugin.checkTest(/node_modules/u, module);
              console.log(module.rawRequest, flag);
              return flag;
            }
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
        "excludeChunks": ["inline"],
        "filename": "index.html",
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
