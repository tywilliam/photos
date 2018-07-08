// @flow

import { Router } from 'express';
import { readFileSync } from 'fs';
import { OK } from 'http-status-codes';
import { join } from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { matchPath, StaticRouter } from 'react-router-dom';
import { ServerStyleSheet } from 'styled-components';

import { Root } from '../../../containers';
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

  const context = {};

  const stylesheet = new ServerStyleSheet();
  const markup = renderToString(stylesheet.collectStyles(
    <StaticRouter
      context={context}
      location={url}
    >
      <Root />
    </StaticRouter>,
  ));
  const css = stylesheet.getStyleTags();

  const manifestPath: string = join(__dirname, jsAssets.find(({ name }) => name === 'manifest').localPath);
  const manifest = readFileSync(manifestPath);

  const statusCode = context.status == null ? OK : context.status;

  res.status(statusCode).render('react', {
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
