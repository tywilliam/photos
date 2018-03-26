// @flow

import { readJsonSync } from 'fs-extra';
import { join } from 'path';

export type Asset = {
  filename: string,
  localPath: string,
  name: string,
  publicPath: string,
  size: number,
};

export type Build = {
    assets: Asset[],
    cssAssets: Asset[],
    errors: string[],
    hash: string,
    jsAssets: Asset[],
    publicPath: string,
    warnings: string[],
};

type WebpackAsset = {
  chunkNames: string[],
  chunks: number[],
  emitted: boolean,
  name: string,
  size: number,
};

type WebpackStats = {
  assets: WebpackAsset[],
  assetsByChunkName: {
    app: string[],
    manifest: string,
    vendor: string,
  },
  errors: string[],
  filteredAssets: number,
  hash: string,
  publicPath: string,
  warnings: string[],
};

/// Get Webpack build stats from webpack generated stats file
///
/// @param {string} path - Path to webpack stats json file
/// @returns Formatted webpack webpack stats
/// @example
/// import { resolve } from 'path';
///
/// const path = resolve(__dirname, 'webpack-build-stats.json');
/// const stats = buildWebpackBuildStats(path);
export function getWebpackBuildStats(path: string): Build {
  const build: WebpackStats = readJsonSync(path);

  const {
    errors,
    hash,
    publicPath,
    warnings,
  } = build;

  const assets: Asset[] = build.assets.map(({ chunkNames, name, size }) => ({
    filename: name,
    localPath: `../assets/${name}`,
    name: chunkNames[0],
    publicPath: join(publicPath, name),
    size,
  }));
  const cssAssets = assets.filter(({ publicPath }) => publicPath.endsWith('.css'));
  const jsAssets = assets.filter(({ publicPath }) => publicPath.endsWith('.js'));

  return {
    assets,
    cssAssets,
    errors,
    hash,
    jsAssets,
    publicPath,
    warnings,
  };
}

export { getWebpackBuildStats as default };
