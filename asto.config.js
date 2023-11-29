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

const repos = {
  zept: repo('zept'),
  http: repo('http'),
  path: repo('path'),
};

module.exports = [
  {
    // core packages
    loader: esbuild,

    entryPoints: [
      repos.zept('index.ts', 'index.js'),
      repos.http('index.ts', 'index.js'),
      repos.path('index.ts', 'index.js'),
      repos.zept('index.ts', 'index.mjs', { format: 'esm' }),
      repos.http('index.ts', 'index.mjs', { format: 'esm' }),
      repos.path('index.ts', 'index.mjs', { format: 'esm' }),
    ],
  },
];
