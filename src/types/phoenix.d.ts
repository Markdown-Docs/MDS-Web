declare module "phoenix" {
  export class Socket {
    constructor(endpoint: string, options?: SocketOptions);
    connect(): void;
    disconnect(callback?: () => void, code?: number, reason?: string): void;
    channel(topic: string, params?: any): Channel;
    onOpen(callback: () => void): void;
    onClose(callback: (event?: CloseEvent) => void): void;
    onError(callback: (reason?: any) => void): void;
  }

  export interface SocketOptions {
    params?: Record<string, any>;
    logger?: (kind: string, msg: string, data: any) => void;
    reconnectAfterMs?: (tries: number) => number;
    heartbeatIntervalMs?: number;
    longpollerTimeout?: number;
    transport?: any;
  }

  export class Channel {
    constructor(topic: string, params: any, socket: Socket);
    join(timeout?: number): Push;
    leave(timeout?: number): Push;
    on(event: string, callback: (payload: any) => void): void;
    off(event: string): void;
    push(event: string, payload: any, timeout?: number): Push;
  }

  export class Push {
    receive(status: string, callback: (response?: any) => void): this;
  }
}
