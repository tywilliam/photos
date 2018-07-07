import handlebars from 'express-handlebars';
import { resolve } from 'path';

export default function templateEngine(server, viewsDir) {
  server.set('view engine', 'hbs');

  server.set('views', viewsDir);

  server.engine('hbs', handlebars({
    defaultLayout: '_layout',
    extname: '.hbs',
    layoutsDir: resolve(viewsDir, 'layouts'),
    partialsDir: resolve(viewsDir, 'partials'),
  }));
}
