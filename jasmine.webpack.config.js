const path = require("path"),
      HtmlWebpackPlugin = require("html-webpack-plugin"),
      CleanWebpackPlugin = require("clean-webpack-plugin"),
      glob = require("glob"),
      webpack = require("webpack");

module.exports = (env, argv) => {  // eslint-disable-line max-lines-per-function
  const DEBUG = argv.mode !== "production",
        specs = glob.sync("./**/*.spec.{js,jsx}", {"ignore": ["./node_modules/**", "./dist/**"]}),
        entries = specs.reduce(
          (specs, spec) => { // eslint-disable-line no-shadow
            specs[`${path.dirname(spec)}/${path.basename(spec).split(".").slice(0, -1).join(".")}`] = [ // eslint-disable-line newline-per-chained-call
              "jasmine-core/lib/jasmine-core/jasmine-html.js",
              "jasmine-core/lib/jasmine-core/boot.js",
              "jasmine-core/lib/jasmine-core/jasmine.css",
              spec
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
          "test": /\.css$/u,
          "use": [{"loader": "style-loader"}, {"loader": "css-loader"}]
        },
        {
          "exclude": /node_modules/u,
          "test": /\.jsx?$/u,
          "use": [
            {
              "loader": "babel-loader",
              "options": {
                "plugins": ["@babel/plugin-syntax-dynamic-import", ["babel-plugin-styled-components", {"displayName": DEBUG}]].concat(DEBUG ? [] : [["transform-react-remove-prop-types", {"removeImport": true}]]),
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
      new webpack.ProvidePlugin({"jasmineRequire": "jasmine-core/lib/jasmine-core/jasmine.js"}),
      new CleanWebpackPlugin(["dist/jasmine"]),
      new webpack.DefinePlugin({
        "DEBUG": JSON.stringify(DEBUG)
      }),
      new HtmlWebpackPlugin({
        "favicon": require.resolve("jasmine-core/images/jasmine_favicon.png"),
        "filename": "index.html",
        "minify": {
          "collapseWhitespace": !DEBUG,
          "removeComments": !DEBUG
        }
      })
    ],
    "target": "web"
  };
};
