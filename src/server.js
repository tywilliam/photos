import bodyParser from 'body-parser';
import { yellow } from 'chalk';
import compress from 'compression';
import express from 'express';
import handlebars from 'express-handlebars';
import minifyHTML from 'express-minify-html';
import { readFileSync } from 'fs';
import { ensureDirSync } from 'fs-extra';
import helmet from 'helmet';
import morgan from 'morgan';
import { resolve } from 'path';
import rfs from 'rotating-file-stream';
import { createServer } from 'spdy';

import './utils/env';
import { logger } from './utils';
import { hash } from './utils/webpack';
import routes from './router/express';

const {
  CIPHERS,
  HOST = 'localhost',
  LOG = 'verbose',
  NODE_ENV = 'development',
  PORT = 8030,
  SSLCERT,
  SSLCA,
  SSLKEY,
} = process.env;
const isDev = NODE_ENV === 'development';
const { info, setLevel } = logger;
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

const server = express();

server.set('port', PORT);
server.set('views', viewsDir);
server.set('view engine', 'hbs');

server.engine('hbs', handlebars({
  defaultLayout: '_layout',
  extname: '.hbs',
  layoutsDir: resolve(viewsDir, 'layouts'),
  partialsDir: resolve(viewsDir, 'partials'),
}));

server.use(bodyParser.json({
  type: ['json', 'application/csp-report'],
}));

server.use(helmet({
  contentSecurityPolicy: {
    browserSniff: true,
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", 'data:'],
      reportUri: '/csp/violation',
      scriptSrc: ["'self'", `'nonce-${hash}'`],
      styleSrc: ["'self'", "'unsafe-inline'"],
      upgradeInsecureRequests: true,
    },
  },
  noCache: isDev,
}));

if (!isDev) {
  server.use(compress({
    level: 9,
  }));

  server.use(minifyHTML({
    htmlMinifier: {
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true,
      minifyCSS: true,
      removeComments: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
    },
    override: true,
  }));
}

const logPath = resolve(__dirname, '../log');
ensureDirSync(logPath);
server.use(morgan('combined', {
  stream: rfs('access.log', {
    interval: '1d',
    path: logPath,
  }),
}));

routes(server);

createServer(ssl, server).listen(PORT, HOST, () => {
  console.log(''); // eslint-disable-line no-console
  info(`:truck:  ${yellow(NODE_ENV)}`);
  info(`:truck:  ${yellow('HTTP2 server running...')}`);
  info(`:key:  Client Hash: ${yellow(hash)}`);
  console.log(''); // eslint-disable-line no-console
  info(`:desktop_computer:  https://${HOST}:${PORT}`);

  console.log('\n\nPress CRTL+C to stop the server...\n'); // eslint-disable-line no-console
});
