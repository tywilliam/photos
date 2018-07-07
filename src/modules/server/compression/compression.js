import compress from 'compression';
import minifyHTML from 'express-minify-html';

export default function compression(server) {
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
      minifyURLs: true,
      useShortDoctype: true,
    },
    override: true,
  }));
}
