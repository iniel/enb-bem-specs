var builder = require('./builder');
var runner = require('./spec-runner');
var configurator = require('./node-configurator');

module.exports = function (maker) {
    return {
        build: function (options) {
            options || (options = {});
            options.sourceLevels || (options.sourceLevels = options.levels);
            options.fileSuffixes || (options.fileSuffixes = ['spec.js']);
            options.bundleSuffixes || (options.bundleSuffixes = ['specs']);

            var resolve = builder(options);
            var config = maker._config;
            var cdir = config._rootPath;

            configurator.configure(config, options);

            maker._pseudoLevels.push({
                destPath: options.destPath,
                levels: options.levels,
                resolve: resolve
            });

            return maker._deferred.promise()
                .then(function (targets) {
                    return runner.run(targets, cdir);
                });
        }
    };
};