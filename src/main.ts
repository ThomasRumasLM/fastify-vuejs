/// <reference path="./types/fastify.d.ts" />

import fastify, { FastifyInstance } from 'fastify'
import { AppModule } from './app/app.module'
import { useViteMiddleware } from './server/vite.middleware';
import { serveStaticFiles } from './server/static-files';

async function bootstrap() {
  const app: FastifyInstance = fastify({ logger: true })

  // Initialize the application module
  const appModule = new AppModule(app)
  await appModule.register()

  if (process.env.NODE_ENV === 'development') {
    // Use Vite middleware in development mode
    await useViteMiddleware(app);
  } else {
    serveStaticFiles(app);
  }

  app.addHook('onReady', () => {
    console.log(app.printRoutes());
  });

  // Start the server
  try {
    await app.listen({ port: 3000 })
    console.log('🚀 Server running at http://localhost:3000')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

bootstrap()
