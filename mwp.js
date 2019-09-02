/* eslint-disable global-require */
const webpack = require("webpack"),
      yargs = require("yargs"),
      convertArgv = require("webpack-cli/bin/utils/convert-argv");

require("webpack-cli/bin/config/config-yargs")(yargs);

// eslint-disable-next-line max-params, max-statements
const prepareWebpack = (argv, config, target, stats = null) => {
  if (Array.isArray(require(config[target]))) {
    throw Promise.reject(new Error(""));
  }

  // eslint-disable-next-line no-param-reassign
  argv = {...argv};
  argv.config = config[target];
  argv.target = target;
  argv.env = {...argv.env};
  if (stats) {
    argv.env.stats = stats;
  }

  console.log(stats);

  const options = convertArgv(argv);
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-shadow
    webpack(options, (err, stats) => err ? reject(err) : resolve(stats));
  });
};

// eslint-disable-next-line no-magic-numbers
yargs.parse(process.argv.slice(2), (_err, argv) => {
  const config = require(argv.config);

  return [
    () => prepareWebpack(argv, config, "web"),
    (stats) => Promise.all([
      prepareWebpack(argv, config, "node", stats),
      ...(config.webworker || []).map((webworker) => prepareWebpack(argv, webworker, "webworker", stats))
    ])
  ].reduce((promise, item) => promise.then(item), Promise.resolve());
});

