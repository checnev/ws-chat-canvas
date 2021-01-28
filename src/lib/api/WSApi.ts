import Request from './Request';

type RequestHandler = (request: Request) => any;

class WSApi {
  static instance: WSApi;

  readonly ws;
  private handlers: Record<string, RequestHandler[]> = {};

  private constructor() {
    this.ws = new WebSocket(process.env.REACT_APP_WS_URL as string);
    this.ws.addEventListener('message', this.recieve);
  }

  static getInstance(): WSApi {
    if (!WSApi.instance) {
      WSApi.instance = new WSApi();
    }

    return WSApi.instance;
  }

  subscribe(type: string, handler: RequestHandler) {
    if (Array.isArray(this.handlers[type])) {
      this.handlers[type].push(handler);
    } else {
      this.handlers[type] = [handler];
    }
  }

  unsubscribe(type: string, handler: RequestHandler) {
    if (this.handlers[type]) {
      const handlerIndex = this.handlers[type].findIndex((reqHandler) => reqHandler === handler);

      if (handlerIndex !== -1) {
        this.handlers[type].splice(handlerIndex, 1);
      }

      if (this.handlers[type].length === 0) {
        delete this.handlers[type];
      }
    }
  }

  once(type: string, handler: RequestHandler) {
    const onceHandler = (request: Request) => {
      handler(request);

      this.unsubscribe(type, onceHandler);
    };

    this.subscribe(type, onceHandler);
  }

  send(type: string, data?: any) {
    const request = new Request(type, data);
    this.ws.send(JSON.stringify(request));
  }

  private recieve = (event: MessageEvent) => {
    try {
      const message = JSON.parse(event.data);

      if (Request.isRequest(message)) {
        const request = new Request(message.type, message.data);

        this.handlers[request.type].forEach((handler) => {
          handler(request);
        });
      }
    } catch (error) {
    }
  };
}

export default WSApi;
