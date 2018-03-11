import { readJsonSync } from 'fs-extra';
import { join, resolve } from 'path';

const buildInfoPath = resolve(__dirname, '../client-build-stats.json');
const buildInfo = readJsonSync(buildInfoPath);

export const assets = buildInfo.assets.map(({ chunkNames, name }) => ({
  name: chunkNames.length > 1 ? chunkNames : chunkNames[0],
  publicPath: join(buildInfo.publicPath, name),
  localPath: `../assets/${name}`,
}));
export const hash = buildInfo.hash;
export const jsassets = assets.filter(({ publicPath }) => publicPath.endsWith('.js'));
export const cssassets = assets.filter(({ publicPath }) => publicPath.endsWith('.css'));

export default {
  assets,
  cssassets,
  hash,
  jsassets,
};
