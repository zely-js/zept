const { nodeExternalsPlugin } = require('esbuild-node-externals');
const esbuild = require('./asto.esbuild');

const repo =
  (name) =>
  (input, output, opts = {}) => ({
    input: `packages/${name}/src/${input}`,
    output: `packages/${name}/dist/${output}`,
    options: {
      ...opts,
      plugins: nodeExternalsPlugin({
        packagePath: `packages/${name}/package.json`,
        devDependencies: true,
      }),
    },
  });

const core =
  (name) =>
  (input, output, opts = {}) => ({
    input: `${name}/src/${input}`,
    output: `${name}/dist/${output}`,
    options: {
      ...opts,
      plugins: nodeExternalsPlugin({
        packagePath: `${name}/package.json`,
        devDependencies: true,
      }),
    },
  });

const repos = {
  app: core('app'),
};

module.exports = [
  {
    // core packages
    loader: esbuild,

    entryPoints: [repos.app('index.ts', 'index.js')],
  },
];
