// WebSocket client
export class WebSocketClient {
  private ws: WebSocket | null = null;

  connect(url: string) {
    this.ws = new WebSocket(url);
  }

  send(message: string) {
    this.ws?.send(message);
  }
}

export const wsClient = new WebSocketClient();
