import Babili from 'babili-webpack-plugin';
import { dim, yellow } from 'chalk';
import Clean from 'clean-webpack-plugin';
import Copy from 'copy-webpack-plugin';
import ExtractText from 'extract-text-webpack-plugin';
import { emojify } from 'node-emoji';
import { resolve } from 'path';
import ProgressBar from 'progress-bar-webpack-plugin';
import StatsJson from 'stats-webpack-plugin';
import { DefinePlugin, optimize } from 'webpack';
import nodeModules from 'webpack-node-externals';
import Notify from 'webpack-notifier';

import './src/utils/env';

const { NODE_ENV = 'development' } = process.env;
const isDev = NODE_ENV === 'development';
const { CommonsChunkPlugin } = optimize;

console.log(yellow(emojify(`\n:building_construction:  ${NODE_ENV} build\n`))); // eslint-disable-line no-console

const buildConfig = ({ entry, type = 'server' }) => {
  const isServer = type === 'server';

  // `externals` settings for each config type
  const typeExternals = isServer ? [
    nodeModules({
      whitelist: ['sanitize.css'],
    }),
  ] : [];

  // `plugins` for each env
  const envPlugins = isDev ? [
    new Notify({
      alwaysNotify: true,
    }),
  ] : [
    new Babili(),
  ];

  // `plugins` for each config type
  const typePlugins = isServer ? [
    new Copy([
      {
        from: resolve(__dirname, 'src/router/express/views'),
        to: resolve(__dirname, 'build/server/router/express/views'),
      },
    ]),
  ] : [
    new CommonsChunkPlugin({
      filename: isDev ? '[name].js' : '[chunkhash].[hash].js',
      minChunks: module => module.context && module.context.indexOf('node_modules') !== -1,
      name: 'vendor',
    }),
    new CommonsChunkPlugin({
      filename: isDev ? '[name].js' : '[name].[hash].js',
      minChunks: Infinity,
      name: 'manifest',
    }),
    new DefinePlugin({
      'process.env': {
        BROWSER: !isServer,
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
    }),
    new StatsJson('../client-build-stats.json', {
      assets: true,
      assetsSort: 'field',
      cached: false,
      cachedAssets: false,
      children: false,
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      chunksSort: 'field',
      depth: false,
      entrypoints: false,
      errors: false,
      errorDetails: false,
      exclude: [],
      hash: true,
      maxModules: 15,
      modules: false,
      modulesSort: 'field',
      moduleTrace: false,
      performance: false,
      providedExports: false,
      publicPath: true,
      reasons: false,
      source: false,
      timings: false,
      usedExports: false,
      version: false,
      warnings: false,
    }),
  ];

  const envPostCSS = isDev ? [] : [
    /* eslint-disable global-require */
    require('cssnano')({
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
      }],
    }),
    /* eslint-enable global-require */
  ];

  // Merged config with defaults
  return {
    context: __dirname,
    devtool: isDev ? 'inline-source-map' : false,
    entry,
    externals: [...typeExternals],
    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          use: ExtractText.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: () => [
                    /* eslint-disable global-require */
                    ...envPostCSS,
                    require('postcss-cssnext')({
                      warnForDuplicates: false,
                    }),
                    /* eslint-enable global-require */
                  ],
                },
              },
              {
                loader: 'sass-loader',
              },
            ],
          }),
        },
        {
          exclude: resolve(__dirname, 'node_modules'),
          test: /\.(js|jsx)$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                forceEnv: isServer ? false : 'client',
              },
            },
          ],
        },
      ],
    },
    node: isServer ? false : {
      console: false,
      global: true,
      process: true,
      __filename: 'mock',
      __dirname: 'mock',
      Buffer: true,
      setImmediate: true,
    },
    output: {
      chunkFilename: isDev || isServer ? '[name].js' : '[chunkhash].[hash].js',
      filename: isDev || isServer ? '[name].js' : '[chunkhash].[hash].js',
      path: resolve(__dirname, isServer ? 'build/server' : 'build/assets'),
      publicPath: isServer ? '/' : '/assets',
    },
    plugins: [
      ...envPlugins,
      ...typePlugins,
      new Clean([isServer ? 'build/server' : 'build/client'], {
        root: __dirname,
      }),
      new ExtractText({
        allChunks: true,
        filename: isDev ? '../assets/style.css' : '../assets/[chunkhash].[hash].css',
      }),
      new ProgressBar({
        format: ':bar :percent :eta',
        incomplete: dim('░'),
        complete: '░',
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    stats: {
      assetsSort: 'size',
      children: false,
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      entrypoints: true,
      providedExports: true,
      maxModules: 0,
      modules: false,
    },
    target: isServer ? 'node' : 'web',
  };
};

export default [
  buildConfig({
    entry: {
      app: resolve(__dirname, 'src/client'),
    },
    type: 'client',
  }),
  buildConfig({
    entry: {
      server: resolve(__dirname, 'src/server'),
    },
    type: 'server',
  }),
];
