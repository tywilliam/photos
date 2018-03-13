import { dim } from 'chalk';
import { ensureDirSync } from 'fs-extra';
import moment from 'moment';
import { emojify } from 'node-emoji';
import { resolve } from 'path';
import { Logger, transports } from 'winston';
import { inspect } from 'util';

import {
  LOGGER_DATEFORMAT,
  LOGGER_FILELEVEL,
  LOGGER_LOGDIR,
  LOGGER_LOGNAME,
  LOGGER_TIMEFORMAT,
} from '../env';

const levels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'grey',
    verbose: 'magenta',
    debug: 'grey',
  },
};

const logDirPath = resolve(__dirname, LOGGER_LOGDIR);
ensureDirSync(logDirPath);

const formatter = function formatter(input, file = false) {
  let { level, message, meta, timestamp } = input;

  level = file ? level : dim(level);
  timestamp = file ? timestamp() : dim.magenta(timestamp());
  message = emojify(message);

  meta = Object.prototype.hasOwnProperty.call(meta, 'safeArray') ? meta.safeArray : meta;
  const empty = Array.isArray(meta) ? meta.length > 1 : Object.keys(meta).length > 1;
  if (empty) {
    meta = ` \n ${inspect(meta, { colors: !file })}`;
    meta = file ? meta : dim(meta);
  } else {
    meta = '';
  }

  return `${timestamp} ${level} ${message} ${meta}`;
};

const logger = new (Logger)({
  rewriters: [(level, message, meta) => (
    Array.isArray(meta) ? { safeArray: meta } : meta
  )],
  transports: [
    new (transports.Console)({
      align: false,
      formatter: args => formatter(args),
      humanReadableUnhandledException: true,
      levels,
      prettyPrint: true,
      timestamp: () => moment().format(LOGGER_TIMEFORMAT),
    }),
    new (transports.File)({
      filename: `${logDirPath}/${LOGGER_LOGNAME}.log`,
      formatter: args => formatter(args, true),
      json: false,
      level: LOGGER_FILELEVEL,
      levels,
      timestamp: () => moment().format(`${LOGGER_DATEFORMAT} ${LOGGER_TIMEFORMAT}`),
    }),
  ],
});

logger.setLevel = (program) => {
  let level = 'info';
  if (program.silent) {
    level = 'error';
  }
  if (program.verbose) {
    level = 'verbose';
  }
  if (program.debug) {
    level = 'debug';
  }
  logger.level = level;
};

logger.cli();

export { logger as default };
