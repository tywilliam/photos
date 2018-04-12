// @flow

import { Router } from 'express';
import { readFileSync } from 'fs';
import { NOT_FOUND, OK } from 'http-status-codes';
import { join } from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { matchPath, StaticRouter } from 'react-router-dom';
import { ServerStyleSheet } from 'styled-components';

import { App } from '../../../components';
import routes from '../../../router/react';
import { cssAssets, hash, jsAssets } from '../../../utils/webpack-stats';


const router = new Router();

// $FlowFixMe
router.get('*', ({ url }, res) => {
  const match = routes.reduce((acc, { exact, path }) => (
    matchPath(url, {
      exact,
      path,
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
      location={url}
    >
      <App />
    </StaticRouter>,
  ));
  const css = stylesheet.getStyleTags();

  const manifestPath: string = join(__dirname, jsAssets.find(({ name }) => name === 'manifest').localPath);
  const manifest = readFileSync(manifestPath);

  res.status(OK).render('react', {
    jsassets: jsAssets.filter(({ name }) => name !== 'manifest'),
    cssassets: cssAssets,
    css,
    hash,
    manifest,
    markup,
    title: '',
  });
});

export { router as default };
