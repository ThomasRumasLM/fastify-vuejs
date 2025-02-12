import { FastifyInstance } from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'path';

export function serveStaticFiles(app: FastifyInstance) {
  // Serve static files from the Vue app's build output
  app.register(fastifyStatic, {
    root: path.join(__dirname, '../../client/dist'),
    prefix: '/',
  });
}