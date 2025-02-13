import { FastifyInstance } from 'fastify'
import { ConfigModule } from './modules/config/config.module'
import { ProxyModule } from './modules/proxy/proxy.module'
import { AuthModule } from './modules/auth/auth.module'
import { observabilityWebSocketModule } from './modules/observability/observability.websocket';
import fastifyCookie from '@fastify/cookie';

export class AppModule {
  constructor(private readonly app: FastifyInstance) {}

  async register(): Promise<void> {
    // Register application modules
    new ConfigModule(this.app).register()

    await (new observabilityWebSocketModule(this.app).register())

    // Register the cookie plugin
    this.app.register(fastifyCookie, {
      secret: this.app.configService.get('COOKIE_SECRET_KEY'),
      parseOptions: {
        httpOnly: true, // Prevents client-side access
        secure: this.app.configService.get('SECURE_COOKIE') === 'true',
        sameSite: 'lax',
      },
    });

    new ProxyModule(this.app).register()
    await (new AuthModule(this.app).register())
    console.log('✅ Application modules registered');
  }
}
