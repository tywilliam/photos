import { yellow } from 'chalk';
import express from 'express';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { createServer } from 'spdy';

import {
  compression,
  headerSecurity,
  requestLogger,
  templateEngine,
} from './modules/server';
import {
  isDev,
  CIPHERS,
  HOST,
  LOG,
  NODE_ENV,
  PORT,
  SSLCERT,
  SSLCA,
  SSLKEY,
} from './utils/env';
import { logger } from './utils';
import routes from './router/express';
import { hash } from './utils/webpack-stats';

const { info, setLevel } = logger;
const server = express();
const ssl = {
  ca: readFileSync(SSLCA),
  cert: readFileSync(SSLCERT),
  key: readFileSync(SSLKEY),
  sdpy: {
    ciphers: CIPHERS,
    honerCipherOrder: true,
  },
};
const viewsDir = resolve(__dirname, 'router/express/views');

setLevel(LOG);

templateEngine(server, viewsDir);
headerSecurity(server);
requestLogger(server);
routes(server);
server.set('port', PORT);

if (!isDev) {
  compression(server);
}

createServer(ssl, server).listen(PORT, HOST, () => {
  console.log(''); // eslint-disable-line no-console
  info(`:truck:  ${yellow(NODE_ENV)}`);
  info(`:truck:  ${yellow('HTTP2 server running...')}`);
  info(`:key:  Client Hash: ${yellow(hash)}`);
  console.log(''); // eslint-disable-line no-console
  info(`:desktop_computer:  https://${HOST}:${PORT}`);

  console.log('\n\nPress CRTL+C to stop the server...\n'); // eslint-disable-line no-console
});
