import bodyParser from 'body-parser';
import helmet from 'helmet';

import { isDev } from '../../../utils/env';
import { hash } from '../../../utils/webpack-stats';

export default function headerSecurity(server) {
  server.use(bodyParser.json({
    type: ['json', 'application/csp-report'],
  }));

  server.use(helmet({
    contentSecurityPolicy: {
      browserSniff: true,
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", 'placeimg.com'],
        reportUri: '/csp/violation',
        scriptSrc: ["'self'", `'nonce-${hash}'`],
        styleSrc: ["'self'", "'unsafe-inline'"],
        upgradeInsecureRequests: true,
      },
    },
    noCache: isDev,
  }));
}
