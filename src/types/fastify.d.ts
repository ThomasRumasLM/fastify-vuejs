import { FastifyInstance } from 'fastify';
import { ConfigService } from '../modules/config/config.service';
import { BaseClient } from 'openid-client';

declare module 'fastify' {
  interface FastifyInstance {
    oidc: BaseClient; // Replace `any` with the actual type of your OIDC instance
    configService: ConfigService; // Replace `any` with the actual type of your config service
  }
}
