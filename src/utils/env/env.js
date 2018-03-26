import dotenv from 'dotenv';

dotenv.config({
  silent: true,
});

export const {
  CIPHERS = '',
  HOST = 'localhost',
  LOG = 'verbose',
  LOGGER_DATEFORMAT = 'YYYY-MM-DD',
  LOGGER_FILELEVEL = 'verbose',
  LOGGER_LOGDIR = '../log',
  LOGGER_LOGNAME = 'debug',
  LOGGER_TIMEFORMAT = 'HH:mm:ss:SS',
  NODE_ENV = 'development',
  PORT = 5000,
  SSLCA = '.ssl-keys/server.csr',
  SSLCERT = '.ssl-keys/server.crt',
  SSLKEY = '.ssl-keys/server.key',
  WEBPACK_STATS_PATH = '../client-build-stats.json',
} = process.env;

export const isDev = NODE_ENV === 'development';

export { dotenv as default };
