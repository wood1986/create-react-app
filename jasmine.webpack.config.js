const path = require("path"),
      HtmlWebpackPlugin = require("html-webpack-plugin"),
      CleanWebpackPlugin = require("clean-webpack-plugin"),
      CopyPlugin = require('copy-webpack-plugin'),
      fg = require("fast-glob"),
      webpack = require("webpack");

module.exports = (env, argv) => {  // eslint-disable-line max-lines-per-function
  const PROD = argv.mode === "production",
        specs = fg.sync(["./**/*.spec.{js,jsx}"], {"ignore": ["node_modules", "dist"]}),
        entries = specs.reduce(
          (specs, spec) => { // eslint-disable-line no-shadow
            specs[path.basename(spec, path.extname(spec))] = [ // eslint-disable-line newline-per-chained-call
              "jasmine-core/lib/jasmine-core/jasmine-html.js",
              "jasmine-core/lib/jasmine-core/boot.js",
              path.resolve(__dirname, spec)
            ];
            return specs;
          },
          {}
        );

  return {
    "devServer": {
      "compress": true,
      "host": "0.0.0.0",
      "open": true,
      "useLocalIp": true
    },
    "devtool": false,
    "entry": entries,
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
                "plugins": ["@babel/plugin-syntax-dynamic-import", ["babel-plugin-styled-components", {"displayName": !PROD}]].concat(PROD ? [["transform-react-remove-prop-types", {"removeImport": true}]]: []),
                "presets": ["@babel/preset-react"]
              }
            }
          ]
        }
      ]
    },
    "optimization": {
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
      "filename": "[name].[chunkhash].js",
      "libraryTarget": "umd",
      "path": path.resolve(__dirname, "dist/jasmine")
    },
    "plugins": [
      new CleanWebpackPlugin(),
      new webpack.ProvidePlugin({"jasmineRequire": "jasmine-core/lib/jasmine-core/jasmine.js"}),
      new CopyPlugin([
        { "from": require.resolve("jasmine-core/lib/jasmine-core/jasmine.css") }
      ]),
      new HtmlWebpackPlugin({
        "favicon": require.resolve("jasmine-core/images/jasmine_favicon.png"),
        "filename": "index.html",
        "minify": {
          "collapseWhitespace": PROD,
          "removeComments": PROD
        },
        "template": path.resolve(__dirname, "index.spec.ejs")
      })
    ],
    "target": "web"
  };
};
