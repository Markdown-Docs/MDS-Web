import { create } from "zustand";
import SockJS from "sockjs-client";
import { Client, Stomp } from "@stomp/stompjs";

interface WebSocketState {
  client: Client | null;
  connect: (url: string) => void;
  disconnect: () => void;
  sendMessage: (destination: string, message: string) => void;
  subscribe: (destination: string, callback: (message: any) => void) => void;
}

export const useWebSocketStore = create<WebSocketState>((set) => ({
  client: null,
  connect: (url: string) => {
    const socket = new SockJS(url);
    const client = Stomp.over(socket);

    client.connect({}, () => {
      console.log("STOMP connection established");
      set({ client });
    }, (error: any) => {
      console.error("STOMP error:", error);
    });

    client.onDisconnect = () => {
      console.log("STOMP connection closed");
      set({ client: null });
    };
  },
  disconnect: () => {
    set((state) => {
      state.client?.deactivate({ force: true });
      console.log("Disconnected");
      return { client: null };
    });
  },
  sendMessage: (destination: string, message: string) => {
    set((state) => {
      state.client?.publish({ destination, body: message });
      return state;
    });
  },
  subscribe: (destination: string, callback: (message: any) => void) => {
    set((state) => {
      state.client?.subscribe(destination, (message) => {
        callback(message);
      });
      return state;
    });
  }
}));
