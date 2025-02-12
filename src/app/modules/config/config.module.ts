import { FastifyInstance } from 'fastify'
import { ConfigService } from './config.service'

export class ConfigModule {
  constructor(private readonly app: FastifyInstance) {}

  register(): void {
    // Register ConfigService globally
    const configService = new ConfigService()
    this.app.decorate('configService', configService)
  }
}
