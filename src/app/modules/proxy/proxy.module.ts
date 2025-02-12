import { FastifyInstance } from 'fastify'
import { ProxyController } from './proxy.controller'
import { ProxyService } from './proxy.service'

export class ProxyModule {
  constructor(private readonly app: FastifyInstance) {}

  register(): void {
    const proxyService = new ProxyService(this.app)
    const proxyController = new ProxyController(this.app, proxyService)
    proxyController.registerRoutes()
  }
}
