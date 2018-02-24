import { assets, csp, react } from './routes';

export default function routes(server) {
  server.use('/assets', assets);
  server.use('/csp', csp);
  server.use('/', react);
}
