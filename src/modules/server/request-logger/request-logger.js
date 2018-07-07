import { ensureDirSync } from 'fs-extra';
import morgan from 'morgan';
import { resolve } from 'path';
import rfs from 'rotating-file-stream';

export default function requestLogger(server) {
  const logPath = resolve(__dirname, '../log');

  ensureDirSync(logPath);

  server.use(morgan('combined', {
    stream: rfs('access.log', {
      interval: '1d',
      path: logPath,
    }),
  }));
}
