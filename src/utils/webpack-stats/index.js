import { resolve } from 'path';

import { WEBPACK_STATS_PATH } from '../env';
import { getWebpackBuildStats } from './webpack-stats';

const statsPath = resolve(__dirname, WEBPACK_STATS_PATH);
const stats = getWebpackBuildStats(statsPath);

export const {
  assets,
  cssAssets,
  errors,
  hash,
  jsAssets,
  publicPath,
  warnings,
} = stats;

export { stats as default };
