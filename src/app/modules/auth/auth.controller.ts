import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { AuthService } from './auth.service';

export class AuthController {
  constructor(
    private readonly app: FastifyInstance,
    private readonly authService: AuthService
  ) {}

  registerRoutes(): void {
    this.app.get('/auth/login', (_req: FastifyRequest, reply: FastifyReply) => {
      // Redirect to OIDC login
      reply.redirect(this.app.oidc.authorizationUrl({
        scope: 'openid email profile',
      }));
    });

    this.app.get('/auth/callback', async (req: FastifyRequest, reply: FastifyReply) => {
      try {
        const params = this.app.oidc.callbackParams(req.raw);
        const tokenSet = await this.app.oidc.callback('http://localhost:3000/callback', params);

        // Set the access_token inside a cookie
        if (tokenSet.access_token) {
          reply.setCookie('user', tokenSet.access_token, {
            httpOnly: true, // Prevents client-side access to the cookie
            secure: this.app.configService.get('SECURE_COOKIE') === 'true', // Only send over HTTPS in production
            sameSite: 'lax',
            path: '/',
            maxAge: tokenSet?.expires_in, // Expire when the token expires
          });
        }

        reply.redirect('/');
      } catch (error) {
        this.app.log.error(error);
        reply.status(500).send({ error: 'Authentication failed' });
      }
    });

    this.app.get('/auth/user', async (req: FastifyRequest, reply: FastifyReply) => {
      try {
        const token = req.cookies.user;
        if (!token) {
          throw new Error('User cookie is missing');
        }
        const userInfo = await this.authService.getUserInfo(token);
        reply.send(userInfo);
      } catch (error) {
        this.app.log.error(error);
        reply.status(500).send({ error: 'Failed to get user info' });
      }
    });
  }
}