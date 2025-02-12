import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { ProxyService } from './proxy.service'

export class ProxyController {
  constructor(
    private readonly app: FastifyInstance,
    private readonly proxyService: ProxyService,
  ) {}

  registerRoutes(): void {
    this.app.get('/api/config', async (req: FastifyRequest, reply: FastifyReply) => {
      try {
        const data = this.proxyService.getConfig();
        reply.send(data)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        reply.status(500).send({ error: 'Failed to fetch configuration' })
      }
    })
  }
}
