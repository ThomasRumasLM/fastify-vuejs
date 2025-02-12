import { FastifyInstance } from 'fastify';
import { createServer as createViteServer } from 'vite';
import path from 'path';

export async function useViteMiddleware(app: FastifyInstance) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    root: path.resolve(__dirname, '../../client'),
  });

  // Register Vite Middleware (Only for Frontend Routes)
  app.addHook('onRequest', (req, res, next) => {
    const backendRoutes = ['/auth', '/api'];

    // If request matches a backend route, let Fastify handle it
    if (backendRoutes.some((route) => req.url.startsWith(route))) {
      return next();
    }

    // Otherwise, serve Vue app through Vite
    vite.middlewares(req.raw, res.raw, next);
  });

  console.log('✅ Vite middleware registered');
}
