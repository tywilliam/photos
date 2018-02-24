import { Router } from 'express';
import { NO_CONTENT } from 'http-status-codes';

import { logger } from '../../../utils';

const { warn } = logger;
const router = new Router();

router.post('/violation', (req, res) => {
  if (Object.keys(req.body).length === 0) {
    warn(':no_entry_sign: Unknown CSP violation');
  } else {
    warn(':no_entry_sign: CSP violation:', req.body['csp-report']);
  }
  res.status(NO_CONTENT).end();
});

export { router as default };
