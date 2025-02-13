import { FastifyInstance } from 'fastify';
import websocket from '@fastify/websocket';

export class observabilityWebSocketModule {
  constructor(private readonly app: FastifyInstance) {}

  async register(): Promise<void> {
    await this.app.register(websocket);

    this.app.get('/ws/observability', { websocket: true }, (socket, req) => {
      console.log('📡 WebSocket client connected');

      socket.on('message', (message: any) => {
        try {
          const event = JSON.parse(message.toString());
          this.app.log.info(`[Client-Observability] Page viewed: ${event.path}, from: ${event.from}, at: ${event.timestamp}`);
        } catch (err) {
          this.app.log.error('Invalid WebSocket message:', err);
        }
      });

      socket.on('close', () => {
        console.log('🔌 WebSocket client disconnected');
      });
    });

    console.log('✅ WebSocket observability module registered');
  }
}