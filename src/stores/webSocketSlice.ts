import { create } from "zustand";
import { Socket, Channel } from "phoenix";

interface WebSocketState {
  socket: Socket | null;
  channel: Channel | null;
  content: string; // Добавляем состояние для текста
  connect: (url: string, file_id: string) => void;
  disconnect: () => void;
  sendMessage: (message: string) => void;
}

export const useWebSocketStore = create<WebSocketState>((set) => ({
  socket: null,
  channel: null,
  content: "",

  connect: (url: string, file_id: string) => {
    const socket = new Socket(url, { params: {} });
    socket.connect();

    const channel = socket.channel(`file:${file_id}`, {});

    channel
      .join()
      .receive("ok", () => {
        console.log(`Connected to file: ${file_id}`);
        set({ channel });
      })
      .receive("error", (err) => console.error("Failed to join channel:", err));

    // Подписка на обновления текста
    channel.on("update", (payload) => {
      set({ content: payload.content });
    });

    set({ socket });
  },

  disconnect: () => {
    set((state) => {
      state.channel?.leave();
      state.socket?.disconnect();
      console.log("Disconnected from WebSocket");
      return { socket: null, channel: null, content: "" };
    });
  },

  sendMessage: (message: string) => {
    set((state) => {
      state.channel?.push("edit", { content: message });
      return { content: message };
    });
  },
}));
