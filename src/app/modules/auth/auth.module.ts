import { FastifyInstance } from 'fastify';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

export class AuthModule {
  constructor(private readonly app: FastifyInstance) {}

  async register(): Promise<void> {
    const authService = new AuthService();
    await authService.init({
      url: this.app.configService.get('OIDC_ISSUER'),
      clientId: this.app.configService.get('OIDC_CLIENT_ID'),
      clientSecret: this.app.configService.get('OIDC_CLIENT_SECRET'),
      redirectUri: this.app.configService.get('OIDC_REDIRECT_URI')
    });

    this.app.decorate('oidc', authService.getClient());

    const authController = new AuthController(this.app, authService);
    authController.registerRoutes();
  }
}