import { Router } from 'express';
import { readFileSync } from 'fs';
import { NOT_FOUND, OK } from 'http-status-codes';
import { join } from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { matchPath, StaticRouter } from 'react-router-dom';
import { ServerStyleSheet } from 'styled-components';

import { Root } from '../../../components';
import routes from '../../../router/react';
import { cssassets, jsassets, hash } from '../../../utils/webpack';

const router = new Router();

router.get('*', (req, res) => {
  const match = routes.reduce((acc, route) => (
    matchPath(req.url, route, {
      exact: route.extact || false,
    }) || acc
  ), null);

  if (!match) {
    res.status(NOT_FOUND).send('Not found');
    return;
  }

  const context = {};

  const stylesheet = new ServerStyleSheet();
  const markup = renderToString(stylesheet.collectStyles(
    <StaticRouter
      context={context}
      location={req.url}
    >
      <Root />
    </StaticRouter>,
  ));
  const css = stylesheet.getStyleTags();

  const manifestPath = join(__dirname, jsassets.find(({ name }) => name === 'manifest').localPath);
  const manifest = readFileSync(manifestPath);

  res.status(OK).render('react', {
    jsassets: jsassets.filter(({ name }) => name !== 'manifest'),
    cssassets,
    css,
    hash,
    manifest,
    markup,
    title: '',
  });
});

export { router as default };
