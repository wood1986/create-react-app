const path = require("path"),
      HtmlWebpackPlugin = require("html-webpack-plugin"),
      {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer"),
      {CleanWebpackPlugin} = require("clean-webpack-plugin"),
      TerserPlugin = require("terser-webpack-plugin"),
      ManifestPlugin = require("webpack-manifest-plugin");

module.exports = (env, argv) => {  // eslint-disable-line max-lines-per-function
  const PROD = argv.mode === "production";

  return {
    "devServer": {
      "host": "0.0.0.0",
      "open": true,
      "useLocalIp": true
    },
    "devtool": false,
    "entry": {
      "web.index": path.resolve(__dirname, "src", "web.index.jsx")
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
      "runtimeChunk": {
        "name": "vendors"
      },
      "splitChunks": {
        "cacheGroups": {
          "vendors": {
            "chunks": "all",
            "name": "vendors",
            "test": /[\\/]node_modules[\\/]/u
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
      new HtmlWebpackPlugin(),
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
