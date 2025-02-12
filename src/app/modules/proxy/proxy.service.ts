// import axios, { AxiosResponse } from 'axios'
import { FastifyInstance } from 'fastify'

export class ProxyService {
  constructor(private readonly app: FastifyInstance) {}

  getConfig(): Record<string, any> {
    return this.app.configService.getAll()
  }
}
