import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { AuthService } from './auth.service';

export class AuthController {
  constructor(
    private readonly app: FastifyInstance,
    private readonly authService: AuthService
  ) {}

  registerRoutes(): void {
    this.app.get('/auth/login', (req: FastifyRequest, reply: FastifyReply) => {
      // Extract the "redirect" query param (default to "/")
      const returnUrl = encodeURIComponent((req.query as { redirect?: string }).redirect || '/');

      const redirectUri = `${this.app.configService.get('OIDC_REDIRECT_URI')}?redirect=${returnUrl}`;
    
      // Generate OIDC login URL with a state parameter to remember the original Vue route
      const oidcLoginUrl = this.app.oidc.authorizationUrl({
        scope: 'openid email profile',
        redirect_uri: redirectUri, // 🔀 Store return URL in OIDC state
      });
    
      // Redirect user to OIDC login page
      reply.redirect(oidcLoginUrl);
    });
    

    this.app.get('/auth/callback', async (req: FastifyRequest, reply: FastifyReply) => {
      try {
        const params = this.app.oidc.callbackParams(req.raw);
        const tokenSet = await this.app.oidc.callback('http://localhost:3000/callback', params);
        const returnUrl = decodeURIComponent((req.query as { redirect?: string }).redirect || '/');

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

        reply.redirect(returnUrl);
      } catch (error) {
        this.app.log.error(error);
        reply.status(500).send({ error: 'Authentication failed' });
      }
    });

    this.app.get('/auth/user', async (req: FastifyRequest, reply: FastifyReply) => {
      try {
        const token = req.cookies?.user;
        if (!token) {
          return reply.status(401).send({ error: 'User is not authenticated' });
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