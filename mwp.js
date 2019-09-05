/* eslint-disable global-require */
const webpack = require("webpack"),
      yargs = require("yargs"),
      convertArgv = require("webpack-cli/bin/utils/convert-argv");

require("webpack-cli/bin/config/config-yargs")(yargs);

// eslint-disable-next-line max-params, max-statements
const prepareWebpack = (argv, config, stats = null) => {
  if (Array.isArray(require(config))) {
    throw new Error("Multi configs/compilers are not supported.");
  }

  // eslint-disable-next-line no-param-reassign
  argv = {...argv};
  argv.config = config;
  argv.env = {...argv.env};
  if (stats) {
    argv.env.stats = stats;
  }

  // stats && stats.compilation && stats.compilation.chunkGroups);

  const options = convertArgv(argv);
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-shadow
    webpack(options, (err, stats) => {
      console.log(stats.toString({"colors": true}));
      return err ? reject(err) : resolve(stats);
    });
  });
};

// eslint-disable-next-line no-magic-numbers
yargs.parse(process.argv.slice(2), (_err, argv) => {
  const config = require(argv.config);

  return [
    () => prepareWebpack(argv, config.parent),
    // eslint-disable-next-line no-shadow
    (stats) => {
      const chunkGroups = stats.compilation.chunkGroups.reduce((acc, chunkGroup) => {
        chunkGroup.chunks.forEach((chunk) => {
          // eslint-disable-next-line prefer-destructuring
          acc[chunk.name || chunk.id] = chunk.files[0];
        });

        return acc;
      }, {});

      // eslint-disable-next-line no-shadow
      return Promise.all((config.children || []).map((config) => prepareWebpack(argv, config, chunkGroups)));
    }
  ].reduce((promise, item) => promise.then(item), Promise.resolve());
});

