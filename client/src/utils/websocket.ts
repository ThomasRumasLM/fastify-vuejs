export class WebSocketClient {
    private socket: WebSocket | null = null;
    private queue: any[] = [];
    private isConnected = false;
  
    constructor(private url: string) {
      this.connect();
    }
  
    private connect() {
      this.socket = new WebSocket(this.url);
  
      this.socket.onopen = () => {
        console.log('✅ WebSocket connected');
        this.isConnected = true;
        
        // Send all queued messages
        this.queue.forEach((message) => this.send(message));
        this.queue = [];
      };
  
      this.socket.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
      };
  
      this.socket.onclose = () => {
        console.warn('⚠️ WebSocket closed. Reconnecting...');
        this.isConnected = false;
        setTimeout(() => this.connect(), 3000); // Auto-reconnect
      };
    }
  
    send(message: any) {
      const msgString = JSON.stringify(message);
      
      if (this.isConnected && this.socket?.readyState === WebSocket.OPEN) {
        this.socket.send(msgString);
      } else {
        console.warn('⏳ WebSocket not open. Queuing message.');
        this.queue.push(msgString);
      }
    }
}  