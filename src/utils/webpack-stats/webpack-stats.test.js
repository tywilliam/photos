import { resolve } from 'path';

import { getWebpackBuildStats } from './webpack-stats';


const exampleStats = resolve(__dirname, './test/example-stats.json');

describe('webpack-stats', () => {
  it('reads webpack build file and cleans stats', () => {
    const {
      assets,
      cssAssets,
      errors,
      hash,
      jsAssets,
      publicPath,
      warnings,
    } = getWebpackBuildStats(exampleStats);

    const expected = {
      assets: [
        {
          filename: 'vendor.js',
          localPath: '../assets/vendor.js',
          name: 'vendor',
          publicPath: '/assets/vendor.js',
          size: 2676783,
        },
        {
          filename: 'app.js',
          localPath: '../assets/app.js',
          name: 'app',
          publicPath: '/assets/app.js',
          size: 20065,
        },
        {
          filename: 'manifest.js',
          localPath: '../assets/manifest.js',
          name: 'manifest',
          publicPath: '/assets/manifest.js',
          size: 9170,
        },
        {
          filename: '../assets/style.css',
          localPath: '../assets/../assets/style.css',
          name: 'app',
          publicPath: '/assets/style.css',
          size: 11662,
        },
      ],
      cssAssets: [
        {
          filename: '../assets/style.css',
          localPath: '../assets/../assets/style.css',
          name: 'app',
          publicPath: '/assets/style.css',
          size: 11662,
        },
      ],
      errors: [],
      hash: 'adfb513859874d7a9711',
      jsAssets: [
        {
          filename: 'vendor.js',
          localPath: '../assets/vendor.js',
          name: 'vendor',
          publicPath: '/assets/vendor.js',
          size: 2676783,
        },
        {
          filename: 'app.js',
          localPath: '../assets/app.js',
          name: 'app',
          publicPath: '/assets/app.js',
          size: 20065,
        },
        {
          filename: 'manifest.js',
          localPath: '../assets/manifest.js',
          name: 'manifest',
          publicPath: '/assets/manifest.js',
          size: 9170,
        },
      ],
      publicPath: '/assets',
      warnings: [],
    };

    expect(assets).toEqual(expected.assets);
    expect(cssAssets).toEqual(expected.cssAssets);
    expect(errors).toEqual(expected.errors);
    expect(hash).toEqual(expected.hash);
    expect(jsAssets).toEqual(expected.jsAssets);
    expect(publicPath).toEqual(expected.publicPath);
    expect(warnings).toEqual(expected.warnings);
  });
});
